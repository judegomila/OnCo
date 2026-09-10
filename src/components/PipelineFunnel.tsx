"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ResultsTable, type Column, type SortState } from "./filters/ResultsTable";
import { STAGES, STAGE_LABEL, type Stage } from "@/lib/pipeline-stages";
import type { CrowdingRow, Funnel } from "@/lib/pipeline-stats";
import { statusClass } from "@/lib/text";

const STAGE_TONE: Record<Stage, string> = { approved: "approved", "phase-3": "phase-3", "phase-2": "phase-2", "phase-1": "phase-1", preclinical: "preclinical", stopped: "withdrawn", other: "mixed" };
const BAR: Record<Stage, string> = { approved: "bg-emerald-500/80", "phase-3": "bg-sky-500/80", "phase-2": "bg-amber-400/80", "phase-1": "bg-violet-400/80", preclinical: "bg-violet-300/70", stopped: "bg-rose-400/70", other: "bg-zinc-400/60" };
const fmt = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}m` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));

export function PipelineFunnel({ funnels, crowding, fetched }: { funnels: Funnel[]; crowding: CrowdingRow[]; fetched: string }) {
  const [group, setGroup] = useState<Funnel["group"]>("target");
  const options = useMemo(() => funnels.filter((f) => f.group === group).sort((a, b) => group === "modality" ? b.products.length - a.products.length : a.label.localeCompare(b.label)), [funnels, group]);
  const [key, setKey] = useState<string>("target:trop2");
  const funnel = options.find((f) => f.key === key) ?? options[0];
  const [sort, setSort] = useState<SortState>({ key: "index", dir: -1 });
  const [minActive, setMinActive] = useState(2);

  const max = Math.max(1, ...STAGES.map((s) => funnel?.stages[s] ?? 0));
  const onGroup = (g: Funnel["group"]) => { setGroup(g); const first = funnels.filter((f) => f.group === g).sort((a, b) => g === "modality" ? b.products.length - a.products.length : a.label.localeCompare(b.label))[0]; setKey(g === "target" ? "target:trop2" : g === "cancer" ? "cancer:nsclc" : first?.key ?? ""); };

  const rows = useMemo(() => {
    const list = crowding.filter((r) => r.active >= minActive);
    const num = (r: CrowdingRow) => sort.key === "index" ? (r.index ?? -1) : sort.key === "active" ? r.active : sort.key === "approved" ? r.approved : sort.key === "phase3" ? r.phase3 : sort.key === "registry" ? r.registryTrials : sort.key === "addressable" ? (r.addressable?.mid ?? -1) : 0;
    list.sort((a, b) => (sort.key === "name" ? sort.dir * a.name.localeCompare(b.name) : sort.dir * (num(a) - num(b)) || b.active - a.active));
    return list;
  }, [crowding, sort, minActive]);

  const columns: Column<CrowdingRow>[] = [
    { key: "name", label: "Target", sortable: true, render: (r) => <div><Link href={r.route} className="font-medium hover:underline">{r.name}</Link>{r.addressable && <div className="text-xs text-muted">{r.addressable.cancers.length} {r.addressable.cancers.length === 1 ? "cancer" : "cancers"} with incidence and prevalence data{r.addressable.dropped.length > 0 && <span className="text-amber-700 dark:text-amber-300"> · partial: {r.addressable.dropped.length} without a GLOBOCAN estimate</span>}</div>}</div> },
    { key: "active", label: "Active assets", sortable: true, tip: "Products in the corpus aimed at the target, excluding those recorded as negative, withdrawn or historic.", render: (r) => <button type="button" onClick={() => { setGroup("target"); setKey(`target:${r.targetId}`); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="tabular-nums underline decoration-dotted underline-offset-[3px]">{r.active}</button> },
    { key: "approved", label: "Approved", sortable: true, render: (r) => <span className="tabular-nums">{r.approved || <span className="text-muted">0</span>}</span> },
    { key: "phase3", label: "Phase 3", sortable: true, render: (r) => <span className="tabular-nums">{r.phase3 || <span className="text-muted">0</span>}</span> },
    { key: "registry", label: "Registry studies", sortable: true, tip: "Phase 2 and 3 studies on ClinicalTrials.gov for those products, summed. Studies of a combination count under each product.", hide: "hidden md:table-cell", render: (r) => <span className="tabular-nums">{r.registryTrials.toLocaleString("en-GB")}</span> },
    { key: "addressable", label: "Addressable patients per year", sortable: true, tip: "World estimate from the /market/ arithmetic: GLOBOCAN incidence x subtype share x prevalence x first setting share, summed over the cancers where prevalence is recorded. Midpoint shown with the range.", render: (r) => r.addressable ? <span className="tabular-nums">{fmt(r.addressable.mid)} <span className="text-xs text-muted">({fmt(r.addressable.low)} to {fmt(r.addressable.high)})</span></span> : <span className="text-xs text-muted">no incidence or prevalence data</span> },
    { key: "index", label: "Crowding index", sortable: true, tip: "Active assets per 100,000 addressable patients per year. Higher means more programmes chasing each patient. Marked partial when some of the target's cancers have no GLOBOCAN estimate, which inflates the index.", render: (r) => r.index !== null ? <span className={`font-semibold tabular-nums ${r.addressable?.dropped.length ? "text-amber-700 dark:text-amber-300" : ""}`} title={r.addressable?.dropped.length ? "Partial population: inflated" : undefined}>{r.index}{r.addressable?.dropped.length ? "*" : ""}</span> : <span className="text-muted">n/a</span> },
  ];

  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex rounded-lg border border-border overflow-hidden text-sm" role="tablist">
            {(["target", "modality", "cancer"] as const).map((g) => <button key={g} type="button" role="tab" aria-selected={group === g} onClick={() => onGroup(g)} className={`px-3 py-1.5 capitalize ${group === g ? "bg-accent text-white" : "bg-card hover:bg-surface"}`}>{g}</button>)}
          </div>
          <select value={funnel?.key} onChange={(e) => setKey(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm max-w-full" aria-label={`Choose a ${group}`}>
            {options.map((f) => <option key={f.key} value={f.key}>{f.label} ({f.products.length})</option>)}
          </select>
        </div>
        {funnel && (
          <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
            <div className="card p-5">
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <h2 className="text-lg font-semibold">{funnel.route ? <Link href={funnel.route} className="hover:underline">{funnel.label}</Link> : funnel.label} <span className="text-sm font-normal text-muted">{funnel.products.length} products in the corpus</span></h2>
              </div>
              <div className="space-y-2">
                {STAGES.map((s) => (
                  <div key={s} className="grid grid-cols-[110px_1fr_40px] items-center gap-3 text-sm">
                    <span className={`chip ${statusClass(STAGE_TONE[s])}`}>{STAGE_LABEL[s]}</span>
                    <div className="h-5 rounded bg-foreground/5 overflow-hidden"><div className={`h-full ${BAR[s]} transition-[width]`} style={{ width: `${(funnel.stages[s] / max) * 100}%` }} /></div>
                    <span className="tabular-nums text-right">{funnel.stages[s]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {[["Registry phase 3", funnel.registry.phase3], ["Registry phase 2", funnel.registry.phase2], ["Recruiting", funnel.registry.recruiting], ["All registry studies", funnel.registry.total]].map(([l, v]) => <div key={l as string} className="rounded-lg border border-border p-3"><div className="text-xs text-muted">{l}</div><div className="text-xl font-semibold tabular-nums">{(v as number).toLocaleString("en-GB")}</div></div>)}
              </div>
              <p className="text-xs text-muted mt-3">Registry counts are ClinicalTrials.gov phase 2 and 3 studies naming each product (fetched {fetched}); a combination study counts once per product it names, so sums overstate distinct trials.</p>
            </div>
            <div className="card p-4 max-h-[520px] overflow-y-auto">
              <div className="kicker mb-2">Products by stage</div>
              <ul className="space-y-1 text-sm">
                {funnel.products.map((p) => <li key={p.id} className="flex items-center justify-between gap-2"><span className="min-w-0"><Link href={p.route} className="hover:underline">{p.name}</Link> <span className="text-xs text-muted">{p.modality}</span></span><span className="flex items-center gap-2 shrink-0"><span className="text-xs text-muted tabular-nums" title="registry studies">{p.registry || ""}</span><span className={`chip ${statusClass(STAGE_TONE[p.stage])}`}>{STAGE_LABEL[p.stage]}</span></span></li>)}
              </ul>
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
          <h2 className="text-lg font-semibold">Crowding index by target</h2>
          <label className="text-sm text-muted flex items-center gap-2">Show targets with at least <input type="number" min={1} max={20} value={minActive} onChange={(e) => setMinActive(Math.max(1, Number(e.target.value) || 1))} className="w-14 rounded border border-border bg-card px-2 py-0.5 text-sm" /> active assets</label>
        </div>
        <ResultsTable columns={columns} rows={rows} rowKey={(r) => r.targetId} sort={sort} onSort={(k) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: k === "name" ? 1 : -1 }))} />
        <p className="text-xs text-muted mt-2">* Partial population: one or more of the target&rsquo;s cancers (sarcoma, GIST, neuroendocrine tumours, neuroblastoma) has no GLOBOCAN site estimate and is excluded from the denominator, so the index is inflated. Read those rows as &ldquo;crowded in the cancers we can count&rdquo;.</p>
      </section>
    </div>
  );
}
