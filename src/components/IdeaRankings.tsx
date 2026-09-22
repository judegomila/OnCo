"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useT, type UiKey } from "@/lib/i18n/ui";
import { COST_LABEL, MATURITY_LABEL, RANK_PAGE, explain, formatScore, isViewId, rankingsFile, VIEWS, type RankedRow, type ScoreParts, type ViewId } from "@/lib/idea-rankings-views";
import { T, TN } from "./T";
import { Tip } from "./Tip";
import { RowVisualFallback } from "./RowVisualFallback";
import { RankGlyph, RankGlyphDefs, type RankGlyphName } from "./RankGlyph";

/** What the server hands over for one view: its first RANK_PAGE rows and the counts the pill and the foot print. */
export type RankingsPanelData = {
  rows: RankedRow[];
  /** Ideas the view can rank: the total the list grows towards. */
  ranked: number;
  /** Ideas the view cannot rank (0 for the lists that rank every idea). */
  excluded: number;
  /** Most wanted only: false until votes.json has a vote; the view then has no pill and no panel. */
  available: boolean;
};

const compact = new Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 });
const full = (n: number) => n.toLocaleString("en-GB");
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** Views whose exclusions have a dictionary sentence (the others rank every idea). */
const EXCLUDED_KEY: Partial<Record<ViewId, UiKey>> = { "bang-for-buck": "rank.excluded.bang-for-buck", "most-important": "rank.excluded.most-important", hardest: "rank.excluded.hardest" };

/** One request per view per page; the promise is shared by every caller. Null when the file cannot be fetched (the list then keeps its first rows). */
const files = new Map<ViewId, Promise<RankedRow[] | null>>();
function loadView(view: ViewId): Promise<RankedRow[] | null> {
  let p = files.get(view);
  if (!p) {
    p = fetch(rankingsFile(view)).then(async (r) => (r.ok ? ((await r.json()) as RankedRow[]) : null)).catch(() => null);
    files.set(view, p);
  }
  return p;
}
/** Test seam: forget the fetched files. */
export function resetRankingFiles() { files.clear(); }

/**
 * The idea rankings: view pills and one list per view. The server renders the first RANK_PAGE rows of every view
 * (so crawlers and readers without JavaScript see the top of each ranking; the inactive panels are `hidden`, and a
 * noscript rule shows them all, one under another). The rest of a view lives in /api/v1/ideas/rankings/<view>.json,
 * fetched once when the reader scrolls past the rows on the page or presses "Show more"; the list then grows by
 * RANK_PAGE each time. Deep links (`?view=hardest`) are read once after mount, the way the other URL-backed views
 * do it, and a click writes the view back into the URL without a navigation. A view that is not available (Most
 * wanted before the first vote) has no pill and no panel; its deep link falls back to the default.
 */
export function IdeaRankings({ views, total, globocanYear, initial = "bang-for-buck" }: {
  views: Record<ViewId, RankingsPanelData>;
  /** Every idea in the corpus, for the "n of total are not ranked here" sentence. */
  total: number;
  /** GLOBOCAN edition year, for the burden tooltip. */
  globocanYear: number;
  initial?: ViewId;
}) {
  const [active, setActive] = useState<ViewId>(initial);
  /** Whole views fetched so far, views whose file could not be fetched, and how many rows of each the reader has asked for. */
  const [fetched, setFetched] = useState<Partial<Record<ViewId, RankedRow[]>>>({});
  const [failed, setFailed] = useState<Partial<Record<ViewId, boolean>>>({});
  const [shown, setShown] = useState<Partial<Record<ViewId, number>>>({});
  const [loading, setLoading] = useState<ViewId | null>(null);
  const busy = useRef(false);
  const { t } = useT();

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const v = new URLSearchParams(window.location.search).get("view");
      if (isViewId(v) && views[v].available) setActive(v);
    });
    return () => cancelAnimationFrame(raf);
  }, [views]);

  const pick = (id: ViewId) => {
    setActive(id);
    const p = new URLSearchParams(window.location.search);
    p.set("view", id);
    window.history.replaceState(null, "", `?${p.toString()}`);
  };

  /** Fetch the view's file the first time, then show RANK_PAGE more rows of it. */
  const more = useCallback(async (id: ViewId) => {
    if (busy.current) return;
    busy.current = true;
    setLoading(id);
    const rows = await loadView(id);
    busy.current = false;
    setLoading(null);
    if (!rows) { setFailed((f) => ({ ...f, [id]: true })); return; }
    setFetched((f) => (f[id] ? f : { ...f, [id]: rows }));
    setShown((s) => ({ ...s, [id]: (s[id] ?? RANK_PAGE) + RANK_PAGE }));
  }, []);

  return (
    <div>
      {/* The chip glyphs are sprites: each path once here, referenced by every row. */}
      <RankGlyphDefs />
      <nav aria-label={t("rank.viewsAria")} className="flex flex-wrap gap-2">
        {VIEWS.filter((v) => views[v.id].available).map((v) => {
          const on = v.id === active;
          return (
            <a key={v.id} href={`/ideas/rankings/?view=${v.id}`} aria-current={on ? "true" : undefined} onClick={(e) => { e.preventDefault(); pick(v.id); }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${on ? "bg-accent text-white border-accent" : "bg-card border-border hover:border-border-strong hover:shadow-sm"}`}>
              <RankGlyph name={v.glyph} className="h-4 w-4" />
              <span>{t(`rank.view.${v.id}` as UiKey)}</span>
              <span className={`text-xs tabular-nums ${on ? "text-white/80" : "text-muted"}`}>{views[v.id].ranked.toLocaleString("en-GB")}</span>
            </a>
          );
        })}
      </nav>
      {!views["most-wanted"].available && <p className="text-xs text-muted mt-2 max-w-3xl">{t("rank.noVotes")}</p>}
      {/* Without JavaScript nothing can switch the panels, so every ranking shows, one under another. */}
      <noscript><style>{`[data-rank-panel][hidden]{display:block}`}</style></noscript>
      <div className="mt-6 space-y-12">
        {VIEWS.filter((v) => views[v.id].available).map((v) => {
          const on = v.id === active;
          const data = views[v.id];
          const all = fetched[v.id];
          const rows = (all ?? data.rows).slice(0, shown[v.id] ?? RANK_PAGE);
          const known = all ? all.length : data.ranked;
          return (
            <ViewPanel key={v.id} id={v.id} glyph={v.glyph} label={v.label} formula={v.formula} data={data} rows={rows} known={known} total={total} on={on}
              remote={!failed[v.id] && rows.length < known} loading={loading === v.id} more={more} globocanYear={globocanYear} />
          );
        })}
      </div>
    </div>
  );
}

function ViewPanel({ id, glyph, label, formula, data, rows, known, total, on, remote, loading, more, globocanYear }: {
  id: ViewId; glyph: RankGlyphName; label: string; formula: string; data: RankingsPanelData; rows: RankedRow[];
  /** Rows the list can grow to: the fetched file's length once it is here, the server's ranked count before. */
  known: number; total: number; on: boolean; remote: boolean; loading: boolean; more: (id: ViewId) => void; globocanYear: number;
}) {
  const { t } = useT();
  const excludedKey = EXCLUDED_KEY[id];
  const foot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!on || !remote || !foot.current || typeof IntersectionObserver === "undefined") return;
    const el = foot.current;
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) more(id); }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [on, remote, rows.length, more, id]);
  return (
    <section aria-labelledby={`h-${id}`} data-rank-panel hidden={!on}>
      <h2 id={`h-${id}`} className="text-xl font-semibold tracking-tight flex items-center gap-2"><RankGlyph name={glyph} className="h-5 w-5 text-accent" /><T k={`rank.view.${id}`} fallback={label} /></h2>
      <p className="text-sm text-muted mt-1 max-w-3xl"><T k={`rank.formula.${id}`} fallback={formula} /></p>
      <p className="text-xs text-muted mt-1 max-w-3xl">
        {id === "cherry-picked" ? <T k="rank.editPicks" /> : <T k="rank.top" vars={{ n: full(rows.length), total: full(data.ranked) }} />}
        {excludedKey && data.excluded > 0 && <> <TN k="rank.notRanked" vars={{ n: full(data.excluded), total: full(total), why: <T k={excludedKey} /> }} /></>}
      </p>
      <div className="card mt-3">
        <ol className="divide-y divide-border" data-rank-list>
          {rows.map((r) => <Row key={r.parts.id} r={r} view={id} globocanYear={globocanYear} />)}
        </ol>
        {remote && (
          <div ref={foot} data-more className="px-4 py-3 border-t border-border text-sm flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => more(id)} disabled={loading} aria-busy={loading || undefined}
              className="chip border border-border bg-card hover:bg-accent-soft hover:text-accent hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 inline-flex items-center gap-1 disabled:opacity-60">
              <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              {t("table.showMore", { n: Math.min(RANK_PAGE, known - rows.length).toLocaleString("en-GB") })}
            </button>
            <span className="text-muted tabular-nums" aria-live="polite">{loading ? t("table.loadingMore") : t("table.showingFirst", { n: rows.length.toLocaleString("en-GB") })}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ r, view, globocanYear }: { r: RankedRow; view: ViewId; globocanYear: number }) {
  const p = r.parts;
  const shownCancers = p.cancers.slice(0, 3);
  const moreCancers = p.cancers.length - shownCancers.length;
  return (
    <li className="p-3 flex gap-3 items-start">
      <span className="w-6 shrink-0 text-right tabular-nums text-sm text-muted pt-0.5">{r.rank}</span>
      <RowVisualFallback kind="idea" name={p.name} route={p.route} className="h-7 w-7" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Link href={p.route} className="font-medium hover:underline">{p.name}</Link>
          {r.score !== null && (
            <Tip title={`Score: ${formatScore(view, r.score)}`} text={explain(view, p, r.score)}>
              <span className="chip bg-accent-soft text-accent cursor-help"><RankGlyph name="rank" className="h-3 w-3" sprite /><span><T k="rank.score" fallback="Score" /> {formatScore(view, r.score)}</span></span>
            </Tip>
          )}
        </div>
        <p className="text-xs text-muted line-clamp-1">{p.tldr}</p>
        {r.reason && <p className="text-sm mt-1 max-w-3xl"><span className="kicker me-2"><T k="rank.reason" fallback="Why it is picked" /></span>{r.reason}</p>}
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <BurdenChip p={p} globocanYear={globocanYear} />
          <Chip glyph="breadth" label={<><T k="rank.part.breadth" fallback="Cancers" /> {p.breadth}</>} tip={p.breadth ? `${plural(p.breadth, "linked cancer")}: ${p.cancers.map((c) => c.name).join(", ")}.` : "No cancer linked to this idea."} href={p.route} />
          <Chip glyph="evidence" label={<><T k="rank.part.evidence" fallback="Evidence" /> {p.evidence}</>} tip={`${plural(p.trials, "trial")} (${p.phase3} phase 3, counted twice), ${plural(p.drugs, "treatment")}, ${plural(p.papers, "key paper")}, linked in either direction.`} href={p.route} />
          <Chip glyph="cost" label={<><T k="rank.part.cost" fallback="Cost" /> {p.cost ? COST_LABEL[p.cost] : "?"}</>}
            tip={p.cost ? `Cost band to try it: ${COST_LABEL[p.cost]} (rank ${p.costRank} of 3; small under $1M, medium $1-50M, large over $50M). Click to filter the ideas list.` : "No cost band recorded, so this idea is left out of the views that need one."}
            href={p.cost ? `/ideas/?cost=${encodeURIComponent(COST_LABEL[p.cost])}` : p.route} />
          <Chip glyph="horizon" label={<><T k="rank.part.horizon" fallback="Horizon" /> {p.horizon !== undefined ? <T k="rank.years" vars={{ n: p.horizon }} fallback={`${p.horizon} yr`} /> : "?"}</>}
            tip={p.horizon !== undefined ? `${plural(p.horizon, "year")} to first evidence of impact, as recorded on the idea.` : "No horizon recorded, so this idea is left out of the views that need one."} href={p.route} />
          <Chip glyph="maturity" label={<><T k="rank.part.maturity" fallback="Maturity" /> {MATURITY_LABEL[p.maturity]}</>}
            tip={`Maturity: ${MATURITY_LABEL[p.maturity]} (rank ${p.maturityRank} of 4). Click to filter the ideas list.`}
            href={`/ideas/?maturity=${encodeURIComponent(MATURITY_LABEL[p.maturity])}`} />
          {shownCancers.map((c) => (
            <Tip key={c.id} title={c.name} text={c.site ? `Burden read from the GLOBOCAN site "${c.site}"${c.viaParent ? ` through its parent cancer` : ""}.` : "No GLOBOCAN site estimate for this cancer; it adds nothing to the burden."}>
              <Link href={c.route} className="chip bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900"><span>{c.name}</span></Link>
            </Tip>
          ))}
          {moreCancers > 0 && <Link href={p.route} className="chip bg-foreground/5 hover:bg-foreground/10"><span><T k="rank.more" vars={{ n: moreCancers }} fallback={`+${moreCancers} more`} /></span></Link>}
        </div>
      </div>
    </li>
  );
}

function Chip({ glyph, label, tip, href }: { glyph: RankGlyphName; label: ReactNode; tip: string; href: string }) {
  return (
    <Tip text={tip}>
      <Link href={href} className="chip bg-foreground/5 hover:bg-foreground/10"><RankGlyph name={glyph} className="h-3 w-3" sprite /><span>{label}</span></Link>
    </Tip>
  );
}

function BurdenChip({ p, globocanYear }: { p: ScoreParts; globocanYear: number }) {
  if (p.burden <= 0) {
    return (
      <Tip text="No linked cancer has a GLOBOCAN site estimate, so burden is 0 and the idea is left out of the burden-based views.">
        <Link href={p.route} className="chip bg-foreground/5 hover:bg-foreground/10"><RankGlyph name="burden" className="h-3 w-3" sprite /><span><T k="rank.part.burden" fallback="Burden" /> 0</span></Link>
      </Tip>
    );
  }
  const first = p.cancers.find((c) => c.site);
  const sites = p.sites.map((s) => `${s.label} ${full(s.cases ?? 0)}`).join("; ");
  const viaParent = p.cancers.filter((c) => c.viaParent).map((c) => `${c.name} uses the site of its parent cancer`).join("; ");
  const tip = `${full(p.burden)} new cases a year worldwide (GLOBOCAN ${globocanYear}, both sexes, all ages), summed over ${plural(p.sites.length, "site")} counted once each: ${sites}.${viaParent ? ` ${viaParent}.` : ""}`;
  return (
    <Tip text={tip}>
      <Link href={first ? `/cases/?cancer=${encodeURIComponent(first.id)}` : p.route} className="chip bg-foreground/5 hover:bg-foreground/10"><RankGlyph name="burden" className="h-3 w-3" sprite /><span><T k="rank.part.burden" fallback="Burden" /> {compact.format(p.burden)} <T k="rank.casesYear" fallback="cases/yr" /></span></Link>
    </Tip>
  );
}
