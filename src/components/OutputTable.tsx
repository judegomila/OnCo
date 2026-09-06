import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor, type Institution } from "@/lib/schema";
import openalex from "../../public/openalex/institutions.json";

export type OpenAlexRow = { openalexId: string; openalexName: string; works2024: number; works2025: number; cited2024: number | null; cited2025: number | null; matchedBy: "override" | "search" };
export type OpenAlexFile = { fetched: string; subfield: number; subfieldName: string; source: string; license: string; note?: string; institutions: Record<string, OpenAlexRow> };

export const OPENALEX = openalex as OpenAlexFile;

export type OutputRow = { institution: Institution; oa: OpenAlexRow; works: number; cited: number | null; rank: number };

export function outputRows(): OutputRow[] {
  const g = graph();
  const rows: OutputRow[] = [];
  for (const inst of g.kind("institution")) {
    const oa = OPENALEX.institutions[inst.id];
    if (!oa) continue;
    rows.push({ institution: inst, oa, works: oa.works2024 + oa.works2025, cited: oa.cited2024 === null || oa.cited2025 === null ? null : oa.cited2024 + oa.cited2025, rank: 0 });
  }
  rows.sort((a, b) => b.works - a.works || (b.cited ?? 0) - (a.cited ?? 0));
  rows.forEach((r, i) => (r.rank = i + 1));
  return rows;
}

export type UniversityOutputRow = { university: string; institutions: Institution[]; works: number; cited: number | null; rank: number };

/** Group by parent university where declared; institutions without a parent stand alone. */
export function universityOutputRows(): UniversityOutputRow[] {
  const rows = outputRows();
  const map = new Map<string, UniversityOutputRow>();
  for (const r of rows) {
    const key = r.institution.university ?? r.institution.name;
    // A university's own OpenAlex id (e.g. Johns Hopkins University) already includes its hospitals via lineage;
    // avoid double counting when two OnCo records resolve to the same OpenAlex id.
    const row = map.get(key) ?? { university: key, institutions: [], works: 0, cited: null as number | null, rank: 0 };
    const dupe = row.institutions.some((i) => OPENALEX.institutions[i.id]?.openalexId === r.oa.openalexId);
    row.institutions.push(r.institution);
    if (!dupe) { row.works += r.works; if (r.cited !== null) row.cited = (row.cited ?? 0) + r.cited; }
    map.set(key, row);
  }
  const out = [...map.values()].sort((a, b) => b.works - a.works || (b.cited ?? 0) - (a.cited ?? 0));
  out.forEach((r, i) => (r.rank = i + 1));
  return out;
}

export function OutputTable({ rows }: { rows: OutputRow[] }) {
  return (
    <div className="overflow-x-auto card">
      <table className="onco">
        <thead><tr><th>#</th><th>Institution</th><th>OpenAlex match</th><th>Oncology works 2024</th><th>2025</th><th>Citations to those works</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.institution.id}>
              <td className="tabular-nums text-muted">{r.rank}</td>
              <td className="min-w-[220px]"><Link href={routeFor(r.institution)} className="font-medium hover:underline">{r.institution.name}</Link>{r.institution.university && <div className="text-xs text-muted">{r.institution.university}</div>}</td>
              <td className="text-xs text-muted min-w-[200px]"><a className="underline" href={`https://openalex.org/${r.oa.openalexId}`} rel="noopener">{r.oa.openalexName}</a></td>
              <td className="tabular-nums">{r.oa.works2024.toLocaleString()}</td>
              <td className="tabular-nums">{r.oa.works2025.toLocaleString()}</td>
              <td className="tabular-nums text-muted">{r.cited === null ? "—" : r.cited.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UniversityOutputTable({ rows }: { rows: UniversityOutputRow[] }) {
  return (
    <div className="overflow-x-auto card">
      <table className="onco">
        <thead><tr><th>#</th><th>University / parent</th><th>Institutions counted</th><th>Oncology works 2024+2025</th><th>Citations</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.university}>
              <td className="tabular-nums text-muted">{r.rank}</td>
              <td className="font-medium min-w-[200px]">{r.university}</td>
              <td className="text-sm min-w-[220px]">{r.institutions.map((i) => <Link key={i.id} href={routeFor(i)} className="underline mr-2">{i.name.replace(/ \/.*$/, "")}</Link>)}</td>
              <td className="tabular-nums font-semibold">{r.works.toLocaleString()}</td>
              <td className="tabular-nums text-muted">{r.cited === null ? "—" : r.cited.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
