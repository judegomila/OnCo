"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { agents } from "@/data/interactions";
import { agentById, checkPairs, SEVERITY_CLASS, SEVERITY_LABEL, singleFlags, worst } from "@/lib/interactions";
import { FacetSelect } from "@/components/filters/FacetSelect";
import { MoleculeSlot } from "@/components/MoleculeSlot";

/**
 * Pick two or more products and co-medications; see every flagged pair with mechanism and management, plus each
 * drug's food, QT, hepatic and renal lines. Selection lives in the URL (`?drugs=a,b`) so a check can be shared.
 */
export type CheckerDrug = { id: string; route: string; modality: string; tldr: string };

const KIND_LABEL = { food: "Food and administration", qt: "QT interval", hepatic: "Hepatic impairment", renal: "Renal impairment" } as const;

export function InteractionChecker({ drugs }: { drugs: Record<string, CheckerDrug> }) {
  const [sel, setSel] = useState<string[]>([]);
  const [synced, setSynced] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const raw = new URLSearchParams(window.location.search).get("drugs");
      if (raw) setSel(raw.split(",").map((s) => s.trim()).filter((s) => agentById(s)));
      setSynced(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  useEffect(() => {
    if (!synced) return;
    const url = new URL(window.location.href);
    if (sel.length) url.searchParams.set("drugs", sel.join(",")); else url.searchParams.delete("drugs");
    const next = url.pathname + url.search + url.hash;
    if (next !== window.location.pathname + window.location.search + window.location.hash) window.history.replaceState(window.history.state, "", next);
  }, [sel, synced]);

  const options = useMemo(() => agents.map((a) => ({ value: a.id, label: a.name, group: a.external ? "Common co-medications" : "OnCo products" })).sort((x, y) => x.group.localeCompare(y.group) || x.label.localeCompare(y.label)), []);
  const flags = useMemo(() => checkPairs(sel), [sel]);
  const singles = useMemo(() => singleFlags(sel), [sel]);
  const top = worst(flags);
  const name = (id: string) => agentById(id)?.name ?? id;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <FacetSelect label="Drugs" options={options} value={sel} onChange={(v) => setSel(v as string[])} multi searchable placeholder="Pick two or more…" allLabel="None chosen" width="w-80" />
        {sel.length > 0 && <button type="button" onClick={() => setSel([])} className="text-sm underline text-muted">Clear</button>}
        <span className="ml-auto text-sm text-muted">{sel.length} chosen · <span className="font-semibold text-foreground tabular-nums">{flags.length}</span> flagged pair{flags.length === 1 ? "" : "s"}{top && <> · worst <span className={`chip ${SEVERITY_CLASS[top]}`}>{SEVERITY_LABEL[top]}</span></>}</span>
      </div>

      {sel.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {sel.map((id) => {
            const a = agentById(id)!; const d = drugs[id];
            return (
              <span key={id} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card pl-1.5 pr-2 py-1 text-sm">
                {d ? <MoleculeSlot drugId={id} modality={d.modality} name={a.name} className="h-7 w-7" /> : <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground/5 text-[10px] text-muted">co-med</span>}
                <span>{d ? <Link href={d.route} className="font-medium hover:underline">{a.name}</Link> : <span className="font-medium">{a.name}</span>}<span className="block text-[11px] text-muted">{a.class}</span></span>
                <button type="button" onClick={() => setSel((s) => s.filter((x) => x !== id))} aria-label={`Remove ${a.name}`} className="text-muted hover:text-foreground">×</button>
              </span>
            );
          })}
        </div>
      )}

      {sel.length < 2 ? (
        <div className="card p-8 text-center text-muted text-sm">{sel.length === 0 ? "Choose two or more drugs to check. The list mixes OnCo products with the co-medications that most often collide with them: azoles, PPIs, anticoagulants, antiemetics, statins, enzyme inducers." : "Add a second drug to check pairs. Single-drug flags are shown below."}</div>
      ) : flags.length === 0 ? (
        <div className="card p-6 text-sm text-muted">No interaction flagged among these drugs by the rules or the labels in our data. Absence of a flag is not proof of safety: check the current prescribing information.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="onco">
            <thead><tr><th>Severity</th><th className="min-w-[200px]">Pair</th><th className="min-w-[280px]">Mechanism</th><th className="min-w-[280px]">Management</th><th>Source</th></tr></thead>
            <tbody>
              {flags.map((f, i) => (
                <tr key={i}>
                  <td><span className={`chip ${SEVERITY_CLASS[f.severity]}`}>{SEVERITY_LABEL[f.severity]}</span></td>
                  <td className="text-sm"><span className="font-medium">{name(f.a)}</span><span className="text-muted"> + </span><span className="font-medium">{name(f.b)}</span><div className="text-[11px] text-muted mt-0.5">{f.rule.replace(/-/g, " ")}</div></td>
                  <td className="text-sm text-foreground/85">{f.mechanism}</td>
                  <td className="text-sm">{f.management}</td>
                  <td className="text-xs">{f.source ? <a href={f.source} target="_blank" rel="noopener noreferrer" className="underline text-muted">Label / source</a> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {singles.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold mb-2">Single-drug flags</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {sel.map((id) => {
              const mine = singles.filter((s) => s.id === id);
              if (!mine.length) return null;
              return (
                <div key={id} className="card p-4 text-sm">
                  <div className="font-medium mb-1.5">{name(id)}</div>
                  <ul className="space-y-1.5">{mine.map((s, i) => <li key={i}><span className={`chip mr-1.5 ${s.kind === "qt" ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100" : "bg-foreground/5 text-muted"}`}>{KIND_LABEL[s.kind]}</span><span className="text-foreground/85">{s.text}</span></li>)}</ul>
                  <a href={agentById(id)!.source} target="_blank" rel="noopener noreferrer" className="text-xs underline text-muted mt-2 inline-block">Prescribing information →</a>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
