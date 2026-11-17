import { protocol } from "./helpers";

/*
 * Neratinib: preventing diarrhoea from the first dose, either with scheduled loperamide for 56 days or with a two-week
 * dose escalation, and the label's rules for interrupting, reducing and stopping. The general approach to
 * treatment-induced diarrhoea is in its own protocol, linked in `related`.
 *
 * First written 11 November 2026 from the US label and the CONTROL paper.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text with curl into a scratch
 * directory and every claim re-read against it; every quote was checked verbatim by script.
 * - NERLYNX (neratinib) US prescribing information, DailyMed set d1e41dcf-e82a-47c2-a0ad-6c6eef621834, version 19,
 *   published 6 July 2026; the label text itself prints "Revised: 12/2025". Full SPL XML read (2.1 to 2.4 with
 *   Tables 1 to 6, 5.1, 6.1 with Tables 7 and 9, 8.6, 17 and the patient information).
 * - Nerlynx EU product information (SmPC and package leaflet), the PDF served by the European Medicines Agency,
 *   created 4 June 2025, read with pdftotext. It had not been read in the first pass.
 * - CONTROL final findings (Barcenas et al., The Breast 2023; PMC9982309): full text through the Europe PMC REST
 *   API. Its four tables are images and were not read; the cohort sizes come from the registry record instead.
 * - CONTROL results on ClinicalTrials.gov (NCT02400476), read as JSON through the registry's API.
 * - ExteNET primary report (Chan et al., Lancet Oncology 2016): abstract only, through Europe PMC.
 * The DOIs were resolved through Crossref or Europe PMC and their titles checked. Quotes are copied from the raw text
 * with nothing changed.
 */
export const neratinibDiarrhoeaProphylaxisAndDoseEscalation = protocol({
  id: "neratinib-diarrhoea-prophylaxis-and-dose-escalation",
  name: "Neratinib: diarrhoea prevention with loperamide or dose escalation",
  aka: ["neratinib diarrhoea prophylaxis", "Nerlynx loperamide schedule", "neratinib dose escalation", "CONTROL trial strategies"],
  domain: "oral-anticancer-therapy",
  tldr: "Neratinib, a tablet for HER2-positive breast cancer, causes diarrhoea in almost everyone. It is prevented in one of two ways, chosen before you start: loperamide on a fixed schedule from the first tablet for eight weeks, or a lower starting dose built up over two weeks. Tell your team at once if diarrhoea is severe or comes with weakness, dizziness or fever.",
  simple: "This cancer tablet often gives runny poo. Your team will either give you a medicine to take every day at the start or start with a smaller dose. Call them if it is bad.",
  summary: "Without required prophylaxis, diarrhoea occurred in 95 per cent of the 1,408 people given neratinib in ExteNET, grade 3 in 40 per cent (561 people in the trial report) and grade 4 in 0.1 per cent; 17 per cent stopped neratinib because of it, and the median time to the first episode of grade 3 or worse was 8 days. The US label gives two strategies from the first dose. Either loperamide prophylaxis for the first 56 days (4 mg three times daily on days 1 to 14, 4 mg twice daily on days 15 to 56, then 4 mg as needed, not more than 16 mg a day, titrated to one or two bowel movements a day), or a two-week neratinib dose escalation, which the label says may be considered (120 mg a day on days 1 to 7, 160 mg a day on days 8 to 14, 240 mg a day from week 3), with antidiarrhoeals if diarrhoea occurs. In the open-label phase II CONTROL trial, six sequential, non-comparative cohorts totalling 563 people starting extended adjuvant neratinib all had less grade 3 diarrhoea than ExteNET: 13 per cent with the two-week escalation (60 people), 21 per cent with colestipol plus loperamide (136), 27 per cent with the four-week escalation (62), 28 per cent with budesonide plus loperamide (64), 31 per cent with loperamide alone (137) and 33 per cent with colestipol plus loperamide as needed (104). Diarrhoea-related discontinuation was 3 per cent with the two-week escalation and 20 per cent with loperamide alone. The US label's own CONTROL table differs slightly for loperamide: 32 per cent grade 3 and 18 per cent discontinuation among 109 people, against 13 and 3.3 per cent among the 60 on escalation; in that table diarrhoea of any grade was more common with escalation (98 against 78 per cent). The label's dose modification tables set when to adjust antidiarrhoeals, interrupt, reduce or stop. The EU summary of product characteristics is narrower: it has no escalation schedule and prints no loperamide doses.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage"],
  },
  population: "Adults starting neratinib for HER2-positive breast cancer. Under the US label that is extended adjuvant treatment of early-stage disease after trastuzumab-based therapy, or treatment with capecitabine for advanced or metastatic disease after two or more anti-HER2 regimens; under the EU summary of product characteristics it is only extended adjuvant treatment of hormone receptor positive disease, started within one year of finishing trastuzumab. CONTROL enrolled only people starting extended adjuvant neratinib. The interrupt, reduce and stop steps below are the US label's rules for neratinib taken alone; with capecitabine the label has a separate table with different rules. People with severe hepatic impairment (Child-Pugh C) are outside both schedules: the US label reduces their starting dose to 80 mg and the EU summary contraindicates neratinib.",
  trigger: "Neratinib is prescribed.",
  steps: [
    {
      action: "Before the first tablet, choose the strategy: loperamide prophylaxis for the first 56 days at the full dose, or a two-week neratinib dose escalation instead",
      why: "Without prevention almost everyone in the main trial had diarrhoea, most of them in the first month. The US label says prophylaxis lowers how often and how severely it happens, and that escalation can also be considered.",
      source: "nerlynx-us-label",
      quote: "Alternatively, a 2-week NERLYNX dose escalation approach prior to initiation of the recommended treatment regimen with NERLYNX can also be considered for diarrhea management",
    },
    {
      action: "If not using dose escalation, start loperamide with the first dose: 4 mg three times daily on days 1 to 14, 4 mg twice daily on days 15 to 56, then 4 mg as needed, not more than 16 mg a day",
      why: "The label asks for loperamide on a fixed schedule from the first dose for the first 56 days, rather than waiting for diarrhoea to start.",
      source: "nerlynx-us-label",
      quote: "Weeks 1–2 (days 1–14) 4 mg three times daily Weeks 3–8 (days 15–56) 4 mg twice daily Weeks 9–Discontinuation of NERLYNX 4 mg as needed, not to exceed 16 mg per day; titrate dosing to achieve 1–2 bowel movements per day",
    },
    {
      action: "If using dose escalation, give 120 mg daily in week 1 (days 1 to 7), 160 mg daily in week 2 (days 8 to 14) and 240 mg daily from week 3, and treat diarrhoea with antidiarrhoeals, fluids and electrolytes if it occurs",
      why: "Starting lower and building up over two weeks gave the lowest rate of grade 3 diarrhoea in the CONTROL trial (13 per cent), although milder diarrhoea was still very common.",
      source: "nerlynx-us-label",
      quote: "Week 1 (days 1–7) 120 mg daily (three 40 mg tablets) Week 2 (days 8–14) 160 mg daily (four 40 mg tablets) Week 3 and onwards 240 mg daily (six 40 mg tablets, recommended dose)",
    },
    {
      action: "Titrate loperamide to one or two bowel movements a day, and teach the person to keep to that target and how to use their antidiarrhoeals",
      why: "One or two bowel movements a day is the target the label sets. Its patient leaflet asks people to tell their team if they have more than two in a day or diarrhoea that does not go away.",
      source: "nerlynx-us-label",
      quote: "Instruct patients to maintain 1–2 bowel movements per day and on how to use antidiarrheal treatment regimens.",
    },
    {
      action: "For grade 1 diarrhoea, grade 2 lasting up to 5 days, or grade 3 lasting up to 2 days: adjust antidiarrhoeals, change diet and keep fluid intake around 2 litres a day; once it settles, start loperamide 4 mg with each neratinib dose",
      why: "The label manages diarrhoea of these grades and durations with antidiarrhoeal medicine, diet and fluids, without interrupting neratinib.",
      source: "nerlynx-us-label",
      quote: "Adjust antidiarrheal treatment Diet modifications Fluid intake of ~2 L/day should be maintained to avoid dehydration",
    },
    {
      action: "On neratinib alone, interrupt it for diarrhoea of any grade with complicating features (dehydration, fever, low blood pressure, kidney failure, grade 3 or 4 neutropenia), grade 2 lasting more than 5 days or grade 3 lasting more than 2 days despite optimal treatment; resume at the same dose if it settles to grade 1 or less within a week, otherwise at the next lower dose (200 mg, then 160 mg, then 120 mg a day)",
      why: "The label pauses neratinib until the diarrhoea has settled, and lowers the dose when recovery took more than a week.",
      source: "nerlynx-us-label",
      quote: "If diarrhea resolves to ≤Grade 1 in one week or less, then resume NERLYNX treatment at the same dose If diarrhea resolves to ≤Grade 1 in longer than one week, then resume NERLYNX treatment at reduced dose",
    },
    {
      action: "On neratinib alone, stop it permanently for grade 4 diarrhoea, or if diarrhoea of grade 2 or worse recurs at 120 mg a day",
      why: "These are the points at which the label says to stop for good: life-threatening diarrhoea, or diarrhoea that comes back at the lowest dose. With capecitabine the label's rules are different.",
      source: "nerlynx-us-label",
      quote: "Permanently discontinue NERLYNX treatment Diarrhea recurs to Grade 2 or higher at 120 mg per day Permanently discontinue NERLYNX treatment",
    },
    {
      action: "Ask the person to tell their team immediately about severe diarrhoea, or diarrhoea with weakness, dizziness or fever",
      why: "Severe diarrhoea on neratinib has led to dehydration, low blood pressure and kidney failure.",
      source: "nerlynx-us-label",
      quote: "Advise patients to inform their healthcare provider immediately if severe (≥Grade 3) diarrhea or diarrhea associated with weakness, dizziness, or fever occurs during treatment with NERLYNX",
    },
  ],
  bestInClass: {
    statement: "The current US label (text revised December 2025) recommends loperamide from the first dose for 56 days when escalation is not used, and says a two-week dose escalation with antidiarrhoeals as needed may be considered instead. On the evidence read, the two-week escalation gave the lowest rates of grade 3 diarrhoea (13 per cent) and of diarrhoea-related discontinuation (3 per cent) in CONTROL, against 31 and 20 per cent with loperamide alone in the trial report, or 32 and 18 per cent in the label's table; but CONTROL's cohorts were enrolled one after another and not randomised against each other, so the comparison is indirect. The EU summary of product characteristics gives only antidiarrhoeal prophylaxis for the first one to two months and has no escalation schedule. No graded guideline on neratinib diarrhoea was found.",
    sources: ["nerlynx-us-label", "control-2023", "nerlynx-eu-smpc"],
  },
  variants: [
    {
      name: "EU summary of product characteristics",
      differs: "It gives no dose escalation schedule and prints no loperamide doses: prophylaxis with an antidiarrhoeal starts with the first dose and continues for the first one to two months, titrated to one or two bowel movements a day. Its diarrhoea table interrupts neratinib for grade 2 lasting 5 days or longer and for grade 3 lasting between 2 days and 3 weeks, and stops it permanently if grade 3 lasts longer than 3 weeks; once an episode settles it says to consider restarting antidiarrhoeal prophylaxis, where the US label says to start loperamide 4 mg with each dose. Severe hepatic impairment (Child-Pugh C) is a contraindication, where the US label reduces the starting dose to 80 mg. Its leaflet tells people who feel dizzy or weak from diarrhoea to talk to their doctor, and to go to hospital immediately if the doctor is not available.",
      evidence: "Product labelling, not graded. It reports pooled figures for 1,660 people given neratinib alone without loperamide prophylaxis: diarrhoea in 94.6 per cent, grade 3 in 37.5 per cent, grade 4 in 0.2 per cent, and 14.4 per cent stopping treatment because of it.",
      sources: ["nerlynx-eu-smpc", "nerlynx-us-label"],
    },
    {
      name: "Four-week dose escalation (CONTROL DE2)",
      differs: "Neratinib 160 mg a day on days 1 to 14 and 200 mg a day on days 15 to 28, then 240 mg, with loperamide as needed.",
      evidence: "Grade 3 diarrhoea 27 per cent of 62 people, higher than the two-week schedule. Diarrhoea-related discontinuation is printed as 6 per cent in the paper's abstract and 7 per cent in its results text, against 3 per cent with the two-week schedule. Not in either label. Open-label, non-comparative cohort.",
      sources: ["control-2023", "control-ctgov"],
    },
    {
      name: "Loperamide plus budesonide (CONTROL BL)",
      differs: "Adds budesonide 9 mg once daily on days 1 to 28 to the 56-day loperamide schedule.",
      evidence: "Grade 3 diarrhoea 28 per cent of 64 people and diarrhoea-related discontinuation 11 per cent, against 31 and 20 per cent of 137 people with loperamide alone. Open-label, non-comparative cohort.",
      sources: ["control-2023", "control-ctgov"],
    },
    {
      name: "Loperamide plus colestipol (CONTROL CL and CL-PRN)",
      differs: "Adds the bile acid sequestrant colestipol 2 g twice daily on days 1 to 28. In CL, scheduled loperamide ran for 28 days only (4 mg three times daily on days 1 to 14, twice daily on days 15 to 28); in CL-PRN, loperamide was taken as needed.",
      evidence: "Grade 3 diarrhoea 21 per cent of 136 people in CL and 33 per cent of 104 in CL-PRN; diarrhoea-related discontinuations 4 and 8 per cent. Open-label, non-comparative cohorts. The US label says to consider adding other agents to loperamide as clinically indicated, without naming them.",
      sources: ["control-2023", "control-ctgov", "nerlynx-us-label"],
    },
  ],
  grades: [
    { claim: "Grade 3 diarrhoea and discontinuation by strategy in CONTROL", grade: "open-label phase II, six non-comparative cohorts (n = 563)", source: "control-2023", quote: "All strategies reduced grade ≥3 diarrhea with the lowest incidence in DE1 (DE1 13%; colestipol + loperamide [CL] 21%, DE2 27%; budesonide + loperamide [BL] 28%; loperamide [L] 31%; colestipol + loperamide as needed [CL-PRN] 33%)." },
    { claim: "Without required prophylaxis (ExteNET), grade 3 diarrhoea occurred in 40 per cent", grade: "Label incidence from the registration trial", source: "nerlynx-us-label", quote: "In the NERLYNX arm, Grade 3 diarrhea occurred in 40% and Grade 4 diarrhea occurred in 0.1% of patients." },
    { claim: "In ExteNET, 17 per cent stopped neratinib because of diarrhoea", grade: "Label incidence from the registration trial", source: "nerlynx-us-label", quote: "The most common adverse reaction leading to discontinuation was diarrhea, accounting for 17% of NERLYNX-treated patients." },
    { claim: "The EU summary of product characteristics asks for antidiarrhoeal prophylaxis for the first one to two months, without a dose", grade: "Product labelling; not graded", source: "nerlynx-eu-smpc", quote: "Patients should be instructed to initiate prophylactic treatment with an anti-diarrhoeal medicinal product with the first dose of Nerlynx, and maintain regular dosing of the anti-diarrhoeal medicinal product during the first 1-2 months of Nerlynx treatment, titrating to 1-2 bowel movements per day." },
    { claim: "Starting dose in severe hepatic impairment under the US label", grade: "Product labelling; not graded", source: "nerlynx-us-label", quote: "Reduce the NERLYNX starting dose to 80 mg in patients with severe hepatic impairment (Child Pugh C)." },
  ],
  sources: [
    { key: "nerlynx-us-label", label: "NERLYNX (neratinib) tablets: US prescribing information, revised December 2025 (DailyMed version 19, published 6 July 2026)", publisher: "Puma Biotechnology, via DailyMed, US National Library of Medicine", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d1e41dcf-e82a-47c2-a0ad-6c6eef621834", gradingScheme: "Product labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nerlynx-eu-smpc", label: "Nerlynx (neratinib) 40 mg film-coated tablets: EU product information (summary of product characteristics and package leaflet)", publisher: "Pierre Fabre Médicament, via the European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/nerlynx-epar-product-information_en.pdf", gradingScheme: "Product labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "control-2023", label: "Final findings from the CONTROL trial: strategies to reduce the incidence and severity of neratinib-associated diarrhea in patients with HER2-positive early-stage breast cancer", publisher: "The Breast", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9982309/", doi: "10.1016/j.breast.2022.12.003", read: "full-text", accessed: "2026-11-17" },
    { key: "control-ctgov", label: "CONTROL (NCT02400476): posted results, participant flow and primary outcome", publisher: "ClinicalTrials.gov, US National Library of Medicine", year: 2022, url: "https://clinicaltrials.gov/study/NCT02400476", read: "full-text", accessed: "2026-11-17" },
    { key: "extenet-2016", label: "Neratinib after trastuzumab-based adjuvant therapy in patients with HER2-positive breast cancer (ExteNET): a multicentre, randomised, double-blind, placebo-controlled, phase 3 trial", publisher: "The Lancet Oncology", year: 2016, url: "https://doi.org/10.1016/S1470-2045(15)00551-3", doi: "10.1016/S1470-2045(15)00551-3", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-neratinib-two-week-dose-escalation-by-default"],
  gaps: [
    "No randomised comparison of the strategies exists in the sources read: CONTROL's cohorts were enrolled one after another and compared with ExteNET, a different trial.",
    "The US label and the CONTROL paper give different figures for loperamide alone (32 per cent grade 3 and 18 per cent discontinuation among 109 people in the label; 31 and 20 per cent among 137 in the paper). Neither source explains the difference.",
    "The CONTROL paper prints the diarrhoea-related discontinuation rate for the four-week escalation as 6 per cent in its abstract and 7 per cent in its results. Its four tables are images and could not be read as text on 17 November 2026, so the cohort sizes here come from the trial's ClinicalTrials.gov record, which does not report discontinuations for diarrhoea separately.",
    "ExteNET was read as an abstract only on 17 November 2026: the full report is behind a paywall. The abstract gives 561 people with grade 3 diarrhoea; the 1,408 treated and the 17 per cent who stopped for diarrhoea are the US label's figures.",
    "The EU product information read is the PDF the European Medicines Agency served on 17 November 2026, created on 4 June 2025; its section 10 prints no revision date.",
    "The US label's fluid figure, about 2 litres a day, is given for managing diarrhoea once it has started; no source read sets a daily fluid target for prevention.",
    "No graded guideline on neratinib diarrhoea was found. The general ESMO diarrhoea guideline (2018) still could not be read on 17 November 2026: Europe PMC holds no abstract or open copy and the publisher did not serve the text to a script.",
    "CONTROL studied extended adjuvant neratinib only. In metastatic disease with capecitabine (NALA), anti-diarrhoeal prophylaxis was required in the first 21-day cycle; the US label says the two-week escalation may be considered in metastatic disease too, and has a separate dose modification table for the combination that is not set out here.",
  ],
  cancers: ["breast-her2-positive"],
  companies: ["puma-biotechnology"],
  technologies: ["her2-tyrosine-kinase-inhibitors"],
  drugs: ["neratinib", "loperamide"],
  trials: ["nala"],
  terms: ["ctcae-grading"],
  related: ["treatment-induced-diarrhoea-grading-and-management", "capecitabine"],
  sections: ["supportive-care"],
  tags: ["protocol", "diarrhoea", "supportive-care"],
});
