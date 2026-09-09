"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillCategories, allSkillsFlat } from "@/data/skills";
import LayeredHeading from "./LayeredHeading";
import { Terminal, Layers, Cpu, Database, Brain, Wrench, GraduationCap } from "lucide-react";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

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

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle web-pattern overlay */}
      <div className="absolute inset-0 web-pattern pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <LayeredHeading
          subtitle="Background & Capabilities"
          title="About & Technical Arsenal"
          watermark="ABOUT"
        />

        {/* Bio & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-10 md:mt-14 mb-20">
          
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

            {/* Micro Highlights - Glass Cards */}
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

          {/* Floating Editorial Card: Core Principles */}
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
                  <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                    CORE PRINCIPLES
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                </div>
                {[
                  { id: "speed", title: "Speed & Edge Delivery", desc: "Sub-second load times via smart caching, edge compute (Cloudflare), and lightweight frameworks.", color: "text-[#dc2626]" },
                  { id: "ai", title: "Production-Grade AI", desc: "Deploying LLM chains, agentic tool-use, and prompt engineering grounded in real business workflows.", color: "text-[#2563eb]" },
                  { id: "arch", title: "Modular Architecture", desc: "Strict type safety, reusable design tokens, and maintainable micro-components.", color: "text-[#dc2626]" },
                ].map((principle) => (
                  <div key={principle.id} className="mb-5 last:mb-0">
                    <h4 className={`font-mono text-xs uppercase tracking-wider mb-1 ${principle.color}`}>
                      {principle.title}
                    </h4>
                    <p className="text-sm text-white/40">{principle.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Infinite Scrolling Ticker */}
        <div className="relative py-6 my-10 border-y border-white/[0.06] overflow-hidden">
          <div className="flex w-max gap-8 animate-marquee">
            {[...allSkillsFlat, ...allSkillsFlat].map((skill, index) => (
              <span key={`${skill}-${index}`} className="inline-flex items-center gap-3 text-sm md:text-base font-mono uppercase tracking-widest text-white/25 hover:text-[#dc2626] transition-colors">
                <span>{skill}</span>
                <span className="text-[#dc2626]/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Categorized Skills Grid - Shuffled Glass Cards */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
              Categorized Stack
            </h3>
            <span className="font-mono text-xs text-white/25 uppercase tracking-wider">
              {allSkillsFlat.length} Core Competencies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20, rotate: groupIdx % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group p-6 rounded-2xl glass hover:bg-white/[0.06] hover:border-[#dc2626]/20 transition-all duration-300 flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg glass group-hover:shadow-[0_0_12px_rgba(220,38,38,0.15)] transition-shadow">
                        {getCategoryIcon(group.category)}
                      </div>
                      <h4 className="text-base font-bold text-white">{group.category}</h4>
                    </div>
                    <span className="font-mono text-[11px] text-white/20">0{groupIdx + 1}</span>
                  </div>
                  <p className="text-xs text-white/30 leading-relaxed mb-5">{group.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] text-white/60 border border-white/[0.06] hover:border-[#dc2626]/40 hover:text-[#dc2626] transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
