/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Merge two records that are the same thing under two ids.
 *
 * The corpus grows in two ways, by hand and by fetcher, and both can reach the same paper or the same study. When
 * they do, one id has to be retired, and retiring an id is not a deletion: the URL is published and indexed, other
 * files key on it, and its relations are real. This script does the whole of it in one pass, for one pair or for a
 * whole plan, so the fifteen-times-by-hand version that three reviews each declined to attempt is one command.
 *
 *   npx tsx scripts/merge-records.ts <survivor> <retired> ["reason"]
 *   npx tsx scripts/merge-records.ts --plan <file.tsv>      survivor \t retired \t reason
 *   ... --dry                                               report only, write nothing
 *
 * What it does, in order:
 *   1. checks both records exist, share a kind, and that the retired one is not the survivor;
 *   2. moves the retired record's relations, links, aliases and any scalar the survivor lacks onto the survivor, as a
 *      supplement in src/data/merged-records.ts (arrays append and de-duplicate, scalars fill gaps only);
 *   3. deletes the retired record's literal from its data file, leaving a one-line comment that says where it went;
 *   4. rewrites every remaining reference to the retired id, in src, scripts, mcp and packages: a list entry becomes
 *      the survivor's id (and de-duplicates if the list already names it), an object key keyed by id is renamed or,
 *      where the survivor already has that key, dropped;
 *   5. adds the redirect to vercel.json, so the published URL keeps working;
 *   6. records the pair in src/data/merged-records.ts with its reason, which is what the ratchets read.
 *
 * Afterwards run, in order: `npx tsx scripts/build-redirect-stubs.ts`, `npm run -s validate`, `npm run -s typecheck`,
 * `npm run -s lint`, `npx vitest run`. See docs/DUPLICATE-RECORDS.md.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { graph } from "@/lib/graph";
import { KIND_META, REL_FIELDS } from "@/lib/kinds";
import { MERGED_RECORDS, MERGE_SUPPLEMENTS, type MergedRecord } from "@/data/merged-records";
import { dataFiles, dedupeLists, escapeRe, ROOT, sourceFiles } from "./lib/duplicate-records";

const argv = process.argv.slice(2);
const DRY = argv.includes("--dry");
const TODAY = new Date().toISOString().slice(0, 10);

type Pair = { survivor: string; retired: string; reason: string };
const pairs: Pair[] = [];
const planArg = argv.indexOf("--plan");
if (planArg >= 0) {
  for (const line of readFileSync(argv[planArg + 1], "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    const [survivor, retired, reason] = line.split("\t");
    pairs.push({ survivor: survivor.trim(), retired: retired.trim(), reason: (reason ?? "").trim() });
  }
} else {
  const [survivor, retired, reason] = argv.filter((a) => !a.startsWith("--"));
  if (!survivor || !retired) { console.error("usage: merge-records.ts <survivor> <retired> [reason] | --plan <file.tsv>"); process.exit(1); }
  pairs.push({ survivor, retired, reason: reason ?? "" });
}

const g = graph();
const files = new Map<string, string>();
const read = (f: string) => { if (!files.has(f)) files.set(f, readFileSync(f, "utf8")); return files.get(f)!; };
const write = (f: string, text: string) => files.set(f, text);
const DATA = dataFiles();
const SOURCES = sourceFiles().filter((f) => !f.includes("/docs/"));

/* ---------------------------------------------------------------- 1. checks and the supplement */

/**
 * Fields that move from the retired record to the survivor. Findings and caveats do not: they are a second reading of
 * one paper, and concatenating them is what left three-finding papers with seven findings. Nor does `tags`, which says
 * where a record came from: `europepmc-ingest` and `ctgov-ingest` set the provenance weight in src/lib/search-rank.ts,
 * and a curated survivor must not inherit the ingest's.
 */
const MOVED_ARRAYS = [...REL_FIELDS, "aka"] as const;
const MOVED_SCALARS = ["doi", "pmid", "nct", "participants", "changedPractice", "wikipedia", "enrolled", "yearReported"] as const;

type Supplement = { id: string; kind: string } & Record<string, unknown>;
/** Seeded with what earlier merges moved: this file is rewritten whole, so an earlier run's supplements must survive it. */
const supplements: Supplement[] = MERGE_SUPPLEMENTS.map((s) => ({ ...s } as Supplement));
const records: MergedRecord[] = [...MERGED_RECORDS];

for (const { survivor, retired, reason } of pairs) {
  const keep = g.get(survivor), drop = g.get(retired);
  if (!keep) throw new Error(`${survivor}: no such record (survivor of ${retired})`);
  if (!drop) throw new Error(`${retired}: no such record (to be merged into ${survivor})`);
  if (keep.id === drop.id) throw new Error(`${survivor}: a record cannot be merged into itself`);
  if (keep.kind !== drop.kind) throw new Error(`${survivor} is a ${keep.kind} and ${retired} is a ${drop.kind}; only records of one kind merge`);

  const sup: Supplement = { id: keep.id, kind: keep.kind };
  for (const f of MOVED_ARRAYS) {
    const from = ((drop as any)[f] ?? []) as string[];
    const have = new Set(((keep as any)[f] ?? []) as string[]);
    const add = from.filter((x) => x !== keep.id && x !== drop.id && !have.has(x));
    if (add.length) sup[f] = add;
  }
  const keepUrls = new Set(((keep as any).links ?? []).map((l: any) => l.url));
  const links = ((drop as any).links ?? []).filter((l: any) => !keepUrls.has(l.url));
  if (links.length) sup.links = links;
  for (const f of MOVED_SCALARS) if ((keep as any)[f] === undefined && (drop as any)[f] !== undefined) sup[f] = (drop as any)[f];
  if (Object.keys(sup).length > 2) supplements.push(sup);

  records.push({ retired, survivor, kind: keep.kind, merged: TODAY, reason });
  const lost = [...(((drop as any).findings ?? []) as string[]), ...(((drop as any).caveats ?? []) as string[])];
  console.log(`${retired} -> ${survivor}: ${Object.keys(sup).length - 2} fields moved, ${lost.length} ${lost.length === 1 ? "line" : "lines"} of its own reading dropped`);
  for (const l of lost) console.log(`      dropped: ${l}`);
}

const retiredIds = new Set(pairs.map((p) => p.retired));
const survivorOf = new Map(pairs.map((p) => [p.retired, p.survivor]));
for (const p of pairs) if (retiredIds.has(p.survivor)) throw new Error(`${p.survivor} is both a survivor and retired; merge the chain in one step`);

/* ---------------------------------------------------------------- 2. delete the retired literal */

/**
 * The object literal that defines `id`, as a [start, end) span in a data file. Records are written either as a plain
 * literal in an array (`{ id: "x", ... },`) or through a one-letter constructor (`p({ id: "x", ... }),`,
 * `sup<PaperInput>({ id: "x", ... }),`), and a spike may name the id indirectly (`id: SRC.tcga2012.paper`), so both
 * forms are searched.
 */
function findLiteral(id: string): { file: string; start: number; end: number } | undefined {
  const direct = new RegExp(`\\bid:\\s*"${escapeRe(id)}"`);
  for (const f of DATA) {
    const text = read(f);
    if (!text.includes(id)) continue;
    let at = -1;
    const m = direct.exec(text);
    if (m) at = m.index;
    else {
      // Indirect: a map entry `key: { ... paper: "<id>" ... }` names the id, and the record says `id: X.key.paper`.
      const entry = new RegExp(`(\\w+):\\s*\\{[^{}]*?\\b(\\w+):\\s*"${escapeRe(id)}"`).exec(text);
      if (!entry) continue;
      const via = new RegExp(`\\bid:\\s*[A-Za-z_$][\\w$]*\\.${escapeRe(entry[1])}\\.${escapeRe(entry[2])}\\b`).exec(text);
      if (!via) continue;
      at = via.index;
    }
    // Back to the `{` that opens the literal, then over any `name(` or `name<Type>(` prefix.
    const open = text.lastIndexOf("{", at);
    if (open < 0) continue;
    let start = open;
    const before = text.slice(0, open);
    const prefix = /(?:[A-Za-z_$][\w$]*(?:<[^<>()]*>)?\()\s*$/.exec(before);
    if (prefix) start = prefix.index;
    // Forward brace match, ignoring braces inside strings.
    let depth = 0, i = open, quote = "";
    for (; i < text.length; i++) {
      const c = text[i];
      if (quote) { if (c === "\\") i++; else if (c === quote) quote = ""; continue; }
      if (c === '"' || c === "'" || c === "`") { quote = c; continue; }
      if (c === "{") depth++;
      else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
    }
    let end = i;
    while (end < text.length && /[)\s]/.test(text[end]) && text[end] !== "\n") end++;
    if (text[end] === ",") end++;
    // Take the line's leading whitespace and its trailing newline with it.
    while (start > 0 && /[ \t]/.test(text[start - 1])) start--;
    if (text[end] === "\n") end++;
    return { file: f, start, end };
  }
  return undefined;
}

const notDeleted: string[] = [];
for (const { survivor, retired } of pairs) {
  // A record can have more than one literal: the full record plus the supplements another file attaches to it. All of
  // them go, or the reference rewrite below turns a leftover into a second record under the survivor's id.
  let deleted = 0;
  for (let found = findLiteral(retired); found; found = findLiteral(retired)) {
    const text = read(found.file);
    const indent = /^[ \t]*/.exec(text.slice(found.start))?.[0] ?? "  ";
    const note = deleted === 0 ? `${indent}// ${retired} merged into ${survivor} on ${TODAY}: see src/data/merged-records.ts.\n` : "";
    write(found.file, text.slice(0, found.start) + note + text.slice(found.end));
    if (++deleted > 20) throw new Error(`${retired}: more than 20 literals, refusing to keep deleting`);
  }
  if (!deleted) notDeleted.push(retired);
}

/* ---------------------------------------------------------------- 3. rewrite the references */

let rewritten = 0, keysRenamed = 0, keysDropped = 0;
const manual: string[] = [];
for (const f of SOURCES) {
  const text = read(f);
  if (![...retiredIds].some((id) => text.includes(id))) continue;
  const lines = text.split("\n");
  const out: string[] = [];
  for (const line of lines) {
    let next: string | undefined = line;
    for (const retired of retiredIds) {
      if (next === undefined || !next.includes(retired)) continue;
      const survivor = survivorOf.get(retired)!;
      const asKey = new RegExp(`^(\\s*)(["']?)${escapeRe(retired)}\\2\\s*:`);
      if (asKey.test(next)) {
        const survivorKey = new RegExp(`^\\s*(["']?)${escapeRe(survivor)}\\1\\s*:`, "m");
        if (survivorKey.test(text)) { next = undefined; keysDropped++; }
        // The retired key may be unquoted (`nct02628067:` is a valid identifier); the survivor's often is not
        // (`keynote-158:` is a subtraction), so a renamed key is quoted unless the new id is an identifier too.
        else {
          const bare = /^[A-Za-z_$][\w$]*$/.test(survivor);
          next = next.replace(asKey, (_m, sp, q) => `${sp}${q || (bare ? "" : '"')}${survivor}${q || (bare ? "" : '"')}:`);
          keysRenamed++;
        }
        continue;
      }
      const quoted = new RegExp(`(["'\`])${escapeRe(retired)}\\1`, "g");
      if (quoted.test(next)) {
        // A record that referenced the retired id may be the survivor itself (a supplement cross-linking the pair):
        // on that line the survivor's id is dropped from the lists rather than left as a self-reference.
        const self = new RegExp(`\\bid:\\s*"${escapeRe(survivor)}"`).test(next);
        next = dedupeLists(next.replace(quoted, (_m, q) => `${q}${survivor}${q}`), self ? survivor : undefined);
        rewritten++;
      }
      if (next !== undefined && next.includes(retired) && !next.includes(`// ${retired} merged into`)) manual.push(`${relative(ROOT, f)}: ${next.trim().slice(0, 140)}`);
    }
    if (next !== undefined) out.push(next);
  }
  write(f, out.join("\n"));
}

/* ---------------------------------------------------------------- 4. the redirects */

type Vercel = { redirects: Array<{ source: string; destination: string; permanent: boolean; has?: unknown[] }> } & Record<string, unknown>;
const vercelPath = join(ROOT, "vercel.json");
const vercel = JSON.parse(read(vercelPath)) as Vercel;
for (const { survivor, retired } of pairs) {
  const route = KIND_META[g.must(survivor).kind].route;
  const source = `/${route}/${retired}/:path*`;
  if (vercel.redirects.some((r) => r.source === source)) continue;
  vercel.redirects.push({ source, destination: `/${route}/${survivor}/:path*`, permanent: true });
}
write(vercelPath, `${JSON.stringify(vercel, null, 2)}\n`);

/* ---------------------------------------------------------------- 5. src/data/merged-records.ts */

const esc = (s: string) => JSON.stringify(s);
/** A retired record's relations can name another record retired in the same run; follow the chain to the id that kept the page. */
const allSurvivors = new Map(records.map((r) => [r.retired, r.survivor]));
const canonical = (id: string) => { let x = id; for (let i = 0; i < 10 && allSurvivors.has(x); i++) x = allSurvivors.get(x)!; return x; };
const supLines = supplements.flatMap((s) => {
  const fields = Object.entries(s).filter(([k]) => k !== "id" && k !== "kind").flatMap(([k, v]) => {
    if (!Array.isArray(v) || !v.every((x) => typeof x === "string")) return [`${k}: ${JSON.stringify(v)}`];
    const list = [...new Set((v as string[]).map(canonical))].filter((x) => x !== s.id);
    return list.length ? [`${k}: ${JSON.stringify(list)}`] : [];
  });
  return fields.length ? [`  { id: ${esc(s.id)}, kind: ${esc(s.kind)}, ${fields.join(", ")} },`] : [];
});
const recLines = records.map((r) => `  { retired: ${esc(r.retired)}, survivor: ${esc(r.survivor)}, kind: ${esc(r.kind)}, merged: ${esc(r.merged)}, reason: ${esc(r.reason)} },`);
const header = readFileSync(join(ROOT, "src/data/merged-records.ts"), "utf8").split("/* merge:records */")[0];
write(join(ROOT, "src/data/merged-records.ts"), `${header}/* merge:records */
export const MERGED_RECORDS: readonly MergedRecord[] = [
${recLines.join("\n")}
];

/* merge:supplements */
export const MERGE_SUPPLEMENTS: readonly MergeSupplement[] = [
${supLines.join("\n")}
];
`);

/* ---------------------------------------------------------------- 6. report */

console.log(`\n${pairs.length} ${pairs.length === 1 ? "pair" : "pairs"}; ${rewritten} lines rewritten, ${keysRenamed} keys renamed, ${keysDropped} keys dropped, ${supplements.length} supplements.`);
if (notDeleted.length) console.log(`\nNo literal found, delete by hand:\n  ${notDeleted.join("\n  ")}`);
if (manual.length) console.log(`\nStill naming a retired id, check by hand:\n  ${[...new Set(manual)].join("\n  ")}`);
if (DRY) { console.log("\n--dry: nothing written."); process.exit(0); }
for (const [f, text] of files) if (text !== readFileSync(f, "utf8")) writeFileSync(f, text);
console.log("\nWritten. Now: npx tsx scripts/build-redirect-stubs.ts && npm run -s validate && npm run -s typecheck && npm run -s lint && npx vitest run");
