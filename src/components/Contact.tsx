import { contact } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10">
      <SectionHeading label="contact" title="Let's talk" />

      <Reveal className="flex flex-col gap-8">
        <a
          href={`mailto:${contact.email}`}
          className="text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-5xl"
        >
          {contact.email}
        </a>

        <div className="flex flex-wrap gap-6">
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
