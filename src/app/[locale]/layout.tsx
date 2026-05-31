import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, normalizeLocale } from "@/i18n/request";
import { SiteShell } from "@/components/SiteShell";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chinese-chi.vercel.app";

export const metadata: Metadata = {
  title: "ICHEC 2026",
  description: "ICHEC 2026 Conference Website",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fcf4ec",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  if (!normalizedLocale) {
    notFound();
  }

  setRequestLocale(normalizedLocale);
  const messages = await getMessages();

  return (
    <html lang={normalizedLocale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="advanced-texture" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  result="noise"
                  numOctaves="3"
                  baseFrequency="0.7"
                  type="fractalNoise"
                />
                <feSpecularLighting
                  result="specular"
                  lightingColor="#fff"
                  specularExponent="20"
                  specularConstant="0.8"
                  surfaceScale="2"
                  in="noise"
                >
                  <fePointLight z="100" y="50" x="50" />
                </feSpecularLighting>
                <feComposite
                  result="litNoise"
                  operator="in"
                  in2="SourceGraphic"
                  in="specular"
                />
                <feBlend mode="overlay" in2="litNoise" in="SourceGraphic" />
              </filter>
            </defs>
          </svg>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
