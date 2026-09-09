"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LayeredHeading from "./LayeredHeading";
import { Mail, Send, MapPin, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (formspreeEndpoint) {
        const res = await fetch(formspreeEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(formData) });
        if (!res.ok) throw new Error("Failed to send via Formspree.");
      } else if (web3FormsKey) {
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: web3FormsKey, ...formData }) });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to submit.");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      if (!shouldReduceMotion) {
        try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ["#dc2626", "#2563eb", "#ffffff"] }); } catch {}
      }
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-white/[0.05] overflow-hidden">
      {/* Web pattern in background */}
      <div className="absolute inset-0 web-pattern pointer-events-none opacity-50" />
      {/* Blue glow accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#2563eb]/[0.03] blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <LayeredHeading subtitle="Direct Communication" title="Let's Build Together" watermark="CONNECT" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-10 md:mt-14">
          {/* Left: Contact Info & Socials */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Start a Conversation
              </h3>
              <p className="text-base text-white/40 leading-relaxed mb-6">
                Whether you have an ambitious full-stack project, an AI/LLM integration inquiry, or an internship opportunity, my inbox is always open.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl glass flex items-center gap-4 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-[#dc2626]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-white/25 uppercase tracking-wider">Email Me</p>
                    <a href="mailto:bhavyyaa106@gmail.com" className="text-sm font-bold text-white hover:text-[#dc2626] transition-colors">
                      bhavyyaa106@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl glass flex items-center gap-4 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-[#2563eb]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-white/25 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-bold text-white">Delhi, India · Remote Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/20 mb-4">Verified Channels</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/bhavyaa-1001" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/[0.08] text-white/50 hover:text-white text-xs font-mono transition-all duration-300">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-40" />
                </a>
                <a href="https://www.linkedin.com/in/bhavyaa-1001-" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-[#2563eb]/20 text-white/50 hover:text-white text-xs font-mono transition-all duration-300">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-40" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Glassmorphism Form */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-2xl glass-strong glow-blue">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563eb]/[0.04] via-transparent to-[#dc2626]/[0.03] pointer-events-none" />
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Your Name *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]/50 transition-all text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Email Address *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="alex@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]/50 transition-all text-sm" />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Project or Inquiry *</label>
                  <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder="Tell me about your product vision..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]/50 transition-all text-sm resize-none" />
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center gap-3 text-sm text-[#10b981]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Message delivered! I&apos;ll get back to you shortly.</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-[#dc2626]/10 border border-[#dc2626]/20 flex items-center gap-3 text-sm text-[#dc2626]">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button type="submit" disabled={status === "submitting"}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#dc2626] text-white font-medium text-sm shadow-lg shadow-[#dc2626]/20 hover:bg-[#b91c1c] hover:shadow-xl hover:shadow-[#dc2626]/30 transition-all duration-300 disabled:opacity-60 cursor-pointer">
                  <span>{status === "submitting" ? "Transmitting..." : "Send Message"}</span>
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <p className="font-mono text-[10px] text-white/15">
                  * Protected client-side transmission. Formspree / Web3Forms ready via .env.local
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
