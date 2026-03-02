import { Link } from "@/navigation";
import { Markdown } from "@/components/Markdown";
import { readSiteMarkdown } from "@/lib/site-content";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "./sponsors.module.css";

type SponsorRow = {
  id: string;
  name: string;
  level: string;
  logo_url: string | null;
  website_url: string | null;
};

export default async function SponsorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await readSiteMarkdown("sponsors", locale);

  const supabase = await createSupabaseServerClient();
  const { data } = supabase
    ? await supabase
        .from("sponsors")
        .select("id,name,level,logo_url,website_url")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true })
    : { data: null };

  const sponsors = (data ?? []) as SponsorRow[];

  return (
    <div className={styles.page}>
      <Markdown content={content} />
      {sponsors.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionTitle}>Sponsors</div>
          <div className={styles.lead}>
            {sponsors.length} sponsor(s) listed.
          </div>
          {Array.from(new Set(sponsors.map((s) => s.level))).map((level) => (
            <div key={level} className={styles.group}>
              <div className={styles.groupTitle}>{level}</div>
              <div className={styles.sponsorList}>
                {sponsors
                  .filter((s) => s.level === level)
                  .map((s) => (
                    <div key={s.id} className={styles.sponsorItem}>
                      <div className={styles.sponsorName}>{s.name}</div>
                      <div className={styles.sponsorMeta}>
                        {s.website_url ? (
                          <a className="underline underline-offset-4" href={s.website_url}>
                            {s.website_url}
                          </a>
                        ) : (
                          <span>Website to be announced</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}
      <section className={`${styles.section} ${styles.inlineCode}`}>
        <div className={styles.sectionTitle}>赞助级别（参考）</div>
        <div className={styles.lead}>
          费用与权益将以正式赞助权益包为准。以下为占位结构，便于快速对齐内容。
        </div>
        <div className={styles.tierGrid}>
          {[
            { tier: "Bronze", fee: "￥X,XXX", perks: "展位 + Logo 露出" },
            { tier: "Silver", fee: "￥X,XXX", perks: "议程露出 + 展位" },
            { tier: "Gold", fee: "￥X,XXX", perks: "主会场露出 + 赞助致辞" },
            { tier: "Platinum", fee: "￥X,XXX", perks: "冠名曝光 + 深度合作" },
          ].map((item) => (
            <div key={item.tier} className={styles.tierRow}>
              <div className={styles.tierTop}>
                <div className={styles.tierName}>{item.tier}</div>
                <div className={styles.tierFee}>
                  <code className="inline-code">{item.fee}</code>
                </div>
              </div>
              <div className={styles.tierPerks}>{item.perks}</div>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link href="#" className="underline underline-offset-4">
            获取赞助方案与联系方式
          </Link>
          <a className="underline underline-offset-4" href="mailto:contact@chinese-chi.org">
            contact@chinese-chi.org
          </a>
        </div>
      </section>
    </div>
  );
}
