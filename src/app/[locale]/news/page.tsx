import { Link } from "@/navigation";
import { Markdown } from "@/components/Markdown";
import { readSiteMarkdown } from "@/lib/site-content";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await readSiteMarkdown("news", locale);

  return (
    <div className="space-y-10">
      <Markdown content={content} />
      <section className="space-y-6">
        <div className="text-lg font-semibold tracking-wide text-black/85 dark:text-white/85">
          AMA 午餐（示意）
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-panel px-6 py-6 lg:col-span-2">
            <div className="text-sm font-semibold text-black/60 dark:text-white/60">
              Ask Me Anything Student Lunch
            </div>
            <div className="mt-2 text-sm text-black/75 dark:text-white/75">
              面向学生与青年研究者的对话午餐项目，涵盖申请要求、选拔规则与咨询方式。
            </div>
          </div>
          <div className="glass-panel px-6 py-6">
            <div className="text-sm font-semibold text-black/60 dark:text-white/60">Apply</div>
            <div className="mt-4">
              <Link href="#" className="glass px-5 py-2 text-sm font-semibold">
                立即申请
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
