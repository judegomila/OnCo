import type { EntityInput, TechnologyInput } from "@/lib/schema";

/**
 * Precision and protocol-upgrades run (20 October 2026), facet 5: dosing.
 *
 * The rows of the dosing precision matrix live in src/data/precision-matrix/dosing.ts. This file holds only the
 * records those rows needed and the corpus did not have: dosing fluorouracil by its measured blood level, dosing
 * carboplatin by kidney function, measuring blood levels of oral targeted drugs, and full weight-based dosing for
 * people with obesity. Everything else the rows rest on already existed and was supplemented in its own file with
 * the `precision` tag: `dpyd-genotyping`, `ugt1a1-genotyping`, `tpmt-nudt15-genotyping` and
 * `ct-body-composition-sarcopenia` (src/data/diagnostics-wave2.ts), `body-surface-area-dosing`
 * (src/data/models-wave.ts), `oncology-pharmacogenomics` (src/data/technologies.ts) and `project-optimus`
 * (src/data/supporting.ts).
 *
 * Every figure here was read from the abstract of the paper cited beside it, resolved through Europe PMC by DOI, or
 * from the regulator's or guideline body's own page. Exposure precision and clinical benefit are kept apart in each
 * record: a dose that hits its target blood level more often is not the same claim as a patient who lives longer,
 * and where only the first has been shown the record says so.
 *
 * Each record carries an evidence grade as a tag `evidence:<grade>` on the src/data/complementary.ts model, here
 * graded for the clinical benefit of the more precise dosing, not for the measurement itself.
 *
 * UK spelling.
 */

const asOf = "2026-10-20";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });

const T = (grade: string, extra: string[] = []) => ["precision", `evidence:${grade}`, ...extra];
const tech = (x: Omit<TechnologyInput, "kind" | "asOf">): TechnologyInput => ({ kind: "technology", asOf, ...x });

// Sources used by more than one record.
const SAIF_2009 = doi("Pharmacokinetically guided dose adjustment of 5-fluorouracil: a rational approach to improving therapeutic outcomes (J Natl Cancer Inst 2009)", "10.1093/jnci/djp328");
const GAMELIN_2008 = doi("Individual fluorouracil dose adjustment based on pharmacokinetic follow-up compared with conventional dosage: results of a multicenter randomized trial of patients with metastatic colorectal cancer (J Clin Oncol 2008)", "10.1200/JCO.2007.13.3934");
const IATDMCT_2019 = doi("Therapeutic Drug Monitoring in Oncology: International Association of Therapeutic Drug Monitoring and Clinical Toxicology Recommendations for 5-Fluorouracil Therapy (Clin Pharmacol Ther 2019)", "10.1002/cpt.1124");
const PK_5FU_META_2026 = doi("Comparative efficacy and safety of pharmacokinetically guided and body surface area-based 5-fluorouracil dosing in colorectal cancer: a systematic review and meta-analysis (Eur J Clin Pharmacol 2026)", "10.1007/s00228-026-04174-9");
const KALDATE_2012 = doi("Modeling the 5-fluorouracil area under the curve versus dose relationship to develop a pharmacokinetic dosing algorithm for colorectal cancer patients receiving FOLFOX6 (Oncologist 2012)", "10.1634/theoncologist.2011-0357");
const CALVERT_1989 = doi("Carboplatin dosage: prospective evaluation of a simple formula based on renal function (J Clin Oncol 1989)", "10.1200/JCO.1989.7.11.1748");
const JANOWITZ_2017 = doi("New Model for Estimating Glomerular Filtration Rate in Patients With Cancer (J Clin Oncol 2017)", "10.1200/JCO.2017.72.7578");
const THOMAS_CYSC_2009 = doi("A universal formula based on cystatin C to perform individual dosing of carboplatin in normal weight, underweight, and obese patients (Clin Cancer Res 2009)", "10.1158/1078-0432.CCR-09-0017");
const CYSC_SARCOPENIA_2024 = doi("Sarcopenia, adiposity and large discordance between cystatin C and creatinine-based estimated glomerular filtration rate in patients with cancer (J Cachexia Sarcopenia Muscle 2024)", "10.1002/jcsm.13469");
const GROENLAND_2022 = doi("Therapeutic drug monitoring-based precision dosing of oral targeted therapies in oncology: a prospective multicenter study (Ann Oncol 2022)", "10.1016/j.annonc.2022.06.010");
const ASCO_OBESITY_2012 = doi("Appropriate chemotherapy dosing for obese adult patients with cancer: American Society of Clinical Oncology clinical practice guideline (J Clin Oncol 2012)", "10.1200/JCO.2011.39.9436");
const ASCO_OBESITY_2021 = doi("Appropriate Systemic Therapy Dosing for Obese Adult Patients With Cancer: ASCO Guideline Update (J Clin Oncol 2021)", "10.1200/JCO.21.00471");

/**
 * Drawings for the four records this file adds. None needs a drawing of its own: dosing a cytotoxic drug reads as the
 * chemotherapy scene, and monitoring the blood level of an oral targeted drug reads as the kinase inhibitor one.
 * Spread into SCHEMATIC_ALIAS in src/data/schematics.ts; src/data/animated-wave8.test.ts is what catches a miss.
 */
export const precisionDosingSchematicAliases: Record<string, string> = {
  "fluorouracil-pharmacokinetic-dosing": "cytotoxic-chemotherapy",
  "carboplatin-calvert-dosing": "cytotoxic-chemotherapy",
  "chemotherapy-dosing-in-obesity": "cytotoxic-chemotherapy",
  "oral-targeted-therapy-drug-monitoring": "kinase-inhibitors",
};

export const precisionDosing: EntityInput[] = [
  tech({ id: "fluorouracil-pharmacokinetic-dosing", name: "Fluorouracil dosing by measured blood level", status: "emerging", sections: ["chemotherapy", "supportive-care"], tags: T("moderate"),
    aka: ["5-FU therapeutic drug monitoring", "5-FU AUC-guided dosing", "pharmacokinetically guided fluorouracil dosing", "PK-guided 5-FU dosing", "fluorouracil TDM"],
    tldr: "Fluorouracil is dosed by body size, yet the amount of drug in the blood varies widely between people given the same dose. Measuring the level during the infusion and adjusting the next dose raised the response rate from 18 to 34 per cent in one randomised trial and is recommended by an international pharmacology society, but it is not routine care and no survival gain has been established.",
    summary: "What it measures. Infusional fluorouracil is given in milligrams per square metre of body surface. A single blood sample taken while the infusion is running gives the drug's exposure as an area under the concentration-time curve, in milligram-hours per litre, and the next cycle's dose is raised or lowered towards a target range. A 2009 review in the Journal of the National Cancer Institute put the problem in one line: only 20 to 30 per cent of patients on a fluorouracil regimen dosed by surface area have blood levels in the therapeutic range, about 40 to 60 per cent are underdosed and 10 to 20 per cent overdosed. A model built on 589 patients receiving FOLFOX6 recommended adjusting every cycle to keep exposure between 20 and 30 milligram-hours per litre.\n\nWhat the trials showed. The randomised trial, published in 2008, enrolled 208 people with metastatic colorectal cancer received weekly eight-hour infusions of fluorouracil with folinic acid, dosed either by surface area or by weekly blood levels aimed at 20 to 25 milligram-hours per litre. Response was 18.3 per cent with surface-area dosing and 33.7 per cent with level-guided dosing, median overall survival 16 and 22 months (a difference that did not reach statistical significance), and severe toxicity was commoner in the surface-area arm. The level-guided arm ended up with a higher mean dose, 1,790 against 1,500 milligrams per square metre a week, consistent with the review finding that underdosing is the commoner error. In 2019 the International Association of Therapeutic Drug Monitoring and Clinical Toxicology strongly recommended monitoring for colorectal and head and neck cancer on common fluorouracil regimens. A 2026 meta-analysis of five studies and 809 patients found level-guided dosing halved severe toxicity (risk ratio 0.50) and raised response (risk ratio 1.50), and said that progression-free and overall survival benefits could not be established from a small and heterogeneous evidence base.\n\nWhere it stands. Measuring exposure is precise; what that precision buys is shown for toxicity and response and not for survival. The randomised evidence used a weekly schedule rather than the FOLFOX and FOLFIRI regimens given today, and the observational evidence is mostly in metastatic colorectal cancer. The evidence is for infusional fluorouracil and says nothing about capecitabine, the tablet form. It is complementary to testing for DPD deficiency before the first dose, which finds the few people at risk of severe early toxicity; level-guided dosing corrects the commoner problem of too little drug.",
    principle: "A steady-state plasma fluorouracil concentration during a continuous infusion, multiplied by infusion time, estimates exposure; the next dose is changed in proportion to the gap between measured and target exposure.",
    strengths: ["Addresses underdosing, which the review evidence says is commoner than overdosing", "One randomised trial and a meta-analysis agree on lower toxicity and higher response", "Recommended by the international therapeutic drug monitoring society"],
    limitations: ["No survival benefit established", "The randomised trial used a weekly schedule no longer standard", "Not widely used, which a 2009 review put down to the lack of a simple, fast and inexpensive assay"],
    cancers: ["colorectal", "head-and-neck"], drugs: ["fluorouracil"], terms: ["pharmacokinetics", "therapeutic-index", "dose-modification"],
    technologies: ["body-surface-area-dosing", "dpyd-genotyping", "pkpd-modelling", "oral-targeted-therapy-drug-monitoring"], bottlenecks: ["b-dose-optimisation"],
    links: [GAMELIN_2008, IATDMCT_2019, PK_5FU_META_2026, SAIF_2009, KALDATE_2012] }),

  tech({ id: "carboplatin-calvert-dosing", name: "Carboplatin dosing by kidney function: the Calvert formula and how kidney function is measured", status: "standard-of-care", since: 1989, sections: ["chemotherapy"], tags: T("moderate"),
    aka: ["Calvert formula", "carboplatin AUC dosing", "AUC-based carboplatin dosing", "dose = target AUC x (GFR + 25)", "carboplatin GFR dosing"],
    tldr: "Carboplatin is dosed by kidney function rather than body size, using a formula from 1989 that aims at a set drug exposure. The formula is only as good as the kidney measurement fed into it: in a study of 2,471 people with cancer, the usual blood-test estimates missed the intended dose by more than a fifth in about one person in five to one in four.",
    summary: "The formula. Carboplatin leaves the body almost entirely through the kidneys. Calvert and colleagues found that its clearance rose in a straight line with glomerular filtration rate, and after testing the first version prospectively in 31 patients they recommended dose in milligrams equals the target exposure multiplied by the filtration rate plus 25. Exposure is expressed as an area under the curve in milligrams per millilitre per minute; they recommended targets of 5 for previously treated and 7 for untreated patients on carboplatin alone, and noted that the target would have to be set again for combinations. Because the formula aims at exposure rather than toxicity, it carries over to combination and high-dose treatment.\n\nWhere the error enters. Filtration rate can be measured directly, by clearance of an injected tracer such as chromium-51 EDTA, or estimated from a blood creatinine level with an equation. A Cambridge study of 2,471 patients with cancer compared seven published equations with measured clearance. The best published equation, CKD-EPI adjusted for body surface area, still gave a carboplatin dose more than 20 per cent away from the dose measured clearance would give in 18.6 per cent of patients, and the Cockcroft-Gault equation did so in 25.5 per cent; a new equation built on the same data brought that to 14.2 per cent. The study included white patients only. Creatinine comes from muscle, so it misleads most in people with little muscle: in 545 patients with cancer measured on CT, sarcopenia and high body fat each roughly doubled the odds that creatinine and cystatin C estimates disagreed by more than 30 per cent, and 48 per cent of the whole group had a disagreement that large.\n\nThe next step. Cystatin C is less affected by muscle mass, though the 2024 study notes it may underestimate kidney function in obesity. A multicentre study of 357 patients built a carboplatin clearance equation from creatinine, cystatin C, weight, age and sex, with a bias of 1 per cent and an imprecision of 15 per cent, similar in underweight, normal-weight and obese patients. OnCo found no trial showing that more precise filtration measurement changes survival or toxicity; the evidence is about hitting the intended exposure.",
    principle: "Carboplatin clearance is approximately glomerular filtration rate plus a small non-renal component, so dose (mg) = target AUC (mg/mL·min) × (GFR in mL/min + 25).",
    strengths: ["Doses to a target exposure rather than to body size", "Built and tested prospectively against measured drug levels", "Works for combination and high-dose regimens once the target is set"],
    limitations: ["Only as accurate as the filtration rate entered", "Creatinine-based estimates err most in people with little muscle", "Measured clearance needs an injected tracer and timed samples"],
    cancers: ["ovarian", "nsclc", "testicular", "head-and-neck", "breast-cancer"], drugs: ["carboplatin"], terms: ["pharmacokinetics", "dose-modification"],
    technologies: ["body-surface-area-dosing", "pkpd-modelling", "ct-body-composition-sarcopenia"], keyPapers: ["paper-calvert-j-clin-oncol"], bottlenecks: ["b-dose-optimisation"],
    links: [CALVERT_1989, JANOWITZ_2017, THOMAS_CYSC_2009, CYSC_SARCOPENIA_2024] }),

  tech({ id: "oral-targeted-therapy-drug-monitoring", name: "Blood-level monitoring of oral targeted cancer drugs", status: "emerging", sections: ["targeted-therapy", "supportive-care"], tags: T("insufficient"),
    aka: ["therapeutic drug monitoring of kinase inhibitors", "TDM of oral targeted therapies", "trough level monitoring", "pharmacokinetically guided dosing of targeted therapy"],
    tldr: "Cancer tablets such as kinase inhibitors are given at one dose for everyone, though the amount in the blood differs widely between people. A Dutch study of 600 patients measured trough levels and adjusted when they were low, cutting the share of people with too little drug by 39 per cent, but no trial has yet shown that this improves survival.",
    summary: "What it measures. For many oral targeted drugs, higher blood levels go with better effect, yet the levels reached on the standard dose vary widely between people because of absorption, food, other medicines and how reliably tablets are taken. Monitoring measures the lowest level before the next dose, the trough, against a predefined target.\n\nWhat was shown. A prospective multicentre study in the Netherlands enrolled 600 patients starting one of 24 oral targeted therapies and sampled blood at 4, 8 and 12 weeks and every 12 weeks after. When the trough was below target and side effects allowed, the team checked adherence and drug interactions, moved the dose to be taken with food, split it, or raised it. At the third measurement 25.8 per cent of 426 assessable patients still had low exposure, a 39.0 per cent reduction in the underexposed share compared with historical data. Over the whole study 53.3 per cent had at least one low level, and when an intervention was made it worked in 74.3 per cent of those assessable.\n\nWhere it stands. This is precision of exposure, and it is shown. Whether reaching the target lengthens life or delays progression has not been tested in a randomised trial in the sources OnCo read, and the comparison here is with historical patients rather than a concurrent control.",
    principle: "Plasma trough concentration compared with a target derived from exposure-response analyses, with stepwise interventions when below target.",
    strengths: ["Prospective, multicentre and across 24 drugs", "Many corrections need no dose increase: food, timing, interactions, adherence", "Cut the share of underexposed patients by 39 per cent against historical data"],
    limitations: ["No randomised evidence of survival or progression benefit", "Compared with historical rather than concurrent controls", "Targets are not established for every drug"],
    drugs: ["imatinib"], terms: ["pharmacokinetics", "therapeutic-index"], technologies: ["kinase-inhibitors", "pkpd-modelling", "fluorouracil-pharmacokinetic-dosing"],
    related: ["idea-tr1-therapeutic-drug-monitoring-for-oral-tkis"], bottlenecks: ["b-dose-optimisation"],
    links: [GROENLAND_2022] }),

  tech({ id: "chemotherapy-dosing-in-obesity", name: "Full weight-based chemotherapy dosing for people with obesity", status: "standard-of-care", since: 2012, sections: ["chemotherapy", "supportive-care"], tags: T("moderate"),
    aka: ["dose capping", "chemotherapy dosing in obese patients", "actual body weight dosing", "ASCO obesity dosing guideline"],
    tldr: "Chemotherapy doses used to be capped for larger people for fear of overdose. The American Society of Clinical Oncology guideline found that up to 40 per cent of people with obesity were given reduced doses, that the feared extra toxicity is unfounded, and recommends full doses based on actual body weight.",
    summary: "What changed. Doses based on body surface area grow with weight, and prescribers have capped the surface area at a fixed value or dosed on ideal rather than actual weight. The 2012 guideline from the American Society of Clinical Oncology reviewed studies published from 1996 to 2010, mostly in breast, ovarian, colon and lung cancer, and found that up to 40 per cent of obese patients received limited doses not based on actual body weight. It recommended full weight-based doses, particularly when the aim is cure, found no evidence that short or long-term toxicity was increased, and said most data showed myelosuppression the same or less pronounced in obese patients. It judged fixed dosing rarely justified, with exceptions for a few drugs.\n\nThe 2021 update. Sixty mostly retrospective studies published from 2010 to 2020 supported the same conclusion. The update extended it: full approved doses of immunotherapy and targeted therapy should also be offered to obese adults, and toxicity should be handled the same way whatever a person's size. It named sarcopenia and body composition as the main question still open.\n\nWhat precision means here. Dose capping is a deliberate loss of precision, a dose below the one the regimen was tested at. The guideline removes that. It does not make surface-area dosing itself any more precise, and the guideline abstracts do not put a figure on how much survival capping costs.",
    principle: "Body surface area is calculated from actual height and weight without an upper cap, and the per-square-metre or per-kilogram dose of the tested regimen is given in full.",
    strengths: ["A guideline recommendation repeated in two systematic reviews nine years apart", "Removes a common source of underdosing", "Simple to apply"],
    limitations: ["The evidence is mostly retrospective", "Does not address variation in exposure that surface area itself leaves", "Body composition, not weight, may be the better guide and is not yet in the guideline"],
    cancers: ["breast-cancer", "ovarian", "colorectal", "nsclc"], terms: ["dose-modification", "body-composition"],
    technologies: ["body-surface-area-dosing", "ct-body-composition-sarcopenia", "cytotoxic-chemotherapy"], related: ["obesity-related-cancers"], bottlenecks: ["b-dose-optimisation"],
    links: [ASCO_OBESITY_2012, ASCO_OBESITY_2021] }),
];
