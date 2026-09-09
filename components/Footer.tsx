"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 lg:py-16 border-t border-white/[0.05] overflow-hidden">
      {/* Spider web corner accent */}
      <div className="absolute bottom-0 right-0 w-[180px] h-[180px] pointer-events-none opacity-[0.06]">
        <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
          <line x1="180" y1="180" x2="0" y2="0" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="180" y1="180" x2="0" y2="90" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="180" y1="180" x2="90" y2="0" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="180" y1="180" x2="0" y2="180" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="180" y1="180" x2="180" y2="0" stroke="#dc2626" strokeWidth="0.5" />
          <path d="M 180 120 A 60 60 0 0 0 120 180" stroke="#dc2626" strokeWidth="0.3" fill="none" />
          <path d="M 180 60 A 120 120 0 0 0 60 180" stroke="#dc2626" strokeWidth="0.3" fill="none" />
          <path d="M 180 0 A 180 180 0 0 0 0 180" stroke="#dc2626" strokeWidth="0.3" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Large Footer Watermark */}
        <div
          aria-hidden="true"
          className="w-full text-center font-extrabold uppercase tracking-tighter text-white/[0.02] select-none pointer-events-none pb-8"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.9 }}
        >
          BHAVYA BANSAL
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.06] text-xs font-mono text-white/25">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dc2626] shadow-[0_0_6px_rgba(220,38,38,0.4)]" />
            <span>© {new Date().getFullYear()} Bhavya Bansal. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>MAIT CSE &apos;28</span>
            <span className="text-white/10">|</span>
            <span>DELHI, INDIA</span>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full glass hover:bg-[#dc2626]/20 text-white/40 hover:text-white transition-all duration-300"
            title="Return to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
