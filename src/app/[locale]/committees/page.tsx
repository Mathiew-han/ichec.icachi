import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { Markdown } from "@/components/Markdown";
import { readSiteMarkdown } from "@/lib/site-content";
import styles from "./committees.module.css";

export default async function CommitteesPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("Common");
  const { locale } = await params;
  const content = await readSiteMarkdown("committees", locale);
  return (
    <div className={styles.page}>
      <Markdown content={content} />
      <section className={styles.section}>
        <div className={styles.sectionTitle}>{t("organization")}</div>
        <div className={styles.lead}>
          {t("toBeUpdated")}
        </div>
        <div className={styles.roster}>
          {[
            { role: "General Chair", name: "Name Placeholder", aff: "University / Lab" },
            { role: "Program Chair", name: "Name Placeholder", aff: "University / Lab" },
            { role: "Workshops Chair", name: "Name Placeholder", aff: "University / Lab" },
            { role: "Art & Demo Chair", name: "Name Placeholder", aff: "University / Lab" },
            { role: "Local Chair", name: "Name Placeholder", aff: "University / Lab" },
            { role: "Sponsorship Chair", name: "Name Placeholder", aff: "University / Lab" },
          ].map((item) => (
            <div key={item.role} className={styles.item}>
              <div className={styles.role}>{item.role}</div>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.aff}>{item.aff}</div>
              <div className={styles.kv}>
                <div>
                  <b>Email:</b> chair@example.com
                </div>
                <div>
                  <b>Focus:</b> HCI · Cultural Computing · Responsible AI
                </div>
                <div>
                  <Link href="#" className="underline underline-offset-4">
                    {t("homepage")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
