"use client";

import { Link } from "@/navigation";
import { Markdown } from "@/components/Markdown";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import styles from "./cfp.module.css";

const easeStandard: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeStandard } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeStandard } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeStandard } },
};

export function CFPClient({ content }: { content: string }) {
  const t = useTranslations("CFP");
  const tHome = useTranslations("Home");

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.gridTop}>
          <motion.div
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            variants={slideInLeft}
          >
            <div className={styles.cardHeader}>
              <div className={styles.label}>{t("submit.title")}</div>
              <div className={styles.cardTitle}>{t("submit.heading")}</div>
            </div>
            <div className={styles.cardBody}>{t("submit.desc")}</div>
            <div className={styles.cardActions}>
              <a href="https://easychair.org/my/conference?conf=ichec2026" className={styles.primaryButton}>
                {t("submit.cta")}
              </a>
              <a href="https://easychair.org/my/conference?conf=ichec2026" className={styles.secondaryLink}>
                {t("submit.easychair")}
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            variants={slideInRight}
          >
            <div className={styles.cardHeader}>
              <div className={styles.label}>{t("resources.title")}</div>
              <div className={styles.cardTitle}>{t("resources.heading")}</div>
            </div>
            <div className={styles.resourceList}>
              <a
                className={styles.resourceItem}
                href="https://chi2026.acm.org/chi-publication-formats/"
                target="_blank"
                rel="noreferrer"
              >
                {t("resources.template")}
              </a>
              <a
                className={styles.resourceItem}
                href="https://www.acm.org/publications/icps/integrity-check-criteria"
                target="_blank"
                rel="noreferrer"
              >
                {t("resources.check")}
              </a>
              <a
                className={styles.resourceItem}
                href="https://www.ichec2026.com/en/"
                target="_blank"
                rel="noreferrer"
              >
                {t("resources.website")}
              </a>
              <Link className={styles.resourceItem} href="/registration">
                {t("resources.registration")}
              </Link>
              <a className={styles.resourceItem} href="mailto:contact@chinese-chi.org">
                {t("resources.contact")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionWithNote}`}>
        <div className={styles.sectionLineNote}>
          <span className={styles.sectionLineNoteText}>{t("resources.hint")}</span>
        </div>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div className={styles.label}>{t("tracks.title")}</div>
          <h2 className={styles.h2}>{t("tracks.heading")}</h2>
          <p className={styles.lead}>{t("tracks.desc")}</p>
        </motion.div>

        <div className={styles.trackGrid}>
          {[
            {
              key: "paper",
              bullets: [t("tracks.paper.b1"), t("tracks.paper.b2"), t("tracks.paper.b3")],
            },
            {
              key: "poster",
              bullets: [t("tracks.poster.b1"), t("tracks.poster.b2"), t("tracks.poster.b3")],
            },
            {
              key: "workshop",
              bullets: [t("tracks.workshop.b1"), t("tracks.workshop.b2"), t("tracks.workshop.b3")],
            },
            {
              key: "artdemo",
              bullets: [t("tracks.artdemo.b1"), t("tracks.artdemo.b2"), t("tracks.artdemo.b3")],
            },
          ].map((item, index) => (
            <motion.div
              key={item.key}
              className={styles.trackItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
            >
              <div className={styles.expandCard}>
                <div className={styles.expandTrigger}>
                  <div className={styles.expandSummary}>
                    <div className={styles.expandTitle}>{t(`tracks.${item.key}.title`)}</div>
                    <div className={styles.expandDesc}>{t(`tracks.${item.key}.desc`)}</div>
                  </div>
                </div>
                <div className={styles.expandContent}>
                  <ul className={styles.bullets}>
                    {item.bullets.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionWithNote}`}>
        <div className={styles.sectionLineNote}>
          <span className={styles.sectionLineNoteText}>{t("timeline.desc")}</span>
        </div>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div className={styles.label}>{tHome("milestonesTitle")}</div>
          <h2 className={styles.h2}>{t("timeline.heading")}</h2>
        </motion.div>

        <div className={styles.horizontalTimeline}>
          {Array.from({ length: 8 }, (_, index) => {
            const step = String(index + 1);
            return {
              step,
              title: t(`timeline.step${step}.title`),
              date: t(`timeline.step${step}.date`),
              status: tHome("timelineStatusPending"),
            };
          }).map((item) => (
            <div key={item.step} className={styles.horizontalStep}>
              <div className={styles.horizontalCircle}>{item.step}</div>
              <div className={styles.horizontalContent}>
                <div className={styles.horizontalTitle}>{item.title}</div>
                <div className={styles.horizontalDate}>{item.date}</div>
                <div className={styles.horizontalStatus}>{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.guideSection}`}>
        <div className={styles.guideLayout}>
          <motion.div
            className={`${styles.sectionHeader} ${styles.guideHeader}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            variants={fadeUp}
          >
            <div className={styles.label}>{t("guide.title")}</div>
            <h2 className={styles.h2}>{t("guide.heading")}</h2>
            <p className={styles.lead}>{t("guide.desc")}</p>
          </motion.div>

          <div className={styles.guideCard}>
            <div className={styles.expandContent}>
              <div className={styles.markdownWrap}>
                <Markdown content={content} variant="cfp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
