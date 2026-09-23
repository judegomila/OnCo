/**
 * Read and write src/data/regional-approvals.ts without disturbing the hand-written rows.
 *
 * The file is a TypeScript module: a header (types, helper functions such as A(), W(), R(), epar()), one
 * `export const regionalApprovals = { ... }` object whose rows are each a single line, and a tail of exported
 * helpers. The bots must add rows to the object and nothing else, so this module parses the file into
 * head / lines / tail, keeps every comment and blank line as it found it, and refuses to parse anything inside
 * the object that is not a one-line row, a comment or a blank line. A mechanical regex edit once swallowed the
 * neighbouring row; parsing the whole object and serialising it back (round trip tested to be a no-op) is the guard.
 *
 * Row keys are written unquoted when they are plain identifiers and quoted otherwise, which is how the file is
 * written by hand.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const REGIONAL_APPROVALS_FILE = join(process.cwd(), "src", "data", "regional-approvals.ts");

export type IoLine = { kind: "row"; key: string; body: string; raw: string } | { kind: "other"; raw: string };
export type ParsedApprovals = { head: string; lines: IoLine[]; tail: string };

const OPEN = /^export const regionalApprovals: Record<string, RegionalRow> = \{$/m;
const ROW = /^  (?:"([^"\n]+)"|([A-Za-z_$][\w$]*)): (.+),$/;
const OTHER = /^\s*(\/\/.*)?$/;
const IDENT = /^[A-Za-z_$][\w$]*$/;

/** Split the module into its head, the rows of the regionalApprovals object and its tail. Throws on a line the writer could not reproduce. */
export function parseRegionalApprovals(src: string): ParsedApprovals {
  const open = src.match(OPEN);
  if (!open || open.index === undefined) throw new Error("regional-approvals-io: object opener not found");
  const bodyStart = open.index + open[0].length + 1;
  const close = src.indexOf("\n};\n", bodyStart - 1);
  if (close < 0) throw new Error("regional-approvals-io: object closer not found");
  const head = src.slice(0, bodyStart);
  const tail = src.slice(close + 1);
  const inner = src.slice(bodyStart, close + 1);
  const lines: IoLine[] = [];
  const rawLines = inner.split("\n");
  if (rawLines[rawLines.length - 1] === "") rawLines.pop();
  for (const raw of rawLines) {
    const m = raw.match(ROW);
    if (m) { lines.push({ kind: "row", key: m[1] ?? m[2], body: m[3], raw }); continue; }
    if (OTHER.test(raw)) { lines.push({ kind: "other", raw }); continue; }
    throw new Error(`regional-approvals-io: line is neither a one-line row nor a comment: ${raw.slice(0, 80)}`);
  }
  return { head, lines, tail };
}

export function serialiseRegionalApprovals(p: ParsedApprovals): string {
  return p.head + p.lines.map((l) => l.raw + "\n").join("") + p.tail;
}

export function formatKey(key: string): string { return IDENT.test(key) ? key : `"${key}"`; }

export function rowKeys(p: ParsedApprovals): string[] { return p.lines.flatMap((l) => (l.kind === "row" ? [l.key] : [])); }
export function hasRow(p: ParsedApprovals, key: string): boolean { return p.lines.some((l) => l.kind === "row" && l.key === key); }
export function rowBody(p: ParsedApprovals, key: string): string | undefined { const l = p.lines.find((x) => x.kind === "row" && x.key === key); return l && l.kind === "row" ? l.body : undefined; }

/** Helper names the object body may call; anything else in a new row is rejected before it reaches the file. */
export const KNOWN_HELPERS = ["A", "C", "V", "NF", "W", "UR", "R", "IN", "EU_NATIONAL", "regimen", "global", "epar", "mhra", "tga", "govuk"] as const;
const CALL = /\b([A-Za-z_$][\w$]*)\(/g;

/** True when the body is a single-line object literal whose calls are all known helpers and whose strings hold no newline. */
export function bodyIsWellFormed(body: string): boolean {
  if (!/^\{ .* \}$/.test(body) || body.includes("\n")) return false;
  let depth = 0;
  for (const ch of body) { if (ch === "{" || ch === "(") depth++; else if (ch === "}" || ch === ")") depth--; if (depth < 0) return false; }
  if (depth !== 0) return false;
  const stripped = body.replace(/"(?:[^"\\]|\\.)*"/g, '""');
  for (const m of stripped.matchAll(CALL)) if (!(KNOWN_HELPERS as readonly string[]).includes(m[1])) return false;
  return true;
}

/** Text for a TypeScript double-quoted string: quotes inside become apostrophes, as the hand-written rows do; newlines collapse. */
export function tsString(s: string): string { return `"${s.replace(/\s+/g, " ").replace(/\\/g, "/").replace(/"/g, "'").trim()}"`; }

/**
 * Append a row before the closing brace. The comment (if given) is written once, immediately above the first row
 * appended under it, so a run's rows sit together under a dated heading. Throws if the key exists or the body is malformed.
 */
export function appendRow(p: ParsedApprovals, key: string, body: string, comment?: string): ParsedApprovals {
  if (hasRow(p, key)) throw new Error(`regional-approvals-io: row ${key} already exists`);
  if (!bodyIsWellFormed(body)) throw new Error(`regional-approvals-io: malformed row body for ${key}: ${body.slice(0, 80)}`);
  const lines = [...p.lines];
  if (comment) {
    const raw = `  // ${comment}`;
    if (!lines.some((l) => l.kind === "other" && l.raw === raw)) lines.push({ kind: "other", raw });
  }
  lines.push({ kind: "row", key, body, raw: `  ${formatKey(key)}: ${body},` });
  return { ...p, lines };
}

export function readRegionalApprovals(file = REGIONAL_APPROVALS_FILE): ParsedApprovals { return parseRegionalApprovals(readFileSync(file, "utf8")); }
export function writeRegionalApprovals(p: ParsedApprovals, file = REGIONAL_APPROVALS_FILE): void { writeFileSync(file, serialiseRegionalApprovals(p)); }

const REGION_ORDER = ["US", "EU", "UK", "JP", "CN", "AU", "IN"];

/** Top-level `KEY: expr` entries of a one-line object body, split at depth-one commas outside strings. */
export function splitEntries(body: string): Array<{ region: string; expr: string }> | undefined {
  const m = body.match(/^\{ (.*) \}$/);
  if (!m) return undefined;
  const parts: string[] = [];
  let depth = 0, inStr = false, cur = "";
  for (let i = 0; i < m[1].length; i++) {
    const ch = m[1][i];
    if (inStr) { cur += ch; if (ch === "\\") { cur += m[1][++i] ?? ""; continue; } if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; cur += ch; continue; }
    if (ch === "{" || ch === "(") depth++;
    if (ch === "}" || ch === ")") depth--;
    if (ch === "," && depth === 0) { parts.push(cur); cur = ""; if (m[1][i + 1] === " ") i++; continue; }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  const out: Array<{ region: string; expr: string }> = [];
  for (const p of parts) {
    const e = p.match(/^([A-Z]{2}): (.+)$/);
    if (!e) return undefined;
    out.push({ region: e[1], expr: e[2] });
  }
  return out;
}

/** The body with `region: expr` added in the file's region order, or undefined when the body is a helper call (global(), regimen()) or already has the region. */
export function withRegionEntry(body: string, region: string, expr: string): string | undefined {
  const entries = splitEntries(body);
  if (!entries || entries.some((e) => e.region === region)) return undefined;
  const at = entries.findIndex((e) => REGION_ORDER.indexOf(e.region) > REGION_ORDER.indexOf(region));
  const next = [...entries];
  next.splice(at < 0 ? entries.length : at, 0, { region, expr });
  return `{ ${next.map((e) => `${e.region}: ${e.expr}`).join(", ")} }`;
}

/** Add a region entry to an existing row. Throws if the row is missing, is a helper call, or already carries the region. */
export function setRegion(p: ParsedApprovals, key: string, region: string, expr: string): ParsedApprovals {
  const idx = p.lines.findIndex((l) => l.kind === "row" && l.key === key);
  const line = p.lines[idx];
  if (idx < 0 || line.kind !== "row") throw new Error(`regional-approvals-io: no row ${key}`);
  const body = withRegionEntry(line.body, region, expr);
  if (!body) throw new Error(`regional-approvals-io: cannot add ${region} to ${key} (helper call or region present): ${line.body.slice(0, 60)}`);
  if (!bodyIsWellFormed(body)) throw new Error(`regional-approvals-io: malformed body after adding ${region} to ${key}`);
  const lines = [...p.lines];
  lines[idx] = { kind: "row", key, body, raw: `  ${formatKey(key)}: ${body},` };
  return { ...p, lines };
}

/** The EPAR slug of an EMA medicine URL, when it is one (https://www.ema.europa.eu/en/medicines/human/EPAR/<slug>). */
export function eparSlug(url?: string): string | undefined {
  const m = url?.match(/^https:\/\/www\.ema\.europa\.eu\/en\/medicines\/human\/EPAR\/([a-z0-9-]+)\/?$/i);
  return m?.[1].toLowerCase();
}

/** Source expression for a row: the epar() helper when the URL is an EPAR page, otherwise the URL as a string. */
export function sourceExpr(url: string): string { const slug = eparSlug(url); return slug ? `epar("${slug}")` : tsString(url); }
