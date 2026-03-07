import styles from "./sponsors.module.css";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { normalizeLocale } from "@/i18n/request";

export default async function SponsorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale) notFound();
  setRequestLocale(normalizedLocale);
  const tCommon = await getTranslations("Common");
  const t = await getTranslations("Sponsors");
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.notice}>{tCommon("toBeUpdated")}</div>
        <div className={styles.sectionTitle}>{t("title")}</div>
        <p className={styles.lead}>{t("lead")}</p>

        <div className={styles.tierGrid}>
          <div className={`${styles.tierRow} ${styles.tierRowBronze}`}>
            <div className={styles.tierTop}>
              <div className={styles.tierName}>{t("tiers.bronze.name")}</div>
              <div className={styles.tierFee}>{t("tiers.bronze.fee")}</div>
            </div>
            <div className={styles.tierPerks}>
              <ul className={styles.list}>
                <li>{t("tiers.bronze.p1")}</li>
                <li>{t("tiers.bronze.p2")}</li>
              </ul>
            </div>
          </div>

          <div className={`${styles.tierRow} ${styles.tierRowSilver}`}>
            <div className={styles.tierTop}>
              <div className={styles.tierName}>{t("tiers.silver.name")}</div>
              <div className={styles.tierFee}>{t("tiers.silver.fee")}</div>
            </div>
            <div className={styles.tierPerks}>
              <div className={styles.tierMeta}>{t("tiers.silver.meta")}</div>
              <ul className={styles.list}>
                <li>{t("tiers.silver.p1")}</li>
                <li>{t("tiers.silver.p2")}</li>
                <li>{t("tiers.silver.p3")}</li>
                <li>{t("tiers.silver.p4")}</li>
              </ul>
            </div>
          </div>

          <div className={`${styles.tierRow} ${styles.tierRowGold}`}>
            <div className={styles.tierTop}>
              <div className={styles.tierName}>{t("tiers.gold.name")}</div>
              <div className={styles.tierFee}>{t("tiers.gold.fee")}</div>
            </div>
            <div className={styles.tierPerks}>
              <div className={styles.tierMeta}>{t("tiers.gold.meta")}</div>
              <ul className={styles.list}>
                <li>{t("tiers.gold.p1")}</li>
                <li>{t("tiers.gold.p2")}</li>
                <li>{t("tiers.gold.p3")}</li>
                <li>{t("tiers.gold.p4")}</li>
              </ul>
            </div>
          </div>

          <div className={`${styles.tierRow} ${styles.tierRowPlatinum}`}>
            <div className={styles.tierTop}>
              <div className={styles.tierName}>{t("tiers.platinum.name")}</div>
              <div className={styles.tierFee}>{t("tiers.platinum.fee")}</div>
            </div>
            <div className={styles.tierPerks}>
              <div className={styles.tierMeta}>{t("tiers.platinum.meta")}</div>
              <ul className={styles.list}>
                <li>{t("tiers.platinum.p1")}</li>
                <li>{t("tiers.platinum.p2")}</li>
                <li>{t("tiers.platinum.p3")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.lead}>
            {t("contact.prefix")} <a href="mailto:jude.yew@gmail.com">jude.yew@gmail.com</a>.
          </div>
        </div>
      </section>
    </div>
  );
}
