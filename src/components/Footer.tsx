"use client";

import { useTranslations } from "next-intl";

export function Footer({ hideAboutFull }: { hideAboutFull?: boolean }) {
  const t = useTranslations("Shell");
  const contactEmail = "ichec2026@icachi.org";

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        {hideAboutFull ? null : (
          <p className="site-footer-about">{t("footer.aboutFull")}</p>
        )}

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
