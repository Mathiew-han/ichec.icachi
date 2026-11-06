"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import styles from "../app/[locale]/keynotes/keynotes.module.css";

type Locale = "en" | "zh-CN" | "zh-TW";

const copy = {
  en: {
    eyebrow: "Keynote speakers",
    title: "Ideas that question the systems we build.",
    intro: "Two keynote speakers are now announced. The second keynote and selected program details will be added after final confirmation.",
    announced: "2 of 3 speakers announced",
    keynote: "Keynote",
    biography: "Biography",
    schedule: "View preliminary program",
    k1Title: "Designing Against Hostility: Human-Engaged Computing and the Worlds We Bring Into Being",
    k1Role: "Professor of Urban Informatics, Queensland University of Technology (QUT)",
    k1Bio: "Marcus Foth is Professor of Urban Informatics in the School of Design at Queensland University of Technology. His research and academic leadership have helped establish urban informatics as a field connecting people, place, design, and technology. He was Founding Director of the QUT Design Lab and has held visiting academic appointments at the University of Oxford, Tsinghua University, Tongji University, Politecnico di Milano, Aarhus University, and the University of Oulu.",
    k3Name: "Wang Luping",
    k3Role: "Director, Alibaba Cloud Intelligence Design Center",
    k3Title: "Go Vibe Designing: Design Judgment in the AI Era",
    k3Bio: "Wang Luping is Director of the Alibaba Cloud Intelligence Design Center, Vice Chairman of the Design Standards Branch of the China Industrial Design Association, a standing committee member of the Art and Design Professional Committee of the China Association for Educational Technology, a Senior Industrial Designer of Zhejiang Province, and one of China's Top Ten Design Industry Promoters in 2024. He founded Alibaba Cloud's design center and leads a design team of nearly one hundred people working across AI product experience, industry AI transformation, new AI design paradigms, and AIGC design platforms. His work includes the one-stop AIGC design platform PAI ArtLab and industry–education collaboration supporting design transformation in the AI era.",
    k2Title: "Keynote 2 speaker and topic",
    pending: "To be announced",
  },
  "zh-CN": {
    eyebrow: "主旨演讲嘉宾",
    title: "以设计重新审视我们正在构建的世界。",
    intro: "目前已公布两位主旨演讲嘉宾。Keynote 2及部分日程信息将在最终确认后补充。",
    announced: "三位嘉宾中已公布两位",
    keynote: "主旨演讲",
    biography: "嘉宾简介",
    schedule: "查看暂定议程",
    k1Title: "反对敌意的设计：人类参与式计算与我们共同塑造的世界",
    k1Role: "昆士兰科技大学（QUT）城市信息学教授",
    k1Bio: "Marcus Foth是昆士兰科技大学设计学院城市信息学教授，其研究与学术领导工作推动了城市信息学的发展，将人、场所、设计与技术联系起来。他曾担任QUT Design Lab创始主任，并先后在牛津大学、清华大学、同济大学、米兰理工大学、奥胡斯大学和奥卢大学担任访问学者或客座教授。",
    k3Name: "王路平",
    k3Role: "阿里云智能设计中心总监",
    k3Title: "Go Vibe Designing——AI时代的设计判断力",
    k3Bio: "王路平现任阿里云智能设计中心总监、中国工业设计协会设计标准分会副理事长、中国教育技术协会艺术设计专业委员会常务委员、浙江省高级工业设计师，并入选2024中国设计产业十佳设计推动人物。他创立了阿里云设计中心，带领近百人的设计团队深耕AI产品体验设计与创新、行业AI数字化设计、AI设计新范式及AIGC设计平台等领域。他主导探索AIGC设计新范式与一站式AIGC设计平台PAI ArtLab，联结教育协同育人，服务行业AI设计转型，促进AI时代的设计变革。",
    k2Title: "Keynote 2嘉宾及主题",
    pending: "即将公布",
  },
  "zh-TW": {
    eyebrow: "主旨演講嘉賓",
    title: "以設計重新審視我們正在建構的世界。",
    intro: "目前已公布兩位主旨演講嘉賓。Keynote 2及部分日程資訊將在最終確認後補充。",
    announced: "三位嘉賓中已公布兩位",
    keynote: "主旨演講",
    biography: "嘉賓簡介",
    schedule: "查看暫定議程",
    k1Title: "反對敵意的設計：人類參與式計算與我們共同塑造的世界",
    k1Role: "昆士蘭科技大學（QUT）城市資訊學教授",
    k1Bio: "Marcus Foth是昆士蘭科技大學設計學院城市資訊學教授，其研究與學術領導工作推動了城市資訊學的發展，將人、場所、設計與技術聯繫起來。他曾擔任QUT Design Lab創始主任，並先後在牛津大學、清華大學、同濟大學、米蘭理工大學、奧胡斯大學和奧盧大學擔任訪問學者或客座教授。",
    k3Name: "王路平",
    k3Role: "阿里雲智能設計中心總監",
    k3Title: "Go Vibe Designing——AI時代的設計判斷力",
    k3Bio: "王路平現任阿里雲智能設計中心總監、中國工業設計協會設計標準分會副理事長、中國教育技術協會藝術設計專業委員會常務委員、浙江省高級工業設計師，並入選2024中國設計產業十佳設計推動人物。他創立了阿里雲設計中心，帶領近百人的設計團隊深耕AI產品體驗設計與創新、行業AI數位化設計、AI設計新範式及AIGC設計平台等領域。他主導探索AIGC設計新範式與一站式AIGC設計平台PAI ArtLab，聯結教育協同育人，服務行業AI設計轉型，促進AI時代的設計變革。",
    k2Title: "Keynote 2嘉賓及主題",
    pending: "即將公布",
  },
} as const;

export function KeynoteShowcase() {
  const rawLocale = useLocale();
  const locale: Locale = rawLocale === "zh-CN" || rawLocale === "zh-TW" ? rawLocale : "en";
  const t = copy[locale];

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <div className={styles.status}><span aria-hidden="true">02</span><strong>{t.announced}</strong></div>
      </section>

      <section className={styles.speaker}>
        <figure className={styles.portrait}>
          <Image src="/images/keynotes/marcus-foth.jpg" alt="Professor Marcus Foth" fill priority sizes="(max-width: 780px) 100vw, 38vw" />
        </figure>
        <div className={styles.speakerContent}>
          <div className={styles.numberRow}><span>01</span><b>{t.keynote} 1</b><time>NOV 24 · 09:30</time></div>
          <h3>Professor Marcus Foth</h3>
          <p className={styles.role}>{t.k1Role}</p>
          <h4 className={styles.talkTitle}>{t.k1Title}</h4>
          <div className={styles.copyBlock}><h5>{t.biography}</h5><p>{t.k1Bio}</p></div>
        </div>
      </section>

      <section className={`${styles.speaker} ${styles.reverse}`}>
        <figure className={styles.portrait}>
          <Image src="/images/keynotes/wang-luping.jpg" alt={t.k3Name} fill sizes="(max-width: 780px) 100vw, 38vw" />
        </figure>
        <div className={styles.speakerContent}>
          <div className={styles.numberRow}><span>03</span><b>{t.keynote} 3</b><time>NOV 25 · 09:00</time></div>
          <h3>{t.k3Name}</h3>
          {locale !== "en" && <p className={styles.nameNote}>Wang Luping</p>}
          <p className={styles.role}>{t.k3Role}</p>
          <h4 className={styles.talkTitle}>{t.k3Title}</h4>
          <div className={styles.copyBlock}><h5>{t.biography}</h5><p>{t.k3Bio}</p></div>
        </div>
      </section>

      <section className={styles.pendingCard}>
        <div><span>02</span><p>{t.keynote} 2</p></div>
        <h3>{t.k2Title}</h3>
        <strong>{t.pending}</strong>
      </section>

      <div className={styles.programCta}>
        <Link href="/program">{t.schedule} <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}

