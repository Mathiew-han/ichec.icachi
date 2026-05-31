"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import breakOutRoom1 from "../../images/break_out_room/1.png";
import breakOutRoom2 from "../../images/break_out_room/2.png";
import breakOutRoom3 from "../../images/break_out_room/3.png";
import plenaryHall from "../../images/plenary_hall/image.png";
import plenaryHall1 from "../../images/plenary_hall/1.png";
import plenaryHall2 from "../../images/plenary_hall/2.png";
import registrationArea from "../../images/registration_Area.png";

type VenueParallaxCarouselProps = {
  isZh: boolean;
  isZhTW: boolean;
};

const IMAGES = [
  { src: registrationArea, key: "wynn", zhCN: "永利皇宫会议接待区", zhTW: "永利皇宮會議接待區", en: "Wynn Palace Reception" },
  { src: plenaryHall, key: "plenary", zhCN: "主会场", zhTW: "主會場", en: "Plenary Hall" },
  { src: plenaryHall1, key: "plenary-1", zhCN: "大会报告厅", zhTW: "大會報告廳", en: "Main Auditorium" },
  { src: plenaryHall2, key: "plenary-2", zhCN: "会场细节", zhTW: "會場細節", en: "Venue Detail" },
  { src: breakOutRoom1, key: "breakout-1", zhCN: "分会场", zhTW: "分會場", en: "Breakout Room" },
  { src: breakOutRoom2, key: "breakout-2", zhCN: "工作坊空间", zhTW: "工作坊空間", en: "Workshop Space" },
  { src: breakOutRoom3, key: "breakout-3", zhCN: "交流空间", zhTW: "交流空間", en: "Discussion Space" },
];

export function VenueParallaxCarousel({ isZh, isZhTW }: VenueParallaxCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const back = backRef.current;
    if (!root || !viewport || !track || !back) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    let loopTween: gsap.core.Tween | null = null;
    let imageTween: gsap.core.Tween | null = null;
    let cleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".venue-parallax-card", root);
      const carouselImages = gsap.utils.toArray<HTMLElement>(".venue-parallax-card img", root);
      const stacks = gsap.utils.toArray<HTMLElement>(".venue-parallax-stack", root);

      const buildLoop = () => {
        const firstStack = stacks[0];
        if (!firstStack) return;

        loopTween?.kill();
        imageTween?.kill();
        const loopHeight = firstStack.offsetHeight;
        if (!loopHeight) return;

        gsap.set(track, { y: -loopHeight });
        loopTween = gsap.to(track, {
          y: 0,
          duration: 20,
          ease: "none",
          repeat: -1,
          modifiers: {
            y: (value) => {
              const current = Number.parseFloat(value) || 0;
              const wrapped = gsap.utils.wrap(-loopHeight, 0, current);
              return `${wrapped}px`;
            },
          },
        });

        imageTween = gsap.to(carouselImages, {
          yPercent: (index) => (index % 2 === 0 ? -7 : 7),
          scale: 1.055,
          duration: 6.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.12,
        });
      };

      buildLoop();

      gsap.fromTo(viewport, {
        autoAlpha: 0,
        y: 40,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(back, {
        yPercent: -12,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 86%",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        gsap.fromTo(card, {
          autoAlpha: 0.74,
          xPercent: index % 2 === 0 ? -3 : 3,
          yPercent: index % 3 === 0 ? 2 : -2,
          rotate: index % 2 === 0 ? -0.45 : 0.45,
        }, {
          autoAlpha: 1,
          xPercent: index % 2 === 0 ? 3 : -3,
          yPercent: index % 3 === 0 ? -2 : 2,
          rotate: index % 2 === 0 ? 0.45 : -0.45,
          duration: 8 + (index % 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const pauseMotion = () => {
        loopTween?.pause();
        imageTween?.pause();
      };
      const resumeMotion = () => {
        loopTween?.resume();
        imageTween?.resume();
      };
      const handleResize = () => buildLoop();

      viewport.addEventListener("mouseenter", pauseMotion);
      viewport.addEventListener("mouseleave", resumeMotion);
      viewport.addEventListener("focusin", pauseMotion);
      viewport.addEventListener("focusout", resumeMotion);
      window.addEventListener("resize", handleResize);

      const imageNodes = Array.from(root.querySelectorAll("img"));
      imageNodes.forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", handleResize, { once: true });
        }
      });

      cleanup = () => {
        viewport.removeEventListener("mouseenter", pauseMotion);
        viewport.removeEventListener("mouseleave", resumeMotion);
        viewport.removeEventListener("focusin", pauseMotion);
        viewport.removeEventListener("focusout", resumeMotion);
        window.removeEventListener("resize", handleResize);
        imageNodes.forEach((image) => {
          image.removeEventListener("load", handleResize);
        });
        loopTween?.kill();
        imageTween?.kill();
      };
    }, root);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, []);

  const labelFor = (image: (typeof IMAGES)[number]) =>
    isZh ? (isZhTW ? image.zhTW : image.zhCN) : image.en;

  return (
    <div className="venue-parallax" ref={rootRef}>
      <div className="venue-parallax-back" ref={backRef} aria-hidden="true">
        <img src={registrationArea.src} alt="" draggable={false} />
        <img src={plenaryHall.src} alt="" draggable={false} />
      </div>
      <div className="venue-parallax-viewport" ref={viewportRef}>
        <div className="venue-parallax-track" ref={trackRef}>
          {[0, 1].map((copyIndex) => (
            <div
              className="venue-parallax-stack"
              key={`stack-${copyIndex}`}
              aria-hidden={copyIndex === 1}
            >
              {IMAGES.map((image) => (
                <figure className="venue-parallax-card" key={`${copyIndex}-${image.key}`}>
                  <img src={image.src.src} alt={copyIndex === 0 ? labelFor(image) : ""} draggable={false} />
                  <figcaption>{labelFor(image)}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
