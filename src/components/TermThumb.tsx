"use client";

import Link from "next/link";
import { useRef } from "react";
import { useLazySchematic } from "@/lib/schematics-loader";
import { Wireframe3D } from "./Wireframe3D";

/**
 * Small animated category schematic beside a glossary term in tables; links to the term page. The box keeps its size
 * while the drawing loads. Like TechThumb, the schematic builders load on demand once the thumbnail is near the
 * screen and the page has settled. This thumbnail used to render TermSchematic, a server component, which imported
 * src/data/schematics.ts statically and so put about 2.4 MB of scene and record script in the first download of
 * every page with a glossary or kind table, /cancers/ included.
 */
export function TermThumb({ category, name, route, className = "h-10 w-14" }: { category: string; name: string; route: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mesh = useLazySchematic(ref, category, (m) => (m.hasTermAnimation(category) ? m.termSchematicFor(category) : null));
  return (
    <Link ref={ref} href={route} aria-label={`${name} schematic`} className={`inline-flex shrink-0 overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      {mesh && <Wireframe3D mesh={mesh} compact height="h-full w-full" speed={0.22} />}
    </Link>
  );
}
