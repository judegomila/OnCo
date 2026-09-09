/**
 * Per-record change history from git.
 *
 * Provenance (scripts/provenance.ts) shows the last edit; this shows what changed. For every data
 * file touched in the last N commits (default 200), the file is read at each commit and its parent,
 * every entity record is located by its `id: "<id>"` line, and the record's fields are compared. The
 * result is a field-level diff per record per commit.
 *
 * Writes public/history/index.json (the recent-changes feed, newest first, rendered at /history/) and
 * public/history/<id>.json for every record that changed. Both are pure functions of the git history,
 * so the output is committed and refreshed by the weekly workflow; a shallow clone (Vercel) just keeps
 * the committed files.
 *
 * Records are compared as source text, so a rename of a helper or a reformat shows as a change to the
 * fields it touched; that is the honest answer to "what changed on this record".
 *
 * Run: npx tsx scripts/history.ts [--commits 200] [--max-feed 600]
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor } from "../src/lib/schema";

export type FieldChange = { field: string; before?: string; after?: string };
export type RecordChange = { id: string; kind?: string; name?: string; route?: string; commit: string; date: string; author: string; message: string; file: string; type: "added" | "changed" | "removed"; fields: FieldChange[] };
export type HistoryIndex = { generated: string; commits: number; records: number; changes: RecordChange[] };

const root = process.cwd();
const MAX_VALUE = 220;

function git(args: string[]): string {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
}

/** Scan a record's outer braces and split it into top-level `field: value` pairs, respecting strings, template literals and nesting. */
export function parseFields(record: string): Map<string, string> {
  const out = new Map<string, string>();
  let i = 0;
  const n = record.length;
  // Skip to the opening brace.
  while (i < n && record[i] !== "{") i++;
  if (i >= n) return out;
  i++;
  let depth = 0;
  let field: string | null = null;
  let valueStart = 0;
  const flush = (end: number) => { if (field) out.set(field, record.slice(valueStart, end).trim().replace(/,\s*$/, "")); field = null; };
  const skipString = (q: string) => { i++; while (i < n && record[i] !== q) { if (record[i] === "\\") i++; i++; } i++; };
  while (i < n) {
    const c = record[i];
    if (c === '"' || c === "'" || c === "`") { skipString(c); continue; }
    if (c === "/" && record[i + 1] === "/") { while (i < n && record[i] !== "\n") i++; continue; }
    if (c === "/" && record[i + 1] === "*") { i = record.indexOf("*/", i + 2); if (i < 0) break; i += 2; continue; }
    if (c === "{" || c === "[" || c === "(") { depth++; i++; continue; }
    if (c === "}" || c === "]" || c === ")") { if (depth === 0) { flush(i); break; } depth--; i++; continue; }
    if (depth === 0) {
      if (c === ",") { flush(i); i++; continue; }
      if (field === null) {
        const m = /^\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*:/.exec(record.slice(i, i + 80));
        if (m) { field = m[1]; i += m[0].length; valueStart = i; continue; }
        // Spread or shorthand (`...x`, `asOf`): treat as its own field with no value.
        const sh = /^\s*(\.\.\.[A-Za-z_$][A-Za-z0-9_$.]*|[A-Za-z_$][A-Za-z0-9_$]*)\s*(?=,|\n|\})/.exec(record.slice(i, i + 80));
        if (sh) { out.set(sh[1], ""); i += sh[0].length; continue; }
      }
    }
    i++;
  }
  return out;
}

/** Locate every entity record in a data file: the `id: "<id>"` line that also carries `kind:` or `name:`, back to its opening brace, forward to the matching close. */
export function extractRecords(source: string): Map<string, string> {
  const out = new Map<string, string>();
  const re = /\bid: "([a-z0-9]+(?:-[a-z0-9]+)*)"/g;
  for (const m of source.matchAll(re)) {
    const lineStart = source.lastIndexOf("\n", m.index) + 1;
    const lineEnd = source.indexOf("\n", m.index);
    const line = source.slice(lineStart, lineEnd < 0 ? source.length : lineEnd);
    if (!/\b(kind|name):/.test(line)) continue;
    // Walk back to the opening brace of this record.
    let depth = 0, j = m.index - 1, open = -1;
    while (j >= 0) {
      const c = source[j];
      if (c === "}" || c === "]" || c === ")") depth++;
      else if (c === "{") { if (depth === 0) { open = j; break; } depth--; }
      else if (c === "[" || c === "(") { if (depth === 0) break; depth--; }
      j--;
    }
    if (open < 0) continue;
    // Walk forward to the matching close, respecting strings.
    let k = open + 1; depth = 0;
    while (k < source.length) {
      const c = source[k];
      if (c === '"' || c === "'" || c === "`") { const q = c; k++; while (k < source.length && source[k] !== q) { if (source[k] === "\\") k++; k++; } k++; continue; }
      if (c === "{" || c === "[" || c === "(") depth++;
      else if (c === "}" || c === "]" || c === ")") { if (depth === 0) break; depth--; }
      k++;
    }
    const text = source.slice(open, k + 1);
    if (!out.has(m[1])) out.set(m[1], text);
  }
  return out;
}

const clip = (s: string) => (s.length > MAX_VALUE ? s.slice(0, MAX_VALUE - 3) + "..." : s);

export function diffRecords(before: string | undefined, after: string | undefined): FieldChange[] {
  const a = before ? parseFields(before) : new Map<string, string>();
  const b = after ? parseFields(after) : new Map<string, string>();
  const fields: FieldChange[] = [];
  for (const [f, v] of b) {
    const prev = a.get(f);
    if (prev === undefined) fields.push({ field: f, after: clip(v) });
    else if (prev !== v) fields.push({ field: f, before: clip(prev), after: clip(v) });
  }
  for (const [f, v] of a) if (!b.has(f)) fields.push({ field: f, before: clip(v) });
  return fields;
}

type Commit = { sha: string; time: number; author: string; message: string; files: string[] };

function recentCommits(n: number): Commit[] {
  const out = git(["log", `-${n}`, "--format=%x01%H%x09%ct%x09%an%x09%s", "--name-only", "--", "src/data"]);
  const commits: Commit[] = [];
  let cur: Commit | null = null;
  for (const line of out.split("\n")) {
    if (line.startsWith("\x01")) { const [sha, time, author, message] = line.slice(1).split("\t"); cur = { sha, time: Number(time), author, message, files: [] }; commits.push(cur); continue; }
    if (cur && line.trim() && line.startsWith("src/data/") && line.endsWith(".ts")) cur.files.push(line.trim());
  }
  return commits;
}

const blobCache = new Map<string, Map<string, string>>();
function recordsAt(sha: string, file: string): Map<string, string> | null {
  let blob: string;
  try { blob = git(["rev-parse", `${sha}:${file}`]).trim(); } catch { return null; }
  const hit = blobCache.get(blob);
  if (hit) return hit;
  let src: string;
  try { src = git(["show", blob]); } catch { return null; }
  const recs = extractRecords(src);
  blobCache.set(blob, recs);
  return recs;
}

export function buildHistory(maxCommits = 200): RecordChange[] {
  const g = graph();
  const changes: RecordChange[] = [];
  const skipFiles = /\/(i18n|simple)\//; // translations and simple-mode TL;DRs are keyed by id but are not records
  for (const c of recentCommits(maxCommits)) {
    for (const file of c.files) {
      if (skipFiles.test(file)) continue;
      const after = recordsAt(c.sha, file);
      const before = recordsAt(`${c.sha}^`, file) ?? new Map<string, string>();
      if (!after) continue; // file deleted in this commit
      const date = new Date(c.time * 1000).toISOString().slice(0, 10);
      const meta = (id: string) => { const e = g.get(id); return e ? { kind: e.kind, name: e.name, route: routeFor(e) } : {}; };
      for (const [id, text] of after) {
        const prev = before.get(id);
        if (prev === text) continue;
        if (prev === undefined) {
          // A new record: list the field names only. The values are the record itself, and provenance already dates the addition.
          changes.push({ id, ...meta(id), commit: c.sha.slice(0, 10), date, author: c.author, message: c.message.slice(0, 140), file, type: "added", fields: [...parseFields(text).keys()].map((field) => ({ field })) });
          continue;
        }
        const fields = diffRecords(prev, text);
        if (!fields.length) continue;
        changes.push({ id, ...meta(id), commit: c.sha.slice(0, 10), date, author: c.author, message: c.message.slice(0, 140), file, type: "changed", fields });
      }
      for (const [id, text] of before) if (!after.has(id)) changes.push({ id, ...meta(id), commit: c.sha.slice(0, 10), date, author: c.author, message: c.message.slice(0, 140), file, type: "removed", fields: [...parseFields(text).keys()].map((field) => ({ field })) });
    }
  }
  return changes;
}

if (process.argv[1]?.endsWith("history.ts")) {
  const arg = (name: string, dflt: number) => { const i = process.argv.indexOf(name); return i > 0 ? Number(process.argv[i + 1]) : dflt; };
  const maxCommits = arg("--commits", 200);
  const maxFeed = arg("--max-feed", 600);
  const changes = buildHistory(maxCommits);
  const out = join(root, "public", "history");
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  // Per-record files only where a field actually changed or the record was removed; a record that was only added has nothing to diff.
  const byId = new Map<string, RecordChange[]>();
  for (const ch of changes) byId.set(ch.id, [...(byId.get(ch.id) ?? []), ch]);
  let written = 0;
  for (const [id, list] of byId) {
    if (!list.some((c) => c.type !== "added")) continue;
    writeFileSync(join(out, `${id}.json`), JSON.stringify(list.slice(0, 30), null, 0));
    written++;
  }
  // The feed: newest first, one entry per record per commit, capped so the page stays light. A record's own file has everything.
  const feed = changes.slice(0, maxFeed);
  const index: HistoryIndex = { generated: new Date().toISOString(), commits: maxCommits, records: byId.size, changes: feed };
  writeFileSync(join(out, "index.json"), JSON.stringify(index, null, 0));
  console.log(`history: ${changes.length} record changes across ${byId.size} records in the last ${maxCommits} commits; ${written} per-record files; feed holds ${feed.length}`);
}
