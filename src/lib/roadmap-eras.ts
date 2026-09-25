/**
 * Server side of a roadmap page's timeline. The page keeps every era's heading, date range, status and summary in
 * the HTML, so the timeline reads whole without JavaScript, and the first WATCH_PAGE rows of the watch table. Each
 * era's body (its linked records as pills, the structured outcomes of its trials, its papers with what they mean),
 * the cards of the Story tab and the watch rows beyond the first page are one file per roadmap,
 * /api/v1/roadmaps/<id>.json, written by scripts/build-api.ts and fetched by src/components/RoadmapEras.tsx when
 * the reader presses "Show era", scrolls the story or presses "Show more" under the watch table. The first era and
 * the current era are open by default and their bodies are in the HTML. Before this every era rendered its records
 * inline twice (the Steps timeline and the Story cards with TL;DRs): /roadmaps/tnbc-roadmap/ was 1.0 MB on the wire.
 */
import type { Graph } from "./graph";
import type { Kind } from "./kinds";
import type { Roadmap } from "./schema";
import { routeFor } from "./kinds";
import type { ExplainedTrial } from "./explained-data";

type RoadmapStep = Roadmap["steps"][number];

/** Watch rows the page's HTML carries; the rest come from the roadmap's file. Also the "Show more" step. */
export const WATCH_PAGE = 20;
/** Site-relative URL of one roadmap's file. */
export const roadmapFile = (id: string): string => `/api/v1/roadmaps/${id}.json`;

/** A record an era or watch row links to, as the pills and story cards render it. */
export type EraRef = { id: string; kind: Kind; name: string; route: string; status?: string; tldr: string };
/** A trial in an era with structured outcomes: what TrialExplainer needs, with its name and page. */
export type EraTrial = ExplainedTrial & { name: string; route: string };
/** A paper in an era: where it appeared and what it means in plain words. */
export type EraPaper = { id: string; name: string; route: string; journal: string; year: number; whatItMeans: string };
/** What "Show era" reveals. */
export type EraBody = { refs: EraRef[]; trials: EraTrial[]; papers: EraPaper[] };
/** How many of each an era holds, for the "Show era" pill and the counts under the heading. */
export type EraCounts = { refs: number; trials: number; papers: number };
/** One row of the watch table with its refs resolved. */
export type WatchRow = { item: string; expected?: string; source?: string; refs: EraRef[] };
export type RoadmapEraFile = {
  id: string;
  name: string;
  route: string;
  /** Every era in timeline order, heading and body together. */
  eras: Array<Pick<RoadmapStep, "era" | "title" | "description" | "status"> & EraBody>;
  /** Every watch row (the page carries the first WATCH_PAGE). */
  watch: WatchRow[];
};

export const eraRef = (g: Graph, id: string): EraRef | null => {
  const e = g.get(id);
  return e ? { id: e.id, kind: e.kind, name: e.name, route: routeFor(e), status: e.status, tldr: e.tldr } : null;
};
const eraRefs = (g: Graph, ids: string[]): EraRef[] => ids.map((id) => eraRef(g, id)).filter((x): x is EraRef => !!x);

/** The body of one era: every ref as a pill, the trials among them that have structured outcomes, the papers among them. */
export function eraBody(g: Graph, step: RoadmapStep): EraBody {
  const trials: EraTrial[] = [];
  const papers: EraPaper[] = [];
  for (const id of step.refs) {
    const e = g.get(id);
    if (!e) continue;
    if (e.kind === "trial" && e.outcomes.length) trials.push({ id: e.id, name: e.name, route: routeFor(e), outcomes: e.outcomes, setting: e.setting, enrolled: e.enrolled, enrolledNote: e.enrolledNote, enrolledBasis: e.enrolledBasis });
    if (e.kind === "paper") papers.push({ id: e.id, name: e.name, route: routeFor(e), journal: e.journal, year: e.year, whatItMeans: e.whatItMeans });
  }
  return { refs: eraRefs(g, step.refs), trials, papers };
}

export const eraCounts = (b: EraBody): EraCounts => ({ refs: b.refs.length, trials: b.trials.length, papers: b.papers.length });

/** Which eras open by default: the first, and the current era (the last step marked current). */
export function defaultOpen(r: Roadmap): number[] {
  const open = [0];
  const current = r.steps.map((s) => s.status).lastIndexOf("current");
  if (current > 0) open.push(current);
  return open;
}

export const watchRows = (g: Graph, r: Roadmap): WatchRow[] => r.watch.map((w) => ({ item: w.item, expected: w.expected, source: w.source, refs: eraRefs(g, w.refs) }));

export function roadmapEraFile(g: Graph, r: Roadmap): RoadmapEraFile {
  return {
    id: r.id, name: r.name, route: routeFor(r),
    eras: r.steps.map((s) => ({ era: s.era, title: s.title, description: s.description, status: s.status, ...eraBody(g, s) })),
    watch: watchRows(g, r),
  };
}
