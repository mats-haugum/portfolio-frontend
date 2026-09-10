import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectLinks from "@/components/ProjectLinks";
import ProjectFigure from "@/components/ProjectFigure";
import { profile, type CaseStudy, type Project } from "@/lib/data";

export default function ProjectCaseStudy({
  project,
}: {
  project: Project & { caseStudy: CaseStudy };
}) {
  const { caseStudy } = project;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "BusinessApplication",
    ...(project.demo ? { url: project.demo } : {}),
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SectionHeading
        as="h1"
        path={`/projects/${project.slug}`}
        title={project.title}
      />

      <Reveal>
        <p className="font-mono text-xs text-muted">{project.context}</p>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
          {caseStudy.overview}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <ProjectLinks
          project={project}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <Link
            href="/projects"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden="true">←</span> back to /projects
          </Link>
        </ProjectLinks>

        {project.demoNote ? (
          <p className="mt-3 font-mono text-xs text-muted">
            {project.demoNote}
          </p>
        ) : null}
      </Reveal>

      {caseStudy.sections.map((section, i) => (
        <Reveal key={section.heading} delay={i * 0.1} className="mt-20">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {section.heading}
          </h2>

          {section.body.map((paragraph, j) => (
            <p
              key={j}
              className="mt-4 max-w-3xl text-sm leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}

          <div
            className={
              section.media.length > 1
                ? "mt-6 grid gap-6 md:grid-cols-2"
                : "mt-6"
            }
          >
            {section.media.map((item, j) => (
              <ProjectFigure
                key={item.src}
                item={item}
                preload={i === 0 && j === 0}
                sizes={
                  section.media.length > 1
                    ? "(min-width: 768px) 50vw, 100vw"
                    : "(min-width: 1024px) 1120px, 100vw"
                }
              />
            ))}
          </div>
        </Reveal>
      ))}
    </section>
  );
}
