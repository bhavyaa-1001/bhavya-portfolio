"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "hero", label: "Top", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Vertical Side Nav */}
      <aside
        aria-label="Side Navigation"
        className="hidden lg:flex fixed left-6 top-0 bottom-0 z-40 flex-col justify-between items-center py-10 pointer-events-none"
      >
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="pointer-events-auto group flex flex-col items-center gap-1.5 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center font-mono text-xs font-bold text-white/60 transition-all duration-300 group-hover:border-[#dc2626] group-hover:text-[#dc2626] group-hover:shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            BB
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#dc2626] transition-colors" />
        </a>

        <nav className="pointer-events-auto flex flex-col items-center gap-6 my-auto">
          <div className="w-px h-12 bg-white/10" />
          <div className="flex flex-col items-center gap-7">
            {navItems.filter(i => i.id !== "hero").map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`group relative py-1 text-[11px] font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive ? "text-[#dc2626] font-bold" : "text-white/30 hover:text-white/60"
                  }`}
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  <span className="relative">
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeSideNav"
                        className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#dc2626] shadow-[0_0_6px_rgba(220,38,38,0.6)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </div>
          <div className="w-px h-12 bg-white/10" />
        </nav>

        <div
          className="text-[10px] font-mono text-white/20 tracking-widest uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          DELHI · 2026
        </div>
      </aside>

      {/* Mobile Floating Pill */}
      <header className="lg:hidden fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-full glass-strong shadow-lg shadow-black/30">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="px-2 py-1 rounded-full text-xs font-mono font-bold text-white hover:text-[#dc2626] transition-colors"
          >
            BB
          </a>
          <span className="w-px h-3.5 bg-white/10" />
          {navItems.filter(i => i.id !== "hero").map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#dc2626] text-white font-semibold shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>
    </>
  );
}
