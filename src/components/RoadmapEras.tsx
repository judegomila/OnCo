"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { kindTone, refChipClass } from "@/lib/text";
import { nameAttrs } from "@/lib/translate";
import { WATCH_PAGE, type EraBody, type EraCounts, type EraRef, type RoadmapEraFile, type WatchRow } from "@/lib/roadmap-eras";
import { DrugChip } from "./DrugChip";
import { IntentLink } from "./IntentLink";
import { TrialExplainer } from "./TrialExplainer";
import { MoreFoot } from "./filters/ResultsTable";

/**
 * Client side of a roadmap page's timeline (src/lib/roadmap-eras.ts has the shape and the server side). The page's
 * HTML carries every era's heading, date range, status and summary, and the bodies of the eras open by default (the
 * first and the current one) as this component's props; every other era shows a "Show era" pill that fetches the
 * roadmap's file, /api/v1/roadmaps/<id>.json, once for the whole page and renders the era's records as pills, the
 * structured outcomes of its trials in plain words, and its papers with what they mean. The watch table's rows
 * beyond the first WATCH_PAGE come from the same file behind a "Show more" pill.
 */

/** One request per roadmap file per page, shared by every era, the story and the watch foot; null when it cannot be fetched. */
const files = new Map<string, Promise<RoadmapEraFile | null>>();
export function loadRoadmapFile(src: string): Promise<RoadmapEraFile | null> {
  let p = files.get(src);
  if (!p) {
    p = fetch(src).then(async (r) => (r.ok ? ((await r.json()) as RoadmapEraFile) : null)).catch(() => null);
    files.set(src, p);
  }
  return p;
}
/** Test seam: forget the fetched files. */
export function resetRoadmapFiles() { files.clear(); }

/** Linked records as pills, coloured by kind, as ChipList renders them (products with the molecule hover). */
export function RefPills({ refs }: { refs: EraRef[] }) {
  if (!refs.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {refs.map((r) => r.kind === "drug"
        ? <DrugChip key={r.id} id={r.id} name={r.name} route={r.route} tldr={r.tldr} className={kindTone(r.kind)} />
        : <IntentLink key={r.id} href={r.route} title={r.tldr} {...nameAttrs(r.kind, refChipClass(r.kind))}>{r.name}</IntentLink>)}
    </div>
  );
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
/** "12 records, 3 trial outcomes, 4 papers": the pill's title; the pill itself shows the record count so it fits a 390 px viewport. */
export function eraCountLabel(c: EraCounts): string {
  const parts = [plural(c.refs, "record")];
  if (c.trials) parts.push(plural(c.trials, "trial outcome"));
  if (c.papers) parts.push(plural(c.papers, "paper"));
  return parts.join(", ");
}

/** The body of one era: pills, then the trials' outcomes in plain words, then the papers. */
export function EraBodyView({ body }: { body: EraBody }) {
  return (
    <div className="mt-2 space-y-3" data-era-body>
      <RefPills refs={body.refs} />
      {body.trials.length > 0 && (
        <div className="space-y-2">
          <div className="kicker">Trial outcomes</div>
          {body.trials.map((t) => (
            <div key={t.id} className="card p-3 text-sm">
              <div className="font-medium"><Link href={t.route} className="hover:underline">{t.name}</Link></div>
              <TrialExplainer trial={t} compact />
              <p className="text-xs text-muted mt-1"><Link href={`${t.route}#outcomes`} className="underline">Pictograms, table and sources on the trial page</Link></p>
            </div>
          ))}
        </div>
      )}
      {body.papers.length > 0 && (
        <div>
          <div className="kicker mb-1">Papers</div>
          <ul className="space-y-1.5 text-sm">
            {body.papers.map((p) => (
              <li key={p.id}>
                <Link href={p.route} className="font-medium hover:underline">{p.name}</Link> <span className="text-muted">{p.journal}, {p.year}</span>
                <p className="text-muted mt-0.5">{p.whatItMeans}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const Glyph = ({ open }: { open: boolean }) => (
  <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}</svg>
);

/**
 * The toggle and body of one era. `initial` is the body of an era open by default (in the HTML); every other era
 * fetches the roadmap's file the first time it is opened.
 */
export function RoadmapEra({ src, index, counts, initial }: { src: string; index: number; counts: EraCounts; initial?: EraBody }) {
  const [open, setOpen] = useState(!!initial);
  /** undefined: not fetched yet; null: the file could not be fetched. */
  const [body, setBody] = useState<EraBody | null | undefined>(initial);
  const [loading, setLoading] = useState(false);
  const busy = useRef(false);

  const load = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    const f = await loadRoadmapFile(src);
    busy.current = false;
    setLoading(false);
    setBody(f ? (f.eras[index] ?? null) : null);
  }, [src, index]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && body === undefined) void load();
  };

  if (!counts.refs) return null;
  return (
    <div className="mt-2">
      <button type="button" onClick={toggle} disabled={loading} aria-busy={loading || undefined} aria-expanded={open} data-era-toggle={open ? "open" : "closed"} title={eraCountLabel(counts)}
        className="chip border border-border bg-card hover:bg-accent-soft hover:text-accent hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 inline-flex items-center gap-1 disabled:opacity-60">
        <Glyph open={open} />
        {open ? "Hide era" : "Show era"}
        <span className="text-muted font-normal">· {plural(counts.refs, "record")}</span>
      </button>
      {open && body === undefined && <p className="text-sm text-muted mt-2" aria-live="polite">Loading the era…</p>}
      {open && body === null && <p className="text-sm text-muted mt-2">The era&apos;s records could not be loaded; they are in the roadmap&apos;s <a href={src} className="underline">JSON</a>. Reload to try again.</p>}
      {open && body && <EraBodyView body={body} />}
    </div>
  );
}

/** One row of the watch table; the server renders the first WATCH_PAGE, RoadmapWatchMore the rest. */
export function WatchRowView({ row }: { row: WatchRow }) {
  return (
    <li className="p-3 grid grid-cols-1 sm:grid-cols-[9rem_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm" data-watch-row>
      <span className="font-mono text-xs text-muted tabular-nums pt-0.5">{row.expected ?? "no date stated"}</span>
      <div className="min-w-0 break-words">
        <span>{row.item}</span>
        {row.source && <> <a href={row.source} rel="noopener" className="underline decoration-foreground/25 underline-offset-[3px] hover:decoration-foreground text-xs">source</a></>}
        {row.refs.length > 0 && <div className="mt-1.5"><RefPills refs={row.refs} /></div>}
      </div>
    </li>
  );
}

/** The rows of the watch table beyond the first page, WATCH_PAGE at a time from the roadmap's file, under a "Show more" foot. */
export function RoadmapWatchMore({ src, total, first }: { src: string; total: number; first: number }) {
  const [file, setFile] = useState<RoadmapEraFile | null | undefined>(undefined);
  const [shown, setShown] = useState(first);
  const [loading, setLoading] = useState(false);
  const busy = useRef(false);
  const more = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    const f = await loadRoadmapFile(src);
    busy.current = false;
    setLoading(false);
    setFile(f);
    if (f) setShown((n) => n + WATCH_PAGE);
  }, [src]);
  const rows = file ? file.watch.slice(first, shown) : [];
  const known = file ? file.watch.length : total;
  return (<>
    {rows.map((row, i) => <WatchRowView key={first + i} row={row} />)}
    {file !== null && first + rows.length < known && <li className="list-none"><MoreFoot total={known} shown={first + rows.length} step={WATCH_PAGE} load={() => void more()} loading={loading} /></li>}
    {file === null && <li className="p-3 text-xs text-muted">Only the first {first} of {total} items could be shown: the rest did not load. They are in the roadmap&apos;s <a href={src} className="underline">JSON</a>; reload to try again.</li>}
  </>);
}

/** The story tab's cards for one era, loaded from the roadmap's file when the story scrolls into view. */
export function useRoadmapFile(src: string, root: HTMLElement | null): RoadmapEraFile | null | undefined {
  const [file, setFile] = useState<RoadmapEraFile | null | undefined>(undefined);
  useEffect(() => {
    if (!root) return;
    let live = true;
    const go = () => { void loadRoadmapFile(src).then((f) => { if (live) setFile(f); }); };
    if (typeof IntersectionObserver === "undefined") { go(); return () => { live = false; }; }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { go(); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(root);
    return () => { live = false; io.disconnect(); };
  }, [src, root]);
  return file;
}
