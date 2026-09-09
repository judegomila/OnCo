"use client";

import { useMemo } from "react";
import type { Target } from "@/lib/schema";
import { targetSchematicFor } from "@/data/target-animations";
import { Wireframe3D } from "./Wireframe3D";

/**
 * Animated wireframe schematic for a target: what it is and how drugs act on it. Mirrors TechSchematic.
 * Client component: the scene is built here (animation frames are functions, so they cannot be sent
 * from a server component), which also means callers need not register anything in data/schematics.ts.
 * Pass the whole Target or just `{ id, name, targetClass, tldr }`.
 */
export type TargetSchematicTarget = Pick<Target, "id" | "name" | "targetClass" | "tldr">;

const ROLES: Array<{ role: string; meaning: string; cls: string; color?: string }> = [
  { role: "Target", meaning: "the protein and the cell it sits on", cls: "text-foreground" },
  { role: "Drug", meaning: "antibody, small molecule, cell or radioligand", cls: "text-accent" },
  { role: "Effect", meaning: "signal, damage or kill", cls: "", color: "#d97706" },
];

export function TargetSchematic({ target, compact = false, height }: { target: TargetSchematicTarget; compact?: boolean; height?: string }) {
  const { mesh, specific } = useMemo(() => targetSchematicFor(target), [target]);
  if (compact) return <Wireframe3D mesh={mesh} compact height={height ?? "h-28"} speed={0.22} />;
  return (
    <div className="card overflow-hidden">
      <Wireframe3D mesh={mesh} height={height ?? "h-72 sm:h-[26rem]"} speed={0.18} />
      <div className="px-4 py-3 border-t border-border text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <span className="font-medium">{target.name}: what it is and how drugs act on it</span>
            <span className="text-muted"> · animated {specific ? "" : "generic "}schematic, not to scale</span>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Legend">
            {ROLES.map((r) => (
              <li key={r.role} className="flex items-center gap-1.5">
                <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden="true" className={r.cls} style={r.color ? { color: r.color } : undefined}>
                  <line x1="1" y1="4" x2="17" y2="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span><span className="font-medium text-foreground">{r.role}</span> · {r.meaning}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted max-w-3xl"><span className="font-medium text-foreground">In plain words</span> · {target.tldr}</p>
      </div>
    </div>
  );
}
