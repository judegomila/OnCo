"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PulseItem, PulseTheme, Sentiment } from "@/data/pulse";
import { FacetSelect } from "./filters/FacetSelect";
import { Toolbar } from "./filters/ResultsTable";

export type PulseSource = { id: string; name: string; url: string; type: string; logo?: string; route?: string };
export type RefLite = { id: string; name: string; route: string; kind: string };

const TONE: Record<Sentiment, string> = {
  promising: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  cautious: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  negative: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  neutral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

function Heat({ n }: { n: number }) {
  return <span className="inline-flex gap-0.5" aria-label={`heat ${n} of 5`}>{[1, 2, 3, 4, 5].map((i) => <span key={i} className={`h-2 w-2 rounded-full ${i <= n ? "bg-accent" : "bg-foreground/15"}`} />)}</span>;
}

function SourceLogo({ s, size = 24 }: { s: PulseSource; size?: number }) {
  const initials = s.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-white overflow-hidden" style={{ width: size, height: size }} aria-hidden>
      {s.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- favicon / self-hosted logo
        <img src={s.logo} alt="" className="h-[70%] w-[70%] object-contain" loading="lazy" referrerPolicy="no-referrer" />
      ) : <span className="text-[9px] font-semibold text-zinc-500">{initials}</span>}
    </span>
  );
}

export function PulseBoard({ items, themes, sources, refs, asOf }: { items: PulseItem[]; themes: PulseTheme[]; sources: PulseSource[]; refs: Record<string, RefLite>; asOf: string }) {
  const [types, setTypes] = useState<string[]>([]);
  const [sentiments, setSentiments] = useState<string[]>([]);
  const [sourceIds, setSourceIds] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const byId = useMemo(() => new Map(sources.map((s) => [s.id, s])), [sources]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((it) => {
      const s = byId.get(it.sourceId);
      if (types.length && (!s || !types.includes(s.type))) return false;
      if (sentiments.length && !sentiments.includes(it.sentiment)) return false;
      if (sourceIds.length && !sourceIds.includes(it.sourceId)) return false;
      if (needle && !`${it.title} ${it.oneLine} ${it.refs.map((r) => refs[r]?.name ?? r).join(" ")}`.toLowerCase().includes(needle)) return false;
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [items, types, sentiments, sourceIds, q, byId, refs]);

  const grouped = useMemo(() => {
    const m = new Map<string, PulseItem[]>();
    for (const it of filtered) m.set(it.sourceId, [...(m.get(it.sourceId) ?? []), it]);
    return [...m.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  const typeOptions = useMemo(() => { const c = new Map<string, number>(); for (const it of items) { const t = byId.get(it.sourceId)?.type ?? "other"; c.set(t, (c.get(t) ?? 0) + 1); } return [...c.entries()].map(([v, n]) => ({ value: v, label: v[0].toUpperCase() + v.slice(1), count: n })); }, [items, byId]);
  const sentimentOptions = (["promising", "cautious", "neutral", "negative"] as Sentiment[]).map((s) => ({ value: s, label: s[0].toUpperCase() + s.slice(1), count: items.filter((i) => i.sentiment === s).length }));
  const sourceOptions = useMemo(() => { const c = new Map<string, number>(); for (const it of items) c.set(it.sourceId, (c.get(it.sourceId) ?? 0) + 1); return [...c.entries()].map(([v, n]) => ({ value: v, label: byId.get(v)?.name ?? v, count: n })).sort((a, b) => b.count - a.count); }, [items, byId]);

  const chip = (id: string) => { const r = refs[id]; return r ? <Link key={id} href={r.route} className="chip border bg-card border-border hover:bg-foreground/5">{r.name.replace(/ \(.*\)$/, "")}</Link> : null; };

  return (
    <div>
      <section className="mb-12">
        <div className="flex items-baseline justify-between gap-4 mb-3"><h2 className="text-xl font-semibold tracking-tight">Current themes</h2><span className="text-xs text-muted">read on {asOf}</span></div>
        <div className="grid gap-3 md:grid-cols-2">
          {themes.slice().sort((a, b) => b.heat - a.heat).map((t) => (
            <div key={t.id} className="card p-4">
              <div className="flex items-center justify-between gap-3 mb-1"><div className="font-semibold">{t.title}</div><Heat n={t.heat} /></div>
              <p className="text-sm text-foreground/85 leading-relaxed">{t.synthesis}</p>
              <div className="mt-2 flex flex-wrap gap-1">{t.refs.map(chip)}</div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">carried by{t.sourceIds.map((sid) => { const s = byId.get(sid); return s ? <span key={sid} title={s.name}><SourceLogo s={s} size={18} /></span> : null; })}</div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="text-xl font-semibold tracking-tight mb-3">By source</h2>
      <Toolbar count={filtered.length} total={items.length} noun="items"
        left={<>
          <FacetSelect label="Source type" options={typeOptions} value={types} onChange={(v) => setTypes(v as string[])} multi searchable={false} allLabel="Any" width="w-44" />
          <FacetSelect label="Source" options={sourceOptions} value={sourceIds} onChange={(v) => setSourceIds(v as string[])} multi allLabel="Any" width="w-56" />
          <FacetSelect label="Sentiment" options={sentimentOptions} value={sentiments} onChange={(v) => setSentiments(v as string[])} multi searchable={false} allLabel="Any" width="w-44" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter items…" aria-label="Filter items" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-56" />
          {(types.length || sentiments.length || sourceIds.length || q) ? <button type="button" onClick={() => { setTypes([]); setSentiments([]); setSourceIds([]); setQ(""); }} className="text-sm underline text-muted">Clear</button> : null}
        </>} />
      <div className="space-y-4">
        {grouped.map(([sid, list]) => {
          const s = byId.get(sid);
          return (
            <section key={sid} className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                {s && <SourceLogo s={s} />}
                <div className="min-w-0">
                  <div className="font-semibold leading-tight">{s ? (s.route ? <Link href={s.route} className="hover:underline">{s.name}</Link> : s.name) : sid}</div>
                  {s && <a href={s.url} rel="noopener" className="text-xs text-muted hover:underline break-all">{s.url.replace(/^https?:\/\//, "")}</a>}
                </div>
                <span className="ml-auto text-xs text-muted">{list.length} item{list.length === 1 ? "" : "s"}</span>
              </div>
              <ul className="divide-y divide-border">
                {list.map((it) => (
                  <li key={it.url} className="py-2.5 grid gap-1 sm:grid-cols-[6.5rem_1fr]">
                    <div className="text-xs text-muted tabular-nums">{it.date}</div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2"><a href={it.url} rel="noopener" className="font-medium hover:underline">{it.title}</a><span className={`chip ${TONE[it.sentiment]}`}>{it.sentiment}</span></div>
                      <p className="text-sm text-muted mt-0.5">{it.oneLine}</p>
                      {it.refs.length > 0 && <div className="mt-1.5 flex flex-wrap gap-1">{it.refs.map(chip)}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {grouped.length === 0 && <div className="card p-8 text-center text-muted text-sm">Nothing matches. Clear a filter.</div>}
      </div>
    </div>
  );
}
