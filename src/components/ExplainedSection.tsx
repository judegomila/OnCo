"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EXPLAINED_PAGE, explainedFile, type ExplainedFile, type ExplainedRef, type ExplainedRow } from "@/lib/explained-data";
import { phaseLabel } from "@/lib/kinds";
import { STATUS_LABEL, statusTone } from "@/lib/text";
import { MoreFoot } from "./filters/ResultsTable";
import { TrialExplainer } from "./TrialExplainer";

export type { ExplainedRef, ExplainedRow } from "@/lib/explained-data";

/** One request per cancer section per page, shared by every trial in it; null when the file cannot be fetched. */
const files = new Map<string, Promise<ExplainedFile | null>>();
function loadSection(key: string): Promise<ExplainedFile | null> {
  let p = files.get(key);
  if (!p) {
    p = fetch(explainedFile(key)).then(async (r) => (r.ok ? ((await r.json()) as ExplainedFile) : null)).catch(() => null);
    files.set(key, p);
  }
  return p;
}

/** Sent by a cross-reference pill; the section named reveals the trial's row (fetching its file if the row is beyond the first page) and opens it. */
const REVEAL = "onco:explained-reveal";
type Reveal = { section: string; id: string };

const route = (id: string) => `/trials/${id}/`;

/**
 * One cancer section of /explained/. The page's HTML carries the first EXPLAINED_PAGE rows (a collapsed <details>
 * per trial with its heading linked to the trial page, status, phase and one-line summary, rendered on the server
 * too, so crawlers see them) and the first EXPLAINED_PAGE cross-reference pills; `total` and `refTotal` say how
 * many the section has. The rest of the rows and pills, and every trial's plain-words explainer, are the section's
 * file (/api/v1/explained/<id>.json), fetched once when the reader scrolls within 600 px of the section's foot,
 * presses "Show more", opens a row, or follows a fragment link (#trial-id) or pill to a row beyond the first page.
 * The page lists the rows beyond the first page in a noscript block, so nothing depends on this component running.
 *
 * Rows are props rather than server-rendered children: a client component's props are serialised once as compact
 * JSON, where a server-rendered tree is serialised element by element, which is what made the page 14 MB. The row
 * markup is bare (one class on the <details>, the rest is CSS in globals.css) because it is paid 600 times over.
 */
export function ExplainedSection({ section, rows, total = rows.length, refs = [], refTotal = refs.length }: {
  section: string; rows: ExplainedRow[]; total?: number; refs?: ExplainedRef[]; refTotal?: number;
}) {
  /** undefined: not fetched yet; null: the file could not be fetched. */
  const [file, setFile] = useState<ExplainedFile | null | undefined>(undefined);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  /** Rows the reader has asked for; the rest of the fetched file waits behind the Show more pill. */
  const [shown, setShown] = useState(rows.length);
  const [allRefs, setAllRefs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const foot = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  /** A row to scroll to once it has rendered. */
  const pending = useRef<string | null>(null);

  const load = useCallback(() => loadSection(section).then((f) => { setFile(f); return f; }), [section]);

  /** Fetch the file the first time, then show EXPLAINED_PAGE more rows of it. */
  const more = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    const f = await load();
    busy.current = false;
    setLoading(false);
    if (f) setShown((n) => n + EXPLAINED_PAGE);
  }, [load]);

  /** Show the row for `id` (fetching the file if it is beyond the first page), open it and scroll to it. */
  const reveal = useCallback(async (id: string) => {
    const f = await load();
    const i = (f?.rows ?? rows).findIndex((r) => r.id === id);
    if (i < 0) return;
    pending.current = id;
    setShown((n) => Math.max(n, i + 1));
    setOpen((o) => (o[id] ? o : { ...o, [id]: true }));
  }, [load, rows]);

  useEffect(() => {
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      if (rows.some((r) => r.id === id)) { void reveal(id); return; }
      // A row beyond the first page: only sections with hidden rows look, and only when no element on the page has the id.
      if (total > rows.length && !document.getElementById(id)) void reveal(id);
    };
    const onReveal = (e: Event) => { const d = (e as CustomEvent<Reveal>).detail; if (d.section === section) void reveal(d.id); };
    // Deferred a frame so nothing is set synchronously in the effect.
    const raf = requestAnimationFrame(onHash);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(REVEAL, onReveal);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("hashchange", onHash); window.removeEventListener(REVEAL, onReveal); };
  }, [section, rows, total, reveal]);

  // The explainers are prefetched when the section comes within 300 px of the viewport, so opening a row is instant.
  useEffect(() => {
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { void load(); io.disconnect(); } }, { rootMargin: "300px 0px" });
    io.observe(root);
    return () => io.disconnect();
  }, [root, load]);

  useEffect(() => {
    const id = pending.current;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    pending.current = null;
    el.scrollIntoView({ block: "start" });
    if (window.location.hash.slice(1) !== id) window.history.replaceState(null, "", `#${id}`);
  }, [shown, open]);

  const all = file?.rows ?? rows;
  const visible = all.slice(0, shown);
  const known = file ? file.rows.length : total;
  const hasMore = file !== null && visible.length < known;
  const shownRefs = allRefs && file ? file.refs : refs;
  const knownRefs = file ? file.refs.length : refTotal;

  useEffect(() => {
    if (!hasMore || !foot.current || typeof IntersectionObserver === "undefined") return;
    const el = foot.current;
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) void more(); }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, visible.length, more]);

  const toggle = (id: string, isOpen: boolean) => {
    setOpen((o) => (!!o[id] === isOpen ? o : { ...o, [id]: isOpen }));
    if (isOpen) void load();
  };
  const jump = (x: ExplainedRef) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent<Reveal>(REVEAL, { detail: { section: x.in, id: x.id } }));
  };
  const moreRefs = async () => { if (await load()) setAllRefs(true); };

  return (
    <div ref={setRoot} className="space-y-3">
      {refs.length > 0 && (
        <div className="explained-refs">
          <small>Also studied in this cancer, explained above:</small>
          {shownRefs.map((x) => <a key={x.id} href={`#${x.id}`} className="chip explained-ref" onClick={jump(x)}>{x.name}</a>)}
          {file !== null && shownRefs.length < knownRefs && (
            <button type="button" onClick={moreRefs} className="chip explained-ref hover:border-accent">
              <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              {`Show ${knownRefs - shownRefs.length} more`}
            </button>
          )}
        </div>
      )}
      {visible.map((r) => {
        const isOpen = !!open[r.id];
        const trial = file?.trials[r.id];
        return (
          <details key={r.id} id={r.id} open={isOpen} onToggle={(e) => toggle(r.id, e.currentTarget.open)} className="explained-row">
            <summary>
              {/* The heading is the trial's page link; a link inside a summary follows the link without toggling the row. */}
              <h3><Link href={route(r.id)}>{r.name}</Link></h3>
              {r.status && <span className={`chip tone-${statusTone(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span>}
              <small>{phaseLabel(r.phase)}{r.year ? ` · reported ${r.year}` : ""}</small>
              <p>{r.tldr}</p>
            </summary>
            {isOpen && (
              <div className="explained-body">
                <p><Link href={route(r.id)}>Trial page</Link>{r.nct ? <> · <a href={`https://clinicaltrials.gov/study/${r.nct}`}>{r.nct}</a></> : null}</p>
                <div className="mt-3 text-base text-foreground">
                  {file === undefined && <p className="text-sm text-muted py-3" aria-live="polite">Loading the explanation…</p>}
                  {file !== undefined && !trial && <p className="text-sm text-muted py-3">The explanation could not be loaded; the <Link href={`${route(r.id)}#outcomes`} className="underline">trial page</Link> has the results in plain words and as pictograms.</p>}
                  {trial && <TrialExplainer trial={trial} />}
                  {trial && <p className="text-xs text-muted mt-2"><Link href={`${route(r.id)}#outcomes`} className="underline">Pictograms, table and sources on the trial page</Link></p>}
                </div>
              </div>
            )}
          </details>
        );
      })}
      {hasMore && <div className="card"><MoreFoot ref={foot} total={known} shown={visible.length} step={EXPLAINED_PAGE} load={() => void more()} loading={loading} /></div>}
      {file === null && visible.length < total && (
        <p className="text-xs text-muted">Only the first {visible.length} of {total} trials could be shown: the rest did not load. Every trial is on the <Link href="/trials/" className="underline">trials list</Link>; reload to try again.</p>
      )}
    </div>
  );
}
