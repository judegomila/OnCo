"use client";

import { useEffect, useState } from "react";
import { cellFor, mappingFor, type Globocan } from "@/lib/globocan-core";
import { ChartExport } from "./ChartExport";

export type Edition = { year: number; file: string; fetched: string; source: string };
export type EditionIndex = { editions: Edition[]; note: string };
export type Editions = { index: EditionIndex; data: Map<number, Globocan> };
export type TrendPoint = { year: number; incAsr: number | null; mortAsr: number | null; cases: number | null; deaths: number | null; fetched: string };

const INDEX_URL = "/globocan/editions.json";
let cache: Promise<Editions> | null = null;

/** Loads editions.json and every edition file once per page; every chart and sparkline shares the result. */
export function loadEditions(): Promise<Editions> {
  if (!cache) {
    cache = fetch(INDEX_URL).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<EditionIndex>; }).then(async (index) => {
      const data = new Map<number, Globocan>();
      await Promise.all(index.editions.map(async (e) => { const r = await fetch(e.file); if (r.ok) data.set(e.year, (await r.json()) as Globocan); }));
      return { index, data };
    });
    cache.catch(() => { cache = null; });
  }
  return cache;
}

export function useEditions(): { editions: Editions | null; error: boolean } {
  const [editions, setEditions] = useState<Editions | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { let alive = true; loadEditions().then((v) => { if (alive) setEditions(v); }).catch(() => { if (alive) setError(true); }); return () => { alive = false; }; }, []);
  return { editions, error };
}

/** One point per edition for a cancer (or all cancers) in a country (ISO3, or "WORLD"). */
export function seriesFor(ed: Editions, cancerId: string | null, iso3: string): TrendPoint[] {
  const codes = mappingFor(cancerId).codes;
  return ed.index.editions.map((e) => {
    const d = ed.data.get(e.year);
    const c = d?.countries[iso3];
    const cell = c && codes.length ? cellFor(c, codes) : null;
    return { year: e.year, cases: cell?.[0] ?? null, incAsr: cell?.[1] ?? null, deaths: cell?.[2] ?? null, mortAsr: cell?.[3] ?? null, fetched: e.fetched };
  });
}

const W = 560, H = 250, L = 46, R = 16, T = 18, B = 40;
const fmt = (n: number | null, d = 1) => n === null ? "no data" : n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

/**
 * Incidence and mortality (age-standardised rates per 100,000) across GLOBOCAN editions for one cancer in one
 * country or the world. Hand-drawn SVG. With a single edition on disk it plots that point and says so, rather
 * than inventing a slope; the fetch script adds editions as IARC serves them.
 */
export function TrendChart({ cancerId, iso3, title, sourceUrl = "https://gco.iarc.who.int/today" }: { cancerId: string | null; iso3: string; title: string; sourceUrl?: string }) {
  const { editions, error } = useEditions();
  if (error) return <p className="text-sm text-muted">The GLOBOCAN edition index could not be loaded.</p>;
  if (!editions) return <div className="h-40 animate-pulse rounded bg-foreground/5" aria-hidden />;
  const pts = seriesFor(editions, cancerId, iso3).filter((p) => p.incAsr !== null || p.mortAsr !== null);
  const mapping = mappingFor(cancerId);
  if (!pts.length) return <p className="text-sm text-muted">No GLOBOCAN estimate for this selection{mapping.note ? `: ${mapping.note}` : "."}</p>;
  const years = pts.map((p) => p.year);
  const y0 = Math.min(...years) - 1, y1 = Math.max(...years) + 1;
  const vmax = Math.max(10, ...pts.flatMap((p) => [p.incAsr ?? 0, p.mortAsr ?? 0])) * 1.15;
  const x = (yr: number) => L + ((W - L - R) * (yr - y0)) / (y1 - y0);
  const y = (v: number) => T + (H - T - B) * (1 - v / vmax);
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(vmax * f));
  const line = (key: "incAsr" | "mortAsr") => pts.filter((p) => p[key] !== null).map((p) => `${x(p.year)},${y(p[key] as number)}`).join(" ");
  const single = pts.length === 1;
  return (
    <ChartExport title={`${title}: GLOBOCAN editions`} source={`GLOBOCAN (IARC), editions ${years.join(", ")}`} filename={`trend-${cancerId ?? "all"}-${iso3}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${title}: ${pts.map((p) => `${p.year} incidence ${fmt(p.incAsr)}, mortality ${fmt(p.mortAsr)} per 100,000`).join("; ")}`}>
        {yTicks.map((v) => <g key={v}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="currentColor" strokeOpacity={0.08} /><text x={L - 6} y={y(v)} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="currentColor" fillOpacity={0.7}>{v}</text></g>)}
        <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="currentColor" strokeOpacity={0.5} />
        <line x1={L} x2={L} y1={T} y2={y(0)} stroke="currentColor" strokeOpacity={0.5} />
        {pts.map((p) => <text key={p.year} x={x(p.year)} y={y(0) + 14} textAnchor="middle" fontSize={10.5} fill="currentColor" fillOpacity={0.8}>GLOBOCAN {p.year}</text>)}
        <text transform={`translate(12 ${(T + H - B) / 2}) rotate(-90)`} textAnchor="middle" fontSize={10.5} fill="currentColor" fillOpacity={0.75}>ASR per 100,000</text>
        {!single && <polyline points={line("incAsr")} fill="none" stroke="#b91c1c" strokeWidth={2} />}
        {!single && <polyline points={line("mortAsr")} fill="none" stroke="#2563eb" strokeWidth={2} strokeDasharray="5 3" />}
        {pts.map((p) => (
          <g key={p.year}>
            {p.incAsr !== null && <><circle cx={x(p.year)} cy={y(p.incAsr)} r={4} fill="#b91c1c" /><text x={x(p.year) + 7} y={y(p.incAsr) - 4} fontSize={10.5} fontWeight={600} fill="#b91c1c">{fmt(p.incAsr)}</text></>}
            {p.mortAsr !== null && <><circle cx={x(p.year)} cy={y(p.mortAsr)} r={4} fill="#2563eb" /><text x={x(p.year) + 7} y={y(p.mortAsr) + 12} fontSize={10.5} fontWeight={600} fill="#2563eb">{fmt(p.mortAsr)}</text></>}
          </g>
        ))}
        <g transform={`translate(${W - R - 6} ${T + 4})`} fontSize={10.5} fill="currentColor">
          <rect x={-10} y={-5} width={10} height={3} fill="#b91c1c" /><text x={-14} y={0} textAnchor="end" fillOpacity={0.85}>Incidence</text>
          <rect x={-10} y={9} width={10} height={3} fill="#2563eb" /><text x={-14} y={14} textAnchor="end" fillOpacity={0.85}>Mortality</text>
        </g>
        <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.6}>{single ? `One edition on file (GLOBOCAN ${pts[0].year}); a trend needs at least two` : "Editions are separate estimates with method changes between them; read the slope as indicative"}</text>
      </svg>
      <p className="text-xs text-muted mt-1">{mapping.label}{mapping.shared ? " (shared site total)" : ""} · both sexes, all ages · <a className="underline" href={sourceUrl} rel="noopener">GLOBOCAN, IARC</a>{editions.index.editions.length ? ` · fetched ${editions.index.editions.map((e) => `${e.year}: ${e.fetched}`).join(", ")}` : ""}</p>
    </ChartExport>
  );
}

/** Tiny incidence-ASR sparkline across editions for a table row; a single dot when only one edition exists. */
export function Sparkline({ cancerId, iso3, width = 64, height = 18 }: { cancerId: string | null; iso3: string; width?: number; height?: number }) {
  const { editions } = useEditions();
  if (!editions) return <span className="inline-block" style={{ width, height }} aria-hidden />;
  const pts = seriesFor(editions, cancerId, iso3).filter((p) => p.incAsr !== null);
  if (!pts.length) return <span className="text-muted/60 italic text-xs">no data</span>;
  const years = pts.map((p) => p.year);
  const x = (yr: number) => pts.length === 1 ? width / 2 : 3 + ((width - 6) * (yr - years[0])) / (years[years.length - 1] - years[0]);
  const vals = pts.map((p) => p.incAsr as number), vmin = Math.min(...vals), vmax = Math.max(...vals);
  const y = (v: number) => vmax === vmin ? height / 2 : 3 + (height - 6) * (1 - (v - vmin) / (vmax - vmin));
  const label = pts.map((p) => `${p.year}: ${fmt(p.incAsr)}`).join(", ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Incidence ASR by edition: ${label}`} className="inline-block align-middle">
      <title>{label}{pts.length === 1 ? " (one edition on file)" : ""}</title>
      {pts.length > 1 && <polyline points={pts.map((p) => `${x(p.year)},${y(p.incAsr as number)}`).join(" ")} fill="none" stroke="#b91c1c" strokeWidth={1.5} />}
      {pts.map((p) => <circle key={p.year} cx={x(p.year)} cy={y(p.incAsr as number)} r={2.2} fill="#b91c1c" />)}
    </svg>
  );
}
