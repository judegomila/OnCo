import { protocol } from "./helpers";

/*
 * Monitoring and replacing magnesium (with potassium and calcium) in adults having the EGFR antibodies cetuximab or
 * panitumumab.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - US prescribing information from DailyMed (SPL XML, full text): Erbitux (cetuximab, setid 8bc6397e, label version
 *   published 30 April 2026) and Vectibix (panitumumab, e0fa4bca, 26 June 2026). Neither has a dose-modification
 *   rule for low magnesium.
 * - EU product information (EMA, PDF read with pdftotext): Erbitux and Vectibix summaries of product
 *   characteristics, section 4.4, as served by ema.europa.eu on the day of reading.
 * - Workeneh et al., "Hypomagnesemia in the Cancer Patient", Kidney360 2021: full text. Europe PMC returned an error
 *   for the full-text XML, so the article page on PubMed Central (PMC8785729) was fetched with curl and stripped to
 *   text. Funding: a US National Institutes of Health grant to one author; no manufacturer funding declared.
 * - Kato et al., Cancer Diagnosis and Prognosis 2024, systematic review of magnesium supplementation for anti-EGFR
 *   antibody hypomagnesaemia, done for a Japanese guideline committee: full text, PubMed Central page (PMC11215447).
 * - Siddiqui, Ahmed and Vickers, EMJ 2021, review of replacement strategies: full text, the journal's PDF. The
 *   authors declare no conflicts of interest.
 * - Fakih, Oncology (Williston Park) 2008, a commentary describing one US centre's practice: full text, the
 *   cancernetwork.com page. Its disclosure reads: "Dr. Fakih has received honoraria from ImClone for educational
 *   activities." ImClone made cetuximab.
 * - Wang et al., Tumor Biology 2015, pooled analysis of 25 randomised trials of electrolyte disorders: full text,
 *   Europe PMC XML (PMC4445483).
 *
 * Not found or not read: no ESMO, ASCO, MASCC or NCCN guideline on this problem was found, and Kato 2024 states that
 * there are no evidence-based guidelines. A web search found no public UK cancer-network or specialist-pharmacy
 * guideline. The MAGNET trial of early oral magnesium is known here only from the EMJ review's account of it. The
 * CTCAE grading table could not be fetched from ctep.cancer.gov (the address returned a web page, not the PDF), so
 * grades are given in mg/dL as the Kidney360 review tabulates CTCAE version 4.0. No DailyMed label was found for
 * necitumumab. The amivantamab label lists decreased magnesium among laboratory findings but gives no monitoring
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
  tldr: "Cetuximab and panitumumab make the kidneys lose magnesium, and the level tends to fall the longer treatment goes on. Blood magnesium, calcium and potassium are checked before, during and for 8 weeks after treatment. Mild falls are watched or treated with tablets; bigger falls need magnesium through a drip. Cramps, tingling, twitching or palpitations need reporting. Your team's plan comes first.",
  simple: "These two cancer medicines can make your body lose magnesium, a salt your muscles and heart need. Your team checks it with blood tests before, during and after treatment. If it is low you may get magnesium tablets or a drip. Tell your team about cramps, tingling, twitching, great tiredness or a fluttering heartbeat.",
  summary: "EGFR antibodies block the signal that keeps the magnesium channel TRPM6 open in the distal convoluted tubule, so magnesium is lost in the urine; the fall worsens with duration of treatment and reverses after the antibody stops. The US labels report decreased magnesium in 55% of patients on cetuximab (grade 3 or 4 in 6% to 17%) and 38% on panitumumab alone, 51% with FOLFOX and 69% with sotorasib. A pooled analysis of 25 randomised trials found all-grade hypomagnesaemia in 34.0% against 9.7% of controls, and more grade 3 or 4 hypokalaemia (6.7% against 3.7%). The cetuximab label carries a boxed warning for cardiopulmonary arrest in head and neck cancer and asks for magnesium, potassium and calcium monitoring during and after treatment.\n\nMonitoring is the only part the regulators specify, and they differ: the US cetuximab label says weekly during treatment and for at least 8 weeks after; the US and EU panitumumab texts say before, periodically during and for up to 8 weeks after; the EU cetuximab text says before and periodically during. No label sets a dose rule for low magnesium.\n\nReplacement is not settled. No ESMO, ASCO, MASCC or NCCN guideline was found, and a 2024 systematic review for a Japanese guideline committee found only weak evidence that supplementation prevents worsening. Published practice differs: one US centre (Fakih 2008) and a nephrology review (Workeneh 2021) found oral magnesium poorly tolerated and used weekly intravenous magnesium sulfate 4 g from grade 2 and 6 to 10 g daily to twice weekly for grade 3 or 4; a Canadian review (2021) supports early or preventive oral magnesium and keeps intravenous magnesium for urgent correction, citing a randomised trial not read here. Low potassium will not correct until magnesium does, and severe hypomagnesaemia can cause low calcium. Options for refractory cases are a planned break from the antibody or amiloride, both from small reports.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "ward", "acute-oncology-service"],
  },
  population: "Adults having cetuximab or panitumumab for bowel cancer or head and neck cancer, alone or with chemotherapy or radiotherapy. Low magnesium from platinum chemotherapy, proton pump inhibitors, diarrhoea or poor intake often coexists and is managed in the same way but is not the subject here. Other EGFR antibodies (necitumumab, amivantamab) and EGFR tablets are not covered because no source read gives monitoring advice for them. Children are not covered.",
  trigger: "Cetuximab or panitumumab is about to be started, or a blood test during or after treatment shows low magnesium, calcium or potassium.",
  steps: [
    {
      action: "Measure magnesium, calcium and potassium before the first dose",
      why: "A starting value shows whether the level is already low and gives a baseline to judge later falls against.",
      source: "label-panitumumab",
      quote: "Monitor patients for hypomagnesemia and hypocalcemia prior to initiating Vectibix treatment, periodically during Vectibix treatment, and for up to 8 weeks after the completion of treatment.",
    },
    {
      action: "Repeat magnesium, calcium and potassium regularly during treatment: weekly on cetuximab under the US label, and periodically otherwise (in a Canadian survey most oncologists checked before each infusion)",
      why: "The fall is gradual, usually silent at first, and can start days or months into treatment.",
      source: "label-cetuximab",
      quote: "Monitor patients weekly during treatment for hypomagnesemia, hypocalcemia, and hypokalemia, and for at least 8 weeks following the completion of ERBITUX.",
    },
    {
      action: "Expect the risk to rise with longer treatment, older age and platinum chemotherapy given alongside",
      why: "Severe falls are uncommon in the first three months and become more common after six, so a normal early result does not mean the checks can stop.",
      source: "emj-2021",
      quote: "Routine monitoring of MG levels is required, and recognition of risk factors such as advancing age, longer duration of EGFRI therapy, and concomitant platinum chemotherapy is important",
    },
    {
      action: "Consider an ECG before treatment to measure the QT interval, especially with heart disease or other QT-prolonging medicines",
      why: "Low magnesium can upset the heart rhythm, and a baseline tracing shows who is at more risk.",
      source: "emj-2021",
      quote: "Physicians should also consider electrocardiograms for baseline QTc assessments, as hMG could exacerbate the risk of cardiac arrhythmias.",
    },
    {
      action: "In head and neck cancer treated with cetuximab and radiotherapy or platinum chemotherapy, and in anyone with coronary disease, heart failure or arrhythmia, keep to the electrolyte checks strictly",
      why: "Cardiac arrest and sudden death occurred in these trials, and low magnesium, potassium or calcium may contribute.",
      source: "label-cetuximab",
      quote: "Monitor serum electrolytes, including serum magnesium, potassium, and calcium, during and after ERBITUX administration.",
    },
    {
      action: "Ask at each visit about tiredness, cramps, tingling, twitching, drowsiness and palpitations",
      why: "People often put these symptoms down to chemotherapy, and they improve when magnesium is corrected.",
      source: "fakih-2008",
      quote: "These patients are often symptomatic with fatigue, cramps, or somnolence.",
    },
    {
      action: "When magnesium is low, review other causes and stop or change contributing medicines where possible, such as proton pump inhibitors and diuretics",
      why: "Several common medicines lower magnesium further, and removing them can be enough for a mild fall.",
      source: "workeneh-2021",
      quote: "Hypomagnesemia without acute symptomatology can be treated with oral Mg replacement and by eliminating medications that may be contributing to the hypomagnesemia.",
    },
    {
      action: "For a mild or moderate fall without symptoms (grade 1 or 2), keep monitoring and consider oral magnesium, adding regular intravenous magnesium if it keeps falling",
      why: "Tablets are easy but can cause diarrhoea and may not keep up with the loss; sources disagree on whether a mild fall needs treating at all (see variants).",
      source: "emj-2021",
      quote: "Recent opinion-based guidelines suggest consideration of oral MG for Grade 1/2 and adding regular IV MG infusions at Grade 2/3 hMG",
    },
    {
      action: "Give magnesium through a vein for a severe fall (grade 3 or 4) or any fall with symptoms",
      why: "At these levels there is a risk of seizures and dangerous heart rhythms, and tablets work too slowly.",
      source: "workeneh-2021",
      quote: "In severe or symptomatic hypomagnesemia, parenteral administration is required.",
    },
    {
      action: "Infuse magnesium no faster than 1 g an hour unless there is a seizure or a life-threatening rhythm, and take extra care in kidney impairment",
      why: "A fast infusion is largely passed straight out in the urine, and in kidney failure magnesium can build up and slow the heart.",
      source: "workeneh-2021",
      quote: "In the absence of seizures or lethal arrhythmia, the parenteral replacement rate should not exceed 1 g/h",
    },
    {
      action: "Record an ECG and arrange same-day assessment when magnesium is severely low or there are palpitations, fainting, muscle spasm or seizures",
      why: "Severe low magnesium, especially with low potassium or calcium, can prolong the QT interval and trigger dangerous rhythms.",
      practice: "No source read says when to record an ECG once severe hypomagnesaemia is found. The cetuximab label links electrolyte monitoring to its warning on cardiopulmonary arrest, the Kidney360 review lists lethal arrhythmia, seizures and tetany among grade 4 features, and the EMJ review advises a baseline QTc; an ECG at this point is standard acute practice rather than a cited recommendation.",
    },
    {
      action: "After intravenous replacement for a severe fall, recheck magnesium every other day at first to decide how often infusions are needed",
      why: "The level usually drops back within three to four days because the kidney keeps losing magnesium while the antibody is in the body.",
      source: "fakih-2008",
      quote: "An initial strategy of IV replacement and every-other-day serum magnesium monitoring is helpful to guide the frequency of replacement until a steady state is reached.",
    },
    {
      action: "Check potassium and calcium whenever magnesium is low, and correct the magnesium first or together with them",
      why: "Low magnesium makes the kidney lose potassium and can switch off the gland that controls calcium, so potassium or calcium alone will not hold.",
      source: "workeneh-2021",
      quote: "Correction of K alone will not resolve hypokalemia in these cases, the correction of hypomagnesemia is also required.",
    },
    {
      action: "For grade 4 or a fall that cannot be controlled, discuss pausing the antibody until magnesium recovers, and ask a kidney specialist about amiloride",
      why: "Magnesium recovers within weeks of stopping the antibody; whether to pause is weighed against control of the cancer.",
      source: "emj-2021",
      quote: "With the development of Grade 4 hMG, discontinuation of EGFRIs is suggested until MG improves to Grade 2 or less.",
    },
    {
      action: "Keep checking magnesium, calcium and potassium for 8 weeks after the last dose",
      why: "The kidney goes on losing magnesium for weeks after the antibody is stopped.",
      source: "smpc-panitumumab",
      quote: "Patients should be periodically monitored for hypomagnesaemia and accompanying hypocalcaemia prior to initiating Vectibix treatment, and periodically thereafter for up to 8 weeks after the completion of treatment",
    },
  ],
  bestInClass: {
    statement: "The labels are the firmest source and cover monitoring only: magnesium, calcium and potassium before treatment, during it (weekly under the US cetuximab label, 'periodically' in the others) and for 8 weeks afterwards, with replacement 'as necessary'. No label gives a threshold, a dose of magnesium or a dose rule for the antibody, and no ESMO, ASCO, MASCC or NCCN guideline was found. On replacement the published advice disagrees and none of it is graded. A US centre's practice (Fakih 2008, author with honoraria from the maker of cetuximab) and a nephrology review (Workeneh 2021) hold that grade 1 needs no replacement, that oral magnesium is poorly tolerated and ineffective in this group, and that grade 2 is treated with weekly intravenous magnesium sulfate 4 g and grade 3 or 4 with 6 to 10 g daily to twice weekly. A Canadian review (Siddiqui 2021) holds that early or preventive oral magnesium is well tolerated and may avoid or delay infusions, with intravenous magnesium kept for urgent correction. A systematic review for a Japanese guideline committee (Kato 2024) rated the evidence for supplementation as weak. Both approaches are shown; which is better has not been tested head to head in a trial read here.",
    sources: ["label-cetuximab", "label-panitumumab", "smpc-cetuximab", "smpc-panitumumab", "fakih-2008", "workeneh-2021", "emj-2021", "kato-2024"],
  },
  variants: [
    {
      name: "Intravenous magnesium from grade 2 (one US centre's practice)",
      differs: "No replacement for grade 1. Weekly intravenous magnesium sulfate 4 g for a magnesium of 0.9 to 1.0 mg/dL, or weekly monitoring alone in people without symptoms or cardiac risk after discussion. For grade 3 or 4, about 6 to 10 g of magnesium sulfate daily to twice weekly, guided by levels every other day. Oral magnesium was tried and abandoned as ineffective and poorly tolerated because of diarrhoea.",
      evidence: "A commentary describing practice at one cancer centre (Fakih 2008; the author declared honoraria from ImClone, then the maker of cetuximab), repeated in the Kidney360 review (Workeneh 2021). In that centre's series of 114 patients, grade 3 or 4 hypomagnesaemia occurred in 5%, 23% and 47% of those treated for under 3 months, 3 to 6 months and over 6 months.",
      sources: ["fakih-2008", "workeneh-2021"],
    },
    {
      name: "Oral magnesium early or from the start",
      differs: "Oral magnesium started when the antibody is started, or at the first fall, with the dose increased as needed and a diet high in magnesium; intravenous magnesium only for urgent correction or more severe falls.",
      evidence: "The EMJ review (Siddiqui 2021) reports a randomised trial (MAGNET) of 89 patients given oral magnesium when grade 1 developed and 84 given it from the start: hypomagnesaemia developed in 13% and 4%, with no difference in bowel movements. That trial was not read directly. The review names no single product because availability differs between countries. Kato 2024 found weak evidence that supplementation prevents worsening and none on whether it prevents arrhythmia.",
      sources: ["emj-2021", "kato-2024"],
    },
    {
      name: "Monitoring frequency: weekly or 'periodically'",
      differs: "The US cetuximab label asks for weekly checks during treatment and for at least 8 weeks after. The US and EU panitumumab texts ask for checks before, periodically during and for up to 8 weeks after. The EU cetuximab text asks for checks before and periodically during treatment and gives no period afterwards.",
      evidence: "Regulatory texts. The Fakih commentary notes that trials which did not require magnesium monitoring reported far lower rates, so the true frequency depends on how often it is looked for; a Canadian survey quoted in the EMJ review found that over 90% of oncologists check magnesium before each infusion.",
      sources: ["label-cetuximab", "label-panitumumab", "smpc-cetuximab", "smpc-panitumumab", "fakih-2008", "emj-2021"],
    },
    {
      name: "Planned break from the antibody (stop and go)",
      differs: "For people needing frequent infusions who do not have a large tumour burden, the antibody is stopped for about two months and restarted once magnesium has recovered, instead of continuous treatment with repeated infusions.",
      evidence: "One centre's experience in several patients with grade 4 hypomagnesaemia (Fakih 2008): magnesium usually corrected within 6 weeks of stopping cetuximab and severe hypomagnesaemia did not usually return for another 6 to 8 weeks. No trial. The effect on cancer control was not measured.",
      sources: ["fakih-2008", "workeneh-2021"],
    },
    {
      name: "Amiloride for refractory magnesium loss",
      differs: "The potassium-sparing diuretic amiloride is added to reduce magnesium loss in the urine.",
      evidence: "Suggested in the Kidney360 review from use in other causes of renal magnesium wasting; no study in people on EGFR antibodies was cited.",
      sources: ["workeneh-2021"],
    },
  ],
  grades: [
    { claim: "Weekly monitoring during cetuximab and for at least 8 weeks after", grade: "Regulatory label; not graded", source: "label-cetuximab", quote: "Hypomagnesemia and accompanying electrolyte abnormalities can occur days to months after initiating ERBITUX." },
    { claim: "Replace magnesium and other electrolytes as appropriate (panitumumab)", grade: "Regulatory label; not graded", source: "label-panitumumab", quote: "Other electrolyte disturbances, including hypokalemia, have also been observed. Replete magnesium and other electrolytes as appropriate." },
    { claim: "Electrolytes before and periodically during cetuximab (EU)", grade: "Regulatory product information; not graded", source: "smpc-cetuximab", quote: "Determination of serum electrolyte levels is recommended prior to and periodically during cetuximab treatment. Electrolyte repletion is recommended, as appropriate." },
    { claim: "Magnesium supplementation once hypomagnesaemia develops may prevent worsening", grade: "Weak evidence (GRADE approach, systematic review for a Japanese guideline committee)", source: "kato-2024", quote: "Weak evidence suggests that Mg supplementation during the development of hypomagnesemia after starting anti-EGFR antibody therapy may prevent the worsening of hypomagnesemia." },
    { claim: "No evidence-based guideline exists for magnesium supplementation with anti-EGFR antibodies", grade: "Statement of a systematic review; not graded", source: "kato-2024", quote: "However, there are no evidence-based guidelines for magnesium (Mg) supplementation in the management of hypomagnesemia in patients with anti-EGFR antibodies." },
    { claim: "Grade 1 needs no replacement", grade: "Single-centre commentary; not graded", source: "fakih-2008", quote: "No evidence suggests that a replacement strategy is necessary for grade 1 hypomagnesemia, as these patients are typically asymptomatic." },
    { claim: "Grade 3 or 4 should be replaced", grade: "Single-centre commentary; not graded", source: "fakih-2008", quote: "Patients with grade 3/4 hypomagnesemia should receive appropriate replacement." },
    { claim: "Intravenous magnesium mainly for urgent correction", grade: "Narrative review; not graded", source: "emj-2021", quote: "IV MG supplementation should mainly be administered in patients requiring immediate correction such as for ventricular arrhythmias, or those at risk of other complications related to moderate or severe hMG" },
    { claim: "Check magnesium at the start and throughout cancer treatment", grade: "Narrative review; not graded", source: "workeneh-2021", quote: "We recommended checking serum magnesium at the beginning of treatment and as part of routine monitoring throughout cancer treatment." },
    { claim: "Severe hypomagnesaemia can cause low calcium", grade: "Narrative review; not graded", source: "workeneh-2021", quote: "Paradoxically, severe hypomagnesemia can also cause hypoparathyroidism and secondary hypocalcemia" },
    { claim: "Amiloride may be considered for refractory hypomagnesaemia", grade: "Narrative review; not graded", source: "workeneh-2021", quote: "Amiloride can be considered in patients with cancer who have refractory hypomagnesemia and in whom it can be used safely." },
    { claim: "All-grade hypomagnesaemia in 34.0% on EGFR antibodies against 9.7% of controls", grade: "Pooled analysis of 25 randomised trials; not graded", source: "wang-2015" },
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
      accessed: "2026-11-16",
    },
    {
      key: "label-panitumumab",
      label: "Vectibix (panitumumab) injection: US prescribing information, section 5.3",
      publisher: "Amgen, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e0fa4bca-f245-4d92-ae29-b0c630a315c2",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-cetuximab",
      label: "Erbitux: EU summary of product characteristics, section 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency (marketing authorisation holder Merck Europe)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/erbitux-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-panitumumab",
      label: "Vectibix: EU summary of product characteristics, section 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency (marketing authorisation holder Amgen Europe)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/vectibix-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
    {
      key: "fakih-2008",
      label: "Management of Anti-EGFR-Targeting Monoclonal Antibody-Induced Hypomagnesemia (author declared honoraria from ImClone, then the maker of cetuximab)",
      publisher: "Oncology (Williston Park), on cancernetwork.com (Fakih)",
      year: 2008,
      url: "https://www.cancernetwork.com/view/management-anti-egfrtargeting-monoclonal-antibodyinduced-hypomagnesemia",
      gradingScheme: "Commentary describing one centre's practice; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
  ],
  drugs: ["cetuximab", "panitumumab"],
  targets: ["egfr"],
  terms: ["qt-prolongation"],
  related: ["magnesium-supplements"],
  gaps: [
    "No ESMO, ASCO, MASCC or NCCN guideline on low magnesium from EGFR antibodies was found, and a 2024 systematic review states that no evidence-based guideline exists. A web search found no public UK cancer-network or specialist-pharmacy guideline; local hospital electrolyte policies exist but were not read.",
    "No source read gives a magnesium threshold in mmol/L, the unit UK laboratories report. The grades here are CTCAE version 4.0 in mg/dL as tabulated in the Kidney360 review (grade 1: 1.2 to 1.7; grade 2: 0.9 to 1.2; grade 3: 0.7 to 0.9; grade 4: below 0.7 mg/dL). The CTCAE document itself could not be fetched and no conversion has been made here.",
    "Oral or intravenous magnesium first is unsettled: the two published approaches contradict each other on whether oral magnesium is tolerated and works. The randomised MAGNET trial of early oral magnesium is reported here only from a review's account; it was not found or read directly.",
    "No label gives a rule for holding or reducing cetuximab or panitumumab for low magnesium. Pausing at grade 4 comes from opinion-based guidance quoted in a review, and the stop-and-go approach from one centre's experience.",
    "No source read says when to record an ECG once severe hypomagnesaemia is found, or what QT interval should change treatment.",
    "Whether correcting low magnesium prevents arrhythmia or death has not been studied (Kato 2024).",
    "The practice commentary is from 2008 and its author declared honoraria from the maker of cetuximab; the doses in it are one centre's and are not from a trial.",
    "Necitumumab and amivantamab are not covered: no DailyMed label was found for necitumumab, and the amivantamab label lists decreased magnesium as a laboratory finding without a monitoring instruction.",
    "The year given for the two EU product information documents is the year they were read; the files state no revision date in the text.",
  ],
});
