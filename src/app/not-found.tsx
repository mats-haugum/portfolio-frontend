import type { Metadata } from "next";
import Link from "next/link";
import { nav } from "@/lib/data";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-6 pb-32 pt-40 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">
        HTTP/1.1 404 Not Found
      </p>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Route not found
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted sm:text-base">
        The page you requested doesn&apos;t exist. Here are the routes that
        do.
      </p>

      <div className="mt-10 w-full max-w-md rounded-2xl border border-border bg-background/40 p-6 text-left font-mono text-xs leading-relaxed text-muted sm:text-sm">
        <p>{"{"}</p>
        <p className="pl-4">
          <span className="text-accent">&quot;available_routes&quot;</span>: [
        </p>
        {nav.map((item, i) => (
          <p key={item.href} className="pl-8">
            <Link
              href={item.href}
              className="text-foreground transition-colors hover:text-accent"
            >
              &quot;{item.href}&quot;
            </Link>
            {i < nav.length - 1 ? "," : ""}
          </p>
        ))}
        <p className="pl-4">]</p>
        <p>{"}"}</p>
      </div>
    </section>
  );
}
