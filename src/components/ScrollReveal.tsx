"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const easeStandard: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
}

export function ScrollReveal({
  children,
  className = "",
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
}: ScrollRevealProps) {
  // Split string children into words, otherwise treat as single element
  const content = typeof children === "string" ? children.split(" ") : [children];

  return (
    <div className={className}>
      {Array.isArray(content) ? (
        content.map((word, i) => (
          <Word 
            key={i} 
            index={i} 
            enableBlur={enableBlur}
            baseOpacity={baseOpacity}
            baseRotation={baseRotation}
            blurStrength={blurStrength}
          >
            {word}
            {typeof children === "string" && i < content.length - 1 ? "\u00A0" : ""}
          </Word>
        ))
      ) : (
        <Word 
          index={0} 
          enableBlur={enableBlur}
          baseOpacity={baseOpacity}
          baseRotation={baseRotation}
          blurStrength={blurStrength}
        >
          {children}
        </Word>
      )}
    </div>
  );
}

interface WordProps {
  children: ReactNode;
  index: number;
  enableBlur: boolean;
  baseOpacity: number;
  baseRotation: number;
  blurStrength: number;
}

function Word({ children, index, enableBlur, baseOpacity, baseRotation, blurStrength }: WordProps) {
  return (
    <span className="inline-block">
      <motion.span
        initial={{ 
          opacity: baseOpacity, 
          filter: enableBlur ? `blur(${blurStrength}px)` : "none",
          rotate: baseRotation,
          y: 10
        }}
        whileInView={{ 
          opacity: 1, 
          filter: "blur(0px)",
          rotate: 0,
          y: 0
        }}
        transition={{
          duration: 0.8,
          ease: easeStandard,
          delay: index * 0.02
        }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
