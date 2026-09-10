import { graph } from "./graph";
import { REL_FIELDS, routeFor, type Entity, type Kind } from "./schema";

/** `blurb` is the first sentence of the TL;DR, clipped, so the explorer's side panel can describe a node without shipping the whole corpus. */
export type GraphNode = { id: string; kind: Kind; name: string; route: string; degree: number; blurb: string };
export type GraphEdge = [number, number];
export type GraphData = { nodes: GraphNode[]; edges: GraphEdge[] };

/** Every outgoing link of an entity, mirroring graph.ts. */
export function outgoingIds(e: Entity): string[] {
  const out: string[] = [];
  for (const f of REL_FIELDS) out.push(...e[f]);
  if (e.kind === "pairing") out.push(e.a, e.b);
  if (e.kind === "roadmap") for (const s of e.steps) out.push(...s.refs);
  if (e.kind === "cancer") {
    for (const h of e.history) out.push(...h.refs);
    out.push(...e.pipeline);
    for (const s of e.standardOfCare) out.push(...s.refs);
  }
  if (e.kind === "pathway") for (const n of e.nodes) if (n.targetId) out.push(n.targetId);
  return out;
}

/** First sentence of a TL;DR (or all of it when it is one sentence), clipped to `max` characters on a word boundary. */
export function blurbOf(tldr: string, max = 160): string {
  const s = tldr.replace(/\s+/g, " ").trim();
  const m = /^(.{20,}?[.!?])(?=\s+["'(A-Z]|$)/.exec(s);
  let out = m ? m[1] : s;
  if (out.length > max) out = out.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
  return out;
}

/** Compact node/edge lists for the client-side graph explorer. Edges are undirected and de-duplicated. */
export function graphData(): GraphData {
  const g = graph();
  const nodes: GraphNode[] = g.entities.map((e) => ({ id: e.id, kind: e.kind, name: e.name, route: routeFor(e), degree: g.degree(e.id), blurb: blurbOf(e.tldr) }));
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const seen = new Set<string>();
  const edges: GraphEdge[] = [];
  for (const e of g.entities) {
    const a = index.get(e.id)!;
    for (const to of outgoingIds(e)) {
      const b = index.get(to);
      if (b === undefined || b === a) continue;
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push(a < b ? [a, b] : [b, a]);
    }
  }
  return { nodes, edges };
}
