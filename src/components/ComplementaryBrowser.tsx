"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EVIDENCE_GRADES, GRADE_META, USES, USE_KEYS, type EvidenceGrade, type Use } from "@/lib/complementary";
import { EvidenceGradeChip } from "./EvidenceGradeChip";

export type ComplementaryRow = {
  id: string;
  name: string;
  route: string;
  tldr: string;
  grade: EvidenceGrade;
  uses: Use[];
  line: string;
  guideline?: string;
  status?: string;
};

/**
 * Filterable list of complementary and supportive approaches grouped by evidence grade. Pick a symptom
 * or purpose, narrow by grade, or type a name. Everything is rendered from rows the server page built from
 * the graph; nothing here is stored or sent anywhere.
 */
export function ComplementaryBrowser({ rows }: { rows: ComplementaryRow[] }) {
  const [use, setUse] = useState<Use | "all">("all");
  const [grades, setGrades] = useState<Set<EvidenceGrade>>(new Set(EVIDENCE_GRADES));
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => (use === "all" || r.uses.includes(use)) && grades.has(r.grade) && (!needle || `${r.name} ${r.tldr} ${r.line}`.toLowerCase().includes(needle)));
  }, [rows, use, grades, q]);

  const toggleGrade = (g: EvidenceGrade) => setGrades((prev) => { const next = new Set(prev); if (next.has(g)) next.delete(g); else next.add(g); return next; });
  const usesPresent = USE_KEYS.filter((u) => rows.some((r) => r.uses.includes(u)));

  return (
    <div>
      <div className="card p-4 grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end">
        <label className="block text-sm">
          <span className="kicker block mb-1">What do you want help with?</span>
          <select className="ctl w-full" value={use} onChange={(e) => setUse(e.target.value as Use | "all")} aria-label="Symptom or purpose">
            <option value="all">Anything ({rows.length})</option>
            {usesPresent.map((u) => <option key={u} value={u}>{USES[u]} ({rows.filter((r) => r.uses.includes(u)).length})</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="kicker block mb-1">Search</span>
          <input className="ctl w-full" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="acupuncture, ginger, mistletoe, cold cap" aria-label="Search approaches" />
        </label>
        <div className="text-sm">
          <span className="kicker block mb-1">Evidence grade</span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by evidence grade">
            {EVIDENCE_GRADES.map((g) => (
              <button key={g} type="button" onClick={() => toggleGrade(g)} aria-pressed={grades.has(g)} title={GRADE_META[g].blurb}
                className={`chip transition ${grades.has(g) ? GRADE_META[g].tone : "bg-foreground/5 text-muted line-through"}`}>{GRADE_META[g].short}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted mt-3">{filtered.length} of {rows.length} approaches shown{use !== "all" && <> for <span className="text-foreground">{USES[use]}</span></>}.</p>

      {EVIDENCE_GRADES.filter((g) => grades.has(g)).map((g) => {
        const items = filtered.filter((r) => r.grade === g).sort((a, b) => a.name.localeCompare(b.name));
        if (!items.length) return null;
        return (
          <section key={g} id={`grade-${g}`} className="mt-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
              <h2 className="text-lg font-semibold tracking-tight">{GRADE_META[g].label}</h2>
              <span className="text-sm text-muted">{items.length}</span>
            </div>
            <p className="text-sm text-muted max-w-3xl mb-4">{GRADE_META[g].blurb}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((r) => (
                <Link key={r.id} href={r.route} className="card p-4 flex flex-col">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2"><EvidenceGradeChip grade={r.grade} size="xs" /></div>
                  <div className="font-semibold leading-snug text-balance">{r.name}</div>
                  <p className="text-sm text-foreground/85 mt-1.5 leading-relaxed">{r.line}</p>
                  <div className="mt-auto pt-3 flex flex-wrap gap-1">
                    {r.uses.map((u) => <span key={u} className={`chip text-[10px] ${use === u ? "bg-accent-soft text-accent" : "bg-foreground/5 text-muted"}`}>{USES[u]}</span>)}
                  </div>
                  {r.guideline && <div className="text-[11px] text-muted mt-2">{r.guideline}</div>}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
      {filtered.length === 0 && <p className="mt-8 text-sm text-muted">Nothing matches. Clear the search or turn a grade back on.</p>}
    </div>
  );
}
