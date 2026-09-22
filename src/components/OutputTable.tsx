import { graph } from "@/lib/graph";
import { type Institution } from "@/lib/schema";
import { readPublicJson } from "@/lib/feed-meta";
import type { ResearchIndex } from "@/lib/research";
import openalex from "../../public/openalex/institutions.json";
import { ResearchRanking, type RankingRow } from "./ResearchRanking";
import type { MoreRows } from "@/lib/static-tables";

export type OpenAlexRow = { openalexId: string; openalexName: string; works2024: number; works2025: number; cited2024: number | null; cited2025: number | null; matchedBy: "override" | "search" };
export type OpenAlexFile = { fetched: string; subfield: number; subfieldName: string; source: string; license: string; note?: string; institutions: Record<string, OpenAlexRow> };

export const OPENALEX = openalex as OpenAlexFile;

/** Counts-only five-year snapshot from scripts/fetch-institution-research.ts, or null before the first fetch. */
export const readResearchIndex = () => readPublicJson<ResearchIndex>("openalex/research-index.json");

export type OutputRow = {
  institution: Institution; openalexId: string; openalexName: string;
  works2024: number; works2025: number; cited2yr: number | null;
  works5: number | null; cited5: number | null; rank: number;
};

/**
 * One row per institution with an OpenAlex match in either snapshot. The two-year columns come from
 * institutions.json; where an institution is only in research-index.json, its 2024 and 2025 counts come
 * from that snapshot's per-year counts (same filter) and the two-year citation figure is unknown.
 */
export function outputRows(): OutputRow[] {
  const g = graph();
  const research = readResearchIndex();
  const rows: OutputRow[] = [];
  for (const inst of g.kind("institution")) {
    const oa = OPENALEX.institutions[inst.id];
    const r = research?.institutions[inst.id];
    if (!oa && !r) continue;
    const works2024 = oa ? oa.works2024 : (r!.byYear["2024"] ?? 0);
    const works2025 = oa ? oa.works2025 : (r!.byYear["2025"] ?? 0);
    const cited2yr = oa && oa.cited2024 !== null && oa.cited2025 !== null ? oa.cited2024 + oa.cited2025 : null;
    rows.push({ institution: inst, openalexId: (oa ?? r!).openalexId, openalexName: (oa ?? r!).openalexName, works2024, works2025, cited2yr, works5: r ? r.works : null, cited5: r ? r.cited : null, rank: 0 });
  }
  rows.sort((a, b) => b.works2024 + b.works2025 - (a.works2024 + a.works2025) || (b.works5 ?? 0) - (a.works5 ?? 0));
  rows.forEach((r, i) => (r.rank = i + 1));
  return rows;
}

export type UniversityOutputRow = { university: string; institutions: Institution[]; works2024: number; works2025: number; works: number; cited: number | null; works5: number | null; cited5: number | null; rank: number };

/** Group by parent university where declared; institutions without a parent stand alone. */
export function universityOutputRows(): UniversityOutputRow[] {
  const rows = outputRows();
  const map = new Map<string, UniversityOutputRow>();
  const seen = new Map<string, Set<string>>();
  for (const r of rows) {
    const key = r.institution.university ?? r.institution.name;
    // A university's own OpenAlex id (e.g. Johns Hopkins University) already includes its hospitals via lineage;
    // avoid double counting when two OnCo records resolve to the same OpenAlex id.
    const row = map.get(key) ?? { university: key, institutions: [], works2024: 0, works2025: 0, works: 0, cited: null as number | null, works5: null as number | null, cited5: null as number | null, rank: 0 };
    const ids = seen.get(key) ?? new Set<string>();
    const dupe = ids.has(r.openalexId);
    ids.add(r.openalexId);
    seen.set(key, ids);
    row.institutions.push(r.institution);
    if (!dupe) {
      row.works2024 += r.works2024;
      row.works2025 += r.works2025;
      row.works += r.works2024 + r.works2025;
      if (r.cited2yr !== null) row.cited = (row.cited ?? 0) + r.cited2yr;
      if (r.works5 !== null) row.works5 = (row.works5 ?? 0) + r.works5;
      if (r.cited5 !== null) row.cited5 = (row.cited5 ?? 0) + r.cited5;
    }
    map.set(key, row);
  }
  const out = [...map.values()].sort((a, b) => b.works - a.works || (b.works5 ?? 0) - (a.works5 ?? 0));
  out.forEach((r, i) => (r.rank = i + 1));
  return out;
}

/** The per-institution table. `rows` are flat RankingRows (src/lib/tables/universities.ts), the first page when `more` is set. */
export function OutputTable({ rows, more }: { rows: RankingRow[]; more?: MoreRows }) {
  const years = readResearchIndex()?.years ?? null;
  return <ResearchRanking rows={rows} years={years} mode="institution" more={more} />;
}

export function UniversityOutputTable({ rows, more }: { rows: RankingRow[]; more?: MoreRows }) {
  const years = readResearchIndex()?.years ?? null;
  return <ResearchRanking rows={rows} years={years} mode="university" more={more} />;
}
