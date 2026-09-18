/**
 * Citation counts for key papers, from the Europe PMC snapshot written by scripts/fetch-citations.ts
 * (public/citations/index.json). The JSON is imported, not read from disk, so this is safe on the server and
 * in client bundles alike (the same pattern as src/lib/structures.ts).
 */
import citationIndex from "../../public/citations/index.json";

export type CitationEntry = { citedBy: number; source: string; id?: string; pmid?: string; fetched: string };
export type CitationsIndex = { fetched: string; papers: Record<string, CitationEntry> };

export const CITATIONS = citationIndex as CitationsIndex;

/** The Europe PMC citation count for a paper, or undefined when no count has been fetched for it. */
export function citationFor(paperId: string): CitationEntry | undefined {
  return CITATIONS.papers[paperId];
}

/** Number of key papers with a fetched count. */
export const citationCount = () => Object.keys(CITATIONS.papers).length;

/** Europe PMC record page for the count, when the snapshot kept the source id. */
export function citationSourceUrl(c: CitationEntry): string | undefined {
  return c.id ? `https://europepmc.org/abstract/${c.source}/${c.id}` : undefined;
}

/** The tooltip line on citation chips. */
export const citationTooltip = (c: CitationEntry) => `Times cited in the Europe PMC index, updated ${c.fetched}`;
