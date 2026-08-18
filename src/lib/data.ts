// Real CV content for Mats Haugum's portfolio.

export interface NavItem {
  label: string;
  href: string;
}

export const nav = [
  { label: "home", href: "/" },
  { label: "expertise", href: "/expertise" },
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "contact", href: "/contact" },
] as const satisfies readonly NavItem[];

export type SectionPath = (typeof nav)[number]["href"];

export interface Profile {
  name: string;
  role: string;
  summary: string;
  stack: readonly string[];
  interests: readonly string[];
}

export const profile: Profile = {
  name: "Mats Haugum",
  role: "Backend / Fullstack Developer",
  summary:
    "Backend is my main focus — robust services with well-documented, predictable APIs — but I'm comfortable anywhere in the stack, from database design to the frontend on top.",
  stack: ["C#", "ASP.NET Core", ".NET Framework", "Entity Framework", "Node.js", "Express.js", "Sequelize", "SQL Server", "React", "Next.js", "TypeScript", "HTML"],
  interests: ["climbing", "technology", "science", "psychology"],
};

export interface ExpertiseArea {
  title: string;
  description: string;
  tags: readonly string[];
}

export const expertise: readonly ExpertiseArea[] = [
  {
    title: "Backend",
    description:
      "Building APIs and services that stay predictable under real use — from request validation down to the data layer.",
    tags: [
      "C#",
      "ASP.NET Core",
      ".NET Framework",
      "Entity Framework",
      "Node.js",
      "Express.js",
      "Sequelize",
    ],
  },
  {
    title: "Frontend",
    description:
      "Comfortable turning an API into a clean, usable interface without losing sight of the backend that powers it.",
    tags: ["React", "Next.js", "TypeScript", "HTML", "Tailwind", "Bootstrap"],
  },
  {
    title: "Database & Data",
    description:
      "Schema design, query performance, and moving data reliably between systems.",
    tags: [
      "SQL Server",
      "MySQL",
      "MongoDB",
      "Database Design",
      "ETL",
      "Azure Data Factory",
      "Power BI",
    ],
  },
  {
    title: "Tools & Methods",
    description:
      "The habits and tooling that keep a codebase maintainable as it grows, and the workflows that keep a team shipping.",
    tags: [
      "AI-Assisted Development",
      "Linux",
      "Git",
      "Docker",
      "Jira",
      "Agile",
      "TDD",
      "Microservices",
      "JWT",
      "WebSockets",
      "Azure",
    ],
  },
];

export interface Project {
  slug: string;
  title: string;
  context: string;
  description: string;
  tags: readonly string[];
  href: string | null;
}

export const projects: readonly Project[] = [
  {
    slug: "clinicbook",
    title: "ClinicBook",
    context: "Year-2 exam project — Noroff, 2026",
    description:
      "Full-stack appointment booking for medical clinics: patients book as guests or register to manage their appointments, while an admin panel gives clinic staff control over doctors, clinics, specialties, and appointment categories. ASP.NET Core REST API with JWT auth and refresh token rotation.",
    tags: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "React", "TypeScript", "JWT"],
    href: null, // TODO: swap in the repo URL once ClinicBook goes public.
  },
];

export interface TimelineEntry {
  title: string;
  org: string;
  period: string;
  description: string;
  highlight?: string;
}

export const education: readonly TimelineEntry[] = [
  {
    title: "Higher Professional Degree, Back-End Development",
    org: "Noroff",
    period: "2024 — 2026",
    description:
      "Two-year, full-time program covering backend and frontend technologies, database technologies, and REST APIs — taught primarily in Express.js and Sequelize, with the year-2 exam project built in C# and ASP.NET Core.",
    highlight: "A average — both year-end exam projects graded A",
  },
  {
    title: "Higher Professional Degree, Network & IT Security",
    org: "Noroff",
    period: "2022 — 2024",
    description:
      "Foundation in networking, systems administration, and security fundamentals — the knowledge i have from IT security informs how I design and deploy backend systems.",
  },
];

export const experience: readonly TimelineEntry[] = [
  {
    title: "Music Teacher (Bass)",
    org: "Overhalla Kulturskole",
    period: "2019 — 2021",
    description:
      "Taught bass to individual students and assisted in larger group sessions — adapting lessons to each student and communicating with students and parents alike.",
  },
  {
    title: "Musician / Project Worker",
    org: "NAV Midtre Namdal",
    period: "2015 — 2017",
    description:
      "Worked with young people facing different challenges through music and band projects — building trust and adapting to each participant's situation.",
  },
  {
    title: "Telecom Technician",
    org: "Midnoco AS",
    period: "2013 — 2015",
    description:
      "Maintained phone, ADSL, and fiber lines, installed routers, and guided customers through their setups — hands-on troubleshooting in the field.",
  },
];

export interface ContactLink {
  label: string;
  href: string;
}

export interface Contact {
  email: string;
  links: readonly ContactLink[];
}

export const contact: Contact = {
  email: "mats.haugum@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/mats-haugum" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mats-haugum-816a12249/",
    },
  ],
};

// TODO: real domain — swap once this site has a production URL.
export const siteUrl = "https://mats-haugum.vercel.app";
