"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./program.module.css";

export default function ProgramPage() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const isZhTW = locale === "zh-TW";
  const zh = (zhCN: string, zhTW: string) => (isZhTW ? zhTW : zhCN);
  const [activeDay, setActiveDay] = useState("day1");

  const dayMap = [
    { id: "day1", label: t("day1"), date: "Nov 23" },
    { id: "day2", label: t("day2"), date: "Nov 24" },
    { id: "day3", label: t("day3"), date: "Nov 25" },
  ];

  const schedule = {
    day1: [
      {
        time: "08:30 - 10:00",
        type: isZh ? zh("行政", "行政") : "Admin",
        title: isZh ? zh("签到与晨间咖啡", "簽到與晨間咖啡") : "Registration and Morning Coffee",
        desc: isZh ? zh("主会场大厅", "主會場大廳") : "Main lobby and reception desk",
      },
      {
        time: "10:00 - 12:00",
        type: "Keynote",
        title: isZh ? zh("人机参与计算前沿", "人機參與計算前沿") : "Frontiers of Human-Engaged Computing",
        desc: isZh ? zh("开幕主旨与大会引导报告", "開幕主旨與大會引導報告") : "Opening keynote and conference overview",
      },
      {
        time: "13:30 - 15:30",
        type: isZh ? zh("工作坊", "工作坊") : "Workshop",
        title: isZh ? zh("方法与工具实践专场", "方法與工具實踐專場") : "Methods and Tools Workshop",
        desc: isZh ? zh("平行分会场开展协同实践", "平行分會場開展協同實踐") : "Parallel collaborative hands-on sessions",
      },
      {
        time: "16:00 - 18:00",
        type: isZh ? zh("口头报告", "口頭報告") : "Oral Session",
        title: isZh ? zh("技术论文分组报告", "技術論文分組報告") : "Technical Track Presentations",
        desc: isZh ? zh("Room 1 - 4", "Room 1 - 4") : "Room 1 - 4",
      },
      {
        time: "19:30 - 21:30",
        type: isZh ? zh("社交活动", "社交活動") : "Social Event",
        title: isZh ? zh("欢迎晚宴", "歡迎晚宴") : "Welcome Reception and Dinner",
        desc: isZh ? zh("永利皇宫宴会厅", "永利皇宮宴會廳") : "Wynn Palace Ballroom",
      },
    ],
    day2: [
      {
        time: "09:30 - 11:00",
        type: "Keynote",
        title: isZh ? zh("开幕主题演讲", "開幕主題演講") : "Opening Keynote Session",
        desc: isZh ? zh("主会场", "主會場") : "Main hall",
      },
      {
        time: "11:30 - 13:00",
        type: isZh ? zh("论文专场", "論文專場") : "Paper Session",
        title: isZh ? zh("长文并行报告", "長文並行報告") : "Full Paper Parallel Sessions",
        desc: isZh ? zh("Room 1 与 Room 2", "Room 1 與 Room 2") : "Room 1 and Room 2",
      },
      {
        time: "14:30 - 15:45",
        type: isZh ? zh("圆桌", "圓桌") : "Panel",
        title: isZh ? zh("产业与学术圆桌论坛", "產業與學術圓桌論壇") : "Industry and Academia Panel",
        desc: isZh ? zh("主会场", "主會場") : "Main hall",
      },
      {
        time: "16:15 - 17:45",
        type: isZh ? zh("短文专场", "短文專場") : "Short Paper",
        title: isZh ? zh("短文与海报交流", "短文與海報交流") : "Short Paper and Poster Exchange",
        desc: isZh ? zh("分会场与展区联动", "分會場與展區聯動") : "Rooms and exhibition area",
      },
    ],
    day3: [
      {
        time: "09:00 - 10:30",
        type: isZh ? zh("论文专场", "論文專場") : "Paper Session",
        title: isZh ? zh("主题分轨汇报", "主題分軌匯報") : "Themed Technical Sessions",
        desc: isZh ? zh("Room 1 与 Room 2", "Room 1 與 Room 2") : "Room 1 and Room 2",
      },
      {
        time: "11:00 - 12:00",
        type: "Keynote",
        title: isZh ? zh("闭幕主题演讲", "閉幕主題演講") : "Closing Keynote Session",
        desc: isZh ? zh("主会场", "主會場") : "Main hall",
      },
      {
        time: "12:00 - 13:15",
        type: isZh ? zh("论坛", "論壇") : "Panel",
        title: isZh ? zh("下一代人机交互方向", "下一代人機交互方向") : "Future Directions of HCI",
        desc: isZh ? zh("主会场", "主會場") : "Main hall",
      },
      {
        time: "16:00 - 16:30",
        type: isZh ? zh("闭幕", "閉幕") : "Closing",
        title: isZh ? zh("闭幕仪式", "閉幕儀式") : "Closing Ceremony",
        desc: isZh ? zh("大会总结与交接", "大會總結與交接") : "Conference wrap-up and handover",
      },
    ],
  } as const;

  const activeItems = schedule[activeDay as keyof typeof schedule];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{isZh ? zh("议程总览", "議程總覽") : "Program Overview"}</h1>
        <p className={styles.heroDesc}>
          {isZh
            ? zh("聚焦主旨演讲、论文报告、工作坊与社交交流，以下展示 ICHEC 2026 三日关键日程。", "聚焦主旨演講、論文報告、工作坊與社交交流，以下展示 ICHEC 2026 三日關鍵日程。")
            : "Explore keynote sessions, paper presentations, workshops, and networking highlights across the three conference days."}
        </p>
        <div className={styles.dayTabs}>
          {dayMap.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveDay(item.id)}
              className={activeDay === item.id ? `${styles.dayTab} ${styles.dayTabActive}` : styles.dayTab}
            >
              {item.label} {item.date}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.scheduleSection}>
        <div className={styles.scheduleGrid}>
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <div className={styles.sideIcon}>⌁</div>
              <h3 className={styles.sideTitle}>{isZh ? zh("每日重点", "每日重點") : "Daily Focus"}</h3>
              <p className={styles.sideText}>
                {isZh
                  ? zh("围绕主旨演讲、论文分会场与工作坊协同推进。", "圍繞主旨演講、論文分會場與工作坊協同推進。")
                  : "Balanced agenda across keynotes, technical sessions, and workshops."}
              </p>
            </div>
            <div className={styles.sideCard}>
              <div className={styles.sideIcon}>⌖</div>
              <h3 className={styles.sideTitle}>{isZh ? zh("场地信息", "場地信息") : "Venue Info"}</h3>
              <p className={styles.sideText}>
                {isZh
                  ? zh("主会场与分会场位于同层，注册台每日 08:00 开放。", "主會場與分會場位於同層，註冊台每日 08:00 開放。")
                  : "Main hall and breakout rooms are co-located; registration desk opens at 08:00 daily."}
              </p>
            </div>
          </aside>

          <div className={styles.timeline}>
            {activeItems.map((item) => (
              <article key={`${activeDay}-${item.time}-${item.title}`} className={styles.timelineCard}>
                <div className={styles.timelineTime}>{item.time}</div>
                <div className={styles.timelineContent}>
                  <span className={styles.badge}>{item.type}</span>
                  <h4 className={styles.timelineTitle}>{item.title}</h4>
                  <p className={styles.timelineDesc}>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.downloadSection}>
        <h2 className={styles.downloadTitle}>{isZh ? zh("下载完整议程", "下載完整議程") : "Download the Full Program"}</h2>
        <p className={styles.downloadDesc}>
          {isZh
            ? zh("获取摘要集、嘉宾信息及分会场指引，便于会前安排与现场导航。", "獲取摘要集、嘉賓信息及分會場指引，便於會前安排與現場導航。")
            : "Access abstracts, speaker profiles, and venue guidance for conference planning."}
        </p>
        <div className={styles.downloadActions}>
          <button type="button" className={styles.primaryBtn}>PDF Schedule</button>
          <button type="button" className={styles.secondaryBtn}>Get Mobile App</button>
        </div>
      </section>
    </div>
  );
}
