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
const workshopSections = ["topics", "timeline", "requirements", "support", "participation", "chairs"] as const;
const workshopItemCounts = { topics: 4, requirements: 3, support: 5, participation: 4, chairs: 2 };
const workshopFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfqd0YCnKP056a-Gmv8luVLSnO6_CL56LuL3aFGpODmlSIgSA/viewform?usp=publish-editor";
const workshopTemplateUrl = "https://docs.google.com/document/d/1c1IM1TA6uayPuOaBB1kIwGNpzgZC8PcXyP4-h9XbMUo/edit?usp=sharing";
const workshopChairEmails = ["wang_yun@buaa.edu.cn", "yjgao@cityu.edu.mo"];
const cameraReadyFiles = [
  { key: "cameraReadyInstructions", type: "DOCX", href: "/downloads/camera-ready/ICHEC2026_Camera_Ready_Instructions.docx" },
  { key: "springerInstructions", type: "PDF", href: "/downloads/camera-ready/Springer_Instructions_for_Authors_of_Proceedings.pdf" },
  { key: "licenseToPublish", type: "DOCX", href: "/downloads/camera-ready/Attachment_1_License_to_Publish.docx" },
  { key: "publicationInformation", type: "XLSX", href: "/downloads/camera-ready/Attachment_2_Final_Publication_Information.xlsx" },
  { key: "latexTemplate", type: "ZIP", href: "/downloads/camera-ready/Attachment_3_LaTeX_Proceedings_Template.zip" },
  { key: "wordTemplate", type: "ZIP", href: "/downloads/camera-ready/Attachment_3_Microsoft_Word_Proceedings_Template.zip" },
] as const;

function TrackDetailList({
  track,
  section,
}: {
  track: (typeof tracks)[number];
  section: (typeof detailSections)[number] | (typeof workshopSections)[number];
}) {
  const t = useTranslations("CFP");

  if (section === "timeline") {
    return (
      <ol className={styles.dateList}>
        {Array.from({ length: 4 }, (_, index) => {
          const step = index + 1;
          const isSupersededSubmissionDate = track === "paper" && step <= 2;

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
      </ol>
    );
  }

  const itemCount = track === "workshop" && section !== "outcome"
    ? workshopItemCounts[section]
    : section === "requirements" ? 4 : 3;

  return (
    <ul className={styles.bullets}>
      {Array.from({ length: itemCount }, (_, index) => {
        const step = index + 1;
        const href = track === "workshop"
          ? section === "requirements" && step === 2 ? workshopTemplateUrl
            : section === "requirements" && step === 3 ? workshopFormUrl
              : undefined
          : undefined;
        return (
          <li key={step}>
            {href ? (
              <a href={href} className={styles.secondaryLink} target="_blank" rel="noreferrer">
                {t(`tracks.${track}.${section}.b${step}`)}
              </a>
            ) : t(`tracks.${track}.${section}.b${step}`)}
            {track === "workshop" && section === "chairs" && (
              <>
                <br />
                <a className={styles.secondaryLink} href={`mailto:${workshopChairEmails[index]}`}>
                  {workshopChairEmails[index]}
                </a>
              </>
            )}
          </li>
        );
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

      <section id="cfp-resources" className={`${styles.section} ${styles.resourcesSection}`}>
        <motion.div
          className={styles.resourcesHero}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={fadeUp}
        >
          <div>
            <div className={styles.label}>{t("resources.title")}</div>
            <h2 className={styles.resourcesTitle}>{t("resources.heading")}</h2>
            <p className={styles.resourcesLead}>{t("resources.cameraReadyDesc")}</p>
          </div>
          <a className={styles.resourcesJump} href="#camera-ready-downloads">
            <span>{t("resources.download")}</span><span aria-hidden="true">↓</span>
          </a>
        </motion.div>

        <div id="camera-ready-downloads" className={styles.resourceGrid}>
          {cameraReadyFiles.map((file, index) => (
            <a key={file.key} className={styles.resourceFile} href={file.href} download>
              <span className={styles.resourceFileIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.resourceFileCopy}>
                <span className={styles.resourceFileName}>{t(`resources.${file.key}`)}</span>
                <span className={styles.resourceFileType}>{file.type}</span>
              </span>
              <span className={styles.resourceFileDownload} aria-hidden="true">↓</span>
            </a>
          ))}
        </div>

        <div className={styles.resourceFooter}>
          <p>{t("resources.references")}</p>
          <div className={styles.resourceSupportLinks}>
            <a href="https://www.ichec2026.com/en/" target="_blank" rel="noreferrer">{t("resources.website")} <span aria-hidden="true">↗</span></a>
            <Link href="/registration">{t("resources.registration")} <span aria-hidden="true">↗</span></Link>
            <a href="mailto:ichec2026.info@gmail.com">{t("resources.contact")} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.submitSection}`}>
        <motion.div
          className={styles.submitPanel}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={slideInLeft}
        >
          <div className={styles.cardHeader}>
            <div className={styles.label}>{t("submit.title")}</div>
            <div className={styles.cardTitle}>{t("submit.heading")}</div>
            <div className={styles.cardBody}>{t("submit.desc")}</div>
          </div>
          <div className={styles.cardActions}>
            <a href="https://easychair.org/my/conference?conf=ichec2026" className={styles.primaryButton}>{t("submit.cta")}</a>
            <a href="https://easychair.org/my/conference?conf=ichec2026" className={styles.secondaryLink}>{t("submit.easychair")}</a>
            <a href={workshopFormUrl} className={styles.secondaryLink}>{t("tracks.workshop.submit")}</a>
          </div>
        </motion.div>
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
