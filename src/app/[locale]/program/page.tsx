"use client";

import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import styles from "./program.module.css";

type Track = { room: string; title: string };
type ProgramItem = {
  time: string;
  type: string;
  title: string;
  detail?: string;
  status?: string;
  tracks?: Track[];
};

export default function ProgramPage() {
  const locale = useLocale();
  const isZhTW = locale === "zh-TW";
  const isZh = locale.startsWith("zh");
  const zh = (cn: string, tw: string) => (isZhTW ? tw : cn);
  const [activeDay, setActiveDay] = useState("day1");

  const labels = {
    eyebrow: isZh ? zh("暂定议程", "暫定議程") : "Preliminary program",
    title: isZh ? zh("三天，共同探索人类参与式计算。", "三天，共同探索人類參與式計算。") : "Three days of human-engaged computing.",
    intro: isZh
      ? zh(
          "以下安排已根据技术委员会最新资料更新。论文总数、分会场名称及部分主持人仍待最终确认。",
          "以下安排已根據技術委員會最新資料更新。論文總數、分會場名稱及部分主持人仍待最終確認。",
        )
      : "This schedule reflects the latest Technical Chairs update. Paper totals, room names, and selected chairs remain subject to final confirmation.",
    noticeTitle: isZh ? zh("当前发布状态", "目前發布狀態") : "Current release status",
    noticeBody: isZh
      ? zh("场次与时间可用于行程规划；逐篇论文清单将在最终核对后发布。", "場次與時間可用於行程規劃；逐篇論文清單將在最終核對後發布。")
      : "Session blocks and times may be used for planning. The paper-by-paper program will follow after final reconciliation.",
    room: isZh ? zh("分会场", "分會場") : "Room",
    pending: isZh ? zh("待确认", "待確認") : "To be confirmed",
    details: isZh ? zh("查看主旨演讲嘉宾", "查看主旨演講嘉賓") : "Meet the keynote speakers",
    workshopLink: isZh ? zh("查看工作坊详情", "查看工作坊詳情") : "Explore workshop details",
  };

  const dayTabs = [
    { id: "workshop", date: "NOV 23", label: isZh ? zh("工作坊日", "工作坊日") : "Workshop Day", meta: isZh ? zh("会前活动", "會前活動") : "Pre-conference" },
    { id: "day1", date: "NOV 24", label: isZh ? zh("大会第一天", "大會第一天") : "Conference Day 1", meta: isZh ? zh("主旨与论文分场", "主旨與論文分場") : "Keynotes & papers" },
    { id: "day2", date: "NOV 25", label: isZh ? zh("大会第二天", "大會第二天") : "Conference Day 2", meta: isZh ? zh("主旨、分场与闭幕", "主旨、分場與閉幕") : "Keynote & closing" },
  ];

  const round1: Track[] = [
    { room: `${labels.room} 1`, title: isZh ? zh("多模态交互与沉浸式体验", "多模態交互與沉浸式體驗") : "Multimodal Interaction & Immersive Experiences" },
    { room: `${labels.room} 2`, title: isZh ? zh("沉浸式叙事与文化遗产", "沉浸式敘事與文化遺產") : "Immersive Narrative & Cultural Heritage" },
    { room: `${labels.room} 3`, title: isZh ? zh("交互体验设计", "交互體驗設計") : "Designing Interactive Experiences" },
  ];
  const round2: Track[] = [
    { room: `${labels.room} 1`, title: isZh ? zh("人工智能与人机关系", "人工智能與人機關係") : "AI & Human–AI Relations" },
    { room: `${labels.room} 2`, title: isZh ? zh("福祉与社会参与设计", "福祉與社會參與設計") : "Designing for Wellbeing & Social Engagement" },
    { room: `${labels.room} 3`, title: isZh ? zh("社交与协作体验可视化", "社交與協作體驗可視化") : "Visualizing Social & Collaborative Experiences" },
  ];
  const round3: Track[] = [
    { room: `${labels.room} 1`, title: isZh ? zh("人机交互与智能界面", "人機交互與智能介面") : "Human–AI Interaction & Intelligent Interfaces" },
    { room: `${labels.room} 2`, title: isZh ? zh("用户体验的理解与评估", "使用者體驗的理解與評估") : "Understanding & Evaluating User Experiences" },
    { room: `${labels.room} 3`, title: isZh ? zh("多模态与具身交互", "多模態與具身交互") : "Multimodal & Embodied Interaction" },
  ];

  const schedule: Record<string, ProgramItem[]> = {
    workshop: [
      {
        time: isZh ? zh("全天", "全天") : "All day",
        type: isZh ? zh("工作坊", "工作坊") : "Workshops",
        title: isZh ? zh("ICHEC 2026会前工作坊", "ICHEC 2026會前工作坊") : "ICHEC 2026 Pre-conference Workshops",
        detail: isZh
          ? zh("四场工作坊的主题、海报及参与信息已在Attend页面发布。", "四場工作坊的主題、海報及參與資訊已在Attend頁面發布。")
          : "Topics, posters, and participation details for four workshops are available on the Attend page.",
      },
    ],
    day1: [
      { time: "09:00–09:30", type: isZh ? zh("开幕", "開幕") : "Opening", title: isZh ? zh("开幕式", "開幕式") : "Opening Ceremony", detail: isZh ? zh("全体会议", "全體會議") : "Plenary" },
      { time: "09:30–10:30", type: "Keynote 1", title: "Designing Against Hostility", detail: "Professor Marcus Foth · QUT" },
      { time: "10:30–11:00", type: isZh ? zh("茶歇", "茶歇") : "Break", title: isZh ? zh("茶歇与交流", "茶歇與交流") : "Coffee Break & Networking" },
      { time: "11:00–12:30", type: "Paper Session 1", title: isZh ? zh("论文分场第一轮", "論文分場第一輪") : "Parallel Paper Sessions · Round 1", tracks: round1 },
      { time: "12:30–14:00", type: isZh ? zh("午餐", "午餐") : "Lunch", title: isZh ? zh("午餐休息", "午餐休息") : "Lunch Break" },
      { time: "14:00–15:00", type: "Keynote 2", title: labels.pending, status: "TBA" },
      { time: "15:00–16:30", type: isZh ? zh("交流", "交流") : "Exchange", title: isZh ? zh("茶歇与海报交流", "茶歇與海報交流") : "Coffee Break & Poster Session" },
      { time: "16:30–18:00", type: "Paper Session 2", title: isZh ? zh("论文分场第二轮", "論文分場第二輪") : "Parallel Paper Sessions · Round 2", tracks: round2 },
      { time: "18:30–20:30", type: isZh ? zh("晚宴", "晚宴") : "Banquet", title: isZh ? zh("大会晚宴", "大會晚宴") : "Conference Banquet" },
    ],
    day2: [
      { time: "09:00–10:00", type: "Keynote 3", title: isZh ? zh("Go Vibe Designing——AI时代的设计判断力", "Go Vibe Designing——AI時代的設計判斷力") : "Go Vibe Designing: Design Judgment in the AI Era", detail: isZh ? zh("王路平 · 阿里云智能设计中心", "王路平 · 阿里雲智能設計中心") : "Wang Luping · Alibaba Cloud Intelligence Design Center" },
      { time: "10:00–10:30", type: isZh ? zh("茶歇", "茶歇") : "Break", title: isZh ? zh("茶歇与交流", "茶歇與交流") : "Coffee Break & Networking" },
      { time: "10:30–11:40", type: "Paper Session 3", title: isZh ? zh("论文分场第三轮", "論文分場第三輪") : "Parallel Paper Sessions · Round 3", tracks: round3 },
      { time: "TBA", type: isZh ? zh("圆桌", "圓桌") : "Panel", title: isZh ? zh("圆桌论坛", "圓桌論壇") : "Panel Discussion", status: labels.pending },
      { time: "TBA", type: isZh ? zh("闭幕", "閉幕") : "Closing", title: isZh ? zh("闭幕式", "閉幕式") : "Closing Ceremony", status: labels.pending },
    ],
  };

  const currentDay = dayTabs.find((day) => day.id === activeDay) ?? dayTabs[1];

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{labels.eyebrow}</p>
          <h2 className={styles.title}>{labels.title}</h2>
          <p className={styles.lead}>{labels.intro}</p>
        </div>
        <aside className={styles.notice}>
          <span className={styles.noticeDot} aria-hidden="true" />
          <div><strong>{labels.noticeTitle}</strong><p>{labels.noticeBody}</p></div>
        </aside>
      </section>

      <nav className={styles.dayTabs} aria-label={isZh ? zh("选择日期", "選擇日期") : "Choose a program day"}>
        {dayTabs.map((day) => (
          <button key={day.id} type="button" className={`${styles.dayTab} ${activeDay === day.id ? styles.dayTabActive : ""}`} onClick={() => setActiveDay(day.id)} aria-pressed={activeDay === day.id}>
            <span className={styles.dayDate}>{day.date}</span>
            <span className={styles.dayLabel}>{day.label}</span>
            <span className={styles.dayMeta}>{day.meta}</span>
          </button>
        ))}
      </nav>

      <section className={styles.scheduleSection} aria-live="polite">
        <header className={styles.scheduleHeader}>
          <div><span>{currentDay.date}, 2026</span><h3>{currentDay.label}</h3></div>
          <Link className={styles.keynoteLink} href="/keynotes">{labels.details} <span aria-hidden="true">↗</span></Link>
        </header>

        <div className={styles.timeline}>
          {schedule[activeDay].map((item, index) => (
            <article key={`${activeDay}-${item.time}-${index}`} className={styles.timelineCard}>
              <div className={styles.timeColumn}><span className={styles.time}>{item.time}</span><span className={styles.sequence}>{String(index + 1).padStart(2, "0")}</span></div>
              <div className={styles.itemContent}>
                <div className={styles.itemTopline}><span className={styles.badge}>{item.type}</span>{item.status ? <span className={styles.pending}>{item.status}</span> : null}</div>
                <h4>{item.title}</h4>
                {item.detail ? <p>{item.detail}</p> : null}
                {item.tracks ? (
                  <div className={styles.trackGrid}>
                    {item.tracks.map((track) => (
                      <div className={styles.trackCard} key={`${item.time}-${track.room}`}>
                        <span>{track.room}</span><strong>{track.title}</strong><small>{isZh ? zh("论文清单待最终核对", "論文清單待最終核對") : "Paper list pending final reconciliation"}</small>
                      </div>
                    ))}
                  </div>
                ) : null}
                {activeDay === "workshop" ? <Link className={styles.workshopLink} href="/registration#attend-workshops">{labels.workshopLink} <span aria-hidden="true">→</span></Link> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
