import styles from "./sponsors.module.css";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { normalizeLocale } from "@/i18n/request";

const tierIds = ["bronze", "silver", "gold", "platinum"] as const;

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m5 10 3.1 3.1L15.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function SponsorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale) notFound();
  setRequestLocale(normalizedLocale);

  const t = await getTranslations("Sponsors");
  const tiers = tierIds.map((id) => ({
    id,
    name: t(`tiers.${id}.name`),
    fee: t(`tiers.${id}.fee`),
    benefits: t.raw(`tiers.${id}.benefits`) as string[],
  }));

  return (
    <div className={styles.page}>
      <nav className={styles.sectionNav} aria-label={t("title")}>
        <div className={styles.navInner}>
          {[
            ["sponsorship-overview", "01", t("nav.overview")],
            ["sponsorship-packages", "02", t("nav.packages")],
            ["sponsorship-terms", "03", t("nav.terms")],
            ["sponsorship-contact", "04", t("nav.contact")],
          ].map(([id, number, label]) => (
            <a href={`#${id}`} key={id}>
              <span>{number}</span>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className={`${styles.section} ${styles.overview}`} id="sponsorship-overview">
        <div className={styles.container}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
          <p className={styles.lead}>{t("lead")}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.packages}`} id="sponsorship-packages">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{t("packages.eyebrow")}</p>
            <h2>{t("packages.title")}</h2>
            <p>{t("packages.lead")}</p>
          </div>

          <div className={styles.tierGrid}>
            {tiers.map((tier) => (
              <article
                className={`${styles.tierCard} ${tier.id === "gold" ? styles.featuredCard : ""}`}
                key={tier.id}
              >
                <div className={styles.tierTopline}>
                  <span className={`${styles.tierMark} ${styles[`tierMark${tier.id[0].toUpperCase()}${tier.id.slice(1)}`]}`} aria-hidden="true">
                    ✦
                  </span>
                  {tier.id === "gold" ? <span className={styles.featuredBadge}>{t("packages.featured")}</span> : null}
                </div>
                <h3>{tier.name}</h3>
                <p className={styles.tierFee}>{tier.fee}</p>
                <p className={styles.tierFeeNote}>{t("packages.amountNote")}</p>
                <div className={styles.cardRule} />
                <ul className={styles.benefitList}>
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>
                      <span className={styles.check}><CheckIcon /></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a className={styles.cardAction} href="#sponsorship-contact">
                  {t("packages.action")} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.terms}`} id="sponsorship-terms">
        <div className={styles.container}>
          <div className={styles.termsLayout}>
            <p className={styles.eyebrow}>{t("nav.terms")}</p>
            <p>{t("terms")}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="sponsorship-contact">
        <div className={styles.container}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon} aria-hidden="true">✉</div>
            <div className={styles.contactCopy}>
              <p className={styles.eyebrow}>{t("contact.eyebrow")}</p>
              <h2>{t("contact.title")}</h2>
              <p>{t("contact.contact")}</p>
            </div>
            <div className={styles.contactLinks}>
              <a href={`mailto:${t("contact.email")}`}>{t("contact.email")} <span aria-hidden="true">↗</span></a>
              <a href={`tel:${t("contact.phone")}`}>{t("contact.phone")} <span aria-hidden="true">↗</span></a>
              <a href="https://www.ichec2026.com/en/" target="_blank" rel="noreferrer">{t("contact.website")} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
