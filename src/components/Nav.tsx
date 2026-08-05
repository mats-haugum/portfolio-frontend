"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes (adjusting state
  // during render rather than in an effect avoids an extra render pass).
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  // Close the mobile panel on Escape.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight text-foreground"
        >
          {profile.name.replace(/\s+/g, "")}
          <span className="text-accent">.</span>
          <span className="animate-blink text-accent">_</span>
        </Link>

        <nav className="hidden gap-8 sm:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`font-mono text-xs tracking-widest uppercase transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                <span className="text-accent/70">GET</span> {item.href}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground sm:hidden"
        >
          {open ? "// close" : "// menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`flex-col gap-1 border-t border-border/60 px-6 py-4 sm:hidden ${
          open ? "flex" : "hidden"
        }`}
      >
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`py-2 font-mono text-xs tracking-widest uppercase transition-colors hover:text-foreground ${
                active ? "text-foreground" : "text-muted"
              }`}
            >
              <span className="text-accent/70">GET</span> {item.href}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
