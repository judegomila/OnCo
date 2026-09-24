"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeoGlyph, GeoMetric, GeoRow, GeoSex, GeoCountry } from "@/lib/cancer-geography";
import { GeoGlyphIcon, type GeoGlyphName } from "./GeoGlyph";

export type GeographyRegionPill = { id: string; title: string; countries: string[]; glyph: GeoGlyph };
export type GeographyMeta = { version: string; fetched: string; year: number; sourceUrl: string; apiUrl: string; citation: string; label: string; icd: string; note: string };

export type CancerGeographyProps = {
  cancerId: string;
  cancerName: string;
  /** Every country with a GLOBOCAN row for this site, any order. */
  rows: GeoRow[];
  world: GeoCountry | null;
  meta: GeographyMeta;
  regions: GeographyRegionPill[];
  jsonUrl: string;
};

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const W = 960, H = 470;
const RAMP = ["#fde2e2", "#fbb4b4", "#f47b7b", "#dc3c3c", "#8f1414"];
const fmt = (n: number | null | undefined, d = 0) => n === null || n === undefined ? "no data" : n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });
const METRICS: Array<[GeoMetric, string, GeoGlyphName]> = [["inc", "Incidence", "incidence"], ["mort", "Mortality", "mortality"]];
const SEXES: Array<[GeoSex, string, GeoGlyphName]> = [["both", "Both sexes", "both"], ["women", "Women", "women"], ["men", "Men", "men"]];
/** GLOBOCAN's method codes, as its Cancer Today legend explains them; 9 is the one that matters for reading the map. */
const METHOD: Record<string, string> = {
  "1": "national registry data projected", "2a": "most recent national data applied", "2b": "regional registry data applied to the country",
  "3a": "estimated from national mortality with modelled incidence-to-mortality ratios", "3b": "estimated from mortality with ratios from neighbouring countries", "3c": "estimated from mortality with ratios from a cancer registry",
  "9": "no national data; rates carried over from neighbouring countries",
};
const cases = (r: GeoRow, sex: GeoSex, metric: GeoMetric) => r[sex][metric === "inc" ? 0 : 2];
const asr = (r: GeoRow, sex: GeoSex, metric: GeoMetric) => r[sex][metric === "inc" ? 1 : 3];

function Pill({ on, onClick, glyph, children, title }: { on: boolean; onClick: () => void; glyph: GeoGlyphName; children: ReactNode; title?: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} title={title} className={`chip border text-sm inline-flex items-center gap-1.5 ${on ? "bg-foreground text-background border-foreground" : "border-border bg-card hover:bg-foreground/5"}`}>
      <GeoGlyphIcon name={glyph} />
      <span>{children}</span>
    </button>
  );
}

/**
 * Where one cancer happens: a choropleth of GLOBOCAN age-standardised rates by country, switchable between incidence
 * and mortality and between both sexes, women and men, with a tooltip per country, region pills that pick out the
 * high-burden regions the cards below describe, and a ranked list with one link per country into /cases/. Reusable
 * for any cancer whose GLOBOCAN site has a per-sex file (src/lib/cancer-geography.ts, SITE_RATES).
 */
export function CancerGeography({ cancerId, cancerName, rows, world, meta, regions, jsonUrl }: CancerGeographyProps) {
  const [metric, setMetric] = useState<GeoMetric>("inc");
  const [sex, setSex] = useState<GeoSex>("both");
  const [region, setRegion] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [land, setLand] = useState<FeatureCollection<Geometry> | null>(null);
  const [hover, setHover] = useState<GeoRow | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(WORLD_URL).then((r) => r.json()).then((topo: Topology) => { if (alive) setLand(feature(topo, topo.objects.countries as GeometryCollection) as unknown as FeatureCollection<Geometry>); }).catch(() => setLand(null));
    return () => { alive = false; };
  }, []);

  const projection = useMemo(() => geoNaturalEarth1().fitSize([W, H], { type: "Sphere" }), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const ranked = useMemo(() => [...rows].filter((r) => asr(r, sex, metric) !== null).sort((a, b) => (asr(b, sex, metric) ?? 0) - (asr(a, sex, metric) ?? 0)), [rows, sex, metric]);
  const rank = useMemo(() => new Map(ranked.map((r, i) => [r.iso3, i + 1])), [ranked]);
  const byNum = useMemo(() => new Map(rows.map((r) => [r.isonum, r])), [rows]);
  const picked = regions.find((r) => r.id === region);
  const inRegion = (iso3: string) => !picked || picked.countries.includes(iso3);

  const values = ranked.map((r) => asr(r, sex, metric) as number);
  const max = Math.max(1, ...values);
  const sorted = [...values].sort((a, b) => a - b);
  const q = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] ?? max;
  const stops = [q(0.2), q(0.4), q(0.6), q(0.8), max];
  const colour = (v: number | null) => {
    if (v === null) return "url(#geo-nodata)";
    const i = stops.findIndex((s) => v <= s);
    return RAMP[i < 0 ? 4 : i];
  };
  const metricLabel = METRICS.find((m) => m[0] === metric)![1];
  const sexLabel = SEXES.find((s) => s[0] === sex)![1].toLowerCase();
  const list = (showAll ? ranked : ranked.slice(0, 15)).filter((r) => inRegion(r.iso3));
  const worldAsr = world ? asr({ ...world, iso3: "WORLD" }, sex, metric) : null;
  const worldCount = world ? cases({ ...world, iso3: "WORLD" }, sex, metric) : null;

  return (
    <div className="space-y-3" data-onco-geography={cancerId}>
      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Map controls">
        {METRICS.map(([v, l, g]) => <Pill key={v} on={metric === v} onClick={() => setMetric(v)} glyph={g} title={v === "inc" ? "New cases per 100,000 a year, age-standardised" : "Deaths per 100,000 a year, age-standardised"}>{l}</Pill>)}
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        {SEXES.map(([v, l, g]) => <Pill key={v} on={sex === v} onClick={() => setSex(v)} glyph={g}>{l}</Pill>)}
        {regions.length > 0 && <span className="mx-1 h-4 w-px bg-border" aria-hidden />}
        {regions.map((r) => <Pill key={r.id} on={region === r.id} onClick={() => setRegion(region === r.id ? null : r.id)} glyph={r.glyph} title={`Highlight ${r.title} on the map`}>{r.title}</Pill>)}
      </div>

      <div className="card p-2 relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`World map of ${cancerName} ${metricLabel.toLowerCase()}, ${sexLabel}, age-standardised rate per 100,000, GLOBOCAN ${meta.year}`}>
          <defs><pattern id="geo-nodata" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" className="fill-zinc-100 dark:fill-zinc-800" /><line x1="0" y1="0" x2="0" y2="6" className="stroke-zinc-300 dark:stroke-zinc-600" strokeWidth="1.5" /></pattern></defs>
          <path d={path({ type: "Sphere" }) ?? ""} className="fill-sky-50 dark:fill-sky-950/30" />
          {land && land.features.map((f, i) => {
            const r = byNum.get(Number(f.id));
            const dim = r ? !inRegion(r.iso3) : !!picked;
            const d = path(f) ?? "";
            const shape = <path d={d} fill={r ? colour(asr(r, sex, metric)) : "url(#geo-nodata)"} opacity={dim ? 0.3 : 1} className={r ? "stroke-background cursor-pointer" : "stroke-background"} strokeWidth={r && picked && !dim ? 1.5 : 0.5} stroke={r && picked && !dim ? "var(--accent, #1d4ed8)" : undefined} onMouseEnter={() => setHover(r ?? null)} onMouseLeave={() => setHover(null)} />;
            return r ? <a key={i} href={`/cases/?country=${r.iso3}`} tabIndex={-1} aria-label={`${r.name}: ${fmt(asr(r, sex, metric), 2)} per 100,000`}>{shape}</a> : <g key={i}>{shape}</g>;
          })}
          {!land && <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-muted" style={{ fontSize: 14 }}>Loading map…</text>}
        </svg>
        <div className="absolute left-3 bottom-3 flex flex-wrap items-center gap-2 text-[11px] text-muted bg-background/80 rounded px-2 py-1">
          <span>{metricLabel} ASR, {sexLabel}</span>
          {RAMP.map((c, i) => <span key={c} className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: c }} />{i === 0 ? `${fmt(stops[0], 1)}` : i === 4 ? `${fmt(max, 1)}` : ""}</span>)}
          <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-[repeating-linear-gradient(45deg,#d4d4d8_0_2px,#f4f4f5_2px_4px)]" />no estimate</span>
        </div>
        {hover && (
          <div className="absolute right-3 top-3 card px-3 py-2 text-sm shadow max-w-xs">
            <div className="font-medium">{hover.name} <span className="text-muted">· #{rank.get(hover.iso3) ?? "-"} of {ranked.length}</span></div>
            <div>{metricLabel}: <span className="tabular-nums font-medium">{fmt(asr(hover, sex, metric), 2)}</span> per 100,000 ({sexLabel})</div>
            <div className="text-muted">{fmt(cases(hover, sex, metric))} {metric === "inc" ? "new cases" : "deaths"} a year{hover.hdi ? ` · ${hover.hdi}` : ""}</div>
            <div className="text-muted text-xs">Women {fmt(asr(hover, "women", metric), 2)} · men {fmt(asr(hover, "men", metric), 2)}{(metric === "inc" ? hover.methodInc : hover.methodMort) ? ` · method ${metric === "inc" ? hover.methodInc : hover.methodMort}: ${METHOD[(metric === "inc" ? hover.methodInc : hover.methodMort) ?? ""] ?? "see GLOBOCAN"}` : ""}</div>
          </div>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_280px]">
        <div className="card p-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <div className="kicker inline-flex items-center gap-1.5"><GeoGlyphIcon name="list" />{picked ? picked.title : `Top ${showAll ? ranked.length : Math.min(15, ranked.length)}`} by {metricLabel.toLowerCase()} ASR, {sexLabel}</div>
            <div className="flex gap-3 text-xs">
              {ranked.length > 15 && <button type="button" onClick={() => setShowAll((v) => !v)} className="underline">{showAll ? "Top 15" : `All ${ranked.length} countries`}</button>}
              <Link href={`/cases/?cancer=${cancerId}`} className="underline">Cases explorer →</Link>
            </div>
          </div>
          <ol className="space-y-1 text-sm">
            {list.map((r) => {
              const v = asr(r, sex, metric) as number;
              return (
                <li key={r.iso3} className="grid grid-cols-[2ch_1fr_auto] items-center gap-2">
                  <span className="tabular-nums text-muted text-xs text-right">{rank.get(r.iso3)}</span>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <Link href={`/cases/?country=${r.iso3}`} className="truncate hover:underline" title={`${r.name}: cases by site`}>{r.name}</Link>
                      <span className="text-xs text-muted tabular-nums whitespace-nowrap">{fmt(cases(r, sex, metric))} {metric === "inc" ? "cases" : "deaths"}</span>
                    </div>
                    <div className="h-1.5 rounded bg-foreground/5 overflow-hidden"><div className="h-full rounded" style={{ width: `${Math.max(2, (v / max) * 100)}%`, background: colour(v) }} /></div>
                  </div>
                  <span className="tabular-nums font-medium text-right w-12">{fmt(v, 2)}</span>
                </li>
              );
            })}
            {list.length === 0 && <li className="text-muted text-sm">No country in this region has an estimate for this view.</li>}
          </ol>
        </div>
        <div className="card p-3 text-xs text-muted space-y-2">
          <div className="kicker inline-flex items-center gap-1.5 text-foreground"><GeoGlyphIcon name="globe" />World</div>
          {world && <p className="text-sm text-foreground"><span className="tabular-nums font-medium">{fmt(worldAsr, 2)}</span> per 100,000 ({sexLabel}); {fmt(worldCount)} {metric === "inc" ? "new cases" : "deaths"} a year.</p>}
          <p>{meta.version}. Site {meta.label} ({meta.icd}), fetched {meta.fetched}. {meta.note}</p>
          <p>{meta.citation} <a href={meta.sourceUrl} className="underline" rel="noopener">{meta.sourceUrl}</a></p>
          <p className="flex flex-wrap gap-x-3"><a href={jsonUrl} className="underline inline-flex items-center gap-1" type="application/json"><GeoGlyphIcon name="json" className="h-3 w-3" />JSON companion</a><a href={meta.apiUrl} className="underline" rel="noopener">IARC API</a></p>
        </div>
      </div>
    </div>
  );
}
