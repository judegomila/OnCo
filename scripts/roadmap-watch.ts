/**
 * Roadmap watch: what has moved since each roadmap was last checked.
 *
 * For every roadmap (or one, with --roadmap), lists the trials it references (steps' refs, watch items' refs and the
 * `trials` array) with the corpus view, then, unless --offline is passed:
 *   1. asks the ClinicalTrials.gov v2 API for each NCT id's status, phases, enrolment and completion dates and flags
 *      contradictions with the corpus in plain words (status mapping, phase overlap, enrolment beyond 5 percent,
 *      watch items quoting a registry completion date the registry has since moved);
 *   2. searches Europe PMC for cancer papers naming each trial acronym in the title, first published on or after the
 *      roadmap's asOf date, deduplicated by DOI, with journal and date;
 *   3. flags watch items whose expected date has passed.
 * Comparison logic lives in src/lib/roadmap-watch.ts so the roadmap pages can render the committed report.
 *
 *   npm run roadmap:watch                                  every roadmap, plain report
 *   npm run roadmap:watch -- --roadmap ctdna-tests         one roadmap (npm run ctdna:watch is this alias)
 *   npm run roadmap:watch -- --offline                     corpus-only listing, no network
 *   npm run roadmap:watch -- --since 2026-06-01            override the publication cut-off for every roadmap
 *   npm run roadmap:watch -- --json public/roadmap-watch.json   also write the machine-readable report
 *
 * Network: ClinicalTrials.gov and Europe PMC only, 300 ms apart, at most --max-requests (default 400) in a run.
 * Nothing under src/data is written; edit records by hand from what it prints, then move the roadmap's asOf.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { graph } from "../src/lib/graph";
import type { Roadmap, Trial } from "../src/lib/schema";
import {
  dedupePapers, entryFor, expectedPassed, isNct, roadmapTrials, trialAcronyms, trialContradictions, watchDateContradiction,
  type RegistryRecord, type RoadmapWatchEntry, type RoadmapWatchReport, type TrialCheck, type WatchItemCheck, type WatchPaper,
} from "../src/lib/roadmap-watch";

const args = process.argv.slice(2);
const flag = (name: string): string | undefined => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const offline = args.includes("--offline");
const onlyRoadmap = flag("--roadmap");
const sinceArg = flag("--since");
const jsonPath = flag("--json");
const maxRequests = Number(flag("--max-requests") ?? 400);
const today = new Date().toISOString().slice(0, 10);

const CT_API = "https://clinicaltrials.gov/api/v2/studies";
const EPMC = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";
const UA = "OnCo roadmap-watch (https://onco.cc; hello@onco.cc)";
const SPACING_MS = 300;
const PAGE = 50;

let requests = 0;
let lastRequestAt = 0;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url: string): Promise<unknown> {
  if (requests >= maxRequests) throw new Error(`request budget of ${maxRequests} spent`);
  const wait = lastRequestAt + SPACING_MS - Date.now();
  if (wait > 0) await sleep(wait);
  requests++;
  lastRequestAt = Date.now();
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

/** One registry lookup per 50 ids; every roadmap shares the result. */
async function registry(ncts: string[]): Promise<Map<string, RegistryRecord>> {
  const out = new Map<string, RegistryRecord>();
  for (let i = 0; i < ncts.length; i += PAGE) {
    const batch = ncts.slice(i, i + PAGE);
    const params = new URLSearchParams({
      "filter.ids": batch.join(","),
      fields: "NCTId,OverallStatus,Phase,StudyType,PrimaryCompletionDate,CompletionDate,EnrollmentInfo,LastUpdatePostDate",
      format: "json",
      pageSize: String(PAGE),
    });
    const data = (await fetchJson(`${CT_API}?${params}`)) as { studies?: Array<{ protocolSection?: Record<string, Record<string, unknown>> }> };
    for (const s of data.studies ?? []) {
      const p = s.protocolSection ?? {};
      const id = p.identificationModule?.nctId as string | undefined;
      if (!id) continue;
      const st = p.statusModule ?? {};
      const design = p.designModule ?? {};
      const enrol = design.enrollmentInfo as { count?: number; type?: string } | undefined;
      out.set(id, {
        nct: id,
        status: st.overallStatus as string | undefined,
        phases: design.phases as string[] | undefined,
        studyType: design.studyType as string | undefined,
        enrolment: enrol?.count,
        enrolmentType: enrol?.type,
        primaryCompletion: (st.primaryCompletionDateStruct as { date?: string } | undefined)?.date,
        completion: (st.completionDateStruct as { date?: string } | undefined)?.date,
        lastUpdate: (st.lastUpdatePostDateStruct as { date?: string } | undefined)?.date,
      });
    }
  }
  return out;
}

const CANCER_TERMS = "(cancer OR tumor OR tumour OR oncology OR carcinoma OR leukemia OR leukaemia OR lymphoma OR myeloma OR neoplasm OR sarcoma OR melanoma OR glioma OR glioblastoma)";

/**
 * Papers whose title names the acronym, on a cancer topic, since `since`. Acronyms that are ordinary words (VISION,
 * ACTION, CROSS) must also be called a trial or study in the title or abstract.
 */
async function papersSince(acronym: string, since: string): Promise<WatchPaper[]> {
  const wordLike = /^[A-Za-z]+$/.test(acronym);
  const guard = wordLike ? ` AND (TITLE:"${acronym} trial" OR TITLE:"${acronym} study" OR ABSTRACT:"${acronym} trial" OR ABSTRACT:"${acronym} study")` : "";
  const query = `TITLE:"${acronym}" AND ${CANCER_TERMS}${guard} AND FIRST_PDATE:[${since} TO 2100-12-31] AND SRC:MED`;
  const params = new URLSearchParams({ query, format: "json", resultType: "lite", pageSize: "8", sort: "P_PDATE_D desc" });
  const data = (await fetchJson(`${EPMC}?${params}`)) as { resultList?: { result?: Array<Record<string, string>> } };
  return (data.resultList?.result ?? []).map((r) => ({ pmid: r.pmid, doi: r.doi, title: r.title, journal: r.journalTitle, date: r.firstPublicationDate }));
}

function sinceFor(rm: Roadmap): string {
  return sinceArg && /^\d{4}-\d{2}-\d{2}$/.test(sinceArg) ? sinceArg : rm.asOf;
}

async function main() {
  const g = graph();
  const roadmaps = g.kind("roadmap").filter((r) => !onlyRoadmap || r.id === onlyRoadmap);
  if (!roadmaps.length) throw new Error(onlyRoadmap ? `Roadmap ${onlyRoadmap} not found` : "No roadmaps in the corpus");

  // Everything each roadmap references, gathered once so registry and literature lookups are shared across roadmaps.
  const perRoadmap = roadmaps.map((rm) => ({ rm, since: sinceFor(rm), trials: roadmapTrials(rm, (id) => g.get(id)) }));
  const allTrials = new Map<string, Trial>();
  for (const { trials } of perRoadmap) for (const t of trials) allTrials.set(t.id, t);
  const ncts = [...new Set([...allTrials.values()].map((t) => t.nct).filter(isNct))].sort();

  // Earliest cut-off per acronym, so one search serves every roadmap that names the trial.
  const acronymSince = new Map<string, string>();
  for (const { since, trials } of perRoadmap) for (const t of trials) for (const a of trialAcronyms(t)) {
    const cur = acronymSince.get(a);
    if (!cur || since < cur) acronymSince.set(a, since);
  }

  let reg = new Map<string, RegistryRecord>();
  const registryErrors: string[] = [];
  const papersByAcronym = new Map<string, WatchPaper[]>();
  const searchErrors: string[] = [];
  if (!offline) {
    try { reg = await registry(ncts); } catch (e) { registryErrors.push((e as Error).message); }
    for (const [a, since] of [...acronymSince.entries()].sort()) {
      try { papersByAcronym.set(a, await papersSince(a, since)); } catch (e) { searchErrors.push(`${a}: ${(e as Error).message}`); if (requests >= maxRequests) break; }
    }
  }

  const report: RoadmapWatchReport = { generatedAt: today, offline, requests, roadmaps: [] };
  for (const { rm, since, trials } of perRoadmap) {
    const checks: TrialCheck[] = trials.map((t) => {
      const r = isNct(t.nct) ? reg.get(t.nct) ?? null : null;
      const papers = dedupePapers(trialAcronyms(t).flatMap((a) => papersByAcronym.get(a) ?? []).filter((p) => !p.date || p.date >= since));
      return {
        id: t.id, name: t.name, nct: t.nct,
        corpus: { status: t.status, phase: t.phase, enrolled: t.enrolled, yearReported: t.yearReported },
        registry: r,
        contradictions: trialContradictions(t, r),
        papers,
      };
    });
    const watch: WatchItemCheck[] = rm.watch.map((w) => {
      const contradictions: string[] = [];
      for (const id of w.refs) {
        const t = allTrials.get(id);
        if (!t || !isNct(t.nct)) continue;
        const c = watchDateContradiction(w, reg.get(t.nct));
        if (c) contradictions.push(`${t.name}: ${c}`);
      }
      return { item: w.item, expected: w.expected, source: w.source, refs: w.refs, passed: expectedPassed(w.expected, today), contradictions };
    });
    const flat: RoadmapWatchEntry["contradictions"] = [];
    for (const c of checks) for (const text of c.contradictions) flat.push({ ref: c.id, name: c.name, text });
    for (const w of watch) for (const text of w.contradictions) flat.push({ ref: w.refs[0] ?? rm.id, name: w.item, text });
    report.roadmaps.push({
      id: rm.id, name: rm.name, asOf: rm.asOf, since,
      counts: {
        trials: checks.length,
        checked: checks.filter((c) => c.registry).length,
        contradictions: flat.length,
        papers: checks.reduce((n, c) => n + c.papers.length, 0),
        watch: watch.length,
        watchPassed: watch.filter((w) => w.passed).length,
      },
      trials: checks, watch, contradictions: flat,
    });
  }
  report.requests = requests;

  // Plain report, grouped by roadmap.
  console.log(`Roadmap watch, ${today}: ${roadmaps.length} roadmap${roadmaps.length === 1 ? "" : "s"}, ${allTrials.size} distinct trials, ${ncts.length} with NCT ids${offline ? " (offline: registry and literature checks skipped)" : `; ${requests} requests`}.`);
  for (const err of registryErrors) console.log(`  registry lookup failed: ${err}`);
  for (const entry of report.roadmaps) {
    const c = entry.counts;
    console.log(`\n== ${entry.name} [${entry.id}] ==`);
    console.log(`asOf ${entry.asOf}; publications from ${entry.since}; ${c.trials} trials, ${c.checked} checked on the registry, ${c.contradictions} contradiction${c.contradictions === 1 ? "" : "s"}, ${c.papers} new paper${c.papers === 1 ? "" : "s"}, ${c.watch} watch item${c.watch === 1 ? "" : "s"} (${c.watchPassed} past their expected date).`);
    for (const t of entry.trials) {
      const bits = [t.nct ?? "no registry id", `phase ${t.corpus.phase}`, t.corpus.status ?? "no status", t.corpus.enrolled ? `enrolled ${t.corpus.enrolled}` : "enrolment not stated"];
      console.log(`- ${t.name} [${t.id}]: ${bits.join("; ")}`);
      if (t.registry) {
        const r = t.registry;
        console.log(`    registry: ${r.status ?? "?"}; ${r.phases?.length ? r.phases.join("/") : r.studyType ?? "?"}; enrolment ${r.enrolment ?? "?"}${r.enrolmentType ? ` (${r.enrolmentType.toLowerCase()})` : ""}; primary completion ${r.primaryCompletion ?? "?"}; completion ${r.completion ?? "?"}; last update ${r.lastUpdate ?? "?"}`);
      } else if (!offline && isNct(t.nct)) console.log("    registry: not returned");
      for (const x of t.contradictions) console.log(`    <-- ${x}`);
      for (const p of t.papers) console.log(`    paper ${p.date ?? "????-??-??"}  ${p.title}${p.journal ? ` (${p.journal})` : ""}${p.doi ? `  https://doi.org/${p.doi}` : p.pmid ? `  https://europepmc.org/article/MED/${p.pmid}` : ""}`);
    }
    if (entry.watch.length) {
      console.log("  What to watch:");
      for (const w of entry.watch) {
        console.log(`  - ${w.expected ?? "no date stated"}${w.passed ? " (passed)" : ""}  ${w.item}`);
        for (const x of w.contradictions) console.log(`      <-- ${x}`);
      }
    }
  }
  if (searchErrors.length) console.log(`\nLiterature searches that failed (${searchErrors.length}): ${searchErrors.slice(0, 10).join("; ")}${searchErrors.length > 10 ? "; ..." : ""}`);

  const total = report.roadmaps.reduce((n, r) => n + r.counts.contradictions, 0);
  const passed = report.roadmaps.reduce((n, r) => n + r.counts.watchPassed, 0);
  console.log(`\nTotals: ${total} contradiction${total === 1 ? "" : "s"}, ${passed} watch item${passed === 1 ? "" : "s"} past due, ${report.roadmaps.reduce((n, r) => n + r.counts.papers, 0)} new papers.`);
  if (total) {
    console.log("Contradictions:");
    for (const r of report.roadmaps) for (const x of r.contradictions) console.log(`- [${r.id}] ${x.name}: ${x.text}`);
  }
  console.log("Edit the records by hand from what is printed here, then move the roadmap's asOf forward.");

  if (jsonPath) {
    let out = report;
    if (onlyRoadmap && existsSync(jsonPath)) {
      // A one-roadmap run refreshes its own entry and keeps the rest of an existing report.
      const prev = JSON.parse(readFileSync(jsonPath, "utf8")) as RoadmapWatchReport;
      const fresh = entryFor(report, onlyRoadmap);
      const others = (prev.roadmaps ?? []).filter((r) => r.id !== onlyRoadmap);
      out = { ...report, roadmaps: fresh ? [...others, fresh].sort((a, b) => a.id.localeCompare(b.id)) : others };
    }
    mkdirSync(dirname(jsonPath), { recursive: true });
    writeFileSync(jsonPath, JSON.stringify(out, null, 1) + "\n");
    console.log(`Wrote ${jsonPath} (${out.roadmaps.length} roadmap${out.roadmaps.length === 1 ? "" : "s"}${onlyRoadmap ? `, refreshed ${onlyRoadmap}` : ""}).`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
