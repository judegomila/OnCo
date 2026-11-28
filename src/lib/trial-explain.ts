import type { Trial } from "./schema";

/**
 * Plain-language trial explainer.
 *
 * Turns one structured outcome row into sentences a person without statistics can read:
 * absolute differences per 100 people, medians compared between groups, and hazard ratios.
 * Pure functions: no graph, no React.
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
const OS_RE = /\boverall survival\b|^os(?:$| at | rate|[ (:])/i;

/** Classify what the endpoint is measuring. */
export function classifyEndpoint(endpoint: string): EndpointType {
  const e = endpoint.trim();
  if (OS_RE.test(e)) return "os";
  if (RESPONSE_RE.test(e)) return "response";
  if (SURROGATE_RE.test(e)) return "surrogate";
  return "other";
}

/** One sentence on why this endpoint type may or may not track living longer. */
export function endpointTypeNote(t: EndpointType): string {
  switch (t) {
    case "os": return "Overall survival counts deaths from any cause, so it is the most direct measure of whether a treatment helps people live longer.";
    case "surrogate": return "This endpoint is not the same as overall survival. See the trial source for what it counts.";
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
  if (/progression[- ]free|\bpfs\b/.test(e)) return `alive without the cancer growing${when}`;
  if (/invasive[- ]disease[- ]free|\bidfs\b/.test(e)) return `free of an event counted by invasive disease-free survival${when}`;
  if (/disease[- ]free|\bdfs\b|recurrence[- ]free|\brfs\b|relapse[- ]free/.test(e)) return `free of a disease or recurrence event as defined by the trial${when}`;
  if (/event[- ]free|\befs\b/.test(e)) return `free of a major event${when}`;
  if (/ypt0\s*\/\s*tis\s*ypn0/.test(e)) return "had no invasive cancer found in the breast or lymph nodes at surgery";
  if (/\bpcr\b|pathologic(?:al)? complete response/.test(e)) return "met the trial’s definition of a pathologic complete response";
  if (/undetectable mrd|mrd[- ]negative|no (?:measurable|minimal) residual disease/.test(e)) return "had no detectable disease on sensitive tests";
  return `reached this endpoint${when}`;
}

/** Include the cohort only when it is recorded on this outcome, not inferred from enrolment. */
export function outcomePopulation(o: Outcome): string | undefined {
  if (o.analysis) return `${o.analysis.label} (n = ${o.analysis.n.toLocaleString("en-US")})`;
  if (o.arms.every((a) => a.n !== undefined && a.n > 0)) {
    return `Reported arm sizes: ${o.arms.map((a) => `${a.name}: ${a.n!.toLocaleString("en-US")}`).join("; ")}`;
  }
  return undefined;
}

function hazardRatio(o: Outcome): string {
  const hr = o.hr!;
  const change = Math.round(Math.abs(1 - hr) * 100);
  const direction = hr < 1 ? `; about ${change}% lower event rate at a given time among those still at risk`
    : hr > 1 ? `; about ${change}% higher event rate at a given time among those still at risk` : "";
  return `Hazard ratio ${hr}${o.ci ? ` (95% confidence interval ${o.ci[0]} to ${o.ci[1]})` : ""}${direction}.`;
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
    sentences.push(`${fmt(a.value)} vs ${fmt(b.value)} out of 100 ${phrase} with ${a.name} compared with ${b.name}; ${diff === 0 ? "no difference per 100" : `${fmt(Math.abs(diff))} ${diff > 0 ? "more" : "fewer"} per 100`}.`);
    if (o.arms.length > 2) sentences.push(`Other groups: ${o.arms.slice(2).map((x) => `${x.name} ${x.value !== undefined ? `${fmt(x.value)} of 100` : x.note ?? "not reported"}`).join("; ")}.`);
  } else if (isPercentUnit(o.unit) && withValues.length === 1) {
    const only = withValues[0];
    const phrase = percentPhrase(o.endpoint, type);
    sentences.push(`${fmt(only.value as number)} out of 100 people ${phrase} with ${only.name}.`);
    if (o.arms.length === 1) caveats.push("There was no comparison group, so this number cannot tell you how much of the effect is due to the treatment.");
    for (const m of missing) sentences.push(`${m.name}: ${m.note ?? "number not reported here"}.`);
  } else if (isMonthsUnit(o.unit) && withValues.length >= 2 && a.value !== undefined && b.value !== undefined) {
    const d = a.value - b.value;
    sentences.push(`Median ${fmt(a.value)} vs ${fmt(b.value)} months with ${a.name} compared with ${b.name}; the group medians ${d === 0 ? "were the same" : `differed by ${fmt(Math.abs(d))} months`}.`);
    sentences.push("A median is a group midpoint. The difference between medians does not say how much longer any individual benefited.");
    if (o.arms.length > 2) sentences.push(`Other groups: ${o.arms.slice(2).map((x) => `${x.name} ${x.value !== undefined ? `${fmt(x.value)} months` : x.note ?? "not reported"}`).join("; ")}.`);
  } else if (isMonthsUnit(o.unit) && withValues.length === 1) {
    const only = withValues[0];
    sentences.push(`Median ${fmt(only.value as number)} months with ${only.name}.`);
    for (const m of missing) sentences.push(`${m.name}: ${m.note ?? "median not reported here"}.`);
    if (missing.some((m) => /not reached/i.test(m.note ?? ""))) sentences.push("\"Not reached\" means that, when the data were analysed, more than half of that group had not yet had the event.");
    sentences.push("A median is a group midpoint, not an individual prediction.");
  } else if (withValues.length === 0 && o.hr !== undefined) {
    sentences.push(hazardRatio(o));
    sentences.push("The absolute difference between groups is not reported here.");
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

  if (withValues.length > 0 && o.hr !== undefined) sentences.push(hazardRatio(o));
  if (o.ci && o.hr !== undefined && o.ci[0] <= 1 && o.ci[1] >= 1) caveats.push("The confidence interval includes 1, the value for no difference in hazard.");
  if (o.p) caveats.push(`Reported p-value: ${o.p}. This is not a measure of the size or clinical importance of the difference.`);
  if (/ypt0\s*\/\s*tis\s*ypn0/i.test(o.endpoint)) caveats.push("This definition permits residual in situ disease in the breast.");
  if (/pathologic(?:al)? complete response|\bpcr\b/i.test(o.endpoint)) caveats.push("This response is assessed at surgery; it does not by itself show that people live longer.");

  // Endpoint type.
  caveats.push(endpointTypeNote(type));

  // Population caveats from the setting.
  const setting = ctx.setting.trim().replace(/[.;:\s]+$/, "");
  if (setting) {
    caveats.push(`These results apply to the people the trial enrolled: ${setting}. People in a different situation may not see the same effect.`);
  }
  const n = o.analysis?.n ?? ctx.enrolled;
  if (n !== undefined && n > 0 && n < 100) caveats.push("This is a small study population; consider the uncertainty around the estimate.");
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
  const sentence = explainOutcome(o, { setting: t.setting, enrolled: t.enrolled }).sentences[0];
  return o.analysis ? `${outcomePopulation(o)}: ${sentence}` : sentence;
}

function dedupe(xs: string[]): string[] {
  const seen = new Set<string>();
  return xs.filter((x) => { if (seen.has(x)) return false; seen.add(x); return true; });
}
