/**
 * Adoptions: ideas from the corpus (kind "idea") that someone outside OnCo has picked up, with a
 * source that shows it. This is the uptake signal that complements the interest signal from
 * Discussions votes (scripts/fetch-votes.ts, rendered at /idea-votes/).
 *
 * Rules: `ideaId` must be an existing idea id (checked in tests); `source` is a URL to the trial
 * registration, publication, programme page, funding announcement, or policy document that
 * demonstrates the adoption. No entry without a source. Nothing here is inferred.
 *
 * Example:
 *   { ideaId: "idea-payload-switching", by: "Example Cancer Centre", date: "2026-11-02", kind: "trial", source: "https://clinicaltrials.gov/study/NCT00000000", note: "Randomised sequencing trial registered." },
 */
export type AdoptionKind = "trial" | "programme" | "publication" | "funding" | "policy" | "product" | "other";
export type Adoption = { ideaId: string; by: string; date: string; kind: AdoptionKind; source: string; note?: string };

export const adoptions: Adoption[] = [];
