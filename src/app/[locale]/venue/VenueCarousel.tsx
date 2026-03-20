"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type VenueCarouselProps = {
  images: Array<{ src: StaticImageData; alt: string }>;
};

export function VenueCarousel({ images }: VenueCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const idx = children.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActiveIdx(idx);
      },
      { root: el, threshold: [0.55, 0.7, 0.85] },
    );

    children.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  function scrollTo(idx: number) {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const target = children[idx];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <button
          type="button"
          onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          aria-label="Previous"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-black/70 shadow-sm backdrop-blur transition hover:bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
        >
          ‹
        </button>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [scrollbar-width:thin]"
          aria-label="Venue gallery"
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-56 w-[88%] flex-none snap-start overflow-hidden rounded-2xl border border-black/10 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/5 sm:h-64 sm:w-[70%] lg:h-72 lg:w-[52%]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 52vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollTo(Math.min(images.length - 1, activeIdx + 1))}
          disabled={activeIdx === images.length - 1}
          aria-label="Next"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-black/70 shadow-sm backdrop-blur transition hover:bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2" aria-label="Carousel dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={
              idx === activeIdx
                ? "h-2 w-2 rounded-full border border-black/20 bg-black/25 dark:border-white/20 dark:bg-white/30"
                : "h-2 w-2 rounded-full border border-black/20 bg-black/10 hover:bg-black/20 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
            }
          />
        ))}
      </div>
    </div>
  );
}

