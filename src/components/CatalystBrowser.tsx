"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { Toolbar } from "./filters/ResultsTable";
import { KIND_COLOR, statusClass } from "@/lib/text";
import { dateLabel, quarterOf, sortKey, toIcs } from "@/lib/ics";

export type CatalystRef = { id: string; name: string; route: string; kind: string };
export type CatalystEvent = {
  id: string;
  date: string;
  kind: string;
  kindLabel: string;
  tone: string;
  title: string;
  note: string;
  confidence: "confirmed" | "expected";
  source?: string;
  companies: CatalystRef[];
  refs: CatalystRef[];
  /** True when the whole period lies before the build date. */
  past: boolean;
  /** "calendar" rows come from calendar.ts, "catalyst" rows from catalysts.ts. */
  origin: "calendar" | "catalyst";
};

const quarterLabel = (q: string) => { const m = q.match(/^(\d{4})-Q([1-4])$/); return m ? `Q${m[2]} ${m[1]}` : q; };

/** Filterable, quarter-grouped catalyst list with a client-side .ics export of whatever is on screen. */
export function CatalystBrowser({ events, feedPath }: { events: CatalystEvent[]; feedPath: string }) {
  const [companies, setCompanies] = useState<string[]>([]);
  const [quarter, setQuarter] = useState<string | null>(null);
  const [kinds, setKinds] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<string | null>(null);
  const [showPast, setShowPast] = useState(false);

  const sorted = useMemo(() => [...events].sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date))), [events]);
  const filtered = useMemo(() => sorted.filter((e) =>
    (showPast || !e.past)
    && (!companies.length || e.companies.some((c) => companies.includes(c.id)))
    && (!quarter || quarterOf(e.date) === quarter)
    && (!kinds.length || kinds.includes(e.kind))
    && (!confidence || e.confidence === confidence)), [sorted, companies, quarter, kinds, confidence, showPast]);

  const opt = (f: (e: CatalystEvent) => string[], labelOf: (v: string) => string, pool = sorted) => {
    const m = new Map<string, number>();
    for (const e of pool) for (const v of f(e)) m.set(v, (m.get(v) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1] || labelOf(a[0]).localeCompare(labelOf(b[0]))).map(([value, count]) => ({ value, label: labelOf(value), count }));
  };
  const companyName = useMemo(() => { const m = new Map<string, string>(); for (const e of events) for (const c of e.companies) m.set(c.id, c.name); return m; }, [events]);
  const kindName = useMemo(() => { const m = new Map<string, string>(); for (const e of events) m.set(e.kind, e.kindLabel); return m; }, [events]);
  const quarters = useMemo(() => [...new Set(sorted.filter((e) => showPast || !e.past).map((e) => quarterOf(e.date)))].sort().map((q) => ({ value: q, label: quarterLabel(q) })), [sorted, showPast]);

  const groups = useMemo(() => { const m = new Map<string, CatalystEvent[]>(); for (const e of filtered) { const q = quarterOf(e.date); m.set(q, [...(m.get(q) ?? []), e]); } return [...m.entries()]; }, [filtered]);

  const download = () => {
    const ics = toIcs(filtered.map((e) => ({ uid: `onco-${e.origin}-${e.id}`, date: e.date, summary: e.title, description: `${e.note}${e.confidence === "expected" ? "\n\nEditorial estimate; can slip by quarters." : ""}${e.companies.length ? `\n\nCompanies: ${e.companies.map((c) => c.name).join(", ")}` : ""}`, url: e.source, categories: [e.kindLabel, e.confidence] })), { name: "OnCo oncology catalysts (filtered)", description: "Exported from onco.cc/catalysts/", stamp: new Date() });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "onco-catalysts.ics"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const anyFilter = companies.length || quarter || kinds.length || confidence || showPast;

  return (
    <div>
      <Toolbar count={filtered.length} total={events.length} noun="catalysts"
        left={<>
          <FacetSelect label="Company" options={opt((e) => e.companies.map((c) => c.id), (v) => companyName.get(v) ?? v)} value={companies} onChange={(v) => setCompanies(v as string[])} multi allLabel="Any" width="w-56" />
          <FacetSelect label="Quarter" options={quarters} value={quarter} onChange={(v) => setQuarter(v as string | null)} searchable={false} allLabel="Any" width="w-40" />
          <FacetSelect label="Type" options={opt((e) => [e.kind], (v) => kindName.get(v) ?? v)} value={kinds} onChange={(v) => setKinds(v as string[])} multi searchable={false} allLabel="Any" width="w-48" />
          <FacetSelect label="Confidence" options={[{ value: "confirmed", label: "Confirmed" }, { value: "expected", label: "Expected" }]} value={confidence} onChange={(v) => setConfidence(v as string | null)} searchable={false} allLabel="Any" width="w-40" />
          <label className="text-sm flex items-center gap-1.5 text-muted"><input type="checkbox" checked={showPast} onChange={(e) => setShowPast(e.target.checked)} /> include past</label>
          {anyFilter ? <button type="button" onClick={() => { setCompanies([]); setQuarter(null); setKinds([]); setConfidence(null); setShowPast(false); }} className="text-sm underline text-muted">Reset</button> : null}
        </>}
        right={<>
          <button type="button" onClick={download} disabled={!filtered.length} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-surface disabled:opacity-40">Download .ics ({filtered.length})</button>
          <a href={feedPath} className="text-sm underline text-muted whitespace-nowrap" title="Subscribe to the full feed in your calendar app">Subscribe</a>
        </>} />

      {groups.length === 0 && <div className="card px-6 py-12 text-center text-muted text-sm">Nothing matches. Clear a filter.</div>}
      <ol className="relative border-l-2 border-border ml-3 space-y-10 mt-4">
        {groups.map(([q, list]) => (
          <li key={q} className="ml-6">
            <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-accent ring-4 ring-background" />
            <h2 className="text-lg font-semibold">{quarterLabel(q)} <span className="text-sm font-normal text-muted">{list.length} {list.length === 1 ? "event" : "events"}</span></h2>
            <div className="mt-3 space-y-3">
              {list.map((e) => (
                <div key={`${e.origin}-${e.id}`} id={e.id} className={`card p-4 ${e.past ? "opacity-70" : ""}`}>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-muted">{dateLabel(e.date)}</span>
                    <span className={`chip ${statusClass(e.tone)}`}>{e.kindLabel}</span>
                    <span className={`chip ${e.confidence === "confirmed" ? statusClass("approved") : "bg-foreground/5 text-muted"}`}>{e.confidence}</span>
                    {e.past && <span className="chip bg-foreground/5 text-muted">passed</span>}
                  </div>
                  <div className="font-medium mt-1.5">{e.title}</div>
                  <p className="text-sm text-muted mt-1">{e.note}</p>
                  {(e.companies.length > 0 || e.refs.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {e.companies.map((c) => <Link key={c.id} href={c.route} className={`chip border ${KIND_COLOR.company}`}>{c.name}</Link>)}
                      {e.refs.map((r) => <Link key={r.id} href={r.route} className={`chip border ${KIND_COLOR[r.kind] ?? KIND_COLOR.term}`}>{r.name}</Link>)}
                    </div>
                  )}
                  {e.source && <a className="text-xs underline text-muted mt-2 inline-block break-all" href={e.source} rel="noopener">Source</a>}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
