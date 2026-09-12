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
    "Backend is my main focus - robust services with well-documented, predictable APIs - I'm comfortable anywhere in the stack, from database design to the frontend on top.",
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

// Media shown on a project's case-study page. Files live in public/projects/<slug>/.
// width/height must be the file's true intrinsic pixels, or images shift and posters letterbox.
interface MediaBase {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface ProjectImage extends MediaBase {
  type: "image";
}

// Screencasts are webm only — the poster is what iOS Safari falls back to, so it's required.
export interface ProjectVideo extends MediaBase {
  type: "video";
  poster: string;
}

export type ProjectMedia = ProjectImage | ProjectVideo;

export interface CaseStudySection {
  heading: string;
  body: readonly string[];
  media: readonly ProjectMedia[];
}

export interface CaseStudy {
  overview: string;
  ogImage: string;
  sections: readonly CaseStudySection[];
}

export interface Project {
  slug: string;
  title: string;
  context: string;
  description: string;
  tags: readonly string[];
  href: string | null;
  demo: string | null;
  demoNote: string | null;
  caseStudy: CaseStudy | null;
}

export const projects: readonly Project[] = [
  {
    slug: "clinicbook",
    title: "ClinicBook",
    context: "Year-2 exam project — Noroff, 2026",
    description:
      "Full-stack appointment booking for medical clinics: patients book as guests or register to manage their appointments, while an admin panel gives clinic staff control over doctors, clinics, specialties, and appointment categories. ASP.NET Core REST API with JWT auth and refresh token rotation.",
    tags: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "React", "TypeScript", "JWT", "Refresh Tokens"],
    href: "https://github.com/mats-haugum/clinicbook", // repo URL
    demo: "https://app.matshaugum.com/projects/clinicbook/",
    demoNote: null, // TODO: set if the demo needs a login hint, e.g. seeded admin credentials.
    caseStudy: {
      overview:
        "ClinicBook is my year-2 exam project: a booking system for medical clinics, built as an ASP.NET Core REST API with a React front end on top. I wanted the booking itself to stay simple enough that a patient never has to make an account, while still giving clinic staff a real admin surface behind it.",
      ogImage: "/projects/clinicbook/og.avif",
      sections: [
        {
          heading: "Booking flow",
          body: [
            "A patient picks a clinic, a specialty, and a time slot, then confirms. Booking as a guest takes an email and nothing more — no account, no password.",
            "Registering is optional and only buys you one thing: a place to see and manage the appointments you've already made. That kept the flow short for the common case without cutting off the people who want to come back to it.",
          ],
          media: [
            {
              type: "video",
              src: "/projects/clinicbook/booking-flow.webm",
              poster: "/projects/clinicbook/booking-flow-poster.avif",
              alt: "A patient picks a clinic, a specialty, and an available time slot, then confirms the appointment as a guest and lands on a confirmation screen.",
              caption: "Booking as a guest, start to how to reschedule — silent screencast",
              width: 1280,
              height: 800,
            },
            {
              type: "image",
              src: "/projects/clinicbook/booking-confirmation.avif",
              alt: "The confirmation screen showing the booked clinic, doctor, specialty, date, and time.",
              caption: "Patient appointments",
              width: 1440,
              height: 900,
            },
          ],
        },
        {
          heading: "Admin panel",
          body: [
            "Clinic staff manage doctors, clinics, specialties, and appointment categories from one panel. These are the records the booking flow reads from, so adding a doctor or a new specialty changes what patients can book without a deploy.",
          ],
          media: [
            {
              type: "video",
              src: "/projects/clinicbook/admin-panel.webm",
              poster: "/projects/clinicbook/admin-panel-poster.avif",
              alt: "An administrator opens the doctors list, adds a doctor with a specialty and a clinic, and the new entry appears in the table.",
              caption: "Login to admin panel. Managing doctors, clinics, specialties, and categories — silent screencast",
              width: 1280,
              height: 800,
            },
            {
              type: "image",
              src: "/projects/clinicbook/admin-doctors.png",
              alt: "The admin doctors table, listing each doctor with their specialty and clinic.",
              caption: "The doctors table",
              width: 1440,
              height: 900,
            },
          ],
        },
        {
          heading: "Auth & API",
          body: [
            "The API issues short-lived JWT access tokens with refresh token rotation behind them, so a stolen access token stops being useful quickly and a refresh token can only be spent once.",
          ],
          media: [
            {
              type: "image",
              src: "/projects/clinicbook/auto-refresh.avif",
              alt: "A sequence diagram between the browser, the API, and SQL Server: login returns an access JWT and a refresh token, a later request fails with 401, the response interceptor posts the refresh token, the API validates and revokes it, issues a new pair, and the original request is retried automatically.",
              caption: "The refresh cycle: a 401 is caught, tokens are rotated, and the request is retried",
              width: 1613,
              height: 1186,
            },
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const caseStudyProjects = projects.filter(
  (project): project is Project & { caseStudy: CaseStudy } =>
    project.caseStudy !== null,
);

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
