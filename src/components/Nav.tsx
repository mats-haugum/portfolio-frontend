"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight text-foreground"
        >
          {profile.name.replace(/\s+/g, "")}
          <span className="text-accent">.</span>
          <span className="animate-pulse text-accent">_</span>
        </Link>

        <nav className="hidden gap-8 sm:flex">
          {nav.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group font-mono text-xs tracking-widest uppercase transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                <sup className="mr-1 text-[10px] text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </sup>
                {`// ${item.label}`}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
