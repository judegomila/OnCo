import { REL_FIELDS } from "@/lib/kinds";
import type { EntityInput } from "@/lib/schema";
import authored from "./person-trial-links.generated.json";

/**
 * Cross-links written at build time from what the records already say, so nobody types the reverse of a link by
 * hand (docs/proposals/cross-links-census-2026-11.md). Applied in src/data/index.ts after every other step, the
 * way a biomarker readout's reverse links are written there.
 *
 * Idea and bottleneck. An idea names the bottlenecks it attacks in `bottlenecks`; a bottleneck can name an idea only
 * in `related`. On 11 November 2026, 1,725 of the 2,498 idea-to-bottleneck links and 65 of the 838
 * bottleneck-to-idea links ran one way: the bottleneck page found its ideas by backlink, and the idea page read only
 * its own field, so 65 bottlenecks that named an idea were missing from that idea's "Bottlenecks it attacks". Here
 * each side gains what the other names: the idea in the bottleneck's `related`, the bottleneck in the idea's
 * `bottlenecks`. src/data/cross-links-derived.test.ts fails if a one-way link is left in the graph.
 */
export function withReciprocalIdeaBottlenecks(records: EntityInput[]): EntityInput[] {
  const kindOf = new Map(records.map((e) => [e.id, e.kind]));
  /** For each record id, the ids of the other kind that name it and should be named back. */
  const owed = new Map<string, string[]>();
  const owe = (to: string, from: string) => { const l = owed.get(to) ?? []; if (!l.includes(from)) l.push(from); owed.set(to, l); };
  for (const e of records) {
    if (e.kind !== "idea" && e.kind !== "bottleneck") continue;
    const other = e.kind === "idea" ? "bottleneck" : "idea";
    for (const f of REL_FIELDS) for (const to of (e as Record<string, unknown>)[f] as string[] | undefined ?? []) if (kindOf.get(to) === other) owe(to, e.id);
  }
  return records.map((e) => {
    const from = owed.get(e.id);
    if (!from) return e;
    if (e.kind === "idea") {
      const have = new Set(REL_FIELDS.flatMap((f) => (e as Record<string, unknown>)[f] as string[] | undefined ?? []));
      const add = from.filter((id) => !have.has(id));
      return add.length ? { ...e, bottlenecks: [...(e.bottlenecks ?? []), ...add] } : e;
    }
    if (e.kind === "bottleneck") {
      const have = new Set(REL_FIELDS.flatMap((f) => (e as Record<string, unknown>)[f] as string[] | undefined ?? []));
      const add = from.filter((id) => !have.has(id));
      return add.length ? { ...e, related: [...(e.related ?? []), ...add] } : e;
    }
    return e;
  });
}

/**
 * Person and trial. A person is linked to a trial when they are an author of a paper that reports it, confirmed by
 * an ORCID or by a full first name and an affiliation naming their institution (./person-trial-authorship.ts, from
 * the author lists scripts/fetch-trial-authors.ts read from Europe PMC). The trial id is added to the person's
 * `trials`, so the trial page lists the person by backlink; a pair either record already states is left as it is, and
 * an id that is no longer a record of the right kind is skipped. A name that could not be confirmed links nothing.
 */
export function withAuthoredTrials(records: EntityInput[], links: Record<string, Array<{ trialId: string }>>): EntityInput[] {
  const byId = new Map(records.map((e) => [e.id, e]));
  const rel = (e: EntityInput) => new Set(REL_FIELDS.flatMap((f) => (e as Record<string, unknown>)[f] as string[] | undefined ?? []));
  return records.map((e) => {
    const mine = e.kind === "person" ? links[e.id] : undefined;
    if (!mine) return e;
    const have = rel(e);
    const add = [...new Set(mine.map((l) => l.trialId))].filter((id) => { const t = byId.get(id); return t?.kind === "trial" && !have.has(id) && !rel(t).has(e.id); });
    return add.length ? { ...e, trials: [...(e.trials ?? []), ...add] } : e;
  });
}

/** Every derived cross-link, in order. */
export function withDerivedCrossLinks(records: EntityInput[]): EntityInput[] {
  return withAuthoredTrials(withReciprocalIdeaBottlenecks(records), (authored as { links: Record<string, Array<{ trialId: string }>> }).links);
}
