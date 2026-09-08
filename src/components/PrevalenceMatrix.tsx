"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { Toolbar } from "./filters/ResultsTable";

export type MatrixCell = { pct: number | string; value: number | null; measure?: string; source?: string };
export type MatrixTarget = { id: string; name: string; route: string; cls: string; cells: Record<string, MatrixCell> };
export type MatrixCancer = { id: string; name: string; route: string; group: string };

function shade(v: number | null): string {
  if (v === null) return "bg-foreground/5 text-muted";
  if (v >= 75) return "bg-violet-600 text-white";
  if (v >= 50) return "bg-violet-500/80 text-white";
  if (v >= 25) return "bg-violet-400/60";
  if (v >= 10) return "bg-violet-300/50";
  return "bg-violet-200/40";
}

/** Targets × cancers matrix of prevalence, filterable by cancer and target class; cells link to the target page. */
export function PrevalenceMatrix({ targets, cancers }: { targets: MatrixTarget[]; cancers: MatrixCancer[] }) {
  const [sel, setSel] = useState<string[]>([]);
  const [cls, setCls] = useState<string[]>([]);
  const [q, setQ] = useState("");

  const shownCancers = useMemo(() => {
    const list = sel.length ? cancers.filter((c) => sel.includes(c.id)) : cancers;
    return list.filter((c) => targets.some((t) => t.cells[c.id]));
  }, [cancers, sel, targets]);
  const shownTargets = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return targets.filter((t) => (!cls.length || cls.includes(t.cls)) && (!needle || t.name.toLowerCase().includes(needle)) && shownCancers.some((c) => t.cells[c.id]));
  }, [targets, cls, q, shownCancers]);

  const cancerOpts = cancers.map((c) => ({ value: c.id, label: c.name.replace(/ \(.*\)$/, ""), group: c.group }));
  const clsOpts = [...new Set(targets.map((t) => t.cls))].sort().map((v) => ({ value: v, label: v, count: targets.filter((t) => t.cls === v).length }));

  return (
    <div>
      <Toolbar count={shownTargets.length} total={targets.length} noun="targets"
        left={<>
          <FacetSelect label="Cancer" options={cancerOpts} value={sel} onChange={(v) => setSel(v as string[])} multi allLabel="All" width="w-64" />
          <FacetSelect label="Target class" options={clsOpts} value={cls} onChange={(v) => setCls(v as string[])} multi searchable={false} allLabel="All" width="w-52" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter targets…" aria-label="Filter targets" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-48" />
          {(sel.length || cls.length || q) ? <button type="button" onClick={() => { setSel([]); setCls([]); setQ(""); }} className="text-sm underline text-muted">Clear</button> : null}
        </>} />
      <div className="card overflow-x-auto">
        <table className="onco text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 bg-card z-10">Target</th>
              {shownCancers.map((c) => <th key={c.id} className="whitespace-nowrap"><Link href={c.route} className="hover:underline">{c.name.replace(/ \(.*\)$/, "").replace(" cancer", "")}</Link></th>)}
            </tr>
          </thead>
          <tbody>
            {shownTargets.map((t) => (
              <tr key={t.id}>
                <td className="sticky left-0 bg-card z-10 whitespace-nowrap"><Link href={t.route} className="font-medium hover:underline">{t.name}</Link><div className="text-[10px] text-muted">{t.cls}</div></td>
                {shownCancers.map((c) => {
                  const cell = t.cells[c.id];
                  return (
                    <td key={c.id} className="p-1 text-center">
                      {cell ? (
                        <Link href={t.route} className={`block rounded px-1.5 py-1 tabular-nums ${shade(cell.value)}`} title={`${t.name} in ${c.name}: ${typeof cell.pct === "number" ? cell.pct + "%" : cell.pct}${cell.measure ? ` (${cell.measure})` : ""}`} aria-label={`${t.name} in ${c.name}: ${typeof cell.pct === "number" ? cell.pct + "%" : cell.pct}`}>
                          {typeof cell.pct === "number" ? `${cell.pct}%` : /^n\/?a$/i.test(String(cell.pct)) ? "n/a" : `${cell.pct}%`}
                        </Link>
                      ) : <span className="text-muted/40">·</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3 py-2 text-xs text-muted flex flex-wrap items-center gap-2">Shade = prevalence: <span className="chip bg-violet-200/40">&lt;10%</span><span className="chip bg-violet-300/50">10-25%</span><span className="chip bg-violet-400/60">25-50%</span><span className="chip bg-violet-500/80 text-white">50-75%</span><span className="chip bg-violet-600 text-white">≥75%</span><span className="ml-2">Hover a cell for the measure; click for sources on the target page.</span></div>
      </div>
    </div>
  );
}
