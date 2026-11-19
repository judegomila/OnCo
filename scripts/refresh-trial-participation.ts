/**
 * Targeted refresh of src/data/trial-participation.ts, for when a full run of scripts/fetch-trial-participation.ts is
 * more than the fault needs. It uses the same request fields, the same snapshot and the same reference builder, and it
 * applies the same rules for which registration is a record's own, so the two scripts cannot disagree.
 *
 *   npx tsx scripts/refresh-trial-participation.ts --stale              re-read every study whose overall status on the
 *                                                                      registry differs from the one recorded here
 *   npx tsx scripts/refresh-trial-participation.ts --stale-updated      the same, and also every study the registry
 *                                                                      has updated since it was read (a later
 *                                                                      lastUpdatePostDate): enrolment, sponsor and
 *                                                                      sites move without the status moving. Run
 *                                                                      weekly by scripts/weekly-recheck.ts
 *   npx tsx scripts/refresh-trial-participation.ts --ids=NCT1,NCT2      re-read these studies, and attach them to the
 *                                                                      records that own them if they are not attached
 *   add --dry to report and write nothing
 *
 * On every run an entry is removed from a record that does not own its registration (a cited study, or a rejected
 * cross-reference: see ownRegistryIds and REJECTED_CROSS_REFERENCES in scripts/trial-participation.ts). Nothing else
 * is touched: a record with no entry and no id named in --ids stays as it is, and key order is kept.
 *
 * Network: ClinicalTrials.gov API v2 only, one request at a time, 600 ms apart, 100 ids a request for the status check
 * and 50 for the full read, User-Agent naming OnCo. Where .cache/trial-participation/studies exists the snapshot is
 * written there too, so a later full run without --refresh starts from what this run read.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { TrialParticipation } from "../src/lib/schema";
import { TRIAL_PARTICIPATION } from "../src/data/trial-participation";
import { PARTICIPATION_FIELDS, acceptedCrossReferences, makeSnapshot, ownRegistryIds, participationReference, readParticipationPages, unexpectedSharedRegistrations, type ParticipationSnapshot, type ParticipationStudy } from "./trial-participation";

const root = process.cwd();
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const staleUpdated = args.includes("--stale-updated");
const stale = args.includes("--stale") || staleUpdated;
const named = (args.find((a) => a.startsWith("--ids="))?.slice(6) ?? "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
for (const id of named) if (!/^NCT\d{8}$/.test(id)) throw new Error(`Invalid identifier: ${id}`);
const API = "https://clinicaltrials.gov/api/v2/studies";
const UA = "OnCo refresh-trial-participation (https://onco.cc; hello@onco.cc)";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const studiesDir = join(root, ".cache/trial-participation/studies");

let requests = 0;
async function get<T>(params: Record<string, string>): Promise<T> {
  const url = `${API}?${new URLSearchParams({ ...params, format: "json", pageSize: "1000" })}`;
  let last: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      requests++;
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(60_000) });
      if (!r.ok) throw new Error(`ClinicalTrials.gov HTTP ${r.status}`);
      return await r.json() as T;
    } catch (error) { last = error; await sleep(3000 * (attempt + 1)); }
  }
  throw last;
}

async function main() {
  const alternatePath = join(root, "public/trial-participation/alternate-registries.json");
  const alternates: Record<string, { crossReferences: Array<{ nct: string }> }> = existsSync(alternatePath) ? JSON.parse(readFileSync(alternatePath, "utf8")).trials : {};
  const trials = graph().kind("trial");
  const own = ownRegistryIds(trials);
  const canonical = trials.map((t) => ({ id: t.id, ncts: [...new Set([...(own.get(t.id) ?? []), ...acceptedCrossReferences(t.id, alternates[t.id]?.crossReferences).map((r) => r.nct)])].sort() }));
  const shared = unexpectedSharedRegistrations(canonical);
  if (shared.length) throw new Error(`One registration is attached to more than one record:\n${shared.map((s) => `  ${s.nct}: ${s.records.join(", ")}`).join("\n")}`);
  const owns = new Map(canonical.map((t) => [t.id, new Set(t.ncts)]));

  const next: Record<string, TrialParticipation[]> = {};
  const detached: string[] = [];
  for (const [id, refs] of Object.entries(TRIAL_PARTICIPATION)) {
    const mine = owns.get(id);
    if (!mine) { detached.push(`${id}: record no longer exists (${refs.map((r) => r.nct).join(", ")})`); continue; }
    next[id] = refs.filter((r) => mine.has(r.nct) || (detached.push(`${id}: ${r.nct}`), false));
  }

  const todo = new Set(named);
  if (stale) {
    const held = [...new Set(Object.values(next).flatMap((refs) => refs.map((r) => r.nct)))].sort();
    const now = new Map<string, string | undefined>();
    const updated = new Map<string, string | undefined>();
    for (let i = 0; i < held.length; i += 100) {
      const batch = held.slice(i, i + 100);
      const body = await get<{ studies: Array<{ protocolSection: { identificationModule: { nctId: string }; statusModule?: { overallStatus?: string; lastUpdatePostDateStruct?: { date?: string } } } }>; nextPageToken?: string }>({ "filter.ids": batch.join(","), fields: "NCTId,OverallStatus,LastUpdatePostDate" });
      if (body.nextPageToken) throw new Error("Unexpected second page in a status check");
      for (const s of body.studies) { now.set(s.protocolSection.identificationModule.nctId, s.protocolSection.statusModule?.overallStatus); updated.set(s.protocolSection.identificationModule.nctId, s.protocolSection.statusModule?.lastUpdatePostDateStruct?.date); }
      await sleep(600);
    }
    let statusDiffers = 0, updatedSince = 0;
    for (const refs of Object.values(next)) for (const r of refs) {
      if (!now.has(r.nct) || todo.has(r.nct)) continue;
      if (now.get(r.nct) !== r.overallStatus) { todo.add(r.nct); statusDiffers++; }
      // A later update on the registry than the one recorded. An entry with no recorded date is left to --ids or a full run.
      else if (staleUpdated && r.lastUpdatePosted && (updated.get(r.nct) ?? "") > r.lastUpdatePosted) { todo.add(r.nct); updatedSince++; }
    }
    console.log(`${held.length} studies checked; ${statusDiffers} with a status that differs from the registry${staleUpdated ? `; ${updatedSince} more updated on the registry since they were read` : ""}`);
  }

  const ids = [...todo].sort();
  const snapshots = new Map<string, ParticipationSnapshot>();
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const fetchedAt = new Date().toISOString();
    const studies = await readParticipationPages(batch, async (token) => {
      if (token) await sleep(600);
      return get<{ studies: ParticipationStudy[]; nextPageToken?: string }>({ "filter.ids": batch.join(","), fields: PARTICIPATION_FIELDS, ...(token ? { pageToken: token } : {}) });
    });
    for (const study of studies) { const s = makeSnapshot(study, fetchedAt); snapshots.set(s.nct, s); }
    await sleep(600);
  }
  const notReturned = ids.filter((id) => !snapshots.has(id));

  const changes: string[] = [];
  const attached: string[] = [];
  for (const t of canonical) {
    const hits = t.ncts.filter((nct) => snapshots.has(nct));
    if (!hits.length) continue;
    const previous = TRIAL_PARTICIPATION[t.id];
    const rows = new Map((next[t.id] ?? []).map((r) => [r.nct, r]));
    for (const nct of hits) {
      const ref = participationReference(snapshots.get(nct)!, { previous });
      const before = rows.get(nct);
      if (!before) attached.push(`${t.id}: ${nct}`);
      else if (before.overallStatus !== ref.overallStatus) changes.push(`${t.id}\t${nct}\t${before.overallStatus}\t${ref.overallStatus}`);
      rows.set(nct, ref);
    }
    next[t.id] = [...rows.values()].sort((a, b) => a.nct.localeCompare(b.nct));
  }

  console.log(`${ids.length} studies re-read; ${changes.length} record entries changed status; ${attached.length} attached; ${detached.length} detached; ${notReturned.length} not returned`);
  for (const line of detached) console.log(`detached  ${line}`);
  for (const line of attached) console.log(`attached  ${line}`);
  for (const line of notReturned) console.log(`not returned  ${line}`);
  for (const line of changes) console.log(`status  ${line}`);
  console.log(`requests this run: ${requests}`);
  if (dry) return;

  if (existsSync(studiesDir)) for (const s of snapshots.values()) {
    const path = join(studiesDir, `${s.nct}.json`);
    if (existsSync(path)) {
      const old = JSON.parse(readFileSync(path, "utf8")) as ParticipationSnapshot;
      const historyDir = join(root, ".cache/trial-participation/history", s.nct);
      mkdirSync(historyDir, { recursive: true });
      const historyPath = join(historyDir, `${old.fetchedAt.replace(/[.:]/g, "-")}.json`);
      if (!existsSync(historyPath)) writeFileSync(historyPath, JSON.stringify(old));
    }
    writeFileSync(`${path}.tmp`, JSON.stringify(s));
    renameSync(`${path}.tmp`, path);
  }
  // The same header and layout as scripts/fetch-trial-participation.ts writes, so the two produce one file.
  writeFileSync(join(root, "src/data/trial-participation.ts"), `import type { TrialParticipation } from "@/lib/schema";\n\n/**\n * GENERATED by scripts/fetch-trial-participation.ts from ClinicalTrials.gov, courtesy of the National Library of Medicine.\n *\n * What a trial page can show about joining, with the date it was retrieved and the SHA-256 of the study as it was\n * retrieved. The complete registry capture is not in the repository: see .cache/trial-participation and docs/DATA-SOURCES.md.\n */\nexport const TRIAL_PARTICIPATION: Record<string, TrialParticipation[]> = ${JSON.stringify(next, null, 2)};\n`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
