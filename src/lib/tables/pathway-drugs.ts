import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { pathwayView, type PathwayProduct } from "@/lib/pathway-products";
import type { StaticColumn, StaticRow } from "@/components/filters/StaticTable";
import type { PathwaySection } from "@/components/PathwaySections";

/**
 * The two lists of /pathway-drugs/ (4 MB of HTML when written): the pathway matrix table and the per-pathway node
 * sections beneath it. Both are paged: the page carries the first rows and sections, the files the rest.
 */
export const PATHWAY_MATRIX_TABLE = "pathway-matrix";
export const PATHWAY_NODES_TABLE = "pathway-nodes";

export const STATUS_ORDER = ["approved", "standard-of-care", "phase-3", "positive", "phase-2", "phase-1", "preclinical", "concept"];
const short = (s: string) => s.replace(/ \(.*\)$/, "");
/** Deep link into the treatments table filtered to these targets (any of) and, optionally, one phase or status. */
export const drugsFor = (targetNames: string[], status?: string) => {
  const q = new URLSearchParams(); for (const t of targetNames) q.append("targets", short(t)); if (status) q.set("status", status);
  return `/drugs/?${q.toString()}`;
};
const best = (ps: PathwayProduct[]) => ps.map((p) => STATUS_ORDER.indexOf(p.status ?? "")).filter((i) => i >= 0).sort((a, b) => a - b)[0];

export const PATHWAY_COLUMNS: StaticColumn[] = [
  { key: "pathway", label: "Pathway" },
  { key: "nodes", label: "Nodes", sortable: true, numeric: true, className: "text-right" },
  { key: "druggable", label: "With a target", sortable: true, numeric: true, className: "text-right" },
  { key: "drugged", label: "With a drug", sortable: true, numeric: true, className: "text-right" },
  { key: "approved", label: "Approved drug", sortable: true, numeric: true, className: "text-right" },
  { key: "undrugged", label: "Undrugged", sortable: true, numeric: true, className: "text-right font-semibold" },
  { key: "gap", label: "Gap", filterable: true, order: ["Undrugged nodes", "Fully drugged", "No druggable node"], hide: "hidden lg:table-cell", className: "text-xs text-muted" },
  { key: "undruggedNodes", label: "Undrugged nodes", hide: "hidden md:table-cell", className: "text-xs text-muted" },
];

/** Every pathway with its druggability counts, most undrugged nodes first (the order of both the table and the sections). */
export function pathwayDrugViews() {
  return graph().kind("pathway").map((p) => {
    const v = pathwayView(p);
    const byNode = new Map<string, PathwayProduct[]>();
    for (const pr of v.products) for (const n of pr.nodeIds) byNode.set(n, [...(byNode.get(n) ?? []), pr]);
    const druggable = v.nodes.filter((n) => n.targetId);
    const drugged = druggable.filter((n) => (byNode.get(n.id) ?? []).length > 0);
    const approvedNodes = druggable.filter((n) => (byNode.get(n.id) ?? []).some((x) => x.status === "approved" || x.status === "standard-of-care"));
    return { p, v, byNode, druggable, drugged, undrugged: druggable.filter((n) => !(byNode.get(n.id) ?? []).length), approvedNodes, untargeted: v.nodes.filter((n) => !n.targetId) };
  }).sort((a, b) => b.undrugged.length - a.undrugged.length || b.druggable.length - a.druggable.length || a.p.name.localeCompare(b.p.name));
}
export type PathwayDrugView = ReturnType<typeof pathwayDrugViews>[number];

export function pathwayMatrixRows(views = pathwayDrugViews()): StaticRow[] {
  return views.map(({ p, v, druggable, drugged, undrugged, approvedNodes }) => ({
    id: p.id,
    pathway: { text: p.name, href: routeFor(p), strong: true, sub: "node table below" },
    nodes: { text: String(v.nodes.length), v: v.nodes.length, href: routeFor(p), title: "Pathway page with the diagram" },
    druggable: { text: String(druggable.length), v: druggable.length, href: `#${p.id}`, ext: true, title: "Nodes with a target, in the table below", className: "no-underline hover:underline" },
    drugged: drugged.length ? { text: String(drugged.length), v: drugged.length, href: drugsFor(druggable.map((n) => n.targetName ?? n.label)), className: "text-accent", title: "Open the treatments table filtered to this pathway's targets" } : { text: "0", v: 0, muted: true },
    approved: approvedNodes.length ? { text: String(approvedNodes.length), v: approvedNodes.length, href: drugsFor(approvedNodes.map((n) => n.targetName ?? n.label), "approved"), className: "text-accent", title: "Approved treatments hitting this pathway" } : { text: "0", v: 0, muted: true },
    undrugged: { text: String(undrugged.length), v: undrugged.length, href: `#${p.id}`, ext: true, className: undrugged.length ? "text-rose-700 dark:text-rose-300 no-underline hover:underline" : "text-muted no-underline hover:underline" },
    gap: undrugged.length ? "Undrugged nodes" : druggable.length ? "Fully drugged" : "No druggable node",
    undruggedNodes: undrugged.map((n) => (n.href ? { text: n.label, href: n.href } : { text: n.label })),
  }));
}

/** One section per pathway: its nodes with the products hitting each, as plain data the client component draws. */
export function pathwaySections(views = pathwayDrugViews()): PathwaySection[] {
  return views.map(({ p, v, byNode }) => ({
    id: p.id,
    name: p.name,
    route: routeFor(p),
    tldr: p.tldr,
    interventions: p.interventions,
    drugsHref: v.nodes.some((n) => n.targetId) ? drugsFor(v.nodes.filter((n) => n.targetId).map((n) => n.targetName ?? n.label)) : undefined,
    nodes: [...v.nodes].sort((a, b) => (a.targetId ? 0 : 1) - (b.targetId ? 0 : 1) || ((best(byNode.get(a.id) ?? []) ?? 99) - (best(byNode.get(b.id) ?? []) ?? 99)) || a.label.localeCompare(b.label)).map((n) => {
      const ps = (byNode.get(n.id) ?? []).slice().sort((a, b) => (STATUS_ORDER.indexOf(a.status ?? "") + 1 || 99) - (STATUS_ORDER.indexOf(b.status ?? "") + 1 || 99) || a.name.localeCompare(b.name));
      const b = best(ps);
      return {
        id: n.id,
        label: n.label,
        href: n.href,
        targetName: n.targetName,
        targeted: !!n.targetId,
        best: b !== undefined ? STATUS_ORDER[b] : undefined,
        bestHref: b !== undefined ? drugsFor([n.targetName ?? n.label], STATUS_ORDER[b]) : undefined,
        products: ps.map((x) => ({ id: x.id, name: x.name, route: x.route, status: x.status, modality: x.modality })),
      };
    }),
  }));
}
