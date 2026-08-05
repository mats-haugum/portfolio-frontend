import type { SectionPath } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function SectionHeading({
  path,
  title,
  method = "GET",
}: {
  path: SectionPath;
  title: string;
  method?: "GET";
}) {
  return (
    <Reveal className="mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {method} {path} <span className="text-muted">200 OK</span>
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
