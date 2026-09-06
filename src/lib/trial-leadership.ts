import { graph } from "./graph";
import type { Entity, Institution } from "./schema";

/**
 * Trial leadership index: which institutions are attached to the pivotal trials, products,
 * and technologies in this corpus. A different signal from publication counts: it measures
 * presence in the evidence that changed practice, as recorded here.
 *
 * Counts are distinct neighbours by kind (links in either direction). This is also a
 * coverage measure of the corpus; institutions we have documented better score higher.
 */
export type LeadershipRow = {
  institution: Institution;
  trials: Entity[];
  drugs: Entity[];
  technologies: Entity[];
  targets: Entity[];
  cancers: Entity[];
  total: number;
  rank: number;
};

export function trialLeadership(): LeadershipRow[] {
  const g = graph();
  const rows = g.kind("institution").map((inst) => {
    const n = g.neighbours(inst.id);
    const trials = n.get("trial") ?? [];
    const drugs = n.get("drug") ?? [];
    const technologies = n.get("technology") ?? [];
    const targets = n.get("target") ?? [];
    const cancers = n.get("cancer") ?? [];
    return { institution: inst, trials, drugs, technologies, targets, cancers, total: trials.length * 3 + drugs.length * 2 + technologies.length + targets.length, rank: 0 };
  });
  rows.sort((a, b) => b.total - a.total || b.trials.length - a.trials.length || a.institution.name.localeCompare(b.institution.name));
  rows.forEach((r, i) => (r.rank = i + 1));
  return rows;
}
