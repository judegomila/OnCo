import type { PrecisionRow, Source } from "./types";

/**
 * Precision matrix rows for molecular detection and matching: blood tests for residual disease, genomic profiling
 * and the matching it promises, plasma against tissue, the tumour-agnostic thresholds, multi-cancer screening and
 * marrow residual disease in blood cancers. See ./types.ts for the rules every row is held to.
 *
 * Every figure and every `quote` below was read from the Europe PMC abstract of the paper cited beside it on
 * 20 October 2026, each identifier resolved there by DOI first, and each quote checked against that raw text by
 * exact string match. The one exception is the clonoSEQ row, whose figures and quote come from the FDA's De Novo
 * decision summary DEN170080, read as a PDF. Where an abstract did not give a number (the limit of detection of the
 * commercial tumour-informed assays, for example) the row says so rather than printing one.
 *
 * The questions these rows keep separating, because readers and marketing both run them together: whether a test
 * finds the cancer (analytical and clinical validity), and whether acting on what it finds helps (clinical utility).
 * The first is well shown for residual-disease tests in many cancers; the second has been shown in a small number
 * of randomised trials and refuted in others, and each row says which.
 */

const doi = (label: string, d: string, quote?: string): Source => (quote ? { label, url: `https://doi.org/${d}`, quote } : { label, url: `https://doi.org/${d}` });

// Residual disease after curative treatment
const TRACERX_CTDNA_2023 = "10.1038/s41586-023-05776-4";
const ZVIRAN_2020 = "10.1038/s41591-020-0915-3";
const CTRAK_TN_2023 = "10.1016/j.annonc.2022.11.005";
const CTRAK_TISSUE_FREE_2026 = "10.1001/jamaoncol.2026.2833";
const REINERT_2019 = "10.1001/jamaoncol.2019.0528";
const AVANZINI_2020 = "10.1126/sciadv.abc4308";
const DYNAMIC_2022 = "10.1056/NEJMoa2200075";
const DYNAMIC_2025 = "10.1038/s41591-025-03579-w";
const DYNAMIC_III_2025 = "10.1038/s41591-025-04030-w";
const IMVIGOR011_2025 = "10.1056/NEJMoa2511885";
const ESMO_CTDNA_2022 = "10.1016/j.annonc.2022.05.520";
// What limits plasma
const BETTEGOWDA_2014 = "10.1126/scitranslmed.3007094";
const CRISTIANO_2019 = "10.1038/s41586-019-1272-6";
const RAZAVI_2019 = "10.1038/s41591-019-0652-7";
const JENSEN_2021 = "10.1001/jamaoncol.2020.5161";
const WYATT_2017 = "10.1093/jnci/djx118";
const LEIGHL_2019 = "10.1158/1078-0432.CCR-19-0624";
// Profiling and matching
const NCI_MATCH_2020 = "10.1200/JCO.19.03010";
const NCI_MATCH_2023 = "10.1038/s41591-023-02379-4";
const ZEHIR_2017 = "10.1038/nm.4333";
const TARGET_2019 = "10.1038/s41591-019-0380-z";
const MARQUART_2018 = "10.1001/jamaoncol.2018.1660";
const SHIVA_2015 = "10.1016/S1470-2045(15)00188-6";
const KYT_2020 = "10.1016/S1470-2045(20)30074-7";
// Tumour-agnostic thresholds
const KEYNOTE158_TMB_2020 = "10.1016/S1470-2045(20)30445-9";
const MERINO_2020 = "10.1136/jitc-2019-000147";
const MCGRAIL_2021 = "10.1016/j.annonc.2021.02.006";
const MYPATHWAY_TMB_2022 = "10.1158/2159-8290.CD-21-0450";
const COHEN_MSI_2019 = "10.1001/jamaoncol.2018.4942";
const KEYNOTE158_MSI_2022 = "10.1016/j.annonc.2022.05.519";
// Multi-cancer early detection
const CCGA3_2021 = "10.1016/j.annonc.2021.05.806";
const PATHFINDER_2023 = "10.1016/S0140-6736(23)01700-2";
const NHS_GALLERI_2026 = "10.1038/s41591-026-04652-8";
// Marrow residual disease
const CLONOSEQ_DEN170080 = "https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN170080.pdf";
const MUNSHI_2017 = "10.1001/jamaoncol.2016.3160";
const IMWG_2016 = "10.1016/S1470-2045(16)30206-6";

export const rows: PrecisionRow[] = [
  {
    id: "ctdna-mrd-landmark-sensitivity",
    domain: "molecular",
    label: "ctDNA residual disease tests after surgery: how many relapses one blood sample catches",
    technologyIds: ["mrd-testing", "ctdna-mrd-positive", "tumour-informed-assay"],
    metric: "Share of patients who later relapse whose circulating tumour DNA was detected in a blood sample taken in the weeks after surgery, per cent",
    today: {
      value: "49 per cent of the patients who relapsed had detectable ctDNA in plasma taken within 120 days of surgery; 25 per cent of all patients tested positive",
      context: "197 patients with resected non-small-cell lung cancer in TRACERx, tracking a median of 200 mutations chosen from each patient's own tumour (Abbosh 2023)",
      source: doi("Abbosh et al., Nature 2023: tracking early lung cancer metastatic dissemination in TRACERx using ctDNA", TRACERX_CTDNA_2023, "Landmark analyses of plasma samples collected within 120 days after surgery revealed ctDNA detection in 25% of patients, including 49% of all patients who experienced clinical relapse"),
    },
    limits: [
      { kind: "biology", text: "Some tumours shed too little DNA to be found even before surgery. In TRACERx, the lung adenocarcinomas with no ctDNA before the operation were the slow-growing ones with good outcomes, which is reassuring for them and means the test has nothing to follow afterwards.", source: doi("Abbosh et al., Nature 2023 (TRACERx)", TRACERX_CTDNA_2023, "A lack of preoperative ctDNA detection distinguished biologically indolent lung adenocarcinoma with good clinical outcome") },
      { kind: "sampling", text: "A single tube of blood holds a limited number of DNA fragments, so at very low tumour fraction there may be no tumour fragment in the sample to find, however deep the sequencing.", source: doi("Zviran et al., Nat Med 2020: genome-wide cell-free DNA mutational integration", ZVIRAN_2020, "the combination of low tumor fraction (TF) and limited number of DNA fragments restricts low-disease-burden monitoring through the prevailing deep targeted sequencing paradigm") },
      { kind: "sampling", text: "Negative results are not all-clear results. In c-TRAK TN, seven women with triple-negative breast cancer relapsed without ctDNA ever being detected on three-monthly digital PCR testing.", source: doi("Turner et al., Ann Oncol 2023: results of the c-TRAK TN trial", CTRAK_TN_2023, "Seven patients relapsed without prior ctDNA detection.") },
    ],
    nextStep: {
      text: "Testing repeatedly rather than once. In TRACERx, sampling every three to six months after a negative landmark test found impending relapse in a further fifth of patients; in colorectal cancer, serial testing found 14 of 16 relapses.",
      status: "available-not-routine",
      source: doi("Abbosh et al., Nature 2023 (TRACERx)", TRACERX_CTDNA_2023, "3 to 6 monthly ctDNA surveillance identified impending disease relapse in an additional 20% of landmark-negative patients"),
      relatedIds: ["continuous-ctdna-monitoring", "paper-reinert-ctdna-ultradeep-sequencing-colorectal-jama-oncol-2019"],
    },
    buys: {
      text: "Earlier warning of relapse for more people. Whether that warning changes the outcome depends on having a treatment that works at that point, which has been shown in one setting (see the row on ctDNA-triggered treatment) and not in general. The ESMO working group's 2022 position was that residual disease detection had high clinical validity and no proven clinical utility.",
      outcome: "not-established",
      source: doi("Pascual et al., Ann Oncol 2022: ESMO recommendations on the use of circulating tumour DNA assays", ESMO_CTDNA_2022, "Molecular residual disease/molecular relapse detection cannot be recommended in routine clinical practice, as currently there is no evidence for clinical utility in directing treatment."),
    },
    relatedIds: ["tracerx", "c-trak-tn", "ctdna-tests", "b-dormancy-mrd", "paper-turner-c-trak-tn-ctdna-pembrolizumab-ann-oncol-2023", "paper-abbosh-tracerx-ctdna-relapse-nature-2023", "paper-esmo-ctdna-assay-recommendations-ann-oncol-2022"],
  },
  {
    id: "ctdna-limit-of-detection",
    domain: "molecular",
    label: "How little tumour DNA a blood test can see: from tracking a few mutations to reading the whole genome",
    technologyIds: ["mrd-testing", "ctdna-tumour-fraction", "tumour-informed-assay"],
    metric: "Lowest tumour fraction detectable in plasma, as a share of all cell-free DNA (10⁻⁵ is one tumour fragment in 100,000)",
    limits: [
      { kind: "sampling", text: "Deep sequencing of a small panel runs out of molecules before it runs out of depth: the number of fragments in the tube, not the sequencer, sets the floor. OnCo did not find a peer-reviewed abstract stating the limit of detection of each commercial tumour-informed assay in comparable units, so no figure is printed for today's tests.", source: doi("Zviran et al., Nat Med 2020", ZVIRAN_2020, "the combination of low tumor fraction (TF) and limited number of DNA fragments restricts low-disease-burden monitoring through the prevailing deep targeted sequencing paradigm") },
      { kind: "workflow", text: "Tracking more mutations finds ctDNA sooner. In c-TRAK TN, a whole-exome-informed multivariant assay detected ctDNA before digital PCR or the tissue-free assay in 12 of 41 patients found by both.", source: doi("c-TRAK TN tissue-free analysis, JAMA Oncol 2026", CTRAK_TISSUE_FREE_2026, "Among patients detected by both assays (41 of 133), 12 of 41 (29.3%) had ctDNA detected earlier by multivariant tumor-informed assay with 1 (2.4%) earlier by the tissue-free assay.") },
    ],
    nextStep: {
      text: "Whole-genome sequencing of cell-free DNA, which adds up the signal from thousands of a tumour's mutations instead of reading a few very deeply, reached a tumour fraction of 10⁻⁵ in the 2020 proof of principle.",
      status: "research",
      source: doi("Zviran et al., Nat Med 2020", ZVIRAN_2020, "Whole-genome sequencing (WGS) of cfDNA allowed ultra-sensitive detection, capitalizing on the cumulative signal of thousands of somatic mutations observed in solid malignancies, with TF detection sensitivity as low as 10-5."),
      relatedIds: ["ngs", "fragmentomics"],
    },
    buys: {
      text: "Fewer false reassurances after surgery and earlier detection of relapse. In DYNAMIC, a newer assay tracking an average of 29 mutations a patient separated those whose ctDNA cleared after chemotherapy (97 per cent five-year recurrence-free) from those whose did not (none), in a post hoc analysis. Whether the extra sensitivity changes outcomes has not been tested.",
      outcome: "plausible",
      source: doi("Tie et al., Nat Med 2025: DYNAMIC five-year outcomes", DYNAMIC_2025, "post hoc analysis of ctDNA clearance at EOT assessed by a new assay that evaluated an average of 29 tumor-derived mutations per patient predicted for a favorable 5-year recurrence-free probability of 97% versus 0% for ctDNA persistence"),
    },
    relatedIds: ["cfdna", "ctdna", "paper-dynamic-nat-med-2025-update", "paper-zviran-whole-genome-cfdna-residual-disease-nat-med-2020"],
  },
  {
    id: "ctdna-lead-time-over-imaging",
    domain: "molecular",
    label: "How far ahead of scans a ctDNA test warns of relapse",
    technologyIds: ["mrd-testing", "ctdna-mrd-positive", "continuous-ctdna-monitoring"],
    metric: "Time between first ctDNA detection and relapse seen clinically or on imaging, months",
    today: {
      value: "Mean 8.7 months ahead of standard imaging (range 0.8 to 16.5) in colorectal cancer; median 7.9 months ahead of clinical relapse in early breast cancer",
      context: "125 patients with stage I to III colorectal cancer in Denmark tested every three months (Reinert 2019); 55 women with early breast cancer after neoadjuvant chemotherapy (Garcia-Murillas 2015)",
      source: doi("Reinert et al., JAMA Oncol 2019: ultradeep sequencing of plasma cell-free DNA in stage I to III colorectal cancer", REINERT_2019, "Serial ctDNA analyses revealed disease recurrence up to 16.5 months ahead of standard-of-care radiologic imaging (mean, 8.7 months; range, 0.8-16.5 months)."),
    },
    limits: [
      { kind: "sampling", text: "Lead time over symptoms is not lead time over a scan. When c-TRAK TN acted on a positive result by scanning, 23 of 32 women already had metastases that imaging could see.", source: doi("Turner et al., Ann Oncol 2023 (c-TRAK TN)", CTRAK_TN_2023, "Of patients allocated to intervention, 72% (23/32) had metastases on staging at the time of ctDNA+") },
      { kind: "sampling", text: "Testing every three months leaves gaps in which a relapse can grow. The c-TRAK TN investigators concluded that testing has to start earlier and be more sensitive or more frequent.", source: doi("Turner et al., Ann Oncol 2023 (c-TRAK TN)", CTRAK_TN_2023, "emphasising the importance of commencing ctDNA testing early, with more sensitive and/or frequent ctDNA testing regimes") },
    ],
    nextStep: {
      text: "Monthly, tumour-informed testing. A mathematical model fitted to 176 patients with stage I to III lung cancer predicted it would detect relapse at a median tumour size of 0.83 cm, about 140 days before imaging; this is a model prediction, not a trial result.",
      status: "research",
      source: doi("Avanzini et al., Sci Adv 2020: a mathematical model of ctDNA shedding predicts tumour detection size", AVANZINI_2020, "For informed monthly cancer relapse testing, the model predicts a median detection size of 0.83 cm and suggests that treatment failure can be detected 140 days earlier than with imaging-based approaches."),
      relatedIds: ["mrd-kinetics-models"],
    },
    buys: {
      text: "Months of warning, which help only if treatment given in those months works better than treatment given at visible relapse. In c-TRAK TN, none of the five women who started pembrolizumab on a positive result cleared their ctDNA for good.",
      outcome: "not-established",
      source: doi("Turner et al., Ann Oncol 2023 (c-TRAK TN)", CTRAK_TN_2023, "Of the five patients who commenced pembrolizumab, none achieved sustained ctDNA clearance."),
    },
    relatedIds: ["c-trak-tn", "paper-garcia-murillas-ctdna-mutation-tracking-stm-2015", "paper-reinert-ctdna-ultradeep-sequencing-colorectal-jama-oncol-2019"],
  },
  {
    id: "ctdna-tissue-free-versus-tumour-informed",
    domain: "molecular",
    label: "Tumour-informed against tissue-free residual disease tests",
    technologyIds: ["tumour-informed-assay", "mrd-testing"],
    metric: "Median lead time from ctDNA detection to recurrence, months, by type of assay in the same patients",
    today: {
      value: "7.6 months with a methylation-based tissue-free assay against 7.1 months with a whole-exome-informed multivariant assay, a difference that was not statistically significant",
      context: "159 women with moderate- to high-risk triple-negative breast cancer sampled every three months in c-TRAK TN, 1,026 plasma samples (JAMA Oncol 2026)",
      source: doi("Tissue-free versus tumour-informed ctDNA assays in early triple-negative breast cancer, JAMA Oncol 2026", CTRAK_TISSUE_FREE_2026, "Median lead times to recurrence were 7.6 (95% CI, 4.6-10.5) months with tissue-free and 7.1 (95% CI, 5.7-10.0) months with multivariant tumor-informed assay (HR, 1.46; 95% CI, 0.87-2.44; P = .15)."),
    },
    limits: [
      { kind: "workflow", text: "Tumour-informed tests need a tumour sample to build the panel. In c-TRAK TN, 208 women registered, 185 had tumour sequenced and 171 had mutations that could be tracked.", source: doi("Turner et al., Ann Oncol 2023 (c-TRAK TN)", CTRAK_TN_2023, "Two hundred and eight patients registered between 30 January 2018 and 06 December 2019, 185 had tumour sequenced, 171 (92.4%) had trackable mutations") },
      { kind: "biology", text: "Tissue-free tests cannot check a plasma signal against the tumour, so they must tell cancer DNA from blood-cell DNA some other way; most plasma mutations in people without cancer come from clonal haematopoiesis (see that row).", source: doi("Razavi et al., Nat Med 2019: high-intensity sequencing reveals the sources of plasma cell-free DNA variants", RAZAVI_2019, "The vast majority of cfDNA mutations (81.6% in controls and 53.2% in patients with cancer) had features consistent with clonal hematopoiesis.") },
    ],
    nextStep: {
      text: "Tissue-free testing in trials for patients with no usable tumour sample, which the c-TRAK TN authors say their data support.",
      status: "in-trials",
      source: doi("c-TRAK TN tissue-free analysis, JAMA Oncol 2026", CTRAK_TISSUE_FREE_2026, "Comparable lead times between the tissue-free and multivariant tumor-informed assays support tissue-free MRD detection in a clinical trial setting, permitting ctDNA testing when tissue is not available."),
    },
    buys: {
      text: "Access to residual disease testing for people whose tumour tissue is used up, too small or unavailable, and a first result without waiting for a bespoke panel. Shown in one cancer and one trial cohort so far.",
      outcome: "plausible",
    },
    relatedIds: ["c-trak-tn", "paper-ctrak-tn-tissue-free-mrd-jamaoncol-2026", "signatera", "guardant-reveal"],
  },
  {
    id: "ctdna-negative-de-escalation",
    domain: "molecular",
    label: "Using a negative ctDNA result to spare chemotherapy after bowel cancer surgery",
    technologyIds: ["mrd-testing", "ctdna-mrd-positive"],
    metric: "Share of patients given adjuvant chemotherapy, per cent, and the difference in recurrence-free survival against standard care, percentage points",
    today: {
      value: "Chemotherapy given to 15 per cent with ctDNA-guided care against 28 per cent with standard care; two-year recurrence-free survival 93.5 against 92.4 per cent, meeting non-inferiority; five-year overall survival 93.8 against 93.3 per cent",
      context: "455 patients with stage II colon cancer randomised 2:1 in DYNAMIC, followed for a median of 37 months and then 59.7 months (Tie 2022, 2025)",
      source: doi("Tie et al., NEJM 2022: DYNAMIC", DYNAMIC_2022, "A lower percentage of patients in the ctDNA-guided group than in the standard-management group received adjuvant chemotherapy (15% vs. 28%; relative risk, 1.82; 95% confidence interval [CI], 1.25 to 2.65)."),
    },
    limits: [
      { kind: "biology", text: "A negative test lowers the risk of recurrence without removing it: in DYNAMIC, three-year recurrence-free survival among untreated ctDNA-negative patients was 92.5 per cent.", source: doi("Tie et al., NEJM 2022: DYNAMIC", DYNAMIC_2022, "Three-year recurrence-free survival was 86.4% among ctDNA-positive patients who received adjuvant chemotherapy and 92.5% among ctDNA-negative patients who did not.") },
      { kind: "biology", text: "The result did not carry over to stage III. In DYNAMIC-III, de-escalating ctDNA-negative patients cut oxaliplatin use and hospital admissions but recurrence-free survival was slightly lower and the trial did not meet its non-inferiority margin.", source: doi("Tie et al., Nat Med 2025: DYNAMIC-III", DYNAMIC_III_2025, "In ctDNA-negative patients, de-escalation reduced oxaliplatin use (34.8% versus 88.6%) and hospitalizations (8.5% versus 13.2%) but yielded slightly lower RFS than standard management (85.3% versus 88.1%), not meeting the non-inferiority margin.") },
    ],
    nextStep: {
      text: "Using the amount of ctDNA, not just its presence, to grade risk among positive patients: in DYNAMIC, a higher than median postoperative level carried a recurrence hazard ratio of 10.62.",
      status: "research",
      source: doi("Tie et al., Nat Med 2025: DYNAMIC five-year outcomes", DYNAMIC_2025, "A higher than median postoperative tumor-derived mutant molecules per milliliter plasma was associated with worse 5-year RFS (HR 10.62; P = 0.005)."),
      relatedIds: ["dynamic-iii", "circulate-japan"],
    },
    buys: {
      text: "For stage II colon cancer, about half as many people having chemotherapy, with no loss of recurrence-free or overall survival at five years in one randomised trial. Not shown for stage III.",
      outcome: "established",
      source: doi("Tie et al., Nat Med 2025: DYNAMIC five-year outcomes", DYNAMIC_2025, "At a median follow-up of 59.7 months, 5-year RFS was 88% and 87% with ctDNA-guided and standard management, respectively (difference 1.1%, 95% confidence interval -5.8% to 8.0%), and 5-year overall survival is similar (93.8% versus 93.3%, hazard ratio (HR) 1.05; P = 0.887)."),
    },
    relatedIds: ["dynamic", "colorectal", "paper-dynamic-nejm-2022", "paper-dynamic-nat-med-2025-update"],
  },
  {
    id: "ctdna-positive-triggered-treatment",
    domain: "molecular",
    label: "Starting treatment because a ctDNA test turned positive",
    technologyIds: ["ctdna-mrd-positive", "mrd-testing", "signatera"],
    metric: "Difference in disease-free and overall survival when treatment is given on a positive ctDNA result, hazard ratio against placebo or standard care",
    today: {
      value: "Disease-free survival hazard ratio 0.64 (median 9.9 against 4.8 months) and overall survival hazard ratio 0.59 (median 32.8 against 21.1 months) with atezolizumab against placebo",
      context: "250 people with muscle-invasive bladder cancer who turned ctDNA-positive during a year of surveillance after cystectomy, randomised 2:1 in the double-blind IMvigor011 trial (Powles 2025)",
      source: doi("Powles et al., NEJM 2025: ctDNA-guided adjuvant atezolizumab in muscle-invasive bladder cancer (IMvigor011)", IMVIGOR011_2025, "The median overall survival was 32.8 months with atezolizumab, as compared with 21.1 months with placebo (hazard ratio for death, 0.59; 95% CI, 0.39 to 0.90; P = 0.01)."),
    },
    limits: [
      { kind: "biology", text: "A positive result identifies people who need something that works; it does not make a treatment work. In DYNAMIC-III, intensified chemotherapy for ctDNA-positive stage III colon cancer gave no benefit over standard treatment.", source: doi("Tie et al., Nat Med 2025: DYNAMIC-III", DYNAMIC_III_2025, "Escalated therapy did not improve outcomes over standard management (2-year RFS 51% versus 61%).") },
      { kind: "sampling", text: "By the time three-monthly testing turned positive in triple-negative breast cancer, most women already had metastases visible on scans, so treatment would have started against established disease rather than microscopic residue.", source: doi("Turner et al., Ann Oncol 2023 (c-TRAK TN)", CTRAK_TN_2023, "Patients had a high rate of metastatic disease on ctDNA detection.") },
    ],
    nextStep: {
      text: "Randomised trials of new treatments, not more of the old ones, for ctDNA-positive disease, which is where the DYNAMIC-III authors point.",
      status: "in-trials",
      source: doi("Tie et al., Nat Med 2025: DYNAMIC-III", DYNAMIC_III_2025, "exploratory chemotherapy intensification conferred no RFS benefit, suggesting a need for novel strategies in ctDNA-positive disease"),
      relatedIds: ["idea-bio2-national-mrd-platform", "idea-ctdna-escalation-tnbc"],
    },
    buys: {
      text: "Longer survival in one setting, muscle-invasive bladder cancer treated with atezolizumab, and treatment spared for the 357 people whose tests stayed negative there (88 per cent disease-free at two years). Not shown in stage III colon cancer or triple-negative breast cancer.",
      outcome: "established",
      source: doi("Powles et al., NEJM 2025 (IMvigor011)", IMVIGOR011_2025, "Among 357 patients with persistent ctDNA-negative status, disease-free survival was 95% at the end of the 1-year monitoring period and 88% at 2 years."),
    },
    oversold: "A positive ctDNA result is sometimes presented as a reason to treat in any cancer; the randomised survival benefit so far is in bladder cancer with atezolizumab, and treating on a positive result did not help in stage III colon cancer.",
    relatedIds: ["imvigor011", "dynamic-iii", "c-trak-tn", "atezolizumab", "urothelial", "paper-imvigor011-nejm-2025"],
  },
  {
    id: "ctdna-shedding-by-cancer",
    domain: "molecular",
    label: "Which cancers a blood test can see: shedding by cancer type and stage",
    technologyIds: ["liquid-biopsy", "ctdna-tumour-fraction", "cfdna"],
    metric: "Share of patients with detectable circulating tumour DNA, per cent, by cancer type and stage",
    today: {
      value: "More than 75 per cent in advanced pancreatic, ovarian, colorectal, bladder, gastro-oesophageal, breast, melanoma, liver and head and neck cancers; under 50 per cent in primary brain, kidney, prostate and thyroid cancers; 48 to 73 per cent in localised colorectal, gastro-oesophageal, pancreatic and breast cancer",
      context: "640 patients with a range of cancers tested by digital PCR (Bettegowda 2014)",
      source: doi("Bettegowda et al., Sci Transl Med 2014: detection of circulating tumour DNA in early- and late-stage human malignancies", BETTEGOWDA_2014, "We found that ctDNA was detectable in >75% of patients with advanced pancreatic, ovarian, colorectal, bladder, gastroesophageal, breast, melanoma, hepatocellular, and head and neck cancers, but in less than 50% of primary brain, renal, prostate, or thyroid cancers."),
    },
    limits: [
      { kind: "biology", text: "Very little DNA reaches the blood from each tumour cell that dies. A model fitted to 176 patients with stage I to III lung cancer estimated 0.014 per cent of a dying cell's DNA on average.", source: doi("Avanzini et al., Sci Adv 2020", AVANZINI_2020, "we inferred that, on average, 0.014% of a tumor cell's DNA is shed into the bloodstream per cell death") },
      { kind: "biology", text: "How much a plasma result can be trusted depends on how much tumour DNA is in it. Even in metastatic prostate cancer, about a quarter of samples had 2 per cent tumour DNA or less.", source: doi("Wyatt et al., JNCI 2017: concordance of ctDNA and matched metastatic tissue biopsy in prostate cancer", WYATT_2017, "Seventy-five point six percent of cfDNA samples had a ctDNA proportion greater than 2% of total cfDNA.") },
    ],
    nextStep: {
      text: "Reading other features of cell-free DNA, such as how it fragments across the genome or its methylation, so detection does not rest on finding mutations. In a case-control study of seven cancers, genome-wide fragmentation patterns detected 57 per cent to more than 99 per cent depending on cancer type, at 98 per cent specificity.",
      status: "research",
      source: doi("Cristiano et al., Nature 2019: genome-wide cell-free DNA fragmentation in patients with cancer", CRISTIANO_2019, "A machine learning model that incorporated genome-wide fragmentation features had sensitivities of detection ranging from 57% to more than 99% among the seven cancer types at 98% specificity"),
      relatedIds: ["fragmentomics", "mced"],
    },
    buys: {
      text: "Blood testing that works for people whose cancers shed little DNA, who are now the ones a negative plasma result is most likely to mislead.",
      outcome: "plausible",
    },
    relatedIds: ["ctdna", "glioblastoma", "rcc", "prostate", "thyroid", "paper-bettegowda-ctdna-early-late-stage-stm-2014"],
  },
  {
    id: "clonal-haematopoiesis-false-positives",
    domain: "molecular",
    label: "Blood-cell mutations mistaken for cancer mutations in plasma tests",
    technologyIds: ["liquid-biopsy", "cfdna", "clonal-haematopoiesis"],
    metric: "Share of mutations found in plasma that come from blood-forming cells rather than the tumour, per cent",
    today: {
      value: "53.2 per cent of cell-free DNA mutations in people with cancer, and 81.6 per cent in people without, had features of clonal haematopoiesis",
      context: "124 patients with metastatic cancer and 47 controls, plasma and matched white blood cells sequenced across 508 genes (Razavi 2019)",
      source: doi("Razavi et al., Nat Med 2019", RAZAVI_2019, "The vast majority of cfDNA mutations (81.6% in controls and 53.2% in patients with cancer) had features consistent with clonal hematopoiesis."),
    },
    limits: [
      { kind: "biology", text: "The blood-cell mutations fall in genes that decide treatment. In 69 men with advanced prostate cancer, 7 (10 per cent) had clonal haematopoiesis variants in DNA repair genes used to decide PARP inhibitor eligibility, most often ATM, and these made up almost half of the repair-gene variants detected.", source: doi("Jensen et al., JAMA Oncol 2021: clonal haematopoiesis in DNA repair genes and prostate cancer plasma testing", JENSEN_2021, "Overall, CHIP variants accounted for almost half of the somatic DNA repair gene variants detected.") },
      { kind: "biology", text: "Clonal haematopoiesis becomes commoner with age, which is also when cancer is commonest.", source: doi("Jensen et al., JAMA Oncol 2021", JENSEN_2021, "Participant CHIP variants were exponentially correlated with older age (R2 = 0.82).") },
    ],
    nextStep: {
      text: "Sequencing a matched white blood cell sample alongside the plasma, so blood-cell mutations can be subtracted. The method exists; the papers that measured the problem recommend it for every clinical plasma test.",
      status: "available-not-routine",
      source: doi("Jensen et al., JAMA Oncol 2021", JENSEN_2021, "Clinical cfDNA testing should include a paired whole-blood control to exclude CHIP variants and avoid misdiagnosis."),
    },
    buys: {
      text: "Fewer people offered a PARP inhibitor, or told they carry a mutation, on the strength of a variant from their blood cells rather than their cancer.",
      outcome: "plausible",
      source: doi("Jensen et al., JAMA Oncol 2021", JENSEN_2021, "CHIP interference variants could be distinguished from prostate cancer variants using a paired whole-blood control."),
    },
    relatedIds: ["paper-razavi-cfdna-variant-sources-clonal-haematopoiesis-nat-med-2019", "paper-jensen-clonal-haematopoiesis-cfdna-interference-prostate-jama-oncol-2021", "rejuv-age-clonal-haematopoiesis-after-therapy", "atm", "olaparib", "mcrpc"],
  },
  {
    id: "plasma-versus-tissue-genotyping",
    domain: "molecular",
    label: "Plasma against tissue for finding treatable mutations at diagnosis",
    technologyIds: ["liquid-biopsy", "cgp", "guardant360-cdx"],
    metric: "Agreement between plasma and tissue for guideline biomarkers, per cent, and days to a result",
    today: {
      value: "Concordance above 98.2 per cent for EGFR, ALK, ROS1 and BRAF, with every plasma-positive result confirmed in tissue; 80 per cent sensitivity of plasma for any guideline biomarker; median 9 days to a plasma result against 15 for tissue",
      context: "282 people with newly diagnosed metastatic non-small-cell lung cancer, plasma tested with Guardant360 alongside usual tissue genotyping (NILE, Leighl 2019)",
      source: doi("Leighl et al., Clin Cancer Res 2019: NILE", LEIGHL_2019, "For FDA-approved targets (EGFR, ALK, ROS1, BRAF) concordance was >98.2% with 100% positive predictive value for cfDNA versus tissue (34/34 EGFR-, ALK-, or BRAF-positive patients)."),
    },
    limits: [
      { kind: "biology", text: "Plasma misses fusions and copy number changes more often than point mutations, and a negative plasma result can be a tumour that did not shed. ESMO recommends going back to tissue after a non-informative plasma result.", source: doi("Pascual et al., Ann Oncol 2022 (ESMO)", ESMO_CTDNA_2022, "Reflex tumour testing should be considered following a non-informative ctDNA result, due to false-negative results with ctDNA testing.") },
      { kind: "biology", text: "When tumour fraction is high enough, plasma finds what tissue finds: in metastatic prostate cancer samples above 2 per cent tumour DNA, every mutation in the matched biopsy was also in plasma.", source: doi("Wyatt et al., JNCI 2017", WYATT_2017, "In these patients, all somatic mutations identified in matched metastatic tissue biopsies were concurrently present in ctDNA.") },
    ],
    nextStep: {
      text: "Sending plasma and tissue at the same time rather than in sequence. In NILE, adding plasma to tissue raised the number of patients with a guideline biomarker found from 60 to 89.",
      status: "available-not-routine",
      source: doi("Leighl et al., Clin Cancer Res 2019: NILE", LEIGHL_2019, "Utilizing cfDNA, in addition to tissue, increased detection by 48%, from 60 to 89 patients, including those with negative, not assessed, or insufficient tissue results."),
      relatedIds: ["foundationone-cdx"],
    },
    buys: {
      text: "A treatable mutation found in more people, and about a week sooner, before first treatment is chosen. That this changes survival has not been tested in a randomised trial OnCo found.",
      outcome: "plausible",
    },
    relatedIds: ["nsclc", "paper-leighl-nile-cfdna-tissue-genotyping-ccr-2019", "paper-wyatt-ctdna-tissue-concordance-mcrpc-jnci-2017"],
  },
  {
    id: "cgp-actionable-to-matched",
    domain: "molecular",
    label: "Comprehensive genomic profiling: from an actionable result to a matched treatment",
    technologyIds: ["cgp", "genomic-profiling", "variant-knowledgebases"],
    metric: "Share of profiled patients who receive a treatment matched to their tumour's alteration, per cent",
    today: {
      value: "Sequencing succeeded in 93.0 per cent of biopsies, 37.6 per cent had an actionable alteration and 17.8 per cent were assigned a matched treatment",
      context: "5,954 people with treatment-refractory cancers screened at 1,117 sites in NCI-MATCH (Flaherty 2020)",
      source: doi("Flaherty et al., JCO 2020: molecular landscape and actionable alterations in NCI-MATCH", NCI_MATCH_2020, "Molecular profiling was successful in 93.0% of specimens. An actionable alteration was found in 37.6%. After applying clinical and molecular exclusion criteria, 17.8% were assigned (26.4% could have been assigned if all subprotocols were available simultaneously)."),
    },
    limits: [
      { kind: "cost-access", text: "A match needs a drug or a trial to be open at that moment. In the MSK-IMPACT programme of more than 10,000 patients, 11 per cent were enrolled in genomically matched trials; in the TARGET plasma programme, 41 of 100 patients had an actionable mutation and 11 received a matched therapy.", source: doi("Zehir et al., Nat Med 2017: MSK-IMPACT, prospective clinical sequencing of 10,000 patients", ZEHIR_2017, "Patients were enrolled on genomically matched clinical trials at a rate of 11%.") },
      { kind: "biology", text: "How often an alteration is actionable depends heavily on the cancer: more than 35 per cent for urothelial cancers and under 6 per cent for pancreatic and small-cell lung cancer in NCI-MATCH.", source: doi("Flaherty et al., JCO 2020 (NCI-MATCH)", NCI_MATCH_2020, "Actionability rates differed among histologies (eg, > 35% for urothelial cancers and < 6% for pancreatic and small-cell lung cancer).") },
      { kind: "biology", text: "Most tumours carry more than the one alteration that is matched: 71.3 per cent of NCI-MATCH specimens had resistance-conferring mutations.", source: doi("Flaherty et al., JCO 2020 (NCI-MATCH)", NCI_MATCH_2020, "Multiple actionable or resistance-conferring tumor mutations were seen in 11.9% and 71.3% of specimens, respectively.") },
    ],
    nextStep: {
      text: "Profiling from plasma to match people to early-phase trials quickly, as the TARGET programme did with a 641-gene panel.",
      status: "available-not-routine",
      source: doi("Rothwell et al., Nat Med 2019: the TARGET study", TARGET_2019, "When a 2.5% variant allele frequency (VAF) threshold was applied, actionable mutations were identified in 41 of 100 patients, and 11 of these patients received a matched therapy."),
      relatedIds: ["liquid-biopsy", "nci-match"],
    },
    buys: {
      text: "Faster profiling widens the window in which a person can join a matched trial. The ceiling is set by how many people have a drug that works for their alteration: of people with advanced cancer in the United States, an estimated 8.33 per cent were eligible for a genome-targeted drug approved by 2018 and 4.90 per cent were estimated to benefit. Profiling matters a great deal to that minority, and it is a minority.",
      outcome: "plausible",
      source: doi("Marquart, Chen and Prasad, JAMA Oncol 2018: percentage of US patients with cancer who benefit from genome-driven oncology", MARQUART_2018, "The percentage of patients with cancer estimated to benefit from genome-targeted therapy in 2006 was 0.70% (95% CI, 0.68%-0.72%), and in 2018, it had increased to 4.90% (95% CI, 4.85%-4.95%)."),
    },
    relatedIds: ["nci-match", "cancer-drivers-vs-actionable", "paper-flaherty-j-clin-oncol", "paper-rothwell-nat-med", "paper-marquart-genome-driven-oncology-benefit-jama-oncol-2018"],
  },
  {
    id: "matched-therapy-benefit",
    domain: "molecular",
    label: "What matching a drug to a tumour's mutation has been shown to buy",
    technologyIds: ["cgp", "tumour-agnostic"],
    metric: "Median progression-free survival with a drug chosen by molecular profile against the doctor's choice, months, and hazard ratio",
    today: {
      value: "2.3 months against 2.0 months (hazard ratio 0.88, p 0.41): no difference",
      context: "195 heavily pretreated patients with any metastatic solid tumour randomised in SHIVA to a targeted drug matched to their tumour but used outside its licence, or to the doctor's choice (Le Tourneau 2015)",
      source: doi("Le Tourneau et al., Lancet Oncol 2015: SHIVA", SHIVA_2015, "Median progression-free survival was 2·3 months (95% CI 1·7-3·8) in the experimental group versus 2·0 months (1·8-2·1) in the control group (hazard ratio 0·88, 95% CI 0·65-1·19, p=0·41)."),
    },
    limits: [
      { kind: "biology", text: "A mutation is a reason to try a drug, not proof it will work in that tissue. Of the first 27 NCI-MATCH substudies, each a phase 2 trial of a drug matched to an alteration, 7 met their response target.", source: doi("O'Dwyer et al., Nat Med 2023: the NCI-MATCH trial, lessons for precision oncology", NCI_MATCH_2023, "which met its signal-seeking objective with 7/27 positive substudies (25.9%)") },
      { kind: "workflow", text: "The strongest survival figures for matching come from registries, which are not randomised. In the Know Your Tumor pancreatic cancer registry, the 46 people who received a matched treatment lived longer than the 143 with an actionable alteration who did not (hazard ratio 0.42), and the authors called for prospective testing.", source: doi("Pishvaian et al., Lancet Oncol 2020: Know Your Tumor registry", KYT_2020, "molecularly guided treatments targeting oncogenic drivers and the DNA damage response and repair pathway warrant further prospective evaluation") },
    ],
    nextStep: {
      text: "Testing matched treatment in randomised trials and platform studies rather than off-label, which is what the SHIVA investigators recommended.",
      status: "in-trials",
      source: doi("Le Tourneau et al., Lancet Oncol 2015: SHIVA", SHIVA_2015, "Off-label use of molecularly targeted agents should be discouraged, but enrolment in clinical trials should be encouraged to assess predictive biomarkers of efficacy."),
      relatedIds: ["nci-match", "mypathway"],
    },
    buys: {
      text: "For a drug approved for that alteration in that cancer, the benefit is whatever its own trials showed. For matching across cancers, off-label, the one randomised test found no improvement in progression-free survival.",
      outcome: "not-established",
      source: doi("Le Tourneau et al., Lancet Oncol 2015: SHIVA", SHIVA_2015, "The use of molecularly targeted agents outside their indications does not improve progression-free survival compared with treatment at physician's choice in heavily pretreated patients with cancer."),
    },
    oversold: "A profiling report that lists every actionable alteration can suggest more benefit than exists: the one randomised test of matching drugs off-label, SHIVA, found no gain in progression-free survival.",
    relatedIds: ["paper-shiva-off-label-targeted-therapy-lancet-oncol-2015", "christophe-le-tourneau", "paper-o-dwyer-nat-med", "paper-pishvaian-lancet-oncol", "pancreatic"],
  },
  {
    id: "tmb-threshold",
    domain: "molecular",
    label: "Tumour mutational burden: one cut-off across every cancer",
    technologyIds: ["tmb-testing", "tmb-high", "tumour-agnostic"],
    metric: "Mutations per megabase of DNA sequenced (mut/Mb) at the cut-off, and how much the same tumour's value varies between test panels",
    today: {
      value: "10 mutations per megabase on FoundationOne CDx; 13 per cent of evaluable patients were above it, and 29 per cent of them responded to pembrolizumab against 6 per cent below it",
      context: "790 evaluable patients with ten previously treated advanced cancer types in the KEYNOTE-158 prospective biomarker analysis (Marabelle 2020), the basis of the tumour-agnostic approval",
      source: doi("Marabelle et al., Lancet Oncol 2020: tumour mutational burden and pembrolizumab in KEYNOTE-158", KEYNOTE158_TMB_2020, "Objective responses were observed in 30 (29%; 95% CI 21-39) of 102 patients in the tTMB-high group and 43 (6%; 5-8) of 688 in the non-tTMB-high group."),
    },
    limits: [
      { kind: "workflow", text: "Panels differ in size, genes and software, so the same tumour can score differently on different tests, and the spread is widest at the high values that decide treatment.", source: doi("Merino et al., J Immunother Cancer 2020: Friends of Cancer Research TMB harmonisation, phase I", MERINO_2020, "Study results demonstrated that variability within and between panel TMB values increases as the WES TMB values increase.") },
      { kind: "biology", text: "A high count does not mean the same thing in every cancer. Pooling over 10,000 tumours, high-TMB breast, prostate and glioma tumours responded to checkpoint inhibitors 15.3 per cent of the time.", source: doi("McGrail et al., Ann Oncol 2021: high tumour mutation burden fails to predict response across all cancer types", MCGRAIL_2021, "In cancer types that showed no relationship between CD8 T-cell levels and neoantigen load, such as breast cancer, prostate cancer, and glioma, TMB-H tumors failed to achieve a 20% ORR (ORR = 15.3%, 95% CI 9.2-23.4, P = 0.95)") },
      { kind: "biology", text: "The cut-off may be in the wrong place. In MyPathway, 16 of 42 tumours at 16 or more mutations per megabase responded to atezolizumab, against 1 of 48 between 10 and 16.", source: doi("Friedman et al., Cancer Discov 2022: atezolizumab for high-TMB tumours in MyPathway", MYPATHWAY_TMB_2022, "In 42 patients with F1(CDx) TMB ≥16 mut/Mb, confirmed ORR was 38.1% [16/42; 95% confidence interval (CI), 23.6-54.4], and disease control rate was 61.9% (26/42; 95% CI, 45.6-76.4) versus 2.1% (1/48; 95% CI, 0.1-11.1)") },
    ],
    nextStep: {
      text: "Harmonising how panels report TMB against a whole-exome reference, and setting cut-offs by cancer type rather than one for all.",
      status: "research",
      source: doi("Merino et al., J Immunother Cancer 2020", MERINO_2020, "These harmonization efforts should improve consistency and reliability of panel TMB estimates and aid in clinical decision-making."),
      relatedIds: ["paper-merino-j-immunother-cancer", "paper-friedman-cancer-discov"],
    },
    buys: {
      text: "Fewer people given immunotherapy on a number that does not predict response in their cancer, and fewer missed because their panel scored them just below a line.",
      outcome: "plausible",
    },
    oversold: "A single cut-off of 10 mutations per megabase is used across solid tumours, while high-TMB breast, prostate and brain tumours responded 15.3 per cent of the time in a pooled analysis, and in MyPathway tumours between 10 and 16 responded in 1 of 48.",
    relatedIds: ["keynote-158", "mypathway", "pembrolizumab", "foundationone-cdx", "paper-marabelle-keynote-158-tmb-lancet-oncol-2020", "paper-mcgrail-tmb-pan-cancer-response-ann-oncol-2021", "paper-gandara-blood-tmb-atezolizumab-nat-med-2018"],
  },
  {
    id: "msi-dmmr-result-accuracy",
    domain: "molecular",
    label: "Microsatellite instability and mismatch-repair results: how often a local positive is right",
    technologyIds: ["msi-mmr-testing", "msi-high", "tumour-agnostic"],
    metric: "Positive predictive value of a locally reported MSI-high or mismatch-repair-deficient result, per cent",
    today: {
      value: "92.1 per cent in 38 patients entering immunotherapy trials and 90.3 per cent in 93 patients from six hospitals; 3 of the 5 tumours that did not respond turned out to be microsatellite stable on retesting",
      context: "Metastatic colorectal cancer called MSI or dMMR by local laboratories, retested centrally by immunohistochemistry and PCR (Cohen 2019)",
      source: doi("Cohen et al., JAMA Oncol 2019: primary resistance to checkpoint inhibitors and misdiagnosis of MSI or dMMR status", COHEN_MSI_2019, "The positive predictive value of MSI or dMMR status assessed by local laboratories was therefore 92.1% (95% CI, 78.5%-98.0%)."),
    },
    limits: [
      { kind: "workflow", text: "Immunohistochemistry and PCR can disagree on the same tumour; in the French cohort a third assay settled two of four such cases.", source: doi("Cohen et al., JAMA Oncol 2019", COHEN_MSI_2019, "Testing for MSI with the HT17 assay confirmed the MSI or dMMR status in 2 of 4 cases showing discrepant results between immunohistochemistry and pentaplex polymerase chain reaction (ie, dMMR but microsatellite stable).") },
    ],
    nextStep: {
      text: "Testing by both immunohistochemistry and PCR before immunotherapy, as the authors recommend.",
      status: "available-not-routine",
      source: doi("Cohen et al., JAMA Oncol 2019", COHEN_MSI_2019, "Microsatellite instability or dMMR status should be tested routinely using both immunohistochemistry and polymerase chain reaction methods prior to treatment with immune checkpoint inhibitors."),
    },
    buys: {
      text: "Immunotherapy reserved for people whose tumours are truly mismatch-repair deficient, where it works: in KEYNOTE-158, 30.8 per cent of 321 people with non-colorectal MSI-high cancers responded, with a median response of 47.5 months. In the small Cohen cohort, most primary resistance was explained by a wrong result.",
      outcome: "plausible",
      source: doi("Maio et al., Ann Oncol 2022: KEYNOTE-158 updated analysis in MSI-high or dMMR cancers", KEYNOTE158_MSI_2022, "Pembrolizumab demonstrated clinically meaningful and durable benefit, with a high ORR of 30.8%, long median duration of response of 47.5 months"),
    },
    relatedIds: ["msi", "keynote-158", "pembrolizumab", "msi-high-colorectal", "paper-cohen-msi-dmmr-misdiagnosis-colorectal-jama-oncol-2019", "paper-keynote-158-ann-oncol-2022-update"],
  },
  {
    id: "mced-screening-precision",
    domain: "molecular",
    label: "Multi-cancer early detection blood tests: stage I sensitivity and positive predictive value",
    technologyIds: ["mced", "galleri"],
    metric: "Share of stage I cancers detected (sensitivity, per cent) and share of positive results that turn out to be cancer (positive predictive value, per cent)",
    today: {
      value: "Stage I sensitivity 16.8 per cent at 99.5 per cent specificity in the case-control validation; in screening, 45.8 to 58.0 per cent of positive results were cancer and the test found 26.7 to 37.2 per cent of all cancers diagnosed in a screening round",
      context: "4,077 people in the third CCGA substudy (Klein 2021); 142,250 people aged 50 to 77 randomised in NHS-Galleri, three annual rounds (Neal 2026)",
      source: doi("Klein et al., Ann Oncol 2021: clinical validation of a targeted methylation-based multi-cancer early detection test", CCGA3_2021, "sensitivity increased with stage [stage I: 16.8% (14.5% to 19.5%), stage II: 40.4% (36.8% to 44.1%), stage III: 77.0% (73.4% to 80.3%), stage IV: 90.1% (87.5% to 92.2%)]"),
    },
    limits: [
      { kind: "biology", text: "Sensitivity climbs with stage, from 16.8 per cent at stage I to 90.1 per cent at stage IV in the validation set, so the test is least likely to find the cancers where finding them early would matter most.", source: doi("Klein et al., Ann Oncol 2021", CCGA3_2021, "Overall sensitivity for cancer signal detection was 51.5% (49.6% to 53.3%); sensitivity increased with stage") },
      { kind: "sampling", text: "In screening, a positive result is cancer about half the time. In the first prospective study, 35 of 92 positives were cancer and false positives took a median of 162 days to resolve.", source: doi("Schrag et al., Lancet 2023: PATHFINDER", PATHFINDER_2023, "35 (38%) participants were diagnosed with cancer (true positives) and 57 (62%) had no cancer diagnosis (false positives).") },
      { kind: "biology", text: "In NHS-Galleri the test performed as a screening test and the trial did not show the outcome that matters: its primary endpoint, fewer stage III and IV cancers, was not met.", source: doi("Neal et al., Nat Med 2026: performance of a multi-cancer early detection test in the NHS-Galleri trial", NHS_GALLERI_2026, "We reported elsewhere that the primary endpoint of a reduction in the incidence of stage III/IV cancer diagnoses in the intervention arm versus control arm was not met.") },
    ],
    nextStep: {
      text: "Combining different signals in cell-free DNA to raise early-stage sensitivity. In a case-control study, adding mutation analysis to genome-wide fragmentation patterns detected 91 per cent of patients with cancer; that is a laboratory comparison, not a screening result.",
      status: "research",
      source: doi("Cristiano et al., Nature 2019", CRISTIANO_2019, "Combining our approach with mutation-based cell-free DNA analyses detected 91% of patients with cancer."),
      relatedIds: ["fragmentomics", "nhs-galleri", "pathfinder-2", "ccga-study"],
    },
    buys: {
      text: "If early-stage sensitivity rose and the trials showed fewer late-stage diagnoses, fewer cancers found too late to cure. Neither has been shown: NHS-Galleri reported positive predictive values of 58.0, 50.4 and 45.8 per cent by round and did not meet its primary endpoint.",
      outcome: "not-established",
      source: doi("Neal et al., Nat Med 2026 (NHS-Galleri)", NHS_GALLERI_2026, "positive predictive values were 58.0% (419/722), 50.4% (261/518) and 45.8% (257/561)"),
    },
    grade: "insufficient",
    oversold: "A headline specificity of 99.5 per cent is accurate and is not the number a person being screened needs: the same validation found 16.8 per cent of stage I cancers, in NHS-Galleri about half of positive results were cancer, and the trial's primary endpoint was not met.",
    relatedIds: ["nhs-galleri", "pathfinder-2", "ccga-study", "grail", "early-detection", "paper-nhs-galleri-performance-nat-med-2026", "paper-pathfinder-lancet-2023", "paper-klein-ccga3-mced-validation-ann-oncol-2021"],
  },
  {
    id: "marrow-mrd-blood-cancers",
    domain: "molecular",
    label: "Marrow residual disease in myeloma and leukaemia: clonoSEQ sequencing",
    technologyIds: ["ngs-mrd-clonoseq", "clonoseq", "flow-cytometry-mrd"],
    metric: "Lowest frequency of cancer cells detectable among the marrow cells tested (10⁻⁶ is one in a million)",
    today: {
      value: "Limit of detection 2.26 × 10⁻⁵ with 500 ng of DNA and 6.77 × 10⁻⁷ with 20 µg; about 1.9 cancer cells in the sample in both cases",
      context: "FDA De Novo decision summary for the clonoSEQ assay, dilution series from 66 patients with lymphoid cancers including myeloma and acute lymphoblastic leukaemia (DEN170080, 2018)",
      source: { label: "FDA De Novo decision summary DEN170080: clonoSEQ assay", url: CLONOSEQ_DEN170080, quote: "A probit approach was used to determine the LoD to be 1.903 malignant cells" },
    },
    limits: [
      { kind: "sampling", text: "The test counts cells, so its depth depends on how much marrow DNA is sent: the same assay reaches about one in 44,000 cells on a small sample and about one in 1.5 million on a large one. A result has to be read with the amount of DNA tested.", source: { label: "FDA De Novo decision summary DEN170080: clonoSEQ assay", url: CLONOSEQ_DEN170080, quote: "The LoD/LoQ by MRD frequency will vary based on the DNA input and the total nucleated cells that are evaluated by the assay." } },
      { kind: "sampling", text: "A marrow sample comes from one site. The International Myeloma Working Group added imaging to its residual disease categories because disease can persist outside the marrow.", source: doi("Kumar et al., Lancet Oncol 2016: International Myeloma Working Group consensus criteria for response and minimal residual disease", IMWG_2016, "sensitive imaging techniques can be used to detect the presence of residual disease outside of the bone marrow") },
    ],
    nextStep: {
      text: "Pairing marrow sequencing with imaging to define residual disease inside and outside the marrow, as the 2016 consensus criteria allow.",
      status: "available-not-routine",
      source: doi("Kumar et al., Lancet Oncol 2016 (IMWG)", IMWG_2016, "the International Myeloma Working Group has defined new response categories of minimal residual disease negativity, with or without imaging-based absence of extramedullary disease"),
      relatedIds: ["mrd-negativity-myeloma", "umrd"],
    },
    buys: {
      text: "A more reliable reading of who is in deep remission. In myeloma, a negative result goes with longer progression-free survival (hazard ratio 0.41) and overall survival (0.57) across 21 studies; that is a prognostic association, and whether stopping or reducing treatment on a negative result is safe is being tested rather than shown.",
      outcome: "plausible",
      source: doi("Munshi et al., JAMA Oncol 2017: minimal residual disease and survival in multiple myeloma, a meta-analysis", MUNSHI_2017, "An MRD-negative status was associated with significantly better PFS overall (hazard ratio [HR], 0.41; 95% CI, 0.36-0.48; P < .001)"),
    },
    relatedIds: ["multiple-myeloma", "mrd", "mrd-negativity-myeloma", "umrd"],
  },
];
