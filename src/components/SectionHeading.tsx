import type { SectionPath } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function SectionHeading({
  path,
  title,
  method = "GET",
  as: Heading = "h2",
}: {
  // Widened for project case-study routes; the five nav paths stay literal.
  path: SectionPath | `/projects/${string}`;
  title: string;
  method?: "GET";
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {method} {path} <span className="text-muted">200 OK</span>
      </p>
      <Heading className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Heading>
    </Reveal>
  );
}
