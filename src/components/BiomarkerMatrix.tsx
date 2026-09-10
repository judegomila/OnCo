"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import type { BiomarkerGroup } from "@/data/biomarkers";
import { REGIONS, REGION_META, type Region, type RegionalStatus } from "@/data/regional-approvals";
import { useRegion } from "@/lib/region";
import { FacetSelect } from "./filters/FacetSelect";
import { Tip } from "./Tip";

/**
 * Biomarker-to-therapy grid. Rows are biomarkers, columns are cancers; each cell counts the matched products that
 * are approved (in the reader's region when we have a record, else anywhere) against those still in trials.
 * The data is computed once at build (see /biomarker-matrix/) and handed over as plain rows so the client only
 * filters and colours. Click a cell to open the tumour board with that cancer and biomarker pre-selected.
 */
export type MatrixDrug = { id: string; name: string; route: string; status?: string; /** Regional statuses where we have a record. */ regions: Partial<Record<Region, RegionalStatus>> };
export type MatrixCell = { drugs: MatrixDrug[]; /** Trials and technologies matched, beyond products. */ trials: number; technologies: number };
export type MatrixBiomarker = { id: string; label: string; group: BiomarkerGroup; note: string; typical: string[]; cells: Record<string, MatrixCell> };
export type MatrixCancer = { id: string; name: string; group: string; route: string };

const GROUP_LABEL: Record<BiomarkerGroup, string> = { IHC: "Protein / IHC / imaging", genomic: "Genomic (somatic)", germline: "Germline", immune: "Immune" };
const GROUPS: BiomarkerGroup[] = ["IHC", "genomic", "germline", "immune"];

const approvedHere = (d: MatrixDrug, region: Region) => {
  const here = d.regions[region];
  if (here) return here === "approved" || here === "conditional";
  // No regional record: fall back to the corpus status, which is usually the FDA.
  return d.status === "approved" || d.status === "standard-of-care";
};
const approvedAnywhere = (d: MatrixDrug) => (d.status === "approved" || d.status === "standard-of-care") || REGIONS.some((r) => d.regions[r] === "approved" || d.regions[r] === "conditional");

export function BiomarkerMatrix({ biomarkers, cancers }: { biomarkers: MatrixBiomarker[]; cancers: MatrixCancer[] }) {
  const { region } = useRegion();
  const [groupSel, setGroupSel] = useState<string[]>([]);
  const [cancerSel, setCancerSel] = useState<string[]>([]);
  const [mode, setMode] = useState<"all" | "approved" | "typical">("all");
  const [q, setQ] = useState("");

  const cancerOptions = useMemo(() => cancers.map((c) => ({ value: c.id, label: c.name, group: c.group[0].toUpperCase() + c.group.slice(1) })), [cancers]);
  const groupOptions = GROUPS.map((g) => ({ value: g, label: GROUP_LABEL[g] }));

  const rows = useMemo(() => biomarkers.filter((b) => (!groupSel.length || groupSel.includes(b.group)) && (!q.trim() || `${b.label} ${b.note}`.toLowerCase().includes(q.trim().toLowerCase()))), [biomarkers, groupSel, q]);
  /** Columns: the chosen cancers, else every cancer with at least one non-empty cell among the visible rows, ordered by group then name. */
  const cols = useMemo(() => {
    const chosen = cancerSel.length ? cancers.filter((c) => cancerSel.includes(c.id)) : cancers.filter((c) => rows.some((b) => (b.cells[c.id]?.drugs.length ?? 0) > 0 || (mode !== "approved" && (b.cells[c.id]?.trials ?? 0) > 0)));
    return chosen.sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
  }, [cancers, cancerSel, rows, mode]);

  const counts = (cell: MatrixCell | undefined) => {
    if (!cell) return { approved: 0, trial: 0, other: 0 };
    const approved = cell.drugs.filter((d) => approvedHere(d, region)).length;
    const trial = cell.drugs.length - approved;
    return { approved, trial, other: cell.trials + cell.technologies };
  };
  const tone = (a: number, t: number, other: number) => a >= 3 ? "bg-emerald-200 text-emerald-950 dark:bg-emerald-800/70 dark:text-emerald-50" : a > 0 ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100" : t > 0 ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100" : other > 0 ? "bg-foreground/[0.06] text-muted" : "text-muted/30";
  const meta = REGION_META[region];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <FacetSelect label="Biomarker group" options={groupOptions} value={groupSel} onChange={(v) => setGroupSel(v as string[])} multi searchable={false} allLabel="All" width="w-52" />
        <FacetSelect label="Cancers" options={cancerOptions} value={cancerSel} onChange={(v) => setCancerSel(v as string[])} multi searchable allLabel="With any match" width="w-56" />
        <div role="radiogroup" aria-label="Cell content" className="inline-flex rounded-lg border border-border bg-card p-0.5 text-sm">
          {([["all", "Approved and trials"], ["approved", `Approved in ${region}`], ["typical", "Typical tests only"]] as const).map(([v, l]) => (
            <button key={v} type="button" role="radio" aria-checked={mode === v} onClick={() => setMode(v)} className={`rounded-md px-2.5 py-1 ${mode === v ? "bg-foreground text-background" : "hover:bg-foreground/5"}`}>{l}</button>
          ))}
        </div>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a biomarker…" aria-label="Find a biomarker" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-48" />
        <span className="ml-auto text-sm text-muted whitespace-nowrap"><span className="font-semibold text-foreground tabular-nums">{rows.length}</span> biomarkers × <span className="font-semibold text-foreground tabular-nums">{cols.length}</span> cancers · {meta.flag} {meta.label}</span>
      </div>

      <div className="card overflow-x-auto">
        <table className="onco text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-card min-w-[220px]">Biomarker</th>
              {cols.map((c) => <th key={c.id} className="text-center align-bottom min-w-[76px]"><Link href={c.route} className="hover:underline [writing-mode:vertical-rl] rotate-180 inline-block max-h-40 leading-tight py-1 whitespace-nowrap overflow-hidden text-ellipsis" title={c.name}>{c.name.replace(/\s*\(.*?\)\s*$/, "")}</Link></th>)}
            </tr>
          </thead>
          <tbody>
            {GROUPS.filter((g) => rows.some((b) => b.group === g)).map((g) => (
              <Fragment key={g}>
                <tr><td colSpan={cols.length + 1} className="kicker !py-2 bg-surface sticky left-0">{GROUP_LABEL[g]}</td></tr>
                {rows.filter((b) => b.group === g).map((b) => (
                  <tr key={b.id}>
                    <td className="sticky left-0 z-10 bg-card min-w-[220px]">
                      <Tip title={b.label} text={b.note} href={`/tumor-board/?bm=${b.id}`} linkLabel="Open in tumour board →"><span className="font-medium cursor-help">{b.label}</span></Tip>
                    </td>
                    {cols.map((c) => {
                      const cell = b.cells[c.id];
                      const typical = b.typical.includes(c.id);
                      if (mode === "typical" && !typical) return <td key={c.id} className="text-center text-muted/20">·</td>;
                      const { approved, trial, other } = counts(cell);
                      const shownTrial = mode === "approved" ? 0 : trial;
                      const shownOther = mode === "approved" ? 0 : other;
                      if (!approved && !shownTrial && !shownOther) return <td key={c.id} className="text-center text-muted/20" aria-label={`${b.label} in ${c.name}: nothing matched`}>·</td>;
                      const names = (cell?.drugs ?? []).slice().sort((x, y) => Number(approvedHere(y, region)) - Number(approvedHere(x, region)) || x.name.localeCompare(y.name));
                      const tip = [
                        approved ? `Approved${cell?.drugs.some((d) => d.regions[region]) ? ` in ${meta.label}` : ""}: ${names.filter((d) => approvedHere(d, region)).map((d) => d.name).join(", ")}` : "",
                        shownTrial ? `In trials or approved elsewhere: ${names.filter((d) => !approvedHere(d, region)).map((d) => d.name + (approvedAnywhere(d) ? " (approved elsewhere)" : "")).join(", ")}` : "",
                        shownOther ? `${cell?.trials ?? 0} trial${cell?.trials === 1 ? "" : "s"}, ${cell?.technologies ?? 0} technolog${cell?.technologies === 1 ? "y" : "ies"} also match` : "",
                        typical ? "Typically tested in this cancer." : "",
                      ].filter(Boolean).join(" ");
                      return (
                        <td key={c.id} className="text-center p-1">
                          <Tip title={`${b.label} · ${c.name}`} text={tip} href={`/tumor-board/?cancer=${c.id}&bm=${b.id}`} linkLabel="Open in tumour board →">
                            <Link href={`/tumor-board/?cancer=${c.id}&bm=${b.id}`} aria-label={`${b.label} in ${c.name}: ${approved} approved, ${shownTrial} in trials`} className={`inline-flex min-w-[60px] items-center justify-center gap-1 rounded-md px-1.5 py-1 font-semibold tabular-nums ${tone(approved, shownTrial, shownOther)} ${typical ? "ring-1 ring-inset ring-foreground/25" : ""}`}>
                              {approved > 0 && <span>{approved}</span>}
                              {shownTrial > 0 && <span className="font-normal opacity-80">+{shownTrial}</span>}
                              {!approved && !shownTrial && shownOther > 0 && <span className="font-normal">{shownOther}</span>}
                            </Link>
                          </Tip>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="px-6 py-12 text-center text-muted text-sm">No biomarker matches that search.</div>}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted">
        <span><span className="inline-block h-3 w-6 rounded bg-emerald-100 dark:bg-emerald-900/50 align-middle mr-1.5" />Bold number: products approved (in {meta.label} where we hold a regional record, otherwise by corpus status)</span>
        <span><span className="inline-block h-3 w-6 rounded bg-amber-100 dark:bg-amber-900/40 align-middle mr-1.5" />+n: matched products still in trials here</span>
        <span><span className="inline-block h-3 w-6 rounded bg-foreground/[0.06] align-middle mr-1.5" />Grey: only trials or technologies match</span>
        <span><span className="inline-block h-3 w-6 rounded ring-1 ring-inset ring-foreground/25 align-middle mr-1.5" />Ring: biomarker typically tested in this cancer</span>
      </div>
    </div>
  );
}

