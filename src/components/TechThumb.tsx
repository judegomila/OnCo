"use client";

import Link from "next/link";
import { useRef } from "react";
import { useLazySchematic } from "@/lib/schematics-loader";
import { Wireframe3D } from "./Wireframe3D";

/**
 * Small rotating schematic beside a technology name in tables; links to the technology page. The box keeps its size
 * while the drawing loads. The schematic builders (src/data/schematics.ts and the scene files behind it, about 1 MB of
 * script) load on demand once a thumbnail is near the screen and the page has settled (src/lib/schematics-loader.ts),
 * shared by every thumbnail on the page. Imported statically they were in the first download of every page with a
 * technology table, home included, and their records came with them.
 */
export function TechThumb({ id, sections, name, route, className = "h-10 w-14" }: { id: string; sections: string[]; name: string; route: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const key = `${id}|${sections.join(" ")}`;
  const mesh = useLazySchematic(ref, key, (m) => m.schematicFor(id, sections).mesh);
  return (
    <Link ref={ref} href={route} aria-label={`${name} schematic`} className={`inline-flex shrink-0 overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      {mesh && <Wireframe3D mesh={mesh} compact height="h-full w-full" speed={0.22} />}
    </Link>
  );
}
