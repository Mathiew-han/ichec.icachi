import { Markdown } from "@/components/Markdown";
import { readSiteMarkdown } from "@/lib/site-content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { normalizeLocale } from "@/i18n/request";
import { notFound } from "next/navigation";

export default async function AmalunchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale) notFound();
  setRequestLocale(normalizedLocale);

  const content = await readSiteMarkdown("amalunch", normalizedLocale);
  const t = await getTranslations("Common");
  return (
    <div className="space-y-10">
      <div className="rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
        {t("toBeUpdated")}
      </div>
      <Markdown content={content} variant="amalunch" />
    </div>
  );
}
