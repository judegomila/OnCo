"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FacetSelect } from "./filters/FacetSelect";
import { findPaths, hopLabel, type PathData } from "@/lib/paths";
import { KIND_META } from "@/lib/schema";
import { KIND_COLOR } from "@/lib/text";

export type PathExample = { from: string; to: string; label: string };

/** Pick two objects and see up to three shortest routes between them, every hop labelled with its relationship. */
export function PathFinder({ data, examples }: { data: PathData; examples: PathExample[] }) {
  const byId = useMemo(() => new Map(data.nodes.map((n, i) => [n.id, i])), [data.nodes]);
  const [from, setFrom] = useState<string | null>(examples[0]?.from ?? null);
  const [to, setTo] = useState<string | null>(examples[0]?.to ?? null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const p = new URLSearchParams(window.location.search);
      const f = p.get("from"), t = p.get("to");
      if (f && byId.has(f)) setFrom(f);
      if (t && byId.has(t)) setTo(t);
    });
    return () => cancelAnimationFrame(id);
  }, [byId]);
  useEffect(() => {
    const p = new URLSearchParams();
    if (from) p.set("from", from);
    if (to) p.set("to", to);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [from, to]);

  const options = useMemo(() => data.nodes.map((n) => ({ value: n.id, label: n.name, group: KIND_META[n.kind].plural })), [data.nodes]);
  const paths = useMemo(() => (from && to && from !== to ? findPaths(data, byId.get(from)!, byId.get(to)!, 3) : []), [data, byId, from, to]);
  const fromNode = from ? data.nodes[byId.get(from)!] : null, toNode = to ? data.nodes[byId.get(to)!] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px] [&>*]:min-w-0">
      <div>
        <div className="card p-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">From</span>
          <FacetSelect label="From" options={options} value={from} onChange={(v) => setFrom(v as string | null)} allLabel="Choose" width="w-72" />
          <span className="text-sm font-medium">to</span>
          <FacetSelect label="To" options={options} value={to} onChange={(v) => setTo(v as string | null)} allLabel="Choose" width="w-72" />
          <button type="button" onClick={() => { setFrom(to); setTo(from); }} className="text-sm underline text-muted" disabled={!from || !to}>swap</button>
        </div>

        {fromNode && toNode && from === to && <p className="mt-4 text-sm text-muted">Pick two different objects.</p>}
        {fromNode && toNode && from !== to && paths.length === 0 && <p className="mt-4 text-sm text-muted">No route within six hops. The two objects sit in unconnected parts of the graph, which is itself a gap worth knowing about.</p>}
        {paths.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted">{paths.length === 1 ? "One shortest route" : `${paths.length} shortest routes`}, {paths[0].hops.length} {paths[0].hops.length === 1 ? "hop" : "hops"} each. Relationship names are read in the direction of travel.</p>
            {paths.map((p, pi) => {
              let prev = data.nodes[p.start];
              return (
                <ol key={pi} className="card p-3 flex flex-wrap items-center gap-y-2 text-sm">
                  <li><Link href={prev.route} className={`chip border ${KIND_COLOR[prev.kind]} hover:brightness-95`}>{prev.name}</Link></li>
                  {p.hops.map((h, hi) => {
                    const n = data.nodes[h.node];
                    const label = hopLabel(h.via, h.forward, prev.kind, n.kind);
                    prev = n;
                    return (
                      <li key={hi} className="flex items-center">
                        <span className="mx-1.5 text-[11px] text-muted whitespace-nowrap" aria-label={`relationship: ${label}`}>{"→"} <span className="italic">{label}</span> {"→"}</span>
                        <Link href={n.route} className={`chip border ${KIND_COLOR[n.kind]} hover:brightness-95`}>{n.name}</Link>
                      </li>
                    );
                  })}
                </ol>
              );
            })}
            <p className="text-xs text-muted">Open in the <Link href={`/graph/?focus=${from}`} className="underline">graph explorer</Link> or <Link href={`/compare/?ids=${from},${to}`} className="underline">compare the two</Link> when they are the same kind.</p>
          </div>
        )}
      </div>
      <aside className="space-y-4">
        <div className="card p-3">
          <div className="kicker mb-2">Examples</div>
          <ul className="space-y-1.5 text-sm">{examples.map((e) => <li key={`${e.from}-${e.to}`}><button type="button" onClick={() => { setFrom(e.from); setTo(e.to); }} className="text-left hover:underline">{e.label}</button></li>)}</ul>
        </div>
        <div className="card p-3 text-xs text-muted">Breadth-first search over every declared relationship in both directions. Fronts and the {"“"}related{"”"} field count as hops like any other, so a route through a front is shown when nothing more specific is shorter. Ties prefer routes through less-connected objects.</div>
      </aside>
    </div>
  );
}
