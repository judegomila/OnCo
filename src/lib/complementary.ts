/**
 * Evidence grades for complementary and supportive approaches. A grade is a plain reading of how much and
 * what kind of evidence exists, not a measure of effect size. Records carry it as a tag `evidence:<grade>`
 * so it travels with the entity (hover cards, entity page, hub page) without a schema change.
 *
 * This module has no graph import so client components can use it.
 */
export const EVIDENCE_GRADES = ["strong", "moderate", "insufficient", "no-benefit", "harm"] as const;
export type EvidenceGrade = (typeof EVIDENCE_GRADES)[number];

export const GRADE_META: Record<EvidenceGrade, { label: string; short: string; tone: string; blurb: string }> = {
  strong: {
    label: "Strong evidence", short: "Strong",
    tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    blurb: "Consistent randomised trials or a systematic review, and at least one major guideline (ASCO, SIO, MASCC, NCCN, NICE) recommends it for the stated purpose.",
  },
  moderate: {
    label: "Some evidence", short: "Some",
    tone: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
    blurb: "Randomised trials exist but are small, mixed or limited to one setting; guidelines say it may be offered or reserve judgement.",
  },
  insufficient: {
    label: "Insufficient evidence", short: "Insufficient",
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    blurb: "Laboratory, animal or uncontrolled human data only, or trials too small and inconsistent to draw a conclusion. Not a reason to use it outside a trial.",
  },
  "no-benefit": {
    label: "Tested, no benefit", short: "No benefit",
    tone: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    blurb: "Adequately sized randomised trials were run and found no effect on the outcome it was claimed to change.",
  },
  harm: {
    label: "Evidence of harm or interaction", short: "Harm",
    tone: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
    blurb: "Direct toxicity, a clinically important interaction with cancer treatment, or use in place of standard treatment that is associated with worse survival.",
  },
};

export const GRADE_TAG_PREFIX = "evidence:";

/** The grade encoded in an entity's tags, if any. */
export function gradeFromTags(tags: readonly string[]): EvidenceGrade | undefined {
  for (const t of tags) {
    if (!t.startsWith(GRADE_TAG_PREFIX)) continue;
    const g = t.slice(GRADE_TAG_PREFIX.length);
    if ((EVIDENCE_GRADES as readonly string[]).includes(g)) return g as EvidenceGrade;
  }
  return undefined;
}

/** Symptoms and purposes an approach is used for. Keys are stable; labels are reader-facing. */
export const USES = {
  nausea: "Nausea and vomiting",
  pain: "Pain",
  "joint-pain": "Joint pain on aromatase inhibitors",
  insomnia: "Sleep",
  fatigue: "Fatigue",
  mood: "Anxiety, low mood and distress",
  "hot-flushes": "Hot flushes",
  neuropathy: "Nerve damage (neuropathy)",
  mucositis: "Mouth and gut lining",
  lymphoedema: "Lymphoedema",
  "hair-loss": "Hair, eyebrows and lashes",
  "nails-skin": "Nails and skin",
  appetite: "Appetite and weight",
  "radiation-injury": "Late radiation injury",
  "dry-mouth": "Dry mouth after radiotherapy",
  "cancer-control": "Claimed to treat the cancer itself",
  wellbeing: "General wellbeing and quality of life",
  fitness: "Fitness, recurrence and survival",
} as const;
export type Use = keyof typeof USES;
export const USE_KEYS = Object.keys(USES) as Use[];
