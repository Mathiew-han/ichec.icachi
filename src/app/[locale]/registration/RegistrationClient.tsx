"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Markdown } from "@/components/Markdown";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Fragment, useMemo } from "react";
import styles from "./registration.module.css";

const easeStandard: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeStandard } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: easeStandard } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: easeStandard } },
};

const priceColumns = [
  { key: "early", priceKey: "early", titleKey: "columns.early" },
  { key: "regular", priceKey: "regular", titleKey: "columns.regular" },
  { key: "late", priceKey: "late", titleKey: "columns.late" },
] as const;

export function RegistrationClient({ content }: { content: string }) {
  const t = useTranslations("Registration");
  const pricingT = useTranslations("Registration.fees.pricing");
  const tableT = useTranslations("Registration.fees.table");
  const feeRows = useMemo(
    () => [
      {
        key: "standard",
        label: tableT("standard"),
        prices: priceColumns.map((column) => tableT(`standardPrices.${column.priceKey}`)),
      },
      {
        key: "student",
        label: tableT("student"),
        prices: priceColumns.map((column) => tableT(`studentPrices.${column.priceKey}`)),
      },
    ],
    [tableT],
  );

  const feesMarkdown = useMemo(() => {
    const tableRe =
      /^\|.*\|\s*\r?\n^\|(?:\s*:?-{3,}:?\s*\|)+\s*\r?\n(?:^\|.*\|\s*\r?\n)+/m;
    const match = tableRe.exec(content);
    if (!match || match.index == null) {
      return { before: content.trim(), after: "" };
    }

    const tableStart = match.index;
    const tableEnd = tableStart + match[0].length;
    const beforeTable = content.slice(0, tableStart).replace(/\s+$/, "");
    const afterTable = content.slice(tableEnd).trimStart();

    const headingNeedle = "\n### ";
    let headingIdx = beforeTable.lastIndexOf(headingNeedle);
    if (headingIdx >= 0) headingIdx += 1;
    if (headingIdx < 0 && beforeTable.startsWith("### ")) headingIdx = 0;
    if (headingIdx < 0) {
      return { before: beforeTable.trim(), after: afterTable };
    }

    const prefix = beforeTable.slice(0, headingIdx).trimEnd();
    return { before: prefix.trim(), after: afterTable };
  }, [content]);

  return (
    <div className={styles.page}>
      <section className={`${styles.section} ${styles.heroSection}`}>
        {feesMarkdown.before ? (
          <div className={styles.markdownWrap}>
            <Markdown content={feesMarkdown.before} variant="registration" />
          </div>
        ) : null}

        <div className={styles.pricingShell}>
          <div className={styles.pricingTop}>
            <div className={styles.pricingCopy}>
              <div className={styles.kicker}>{t("fees.kicker")}</div>
              <h2 className={styles.pricingTitle}>{pricingT("title")}</h2>
              <p className={styles.pricingDesc}>{pricingT("desc")}</p>
            </div>
            <div className={styles.pricingLanguage}>
              <LanguageSwitcher />
            </div>
          </div>

          <div className={styles.pricingTableWrap}>
            <div className={styles.pricingTable} aria-label={pricingT("title")}>
              <div className={`${styles.pricingCell} ${styles.pricingHead}`}>{tableT("type")}</div>
              {priceColumns.map((column) => (
                <div key={column.key} className={`${styles.pricingCell} ${styles.pricingHead}`}>
                  {tableT(column.titleKey)}
                </div>
              ))}
              {feeRows.map((row, rowIndex) => (
                <Fragment key={row.key}>
                  <div
                    className={`${styles.pricingCell} ${styles.pricingType} ${
                      rowIndex > 0 ? styles.pricingRowDivider : ""
                    }`}
                  >
                    {row.label}
                  </div>
                  {row.prices.map((price) => (
                    <div
                      key={price}
                      className={`${styles.pricingCell} ${styles.pricingPrice} ${
                        rowIndex > 0 ? styles.pricingRowDivider : ""
                      }`}
                    >
                      {price}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>

            <a className={styles.pricingCta} href="#" aria-label={pricingT("cta")}>
              {pricingT("cta")}
              <span className={styles.pricingCtaArrow} aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        <div className={`${styles.markdownWrap} ${styles.afterMarkdownWrap}`}>
          <Markdown content={feesMarkdown.after} variant="registration" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionNoBorder} ${styles.infoSection}`}>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          {t("checkin.kicker") ? <div className={styles.kicker}>{t("checkin.kicker")}</div> : null}
          <h3 className={styles.h2}>{t("checkin.title")}</h3>
          <p className={styles.sublead}>{t("checkin.desc")}</p>
        </motion.div>

        <div className={styles.twoCol}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            variants={slideInLeft}
          >
            <dl className={styles.dl}>
              <div className={styles.dlRow}>
                <dt>{t("checkin.rows.location.k")}</dt>
                <dd>{t("checkin.rows.location.v")}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt>{t("checkin.rows.hours.k")}</dt>
                <dd>{t("checkin.rows.hours.v")}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt>{t("checkin.rows.materials.k")}</dt>
                <dd>{t("checkin.rows.materials.v")}</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            variants={slideInRight}
          >
            <ul className={styles.bullets}>
              <li>{t("checkin.notes.n1")}</li>
              <li>{t("checkin.notes.n2")}</li>
              <li>{t("checkin.notes.n3")}</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionNoBorder} ${styles.policySection}`}>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          {t("policies.kicker") ? <div className={styles.kicker}>{t("policies.kicker")}</div> : null}
          <h3 className={styles.h2}>{t("policies.title")}</h3>
          <p className={styles.sublead}>{t("policies.desc")}</p>
        </motion.div>

        <div className={styles.policyGrid}>
          <div className={styles.policyBlock}>
            <div className={styles.policyTitle}>{t("policies.p1.title")}</div>
            <div className={styles.policyText}>{t("policies.p1.text")}</div>
          </div>
          <div className={styles.policyBlock}>
            <div className={styles.policyTitle}>{t("policies.p2.title")}</div>
            <div className={styles.policyText}>{t("policies.p2.text")}</div>
          </div>
          <div className={styles.policyBlock}>
            <div className={styles.policyTitle}>{t("policies.p3.title")}</div>
            <div className={styles.policyText}>{t("policies.p3.text")}</div>
          </div>
        </div>
      </section>

    </div>
  );
}
