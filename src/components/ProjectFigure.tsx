import Image from "next/image";
import type { ProjectMedia } from "@/lib/data";

// One screenshot or screencast from a project's case study.
// Videos never autoplay: MotionProvider's reducedMotion only covers Framer Motion,
// so a self-starting video would ignore prefers-reduced-motion.
export default function ProjectFigure({
  item,
  preload = false,
  sizes = "(min-width: 1024px) 1120px, 100vw",
}: {
  item: ProjectMedia;
  preload?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border">
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes={sizes}
          preload={preload}
          className="h-auto w-full"
        />
      ) : (
        <video
          className="h-auto w-full"
          controls
          muted
          playsInline
          preload={preload ? "metadata" : "none"}
          poster={item.poster}
          aria-label={item.alt}
          width={item.width}
          height={item.height}
        >
          <source src={item.src} type="video/webm" />
        </video>
      )}

      {item.caption || item.type === "video" ? (
        <figcaption className="border-t border-border/60 bg-background/40 px-5 py-3 font-mono text-xs text-muted">
          {item.caption}
          {item.type === "video" ? (
            <>
              {item.caption ? " · " : null}
              {/* These are webm only, so browsers that can't play VP9 (iOS Safari)
                  need a real way out. Fallback content inside <video> would never
                  render here — it only shows when the element itself is unsupported. */}
              <a
                href={item.src}
                download
                className="text-accent transition-colors hover:text-foreground"
              >
                download (WebM)
              </a>
            </>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
