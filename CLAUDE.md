# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript rulesets)

No test runner is configured in this repo.

## Architecture

Multi-route portfolio site built with the Next.js App Router: five routes — `/`, `/expertise`, `/projects`, `/experience`, `/contact` — each a thin `page.tsx` that exports route `metadata` (title flows through the root layout's template) and renders a single section component (`Hero`, `Expertise`, `Projects`, `Experience`, `Contact`) with no `<main>` wrapper of its own. `src/app/layout.tsx` owns the shared chrome: it renders the skip link (first `<body>` child), the JSON-LD `Person` script (built from `profile`/`contact`/`siteUrl` in `src/lib/data.ts`), `Nav`, the single `<main id="main">` that every page's content renders into (wrapped in `MotionProvider`), and `Footer`. `src/app/not-found.tsx` (mock `404` response) and `src/app/error.tsx` (mock `500` response with a retry button, `"use client"`) are present; `global-error.tsx`, `loading.tsx`, and View Transitions are intentionally absent (see the revamp plan for rationale — no async work to gate on, and a global error page would have to duplicate the root `<html>`/`<body>`).

**Content vs. presentation split:** all copy (nav, profile, expertise, projects, education, experience, contact) lives in `src/lib/data.ts` as typed arrays/objects — real CV content, not placeholders. Components import from this file and map over it; components hold no copy of their own. Notable typed conventions: `nav` is declared `as const satisfies readonly NavItem[]` so `export type SectionPath = (typeof nav)[number]["href"]` yields a literal union, consumed by `SectionHeading`'s `path` prop. `Project.href` is typed `string | null` — `null` is the deliberate "repo not public yet" state that `Projects` renders as a muted `[ repo coming soon ]` badge instead of a dead link; flip it to a real URL in one edit once a repo goes public. `education` and `experience` share a `TimelineEntry` shape (`{ title, org, period, description, highlight? }`) rendered by `Experience.tsx`. When updating site content, edit `src/lib/data.ts`; when changing layout/behavior, edit the component.

**API/terminal motifs:** the site's visual identity treats routes as endpoints. `SectionHeading` (`src/components/SectionHeading.tsx`) takes `{ path: SectionPath; title: string; method?: "GET" | "POST" }` and renders a mono `GET /path 200 OK` request line above the `<h2>` — `Contact` is the one section that passes `method="POST"`. `Nav` renders links as `GET /path`, `Hero` opens with an `HTTP/1.1 200 OK` status line and a JSON "response body" card built from `profile`, and `not-found.tsx`/`error.tsx` mock `404`/`500` responses. Keep this as seasoning on top of a polished portfolio, not the whole design.

**Reveal-on-scroll pattern:** `src/components/Reveal.tsx` is a shared `"use client"` wrapper around Framer Motion. Default `mode="inView"` animates once via `whileInView` (fade + rise); `mode="mount"` instead uses `initial`/`animate` for content that should animate immediately on load (used by `Hero`, since it's above the fold). Section components wrap repeated list items in `<Reveal delay={i * 0.1}>` to stagger entrance animations — follow this pattern for any new animated list content instead of adding ad hoc motion logic per component. `MotionProvider` (`src/components/MotionProvider.tsx`, `"use client"`) wraps the root layout's `{children}` in Framer Motion's `<MotionConfig reducedMotion="user">` so every `Reveal` instance respects `prefers-reduced-motion` without each call site opting in. Never wrap a component in `motion(...)` directly (deprecated in framer-motion 12) — reuse `Reveal`, or use `motion.create()` if a one-off is unavoidable.

**Server/client split:** `Nav`, `Hero`, `Reveal`, `MotionProvider`, and `error.tsx` are `"use client"`; every other component (including `ContactLinks`, `SectionHeading`, and all section/page components) is a server component. `ContactLinks` (`src/components/ContactLinks.tsx`) centralizes the GitHub/LinkedIn link markup shared by `Contact` and `Footer`.

**Styling:** Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css`, with a small custom theme (`--color-background`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-accent`, `--color-danger`) declared with `@theme inline` and consumed as Tailwind utilities (`bg-background`, `text-muted`, `border-border`, `text-danger`, etc.). `--accent-glow` (a low-alpha `color-mix` of `--accent`) is used for the `Hero` background glow instead of a hardcoded `rgba(...)` value. `animate-blink` (`@theme inline`'s `--animate-blink`, used for `Nav`'s terminal cursor) is disabled under `prefers-reduced-motion: reduce`. Dark, near-black background with a light-blue accent is the intended look — reuse the theme tokens rather than hardcoding colors. Fonts are `next/font/google` Geist Sans/Mono, exposed as CSS variables and wired into the same `@theme inline` block; `font-sans` is applied on `<body>` in the layout.

Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
