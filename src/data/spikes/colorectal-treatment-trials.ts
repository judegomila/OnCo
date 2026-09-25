import type { TrialInput } from "@/lib/schema";
import { CRC, SRC, ct, doi, t } from "./colorectal-treatment-shared";

/**
 * COLORECTAL CANCER: the trials that set the standard of care, hand-written with their published numbers.
 * Every record quotes the endpoint, the arms and the figures from the primary paper (read through Europe PMC on
 * 2026-09-24) and links the ClinicalTrials.gov entry. Records already in the corpus are extended by supplement in
 * ./colorectal-treatment.ts rather than repeated here: KEYNOTE-177, CheckMate 8HW, NICHE-2, ATOMIC, AZUR-1,
 * BREAKWATER, PARADIGM, CRYSTAL & FIRE-3, MOUNTAINEER, DESTINY-CRC02, SUNLIGHT, FRESCO-2, CIRCULATE-Japan
 * (./colorectal.ts), OPRA, PROSPECT and BEACON CRC (../colorectal-lymphoma-subtypes.ts), RAPIDO and PRODIGE 23
 * (../radiation-wave4.ts), CodeBreaK 300 and DYNAMIC (../trials.ts), BESPOKE CRC, CIRCULATE-US and TRACC
 * (../ctdna-roadmap.ts), NordICC (../tests.ts), CHALLENGE (../nutrition.ts), KRYSTAL-10 (`nct04793958`),
 * AZUR-2 (`nct05855200`) and CodeBreaK 301 (`nct06252649`).
 */

// ======================= EARLY DISEASE: ADJUVANT AND NEOADJUVANT =======================
export const colorectalTrialsEarly: TrialInput[] = [
  t({ id: "mosaic", name: "MOSAIC", aka: ["Multicenter International Study of Oxaliplatin/5-FU-LV in the Adjuvant Treatment of Colon Cancer"], nct: "NCT00275210", phase: "3", status: "positive", yearReported: 2004, sponsor: "Sanofi", enrolled: 2246,
    setting: "Stage II or III colon cancer after curative resection: FOLFOX4 for six months against fluorouracil and leucovorin alone",
    tldr: "The trial that put oxaliplatin into chemotherapy after bowel cancer surgery. It cut recurrences by a fifth and, in stage III disease, lengthened life.",
    summary: "MOSAIC randomised 2,246 patients who had undergone curative resection for stage II or III colon cancer to six months of fluorouracil and leucovorin with or without oxaliplatin. Disease-free survival at three years was 78.2 against 72.9 percent (hazard ratio 0.77, p=0.002). At six years overall survival was 78.5 against 76.0 percent (hazard ratio 0.84, p=0.046); the gain was confined to stage III disease (72.9 against 68.7 percent, hazard ratio 0.80, p=0.023) with no difference in stage II. Grade 3 sensory neuropathy affected 12.4 percent during treatment and 1.1 percent at one year, and this cumulative neurotoxicity is what the IDEA duration question later tried to avoid. MOSAIC is the reason adjuvant FOLFOX or CAPOX is offered for stage III colon cancer and the reason stage II disease is treated only when risk factors are present.",
    result: "Three-year disease-free survival 78.2 against 72.9 percent (hazard ratio 0.77); six-year overall survival benefit in stage III only.",
    outcomes: [
      { endpoint: "Disease-free survival at 3 years", primary: true, unit: "percent", arms: [{ name: "FOLFOX4", n: 1123, value: 78.2 }, { name: "Fluorouracil and leucovorin", n: 1123, value: 72.9 }], hr: 0.77, p: "0.002", source: SRC.mosaic },
      { endpoint: "Overall survival at 6 years (stage III)", unit: "percent", arms: [{ name: "FOLFOX4", value: 72.9 }, { name: "Fluorouracil and leucovorin", value: 68.7 }], hr: 0.80, p: "0.023", source: SRC.mosaic6y },
    ],
    replication: "Confirmed by NSABP C-07 and, for capecitabine plus oxaliplatin, by NO16968/XELOXA; the duration was later shortened for low-risk disease by the IDEA collaboration.",
    drugs: ["folfox", "oxaliplatin", "fluorouracil", "leucovorin"], cancers: [CRC, "colon-cancer"], technologies: ["cytotoxic-chemotherapy", "platinum"], companies: ["sanofi"], terms: ["neoadjuvant-adjuvant"],
    links: [ct("NCT00275210"), doi("MOSAIC: oxaliplatin, fluorouracil and leucovorin as adjuvant treatment for colon cancer (New England Journal of Medicine 2004)", "10.1056/NEJMoa032709"), doi("MOSAIC six-year overall survival (Journal of Clinical Oncology 2009)", "10.1200/JCO.2008.20.6771")] }),

  t({ id: "idea-collaboration", name: "IDEA collaboration", aka: ["International Duration Evaluation of Adjuvant chemotherapy", "IDEA"], phase: "3", status: "mixed", yearReported: 2018, sponsor: "Six concurrent trial groups (SCOT, TOSCA, IDEA France, CALGB/SWOG 80702, ACHIEVE, HORG)", enrolled: 12834, enrolledBasis: "analysed", enrolledNote: "A prospective pooled analysis of six randomised trials rather than a single registration; 12,834 patients were analysed after 3,263 events.",
    setting: "Stage III colon cancer after resection: three months of adjuvant FOLFOX or CAPOX against six months, pooled across six trials",
    tldr: "Six national trials pooled their results to ask whether three months of chemotherapy after bowel cancer surgery is as good as six. For low-risk disease it is, and it causes far less nerve damage.",
    summary: "IDEA was a prospective, preplanned pooled analysis of six concurrent phase 3 non-inferiority trials in resected stage III colon cancer. Across 12,834 patients and 3,263 events the non-inferiority of three months was not confirmed overall (hazard ratio 1.07, 95% CI 1.00 to 1.15 against a margin of 1.12), but it held for CAPOX (0.95, 0.85 to 1.06) and not for FOLFOX (1.16, 1.06 to 1.26). In the exploratory low-risk group (T1 to T3 and N1) three-year disease-free survival was 83.1 against 83.3 percent (hazard ratio 1.01); in T4 or N2 disease six months was better. Grade 2 or worse neuropathy roughly halves with the shorter course. The result is the two-tier recommendation in every guideline: three months of CAPOX for low-risk stage III, six months of FOLFOX or CAPOX for T4 or N2 disease.",
    result: "Three months non-inferior to six for CAPOX and for low-risk (T1-3 N1) disease; six months better for T4 or N2.",
    outcomes: [
      { endpoint: "Disease-free survival at 3 years (overall)", primary: true, unit: "hazard ratio", arms: [{ name: "3 months", value: 1.07, note: "non-inferiority not confirmed" }, { name: "6 months", value: 1 }], hr: 1.07, ci: [1.00, 1.15], source: SRC.idea },
      { endpoint: "Disease-free survival at 3 years (T1-3 N1)", unit: "percent", arms: [{ name: "3 months", value: 83.1 }, { name: "6 months", value: 83.3 }], hr: 1.01, ci: [0.90, 1.12], source: SRC.idea },
    ],
    drugs: ["folfox", "capox", "oxaliplatin", "capecitabine", "fluorouracil"], cancers: [CRC, "colon-cancer"], technologies: ["cytotoxic-chemotherapy", "platinum"], terms: ["neoadjuvant-adjuvant", "de-escalation"], trials: ["scot", "tosca", "mosaic"],
    links: [doi("IDEA: duration of adjuvant chemotherapy for stage III colon cancer (New England Journal of Medicine 2018)", "10.1056/NEJMoa1713709")] }),

  t({ id: "tosca", name: "TOSCA", aka: ["Three Or Six Colon Adjuvant"], nct: "NCT00646607", phase: "3", status: "mixed", yearReported: 2021, sponsor: "Gruppo Italiano per lo Studio dei Carcinomi dell'Apparato Digerente", enrolled: 3759, enrolledBasis: "randomised", enrolledNote: "The registry lists 3,756 participants; the Annals of Oncology report accrued 3,759 between June 2007 and March 2013.",
    setting: "Stage II or III colon cancer after resection: three months of FOLFOX4 or CAPOX against six months",
    tldr: "The Italian duration trial could not show that three months was as good as six, and it is the reason the pooled answer depends on which drug combination is used.",
    summary: "TOSCA accrued 3,759 patients with stage II or III colon cancer to three or six months of FOLFOX4 or CAPOX. At a median seven years the hazard ratio for relapse-free survival of three against six months was 1.13 (95% CI 0.99 to 1.29), crossing the prespecified non-inferiority limit of 1.20, so inferiority of the shorter arm could not be ruled out; the hazard ratio for overall survival was 1.09 (0.93 to 1.26, p=0.288 for superiority) with no significant difference between groups. TOSCA pulls against SCOT in the IDEA pooled analysis, and the difference between their regimen mixes, mostly CAPOX in SCOT and more FOLFOX in TOSCA, is part of why three months holds for CAPOX and not for FOLFOX.",
    result: "Relapse-free survival hazard ratio 1.13 for three against six months, crossing the non-inferiority limit; no overall survival difference.",
    outcomes: [{ endpoint: "Relapse-free survival", primary: true, unit: "hazard ratio", arms: [{ name: "3 months", value: 1.13 }, { name: "6 months", value: 1 }], hr: 1.13, ci: [0.99, 1.29], p: "0.380 for non-inferiority", source: SRC.tosca }],
    drugs: ["folfox", "capox", "oxaliplatin", "capecitabine"], cancers: [CRC, "colon-cancer"], technologies: ["cytotoxic-chemotherapy", "platinum"], terms: ["neoadjuvant-adjuvant"], trials: ["idea-collaboration", "scot"],
    links: [ct("NCT00646607"), doi("TOSCA: overall survival with 3 or 6 months of adjuvant chemotherapy (Annals of Oncology 2021)", "10.1016/j.annonc.2020.10.477")] }),

  t({ id: "petacc-8", name: "PETACC-8", nct: "NCT00265811", phase: "3", status: "negative", yearReported: 2014, sponsor: "Fédération Francophone de Cancérologie Digestive", enrolled: 2559,
    setting: "Resected stage III colon cancer: FOLFOX4 with or without cetuximab",
    tldr: "Adding the EGFR antibody cetuximab to chemotherapy after surgery did not help, even in patients whose tumours had no KRAS mutation.",
    summary: "PETACC-8 randomised 2,559 patients with resected stage III colon cancer in 340 European centres to FOLFOX4 with or without cetuximab. In the 1,602 patients with KRAS exon 2 wild-type tumours, disease-free survival was no different (hazard ratio 1.05, 95% CI 0.85 to 1.29, p=0.66), and there was no benefit in the KRAS exon 2 and BRAF wild-type subgroup either (0.99, 0.76 to 1.28). Grade 3 or 4 acne-like rash affected 27 percent of the cetuximab group. With N0147 reaching the same conclusion in North America, the two trials closed the question: anti-EGFR antibodies work in metastatic left-sided RAS wild-type disease and have no place in the adjuvant setting.",
    result: "No disease-free survival benefit from cetuximab in KRAS wild-type disease (hazard ratio 1.05).",
    outcomes: [{ endpoint: "Disease-free survival (KRAS exon 2 wild-type)", primary: true, unit: "hazard ratio", arms: [{ name: "FOLFOX4 plus cetuximab", n: 791, value: 1.05 }, { name: "FOLFOX4", n: 811, value: 1 }], hr: 1.05, ci: [0.85, 1.29], p: "0.66", source: SRC.petacc8 }],
    replication: "Same result as Alliance N0147 in North America.",
    drugs: ["cetuximab", "folfox", "oxaliplatin"], cancers: [CRC, "colon-cancer"], targets: ["egfr", "kras"], technologies: ["monoclonal-antibody", "cytotoxic-chemotherapy"], trials: ["n0147"],
    links: [ct("NCT00265811"), doi("PETACC-8: FOLFOX4 with or without cetuximab in resected stage III colon cancer (Lancet Oncology 2014)", "10.1016/S1470-2045(14)70227-X")] }),

  t({ id: "n0147", name: "Alliance N0147", aka: ["NCCTG N0147"], nct: "NCT00079274", phase: "3", status: "negative", yearReported: 2012, sponsor: "National Cancer Institute / Alliance for Clinical Trials in Oncology", enrolled: 3397,
    setting: "Resected stage III colon cancer: mFOLFOX6 with or without cetuximab, by KRAS status",
    tldr: "The North American version of the same question, with the same answer: cetuximab after surgery adds toxicity and no benefit.",
    summary: "N0147 randomised patients with resected stage III colon cancer to mFOLFOX6 with or without cetuximab. Three-year disease-free survival was 74.6 percent with chemotherapy alone against 71.5 percent with cetuximab added in KRAS wild-type disease (hazard ratio 1.21, 95% CI 0.98 to 1.49, p=0.08), and 67.1 against 65.0 percent in KRAS-mutant disease. Grade 3 or higher adverse events rose from 52.3 to 72.5 percent. No subgroup benefited. The trial also contributed the mismatch-repair and BRAF cohorts that later defined which stage III tumours are immunologically distinct, the biology that ATOMIC acted on thirteen years later.",
    result: "Three-year disease-free survival 71.5 with cetuximab against 74.6 percent without, in KRAS wild-type disease.",
    outcomes: [{ endpoint: "Disease-free survival at 3 years (KRAS wild-type)", primary: true, unit: "percent", arms: [{ name: "mFOLFOX6 plus cetuximab", value: 71.5 }, { name: "mFOLFOX6", value: 74.6 }], hr: 1.21, ci: [0.98, 1.49], p: "0.08", source: SRC.n0147 }],
    drugs: ["cetuximab", "folfox", "oxaliplatin", "irinotecan"], cancers: [CRC, "colon-cancer"], targets: ["egfr", "kras"], technologies: ["monoclonal-antibody", "cytotoxic-chemotherapy"], companies: ["alliance-oncology"], trials: ["petacc-8", "atomic"],
    links: [ct("NCT00079274"), doi("N0147: oxaliplatin, fluorouracil and leucovorin with or without cetuximab in resected stage III colon cancer (JAMA 2012)", "10.1001/jama.2012.385")] }),

];

// ======================= RECTAL CANCER =======================
export const colorectalTrialsRectal: TrialInput[] = [
  t({ id: "dutch-tme-trial", name: "Dutch TME trial", aka: ["CKVO 95-04"], phase: "3", status: "positive", yearReported: 2001, sponsor: "Dutch Colorectal Cancer Group", enrolled: 1861, enrolledBasis: "randomised", enrolledNote: "1,861 patients were randomised and 1,805 were eligible; the trial predates ClinicalTrials.gov.",
    setting: "Resectable rectal cancer: short-course preoperative radiotherapy (5 x 5 Gy) plus total mesorectal excision against total mesorectal excision alone",
    tldr: "The trial that proved a week of radiotherapy before rectal cancer surgery halves the chance of the cancer coming back in the pelvis, even when the operation is done properly.",
    summary: "The Dutch TME trial randomised 1,861 patients with resectable rectal cancer to 5 x 5 Gy preoperative radiotherapy followed by total mesorectal excision, or to total mesorectal excision alone, with surgical quality controlled by training and pathology review. Among the 1,748 who had a macroscopically complete local resection, local recurrence at two years was 2.4 percent with radiotherapy against 8.2 percent without. Two-year overall survival was the same (82.0 against 81.8 percent). The trial settled two questions at once: total mesorectal excision is the operation, and radiotherapy reduces local recurrence without lengthening life, so its use is a trade against long-term bowel and sexual function.",
    result: "Local recurrence at two years 2.4 against 8.2 percent; no survival difference.",
    outcomes: [{ endpoint: "Local recurrence at 2 years", primary: true, unit: "percent", arms: [{ name: "Radiotherapy plus TME", value: 2.4 }, { name: "TME alone", value: 8.2 }], source: SRC.dutchTme }],
    cancers: [CRC, "rectal-cancer"], technologies: ["imrt-igrt"], terms: ["neoadjuvant-adjuvant"], trials: ["stockholm-iii"],
    links: [doi("Dutch TME trial: preoperative radiotherapy combined with total mesorectal excision (New England Journal of Medicine 2001)", "10.1056/NEJMoa010580")] }),

  t({ id: "stockholm-iii", name: "Stockholm III", nct: "NCT00904813", phase: "3", status: "positive", yearReported: 2017, sponsor: "Karolinska Institutet", enrolled: 840,
    setting: "Resectable rectal cancer: 5 x 5 Gy with surgery within a week, 5 x 5 Gy with surgery after four to eight weeks, or 25 x 2 Gy with delayed surgery",
    tldr: "Waiting four to eight weeks after a short course of radiotherapy is as safe as operating immediately, and it gives time for the tumour to shrink.",
    summary: "Stockholm III randomised 840 patients from eighteen Swedish hospitals between short-course radiotherapy with immediate surgery, short-course radiotherapy with surgery delayed four to eight weeks, and long-course radiotherapy with delayed surgery. Local recurrence occurred in eight of 357, ten of 355 and seven of 128 patients respectively; both delayed arms were non-inferior (hazard ratio for short-course with delay 1.44, 95% CI 0.41 to 5.11; for long-course with delay 2.24, 0.71 to 7.10; p=0.48). Postoperative complications were fewer with delay. The trial made the delayed short course a legitimate option, which is what RAPIDO and STELLAR then built their total neoadjuvant schedules on and what allows organ preservation after a one-week course.",
    result: "Delaying surgery after 5 x 5 Gy is non-inferior for local recurrence and has fewer postoperative complications.",
    outcomes: [{ endpoint: "Local recurrence", primary: true, unit: "events", arms: [{ name: "Short-course, immediate surgery", n: 357, value: 8 }, { name: "Short-course, delayed surgery", n: 355, value: 10 }, { name: "Long-course, delayed surgery", n: 128, value: 7 }], p: "0.48", source: SRC.stockholm3 }],
    cancers: [CRC, "rectal-cancer"], technologies: ["imrt-igrt"], institutions: ["karolinska"], trials: ["rapido", "stellar-rectal"],
    links: [ct("NCT00904813"), doi("Stockholm III: optimal fractionation of preoperative radiotherapy and timing to surgery for rectal cancer (Lancet Oncology 2017)", "10.1016/S1470-2045(17)30086-4")] }),

  t({ id: "stellar-rectal", name: "STELLAR (rectal cancer)", aka: ["STELLAR"], nct: "NCT02533271", phase: "3", status: "mixed", yearReported: 2022, sponsor: "Chinese Academy of Medical Sciences", enrolled: 599, enrolledBasis: "randomised", enrolledNote: "The registry lists a target of 600; 599 patients were randomised between August 2015 and August 2018.",
    setting: "Distal or middle-third, cT3-4 or node-positive rectal cancer: short-course radiotherapy then four cycles of CAPOX (total neoadjuvant therapy) against long-course chemoradiotherapy",
    tldr: "China's answer to the same question as RAPIDO: one week of radiotherapy followed by chemotherapy matched five weeks of chemoradiotherapy, with more short-term toxicity.",
    summary: "STELLAR randomised 599 patients with locally advanced rectal cancer to short-course radiotherapy (25 Gy in five fractions) followed by four cycles of CAPOX and then surgery with two more cycles, or to chemoradiotherapy (50 Gy in 25 fractions with capecitabine) then surgery and six cycles of CAPOX. Three-year disease-free survival was 64.5 against 62.3 percent (hazard ratio 0.883, upper bound of the one-sided 95% CI 1.11, within the non-inferiority margin). Acute grade III to V toxicity during preoperative treatment was 26.5 against 12.6 percent. Overall survival favoured the total neoadjuvant arm (p=0.033). STELLAR and RAPIDO together made short-course radiotherapy followed by consolidation chemotherapy an accepted schedule outside northern Europe.",
    result: "Three-year disease-free survival 64.5 against 62.3 percent, non-inferior; more acute toxicity before surgery.",
    outcomes: [{ endpoint: "Disease-free survival at 3 years", primary: true, unit: "percent", arms: [{ name: "Short-course radiotherapy then chemotherapy", n: 302, value: 64.5 }, { name: "Long-course chemoradiotherapy", n: 297, value: 62.3 }], hr: 0.883, source: SRC.stellar }],
    replication: "Consistent with RAPIDO's reduction in disease-related treatment failure using the same schedule.",
    drugs: ["capox", "capecitabine", "oxaliplatin"], cancers: [CRC, "rectal-cancer"], technologies: ["imrt-igrt", "cytotoxic-chemotherapy"], terms: ["chemoradiation"], trials: ["rapido", "stockholm-iii"],
    links: [ct("NCT02533271"), doi("STELLAR: short-term radiotherapy plus chemotherapy versus long-term chemoradiotherapy in locally advanced rectal cancer (Journal of Clinical Oncology 2022)", "10.1200/JCO.21.01667")] }),

  t({ id: "cao-aro-aio-12", name: "CAO/ARO/AIO-12", nct: "NCT02363374", phase: "2", status: "mixed", yearReported: 2019, sponsor: "German Rectal Cancer Study Group (Claus Rödel)", enrolled: 311,
    setting: "Locally advanced rectal cancer: chemoradiotherapy with induction chemotherapy before it, or consolidation chemotherapy after it",
    tldr: "A German trial that tested whether chemotherapy should come before or after chemoradiotherapy. Afterwards gave more complete responses, which matters for keeping the rectum.",
    summary: "CAO/ARO/AIO-12 randomised 311 patients (306 evaluable) with locally advanced rectal cancer to chemoradiotherapy preceded by three cycles of FOLFOX (group A, induction) or followed by three cycles (group B, consolidation). Pathological complete response in the intention-to-treat population was 17 percent in group A and 25 percent in group B; only group B met the predefined statistical hypothesis. Compliance with chemoradiotherapy was better in group B and compliance with chemotherapy better in group A, and the longer interval to surgery in group B (median 90 against 45 days) did not increase surgical morbidity. The result is why consolidation chemotherapy, not induction, is the sequence used when organ preservation is the aim, the same conclusion OPRA reached for watch and wait.",
    result: "Pathological complete response 25 percent with consolidation chemotherapy against 17 percent with induction.",
    outcomes: [{ endpoint: "Pathological complete response", primary: true, unit: "percent", arms: [{ name: "Induction chemotherapy then chemoradiotherapy", n: 156, value: 17 }, { name: "Chemoradiotherapy then consolidation chemotherapy", n: 150, value: 25 }], source: SRC.cao12 }],
    replication: "OPRA found the same direction: consolidation chemotherapy gave higher TME-free survival than induction, 53 against 41 percent at three years and 54 against 39 percent at five.",
    drugs: ["folfox", "fluorouracil", "oxaliplatin"], cancers: [CRC, "rectal-cancer"], technologies: ["imrt-igrt", "cytotoxic-chemotherapy"], terms: ["pcr", "clinical-complete-response", "chemoradiation"], trials: ["opra"],
    links: [ct("NCT02363374"), doi("CAO/ARO/AIO-12: chemoradiotherapy plus induction or consolidation chemotherapy as total neoadjuvant therapy (Journal of Clinical Oncology 2019)", "10.1200/JCO.19.00308")] }),

  t({ id: "iwwd", name: "International Watch & Wait Database", aka: ["IWWD"], phase: "observational", status: "active", yearReported: 2018, sponsor: "European Registration of Cancer Care / European Society of Surgical Oncology", enrolled: 1009, enrolledBasis: "registered", enrolledNote: "1,009 patients managed by watch and wait were identified in the registry by June 2017, of whom 880 had a clinical complete response; the registry is not a trial and has no NCT number.",
    setting: "Rectal cancer with a clinical complete response after neoadjuvant treatment: no surgery, with endoscopic and MRI surveillance, pooled from 47 institutes in 15 countries",
    tldr: "The worldwide register of people who kept their rectum after treatment. A quarter of the cancers regrow, almost all within two years and almost all in the bowel wall where they can be found and removed.",
    summary: "The International Watch & Wait Database pooled individual patient data from 47 institutes in 15 countries for people whose rectal cancer was managed without surgery after a clinical complete response to neoadjuvant treatment. Of 1,009 patients identified, 880 had a clinical complete response. The two-year cumulative incidence of local regrowth was 25.2 percent (95% CI 22.2 to 28.5); 88 percent of regrowth appeared in the first two years and 97 percent was in the bowel wall, where endoscopic surveillance finds it and salvage surgery is possible. Distant metastases occurred in 8 percent. Five-year overall survival was 85 percent and disease-specific survival 94 percent. The registry is the evidence base for offering watch and wait outside a trial and sets the surveillance schedule: endoscopy and MRI every three to four months for two years.",
    result: "Two-year local regrowth 25.2 percent, 97 percent of it in the bowel wall; five-year overall survival 85 percent, disease-specific survival 94 percent.",
    outcomes: [
      { endpoint: "Cumulative local regrowth at 2 years", primary: true, unit: "percent", arms: [{ name: "Watch and wait after clinical complete response", n: 880, value: 25.2 }], ci: [22.2, 28.5], source: SRC.iwwd },
      { endpoint: "Overall survival at 5 years", unit: "percent", arms: [{ name: "Watch and wait after clinical complete response", n: 880, value: 85 }], source: SRC.iwwd },
    ],
    cancers: [CRC, "rectal-cancer"], technologies: ["imrt-igrt"], terms: ["clinical-complete-response", "pcr", "chemoradiation"], trials: ["opra", "azur-1"],
    links: [doi("IWWD: long-term outcomes of clinical complete responders after neoadjuvant treatment for rectal cancer (Lancet 2018)", "10.1016/S0140-6736(18)31078-X"), { label: "International Watch & Wait Database", url: "https://www.iwwd.org/" }] }),
];
