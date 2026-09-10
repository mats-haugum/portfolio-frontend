import Link from "next/link";
import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectLinks from "@/components/ProjectLinks";

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10"
    >
      <SectionHeading path="/projects" title="Selected projects" />

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 0.1}
            // The card reads as one affordance for the case study, so it and the
            // case-study link light up together. Hovering an outbound link
            // (live demo / view repo) releases both — you're headed elsewhere.
            className="group relative overflow-hidden rounded-2xl border border-border transition-colors hover:border-foreground/30 has-[[data-external]:hover]:border-border"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-background/40 px-6 py-3 font-mono text-xs uppercase tracking-widest">
              <span className="text-muted">
                <span className="text-accent">GET</span> /projects/
                {project.slug}
              </span>
              <span className="text-muted">200 OK</span>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {project.context}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <ProjectLinks project={project}>
                {project.caseStudy ? (
                  // after:inset-0 stretches this link over the whole card, so
                  // clicking anywhere opens the case study. It's an overlay on
                  // the real link rather than an <a> wrapping the card, which
                  // would nest anchors and break the outbound links inside.
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-mono text-sm text-accent transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-foreground group-has-[[data-external]:hover]:text-accent"
                  >
                    read the case study <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </ProjectLinks>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
