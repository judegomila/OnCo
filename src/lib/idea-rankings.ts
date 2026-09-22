import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GLOBOCAN_MAP } from "@/data/globocan-map";
import { IDEA_PICKS } from "@/data/idea-picks";
import { graph } from "./graph";
import { GLOBOCAN, cellFor } from "./globocan";
import { costRank, maturityRank, VIEW_IDS, viewDef, type BurdenSite, type RankedRow, type ScoreParts, type ViewDef, type ViewId } from "./idea-rankings-views";
import type { Idea } from "./schema";

/**
 * Ranking views for the ideas (/ideas/rankings/). Every number here is derived from fields the records already
 * carry plus the GLOBOCAN 2022 world estimates in public/globocan/countries.json; nothing is estimated or invented.
 *
 *   burden        annual new cases (world, both sexes, all ages) summed over the distinct GLOBOCAN sites of the
 *                 linked cancers. A subtype with no site of its own borrows its parent's site (the same convention
 *                 GLOBOCAN_MAP uses for "shared" sites), and a site is counted once however many linked cancers
 *                 share it. 0 when no linked cancer reaches a site estimate, and the page says so.
 *   breadth       number of linked cancers
 *   evidence      trials + treatments + key papers linked in either direction, with phase 3 trials counted twice
 *   costRank      small 1, medium 2, large 3; 0 when no cost band is recorded
 *   horizon       horizonYears as recorded (undefined when missing)
 *   maturityRank  speculative 1, preclinical evidence 2, early clinical 3, being tested at scale 4
 *
 * The view formulas are in VIEWS (idea-rankings-views.ts) and repeated as one plain sentence on the page; `explain`
 * there writes the same arithmetic with the idea's own numbers for the tooltip on each score. The labels, the row
 * types and the paging constants live in that pure module too, so the client list can render fetched rows; this
 * module re-exports them for the server and the tests.
 */

export {
  COST_LABEL, COST_ORDER, costRank, MATURITY_LABEL, MATURITY_ORDER, maturityRank,
  explain, formatScore, RANK_PAGE, rankingsFile,
  VIEW_IDS, VIEWS, viewDef, isViewId,
} from "./idea-rankings-views";
export type { BurdenSite, Cost, Maturity, RankedRow, ScoreParts, ViewId, ViewDef, ViewGlyph } from "./idea-rankings-views";

const WORLD_KEY = "WORLD";

type SiteHit = { codes: number[]; label: string; viaParent?: string };

/** The GLOBOCAN site for a cancer: its own mapping, or the nearest ancestor's (a subtype borrows the parent site). */
function siteFor(cancerId: string): SiteHit | null {
  const g = graph();
  let cur = g.get(cancerId);
  let viaParent: string | undefined;
  for (let depth = 0; cur && cur.kind === "cancer" && depth < 4; depth++) {
    const m = GLOBOCAN_MAP[cur.id];
    if (m?.codes.length) return { codes: m.codes, label: m.label, viaParent };
    if (!cur.parent) break;
    viaParent = cur.name;
    cur = g.get(cur.parent);
  }
  return null;
}

/** Burden and the sites it was read from, for a set of cancer ids. Each site counts once. */
export function burdenFor(cancerIds: string[]): { burden: number; sites: BurdenSite[]; perCancer: Map<string, SiteHit> } {
  const world = GLOBOCAN.countries[WORLD_KEY];
  const perCancer = new Map<string, SiteHit>();
  const byCode = new Map<number, BurdenSite>();
  for (const id of cancerIds) {
    const hit = siteFor(id);
    if (!hit) continue;
    perCancer.set(id, hit);
    for (const code of hit.codes) {
      const site = byCode.get(code) ?? { code, label: GLOBOCAN.cancers[String(code)]?.label.trim() ?? hit.label, cases: world ? cellFor(world, [code])?.[0] ?? null : null, cancerIds: [] };
      if (!site.cancerIds.includes(id)) site.cancerIds.push(id);
      byCode.set(code, site);
    }
  }
  const sites = [...byCode.values()].sort((a, b) => (b.cases ?? 0) - (a.cases ?? 0));
  const burden = sites.reduce((a, s) => a + (s.cases ?? 0), 0);
  return { burden: Number.isFinite(burden) ? burden : 0, sites, perCancer };
}

let cachedParts: ScoreParts[] | undefined;

/** Score parts for every idea, computed once per process. */
export function scoreParts(): ScoreParts[] {
  if (cachedParts) return cachedParts;
  const g = graph();
  cachedParts = g.kind("idea").map((i) => partsFor(i));
  return cachedParts;
}

function partsFor(i: Idea): ScoreParts {
  const g = graph();
  const inc = g.incoming(i.id);
  const ids = (out: string[], kind: "trial" | "drug" | "paper") => new Set([...out, ...(inc.get(kind) ?? []).map((e) => e.id)]);
  const trialIds = ids(i.trials, "trial");
  const drugIds = ids(i.drugs, "drug");
  const paperIds = ids(i.keyPapers, "paper");
  let phase3 = 0;
  for (const t of trialIds) { const e = g.get(t); if (e?.kind === "trial" && e.phase === "3") phase3++; }
  const { burden, sites, perCancer } = burdenFor(i.cancers);
  const cancers = i.cancers.map((id) => { const c = g.must(id); const hit = perCancer.get(id); return { id, name: c.name, route: `/cancers/${id}/`, site: hit?.label, viaParent: hit?.viaParent }; });
  return {
    id: i.id, name: i.name, tldr: i.tldr, route: `/ideas/${i.id}/`,
    cancers, burden, sites, breadth: i.cancers.length,
    trials: trialIds.size, phase3, drugs: drugIds.size, papers: paperIds.size,
    evidence: trialIds.size + phase3 + drugIds.size + paperIds.size,
    cost: i.cost, costRank: costRank(i.cost), horizon: i.horizonYears,
    maturity: i.maturity, maturityRank: maturityRank(i.maturity),
  };
}

/**
 * The score of one idea in a computed view, or null when the view cannot rank it (bang for buck needs a burden,
 * a cost band and a horizon; most important needs a burden; hardest needs a cost band and a horizon).
 * Exported so the tests can check the direction of each term with synthetic parts.
 */
export function viewScore(view: ViewId, p: Pick<ScoreParts, "burden" | "breadth" | "evidence" | "costRank" | "horizon" | "maturityRank">): number | null {
  switch (view) {
    case "bang-for-buck":
      if (p.burden <= 0 || p.costRank <= 0 || p.horizon === undefined) return null;
      return p.burden / p.costRank / (1 + p.horizon);
    case "most-important":
      if (p.burden <= 0) return null;
      return p.burden * p.breadth;
    case "hardest":
      if (p.costRank <= 0 || p.horizon === undefined) return null;
      return p.costRank + p.horizon / 5 + (4 - p.maturityRank) + Math.max(0, 3 - p.evidence);
    case "closest-to-reality":
      return p.maturityRank * 3 + p.evidence;
    default:
      return null;
  }
}

/** Secondary key when scores tie, per view. */
function tieBreak(view: ViewId, p: ScoreParts): number {
  return view === "bang-for-buck" || view === "most-important" ? p.evidence : p.burden;
}

export type RankedView = {
  view: ViewDef;
  rows: RankedRow[];
  /** Ideas the view could rank (before the limit). */
  ranked: number;
  /** Ideas the view could not rank, with the reason in plain English (empty when every idea is ranked). */
  excluded: { n: number; why: string };
  /** Most wanted only: false until votes.json has a vote. */
  available: boolean;
};

export type Vote = { up: number; reactions: number; comments: number; url: string; title: string };
export type VotesFile = { generated: string; total: number; votes: Record<string, Vote> };

/** public/votes.json, written weekly by scripts/fetch-votes.ts; null when absent or unreadable. */
export function readVotes(): VotesFile | null {
  const p = join(process.cwd(), "public", "votes.json");
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, "utf8")) as VotesFile; } catch { return null; }
}

const EXCLUDED_WHY: Partial<Record<ViewId, string>> = {
  "bang-for-buck": "no linked cancer with a GLOBOCAN site estimate, or no cost band or horizon recorded",
  "most-important": "no linked cancer with a GLOBOCAN site estimate",
  hardest: "no cost band or horizon recorded",
};

/** One view ranked, top `limit` rows (Infinity for every row, as the per-view JSON file wants). */
export function rankView(view: ViewId, limit = 50, parts: ScoreParts[] = scoreParts(), votes: VotesFile | null = readVotes()): RankedView {
  const def = viewDef(view);
  const byId = new Map(parts.map((p) => [p.id, p]));
  if (view === "cherry-picked") {
    const rows: RankedRow[] = [];
    for (const pick of IDEA_PICKS) {
      const p = byId.get(pick.id);
      if (!p) continue;
      rows.push({ rank: rows.length + 1, parts: p, score: null, reason: pick.reason });
    }
    return { view: def, rows: rows.slice(0, limit), ranked: rows.length, excluded: { n: 0, why: "" }, available: true };
  }
  if (view === "most-wanted") {
    const voted = votes ? parts.map((p) => ({ p, v: votes.votes[p.id] })).filter((x) => x.v && x.v.up > 0) : [];
    voted.sort((a, b) => b.v.up - a.v.up || b.v.comments - a.v.comments || a.p.name.localeCompare(b.p.name));
    const rows = voted.slice(0, limit).map((x, n) => ({ rank: n + 1, parts: x.p, score: x.v.up }));
    return { view: def, rows, ranked: voted.length, excluded: { n: parts.length - voted.length, why: "no thumbs-up yet" }, available: voted.length > 0 };
  }
  const scored = parts.map((p) => ({ p, s: viewScore(view, p) })).filter((x): x is { p: ScoreParts; s: number } => x.s !== null);
  scored.sort((a, b) => b.s - a.s || tieBreak(view, b.p) - tieBreak(view, a.p) || a.p.name.localeCompare(b.p.name));
  const rows = scored.slice(0, limit).map((x, n) => ({ rank: n + 1, parts: x.p, score: x.s }));
  return { view: def, rows, ranked: scored.length, excluded: { n: parts.length - scored.length, why: EXCLUDED_WHY[view] ?? "" }, available: true };
}

/** Every view at once, for the page (`limit` rows each) or the JSON files (`Infinity`). */
export function rankAll(limit = 50): RankedView[] {
  const parts = scoreParts();
  const votes = readVotes();
  return VIEW_IDS.map((v) => rankView(v, limit, parts, votes));
}

/**
 * Ideas ranked by their combined position across the four computed views (sum of ranks, unranked counting as
 * last). Used once to seed src/data/idea-picks.ts; kept so the seed can be regenerated and compared.
 */
export function combinedRank(parts: ScoreParts[] = scoreParts()): Array<{ id: string; name: string; sum: number; ranks: Partial<Record<ViewId, number>> }> {
  const computed: ViewId[] = ["bang-for-buck", "most-important", "hardest", "closest-to-reality"];
  const pos = new Map<string, Partial<Record<ViewId, number>>>();
  for (const v of computed) {
    const full = rankView(v, parts.length, parts, null);
    for (const r of full.rows) { const cur = pos.get(r.parts.id) ?? {}; cur[v] = r.rank; pos.set(r.parts.id, cur); }
  }
  const last = parts.length + 1;
  return parts
    .map((p) => { const ranks = pos.get(p.id) ?? {}; return { id: p.id, name: p.name, ranks, sum: computed.reduce((a, v) => a + (ranks[v] ?? last), 0) }; })
    .sort((a, b) => a.sum - b.sum || a.name.localeCompare(b.name));
}
