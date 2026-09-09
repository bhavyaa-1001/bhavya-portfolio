# Bhavya Bansal — Layered Animated Portfolio

A modern, high-impact **Layered Animated Portfolio** built with **Next.js (App Router, TypeScript)**, **Tailwind CSS**, **Framer Motion**, and **GSAP ScrollTrigger**.

Designed around a warm editorial cream palette (`#f5f3ee`), crisp ink-black typography (`#111111`), and a high-contrast electric vermilion CTA accent (`#ff4400`).

---

## ✨ Features & Architecture

- **Layered Parallax Hero**: Oversized display headline (`DEVELOPER`) set on a background layer, partially masked by an overlapping portrait photo card that moves at a distinct rate via **GSAP ScrollTrigger** scrub.
- **Vertical Rotated Side Navigation**: Fixed editorial left-edge navigation on desktop with active scroll-section indicators; collapses into a sticky floating pill nav on mobile viewports.
- **Section Headers with Layered Watermarks**: Reusable `LayeredHeading` component featuring low-opacity typographic watermarks and bold foreground titles.
- **Curated Technical Arsenal & Bio**: Condensed narrative of Bhavya's background at **MAIT ('28)** and **MorseBridge Ventures**, infinite animated marquee ticker, and grouped skill cards.
- **Experience Timeline**: Stacked cards showcasing roles at MorseBridge Ventures, InLabels, InAmigos Foundation, and NSS MAIT.
- **Projects Showcase (Ready for Content)**: Fully structured component ready with filter pills and empty state. Simply add your real projects to `data/projects.ts`!
- **Minimalist Contact Section**: Client-side contact form supporting **Formspree** or **Web3Forms** integration with fallback demo emulation and celebratory confetti.
- **Reduced Motion Support**: Automatically respects `prefers-reduced-motion` settings, disabling parallax transforms for accessibility.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (layout transitions & stagger) + GSAP ScrollTrigger (scroll-scrubbed parallax)
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 📝 Customizing Your Content

### Adding Real Projects (`data/projects.ts`)
The `data/projects.ts` file is pre-typed. When you are ready to publish projects, simply add items to the `projects` array:

```typescript
export const projects: Project[] = [
  {
    id: "ai-agent-engine",
    title: "AI Agent Orchestrator",
    category: "AI / LLM",
    tagline: "Autonomous multi-agent task execution platform",
    description: "Architected a local retrieval and reasoning pipeline using Next.js, LangChain, and Docker.",
    tags: ["Next.js", "TypeScript", "Docker", "Python", "LLMs"],
    liveUrl: "https://your-demo.com",
    githubUrl: "https://github.com/bhavyabansal/ai-orchestrator",
    featured: true,
    year: "2026"
  }
];
```
*The Projects section will automatically switch from the placeholder state to the interactive card grid.*

### Replacing Portrait Photo
Replace `public/portrait-placeholder.jpg` with your own photo (recommended 3:4 aspect ratio, e.g. 1200x1600px).

### Updating Contact Form Endpoint
Create a `.env.local` file in the root directory:
```env
# Option A: Formspree
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id

# Option B: Web3Forms
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

---

## 🌐 Deploying to Vercel

The portfolio is frontend-only and zero-backend, making it 100% optimized for **Vercel** with instant global edge caching:

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Layered Animated Portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. (Optional) Add your `NEXT_PUBLIC_FORMSPREE_ENDPOINT` or `NEXT_PUBLIC_WEB3FORMS_KEY` in the **Environment Variables** section.
5. Click **Deploy**. Your site will be live in under 60 seconds!
