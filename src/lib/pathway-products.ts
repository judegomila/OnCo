import type { Pathway } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { layoutPathway } from "@/lib/pathway-routing";
import { productClass } from "@/lib/product-class";

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
/**
 * The drawn diagram, laid out on the server so the browser does no routing: one box per node (same order as `nodes`),
 * one routed path per edge (same order as `edges`, null if an end is missing), the fitted canvas and the legend row.
 */
export type PathwayDrawing = {
  boxes: Array<{ cx: number; cy: number; w: number; h: number; lines: string[] }>;
  paths: Array<{ d: string; mx: number; my: number; dir: "h" | "v" } | null>;
  view: { x: number; y: number; w: number; h: number };
  legend: { x: number; y: number };
};
export type PathwayView = {
  id: string; name: string;
  /** The pathway's own page. */
  route: string;
  nodes: PathwayNodeView[];
  edges: Array<Pick<Pathway["edges"][number], "from" | "to" | "type" | "evidence">>;
  products: PathwayProduct[];
  interventions: string[];
};
export type PathwayDiagramView = PathwayView & { drawing: PathwayDrawing };

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
    if (drug.kind !== "drug" || productClass(drug) !== "medicine") return;
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
    edges: p.edges.map((e) => ({ from: e.from, to: e.to, type: e.type, ...(e.evidence ? { evidence: e.evidence } : {}) })),
    products: list,
    interventions: p.interventions,
  };
}

/** Everything the diagram needs, including its layout and routed edges (see src/lib/pathway-routing.ts). */
export function pathwayDiagramView(p: Pathway): PathwayDiagramView {
  return { ...pathwayView(p), drawing: drawingFor(p) };
}

/** A pathway is drawn on its own page and on mechanics stage pages; route it once per build. */
const drawings = new Map<string, PathwayDrawing>();
function drawingFor(p: Pathway): PathwayDrawing {
  let d = drawings.get(p.id);
  if (!d) {
    const laid = layoutPathway(p.nodes, p.edges);
    d = {
      boxes: laid.nodes.map((b) => ({ cx: b.cx, cy: b.cy, w: b.w, h: b.h, lines: b.lines })),
      paths: laid.edges.map((e) => (e ? { d: e.d, mx: e.mid.x, my: e.mid.y, dir: e.midDir } : null)),
      view: laid.view, legend: laid.legend,
    };
    drawings.set(p.id, d);
  }
  return d;
}
