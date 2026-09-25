/**
 * Finding and merging records that are the same thing under two ids.
 *
 * The corpus grows in two ways: an editor writes a record by hand, and a fetcher ingests one from a registry or a
 * literature API. Both can reach the same study or the same paper, and when they do the corpus holds it twice under
 * two ids, each with its own published URL. This module is the shared part of the survey (scripts/dedupe-survey.ts)
 * and the merge (scripts/merge-records.ts). See docs/DUPLICATE-RECORDS.md for the rule.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const ROOT = process.cwd();

/** Every .ts file under src/data, where records are defined. */
export function dataFiles(dir = join(ROOT, "src/data")): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...dataFiles(p));
    else if (name.endsWith(".ts")) out.push(p);
  }
  return out;
}

/** Every source file that can hold an id as a string or an object key. */
export function sourceFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|tsx|json|md)$/.test(name)) out.push(p);
    }
  };
  for (const d of ["src", "scripts", "mcp", "packages", "docs"]) walk(join(ROOT, d));
  return out;
}

export type Definition = { file: string; line: number; text: string };

/**
 * Where a record id is defined: a line of the form `id: "<id>"` inside src/data. A record can have more than one,
 * a full record plus supplements, and the merge has to deal with all of them.
 */
export function definitionsOf(id: string, files = dataFiles()): Definition[] {
  const out: Definition[] = [];
  const re = new RegExp(`\\bid:\\s*"${escapeRe(id)}"`);
  for (const f of files) {
    const lines = readFileSync(f, "utf8").split("\n");
    lines.forEach((text, i) => {
      if (re.test(text)) out.push({ file: relative(ROOT, f), line: i + 1, text: text.trim().slice(0, 160) });
    });
  }
  return out;
}

export function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** A DOI as a comparison key: lower case, no resolver prefix, no trailing punctuation. */
export function normaliseDoi(doi: string): string {
  return doi.trim().toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "").replace(/[.,;]$/, "");
}

/**
 * How much a record carries, as a single number, so the survey can say which of a pair is the fuller one. Counts the
 * reading (findings, caveats, whatItMeans, summary, tldr), the relations and the links; a thin registry or literature
 * ingest scores in the low tens, a curated record in the hundreds.
 */
export function richness(e: Record<string, unknown>): number {
  let n = 0;
  const len = (v: unknown) => (typeof v === "string" ? v.length : 0);
  n += Math.min(len(e.summary), 600) / 10;
  n += Math.min(len(e.tldr), 300) / 10;
  n += Math.min(len(e.whatItMeans), 600) / 10;
  n += (Array.isArray(e.findings) ? e.findings.length : 0) * 10;
  n += (Array.isArray(e.caveats) ? e.caveats.length : 0) * 5;
  n += (Array.isArray(e.outcomes) ? e.outcomes.length : 0) * 5;
  n += (Array.isArray(e.links) ? e.links.length : 0) * 3;
  for (const f of REL_FIELDS_LOCAL) n += (Array.isArray(e[f]) ? (e[f] as unknown[]).length : 0) * 2;
  return Math.round(n);
}

const REL_FIELDS_LOCAL = ["related", "cancers", "sections", "technologies", "targets", "drugs", "companies", "institutions", "pathways", "terms", "trials", "people", "bottlenecks", "keyPapers", "journals", "dependsOn"] as const;

/**
 * De-duplicates repeated string literals inside one `[...]` on a line. Rewriting a retired id to its survivor can
 * leave `keyPapers: ["a", "a"]` where a record already named both, which is a duplicate React key and a duplicate
 * backlink. Only the innermost bracket group counts, so `cancers: ["a"], drugs: ["a"]` is left alone, and an object
 * key (a string followed by a colon) is never treated as a list entry. Pass `forbidden` to strip a value from every
 * list on the line: that is how a record whose own id is on the line stops referencing itself after a rewrite.
 */
export function dedupeLists(line: string, forbidden?: string): string {
  const drops: Array<[number, number]> = [];
  const stack: Array<{ list: boolean; seen: Set<string> }> = [];
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "[") stack.push({ list: true, seen: new Set() });
    else if (c === "{") stack.push({ list: false, seen: new Set() });
    else if (c === "]" || c === "}") stack.pop();
    else if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < line.length && line[j] !== c) { if (line[j] === "\\") j++; j++; }
      const value = line.slice(i + 1, j);
      const top = stack[stack.length - 1];
      if (top?.list && !/^\s*:/.test(line.slice(j + 1))) {
        if (value === forbidden || top.seen.has(value)) drops.push([i, j + 1]);
        else top.seen.add(value);
      }
      i = j;
    }
  }
  let out = line;
  for (const [from, to] of drops.reverse()) {
    let a = from, b = to;
    const after = /^\s*,\s*/.exec(out.slice(b));
    const before = /,\s*$/.exec(out.slice(0, a));
    if (after) b += after[0].length;
    else if (before) a -= before[0].length;
    out = out.slice(0, a) + out.slice(b);
  }
  return out;
}
