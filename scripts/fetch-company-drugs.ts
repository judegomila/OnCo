/**
 * Wave 6 of docs/CONTENT-ROADMAP.md, step 3: drugs for companies that have none, through the ClinicalTrials.gov lead-sponsor field.
 *
 * For each company with no `drugs` and no drug naming it as maker, take the corpus trials whose sponsor string is the
 * company's name or an alias exactly (companyKeys of src/lib/completeness.ts: the whole normalised string, corporate
 * suffixes stripped; never a substring) and which name drugs. A drug is a candidate when, as in wave 2 (scripts/link-joins.ts
 * rule 4), it is the trial's studied agent (the title names it, or it is the sole drug, or a curated record lists it first),
 * it is not approved (comparators and backbones are approved drugs), it has no maker on record and no trial of the drug
 * resolves to another company. The trial's registry record is then fetched by NCT id and the candidate is kept only when the
 * registry's lead sponsor is the company, by the same exact match, and one of its interventions names the drug (drugKeys,
 * whole normalised name). Candidates that fail the registry check go into COMPANY_DRUG_SKIP with the reason.
 *
 * Writes src/data/company-drugs-wave6.ts: companyDrugsWave6 (company id to drug ids), trialCompaniesWave6 (trial id to the
 * sponsor's company id, so the verified trial also lists its sponsor) and COMPANY_DRUG_SKIP. src/data/index.ts merges them.
 *
 *   npx tsx scripts/fetch-company-drugs.ts               dry run
 *   npx tsx scripts/fetch-company-drugs.ts --apply       write the data file
 *   npx tsx scripts/fetch-company-drugs.ts --only=beijing-konruns-pharmaceutical --debug
 *
 * Requests go through scripts/wave6-shared.ts: one at a time, 250 ms apart, cached under /tmp/ctgov-cache.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { companyKey, companyKeys, drugKeys } from "../src/lib/completeness";
import { resolveSponsor } from "../src/data/sponsor-aliases";
import type { Company, Drug, Trial } from "../src/lib/schema";
import { companyDrugsWave6, trialCompaniesWave6, COMPANY_DRUG_SKIP } from "../src/data/company-drugs-wave6";
import { ctgovStudy, mentions, recordLines, requestCount } from "./wave6-shared";

const OUT_FILE = join(process.cwd(), "src", "data", "company-drugs-wave6.ts");
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const DEBUG = args.includes("--debug");
const FORCE = args.includes("--force");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? Infinity);
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);

const APPROVED = new Set(["approved", "standard-of-care"]);
const CLASS_WORD = /\b(agonists?|antagonists?|inhibitors?|blockers?|antibod(y|ies)|analog(ue)?s?|vaccines?|therap(y|ies)|agents?|regimens?|chemotherapy|conjugates?|modulators?)\b/i;

const g = graph();
const drugs = g.kind("drug") as Drug[];
const trials = g.kind("trial") as Trial[];
const companies = g.kind("company") as Company[];

// Wave 2's definition of a studied agent, unchanged.
const registry = (t: Trial) => t.tags.includes("ctgov-ingest");
const titleText = (t: Trial) => (registry(t) ? `${t.name} ${t.aka.join(" ")} ${t.setting}` : `${t.name} ${t.aka.join(" ")}`);
const drugTokens = (d: Drug, min = 4): string[] => [...new Set([d.name, d.brand, d.code, ...d.aka].filter((s): s is string => typeof s === "string" && s.trim().length >= min && !CLASS_WORD.test(s)).map((s) => s.trim()))];
const studied = (t: Trial, d: Drug) => (t.drugs.length === 1 && t.drugs[0] === d.id) || (!registry(t) && t.drugs[0] === d.id) || !!mentions(titleText(t), drugTokens(d));

/** Company ids by every exact key; a key two companies share resolves to nobody. */
const companyByKey = new Map<string, string | null>();
for (const c of companies) for (const k of companyKeys(c)) companyByKey.set(k, companyByKey.has(k) && companyByKey.get(k) !== c.id ? null : c.id);
/** The company a sponsor string names exactly, or through the curated alias table when that gives an id. */
function sponsorToCompany(name: string): string | undefined {
  const exact = companyByKey.get(companyKey(name));
  if (exact) return exact;
  const r = resolveSponsor(name);
  return r.matched && r.id && g.get(r.id)?.kind === "company" ? r.id : undefined;
}
const trialsByDrug = new Map<string, Trial[]>();
for (const t of trials) for (const id of t.drugs) trialsByDrug.set(id, [...(trialsByDrug.get(id) ?? []), t]);
const trialsOf = (d: Drug): Trial[] => { const m = new Map<string, Trial>(); for (const t of trialsByDrug.get(d.id) ?? []) m.set(t.id, t); for (const id of d.trials) { const t = g.get(id); if (t?.kind === "trial") m.set(t.id, t); } return [...m.values()]; };
const trialCompanies = (t: Trial): string[] => { const s = t.sponsor ? sponsorToCompany(t.sponsor) : undefined; return [...new Set(s ? [...t.companies, s] : t.companies)]; };

const candidates = companies
  .filter((c) => (ONLY ? ONLY.includes(c.id) : c.drugs.length === 0 && !drugs.some((d) => d.companies.includes(c.id))))
  .filter((c) => !(c.id in COMPANY_DRUG_SKIP) && !(c.id in companyDrugsWave6))
  .sort((a, b) => a.id.localeCompare(b.id));

type Outcome = { company: string; note: string };
async function main(): Promise<void> {
  const outcomes: Outcome[] = [];
  const newLinks: Record<string, string[]> = {};
  const newTrialCompanies: Record<string, string[]> = {};
  const newSkips: Record<string, string> = {};
  const held = { noTrial: 0, noDrugs: 0, maker: 0, approved: 0, unnamed: 0, ambiguous: 0, noNct: 0 };
  const tally = { companies: 0, drugs: 0, verified: 0, sponsorMismatch: 0, interventionMismatch: 0, failed: 0 };
  let looked = 0;

  for (const c of candidates) {
    const keys = companyKeys(c);
    const mine = trials.filter((t) => t.sponsor && (keys.has(companyKey(t.sponsor)) || t.companies.includes(c.id)));
    if (!mine.length) { held.noTrial++; continue; }
    if (!mine.some((t) => t.drugs.length)) { held.noDrugs++; continue; }
    if (looked >= MAX) break;
    looked++;
    const picked = new Map<string, Trial>();
    const reasons: string[] = [];
    for (const t of mine) for (const did of t.drugs) {
      if (picked.has(did)) continue;
      const d = g.get(did) as Drug | undefined;
      if (!d) continue;
      if (d.companies.length) { held.maker++; reasons.push(`${did}: maker on record`); continue; }
      if (APPROVED.has(d.status ?? "")) { held.approved++; reasons.push(`${did}: approved`); continue; }
      if (!studied(t, d)) { held.unnamed++; reasons.push(`${did}: not the studied agent of ${t.id}`); continue; }
      const others = new Set(trialsOf(d).flatMap((x) => trialCompanies(x)).filter((id) => id !== c.id));
      if (others.size) { held.ambiguous++; reasons.push(`${did}: also tested by ${[...others].join(", ")}`); continue; }
      picked.set(did, t);
    }
    if (DEBUG) console.log(`\n${c.id}: ${mine.length} sponsored trials; candidates ${[...picked.keys()].join(", ") || "none"}${reasons.length ? `; held: ${reasons.join("; ")}` : ""}`);
    if (!picked.size) { outcomes.push({ company: c.id, note: `no candidate drug (${reasons.slice(0, 4).join("; ")})` }); continue; }
    const kept: string[] = [];
    for (const [did, t] of picked) {
      const d = g.get(did) as Drug;
      if (!t.nct) { held.noNct++; outcomes.push({ company: c.id, note: `${did}: trial ${t.id} has no NCT id to verify against` }); continue; }
      const study = await ctgovStudy(t.nct, { force: FORCE });
      if (!study) { tally.failed++; outcomes.push({ company: c.id, note: `${did}: registry record ${t.nct} not fetched` }); continue; }
      const lead = study.protocolSection?.sponsorCollaboratorsModule?.leadSponsor?.name ?? "";
      if (!keys.has(companyKey(lead))) {
        tally.sponsorMismatch++;
        const reason = `ClinicalTrials.gov lead sponsor of ${t.nct} is "${lead}", not ${c.name}`;
        newSkips[c.id] = reason; outcomes.push({ company: c.id, note: `${did}: skipped, ${reason}` }); continue;
      }
      const dk = drugKeys(d);
      const named = (study.protocolSection?.armsInterventionsModule?.interventions ?? []).some((iv) => [...drugKeys({ name: iv.name ?? "", aka: iv.otherNames ?? [] })].some((k) => k.length >= 4 && dk.has(k)));
      if (!named) {
        tally.interventionMismatch++;
        const reason = `no intervention of ${t.nct} names ${d.name} on ClinicalTrials.gov`;
        newSkips[c.id] = reason; outcomes.push({ company: c.id, note: `${did}: skipped, ${reason}` }); continue;
      }
      kept.push(did); tally.verified++;
      if (!t.companies.includes(c.id)) newTrialCompanies[t.id] = [...new Set([...(newTrialCompanies[t.id] ?? []), c.id])];
      outcomes.push({ company: c.id, note: `gains ${did} (lead sponsor of ${t.nct} "${lead}", intervention named)` });
    }
    if (kept.length) { newLinks[c.id] = kept.sort(); tally.companies++; tally.drugs += kept.length; }
  }

  for (const o of outcomes) console.log(`${o.company.padEnd(44)} ${o.note}`);
  console.log(`\n${candidates.length} companies without a drug; ${looked} with a sponsored corpus trial naming drugs looked at; ${requestCount()} requests made (the rest from cache).`);
  console.log(`companies gaining drugs ${tally.companies} (${tally.drugs} links, all verified against the registry); skipped: ${tally.sponsorMismatch} lead sponsor differs, ${tally.interventionMismatch} intervention not named; failed ${tally.failed}`);
  console.log(`held back: ${held.noTrial} companies sponsor no corpus trial by exact name, ${held.noDrugs} only trials naming no drug, ${held.maker} drugs with a maker on record, ${held.approved} approved (comparators), ${held.unnamed} not the studied agent, ${held.ambiguous} also tested by another sponsor, ${held.noNct} trials without an NCT id`);

  if (!APPLY) { console.log("\nDry run: pass --apply to write src/data/company-drugs-wave6.ts"); return; }
  const allLinks = { ...companyDrugsWave6, ...newLinks };
  const allTrialCompanies = { ...trialCompaniesWave6 };
  for (const [tid, ids] of Object.entries(newTrialCompanies)) allTrialCompanies[tid] = [...new Set([...(allTrialCompanies[tid] ?? []), ...ids])];
  const allSkips = { ...COMPANY_DRUG_SKIP, ...newSkips };
  writeFileSync(OUT_FILE, `/**
 * Company to drug links written by scripts/fetch-company-drugs.ts (wave 6 of docs/CONTENT-ROADMAP.md). A company gains a
 * drug only when ClinicalTrials.gov names the company, by its exact name or alias, as lead sponsor of a corpus trial whose
 * registry intervention list names the drug, and the drug is that trial's studied agent, is not approved, has no maker on
 * record and is tested by no other sponsor. trialCompaniesWave6 adds the sponsor to the same trials' \`companies\`.
 * src/data/index.ts merges both. COMPANY_DRUG_SKIP lists companies the script will not retry, with the reason; clear an
 * entry to try again. Do not edit by hand; re-run the script.
 */
export const companyDrugsWave6: Record<string, string[]> = {
${recordLines(allLinks)}
};

export const trialCompaniesWave6: Record<string, string[]> = {
${recordLines(allTrialCompanies)}
};

export const COMPANY_DRUG_SKIP: Record<string, string> = {
${recordLines(allSkips)}
};
`);
  console.log(`\nWrote ${Object.keys(allLinks).length} company links, ${Object.keys(allTrialCompanies).length} trial sponsor links and ${Object.keys(allSkips).length} skips.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
