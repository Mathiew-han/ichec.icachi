"use client";

import { usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

export function SiteShell({
  children,
  hasSupabase,
}: {
  children: ReactNode;
  hasSupabase: boolean;
}) {
  const t = useTranslations("Shell");
  const tHome = useTranslations("Home");
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
    venue: "titles.venue",
    committees: "titles.committees",
    sponsors: "titles.sponsors",
    news: "titles.news",
    dashboard: "titles.dashboard",
    admin: "titles.admin",
    auth: "titles.auth",
  } as const;

  const heroTitle =
    topSegment in titleKeyBySegment
      ? t(titleKeyBySegment[topSegment as keyof typeof titleKeyBySegment])
      : "ICHEC 2026";

  return (
    <div className="relative min-h-dvh flex flex-col">
      <CustomCursor />
      <div
        className={`site-poster${isHome ? "" : " site-poster-compact"}`}
        aria-hidden="true"
      >
        <span className="ripple-overlay" />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col">
        <SiteHeader hasSupabase={hasSupabase} />

        <main className="flex-1 pt-6 sm:pt-10">
          {isHome ? (
            children
          ) : (
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-4">
              <section className="flex min-h-[calc(36vh-96px)] min-h-[calc(36dvh-96px)] -mt-6 flex-col items-center justify-center text-center sm:-mt-8">
                <div className="text-2xl font-semibold tracking-wide text-black/75 dark:text-white/75 sm:text-3xl">
                  ICHEC 2026
                </div>
                <h1 className="mt-1 text-xl font-semibold tracking-tight text-black/85 dark:text-white/85 sm:text-2xl">
                  {heroTitle}
                </h1>
                <div className="mt-3 h-px w-[min(420px,82vw)] bg-black/20 dark:bg-white/20" />
                <div className="mt-3 text-sm font-medium text-black/70 dark:text-white/70">
                  {tHome("date")} · {tHome("location")}
                </div>
              </section>
            <div className="w-full mt-10 sm:mt-14">{children}</div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
