import { KINDS, KIND_META, type Kind } from "./kinds";
import { outgoing, type Graph } from "./graph";
import { EXPLORE_KINDS } from "./explore-kinds";

/**
 * The graph of kinds: one node per kind of record (sized by how many records it has) and one edge per pair of kinds
 * (weighted by how many records of the one link to records of the other). Computed at build from the corpus graph;
 * drawn on the home page (src/components/KindGraph.tsx) and written as /api/v1/kind-graph.json (scripts/build-api.ts).
 *
 * A link is an unordered pair of distinct records where one names the other in any relationship field or structure
 * (src/lib/graph.ts, `outgoing`); a pair is counted once however many fields carry it and whichever way it points.
 * So the edge cancer–trial equals the sum over cancers of the trials in `graph().neighbours(cancer)`.
 */

export const KIND_GRAPH_URL = "/api/v1/kind-graph.json";
export const KIND_GRAPH_RULE = "Nodes: one per kind, count = records of that kind. Edges: one per pair of kinds, links = unordered pairs of distinct records, one of each kind, where either names the other in any relationship field; each pair of records is counted once. Self edges (a = b) count links between records of the same kind.";

export type KindNode = { kind: Kind; label: string; plural: string; count: number; route: string };
export type KindEdge = { a: Kind; b: Kind; links: number; href: string };
export type KindGraph = { total: number; links: number; nodes: KindNode[]; edges: KindEdge[] };
export type KindGraphFile = KindGraph & { rule: string };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const num = (n: number) => n.toLocaleString("en-GB");

/** The public name of a kind, capitalised: "Cancers", "Treatments & tests", "Key papers". */
export const kindLabel = (k: Kind): string => cap(KIND_META[k].title ?? KIND_META[k].plural);

/** Where a click on the a–b edge goes: Explore ranked for that kind when one end is cancers and Explore lists the other; else the browser of the smaller kind. */
export function edgeHref(a: Kind, b: Kind, counts: Record<Kind, number>): string {
  const other = a === "cancer" ? b : b === "cancer" ? a : null;
  if (other && other !== "cancer" && EXPLORE_KINDS.includes(other)) return other === "drug" ? "/explore/" : `/explore/?kind=${other}`;
  const small = counts[a] <= counts[b] ? a : b;
  return `/${KIND_META[small].route}/`;
}

export function kindGraph(g: Graph): KindGraph {
  const counts = Object.fromEntries(KINDS.map((k) => [k, g.kind(k).length])) as Record<Kind, number>;
  const seen = new Set<string>();
  const pairs = new Map<string, number>();
  for (const e of g.entities) {
    for (const [to] of outgoing(e)) {
      if (to === e.id) continue;
      const n = g.get(to);
      if (!n) continue;
      const key = e.id < to ? `${e.id}\u0000${to}` : `${to}\u0000${e.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const [a, b] = KINDS.indexOf(e.kind) <= KINDS.indexOf(n.kind) ? [e.kind, n.kind] : [n.kind, e.kind];
      const pk = `${a} ${b}`;
      pairs.set(pk, (pairs.get(pk) ?? 0) + 1);
    }
  }
  const nodes: KindNode[] = KINDS.filter((k) => counts[k] > 0).map((k) => ({ kind: k, label: kindLabel(k), plural: KIND_META[k].plural, count: counts[k], route: `/${KIND_META[k].route}/` }));
  const edges: KindEdge[] = [...pairs]
    .map(([pk, links]) => { const [a, b] = pk.split(" ") as [Kind, Kind]; return { a, b, links, href: edgeHref(a, b, counts) }; })
    .sort((x, y) => y.links - x.links || x.a.localeCompare(y.a) || x.b.localeCompare(y.b));
  return { total: nodes.reduce((s, n) => s + n.count, 0), links: seen.size, nodes, edges };
}

export function kindGraphFile(g: Graph): KindGraphFile {
  return { rule: KIND_GRAPH_RULE, ...kindGraph(g) };
}

/** The edges touching `k`, thickest first, excluding none: self edges read as "other <plural>". */
export function edgesOf(kg: KindGraph, k: Kind): Array<{ other: Kind; links: number }> {
  return kg.edges.filter((e) => e.a === k || e.b === k).map((e) => ({ other: e.a === k ? e.b : e.a, links: e.links })).sort((x, y) => y.links - x.links);
}

/** "Cancers link to 7,781 trials, 5,024 targets and 4,100 drugs." */
export function linksSentence(kg: KindGraph, k: Kind, top = 3): string {
  const parts = edgesOf(kg, k).slice(0, top).map(({ other, links }) => `${num(links)} ${other === k ? "other " : ""}${KIND_META[other].plural}`);
  if (!parts.length) return `${kindLabel(k)} link to nothing yet.`;
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0];
  return `${kindLabel(k)} link to ${list}.`;
}

/** "Cancers link to 7,781 trials" for the a–b edge. */
export function edgeSentence(e: KindEdge): string {
  return `${kindLabel(e.a)} link to ${num(e.links)} ${e.a === e.b ? "other " : ""}${KIND_META[e.b].plural}`;
}

/* ---------------------------------------------------------------------------------------------------------------
   Layout. Hand-tuned: six columns that read left to right from the disease through its biology, the treatments, the
   evidence and the people to the thinking about what comes next. Coordinates are in the SVG's 1040 x 530 box.
   --------------------------------------------------------------------------------------------------------------- */

export const KG_W = 1040, KG_H = 530;
export const KG_COLUMNS: Array<{ x: number; title: string }> = [
  { x: 90, title: "Disease" }, { x: 262, title: "Biology" }, { x: 440, title: "Treatment" }, { x: 620, title: "Evidence" }, { x: 800, title: "Who" }, { x: 968, title: "Direction" },
];
export const KG_POS: Record<Kind, { x: number; y: number }> = {
  cancer: { x: 90, y: 250 },
  target: { x: 262, y: 118 }, biomarker: { x: 262, y: 268 }, pathway: { x: 262, y: 408 },
  section: { x: 440, y: 52 }, drug: { x: 440, y: 160 }, technology: { x: 440, y: 306 }, pairing: { x: 440, y: 442 },
  trial: { x: 620, y: 140 }, paper: { x: 620, y: 306 }, journal: { x: 620, y: 442 },
  company: { x: 800, y: 118 }, institution: { x: 800, y: 274 }, person: { x: 800, y: 424 },
  idea: { x: 968, y: 76 }, bottleneck: { x: 968, y: 186 }, roadmap: { x: 968, y: 276 }, term: { x: 968, y: 372 }, collection: { x: 968, y: 470 },
};

/** Node radius from a count: 14 for a handful of records, 46 for the largest kind, square-root scaled. */
export const nodeRadius = (count: number, max: number): number => Math.round((14 + 32 * Math.sqrt(count / Math.max(1, max))) * 10) / 10;
/** Edge width from a link count: 0.75 for one link, 4 for the thickest, log scaled. */
export const edgeWidth = (links: number, max: number): number => Math.round((0.75 + 3.25 * (Math.log(links) / Math.log(Math.max(2, max)))) * 100) / 100;
/** Edges below this many links are not drawn (they are all in the JSON, and in every node's tooltip by rank); the drawing stays legible. */
export const KG_MIN_LINKS = 250;

/** The path of the a–b edge: an S-curve between columns, a bow to the right within a column, so parallel edges stay apart. */
export function edgePath(p: { x: number; y: number }, q: { x: number; y: number }): string {
  const [a, b] = p.x <= q.x ? [p, q] : [q, p];
  if (a.x === b.x) { const [t, u] = a.y <= b.y ? [a, b] : [b, a]; return `M${t.x} ${t.y}Q${t.x + 34} ${Math.round((t.y + u.y) / 2)} ${u.x} ${u.y}`; }
  const c = Math.round((b.x - a.x) / 2);
  return `M${a.x} ${a.y}C${a.x + c} ${a.y} ${b.x - c} ${b.y} ${b.x} ${b.y}`;
}
