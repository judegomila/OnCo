"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Tip } from "./Tip";
import { MoreFoot } from "./filters/ResultsTable";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { loadTableFile, SECTION_PAGE, type MoreRows } from "@/lib/static-tables";

/** One pathway's node table on /pathway-drugs/, as plain data (built by src/lib/tables/pathway-drugs.ts). */
export type PathwaySection = {
  id: string;
  name: string;
  route: string;
  tldr: string;
  interventions: string[];
  /** The treatments table filtered to the pathway's targets; absent when no node has a target. */
  drugsHref?: string;
  nodes: Array<{
    id: string;
    label: string;
    href?: string;
    targetName?: string;
    /** The node names a target in the corpus. */
    targeted: boolean;
    /** The best status among the products hitting the node, and the treatments table filtered to it. */
    best?: string;
    bestHref?: string;
    products: Array<{ id: string; name: string; route: string; status?: string; modality: string }>;
  }>;
};

function Section({ s }: { s: PathwaySection }) {
  return (
    <section id={s.id} className="scroll-mt-28">
      <header className="mb-3">
        <h2 className="text-xl font-semibold tracking-tight"><Link href={s.route} className="hover:underline">{s.name}</Link></h2>
        <p className="text-sm text-muted mt-1 max-w-3xl">{s.tldr}</p>
        {s.drugsHref && <p className="text-xs mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
          <Link href={s.drugsHref} className="underline text-accent">Treatments hitting this pathway, as a filterable table</Link>
          <Link href={s.route} className="underline text-muted hover:text-accent">Pathway page and diagram</Link>
        </p>}
      </header>
      <div className="card overflow-x-auto">
        <table className="onco">
          <thead><tr><th>Node</th><th>Target</th><th>Products hitting the node</th><th className="hidden lg:table-cell">Best phase</th></tr></thead>
          <tbody>
            {s.nodes.map((n) => {
              const gap = n.targeted && n.products.length === 0;
              return (
                <tr key={n.id} className={gap ? "bg-rose-500/[0.04]" : undefined}>
                  <td className="font-medium whitespace-nowrap">{n.href ? <Link href={n.href} className="hover:underline">{n.label}</Link> : n.label}</td>
                  <td className="whitespace-nowrap">{n.href ? <Link href={n.href} className="hover:underline">{n.targetName}</Link> : <Link href="/targets/" className="chip bg-foreground/5 text-xs hover:ring-2 hover:ring-accent/30" title="No target record yet; browse all targets">no target in corpus</Link>}</td>
                  <td className="min-w-[260px]">
                    {gap ? <Link href={n.href ?? "/gaps/"} className="chip border border-dashed border-rose-400 text-rose-700 dark:text-rose-300 text-xs hover:ring-2 hover:ring-accent/30" title="Open the target page; no treatment in the corpus names it yet">Druggable node, no drug in corpus</Link>
                      : n.products.length ? <div className="flex flex-wrap gap-1.5">{n.products.map((x) => <Tip key={x.id} title={x.name} text={`${x.modality} · ${STATUS_LABEL[x.status ?? ""] ?? x.status ?? "status unknown"}`} href={x.route}><Link href={x.route} className={`chip ${statusClass(x.status)}`}>{x.name}</Link></Tip>)}</div>
                      : <span className="text-muted/50">-</span>}
                  </td>
                  <td className="hidden lg:table-cell text-xs">{n.best && n.bestHref ? <Link href={n.bestHref} className={`chip ${statusClass(n.best)} hover:ring-2 hover:ring-accent/30`} title={`Treatments for this target at ${STATUS_LABEL[n.best]}`}>{STATUS_LABEL[n.best]}</Link> : gap ? <span className="text-muted">none</span> : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {s.interventions.length > 0 && <p className="text-xs text-muted mt-2">How drugs attack it, from the pathway page: {s.interventions.join("; ")}.</p>}
    </section>
  );
}

/**
 * The per-pathway node tables. `sections` are the first page (the page's HTML carries them); with `more`, the rest
 * is one static file fetched when the reader scrolls past the last section, presses "Show more", or arrives at a
 * `#pathway-id` anchor that the first page does not hold (the matrix table above links into the sections).
 */
export function PathwaySections({ sections: first, more }: { sections: PathwaySection[]; more?: MoreRows }) {
  const [full, setFull] = useState<PathwaySection[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [shown, setShown] = useState(first.length);
  /** A `#pathway-id` anchor to scroll to once the fetched sections have rendered. */
  const pending = useRef<string | null>(null);
  const src = more?.src;
  const loading = !!src && wanted && !full && !failed;
  useEffect(() => {
    if (!loading || !src) return;
    let stale = false;
    void loadTableFile<PathwaySection>(src).then((list) => { if (stale) return; if (list) setFull(list); else setFailed(true); });
    return () => { stale = true; };
  }, [loading, src]);
  // A hash the first page does not hold: fetch every section, show them all, then scroll to it once rendered.
  useEffect(() => {
    if (!more) return;
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || first.some((s) => s.id === id)) return;
      pending.current = id;
      setWanted(true); setShown(more.total);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [more, first]);
  useEffect(() => {
    if (!pending.current || !full) return;
    document.getElementById(pending.current)?.scrollIntoView({ block: "start" });
    pending.current = null;
  }, [full, shown]);
  const all = full ?? first;
  const visible = all.slice(0, shown);
  const total = more?.total ?? first.length;
  const remaining = total - visible.length;
  const load = () => { setWanted(true); setShown((n) => n + SECTION_PAGE); };
  return (
    <div className="space-y-10">
      {visible.map((s) => <Section key={s.id} s={s} />)}
      {remaining > 0 && !failed && (
        <div className="card"><MoreFoot total={total} shown={visible.length} step={SECTION_PAGE} load={load} loading={loading} /></div>
      )}
      {failed && <p className="text-xs text-muted">Only the first {first.length} of {total} pathways could be shown: the full list did not load. Check your connection and reload.</p>}
    </div>
  );
}
