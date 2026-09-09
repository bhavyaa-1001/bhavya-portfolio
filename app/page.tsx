import SidebarNav from "@/components/SidebarNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SpiderWebDecoration from "@/components/SpiderWebDecoration";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-[#dc2626] selection:text-white">
      {/* Global dot grid background */}
      <div className="fixed inset-0 pointer-events-none dot-grid opacity-60 z-0" />

      {/* Spider web decorative overlays at section breaks */}
      <SpiderWebDecoration />

      {/* Edge Navigation */}
      <SidebarNav />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 w-full lg:pl-12">
        <Hero />
        <About />
        <ExperienceSection />
        <ProjectsSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
