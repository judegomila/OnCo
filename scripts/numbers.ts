/**
 * Unsourced-number detector. Pure function of the corpus (no network).
 *
 * Rule one of the corpus is "cite it". This finds records whose `tldr`, `summary` or trial `result`
 * carry a quantitative claim (a percentage, a hazard ratio, a duration in months, a dollar or pound
 * figure, a "million"/"billion" count) but which have no external `links`, no `wikipedia` page and,
 * for trials, no `nct`; and structured trial outcomes with numbers but no `source`.
 *
 * The findings are medium severity and are merged into public/audit.json by scripts/audit.ts, so
 * they surface at /audit/. Groundwork for source-per-sentence (hub-ideas2 #31).
 *
 * Run alone for a summary: npx tsx scripts/numbers.ts
 */
import { graph } from "../src/lib/graph";
import { routeFor, type Entity } from "../src/lib/schema";

export type NumberKind = "percent" | "hazard-ratio" | "months" | "money" | "count";
export type NumberHit = { kind: NumberKind; text: string };

/** Ordered so a hazard ratio like "HR 0.65" is not double counted as a bare count. */
const PATTERNS: Array<[NumberKind, RegExp]> = [
  ["percent", /\b\d+(?:\.\d+)?\s?(?:%|percent\b|per cent\b)/gi],
  ["hazard-ratio", /\b(?:HR|hazard ratio)\s*(?:of|=|:)?\s*\d?\.\d+\b/gi],
  ["months", /\b\d+(?:\.\d+)?\s?(?:months?|mo)\b(?!\s+of\s+age)/gi],
  ["money", /(?:\$|£|€|US\$)\s?\d[\d,]*(?:\.\d+)?\s?(?:k|m|bn|million|billion|thousand)?\b/gi],
  ["count", /\b\d+(?:\.\d+)?\s?(?:million|billion|thousand)\b/gi],
];

/** Every quantitative claim in a piece of text. Years alone are not numbers in this sense. */
export function extractNumbers(text: string): NumberHit[] {
  const hits: NumberHit[] = [];
  for (const [kind, re] of PATTERNS) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) hits.push({ kind, text: m[0].trim() });
  }
  return hits;
}

/** The prose fields a reader sees where a number would need a source. */
export function proseOf(e: Entity): string {
  const parts = [e.tldr, e.summary];
  if (e.kind === "trial" && e.result) parts.push(e.result);
  return parts.join(" \n ");
}

export function hasAnySource(e: Entity): boolean {
  if (e.links.length > 0 || e.wikipedia) return true;
  if (e.kind === "trial" && e.nct) return true;
  return false;
}

export type NumberFinding = { check: "unsourced-numbers" | "outcome-no-source"; severity: "medium"; id: string; kind: string; name: string; route: string; detail: string };

export function numberFindings(entities: Entity[]): NumberFinding[] {
  const out: NumberFinding[] = [];
  for (const e of entities) {
    // Sections, roadmaps and collections describe the site or a database rather than making claims about the world.
    if (e.kind === "section" || e.kind === "collection") continue;
    const hits = extractNumbers(proseOf(e));
    if (hits.length && !hasAnySource(e)) {
      const sample = [...new Set(hits.map((h) => h.text))].slice(0, 4).join(", ");
      out.push({ check: "unsourced-numbers", severity: "medium", id: e.id, kind: e.kind, name: e.name, route: routeFor(e), detail: `${hits.length} number${hits.length === 1 ? "" : "s"} in the text (${sample}) but no link, Wikipedia page or registry id` });
    }
    if (e.kind === "trial") {
      const missing = e.outcomes.filter((o) => !o.source && (o.arms.some((a) => a.value !== undefined) || o.hr !== undefined));
      if (missing.length) out.push({ check: "outcome-no-source", severity: "medium", id: e.id, kind: e.kind, name: e.name, route: routeFor(e), detail: `${missing.length} of ${e.outcomes.length} structured outcome${e.outcomes.length === 1 ? "" : "s"} carry numbers without a source: ${missing.map((o) => o.endpoint).slice(0, 3).join("; ")}` });
    }
  }
  return out;
}

if (process.argv[1]?.endsWith("numbers.ts")) {
  const g = graph();
  const findings = numberFindings(g.entities);
  const byKind: Record<string, number> = {};
  for (const f of findings) byKind[`${f.check} / ${f.kind}`] = (byKind[`${f.check} / ${f.kind}`] ?? 0) + 1;
  console.log(`numbers: ${findings.length} findings across ${g.entities.length} entities`);
  for (const [k, n] of Object.entries(byKind).sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);
}
