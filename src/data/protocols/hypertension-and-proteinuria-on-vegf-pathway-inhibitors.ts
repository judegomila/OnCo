import { protocol } from "./helpers";

/*
 * High blood pressure and protein in the urine on medicines that block the VEGF pathway (antibodies such as
 * bevacizumab and ramucirumab, and kinase inhibitor tablets such as axitinib, lenvatinib and fruquintinib).
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022): full text of the article HTML.
 *   academic.oup.com returned 403 to a script and the paper is not in PubMed Central, so the article was read from the
 *   Internet Archive's public capture of academic.oup.com
 *   (web.archive.org/web/20240219224147/https://academic.oup.com/eurheartj/article/43/41/4229/6673995), stripped to
 *   text. In that page the recommendation tables are images, not text. The archived images of Recommendation Table 10
 *   (monitoring on VEGF inhibitors, both parts) and of the first part of Recommendation Table 33 (hypertension:
 *   targets, the threshold in selected metastatic patients, and the 180/110 mmHg rule) were downloaded from the same
 *   archive and read by eye; the classes and levels given here for ESC come from those images. The second part of
 *   Table 33 (the choice of blood pressure medicine) was not archived, so the ESC class and level for ACE inhibitors,
 *   ARBs and calcium channel blockers is not given: those statements are quoted from the narrative text without a
 *   grade. ESC quotes are from the narrative text only, never transcribed from an image.
 * - IC-OS consensus definitions (Herrmann et al., Eur Heart J 2022): full text from the PubMed Central article page
 *   (PMC8803367; Europe PMC's full-text service returned an error and the publisher does not allow XML download).
 * - American Heart Association scientific statement, Cancer Therapy-Related Hypertension (Cohen et al., Hypertension
 *   2023): full text of the author manuscript from PubMed Central (PMC10602651, NCBI E-utilities XML).
 * - ESMO consensus recommendations on cardiac disease in cancer patients (Curigliano et al., Ann Oncol 2020): full
 *   text from PubMed Central (PMC8019325, NCBI E-utilities XML).
 * - US prescribing information from DailyMed (SPL XML): Avastin (bevacizumab, label dated January 2025), Inlyta
 *   (axitinib, February 2025), Lenvima (lenvatinib, October 2026), Cyramza (ramucirumab, June 2026) and Fruzaqla
 *   (fruquintinib, July 2026).
 * Not read: the 2024 ESC guideline on elevated blood pressure and hypertension (not in PubMed Central; not pursued
 * further), the ESC Council on Hypertension position paper on hypertension in cancer, and the labels of the other
 * VEGF-pathway medicines listed in `drugs`.
 *
 * Every DOI and PMCID was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; where a source sentence ends in reference numbers, the quote stops
 * before them.
 */
export const hypertensionAndProteinuriaOnVegfPathwayInhibitors = protocol({
  id: "hypertension-and-proteinuria-on-vegf-pathway-inhibitors",
  name: "High blood pressure and protein in the urine on VEGF-pathway inhibitors: monitoring, treatment and when to pause the cancer medicine",
  aka: ["VEGF inhibitor hypertension", "bevacizumab blood pressure", "anti-angiogenic hypertension", "TKI hypertension", "proteinuria on bevacizumab", "urine dipstick before bevacizumab", "blood pressure on lenvatinib", "blood pressure on axitinib", "home blood pressure monitoring on cancer treatment", "posterior reversible encephalopathy syndrome", "PRES"],
  domain: "symptom-management",
  tldr: "Medicines that block VEGF often raise blood pressure, sometimes within days, and can make the kidneys leak protein. Your team should check your blood pressure before you start, ask you to measure it at home, test your urine, and treat high readings with ordinary blood pressure tablets so the cancer treatment can go on. Severe headache, confusion, fits or loss of vision need emergency help.",
  simple: "These cancer medicines can push blood pressure up and put protein in the urine. You check your blood pressure at home and your team tests your urine. Blood pressure tablets usually fix it. Get urgent help for a very bad headache, confusion, a fit or sudden loss of sight.",
  summary: "Hypertension is the commonest cardiovascular effect of VEGF-pathway inhibitors, is dose dependent, can appear within hours or days and usually reverses when the drug stops (ESC 2022). Blood pressure is measured and controlled before the first dose (ESMO 2020 [I, A] for baseline and serial measurement; every label read says to control it first). ESC 2022 recommends home measurement daily in the first cycle, after each dose increase and every 2 to 3 weeks thereafter (Class I, Level C), and measurement at every clinic visit (Class I, Level C). Labels set their own clinic schedules: lenvatinib after 1 week, then every 2 weeks for 2 months, then monthly; fruquintinib weekly for the first month; ramucirumab every 2 weeks; bevacizumab every 2 to 3 weeks.\n\nThe sources differ on when to treat. ESC 2022 sets a target below 140/90 mmHg during cancer therapy (Class I, Level C), allows below 130/80 mmHg if tolerated (Class IIb, Level C) and allows a 140 to 160 over 90 to 100 mmHg treatment threshold in selected asymptomatic people with metastatic cancer (Class IIb, Level C). IC-OS 2022 treats from 130/80 mmHg in people with cardiovascular disease, proteinuric kidney disease or diabetes and from 140/90 mmHg in others. The AHA statement (2023) follows the general ACC/AHA rule, with a goal below 130/80 mmHg. ESC recommends an ACE inhibitor or ARB first, with a dihydropyridine calcium channel blocker added at 160/100 mmHg or above; the AHA statement accepts any general first-line class and found no evidence favouring one. Diltiazem and verapamil are used with caution (AHA) or avoided (ESMO) because of interactions.\n\nAt 180 mmHg systolic or 110 mmHg diastolic, ESC and IC-OS withhold the cancer medicine until blood pressure is below 160/100 mmHg (ESC Class I, Level C). Labels act earlier or on grade: axitinib is reduced above 150/100 mmHg despite treatment and withheld above 160/105 mmHg. Hypertensive crisis, hypertensive encephalopathy and posterior reversible encephalopathy syndrome end treatment with bevacizumab. Urine is tested by dipstick; 2+ or more leads to a 24-hour collection, and 2 g or more in 24 hours means withholding (bevacizumab, lenvatinib, ramucirumab, fruquintinib labels), with nephrotic syndrome ending treatment. When the cancer medicine stops, blood pressure falls and the blood pressure tablets are reduced. This page explains care; the treating team's own protocol and the product's current label come first.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "emergency-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home", "community", "telephone-triage", "emergency-department"],
  },
  population: "Adults starting or taking a medicine that blocks the VEGF pathway: the antibodies bevacizumab and ramucirumab, and kinase inhibitor tablets such as axitinib, lenvatinib, sunitinib, pazopanib, cabozantinib, regorafenib, tivozanib and fruquintinib. The blood pressure thresholds of ESC 2022, IC-OS 2022 and the AHA statement are written for any cancer treatment that raises blood pressure, so they also apply to drugs such as carfilzomib, ibrutinib and selpercatinib, but the dose rules quoted here are those of the five labels read and no others. Children, pregnancy, and bevacizumab injected into the eye are not covered.",
  trigger: "A VEGF-pathway inhibitor is planned; at every visit and every home reading during treatment; and when the medicine is stopped.",
  steps: [
    {
      action: "Measure blood pressure before treatment starts and record it as the baseline, then keep measuring throughout treatment",
      why: "Blood pressure can rise within days of the first dose, and a rise can only be judged against a reading taken before.",
      source: "esmo-2020",
      quote: "For patients receiving cancer therapeutics associated with a risk of systemic HTN, especially anti-VEGF-based therapy, establishment of a baseline BP measurement and serial BP monitoring is recommended along with surveillance for the early detection of CV toxicity that may consist of periodic cardiac physical examination, cardiac biomarkers and/or cardiac imaging",
      grade: "[I, A]",
    },
    {
      action: "Bring existing high blood pressure under control before the first dose",
      why: "People who already have high blood pressure are the most likely to have a sharp rise, and starting from a controlled level leaves room to keep the cancer treatment going.",
      source: "esc-2022",
      quote: "Especially in patients with known hypertension, BP should be controlled before VEGFi therapy.",
    },
    {
      action: "Test the urine for protein before the first dose and regularly during treatment",
      why: "These medicines can damage the kidney's filters without any symptoms, and protein in the urine is the first sign.",
      source: "label-inlyta",
      quote: "Monitoring for proteinuria before initiation of, and periodically throughout, treatment with INLYTA is recommended.",
    },
    {
      action: "Ask the person to measure blood pressure at home with a validated machine: every day during the first cycle and after any dose increase, then every 2 to 3 weeks",
      why: "The rise often happens between clinic visits, and home readings catch it before it becomes dangerous.",
      source: "esc-2022",
      quote: "Home BP monitoring is recommended daily during the first cycle, after each increase of anticancer therapy dose, and every 2–3 weeks thereafter",
      grade: "Class I, Level C",
    },
    {
      action: "Measure blood pressure in clinic at every visit, at least as often as the product's label asks",
      why: "Each label sets its own minimum schedule, and a clinic reading checks the home machine.",
      source: "label-lenvima",
      quote: "Monitor blood pressure after 1 week, then every 2 weeks for the first 2 months, and then at least monthly thereafter during treatment.",
    },
    {
      action: "When blood pressure rises, look for and correct other causes such as pain, anxiety, anti-inflammatory painkillers, steroids and alcohol before blaming the cancer medicine alone",
      why: "Other causes are common in people with cancer and are easier to correct than interrupting a treatment that is working.",
      source: "esc-2022",
      quote: "In all patients with cancer with new hypertension assessment, correction of these other factors is important before considering interruption of a cancer treatment.",
    },
    {
      action: "Start or step up blood pressure treatment at 140/90 mmHg, or at 130/80 mmHg in people with heart or blood vessel disease, kidney disease with protein in the urine, or diabetes",
      why: "Treating early protects the heart, brain and kidneys and makes it less likely that the cancer medicine has to be paused.",
      source: "ic-os-2022",
      quote: "In other patients during cancer treatment, the threshold for the initiation of antihypertensive therapy can be extended to 140/90 mmHg.",
      grade: "IC-OS consensus definition",
    },
    {
      action: "Use an ACE inhibitor or an angiotensin receptor blocker as the first blood pressure medicine, above all when there is protein in the urine",
      why: "These medicines lower blood pressure, reduce protein loss through the kidney and may protect the heart muscle.",
      source: "esc-2022",
      quote: "treatment of hypertension with ACE-I or ARB as first-line therapy is recommended to reduce the risk of CTRCD",
    },
    {
      action: "At 160/100 mmHg or above, combine the ACE inhibitor or ARB with a dihydropyridine calcium channel blocker such as amlodipine",
      why: "Two medicines together bring blood pressure down faster than one.",
      source: "esc-2022",
      quote: "Combination therapy with an ACE-I or ARB and a dihydropyridine CCB is recommended in patients with cancer with systolic BP ≥ 160 mmHg and diastolic BP ≥ 100 mmHg due to the more rapid onset of BP control with the combination compared with ACE-I/ARB monotherapy",
    },
    {
      action: "Avoid diltiazem and verapamil, or use them only after a pharmacist has checked for interactions with the cancer medicine",
      why: "These two blood pressure medicines interfere with the way the body clears many cancer tablets, which can raise the level of the cancer medicine in the blood.",
      source: "aha-2023",
      quote: "Non-dihydropyridine calcium channel blockers (e.g., diltiazem, verapamil) should be used with caution in this patient population, as these antihypertensive agents are susceptible to interactions with several anti-cancer therapies that are metabolized by P-glycoprotein and cytochrome P450 3A4.",
    },
    {
      action: "At 180 mmHg systolic or 110 mmHg diastolic or above, pause the cancer medicine, weigh the cancer and heart risks together, and restart once blood pressure is below 160/100 mmHg",
      why: "At this level the risk of stroke or heart damage is high enough that a short pause is safer than continuing.",
      source: "esc-2022",
      quote: "any cancer therapy associated with hypertension should be deferred or temporarily withheld until the BP is controlled to values <160 mmHg (systolic BP) and <100 mmHg (diastolic BP)",
      grade: "Class I, Level C",
    },
    {
      action: "Follow the product's own label for holding, reducing or stopping the dose, which may act at lower readings than the guidelines",
      why: "Each medicine was tested with its own rules, and some labels reduce the dose before blood pressure reaches 180/110 mmHg.",
      source: "label-inlyta",
      quote: "Withhold and then dose reduce INLYTA or permanently discontinue based on severity of hypertension",
    },
    {
      action: "Treat severe headache, confusion, drowsiness, a seizure or loss of vision as an emergency: call for help, check blood pressure and arrange urgent brain MRI",
      why: "These can be signs of posterior reversible encephalopathy syndrome or a hypertensive emergency, which need hospital treatment the same day.",
      source: "label-avastin",
      quote: "PRES is a neurological disorder which can present with headache, seizure, lethargy, confusion, blindness and other visual and neurologic disturbances.",
    },
    {
      action: "Stop the cancer medicine for good after a hypertensive crisis, hypertensive encephalopathy or posterior reversible encephalopathy syndrome, where its label says so",
      why: "These complications can recur and can be fatal, and the bevacizumab label does not allow a restart.",
      source: "label-avastin",
      quote: "Discontinue in patients who develop hypertensive crisis or hypertensive encephalopathy.",
    },
    {
      action: "If the urine dipstick shows 2+ protein or more, measure the amount with a 24-hour urine collection (some labels and centres use a urine protein to creatinine ratio)",
      why: "A dipstick only estimates; the decision to pause treatment rests on the measured amount.",
      source: "label-avastin",
      quote: "Patients with a 2+ or greater urine dipstick reading should undergo further assessment with a 24-hour urine collection.",
    },
    {
      action: "Withhold the cancer medicine when urine protein reaches 2 grams in 24 hours, restart as its label allows once it falls, and stop it for nephrotic syndrome",
      why: "Heavy protein loss shows the kidney's filters are being injured, and it often improves when the medicine is paused.",
      source: "label-avastin",
      quote: "Withhold for proteinuria greater than or equal to 2 grams per 24 hours and resume when less than 2 grams per 24 hours.",
    },
    {
      action: "When the cancer medicine is paused or stopped, expect blood pressure to fall: keep measuring at home and reduce or stop the blood pressure tablets",
      why: "The rise in blood pressure usually reverses within days, and tablets that were needed during treatment can then cause faintness and falls.",
      source: "esc-2022",
      quote: "When treatment with a VEGFi is stopped, a drop in BP must be anticipated and BP-lowering therapy must be reduced and/or interrupted accordingly",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline is the most recent graded guideline, and almost all of its recommendations here are Class I, Level C, that is, consensus rather than trials. It, the IC-OS definitions (2022), the AHA scientific statement (2023) and ESMO (2020) agree on the shape of care: a baseline reading and control before the first dose, home monitoring, early treatment with ordinary blood pressure medicines so that the cancer treatment can continue, a pause at 180/110 mmHg, and a planned reduction of blood pressure medicines when the cancer medicine stops. They differ on three things, shown here side by side. Treatment threshold and target: ESC targets below 140/90 mmHg (Class I, Level C), with below 130/80 mmHg optional (Class IIb, Level C) and a looser 140 to 160 over 90 to 100 mmHg threshold allowed in selected asymptomatic people with metastatic cancer (Class IIb, Level C); IC-OS treats from 130/80 mmHg with cardiovascular disease, proteinuric kidney disease or diabetes and from 140/90 mmHg otherwise; the AHA statement applies the ACC/AHA rule with a goal below 130/80 mmHg. First medicine: ESC recommends an ACE inhibitor or ARB first; the AHA statement accepts an ACE inhibitor, ARB, dihydropyridine calcium channel blocker or thiazide and says the evidence for any one strategy is insufficient; ESMO says it is unclear whether one agent is superior. When to pause the cancer medicine: ESC and IC-OS at 180/110 mmHg, while labels use their own rules (axitinib is reduced above 150/100 mmHg despite treatment and withheld above 160/105 mmHg; lenvatinib and fruquintinib are withheld for grade 3 hypertension that persists despite optimal treatment; bevacizumab and ramucirumab for severe hypertension not controlled medically). For the dose of the cancer medicine, the label is the rule that applies.",
    sources: ["esc-2022", "ic-os-2022", "aha-2023", "esmo-2020", "label-avastin", "label-inlyta", "label-lenvima", "label-cyramza", "label-fruzaqla"],
  },
  variants: [
    {
      name: "Treatment threshold and target: ESC 2022",
      differs: "Target below 140/90 mmHg during cancer therapy; below 130/80 mmHg may be considered if well tolerated; in selected asymptomatic patients with metastatic cancer a treatment threshold of 140 to 160 mmHg systolic and 90 to 100 mmHg diastolic may be considered with ongoing monitoring. Its Figure 33 sets the home blood pressure threshold by setting: treat from 135 mmHg home systolic in cancer survivors and from 140 mmHg during curable cancer treatment, down to treating only from 160 mmHg where prognosis is under one year.",
      evidence: "Class I, Level C for the 140/90 mmHg target; Class IIb, Level C for the other two (read from the archived image of Recommendation Table 33). Figure 33 was read as an archived image.",
      sources: ["esc-2022"],
    },
    {
      name: "Treatment threshold and target: IC-OS 2022 and the AHA statement 2023",
      differs: "IC-OS diagnoses hypertension above 130/80 mmHg before or after cancer therapy and treats from that level during therapy in people with cardiovascular disease, proteinuric kidney disease or diabetes, and from 140/90 mmHg in others. The AHA statement uses the ACC/AHA categories: treat stage 1 (130 to 139 over 80 to 89 mmHg) where 10-year cardiovascular risk is 10 per cent or more or there is kidney disease or diabetes, treat stage 2 otherwise, with a goal below 130/80 mmHg.",
      evidence: "Consensus definitions and a scientific statement, not graded. The AHA statement says trials are needed to define targets in people with cancer.",
      sources: ["ic-os-2022", "aha-2023"],
    },
    {
      name: "Choice of first blood pressure medicine",
      differs: "ESC: ACE inhibitor or ARB first, plus a dihydropyridine calcium channel blocker at 160/100 mmHg or above; spironolactone, nitrates or hydralazine for resistant hypertension; carvedilol or nebivolol where there is another reason for a beta-blocker. AHA: any general first-line class (ARB, ACE inhibitor, dihydropyridine calcium channel blocker, thiazide), an ARB or ACE inhibitor where there is proteinuria, no diuretic where there is a risk of dehydration, and a mineralocorticoid antagonist for resistant hypertension. ESMO: no agent shown to be superior.",
      evidence: "No randomised trial compares blood pressure medicines in this setting; the AHA statement says so directly. The ESC class and level for drug choice could not be read (the second part of its Recommendation Table 33 was not in the archive).",
      sources: ["esc-2022", "aha-2023", "esmo-2020"],
    },
    {
      name: "Diltiazem and verapamil",
      differs: "The AHA statement says to use them with caution because of interactions with cancer medicines cleared by P-glycoprotein and CYP3A4. ESMO calls them typically contraindicated with VEGF inhibitors.",
      evidence: "Pharmacological reasoning, not trials. ESMO's sentence describes the two medicines as inducers of CYP3A4 while concluding that VEGF inhibitor levels rise; the AHA statement describes an interaction without that wording.",
      sources: ["aha-2023", "esmo-2020"],
    },
    {
      name: "When to hold or reduce for blood pressure: the labels",
      differs: "Axitinib: reduce one dose level above 150 mmHg systolic or 100 mmHg diastolic despite treatment; withhold above 160/105 mmHg until below 150/100 mmHg, then resume at a reduced dose. Lenvatinib: withhold for grade 3 hypertension that persists despite optimal treatment, resume at a reduced dose at grade 2 or less, stop for grade 4. Fruquintinib: withhold for grade 3 that persists despite optimal treatment and resume at the next lower dose once resolved or grade 1. Bevacizumab: withhold for severe hypertension not controlled medically; stop for hypertensive crisis or encephalopathy. Ramucirumab: withhold for severe hypertension until controlled; stop if it cannot be controlled, and for hypertensive crisis or encephalopathy.",
      evidence: "Regulatory labels, not graded. ESC and IC-OS set one threshold, 180/110 mmHg, for any cancer medicine.",
      sources: ["label-inlyta", "label-lenvima", "label-fruzaqla", "label-avastin", "label-cyramza", "esc-2022", "ic-os-2022"],
    },
    {
      name: "Clinic blood pressure schedule: the labels",
      differs: "Bevacizumab every 2 to 3 weeks; ramucirumab every 2 weeks or more often; lenvatinib after 1 week, every 2 weeks for 2 months, then at least monthly; fruquintinib weekly for the first month, then at least monthly; axitinib gives no interval. ESMO asks for daily readings in the first cycle and then at least every 2 to 3 weeks.",
      evidence: "Regulatory labels and consensus. No trial compares schedules.",
      sources: ["label-avastin", "label-cyramza", "label-lenvima", "label-fruzaqla", "label-inlyta", "esmo-2020"],
    },
    {
      name: "Urine protein rules: the labels",
      differs: "All five test before and during treatment. Bevacizumab, lenvatinib and ramucirumab go from a dipstick of 2+ to a 24-hour collection; ramucirumab also allows a urine protein to creatinine ratio for monitoring. All withhold at 2 grams or more in 24 hours. They differ on restarting: bevacizumab when below 2 grams; lenvatinib at a reduced dose once at or below 2 grams; ramucirumab at a reduced dose once below 2 grams; fruquintinib only once below 1 gram, at a reduced dose. Ramucirumab is stopped above 3 grams in 24 hours; all stop for nephrotic syndrome. Axitinib says to withhold and reduce for moderate to severe proteinuria without a figure.",
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
    { claim: "At 180 mmHg systolic or 110 mmHg diastolic or above, evaluate competing risks and defer or withhold the cancer therapy until below 160/100 mmHg", grade: "Class I, Level C", source: "esc-2022", quote: "If severe hypertension is diagnosed (systolic BP ≥ 180 mmHg or diastolic BP ≥ 110 mmHg), the competing cancer and CV risks should be evaluated by a MDT, and any cancer therapy associated with hypertension should be deferred or temporarily withheld until the BP is controlled to values <160 mmHg (systolic BP) and <100 mmHg (diastolic BP)." },
    { claim: "The same 180/110 mmHg withholding threshold, as a consensus definition", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "If BP is >180 mmHg systolic or 110 mmHg diastolic, the competing cancer and CV risks should be evaluated, and any cancer therapy associated with hypertension should be deferred or temporarily withheld until BP is controlled to values below 160 mmHg systolic and 100 mmHg diastolic." },
    { claim: "Home blood pressure monitoring for everyone on a therapy known to cause or worsen hypertension", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "Home BP monitoring should be adopted by all patients with cancer receiving therapy known to cause or worsen hypertension." },
    { claim: "No antihypertensive strategy is supported by evidence specific to cancer therapy; first-line classes as in the general population", grade: "Scientific statement; not graded", source: "aha-2023", quote: "Insufficient evidence exists supporting a specific antihypertensive medication strategy specific to patients with anti-cancer therapy-induced hypertension." },
    { claim: "An ARB or ACE inhibitor for people with proteinuria", grade: "Scientific statement; not graded", source: "aha-2023", quote: "patients with proteinuria should be treated with an angiotensin receptor blocker or angiotensin-converting enzyme inhibitor" },
    { claim: "Antihypertensives may need reducing within days of stopping the cancer medicine, with daily home readings", grade: "Scientific statement; not graded", source: "aha-2023", quote: "In patients treated with anti-cancer therapy requiring significant escalation of antihypertensive therapy at the onset, reduction in antihypertensive therapy may need to occur within days of cessation of treatment, and daily home BP monitoring may be necessary." },
    { claim: "Withdrawal of antihypertensive therapy may be required once anti-VEGF therapy stops", grade: "Consensus text; not graded", source: "esmo-2020", quote: "Once anti-VEGF-based therapy is stopped, the management of HTN should be modified and the withdrawal of antihypertensive therapy may be required to prevent hypotension." },
    { claim: "Ramucirumab: withhold at 2 grams or more of urine protein in 24 hours; stop above 3 grams or for nephrotic syndrome", grade: "Regulatory label; not graded", source: "label-cyramza", quote: "Permanently discontinue CYRAMZA for urine protein levels greater than 3 grams over 24 hours or in the setting of nephrotic syndrome" },
    { claim: "Fruquintinib: blood pressure must be controlled before starting, then measured weekly for the first month", grade: "Regulatory label; not graded", source: "label-fruzaqla", quote: "Do not initiate FRUZAQLA unless blood pressure is adequately controlled. Monitor blood pressure weekly the first month, at least monthly thereafter and as clinically indicated." },
  ],
  sources: [
    {
      key: "esc-2022",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology (European Heart Journal); read from the Internet Archive capture of the publisher's page",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      gradingScheme: "Class of recommendation I (recommended), IIa (should be considered), IIb (may be considered), III (not recommended); level of evidence A (multiple randomised trials or meta-analyses), B (one randomised trial or large non-randomised studies), C (expert consensus or small studies).",
      read: "full-text",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
    {
      key: "label-avastin",
      label: "AVASTIN (bevacizumab) injection: US prescribing information (label dated January 2025)",
      publisher: "Genentech, on DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=939b5d1f-9fb2-4499-80ef-0607aa6b114e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-inlyta",
      label: "INLYTA (axitinib) tablets: US prescribing information (label dated February 2025)",
      publisher: "Pfizer, on DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=84137882-e000-47da-bd5b-fa76ab3c76f9",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-lenvima",
      label: "LENVIMA (lenvatinib) capsules: US prescribing information (label dated October 2026)",
      publisher: "Eisai, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4bedd21-efde-44c6-9d9c-b48b78d7ed1e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-cyramza",
      label: "CYRAMZA (ramucirumab) solution: US prescribing information (label dated June 2026)",
      publisher: "Eli Lilly, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c6080942-dee6-423e-b688-1272c2ae90d4",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-fruzaqla",
      label: "FRUZAQLA (fruquintinib) capsules: US prescribing information (label dated July 2026)",
      publisher: "Takeda, on DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=186d786e-dc8a-45f2-b5e1-01ac0201879f",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  upgrades: [],
  gaps: [
    "No randomised trial has tested a blood pressure target, a monitoring schedule or a choice of blood pressure medicine in people on VEGF-pathway inhibitors. Almost every ESC recommendation here is Level C, and the AHA statement lists targets, monitoring frequency and the best medicine as open questions.",
    "The 2022 ESC guideline's recommendation tables are images on the publisher's page. The first part of its hypertension table and its VEGF inhibitor monitoring table were read from archived images; the second part of the hypertension table, which grades the choice of blood pressure medicine, was not archived, so no ESC class or level is given for ACE inhibitors, ARBs or calcium channel blockers.",
    "The 2024 ESC guideline on elevated blood pressure and hypertension and the ESC Council on Hypertension position paper on hypertension in cancer were not read. Whether either changes the thresholds above is not known here.",
    "None of the guidelines read gives a urine protein threshold or says how often to test; those rules come from the labels, which differ on when to restart (below 2 grams for bevacizumab, below 1 gram for fruquintinib) and on whether a protein to creatinine ratio may replace a 24-hour collection.",
    "Only five labels were read (bevacizumab, axitinib, lenvatinib, ramucirumab, fruquintinib). The hold and reduce rules for sunitinib, sorafenib, pazopanib, cabozantinib, regorafenib, tivozanib, vandetanib and ponatinib are in their own labels and are not given here; European product information was not read and may differ.",
    "How fast blood pressure falls after stopping, and how quickly to withdraw blood pressure medicines, is described only in general terms (within days, AHA).",
    "The sources disagree on diltiazem and verapamil (caution in the AHA statement, typically contraindicated in ESMO), and ESMO's stated mechanism does not match its conclusion.",
  ],
  institutions: ["esmo"],
  targets: ["vegf"],
  drugs: ["bevacizumab", "ramucirumab", "axitinib", "lenvatinib", "fruquintinib", "sunitinib", "sorafenib", "pazopanib", "cabozantinib", "regorafenib", "tivozanib", "vandetanib", "ponatinib"],
  terms: ["angiogenesis", "cardiotoxicity"],
  related: ["cardio-oncology", "cardio-oncology-risk-assessment-and-cardiac-surveillance", "qt-prolongation-monitoring-on-anticancer-drugs", "atrial-fibrillation-and-bleeding-on-btk-inhibitors", "hypothyroidism-on-tyrosine-kinase-inhibitors", "anti-vegf-drugs-around-surgery", "anticancer-drug-interaction-review", "paper-lyon-eur-heart-j"],
  sections: ["supportive-care"],
  tags: ["protocol", "cardio-oncology", "side-effect-management"],
});
