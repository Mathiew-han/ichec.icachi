"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer({ hideAboutFull }: { hideAboutFull?: boolean }) {
  const t = useTranslations("Shell");
  const contactEmail = "ichec2026.info@gmail.com";

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        {hideAboutFull ? null : (
          <p className="site-footer-about">{t("footer.aboutFull")}</p>
        )}

        <section className="site-footer-partners" aria-labelledby="footer-host-organizer">
          <p id="footer-host-organizer" className="site-footer-partners-eyebrow">
            {t("footer.hostOrganizer")}
          </p>
          <div className="site-footer-partner-grid">
            <div className="site-footer-partner">
              <Image
                className="site-footer-partner-logo"
                src="/partners/icachi-host.png"
                alt={t("footer.icachi")}
                width={760}
                height={360}
              />
            </div>
            <div className="site-footer-partner">
              <Image
                className="site-footer-partner-logo"
                src="/partners/cityu-host.png"
                alt={t("footer.cityu")}
                width={880}
                height={360}
              />
            </div>
          </div>
        </section>

        <div className="site-footer-row">
          <p className="site-footer-copy">
            <a href="https://icachi.org" target="_blank" rel="noreferrer">
              {t("footer.rights")}
            </a>
          </p>

          <div className="site-footer-contact">
            <a className="site-footer-icon" href={`mailto:${contactEmail}`} aria-label={contactEmail}>
              @
            </a>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
