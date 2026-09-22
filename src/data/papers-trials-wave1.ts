import type { PaperInput } from "@/lib/schema";

const asOf = "2026-09-22";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
void p;

/**
 * Wave 1 of docs/CONTENT-ROADMAP.md: the papers behind trials that had none. Written by scripts/fetch-trial-papers.ts,
 * which asks Europe PMC for PubMed records whose title or abstract cites the trial's NCT id and keeps the most cited
 * eligible paper (plus one later report when its title says it is an update). Title, journal, year, DOI, PMID and
 * authors are read from the Europe PMC record; the summary reproduces the record's abstract with markup removed
 * and house-style dashes; the TL;DR, "what it means" and caveats say only how the record was matched. Nothing here
 * has been read by an editor: findings are left empty on purpose. Trials link to these records through
 * src/data/trial-key-papers-wave1.ts. Do not edit by hand; re-run the script.
 */
export const papersTrialsWave1: PaperInput[] = [
];
