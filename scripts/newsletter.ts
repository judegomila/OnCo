/**
 * Weekly issue generator. Renders this week's issue from the same data as the site:
 *   - changelog entries under [Unreleased] plus the latest release if it is under 14 days old
 *   - dated regulatory events on products from the past 7 days
 *   - readout-calendar items in the next 30 days
 *   - research-pulse items from the past 14 days
 *   - corrections logged in the past 7 days
 * and writes, under public/newsletter/:
 *   <date>/index.html   the standalone issue (inline CSS, no scripts, no tracking), served at /newsletter/<date>/
 *   <date>.json         the same issue as structured sections, rendered inline at /newsletter/
 *   index.json          the archive (newest first)
 *   feed.xml            Atom feed of the archive with the latest issue's body
 *
 * The HTML lives in a directory, not as <date>.html, because static hosts with clean URLs (Vercel with
 * trailingSlash) do not serve a bare .html path from public/: /newsletter/<date>.html was a 404 in production.
 * Legacy <date>.html files are moved into place on the next run.
 *
 *   npx tsx scripts/newsletter.ts [--date YYYY-MM-DD]
 *
 * Part of `npm run build:api`, so every deploy carries the current issue; .github/workflows/newsletter.yml
 * also commits it weekly. Sending (Buttondown or Listmonk) reads the feed or the HTML; nothing here talks to a
 * mailing service.
 */
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor } from "../src/lib/schema";
import { calendar } from "../src/data/calendar";
import { pulseItems } from "../src/data/pulse";

const SITE = "https://onco.cc";
const argDate = (() => { const i = process.argv.indexOf("--date"); return i >= 0 ? process.argv[i + 1] : undefined; })();
const now = argDate ? new Date(`${argDate}T12:00:00Z`) : new Date();
const today = now.toISOString().slice(0, 10);
const daysAgo = (d: string) => Math.round((now.getTime() - new Date(d).getTime()) / 86_400_000);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Markdown-lite to HTML for changelog and corrections lines: links, code, emphasis. */
const inline = (s: string) => esc(s)
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)/g, (_m, t: string, u: string) => `<a href="${u.startsWith("/") ? SITE + u : u}">${t}</a>`)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*([^*]+)\*/g, "<em>$1</em>");

export type IssueSection = { id: string; title: string; blurb: string; items: string[] };
export type IssueJson = { date: string; title: string; summary: string; counts: Record<string, number>; sections: IssueSection[] };
export type IndexEntry = { date: string; title: string; path: string; summary: string; counts: Record<string, number> };

// ---- Changelog ----
function changelogSections(md: string): IssueSection[] {
  const out: IssueSection[] = [];
  const blocks = md.split(/^## /m).slice(1);
  let releaseIncluded = false;
  for (const b of blocks) {
    const [head, ...rest] = b.split("\n");
    const m = /^\[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/.exec(head.trim());
    if (!m) continue;
    const isUnreleased = m[1].toLowerCase() === "unreleased";
    // Unreleased entries always; then only the most recent release, and only if it is under 14 days old.
    if (!isUnreleased && (releaseIncluded || !m[2] || daysAgo(m[2]) > 14)) continue;
    if (!isUnreleased) releaseIncluded = true;
    const items: string[] = [];
    let sub = "";
    for (const line of rest) {
      if (line.startsWith("## ")) break;
      if (line.startsWith("### ")) { sub = line.slice(4).trim(); continue; }
      if (line.startsWith("- ")) items.push(`${sub ? `<strong>${esc(sub)}:</strong> ` : ""}${inline(line.slice(2))}`);
    }
    if (items.length) out.push({ id: `changelog-${isUnreleased ? "unreleased" : m[1]}`, title: isUnreleased ? "What changed this week" : `What changed in release ${m[1]} (${m[2]})`, blurb: "New pages, new data and fixes, from the changelog.", items });
  }
  return out;
}

// ---- Regulatory events ----
function regulatory(): string[] {
  const g = graph();
  const rows: Array<{ date: string; html: string }> = [];
  for (const d of g.kind("drug")) for (const ev of d.regulatoryEvents) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ev.date)) continue;
    const age = daysAgo(ev.date);
    if (age < 0 || age > 7) continue;
    rows.push({ date: ev.date, html: `${ev.date} · <a href="${SITE}${routeFor(d)}">${esc(d.name)}</a> · ${esc(ev.type)} (${esc(ev.region)}): ${esc(ev.note)}${ev.source ? ` <a href="${esc(ev.source)}">source</a>` : ""}` });
  }
  return rows.sort((a, b) => b.date.localeCompare(a.date)).map((r) => r.html);
}

// ---- Calendar ----
function upcoming(): string[] {
  const g = graph();
  const monthKeys = new Set([today.slice(0, 7), new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().slice(0, 7)]);
  return calendar
    .filter((c) => (/^\d{4}-\d{2}-\d{2}$/.test(c.date) ? -daysAgo(c.date) >= 0 && -daysAgo(c.date) <= 30 : /^\d{4}-\d{2}$/.test(c.date) && monthKeys.has(c.date)))
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((c) => `${c.date} · ${esc(c.title)} <span class="muted">(${c.confidence})</span>${c.refs.length ? ` · ${c.refs.map((id) => { const e = g.get(id); return e ? `<a href="${SITE}${routeFor(e)}">${esc(e.name)}</a>` : esc(id); }).join(", ")}` : ""}${c.source ? ` · <a href="${esc(c.source)}">source</a>` : ""}`);
}

// ---- Pulse ----
function pulse(): string[] {
  const g = graph();
  return [...pulseItems]
    .filter((p) => { const a = daysAgo(p.date); return a >= 0 && a <= 14; })
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => `${p.date} · <a href="${esc(p.url)}">${esc(p.title)}</a>: ${esc(p.oneLine)}${p.refs.length ? ` <span class="muted">(${p.refs.slice(0, 4).map((id) => { const e = g.get(id); return e ? `<a href="${SITE}${routeFor(e)}">${esc(e.name)}</a>` : esc(id); }).join(", ")})</span>` : ""}`);
}

// ---- Corrections ----
function corrections(md: string): string[] {
  const out: string[] = [];
  for (const line of md.split("\n")) {
    const m = /^\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*$/.exec(line);
    if (!m) continue;
    const age = daysAgo(m[1]);
    if (age < 0 || age > 7) continue;
    out.push(`${m[1]} · ${inline(m[2])}: ${inline(m[3])} <span class="muted">(${inline(m[4])})</span> · ${inline(m[5])}`);
  }
  return out;
}

// ---- Render ----
const root = process.cwd();
const changelog = existsSync(join(root, "CHANGELOG.md")) ? readFileSync(join(root, "CHANGELOG.md"), "utf8") : "";
const correctionsMd = existsSync(join(root, "CORRECTIONS.md")) ? readFileSync(join(root, "CORRECTIONS.md"), "utf8") : "";

const sections: IssueSection[] = [
  ...changelogSections(changelog),
  { id: "regulatory", title: "Regulatory events, past 7 days", blurb: "Dated filings, approvals, letters and label changes recorded on product pages.", items: regulatory() },
  { id: "calendar", title: "Upcoming readouts and decisions, next 30 days", blurb: "Decisions, advisory committees, expected readouts and congresses from the readout calendar. Expected dates are editorial estimates.", items: upcoming() },
  { id: "pulse", title: "What the journals said, past 14 days", blurb: "What the leading journals and regulators published, from the research pulse; every item links to the source.", items: pulse() },
  { id: "corrections", title: "Corrections, past 7 days", blurb: "Confirmed factual corrections to the corpus, with the fixing commit.", items: corrections(correctionsMd) },
].filter((s) => s.items.length);

const counts = { changes: sections.filter((s) => s.id.startsWith("changelog")).reduce((a, s) => a + s.items.length, 0), regulatory: sections.find((s) => s.id === "regulatory")?.items.length ?? 0, calendar: sections.find((s) => s.id === "calendar")?.items.length ?? 0, pulse: sections.find((s) => s.id === "pulse")?.items.length ?? 0, corrections: sections.find((s) => s.id === "corrections")?.items.length ?? 0 };
const title = `OnCo weekly, ${today}`;
const LABEL: Record<keyof typeof counts, [string, string]> = { changes: ["changelog entry", "changelog entries"], regulatory: ["regulatory event", "regulatory events"], calendar: ["upcoming date", "upcoming dates"], pulse: ["publication", "publications"], corrections: ["correction", "corrections"] };
const summary = (Object.entries(counts) as Array<[keyof typeof counts, number]>).filter(([, n]) => n > 0).map(([k, n]) => `${n} ${LABEL[k][n === 1 ? 0 : 1]}`).join(", ") || "A quiet week: nothing new to report.";

const bodyHtml = `<header><p class="kicker">OnCo · weekly issue</p><h1>${esc(title)}</h1><p class="lede">${esc(summary)}. Generated from the corpus; every item links to its page and, through it, to the primary source. Not medical advice.</p></header>
${sections.map((s) => `<section id="${s.id}"><h2>${esc(s.title)}</h2><p class="muted">${esc(s.blurb)}</p><ul>${s.items.map((i) => `<li>${i}</li>`).join("")}</ul></section>`).join("\n")}
<footer><p>Archive and subscription: <a href="${SITE}/newsletter/">${SITE}/newsletter/</a> · Feed: <a href="${SITE}/newsletter/feed.xml">Atom</a> · Something wrong? Fix it once at <a href="${SITE}/suggest/">${SITE}/suggest/</a>.</p><p class="muted">Code MIT. Data CC BY 4.0, attribute "OnCo (github.com/judegomila/OnCo)". No tracking: this email contains no pixels, no click redirects and no scripts.</p></footer>`;

const html = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title>
<style>
body{font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#1f2328;background:#fff;margin:0;padding:24px}
main{max-width:680px;margin:0 auto}h1{font-size:28px;line-height:1.15;margin:4px 0 8px}h2{font-size:19px;margin:28px 0 4px}
.kicker{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;margin:0}.lede{font-size:17px;color:#374151}
.muted{color:#6b7280;font-size:14px}ul{padding-left:20px}li{margin:6px 0}a{color:#0b5cad}code{font-size:.9em;background:#f3f4f6;padding:1px 4px;border-radius:4px}
footer{margin-top:36px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:14px}
</style></head><body><main>${bodyHtml}</main></body></html>
`;

const outDir = join(root, "public", "newsletter");
const pathFor = (date: string) => `/newsletter/${date}/`;
mkdirSync(join(outDir, today), { recursive: true });
writeFileSync(join(outDir, today, "index.html"), html);
const issueJson: IssueJson = { date: today, title, summary, counts, sections };
writeFileSync(join(outDir, `${today}.json`), JSON.stringify(issueJson));

// Archive: merge today's entry, normalise legacy "<date>.html" paths and move their files into "<date>/index.html".
const indexPath = join(outDir, "index.json");
const index: IndexEntry[] = existsSync(indexPath) ? (JSON.parse(readFileSync(indexPath, "utf8")) as IndexEntry[]) : [];
for (const i of index) {
  const legacy = join(outDir, `${i.date}.html`);
  if (existsSync(legacy)) {
    mkdirSync(join(outDir, i.date), { recursive: true });
    if (!existsSync(join(outDir, i.date, "index.html"))) writeFileSync(join(outDir, i.date, "index.html"), readFileSync(legacy));
    unlinkSync(legacy);
  }
  i.path = pathFor(i.date);
}
const entry: IndexEntry = { date: today, title, path: pathFor(today), summary, counts };
const merged = [entry, ...index.filter((i) => i.date !== today)].sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(indexPath, JSON.stringify(merged, null, 0));

const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>OnCo weekly</title>
  <id>${SITE}/newsletter/feed.xml</id>
  <link href="${SITE}/newsletter/feed.xml" rel="self"/>
  <link href="${SITE}/newsletter/"/>
  <updated>${new Date(`${merged[0].date}T08:00:00Z`).toISOString()}</updated>
  <author><name>OnCo</name></author>
${merged.slice(0, 26).map((i) => `  <entry>
    <title>${esc(i.title)}</title>
    <id>${SITE}${i.path}</id>
    <link href="${SITE}${i.path}"/>
    <updated>${new Date(`${i.date}T08:00:00Z`).toISOString()}</updated>
    <summary>${esc(i.summary)}</summary>${i.date === today ? `\n    <content type="html">${esc(bodyHtml)}</content>` : ""}
  </entry>`).join("\n")}
</feed>
`;
writeFileSync(join(outDir, "feed.xml"), feed);
console.log(`newsletter: wrote public/newsletter/${today}/index.html and ${today}.json (${summary}); ${merged.length} issue(s) in the archive`);
