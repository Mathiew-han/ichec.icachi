"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia?.("(pointer: fine)").matches ?? false;
  const noReducedMotion = !(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  return finePointer && noReducedMotion;
}

type CursorVariant = "default" | "interactive" | "pressed";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const variantRef = useRef<CursorVariant>("default");
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const k = useMemo(
    () => ({
      dot: 0.45,
      ring: 0.16,
    }),
    [],
  );

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setEnabled(canUseCustomCursor());
    });
    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const body = document.body;
    body.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: target.x, y: target.y };
    const ring = { x: target.x, y: target.y };

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const setVariantSafe = (value: CursorVariant) => {
      variantRef.current = value;
      setVariant(value);
    };

    const onPointerDown = () => setVariantSafe("pressed");
    const onPointerUp = () => setVariantSafe("default");

    const isInteractive = (el: Element | null) => {
      if (!el) return false;
      return Boolean(
        el.closest(
          "a,button,summary,[role='button'],[data-cursor='interactive'],input,textarea,select,label",
        ),
      );
    };

    const onPointerOver = (event: PointerEvent) => {
      if (variantRef.current === "pressed") return;
      setVariantSafe(isInteractive(event.target as Element | null) ? "interactive" : "default");
    };

    const onPointerOut = (event: PointerEvent) => {
      if (variantRef.current === "pressed") return;
      if (isInteractive(event.relatedTarget as Element | null)) return;
      setVariantSafe("default");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    let raf = 0;
    const tick = () => {
      dot.x += (target.x - dot.x) * k.dot;
      dot.y += (target.y - dot.y) * k.dot;
      ring.x += (target.x - ring.x) * k.ring;
      ring.y += (target.y - ring.y) * k.ring;

      const dotEl = dotRef.current;
      const ringEl = ringRef.current;

      if (dotEl) {
        dotEl.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringEl) {
        ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      window.cancelAnimationFrame(raf);
    };
  }, [enabled, k.dot, k.ring]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div
        ref={ringRef}
        className={`custom-cursor-ring${variant === "interactive" ? " is-interactive" : ""}${
          variant === "pressed" ? " is-pressed" : ""
        }`}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot${variant === "interactive" ? " is-interactive" : ""}${
          variant === "pressed" ? " is-pressed" : ""
        }`}
      />
    </div>
  );
}
