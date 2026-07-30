import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10">
      <SectionHeading label="work" title="Selected work" />

      <div className="flex flex-col divide-y divide-border/60">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.1}>
            <a
              href={project.href}
              className="group flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-muted">
                  {project.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[11px] uppercase tracking-wide text-accent/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent">
                view →
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
