"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { skillCategories, allSkillsFlat, SkillCategory } from "@/data/skills";
import LayeredHeading from "./LayeredHeading";
import {
  Terminal,
  Layers,
  Cpu,
  Database,
  Brain,
  Wrench,
  GraduationCap,
  Radar,
  LayoutGrid,
  Orbit,
  Maximize2,
  X,
  Sparkles,
  MoveHorizontal,
} from "lucide-react";

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Responsive & Motion states
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"orbit" | "grid">("orbit");

  // 3D Orbit States
  const [ringRotation, setRingRotation] = useState(0);
  const ringRotationRef = useRef(0);
  const ringRotationObj = useRef({ angle: 0 });
  const isAutoRotatingRef = useRef(true);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  // Pointer Drag states
  const isDraggingRef = useRef(false);
  const isDragMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detail modal state
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  const ORBIT_RADIUS = 350; // 3D cylinder radius in px

  // Grid Dimensions
  const GRID_CARD_WIDTH = 365;
  const GRID_CARD_HEIGHT = 248;
  const GAP_X = 32;
  const GAP_Y = 28;

  const categoryNotes: Record<string, string> = {
    languages:
      "Core programmatic toolset used for data structures, algorithmic optimization, type safety, and systems programming across scalable web applications.",
    frontend:
      "Design systems, responsive interfaces, micro-animations, component encapsulation, and high-performance client rendering pipelines.",
    backend:
      "Event-driven I/O architectures, RESTful API endpoints, token authentication, robust error handling, and server middleware services.",
    databases:
      "Relational schema structures, ACID transactions, NoSQL collections, vector search indexing, and real-time database sync.",
    "ai & genai":
      "Production LLM integration, agentic function calling, tool use, prompt chaining, and autonomous reasoning workflows.",
    "tools & devops":
      "Containerization, automated build workflows, edge hosting on Cloudflare, semantic versioning, and developer productivity tools.",
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      languages: <Terminal className="w-4 h-4 text-[#dc2626]" />,
      frontend: <Layers className="w-4 h-4 text-[#dc2626]" />,
      backend: <Cpu className="w-4 h-4 text-[#2563eb]" />,
      databases: <Database className="w-4 h-4 text-[#2563eb]" />,
      "ai & genai": <Brain className="w-4 h-4 text-[#dc2626]" />,
      "tools & devops": <Wrench className="w-4 h-4 text-[#2563eb]" />,
    };
    return icons[category.toLowerCase()] ?? <Terminal className="w-4 h-4 text-[#dc2626]" />;
  };

  // Mobile breakpoint check (< 768px)
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Keyboard escape listener for modal / focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedCategory) setSelectedCategory(null);
        if (focusedCardIndex !== null) setFocusedCardIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCategory, focusedCardIndex]);

  // ──────────────────────────────────────────────────────────
  // Continuous 60fps auto-rotation (~24s per revolution)
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile || shouldReduceMotion || viewMode !== "orbit") return;

    let animId: number;
    let lastTime = performance.now();
    // 360deg / 24s = 15 deg per second
    const speed = 360 / 24;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (
        isAutoRotatingRef.current &&
        hoveredCardIndex === null &&
        focusedCardIndex === null &&
        !isDraggingRef.current
      ) {
        const nextAngle = (ringRotationRef.current + speed * dt) % 360;
        ringRotationRef.current = nextAngle;
        ringRotationObj.current.angle = nextAngle;
        setRingRotation(nextAngle);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isMobile, shouldReduceMotion, viewMode, hoveredCardIndex, focusedCardIndex]);

  // ──────────────────────────────────────────────────────────
  // Mouse / Pointer Drag Support (Horizontal rotation mapping)
  // ──────────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode !== "orbit" || focusedCardIndex !== null) return;
    isDraggingRef.current = true;
    isDragMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = ringRotationRef.current;
    isAutoRotatingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 4) {
      isDragMovedRef.current = true;
    }
    const newAngle = dragStartAngleRef.current + deltaX * 0.35;
    ringRotationRef.current = newAngle;
    ringRotationObj.current.angle = newAngle;
    setRingRotation(newAngle);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (focusedCardIndex === null) {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isAutoRotatingRef.current = true;
      }, 2000);
    }
  };

  // ──────────────────────────────────────────────────────────
  // Click-to-Front & Focus Logic
  // ──────────────────────────────────────────────────────────
  const handleCardClick = (index: number) => {
    if (isDragMovedRef.current) return;

    if (viewMode === "grid") {
      setSelectedCategory(skillCategories[index]);
      return;
    }

    if (focusedCardIndex === index) {
      setSelectedCategory(skillCategories[index]);
      return;
    }

    // Target ring angle to bring card 'index' to front (world angle = 0deg)
    const targetAngle = - (index * 60);
    const currentAngle = ringRotationRef.current;
    // Shortest rotational path
    const diff = ((((targetAngle - currentAngle) % 360) + 540) % 360) - 180;
    const newAngle = currentAngle + diff;

    // Pause auto-rotation
    isAutoRotatingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    gsap.to(ringRotationObj.current, {
      angle: newAngle,
      duration: 0.85,
      ease: "power2.out",
      onUpdate: () => {
        ringRotationRef.current = ringRotationObj.current.angle;
        setRingRotation(ringRotationObj.current.angle);
      },
      onComplete: () => {
        setFocusedCardIndex(index);
      },
    });
  };

  // Active front card calculation for Tech Radar hub
  const frontIndex = Math.round(((-ringRotation / 60) % 6 + 6) % 6);
  const activeFrontCategory = skillCategories[frontIndex]?.category || "Languages";

  // Pre-compute 3x2 Grid Coordinates (symmetrical across 0, 0)
  const cardGridPositions = skillCategories.map((_, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const colCenter = (col - 1) * (GRID_CARD_WIDTH + GAP_X);
    const rowCenter = (row === 0 ? -1 : 1) * ((GRID_CARD_HEIGHT + GAP_Y) / 2);
    return {
      x: colCenter - GRID_CARD_WIDTH / 2,
      y: rowCenter - GRID_CARD_HEIGHT / 2,
    };
  });

  return (
    <section id="about" className="relative py-14 md:py-18 overflow-hidden">
      {/* Subtle web-pattern overlay */}
      <div className="absolute inset-0 web-pattern pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
        <LayeredHeading
          subtitle="Background & Capabilities"
          title="About & Technical Arsenal"
          watermark="ABOUT"
        />

        {/* ═══════════════ Bio & Principles Grid ═══════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8 md:mt-12 mb-12">
          {/* Main Editorial Statement */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p
              className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 leading-relaxed tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A Computer Science Engineer crafting at the intersection of{" "}
              <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                robust full-stack architecture
              </span>{" "}
              and intelligent, autonomous AI systems.
            </p>

            <div className="space-y-4 text-base md:text-lg text-white/45 leading-relaxed">
              <p>
                Currently pursuing my B.Tech in Computer Science & Engineering at{" "}
                <strong className="text-white font-semibold">MAIT (&apos;28)</strong>, I engineer high-throughput web applications with clean abstractions, uncompromising performance, and intuitive user experiences.
              </p>
              <p>
                Beyond standard CRUD systems, my focus is bridging the gap between raw research models and production software — integrating Large Language Models, specialized AI agents, and edge infrastructure to deliver applications that think, adapt, and scale reliably.
              </p>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              {[
                { label: "Institution", value: "MAIT CSE '28", icon: <GraduationCap className="w-4 h-4 text-[#dc2626]" /> },
                { label: "Current Focus", value: "Full Stack & AI Agents" },
                { label: "Industry Role", value: "MorseBridge Ventures" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300"
                >
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    {item.icon}
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Principles Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl glass-strong glow-red animate-float">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#dc2626]/[0.04] via-transparent to-[#2563eb]/[0.03] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/40">CORE PRINCIPLES</span>
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                </div>
                {[
                  { id: "speed", title: "Speed & Edge Delivery", desc: "Sub-second load times via smart caching, edge compute (Cloudflare), and lightweight frameworks.", color: "text-[#dc2626]" },
                  { id: "ai", title: "Production-Grade AI", desc: "Deploying LLM chains, agentic tool-use, and prompt engineering grounded in real business workflows.", color: "text-[#2563eb]" },
                  { id: "arch", title: "Modular Architecture", desc: "Strict type safety, reusable design tokens, and maintainable micro-components.", color: "text-[#dc2626]" },
                ].map((principle) => (
                  <div key={principle.id} className="mb-5 last:mb-0">
                    <h4 className={`font-mono text-xs uppercase tracking-wider mb-1 ${principle.color}`}>{principle.title}</h4>
                    <p className="text-sm text-white/40">{principle.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════ Infinite Scrolling Ticker ═══════════════ */}
        <div className="relative py-4 my-6 border-y border-white/[0.06] overflow-hidden">
          <div className="flex w-max gap-8 animate-marquee">
            {[...allSkillsFlat, ...allSkillsFlat].map((skill, index) => (
              <span key={`${skill}-${index}`} className="inline-flex items-center gap-3 text-sm md:text-base font-mono uppercase tracking-widest text-white/25 hover:text-[#dc2626] transition-colors">
                <span>{skill}</span>
                <span className="text-[#dc2626]/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════════ Categorized Stack ═══════════════ */}
        <div className="mt-8 pt-2" ref={skillsSectionRef}>
          {/* Header with Title & Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-2 border-b border-white/[0.06]">
            <div>
              <span className="font-mono text-xs text-[#dc2626] uppercase tracking-widest block mb-1">Interactive Arsenal</span>
              <h3
                className="text-2xl md:text-3xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Categorized Stack
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Interactive View Mode Switcher: visible on desktop/tablet (>= 768px) */}
              {!isMobile && !shouldReduceMotion && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl glass border border-white/10">
                  <button
                    onClick={() => {
                      setFocusedCardIndex(null);
                      setViewMode("orbit");
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                      viewMode === "orbit"
                        ? "bg-[#dc2626] text-white font-semibold shadow-[0_0_16px_rgba(220,38,38,0.45)]"
                        : "text-white/45 hover:text-white"
                    }`}
                  >
                    <Orbit className="w-3.5 h-3.5" />
                    <span>Orbit View</span>
                  </button>
                  <button
                    onClick={() => {
                      setFocusedCardIndex(null);
                      setViewMode("grid");
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-[#dc2626] text-white font-semibold shadow-[0_0_16px_rgba(220,38,38,0.45)]"
                        : "text-white/45 hover:text-white"
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid View</span>
                  </button>
                </div>
              )}

              <span className="font-mono text-xs text-white/30 uppercase tracking-wider hidden sm:inline">
                {allSkillsFlat.length} Competencies
              </span>
            </div>
          </div>

          {/* Drag & Rotation Hint for Orbit View */}
          {!isMobile && !shouldReduceMotion && viewMode === "orbit" && (
            <div className="flex items-center justify-center gap-2 text-white/30 font-mono text-[11px] mb-2 pointer-events-none">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#dc2626]/70 animate-pulse" />
              <span>Drag to rotate in 3D • Click any card to focus</span>
            </div>
          )}

          {/* ── Desktop/Tablet Stage: True 3D Orbit ⟷ Symmetrical Grid ── */}
          {!isMobile && !shouldReduceMotion ? (
            <div
              ref={stageContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onClick={() => {
                if (focusedCardIndex !== null) {
                  setFocusedCardIndex(null);
                  if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
                  resumeTimeoutRef.current = setTimeout(() => {
                    isAutoRotatingRef.current = true;
                  }, 1500);
                }
              }}
              className={`relative w-full flex items-center justify-center ${
                viewMode === "orbit"
                  ? "min-h-[480px] md:min-h-[500px] py-2 cursor-grab active:cursor-grabbing"
                  : "min-h-[560px] md:min-h-[580px] py-4"
              } select-none`}
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Central Sci-Fi Tech Radar Hub (visible in Orbit View) */}
              <motion.div
                animate={{
                  opacity: viewMode === "orbit" ? 1 : 0,
                  scale: viewMode === "orbit" ? 1 : 0.5,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-0"
                style={{ transform: "translateZ(0px)" }}
              >
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Outer Dashed Orbit Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#dc2626]/30 animate-spin-slow" />
                  {/* Middle Pulse Ring */}
                  <div className="absolute inset-3 rounded-full border border-white/[0.07] animate-pulse" />
                  {/* Rotating Conic-Gradient Sci-Fi Radar Sweep */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(220, 38, 38, 0.45) 0deg, rgba(220, 38, 38, 0.08) 40deg, transparent 75deg)",
                    }}
                  />
                  {/* Thin Rotating SVG Sweep Line with Glowing Tip */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-t from-transparent via-[#dc2626]/70 to-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#dc2626] shadow-[0_0_10px_rgba(220,38,38,1)]" />
                  </motion.div>
                  {/* Glowing Center Beacon Core */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1012] via-[#0d0d12] to-[#12121e] border border-[#dc2626]/40 flex items-center justify-center shadow-[0_0_24px_rgba(220,38,38,0.35)]">
                    <Radar className="w-7 h-7 text-[#dc2626] animate-pulse" />
                  </div>
                </div>
                {/* HUD Readout */}
                <div className="text-center mt-3 pointer-events-none">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 block font-bold">
                    TECH RADAR
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#dc2626] block mt-0.5">
                    ACTIVE: {activeFrontCategory}
                  </span>
                </div>
              </motion.div>

              {/* ── 3D Orbit Ring Stage ── */}
              {viewMode === "orbit" ? (
                <div
                  ref={ringRef}
                  className="relative w-0 h-0 flex items-center justify-center"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${ringRotation}deg)`,
                  }}
                >
                  {skillCategories.map((group, i) => {
                    const worldAngleDeg = (ringRotation + i * 60) % 360;
                    const worldAngleRad = (worldAngleDeg * Math.PI) / 180;
                    const depth = (Math.cos(worldAngleRad) + 1) / 2; // 0 (back) to 1 (front)

                    const isFocused = focusedCardIndex === i;
                    const isOtherFocused = focusedCardIndex !== null && !isFocused;
                    const isHovered = hoveredCardIndex === i;
                    const isOtherHovered =
                      hoveredCardIndex !== null && !isHovered && focusedCardIndex === null;

                    const cardScale = isFocused
                      ? 1.15
                      : isOtherFocused
                      ? 0.72
                      : isHovered
                      ? 1.12
                      : isOtherHovered
                      ? 0.86
                      : 0.85 + 0.22 * depth;

                    const cardOpacity = isFocused
                      ? 1.0
                      : isOtherFocused
                      ? 0.2
                      : isHovered
                      ? 1.0
                      : isOtherHovered
                      ? 0.45
                      : 0.55 + 0.45 * depth;

                    const zIndex = isFocused
                      ? 100
                      : isHovered
                      ? 60
                      : Math.round(depth * 30) + 10;

                    return (
                      <div
                        key={group.category}
                        className="absolute top-0 left-0"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: `rotateY(${i * 60}deg) translateZ(${ORBIT_RADIUS}px)`,
                          zIndex,
                        }}
                      >
                        {/* Counter-rotation: keeps card face perpendicular to camera at all times */}
                        <div
                          style={{
                            transformStyle: "preserve-3d",
                            transform: `rotateY(${-(i * 60 + ringRotation)}deg)`,
                          }}
                        >
                          <motion.div
                            layoutId={`stack-card-${group.category}`}
                            animate={{
                              scale: cardScale,
                              opacity: cardOpacity,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 24,
                            }}
                            onMouseEnter={() => {
                              if (!isDraggingRef.current && focusedCardIndex === null) {
                                isAutoRotatingRef.current = false;
                                setHoveredCardIndex(i);
                              }
                            }}
                            onMouseLeave={() => {
                              if (!isDraggingRef.current && focusedCardIndex === null) {
                                setHoveredCardIndex(null);
                                isAutoRotatingRef.current = true;
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(i);
                            }}
                            className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                              isFocused
                                ? "w-[460px] sm:w-[500px] p-6 sm:p-7 bg-[#0f0f18] border-[#dc2626]/70 shadow-[0_0_50px_rgba(220,38,38,0.45)] cursor-default"
                                : isHovered
                                ? "w-[330px] sm:w-[345px] p-5 sm:p-5.5 bg-[#0e0e16] border-[#dc2626]/50 shadow-[0_0_35px_rgba(220,38,38,0.3)] cursor-pointer"
                                : "w-[330px] sm:w-[345px] p-5 sm:p-5.5 bg-[#0c0c12] border-white/[0.1] shadow-[0_15px_35px_rgba(0,0,0,0.8)] cursor-pointer"
                            }`}
                            style={{
                              position: "absolute",
                              top: isFocused ? -170 : -115,
                              left: isFocused ? -240 : -172,
                              filter:
                                hoveredCardIndex === i
                                  ? "brightness(1.2)"
                                  : hoveredCardIndex !== null
                                  ? "brightness(0.6)"
                                  : `brightness(${0.7 + 0.35 * depth})`,
                            }}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2.5 rounded-xl glass shadow-[0_0_12px_rgba(220,38,38,0.2)]">
                                    {getCategoryIcon(group.category)}
                                  </div>
                                  <div>
                                    <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                                      {group.category}
                                    </h4>
                                    <span className="font-mono text-[10px] text-white/35 uppercase tracking-wider block">
                                      {group.items.length} Technologies
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {isFocused ? (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setFocusedCardIndex(null);
                                        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
                                        resumeTimeoutRef.current = setTimeout(() => {
                                          isAutoRotatingRef.current = true;
                                        }, 1500);
                                      }}
                                      className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
                                      aria-label="Close focused view"
                                    >
                                      <X className="w-4 h-4 text-[#dc2626]" />
                                    </button>
                                  ) : (
                                    <>
                                      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                                        0{i + 1}
                                      </span>
                                      <span
                                        title="Click to focus node in front"
                                        className="p-1 rounded-md text-white/20 group-hover:text-white/80 transition-colors"
                                      >
                                        <Maximize2 className="w-3.5 h-3.5" />
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs sm:text-[13px] text-white/65 leading-relaxed mb-3">
                                {group.description}
                              </p>
                              {/* Architecture Context in Focused State */}
                              {isFocused && (
                                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-3.5">
                                  <span className="font-mono text-[10px] text-[#dc2626] uppercase tracking-wider block font-semibold mb-1">
                                    Engineering Application
                                  </span>
                                  <p className="text-xs text-white/70 leading-relaxed">
                                    {categoryNotes[group.category.toLowerCase()] ||
                                      "Production-grade software engineering, rigorous testing, and high-performance deployment."}
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                              {group.items.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white/[0.04] text-white/80 border border-white/[0.06] hover:border-[#dc2626]/50 hover:text-[#dc2626] transition-colors"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* ── 3x2 Grid Stage (FLIP-Interpolated with Orbit Cards) ── */
                <div className="relative w-0 h-0 flex items-center justify-center">
                  {skillCategories.map((group, i) => {
                    const pos = cardGridPositions[i];
                    return (
                      <motion.div
                        key={group.category}
                        layoutId={`stack-card-${group.category}`}
                        animate={{
                          x: pos.x,
                          y: pos.y,
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 190,
                          damping: 24,
                          mass: 0.9,
                        }}
                        whileHover={{
                          scale: 1.03,
                          y: pos.y - 6,
                          transition: { duration: 0.2 },
                        }}
                        onClick={() => setSelectedCategory(group)}
                        className="group p-5 sm:p-6 rounded-2xl bg-[#0d0d14] border border-white/[0.1] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-[#dc2626]/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] transition-colors duration-300 flex flex-col justify-between cursor-pointer"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: GRID_CARD_WIDTH,
                          height: GRID_CARD_HEIGHT,
                          zIndex: 10,
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2.5 rounded-xl glass group-hover:shadow-[0_0_12px_rgba(220,38,38,0.2)] transition-shadow">
                                {getCategoryIcon(group.category)}
                              </div>
                              <div>
                                <h4 className="text-base font-extrabold text-white tracking-wide">
                                  {group.category}
                                </h4>
                                <span className="font-mono text-[10px] text-white/35 uppercase tracking-wider block">
                                  {group.items.length} Techs
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                                0{i + 1}
                              </span>
                              <span
                                title="Click for full category details"
                                className="p-1 rounded-md text-white/20 group-hover:text-white/80 group-hover:bg-white/[0.06] transition-colors"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-[13px] text-white/55 leading-relaxed mb-3.5">
                            {group.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                          {group.items.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white/[0.04] text-white/80 border border-white/[0.06] group-hover:border-white/[0.15] hover:border-[#dc2626]/50 hover:text-[#dc2626] transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* ── Mobile View (< 768px): Clean Static Responsive Grid ── */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((group, groupIdx) => (
                <motion.div
                  key={group.category}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: groupIdx * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setSelectedCategory(group)}
                  className="group p-6 rounded-2xl bg-[#0d0d14] border border-white/[0.1] hover:border-[#dc2626]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 rounded-xl glass group-hover:shadow-[0_0_12px_rgba(220,38,38,0.15)] transition-shadow">
                          {getCategoryIcon(group.category)}
                        </div>
                        <h4 className="text-base font-extrabold text-white">{group.category}</h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                          0{groupIdx + 1}
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-[13px] text-white/55 leading-relaxed mb-4">{group.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] text-white/80 border border-white/[0.06] hover:border-[#dc2626]/40 hover:text-[#dc2626] transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════ Category Detail Modal ═══════════════ */}
      <AnimatePresence>
        {selectedCategory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-8 rounded-3xl bg-[#0e0e16] border border-white/[0.15] shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl glass shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                    {getCategoryIcon(selectedCategory.category)}
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[#dc2626] uppercase tracking-wider block font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#dc2626]" />
                      Skill Category Details
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {selectedCategory.category}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {selectedCategory.description}
              </p>

              {/* Architecture Context */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-semibold">
                  Engineering Context & Production Use
                </span>
                <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed">
                  {categoryNotes[selectedCategory.category.toLowerCase()] ||
                    "Production-ready technologies deployed across web, backend, and intelligent agent systems."}
                </p>
              </div>

              {/* Complete Skills Pill Grid */}
              <div>
                <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest block mb-3">
                  All Competencies ({selectedCategory.items.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/[0.05] text-white/90 border border-white/[0.1] hover:border-[#dc2626]/50 hover:text-[#dc2626] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
