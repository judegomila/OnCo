"use client";

import { useState } from "react";
import { buildApiUrl, buildSearchUrl, parseStudies, type CtgovStudy } from "@/lib/ctgov";

/**
 * Live list of recruiting trials from ClinicalTrials.gov API v2 (CORS is open, no key).
 * Loads on demand so we do not hit the API on every page view.
 */
export function TrialFinder({ condition, intervention, title }: { condition?: string; intervention?: string; title: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [studies, setStudies] = useState<CtgovStudy[]>([]);
  const searchUrl = buildSearchUrl({ condition, intervention });

  const load = async () => {
    setState("loading");
    try {
      const r = await fetch(buildApiUrl({ condition, intervention, pageSize: 12 }));
      if (!r.ok) throw new Error(String(r.status));
      setStudies(parseStudies(await r.json()));
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="kicker">Recruiting trials · live from ClinicalTrials.gov</div>
          <div className="font-medium mt-0.5">{title}</div>
          <div className="text-xs text-muted mt-0.5">
            {condition && <span>condition: <em>{condition}</em></span>}{condition && intervention && " · "}{intervention && <span>intervention: <em>{intervention}</em></span>}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {state === "idle" && <button onClick={load} className="rounded-lg bg-accent text-white px-3 py-1.5 font-medium hover:brightness-110">Load recruiting trials</button>}
          {state === "done" && <button onClick={load} className="text-muted underline">Refresh</button>}
          <a href={searchUrl} rel="noopener" className="underline text-muted">Open on ClinicalTrials.gov →</a>
        </div>
      </div>

      {state === "loading" && <p className="text-sm text-muted mt-3">Querying ClinicalTrials.gov…</p>}
      {state === "error" && (
        <p className="text-sm text-muted mt-3">Could not reach ClinicalTrials.gov from your browser (network or CORS). <a className="underline" href={searchUrl} rel="noopener">Run the same search there</a>.</p>
      )}
      {state === "done" && studies.length === 0 && <p className="text-sm text-muted mt-3">No recruiting trials matched this exact query. <a className="underline" href={searchUrl} rel="noopener">Broaden the search on ClinicalTrials.gov</a>.</p>}
      {state === "done" && studies.length > 0 && (
        <div className="overflow-x-auto mt-3">
          <table className="onco">
            <thead><tr><th>NCT</th><th>Title</th><th>Phase</th><th>Sponsor</th><th>Start</th></tr></thead>
            <tbody>
              {studies.map((s) => (
                <tr key={s.nctId}>
                  <td><a className="underline font-mono text-xs" href={`https://clinicaltrials.gov/study/${s.nctId}`} rel="noopener">{s.nctId}</a></td>
                  <td className="max-w-md">{s.title}</td>
                  <td className="tabular-nums whitespace-nowrap">{s.phase}</td>
                  <td className="text-muted">{s.sponsor}</td>
                  <td className="tabular-nums text-muted whitespace-nowrap">{s.start ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted mt-2">Showing the most recently updated recruiting studies. Eligibility, sites, and status change often; confirm on the registry and with your clinical team.</p>
        </div>
      )}
    </div>
  );
}
