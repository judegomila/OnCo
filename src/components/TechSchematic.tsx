import type { Technology } from "@/lib/schema";
import { schematicFor } from "@/data/schematics";
import { Wireframe3D } from "./Wireframe3D";

/** Server wrapper: picks a specific or generic wireframe for a technology and renders it with a caption. */
export function TechSchematic({ tech }: { tech: Technology }) {
  const { mesh, specific } = schematicFor(tech.id, tech.sections);
  const labels = (mesh.labels ?? []).map((l) => l.text);
  return (
    <div className="card overflow-hidden">
      <Wireframe3D mesh={mesh} />
      <div className="px-4 py-3 border-t border-border text-sm flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <span className="font-medium">{specific ? "Schematic" : "Generic schematic"}</span>
          <span className="text-muted"> · not to scale{specific ? "" : ` · placeholder for the ${tech.sections[0]?.replace(/-/g, " ") ?? ""} front`}</span>
        </div>
        {labels.length > 0 && <div className="text-xs text-muted">{labels.join(" · ")}</div>}
      </div>
    </div>
  );
}
