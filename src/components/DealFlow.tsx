"use client";

import { useMemo, useState } from "react";
import { DEAL_REGIONS, DEAL_REGION_COLOR as REGION_COLOR, type DealFlowItem } from "@/lib/deal-regions";

const TAU = Math.PI * 2;
const R = 150, INNER = 132, C = 190;
const pt = (r: number, a: number): [number, number] => [C + r * Math.cos(a - Math.PI / 2), C + r * Math.sin(a - Math.PI / 2)];

function bandPath(a0: number, a1: number): string {
  const [ox0, oy0] = pt(R, a0), [ox1, oy1] = pt(R, a1), [ix0, iy0] = pt(INNER, a0), [ix1, iy1] = pt(INNER, a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${ox0} ${oy0} A ${R} ${R} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${INNER} ${INNER} 0 ${large} 0 ${ix0} ${iy0} Z`;
}

function ribbonPath(a0: number, a1: number, b0: number, b1: number): string {
  const r = INNER - 2;
  const [ax0, ay0] = pt(r, a0), [ax1, ay1] = pt(r, a1), [bx0, by0] = pt(r, b0), [bx1, by1] = pt(r, b1);
  const la = a1 - a0 > Math.PI ? 1 : 0, lb = b1 - b0 > Math.PI ? 1 : 0;
  if (Math.abs(a0 - b0) < 1e-9) return `M ${ax0} ${ay0} A ${r} ${r} 0 ${la} 1 ${ax1} ${ay1} Q ${C} ${C} ${ax0} ${ay0} Z`;
  return `M ${ax0} ${ay0} A ${r} ${r} 0 ${la} 1 ${ax1} ${ay1} Q ${C} ${C} ${bx0} ${by0} A ${r} ${r} 0 ${lb} 1 ${bx1} ${by1} Q ${C} ${C} ${ax0} ${ay0} Z`;
}

/**
 * Chord diagram of deal flow between regions (seller or licensor region to buyer or licensee region), with a
 * year range filter. Each ribbon is one or more deals; hover for the list. Pure SVG, no dependencies.
 */
export function DealFlow({ flows }: { flows: DealFlowItem[] }) {
  const years = useMemo(() => [...new Set(flows.map((f) => f.year))].sort(), [flows]);
  const [from, setFrom] = useState<number>(years[0] ?? 2015);
  const [to, setTo] = useState<number>(years[years.length - 1] ?? 2026);
  const [hover, setHover] = useState<string | null>(null);

  const active = useMemo(() => flows.filter((f) => f.year >= from && f.year <= to), [flows, from, to]);

  const geometry = useMemo(() => {
    const n = DEAL_REGIONS.length;
    const M: number[][] = DEAL_REGIONS.map(() => DEAL_REGIONS.map(() => 0));
    const items: Record<string, DealFlowItem[]> = {};
    for (const f of active) {
      const i = DEAL_REGIONS.indexOf(f.from), j = DEAL_REGIONS.indexOf(f.to);
      M[i][j]++;
      (items[`${i}-${j}`] ??= []).push(f);
    }
    const totals = DEAL_REGIONS.map((_, i) => M[i].reduce((a, b) => a + b, 0) + M.reduce((a, row, j) => a + (j === i ? 0 : row[i]), 0));
    const sum = totals.reduce((a, b) => a + b, 0);
    const gap = 0.05;
    const unit = sum ? (TAU - n * gap) / sum : 0;
    const groups: Array<{ i: number; a0: number; a1: number; total: number }> = [];
    const sub: Record<string, [number, number]> = {}; // "out:i-j" / "in:i-j" / "self:i"
    let a = 0;
    for (let i = 0; i < n; i++) {
      const a0 = a;
      for (let j = 0; j < n; j++) { if (j === i || !M[i][j]) continue; sub[`out:${i}-${j}`] = [a, a + M[i][j] * unit]; a += M[i][j] * unit; }
      if (M[i][i]) { sub[`self:${i}`] = [a, a + M[i][i] * unit]; a += M[i][i] * unit; }
      for (let j = 0; j < n; j++) { if (j === i || !M[j][i]) continue; sub[`in:${j}-${i}`] = [a, a + M[j][i] * unit]; a += M[j][i] * unit; }
      groups.push({ i, a0, a1: a, total: totals[i] });
      a += gap;
    }
    const ribbons: Array<{ key: string; i: number; j: number; d: string; n: number; list: DealFlowItem[] }> = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      if (!M[i][j]) continue;
      const s = i === j ? sub[`self:${i}`] : sub[`out:${i}-${j}`];
      const t = i === j ? sub[`self:${i}`] : sub[`in:${i}-${j}`];
      ribbons.push({ key: `${i}-${j}`, i, j, d: ribbonPath(s[0], s[1], t[0], t[1]), n: M[i][j], list: items[`${i}-${j}`] ?? [] });
    }
    return { M, groups, ribbons, sum };
  }, [active]);

  const hovered = geometry.ribbons.find((r) => r.key === hover);

  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
        <span className="text-muted">Years</span>
        <select value={from} onChange={(e) => { const v = Number(e.target.value); setFrom(v); if (v > to) setTo(v); }} className="rounded-lg border border-border bg-card px-2 py-1 text-sm" aria-label="From year">{years.map((y) => <option key={y} value={y}>{y}</option>)}</select>
        <span className="text-muted">to</span>
        <select value={to} onChange={(e) => { const v = Number(e.target.value); setTo(v); if (v < from) setFrom(v); }} className="rounded-lg border border-border bg-card px-2 py-1 text-sm" aria-label="To year">{years.map((y) => <option key={y} value={y}>{y}</option>)}</select>
        <span className="ml-auto text-muted">{active.length} {active.length === 1 ? "deal" : "deals"}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-[380px_1fr] items-start">
        <svg viewBox={`0 0 ${C * 2} ${C * 2}`} role="img" aria-label="Deal flow between regions" className="w-full max-w-[380px] mx-auto">
          {geometry.ribbons.map((r) => (
            <path key={r.key} d={r.d} fill={REGION_COLOR[DEAL_REGIONS[r.i]]} fillOpacity={hover && hover !== r.key ? 0.12 : 0.55} stroke={REGION_COLOR[DEAL_REGIONS[r.i]]} strokeOpacity={0.6} strokeWidth={0.5}
              onMouseEnter={() => setHover(r.key)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(r.key)} onBlur={() => setHover(null)} tabIndex={0} className="cursor-pointer outline-none">
              <title>{`${DEAL_REGIONS[r.i]} to ${DEAL_REGIONS[r.j]}: ${r.n} ${r.n === 1 ? "deal" : "deals"}`}</title>
            </path>
          ))}
          {geometry.groups.map((g) => g.total > 0 && (
            <g key={g.i}>
              <path d={bandPath(g.a0, g.a1)} fill={REGION_COLOR[DEAL_REGIONS[g.i]]} />
              {(() => { const mid = (g.a0 + g.a1) / 2; const [x, y] = pt(R + 14, mid); const left = Math.cos(mid - Math.PI / 2) < -0.1; return <text x={x} y={y} textAnchor={left ? "end" : Math.cos(mid - Math.PI / 2) > 0.1 ? "start" : "middle"} dominantBaseline="middle" style={{ fontSize: 11, fill: "var(--foreground)" }}>{DEAL_REGIONS[g.i]} ({g.total})</text>; })()}
            </g>
          ))}
          {!geometry.sum && <text x={C} y={C} textAnchor="middle" style={{ fontSize: 13, fill: "var(--muted)" }}>No deals in this range</text>}
        </svg>
        <div className="text-sm">
          <div className="overflow-x-auto">
            <table className="onco">
              <thead><tr><th>From \ To</th>{DEAL_REGIONS.map((r) => <th key={r}>{r}</th>)}</tr></thead>
              <tbody>
                {DEAL_REGIONS.map((r, i) => (
                  <tr key={r}>
                    <td><span className="inline-block h-2.5 w-2.5 rounded-full mr-1.5 align-middle" style={{ background: REGION_COLOR[r] }} />{r}</td>
                    {DEAL_REGIONS.map((_, j) => <td key={j} className={`tabular-nums ${hover === `${i}-${j}` ? "bg-accent-soft" : ""}`} onMouseEnter={() => setHover(geometry.M[i][j] ? `${i}-${j}` : null)} onMouseLeave={() => setHover(null)}>{geometry.M[i][j] || <span className="text-muted/50">·</span>}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 min-h-[5rem] text-xs text-muted">
            {hovered ? (
              <div><div className="font-medium text-foreground mb-1">{DEAL_REGIONS[hovered.i]} to {DEAL_REGIONS[hovered.j]}</div><ul className="space-y-0.5">{hovered.list.map((d) => <li key={d.id}><a href={`#${d.id}`} className="hover:underline">{d.year}: {d.label}</a> <span className="text-muted/70">({d.type})</span></li>)}</ul></div>
            ) : <p>Rows are the seller or licensor region, columns the buyer or licensee region. Hover a ribbon or a cell to list the deals. Ribbons are counts of deals, not values, because headline values mix upfront cash with contingent milestones.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
