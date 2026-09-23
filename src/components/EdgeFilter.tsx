"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { EDGE_FOR_ME, EDGE_KINDS, EDGE_KIND_META, countEdgeKinds, edgeGroupKey, edgeGroupLabel, edgeMatches, edgeQuery, edgeTypeSlug, filterEdge, parseEdgeQuery, type EdgeFeedJsonItem, type EdgeFilterState, type EdgeKind } from "@/lib/edge-kinds";
import { useMyCancer } from "@/lib/use-my-cancer";
import { useMyCancerList } from "@/lib/use-my-cancer-list";
import { EdgeCard, type EdgeCardItem } from "./EdgeCard";
import { EdgeGlyph } from "./EdgeGlyph";

export const EDGE_FEED_JSON = "/edge/feed.json";
export const FOR_ME_FIRST = "Choose your cancer in For me first";

/** A card on the page or in the feed, with what the filter needs; feed rows carry the card to render. */
type Row = { kind: EdgeKind; refIds: string[]; item?: EdgeCardItem };

/** A page card's kind and record ids, from the attributes EdgeCard writes. */
const rowOf = (el: HTMLElement): Row => ({ kind: el.dataset.kind as EdgeKind, refIds: (el.dataset.refs ?? "").split(" ").filter(Boolean) });

/** The route of a record from the absolute URL the feed gives. */
const routeOf = (u: string) => { try { return new URL(u).pathname; } catch { return u; } };

/** /edge/feed.json items as cards. */
export function feedItemsToCards(items: EdgeFeedJsonItem[]): EdgeCardItem[] {
  return items.filter((it) => it._onco && (EDGE_KINDS as readonly string[]).includes(it._onco.kind)).map((it) => ({
    kind: it._onco.kind, date: it._onco.date, precision: it._onco.precision, title: it.title, sentence: it.content_text, url: it.url, venue: it._onco.venue,
    refs: (it._onco.records ?? []).map((r) => ({ id: r.id, kind: r.kind, name: r.name, route: routeOf(r.url) })),
  }));
}

/** Cards grouped by day (or month or year), newest group first, feed order kept within a group. */
export function groupCards(items: EdgeCardItem[]): Array<{ key: string; label: string; items: EdgeCardItem[] }> {
  const groups = new Map<string, EdgeCardItem[]>();
  for (const it of items) { const k = edgeGroupKey(it); if (!groups.has(k)) groups.set(k, []); groups.get(k)!.push(it); }
  return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([key, xs]) => ({ key, label: edgeGroupLabel(key), items: xs }));
}

/** One request per cancer per page: the record set behind "For you", from the For me related file. */
const relatedCache = new Map<string, Promise<string[] | null>>();
function loadEdgeIds(id: string): Promise<string[] | null> {
  let p = relatedCache.get(id);
  if (!p) {
    p = fetch(`/api/v1/for-me/${encodeURIComponent(id)}.related.json`).then(async (r) => (r.ok ? ((await r.json()) as { edgeIds?: string[] }).edgeIds ?? null : null)).catch(() => null);
    relatedCache.set(id, p);
  }
  return p;
}

/**
 * The client side of /edge/: the type pills and the "For you" pill over the server-rendered feed. Types are a
 * multi-select union, "For you" narrows to items linked to the reader's cancer (the id set comes from
 * /api/v1/for-me/<id>.related.json; the cancer itself is read from the browser profile and never sent anywhere),
 * and the two intersect. State lives in the URL (`?type=approvals,results`, `?for=me` or `?for=<cancer id>`) so
 * a view can be linked; a cancer page's Edge link opens `?for=<id>` and shows the cancer as a removable chip.
 *
 * The page carries the 200 best-ranked items; the feeds hold 500. The first filter fetches /edge/feed.json once
 * and, from then on, filtered views render from the full feed (newest-first order kept) while the page's own cards
 * are hidden; until it arrives the page's cards are shown or hidden in place by their data attributes.
 */
export function EdgeFilter({ counts, pageTotal, feedTotal, children }: { counts: Record<EdgeKind, number>; pageTotal: number; feedTotal: number; children: ReactNode }) {
  const [state, setState] = useState<EdgeFilterState>({ types: [] });
  const [pageRows, setPageRows] = useState<Row[]>([]);
  const [feed, setFeed] = useState<EdgeCardItem[] | null>(null);
  const [feedState, setFeedState] = useState<"idle" | "loading" | "failed">("idle");
  const [idsByCancer, setIdsByCancer] = useState<Record<string, string[] | null>>({});
  const my = useMyCancer();
  const feedRef = useRef<HTMLDivElement>(null);
  const feedAsked = useRef(false);

  /** Fetch the full feed once, on the first filter, when the page carries fewer items than the feed. */
  const ensureFeed = useCallback(() => {
    if (feedAsked.current || pageTotal >= feedTotal) return;
    feedAsked.current = true;
    setFeedState("loading");
    fetch(EDGE_FEED_JSON).then(async (r) => (r.ok ? ((await r.json()) as { items?: EdgeFeedJsonItem[] }).items ?? null : null)).catch(() => null)
      .then((items) => { if (items) { setFeed(feedItemsToCards(items)); setFeedState("idle"); } else setFeedState("failed"); });
  }, [pageTotal, feedTotal]);

  const forMe = state.for === EDGE_FOR_ME;
  const forId = forMe ? my.id : state.for;
  const cancers = useMyCancerList(!!forId || !!my.id);
  const forName = forId ? cancers.find((c) => c.id === forId)?.name ?? forId : undefined;
  const myName = my.id ? cancers.find((c) => c.id === my.id)?.name : undefined;
  const active = state.types.length > 0 || !!forId;

  // Read the URL once on mount (the server renders the unfiltered page) and again when the reader goes back.
  useEffect(() => {
    const fromUrl = () => setState(parseEdgeQuery(window.location.search));
    fromUrl();
    window.addEventListener("popstate", fromUrl);
    return () => window.removeEventListener("popstate", fromUrl);
  }, []);

  // The page's own cards, read from their data attributes once for the counts.
  useEffect(() => {
    const root = feedRef.current; if (!root) return;
    const read = () => setPageRows([...root.querySelectorAll<HTMLElement>("[data-kind]")].map(rowOf));
    read();
  }, []);

  // Kind pills on the cards and the week strip apply the filter in place instead of reloading the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLElement>("a[data-edge-type]");
      const k = a?.dataset.edgeType;
      if (!k || !(EDGE_KINDS as readonly string[]).includes(k)) return;
      e.preventDefault();
      setState((s) => ({ ...s, types: [k as EdgeKind] }));
      document.getElementById("feed-h")?.scrollIntoView({ block: "start", behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // The full feed, fetched on the first filter (from the URL on arrival, or a pill).
  useEffect(() => { if (active) ensureFeed(); }, [active, ensureFeed]);

  // The record set of the chosen cancer.
  useEffect(() => {
    if (!forId || forId in idsByCancer) return;
    let live = true;
    void loadEdgeIds(forId).then((ids) => { if (live) setIdsByCancer((m) => (forId in m ? m : { ...m, [forId]: ids })); });
    return () => { live = false; };
  }, [forId, idsByCancer]);

  const idsLoaded = forId ? forId in idsByCancer : true;
  const ids = useMemo(() => (forId && idsByCancer[forId] ? new Set(idsByCancer[forId]!) : undefined), [forId, idsByCancer]);
  const useFeed = active && !!feed;
  const rows: Row[] = useMemo(() => (useFeed ? feed!.map((item) => ({ kind: item.kind, refIds: item.refs.map((r) => r.id), item })) : pageRows), [useFeed, feed, pageRows]);
  const matching = useMemo(() => filterEdge(rows, state.types, ids), [rows, state.types, ids]);
  const kindCounts = useMemo(() => (rows.length ? countEdgeKinds(filterEdge(rows, [], ids)) : counts), [rows, ids, counts]);
  const total = rows.length || pageTotal;
  const shown = rows.length ? matching.length : pageTotal;
  const groups = useMemo(() => (useFeed ? groupCards(matching.map((r) => r.item!)) : []), [useFeed, matching]);

  // Page cards: shown or hidden in place, with their day headings; hidden wholesale once the feed renders the view.
  useEffect(() => {
    const root = feedRef.current; if (!root) return;
    root.hidden = useFeed;
    if (useFeed) return;
    const types = state.types;
    root.querySelectorAll<HTMLElement>("[data-kind]").forEach((el) => { el.style.display = edgeMatches(rowOf(el), types, ids) ? "" : "none"; });
    root.querySelectorAll<HTMLElement>("[data-day]").forEach((sec) => { sec.style.display = [...sec.querySelectorAll<HTMLElement>("[data-kind]")].some((el) => el.style.display !== "none") ? "" : "none"; });
  }, [useFeed, state.types, ids]);

  // The URL follows the state; other keys and the hash are left alone.
  useEffect(() => {
    const next = `${window.location.pathname}${edgeQuery(state, window.location.search)}${window.location.hash}`;
    if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) window.history.replaceState(window.history.state, "", next);
  }, [state]);

  const toggle = useCallback((k: EdgeKind) => setState((s) => ({ ...s, types: s.types.includes(k) ? s.types.filter((x) => x !== k) : EDGE_KINDS.filter((x) => x === k || s.types.includes(x)) })), []);
  const clear = () => setState({ types: [] });
  const pill = (on: boolean, extra = "") => `chip border text-xs px-2.5 py-1 ${on ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"} ${extra}`;
  const singleType = state.types.length === 1 ? state.types[0] : undefined;

  return (
    <div className="space-y-3">
      <div role="group" aria-label="Show only" className="flex flex-wrap items-center gap-1.5">
        {my.id
          ? <button type="button" onClick={() => setState((s) => ({ ...s, for: forMe ? undefined : EDGE_FOR_ME }))} aria-pressed={forMe} className={pill(forMe, "border-accent/40")} title={`Only items linked to ${myName ?? "your cancer"}: the cancer, its family, the medicines approved or in phase 3 for it, its roadmaps and technologies. Your choice stays in this browser.`}>
              <HeartGlyph className="h-3.5 w-3.5" /><span>For you</span>{myName && <span className={`font-normal ${forMe ? "opacity-80" : "text-muted"}`}>{myName}</span>}
            </button>
          : <Link href="/for-me/" aria-disabled className="chip border border-dashed text-xs px-2.5 py-1 bg-card border-border text-muted hover:border-accent hover:text-accent" title={FOR_ME_FIRST}><HeartGlyph className="h-3.5 w-3.5" /><span>For you</span></Link>}
        {forId && !forMe && (
          <span className="chip border border-accent/40 bg-accent-soft text-accent text-xs pl-2.5 pr-1 py-1" title="Items linked to this cancer, its family, the medicines approved or in phase 3 for it, its roadmaps and technologies">
            <span>{forName}</span>
            <button type="button" onClick={() => setState((s) => ({ ...s, for: undefined }))} className="rounded-full px-1 hover:bg-accent/15" aria-label={`Remove ${forName}`} title="Remove this cancer">×</button>
          </span>
        )}
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        {EDGE_KINDS.map((k) => {
          const on = state.types.includes(k);
          const meta = EDGE_KIND_META[k];
          return (
            <button key={k} type="button" onClick={() => toggle(k)} aria-pressed={on} title={`${on ? "Hide" : "Show"} ${meta.plural.toLowerCase()}`} className={pill(on)}>
              <EdgeGlyph kind={k} className="h-3.5 w-3.5" />
              <span>{meta.plural}</span>
              <span className={`tabular-nums ${on ? "opacity-80" : "text-muted"}`}>{kindCounts[k]}</span>
            </button>
          );
        })}
        {active && <button type="button" onClick={clear} className="chip border border-dashed text-xs px-2.5 py-1 bg-card border-border text-muted hover:bg-foreground/5" title="Show every kind, for everyone"><svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg><span>Clear</span></button>}
      </div>
      <p className="text-xs text-muted flex flex-wrap items-center gap-x-3 gap-y-1" aria-live="polite">
        <span data-edge-count><span className="tabular-nums">{active ? `${shown} of ${total}` : total}</span> items{useFeed ? " in the feed" : " on this page"}{feedState === "loading" ? "; reading the full feed" : ""}{feedState === "failed" ? "; the full feed could not be read, showing the page's items" : ""}.</span>
        {forMe && !my.id && my.ready && <Link href="/for-me/" className="underline">{FOR_ME_FIRST}</Link>}
        {forId && idsLoaded && idsByCancer[forId] === null && <span>No record set for this cancer; showing every item.</span>}
        {forId && !idsLoaded && <span>Reading the records for {forName}.</span>}
        {singleType && <a href={`/edge/${edgeTypeSlug(singleType)}/feed.xml`} className="underline hover:text-foreground" title={`Atom feed of ${EDGE_KIND_META[singleType].plural.toLowerCase()} only`}>Feed of {EDGE_KIND_META[singleType].plural.toLowerCase()}</a>}
      </p>
      <div id="edge-feed" ref={feedRef} className="space-y-6" data-filter={active ? edgeQuery(state) : undefined}>
        {children}
        {active && rows.length > 0 && matching.length === 0 && <p className="card p-4 text-sm text-muted">Nothing on this page matches. The feeds reach further back.</p>}
      </div>
      {useFeed && (
        <div id="edge-feed-full" className="space-y-6">
          {groups.map((gp) => (
            <section key={gp.key} data-day={gp.key} aria-label={gp.label}>
              <h3 className="kicker mb-2 flex items-center gap-2"><time dateTime={gp.key}>{gp.label}</time><span className="text-muted/70 tabular-nums">{gp.items.length}</span></h3>
              <ol className="space-y-2">{gp.items.map((it) => <EdgeCard key={`${it.kind}:${it.url}`} it={it} />)}</ol>
            </section>
          ))}
          {groups.length === 0 && <p className="card p-4 text-sm text-muted">Nothing among the {total} items in the feed matches{forName ? ` for ${forName}` : ""}. Try fewer pills, or the full record pages.</p>}
        </div>
      )}
    </div>
  );
}

/** The "For you" mark: the For me heart. */
function HeartGlyph({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>;
}
