/**
 * Institution research output from OpenAlex: the shapes written by scripts/fetch-institution-research.ts
 * (public/openalex/research/<institutionId>.json and public/openalex/research-index.json) and the pure
 * helpers shared by the fetcher, the institution page panel and the tests. No file system access here;
 * server components read the snapshots with readPublicJson from feed-meta.
 */

/** Oncology subfield in OpenAlex's topic taxonomy; the same filter /universities/ uses. */
export const ONCOLOGY_SUBFIELD = 2730;
/** OpenAlex concept "Clinical trial", used for the share of works that are trials. */
export const CLINICAL_TRIAL_CONCEPT = "C535046627";

export type MatchConfidence = "override" | "ror" | "high" | "medium";

export type ResearchWork = {
  /** OpenAlex work id, e.g. W4200584507. */
  id: string;
  title: string;
  /** Full https://doi.org/ URL, or null when OpenAlex has no DOI for the work. */
  doi: string | null;
  year: number;
  journal: string | null;
  cited: number;
  type: string;
  /** Best open-access URL from OpenAlex, or null when the work is closed. */
  oaUrl: string | null;
};

export type ResearchAuthor = {
  /** OpenAlex author id, e.g. A5049731288. */
  id: string;
  name: string;
  /** Oncology works in the window on which this author appears. */
  works: number;
};

export type InstitutionResearch = {
  institutionId: string;
  openalexId: string;
  openalexName: string;
  ror: string | null;
  confidence: MatchConfidence;
  fetched: string;
  /** Inclusive publication-year window used in every count. */
  years: [number, number];
  /** Oncology works in the window (OpenAlex meta.count). */
  works: number;
  /** Summed citations to those works (OpenAlex meta.cited_by_count_sum). */
  cited: number;
  byYear: Record<string, number>;
  /** Works flagged open access by OpenAlex. */
  openAccess: number;
  /** Works carrying the OpenAlex "Clinical trial" concept. */
  clinicalTrials: number;
  /** Works whose OpenAlex type is "review". */
  reviews: number;
  topWorks: ResearchWork[];
  topAuthors: ResearchAuthor[];
};

export type ResearchIndexRow = {
  openalexId: string;
  openalexName: string;
  confidence: MatchConfidence;
  works: number;
  cited: number;
  byYear: Record<string, number>;
  openAccess: number;
  clinicalTrials: number;
  reviews: number;
};

export type ResearchIndex = {
  fetched: string;
  source: string;
  license: string;
  subfield: number;
  years: [number, number];
  institutions: Record<string, ResearchIndexRow>;
  /** Institution ids that could not be matched confidently, with the reason. */
  unresolved: Record<string, string>;
};

/** Five publication years ending in the current one: the window every count uses. */
export function researchWindow(now = new Date()): [number, number] {
  const y = now.getUTCFullYear();
  return [y - 4, y];
}

const SUFFIXES = new Set(["jr", "sr", "ii", "iii", "iv", "md", "phd", "frcp", "facp", "mbbs", "dphil", "mrcp", "frcs", "obe", "cbe"]);

/** Lower-case ASCII tokens of a person's name, without diacritics, punctuation, or honorific suffixes. */
export function nameTokens(name: string): string[] {
  return name
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z\s'-]/g, " ")
    .replace(/['-]/g, "")
    .split(/\s+/)
    .filter((t) => t && !SUFFIXES.has(t));
}

export const normaliseName = (name: string) => nameTokens(name).join(" ");

/**
 * Whether an OpenAlex author display name plausibly names the same person as a corpus record.
 * Rule: same family name (last token), and the given names agree either fully or as initials
 * ("Luis A. Diaz Jr." matches "Luis Diaz" and "L. A. Diaz"; it does not match "Laura Diaz").
 * Names in either order (Kim Yong, Yong Kim) match when the full token sets are equal.
 */
export function sameAuthor(a: string, b: string): boolean {
  const ta = nameTokens(a), tb = nameTokens(b);
  if (ta.length < 2 || tb.length < 2) return false;
  if (ta.join(" ") === tb.join(" ")) return true;
  const fullA = ta.filter((t) => t.length > 1), fullB = tb.filter((t) => t.length > 1);
  if (fullA.length >= 2 && fullA.length === fullB.length && [...fullA].sort().join(" ") === [...fullB].sort().join(" ")) return true;
  if (ta[ta.length - 1] !== tb[tb.length - 1]) return false;
  const ga = ta.slice(0, -1), gb = tb.slice(0, -1);
  const initialsAgree = (x: string, y: string) => x === y || (x.length === 1 && y.startsWith(x)) || (y.length === 1 && x.startsWith(y));
  if (!initialsAgree(ga[0], gb[0])) return false;
  // Any further given names must be compatible where both sides have them.
  for (let i = 1; i < Math.min(ga.length, gb.length); i++) if (!initialsAgree(ga[i], gb[i])) return false;
  return true;
}

export type PersonLike = { id: string; name: string; aka?: string[]; institutionId?: string; institutions?: string[]; orcid?: string };

/**
 * Find the corpus person a top author corresponds to: ORCID when both sides carry one, otherwise a
 * normalised-name match restricted to people attached to the same institution. Returns undefined when
 * no person or more than one person matches.
 */
export function matchAuthorToPerson<P extends PersonLike>(author: { name: string; orcid?: string | null }, institutionId: string, people: P[]): P | undefined {
  if (author.orcid) {
    const orcid = author.orcid.replace(/^https?:\/\/orcid\.org\//, "");
    const hit = people.filter((p) => p.orcid && p.orcid.replace(/^https?:\/\/orcid\.org\//, "") === orcid);
    if (hit.length === 1) return hit[0];
  }
  const local = people.filter((p) => p.institutionId === institutionId || p.institutions?.includes(institutionId));
  const hits = local.filter((p) => sameAuthor(p.name, author.name) || (p.aka ?? []).some((n) => sameAuthor(n, author.name)));
  return hits.length === 1 ? hits[0] : undefined;
}

/** Tokens of an institution name for matching against OpenAlex display names. */
export function institutionTokens(name: string): string[] {
  const STOP = new Set(["of", "the", "for", "and", "at", "in", "de", "del", "della", "di", "da", "do", "dos", "das", "la", "le", "les", "du", "des", "der", "die", "das", "und", "y", "e", "a", "an"]);
  return name
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

/** Jaccard similarity of two institution names' token sets, 0 to 1. */
export function nameSimilarity(a: string, b: string): number {
  const ta = new Set(institutionTokens(a)), tb = new Set(institutionTokens(b));
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / (ta.size + tb.size - inter);
}

/** Bare DOI from a doi.org URL or an already-bare DOI. */
export function bareDoi(doi: string): string {
  return doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim();
}
