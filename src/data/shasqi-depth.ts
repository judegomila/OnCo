/**
 * Shasqi in depth (16 November 2026, owner request): the technology the company works on, its one programme that reached
 * patients, the registered trial and the papers behind them. The company record itself stays in ./companies-yc.ts and
 * was supplemented there rather than written twice.
 *
 * Sources, all read as raw text on 16 November 2026:
 *  - shasqi.com: the platform, pipeline, leadership and news pages and the press releases linked on each record. The
 *    pipeline is published as an image (pipeline-2026.jpg); it was read by eye and carries no programme codes.
 *  - ClinicalTrials.gov v2 API, NCT04106492, including the results posted on 14 November 2025. A sponsor search and a
 *    term search both return this one study.
 *  - Crossref and Europe PMC for every DOI and PubMed id below; figures come from the abstracts, not the full texts.
 *  - NIH RePORTER (api.reporter.nih.gov) for the awards on the company record.
 *
 * Not reached, and so not stated: the full text of any paper, the ASCO 2024 and ESMO 2022 posters, the content of the
 * correction notice to the Chemical Science paper, and any regulatory designation.
 */
import type { DrugInput, PaperInput, TechnologyInput, TrialInput } from "@/lib/schema";

const asOf = "2026-11-16";
const provenance = { editedBy: "OnCo (company site, ClinicalTrials.gov v2, Crossref, Europe PMC, NIH RePORTER)", editedOn: asOf };

const CTGOV = "https://clinicaltrials.gov/study/NCT04106492";
const CTGOV_RESULTS = "https://clinicaltrials.gov/study/NCT04106492?tab=results";
const PLATFORM = "https://www.shasqi.com/our-platform";
const doi = (d: string) => `https://doi.org/${d}`;
const pubmed = (id: string) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`;

const P_CCR = "paper-srinivasan-sq3370-preclinical-to-first-in-human-clin-cancer-res-2025";
const P_MEDRXIV = "paper-chawla-sq3370-phase-1-2a-advanced-solid-tumours-medrxiv-2025";
const P_ADVTHER = "paper-srinivasan-sq3370-injected-and-non-injected-lesions-adv-ther-2021";
const P_CHEMSCI = "paper-wu-click-activated-protodrugs-local-capture-chem-sci-2021";
const P_ACS2016 = "paper-mejia-oneto-local-hydrogel-systemic-prodrug-sarcoma-acs-cent-sci-2016";
const P_ACS2023 = "paper-mcfarland-auristatin-protodrug-click-activation-acs-cent-sci-2023";
const P_ACTA = "paper-mejia-oneto-implantable-biomaterial-click-chemistry-acta-biomater-2014";

export const shasqiTechnologies: TechnologyInput[] = [
  {
    id: "click-activated-prodrugs", kind: "technology", name: "Click-activated prodrugs (bioorthogonal drug activation in the body)",
    aka: ["click chemistry prodrug activation", "bioorthogonal prodrug activation", "click-activated protodrugs", "CAPAC", "Click Activated Protodrugs Against Cancer", "click-to-release", "in vivo click chemistry", "tetrazine ligation"],
    status: "phase-2", since: 2020, asOf, provenance, tags: ["frontier"],
    sections: ["chemotherapy", "adcs"], technologies: ["adc", "masked-adc", "cytotoxic-chemotherapy"],
    terms: ["prodrug", "therapeutic-index", "payload", "mmae"],
    companies: ["shasqi", "tagworks-pharmaceuticals"], drugs: ["sq3370"], trials: ["nct04106492"],
    keyPapers: [P_CCR, P_MEDRXIV, P_CHEMSCI, P_ACS2023, P_ACS2016],
    tldr: "Two ingredients are given separately: one is placed at or guided to the tumour, the other is an inactive form of a cancer drug sent through the blood. Where they meet, a fast chemical reaction releases the active drug. One early trial in people showed the chemistry works in the body but did not shrink more tumours than the ordinary drug.",
    summary: "Click-activated prodrugs split a cancer medicine into two parts that do nothing alone. An activator is first put at the tumour, either by injecting it into a lesion or by attaching it to something that binds a tumour antigen. An inert, chemically capped form of a cytotoxic drug is then given into a vein. The two carry matched reactive groups, a tetrazine and a trans-cyclooctene, which react with each other and with little else in the body (a bioorthogonal, or click, reaction). In the published designs the reaction captures the capped drug at the activator and the cap then falls away, releasing the active drug at that site.\n\nThe chemistry was recognised by the 2022 Nobel Prize in Chemistry, awarded to Carolyn Bertozzi, Morten Meldal and Barry Sharpless for the development of click chemistry and bioorthogonal chemistry; the prize announcement noted that bioorthogonal reactions were being used to improve the targeting of cancer medicines in clinical trials.\n\nThe first reported use in patients was Shasqi's SQ3370: a tetrazine-modified hyaluronate biopolymer injected into one tumour, followed by daily infusions of a trans-cyclooctene-modified doxorubicin. Its phase 1/2a trial (NCT04106492) gave doxorubicin-equivalent doses up to 15 times the conventional dose per cycle with no protocol-defined dose-limiting toxicity, and the authors measured rapid release of active doxorubicin at every dose level. In the 14 patients with soft tissue sarcoma treated in phase 2a, two had an unconfirmed objective response (14.3 per cent), which the authors describe as comparable to standard doxorubicin, and the trial was stopped because the prespecified bar of a response rate above standard doxorubicin was not met. So the trial supports the chemistry and the tolerability, and does not show better tumour control.\n\nA second form replaces the injected biopolymer with a tumour-binding protein carrying the activator, which removes the need for an injectable lesion. Shasqi has published this in mice with a HER2-binding antibody fragment and a capped MMAE, and its pipeline lists CEACAM5-targeted programmes that have not reached the clinic. Tagworks Pharmaceuticals uses the reaction the other way round, in an approach it calls Click-to-Release: its TGW101 is a diabody drug conjugate whose payload is cut free by a separately given small-molecule trigger, in a phase 1 trial registered as NCT06959706. No medicine of this kind is approved anywhere.",
    principle: "An inverse electron-demand Diels-Alder reaction between a tetrazine and a trans-cyclooctene (TCO). In Shasqi's design the tetrazine sits on the tumour-localised activator and the TCO caps the drug, attenuating its activity; the reaction at the tumour captures the capped drug and is followed by release of the native drug. Activation depends on the two components meeting, not on tumour enzymes, acidity, oxygen level or uptake into the cell.",
    strengths: [
      "Activation does not rely on the tumour cell taking the drug in or on tumour enzymes, so targets that do not internalise are open to it (stated by the developers; shown so far in animal models).",
      "The targeting part carries no drug, so none is shed from it in healthy tissue on the way to the tumour (the developers' argument for the design).",
      "In the one human trial, doxorubicin-equivalent doses up to 15 times the conventional dose per cycle were given with no protocol-defined dose-limiting toxicity.",
      "Modular: the same activator has been paired with capped forms of doxorubicin, paclitaxel, etoposide, gemcitabine and MMAE in laboratory work.",
    ],
    limitations: [
      "The only efficacy data in people are from 14 patients; the response rate was comparable to standard doxorubicin and the trial was stopped on that prespecified criterion.",
      "The form tested in people needs a tumour that can be injected, and treats distant disease only through whatever drug or immune effect reaches it.",
      "Two products must be made, dosed and timed, and the trial was neither randomised nor compared with doxorubicin directly.",
      "The antigen-targeted forms that would remove the need for injection have no published human data.",
    ],
    notes: [
      "\"Protodrug\" is Shasqi's word for the capped drug; OnCo uses prodrug except where quoting.",
      "Shasqi describes itself as the first company to use click chemistry in patients (shasqi.com, read 16 November 2026); the Clinical Cancer Research paper calls SQ3370 the first demonstration of click chemistry within the human body in a clinical setting. OnCo repeats the claim as theirs and has not checked it against every registry.",
    ],
    links: [
      { label: "Nobel Prize in Chemistry 2022, press release", url: "https://www.nobelprize.org/prizes/chemistry/2022/press-release/" },
      { label: "Srinivasan et al., Clinical Cancer Research 2025 (SQ3370, preclinical to first-in-human)", url: doi("10.1158/1078-0432.CCR-24-2539") },
      { label: "Chawla et al., medRxiv 2025 (SQ3370 phase 1/2a, preprint)", url: doi("10.1101/2025.06.02.25328445") },
      { label: "Wu et al., Chemical Science 2021 (the platform chemistry)", url: doi("10.1039/d0sc06099b") },
      { label: "Shasqi: how the CAPAC platform works", url: PLATFORM },
      { label: "ClinicalTrials.gov NCT04106492 (SQ3370)", url: CTGOV },
      { label: "Tagworks Pharmaceuticals: Click-to-Release", url: "https://www.tagworkspharma.com/" },
      { label: "ClinicalTrials.gov NCT06959706 (Tagworks TGW101)", url: "https://clinicaltrials.gov/study/NCT06959706" },
    ],
  },
];

export const shasqiDrugs: DrugInput[] = [
  {
    id: "sq3370", kind: "drug", name: "SQ3370", code: "SQ3370", aka: ["SQL70 plus SQP33", "SQL70", "SQP33", "doxorubicin protodrug SQP33"],
    modality: "Click-activated anthracycline prodrug in two parts: an activating biopolymer injected into the tumour and an intravenous doxorubicin prodrug",
    payload: "Doxorubicin, released from the prodrug SQP33",
    mechanism: "SQL70, a tetrazine-modified sodium hyaluronate biopolymer, is injected into a tumour. SQP33, doxorubicin capped with a trans-cyclooctene group that attenuates its activity, is then infused. Where SQP33 meets SQL70 the two react (a click reaction), the prodrug is captured at the tumour and native doxorubicin is released there.",
    mechanismSteps: [
      "SQL70, a biopolymer carrying tetrazine groups, is injected into one tumour on day 1 of a 21-day cycle.",
      "SQP33, a capped and much less active form of doxorubicin, is infused into a vein each day for three or five days.",
      "SQP33 that reaches the biopolymer reacts with it and is held at the tumour.",
      "The cap comes away and ordinary doxorubicin is released at that site.",
    ],
    status: "phase-2", asOf, provenance, tags: ["failure"],
    approvals: [],
    dosing: { route: "SQL70 by injection into a single tumour; SQP33 by intravenous infusion", schedule: "In the trial: 10 or 20 mL of SQL70 on day 1 of each 21-day cycle, with SQP33 on days 1 to 5 (8 to 315 mg/m2 a day in dose escalation), or on days 1 to 3 in one phase 2a group. Recommended phase 2 dose posted on the registry: 1250 mg/m2 of SQP33 per cycle.", source: CTGOV_RESULTS },
    tldr: "SQ3370 is an experimental two-part treatment from Shasqi: a gel injected into a tumour, then an inactive form of the chemotherapy drug doxorubicin given into a vein, which the gel switches on. In its one trial, very high doses caused no dose-limiting side effects, but tumours responded no more often than with ordinary doxorubicin and the trial was stopped. It is not approved anywhere.",
    summary: "SQ3370 is the first product of Shasqi's click-activated prodrug platform and, according to the company and the paper reporting it, the first use of click chemistry inside the human body in a clinical setting. It has two components that are given separately: SQL70, a tetrazine-modified hyaluronate biopolymer injected into one lesion, and SQP33, a trans-cyclooctene-modified doxorubicin prodrug infused daily. SQP33 was chosen in laboratory work from capped forms of four cytotoxic drugs.\n\nIts only registered trial is NCT04106492, a phase 1/2a open-label study at ten centres in the United States and Australia that started in August 2020 and enrolled 53 people. Phase 1 (39 patients with advanced solid tumours) gave doxorubicin-equivalent doses from 0.38 to 15 times the standard dose per cycle with no dose-limiting toxicity reported and, in the authors' words, mild and manageable myelosuppression; 12 times the standard dose was chosen as the recommended phase 2 dose. Active doxorubicin was released rapidly at every dose level tested, and tumour and blood samples showed expansion and activation of cytotoxic CD8 T cells.\n\nPhase 2a treated 14 patients with soft tissue sarcoma at the recommended dose. Two had an unconfirmed objective response (14.3 per cent) and ten had disease control (71.4 per cent, 95% CI 41.9 to 91.6). The authors state that the response rate was comparable to standard doxorubicin and that the study was terminated because the prespecified criterion for continuing, a response rate greater than that of standard doxorubicin, was not met. The registry gives the reason for stopping as the sponsor's decision, with primary completion on 7 September 2023.\n\nNo regulator has approved SQ3370 and no trial of it is open. Shasqi's pipeline, read on 16 November 2026, shows the biopolymer and doxorubicin programme for sarcoma as having reached the clinic and marks it \"Partnering\"; the company's June 2025 press release describes Shasqi as a preclinical company, and its newer programmes pair the same chemistry with tumour-binding proteins instead of an injected biopolymer.",
    notes: [
      "The clinical results are in a preprint (medRxiv, June 2025) that had not been peer reviewed when read; the dose-escalation part is also reported in Clinical Cancer Research (2025), and the registry posted results on 14 November 2025.",
      "The registry table counts 15 people in the phase 2a response analysis (two responses) because it includes one patient treated in a separate cohort below the recommended dose; the preprint counts 14.",
      "The company gives one standard dose as 75 mg/m2 of doxorubicin per cycle in molar equivalents (press release, 12 September 2022).",
      "No approval, designation or filing was found for SQ3370 in the sources read.",
      "Second read on 18 November 2026: the trial figures were re-read against the preprint abstract and the registry and agree, and no peer-reviewed report of the phase 2a part was found in Europe PMC. The pipeline chart's \"Partnering\" label could not be re-read as text that day (not re-verified on 18 November 2026).",
    ],
    targets: [], cancers: ["sarcoma"], companies: ["shasqi"], trials: ["nct04106492"], technologies: ["click-activated-prodrugs"],
    terms: ["prodrug", "anthracycline", "rp2d", "dose-limiting-toxicity"], related: ["doxorubicin"], people: ["sant-chawla"],
    keyPapers: [P_MEDRXIV, P_CCR, P_ADVTHER, P_CHEMSCI, P_ACS2016],
    links: [
      { label: "ClinicalTrials.gov NCT04106492, with posted results", url: CTGOV },
      { label: "Chawla et al., medRxiv 2025 (phase 1/2a results, preprint)", url: doi("10.1101/2025.06.02.25328445") },
      { label: "Srinivasan et al., Clinical Cancer Research 2025", url: doi("10.1158/1078-0432.CCR-24-2539") },
      { label: "Bui et al., ASCO 2024 abstract 11555 (phase 2a planned interim analysis)", url: doi("10.1200/JCO.2024.42.16_suppl.11555") },
      { label: "Shasqi: platform page naming SQ3370", url: PLATFORM },
      { label: "Shasqi: pipeline (read 16 November 2026)", url: "https://www.shasqi.com/pipeline" },
      { label: "Shasqi press release: first patients dosed, 14 October 2020", url: "https://www.shasqi.com/post/shasqi-announces-click-chemistry-breakthrough-with-first-ever-human-application-in-launch-of-clinical-program" },
      { label: "Shasqi press release: phase 2 opened, 12 September 2022", url: "https://www.shasqi.com/post/shasqi-advances-sq3370-to-phase-2-in-solid-tumors" },
    ],
  },
];

export const shasqiTrials: TrialInput[] = [
  {
    id: "nct04106492", kind: "trial", name: "SQ3370 in advanced solid tumours and soft tissue sarcoma (SQ3370-001, phase 1/2a)", aka: ["SQ3370-001", "Phase 1/2a Study of SQ3370 in Patients With Advanced Solid Tumors"],
    nct: "NCT04106492", phase: "1/2", status: "mixed", sponsor: "Shasqi, Inc.", enrolled: 53, started: "2020-08-01", startedType: "actual", yearReported: 2025,
    asOf, provenance, tags: ["failure"],
    setting: "Adults with locally advanced or metastatic solid tumours that could be injected (phase 1), then anthracycline-naive adults with unresectable or metastatic soft tissue sarcoma (phase 2a)",
    tldr: "Described by its investigators as the first use of click chemistry inside patients. A gel was injected into one tumour and an inactive form of doxorubicin was given into a vein, to be switched on at the gel. Doses far above the usual doxorubicin dose were tolerated, but tumours shrank in 2 of 14 sarcoma patients, no more often than with ordinary doxorubicin, and the sponsor stopped the trial.",
    summary: "A multicentre, open-label, non-randomised phase 1/2a study sponsored by Shasqi, registered in September 2019 and started on 1 August 2020 at seven centres in the United States and three in Australia. Each 21-day cycle began with 10 or 20 mL of the biopolymer SQL70 injected into a single lesion, followed by the doxorubicin prodrug SQP33 infused daily. The registry lists nine dose-escalation cohorts from 8 to 315 mg/m2 of SQP33 a day for five days with 10 mL of SQL70, two cohorts with 20 mL, one further cohort at 185 mg/m2 a day (Cohort A) and three phase 2a groups, 53 participants in all.\n\nPhase 1 set out to find the recommended phase 2 dose, which the posted results give as 1250 mg/m2 of SQP33 per cycle. The preprint reporting the whole trial describes 39 phase 1 patients treated at 0.38 to 15 times the standard doxorubicin dose with no dose-limiting toxicity, and 12 times chosen as the recommended dose.\n\nPhase 2a tested that dose in soft tissue sarcoma on three-day and five-day schedules. The registry's response table shows objective responses in 2 of 15 participants: none of 1 in a cohort below the recommended dose, 1 of 2 in the extremity sarcoma group, none of 6 on the three-day schedule and 1 of 6 on the five-day schedule. The preprint reports an unconfirmed objective response rate of 14.3 per cent (2 of 14) and disease control in 71.4 per cent (10 of 14; 95% CI 41.9 to 91.6), with tumour shrinkage in injected and non-injected lesions.\n\nThe registry records the study as terminated by the sponsor's decision, with primary completion on 7 September 2023. The preprint gives the reason: the prespecified criterion for continuing, a response rate greater than that of standard doxorubicin, was not met. Across all 53 participants the registry reports 2 deaths from any cause and 15 people with at least one serious adverse event over the one-year reporting period.",
    result: "Recommended phase 2 dose 1250 mg/m2 of SQP33 per cycle, with no dose-limiting toxicity up to 15 times the standard doxorubicin dose. In phase 2a, 2 of 14 patients with soft tissue sarcoma had an unconfirmed objective response (14.3 per cent), comparable to standard doxorubicin; the trial was stopped because its prespecified response criterion was not met.",
    outcomes: [
      { endpoint: "Recommended phase 2 dose of SQP33 (phase 1)", primary: true, unit: "mg/m2 per cycle", source: CTGOV_RESULTS,
        arms: [{ name: "Dose escalation with 10 mL SQL70", n: 30, value: 1250 }, { name: "Dose escalation with 20 mL SQL70", n: 8, value: 1250 }] },
      { endpoint: "Participants with an objective response (phase 2a, RECIST, by MRI)", unit: "participants", source: CTGOV_RESULTS,
        arms: [
          { name: "Cohort A, 185 mg/m2 a day (below the recommended dose)", n: 1, value: 0 },
          { name: "Phase 2a group 1, extremity soft tissue sarcoma", n: 2, value: 1 },
          { name: "Phase 2a group 2, three-day schedule", n: 6, value: 0 },
          { name: "Phase 2a group 2, five-day schedule", n: 6, value: 1 },
        ] },
      { endpoint: "Unconfirmed objective response rate, soft tissue sarcoma at the recommended dose (preprint)", unit: "percent", source: doi("10.1101/2025.06.02.25328445"),
        arms: [{ name: "SQ3370 phase 2a", n: 14, value: 14.3, note: "2 of 14" }] },
      { endpoint: "Disease control rate, soft tissue sarcoma at the recommended dose (preprint)", unit: "percent", source: doi("10.1101/2025.06.02.25328445"),
        arms: [{ name: "SQ3370 phase 2a", n: 14, value: 71.4, note: "10 of 14; 95% CI 41.9 to 91.6" }] },
    ],
    replication: "None. This is the only registered trial of SQ3370 and the only human study of this click-activated design; it had no comparison arm.",
    notes: [
      "The registry's stated reason for stopping is \"Sponsor's decision\"; the response criterion is the reason given in the investigators' preprint.",
      "The registry and the preprint count the phase 2a response population differently (15 and 14); both report two responses.",
      "Results were first posted on ClinicalTrials.gov on 14 November 2025. The planned interim analysis was presented at ASCO 2024 (abstract 11555), with the same response rate.",
    ],
    drugs: ["sq3370"], cancers: ["sarcoma"], companies: ["shasqi"], technologies: ["click-activated-prodrugs"],
    institutions: ["sarcoma-oncology-center", "md-anderson", "city-of-hope", "chris-obrien-lifehouse"], people: ["sant-chawla"],
    terms: ["rp2d", "dose-limiting-toxicity", "orr"], keyPapers: [P_MEDRXIV, P_CCR],
    links: [
      { label: "ClinicalTrials.gov NCT04106492", url: CTGOV },
      { label: "ClinicalTrials.gov: posted results", url: CTGOV_RESULTS },
      { label: "Chawla et al., medRxiv 2025 (preprint)", url: doi("10.1101/2025.06.02.25328445") },
      { label: "Srinivasan et al., Clinical Cancer Research 2025", url: doi("10.1158/1078-0432.CCR-24-2539") },
      { label: "Bui et al., ASCO 2024 abstract 11555", url: doi("10.1200/JCO.2024.42.16_suppl.11555") },
    ],
  },
];

type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, provenance, ...x });

export const shasqiPapers: PaperInput[] = [
  p({ id: P_CCR, name: "SQ3370 from preclinical evaluation to a first-in-human dose-escalation trial: the first click chemistry-based cancer therapeutic",
    aka: ["Development of a First-in-Class Click Chemistry-Based Cancer Therapeutic, from Preclinical Evaluation to a First-in-Human Dose Escalation Clinical Trial"],
    journal: "Clinical Cancer Research", year: 2025, doi: "10.1158/1078-0432.CCR-24-2539", pmid: "40522144",
    authors: "Srinivasan S, Yee NA, Alečković M, et al.", paperType: "translational", changedPractice: false,
    tldr: "The paper that reports the first use of click chemistry inside patients. A doxorubicin prodrug switched on at an injected tumour was given at up to 15 times the usual doxorubicin dose without the dose-limiting side effects the trial was watching for.",
    summary: "Written by Shasqi scientists with clinical co-authors including the trial's principal investigator, this paper follows SQ3370 from mouse and dog studies into the dose-escalation part of its first trial in people (NCT04106492). SQ3370 is a clickable agent placed at the tumour that reacts with a chemically attenuated doxorubicin and releases the active drug in place.\n\nIn mice it slowed tumour growth across several models, releasing doxorubicin in tumours at concentrations the authors say conventional treatment cannot reach. It was given safely at 8.9 times the veterinary doxorubicin dose in dogs and 15 times the conventional dose in patients, with no protocol-defined dose-limiting toxicity. In patients it changed the pharmacokinetics of active doxorubicin and was followed by T-cell-dependent immune responses, including expansion and activation of cytotoxic CD8 T cells in tumours and in the blood.\n\nThe abstract reports safety, drug levels and immune changes. It gives no response rate; the efficacy results of the same trial are in a separate preprint.",
    findings: [
      "No protocol-defined dose-limiting toxicity in patients at up to 15 times the conventional doxorubicin dose.",
      "Given safely at 8.9 times the veterinary doxorubicin dose in dogs.",
      "Tumour progression was inhibited in several mouse tumour models, with doxorubicin released in tumours at concentrations described as unachievable by conventional treatment.",
      "In patients, cytotoxic CD8 T cells expanded and were activated in tumours and systemically.",
    ],
    whatItMeans: "It establishes that a click reaction between two separately given substances can be run inside a person, and that capping doxorubicin this way lets far more of it be given. It does not establish that patients do better: the abstract reports no tumour responses, and the trial's phase 2a part later found a response rate comparable to standard doxorubicin.",
    caveats: [
      "Figures are from the abstract; the full text was not read.",
      "Dose escalation only, with no comparison arm. Company-authored; Europe PMC lists US National Cancer Institute grant R44 CA261573 as support.",
      "An earlier preprint from the same group (bioRxiv, 10.1101/2023.03.28.534654) reported the interim position, 12 times the conventional dose, in March 2023.",
    ],
    drugs: ["sq3370"], trials: ["nct04106492"], companies: ["shasqi"], technologies: ["click-activated-prodrugs"], cancers: ["sarcoma"], people: ["sant-chawla"], journals: ["clinical-cancer-research"],
    links: [{ label: "Clin Cancer Res 2025", url: doi("10.1158/1078-0432.CCR-24-2539") }, { label: "PubMed", url: pubmed("40522144") }, { label: "Europe PMC (free full text)", url: "https://europepmc.org/article/MED/40522144" }, { label: "ClinicalTrials.gov NCT04106492", url: CTGOV }] }),

  p({ id: P_MEDRXIV, name: "SQ3370 phase 1/2a results in advanced solid tumours and soft tissue sarcoma (preprint)",
    aka: ["A first-in-human, Phase 1/2a, open-label study of SQ3370, a first-in-class doxorubicin-based click chemistry therapeutic, in patients with advanced solid tumors"],
    journal: "medRxiv", year: 2025, doi: "10.1101/2025.06.02.25328445",
    authors: "Chawla SP, Abella E, Wieland S, et al.", paperType: "observational", changedPractice: false, participants: 53,
    tldr: "The full clinical results of the only trial of SQ3370, posted before peer review. The treatment was well tolerated at very high doses, but 2 of 14 sarcoma patients responded, about what ordinary doxorubicin achieves, and the trial was stopped.",
    summary: "A preprint, posted on medRxiv on 3 June 2025 and not peer reviewed when read, reporting both parts of NCT04106492. Treatment was an injection of the biopolymer SQL70 into a tumour followed by three or five consecutive daily infusions of the doxorubicin prodrug SQP33. The primary endpoints were treatment-emergent adverse events, dose-limiting toxicities and the recommended phase 2 dose; pharmacokinetics, efficacy and immune profiling were secondary.\n\nPhase 1 enrolled 39 patients. SQ3370 at 0.38 to 15 times the standard doxorubicin dose was well tolerated, with no dose-limiting toxicity reported and mild and manageable myelosuppression. Doxorubicin was released rapidly at every dose level, with exposure rising up to 15 times the standard dose, and 12 times was selected as the recommended phase 2 dose.\n\nPhase 2a enrolled 14 patients with soft tissue sarcoma at that dose. The unconfirmed objective response rate was 14.3 per cent (2 of 14) and the disease control rate 71.4 per cent (10 of 14; 95% CI 41.9 to 91.6). Immune profiling showed expansion and activation of cytotoxic CD8 T cells, and tumours shrank in non-injected as well as injected lesions. The study was terminated because the prespecified criterion for continuing, an objective response rate greater than that of standard doxorubicin, was not met.",
    findings: [
      "Phase 1: 39 patients, 0.38 to 15 times the standard doxorubicin dose, no dose-limiting toxicities; 12 times the standard dose chosen as the recommended phase 2 dose.",
      "Phase 2a: unconfirmed objective response rate 14.3 per cent (2 of 14 patients with soft tissue sarcoma).",
      "Phase 2a: disease control rate 71.4 per cent (10 of 14; 95% CI 41.9 to 91.6).",
      "The study was terminated because the prespecified criterion of a response rate greater than standard doxorubicin was not met.",
    ],
    whatItMeans: "For a person with sarcoma, this is a treatment that was easier to tolerate than its dose would suggest but did not work better than doxorubicin in the small group tested, and it is not available. For the field, it is the human proof that click activation works as chemistry, which is why the company has moved to versions guided by tumour-binding proteins.",
    caveats: [
      "A preprint: not peer reviewed when read on 16 November 2026. Figures are from its abstract.",
      "Responses were unconfirmed, the phase 2a group was 14 people and there was no comparison arm; \"comparable to standard doxorubicin\" is the authors' comparison with historical figures.",
      "Authors include Shasqi employees and the company sponsored the trial.",
    ],
    drugs: ["sq3370"], trials: ["nct04106492"], companies: ["shasqi"], technologies: ["click-activated-prodrugs"], cancers: ["sarcoma"], people: ["sant-chawla"], journals: ["medrxiv"],
    links: [{ label: "medRxiv 2025 (preprint)", url: doi("10.1101/2025.06.02.25328445") }, { label: "Europe PMC", url: "https://europepmc.org/article/PPR/PPR1030310" }, { label: "ClinicalTrials.gov NCT04106492", url: CTGOV }] }),

  p({ id: P_ADVTHER, name: "SQ3370 in mice with two tumours: responses in the injected and the non-injected lesion",
    aka: ["SQ3370 Activates Cytotoxic Drug via Click Chemistry at Tumor and Elicits Sustained Responses in Injected and Non-Injected Lesions"],
    journal: "Advanced Therapeutics", year: 2021, doi: "10.1002/adtp.202000243", pmid: "33869738",
    authors: "Srinivasan S, Yee NA, Wu K, et al.", paperType: "translational", changedPractice: false,
    tldr: "A mouse study from Shasqi. The biopolymer was injected into one of two tumours and the doxorubicin prodrug given into the blood; both tumours responded and the mice lived longer.",
    summary: "A preclinical study of SQ3370 in mice bearing two tumours, of which only one was injected with the biopolymer before systemic doses of the attenuated doxorubicin prodrug. SQ3370 was well tolerated at 5.9 times the maximum dose of conventional doxorubicin, increased survival by 63 per cent and produced an anti-tumour response against both the injected and the non-injected lesion. The sustained response correlated with immune activation measured at both lesions, and the authors suggest the approach could help patients with micro-metastatic disease.",
    findings: [
      "Well tolerated in mice at 5.9 times the maximum dose of conventional doxorubicin.",
      "Survival increased by 63 per cent.",
      "Anti-tumour response against injected and non-injected lesions, correlated with immune activation at both.",
    ],
    whatItMeans: "This is the animal evidence behind the hope that treating one injectable tumour could help disease elsewhere. In the human trial that followed, shrinkage of non-injected lesions was seen, but the overall response rate was no higher than with standard doxorubicin.",
    caveats: ["Mouse models only. Figures are from the abstract; the comparison group for the survival figure is not stated there.", "Led by Shasqi authors."],
    drugs: ["sq3370"], companies: ["shasqi"], technologies: ["click-activated-prodrugs"],
    links: [{ label: "Adv Ther 2021", url: doi("10.1002/adtp.202000243") }, { label: "PubMed", url: pubmed("33869738") }, { label: "Europe PMC (free full text)", url: "https://europepmc.org/article/MED/33869738" }] }),

  p({ id: P_CHEMSCI, name: "Click Activated Protodrugs Against Cancer: local capture and activation of capped chemotherapy by a tetrazine biopolymer",
    aka: ["Click activated protodrugs against cancer increase the therapeutic potential of chemotherapy through local capture and activation"],
    journal: "Chemical Science", year: 2021, doi: "10.1039/d0sc06099b", pmid: "34163888",
    authors: "Wu K, Yee NA, Srinivasan S, et al.", paperType: "basic", changedPractice: false,
    tldr: "The chemistry paper behind SQ3370. It describes the injected biopolymer and four capped chemotherapy drugs, and explains why the doxorubicin one, SQP33, was taken forward.",
    summary: "From the University at Albany and Shasqi, this paper sets out the platform: a tetrazine-modified sodium hyaluronate biopolymer injected at a tumour, then systemic doses of a trans-cyclooctene (TCO)-modified cytotoxic prodrug of attenuated activity. The prodrug is captured by the biopolymer through an inverse electron-demand Diels-Alder reaction between tetrazine and TCO and then converted to the active drug at the site, independent of biomarker expression, enzymatic activity, pH or oxygen level.\n\nTCO-modified forms of doxorubicin, paclitaxel, etoposide and gemcitabine were made. On cytotoxicity, solubility, stability and activation in the laboratory, the doxorubicin prodrug SQP33 was the most promising. In mice, the maximum tolerated dose of SQP33 with locally injected biopolymer (SQL70) was 19.1 times that of conventional doxorubicin. In rats, one injection of SQL70 captured several SQP33 doses given cumulatively at 10.8 times the maximum tolerated dose of conventional doxorubicin, with greatly reduced systemic toxicity. The combination, named SQ3370, showed anti-tumour activity in a syngeneic mouse model.",
    findings: [
      "Four cytotoxic drugs (doxorubicin, paclitaxel, etoposide, gemcitabine) were made as TCO-modified prodrugs; the doxorubicin prodrug SQP33 was selected.",
      "In mice, the maximum tolerated dose of SQP33 with the injected biopolymer SQL70 was 19.1 times that of conventional doxorubicin.",
      "In rats, a single SQL70 injection captured multiple SQP33 doses given cumulatively at 10.8 times the maximum tolerated dose of conventional doxorubicin.",
    ],
    whatItMeans: "It names the two components of SQ3370 and the reaction that joins them, and shows the design is modular: the same activator can switch on different capped drugs.",
    caveats: ["Laboratory and animal work only; figures are from the abstract.", "A correction notice was published for this paper (10.1039/d1sc90098f); its content was not read."],
    drugs: ["sq3370"], companies: ["shasqi"], technologies: ["click-activated-prodrugs"],
    links: [{ label: "Chem Sci 2021", url: doi("10.1039/d0sc06099b") }, { label: "PubMed", url: pubmed("34163888") }, { label: "Europe PMC (free full text)", url: "https://europepmc.org/article/MED/34163888" }] }),

  p({ id: P_ACS2016, name: "Local drug activation by bioorthogonal chemistry: an implanted hydrogel and a systemic doxorubicin prodrug in a sarcoma xenograft",
    aka: ["In Vivo Bioorthogonal Chemistry Enables Local Hydrogel and Systemic Pro-Drug To Treat Soft Tissue Sarcoma"],
    journal: "ACS Central Science", year: 2016, doi: "10.1021/acscentsci.6b00150", pmid: "27504494",
    authors: "Mejia Oneto JM, Khan I, Seebald L, Royzen M", paperType: "basic", changedPractice: false,
    tldr: "The first demonstration, in mice, of the idea that became SQ3370: a material placed beside a tumour switches on a doxorubicin prodrug given into the blood.",
    summary: "Shasqi's founder and collaborators present an approach they name local drug activation: bioorthogonal chemistry is used to concentrate and activate a systemic small molecule at a chosen place. The method does not depend on cellular or environmental markers, only on a biomaterial implanted beforehand near the site. In mice carrying xenografts of HT1080, a soft tissue sarcoma line, a doxorubicin prodrug activated this way gave a clear therapeutic benefit over systemic therapy with minimal side effects.",
    findings: ["In mice with HT1080 soft tissue sarcoma xenografts, a doxorubicin prodrug activated at a pre-implanted biomaterial outperformed systemic therapy with minimal side effects; the abstract gives no figures."],
    whatItMeans: "This is the origin of the approach, published four years before the first patient was treated.",
    caveats: ["One xenograft model in mice; the abstract states no numbers.", "Funded by Shasqi."],
    companies: ["shasqi"], technologies: ["click-activated-prodrugs"],
    links: [{ label: "ACS Cent Sci 2016", url: doi("10.1021/acscentsci.6b00150") }, { label: "PubMed", url: pubmed("27504494") }, { label: "Europe PMC (free full text)", url: "https://europepmc.org/article/MED/27504494" }] }),

  p({ id: P_ACS2023, name: "A click-activated MMAE prodrug switched on by an injected biopolymer or by a HER2-binding antibody fragment",
    aka: ["Click Chemistry Selectively Activates an Auristatin Protodrug with either Intratumoral or Systemic Tumor-Targeting Agents"],
    journal: "ACS Central Science", year: 2023, doi: "10.1021/acscentsci.3c00365", pmid: "37521794",
    authors: "McFarland JM, Alečković M, Coricor G, et al.", paperType: "basic", changedPractice: false,
    tldr: "A mouse study showing the same chemistry can be steered by a tumour-seeking protein instead of an injection, and can switch on MMAE, a toxin too harsh to give on its own.",
    summary: "Shasqi extends its platform in two directions. The drug is monomethyl auristatin E (MMAE), modified with a trans-cyclooctene to form the prodrug SQP22, which reduced its cytotoxicity in cells and in animals. The activator is either the tetrazine-modified hyaluronate SQL70 injected into the tumour, or SQT01, a tetrazine-modified HER2-targeting antigen-binding fragment given by infusion.\n\nSQP22 with SQL70 had anti-tumour effects in the Karpas 299 and RENCA mouse models and showed that the click reaction was required for activation. SQP22 with SQT01 had anti-tumour effects in the HER2-positive NCI-N87 xenograft, showing that activation at the tumour could be achieved with both components given systemically. Toxicity was limited to transient myelosuppression and moderate loss of body weight.",
    findings: [
      "Capping MMAE with a trans-cyclooctene (SQP22) reduced its cytotoxicity in vitro and in vivo.",
      "SQP22 with intratumoral SQL70 showed anti-tumour effects in Karpas 299 and RENCA models.",
      "SQP22 with the systemically given HER2-binding fragment SQT01 showed anti-tumour effects in the HER2-positive NCI-N87 xenograft.",
    ],
    whatItMeans: "It is the published basis for the antigen-targeted programmes on Shasqi's pipeline, which no longer need a tumour that can be injected. None of these has been tested in people.",
    caveats: ["Mouse models only; the abstract gives no effect sizes.", "Funded and authored by Shasqi."],
    companies: ["shasqi"], technologies: ["click-activated-prodrugs"], targets: ["her2"], terms: ["mmae"],
    links: [{ label: "ACS Cent Sci 2023", url: doi("10.1021/acscentsci.3c00365") }, { label: "PubMed", url: pubmed("37521794") }, { label: "Europe PMC (free full text)", url: "https://europepmc.org/article/MED/37521794" }] }),

  p({ id: P_ACTA, name: "An implantable biomaterial that captures small molecules by click chemistry in the body",
    aka: ["Implantable biomaterial based on click chemistry for targeting small molecules"],
    journal: "Acta Biomaterialia", year: 2014, doi: "10.1016/j.actbio.2014.08.019", pmid: "25162537",
    authors: "Mejía Oneto JM, Gupta M, Leach JK, et al.", paperType: "basic", changedPractice: false,
    tldr: "The earliest paper in the line of work behind Shasqi: an implanted material that pulls a matching small molecule out of the bloodstream by a click reaction.",
    summary: "The first author, who later founded Shasqi, gives the Department of Orthopaedic Surgery at the University of California, Davis, as his affiliation. The paper presents an implantable biomaterial that uses click chemistry in the body to enhance the delivery of suitable small molecules by an order of magnitude, and shows a polysaccharide being modified hours after it was implanted. The authors describe it as a first step towards a biomaterial that fixes where a systemically given small molecule ends up. It is not a cancer study.",
    findings: ["An implanted, click-reactive biomaterial enhanced the delivery of suitable small molecules to its site by an order of magnitude."],
    whatItMeans: "It shows the capture step working in an animal before any drug was attached to the idea.",
    caveats: ["Not a cancer or drug-efficacy study; figures are from the abstract."],
    companies: ["shasqi"], technologies: ["click-activated-prodrugs"],
    links: [{ label: "Acta Biomater 2014", url: doi("10.1016/j.actbio.2014.08.019") }, { label: "PubMed", url: pubmed("25162537") }] }),
];
