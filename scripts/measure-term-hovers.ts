/**
 * Pair 6 of docs/proposals/cross-links-census-2026-11.md: how many glossary terms mentioned in hovered prose get
 * their hover, under the cap `withTermHovers` applies to one paragraph.
 *
 *   npx tsx scripts/measure-term-hovers.ts                the cap the site uses today
 *   npx tsx scripts/measure-term-hovers.ts 12 24 0        compare caps (0 is no cap)
 *
 * It replays the site's own matcher (`hoverHits` in src/lib/term-hover.tsx, the function the pages call) over the
 * fields the record pages pass through it: `summary` paragraph by paragraph as `splitSummary` cuts it, `notes`,
 * paper `findings`, `whatItMeans` and `caveats`, bottleneck `causes` and `currentEfforts`, target `biology`,
 * `whereFound` and `interventions`, technology `strengths` and `limitations`, institution `programs`.
 *
 * A (record, term) pair is MENTIONED when the term matches somewhere in those fields with no cap, and HOVERED when
 * it is among the hits at the cap. The census of 11 November counted mentions with its own, wider pattern set
 * (aliases the site does not match, and the plain-text fields); this counts only what the site's matcher can see,
 * so the two totals differ and only this script's before and after are comparable with each other.
 *
 * `hovers` is every hover of any kind the fields carry: the cost of a cap in markup and payload, since each one is
 * a client component with the record's name, one-line summary and route.
 */
import { graph } from "../src/lib/graph";
import { REL_FIELDS } from "../src/lib/kinds";
import type { Entity } from "../src/lib/schema";
import { splitSummary } from "../src/components/ReadMore";
import { HOVER_CAP, hoverHits } from "../src/lib/term-hover";

const g = graph();
const list = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : typeof v === "string" && v ? [v] : []);

/** The paragraphs a record page passes through `withTermHovers`, with whether the page's own id is skipped. */
export function hoveredParagraphs(e: Entity): Array<{ text: string; skipSelf: boolean }> {
  const r = e as unknown as Record<string, unknown>;
  const out: Array<{ text: string; skipSelf: boolean }> = [];
  const add = (v: unknown, skipSelf = true) => { for (const text of list(v)) out.push({ text, skipSelf }); };
  const { lead, rest } = splitSummary(e.summary);
  add([...lead, ...rest]);
  add(r.notes);
  if (e.kind === "paper") { add(r.findings, false); add(r.whatItMeans, false); add(r.caveats, false); }
  if (e.kind === "bottleneck") { add(r.causes, false); add(r.currentEfforts, false); }
  if (e.kind === "target") { add(r.biology); add(r.whereFound); add(r.interventions); }
  if (e.kind === "technology") { add(r.strengths); add(r.limitations); }
  if (e.kind === "institution") add(r.programs);
  return out;
}

function measure(cap: number) {
  let hovers = 0, termHovers = 0, mentioned = 0, hovered = 0, linkedOtherwise = 0, recordsWithGap = 0, paragraphsCut = 0;
  for (const e of g.entities as Entity[]) {
    const rel = new Set(REL_FIELDS.flatMap((f) => e[f]));
    const all = new Set<string>(), got = new Set<string>();
    for (const p of hoveredParagraphs(e)) {
      const skip = p.skipSelf ? e.id : undefined;
      const full = hoverHits(p.text, { skipId: skip, max: 0 });
      const capped = cap ? hoverHits(p.text, { skipId: skip, max: cap }) : full;
      if (capped.length < full.length) paragraphsCut++;
      hovers += capped.length;
      for (const h of full) if (h.ref.kind === "term") all.add(h.ref.id);
      for (const h of capped) if (h.ref.kind === "term") { got.add(h.ref.id); termHovers++; }
    }
    mentioned += all.size;
    hovered += got.size;
    let gap = 0;
    for (const id of all) if (!got.has(id)) { if (rel.has(id) || REL_FIELDS.some((f) => g.get(id)?.[f].includes(e.id))) linkedOtherwise++; else gap++; }
    if (gap) recordsWithGap++;
  }
  return { cap: cap || "none", hovers, termHovers, mentioned, hovered, cutByCap: mentioned - hovered, ofWhichLinkedInARelationField: linkedOtherwise, recordsWithAnUnlinkedTerm: recordsWithGap, paragraphsCut };
}

if (require.main === module) {
  const caps = process.argv.slice(2).map(Number);
  console.table((caps.length ? caps : [HOVER_CAP]).map(measure));
}
