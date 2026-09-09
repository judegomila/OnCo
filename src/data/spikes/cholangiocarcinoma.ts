import type { CompanyInput, DrugInput, EntityInput, IdeaInput, PairingInput, TechnologyInput, TermInput, TrialInput } from "@/lib/schema";
import type { Spike } from "./index";

/**
 * BILIARY TRACT CANCER (CHOLANGIOCARCINOMA) SPIKE. Facts checked 2026-09-07.
 */
const asOf = "2026-09-07";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

const t = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
const d = (x: Omit<DrugInput, "kind" | "asOf">): DrugInput => ({ kind: "drug", asOf, ...x });
const tech = (x: Omit<TechnologyInput, "kind" | "asOf">): TechnologyInput => ({ kind: "technology", asOf, ...x });
const term = (x: Omit<TermInput, "kind" | "asOf">): TermInput => ({ kind: "term", asOf, ...x });
const co = (x: Omit<CompanyInput, "kind" | "asOf">): CompanyInput => ({ kind: "company", asOf, ...x });
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });
const pair = (x: Omit<PairingInput, "kind" | "asOf">): PairingInput => ({ kind: "pairing", asOf, ...x });

// ======================= COMPANIES =======================
const companies: CompanyInput[] = [
  co({ id: "incyte", name: "Incyte", hq: "Wilmington, DE", country: "US", companyType: "biotech", website: "https://www.incyte.com", ticker: "INCY", sections: ["targeted-therapy"],
    tldr: "Incyte makes pemigatinib, the first targeted drug approved for bile duct cancer (2020), and the JAK inhibitor ruxolitinib.",
    summary: "Pemigatinib (Pemazyre) approved for FGFR2-fusion cholangiocarcinoma on FIGHT-202; the first-line FIGHT-302 trial versus gemcitabine-cisplatin was discontinued. Also tafasitamab (with MorphoSys), retifanlimab and the failed IDO1 inhibitor epacadostat.",
    drugs: ["pemigatinib", "epacadostat"], cancers: ["cholangiocarcinoma"] }),
  co({ id: "taiho", name: "Taiho Pharmaceutical (Otsuka)", hq: "Tokyo", country: "JP", companyType: "pharma", website: "https://www.taiho.co.jp/en/", sections: ["targeted-therapy", "adcs"],
    tldr: "Japanese oncology company behind futibatinib (Lytgobi) for bile duct cancer and the chemotherapy Lonsurf; acquired the ADC linker company Araris in 2025.",
    summary: "Futibatinib approved 2022 (FOENIX-CCA2); Lonsurf (trifluridine/tipiracil) in colorectal and gastric cancer; TAS-102 combinations; Araris Biotech acquisition (2025) for ADC platform.",
    drugs: ["futibatinib"], companies: ["araris"], cancers: ["cholangiocarcinoma", "colorectal"] }),
  co({ id: "transthera", name: "TransThera Sciences", hq: "Nanjing", country: "CN", companyType: "biotech", website: "https://www.transtherabio.com", sections: ["targeted-therapy"],
    tldr: "Chinese biotech running the first phase 3 of a next-generation FGFR inhibitor, tinengotinib, for bile duct cancer that has stopped responding to first-generation FGFR drugs.",
    summary: "Tinengotinib (TT-00420) is a multi-kinase inhibitor potent against FGFR2 kinase-domain resistance mutations; FIRST-308 (phase 3 vs physician's choice chemotherapy in FGFR-altered, FGFRi-refractory cholangiocarcinoma) dosed its first US patient in 2025.",
    drugs: ["tinengotinib"], cancers: ["cholangiocarcinoma"] }),
];

// ======================= TECHNOLOGIES =======================
const technologies: TechnologyInput[] = [
  tech({ id: "biliary-stenting-drainage", name: "Biliary stenting and drainage", sections: ["surgery", "supportive-care"], status: "standard-of-care", wikipedia: W("Biliary_stent"),
    tldr: "A small tube placed by endoscope or through the skin reopens a blocked bile duct, relieving jaundice so chemotherapy can be given.",
    summary: "Most patients with perihilar or distal bile duct cancer present with obstructive jaundice; ERCP-placed plastic or metal stents, or percutaneous transhepatic drainage, are required before systemic therapy (bilirubin must fall) and before surgery in selected cases. Endoscopic ultrasound-guided drainage and radiofrequency ablation of the stricture through the stent are newer adjuncts.",
    principle: "Restore bile flow across a malignant stricture; self-expanding metal stents stay patent longer than plastic.",
    strengths: ["Rapid symptom relief", "Enables chemotherapy dosing"],
    limitations: ["Cholangitis and stent occlusion", "Pre-operative drainage is debated for resectable disease"],
    cancers: ["cholangiocarcinoma", "pancreatic"] }),
];

// ======================= TERMS =======================
const terms: TermInput[] = [
  term({ id: "biliary-anatomy-subtypes", name: "Intrahepatic, perihilar, distal and gallbladder cancer", category: "Clinical", wikipedia: W("Cholangiocarcinoma"),
    tldr: "Bile duct cancers are named by where they start: inside the liver, at the hilum where the ducts join, in the lower duct near the pancreas, or in the gallbladder. Each behaves and mutates differently.",
    summary: "Intrahepatic cholangiocarcinoma (iCCA) carries FGFR2 fusions (~10-15%) and IDH1 mutations (~15%) and is rising in incidence; perihilar (Klatskin) and distal tumours are more often HER2-amplified or KRAS-mutant; gallbladder cancer has the highest HER2 prevalence (~15-20%) and is common in Chile, India and among Indigenous Americans. Molecular profiling is guideline-recommended for all advanced biliary cancers.",
    cancers: ["cholangiocarcinoma"], targets: ["fgfr2", "idh", "her2"] }),
  term({ id: "fgfr2-fusion", name: "FGFR2 fusions and rearrangements", category: "Genomics",
    tldr: "A broken-and-rejoined FGFR2 gene that drives about one in eight intrahepatic bile duct cancers and can be switched off with pills.",
    summary: "Detected by RNA or DNA sequencing; partners are diverse (BICC1 most common). Pemigatinib (ORR 37%) and futibatinib (ORR 42%) are approved; acquired resistance arises through FGFR2 kinase-domain mutations (N550, V565 gatekeeper) that next-generation inhibitors (tinengotinib, RLY-4008 lirafugratinib) target. Hyperphosphataemia is the class effect.",
    cancers: ["cholangiocarcinoma"], targets: ["fgfr2"], drugs: ["pemigatinib", "futibatinib", "tinengotinib"], terms: ["gene-fusion"] }),
];

// ======================= PRODUCTS =======================
const drugs: DrugInput[] = [
  d({ id: "gemcitabine-cisplatin", name: "Gemcitabine + cisplatin", modality: "Cytotoxic regimen", status: "standard-of-care", wikipedia: W("Gemcitabine"),
    tldr: "Gemcitabine plus cisplatin has been the chemotherapy backbone for bile duct cancer since 2010 and is now given with immunotherapy.",
    summary: "ABC-02 (2010): OS 11.7 vs 8.1 months versus gemcitabine alone. Backbone of TOPAZ-1 (with durvalumab) and KEYNOTE-966 (with pembrolizumab). Adding nab-paclitaxel (SWOG 1815) did not improve survival.",
    mechanism: "Nucleoside analogue (gemcitabine) plus DNA crosslinker (cisplatin).",
    dosing: { route: "Intravenous", schedule: "Gemcitabine 1000 mg/m² + cisplatin 25 mg/m² days 1 and 8 every 3 weeks, up to 8 cycles", monitoring: "Renal function, hearing, blood counts" },
    toxicity: [{ event: "Neutropenia (grade 3-4)", grade3PlusPct: 25, note: "ABC-02" }, { event: "Fatigue", grade3PlusPct: 19, note: "ABC-02" }],
    technologies: ["cytotoxic-chemotherapy", "platinum"], cancers: ["cholangiocarcinoma"], trials: ["abc-02", "topaz-1", "keynote-966"] }),
  d({ id: "pemigatinib", name: "Pemigatinib", brand: "Pemazyre", modality: "Small-molecule kinase inhibitor (FGFR1-3)", status: "approved", wikipedia: W("Pemigatinib"),
    tldr: "Pemigatinib was the first targeted therapy for bile duct cancer, for tumours with an FGFR2 gene fusion.",
    summary: "FIGHT-202: ORR 37%, median PFS 7.0 months, median OS 17.5 months in previously treated FGFR2-fusion cholangiocarcinoma; accelerated approval April 2020. Also approved in FGFR1-rearranged myeloid/lymphoid neoplasms. First-line FIGHT-302 discontinued.",
    mechanism: "Selective oral FGFR1-3 inhibitor.",
    mechanismSteps: ["Enters tumour cell", "Occupies ATP pocket of fusion FGFR2 kinase", "Blocks RAS-MAPK and PI3K signalling downstream", "Cell-cycle arrest; hyperphosphataemia from FGFR1 blockade in kidney"],
    dosing: { route: "Oral", schedule: "13.5 mg daily for 14 days of each 21-day cycle", modifications: "Phosphate binders and dose holds for hyperphosphataemia", monitoring: "Serum phosphate, eye exams (retinal pigment epithelial detachment)" },
    toxicity: [{ event: "Hyperphosphataemia", anyGradePct: 60, note: "FIGHT-202" }, { event: "Alopecia", anyGradePct: 49 }, { event: "Diarrhoea", anyGradePct: 47 }, { event: "Nail toxicity", anyGradePct: 43 }, { event: "Serous retinal detachment", anyGradePct: 4 }],
    approvals: [{ region: "US", year: 2020, indication: "Previously treated FGFR2-fusion/rearranged cholangiocarcinoma (accelerated)" }, { region: "EU", year: 2021, indication: "Same" }],
    targets: ["fgfr2"], technologies: ["kinase-inhibitors"], companies: ["incyte"], cancers: ["cholangiocarcinoma"], trials: ["fight-202"], terms: ["fgfr2-fusion"] }),
  d({ id: "futibatinib", name: "Futibatinib", brand: "Lytgobi", modality: "Small-molecule irreversible kinase inhibitor (FGFR1-4)", status: "approved", wikipedia: W("Futibatinib"),
    tldr: "Futibatinib is a covalent FGFR inhibitor for FGFR2-fusion bile duct cancer, with the highest response rate of the first-generation drugs.",
    summary: "FOENIX-CCA2 (NEJM 2023): ORR 42%, median PFS 9.0 months, median OS 21.7 months in previously treated FGFR2-rearranged intrahepatic cholangiocarcinoma. Accelerated approval September 2022; EMA 2023. Retains activity against some resistance mutations.",
    mechanism: "Irreversible covalent binder of the FGFR kinase P-loop cysteine.",
    dosing: { route: "Oral", schedule: "20 mg daily continuously", monitoring: "Phosphate, eyes" },
    toxicity: [{ event: "Hyperphosphataemia", anyGradePct: 85, grade3PlusPct: 30, note: "FOENIX-CCA2" }, { event: "Alopecia", anyGradePct: 33 }, { event: "Dry mouth", anyGradePct: 30 }],
    approvals: [{ region: "US", year: 2022, indication: "Previously treated FGFR2-fusion/rearranged intrahepatic cholangiocarcinoma (accelerated)" }, { region: "EU", year: 2023, indication: "Same" }],
    targets: ["fgfr2"], technologies: ["kinase-inhibitors"], companies: ["taiho"], cancers: ["cholangiocarcinoma"], trials: ["foenix-cca2"], terms: ["fgfr2-fusion"],
    links: [{ label: "NEJM 2023", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206834" }] }),
  d({ id: "ivosidenib", name: "Ivosidenib", brand: "Tibsovo", modality: "Small-molecule IDH1 inhibitor", status: "approved", wikipedia: W("Ivosidenib"),
    tldr: "Ivosidenib is a pill that blocks the mutant IDH1 enzyme, approved in bile duct cancer and in leukaemia.",
    summary: "ClarIDHy: PFS 2.7 vs 1.4 months (HR 0.37) and crossover-adjusted OS benefit in IDH1-mutant cholangiocarcinoma; approved August 2021. Also approved in IDH1-mutant AML (first line with azacitidine) and MDS. Modest response rate (2%); disease stabilisation is the benefit.",
    mechanism: "Allosteric inhibitor of mutant IDH1, lowering the oncometabolite 2-hydroxyglutarate and restoring differentiation.",
    dosing: { route: "Oral", schedule: "500 mg daily", monitoring: "QT interval, differentiation syndrome (AML)" },
    toxicity: [{ event: "Nausea", anyGradePct: 41, note: "ClarIDHy" }, { event: "Diarrhoea", anyGradePct: 35 }, { event: "Fatigue", anyGradePct: 31 }, { event: "Ascites", grade3PlusPct: 9 }],
    approvals: [{ region: "US", year: 2018, indication: "Relapsed/refractory IDH1-mutant AML" }, { region: "US", year: 2021, indication: "Previously treated IDH1-mutant cholangiocarcinoma" }],
    targets: ["idh"], technologies: ["epigenetic-drugs", "kinase-inhibitors"], companies: ["servier"], cancers: ["cholangiocarcinoma", "aml"], trials: ["claridhy"] }),
  d({ id: "tinengotinib", name: "Tinengotinib", code: "TT-00420", modality: "Small-molecule multi-kinase inhibitor (FGFR1-3, VEGFR, Aurora, JAK)", status: "phase-3",
    tldr: "A next-generation FGFR inhibitor designed to work after pemigatinib or futibatinib stop working, now in a global phase 3.",
    summary: "Phase 1/2 in heavily pretreated FGFR-altered cholangiocarcinoma, including after prior FGFR inhibitors, showed disease control with median PFS ~5-6 months. FIRST-308 randomises FGFRi-refractory patients to tinengotinib versus FOLFOX/FOLFIRI; first US patient dosed 2025.",
    mechanism: "Type I inhibitor active against FGFR2 kinase-domain resistance mutations (N550, V565) plus VEGFR and Aurora kinases.",
    targets: ["fgfr2"], technologies: ["kinase-inhibitors"], companies: ["transthera"], cancers: ["cholangiocarcinoma"], trials: ["first-308"], terms: ["fgfr2-fusion"] }),
];

// ======================= TRIALS =======================
const trials: TrialInput[] = [
  t({ id: "abc-02", name: "ABC-02", phase: "3", status: "positive", yearReported: 2010, sponsor: "Cancer Research UK", enrolled: 410,
    setting: "Locally advanced or metastatic biliary tract cancer: gemcitabine + cisplatin vs gemcitabine",
    tldr: "The 2010 UK trial that gave bile duct cancer its first standard chemotherapy.",
    summary: "OS 11.7 vs 8.1 months (HR 0.64); PFS 8.0 vs 5.0 months. Remained the control arm for every subsequent first-line trial for over a decade.",
    result: "OS 11.7 vs 8.1 months, HR 0.64.",
    outcomes: [{ endpoint: "Overall survival", primary: true, unit: "months", arms: [{ name: "Gemcitabine + cisplatin", n: 204, value: 11.7 }, { name: "Gemcitabine", n: 206, value: 8.1 }], hr: 0.64, ci: [0.52, 0.80], p: "<0.001" }],
    replication: "Confirmed by the Japanese BT22 trial and a decade of use as control arm.",
    drugs: ["gemcitabine-cisplatin"], cancers: ["cholangiocarcinoma"], links: [{ label: "NEJM 2010", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0908721" }], institutions: ["cruk"] }),
  t({ id: "bilcap", name: "BILCAP", phase: "3", status: "mixed", yearReported: 2017, sponsor: "Cancer Research UK", enrolled: 447,
    setting: "Adjuvant capecitabine for 6 months vs observation after resection of biliary tract cancer",
    tldr: "Six months of oral chemotherapy after surgery became the standard for bile duct cancer despite a technically negative primary result.",
    summary: "Intention-to-treat OS 51.1 vs 36.4 months (HR 0.81, not significant); per-protocol HR 0.75 (significant). Adopted by ASCO and ESMO guidelines as standard adjuvant therapy.",
    result: "OS 51.1 vs 36.4 months; ITT HR 0.81 (p=0.097), per-protocol HR 0.75.",
    outcomes: [{ endpoint: "Overall survival (ITT)", primary: true, unit: "months", arms: [{ name: "Capecitabine", n: 223, value: 51.1 }, { name: "Observation", n: 224, value: 36.4 }], hr: 0.81, ci: [0.63, 1.04], p: "0.097" }],
    cancers: ["cholangiocarcinoma"], technologies: ["cytotoxic-chemotherapy"], institutions: ["cruk"], tags: ["lesson:itt-vs-per-protocol"] }),
  t({ id: "topaz-1", name: "TOPAZ-1", nct: "NCT03875235", phase: "3", status: "positive", yearReported: 2022, sponsor: "AstraZeneca", enrolled: 685,
    setting: "First-line advanced biliary tract cancer: gemcitabine-cisplatin + durvalumab vs + placebo",
    tldr: "TOPAZ-1 was the first immunotherapy success in bile duct cancer, with a small median gain but a growing tail of long survivors.",
    summary: "OS 12.9 vs 11.3 months (HR 0.76 updated); 24-month OS 23.6% vs 11.5%; 3-year OS update (J Hepatol 2025) confirmed the durable tail. Approved September 2022.",
    result: "OS HR 0.76; 2-year OS 23.6% vs 11.5%.",
    outcomes: [{ endpoint: "Overall survival (updated)", primary: true, unit: "months", arms: [{ name: "Durvalumab + GemCis", n: 341, value: 12.9 }, { name: "Placebo + GemCis", n: 344, value: 11.3 }], hr: 0.76, ci: [0.64, 0.91] }, { endpoint: "24-month overall survival", unit: "%", arms: [{ name: "Durvalumab + GemCis", value: 23.6 }, { name: "Placebo + GemCis", value: 11.5 }] }],
    replication: "KEYNOTE-966 (pembrolizumab) reproduced the class effect.",
    drugs: ["durvalumab", "gemcitabine-cisplatin"], cancers: ["cholangiocarcinoma"], links: [ct("NCT03875235"), { label: "Updated OS (PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/38823398/" }, { label: "3-year update", url: "https://www.journal-of-hepatology.eu/article/S0168-8278(25)02201-9/fulltext" }] }),
  t({ id: "keynote-966", name: "KEYNOTE-966", nct: "NCT04003636", phase: "3", status: "positive", yearReported: 2023, sponsor: "Merck", enrolled: 1069,
    setting: "First-line advanced biliary tract cancer: gemcitabine-cisplatin + pembrolizumab vs + placebo",
    tldr: "A second immunotherapy trial confirmed the modest survival benefit of adding PD-1 blockade to chemotherapy in bile duct cancer.",
    summary: "OS 12.7 vs 10.9 months (HR 0.83); gemcitabine continued beyond 8 cycles in both arms. Approved October 2023.",
    result: "OS 12.7 vs 10.9 months, HR 0.83.",
    outcomes: [{ endpoint: "Overall survival", primary: true, unit: "months", arms: [{ name: "Pembrolizumab + GemCis", n: 533, value: 12.7 }, { name: "Placebo + GemCis", n: 536, value: 10.9 }], hr: 0.83, ci: [0.72, 0.95], p: "0.0034" }],
    replication: "Replicates TOPAZ-1.",
    drugs: ["pembrolizumab", "gemcitabine-cisplatin"], cancers: ["cholangiocarcinoma"], links: [ct("NCT04003636")] }),
  t({ id: "fight-202", name: "FIGHT-202", nct: "NCT02924376", phase: "2", status: "positive", yearReported: 2020, sponsor: "Incyte", enrolled: 147,
    setting: "Previously treated cholangiocarcinoma with FGFR2 fusions (cohort A): pemigatinib single arm",
    tldr: "FIGHT-202 is the single-arm study that produced the first targeted approval in bile duct cancer.",
    summary: "ORR 37% (35.5%), median PFS 7.0 months, median OS 17.5 months in FGFR2-fusion patients; no responses in other FGF/FGFR alterations.",
    result: "ORR 37%; PFS 7.0 months; OS 17.5 months.",
    outcomes: [{ endpoint: "Objective response rate", primary: true, unit: "%", arms: [{ name: "Pemigatinib (FGFR2 fusion)", n: 107, value: 35.5 }] }, { endpoint: "Progression-free survival", unit: "months", arms: [{ name: "Pemigatinib", value: 7.0 }] }],
    drugs: ["pemigatinib"], cancers: ["cholangiocarcinoma"], targets: ["fgfr2"], links: [ct("NCT02924376")] }),
  t({ id: "foenix-cca2", name: "FOENIX-CCA2", nct: "NCT02052778", phase: "2", status: "positive", yearReported: 2022, sponsor: "Taiho", enrolled: 103,
    setting: "Previously treated FGFR2-rearranged intrahepatic cholangiocarcinoma: futibatinib single arm",
    tldr: "Futibatinib produced responses in over 40% of patients whose bile duct cancer carried an FGFR2 fusion.",
    summary: "ORR 42%, median PFS 9.0 months, median OS 21.7 months (NEJM 2023).",
    result: "ORR 42%; PFS 9.0 months; OS 21.7 months.",
    outcomes: [{ endpoint: "Objective response rate", primary: true, unit: "%", arms: [{ name: "Futibatinib", n: 103, value: 42 }] }, { endpoint: "Progression-free survival", unit: "months", arms: [{ name: "Futibatinib", value: 9.0 }] }, { endpoint: "Overall survival", unit: "months", arms: [{ name: "Futibatinib", value: 21.7 }] }],
    drugs: ["futibatinib"], cancers: ["cholangiocarcinoma"], targets: ["fgfr2"], links: [ct("NCT02052778"), { label: "NEJM 2023", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206834" }] }),
  t({ id: "claridhy", name: "ClarIDHy", nct: "NCT02989857", phase: "3", status: "positive", yearReported: 2020, sponsor: "Agios (now Servier)", enrolled: 187,
    setting: "Previously treated IDH1-mutant cholangiocarcinoma: ivosidenib vs placebo",
    tldr: "The first randomised trial of a targeted drug in bile duct cancer; it slowed the disease without shrinking it.",
    summary: "PFS 2.7 vs 1.4 months (HR 0.37); OS 10.3 vs 7.5 months after adjusting for crossover (HR 0.49); ORR 2%.",
    result: "PFS HR 0.37; crossover-adjusted OS HR 0.49.",
    outcomes: [{ endpoint: "Progression-free survival", primary: true, unit: "months", arms: [{ name: "Ivosidenib", n: 126, value: 2.7 }, { name: "Placebo", n: 61, value: 1.4 }], hr: 0.37, ci: [0.25, 0.54], p: "<0.0001" }, { endpoint: "Overall survival (crossover-adjusted)", unit: "months", arms: [{ name: "Ivosidenib", value: 10.3 }, { name: "Placebo", value: 7.5 }], hr: 0.49 }],
    drugs: ["ivosidenib"], cancers: ["cholangiocarcinoma"], targets: ["idh"], links: [ct("NCT02989857")] }),
  t({ id: "herizon-btc-302", name: "HERIZON-BTC-302", nct: "NCT06282575", phase: "3", status: "recruiting", sponsor: "Jazz / Zymeworks",
    setting: "First-line HER2-positive advanced biliary tract cancer: zanidatamab + standard of care (GemCis ± PD-1) vs standard of care",
    tldr: "Tests whether the HER2 bispecific antibody should be given from the start in HER2-positive bile duct cancer.",
    summary: "Confirmatory trial for zanidatamab's accelerated approval (HERIZON-BTC-01: ORR 41%, OS 15.5 months; HER2 IHC 3+ ORR 52%, OS 18.1 months). Enrolling since 2024.",
    drugs: ["zanidatamab", "gemcitabine-cisplatin"], cancers: ["cholangiocarcinoma"], targets: ["her2"], links: [ct("NCT06282575"), { label: "Post-hoc HERIZON-BTC-01 analysis", url: "https://www.ccanewsonline.com/issues/2026/march-2026-vol-7-no-1/zanidatamab-improves-survival-outcomes-in-her2-positive-biliary-tract-cancer-post-hoc-herizon-btc-01-analysis" }] }),
  t({ id: "first-308", name: "FIRST-308", phase: "3", status: "recruiting", sponsor: "TransThera",
    setting: "FGFR-altered cholangiocarcinoma refractory to chemotherapy and a first-generation FGFR inhibitor: tinengotinib vs FOLFOX/FOLFIRI",
    tldr: "The first phase 3 trial for patients whose bile duct cancer has outgrown the existing FGFR drugs.",
    summary: "Global, randomised; primary endpoint PFS. First US patient dosed 2025.",
    drugs: ["tinengotinib"], cancers: ["cholangiocarcinoma"], targets: ["fgfr2"], links: [{ label: "TransThera announcement", url: "https://www.biospace.com/transthera-announces-the-global-multicenter-phase-3-clinical-trial-completed-first-patient-dosing-in-the-us-evaluating-tinengotinib-in-fgfri-relapsed-refractory-patients-with-cholangiocarcinoma" }] }),
  t({ id: "naliricc", name: "NALIRICC (AIO)", phase: "2", status: "negative", yearReported: 2024, sponsor: "AIO (Germany)", enrolled: 100,
    setting: "Second-line biliary tract cancer after gemcitabine: liposomal irinotecan + 5-FU/LV vs 5-FU/LV",
    tldr: "Adding a liposomal chemotherapy did not help in second-line bile duct cancer, contradicting an earlier Korean trial.",
    summary: "No PFS or OS improvement (OS 6.9 vs 8.2 months); the earlier NIFTY trial had been positive. Pooled analysis (2025) modestly favoured the combination. Second-line chemotherapy (FOLFOX per ABC-06) provides a small benefit.",
    result: "OS 6.9 vs 8.2 months; not improved.",
    outcomes: [{ endpoint: "Overall survival", unit: "months", arms: [{ name: "nal-IRI + 5-FU/LV", value: 6.9 }, { name: "5-FU/LV", value: 8.2 }] }],
    cancers: ["cholangiocarcinoma"], technologies: ["cytotoxic-chemotherapy"], links: [{ label: "Lancet Gastroenterol Hepatol 2024", url: "https://www.thelancet.com/journals/langas/article/PIIS2468-1253(24)00119-5/fulltext" }], tags: ["failure", "lesson:replication"] }),
];

// ======================= PAIRINGS =======================
const pairings: PairingInput[] = [
  pair({ id: "gemcis-plus-io-btc", name: "Gemcitabine-cisplatin + PD-(L)1 blockade in biliary cancer", a: "gemcitabine-cisplatin", b: "checkpoint-inhibitor", pairingType: "combination",
    tldr: "Chemotherapy plus immunotherapy is now the first treatment for advanced bile duct cancer, with a small average gain and a minority of long survivors.",
    summary: "TOPAZ-1 (durvalumab, OS HR 0.76) and KEYNOTE-966 (pembrolizumab, OS HR 0.83) both positive; 2-year survival roughly doubled. No predictive biomarker (PD-L1, TMB, MSI) reliably identifies the long-term survivors.",
    rationale: "Chemotherapy-induced immunogenic cell death plus checkpoint blockade; biliary cancers have an inflamed stroma.",
    evidence: "Two phase 3 trials.",
    trials: ["topaz-1", "keynote-966"], cancers: ["cholangiocarcinoma"] }),
];

// ======================= IDEAS =======================
const ideas: IdeaInput[] = [
  idea({ id: "idea-btc-ctdna-fgfr-resistance", name: "ctDNA-guided switching among FGFR inhibitors", maturity: "early-clinical",
    tldr: "Track FGFR2 resistance mutations in blood and switch to the next-generation inhibitor that still covers them, before the scan shows progression.",
    summary: "Polyclonal FGFR2 kinase-domain mutations emerge on pemigatinib and futibatinib and are detectable in cfDNA weeks before radiographic progression; tinengotinib and lirafugratinib retain activity against several of them.",
    hypothesis: "Serial ctDNA monitoring with pre-emptive switching to a resistance-mutation-covering FGFR inhibitor extends time on FGFR-directed therapy compared with switching at radiographic progression.",
    rationale: "Resistance mutations are drug-specific and predictable; molecular progression precedes clinical progression.",
    test: "Randomised phase 2: ctDNA-triggered switch vs standard imaging-triggered switch; endpoint time to chemotherapy.",
    technologies: ["liquid-biopsy", "kinase-inhibitors"], targets: ["fgfr2"], drugs: ["pemigatinib", "futibatinib", "tinengotinib"], cancers: ["cholangiocarcinoma"], terms: ["fgfr2-fusion", "ctdna"] }),
];

const spike: Spike = {
  cancerId: "cholangiocarcinoma",
  entities: [...companies, ...technologies, ...terms, ...drugs, ...trials, ...pairings, ...ideas] as EntityInput[],
  patch: {
    tldr: "Cholangiocarcinoma is cancer of the bile ducts or gallbladder. It is rare and often found late, but it turned out to carry more targetable mutations than almost any other gastrointestinal cancer, and immunotherapy now adds to chemotherapy from the first treatment.",
    summary: "Biliary tract cancers comprise intrahepatic cholangiocarcinoma (iCCA, rising in incidence), perihilar and distal extrahepatic cholangiocarcinoma, and gallbladder cancer. They share late presentation (jaundice, weight loss), a poor prognosis (five-year survival under 20%), and dependence on surgical resection as the only cure, achievable in a minority. Risk factors differ by region: liver flukes and hepatolithiasis in East Asia, primary sclerosing cholangitis in the West, gallstones and chronic inflammation for gallbladder cancer. Biliary drainage is usually a prerequisite for any treatment.\n\nThe systemic landscape was gemcitabine-cisplatin alone from ABC-02 (2010) until TOPAZ-1 (durvalumab, 2022) and KEYNOTE-966 (pembrolizumab, 2023) added PD-(L)1 blockade with a modest median benefit but a doubling of two-year survival. Adjuvant capecitabine (BILCAP) is standard after resection. What sets biliary cancer apart is its genomic actionability: roughly 40% of intrahepatic tumours carry FGFR2 fusions (pemigatinib, futibatinib), IDH1 mutations (ivosidenib), HER2 amplification or overexpression (zanidatamab, trastuzumab deruxtecan), NRG1 fusions (zenocutuzumab, approved 2026), BRAF V600E, or MSI-high status, so molecular profiling at diagnosis is guideline-mandated.\n\nThe frontier is moving targeted agents into first line (HERIZON-BTC-302 for zanidatamab), overcoming FGFR-inhibitor resistance (tinengotinib in FIRST-308, lirafugratinib), ctDNA-guided sequencing, and finding a biomarker for the immunotherapy long-tail. Liver transplantation for unresectable perihilar tumours (Mayo protocol) and for selected intrahepatic disease is expanding. Open problems include second-line therapy after chemo-immunotherapy, gallbladder cancer's neglect in trials, and early detection in high-risk groups such as primary sclerosing cholangitis.",
    burden: "About 210,000 cases per year worldwide; incidence of intrahepatic cholangiocarcinoma has roughly doubled in Western countries over 30 years; gallbladder cancer is endemic in Chile, northern India, and among Indigenous Americans.",
    subtypes: ["Intrahepatic cholangiocarcinoma (FGFR2 fusion ~10-15%, IDH1 ~15%)", "Perihilar (Klatskin) cholangiocarcinoma", "Distal extrahepatic cholangiocarcinoma", "Gallbladder carcinoma (HER2 ~15-20%)", "Fluke-associated (Opisthorchis, Clonorchis)", "PSC-associated"],
    biomarkers: ["FGFR2 fusions/rearrangements (RNA or DNA NGS)", "IDH1 mutation", "HER2 amplification / IHC 3+", "NRG1 fusion", "BRAF V600E", "MSI/dMMR", "KRAS, TP53 (prognostic)", "CA 19-9 (monitoring)", "PD-L1 (not predictive so far)"],
    standardOfCare: [
      { setting: "Diagnosis and staging", approach: "Contrast CT/MRI with MRCP; ERCP or EUS-guided biopsy; molecular profiling (DNA + RNA NGS) for all advanced disease; biliary drainage if jaundiced.", refs: ["cgp", "rna-seq", "biliary-stenting-drainage", "mri"], guideline: { nccn: "Molecular testing recommended (category 2A)", version: "NCCN Biliary Tract Cancers 2026" } },
      { setting: "Resectable", approach: "Margin-negative resection (hepatectomy, Whipple, or radical cholecystectomy) with lymphadenectomy; adjuvant capecitabine 6 months (BILCAP).", refs: ["bilcap", "robotic-surgery"], guideline: { nccn: "Capecitabine category 2A (preferred)", esmoMcbs: "B" } },
      { setting: "Unresectable perihilar in selected patients", approach: "Neoadjuvant chemoradiation then liver transplantation (Mayo protocol) at experienced centres.", refs: ["liver-transplant-oncology"], guideline: { nccn: "Category 2B, transplant centres only" } },
      { setting: "Advanced, first line", approach: "Gemcitabine-cisplatin + durvalumab (TOPAZ-1) or + pembrolizumab (KEYNOTE-966); zanidatamab added in HER2+ disease within HERIZON-BTC-302.", refs: ["topaz-1", "keynote-966", "gemcitabine-cisplatin", "durvalumab", "pembrolizumab", "herizon-btc-302"], guideline: { nccn: "Category 1 (preferred)", esmoMcbs: "TOPAZ-1 grade 3" } },
      { setting: "Advanced, FGFR2 fusion after chemotherapy", approach: "Pemigatinib or futibatinib; tinengotinib in FIRST-308 after progression.", refs: ["pemigatinib", "futibatinib", "tinengotinib", "fight-202", "foenix-cca2", "first-308"], guideline: { nccn: "Category 2A" } },
      { setting: "Advanced, IDH1 mutation after chemotherapy", approach: "Ivosidenib (ClarIDHy).", refs: ["ivosidenib", "claridhy"], guideline: { nccn: "Category 1" } },
      { setting: "Advanced, HER2-positive after chemotherapy", approach: "Zanidatamab (IHC 3+ or amplified); trastuzumab deruxtecan (IHC 3+, tumour-agnostic).", refs: ["zanidatamab", "trastuzumab-deruxtecan"], guideline: { nccn: "Category 2A" } },
      { setting: "Advanced, other alterations", approach: "Zenocutuzumab (NRG1 fusion, approved 2026); dabrafenib-trametinib (BRAF V600E); pembrolizumab or dostarlimab (MSI-H/dMMR); larotrectinib/entrectinib (NTRK).", refs: ["zenocutuzumab", "dabrafenib-trametinib", "pembrolizumab", "dostarlimab"], guideline: { nccn: "Category 2A (tumour-agnostic)" } },
      { setting: "Second-line, no target", approach: "FOLFOX (ABC-06, modest benefit); liposomal irinotecan/5-FU had conflicting results (NIFTY positive, NALIRICC negative); clinical trials preferred.", refs: ["naliricc", "cytotoxic-chemotherapy"], guideline: { nccn: "FOLFOX category 1" } },
      { setting: "Locoregional (intrahepatic, liver-confined)", approach: "Y-90 radioembolisation, hepatic arterial infusion pump chemotherapy, or SBRT at specialised centres; no phase 3 proof of survival benefit.", refs: ["radioembolisation-tare", "sbrt"], guideline: { nccn: "Category 2B" } },
    ],
    stateOfArt: [
      "Chemo-immunotherapy first line with a doubling of two-year survival (TOPAZ-1, KEYNOTE-966).",
      "Four biomarker-directed drug classes approved (FGFR2, IDH1, HER2, NRG1), plus tumour-agnostic BRAF, MSI-H and NTRK options: ~40% of intrahepatic tumours have an actionable alteration.",
      "Next-generation FGFR inhibitors targeting resistance mutations are in phase 3 (FIRST-308).",
      "Zanidatamab moving into first line for HER2-positive disease (HERIZON-BTC-302).",
      "Liver transplantation protocols extend curative options to selected unresectable perihilar tumours.",
    ],
    history: [
      { year: 1965, title: "Klatskin describes perihilar cholangiocarcinoma", note: "Distinct clinicopathologic entity at the hepatic duct confluence." },
      { year: 1993, title: "Mayo Clinic begins neoadjuvant chemoradiation and transplant for perihilar cholangiocarcinoma", refs: ["liver-transplant-oncology"] },
      { year: 2010, title: "ABC-02: gemcitabine-cisplatin becomes standard", refs: ["abc-02", "gemcitabine-cisplatin"] },
      { year: 2013, title: "FGFR2 fusions and IDH1 mutations characterised as drivers of intrahepatic cholangiocarcinoma", refs: ["fgfr2-fusion", "idh"] },
      { year: 2017, title: "BILCAP: adjuvant capecitabine adopted", refs: ["bilcap"] },
      { year: 2020, title: "Pemigatinib: first targeted approval in biliary cancer", refs: ["pemigatinib", "fight-202"] },
      { year: 2021, title: "Ivosidenib approved (ClarIDHy); infigratinib approved then withdrawn (2022)", refs: ["ivosidenib", "claridhy"] },
      { year: 2022, title: "TOPAZ-1: first immunotherapy approval; futibatinib approved", refs: ["topaz-1", "durvalumab", "futibatinib", "foenix-cca2"] },
      { year: 2023, title: "KEYNOTE-966: pembrolizumab confirms chemo-IO", refs: ["keynote-966"] },
      { year: 2024, title: "Zanidatamab: first HER2 approval in biliary cancer; T-DXd tumour-agnostic HER2 IHC3+; NALIRICC negative", refs: ["zanidatamab", "trastuzumab-deruxtecan", "naliricc"] },
      { year: 2025, title: "TOPAZ-1 three-year survival update; FIRST-308 doses first US patient", refs: ["topaz-1", "first-308"] },
      { year: 2026, title: "Zenocutuzumab approved for NRG1-fusion cholangiocarcinoma; HERIZON-BTC-302 enrolling", refs: ["zenocutuzumab", "herizon-btc-302"] },
    ],
    pipeline: ["herizon-btc-302", "first-308", "tinengotinib", "zanidatamab", "zenocutuzumab", "trastuzumab-deruxtecan", "idea-btc-ctdna-fgfr-resistance", "liquid-biopsy", "liver-transplant-oncology", "radioembolisation-tare", "fapi-pet", "cmg901"],
    openProblems: [
      "Median survival in advanced disease is still barely a year; the immunotherapy benefit is a small tail with no predictive biomarker.",
      "FGFR inhibitor resistance (polyclonal kinase-domain mutations) limits benefit to ~7-9 months; sequencing next-generation agents is unproven.",
      "Second-line chemotherapy is weak (FOLFOX) and evidence for liposomal irinotecan is contradictory.",
      "Gallbladder cancer is under-represented in trials despite distinct biology and high HER2 prevalence.",
      "Early detection in primary sclerosing cholangitis and fluke-endemic regions is unsolved; CA 19-9 is non-specific.",
      "Molecular testing is slow and tissue is scarce from brushings; liquid biopsy adoption lags.",
      "Adjuvant evidence rests on a technically negative trial (BILCAP); immunotherapy adjuvant trials are ongoing.",
    ],
    targets: ["fgfr2", "idh", "her2", "her3", "pd1", "pdl1", "braf", "ntrk", "cldn18-2"],
    technologies: ["biliary-stenting-drainage", "liver-transplant-oncology", "radioembolisation-tare", "checkpoint-inhibitor", "kinase-inhibitors", "cgp", "rna-seq", "liquid-biopsy", "sbrt"],
    terms: ["biliary-anatomy-subtypes", "fgfr2-fusion", "ca19-9", "gene-fusion", "tumour-agnostic"],
    companies: ["astrazeneca", "merck", "incyte", "taiho", "servier", "jazz", "zymeworks", "merus", "transthera", "cruk"],
    institutions: ["mayo-clinic", "mskcc", "cruk", "royal-marsden", "asan-medical-center"],
    related: ["gemcis-plus-io-btc"],
    tags: ["spike"],
  },
};

export default spike;
