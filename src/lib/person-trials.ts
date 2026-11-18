import generated from "@/data/person-trial-links.generated.json";
import type { AmbiguousAuthorship, PersonTrialLink } from "@/data/person-trial-authorship";
import { graph } from "./graph";
import type { Paper, Trial } from "./schema";

/**
 * "Trial reports authored" on a person page (docs/proposals/cross-links-census-2026-11.md, pair 5): the trials a
 * person wrote up, each with the paper that says so and how the name was confirmed. Read from
 * src/data/person-trial-links.generated.json, which scripts/fetch-trial-authors.ts derives from Europe PMC author
 * lists by the rule in src/data/person-trial-authorship.ts: an equal ORCID, or a full first name and an affiliation on
 * that paper naming the person's institution. A matching name with neither is counted here and never listed.
 */
const FILE = generated as unknown as { generatedAt: string; links: Record<string, PersonTrialLink[]>; ambiguous: AmbiguousAuthorship[] };

/** The day the links were last derived from the author lists. */
export const AUTHORSHIP_DERIVED_ON = FILE.generatedAt;

export type Authored = { trial: Trial; reports: Array<{ paper: Paper; evidence: PersonTrialLink["evidence"] }> };

const pivotal = (t: Trial) => (t.phase === "3" ? 0 : t.phase === "2/3" ? 1 : 2);

/** The trials a person is a confirmed author of a report of, phase 3 first, then by name. A stale id is skipped. */
export function trialsAuthoredBy(personId: string): Authored[] {
  const g = graph();
  const by = new Map<string, Authored>();
  for (const l of FILE.links[personId] ?? []) {
    const trial = g.get(l.trialId), paper = g.get(l.paperId);
    if (trial?.kind !== "trial" || paper?.kind !== "paper") continue;
    const a = by.get(trial.id) ?? { trial, reports: [] };
    a.reports.push({ paper, evidence: l.evidence });
    by.set(trial.id, a);
  }
  return [...by.values()].sort((a, b) => pivotal(a.trial) - pivotal(b.trial) || a.trial.name.localeCompare(b.trial.name, "en"));
}

/** People with at least one confirmed trial report. */
export function peopleWithAuthoredTrials(): string[] {
  return Object.keys(FILE.links).filter((id) => trialsAuthoredBy(id).length).sort();
}

let unconfirmed: Map<string, number> | null = null;
/** How many trials carry a report with a matching name that could not be confirmed as this person, and so are not listed. */
export function unconfirmedTrialCount(personId: string): number {
  if (!unconfirmed) {
    const sets = new Map<string, Set<string>>();
    for (const a of FILE.ambiguous) sets.set(a.personId, (sets.get(a.personId) ?? new Set<string>()).add(a.trialId));
    unconfirmed = new Map([...sets].map(([id, s]) => [id, s.size]));
  }
  return unconfirmed.get(personId) ?? 0;
}
