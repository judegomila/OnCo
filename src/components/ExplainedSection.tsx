"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { explainedFile, type ExplainedFile } from "@/lib/explained-data";
import { phaseLabel } from "@/lib/kinds";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { TrialExplainer } from "./TrialExplainer";

/** One trial's row as the page carries it: heading, status, phase, year, one-line summary, registry id. */
export type ExplainedRow = { id: string; name: string; status?: string; phase: string; year?: number; tldr: string; nct?: string };

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

const route = (id: string) => `/trials/${id}/`;

/**
 * One cancer section of /explained/: a collapsed <details> per trial with its heading, status, one-line summary and
 * page link in the HTML (rendered on the server too, so crawlers see every trial), and the plain-words explainer
 * fetched on demand from the section's file (/api/v1/explained/<id>.json). The file is prefetched when the section
 * comes within 300 px of the viewport; a row's explainer renders when it is opened. Fragment links (#trial-id) open
 * their row, on load and when followed from another section's cross-reference pills.
 *
 * Rows are props rather than server-rendered children: a client component's props are serialised once as compact
 * JSON, where a server-rendered tree is serialised element by element, which is what made the page 14 MB.
 */
/** A trial studied in this cancer whose full row sits in an earlier section (`under` names it); the pill opens that row. */
export type ExplainedRef = { id: string; name: string; under: string };

export function ExplainedSection({ section, rows, refs = [] }: { section: string; rows: ExplainedRow[]; refs?: ExplainedRef[] }) {
  /** undefined: not fetched yet; null: the file could not be fetched. */
  const [file, setFile] = useState<ExplainedFile | null | undefined>(undefined);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let live = true;
    const load = () => { void loadSection(section).then((f) => { if (live) setFile(f); }); };
    const openHash = () => {
      const id = window.location.hash.slice(1);
      if (id && rows.some((r) => r.id === id)) { setOpen((o) => (o[id] ? o : { ...o, [id]: true })); load(); }
    };
    // Deferred a frame so nothing is set synchronously in the effect.
    const raf = requestAnimationFrame(openHash);
    window.addEventListener("hashchange", openHash);
    let io: IntersectionObserver | undefined;
    if (root && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { load(); io?.disconnect(); } }, { rootMargin: "300px 0px" });
      io.observe(root);
    }
    return () => { live = false; cancelAnimationFrame(raf); window.removeEventListener("hashchange", openHash); io?.disconnect(); };
  }, [section, rows, root]);

  const toggle = (id: string, isOpen: boolean) => {
    setOpen((o) => (!!o[id] === isOpen ? o : { ...o, [id]: isOpen }));
    if (isOpen) void loadSection(section).then((f) => setFile((cur) => cur === undefined ? f : cur));
  };

  return (
    <div ref={setRoot} className="space-y-3">
      {refs.length > 0 && (
        <div className="text-sm pb-1">
          <span className="text-muted">Also studied in this cancer, explained above:</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {refs.map((x) => <a key={x.id} href={`#${x.id}`} title={`Explained under ${x.under}`} className="chip border border-border bg-card hover:bg-accent-soft hover:text-accent">{x.name}</a>)}
          </div>
        </div>
      )}
      {rows.map((r) => {
        const isOpen = !!open[r.id];
        const trial = file?.trials[r.id];
        return (
          <details key={r.id} id={r.id} open={isOpen} onToggle={(e) => toggle(r.id, e.currentTarget.open)} className="card explained-row">
            <summary className="explained-summary">
              <h3>{r.name}</h3>
              {r.status && <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span>}
              <span className="meta">{phaseLabel(r.phase)}{r.year ? ` · reported ${r.year}` : ""}</span>
              {/* Glyph and the open-state "Close" label come from CSS (.explained-pill in globals.css): 700-plus rows share one page, so every byte of row markup is paid hundreds of times. */}
              <span className="chip explained-pill">Open explanation</span>
              <p className="explained-tldr">{r.tldr}</p>
            </summary>
            <div className="explained-links">
              <Link href={route(r.id)}>Trial page</Link>{r.nct ? <> · <a href={`https://clinicaltrials.gov/study/${r.nct}`}>{r.nct}</a></> : null}
              {isOpen && (
                <div className="mt-3 text-base text-foreground">
                  {file === undefined && <p className="text-sm text-muted py-3" aria-live="polite">Loading the explanation…</p>}
                  {file !== undefined && !trial && <p className="text-sm text-muted py-3">The explanation could not be loaded; the <Link href={`${route(r.id)}#outcomes`} className="underline">trial page</Link> has the results in plain words and as pictograms.</p>}
                  {trial && <TrialExplainer trial={trial} />}
                  {trial && <p className="text-xs text-muted mt-2"><Link href={`${route(r.id)}#outcomes`} className="underline">Pictograms, table and sources on the trial page</Link></p>}
                </div>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
