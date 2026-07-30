import { experience } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10"
    >
      <SectionHeading label="experience" title="Where I've worked" />

      <div className="flex flex-col gap-10">
        {experience.map((job, i) => (
          <Reveal
            key={`${job.company}-${job.role}`}
            delay={i * 0.1}
            className="grid gap-2 sm:grid-cols-[160px_1fr]"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {job.period}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {job.role} <span className="text-muted">· {job.company}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {job.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
