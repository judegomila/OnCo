/**
 * Accessibility audit: serve the static export in `out/`, open a representative set of pages in headless
 * Chromium and run axe-core (WCAG 2.0/2.1 A and AA plus best practices). Serious and critical violations fail
 * the run; everything is written to a JSON report.
 *
 *   npm run build
 *   npm install --no-save playwright axe-core && npx playwright install chromium
 *   npx tsx scripts/a11y.ts [--report a11y-report.json] [--pages 40] [--warn-only] [--all-kinds] [--url http://host]
 *
 * Playwright and axe-core are deliberately not dependencies of the site; they are loaded dynamically so this
 * script typechecks without them and explains what to install if they are missing.
 */
import { createRequire } from "node:module";
import { createServer, type Server } from "node:http";
import { createReadStream, existsSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { graph } from "../src/lib/graph";
import { KIND_META, KINDS, routeFor } from "../src/lib/schema";
import { NAV_GROUPS } from "../src/lib/nav";

type Violation = { id: string; impact?: string | null; help: string; helpUrl: string; description: string; nodes: Array<{ html: string; target: string[]; failureSummary?: string }> };
type AxeResults = { violations: Violation[]; passes: unknown[]; incomplete: unknown[] };

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const opt = (name: string, dflt: string) => { const i = args.indexOf(name); return i >= 0 && args[i + 1] ? args[i + 1] : dflt; };
const REPORT = opt("--report", "a11y-report.json");
const MAX_PAGES = Number(opt("--pages", "36"));
const WARN_ONLY = flag("--warn-only");
const BASE_URL = opt("--url", "");

const MIME: Record<string, string> = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json" };

/** Static server for `out/` mirroring Vercel's trailing-slash behaviour. */
function serve(root: string): Promise<{ server: Server; url: string }> {
  const server = createServer((req, res) => {
    const path = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let file = normalize(join(root, path));
    if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    else if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
    if (!existsSync(file)) { const nf = join(root, "404.html"); if (existsSync(nf)) { res.writeHead(404, { "content-type": "text/html" }); createReadStream(nf).pipe(res); } else { res.writeHead(404); res.end(); } return; }
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => { const a = server.address(); resolve({ server, url: typeof a === "object" && a ? `http://127.0.0.1:${a.port}` : "http://127.0.0.1" }); }));
}

/** Representative pages: home, the five landings, every kind index, one object of each kind, and the tools that carry the most interaction. */
function pickPages(): string[] {
  const g = graph();
  const pages: string[] = ["/", ...NAV_GROUPS.map((n) => n.href)];
  for (const k of KINDS) pages.push(`/${KIND_META[k].route}/`);
  const featured = ["tnbc", "trastuzumab-deruxtecan", "trop2", "pembrolizumab", "destiny-breast03"].map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e);
  for (const e of featured) pages.push(routeFor(e));
  const seen = new Set(featured.map((e) => e.kind));
  for (const k of KINDS) { if (seen.has(k)) continue; const first = g.kind(k)[0]; if (first) pages.push(routeFor(first)); }
  pages.push("/explore/", "/compare/", "/pivot/", "/saved/", "/api/", "/about/", "/calendar/", "/regulatory/");
  const unique = [...new Set(pages)];
  return flag("--all-kinds") ? unique : unique.slice(0, MAX_PAGES);
}

async function main() {
  const require = createRequire(import.meta.url);
  const playwrightModule = "playwright";
  let chromium: { launch: (o?: Record<string, unknown>) => Promise<{ newPage: () => Promise<Page>; close: () => Promise<void> }> };
  let axePath: string;
  try {
    chromium = (await import(playwrightModule)).chromium;
    axePath = require.resolve("axe-core/axe.min.js");
  } catch {
    console.error("a11y: playwright and axe-core are needed for this run only:\n  npm install --no-save playwright axe-core && npx playwright install chromium");
    process.exit(2);
  }
  const outDir = join(process.cwd(), "out");
  let server: Server | null = null;
  let base = BASE_URL;
  if (!base) {
    if (!existsSync(join(outDir, "index.html"))) { console.error("a11y: out/ is missing; run `npm run build` first or pass --url"); process.exit(2); }
    const s = await serve(outDir); server = s.server; base = s.url;
  }
  const pages = pickPages();
  console.log(`a11y: auditing ${pages.length} pages at ${base}`);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const report: Array<{ url: string; violations: Violation[]; counts: Record<string, number> }> = [];
  let serious = 0;
  for (const path of pages) {
    const url = `${base}${path}`;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      await page.addScriptTag({ path: axePath });
      const results = (await page.evaluate(() => (window as unknown as { axe: { run: (ctx: Document, opts: unknown) => Promise<AxeResults> } }).axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] }, resultTypes: ["violations"] }))) as AxeResults;
      const counts: Record<string, number> = {};
      for (const v of results.violations) { const imp = v.impact ?? "unknown"; counts[imp] = (counts[imp] ?? 0) + v.nodes.length; if (imp === "serious" || imp === "critical") serious += v.nodes.length; }
      report.push({ url: path, violations: results.violations.map((v) => ({ ...v, nodes: v.nodes.slice(0, 5).map((n) => ({ html: n.html.slice(0, 300), target: n.target, failureSummary: n.failureSummary })) })), counts });
      const summary = Object.entries(counts).map(([k, n]) => `${n} ${k}`).join(", ") || "clean";
      console.log(`  ${summary.padEnd(40)} ${path}`);
      for (const v of results.violations) if (v.impact === "serious" || v.impact === "critical") console.log(`      ${v.impact}: ${v.id} (${v.nodes.length}) ${v.help} -> ${v.nodes[0]?.target.join(" ")}`);
    } catch (err) {
      console.log(`  error ${path}: ${err instanceof Error ? err.message : String(err)}`);
      report.push({ url: path, violations: [], counts: { error: 1 } });
    }
  }
  await browser.close();
  server?.close();
  const byRule = new Map<string, number>();
  for (const r of report) for (const v of r.violations) byRule.set(`${v.impact ?? "unknown"} ${v.id}`, (byRule.get(`${v.impact ?? "unknown"} ${v.id}`) ?? 0) + v.nodes.length);
  writeFileSync(REPORT, JSON.stringify({ ran: new Date().toISOString(), base, pages: report.length, seriousOrCritical: serious, byRule: Object.fromEntries([...byRule.entries()].sort((a, b) => b[1] - a[1])), report }, null, 2));
  console.log(`a11y: ${serious} serious or critical issue${serious === 1 ? "" : "s"} across ${report.length} pages; report in ${REPORT}`);
  if (serious > 0 && !WARN_ONLY) process.exit(1);
}

type Page = {
  goto: (url: string, opts?: Record<string, unknown>) => Promise<unknown>;
  addScriptTag: (opts: { path: string }) => Promise<unknown>;
  evaluate: <T>(fn: () => Promise<T> | T) => Promise<T>;
};

main().catch((err) => { console.error(err); process.exit(1); });
