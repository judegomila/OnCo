"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { biomarkers, type BiomarkerGroup } from "@/data/biomarkers";
import { cautionsFor, scoreRows, type MatchRow } from "@/lib/biomarker-match";
import { KIND_META, type Kind } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";
import { FacetSelect } from "./filters/FacetSelect";
import { CancerIcon } from "./CancerIcon";
import { MoleculeSlot } from "./MoleculeSlot";
import { ApprovalChip } from "./ApprovalChip";

export type TbCancer = { id: string; name: string; group: string; route: string };
const GROUPS: BiomarkerGroup[] = ["IHC", "genomic", "germline", "immune"];
const KIND_ORDER: Kind[] = ["drug", "technology", "trial", "pairing", "idea", "target"];

export function TumorBoard({ rows, cancers }: { rows: MatchRow[]; cancers: TbCancer[] }) {
  const [cancer, setCancer] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [q, setQ] = useState("");

  const selected = useMemo(() => biomarkers.filter((b) => picked.includes(b.id)), [picked]);
  const scored = useMemo(() => scoreRows(rows, selected, cancer), [rows, selected, cancer]);
  const cautions = useMemo(() => cautionsFor(rows, scored, selected), [rows, scored, selected]);
  const cancerOptions = useMemo(() => cancers.map((c) => ({ value: c.id, label: c.name, group: c.group[0].toUpperCase() + c.group.slice(1) })), [cancers]);
  const typicalHere = useMemo(() => (cancer ? biomarkers.filter((b) => b.typical?.includes(cancer) && !picked.includes(b.id)) : []), [cancer, picked]);
  const chosenCancer = cancers.find((c) => c.id === cancer);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const visibleBiomarkers = biomarkers.filter((b) => {
    if (q && !`${b.label} ${b.note}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    const ta = cancer && a.typical?.includes(cancer) ? 0 : 1, tb = cancer && b.typical?.includes(cancer) ? 0 : 1;
    return ta - tb;
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
      <aside className="space-y-5 lg:sticky lg:top-20 self-start max-h-[85vh] overflow-auto pr-1">
        <div>
          <div className="kicker mb-1.5">1 · Cancer type (optional)</div>
          <div className="flex items-center gap-2">
            {chosenCancer && <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"><CancerIcon cancerId={chosenCancer.id} className="h-6 w-6" /></span>}
            <FacetSelect label="Cancer type" options={cancerOptions} value={cancer} onChange={(v) => setCancer((v as string | null) || null)} searchable placeholder="Search cancers…" allLabel="Any cancer" width="w-full" />
          </div>
          {typicalHere.length > 0 && (
            <div className="mt-2">
              <div className="text-[11px] text-muted mb-1">Typical for {chosenCancer?.name}: tap to add</div>
              <div className="flex flex-wrap gap-1">{typicalHere.slice(0, 8).map((b) => <button key={b.id} onClick={() => toggle(b.id)} className="chip border bg-card border-border hover:bg-foreground/5 text-[12px]">+ {b.label}</button>)}</div>
            </div>
          )}
        </div>
        <div>
          <div className="kicker mb-1.5">2 · Biomarkers and alterations</div>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a biomarker…" aria-label="Find a biomarker" className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 mb-2" />
          {GROUPS.map((grp) => {
            const list = visibleBiomarkers.filter((b) => b.group === grp);
            if (!list.length) return null;
            return (
              <div key={grp} className="mb-3">
                <div className="text-[11px] text-muted mb-1">{grp === "IHC" ? "Protein / IHC / imaging" : grp[0].toUpperCase() + grp.slice(1)}</div>
                <ul className="space-y-1">
                  {list.map((b) => {
                    const on = picked.includes(b.id);
                    const typical = cancer ? b.typical?.includes(cancer) : false;
                    return (
                      <li key={b.id}>
                        <label className={`flex items-start gap-2 rounded-md px-2 py-1 cursor-pointer text-sm ${on ? "bg-accent/10" : "hover:bg-foreground/5"}`}>
                          <input type="checkbox" checked={on} onChange={() => toggle(b.id)} className="mt-1" />
                          <span className="min-w-0"><span className="font-medium">{b.label}</span>{typical && <span className="ml-1 text-[10px] text-accent">typical</span>}<span className="block text-xs text-muted line-clamp-2">{b.note}</span></span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          {picked.length > 0 && <button onClick={() => setPicked([])} className="text-sm underline text-muted">Clear biomarkers</button>}
        </div>
      </aside>

      <div>
        <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800 px-4 py-3 text-sm mb-5">
          <strong>Not medical advice.</strong> This view matches biomarkers to objects documented in OnCo. It does not know your history, stage, fitness, prior treatments, or local availability. Bring it to a real tumour board or oncologist.
        </div>
        {selected.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-lg font-medium">Nothing to show yet.</div>
            <p className="text-muted mt-1">Tick one or more biomarkers on the left, or tap a typical one once you have chosen a cancer type. The matching products, technologies, trials, pairings and ideas appear here, ranked.</p>
            {chosenCancer && <p className="text-sm mt-3">Or read the <Link href={chosenCancer.route} className="underline">{chosenCancer.name} page</Link> for the standard of care and pipeline.</p>}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-baseline gap-2 mb-4 text-sm">
              <span><span className="font-semibold tabular-nums">{scored.length}</span> <span className="text-muted">matches for</span></span>
              {selected.map((b) => <span key={b.id} className="chip bg-accent/10 text-accent border border-accent/30">{b.label}</span>)}
              {cancer && <span className="text-muted">in {cancers.find((c) => c.id === cancer)?.name}</span>}
              <button onClick={() => window.print()} className="ml-auto underline text-muted">Print</button>
            </div>

            {cautions.length > 0 && (
              <section className="mb-6">
                <h2 className="font-semibold mb-2 text-rose-700 dark:text-rose-300">Cautions to raise</h2>
                <ul className="space-y-2">
                  {cautions.map((c) => (
                    <li key={c.id} className="card p-3 border-rose-200 dark:border-rose-900">
                      <Link href={c.route} className="font-medium hover:underline">{c.name}</Link>
                      <p className="text-sm text-muted mt-0.5">{c.tldr}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {KIND_ORDER.map((k) => {
              const items = scored.filter((s) => s.row.kind === k && !(k === "pairing" && s.row.pair?.caution));
              if (!items.length) return null;
              return (
                <section key={k} className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2"><h2 className="font-semibold capitalize">{KIND_META[k].plural}</h2><span className="text-xs text-muted">{items.length}</span></div>
                  <div className="overflow-x-auto card">
                    <table className="onco">
                      <thead><tr><th>#</th><th>Name</th><th>Status</th><th className="hidden md:table-cell">Matched on</th><th>Score</th></tr></thead>
                      <tbody>
                        {items.map(({ row, score, hits }, i) => (
                          <tr key={row.id}>
                            <td className="tabular-nums text-muted">{i + 1}</td>
                            <td className="min-w-[220px]"><div className="flex items-start gap-2">{row.kind === "drug" && <MoleculeSlot drugId={row.id} modality={row.meta} name={row.name} className="h-10 w-10" />}<div><Link href={row.route} className="font-medium hover:underline">{row.name}</Link><div className="text-xs text-muted line-clamp-2 max-w-md">{row.meta && <span className="text-foreground/70">{row.meta} · </span>}{row.tldr}</div></div></div></td>
                            <td>{row.kind === "drug" ? <ApprovalChip drugId={row.id} status={row.status} compact /> : row.status && <span className={`chip ${statusClass(row.status)}`}>{STATUS_LABEL[row.status] ?? row.status}</span>}</td>
                            <td className="hidden md:table-cell"><div className="flex flex-wrap gap-1">{hits.map((h) => <span key={h} className={`chip text-[10px] border ${KIND_COLOR[k]}`}>{h}</span>)}{cancer && row.cancers.includes(cancer) && <span className="chip text-[10px] bg-foreground/5">this cancer +2</span>}</div></td>
                            <td className="tabular-nums font-semibold">{score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
