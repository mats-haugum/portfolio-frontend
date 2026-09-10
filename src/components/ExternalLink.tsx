import type { ReactNode } from "react";

// Opens in a new tab. Keeps the rel pair and the "new tab" hint in one place so
// every outbound link on the site behaves the same way.
export default function ExternalLink({
  href,
  children,
  className = "font-mono text-sm text-muted transition-colors hover:text-accent",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Lets an ancestor card detect "the pointer is on a link that leaves the
      // site" via :has(), so it can drop its own hover state.
      data-external=""
      className={className}
    >
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
