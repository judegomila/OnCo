/**
 * Maps the open pipeline's combination proposals (src/data/combination-ideas.ts, validated by CombinationIdeaSchema)
 * onto the engine's grids for the format pages (/pipeline/engine/<format>/, "Proposed, not yet tried").
 *
 * A proposal names its two parts under its own axis keys (target and payloadClass for an ADC, targetA and targetB
 * for a bispecific, target and isotope, costimulatoryDomain or e3Ligase for the rest) with values that are corpus
 * ids where one exists and stable kebab-case keys otherwise (lutetium-177, 4-1bb, vhl). The engine names the same
 * parts by its own ids (lu-177, 4-1bb, vhl), so each value is normalised to the grid: it matches when it is a row
 * or column id of that format, the slug of a row or column name, or, on a target axis, a corpus target id (a target
 * no medicine of the format has used yet is a legitimate untried row). A value that matches none of these keeps its
 * record in the table but is listed in `unmatched`, which the test prints, so a renamed id shows up rather than
 * silently drifting out of the grid.
 */
import { graph } from "./graph";
import type { Engine, FormatIndex, ProposedCell } from "./modular";
import type { FormatId } from "./modular-formats";
import { CombinationIdeaSchema, type CombinationIdea, type CombinationIdeaInput } from "./schema";
import { combinationIdeas } from "@/data/combination-ideas";

/** The proposal's own axis keys, in the engine's axis order (row, column), per format. */
export const PROPOSAL_AXES: Record<string, [string, string]> = {
  adc: ["target", "payloadClass"],
  radioligand: ["target", "isotope"],
  "car-t": ["target", "costimulatoryDomain"],
  bispecific: ["targetA", "targetB"],
  degrader: ["target", "e3Ligase"],
};

/** Plain status labels for the pill; the record's own status strings are the keys. */
export const PROPOSAL_STATUS: Record<string, { label: string; chip: string; tip: string }> = {
  "clinical evidence": { label: "Clinical evidence", chip: "tone-live", tip: "A registered trial or clinical report of this combination was found in the search recorded on the row." },
  "preclinical evidence": { label: "Preclinical", chip: "tone-early", tip: "A paper, patent or company page describes this combination before it reached patients." },
  "no public evidence": { label: "No public evidence", chip: "border border-dashed border-border text-muted", tip: "The search recorded on the row found nothing public that tests this combination." },
  "already in development (missed by decomposer)": { label: "Already in development", chip: "tone-set", tip: "A corpus medicine occupies this cell but its record lacks the field the decomposer reads (payload, ligase), so the grid shows the cell as untried; the record ids are in decomposerMissed." },
};

export type Unmatched = { id: string; format: string; axis: string; value: string; why: string };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const KIND_WORD: Record<string, string> = { trial: "Trial", paper: "Paper", patent: "Patent", "company-page": "Company page" };

/** Lookup from a proposal value to a grid id for one axis of one format: ids, name slugs, and (target axes) corpus target ids. */
function axisLookup(f: FormatIndex, side: "row" | "col"): (value: string) => string | undefined {
  const items = side === "row" ? f.rows : f.cols;
  const byId = new Map<string, string>();
  for (const it of items) { byId.set(it.id, it.id); byId.set(slug(it.name), it.id); byId.set(slug(it.name.replace(/\s*\(.*?\)\s*$/, "")), it.id); }
  const key = f.format.axes[side === "row" ? 0 : 1];
  const targetAxis = key === "target" || key === "targetB";
  const g = graph();
  return (value: string) => {
    const hit = byId.get(value) ?? byId.get(slug(value));
    if (hit) return hit;
    if (targetAxis) { const e = g.get(value); if (e?.kind === "target") return e.id; }
    return undefined;
  };
}

function evidenceLabel(e: CombinationIdea["evidence"][number]): string {
  const who = e.sponsor ? e.sponsor.replace(/\s+et al\.?,?.*$/i, " et al.") : e.source;
  return `${KIND_WORD[e.kind] ?? cap(e.kind)}: ${who} (${e.date})${e.adjacent ? ", neighbouring cell" : ""}`;
}

/** Every proposal for one format as grid cells, sorted by score, with the values that could not be placed. */
export function proposedCells(f: FormatIndex, ideas: CombinationIdeaInput[] = combinationIdeas): { cells: ProposedCell[]; unmatched: Unmatched[] } {
  const axes = PROPOSAL_AXES[f.format.id];
  if (!axes) return { cells: [], unmatched: [] };
  const row = axisLookup(f, "row"), col = axisLookup(f, "col");
  const cells: ProposedCell[] = [];
  const unmatched: Unmatched[] = [];
  for (const raw of ideas) {
    if (raw.format !== f.format.id) continue;
    const c = CombinationIdeaSchema.parse(raw);
    const [ka, kb] = axes;
    const va = c.components[ka] ?? "", vb = c.components[kb] ?? "";
    let a = row(va), b = col(vb);
    // A bispecific proposal may name its arms the other way round from the grid (tumour antigen as row, effector or second arm as column).
    if (f.format.id === "bispecific" && (!a || !b)) { const a2 = row(vb), b2 = col(va); if (a2 && b2) { a = a2; b = b2; } }
    const missing: string[] = [];
    if (!a) { missing.push(va || `(no ${ka})`); unmatched.push({ id: c.id, format: c.format, axis: ka, value: va, why: va ? `not a ${f.format.axes[0]} row id, row name or corpus target id` : `record has no ${ka} component` }); }
    if (!b) { missing.push(vb || `(no ${kb})`); unmatched.push({ id: c.id, format: c.format, axis: kb, value: vb, why: vb ? `not a ${f.format.axes[1]} column id or column name` : `record has no ${kb} component` }); }
    cells.push({
      id: c.id, format: c.format as FormatId, name: c.name,
      a: a ?? va, b: b ?? vb, raw: { a: va, b: vb }, matched: !missing.length, unmatched: missing,
      rationale: `${c.rationale.trim()} ${c.plausibilityNote.trim()}`.trim(), caveat: c.caveat,
      status: c.status, statusLabel: PROPOSAL_STATUS[c.status]?.label ?? cap(c.status),
      score: c.score,
      evidence: c.evidence.map((e) => ({ label: evidenceLabel(e), url: e.url, quote: e.quote, kind: e.kind, ...(e.adjacent ? { adjacent: true } : {}) })),
      refs: [...new Set([...c.refs, ...c.decomposerMissed])], cancers: c.cancers,
      proposedBy: "OnCo open pipeline", on: c.searched.on,
    });
  }
  cells.sort((x, y) => y.score.total - x.score.total || x.name.localeCompare(y.name));
  return { cells, unmatched };
}

/** Proposals for every format of the engine, keyed by format id. */
export function proposedByFormat(e: Engine, ideas: CombinationIdeaInput[] = combinationIdeas): Record<string, { cells: ProposedCell[]; unmatched: Unmatched[] }> {
  return Object.fromEntries(e.formats.map((f) => [f.format.id, proposedCells(f, ideas)]));
}

/** The score's parts in one line, for the tooltip on the score. */
export function scoreParts(s: ProposedCell["score"]): string {
  return `Score ${s.total} of 100 = burden ${s.burden}/40 (${s.worldDeaths.toLocaleString("en-GB")} world deaths in 2022 over the listed cancers) + validation of part A ${s.validationA}/15 + validation of part B ${s.validationB}/15 + plausibility ${s.plausibility}/30. Formula in docs/OPEN-PIPELINE.md.`;
}
