import { nav } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function SectionHeading({
  label,
  title,
}: {
  label: (typeof nav)[number]["label"];
  title: string;
}) {
  const index = nav.findIndex((item) => item.label === label) + 1;

  return (
    <Reveal className="mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {String(index).padStart(2, "0")} {"//"} {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
