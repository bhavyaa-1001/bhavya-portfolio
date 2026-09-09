"use client";

import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/data/experience";
import LayeredHeading from "./LayeredHeading";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);


  // GSAP timeline line draw
  useEffect(() => {
    if (shouldReduceMotion) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | null = null;

    const initGsap = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !timelineLineRef.current) return;

      ctx = gsap.context(() => {
        // Animate the timeline line drawing with scroll
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 0.5,
            },
          }
        );
      }, sectionRef);
    };

    initGsap();

    return () => {
      ctx?.revert();
    };
  }, [shouldReduceMotion]);

  const isCurrentRole = (period: string) => period.toLowerCase().includes("present");

  return (
    <section id="experience" className="relative pt-24 md:pt-32 pb-36 md:pb-48 overflow-hidden">
      {/* Alternating web-lines decoration */}
      <div className="absolute inset-0 web-lines pointer-events-none opacity-30" />

      {/* Section glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#2563eb]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <LayeredHeading
          subtitle="Career & Impact"
          title="Experience & Roles"
          watermark="EXPERIENCE"
        />

        {/* Timeline Container */}
        <div ref={sectionRef} className="relative mt-12 md:mt-16">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-6 lg:left-1/2 top-0 bottom-0 w-[2px] lg:-translate-x-[1px]">
            {/* Background track */}
            <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
            {/* Animated fill */}
            <div
              ref={timelineLineRef}
              className="absolute inset-0 rounded-full origin-top"
              style={{
                background: "linear-gradient(180deg, #dc2626 0%, #2563eb 50%, rgba(37,99,235,0.3) 100%)",
                transformOrigin: "top",
              }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-20">
            {experiences.map((exp, idx) => {
              const isCurrent = isCurrentRole(exp.period);
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col lg:flex-row items-start ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-4 sm:left-6 lg:left-1/2 top-8 lg:top-10 z-20 -translate-x-1/2`}
                  >
                    {/* Outer glow ring for current role */}
                    {isCurrent && (
                      <div className="absolute inset-0 -m-2 rounded-full animate-timeline-ping bg-[#dc2626]/20" />
                    )}
                    <div
                      className={`w-4 h-4 rounded-full border-[3px] transition-all duration-500 ${
                        isCurrent
                          ? "bg-[#dc2626] border-[#dc2626] shadow-[0_0_16px_rgba(220,38,38,0.6)]"
                          : idx % 2 === 0
                          ? "bg-[#0a0a0a] border-[#dc2626]/60 shadow-[0_0_8px_rgba(220,38,38,0.2)]"
                          : "bg-[#0a0a0a] border-[#2563eb]/60 shadow-[0_0_8px_rgba(37,99,235,0.2)]"
                      }`}
                    />
                    {/* "Now" label for current role */}
                    {isCurrent && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold uppercase tracking-widest text-[#dc2626] whitespace-nowrap">
                        NOW
                      </span>
                    )}
                  </div>

                  {/* Card — alternating sides on desktop, left-indented on mobile */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 30,
                            rotateX: 12,
                            scale: 0.97,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`group relative ml-8 sm:ml-12 lg:ml-0 w-full lg:w-[calc(50%-40px)] perspective-1000 ${
                      isEven ? "lg:pr-8" : "lg:pl-8"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Connector line from dot to card */}
                    <div
                      className={`hidden lg:block absolute top-12 w-8 h-[2px] ${
                        isEven ? "right-0" : "left-0"
                      } ${
                        idx % 2 === 0
                          ? "bg-gradient-to-r from-[#dc2626]/40 to-transparent"
                          : "bg-gradient-to-l from-[#2563eb]/40 to-transparent"
                      }`}
                    />

                    {/* Main Experience Glass Card */}
                    <div
                      className={`p-4 sm:p-7 md:p-10 rounded-2xl glass-strong hover:bg-white/[0.07] transition-all duration-300 ${
                        idx === 0 ? "glow-red" : idx === 1 ? "glow-blue" : ""
                      }`}
                    >
                      {/* Accent gradient overlay for first two */}
                      {idx < 2 && (
                        <div
                          className={`absolute inset-0 rounded-2xl pointer-events-none ${
                            idx === 0
                              ? "bg-gradient-to-br from-[#dc2626]/[0.04] via-transparent to-transparent"
                              : "bg-gradient-to-br from-[#2563eb]/[0.04] via-transparent to-transparent"
                          }`}
                        />
                      )}

                      <div className="relative z-10">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  idx % 2 === 0 ? "bg-[#dc2626]" : "bg-[#2563eb]"
                                }`}
                              />
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase glass text-white/50">
                                {exp.type}
                              </span>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#dc2626]/15 text-[#dc2626] border border-[#dc2626]/30">
                                  Active
                                </span>
                              )}
                            </div>
                            <h3
                              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#dc2626] transition-colors"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {exp.role}
                            </h3>
                            <p className="text-lg font-medium text-white/40 mt-1">
                              {exp.company}
                            </p>
                          </div>

                          <div className="flex flex-wrap sm:flex-col sm:items-end gap-2.5 font-mono text-xs text-white/35">
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
                              <p className="text-sm sm:text-base text-white/40 leading-relaxed">
                                {point}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Skills tags */}
                        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-white/20 mr-2 uppercase tracking-wider">
                            Stack:
                          </span>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
