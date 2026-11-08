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
    intro: "Meet the three keynote speakers. Selected program details will be added after final confirmation.",
    announced: "3 keynote speakers announced",
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
    k2Name: "Professor Kibum Kim",
    k2Role: "Full Professor, Hanyang University ERICA, South Korea",
    k2Title: "Serious Games in VR/AR/MR and Human-Computer Interaction (HCI)",
    k2Bio: "Kibum Kim is a Full Professor in the Division of Media, Culture, and Design Technology at Hanyang University ERICA's College of Computing, South Korea. He earned his Ph.D. in Computer Science from Virginia Tech, his M.S. from the University of Illinois Urbana-Champaign, and his B.S. from Korea University. His research uses gamification in VR/AR/MR to encourage voluntary engagement and participation, with work published in leading HCI journals. He was named among the world's top 2% scientists in the 2023, 2024, and 2025 Stanford University–Elsevier citation rankings. Previously, he held academic posts in South Korea, Japan, and Canada, and worked on HCI at Motorola Labs in the United States.",
  },
  "zh-CN": {
    eyebrow: "主旨演讲嘉宾",
    title: "以设计重新审视我们正在构建的世界。",
    intro: "三位主旨演讲嘉宾均已公布。部分日程信息将在最终确认后补充。",
    announced: "三位主旨演讲嘉宾已公布",
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
    k2Name: "Kibum Kim 教授",
    k2Role: "韩国汉阳大学 ERICA 校区教授",
    k2Title: "虚拟、增强与混合现实（VR/AR/MR）及人机交互（HCI）中的严肃游戏",
    k2Bio: "Kibum Kim 是韩国汉阳大学 ERICA 校区计算学院媒体、文化与设计技术学部教授。他先后在弗吉尼亚理工大学、伊利诺伊大学厄巴纳—香槟分校和高丽大学取得计算机科学博士、硕士和学士学位。其研究聚焦于在虚拟、增强及混合现实应用中运用游戏化设计，促进用户自愿参与，成果发表于多本人机交互领域期刊。他入选斯坦福大学与爱思唯尔发布的 2023、2024 和 2025 年全球前 2% 科学家榜单。此前，他曾在韩国、日本和加拿大任教或从事研究，并在美国摩托罗拉实验室从事人机交互相关工作。",
  },
  "zh-TW": {
    eyebrow: "主旨演講嘉賓",
    title: "以設計重新審視我們正在建構的世界。",
    intro: "三位主旨演講嘉賓均已公布。部分日程資訊將在最終確認後補充。",
    announced: "三位主旨演講嘉賓已公布",
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
    k2Name: "Kibum Kim 教授",
    k2Role: "韓國漢陽大學 ERICA 校區教授",
    k2Title: "虛擬、擴增與混合實境（VR/AR/MR）及人機互動（HCI）中的嚴肅遊戲",
    k2Bio: "Kibum Kim 是韓國漢陽大學 ERICA 校區計算學院媒體、文化與設計技術學部教授。他先後在維吉尼亞理工大學、伊利諾大學厄巴納－香檳分校和高麗大學取得電腦科學博士、碩士和學士學位。其研究聚焦於在虛擬、擴增及混合實境應用中運用遊戲化設計，促進使用者自願參與，成果發表於多本人機互動領域期刊。他入選史丹佛大學與愛思唯爾發布的 2023、2024 和 2025 年全球前 2% 科學家榜單。此前，他曾在韓國、日本和加拿大任教或從事研究，並在美國摩托羅拉實驗室從事人機互動相關工作。",
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
        <div className={styles.status}><span aria-hidden="true">03</span><strong>{t.announced}</strong></div>
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
          <Image src="/images/keynotes/kibum-kim.jpg" alt="Professor Kibum Kim" fill sizes="(max-width: 780px) 100vw, 38vw" />
        </figure>
        <div className={styles.speakerContent}>
          <div className={styles.numberRow}><span>02</span><b>{t.keynote} 2</b><time>NOV 24 · 14:00</time></div>
          <h3>{t.k2Name}</h3>
          <p className={styles.role}>{t.k2Role}</p>
          <h4 className={styles.talkTitle}>{t.k2Title}</h4>
          <div className={styles.copyBlock}><h5>{t.biography}</h5><p>{t.k2Bio}</p></div>
        </div>
      </section>

      <section className={styles.speaker}>
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

      <div className={styles.programCta}>
        <Link href="/program">{t.schedule} <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}

