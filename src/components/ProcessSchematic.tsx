import Link from "next/link";
import type { Entity } from "@/lib/schema";
import { routeFor } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { animatedFor, hasAnimation } from "@/data/schematics";
import { Wireframe3D } from "./Wireframe3D";

/**
 * Animated process schematic for a technology, or for a product via its first technology that has one
 * (ADC internalisation, CAR-T killing, radioligand decay, checkpoint release, engager bridging, mRNA vaccine).
 * Renders nothing if no animated schematic applies, so it is safe to place anywhere.
 */
export function ProcessSchematic({ entity, height }: { entity: Entity; height?: string }) {
  const g = graph();
  const techIds = entity.kind === "technology" ? [entity.id] : entity.technologies;
  const techId = techIds.find((id) => hasAnimation(id));
  if (!techId) return null;
  const tech = g.get(techId);
  const mesh = animatedFor(techId);
  if (!mesh || !tech) return null;
  return (
    <div className="card overflow-hidden">
      <Wireframe3D mesh={mesh} height={height ?? "h-64 sm:h-80"} speed={0.18} />
      <div className="px-4 py-3 border-t border-border text-sm flex flex-wrap items-baseline justify-between gap-2">
        <div><span className="font-medium">How it works, step by step</span><span className="text-muted"> · animated schematic, not to scale</span></div>
        {entity.kind !== "technology" && <Link href={routeFor(tech)} className="text-xs underline text-muted">{tech.name} →</Link>}
      </div>
    </div>
  );
}
