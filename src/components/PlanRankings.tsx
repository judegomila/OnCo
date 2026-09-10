"use client";

import { useMemo, useState } from "react";
import { Tip } from "./Tip";
import { DownloadTable } from "./DownloadTable";
import { US_METRICS, type UsMetricKey, type UsPlanRow } from "@/data/coverage-rankings";

const fmt = (v: number, unit: string) => (unit === "%" ? `${v.toLocaleString("en-US", { maximumFractionDigits: 1 })}%` : unit === "per member" ? v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(v));

/**
 * Ranked table of US insurers and plan types. The reader picks one published metric; rows with a figure are
 * ordered by it (better first, where the metric has a direction) and rows without one follow, unranked and blank.
 * No composite score exists anywhere on the page.
 */
export function PlanRankings({ rows }: { rows: UsPlanRow[] }) {
  const [key, setKey] = useState<UsMetricKey>("paDenialRate");
  const metric = US_METRICS.find((m) => m.key === key)!;

  const { ranked, blank } = useMemo(() => {
    const withValue = rows.filter((r) => r.metrics[key] !== undefined);
    const dir = metric.betterWhen === "lower" ? 1 : -1;
    withValue.sort((a, b) => dir * (a.metrics[key]!.value - b.metrics[key]!.value) || a.name.localeCompare(b.name));
    return { ranked: withValue, blank: rows.filter((r) => r.metrics[key] === undefined) };
  }, [rows, key, metric.betterWhen]);

  const csv = () => [...ranked, ...blank].map((r, i) => {
    const m = r.metrics[key];
    return { rank: m ? i + 1 : "", plan: r.name, kind: r.kind, metric: metric.label, value: m ? m.value : "", unit: metric.unit, year: m?.year ?? "", source: m?.source.url ?? "", policy_page: r.policy.url };
  });

  const others = US_METRICS.filter((m) => m.key !== key);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <label className="text-sm text-muted" htmlFor="rank-metric">Ranked by</label>
        <select id="rank-metric" value={key} onChange={(e) => setKey(e.target.value as UsMetricKey)} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40">
          {US_METRICS.map((m) => <option key={m.key} value={m.key}>{m.label} ({m.year})</option>)}
        </select>
        <span className="text-xs text-muted">{metric.betterWhen === "lower" ? "Lower is better; lowest first." : metric.betterWhen === "higher" ? "Higher is better; highest first." : "Descriptive metric; largest first."} {ranked.length} of {rows.length} rows have a published figure.</span>
        <DownloadTable rows={csv} name={`plan ranking by ${metric.label}`} className="ml-auto" />
      </div>
      <p className="text-sm text-muted mb-3 max-w-3xl">{metric.description} Source: <a className="underline" href={metric.source.url} rel="noopener">{metric.source.label}</a>.</p>
      <div className="card results-table overflow-x-auto">
        <table className="onco">
          <thead>
            <tr>
              <th scope="col" className="w-10">#</th>
              <th scope="col">Plan or insurer</th>
              <th scope="col" className="text-right"><Tip text={metric.description} title={metric.label}><span className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] cursor-help">{metric.label}</span></Tip></th>
              <th scope="col" className="hidden lg:table-cell">Other published figures</th>
              <th scope="col" className="hidden md:table-cell">Oncology policy</th>
            </tr>
          </thead>
          <tbody>
            {[...ranked, ...blank].map((r, i) => {
              const m = r.metrics[key];
              return (
                <tr key={r.id} className={m ? "" : "text-muted"}>
                  <td className="tabular-nums">{m ? i + 1 : ""}</td>
                  <td>
                    <div className="font-medium text-foreground">{r.name}</div>
                    <div className="text-xs text-muted">{r.kind}</div>
                  </td>
                  <td className="text-right tabular-nums whitespace-nowrap">
                    {m ? (
                      <Tip text={`${m.year}. ${m.note ? m.note + " " : ""}Source: ${m.source.label}.`} title={metric.label} href={m.source.url} linkLabel="Open source">
                        <span className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] cursor-help">{fmt(m.value, metric.unit)}</span>
                        <span className="ml-1 text-[11px] text-muted">{m.year}</span>
                      </Tip>
                    ) : <span className="text-xs">no published figure</span>}
                  </td>
                  <td className="hidden lg:table-cell text-xs">
                    <ul className="flex flex-wrap gap-x-3 gap-y-0.5">
                      {others.filter((o) => r.metrics[o.key]).map((o) => {
                        const v = r.metrics[o.key]!;
                        return <li key={o.key}><a className="hover:underline" href={v.source.url} rel="noopener" title={`${o.label}, ${v.year}. ${v.source.label}`}>{o.label}: <span className="tabular-nums text-foreground">{fmt(v.value, o.unit)}</span> <span className="text-muted">({v.year})</span></a></li>;
                      })}
                    </ul>
                  </td>
                  <td className="hidden md:table-cell text-xs"><a className="underline" href={r.policy.url} rel="noopener">{r.policy.label}</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
