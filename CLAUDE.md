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

Single-page portfolio site built with the Next.js App Router. There is only one route: `src/app/page.tsx` renders `Nav` followed by a `<main>` that stacks section components in order — `Hero`, `Expertise`, `Work`, `Experience`, `Contact`. Each section is its own component in `src/components/`, targeted by an anchor id (`#home`, `#expertise`, `#work`, `#experience`, `#contact`) matching the nav links defined in `src/lib/data.ts`.

**Content vs. presentation split:** all copy (nav labels, profile summary, expertise cards, projects, experience, contact links) lives in `src/lib/data.ts` as typed data arrays/objects, currently filled with placeholder content ("Your Name", "Project One", etc.). Components import from this file and map over it — components hold no copy of their own. When updating site content, edit `src/lib/data.ts`; when changing layout/behavior, edit the component.

**Reveal-on-scroll pattern:** `src/components/Reveal.tsx` is a shared `"use client"` wrapper around Framer Motion's `whileInView` animation (fade + rise, animates once). Section components wrap repeated list items in `<Reveal delay={i * 0.1}>` to stagger entrance animations — follow this pattern for any new animated list content instead of adding ad hoc motion logic per component.

**Styling:** Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css`, with a small custom theme (`--color-background`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-accent`) declared with `@theme inline` and consumed as Tailwind utilities (`bg-background`, `text-muted`, `border-border`, etc.). Dark, near-black background with a light-blue accent is the intended look — reuse the theme tokens rather than hardcoding colors. Fonts are `next/font/google` Geist Sans/Mono, exposed as CSS variables and wired into the same `@theme inline` block.

Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
