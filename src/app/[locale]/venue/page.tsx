import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Markdown } from "@/components/Markdown";
import { normalizeLocale } from "@/i18n/request";
import { readSiteMarkdown } from "@/lib/site-content";
import { VenueCarousel } from "./VenueCarousel";

import breakOutRoom1 from "../../../../images/break_out_room/1.png";
import breakOutRoom2 from "../../../../images/break_out_room/2.png";
import breakOutRoom3 from "../../../../images/break_out_room/3.png";
import floorplan from "../../../../images/floorplan.png";
import plenaryHall1 from "../../../../images/plenary_hall/1.png";
import plenaryHall2 from "../../../../images/plenary_hall/2.png";
import plenaryHall3 from "../../../../images/plenary_hall/3.png";
import plenaryHallImage from "../../../../images/plenary_hall/image.png";
import registrationArea from "../../../../images/registration_Area.png";

export default async function VenuePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale) notFound();
  setRequestLocale(normalizedLocale);
  const t = await getTranslations("Common");
  const content = await readSiteMarkdown("venue", normalizedLocale);
  const venueImages = [
    { src: floorplan, alt: "Venue floorplan" },
    { src: registrationArea, alt: "Registration area" },
    { src: plenaryHallImage, alt: "Plenary hall" },
    { src: plenaryHall1, alt: "Plenary hall photo 1" },
    { src: plenaryHall2, alt: "Plenary hall photo 2" },
    { src: plenaryHall3, alt: "Plenary hall photo 3" },
    { src: breakOutRoom1, alt: "Breakout room photo 1" },
    { src: breakOutRoom2, alt: "Breakout room photo 2" },
    { src: breakOutRoom3, alt: "Breakout room photo 3" },
  ];

  return (
    <div className="space-y-10">
      <Markdown content={content} />
      <section className="space-y-6">
        <div className="text-lg font-semibold tracking-wide text-black/85 dark:text-white/85">
          {t("venue")}
        </div>
        <VenueCarousel images={venueImages} />
      </section>
    </div>
  );
}
