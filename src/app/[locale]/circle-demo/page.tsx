import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ResponsiveGlowCircle } from "@/components/ResponsiveGlowCircle";
import { normalizeLocale } from "@/i18n/request";

export default async function CircleDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale) notFound();
  setRequestLocale(normalizedLocale);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5 sm:p-6">
        <div className="text-lg font-semibold tracking-wide text-black/85 dark:text-white/85">
          Responsive Glow Circle
        </div>
        <div className="mt-2 text-sm text-black/70 dark:text-white/70">
          直径 = 父容器宽度的 66.67%，圆心距底部 3cm
        </div>
      </div>

      <div className="glass-panel relative min-h-[60vh] overflow-hidden">
        <ResponsiveGlowCircle />
        <div className="relative z-10 p-5 sm:p-6">
          <div className="max-w-prose text-sm leading-6 text-black/70 dark:text-white/70">
            调整浏览器窗口宽度（320px - 3840px）观察圆形与渐变边缘的响应式表现。
          </div>
        </div>
      </div>
    </div>
  );
}

