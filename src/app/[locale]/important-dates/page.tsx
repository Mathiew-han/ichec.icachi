import styles from "./important-dates.module.css";

type RowTone = "warn" | "accent" | undefined;

type TimelineRow = {
  period: string;
  tech: string[];
  org: string[];
  tone?: RowTone;
};

type TimelineCopy = {
  title: string;
  thImportantDates: string;
  thTechnicalIssues: string;
  thOrganizationIssues: string;
  rows: TimelineRow[];
};

function getTimelineCopy(locale: string): TimelineCopy {
  if (locale === "zh-TW") {
    return {
      title: "時間軸",
      thImportantDates: "重要日期",
      thTechnicalIssues: "技術事項",
      thOrganizationIssues: "組織事項",
      rows: [
        {
          period: "1 月",
          tech: ["大會委員會確認"],
          org: [],
        },
        {
          period: "2 月",
          tech: ["審稿人組織", "EasyChair 系統設定", "主旨演講嘉賓邀請"],
          org: ["官方網站建置", "贊助方案規劃"],
        },
        {
          period: "3 月",
          tech: ["公告發布", "主旨演講嘉賓邀請"],
          org: ["註冊費率設定", "贊助推廣"],
        },
        {
          period: "4 月",
          tech: [],
          org: ["預熱宣傳（校慶 & Barcelona China Night）", "贊助推廣"],
        },
        {
          period: "5 月上旬",
          tech: ["第一輪徵稿（CFP Round 1）"],
          org: ["會議宣傳：官網/官方渠道、學術社群等"],
          tone: "warn",
        },
        {
          period: "6 月下旬",
          tech: ["第二輪徵稿（CFP Round 2）"],
          org: ["贊助推廣與洽談"],
          tone: "warn",
        },
        {
          period: "8 月",
          tech: ["8 月 10 日：第一輪摘要截止", "8 月 14 日：第一輪全文截止"],
          org: ["註冊開放", "政府資助申請"],
          tone: "warn",
        },
        {
          period: "9 月",
          tech: ["9 月 10 日：第二輪摘要截止", "9 月 13 日：第二輪全文截止"],
          org: ["參會指南發布（場地、住宿、交通等）"],
          tone: "warn",
        },
        {
          period: "10 月",
          tech: [
            "10 月 1 日：結果公布",
            "10 月 8 日：E-rights 完成截止",
            "10 月 15 日：TAPS 初次上傳截止",
            "10 月 22 日：出版就緒稿截止",
            "詳細議程規劃",
            "藝術展/畫廊安排",
          ],
          org: [
            "10 月 23 日（AoE，週五）：早鳥註冊截止",
            "社交活動安排",
            "開幕式安排（含特邀嘉賓邀請）",
          ],
        },
        {
          period: "11 月",
          tech: ["分會場主席邀請"],
          org: ["11 月 13 日（AoE，週五）：常規註冊截止", "設計與製作", "學生志工招募"],
        },
        {
          period: "11 月 23–26 日",
          tech: ["會議舉辦"],
          org: ["晚期註冊費率"],
          tone: "accent",
        },
      ],
    };
  }

  if (locale === "zh-CN") {
    return {
      title: "时间轴",
      thImportantDates: "重要日期",
      thTechnicalIssues: "技术事项",
      thOrganizationIssues: "组织事项",
      rows: [
        {
          period: "1 月",
          tech: ["大会委员会确认"],
          org: [],
        },
        {
          period: "2 月",
          tech: ["审稿人组织", "EasyChair 系统设置", "主旨演讲嘉宾邀请"],
          org: ["官网搭建", "赞助方案规划"],
        },
        {
          period: "3 月",
          tech: ["公告发布", "主旨演讲嘉宾邀请"],
          org: ["注册费率设置", "赞助推广"],
        },
        {
          period: "4 月",
          tech: [],
          org: ["预热宣传（校庆 & Barcelona China Night）", "赞助推广"],
        },
        {
          period: "5 月上旬",
          tech: ["第一轮征稿（CFP Round 1）"],
          org: ["会议宣传：官网/官方渠道、学术社群等"],
          tone: "warn",
        },
        {
          period: "6 月下旬",
          tech: ["第二轮征稿（CFP Round 2）"],
          org: ["赞助推广与洽谈"],
          tone: "warn",
        },
        {
          period: "8 月",
          tech: ["8 月 10 日：第一轮摘要截止", "8 月 14 日：第一轮全文截止"],
          org: ["注册开启", "政府资助申请"],
          tone: "warn",
        },
        {
          period: "9 月",
          tech: ["9 月 10 日：第二轮摘要截止", "9 月 13 日：第二轮全文截止"],
          org: ["参会指南发布（场地、住宿、交通等）"],
          tone: "warn",
        },
        {
          period: "10 月",
          tech: [
            "10 月 1 日：结果公布",
            "10 月 8 日：E-rights 完成截止",
            "10 月 15 日：TAPS 初次上传截止",
            "10 月 22 日：出版就绪稿截止",
            "详细议程规划",
            "艺术展/画廊安排",
          ],
          org: [
            "10 月 23 日（AoE，周五）：早鸟注册截止",
            "社交活动安排",
            "开幕式安排（含特邀嘉宾邀请）",
          ],
        },
        {
          period: "11 月",
          tech: ["分会场主席邀请"],
          org: ["11 月 13 日（AoE，周五）：常规注册截止", "设计与制作", "学生志愿者招募"],
        },
        {
          period: "11 月 23–26 日",
          tech: ["会议举办"],
          org: ["晚期注册费率"],
          tone: "accent",
        },
      ],
    };
  }

  if (locale === "pt") {
    return {
      title: "Linha do Tempo",
      thImportantDates: "Datas Importantes",
      thTechnicalIssues: "Tarefas Técnicas",
      thOrganizationIssues: "Tarefas Organizacionais",
      rows: [
        { period: "Janeiro", tech: ["Confirmação do Comitê da Conferência"], org: [] },
        {
          period: "Fevereiro",
          tech: ["Organização de revisores", "Configuração do EasyChair", "Convite aos palestrantes principais"],
          org: ["Configuração do site oficial", "Planejamento do pacote de patrocínio"],
        },
        {
          period: "Março",
          tech: ["Anúncio", "Convite aos palestrantes principais"],
          org: ["Definição das taxas de inscrição", "Promoção de patrocínio"],
        },
        {
          period: "Abril",
          tech: [],
          org: ["Aquecimento (Aniversário da Universidade & Barcelona China Night)", "Promoção de patrocínio"],
        },
        {
          period: "Início de Maio",
          tech: ["1ª rodada de Call for Papers"],
          org: ["Promoção da conferência: canais oficiais, comunidade acadêmica, etc."],
          tone: "warn",
        },
        {
          period: "Final de Junho",
          tech: ["2ª rodada de Call for Papers"],
          org: ["Promoção e negociação de patrocínio"],
          tone: "warn",
        },
        {
          period: "Agosto",
          tech: ["10 de Agosto: prazo do resumo da 1ª rodada", "14 de Agosto: prazo do artigo completo da 1ª rodada"],
          org: ["Abertura de inscrições", "Solicitação de fundos governamentais"],
          tone: "warn",
        },
        {
          period: "Setembro",
          tech: ["10 de Setembro: prazo do resumo da 2ª rodada", "13 de Setembro: prazo do artigo completo da 2ª rodada"],
          org: ["Guia de participação (local, acomodação, transporte, etc.)"],
          tone: "warn",
        },
        {
          period: "Outubro",
          tech: [
            "1 de Outubro: anúncio dos resultados",
            "8 de Outubro: prazo de conclusão do E-rights",
            "15 de Outubro: prazo do upload inicial no TAPS",
            "22 de Outubro: prazo da versão pronta para publicação",
            "Planejamento detalhado do programa",
            "Arranjos da galeria de arte",
          ],
          org: [
            "23 de Outubro (AoE, sex.): prazo do Early Bird",
            "Arranjos de eventos sociais",
            "Cerimônia de abertura (incl. convidados especiais)",
          ],
        },
        {
          period: "Novembro",
          tech: ["Convite aos chairs de sessão"],
          org: ["13 de Novembro (AoE, sex.): prazo de inscrição normal", "Design e produção", "Recrutamento de voluntários"],
        },
        {
          period: "23–26 de Novembro",
          tech: ["Datas da conferência"],
          org: ["Taxa de inscrição tardia"],
          tone: "accent",
        },
      ],
    };
  }

  return {
    title: "Timeline",
    thImportantDates: "Important Dates",
    thTechnicalIssues: "Technical Issues",
    thOrganizationIssues: "Organization Issues",
    rows: [
      { period: "January", tech: ["Conference Committee Confirmation"], org: [] },
      {
        period: "February",
        tech: ["Reviewer Organization", "EasyChair System Setup", "Keynote Speakers Invitation"],
        org: ["Official Website Setup", "Sponsorship Package Planning"],
      },
      {
        period: "March",
        tech: ["Announcement", "Keynote Speakers Invitation"],
        org: ["Registration Rate Setup", "Sponsorship Promotion"],
      },
      {
        period: "April",
        tech: [],
        org: ["Warm-up Promotion (University Anniversary & Barcelona China Night)", "Sponsorship Promotion"],
      },
      {
        period: "Early May",
        tech: ["1st Round of Call for Papers"],
        org: ["Conference Promotion: Official Channels, Academic Community, etc."],
        tone: "warn",
      },
      {
        period: "Late June",
        tech: ["2nd Round of Call for Papers"],
        org: ["Sponsorship Promotion and Negotiation"],
        tone: "warn",
      },
      {
        period: "August",
        tech: ["August 10: Round 1 Abstract deadline", "August 14: Round 1 Full paper deadline"],
        org: ["Registration Opens", "Government Fund Application"],
        tone: "warn",
      },
      {
        period: "September",
        tech: ["September 10: Round 2 Abstract deadline", "September 13: Round 2 Full paper deadline"],
        org: ["Participation Guide Release (Venue, Accommodation, Transportation, etc.)"],
        tone: "warn",
      },
      {
        period: "October",
        tech: [
          "October 1: Results announced",
          "October 8: E-rights completion deadline",
          "October 15: Initial TAPS upload deadline",
          "October 22: Publication-ready deadline",
          "Detailed Program Planning",
          "Art Gallery Arrangements",
        ],
        org: [
          "October 23, AoE (Fri): Early Bird Registration Due",
          "Social Events Arrangements",
          "Opening Ceremony Arrangements (incl. Special Guests Invitation)",
        ],
      },
      {
        period: "November",
        tech: ["Session Chairs Invitation"],
        org: ["November 13, AoE (Fri): Normal Registration Due", "Design and Production", "Student Volunteer Recruitment"],
      },
      {
        period: "November 23–26",
        tech: ["Conference Dates"],
        org: ["Late Registration Rate"],
        tone: "accent",
      },
    ],
  };
}

export default async function ImportantDatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getTimelineCopy(locale);

  return (
    <div className={styles.page}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{copy.thImportantDates}</th>
              <th>{copy.thTechnicalIssues}</th>
              <th>{copy.thOrganizationIssues}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => {
              const rowClass =
                row.tone === "warn"
                  ? styles.warnRow
                  : row.tone === "accent"
                    ? styles.accentRow
                    : undefined;

              return (
                <tr key={row.period} className={rowClass}>
                  <td className={styles.monthCell}>{row.period}</td>
                  <td>
                    {row.tech.length ? (
                      <ul className={styles.list}>
                        {row.tech.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    ) : null}
                  </td>
                  <td>
                    {row.org.length ? (
                      <ul className={styles.list}>
                        {row.org.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
