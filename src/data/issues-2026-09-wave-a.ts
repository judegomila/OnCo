import type { PaperInput, TrialInput } from "@/lib/schema";

/**
 * GitHub issues 65 to 80 (24 September 2026): one contributor's structured proposals to add or enrich the trial behind an
 * approved product's summary, wire the product's `trials` array and cite the primary paper and the label. Every record
 * here was checked against ClinicalTrials.gov API v2, the Europe PMC abstract and the DailyMed or EMA label on the day;
 * outcome rows quote only figures printed in the abstract, the registry results section or the label, and each row's
 * `source` names which. Five records keep the id of the registry stub they replace (ASCEND-4, ARCHER 1050, eXalt3,
 * FOCUS, CT041-ST-01) so live URLs and the wave 4, 5 and 6 wiring still resolve; the stubs were removed from their
 * generated files. Paper records carry the abstract's numbers and link back to the trial through `trials`.
 */
const asOf = "2026-09-24";
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
const ctResults = (nct: string) => `https://clinicaltrials.gov/study/${nct}?tab=results`;
const dm = (setid: string) => `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`;
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const DOI = {
  alta: "https://doi.org/10.1200/JCO.2016.71.5904",
  altaBrain: "https://doi.org/10.1200/JCO.2017.77.5841",
  ck301: "https://doi.org/10.1136/jitc-2023-007637",
  ck301Update: "https://doi.org/10.1016/j.jaad.2025.09.009",
  ascend4: "https://doi.org/10.1016/S0140-6736(17)30123-X",
  archer: "https://doi.org/10.1016/S1470-2045(17)30608-3",
  archerOs: "https://doi.org/10.1200/JCO.2018.78.7994",
  rockstar: "https://doi.org/10.1182/blood.2021012021",
  rockstarFda: "https://doi.org/10.1158/1078-0432.CCR-21-4176",
  actinsarc: "https://doi.org/10.1016/S1470-2045(19)30326-2",
  actinsarcSafety: "https://doi.org/10.1016/j.ijrobp.2022.07.001",
  exalt3: "https://doi.org/10.1001/jamaoncol.2021.3523",
  focus: "https://doi.org/10.1245/s10434-024-15293-x",
  msb: "https://doi.org/10.1016/j.bbmt.2020.01.018",
  ct041: "https://doi.org/10.1016/S0140-6736(25)00860-8",
  defibrotide: "https://doi.org/10.1182/blood-2015-10-676924",
  valchlor: "https://doi.org/10.1001/2013.jamadermatol.541",
  ceplene: "https://doi.org/10.1182/blood-2005-10-4073",
  vistogard: "https://doi.org/10.1002/cncr.30321",
};
const LABEL = {
  unloxcyt: dm("06bdadd5-d2db-406f-a3f8-de47f48a52e3"),
  zykadia: dm("fff5d805-4ffd-4e8e-8e63-6f129697563e"),
  vizimpro: dm("4ab27d2f-e385-4e9c-b324-fa69c10b855a"),
  ensacove: dm("1e1b2f79-678a-472a-b924-66909c8a4b2e"),
  rezurock: dm("102e4ef4-7f84-4e34-8df1-479c24d1575d"),
  hepzato: dm("4f83c8f7-4cc0-4219-88d5-7cfddce91198"),
  ryoncil: dm("a4e0918f-7444-4694-adeb-d38d98345659"),
  defitelio: dm("2c3db989-d7ad-41ed-9ebf-698dcf6c24ec"),
  valchlor: dm("6a52e4c2-6a9f-4ebb-bc77-046b4f8bcd57"),
  vistogard: dm("269f7363-63ed-444e-85f1-f0009e44818b"),
  ceplene: "https://www.ema.europa.eu/en/medicines/human/EPAR/ceplene",
};

export const issuesWaveATrials: TrialInput[] = [
  // Issue 65: ALTA, the randomised phase 2 behind brigatinib's 2017 approval after crizotinib. Registry acronym blank; the name is
  // expanded in Camidge JCO 2018 ("ALK in Lung Cancer Trial of AP26113").
  t({ id: "alta", name: "ALTA", aka: ["ALK in Lung Cancer Trial of AP26113", "AP26113-13-201"], nct: "NCT02094573", phase: "2", status: "completed", yearReported: 2017, sponsor: "Ariad Pharmaceuticals", enrolled: 222,
    setting: "ALK-positive advanced non-small-cell lung cancer that progressed on crizotinib: two brigatinib dose regimens, randomised, no control arm",
    tldr: "ALTA tested two doses of brigatinib in ALK-positive lung cancer that had progressed on crizotinib; the higher dose, started after a lower-dose first week, gave more responses and longer control, including in the brain.",
    summary: "ALTA (ALK in Lung Cancer Trial of AP26113) was a randomised phase 2 trial of brigatinib in ALK-positive non-small-cell lung cancer that had progressed on crizotinib. It randomised 222 patients 1:1 to brigatinib 90 mg once daily (arm A, 112 patients, 109 treated) or 180 mg once daily after a 7-day lead-in at 90 mg (arm B, 110 patients), stratified by brain metastases and best response to crizotinib. At baseline 69 percent had brain metastases and 74 percent had received chemotherapy. The primary endpoint was investigator-assessed confirmed objective response rate; there was no arm without brigatinib.\n\nAt a median follow-up of 8.0 months the confirmed response rate was 45 percent in arm A and 54 percent in arm B, and median progression-free survival was 9.2 and 12.9 months. Among patients with measurable brain metastases, independent review found intracranial responses in 11 of 26 (42 percent) and 12 of 18 (67 percent). Common adverse events were nausea, diarrhoea, headache and cough, mostly grade 1 or 2. A subset of pulmonary adverse events with early onset (median day 2) occurred in 14 of 219 treated patients (grade 3 or higher in 3 percent) and none occurred after escalation to 180 mg in arm B (Journal of Clinical Oncology 2017).\n\nThe authors concluded that 180 mg with the lead-in was consistently more effective than 90 mg with acceptable safety. The trial supported the 2017 US approval of brigatinib after crizotinib; ALTA-1L then tested it against crizotinib in untreated disease.",
    result: "Confirmed objective response rate 45% (90 mg) and 54% (180 mg after a 7-day 90 mg lead-in); median progression-free survival 9.2 and 12.9 months (investigator-assessed, 8.0-month median follow-up).",
    outcomes: [
      { endpoint: "Confirmed objective response rate (investigator)", primary: true, unit: "%", arms: [{ name: "Brigatinib 90 mg", n: 112, value: 45, note: "97.5% CI 34 to 56; 112 randomised, 109 treated" }, { name: "Brigatinib 180 mg (7-day 90 mg lead-in)", n: 110, value: 54, note: "97.5% CI 43 to 65" }], source: DOI.alta },
      { endpoint: "Progression-free survival (investigator)", unit: "months", arms: [{ name: "Brigatinib 90 mg", n: 112, value: 9.2 }, { name: "Brigatinib 180 mg (7-day 90 mg lead-in)", n: 110, value: 12.9 }], source: DOI.alta },
      { endpoint: "Intracranial objective response rate (independent review, measurable brain metastases)", unit: "%", arms: [{ name: "Brigatinib 90 mg", n: 26, value: 42, note: "11 of 26" }, { name: "Brigatinib 180 mg (7-day 90 mg lead-in)", n: 18, value: 67, note: "12 of 18" }], source: DOI.alta },
    ],
    drugs: ["brigatinib"], cancers: ["nsclc", "alk-positive-nsclc"], targets: ["alk"], technologies: ["kinase-inhibitors"], terms: ["brain-metastases"],
    companies: ["takeda"], people: ["kim-dong-wan", "ross-camidge"], related: ["alta-1l"], keyPapers: ["paper-alta-jco-2017"],
    links: [ct("NCT02094573"), { label: "Journal of Clinical Oncology 2017", url: DOI.alta }, { label: "Journal of Clinical Oncology 2018 (brain metastases, exploratory)", url: DOI.altaBrain }] }),
];

export const issuesWaveAPapers: PaperInput[] = [
  p({ id: "paper-alta-jco-2017", name: "Brigatinib in patients with crizotinib-refractory ALK-positive non-small-cell lung cancer: a randomized, multicenter phase II trial (ALTA)",
    tldr: "The primary report of ALTA: after crizotinib, brigatinib shrank tumours in about half of patients, more so at the 180 mg dose after a week at 90 mg, and held the disease for around a year.",
    summary: "Randomised phase 2 trial of two brigatinib regimens in 222 patients with ALK-positive non-small-cell lung cancer that had progressed on crizotinib, stratified by brain metastases and best response to crizotinib: 90 mg once daily (arm A) or 180 mg once daily after a 7-day 90 mg lead-in (arm B). The primary endpoint was investigator-assessed confirmed objective response rate.\n\nAt 8.0 months median follow-up the confirmed response rate was 45 percent in arm A and 54 percent in arm B; median progression-free survival was 9.2 and 12.9 months. Intracranial response by independent review in patients with measurable brain metastases was 42 percent (11 of 26) and 67 percent (12 of 18). Early-onset pulmonary adverse events occurred in 14 of 219 treated patients, none after escalation to 180 mg in arm B.",
    journal: "Journal of Clinical Oncology", year: 2017, doi: "10.1200/JCO.2016.71.5904", pmid: "28475456", authors: "Kim DW, Tiseo M, Ahn MJ, et al.", paperType: "rct", participants: 222, changedPractice: true,
    findings: ["Confirmed objective response rate 45% (97.5% CI 34 to 56) with 90 mg and 54% (97.5% CI 43 to 65) with 180 mg after lead-in.", "Median progression-free survival 9.2 months (95% CI 7.4 to 15.6) and 12.9 months (95% CI 11.1 to not reached).", "Intracranial response 11 of 26 (42%) and 12 of 18 (67%) among patients with measurable brain metastases; early pulmonary events in 6% of treated patients, grade 3 or higher in 3%."],
    whatItMeans: "This is the trial behind brigatinib's first approval, after crizotinib, and it set the 180 mg dose with a 90 mg lead-in that the label uses. For a patient it shows a drug with strong activity in the brain and an unusual early lung side effect that the lead-in week was designed to soften.",
    caveats: ["No control arm: both arms received brigatinib, so the trial compares doses, not brigatinib against another treatment.", "Median follow-up was only 8.0 months at the primary report.", "The 97.5% confidence intervals reflect the two-arm design and are wider than the usual 95%."],
    links: [{ label: "Journal of Clinical Oncology 2017", url: DOI.alta }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/28475456/" }, ct("NCT02094573")],
    cancers: ["nsclc", "alk-positive-nsclc"], drugs: ["brigatinib"], targets: ["alk"], trials: ["alta"], people: ["kim-dong-wan", "ross-camidge"], companies: ["takeda"], journals: ["jco"] }),
];
