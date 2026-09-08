import type { Pathway } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";

export type PathwayProduct = { id: string; name: string; route: string; status?: string; modality: string; targets: string[]; nodeIds: string[] };
export type PathwayNodeView = { id: string; label: string; x: number; y: number; targetId?: string; href?: string; targetName?: string };
export type PathwayView = {
  id: string; name: string;
  nodes: PathwayNodeView[];
  edges: Array<{ from: string; to: string; type: "activates" | "inhibits" }>;
  products: PathwayProduct[];
  interventions: string[];
};

/**
 * Resolve everything the interactive pathway diagram needs on the server:
 * node links, and the products that hit any druggable node (by target id) with the node ids they hit.
 */
export function pathwayView(p: Pathway): PathwayView {
  const g = graph();
  const targetToNodes = new Map<string, string[]>();
  for (const n of p.nodes) if (n.targetId) targetToNodes.set(n.targetId, [...(targetToNodes.get(n.targetId) ?? []), n.id]);

  const products = new Map<string, PathwayProduct>();
  const add = (d: { id: string; kind: string }) => {
    if (d.kind !== "drug" || products.has(d.id)) return;
    const drug = g.must(d.id);
    if (drug.kind !== "drug") return;
    const nodeIds = [...new Set(drug.targets.flatMap((t) => targetToNodes.get(t) ?? []))];
    if (!nodeIds.length) return;
    products.set(drug.id, { id: drug.id, name: drug.name, route: routeFor(drug), status: drug.status, modality: drug.modality, targets: drug.targets, nodeIds });
  };
  // Products explicitly linked to the pathway, then any product whose target is a node here.
  for (const id of p.drugs) add(g.must(id));
  for (const t of targetToNodes.keys()) for (const d of g.incoming(t).get("drug") ?? []) add(d);

  const order = ["approved", "standard-of-care", "phase-3", "positive", "phase-2", "phase-1", "preclinical"];
  const list = [...products.values()].sort((a, b) => (order.indexOf(a.status ?? "") + 1 || 99) - (order.indexOf(b.status ?? "") + 1 || 99) || a.name.localeCompare(b.name));

  return {
    id: p.id, name: p.name,
    nodes: p.nodes.map((n) => { const t = n.targetId ? g.get(n.targetId) : undefined; return { id: n.id, label: n.label, x: n.x, y: n.y, targetId: n.targetId, href: t ? routeFor(t) : undefined, targetName: t?.name }; }),
    edges: p.edges.map((e) => ({ from: e.from, to: e.to, type: e.type })),
    products: list,
    interventions: p.interventions,
  };
}
