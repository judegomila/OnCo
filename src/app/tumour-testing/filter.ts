import type { RegStatus, SampleType, TestScope } from "@/data/tumour-tests";

/**
 * Plain row data for the tumour testing table: strings and arrays only, so it can cross from the server page to
 * the client table (no React nodes, no functions). Logos and routes are resolved on the server.
 */
export type TestRow = {
  id: string;
  name: string;
  url: string;
  companyId: string;
  companyName: string;
  companyRoute?: string;
  companyLogo?: string;
  recordRoute?: string;
  recordKind?: string;
  sample: SampleType;
  scope: TestScope;
  returns: string;
  us: string;
  eu: string;
  statuses: RegStatus[];
  technologies: { id: string; name: string; route: string; kind: string }[];
  /** Biomarker readouts (kind "biomarker") this test reports, as links. */
  readouts?: { id: string; name: string; route: string; glyph: string }[];
  note?: string;
};

export type Facet = "sample" | "scope" | "company" | "status";
export const FACETS: Facet[] = ["sample", "scope", "company", "status"];
export type Filter = Partial<Record<Facet, string>>;

/** Read the filter from a query string (`?sample=blood&scope=exome`); unknown keys are ignored. */
export function parseFilter(search: string): Filter {
  const p = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const f: Filter = {};
  for (const k of FACETS) { const v = p.get(k); if (v) f[k] = v; }
  return f;
}

/** Query string for a filter, in facet order, without the leading `?`; empty when nothing is set. */
export function filterQuery(f: Filter): string {
  const p = new URLSearchParams();
  for (const k of FACETS) if (f[k]) p.set(k, f[k]!);
  return p.toString();
}

/** Href for the table filtered one way, used by the deep links above it. */
export function filterHref(f: Filter, path = "/tumour-testing/"): string {
  const q = filterQuery(f);
  return `${path}${q ? `?${q}` : ""}#tests`;
}

export function matches(r: TestRow, f: Filter): boolean {
  if (f.sample && r.sample !== f.sample) return false;
  if (f.scope && r.scope !== f.scope) return false;
  if (f.company && r.companyId !== f.company) return false;
  if (f.status && !r.statuses.includes(f.status as RegStatus)) return false;
  return true;
}

export const isEmpty = (f: Filter) => FACETS.every((k) => !f[k]);
