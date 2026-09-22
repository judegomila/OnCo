/**
 * Registry status pass: brings the corpus status of every trial with an NCT id into line with the ClinicalTrials.gov
 * record (the follow-up wave 7a of docs/CONTENT-ROADMAP.md asked for after scripts/fetch-registry-outcomes.ts found
 * trials with posted results still marked active).
 *
 * For each trial with an NCT id the v2 record's statusModule is read (overallStatus, whyStopped,
 * primaryCompletionDateStruct, lastUpdatePostDateStruct) and `overallStatus` is mapped to the corpus enum through
 * REGISTRY_TO_CORPUS (src/lib/registry-status.ts): recruiting and enrolling-by-invitation studies are "recruiting",
 * not-yet-recruiting "planned", active-not-recruiting "active", completed "completed", terminated and withdrawn
 * "withdrawn". Statuses the enum has no honest word for (UNKNOWN, SUSPENDED, the expanded-access statuses) change
 * nothing and are counted.
 *
 * Rules, in order:
 *   - a result status (positive, negative, mixed) is a verdict on the trial, not a lifecycle stage; never replaced;
 *   - a corpus "withdrawn" the registry contradicts is reported for a hand check, not changed;
 *   - a downgrade (completed -> active, active -> recruiting, ...) of a hand-written trial (no `ctgov-ingest` tag)
 *     whose `asOf` is later than the registry's last update is refused: the editor's source is newer;
 *   - everything else that differs becomes a change in the side file src/data/trial-registry-status.ts, which
 *     src/data/index.ts applies through applyRegistryStatus() while the trial still carries the status the script saw.
 * The side file is regenerated in full on every --apply run; the data files are never edited. Each change records
 * the registry token and dates so the merge can write a dated note ("Registry status on 22 September 2026: ...").
 *
 *   npx tsx scripts/fetch-registry-status.ts --no-fetch        plan from the caches, fetching nothing
 *   npx tsx scripts/fetch-registry-status.ts --max=200         fetch up to 200 uncached records, report, write nothing
 *   npx tsx scripts/fetch-registry-status.ts --apply           fetch what is missing (up to --max), write the side file
 *
 * Network: ClinicalTrials.gov API v2 only, one request at a time, PAUSE_MS apart, PAGE ids a request, User-Agent
 * naming OnCo. Records fetched by scripts/fetch-registry-outcomes.ts under /tmp/ctgov-cache/results are reused
 * (they carry the full statusModule); trials outside that cache are fetched with the statusModule only and cached
 * under /tmp/ctgov-cache/status/<NCT>.json (studies the API did not return as {missing: true}).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { Status } from "../src/lib/kinds";
import { REGISTRY_TO_CORPUS, type RegistryStatusChange } from "../src/lib/registry-status";
import { TRIAL_REGISTRY_STATUS } from "../src/data/trial-registry-status";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const noFetch = args.includes("--no-fetch");
const max = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? 1000);
const RESULTS_CACHE = "/tmp/ctgov-cache/results";
const STATUS_CACHE = args.find((a) => a.startsWith("--cache="))?.slice(8) ?? "/tmp/ctgov-cache/status";
const OUT = join(process.cwd(), "src", "data", "trial-registry-status.ts");

const API = "https://clinicaltrials.gov/api/v2/studies";
const FIELDS = "protocolSection.identificationModule,protocolSection.statusModule";
const UA = "OnCo fetch-registry-status (https://onco.cc; hello@onco.cc)";
const PAUSE_MS = 250;
const PAGE = 25;
const today = new Date().toISOString().slice(0, 10);

type DateStruct = { date?: string; type?: string };
type Study = {
  protocolSection?: {
    identificationModule?: { nctId?: string };
    statusModule?: { overallStatus?: string; whyStopped?: string; primaryCompletionDateStruct?: DateStruct; lastUpdatePostDateStruct?: DateStruct };
  };
};
type Cached = { fetchedAt: string; study?: Study; missing?: true };

// ---------------------------------------------------------------------------------------------------------------------
// Cache and network
// ---------------------------------------------------------------------------------------------------------------------
function readCache(nct: string): Cached | undefined {
  for (const dir of [RESULTS_CACHE, STATUS_CACHE]) {
    const p = join(dir, `${nct}.json`);
    if (existsSync(p)) return JSON.parse(readFileSync(p, "utf8")) as Cached;
  }
  return undefined;
}
const writeCache = (nct: string, c: Cached) => writeFileSync(join(STATUS_CACHE, `${nct}.json`), JSON.stringify(c));

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
// Rules
// ---------------------------------------------------------------------------------------------------------------------
const RESULT_STATUSES = new Set<string>(["positive", "negative", "mixed"]);
/** Lifecycle order; moving to a lower rank is a downgrade. Withdrawn is terminal like completed. */
const RANK: Partial<Record<Status, number>> = { planned: 0, recruiting: 1, active: 2, completed: 3, withdrawn: 3 };

type Verdict = { change?: RegistryStatusChange; kept?: string };

function decide(t: { id: string; status?: Status; asOf: string; tags: string[] }, c: Cached): Verdict {
  if (c.missing || !c.study) return { kept: "not returned by the API" };
  const sm = c.study.protocolSection?.statusModule ?? {};
  const registry = sm.overallStatus;
  if (!registry) return { kept: "no overallStatus on the record" };
  const to = REGISTRY_TO_CORPUS[registry];
  if (!to) return { kept: `registry status ${registry.toLowerCase()} has no corpus equivalent` };
  // The status the editor wrote: when an earlier run already changed this trial, the file's `from` and its asOf are the hand-written ones.
  const prev = TRIAL_REGISTRY_STATUS[t.id];
  const applied = prev && t.status === prev.to;
  const from = applied ? prev.from : t.status;
  const sourceAsOf = applied ? prev.sourceAsOf : t.asOf;
  if (!from) return { kept: "no corpus status" };
  if (from === to) return {};
  if (RESULT_STATUSES.has(from)) return { kept: `result status ${from} kept (registry ${registry.toLowerCase()})` };
  if (from === "withdrawn") return { kept: `corpus withdrawn but registry ${registry.toLowerCase()}: check by hand` };
  const updated = sm.lastUpdatePostDateStruct?.date;
  const handWritten = !t.tags.includes("ctgov-ingest");
  const downgrade = (RANK[to] ?? 0) < (RANK[from] ?? 0);
  if (downgrade && handWritten && updated && sourceAsOf > updated) return { kept: `hand-written ${from} dated ${sourceAsOf} is newer than the registry update ${updated} (registry ${registry.toLowerCase()})` };
  const pc = sm.primaryCompletionDateStruct;
  const change: RegistryStatusChange = {
    from, to, registry,
    ...(updated ? { updated } : {}),
    ...(pc?.date ? { primaryCompletion: pc.date } : {}),
    ...(pc?.date && (pc.type === "ACTUAL" || pc.type === "ESTIMATED") ? { primaryCompletionType: pc.type } : {}),
    ...(sm.whyStopped ? { whyStopped: sm.whyStopped.replace(/\s+/g, " ").trim() } : {}),
    sourceAsOf,
    checked: c.fetchedAt,
  };
  return { change };
}

// ---------------------------------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------------------------------
const scope = graph().kind("trial").filter((t) => t.nct && /^NCT\d{8}$/.test(t.nct)).sort((a, b) => a.id.localeCompare(b.id));

async function main() {
  mkdirSync(STATUS_CACHE, { recursive: true });
  const uncached = [...new Set(scope.filter((t) => !readCache(t.nct!)).map((t) => t.nct!))];
  console.log(`${scope.length} trials with an NCT id; ${scope.length - uncached.length} cached, ${uncached.length} to fetch${noFetch ? " (skipped: --no-fetch)" : `, capped at ${max}`}`);
  if (!noFetch) {
    const todo = uncached.slice(0, max);
    for (let i = 0; i < todo.length; i += PAGE) {
      const ncts = todo.slice(i, i + PAGE);
      let got: Map<string, Study>;
      try { got = await fetchStudies(ncts); } catch (e) { console.error(`stopping: ${e instanceof Error ? e.message : e}`); break; }
      for (const nct of ncts) writeCache(nct, got.has(nct) ? { fetchedAt: today, study: got.get(nct) } : { fetchedAt: today, missing: true });
      console.log(`  ${String(Math.min(i + PAGE, todo.length)).padStart(5)}/${todo.length} fetched (${requests} requests); this page: ${got.size} returned`);
    }
  }

  const changes: Array<[string, RegistryStatusChange]> = [];
  const kept = new Map<string, number>();
  const transitions = new Map<string, number>();
  const registryTally = new Map<string, number>();
  const handChecks: string[] = [];
  let checked = 0, unchanged = 0, uncachedLeft = 0;
  for (const t of scope) {
    const c = readCache(t.nct!);
    if (!c) { uncachedLeft++; continue; }
    checked++;
    const reg = c.study?.protocolSection?.statusModule?.overallStatus ?? (c.missing ? "(not returned)" : "(none)");
    registryTally.set(reg, (registryTally.get(reg) ?? 0) + 1);
    const v = decide(t, c);
    if (v.change) {
      changes.push([t.id, v.change]);
      const key = `${v.change.from} -> ${v.change.to}${t.tags.includes("ctgov-ingest") ? "" : " (hand-written)"}`;
      transitions.set(key, (transitions.get(key) ?? 0) + 1);
    } else if (v.kept) {
      const reason = v.kept.replace(/ dated \S+ is newer than the registry update \S+/, " is newer than the registry update");
      kept.set(reason, (kept.get(reason) ?? 0) + 1);
      if (v.kept.includes("check by hand") || v.kept.includes("is newer")) handChecks.push(`${t.id} (${t.nct}): ${v.kept}`);
    } else unchanged++;
  }

  console.log(`\n${checked} registry records read (${uncachedLeft} trials still uncached); registry statuses: ${[...registryTally.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k.toLowerCase()} ${v}`).join(", ")}`);
  console.log(`${unchanged} trials already agree with the registry; ${changes.length} change`);
  console.log("\nTransitions (from -> to, count):");
  const col = Math.max(20, ...[...transitions.keys()].map((k) => k.length));
  for (const [k, v] of [...transitions.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(col)} ${String(v).padStart(5)}`);
  if (kept.size) {
    console.log("\nKept as written:");
    for (const [k, v] of [...kept.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(col)} ${String(v).padStart(5)}`);
  }
  if (handChecks.length) { console.log("\nFor a hand check:"); for (const h of handChecks) console.log(`  ${h}`); }
  const stopped = changes.filter(([, c]) => c.whyStopped);
  if (stopped.length) { console.log(`\nStopped studies (${stopped.length}):`); for (const [id, c] of stopped) console.log(`  ${id}: ${c.registry.toLowerCase()}: ${c.whyStopped}`); }
  console.log(`\nrequests this run: ${requests}`);

  if (!apply) { console.log("\nplan only; pass --apply to write src/data/trial-registry-status.ts"); return; }
  const lines = changes.map(([id, c]) => `  ${JSON.stringify(id)}: ${JSON.stringify(c)},`);
  const header = `import type { RegistryStatusChange } from "@/lib/registry-status";

/**
 * Trial status changes read from the ClinicalTrials.gov registry by scripts/fetch-registry-status.ts. Each entry
 * records the corpus status the script saw (\`from\`), the status the registry's overallStatus maps to (\`to\`), the
 * registry token and its dates, and the trial's own asOf at the time (\`sourceAsOf\`). src/data/index.ts applies an
 * entry through applyRegistryStatus() only while the trial still carries \`from\`, so a hand edit of the data file
 * always wins. Do not edit by hand; re-run the script (cached records under /tmp/ctgov-cache make a re-run free).
 *
 * Generated ${today}: ${changes.length} changes from ${checked} registry records
 * (${[...transitions.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join("; ")}).
 */
export const TRIAL_REGISTRY_STATUS: Record<string, RegistryStatusChange> = {
`;
  writeFileSync(OUT, `${header}${lines.join("\n")}${lines.length ? "\n" : ""}};\n`);
  console.log(`wrote ${OUT} (${changes.length} changes)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
