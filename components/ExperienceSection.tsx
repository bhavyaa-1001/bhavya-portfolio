"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/data/experience";
import LayeredHeading from "./LayeredHeading";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      {/* Alternating web-lines decoration */}
      <div className="absolute inset-0 web-lines pointer-events-none opacity-30" />

      {/* Section glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#2563eb]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <LayeredHeading
          subtitle="Career & Impact"
          title="Experience & Roles"
          watermark="EXPERIENCE"
        />

        {/* Stacked / Shuffled Glass Cards */}
        <div className="relative mt-12 md:mt-16 space-y-6 md:space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30, rotate: idx % 2 === 0 ? -1.5 : 1.5, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative"
            >
              {/* Stacked card shadow effect behind */}
              {idx < 2 && (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl glass opacity-30 transform translate-y-2 translate-x-1 rotate-[0.5deg] scale-[0.99] -z-10"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl glass opacity-15 transform translate-y-4 translate-x-2 rotate-[1deg] scale-[0.98] -z-20"
                  />
                </>
              )}

              {/* Main Experience Glass Card */}
              <div className={`p-6 sm:p-8 md:p-10 rounded-2xl glass-strong hover:bg-white/[0.07] transition-all duration-300 ${
                idx === 0 ? "glow-red" : idx === 1 ? "glow-blue" : ""
              }`}>
                {/* Accent gradient overlay for the first two cards */}
                {idx < 2 && (
                  <div className={`absolute inset-0 rounded-2xl pointer-events-none ${
                    idx === 0
                      ? "bg-gradient-to-br from-[#dc2626]/[0.04] via-transparent to-transparent"
                      : "bg-gradient-to-br from-[#2563eb]/[0.04] via-transparent to-transparent"
                  }`} />
                )}

                <div className="relative z-10">
                  {/* Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${idx % 2 === 0 ? "bg-[#dc2626]" : "bg-[#2563eb]"}`} />
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase glass text-white/50">
                          {exp.type}
                        </span>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#dc2626] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-lg font-medium text-white/40 mt-1">{exp.company}</p>
                    </div>

                    <div className="flex flex-wrap lg:flex-col lg:items-end gap-2.5 font-mono text-xs text-white/35">
                      <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-[#dc2626]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg">
                        <MapPin className="w-3.5 h-3.5 text-white/30" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-6 space-y-3">
                    {exp.description.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#dc2626] mt-1 shrink-0 opacity-70" />
                        <p className="text-sm sm:text-base text-white/40 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills tags */}
                  <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-white/20 mr-2 uppercase tracking-wider">Stack:</span>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-white/50 border border-white/[0.06] hover:border-[#dc2626]/30 hover:text-[#dc2626] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
