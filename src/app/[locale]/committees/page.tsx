import Image from "next/image";
import styles from "./committees.module.css";

type Person = {
  name: string;
  role?: string;
  affiliation?: string;
  avatarUrl?: string;
  profileUrl?: string;
};

type CommitteeGroup = {
  id: string;
  label: { zh: string; en: string };
  layout?: "two" | "three" | "threeMid" | "four";
  members: Person[];
};

export default async function CommitteesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
            ? zh("组委会主席 · 清华大学美术学院", "組委會主席 · 清華大學美術學院")
            : "Conference Chair · Academy of Arts & Design, Tsinghua University",
          avatarUrl: "https://ichec.icachi.org/assets/img/committee/100x100/FuZhiyong.jpg",
          profileUrl: "https://www.ad.tsinghua.edu.cn/info/1229/15141.htm",
        },
        {
          name: isZh ? zh("周万雷", "周萬雷") : "Wanlei Zhou",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
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
          name: isZh ? "王伯勛" : "Boxun Wang",
          affiliation: isZh
            ? zh("澳门城市大学创新设计学院 · 执行副院长", "澳門城市大學創新設計學院 · 執行副院長")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/b40a6b916753a9c9b632afb71a23e08d_1000X1000.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/28",
        },
        {
          name: isZh ? "朱天清" : "Tianqing Zhu",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
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
            ? zh("澳门城市大学创新设计学院 · 助理教授", "澳門城市大學創新設計學院 · 助理教授")
            : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/f9c5d26e7bea31a5770500fc0a625a17_500X500.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/479",
        },
        {
          name: isZh ? zh("王铭浩", "王銘浩") : "Minghao Wang",
          affiliation: isZh ? zh("澳门城市大学", "澳門城市大學") : "City University of Macau",
<<<<<<< HEAD
          avatarUrl: "/avatars/wangminghao.png",
=======
          avatarUrl: "https://fds.cityu.edu.mo/uploads/userfiles/%E7%8E%8B%E9%8A%98%E6%B5%A9.jpg",
>>>>>>> 02176575b2911b17d7f00c41299ae4d088bbbcad
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
            ? zh("澳门城市大学创新设计学院 · 教授", "澳門城市大學創新設計學院 · 教授")
            : "Faculty of Innovation and Design · City University of Macau",
<<<<<<< HEAD
          avatarUrl: "/avatars/youzhenwei.png",
=======
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/aa0dc278487017aa0ed4991f6391ee7a_500X500.jpg",
>>>>>>> 02176575b2911b17d7f00c41299ae4d088bbbcad
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/854",
        },
        {
          name: isZh ? "左旭含" : "Xuhan Zuo",
          affiliation: isZh
            ? zh("澳门城市大学数据科学学院 · 助理教授", "澳門城市大學數據科學學院 · 助理教授")
            : "Faculty of Data Science · City University of Macau",
<<<<<<< HEAD
          avatarUrl: "/avatars/zuoxuhan.jpg",
=======
          avatarUrl: "https://fds.cityu.edu.mo/uploads/userfiles/%E5%B7%A6%E6%97%AD%E5%90%AB.jpg",
>>>>>>> 02176575b2911b17d7f00c41299ae4d088bbbcad
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
          name: "王韫",
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
<<<<<<< HEAD
          avatarUrl: "/avatars/limeng.jpg",
=======
          avatarUrl:
            "https://sdmda.bupt.edu.cn/__local/E/70/E3/AD42F061589BA8BED2E2E9A4B17_67E9F848_69569.jpg",
>>>>>>> 02176575b2911b17d7f00c41299ae4d088bbbcad
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
      layout: "two",
      members: [
        {
          name: isZh ? zh("张为威", "張為威") : "Weiwei Zhang",
          affiliation: isZh ? zh("北京邮电大学", "北京郵電大學") : "Beijing University of Posts and Telecommunications",
<<<<<<< HEAD
          avatarUrl: "/avatars/zhangweiwei.jpg",
=======
>>>>>>> 02176575b2911b17d7f00c41299ae4d088bbbcad
          profileUrl: "https://sdmda.bupt.edu.cn/info/1048/1533.htm",
        },
        {
          name: "康妮",
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
      id: "ops",
      label: { zh: zh("艺术与展演 / 出版 / 技术", "藝術與展演 / 出版 / 技術"), en: "Art / Publication / Technical" },
      layout: "threeMid",
      members: [
        {
          name: "熊原",
          role: isZh ? zh("艺术与展演主席", "藝術與展演主席") : "Art Gallery Chair",
          affiliation: isZh ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院") : "Faculty of Innovation and Design · City University of Macau",
<<<<<<< HEAD
          avatarUrl: "/avatars/xiongyuan.jpg",
=======
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/c8b8c0b9f52737d69274378db5fae739_1000X1000.jpg",
>>>>>>> 02176575b2911b17d7f00c41299ae4d088bbbcad
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/855",
        },
        {
          name: "安舜",
          role: isZh ? zh("出版主席", "出版主席") : "Publication Chair",
          affiliation: isZh ? zh("澳门城市大学创新设计学院", "澳門城市大學創新設計學院") : "Faculty of Innovation and Design · City University of Macau",
          avatarUrl:
            "https://fiad.cityu.edu.mo/uploads_thumb/list/ff40f00eb3e37932b5a8adb6286da7c8_1000X1000.jpg",
          profileUrl: "https://fiad.cityu.edu.mo/acad_ft/477",
        },
        {
          name: isZh ? zh("郭畅", "郭暢") : "Chang Guo",
          role: isZh ? zh("技术主席", "技術主席") : "Technical Chair",
          affiliation: isZh ? zh("博士生", "博士生") : "PhD student",
          avatarUrl: "/avatars/guochang.png",
        },
      ],
    },
    {
      id: "support",
      label: { zh: zh("志愿者 / 财务", "志願者 / 財務"), en: "Volunteer / Finance" },
      layout: "four",
      members: [
        {
          name: "牛朝西",
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
          affiliation: isZh ? zh("博士后研究员", "博士後研究員") : "Postdoctoral researcher",
        },
        {
          name: "林浩屹",
          role: isZh ? zh("财务主席", "財務主席") : "Finance Chair",
          affiliation: isZh ? zh("博士生", "博士生") : "PhD student",
        },
        {
          name: isZh ? zh("路遥", "路遙") : "Yao Lu",
          role: isZh ? zh("财务主席", "財務主席") : "Finance Chair",
          affiliation: isZh ? zh("博士生", "博士生") : "PhD student",
        },
      ],
    },
    {
      id: "comms",
      label: { zh: zh("宣传 / 秘书处", "宣傳 / 秘書處"), en: "Publicity / Secretaries" },
      layout: "four",
      members: [
        {
          name: isZh ? zh("范馨文", "範馨文") : "Xinwen Fan",
          role: isZh ? zh("宣传主席", "宣傳主席") : "Publicity Chair",
          affiliation: isZh ? zh("博士生", "博士生") : "PhD student",
        },
        {
          name: "王若梅",
          role: isZh ? zh("宣传主席", "宣傳主席") : "Publicity Chair",
          affiliation: isZh ? zh("博士生", "博士生") : "PhD student",
        },
        {
          name: "李晨曦",
          role: isZh ? zh("秘书处", "秘書處") : "Secretary",
          affiliation: isZh ? zh("博士生", "博士生") : "PhD student",
        },
        {
          name: isZh ? zh("苏锴", "蘇鍇") : "Kai Su",
          role: isZh ? zh("秘书处", "秘書處") : "Secretary",
          affiliation: isZh ? zh("博士生", "博士生") : "PhD student",
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
                : group.layout === "threeMid"
                  ? styles.gridThreeMid
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
    </div>
  );
}
