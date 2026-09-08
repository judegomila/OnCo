/**
 * Weekly literature snapshot from Europe PMC for every drug, target, cancer, and technology.
 *
 *   public/papers/<id>.json   { id, kind, name, query, counts: {2019..2026}, last12, prior12, recent: [{title, doi, pmid, journal, date, source}], fetched }
 *   public/papers/index.json  { fetched, entities: { id: { kind, name, counts, last12, prior12, growth, total } } }
 *
 * Run: npm run fetch:papers   (network; ~5 requests/s; idempotent — skips ids fetched in the last 3 days unless --force)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { paperQuery, restUrl, type PaperLite } from "../src/lib/europepmc";

const OUT = join(process.cwd(), "public", "papers");
mkdirSync(OUT, { recursive: true });
const FORCE = process.argv.includes("--force");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const CONCURRENCY = 5;
const UA = "OnCo/1.0 (https://github.com/judegomila/OnCo; literature snapshot)";

type Snapshot = {
  id: string; kind: string; name: string; query: string; fetched: string;
  counts: Record<string, number>; last12: number; prior12: number;
  recent: Array<{ title: string; doi?: string; pmid?: string; journal?: string; date?: string; source: string; cited?: number }>;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getJson<T>(url: string, tries = 4): Promise<T> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (r.status === 429 || r.status >= 500) { await sleep(1500 * (i + 1)); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return (await r.json()) as T;
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(1000 * (i + 1));
    }
  }
  throw new Error("unreachable");
}

async function hitCount(query: string): Promise<number> {
  const j = await getJson<{ hitCount?: number }>(restUrl(query, { pageSize: 1, resultType: "idlist" }));
  return j.hitCount ?? 0;
}

function isoDaysAgo(d: number): string {
  const x = new Date(); x.setUTCDate(x.getUTCDate() - d); return x.toISOString().slice(0, 10);
}

async function snapshot(id: string, kind: string, name: string, query: string): Promise<Snapshot> {
  const counts: Record<string, number> = {};
  for (const y of YEARS) {
    counts[String(y)] = await hitCount(`(${query}) AND FIRST_PDATE:[${y}-01-01 TO ${y}-12-31]`);
    await sleep(60);
  }
  const today = isoDaysAgo(0), m12 = isoDaysAgo(365), m24 = isoDaysAgo(730);
  const last12 = await hitCount(`(${query}) AND FIRST_PDATE:[${m12} TO ${today}]`);
  const prior12 = await hitCount(`(${query}) AND FIRST_PDATE:[${m24} TO ${m12}]`);
  const rec = await getJson<{ resultList?: { result?: PaperLite[] } }>(restUrl(query, { pageSize: 5 }));
  const recent = (rec.resultList?.result ?? []).map((p) => ({ title: p.title, doi: p.doi, pmid: p.pmid, journal: p.journalTitle, date: p.firstPublicationDate, source: p.source, cited: p.citedByCount }));
  return { id, kind, name, query, fetched: today, counts, last12, prior12, recent };
}

async function main() {
  const g = graph();
  const targets = g.entities.filter((e) => ["drug", "target", "cancer", "technology"].includes(e.kind) && (!ONLY || e.id === ONLY));
  const jobs = targets.map((e) => ({ e, query: paperQuery(e as never) })).filter((j) => j.query) as Array<{ e: (typeof targets)[number]; query: string }>;
  console.log(`papers: ${jobs.length} entities with queries (of ${targets.length})`);

  const index: Record<string, { kind: string; name: string; counts: Record<string, number>; last12: number; prior12: number; growth: number | null; total: number }> = {};
  const indexPath = join(OUT, "index.json");
  if (existsSync(indexPath)) {
    try { Object.assign(index, (JSON.parse(readFileSync(indexPath, "utf8")) as { entities?: typeof index }).entities ?? {}); } catch { /* fresh */ }
  }

  let done = 0, skipped = 0, failed = 0;
  const queue = [...jobs];
  const worker = async () => {
    for (;;) {
      const job = queue.shift();
      if (!job) return;
      const path = join(OUT, `${job.e.id}.json`);
      if (!FORCE && existsSync(path)) {
        try {
          const prev = JSON.parse(readFileSync(path, "utf8")) as Snapshot;
          if (prev.fetched && (Date.now() - new Date(prev.fetched).getTime()) < 3 * 86400000 && prev.query === job.query) {
            index[job.e.id] = summarise(prev); skipped++; continue;
          }
        } catch { /* refetch */ }
      }
      try {
        const snap = await snapshot(job.e.id, job.e.kind, job.e.name, job.query);
        writeFileSync(path, JSON.stringify(snap));
        index[job.e.id] = summarise(snap);
        done++;
        if (done % 25 === 0) { console.log(`  ${done} fetched, ${skipped} cached, ${failed} failed, ${queue.length} left`); writeIndex(index); }
      } catch (e) {
        failed++; console.warn(`  failed ${job.e.id}: ${(e as Error).message}`);
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  writeIndex(index);
  console.log(`papers: ${done} fetched, ${skipped} cached, ${failed} failed → public/papers/index.json (${Object.keys(index).length} entities)`);
}

function summarise(s: Snapshot) {
  const total = Object.values(s.counts).reduce((a, b) => a + b, 0);
  const growth = s.prior12 >= 5 ? (s.last12 - s.prior12) / s.prior12 : null;
  return { kind: s.kind, name: s.name, counts: s.counts, last12: s.last12, prior12: s.prior12, growth, total };
}

function writeIndex(entities: Record<string, unknown>) {
  writeFileSync(join(OUT, "index.json"), JSON.stringify({ fetched: new Date().toISOString().slice(0, 10), source: "Europe PMC REST API", entities }));
}

main().catch((e) => { console.error(e); process.exit(1); });
