/**
 * The weekly re-check: compare what OnCo holds with what public sources say today, update the generated data that can
 * be updated mechanically, and write a report of everything that needs a person or an agent to read.
 *
 * No model and no key: every row is a comparison. Six checks, each in scripts/recheck/ with its rules in its header:
 *   trials      registry drift against the ClinicalTrials.gov v2 API
 *   us          FDA approval notices, the accelerated-approval tables, decision dates that have passed
 *   eu          the EMA's table of human medicines against src/data/regional-approvals.ts
 *   labels      DailyMed labels by set id, through openFDA, against the version last read
 *   guidelines  headers of the sources protocols cite: gone, redirected, changed
 *   links       one quarter of the addresses records cite, a different quarter each week
 *
 *   npx tsx scripts/weekly-recheck.ts                       run all six, write the report, change no data
 *   npx tsx scripts/weekly-recheck.ts --apply               also write the generated data (see below)
 *   npx tsx scripts/weekly-recheck.ts --only=us,eu          run some; the report is assembled from every check's last result
 *   npx tsx scripts/weekly-recheck.ts --assemble            fetch nothing; write the report from the results already kept
 *   --summary=<file>    also write the pull request description there
 *   --cache=<dir>       where results and the registry reading are kept between steps (default <tmp>/onco-weekly-recheck)
 *   --out=<dir>         where the report goes (default docs/proposals)
 *   --links-limit=<n>   probe at most n addresses (for a trial run)
 *   --record            keep every answer under <cache>/reading/<check>/
 *   --replay            compare against the answers kept by --record and ask no source anything
 *
 * With --apply the run writes, and only writes:
 *   src/data/trial-registry-status.ts      through scripts/fetch-registry-status.ts, from this run's registry reading
 *   src/data/trial-participation.ts        through scripts/refresh-trial-participation.ts --stale-updated
 *   src/data/recheck/label-versions.json   the label versions read, for next week's comparison
 *   src/data/recheck/guideline-headers.json  the headers read, for next week's comparison
 * Everything else is reported and left alone. Run weekly by .github/workflows/weekly-recheck.yml, which opens one pull
 * request and never merges it: docs/AUTOMATION-WEEKLY-RECHECK.md.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ACCELERATED_APPROVALS, ACCELERATED_UNMATCHED } from "../src/data/accelerated-approvals";
import { regionalApprovals } from "../src/data/regional-approvals";
import { TRIAL_PARTICIPATION } from "../src/data/trial-participation";
import { TRIAL_REGISTRY_STATUS } from "../src/data/trial-registry-status";
import { graph } from "../src/lib/graph";
import { collectUrls } from "./check-links";
import { euDrift, readEmaTable } from "./recheck/approvals-eu";
import { type DrugView, acceleratedDrift, noticesNewerThanRecord, overdueDecisions, readAcceleratedTables, readNotices } from "./recheck/approvals-us";
import { type GuidelineSource, type HeaderFile, type HeaderState, compareGuideline, headerState } from "./recheck/guidelines";
import { type LabelFile, type LabelState, compareLabel, readLabels, setIdsIn } from "./recheck/labels";
import { type CheckKind, type CheckResult, type Finding, Net, emptyResult } from "./recheck/lib";
import { type Ref, SLICES, linkFindings, probeAll, verdict, weeklySlice } from "./recheck/links";
import { KIND_ORDER, type Report, prSummary, reportJson, reportMarkdown } from "./recheck/report";
import { type PriorReading, type RawStudy, compareTrial, parseStudy, readRegistry, sharedRegistrationFindings } from "./recheck/trials";
import { ownRegistryIds } from "./trial-participation";
import { tldr_zh } from "../src/data/i18n/zh";
import { simple } from "../src/data/simple";
import { type RegistryStatusChange, applyRegistryStatus, registryStatusLabel } from "../src/lib/registry-status";
import type { TrialInput } from "../src/lib/schema";
import { contradictions } from "./recheck/status-words";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const value = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const apply = flag("apply");
const assembleOnly = flag("assemble");
const root = process.cwd();
const cache = value("cache") ?? join(tmpdir(), "onco-weekly-recheck");
const outDir = value("out") ?? join(root, "docs", "proposals");
const today = value("now") ?? new Date().toISOString().slice(0, 10);
const linksLimit = Number(value("links-limit") ?? 0);
const ALIASES: Record<string, CheckKind> = { trials: "trials", us: "us-approvals", eu: "eu-approvals", labels: "labels", guidelines: "guidelines", links: "links" };
const only = value("only")?.split(",").map((s) => { const k = ALIASES[s.trim()]; if (!k) throw new Error(`Unknown check "${s}": one of ${Object.keys(ALIASES).join(", ")}`); return k; });
const STATE_DIR = join(root, "src", "data", "recheck");
const LABEL_FILE = join(STATE_DIR, "label-versions.json");
const HEADER_FILE = join(STATE_DIR, "guideline-headers.json");

const log = (s: string) => console.log(s);
/** A checker's network: counted, slowed, and with --record or --replay bound to its own directory of kept answers. */
const network = (kind: CheckKind, o: { perHostDelayMs?: number; timeoutMs?: number }) => new Net({ ...o, ...(flag("record") || flag("replay") ? { recordDir: join(cache, "reading", kind), replay: flag("replay") } : {}) });
const readJsonFile = <T>(path: string): T | undefined => { try { return JSON.parse(readFileSync(path, "utf8")) as T; } catch { return undefined; } };
/** One entry a line, keys sorted: a weekly diff then shows the entries that changed and nothing else. */
function writeKeyed(path: string, head: Record<string, unknown>, key: string, entries: Record<string, unknown>): void {
  mkdirSync(STATE_DIR, { recursive: true });
  const lines = Object.keys(entries).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(entries[k])}`);
  writeFileSync(path, `{\n${Object.entries(head).map(([k, v]) => ` ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`).join("")} ${JSON.stringify(key)}: {\n${lines.join(",\n")}${lines.length ? "\n" : ""} }\n}\n`);
}
/** Run one of the repository's own generators and return what it printed. */
function generator(script: string, scriptArgs: string[]): { ok: boolean; out: string } {
  const r = spawnSync("npx", ["tsx", join("scripts", script), ...scriptArgs], { cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  return { ok: r.status === 0, out: `${r.stdout ?? ""}${r.stderr ?? ""}` };
}
/** What a generator said when it stopped: its error and the lines under it, without the stack. */
const failure = (out: string) => { const lines = out.split("\n"); const i = lines.findIndex((l) => /^\w*Error: /.test(l)); return (i < 0 ? lines.slice(-2) : [lines[i].replace(/^\w*Error: /, ""), ...lines.slice(i + 1).filter((l) => !/^\s+at /.test(l) && l.trim()).slice(0, 6)]).map((l) => l.trim()).join(" ").slice(0, 400); };
const tally = (xs: string[]) => { const m = new Map<string, number>(); for (const x of xs) m.set(x, (m.get(x) ?? 0) + 1); return [...m].sort((a, b) => b[1] - a[1]); };

// ---------------------------------------------------------------------------------------------------------------------
// 1. Trials
// ---------------------------------------------------------------------------------------------------------------------
async function trials(): Promise<CheckResult> {
  const res = emptyResult("trials", "Trial registry drift");
  const net = network("trials", { perHostDelayMs: 600, timeoutMs: 60_000 });
  const all = graph().kind("trial");
  const own = ownRegistryIds(all);
  const ncts = [...new Set([...own.values()].flat())].sort();
  log(`trials: ${all.length} records, ${ncts.length} registrations of their own`);
  const { studies, notReturned, failed } = await readRegistry(ncts, net, log);
  const failedSet = new Set(failed);
  if (failed.length) res.errors.push(`${failed.length} registrations could not be read from ClinicalTrials.gov (a request failed); they were not compared and the status file was not regenerated.`);
  for (const t of all) {
    const view = { id: t.id, status: t.status, phase: t.phase, sponsor: t.sponsor, enrolled: t.enrolled, enrolledBasis: t.enrolledBasis, asOf: t.asOf, ingest: t.tags.includes("ctgov-ingest"), text: `${t.tldr} ${t.summary}`, outcomes: t.outcomes.length, registrations: (own.get(t.id) ?? []).length };
    for (const nct of own.get(t.id) ?? []) {
      if (failedSet.has(nct)) continue;
      res.checked++;
      const held = TRIAL_PARTICIPATION[t.id]?.find((r) => r.nct === nct);
      const side = TRIAL_REGISTRY_STATUS[t.id];
      const prior: PriorReading | undefined = held ? { overallStatus: held.overallStatus, leadSponsor: held.leadSponsor, enrolment: held.enrolment, enrolmentType: held.enrolmentType } : side && t.nct === nct ? { overallStatus: side.registry } : undefined;
      const raw = studies.get(nct);
      res.findings.push(...compareTrial(view, nct, raw ? parseStudy(raw) : undefined, prior));
    }
  }
  res.findings.push(...sharedRegistrationFindings(all.map((t) => ({ id: t.id, ncts: own.get(t.id) ?? [] }))));
  res.notes.push(`${ncts.length.toLocaleString("en-GB")} registrations read for ${all.length.toLocaleString("en-GB")} trial records; ${notReturned.length} not returned. Registry statuses today: ${tally([...studies.values()].map((s) => s.protocolSection?.statusModule?.overallStatus ?? "none")).map(([k, n]) => `${k.toLowerCase().replace(/_/g, " ")} ${n}`).join(", ")}.`);
  res.notes.push("A status is corrected by the generators (see \"Changed by the run itself\"). The text of a record is not: where a row quotes words such as \"recruiting\" or \"awaited\", the record still says them. Differences of enrolment, sponsor and primary completion date on records written by the registry ingest are differences in the record's own sentences, which no generator rewrites.");
  res.requests = net.requests;

  if (apply && !failed.length) {
    // The same reading feeds the generator that owns the status file, in the cache format it reads.
    const dir = join(cache, "registry-status");
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    for (const nct of ncts) {
      const s: RawStudy | undefined = studies.get(nct);
      writeFileSync(join(dir, `${nct}.json`), JSON.stringify(s ? { fetchedAt: today, study: { protocolSection: { identificationModule: s.protocolSection?.identificationModule, statusModule: s.protocolSection?.statusModule } } } : { fetchedAt: today, missing: true }));
    }
    const before = Object.keys(TRIAL_REGISTRY_STATUS).length;
    const statusArgs = ["--apply", "--no-fetch", "--only-cache", `--cache=${dir}`];
    // First to a scratch file, to see what would change. A change whose record's own sentences would contradict the
    // new chip is held back and listed (./recheck/status-words); then the real file is written without those.
    const proposed = join(cache, "proposed-registry-status.ts");
    let a = generator("fetch-registry-status.ts", [...statusArgs, `--out=${proposed}`]);
    const held: string[] = [];
    if (a.ok) {
      const byId = new Map(all.map((t) => [t.id, t]));
      for (const m of readFileSync(proposed, "utf8").matchAll(/^ {2}("[^"]+"): (\{.*\}),$/gm)) {
        const id = JSON.parse(m[1]) as string, change = JSON.parse(m[2]) as RegistryStatusChange;
        const t = byId.get(id);
        const was = TRIAL_REGISTRY_STATUS[id];
        if (!t || (was && was.to === change.to)) continue;
        // The TL;DR as the merge would leave it: the stock phrase at its end is rewritten for an ingested trial.
        const tldr = applyRegistryStatus({ status: change.from, tldr: t.tldr, summary: t.summary, tags: t.tags, notes: [], asOf: t.asOf } as never as TrialInput, change).tldr;
        const clash = contradictions(change.to, { tldr, simple: simple[id], zh: tldr_zh[id] });
        if (!clash.length) continue;
        held.push(id);
        res.findings.push({ kind: "trials", type: "status-held-back", severity: "high", recordId: id, recordKind: "trial", url: `https://clinicaltrials.gov/study/${t.nct}`, date: change.updated,
          onco: `status "${t.status}"; ${clash.map((c) => `the ${c.where} ends "${c.ending}"`).join("; ")}`, source: `${registryStatusLabel(change.registry)}${change.whyStopped ? `: ${change.whyStopped}` : ""}`,
          note: `Held back: the status would become "${change.to}" and these words would contradict it (src/data/trial-status-text.test.ts). Rewrite the sentences, then the next run applies the status.` });
      }
      const holdFile = join(cache, "held-status.txt");
      writeFileSync(holdFile, held.length ? `${held.join("\n")}\n` : "");
      a = generator("fetch-registry-status.ts", [...statusArgs, `--hold=${holdFile}`]);
    }
    const wrote = /wrote .* \((\d+) changes\)/.exec(a.out)?.[1];
    if (a.ok && wrote) res.mechanical.push(`src/data/trial-registry-status.ts regenerated by scripts/fetch-registry-status.ts from this run's reading: ${wrote} status changes recorded (${before} before). Result statuses and the historic label are kept by that script's rules.${held.length ? ` ${held.length} further changes were held back because the record's own sentences would contradict the new status; they are listed below.` : ""}`);
    else res.errors.push(`src/data/trial-registry-status.ts was not regenerated: scripts/fetch-registry-status.ts stopped. ${failure(a.out)}`);
    const b = generator("refresh-trial-participation.ts", ["--stale-updated"]);
    const line = /^(\d+) studies re-read; (\d+) record entries changed status; (\d+) attached; (\d+) detached; (\d+) not returned$/m.exec(b.out);
    const more = Number(/requests this run: (\d+)/.exec(b.out)?.[1] ?? 0);
    res.requests += more;
    if (b.ok && line) res.mechanical.push(`src/data/trial-participation.ts refreshed by scripts/refresh-trial-participation.ts --stale-updated: ${line[1]} studies re-read (${line[2]} with a changed status), ${line[4]} entries detached, in ${more} further requests.`);
    else res.errors.push(`src/data/trial-participation.ts was not refreshed: scripts/refresh-trial-participation.ts stopped. ${failure(b.out)}`);
  }
  return res;
}

// ---------------------------------------------------------------------------------------------------------------------
// 2 and 3. Approvals
// ---------------------------------------------------------------------------------------------------------------------
async function usApprovals(): Promise<CheckResult> {
  const res = emptyResult("us-approvals", "US approvals (FDA)");
  const net = network("us-approvals", { perHostDelayMs: 1500, timeoutMs: 60_000 });
  const drugs: DrugView[] = graph().kind("drug").map((d) => ({ id: d.id, name: d.name, aka: d.aka, brand: d.brand, asOf: d.asOf, approvals: d.approvals.map((a) => ({ region: a.region, year: a.year })), events: d.regulatoryEvents.map((e) => ({ date: e.date, type: e.type, region: e.region, note: e.note })), haystack: JSON.stringify({ ...d, asOf: undefined }) }));
  res.checked = drugs.length;

  const n = await readNotices(net);
  if (n.blocked) { net.noteBlocked(n.blocked.url, n.blocked.reason); res.errors.push("The FDA approval notices page refused the request; notices were not compared."); }
  else if (n.error) res.errors.push(n.error);
  else {
    res.findings.push(...noticesNewerThanRecord(n.notices, drugs, today));
    res.notes.push(`${n.notices.length} approval notices on the FDA's page, ${n.notices[n.notices.length - 1]?.date} to ${n.notices[0]?.date}. A notice is taken as held when the record carries its address, a US event on its day, or its date written out.`);
  }

  const t = await readAcceleratedTables(net);
  for (const b of t.blocked) net.noteBlocked(b.url, b.reason);
  res.errors.push(...t.errors.map((e) => `Accelerated approvals: ${e}.`));
  if (t.blocked.length) res.errors.push(`${t.blocked.length} of the FDA's four accelerated-approval tables refused the request; the tables were not compared.`);
  if (t.complete) {
    const held = [...Object.values(ACCELERATED_APPROVALS).flat(), ...ACCELERATED_UNMATCHED];
    res.findings.push(...acceleratedDrift(t.rows, held));
    res.notes.push(`${t.rows.length} indications in the FDA's four accelerated-approval tables today (${t.rows.filter((r) => r.outcome === "withdrawn").length} withdrawn), against ${held.length} in src/data/accelerated-approvals.ts. The file is regenerated by scripts/fetch-accelerated.ts --apply; this run does not do that, because the regulatory events it writes onto products need reading against their text.`);
  }

  res.findings.push(...overdueDecisions(drugs, today));
  res.blocked = net.blocked;
  res.requests = net.requests;
  return res;
}

async function euApprovals(): Promise<CheckResult> {
  const res = emptyResult("eu-approvals", "EU approvals (EMA)");
  const net = network("eu-approvals", { timeoutMs: 120_000 });
  const drugs = graph().kind("drug").map((d) => ({ id: d.id, name: d.name, aka: d.aka, brand: d.brand, kind: d.kind, modality: d.modality, asOf: d.asOf }));
  const t = await readEmaTable(net);
  res.requests = net.requests;
  if (!t.register) { if (t.error?.startsWith("blocked")) net.noteBlocked("https://www.ema.europa.eu/", t.error); res.errors.push(`The EMA's table of medicines could not be read: ${t.error}.`); res.blocked = net.blocked; return res; }
  const { findings, notInCorpus, verified } = euDrift(t.register, drugs, regionalApprovals, today);
  res.findings.push(...findings);
  res.checked = Object.values(regionalApprovals).filter((r) => r.EU).length;
  res.notes.push(`${t.register.length.toLocaleString("en-GB")} human medicines in the EMA's table generated ${t.generatedOn ?? "on an unstated date"}; ${res.checked} products have an EU row here and ${verified} agree with the table. ${notInCorpus} oncology medicines in the table match no record (listed weekly in public/regional/candidates.json, not here).`);
  res.notes.push("The table has one row per medicine. An opinion on a new use of a medicine already authorised is not in it and is not checked.");
  return res;
}

// ---------------------------------------------------------------------------------------------------------------------
// 4. Labels
// ---------------------------------------------------------------------------------------------------------------------
async function labels(): Promise<CheckResult> {
  const res = emptyResult("labels", "US label changes (openFDA, DailyMed)");
  const net = network("labels", { perHostDelayMs: 1000, timeoutMs: 90_000 });
  const cites = new Map<string, Array<{ id: string; asOf: string }>>();
  for (const d of graph().kind("drug")) for (const s of setIdsIn(JSON.stringify(d))) cites.set(s, [...(cites.get(s) ?? []), { id: d.id, asOf: d.asOf }]);
  const setIds = [...cites.keys()].sort();
  const prev = readJsonFile<LabelFile>(LABEL_FILE)?.labels ?? {};
  const { labels: now, failed, errors } = await readLabels(setIds, net);
  res.errors.push(...errors.map((e) => `${e}.`));
  const failedSet = new Set(failed);
  res.checked = setIds.length - failed.length;
  for (const s of setIds) {
    if (failedSet.has(s)) continue;
    for (const drug of cites.get(s)!) res.findings.push(...compareLabel(s, drug, prev[s], now.get(s)));
  }
  const first = setIds.filter((s) => !prev[s] && now.has(s)).length;
  res.notes.push(`${setIds.length} DailyMed set ids cited by ${new Set([...cites.values()].flat().map((d) => d.id)).size} drug records; ${[...now.values()].filter((l) => l.via === "openfda").length} read from openFDA, ${[...now.values()].filter((l) => l.via === "dailymed").length} from DailyMed's history service, ${failed.length} not read.${first ? ` ${first} were read for the first time, so for those there is no earlier version to compare sections with: a first reading is listed only when the label is newer than the record.` : ""}`);
  res.notes.push("Only records that cite a label by its set id are covered. A record that links a DailyMed search page, or no label, is not.");
  res.requests = net.requests;
  if (apply) {
    const next: LabelFile["labels"] = {};
    for (const s of setIds) { const l: LabelState | undefined = now.get(s) ?? prev[s]; if (l) next[s] = { version: l.version, effective: l.effective, via: l.via, sections: l.sections, drugs: cites.get(s)!.map((d) => d.id).sort() }; }
    writeKeyed(LABEL_FILE, { generated: today, source: "https://api.fda.gov/drug/label.json and https://dailymed.nlm.nih.gov/dailymed/services/v2/", note: "GENERATED by scripts/weekly-recheck.ts; do not edit by hand. The version of each DailyMed label a drug record cites, as last read, with a short hash of three sections (never their text), so next week's run can say what changed. Not read by the site." }, "labels", next);
    res.mechanical.push(`src/data/recheck/label-versions.json written: ${Object.keys(next).length} label versions, for next week's comparison.`);
  }
  return res;
}

// ---------------------------------------------------------------------------------------------------------------------
// 5. Guidelines
// ---------------------------------------------------------------------------------------------------------------------
async function guidelines(): Promise<CheckResult> {
  const res = emptyResult("guidelines", "Guideline sources of protocols");
  const net = network("guidelines", { perHostDelayMs: 1500, timeoutMs: 30_000 });
  const byUrl = new Map<string, GuidelineSource>();
  for (const p of graph().kind("protocol")) for (const s of p.sources) {
    if (!/^https?:\/\//i.test(s.url)) continue;
    const e = byUrl.get(s.url);
    if (e) { if (!e.protocols.includes(p.id)) e.protocols.push(p.id); } else byUrl.set(s.url, { url: s.url, label: s.label, publisher: s.publisher, year: s.year, protocols: [p.id] });
  }
  const urls = [...byUrl.keys()].sort();
  const prev = readJsonFile<HeaderFile>(HEADER_FILE)?.sources ?? {};
  const readAt = Date.now();
  const results = await probeAll(net, urls, { concurrency: 4, log, label: "guidelines" });
  const next: Record<string, HeaderState> = {};
  const verdicts: string[] = [];
  for (const { url, probe } of results) {
    const v = verdict(url, probe);
    verdicts.push(v);
    if (v === "blocked") net.noteBlocked(url, probe.blocked!);
    res.findings.push(...compareGuideline(byUrl.get(url)!, prev[url], probe, readAt));
    const state = headerState(url, probe, readAt) ?? prev[url];
    if (state) next[url] = state;
  }
  res.checked = urls.length;
  const firstRun = !Object.keys(prev).length;
  res.notes.push(`${urls.length.toLocaleString("en-GB")} source addresses across ${graph().kind("protocol").length} protocols: ${tally(verdicts).map(([k, n]) => `${k} ${n}`).join(", ")}.${firstRun ? " This is the first reading, so there are no earlier headers to compare: changed dates start to appear next week, and every redirect is listed once." : ""}`);
  res.notes.push("A changed header says a publisher touched the page. It does not say a new edition exists. Sources that refuse scripts are listed as blocked and are not checked at all.");
  res.blocked = net.blocked;
  res.requests = net.requests;
  if (apply) {
    writeKeyed(HEADER_FILE, { generated: today, note: "GENERATED by scripts/weekly-recheck.ts; do not edit by hand. The response headers of each source address a protocol cites, as last read, so next week's run can report an address that has moved or changed. Not read by the site." }, "sources", next);
    res.mechanical.push(`src/data/recheck/guideline-headers.json written: headers of ${Object.keys(next).length} source addresses, for next week's comparison.`);
  }
  return res;
}

// ---------------------------------------------------------------------------------------------------------------------
// 6. Links
// ---------------------------------------------------------------------------------------------------------------------
async function links(): Promise<CheckResult> {
  const res = emptyResult("links", "Dead links (a quarter of the corpus each week)");
  const net = network("links", { perHostDelayMs: 1000, timeoutMs: 25_000 });
  const g = graph();
  const all = collectUrls(g.entities);
  // A registration that is some trial record's own is checked against the registry's API by the trials check.
  const ownNcts = new Set([...ownRegistryIds(g.kind("trial")).values()].flat());
  const covered = (u: string) => { const m = /^https?:\/\/(?:www\.)?clinicaltrials\.gov\/(?:study|ct2\/show)\/(NCT\d{8})\b/i.exec(u); return !!m && ownNcts.has(m[1].toUpperCase()); };
  const candidates = [...all.keys()].filter((u) => !covered(u));
  let slice = weeklySlice(candidates, today);
  const sliceSize = slice.length;
  if (linksLimit) slice = slice.slice(0, linksLimit);
  log(`links: ${all.size} addresses cited, ${candidates.length} after leaving registry pages to the trials check, ${slice.length} in this week's slice`);
  const results = await probeAll(net, slice, { concurrency: 6, log });
  const refs = new Map<string, Ref[]>([...all].map(([u, r]) => [u, r.map((x) => ({ id: x.id, kind: x.kind, field: x.field, label: x.label }))]));
  res.findings.push(...linkFindings(results, refs));
  const verdicts = results.map((r) => verdict(r.url, r.probe));
  results.forEach((r, i) => { if (verdicts[i] === "blocked") net.noteBlocked(r.url, r.probe.blocked!); });
  res.checked = results.length;
  res.notes.push(`${all.size.toLocaleString("en-GB")} addresses are cited across the corpus. ${(all.size - candidates.length).toLocaleString("en-GB")} are registry pages of a trial record's own registration, which the trials check reads through the API instead. Of the rest, slice ${((Math.floor((Date.parse(`${today}T00:00:00Z`) / 86_400_000 - 4) / 7) % SLICES) + SLICES) % SLICES + 1} of ${SLICES} was due this week: ${sliceSize.toLocaleString("en-GB")} addresses${linksLimit && sliceSize > slice.length ? `, of which the first ${slice.length.toLocaleString("en-GB")} were probed (--links-limit)` : ""}. Result: ${tally(verdicts).map(([k, n]) => `${k} ${n.toLocaleString("en-GB")}`).join(", ")}.`);
  res.notes.push("Only 404, 410 and a PDF address that serves a web page are listed. A refusal (401, 403, 429, a bot-challenge page) is counted as blocked and never as dead. A DOI is checked at doi.org and not followed to the publisher.");
  res.blocked = net.blocked;
  res.requests = net.requests;
  return res;
}

// ---------------------------------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------------------------------
const RUNNERS: Record<CheckKind, () => Promise<CheckResult>> = { trials, "us-approvals": usApprovals, "eu-approvals": euApprovals, labels, guidelines, links };

async function main() {
  const resultsDir = join(cache, "results");
  mkdirSync(resultsDir, { recursive: true });
  if (!assembleOnly) for (const kind of KIND_ORDER) {
    if (only && !only.includes(kind)) continue;
    const started = Date.now();
    let res: CheckResult;
    try { res = await RUNNERS[kind](); }
    catch (e) { res = emptyResult(kind, kind); res.errors.push(`The check stopped: ${e instanceof Error ? e.message : String(e)}`.slice(0, 400)); }
    // A replay asks no source anything, so its own time and count say nothing: keep those of the reading.
    const reading = flag("replay") ? readJsonFile<{ result: CheckResult }>(join(resultsDir, `${kind}.json`))?.result : undefined;
    res.durationMs = flag("replay") ? reading?.durationMs ?? 0 : Date.now() - started;
    if (reading) res.requests = reading.requests;
    writeFileSync(join(resultsDir, `${kind}.json`), JSON.stringify({ today, result: res }));
    const high = res.findings.filter((f: Finding) => f.severity === "high").length;
    log(`${kind}: ${res.checked} compared, ${res.findings.length} findings (${high} high), ${res.blocked.length} blocked, ${res.errors.length} errors, ${res.requests} requests, ${Math.round(res.durationMs / 1000)} s`);
  }
  const results: CheckResult[] = [];
  for (const kind of KIND_ORDER) {
    const kept = readJsonFile<{ today: string; result: CheckResult }>(join(resultsDir, `${kind}.json`));
    if (kept) results.push(kept.result);
    else log(`${kind}: no result kept in ${resultsDir}; left out of the report`);
  }
  if (!results.length) throw new Error("No results to report");
  const report: Report = { generated: today, results };
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "weekly-recheck-latest.md"), reportMarkdown(report));
  writeFileSync(join(outDir, "weekly-recheck-latest.json"), `${JSON.stringify(reportJson(report), null, 1)}\n`);
  const summary = value("summary");
  if (summary) writeFileSync(summary, prSummary(report));
  log(`report: ${join(outDir, "weekly-recheck-latest.md")} (${results.reduce((n, r) => n + r.findings.length, 0)} findings, ${results.reduce((n, r) => n + r.requests, 0)} requests)`);
}

if (existsSync(join(root, "src", "data"))) main().catch((e) => { console.error(e); process.exit(1); });
else { console.error("Run from the repository root."); process.exit(1); }
