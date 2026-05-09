import { Link } from "@/navigation";
import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  const codeRe = /`([^`]+)`/g;
  const strongRe = /\*\*([^*]+)\*\*/g;

  let cursor = 0;
  let linkMatch = linkRe.exec(text);
  let codeMatch = codeRe.exec(text);
  let strongMatch = strongRe.exec(text);

  while (linkMatch || codeMatch || strongMatch) {
    const nextLinkIndex = linkMatch ? linkMatch.index : Number.POSITIVE_INFINITY;
    const nextCodeIndex = codeMatch ? codeMatch.index : Number.POSITIVE_INFINITY;
    const nextStrongIndex = strongMatch ? strongMatch.index : Number.POSITIVE_INFINITY;
    const nextIndex = Math.min(nextLinkIndex, nextCodeIndex, nextStrongIndex);
    const nextKind =
      nextIndex === nextCodeIndex ? "code" : nextIndex === nextLinkIndex ? "link" : "strong";

    if (nextIndex > cursor) nodes.push(text.slice(cursor, nextIndex));

    if (nextKind === "code") {
      const [full, code] = codeMatch as RegExpExecArray;
      const key = `${nextIndex}-code`;
      nodes.push(
        <code key={key} className="inline-code">
          {code}
        </code>,
      );
      cursor = nextIndex + full.length;
      codeMatch = codeRe.exec(text);
      continue;
    }

    if (nextKind === "strong") {
      const [full, strongText] = strongMatch as RegExpExecArray;
      const key = `${nextIndex}-strong`;
      const className =
        strongText.endsWith("：") || strongText.endsWith(":")
          ? "md-strong md-strong-label"
          : "md-strong";
      nodes.push(
        <strong key={key} className={className}>
          {renderInline(strongText)}
        </strong>,
      );
      cursor = nextIndex + full.length;
      strongMatch = strongRe.exec(text);
      continue;
    }

    const [full, label, href] = linkMatch as RegExpExecArray;
    const key = `${nextIndex}-${href}`;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={key} href={href} className="underline underline-offset-4">
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={key}
          href={href}
          className="underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          {label}
        </a>,
      );
    }
    cursor = nextIndex + full.length;
    linkMatch = linkRe.exec(text);
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

type Block =
  | { kind: "h"; level: 1 | 2 | 3 | 4; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "code"; lang: string | null; code: string };

function splitTableRow(line: string): string[] {
  const trimmed = line.trim();
  const rawCells = trimmed.replace(/^\|/, "").replace(/\|$/, "").split("|");
  return rawCells.map((c) => c.trim());
}

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) return false;
  const cells = splitTableRow(trimmed);
  if (cells.length < 2) return false;
  return cells.every((c) => /^:?-{3,}:?$/.test(c.replaceAll(" ", "")));
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const blocks: Block[] = [];

  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (line.trim().length === 0) {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || null;
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trimEnd().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      blocks.push({ kind: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    const h1 = /^# (.+)$/.exec(line);
    const h2 = /^## (.+)$/.exec(line);
    const h3 = /^### (.+)$/.exec(line);
    const h4 = /^#### (.+)$/.exec(line);
    if (h1) {
      blocks.push({ kind: "h", level: 1, text: h1[1] });
      i += 1;
      continue;
    }
    if (h2) {
      blocks.push({ kind: "h", level: 2, text: h2[1] });
      i += 1;
      continue;
    }
    if (h3) {
      blocks.push({ kind: "h", level: 3, text: h3[1] });
      i += 1;
      continue;
    }
    if (h4) {
      blocks.push({ kind: "h", level: 4, text: h4[1] });
      i += 1;
      continue;
    }

    const next = lines[i + 1]?.trimEnd() ?? "";
    if (line.includes("|") && next.trim().length > 0 && isTableSeparator(next)) {
      const head = splitTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length) {
        const rowLine = lines[i].trimEnd();
        if (rowLine.trim().length === 0) break;
        if (!rowLine.includes("|")) break;
        if (/^# /.test(rowLine) || /^## /.test(rowLine) || /^### /.test(rowLine) || /^#### /.test(rowLine)) break;
        if (/^- /.test(rowLine) || /^\d+\. /.test(rowLine)) break;
        if (rowLine.trimStart().startsWith("```")) break;
        rows.push(splitTableRow(rowLine));
        i += 1;
      }
      blocks.push({ kind: "table", head, rows });
      continue;
    }

    if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i].trimEnd())) {
        items.push(lines[i].trimEnd().slice(2));
        i += 1;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trimEnd())) {
        items.push(lines[i].trimEnd().replace(/^\d+\. /, ""));
        i += 1;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim().length > 0 &&
      !lines[i].trimEnd().startsWith("```") &&
      !/^# /.test(lines[i].trimEnd()) &&
      !/^## /.test(lines[i].trimEnd()) &&
      !/^### /.test(lines[i].trimEnd()) &&
      !/^#### /.test(lines[i].trimEnd()) &&
      !/^- /.test(lines[i].trimEnd()) &&
      !/^\d+\. /.test(lines[i].trimEnd())
    ) {
      paraLines.push(lines[i].trimEnd());
      i += 1;
    }
    blocks.push({ kind: "p", text: paraLines.join(" ") });
  }

  return blocks;
}

function renderFeeCell(text: string): ReactNode {
  const trimmed = text.trim();
  if (trimmed === "/") return <span className="md-fee-na">/</span>;

  const parts = trimmed
    .split(/\s*\/\s*/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <span className="md-fee">
      {parts.map((part, idx) => {
        const parenIdx = part.indexOf("(");
        const hasParen = parenIdx > 0 && part.includes(")");
        const main = (hasParen ? part.slice(0, parenIdx) : part).trim();
        const note = hasParen ? part.slice(parenIdx).trim() : "";
        return (
          <span key={`${idx}`} className="md-fee-part">
            <span className="md-fee-main">{renderInline(main)}</span>
            {note ? <span className="md-fee-note">{renderInline(note)}</span> : null}
            {idx < parts.length - 1 ? <span className="md-fee-sep">/</span> : null}
          </span>
        );
      })}
    </span>
  );
}

function isFeesTable(head: string[], rows: string[][]): boolean {
  const headNorm = head.map((h) => h.toLowerCase());
  const hasTiming =
    headNorm.some((h) => h.includes("early")) &&
    headNorm.some((h) => h.includes("normal") || h.includes("regular")) &&
    headNorm.some((h) => h.includes("late"));
  const hasCurrency = rows.some((row) => row.slice(1).some((cell) => /\bS\$\s*\d/.test(cell)));
  return hasTiming && hasCurrency;
}

function isMoneyCell(text: string): boolean {
  return (
    /\bS\$\s*\d/.test(text) ||
    /\bUSD\s*\d/.test(text) ||
    /\bHKD\s*\d/.test(text) ||
    /\bRMB\s*\d/.test(text) ||
    /\bCNY\s*\d/.test(text) ||
    /\$\s*\d/.test(text) ||
    /\b\d+\s*USD\b/i.test(text)
  );
}

export function Markdown({
  content,
  tableVariant,
  variant,
}: {
  content: string;
  tableVariant?: "fees";
  variant?: "amalunch" | "registration" | "cfp";
}) {
  const blocks = parseBlocks(content);
  const renderBlock = (b: Block, idx: number, prevBlock?: Block) => {
    const key = `${b.kind}-${idx}`;
    if (b.kind === "h") {
      if (b.level === 1)
        return (
          <h1
            key={key}
            className={
              variant === "amalunch"
                ? "!mt-4 !text-xl sm:!text-2xl !font-semibold !tracking-tight"
                : undefined
            }
          >
            {renderInline(b.text)}
          </h1>
        );
      if (b.level === 2) {
        const isAmalunchSection =
          variant === "amalunch" &&
          (b.text === "活动信息" || b.text === "重要日期" || b.text === "如何报名");
        return (
          <h2
            key={key}
            className={
              isAmalunchSection
                ? "!mt-10 !text-xl sm:!text-2xl !font-semibold !tracking-tight"
                : variant === "amalunch"
                  ? "!text-lg !font-semibold"
                  : undefined
            }
          >
            {renderInline(b.text)}
          </h2>
        );
      }
      if (b.level === 3) {
        return (
          <h3 key={key} className={variant === "amalunch" ? "!text-base !font-semibold" : undefined}>
            {renderInline(b.text)}
          </h3>
        );
      }
      return <h4 key={key}>{renderInline(b.text)}</h4>;
    }
    if (b.kind === "p") return <p key={key}>{renderInline(b.text)}</p>;
    if (b.kind === "ul")
      return (
        <ul
          key={key}
          className={
            variant === "amalunch"
              ? "md-ul"
              : variant === "cfp" &&
                  prevBlock?.kind === "h" &&
                  (prevBlock.text === "征稿主题" || prevBlock.text === "欢迎以下类型投稿")
                ? "md-cfp-two-col"
                : undefined
          }
        >
          {b.items.map((it, j) => (
            <li
              key={`${key}-${j}`}
              className={variant === "amalunch" && it.trimStart().startsWith("**申请表")
                ? "md-li-form"
                : undefined}
            >
              {renderInline(it)}
            </li>
          ))}
        </ul>
      );
    if (b.kind === "ol")
      return (
        <ol key={key} className={variant === "amalunch" ? "md-ol" : undefined}>
          {b.items.map((it, j) => (
            <li key={`${key}-${j}`}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    if (b.kind === "table")
      return tableVariant === "fees" ? (
        <div key={key} className="md-table-shell">
          {(() => {
            return (
              <table className="md-table md-table-fees">
            <thead>
              <tr>
                {b.head.map((h, j) => (
                  <th key={`${key}-h-${j}`}>{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, rIdx) => (
                <tr key={`${key}-r-${rIdx}`}>
                  {row.map((cell, cIdx) => (
                    <td key={`${key}-c-${rIdx}-${cIdx}`}>
                      {cIdx !== 0 && (isFeesTable(b.head, b.rows) || isMoneyCell(cell))
                        ? renderFeeCell(cell)
                        : renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
              </table>
            );
          })()}
        </div>
      ) : (
        <table key={key}>
          <thead>
            <tr>
              {b.head.map((h, j) => (
                <th key={`${key}-h-${j}`}>{renderInline(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((row, rIdx) => (
              <tr key={`${key}-r-${rIdx}`}>
                {row.map((cell, cIdx) => (
                  <td key={`${key}-c-${rIdx}-${cIdx}`}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    const className = b.lang ? `language-${b.lang}` : undefined;
    return (
      <pre key={key}>
        <code className={className}>{b.code}</code>
      </pre>
    );
  };

  const contentNodes =
    variant === "registration"
      ? (() => {
          const nodes: ReactNode[] = [];
          let i = 0;
          while (i < blocks.length) {
            const block = blocks[i];
            if (block.kind === "h" && block.level === 3) {
              const sectionBlocks: Block[] = [block];
              i += 1;
              while (i < blocks.length) {
                const next = blocks[i];
                if (next.kind === "h" && next.level === 3) break;
                sectionBlocks.push(next);
                i += 1;
              }
              nodes.push(
                <section key={`registration-section-${i}`} className="md-registration-card">
                  {sectionBlocks.map((item, idx) => renderBlock(item, i * 100 + idx))}
                </section>,
              );
              continue;
            }
            nodes.push(renderBlock(block, i));
            i += 1;
          }
          return nodes;
        })()
      : blocks.map((b, idx) => renderBlock(b, idx, idx > 0 ? blocks[idx - 1] : undefined));
  return (
    <div
      className={`prose prose-neutral max-w-none prose-headings:tracking-tight prose-headings:text-black/85 prose-p:text-black/75 prose-li:text-black/70 dark:prose-headings:text-white/85 dark:prose-p:text-white/75 dark:prose-li:text-white/70${
        variant === "amalunch" ? " md-variant-amalunch" : ""
      }`}
    >
      {contentNodes}
    </div>
  );
}
