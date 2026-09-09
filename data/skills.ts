export interface SkillCategory {
  category: string;
  description: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming languages for algorithms, systems, and modern web software.",
    items: ["TypeScript", "JavaScript", "Python", "C++", "C"]
  },
  {
    category: "Frontend",
    description: "Modern, reactive UI frameworks, styling systems, and component architectures.",
    items: ["React.js", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap"]
  },
  {
    category: "Backend",
    description: "Robust application runtimes, RESTful architecture, and server design.",
    items: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    category: "Databases",
    description: "Document stores, relational databases, and modern cloud database solutions.",
    items: ["MongoDB", "Supabase"]
  },
  {
    category: "AI & GenAI",
    description: "Intelligent agent orchestration, LLM application engineering, and prompting pipelines.",
    items: ["LLMs", "AI Agents", "Generative AI"]
  },
  {
    category: "Tools & DevOps",
    description: "Development workflow, containerization, edge infrastructure, and version control.",
    items: ["Git", "GitHub", "Docker", "Vite", "Cloudflare"]
  }
];

export const allSkillsFlat: string[] = skillCategories.flatMap((cat) => cat.items);
