"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import LayeredHeading from "./LayeredHeading";
import { FolderGit2, Sparkles, ArrowUpRight, Briefcase } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const shouldReduceMotion = useReducedMotion();
  const filterCategories = ["All", "Full Stack", "AI / LLM", "Client Work", "Systems"];

  const filteredProjects = selectedFilter === "All"
    ? projects
    : projects.filter(p => {
        if (selectedFilter === "Client Work") return Boolean(p.client);
        if (selectedFilter === "Full Stack") return p.category.includes("Full Stack") || p.tags.includes("Node.js") || p.tags.includes("React 18") || p.tags.includes("Supabase");
        if (selectedFilter === "AI / LLM") return p.category.includes("AI") || p.tags.includes("RAG") || p.tags.includes("Gemini Embeddings");
        if (selectedFilter === "Systems") return p.tags.includes("Docker Compose") || p.tags.includes("Redis") || p.tags.includes("PostgreSQL") || p.tags.includes("Supabase");
        return p.category.toLowerCase().includes(selectedFilter.toLowerCase());
      });

  const hasProjects = projects.length > 0;
  const liveCount = projects.filter(p => p.liveUrl).length;

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#dc2626]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] rounded-full bg-[#2563eb]/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <LayeredHeading subtitle="Featured Work" title="Featured Projects" watermark="PROJECTS" />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-10 md:mt-14 mb-10 pb-4 border-b border-white/[0.06]">
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

        {/* Empty Placeholder State */}
        {!hasProjects && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl glass-strong p-8 sm:p-12 lg:p-16 text-center glow-red"
          >
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-[#dc2626] mb-6 shadow-[0_0_20px_rgba(220,38,38,0.15)] mx-auto">
              <FolderGit2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-white/40 text-sm">Check back soon for new projects.</p>
          </motion.div>
        )}

        {/* Projects Showcase */}
        {hasProjects && (
          <div className="space-y-12 md:space-y-16">
            {filteredProjects.map((project, idx) => {
              // Extract clean domain for mock browser window
              let domainName = "";
              try {
                if (project.liveUrl) {
                  domainName = new URL(project.liveUrl).hostname;
                }
              } catch {
                domainName = project.liveUrl || "";
              }

              return (
                <motion.div
                  key={project.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative rounded-3xl glass-strong border border-white/[0.08] hover:border-[#dc2626]/30 transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  {/* Top decorative gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc2626]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
                    {/* Left Column: Interactive Screenshot & Mock Window */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Meta badges row */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#dc2626]/15 text-[#dc2626] border border-[#dc2626]/30">
                            {project.category}
                          </span>
                          {project.client && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                              <Briefcase className="w-3 h-3 text-blue-400" />
                              CLIENT WORK · {project.client}
                            </span>
                          )}
                          {project.featured && !project.client && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              FEATURED ARCHITECTURE
                            </span>
                          )}
                          {project.year && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-mono text-white/40 bg-white/[0.04] border border-white/[0.06]">
                              {project.year}
                            </span>
                          )}
                        </div>

                        {/* Mock Browser Container for Screenshot */}
                        {project.image && (
                          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0c0c0e] shadow-2xl group/preview">
                            {/* Window Title Bar */}
                            <div className="h-9 bg-[#141418] px-4 flex items-center justify-between border-b border-white/[0.06] z-10 relative">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                                <span className="text-[11px] font-mono text-white/40 ml-2 hidden sm:inline">{domainName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  {project.statusBadge || "Live Production"}
                                </span>
                              </div>
                            </div>

                            {/* Image preview with zoom */}
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block relative aspect-[16/9] w-full overflow-hidden bg-black/60 cursor-pointer"
                            >
                              <Image
                                src={project.image}
                                alt={`${project.title} live interface preview`}
                                fill
                                className="object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-[1.03]"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                                priority={idx === 0}
                              />
                              {/* Hover overlay hint */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                                <span className="text-xs font-mono text-white/90 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                                  View Live Platform <ArrowUpRight className="w-3.5 h-3.5 text-[#dc2626]" />
                                </span>
                                <span className="text-[11px] font-mono text-white/60 bg-black/60 px-2.5 py-1 rounded">
                                  Production Interface
                                </span>
                              </div>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Action buttons below preview */}
                      <div className="flex flex-wrap items-center gap-3 mt-6">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium text-xs font-mono shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:shadow-[0_0_28px_rgba(220,38,38,0.5)] transition-all duration-300"
                          >
                            <span>{project.ctaText || "Try Live Demo"}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-white/[0.08] text-white/70 hover:text-white font-mono text-xs border border-white/[0.08] hover:border-white/20 transition-all duration-300"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>GitHub Profile</span>
                          </a>
                        )}
                        {project.client ? (
                          <span className="text-[11px] font-mono text-white/30 hidden sm:inline ml-auto">
                            Client Production · Dubai, UAE
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-white/30 hidden sm:inline ml-auto">
                            Live in Test Mode (Razorpay)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Architectural Highlights & Specs */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        {/* Title & Tagline */}
                        <div className="mb-4">
                          <h3
                            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#dc2626] transition-colors duration-300"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {project.title}
                          </h3>
                          <p className="text-sm font-medium text-white/50 mt-1 font-mono">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Main Description */}
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Key Engineering Architecture Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                          <div className="mb-6 space-y-2.5">
                            <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/40 font-semibold">
                              Core Engineering Highlights
                            </h4>
                            <div className="space-y-2">
                              {project.highlights.map((item, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-white/70 hover:border-white/[0.08] transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0" />
                                  <span className="leading-snug">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack Pills */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-widest text-white/30 mb-2.5">
                          Technology Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white/90 border border-white/[0.06] transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
