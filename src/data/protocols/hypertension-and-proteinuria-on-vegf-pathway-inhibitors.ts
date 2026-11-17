import { protocol } from "./helpers";

/*
 * High blood pressure and protein in the urine on medicines that block the VEGF pathway (antibodies such as
 * bevacizumab and ramucirumab, and kinase inhibitor tablets such as axitinib, lenvatinib and fruquintinib).
 *
 * Written on 16 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw text and
 * every claim checked against it.
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022): academic.oup.com returns 403 to a script
 *   and the paper is not in PubMed Central. The first pass read an Internet Archive capture in which the
 *   recommendation tables were images. This pass read the published PDF held in an open university repository
 *   (iris.unisr.it, hdl.handle.net/20.500.11768/201582), fetched on 16 November by a sibling checker and converted
 *   with pdftotext. In it Recommendation Tables 10 and 33 and Figures 33 and 34 are text, so the classes and levels
 *   for the choice of blood pressure medicine, which the first pass could not read, are now given. The PDF text
 *   prints the "fi" ligature as one glyph (undone when checking quotes) and prints the less-than sign in running
 *   text as a comma, so no ESC sentence containing a less-than sign is quoted. One request to the Internet Archive
 *   for the HTML capture got no answer on 17 November and was not repeated.
 * - IC-OS consensus definitions (Herrmann et al., Eur Heart J 2022): full text from the PubMed Central article page
 *   (PMC8803367, one plain request; Europe PMC's full-text service returned an error and the publisher does not allow
 *   XML download).
 * - American Heart Association scientific statement, Cancer Therapy-Related Hypertension (Cohen et al., Hypertension
 *   2023): full text of the author manuscript from PubMed Central (PMC10602651, NCBI E-utilities XML).
 * - ESMO consensus recommendations on cardiac disease in cancer patients (Curigliano et al., Ann Oncol 2020): full
 *   text from PubMed Central (PMC8019325, NCBI E-utilities XML).
 * - US prescribing information from DailyMed (SPL XML, current versions on 17 November 2026): Avastin (bevacizumab,
 *   version dated January 2025), Inlyta (axitinib, February 2025), Lenvima (lenvatinib, October 2026), Cyramza
 *   (ramucirumab, June 2026) and Fruzaqla (fruquintinib, July 2026). Every hold, reduce and stop rule on this page was
 *   re-read against the dosage modification table and the warnings section of its label.
 * - Macmillan Cancer Support's bevacizumab page (reviewed 1 April 2025), fetched with curl, added in this pass as the
 *   source for which symptoms a patient reports straight away.
 * Not read: the 2024 ESC guideline on elevated blood pressure and hypertension (not in PubMed Central), the ESC
 * Council on Hypertension position paper on hypertension in cancer, and the labels of the other VEGF-pathway
 * medicines listed in `drugs`.
 *
 * Every DOI was resolved through Crossref and its title checked; Europe PMC was searched for newer editions and none
 * was found. Quotes are copied from the raw text with line breaks joined and nothing else changed; where a source
 * sentence ends in reference numbers, the quote stops before them.
 */
export const hypertensionAndProteinuriaOnVegfPathwayInhibitors = protocol({
  id: "hypertension-and-proteinuria-on-vegf-pathway-inhibitors",
  name: "High blood pressure and protein in the urine on VEGF-pathway inhibitors: monitoring, treatment and when to pause the cancer medicine",
  aka: ["VEGF inhibitor hypertension", "bevacizumab blood pressure", "anti-angiogenic hypertension", "TKI hypertension", "proteinuria on bevacizumab", "urine dipstick before bevacizumab", "blood pressure on lenvatinib", "blood pressure on axitinib", "home blood pressure monitoring on cancer treatment", "posterior reversible encephalopathy syndrome", "PRES"],
  domain: "symptom-management",
  tldr: "Medicines that block VEGF often raise blood pressure, sometimes within days, and can put protein in the urine. Your team checks your blood pressure before you start, asks you to measure it at home, tests your urine, and treats high readings so treatment can go on. Contact the hospital straight away for a headache that does not get better, confusion, drowsiness, a fit or changes in eyesight.",
  simple: "These cancer medicines can push blood pressure up and put protein in the urine. You check your blood pressure at home and your team tests your urine. Blood pressure tablets are used to bring it down. Contact the hospital straight away for a headache that does not get better, confusion, drowsiness, a fit or a change in eyesight.",
  summary: "Hypertension is a class effect of VEGF-pathway inhibitors and the most reported adverse event on them; it occurs within hours or days, is dose dependent and is usually reversed when the drug stops (ESC 2022). Blood pressure is measured before the first dose and serially after it (ESMO 2020 [I, A]) and controlled before treatment starts (ESC 2022; the axitinib, lenvatinib, ramucirumab and fruquintinib labels each say so, the bevacizumab label does not). ESC 2022 recommends home measurement daily in the first cycle, after each dose increase and every 2 to 3 weeks thereafter (Class I, Level C), and measurement at every clinic visit (Class I, Level C). Labels set their own clinic schedules: lenvatinib after 1 week, then every 2 weeks for the first 2 months, then at least monthly; fruquintinib weekly for the first month, then at least monthly; ramucirumab every 2 weeks or more often; bevacizumab every 2 to 3 weeks.\n\nThe sources differ on when to treat. ESC 2022 sets a target below 140/90 mmHg during cancer therapy (Class I, Level C), allows below 130/80 mmHg if tolerated (Class IIb, Level C) and allows a 140 to 160 over 90 to 100 mmHg treatment threshold in selected asymptomatic people with metastatic cancer (Class IIb, Level C). IC-OS 2022 treats above 130/80 mmHg in people with cardiovascular disease, proteinuric kidney disease or diabetes and says the threshold can be extended to 140/90 mmHg in others. The AHA statement (2023) follows the general ACC/AHA rule, with a goal below 130/80 mmHg. ESC recommends an ACE inhibitor or ARB first (Class I, Level B), a dihydropyridine calcium channel blocker second (Class I, Level C), and the two together when systolic pressure is 160 mmHg or above and diastolic 100 mmHg or above (Class I, Level C); the AHA statement accepts any general first-line class and found insufficient evidence for any one strategy. Diltiazem and verapamil are not recommended by ESC (Class III, Level C), are to be used with caution in the AHA statement and are called typically contraindicated by ESMO, in each case because of drug interactions.\n\nAt 180 mmHg systolic or 110 mmHg diastolic, ESC and IC-OS say the cancer medicine should be deferred or temporarily withheld until blood pressure is below 160/100 mmHg (ESC Class I, Level C). Labels act earlier or on grade: axitinib is reduced above 150 mmHg systolic or 100 mmHg diastolic despite treatment and withheld above 160 mmHg systolic or 105 mmHg diastolic. Hypertensive crisis, hypertensive encephalopathy and posterior reversible encephalopathy syndrome end treatment with bevacizumab. The bevacizumab, lenvatinib and ramucirumab labels go from a urine dipstick of 2+ or more to a 24-hour collection; all five labels read withhold at 2 g or more of protein in 24 hours, and the bevacizumab, lenvatinib, ramucirumab and fruquintinib labels end treatment for nephrotic syndrome. When the cancer medicine stops, a drop in blood pressure must be anticipated and the blood pressure tablets reduced or interrupted (ESC). This page explains care; the treating team's own protocol and the product's current label come first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "emergency-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home", "community", "telephone-triage", "emergency-department"],
  },
  population: "Adults starting or taking a medicine that blocks the VEGF pathway: the antibodies bevacizumab and ramucirumab, and kinase inhibitor tablets such as axitinib, lenvatinib, sunitinib, pazopanib, cabozantinib, regorafenib, tivozanib and fruquintinib. The blood pressure thresholds of ESC 2022, IC-OS 2022 and the AHA statement are written for any cancer treatment that raises blood pressure, so they also apply to drugs such as carfilzomib, ibrutinib and selpercatinib, but the dose rules quoted here are those of the five labels read and no others. Children, pregnancy, and bevacizumab injected into the eye are not covered.",
  trigger: "A VEGF-pathway inhibitor is planned; at every visit and every home reading during treatment; and when the medicine is stopped.",
  steps: [
    {
      action: "Measure blood pressure before treatment starts and record it as the baseline, then keep measuring throughout treatment",
      why: "ESMO says blood pressure rises within a day of starting, sometimes within hours, so a reading taken before treatment is needed to judge any rise.",
      source: "esmo-2020",
      quote: "For patients receiving cancer therapeutics associated with a risk of systemic HTN, especially anti-VEGF-based therapy, establishment of a baseline BP measurement and serial BP monitoring is recommended along with surveillance for the early detection of CV toxicity that may consist of periodic cardiac physical examination, cardiac biomarkers and/or cardiac imaging",
      grade: "[I, A]",
    },
    {
      action: "Bring existing high blood pressure under control before the first dose",
      why: "ESC says the risk of high blood pressure on these medicines is higher in people who already have it. The axitinib, lenvatinib, ramucirumab and fruquintinib labels also say to control blood pressure before starting.",
      source: "esc-2022",
      quote: "Especially in patients with known hypertension, BP should be controlled before VEGFi therapy.",
    },
    {
      action: "Test the urine for protein before the first dose and periodically during treatment",
      why: "These medicines can put protein in the urine. The axitinib, lenvatinib and fruquintinib labels ask for a test before starting and periodically after; the bevacizumab label asks for serial dipstick tests during treatment.",
      source: "label-inlyta",
      quote: "Monitoring for proteinuria before initiation of, and periodically throughout, treatment with INLYTA is recommended.",
    },
    {
      action: "Ask the person to measure blood pressure at home: every day during the first cycle and after any dose increase, then every 2 to 3 weeks",
      why: "The AHA statement says blood pressure on these medicines often worsens within days and can progress to a hypertensive emergency, and asks for a validated home device.",
      source: "esc-2022",
      quote: "Home BP monitoring is recommended daily during the first cycle, after each increase of anticancer therapy dose, and every 2–3 weeks thereafter",
      grade: "Class I, Level C",
    },
    {
      action: "Measure blood pressure at every clinic visit, and at least as often as the product's label asks",
      why: "ESC recommends a reading at every clinical visit (Class I, Level C). Each label sets its own minimum schedule; the one quoted here is lenvatinib's.",
      source: "label-lenvima",
      quote: "Monitor blood pressure after 1 week, then every 2 weeks for the first 2 months, and then at least monthly thereafter during treatment.",
    },
    {
      action: "When blood pressure rises, look for and correct other causes such as pain, stress, anti-inflammatory painkillers, steroids and excess alcohol before considering a pause in the cancer medicine",
      why: "ESC lists these, with kidney impairment, untreated sleep apnoea, obesity and reduced exercise, as other causes of high blood pressure in people with cancer.",
      source: "esc-2022",
      quote: "In all patients with cancer with new hypertension assessment, correction of these other factors is important before considering interruption of a cancer treatment.",
    },
    {
      action: "Start blood pressure treatment above 130/80 mmHg in people with heart or blood vessel disease, kidney disease with protein in the urine, or diabetes; in others the threshold can be extended to 140/90 mmHg",
      why: "IC-OS notes that high blood pressure from cancer treatment can come on abruptly and lead to organ damage, and that uncontrolled blood pressure may lead to the cancer treatment being held. ESC and the AHA statement set different thresholds, shown under the variants.",
      source: "ic-os-2022",
      quote: "In other patients during cancer treatment, the threshold for the initiation of antihypertensive therapy can be extended to 140/90 mmHg.",
      grade: "IC-OS consensus definition",
    },
    {
      action: "Use an ACE inhibitor or an angiotensin receptor blocker as the first blood pressure medicine, unless there is a reason not to",
      why: "ESC recommends these first to reduce the risk of heart muscle damage from cancer treatment. The AHA statement says people with protein in the urine should be treated with one of them.",
      source: "esc-2022",
      quote: "treatment of hypertension with ACE-I or ARB as first-line therapy is recommended to reduce the risk of CTRCD",
      grade: "Class I, Level B",
    },
    {
      action: "When systolic pressure is 160 mmHg or above and diastolic 100 mmHg or above, combine the ACE inhibitor or ARB with a dihydropyridine calcium channel blocker",
      why: "ESC says the combination controls blood pressure more rapidly than an ACE inhibitor or ARB alone. ESMO names nifedipine and amlodipine as examples of this class.",
      source: "esc-2022",
      quote: "Combination therapy with an ACE-I or ARB and a dihydropyridine CCB is recommended in patients with cancer with systolic BP ≥ 160 mmHg and diastolic BP ≥ 100 mmHg due to the more rapid onset of BP control with the combination compared with ACE-I/ARB monotherapy",
      grade: "Class I, Level C",
    },
    {
      action: "Do not use diltiazem or verapamil as routine blood pressure treatment; where several other medicines are not tolerated, they may be considered with close monitoring for drug interactions",
      why: "ESC does not recommend them because of drug interactions, and allows them only in selected people who cannot tolerate multiple other blood pressure medicines. The AHA statement says to use them with caution, because they interact with several cancer medicines handled by P-glycoprotein and CYP3A4.",
      source: "esc-2022",
      quote: "Diltiazem and verapamil are not recommended to treat arterial hypertension in patients with cancer due to their drug–drug interactions.",
      grade: "Class III, Level C",
    },
    {
      action: "At 180 mmHg systolic or 110 mmHg diastolic or above, weigh the cancer and cardiovascular risks together and defer or pause the cancer medicine until blood pressure is below 160/100 mmHg",
      why: "ESC recommends this as Class I, Level C and asks a multidisciplinary team to weigh the two risks. The cancer medicine can be restarted once blood pressure is controlled, with a dose reduction considered. IC-OS gives the same rule.",
      source: "esc-2022",
      quote: "Culprit cancer therapy can be restarted once BP is controlled, with consideration for dose reduction.",
    },
    {
      action: "Follow the product's own label for holding, reducing or stopping the dose, which may act at lower readings than the guidelines",
      why: "Some labels act before blood pressure reaches 180/110 mmHg: the axitinib label reduces the dose above 150 mmHg systolic or 100 mmHg diastolic despite treatment.",
      source: "label-inlyta",
      quote: "Withhold and then dose reduce INLYTA or permanently discontinue based on severity of hypertension",
    },
    {
      action: "Tell the person to contact the hospital straight away, or go to hospital without driving themselves, for a headache that does not get better, drowsiness or confusion, changes in eyesight or a fit",
      why: "Macmillan's bevacizumab page says these can be signs of a brain condition that is rare and can be serious, and that a full recovery is possible.",
      source: "macmillan-bevacizumab",
      quote: "But it must be diagnosed and treated quickly.",
    },
    {
      action: "Assess anyone with headache, a seizure, drowsiness, confusion or loss of vision for posterior reversible encephalopathy syndrome: check blood pressure and confirm with a brain MRI",
      why: "The bevacizumab label says MRI is necessary to confirm the diagnosis and that blood pressure may be mildly to severely raised. IC-OS counts hypertensive encephalopathy and this syndrome among the hypertensive emergencies that must be managed before cancer treatment can resume.",
      source: "label-avastin",
      quote: "PRES is a neurological disorder which can present with headache, seizure, lethargy, confusion, blindness and other visual and neurologic disturbances.",
    },
    {
      action: "Stop the cancer medicine after a hypertensive crisis, hypertensive encephalopathy or posterior reversible encephalopathy syndrome, where its label says so",
      why: "The bevacizumab label says to discontinue for each of these and that the safety of restarting after the syndrome is not known. The lenvatinib label differs: it allows a restart at a reduced dose after recovery, depending on severity.",
      source: "label-avastin",
      quote: "Discontinue in patients who develop hypertensive crisis or hypertensive encephalopathy.",
    },
    {
      action: "If the urine dipstick shows 2+ protein or more, measure the amount with a 24-hour urine collection",
      why: "The decision to pause treatment rests on the measured amount. The ramucirumab label also allows a urine protein to creatinine ratio for monitoring; the bevacizumab label reports that the ratio correlated poorly with the 24-hour result in one study.",
      source: "label-avastin",
      quote: "Patients with a 2+ or greater urine dipstick reading should undergo further assessment with a 24-hour urine collection.",
    },
    {
      action: "Withhold the cancer medicine when urine protein reaches 2 grams in 24 hours, restart as its label allows once it falls, and stop it for nephrotic syndrome where its label says so",
      why: "All five labels read set this threshold. In the bevacizumab label's pooled analysis, grade 2 to 4 proteinuria resolved in 74% of patients.",
      source: "label-avastin",
      quote: "Withhold for proteinuria greater than or equal to 2 grams per 24 hours and resume when less than 2 grams per 24 hours.",
    },
    {
      action: "When the cancer medicine is stopped, expect blood pressure to fall, and reduce or interrupt the blood pressure tablets to match",
      why: "ESC says high blood pressure from these medicines is usually reversed when they stop. The AHA statement says the reduction may be needed within days, with daily home readings, to avoid low blood pressure.",
      source: "esc-2022",
      quote: "When treatment with a VEGFi is stopped, a drop in BP must be anticipated and BP-lowering therapy must be reduced and/or interrupted accordingly",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline is the most recent graded guideline, and almost all of its recommendations here are Class I, Level C, that is, expert consensus or small studies rather than randomised trials. Read together, it, the IC-OS definitions (2022), the AHA scientific statement (2023) and ESMO (2020) describe one shape of care: a baseline reading and control before the first dose, home monitoring, early treatment with ordinary blood pressure medicines so that the cancer treatment can continue, a pause at 180/110 mmHg (ESC and IC-OS; the AHA statement reports the same threshold), and a reduction of blood pressure medicines when the cancer medicine stops. They differ on four things, shown here side by side. Treatment threshold and target: ESC targets below 140/90 mmHg (Class I, Level C), with below 130/80 mmHg optional (Class IIb, Level C) and a looser 140 to 160 over 90 to 100 mmHg threshold allowed in selected asymptomatic people with metastatic cancer (Class IIb, Level C); IC-OS treats above 130/80 mmHg with cardiovascular disease, proteinuric kidney disease or diabetes and says the threshold can be extended to 140/90 mmHg otherwise; the AHA statement applies the ACC/AHA rule with a goal below 130/80 mmHg. First medicine: ESC recommends an ACE inhibitor or ARB first (Class I, Level B) and a dihydropyridine calcium channel blocker second (Class I, Level C); the AHA statement accepts an ACE inhibitor, ARB, dihydropyridine calcium channel blocker or thiazide and says the evidence for any one strategy is insufficient; ESMO says it is unclear whether one agent is superior. Diltiazem and verapamil: not recommended by ESC (Class III, Level C), used with caution in the AHA statement, typically contraindicated in ESMO. When to pause the cancer medicine: ESC and IC-OS at 180/110 mmHg, while labels use their own rules (axitinib is reduced above 150 mmHg systolic or 100 mmHg diastolic despite treatment and withheld above 160 mmHg systolic or 105 mmHg diastolic; lenvatinib and fruquintinib are withheld for grade 3 hypertension that persists despite optimal treatment; bevacizumab is withheld for severe hypertension not controlled with medical management, and ramucirumab for severe hypertension until it is controlled). For the dose of the cancer medicine, the label is the rule that applies.",
    sources: ["esc-2022", "ic-os-2022", "aha-2023", "esmo-2020", "label-avastin", "label-inlyta", "label-lenvima", "label-cyramza", "label-fruzaqla"],
  },
  variants: [
    {
      name: "Treatment threshold and target: ESC 2022",
      differs: "Target below 140/90 mmHg during cancer therapy; below 130/80 mmHg may be considered if well tolerated; in selected asymptomatic patients with metastatic cancer a treatment threshold of 140 to 160 mmHg systolic and 90 to 100 mmHg diastolic may be considered with ongoing monitoring. Its Figure 33 sets the home blood pressure threshold for people without symptoms by setting: for cancer survivors \"treat\" from 135 mmHg and \"may treat\" at 130 to 134 mmHg; during curable cancer treatment \"treat\" from 140 mmHg and \"may treat\" at 135 to 139 mmHg; with metastatic cancer and a prognosis under one year \"treat\" from 160 mmHg and \"may treat\" at 140 to 159 mmHg.",
      evidence: "Class I, Level C for the 140/90 mmHg target; Class IIb, Level C for the other two (Recommendation Table 33, read as text from the published PDF). Figure 33 marks each cell with a colour for its class; the colours cannot be read from the text of the PDF, so the classes of its cells are not given here.",
      sources: ["esc-2022"],
    },
    {
      name: "Treatment threshold and target: IC-OS 2022 and the AHA statement 2023",
      differs: "IC-OS diagnoses hypertension above 130/80 mmHg before or after cancer therapy, treats from that level during therapy in people with cardiovascular disease, proteinuric kidney disease or diabetes, and says the threshold can be extended to 140/90 mmHg in others. The AHA statement uses the ACC/AHA categories: treat stage 1 (130 to 139 systolic or 80 to 89 diastolic) where 10-year atherosclerotic cardiovascular risk is 10 per cent or more or there is chronic kidney disease or diabetes, treat from stage 2 otherwise, with a goal below 130/80 mmHg.",
      evidence: "Consensus definitions and a scientific statement, not graded. The AHA statement says trials are needed to define targets in people with cancer.",
      sources: ["ic-os-2022", "aha-2023"],
    },
    {
      name: "Choice of first blood pressure medicine",
      differs: "ESC: ACE inhibitor or ARB first; a dihydropyridine calcium channel blocker second where blood pressure is uncontrolled; both together when systolic pressure is 160 mmHg or above and diastolic 100 mmHg or above; spironolactone, oral or transdermal nitrates or hydralazine should be considered for resistant hypertension; carvedilol or nebivolol are the preferred beta-blockers on a VEGF inhibitor where there is a specific reason for one. AHA: any general first-line class (ARB, ACE inhibitor, dihydropyridine calcium channel blocker, thiazide), an ARB or ACE inhibitor where there is proteinuria, no diuretic where there is a high risk of volume depletion, and a mineralocorticoid antagonist for resistant hypertension. ESMO: unclear whether one agent is superior.",
      evidence: "ESC: Class I, Level B for an ACE inhibitor or ARB first; Class I, Level C for a dihydropyridine calcium channel blocker second and for the combination (Recommendation Table 33). The AHA statement says evidence-based trials of treatment are lacking and that it remains unclear which medicines should be used; ESMO says there is no detailed randomised trial.",
      sources: ["esc-2022", "aha-2023", "esmo-2020"],
    },
    {
      name: "Diltiazem and verapamil",
      differs: "ESC does not recommend them for high blood pressure in people with cancer because of drug interactions; a footnote allows them to be considered, with close monitoring of interactions, in selected people who are intolerant of multiple other blood pressure medicines. The AHA statement says to use them with caution because of interactions with cancer medicines metabolised by P-glycoprotein and CYP3A4. ESMO calls them typically contraindicated with VEGF inhibitors.",
      evidence: "ESC: Class III, Level C. The other two give pharmacological reasoning without a grade. ESMO's sentence describes the two medicines as inducers of CYP3A4 while concluding that VEGF inhibitor levels rise; the AHA statement describes an interaction without that wording.",
      sources: ["esc-2022", "aha-2023", "esmo-2020"],
    },
    {
      name: "When to hold or reduce for blood pressure: the labels",
      differs: "Axitinib: reduce one dose level above 150 mmHg systolic or 100 mmHg diastolic despite treatment; withhold above 160 mmHg systolic or 105 mmHg diastolic until below 150/100 mmHg, then resume at a reduced dose; stop for grade 4 hypertension or hypertensive crisis. Lenvatinib: withhold for grade 3 hypertension that persists despite optimal treatment, resume at a reduced dose once controlled at grade 2 or less, stop for grade 4. Fruquintinib: withhold for grade 3 that persists despite optimal treatment, resume at the next lower dose once resolved or grade 1, stop for grade 4. Bevacizumab: withhold for severe hypertension not controlled with medical management and resume once controlled; stop for hypertensive crisis or encephalopathy. Ramucirumab: withhold for severe hypertension until controlled; stop if it cannot be controlled, and for hypertensive crisis or encephalopathy.",
      evidence: "Regulatory labels, not graded. ESC and IC-OS set one threshold, 180/110 mmHg, for any cancer medicine.",
      sources: ["label-inlyta", "label-lenvima", "label-fruzaqla", "label-avastin", "label-cyramza", "esc-2022", "ic-os-2022"],
    },
    {
      name: "Clinic blood pressure schedule: the labels",
      differs: "Bevacizumab every 2 to 3 weeks; ramucirumab every 2 weeks or more often; lenvatinib after 1 week, every 2 weeks for the first 2 months, then at least monthly; fruquintinib weekly for the first month, then at least monthly; axitinib gives no interval. ESMO asks for daily readings in the first cycle and then at least every 2 to 3 weeks.",
      evidence: "Regulatory labels and consensus. No trial compares schedules.",
      sources: ["label-avastin", "label-cyramza", "label-lenvima", "label-fruzaqla", "label-inlyta", "esmo-2020"],
    },
    {
      name: "Urine protein rules: the labels",
      differs: "The axitinib, lenvatinib and fruquintinib labels ask for testing before and periodically during treatment; the bevacizumab label asks for serial dipstick tests during treatment; the ramucirumab label asks for monitoring by dipstick, a urine protein to creatinine ratio or both. Bevacizumab, lenvatinib and ramucirumab go from a dipstick of 2+ to a 24-hour collection. All five withhold at 2 grams or more in 24 hours. They differ on restarting: bevacizumab when below 2 grams; axitinib and ramucirumab at a reduced dose once below 2 grams; lenvatinib at a reduced dose once at or below 2 grams; fruquintinib only once below 1 gram, at the next lower dose. Ramucirumab is stopped above 3 grams in 24 hours. Bevacizumab, lenvatinib, ramucirumab and fruquintinib are stopped for nephrotic syndrome, and fruquintinib also if protein does not recover to below 1 gram; the axitinib label gives no stopping rule for proteinuria.",
      evidence: "Regulatory labels, not graded. None of the guidelines read gives a urine protein threshold.",
      sources: ["label-avastin", "label-lenvima", "label-cyramza", "label-fruzaqla", "label-inlyta"],
    },
  ],
  grades: [
    { claim: "Baseline and serial blood pressure measurement on treatments that raise blood pressure, especially anti-VEGF therapy", grade: "[I, A]", source: "esmo-2020" },
    { claim: "Blood pressure measured at every clinical visit on VEGF inhibitors, bevacizumab or ramucirumab", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Home blood pressure daily in the first cycle, after each dose increase and every 2 to 3 weeks thereafter", grade: "Class I, Level C", source: "esc-2022", quote: "Home BP monitoring is recommended daily during the first cycle, after each increase of anticancer therapy dose, and every 2–3 weeks thereafter" },
    { claim: "Effective treatment of cancer therapy-induced hypertension to prevent treatment interruption and cardiovascular complications", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Target below 140 mmHg systolic and below 90 mmHg diastolic during cancer therapy", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Target below 130 mmHg systolic and below 80 mmHg diastolic may be considered if well tolerated", grade: "Class IIb, Level C", source: "esc-2022" },
    { claim: "In selected asymptomatic patients with metastatic cancer, a treatment threshold of 140 to 160 mmHg systolic and 90 to 100 mmHg diastolic may be considered with ongoing monitoring", grade: "Class IIb, Level C", source: "esc-2022" },
    { claim: "At 180 mmHg systolic or 110 mmHg diastolic or above, evaluate competing risks and defer or withhold the cancer therapy until below 160/100 mmHg", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "ACE inhibitors or ARBs are the first-line blood pressure medicines for people with cancer, unless contraindicated", grade: "Class I, Level B", source: "esc-2022" },
    { claim: "Dihydropyridine calcium channel blockers as second-line medicines where blood pressure is uncontrolled", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "An ACE inhibitor or ARB combined with a dihydropyridine calcium channel blocker when systolic pressure is 160 mmHg or above and diastolic 100 mmHg or above", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "Diltiazem and verapamil are not recommended for high blood pressure in people with cancer", grade: "Class III, Level C", source: "esc-2022", quote: "Diltiazem and verapamil are not recommended to treat arterial hypertension in patients with cancer due to their drug–drug interactions." },
    { claim: "Above 180 mmHg systolic or 110 mmHg diastolic, defer or withhold until below 160/100 mmHg, as a consensus definition", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "If BP is >180 mmHg systolic or 110 mmHg diastolic, the competing cancer and CV risks should be evaluated, and any cancer therapy associated with hypertension should be deferred or temporarily withheld until BP is controlled to values below 160 mmHg systolic and 100 mmHg diastolic." },
    { claim: "Home blood pressure monitoring for everyone on a therapy known to cause or worsen hypertension", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "Home BP monitoring should be adopted by all patients with cancer receiving therapy known to cause or worsen hypertension." },
    { claim: "No antihypertensive strategy is supported by evidence specific to cancer therapy; first-line classes as in the general population", grade: "Scientific statement; not graded", source: "aha-2023", quote: "Insufficient evidence exists supporting a specific antihypertensive medication strategy specific to patients with anti-cancer therapy-induced hypertension." },
    { claim: "An ARB or ACE inhibitor for people with proteinuria", grade: "Scientific statement; not graded", source: "aha-2023", quote: "patients with proteinuria should be treated with an angiotensin receptor blocker or angiotensin-converting enzyme inhibitor" },
    { claim: "Antihypertensives may need reducing within days of stopping the cancer medicine, with daily home readings", grade: "Scientific statement; not graded", source: "aha-2023", quote: "In patients treated with anti-cancer therapy requiring significant escalation of antihypertensive therapy at the onset, reduction in antihypertensive therapy may need to occur within days of cessation of treatment, and daily home BP monitoring may be necessary." },
    { claim: "Withdrawal of antihypertensive therapy may be required once anti-VEGF therapy stops", grade: "Consensus text; not graded", source: "esmo-2020", quote: "Once anti-VEGF-based therapy is stopped, the management of HTN should be modified and the withdrawal of antihypertensive therapy may be required to prevent hypotension." },
    { claim: "Ramucirumab: stop for urine protein above 3 grams in 24 hours or for nephrotic syndrome", grade: "Regulatory label; not graded", source: "label-cyramza", quote: "Permanently discontinue CYRAMZA for urine protein levels greater than 3 grams over 24 hours or in the setting of nephrotic syndrome" },
    { claim: "Fruquintinib: blood pressure must be controlled before starting, then measured weekly for the first month", grade: "Regulatory label; not graded", source: "label-fruzaqla", quote: "Do not initiate FRUZAQLA unless blood pressure is adequately controlled. Monitor blood pressure weekly the first month, at least monthly thereafter and as clinically indicated." },
  ],
  sources: [
    {
      key: "esc-2022",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology (European Heart Journal); read from the published PDF in an open university repository",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      gradingScheme: "Class of recommendation I (recommended), IIa (should be considered), IIb (may be considered), III (not recommended); level of evidence A (multiple randomised trials or meta-analyses), B (one randomised trial or large non-randomised studies), C (expert consensus, small studies, retrospective studies or registries).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ic-os-2022",
      label: "Defining cardiovascular toxicities of cancer therapies: an International Cardio-Oncology Society (IC-OS) consensus statement",
      publisher: "IC-OS (European Heart Journal)",
      year: 2022,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8803367/",
      doi: "10.1093/eurheartj/ehab674",
      gradingScheme: "Consensus definitions; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aha-2023",
      label: "Cancer Therapy-Related Hypertension: A Scientific Statement From the American Heart Association",
      publisher: "American Heart Association (Hypertension; Cohen et al.)",
      year: 2023,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10602651/",
      doi: "10.1161/HYP.0000000000000224",
      gradingScheme: "Scientific statement; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2020",
      label: "Management of cardiac disease in cancer patients throughout oncological treatment: ESMO consensus recommendations",
      publisher: "ESMO (Annals of Oncology; Curigliano et al.)",
      year: 2020,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8019325/",
      doi: "10.1016/j.annonc.2019.10.023",
      gradingScheme: "[level, grade]: levels of evidence I to V and grades of recommendation A to E, adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-avastin",
      label: "AVASTIN (bevacizumab) injection: US prescribing information (DailyMed version dated January 2025)",
      publisher: "Genentech, on DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=939b5d1f-9fb2-4499-80ef-0607aa6b114e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-inlyta",
      label: "INLYTA (axitinib) tablets: US prescribing information (DailyMed version dated February 2025)",
      publisher: "Pfizer, on DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=84137882-e000-47da-bd5b-fa76ab3c76f9",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-lenvima",
      label: "LENVIMA (lenvatinib) capsules: US prescribing information (DailyMed version dated October 2026)",
      publisher: "Eisai, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4bedd21-efde-44c6-9d9c-b48b78d7ed1e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-cyramza",
      label: "CYRAMZA (ramucirumab) solution: US prescribing information (DailyMed version dated June 2026)",
      publisher: "Eli Lilly, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c6080942-dee6-423e-b688-1272c2ae90d4",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-fruzaqla",
      label: "FRUZAQLA (fruquintinib) capsules: US prescribing information (DailyMed version dated July 2026)",
      publisher: "Takeda, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=186d786e-dc8a-45f2-b5e1-01ac0201879f",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-bevacizumab",
      label: "Bevacizumab: information page (reviewed 1 April 2025)",
      publisher: "Macmillan Cancer Support",
      year: 2025,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/bevacizumab",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  upgrades: [],
  gaps: [
    "No randomised trial has tested a blood pressure target, a monitoring schedule or a choice of blood pressure medicine in people on VEGF-pathway inhibitors. Almost every ESC recommendation here is Level C, and the AHA statement names targets, monitoring strategies and the choice of medicine as open questions.",
    "On 17 November 2026 the 2022 ESC guideline was re-read from the text of its published PDF, in which the recommendation tables are text, so the classes and levels for the choice of blood pressure medicine are now given. That text prints the less-than sign as a comma, so the ESC sentence that sets the 160/100 mmHg level for restarting is stated here but not quoted; IC-OS words the same rule and is quoted. The classes that Figure 33 shows by colour could not be read.",
    "The 2024 ESC guideline on elevated blood pressure and hypertension and the ESC Council on Hypertension position paper on hypertension in cancer were not read; on 17 November 2026 the 2024 guideline was still not in PubMed Central. Whether either changes the thresholds above is not known here.",
    "None of the guidelines read gives a urine protein threshold or says how often to test; those rules come from the labels, which differ on when to restart (below 2 grams for bevacizumab, below 1 gram for fruquintinib) and on whether a protein to creatinine ratio may be used for monitoring (the ramucirumab label allows it; the bevacizumab label reports poor correlation with a 24-hour collection).",
    "Only five labels were read (bevacizumab, axitinib, lenvatinib, ramucirumab, fruquintinib). The hold and reduce rules for sunitinib, sorafenib, pazopanib, cabozantinib, regorafenib, tivozanib, vandetanib and ponatinib are in their own labels and are not given here; European product information was not read and may differ.",
    "How fast blood pressure falls after stopping, and how quickly to withdraw blood pressure medicines, is described only in general terms (within days, AHA).",
    "The sources disagree on diltiazem and verapamil (not recommended in ESC, caution in the AHA statement, typically contraindicated in ESMO), and ESMO's stated mechanism does not match its conclusion.",
    "The advice on which symptoms a patient reports straight away comes from Macmillan's page on bevacizumab; the bevacizumab and fruquintinib labels tell patients to contact their healthcare provider immediately for new or worsening neurological function. No source read gives a blood pressure reading at which a patient at home should seek urgent help.",
  ],
  institutions: ["esmo"],
  targets: ["vegf"],
  drugs: ["bevacizumab", "ramucirumab", "axitinib", "lenvatinib", "fruquintinib", "sunitinib", "sorafenib", "pazopanib", "cabozantinib", "regorafenib", "tivozanib", "vandetanib", "ponatinib"],
  terms: ["angiogenesis", "cardiotoxicity"],
  related: ["cardio-oncology", "cardio-oncology-risk-assessment-and-cardiac-surveillance", "qt-prolongation-monitoring-on-anticancer-drugs", "atrial-fibrillation-and-bleeding-on-btk-inhibitors", "hypothyroidism-on-tyrosine-kinase-inhibitors", "anti-vegf-drugs-around-surgery", "anticancer-drug-interaction-review", "paper-lyon-eur-heart-j"],
  sections: ["supportive-care"],
  tags: ["protocol", "cardio-oncology", "side-effect-management"],
});
