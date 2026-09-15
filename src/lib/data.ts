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
    tags: [
      "C#",
      "ASP.NET Core",
      "EF Core",
      "SQL Server",
      "Redis",
      "React",
      "TypeScript",
      "JWT",
      "Refresh Tokens",
      "Integration Testing",
      "Docker",
      "Caddy",
      "Cloudflare Tunnel",
      "GitHub Actions",
    ],
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
        {
          heading: "Self-hosted architecture & deploys",
          body: [
            "The live demo runs on my own Ubuntu server with no inbound ports open. A Cloudflare Tunnel makes an outbound-only connection to Cloudflare's edge, so the router forwards nothing and the home IP never ends up in DNS. Behind the tunnel an edge Caddy routes by URL path across the projects I host and strips the /projects/clinicbook prefix, then hands off to the app's own Caddy, which serves the React build and proxies /api/* to the ASP.NET Core API on Kestrel.",
            "SQL Server 2022 and Redis 7 run as containers on an internal Docker network with no internet access — nothing reaches them except the API. Redis is the distributed cache in front of the read-heavy endpoints: doctor search results are cached for 30 seconds and keyed on the query string, so repeated searches don't hit the database.",
            "Testing and deploying are both automatic. Every push to main runs the integration suite in GitHub Actions — xUnit driving the full HTTP pipeline through WebApplicationFactory against a real SQL Server and a real Redis, so what the tests exercise is the same stack that runs in production, not mocks. Deploys are gated on that run: when CI finishes, GitHub sends an HMAC-signed workflow_run webhook to the server, and it only redeploys if the run succeeded on a push to main — then it pulls and rebuilds the Compose stack at the exact commit that passed. A red build never reaches production, and shipping is still just a push; I never SSH in to release.",
          ],
          media: [
            {
              type: "image",
              src: "/projects/clinicbook/infrastructure.avif",
              alt: "A flowchart of the request path: browser to Cloudflare edge (TLS, CDN, WAF), to a cloudflared tunnel making an outbound-only connection, to the edge Caddy that routes by path and strips /projects/clinicbook, to the app Caddy serving the React SPA and proxying /api/*, to the ASP.NET Core API on Kestrel port 8080. The API talks to SQL Server 2022 and Redis 7 on an internal Docker network with no internet access. A GitHub push sends an HMAC-signed webhook to the edge Caddy.",
              caption:
                "Request path in, HMAC-signed deploy webhook on the side — no open inbound ports",
              width: 623,
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
