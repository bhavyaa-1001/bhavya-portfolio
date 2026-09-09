export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "morsebridge",
    role: "Full Stack Developer",
    company: "MorseBridge Ventures",
    type: "Internship",
    period: "Aug 2026 – Present",
    location: "Remote",
    description: [
      "Architected and deployed responsive full-stack applications leveraging the MERN stack with high-availability infrastructure.",
      "Integrated complex front-end client states with high-throughput RESTful APIs and robust server-side business logic.",
      "Managed web edge infrastructure, caching, DNS routing, and global performance optimization via Cloudflare.",
      "Maintained modular, clean codebases enforced with rigorous unit testing suites and continuous peer code reviews."
    ],
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudflare", "REST APIs", "CI/CD"]
  },
  {
    id: "inlabels",
    role: "Frontend Developer",
    company: "InLabels",
    type: "Internship",
    period: "Jun 2026 – Jul 2026",
    location: "Remote",
    description: [
      "Engineered and optimized a high-performance Chrome Extension for managing LinkedIn conversations utilizing Svelte 5, TypeScript, and Tailwind CSS.",
      "Built intuitive conversation tagging, interactive custom labels, quick notes, and multi-parameter filtering workflows.",
      "Resolved mission-critical chat-avatar rendering glitches and optimized asynchronous API request lifecycles for zero perceptible latency."
    ],
    skills: ["Svelte 5", "TypeScript", "Tailwind CSS", "Chrome Extensions", "State Management"]
  },
  {
    id: "inamigos",
    role: "Graphic Designer",
    company: "InAmigos Foundation",
    type: "Internship / Contract",
    period: "Mar 2025 – May 2025",
    location: "Remote",
    description: [
      "Designed visual identity, digital campaign assets, and posters for grassroots education and social welfare drives under Project Bachpanshala.",
      "Collaborated with cross-functional volunteer teams to amplify community engagement and digital outreach impact."
    ],
    skills: ["Visual Design", "Branding", "Typography", "Digital Campaigns"]
  },
  {
    id: "nss-mait",
    role: "Student Volunteer",
    company: "National Service Scheme (NSS), MAIT",
    type: "Volunteering",
    period: "Sep 2024 – Present",
    location: "Delhi, India",
    description: [
      "Participating in continuous community outreach, educational drives, and civic initiatives organized by NSS MAIT.",
      "Leading collaborative student volunteer groups for on-ground execution and event coordination."
    ],
    skills: ["Leadership", "Community Outreach", "Public Relations", "Team Coordination"]
  }
];
