"use client";

/* eslint-disable @next/next/no-img-element */

import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import styles from "./home.module.css";

const importantDates = {
  en: [
    "Round 1 Abstract Submission: August 10, 2026",
    "Round 1 Full Paper Submission: August 14, 2026",
    "Round 2 Abstract Submission: September 10, 2026",
    "Round 2 Full Paper Submission: September 13, 2026",
    "Full Paper Notification: October 1, 2026",
    "Publication-ready Deadline: October 22, 2026",
    "Main Conference: November 23-26, 2026",
  ],
  zhCN: [
    "第一轮摘要提交：2026 年 8 月 10 日",
    "第一轮全文提交：2026 年 8 月 14 日",
    "第二轮摘要提交：2026 年 9 月 10 日",
    "第二轮全文提交：2026 年 9 月 13 日",
    "全文录用通知：2026 年 10 月 1 日",
    "出版就绪稿截止：2026 年 10 月 22 日",
    "大会日期：2026 年 11 月 23-26 日",
  ],
  zhTW: [
    "第一輪摘要提交：2026 年 8 月 10 日",
    "第一輪全文提交：2026 年 8 月 14 日",
    "第二輪摘要提交：2026 年 9 月 10 日",
    "第二輪全文提交：2026 年 9 月 13 日",
    "全文錄用通知：2026 年 10 月 1 日",
    "出版就緒稿截止：2026 年 10 月 22 日",
    "大會日期：2026 年 11 月 23-26 日",
  ],
};

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const isZhTW = locale === "zh-TW";
  const zh = (zhCN: string, zhTW: string) => (isZhTW ? zhTW : zhCN);
  const dates = isZhTW ? importantDates.zhTW : isZh ? importantDates.zhCN : importantDates.en;

  /*
  const keynoteSessions = [
    {
      id: "opening",
      label: isZh ? zh("开幕主旨演讲", "開幕主旨演講") : "Opening Keynote",
      date: "Nov 23, 2026",
      speaker: isZh ? zh("待公布", "待公布") : "To be announced",
      affiliation: isZh ? zh("主讲嘉宾信息待公布", "主講嘉賓資訊待公布") : "Speaker information to be announced",
      abstract: isZh
        ? zh(
            "目前仅为 Demo 展示，后续将进行调整。暂以社会技术系统视角呈现人机参与计算中的设计方法、协作机制与长期影响评估路径。",
            "目前僅為 Demo 展示，後續將進行調整。暫以社會技術系統視角呈現人機參與計算中的設計方法、協作機制與長期影響評估路徑。",
          )
        : "Demo display only; this section will be updated later. Current placeholder: design methods, collaboration mechanisms, and long-term impact evaluation in human-engaged computing.",
      bio: isZh
        ? zh("主讲嘉宾与个人简介将在确认后更新。", "主講嘉賓與個人簡介將在確認後更新。")
        : "Speaker details and biography will be updated after confirmation.",
    },
    {
      id: "closing",
      label: isZh ? zh("闭幕主旨演讲", "閉幕主旨演講") : "Closing Keynote",
      date: "Nov 26, 2026",
      speaker: isZh ? zh("待公布", "待公布") : "To be announced",
      affiliation: isZh ? zh("主讲嘉宾信息待公布", "主講嘉賓資訊待公布") : "Speaker information to be announced",
      abstract: isZh
        ? zh(
            "目前仅为 Demo 展示，后续将进行调整。暂以可信智能、数据驱动交互和跨学科平台建设作为闭幕主旨方向。",
            "目前僅為 Demo 展示，後續將進行調整。暫以可信智能、數據驅動交互和跨學科平台建設作為閉幕主旨方向。",
          )
        : "Demo display only; this section will be updated later. Current placeholder: trustworthy intelligence, data-driven interaction, and cross-disciplinary platforms for future HCI.",
      bio: isZh
        ? zh("主讲嘉宾与个人简介将在确认后更新。", "主講嘉賓與個人簡介將在確認後更新。")
        : "Speaker details and biography will be updated after confirmation.",
    },
  ];
  */

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{t("title")}</h1>
          <div className={styles.heroMark} aria-hidden="true">
            <img src="/visuals/hero/ichec-emblem-ruins-lotus-v5.png" alt="" />
          </div>
          <p className={styles.heroTheme}>{t("tagline")}</p>
          <div className={styles.heroRule} />
          <p className={styles.heroDate}>{t("date")}</p>
          <p className={styles.heroPlace}>
            {isZh ? zh("中国澳门，永利澳门", "中國澳門，永利澳門") : "Wynn Macau, Macau, China"}
          </p>
        </div>
        <div className="hero-wave" aria-hidden="true">
          <svg preserveAspectRatio="none" viewBox="0 0 1920 100.1">
            <path d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
          </svg>
        </div>
      </section>

      <div className="home-container">
        <section className={`${styles.section} ${styles.aboutSection}`} id="intro">
          <h2>{t("aboutTitle")}</h2>
          <p>{t("aboutP1")}</p>
          <p>{t("aboutP2")}</p>
          <p>{t("aboutP3")}</p>
          <div className={styles.centerAction}>
            <Link href="/registration" className={styles.outlineButton}>
              {t("registerNow")}
              <span aria-hidden="true">›</span>
            </Link>
          </div>
        </section>

        {/*
        <section className={styles.keynoteSection}>
          <div className={styles.sectionIntro}>
            <h2>{isZh ? zh("主题演讲", "主題演講") : "Keynote Speeches"}</h2>
            <p>{isZh ? zh("以下信息目前仅作 demo 演示，后续将按大会确认结果更新。", "以下資訊目前僅作 demo 演示，後續將按大會確認結果更新。") : "The following information is for demo display and will be updated after confirmation."}</p>
          </div>

          <div className={styles.keynoteList}>
            {keynoteSessions.map((session) => (
              <article key={session.id} className={styles.keynoteCard}>
                <div className={styles.keynoteBody}>
                  <div className={styles.keynoteMedia}>
                    <img src="/avatars/tbd.svg" alt="" />
                  </div>

                  <div className={styles.keynoteTalk}>
                    <p className={styles.keynoteType}>{session.label}</p>
                    <h3>{session.speaker}</h3>
                    <p className={styles.keynoteAffiliation}>{session.affiliation}</p>
                    <h4>{session.label}</h4>
                    <p className={styles.keynoteDate}>{session.date}</p>
                    <p>{session.abstract}</p>
                  </div>

                  <aside className={styles.keynoteBio}>
                    <p className={styles.keynoteBioName}>{session.speaker}</p>
                    <p>{session.affiliation}</p>
                    <p>{session.bio}</p>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </section>
        */}

        <section className={styles.infoSection}>
          <h2>{t("importantDates")}</h2>
          <ul className={styles.dateList}>
            {dates.map((item, index) => (
              <li key={item} className={index <= 1 ? styles.supersededDate : undefined}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.venueSection}>
          <div className={styles.venueText}>
            <h2>{isZh ? zh("会议地点", "會議地點") : "Venue"}</h2>
            <p>
              {isZh
                ? zh(
                    "会议将在中国澳门永利澳门举行，由澳门城市大学承办，兼具国际会务条件与城市文化体验。",
                    "會議將在中國澳門永利澳門舉行，由澳門城市大學承辦，兼具國際會務條件與城市文化體驗。",
                  )
                : "ICHEC 2026 will be held at Wynn Macau, Macau, hosted by City University of Macau."}
            </p>
            <Link href="/venue" className={styles.textLink}>
              {isZh ? zh("查看场地信息", "查看場地資訊") : "View venue details"}
            </Link>
          </div>
          <figure className={styles.venueImage}>
            <img src="/venue/wynn-palace.png" alt={isZh ? zh("永利澳门", "永利澳門") : "Wynn Macau"} />
          </figure>
        </section>

        <section className={styles.hostSection}>
          <h2>{isZh ? zh("主办 / 承办", "主辦 / 承辦") : "Host / Organizer"}</h2>
          <div className={styles.logoGrid}>
            <a href="https://icachi.org" target="_blank" rel="noreferrer">
              <img src="https://ichec.icachi.org/assets/img/logo/icachi-logo.svg" alt="ICACHI" />
              <span>{isZh ? zh("世界华人华侨人机交互协会", "世界華人華僑人機交互協會") : "ICACHI"}</span>
            </a>
            <a href="https://www.cityu.edu.mo/" target="_blank" rel="noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/zh/thumb/7/71/City_University_of_Macau_logo.svg/250px-City_University_of_Macau_logo.svg.png"
                alt="City University of Macau"
              />
              <span>{isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau"}</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
