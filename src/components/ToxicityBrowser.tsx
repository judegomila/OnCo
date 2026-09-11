"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column, type SortState } from "./filters/ResultsTable";

export type ToxRow = { id: string; drugId: string; drug: string; route: string; modality: string; event: string; anyGradePct?: number; grade3PlusPct?: number; source?: string; note?: string };

function Bar({ pct, tone }: { pct?: number; tone: string }) {
  if (pct === undefined) return <span className="text-muted">-</span>;
  return <div className="flex items-center gap-2 min-w-[140px]"><div className="h-2 flex-1 rounded bg-foreground/5 overflow-hidden"><div className={`h-full ${tone}`} style={{ width: `${Math.min(100, pct)}%` }} /></div><span className="tabular-nums text-xs w-10 text-right">{pct}%</span></div>;
}

/** Normalise event names so the same toxicity lines up across products. */
function family(event: string): string {
  const e = event.toLowerCase();
  if (/neutro/.test(e)) return "Neutropenia";
  if (/anaem|anemia|haemoglobin|hemoglobin/.test(e)) return "Anaemia";
  if (/thrombocyt|platelet/.test(e)) return "Thrombocytopenia";
  if (/lymph/.test(e)) return "Lymphopenia";
  if (/diarr/.test(e)) return "Diarrhoea";
  if (/nausea/.test(e)) return "Nausea";
  if (/vomit/.test(e)) return "Vomiting";
  if (/fatigue|asthenia/.test(e)) return "Fatigue";
  if (/rash|cutaneous|skin/.test(e)) return "Rash / skin";
  if (/neuropath|paraesth|paresth/.test(e)) return "Peripheral neuropathy";
  if (/stomatitis|mucos/.test(e)) return "Stomatitis";
  if (/alopecia|hair/.test(e)) return "Alopecia";
  if (/appetite/.test(e)) return "Decreased appetite";
  if (/ild|interstitial|pneumonitis/.test(e)) return "ILD / pneumonitis";
  if (/crs|cytokine release/.test(e)) return "Cytokine release syndrome";
  if (/icans|neurolog|neurotox/.test(e)) return "Neurotoxicity";
  if (/infect|pneumonia/.test(e)) return "Infections";
  if (/hepat|alt|ast|transamin/.test(e)) return "Hepatotoxicity";
  if (/eye|ocular|kerat|vision|conjunct|dry eye/.test(e)) return "Ocular";
  if (/qt/.test(e)) return "QT prolongation";
  if (/hypergly/.test(e)) return "Hyperglycaemia";
  if (/hypothyroid|thyroid/.test(e)) return "Thyroid";
  if (/colitis/.test(e)) return "Colitis";
  if (/mds|aml|leuk|malignan/.test(e)) return "Secondary malignancy";
  return event;
}

export function ToxicityBrowser({ rows }: { rows: ToxRow[] }) {
  const [modality, setModality] = useState<string[]>(["ADC"]);
  const [events, setEvents] = useState<string[]>([]);
  const [drugs, setDrugs] = useState<string[]>([]);
  const [sort, setSort] = useState<SortState>({ key: "g3", dir: -1 });

  const enriched = useMemo(() => rows.map((r) => ({ ...r, fam: family(r.event) })), [rows]);
  const filtered = useMemo(() => {
    const list = enriched.filter((r) => (!modality.length || modality.includes(r.modality)) && (!events.length || events.includes(r.fam)) && (!drugs.length || drugs.includes(r.drug)));
    list.sort((a, b) => {
      if (sort.key === "drug") return sort.dir * a.drug.localeCompare(b.drug) || a.fam.localeCompare(b.fam);
      if (sort.key === "event") return sort.dir * a.fam.localeCompare(b.fam) || a.drug.localeCompare(b.drug);
      const va = sort.key === "any" ? a.anyGradePct : a.grade3PlusPct, vb = sort.key === "any" ? b.anyGradePct : b.grade3PlusPct;
      return sort.dir * ((va ?? -1) - (vb ?? -1)) || a.fam.localeCompare(b.fam);
    });
    return list;
  }, [enriched, modality, events, drugs, sort]);

  const opt = (f: (r: typeof enriched[number]) => string, pool = enriched) => { const m = new Map<string, number>(); for (const r of pool) m.set(f(r), (m.get(f(r)) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([v, n]) => ({ value: v, label: v, count: n })); };
  const inModality = enriched.filter((r) => !modality.length || modality.includes(r.modality));

  const columns: Column<typeof enriched[number]>[] = [
    { key: "event", label: "Adverse event", sortable: true, render: (r) => <div><span className="font-medium">{r.fam}</span>{r.fam !== r.event && <div className="text-xs text-muted">{r.event}</div>}</div> },
    { key: "drug", label: "Product", sortable: true, render: (r) => <div><Link href={`${r.route}#safety`} className="hover:underline">{r.drug}</Link><div className="text-xs text-muted">{r.modality}</div></div> },
    { key: "any", label: "Any grade", sortable: true, render: (r) => <Bar pct={r.anyGradePct} tone="bg-amber-400/70" /> },
    { key: "g3", label: "Grade 3+", sortable: true, render: (r) => <Bar pct={r.grade3PlusPct} tone="bg-rose-500/80" /> },
    { key: "note", label: "Trial / note", hide: "hidden lg:table-cell", render: (r) => <span className="text-xs text-muted">{r.note}{r.source && <> · <a className="underline" href={r.source} rel="noopener">source</a></>}</span> },
  ];

  return (
    <div>
      <Toolbar count={filtered.length} total={rows.length} noun="adverse-event rows"
        left={<>
          <FacetSelect label="Class" options={opt((r) => r.modality)} value={modality} onChange={(v) => { setModality(v as string[]); setDrugs([]); }} multi searchable={false} allLabel="Any" width="w-56" />
          <FacetSelect label="Event" options={opt((r) => r.fam, inModality)} value={events} onChange={(v) => setEvents(v as string[])} multi allLabel="Any" width="w-52" />
          <FacetSelect label="Product" options={opt((r) => r.drug, inModality)} value={drugs} onChange={(v) => setDrugs(v as string[])} multi allLabel="Any" width="w-56" />
          {(events.length || drugs.length || modality.length !== 1 || modality[0] !== "ADC") ? <button type="button" onClick={() => { setModality(["ADC"]); setEvents([]); setDrugs([]); }} className="text-sm underline text-muted">Reset</button> : null}
        </>} />
      <ResultsTable columns={columns} rows={filtered} rowKey={(r) => r.id} sort={sort} onSort={(k) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: k === "any" || k === "g3" ? -1 : 1 }))} />
    </div>
  );
}
