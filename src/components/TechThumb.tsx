"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Mesh } from "@/lib/wireframe";
import { Wireframe3D } from "./Wireframe3D";

/**
 * The schematic builders (src/data/schematics.ts and the scene files behind it, about 1 MB of script) load once the
 * page has loaded and the browser is idle, shared by every thumbnail on the page. Imported statically they were in
 * the first download of every page with a technology table, home included, and their records came with them.
 */
let schematics: Promise<typeof import("@/data/schematics")> | null = null;
function loadSchematics() {
  schematics ??= new Promise<void>((resolve) => {
    const idle = () => (typeof requestIdleCallback === "function" ? requestIdleCallback(() => resolve(), { timeout: 3000 }) : window.setTimeout(resolve, 1000));
    if (document.readyState === "complete") idle(); else window.addEventListener("load", idle, { once: true });
  }).then(() => import("@/data/schematics"));
  return schematics;
}

/** Small rotating schematic beside a technology name in tables; links to the technology page. The box keeps its size while the drawing loads. */
export function TechThumb({ id, sections, name, route, className = "h-10 w-14" }: { id: string; sections: string[]; name: string; route: string; className?: string }) {
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const key = sections.join(" ");
  useEffect(() => {
    let live = true;
    void loadSchematics().then((m) => { if (live) setMesh(m.schematicFor(id, key ? key.split(" ") : []).mesh); });
    return () => { live = false; };
  }, [id, key]);
  return (
    <Link href={route} aria-label={`${name} schematic`} className={`inline-flex shrink-0 overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      {mesh && <Wireframe3D mesh={mesh} compact height="h-full w-full" speed={0.22} />}
    </Link>
  );
}
