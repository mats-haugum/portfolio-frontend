import type { ReactNode } from "react";
import ExternalLink from "@/components/ExternalLink";
import type { Project } from "@/lib/data";

// The demo / repo pair shared by the /projects cards and the case-study pages,
// so the "repo coming soon" wording and the link order live in one place.
// `children` is where each caller adds its own navigation link.
export default function ProjectLinks({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <nav
      aria-label={`${project.title} links`}
      className={className ?? "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"}
    >
      {project.demo ? (
        // The demo is the most valuable link in the row, so it's the one thing
        // that gets weight: an accent pill with a status dot, reading as a live
        // endpoint rather than as decoration.
        <ExternalLink
          href={project.demo}
          // relative z-10 keeps this above the card's stretched-link overlay in
          // Projects.tsx, so it stays clickable on its own.
          className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 font-mono text-sm text-accent shadow-[0_0_18px_-6px_var(--accent-glow-strong)] transition duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_26px_-4px_var(--accent-glow-strong)]"
        >
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          live demo
        </ExternalLink>
      ) : null}

      {project.href ? (
        <ExternalLink
          href={project.href}
          className="relative z-10 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          view repo
        </ExternalLink>
      ) : (
        <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-muted">
          [ repo coming soon ]
        </span>
      )}

      {children}
    </nav>
  );
}
