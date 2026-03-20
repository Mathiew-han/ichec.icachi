import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ResponsiveGlowCircle } from "@/components/ResponsiveGlowCircle";
import { normalizeLocale } from "@/i18n/request";

const viewports = [
  { label: "320px", width: 320 },
  { label: "768px", width: 768 },
  { label: "1440px", width: 1440 },
  { label: "1920px", width: 1920 },
] as const;

export default async function CircleComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale) notFound();
  setRequestLocale(normalizedLocale);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5 sm:p-6">
        <div className="text-lg font-semibold tracking-wide text-black/85 dark:text-white/85">
          Screenshot Compare
        </div>
        <div className="mt-2 text-sm text-black/70 dark:text-white/70">
          同一页面内模拟不同视口宽度，便于截图对比。
        </div>
      </div>

      <div className="space-y-5">
        {viewports.map((it) => (
          <section key={it.width} className="glass-panel p-4">
            <div className="text-sm font-semibold text-black/75 dark:text-white/75">
              {it.label}
            </div>
            <div
              className="mt-3 mx-auto relative overflow-hidden rounded-3xl bg-white/60 dark:bg-black/20"
              style={{ width: it.width, height: 520, maxWidth: "100%" }}
            >
              <ResponsiveGlowCircle />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

