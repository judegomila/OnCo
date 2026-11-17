/**
 * Capture fit-relevant registry modules for every canonical trial and every drug trial snapshot.
 * npx tsx scripts/fetch-trial-participation.ts [--refresh] [--no-fetch] [--verify] [--max=100]
 * Resumes from hashed study snapshots; only successful complete responses can mark identifiers not returned.
 * Eligibility and treatment descriptions stay verbatim. Site status is never inferred from overall status.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { TRIAL_PARTICIPATION } from "../src/data/trial-participation";
import { PARTICIPATION_FIELDS, assertNoContacts, assertNoFacilityContacts, makeSnapshot, participationReference, participationSummary, readParticipationPages, registryIds, studyHash, type ParticipationSnapshot, type ParticipationStudy } from "./trial-participation";

const root = process.cwd();
// The ISRCTN snapshots and the cross-reference file are small (640 KB for 53 studies) and stay published.
const out = join(root, "public/trial-participation");
/**
 * The ClinicalTrials.gov capture does not. It is 390 MB across 25,407 studies, three quarters of them registry
 * ids named on a product page with no trial record here, and eligibility text and site lists are a quarter of it
 * each. The fetcher resumes from this cache and writes the fields a page can show into src/data; the hash of each
 * study travels with them, so a claim stays checkable without the repository carrying the payload.
 */
const cache = join(root, ".cache/trial-participation");
const studiesDir = join(cache, "studies");
const args = process.argv.slice(2);
const refresh = args.includes("--refresh");
const noFetch = args.includes("--no-fetch") || args.includes("--verify");
const verify = args.includes("--verify");
const maxArg = args.find((s) => s.startsWith("--max="));
const max = maxArg ? Number(maxArg.slice(6)) : Infinity;
// Named sites are opt-in: retaining every site of every study would inflate the static corpus.
const facilitiesArg = args.find(s => s.startsWith("--facilities="));
const facilityIds = new Set(facilitiesArg ? facilitiesArg.slice(13).split(",").map(s => s.trim().toUpperCase()).filter(Boolean) : []);
const API = "https://clinicaltrials.gov/api/v2/studies";
const UA = "OnCo fetch-trial-participation (https://onco.cc; hello@onco.cc)";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const write = (path: string, data: unknown) => {
  writeFileSync(`${path}.tmp`, JSON.stringify(data));
  renameSync(`${path}.tmp`, path);
};
type Missing = { nct: string; fetchedAt: string; reason: "not-returned-by-registry"; requestUrl: string };

async function getBatch(ids: string[]): Promise<{ studies: ParticipationStudy[]; url: string; fetchedAt: string }> {
  // The API can return a cursor even when a page contains all requested ids. Follow it to completion.
  const params = new URLSearchParams({ "filter.ids": ids.join(","), fields: PARTICIPATION_FIELDS, format: "json", pageSize: "1000" });
  const url = `${API}?${params}`;
  let lastError: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const studies = await readParticipationPages(ids, async (token) => {
        const page = new URL(url);
        if (token) { page.searchParams.set("pageToken", token); await sleep(350); }
        const r = await fetch(page, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(45_000) });
        if (!r.ok) throw new Error(`ClinicalTrials.gov HTTP ${r.status}`);
        return await r.json() as { studies: ParticipationStudy[]; nextPageToken?: string };
      });
      return { studies, url, fetchedAt: new Date().toISOString() };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(2000 * 2 ** attempt);
    }
  }
  throw lastError;
}

async function main() {
  if (!(max >= 0)) throw new Error("--max must be nonnegative");
  for (const id of facilityIds) if (!/^NCT\d{8}$/.test(id)) throw new Error(`Invalid facility-capture identifier: ${id}`);
  mkdirSync(studiesDir, { recursive: true });
  mkdirSync(out, { recursive: true });
  const alternatePath = join(out, "alternate-registries.json");
  type AlternateTrial = { crossReferences: Array<{ nct: string; source: string; registryId: string; registryTitle?: string }>; captures: Array<{ registry: string; registryId: string; source: string; snapshot: string; fetchedAt: string; lastUpdated?: string; hasEligibility: boolean; siteCount: number; sponsors: string[] }>; sourceAudits: Array<{ source: string; status: string; expectedRegistryId?: string; observedRegistryId?: string; observedTitle?: string }> };
  const alternates: Record<string, AlternateTrial> = existsSync(alternatePath) ? JSON.parse(readFileSync(alternatePath, "utf8")).trials : {};
  const canonical = graph().kind("trial").map((t) => ({ id: t.id, name: t.name, nctField: t.nct,
    ncts: [...new Set([...registryIds(t), ...(alternates[t.id]?.crossReferences ?? []).map((r) => r.nct)])].sort(),
    registryCrossReferences: alternates[t.id]?.crossReferences ?? [],
    originalSponsor: t.sponsor, sources: t.links.map((l) => l.url), sourceLinks: t.links }));
  const drugMap = new Map<string, Set<string>>();
  let drugSnapshotRows = 0;
  for (const name of readdirSync(join(root, "public/trials")).filter((n) => n.endsWith(".json") && !["index.json", "changes.json"].includes(n)).sort()) {
    const data = JSON.parse(readFileSync(join(root, "public/trials", name), "utf8")) as { studies?: Array<{ nct?: string }> };
    for (const study of data.studies ?? []) {
      if (!/^NCT\d{8}$/.test(study.nct ?? "")) continue;
      drugSnapshotRows++;
      const nct = study.nct!;
      if (!drugMap.has(nct)) drugMap.set(nct, new Set());
      drugMap.get(nct)!.add(name.slice(0, -5));
    }
  }
  const ids = [...new Set([...canonical.flatMap((t) => t.ncts), ...drugMap.keys()])].sort();
  for (const id of facilityIds) if (!ids.includes(id)) throw new Error(`Facility capture requested for an unreferenced study: ${id}`);
  const missingPath = join(cache, "not-returned.json");
  const missing: Record<string, Missing> = existsSync(missingPath) ? JSON.parse(readFileSync(missingPath, "utf8")) : {};
  const snapshots = new Map<string, ParticipationSnapshot>();
  for (const id of ids) {
    const path = join(studiesDir, `${id}.json`);
    if (!existsSync(path)) continue;
    const snapshot = JSON.parse(readFileSync(path, "utf8")) as ParticipationSnapshot;
    if (snapshot.nct !== id || snapshot.study.protocolSection.identificationModule.nctId !== id || studyHash(snapshot.study) !== snapshot.studySha256) {
      throw new Error(`Snapshot identifier/hash mismatch: ${id}`);
    }
    assertNoContacts(snapshot.study);
    assertNoFacilityContacts(snapshot.study);
    snapshots.set(id, snapshot);
  }
  const todo = ids.filter((id) => refresh || (!snapshots.has(id) && !missing[id])).slice(0, max);
  console.log(`${canonical.length} canonical records; ${drugSnapshotRows} drug-snapshot rows; ${ids.length} unique NCT ids; ${todo.length} to fetch`);
  const failures: Record<string, string> = {};
  if (!noFetch) {
    for (let i = 0; i < todo.length; i += 100) {
      const batch = todo.slice(i, i + 100);
      try {
        const response = await getBatch(batch);
        const got = new Set<string>();
        for (const study of response.studies) {
          const snapshot = makeSnapshot(study, response.fetchedAt);
          const previous = snapshots.get(snapshot.nct);
          if (previous) {
            const historyDir = join(cache, "history", snapshot.nct);
            mkdirSync(historyDir, { recursive: true });
            const historyPath = join(historyDir, `${previous.fetchedAt.replace(/[.:]/g, "-")}.json`);
            if (!existsSync(historyPath)) write(historyPath, previous);
          }
          write(join(studiesDir, `${snapshot.nct}.json`), snapshot);
          snapshots.set(snapshot.nct, snapshot);
          delete missing[snapshot.nct];
          got.add(snapshot.nct);
        }
        for (const nct of batch) if (!got.has(nct)) {
          // On refresh keep any previous snapshot, but report that the registry no longer returned it.
          missing[nct] = { nct, fetchedAt: response.fetchedAt, reason: "not-returned-by-registry", requestUrl: response.url };
        }
        write(missingPath, missing);
      } catch (error) {
        console.warn(`Batch ${i + 1}-${i + batch.length} failed: ${String(error)}`);
        for (const id of batch) failures[id] = String(error);
      }
      if (i % 500 === 0 || i + batch.length === todo.length) console.log(`Processed ${Math.min(i + batch.length, todo.length)}/${todo.length}; ${snapshots.size} captured; ${Object.keys(failures).length} failed`);
      await sleep(350);
    }
  }

  const summaries = Object.fromEntries(ids.flatMap((id) => snapshots.has(id) ? [[id, participationSummary(snapshots.get(id)!)]] : []));
  const trialRows = canonical.map((t) => ({ ...t, gaps: t.ncts.length ? t.ncts.flatMap((nct) => {
    if (missing[nct]) return [`${nct}:not-returned-by-registry`];
    return !snapshots.has(nct) ? [`${nct}:${failures[nct] ? "fetch-failed" : "not-fetched"}`] : [];
  }) : ["no-explicit-clinicaltrials-gov-id"] }));
  const unattempted = ids.filter((id) => !snapshots.has(id) && !missing[id]);
  const sponsorDifferences = canonical.flatMap((t) => t.ncts.flatMap((nct) => {
    const registry = summaries[nct]?.leadSponsor;
    return registry && t.originalSponsor && registry !== t.originalSponsor ? [{ id: t.id, nct, corpus: t.originalSponsor, registry }] : [];
  }));
  const summary = {
    canonicalTrials: canonical.length, canonicalWithNct: canonical.filter((t) => t.ncts.length).length,
    canonicalWithoutNct: canonical.filter((t) => !t.ncts.length).length, drugSnapshotRows,
    canonicalWithParticipation: canonical.filter((t) => t.ncts.some((nct) => snapshots.has(nct)) || alternates[t.id]?.captures.length).length,
    alternateRegistryRecords: Object.values(alternates).filter((t) => t.captures.length).length,
    alternateUniqueStudies: new Set(Object.values(alternates).flatMap((t) => t.captures.map((c) => c.registryId))).size,
    registryIdentityMismatches: Object.values(alternates).reduce((n, t) => n + t.sourceAudits.filter((a) => a.status === "registry-identity-mismatch").length, 0),
    uniqueNcts: ids.length, captured: snapshots.size, notReturned: ids.filter((id) => missing[id]).length,
    unresolved: unattempted.length, withEligibility: Object.values(summaries).filter((s) => s.hasEligibility).length,
    withSponsor: Object.values(summaries).filter((s) => s.leadSponsor).length,
    withLocations: Object.values(summaries).filter((s) => s.siteCount > 0).length,
    totalLocations: Object.values(summaries).reduce((n, s) => n + s.siteCount, 0),
    recruitingStudies: Object.values(summaries).filter((s) => s.overallStatus === "RECRUITING").length,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (verify) {
    const index = JSON.parse(readFileSync(join(cache, "index.json"), "utf8"));
    if (JSON.stringify(index.summary) !== JSON.stringify(summary)) throw new Error("Coverage manifest differs from current inventory or snapshots");
    if (JSON.stringify(index.studies) !== JSON.stringify(summaries)) throw new Error("Manifest summaries do not match the snapshots");
    if (unattempted.length) throw new Error("Unresolved registry identifiers remain");
    console.log("Verified every snapshot hash, identity, contact exclusion and coverage total.");
    return;
  }
  write(join(cache, "index.json"), { schemaVersion: 1, source: "https://clinicaltrials.gov", attribution: "Courtesy of the National Library of Medicine",
    fields: PARTICIPATION_FIELDS.split(","), summary, canonicalTrials: trialRows,
    drugStudies: Object.fromEntries([...drugMap].sort().map(([nct, drugs]) => [nct, [...drugs].sort()])),
    studies: summaries, notReturned: missing, failures, unresolved: unattempted, sponsorDifferences });
  // What a trial page can state about joining without fetching anything, plus the hash of the study it came from.
  // `gaps` and `snapshot` stay in the cached manifest: the first is for this script's own reporting, the second
  // names a file the repository no longer publishes.
  const references = Object.fromEntries(canonical.filter((t) => t.ncts.length).map((t) => [t.id, t.ncts.flatMap((nct) => {
    const s = summaries[nct];
    if (!s) return [];
    const ref = participationReference(snapshots.get(nct)!, { facilities: facilityIds.has(nct), previous: TRIAL_PARTICIPATION[t.id] });
    if (missing[nct]) ref.noLongerReturnedAt = missing[nct].fetchedAt;
    return [ref];
  })]));
  writeFileSync(join(root, "src/data/trial-participation.ts"), `import type { TrialParticipation } from "@/lib/schema";\n\n/**\n * GENERATED by scripts/fetch-trial-participation.ts from ClinicalTrials.gov, courtesy of the National Library of Medicine.\n *\n * What a trial page can show about joining, with the date it was retrieved and the SHA-256 of the study as it was\n * retrieved. The complete registry capture is not in the repository: see .cache/trial-participation and docs/DATA-SOURCES.md.\n */\nexport const TRIAL_PARTICIPATION: Record<string, TrialParticipation[]> = ${JSON.stringify(references, null, 2)};\n`);
  const alternateRefs = Object.fromEntries(Object.entries(alternates).filter(([, t]) => t.captures.length).map(([id, t]) => [id, t.captures.map(({ registry, registryId, source, snapshot, fetchedAt, lastUpdated, hasEligibility, siteCount, sponsors }) => ({ registry, registryId, source, snapshot, fetchedAt, lastUpdated, hasEligibility, siteCount, sponsors }))]));
  writeFileSync(join(root, "src/data/trial-alternate-participation.ts"), `import type { TrialAlternateParticipation } from "@/lib/schema";\n\n/** GENERATED from verified alternate registry captures. */\nexport const TRIAL_ALTERNATE_PARTICIPATION: Record<string, TrialAlternateParticipation[]> = ${JSON.stringify(alternateRefs, null, 2)};\n`);
  const lines = ["# Trial participation coverage", "", "Repository growth, build/deployment costs and browser loading behavior are measured in [Trial participation: repository size and build impact](TRIAL-PARTICIPATION-SIZE.md).", "", `Captured ${summary.captured.toLocaleString("en-US")} of ${summary.uniqueNcts.toLocaleString("en-US")} explicit ClinicalTrials.gov identifiers across ${summary.canonicalTrials.toLocaleString("en-US")} canonical trials and ${summary.drugSnapshotRows.toLocaleString("en-US")} drug-linked snapshot rows. ${summary.alternateUniqueStudies} ISRCTN registry snapshots cover ${summary.alternateRegistryRecords} canonical records. In total, ${summary.canonicalWithParticipation} canonical records have captured participation data; ${summary.canonicalTrials - summary.canonicalWithParticipation} remain named gaps.`, "",
    "| Field | Studies |", "|---|---:|", `| Eligibility text | ${summary.withEligibility} |`, `| Lead sponsor | ${summary.withSponsor} |`, `| Locations | ${summary.withLocations} |`, `| Recruiting overall | ${summary.recruitingStudies} |`, `| Not returned by registry | ${summary.notReturned} |`, `| Fetch unresolved | ${summary.unresolved} |`, "",
    "Each `.cache/trial-participation/studies/NCT*.json` preserves the requested registry modules, with a retrieval timestamp, source URLs, attribution and SHA-256 of the stored study. The cache is not in the repository; rerun this script to rebuild it. Eligibility includes the complete posted inclusion/exclusion text, ages, sex and healthy-volunteer rules. Study metadata includes lead sponsor and collaborators, recruitment status and stop reasons, facility/city/state/postcode/country/site status/coordinates, conditions, summaries, treatment arms and interventions, design and enrolment, primary/secondary outcomes and their time frames, start/completion dates and registry update dates.", "",
    "Overall recruitment does not establish that a particular site or cohort is open. Missing site status is recorded as missing. Criteria are verbatim and are not an automated eligibility decision. Biomarker, prior-treatment, organ-function, performance-status, washout and visit requirements may be embedded in that text; they are not inferred when unstated. Costs, travel support, available slots and cohort availability need confirmation with the study team. Use the source record's Contacts and Locations section for current contacts; investigator names, emails and phone numbers are excluded from these captures under the repository's data-source policy, including the few a registry typed into a site's name.", "",
    "The manifest `.cache/trial-participation/index.json` maps canonical record IDs and drug snapshots to studies, lists missing registry fields, records retrieval failures separately from registry omissions, and lists sponsor wording differences for review. Corpus sponsors are preserved; a name difference is not treated as an error. `src/data/trial-participation.ts` carries, per canonical record, the fields a page can state without fetching anything: status, lead sponsor and collaborator count, why a stopped trial stopped, the age, sex and healthy-volunteer rules, enrolment, the number of sites and how many are recruiting, the countries, the registry's last update, the retrieval date and the hash of the study as retrieved. The eligibility text itself is read at `source`.", "",
    "## Records without an explicit ClinicalTrials.gov identifier", "", "These records were inventoried, but no ClinicalTrials.gov identifier was guessed. Some are historical trials, combined programmes or meta-analyses; existing alternate-registry/publication links are retained for follow-up.", "", "| Record | Name | Existing sources |", "|---|---|---|"];
  for (const t of canonical.filter((t) => !t.ncts.length)) lines.push(`| ${t.id} | ${t.name.replace(/\|/g, "\\|")} | ${t.sources.map((s) => `[source](${s})`).join("; ")} |`);
  lines.push("", "## Alternate registry captures", "", "ISRCTN snapshots preserve posted inclusion and exclusion wording, participant rules, sponsors, funders, countries and centres, intervention/design descriptions, outcomes, recruitment dates and update timestamps. Their licence and source are recorded in each capture. A registry-declared NCT cross-reference is recorded with its source before it is added to the fetch inventory. Dates are not used to infer current recruitment. Other registries are audited for access and identity; unverified redistribution licences remain named gaps.", "", "## Source identity mismatches", "", "These linked pages return a different registry identifier from the one named in the original source label. Their criteria were not attached to the canonical trial. The source links have been corrected; the original mismatch audits are retained here.", "", "| Record | Intended identifier | Returned identifier | Returned title | Source |", "|---|---|---|---|---|");
  for (const [id, t] of Object.entries(alternates)) for (const a of t.sourceAudits.filter((s) => s.status === "registry-identity-mismatch")) lines.push(`| ${id} | ${a.expectedRegistryId ?? "unstated"} | ${a.observedRegistryId ?? "not found"} | ${(a.observedTitle ?? "not found").replace(/\|/g, "\\|")} | [registry](${a.source}) |`);
  lines.push("", "## Registry identifiers not returned", "", ...ids.filter((id) => missing[id]).map((id) => `- [${id}](https://clinicaltrials.gov/study/${id})`), "", "## Unresolved fetches", "", ...unattempted.map((id) => `- ${id}: ${failures[id] ?? "not fetched"}`), "");
  writeFileSync(join(root, "docs/TRIAL-PARTICIPATION-COVERAGE.md"), `${lines.join("\n").trimEnd()}\n`);
  if (unattempted.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
