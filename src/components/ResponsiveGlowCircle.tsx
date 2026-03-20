"use client";

import type { CSSProperties } from "react";

type ResponsiveGlowCircleProps = {
  className?: string;
  centerFromBottom?: string;
};

export function ResponsiveGlowCircle({
  className,
  centerFromBottom = "3cm",
}: ResponsiveGlowCircleProps) {
  const style = {
    ["--rgc-center-from-bottom" as string]: centerFromBottom,
  } satisfies CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={["responsive-glow-circle", className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}

