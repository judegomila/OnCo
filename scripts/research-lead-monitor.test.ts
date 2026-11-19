/**
 * The no-account lead monitor, offline. Every request goes to a fixture: nothing here touches the network.
 */
import { describe, expect, it } from "vitest";
import { accounts, COMPANY_CAP } from "./research-lead-accounts";
import {
  DEFAULT_UA, corpusFrom, emptyQueue, idsFromText, idsFromUrl, mergeCandidate, parseBluesky, parseItems, parseRobots, renderQueue, scan, sourcesFrom, verify,
  type Candidate, type Corpus, type Source,
} from "./research-lead-monitor";
import { defaultAccounts, privateDir } from "./x-research-monitor";

const now = new Date("2026-11-18T12:00:00Z");
const SECRET_TEXT = "Fixture wording that must never be stored";

type Call = { url: string; headers: Headers };
type Route = (url: URL, headers: Headers) => Response | undefined;
function fake(routes: Route[]) {
  const calls: Call[] = [];
  const fetcher = (async (input: URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    calls.push({ url: input.href, headers });
    for (const r of routes) { const res = r(input, headers); if (res) return res; }
    throw new Error(`Unexpected request: ${input.href}`);
  }) as unknown as typeof fetch;
  return { fetcher, calls };
}
const xml = (body: string, headers: Record<string, string> = {}) => new Response(body, { headers: { "content-type": "application/rss+xml", ...headers } });
const robots = (text: string): Route => (u) => u.pathname === "/robots.txt" ? new Response(text) : undefined;
const crossref: Route = (u) => {
  if (u.hostname !== "api.crossref.org") return;
  const doi = decodeURIComponent(u.pathname.replace("/works/", ""));
  return doi.startsWith("10.1234/") ? Response.json({ message: { DOI: doi, title: [`Resolved title for ${doi}`] } }) : new Response(null, { status: 404 });
};
const quick = { now, minDelayMs: 0, sleep: async () => {} };

const feedSource: Source = { id: "feed:journal:1", type: "feed", url: "https://journal.example/current.rss", scope: "general", hosts: ["journal.example"], regulator: false };
const rss = `<?xml version="1.0"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>
  <item><title>${SECRET_TEXT}: a phase 3 trial in lung cancer</title><link>https://journal.example/a1</link><pubDate>Mon, 16 Nov 2026 09:00:00 GMT</pubDate><dc:identifier>doi:10.1234/ONC.1</dc:identifier><description>${SECRET_TEXT}</description></item>
  <item><title>A cardiology paper about statins</title><link>https://journal.example/a2</link><pubDate>Mon, 16 Nov 2026 10:00:00 GMT</pubDate><description>Nothing on topic</description></item>
  <item><title>Old cancer item</title><link>https://journal.example/a3</link><pubDate>Mon, 03 Aug 2026 10:00:00 GMT</pubDate><dc:identifier>doi:10.1234/old</dc:identifier></item>
</channel></rss>`;

describe("robots.txt", () => {
  it("lets the longest rule win, Allow win a tie, and reads wildcards and end anchors", () => {
    const r = parseRobots("User-agent: *\nDisallow: /api/\nAllow: /api/int/\nDisallow: /action\nDisallow: /*.pdf$\nCrawl-delay: 2\n");
    expect(r.allowed("/api/rss?cond=x")).toBe(false);
    expect(r.allowed("/api/int/studies")).toBe(true);
    expect(r.allowed("/action/showFeed?type=etoc&feed=rss")).toBe(false);
    expect(r.allowed("/paper.pdf")).toBe(false);
    expect(r.allowed("/paper.pdf?x=1")).toBe(true);
    expect(r.allowed("/rssfeed/current.xml")).toBe(true);
    expect(r.crawlDelay).toBe(2);
  });
  it("uses the group that names this reader in place of the wildcard group", () => {
    const r = parseRobots("User-agent: *\nDisallow: /\n\nUser-agent: research-lead-monitor\nDisallow: /private/\n");
    expect(r.allowed("/feed/")).toBe(true);
    expect(r.allowed("/private/x")).toBe(false);
    expect(parseRobots("User-agent: *\nDisallow: /\n").allowed("/feed/")).toBe(false);
    expect(parseRobots("").allowed("/anything")).toBe(true);
  });
});

describe("identifiers", () => {
  it("reads the identifier a link carries and nothing from a lookalike host", () => {
    expect(idsFromUrl("https://doi.org/10.1056/NEJMoa2400001")).toEqual([{ type: "doi", value: "10.1056/nejmoa2400001" }]);
    expect(idsFromUrl("http://dx.doi.org/10.1200/JCO.25.00001")).toEqual([{ type: "doi", value: "10.1200/jco.25.00001" }]);
    expect(idsFromUrl("https://www.nejm.org/doi/full/10.1056/NEJMoa2400001?query=x")).toEqual([{ type: "doi", value: "10.1056/nejmoa2400001" }]);
    expect(idsFromUrl("https://www.nature.com/articles/s43018-026-01234-5")).toEqual([{ type: "doi", value: "10.1038/s43018-026-01234-5" }]);
    expect(idsFromUrl("https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(26)00123-4/fulltext")).toEqual([{ type: "doi", value: "10.1016/s1470-2045(26)00123-4" }]);
    expect(idsFromUrl("https://pubmed.ncbi.nlm.nih.gov/41604601/")).toEqual([{ type: "pmid", value: "41604601" }]);
    expect(idsFromUrl("https://clinicaltrials.gov/study/NCT04229979?tab=results")).toEqual([{ type: "nct", value: "NCT04229979" }]);
    expect(idsFromUrl("https://clinicaltrials.gov.evil.example/study/NCT04229979")).toEqual([]);
    expect(idsFromUrl("https://nature.com.evil.example/articles/s41586-026-1")).toEqual([]);
    expect(idsFromUrl("not a url")).toEqual([]);
  });
  it("finds registry numbers and PubMed ids in text, with word boundaries", () => {
    expect(idsFromText("Results of NCT01234567 (PMID: 12345678), see XNCT012345678")).toEqual([{ type: "nct", value: "NCT01234567" }, { type: "pmid", value: "12345678" }]);
  });
});

describe("parsers", () => {
  it("reads RSS and Atom items with their dates and identifiers", () => {
    const items = parseItems(rss);
    expect(items.map((i) => [i.url, i.date, i.ids.map((x) => x.value)])).toEqual([
      ["https://journal.example/a1", "2026-11-16", ["10.1234/onc.1"]], ["https://journal.example/a2", "2026-11-16", []], ["https://journal.example/a3", "2026-08-03", ["10.1234/old"]],
    ]);
    const atom = `<feed><entry><title>MHRA approves a medicine</title><link rel="alternate" type="text/html" href="/government/news/x"/><updated>2026-11-10T09:30:00+00:00</updated><summary>Text</summary></entry></feed>`;
    expect(parseItems(atom, "https://www.gov.uk/organisation.atom")).toMatchObject([{ url: "https://www.gov.uk/government/news/x", date: "2026-11-10" }]);
  });
  it("keeps only the account's own Bluesky posts and takes links from the structured fields", () => {
    const post = (rkey: string, extra: Record<string, unknown> = {}, record: Record<string, unknown> = {}) => ({
      post: { uri: `at://did:plc:abc/app.bsky.feed.post/${rkey}`, author: { handle: "journal.example" }, record: { text: SECRET_TEXT, createdAt: "2026-11-17T08:00:00.000Z", ...record }, ...extra },
    });
    const items = parseBluesky({ feed: [
      post("3aaa", {}, { facets: [{ features: [{ $type: "app.bsky.richtext.facet#link", uri: "https://doi.org/10.1234/onc.1" }] }] }),
      { ...post("3bbb"), reason: { $type: "app.bsky.feed.defs#reasonRepost" } },
      post("3ccc", {}, { reply: { parent: {} } }),
      { post: { ...post("3ddd").post, author: { handle: "someone.else" } } },
      post("3eee", { embed: { external: { uri: "https://journal.example/news/x" } } }),
    ] }, "journal.example");
    expect(items.map((i) => i.url)).toEqual(["https://bsky.app/profile/journal.example/post/3aaa", "https://bsky.app/profile/journal.example/post/3eee"]);
    expect(items[0].ids).toEqual([{ type: "doi", value: "10.1234/onc.1" }]);
    expect(items[1].links).toEqual(["https://journal.example/news/x"]);
  });
});

describe("scan", () => {
  const corpus: Corpus = {
    byIdentifier: (k) => k === "doi:10.1234/onc.1" ? [{ id: "paper-held", kind: "paper", by: "doi" }] : [],
    byText: (t) => /pembrolizumab/i.test(t) ? [{ id: "pembrolizumab", kind: "drug", by: "name" }] : [],
  };
  const bsky: Source = { id: "bluesky:journal", type: "bluesky", handle: "journal.example", hosts: ["journal.example"], regulator: false };
  const bskyRoute: Route = (u) => u.hostname === "public.api.bsky.app" ? Response.json({ feed: [{ post: {
    uri: "at://did:plc:abc/app.bsky.feed.post/3aaa", author: { handle: "journal.example" },
    record: { text: SECRET_TEXT, createdAt: "2026-11-17T08:00:00.000Z", facets: [{ features: [{ uri: "https://doi.org/10.1234/ONC.1" }] }] },
  } }] }) : undefined;

  it("queues identifiers, links and dates, never the wording, and merges one paper seen on two channels", async () => {
    const { fetcher, calls } = fake([robots("User-agent: *\nAllow: /\n"), (u) => u.href === feedSource.url ? xml(rss, { etag: '"v1"', "last-modified": "Mon, 16 Nov 2026 10:00:00 GMT" }) : undefined, bskyRoute, crossref]);
    const { queue, report } = await scan(emptyQueue(), { ...quick, fetcher, sources: [feedSource, bsky], corpus });
    expect(queue.candidates).toHaveLength(1);
    const c = queue.candidates[0];
    expect(c).toMatchObject({ key: "doi:10.1234/onc.1", state: "resolved-source-review", standing: "identifier-held", priority: 2, firstQueued: "2026-11-18" });
    expect(c.leads.map((l) => l.source).sort()).toEqual(["bluesky:journal", "feed:journal:1"]);
    expect(c.evidence?.title).toBe("Resolved title for 10.1234/onc.1");
    expect(c.records).toEqual([{ id: "paper-held", kind: "paper", by: "doi" }]);
    const stored = JSON.stringify(queue) + renderQueue(queue, "2026-11-18");
    expect(stored).not.toContain("Fixture wording");
    expect(stored).not.toContain("statins");
    expect(report["feed:journal:1"]).toEqual({ status: "ok", fresh: 1 });
    expect(queue.sources["feed:journal:1"]).toMatchObject({ status: "ok", etag: '"v1"', lastModified: "Mon, 16 Nov 2026 10:00:00 GMT" });
    expect(queue.sources["feed:journal:1"].seen).toHaveLength(2); // the off-topic item is remembered, the item older than the window is not
    expect(calls.every((x) => x.headers.get("user-agent") === DEFAULT_UA)).toBe(true);
    expect(DEFAULT_UA).not.toMatch(/@|https?:/);
    expect(calls.filter((x) => x.url.includes("api.crossref.org"))).toHaveLength(1); // the second sighting reuses the resolution

    // A second run sends the validators; a 304 changes nothing but the time of the check.
    const second = fake([robots(""), (u, h) => u.href === feedSource.url ? (h.get("if-none-match") === '"v1"' && h.get("if-modified-since") ? new Response(null, { status: 304 }) : xml(rss)) : undefined, bskyRoute]);
    const again = await scan(queue, { ...quick, fetcher: second.fetcher, sources: [feedSource, bsky], corpus });
    expect(again.report["feed:journal:1"].status).toBe("not-modified");
    expect(again.queue.candidates).toEqual(queue.candidates);
    expect(again.queue.sources["feed:journal:1"]).toMatchObject({ etag: '"v1"', seen: queue.sources["feed:journal:1"].seen });
  });

  it("does not fetch what robots.txt forbids, and treats an unreachable robots.txt as a refusal", async () => {
    const closed = fake([robots("User-agent: *\nDisallow: /current.rss\n")]);
    const a = await scan(emptyQueue(), { ...quick, fetcher: closed.fetcher, sources: [feedSource] });
    expect(a.report["feed:journal:1"]).toMatchObject({ status: "refused", detail: "robots.txt" });
    expect(closed.calls.map((c) => c.url)).toEqual(["https://journal.example/robots.txt"]);
    const down = fake([(u) => u.pathname === "/robots.txt" ? new Response(null, { status: 503 }) : undefined]);
    expect((await scan(emptyQueue(), { ...quick, fetcher: down.fetcher, sources: [feedSource] })).report["feed:journal:1"].status).toBe("refused");
  });

  it("follows a redirect over https only, and only where the next host's robots.txt permits", async () => {
    const moved = fake([robots(""), (u) => u.href === feedSource.url ? new Response(null, { status: 301, headers: { location: "https://journal.example/feed.xml" } }) : u.pathname === "/feed.xml" ? xml(rss) : undefined, crossref]);
    expect((await scan(emptyQueue(), { ...quick, fetcher: moved.fetcher, sources: [feedSource] })).queue.candidates).toHaveLength(1);
    const plain = fake([robots(""), (u) => u.href === feedSource.url ? new Response(null, { status: 302, headers: { location: "http://journal.example/feed.xml" } }) : u.href === "https://journal.example/feed.xml" ? xml(rss) : undefined, crossref]);
    expect((await scan(emptyQueue(), { ...quick, fetcher: plain.fetcher, sources: [feedSource] })).queue.candidates).toHaveLength(1);
    expect(plain.calls.every((c) => c.url.startsWith("https:"))).toBe(true);
    const shut = fake([(u) => u.pathname === "/robots.txt" ? new Response(u.hostname === "elsewhere.example" ? "User-agent: *\nDisallow: /\n" : "") : undefined, (u) => u.href === feedSource.url ? new Response(null, { status: 301, headers: { location: "https://elsewhere.example/feed.xml" } }) : undefined]);
    expect((await scan(emptyQueue(), { ...quick, fetcher: shut.fetcher, sources: [feedSource] })).report["feed:journal:1"].status).toBe("refused");
  });

  it("keeps the old checkpoint when a source fails, and stops at the budget without losing what is left", async () => {
    const old = emptyQueue();
    old.sources["feed:journal:1"] = { checkedAt: "2026-11-01T00:00:00.000Z", status: "ok", etag: '"v0"', seen: ["abc"] };
    const broken = fake([robots(""), (u) => u.href === feedSource.url ? new Response(null, { status: 500 }) : undefined]);
    const failed = await scan(old, { ...quick, fetcher: broken.fetcher, sources: [feedSource] });
    expect(failed.queue.sources["feed:journal:1"]).toMatchObject({ status: "error", detail: "HTTP 500", etag: '"v0"', seen: ["abc"] });

    const two = `<rss><channel>
      <item><title>Cancer one</title><link>https://journal.example/b1</link><pubDate>Mon, 16 Nov 2026 09:00:00 GMT</pubDate><guid>doi:10.1234/b1</guid></item>
      <item><title>Cancer two</title><link>https://journal.example/b2</link><pubDate>Tue, 17 Nov 2026 09:00:00 GMT</pubDate><guid>doi:10.1234/b2</guid></item></channel></rss>`;
    const routes = [robots(""), (u: URL) => u.href === feedSource.url ? xml(two, { etag: '"v2"' }) : undefined, crossref];
    const first = await scan(emptyQueue(), { ...quick, fetcher: fake(routes).fetcher, sources: [feedSource], maxEvidence: 1 });
    expect(first.queue.candidates.map((c) => c.key)).toEqual(["doi:10.1234/b1"]);
    expect(first.report["feed:journal:1"].status).toBe("ok, more next run");
    expect(first.queue.sources["feed:journal:1"].etag).toBeUndefined();
    const rest = await scan(first.queue, { ...quick, fetcher: fake(routes).fetcher, sources: [feedSource], maxEvidence: 1 });
    expect(rest.queue.candidates.map((c) => c.key)).toEqual(["doi:10.1234/b1", "doi:10.1234/b2"]);
    expect(rest.queue.sources["feed:journal:1"].etag).toBe('"v2"');
  });

  it("holds a regulator's own notice for review as a primary source, with the records it names", async () => {
    const regulator: Source = { id: "feed:regulator:1", type: "feed", url: "https://regulator.example/press.xml", scope: "general", hosts: ["regulator.example"], regulator: true };
    const press = `<rss><channel>
      <item><title>Agency approves pembrolizumab for a new use</title><link>https://regulator.example/press/1</link><pubDate>Mon, 16 Nov 2026 09:00:00 GMT</pubDate></item>
      <item><title>Agency warns about a food recall</title><link>https://regulator.example/press/2</link><pubDate>Mon, 16 Nov 2026 09:00:00 GMT</pubDate></item></channel></rss>`;
    const { fetcher } = fake([robots(""), (u) => u.href === regulator.url ? xml(press) : undefined, (u) => u.pathname === "/press/1" ? new Response("<p>No identifiers here</p>", { headers: { "content-type": "text/html" } }) : undefined]);
    const { queue } = await scan(emptyQueue(), { ...quick, fetcher, sources: [regulator], corpus });
    expect(queue.candidates).toEqual([{
      key: "url:https://regulator.example/press/1", state: "regulator-notice-review", priority: 1, firstQueued: "2026-11-18", standing: "names-existing-record",
      leads: [{ source: "feed:regulator:1", url: "https://regulator.example/press/1", date: "2026-11-16" }], records: [{ id: "pembrolizumab", kind: "drug", by: "name" }], evidence: undefined,
    }]);
  });

  it("reads PubMed and registry searches as identifiers and resolves each", async () => {
    const sources: Source[] = [{ id: "pubmed:x", type: "pubmed", term: "cancer" }, { id: "registry:x", type: "registry", condition: "cancer" }];
    const { fetcher, calls } = fake([
      (u) => u.hostname === "eutils.ncbi.nlm.nih.gov" ? Response.json({ esearchresult: { idlist: ["41000001"] } }) : undefined,
      (u) => u.hostname === "www.ebi.ac.uk" ? Response.json({ resultList: { result: [{ id: "41000001", source: "MED", title: "A resolved paper", doi: "10.1234/P1" }] } }) : undefined,
      (u) => u.pathname === "/api/v2/studies" ? Response.json({ studies: [{ protocolSection: { identificationModule: { nctId: "NCT01234567" }, statusModule: { resultsFirstPostDateStruct: { date: "2026-11-02" } } } }] }) : undefined,
      (u) => u.pathname === "/api/v2/studies/NCT01234567" ? Response.json({ protocolSection: { identificationModule: { nctId: "NCT01234567", briefTitle: "A registered trial" }, sponsorCollaboratorsModule: { leadSponsor: { name: "Sponsor", class: "INDUSTRY" } } } }) : undefined,
    ]);
    const { queue } = await scan(emptyQueue(), { ...quick, fetcher, sources });
    expect(queue.candidates.map((c) => [c.key, c.priority, c.leads[0].url])).toEqual([
      ["nct:NCT01234567", 2, "https://clinicaltrials.gov/study/NCT01234567"], ["doi:10.1234/p1", 3, "https://pubmed.ncbi.nlm.nih.gov/41000001/"],
    ]);
    expect(queue.candidates[1].evidence?.ids).toEqual(["doi:10.1234/p1", "pmid:41000001"]);
    expect(calls.some((c) => c.url.includes("onco.cc"))).toBe(false); // the corpus on disk answers, not the live site
    const search = new URL(calls.find((c) => c.url.includes("/api/v2/studies?"))!.url).searchParams;
    expect(search.get("filter.advanced")).toBe("AREA[Phase]PHASE3 AND AREA[ResultsFirstPostDate]RANGE[2026-10-19,MAX]");
  });

  it("leaves an item for the next run when the resolver is down, and files it only when the resolver says no", async () => {
    const one = `<rss><channel><item><title>Cancer one</title><link>https://journal.example/c1</link><pubDate>Mon, 16 Nov 2026 09:00:00 GMT</pubDate><guid>doi:10.9999/c1</guid></item></channel></rss>`;
    const feed: Route = (u) => u.href === feedSource.url ? xml(one, { etag: '"v3"' }) : undefined;
    const down = await scan(emptyQueue(), { ...quick, fetcher: fake([robots(""), feed, (u) => u.hostname === "api.crossref.org" ? new Response(null, { status: 503 }) : undefined]).fetcher, sources: [feedSource] });
    expect(down.queue.candidates).toEqual([]);
    expect(down.queue.sources["feed:journal:1"]).toMatchObject({ seen: [], status: "ok" });
    expect(down.queue.sources["feed:journal:1"].etag).toBeUndefined();
    const absent = await scan(down.queue, { ...quick, fetcher: fake([robots(""), feed, crossref]).fetcher, sources: [feedSource] });
    expect(absent.queue.candidates.map((c) => c.state)).toEqual(["unverified-lead"]);
    expect(absent.queue.sources["feed:journal:1"].seen).toHaveLength(1);
  });

  it("hands the queue over after each source, so a long run can save as it goes", async () => {
    const saved: number[] = [];
    const { fetcher } = fake([robots(""), (u) => u.href === feedSource.url ? xml(rss) : undefined, bskyRoute, crossref]);
    await scan(emptyQueue(), { ...quick, fetcher, sources: [feedSource, bsky], corpus, afterSource: async (q) => { saved.push(Object.keys(q.sources).length); } });
    expect(saved).toEqual([1, 2]);
  });

  it("verify reports each source without writing a queue", async () => {
    const { fetcher } = fake([robots(""), (u) => u.href === feedSource.url ? xml(rss) : undefined]);
    expect(await verify({ ...quick, fetcher, sources: [feedSource] })).toEqual([{ id: "feed:journal:1", type: "feed", status: "ok", items: 3, detail: undefined }]);
  });
});

describe("the queue and the corpus", () => {
  const row = (key: string, ids: string[], url: string): Candidate => ({
    key, state: "resolved-source-review", priority: 3, firstQueued: "2026-11-18", leads: [{ source: "s", url }], records: [], standing: "no-match",
    evidence: { title: "T", url: "https://doi.org/x", ids, entities: [] },
  });
  it("merges candidates that share any stable identifier", () => {
    const merged = mergeCandidate([row("pmid:1", ["pmid:1"], "https://a.example/1")], row("doi:10.1/x", ["doi:10.1/x", "pmid:1"], "https://b.example/2"));
    expect(merged).toHaveLength(1);
    expect(merged[0]).toMatchObject({ key: "doi:10.1/x", leads: [{ url: "https://a.example/1" }, { url: "https://b.example/2" }] });
  });
  it("indexes records by DOI, PubMed id, registry number and linked identifiers, and names by whole word", () => {
    const corpus = corpusFrom([
      { id: "p1", kind: "paper", name: "A paper", aka: [], doi: "10.1056/NEJMoa1", pmid: "123" },
      { id: "t1", kind: "trial", name: "KEYNOTE-000", aka: [], nct: "NCT00000001", links: [{ url: "https://doi.org/10.1200/JCO.1" }] },
      { id: "imid-x", kind: "drug", name: "Imidex", aka: [] },
    ]);
    expect(corpus.byIdentifier("doi:10.1056/nejmoa1")).toEqual([{ id: "p1", kind: "paper", by: "doi" }]);
    expect(corpus.byIdentifier("pmid:123")).toEqual([{ id: "p1", kind: "paper", by: "pmid" }]);
    expect(corpus.byIdentifier("nct:NCT00000001")).toEqual([{ id: "t1", kind: "trial", by: "nct" }]);
    expect(corpus.byIdentifier("doi:10.1200/jco.1")).toEqual([{ id: "t1", kind: "trial", by: "doi" }]);
    expect(corpus.byText("Imidex improves survival")).toEqual([{ id: "imid-x", kind: "drug", by: "name" }]);
    expect(corpus.byText("a fluoropyrimidexate regimen")).toEqual([]);
  });
  it("refuses a queue directory inside the checkout unless git ignores it", () => {
    expect(() => privateDir({ ONCO_RESEARCH_LEADS_DIR: "/repo/leads" }, "/repo", () => false)).toThrow(/inside the repository/);
    expect(privateDir({ ONCO_RESEARCH_LEADS_DIR: "/repo/.cache/leads" }, "/repo", () => true)).toBe("/repo/.cache/leads");
    expect(privateDir({}, "/repo", () => false, "/Users/someone", "darwin")).toBe("/Users/someone/Library/Application Support/onco-research-leads");
    expect(privateDir({}, "/repo", () => false, "/home/someone", "linux")).toBe("/home/someone/.local/state/onco-research-leads");
  });
});

describe("the account list", () => {
  it("has unique ids, well-formed handles and https everywhere", () => {
    expect(new Set(accounts.map((a) => a.id)).size).toBe(accounts.length);
    for (const a of accounts) {
      expect(a.site, a.id).toMatch(/^https:\/\//);
      expect(a.covers.length, a.id).toBeGreaterThan(10);
      if (a.x) expect(a.x.handle, a.id).toMatch(/^[A-Za-z0-9_]{1,15}$/);
      if (a.bluesky) expect(a.bluesky.handle, a.id).toMatch(/^([a-z0-9-]+\.)+[a-z]{2,}$/);
      for (const f of a.feeds ?? []) expect(f.url, a.id).toMatch(/^https:\/\//);
    }
  });
  it("records where every handle was verified, on the organisation's own pages and never on the network itself", () => {
    const social = /(^|\.)(x\.com|twitter\.com|bsky\.app|bsky\.social)$/;
    for (const a of accounts) {
      if (a.x) expect(social.test(new URL(a.x.linkedFrom).hostname), a.id).toBe(false);
      if (a.bluesky?.basis === "linked-from-own-site") expect(a.bluesky.linkedFrom && !social.test(new URL(a.bluesky.linkedFrom).hostname), a.id).toBe(true);
      // A domain handle is its own proof only when it is not a handle anyone can register.
      if (a.bluesky?.basis === "domain-handle") expect(a.bluesky.handle, a.id).not.toMatch(/\.bsky\.social$/);
    }
  });
  it("covers every category, caps the companies and yields sources with unique ids and feeds", () => {
    const by = (c: string) => accounts.filter((a) => a.category === c).length;
    for (const c of ["regulator", "journal", "society", "agency", "centre", "trial-group", "patient-organisation", "trade-press", "company"]) expect(by(c), c).toBeGreaterThan(0);
    expect(by("company")).toBeLessThanOrEqual(COMPANY_CAP);
    const sources = sourcesFrom();
    expect(new Set(sources.map((s) => s.id)).size).toBe(sources.length);
    const feeds = sources.flatMap((s) => s.type === "feed" ? [s.url] : []);
    expect(new Set(feeds).size).toBe(feeds.length);
    expect(sources.some((s) => s.type === "bluesky" && s.handle === "fda.gov")).toBe(false); // a quiet account is not polled
    for (const t of ["feed", "bluesky", "pubmed", "registry", "oce"]) expect(sources.some((s) => s.type === t), t).toBe(true);
  });
  it("leaves the paid X monitor's default allow-list inside its own limit", () => {
    expect(defaultAccounts.length).toBeLessThanOrEqual(12);
  });
});
