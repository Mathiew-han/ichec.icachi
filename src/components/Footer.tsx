"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function Footer({ hideAboutFull }: { hideAboutFull?: boolean }) {
  const t = useTranslations("Shell");

  return (
    <footer className="w-full py-12 mt-12">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-8">
        
        {/* Social Icons */}
        <div className="flex items-center gap-8">
          {/* Twitter / X */}
          <a
            href="https://twitter.com/ChineseCHI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/50 hover:text-[#1DA1F2] dark:text-white/50 dark:hover:text-white transition-colors"
            aria-label="Twitter (X)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          
          {/* Facebook */}
          <a
            href="https://www.facebook.com/ChineseCHI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/50 hover:text-[#1877F2] dark:text-white/50 dark:hover:text-[#1877F2] transition-colors"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>

          {/* WeChat */}
          <a
            href="#"
            className="text-black/50 hover:text-[#07C160] dark:text-white/50 dark:hover:text-[#07C160] transition-colors"
            aria-label="WeChat"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
               <path d="M17.48 10.3c-.08-.01-.15-.01-.23-.01-3.66 0-6.64 2.61-6.64 6.01 0 3.28 2.99 5.78 6.64 5.78.3 0 .59-.02.88-.05l2.49 1.42c.16.09.35.03.44-.13.04-.08.05-.16.03-.25l-.48-2.74c1.17-.95 1.9-2.33 1.9-3.86 0-3.39-2.98-6.17-6.63-6.17zM8.7 4.04c-3.65 0-6.75 2.61-6.75 6.01 0 1.66.75 3.16 1.97 4.23l-.48 2.74c-.03.17.09.34.26.37.09.02.18-.01.25-.05l2.49-1.42c.88.24 1.8.37 2.75.37.08 0 .15 0 .23-.01 3.51-.23 6.33-2.82 6.33-6.23 0-3.4-3.09-6.01-6.75-6.01z" />
            </svg>
          </a>
          
          {/* YouTube */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/50 hover:text-[#FF0000] dark:text-white/50 dark:hover:text-[#FF0000] transition-colors"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-black/60 dark:text-white/60">
           <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
             {t("footer.privacy")}
           </Link>
           <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">
             {t("footer.terms")}
           </Link>
           <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
             {t("footer.contact")}
           </Link>
        </div>

        {/* Contact Info Text */}
        <div className="text-center text-sm text-black/50 dark:text-white/50">
           <p>Email: <a href="mailto:contact@chinese-chi.org" className="hover:text-black dark:hover:text-white transition-colors">contact@chinese-chi.org</a></p>
        </div>

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
