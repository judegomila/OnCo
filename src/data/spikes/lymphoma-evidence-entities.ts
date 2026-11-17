import type { PaperInput, TrialInput } from "@/lib/schema";
import type { Spike, SpikeSupplement } from "./index";
import { CX, ct, doi, epmc, pubmed } from "./lymphoma-evidence-shared";

/**
 * LYMPHOMA: THE EVIDENCE FOR THE ENTITY PAGES THE TAXONOMY ADDED. The closing round of the lymphoma deep dive,
 * 3 November 2026.
 *
 * Why this file exists. The evidence facet (./lymphoma-evidence*.ts) was written on 1 October 2026 before the
 * taxonomy facet's entity records landed, so it attached the trials of extranodal NK/T-cell lymphoma and adult
 * T-cell leukaemia/lymphoma to the peripheral T-cell lymphoma hub and listed those diseases in PENDING_CANCERS.
 * When the entity pages arrived they had standard-of-care rows and no trials: on 3 November extranodal NK/T-cell
 * lymphoma, adult T-cell leukaemia/lymphoma and high-grade B-cell lymphoma with MYC and BCL2 rearrangements held
 * no trial and no paper, and the two anaplastic large cell lymphomas held one trial each and no paper.
 *
 * What is here. (1) Nine trial records and ten paper records for the studies those pages' own treatment rows
 * rest on or name, and that the corpus did not hold. (2) Supplements that attach the entity pages to trials and
 * papers the corpus already held under the hubs (ECHELON-2, ALCANZA, MAVORIC, Study 201, the ISCL/EORTC staging
 * paper and five registry records). SMILE, JCOG9801 and the Hinuma paper are owned by the evidence facet and
 * were re-pointed in place.
 *
 * How the facts were obtained. Every paper was resolved by PubMed id through NCBI E-utilities on 3 November 2026
 * (the Europe PMC search service returned 503 that day) and its DOI, journal, year and authors are the indexed
 * record's; every figure below is quoted from the indexed abstract. Every ClinicalTrials.gov field (identifier,
 * start date, phase, enrolment, lead sponsor, conditions) was read from the v2 API the same day. Before anything
 * was written, the full corpus was searched by DOI, PubMed id and registry id for each study, and none was held.
 *
 * What is not here. Valemetostat has no drug record, so it is named in words and not linked.
 * JCOG0211 has no ClinicalTrials.gov record under that name or by its regimen, so it is a paper and not a trial.
 * There has never been a randomised trial confined to high-grade B-cell lymphoma with MYC and BCL2
 * rearrangements, which the entity page already says; the one prospective study added is single-arm.
 */

const asOf = "2026-11-03";
const TAG = "lymphoma-evidence-entities";

/** The entity records the taxonomy facet added on 1 October 2026, which this file wires. */
export const EX = {
  enktl: "extranodal-nk-t-cell-lymphoma",
  atll: "adult-t-cell-leukaemia-lymphoma",
  alclPos: "alk-positive-anaplastic-large-cell-lymphoma",
  alclNeg: "alk-negative-anaplastic-large-cell-lymphoma",
  pcalcl: "primary-cutaneous-anaplastic-large-cell-lymphoma",
  mf: "mycosis-fungoides",
  hgbl: "high-grade-b-cell-lymphoma-myc-bcl2",
  imt: "inflammatory-myofibroblastic-tumour",
  plasmablastic: "plasmablastic-lymphoma",
} as const;

type T = Omit<TrialInput, "kind" | "asOf">;
const trial = (x: T): TrialInput => ({ kind: "trial", asOf, tags: [TAG], ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const paper = (x: P): PaperInput => ({ kind: "paper", asOf, tags: [TAG], ...x });

// ======================= EXTRANODAL NK/T-CELL LYMPHOMA =======================
const enktlTrials: TrialInput[] = [
  trial({ id: "ddgp-vs-smile-enktl", name: "DDGP versus SMILE", nct: "NCT01501149", phase: "4", status: "positive",
    setting: "Newly diagnosed stage III or IV extranodal NK/T-cell lymphoma, aged 14 to 70: six cycles of DDGP (dexamethasone, cisplatin, gemcitabine, pegaspargase) against six cycles of SMILE",
    sponsor: "Mingzhi Zhang (First Affiliated Hospital of Zhengzhou University)", started: "2011-01", yearReported: 2022,
    enrolled: 87, enrolledBasis: "randomised", enrolledNote: "The registry gives an estimated enrolment of 80; the final report randomised 87, of whom 80 received treatment, 40 in each arm.",
    aka: ["CTTNKTL-III/IV", "DDGP regimen", "Pegaspargase-based versus L-asparaginase-based chemotherapy in advanced NK/T-cell lymphoma"],
    tldr: "In advanced NK/T-cell lymphoma, a gentler regimen built on pegylated asparaginase kept the disease controlled for longer than SMILE, the regimen it was compared with, and caused fewer dangerously low white cell counts.",
    summary: "SMILE showed that an asparaginase-based regimen works in extranodal NK/T-cell lymphoma, where anthracyclines fail, but it is toxic: in its own phase 2 study grade 4 neutropenia occurred in 92 per cent. This open-label randomised trial at 12 hospitals in China, run from January 2011 to February 2019, compared it with DDGP, which keeps the asparaginase (as pegaspargase) and replaces the methotrexate, ifosfamide and etoposide with cisplatin and gemcitabine.\n\nThe final report (Wang and colleagues, JAMA Oncology 2022) randomised 87 patients, of whom 80 were treated, 40 in each arm; median age 43. At a median follow-up of 41.5 months, median progression-free survival was not reached with DDGP against 6.8 months with SMILE (hazard ratio 0.42, 95 per cent confidence interval 0.23 to 0.77, p = 0.004), and median overall survival was not reached against 75.2 months (hazard ratio 0.41, 0.19 to 0.89, p = 0.02). Three-year progression-free survival was 56.6 against 41.8 per cent and five-year overall survival 74.3 against 51.7 per cent. Grade 3 and 4 leukopenia occurred in 62.5 against 85.0 per cent. An interim report of the first 42 patients had appeared in Clinical Cancer Research in 2016.\n\nThe authors call the result promising preliminary evidence and say a confirmation trial in a larger population is warranted. It is the randomised trial behind the statement on the entity page that gentler asparaginase regimens such as DDGP are widely used in China.",
    result: "Progression-free survival hazard ratio 0.42 and overall survival hazard ratio 0.41 in favour of DDGP over SMILE, with less grade 3 and 4 leukopenia.",
    outcomes: [
      { endpoint: "Progression-free survival", primary: true, arms: [{ name: "DDGP", n: 40, note: "median not reached; 3-year rate 56.6 per cent" }, { name: "SMILE", n: 40, value: 6.8, note: "median 6.8 months; 3-year rate 41.8 per cent" }], unit: "months", hr: 0.42, ci: [0.23, 0.77], p: "0.004", source: "https://doi.org/10.1001/jamaoncol.2022.1968" },
      { endpoint: "Overall survival", arms: [{ name: "DDGP", n: 40, note: "median not reached; 5-year rate 74.3 per cent" }, { name: "SMILE", n: 40, value: 75.2, note: "median 75.2 months; 5-year rate 51.7 per cent" }], unit: "months", hr: 0.41, ci: [0.19, 0.89], p: "0.02", source: "https://doi.org/10.1001/jamaoncol.2022.1968" },
      { endpoint: "Overall response rate", unit: "%", arms: [{ name: "DDGP", n: 40, value: 90 }, { name: "SMILE", n: 40, value: 60 }], p: "0.002", source: "https://doi.org/10.1001/jamaoncol.2022.1968" },
    ],
    replication: "Not repeated outside the sponsoring group; the authors themselves ask for a larger confirmatory trial. The registry lists the study as phase 4 and its status as unknown.",
    cancers: [EX.enktl, CX.ptcl, CX.nhl], drugs: ["dexamethasone", "cisplatin", "gemcitabine", "asparaginase", "methotrexate", "ifosfamide", "etoposide"],
    terms: ["pfs", "orr", "hazard-ratio"], technologies: ["cytotoxic-chemotherapy"], sections: ["chemotherapy"],
    trials: ["smile-enktl"], keyPapers: ["paper-ddgp-vs-smile-nk-t-cell-lymphoma-jama-oncol-2022", "paper-ddgp-vs-smile-nk-t-cell-lymphoma-clin-cancer-res-2016"],
    links: [ct("NCT01501149"), doi("10.1001/jamaoncol.2022.1968", "JAMA Oncology 2022")] }),

  trial({ id: "orient-4", name: "ORIENT-4", nct: "NCT03228836", phase: "2", status: "positive",
    setting: "Relapsed or refractory extranodal NK/T-cell lymphoma after at least one asparaginase-based regimen: sintilimab 200 mg every three weeks for up to 24 months",
    sponsor: "Innovent Biologics (Suzhou) Co. Ltd.", started: "2017-08-23", startedType: "actual", yearReported: 2021, enrolled: 28,
    aka: ["Sintilimab in relapsed NK/T-cell lymphoma", "IBI308 in extranodal NK/T-cell lymphoma"],
    tldr: "A PD-1 antibody given alone shrank the lymphoma in three out of four people whose NK/T-cell lymphoma had come back after asparaginase chemotherapy.",
    summary: "NK/T-cell lymphoma that relapses after an asparaginase-based regimen had no standard. Its tumour cells commonly express PD-L1, which is the reason PD-1 antibodies were tried. ORIENT-4 was a single-arm, multicentre phase 2 study in China that gave the PD-1 antibody sintilimab, 200 mg intravenously every three weeks for up to 24 months, to 28 patients enrolled between August 2017 and February 2018 who had failed at least one asparaginase-based regimen.\n\nTwenty-one of the 28 (75.0 per cent, 95 per cent confidence interval 55.1 to 89.3) had an objective response by the Lugano 2014 criteria. At a median follow-up of 30.4 months median overall survival had not been reached and two-year overall survival was 78.6 per cent. Most treatment-related adverse events were grade 1 or 2, the commonest a fall in the lymphocyte count; serious adverse events occurred in seven patients and none died of an adverse event.\n\nIt is one of the studies behind the statement on the entity page that PD-1 blockade has substantial activity in relapsed disease. It is small and uncontrolled.",
    result: "Objective response in 21 of 28 (75.0 per cent); two-year overall survival 78.6 per cent.",
    outcomes: [
      { endpoint: "Objective response rate (Lugano 2014)", primary: true, unit: "%", arms: [{ name: "Sintilimab", n: 28, value: 75, note: "95 per cent confidence interval 55.1 to 89.3" }], source: "https://doi.org/10.1038/s41392-021-00768-0" },
      { endpoint: "Overall survival at 24 months", unit: "%", arms: [{ name: "Sintilimab", n: 28, value: 78.6 }], source: "https://doi.org/10.1038/s41392-021-00768-0" },
    ],
    replication: "Consistent with smaller reports of other PD-1 antibodies in relapsed NK/T-cell lymphoma; no randomised comparison exists.",
    cancers: [EX.enktl, CX.ptcl], drugs: ["sintilimab"], targets: ["pd1"], technologies: ["checkpoint-inhibitor"], sections: ["immunotherapy"],
    companies: ["innovent"], terms: ["orr"], keyPapers: ["paper-orient-4-sintilimab-nk-t-cell-lymphoma-2021"],
    links: [ct("NCT03228836"), doi("10.1038/s41392-021-00768-0", "Signal Transduction and Targeted Therapy 2021")] }),
];

const enktlPapers: PaperInput[] = [
  paper({ id: "paper-ddgp-vs-smile-nk-t-cell-lymphoma-jama-oncol-2022",
    name: "Efficacy and Safety of a Pegasparaginase-Based Chemotherapy Regimen vs an L-asparaginase-Based Chemotherapy Regimen for Newly Diagnosed Advanced Extranodal Natural Killer/T-Cell Lymphoma: A Randomized Clinical Trial",
    aka: ["DDGP versus SMILE, final report", "Wang 2022"],
    tldr: "The final report of the Chinese randomised trial in which a pegaspargase regimen, DDGP, kept advanced NK/T-cell lymphoma controlled for longer than SMILE, with less toxicity to the blood count.",
    summary: "An open-label, multicentre randomised trial at 12 hospitals in China from January 2011 to February 2019, in patients aged 14 to 70 with newly diagnosed stage III or IV extranodal natural killer/T-cell lymphoma and performance status 0 to 2. Patients were randomised evenly to DDGP (dexamethasone, cisplatin, gemcitabine and pegaspargase) or SMILE (dexamethasone, methotrexate, ifosfamide, L-asparaginase and etoposide), every 21 days for six cycles. The primary endpoint was progression-free survival.",
    journal: "JAMA Oncology", year: 2022, doi: "10.1001/jamaoncol.2022.1968", pmid: "35708709",
    authors: "Wang X, Zhang L, Liu X, et al.", paperType: "rct", participants: 87,
    findings: [
      "87 patients were randomised and 80 treated, 40 in each arm; median age 43, 64 per cent male.",
      "At a median follow-up of 41.5 months, median progression-free survival was not reached with DDGP against 6.8 months with SMILE (hazard ratio 0.42, 95 per cent confidence interval 0.23 to 0.77, p = 0.004).",
      "Median overall survival was not reached against 75.2 months (hazard ratio 0.41, 95 per cent confidence interval 0.19 to 0.89, p = 0.02).",
      "Three-year progression-free survival was 56.6 against 41.8 per cent, and five-year overall survival 74.3 against 51.7 per cent.",
      "Overall response was 90.0 against 60.0 per cent (p = 0.002).",
      "Grade 3 and 4 leukopenia occurred in 62.5 per cent with DDGP against 85.0 per cent with SMILE, and neutropenia in 65.0 against 85.0 per cent.",
    ],
    whatItMeans: "A randomised comparison between two asparaginase regimens in advanced NK/T-cell lymphoma, and the evidence for using a pegaspargase-and-gemcitabine regimen rather than SMILE. In the authors' words, the DDGP regimen showed promising preliminary results and a confirmation trial based on a larger population is warranted.",
    caveats: [
      "80 treated patients from one national group; the trial has not been repeated.",
      "Open label, and run over eight years.",
      "The registry record lists the study as phase 4, with an estimated enrolment of 80 and its status unknown.",
    ],
    links: [doi("10.1001/jamaoncol.2022.1968", "JAMA Oncology 2022"), pubmed("35708709"), epmc("35708709")],
    cancers: [EX.enktl, CX.ptcl], drugs: ["dexamethasone", "cisplatin", "gemcitabine", "asparaginase", "methotrexate", "ifosfamide", "etoposide"],
    trials: ["ddgp-vs-smile-enktl", "smile-enktl"] }),

  paper({ id: "paper-ddgp-vs-smile-nk-t-cell-lymphoma-clin-cancer-res-2016",
    name: "DDGP versus SMILE in Newly Diagnosed Advanced Natural Killer/T-Cell Lymphoma: A Randomized Controlled, Multicenter, Open-label Study in China",
    aka: ["DDGP versus SMILE, interim report", "Li 2016"],
    tldr: "The interim report of the Chinese trial comparing two asparaginase regimens in advanced NK/T-cell lymphoma, on its first 42 patients.",
    summary: "The interim report of the randomised trial registered as NCT01501149, in newly diagnosed stage III to IV NK/T-cell lymphoma with performance status 0 to 2, randomised to six cycles of DDGP or SMILE. Its primary endpoint was progression-free survival. The final analysis appeared in JAMA Oncology in 2022 and is the record to read for the result.",
    journal: "Clinical Cancer Research", year: 2016, doi: "10.1158/1078-0432.CCR-16-0153", pmid: "27060152",
    authors: "Li X, Cui Y, Sun Z, et al.", paperType: "rct", participants: 42,
    findings: [
      "42 patients enrolled, 21 in each arm.",
      "One-year progression-free survival was 86 per cent with DDGP against 38 per cent with SMILE (p = 0.006), and two-year overall survival 74 against 45 per cent (p = 0.027).",
      "Complete remission was 71 against 29 per cent (p = 0.005) and overall response 95 against 67 per cent (p = 0.018).",
      "SMILE caused more serious leucopenia (p = 0.030) and more severe allergic reactions (p = 0.015); two patients on SMILE had grade 4 mucosal reactions.",
    ],
    whatItMeans: "An interim look whose direction the final report confirmed with smaller differences. The early figures are larger than the final ones, which is the usual pattern of an interim analysis on a small sample.",
    caveats: ["Interim analysis of 42 patients; superseded by the final report of 80 treated patients in JAMA Oncology 2022."],
    links: [doi("10.1158/1078-0432.CCR-16-0153", "Clinical Cancer Research 2016"), pubmed("27060152"), epmc("27060152")],
    cancers: [EX.enktl], drugs: ["dexamethasone", "cisplatin", "gemcitabine", "asparaginase"], trials: ["ddgp-vs-smile-enktl"] }),

  paper({ id: "paper-jcog0211-chemoradiotherapy-nasal-nk-t-cell-lymphoma-jco-2009",
    name: "Phase I/II study of concurrent chemoradiotherapy for localized nasal natural killer/T-cell lymphoma: Japan Clinical Oncology Group Study JCOG0211",
    aka: ["JCOG0211", "RT-2/3DeVIC", "Yamaguchi 2009"],
    tldr: "A Japanese study gave radiotherapy to the nose at the same time as a reduced-dose chemotherapy regimen, and three out of four people with early nasal NK/T-cell lymphoma were alive two years later, against fewer than half with radiotherapy alone in the past.",
    summary: "A phase 1/2 study of concurrent chemoradiotherapy in newly diagnosed stage IE or contiguous IIE nasal natural killer/T-cell lymphoma with cervical node involvement and performance status 0 to 2. Treatment was radiotherapy to 50 Gy given at the same time as three courses of DeVIC (dexamethasone, etoposide, ifosfamide and carboplatin), a regimen the authors describe as multidrug resistance-nonrelated agents and etoposide. The phase 1 part set the recommended dose at two thirds of full DeVIC. No ClinicalTrials.gov record was found for the study when the registry was searched on 3 November 2026, so it is a paper here and not a trial record.",
    journal: "Journal of Clinical Oncology", year: 2009, doi: "10.1200/JCO.2009.23.8295", pmid: "19805668",
    authors: "Yamaguchi M, Tobinai K, Oguchi M, et al.", paperType: "observational", participants: 33,
    findings: [
      "33 patients were enrolled, 10 in phase 1; 27 were treated at the recommended dose (median age 56).",
      "With a median follow-up of 32 months, two-year overall survival was 78 per cent (95 per cent confidence interval 57 to 89), against 45 per cent in the historical control treated with radiotherapy alone.",
      "Of 26 patients assessable for response, 20 (77 per cent) had a complete response; overall response was 81 per cent.",
      "The commonest grade 3 non-haematological toxicity was radiation mucositis, in 30 per cent; there were no treatment-related deaths.",
    ],
    whatItMeans: "The study that established concurrent chemoradiotherapy, rather than radiotherapy alone, for localised nasal NK/T-cell lymphoma in Japan. The entity page's statement that early disease is treated with radiotherapy at about 50 Gy combined with chemotherapy rests on this design; later Chinese and Korean regimens kept the radiotherapy and changed the chemotherapy.",
    caveats: [
      "Single-arm, 27 patients at the recommended dose; the comparison with radiotherapy alone is against a historical control, not a randomised arm.",
      "The regimen contains no asparaginase; later Chinese and Korean regimens added it.",
    ],
    links: [doi("10.1200/JCO.2009.23.8295", "Journal of Clinical Oncology 2009"), pubmed("19805668"), epmc("19805668")],
    cancers: [EX.enktl, CX.ptcl], drugs: ["dexamethasone", "etoposide", "ifosfamide", "carboplatin"],
    technologies: ["imrt-igrt", "cytotoxic-chemotherapy"], terms: ["lymphoma-tx-radiotherapy"] }),

  paper({ id: "paper-orient-4-sintilimab-nk-t-cell-lymphoma-2021",
    name: "Sintilimab for relapsed/refractory extranodal NK/T cell lymphoma: a multicenter, single-arm, phase 2 trial (ORIENT-4)",
    aka: ["ORIENT-4", "Tao 2021"],
    tldr: "The report of the Chinese trial in which the PD-1 antibody sintilimab produced responses in 75 per cent of people whose NK/T-cell lymphoma had relapsed after asparaginase chemotherapy.",
    summary: "A multicentre, single-arm phase 2 trial (NCT03228836) of sintilimab 200 mg intravenously every three weeks for up to 24 months in relapsed or refractory extranodal NK/T-cell lymphoma after at least one asparaginase-based regimen. The primary endpoint was objective response by the Lugano 2014 criteria. 28 patients were enrolled between 31 August 2017 and 7 February 2018.",
    journal: "Signal Transduction and Targeted Therapy", year: 2021, doi: "10.1038/s41392-021-00768-0", pmid: "34702811",
    authors: "Tao R, Fan L, Song Y, et al.", paperType: "observational", participants: 28,
    findings: [
      "21 of 28 patients (75.0 per cent, 95 per cent confidence interval 55.1 to 89.3) had an objective response.",
      "At a median follow-up of 30.4 months, median overall survival was not reached; two-year overall survival was 78.6 per cent (95 per cent confidence interval 58.4 to 89.8).",
      "71.4 per cent of treatment-related adverse events were grade 1 or 2; the commonest was a decreased lymphocyte count (42.9 per cent).",
      "Serious adverse events occurred in 7 patients (25.0 per cent); none died of an adverse event.",
    ],
    whatItMeans: "Evidence that PD-1 blockade works after asparaginase failure in NK/T-cell lymphoma, a setting with no other standard. Single-arm and small, so it shows activity rather than a comparison with anything else.",
    caveats: ["Single arm, 28 patients, all in China.", "No comparator, so the survival figures cannot be read as a benefit over another treatment."],
    links: [doi("10.1038/s41392-021-00768-0", "Signal Transduction and Targeted Therapy 2021"), pubmed("34702811"), epmc("34702811")],
    cancers: [EX.enktl], drugs: ["sintilimab"], targets: ["pd1"], technologies: ["checkpoint-inhibitor"], trials: ["orient-4"] }),
];

// ======================= ADULT T-CELL LEUKAEMIA/LYMPHOMA =======================
const atllTrials: TrialInput[] = [
  trial({ id: "mogamulizumab-atll-phase-2-japan", name: "Mogamulizumab phase 2 in relapsed adult T-cell leukaemia/lymphoma (Japan)", nct: "NCT00920790", phase: "2", status: "positive",
    setting: "Relapsed aggressive CCR4-positive adult T-cell leukaemia/lymphoma: mogamulizumab (KW-0761) 1.0 mg/kg weekly for eight weeks",
    sponsor: "Kyowa Kirin Co., Ltd.", started: "2009-06", yearReported: 2012, enrolled: 28,
    aka: ["KW-0761 phase 2", "Ishida 2012"],
    tldr: "An antibody against CCR4, a protein on the surface of most adult T-cell leukaemia cells, produced a response in half of the people in a Japanese study whose disease had come back after chemotherapy.",
    summary: "Adult T-cell leukaemia/lymphoma is usually resistant to chemotherapy, and most tumours carry the chemokine receptor CCR4. Mogamulizumab is a defucosylated anti-CCR4 antibody engineered for stronger antibody-dependent cellular cytotoxicity. This Japanese multicentre phase 2 study gave it at 1.0 mg/kg once a week for eight weeks to patients with relapsed aggressive CCR4-positive disease; the primary endpoint was overall response.\n\nOf 28 patients enrolled, 27 received at least one infusion. Thirteen of 26 evaluable patients responded, eight of them completely: an overall response of 50 per cent (95 per cent confidence interval 30 to 70). Median progression-free survival was 5.2 months and median overall survival 13.7 months. The commonest adverse events were infusion reactions (89 per cent) and skin rashes (63 per cent). An updated analysis of the 26 relapsed patients (Cancer Science 2017) gave a median overall survival of 14.4 months and found that patients who developed a rash of grade 2 or more did better, which the entity page describes.",
    result: "Overall response 50 per cent (13 of 26), eight complete; median progression-free survival 5.2 months and overall survival 13.7 months.",
    outcomes: [
      { endpoint: "Overall response rate", primary: true, unit: "%", arms: [{ name: "Mogamulizumab", n: 26, value: 50, note: "95 per cent confidence interval 30 to 70; eight complete responses" }], source: "https://doi.org/10.1200/JCO.2011.37.3472" },
      { endpoint: "Progression-free survival (median)", unit: "months", arms: [{ name: "Mogamulizumab", n: 27, value: 5.2 }], source: "https://doi.org/10.1200/JCO.2011.37.3472" },
      { endpoint: "Overall survival (median)", unit: "months", arms: [{ name: "Mogamulizumab", n: 27, value: 13.7, note: "14.4 months in the 2017 updated analysis of the 26 relapsed patients" }], source: "https://doi.org/10.1200/JCO.2011.37.3472" },
    ],
    replication: "The international randomised phase 2 study 0761-009 in the United States, Europe and Latin America found a much lower confirmed response rate (11 per cent). Its authors name the differences: the Japanese study took relapsed but not refractory disease and checked that a response had lasted after four weeks rather than eight, and the international patients were older, with worse performance status and more bone marrow involvement.",
    cancers: [EX.atll, CX.ptcl], drugs: ["mogamulizumab"], targets: ["ccr4"], technologies: ["monoclonal-antibody"], sections: ["immunotherapy"],
    companies: ["kyowa-kirin"], terms: ["orr", "lymphoma-htlv-1"], trials: ["mogamulizumab-atll-0761-009", "mlsg15-mogamulizumab-atll"],
    keyPapers: ["paper-mogamulizumab-relapsed-atll-phase-2-jco-2012"],
    links: [ct("NCT00920790"), doi("10.1200/JCO.2011.37.3472", "Journal of Clinical Oncology 2012"), doi("10.1111/cas.13343", "Cancer Science 2017: updated follow-up")] }),

  trial({ id: "mlsg15-mogamulizumab-atll", name: "mLSG15 with or without mogamulizumab", nct: "NCT01173887", phase: "2", status: "mixed",
    setting: "Newly diagnosed aggressive adult T-cell leukaemia/lymphoma: dose-intensified chemotherapy (mLSG15, VCAP-AMP-VECP) with mogamulizumab against mLSG15 alone",
    sponsor: "Kyowa Kirin Co., Ltd.", started: "2010-07", yearReported: 2015,
    enrolled: 53, enrolledBasis: "analysed", enrolledNote: "The registry records 44 enrolled; the published report says 54 were enrolled, of whom 29 in the combination arm and 24 in the chemotherapy arm received treatment.",
    aka: ["mLSG15 plus KW-0761", "Ishida 2015"],
    tldr: "Adding mogamulizumab to the intensive Japanese chemotherapy for newly diagnosed adult T-cell leukaemia raised the complete remission rate, at the cost of more side effects, including infections and lung inflammation.",
    summary: "A randomised phase 2 study in Japan asking whether mogamulizumab adds to mLSG15, the dose-intensified VCAP-AMP-VECP chemotherapy that JCOG9801 made the Japanese standard, in newly diagnosed aggressive adult T-cell leukaemia/lymphoma. Patients were assigned 1:1; the primary endpoint was the complete response rate.\n\nComplete response was 52 per cent (95 per cent confidence interval 33 to 71) with the combination (29 patients) against 33 per cent (16 to 55) with chemotherapy alone (24 patients); overall response was 86 against 75 per cent. Grade 3 or worse anaemia, thrombocytopenia, lymphopenia, leucopenia and decreased appetite were at least 10 percentage points more frequent with the combination, and skin disorders, cytomegalovirus infection, fever, high blood sugar and interstitial lung disease occurred only in the combination arm. The authors describe a potentially less favourable safety profile and a higher complete response rate, providing the basis for further investigation.",
    result: "Complete response 52 against 33 per cent with the addition of mogamulizumab, with more toxicity; no survival endpoint was primary.",
    outcomes: [
      { endpoint: "Complete response rate", primary: true, unit: "%", arms: [{ name: "mLSG15 with mogamulizumab", n: 29, value: 52, note: "95 per cent confidence interval 33 to 71" }, { name: "mLSG15 alone", n: 24, value: 33, note: "95 per cent confidence interval 16 to 55" }], source: "https://doi.org/10.1111/bjh.13338" },
      { endpoint: "Overall response rate", unit: "%", arms: [{ name: "mLSG15 with mogamulizumab", n: 29, value: 86 }, { name: "mLSG15 alone", n: 24, value: 75 }], source: "https://doi.org/10.1111/bjh.13338" },
    ],
    replication: "Not repeated in a phase 3 trial.",
    cancers: [EX.atll, CX.ptcl], drugs: ["mogamulizumab", "vincristine", "cyclophosphamide", "doxorubicin", "prednisone", "etoposide", "carboplatin"],
    targets: ["ccr4"], technologies: ["monoclonal-antibody", "cytotoxic-chemotherapy"], sections: ["immunotherapy", "chemotherapy"],
    companies: ["kyowa-kirin"], terms: ["complete-response", "lymphoma-htlv-1"], trials: ["jcog9801"],
    keyPapers: ["paper-mlsg15-mogamulizumab-atll-bjh-2015"],
    links: [ct("NCT01173887"), doi("10.1111/bjh.13338", "British Journal of Haematology 2015")] }),

  trial({ id: "mogamulizumab-atll-0761-009", name: "Study 0761-009: mogamulizumab against investigator's choice in relapsed adult T-cell leukaemia/lymphoma", nct: "NCT01626664", phase: "2", status: "mixed",
    setting: "Relapsed or refractory aggressive adult T-cell leukaemia/lymphoma (acute, lymphoma and chronic types) in the United States, Europe and Latin America: mogamulizumab against investigator's choice of chemotherapy, randomised 2:1",
    sponsor: "Kyowa Kirin, Inc.", started: "2012-06", yearReported: 2019, enrolled: 71,
    aka: ["0761-009", "Phillips 2019"],
    tldr: "Outside Japan, mogamulizumab produced confirmed responses in about one in ten people with relapsed adult T-cell leukaemia, more than chemotherapy did but far fewer than the Japanese study had suggested.",
    summary: "A randomised trial of mogamulizumab in adult T-cell leukaemia/lymphoma outside Japan, at centres in Belgium, Brazil, France, Martinique, Peru, the United Kingdom and the United States. Patients with relapsed or refractory aggressive disease, stratified by subtype, were randomised 2:1 to mogamulizumab 1.0 mg/kg weekly for four weeks and then every two weeks (47 patients) or to the investigator's choice of chemotherapy (24). The primary endpoint was overall response confirmed on a second assessment eight weeks later by blinded independent review.\n\nConfirmed overall response was 11 per cent (95 per cent confidence interval 4 to 23) with mogamulizumab and 0 per cent (0 to 14) with chemotherapy; best response was 28 and 8 per cent. The hazard ratio for progression-free survival was 0.71 (0.41 to 1.21), and 0.57 (0.337 to 0.983) after a post hoc adjustment for an imbalance in performance status. The commonest grade 3 or worse treatment-related adverse events with mogamulizumab were infusion-related reaction and thrombocytopenia, 9 per cent each.",
    result: "Confirmed overall response 11 per cent with mogamulizumab against 0 per cent with chemotherapy; progression-free survival hazard ratio 0.71 (0.57 after a post hoc adjustment).",
    outcomes: [
      { endpoint: "Confirmed overall response rate (blinded independent review)", primary: true, unit: "%", arms: [{ name: "Mogamulizumab", n: 47, value: 11, note: "95 per cent confidence interval 4 to 23" }, { name: "Investigator's choice of chemotherapy", n: 24, value: 0, note: "95 per cent confidence interval 0 to 14" }], source: "https://doi.org/10.3324/haematol.2018.205096" },
      { endpoint: "Progression-free survival", arms: [{ name: "Mogamulizumab", n: 47 }, { name: "Investigator's choice of chemotherapy", n: 24 }], hr: 0.71, ci: [0.41, 1.21], source: "https://doi.org/10.3324/haematol.2018.205096" },
    ],
    replication: "Its response rate is well below the 50 per cent of the earlier Japanese single-arm study. The authors name the differences: the Japanese study took relapsed but not refractory disease and checked that a response had lasted after four weeks rather than eight, and their own patients were older, with worse performance status and more bone marrow involvement.",
    cancers: [EX.atll, CX.ptcl], drugs: ["mogamulizumab"], targets: ["ccr4"], technologies: ["monoclonal-antibody"], sections: ["immunotherapy"],
    companies: ["kyowa-kirin"], terms: ["orr", "lymphoma-htlv-1"], trials: ["mogamulizumab-atll-phase-2-japan"],
    keyPapers: ["paper-mogamulizumab-vs-investigator-choice-atll-haematologica-2019"],
    links: [ct("NCT01626664"), doi("10.3324/haematol.2018.205096", "Haematologica 2019")] }),

  trial({ id: "ds-3201b-atll-phase-2", name: "EZH1 and EZH2 inhibitor DS-3201b in relapsed adult T-cell leukaemia/lymphoma", nct: "NCT04102150", phase: "2", status: "positive",
    setting: "Relapsed or refractory aggressive adult T-cell leukaemia/lymphoma (acute, lymphoma and unfavourable chronic types): valemetostat, an EZH2 and EZH1 inhibitor, 200 mg daily by mouth",
    sponsor: "Daiichi Sankyo Co., Ltd.", started: "2019-11-21", startedType: "actual", yearReported: 2023, enrolled: 25,
    aka: ["DS-3201b in ATL", "Izutsu 2023"],
    tldr: "A tablet that blocks two enzymes controlling which genes are switched on shrank the disease in about half of people with relapsed adult T-cell leukaemia, nearly all of whom had already had mogamulizumab.",
    summary: "A multicentre single-arm phase 2 study in Japan of valemetostat, an oral inhibitor of the histone methyltransferases EZH2 and EZH1, in relapsed or refractory aggressive adult T-cell leukaemia/lymphoma. The primary endpoint was overall response assessed centrally by an independent committee.\n\nTwenty-five patients were enrolled, median age 69, with a median of three prior lines; 24 had already received mogamulizumab. The overall response was 48.0 per cent (90 per cent confidence interval 30.5 to 65.9), five complete and seven partial remissions, and 45.8 per cent in those previously treated with mogamulizumab. The median duration of response had not been reached. Adverse events in at least 20 per cent included thrombocytopenia, anaemia, hair loss, altered taste, neutropenia, lymphopenia, leukopenia, decreased appetite and fever. OnCo holds no drug record for valemetostat, so it is named here and not linked.",
    result: "Overall response 48.0 per cent (12 of 25) by central review, including after mogamulizumab.",
    outcomes: [
      { endpoint: "Overall response rate (independent central review)", primary: true, unit: "%", arms: [{ name: "Valemetostat", n: 25, value: 48, note: "90 per cent confidence interval 30.5 to 65.9; 5 complete and 7 partial remissions" }], source: "https://doi.org/10.1182/blood.2022016862" },
    ],
    replication: "Single arm; no randomised comparison.",
    cancers: [EX.atll, CX.ptcl], targets: ["ezh2"], technologies: ["epigenetic-drugs"], sections: ["epigenetics"],
    companies: ["daiichi-sankyo"], terms: ["orr", "lymphoma-htlv-1"], trials: ["mogamulizumab-atll-phase-2-japan"],
    keyPapers: ["paper-izutsu-ezh1-ezh2-inhibitor-atll-blood-2023"],
    links: [ct("NCT04102150"), doi("10.1182/blood.2022016862", "Blood 2023")] }),
];

const atllPapers: PaperInput[] = [
  paper({ id: "paper-mogamulizumab-relapsed-atll-phase-2-jco-2012",
    name: "Defucosylated anti-CCR4 monoclonal antibody (KW-0761) for relapsed adult T-cell leukemia-lymphoma: a multicenter phase II study",
    aka: ["Ishida 2012", "KW-0761 phase 2"],
    tldr: "The Japanese study in which the anti-CCR4 antibody mogamulizumab produced a response in half of people with relapsed adult T-cell leukaemia/lymphoma.",
    summary: "A multicentre phase 2 study of KW-0761 (mogamulizumab), a humanised defucosylated anti-CCR4 antibody that enhances antibody-dependent cellular cytotoxicity, in relapsed aggressive CCR4-positive adult T-cell leukaemia-lymphoma. Patients received 1.0 mg/kg intravenously once a week for eight weeks. The primary endpoint was overall response; secondary endpoints were progression-free and overall survival from the first dose.",
    journal: "Journal of Clinical Oncology", year: 2012, doi: "10.1200/JCO.2011.37.3472", pmid: "22312108",
    authors: "Ishida T, Joh T, Uike N, et al.", paperType: "observational", participants: 28, changedPractice: true,
    findings: [
      "Of 28 patients enrolled, 27 received at least one infusion.",
      "Objective responses were seen in 13 of 26 evaluable patients, including eight complete responses: overall response 50 per cent (95 per cent confidence interval 30 to 70).",
      "Median progression-free survival was 5.2 months and median overall survival 13.7 months.",
      "The commonest adverse events were infusion reactions (89 per cent) and skin rashes (63 per cent), manageable and reversible in all cases.",
    ],
    whatItMeans: "The Japanese phase 2 evidence for mogamulizumab in relapsed disease; the 2019 international report records that the drug is approved in Japan for CCR4-positive adult T-cell leukaemia/lymphoma. The randomised study outside Japan later found a much lower confirmed response rate.",
    caveats: ["Single arm, 27 treated patients, all in Japan.", "Responses were assessed by criteria specific to this disease, so the rate is not directly comparable with other lymphomas."],
    links: [doi("10.1200/JCO.2011.37.3472", "Journal of Clinical Oncology 2012"), pubmed("22312108"), epmc("22312108")],
    cancers: [EX.atll], drugs: ["mogamulizumab"], targets: ["ccr4"], trials: ["mogamulizumab-atll-phase-2-japan"] }),

  paper({ id: "paper-mlsg15-mogamulizumab-atll-bjh-2015",
    name: "Dose-intensified chemotherapy alone or in combination with mogamulizumab in newly diagnosed aggressive adult T-cell leukaemia-lymphoma: a randomized phase II study",
    aka: ["Ishida 2015"],
    tldr: "Adding mogamulizumab to intensive chemotherapy for newly diagnosed adult T-cell leukaemia raised the complete remission rate from 33 to 52 per cent, with more side effects.",
    summary: "A multicentre randomised phase 2 study (NCT01173887) of mLSG15, a dose-intensified chemotherapy, with or without mogamulizumab in newly diagnosed aggressive adult T-cell leukaemia-lymphoma, assigned 1:1. The primary endpoint was the complete response rate; secondary endpoints included overall response and safety.",
    journal: "British Journal of Haematology", year: 2015, doi: "10.1111/bjh.13338", pmid: "25733162",
    authors: "Ishida T, Jo T, Takemoto S, et al.", paperType: "rct", participants: 53,
    findings: [
      "Complete response was 52 per cent (95 per cent confidence interval 33 to 71) with mLSG15 plus mogamulizumab (29 patients) and 33 per cent (16 to 55) with mLSG15 alone (24 patients).",
      "Overall response was 86 and 75 per cent respectively.",
      "Grade 3 or worse anaemia, thrombocytopenia, lymphopenia, leucopenia and decreased appetite were at least 10 percentage points more frequent with the combination.",
      "Skin disorders, cytomegalovirus infection, fever, hyperglycaemia and interstitial lung disease were observed only in the combination arm.",
    ],
    whatItMeans: "The randomised evidence for adding mogamulizumab to first-line chemotherapy in aggressive adult T-cell leukaemia/lymphoma: more complete remissions and more toxicity. Survival was not a primary endpoint and is reported descriptively in the full text: median progression-free survival was 8.5 months with the combination against 6.3 months, and median overall survival was not reached in either arm, at a median follow-up of 413 and 502 days.",
    caveats: ["Phase 2 with 53 patients; complete response, not survival, was the endpoint.", "The registry records 44 enrolled; the report says 54 were enrolled and analyses the 53 who were treated."],
    links: [doi("10.1111/bjh.13338", "British Journal of Haematology 2015"), pubmed("25733162"), epmc("25733162")],
    cancers: [EX.atll], drugs: ["mogamulizumab"], targets: ["ccr4"], trials: ["mlsg15-mogamulizumab-atll", "jcog9801"] }),

  paper({ id: "paper-mogamulizumab-vs-investigator-choice-atll-haematologica-2019",
    name: "Mogamulizumab versus investigator's choice of chemotherapy regimen in relapsed/refractory adult T-cell leukemia/lymphoma",
    aka: ["Phillips 2019", "0761-009"],
    tldr: "The randomised trial of mogamulizumab outside Japan, in which confirmed responses were seen in 11 per cent of people with relapsed adult T-cell leukaemia/lymphoma against none with chemotherapy.",
    summary: "A randomised phase 2 study in the United States, Europe and Latin America of mogamulizumab against the investigator's choice of chemotherapy in relapsed or refractory aggressive adult T-cell leukaemia/lymphoma of the acute, lymphoma and chronic subtypes, randomised 2:1 with stratification by subtype. The primary endpoint was overall response confirmed on a later assessment at eight weeks by blinded independent review.",
    journal: "Haematologica", year: 2019, doi: "10.3324/haematol.2018.205096", pmid: "30573506",
    authors: "Phillips AA, Fields PA, Hermine O, et al.", paperType: "rct", participants: 71,
    findings: [
      "Confirmed overall response was 11 per cent (95 per cent confidence interval 4 to 23) with mogamulizumab (47 patients) and 0 per cent (0 to 14) with chemotherapy (24 patients).",
      "Best response was 28 and 8 per cent respectively.",
      "The hazard ratio for progression-free survival was 0.71 (0.41 to 1.21), and 0.57 (0.337 to 0.983) after a post hoc adjustment for an imbalance in performance status.",
      "The commonest grade 3 or worse treatment-related adverse events with mogamulizumab were infusion-related reaction and thrombocytopenia, 9 per cent each.",
    ],
    whatItMeans: "The evidence on mogamulizumab for the people with this disease who are treated in Europe and the Americas, a population the authors call more ethnically diverse than the Japanese one. It shows activity, with a confirmed response rate far below the Japanese figure.",
    caveats: ["Phase 2 with 71 patients.", "The adjusted progression-free survival estimate was a post hoc analysis; its lower confidence limit is 0.337 in the abstract and 0.327 in the full text.", "Patients could cross over to mogamulizumab on progression, and the authors report no apparent overall survival advantage or disadvantage."],
    links: [doi("10.3324/haematol.2018.205096", "Haematologica 2019"), pubmed("30573506"), epmc("30573506")],
    cancers: [EX.atll], drugs: ["mogamulizumab"], targets: ["ccr4"], trials: ["mogamulizumab-atll-0761-009"] }),

  paper({ id: "paper-izutsu-ezh1-ezh2-inhibitor-atll-blood-2023",
    name: "An open-label, single-arm phase 2 trial of valemetostat for relapsed or refractory adult T-cell leukemia/lymphoma",
    aka: ["Izutsu 2023"],
    tldr: "An oral drug blocking the enzymes EZH2 and EZH1 produced responses in 48 per cent of people with relapsed adult T-cell leukaemia/lymphoma, most of whom had already had mogamulizumab.",
    summary: "A multicentre phase 2 trial of valemetostat, an EZH2 and EZH1 inhibitor, 200 mg a day by mouth until progression or unacceptable toxicity, in relapsed or refractory aggressive adult T-cell leukaemia/lymphoma (acute, lymphoma and unfavourable chronic types). The primary endpoint was overall response assessed centrally by an independent efficacy assessment committee.",
    journal: "Blood", year: 2023, doi: "10.1182/blood.2022016862", pmid: "36150143",
    authors: "Izutsu K, Makita S, Nosaka K, et al.", paperType: "observational", participants: 25,
    findings: [
      "25 patients, median age 69, with a median of three prior lines; 24 had received mogamulizumab.",
      "Centrally reviewed overall response was 48.0 per cent (90 per cent confidence interval 30.5 to 65.9), with 5 complete and 7 partial remissions.",
      "In patients pretreated with mogamulizumab the overall response was 45.8 per cent.",
      "The median duration of response was not reached.",
    ],
    whatItMeans: "Activity after mogamulizumab, in a disease with few options at that point. Single-arm and small.",
    caveats: ["Single arm, 25 patients, all in Japan."],
    links: [doi("10.1182/blood.2022016862", "Blood 2023"), pubmed("36150143"), epmc("36150143")],
    cancers: [EX.atll], targets: ["ezh2"], trials: ["ds-3201b-atll-phase-2"] }),
];

// ======================= ANAPLASTIC LARGE CELL LYMPHOMA =======================
const alclTrials: TrialInput[] = [
  trial({ id: "brentuximab-salcl-phase-2", name: "Brentuximab vedotin phase 2 in relapsed systemic anaplastic large cell lymphoma (SG035-0004)", nct: "NCT00866047", phase: "2", status: "positive",
    setting: "Relapsed or refractory systemic anaplastic large cell lymphoma after at least one prior therapy: brentuximab vedotin 1.8 mg/kg every three weeks",
    sponsor: "Seagen Inc.", started: "2009-03", yearReported: 2012, enrolled: 58,
    aka: ["SG035-0004", "Pro 2012"],
    tldr: "An antibody-drug conjugate aimed at CD30 made the lymphoma shrink in 86 per cent of people with relapsed anaplastic large cell lymphoma, and disappear on scans in more than half.",
    summary: "Systemic anaplastic large cell lymphoma uniformly expresses CD30. Brentuximab vedotin is an antibody against CD30 joined to monomethyl auristatin E, a drug that disrupts microtubules. This multicentre phase 2 study gave it at 1.8 mg/kg intravenously every three weeks, as an outpatient infusion, to 58 patients with systemic ALCL that had come back after at least one treatment; the primary endpoint was objective response by independent central review.\n\nFifty patients (86 per cent) responded and 33 (57 per cent) had a complete remission. The median durations of response and of complete remission were 12.6 and 13.2 months. Grade 3 or 4 adverse events in at least 10 per cent were neutropenia (21 per cent), thrombocytopenia (14 per cent) and peripheral sensory neuropathy (12 per cent). The five-year report (Blood 2017) found no progressions beyond 40 months and eight patients, 14 per cent of those enrolled, in sustained remission with neither a transplant nor any further treatment. The drug was approved in the United States in 2011 for relapsed systemic ALCL, and ECHELON-2 later moved it to first line.",
    result: "Objective response 86 per cent and complete remission 57 per cent in 58 patients with relapsed systemic ALCL.",
    outcomes: [
      { endpoint: "Objective response rate (independent central review)", primary: true, unit: "%", arms: [{ name: "Brentuximab vedotin", n: 58, value: 86 }], source: "https://doi.org/10.1200/JCO.2011.38.0402" },
      { endpoint: "Complete remission rate", unit: "%", arms: [{ name: "Brentuximab vedotin", n: 58, value: 57 }], source: "https://doi.org/10.1200/JCO.2011.38.0402" },
    ],
    replication: "Not repeated in relapsed disease; the randomised ECHELON-2 then tested the drug in first line and lengthened survival.",
    cancers: [EX.alclPos, EX.alclNeg, CX.ptcl], drugs: ["brentuximab-vedotin"], targets: ["cd30"], technologies: ["adc"], sections: ["adcs"],
    companies: ["pfizer"], terms: ["orr", "complete-response"], trials: ["echelon-2"],
    keyPapers: ["paper-brentuximab-relapsed-salcl-phase-2-jco-2012", "paper-brentuximab-relapsed-salcl-five-year-blood-2017"],
    links: [ct("NCT00866047"), doi("10.1200/JCO.2011.38.0402", "Journal of Clinical Oncology 2012"), doi("10.1182/blood-2017-05-780049", "Blood 2017: five-year results")] }),

  trial({ id: "advl0912-crizotinib", name: "COG ADVL0912: crizotinib in children with ALK-driven tumours", nct: "NCT00939770", phase: "1/2", status: "positive",
    setting: "Children and young people with relapsed or refractory solid tumours or anaplastic large cell lymphoma; the reported cohorts were relapsed ALK-positive ALCL and metastatic or inoperable ALK-positive inflammatory myofibroblastic tumour, given crizotinib by mouth twice daily",
    sponsor: "Children's Oncology Group", started: "2009-09-21", startedType: "actual", yearReported: 2017, enrolled: 122,
    aka: ["ADVL0912", "Crizotinib in paediatric anaplastic large cell lymphoma", "Mossé 2017"],
    tldr: "A lung cancer drug that blocks ALK made relapsed ALK-positive lymphoma disappear on scans in most of the children who took it.",
    summary: "Fusions of the ALK gene drive most paediatric anaplastic large cell lymphomas and inflammatory myofibroblastic tumours. This Children's Oncology Group phase 1/2 study gave crizotinib, the ALK inhibitor developed for lung cancer, to children with relapsed or refractory solid tumours or ALCL; the registry records 122 participants across all its cohorts. The 2017 report covers 26 patients with relapsed or refractory ALK-positive ALCL and 14 with metastatic or inoperable ALK-positive inflammatory myofibroblastic tumour.\n\nIn ALCL the overall response was 83 per cent at 165 mg/m2 and 90 per cent at 280 mg/m2, with complete responses in five of six and 16 of 20. The median duration of therapy was 2.79 and 0.4 years, and 12 patients stopped protocol therapy to proceed to transplant. The commonest drug-related adverse event was a fall in the neutrophil count, in 33 and 70 per cent of the two ALCL dose groups. Levels of the NPM-ALK fusion transcript in the blood fell during treatment in most patients with ALCL.",
    result: "In relapsed ALK-positive ALCL, overall response 83 and 90 per cent at the two doses, with complete responses in 21 of 26.",
    outcomes: [
      { endpoint: "Overall response rate, ALK-positive ALCL", primary: true, unit: "%", arms: [{ name: "Crizotinib 165 mg/m2", n: 6, value: 83 }, { name: "Crizotinib 280 mg/m2", n: 20, value: 90 }], source: "https://doi.org/10.1200/JCO.2017.73.4830" },
      { endpoint: "Overall response rate, ALK-positive inflammatory myofibroblastic tumour", unit: "%", arms: [{ name: "Crizotinib 100 to 280 mg/m2", n: 14, value: 86 }], source: "https://doi.org/10.1200/JCO.2017.73.4830" },
    ],
    replication: "Single-arm; no randomised comparison in ALCL.",
    cancers: [EX.alclPos, EX.imt, CX.ptcl], drugs: ["crizotinib"], targets: ["alk"], technologies: ["kinase-inhibitors"], sections: ["targeted-therapy"],
    companies: ["childrens-oncology-group"], terms: ["orr", "complete-response"],
    keyPapers: ["paper-crizotinib-paediatric-alcl-imt-jco-2017"],
    links: [ct("NCT00939770"), doi("10.1200/JCO.2017.73.4830", "Journal of Clinical Oncology 2017")] }),
];

const alclPapers: PaperInput[] = [
  paper({ id: "paper-brentuximab-relapsed-salcl-phase-2-jco-2012",
    name: "Brentuximab vedotin (SGN-35) in patients with relapsed or refractory systemic anaplastic large-cell lymphoma: results of a phase II study",
    aka: ["Pro 2012", "SG035-0004"],
    tldr: "The study in which brentuximab vedotin made relapsed systemic anaplastic large cell lymphoma shrink in 86 per cent of patients and disappear on scans in 57 per cent.",
    summary: "A multicentre phase 2 trial of brentuximab vedotin 1.8 mg/kg intravenously every three weeks over 30 minutes, as an outpatient infusion, in patients with systemic anaplastic large cell lymphoma recurring after at least one prior therapy. The primary endpoint was overall objective response by independent central review.",
    journal: "Journal of Clinical Oncology", year: 2012, doi: "10.1200/JCO.2011.38.0402", pmid: "22614995",
    authors: "Pro B, Advani R, Brice P, et al.", paperType: "observational", participants: 58, changedPractice: true,
    findings: [
      "Of 58 patients, 50 (86 per cent) had an objective response: 33 (57 per cent) complete and 17 (29 per cent) partial.",
      "The median durations of overall response and of complete remission were 12.6 and 13.2 months.",
      "Grade 3 or 4 adverse events in at least 10 per cent were neutropenia (21 per cent), thrombocytopenia (14 per cent) and peripheral sensory neuropathy (12 per cent).",
    ],
    whatItMeans: "The evidence behind the statement on both ALCL pages that brentuximab vedotin is highly active at relapse, and the step that led to ECHELON-2 and first-line use.",
    caveats: ["Single arm, 58 patients.", "ALK-positive and ALK-negative disease were both included; the response rates by ALK status are in the paper, not the abstract."],
    links: [doi("10.1200/JCO.2011.38.0402", "Journal of Clinical Oncology 2012"), pubmed("22614995"), epmc("22614995")],
    cancers: [EX.alclPos, EX.alclNeg], drugs: ["brentuximab-vedotin"], targets: ["cd30"], trials: ["brentuximab-salcl-phase-2"] }),

  paper({ id: "paper-brentuximab-relapsed-salcl-five-year-blood-2017",
    name: "Five-year results of brentuximab vedotin in patients with relapsed or refractory systemic anaplastic large cell lymphoma",
    aka: ["Pro 2017"],
    tldr: "Six years after brentuximab vedotin for relapsed anaplastic large cell lymphoma, no one in the study had progressed after 40 months, and one in seven was still in remission with no further treatment of any kind.",
    summary: "The final report of the pivotal phase 2 study (NCT00866047) of brentuximab vedotin in relapsed or refractory systemic anaplastic large cell lymphoma, after a median observation of about six years from first treatment, on the durability of remission, progression-free and overall survival, and safety in all 58 enrolled patients.",
    journal: "Blood", year: 2017, doi: "10.1182/blood-2017-05-780049", pmid: "28974506",
    authors: "Pro B, Advani R, Brice P, et al.", paperType: "observational", participants: 58,
    findings: [
      "No progressions were observed beyond 40 months, and median overall survival was not reached.",
      "38 of 58 patients (66 per cent) had a complete response by investigator assessment, and in them neither median overall nor median progression-free survival was reached.",
      "16 of the 38 complete responders went on to a consolidative stem cell transplant.",
      "8 patients, 14 per cent of those enrolled, remained in sustained remission without a transplant or any new anticancer therapy.",
      "33 patients had peripheral neuropathy; in 30 of them (91 per cent) it had resolved or improved at the last assessment.",
    ],
    whatItMeans: "The authors conclude that single-agent brentuximab vedotin may be a potentially curative treatment option for a subset of people with relapsed systemic ALCL. The evidence for that is eight patients in remission without further treatment, in a single-arm study.",
    caveats: ["Single arm; the complete response rate here is by investigator assessment (66 per cent), higher than the 57 per cent by independent review in the 2012 report.", "Eight patients in sustained remission without further treatment is a small number on which to rest the word curative, which the authors qualify with may be."],
    links: [doi("10.1182/blood-2017-05-780049", "Blood 2017"), pubmed("28974506"), epmc("28974506")],
    cancers: [EX.alclPos, EX.alclNeg], drugs: ["brentuximab-vedotin"], trials: ["brentuximab-salcl-phase-2"] }),

  paper({ id: "paper-crizotinib-paediatric-alcl-imt-jco-2017",
    name: "Targeting ALK With Crizotinib in Pediatric Anaplastic Large Cell Lymphoma and Inflammatory Myofibroblastic Tumor: A Children's Oncology Group Study",
    aka: ["Mossé 2017", "ADVL0912"],
    tldr: "Crizotinib produced responses in 83 to 90 per cent of children with relapsed ALK-positive anaplastic large cell lymphoma, most of them complete.",
    summary: "A Children's Oncology Group study of the ALK inhibitor crizotinib given by mouth twice daily to 26 patients with relapsed or refractory ALK-positive anaplastic large cell lymphoma and 14 with metastatic or inoperable ALK-positive inflammatory myofibroblastic tumour, with serial measurement of NPM-ALK fusion transcripts in ALCL.",
    journal: "Journal of Clinical Oncology", year: 2017, doi: "10.1200/JCO.2017.73.4830", pmid: "28787259",
    authors: "Mossé YP, Voss SD, Lim MS, et al.", paperType: "observational", participants: 40,
    findings: [
      "In ALCL, overall response was 83 per cent at 165 mg/m2 and 90 per cent at 280 mg/m2.",
      "Complete response was seen in five of six patients at 165 mg/m2 and 16 of 20 at 280 mg/m2.",
      "In inflammatory myofibroblastic tumour, overall response was 86 per cent and complete response 36 per cent (five of 14).",
      "Neutrophil count decrease was the commonest drug-related adverse event: 33 and 70 per cent in the two ALCL dose groups, 43 per cent in IMT.",
      "12 patients stopped protocol therapy to proceed to transplant.",
    ],
    whatItMeans: "The evidence behind the statement on the ALK-positive ALCL page that ALK inhibitors produce responses and are used especially in children and young adults.",
    caveats: ["Single arm, 26 patients with ALCL.", "Children and young people only."],
    links: [doi("10.1200/JCO.2017.73.4830", "Journal of Clinical Oncology 2017"), pubmed("28787259"), epmc("28787259")],
    cancers: [EX.alclPos, EX.imt], drugs: ["crizotinib"], targets: ["alk"], trials: ["advl0912-crizotinib"] }),
];

// ======================= HIGH-GRADE B-CELL LYMPHOMA WITH MYC REARRANGEMENT =======================
const hgblTrials: TrialInput[] = [
  trial({ id: "nci-da-epoch-r-myc-burkitt", name: "NCI dose-adjusted EPOCH-R in Burkitt and MYC-rearranged large B-cell lymphoma", nct: "NCT01092182", phase: "2", status: "positive",
    setting: "Untreated Burkitt lymphoma, MYC-rearranged diffuse large B-cell lymphoma and plasmablastic lymphoma: dose-adjusted EPOCH-R with CNS prophylaxis",
    sponsor: "National Cancer Institute (NCI)", started: "2010-03-25", startedType: "actual", yearReported: 2018, enrolled: 194,
    aka: ["DA-EPOCH-R in MYC-rearranged lymphoma", "Dunleavy 2018"],
    tldr: "A single-arm study gave an intensive infusional chemotherapy to people with aggressive B-cell lymphoma carrying a MYC rearrangement, including double-hit disease, and about seven in ten were alive and free of events four years later.",
    summary: "Retrospective series had suggested that aggressive B-cell lymphomas with a MYC rearrangement, alone or with a BCL2 or BCL6 rearrangement, do worse with R-CHOP than without one. This NCI-sponsored phase 2 study gave dose-adjusted EPOCH-R (etoposide, prednisone, vincristine, cyclophosphamide, doxorubicin and rituximab), with CNS prophylaxis, for six cycles. The registry lists Burkitt lymphoma, MYC-positive diffuse large B-cell lymphoma and plasmablastic lymphoma among its conditions and 194 participants in total.\n\nThe final analysis of the MYC-rearranged large B-cell cohort (Lancet Haematology 2018) covers 53 patients, median age 61, 81 per cent with stage III or IV disease; 19 had a MYC rearrangement alone and 24 also had a BCL2 or BCL6 rearrangement, or both. After a median follow-up of 55.6 months, 48-month event-free survival was 71.0 per cent and overall survival 76.7 per cent. Grade 4 neutropenia occurred in 53 per cent of cycles and there were three treatment-related deaths, all from infection. The authors concluded the regimen should be considered for these diseases.\n\nIt is single-arm. The randomised CALGB 50303 found no advantage for the same regimen over R-CHOP in unselected diffuse large B-cell lymphoma. A randomised trial in double-hit lymphoma has since reported: the phase 2 part of Alliance A051701 (Lancet Haematology 2026) randomised 73 patients to this regimen with or without venetoclax and closed early because of deaths on treatment, six with venetoclax against one without. Progression-free survival did not differ (hazard ratio 1.13, 95 per cent confidence interval 0.53 to 2.37) and two-year overall survival was 52 per cent with venetoclax against 72 per cent without. That trial did not compare the regimen with R-CHOP, and no randomised comparison of the two confined to this group was found in the registry on 17 November 2026.",
    result: "In 53 patients with MYC-rearranged aggressive B-cell lymphoma, 48-month event-free survival 71.0 per cent and overall survival 76.7 per cent.",
    outcomes: [
      { endpoint: "Event-free survival at 48 months", primary: true, unit: "%", arms: [{ name: "DA-EPOCH-R, MYC-rearranged cohort", n: 53, value: 71, note: "95 per cent confidence interval 56.5 to 81.4" }], source: "https://doi.org/10.1016/S2352-3026(18)30177-7" },
      { endpoint: "Overall survival at 48 months", primary: true, unit: "%", arms: [{ name: "DA-EPOCH-R, MYC-rearranged cohort", n: 53, value: 76.7, note: "95 per cent confidence interval 62.6 to 86.1" }], source: "https://doi.org/10.1016/S2352-3026(18)30177-7" },
    ],
    replication: "Single arm. The randomised CALGB 50303 found no benefit for the same regimen in unselected diffuse large B-cell lymphoma. In the randomised Alliance A051701 phase 2 in double-hit lymphoma, the 30 analysed patients given the regimen without venetoclax had a median progression-free survival of 28.4 months and two-year overall survival of 72 per cent.",
    cancers: [EX.hgbl, CX.dlbcl, CX.burkitt, EX.plasmablastic, CX.nhl],
    drugs: ["rituximab", "etoposide", "prednisone", "vincristine", "cyclophosphamide", "doxorubicin"],
    targets: ["myc-gene", "bcl2"], technologies: ["cytotoxic-chemotherapy"], sections: ["chemotherapy"],
    institutions: ["nci"], terms: ["double-hit-lymphoma", "lymphoma-tx-cns-prophylaxis", "lymphoma-tx-regimen-alphabet"], trials: ["calgb-50303"],
    keyPapers: ["paper-da-epoch-r-myc-rearranged-lymphoma-lancet-haematol-2018"],
    links: [ct("NCT01092182"), doi("10.1016/S2352-3026(18)30177-7", "Lancet Haematology 2018"), doi("10.1016/S2352-3026(26)00191-2", "Lancet Haematology 2026: Alliance A051701, venetoclax added in double-hit lymphoma"), ct("NCT03984448")] }),
];

const hgblPapers: PaperInput[] = [
  paper({ id: "paper-da-epoch-r-myc-rearranged-lymphoma-lancet-haematol-2018",
    name: "Dose-adjusted EPOCH-R (etoposide, prednisone, vincristine, cyclophosphamide, doxorubicin, and rituximab) in untreated aggressive diffuse large B-cell lymphoma with MYC rearrangement: a prospective, multicentre, single-arm phase 2 study",
    aka: ["Dunleavy 2018"],
    tldr: "In a single-arm study of 53 people with MYC-rearranged aggressive B-cell lymphoma, including double-hit disease, intensive infusional chemotherapy left 71 per cent alive and free of events at four years.",
    summary: "The final analysis of a prospective multicentre single-arm phase 2 study (NCT01092182) of dose-adjusted EPOCH-R, given with CNS prophylaxis for six cycles, in untreated aggressive B-cell lymphoma with MYC rearrangement. Primary endpoints included event-free and overall survival. The background the authors give: MYC rearrangement is present in about 10 per cent of aggressive B-cell lymphomas, half of which also carry a BCL2 rearrangement.",
    journal: "Lancet Haematology", year: 2018, doi: "10.1016/S2352-3026(18)30177-7", pmid: "30501868",
    authors: "Dunleavy K, Fanale MA, Abramson JS, et al.", paperType: "observational", participants: 53,
    findings: [
      "53 patients, median age 61; 43 (81 per cent) had stage III or IV disease and 26 (49 per cent) a high-intermediate or high IPI.",
      "19 had a MYC rearrangement alone and 24 also a rearrangement of BCL2, BCL6 or both.",
      "At a median follow-up of 55.6 months, 48-month event-free survival was 71.0 per cent (95 per cent confidence interval 56.5 to 81.4) and overall survival 76.7 per cent (62.6 to 86.1).",
      "Grade 4 neutropenia occurred in 160 of 301 cycles (53 per cent) and fever with neutropenia in 56 (19 per cent); there were three treatment-related deaths, all from infection.",
    ],
    whatItMeans: "Prospective, single-arm evidence for treating MYC-rearranged and double-hit large B-cell lymphoma more intensively than with R-CHOP. It has no control arm. A randomised trial in double-hit lymphoma reported in 2026, Alliance A051701: adding venetoclax to this regimen did not lengthen progression-free survival (hazard ratio 1.13, 95 per cent confidence interval 0.53 to 2.37) and caused more deaths on treatment, six against one, so that part of the trial closed early. It did not compare the regimen with R-CHOP.",
    caveats: ["Single arm, 53 patients; the comparison with R-CHOP is with retrospective series.", "Sponsored by the NCI, where the regimen was developed.", "The randomised CALGB 50303 found no advantage for the same regimen in unselected diffuse large B-cell lymphoma."],
    links: [doi("10.1016/S2352-3026(18)30177-7", "Lancet Haematology 2018"), pubmed("30501868"), epmc("30501868"), doi("10.1016/S2352-3026(26)00191-2", "Lancet Haematology 2026: Alliance A051701, venetoclax added in double-hit lymphoma")],
    cancers: [EX.hgbl, CX.dlbcl], drugs: ["rituximab", "etoposide", "prednisone", "vincristine", "cyclophosphamide", "doxorubicin"],
    targets: ["myc-gene", "bcl2"], terms: ["double-hit-lymphoma"], trials: ["nci-da-epoch-r-myc-burkitt", "calgb-50303"] }),
];

export const lymphomaEntityTrials: TrialInput[] = [...enktlTrials, ...atllTrials, ...alclTrials, ...hgblTrials];
export const lymphomaEntityPapers: PaperInput[] = [...enktlPapers, ...atllPapers, ...alclPapers, ...hgblPapers];

/**
 * Records other files own, attached to the entity pages they concern. Each was read before it was linked: the
 * trial's registry title or setting, or the paper's title and abstract, names the disease.
 */
const C = (id: string, cancers: string[]): SpikeSupplement => ({ id, cancers });
const entitySupplements: SpikeSupplement[] = [
  // ECHELON-2: about 70 per cent of its 452 patients had systemic ALCL, and both ALCL pages' first-line rows rest on it.
  C("echelon-2", [EX.alclPos, EX.alclNeg]),
  // ALCANZA randomised CD30-positive mycosis fungoides and primary cutaneous ALCL.
  C("alcanza", [EX.mf, EX.pcalcl]),
  C("paper-alcanza-brentuximab-vedotin-lancet-2017", [EX.mf, EX.pcalcl]),
  // MAVORIC randomised mycosis fungoides and Sezary syndrome.
  C("mavoric", [EX.mf, "sezary-syndrome"]),
  C("paper-mavoric-mogamulizumab-lancet-oncol-2018", [EX.mf, "sezary-syndrome"]),
  // Study 201: chlormethine gel in mycosis fungoides.
  C("study-201", [EX.mf]),
  C("paper-study-201-jama-dermatol-2013", [EX.mf]),
  // The ISCL/EORTC staging revision for mycosis fungoides and Sezary syndrome.
  C("paper-olsen-mycosis-fungoides-staging-blood-2007", [EX.mf, "sezary-syndrome"]),
  // Kim 2015: brentuximab vedotin in mycosis fungoides and Sezary syndrome (the record's text is corrected at its owner).
  C("paper-cd30-hodgkin-lymphoma-j-clin-oncol-2015", [EX.mf, "sezary-syndrome", "cutaneous-t-cell-lymphoma"]),
  // Registry records whose titles name the disease.
  C("nct02448381", [EX.mf]), // FLASH: synthetic hypericin for mycosis fungoides
  C("nct01686594", [EX.mf]), // PUVA maintenance in mycosis fungoides
  C("nct02953301", [EX.mf, "sezary-syndrome"]), // resminostat maintenance in advanced mycosis fungoides and Sezary syndrome
  C("nct04930653", [EX.mf, "sezary-syndrome"]), // photopheresis and mogamulizumab; conditions name both
  C("nct04414163", [EX.enktl]), // IMC-001 in relapsed extranodal NK/T-cell lymphoma, nasal type
  C("nct05627856", [EX.enktl, "angioimmunoblastic-t-cell-lymphoma"]), // GNC-038 in NK/T-cell lymphoma, AITL and other NHL
  C("nct07075328", [EX.atll, CX.ptcl]), // OJP-001 in adult T-cell leukaemia/lymphoma
  C("nct06561048", [EX.alclPos, EX.alclNeg, "angioimmunoblastic-t-cell-lymphoma"]), // soquelitinib: PTCL-NOS, follicular helper T-cell lymphomas or systemic ALCL
  C("nct05263583", [EX.hgbl]), // sepantronium in MYC-rearranged high-grade B-cell lymphoma
  // The open question on randomised evidence for T-cell lymphomas names both diseases.
  C("lymphoma-ev-randomised-evidence-for-the-t-cell-lymphomas", [EX.enktl, EX.atll]),
];

const ENKTL_TRIALS = ["smile-enktl", "ddgp-vs-smile-enktl", "orient-4"];
const ATLL_TRIALS = ["jcog9801", "mogamulizumab-atll-phase-2-japan", "mlsg15-mogamulizumab-atll", "mogamulizumab-atll-0761-009", "ds-3201b-atll-phase-2"];

export const lymphomaEntityEvidenceSpike: Spike = {
  cancerId: EX.enktl,
  entities: [...lymphomaEntityTrials, ...lymphomaEntityPapers],
  patch: {
    trials: ENKTL_TRIALS,
    keyPapers: ["paper-smile-chemotherapy-nk-t-cell-lymphoma-jco-2011", "paper-ddgp-vs-smile-nk-t-cell-lymphoma-jama-oncol-2022", "paper-jcog0211-chemoradiotherapy-nasal-nk-t-cell-lymphoma-jco-2009", "paper-orient-4-sintilimab-nk-t-cell-lymphoma-2021"],
    drugs: ["sintilimab", "cisplatin"],
  },
  supplements: entitySupplements,
};
export const atllEvidenceSpike: Spike = {
  cancerId: EX.atll, entities: [],
  patch: {
    trials: ATLL_TRIALS,
    keyPapers: ["paper-jcog9801-vcap-amp-vecp-adult-t-cell-leukaemia-jco-2007", "paper-mogamulizumab-relapsed-atll-phase-2-jco-2012", "paper-mlsg15-mogamulizumab-atll-bjh-2015", "paper-mogamulizumab-vs-investigator-choice-atll-haematologica-2019", "paper-izutsu-ezh1-ezh2-inhibitor-atll-blood-2023", "paper-hinuma-adult-t-cell-leukaemia-antigen-pnas-1981"],
  },
};
export const alclPositiveEvidenceSpike: Spike = {
  cancerId: EX.alclPos, entities: [],
  patch: {
    trials: ["echelon-2", "brentuximab-salcl-phase-2", "advl0912-crizotinib"],
    keyPapers: ["paper-brentuximab-relapsed-salcl-phase-2-jco-2012", "paper-crizotinib-paediatric-alcl-imt-jco-2017"],
    drugs: ["crizotinib"],
  },
};
export const alclNegativeEvidenceSpike: Spike = {
  cancerId: EX.alclNeg, entities: [],
  patch: { trials: ["echelon-2", "brentuximab-salcl-phase-2"], keyPapers: ["paper-brentuximab-relapsed-salcl-phase-2-jco-2012"] },
};
export const hgblEvidenceSpike: Spike = {
  cancerId: EX.hgbl, entities: [],
  patch: { trials: ["nci-da-epoch-r-myc-burkitt", "calgb-50303"], keyPapers: ["paper-da-epoch-r-myc-rearranged-lymphoma-lancet-haematol-2018"] },
};
export const mycosisFungoidesEvidenceSpike: Spike = {
  cancerId: EX.mf, entities: [],
  patch: { trials: ["alcanza", "mavoric", "study-201"], keyPapers: ["paper-alcanza-brentuximab-vedotin-lancet-2017", "paper-mavoric-mogamulizumab-lancet-oncol-2018", "paper-olsen-mycosis-fungoides-staging-blood-2007"] },
};

export default lymphomaEntityEvidenceSpike;
