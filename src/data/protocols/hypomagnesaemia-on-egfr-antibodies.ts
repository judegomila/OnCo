import { protocol } from "./helpers";

/*
 * Monitoring and replacing magnesium (with potassium and calcium) in adults having the EGFR antibodies cetuximab or
 * panitumumab.
 *
 * Written on 16 November 2026. Re-read by an independent second reader on 17 November 2026: every source below was
 * fetched again as raw text with curl (PDFs through pdftotext, XML and HTML stripped of tags by script), every quote
 * was matched verbatim by script, and each step, dose and grade was compared with the passage it cites.
 * - US prescribing information from DailyMed (SPL XML, full text): Erbitux (cetuximab, setid 8bc6397e, version 58,
 *   published 30 April 2026) and Vectibix (panitumumab, e0fa4bca, version 161, published 26 June 2026). Neither has a
 *   dose-modification rule for low magnesium.
 * - EU product information (EMA, PDF read with pdftotext): Erbitux and Vectibix summaries of product
 *   characteristics, section 4.4, as served by ema.europa.eu on 17 November 2026. Neither prints a revision date;
 *   the files' creation dates are 17 June 2026 (Erbitux) and 18 April 2025 (Vectibix).
 * - Workeneh et al., "Hypomagnesemia in the Cancer Patient", Kidney360 2021: full text. Europe PMC returned an error
 *   for the full-text XML and the NCBI E-utilities copy withholds the body, so the article page on PubMed Central
 *   (PMC8785729) was fetched once with curl and stripped to text. Funding: a US National Institutes of Health grant
 *   to one author. Disclosures: one author consults for Astex Pharmaceuticals and Natera, and one is on a speakers
 *   bureau for AstraZeneca.
 * - Kato et al., Cancer Diagnosis and Prognosis 2024, systematic review of magnesium supplementation for anti-EGFR
 *   antibody hypomagnesaemia, done for a Japanese guideline committee: full text, PubMed Central page (PMC11215447).
 * - The guideline that review was done for, found on 17 November 2026 from its reference list: Yanagita et al.,
 *   "Clinical questions and good practice statements of clinical practice guidelines for management of kidney injury
 *   during anticancer drug therapy 2022", Clinical and Experimental Nephrology 2024: full text, Europe PMC XML
 *   (PMC10808569). Its clinical question 8 is a graded recommendation on this problem, which the first version of
 *   this page said did not exist.
 * - Siddiqui, Ahmed and Vickers, EMJ 2021, review of replacement strategies: full text, the journal's PDF. The
 *   authors declare no conflicts of interest.
 * - Fakih, Oncology (Williston Park) 2008, a commentary describing one US centre's practice: full text, the
 *   cancernetwork.com page. Its disclosure reads: "Dr. Fakih has received honoraria from ImClone for educational
 *   activities." ImClone made cetuximab.
 * - Wang et al., Tumor Biology 2015, pooled analysis of 25 randomised trials of electrolyte disorders: full text,
 *   Europe PMC XML (PMC4445483).
 * - CTCAE version 5.0 (and 6.0, identical for this term): the US National Cancer Institute's spreadsheet, re-used
 *   from the copy another checker fetched and unpacked on 16 and 17 November 2026.
 * - Cancer Research UK's patient pages on cetuximab and panitumumab (fetched with curl), for the symptoms patients
 *   are asked to report.
 *
 * Not found or not read: no ESMO, ASCO, MASCC or NCCN guideline on this problem was found. A web search found no
 * public UK cancer-network or specialist-pharmacy guideline. The MAGNET trial of early oral magnesium is known here
 * only from the EMJ review's account of it. No DailyMed label is listed for necitumumab. The amivantamab label
 * (Rybrevant, re-read 17 November 2026) lists decreased magnesium among laboratory findings but gives no monitoring
 * instruction, so amivantamab is not covered.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; where a sentence ends in a reference number the quote stops before it.
 */
export const hypomagnesaemiaOnEgfrAntibodies = protocol({
  id: "hypomagnesaemia-on-egfr-antibodies",
  name: "Low magnesium on cetuximab and panitumumab: monitoring and replacement",
  aka: ["cetuximab hypomagnesaemia", "panitumumab hypomagnesaemia", "EGFR antibody hypomagnesemia", "magnesium wasting on anti-EGFR antibodies", "low magnesium on Erbitux", "low magnesium on Vectibix", "electrolyte monitoring on cetuximab", "magnesium replacement during cetuximab"],
  domain: "symptom-management",
  tldr: "Cetuximab and panitumumab make the kidneys lose magnesium, and the level tends to fall the longer treatment goes on. Blood magnesium, calcium and potassium are checked before, during and for about 8 weeks after treatment. Low levels are treated with magnesium tablets or a drip. Tell your team about cramp, tingling or numbness, palpitations or feeling faint. Your team's plan comes first.",
  simple: "These two cancer medicines can make your body lose magnesium, a salt your muscles and heart need. Your team checks it with blood tests before, during and after treatment. If it is low you may get magnesium tablets or a drip. Tell your doctor or nurse about cramp in your arms or legs, tingling or numbness, a heartbeat that feels irregular, or feeling faint.",
  summary: "EGFR antibodies remove the signal that stimulates the magnesium channel TRPM6 in the distal convoluted tubule, so magnesium is lost in the urine; the fall worsens with duration of treatment and is reversible after the antibody stops. The US labels report decreased magnesium in 55% of patients on cetuximab (grade 3 or 4 in 6% to 17%) and 38% on panitumumab alone, 51% with FOLFOX and 69% with sotorasib. A pooled analysis of 25 randomised trials found all-grade hypomagnesaemia in 34.0% against 9.7% of controls, and more grade 3 or 4 hypokalaemia (6.7% against 3.7%). The cetuximab label carries a boxed warning for cardiopulmonary arrest in head and neck cancer and asks for magnesium, potassium and calcium monitoring during and after treatment. Grades are CTCAE version 5.0: grade 1 is below the laboratory's lower limit down to 0.5 mmol/L (1.2 mg/dL), grade 2 below 0.5 to 0.4 mmol/L (below 1.2 to 0.9 mg/dL), grade 3 below 0.4 to 0.3 mmol/L (below 0.9 to 0.7 mg/dL) and grade 4 below 0.3 mmol/L (below 0.7 mg/dL).\n\nMonitoring is the only part the regulators specify, and they differ: the US cetuximab label says weekly during treatment and for at least 8 weeks after; the US and EU panitumumab texts say before, periodically during and for up to 8 weeks after; the EU cetuximab text says before and periodically during. No label sets a dose rule for low magnesium.\n\nReplacement is not settled. One guideline addresses it: the Japanese 2022 guideline on kidney injury during anticancer drug therapy weakly recommends additional magnesium when hypomagnesaemia develops, rates the evidence D (very weak), and its recommendation names no dose or route. No ESMO, ASCO, MASCC or NCCN guideline was found. Published practice differs. One US centre (Fakih 2008) found oral magnesium ineffective and poorly tolerated and gave weekly intravenous magnesium sulfate 4 g for grade 2 at 0.9 to 1.0 mg/dL and about 6 to 10 g daily to twice weekly for grade 3 or 4. A nephrology review (Workeneh 2021) repeats this as 4 g weekly for grade 2 and 6 to 10 g daily for grade 3 or 4, and says parenteral magnesium should not exceed 1 g an hour unless there are seizures or a lethal arrhythmia. A Canadian review (Siddiqui 2021) supports early or preventive oral magnesium and keeps intravenous magnesium mainly for immediate correction, citing a randomised trial not read here. Where low potassium accompanies low magnesium it will not correct until the magnesium does, and severe hypomagnesaemia can cause low calcium. For refractory cases the options described are a planned break from the antibody (one centre's experience) and amiloride (suggested from its use in other causes of magnesium loss).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "ward", "acute-oncology-service"],
  },
  population: "Adults having cetuximab or panitumumab for bowel cancer or head and neck cancer, alone or with chemotherapy or radiotherapy. Low magnesium from platinum chemotherapy, proton pump inhibitors, diuretics, diarrhoea or poor intake can coexist and is not the subject here. Other EGFR antibodies (necitumumab, amivantamab) and EGFR tablets are not covered because no source read gives monitoring advice for them. Children are not covered.",
  trigger: "Cetuximab or panitumumab is about to be started, or a blood test during or after treatment shows low magnesium, calcium or potassium.",
  steps: [
    {
      action: "Measure magnesium and calcium, with potassium and other electrolytes, before the first dose",
      why: "A starting value gives a baseline to judge later falls against. The US panitumumab label names magnesium and calcium; the EU cetuximab text says serum electrolytes.",
      source: "label-panitumumab",
      quote: "Monitor patients for hypomagnesemia and hypocalcemia prior to initiating Vectibix treatment, periodically during Vectibix treatment, and for up to 8 weeks after the completion of treatment.",
    },
    {
      action: "Repeat magnesium, calcium and potassium during treatment: weekly on cetuximab under the US label, and periodically under the other texts (in a Canadian survey over 90% of oncologists checked magnesium before each infusion)",
      why: "The US cetuximab label says low magnesium and the electrolyte changes that go with it can start days to months into treatment.",
      source: "label-cetuximab",
      quote: "Monitor patients weekly during treatment for hypomagnesemia, hypocalcemia, and hypokalemia, and for at least 8 weeks following the completion of ERBITUX.",
    },
    {
      action: "Expect the risk to rise with longer treatment, older age and platinum chemotherapy given alongside",
      why: "In one US centre's series of 114 patients on cetuximab, grade 3 or 4 falls were seen in 5% of those treated for under 3 months, 23% at 3 to 6 months and 47% beyond 6 months (Fakih 2008), so a normal early result does not mean the checks can stop.",
      source: "emj-2021",
      quote: "Routine monitoring of MG levels is required, and recognition of risk factors such as advancing age, longer duration of EGFRI therapy, and concomitant platinum chemotherapy is important",
    },
    {
      action: "Consider an ECG before treatment to measure the QT interval",
      why: "The review's reason is that low magnesium could add to the risk of heart rhythm problems, and a baseline tracing gives something to compare with.",
      source: "emj-2021",
      quote: "Physicians should also consider electrocardiograms for baseline QTc assessments, as hMG could exacerbate the risk of cardiac arrhythmias.",
    },
    {
      action: "In head and neck cancer treated with cetuximab and radiotherapy, or with platinum and fluorouracil, monitor magnesium, potassium and calcium during and after treatment, and consider carefully whether to use cetuximab where there is a history of coronary artery disease, heart failure or arrhythmia",
      why: "Cardiopulmonary arrest or sudden death occurred in 2% of 208 patients given cetuximab with radiotherapy in one trial, and the label attaches electrolyte monitoring to that warning. The 2008 commentary says it is unclear whether low magnesium played a part in such deaths.",
      source: "label-cetuximab",
      quote: "Monitor serum electrolytes, including serum magnesium, potassium, and calcium, during and after ERBITUX administration.",
    },
    {
      action: "Ask about tiredness, cramps and drowsiness",
      why: "People often put these symptoms down to chemotherapy; in one centre, energy and performance status improved once grade 3 or 4 low magnesium was corrected. Cancer Research UK asks patients on panitumumab to report cramp, tingling or numbness, palpitations or feeling faint.",
      source: "fakih-2008",
      quote: "These patients are often symptomatic with fatigue, cramps, or somnolence.",
    },
    {
      action: "When magnesium is low without acute symptoms, look for medicines that may be contributing, such as proton pump inhibitors and thiazide or loop diuretics, and stop them where that is possible",
      why: "The review lists these among the medicines that lower magnesium, and removing a contributing medicine is part of treating a fall that is not causing acute symptoms.",
      source: "workeneh-2021",
      quote: "Hypomagnesemia without acute symptomatology can be treated with oral Mg replacement and by eliminating medications that may be contributing to the hypomagnesemia.",
    },
    {
      action: "Consider extra magnesium when low magnesium develops on an EGFR antibody",
      why: "The Japanese guideline weakly recommends it because it may stop the fall getting worse and no apparent harm has been reported. It rates the evidence very weak, and the recommendation names no dose or route.",
      source: "jsn-2022",
      quote: "Additional magnesium supplementation is weakly recommended when a patient receiving anti-EGFR antibody develops hypomagnesemia, as additional magnesium supplementation may help avoid aggravation of hypomagnesemia.",
      grade: "Weakly recommended (proposed); certainty of evidence D (very weak)",
    },
    {
      action: "For grade 1 or 2, consider oral magnesium; consider adding regular intravenous magnesium at grade 2 or 3",
      why: "This is opinion-based guidance reported in a review. Oral magnesium may cause diarrhoea and frequent infusions are inconvenient; sources disagree on whether a grade 1 fall needs treating at all (see variants).",
      source: "emj-2021",
      quote: "Recent opinion-based guidelines suggest consideration of oral MG for Grade 1/2 and adding regular IV MG infusions at Grade 2/3 hMG",
    },
    {
      action: "Give magnesium by injection or infusion for a severe fall (grade 3 or 4) or any fall with symptoms",
      why: "The review lists seizures, tetany and lethal heart rhythms among the features of grade 4, and says the case for replacement is strong when there are symptoms.",
      source: "workeneh-2021",
      quote: "In severe or symptomatic hypomagnesemia, parenteral administration is required.",
    },
    {
      action: "Infuse magnesium no faster than 1 g an hour unless there is a seizure or a lethal arrhythmia, and monitor replacement in advanced chronic kidney disease",
      why: "Magnesium is cleared by the kidneys, so in advanced kidney disease replacement is monitored to avoid heart block. The one-centre commentary describes a faster rate, 8 g of magnesium sulfate over 4 hours (Fakih 2008); the two sources differ.",
      source: "workeneh-2021",
      quote: "In the absence of seizures or lethal arrhythmia, the parenteral replacement rate should not exceed 1 g/h",
    },
    {
      action: "Record an ECG and arrange same-day assessment when magnesium is severely low or there are palpitations, fainting, muscle spasm or seizures",
      why: "Lethal heart rhythms, seizures and tetany are among the features listed for grade 4 low magnesium.",
      practice: "No source read says when to record an ECG once severe hypomagnesaemia is found, or sets a time limit for assessment. The cetuximab label links electrolyte monitoring to its warning on cardiopulmonary arrest, the Kidney360 review lists lethal arrhythmia, seizures and tetany among grade 4 features, the EMJ review advises considering a baseline QTc, and Cancer Research UK asks patients to report palpitations or feeling faint; an ECG and prompt review at this point is standard acute practice rather than a cited recommendation.",
    },
    {
      action: "After intravenous replacement for a grade 3 or 4 fall, recheck magnesium every other day at first to decide how often infusions are needed",
      why: "After a weekly infusion the level tends to fall back to its low baseline within 3 to 4 days. The nephrology review describes the same checks as three times a week.",
      source: "fakih-2008",
      quote: "An initial strategy of IV replacement and every-other-day serum magnesium monitoring is helpful to guide the frequency of replacement until a steady state is reached.",
    },
    {
      action: "Check potassium and calcium when magnesium is low, and correct the magnesium as well as the potassium",
      why: "Low magnesium makes the kidney lose potassium, so replacing potassium alone will not correct it. Severe low magnesium can also lower calcium by suppressing the parathyroid glands.",
      source: "workeneh-2021",
      quote: "Correction of K alone will not resolve hypokalemia in these cases, the correction of hypomagnesemia is also required.",
    },
    {
      action: "For grade 4, discuss stopping the antibody until magnesium improves to grade 2 or less; for a refractory fall, amiloride can be considered where it can be used safely",
      why: "Low magnesium is reversible after cetuximab is stopped and typically resolves within weeks to a few months. The pause is a suggestion from opinion-based guidance reported in a review; no label requires it, and the one-centre commentary keeps a planned break for people without a large tumour burden.",
      source: "emj-2021",
      quote: "With the development of Grade 4 hMG, discontinuation of EGFRIs is suggested until MG improves to Grade 2 or less.",
    },
    {
      action: "Keep checking magnesium and calcium, with potassium, after the last dose: for at least 8 weeks on cetuximab (US label) and for up to 8 weeks on panitumumab",
      why: "The effect on magnesium typically resolves within weeks to a few months of stopping the antibody, so a low level can still be found after treatment ends.",
      source: "smpc-panitumumab",
      quote: "Patients should be periodically monitored for hypomagnesaemia and accompanying hypocalcaemia prior to initiating Vectibix treatment, and periodically thereafter for up to 8 weeks after the completion of treatment",
    },
  ],
  bestInClass: {
    statement: "The labels are the firmest source and cover monitoring only: magnesium and calcium, with potassium, before treatment, during it (weekly under the US cetuximab label, 'periodically' in the others) and afterwards (for at least 8 weeks under the US cetuximab label, for up to 8 weeks under the panitumumab texts), with replacement 'as necessary' or 'as appropriate'. No label gives a threshold, a dose of magnesium or a dose rule for the antibody. One guideline grades replacement: the Japanese 2022 guideline on kidney injury during anticancer drug therapy weakly recommends additional magnesium once hypomagnesaemia develops, with certainty of evidence D (very weak) and unanimous agreement of 28 voters; its recommendation gives no dose, route or threshold. The systematic review done for it (Kato 2024) calls the evidence weak. No ESMO, ASCO, MASCC or NCCN guideline was found. On how to replace, the published advice disagrees and none of it is graded. A US centre's practice (Fakih 2008, author with honoraria from the maker of cetuximab) holds that no evidence supports replacement at grade 1, that oral magnesium was ineffective and poorly tolerated, and that grade 2 at 0.9 to 1.0 mg/dL is treated with weekly intravenous magnesium sulfate 4 g and grade 3 or 4 with about 6 to 10 g daily to twice weekly; a nephrology review (Workeneh 2021) repeats this with 6 to 10 g daily for grade 3 or 4. A Canadian review (Siddiqui 2021) holds that early or preventive oral magnesium appears well tolerated and may avoid or delay infusions, with intravenous magnesium mainly for immediate correction or for those at risk of complications of moderate or severe hypomagnesaemia. Both approaches are shown; which is better has not been tested head to head in a trial read here.",
    sources: ["label-cetuximab", "label-panitumumab", "smpc-cetuximab", "smpc-panitumumab", "jsn-2022", "kato-2024", "fakih-2008", "workeneh-2021", "emj-2021"],
  },
  variants: [
    {
      name: "Intravenous magnesium from grade 2 (one US centre's practice)",
      differs: "No replacement for grade 1. For grade 2, weekly intravenous magnesium sulfate 4 g at a magnesium of 0.9 to 1.0 mg/dL, or weekly monitoring alone in people without symptoms, cardiac history or cardiac risk after discussion. For grade 3 or 4, about 6 to 10 g of magnesium sulfate daily to twice weekly, guided by levels every other day. Oral magnesium was tried and found ineffective and poorly tolerated because of diarrhoea. The commentary describes 8 g given over 4 hours.",
      evidence: "A commentary describing practice at one cancer centre (Fakih 2008; the author declared honoraria from ImClone, then the maker of cetuximab), repeated in the Kidney360 review (Workeneh 2021), which gives 6 to 10 g daily for grade 3 or 4, monitoring three times a week, and a general limit of 1 g an hour for parenteral magnesium. In that centre's series of 114 patients on cetuximab, grade 3 or 4 hypomagnesaemia occurred in 5%, 23% and 47% of those treated for under 3 months, 3 to 6 months and over 6 months.",
      sources: ["fakih-2008", "workeneh-2021"],
    },
    {
      name: "Oral magnesium early or from the start",
      differs: "Oral magnesium started when the antibody is started, or at the first fall, with the dose increased as needed and a diet high in magnesium; intravenous magnesium only for urgent correction or more severe falls.",
      evidence: "The EMJ review (Siddiqui 2021) reports a randomised trial (MAGNET) of 89 patients given oral magnesium when grade 1 developed and 84 given it from the start: hypomagnesaemia developed in 13% and 4%, with no difference in bowel movements. That trial was not read directly. The review names no single product because availability differs between countries. Kato 2024 found weak evidence that supplementation may prevent worsening and no study of whether it prevents arrhythmia; the Japanese guideline it was done for weakly recommends additional magnesium without choosing a route.",
      sources: ["emj-2021", "kato-2024", "jsn-2022"],
    },
    {
      name: "Monitoring frequency: weekly or 'periodically'",
      differs: "The US cetuximab label asks for weekly checks during treatment and for at least 8 weeks after. The US and EU panitumumab texts ask for checks before, periodically during and for up to 8 weeks after. The EU cetuximab text asks for checks before and periodically during treatment and gives no period afterwards.",
      evidence: "Regulatory texts. The Fakih commentary notes that trials which did not require magnesium monitoring reported lower rates, so the true frequency depends on how often it is looked for; a Canadian survey quoted in the EMJ review found that over 90% of oncologists check magnesium before each infusion.",
      sources: ["label-cetuximab", "label-panitumumab", "smpc-cetuximab", "smpc-panitumumab", "fakih-2008", "emj-2021"],
    },
    {
      name: "Planned break from the antibody (stop and go)",
      differs: "For people needing frequent infusions who do not have a large tumour burden, the antibody is stopped and restarted once magnesium has recovered (4 to 8 weeks after the break began), instead of continuous treatment with repeated infusions.",
      evidence: "One centre's experience in several patients with grade 4 hypomagnesaemia (Fakih 2008): magnesium usually corrected within 6 weeks of stopping cetuximab and grade 3 or 4 hypomagnesaemia did not usually return for another 6 to 8 weeks after restarting. No trial is cited, and the commentary reports no measure of the effect on cancer control.",
      sources: ["fakih-2008", "workeneh-2021"],
    },
    {
      name: "Amiloride for refractory magnesium loss",
      differs: "The potassium-sparing diuretic amiloride is considered, where it can be used safely, to reduce magnesium loss in the urine.",
      evidence: "Suggested in the Kidney360 review from use in other causes of renal magnesium wasting; no study in people on EGFR antibodies was cited.",
      sources: ["workeneh-2021"],
    },
  ],
  grades: [
    { claim: "Weekly monitoring during cetuximab and for at least 8 weeks after", grade: "Regulatory label; not graded", source: "label-cetuximab", quote: "Hypomagnesemia and accompanying electrolyte abnormalities can occur days to months after initiating ERBITUX." },
    { claim: "Replace magnesium and other electrolytes as appropriate (panitumumab)", grade: "Regulatory label; not graded", source: "label-panitumumab", quote: "Other electrolyte disturbances, including hypokalemia, have also been observed. Replete magnesium and other electrolytes as appropriate." },
    { claim: "Electrolytes before and periodically during cetuximab (EU)", grade: "Regulatory product information; not graded", source: "smpc-cetuximab", quote: "Determination of serum electrolyte levels is recommended prior to and periodically during cetuximab treatment. Electrolyte repletion is recommended, as appropriate." },
    { claim: "Additional magnesium when a patient on an EGFR antibody develops hypomagnesaemia", grade: "Weakly recommended (proposed) (agreement rate: 100%, votes: 28 voters, agreement: 28 voters); certainty of evidence: D (very weak)", source: "jsn-2022", quote: "Additional magnesium supplementation is weakly recommended when a patient receiving anti-EGFR antibody develops hypomagnesemia, as additional magnesium supplementation may help avoid aggravation of hypomagnesemia." },
    { claim: "Magnesium supplementation once hypomagnesaemia develops may prevent worsening", grade: "Weak evidence (GRADE approach, systematic review for a Japanese guideline committee)", source: "kato-2024", quote: "Weak evidence suggests that Mg supplementation during the development of hypomagnesemia after starting anti-EGFR antibody therapy may prevent the worsening of hypomagnesemia." },
    { claim: "No evidence-based guideline exists for magnesium supplementation with anti-EGFR antibodies", grade: "Statement of a systematic review; not graded", source: "kato-2024", quote: "However, there are no evidence-based guidelines for magnesium (Mg) supplementation in the management of hypomagnesemia in patients with anti-EGFR antibodies." },
    { claim: "Grade 1 needs no replacement", grade: "Single-centre commentary; not graded", source: "fakih-2008", quote: "No evidence suggests that a replacement strategy is necessary for grade 1 hypomagnesemia, as these patients are typically asymptomatic." },
    { claim: "Grade 3 or 4 should be replaced", grade: "Single-centre commentary; not graded", source: "fakih-2008", quote: "Patients with grade 3/4 hypomagnesemia should receive appropriate replacement." },
    { claim: "Intravenous magnesium mainly for urgent correction", grade: "Narrative review; not graded", source: "emj-2021", quote: "IV MG supplementation should mainly be administered in patients requiring immediate correction such as for ventricular arrhythmias, or those at risk of other complications related to moderate or severe hMG" },
    { claim: "Check magnesium at the start and throughout cancer treatment", grade: "Narrative review; not graded", source: "workeneh-2021", quote: "We recommended checking serum magnesium at the beginning of treatment and as part of routine monitoring throughout cancer treatment." },
    { claim: "Severe hypomagnesaemia can cause low calcium", grade: "Narrative review; not graded", source: "workeneh-2021", quote: "Paradoxically, severe hypomagnesemia can also cause hypoparathyroidism and secondary hypocalcemia" },
    { claim: "Amiloride may be considered for refractory hypomagnesaemia", grade: "Narrative review; not graded", source: "workeneh-2021", quote: "Amiloride can be considered in patients with cancer who have refractory hypomagnesemia and in whom it can be used safely." },
    { claim: "All-grade hypomagnesaemia in 34.0% on EGFR antibodies against 9.7% of controls", grade: "Pooled analysis of 25 randomised trials; not graded", source: "wang-2015" },
    { claim: "Grade thresholds for low magnesium (grade 1 down to 0.5 mmol/L, grade 2 to 0.4, grade 3 to 0.3, grade 4 below 0.3 mmol/L)", grade: "A severity scale, not an evidence grade", source: "ctcae-v5" },
    { claim: "Patients on panitumumab are asked to report cramp, tingling or numbness, palpitations or feeling faint", grade: "Patient information; not graded", source: "cruk-panitumumab", quote: "Let your doctor or nurse know if you have cramping in your arm or leg muscles, tingling or numbness, palpitations (feeling your heart beat irregularly), or if you feel faint." },
    { claim: "Patients on cetuximab are told low magnesium can cause weakness and tremors and is checked by regular blood tests", grade: "Patient information; not graded", source: "cruk-cetuximab", quote: "You might have low levels of magnesium in your body. This can cause muscular weakness and tremors." },
  ],
  sources: [
    {
      key: "label-cetuximab",
      label: "Erbitux (cetuximab) injection: US prescribing information, boxed warning and sections 5.2 and 5.6",
      publisher: "ImClone (Eli Lilly), via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8bc6397e-4bd8-4d37-a007-a327e4da34d9",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-panitumumab",
      label: "Vectibix (panitumumab) injection: US prescribing information, section 5.3",
      publisher: "Amgen, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e0fa4bca-f245-4d92-ae29-b0c630a315c2",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "smpc-cetuximab",
      label: "Erbitux: EU summary of product characteristics, section 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency (marketing authorisation holder Merck Europe)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/erbitux-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "smpc-panitumumab",
      label: "Vectibix: EU summary of product characteristics, section 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency (marketing authorisation holder Amgen Europe)",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/vectibix-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "workeneh-2021",
      label: "Hypomagnesemia in the Cancer Patient",
      publisher: "Kidney360, American Society of Nephrology (Workeneh et al.)",
      year: 2021,
      url: "https://doi.org/10.34067/KID.0005622020",
      doi: "10.34067/KID.0005622020",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "kato-2024",
      label: "Efficacy of Magnesium Supplementation in Cancer Patients Developing Hypomagnesemia Due to Anti-EGFR Antibody: A Systematic Review",
      publisher: "Cancer Diagnosis and Prognosis (Kato et al., for a guideline committee of the Japanese Society of Nephrology and Japanese oncology societies)",
      year: 2024,
      url: "https://doi.org/10.21873/cdp.10337",
      doi: "10.21873/cdp.10337",
      gradingScheme: "GRADE approach; body of evidence rated A (strong), B (moderate), C (weak) or D (very weak).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "jsn-2022",
      label: "Clinical questions and good practice statements of clinical practice guidelines for management of kidney injury during anticancer drug therapy 2022 (clinical question 8)",
      publisher: "Japanese Society of Nephrology, Japan Society of Clinical Oncology, Japanese Society of Medical Oncology and Japanese Society of Nephrology and Pharmacotherapy; Clinical and Experimental Nephrology (Yanagita et al.)",
      year: 2024,
      url: "https://doi.org/10.1007/s10157-023-02415-0",
      doi: "10.1007/s10157-023-02415-0",
      gradingScheme: "Recommendation grade by committee vote (strongly or weakly recommended, with the agreement rate); certainty of evidence A (strong), B (moderate), C (weak) or D (very weak).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "emj-2021",
      label: "Epidermal Growth Factor Receptor Inhibitor-Induced Hypomagnesaemia: Is There a Best Replacement Strategy?",
      publisher: "European Medical Journal (Siddiqui, Ahmed and Vickers, The Ottawa Hospital)",
      year: 2021,
      url: "https://doi.org/10.33590/emj/21-00083",
      doi: "10.33590/emj/21-00083",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fakih-2008",
      label: "Management of Anti-EGFR-Targeting Monoclonal Antibody-Induced Hypomagnesemia (author declared honoraria from ImClone, then the maker of cetuximab)",
      publisher: "Oncology (Williston Park), on cancernetwork.com (Fakih)",
      year: 2008,
      url: "https://www.cancernetwork.com/view/management-anti-egfrtargeting-monoclonal-antibodyinduced-hypomagnesemia",
      gradingScheme: "Commentary describing one centre's practice; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "wang-2015",
      label: "Electrolyte disorders assessment in solid tumor patients treated with anti-EGFR monoclonal antibodies: a pooled analysis of 25 randomized clinical trials",
      publisher: "Tumor Biology (Wang et al.)",
      year: 2015,
      url: "https://doi.org/10.1007/s13277-014-2983-9",
      doi: "10.1007/s13277-014-2983-9",
      gradingScheme: "Meta-analysis; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ctcae-v5",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 5.0",
      publisher: "US National Cancer Institute, Cancer Therapy Evaluation Program",
      year: 2017,
      url: "https://dctd.cancer.gov/research/ctep-trials/trial-development",
      gradingScheme: "Not an evidence grade: a severity scale for each adverse event term, from grade 1 to grade 5 (death).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-panitumumab",
      label: "Panitumumab (Vectibix): patient information, last reviewed 7 July 2026",
      publisher: "Cancer Research UK",
      year: 2026,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/panitumumab",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-cetuximab",
      label: "Cetuximab (Erbitux): patient information, last reviewed 17 October 2025",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/cetuximab",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["cetuximab", "panitumumab"],
  targets: ["egfr"],
  terms: ["qt-prolongation"],
  related: ["magnesium-supplements"],
  gaps: [
    "One guideline grades this problem: the Japanese 2022 guideline on kidney injury during anticancer drug therapy, which weakly recommends additional magnesium on very weak evidence and gives no dose, route or threshold. It was found on 17 November 2026; the first version of this page said no guideline existed. No ESMO, ASCO, MASCC or NCCN guideline was found. A web search found no public UK cancer-network or specialist-pharmacy guideline; local hospital electrolyte policies exist but were not read.",
    "The certainty of the evidence is described differently by the guideline (D, very weak) and by the systematic review done for it (Kato 2024, 'weak evidence'); both are shown as printed.",
    "The grades here are CTCAE version 5.0, read from the National Cancer Institute's spreadsheet; version 6.0 (2025) prints the same thresholds for low magnesium. The source papers grade by earlier versions and print slightly different bands in mg/dL: the Kidney360 review tabulates version 4.0 as 1.2 to 1.7, 0.9 to 1.2, 0.7 to 0.9 and below 0.7 mg/dL, and the 2008 commentary gives grade 3 as 0.7 to 0.8 and grade 4 as 0.6 mg/dL or below.",
    "Oral or intravenous magnesium first is unsettled: the two published approaches contradict each other on whether oral magnesium is tolerated and works. The randomised MAGNET trial of early oral magnesium is reported here only from a review's account; it was not found or read directly.",
    "The two sources that give an infusion rate differ: the Kidney360 review says no faster than 1 g an hour unless there are seizures or a lethal arrhythmia, and the 2008 commentary describes 8 g over 4 hours. The two also differ on the grade 3 or 4 dose (6 to 10 g daily, against about 6 to 10 g daily to twice weekly). Neither is a product label, and no magnesium sulfate label was read.",
    "No label gives a rule for holding or reducing cetuximab or panitumumab for low magnesium. Pausing at grade 4 comes from opinion-based guidance quoted in a review, and the stop-and-go approach from one centre's experience.",
    "No source read says when to record an ECG once severe hypomagnesaemia is found, what QT interval should change treatment, or how quickly symptoms should be assessed. Cancer Research UK's panitumumab page lists the symptoms to report (cramp, tingling or numbness, palpitations, feeling faint) without a time limit; its cetuximab page names weakness and tremors.",
    "Whether correcting low magnesium prevents arrhythmia or death has not been studied (Kato 2024).",
    "The practice commentary is from 2008 and its author declared honoraria from the maker of cetuximab; the doses in it are one centre's and are not from a trial.",
    "Necitumumab and amivantamab are not covered: DailyMed lists no label for necitumumab, and the amivantamab label lists decreased magnesium as a laboratory finding without a monitoring instruction.",
    "The two EU product information documents state no revision date in the text. The years given are those of the files' creation dates as served on 17 November 2026: June 2026 for Erbitux and April 2025 for Vectibix.",
  ],
});
