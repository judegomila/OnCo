"use client";

import Link from "next/link";
import { TargetSchematic, type TargetSchematicTarget } from "./TargetSchematic";

/** Small animated target schematic beside a name in tables; links to the target page. */
export function TargetThumb({ target, route, className = "h-10 w-14" }: { target: TargetSchematicTarget; route: string; className?: string }) {
  return (
    <Link href={route} aria-label={`${target.name} schematic`} className={`inline-flex shrink-0 overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      <TargetSchematic target={target} compact height="h-full w-full" />
    </Link>
  );
}
