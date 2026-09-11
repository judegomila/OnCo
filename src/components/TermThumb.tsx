"use client";

import Link from "next/link";
import { TermSchematic } from "./TermSchematic";

/** Small animated category schematic beside a glossary term in tables; links to the term page. */
export function TermThumb({ category, name, route, className = "h-10 w-14" }: { category: string; name: string; route: string; className?: string }) {
  return (
    <Link href={route} aria-label={`${name} schematic`} className={`inline-flex shrink-0 overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      <TermSchematic category={category} compact height="h-full w-full" />
    </Link>
  );
}
