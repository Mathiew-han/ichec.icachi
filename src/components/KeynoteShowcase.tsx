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
    abstract: "Talk abstract",
    schedule: "View preliminary program",
    photoQut: "Photo: QUT, via the speaker's official website",
    photoTeam: "Photo supplied by the organising team",
    k1Title: "Designing Against Hostility: Human-Engaged Computing and the Worlds We Bring Into Being",
    k1Role: "Professor of Urban Informatics, Queensland University of Technology (QUT)",
    k1Bio: "Marcus Foth is Professor of Urban Informatics in the School of Design at Queensland University of Technology. His research and academic leadership have helped establish urban informatics as a field connecting people, place, design, and technology. He was Founding Director of the QUT Design Lab and has held visiting academic appointments at the University of Oxford, Tsinghua University, Tongji University, Politecnico di Milano, Aarhus University, and the University of Oulu.",
    k1Abstract: [
      "Design increasingly operates beyond discrete artefacts and interfaces, shaping the infrastructures, platforms, institutions, and everyday systems through which people eat, dress, dwell, move, communicate, and participate in society. This keynote develops the concept of hostile design to examine how such systems can systematically enable particular actors, objectives, or operations while constraining agency, redistributing burdens, or externalising social, ecological, and political costs onto others. Hostility need not arise from malicious intent or design failure. Systems may be technically competent, commercially successful, administratively efficient, and experientially seamless while remaining hostile in how their benefits, risks, friction, and capacities for action are distributed.",
      "Drawing on the Chinese framework of 衣食住行 – clothing, food, dwelling, and travelling – the keynote traces how hostility becomes embedded within the systems of everyday life, from accelerated consumption and platformised services to software-sorted urbanism and mobility infrastructures. Artificial intelligence adds urgency to this problem by scaling, accelerating, and personalising conditions of opacity, delegation, manipulation, and constrained contestability that long predate contemporary AI.",
      "The challenge for human-engaged computing is therefore broader than making technologies usable, intelligent, or efficient. It concerns the worlds those technologies help bring into being. The keynote invites consideration of how design might work against hostility through care, contestability, practical judgement, stewardship, and collective capacity, and calls on designers to reorient technological efficacy towards more liveable and equitable futures.",
    ],
    k3Name: "Wang Luping",
    k3NameNote: "English name spelling pending final confirmation",
    k3Role: "Director, Alibaba Cloud Intelligence Design Center",
    k3Title: "Go Vibe Designing: Design Judgment in the AI Era",
    k3Bio: "Wang Luping is Director of the Alibaba Cloud Intelligence Design Center, Vice Chairman of the Design Standards Branch of the China Industrial Design Association, a standing committee member of the Art and Design Professional Committee of the China Association for Educational Technology, a Senior Industrial Designer of Zhejiang Province, and one of China's Top Ten Design Industry Promoters in 2024. He founded Alibaba Cloud's design center and leads a design team of nearly one hundred people working across AI product experience, industry AI transformation, new AI design paradigms, and AIGC design platforms. His work includes the one-stop AIGC design platform PAI ArtLab and industry–education collaboration supporting design transformation in the AI era.",
    k3Abstract: "The detailed talk abstract will be announced after final confirmation.",
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
    abstract: "演讲摘要",
    schedule: "查看暂定议程",
    photoQut: "照片：QUT，经讲者个人官网提供",
    photoTeam: "照片由大会筹备团队提供",
    k1Title: "反对敌意的设计：人类参与式计算与我们共同塑造的世界",
    k1Role: "昆士兰科技大学（QUT）城市信息学教授",
    k1Bio: "Marcus Foth是昆士兰科技大学设计学院城市信息学教授，其研究与学术领导工作推动了城市信息学的发展，将人、场所、设计与技术联系起来。他曾担任QUT Design Lab创始主任，并先后在牛津大学、清华大学、同济大学、米兰理工大学、奥胡斯大学和奥卢大学担任访问学者或客座教授。",
    k1Abstract: [
      "设计的作用早已超越单一产品与界面，开始塑造人们衣、食、住、行、沟通以及参与社会所依赖的基础设施、平台、机构与日常系统。本次演讲以“敌意设计”为切入点，分析这些系统如何在帮助特定参与者、目标或运作方式的同时，限制其他人的行动能力、重新分配负担，并将社会、生态与政治成本转嫁给他者。敌意并不一定来自恶意或设计失败；一个技术成熟、商业成功、管理高效且体验顺畅的系统，仍可能在利益、风险、摩擦和行动能力的分配上具有敌意。",
      "演讲借助中国语境中的“衣食住行”，考察敌意如何嵌入日常生活系统，包括加速消费、平台化服务、由软件分类的城市空间与移动基础设施。人工智能通过扩大、加速和个性化不透明、委托、操控及难以申诉的状态，使这些早于当代AI的问题变得更加紧迫。",
      "因此，人类参与式计算的任务不仅是让技术更易用、更智能或更高效，更需要关注技术帮助塑造了怎样的世界。本次演讲将讨论设计如何通过关怀、可质疑性、实践判断、守护责任与集体能力来抵抗敌意，并推动技术效能服务于更加宜居和公平的未来。",
    ],
    k3Name: "王路平",
    k3NameNote: "英文姓名拼写待最终确认",
    k3Role: "阿里云智能设计中心总监",
    k3Title: "Go Vibe Designing——AI时代的设计判断力",
    k3Bio: "王路平现任阿里云智能设计中心总监、中国工业设计协会设计标准分会副理事长、中国教育技术协会艺术设计专业委员会常务委员、浙江省高级工业设计师，并入选2024中国设计产业十佳设计推动人物。他创立了阿里云设计中心，带领近百人的设计团队深耕AI产品体验设计与创新、行业AI数字化设计、AI设计新范式及AIGC设计平台等领域。他主导探索AIGC设计新范式与一站式AIGC设计平台PAI ArtLab，联结教育协同育人，服务行业AI设计转型，促进AI时代的设计变革。",
    k3Abstract: "详细演讲摘要将在最终确认后公布。",
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
    abstract: "演講摘要",
    schedule: "查看暫定議程",
    photoQut: "照片：QUT，經講者個人官網提供",
    photoTeam: "照片由大會籌備團隊提供",
    k1Title: "反對敵意的設計：人類參與式計算與我們共同塑造的世界",
    k1Role: "昆士蘭科技大學（QUT）城市資訊學教授",
    k1Bio: "Marcus Foth是昆士蘭科技大學設計學院城市資訊學教授，其研究與學術領導工作推動了城市資訊學的發展，將人、場所、設計與技術聯繫起來。他曾擔任QUT Design Lab創始主任，並先後在牛津大學、清華大學、同濟大學、米蘭理工大學、奧胡斯大學和奧盧大學擔任訪問學者或客座教授。",
    k1Abstract: [
      "設計的作用早已超越單一產品與介面，開始塑造人們衣、食、住、行、溝通以及參與社會所依賴的基礎設施、平台、機構與日常系統。本次演講以「敵意設計」為切入點，分析這些系統如何在幫助特定參與者、目標或運作方式的同時，限制其他人的行動能力、重新分配負擔，並將社會、生態與政治成本轉嫁給他者。敵意並不一定來自惡意或設計失敗；一個技術成熟、商業成功、管理高效且體驗流暢的系統，仍可能在利益、風險、摩擦和行動能力的分配上具有敵意。",
      "演講借助中國語境中的「衣食住行」，考察敵意如何嵌入日常生活系統，包括加速消費、平台化服務、由軟體分類的城市空間與移動基礎設施。人工智慧透過擴大、加速和個人化不透明、委託、操控及難以申訴的狀態，使這些早於當代AI的問題變得更加緊迫。",
      "因此，人類參與式計算的任務不僅是讓技術更易用、更智慧或更高效，更需要關注技術幫助塑造了怎樣的世界。本次演講將討論設計如何透過關懷、可質疑性、實踐判斷、守護責任與集體能力來抵抗敵意，並推動技術效能服務於更加宜居和公平的未來。",
    ],
    k3Name: "王路平",
    k3NameNote: "英文姓名拼寫待最終確認",
    k3Role: "阿里雲智能設計中心總監",
    k3Title: "Go Vibe Designing——AI時代的設計判斷力",
    k3Bio: "王路平現任阿里雲智能設計中心總監、中國工業設計協會設計標準分會副理事長、中國教育技術協會藝術設計專業委員會常務委員、浙江省高級工業設計師，並入選2024中國設計產業十佳設計推動人物。他創立了阿里雲設計中心，帶領近百人的設計團隊深耕AI產品體驗設計與創新、行業AI數位化設計、AI設計新範式及AIGC設計平台等領域。他主導探索AIGC設計新範式與一站式AIGC設計平台PAI ArtLab，聯結教育協同育人，服務行業AI設計轉型，促進AI時代的設計變革。",
    k3Abstract: "詳細演講摘要將在最終確認後公布。",
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
          <figcaption>{t.photoQut}</figcaption>
        </figure>
        <div className={styles.speakerContent}>
          <div className={styles.numberRow}><span>01</span><b>{t.keynote} 1</b><time>NOV 24 · 09:30</time></div>
          <h3>Professor Marcus Foth</h3>
          <p className={styles.role}>{t.k1Role}</p>
          <h4 className={styles.talkTitle}>{t.k1Title}</h4>
          <div className={styles.copyBlock}><h5>{t.abstract}</h5>{t.k1Abstract.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className={styles.copyBlock}><h5>{t.biography}</h5><p>{t.k1Bio}</p></div>
        </div>
      </section>

      <section className={`${styles.speaker} ${styles.reverse}`}>
        <figure className={styles.portrait}>
          <Image src="/images/keynotes/wang-luping.jpg" alt={t.k3Name} fill sizes="(max-width: 780px) 100vw, 38vw" />
          <figcaption>{t.photoTeam}</figcaption>
        </figure>
        <div className={styles.speakerContent}>
          <div className={styles.numberRow}><span>03</span><b>{t.keynote} 3</b><time>NOV 25 · 09:00</time></div>
          <h3>{t.k3Name}</h3>
          <p className={styles.nameNote}>{t.k3NameNote}</p>
          <p className={styles.role}>{t.k3Role}</p>
          <h4 className={styles.talkTitle}>{t.k3Title}</h4>
          <div className={styles.copyBlock}><h5>{t.abstract}</h5><p>{t.k3Abstract}</p></div>
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

