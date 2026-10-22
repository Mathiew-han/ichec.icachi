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

const tracks = ["paper", "poster", "artdemo"] as const;
const cameraReadyFiles = [
  { key: "cameraReadyInstructions", type: "DOCX", href: "/downloads/camera-ready/ICHEC2026_Camera_Ready_Instructions.docx" },
  { key: "springerInstructions", type: "PDF", href: "/downloads/camera-ready/Springer_Instructions_for_Authors_of_Proceedings.pdf" },
  { key: "licenseToPublish", type: "DOCX", href: "/downloads/camera-ready/Attachment_1_License_to_Publish.docx" },
  { key: "publicationInformation", type: "XLSX", href: "/downloads/camera-ready/Attachment_2_Final_Publication_Information.xlsx" },
  { key: "latexTemplate", type: "ZIP", href: "/downloads/camera-ready/Attachment_3_LaTeX_Proceedings_Template.zip" },
  { key: "wordTemplate", type: "ZIP", href: "/downloads/camera-ready/Attachment_3_Microsoft_Word_Proceedings_Template.zip" },
] as const;

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
                    <a className={styles.primaryButton} href="#cfp-guide">
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
          </div>
        </motion.div>
      </section>

      <section id="cfp-guide" className={`${styles.section} ${styles.guideSection}`}>
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
