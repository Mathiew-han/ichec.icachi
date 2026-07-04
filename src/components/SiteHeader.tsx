"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

import logoDark from "../../images/icachi-logo-dark.svg";
import logoColor from "../../images/icachi-logo-dark.svg";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const pathnameNoBase =
    basePath && pathname.startsWith(`${basePath}/`)
      ? pathname.slice(basePath.length)
      : pathname === basePath
        ? "/"
        : pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const primaryLinks = [
    { href: "/", label: t("home") },
    { href: "/cfp", label: t("authors") },
    { href: "/registration", label: t("attend") },
    { href: "/program", label: t("program") },
    { href: "/committees", label: t("committee") },
    { href: "/sponsors", label: t("sponsorship") },
  ];

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 18);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-section">
        <div className="site-topbar" aria-hidden="true" />

        <div className="site-header-container">
          <nav className="site-navbar" aria-label="Primary navigation">
            <Link href="/" className="site-brand" aria-label="ICACHI home">
              <Image
                src={scrolled ? logoColor : logoDark}
                alt="ICACHI"
                width={184}
                height={48}
                priority
              />
            </Link>

            <div className="site-nav-desktop">
              {primaryLinks.map((item) => {
                const active = isActivePath(pathnameNoBase, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`site-nav-item ${active ? "is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              className="site-menu-toggle"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="site-mobile-nav"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="site-menu-lines" aria-hidden="true" />
            </button>
          </nav>

          <div
            id="site-mobile-nav"
            className={`site-mobile-nav ${mobileMenuOpen ? "is-open" : ""}`}
          >
            {primaryLinks.map((item) => {
              const active = isActivePath(pathnameNoBase, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`site-mobile-nav-item ${active ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="site-mobile-lang">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
