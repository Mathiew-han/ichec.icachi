"use client";

import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, type Variants } from "framer-motion";
import styles from "./home.module.css";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isZh = locale.startsWith("zh");

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
            className={styles.heroDivider}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          />
        </div>
      </section>

      <motion.section
        className={`${styles.section} ${styles.aboutSection}`}
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
            <div className={styles.aboutBrief}>{t("aboutBrief")}</div>
            <div className={`${styles.aboutFull} ${isZh ? styles.aboutFullZh : styles.aboutFullEn}`}>
              <p className={styles.textParagraphTight}>{t("aboutP1")}</p>
              <p className={styles.textParagraphTight}>{t("aboutP2")}</p>
              <p className={styles.textParagraphTight}>{t("aboutP3")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Program & Timeline Section - Refactored */}
      <motion.section 
        className={`${styles.section} ${styles.timelineSection}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
      >
        <div className={styles.horizontalTimelineContainer}>
          <div>
            <p className={`${styles.sectionTitle} ${styles.timelineTitle}`}>{t("milestonesSubtitle")}</p>
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

      {/* Organizers Section */}
      <motion.section
        className={`${styles.section} py-16 mt-12 border-t border-black/5 dark:border-white/5`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-10">
            {isZh ? "主办 / 承办" : "Organizers / Co-organizers"}
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
            <div className="flex flex-col items-center gap-5">
              <img 
                src="https://ichec.icachi.org/assets/img/logo/icachi-logo.svg" 
                alt="ICACHI" 
                className="h-16 w-auto object-contain dark:brightness-0 dark:invert"
              />
              <span className="text-sm font-semibold text-black/70 dark:text-white/70">
                {isZh ? "世界华人华侨人机交互协会" : "ICACHI"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-5">
              <img 
                src="https://upload.wikimedia.org/wikipedia/zh/thumb/7/71/City_University_of_Macau_logo.svg/250px-City_University_of_Macau_logo.svg.png" 
                alt="City University of Macau" 
                className="h-16 w-auto object-contain"
              />
              <span className="text-sm font-semibold text-black/70 dark:text-white/70">
                {isZh ? "澳门城市大学" : "City University of Macau"}
              </span>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
