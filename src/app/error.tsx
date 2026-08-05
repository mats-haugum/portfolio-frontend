"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-6 pb-32 pt-40 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">
        HTTP/1.1 500 Internal Server Error
      </p>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Something broke
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted sm:text-base">
        An unexpected error occurred while rendering this page.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        [ retry ]
      </button>
    </section>
  );
}
