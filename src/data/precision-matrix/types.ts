import type { EvidenceGrade } from "@/lib/complementary";

/**
 * The precision matrix: for each technology whose usefulness is limited by how precise it is, what precision means
 * there, how precise it is today, what limits it, the next step, and what that step would buy a patient.
 *
 * Side data in the manner of src/data/recovery-matrix.ts, held to the same rules:
 *  - A value exists only where a source states it. Nothing is written from first principles.
 *  - `today.value` is copied from the source with the setting or cohort it came from, and `quote` is a verbatim
 *    fragment of the abstract, label or guideline, checked against the raw text by exact string match.
 *  - A missing field means no source was found. `buys.outcome: "not-established"` says so where readers will ask.
 *  - Where precision is sold beyond its evidence, `grade` and `oversold` say so rather than leaving it out.
 * Ids in `technologyIds`, `relatedIds` are corpus ids, validated by src/data/precision-matrix.test.ts.
 *
 * Each facet owns one file in this folder (molecular.ts, radiation.ts, surgery.ts, dosing.ts); index.ts joins them.
 * This type is the interface between them: change it only with every facet's rows in view.
 */
export type Source = { label: string; url: string; quote?: string };

export type PrecisionDomain = "molecular" | "radiation" | "surgery-imaging-pathology" | "dosing";

export const DOMAIN_LABEL: Record<PrecisionDomain, string> = {
  molecular: "Molecular detection and matching",
  radiation: "Radiotherapy delivery",
  "surgery-imaging-pathology": "Surgery, imaging and pathology",
  dosing: "Dosing",
};

export type LimitKind = "physics" | "biology" | "sampling" | "workflow" | "cost-access";

export type PrecisionRow = {
  /** Kebab-case, unique across the matrix. */
  id: string;
  domain: PrecisionDomain;
  /** "ctDNA tumour-informed MRD assays", "Breath-hold radiotherapy for left-sided breast cancer". */
  label: string;
  /** Corpus records this row is about. At least one. */
  technologyIds: string[];
  /** What precision means here, with its unit: "lowest tumour fraction detected in plasma", "margin added around the target, mm". */
  metric: string;
  /** How precise it is today, as the source states it. */
  today?: { value: string; context: string; source: Source };
  /** What stops it being more precise. */
  limits: Array<{ kind: LimitKind; text: string; source?: Source }>;
  /** The next step in precision and how far along it is. */
  nextStep?: { text: string; status: "available-not-routine" | "in-trials" | "research"; source?: Source; relatedIds?: string[] };
  /** What that step would buy a patient, and whether that is shown. */
  buys?: { text: string; outcome: "established" | "plausible" | "not-established"; source?: Source };
  /** Evidence grade on the src/data/complementary.ts model, where the precision is marketed. */
  grade?: EvidenceGrade;
  /** Where the precision claimed outruns the evidence, in one sentence with its source in `limits` or `buys`. */
  oversold?: string;
  relatedIds?: string[];
};
