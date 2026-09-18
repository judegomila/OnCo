/**
 * IndexNow: tell search engines which pages changed, so new records are crawled within days rather than weeks.
 *
 * Picks every record whose last commit (public/provenance.json, written by `npm run provenance`) is on or after
 * a cut-off date, maps it to its page with routeFor, and POSTs the list to api.indexnow.org in batches of 10,000.
 *
 * Run: npm run indexnow -- --since=2026-09-17        (default: the last 7 days)
 *      npm run indexnow -- --since=2026-09-17 --dry  (print the count, send nothing)
 */
import { readFileSync } from "node:fs";
import { graph } from "../src/lib/graph";
import { routeFor } from "../src/lib/schema";

const KEY = "ff8eebe5ab72b3ebf022310440ba0474";
const HOST = "onco.cc";
const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const dry = process.argv.includes("--dry");
const since = arg("since") ?? new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

async function main() {
  const prov = JSON.parse(readFileSync("public/provenance.json", "utf8")) as Record<string, { date: string }>;
  const ids = new Set(Object.entries(prov).filter(([, v]) => v.date >= since).map(([k]) => k));
  const g = graph();
  const urls: string[] = [];
  for (const list of g.byKind.values()) for (const e of list) if (ids.has(e.id)) { try { urls.push(`https://${HOST}${routeFor(e)}`); } catch { /* no route */ } }
  console.log(`indexnow: ${urls.length} pages changed since ${since}`);
  if (dry || !urls.length) return;
  for (let i = 0; i < urls.length; i += 10000) {
    const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) });
    const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body });
    console.log(`indexnow: batch ${i / 10000 + 1} -> HTTP ${res.status}`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
