"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { Toolbar } from "./filters/ResultsTable";
import type { RefLite } from "./PulseBoard";

/** Shape written by scripts/fetch-pulse.ts (public/pulse/auto.json). */
export type AutoPulseFeed = { id: string; name: string; homepage: string; url: string; kind: string; sourceId?: string; ok: boolean; count: number; error?: string };
export type AutoPulseItem = { feedId: string; title: string; url: string; date?: string; refs: string[] };
export type AutoPulseSnapshot = { fetched: string; feeds: AutoPulseFeed[]; items: AutoPulseItem[] };

/**
 * The automated stream beside the curated pulse: every item a source published recently, unedited, with the
 * OnCo objects its title names. Filter by source or show only items that touch something in the corpus.
 */
export function AutoPulse({ snap, refs }: { snap: AutoPulseSnapshot; refs: Record<string, RefLite> }) {
  const [feedIds, setFeedIds] = useState<string[]>([]);
  const [matchedOnly, setMatchedOnly] = useState(false);
  const [q, setQ] = useState("");
  const byId = useMemo(() => new Map(snap.feeds.map((f) => [f.id, f])), [snap.feeds]);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return snap.items.filter((it) => (!feedIds.length || feedIds.includes(it.feedId)) && (!matchedOnly || it.refs.some((r) => refs[r])) && (!n || `${it.title} ${it.refs.map((r) => refs[r]?.name ?? r).join(" ")}`.toLowerCase().includes(n)));
  }, [snap.items, feedIds, matchedOnly, q, refs]);

  const feedOptions = snap.feeds.map((f) => ({ value: f.id, label: f.name, count: snap.items.filter((i) => i.feedId === f.id).length }));
  const chip = (id: string) => { const r = refs[id]; return r ? <Link key={id} href={r.route} className="chip border bg-card border-border hover:bg-foreground/5">{r.name.replace(/ \(.*\)$/, "")}</Link> : null; };

  return (
    <div>
      <Toolbar count={filtered.length} total={snap.items.length} noun="items"
        left={<>
          <FacetSelect label="Source" options={feedOptions} value={feedIds} onChange={(v) => setFeedIds(v as string[])} multi searchable={false} allLabel="Any" width="w-56" />
          <label className="inline-flex items-center gap-1.5 text-sm"><input type="checkbox" checked={matchedOnly} onChange={(e) => setMatchedOnly(e.target.checked)} /> Only items naming an OnCo object</label>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter titles…" aria-label="Filter automated items" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-56" />
          {(feedIds.length || matchedOnly || q) ? <button type="button" onClick={() => { setFeedIds([]); setMatchedOnly(false); setQ(""); }} className="text-sm underline text-muted">Clear</button> : null}
        </>} />
      <div className="card overflow-x-auto">
        <table className="onco">
          <thead><tr><th>Date</th><th>Source</th><th>Title</th><th className="hidden md:table-cell">Names</th></tr></thead>
          <tbody>
            {filtered.map((it) => {
              const f = byId.get(it.feedId);
              return (
                <tr key={it.url}>
                  <td className="font-mono text-xs text-muted whitespace-nowrap">{it.date ?? ""}</td>
                  <td className="text-muted whitespace-nowrap">{f ? <a href={f.homepage} rel="noopener" className="hover:underline">{f.name}</a> : it.feedId}</td>
                  <td><a href={it.url} rel="noopener" className="hover:underline">{it.title}</a></td>
                  <td className="hidden md:table-cell"><div className="flex flex-wrap gap-1">{it.refs.map(chip)}</div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="px-6 py-12 text-center text-muted text-sm">Nothing matches. Clear a filter.</div>}
      </div>
      <p className="text-xs text-muted mt-3">Fetched {snap.fetched}. Sources: {snap.feeds.map((f, i) => <span key={f.id}>{i > 0 && ", "}<a href={f.homepage} rel="noopener" className="hover:underline">{f.name}</a>{f.ok ? "" : " (unreachable at fetch time)"}</span>)}. Matching is by name, brand, code and alias in the title; it is a prompt to look, not a judgement.</p>
    </div>
  );
}
