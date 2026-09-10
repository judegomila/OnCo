import { graph } from "./graph";
import { guidelineVersions, type GuidelineChange, type GuidelineVersion } from "@/data/guideline-versions";
import { guidelineMap, type GuidelineMapEntry, type Stance } from "@/data/guideline-map";

/** Helpers for /guidelines/: validation against the graph, version diffs and concordance judgements. */

export function validateGuidelines(): void {
  const g = graph();
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const v of guidelineVersions) {
    if (seen.has(v.id)) errors.push(`${v.id}: duplicate version id`);
    seen.add(v.id);
    const c = g.get(v.cancerId);
    if (!c || c.kind !== "cancer") errors.push(`${v.id}: cancerId "${v.cancerId}" is not a cancer`);
    if (!/^\d{4}-\d{2}$/.test(v.date)) errors.push(`${v.id}: date "${v.date}" is not YYYY-MM`);
    if (!/^https?:\/\//.test(v.url)) errors.push(`${v.id}: url is not absolute`);
    if (!v.changes.length) errors.push(`${v.id}: no changes listed`);
    for (const ch of v.changes) for (const id of ch.refs) if (!g.get(id)) errors.push(`${v.id}: unknown ref "${id}" in "${ch.setting}"`);
  }
  const keys = new Set<string>();
  for (const e of guidelineMap) {
    if (keys.has(e.key)) errors.push(`${e.key}: duplicate map key`);
    keys.add(e.key);
    if (e.key !== `${e.cancerId}#${e.setting}`) errors.push(`${e.key}: key does not match cancerId#setting`);
    const c = g.get(e.cancerId);
    if (!c || c.kind !== "cancer") errors.push(`${e.key}: cancerId "${e.cancerId}" is not a cancer`);
    for (const id of e.refs) if (!g.get(id)) errors.push(`${e.key}: unknown ref "${id}"`);
    if (e.bodies.length < 2) errors.push(`${e.key}: needs at least two bodies to compare`);
    for (const b of e.bodies) if (!/^https?:\/\//.test(b.url)) errors.push(`${e.key}: ${b.body} url is not absolute`);
  }
  if (errors.length) throw new Error(`Invalid guideline data:\n${errors.join("\n")}`);
}

/** Versions for a cancer, oldest first. */
export function versionsFor(cancerId: string): GuidelineVersion[] {
  return guidelineVersions.filter((v) => v.cancerId === cancerId).sort((a, b) => a.date.localeCompare(b.date) || a.body.localeCompare(b.body));
}

/** Cancers that have any version history or concordance rows. */
export function guidelineCancerIds(): string[] {
  return [...new Set([...guidelineVersions.map((v) => v.cancerId), ...guidelineMap.map((e) => e.cancerId)])];
}

/**
 * Changes accumulated after version `from` up to and including version `to` (both ids; `from` may be null for
 * "from the beginning"). Each version lists what changed relative to its predecessor, so the diff between two
 * versions is the union of the intervening change lists, grouped by kind.
 */
export function diffVersions(list: GuidelineVersion[], from: string | null, to: string): { added: GuidelineChange[]; removed: GuidelineChange[]; recategorised: GuidelineChange[]; versions: GuidelineVersion[] } {
  const sorted = list.slice().sort((a, b) => a.date.localeCompare(b.date));
  const fromIdx = from ? sorted.findIndex((v) => v.id === from) : -1;
  const toIdx = sorted.findIndex((v) => v.id === to);
  const slice = toIdx < 0 ? [] : sorted.slice(fromIdx + 1, toIdx + 1);
  const changes = slice.flatMap((v) => v.changes);
  return { added: changes.filter((c) => c.kind === "added"), removed: changes.filter((c) => c.kind === "removed"), recategorised: changes.filter((c) => c.kind === "recategorised"), versions: slice };
}

const POSITIVE: Stance[] = ["preferred", "recommended"];
const NEGATIVE: Stance[] = ["restricted", "not-recommended"];

export type Concordance = "concordant" | "discordant" | "partial";

/** Concordant when every body that has appraised it is positive; discordant when at least one is negative. */
export function concordanceOf(e: Pick<GuidelineMapEntry, "bodies">): Concordance {
  const appraised = e.bodies.filter((b) => b.stance !== "not-appraised");
  if (appraised.some((b) => NEGATIVE.includes(b.stance))) return appraised.some((b) => POSITIVE.includes(b.stance)) ? "discordant" : "partial";
  return appraised.length < e.bodies.length ? "partial" : "concordant";
}

export function concordanceSummary() {
  const rows = guidelineMap.map((e) => ({ e, verdict: concordanceOf(e) }));
  return { rows, concordant: rows.filter((r) => r.verdict === "concordant").length, discordant: rows.filter((r) => r.verdict === "discordant").length, partial: rows.filter((r) => r.verdict === "partial").length };
}

export const STANCE_LABEL: Record<Stance, string> = { preferred: "Preferred", recommended: "Recommended", restricted: "Restricted", "not-recommended": "Not recommended", "not-appraised": "Not appraised" };
export const STANCE_CLASS: Record<Stance, string> = {
  preferred: "bg-emerald-200 text-emerald-950 dark:bg-emerald-800/70 dark:text-emerald-50",
  recommended: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100",
  restricted: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
  "not-recommended": "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100",
  "not-appraised": "bg-foreground/5 text-muted",
};
