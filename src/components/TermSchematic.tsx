import { hasTermAnimation, termSchematicFor } from "@/data/schematics";
import { Wireframe3D } from "./Wireframe3D";
import { SchematicThumb } from "./SchematicThumb";

/**
 * Animated wireframe schematic for a glossary term category (Endpoints, Biomarkers, Genomics, …).
 * Full mode: card with a caption row. Compact mode: bare thumbnail for the /terms/ category grid.
 * Renders nothing when the category has no animation.
 */
export function TermSchematic({ category, height, compact = false }: { category: string; height?: string; compact?: boolean }) {
  if (!hasTermAnimation(category)) return null;
  if (compact) return <SchematicThumb spec={{ kind: "term", category }} height={height ?? "h-32"} speed={0.22} />;
  const mesh = termSchematicFor(category);
  return (
    <div className="card overflow-hidden">
      <Wireframe3D mesh={mesh} height={height ?? "h-64 sm:h-80"} speed={0.18} />
      <div className="px-4 py-3 border-t border-border text-sm flex flex-wrap items-baseline justify-between gap-2">
        <div><span className="font-medium">{category}: what this kind of term is about</span><span className="text-muted"> · animated schematic, not to scale</span></div>
      </div>
    </div>
  );
}
