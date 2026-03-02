import { NextResponse } from "next/server";

import { normalizeLocale } from "@/i18n/request";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const pathname = url.pathname;
  const pathnameNoBase =
    basePath && pathname.startsWith(`${basePath}/`)
      ? pathname.slice(basePath.length)
      : pathname === basePath
        ? "/"
        : pathname;

  const pathSegments = pathnameNoBase.split("/");
  const localeFromPath = normalizeLocale(pathSegments[1] ?? null) ?? "en";
  const authUrl = new URL(`${basePath}/${localeFromPath}/auth`.replace(/\/+/g, "/"), url.origin);
  authUrl.searchParams.set("error", "Magic link disabled");
  return NextResponse.redirect(authUrl);
}
