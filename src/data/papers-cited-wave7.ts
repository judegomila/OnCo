import type { PaperInput } from "@/lib/schema";

const asOf = "2026-09-22";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

/**
 * Wave 7 of docs/CONTENT-ROADMAP.md: paper pages for the DOIs that records cite in their external links without a
 * paper record behind them. Written by scripts/fetch-cited-papers.ts, which asks Europe PMC for the record carrying
 * each cited DOI (query DOI:"...") and writes one paper per DOI. Title, journal, year, DOI, PMID and authors are read
 * from the Europe PMC record; the summary reproduces the record's abstract with markup removed and house-style
 * dashes; the TL;DR, "what it means" and caveats say only how the record was matched (by the DOI the citing record
 * links). Nothing here has been read by an editor: findings are left empty on purpose. Each record links the citing
 * records (trials through `trials`, everything else through `related`) and the journal, never the citing record's
 * drugs or cancers. Citing records gain these papers in `keyPapers` through src/data/cited-paper-links-wave7.ts.
 * Do not edit by hand; re-run the script.
 */
export const papersCitedWave7: PaperInput[] = [
];
