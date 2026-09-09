"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LayeredHeadingProps {
  number?: string;
  title: string;
  watermark: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function LayeredHeading({
  number,
  title,
  watermark,
  subtitle,
  align = "left",
  className = "",
}: LayeredHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <div className={`relative w-full overflow-hidden select-none pb-4 md:pb-6 ${className}`}>
      {/* Background Watermark Layer */}
      <div
        aria-hidden="true"
        className={`absolute -top-6 md:-top-10 font-bold uppercase tracking-tight text-white/[0.035] pointer-events-none whitespace-nowrap leading-none ${
          align === "left" ? "left-0" : align === "right" ? "right-0" : "left-1/2 -translate-x-1/2"
        }`}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
          zIndex: 0,
        }}
      >
        {watermark}
      </div>

      {/* Foreground Layer */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 flex flex-col ${alignmentClasses}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shadow-[0_0_6px_rgba(220,38,38,0.5)]" />
          <span className="h-px w-8 md:w-12 bg-[#dc2626]/40" />
          {subtitle && (
            <span className="font-mono text-xs uppercase tracking-wider text-white/40">
              {subtitle}
            </span>
          )}
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
      </motion.div>
    </div>
  );
}
