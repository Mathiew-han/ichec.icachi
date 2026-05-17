"use client";

import Image from "next/image";
import { useState, use } from "react";
import styles from "./committees.module.css";
import { motion, AnimatePresence } from "framer-motion";

type Person = {
  name: string;
  role?: string;
  affiliation?: string;
  avatarUrl?: string;
  profileUrl?: string;
  bio?: { zh: string; en: string };
};

type CommitteeGroup = {
  id: string;
  label: { zh: string; en: string };
  layout?: "two" | "three" | "threeMid" | "four";
  members: Person[];
};

export default function CommitteesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const tbdAvatar = "/avatars/tbd.svg";
  const isZh = locale.startsWith("zh");
  const isZhTW = locale === "zh-TW";
  const zh = (zhCN: string, zhTW: string) => (isZhTW ? zhTW : zhCN);

  const groups: CommitteeGroup[] = [
    {
      id: "general",
      label: { zh: zh("大会主席", "大會主席"), en: "General Chairs" },
      layout: "two",
      members: [
        {
          name: isZh ? "付志勇" : "Zhiyong Fu",
          affiliation: isZh
            ? zh("清华大学美术学院", "清華大學美術學院")
            : "Academy of Arts & Design, Tsinghua University",
          avatarUrl: "https://ichec.icachi.org/assets/img/committee/100x100/FuZhiyong.jpg",
          profileUrl: "https://www.ad.tsinghua.edu.cn/info/1229/15141.htm",
        },
        {
          name: isZh ? zh("周万雷", "周萬雷") : "Wanlei Zhou",
          affiliation: isZh ? zh("澳门城市大学数据科学学院", "澳門城市大學數據科學學院") : "Faculty of Data Science · City University of Macau",
          avatarUrl: "https://fds.cityu.edu.mo/uploads/userfiles/%E5%91%A8%E8%90%AC%E9%9B%B7(1).jpg",
          profileUrl: "https://fds.cityu.edu.mo/members/177",
        },
      ],
    },
    {
      id: "program",
      label: { zh: zh("程序主席", "程序主席"), en: "Program Chairs" },
      layout: "two",
      members: [
        {
          name: isZh ? "王伯勛" : "Po-Hsun Wang",
          affiliation: isZh
            ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/b40a6b916753a9c9b632afb71a23e08d_1000X1000.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/28",
        },
        {
          name: isZh ? "朱天清" : "Tianqing Zhu",
          affiliation: isZh ? zh("澳门城市大学数据科学学院", "澳門城市大學數據科學學院") : "Faculty of Data Science · City University of Macau",
          avatarUrl: "https://fds.cityu.edu.mo/uploads/userfiles/Image_20240927111003(2).jpg",
          profileUrl: "https://fds.cityu.edu.mo/members/336",
        },
      ],
    },
    {
      id: "local",
      label: { zh: zh("本地主席", "本地主席"), en: "Local Chairs" },
      layout: "two",
      members: [
        {
          name: isZh ? "柳婧" : "Jing Liu",
          affiliation: isZh
            ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/f9c5d26e7bea31a5770500fc0a625a17_500X500.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/479",
        },
        {
          name: isZh ? zh("王铭浩", "王銘浩") : "Minghao Wang",
          affiliation: isZh ? zh("澳门城市大学数据科学学院", "澳門城市大學數據科學學院") : "Faculty of Data Science · City University of Macau",
          avatarUrl: "/avatars/wangminghao.png",
          profileUrl: "https://fds.cityu.edu.mo/members/383",
        },
      ],
    },
    {
      id: "panel",
      label: { zh: zh("圆桌主席", "圓桌主席"), en: "Panel Chairs" },
      layout: "two",
      members: [
        {
          name: isZh ? "由振偉" : "Zhenwei You",
          affiliation: isZh
            ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl: "/avatars/youzhenwei.png",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/854",
        },
        {
          name: isZh ? "左旭含" : "Xuhan Zuo",
          affiliation: isZh
            ? zh("澳门城市大学数据科学学院", "澳門城市大學數據科學學院")
            : "Faculty of Data Science · City University of Macau",
          avatarUrl: "https://fds.cityu.edu.mo/uploads/userfiles/%E5%B7%A6%E6%97%AD%E5%90%AB.jpg",
          profileUrl: "https://fds.cityu.edu.mo/members/496",
        },
      ],
    },
    {
      id: "workshop",
      label: { zh: zh("工作坊主席", "工作坊主席"), en: "Workshop Chairs" },
      layout: "two",
      members: [
        {
          name: isZh ? "王韫" : "Yun Wang",
          affiliation: isZh ? zh("北京航空航天大学", "北京航空航天大學") : "Beihang University",
          avatarUrl: "https://shi.buaa.edu.cn/_resources/group1/M00/00/01/wKgAH2JDtUiAC-dzAAB31xXbtqA067.jpg",
          profileUrl: "https://shi.buaa.edu.cn/wangyun/zh_CN/index.htm",
        },
        {
          name: isZh ? zh("高永杰", "高永傑") : "Yongjie Gao",
          affiliation: isZh
            ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl: "https://fiad.cityu.edu.mo/uploads_thumb/list/af47ff443a5528223e70d0a61b154600_1000X1000.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/633",
        },
      ],
    },
    {
      id: "full",
      label: { zh: zh("长文主席", "長文主席"), en: "Full Paper Chairs" },
      layout: "four",
      members: [
        {
          name: isZh ? "李萌" : "Meng Li",
          affiliation: isZh ? zh("北京邮电大学", "北京郵電大學") : "Beijing University of Posts and Telecommunications",
          avatarUrl: "/avatars/limeng.jpg",
          profileUrl: "https://sdmda.bupt.edu.cn/info/1047/1209.htm",
        },
        {
          name: isZh ? "王勇" : "Yong Wang",
          affiliation: isZh ? zh("南洋理工大学", "南洋理工大學") : "Nanyang Technological University (NTU)",
          avatarUrl: "https://yong-wang.org/images/wangyong-2020.jpg",
          profileUrl: "https://yong-wang.org/",
        },
        {
          name: isZh ? "蔡杰" : "Jie Cai",
          affiliation: isZh ? zh("清华大学", "清華大學") : "Tsinghua University",
          avatarUrl: "https://jc926.github.io/Jie_Cai/image/Jie%20Cai.png",
          profileUrl: "https://jc926.github.io/Jie_Cai/",
        },
        {
          name: isZh ? zh("贺红红", "賀紅紅") : "Honghong He",
          affiliation: isZh
            ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/5a05a167595bae231c7959e7933b775d_1000X1000.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/752",
        },
      ],
    },
    {
      id: "short",
      label: { zh: zh("短文主席", "短文主席"), en: "Short Paper Chairs" },
      layout: "three",
      members: [
        {
          name: isZh ? "陈昕" : "Xin Chen",
          affiliation: isZh ? zh("深圳大学", "深圳大學") : "Shenzhen University",
          avatarUrl: "/avatars/chenxin.jpg",
          profileUrl: "https://art.szu.edu.cn/info/1196/4091.htm",
        },
        {
          name: isZh ? zh("张为威", "張為威") : "Weiwei Zhang",
          affiliation: isZh ? zh("北京邮电大学", "北京郵電大學") : "Beijing University of Posts and Telecommunications",
          avatarUrl: "/avatars/zhangweiwei.jpg",
          profileUrl: "https://sdmda.bupt.edu.cn/info/1048/1533.htm",
        },
        {
          name: isZh ? "康妮" : "Ni Kang",
          affiliation: isZh
            ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/60df484dfdb37ca0483bc605d0b4fb41_1000X1000.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/555",
        },
      ],
    },
    {
      id: "art",
      label: { zh: zh("艺术与展演", "藝術與展演"), en: "Art Gallery" },
      layout: "three",
      members: [
        {
          name: isZh ? "李晴川" : "Qingchuan Li",
          role: isZh ? zh("艺术与展演主席", "藝術與展演主席") : "Art Gallery Chair",
          affiliation: isZh ? zh("哈尔滨工业大学（深圳）", "哈爾濱工業大學（深圳）") : "Harbin Institute of Technology (Shenzhen)",
          avatarUrl: "/avatars/liqingchuan.jpg",
          profileUrl: "https://homepage.hit.edu.cn/liqingchuan?lang=zh",
        },
        {
          name: isZh ? "何思倩" : "He Siqian",
          role: isZh ? zh("艺术与展演主席", "藝術與展演主席") : "Art Gallery Chair",
          affiliation: isZh ? zh("北京科技大学工业设计系", "北京科技大學工業設計系") : "Department of Industrial Design, University of Science and Technology Beijing",
          avatarUrl: "/avatars/hesiqian.jpg",
          bio: {
            zh: `北京科技大学工业设计系。研究方向处于设计、人工智能和社会福祉的交汇点，重点关注人工智能时代的儿童发展。致力于探索人工智能产品如何对儿童更具同理心和责任感，开发平衡社会价值与人文关怀的人工智能产品和服务。
            
代表性成果包括在 CoDesign、Futures、The Design Journal 等国际顶级期刊发表多篇论文。著有《绘北京老行当》，其研究和教学成果曾被《北京日报》、《北京青年报》及新华社报道。`,
            en: `Department of Industrial Design, University of Science and Technology Beijing (USTB). 

RESEARCH INTERESTS: Her research lies at the intersection of Design, Artificial Intelligence, and Social Wellbeing, with a specific focus on Child Development in the AI Era. She is committed to exploring how AI products can be more empathetic and responsible toward children, developing AI products and services that balance social value with humanistic care.

REPRESENTATIVE PUBLICATIONS: Published multiple papers in top journals such as CoDesign, Futures, and The Design Journal. Author of "Sketching the Craftspeople of Old Beijing". Her research and teaching achievements have been featured by Beijing Daily, Beijing Youth Daily, and Xinhua News.`
          }
        },
        {
          name: isZh ? "熊原" : "Yuan Xiong",
          role: isZh ? zh("艺术与展演主席", "藝術與展演主席") : "Art Gallery Chair",
          affiliation: isZh ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院") : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl: "/avatars/xiongyuan.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/855",
        },
      ],
    },
    {
      id: "ops_support",
      label: { zh: zh("出版 / 技术 / 志愿者", "出版 / 技術 / 志願者"), en: "Publication / Technical / Volunteer" },
      layout: "two",
      members: [
        {
          name: isZh ? "安舜" : "Shun An",
          role: isZh ? zh("出版主席", "出版主席") : "Publication Chair",
          affiliation: isZh ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院") : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/ff40f00eb3e37932b5a8adb6286da7c8_1000X1000.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/477",
        },
        {
          name: isZh ? zh("屈弘", "屈弘") : "Hong Qu",
          role: isZh ? zh("出版主席", "出版主席") : "Publication Chair",
          affiliation: isZh ? zh("澳门城市大学数据科学学院", "澳門城市大學數據科學學院") : "Faculty of Data Science · City University of Macau",
          avatarUrl: "/avatars/quhong.jpg",
        },
        {
          name: isZh ? zh("肖博", "肖博") : "Robert Xiao",
          role: isZh ? zh("出版主席", "出版主席") : "Publication Chair",
          affiliation: isZh
            ? zh("不列颠哥伦比亚大学", "不列顛哥倫比亞大學")
            : "University of British Columbia",
          avatarUrl: "/avatars/robert-xiao.jpg",
          profileUrl: "https://robertxiao.ca",
        },
        {
          name: isZh ? zh("郭畅", "郭暢") : "Chang Guo",
          role: isZh ? zh("技术主席", "技術主席") : "Technical Chair",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/guochang.png",
        },
        {
          name: isZh ? "牛朝西" : "Chaoxi Niu",
          role: isZh ? zh("志愿者主席", "志願者主席") : "Volunteer Chair",
          affiliation: isZh
            ? zh("澳门城市大学数据科学学院", "澳門城市大學數據科學學院")
            : "Faculty of Data Science · City University of Macau",
          avatarUrl: "https://fds.cityu.edu.mo/uploads/userfiles/%E7%89%9B%E6%9C%9D%E8%A5%BF.jpg",
          profileUrl: "https://fds.cityu.edu.mo/members/500",
        },
        {
          name: isZh ? zh("赖雅凤", "賴雅鳳") : "Yafeng Lai",
          role: isZh ? zh("志愿者主席", "志願者主席") : "Volunteer Chair",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/赖雅凤.jpg",
          profileUrl:
            "https://scholar.google.com/citations?hl=zh-CN&view_op=list_works&gmla=AEk_c1tui7kCvU8ECS1nlifUmcvZvxQD0EPvti-AOQv6OZQsS7tm9oMlGB6l6hcHN9WwEePfbQ1UOIOpj1EYyv0jSBSVArhfX78GiliFHrSAjY3jRmMtDI0gJ6Js3DZTUYg&user=IJOJMkAAAAAJ",
        },
      ],
    },
    {
      id: "finance_comms",
      label: { zh: zh("财务 / 宣传 / 秘书处", "財務 / 宣傳 / 秘書處"), en: "Finance / Publicity / Secretaries" },
      layout: "four",
      members: [
        {
          name: isZh ? "林浩屹" : "Haoyi Lin",
          role: isZh ? zh("财务主席", "財務主席") : "Finance Chair",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/林浩屹.jpg",
        },
        {
          name: isZh ? zh("路遥", "路遙") : "Yao Lu",
          role: isZh ? zh("财务主席", "財務主席") : "Finance Chair",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/路遥.png",
        },
        {
          name: isZh ? zh("范馨文", "範馨文") : "Xinwen Fan",
          role: isZh ? zh("宣传主席", "宣傳主席") : "Publicity Chair",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/范馨文.jpg",
        },
        {
          name: isZh ? "王若梅" : "Ruomei Wang",
          role: isZh ? zh("宣传主席", "宣傳主席") : "Publicity Chair",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/王若梅.jpg",
        },
        {
          name: isZh ? "李晨曦" : "Chenxi Li",
          role: isZh ? zh("秘书处", "秘書處") : "Secretary",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/李晨曦.jpg",
        },
        {
          name: isZh ? zh("苏锴", "蘇鍇") : "Kai Su",
          role: isZh ? zh("秘书处", "秘書處") : "Secretary",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
          avatarUrl: "/avatars/苏锴.jpg",
        },
      ],
    },
  ];

  return (
    <div className={styles.page}>
      {groups.map((group) => (
        <section key={group.id} className={styles.section}>
          <div
            className={`${styles.grid} ${
              group.layout === "two"
                ? styles.gridTwo
                : group.layout === "three"
                  ? styles.gridThree
                  : styles.gridFour
            }`}
          >
            {group.members.map((m) => {
              const avatarSrc = m.avatarUrl ?? tbdAvatar;
              const key = `${group.id}-${m.name}`;
              const role = m.role ?? (isZh ? group.label.zh : group.label.en);

              const body = (
                <>
                  <div className={styles.avatarWrap}>
                    <Image
                      src={avatarSrc}
                      alt={m.name}
                      width={64}
                      height={64}
                      className={styles.avatar}
                      unoptimized={true}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.role}>{role}</div>
                    <div className={styles.name}>{m.name}</div>
                    {m.affiliation ? <div className={styles.aff}>{m.affiliation}</div> : null}
                  </div>
                </>
              );

              if (m.bio) {
                return (
                  <button
                    key={key}
                    className={`glass-panel ${styles.card} ${styles.cardLink}`}
                    onClick={() => setSelectedPerson(m)}
                  >
                    {body}
                  </button>
                );
              }

              return (
                m.profileUrl ? (
                  <a
                    key={key}
                    className={`glass-panel ${styles.card} ${styles.cardLink}`}
                    href={m.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {body}
                  </a>
                ) : (
                  <article key={key} className={`glass-panel ${styles.card}`}>
                    {body}
                  </article>
                )
              );
            })}
          </div>
        </section>
      ))}

      <AnimatePresence>
        {selectedPerson && (
          <div className={styles.modalOverlay} onClick={() => setSelectedPerson(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={styles.modalContent} 
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedPerson(null)}>×</button>
              <div className={styles.modalHeader}>
                <div className={styles.modalAvatarWrap}>
                  <Image
                    src={selectedPerson.avatarUrl ?? tbdAvatar}
                    alt={selectedPerson.name}
                    width={120}
                    height={120}
                    className={styles.avatar}
                    unoptimized={true}
                  />
                </div>
                <div className={styles.modalHeaderText}>
                  <h3 className={styles.modalName}>{selectedPerson.name}</h3>
                  <p className={styles.modalAff}>{selectedPerson.affiliation}</p>
                </div>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.bioText}>
                  {isZh ? selectedPerson.bio?.zh : selectedPerson.bio?.en}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
