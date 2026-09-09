/**
 * Citation link validator with archiving. Network. Polite: one request at a time per host, a global
 * concurrency cap, retries with backoff, and a browser-like User-Agent because many journal and
 * regulator sites refuse bare clients.
 *
 * For every URL in the corpus (`links[].url`, `wikipedia`, `website`, `url`, guideline URLs, outcome,
 * toxicity, dosing and access `source` fields) it records:
 *   status      HTTP status of the final response (0 on network failure)
 *   ok          2xx, or 3xx that resolved
 *   finalUrl    where redirects ended, if different
 *   domainMoved the final host differs from the original (a sign the citation now points elsewhere)
 *   archive     nearest Wayback Machine snapshot, if any; a save is requested for broken URLs
 *
 * Writes public/links.json. The weekly workflow (.github/workflows/links.yml) opens a PR with the
 * result and /audit/ shows the broken-links section from it.
 *
 * Run: npx tsx scripts/check-links.ts [--limit N] [--no-archive] [--only <substring>]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor, type Entity } from "../src/lib/schema";

export type LinkRef = { id: string; kind: string; name: string; route: string; field: string; label?: string };
export type LinkResult = { url: string; status: number; ok: boolean; finalUrl?: string; domainMoved?: boolean; archive?: string; archiveRequested?: boolean; error?: string; checked: string; refs: LinkRef[] };
export type LinksReport = { generated: string; total: number; checked: number; broken: number; moved: number; archived: number; results: LinkResult[] };

const UA = "Mozilla/5.0 (compatible; OnCo link checker; +https://github.com/judegomila/OnCo)";
const MAX_CONCURRENCY = 6;
const PER_HOST_DELAY_MS = 1200;

/** Every external URL an entity cites, with the field it sits in. */
export function collectUrls(entities: Entity[]): Map<string, LinkRef[]> {
  const out = new Map<string, LinkRef[]>();
  const add = (url: string | undefined, e: Entity, field: string, label?: string) => {
    if (!url || !/^https?:\/\//i.test(url)) return;
    const ref: LinkRef = { id: e.id, kind: e.kind, name: e.name, route: routeFor(e), field, label };
    out.set(url, [...(out.get(url) ?? []), ref]);
  };
  for (const e of entities) {
    for (const l of e.links) add(l.url, e, "links", l.label);
    add(e.wikipedia, e, "wikipedia");
    if (e.kind === "company" || e.kind === "institution") add(e.website, e, "website");
    if (e.kind === "collection" || e.kind === "journal") add(e.url, e, "url");
    if (e.kind === "cancer") for (const r of e.standardOfCare) add(r.guideline?.url, e, `standardOfCare.guideline (${r.setting})`);
    if (e.kind === "trial") for (const o of e.outcomes) add(o.source, e, `outcomes.source (${o.endpoint})`);
    if (e.kind === "target") for (const p of e.prevalence) add(p.source, e, "prevalence.source");
    if (e.kind === "drug") {
      add(e.dosing?.source, e, "dosing.source");
      for (const t of e.toxicity) add(t.source, e, `toxicity.source (${t.event})`);
      for (const a of e.access) add(a.source, e, `access.source (${a.country})`);
      for (const r of e.regulatoryEvents) add(r.source, e, `regulatoryEvents.source (${r.date})`);
    }
    if (e.kind === "person") { for (const p of e.profiles) add(p.url, e, "profiles", p.label); for (const p of e.papers) add(p.url, e, "papers", p.title); }
    if (e.kind === "bottleneck") for (const m of e.metrics) add(m.url, e, `metrics (${m.label})`);
  }
  return out;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const hostOf = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };

async function fetchWithTimeout(url: string, init: RequestInit, ms = 20000): Promise<Response> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { ...init, signal: ctl.signal }); } finally { clearTimeout(t); }
}

/** HEAD first, GET on 405/403/501 or when HEAD errors; retry 429/5xx/network with backoff. */
export async function probe(url: string, attempt = 1): Promise<{ status: number; finalUrl?: string; error?: string }> {
  const headers = { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8", "Accept-Language": "en-GB,en;q=0.9" };
  try {
    let r = await fetchWithTimeout(url, { method: "HEAD", redirect: "follow", headers });
    if (r.status === 405 || r.status === 403 || r.status === 501 || r.status === 404) r = await fetchWithTimeout(url, { method: "GET", redirect: "follow", headers });
    if ((r.status === 429 || r.status >= 500) && attempt < 3) { await sleep(2000 * 2 ** attempt); return probe(url, attempt + 1); }
    return { status: r.status, finalUrl: r.url && r.url !== url ? r.url : undefined };
  } catch (e) {
    if (attempt < 3) { await sleep(2000 * 2 ** attempt); return probe(url, attempt + 1); }
    return { status: 0, error: String(e instanceof Error ? e.message : e).slice(0, 120) };
  }
}

/** Nearest Wayback snapshot, if any. */
export async function waybackAvailable(url: string): Promise<string | undefined> {
  try {
    const r = await fetchWithTimeout(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`, { headers: { "User-Agent": UA } });
    if (!r.ok) return undefined;
    const j = (await r.json()) as { archived_snapshots?: { closest?: { available?: boolean; url?: string } } };
    const c = j.archived_snapshots?.closest;
    return c?.available && c.url ? c.url.replace(/^http:/, "https:") : undefined;
  } catch { return undefined; }
}

/** Ask the Wayback Machine to capture a page. Fire and forget; the snapshot appears within minutes. */
export async function waybackSave(url: string): Promise<boolean> {
  try {
    const r = await fetchWithTimeout(`https://web.archive.org/save/${url}`, { method: "GET", redirect: "manual", headers: { "User-Agent": UA } }, 30000);
    return r.status < 500;
  } catch { return false; }
}

/** Run `fn` over items with a global concurrency cap and a per-host politeness delay. */
async function pooled<T>(items: string[], fn: (u: string) => Promise<T>, onDone: (u: string, r: T) => void): Promise<void> {
  const lastByHost = new Map<string, number>();
  const queue = [...items];
  const worker = async () => {
    while (queue.length) {
      const u = queue.shift()!;
      const h = hostOf(u);
      const wait = (lastByHost.get(h) ?? 0) + PER_HOST_DELAY_MS - Date.now();
      if (wait > 0) await sleep(wait);
      lastByHost.set(h, Date.now());
      onDone(u, await fn(u));
    }
  };
  await Promise.all(Array.from({ length: MAX_CONCURRENCY }, worker));
}

async function main() {
  const argv = process.argv.slice(2);
  const arg = (name: string) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
  const limit = Number(arg("--limit") ?? 0);
  const only = arg("--only");
  const archive = !argv.includes("--no-archive");

  const g = graph();
  const all = collectUrls(g.entities);
  let urls = [...all.keys()];
  if (only) urls = urls.filter((u) => u.includes(only));
  if (limit) urls = urls.slice(0, limit);

  // Reuse earlier archive lookups so weekly runs do not re-query the Wayback API for every URL.
  const prevPath = join(process.cwd(), "public", "links.json");
  const prev: Record<string, LinkResult> = {};
  if (existsSync(prevPath)) for (const r of (JSON.parse(readFileSync(prevPath, "utf8")) as LinksReport).results) prev[r.url] = r;

  const results: LinkResult[] = [];
  const checked = new Date().toISOString().slice(0, 10);
  let done = 0;
  await pooled(urls, probe, (url, p) => {
    const ok = p.status >= 200 && p.status < 400;
    const finalHost = p.finalUrl ? hostOf(p.finalUrl) : undefined;
    results.push({ url, status: p.status, ok, finalUrl: p.finalUrl, domainMoved: !!finalHost && finalHost !== hostOf(url) && !finalHost.endsWith(`.${hostOf(url)}`) && !hostOf(url).endsWith(`.${finalHost}`) ? true : undefined, error: p.error, checked, refs: all.get(url) ?? [], archive: prev[url]?.archive });
    done++;
    if (done % 100 === 0) console.log(`  ${done}/${urls.length}`);
  });

  if (archive) {
    const broken = results.filter((r) => !r.ok);
    console.log(`archiving: ${broken.length} broken links, looking up Wayback snapshots`);
    for (const r of broken) {
      if (!r.archive) r.archive = await waybackAvailable(r.url);
      if (!r.archive) { r.archiveRequested = await waybackSave(r.url); await sleep(3000); }
      await sleep(500);
    }
    // Also look up snapshots for a sample of working links each run so the archive fills in over time.
    const fresh = results.filter((r) => r.ok && !r.archive).slice(0, 150);
    for (const r of fresh) { r.archive = await waybackAvailable(r.url); await sleep(400); }
  }

  results.sort((a, b) => Number(a.ok) - Number(b.ok) || a.status - b.status || a.url.localeCompare(b.url));
  const report: LinksReport = { generated: new Date().toISOString(), total: all.size, checked: results.length, broken: results.filter((r) => !r.ok).length, moved: results.filter((r) => r.domainMoved).length, archived: results.filter((r) => r.archive).length, results };
  const out = join(process.cwd(), "public");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "links.json"), JSON.stringify(report, null, 0));
  console.log(`links: ${report.checked} of ${report.total} URLs checked; ${report.broken} broken; ${report.moved} moved domain; ${report.archived} with an archive copy`);
  for (const r of results.filter((r) => !r.ok).slice(0, 40)) console.log(`  [${r.status}] ${r.url} (${r.refs.map((x) => x.id).slice(0, 3).join(", ")})${r.archive ? ` archive: ${r.archive}` : ""}`);
}

if (process.argv[1]?.endsWith("check-links.ts")) main().catch((e) => { console.error(e); process.exit(1); });
