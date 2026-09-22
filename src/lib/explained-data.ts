/**
 * Server side of Trials in plain words (/explained/). The page keeps one section per cancer with every heading and
 * trial count in the HTML, and the first EXPLAINED_PAGE trial rows (heading, status, one-line summary, page link) of
 * each section; the rest of a section's rows, its remaining cross-reference pills and the explainer bodies (the
 * sentences src/lib/trial-explain.ts writes from the outcomes) are one file per cancer section,
 * /api/v1/explained/<id>.json, written by scripts/build-api.ts and fetched by src/components/ExplainedSection.tsx
 * when the reader scrolls past the first rows, presses "Show more" or opens a row. Before this the page carried
 * 1,313 full explainers (14.2 MB of HTML), then every row (1,135 KB and growing with each trial wave).
 */
import type { Graph } from "./graph";
import type { Cancer, Trial } from "./schema";

/** Rows of a section the page's HTML carries; the rest come from the section's file. Also the "Show more" step. */
export const EXPLAINED_PAGE = 10;

/** One trial's row as the page and the section file carry it: heading, status, phase, year, one-line summary, registry id. */
export type ExplainedRow = { id: string; name: string; status?: string; phase: string; year?: number; tldr: string; nct?: string };
/** A trial studied in this cancer whose full row sits in an earlier section, `in` (the section's key); the pill opens that row. */
export type ExplainedRef = { id: string; name: string; in: string };

export type ExplainedGroup = {
  key: string;
  cancer?: Cancer;
  /** Every trial with results that touches this cancer, newest first. */
  trials: Trial[];
  /** The trials whose full row lives in this section (their first section alphabetically). */
  own: Trial[];
  /** The trials listed here as pills because their row is in an earlier section. */
  refs: ExplainedRef[];
};
/** The fields the explainer reads; the rest of the trial record stays on the trial page. */
export type ExplainedTrial = Pick<Trial, "id" | "outcomes" | "setting" | "enrolled" | "enrolledNote" | "enrolledBasis">;
export type ExplainedFile = {
  /** Every row of the section in page order (the page carries the first EXPLAINED_PAGE). */
  rows: ExplainedRow[];
  /** Every cross-reference pill of the section (the page carries the first EXPLAINED_PAGE). */
  refs: ExplainedRef[];
  /** The explainer inputs of every trial that touches the cancer, keyed by trial id. */
  trials: Record<string, ExplainedTrial>;
};

/** Key of the section trials without a cancer link fall under. */
export const OTHER_KEY = "other";
/** Name of the section trials without a cancer link fall under. */
export const OTHER_NAME = "Other trials";
/** Site-relative URL of one section's file. */
export const explainedFile = (key: string): string => `/api/v1/explained/${key}.json`;

export const explainedRow = (t: Trial): ExplainedRow => ({ id: t.id, name: t.name, status: t.status, phase: t.phase, year: t.yearReported, tldr: t.tldr, nct: t.nct ?? undefined });

/**
 * Trials with structured results, grouped by cancer using links in either direction; a trial touching several
 * cancers appears under each. Its full row is in the first section (alphabetical) it appears in, `own`; the later
 * sections list it in `refs` as a pill that opens that row, so every trial name, summary and page link is on the
 * page once.
 */
export function explainedGroups(g: Graph): ExplainedGroup[] {
  const trials = g.kind("trial").filter((t) => t.outcomes.length);
  const groups = new Map<string, ExplainedGroup>();
  const other: Trial[] = [];
  for (const t of trials) {
    const cancers = g.neighbours(t.id).get("cancer") ?? [];
    if (!cancers.length) { other.push(t); continue; }
    for (const c of cancers) {
      if (c.kind !== "cancer") continue;
      const grp = groups.get(c.id) ?? { key: c.id, cancer: c, trials: [], own: [], refs: [] };
      grp.trials.push(t);
      groups.set(c.id, grp);
    }
  }
  const ordered = [...groups.values()].sort((a, b) => (a.cancer?.name ?? "").localeCompare(b.cancer?.name ?? ""));
  if (other.length) ordered.push({ key: OTHER_KEY, trials: other, own: [], refs: [] });
  const firstIn = new Map<string, ExplainedGroup>();
  for (const grp of ordered) {
    grp.trials.sort((a, b) => (b.yearReported ?? 0) - (a.yearReported ?? 0) || a.name.localeCompare(b.name));
    for (const t of grp.trials) {
      const first = firstIn.get(t.id);
      if (!first) { firstIn.set(t.id, grp); grp.own.push(t); } else grp.refs.push({ id: t.id, name: t.name, in: first.key });
    }
  }
  return ordered;
}

export function explainedFileFor(grp: ExplainedGroup): ExplainedFile {
  const trials: Record<string, ExplainedTrial> = {};
  for (const t of grp.trials) trials[t.id] = { id: t.id, outcomes: t.outcomes, setting: t.setting, enrolled: t.enrolled, enrolledNote: t.enrolledNote, enrolledBasis: t.enrolledBasis };
  return { rows: grp.own.map(explainedRow), refs: grp.refs, trials };
}
