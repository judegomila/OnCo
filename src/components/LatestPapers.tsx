"use client";

import { useEffect, useRef, useState } from "react";
import { firstAuthor, paperLink, restUrl, searchPageUrl, type PaperLite } from "@/lib/europepmc";

const TTL = 6 * 60 * 60 * 1000;

function cacheGet(key: string): PaperLite[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw) as { t: number; v: PaperLite[] };
    return Date.now() - t < TTL ? v : null;
  } catch { return null; }
}
function cacheSet(key: string, v: PaperLite[]) {
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch { /* quota */ }
}

/**
 * Latest papers for an entity, live from Europe PMC (CORS-open, no key).
 * Loads once when the section scrolls into view or on button click; cached in sessionStorage for 6 h.
 */
export function LatestPapers({ query, title, kind, pageSize = 10, autoload = true }: { query: string; title: string; kind: string; pageSize?: number; autoload?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [papers, setPapers] = useState<PaperLite[]>([]);
  const [hits, setHits] = useState<number | null>(null);
  const [preprints, setPreprints] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const started = useRef<string | null>(null);

  const load = async (pp: boolean) => {
    const key = `epmc:${pp ? "ppr:" : ""}${query}`;
    if (started.current === key) return;
    started.current = key;
    const cached = cacheGet(key);
    if (cached) { setPapers(cached); setState("done"); return; }
    setState("loading");
    try {
      const r = await fetch(restUrl(query, { pageSize, preprints: pp }));
      if (!r.ok) throw new Error(String(r.status));
      const j = (await r.json()) as { hitCount?: number; resultList?: { result?: PaperLite[] } };
      const list = j.resultList?.result ?? [];
      setHits(typeof j.hitCount === "number" ? j.hitCount : null);
      setPapers(list); cacheSet(key, list); setState("done");
    } catch { setState("error"); }
  };

  useEffect(() => {
    if (!autoload || !box.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { void load(preprints); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(box.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const toggle = (pp: boolean) => { setPreprints(pp); started.current = null; void load(pp); };

  return (
    <div ref={box} className="card p-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div>
          <div className="kicker">Latest papers · live from Europe PMC</div>
          {hits !== null && <div className="text-xs text-muted mt-0.5">{hits.toLocaleString()} matching records{preprints ? " (preprints)" : ""}</div>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border overflow-hidden text-xs">
            <button type="button" onClick={() => toggle(false)} className={`px-2 py-1 ${!preprints ? "bg-foreground text-background" : "bg-card"}`}>Published</button>
            <button type="button" onClick={() => toggle(true)} className={`px-2 py-1 ${preprints ? "bg-foreground text-background" : "bg-card"}`}>Preprints</button>
          </div>
          {state === "idle" && <button type="button" onClick={() => load(preprints)} className="rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-foreground/5">Load latest papers</button>}
          <a className="text-xs underline text-muted" href={searchPageUrl(preprints ? `(${query}) AND SRC:PPR` : query)} rel="noopener">Open in Europe PMC</a>
        </div>
      </div>
      {state === "loading" && <p className="text-muted">Loading…</p>}
      {state === "error" && <p className="text-muted">Europe PMC did not respond. <a className="underline" href={searchPageUrl(query)} rel="noopener">Search there directly</a>.</p>}
      {state === "done" && papers.length === 0 && <p className="text-muted">No {preprints ? "preprints" : "papers"} matched this query yet.</p>}
      {state === "done" && papers.length > 0 && (
        <ol className="divide-y divide-border">
          {papers.map((p) => (
            <li key={`${p.source}-${p.id}`} className="py-2">
              <a href={paperLink(p)} rel="noopener" className="font-medium hover:underline leading-snug block">{p.title}</a>
              <div className="text-xs text-muted mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5">
                {p.firstPublicationDate && <span>{p.firstPublicationDate}</span>}
                {p.journalTitle && <span>· {p.journalTitle}</span>}
                {p.authorString && <span>· {firstAuthor(p.authorString)}</span>}
                {typeof p.citedByCount === "number" && p.citedByCount > 0 && <span>· cited {p.citedByCount}</span>}
                {p.source === "PPR" && <span className="chip bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200">preprint</span>}
                {p.isOpenAccess === "Y" && <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">open access</span>}
              </div>
            </li>
          ))}
        </ol>
      )}
      <p className="text-[11px] text-muted mt-2">Query for this {kind}: <code className="break-all">{query}</code>. Results are unfiltered search hits about {title}, not a curated reading list.</p>
    </div>
  );
}
