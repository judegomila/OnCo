/**
 * Empty-page audit: after `next build`, load every out/**\/index.html, strip the chrome (header, nav,
 * footer, scripts, styles) and tags, and flag pages whose main content is thin or reads like a
 * placeholder or a maintainer note. Groups the findings by cause so a launch checklist can be worked
 * through page by page.
 *
 *   npx tsx scripts/audit-empty-pages.ts [--min 400] [--all]   (--all includes the per-entity pages)
 *
 * Exit code is 0 either way; this is a report, not a gate.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { KIND_META } from "../src/lib/schema";

const root = process.cwd();
const outDir = join(root, "out");
const arg = (name: string) => { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : undefined; };
const MIN = Number(arg("--min") ?? 400);
const ALL = process.argv.includes("--all");

/** Empty-state and maintainer-facing formulations. Ordinary prose ("no company will fund") is deliberately not matched. */
const RULES: Array<{ cause: string; re: RegExp }> = [
  { cause: "empty state: \"No ... yet / has been / is present\"", re: /(^|[.!?:]\s)no [a-z][a-z -]{0,40} (yet|has been|have been|is present|has run|was found|were found)\b/i },
  { cause: "empty state: \"nothing yet / none yet\"", re: /\b(nothing|none) (here )?yet\b/i },
  { cause: "empty state: \"not built / not generated / not fetched / not run\"", re: /\b(has|have|is|was|were) not (yet )?(been )?(built|generated|fetched|run|published|switched on|recorded)\b/i },
  { cause: "empty state: \"index not built\"", re: /index (has )?not (been )?built/i },
  { cause: "empty state: \"will appear\"", re: /\bwill appear\b/i },
  { cause: "empty state: \"coming soon\"", re: /coming soon/i },
  { cause: "placeholder text", re: /\bplaceholder\b|\bTODO\b|lorem ipsum/ },
  { cause: "maintainer instruction: npx / npm run", re: /\b(run )?(npx|npm run|tsx scripts\/)\b/i },
  { cause: "counter at zero: \"0 of\"", re: /(^|\s)0 of [\d,]+\b/ },
  { cause: "\"as of\" stamp", re: /\bas of \d{4}/i },
  { cause: "em-dash", re: /—/ },
];

/** Entity-detail routes live under /<route>/<id>/; the audit is about hand-built pages unless --all. */
const ENTITY_ROUTES = new Set<string>([...Object.values(KIND_META).map((m) => m.route), "digests", "dossiers", "journeys", "paths", "regimens", "sequencing", "teach", "embed", "guidelines"]);

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name === "index.html") acc.push(p);
  }
  return acc;
}

function mainText(html: string): { text: string; emptyTables: number } {
  let h = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  const main = /<main[^>]*>([\s\S]*?)<\/main>/i.exec(h);
  h = main ? main[1] : h.replace(/<header[\s\S]*?<\/header>/i, "").replace(/<footer[\s\S]*?<\/footer>/i, "").replace(/<nav[\s\S]*?<\/nav>/gi, "");
  let emptyTables = 0;
  for (const t of h.match(/<table[\s\S]*?<\/table>/gi) ?? []) {
    const body = /<tbody[^>]*>([\s\S]*?)<\/tbody>/i.exec(t);
    const rows = (body ? body[1] : t.replace(/<thead[\s\S]*?<\/thead>/i, "")).match(/<tr[\s>]/gi)?.length ?? 0;
    if (rows === 0) emptyTables++;
  }
  const text = h.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
  return { text, emptyTables };
}

const findings: Record<string, string[]> = {};
const add = (cause: string, route: string, detail: string) => { (findings[cause] ??= []).push(`${route}  ${detail}`); };

const files = walk(outDir);
let scanned = 0;
for (const f of files) {
  const route = "/" + relative(outDir, f).replace(/index\.html$/, "");
  const seg = route.split("/").filter(Boolean);
  if (!ALL && seg.length >= 2 && ENTITY_ROUTES.has(seg[0])) continue;
  scanned++;
  const html = readFileSync(f, "utf8");
  const { text, emptyTables } = mainText(html);
  // Drop the site-wide disclaimer and footer boilerplate that survives when there is no <main>, and the
  // review badge every unreviewed page carries.
  const body = text.replace(/Work in progress\. Every fact on this site[\s\S]*$/, "").replace(/Not yet reviewed Needs [^.]*\. Review this page or see the review queue\./g, "").trim();
  if (body.length < MIN) add(`thin content (under ${MIN} characters)`, route, `${body.length} chars: "${body.slice(0, 140)}"`);
  if (emptyTables) add("table with zero rows", route, `${emptyTables} empty table${emptyTables === 1 ? "" : "s"}`);
  for (const r of RULES) {
    const m = r.re.exec(body);
    if (!m) continue;
    const i = m.index;
    add(r.cause, route, `…${body.slice(Math.max(0, i - 50), i + 100)}…`);
  }
}

const causes = Object.keys(findings).sort();
console.log(`audit-empty-pages: scanned ${scanned} of ${files.length} pages (${ALL ? "all" : "hand-built only; --all for entity pages"}), ${causes.length} cause${causes.length === 1 ? "" : "s"}\n`);
for (const c of causes) {
  console.log(`## ${c} (${findings[c].length})`);
  for (const line of findings[c]) console.log(`  ${line}`);
  console.log();
}
