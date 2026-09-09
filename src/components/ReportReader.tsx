"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Tip } from "./Tip";
import { PrintButton } from "./PrintButton";
import { CancerIcon } from "./CancerIcon";
import { readField, REPORT_FIELDS, REPORT_FORMS, type ReportForm } from "@/data/report-fields";

/** Serialisable copy of a glossary term or cancer for the client. */
export type TermRef = { id: string; name: string; tldr: string; route: string };

/**
 * Enter the values printed on a pathology report and read what each one means in plain language, with a
 * hover explanation and a link to the glossary. Values live in component state only: nothing is stored,
 * sent, or remembered after the tab closes.
 */
export function ReportReader({ terms, cancers }: { terms: Record<string, TermRef>; cancers: Record<string, TermRef> }) {
  const [form, setForm] = useState<ReportForm | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const fields = useMemo(() => REPORT_FIELDS.filter((f) => f.form === form), [form]);
  const meta = REPORT_FORMS.find((f) => f.id === form);
  const filled = fields.filter((f) => (values[f.id] ?? "") !== "");
  const set = (id: string, v: string) => setValues((prev) => ({ ...prev, [id]: v }));
  const choose = (id: ReportForm | null) => { setForm(id); setValues({}); };

  return (
    <div>
      {/* Form picker */}
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 no-print" role="tablist" aria-label="Report type">
        {REPORT_FORMS.map((f) => (
          <button key={f.id} role="tab" aria-selected={form === f.id} type="button" onClick={() => choose(form === f.id ? null : f.id)}
            className={`card p-3 text-left transition flex items-center gap-3 ${form === f.id ? "ring-2 ring-foreground" : "hover:shadow-md"}`}>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={f.cancers[0]} className="h-6 w-6" /></span>
            <span className="min-w-0"><span className="block font-medium leading-snug">{f.label}</span><span className="block text-[11px] text-muted">{REPORT_FIELDS.filter((x) => x.form === f.id).length} fields</span></span>
          </button>
        ))}
      </div>

      {!meta && (
        <div className="card p-6 text-center mt-6">
          <div className="text-lg font-medium">Choose the type of report above.</div>
          <p className="text-muted mt-1 max-w-2xl mx-auto">Then copy the values from your report into the form. Each field explains what the value means and what it changes, with a link to the glossary. Nothing you type is stored or sent anywhere.</p>
        </div>
      )}

      {meta && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* Inputs */}
          <div className="no-print">
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <h2 className="text-xl font-semibold">{meta.label} report</h2>
              {filled.length > 0 && <button type="button" onClick={() => setValues({})} className="text-sm underline text-muted">Clear values</button>}
            </div>
            <p className="text-sm text-muted mb-4">{meta.intro}</p>
            <div className="card divide-y divide-border">
              {fields.map((f) => {
                const t = terms[f.termId];
                const v = values[f.id] ?? "";
                const inputClass = "rounded-md border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25";
                return (
                  <div key={f.id} className="p-3 grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
                    <label htmlFor={`rf-${f.id}`} className="text-sm">
                      <span className="font-medium">{t ? <Tip title={t.name} text={t.tldr} href={t.route}><span className="cursor-help underline decoration-dotted decoration-foreground/40 underline-offset-2">{f.label}</span></Tip> : f.label}</span>
                      {f.hint && <span className="block text-xs text-muted">{f.hint}</span>}
                    </label>
                    {f.input.kind === "number" && (
                      <div className="flex items-center gap-2">
                        <input id={`rf-${f.id}`} type="number" inputMode="decimal" value={v} min={f.input.min} max={f.input.max} step={f.input.step ?? "any"} onChange={(e) => set(f.id, e.target.value)} className={`${inputClass} w-32`} />
                        {f.input.unit && <span className="text-xs text-muted">{f.input.unit}</span>}
                      </div>
                    )}
                    {f.input.kind === "select" && (
                      <select id={`rf-${f.id}`} value={v} onChange={(e) => set(f.id, e.target.value)} className={`${inputClass} w-full`}>
                        <option value="">Not entered</option>
                        {f.input.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    )}
                    {f.input.kind === "text" && (
                      <input id={`rf-${f.id}`} type="text" value={v} placeholder={f.input.placeholder} onChange={(e) => set(f.id, e.target.value)} className={`${inputClass} w-full`} />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-muted mt-2">Values stay in this page only. Close the tab and they are gone.</p>
          </div>

          {/* Readings */}
          <div>
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <h2 className="text-xl font-semibold">Your reading</h2>
              {filled.length > 0 && <PrintButton className="text-sm text-muted no-print" />}
            </div>
            {filled.length === 0 && <div className="card p-6 text-sm text-muted">Enter a value on the left and its plain-language reading appears here.</div>}
            {filled.length > 0 && (
              <ol className="space-y-3">
                {filled.map((f) => {
                  const r = readField(f, values[f.id]);
                  const t = terms[f.termId];
                  const shown = f.input.kind === "select" ? (f.input.options.find((o) => o.value === values[f.id])?.label ?? values[f.id]) : `${values[f.id]}${f.input.kind === "number" && f.input.unit ? ` ${f.input.unit}` : ""}`;
                  return (
                    <li key={f.id} className="card p-4 print:break-inside-avoid">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <div className="font-medium">{f.label}<span className="text-muted font-normal"> : {shown}</span></div>
                        {t && <Link href={t.route} className="text-xs underline text-muted">Glossary: {t.name}</Link>}
                      </div>
                      {r ? (
                        <>
                          <p className="text-[15px] mt-1.5 leading-relaxed">{r.means}</p>
                          {r.changes && <p className="text-sm mt-1.5"><span className="kicker">What it changes</span> <span className="block mt-0.5">{r.changes}</span></p>}
                        </>
                      ) : <p className="text-sm text-muted mt-1.5">That value is outside the ranges this reader covers; ask your team what it means.</p>}
                      <div className="text-[11px] text-muted mt-2">Source: <a className="underline" href={f.source.url} rel="noopener">{f.source.label}</a></div>
                    </li>
                  );
                })}
              </ol>
            )}
            {filled.length > 0 && (
              <div className="mt-6">
                <div className="kicker mb-1.5">Read next</div>
                <div className="flex flex-wrap gap-1.5">
                  {meta.cancers.map((id) => cancers[id]).filter(Boolean).map((c) => (
                    <Tip key={c.id} title={c.name} text={c.tldr} href={c.route}><Link href={c.route} className="chip border bg-card border-border hover:bg-foreground/5">{c.name}</Link></Tip>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-muted mt-8 max-w-3xl">This reader translates report vocabulary; it does not interpret your case. Cut-offs are quoted from the cited guidelines and change over time, and a report is read as a whole by a pathologist and your oncology team. Take the reading to your appointment as a list of questions.</p>
    </div>
  );
}
