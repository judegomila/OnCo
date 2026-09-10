"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { estimate, REGION_OPTIONS, type MarketCancer, type MarketTarget, type Range } from "@/lib/market-core";

const fmt = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}m` : n >= 10_000 ? `${Math.round(n / 1000)}k` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(Math.round(n)));
const pct = (r: Range) => (r[0] === r[1] ? `${r[0]}%` : `${r[0]} to ${r[1]}%`);
const frac = (r: Range) => (r[0] === r[1] ? `${Math.round(r[0] * 100)}%` : `${Math.round(r[0] * 100)} to ${Math.round(r[1] * 100)}%`);

/**
 * Interactive addressable-population calculator. Every factor is shown with its source; the result is a
 * range, never a point, and it recomputes as the reader changes cancer, target, region or setting.
 */
export function MarketEstimator({ cancers, targets, globocan }: { cancers: MarketCancer[]; targets: MarketTarget[]; globocan: { year: number; source: string; sourceUrl: string; fetched: string } }) {
  const [cancerId, setCancerId] = useState(cancers.find((c) => c.id === "nsclc")?.id ?? cancers[0].id);
  const cancer = cancers.find((c) => c.id === cancerId) ?? cancers[0];
  const targetsHere = useMemo(() => targets.filter((t) => t.prevalence.some((p) => p.cancerId === cancer.id && p.range)).sort((a, b) => a.name.localeCompare(b.name)), [targets, cancer.id]);
  const [targetId, setTargetId] = useState<string>(targetsHere.find((t) => t.id === "kras")?.id ?? targetsHere[0]?.id ?? "");
  const target = targetsHere.find((t) => t.id === targetId) ?? targetsHere[0];
  const [regionKey, setRegionKey] = useState("WORLD");
  const settings = cancer.shares?.settings ?? [];
  const [settingId, setSettingId] = useState<string>(settings[0]?.id ?? "all");
  const setting = settings.find((s) => s.id === settingId) ?? settings[0];

  const cases = cancer.incidence[regionKey];
  const prev = target?.prevalence.find((p) => p.cancerId === cancer.id);
  const settingRange: Range = setting ? setting.share : [1, 1];
  const sub = cancer.shares?.subtypeShare ?? null;
  const result = cases !== null && cases !== undefined && prev?.range ? estimate(cases, prev.range, settingRange, sub?.share ?? null) : null;
  const regionLabel = REGION_OPTIONS.find((r) => r.key === regionKey)?.label ?? regionKey;

  // Cheap enough to recompute on every render (a few dozen targets), so no memoisation is needed.
  const table = cases === null || cases === undefined ? [] : targetsHere
    .map((t) => { const p = t.prevalence.find((x) => x.cancerId === cancer.id)!; const e = p.range ? estimate(cases, p.range, settingRange, sub?.share ?? null) : null; return { t, p, e }; })
    .filter((r) => r.e)
    .sort((a, b) => (b.e!.high + b.e!.low) - (a.e!.high + a.e!.low));

  const onCancer = (id: string) => { setCancerId(id); const c = cancers.find((x) => x.id === id)!; const ts = targets.filter((t) => t.prevalence.some((p) => p.cancerId === id && p.range)); if (!ts.some((t) => t.id === targetId)) setTargetId(ts[0]?.id ?? ""); setSettingId(c.shares?.settings[0]?.id ?? "all"); };

  const sel = "rounded-lg border border-border bg-card px-3 py-1.5 text-sm max-w-full";
  return (
    <div className="space-y-6">
      <div className="card p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <label className="block"><span className="kicker block mb-1">Cancer</span><select className={sel} value={cancer.id} onChange={(e) => onCancer(e.target.value)}>{cancers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label className="block"><span className="kicker block mb-1">Target or biomarker</span><select className={sel} value={target?.id ?? ""} onChange={(e) => setTargetId(e.target.value)} disabled={!targetsHere.length}>{targetsHere.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}{!targetsHere.length && <option>No prevalence recorded for this cancer</option>}</select></label>
        <label className="block"><span className="kicker block mb-1">Region</span><select className={sel} value={regionKey} onChange={(e) => setRegionKey(e.target.value)}>{(["World", "Continent", "Country"] as const).map((g) => <optgroup key={g} label={g}>{REGION_OPTIONS.filter((r) => r.group === g).map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}</optgroup>)}</select></label>
        <label className="block"><span className="kicker block mb-1">Setting</span><select className={sel} value={setting?.id ?? "all"} onChange={(e) => setSettingId(e.target.value)} disabled={!settings.length}>{settings.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}{!settings.length && <option value="all">All newly diagnosed (no setting share recorded)</option>}</select></label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="card p-5">
          <div className="kicker mb-3">The calculation</div>
          <ol className="space-y-3 text-[15px]">
            <li className="flex flex-wrap items-baseline gap-x-3">
              <span className="w-6 text-muted tabular-nums">1</span>
              <span className="flex-1 min-w-[200px]">New cases of <Link href={cancer.route} className="underline">{cancer.name}</Link> in {regionLabel}, {globocan.year}
                <div className="text-xs text-muted">GLOBOCAN site: {cancer.siteLabel}. <a href={globocan.sourceUrl} rel="noopener" className="underline">{globocan.source}</a>{cancer.siteNote ? `. ${cancer.siteNote}` : ""}</div></span>
              <span className="font-semibold tabular-nums">{cases === null || cases === undefined ? "no estimate" : fmt(cases)}</span>
            </li>
            {sub && (
              <li className="flex flex-wrap items-baseline gap-x-3">
                <span className="w-6 text-muted tabular-nums">2</span>
                <span className="flex-1 min-w-[200px]">Share of that site which is {cancer.name}
                  <div className="text-xs text-muted">{sub.note ? `${sub.note}. ` : ""}<a href={sub.source.url} rel="noopener" className="underline">{sub.source.label}</a></div></span>
                <span className="font-semibold tabular-nums">x {frac(sub.share)}</span>
              </li>
            )}
            <li className="flex flex-wrap items-baseline gap-x-3">
              <span className="w-6 text-muted tabular-nums">{sub ? 3 : 2}</span>
              <span className="flex-1 min-w-[200px]">{target ? <>Patients whose tumour carries or expresses <Link href={target.route} className="underline">{target.name}</Link></> : "Target prevalence"}
                {prev && <div className="text-xs text-muted">Recorded as &ldquo;{prev.pct}&rdquo;{prev.measure ? ` (${prev.measure})` : ""}{prev.note ? `. ${prev.note}` : ""}{prev.source ? <>. <a href={prev.source} rel="noopener" className="underline">Source</a></> : <>. <Link href={target!.route} className="underline">Target page</Link></>}</div>}</span>
              <span className="font-semibold tabular-nums">{prev?.range ? `x ${pct(prev.range)}` : "not parseable"}</span>
            </li>
            <li className="flex flex-wrap items-baseline gap-x-3">
              <span className="w-6 text-muted tabular-nums">{sub ? 4 : 3}</span>
              <span className="flex-1 min-w-[200px]">{setting ? setting.label : "All newly diagnosed patients"}
                {setting && <div className="text-xs text-muted">{setting.note ? `${setting.note} ` : ""}Editorial range informed by <a href={setting.source.url} rel="noopener" className="underline">{setting.source.label}</a>.</div>}
                {!setting && <div className="text-xs text-muted">No setting share is recorded for this cancer, so the estimate covers every new patient.</div>}</span>
              <span className="font-semibold tabular-nums">x {frac(settingRange)}</span>
            </li>
          </ol>
          <div className="mt-5 border-t border-border pt-4 flex flex-wrap items-baseline justify-between gap-3">
            <div className="text-sm text-muted">Addressable patients per year, {regionLabel}</div>
            <div className="text-2xl font-semibold tabular-nums">{result ? `${fmt(result.low)} to ${fmt(result.high)}` : "cannot be estimated"}</div>
          </div>
          {result && (
            <div className="mt-3">
              <div className="h-2 rounded bg-foreground/5 overflow-hidden relative">
                <div className="absolute inset-y-0 bg-accent/70" style={{ left: `${(result.low / result.cases) * 100}%`, width: `${Math.max(0.5, ((result.high - result.low) / result.cases) * 100)}%` }} />
              </div>
              <div className="text-xs text-muted mt-1">The band is {fmt(result.low)} to {fmt(result.high)} of {fmt(result.cases)} new cases ({((result.low / result.cases) * 100).toFixed(1)} to {((result.high / result.cases) * 100).toFixed(1)}%). It is wide because the ranges multiply; that is the honest answer, not a bug.</div>
            </div>
          )}
        </div>
        <div className="card p-4 text-sm space-y-2">
          <div className="kicker">Read this carefully</div>
          <p>This is arithmetic on public inputs, not a forecast of treated patients or revenue. It ignores diagnosis rates, testing rates, access, competition, duration of therapy and price.</p>
          <p>Prevalence figures come from the target pages and are mostly from Western cohorts. Stage at diagnosis (which drives the setting share) is later in most of the world, so the true advanced-disease share is higher outside high-income countries.</p>
          <p>GLOBOCAN reports by organ site. Where a subtype share is applied, it is an editorial range with its source shown.</p>
          <p className="text-xs text-muted">Incidence fetched {globocan.fetched}. Change a factor you disagree with by editing <code>src/data/setting-shares.ts</code> or the target&rsquo;s prevalence row.</p>
        </div>
      </div>

      {table.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Every target with a prevalence figure in {cancer.name}, {regionLabel}{setting ? `, ${setting.label.toLowerCase()}` : ""}</h2>
          <div className="card overflow-x-auto">
            <table className="onco">
              <thead><tr><th>Target</th><th>Prevalence as recorded</th><th>Parsed range</th><th>Addressable patients per year</th></tr></thead>
              <tbody>
                {table.map(({ t, p, e }) => (
                  <tr key={t.id} className={t.id === target?.id ? "bg-accent-soft/40" : ""}>
                    <td><button type="button" onClick={() => setTargetId(t.id)} className="hover:underline text-left">{t.name}</button></td>
                    <td className="text-muted">{p.pct}{p.measure ? <span className="text-xs"> ({p.measure})</span> : ""}</td>
                    <td className="tabular-nums">{p.range ? pct(p.range) : ""}</td>
                    <td className="tabular-nums font-medium">{e ? `${fmt(e.low)} to ${fmt(e.high)}` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
