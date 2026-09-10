"use client";

import Link from "next/link";
import { Wireframe3D } from "./Wireframe3D";
import { schematicFor } from "@/data/schematics";

/** Small rotating schematic beside a technology name in tables; links to the technology page. */
export function TechThumb({ id, sections, name, route, className = "h-10 w-14" }: { id: string; sections: string[]; name: string; route: string; className?: string }) {
  const { mesh } = schematicFor(id, sections);
  return (
    <Link href={route} aria-label={`${name} schematic`} className={`inline-flex shrink-0 overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      <Wireframe3D mesh={mesh} compact height="h-full w-full" speed={0.22} />
    </Link>
  );
}
