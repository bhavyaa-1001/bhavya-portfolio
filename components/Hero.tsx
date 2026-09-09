"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineLayerRef = useRef<HTMLDivElement>(null);
  const photoLayerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headlineLayerRef.current && photoLayerRef.current && containerRef.current) {
        gsap.to(headlineLayerRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
        });
        gsap.to(photoLayerRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.8 },
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen min-h-[600px] max-h-[1200px] w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Full-Bleed Portrait Background with Refined Framing */}
      <div
        ref={photoLayerRef}
        className="absolute top-0 bottom-0 right-0 w-full md:w-[70vw] lg:w-[58vw] xl:w-[52vw] z-0 will-change-transform overflow-hidden pointer-events-none"
      >
        <Image
          src="/portrait-placeholder.png"
          alt="Bhavya Bansal - Full Stack Developer"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover contrast-[1.08] brightness-[0.72]"
          style={{ objectPosition: "center 22%" }}
        />
        {/* Soft feather blends so the studio background melts into #0a0a0a */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/40" />
        {/* Spider-Man dual accent subtle ambient tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/[0.05] via-transparent to-[#2563eb]/[0.04]" />
      </div>

      {/* Oversized Background Typography */}
      <div
        ref={headlineLayerRef}
        aria-hidden="true"
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none will-change-transform overflow-hidden px-6 md:px-12"
      >
        <h1
          className="w-full text-center font-extrabold uppercase tracking-tight text-white/[0.08] leading-none whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 7.8vw, 8.2rem)",
            letterSpacing: "-0.01em",
          }}
        >
          DEVELOPER
        </h1>
      </div>

      {/* Spider-Man Web Corner SVG (top-left) */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] pointer-events-none z-[3] opacity-20">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <line x1="0" y1="0" x2="200" y2="200" stroke="#dc2626" strokeWidth="0.6" />
          <line x1="0" y1="0" x2="200" y2="100" stroke="#dc2626" strokeWidth="0.6" />
          <line x1="0" y1="0" x2="100" y2="200" stroke="#dc2626" strokeWidth="0.6" />
          <line x1="0" y1="0" x2="200" y2="0" stroke="#dc2626" strokeWidth="0.6" />
          <line x1="0" y1="0" x2="0" y2="200" stroke="#dc2626" strokeWidth="0.6" />
          <line x1="0" y1="0" x2="200" y2="50" stroke="#dc2626" strokeWidth="0.4" />
          <line x1="0" y1="0" x2="50" y2="200" stroke="#dc2626" strokeWidth="0.4" />
          <line x1="0" y1="0" x2="150" y2="200" stroke="#dc2626" strokeWidth="0.4" />
          <line x1="0" y1="0" x2="200" y2="150" stroke="#dc2626" strokeWidth="0.4" />
          <path d="M 40 0 A 40 40 0 0 1 0 40" stroke="#dc2626" strokeWidth="0.4" fill="none" />
          <path d="M 80 0 A 80 80 0 0 1 0 80" stroke="#dc2626" strokeWidth="0.4" fill="none" />
          <path d="M 130 0 A 130 130 0 0 1 0 130" stroke="#dc2626" strokeWidth="0.4" fill="none" />
          <path d="M 180 0 A 180 180 0 0 1 0 180" stroke="#dc2626" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      {/* Top Navigation (Desktop) */}
      <div className="hidden lg:flex absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 py-6 items-center justify-between">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-sm md:text-base font-bold tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          BHAVYA BANSAL
        </motion.span>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden sm:flex items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-wider"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            WITH GREAT CODE
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span>COMES GREAT RESPONSIBILITY</span>
        </motion.div>
      </div>



      {/* Glassmorphism Content Card */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 xl:col-span-5"
            >
              <div className="relative p-7 sm:p-9 rounded-2xl glass-strong glow-red">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#dc2626]/[0.06] via-transparent to-[#2563eb]/[0.04] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]" />
                    </span>
                    <span className="font-mono text-[11px] tracking-wider uppercase text-white/50">
                      Full Stack Developer @ MorseBridge Ventures
                    </span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    I&apos;m a full stack
                    <br />
                    <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">developer</span>
                  </h2>

                  <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-8 max-w-md">
                    I build full-stack, AI-integrated web applications with clarity and purpose — scalable architecture, fluid experiences, intelligent workflows.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium text-sm shadow-lg shadow-[#dc2626]/25 hover:shadow-xl hover:shadow-[#dc2626]/30 transition-all duration-300 active:scale-[0.97]"
                    >
                      <span>Let&apos;s Work</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <a
                      href="#about"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass text-white/70 hover:text-white font-medium text-sm transition-all duration-300"
                    >
                      Explore Stack
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Right: Impact Statement */}
      <div className="absolute bottom-14 sm:bottom-16 right-6 md:right-12 lg:right-20 z-10 text-right">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white/70 tracking-tight leading-[1.15]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          that impacts
          <br />
          <span className="bg-gradient-to-r from-[#dc2626] to-[#2563eb] bg-clip-text text-transparent">experiences.</span>
        </motion.p>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-6 left-6 md:left-12 lg:left-20 z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-3 text-white/30 font-mono text-[10px] tracking-widest uppercase"
        >
          <span className="w-px h-6 bg-[#dc2626]/40" />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
