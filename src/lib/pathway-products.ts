import type { Pathway } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";

export type PathwayProduct = { id: string; name: string; route: string; status?: string; modality: string; targets: string[]; nodeIds: string[] };
export type PathwayNodeView = {
  id: string; label: string; x: number; y: number;
  targetId?: string;
  /** Where the node opens: its target's page, a term or target record sharing the node id, else the pathway page. */
  href?: string;
  targetName?: string;
  /** One or two plain sentences for the hover and tap tooltip, from the linked record's TL;DR. */
  tip?: string;
  /** What the link opens: "target", "term" or "pathway". */
  opens?: string;
};
export type PathwayView = {
  id: string; name: string;
  /** The pathway's own page. */
  route: string;
  nodes: PathwayNodeView[];
  edges: Array<{ from: string; to: string; type: "activates" | "inhibits" }>;
  products: PathwayProduct[];
  interventions: string[];
};

const TIP_MAX = 220;
function clip(s: string): string {
  if (s.length <= TIP_MAX) return s;
  const cut = s.slice(0, TIP_MAX);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "));
  return (end > 80 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, "") + "…").trim();
}

/**
 * Resolve everything the interactive pathway diagram needs on the server:
 * node links and tooltips, and the products that hit any druggable node (by target id) with the node ids they hit.
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
  const route = routeFor(p);

  return {
    id: p.id, name: p.name, route,
    nodes: p.nodes.map((n) => {
      const t = n.targetId ? g.get(n.targetId) : undefined;
      if (t) return { id: n.id, label: n.label, x: n.x, y: n.y, targetId: n.targetId, href: routeFor(t), targetName: t.name, tip: clip(t.tldr), opens: "target" };
      // A node named after a record (a term, a target without a targetId) opens that record.
      const same = g.get(n.id);
      if (same && (same.kind === "term" || same.kind === "target" || same.kind === "technology")) return { id: n.id, label: n.label, x: n.x, y: n.y, href: routeFor(same), tip: clip(same.tldr), opens: same.kind };
      return { id: n.id, label: n.label, x: n.x, y: n.y, href: route, opens: "pathway" };
    }),
    edges: p.edges.map((e) => ({ from: e.from, to: e.to, type: e.type })),
    products: list,
    interventions: p.interventions,
  };
}
