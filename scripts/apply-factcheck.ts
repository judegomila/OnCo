/**
 * Apply accepted fact-check patches to the data files.
 *
 * Reads public/factcheck-patches.json (written by scripts/factcheck.ts), applies the patches you name,
 * bumps the record's `asOf` to today where it is written inline, and appends one CORRECTIONS.md row per
 * patch under today's heading, citing the registry URL. Nothing runs without an explicit selection.
 *
 *   npx tsx scripts/apply-factcheck.ts keynote-522.status imvigor011.phase   # by id.field
 *   npx tsx scripts/apply-factcheck.ts keynote-522                            # every patch on a record
 *   npx tsx scripts/apply-factcheck.ts --all                                  # everything proposed
 *   npx tsx scripts/apply-factcheck.ts --list                                 # show proposals, change nothing
 *   add --dry-run to print the edits without writing
 *
 * The record is found by its `id: "<id>"` line in src/data; the field is replaced within that record's
 * braces. Records whose field comes from a helper or a spread (for example a status set by a wrapper)
 * are reported as not applied so a human can edit them.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import type { Patch, PatchFile } from "./factcheck";

const root = process.cwd();

/** Every TypeScript data file, recursively. */
export function dataFiles(dir = join(root, "src", "data")): string[] {
  const out: string[] = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...dataFiles(p));
    else if (f.endsWith(".ts")) out.push(p);
  }
  return out;
}

/** Find the record with this id: the index range of its outer braces, or null. */
export function findRecord(source: string, id: string): { start: number; end: number } | null {
  const re = new RegExp(`\\bid: "${id.replace(/[-]/g, "\\-")}"`, "g");
  for (const m of source.matchAll(re)) {
    const lineStart = source.lastIndexOf("\n", m.index) + 1;
    const lineEnd = source.indexOf("\n", m.index);
    const line = source.slice(lineStart, lineEnd < 0 ? source.length : lineEnd);
    if (!/\b(kind|name):/.test(line)) continue;
    let depth = 0, j = m.index - 1, open = -1;
    while (j >= 0) {
      const c = source[j];
      if (c === "}" || c === "]" || c === ")") depth++;
      else if (c === "{") { if (depth === 0) { open = j; break; } depth--; }
      else if (c === "[" || c === "(") { if (depth === 0) break; depth--; }
      j--;
    }
    if (open < 0) continue;
    let k = open + 1; depth = 0;
    while (k < source.length) {
      const c = source[k];
      if (c === '"' || c === "'" || c === "`") { const q = c; k++; while (k < source.length && source[k] !== q) { if (source[k] === "\\") k++; k++; } k++; continue; }
      if (c === "{" || c === "[" || c === "(") depth++;
      else if (c === "}" || c === "]" || c === ")") { if (depth === 0) break; depth--; }
      k++;
    }
    return { start: open, end: k + 1 };
  }
  return null;
}

export type ApplyResult = { applied: boolean; source: string; reason?: string };

/** Replace `field: "<current>"` with `field: "<proposed>"` inside the record, and bump an inline `asOf`. */
export function applyPatchToSource(source: string, patch: Pick<Patch, "id" | "field" | "current" | "proposed">, today: string): ApplyResult {
  const range = findRecord(source, patch.id);
  if (!range) return { applied: false, source, reason: "record not found in this file" };
  let record = source.slice(range.start, range.end);
  // Most fields are quoted strings (phase "3" included); a bare number (enrolled: 405) is matched when no quoted form is present.
  const esc = patch.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const quotedRe = new RegExp(`(\\b${patch.field}:\\s*)"${esc}"`);
  const bareRe = new RegExp(`(\\b${patch.field}:\\s*)${esc}(?=[,\\s}])`);
  const q = quotedRe.test(record) ? '"' : /^\d+$/.test(patch.current) && /^\d+$/.test(patch.proposed) && bareRe.test(record) ? "" : null;
  const fieldRe = q === '"' ? quotedRe : bareRe;
  if (q === null) {
    const anyValue = new RegExp(`\\b${patch.field}:\\s*(?:"([^"]*)"|(\\d+))`).exec(record);
    const found = anyValue?.[1] ?? anyValue?.[2];
    return { applied: false, source, reason: found !== undefined ? `field is "${found}", not "${patch.current}"; re-run the fact check` : `field ${patch.field} is not written inline on this record (set by a helper or spread); edit by hand` };
  }
  record = record.replace(fieldRe, `$1${q}${patch.proposed}${q}`);
  record = record.replace(/(\basOf:\s*)"\d{4}-\d{2}-\d{2}"/, `$1"${today}"`);
  return { applied: true, source: source.slice(0, range.start) + record + source.slice(range.end) };
}

/** Append a row to CORRECTIONS.md under today's heading (creating the heading if needed), keeping newest first. */
export function appendCorrection(md: string, today: string, row: string): string {
  const heading = `## ${today}`;
  const table = `| Date | Entity | What was wrong | How found | Fix |\n|---|---|---|---|---|`;
  if (md.includes(heading)) {
    const idx = md.indexOf(heading);
    const tableEnd = md.indexOf("\n\n", md.indexOf("|---|", idx));
    const insertAt = tableEnd < 0 ? md.length : tableEnd;
    return md.slice(0, insertAt) + `\n${row}` + md.slice(insertAt);
  }
  // Insert the new day before the first existing day heading.
  const firstDay = md.search(/^## \d{4}-\d{2}-\d{2}/m);
  const block = `${heading}\n\n${table}\n${row}\n\n`;
  return firstDay < 0 ? md.trimEnd() + `\n\n${block}` : md.slice(0, firstDay) + block + md.slice(firstDay);
}

function main() {
  const argv = process.argv.slice(2);
  const dry = argv.includes("--dry-run");
  const list = argv.includes("--list");
  const all = argv.includes("--all");
  const selected = argv.filter((a) => !a.startsWith("--"));
  const path = join(root, "public", "factcheck-patches.json");
  if (!existsSync(path)) { console.error("No public/factcheck-patches.json. Run npm run factcheck first."); process.exit(1); }
  const file = JSON.parse(readFileSync(path, "utf8")) as PatchFile;
  if (list || (!all && !selected.length)) {
    console.log(`${file.patches.length} proposed patches (generated ${file.generated.slice(0, 10)}):`);
    for (const p of file.patches) console.log(`  ${p.id}.${p.field}: "${p.current}" -> "${p.proposed}"  (${p.reason})`);
    if (!list) console.log("\nName patches as id or id.field, or pass --all.");
    return;
  }
  const chosen = all ? file.patches : file.patches.filter((p) => selected.includes(p.id) || selected.includes(`${p.id}.${p.field}`));
  if (!chosen.length) { console.error("No proposed patch matches the selection."); process.exit(1); }
  const today = new Date().toISOString().slice(0, 10);
  const files = dataFiles();
  const sources = new Map<string, string>(files.map((f) => [f, readFileSync(f, "utf8")]));
  let corrections = readFileSync(join(root, "CORRECTIONS.md"), "utf8");
  const applied: Patch[] = [];
  for (const p of chosen) {
    let done = false;
    for (const f of files) {
      const src = sources.get(f)!;
      if (!src.includes(`id: "${p.id}"`)) continue;
      const r = applyPatchToSource(src, p, today);
      if (r.applied) { sources.set(f, r.source); console.log(`applied ${p.id}.${p.field}: "${p.current}" -> "${p.proposed}" in ${relative(root, f)}`); done = true; break; }
      if (r.reason && !r.reason.startsWith("record not found")) console.warn(`skipped ${p.id}.${p.field}: ${r.reason} (${relative(root, f)})`);
    }
    if (!done) { console.warn(`not applied ${p.id}.${p.field}: no inline field found in src/data`); continue; }
    applied.push(p);
    const route = p.route;
    corrections = appendCorrection(corrections, today, `| ${today} | [${p.id}](${route}) | \`${p.field}\` was "${p.current}"; the registry says ${p.registryValue}. | Weekly registry fact check ([source](${p.source})) | set to "${p.proposed}" via apply-factcheck |`);
  }
  if (dry) { console.log(`dry run: ${applied.length} patches would be applied; nothing written`); return; }
  for (const [f, src] of sources) if (src !== readFileSync(f, "utf8")) writeFileSync(f, src);
  if (applied.length) writeFileSync(join(root, "CORRECTIONS.md"), corrections);
  // Drop applied patches from the proposals file so the next run starts clean.
  const remaining = file.patches.filter((p) => !applied.includes(p));
  writeFileSync(path, JSON.stringify({ ...file, patches: remaining }, null, 0));
  console.log(`${applied.length} patches applied, ${remaining.length} remain. Run npm run validate, then commit with the CORRECTIONS.md rows.`);
}

if (process.argv[1]?.endsWith("apply-factcheck.ts")) main();
