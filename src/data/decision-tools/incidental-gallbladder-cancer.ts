import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * INCIDENTAL GALLBLADDER CANCER AID: what to expect after a cholecystectomy report unexpectedly shows cancer.
 * Inputs are the four items on the pathology and operation reports that the sources turn on: the T category,
 * the cystic duct margin, lymphovascular or perineural invasion, and whether the gallbladder was perforated or
 * removed intact in a bag. Every card quotes its source word for word:
 *
 *   AHPBA expert consensus statement (Aloia et al., HPB 2015; abstract read on Europe PMC, PMC4527853)
 *   Søreide et al., systematic review of incidental gallbladder cancer (Br J Surg 2019; abstract on Europe PMC)
 *   Ethun et al., timing of re-resection, US Extrahepatic Biliary Malignancy Consortium (JAMA Surg 2017; abstract on Europe PMC)
 *   McClements et al., CAPBIL, incidental gallbladder cancer in 24 UK centres (Br J Surg 2026; abstract on Europe PMC)
 *   McClements et al., CAPBIL, surgical outcomes in 516 UK patients (HPB 2026; abstract on Europe PMC)
 *   the corpus's own paper records for Selvakumar 2026 and Kim 2018 (src/data/spikes/gallbladder-evidence-papers-surgery.ts)
 *   the gallbladder cancer record's standard-of-care rows, which carry their NCCN category and cite the ESMO 2023
 *   biliary guideline (src/data/spikes/gallbladder-treatment.ts). The ESMO recommendation text itself sits behind
 *   Annals of Oncology's subscription and could not be read for this aid; the rows are OnCo's sourced summary and
 *   link to the guideline's DOI. src/lib/decision-tools.test.ts checks the row quotes against the record.
 *
 * All read 24 September 2026. The aid does not rank or weigh: where the sources disagree (T1b) both are quoted.
 */
const asOf = "2026-09-24";

const AHPBA: ToolSource = { label: "Aloia et al., Gallbladder cancer: expert consensus statement (AHPBA), HPB 2015", url: "https://doi.org/10.1111/hpb.12444" };
const SOREIDE: ToolSource = { label: "Søreide et al., Systematic review of management of incidental gallbladder cancer after cholecystectomy, British Journal of Surgery 2019", url: "https://doi.org/10.1002/bjs.11035" };
const ETHUN: ToolSource = { label: "Ethun et al., Association of optimal time interval to re-resection for incidental gallbladder cancer with overall survival, JAMA Surgery 2017", url: "https://doi.org/10.1001/jamasurg.2016.3642" };
const CAPBIL_BJS: ToolSource = { label: "McClements et al., Management of incidental gallbladder cancer in the nationwide CAPBIL study, British Journal of Surgery 2026", url: "https://doi.org/10.1093/bjs/znag050" };
const CAPBIL_HPB: ToolSource = { label: "McClements et al., Surgical outcomes in gallbladder cancer: evidence from the UK nationwide CAPBIL study, HPB 2026", url: "https://doi.org/10.1016/j.hpb.2026.06.009" };
const SELVAKUMAR: ToolSource = { label: "OnCo paper record: Selvakumar et al., Timing of revision surgery for incidental gallbladder cancer, individual patient data meta-analysis, HPB 2026", url: "https://doi.org/10.1016/j.hpb.2025.12.017" };
const KIM: ToolSource = { label: "OnCo paper record: Kim et al., Optimal surgical treatment in patients with T1b gallbladder cancer, international multicentre study, J Hepatobiliary Pancreat Sci 2018", url: "https://doi.org/10.1002/jhbp.593" };
/**
 * OnCo's own standard-of-care rows for gallbladder cancer (gallbladderStandardOfCare in src/data/spikes/gallbladder-treatment.ts),
 * each carrying its NCCN category and the guideline it was written from; the ESMO 2023 biliary guideline (Vogel et al.,
 * Annals of Oncology) is cited by the rows, not quoted, because its text is behind the journal's subscription.
 */
const ROW_ESMO: ToolSource = { label: "OnCo standard-of-care row for gallbladder cancer (gallbladder-treatment.ts), written from NCCN Biliary Tract Cancers (category 2A) and the ESMO biliary tract cancer guideline 2023 (Vogel et al., Annals of Oncology)", url: "https://doi.org/10.1016/j.annonc.2022.10.506" };
const ROW_NCCN: ToolSource = { label: "OnCo standard-of-care row for gallbladder cancer (gallbladder-treatment.ts), written from NCCN Biliary Tract Cancers (category 2A)", url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1517" };
const ROW_BILCAP: ToolSource = { label: "OnCo standard-of-care row for gallbladder cancer (gallbladder-treatment.ts), written from BILCAP (Lancet Oncology 2019; NCCN category 1; ESMO-MCBS A)", url: "https://doi.org/10.1016/S1470-2045(18)30915-X" };

/** Row text quoted from gallbladderStandardOfCare in src/data/spikes/gallbladder-treatment.ts; src/lib/decision-tools.test.ts keeps these equal to the data. */
export const QUOTED_ROWS: Record<string, string> = {
  "Incidental T1a cancer at cholecystectomy": "No further surgery when the tumour is confined to the lamina propria with a negative cystic duct margin; the cholecystectomy is curative. Refer T1b and deeper to a hepatobiliary centre.",
  "Incidental T1b, T2 or T3 cancer, no disseminated disease": "Radical re-resection of the gallbladder bed (segments IVb/V) with portal lymphadenectomy, ideally 4 to 8 weeks after the index operation, after cross-sectional imaging and staging laparoscopy in selected cases; bile duct excision only for a positive cystic duct margin; port-site excision not routine. Neoadjuvant chemotherapy before re-resection is being tested in OPT-IN.",
  "After resection (any stage from T1b, or node-positive)": "Adjuvant capecitabine 1,250 mg/m² twice daily, days 1 to 14 of 21, for eight cycles (BILCAP, UK); S-1 is the Japanese alternative (ASCOT) and is not licensed in the UK; chemoradiation after an R1 margin is case by case on the SWOG S0809 phase 2. ACTICCA-1 (gemcitabine-cisplatin, separate gallbladder cohort, 24 UK sites) is awaited.",
};

const LINKS = {
  subtype: { label: "Incidental gallbladder cancer", href: "/cancers/incidental-gallbladder-cancer/" },
  cancer: { label: "Gallbladder cancer", href: "/cancers/gallbladder/" },
  radical: { label: "Radical (extended) cholecystectomy", href: "/terms/radical-cholecystectomy/" },
  simple: { label: "Simple cholecystectomy", href: "/terms/simple-cholecystectomy/" },
  segments: { label: "Segment IVb and V resection", href: "/terms/segment-ivb-v-resection/" },
  margin: { label: "Cystic duct margin", href: "/terms/cystic-duct-margin/" },
  portSite: { label: "Port-site metastasis", href: "/terms/port-site-metastasis/" },
  t2: { label: "T2a versus T2b", href: "/terms/t2a-versus-t2b/" },
  tis: { label: "Carcinoma in situ and dysplasia", href: "/cancers/gallbladder-carcinoma-in-situ-and-dysplasia/" },
  pet: { label: "PET-CT", href: "/technologies/pet-ct/" },
  ct: { label: "CT", href: "/technologies/ct/" },
  lap: { label: "Staging laparoscopy", href: "/terms/staging-laparoscopy/" },
  lvi: { label: "Lymphovascular invasion", href: "/terms/lymphovascular-invasion/" },
  pni: { label: "Perineural invasion", href: "/terms/perineural-invasion/" },
  ukPathway: { label: "Your NHS pathway", href: "/cancers/gallbladder/uk/#pathway" },
  ukCentres: { label: "UK specialist HPB centres", href: "/cancers/gallbladder/uk/#centres" },
  ukFunding: { label: "What the NHS funds", href: "/cancers/gallbladder/uk/#funding" },
  bilcap: { label: "BILCAP", href: "/trials/bilcap/" },
  capecitabine: { label: "Capecitabine", href: "/drugs/capecitabine/" },
  decisions: { label: "Gallbladder cancer decisions", href: "/cancers/gallbladder/decisions/" },
  ethun: { label: "Ethun 2017 paper record", href: "/key-papers/paper-ethun-re-resection-timing-incidental-gallbladder-cancer-jama-surg-2017/" },
  soreide: { label: "Søreide 2019 paper record", href: "/key-papers/paper-soreide-incidental-gallbladder-cancer-review-bjs-2019/" },
  capbil: { label: "CAPBIL incidental cancer paper record", href: "/key-papers/paper-mcclements-capbil-incidental-gallbladder-cancer-bjs-2026/" },
};

const cards: ToolCard[] = [
  { id: "no-further-surgery", title: "Tis or T1a with a clear cystic duct margin: the operation already done is the treatment", tone: "stop",
    quotes: [
      { text: "Patients with cancers confined to the mucosa (T1a or less) had 5-year survival rates of up to 100 per cent after cholecystectomy alone.", source: SOREIDE },
      { text: `Incidental T1a cancer at cholecystectomy: ${QUOTED_ROWS["Incidental T1a cancer at cholecystectomy"]}`, source: ROW_ESMO },
    ],
    meaning: "A cancer that has not reached the muscle layer, with a clear margin, is treated by the cholecystectomy you have had. The case should still be discussed by a specialist hepatobiliary team, and the pathologist should have examined the whole specimen.",
    questions: ["Has the whole gallbladder been examined, including the cystic duct margin, and were Rokitansky-Aschoff sinuses involved?", "Will my case go to the specialist hepatobiliary multidisciplinary meeting even though no further surgery is planned?", "What follow-up, if any, is suggested?"],
    links: [LINKS.simple, LINKS.tis, LINKS.subtype] },

  { id: "early-margin-involved", title: "Tis or T1a with cancer at the cystic duct margin: the resection was not complete", tone: "refer",
    quotes: [
      { text: "Re-resection should include complete portal lymphadenectomy and bile duct resection only when needed to achieve a negative margin (R0) resection.", source: AHPBA },
      { text: "within high incidence areas, the assessment of routine gallbladder specimens should include the microscopic evaluation of a minimum of three sections and the cystic duct margin; specimens with dysplasia or proven cancer should be extensively sampled.", source: AHPBA },
    ],
    meaning: "The consensus principle is a negative margin. Cancer or high-grade dysplasia at the cystic duct margin means the first operation left disease behind, so a hepatobiliary centre needs to consider re-excising the bile duct margin even though the tumour is early. This is a referral, not a settled plan.",
    questions: ["Is the margin truly involved, or is it dysplasia running to the edge?", "Would a bile duct margin re-excision be enough, or is a larger operation being considered?"],
    links: [LINKS.margin, LINKS.tis, LINKS.radical] },

  { id: "early-margin-unknown", title: "Tis or T1a, margin not reported: ask for the cystic duct margin", tone: "discuss",
    quotes: [{ text: "within high incidence areas, the assessment of routine gallbladder specimens should include the microscopic evaluation of a minimum of three sections and the cystic duct margin; specimens with dysplasia or proven cancer should be extensively sampled.", source: AHPBA }],
    meaning: "For an early cancer the margin is the one item that decides whether anything more is needed. The consensus asks pathologists to examine it and to sample a cancer-bearing specimen extensively; ask for the report to state it.",
    questions: ["Can the pathologist report the cystic duct margin and, if needed, examine more of the specimen?"],
    links: [LINKS.margin, LINKS.subtype] },

  { id: "re-resection", title: "T1b, T2 or T3: re-resection at a hepatobiliary centre is recommended", tone: "surgery",
    quotes: [
      { text: "Patients with T1b, T2 or T3 disease that is incidentally identified in a cholecystectomy specimen should undergo re-resection unless this is contraindicated by advanced disease or poor performance status.", source: AHPBA },
      { text: "For cancers invading the muscle layer of the gallbladder wall (T1b or above), reresection is recommended. The type, extent and timing of reresection remain controversial.", source: SOREIDE },
      { text: `Incidental T1b, T2 or T3 cancer, no disseminated disease: ${QUOTED_ROWS["Incidental T1b, T2 or T3 cancer, no disseminated disease"]}`, source: ROW_NCCN },
      { text: "Primary resection of patients with early T-stage (T1b-2) disease should include en bloc resection of adjacent liver parenchyma.", source: AHPBA },
    ],
    meaning: "Once the tumour has reached the muscle layer or beyond, the consensus, the UK review and the NCCN-cited row all point the same way: a second operation removing the liver bed next to the gallbladder (segments IVb and V) with the portal lymph nodes, at a specialist centre, unless scans show the disease has spread or you are not fit for it. For T2 tumours the side of the gallbladder matters: see the T2a versus T2b page.",
    questions: ["Which hepatobiliary centre will see me, and when is the multidisciplinary meeting?", "How much liver would be removed, and how many nodes does the team aim to retrieve?", "For a T2 tumour: was it on the liver side or the free side?"],
    links: [LINKS.radical, LINKS.segments, LINKS.t2, LINKS.subtype, LINKS.ukCentres] },

  { id: "t1b-debate", title: "T1b in particular: the benefit of the second operation is contested", tone: "discuss",
    quotes: [
      { text: "Five-year disease-specific survival 93.7 percent after simple cholecystectomy vs 95.5 percent after extended cholecystectomy (p=0.496) in 237 T1b patients.", source: KIM },
      { text: "The type, extent and timing of reresection remain controversial.", source: SOREIDE },
    ],
    meaning: "Guidelines recommend re-resection from T1b, but the largest international T1b series found no difference in disease-specific survival between the simple operation and the extended one. Worth raising: it is a genuine choice, and the cancer page records the analyses on both sides.",
    questions: ["Given the T1b evidence, what does the team see as the gain from a second operation in my case, and what are its risks?"],
    links: [LINKS.subtype, LINKS.decisions] },

  { id: "margin-involved", title: "Cancer at the cystic duct margin: the bile duct is resected to reach a clear margin", tone: "surgery",
    quotes: [{ text: "Re-resection should include complete portal lymphadenectomy and bile duct resection only when needed to achieve a negative margin (R0) resection.", source: AHPBA }],
    meaning: "The bile duct is taken only when it has to be, and a positive cystic duct margin is the usual reason. Expect the second operation to include the extrahepatic bile duct with a new join between liver and bowel.",
    questions: ["Will the bile duct be removed, and what does that add to recovery?"],
    links: [LINKS.margin, LINKS.radical] },

  { id: "margin-clear", title: "Cystic duct margin clear: the bile duct is usually left alone", tone: "info",
    quotes: [{ text: "Re-resection should include complete portal lymphadenectomy and bile duct resection only when needed to achieve a negative margin (R0) resection.", source: AHPBA }],
    meaning: "With a clear margin the consensus does not add a bile duct resection; the second operation is the liver bed and the portal nodes.",
    links: [LINKS.margin] },

  { id: "margin-unknown", title: "Margin not reported: it decides whether the bile duct is resected", tone: "discuss",
    quotes: [
      { text: "Re-resection should include complete portal lymphadenectomy and bile duct resection only when needed to achieve a negative margin (R0) resection.", source: AHPBA },
      { text: "within high incidence areas, the assessment of routine gallbladder specimens should include the microscopic evaluation of a minimum of three sections and the cystic duct margin; specimens with dysplasia or proven cancer should be extensively sampled.", source: AHPBA },
    ],
    meaning: "Ask for the cystic duct margin to be reported before the second operation is planned; it is the item that decides whether the bile duct is included.",
    questions: ["Can the cystic duct margin be reported, or the specimen reviewed by the specialist centre's pathologist?"],
    links: [LINKS.margin] },

  { id: "timing", title: "Timing: the four-to-eight-week window and what has been found since", tone: "info",
    quotes: [
      { text: "Patients who underwent reoperation between 4 and 8 weeks had the longest median overall survival (group B: 40.4 months) compared with those who underwent early (group A: 17.4 months) or late (group C: 22.4 months) reoperation (log-rank P = .03).", source: ETHUN },
      { text: "The optimal time interval for re-resection for incidentally discovered gallbladder cancer appears to be between 4 and 8 weeks after the initial cholecystectomy.", source: ETHUN },
      { text: "No difference in overall survival by timing: hazard ratio 1.29 (95 percent CI 0.79 to 2.10).", source: SELVAKUMAR },
      { text: "Observation time may be used for new cross-sectional imaging with CT and MRI.", source: SOREIDE },
    ],
    meaning: "The widely quoted window comes from 207 US patients; a 2026 pooling of 2,067 patients found timing made no measurable difference. Read together: there is time for scans and referral, and completing the operation matters more than the exact week.",
    questions: ["When is the second operation likely to be, and what scans happen before it?"],
    links: [LINKS.ethun, LINKS.soreide, LINKS.subtype] },

  { id: "staging", title: "What the staging before a second operation should include", tone: "info",
    quotes: [
      { text: "The minimum staging evaluation of patients with suspected or proven gallbladder cancer includes contrasted cross-sectional imaging and diagnostic laparoscopy.", source: AHPBA },
      { text: "Gallbladder cancers are PET-avid, and PET may detect residual disease and thus prevent unnecessary surgery.", source: SOREIDE },
      { text: "Routine laparoscopic staging before reresection is not warranted for all stages.", source: SOREIDE },
      { text: "Patients with confirmed metastases to N2 nodal stations do not benefit from radical resection and should receive systemic and/or palliative treatments.", source: AHPBA },
      { text: "Adequate lymphadenectomy includes assessment of any suspicious regional nodes, evaluation of the aortocaval nodal basin, and a goal recovery of at least six nodes.", source: AHPBA },
    ],
    meaning: "Expect a contrast CT of chest, abdomen and pelvis or an MRI, often a PET-CT, and in selected cases a keyhole look inside the abdomen before the operation. The scans are looking for disease that would make the operation futile: spread to the peritoneum or liver, or to nodes beyond the portal group.",
    questions: ["Will I have a PET-CT, and will the team look at the aortocaval nodes?", "Is a staging laparoscopy planned, and why or why not for my stage?"],
    links: [LINKS.ct, LINKS.pet, LINKS.lap] },

  { id: "lvi-present", title: "Lymphovascular or perineural invasion present: a marker the team weighs", tone: "discuss",
    quotes: [
      { text: "On multivariable analysis, T3-T4 stage, nodal disease, and perineural invasion predicted poorer DFS, while T3-T4 stage and nodal disease predicted worse OS.", source: CAPBIL_HPB },
      { text: "Risk of peritoneal carcinomatosis increases with each T category.", source: SOREIDE },
    ],
    meaning: "Invasion of small vessels or nerves is a sign of more aggressive biology. In the UK series it predicted earlier recurrence after surgery. It does not change the re-resection rule, which turns on the T category, but the team will weigh it when discussing staging and treatment after surgery.",
    questions: ["Does perineural or lymphovascular invasion change what you advise for me, for surgery or for chemotherapy afterwards?"],
    links: [LINKS.lvi, LINKS.pni, LINKS.capbil] },

  { id: "lvi-absent", title: "No lymphovascular or perineural invasion reported", tone: "info",
    quotes: [{ text: "On multivariable analysis, T3-T4 stage, nodal disease, and perineural invasion predicted poorer DFS, while T3-T4 stage and nodal disease predicted worse OS.", source: CAPBIL_HPB }],
    meaning: "One fewer adverse feature. The recommendations above rest on the T category and the margin and do not change.",
    links: [LINKS.lvi, LINKS.pni] },

  { id: "lvi-unknown", title: "Invasion not reported: it is on the standard pathology dataset", tone: "discuss",
    quotes: [{ text: "On multivariable analysis, T3-T4 stage, nodal disease, and perineural invasion predicted poorer DFS, while T3-T4 stage and nodal disease predicted worse OS.", source: CAPBIL_HPB }],
    meaning: "Ask whether the pathologist recorded lymphovascular and perineural invasion; the UK series found perineural invasion predicted earlier recurrence, and the specialist team will want it.",
    questions: ["Were lymphovascular and perineural invasion assessed?"],
    links: [LINKS.lvi, LINKS.pni] },

  { id: "perforated", title: "The gallbladder was perforated or bile spilled: a higher risk of spread, port sites not routinely excised", tone: "discuss",
    quotes: [
      { text: "Perforation at initial surgery had a higher risk of disease dissemination.", source: SOREIDE },
      { text: "The incidence of port-site metastases is about 10 per cent. Routine resection of port sites has no effect on survival.", source: SOREIDE },
    ],
    meaning: "Spillage from a gallbladder that turns out to hold cancer raises the chance of seeding in the abdomen and at the keyhole sites, which is one reason the staging scans matter. Cutting out the port sites routinely does not improve survival, so most centres no longer do it.",
    questions: ["Does the spillage change the staging scans or the timing?", "Will the port sites be examined or excised?"],
    links: [LINKS.portSite, LINKS.subtype] },

  { id: "intact", title: "Removed intact: the lower-risk situation", tone: "info",
    quotes: [
      { text: "Perforation at initial surgery had a higher risk of disease dissemination.", source: SOREIDE },
      { text: "The incidence of port-site metastases is about 10 per cent. Routine resection of port sites has no effect on survival.", source: SOREIDE },
    ],
    meaning: "An intact specimen, with or without a retrieval bag, avoids the added risk that perforation carries. Port-site metastases are still described and the sites are watched rather than routinely removed.",
    links: [LINKS.portSite] },

  { id: "spill-unknown", title: "Not stated: the operation note should say", tone: "discuss",
    quotes: [{ text: "Perforation at initial surgery had a higher risk of disease dissemination.", source: SOREIDE }],
    meaning: "Whether the gallbladder was opened or spilled during the first operation is on the operation note; ask for it, because it changes how the team reads the staging scans.",
    questions: ["Does the operation note record perforation, bile spillage or a retrieval bag?"],
    links: [LINKS.portSite] },

  { id: "adjuvant", title: "After the second operation: chemotherapy, and what the UK series found", tone: "info",
    quotes: [
      { text: `After resection (any stage from T1b, or node-positive): ${QUOTED_ROWS["After resection (any stage from T1b, or node-positive)"]}`, source: ROW_BILCAP },
      { text: "Following R0 resection of T2-4 disease in N1 gallbladder cancer, patients should be considered for adjuvant systemic chemotherapy and/or chemoradiotherapy.", source: AHPBA },
      { text: "In addition, patients who completed adjuvant chemotherapy had better DFS (35 versus 15 months, P = 0.021) and OS (47 versus 26 months, P = 0.009) compared with those who did not.", source: CAPBIL_BJS },
      { text: "Propensity score-matched analysis demonstrated no significant benefit in DFS or OS among patients who received adjuvant therapy compared with those who did not.", source: CAPBIL_HPB },
      { text: "Adjuvant chemotherapy is poorly documented and probably underused.", source: SOREIDE },
    ],
    meaning: "Six months of capecitabine tablets is the standard offered after surgery in the UK, on the BILCAP trial. The two UK CAPBIL papers read differently: patients who completed chemotherapy did better in the incidental-cancer cohort, but a matched analysis of all operated patients showed no benefit. Ask how the team reads that for you.",
    questions: ["Will capecitabine be offered after the operation, and for how long?", "Is there a trial, such as ACTICCA-1, that I could join?"],
    links: [LINKS.bilcap, LINKS.capecitabine, LINKS.ukFunding] },

  { id: "uk-pathway", title: "In the UK: the specialist HPB team, and what happened to patients like you", tone: "refer",
    quotes: [
      { text: "Of the 193 patients (67.7%) who underwent liver resection, most (97.9%) underwent segment 4B/5 resection. Patients with incidental GBC who underwent liver resection had significantly improved DFS (51 versus 15 months, P < 0.001) and OS (72 versus 26 months, P < 0.001) compared with those who did not.", source: CAPBIL_BJS },
      { text: "On multivariable analysis, nodal metastases were independently associated with poorer DFS (HR 2.04 (95% c.i. 1.30 to 3.20), P = 0.002), while advanced tumour (T3-T4) stage (HR 1.70 (95% c.i. 1.04 to 2.77), P = 0.034) and nodal metastases (HR 2.15 (95% c.i. 1.33 to 3.48), P = 0.002) predicted poorer OS.", source: CAPBIL_BJS },
    ],
    meaning: "Across 24 UK centres two thirds of people with an incidental cancer went on to liver surgery, almost always the segment IVb and V operation, and those who did stayed free of disease far longer; the comparison is not randomised, so part of the gap is selection. The NHS route is the specialist hepatobiliary multidisciplinary team; the UK page names the centres and the waiting-time standards.",
    questions: ["Which specialist HPB centre covers my area, and has my case been referred?"],
    links: [LINKS.ukPathway, LINKS.ukCentres, LINKS.capbil] },
];

function decide(a: Answers): string[] {
  const early = a.t === "tis" || a.t === "t1a";
  const out: string[] = [];
  if (early) {
    out.push(a.margin === "clear" ? "no-further-surgery" : a.margin === "involved" ? "early-margin-involved" : "early-margin-unknown");
  } else {
    out.push("re-resection");
    if (a.t === "t1b") out.push("t1b-debate");
    out.push(a.margin === "involved" ? "margin-involved" : a.margin === "clear" ? "margin-clear" : "margin-unknown");
    out.push("timing", "staging");
  }
  out.push(a.lvi === "present" ? "lvi-present" : a.lvi === "absent" ? "lvi-absent" : "lvi-unknown");
  out.push(a.spill === "perforated" ? "perforated" : a.spill === "unknown" ? "spill-unknown" : "intact");
  if (!early) out.push("adjuvant");
  out.push("uk-pathway");
  return out;
}

export const incidentalGallbladderCancerTool: DecisionTool = {
  id: "incidental-gallbladder-cancer",
  cancerId: "gallbladder",
  entityIds: ["gallbladder", "incidental-gallbladder-cancer", "gallbladder-carcinoma-in-situ-and-dysplasia", "cystic-duct-margin", "simple-cholecystectomy", "radical-cholecystectomy", "port-site-metastasis"],
  title: "Incidental gallbladder cancer: what the reports mean for the next step",
  short: "Incidental cancer aid",
  lede: "A gallbladder removed for stones has come back from the pathologist with a cancer in it. Enter the four items from the pathology and operation reports and read what the expert consensus, the UK systematic review, the timing study and the UK-wide CAPBIL series say for that combination, each quoted word for word, with the staging a second operation needs and the NHS route. An educational aid for the conversation with your surgeon, not advice. Nothing you enter leaves this page.",
  icon: "layers",
  guideline: AHPBA,
  sources: [AHPBA, SOREIDE, ETHUN, CAPBIL_BJS, CAPBIL_HPB, SELVAKUMAR, KIM, ROW_ESMO, ROW_NCCN, ROW_BILCAP],
  asOf,
  inputs: [
    { id: "t", label: "T category on the pathology report", hint: "How deep the tumour went: Tis lining only; T1a connective tissue under the lining; T1b muscle layer; T2 beyond the muscle but within the gallbladder; T3 through the outer wall or into the liver.", icon: "layers",
      options: [{ value: "tis", label: "Tis" }, { value: "t1a", label: "T1a" }, { value: "t1b", label: "T1b" }, { value: "t2", label: "T2" }, { value: "t3", label: "T3" }] },
    { id: "margin", label: "Cystic duct margin", hint: "The cut end of the duct that joined the gallbladder to the main bile duct.", icon: "margin",
      options: [{ value: "clear", label: "Clear (negative)" }, { value: "involved", label: "Involved (positive)" }, { value: "unknown", label: "Not stated" }] },
    { id: "lvi", label: "Lymphovascular or perineural invasion", icon: "vessel",
      options: [{ value: "absent", label: "Absent" }, { value: "present", label: "Present" }, { value: "unknown", label: "Not stated" }] },
    { id: "spill", label: "At the operation, the gallbladder was", hint: "From the operation note.", icon: "bag",
      options: [{ value: "intact", label: "Removed intact" }, { value: "bag", label: "Removed intact in a retrieval bag" }, { value: "perforated", label: "Perforated, or bile spilled" }, { value: "unknown", label: "Not stated" }] },
  ],
  cards,
  decide,
  questions: [
    "Has my case been referred to the specialist hepatobiliary multidisciplinary team, and when does it meet?",
    "Can I have a copy of the full pathology report and the operation note?",
    "Which trials are open for gallbladder cancer at the centre?",
  ],
  notes: [
    "The aid covers cancers found by chance in a gallbladder removed for another reason, staged Tis to T3 with no known spread. T4 disease, involved distant nodes or metastases are outside it: the sources direct those to systemic treatment, and the cancer page's decisions cover them.",
    "The AHPBA statement is a 2014 consensus published in 2015; the UK review is from 2019; the CAPBIL papers report UK practice from 2014 to 2022. Newer evidence on T1b and on timing is quoted where it exists.",
    "The ESMO 2023 biliary guideline's recommendation text is behind the journal's subscription and is not quoted; the standard-of-care rows quoted above are OnCo's sourced summary and link to the guideline.",
  ],
  links: [LINKS.subtype, LINKS.cancer, LINKS.decisions, LINKS.ukPathway, { label: "Gallbladder polyp aid", href: "/tools/gallbladder-polyp/" }],
};
