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

const tracks = ["paper", "poster", "workshop", "artdemo"] as const;
const detailSections = ["topics", "timeline", "requirements", "outcome"] as const;

function TrackDetailList({
  track,
  section,
}: {
  track: (typeof tracks)[number];
  section: (typeof detailSections)[number];
}) {
  const t = useTranslations("CFP");

  if (section === "timeline") {
    return (
      <ol className={styles.dateList}>
        {Array.from({ length: 4 }, (_, index) => {
          const step = index + 1;
          const isSupersededSubmissionDate = track === "paper" && step <= 3;

          return (
            <li
              key={step}
              className={`${styles.dateItem}${isSupersededSubmissionDate ? ` ${styles.supersededDateItem}` : ""}`}
            >
              <span className={styles.dateLabel}>{t(`tracks.${track}.timeline.d${step}Label`)}</span>
              <span className={styles.dateValue}>{t(`tracks.${track}.timeline.d${step}Date`)}</span>
            </li>
          );
        })}
        {track === "paper" ? (
          <li className={`${styles.dateItem} ${styles.submissionStatusItem}`}>
            <span className={styles.submissionStatus}>{t("tracks.paper.submissionStatus")}</span>
          </li>
        ) : null}
      </ol>
    );
  }

  const itemCount = section === "requirements" ? 4 : 3;

  return (
    <ul className={styles.bullets}>
      {Array.from({ length: itemCount }, (_, index) => {
        const step = index + 1;
        return <li key={step}>{t(`tracks.${track}.${section}.b${step}`)}</li>;
      })}
    </ul>
  );
}

export function CFPClient({ content }: { content: string }) {
  const t = useTranslations("CFP");

  return (
    <div className={styles.page}>
      <section className={styles.section}>
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
          {tracks.map((track, index) => (
            <motion.div
              key={track}
              className={styles.trackItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
            >
              <div className={styles.expandCard}>
                <div className={styles.expandTrigger}>
                  <div className={styles.expandSummary}>
                    <div className={styles.expandTitle}>{t(`tracks.${track}.title`)}</div>
                    <div className={styles.expandDesc}>{t(`tracks.${track}.desc`)}</div>
                  </div>
                </div>
                <div className={styles.expandContent}>
                  <dl className={styles.trackMeta}>
                    <div>
                      <dt>{t("tracks.overviewLabels.bestFor")}</dt>
                      <dd>{t(`tracks.${track}.bestFor`)}</dd>
                    </div>
                    <div>
                      <dt>{t("tracks.overviewLabels.deadline")}</dt>
                      <dd>{t(`tracks.${track}.deadline`)}</dd>
                    </div>
                    <div>
                      <dt>{t("tracks.overviewLabels.materials")}</dt>
                      <dd>{t(`tracks.${track}.materials`)}</dd>
                    </div>
                  </dl>
                  <div className={styles.expandActions}>
                    <a className={styles.primaryButton} href={`#cfp-${track}`}>
                      {t("tracks.view")}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionWithNote}`}>
        <div className={styles.sectionLineNote}>
          <span className={styles.sectionLineNoteText}>{t("tracks.note")}</span>
        </div>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div className={styles.label}>{t("tracks.detailsTitle")}</div>
          <h2 className={styles.h2}>{t("tracks.detailsHeading")}</h2>
          <p className={styles.lead}>{t("tracks.detailsDesc")}</p>
        </motion.div>

        <div className={styles.trackDetails}>
          {tracks.map((track, index) => (
            <motion.article
              id={`cfp-${track}`}
              key={track}
              className={styles.trackDetail}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
            >
              <div className={styles.trackDetailHeader}>
                <div>
                  <div className={styles.trackKicker}>{t(`tracks.${track}.kicker`)}</div>
                  <h3 className={styles.trackDetailTitle}>{t(`tracks.${track}.title`)}</h3>
                </div>
                <a href="https://easychair.org/my/conference?conf=ichec2026" className={styles.secondaryLink}>
                  {t("tracks.submit")}
                </a>
              </div>
              <p className={styles.trackDetailLead}>{t(`tracks.${track}.desc`)}</p>

              <div className={styles.detailGrid}>
                {detailSections.map((section) => (
                  <section key={section} className={styles.detailBlock}>
                    <h4>{t(`tracks.${track}.${section}.title`)}</h4>
                    <TrackDetailList track={track} section={section} />
                  </section>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionWithNote}`}>
        <div className={styles.sectionLineNote}>
          <span className={styles.sectionLineNoteText}>{t("resources.hint")}</span>
        </div>
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
              <a className={styles.resourceItem} href="mailto:ichec2026.info@gmail.com">
                {t("resources.contact")}
              </a>
            </div>
          </motion.div>
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
