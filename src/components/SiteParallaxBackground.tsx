"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";

function normalizeBasePath(value: string | undefined): string {
  if (!value || value === "/") return "";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

export function SiteParallaxBackground() {
  const basePath = useMemo(
    () => normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
    [],
  );
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const poster = document.querySelector<HTMLElement>(".site-poster");
    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

    const updateVisibility = () => {
      if (!poster) {
        progressRef.current = 1;
        setProgress(1);
        return;
      }

      const posterBottom = poster.getBoundingClientRect().bottom;
      const revealDistance = Math.max(window.innerHeight * 0.28, 180);
      const nextProgress = clamp01(-posterBottom / revealDistance);

      if (Math.abs(nextProgress - progressRef.current) > 0.001) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }
    };

    let rafId = 0;
    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="site-content-bg"
      style={{
        opacity: progress,
        visibility: progress > 0.001 ? "visible" : "hidden",
        transform: `translate3d(0, ${((1 - progress) * 52).toFixed(3)}%, 0)`,
      }}
    >
      <div className="site-bg-stage">
        <div className="site-bg-layer site-bg-static">
          <img
            src={`${basePath}/visuals/parallax/macau-parallax-base.webp`}
            alt=""
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
