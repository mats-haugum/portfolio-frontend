import { education, type TimelineEntry } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

function TimelineList({ entries }: { entries: readonly TimelineEntry[] }) {
  return (
    <div className="flex flex-col gap-10">
      {entries.map((item, i) => (
        <Reveal
          key={`${item.org}-${item.title}`}
          delay={i * 0.1}
          className="grid gap-2 sm:grid-cols-[160px_1fr]"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {item.period}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {item.title} <span className="text-muted">· {item.org}</span>
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            {item.highlight && (
              <p className="mt-2 font-mono text-xs text-accent">
                {item.highlight}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10"
    >
      <SectionHeading path="/experience" title="Where I've been" />

      <div className="flex flex-col gap-16">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
            {"// education"}
          </p>
          <TimelineList entries={education} />
        </div>

        {/* <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
            {"// work history"}
          </p>
          <TimelineList entries={experience} />
        </div> */}
      </div>
    </section>
  );
}
