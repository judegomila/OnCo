import type { GraphData, GraphNode } from "./graph-export";
import type { Kind } from "./schema";

/**
 * Deterministic radial layout for the graph explorer (src/components/GraphExplorer.tsx). Pure maths, no DOM:
 * positions are in scene units relative to the ring centre, so the component can drop them into any viewBox.
 */

/** Muted, mid-saturation hue per kind. Pink is kept for cancers (the site accent); everything else sits a step quieter. */
export const HUE: Record<Kind, string> = {
  cancer: "#d6336c",
  section: "#6b7f8a",
  technology: "#4f8fbf",
  target: "#8b6fc0",
  drug: "#4f9a7a",
  company: "#c2924a",
  institution: "#4d9a94",
  pathway: "#b06aae",
  term: "#8a8f96",
  trial: "#6d78c2",
  pairing: "#d08050",
  roadmap: "#4f9fb3",
  idea: "#8aa64a",
  collection: "#96897b",
  person: "#b5836e",
  bottleneck: "#c25b5b",
  paper: "#5a86a8",
  journal: "#7a8494",
};

/** Kind order around the ring: what a reader most wants to see first sits at the top and runs clockwise. */
export const ORDER: Kind[] = ["cancer", "section", "technology", "target", "drug", "trial", "pairing", "pathway", "company", "institution", "person", "bottleneck", "paper", "journal", "idea", "roadmap", "term", "collection"];

export const RING = 185;
export const RING_STEP = 27;
export const NODE_R = 13;
export const OVERVIEW_INNER = 100;
export const OVERVIEW_OUTER = 224;
export const DEFAULT_PER_KIND = 14;
/** Above this many ring nodes the radial labels would touch, so they are hidden and the ring is staggered instead. */
export const LABEL_MAX_NODES = 80;
const GROUP_GAP = 0.11;

export type Placed = { i: number; n: GraphNode; x: number; y: number; a: number; r: number; level: number };
export type Arc = { kind: Kind; a0: number; a1: number; count: number; shown: number };
export type Scene = { placed: Placed[]; arcs: Arc[]; labels: boolean };

export function adjacency(data: GraphData): number[][] {
  const m = data.nodes.map(() => [] as number[]);
  for (const [a, b] of data.edges) { m[a].push(b); m[b].push(a); }
  return m;
}

/** Fronts on the inner ring in corpus order, cancers on the outer ring alphabetically, both starting at the top. */
export function layoutOverview(data: GraphData): Scene {
  const placed: Placed[] = [];
  const fronts = data.nodes.map((n, i) => ({ n, i })).filter(({ n }) => n.kind === "section");
  const cancers = data.nodes.map((n, i) => ({ n, i })).filter(({ n }) => n.kind === "cancer").sort((p, q) => p.n.name.localeCompare(q.n.name));
  fronts.forEach(({ n, i }, k) => {
    const a = (k / fronts.length) * Math.PI * 2 - Math.PI / 2;
    placed.push({ i, n, x: Math.cos(a) * OVERVIEW_INNER, y: Math.sin(a) * OVERVIEW_INNER, a, r: 13, level: 0 });
  });
  cancers.forEach(({ n, i }, k) => {
    const a = (k / cancers.length) * Math.PI * 2 - Math.PI / 2;
    placed.push({ i, n, x: Math.cos(a) * OVERVIEW_OUTER, y: Math.sin(a) * OVERVIEW_OUTER, a, r: 9, level: 1 });
  });
  return { placed, arcs: [], labels: true };
}

/**
 * One node in the centre, neighbours in arcs grouped by kind. Each arc's span is proportional to how many nodes it
 * shows; groups are separated by a small gap. When the ring gets crowded, labels drop and nodes stagger over up to
 * `maxLevels` sub-rings, shrinking as needed so bubbles never overlap.
 */
export function layoutFocus(data: GraphData, adj: number[][], focus: number, hidden: ReadonlySet<Kind>, expanded: ReadonlySet<Kind>, maxLevels = 4): Scene {
  const groups = new Map<Kind, number[]>();
  for (const j of adj[focus]) {
    const k = data.nodes[j].kind;
    if (hidden.has(k)) continue;
    (groups.get(k) ?? groups.set(k, []).get(k)!).push(j);
  }
  const kinds = ORDER.filter((k) => groups.has(k));
  const shownCounts = kinds.map((k) => { const g = groups.get(k)!; return expanded.has(k) ? g.length : Math.min(g.length, DEFAULT_PER_KIND); });
  const total = shownCounts.reduce((a, b) => a + b, 0);
  const placed: Placed[] = [];
  const arcs: Arc[] = [];
  if (total === 0) return { placed, arcs, labels: true };

  const labels = total <= LABEL_MAX_NODES;
  const levels = labels ? 1 : Math.max(2, Math.min(maxLevels, Math.ceil(total / 60)));
  const gap = kinds.length > 1 ? GROUP_GAP : 0;
  const usable = Math.PI * 2 - gap * kinds.length;
  const perLevel = total / levels;
  const spacing = (Math.PI * 2 * (RING + (RING_STEP * (levels - 1)) / 2)) / Math.max(1, perLevel);
  const r = Math.max(5, Math.min(NODE_R, Math.round(spacing * 0.42)));

  let a = -Math.PI / 2 + gap / 2;
  kinds.forEach((k, gi) => {
    const g = groups.get(k)!.slice().sort((x, y) => data.nodes[y].degree - data.nodes[x].degree || data.nodes[x].name.localeCompare(data.nodes[y].name));
    const shown = shownCounts[gi];
    const span = (shown / total) * usable;
    arcs.push({ kind: k, a0: a, a1: a + span, count: g.length, shown });
    for (let i = 0; i < shown; i++) {
      const ang = a + ((i + 0.5) / shown) * span;
      const rad = RING + (i % levels) * RING_STEP;
      placed.push({ i: g[i], n: data.nodes[g[i]], x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, a: ang, r, level: i % levels });
    }
    a += span + gap;
  });
  return { placed, arcs, labels };
}

/**
 * Shorten a name to fit `max` characters: drop a trailing parenthetical, then cut at a natural break (" & ", " / ",
 * ": ", " and ") if one lands early enough, else on a word boundary with an ellipsis.
 */
export function shortName(name: string, max: number): string {
  let s = name.replace(/\s*\([^)]*\)\s*$/, "").trim();
  if (s.length <= max) return s;
  for (const sep of [" & ", " / ", ": ", " and ", " with "]) {
    const at = s.indexOf(sep);
    if (at >= 2 && at <= max) return s.slice(0, at);
  }
  s = s.slice(0, max - 1);
  const sp = s.lastIndexOf(" ");
  if (sp > max * 0.5) s = s.slice(0, sp);
  return s.replace(/[\s,;:\-]+$/, "") + "…";
}

/**
 * How many characters of a radial label fit along the ray at angle `a`, starting `start` units from the centre and
 * stopping `margin` units before the scene edge (`halfW`, `halfH`) or the `maxRadius` ring, whichever comes first.
 */
export function fitChars(a: number, start: number, halfW: number, halfH: number, maxRadius: number, margin = 10, pxPerChar = 5.4): number {
  const dx = Math.cos(a), dy = Math.sin(a);
  const tx = Math.abs(dx) < 1e-6 ? Infinity : (halfW - margin) / Math.abs(dx);
  const ty = Math.abs(dy) < 1e-6 ? Infinity : (halfH - margin) / Math.abs(dy);
  const reach = Math.min(tx, ty, maxRadius) - start;
  return Math.max(0, Math.floor(reach / pxPerChar));
}
