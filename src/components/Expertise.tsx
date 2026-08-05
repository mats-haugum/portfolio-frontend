import { expertise } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Expertise() {
  return (
    <section id="expertise" className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10">
      <SectionHeading path="/expertise" title="What I do" />

      <div className="grid gap-6 sm:grid-cols-2">
        {expertise.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.1}
            className="rounded-2xl border border-border p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
