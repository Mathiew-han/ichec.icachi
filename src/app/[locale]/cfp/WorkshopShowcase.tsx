"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
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
  openPoster: string;
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

        <div className={styles.workshopGrid}>
          {content.workshops.map((workshop, index) => (
            <motion.article
              id={`workshop-${index + 1}`}
              key={workshop.id}
              className={styles.workshopCard}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              transition={{ duration: 0.65, delay: (index % 2) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <a className={styles.workshopPoster} href={workshop.poster} target="_blank" rel="noreferrer">
                <img src={workshop.poster} alt={`${content.workshopLabel} ${index + 1}: ${workshop.title}`} loading="lazy" />
                <span className={styles.workshopPosterNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.workshopPosterAction}>{content.openPoster} ↗</span>
              </a>

              <div className={styles.workshopCardBody}>
                <div className={styles.workshopCardKicker}>{content.workshopLabel} {String(index + 1).padStart(2, "0")}</div>
                <h3>{workshop.title}</h3>
                <p className={styles.workshopDescription}>{workshop.description}</p>

                <div className={styles.workshopCardActions}>
                  <a className={styles.workshopRegisterButton} href={workshop.registrationUrl} target="_blank" rel="noreferrer">
                    {content.registerWorkshop} <span aria-hidden="true">↗</span>
                  </a>
                  {workshop.moreInfoUrl && (
                    <a className={styles.workshopTextLink} href={workshop.moreInfoUrl} target="_blank" rel="noreferrer">
                      {content.moreInformation} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>

                <details className={styles.workshopDetails}>
                  <summary>{content.detailsLabel}<span aria-hidden="true">＋</span></summary>
                  <div className={styles.workshopDetailsContent}>
                    <p>{workshop.description}</p>
                    <h4>{content.organisersLabel}</h4>
                    <ul>
                      {workshop.organisers.map((organiser) => <li key={organiser}>{organiser}</li>)}
                    </ul>
                    <div className={styles.workshopContact}>
                      <span>{content.contactLabel}</span>
                      <a href={`mailto:${workshop.contact}`}>{workshop.contact}</a>
                    </div>
                  </div>
                </details>
              </div>
            </motion.article>
          ))}
        </div>

        <div className={styles.workshopChairs}>
          <div>
            <div className={styles.label}>{content.chairsTitle}</div>
            <p>{content.chairsNote}</p>
          </div>
          <div className={styles.workshopChairList}>
            {content.chairs.map((chair) => (
              <div key={chair.email} className={styles.workshopChair}>
                <strong>{chair.name}</strong>
                <span>{chair.affiliation}</span>
                <a href={`mailto:${chair.email}`}>{chair.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
