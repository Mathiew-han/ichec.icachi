"use client";

import { useTranslations } from "next-intl";
import styles from "./registration.module.css";

const paymentChannels = [
  {
    id: "cny",
    href: "https://ichec2026.scimeeting.cn/cn/reg/index/37885",
    symbol: "¥",
  },
  {
    id: "hkd",
    href: "https://ichec2026.scimeeting.cn/en/reg/index/37885",
    symbol: "HK$",
  },
] as const;

const feeRows = ["author", "professional", "student"] as const;
const pricePeriods = ["early", "regular", "late"] as const;

export function RegistrationClient() {
  const t = useTranslations("Registration.portal");

  return (
    <div className={styles.page}>
      <section className={styles.feesSection} aria-labelledby="registration-fees-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{t("fees.eyebrow")}</p>
          <h2 id="registration-fees-title">{t("fees.title")}</h2>
          <p>{t("fees.lead")}</p>
        </div>

        <div className={styles.tableFrame}>
          <div className={styles.tableScroll}>
            <table className={styles.feeTable}>
              <caption className={styles.srOnly}>{t("fees.title")}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("fees.columns.category")}</th>
                  {pricePeriods.map((period) => (
                    <th key={period} scope="col">
                      <span>{t(`fees.columns.${period}.title`)}</span>
                      <small>{t(`fees.columns.${period}.deadline`)}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row) => (
                  <tr key={row}>
                    <th scope="row">
                      <span>{t(`fees.rows.${row}.title`)}</span>
                      <small>{t(`fees.rows.${row}.subtitle`)}</small>
                    </th>
                    {pricePeriods.map((period) => (
                      <td key={period} className={row === "author" && period !== "early" ? styles.closedCell : undefined}>
                        {row === "author" && period !== "early" ? (
                          <span className={styles.closed}>{t("fees.authorClosed")}</span>
                        ) : (
                          <span className={styles.price}>{t(`fees.rows.${row}.prices.${period}`)}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className={styles.studentNote}>{t("fees.studentNote")}</p>
      </section>

      <section className={styles.paymentSection} aria-labelledby="payment-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{t("payment.eyebrow")}</p>
          <h2 id="payment-title">{t("payment.title")}</h2>
          <p>{t("payment.lead")}</p>
        </div>

        <div className={styles.paymentGrid}>
          {paymentChannels.map((channel) => (
            <a key={channel.id} className={styles.paymentButton} href={channel.href} target="_blank" rel="noreferrer">
              <span className={styles.paymentSymbol} aria-hidden="true">{channel.symbol}</span>
              <span>
                <strong>{t(`payment.channels.${channel.id}.title`)}</strong>
                <small>{t(`payment.channels.${channel.id}.hint`)}</small>
              </span>
              <span className={styles.externalMark} aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <aside className={styles.invoiceNotice}>
          <strong>{t("payment.invoice.title")}</strong>
          <p>{t("payment.invoice.domestic")}</p>
          <p>{t("payment.invoice.international")}</p>
        </aside>
      </section>

      <section className={styles.policiesSection} aria-labelledby="registration-policies-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{t("policies.eyebrow")}</p>
          <h2 id="registration-policies-title">{t("policies.title")}</h2>
          <p>{t("policies.lead")}</p>
        </div>

        <div className={styles.accountNotice}>
          <strong>{t("policies.account.title")}</strong>
          <p>{t("policies.account.text")}</p>
        </div>

        <div className={styles.policyGrid}>
          {(["author", "attendance", "cancellation"] as const).map((policy) => (
            <article className={styles.policyCard} key={policy}>
              <span className={styles.policyNumber} aria-hidden="true">{policy === "author" ? "01" : policy === "attendance" ? "02" : "03"}</span>
              <h3>{t(`policies.cards.${policy}.title`)}</h3>
              <p>{t(`policies.cards.${policy}.text`)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
