/**
 * Structured outcomes for registry-ingested trials, from the ClinicalTrials.gov results section (wave 7 of
 * docs/CONTENT-ROADMAP.md).
 *
 * The 2,845 trials tagged `ctgov-ingest` (src/data/pipeline-trials-wave*.ts) were written from the registry with no
 * outcomes. For each one this script fetches the v2 record with
 *   fields=protocolSection.identificationModule,protocolSection.statusModule,protocolSection.designModule,resultsSection,hasResults
 * and, where `hasResults` is true, copies from `resultsSection.outcomeMeasuresModule`:
 *   - the primary outcome measures (efficacy measures first; at most PRIMARY_CAP), and
 *   - up to two secondary measures when they are overall survival, progression-free survival or objective response
 *     and no primary measure already covers that endpoint family,
 * each with the registry's arm titles, measure title, unit, values, dispersion (95% CI, SD, IQR, range) and the
 * per-arm denominators, plus the hazard ratio, its 95% CI and the p-value when the registry's statistical analysis
 * covers exactly the arms shown. Enrolment is written when the registry marks it ACTUAL (`enrolledBasis: "registry"`),
 * `yearReported` is the year the results were first posted, and every outcome's first arm carries a note that the
 * figures come from the registry results section rather than a publication. Nothing is computed from the record:
 * a measure whose posted rows are ambiguous (several classes or categories with no "overall" row) is skipped and
 * counted, not summed or averaged.
 *
 * Output is the side file src/data/trial-registry-outcomes.ts, regenerated in full from the cache on every --apply
 * run and merged into the trial records by src/data/index.ts; the snapshot files are never edited. Trials are
 * processed in family-burden order (GLOBOCAN 2022 new cases of the trial's cancer family: lung, breast, colorectal,
 * skin, prostate first) so a capped run reaches the most-read pages first.
 *
 *   npx tsx scripts/fetch-registry-outcomes.ts --no-fetch      plan: counts from the cache, fetching nothing new
 *   npx tsx scripts/fetch-registry-outcomes.ts --max=25        fetch up to 25 uncached trials and report, writing nothing
 *   npx tsx scripts/fetch-registry-outcomes.ts --apply --max=500   fetch up to 500 uncached trials, then write the side file
 *   npx tsx scripts/fetch-registry-outcomes.ts --apply --no-fetch  regenerate the side file from the cache alone
 *   npx tsx scripts/fetch-registry-outcomes.ts --apply --no-fetch --first=1000   ... from the first 1,000 trials in scope order
 *
 * Network: ClinicalTrials.gov API v2 only, one request at a time, PAUSE_MS apart, PAGE ids a request, User-Agent naming
 * OnCo. Raw study records are cached under /tmp/ctgov-cache/results/<NCT>.json (studies the API did not return are
 * cached as {missing: true}) so re-runs are free.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { GLOBOCAN_MAP } from "../src/data/globocan-map";
import { TRIAL_REGISTRY_OUTCOMES } from "../src/data/trial-registry-outcomes";
import type { Cancer, Trial, TrialInput } from "../src/lib/schema";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const noFetch = args.includes("--no-fetch");
const max = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? 500);
/** Build the side file from the first N trials in scope order only, so data can be gated and committed in 500-trial batches. */
const first = Number(args.find((a) => a.startsWith("--first="))?.slice(8) ?? Infinity);
const CACHE_DIR = args.find((a) => a.startsWith("--cache="))?.slice(8) ?? "/tmp/ctgov-cache/results";
const OUT = join(process.cwd(), "src", "data", "trial-registry-outcomes.ts");

const API = "https://clinicaltrials.gov/api/v2/studies";
const FIELDS = "protocolSection.identificationModule,protocolSection.statusModule,protocolSection.designModule,resultsSection,hasResults";
const UA = "OnCo fetch-registry-outcomes (https://onco.cc; hello@onco.cc)";
const PAUSE_MS = 250;
const PAGE = 25;
const PRIMARY_CAP = 3;
const SECONDARY_CAP = 2;
const today = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------------------------------------------------
// Registry record types (the slice of the v2 schema this script reads)
// ---------------------------------------------------------------------------------------------------------------------
type Measurement = { groupId: string; value?: string; lowerLimit?: string; upperLimit?: string; spread?: string; comment?: string };
type Category = { title?: string; measurements?: Measurement[] };
type Denom = { units?: string; counts?: Array<{ groupId: string; value?: string }> };
type MeasureClass = { title?: string; denoms?: Denom[]; categories?: Category[] };
type Analysis = { groupIds?: string[]; pValue?: string; paramType?: string; paramValue?: string; ciPctValue?: string; ciLowerLimit?: string; ciUpperLimit?: string; nonInferiorityType?: string };
type Measure = {
  type?: string; title?: string; reportingStatus?: string; paramType?: string; dispersionType?: string; unitOfMeasure?: string;
  groups?: Array<{ id: string; title?: string }>; denoms?: Denom[]; classes?: MeasureClass[]; analyses?: Analysis[];
};
type Study = {
  hasResults?: boolean;
  protocolSection?: {
    identificationModule?: { nctId?: string };
    statusModule?: { overallStatus?: string; resultsFirstPostDateStruct?: { date?: string } };
    designModule?: { enrollmentInfo?: { count?: number; type?: string } };
  };
  resultsSection?: { outcomeMeasuresModule?: { outcomeMeasures?: Measure[] } };
};
type Cached = { fetchedAt: string; study?: Study; missing?: true };

export type RegistryOutcomeData = Pick<TrialInput, "enrolled" | "enrolledBasis" | "outcomes" | "yearReported" | "asOf">;
type Outcome = NonNullable<TrialInput["outcomes"]>[number];

// ---------------------------------------------------------------------------------------------------------------------
// Endpoint families
// ---------------------------------------------------------------------------------------------------------------------
type Family = "os" | "pfs" | "orr" | "other-efficacy" | "other";
const OS_RE = /overall survival|\bOS\b/i;
const PFS_RE = /progression[- ]free survival|\bPFS\b|\brPFS\b|radiographic progression/i;
const ORR_RE = /objective response|overall response rate|best overall response|\bORR\b/i;
const EFFICACY_RE = /disease[- ]free|\bDFS\b|event[- ]free|\bEFS\b|recurrence[- ]free|\bRFS\b|relapse[- ]free|metastasis[- ]free|\bMFS\b|pathologic(al)? complete response|\bpCR\b|complete response|complete remission|\bCR\b|duration of response|\bDoR\b|disease control|\bDCR\b|residual disease|\bMRD\b|time to progression|\bTTP\b|invasive disease|clinical benefit|survival/i;
/** Subgroup or timepoint breakdowns of an endpoint are not the endpoint itself. */
const SUBGROUP_RE = /\bby\b|subgroup|sub-group|according to|stratified|per (protocol|arm)|in participants with|among participants with|expression|status\b|cohort/i;

function familyOf(title: string): Family {
  if (OS_RE.test(title)) return "os";
  if (PFS_RE.test(title)) return "pfs";
  if (ORR_RE.test(title)) return "orr";
  if (EFFICACY_RE.test(title)) return "other-efficacy";
  return "other";
}

/** The registry's unit, folded to the two the site renders specially ("%" dot grids, "months" bars); anything else is copied lower-cased. */
export function normaliseUnit(unit: string | undefined, paramType: string | undefined): string | undefined {
  const u = (unit ?? "").trim();
  if (!u) return undefined;
  if (/percent|percentage|%/i.test(u)) return "%";
  if (/^months?$/i.test(u)) return "months";
  if (/^weeks?$/i.test(u)) return "weeks";
  if (/^days?$/i.test(u)) return "days";
  if (/^years?$/i.test(u)) return "years";
  if (/^(number of |count of )?(participants|patients|subjects|responders)$/i.test(u) || paramType === "COUNT_OF_PARTICIPANTS") return "participants";
  return u.toLowerCase();
}

const num = (s: string | undefined): number | undefined => {
  if (s === undefined) return undefined;
  const t = s.trim().replace(/,/g, "");
  if (!/^-?\d+(\.\d+)?$/.test(t)) return undefined;
  return Number(t);
};
const squash = (s: string) => s.replace(/\s+/g, " ").trim();
const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

/** "95% CI 13.2 to 16.2", "SD 3.1", "IQR 4 to 9", "range 1 to 52"; the registry's own tokens where a limit is NA. */
function dispersionText(m: Measurement, dispersionType: string | undefined): string | undefined {
  const d = (dispersionType ?? "").toLowerCase();
  if (!d || d === "na") return undefined;
  const lo = m.lowerLimit?.trim(), hi = m.upperLimit?.trim(), sp = m.spread?.trim();
  if (/confidence interval/.test(d) && lo && hi) {
    const pct = dispersionType?.match(/(\d+(?:\.\d+)?)\s*%/)?.[1] ?? "95";
    return `${pct}% CI ${lo} to ${hi}`;
  }
  if (/inter-?quartile/.test(d) && lo && hi) return `IQR ${lo} to ${hi}`;
  if (/full range/.test(d) && lo && hi) return `range ${lo} to ${hi}`;
  if (/standard deviation/.test(d) && sp) return `SD ${sp}`;
  if (/standard error/.test(d) && sp) return `SE ${sp}`;
  if (/geometric coefficient/.test(d) && sp) return `geometric CV ${sp}%`;
  return undefined;
}

type Row = { label: string; denoms?: Denom[]; measurements: Measurement[] };

/** Flatten classes and categories into rows; pick the one row that is the endpoint itself, or nothing when that is ambiguous. */
function pickRow(m: Measure): { row?: Row; labelled?: boolean; reason?: string } {
  const rows: Row[] = [];
  for (const c of m.classes ?? []) for (const cat of c.categories ?? []) {
    if (!cat.measurements?.length) continue;
    rows.push({ label: squash([c.title ?? "", cat.title ?? ""].filter(Boolean).join(" / ")), denoms: c.denoms, measurements: cat.measurements });
  }
  if (!rows.length) return { reason: "no measurements" };
  if (rows.length === 1) return { row: rows[0] };
  const overall = rows.filter((r) => /^(overall|objective response|orr|responders?|yes|all (participants|patients|subjects)|total|itt|intent[- ]to[- ]treat|full analysis|response \(cr ?\+ ?pr\)|cr ?\+ ?pr)\b/i.test(r.label) || /(overall response|objective response|responders)$/i.test(r.label));
  if (overall.length === 1) return { row: overall[0], labelled: true };
  return { reason: `ambiguous (${rows.length} rows)` };
}

const P_RE = /^[<>≤≥]?\s*(0?\.\d+|\d(\.\d+)?|1)$/;

/** One registry outcome measure as a corpus outcome, or a reason it was skipped. */
export function measureToOutcome(m: Measure, nct: string, posted: string | undefined, primary: boolean): { outcome?: Outcome; reason?: string } {
  if (m.reportingStatus && m.reportingStatus !== "POSTED") return { reason: `not posted (${m.reportingStatus.toLowerCase()})` };
  const title = squash(m.title ?? "");
  if (!title) return { reason: "no title" };
  const groups = m.groups ?? [];
  if (!groups.length) return { reason: "no groups" };
  const { row, labelled, reason } = pickRow(m);
  if (!row) return { reason };
  // When one row among several was chosen, its registry label is kept in the endpoint so the reader sees which.
  const endpoint = labelled && row.label ? `${title}, ${row.label}` : title;
  const unit = normaliseUnit(m.unitOfMeasure, m.paramType);
  const denoms = (row.denoms ?? m.denoms ?? []).find((d) => !d.units || /participants|patients|subjects/i.test(d.units));
  const nFor = (gid: string) => num(denoms?.counts?.find((c) => c.groupId === gid)?.value);
  const arms: Outcome["arms"] = [];
  const armIds: string[] = [];
  for (const g of groups) {
    const meas = row.measurements.find((x) => x.groupId === g.id);
    if (!meas) continue;
    const value = num(meas.value);
    const notes: string[] = [];
    if (value === undefined) notes.push(clip(squash(meas.comment ?? (meas.value && /NA/i.test(meas.value) ? "Not estimable on the registry (NA)" : "Not reported")), 160));
    const disp = dispersionText(meas, m.dispersionType);
    if (value !== undefined && disp) notes.push(disp);
    const name = clip(squash(g.title ?? g.id), 120);
    const n = nFor(g.id);
    arms.push({ name, ...(n !== undefined ? { n } : {}), ...(value !== undefined ? { value } : {}), ...(notes.length ? { note: notes.join("; ") } : {}) });
    armIds.push(g.id);
  }
  if (!arms.length) return { reason: "no arm measurements" };
  if (!arms.some((a) => a.value !== undefined)) return { reason: "no numeric value" };
  // Median/mean/number endpoints only: a count of participants with no denominator would read as a percentage.
  if (unit === "participants" && arms.some((a) => a.n === undefined)) return { reason: "participant counts without denominators" };
  const armNames = arms.map((a) => a.name);
  if (new Set(armNames).size !== armNames.length) return { reason: "duplicate arm titles" };

  const provenance = `Figures from the ClinicalTrials.gov results section${posted ? ` (first posted ${posted})` : ""}, not from a publication`;
  arms[0].note = arms[0].note ? `${arms[0].note}; ${provenance}` : provenance;

  const out: Outcome = { endpoint, ...(primary ? { primary: true } : {}), ...(unit ? { unit } : {}), arms, source: `https://clinicaltrials.gov/study/${nct}?tab=results` };
  // Statistical analysis: only when it covers exactly the arms shown (so a pairwise HR is not attached to a three-arm row).
  const sameGroups = (a: Analysis) => !!a.groupIds && a.groupIds.length === armIds.length && armIds.every((id) => a.groupIds!.includes(id));
  const analyses = (m.analyses ?? []).filter(sameGroups);
  const hrA = analyses.find((a) => /hazard ratio/i.test(a.paramType ?? "") && num(a.paramValue) !== undefined);
  if (hrA) {
    out.hr = num(hrA.paramValue);
    const lo = num(hrA.ciLowerLimit), hi = num(hrA.ciUpperLimit);
    if (hrA.ciPctValue === "95" && lo !== undefined && hi !== undefined) out.ci = [lo, hi];
  }
  const pA = hrA?.pValue ? hrA : analyses.find((a) => a.pValue);
  if (pA?.pValue) {
    const p = pA.pValue.trim().replace(/^=\s*/, "").replace(/\s+/g, "");
    if (P_RE.test(p)) out.p = p;
  }
  return { outcome: out };
}

/** Everything the side file records for one trial, or undefined when no measure could be copied. */
export function studyToData(study: Study, fetchedAt: string, skipped: Map<string, number>): RegistryOutcomeData | undefined {
  const nct = study.protocolSection?.identificationModule?.nctId;
  if (!nct || !study.hasResults) return undefined;
  const posted = study.protocolSection?.statusModule?.resultsFirstPostDateStruct?.date;
  const measures = study.resultsSection?.outcomeMeasuresModule?.outcomeMeasures ?? [];
  const count = (why: string) => skipped.set(why, (skipped.get(why) ?? 0) + 1);

  const primaries = measures.filter((m) => m.type === "PRIMARY");
  const rank = (m: Measure) => { const f = familyOf(m.title ?? ""); return f === "other" ? 1 : 0; };
  const outcomes: Outcome[] = [];
  const covered = new Set<Family>();
  for (const m of [...primaries].sort((a, b) => rank(a) - rank(b))) {
    if (outcomes.length >= PRIMARY_CAP) break;
    // Only one non-efficacy primary (a safety or pharmacokinetic measure) is worth a row.
    if (rank(m) === 1 && outcomes.length) continue;
    const { outcome, reason } = measureToOutcome(m, nct, posted, true);
    if (outcome) { outcomes.push(outcome); covered.add(familyOf(outcome.endpoint)); } else count(`primary ${reason}`);
  }
  let secondaries = 0;
  const wanted: Family[] = ["os", "pfs", "orr"];
  for (const fam of wanted) {
    if (covered.has(fam) || secondaries >= SECONDARY_CAP) continue;
    const candidates = measures.filter((m) => m.type === "SECONDARY" && familyOf(m.title ?? "") === fam && !SUBGROUP_RE.test(m.title ?? ""));
    for (const m of candidates) {
      const { outcome, reason } = measureToOutcome(m, nct, posted, false);
      if (outcome) { outcomes.push(outcome); covered.add(fam); secondaries++; break; }
      count(`secondary ${reason}`);
    }
  }
  if (!outcomes.length) return undefined;

  const data: RegistryOutcomeData = { outcomes, asOf: fetchedAt };
  const enrol = study.protocolSection?.designModule?.enrollmentInfo;
  if (enrol?.type === "ACTUAL" && typeof enrol.count === "number") { data.enrolled = enrol.count; data.enrolledBasis = "registry"; }
  const year = Number(posted?.slice(0, 4));
  if (Number.isFinite(year) && year > 1990) data.yearReported = year;
  return data;
}

// ---------------------------------------------------------------------------------------------------------------------
// Cache and network
// ---------------------------------------------------------------------------------------------------------------------
const cachePath = (nct: string) => join(CACHE_DIR, `${nct}.json`);
const readCache = (nct: string): Cached | undefined => (existsSync(cachePath(nct)) ? (JSON.parse(readFileSync(cachePath(nct), "utf8")) as Cached) : undefined);
const writeCache = (nct: string, c: Cached) => writeFileSync(cachePath(nct), JSON.stringify(c));

let requests = 0;
let lastRequestAt = 0;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchStudies(ncts: string[]): Promise<Map<string, Study>> {
  const wait = lastRequestAt + PAUSE_MS - Date.now();
  if (wait > 0) await sleep(wait);
  requests++;
  lastRequestAt = Date.now();
  const params = new URLSearchParams({ "filter.ids": ncts.join(","), fields: FIELDS, format: "json", pageSize: String(ncts.length) });
  const res = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${ncts[0]}..${ncts[ncts.length - 1]}`);
  const data = (await res.json()) as { studies?: Study[] };
  const out = new Map<string, Study>();
  for (const s of data.studies ?? []) { const id = s.protocolSection?.identificationModule?.nctId; if (id) out.set(id, s); }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// Scope and order
// ---------------------------------------------------------------------------------------------------------------------
const g = graph();
const cancers = g.kind("cancer");
const rootOf = (c: Cancer): Cancer => { let cur = c; const seen = new Set<string>(); while (cur.parent && !seen.has(cur.id)) { seen.add(cur.id); const p = g.get(cur.parent) as Cancer | undefined; if (!p) break; cur = p; } return cur; };
const globocan = JSON.parse(readFileSync("public/globocan/countries.json", "utf8")) as { countries: Record<string, { data: Record<string, number[]> }> };
const worldCases = new Map<number, number>();
for (const [code, cell] of Object.entries(globocan.countries.WORLD.data)) worldCases.set(Number(code), cell[0] ?? 0);
const familyCases = new Map<string, number>();
for (const root of cancers.filter((c) => !c.parent)) {
  const members = [root, ...cancers.filter((x) => x.id !== root.id && rootOf(x).id === root.id)];
  const own = GLOBOCAN_MAP[root.id];
  const maps = own?.codes.length ? [own] : members.map((c) => GLOBOCAN_MAP[c.id]).filter((m) => m?.codes.length);
  const codes = new Set<number>(maps.flatMap((m) => m.codes));
  const cases = [...codes].reduce((s, code) => s + (worldCases.get(code) ?? 0), 0);
  for (const c of members) familyCases.set(c.id, cases);
}
const burden = (t: Trial) => Math.max(0, ...t.cancers.map((id) => familyCases.get(id) ?? 0));
const phaseRank = (t: Trial) => ({ "3": 0, "2/3": 1, "2": 2, "1/2": 3, "1": 4 } as Record<string, number>)[t.phase] ?? 5;

/** Registry-ingested trials with an NCT id whose outcomes, if any, come from this side file. */
const scope = g.kind("trial")
  .filter((t) => t.tags.includes("ctgov-ingest") && t.nct && /^NCT\d{8}$/.test(t.nct) && (t.outcomes.length === 0 || TRIAL_REGISTRY_OUTCOMES[t.id]))
  .sort((a, b) => burden(b) - burden(a) || phaseRank(a) - phaseRank(b) || a.id.localeCompare(b.id));

async function main() {
  mkdirSync(CACHE_DIR, { recursive: true });
  const uncached = scope.filter((t) => !readCache(t.nct!));
  console.log(`${scope.length} registry-ingested trials in scope; ${scope.length - uncached.length} cached, ${uncached.length} to fetch${noFetch ? " (skipped: --no-fetch)" : `, capped at ${max}`}`);
  if (!noFetch) {
    const todo = uncached.slice(0, max);
    for (let i = 0; i < todo.length; i += PAGE) {
      const batch = todo.slice(i, i + PAGE);
      const ncts = batch.map((t) => t.nct!);
      let got: Map<string, Study>;
      try { got = await fetchStudies(ncts); } catch (e) { console.error(`stopping: ${e instanceof Error ? e.message : e}`); break; }
      for (const nct of ncts) {
        const s = got.get(nct);
        writeCache(nct, s ? { fetchedAt: today, study: s } : { fetchedAt: today, missing: true });
      }
      const withResults = [...got.values()].filter((s) => s.hasResults).length;
      console.log(`  ${String(Math.min(i + PAGE, todo.length)).padStart(5)}/${todo.length} fetched (${requests} requests); this page: ${got.size} returned, ${withResults} with results`);
    }
  }

  // Build the side file from the cache.
  const skipped = new Map<string, number>();
  const data: Array<[string, RegistryOutcomeData]> = [];
  let cached = 0, missing = 0, withResults = 0, noResults = 0, resultsButNothingCopied = 0;
  const statusOfResults = new Map<string, number>();
  for (const t of scope.slice(0, first)) {
    const c = readCache(t.nct!);
    if (!c) continue;
    cached++;
    if (c.missing || !c.study) { missing++; continue; }
    if (!c.study.hasResults) { noResults++; continue; }
    withResults++;
    const st = c.study.protocolSection?.statusModule?.overallStatus ?? "unknown";
    statusOfResults.set(st, (statusOfResults.get(st) ?? 0) + 1);
    const d = studyToData(c.study, c.fetchedAt, skipped);
    if (d) data.push([t.id, d]); else resultsButNothingCopied++;
  }
  const outcomesWritten = data.reduce((s, [, d]) => s + (d.outcomes?.length ?? 0), 0);
  console.log(`\n${cached} cached records: ${withResults} with posted results, ${noResults} without, ${missing} not returned by the API`);
  console.log(`${data.length} trials gain outcomes (${outcomesWritten} outcome rows; ${resultsButNothingCopied} trials with results had no copyable measure)`);
  console.log(`registry status of trials with results: ${[...statusOfResults.entries()].map(([k, v]) => `${k.toLowerCase()} ${v}`).join(", ")}`);
  if (skipped.size) console.log(`measures skipped: ${[...skipped.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join("; ")}`);
  console.log(`requests this run: ${requests}`);

  if (!apply) { console.log("\nplan only; pass --apply to write src/data/trial-registry-outcomes.ts"); return; }
  const lines = data.map(([id, d]) => `  ${JSON.stringify(id)}: ${JSON.stringify(d)},`);
  const header = `import type { TrialInput } from "@/lib/schema";

/**
 * Structured outcomes for registry-ingested trials, copied from the ClinicalTrials.gov results section by
 * scripts/fetch-registry-outcomes.ts (wave 7 of docs/CONTENT-ROADMAP.md). Endpoint titles, arm titles, units, values,
 * dispersion, hazard ratios and p-values are the registry's own; enrolment is the registry's ACTUAL count;
 * \`yearReported\` is the year the results were first posted; \`asOf\` is the fetch date. Every outcome's first arm says
 * the figures come from the registry rather than a publication. Merged into the trial records by src/data/index.ts
 * for trials that carry no outcomes of their own. Do not edit by hand; re-run the script (the cache under
 * /tmp/ctgov-cache/results makes a re-run free).
 *
 * Generated ${today}: ${data.length} trials, ${outcomesWritten} outcome rows, from ${cached} registry records checked
 * (${withResults} with posted results).
 */
export type RegistryOutcomeData = Pick<TrialInput, "enrolled" | "enrolledBasis" | "outcomes" | "yearReported" | "asOf">;

export const TRIAL_REGISTRY_OUTCOMES: Record<string, RegistryOutcomeData> = {
`;
  writeFileSync(OUT, `${header}${lines.join("\n")}${lines.length ? "\n" : ""}};\n`);
  console.log(`wrote ${OUT} (${data.length} trials)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
