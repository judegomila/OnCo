"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";
import { useProfile } from "@/lib/profile";
import { sideEffectGuidance, type SideEffectGuidance } from "@/data/side-effect-guidance";
import type { SideEffectRow } from "@/lib/side-effects";

function Bar({ pct, tone }: { pct?: number; tone: string }) {
  if (pct === undefined) return <span className="text-muted">not sourced</span>;
  return <div className="flex items-center gap-2 min-w-[140px]"><div className="h-2 flex-1 rounded bg-foreground/5 overflow-hidden"><div className={`h-full ${tone}`} style={{ width: `${Math.min(100, pct)}%` }} /></div><span className="tabular-nums text-xs w-10 text-right">{pct}%</span></div>;
}

/** The guidance card for one symptom group: what it is, what to do, when to call, when it is an emergency. */
function GuidanceCard({ g }: { g: SideEffectGuidance }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="card p-4">
        <div className="kicker mb-1">What it is</div>
        <p className="text-sm leading-relaxed">{g.plain}</p>
        <div className="kicker mt-3 mb-1">What helps at home</div>
        <p className="text-sm leading-relaxed">{g.selfCare}</p>
      </div>
      <div className="space-y-3">
        <div className="card p-4 border-amber-300 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-900">
          <div className="kicker mb-1">Call the team today if</div>
          <p className="text-sm leading-relaxed">{g.callToday}</p>
        </div>
        <div className="card p-4 border-rose-300 bg-rose-50/60 dark:bg-rose-950/20 dark:border-rose-900">
          <div className="kicker mb-1">24-hour line or emergency services now if</div>
          <p className="text-sm leading-relaxed">{g.emergency}</p>
        </div>
        <p className="text-xs text-muted">Thresholds from <a className="underline" href={g.source.url} rel="noopener">{g.source.label}</a>{g.also && <> and <a className="underline" href={g.also.url} rel="noopener">{g.also.label}</a></>}. Your team&apos;s instructions take precedence over anything here.</p>
      </div>
    </div>
  );
}

/**
 * Symptom-first side-effect lookup. Pick a symptom (or start from the treatments in the browser profile)
 * and see which products cause it, how often, and the threshold at which to call. Everything is precomputed
 * on the server; nothing entered here leaves the browser.
 */
export function SideEffectLookup({ rows, drugNames }: { rows: SideEffectRow[]; /** id to name for the profile's prior lines, so the "my treatments" filter can show names. */ drugNames: Record<string, string> }) {
  const [profile, , ready] = useProfile();
  const [group, setGroup] = useState<string | null>(null);
  const [onlyMine, setOnlyMine] = useState(false);
  const [modality, setModality] = useState<string[]>([]);
  const [drugs, setDrugs] = useState<string[]>([]);
  const [sort, setSort] = useState<SortState>({ key: "g3", dir: -1 });

  const mine = useMemo(() => new Set(profile.priorLines), [profile.priorLines]);
  const mineWithData = useMemo(() => [...mine].filter((id) => rows.some((r) => r.drugId === id)), [mine, rows]);

  const groupCounts = useMemo(() => {
    const pool = onlyMine ? rows.filter((r) => mine.has(r.drugId)) : rows;
    const m = new Map<string, { drugs: Set<string>; maxG3: number }>();
    for (const r of pool) { const cur = m.get(r.group) ?? { drugs: new Set<string>(), maxG3: 0 }; cur.drugs.add(r.drugId); cur.maxG3 = Math.max(cur.maxG3, r.grade3PlusPct ?? 0); m.set(r.group, cur); }
    return m;
  }, [rows, onlyMine, mine]);

  const groupOptions = useMemo(() => [...groupCounts.entries()].sort((a, b) => b[1].drugs.size - a[1].drugs.size || a[0].localeCompare(b[0])).map(([g, v]) => ({ value: g, label: g, count: v.drugs.size })), [groupCounts]);

  const filtered = useMemo(() => {
    let list = rows;
    if (group) list = list.filter((r) => r.group === group);
    if (onlyMine) list = list.filter((r) => mine.has(r.drugId));
    if (modality.length) list = list.filter((r) => modality.includes(r.modality));
    if (drugs.length) list = list.filter((r) => drugs.includes(r.drugId));
    list = [...list].sort((a, b) => {
      if (sort.key === "drug") return sort.dir * a.drug.localeCompare(b.drug) || a.event.localeCompare(b.event);
      if (sort.key === "event") return sort.dir * a.event.localeCompare(b.event) || a.drug.localeCompare(b.drug);
      const va = sort.key === "any" ? a.anyGradePct : a.grade3PlusPct, vb = sort.key === "any" ? b.anyGradePct : b.grade3PlusPct;
      return sort.dir * ((va ?? -1) - (vb ?? -1)) || a.drug.localeCompare(b.drug);
    });
    return list;
  }, [rows, group, onlyMine, mine, modality, drugs, sort]);

  const opt = (f: (r: SideEffectRow) => [string, string], pool: SideEffectRow[]) => { const m = new Map<string, { label: string; n: number }>(); for (const r of pool) { const [v, l] = f(r); const cur = m.get(v); m.set(v, { label: l, n: (cur?.n ?? 0) + 1 }); } return [...m.entries()].sort((a, b) => b[1].n - a[1].n || a[1].label.localeCompare(b[1].label)).map(([v, x]) => ({ value: v, label: x.label, count: x.n })); };
  const inGroup = group ? rows.filter((r) => r.group === group) : rows;
  const guidance = group ? sideEffectGuidance.find((g) => g.group === group) : undefined;

  const columns: Column<SideEffectRow>[] = [
    { key: "drug", label: "Treatment", sortable: true, render: (r) => <div><Link href={`${r.route}#safety`} className="font-medium hover:underline">{r.drug}</Link><div className="text-xs text-muted">{r.modality}</div></div> },
    { key: "event", label: "As reported", sortable: true, tip: "The event name as the label or trial reports it; the symptom group above is the plain-language version.", render: (r) => <span className="text-sm">{r.event}{!group && <div className="text-xs text-muted">{r.group}</div>}</span> },
    { key: "any", label: "Any grade", sortable: true, tip: "Share of people in the source trial who had this at any severity.", render: (r) => <Bar pct={r.anyGradePct} tone="bg-amber-400/70" /> },
    { key: "g3", label: "Severe (grade 3+)", sortable: true, tip: "Share who had it at grade 3 or higher: severe, often needing hospital treatment.", render: (r) => <Bar pct={r.grade3PlusPct} tone="bg-rose-500/80" /> },
    { key: "note", label: "Trial / note", hide: "hidden lg:table-cell", render: (r) => <span className="text-xs text-muted">{r.note}{r.source && <> {r.note ? "· " : ""}<a className="underline" href={r.source} rel="noopener">source</a></>}</span> },
  ];

  return (
    <div>
      <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-background/95 backdrop-blur border-b border-border flex flex-wrap items-center gap-2">
        <FacetSelect label="Symptom" options={groupOptions} value={group} onChange={(v) => { setGroup(v as string | null); setDrugs([]); }} allLabel="Choose a symptom" placeholder="Search symptoms" width="w-80" />
        <label className={`text-sm flex items-center gap-2 ${ready && mineWithData.length ? "" : "text-muted"}`} title={ready && !mineWithData.length ? "Add treatments to your profile in the Navigator to use this" : undefined}>
          <input type="checkbox" checked={onlyMine} disabled={!ready || !mineWithData.length} onChange={(e) => setOnlyMine(e.target.checked)} /> only my treatments{ready && mineWithData.length ? ` (${mineWithData.length})` : ""}
        </label>
        {(group || onlyMine || modality.length || drugs.length) ? <button type="button" onClick={() => { setGroup(null); setOnlyMine(false); setModality([]); setDrugs([]); }} className="text-sm underline text-muted">Clear</button> : null}
      </div>

      {onlyMine && mineWithData.length > 0 && (
        <p className="text-sm text-muted mt-3">Showing side effects recorded for: {mineWithData.map((id) => drugNames[id] ?? id).join(", ")}.</p>
      )}

      {!group && (
        <div className="mt-6">
          <div className="kicker mb-2">{onlyMine ? "Symptoms your treatments can cause" : "Start from the symptom"}</div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groupOptions.map((o) => {
              const g = sideEffectGuidance.find((x) => x.group === o.value);
              return (
                <button key={o.value} type="button" onClick={() => setGroup(o.value)} className="card p-3 text-left hover:shadow-md transition">
                  <div className="flex items-baseline justify-between gap-2"><span className="font-medium leading-snug">{o.label}</span><span className="text-xs text-muted tabular-nums shrink-0">{o.count} {o.count === 1 ? "product" : "products"}</span></div>
                  {g && <p className="text-xs text-muted mt-1 line-clamp-2">{g.plain}</p>}
                </button>
              );
            })}
          </div>
          {groupOptions.length === 0 && <div className="card p-8 text-center text-muted">No structured side-effect data yet for the treatments in your profile. Untick &ldquo;only my treatments&rdquo; to browse everything.</div>}
        </div>
      )}

      {group && (
        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{group}</h2>
            <p className="text-sm text-muted mt-1">{groupCounts.get(group)?.drugs.size ?? 0} products in OnCo report this{onlyMine ? " among your treatments" : ""}. Rates come from the prescribing information or pivotal trial; blank means not sourced, not zero.</p>
          </div>
          {guidance ? <GuidanceCard g={guidance} /> : <p className="text-sm text-muted">No guidance written for this group yet. See the product page and the label.</p>}
          <div>
            <Toolbar count={filtered.length} total={inGroup.length} noun="rows"
              left={<>
                <FacetSelect label="Class" options={opt((r) => [r.modality, r.modality], inGroup)} value={modality} onChange={(v) => setModality(v as string[])} multi searchable={false} allLabel="Any" width="w-52" />
                <FacetSelect label="Treatment" options={opt((r) => [r.drugId, r.drug], inGroup)} value={drugs} onChange={(v) => setDrugs(v as string[])} multi allLabel="Any" width="w-60" />
              </>} />
            <ResultsTable columns={columns} rows={filtered} rowKey={(r) => r.id} sort={sort} onSort={(k) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: k === "any" || k === "g3" ? -1 : 1 }))} empty="No products with this side effect match the filters." />
          </div>
        </div>
      )}
    </div>
  );
}
