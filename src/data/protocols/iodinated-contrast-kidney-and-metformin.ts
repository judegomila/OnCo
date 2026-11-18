import { protocol } from "./helpers";

/*
 * Iodinated contrast for CT and other X-ray imaging in adults with cancer: checking kidney function, preventing
 * contrast-associated acute kidney injury, and what to do with metformin.
 *
 * First written 11 November 2026. Re-read claim by claim in a second accuracy pass on 17 November 2026; every source
 * was fetched raw with curl into a scratch directory and read as text, and every quote was checked by script against
 * that text (whitespace and line breaks normalised, XML tags stripped, nothing else):
 * - ESUR Contrast Media Safety Committee Guidelines 2026: full text. The PDF linked from esur.org (created October
 *   2026; its preface is dated November 2025, calls itself the 2025 version following Version 10, and says the
 *   guidelines are now updated every year) was fetched again and read with pdftotext. The handbook prints no grades.
 *   It still lists "Prevention of CA-AKI" and the metformin guideline among those "currently being updated".
 * - van der Molen et al., Post-contrast acute kidney injury Part 2 (Eur Radiol 2018), the ESUR paper behind those
 *   recommendations: full text, Europe PMC XML (PMC5986837). The levels of evidence quoted come from its tables.
 *   Part 1 of that paper (definitions, thresholds, timing of eGFR) was not read.
 * - Davenport et al., ACR and National Kidney Foundation consensus statements (Kidney Medicine 2020, the open-access
 *   copy of the Radiology 2020 paper, DOI 10.1148/radiol.2019192094): full text, Europe PMC XML (PMC7525144).
 * - NICE NG148, Acute kidney injury: prevention, detection and management (published 18 December 2019, last updated
 *   16 October 2024): recommendations page, full text (HTML).
 * - EANM FDG PET/CT procedure guideline version 2.0 (2015): full text, Europe PMC XML (PMC4315529), for its stricter
 *   metformin rule, shown as a variant.
 * - ACR Manual on Contrast Media, 2026 edition: not reachable on 11 November. A sibling checker fetched the complete
 *   PDF from the ACR page with plain curl on 16 November 2026; that copy was read with pdftotext for this page (the
 *   chapters on fasting, post-contrast acute kidney injury and metformin). It is now a source for the ACR position.
 * - The FDA metformin safety communication of 8 April 2016: the address ACR/NKF cite answered 404 on 17 November 2026.
 *
 * The three DOIs were resolved through Crossref and their titles checked. Europe PMC and Crossref showed no newer
 * ESUR paper on kidney injury or metformin, no update of the ACR/NKF statements and no later EANM version. Where a
 * superscript unit ("m2") breaks in the raw text the sentence is not used as a quote, or the quote stops before it.
 *
 * Changed in the second pass: orders softened to the sources' "consider" (NICE screening questions, alternative
 * imaging); steps resting on the wrong source moved to the right one (drug prophylaxis, dialysis, alternative
 * imaging); unsourced reasons taken out of several "why" lines; the metformin restart condition completed; the ACR
 * Manual's positions on contrast dose, metformin, fasting, myeloma and eGFR timing added, each kept apart from ESUR's.
 */
export const iodinatedContrastKidneyAndMetformin = protocol({
  id: "iodinated-contrast-kidney-and-metformin",
  name: "Iodinated contrast for CT: kidney function checks, kidney protection and metformin",
  aka: ["contrast nephropathy prevention", "contrast-induced nephropathy", "contrast-associated acute kidney injury", "CA-AKI", "PC-AKI", "CT contrast and kidneys", "eGFR before CT", "metformin and contrast", "IV hydration before CT"],
  domain: "screening-diagnostics",
  tldr: "Many cancer scans use a dye containing iodine. If your kidneys work normally the dye is very unlikely to harm them, and you do not usually need to stop eating or drinking beforehand. If your kidneys are known to be weak, the team checks a recent blood test, may give you fluid through a drip around the scan, and may ask you to pause metformin for about two days.",
  simple: "CT scans often use a dye. Tell the team if you have kidney problems or take metformin for diabetes. Most people need nothing special. If your kidneys are weak you may get a drip of fluid and a blood test afterwards. An urgent scan is not held up for a blood test when waiting would be risky.",
  summary: "Risk is judged from the estimated glomerular filtration rate (eGFR). ESUR 2026 counts as at risk an eGFR below 30 ml/min/1.73 m² before intravenous contrast (or intra-arterial contrast with second-pass renal exposure), an eGFR below 45 before intra-arterial contrast with first-pass renal exposure or in intensive care patients, and known or suspected acute renal failure. ACR/NKF 2020 name acute kidney injury or an eGFR below 30; NICE NG148 says there is a small but increased risk with an eGFR below 30 [2024]. ESUR measures eGFR within 7 days for inpatients and people with acute illness and within 3 months otherwise; NICE uses an eGFR from the past 6 months, or screening questions when there is none, and says to consider proceeding without a blood test if the answers are negative and the person is stable; the ACR Manual says there is no agreed maximum interval and that some accept 30 days in outpatients. In an emergency NICE says not to delay contrast if the delay is likely to be clinically significant (1.1.7 [2024]); ESUR measures eGFR only if the procedure can wait without harm; ACR/NKF say contrast needed for a life-threatening diagnosis should not be withheld on kidney function.\n\nPrevention in at-risk patients is intravenous volume expansion. ESUR finds 0.9% saline and bicarbonate protocols of similar efficacy (Level of evidence A) and says preventive hydration should be used in at-risk patients (Level B). Its regimens for intravenous contrast are bicarbonate 1.4% at 3 ml/kg/h for 1 hour before, or saline 0.9% at 1 ml/kg/h for 3 to 4 hours before and 4 to 6 hours after (Level D, expert opinion); it does not recommend oral hydration as the only measure (Level D). ACR/NKF say prophylaxis is indicated in acute kidney injury or an eGFR below 30 in people not on maintenance dialysis, that it may be considered at 30 to 44 in individual high-risk circumstances, and that normal saline is preferred; they call the ideal timing, volume and rate uncertain and describe typical regimens as starting 1 hour before and continuing 3 to 12 hours after, either fixed (for example 500 mL before and after) or weight-based (1 to 3 mL/kg per hour). NICE encourages oral hydration for adults at increased risk and says to consider intravenous volume expansion for inpatients at particularly high risk [2019]. ESUR does not recommend N-acetylcysteine (Level A), short-term high-dose statins, vitamin C or prophylactic renal replacement therapy (each Level B). ESUR uses low- or iso-osmolar contrast at the lowest dose consistent with a diagnostic result; the ACR does not recommend reducing the dose to protect the kidneys, because the images may be non-diagnostic. ESUR rechecks eGFR 48 hours after contrast in at-risk patients.\n\nThe guidelines differ on ACE inhibitors and angiotensin receptor blockers: ESUR says they do not have to be stopped (Level B); NICE says consider stopping them temporarily in chronic kidney disease with an eGFR below 30 [2013, amended 2024]. On other nephrotoxic drugs, ESUR found insufficient evidence to recommend withholding NSAIDs, antimicrobials or chemotherapy before contrast (Level C), while ACR/NKF recommend stopping non-essential nephrotoxic drugs when feasible at an eGFR below 30 or in acute kidney injury, the decision being individualised. Metformin: ESUR continues it normally at an eGFR above 30 with no acute kidney injury; at an eGFR below 30, in acute kidney injury, or with first-pass intra-arterial contrast it is stopped from the time of contrast, eGFR is measured within 48 hours, and it is restarted if renal function has not changed significantly (Level D). ACR/NKF also withhold it in acute kidney injury or at an eGFR below 30; the ACR Manual withholds it for 48 hours in those groups and restarts only after renal function is found to be normal. People with myeloma and normal kidney function are not at higher risk if well hydrated and given low- or iso-osmolar contrast, and Bence Jones testing beforehand is not recommended (ESUR 2026). Fasting before low- or iso-osmolar contrast is not recommended (ESUR 2026) and not required before routine contrast (ACR Manual).",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "emergency-department"],
  },
  population: "Adults having intravenous iodine-based contrast for CT or other X-ray imaging, including people with cancer, kidney disease, myeloma or diabetes treated with metformin. Intra-arterial injection with first-pass renal exposure (ESUR: into the left heart, the thoracic and suprarenal abdominal aorta or the renal arteries) has a lower threshold and is noted, not detailed. Children (eGFR by the revised Schwartz formula in ESUR) and people on dialysis (discussed with the kidney team) are named where the sources address them. Gadolinium contrast for MRI is not covered; allergy to contrast is a separate protocol.",
  trigger: "A CT or other examination with intravascular iodine-based contrast is requested.",
  steps: [
    {
      action: "When requesting a non-urgent contrast CT, find out whether the person has kidney disease",
      why: "NICE says there is a small but increased risk of acute kidney injury after iodine contrast when eGFR is below 30.",
      source: "nice-ng148",
      quote: "Before requesting a non-urgent iodine-based contrast media CT scan, assess whether the person has pre-existing kidney disease.",
      grade: "[2024]",
    },
    {
      action: "Use an eGFR from the past 6 months if there is one; if not, ask the screening questions (kidney disease or transplant, seeing a kidney specialist or urologist, symptoms of acute illness). Consider an eGFR test if an answer points to kidney disease or acute illness, and consider going ahead without one if none does and the person is stable",
      why: "A recent result, or three questions, can stand in for a fresh blood test in a stable person with no kidney history (NICE). ESUR and the ACR ask for a more recent result; the variants give their intervals.",
      source: "nice-ng148",
      quote: "If available, use an eGFR measurement from the past 6 months to support decision making about the use of iodine-based contrast media. If the person has been acutely unwell or clinically unstable since their last eGFR test, consider using a more recent eGFR.",
      grade: "[2024]",
    },
    {
      action: "In an emergency, do not delay contrast to wait for a kidney test if the delay is likely to matter clinically",
      why: "NICE puts the harm of a clinically significant delay ahead of waiting for a result. ACR/NKF say contrast needed for a life-threatening diagnosis should not be withheld because of kidney function.",
      source: "nice-ng148",
      quote: "Do not delay the use of iodine-based contrast media in an emergency if the risk of delaying the contrast media is likely to be clinically significant.",
      grade: "[2024]",
    },
    {
      action: "Talk through the benefits and risks of the contrast scan with the person, and with their family or carers if appropriate",
      why: "NICE asks for this to be a shared decision.",
      source: "nice-ng148",
      quote: "Discuss the benefits and risks of tests or treatments that use iodine-based contrast media with the person, and their family members and carers if appropriate.",
      grade: "[2024]",
    },
    {
      action: "For an at-risk person, consider an imaging method that does not use iodine-based contrast",
      why: "Another test may answer the question without iodine contrast. The ACR Manual gives non-contrast CT, ultrasound and non-contrast MRI as examples, and adds that contrast may still be necessary whatever the kidney risk.",
      source: "esur-2026",
      quote: "Consider an alternative imaging method not using iodine-based contrast media.",
    },
    {
      action: "For an at-risk person (ESUR: eGFR below 30 before intravenous contrast, or known or suspected acute renal failure), use intravenous fluid around the scan",
      why: "In the trials ESUR reviewed, kidney injury after contrast was less common with intravenous fluid than without, though few people in them had an eGFR below 30.",
      source: "esur-2018-pcaki",
      quote: "Preventive hydration should be used to reduce the incidence of PC-AKI in at-risk patients.",
      grade: "Level of evidence B",
    },
    {
      action: "For intravenous contrast ESUR gives two regimens: sodium bicarbonate 1.4% at 3 ml/kg/h for 1 hour before the contrast, or saline 0.9% at 1 ml/kg/h for 3 to 4 hours before and 4 to 6 hours after. In severe heart failure (NYHA grade 3 to 4) or end-stage kidney failure the doctor responsible individualises the fluid",
      why: "ESUR rates saline and bicarbonate as similarly effective (Level of evidence A); the regimens themselves are expert opinion. Large volumes of fluid may worsen heart failure. ACR/NKF prefer saline and describe different typical regimens, given in the summary.",
      source: "esur-2018-pcaki",
      quote: "For intravenous and intra-arterial CM administration with second pass renal exposure hydrate the patient with either (a) 3 ml/kg/h bicarbonate 1.4% (or 154 mmol/l solution) for 1 h before CM or (b) 1 ml/kg/h saline 0.9% for 3–4 h before and 4–6 h after CM.",
      grade: "Level of evidence D",
    },
    {
      action: "Do not rely on drinks alone to protect at-risk kidneys; drinking clear fluids freely alongside the drip is supported",
      why: "ESUR found the studies of oral fluids small and without people with severe kidney impairment. NICE takes a different line, given in the variants.",
      source: "esur-2018-pcaki",
      quote: "Oral hydration as the sole means of prevention is not recommended.",
      grade: "Level of evidence D",
    },
    {
      action: "Do not use N-acetylcysteine, a short course of high-dose statin, vitamin C or dialysis to prevent kidney injury from contrast",
      why: "ESUR found that none of them has been shown conclusively to lower the risk (N-acetylcysteine Level of evidence A, the others Level B), and its 2026 handbook says no drug has been shown to offer consistent protection. ACR/NKF also do not recommend N-acetylcysteine.",
      source: "esur-2018-pcaki",
      quote: "Vitamin C has not been shown conclusively to reduce the risk of PC-AKI in patients receiving intravenous or intra-arterial CM, and its use is NOT recommended.",
      grade: "Level of evidence B",
    },
    {
      action: "Use a low- or iso-osmolar contrast agent at the lowest dose that gives a diagnostic scan",
      why: "This is ESUR's advice for all patients. The ACR does not recommend reducing the dose below the standard to protect the kidneys, because the scan may then not answer the question; the variants give both positions.",
      source: "esur-2026",
      quote: "Use the lowest dose of contrast medium consistent with a diagnostic result.",
    },
    {
      action: "Do not assume chemotherapy, antimicrobials or NSAIDs must be withheld for the scan; in people with chronic kidney disease keep nephrotoxic drugs to a minimum",
      why: "ESUR found too little evidence to recommend withholding them before contrast. ACR/NKF recommend stopping non-essential nephrotoxic drugs when feasible if eGFR is below 30 or there is acute kidney injury, and note that withholding a needed drug may carry more risk than the contrast; the treating team decides.",
      source: "esur-2018-pcaki",
      quote: "There is insufficient evidence to recommend withholding nephrotoxic drugs such as NSAIDs, antimicrobial agents or chemotherapeutic agents before CM administration.",
      grade: "Level of evidence C",
    },
    {
      action: "If the person takes metformin and has an eGFR below 30, acute kidney injury, or intra-arterial contrast with first-pass renal exposure, stop metformin from the time of contrast, measure eGFR within 48 hours and restart it if kidney function has not changed significantly; otherwise carry on as normal",
      why: "If the kidneys are injured after contrast, metformin can build up in the body. ESUR's paper says the risk of the acid build-up this can cause (lactic acidosis) is very low; ACR/NKF say metformin itself does not raise the risk of kidney injury.",
      source: "esur-2026",
      quote: "Stop taking metformin from the time of contrast medium administration. Measure eGFR within 48 hours and restart metformin if renal function has not changed significantly.",
    },
    {
      action: "In myeloma, make sure the person is well hydrated, discuss correcting a high calcium with the haematologist before the scan, and do not test for Bence Jones protein because of the scan",
      why: "ESUR says people with myeloma often have reduced kidney function or high calcium, which raise the risk, but with normal kidney function, good hydration and low- or iso-osmolar contrast the risk is not increased.",
      source: "esur-2026",
      quote: "Multiple myeloma patients with normal renal function are not at increased risk of CA-AKI if they are well hydrated and low- or iso-osmolar iodine-based contrast media are used.",
    },
    {
      action: "For people on dialysis or with a kidney transplant, discuss the scan with the kidney team, without delaying emergency imaging",
      why: "NICE asks for the kidney team to be involved before contrast is offered to people on renal replacement therapy.",
      source: "nice-ng148",
      quote: "Discuss the person's care with a nephrology team before offering iodine-based contrast media to adults on renal replacement therapy, including people with a renal transplant, but do not delay emergency imaging for this.",
      grade: "[2019]",
    },
    {
      action: "Do not add haemodialysis sessions to remove iodine contrast",
      why: "ESUR says extra sessions are not recommended and that timing the injection around haemodialysis is unnecessary, though its 2018 paper allows it to limit fluid overload. ACR/NKF say dialysis should not be started or rescheduled solely because of contrast.",
      source: "esur-2026",
      quote: "Extra haemodialysis session(s) to remove contrast medium is not recommended.",
    },
    {
      action: "Do not ask people to fast before a scan with modern low- or iso-osmolar contrast",
      why: "ESUR says fasting dates from older high-osmolar contrast that made many people vomit. The ACR Manual also says fasting is not required before routine contrast, and that anaesthetic fasting rules apply to people having sedation.",
      source: "esur-2026",
      quote: "Fasting is not recommended before administration of low- or iso-osmolar non-ionic iodine-based contrast media, gadolinium-based agents or ultrasound contrast agents.",
    },
    {
      action: "In at-risk patients, recheck eGFR 48 hours after the contrast; if kidney injury is found, monitor the person for at least 30 days with eGFR at regular intervals",
      why: "ESUR defines kidney injury after contrast by a rise in creatinine within 48 to 72 hours of the injection.",
      source: "esur-2026",
      quote: "Determine eGFR 48 hours after contrast medium administration.",
    },
  ],
  bestInClass: {
    statement: "Judge risk from eGFR, with extra care for intravenous contrast when eGFR is below 30 ml/min/1.73 m² or there is acute kidney injury (ESUR 2026 and ACR/NKF 2020 name both; NICE NG148 names an eGFR below 30). In an emergency do not delay contrast for a kidney result when the delay is likely to be clinically significant (NICE [2024]; ACR/NKF: contrast for a life-threatening diagnosis should not be withheld on kidney function). For those at risk, intravenous fluid around the scan: ESUR accepts 0.9% saline or bicarbonate 1.4% (Level A for similar efficacy, Level B for use, Level D for the regimens); ACR/NKF say saline prophylaxis is indicated and prefer it to bicarbonate; NICE says to consider either for inpatients at particularly high risk. No drug prophylaxis (ESUR; ACR/NKF for N-acetylcysteine), low- or iso-osmolar contrast, and an eGFR at 48 hours (ESUR). Metformin is stopped only below eGFR 30, in acute kidney injury or with first-pass intra-arterial contrast (ESUR Level D; ACR/NKF and the ACR Manual agree for eGFR below 30 and acute kidney injury). Where the bodies differ the page gives each position: on how recent the eGFR must be (ESUR: 7 days for inpatients or the acutely ill, 3 months otherwise; NICE: 6 months, or screening questions; ACR Manual: no agreed interval), on oral fluids (NICE encourages them; ESUR does not recommend them as the only measure), on ACE inhibitors and ARBs (ESUR: do not have to be stopped, Level B; NICE: consider stopping in chronic kidney disease with eGFR below 30), on other nephrotoxic drugs (ESUR: insufficient evidence to withhold, Level C; ACR/NKF: stop non-essential ones when feasible), on contrast dose (ESUR: lowest diagnostic dose; ACR: do not reduce below the standard dose) and on restarting metformin (ESUR: if kidney function has not changed significantly; ACR Manual: after 48 hours and only once it is found to be normal).",
    sources: ["esur-2026", "esur-2018-pcaki", "acr-nkf-2020", "nice-ng148", "acr-manual-contrast"],
  },
  variants: [
    {
      name: "NICE: screening questions instead of a routine blood test",
      differs: "Uses an eGFR from the past 6 months; if there is none, asks whether the person has kidney disease or a transplant, has seen or is waiting to see a kidney specialist, kidney surgeon or urologist, or has symptoms of acute illness, and says to consider proceeding without a blood test if the answers do not indicate kidney disease and the person is stable (NG148 1.1.9 to 1.1.12, 2024). ESUR offers measuring eGFR in all patients or only in those with a history of renal disease, kidney surgery, proteinuria, hypertension, hyperuricaemia or diabetes, within 7 days for inpatients and people with acute illness and within 3 months for others. The ACR Manual suggests testing those with a personal history of renal disease, optionally diabetes, or metformin use, says there is no agreed maximum interval, that some accept 30 days in outpatients, and that a shorter interval seems prudent for inpatients and those with a new risk factor.",
      evidence: "NICE's 2024 update rests on its evidence review of eGFR and risk tools for predicting contrast-associated kidney injury (not read here). The ESUR handbook prints no grade for its timing, and the paper behind it (Part 1) was not read. The ACR Manual calls its list a blend of published data and expert opinion.",
      sources: ["nice-ng148", "esur-2026", "acr-manual-contrast"],
    },
    {
      name: "Stopping ACE inhibitors and ARBs before contrast",
      differs: "NICE recommends considering temporarily stopping ACE inhibitors and angiotensin receptor blockers in adults with chronic kidney disease and an eGFR below 30 having iodine-based contrast (1.2.9, [2013, amended 2024]). ESUR says they do not have to be stopped.",
      evidence: "ESUR: meta-analyses of trials found no lower risk; withholding them may be associated with a slightly lower risk, but not strongly enough to recommend it (Level of evidence B).",
      sources: ["nice-ng148", "esur-2018-pcaki"],
    },
    {
      name: "Oral hydration encouraged (NICE)",
      differs: "NICE encourages oral hydration before and after intravenous contrast in adults at increased risk (1.2.7 [2019]) and says to consider intravenous volume expansion for inpatients at particularly high risk, for example an eGFR below 30, a renal transplant, a large volume of contrast or first-pass intra-arterial injection (1.2.8 [2019]). ESUR supports unrestricted clear oral fluids only in addition to intravenous volume expansion.",
      evidence: "ESUR graded oral hydration as the only preventive measure as not recommended (Level of evidence D). ACR/NKF say oral hydration has not been well studied in people with an eGFR below 30 or acute kidney injury.",
      sources: ["nice-ng148", "esur-2018-pcaki", "acr-nkf-2020"],
    },
    {
      name: "Withholding metformin at eGFR 30 to 59 (US labelling)",
      differs: "The US Food and Drug Administration, as reported by ACR/NKF, recommends withholding metformin before iodinated contrast at eGFR 30 to 59 as well as avoiding it below 30. ACR/NKF say decisions at 30 to 59 should be individualised by the referring clinician; the ACR Manual says there is no need to stop metformin at an eGFR of 30 or above with no acute kidney injury, and states that the FDA advice of 8 April 2016 is more restrictive than its own; ESUR continues metformin normally above 30 and notes its advice may deviate from EMA and FDA recommendations.",
      evidence: "ACR/NKF: metformin does not increase the risk of contrast-associated kidney injury, and the risk of contrast-induced injury at eGFR 30 to 59 is sufficiently low. ACR Manual: no reports of lactic acidosis after intravenous iodinated contrast in patients properly selected for metformin. The FDA text was not read directly.",
      sources: ["acr-nkf-2020", "acr-manual-contrast", "esur-2026", "esur-2018-pcaki"],
    },
    {
      name: "Stopping metformin for every contrast scan (EANM PET-CT guideline)",
      differs: "The EANM FDG PET/CT procedure guideline (2015) stops metformin at the time of any intravenous contrast and withholds it for 48 hours, restarting without a kidney test when nephrotoxicity risk is low and only after renal function has been found normal when it is high (it counts a creatinine above 1.5 mg/dL or a glomerular filtration below 60 mL/min as high risk). ESUR stops it only below eGFR 30, in acute kidney injury or with first-pass intra-arterial contrast; ACR/NKF and the ACR Manual only in acute kidney injury or below eGFR 30 (the Manual adds arterial catheter studies that might send emboli to the renal arteries).",
      evidence: "EANM states it as procedure advice without a grade; it predates the 2018 ESUR paper and the 2020 ACR/NKF statements.",
      sources: ["eanm-fdg-2015", "esur-2026", "acr-nkf-2020", "acr-manual-contrast"],
    },
    {
      name: "Restarting metformin: unchanged kidney function (ESUR) or normal kidney function after 48 hours (ACR Manual)",
      differs: "Where metformin is stopped, ESUR measures eGFR within 48 hours and restarts it if renal function has not changed significantly. The ACR Manual withholds it for 48 hours after the procedure and restarts it only after renal function has been re-evaluated and found to be normal. ACR/NKF say it should be withheld and do not give a restart rule.",
      evidence: "ESUR: Level of evidence D (expert opinion). The ACR Manual and ACR/NKF print no grade.",
      sources: ["esur-2018-pcaki", "esur-2026", "acr-manual-contrast", "acr-nkf-2020"],
    },
    {
      name: "Contrast dose: lowest diagnostic dose (ESUR) or standard dose (ACR)",
      differs: "ESUR tells all centres to use the lowest dose of contrast consistent with a diagnostic result. The ACR Manual does not recommend reducing the intravenous dose to lower kidney risk and recommends standard dosing once the benefits are judged to outweigh the risks; ACR/NKF say ad hoc lowering of the dose below a known diagnostic threshold should be avoided.",
      evidence: "ACR Manual: there are no robust data showing a dose-toxicity relationship for intravenous iodinated contrast within the range of clinically administered doses, and a reduced dose may give suboptimal or non-diagnostic images. ESUR's handbook prints no grade or reasoning for its statement.",
      sources: ["esur-2026", "acr-manual-contrast", "acr-nkf-2020"],
    },
    {
      name: "Intravenous fluid regimens: ESUR and ACR/NKF",
      differs: "ESUR prints two regimens for intravenous contrast: bicarbonate 1.4% at 3 ml/kg/h for 1 hour before, or saline 0.9% at 1 ml/kg/h for 3 to 4 hours before and 4 to 6 hours after. ACR/NKF prefer normal saline (bicarbonate is likely similar but needs pharmacist compounding) and describe typical regimens that begin 1 hour before and continue 3 to 12 hours after contrast, with doses from fixed (for example 500 mL before and after) to weight-based (1 to 3 mL/kg per hour). ACR/NKF also allow prophylaxis to be considered at an eGFR of 30 to 44 in individual high-risk circumstances; ESUR does not.",
      evidence: "ESUR: Level of evidence D for the regimens, with no consensus on the optimal regime. ACR/NKF: the ideal timing, volume and rate are uncertain; longer regimens (about 12 hours) have been shown to lower the risk compared with shorter ones but are generally impractical for outpatients.",
      sources: ["esur-2018-pcaki", "esur-2026", "acr-nkf-2020"],
    },
  ],
  grades: [
    { claim: "Preventive hydration in at-risk patients", grade: "Level of evidence B", source: "esur-2018-pcaki" },
    { claim: "Intravenous saline and bicarbonate are equally effective", grade: "Level of evidence A", source: "esur-2018-pcaki" },
    { claim: "Oral hydration alone is not recommended", grade: "Level of evidence D", source: "esur-2018-pcaki" },
    { claim: "ACE inhibitors and ARBs need not be stopped", grade: "Level of evidence B", source: "esur-2018-pcaki", quote: "ACE inhibitors and angiotensin receptor blockers do not have to be stopped before CM administration." },
    { claim: "Insufficient evidence to withhold nephrotoxic drugs, including chemotherapy, before contrast", grade: "Level of evidence C", source: "esur-2018-pcaki" },
    { claim: "Stop metformin from the time of contrast when eGFR is below 30, in acute kidney injury or with first-pass intra-arterial contrast; measure eGFR within 48 hours and restart if renal function has not changed significantly", grade: "Level of evidence D", source: "esur-2018-pcaki" },
    { claim: "The intravenous fluid regimens (bicarbonate 1.4% 3 ml/kg/h for 1 hour before, or saline 0.9% 1 ml/kg/h for 3 to 4 hours before and 4 to 6 hours after)", grade: "Level of evidence D", source: "esur-2018-pcaki" },
    { claim: "Individualise intravenous hydration in severe heart failure (NYHA grade 3 to 4) or end-stage renal failure", grade: "Level of evidence D", source: "esur-2018-pcaki" },
    { claim: "N-acetylcysteine is not recommended (the statement is scoped to eGFR below 45; its unit breaks in the raw text, so it is not quoted)", grade: "Level of evidence A", source: "esur-2018-pcaki" },
    { claim: "Short-term high-dose statins in people not already taking statins are not recommended (scoped to eGFR below 45; not quoted for the same reason)", grade: "Level of evidence B", source: "esur-2018-pcaki" },
    { claim: "Vitamin C is not recommended", grade: "Level of evidence B", source: "esur-2018-pcaki" },
    { claim: "Prophylactic renal replacement therapy is not recommended", grade: "Level of evidence B", source: "esur-2018-pcaki", quote: "Renal replacement therapy has not been shown conclusively to reduce the risk of PC-AKI in patients receiving intravenous or intra-arterial CM, and its use is NOT recommended." },
    { claim: "In chronic kidney disease, minimise nephrotoxic drugs", grade: "Level of evidence D", source: "esur-2018-pcaki", quote: "In CKD patients receiving CM, optimal nephrologic care involves minimising the use of nephrotoxic drugs." },
    { claim: "Prophylaxis is indicated in acute kidney injury or eGFR below 30 (not on maintenance dialysis), may be considered at 30 to 44 in high-risk circumstances, and when it is indicated normal saline is the preferred fluid", grade: "Consensus statement (ungraded)", source: "acr-nkf-2020", quote: "When prophylaxis is indicated, isotonic volume expansion with normal saline is the preferred method." },
    { claim: "Contrast needed for a life-threatening diagnosis should not be withheld on kidney function", grade: "Consensus statement (ungraded)", source: "acr-nkf-2020", quote: "If contrast media administration is required for a life-threatening diagnosis, then it should not be withheld based on kidney function." },
    { claim: "Metformin does not increase the risk of contrast-associated kidney injury", grade: "Consensus statement (ungraded)", source: "acr-nkf-2020", quote: "Metformin does not increase risk of CA-AKI." },
    { claim: "Encourage oral hydration before and after intravenous contrast in adults at increased risk", grade: "[2019]", source: "nice-ng148", quote: "Encourage oral hydration before and after procedures using intravenous iodine-based contrast media in adults at increased risk of contrast-associated acute kidney injury" },
    { claim: "For inpatients at particularly high risk, consider intravenous isotonic bicarbonate or 0.9% saline", grade: "[2019]", source: "nice-ng148", quote: "For inpatients having iodine-based contrast media, consider intravenous volume expansion with either isotonic sodium bicarbonate or 0.9% sodium chloride if they are at particularly high risk, for example, if:" },
    { claim: "Consider temporarily stopping ACE inhibitors and ARBs when eGFR is below 30 (the unit after the figure breaks in the raw text and is left out of the quote)", grade: "[2013, amended 2024]", source: "nice-ng148", quote: "Consider temporarily stopping ACE inhibitors and ARBs in adults having iodine-based contrast media if they have chronic kidney disease with an eGFR less than 30" },
    { claim: "Do not test for Bence Jones protein before contrast in myeloma", grade: "ungraded (handbook)", source: "esur-2026", quote: "Assessment for Bence Jones proteinuria before contrast medium administration is not recommended." },
    { claim: "Do not reduce the intravenous contrast dose to lower kidney risk", grade: "ungraded (manual)", source: "acr-manual-contrast", quote: "Therefore, it is not recommended to reduce doses to attempt to mitigate the risk of CI-AKI as this may result in suboptimal or nondiagnostic images." },
    { claim: "Withhold metformin for 48 hours in acute kidney injury or severe chronic kidney disease and restart only after renal function is found to be normal", grade: "ungraded (manual)", source: "acr-manual-contrast", quote: "In patients taking metformin who are known to have acute kidney injury or severe chronic kidney disease (stage IV or stage V; i.e., eGFR< 30), or are undergoing arterial catheter studies that might result in emboli (atheromatous or other) to the renal arteries, metformin should be temporarily discontinued at the time of or prior to the procedure and withheld for 48 hours subsequent to the procedure and reinstituted only after renal function has been re-evaluated and found to be normal." },
    { claim: "Multiple myeloma is not supported as a risk factor", grade: "ungraded (manual)", source: "acr-manual-contrast", quote: "In particular, multiple myeloma is not supported as a risk factor for CA-AKI" },
    { claim: "Stop non-essential nephrotoxic drugs when feasible at eGFR below 30 or in acute kidney injury (the sentence carries a broken unit in the raw text and is not quoted)", grade: "Consensus statement (ungraded)", source: "acr-nkf-2020" },
  ],
  sources: [
    {
      key: "esur-2026",
      label: "Contrast Media Safety Committee Guidelines 2026 (follows version 10 of the ESUR guidelines on contrast agents)",
      publisher: "European Society of Urogenital Radiology (ESUR) Contrast Media Safety Committee",
      year: 2026,
      url: "https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf",
      gradingScheme: "The handbook prints no grades; it summarises the committee's published guidelines, whose levels of evidence are given in the papers behind them.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esur-2018-pcaki",
      label: "Post-contrast acute kidney injury. Part 2: risk stratification, role of hydration and other prophylactic measures, patients taking metformin and chronic dialysis patients",
      publisher: "ESUR Contrast Media Safety Committee (van der Molen et al., European Radiology)",
      year: 2018,
      url: "https://doi.org/10.1007/s00330-017-5247-4",
      doi: "10.1007/s00330-017-5247-4",
      gradingScheme: "Oxford Centre for Evidence Based Medicine levels: A established scientific evidence, B scientific presumption, C low level of evidence, D expert opinion (working group consensus), printed as 'Level of evidence A' to 'D'.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acr-nkf-2020",
      label: "Use of Intravenous Iodinated Contrast Media in Patients With Kidney Disease: Consensus Statements from the American College of Radiology and the National Kidney Foundation",
      publisher: "American College of Radiology and National Kidney Foundation (Davenport et al., Kidney Medicine; also published in Radiology, 10.1148/radiol.2019192094)",
      year: 2020,
      url: "https://doi.org/10.1016/j.xkme.2020.01.001",
      doi: "10.1016/j.xkme.2020.01.001",
      gradingScheme: "Consensus statements without formal grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng148",
      label: "Acute kidney injury: prevention, detection and management (NG148), recommendations (published 18 December 2019, last updated 16 October 2024)",
      publisher: "NICE",
      year: 2024,
      url: "https://www.nice.org.uk/guidance/ng148/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2013], [2019], [2024]).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eanm-fdg-2015",
      label: "FDG PET/CT: EANM procedure guidelines for tumour imaging: version 2.0 (contrast and metformin section)",
      publisher: "European Association of Nuclear Medicine (Boellaard et al., European Journal of Nuclear Medicine and Molecular Imaging)",
      year: 2015,
      url: "https://doi.org/10.1007/s00259-014-2961-x",
      doi: "10.1007/s00259-014-2961-x",
      gradingScheme: "Procedure guideline; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acr-manual-contrast",
      label: "ACR Manual on Contrast Media, 2026 edition: chapters on fasting, post-contrast acute kidney injury (harmonised with the ACR/NKF statements in 2021) and metformin",
      publisher: "American College of Radiology, Committee on Drugs and Contrast Media",
      year: 2026,
      url: "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual",
      gradingScheme: "The manual prints no grades; it describes itself as a consensus of scientific evidence and clinical experience.",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  technologies: ["iodinated-contrast-media", "ct"],
  cancers: ["multiple-myeloma"],
  related: ["contrast-reaction-history-and-premedication"],
  upgrades: ["idea-pu-contrast-ct-screening-questions", "idea-pu-no-fasting-before-contrast"],
  gaps: [
    "ESUR lists its guidelines on preventing contrast-associated kidney injury and on metformin as being updated; the 2026 handbook still carries the 2018 recommendations, and the levels of evidence quoted come from the 2018 paper. On 17 November 2026 no newer ESUR paper on either subject was found in Europe PMC or Crossref.",
    "The ACR Manual on Contrast Media could not be read when this page was first written. Its 2026 edition was fetched as a PDF on 16 November 2026 and its chapters on fasting, kidney injury and metformin were read for the second pass. Its metformin chapter records minor revisions in 2014 and a footnote updated in 2016.",
    "The sources do not agree on contrast dose, on when metformin restarts, on how recent an eGFR must be, on oral fluids, on ACE inhibitors and ARBs, or on other nephrotoxic drugs. The page gives each position rather than choosing.",
    "ESUR's metformin rule is written for an eGFR above 30 and below 30 and does not say what to do at exactly 30; the ACR Manual puts 30 and above in the group that continues.",
    "The risk of kidney injury caused by the contrast itself, as distinct from injury that happens around the same time for other reasons, is uncertain below eGFR 30; ACR/NKF report estimates from 0% to 17% from observational studies and no randomised trial separating the two.",
    "The best timing, volume and rate of intravenous fluid is uncertain (ACR/NKF); the ESUR regimens are expert opinion (Level D), and ESUR notes that the trials included few people with an eGFR below 30.",
    "No source read addresses people having contrast during chemotherapy that is itself nephrotoxic (cisplatin, high-dose methotrexate) beyond ESUR's finding of insufficient evidence to withhold such drugs and the ACR/NKF advice to stop non-essential nephrotoxic drugs when feasible.",
    "The FDA metformin advice was not read directly; its position is as reported by ACR/NKF and the ACR Manual. On 17 November 2026 the FDA address cited by ACR/NKF answered 404.",
    "Part 1 of the 2018 ESUR paper, which sets the eGFR thresholds and the timing of eGFR measurement, and NICE's evidence review B were not read; those figures are given as the ESUR handbook and the NICE recommendations print them.",
  ],
});
