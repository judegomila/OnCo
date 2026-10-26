import { frontSchematicFor, hasFrontAnimation } from "@/data/schematics";
import { graph } from "@/lib/graph";
import { Wireframe3D } from "./Wireframe3D";
import { SchematicThumb } from "./SchematicThumb";

/**
 * Animated wireframe schematic for a front (section). Full mode: card with a caption row.
 * Compact mode: bare thumbnail (no caption box, ~30 fps) for index grids.
 */
export function FrontSchematic({ sectionId, height, compact = false }: { sectionId: string; height?: string; compact?: boolean }) {
  // A thumbnail names its drawing and the browser builds it near the screen (SchematicThumb); only the full form carries geometry.
  if (compact) return <SchematicThumb spec={{ kind: "front", id: sectionId }} height={height ?? "h-32"} speed={0.22} />;
  const mesh = frontSchematicFor(sectionId);
  const animated = hasFrontAnimation(sectionId);
  const front = graph().get(sectionId);
  return (
    <div className="card overflow-hidden">
      <Wireframe3D mesh={mesh} height={height ?? "h-72 sm:h-[26rem]"} speed={0.18} />
      <div className="px-4 py-3 border-t border-border text-sm flex flex-wrap items-baseline justify-between gap-2">
        <div><span className="font-medium">{front?.name ?? sectionId}: how this front works</span><span className="text-muted"> · {animated ? "animated" : "generic"} schematic, not to scale</span></div>
      </div>
    </div>
  );
}
