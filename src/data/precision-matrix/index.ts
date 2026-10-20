import { EVIDENCE_GRADES } from "@/lib/complementary";
import type { LimitKind, PrecisionDomain, PrecisionRow, Source } from "./types";
import { DOMAIN_LABEL } from "./types";
import { rows as molecular } from "./molecular";
import { rows as radiation } from "./radiation";
import { rows as surgery } from "./surgery";
import { rows as dosing } from "./dosing";

export * from "./types";
export const PRECISION_ROWS: PrecisionRow[] = [...molecular, ...radiation, ...surgery, ...dosing];

/** The order the page and the roadmap walk the domains in: from the test that finds the cancer to the dose that treats it. */
export const DOMAIN_ORDER: PrecisionDomain[] = ["molecular", "surgery-imaging-pathology", "radiation", "dosing"];

/** One line under each domain heading, saying what precision is measured in there. Plain words, no figures. */
export const DOMAIN_BLURB: Record<PrecisionDomain, string> = {
  molecular: "How little tumour a test can find in blood or tissue, how often it finds something a drug can act on, and how often acting on it helps.",
  "surgery-imaging-pathology": "How small a deposit a scan can see, how close to the tumour a surgeon can cut and know it is clear, and how reliably a slide is read.",
  radiation: "How many millimetres of healthy tissue are added around the target because the tumour moves or the set-up varies, and how much dose the organs nearby receive.",
  dosing: "How far a dose chosen by body size or by the highest tolerated amount sits from the dose a particular person needs.",
};

export const LIMIT_LABEL: Record<LimitKind, string> = {
  physics: "Physics",
  biology: "Biology",
  sampling: "Sampling",
  workflow: "Workflow",
  "cost-access": "Cost and access",
};

type StepStatus = NonNullable<PrecisionRow["nextStep"]>["status"];
type Outcome = NonNullable<PrecisionRow["buys"]>["outcome"];

export const STEP_STATUS_META: Record<StepStatus, { label: string; chip: string }> = {
  "available-not-routine": { label: "Available, not routine", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30" },
  "in-trials": { label: "In trials", chip: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30" },
  research: { label: "Research", chip: "bg-foreground/10 text-muted border border-border" },
};

export const OUTCOME_META: Record<Outcome, { label: string; blurb: string; chip: string }> = {
  established: { label: "Shown to help", blurb: "A trial or guideline shows the extra precision changes an outcome a patient feels: survival, side effects, a second operation avoided.", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30" },
  plausible: { label: "Plausible, not shown", blurb: "The reasoning is sound and the precision is real, and no trial has yet shown it changes an outcome a patient feels.", chip: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30" },
  "not-established": { label: "Not established", blurb: "No source shows that more precision here helps a patient. Named rather than left blank, because readers are told it does.", chip: "bg-foreground/10 text-muted border border-border" },
};

const LIMIT_KINDS = new Set<string>(Object.keys(LIMIT_LABEL));
const STEP_STATUSES = new Set<string>(Object.keys(STEP_STATUS_META));
const OUTCOMES = new Set<string>(Object.keys(OUTCOME_META));
const DOMAINS = new Set<string>(Object.keys(DOMAIN_LABEL));
const GRADES = new Set<string>(EVIDENCE_GRADES);
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DASH = /[–—]/;
const AS_OF = /\bas of\b/i;
/** Words that tell a reader how to feel about their own cancer (docs/HOUSE-STYLE.md); the same list as the recovery matrix. */
const VERDICT = /\b(devastating|dismal|grim|hopeless|tragic|battle|doomed|miracle|relentless|bleak)\b/i;

/**
 * Every rule the matrix is held to, as a list of problems: empty means the rows pass. Lives here rather than in the
 * test so the test can run it on a fixture of bad rows and prove it bites, and so a facet can run it on its own file.
 * `has` answers whether an id exists in the corpus.
 *
 * Quotations are exempt from the dash and wording rules: they are the source's words and are never edited
 * (AGENTS.md), so an en dash inside a verbatim confidence interval stays. Everything OnCo writes is checked.
 */
export function precisionProblems(rows: PrecisionRow[], has: (id: string) => boolean): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    const at = r.id || "(row with no id)";
    if (!KEBAB.test(r.id ?? "")) out.push(`${at}: id is not kebab-case`);
    if (seen.has(r.id)) out.push(`${at}: duplicate row id`);
    seen.add(r.id);
    if (!DOMAINS.has(r.domain)) out.push(`${at}: unknown domain ${String(r.domain)}`);
    if (!r.label?.trim()) out.push(`${at}: no label`);
    if (!r.metric?.trim()) out.push(`${at}: no metric`);
    if (!Array.isArray(r.technologyIds) || r.technologyIds.length === 0) out.push(`${at}: technologyIds is empty`);

    const ids = [...(r.technologyIds ?? []), ...(r.relatedIds ?? []), ...(r.nextStep?.relatedIds ?? [])];
    for (const id of ids) if (!has(id)) out.push(`${at}: ${id} is not a corpus id`);

    const sources: Array<[string, Source]> = [];
    if (r.today) {
      if (!r.today.value?.trim()) out.push(`${at}: today has no value`);
      if (!r.today.context?.trim()) out.push(`${at}: today has no context (the setting or cohort the value came from)`);
      if (!r.today.source) out.push(`${at}: today has no source`);
      else {
        sources.push(["today", r.today.source]);
        if (typeof r.today.source.quote !== "string" || !r.today.source.quote.trim()) out.push(`${at}: today's source has no verbatim quote`);
      }
    }
    r.limits?.forEach((l, i) => {
      if (!LIMIT_KINDS.has(l.kind)) out.push(`${at}: limits[${i}] has unknown kind ${String(l.kind)}`);
      if (!l.text?.trim()) out.push(`${at}: limits[${i}] has no text`);
      if (l.source) sources.push([`limits[${i}]`, l.source]);
    });
    if (r.nextStep) {
      if (!STEP_STATUSES.has(r.nextStep.status)) out.push(`${at}: nextStep has unknown status ${String(r.nextStep.status)}`);
      if (!r.nextStep.text?.trim()) out.push(`${at}: nextStep has no text`);
      if (r.nextStep.source) sources.push(["nextStep", r.nextStep.source]);
    }
    if (r.buys) {
      if (!OUTCOMES.has(r.buys.outcome)) out.push(`${at}: buys has unknown outcome ${String(r.buys.outcome)}`);
      if (!r.buys.text?.trim()) out.push(`${at}: buys has no text`);
      if (r.buys.outcome === "established" && !r.buys.source) out.push(`${at}: buys says established with no source`);
      if (r.buys.source) sources.push(["buys", r.buys.source]);
    }
    for (const [where, s] of sources) {
      if (!s.label?.trim()) out.push(`${at}: ${where} source has no label`);
      let ok = false;
      try { ok = new URL(s.url).protocol === "https:"; } catch { ok = false; }
      if (!ok) out.push(`${at}: ${where} source url is not https: ${String(s.url)}`);
      if (s.quote !== undefined && (typeof s.quote !== "string" || !s.quote.trim())) out.push(`${at}: ${where} source has an empty quote`);
    }

    if (r.grade !== undefined && !GRADES.has(r.grade)) out.push(`${at}: unknown grade ${String(r.grade)}`);
    if (r.oversold !== undefined) {
      if (!r.oversold.trim()) out.push(`${at}: oversold is empty`);
      if (r.grade === undefined) out.push(`${at}: oversold without a grade`);
    }

    const prose: Array<[string, string | undefined]> = [
      ["label", r.label], ["metric", r.metric], ["today.value", r.today?.value], ["today.context", r.today?.context],
      ["nextStep.text", r.nextStep?.text], ["buys.text", r.buys?.text], ["oversold", r.oversold],
      ...(r.limits ?? []).map((l, i): [string, string] => [`limits[${i}].text`, l.text]),
      ...sources.map(([w, s]): [string, string] => [`${w}.source.label`, s.label]),
    ];
    for (const [field, s] of prose) {
      if (!s) continue;
      if (DASH.test(s)) out.push(`${at}: em or en dash in ${field}`);
      if (AS_OF.test(s)) out.push(`${at}: "as of" stamp in ${field}`);
      if (VERDICT.test(s)) out.push(`${at}: verdict word in ${field}`);
    }
  }
  return out;
}

/** How much of the matrix is filled, counted rather than asserted, for the page lede and the test. */
export function precisionFill(rows: PrecisionRow[] = PRECISION_ROWS) {
  const byDomain = Object.fromEntries(DOMAIN_ORDER.map((d) => [d, rows.filter((r) => r.domain === d).length])) as Record<PrecisionDomain, number>;
  return {
    rows: rows.length,
    domains: DOMAIN_ORDER.length,
    domainsWithRows: DOMAIN_ORDER.filter((d) => byDomain[d] > 0).length,
    byDomain,
    withToday: rows.filter((r) => r.today).length,
    withNextStep: rows.filter((r) => r.nextStep).length,
    withBuys: rows.filter((r) => r.buys).length,
    established: rows.filter((r) => r.buys?.outcome === "established").length,
    notEstablished: rows.filter((r) => r.buys?.outcome === "not-established").length,
    graded: rows.filter((r) => r.grade).length,
    oversold: rows.filter((r) => r.oversold).length,
    limits: rows.reduce((n, r) => n + (r.limits?.length ?? 0), 0),
  };
}
