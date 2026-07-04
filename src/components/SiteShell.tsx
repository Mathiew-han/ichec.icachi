"use client";

import { usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

export function SiteShell({ children }: { children: ReactNode }) {
  const t = useTranslations("Shell");
  const tHome = useTranslations("Home");
  const tCfp = useTranslations("CFP");
  const tRegistration = useTranslations("Registration");
  const pathname = usePathname();
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const pathnameNoBase =
    basePath && pathname.startsWith(`${basePath}/`)
      ? pathname.slice(basePath.length)
      : pathname === basePath
        ? "/"
        : pathname;
  const isHome = pathnameNoBase === "/";
  const topSegment = pathnameNoBase.split("/")[1] || "";

  const titleKeyBySegment = {
    about: "titles.about",
    "important-dates": "titles.important-dates",
    cfp: "titles.cfp",
    keynotes: "titles.keynotes",
    program: "titles.program",
    registration: "titles.registration",
    amalunch: "titles.amalunch",
    venue: "titles.venue",
    committees: "titles.committees",
    sponsors: "titles.sponsors",
    news: "titles.news",
  } as const;

  const heroTitle =
    topSegment in titleKeyBySegment
      ? t(titleKeyBySegment[topSegment as keyof typeof titleKeyBySegment])
      : "ICHEC 2026";
  const heroNote =
    topSegment === "cfp"
      ? tCfp("subtitle")
      : topSegment === "committees"
        ? t("notes.committees")
        : topSegment === "registration"
          ? tRegistration("lead")
          : "";

  return (
    <div className="site-shell min-h-dvh" data-site-shell-root>
      <SiteHeader />

      <main id="content" className="site-main">
        {isHome ? (
          children
        ) : (
          <>
            <section className="inner-hero">
              <div className="inner-hero-bg" aria-hidden="true" />
              <div className="inner-hero-content">
                <p className="inner-hero-kicker">ICHEC 2026</p>
                <h1>{heroTitle}</h1>
                <div className="inner-hero-rule" />
                <p className="inner-hero-meta">
                  {tHome("date")} · {tHome("location")}
                </p>
                {heroNote ? <p className="inner-hero-note">{heroNote}</p> : null}
              </div>
              <div className="hero-wave" aria-hidden="true">
                <svg preserveAspectRatio="none" viewBox="0 0 1920 100.1">
                  <path d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
                </svg>
              </div>
            </section>

            <div className="site-page-container">{children}</div>
          </>
        )}
      </main>

      <Footer hideAboutFull={isHome} />
    </div>
  );
}
