import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Markdown } from "@/components/Markdown";
import { normalizeLocale } from "@/i18n/request";
import { readSiteMarkdown } from "@/lib/site-content";
import { VenueCarousel } from "./VenueCarousel";

import floorplan from "../../../../images/venue/wynn-macau-ballroom-plan.jpg";
import ballroomSign from "../../../../images/venue/wynn-macau-ballroom-sign.jpg";
import wynnMacau from "../../../../images/venue/wynn-macau-exterior.jpg";

const venueLabels = {
  en: {
    floorplan: "Wynn Macau ballroom floor plan showing reception, breakout rooms, exhibition areas, and dining rooms",
    fullSize: "Open the full-size floor plan",
    exterior: "Wynn Macau hotel exterior",
    sign: "Wynn Macau ballroom directional sign",
  },
  "zh-CN": {
    floorplan: "永利澳门宴会厅平面图，标出签到处、分会场、展区及用餐场地",
    fullSize: "查看原尺寸平面图",
    exterior: "永利澳门酒店外观",
    sign: "永利澳门宴会厅指引路牌",
  },
  "zh-TW": {
    floorplan: "永利澳門宴會廳平面圖，標示簽到處、分會場、展區及用餐場地",
    fullSize: "查看原尺寸平面圖",
    exterior: "永利澳門酒店外觀",
    sign: "永利澳門宴會廳指引路牌",
  },
};

export default async function VenuePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale) notFound();
  setRequestLocale(normalizedLocale);
  const t = await getTranslations("Common");
  const content = await readSiteMarkdown("venue", normalizedLocale);
  const labels = venueLabels[normalizedLocale];
  const venueImages = [
    { src: wynnMacau, alt: labels.exterior },
    { src: ballroomSign, alt: labels.sign },
  ];

  return (
    <div className="space-y-10">
      <Markdown content={content} />
      <section className="space-y-6">
        <div className="text-lg font-semibold tracking-wide text-black/85 dark:text-white/85">
          {t("venue")}
        </div>
        <figure className="space-y-3">
          <Image src={floorplan} alt={labels.floorplan} className="h-auto w-full max-w-3xl rounded-2xl border border-black/10" />
          <figcaption>
            <a href={floorplan.src} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              {labels.fullSize}
            </a>
          </figcaption>
        </figure>
        <VenueCarousel images={venueImages} />
      </section>
    </div>
  );
}
