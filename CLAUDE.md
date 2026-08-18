# Project: Portfolio Frontend

## What this is
Mats Haugum's personal portfolio site — a 5-route Next.js App Router site with an API/terminal visual identity (routes styled as endpoints, mock HTTP responses). Content lives in `src/lib/data.ts`, not scattered across components.

@AGENTS.md

## Commands
- Install deps: `npm install`
- Run dev server: `npm run dev` (http://localhost:3000)
- Run tests: no test runner is configured in this repo
- Lint: `npm run lint` (flat config via `eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript rulesets)
- Build: `npm run build`
- Run production build: `npm run start`

## Structure
- `src/app/` — App Router routes: `/`, `/expertise`, `/projects`, `/experience`, `/contact`, each a thin `page.tsx` exporting route `metadata` and rendering one section component, no `<main>` wrapper of its own. `src/app/layout.tsx` owns shared chrome: skip link, JSON-LD `Person` script, `Nav`, the single `<main id="main">` (wrapped in `MotionProvider`), `Footer`. `not-found.tsx` (mock 404) and `error.tsx` (mock 500 with retry, `"use client"`) are present; `global-error.tsx`, `loading.tsx`, and View Transitions are intentionally absent (no async work to gate on; a global error page would duplicate the root `<html>`/`<body>`).
- `src/components/` — one component per section (`Hero`, `Expertise`, `Projects`, `Experience`, `Contact`) plus shared pieces: `Reveal` (motion wrapper), `SectionHeading`, `ContactLinks`, `MotionProvider`, `Nav`, `Footer`.
- `src/lib/data.ts` — all copy (nav, profile, expertise, projects, education, experience, contact) as typed arrays/objects — real CV content, not placeholders. Components import and map over it; components hold no copy of their own.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

## Conventions
- **Content vs. presentation split:** when updating site content, edit `src/lib/data.ts`; when changing layout/behavior, edit the component. `nav` is declared `as const satisfies readonly NavItem[]` so `export type SectionPath = (typeof nav)[number]["href"]` yields a literal union, consumed by `SectionHeading`'s `path` prop. `Project.href` is typed `string | null` — `null` is the deliberate "repo not public yet" state that `Projects` renders as a muted `[ repo coming soon ]` badge instead of a dead link; flip it to a real URL in one edit once a repo goes public. `education` and `experience` share a `TimelineEntry` shape (`{ title, org, period, description, highlight? }`) rendered by `Experience.tsx`.
- **API/terminal motifs:** the site's visual identity treats routes as endpoints. `SectionHeading` takes `{ path: SectionPath; title: string; method?: "GET" | "POST" }` and renders a mono `GET /path 200 OK` request line above the `<h2>` — `Contact` is the one section that passes `method="POST"`. `Nav` renders links as `GET /path`, `Hero` opens with an `HTTP/1.1 200 OK` status line and a JSON "response body" card built from `profile`, and `not-found.tsx`/`error.tsx` mock `404`/`500` responses. Keep this as seasoning on top of a polished portfolio, not the whole design.
- **Reveal-on-scroll pattern:** `src/components/Reveal.tsx` is a shared `"use client"` wrapper around Framer Motion. Default `mode="inView"` animates once via `whileInView` (fade + rise); `mode="mount"` instead uses `initial`/`animate` for content that should animate immediately on load (used by `Hero`, since it's above the fold). Section components wrap repeated list items in `<Reveal delay={i * 0.1}>` to stagger entrance animations — follow this pattern for any new animated list content instead of adding ad hoc motion logic per component. `MotionProvider` wraps the root layout's `{children}` in Framer Motion's `<MotionConfig reducedMotion="user">` so every `Reveal` instance respects `prefers-reduced-motion` without each call site opting in. Never wrap a component in `motion(...)` directly (deprecated in framer-motion 12) — reuse `Reveal`, or use `motion.create()` if a one-off is unavoidable.
- **Server/client split:** `Nav`, `Hero`, `Reveal`, `MotionProvider`, and `error.tsx` are `"use client"`; every other component (including `ContactLinks`, `SectionHeading`, and all section/page components) is a server component. `ContactLinks` centralizes the GitHub/LinkedIn link markup shared by `Contact` and `Footer`.
- **Styling:** Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css`, with a small custom theme (`--color-background`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-accent`, `--color-danger`) declared with `@theme inline` and consumed as Tailwind utilities (`bg-background`, `text-muted`, `border-border`, `text-danger`, etc.). `--accent-glow` (a low-alpha `color-mix` of `--accent`) is used for the `Hero` background glow instead of a hardcoded `rgba(...)` value. `animate-blink` (`@theme inline`'s `--animate-blink`, used for `Nav`'s terminal cursor) is disabled under `prefers-reduced-motion: reduce`. Dark, near-black background with a light-blue accent is the intended look — reuse the theme tokens rather than hardcoding colors. Fonts are `next/font/google` Geist Sans/Mono, exposed as CSS variables and wired into the same `@theme inline` block; `font-sans` is applied on `<body>` in the layout.
- Voice for site copy: plain, direct, first-person; Mats is backend-focused but flexible across the stack — no invented CV details, no flowery phrasing.

## Workflow rules
- For non-trivial features or multi-file changes, use the planner subagent first and wait for approval of the plan.
- After modifying code, use the test-runner subagent to verify, then the code-reviewer subagent before finishing.
- Before merging changes to auth, input handling, or endpoints, use the security-auditor subagent.
- For any library question, use the docs-researcher subagent instead of guessing from memory.
- Never commit unless explicitly asked. Use the commit-writer subagent for messages.

## Token-efficiency rules
- If my request is a code task but names no specific files, directories, or symbols: ask me ONE short question to narrow the target before searching the codebase, and remind me that naming files directly is cheaper. If I answer "just search", proceed and don't ask again this session.
- Keep responses concise. Don't re-print file contents I can open myself; reference paths and line numbers.
- Don't re-read files already read this session unless they may have changed.
- When output of a command is long (test runs, logs), pipe to a file and grep it rather than dumping it into context.

## Gotchas
- This Next.js version (16.2.10) has breaking changes from what training data may assume — see `AGENTS.md`: read the relevant guide in `node_modules/next/dist/docs/` before writing any code, and heed deprecation notices.