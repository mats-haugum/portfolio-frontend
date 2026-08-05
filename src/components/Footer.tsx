import { contact } from "@/lib/data";
import ContactLinks from "@/components/ContactLinks";

export default function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-6xl border-t border-border/60 px-6 py-8 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a
          href={`mailto:${contact.email}`}
          className="font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          {contact.email}
        </a>

        <ContactLinks />
      </div>

      <p className="mt-6 font-mono text-xs text-muted">
        © {new Date().getFullYear()} — Built with Next.js
      </p>
    </footer>
  );
}
