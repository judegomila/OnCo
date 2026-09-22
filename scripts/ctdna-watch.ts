/**
 * ctDNA roadmap watch: what has moved since the roadmap was last checked.
 *
 * Reads the `ctdna-tests` roadmap (src/data/ctdna-roadmap.ts), lists every trial it references (steps, watch items and
 * the `trials` array) with the corpus status, then, unless --offline is passed:
 *   1. asks the ClinicalTrials.gov v2 API for each NCT id's overall status and completion dates and flags differences
 *      from what the corpus says;
 *   2. searches Europe PMC for papers naming each trial acronym together with ctDNA, first published on or after the
 *      roadmap's asOf date, and prints the newest titles.
 * Output is a plain text report. Nothing is written; edit the roadmap by hand from what it prints, then move asOf.
 *
 *   npm run ctdna:watch              full report
 *   npm run ctdna:watch -- --offline corpus-only listing (no network)
 *   npm run ctdna:watch -- --since 2026-06-01   override the publication cut-off
 */
import { graph } from "../src/lib/graph";
import type { Trial } from "../src/lib/schema";

const ROADMAP_ID = "ctdna-tests";
const args = process.argv.slice(2);
const offline = args.includes("--offline");
const sinceArg = args[args.indexOf("--since") + 1];
const CT_API = "https://clinicaltrials.gov/api/v2/studies";
const EPMC = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";
const UA = "OnCo ctdna-watch (https://onco.cc; hello@onco.cc)";

/** Acronym searches beyond the trial names in the corpus: registries and sub-trials the roadmap talks about by name. */
const EXTRA_ACRONYMS = ["GALAXY", "VEGA", "ALTAIR", "PATHFINDER", "NHS-Galleri", "ECLIPSE", "Vanguard"];

type CtRecord = { nct: string; status?: string; primaryCompletion?: string; completion?: string; enrolment?: number; lastUpdate?: string };

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function registry(ncts: string[]): Promise<Map<string, CtRecord>> {
  const out = new Map<string, CtRecord>();
  if (!ncts.length) return out;
  const params = new URLSearchParams({ "filter.ids": ncts.join(","), fields: "NCTId,OverallStatus,PrimaryCompletionDate,CompletionDate,EnrollmentInfo,LastUpdatePostDate", format: "json", pageSize: "50" });
  const data = (await fetchJson(`${CT_API}?${params}`)) as { studies?: Array<{ protocolSection?: Record<string, Record<string, unknown>> }> };
  for (const s of data.studies ?? []) {
    const p = s.protocolSection ?? {};
    const id = p.identificationModule?.nctId as string | undefined;
    if (!id) continue;
    const st = p.statusModule ?? {};
    out.set(id, {
      nct: id,
      status: st.overallStatus as string | undefined,
      primaryCompletion: (st.primaryCompletionDateStruct as { date?: string } | undefined)?.date,
      completion: (st.completionDateStruct as { date?: string } | undefined)?.date,
      enrolment: (p.designModule?.enrollmentInfo as { count?: number } | undefined)?.count,
      lastUpdate: (st.lastUpdatePostDateStruct as { date?: string } | undefined)?.date,
    });
  }
  return out;
}

type Paper = { pmid?: string; doi?: string; title: string; journal?: string; date?: string };

async function papersSince(acronym: string, since: string): Promise<Paper[]> {
  const query = `(TITLE:"${acronym}" OR ABSTRACT:"${acronym}") AND (ctDNA OR "circulating tumor DNA" OR "circulating tumour DNA" OR "cell-free DNA" OR "multi-cancer") AND FIRST_PDATE:[${since} TO 2100-12-31] AND SRC:MED`;
  const params = new URLSearchParams({ query, format: "json", resultType: "lite", pageSize: "8", sort: "P_PDATE_D desc" });
  const data = (await fetchJson(`${EPMC}?${params}`)) as { resultList?: { result?: Array<Record<string, string>> } };
  return (data.resultList?.result ?? []).map((r) => ({ pmid: r.pmid, doi: r.doi, title: r.title, journal: r.journalTitle, date: r.firstPublicationDate }));
}

/** The corpus's status vocabulary against the registry's; only clear contradictions are flagged. */
function contradiction(corpus: string | undefined, reg: string | undefined): string | null {
  if (!corpus || !reg) return null;
  const closed = new Set(["COMPLETED", "TERMINATED", "WITHDRAWN", "SUSPENDED"]);
  if (corpus === "recruiting" && reg !== "RECRUITING" && reg !== "NOT_YET_RECRUITING" && reg !== "ENROLLING_BY_INVITATION") return `corpus says recruiting, registry says ${reg}`;
  if (corpus === "active" && closed.has(reg)) return `corpus says active, registry says ${reg}`;
  if (corpus === "completed" && !closed.has(reg)) return `corpus says completed, registry says ${reg}`;
  return null;
}

async function main() {
  const g = graph();
  const rm = g.get(ROADMAP_ID);
  if (!rm || rm.kind !== "roadmap") throw new Error(`Roadmap ${ROADMAP_ID} not found`);
  const since = sinceArg && /^\d{4}-\d{2}-\d{2}$/.test(sinceArg) ? sinceArg : rm.asOf;

  const ids = new Set<string>(rm.trials);
  for (const s of rm.steps) for (const id of s.refs) ids.add(id);
  for (const w of rm.watch) for (const id of w.refs) ids.add(id);
  const trials = [...ids].map((id) => g.get(id)).filter((e): e is Trial => !!e && e.kind === "trial").sort((a, b) => a.name.localeCompare(b.name));

  console.log(`ctDNA roadmap watch: ${rm.name}`);
  console.log(`Roadmap asOf ${rm.asOf}; publications searched from ${since}; ${trials.length} trials referenced.\n`);

  console.log("== Trials in the roadmap (corpus view) ==");
  for (const t of trials) {
    const bits = [t.nct ?? "no registry id", `phase ${t.phase}`, t.status ?? "no status", t.yearReported ? `reported ${t.yearReported}` : "not reported"];
    console.log(`- ${t.name} [${t.id}]: ${bits.join("; ")}`);
    if (t.result) console.log(`    result: ${t.result}`);
  }

  console.log("\n== What to watch (from the roadmap) ==");
  for (const w of rm.watch) console.log(`- ${w.expected ?? "no date stated"}  ${w.item}`);

  if (offline) { console.log("\n(offline: registry and literature checks skipped)"); return; }

  const ncts = trials.map((t) => t.nct).filter((n): n is string => !!n && /^NCT\d{8}$/.test(n));
  console.log("\n== ClinicalTrials.gov: status and completion dates ==");
  try {
    const reg = await registry(ncts);
    for (const t of trials) {
      if (!t.nct) continue;
      const r = reg.get(t.nct);
      if (!r) { console.log(`- ${t.name} (${t.nct}): not returned by the registry (non-NCT id or lookup failed)`); continue; }
      const flag = contradiction(t.status, r.status);
      console.log(`- ${t.name} (${t.nct}): ${r.status ?? "?"}; primary completion ${r.primaryCompletion ?? "?"}; completion ${r.completion ?? "?"}; enrolment ${r.enrolment ?? "?"}; last update ${r.lastUpdate ?? "?"}${flag ? `  <-- ${flag}` : ""}`);
      if (t.enrolled && r.enrolment && t.enrolled !== r.enrolment) console.log(`    enrolment differs: corpus ${t.enrolled}, registry ${r.enrolment}`);
    }
    const noNct = trials.filter((t) => !t.nct || !/^NCT\d{8}$/.test(t.nct));
    if (noNct.length) console.log(`  Not checkable here (no NCT id): ${noNct.map((t) => `${t.name}${t.nct ? ` (${t.nct})` : ""}`).join(", ")}`);
  } catch (e) {
    console.log(`  registry lookup failed: ${(e as Error).message}`);
  }

  console.log(`\n== Europe PMC: papers naming each trial since ${since} ==`);
  const acronyms = new Set<string>(EXTRA_ACRONYMS);
  for (const t of trials) {
    const base = t.name.replace(/\s*\(.*\)$/, "");
    for (const part of base.split(/\s*\/\s*/)) if (/^[A-Za-z][A-Za-z0-9-]{3,}(\s[A-Za-z0-9-]+)?$/.test(part) && !/^NCT/.test(part)) acronyms.add(part);
  }
  let found = 0;
  for (const a of [...acronyms].sort()) {
    try {
      const ps = await papersSince(a, since);
      if (!ps.length) continue;
      found += ps.length;
      console.log(`- ${a}: ${ps.length} new`);
      for (const p of ps) console.log(`    ${p.date ?? "????-??-??"}  ${p.title}${p.journal ? ` (${p.journal})` : ""}${p.doi ? `  https://doi.org/${p.doi}` : p.pmid ? `  https://europepmc.org/article/MED/${p.pmid}` : ""}`);
    } catch (e) {
      console.log(`- ${a}: search failed: ${(e as Error).message}`);
    }
  }
  if (!found) console.log("  nothing new found for any acronym.");
  console.log("\nIf anything above is not on the roadmap page, edit src/data/ctdna-roadmap.ts and move asOf forward.");
}

main().catch((e) => { console.error(e); process.exit(1); });
