import type { Trial } from "./schema";

/**
 * Plain-language trial explainer.
 *
 * Turns one structured outcome row into sentences a person without statistics can read:
 * absolute differences per 100 people, rough numbers needed to treat, medians explained as
 * midpoints, hazard ratios as "lower chance at any given time". Pure functions: no graph, no React.
 *
 * Nothing here invents numbers. Every figure is derived from values present on the row; where a
 * value is missing the sentence says so.
 */
export type Outcome = Trial["outcomes"][number];
export type EndpointType = "os" | "surrogate" | "response" | "other";

export type Explanation = {
  sentences: string[];
  endpointType: EndpointType;
  caveats: string[];
};

export type ExplainContext = { setting: string; enrolled?: number };

const SURROGATE_RE = /progression[- ]free|disease[- ]free|event[- ]free|recurrence[- ]free|relapse[- ]free|metastasis[- ]free|invasive[- ]disease[- ]free|time to (recurrence|progression)|\bpcr\b|pathologic(al)? complete response|\bpfs\b|\bdfs\b|\befs\b|\bidfs\b|\brfs\b|\bmrd\b|minimal residual disease|measurable residual disease|undetectable mrd|complete remission|complete response|\bcr\b|\bcrh\b|residual cancer burden|major pathological response|\bmpr\b/i;
const RESPONSE_RE = /response rate|objective response|overall response|\borr\b|confirmed objective response|\bpsa50\b|\bpsa\b response/i;
const OS_RE = /overall survival|\bos\b|survival at \d+ years|\d+-year (overall )?survival|melanoma-specific survival|cancer-specific survival|death from cancer|mortality/i;

/** Biomarker words a trial setting can carry; results should not be assumed for people without them. */
const BIOMARKER_RE = /\b(HER2|HER2-low|HER2-positive|HER2-negative|PD-L1|PD-1|EGFR|ALK|ROS1|RET|KRAS|BRAF|NTRK|MET|BRCA1?2?|BRCA|PALB2|HRD|MSI-H|MSI|dMMR|MMR|TMB|ESR1|PIK3CA|AKT1|PTEN|FGFR[1-4]?|IDH[12]?|FLT3|NPM1|TP53|del\(17p\)|17p|Ki-67|HR-positive|HR\+|ER-positive|ER\+|PSMA|SSTR|TROP2|Nectin-4|Claudin ?18\.2|CLDN18\.2|DLL3|BCMA|CD19|CD20|CD30|CD38|GD2|FRα|folate receptor|EGFRvIII|MGMT|1p\/19q|CPS|TPS|PSMA PET|tumour mutational burden)\b/i;

/** Classify what the endpoint is measuring. */
export function classifyEndpoint(endpoint: string): EndpointType {
  const e = endpoint.trim();
  // Overall survival wins if named, even in composite labels ("Overall survival at 5 years").
  if (/overall survival|\bos\b|specific survival|death from cancer|mortality/i.test(e)) return "os";
  if (RESPONSE_RE.test(e)) return "response";
  if (SURROGATE_RE.test(e)) return "surrogate";
  if (OS_RE.test(e)) return "os";
  return "other";
}

/** One sentence on why this endpoint type may or may not track living longer. */
export function endpointTypeNote(t: EndpointType): string {
  switch (t) {
    case "os": return "Overall survival counts deaths from any cause, so it is the most direct measure of whether a treatment helps people live longer.";
    case "surrogate": return "This is a surrogate endpoint: it measures the cancer being controlled or absent on scans and tests, which often, but not always, translates into living longer.";
    case "response": return "A response rate counts how many people had their tumours shrink by a set amount; shrinking is encouraging but does not by itself show that people live longer or feel better.";
    default: return "This endpoint is not one of the standard survival or response measures; read it alongside the trial's primary result.";
  }
}

const isPercentUnit = (unit?: string) => !!unit && /^(%|percent|% alive|percentage)$/i.test(unit.trim());
const isMonthsUnit = (unit?: string) => !!unit && /^months?$/i.test(unit.trim());
const isEventsUnit = (unit?: string) => !!unit && /^events?$/i.test(unit.trim());
const fmt = (n: number) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10));

/** Words to put after "out of 100" for a percent endpoint, derived from the endpoint name. */
function percentPhrase(endpoint: string, type: EndpointType): string {
  const e = endpoint.toLowerCase();
  const at = e.match(/at (\d+(?:\.\d+)?) (years?|months?)/) ?? e.match(/(\d+)-year/);
  const when = at ? ` at ${at[1]} ${at[2] ?? "years"}` : "";
  if (type === "os") return `alive${when}`;
  if (type === "response") return "had their tumour shrink";
  if (/progression[- ]free|pfs/.test(e)) return `alive without the cancer growing${when}`;
  if (/disease[- ]free|dfs|recurrence[- ]free|rfs|relapse[- ]free|invasive/.test(e)) return `alive without the cancer coming back${when}`;
  if (/event[- ]free|efs/.test(e)) return `free of a major event${when}`;
  if (/pcr|pathologic/.test(e)) return "had no cancer left at surgery";
  if (/mrd|residual/.test(e)) return "had no detectable disease on sensitive tests";
  if (/complete/.test(e)) return "had no sign of cancer on scans or tests";
  return `reached this endpoint${when}`;
}

/** Whether a higher value is the good direction for this endpoint (true for survival and response; false for "events" like recurrences). */
function higherIsBetter(endpoint: string, unit?: string): boolean {
  if (isEventsUnit(unit)) return false;
  return !/recurrence(s)?$|deaths?$|events?$|toxicit|adverse|mortality rate|death from cancer/i.test(endpoint);
}

/**
 * Explain one outcome row. Arms are read in the order recorded; the first arm is treated as the
 * experimental arm and the second as the comparator, which is how OnCo records them.
 */
export function explainOutcome(o: Outcome, ctx: ExplainContext): Explanation {
  const type = classifyEndpoint(o.endpoint);
  const sentences: string[] = [];
  const caveats: string[] = [];
  const withValues = o.arms.filter((a) => a.value !== undefined);
  const missing = o.arms.filter((a) => a.value === undefined);
  const [a, b] = o.arms;

  if (isPercentUnit(o.unit) && withValues.length >= 2 && a.value !== undefined && b.value !== undefined) {
    const phrase = percentPhrase(o.endpoint, type);
    const diff = a.value - b.value;
    const good = higherIsBetter(o.endpoint, o.unit) ? diff > 0 : diff < 0;
    sentences.push(`${fmt(a.value)} vs ${fmt(b.value)} out of 100 ${phrase} with ${a.name} compared with ${b.name}; ${fmt(Math.abs(diff))} ${diff >= 0 ? "more" : "fewer"} per 100.`);
    if (diff !== 0 && good) {
      const nnt = Math.round(100 / Math.abs(diff));
      sentences.push(`Roughly one extra person helped for every ${nnt} treated. That is a rough figure taken from the two percentages, not a guarantee for any one person.`);
    } else if (diff === 0) {
      sentences.push("No difference between the groups on this measure.");
    } else {
      sentences.push("On this measure the first group did worse, not better.");
    }
    if (o.arms.length > 2) sentences.push(`Other groups: ${o.arms.slice(2).map((x) => `${x.name} ${x.value !== undefined ? `${fmt(x.value)} of 100` : x.note ?? "not reported"}`).join("; ")}.`);
  } else if (isPercentUnit(o.unit) && withValues.length === 1) {
    const only = withValues[0];
    const phrase = percentPhrase(o.endpoint, type);
    sentences.push(`${fmt(only.value as number)} out of 100 people ${phrase} with ${only.name}.`);
    if (o.arms.length === 1) caveats.push("There was no comparison group, so this number cannot tell you how much of the effect is due to the treatment.");
    for (const m of missing) sentences.push(`${m.name}: ${m.note ?? "number not reported here"}.`);
  } else if (isMonthsUnit(o.unit) && withValues.length >= 2 && a.value !== undefined && b.value !== undefined) {
    const d = a.value - b.value;
    sentences.push(`Median ${fmt(a.value)} vs ${fmt(b.value)} months with ${a.name} compared with ${b.name}; about ${fmt(Math.abs(d))} months ${d >= 0 ? "longer" : "shorter"} for half the group.`);
    sentences.push("A median is a midpoint: half the people did better than this and half did worse, so it is not a prediction for any one person.");
    if (o.arms.length > 2) sentences.push(`Other groups: ${o.arms.slice(2).map((x) => `${x.name} ${x.value !== undefined ? `${fmt(x.value)} months` : x.note ?? "not reported"}`).join("; ")}.`);
  } else if (isMonthsUnit(o.unit) && withValues.length === 1) {
    const only = withValues[0];
    sentences.push(`Median ${fmt(only.value as number)} months with ${only.name}.`);
    for (const m of missing) sentences.push(`${m.name}: ${m.note ?? "median not reported here"}.`);
    if (missing.some((m) => /not reached/i.test(m.note ?? ""))) sentences.push("\"Not reached\" means that, when the data were analysed, more than half of that group had not yet had the event, which is good news for that group.");
    sentences.push("A median is a midpoint: half the people did better than this and half did worse.");
  } else if (withValues.length === 0 && o.hr !== undefined) {
    const pct = Math.round((1 - o.hr) * 100);
    if (o.hr < 1) sentences.push(`The treated group had about ${pct} percent lower chance of the event at any given time (hazard ratio ${o.hr}).`);
    else if (o.hr > 1) sentences.push(`The treated group had about ${Math.abs(pct)} percent higher chance of the event at any given time (hazard ratio ${o.hr}).`);
    else sentences.push(`No difference in the chance of the event at any given time (hazard ratio ${o.hr}).`);
    sentences.push("The absolute difference, how many more people out of 100 were helped, is not reported here.");
    const notes = o.arms.map((x) => x.note).filter(Boolean);
    if (notes.length) sentences.push(notes.join(" "));
  } else if (withValues.length === 0) {
    const notes = o.arms.map((x) => (x.note ? `${x.name}: ${x.note}` : x.name)).join("; ");
    sentences.push(`Numbers are not recorded here for this endpoint. ${notes}.`);
  } else {
    // Events or unknown unit: neutral listing.
    const unit = o.unit ? ` ${o.unit}` : "";
    sentences.push(`${o.arms.map((x) => `${x.name}: ${x.value !== undefined ? `${fmt(x.value)}${unit}` : x.note ?? "not reported"}`).join("; ")}.`);
    if (isEventsUnit(o.unit)) sentences.push("These are counts of events, not percentages, so compare them with the group sizes in mind.");
  }

  // Hazard ratio alongside absolute numbers.
  if (withValues.length > 0 && o.hr !== undefined) {
    const pct = Math.round(Math.abs(1 - o.hr) * 100);
    if (o.hr < 1) sentences.push(`Put another way, the treated group had about ${pct} percent lower chance of the event at any given time (hazard ratio ${o.hr}${o.ci ? `, likely range ${o.ci[0]} to ${o.ci[1]}` : ""}).`);
    else if (o.hr > 1) sentences.push(`Put another way, the treated group had about ${pct} percent higher chance of the event at any given time (hazard ratio ${o.hr}${o.ci ? `, likely range ${o.ci[0]} to ${o.ci[1]}` : ""}).`);
  }
  if (o.ci && o.hr !== undefined && o.ci[0] < 1 && o.ci[1] > 1) caveats.push("The likely range for the hazard ratio crosses 1, so the difference could be due to chance.");
  if (o.p && !o.ci) {
    const p = o.p.replace(/^[=<>]\s*/, "");
    const small = o.p.startsWith("<") || parseFloat(p) < 0.05;
    caveats.push(small ? `The p-value (${o.p}) says a difference this large would rarely happen by chance; it does not say how large or how useful the difference is.` : `The p-value (${o.p}) means the difference could plausibly be due to chance.`);
  }

  // Endpoint type.
  caveats.push(endpointTypeNote(type));

  // Population caveats from the setting.
  const setting = ctx.setting.trim().replace(/[.;:\s]+$/, "");
  if (setting) {
    caveats.push(`These results apply to the people the trial enrolled: ${setting}. People in a different situation may not see the same effect.`);
    const bm = setting.match(BIOMARKER_RE);
    if (bm) caveats.push(`The trial selected people by a biomarker (${bm[1]}); the result should not be assumed for people whose cancer does not have it.`);
  }
  if (ctx.enrolled !== undefined) {
    if (ctx.enrolled < 100) caveats.push(`Only ${ctx.enrolled} people took part, so the numbers are less certain than in a large trial.`);
  }
  const armNotes = o.arms.map((x) => x.note).filter((n): n is string => !!n && /not significant|interim|immature|crossover|post hoc|exploratory|subgroup/i.test(n));
  for (const n of armNotes) caveats.push(n.replace(/\.$/, "") + ".");

  return { sentences, endpointType: type, caveats: dedupe(caveats) };
}

/** Explain every outcome on a trial, primary endpoints first. */
export function explainTrial(t: Pick<Trial, "outcomes" | "setting" | "enrolled">): Array<{ outcome: Outcome; explanation: Explanation }> {
  const sorted = [...t.outcomes].sort((a, b) => Number(!!b.primary) - Number(!!a.primary));
  return sorted.map((o) => ({ outcome: o, explanation: explainOutcome(o, { setting: t.setting, enrolled: t.enrolled }) }));
}

/** One short sentence for the primary endpoint, for tables and cards. Undefined when nothing can be said. */
export function explainPrimary(t: Pick<Trial, "outcomes" | "setting" | "enrolled">): string | undefined {
  const o = t.outcomes.find((x) => x.primary) ?? t.outcomes[0];
  if (!o) return undefined;
  return explainOutcome(o, { setting: t.setting, enrolled: t.enrolled }).sentences[0];
}

function dedupe(xs: string[]): string[] {
  const seen = new Set<string>();
  return xs.filter((x) => { if (seen.has(x)) return false; seen.add(x); return true; });
}
