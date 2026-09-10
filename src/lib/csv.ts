/**
 * CSV and JSON export helpers shared by the browser (DownloadTable) and the build (scripts/build-api.ts).
 * No DOM access outside `download()`, so the module is safe to import from Node scripts.
 */

/** A single exportable cell: text, a number, a boolean, or nothing. */
export type CsvCell = string | number | boolean | null | undefined;
export type CsvRow = Record<string, CsvCell>;

/** Attribution line written as the first line of every CSV (as a `#` comment) and into every JSON export. */
export const EXPORT_LICENCE = "Data from OnCo (https://onco.cc), CC BY-NC 4.0. Free for non-commercial and educational use with attribution: name OnCo and link to https://onco.cc wherever the data or derived text appears. Commercial use needs a licence from OnCo (https://onco.cc/about/#licence).";

/** RFC 4180 quoting: wrap when the value holds a comma, quote, newline or leading/trailing space; double inner quotes. */
export function csvEscape(v: CsvCell): string {
  if (v === null || v === undefined) return "";
  const s = typeof v === "string" ? v : String(v);
  return /[",\r\n]|^\s|\s$/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/**
 * Serialise rows to CSV. Columns default to the union of keys in first-seen order. `comment` (default: the
 * licence line) is written first as `# ...`; pass `null` to omit it for tools that cannot skip comment lines.
 */
export function toCsv(rows: CsvRow[], columns?: string[], comment: string | null = EXPORT_LICENCE): string {
  const cols = columns ?? [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const lines: string[] = [];
  if (comment) lines.push(`# ${comment.replace(/\r?\n/g, " ")}`);
  lines.push(cols.map(csvEscape).join(","));
  for (const r of rows) lines.push(cols.map((c) => csvEscape(r[c])).join(","));
  return `${lines.join("\r\n")}\r\n`;
}

/**
 * Flatten an arbitrary record into CSV cells: scalars pass through, arrays of scalars join with "; ", arrays
 * of objects and nested objects become compact JSON so nothing is lost. Keys are kept as they are.
 */
export function flattenForCsv(record: Record<string, unknown>): CsvRow {
  const out: CsvRow = {};
  for (const [k, v] of Object.entries(record)) {
    if (v === null || v === undefined) out[k] = "";
    else if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") out[k] = v;
    else if (Array.isArray(v) && v.every((x) => x === null || ["string", "number", "boolean"].includes(typeof x))) out[k] = v.map((x) => String(x ?? "")).join("; ");
    else out[k] = JSON.stringify(v);
  }
  return out;
}

/** Newline-delimited JSON: one compact object per line, no trailing comma problems for streaming tools. */
export function toNdjson(rows: unknown[]): string {
  return rows.map((r) => JSON.stringify(r)).join("\n") + (rows.length ? "\n" : "");
}

/** `onco-<slug>-YYYY-MM-DD.<ext>`; the slug keeps letters, digits and hyphens only. */
export function exportFilename(name: string, ext: "csv" | "json", date = new Date()): string {
  const slug = name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "table";
  return `onco-${slug}-${date.toISOString().slice(0, 10)}.${ext}`;
}

/** JSON export envelope: the licence line travels with the rows. */
export function toJsonExport(rows: unknown[], meta: { name: string; source?: string; date?: Date }): string {
  return JSON.stringify({ name: meta.name, source: meta.source ?? "https://onco.cc", exported: (meta.date ?? new Date()).toISOString(), licence: "CC BY-NC 4.0", attribution: EXPORT_LICENCE, count: rows.length, rows }, null, 0);
}

/** Trigger a browser download of text. No-op outside the browser. */
export function download(filename: string, text: string, mime: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
