/**
 * Static redirect stubs. Vercel ignores vercel.json `redirects` for this Next.js export (host and path rules alike),
 * so every path redirect declared there is also written as public/<old-path>/index.html with an instant
 * meta refresh, a canonical link and a plain link, which works on any static host. Runs in build:api.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Redirect = { source: string; destination: string; has?: unknown[] };
const cfg = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8")) as { redirects?: Redirect[] };
let n = 0;
for (const r of cfg.redirects ?? []) {
  if (r.has || r.source.includes("(") || !r.source.startsWith("/")) continue;
  const from = r.source.replace(/\/:path\*$/, "/").replace(/:path\*$/, "");
  const to = r.destination.replace(/\/:path\*$/, "/").replace(/:path\*$/, "");
  if (!from.endsWith("/") || from.includes(":")) continue;
  const dir = join(process.cwd(), "public", from);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "index.html");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title><meta name="robots" content="noindex"><link rel="canonical" href="https://onco.cc${to}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p>This page has moved to <a href="${to}">onco.cc${to}</a>.</p></body></html>\n`;
  if (!existsSync(file) || readFileSync(file, "utf8") !== html) writeFileSync(file, html);
  n++;
}
console.log(`redirect stubs: ${n} written under public/`);
