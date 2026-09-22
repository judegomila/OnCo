/**
 * Server side of Trials in plain words (/explained/). The page keeps every trial's heading, status, one-line summary
 * and links in the HTML, grouped by cancer, so crawlers see every trial; the explainer bodies (the sentences
 * src/lib/trial-explain.ts writes from the outcomes) are one file per cancer section, /api/v1/explained/<id>.json,
 * written by scripts/build-api.ts and fetched by src/components/ExplainedBody.tsx when a heading scrolls into view
 * or is opened. Before this the page carried 1,313 full explainers (14.2 MB of HTML).
 */
import type { Graph } from "./graph";
import type { Cancer, Trial } from "./schema";

export type ExplainedGroup = { key: string; cancer?: Cancer; trials: Trial[] };
/** The fields the explainer reads; the rest of the trial record stays on the trial page. */
export type ExplainedTrial = Pick<Trial, "id" | "outcomes" | "setting" | "enrolled" | "enrolledNote" | "enrolledBasis">;
export type ExplainedFile = { trials: Record<string, ExplainedTrial> };

/** Key of the section trials without a cancer link fall under. */
export const OTHER_KEY = "other";
/** Site-relative URL of one section's file. */
export const explainedFile = (key: string): string => `/api/v1/explained/${key}.json`;

/** Trials with structured results, grouped by cancer using links in either direction; a trial touching several cancers appears under each. */
export function explainedGroups(g: Graph): ExplainedGroup[] {
  const trials = g.kind("trial").filter((t) => t.outcomes.length);
  const groups = new Map<string, ExplainedGroup>();
  const other: Trial[] = [];
  for (const t of trials) {
    const cancers = g.neighbours(t.id).get("cancer") ?? [];
    if (!cancers.length) { other.push(t); continue; }
    for (const c of cancers) {
      if (c.kind !== "cancer") continue;
      const grp = groups.get(c.id) ?? { key: c.id, cancer: c, trials: [] };
      grp.trials.push(t);
      groups.set(c.id, grp);
    }
  }
  const ordered = [...groups.values()].sort((a, b) => (a.cancer?.name ?? "").localeCompare(b.cancer?.name ?? ""));
  if (other.length) ordered.push({ key: OTHER_KEY, trials: other });
  for (const grp of ordered) grp.trials.sort((a, b) => (b.yearReported ?? 0) - (a.yearReported ?? 0) || a.name.localeCompare(b.name));
  return ordered;
}

export function explainedFileFor(grp: ExplainedGroup): ExplainedFile {
  const trials: Record<string, ExplainedTrial> = {};
  for (const t of grp.trials) trials[t.id] = { id: t.id, outcomes: t.outcomes, setting: t.setting, enrolled: t.enrolled, enrolledNote: t.enrolledNote, enrolledBasis: t.enrolledBasis };
  return { trials };
}
