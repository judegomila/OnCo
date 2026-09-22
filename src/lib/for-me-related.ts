/**
 * Server side of the For me picker: everything in OnCo that touches one cancer, written to
 * /api/v1/for-me/<id>.related.json by scripts/build-api.ts and fetched by src/components/CancerPicker.tsx when the
 * reader chooses that cancer. The page used to carry these lists for all 328 cancers in its hydration payload
 * (9.7 MB); now it carries the chooser list alone.
 */
import type { Graph } from "./graph";
import { routeFor, type Cancer, type Entity, type Kind } from "./schema";
import { redCardsForCancer, type RedCard } from "./red-cards";

export type RelatedLite = { id: string; name: string; tldr: string; route: string; status?: string };
export type ForMeRelated = { stateOfArt: string[]; redCards: RedCard[]; pipeline: RelatedLite[]; groups: Partial<Record<Kind, RelatedLite[]>> };

/** "For me" shows what works and what could work: failures, withdrawals, historic items and caution pairings are left out. */
export const hopeful = (e: Entity): boolean => !["negative", "withdrawn", "historic"].includes(e.status ?? "") && !e.tags.some((t) => t === "failure" || t === "failed-so-far" || t.startsWith("lesson:")) && !(e.kind === "pairing" && e.pairingType === "caution");

const lite = (e: Entity): RelatedLite => ({ id: e.id, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status });

export function forMeRelated(g: Graph, c: Cancer): ForMeRelated {
  const groups: ForMeRelated["groups"] = {};
  for (const [k, list] of g.forCancer(c.id)) { const kept = list.filter(hopeful); if (kept.length) groups[k] = kept.map(lite); }
  return { stateOfArt: c.stateOfArt, redCards: redCardsForCancer(g, c), pipeline: c.pipeline.map((id) => g.must(id)).filter(hopeful).map(lite), groups };
}
