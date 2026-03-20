"use client";

import { Markdown } from "@/components/Markdown";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";
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

export function RegistrationClient({ content }: { content: string }) {
  const t = useTranslations("Registration");
  const pricingT = useTranslations("Registration.fees.pricing");
  const cardsT = useTranslations("Registration.fees.cards");
  const cards = useMemo(
    () => [
      {
        title: cardsT("standard.title"),
        desc: cardsT("standard.desc"),
        price: cardsT("standard.price"),
        unit: cardsT("standard.unit"),
      },
      {
        title: cardsT("student.title"),
        desc: cardsT("student.desc"),
        price: cardsT("student.price"),
        unit: cardsT("student.unit"),
      },
      {
        title: cardsT("contact.title"),
        desc: cardsT("contact.desc"),
        price: cardsT("contact.price"),
        unit: "",
      },
    ],
    [cardsT],
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

    const feesBlock = beforeTable.slice(headingIdx);
    const headingLine = feesBlock.split(/\r?\n/)[0] ?? "";
    const prefix = beforeTable.slice(0, headingIdx).trimEnd();
    const before = `${prefix}\n\n${headingLine}\n`.trimStart();
    return { before, after: afterTable };
  }, [content]);

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.markdownWrap}>
          <Markdown content={feesMarkdown.before} />
        </div>

        <div className={styles.pricingShell}>
          <div className={styles.pricingTop}>
            <div className={styles.pricingDesc}>{pricingT("desc")}</div>
            <a className={styles.pricingCta} href="#" aria-label={pricingT("cta")}>
              {pricingT("cta")}
            </a>
          </div>

          <div className={styles.pricingCards} aria-label={pricingT("title")}>
            {cards.map((c) => (
              <article key={c.title} className={styles.priceCard} aria-label={c.title}>
                <div className={styles.cardTitle}>{c.title}</div>
                <div className={styles.cardDesc}>{c.desc}</div>
                <div className={styles.cardPriceRow}>
                  <span className={styles.cardPrice}>{c.price}</span>
                  {c.unit ? <span className={styles.cardUnit}>{c.unit}</span> : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.markdownWrap}>
          <Markdown content={feesMarkdown.after} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionNoBorder}`}>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div className={styles.kicker}>{t("checkin.kicker")}</div>
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

      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div className={styles.kicker}>{t("policies.kicker")}</div>
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

      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div className={styles.kicker}>{t("stay.kicker")}</div>
          <h3 className={styles.h2}>{t("stay.title")}</h3>
          <p className={styles.sublead}>{t("stay.desc")}</p>
        </motion.div>

        <div className={styles.twoCol}>
          <div>
            <div className={styles.inlineGroup}>
              <a className={styles.textLink} href="#" aria-disabled="true">
                {t("stay.links.baidu")}
              </a>
              <a className={styles.textLink} href="#" aria-disabled="true">
                {t("stay.links.google")}
              </a>
            </div>
            <div className={styles.muted}>{t("stay.links.hint")}</div>
          </div>

          <div>
            <div className={styles.hotelHead}>
              <span>{t("stay.hotelHead.name")}</span>
              <span>{t("stay.hotelHead.walk")}</span>
              <span>{t("stay.hotelHead.link")}</span>
            </div>
            <div className={styles.hotelRow}>
              <span>{t("stay.hotels.h1.name")}</span>
              <span>{t("stay.hotels.h1.walk")}</span>
              <a className={styles.textLink} href="#" aria-disabled="true">
                {t("stay.hotels.h1.site")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
