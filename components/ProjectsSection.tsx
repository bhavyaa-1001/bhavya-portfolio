"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence, type Transition } from "framer-motion";
import { projects, Project } from "@/data/projects";
import LayeredHeading from "./LayeredHeading";
import {
  FolderGit2,
  Sparkles,
  ArrowUpRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Maximize2,
} from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   ProjectCard — Compact, crisp, solid card for 3D cascading deck
   ════════════════════════════════════════════════════════════ */
function ProjectCard({
  project,
  isActive,
  onOpenModal,
}: {
  project: Project;
  isActive: boolean;
  onOpenModal: () => void;
}) {
  let domainName = "";
  try {
    if (project.liveUrl) domainName = new URL(project.liveUrl).hostname;
  } catch {
    domainName = project.liveUrl || "";
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-6 select-none bg-[#0c0c12] rounded-3xl">
      {/* ─── Top Header & Badges ─── */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span className="text-[10px] font-mono text-white/40 ml-2 hidden sm:inline">{domainName}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#dc2626]/15 text-[#dc2626] border border-[#dc2626]/30">
              {project.category}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* ─── Screenshot Window (Clickable) ─── */}
        {project.image && (
          <div
            onClick={onOpenModal}
            className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#07070a] shadow-xl group/preview mb-3.5 cursor-pointer"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/80">
              <Image
                src={project.image}
                alt={`${project.title} live interface preview`}
                fill
                className="object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 540px"
                priority={isActive}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                <span className="text-xs font-mono text-white/90 bg-black/75 backdrop-blur px-3 py-1 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#dc2626]" /> Click for Full Details
                </span>
                <span className="text-[10px] font-mono text-white/60 bg-black/60 px-2 py-0.5 rounded">
                  View Case Study
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Titles & Meta ─── */}
        <div className="mb-2">
          {project.client && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-blue-400 mb-0.5">
              <Briefcase className="w-3 h-3" />
              {project.client}
            </span>
          )}
          <h3
            className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug line-clamp-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>
          <p className="text-xs font-medium text-white/50 mt-0.5 font-mono line-clamp-1">{project.tagline}</p>
        </div>

        {/* ─── Concise Description ─── */}
        <p className="text-xs text-white/65 leading-relaxed line-clamp-2 mb-3">{project.description}</p>
      </div>

      {/* ─── Bottom Actions & Tags ─── */}
      <div>
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-white/60 border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-white/30">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-white/[0.08]">
          {/* View Full Details button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-mono text-xs border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#dc2626]" />
            <span>Full Details</span>
          </button>

          {/* Live Link Button */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium text-xs font-mono shadow-[0_0_16px_rgba(220,38,38,0.35)] hover:shadow-[0_0_24px_rgba(220,38,38,0.55)] transition-all duration-300"
            >
              <span>Live Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {/* GitHub Button */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl glass hover:bg-white/[0.08] text-white/70 hover:text-white transition-all duration-300"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ProjectDetailModal — Full screen detailed dialog view
   ════════════════════════════════════════════════════════════ */
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  let domainName = "";
  try {
    if (project.liveUrl) domainName = new URL(project.liveUrl).hostname;
  } catch {
    domainName = project.liveUrl || "";
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0c14] border border-white/[0.14] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(220,38,38,0.2)] p-6 sm:p-8 md:p-10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full glass hover:bg-white/[0.12] text-white/60 hover:text-white transition-all cursor-pointer z-20"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#dc2626]/15 text-[#dc2626] border border-[#dc2626]/30">
            {project.category}
          </span>
          {project.client && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              {project.client}
            </span>
          )}
          {project.featured && !project.client && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              FEATURED ARCHITECTURE
            </span>
          )}
          {project.year && (
            <span className="px-2.5 py-1 rounded-full text-xs font-mono text-white/40 bg-white/[0.04] border border-white/[0.06]">
              {project.year}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.statusBadge || "Live Production"}
          </span>
        </div>

        {/* Project Title & Tagline */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h2>
        <p className="text-sm sm:text-base font-mono text-[#dc2626] font-medium mb-6">
          {project.tagline}
        </p>

        {/* Large Screenshot Preview */}
        {project.image && (
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#07070a] shadow-2xl mb-8">
            <div className="h-9 bg-[#141418] px-4 flex items-center justify-between border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="text-[11px] font-mono text-white/40 ml-2">{domainName}</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">Verified Deployment</span>
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
          </div>
        )}

        {/* Full Comprehensive Description */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 font-semibold mb-3">
            System Overview & Architecture
          </h4>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Core Engineering Highlights (ALL Bullets) */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 font-semibold mb-3.5">
              Core Engineering Highlights
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-white/80 hover:border-white/15 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626] mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complete Technology Stack */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 font-semibold mb-3">
            Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.05] text-white/80 border border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/[0.08]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium text-sm font-mono shadow-[0_0_24px_rgba(220,38,38,0.4)] hover:shadow-[0_0_32px_rgba(220,38,38,0.6)] transition-all duration-300"
            >
              <span>{project.ctaText || "Launch Live Platform"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:bg-white/[0.08] text-white font-mono text-sm border border-white/10 hover:border-white/25 transition-all duration-300"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Code / Repository</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl glass hover:bg-white/[0.08] text-white/60 hover:text-white font-mono text-sm ml-auto cursor-pointer transition-colors"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Project Accent Mapping: Glow & border accent per project
   ════════════════════════════════════════════════════════════ */
function getProjectAccent(project?: Project | null) {
  if (!project) return { hex: "#dc2626", rgb: "220, 38, 38" };
  if (project.id === "morsebridge-ventures") {
    return { hex: "#dc2626", rgb: "220, 38, 38" };
  }
  if (project.id === "birdcast-studio") {
    return { hex: "#0ea5e9", rgb: "14, 165, 233" };
  }
  if (project.id === "insighthub-ai" || project.category.includes("AI")) {
    return { hex: "#8b5cf6", rgb: "139, 92, 246" };
  }
  return { hex: "#dc2626", rgb: "220, 38, 38" };
}

/* ════════════════════════════════════════════════════════════
   Main Projects Section — 3D Cascading Fanned Deck
   ════════════════════════════════════════════════════════════ */
export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const shouldReduceMotion = useReducedMotion();
  const filterCategories = ["All", "Full Stack", "AI / LLM", "Client Work", "Systems"];
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Transition & Animation states
  const [direction, setDirection] = useState<number>(1); // 1 = next (card exits left), -1 = prev (card exits right)
  const [exitingProject, setExitingProject] = useState<Project | null>(null);
  const [exitKey, setExitKey] = useState(0);

  // Hover & interaction states for automatic slide changing
  const [isHovered, setIsHovered] = useState(false);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((p) => {
          if (selectedFilter === "Client Work") return Boolean(p.client);
          if (selectedFilter === "Full Stack")
            return p.category.includes("Full Stack") || p.tags.includes("Node.js") || p.tags.includes("React 18") || p.tags.includes("Supabase");
          if (selectedFilter === "AI / LLM")
            return p.category.includes("AI") || p.tags.includes("RAG") || p.tags.includes("Gemini Embeddings");
          if (selectedFilter === "Systems")
            return p.tags.includes("Docker Compose") || p.tags.includes("Redis") || p.tags.includes("PostgreSQL") || p.tags.includes("Supabase");
          return p.category.toLowerCase().includes(selectedFilter.toLowerCase());
        });

  const count = filteredProjects.length;
  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];
  const activeAccent = getProjectAccent(activeProject);

  const liveCount = projects.filter((p) => p.liveUrl).length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset index when filter changes
  useEffect(() => {
    setActiveIndex(0);
    setExitingProject(null);
  }, [selectedFilter]);

  // Pause auto-sliding briefly on user interaction and resume after 3.5s
  const pauseAutoplayBriefly = useCallback(() => {
    isUserInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 3500);
  }, []);

  const goToPrev = useCallback(() => {
    if (count <= 1) return;
    setDirection(-1);
    setExitingProject(filteredProjects[activeIndex]);
    setExitKey((k) => k + 1);
    setActiveIndex((prev) => (prev - 1 + count) % count);
    pauseAutoplayBriefly();
  }, [count, activeIndex, filteredProjects, pauseAutoplayBriefly]);

  const goToNext = useCallback(() => {
    if (count <= 1) return;
    setDirection(1);
    setExitingProject(filteredProjects[activeIndex]);
    setExitKey((k) => k + 1);
    setActiveIndex((prev) => (prev + 1) % count);
    pauseAutoplayBriefly();
  }, [count, activeIndex, filteredProjects, pauseAutoplayBriefly]);

  const handleJumpTo = useCallback(
    (targetIdx: number) => {
      if (targetIdx === activeIndex || targetIdx < 0 || targetIdx >= count) return;
      const diff = (targetIdx - activeIndex + count) % count;
      const dir = diff <= count / 2 ? 1 : -1;
      setDirection(dir);
      setExitingProject(filteredProjects[activeIndex]);
      setExitKey((k) => k + 1);
      setActiveIndex(targetIdx);
      pauseAutoplayBriefly();
    },
    [activeIndex, count, filteredProjects, pauseAutoplayBriefly]
  );

  // Automatically advance every 5 seconds (pauses on hover and during manual interaction)
  useEffect(() => {
    if (shouldReduceMotion || modalProject !== null || count <= 1) {
      return;
    }

    const timer = setInterval(() => {
      if (isHovered || isUserInteractingRef.current) {
        return;
      }
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, modalProject, count, isHovered, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) return;
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, modalProject]);

  // Layered Slot Styles (Front, 2nd, 3rd with distinct depth falloff & tilt)
  const getSlotStyles = (slot: number) => {
    const stepX = isMobile ? 32 : 80;
    const stepY = isMobile ? -16 : -28;

    if (slot === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotateZ: 0,
        rotateY: -4,
        rotateX: 2,
        filter: "blur(0px) saturate(100%)",
        zIndex: 30,
      };
    }
    if (slot === 1) {
      return {
        x: stepX,
        y: stepY,
        scale: 0.95,
        opacity: 0.6,
        rotateZ: 2,
        rotateY: -4,
        rotateX: 2,
        filter: "blur(2.5px) saturate(85%)",
        zIndex: 20,
      };
    }
    if (slot === 2) {
      return {
        x: stepX * 2,
        y: stepY * 2,
        scale: 0.9,
        opacity: 0.35,
        rotateZ: -3,
        rotateY: -4,
        rotateX: 2,
        filter: "blur(5px) saturate(50%)",
        zIndex: 10,
      };
    }
    return {
      x: stepX * 2 + 40,
      y: stepY * 2 - 16,
      scale: 0.85,
      opacity: 0,
      rotateZ: -4,
      rotateY: -4,
      rotateX: 2,
      filter: "blur(6px) saturate(40%)",
      zIndex: 0,
    };
  };

  const springTransition: Transition = shouldReduceMotion
    ? { duration: 0.25, ease: "easeInOut" }
    : {
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 0.85,
      };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glowing backdrop lights */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#dc2626]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] rounded-full bg-[#f59e0b]/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <LayeredHeading subtitle="Featured Work" title="Featured Projects" watermark="PROJECTS" />

        {/* ─── Filter Bar ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 md:mt-12 mb-10 pb-4 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  selectedFilter === filter
                    ? "bg-[#dc2626] text-white font-semibold shadow-[0_0_12px_rgba(220,38,38,0.3)]"
                    : "glass text-white/40 hover:text-white/70"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {liveCount} Live Deployments
            </span>
            <span className="font-mono text-xs text-white/30 hidden sm:inline">{projects.length} Published</span>
          </div>
        </div>

        {/* ─── Empty State ─── */}
        {count === 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl glass-strong p-8 sm:p-12 text-center glow-red my-12"
          >
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-[#dc2626] mb-4 shadow-[0_0_20px_rgba(220,38,38,0.15)] mx-auto">
              <FolderGit2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">No projects found</h3>
            <p className="text-white/40 text-xs">Try another filter category.</p>
          </motion.div>
        )}

        {/* ═══════════════ 3D CASCADING FANNED DECK ═══════════════ */}
        {count > 0 && (
          <div className="relative w-full my-6">
            {/* 3D Perspective Stage */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative mx-auto flex items-center justify-center pt-8 pb-16 min-h-[580px] sm:min-h-[640px]"
              style={{
                perspective: "1400px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Soft Ambient Glow beneath front card that shifts color based on active project */}
              <motion.div
                animate={{
                  backgroundColor: `rgba(${activeAccent.rgb}, 0.22)`,
                  boxShadow: `0 30px 80px 25px rgba(${activeAccent.rgb}, 0.35)`,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-[480px] h-20 rounded-full blur-3xl pointer-events-none -z-10"
              />

              {/* Cards Container with Smooth Re-Stacking on Filter Switch */}
              <motion.div
                key={selectedFilter}
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -14 }}
                transition={springTransition}
                className="relative w-[340px] sm:w-[420px] lg:w-[480px] h-[520px] sm:h-[580px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ── Exiting Front Card (slides out matching arrow direction) ── */}
                <AnimatePresence>
                  {exitingProject && (
                    <motion.div
                      key={`exiting-${exitingProject.id}-${exitKey}`}
                      initial={{
                        x: 0,
                        y: 0,
                        rotateZ: 0,
                        rotateY: -4,
                        rotateX: 2,
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px) saturate(100%)",
                      }}
                      animate={{
                        x: direction === 1 ? (isMobile ? -280 : -380) : isMobile ? 280 : 380,
                        y: 16,
                        rotateZ: direction === 1 ? -12 : 12,
                        scale: 0.88,
                        opacity: 0,
                        filter: "blur(3px) saturate(80%)",
                      }}
                      exit={{ opacity: 0 }}
                      transition={springTransition}
                      onAnimationComplete={() => {
                        setExitingProject(null);
                      }}
                      className="absolute inset-0 rounded-3xl overflow-hidden bg-[#0c0c12] border border-white/[0.14] pointer-events-none shadow-[20px_25px_50px_-10px_rgba(0,0,0,0.95)]"
                      style={{
                        zIndex: 40,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <ProjectCard
                        project={exitingProject}
                        isActive={true}
                        onOpenModal={() => {}}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Stacked Deck Cards ── */}
                {filteredProjects.map((project, idx) => {
                  const slot = (idx - activeIndex + count) % count;
                  const isActive = slot === 0;
                  const slotStyle = getSlotStyles(slot);

                  // Keep up to 3 slots visible, plus off-screen staging slot for smooth entrance
                  if (slot > 3) return null;

                  return (
                    <motion.div
                      key={project.id}
                      animate={{
                        x: slotStyle.x,
                        y: slotStyle.y,
                        scale: slotStyle.scale,
                        opacity: slotStyle.opacity,
                        rotateZ: slotStyle.rotateZ,
                        rotateY: slotStyle.rotateY,
                        rotateX: slotStyle.rotateX,
                        filter: slotStyle.filter,
                      }}
                      whileHover={
                        !isActive
                          ? {
                              y: slotStyle.y - 12,
                              x: slotStyle.x + 8,
                              scale: slotStyle.scale * 1.025,
                              opacity: Math.min(slotStyle.opacity + 0.25, 0.95),
                              filter: "blur(0px) saturate(100%)",
                              transition: { duration: 0.2 },
                            }
                          : undefined
                      }
                      transition={springTransition}
                      drag={isActive ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.35}
                      onDragStart={() => {
                        isDraggingRef.current = true;
                      }}
                      onDragEnd={(e, info) => {
                        setTimeout(() => {
                          isDraggingRef.current = false;
                        }, 120);

                        const threshold = 50;
                        const velocityThreshold = 250;
                        if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
                          goToNext();
                        } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
                          goToPrev();
                        }
                      }}
                      onClick={() => {
                        if (isDraggingRef.current) return;
                        if (!isActive) {
                          handleJumpTo(idx);
                        } else {
                          setModalProject(project);
                        }
                      }}
                      className={`absolute inset-0 rounded-3xl overflow-hidden transition-colors duration-300 ${
                        isActive
                          ? "bg-[#0c0c12] border border-white/[0.14] cursor-grab active:cursor-grabbing shadow-[20px_25px_50px_-10px_rgba(0,0,0,0.95)]"
                          : "bg-[#0a0a0f] border border-white/[0.08] cursor-pointer hover:border-white/30 shadow-[20px_25px_40px_-10px_rgba(0,0,0,0.85)]"
                      }`}
                      style={{
                        zIndex: slotStyle.zIndex,
                        transformStyle: "preserve-3d",
                        pointerEvents: slot <= 2 ? "auto" : "none",
                        boxShadow: isActive
                          ? `20px 25px 50px -10px rgba(0,0,0,0.95), 0 0 35px rgba(${activeAccent.rgb}, 0.25)`
                          : "20px 25px 40px -10px rgba(0,0,0,0.85)",
                      }}
                    >
                      {/* Active Front Card Top Accent Glow matching project identity */}
                      {isActive && (
                        <motion.div
                          animate={{
                            background: `linear-gradient(90deg, transparent, ${activeAccent.hex}, transparent)`,
                          }}
                          transition={{ duration: 0.5 }}
                          className="absolute top-0 left-0 right-0 h-[2px] z-10 pointer-events-none"
                        />
                      )}

                      <ProjectCard
                        project={project}
                        isActive={isActive}
                        onOpenModal={() => setModalProject(project)}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* ─── Deck Controls: Prev, Autoplay Toggle, Next + Progress Bar ─── */}
              <div className="absolute right-0 sm:right-6 lg:right-12 bottom-0 z-40 flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-strong border border-white/10 shadow-2xl backdrop-blur-xl">
                  {/* Previous Button */}
                  <button
                    onClick={goToPrev}
                    className="p-3 rounded-xl glass hover:bg-white/[0.12] text-white/70 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 active:scale-95 shadow-md cursor-pointer"
                    aria-label="Previous project"
                    title="Previous project (Left arrow)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    className="group relative flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-[#dc2626] to-[#b91c1c] text-white shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Next project"
                    title="Next project (Right arrow)"
                  >
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ─── Bottom Project Navigation Tabs & Counter ─── */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
              {/* Project title pills */}
              <div className="flex flex-wrap items-center gap-2">
                {filteredProjects.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => handleJumpTo(i)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                      i === activeIndex
                        ? "bg-white/[0.1] text-white border border-[#dc2626]/40 shadow-[0_0_12px_rgba(220,38,38,0.2)]"
                        : "glass text-white/40 hover:text-white/70"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        i === activeIndex ? "bg-[#dc2626] animate-pulse" : "bg-white/20"
                      }`}
                    />
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">{p.title.split("—")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Counter & Hint */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-white/35 hidden md:inline">
                  Drag / Swipe or click back cards to skip
                </span>
                <span className="font-mono text-xs text-white/30 glass px-3 py-1 rounded-lg">
                  <span className="text-white font-bold">{activeIndex + 1}</span>
                  <span className="mx-1">/</span>
                  <span>{count}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════ FULL PROJECT DETAILS MODAL ═══════════════ */}
      <AnimatePresence>
        {modalProject && (
          <ProjectDetailModal
            project={modalProject}
            onClose={() => setModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
