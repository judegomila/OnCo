"use client";

import { useMemo, useState } from "react";
import { FacetSelect } from "./filters/FacetSelect";
import { ChartExport } from "./ChartExport";

export type ForestRow = {
  id: string; trial: string; route: string; nct?: string; phase: string; year?: number;
  cancers: Array<{ id: string; name: string }>;
  setting: string; settingClass: string;
  endpoint: string; family: string; familyLabel: string; primary: boolean;
  hr: number; lo?: number; hi?: number; n?: number; evidence: number; arms: string; source?: string;
};

const ROW = 30, W = 820, LABEL_W = 250, VALUE_W = 150, PAD_T = 30, PAD_B = 34;
const TICKS = [0.1, 0.2, 0.3, 0.5, 0.7, 1, 1.5, 2, 3, 5];

/** Single-hue sequential colour for the evidence score (0-100): light for weak, dark for strong. */
export function evidenceColour(score: number): string {
  const t = Math.max(0, Math.min(1, score / 100));
  const l = Math.round(78 - 48 * t);
  return `hsl(200 55% ${l}%)`;
}
const fmt = (x: number) => (x >= 10 ? x.toFixed(0) : x >= 1 ? x.toFixed(2).replace(/\.?0+$/, "") : x.toFixed(2));

function csvOf(rows: ForestRow[]): string {
  const esc = (v: unknown) => { const s = v === undefined || v === null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, "\"\"")}"` : s; };
  const head = ["trial", "nct", "phase", "year", "cancers", "setting", "setting_class", "endpoint", "endpoint_family", "primary", "hr", "ci_low", "ci_high", "n", "evidence_score", "arms", "source", "onco_url"];
  const lines = rows.map((r) => [r.trial, r.nct, r.phase, r.year, r.cancers.map((c) => c.name).join("; "), r.setting, r.settingClass, r.endpoint, r.familyLabel, r.primary ? "yes" : "no", r.hr, r.lo, r.hi, r.n, r.evidence, r.arms, r.source, `https://onco-umber.vercel.app${r.route}`].map(esc).join(","));
  return [head.join(","), ...lines].join("\n");
}

/**
 * Forest plot of hazard ratios with confidence intervals, one row per trial endpoint, on a log axis.
 * Square area follows the number of participants; fill follows the evidence score. Filters by cancer,
 * setting and endpoint family; the plotted rows can be downloaded as CSV and the plot as SVG or PNG.
 */
export function ForestPlot({ rows }: { rows: ForestRow[] }) {
  const [cancer, setCancer] = useState<string | null>(null);
  const [setting, setSetting] = useState<string | null>(null);
  const [family, setFamily] = useState<string | null>(null);
  const [primaryOnly, setPrimaryOnly] = useState(false);
  const [sort, setSort] = useState<"hr" | "year" | "evidence" | "n">("hr");

  const cancerOptions = useMemo(() => {
    const m = new Map<string, { label: string; count: number }>();
    for (const r of rows) for (const c of r.cancers) { const e = m.get(c.id) ?? { label: c.name, count: 0 }; e.count++; m.set(c.id, e); }
    return [...m.entries()].map(([value, e]) => ({ value, label: e.label, count: e.count })).sort((a, b) => a.label.localeCompare(b.label));
  }, [rows]);
  const settingOptions = useMemo(() => { const m = new Map<string, number>(); for (const r of rows) m.set(r.settingClass, (m.get(r.settingClass) ?? 0) + 1); return [...m.entries()].map(([value, count]) => ({ value, label: value, count })); }, [rows]);
  const familyOptions = useMemo(() => { const m = new Map<string, { label: string; count: number }>(); for (const r of rows) { const e = m.get(r.family) ?? { label: r.familyLabel, count: 0 }; e.count++; m.set(r.family, e); } return [...m.entries()].map(([value, e]) => ({ value, label: e.label, count: e.count })); }, [rows]);

  const shown = useMemo(() => {
    const f = rows.filter((r) => (!cancer || r.cancers.some((c) => c.id === cancer)) && (!setting || r.settingClass === setting) && (!family || r.family === family) && (!primaryOnly || r.primary));
    const key = (r: ForestRow) => sort === "hr" ? r.hr : sort === "year" ? -(r.year ?? 0) : sort === "evidence" ? -r.evidence : -(r.n ?? 0);
    return f.sort((a, b) => key(a) - key(b) || a.trial.localeCompare(b.trial));
  }, [rows, cancer, setting, family, primaryOnly, sort]);

  const domain = useMemo(() => {
    const los = shown.map((r) => r.lo ?? r.hr), his = shown.map((r) => r.hi ?? r.hr);
    const lo = Math.max(0.08, Math.min(0.5, ...los) / 1.15), hi = Math.min(6, Math.max(1.6, ...his) * 1.15);
    return [lo, hi] as const;
  }, [shown]);
  const x0 = LABEL_W + 10, x1 = W - VALUE_W - 10;
  const xOf = (v: number) => x0 + ((Math.log(v) - Math.log(domain[0])) / (Math.log(domain[1]) - Math.log(domain[0]))) * (x1 - x0);
  const H = PAD_T + shown.length * ROW + PAD_B;
  const maxN = Math.max(1, ...shown.map((r) => r.n ?? 0));
  const sizeOf = (n?: number) => 6 + (n ? Math.sqrt(n / maxN) * 10 : 0);

  const downloadCsv = () => {
    const blob = new Blob([csvOf(shown)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `onco-forest-${cancer ?? "all"}-${family ?? "all"}.csv`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  const subtitle = [cancer ? cancerOptions.find((c) => c.value === cancer)?.label : "All cancers", setting ?? "all settings", family ? familyOptions.find((f) => f.value === family)?.label : "all endpoints"].join(" · ");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-2">
        <FacetSelect label="Cancer" options={cancerOptions} value={cancer} onChange={(v) => setCancer(v as string | null)} allLabel="All cancers" />
        <FacetSelect label="Setting" options={settingOptions} value={setting} onChange={(v) => setSetting(v as string | null)} searchable={false} allLabel="All settings" width="w-56" />
        <FacetSelect label="Endpoint" options={familyOptions} value={family} onChange={(v) => setFamily(v as string | null)} searchable={false} allLabel="All endpoints" width="w-52" />
        <label className="text-sm inline-flex items-center gap-1.5 pb-1.5"><input type="checkbox" checked={primaryOnly} onChange={(e) => setPrimaryOnly(e.target.checked)} /> Primary endpoints only</label>
        <label className="text-sm inline-flex items-center gap-1.5 pb-1.5 ml-auto">Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded border border-border bg-card px-1.5 py-0.5 text-sm">
            <option value="hr">hazard ratio</option><option value="year">year reported</option><option value="evidence">evidence score</option><option value="n">participants</option>
          </select>
        </label>
        <button type="button" onClick={downloadCsv} className="text-sm rounded border border-border px-2 py-1 hover:bg-foreground/5">Download CSV ({shown.length})</button>
      </div>

      {shown.length === 0 ? <p className="text-sm text-muted">No trial in the corpus reports a hazard ratio for this combination. Clear a filter.</p> : (
        <div className="card p-3 overflow-x-auto">
          <ChartExport title={`Hazard ratios: ${subtitle}`} source="Trial publications recorded per outcome in the OnCo corpus" filename={`forest-${cancer ?? "all"}-${family ?? "all"}`} align="start">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[640px]" role="img" aria-label={`Forest plot of ${shown.length} hazard ratios, ${subtitle}`}>
              {/* header */}
              <text x={0} y={16} fontSize={11} fontWeight={600} fill="currentColor" fillOpacity={0.8}>Trial · endpoint</text>
              <text x={(x0 + x1) / 2} y={16} textAnchor="middle" fontSize={11} fill="currentColor" fillOpacity={0.6}>◀ favours experimental arm · favours control ▶</text>
              <text x={W} y={16} textAnchor="end" fontSize={11} fontWeight={600} fill="currentColor" fillOpacity={0.8}>HR (95% CI)</text>
              {/* axis */}
              {TICKS.filter((t) => t >= domain[0] && t <= domain[1]).map((t) => (
                <g key={t}>
                  <line x1={xOf(t)} x2={xOf(t)} y1={PAD_T - 4} y2={H - PAD_B + 4} stroke="currentColor" strokeOpacity={t === 1 ? 0.55 : 0.08} strokeDasharray={t === 1 ? undefined : "2 4"} />
                  <text x={xOf(t)} y={H - PAD_B + 18} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.7}>{t}</text>
                </g>
              ))}
              <text x={(x0 + x1) / 2} y={H - 6} textAnchor="middle" fontSize={10.5} fill="currentColor" fillOpacity={0.7}>Hazard ratio (log scale); square area follows participants, shade follows evidence score</text>
              {/* rows */}
              {shown.map((r, i) => {
                const y = PAD_T + i * ROW + ROW / 2;
                const c = evidenceColour(r.evidence);
                const s = sizeOf(r.n);
                const lo = r.lo !== undefined ? Math.max(domain[0], r.lo) : undefined, hi = r.hi !== undefined ? Math.min(domain[1], r.hi) : undefined;
                const label = r.trial.length > 24 ? r.trial.slice(0, 23).trimEnd() + "…" : r.trial;
                const sub = `${r.familyLabel}${r.primary ? " (primary)" : ""} · ${r.cancers.map((x) => x.name).join(", ")}`;
                return (
                  <g key={r.id}>
                    {i % 2 === 1 && <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="currentColor" fillOpacity={0.025} />}
                    <a href={r.route}><text x={0} y={y - 3} fontSize={11.5} fontWeight={600} fill="currentColor" className="hover:underline">{label}</text></a>
                    <text x={0} y={y + 10} fontSize={9.5} fill="currentColor" fillOpacity={0.6}>{sub.length > 52 ? sub.slice(0, 51).trimEnd() + "…" : sub}</text>
                    {lo !== undefined && hi !== undefined && <line x1={xOf(lo)} x2={xOf(hi)} y1={y} y2={y} stroke={c} strokeWidth={1.6} />}
                    {r.lo !== undefined && r.lo < domain[0] && <text x={x0 - 6} y={y} textAnchor="end" dominantBaseline="middle" fontSize={9} fill={c}>◀</text>}
                    {r.hi !== undefined && r.hi > domain[1] && <text x={x1 + 6} y={y} dominantBaseline="middle" fontSize={9} fill={c}>▶</text>}
                    <rect x={xOf(r.hr) - s / 2} y={y - s / 2} width={s} height={s} fill={c} stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.6} />
                    <text x={W} y={y} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="currentColor" style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(r.hr)}{r.lo !== undefined && r.hi !== undefined ? ` (${fmt(r.lo)} to ${fmt(r.hi)})` : ""}</text>
                    {r.n !== undefined && <text x={W} y={y + 11} textAnchor="end" fontSize={8.5} fill="currentColor" fillOpacity={0.55}>n = {r.n.toLocaleString("en-GB")}</text>}
                  </g>
                );
              })}
            </svg>
          </ChartExport>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>Evidence score</span>
        {[15, 40, 65, 90].map((s) => <span key={s} className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: evidenceColour(s) }} />{s < 30 ? "weak" : s < 55 ? "moderate" : s < 80 ? "strong" : "very strong"}</span>)}
        <span className="ml-auto">Hazard ratios are as reported by each trial and are not adjusted to a common comparator; rows are not pooled.</span>
      </div>
    </div>
  );
}
