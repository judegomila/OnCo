/**
 * Load performance on a mid-range phone, measured, with a ratchet.
 *
 * Runs Lighthouse (mobile preset, devtools throttling: Chrome itself is slowed to a slow-4G line and a 4x slower CPU)
 * against a fixed set of page types and records the median of N runs per page: first contentful paint, largest
 * contentful paint, total blocking time, speed index and bytes downloaded.
 *
 * Devtools throttling rather than Lighthouse's default simulation, because the simulation was wrong here: on
 * 22 October 2026 it put LCP at 4.5 to 6.2 seconds on pages whose LCP, measured under real throttling, was the first
 * paint at 3.2 to 3.5 seconds; it moves a text paint behind every script that ran before it in the fast run. And not
 * scripts/perf-tti.ts, whose network throttle Chrome 154 ignores, so it reported 60 ms paints for 800 KB pages.
 *
 *   npx tsx scripts/perf-lighthouse.ts                     # the recorded pages against https://onco.cc, 3 runs each
 *   npx tsx scripts/perf-lighthouse.ts --runs 1 /drugs/pembrolizumab/
 *   npx tsx scripts/perf-lighthouse.ts --base http://localhost:3000
 *   npx tsx scripts/perf-lighthouse.ts --record            # lower each ceiling to what the page measures now
 *   npx tsx scripts/perf-lighthouse.ts --check             # exit 1 if a page is slower than its ceiling
 *
 * Ceilings live in src/data/perf-budget.json. As with src/data/page-weight.json, `--record` only ever lowers them and
 * raising one means editing the file by hand and saying why. A ceiling has 15 per cent of headroom over the median,
 * because two loads of one page on one machine differ by about that much. Needs Google Chrome (CHROME_PATH to override)
 * and fetches Lighthouse through npx; keep runs few, the live site is behind an edge that rate-limits sweeps.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BUDGET = "src/data/perf-budget.json";
const DEFAULT_PAGES = ["/", "/cancers/tnbc/", "/drugs/pembrolizumab/", "/trials/keynote-522/", "/terms/ctdna/", "/live/precision/", "/technologies/"];
const HEADROOM = 1.15;

type Metrics = { fcp: number; lcp: number; tbt: number; si: number; bytes: number };
type Budget = { note: string; measured: string; pages: Record<string, Metrics> };

const args = process.argv.slice(2);
const flag = (f: string) => args.includes(f);
const opt = (f: string) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
const base = (opt("--base") ?? "https://onco.cc").replace(/\/$/, "");
const runs = Number(opt("--runs") ?? 3);
const listed = args.filter((a, i) => a.startsWith("/") && !["--base", "--runs"].includes(args[i - 1] ?? ""));
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function once(url: string): Metrics {
  const dir = mkdtempSync(join(tmpdir(), "onco-lh-"));
  const out = join(dir, "r.json");
  try {
    execFileSync("npx", ["-y", "lighthouse@12", url, "--only-categories=performance", "--form-factor=mobile", "--throttling-method=devtools", "--output=json", `--output-path=${out}`, "--chrome-flags=--headless=new", "--quiet"], { stdio: "ignore", env: { ...process.env, CHROME_PATH: chrome } });
    const a = JSON.parse(readFileSync(out, "utf8")).audits;
    return { fcp: a["first-contentful-paint"].numericValue, lcp: a["largest-contentful-paint"].numericValue, tbt: a["total-blocking-time"].numericValue, si: a["speed-index"].numericValue, bytes: a["total-byte-weight"].numericValue };
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

const median = (xs: number[]) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };

function measure(path: string): Metrics {
  const all = Array.from({ length: runs }, () => once(`${base}${path}`));
  return { fcp: median(all.map((m) => m.fcp)), lcp: median(all.map((m) => m.lcp)), tbt: median(all.map((m) => m.tbt)), si: median(all.map((m) => m.si)), bytes: median(all.map((m) => m.bytes)) };
}

const budget: Budget = JSON.parse(readFileSync(BUDGET, "utf8"));
const pages = listed.length ? listed : Object.keys(budget.pages).length ? Object.keys(budget.pages) : DEFAULT_PAGES;
const ms = (n: number) => `${(n / 1000).toFixed(1)} s`;
const kb = (n: number) => `${Math.round(n / 1024)} KB`;

console.log(`${base}, mobile, devtools throttling, median of ${runs}`);
console.log("page | FCP | LCP | TBT | speed index | bytes");
let over = 0;
for (const p of pages) {
  const m = measure(p);
  const c = budget.pages[p];
  const breaches = c ? (["fcp", "lcp", "tbt", "si", "bytes"] as const).filter((k) => m[k] > c[k]) : [];
  if (breaches.length) over++;
  console.log(`${p} | ${ms(m.fcp)} | ${ms(m.lcp)} | ${Math.round(m.tbt)} ms | ${ms(m.si)} | ${kb(m.bytes)}${breaches.length ? `  OVER on ${breaches.join(", ")}` : ""}`);
  if (flag("--record")) {
    const next = Object.fromEntries((["fcp", "lcp", "tbt", "si", "bytes"] as const).map((k) => [k, Math.round(Math.min(c?.[k] ?? Infinity, m[k] * HEADROOM))])) as Metrics;
    budget.pages[p] = next;
  }
}
if (flag("--record")) { budget.measured = new Date().toISOString().slice(0, 10); writeFileSync(BUDGET, JSON.stringify(budget, null, 2) + "\n"); console.log(`recorded ${BUDGET}`); }
if (flag("--check") && over) { console.error(`${over} page(s) slower than their ceiling in ${BUDGET}`); process.exit(1); }
