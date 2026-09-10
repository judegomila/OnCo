/**
 * Automated research pulse (improvement #96): the latest items from the leading journals, regulators and
 * news outlets, matched to OnCo entity ids by name and alias. Sits beside the hand-curated themes on /pulse/.
 *
 * Sources are public RSS or RDF feeds; the FDA Oncology Center of Excellence has no feed, so its approval
 * table is parsed directly. General news feeds (STAT, Endpoints) are filtered to oncology items.
 *
 *   public/pulse/auto.json  { fetched, feeds: [{ id, name, homepage, url, ok, count, error? }], items: [{ feedId, title, url, date, refs }] }
 *
 * Run: npx tsx scripts/fetch-pulse.ts   Weekly via .github/workflows/refresh-pulse.yml.
 */
import { graph } from "../src/lib/graph";
import { FDA_OCE_URL, NameMatcher, ONCO_WORDS, getText, isoDaysAgo, matchableFromGraph, parseFeed, parseOcePage, publicPath, readJson, sleep, today, writeJson, type FeedItem } from "./feed-utils";

const OUT = publicPath("pulse", "auto.json");
const KEEP_DAYS = 60;
const MAX_PER_FEED = 40;

type FeedDef = { id: string; name: string; homepage: string; url: string; kind: "journal" | "regulator" | "news"; sourceId?: string; onlyOncology?: boolean };

/** `sourceId` links to the collection entity in src/data/sources.ts where one exists. */
const FEEDS: FeedDef[] = [
  { id: "fda-oce", name: "FDA Oncology Center of Excellence", homepage: FDA_OCE_URL, url: FDA_OCE_URL, kind: "regulator", sourceId: "fda-approvals" },
  { id: "nejm", name: "New England Journal of Medicine", homepage: "https://www.nejm.org/", url: "https://www.nejm.org/action/showFeed?type=etoc&feed=rss&jc=nejm", kind: "journal", sourceId: "src-nejm", onlyOncology: true },
  { id: "lancet-oncology", name: "The Lancet Oncology", homepage: "https://www.thelancet.com/journals/lanonc/home", url: "https://www.thelancet.com/rssfeed/lanonc_current.xml", kind: "journal", sourceId: "src-lancet-oncology" },
  { id: "jco", name: "Journal of Clinical Oncology", homepage: "https://ascopubs.org/journal/jco", url: "https://ascopubs.org/action/showFeed?type=etoc&feed=rss&jc=jco", kind: "journal", sourceId: "src-jco" },
  { id: "nature-medicine", name: "Nature Medicine", homepage: "https://www.nature.com/nm/", url: "https://www.nature.com/nm.rss", kind: "journal", sourceId: "src-nature-medicine", onlyOncology: true },
  { id: "endpoints", name: "Endpoints News", homepage: "https://endpts.com/", url: "https://endpts.com/feed/", kind: "news", sourceId: "src-endpoints", onlyOncology: true },
  { id: "stat", name: "STAT", homepage: "https://www.statnews.com/", url: "https://www.statnews.com/feed/", kind: "news", sourceId: "src-stat-news", onlyOncology: true },
];

export type AutoPulseFeed = { id: string; name: string; homepage: string; url: string; kind: string; sourceId?: string; ok: boolean; count: number; error?: string };
export type AutoPulseItem = { feedId: string; title: string; url: string; date?: string; refs: string[] };
export type AutoPulseSnapshot = { fetched: string; feeds: AutoPulseFeed[]; items: AutoPulseItem[] };

async function main() {
  const g = graph();
  const matcher = new NameMatcher(matchableFromGraph(g.entities as never), ["drug", "target", "cancer", "technology", "trial", "company"]);
  const prev = readJson<AutoPulseSnapshot>(OUT);
  const fetched = today();
  const cutoff = isoDaysAgo(KEEP_DAYS);
  const snap: AutoPulseSnapshot = { fetched, feeds: [], items: [] };
  const seen = new Set<string>();

  for (const f of FEEDS) {
    const text = await getText(f.url, { accept: f.id === "fda-oce" ? "text/html" : "application/rss+xml, application/atom+xml, application/xml, text/xml" });
    await sleep(500);
    if (!text) { snap.feeds.push({ ...f, ok: false, count: 0, error: "unreachable or blocked" }); console.warn(`pulse: ${f.id} failed`); continue; }
    let items: FeedItem[] = f.id === "fda-oce" ? parseOcePage(text).map((o) => ({ title: o.title, link: o.url, date: o.date, summary: o.summary })) : parseFeed(text);
    if (f.onlyOncology) items = items.filter((i) => ONCO_WORDS.test(`${i.title} ${i.summary ?? ""}`));
    items = items.filter((i) => !i.date || i.date >= cutoff).slice(0, MAX_PER_FEED);
    let n = 0;
    for (const it of items) {
      if (seen.has(it.link)) continue;
      seen.add(it.link);
      snap.items.push({ feedId: f.id, title: it.title, url: it.link, date: it.date, refs: matcher.match(`${it.title}. ${it.summary ?? ""}`).slice(0, 8) });
      n++;
    }
    snap.feeds.push({ ...f, ok: true, count: n });
    console.log(`pulse: ${f.id} ${n} items`);
  }

  // Keep items from feeds that failed this run, from the previous snapshot, so a blocked publisher does not blank its column.
  for (const pf of prev?.feeds ?? []) {
    const now = snap.feeds.find((x) => x.id === pf.id);
    if (now?.ok) continue;
    const carried = (prev?.items ?? []).filter((i) => i.feedId === pf.id && (!i.date || i.date >= cutoff) && !seen.has(i.url));
    for (const c of carried) { seen.add(c.url); snap.items.push(c); }
    if (now && carried.length) { now.count = carried.length; now.error = `${now.error}; showing ${carried.length} items from ${prev?.fetched}`; }
  }

  snap.items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  writeJson(OUT, snap);
  console.log(`pulse: ${snap.items.length} items from ${snap.feeds.filter((f) => f.ok).length}/${snap.feeds.length} feeds -> ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
