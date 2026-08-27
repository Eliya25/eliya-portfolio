export const profile = {
  name: "Eliya Cohen",
  role: "Backend Engineer & Development Team Lead",
  email: "eliyacohen2019@gmail.com",
  githubUrl: "https://github.com/Eliya25",
  experience: [
    "Design and develop backend services and APIs with an emphasis on maintainability and reliability.",
    "Help establish engineering practices and development processes for a newly formed team.",
    "Break down technical work, coordinate development tasks, review code, and support teammates.",
    "Participate in architecture discussions and technical decision-making.",
  ],
  education: {
    degree: "B.Sc. in Computer Science",
    institution: "Ashkelon Academic College",
    period: "2022–2025",
  },
} as const;

export const skillGroups = [
  {
    title: "Backend",
    skills: [
      "Node.js",
      "TypeScript",
      "Express",
      "Python",
      "FastAPI",
      "REST API Design",
    ],
  },
  {
    title: "Data",
    skills: ["PostgreSQL", "SQL", "Prisma", "Caching"],
  },
  {
    title: "AI",
    skills: ["Gemini", "LangChain", "OpenRouter", "Structured LLM Outputs"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "GitHub Actions", "Vercel"],
  },
  {
    title: "Testing & Quality",
    skills: ["Zod", "Vitest", "Supertest", "Playwright"],
  },
] as const;
