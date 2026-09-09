export interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "AI / LLM" | "Frontend" | "Systems / DevOps" | string;
  tagline: string;
  description: string;
  client?: string;
  statusBadge?: string;
  ctaText?: string;
  highlights?: string[];
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year?: string;
}

export const projects: Project[] = [
  {
    id: "morsebridge-ventures",
    title: "MorseBridge Ventures — Official Corporate Platform",
    category: "Full Stack",
    tagline: "Venture Capital & Startup Ecosystem Hub Built on the MERN Stack",
    client: "MorseBridge Ventures (Internship)",
    statusBadge: "MERN Stack · Production Live",
    ctaText: "Visit MorseBridge",
    description:
      "Architected and engineered the official production web platform for MorseBridge Ventures during my Full Stack Developer internship. Built on the complete MERN stack (MongoDB, Express.js, React, Node.js), the platform features dual-portal funnels connecting 700+ visionary startups with institutional investors, dynamic program pipelines (Runway 90-day sprints & Global Fundraising cohorts), curated deal-flow directories, and scalable REST API integrations.",
    highlights: [
      "Dual-portal matchmaking architecture tailored for startup founders and accredited angel/VC investors",
      "Interactive incubation sprint pipelines for the Runway cohort and Global Fundraising Boot Camp",
      "Robust REST API endpoints built with Express.js and Node.js for high-concurrency applicant routing",
      "Database schema and data models designed in MongoDB for candidate tracking and investor directories",
      "Ultra-responsive modern UI developed in React with Vite, styled with custom dark-mode aesthetics"
    ],
    tags: [
      "MERN Stack",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Vite",
      "Tailwind CSS"
    ],
    image: "/projects/morsebridge.png",
    liveUrl: "https://morsebridge.com",
    featured: true,
    year: "Aug 2026"
  },
  {
    id: "birdcast-studio",
    title: "Birdcast Studio Booking & Admin Platform",
    category: "Full Stack",
    tagline: "Commercial Podcast Studio Scheduling & Real-Time Management System",
    client: "Birdcast Studio (Dubai, UAE)",
    statusBadge: "Stripe + Supabase Live",
    ctaText: "Try Booking Engine",
    description:
      "A complete commercial booking platform engineered for Dubai's premier podcast studio. Built with an intuitive 5-step client reservation flow featuring dynamic calendar slot availability, studio set selection (Ciera, Contemporary, Tron), multi-tier service and add-on customizers (teleprompter, 4K multi-cam, reels packages), automated transactional email confirmations, secure Stripe payment gateway handling AED currency & promo discounts, and a live admin dashboard for studio operations.",
    highlights: [
      "Interactive 5-step booking flow: Date & slot picking, duration calculus, and participant headcount",
      "Dynamic studio set selection engine with visual galleries & Dubai location integration",
      "Secure Stripe checkout processing multi-tiered recording packages, hourly add-ons & promo codes in AED",
      "Automated transactional email dispatch for instant booking confirmations and studio schedule alerts",
      "Live administrative management panel and real-time database state powered by Supabase"
    ],
    tags: [
      "React",
      "Supabase",
      "Stripe",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Email Automation",
      "Admin Panel",
      "REST APIs"
    ],
    image: "/projects/birdcast.png",
    liveUrl: "https://booking.birdcast.me",
    featured: true,
    year: "2026"
  },
  {
    id: "insighthub-ai",
    title: "InsightHub AI",
    category: "AI / LLM",
    tagline: "Document Intelligence & Conversational RAG Platform",
    statusBadge: "Vercel + Render Live",
    ctaText: "Try InsightHub AI",
    description:
      "A production-grade RAG platform engineered with a custom document chunking pipeline that preserves page and section boundaries for precise citations on complex 50+ page PDFs. Built with multi-tenant workspace RBAC, Google OAuth + TOTP 2FA, anti-abuse security (disposable email check, MX validation, IP rate limiting), Razorpay-metered subscription tiers, and containerized microservices deployed across Vercel and Render.",
    highlights: [
      "Custom page/section boundary chunking pipeline for pinpoint page-level citations",
      "Multi-tenant isolation hardened against IDOR / BOLA with workspace RBAC",
      "Enterprise security with Google OAuth, TOTP 2FA, MX validation & IP rate limiting",
      "Asynchronous embedding & document processing queue with Redis + BullMQ",
      "Razorpay-metered multi-tier architecture containerized via Docker Compose"
    ],
    tags: [
      "React 18",
      "Vite",
      "Node.js",
      "Express",
      "Gemini Embeddings",
      "RAG",
      "MongoDB Atlas",
      "Redis",
      "BullMQ",
      "Docker Compose",
      "Tailwind CSS"
    ],
    image: "/projects/insighthub.png",
    liveUrl: "https://insight-hub-xi-ecru.vercel.app",
    githubUrl: "https://github.com/bhavyaa-1001",
    featured: true,
    year: "Aug 2026"
  }
];
