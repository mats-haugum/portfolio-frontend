1. Per-route metadata with a title template
The template lives once, in the root layout (layout.tsx:19-25):


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,   // used on "/" (no override)
    template: `%s — ${profile.name}`,                 // used everywhere else
  },
  description: profile.summary,
  ...
};
Then each inner route just sets the %s part. work/page.tsx:


export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects, including ClinicBook, a clinic appointment booking system.",
};
Next.js merges these: the browser tab on /work reads "Work — Mats Haugum", substituted into the parent's %s template. Every other route (/expertise, /experience, /contact) has its own tiny metadata export the same shape. The home page has no override, so it falls back to title.default.

Why this matters: without it, all five routes would share one generic <title> — bad for SEO and for anyone with ten tabs open trying to find your work page.

metadataBase: new URL(siteUrl) matters too — it lets every other metadata field (OpenGraph images, canonical URLs) use relative paths that Next resolves against your real domain instead of localhost.

2. OpenGraph basics
Same object, layout.tsx:26-32:


openGraph: {
  title: `${profile.name} — ${profile.role}`,
  description: profile.summary,
  url: siteUrl,
  siteName: profile.name,
  type: "website",
},
This is the metadata Slack, Discord, LinkedIn, and X read to build a link preview card when someone pastes your URL. Without it, sharing your site produces a bare link with no title/description card — with it, you get a proper preview. (We didn't add an images field / opengraph-image — that was flagged in the plan as an optional stretch, cut for scope.)

3. JSON-LD Person schema
layout.tsx:35-46 builds a plain object matching schema.org's Person type, sourced from your real data (no hardcoding):


const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  sameAs: contact.links.map((link) => link.href),  // → your GitHub + LinkedIn URLs
  alumniOf: { "@type": "CollegeOrUniversity", name: "Noroff" },
};
...then injected as a script tag, layout.tsx:65-70:


<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
  }}
/>
This is invisible to a human visitor but readable by search engines and can power Google's "knowledge panel"-style rich results (linking your name to your GitHub/LinkedIn). dangerouslySetInnerHTML is normally an XSS red flag, but here it's safe because the content is JSON.stringify'd structured data we built ourselves, not user input — and the .replace(/</g, "\\u003c") escapes any < characters so nothing inside the JSON could accidentally close the <script> tag early and break out into HTML.

4. Skip-to-content link
layout.tsx:59-64, the very first element in <body>:


<a
  href="#main"
  className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:border focus:border-accent focus:bg-background focus:px-6 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-accent"
>
  Skip to content
</a>
sr-only (Tailwind) hides it visually but keeps it in the accessibility tree. focus:not-sr-only reverses that the moment it receives keyboard focus — so a sighted keyboard/switch user tabbing through the page sees a pill-shaped "Skip to content" button appear top-left, and a screen-reader user hears it announced first. Activating it jumps straight to <main id="main"> (layout.tsx:72), letting either user bypass the nav bar entirely instead of tabbing through 5 nav links (or the mobile menu button) on every single page load.

5. Visible focus rings
globals.css:37-40:


:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
:focus-visible (not plain :focus) is the key detail — it's a CSS pseudo-class the browser applies smartly: keyboard/switch navigation gets the ring, but a mouse click doesn't. So clicking a button doesn't leave an "ugly" outline around it, but tabbing to it does. This is a single global rule that gives every interactive element on the site — nav links, the CTA, the mobile menu button, external links — a consistent, on-brand (accent blue) focus indicator, instead of leaving it to the browser's default (often a thin, easy-to-miss outline, or worse, outline: none if someone had reset it).

6. prefers-reduced-motion
This one is implemented at two separate layers, for two different animation systems:

CSS animations — the blinking cursor in the nav logo uses a hand-rolled animate-blink utility (globals.css:22-35):


@theme inline {
  --animate-blink: blink 1.2s steps(1) infinite;
  @keyframes blink { 50% { opacity: 0; } }
}

@media (prefers-reduced-motion: reduce) {
  .animate-blink {
    animation: none;
  }
}
If the OS-level "reduce motion" setting is on, the media query overrides the animation to none — the cursor just stays solid instead of blinking forever.

Framer Motion animations (Reveal's fade+rise on scroll, the Hero's staggered entrance) go through MotionProvider.tsx:


"use client";
import { MotionConfig } from "framer-motion";

export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
This wraps {children} in the root layout (layout.tsx:73). MotionConfig is framer-motion's context provider — reducedMotion="user" makes it check prefers-reduced-motion itself and, if set, automatically strip transforms/opacity animations down to instant state changes for every motion.* component and Reveal (which wraps motion.div) in the tree, with zero code changes needed in Reveal, Hero, or anywhere else. That's why this needed a provider instead of an option on each component — one wrapper, whole app covered.

Why any of this matters: some users get motion sickness or vestibular issues from animated UI; the OS-level setting is their way of opting out globally, and respecting it is a baseline accessibility expectation (WCAG 2.3.3).