import { contact } from "@/lib/data";
import ContactLinks from "@/components/ContactLinks";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-32 pt-40 sm:px-10">
      <SectionHeading path="/contact" title="Let's talk" method="GET" />

      <Reveal className="flex flex-col gap-8">
        <a
          href={`mailto:${contact.email}`}
          className="text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-5xl"
        >
          {contact.email}
        </a>

        <ContactLinks />
      </Reveal>
    </section>
  );
}
