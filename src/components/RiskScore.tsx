"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { RiskScoreDef } from "@/data/staging";

/**
 * Interactive scorer for a published prognostic index: tick the factors (or pick a level), see the total, the risk
 * group and the published outcome for that group, with the source. `links` are the standard-of-care settings on the
 * cancer page that match the group, resolved at build by the page. Nothing entered leaves the browser.
 */
export type GroupLink = { label: string; href: string };

export function RiskScore({ def, links = {}, cancerName }: { def: RiskScoreDef; links?: Record<string, GroupLink[]>; cancerName?: string }) {
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const [picked, setPicked] = useState<Record<string, number>>({});
  const total = useMemo(() => def.inputs.reduce((sum, i) => sum + (i.options ? (i.options[picked[i.id] ?? 0]?.points ?? 0) : ticked[i.id] ? (i.points ?? 0) : 0), 0), [def, ticked, picked]);
  const group = def.groups.find((g) => total >= g.min && total <= g.max) ?? def.groups[def.groups.length - 1];
  const max = def.inputs.reduce((s, i) => s + (i.options ? Math.max(...i.options.map((o) => o.points)) : (i.points ?? 0)), 0);
  const min = def.inputs.reduce((s, i) => s + (i.options ? Math.min(...i.options.map((o) => o.points)) : 0), 0);
  const [copied, setCopied] = useState(false);
  const summary = `${def.name}${cancerName ? ` (${cancerName})` : ""}: ${total} points, ${group.label}. ${def.outcomeLabel}: ${group.outcome}`;
  const tone = def.groups.indexOf(group) === 0 ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900" : def.groups.indexOf(group) === def.groups.length - 1 ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900" : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900";

  return (
    <div className="card p-4 sm:p-5" id={def.id}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">{def.name}</h3>
        {def.aka?.length ? <span className="text-xs text-muted">{def.aka.join(" · ")}</span> : null}
      </div>
      <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_280px]">
        <ul className="space-y-1.5">
          {def.inputs.map((i) => i.options ? (
            <li key={i.id} className="text-sm">
              <label className="block"><span className="text-muted">{i.label}</span>
                <select value={picked[i.id] ?? 0} onChange={(e) => setPicked((s) => ({ ...s, [i.id]: Number(e.target.value) }))} className="mt-1 w-full rounded-lg border border-border bg-card px-2 py-1.5 text-sm">
                  {i.options.map((o, k) => <option key={k} value={k}>{o.label} (+{o.points})</option>)}
                </select></label>
            </li>
          ) : (
            <li key={i.id}>
              <label className={`flex items-start gap-2 rounded-md px-2 py-1 text-sm cursor-pointer ${ticked[i.id] ? "bg-accent/10" : "hover:bg-foreground/5"}`}>
                <input type="checkbox" checked={!!ticked[i.id]} onChange={(e) => setTicked((s) => ({ ...s, [i.id]: e.target.checked }))} className="mt-1" />
                <span className="min-w-0 flex-1">{i.label}{i.hint && <span className="block text-xs text-muted">{i.hint}</span>}</span>
                <span className="text-xs text-muted tabular-nums">+{i.points}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className={`rounded-lg border p-3 self-start ${tone}`} aria-live="polite">
          <div className="text-[11px] text-muted">Score</div>
          <div className="text-2xl font-semibold tabular-nums">{total}<span className="text-sm text-muted font-normal"> / {max}</span></div>
          <div className="font-medium mt-1">{group.label}</div>
          <div className="text-xs text-muted mt-1">{def.outcomeLabel}</div>
          <div className="text-sm font-medium tabular-nums">{group.outcome}</div>
          {(links[group.label] ?? []).length > 0 && (
            <div className="mt-2 text-xs"><span className="text-muted">Standard of care: </span>{(links[group.label] ?? []).map((l, k) => <span key={l.href + k}>{k > 0 && ", "}<Link href={l.href} className="underline">{l.label}</Link></span>)}</div>
          )}
          <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard unavailable */ } }} className="mt-2 chip border border-border bg-card hover:bg-foreground/5 cursor-pointer">{copied ? "Copied" : "Copy result"}</button>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {def.groups.map((g) => <span key={g.label}><span className="font-medium text-foreground/80">{g.label}</span> {g.min === g.max ? g.min : `${g.min}-${Math.min(g.max, max)}`}: {g.outcome}</span>)}
        {min > 0 && <span>(minimum score {min})</span>}
      </div>
      {def.note && <p className="mt-2 text-xs text-muted">{def.note}</p>}
      <p className="mt-2 text-[11px] text-muted">Source: <a href={def.source.url} target="_blank" rel="noopener noreferrer" className="underline">{def.source.label}</a>. Outcomes are those of the published cohort and do not account for treatments since.</p>
    </div>
  );
}
