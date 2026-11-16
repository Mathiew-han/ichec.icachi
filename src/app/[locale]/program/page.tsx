"use client";

import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import styles from "./program.module.css";

type Track = { room: string; title: string; chair: string };
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
    eyebrow: isZh ? zh("会议日程", "會議日程") : "Conference program",
    title: isZh ? zh("四天，共同探索人类参与式计算。", "四天，共同探索人類參與式計算。") : "Four days of human-engaged computing.",
    intro: isZh
      ? zh(
          "以下日程依据 ICHEC 2026 Program Book（V7）整理。完整论文、艺术展演、场地及交通信息请下载手册。",
          "以下日程依據 ICHEC 2026 Program Book（V7）整理。完整論文、藝術展演、場地及交通資訊請下載手冊。",
        )
      : "This schedule follows the ICHEC 2026 Program Book (V7). Download the book for full papers, art gallery entries, venue maps, and travel information.",
    noticeTitle: isZh ? zh("完整会议手册", "完整會議手冊") : "Full program book",
    noticeBody: isZh
      ? zh("包含逐篇论文、短文、艺术展演、圆桌嘉宾及会场地图。", "包含逐篇論文、短文、藝術展演、圓桌嘉賓及會場地圖。")
      : "Includes individual papers, short papers, art gallery entries, panelists, and venue maps.",
    download: isZh ? zh("下载会议手册 PDF", "下載會議手冊 PDF") : "Download program book PDF",
    chair: isZh ? zh("主持人", "主持人") : "Chair",
    details: isZh ? zh("查看主旨演讲嘉宾", "查看主旨演講嘉賓") : "Meet the keynote speakers",
    workshopLink: isZh ? zh("查看工作坊详情", "查看工作坊詳情") : "Explore workshop details",
  };

  const dayTabs = [
    { id: "workshop", date: "NOV 23", label: isZh ? zh("工作坊日", "工作坊日") : "Workshop Day", meta: isZh ? zh("会前活动", "會前活動") : "Pre-conference" },
    { id: "day1", date: "NOV 24", label: isZh ? zh("大会第一天", "大會第一天") : "Conference Day 1", meta: isZh ? zh("主旨与论文分场", "主旨與論文分場") : "Keynotes & papers" },
    { id: "day2", date: "NOV 25", label: isZh ? zh("大会第二天", "大會第二天") : "Conference Day 2", meta: isZh ? zh("主旨、分场与闭幕", "主旨、分場與閉幕") : "Keynote & closing" },
    { id: "departure", date: "NOV 26", label: isZh ? zh("学术交流与离会", "學術交流與離會") : "Academic Exchange & Departure", meta: isZh ? zh("离会日", "離會日") : "Departure day" },
  ];

  const round1: Track[] = [
    { room: "Ballroom 1", title: isZh ? zh("多模态交互与沉浸式体验", "多模態交互與沉浸式體驗") : "Multimodal Interaction & Immersive Experiences", chair: "Qing Xia" },
    { room: "Meeting Room 1", title: isZh ? zh("沉浸式叙事与文化遗产", "沉浸式敘事與文化遺產") : "Immersive Narrative & Cultural Heritage", chair: "Yun Wang" },
    { room: "Meeting Room 2", title: isZh ? zh("交互体验设计", "交互體驗設計") : "Designing Interactive Experiences", chair: "Lin Zhu" },
  ];
  const round2: Track[] = [
    { room: "Ballroom 1", title: isZh ? zh("人工智能与人机关系", "人工智能與人機關係") : "AI & Human–AI Relations", chair: "Di Zhu" },
    { room: "Meeting Room 1", title: isZh ? zh("福祉与社会参与设计", "福祉與社會參與設計") : "Designing for Wellbeing & Social Engagement", chair: "Weiwei Zhang" },
    { room: "Meeting Room 2", title: isZh ? zh("社交与协作体验可视化", "社交與協作體驗可視化") : "Visualizing Social & Collaborative Experiences", chair: "Chaoxi Niu" },
  ];
  const round3: Track[] = [
    { room: "Ballroom 1", title: isZh ? zh("人机交互与智能界面", "人機交互與智能介面") : "Human–AI Interaction & Intelligent Interfaces", chair: "Chen Wang" },
    { room: "Meeting Room 1", title: isZh ? zh("用户体验的理解与评估", "使用者體驗的理解與評估") : "Understanding & Evaluating User Experiences", chair: "Xin Tang" },
    { room: "Meeting Room 2", title: isZh ? zh("多模态与具身交互", "多模態與具身交互") : "Multimodal & Embodied Interaction", chair: "Yuan Feng" },
  ];

  const schedule: Record<string, ProgramItem[]> = {
    workshop: [
      { time: "08:30–18:00", type: isZh ? zh("签到", "簽到") : "Registration", title: isZh ? zh("会议签到", "會議簽到") : "Registration Desk", detail: "Meeting Foyer · Ballroom 1/F · Wynn Macau" },
      { time: "09:00–12:00", type: "W1", title: "Designing XR from More-than-Human Perspectives", detail: "Meeting Room 1" },
      { time: "09:00–12:00", type: "W2", title: "Unity of Heaven and Humanity & Human-Engaged Computing: An Indigenous Approach Towards Design as Healing and Renewal", detail: "Meeting Room 2" },
      { time: "12:00–14:00", type: isZh ? zh("午餐", "午餐") : "Lunch", title: isZh ? zh("午餐", "午餐") : "Lunch", detail: "Ballroom 2+3+4" },
      { time: "14:00–17:00", type: "W3", title: "BATICLOUD: Human-AI Co-Creation Workshop for Batik Intangible Cultural Heritage", detail: "Meeting Room 1" },
      { time: "14:00–17:00", type: "W4", title: "Sandbox World-Building: Co-Creating Healing Spaces through Immersive Narrative", detail: "Meeting Room 2" },
    ],
    day1: [
      { time: "08:30–18:00", type: isZh ? zh("签到", "簽到") : "Registration", title: isZh ? zh("会议签到", "會議簽到") : "Registration Desk", detail: "Meeting Foyer · Ballroom 1/F · Wynn Macau" },
      { time: "09:00–09:30", type: isZh ? zh("开幕", "開幕") : "Opening", title: isZh ? zh("开幕式", "開幕式") : "Opening Ceremony", detail: "Ballroom 1" },
      { time: "09:30–10:30", type: "Keynote 1", title: "Designing Against Hostility", detail: "Professor Marcus Foth · QUT · Ballroom 1" },
      { time: "10:30–11:00", type: isZh ? zh("茶歇", "茶歇") : "Break", title: isZh ? zh("茶歇与交流", "茶歇與交流") : "Coffee Break & Networking" },
      { time: "11:00–12:30", type: "Paper Session 1", title: isZh ? zh("论文分场第一轮", "論文分場第一輪") : "Parallel Paper Sessions · Round 1", tracks: round1 },
      { time: "12:30–14:00", type: isZh ? zh("午餐", "午餐") : "Lunch", title: isZh ? zh("午餐休息", "午餐休息") : "Lunch Break", detail: "Ballroom 2+3+4" },
      { time: "14:00–15:00", type: "Keynote 2", title: isZh ? zh("虚拟、增强与混合现实（VR/AR/MR）及人机交互（HCI）中的严肃游戏", "虛擬、擴增與混合實境（VR/AR/MR）及人機互動（HCI）中的嚴肅遊戲") : "Serious Games in VR/AR/MR and Human-Computer Interaction (HCI)", detail: isZh ? zh("Kibum Kim 教授 · 韩国汉阳大学 ERICA 校区 · Ballroom 1", "Kibum Kim 教授 · 韓國漢陽大學 ERICA 校區 · Ballroom 1") : "Professor Kibum Kim · Hanyang University ERICA · Ballroom 1" },
      { time: "15:00–16:30", type: isZh ? zh("交流", "交流") : "Exchange", title: isZh ? zh("茶歇与海报交流", "茶歇與海報交流") : "Coffee Break & Poster Session" },
      { time: "16:30–18:00", type: "Paper Session 2", title: isZh ? zh("论文分场第二轮", "論文分場第二輪") : "Parallel Paper Sessions · Round 2", tracks: round2 },
      { time: "18:30–20:30", type: isZh ? zh("晚宴", "晚宴") : "Banquet", title: isZh ? zh("大会晚宴", "大會晚宴") : "Conference Banquet", detail: "Ballroom 2+3+4" },
    ],
    day2: [
      { time: "08:30–12:00", type: isZh ? zh("签到", "簽到") : "Registration", title: isZh ? zh("会议签到", "會議簽到") : "Registration Desk", detail: "Meeting Foyer · Ballroom 1/F · Wynn Macau" },
      { time: "09:00–10:00", type: "Keynote 3", title: isZh ? zh("Go Vibe Designing——AI时代的设计判断力", "Go Vibe Designing——AI時代的設計判斷力") : "Go Vibe Designing: Design Judgment in the AI Era", detail: isZh ? zh("王路平 · 阿里云智能设计中心 · Ballroom 1", "王路平 · 阿里雲智能設計中心 · Ballroom 1") : "Wang Luping · Alibaba Cloud Intelligence Design Center · Ballroom 1" },
      { time: "10:00–10:30", type: isZh ? zh("茶歇", "茶歇") : "Break", title: isZh ? zh("茶歇与交流", "茶歇與交流") : "Coffee Break & Networking" },
      { time: "10:30–11:40", type: "Paper Session 3", title: isZh ? zh("论文分场第三轮", "論文分場第三輪") : "Parallel Paper Sessions · Round 3", tracks: round3 },
      { time: "11:40–12:40", type: isZh ? zh("圆桌", "圓桌") : "Panel", title: isZh ? zh("圆桌论坛", "圓桌論壇") : "Panel Discussion", detail: isZh ? zh("嘉宾：Jun Hu、Xipei Ren、Chung-Ho Su、Huatong Sun、Shengdong Zhao；主持：Zhenwei You · Ballroom 1", "嘉賓：Jun Hu、Xipei Ren、Chung-Ho Su、Huatong Sun、Shengdong Zhao；主持：Zhenwei You · Ballroom 1") : "Panelists: Jun Hu, Xipei Ren, Chung-Ho Su, Huatong Sun, Shengdong Zhao · Moderator: Zhenwei You · Ballroom 1" },
      { time: "12:40–13:00", type: isZh ? zh("闭幕", "閉幕") : "Closing", title: isZh ? zh("闭幕式", "閉幕式") : "Closing Ceremony", detail: "Ballroom 1" },
      { time: "13:00–14:30", type: isZh ? zh("午餐", "午餐") : "Lunch", title: isZh ? zh("午餐休息", "午餐休息") : "Lunch Break", detail: "Ballroom 2+3+4" },
      { time: "14:30–18:00", type: isZh ? zh("参访", "參訪") : "Visit", title: isZh ? zh("技术参访与澳门文化之旅", "技術參訪與澳門文化之旅") : "Technical Visit & Cultural Tour", detail: isZh ? zh("集合地点：Meeting Foyer 签到处；路线见会议手册。", "集合地點：Meeting Foyer 簽到處；路線見會議手冊。") : "Meet at the registration desk in Meeting Foyer. See the program book for the route." },
    ],
    departure: [
      { time: isZh ? zh("全天", "全天") : "All day", type: isZh ? zh("交流", "交流") : "Exchange", title: isZh ? zh("学术交流与离会", "學術交流與離會") : "Academic Exchange & Departure" },
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
          <div><strong>{labels.noticeTitle}</strong><p>{labels.noticeBody}</p><a className={styles.bookDownload} href="/downloads/program/ICHEC-2026-Program-Book-V7.pdf" download>{labels.download} ↗</a></div>
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
          <Link className={styles.keynoteLink} href={activeDay === "workshop" ? "/registration#attend-workshops" : "/keynotes"}>{activeDay === "workshop" ? labels.workshopLink : labels.details} <span aria-hidden="true">↗</span></Link>
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
                        <span>{track.room}</span><strong>{track.title}</strong><small>{labels.chair}: {track.chair}</small>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guidelines}>
        <div>
          <p className={styles.eyebrow}>{isZh ? zh("参会提示", "參會提示") : "For presenters"}</p>
          <h3>{isZh ? zh("报告与海报准备", "報告與海報準備") : "Talks and poster preparation"}</h3>
        </div>
        <ul>
          <li>{isZh ? zh("主旨演讲 60 分钟（含问答）；口头报告 15 分钟（12 分钟报告 + 3 分钟问答），具体由分场主持人安排。", "主旨演講 60 分鐘（含問答）；口頭報告 15 分鐘（12 分鐘報告 + 3 分鐘問答），具體由分場主持人安排。") : "Keynotes: 60 minutes including Q&A. Oral presentations: 15 minutes (12-minute talk and 3-minute Q&A), subject to the session chair."}</li>
          <li>{isZh ? zh("海报须为 A0 竖版，顶部显示标题，并注明姓名、论文编号及单位；现场提供悬挂材料。", "海報須為 A0 直式，頂部顯示標題，並註明姓名、論文編號及單位；現場提供懸掛材料。") : "Posters must be A0 portrait, with a clear title header, name, paper ID, and affiliation. Mounting materials are provided."}</li>
          <li>{isZh ? zh("报告人请提前 15 分钟到场，并提前将 PDF 或 PPT 文件复制到会场电脑。", "報告人請提前 15 分鐘到場，並提前將 PDF 或 PPT 檔案複製到會場電腦。") : "Presenters should arrive 15 minutes early and copy their PDF or PPT files to the venue computer in advance."}</li>
        </ul>
      </section>
    </div>
  );
}
