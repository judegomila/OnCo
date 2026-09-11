import Link from "next/link";
import { readPublicJson } from "@/lib/feed-meta";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { matchAuthorToPerson, type InstitutionResearch } from "@/lib/research";

/** Snapshot for one institution written by scripts/fetch-institution-research.ts, or null before the first fetch. */
export const readResearch = (institutionId: string) => readPublicJson<InstitutionResearch>(`openalex/research/${institutionId}.json`);

const n = (v: number) => v.toLocaleString("en-GB");
const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "0%");

/** Oncology papers per year as a small bar chart; the current year is drawn lighter because it is incomplete. */
function YearBars({ byYear }: { byYear: Record<string, number> }) {
  const years = Object.keys(byYear).sort();
  const max = Math.max(1, ...years.map((y) => byYear[y]));
  const current = String(new Date().getUTCFullYear());
  return (
    <div className="flex items-end gap-3 h-28" role="img" aria-label={`Oncology works per year: ${years.map((y) => `${y} ${byYear[y]}`).join(", ")}`}>
      {years.map((y) => (
        <div key={y} className="flex flex-col items-center justify-end gap-1 flex-1 h-full min-w-[2.5rem]" title={`${y}: ${n(byYear[y])} works${y === current ? " (year in progress)" : ""}`}>
          <span className="text-xs tabular-nums text-muted">{n(byYear[y])}</span>
          <span className={`w-full rounded-t-sm ${y === current ? "bg-accent/40" : "bg-accent"}`} style={{ height: `${Math.max(3, Math.round((byYear[y] / max) * 72))}px` }} />
          <span className="text-xs text-muted tabular-nums">{y}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Research output panel for an institution page: works per year, the most-cited recent works with DOI
 * links, and the authors with the most works, linked to a person page where the corpus has one.
 */
export function ResearchOutput({ institutionId }: { institutionId: string }) {
  const r = readResearch(institutionId);
  if (!r || r.works === 0) return null;
  const g = graph();
  const people = g.kind("person");
  const current = new Date().getUTCFullYear();
  const partial = r.years[1] >= current;
  return (
    <section className="card p-5 sm:col-span-2" aria-labelledby={`research-output-${institutionId}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h3 id={`research-output-${institutionId}`} className="text-lg font-semibold tracking-tight">Research output</h3>
        <p className="text-xs text-muted">From <a className="underline" href={`https://openalex.org/${r.openalexId}`} rel="noopener">OpenAlex</a>, oncology works in the last five years ({r.years[0]} to {r.years[1]}{partial ? ", current year in progress" : ""}); counted on {r.fetched}.</p>
      </div>
      <p className="text-sm text-muted mb-4">
        Matched to <a className="underline" href={`https://openalex.org/${r.openalexId}`} rel="noopener">{r.openalexName}</a>{r.confidence === "override" || r.confidence === "ror" ? "" : ` (${r.confidence} confidence name match)`}, including child institutions.
        <span className="text-foreground"> {n(r.works)} works</span> · {n(r.cited)} citations · {pct(r.openAccess, r.works)} open access · {pct(r.clinicalTrials, r.works)} clinical trials · {pct(r.reviews, r.works)} reviews.
      </p>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <div className="kicker mb-2">Oncology works per year</div>
          <YearBars byYear={r.byYear} />
          {r.topAuthors.length > 0 && (
            <div className="mt-6">
              <div className="kicker mb-2">Most works</div>
              <ul className="space-y-1 text-sm">
                {r.topAuthors.map((a) => {
                  const person = matchAuthorToPerson({ name: a.name }, institutionId, people);
                  return (
                    <li key={a.id} className="flex items-baseline justify-between gap-3">
                      {person ? <Link href={routeFor(person)} className="font-medium underline">{person.name}</Link> : <a href={`https://openalex.org/${a.id}`} rel="noopener" className="hover:underline">{a.name}</a>}
                      <span className="tabular-nums text-muted text-xs whitespace-nowrap">{n(a.works)} works</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {r.topWorks.length > 0 && (
          <div>
            <div className="kicker mb-2">Most cited</div>
            <div className="overflow-x-auto">
              <table className="onco">
                <thead><tr><th>Work</th><th className="hidden sm:table-cell">Journal</th><th className="text-right">Year</th><th className="text-right">Citations</th></tr></thead>
                <tbody>
                  {r.topWorks.map((w) => (
                    <tr key={w.id}>
                      <td className="min-w-[220px]">
                        {w.doi ? <a className="underline" href={w.doi} rel="noopener">{w.title}</a> : <a className="underline" href={`https://openalex.org/${w.id}`} rel="noopener">{w.title}</a>}
                        <div className="text-xs text-muted">{w.type !== "article" && <span className="capitalize">{w.type.replace(/-/g, " ")} · </span>}{w.doi && <span>{w.doi.replace(/^https:\/\/doi\.org\//, "")}</span>}{w.oaUrl && <> · <a className="underline" href={w.oaUrl} rel="noopener">open access</a></>}</div>
                      </td>
                      <td className="hidden sm:table-cell text-muted text-sm">{w.journal ?? ""}</td>
                      <td className="text-right tabular-nums text-muted">{w.year}</td>
                      <td className="text-right tabular-nums font-medium">{n(w.cited)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
