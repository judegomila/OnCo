/**
 * Citing record to paper links written by scripts/fetch-cited-papers.ts (wave 7 of docs/CONTENT-ROADMAP.md). Each
 * entry names the paper records, in src/data/papers-cited-wave7.ts or elsewhere in the corpus, that a record cites by
 * DOI in its external links; src/data/index.ts merges them into the record's `keyPapers`, so the bare DOI reference
 * also resolves to a page inside OnCo. CITED_PAPER_SKIP lists the cited DOIs the script will not retry, keyed by DOI,
 * with the reason and the citing records: Europe PMC has no record for the DOI (book chapters, publisher pages,
 * DOIs that resolve elsewhere), or the record is not a journal article or preprint. Clear an entry to try again.
 * Do not edit by hand; re-run the script.
 */
export const citedPaperLinksWave7: Record<string, string[]> = {
};

export const CITED_PAPER_SKIP: Record<string, string> = {
};
