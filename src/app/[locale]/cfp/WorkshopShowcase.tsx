"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./cfp.module.css";
import workshopEn from "./workshops.en.json";
import workshopZhCN from "./workshops.zh-CN.json";
import workshopZhTW from "./workshops.zh-TW.json";

const sourceDocumentUrl = "https://docs.google.com/document/d/1mtPgChHjtDAH_UauceDvsBAUSr275UEztXoQs9jU51I/edit?usp=sharing";
const springerLnaiUrl = "https://www.springer.com/gp/computer-science/lncs/lncs-topical-sublibraries";

type WorkshopEntry = {
  id: string;
  poster: string;
  title: string;
  description: string;
  organisers: string[];
  contact: string;
  registrationUrl: string;
  moreInfoUrl?: string;
};

type WorkshopContent = {
  eyebrow: string;
  title: string;
  intro: string;
  facts: Array<{ label: string; value: string }>;
  participationTitle: string;
  participation: string[];
  viewSource: string;
  registerConference: string;
  listEyebrow: string;
  listTitle: string;
  listIntro: string;
  workshopLabel: string;
  detailsLabel: string;
  organisersLabel: string;
  contactLabel: string;
  registerWorkshop: string;
  moreInformation: string;
  chairsTitle: string;
  chairsNote: string;
  publicationEyebrow: string;
  publicationTitle: string;
  publicationBefore: string;
  publicationLink: string;
  publicationAfter: string;
  workshops: WorkshopEntry[];
  chairs: Array<{ name: string; affiliation: string; email: string }>;
};

const workshopContentByLocale: Record<string, WorkshopContent> = {
  en: workshopEn as WorkshopContent,
  "zh-CN": workshopZhCN as WorkshopContent,
  "zh-TW": workshopZhTW as WorkshopContent,
};

export function WorkshopShowcase({ locale }: { locale: string }) {
  const content = workshopContentByLocale[locale] ?? workshopEn as WorkshopContent;
  const [activeWorkshopIndex, setActiveWorkshopIndex] = useState(0);
  const activeWorkshop = content.workshops[activeWorkshopIndex];

  const selectWorkshop = (index: number, focusTab = false) => {
    const nextIndex = (index + content.workshops.length) % content.workshops.length;
    setActiveWorkshopIndex(nextIndex);
    if (focusTab) {
      requestAnimationFrame(() => document.getElementById(`workshop-tab-${nextIndex + 1}`)?.focus());
    }
  };

  return (
    <>
      <section className={`${styles.section} ${styles.publicationSection}`} aria-labelledby="publication-title">
        <div className={styles.publicationNotice}>
          <div className={styles.publicationMark} aria-hidden="true">LN</div>
          <div>
            <div className={styles.label}>{content.publicationEyebrow}</div>
            <h2 id="publication-title" className={styles.publicationTitle}>{content.publicationTitle}</h2>
            <p className={styles.publicationCopy}>
              {content.publicationBefore}{" "}
              <a href={springerLnaiUrl} target="_blank" rel="noreferrer">{content.publicationLink}</a>{" "}
              {content.publicationAfter}
            </p>
          </div>
          <a className={styles.publicationArrow} href={springerLnaiUrl} target="_blank" rel="noreferrer" aria-label={content.publicationLink}>↗</a>
        </div>
      </section>

      <section id="cfp-workshops" className={`${styles.section} ${styles.workshopShowcase}`} aria-labelledby="workshop-showcase-title">
        <motion.div
          className={styles.workshopHero}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className={styles.workshopHeroCopy}>
            <div className={styles.label}>{content.eyebrow}</div>
            <h2 id="workshop-showcase-title" className={styles.workshopHeroTitle}>{content.title}</h2>
            <p className={styles.workshopHeroIntro}>{content.intro}</p>
            <div className={styles.workshopHeroActions}>
              <a className={styles.primaryButton} href={sourceDocumentUrl} target="_blank" rel="noreferrer">
                {content.viewSource} <span aria-hidden="true">↗</span>
              </a>
              <Link className={styles.workshopTextLink} href="/registration">
                {content.registerConference} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className={styles.workshopHeroSide}>
            <div className={styles.workshopFacts}>
              {content.facts.map((fact) => (
                <div key={fact.label} className={styles.workshopFact}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
            <div className={styles.participationPanel}>
              <h3>{content.participationTitle}</h3>
              <ol>
                {content.participation.map((item, index) => (
                  <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        <div className={styles.workshopListHeader}>
          <div>
            <div className={styles.label}>{content.listEyebrow}</div>
            <h2>{content.listTitle}</h2>
          </div>
          <p>{content.listIntro}</p>
        </div>

        <div className={styles.workshopBrowser}>
          <div className={styles.workshopNav} role="tablist" aria-orientation="vertical">
            {content.workshops.map((workshop, index) => {
              const isActive = index === activeWorkshopIndex;

              return (
                <button
                  id={`workshop-tab-${index + 1}`}
                  key={workshop.id}
                  className={`${styles.workshopNavItem} ${isActive ? styles.workshopNavItemActive : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="active-workshop-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectWorkshop(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      selectWorkshop(index + 1, true);
                    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      selectWorkshop(index - 1, true);
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      selectWorkshop(0, true);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      selectWorkshop(content.workshops.length - 1, true);
                    }
                  }}
                >
                  <span className={styles.workshopNavNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.workshopNavTitle}>{workshop.title}</span>
                  <span className={styles.workshopNavArrow} aria-hidden="true">→</span>
                </button>
              );
            })}
          </div>

          <motion.article
            id="active-workshop-panel"
            key={activeWorkshop.id}
            className={styles.workshopPanel}
            role="tabpanel"
            aria-labelledby={`workshop-tab-${activeWorkshopIndex + 1}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className={styles.workshopPosterStage}>
              <img
                className={styles.workshopPosterFull}
                src={activeWorkshop.poster}
                alt={`${content.workshopLabel} ${activeWorkshopIndex + 1}: ${activeWorkshop.title}`}
              />
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
