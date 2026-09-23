/**
 * Server side of the For me picker: everything in OnCo that touches one cancer, written to
 * /api/v1/for-me/<id>.related.json by scripts/build-api.ts and fetched by src/components/CancerPicker.tsx when the
 * reader chooses that cancer. The page used to carry these lists for all 328 cancers in its hydration payload
 * (9.7 MB); now it carries the chooser list alone. The same file carries `edgeIds`, the record set the Edge page's
 * "For you" filter (src/components/EdgeFilter.tsx) matches items against.
 */
import type { Graph } from "./graph";
import { routeFor, type Cancer, type Entity, type Kind } from "./schema";
import { redCardsForCancer, type RedCard } from "./red-cards";

export type RelatedLite = { id: string; name: string; tldr: string; route: string; status?: string };
export type ForMeRelated = {
  stateOfArt: string[]; redCards: RedCard[]; pipeline: RelatedLite[]; groups: Partial<Record<Kind, RelatedLite[]>>;
  /** The record ids the Edge "For you" filter matches items against (edgeIdsForCancer); withdrawals and failures included, unlike `groups`. */
  edgeIds: string[];
};

/** Phases whose trials count as late stage for the Edge set. */
const LATE_PHASES = new Set(["3", "2/3"]);

/**
 * The records whose Edge items concern one cancer: the cancer itself, its parent family and its subtypes (the
 * `parent` field, src/lib/cancer-families.test.ts), the drugs approved for it or in a phase 3 trial for it (with
 * those trials, so their results show), and its roadmaps and technologies. Read by src/components/EdgeFilter.tsx
 * from /api/v1/for-me/<id>.related.json; an item passes when one of its record chips is in this set. Nothing is
 * filtered by status here: a withdrawal for a drug approved in this cancer is exactly what a reader wants to see.
 */
export function edgeIdsForCancer(g: Graph, c: Cancer): string[] {
  const ids = new Set<string>([c.id]);
  for (const x of g.kind("cancer")) if (x.parent === c.id) ids.add(x.id);
  /** The cancer and its subtypes: what a drug or trial must name to count as "for it". The parent is matched as a chip, not widened to its drugs. */
  const mine = new Set(ids);
  if (c.parent) ids.add(c.parent);
  const inCancer = (e: { cancers: string[] }) => e.cancers.some((id) => mine.has(id));
  for (const d of g.kind("drug")) if (inCancer(d) && (d.approvals.length || d.regulatoryEvents.some((e) => e.type === "approval"))) ids.add(d.id);
  for (const t of g.kind("trial")) {
    if (!LATE_PHASES.has(t.phase) || !t.cancers.some((id) => mine.has(id))) continue;
    ids.add(t.id);
    for (const d of t.drugs) ids.add(d);
  }
  for (const r of g.kind("roadmap")) if (inCancer(r)) ids.add(r.id);
  for (const t of g.kind("technology")) if (inCancer(t)) ids.add(t.id);
  for (const id of c.pipeline) { const e = g.get(id); if (e && (e.kind === "roadmap" || e.kind === "technology")) ids.add(id); }
  return [...ids].sort();
}

/** "For me" shows what works and what could work: failures, withdrawals, historic items and caution pairings are left out. */
export const hopeful = (e: Entity): boolean => !["negative", "withdrawn", "historic"].includes(e.status ?? "") && !e.tags.some((t) => t === "failure" || t === "failed-so-far" || t.startsWith("lesson:")) && !(e.kind === "pairing" && e.pairingType === "caution");

const lite = (e: Entity): RelatedLite => ({ id: e.id, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status });

export function forMeRelated(g: Graph, c: Cancer): ForMeRelated {
  const groups: ForMeRelated["groups"] = {};
  for (const [k, list] of g.forCancer(c.id)) { const kept = list.filter(hopeful); if (kept.length) groups[k] = kept.map(lite); }
  return { stateOfArt: c.stateOfArt, redCards: redCardsForCancer(g, c), pipeline: c.pipeline.map((id) => g.must(id)).filter(hopeful).map(lite), groups, edgeIds: edgeIdsForCancer(g, c) };
}
