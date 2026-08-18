# Portfolio Frontend

Mats Haugum's personal portfolio site — a Next.js App Router site with an API/terminal
visual identity: routes styled as endpoints, with mock HTTP responses woven into the UI.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [Framer Motion](https://motion.dev) for scroll/mount reveal animations
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint via `eslint.config.mjs` (`eslint-config-next` core-web-vitals + TypeScript) |

There is no test runner configured in this repo.

## Structure

- `src/app/` — App Router routes: `/`, `/expertise`, `/projects`, `/experience`, `/contact`.
  Each `page.tsx` is a thin wrapper exporting route metadata and rendering one section
  component. `src/app/layout.tsx` owns shared chrome (nav, footer, JSON-LD `Person` script,
  the single `<main>`). `not-found.tsx` and `error.tsx` render mock 404/500 responses.
- `src/components/` — one component per page section (`Hero`, `Expertise`, `Projects`,
  `Experience`, `Contact`) plus shared pieces (`Reveal`, `SectionHeading`, `ContactLinks`,
  `MotionProvider`, `Nav`, `Footer`).
- `src/lib/data.ts` — all site copy (profile, nav, expertise, projects, education,
  experience, contact) as typed data. Components map over this rather than holding their
  own copy.

Content changes go in `src/lib/data.ts`; layout/behavior changes go in the relevant
component. See `CLAUDE.md` and `AGENTS.md` for the fuller set of project conventions.

## Deployment

Deployable anywhere Next.js runs, e.g. [Vercel](https://vercel.com/new).

```bash
npm run build
npm run start
```
