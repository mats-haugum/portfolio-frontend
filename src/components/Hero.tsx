"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,var(--accent-glow),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <Reveal mode="mount" delay={0}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          HTTP/1.1 200 OK
        </p>
      </Reveal>

      <Reveal mode="mount" delay={0.1}>
        <h1 className="mt-6 text-6xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl">
          {profile.name}
        </h1>
      </Reveal>

      <Reveal mode="mount" delay={0.25} className="mt-8 max-w-xl">
        <p className="text-sm text-muted sm:text-base">{profile.summary}</p>
      </Reveal>

      <Reveal
        mode="mount"
        delay={0.35}
        className="mt-10 w-full max-w-2xl rounded-2xl border border-border bg-background/40 p-6 text-left font-mono text-xs leading-relaxed text-muted sm:text-sm"
      >
        <p>{"{"}</p>
        <p className="pl-4">
          <span className="text-accent">&quot;role&quot;</span>
          {": "}
          <span className="text-foreground">&quot;{profile.role}&quot;</span>,
        </p>
        <p className="pl-4">
          <span className="text-accent">&quot;stack&quot;</span>
          {": "}
          <span className="text-foreground">
            [&quot;{profile.stack.join('", "')}&quot;]
          </span>
          ,
        </p>
        <p className="pl-4">
          <span className="text-accent">&quot;interests&quot;</span>
          {": "}
          <span className="text-foreground">
            [&quot;{profile.interests.join('", "')}&quot;]
          </span>
          ,
        </p>
        <p className="pl-4">
          <span className="text-accent">&quot;open_to_work&quot;</span>
          {": "}
          <span className="text-foreground">true</span>
        </p>
        <p>{"}"}</p>
      </Reveal>

      <Reveal mode="mount" delay={0.45}>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          GET /projects →
        </Link>
      </Reveal>
    </section>
  );
}
