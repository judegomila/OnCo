"use client";

import { useEffect, useState } from "react";
import type { Target } from "@/lib/schema";
import type { Mesh } from "@/lib/wireframe";
import { Wireframe3D } from "./Wireframe3D";

/**
 * Animated wireframe schematic for a target: what it is and how drugs act on it. Mirrors TechSchematic.
 * Client component: the scene is built here (animation frames are functions, so they cannot be sent
 * from a server component), which also means callers need not register anything in data/schematics.ts.
 * Pass the whole Target or just `{ id, name, targetClass, tldr }`.
 *
 * The scene builders (src/data/target-animations.ts, which brings the shared animated-wave set with it, about
 * 1 MB of script) are fetched when the first schematic mounts rather than imported statically: EntityDetail
 * references this component for every record page, so a static import shipped them with every entity page.
 * Until they arrive the canvas is drawn empty at its final height.
 */
export type TargetSchematicTarget = Pick<Target, "id" | "name" | "targetClass" | "tldr">;

const EMPTY: Mesh = { points: [], segments: [] };

const ROLES: Array<{ role: string; meaning: string; cls: string; color?: string }> = [
  { role: "Target", meaning: "the protein and the cell it sits on", cls: "text-foreground" },
  { role: "Drug", meaning: "antibody, small molecule, cell or radioligand", cls: "text-accent" },
  { role: "Effect", meaning: "signal, damage or kill", cls: "", color: "#d97706" },
];

export function TargetSchematic({ target, compact = false, height }: { target: TargetSchematicTarget; compact?: boolean; height?: string }) {
  const [built, setBuilt] = useState<{ id: string; mesh: Mesh; specific: boolean } | null>(null);
  const { id, targetClass } = target;
  useEffect(() => {
    let live = true;
    import("@/data/target-animations").then((m) => { if (live) setBuilt({ id, ...m.targetSchematicFor({ id, targetClass }) }); });
    return () => { live = false; };
  }, [id, targetClass]);
  const ready = built?.id === target.id ? built : null;
  const mesh = ready?.mesh ?? EMPTY;
  if (compact) return <Wireframe3D mesh={mesh} compact height={height ?? "h-28"} speed={0.22} />;
  return (
    <div className="card overflow-hidden">
      <Wireframe3D mesh={mesh} height={height ?? "h-72 sm:h-[26rem]"} speed={0.18} />
      <div className="px-4 py-3 border-t border-border text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <span className="font-medium">{target.name}: what it is and how drugs act on it</span>
            <span className="text-muted"> · animated {ready && !ready.specific ? "generic " : ""}schematic, not to scale</span>
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
