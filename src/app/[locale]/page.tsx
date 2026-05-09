"use client";

import { useLocale, useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldTopology from "world-atlas/countries-110m.json";
import styles from "./home.module.css";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const isZhTW = locale === "zh-TW";
  const zh = (zhCN: string, zhTW: string) => (isZhTW ? zhTW : zhCN);

  const easeStandard: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeStandard } }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeStandard } }
  };

  const milestoneSteps = [
    { title: t("timelineCfpLaunch"), date: t("timelineEarlyMay"), state: "completed" },
    { title: t("timelineSubmissionDeadline"), date: t("timelineLateAugust"), state: "active" },
    { title: t("timelineDecisions"), date: t("timelineLateSeptember"), state: "pending" }
  ];

  const historyTopRow = isZh
    ? [
        { year: "2013", city: zh("巴黎", "巴黎") },
        { year: "2014", city: zh("多伦多", "多倫多") },
        { year: "2015", city: zh("首尔", "首爾") },
        { year: "2016", city: zh("硅谷", "矽谷") },
        { year: "2017", city: zh("广州", "廣州") },
        { year: "2018", city: zh("蒙特利尔", "蒙特利爾") },
        { year: "2019", city: zh("厦门", "廈門") }
      ]
    : [
        { year: "2013", city: "Paris" },
        { year: "2014", city: "Toronto" },
        { year: "2015", city: "Seoul" },
        { year: "2016", city: "Silicon Valley" },
        { year: "2017", city: "Guangzhou" },
        { year: "2018", city: "Montreal" },
        { year: "2019", city: "Xiamen" }
      ];

  const historyBottomRow = isZh
    ? [
        { year: "2020", city: zh("线上", "線上") },
        { year: "2021", city: zh("线上", "線上") },
        { year: "2017,2022", city: zh("广州", "廣州") },
        { year: "2023", city: zh("巴厘岛", "巴厘島") },
        { year: "2024", city: zh("深圳", "深圳") },
        { year: "2025", city: zh("新加坡", "新加坡") },
        { year: "2026", city: zh("澳门", "澳門") }
      ]
    : [
        { year: "2020", city: "Online" },
        { year: "2021", city: "Online" },
        { year: "2017,2022", city: "Guangzhou" },
        { year: "2023", city: "Bali" },
        { year: "2024", city: "Shenzhen" },
        { year: "2025", city: "Singapore" },
        { year: "2026", city: "Macau" }
      ];
  const mapStops = isZh
    ? [
        { year: "2013", city: zh("巴黎", "巴黎"), lon: 2.3522, lat: 48.8566, dx: 8, dy: -8 },
        { year: "2014", city: zh("多伦多", "多倫多"), lon: -79.3832, lat: 43.6532, dx: 8, dy: -8 },
        { year: "2015", city: zh("首尔", "首爾"), lon: 126.978, lat: 37.5665, dx: 10, dy: -6 },
        { year: "2016", city: zh("硅谷", "矽谷"), lon: -122.08, lat: 37.39, dx: 8, dy: -8 },
        {
          year: "2017,2022,2024,2026",
          city: zh("广东", "廣東"),
          lon: 113.62,
          lat: 22.82,
          dx: -92,
          dy: -8,
          labels: [
            `${isZhTW ? "2017,2022 廣州" : "2017,2022 广州"}`,
            `${isZhTW ? "2024 深圳" : "2024 深圳"}`,
            `${isZhTW ? "2026 澳門" : "2026 澳门"}`,
          ],
        },
        { year: "2018", city: zh("蒙特利尔", "蒙特利爾"), lon: -73.5673, lat: 45.5017, dx: 8, dy: 14 },
        { year: "2019", city: zh("厦门", "廈門"), lon: 118.0894, lat: 24.4798, dx: 10, dy: -8 },
        { year: "2023", city: zh("巴厘岛", "巴厘島"), lon: 115.1889, lat: -8.4095, dx: 10, dy: 14 },
        { year: "2025", city: zh("新加坡", "新加坡"), lon: 103.8198, lat: 1.3521, dx: -62, dy: -12 },
      ]
    : [
        { year: "2013", city: "Paris", lon: 2.3522, lat: 48.8566, dx: 8, dy: -8 },
        { year: "2014", city: "Toronto", lon: -79.3832, lat: 43.6532, dx: 8, dy: -8 },
        { year: "2015", city: "Seoul", lon: 126.978, lat: 37.5665, dx: 10, dy: -6 },
        { year: "2016", city: "Silicon Valley", lon: -122.08, lat: 37.39, dx: 8, dy: -8 },
        {
          year: "2017,2022,2024,2026",
          city: "Guangdong",
          lon: 113.62,
          lat: 22.82,
          dx: -104,
          dy: -8,
          labels: ["2017,2022 Guangzhou", "2024 Shenzhen", "2026 Macau"],
        },
        { year: "2018", city: "Montreal", lon: -73.5673, lat: 45.5017, dx: 8, dy: 14 },
        { year: "2019", city: "Xiamen", lon: 118.0894, lat: 24.4798, dx: 10, dy: -8 },
        { year: "2023", city: "Bali", lon: 115.1889, lat: -8.4095, dx: 10, dy: 14 },
        { year: "2025", city: "Singapore", lon: 103.8198, lat: 1.3521, dx: -72, dy: -12 },
      ];
  const countriesGeo = useMemo(() => {
    const topology = worldTopology as unknown as {
      objects: { countries: unknown };
    };
    return feature(topology as never, topology.objects.countries as never) as unknown as GeoJSON.FeatureCollection;
  }, []);
  const worldProjection = useMemo(
    () => geoNaturalEarth1().rotate([-105, 0]).fitExtent([[8, 8], [992, 512]], countriesGeo),
    [countriesGeo],
  );
  const worldPath = useMemo(() => geoPath(worldProjection), [worldProjection]);
  const mapMarkers = useMemo(
    () =>
      mapStops
        .map((stop) => {
          const projected = worldProjection([stop.lon, stop.lat]);
          if (!projected) return null;
          return { ...stop, x: projected[0], y: projected[1] };
        })
        .filter(
          (
            item,
          ): item is {
            year: string;
            city: string;
            lon: number;
            lat: number;
            x: number;
            y: number;
            dx: number;
            dy: number;
            labels?: string[];
          } => item !== null,
        ),
    [mapStops, worldProjection],
  );
  const keynoteSessions = [
    {
      id: "opening",
      title: isZh ? zh("开幕主题演讲", "開幕主題演講") : "Opening Keynote",
      date: "Nov 23, 2026",
      speaker: isZh ? "付志勇" : "Zhiyong Fu",
      affiliation: isZh
        ? zh("清华大学美术学院", "清華大學美術學院")
        : "Academy of Arts and Design, Tsinghua University",
      avatar: "/avatars/fuzhiyong.jpg",
      profile: "https://www.ad.tsinghua.edu.cn/info/1229/15141.htm",
      demo: isZh
        ? zh("演讲内容 Demo：从社会技术系统视角讨论人机参与计算中的设计方法、协作机制与长期影响评估路径。", "演講內容 Demo：從社會技術系統視角討論人機參與計算中的設計方法、協作機制與長期影響評估路徑。")
        : "Talk demo: design methods, collaboration mechanisms, and long-term impact evaluation in human-engaged computing.",
      bio: isZh
        ? zh("付志勇，清华大学美术学院教授，长期从事社会计算与交互设计研究，聚焦技术系统中的人文价值与社会责任。", "付志勇，清華大學美術學院教授，長期從事社會計算與交互設計研究，聚焦技術系統中的人文價值與社會責任。")
        : "Zhiyong Fu is a professor at Tsinghua University, focusing on social computing, interaction design, and human values in technology systems."
    },
    {
      id: "closing",
      title: isZh ? zh("闭幕主题演讲", "閉幕主題演講") : "Closing Keynote",
      date: "Nov 26, 2026",
      speaker: isZh ? zh("周万雷", "周萬雷") : "Wanlei Zhou",
      affiliation: isZh
        ? zh("澳门城市大学数据科学学院", "澳門城市大學數據科學學院")
        : "Faculty of Data Science, City University of Macau",
      avatar: "/avatars/zhouwanlei.jpg",
      profile: "https://fds.cityu.edu.mo/members/177",
      demo: isZh
        ? zh("演讲内容 Demo：围绕可信智能、数据驱动交互和跨学科平台建设，总结大会成果并提出下一阶段研究议题。", "演講內容 Demo：圍繞可信智能、數據驅動交互和跨學科平台建設，總結大會成果並提出下一階段研究議題。")
        : "Talk demo: trustworthy intelligence, data-driven interaction, and cross-disciplinary platforms for future HCI.",
      bio: isZh
        ? zh("周万雷，澳门城市大学数据科学学院教授，研究方向包括可信计算、人工智能与数据科学应用。", "周萬雷，澳門城市大學數據科學學院教授，研究方向包括可信計算、人工智能與數據科學應用。")
        : "Wanlei Zhou is a professor at the Faculty of Data Science, City University of Macau, working on trustworthy computing and AI-driven data science."
    }
  ];

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

      <motion.section
        className={`${styles.section} ${styles.historySection} ${styles.historyMapSection}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
      >
        <h2 className={styles.moduleTitle}>{isZh ? zh("历史与传承", "歷史與傳承") : "History & Legacy"}</h2>
        <p className={styles.historyLead}>
          {isZh
            ? zh("从 Chinese CHI 到 ICHEC，会议自 2012 年起持续在全球不同城市接力举办，形成稳定的国际学术传承。", "從 Chinese CHI 到 ICHEC，會議自 2012 年起持續在全球不同城市接力舉辦，形成穩定的國際學術傳承。")
            : "From Chinese CHI to ICHEC, the conference has been relayed across global cities since 2012, building a continuous academic legacy."}
        </p>
        <div className={styles.historyScrolly}>
          <div className={styles.historyMapPane}>
            <div className={styles.historyMapSticky}>
              <div className={styles.worldMapViewport}>
                <div className={styles.worldMapCanvas}>
                  <svg viewBox="0 0 1000 520" className={styles.worldMapSvg} aria-hidden="true">
                    {countriesGeo.features.map((country, idx) => {
                      const d = worldPath(country);
                      if (!d) return null;
                      return <path key={`country-${idx}`} d={d} />;
                    })}
                    {mapMarkers.map((stop) => (
                      <g key={`marker-${stop.year}-${stop.city}`} className={styles.mapMarkerGroup} transform={`translate(${stop.x}, ${stop.y})`}>
                        <circle className={styles.mapDot} r={3.5} />
                        <text className={styles.mapLabel} x={stop.dx} y={stop.dy}>
                          {stop.labels ? (
                            stop.labels.map((line, idx) => (
                              <tspan key={`${stop.city}-${idx}`} x={stop.dx} dy={idx === 0 ? 0 : 12}>
                                {line}
                              </tspan>
                            ))
                          ) : (
                            <tspan x={stop.dx} dy={0}>{`${stop.year} ${stop.city}`}</tspan>
                          )}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className={`${styles.section} ${styles.keynoteSection}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeInUp}>
        <h2 className={styles.moduleTitle}>{isZh ? zh("主题演讲", "主題演講") : "Keynote Sessions"}</h2>
        <div className={styles.keynoteGrid}>
          {keynoteSessions.map((session) => (
            <a key={session.id} className={styles.keynoteCard} href={session.profile} target="_blank" rel="noreferrer">
              <div className={styles.keynoteMediaWrap}>
                <img src={session.avatar} alt={session.speaker} className={styles.keynoteAvatar} />
              </div>
              <div className={styles.keynoteTalk}>
                <p className={styles.keynoteType}>{session.title}</p>
                <h3 className={styles.keynoteSpeakerName}>{session.speaker}</h3>
                <p className={styles.keynoteOrg}>{session.affiliation}</p>
                <h3 className={styles.keynoteTitle}>{session.title}</h3>
                <p className={styles.keynoteDate}>{session.date}</p>
                <p className={styles.keynoteDesc}>{session.demo}</p>
              </div>
              <aside className={styles.keynoteBio}>
                <p className={styles.keynoteSpeaker}>{session.speaker}</p>
                <p className={styles.keynoteAff}>{session.affiliation}</p>
                <p className={styles.keynoteBioText}>{session.bio}</p>
                <p className={styles.keynoteLink}>{isZh ? zh("查看主页", "查看主頁") : "View profile"}</p>
              </aside>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.section className={`${styles.section} ${styles.venueSection}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
        <h2 className={styles.moduleTitleLeft}>{isZh ? zh("会议地点", "會議地點") : "Venue"}</h2>
        <div className={styles.venueGrid}>
          <div className={styles.venueInfo}>
            <p className={styles.venueLead}>
              {isZh
                ? zh("会议将在中国澳门永利皇宫举行，由澳门城市大学承办，兼具国际会务条件与城市文化体验。", "會議將在中國澳門永利皇宮舉行，由澳門城市大學承辦，兼具國際會務條件與城市文化體驗。")
                : "ICHEC 2026 will be held at Wynn Palace, Macau, hosted by City University of Macau."}
            </p>
            <div className={styles.venueMetaCard}>
              <h3>{isZh ? zh("永利皇宫 Wynn Palace", "永利皇宮 Wynn Palace") : "Wynn Palace"}</h3>
              <p>{isZh ? zh("澳门路氹城", "澳門路氹城") : "Cotai, Macau"}</p>
            </div>
            <div className={styles.venueMetaCard}>
              <h3>{isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau"}</h3>
              <p>{isZh ? zh("会议主办与学术组织支持", "會議主辦與學術組織支持") : "Host institution and academic support"}</p>
            </div>
          </div>
          <div className={styles.venueVisuals}>
            <img src="/venue/wynn-palace.png" alt="Wynn Palace" className={styles.venueHeroImg} />
            <div className={styles.venueSideCol}>
              <img src="/venue/cityu-macau.jpg" alt="City University of Macau" className={styles.venueSideImg} />
              <div className={styles.venueTipBox}>
                <h4>{isZh ? zh("探索澳门", "探索澳門") : "Explore Macau"}</h4>
                <p>{isZh ? zh("在会期内体验多元文化与城市夜景。", "在會期內體驗多元文化與城市夜景。") : "Experience the city culture and skyline during the conference."}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Organizers Section */}
      <motion.section
        className={`${styles.section} py-12 mt-2 border-t border-black/5 dark:border-white/5`}
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
