/**
 * Weekly re-check, part 4: US label changes.
 *
 * A drug record that cites a DailyMed label names it by its set id, which stays the same across every revision of
 * that label. For each set id a record cites, the label's version number, effective date and three of its sections
 * (boxed warning, indications and usage, dosage and administration) are read from openFDA's drug label API, which
 * returns the text of the current version; DailyMed's own history service is the fallback for a set id openFDA does
 * not carry, and gives the version and date only.
 *
 * What was read is kept in src/data/recheck/label-versions.json: per set id the version, the date, and a short hash of
 * each section, never the text. Next week's run compares against it, which is what lets a row say which sections
 * changed. The first time a label is seen there is nothing to compare, so it is reported only when its effective date
 * is later than the day the record was last checked.
 *
 * This file's own update is that one generated file. A changed label is reported, never applied: what a new
 * indication or boxed warning means for a record is for a person or an agent to read.
 */
import { createHash } from "node:crypto";
import type { Finding, Net } from "./lib";

export const OPENFDA_LABEL = "https://api.fda.gov/drug/label.json";
export const DAILYMED_HISTORY = (setId: string) => `https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${setId}/history.json`;
export const labelUrl = (setId: string) => `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setId}`;

export const SECTIONS = { boxedWarning: "boxed_warning", indications: "indications_and_usage", dosage: "dosage_and_administration" } as const;
export type SectionKey = keyof typeof SECTIONS;
export const SECTION_WORDS: Record<SectionKey, string> = { boxedWarning: "boxed warning", indications: "indications and usage", dosage: "dosage and administration" };

export type LabelState = {
  version?: number;
  /** YYYY-MM-DD: openFDA's effective_time, or DailyMed's published date for a label read through the fallback. */
  effective?: string;
  via: "openfda" | "dailymed";
  /** Short SHA-256 of each section's text with whitespace collapsed. Absent where the label has no such section or the source gives no text. */
  sections?: Partial<Record<SectionKey, string>>;
};
export type LabelFile = { generated: string; source: string; note: string; labels: Record<string, LabelState & { drugs: string[] }> };

/** Every DailyMed set id written in a record, lower case, in order of first appearance. */
export function setIdsIn(haystack: string): string[] {
  return [...new Set([...haystack.matchAll(/\bset_?id[=:](?:\\?"|%22)?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/gi)].map((m) => m[1].toLowerCase()))];
}

const hash = (text: string) => createHash("sha256").update(text.replace(/\s+/g, " ").trim()).digest("hex").slice(0, 16);

type OpenFdaLabel = { set_id?: string; version?: string; effective_time?: string } & Partial<Record<string, string[] | string | object>>;
/** One openFDA result as the state kept for it. */
export function labelState(r: OpenFdaLabel): LabelState {
  const et = r.effective_time;
  const sections: Partial<Record<SectionKey, string>> = {};
  for (const [key, field] of Object.entries(SECTIONS) as Array<[SectionKey, string]>) {
    const v = r[field];
    const text = Array.isArray(v) ? v.join("\n") : typeof v === "string" ? v : "";
    if (text.trim()) sections[key] = hash(text);
  }
  return { version: r.version && /^\d+$/.test(r.version) ? Number(r.version) : undefined, effective: et && /^\d{8}$/.test(et) ? `${et.slice(0, 4)}-${et.slice(4, 6)}-${et.slice(6, 8)}` : undefined, via: "openfda", sections };
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
/** DailyMed's history answer ({ data: { history: [{ spl_version, published_date: "Nov 02, 2026" }] } }), newest version. */
export function dailymedState(body: unknown): LabelState | undefined {
  const history = (body as { data?: { history?: Array<{ spl_version?: number; published_date?: string }> } })?.data?.history ?? [];
  const newest = [...history].filter((h) => typeof h.spl_version === "number").sort((a, b) => b.spl_version! - a.spl_version!)[0];
  if (!newest) return undefined;
  const m = /^([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4})$/.exec(newest.published_date ?? "");
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
  return { version: newest.spl_version, effective: m && month >= 0 ? `${m[3]}-${String(month + 1).padStart(2, "0")}-${m[2].padStart(2, "0")}` : undefined, via: "dailymed" };
}

/** The sections whose hash differs between two readings, a section that appeared or went counted as changed. */
export function changedSections(prev: LabelState, now: LabelState): SectionKey[] | undefined {
  if (!prev.sections || !now.sections) return undefined;
  return (Object.keys(SECTIONS) as SectionKey[]).filter((k) => prev.sections![k] !== now.sections![k]);
}

/** Compare one label with last week's reading of it, for one drug that cites it. */
export function compareLabel(setId: string, drug: { id: string; asOf: string }, prev: LabelState | undefined, now: LabelState | undefined): Finding[] {
  const base = { kind: "labels" as const, recordId: drug.id, recordKind: "drug", url: labelUrl(setId) };
  if (!now) return [{ ...base, type: "label-not-found", severity: "low", onco: `cites DailyMed set id ${setId}`, source: "neither openFDA nor DailyMed returned this label", note: "A label withdrawn from DailyMed, or a mistyped set id." }];
  const describe = (s: LabelState) => `version ${s.version ?? "unknown"}${s.effective ? `, ${s.via === "openfda" ? "effective" : "published"} ${s.effective}` : ""}`;
  if (!prev) {
    if (now.effective && now.effective > drug.asOf) return [{ ...base, type: "label-newer-than-record", severity: "medium", onco: `last checked ${drug.asOf}`, source: `label ${describe(now)}`, date: now.effective, note: "First reading of this label, so no sections can be compared yet." }];
    return [];
  }
  // The version number is the label's own and is the same from either source; the date is compared only like with like.
  const changed = prev.version !== undefined && now.version !== undefined ? prev.version !== now.version : prev.via === now.via && prev.effective !== now.effective;
  if (!changed) return [];
  const sections = changedSections(prev, now);
  const severity = !sections ? "medium" : sections.includes("boxedWarning") || sections.includes("indications") ? "high" : sections.includes("dosage") ? "medium" : "low";
  const what = !sections ? "sections could not be compared (one reading has no text)" : sections.length ? `changed: ${sections.map((k) => SECTION_WORDS[k]).join(", ")}` : "boxed warning, indications and dosage unchanged";
  return [{ ...base, type: "label-changed", severity, onco: `last read at ${describe(prev)}; record last checked ${drug.asOf}`, source: `label ${describe(now)}; ${what}`, date: now.effective }];
}

/** Read the current version of each label: openFDA in batches of 20, then DailyMed for what openFDA did not return. */
export async function readLabels(setIds: string[], net: Net, opts: { fallbackLimit?: number } = {}): Promise<{ labels: Map<string, LabelState>; failed: string[]; errors: string[] }> {
  const labels = new Map<string, LabelState>();
  const failed = new Set<string>(), errors: string[] = [];
  for (let i = 0; i < setIds.length; i += 20) {
    const batch = setIds.slice(i, i + 20);
    const url = `${OPENFDA_LABEL}?search=set_id:(${batch.map((s) => `%22${s}%22`).join("+")})&limit=100`;
    const r = await net.get(url, { accept: "application/json" });
    // openFDA answers a search with no match with 404 and a JSON error body: that is an empty result, not a failure.
    if (r.status === 404) continue;
    if (!r.ok || !r.text) { for (const s of batch) failed.add(s); errors.push(`openFDA answered ${r.status}${r.blocked ? ` (${r.blocked})` : r.error ? ` (${r.error})` : ""} for a batch of ${batch.length} labels`); continue; }
    try { for (const res of (JSON.parse(r.text) as { results?: OpenFdaLabel[] }).results ?? []) if (res.set_id) labels.set(res.set_id.toLowerCase(), labelState(res)); }
    catch { for (const s of batch) failed.add(s); errors.push("openFDA returned text that is not JSON"); }
  }
  const missing = setIds.filter((s) => !labels.has(s) && !failed.has(s));
  const limit = opts.fallbackLimit ?? 80;
  for (const s of missing.slice(0, limit)) {
    const r = await net.get(DAILYMED_HISTORY(s), { accept: "application/json" });
    if (r.status === 404) continue;
    if (!r.ok || !r.text) { failed.add(s); continue; }
    try { const st = dailymedState(JSON.parse(r.text)); if (st) labels.set(s, st); } catch { failed.add(s); }
  }
  for (const s of missing.slice(limit)) failed.add(s);
  if (missing.length > limit) errors.push(`${missing.length - limit} labels were not looked up on DailyMed this run (limit ${limit})`);
  return { labels, failed: [...failed], errors };
}
