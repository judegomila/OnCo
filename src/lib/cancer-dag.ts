import { graph } from "./graph";
import { buildDag, layering, orderLayers, type Dag } from "./dag";
import { routeFor } from "./kinds";
import type { Cancer } from "./schema";

/**
 * The cancer map: every cancer page placed under the groupings the corpus already records, as a directed acyclic
 * graph rather than a tree, because one cancer can sit under more than one node.
 *
 * Grouping axes, all read from fields on the cancer records (nothing is invented here):
 *  - `system`: the organ-system `group` field ("haematologic", "gastrointestinal", "sarcoma" ...).
 *  - `parent`: the `parent` field, the broader cancer a subtype belongs to (pleural mesothelioma -> mesothelioma).
 *    A subtype's own `group` can differ from its parent's (GIST is gastrointestinal by site and a sarcoma by
 *    lineage; paediatric AML is paediatric by age group and a leukaemia by parent), which is what makes this a DAG.
 *  - `histology`: a small fixed vocabulary of histology words matched in the record `name` (adenocarcinoma,
 *    squamous, lymphoma ...). The schema has no histology field, so this axis is only as good as the names; a
 *    histology node is kept only when its members span at least two organ systems, since otherwise the system
 *    node already says the same thing.
 *
 * Edges point from the broader node to the narrower one. A system or histology edge is dropped when an ancestor
 * along the parent chain already carries the same grouping, so the drawing shows each fact once. Counts on a node
 * are the distinct trials, products, approved products and ideas linked to the node or anything beneath it.
 */

export const METRICS = ["trials", "drugs", "approvals", "ideas"] as const;
export type Metric = (typeof METRICS)[number];
export type Counts = Record<Metric, number>;

export type CancerDagLayer = "system" | "histology" | "cancer" | "subtype";

export type CancerDagNode = {
  /** Cancer id, or `system:<group>` / `histology:<word>` for the grouping nodes. */
  id: string;
  layer: CancerDagLayer;
  name: string;
  /** Page for the node: the cancer page, or the cancer browser filtered to the grouping. */
  route: string;
  /** Longest-path depth: 0 for groupings, 1 for cancers without a parent, 2 and more for subtypes. */
  depth: number;
  /** Organ system of a cancer node (its `group`); undefined for grouping nodes. */
  group?: string;
  counts: Counts;
  parents: string[];
  children: string[];
};

export type CancerDagEdge = { from: string; to: string; via: "system" | "parent" | "histology" };

export type CancerDagStats = {
  nodes: number;
  edges: number;
  systems: number;
  histologies: number;
  cancers: number;
  /** Cancers with a `parent`. */
  subtypes: number;
  /** Number of layers in the longest-path layering (groupings included). */
  depth: number;
  /** Cancers that sit under more than one node. */
  multiParent: number;
  /** Subtypes whose `group` differs from their parent's `group`. */
  crossSystem: number;
  edgesBy: Record<CancerDagEdge["via"], number>;
};

export type CancerDag = {
  nodes: CancerDagNode[];
  byId: Map<string, CancerDagNode>;
  edges: CancerDagEdge[];
  /** Node ids by layer after barycentre ordering, left to right from groupings to the deepest subtypes. */
  layers: string[][];
  stats: CancerDagStats;
  dag: Dag;
};

export const SYSTEM_PREFIX = "system:";
export const HISTOLOGY_PREFIX = "histology:";

/** Histology words matched against the record name. Ordered as they should be listed. */
const HISTOLOGY: Array<{ id: string; name: string; test: RegExp; q: string }> = [
  { id: "adenocarcinoma", name: "Adenocarcinoma", test: /\badenocarcinomas?\b/i, q: "adenocarcinoma" },
  { id: "squamous", name: "Squamous cell carcinoma", test: /\bsquamous\b/i, q: "squamous" },
  { id: "neuroendocrine", name: "Neuroendocrine tumours", test: /\b(neuroendocrine|carcinoids?)\b/i, q: "neuroendocrine" },
  { id: "sarcoma", name: "Sarcoma", test: /\bsarcomas?\b/i, q: "sarcoma" },
  { id: "lymphoma", name: "Lymphoma", test: /\blymphomas?\b/i, q: "lymphoma" },
  { id: "leukaemia", name: "Leukaemia", test: /\bleuk(a)?emias?\b/i, q: "leukaemia" },
  { id: "melanoma", name: "Melanoma", test: /\bmelanomas?\b/i, q: "melanoma" },
  { id: "glioma", name: "Glioma", test: /\b(gliomas?|glioblastomas?)\b/i, q: "glioma" },
  { id: "germ-cell", name: "Germ cell tumours", test: /\bgerm[ -]cell\b/i, q: "germ cell" },
  { id: "mesothelioma", name: "Mesothelioma", test: /\bmesotheliomas?\b/i, q: "mesothelioma" },
];

const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export const systemNodeId = (group: string) => `${SYSTEM_PREFIX}${group}`;
export const histologyNodeId = (word: string) => `${HISTOLOGY_PREFIX}${word}`;
/** The cancer browser filtered to one organ system (the `group` facet takes the capitalised label). */
export const systemRoute = (group: string) => `/cancers/?group=${encodeURIComponent(cap(group))}`;
/** The cancer browser searched for one histology word. */
export const histologyRoute = (word: string) => `/cancers/?q=${encodeURIComponent(word)}`;

const zero = (): Counts => ({ trials: 0, drugs: 0, approvals: 0, ideas: 0 });

/** Ancestors of a cancer along the `parent` chain, nearest first. Stops if the chain loops or leaves the corpus. */
function ancestors(c: Cancer, byId: Map<string, Cancer>): Cancer[] {
  const out: Cancer[] = [];
  const seen = new Set<string>([c.id]);
  for (let p = c.parent ? byId.get(c.parent) : undefined; p && !seen.has(p.id); p = p.parent ? byId.get(p.parent) : undefined) {
    seen.add(p.id);
    out.push(p);
  }
  return out;
}

/**
 * Build the DAG from `cancers` (the whole corpus by default). `link` supplies the linked entity ids per cancer
 * for the counts; tests pass small fixtures.
 */
export function buildCancerDag(cancers: Cancer[], link: (c: Cancer) => Record<Metric, Iterable<string>>): CancerDag {
  const byCancer = new Map(cancers.map((c) => [c.id, c]));
  const edges: CancerDagEdge[] = [];
  const nodes = new Map<string, CancerDagNode>();
  const add = (n: Omit<CancerDagNode, "counts" | "parents" | "children" | "depth">) => {
    if (!nodes.has(n.id)) nodes.set(n.id, { ...n, depth: 0, counts: zero(), parents: [], children: [] });
    return nodes.get(n.id)!;
  };

  // Systems, sorted by size so the browser and the map agree on order.
  const groups = new Map<string, Cancer[]>();
  for (const c of cancers) groups.set(c.group, [...(groups.get(c.group) ?? []), c]);
  for (const [grp] of [...groups.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))) {
    add({ id: systemNodeId(grp), layer: "system", name: cap(grp), route: systemRoute(grp) });
  }

  // Cancers and parent edges.
  for (const c of cancers) add({ id: c.id, layer: c.parent && byCancer.has(c.parent) ? "subtype" : "cancer", name: c.name, route: routeFor(c), group: c.group });
  for (const c of cancers) {
    if (c.parent && byCancer.has(c.parent) && c.parent !== c.id) edges.push({ from: c.parent, to: c.id, via: "parent" });
    // System edge unless an ancestor already sits in the same system.
    if (!ancestors(c, byCancer).some((a) => a.group === c.group)) edges.push({ from: systemNodeId(c.group), to: c.id, via: "system" });
  }

  // Histology: name-matched, pruned along the parent chain, kept only when members span two or more systems.
  for (const h of HISTOLOGY) {
    const members = cancers.filter((c) => h.test.test(c.name) && !ancestors(c, byCancer).some((a) => h.test.test(a.name)));
    if (members.length < 2 || new Set(members.map((c) => c.group)).size < 2) continue;
    add({ id: histologyNodeId(h.id), layer: "histology", name: h.name, route: histologyRoute(h.q) });
    for (const c of members) edges.push({ from: histologyNodeId(h.id), to: c.id, via: "histology" });
  }

  const dag = buildDag([...nodes.keys()], edges.map((e) => ({ from: e.from, to: e.to })));
  for (const n of nodes.values()) {
    n.parents = dag.up.get(n.id) ?? [];
    n.children = dag.down.get(n.id) ?? [];
  }
  const layerOf = layering(dag);
  for (const n of nodes.values()) n.depth = layerOf.get(n.id) ?? 0;
  const layers = orderLayers(dag, layerOf, 6);

  // Counts: union of linked ids over the node and everything beneath it (memoised; the graph is acyclic).
  const own = new Map<string, Record<Metric, Set<string>>>();
  for (const c of cancers) {
    const l = link(c);
    own.set(c.id, { trials: new Set(l.trials), drugs: new Set(l.drugs), approvals: new Set(l.approvals), ideas: new Set(l.ideas) });
  }
  const total = new Map<string, Record<Metric, Set<string>>>();
  const collect = (id: string): Record<Metric, Set<string>> => {
    const known = total.get(id);
    if (known) return known;
    const acc: Record<Metric, Set<string>> = { trials: new Set(), drugs: new Set(), approvals: new Set(), ideas: new Set() };
    const mine = own.get(id);
    if (mine) for (const m of METRICS) for (const x of mine[m]) acc[m].add(x);
    for (const ch of dag.down.get(id) ?? []) { const sub = collect(ch); for (const m of METRICS) for (const x of sub[m]) acc[m].add(x); }
    total.set(id, acc);
    return acc;
  };
  for (const n of nodes.values()) { const t = collect(n.id); for (const m of METRICS) n.counts[m] = t[m].size; }

  const list = [...nodes.values()];
  const cancerNodes = list.filter((n) => n.layer === "cancer" || n.layer === "subtype");
  const edgesBy: Record<CancerDagEdge["via"], number> = { system: 0, parent: 0, histology: 0 };
  for (const e of edges) edgesBy[e.via]++;
  const stats: CancerDagStats = {
    nodes: list.length,
    edges: dag.edges.length,
    systems: list.filter((n) => n.layer === "system").length,
    histologies: list.filter((n) => n.layer === "histology").length,
    cancers: cancerNodes.length,
    subtypes: list.filter((n) => n.layer === "subtype").length,
    depth: layers.length,
    multiParent: cancerNodes.filter((n) => n.parents.length > 1).length,
    crossSystem: cancers.filter((c) => c.parent && byCancer.has(c.parent) && byCancer.get(c.parent)!.group !== c.group).length,
    edgesBy,
  };
  return { nodes: list, byId: nodes, edges, layers, stats, dag };
}

/** Linked ids for one cancer from the corpus graph: trials, products, approved products and ideas in either direction. */
export function corpusLinks(c: Cancer): Record<Metric, Iterable<string>> {
  const g = graph();
  const near = g.neighbours(c.id);
  const drugs = near.get("drug") ?? [];
  return {
    trials: (near.get("trial") ?? []).map((e) => e.id),
    drugs: drugs.map((e) => e.id),
    approvals: drugs.filter((d) => d.kind === "drug" && d.approvals.length > 0).map((e) => e.id),
    ideas: (near.get("idea") ?? []).map((e) => e.id),
  };
}

let cached: CancerDag | undefined;
/** The cancer DAG over the whole corpus, built once per process. */
export function cancerDag(): CancerDag {
  if (!cached) cached = buildCancerDag(graph().kind("cancer"), corpusLinks);
  return cached;
}

export type CancerDagPosition = { x: number; y: number; w: number; h: number };
export type CancerDagLayout = { width: number; height: number; pos: Record<string, CancerDagPosition>; columns: number[] };

/**
 * Coordinates for a left-to-right drawing: one column per layer, rows `rowH` apart. The largest layer is spread
 * evenly; every other node starts at the mean row of its neighbours in the adjacent layer (children for layers
 * left of the largest, parents to its right), then nodes are pushed apart to at least one row and pulled back
 * inside the canvas. Sorting by that mean is itself a barycentre pass, so edges run as flat as the data allows.
 */
export function layoutCancerDag(d: CancerDag, opts: { rowH?: number; nodeW?: number; groupW?: number; gap?: number; pad?: number } = {}): CancerDagLayout {
  const rowH = opts.rowH ?? 18, nodeW = opts.nodeW ?? 196, groupW = opts.groupW ?? 160, gap = opts.gap ?? 72, pad = opts.pad ?? 4;
  const layers = d.layers;
  const rows = Math.max(1, ...layers.map((l) => l.length));
  const height = rows * rowH + pad * 2;
  const y = new Map<string, number>();
  const largest = layers.reduce((best, l, i) => (l.length > layers[best].length ? i : best), 0);
  const spread = (ids: string[]) => { const step = (height - pad * 2) / ids.length; ids.forEach((id, i) => y.set(id, pad + step * (i + 0.5))); };
  spread(layers[largest]);
  const settle = (li: number, neighbours: (id: string) => string[]) => {
    const ids = [...layers[li]];
    const mean = new Map<string, number>();
    ids.forEach((id, i) => {
      const ys = neighbours(id).map((n) => y.get(n)).filter((v): v is number => v !== undefined);
      mean.set(id, ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : pad + ((height - pad * 2) / ids.length) * (i + 0.5));
    });
    ids.sort((a, b) => mean.get(a)! - mean.get(b)!);
    const out = ids.map((id) => mean.get(id)!);
    const lo = pad + rowH / 2, hi = height - pad - rowH / 2;
    for (let i = 0; i < out.length; i++) out[i] = Math.max(i ? out[i - 1] + rowH : lo, Math.max(lo, out[i]));
    for (let i = out.length - 1; i >= 0; i--) out[i] = Math.min(i < out.length - 1 ? out[i + 1] - rowH : hi, Math.min(hi, out[i]));
    // If the layer overflows the canvas, spread it evenly instead.
    if (out.length && out[0] < lo - 1e-6) spread(ids); else ids.forEach((id, i) => y.set(id, out[i]));
    layers[li] = ids;
  };
  for (let li = largest - 1; li >= 0; li--) settle(li, (id) => (d.dag.down.get(id) ?? []).filter((n) => layers[li + 1].includes(n)));
  for (let li = largest + 1; li < layers.length; li++) settle(li, (id) => (d.dag.up.get(id) ?? []).filter((n) => layers[li - 1].includes(n)));

  const columns: number[] = [];
  let x = pad;
  for (let li = 0; li < layers.length; li++) { columns.push(x); x += (li === 0 ? groupW : nodeW) + gap; }
  const width = x - gap + pad;
  const pos: Record<string, CancerDagPosition> = {};
  layers.forEach((l, li) => { for (const id of l) pos[id] = { x: columns[li], y: Math.round((y.get(id) ?? 0) * 10) / 10, w: li === 0 ? groupW : nodeW, h: rowH - 3 }; });
  return { width, height, pos, columns };
}

/** Plain data for `/cancers/map/graph.json` and the JSON-LD: no Maps, no Sets. */
export function cancerDagExport(d: CancerDag = cancerDag()) {
  return {
    nodes: d.nodes.map((n) => ({ id: n.id, layer: n.layer, name: n.name, route: n.route, depth: n.depth, group: n.group, counts: n.counts, parents: n.parents, children: n.children })),
    edges: d.edges.map((e) => ({ from: e.from, to: e.to, via: e.via })),
    layers: d.layers,
    stats: d.stats,
  };
}
