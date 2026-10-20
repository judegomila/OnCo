import type { PrecisionRow } from "./types";

/**
 * Precision matrix rows for this domain. See ./types.ts for the rules every row is held to.
 *
 * Dosing is the domain where precision is cheapest and least used. Nothing here needs a new machine: the levers are
 * a blood test before the first dose, a blood test during treatment, a better estimate of kidney function, a slice of
 * a scan already taken, and a decision not to cap a dose. Every `today.quote` below is a verbatim fragment of the
 * abstract, label or regulator page cited beside it, checked by exact string match against the source text.
 *
 * The distinction this file keeps throughout: hitting an intended drug exposure more often is not the same as living
 * longer. Where only exposure has been shown, `buys.outcome` is "plausible" or "not-established" and says so.
 */
export const rows: PrecisionRow[] = [
  {
    id: "dosing-body-surface-area", grade: "no-benefit",
    domain: "dosing",
    label: "Dosing chemotherapy by body surface area",
    technologyIds: ["body-surface-area-dosing", "cytotoxic-chemotherapy"],
    metric: "How much of the difference in drug clearance between adults on the same dose per square metre body surface area accounts for",
    today: {
      value: "In most drugs studied, surface area does not reduce the spread of blood levels between adults at all",
      context: "Review of pharmacokinetic studies of commonly used cytotoxics, 2007",
      source: { label: "Flat-fixed dosing versus body surface area based dosing of anticancer drugs in adults: does it make a difference? (Oncologist 2007)", url: "https://doi.org/10.1634/theoncologist.12-8-913", quote: "In (by far) most cases, use of BSA does not reduce the interindividual variation in the pharmacokinetics of adults" },
    },
    limits: [
      { kind: "biology", text: "Surface area was adopted in 1958 because clearance scaled with it across species; between adults of the same species it tracks the enzymes and kidneys that clear a drug only loosely." },
      { kind: "workflow", text: "It is calculated from height and weight at one visit, so it does not follow weight loss, muscle loss or fluid during treatment." },
      { kind: "workflow", text: "Changing it means changing the unit every protocol, pharmacy system and nomogram is written in." },
    ],
    nextStep: { text: "Replace or correct it where a better variable exists: kidney function for carboplatin, genotype before fluoropyrimidines and thiopurines, measured blood level for infusional fluorouracil and oral targeted drugs, lean body mass in research.", status: "available-not-routine", relatedIds: ["carboplatin-calvert-dosing", "fluorouracil-pharmacokinetic-dosing", "dpyd-genotyping", "oral-targeted-therapy-drug-monitoring"] },
    buys: { text: "On its own, replacing surface area with a flat dose changes nothing for a patient: the 2007 review concluded flat dosing is no worse rather than better. The gain comes from the drug-specific replacements below.", outcome: "not-established", source: { label: "Flat-fixed dosing versus body surface area based dosing of anticancer drugs in adults: does it make a difference? (Oncologist 2007)", url: "https://doi.org/10.1634/theoncologist.12-8-913" } },
    oversold: "Dosing in milligrams per square metre reads as a personalised dose and is, for most drugs in adults, a weakly individualised one.",
    relatedIds: ["b-dose-optimisation", "pkpd-modelling"],
  },
  {
    id: "dosing-fluorouracil-exposure",
    domain: "dosing",
    label: "Fluorouracil dosing by measured blood level",
    technologyIds: ["fluorouracil-pharmacokinetic-dosing", "fluorouracil"],
    metric: "Share of patients whose fluorouracil exposure, in milligram-hours per litre, falls in the target range on a surface-area dose",
    today: {
      value: "20 to 30 per cent in range; about 40 to 60 per cent underdosed and 10 to 20 per cent overdosed",
      context: "Review of studies linking fluorouracil plasma concentration to toxicity and efficacy, 2009",
      source: { label: "Pharmacokinetically guided dose adjustment of 5-fluorouracil: a rational approach to improving therapeutic outcomes (J Natl Cancer Inst 2009)", url: "https://doi.org/10.1093/jnci/djp328", quote: "only 20%-30% of patients treated with a 5-FU-based regimen have 5-FU levels that are in the appropriate therapeutic range" },
    },
    limits: [
      { kind: "workflow", text: "Monitoring needs a sample taken during the infusion and an assay with a fast turnaround; a 2009 review attributed the lack of uptake to the absence of a simple, fast and inexpensive method." },
      { kind: "workflow", text: "The randomised evidence used a weekly eight-hour infusion schedule, not the FOLFOX and FOLFIRI regimens given today." },
      { kind: "biology", text: "It measures the parent drug in plasma, not the active nucleotides inside the tumour cell, and it does not apply to capecitabine taken as a tablet." },
    ],
    nextStep: { text: "Randomised trials on current regimens with survival endpoints; the 2026 meta-analysis found severe toxicity halved and response raised but could not establish a survival benefit.", status: "in-trials", source: { label: "Comparative efficacy and safety of pharmacokinetically guided and body surface area-based 5-fluorouracil dosing in colorectal cancer: a systematic review and meta-analysis (Eur J Clin Pharmacol 2026)", url: "https://doi.org/10.1007/s00228-026-04174-9" } },
    buys: { text: "In the one randomised trial, response rose from 18.3 to 33.7 per cent and severe toxicity fell; median survival was 16 against 22 months, a difference that did not reach significance.", outcome: "plausible", source: { label: "Individual fluorouracil dose adjustment based on pharmacokinetic follow-up compared with conventional dosage: results of a multicenter randomized trial of patients with metastatic colorectal cancer (J Clin Oncol 2008)", url: "https://doi.org/10.1200/JCO.2007.13.3934", quote: "the objective response rate was 18.3% in arm A and 33.7% in arm B (P = .004)" } },
    grade: "moderate",
    relatedIds: ["colorectal", "head-and-neck", "b-dose-optimisation"],
  },
  {
    id: "dosing-dpyd",
    domain: "dosing",
    label: "DPYD testing before fluoropyrimidines",
    technologyIds: ["dpyd-genotyping", "fluorouracil", "capecitabine"],
    metric: "Risk of death from the treatment itself, in carriers of a DPYD variant given a standard dose",
    today: {
      value: "2.3 per cent of 566 carriers died of the treatment, against 0.1 per cent of 13,363 non-carriers",
      context: "Systematic review of 35 studies and 13,929 patients given standard-dose fluoropyrimidines with baseline DPYD testing",
      source: { label: "Pathogenic DPYD Variants and Treatment-Related Mortality in Patients Receiving Fluoropyrimidine Chemotherapy: A Systematic Review and Meta-Analysis (Oncologist 2021)", url: "https://doi.org/10.1002/onco.13967", quote: "25.6 times increased risk of treatment-related death" },
    },
    limits: [
      { kind: "biology", text: "The four variants tested for are common in European ancestry and miss variants that matter in others, and genotype explains only part of enzyme activity; plasma uracil measures the deficiency whatever its cause." },
      { kind: "biology", text: "A reduced starting dose does not abolish the excess risk: in the Dutch prospective study severe toxicity was still 39 per cent in carriers against 23 per cent in wild-type patients." },
      { kind: "workflow", text: "The result has to arrive before cycle one, which is where testing most often fails in practice." },
    ],
    nextStep: { text: "Testing everyone before the first dose, as the European Medicines Agency recommended in 2020 and the FDA's revised boxed warning advised in February 2026, and settling the right size of reduction for the c.1236G>A and c.2846A>T variants.", status: "available-not-routine", source: { label: "FDA: Safety labeling update for capecitabine and fluorouracil (5-FU) on risks associated with DPD deficiency (2026)", url: "https://www.fda.gov/drugs/resources-information-approved-drugs/safety-labeling-update-capecitabine-and-fluorouracil-5-fu-risks-associated-dihydropyrimidine", quote: "test patients for genetic variants of DPYD prior to initiating treatment with capecitabine or 5-FU unless immediate treatment is necessary" }, relatedIds: ["dpyd-genotyping"] },
    buys: { text: "Fewer deaths and fewer hospital admissions from the first cycles. A matched analysis of 156 carriers given reduced doses against 775 wild-type controls found progression-free and overall survival not shortened overall, with shorter progression-free survival in c.1236G>A carriers.", outcome: "established", source: { label: "Survival of Patients With Cancer With DPYD Variant Alleles and Dose-Individualized Fluoropyrimidine Therapy: A Matched-Pair Analysis (J Clin Oncol 2023)", url: "https://doi.org/10.1200/JCO.22.02780" } },
    grade: "strong",
    relatedIds: ["colorectal", "breast-cancer", "head-and-neck", "oncology-pharmacogenomics"],
  },
  {
    id: "dosing-ugt1a1",
    domain: "dosing",
    label: "UGT1A1 testing before irinotecan",
    technologyIds: ["ugt1a1-genotyping", "irinotecan"],
    metric: "Rate of febrile neutropenia in the first two cycles in people who clear irinotecan's active metabolite slowly",
    today: {
      value: "6.5 per cent of 31 poor metabolisers given a 30 per cent reduced starting dose, against 24 per cent in a historical full-dose group",
      context: "Prospective multicentre study of 350 evaluable patients genotyped before irinotecan, Netherlands",
      source: { label: "UGT1A1 genotype-guided dosing of irinotecan: a prospective safety and cost analysis in poor metaboliser patients (Eur J Cancer 2022)", url: "https://doi.org/10.1016/j.ejca.2021.12.009", quote: "incidence of febrile neutropenia in this group was 6.5% compared to 24% in historical UGT1A1 PMs" },
    },
    limits: [
      { kind: "biology", text: "The risk depends on the dose given: a meta-analysis of 821 patients found the odds of severe blood toxicity in *28 homozygotes raised at medium and high irinotecan doses but not at 100 to 125 mg per square metre." },
      { kind: "biology", text: "Even on a reduced dose, exposure to the active metabolite SN-38 in poor metabolisers remained about 32 per cent above a standard-dosed comparison group." },
      { kind: "cost-access", text: "Variant frequencies differ by ancestry, so a panel built for one population misclassifies another; the label reports *28 homozygosity in about 20 per cent of Black or African American, 10 per cent of white and 2 per cent of East Asian individuals." },
    ],
    nextStep: { text: "Genotyping before irinotecan as standard, which the Dutch study argued for and found cost-saving by 183 euros a patient.", status: "available-not-routine", relatedIds: ["ugt1a1-genotyping"] },
    buys: { text: "Fewer episodes of fever with a low white cell count, at no measured cost in survival: a Dutch cohort of 779 patients found no significant difference in progression-free or overall survival between dose-reduced poor metabolisers and fully dosed others.", outcome: "established", source: { label: "Survival of patients with colorectal or pancreatic cancer who received UGT1A1 genotype-guided dosing of irinotecan in the Netherlands (2017-2024): a retrospective, multicentre cohort study (Lancet Reg Health Eur 2026)", url: "https://doi.org/10.1016/j.lanepe.2026.101629" } },
    grade: "moderate",
    relatedIds: ["colorectal", "pancreatic", "oncology-pharmacogenomics"],
  },
  {
    id: "dosing-thiopurines",
    domain: "dosing",
    label: "TPMT and NUDT15 testing before thiopurine maintenance",
    technologyIds: ["tpmt-nudt15-genotyping", "mercaptopurine"],
    metric: "Share of the planned mercaptopurine dose a child can tolerate, by genotype",
    today: {
      value: "50 to 90 per cent if heterozygous for one gene, 30 to 50 per cent for both, 5 to 10 per cent if homozygous for either",
      context: "Study of 1,028 children with acute lymphoblastic leukaemia on maintenance therapy, as reported in the mercaptopurine label",
      source: { label: "Mercaptopurine oral suspension: US prescribing information, section 12.5 (DailyMed)", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9c6fc66b-522f-499d-961a-cde6ca0ec2e5", quote: "heterozygous for either TPMT or NUDT15, 50-90%; heterozygous for both TPMT and NUDT15, 30-50%; homozygous for either TPMT or NUDT15, 5-10%" },
    },
    limits: [
      { kind: "biology", text: "Genotype explains part of the variation only, so blood counts still set the dose month by month through two years of maintenance." },
      { kind: "biology", text: "NUDT15 variants were identified only in 2014 to 2015 and explain much of the severe toxicity in East Asian and Hispanic patients that TPMT testing missed; the label reports two loss-of-function alleles in about 2 per cent of East Asian patients." },
      { kind: "workflow", text: "Red-cell enzyme activity, the alternative to genotype, is misleading after a transfusion, which many children have had by then." },
    ],
    nextStep: { text: "Testing both genes at diagnosis so the result is ready before maintenance, following the consortium dose tables updated in 2025.", status: "available-not-routine", source: { label: "Clinical Pharmacogenetics Implementation Consortium (CPIC) Guideline for Thiopurine Dosing Based on TPMT and NUDT15 Genotypes: 2025 Update (Clin Pharmacol Ther 2026)", url: "https://doi.org/10.1002/cpt.70209" }, relatedIds: ["tpmt-nudt15-genotyping"] },
    buys: { text: "Avoids the weeks of marrow failure that a full dose causes in a child with no enzyme, in a treatment given daily for about two years.", outcome: "established", source: { label: "Mercaptopurine oral suspension: US prescribing information (DailyMed)", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9c6fc66b-522f-499d-961a-cde6ca0ec2e5" } },
    grade: "strong",
    relatedIds: ["all-leukemia", "childhood-cancers", "oncology-pharmacogenomics"],
  },
  {
    id: "dosing-carboplatin-kidney",
    domain: "dosing",
    label: "Carboplatin dosing by kidney function",
    technologyIds: ["carboplatin-calvert-dosing", "carboplatin"],
    metric: "Share of patients whose carboplatin dose is more than 20 per cent away from the dose a measured filtration rate would give",
    today: {
      value: "18.6 per cent with the best published equation, 25.5 per cent with Cockcroft-Gault, 14.2 per cent with a model built on the same cohort",
      context: "2,471 white adults with cancer at Cambridge University Hospitals, compared with chromium-51 EDTA measured filtration",
      source: { label: "New Model for Estimating Glomerular Filtration Rate in Patients With Cancer (J Clin Oncol 2017)", url: "https://doi.org/10.1200/JCO.2017.72.7578", quote: "reduced the fraction of patients with a carboplatin dose absolute percentage error > 20% to 14.17% in contrast to 18.62% for the BSA-adjusted CKD-EPI and 25.51% for the Cockcroft-Gault formula" },
    },
    limits: [
      { kind: "biology", text: "Creatinine comes from muscle, so it flatters kidney function in people with little of it; in 545 patients with cancer, CT-defined sarcopenia roughly doubled the odds that creatinine and cystatin C estimates disagreed by more than 30 per cent." },
      { kind: "workflow", text: "Measured clearance needs an injected tracer and timed samples, so most centres estimate instead." },
      { kind: "cost-access", text: "The 2017 model was developed in white patients only, so its accuracy elsewhere is unestablished." },
    ],
    nextStep: { text: "Cystatin C alongside creatinine, or measured clearance where the two disagree; a 357-patient study built a carboplatin clearance equation with 1 per cent bias and 15 per cent imprecision that held in underweight, normal-weight and obese patients.", status: "available-not-routine", source: { label: "A universal formula based on cystatin C to perform individual dosing of carboplatin in normal weight, underweight, and obese patients (Clin Cancer Res 2009)", url: "https://doi.org/10.1158/1078-0432.CCR-09-0017" } },
    buys: { text: "A dose closer to the exposure the regimen was tested at. OnCo found no trial showing that a more accurate filtration estimate changes survival or toxicity, and says so rather than assuming it.", outcome: "not-established" },
    grade: "moderate",
    relatedIds: ["ovarian", "nsclc", "testicular", "paper-calvert-j-clin-oncol"],
  },
  {
    id: "dosing-oral-targeted-levels",
    domain: "dosing",
    label: "Blood-level monitoring of oral targeted drugs",
    technologyIds: ["oral-targeted-therapy-drug-monitoring", "kinase-inhibitors"],
    metric: "Share of patients whose trough blood level sits below the target for their drug",
    today: {
      value: "25.8 per cent of 426 patients still below target at the third measurement, after a 39.0 per cent reduction against historical data",
      context: "600 patients starting one of 24 oral targeted therapies, prospective multicentre study in the Netherlands",
      source: { label: "Therapeutic drug monitoring-based precision dosing of oral targeted therapies in oncology: a prospective multicenter study (Ann Oncol 2022)", url: "https://doi.org/10.1016/j.annonc.2022.06.010", quote: "Pharmacokinetically guided dosing reduced the proportion of underexposed patients at the third PK measurement by 39.0%" },
    },
    limits: [
      { kind: "biology", text: "An exposure target exists for only some drugs, and a trough level is a weaker guide where the exposure-response curve is flat." },
      { kind: "workflow", text: "Much of the shortfall is not the dose at all: adherence, food, timing and interacting medicines accounted for several of the interventions used." },
      { kind: "cost-access", text: "Assays and a pharmacologist to read them are concentrated in a few centres." },
    ],
    nextStep: { text: "Randomised trials with progression or toxicity endpoints rather than exposure endpoints.", status: "research", relatedIds: ["idea-tr1-therapeutic-drug-monitoring-for-oral-tkis"] },
    buys: { text: "More people receiving the exposure the drug was approved at. Whether that lengthens life or delays progression has not been tested against a concurrent control in the sources read here.", outcome: "not-established" },
    grade: "insufficient",
    relatedIds: ["b-dose-optimisation", "pkpd-modelling"],
  },
  {
    id: "dosing-project-optimus", grade: "moderate",
    domain: "dosing",
    label: "Choosing the dose a drug is approved at",
    technologyIds: ["project-optimus", "sotorasib"],
    metric: "Whether the approved dose was compared against a lower one before approval, and what the comparison found",
    today: {
      value: "Pooled response 33 per cent at 960 mg against 26 per cent at a reduced starting dose, with no significant difference; 960 mg remains the labelled dose",
      context: "Systematic review of 10 studies of sotorasib in KRAS G12C-mutated non-small cell lung cancer, the first drug for which the FDA required formal dose optimisation",
      source: { label: "Standard Versus Reduced Sotorasib Dosing in KRAS G12C-Mutated Non-Small Cell Lung Cancer: A Systematic Review and Meta-Analysis (JCO Oncol Pract 2026)", url: "https://doi.org/10.1200/OP-25-01315", quote: "The pooled ORR was 33% (95% CI, 29% to 36%) for patients starting at 960 mg (n = 1,347) versus 26% (95% CI, 19% to 34%) for those starting at reduced dose (n = 130)" },
    },
    limits: [
      { kind: "workflow", text: "Dose-finding in phase 1 measures toxicity over about four weeks in a few dozen people, while targeted drugs are taken for months, so the dose-limiting window never sees the toxicity that makes people stop." },
      { kind: "workflow", text: "Comparing two doses in the registration programme costs patients and time, and the lower dose is commercially unattractive to the sponsor." },
      { kind: "biology", text: "Once a drug is approved at the higher dose, the randomised comparison that would settle it is hard to run: the sotorasib meta-analysis had 1,347 patients at 960 mg and 130 at a reduced dose." },
    ],
    nextStep: { text: "The FDA's August 2024 guidance asks sponsors to identify an optimised dosage before applying for approval; ponatinib is the worked example of a dose revised after approval, its label changed to 45 mg reducing to 15 mg on response after the three-dose OPTIC trial.", status: "available-not-routine", source: { label: "FDA Approval Summary: Revised Indication and Dosing Regimen for Ponatinib Based on the Results of the OPTIC Trial (Oncologist 2022)", url: "https://doi.org/10.1093/oncolo/oyab040" }, relatedIds: ["project-optimus", "ponatinib"] },
    buys: { text: "Fewer dose reductions and fewer people stopping a drug that was working: at 960 mg of sotorasib, 17 per cent reduced the dose and 10 per cent stopped for toxicity.", outcome: "plausible", source: { label: "Standard Versus Reduced Sotorasib Dosing in KRAS G12C-Mutated Non-Small Cell Lung Cancer: A Systematic Review and Meta-Analysis (JCO Oncol Pract 2026)", url: "https://doi.org/10.1200/OP-25-01315" } },
    oversold: "An approved dose is often read as the dose that works best; for drugs approved before dose optimisation it is the highest dose tested that people could tolerate for a month.",
    relatedIds: ["b-dose-optimisation", "mtd", "paper-drug-dosing-conundrum-nejm-2021"],
  },
  {
    id: "dosing-body-composition",
    domain: "dosing",
    label: "Muscle and fat measured on the staging scan",
    technologyIds: ["ct-body-composition-sarcopenia"],
    metric: "Rate of severe toxicity in people with low muscle compared with others on the same dose per square metre",
    today: {
      value: "Toxicity in 50 per cent of sarcopenic against 20 per cent of non-sarcopenic patients",
      context: "55 women with metastatic breast cancer starting capecitabine, muscle measured at the third lumbar vertebra on CT",
      source: { label: "Sarcopenia as a determinant of chemotherapy toxicity and time to tumor progression in metastatic breast cancer patients receiving capecitabine treatment (Clin Cancer Res 2009)", url: "https://doi.org/10.1158/1078-0432.CCR-08-2242", quote: "Toxicity was present in 50% of sarcopenic patients, compared with only 20% of nonsarcopenic patients (P = 0.03)" },
    },
    limits: [
      { kind: "sampling", text: "Thresholds for low muscle differ between populations and studies, so the same scan can be classified either way." },
      { kind: "workflow", text: "The slice has to be in the scan: a chest-only CT does not reach the third lumbar vertebra." },
      { kind: "biology", text: "The association is prognostic. A 2026 systematic review in pancreatic cancer called the body-composition evidence hypothesis-generating rather than practice-changing." },
    ],
    nextStep: { text: "Prospective trials of doses set by lean body mass rather than surface area; the same review found dose relative to lean mass predicted dose-limiting toxicity where surface-area dosing did not.", status: "research", source: { label: "Beyond body surface area: CT-derived body composition as a predictor of chemotherapy toxicity and survival in pancreatic ductal adenocarcinoma: a systematic review (Cancer Treat Rev 2026)", url: "https://doi.org/10.1016/j.ctrv.2026.103174" }, relatedIds: ["idea-bio2-lean-mass-dosing"] },
    buys: { text: "A warning before the first cycle for the people most likely to be harmed by it, from a scan already taken. No trial has shown that changing the dose on this basis improves outcomes.", outcome: "not-established" },
    grade: "insufficient",
    relatedIds: ["sarcopenia", "pancreatic", "breast-cancer", "nutrition-lifestyle"],
  },
  {
    id: "dosing-capping-in-obesity",
    domain: "dosing",
    label: "Capping the dose in larger patients",
    technologyIds: ["chemotherapy-dosing-in-obesity", "body-surface-area-dosing"],
    metric: "Share of patients with obesity given less than the full dose their body size calls for",
    today: {
      value: "Up to 40 per cent",
      context: "Practice-pattern studies reviewed for the ASCO guideline on chemotherapy dosing in obese adults, literature to 2010",
      source: { label: "Appropriate chemotherapy dosing for obese adult patients with cancer: American Society of Clinical Oncology clinical practice guideline (J Clin Oncol 2012)", url: "https://doi.org/10.1200/JCO.2011.39.9436", quote: "up to 40% of obese patients receive limited chemotherapy doses that are not based on actual body weight" },
    },
    limits: [
      { kind: "workflow", text: "Capping is a habit rather than a rule, so it is invisible unless prescriptions are audited." },
      { kind: "biology", text: "The guideline panel found the concern it rests on unfounded: it reported no evidence of increased short or long-term toxicity, with myelosuppression the same or less pronounced on full weight-based doses." },
      { kind: "biology", text: "Weight is not composition: the 2021 update named sarcopenia and other body composition measures as an important area for future research." },
    ],
    nextStep: { text: "Apply the guideline, which since 2021 extends full approved doses to immunotherapy and targeted therapy as well as chemotherapy.", status: "available-not-routine", source: { label: "Appropriate Systemic Therapy Dosing for Obese Adult Patients With Cancer: ASCO Guideline Update (J Clin Oncol 2021)", url: "https://doi.org/10.1200/JCO.21.00471" } },
    buys: { text: "The dose the regimen was tested at, particularly where the aim is cure. The guideline abstracts do not put a figure on the survival an uncapped dose returns.", outcome: "plausible", source: { label: "Appropriate chemotherapy dosing for obese adult patients with cancer: American Society of Clinical Oncology clinical practice guideline (J Clin Oncol 2012)", url: "https://doi.org/10.1200/JCO.2011.39.9436" } },
    grade: "moderate",
    relatedIds: ["breast-cancer", "colorectal", "ovarian", "b-dose-optimisation"],
  },
];
