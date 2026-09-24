import { TARGET_DISTRIBUTION_LABEL, TARGET_DISTRIBUTIONS, TARGET_SPECIFICITIES, TARGET_SPECIFICITY_LABEL, type TargetDistribution, type TargetSpecificity } from "@/lib/kinds";

/**
 * Target specificity and distribution as the pages read them: one plain sentence per class, what the class means for a
 * medicine, the pill glyphs, examples, and how a `?specificity=` or `?distribution=` deep link is parsed. Pure module
 * shared by the target page pills (src/components/TargetSpecificityPills.tsx), the browser facets (src/lib/kind-browser.ts),
 * the gene hub (src/lib/genome-hub.ts) and the explainer at /targets/specificity/. The values themselves come from
 * scripts/fetch-target-specificity.ts (src/data/target-specificity.ts).
 */

/** One plain sentence defining the class. */
export const SPECIFICITY_BLURB: Record<TargetSpecificity, string> = {
  "tumour-specific": "The medicine aims at an altered form of the protein (a mutation, a fusion or a neoantigen) that normal cells do not carry.",
  "tumour-associated": "Normal tissue carries the target too, at lower levels; the medicine relies on the tumour carrying much more of it.",
  "lineage-antigen": "The target sits on one normal cell lineage (B cells, plasma cells, myeloid cells) as well as on the cancer that grew from it.",
  "broadly-expressed": "Nearly every dividing cell carries or depends on the target; the medicine works because tumour cells divide faster or depend on it more.",
  "germline-variant": "The alteration is inherited and present in every cell of the body; it shapes cancer risk and picks medicines that exploit the loss.",
  "immune-microenvironment": "The target is on immune, stromal or bone cells around the tumour, not on the tumour cell itself.",
};

/** What the class means for a medicine, in one sentence: on-target toxicity, testing, or the source of the therapeutic window. */
export const SPECIFICITY_MEDICINE: Record<TargetSpecificity, string> = {
  "tumour-specific": "Normal cells lack the altered form, so on-target harm to healthy tissue is low; a tumour or blood test must find the alteration first.",
  "tumour-associated": "Normal tissue with the target is hit too (on-target, off-tumour toxicity), so the dose and the level of the target in the tumour both matter; an expression test often decides eligibility.",
  "lineage-antigen": "The medicine clears the normal lineage as well (B-cell aplasia, low antibodies, cytopenias); that is tolerated when the lineage can be replaced or its job supported.",
  "broadly-expressed": "Side effects follow the body's fastest-dividing normal cells (marrow, gut lining, hair); no target test is needed.",
  "germline-variant": "A blood test finds it, it may run in the family, and the same result picks synthetic-lethal medicines such as PARP inhibitors.",
  "immune-microenvironment": "Harm comes from the immune system acting on normal organs (immune-related adverse events), not from the drug hitting tumour tissue.",
};

/** Examples the explainer and tooltips name, as corpus target ids (only the ones that exist are shown). */
export const SPECIFICITY_EXAMPLES: Record<TargetSpecificity, string[]> = {
  "tumour-specific": ["bcr-abl", "kras", "egfr", "braf", "alk", "ntrk", "ret"],
  "tumour-associated": ["her2", "trop2", "psma", "folr1", "cldn18-2", "nectin4"],
  "lineage-antigen": ["cd19", "cd20", "bcma", "cd38", "cd33", "cd22"],
  "broadly-expressed": ["tubulin", "top1", "parp", "cdk4-6", "vegf", "top2a"],
  "germline-variant": ["brca", "mlh1", "msh2", "palb2", "atm", "chek2"],
  "immune-microenvironment": ["pd1", "pdl1", "ctla4", "lag3", "tigit", "cd47"],
};

export const DISTRIBUTION_BLURB: Record<TargetDistribution, string> = {
  "one-type": "Evidence for this target sits in one cancer family: the prevalence rows, label thresholds and approvals all point to one place.",
  "few-types": "The target matters in a handful of cancer families, each with its own evidence.",
  "many-types": "The target appears across many cancer families, and often a tissue-agnostic approval lets any tumour carrying it be treated.",
  "not-established": "No prevalence row, threshold, approval or catalogue association ties the target to a cancer type yet.",
};

export const DISTRIBUTION_MEDICINE: Record<TargetDistribution, string> = {
  "one-type": "Testing for it belongs to that cancer's standard work-up.",
  "few-types": "Testing is routine in those cancers and worth asking about in related ones.",
  "many-types": "Broad tumour profiling can find it in any cancer; a tissue-agnostic label means the medicine may be used wherever it is found.",
  "not-established": "Ask whether a profiling panel reports it; no cancer-specific guidance exists yet.",
};

/** Pill glyphs, one path each, drawn at 24 by 24 with a 2 px stroke (the gene hub's convention). */
export const SPECIFICITY_GLYPH: Record<TargetSpecificity, string> = {
  "tumour-specific": "M12 3v6M12 15v6M3 12h6M15 12h6M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  "tumour-associated": "M4 20h16M6 20V12M10 20V8M14 20V5M18 20v-4",
  "lineage-antigen": "M12 3v5M8 8h8M8 8v4M16 8v4M6 12v5M10 12v5M14 12v5M18 12v5M4 21h16",
  "broadly-expressed": "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01",
  "germline-variant": "M9 3c0 4 6 4 6 9s-6 5-6 9M15 3c0 4-6 4-6 9s6 5 6 9M10 6h4M10 18h4",
  "immune-microenvironment": "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4zM9 12h6",
};
export const DISTRIBUTION_GLYPH: Record<TargetDistribution, string> = {
  "one-type": "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 12h.01",
  "few-types": "M7 7h.01M17 7h.01M12 17h.01M7 7a2 2 0 1 0 0 .01M17 7a2 2 0 1 0 0 .01M12 17a2 2 0 1 0 0 .01",
  "many-types": "M5 5h.01M12 5h.01M19 5h.01M5 12h.01M12 12h.01M19 12h.01M5 19h.01M12 19h.01M19 19h.01",
  "not-established": "M12 17h.01M12 13a3 3 0 1 0-3-3M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
};

const fold = (s: string) => s.trim().toLowerCase();

/** A `?specificity=` value as the browser or the explainer writes it: the id (`lineage-antigen`) or its label. Null when unknown. */
export function parseSpecificity(v: string | null | undefined): TargetSpecificity | null {
  if (!v) return null;
  const f = fold(v);
  return TARGET_SPECIFICITIES.find((s) => s === f || fold(TARGET_SPECIFICITY_LABEL[s]) === f) ?? null;
}

/** A `?distribution=` value: the id (`many-types`) or its label. Null when unknown. */
export function parseDistribution(v: string | null | undefined): TargetDistribution | null {
  if (!v) return null;
  const f = fold(v);
  return TARGET_DISTRIBUTIONS.find((d) => d === f || fold(TARGET_DISTRIBUTION_LABEL[d]) === f) ?? null;
}

/** The target browser filtered to one class (its facets take labels). */
export const specificityTableHref = (s: TargetSpecificity) => `/targets/?specificity=${encodeURIComponent(TARGET_SPECIFICITY_LABEL[s])}`;
export const distributionTableHref = (d: TargetDistribution) => `/targets/?distribution=${encodeURIComponent(TARGET_DISTRIBUTION_LABEL[d])}`;
/** The browser filtered to the tumour-agnostic targets (a tag facet value written by src/lib/kind-browser.ts). */
export const TUMOUR_AGNOSTIC_FACET = "Tumour-agnostic approval";
export const tumourAgnosticTableHref = () => `/targets/?tags=${encodeURIComponent(TUMOUR_AGNOSTIC_FACET)}`;

/** The one-line tooltip on a specificity pill: the definition, then what it means for a medicine. */
export const specificityTip = (s: TargetSpecificity) => `${SPECIFICITY_BLURB[s]} ${SPECIFICITY_MEDICINE[s]}`;
export const distributionTip = (d: TargetDistribution, tumourAgnostic?: boolean) => `${DISTRIBUTION_BLURB[d]} ${tumourAgnostic ? "This target has a tissue-agnostic approval or label threshold: the medicine may be used in any tumour that carries it." : DISTRIBUTION_MEDICINE[d]}`;
