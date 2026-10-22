"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Mesh } from "@/lib/wireframe";
import { Wireframe3D } from "./Wireframe3D";

/**
 * Like TechThumb: the schematic builders load once the page has loaded and the browser is idle. This thumbnail used
 * to render TermSchematic, a server component, which imported src/data/schematics.ts statically and so put about
 * 2.4 MB of scene and record script in the first download of every page with a glossary or kind table, /cancers/ included.
 */
let schematics: Promise<typeof import("@/data/schematics")> | null = null;
function loadSchematics() {
  schematics ??= new Promise<void>((resolve) => {
    const idle = () => (typeof requestIdleCallback === "function" ? requestIdleCallback(() => resolve(), { timeout: 3000 }) : window.setTimeout(resolve, 1000));
    if (document.readyState === "complete") idle(); else window.addEventListener("load", idle, { once: true });
  }).then(() => import("@/data/schematics"));
  return schematics;
}

/** Small animated category schematic beside a glossary term in tables; links to the term page. The box keeps its size while the drawing loads. */
export function TermThumb({ category, name, route, className = "h-10 w-14" }: { category: string; name: string; route: string; className?: string }) {
  const [mesh, setMesh] = useState<Mesh | null>(null);
  useEffect(() => {
    let live = true;
    void loadSchematics().then((m) => { if (live && m.hasTermAnimation(category)) setMesh(m.termSchematicFor(category)); });
    return () => { live = false; };
  }, [category]);
  return (
    <Link href={route} aria-label={`${name} schematic`} className={`inline-flex shrink-0 overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      {mesh && <Wireframe3D mesh={mesh} compact height="h-full w-full" speed={0.22} />}
    </Link>
  );
}
