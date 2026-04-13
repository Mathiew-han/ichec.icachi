"use client";

import { useTranslations } from "next-intl";

export function Footer({ hideAboutFull }: { hideAboutFull?: boolean }) {
  const t = useTranslations("Shell");

  return (
    <footer className="w-full py-12 mt-12">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-8">
        
        {hideAboutFull ? null : (
          <p className="text-center text-xs text-black/40 dark:text-white/40 max-w-4xl leading-relaxed">
            {t("footer.aboutFull")}
          </p>
        )}

        {/* Copyright */}
        <div className="text-xs text-black/40 dark:text-white/40">
           {t("footer.rights")}
        </div>

      </div>
    </footer>
  );
}
