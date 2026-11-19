/**
 * Enrolment and primary completion on registry-ingested trial records, brought back into line with the registry.
 *
 * A trial written by a registry ingest (tag `ctgov-ingest`) carries the registry's enrolment figure in its `enrolled`
 * field and repeats it, with the primary completion date, in a templated sentence of its summary. The ingests ran
 * once, the registry moves, and the weekly re-check (scripts/recheck/trials.ts) lists every record where the two have
 * drifted apart: 232 enrolment figures and 192 dates in the first week. This script is the rerun the ingests never
 * had. For each ingested record with exactly one registration of its own it reads the registry and rewrites, in the
 * data file, only:
 *
 *   - the number after `enrolled:`;
 *   - the same number inside one of the ingests' own enrolment phrases, with the word that says whether the registry
 *     counts it as planned (ESTIMATED) or enrolled (ACTUAL);
 *   - the date inside one of the ingests' own primary-completion phrases, with the tense: a date the registry marks
 *     ACTUAL is "reached", never "due to reach". The wording is the one src/lib/registry-status.ts already uses.
 *
 * It does not touch a hand-written record, a record with an `enrolledBasis` other than the registry's, or a sentence
 * that is not one of the templates below: those are listed for a person to read. Nothing else in the record changes,
 * so a start date, a sponsor and a phase are left to their own checks.
 *
 *   npx tsx scripts/refresh-trial-registry-figures.ts                 report what would change; writes nothing
 *   npx tsx scripts/refresh-trial-registry-figures.ts --apply         rewrite the data files
 *     --only=id,id          these records only
 *     --skip=id,id          leave these records alone (also --skip-file=<path>, one id a line)
 *     --cache=<dir>         keep the registry's answers there; with --replay, read them back instead of asking again
 *     --list=<path>         write the full list of changes and of records left alone, as JSON
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Net } from "./recheck/lib";
import { type RegistryStudy, parseStudy, readRegistry } from "./recheck/trials";

export type Figures = Pick<RegistryStudy, "enrolment" | "enrolmentType" | "primaryCompletion" | "primaryCompletionType">;
export type Rewrite = { text: string; changed: string[]; unmatched: string[] };

const DATE = String.raw`\d{4}(?:-\d{2}){0,2}`;
const mentionsCount = (s: string, n: number) => new RegExp(String.raw`\b${n}\s+(?:participants?|patients|people|subjects)\b`).test(s);

/**
 * Rewrite the ingests' enrolment and primary-completion phrases in one summary. `enrolledWas` is the record's
 * `enrolled` field before the run: a phrase is only rewritten when it states that same number, so a second figure in
 * the sentence (a cohort, a randomised count) is never mistaken for the registry's.
 */
export function rewriteSummary(summary: string, enrolledWas: number | undefined, reg: Figures): Rewrite {
  let text = summary;
  const changed: string[] = [], unmatched: string[] = [];
  const n = reg.enrolment, actual = reg.enrolmentType === "ACTUAL";

  if (n !== undefined && enrolledWas !== undefined) {
    const before = text;
    // scripts/fetch-entity-trials.ts and the pipeline waves: ", with 120 participants planned".
    text = text.replace(new RegExp(String.raw`, with ${enrolledWas} participants (planned|enrolled|recorded)\b`), (_m, w: string) => `, with ${n} participants ${actual && w === "planned" ? "enrolled" : w}`);
    // The deep-dive registry ingests: "with a registry enrolment figure of 120 participants".
    text = text.replace(new RegExp(String.raw`\bwith a registry enrolment figure of ${enrolledWas} participants\b`), `with a registry enrolment figure of ${n} participants`);
    // Pipeline wave 2: "Planned enrolment is 120 participants (estimated)." The registry's own word stays in the brackets.
    text = text.replace(new RegExp(String.raw`\bPlanned enrolment is ${enrolledWas} participants \((estimated|actual)\)`), (_m, w: string) => `Planned enrolment is ${n} participants (${actual ? "actual" : n === enrolledWas ? w : "estimated"})`);
    // "Enrollment is planned at 120 participants." has no wording for a count the registry now calls actual.
    if (!actual) text = text.replace(new RegExp(String.raw`\bEnrollment is planned at ${enrolledWas} participants\b`), `Enrollment is planned at ${n} participants`);
    if (text !== before) changed.push("enrolment sentence");
    else if (n !== enrolledWas && mentionsCount(text, enrolledWas)) unmatched.push(`the summary states ${enrolledWas} in words this script does not rewrite`);
    else if (actual && new RegExp(String.raw`\bEnrollment is planned at ${enrolledWas} participants\b`).test(text)) unmatched.push("the summary says the enrolment is planned and the registry now gives an actual count");
  }

  const pc = reg.primaryCompletion;
  if (pc) {
    const before = text;
    // "Actual" with a date still ahead is a registry entry error, and is read as the estimate it must be.
    const reached = reg.primaryCompletionType === "ACTUAL" && pc <= new Date().toISOString().slice(0, pc.length);
    // A date the registry marks ACTUAL is always "reached". An estimate is "due" only where the date itself moved:
    // an unchanged sentence is left as the ingest wrote it.
    const verb = (was: string, due: string, done: string, stated: string) => reached ? done : stated === pc ? was : due;
    text = text
      .replace(new RegExp(String.raw` and (due to reach|reached) its primary completion in (${DATE})`), (_m, w: string, d: string) => ` and ${verb(w, "due to reach", "reached", d)} its primary completion in ${pc}`)
      .replace(new RegExp(String.raw` and primary completion (is expected|was reached) in (${DATE})`), (_m, w: string, d: string) => ` and primary completion ${verb(w, "is expected", "was reached", d)} in ${pc}`)
      .replace(new RegExp(String.raw`, primary completion (expected|reached) (${DATE})`), (_m, w: string, d: string) => `, primary completion ${verb(w, "expected", "reached", d)} ${pc}`);
    if (!reached) text = text.replace(new RegExp(String.raw`\bPrimary completion is estimated at ${DATE}`), `Primary completion is estimated at ${pc}`);
    if (text !== before) changed.push("primary completion sentence");
    else {
      const stated = new RegExp(String.raw`primary completion[^.]*?(${DATE})`, "i").exec(text)?.[1];
      if (stated && stated !== pc) unmatched.push(`the summary gives primary completion ${stated} in words this script does not rewrite`);
      else if (stated && reached && /Primary completion is estimated at/.test(text)) unmatched.push("the summary calls the primary completion date an estimate and the registry now marks it actual");
    }
  }
  return { text, changed, unmatched };
}

/** The lines of one record literal: from the line that opens it to the line before the next record. */
export function recordBlock(source: string, id: string): { start: number; end: number } | undefined {
  const key = JSON.stringify(id).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Two shapes: `{ id: "x", ...` over several lines, and the entity waves' one-line `t({ id: "x", ... }),`.
  const head = new RegExp(String.raw`^[ \t]*(?:t\()?\{ id: ${key},`, "m").exec(source);
  if (!head) return undefined;
  const rest = source.slice(head.index + head[0].length);
  const next = /^[ \t]*(?:(?:t\()?\{ id: "|\];|\/\/|\/\*\*?)/m.exec(rest);
  return { start: head.index, end: head.index + head[0].length + (next ? next.index : rest.length) };
}

export type BlockResult = { block: string; changed: string[]; unmatched: string[] };

/** Apply the registry's figures to one record literal. Returns the block unchanged, with reasons, when it is not the ingests' shape. */
export function rewriteBlock(block: string, reg: Figures): BlockResult {
  if (/\benrolledBasis:/.test(block)) return { block, changed: [], unmatched: ["the record gives its own basis for the enrolment figure (enrolledBasis)"] };
  const fields = [...block.matchAll(/\benrolled: (\d+)\b/g)];
  const summaries = [...block.matchAll(/(\bsummary: )("(?:[^"\\\n]|\\.)*")(?=[,\s}])/g)];
  if (summaries.length !== 1) return { block, changed: [], unmatched: ["the summary is not a single quoted string"] };
  if (fields.length > 1) return { block, changed: [], unmatched: ["more than one enrolled field in the record"] };
  const was = fields.length ? Number(fields[0][1]) : undefined;
  const summary = JSON.parse(summaries[0][2]) as string;
  const r = rewriteSummary(summary, was, reg);
  // The figure and its sentence move together or not at all.
  if (r.unmatched.length) return { block, changed: [], unmatched: r.unmatched };
  let out = block;
  const changed = [...r.changed];
  if (r.text !== summary) out = out.replace(summaries[0][0], `${summaries[0][1]}${JSON.stringify(r.text)}`);
  if (was !== undefined && reg.enrolment !== undefined && was !== reg.enrolment) { out = out.replace(/\benrolled: \d+\b/, `enrolled: ${reg.enrolment}`); changed.unshift(`enrolled ${was} to ${reg.enrolment}`); }
  return { block: out, changed, unmatched: [] };
}

function dataFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? dataFiles(join(dir, e.name)) : /\.ts$/.test(e.name) && !/\.test\.ts$/.test(e.name) ? [join(dir, e.name)] : []);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const flag = (name: string) => args.includes(`--${name}`);
  const value = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const ids = (s: string | undefined) => new Set((s ?? "").split(/[\s,]+/).filter(Boolean));
  const only = ids(value("only"));
  const skip = new Set([...ids(value("skip")), ...ids(value("skip-file") ? readFileSync(value("skip-file")!, "utf8") : "")]);
  const cache = value("cache");

  // Loaded here, not at the top: the pure functions above are imported by a test that has no need of the corpus.
  const { graph } = await import("../src/lib/graph");
  const { ownRegistryIds } = await import("./trial-participation");
  const all = graph().kind("trial");
  const own = ownRegistryIds(all);
  const ingested = all.filter((t) => t.tags.includes("ctgov-ingest") && !skip.has(t.id) && (!only.size || only.has(t.id)));
  const single = ingested.filter((t) => (own.get(t.id) ?? []).length === 1);
  const ncts = [...new Set(single.map((t) => own.get(t.id)![0]))].sort();
  console.log(`${ingested.length} registry-ingested trial records${skip.size ? ` (${skip.size} named to skip)` : ""}; ${single.length} with one registration of their own`);

  const net = new Net({ perHostDelayMs: 600, timeoutMs: 60_000, ...(cache ? { recordDir: cache, replay: flag("replay") } : {}) });
  const { studies, notReturned, failed } = await readRegistry(ncts, net, console.log);
  if (failed.length) throw new Error(`${failed.length} registrations could not be read from ClinicalTrials.gov; nothing was written.`);

  const root = join(process.cwd(), "src", "data");
  const sources = new Map(dataFiles(root).map((f) => [f, readFileSync(f, "utf8")] as const).filter(([, s]) => /kind: "trial"/.test(s)));
  const dirty = new Set<string>();
  const changes: Array<{ id: string; nct: string; file: string; changed: string[] }> = [];
  const left: Array<{ id: string; nct: string; why: string[] }> = [];

  for (const t of single) {
    const nct = own.get(t.id)![0];
    const raw = studies.get(nct);
    const study = raw ? parseStudy(raw) : undefined;
    if (!study) { left.push({ id: t.id, nct, why: ["the registry did not return this registration"] }); continue; }
    // What a reader is shown differs from the registry: only then is a record that cannot be rewritten worth a line.
    const stated = /primary completion[^.]*?(\d{4}(?:-\d{2}){0,2})/i.exec(t.summary)?.[1];
    const drift = (t.enrolledBasis === "registry" && t.enrolled !== undefined && study.enrolment !== undefined && t.enrolled !== study.enrolment) || (!!stated && !!study.primaryCompletion && stated !== study.primaryCompletion);
    const leave = (why: string[]) => { if (drift) left.push({ id: t.id, nct, why }); };
    const found = [...sources].flatMap(([file, s]) => { const b = recordBlock(s, t.id); return b ? [{ file, ...b }] : []; });
    if (found.length !== 1) { leave([found.length ? "the record is written in more than one file" : "the record's literal was not found in the shape the ingests write"]); continue; }
    const { file, start, end } = found[0];
    const source = sources.get(file)!;
    const r = rewriteBlock(source.slice(start, end), study);
    if (r.unmatched.length) { leave(r.unmatched); continue; }
    if (!r.changed.length) continue;
    sources.set(file, source.slice(0, start) + r.block + source.slice(end));
    dirty.add(file);
    changes.push({ id: t.id, nct, file: file.slice(process.cwd().length + 1), changed: r.changed });
  }

  if (flag("apply")) for (const file of dirty) writeFileSync(file, sources.get(file)!);
  const count = (re: RegExp) => changes.filter((c) => c.changed.some((x) => re.test(x))).length;
  console.log(`${changes.length} records ${flag("apply") ? "rewritten" : "would be rewritten"} in ${dirty.size} files: ${count(/^enrolled /)} enrolment figures, ${count(/^enrolment sentence/)} enrolment sentences, ${count(/^primary completion/)} primary completion sentences`);
  console.log(`${left.length} records left alone${notReturned.length ? `; ${notReturned.length} registrations not returned` : ""}; requests this run: ${net.requests}`);
  for (const l of left.slice(0, 40)) console.log(`  left: ${l.id} (${l.nct}): ${l.why.join("; ")}`);
  if (left.length > 40) console.log(`  ... and ${left.length - 40} more (use --list=<path>)`);
  if (value("list")) writeFileSync(value("list")!, `${JSON.stringify({ applied: flag("apply"), changes, left }, null, 1)}\n`);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
