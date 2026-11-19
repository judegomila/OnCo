/**
 * Research lead monitor that needs no account (docs/RESEARCH-LEAD-MONITOR.md).
 *
 * Reads the channels the organisations in scripts/research-lead-accounts.ts publish for programs to read: RSS and
 * Atom feeds, Bluesky's public AppView API, a PubMed search through E-utilities, a ClinicalTrials.gov search through
 * its data API, and the FDA oncology approvals table. It builds on scripts/x-research-monitor.ts and keeps its rules:
 *
 * - An item is a discovery lead, never evidence. Its text is read only to find identifiers and names, and is never
 *   stored. The queue holds identifiers, source URLs, dates and the OnCo records an item may concern.
 * - Leads are deduplicated by DOI, PubMed id and NCT number, each resolved by exact match at Crossref, Europe PMC or
 *   ClinicalTrials.gov. The title kept in the queue is the resolved record's, not the announcement's.
 * - Nothing is published. This script writes no record, opens no issue and starts no deploy.
 * - The queue is private: a directory outside the repository (ONCO_RESEARCH_LEADS_DIR, default
 *   ~/Library/Application Support/onco-research-leads/ on macOS), mode 0700. A directory inside the checkout is
 *   refused unless git ignores it. The script prints counts only. It is not run by a GitHub workflow.
 *
 * Feeds and pages are fetched with a generic user agent, only where robots.txt permits, at most one request a second
 * to a host, and with If-None-Match / If-Modified-Since. Every source keeps its own checkpoint.
 *
 *   npx tsx scripts/research-lead-monitor.ts                 read every source, update the private queue
 *   npx tsx scripts/research-lead-monitor.ts --verify        check that every source answers and parses; writes nothing
 *   options: --days=30 --types=feed,bluesky,pubmed,registry,oce --max-items=60 --max-evidence=150 --max-landing=40
 */
import { createHash } from "node:crypto";
import { mkdir, open, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { FDA_OCE_URL, NameMatcher, ONCO_WORDS, decodeEntities, matchableFromGraph, parseOcePage, tagText } from "./feed-utils";
import { accounts as allAccounts, type Account, type Scope } from "./research-lead-accounts";
import { doiPattern, evidenceFor, gitIgnores, idKey, privateDir, readLandingPage, tokenFromLink, type Evidence, type Identifier } from "./x-research-monitor";

export const PRODUCT = "research-lead-monitor";
/** Generic on purpose: no name, address or project. ONCO_LEAD_MONITOR_UA replaces it where a contact URL is wanted. */
export const DEFAULT_UA = `${PRODUCT}/1.0 (oncology reference; automated feed reader)`;

export type Source =
  | { id: string; type: "feed"; url: string; scope: Scope; hosts: string[]; regulator: boolean }
  | { id: string; type: "bluesky"; handle: string; hosts: string[]; regulator: boolean }
  | { id: string; type: "pubmed"; term: string }
  | { id: string; type: "registry"; condition: string }
  | { id: string; type: "oce"; url: string };
export type SourceType = Source["type"];

export type Checkpoint = {
  checkedAt: string; status: "ok" | "not-modified" | "refused" | "error"; detail?: string;
  etag?: string; lastModified?: string; seen: string[];
};
export type OncoRecord = { id: string; kind: string; by: "doi" | "pmid" | "nct" | "name" };
export type Lead = { source: string; url: string; date?: string };
export type Standing = "identifier-held" | "names-existing-record" | "no-match";
export type Candidate = {
  key: string; state: "resolved-source-review" | "regulator-notice-review" | "unverified-lead";
  /** 1 a regulator's own notice, 2 a registry record or a paper that names a record OnCo holds, 3 the rest. */
  priority: 1 | 2 | 3;
  firstQueued: string; leads: Lead[]; evidence?: Evidence; records: OncoRecord[]; standing: Standing;
};
export type Queue = { version: 2; sources: Record<string, Checkpoint>; candidates: Candidate[] };
export type Corpus = { byIdentifier(key: string): OncoRecord[]; byText(text: string): OncoRecord[] };
/** One announcement. `text` is used in memory to find identifiers and names and is never written anywhere. */
export type Item = { url: string; date?: string; ids: Identifier[]; text: string; links?: string[] };
export type Opts = {
  sources?: Source[]; corpus?: Corpus; fetcher?: typeof fetch; now?: Date; ua?: string;
  days?: number; maxItems?: number; maxEvidence?: number; maxLanding?: number; minDelayMs?: number;
  sleep?: (ms: number) => Promise<void>; types?: SourceType[];
  /** Called with the queue after each source, so a long run can save as it goes. */
  afterSource?: (queue: Queue) => Promise<void>;
};

export const emptyQueue = (): Queue => ({ version: 2, sources: {}, candidates: [] });
const hash = (s: string): string => createHash("sha256").update(s).digest("hex").slice(0, 16);
const host = (url: string): string | undefined => { try { return new URL(url).hostname; } catch { return undefined; } };
const isoDay = (d: Date): string => d.toISOString().slice(0, 10);

// ---------------------------------------------------------------------------------------------------------------
// Sources, derived from the account list
// ---------------------------------------------------------------------------------------------------------------

/** Journals whose own feeds robots.txt closes to programs, or which offer none: read through PubMed instead. */
const PUBMED_JOURNALS = ["N Engl J Med", "Lancet", "Lancet Oncol", "J Clin Oncol", "Blood", "JAMA Oncol", "Ann Oncol", "J Natl Cancer Inst", "Lancet Haematol", "JAMA", "Nat Med"];
const journalClause = `(${PUBMED_JOURNALS.map((j) => `"${j}"[jour]`).join(" OR ")})`;
const CANCER_CLAUSE = "(neoplasms[mh] OR cancer[tiab] OR carcinoma[tiab] OR lymphoma[tiab] OR leukemia[tiab] OR leukaemia[tiab] OR myeloma[tiab] OR melanoma[tiab] OR sarcoma[tiab] OR glioma[tiab])";

export const FIXED_SOURCES: Source[] = [
  { id: "oce:fda", type: "oce", url: FDA_OCE_URL },
  { id: "pubmed:phase3-and-randomised", type: "pubmed", term: `${journalClause} AND ${CANCER_CLAUSE} AND ("clinical trial, phase iii"[pt] OR "randomized controlled trial"[pt])` },
  { id: "pubmed:guidelines", type: "pubmed", term: `${CANCER_CLAUSE} AND ("practice guideline"[pt] OR "guideline"[pt]) AND ("J Clin Oncol"[jour] OR "Ann Oncol"[jour] OR "ESMO Open"[jour] OR "J Natl Compr Canc Netw"[jour] OR "Blood"[jour] OR "Lancet Oncol"[jour])` },
  { id: "registry:phase3-results", type: "registry", condition: "cancer OR neoplasm OR carcinoma OR lymphoma OR leukemia OR myeloma OR melanoma OR sarcoma" },
];

export function sourcesFrom(list: readonly Account[] = allAccounts): Source[] {
  const out: Source[] = [...FIXED_SOURCES];
  for (const a of list) {
    const regulator = a.category === "regulator";
    const hosts = [...new Set([a.site, ...(a.feeds ?? []).map((f) => f.url)].map(host).filter((h): h is string => !!h))];
    (a.feeds ?? []).forEach((f, i) => out.push({ id: `feed:${a.id}:${i + 1}`, type: "feed", url: f.url, scope: f.scope, hosts, regulator }));
    if (a.bluesky && !a.bluesky.quiet) out.push({ id: `bluesky:${a.id}`, type: "bluesky", handle: a.bluesky.handle, hosts, regulator });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// robots.txt (RFC 9309: longest match wins, Allow wins a tie, a missing file permits, an unreachable one forbids)
// ---------------------------------------------------------------------------------------------------------------

export type Robots = { allowed(pathAndQuery: string): boolean; crawlDelay?: number };
const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function parseRobots(text: string, product = PRODUCT): Robots {
  type Group = { agents: string[]; rules: { allow: boolean; path: string }[]; delay?: number };
  const groups: Group[] = [];
  let cur: Group | undefined;
  let inAgents = false;
  for (const raw of text.split(/\r?\n/)) {
    const m = raw.replace(/#.*/, "").trim().match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === "user-agent") {
      if (!cur || !inAgents) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      inAgents = true;
      continue;
    }
    inAgents = false;
    if (!cur) continue;
    if ((key === "allow" || key === "disallow") && val) cur.rules.push({ allow: key === "allow", path: val });
    else if (key === "crawl-delay" && Number.isFinite(Number(val))) cur.delay = Number(val);
  }
  const named = groups.filter((g) => g.agents.includes(product.toLowerCase()));
  const chosen = named.length ? named : groups.filter((g) => g.agents.includes("*"));
  const rules = chosen.flatMap((g) => g.rules).map((r) => ({
    ...r, re: new RegExp("^" + r.path.replace(/\$$/, "").split("*").map(escapeRe).join(".*") + (r.path.endsWith("$") ? "$" : "")),
  }));
  return {
    crawlDelay: chosen.map((g) => g.delay).find((d) => d !== undefined),
    allowed(path) {
      let best: { allow: boolean; len: number } | undefined;
      for (const r of rules) {
        if (!r.re.test(path)) continue;
        if (!best || r.path.length > best.len || (r.path.length === best.len && r.allow)) best = { allow: r.allow, len: r.path.length };
      }
      return best?.allow ?? true;
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Polite fetching
// ---------------------------------------------------------------------------------------------------------------

const MAX_BODY = 6 * 1024 * 1024;
export type Got = { status: number; body?: string; etag?: string; lastModified?: string; url: string };

export class Polite {
  private robots = new Map<string, Promise<Robots>>();
  private last = new Map<string, number>();
  readonly fetcher: typeof fetch;
  private readonly ua: string;
  private readonly minDelayMs: number;
  private readonly sleep: (ms: number) => Promise<void>;

  constructor(o: Pick<Opts, "fetcher" | "ua" | "minDelayMs" | "sleep">) {
    this.ua = o.ua ?? DEFAULT_UA;
    this.minDelayMs = o.minDelayMs ?? 1000;
    this.sleep = o.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
    const base = o.fetcher ?? fetch;
    // Every request carries the user agent and waits its turn for the host, including the identifier resolvers.
    this.fetcher = (async (input: Parameters<typeof fetch>[0], init?: RequestInit) => {
      const url = input instanceof URL ? input : new URL(typeof input === "string" ? input : input.url);
      await this.turn(url.hostname);
      return base(url, { ...init, headers: { ...(init?.headers as Record<string, string> | undefined), "User-Agent": this.ua } });
    }) as typeof fetch;
  }

  private async turn(hostname: string, delay = this.minDelayMs): Promise<void> {
    const wait = (this.last.get(hostname) ?? 0) + delay - Date.now();
    if (wait > 0) await this.sleep(wait);
    this.last.set(hostname, Date.now());
  }

  private rulesFor(origin: string): Promise<Robots> {
    let r = this.robots.get(origin);
    if (!r) {
      r = (async () => {
        try {
          const res = await this.fetcher(new URL("/robots.txt", origin), { redirect: "follow", signal: AbortSignal.timeout(20_000) });
          if (res.status >= 500) return { allowed: () => false };
          if (!res.ok) return { allowed: () => true };
          return parseRobots((await res.text()).slice(0, 500_000));
        } catch { return { allowed: () => false }; }
      })();
      this.robots.set(origin, r);
    }
    return r;
  }

  async allowed(raw: string): Promise<boolean> {
    const url = new URL(raw);
    if (url.protocol !== "https:") return false;
    return (await this.rulesFor(url.origin)).allowed(url.pathname + url.search);
  }

  /** A page or feed: robots.txt is consulted for every hop, and redirects are followed by hand, over https only. */
  async page(raw: string, cond: { etag?: string; lastModified?: string } = {}, accept = "*/*"): Promise<Got> {
    let url = raw;
    for (let hop = 0; hop < 4; hop++) {
      if (!(await this.allowed(url))) return { status: 0, url };
      const rules = await this.rulesFor(new URL(url).origin);
      if (rules.crawlDelay) await this.turn(new URL(url).hostname, Math.min(rules.crawlDelay, 30) * 1000);
      const res = await this.fetcher(new URL(url), {
        redirect: "manual", signal: AbortSignal.timeout(45_000),
        headers: { Accept: accept, ...(hop === 0 && cond.etag ? { "If-None-Match": cond.etag } : {}), ...(hop === 0 && cond.lastModified ? { "If-Modified-Since": cond.lastModified } : {}) },
      });
      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const next = res.headers.get("location");
        if (!next) return { status: res.status, url };
        // A redirect to plain http is retried over https and never followed in the clear.
        url = new URL(next, url).href.replace(/^http:/, "https:");
        continue;
      }
      if (res.status !== 200) return { status: res.status, url };
      const body = await res.text();
      if (body.length > MAX_BODY) return { status: 413, url };
      return { status: 200, body, url, etag: res.headers.get("etag") ?? undefined, lastModified: res.headers.get("last-modified") ?? undefined };
    }
    return { status: 310, url };
  }

  /** A documented data API, called under its own published terms rather than as a crawl. */
  async api<T>(url: URL): Promise<T> {
    const res = await this.fetcher(url, { redirect: "error", signal: AbortSignal.timeout(30_000), headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${url.hostname} returned HTTP ${res.status}`);
    return await res.json() as T;
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------------------------------------------

const cleanDoi = (s: string): string => decodeURIComponent(s).replace(/[.,;:)\]]+$/, "").toLowerCase();

/** Stable identifiers a link carries. Guesses from publisher paths are safe: each is confirmed by exact match later. */
export function idsFromUrl(raw: string): Identifier[] {
  let url: URL;
  try { url = new URL(raw.replace(/^http:/, "https:")); } catch { return []; }
  if (url.protocol !== "https:") return [];
  const out: Identifier[] = [];
  const add = (id?: Identifier) => { if (id && (id.type !== "doi" || doiPattern.test(id.value))) out.push(id); };
  let path = url.pathname;
  try { path = decodeURIComponent(path); } catch { /* keep the raw path */ }
  if (url.hostname === "dx.doi.org") url.hostname = "doi.org";
  add(tokenFromLink(url.origin + url.pathname));
  const h = url.hostname.replace(/^www\./, "");
  const nct = path.match(/\b(NCT\d{8})\b/i)?.[1];
  if (h === "clinicaltrials.gov" && nct) add({ type: "nct", value: nct.toUpperCase() });
  const inPath = path.match(/\/doi\/(?:abs\/|full\/|pdf\/|epdf\/|epub\/)?(10\.\d{4,9}\/[^\s?#]+)/i)?.[1];
  if (inPath) add({ type: "doi", value: cleanDoi(inPath) });
  const nature = h === "nature.com" ? path.match(/^\/articles\/([a-z0-9-]+)\/?$/i)?.[1] : undefined;
  if (nature) add({ type: "doi", value: `10.1038/${nature.toLowerCase()}` });
  const pii = path.match(/\/(?:article|fulltext)\/(?:PII)?(S\d{4}-\d{3}[\dX]\(\d{2}\)\d{5}-[\dX])/i)?.[1];
  if (pii) add({ type: "doi", value: `10.1016/${pii.toLowerCase()}` });
  return [...new Map(out.map((id) => [idKey(id), id])).values()];
}

/** Identifiers in a block of markup or text. The text itself goes no further than this function's caller. */
export function idsFromText(block: string): Identifier[] {
  const text = decodeEntities(block);
  const ids = new Map<string, Identifier>();
  const add = (id: Identifier) => { if (ids.size < 6) ids.set(idKey(id), id); };
  for (const m of text.matchAll(/https?:\/\/[^\s"'<>\]]+/gi)) for (const id of idsFromUrl(m[0].replace(/[.,;!?)]+$/, ""))) add(id);
  for (const m of text.matchAll(/<(?:dc:identifier|prism:doi|guid)[^>]*>\s*(?:<!\[CDATA\[)?\s*(?:doi:\s*)?(10\.\d{4,9}\/[^\s<\]]+)/gi)) {
    const value = cleanDoi(m[1]);
    if (doiPattern.test(value)) add({ type: "doi", value });
  }
  for (const m of text.matchAll(/\bNCT\d{8}\b/gi)) add({ type: "nct", value: m[0].toUpperCase() });
  for (const m of text.matchAll(/\bPMID\s*[:#]?\s*(\d{1,10})\b/gi)) add({ type: "pmid", value: m[1] });
  return [...ids.values()];
}

// ---------------------------------------------------------------------------------------------------------------
// Parsers: each returns items whose text is transient
// ---------------------------------------------------------------------------------------------------------------

const isoDate = (s?: string): string | undefined => {
  if (!s) return undefined;
  const t = Date.parse(s.replace(/^[A-Za-z]{3},\s*(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2"));
  return Number.isNaN(t) ? undefined : new Date(t).toISOString().slice(0, 10);
};

/** RSS 2.0, RSS 1.0 (RDF) and Atom. */
export function parseItems(xml: string, base?: string): Item[] {
  const out: Item[] = [];
  for (const b of xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>|<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/gi) ?? []) {
    let link = tagText(b, "link") ?? "";
    if (!link) {
      const href = b.match(/<link\b(?=[^>]*rel=["']alternate["'])[^>]*?href=["']([^"']+)["']/i)?.[1] ?? b.match(/<link\b[^>]*?href=["']([^"']+)["']/i)?.[1]
        ?? b.match(/<item[^>]*rdf:about=["']([^"']+)["']/i)?.[1];
      if (href) link = decodeEntities(href);
    }
    if (!link) { const guid = tagText(b, "guid"); if (guid && /^https?:/.test(guid)) link = guid; }
    try { link = new URL(link.trim(), base).href.replace(/^http:/, "https:"); } catch { continue; }
    const rawDate = tagText(b, "pubDate") ?? tagText(b, "dc:date") ?? tagText(b, "published") ?? tagText(b, "updated") ?? tagText(b, "prism:publicationDate") ?? tagText(b, "prism:coverDate");
    const text = `${tagText(b, "title") ?? ""} ${tagText(b, "description") ?? tagText(b, "summary") ?? tagText(b, "content") ?? ""}`;
    out.push({ url: link, date: isoDate(rawDate), ids: idsFromText(b), text });
  }
  return out;
}

type BskyFeed = { feed?: { reason?: unknown; post?: {
  uri?: string; author?: { handle?: string };
  record?: { text?: string; createdAt?: string; reply?: unknown; facets?: { features?: { uri?: string }[] }[]; embed?: { external?: { uri?: string } } };
  embed?: { external?: { uri?: string } };
} }[] };

/** The account's own posts: no reposts, no replies. Links come from the post's structured fields. */
export function parseBluesky(data: BskyFeed, handle: string): Item[] {
  const out: Item[] = [];
  for (const row of data.feed ?? []) {
    const post = row.post;
    const rkey = post?.uri?.match(/^at:\/\/[^/]+\/app\.bsky\.feed\.post\/([a-zA-Z0-9]+)$/)?.[1];
    if (!post || !rkey || row.reason || post.record?.reply || post.author?.handle?.toLowerCase() !== handle.toLowerCase()) continue;
    const links = [...new Set([
      ...(post.record?.facets ?? []).flatMap((f) => (f.features ?? []).map((x) => x.uri)),
      post.record?.embed?.external?.uri, post.embed?.external?.uri,
    ].filter((u): u is string => typeof u === "string" && /^https:\/\//.test(u)))];
    const text = post.record?.text ?? "";
    const ids = new Map<string, Identifier>();
    for (const id of [...links.flatMap(idsFromUrl), ...idsFromText(text)]) ids.set(idKey(id), id);
    out.push({ url: `https://bsky.app/profile/${handle}/post/${rkey}`, date: isoDate(post.record?.createdAt), ids: [...ids.values()], text, links });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// Reading one source
// ---------------------------------------------------------------------------------------------------------------

type Read = { status: Checkpoint["status"]; detail?: string; items: Item[]; etag?: string; lastModified?: string };
const RESEARCH_WORDS = /\b(research|study|studies|trial|trials|paper|abstract|publication|published|approv\w*|authori[sz]\w*|guideline\w*|results|data)\b/i;

async function readSource(src: Source, prev: Checkpoint | undefined, net: Polite, since: string): Promise<Read> {
  if (src.type === "feed" || src.type === "oce") {
    const got = await net.page(src.url, prev ?? {}, src.type === "feed" ? "application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.1" : "text/html");
    if (got.status === 304) return { status: "not-modified", items: [] };
    if (got.status === 0) return { status: "refused", detail: "robots.txt", items: [] };
    if (got.status !== 200 || !got.body) return { status: got.status === 401 || got.status === 403 ? "refused" : "error", detail: `HTTP ${got.status}`, items: [] };
    const items = src.type === "feed" ? parseItems(got.body, got.url)
      : parseOcePage(got.body).map((r) => ({ url: r.url, date: r.date, ids: idsFromText(r.summary), text: `${r.title} ${r.summary}` }));
    if (!items.length) return { status: "error", detail: "no items parsed", items: [] };
    return { status: "ok", items, etag: got.etag, lastModified: got.lastModified };
  }
  if (src.type === "bluesky") {
    const url = new URL("https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed");
    url.search = new URLSearchParams({ actor: src.handle, limit: "50", filter: "posts_no_replies" }).toString();
    return { status: "ok", items: parseBluesky(await net.api<BskyFeed>(url), src.handle) };
  }
  if (src.type === "pubmed") {
    const url = new URL("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi");
    const days = Math.max(1, Math.ceil((Date.now() - Date.parse(since)) / 86_400_000));
    url.search = new URLSearchParams({ db: "pubmed", retmode: "json", retmax: "200", sort: "pub_date", datetype: "edat", reldate: String(days), term: src.term, tool: PRODUCT }).toString();
    const data = await net.api<{ esearchresult?: { idlist?: string[] } }>(url);
    const list = data.esearchresult?.idlist;
    if (!Array.isArray(list)) return { status: "error", detail: "no id list", items: [] };
    return { status: "ok", items: list.filter((p) => /^\d{1,10}$/.test(p)).map((p) => ({ url: `https://pubmed.ncbi.nlm.nih.gov/${p}/`, ids: [{ type: "pmid" as const, value: p }], text: "" })) };
  }
  const url = new URL("https://clinicaltrials.gov/api/v2/studies");
  url.search = new URLSearchParams({
    "query.cond": src.condition, "filter.advanced": `AREA[Phase]PHASE3 AND AREA[ResultsFirstPostDate]RANGE[${since},MAX]`,
    fields: "NCTId,ResultsFirstPostDate", pageSize: "100", sort: "ResultsFirstPostDate:desc",
  }).toString();
  type Row = { protocolSection?: { identificationModule?: { nctId?: string }; statusModule?: { resultsFirstPostDateStruct?: { date?: string } } } };
  const data = await net.api<{ studies?: Row[] }>(url);
  if (!Array.isArray(data.studies)) return { status: "error", detail: "no studies list", items: [] };
  return { status: "ok", items: data.studies.flatMap((s) => {
    const nct = s.protocolSection?.identificationModule?.nctId;
    return nct && /^NCT\d{8}$/.test(nct) ? [{ url: `https://clinicaltrials.gov/study/${nct}`, date: isoDate(s.protocolSection?.statusModule?.resultsFirstPostDateStruct?.date), ids: [{ type: "nct" as const, value: nct }], text: "" }] : [];
  }) };
}

// ---------------------------------------------------------------------------------------------------------------
// The queue
// ---------------------------------------------------------------------------------------------------------------

function standingOf(records: OncoRecord[]): Standing {
  return records.some((r) => r.by !== "name") ? "identifier-held" : records.length ? "names-existing-record" : "no-match";
}

export function mergeCandidate(candidates: Candidate[], row: Candidate): Candidate[] {
  const ids = new Set(row.evidence?.ids ?? []);
  const same = (x: Candidate) => x.key === row.key || !!x.evidence?.ids.some((id) => ids.has(id));
  const matched = candidates.filter(same);
  const leads = [...new Map([...matched.flatMap((x) => x.leads), ...row.leads].map((l) => [l.url, l])).values()].sort((a, b) => a.url.localeCompare(b.url));
  const records = [...new Map([...matched.flatMap((x) => x.records), ...row.records].map((r) => [`${r.id}|${r.by}`, r])).values()].sort((a, b) => a.id.localeCompare(b.id) || a.by.localeCompare(b.by));
  const allIds = [...new Set([...ids, ...matched.flatMap((x) => x.evidence?.ids ?? [])])].sort();
  const evidence = row.evidence ?? matched.find((x) => x.evidence)?.evidence;
  return [...candidates.filter((x) => !same(x)), {
    ...row, key: allIds[0] ?? row.key, leads, records, standing: standingOf(records),
    priority: Math.min(row.priority, ...matched.map((x) => x.priority)) as Candidate["priority"],
    firstQueued: [row.firstQueued, ...matched.map((x) => x.firstQueued)].sort()[0],
    evidence: evidence ? { ...evidence, ids: allIds } : undefined,
  }];
}

const NO_CORPUS: Corpus = { byIdentifier: () => [], byText: () => [] };

/** Reads every source once. Returns the next queue; the caller writes it. A failed source keeps its old checkpoint. */
export async function scan(old: Queue, opts: Opts = {}): Promise<{ queue: Queue; report: Record<string, { status: string; fresh: number; detail?: string }> }> {
  const now = opts.now ?? new Date();
  const today = isoDay(now);
  const since = isoDay(new Date(now.getTime() - (opts.days ?? 30) * 86_400_000));
  const sources = (opts.sources ?? sourcesFrom()).filter((s) => !opts.types || opts.types.includes(s.type));
  if (new Set(sources.map((s) => s.id)).size !== sources.length) throw new Error("Duplicate source id");
  const corpus = opts.corpus ?? NO_CORPUS;
  const net = new Polite(opts);
  const next: Queue = structuredClone(old);
  const remembered = new Map<string, Evidence>();
  for (const row of old.candidates) for (const id of row.evidence?.ids ?? []) remembered.set(id, row.evidence!);
  let evidenceLeft = opts.maxEvidence ?? 150;
  let landingLeft = opts.maxLanding ?? 40;
  const report: Record<string, { status: string; fresh: number; detail?: string }> = {};

  for (const src of sources) {
    const prev = Object.hasOwn(old.sources, src.id) ? old.sources[src.id] : undefined;
    let read: Read;
    try { read = await readSource(src, prev, net, since); }
    catch (err) { read = { status: "error", detail: err instanceof Error ? err.message.slice(0, 120) : "failed", items: [] }; }
    if (read.status !== "ok") {
      // Nothing new was read: keep what was seen and the validators, and record how the attempt went.
      next.sources[src.id] = { ...(prev ?? { seen: [] }), checkedAt: now.toISOString(), status: read.status, detail: read.detail };
      report[src.id] = { status: read.status, fresh: 0, detail: read.detail };
      continue;
    }
    const seen = new Set(prev?.seen ?? []);
    const fresh = read.items
      .filter((it) => !seen.has(hash(it.url)) && (!it.date || it.date >= since))
      .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
    let consumed = 0;
    let queued = 0;
    let deferred = 0;
    for (const item of fresh) {
      if (consumed >= (opts.maxItems ?? 60)) break;
      // A regulator's notice on the regulator's own host is itself a primary source; everything else needs one found.
      const regulatorOwn = src.type === "oce" || (src.type === "feed" && src.regulator && src.hosts.includes(host(item.url) ?? ""));
      const named = item.text ? corpus.byText(item.text) : [];
      const ids = new Map(item.ids.map((id) => [idKey(id), id]));
      // Topical gate before any further request: general channels must mention cancer or name a record OnCo holds.
      const general = (src.type === "feed" && src.scope === "general") || src.type === "bluesky";
      if (general && !ids.size && !named.length && !ONCO_WORDS.test(item.text)) { seen.add(hash(item.url)); consumed++; continue; }
      if (src.type === "bluesky" && !ids.size && !(item.links?.length && RESEARCH_WORDS.test(item.text))) { seen.add(hash(item.url)); consumed++; continue; }
      // One landing page on the organisation's own host, where the announcement itself carries no identifier.
      if (!ids.size && (src.type === "feed" || src.type === "bluesky") && landingLeft > 0) {
        const page = [item.url, ...(item.links ?? [])].find((u) => src.hosts.includes(host(u) ?? ""));
        if (page) {
          landingLeft--;
          try {
            if (await net.allowed(page)) for (const id of (await readLandingPage(page, { domains: src.hosts }, net.fetcher)).tokens.slice(0, 6)) ids.set(idKey(id), id);
          } catch { /* a refused or oversized page leaves a lead for a person to open */ }
        }
      }
      const unresolved = [...ids.values()].filter((id) => !remembered.has(idKey(id)));
      if (unresolved.length > evidenceLeft) break; // not consumed: the next run starts here
      const lead: Lead = { source: src.id, url: item.url, date: item.date };
      // Resolve first, queue second: a resolver that is down (as opposed to one that answers "no such record")
      // leaves the item untouched for the next run rather than filing it as unverifiable.
      const found: Evidence[] = [];
      let resolverDown = false;
      for (const id of ids.values()) {
        let evidence = remembered.get(idKey(id));
        if (!evidence) {
          evidenceLeft--;
          try { evidence = await evidenceFor(id, net.fetcher, false); } catch { resolverDown = true; }
        }
        if (evidence) found.push(evidence);
      }
      if (resolverDown && !found.length) { deferred++; continue; }
      let resolved = false;
      for (const evidence of found) {
        for (const alias of evidence.ids) remembered.set(alias, evidence);
        const records = [...evidence.ids.flatMap((k) => corpus.byIdentifier(k)), ...corpus.byText(evidence.title), ...named];
        const isTrial = evidence.ids.some((k) => k.startsWith("nct:"));
        next.candidates = mergeCandidate(next.candidates, {
          key: evidence.ids[0], state: "resolved-source-review", priority: regulatorOwn ? 1 : isTrial || records.length ? 2 : 3,
          firstQueued: today, leads: [lead], evidence, records, standing: "no-match",
        });
        resolved = true;
      }
      if (!resolved) {
        next.candidates = mergeCandidate(next.candidates, regulatorOwn
          ? { key: `url:${item.url}`, state: "regulator-notice-review", priority: 1, firstQueued: today, leads: [lead], records: named, standing: "no-match" }
          : { key: `lead:${hash(item.url)}`, state: "unverified-lead", priority: named.length ? 2 : 3, firstQueued: today, leads: [lead], records: named, standing: "no-match" });
      }
      seen.add(hash(item.url));
      consumed++;
      queued++;
    }
    const complete = consumed === fresh.length && !deferred;
    next.sources[src.id] = {
      checkedAt: now.toISOString(), status: "ok", seen: [...seen].slice(-1500),
      // Validators are kept only once every new item has been taken in; otherwise a 304 would hide the remainder.
      ...(complete ? { etag: read.etag, lastModified: read.lastModified } : {}),
    };
    report[src.id] = { status: complete ? "ok" : "ok, more next run", fresh: queued };
    await opts.afterSource?.(next);
  }
  next.candidates.sort((a, b) => a.priority - b.priority || a.key.localeCompare(b.key));
  return { queue: next, report };
}

/** Checks that each source answers, is permitted and parses. Writes nothing. */
export async function verify(opts: Opts = {}): Promise<{ id: string; type: SourceType; status: string; items: number; detail?: string }[]> {
  const net = new Polite(opts);
  const since = isoDay(new Date((opts.now ?? new Date()).getTime() - (opts.days ?? 30) * 86_400_000));
  const out = [];
  for (const src of (opts.sources ?? sourcesFrom()).filter((s) => !opts.types || opts.types.includes(s.type))) {
    let read: Read;
    try { read = await readSource(src, undefined, net, since); }
    catch (err) { read = { status: "error", detail: err instanceof Error ? err.message.slice(0, 120) : "failed", items: [] }; }
    out.push({ id: src.id, type: src.type, status: read.status, items: read.items.length, detail: read.detail });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// The corpus on disk, the private files and the command
// ---------------------------------------------------------------------------------------------------------------

type GraphEntity = { id: string; kind: string; name: string; aka: string[]; doi?: string; pmid?: string; nct?: string; links?: { url: string }[] } & Record<string, unknown>;

export function corpusFrom(entities: GraphEntity[]): Corpus {
  const index = new Map<string, OncoRecord[]>();
  const put = (key: string, rec: OncoRecord) => { const list = index.get(key) ?? []; if (!list.some((r) => r.id === rec.id)) list.push(rec); index.set(key, list); };
  for (const e of entities) {
    if (e.doi) put(`doi:${e.doi.toLowerCase()}`, { id: e.id, kind: e.kind, by: "doi" });
    if (e.pmid) put(`pmid:${e.pmid}`, { id: e.id, kind: e.kind, by: "pmid" });
    if (e.nct) put(`nct:${e.nct.toUpperCase()}`, { id: e.id, kind: e.kind, by: "nct" });
    for (const l of e.links ?? []) for (const id of idsFromUrl(l.url)) put(idKey(id), { id: e.id, kind: e.kind, by: id.type });
  }
  const kinds = ["drug", "trial"];
  const matcher = new NameMatcher(matchableFromGraph(entities), kinds);
  const kindOf = new Map(entities.map((e) => [e.id, e.kind]));
  return {
    byIdentifier: (key) => index.get(key) ?? [],
    byText: (text) => matcher.match(text, kinds).slice(0, 8).map((id) => ({ id, kind: kindOf.get(id) ?? "drug", by: "name" as const })),
  };
}

export function renderQueue(q: Queue, today: string): string {
  const groups: [Candidate["state"], string][] = [["regulator-notice-review", "Regulator notices"], ["resolved-source-review", "Resolved papers and registry records"], ["unverified-lead", "Leads with no resolved source"]];
  const line = (c: Candidate) => {
    const where = c.evidence ? `${c.evidence.ids.join(", ")} · ${c.evidence.title.replace(/\s+/g, " ").slice(0, 160)} · <${c.evidence.url}>` : `<${c.leads[0]?.url}>`;
    const recs = c.records.length ? ` · OnCo: ${c.records.map((r) => `\`${r.id}\` (${r.by})`).join(", ")}` : "";
    return `- [ ] P${c.priority} ${c.standing} · ${where}${recs} · seen ${c.leads.map((l) => l.date ?? "undated").sort()[0]} via ${[...new Set(c.leads.map((l) => l.source))].join(", ")}`;
  };
  return [
    `# Research leads (private, ${today})`, "",
    "Private. A lead can start research and nothing more: a record that follows is written from the primary source alone",
    "and says nothing, in the record, the commit or the changelog, about an announcement having prompted it.", "",
    ...groups.flatMap(([state, title]) => { const rows = q.candidates.filter((c) => c.state === state); return [`## ${title} (${rows.length})`, "", ...(rows.length ? rows.map(line) : ["None."]), ""]; }),
  ].join("\n");
}

async function main(): Promise<void> {
  const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
  const num = (name: string) => { const v = arg(name); if (v === undefined) return undefined; const n = Number(v); if (!Number.isInteger(n) || n < 1) throw new Error(`--${name} must be a positive whole number`); return n; };
  const types = arg("types")?.split(",") as SourceType[] | undefined;
  const opts: Opts = { ua: process.env.ONCO_LEAD_MONITOR_UA || undefined, days: num("days"), maxItems: num("max-items"), maxEvidence: num("max-evidence"), maxLanding: num("max-landing"), types };
  if (process.argv.includes("--verify")) {
    const rows = await verify(opts);
    for (const r of rows) console.log(`${r.status.padEnd(12)} ${String(r.items).padStart(4)}  ${r.id}${r.detail ? `  (${r.detail})` : ""}`);
    const bad = rows.filter((r) => r.status !== "ok");
    console.log(`research-lead-monitor: ${rows.length - bad.length} of ${rows.length} sources answer and parse.`);
    if (bad.length) process.exitCode = 1;
    return;
  }
  const repoRoot = resolve(dirname(new URL(import.meta.url).pathname), "..");
  const dir = privateDir(process.env, repoRoot, gitIgnores(repoRoot));
  await mkdir(dir, { recursive: true, mode: 0o700 });
  const statePath = join(dir, "queue.json");
  const lockPath = `${statePath}.lock`;
  const lock = await open(lockPath, "wx", 0o600);
  try {
    let queue = emptyQueue();
    try {
      queue = JSON.parse(await readFile(statePath, "utf8")) as Queue;
      if (queue.version !== 2 || !queue.sources || !Array.isArray(queue.candidates)) throw new Error("Unsupported or invalid queue state");
    } catch (err) { if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err; }
    const { graph } = await import("../src/lib/graph");
    const before = queue.candidates.length;
    // The queue and its checkpoints are one file, replaced whole after every source: a run that is cut short loses
    // at most the source it was reading, and the next run carries on from the checkpoints.
    const save = async (q: Queue) => {
      const tmp = `${statePath}.${process.pid}.tmp`;
      await writeFile(tmp, JSON.stringify(q, null, 2) + "\n", { mode: 0o600 });
      await rename(tmp, statePath);
    };
    const { queue: next, report } = await scan(queue, { ...opts, corpus: corpusFrom(graph().entities as unknown as GraphEntity[]), afterSource: save });
    await save(next);
    await writeFile(join(dir, "queue.md"), renderQueue(next, isoDay(new Date())), { mode: 0o600 });
    // Counts only: this output may end up in a log.
    const by = (f: (c: Candidate) => boolean) => next.candidates.filter(f).length;
    const statuses = Object.values(report).reduce<Record<string, number>>((m, r) => { m[r.status] = (m[r.status] ?? 0) + 1; return m; }, {});
    console.log(`research-lead-monitor: ${Object.keys(report).length} sources (${Object.entries(statuses).map(([k, v]) => `${v} ${k}`).join(", ")}); ${next.candidates.length - before} new candidates, ${next.candidates.length} in the private queue: ${by((c) => c.state === "regulator-notice-review")} regulator notices, ${by((c) => c.state === "resolved-source-review")} resolved, ${by((c) => c.state === "unverified-lead")} unverified; nothing published.`);
  } finally {
    await lock.close();
    await unlink(lockPath);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((err: unknown) => { console.error(`research-lead-monitor: ${err instanceof Error ? err.message : "failed"}`); process.exitCode = 1; });
}
