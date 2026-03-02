"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, type Variants } from "framer-motion";
import styles from "./home.module.css";

export default function Home() {
  const t = useTranslations("Home");

  const easeStandard: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeStandard } }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeStandard } }
  };

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroEyebrow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t("date")} · {t("location")}
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t("title")}
          </motion.h1>

          <motion.div
            className={styles.heroTagline}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t("tagline")}
          </motion.div>

          <motion.div
            className={styles.heroActions}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link href="/registration" className={styles.ctaButton}>
              {t("registerNow")} <span>→</span>
            </Link>
            <Link href="/cfp" className={styles.glassButton}>
              {t("cfp")}
            </Link>
            <Link href="/important-dates" className={styles.glassButton}>
              {t("importantDates")}
            </Link>
            <Link href="/program" className={styles.glassButton}>
              {t("program")}
            </Link>
          </motion.div>

          <motion.div
            className={styles.heroDivider}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          />
        </div>
      </section>


      {/* About Section - Moved up and became part of Hero flow */}
      <motion.section 
        className={styles.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className={styles.gridSplit}>
          <div className={styles.macauCardLarge}>
            <div className={styles.labelBox}>
              <span className={styles.labelText}>{t("aboutTitle")}</span>
            </div>
            <h2 className={styles.sectionTitle}>
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} baseRotation={5}>
                {t("aboutSubtitle")}
              </ScrollReveal>
            </h2>
            <div className={styles.textBlock}>
              <p className={styles.dropCap}>{t("aboutP1")}</p>
              <p className={styles.textParagraph}>{t("aboutP2")}</p>
              <p className={styles.textParagraph}>{t("aboutP3")}</p>
            </div>
            <div className={styles.mt8}>
              <Link href="/registration" className={styles.ctaButton}>
                {t("registerNow")} <span>→</span>
              </Link>
            </div>
          </div>
          <div className={styles.macauCardTheme}>
            <div className={`${styles.labelBox} ${styles.labelBoxTheme}`}>
              <span className={`${styles.labelText} ${styles.labelTextTheme}`}>
                {t("themeTitle")}
              </span>
            </div>
            <div className={styles.spaceY5}>
              <div className={styles.sectionTitle}>
                <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} baseRotation={5}>
                  {t("themeSubtitle")}
                </ScrollReveal>
              </div>
              <div className={styles.textBlock}>
                <p className={styles.textParagraphTight}>{t("themeDescription")}</p>
              </div>
              <div className={`${styles.pt4} ${styles.spaceY3}`}>
                <div className={styles.labelBox}>Research · Design · Art · Industry</div>
                <div className={styles.labelBox}>
                  Human-Centered AI · Cultural Computing · Responsible Tech
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Program & Timeline Section - Refactored */}
      <motion.section 
        className={styles.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
      >
        <div className={styles.horizontalTimelineContainer}>
          <div className={styles.mb6}>
            <span className={`${styles.labelText} ${styles.block} ${styles.mb2}`}>
              {t("milestonesTitle")}
            </span>
            <p className={styles.sectionTitle}>{t("milestonesSubtitle")}</p>
          </div>

          <div className={styles.horizontalTimeline}>
            {/* Step 1 */}
            <div className={`${styles.horizontalStep} ${styles.timelineCompleted}`}>
              <div className={styles.horizontalCircle}>1</div>
              <div className={styles.horizontalContent}>
                <div className={styles.horizontalTitle}>{t("timelineCfpLaunch")}</div>
                <div className={styles.horizontalDate}>{t("timelineEarlyMay")}</div>
                <div className={styles.horizontalStatus}>
                  {t("timelineStatusCompleted")}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`${styles.horizontalStep} ${styles.timelineActive}`}>
              <div className={styles.horizontalCircle}>2</div>
              <div className={styles.horizontalContent}>
                <div className={styles.horizontalTitle}>{t("timelineSubmissionDeadline")}</div>
                <div className={styles.horizontalDate}>{t("timelineLateAugust")}</div>
                <div className={styles.horizontalStatus}>
                  {t("timelineStatusInProgress")}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={styles.horizontalStep}>
              <div className={styles.horizontalCircle}>3</div>
              <div className={styles.horizontalContent}>
                <div className={styles.horizontalTitle}>{t("timelineDecisions")}</div>
                <div className={styles.horizontalDate}>{t("timelineLateSeptember")}</div>
                <div className={styles.horizontalStatus}>
                  {t("timelineStatusPending")}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mt6}>
            <Link href="/important-dates" className={styles.ctaButton}>
              View Full Schedule →
            </Link>
          </div>
        </div>

        {/* Opening & Closing Ceremony */}
        <div className={styles.eventGrid}>
          <div className={styles.eventCard}>
            <div className={styles.eventTitle}>{t("keynotesTitle")}</div>
            <div className={styles.eventDate}>Nov 23, 2026</div>
            <div className={styles.eventDesc}>
              Join us for the grand opening ceremony featuring keynote speeches from industry leaders.
            </div>
          </div>
          
          <div className={styles.eventCard}>
            <div className={styles.eventTitle}>Closing Ceremony</div>
            <div className={styles.eventDate}>Nov 26, 2026</div>
            <div className={styles.eventDesc}>
              Celebrating the best papers, student competitions, and handing over to the next host.
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
