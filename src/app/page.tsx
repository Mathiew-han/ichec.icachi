"use client";

import { useEffect } from "react";

function normalizeBasePath(raw: string) {
  if (!raw || raw === "/") return "";
  return `/${raw}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

export default function RootRedirectPage() {
  useEffect(() => {
    const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");
    const target = `${basePath}/zh-CN/`.replace(/\/+/g, "/");
    window.location.replace(target);
  }, []);

  return null;
}

