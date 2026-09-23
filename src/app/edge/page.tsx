import type { Metadata } from "next";
import Link from "next/link";
import { FEED_TYPES, absoluteUrl, pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EdgeCard } from "@/components/EdgeCard";
import { EdgeFilter } from "@/components/EdgeFilter";
import { EdgeGlyph, EdgeGlyphDefs } from "@/components/EdgeGlyph";
import { ItemListJsonLd } from "@/components/JsonLd";
import { EDGE_KIND_META, EDGE_PAGE_CAP, EDGE_SOURCES, edgeAll, edgeFeed, edgeWeekCounts, groupEdge, type EdgeKind } from "@/lib/edge";
import { countEdgeKinds, edgeHref } from "@/lib/edge-kinds";

const TITLE = "Edge";
const LEDE = "The freshest signals in cancer: new papers, trial results, approvals and law, updated with every build";
const base = pageMeta({ title: TITLE, description: `${LEDE}. One feed from every dated source OnCo holds, ranked by recency, with RSS and JSON feeds.`, path: "/edge/" });
export const metadata: Metadata = {
  ...base,
  alternates: { canonical: absoluteUrl("/edge/"), types: { ...FEED_TYPES, "application/feed+json": [{ url: "/edge/feed.json", title: "OnCo Edge (JSON Feed)" }] } },
};

export default function EdgePage() {
  const all = edgeAll();
  const items = edgeFeed(EDGE_PAGE_CAP);
  const groups = groupEdge(items);
  const week = edgeWeekCounts(all);
  const weekTotal = Object.values(week).reduce((a, b) => a + (b ?? 0), 0);
  const counts = countEdgeKinds(items.map((it) => ({ kind: it.kind, refIds: [] })));
  const feedTotal = edgeFeed().length;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} seed="Edge"
        title={<span className="inline-flex items-center gap-3"><EdgeGlyph kind="all" className="h-9 w-9 text-accent" />{TITLE}</span>}
        lede={`${LEDE}.`} />
      <ItemListJsonLd path="/edge/" name={`${TITLE} · OnCo`} description={LEDE} items={items.slice(0, 50).map((it) => ({ name: it.title, url: it.url }))} />
      <EdgeGlyphDefs />
      <Container className="pb-16 space-y-8">
        <section id="sec-week" aria-labelledby="week-h">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <h2 id="week-h" className="text-lg font-semibold">This week in numbers</h2>
            <span className="text-xs text-muted">Items dated to a day in the last seven days, across every source; dates known only to the month or year are not counted.</span>
          </div>
          {weekTotal > 0 ? (
            <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {(Object.keys(EDGE_KIND_META) as EdgeKind[]).filter((k) => (week[k] ?? 0) > 0).map((k) => (
                <li key={k}>
                  <Link href={edgeHref({ types: [k] })} data-edge-type={k} className="card card-link p-3 flex flex-col gap-0.5" title={`Show only ${EDGE_KIND_META[k].plural.toLowerCase()}`}>
                    <span className="text-2xl font-semibold tabular-nums">{week[k]}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted"><EdgeGlyph kind={k} className="h-3.5 w-3.5" />{EDGE_KIND_META[k].plural}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p className="card p-4 text-sm text-muted">No item in the snapshots is dated to a day in the last seven days.</p>}
        </section>

        <section id="sec-feed" aria-labelledby="feed-h" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="feed-h" className="text-lg font-semibold">Latest</h2>
            <div className="flex items-center gap-3 text-xs text-muted">
              <a href="/edge/feed.xml" className="inline-flex items-center gap-1 underline hover:text-foreground" title="Atom feed, the 500 most recent items"><svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8M6 18h.01" /></svg>RSS</a>
              <a href="/edge/feed.json" className="underline hover:text-foreground" title="JSON Feed 1.1, the 500 most recent items">JSON</a>
            </div>
          </div>
          <p className="text-xs text-muted">Ranked newest first, with approvals, withdrawals and phase 3 results counting as two weeks fresher than their date, other results, law and papers in the leading journals one week fresher, and preprints one week older; every kind keeps its most recent items so no filter is empty while its source has data. Within a day the weightier items come first. Pick types to combine them; For you narrows to the cancer chosen in <Link href="/for-me/" className="underline">For me</Link> (a choice that stays in this browser); the first filter reads the full {feedTotal}-item feed.</p>
          <EdgeFilter counts={counts} pageTotal={items.length} feedTotal={feedTotal}>
            {groups.map((gp) => (
              <section key={gp.key} data-day={gp.key} aria-label={gp.label}>
                <h3 className="kicker mb-2 flex items-center gap-2"><time dateTime={gp.key}>{gp.label}</time><span className="text-muted/70 tabular-nums">{gp.items.length}</span></h3>
                <ol className="space-y-2">{gp.items.map((it) => <EdgeCard key={`${it.kind}:${it.id}`} it={it} />)}</ol>
              </section>
            ))}
          </EdgeFilter>
        </section>

        <section id="sec-sources" aria-labelledby="sources-h" className="card p-5 text-sm space-y-3">
          <h2 id="sources-h" className="text-lg font-semibold">Sources</h2>
          <p className="text-muted">Everything above is read at build time from snapshots and records already in the repository; nothing is fetched when the page is viewed. Where each kind comes from and how often its source refreshes, from the workflow schedules in <a className="underline" href="https://github.com/judegomila/OnCo/tree/main/.github/workflows" rel="noopener">.github/workflows</a>:</p>
          <ul className="divide-y divide-border">
            {EDGE_SOURCES.map((s) => (
              <li key={s.kind} className="py-2.5 grid gap-1 sm:grid-cols-[9rem_1fr]">
                <Link href={s.href} className={`chip ${s.tone} self-start`} title={`Full ${s.plural.toLowerCase()} on OnCo`}><EdgeGlyph kind={s.kind} className="h-3.5 w-3.5" /><span>{s.plural}</span></Link>
                <div><p>{s.source}</p><p className="text-xs text-muted mt-0.5">Refresh: {s.cadence}</p></div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">Dates are shown at the precision the source gives: a year-only law or authorisation is grouped under its year, never given a day. Papers are matched to records by their literature queries, so a code or a common word can pull in an unrelated paper; the record chips tell you what matched. Not medical advice.</p>
        </section>
      </Container>
    </>
  );
}
