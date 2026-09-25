/**
 * Load timings on a slow line, per page, with ceilings.
 *
 * Drives headless Chrome over the DevTools protocol at 1.6 Mbps down, 750 kbps up and 40 ms latency, with the HTTP
 * cache off, and records for each page: the HTML bytes on the wire, the script bytes, first contentful paint, largest
 * contentful paint and the time until the header's sign-in pill has a React click handler (the page is interactive).
 *
 *   npx tsx scripts/perf-tti.ts                          # against http://localhost:3000, the default pages
 *   npx tsx scripts/perf-tti.ts http://localhost:4123 /cancers/tnbc/ /drugs/pembrolizumab/
 *   BASE=https://onco.cc npx tsx scripts/perf-tti.ts --check    # one load per page; exit 1 over a ceiling
 *
 * The ceilings are the live site's numbers of 24 September 2026 with a quarter of headroom. They apply to a
 * production build (a dev server compiles on request and ships unminified code, so its numbers only compare with
 * its own). Needs Google Chrome at the usual macOS path (or CHROME=...).
 */
import { spawn } from "node:child_process";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const args = process.argv.slice(2);
const check = args.includes("--check");
const rest = args.filter((a) => a !== "--check");
const BASE = (rest.find((a) => /^https?:/.test(a)) ?? process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const DEFAULT_PAGES = ["/", "/cancers/tnbc/", "/cancers/gallbladder/", "/drugs/pembrolizumab/", "/trials/keynote-522/"];
const pages = rest.filter((a) => a.startsWith("/"));
const PAGES = pages.length ? pages : DEFAULT_PAGES;

/** Milliseconds, measured live at 1.6 Mbps on 24 September 2026 (interactive: 4797, 4906, 361 (warm chunks), 2446, 527) and rounded up with headroom. */
const CEILING: Record<string, { interactive: number; lcp: number }> = {
  "/": { interactive: 6000, lcp: 2500 },
  "/cancers/tnbc/": { interactive: 6200, lcp: 2500 },
  "/cancers/gallbladder/": { interactive: 6200, lcp: 2500 },
  "/drugs/pembrolizumab/": { interactive: 6200, lcp: 2500 },
  "/trials/keynote-522/": { interactive: 3000, lcp: 2500 },
};

type Msg = { id?: number; result?: { result?: { value?: unknown }; targetId?: string; sessionId?: string } };

async function main() {
  const port = 9400 + Math.floor(Math.random() * 200);
  const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/onco-perf-${port}`, "--window-size=1366,900", "about:blank"], { stdio: "ignore" });
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  let ver: { webSocketDebuggerUrl: string } | undefined;
  for (let i = 0; i < 40 && !ver; i++) { try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await sleep(250); } }
  if (!ver) throw new Error("Chrome did not start");
  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((r) => { ws.onopen = r; });
  let id = 0;
  const pending = new Map<number, (m: Msg) => void>();
  ws.onmessage = (m) => { const d = JSON.parse(String(m.data)) as Msg; if (d.id && pending.has(d.id)) { pending.get(d.id)!(d); pending.delete(d.id); } };
  const send = (method: string, params: Record<string, unknown> = {}, sessionId?: string) => new Promise<Msg>((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
  const { result: { targetId } = {} } = await send("Target.createTarget", { url: "about:blank" });
  const { result: { sessionId } = {} } = await send("Target.attachToTarget", { targetId, flatten: true });
  const s = (m: string, p?: Record<string, unknown>) => send(m, p, sessionId);
  await s("Page.enable"); await s("Runtime.enable"); await s("Network.enable");
  await s("Network.setCacheDisabled", { cacheDisabled: true });
  await s("Emulation.setDeviceMetricsOverride", { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await s("Network.emulateNetworkConditions", { offline: false, latency: 40, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
  // Largest contentful paint is only observable from inside the page: install the observer before the first paint of every document.
  await s("Page.addScriptToEvaluateOnNewDocument", { source: `window.__lcp = 0; performance.setResourceTimingBufferSize(2000); try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = Math.max(window.__lcp, e.renderTime || e.loadTime); }).observe({ type: "largest-contentful-paint", buffered: true }); } catch {}` });
  const ev = async <T,>(expr: string) => (await s("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value as T;

  let failed = false;
  console.log(`${BASE} at 1.6 Mbps, cache off`);
  console.log("page | HTML KB | script KB | FCP ms | LCP ms | interactive ms");
  for (const path of PAGES) {
    const t0 = Date.now();
    await s("Page.navigate", { url: `${BASE}${path}${path.includes("?") ? "&" : "?"}perf=${Date.now()}` });
    let ready: number | null = null;
    for (let i = 0; i < 120; i++) {
      await sleep(250);
      const ok = await ev<boolean>(`(() => { const el = document.querySelector('header a[href^="https://me.onco.cc/"]'); if (!el) return false; const k = Object.keys(el).find(k => k.startsWith("__reactProps")); return !!(k && el[k] && el[k].onClick); })()`);
      if (ok) { ready = Date.now() - t0; break; }
    }
    await sleep(1500);
    const m = await ev<{ html: number; script: number; fcp: number | null; lcp: number }>(`(() => { const nav = performance.getEntriesByType("navigation")[0]; const fcp = performance.getEntriesByName("first-contentful-paint")[0]; const res = performance.getEntriesByType("resource"); return { html: nav ? (nav.encodedBodySize || nav.transferSize || 0) : 0, script: res.filter(r => r.initiatorType === "script" || r.initiatorType === "link" && /\\.js(\\?|$)/.test(r.name)).reduce((a, r) => a + (r.encodedBodySize || r.transferSize || 0), 0), fcp: fcp ? Math.round(fcp.startTime) : null, lcp: Math.round(window.__lcp || 0) }; })()`);
    const c = CEILING[path];
    const over = check && c && ((ready ?? Infinity) > c.interactive || m.lcp > c.lcp);
    if (over) failed = true;
    console.log(`${path} | ${(m.html / 1024).toFixed(0)} | ${(m.script / 1024).toFixed(0)} | ${m.fcp ?? "?"} | ${m.lcp || "?"} | ${ready ?? "> 30000"}${over ? `  OVER (ceiling ${c.interactive} / ${c.lcp})` : ""}`);
  }
  ws.close(); chrome.kill();
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
