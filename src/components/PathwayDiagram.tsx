import type { Pathway } from "@/lib/schema";
import { pathwayView } from "@/lib/pathway-products";
import { PathwayDiagramInteractive } from "./PathwayDiagramInteractive";

/**
 * Pathway diagram. Server component: resolves the products that hit the pathway's druggable nodes
 * and hands everything to the interactive client renderer (which also server-renders its static SVG).
 */
export function PathwayDiagram({ p }: { p: Pathway }) {
  return <PathwayDiagramInteractive view={pathwayView(p)} />;
}
