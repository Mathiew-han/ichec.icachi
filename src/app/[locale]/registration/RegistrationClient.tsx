"use client";

import { Link } from "@/navigation";
import { Markdown } from "@/components/Markdown";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
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

  return (
    <div className={styles.page}>
      <motion.section
        className={styles.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={fadeUp}
      >
        <div className={styles.eyebrow}>{t("eyebrow")}</div>
        <h2 className={styles.h1}>
          <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={8} baseRotation={3}>
            {t("title")}
          </ScrollReveal>
        </h2>
        <p className={styles.lead}>{t("lead")}</p>

        <div className={styles.quickLinks}>
          <Link href="/cfp" className={styles.textLink}>
            {t("links.cfp")}
          </Link>
          <Link href="/program" className={styles.textLink}>
            {t("links.program")}
          </Link>
          <a href="mailto:contact@chinese-chi.org" className={styles.textLink}>
            {t("links.contact")}
          </a>
        </div>
      </motion.section>

      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div className={styles.kicker}>{t("fees.kicker")}</div>
          <h3 className={styles.h2}>{t("fees.title")}</h3>
          <p className={styles.sublead}>{t("fees.desc")}</p>
        </motion.div>

        <div className={styles.markdownWrap}>
          <Markdown content={content} />
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

