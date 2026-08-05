import { contact } from "@/lib/data";

export default function ContactLinks({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex flex-wrap gap-6"}>
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
  );
}
