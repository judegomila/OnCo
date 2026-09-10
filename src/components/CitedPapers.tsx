import Link from "next/link";
import { readPublicJson } from "@/lib/feed-meta";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Sparkline } from "@/components/PapersPulse";

/** Shape written by scripts/fetch-citations.ts (public/openalex/papers.json). */
export type PaperCitations = { doi: string; openalexId: string; cited: number; byYear: Record<string, number>; year?: number; title?: string };
export type CitationsSnapshot = { fetched: string; source: string; license: string; papers: Record<string, PaperCitations>; missing: string[] };

export const readCitations = () => readPublicJson<CitationsSnapshot>("openalex/papers.json");

/** Most cited key papers, with total and recent-year citations from OpenAlex. */
export function CitedPapers({ limit = 25 }: { limit?: number }) {
  const snap = readCitations();
  if (!snap) return <p className="card p-4 text-sm text-muted">Citation counts have not been fetched yet. Run <code>npx tsx scripts/fetch-citations.ts</code>.</p>;
  const g = graph();
  const rows = Object.entries(snap.papers)
    .map(([id, c]) => ({ id, c, e: g.get(id) }))
    .filter((r) => r.e)
    .sort((a, b) => b.c.cited - a.c.cited)
    .slice(0, limit);
  const thisYear = String(new Date().getFullYear());
  const lastYear = String(new Date().getFullYear() - 1);
  const total = Object.keys(snap.papers).length;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Citations for {total} of {g.kind("paper").length} key papers, from <a className="underline" href="https://openalex.org/" rel="noopener">OpenAlex</a> (CC0) on {snap.fetched}. Total citations reward age; the last two years show whether a paper is still being built on.</p>
      <div className="card overflow-x-auto">
        <table className="onco">
          <thead><tr><th>#</th><th>Paper</th><th className="hidden sm:table-cell">Journal</th><th className="text-right">Citations</th><th className="text-right hidden md:table-cell">{lastYear}</th><th className="text-right hidden md:table-cell">{thisYear}</th><th className="hidden lg:table-cell">By year</th></tr></thead>
          <tbody>
            {rows.map((r, i) => {
              const e = r.e!;
              return (
                <tr key={r.id}>
                  <td className="tabular-nums text-muted">{i + 1}</td>
                  <td><Link href={routeFor(e)} className="font-medium hover:underline">{e.name}</Link>{e.kind === "paper" && <div className="text-xs text-muted">{e.authors} · {e.year}</div>}</td>
                  <td className="hidden sm:table-cell text-muted">{e.kind === "paper" ? e.journal : ""}</td>
                  <td className="text-right tabular-nums font-medium">{r.c.cited.toLocaleString()}</td>
                  <td className="text-right tabular-nums text-muted hidden md:table-cell">{(r.c.byYear[lastYear] ?? 0).toLocaleString()}</td>
                  <td className="text-right tabular-nums text-muted hidden md:table-cell">{(r.c.byYear[thisYear] ?? 0).toLocaleString()}</td>
                  <td className="hidden lg:table-cell"><Sparkline counts={r.c.byYear} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {snap.missing.length > 0 && <p className="text-xs text-muted">Not found in OpenAlex by DOI: {snap.missing.map((id, i) => { const e = g.get(id); return <span key={id}>{i > 0 && ", "}{e ? <Link href={routeFor(e)} className="underline">{e.name}</Link> : id}</span>; })}.</p>}
    </div>
  );
}
