"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { Toolbar } from "./filters/ResultsTable";
import type { Entrant, ExclusivityRow, ExRegion } from "@/data/exclusivity";

export type ExclusivityItem = {
  drugId: string; name: string; brand?: string; route: string; modality: string;
  companies: Array<{ id: string; name: string; route: string }>;
  rows: ExclusivityRow[]; entrants: Entrant[]; note?: string;
};

const START = 2026, END = 2040;
const REGIONS: ExRegion[] = ["US", "EU", "JP"];
const REGION_COLOR: Record<ExRegion, string> = { US: "#0ea5e9", EU: "#8b5cf6", JP: "#f59e0b" };
const x = (year: number) => Math.max(0, Math.min(100, ((year - START) / (END - START)) * 100));
const yearOf = (date: string) => Number(date.slice(0, 4)) + (/-Q([1-4])/.test(date) ? (Number(date.match(/-Q([1-4])/)![1]) - 0.5) / 4 : /^\d{4}-(\d{2})/.test(date) ? (Number(date.slice(5, 7)) - 0.5) / 12 : 0.5);

/**
 * Loss-of-exclusivity chart, 2026 to 2040. One row per product; within it a lane per region showing the
 * patent floor (solid) and regulatory exclusivity (striped) as bars ending at the expiry year, with entrants
 * as markers. Filters by modality class, company and region.
 */
export function ExclusivityTimeline({ items }: { items: ExclusivityItem[] }) {
  const [modalities, setModalities] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [regions, setRegions] = useState<ExRegion[]>([...REGIONS]);
  const [showExpired, setShowExpired] = useState(true);

  const filtered = useMemo(() => items.filter((it) =>
    (!modalities.length || modalities.includes(it.modality))
    && (!companies.length || it.companies.some((c) => companies.includes(c.id)))
    && (showExpired || it.rows.some((r) => regions.includes(r.region) && r.year >= START) || it.entrants.some((e) => regions.includes(e.region) && yearOf(e.date) >= START)))
    .sort((a, b) => {
      const ea = Math.min(...a.rows.filter((r) => regions.includes(r.region)).map((r) => r.year), 9999), eb = Math.min(...b.rows.filter((r) => regions.includes(r.region)).map((r) => r.year), 9999);
      return ea - eb || a.name.localeCompare(b.name);
    }), [items, modalities, companies, regions, showExpired]);

  const opt = (f: (it: ExclusivityItem) => string[], labelOf: (v: string) => string) => { const m = new Map<string, number>(); for (const it of items) for (const v of f(it)) m.set(v, (m.get(v) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, label: labelOf(value), count })); };
  const companyName = useMemo(() => { const m = new Map<string, string>(); for (const it of items) for (const c of it.companies) m.set(c.id, c.name); return m; }, [items]);
  const years = Array.from({ length: END - START + 1 }, (_, i) => START + i);

  return (
    <div>
      <Toolbar count={filtered.length} total={items.length} noun="products"
        left={<>
          <FacetSelect label="Modality" options={opt((it) => [it.modality], (v) => v)} value={modalities} onChange={(v) => setModalities(v as string[])} multi searchable={false} allLabel="Any" width="w-48" />
          <FacetSelect label="Company" options={opt((it) => it.companies.map((c) => c.id), (v) => companyName.get(v) ?? v)} value={companies} onChange={(v) => setCompanies(v as string[])} multi allLabel="Any" width="w-52" />
          <div className="flex items-center gap-1 text-sm">
            {REGIONS.map((r) => <button key={r} type="button" onClick={() => setRegions((s) => (s.includes(r) ? (s.length > 1 ? s.filter((x) => x !== r) : s) : [...s, r]))} className={`chip border transition-colors ${regions.includes(r) ? "text-white border-transparent" : "bg-card text-muted border-border"}`} style={regions.includes(r) ? { background: REGION_COLOR[r] } : undefined} aria-pressed={regions.includes(r)}>{r}</button>)}
          </div>
          <label className="text-sm flex items-center gap-1.5 text-muted"><input type="checkbox" checked={showExpired} onChange={(e) => setShowExpired(e.target.checked)} /> include already expired</label>
        </>} />

      <div className="card overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[220px_1fr] border-b border-border text-xs text-muted">
            <div className="px-3 py-2">Product</div>
            <div className="relative h-8">
              {years.map((y) => <span key={y} className="absolute top-2 -translate-x-1/2 tabular-nums" style={{ left: `${x(y)}%` }}>{y % 2 === 0 ? y : ""}</span>)}
            </div>
          </div>
          {filtered.map((it) => {
            const lanes = REGIONS.filter((r) => regions.includes(r));
            return (
              <div key={it.drugId} id={it.drugId} className="grid grid-cols-[220px_1fr] border-b border-border last:border-b-0">
                <div className="px-3 py-2 text-sm">
                  <Link href={it.route} className="font-medium hover:underline">{it.brand ?? it.name}</Link>
                  <div className="text-xs text-muted">{it.brand ? `${it.name} · ` : ""}{it.modality}{it.companies.length ? ` · ${it.companies.map((c) => c.name).join(", ")}` : ""}</div>
                </div>
                <div className="relative py-2">
                  {years.map((y) => <span key={y} className="absolute inset-y-0 border-l border-border/60" style={{ left: `${x(y)}%` }} />)}
                  <div className="relative space-y-1">
                    {lanes.map((region) => {
                      const rows = it.rows.filter((r) => r.region === region);
                      const ents = it.entrants.filter((e) => e.region === region);
                      if (!rows.length && !ents.length) return <div key={region} className="h-3" />;
                      return (
                        <div key={region} className="relative h-3">
                          {rows.map((r, i) => {
                            const expired = r.year < START;
                            const left = 0, width = expired ? 0 : x(r.year);
                            const title = `${region} ${r.kind === "patent" ? "patent" : "regulatory exclusivity"}: ${r.year}${r.note ? ` (${r.note})` : ""}`;
                            return expired ? (
                              <span key={i} title={title} className="absolute left-1 top-0 text-[10px] leading-3 text-muted whitespace-nowrap">{region} {r.kind === "patent" ? "patent" : "reg."} expired {r.year}</span>
                            ) : (
                              <a key={i} href={r.source} rel="noopener" title={title} className="absolute top-0 h-3 rounded-r-sm block" style={{ left: `${left}%`, width: `calc(${width}% - 1px)`, background: r.kind === "patent" ? REGION_COLOR[region] : `repeating-linear-gradient(135deg, ${REGION_COLOR[region]} 0 4px, transparent 4px 7px)`, opacity: r.kind === "patent" ? 0.85 : 0.7 }} />
                            );
                          })}
                          {(() => {
                            const past = ents.filter((e) => yearOf(e.date) < START);
                            if (!past.length) return null;
                            const first = past.reduce((a, b) => (yearOf(a.date) <= yearOf(b.date) ? a : b));
                            const title = past.map((e) => `${e.name}: ${e.type} ${e.status} ${e.date}${e.note ? ` (${e.note})` : ""}`).join("\n");
                            return <span title={title} className="absolute right-1 top-0 text-[10px] leading-3 text-muted whitespace-nowrap">{past.length} {first.type}{past.length === 1 ? "" : "s"} since {first.date.slice(0, 4)}</span>;
                          })()}
                          {ents.filter((e) => yearOf(e.date) >= START).map((e, i) => {
                            const y = yearOf(e.date);
                            const title = `${e.name}: ${e.type} ${e.status} ${e.date}${e.note ? ` (${e.note})` : ""}`;
                            return <span key={`e${i}`} title={title} className="absolute top-0 h-3 w-3 rotate-45 -translate-x-1/2 border border-background" style={{ left: `${x(y)}%`, background: e.status === "launched" || e.status === "approved" ? "var(--foreground)" : "var(--muted)" }} />;
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-muted text-sm">Nothing matches. Clear a filter.</div>}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-muted mt-3">
        <span><span className="inline-block h-2.5 w-6 rounded-sm align-middle mr-1.5" style={{ background: REGION_COLOR.US }} />Patent floor (solid)</span>
        <span><span className="inline-block h-2.5 w-6 rounded-sm align-middle mr-1.5" style={{ background: `repeating-linear-gradient(135deg, ${REGION_COLOR.US} 0 4px, transparent 4px 7px)` }} />Regulatory exclusivity (striped)</span>
        <span><span className="inline-block h-2.5 w-2.5 rotate-45 align-middle mr-1.5 bg-foreground" />Entrant launched or approved</span>
        <span><span className="inline-block h-2.5 w-2.5 rotate-45 align-middle mr-1.5 bg-muted" />Entrant in phase 3, filed or settled</span>
        <span>Lanes: {REGIONS.map((r) => <span key={r} className="ml-1" style={{ color: REGION_COLOR[r] }}>{r}</span>)}</span>
      </div>
    </div>
  );
}
