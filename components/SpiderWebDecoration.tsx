"use client";

import React from "react";

/**
 * SpiderWebDecoration
 * Renders fixed/absolute decorative spider web SVG graphics at various scroll positions.
 * These are purely decorative overlays that give the Spider-Man vibe throughout the page.
 */
export default function SpiderWebDecoration() {
  return (
    <>
      {/* ─── Top-Right Corner Web ─── */}
      <div className="fixed top-0 right-0 w-[300px] h-[300px] pointer-events-none z-[2] opacity-[0.12]">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Radial web lines from corner */}
          <line x1="300" y1="0" x2="0" y2="300" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="0" y2="200" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="0" y2="100" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="100" y2="300" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="200" y2="300" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="0" y2="0" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="300" y2="300" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="150" y2="300" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="0" y2="150" stroke="#dc2626" strokeWidth="0.5" />
          {/* Concentric arcs */}
          <path d="M 240 0 A 60 60 0 0 1 300 60" stroke="#dc2626" strokeWidth="0.4" fill="none" />
          <path d="M 180 0 A 120 120 0 0 1 300 120" stroke="#dc2626" strokeWidth="0.4" fill="none" />
          <path d="M 120 0 A 180 180 0 0 1 300 180" stroke="#dc2626" strokeWidth="0.4" fill="none" />
          <path d="M 60 0 A 240 240 0 0 1 300 240" stroke="#dc2626" strokeWidth="0.4" fill="none" />
          <path d="M 0 0 A 300 300 0 0 1 300 300" stroke="#dc2626" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      {/* ─── Bottom-Left Corner Web ─── */}
      <div className="fixed bottom-0 left-0 w-[250px] h-[250px] pointer-events-none z-[2] opacity-[0.08]">
        <svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <line x1="0" y1="250" x2="250" y2="0" stroke="#2563eb" strokeWidth="0.5" />
          <line x1="0" y1="250" x2="250" y2="100" stroke="#2563eb" strokeWidth="0.5" />
          <line x1="0" y1="250" x2="250" y2="200" stroke="#2563eb" strokeWidth="0.5" />
          <line x1="0" y1="250" x2="100" y2="0" stroke="#2563eb" strokeWidth="0.5" />
          <line x1="0" y1="250" x2="0" y2="0" stroke="#2563eb" strokeWidth="0.5" />
          <line x1="0" y1="250" x2="250" y2="250" stroke="#2563eb" strokeWidth="0.5" />
          <line x1="0" y1="250" x2="200" y2="0" stroke="#2563eb" strokeWidth="0.5" />
          <path d="M 0 190 A 60 60 0 0 1 60 250" stroke="#2563eb" strokeWidth="0.4" fill="none" />
          <path d="M 0 130 A 120 120 0 0 1 120 250" stroke="#2563eb" strokeWidth="0.4" fill="none" />
          <path d="M 0 70 A 180 180 0 0 1 180 250" stroke="#2563eb" strokeWidth="0.4" fill="none" />
          <path d="M 0 10 A 240 240 0 0 1 240 250" stroke="#2563eb" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      {/* ─── Hanging Web Thread (Right side, mid-page) ─── */}
      <div className="fixed right-8 top-1/4 pointer-events-none z-[2] opacity-[0.15] hidden lg:block">
        <div className="web-swing">
          <svg width="2" height="200" viewBox="0 0 2 200" fill="none">
            <line x1="1" y1="0" x2="1" y2="200" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
        </div>
      </div>
    </>
  );
}
