/** Server-side builder of the labelled graph used by paths.ts. Never import from a client component. */
import { graph } from "./graph";
import { REL_FIELDS, routeFor, type Entity } from "./schema";
import type { PathData, PathEdge } from "./paths";

/** Every outgoing link of an entity with the field that declares it, mirroring graph.ts. */
export function labelledOutgoing(e: Entity): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const f of REL_FIELDS) for (const to of e[f]) out.push([to, f]);
  if (e.kind === "pairing") out.push([e.a, "pairing"], [e.b, "pairing"]);
  if (e.kind === "roadmap") for (const s of e.steps) for (const r of s.refs) out.push([r, "roadmap"]);
  if (e.kind === "cancer") {
    for (const h of e.history) for (const r of h.refs) out.push([r, "history"]);
    for (const p of e.pipeline) out.push([p, "pipeline"]);
    for (const s of e.standardOfCare) for (const r of s.refs) out.push([r, "standardOfCare"]);
  }
  if (e.kind === "pathway") for (const n of e.nodes) if (n.targetId) out.push([n.targetId, "pathway-node"]);
  if (e.kind === "company") {
    for (const inv of e.investors) out.push([inv, "investors"]);
    if (e.acquiredBy) out.push([e.acquiredBy, "acquiredBy"]);
  }
  return out;
}

let cached: PathData | undefined;

/** Compact labelled graph: one edge per (from, to) pair, keeping the most specific label. */
export function pathData(): PathData {
  if (cached) return cached;
  const g = graph();
  const nodes = g.entities.map((e) => ({ id: e.id, kind: e.kind, name: e.name, route: routeFor(e) }));
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const vias: string[] = [];
  const viaIndex = new Map<string, number>();
  const via = (s: string) => { let i = viaIndex.get(s); if (i === undefined) { i = vias.length; vias.push(s); viaIndex.set(s, i); } return i; };
  const seen = new Set<string>();
  const edges: PathEdge[] = [];
  for (const e of g.entities) {
    const a = index.get(e.id)!;
    for (const [to, field] of labelledOutgoing(e)) {
      const b = index.get(to);
      if (b === undefined || b === a) continue;
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([a, b, via(field)]);
    }
  }
  cached = { nodes, edges, vias };
  return cached;
}
