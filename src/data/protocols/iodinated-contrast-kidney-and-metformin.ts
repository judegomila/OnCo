import { protocol } from "./helpers";

/*
 * Iodinated contrast for CT and other X-ray imaging in adults with cancer: checking kidney function, preventing
 * contrast-associated acute kidney injury, and what to do with metformin.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESUR Contrast Media Safety Committee Guidelines 2026: full text. The PDF linked from esur.org/esur-guidelines-2026/
 *   (uploaded October 2026; its preface is dated November 2025 and says the guidelines are now updated every year,
 *   replacing version 10.0 of 2018) was read with pdftotext. The handbook prints no grades. It lists "Prevention of
 *   CA-AKI" and the metformin guideline among those "currently being updated".
 * - van der Molen et al., Post-contrast acute kidney injury Part 2 (Eur Radiol 2018), the ESUR paper behind those
 *   recommendations: full text, Europe PMC XML (PMC5986837). The levels of evidence quoted come from its tables.
 * - Davenport et al., ACR and National Kidney Foundation consensus statements (Kidney Medicine 2020, the open-access
 *   copy of the Radiology 2020 paper, DOI 10.1148/radiol.2019192094): full text, Europe PMC XML (PMC7525144).
 * - NICE NG148, Acute kidney injury: prevention, detection and management (published December 2019, last updated
 *   16 October 2024): recommendations page, full text (HTML).
 * - EANM FDG PET/CT procedure guideline version 2.0 (2015): full text, Europe PMC XML (PMC4315529), for its stricter
 *   metformin rule, shown as a variant.
 * - ACR Manual on Contrast Media: not reachable. The PDF address served a JavaScript application shell to a script.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined. Where a superscript unit ("m2") breaks in the raw text the quote stops before it and the prose says so.
 */
export const iodinatedContrastKidneyAndMetformin = protocol({
  id: "iodinated-contrast-kidney-and-metformin",
  name: "Iodinated contrast for CT: kidney function checks, kidney protection and metformin",
  aka: ["contrast nephropathy prevention", "contrast-induced nephropathy", "contrast-associated acute kidney injury", "CA-AKI", "PC-AKI", "CT contrast and kidneys", "eGFR before CT", "metformin and contrast", "IV hydration before CT"],
  domain: "screening-diagnostics",
  tldr: "Many cancer scans use a dye containing iodine. If your kidneys work normally the dye is very unlikely to harm them, and you do not need to stop eating or drinking beforehand. If your kidneys are known to be weak, the team checks a recent blood test, may give you fluid through a drip around the scan, and may ask you to pause metformin for two days.",
  simple: "CT scans often use a dye. Tell the team if you have kidney problems or take metformin for diabetes. Most people need nothing special. If your kidneys are weak you may get a drip of fluid and a blood test afterwards. An urgent scan should not be delayed for a blood test.",
  summary: "Risk is judged from the estimated glomerular filtration rate (eGFR). For intravenous contrast the threshold for extra care is an eGFR below 30 ml/min/1.73 m², or acute kidney injury (ESUR 2026, ACR/NKF 2020, NICE NG148 2024); intra-arterial injection with first-pass renal exposure lowers the ESUR threshold to 45. ESUR measures eGFR within 7 days for inpatients or the acutely ill and within 3 months otherwise; NICE uses an eGFR from the past 6 months, or screening questions when there is none, and proceeds without a blood test if the answers are negative and the person is stable. Emergency imaging is not delayed for kidney function (NICE 1.1.7 [2024]; ACR/NKF).\n\nPrevention in at-risk patients is intravenous volume expansion with 0.9% saline or isotonic bicarbonate, which ESUR finds equally effective (Level of evidence A) and recommends for at-risk patients (Level B). ESUR gives regimens (saline 1 ml/kg/h for 3 to 4 hours before and 4 to 6 hours after, or bicarbonate 3 ml/kg/h for 1 hour before; Level D) and does not accept oral fluids alone (Level D); NICE encourages oral hydration for those at increased risk and considers IV fluids for inpatients at particularly high risk. ACR/NKF prefer saline. N-acetylcysteine, statins, vitamin C and prophylactic dialysis are not recommended (ESUR Level A or B). Use low- or iso-osmolar contrast at the lowest diagnostic dose and recheck eGFR at 48 hours in at-risk patients.\n\nThe guidelines differ on ACE inhibitors and angiotensin receptor blockers: ESUR says they need not be stopped (Level B); NICE says consider stopping them temporarily when eGFR is below 30 [2013, amended 2024]. ESUR found insufficient evidence to withhold nephrotoxic chemotherapy before contrast (Level C). Metformin continues unless eGFR is below 30, there is acute kidney injury, or the injection is intra-arterial with first-pass renal exposure; then it stops at the time of contrast and restarts after an eGFR check at 48 hours (ESUR Level D; ACR/NKF agrees at eGFR below 30). People with myeloma and normal kidney function are not at higher risk if well hydrated; Bence Jones testing beforehand is not recommended (ESUR 2026). Fasting before low- or iso-osmolar contrast is not recommended (ESUR 2026).",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "emergency-department"],
  },
  population: "Adults having intravenous iodine-based contrast for CT or other X-ray imaging, including people with cancer, kidney disease, myeloma or diabetes treated with metformin. Intra-arterial injection with first-pass renal exposure (left heart, suprarenal aorta, renal arteries) has a lower threshold and is noted, not detailed. Children (eGFR by the revised Schwartz formula in ESUR), people on dialysis (discussed with the kidney team) and gadolinium contrast for MRI are named where the sources address them; allergy to contrast is a separate protocol.",
  trigger: "A CT or other examination with intravascular iodine-based contrast is requested.",
  steps: [
    {
      action: "When requesting a non-urgent contrast CT, find out whether the person has kidney disease",
      why: "Weak kidneys are the main thing that raises the small risk of kidney injury after contrast.",
      source: "nice-ng148",
      quote: "Before requesting a non-urgent iodine-based contrast media CT scan, assess whether the person has pre-existing kidney disease.",
      grade: "[2024]",
    },
    {
      action: "Use a recent eGFR if there is one; if not, ask the screening questions about kidney disease, kidney specialists and acute illness, and test eGFR only if an answer is yes",
      why: "Most people do not need a fresh blood test; the questions find those who do.",
      source: "nice-ng148",
      quote: "If available, use an eGFR measurement from the past 6 months to support decision making about the use of iodine-based contrast media. If the person has been acutely unwell or clinically unstable since their last eGFR test, consider using a more recent eGFR.",
      grade: "[2024]",
    },
    {
      action: "Do not delay contrast in an emergency to wait for a kidney test",
      why: "When a scan is urgent, missing a diagnosis is a bigger danger than the small risk to the kidneys.",
      source: "nice-ng148",
      quote: "Do not delay the use of iodine-based contrast media in an emergency if the risk of delaying the contrast media is likely to be clinically significant.",
      grade: "[2024]",
    },
    {
      action: "Talk through the benefits and risks of the contrast scan with the person, and consider imaging without iodine contrast if they are at risk",
      why: "For someone with weak kidneys there may be another way to get the answer, and the choice is theirs to share.",
      source: "nice-ng148",
      quote: "Discuss the benefits and risks of tests or treatments that use iodine-based contrast media with the person, and their family members and carers if appropriate.",
      grade: "[2024]",
    },
    {
      action: "For an at-risk person (eGFR below 30 for intravenous contrast, or acute kidney injury), give intravenous fluid around the scan: 0.9% saline or isotonic sodium bicarbonate",
      why: "Fluid through a drip before and after the scan is the one measure shown to lower the risk.",
      source: "esur-2018-pcaki",
      quote: "Preventive hydration should be used to reduce the incidence of PC-AKI in at-risk patients.",
      grade: "Level of evidence B",
    },
    {
      action: "Use either saline 1 ml/kg/h for 3 to 4 hours before and 4 to 6 hours after the contrast, or bicarbonate 1.4% 3 ml/kg/h for 1 hour before; let the referring doctor tailor fluids in severe heart failure or end-stage kidney failure",
      why: "Both fluids work about equally well; too much fluid can be dangerous for a weak heart.",
      source: "esur-2018-pcaki",
      quote: "Intravenous saline and bicarbonate protocols have similar efficacy for hydration.",
      grade: "Level of evidence A",
    },
    {
      action: "Do not rely on drinks alone to protect at-risk kidneys, though drinking freely is encouraged",
      why: "Drinking is sensible but has not been shown to be enough on its own for people at real risk.",
      source: "esur-2018-pcaki",
      quote: "Oral hydration as the sole means of prevention is not recommended.",
      grade: "Level of evidence D",
    },
    {
      action: "Do not give N-acetylcysteine, statins, vitamin C or dialysis to prevent kidney injury from contrast",
      why: "None of them has been shown to protect the kidneys consistently.",
      source: "esur-2026",
      quote: "No pharmacological prophylaxis (with statins, renal vasodilators, receptor antagonists of endogenous vasoactive mediators or cytoprotective drugs, etc.) has been shown to offer consistent protection against CA-AKI.",
    },
    {
      action: "Use a low- or iso-osmolar contrast agent at the lowest dose that gives a diagnostic scan",
      why: "Less contrast, and contrast closer to the body's own concentration, means less strain on the kidneys.",
      source: "esur-2026",
      quote: "Use the lowest dose of contrast medium consistent with a diagnostic result.",
    },
    {
      action: "Do not hold back chemotherapy or other nephrotoxic drugs routinely because of the scan; minimise nephrotoxic drugs in people with chronic kidney disease",
      why: "There is not enough evidence that stopping them for a scan helps, and stopping cancer treatment has its own cost.",
      source: "esur-2018-pcaki",
      quote: "There is insufficient evidence to recommend withholding nephrotoxic drugs such as NSAIDs, antimicrobial agents or chemotherapeutic agents before CM administration.",
      grade: "Level of evidence C",
    },
    {
      action: "If the person takes metformin and has an eGFR below 30, acute kidney injury, or intra-arterial contrast with first-pass renal exposure, stop metformin at the time of contrast and restart it after an eGFR check within 48 hours; otherwise carry on as normal",
      why: "Metformin does not harm the kidneys, but if the kidneys are injured it can build up and cause a rare dangerous acid build-up in the blood.",
      source: "esur-2026",
      quote: "Stop taking metformin from the time of contrast medium administration. Measure eGFR within 48 hours and restart metformin if renal function has not changed significantly.",
    },
    {
      action: "In myeloma, check kidney function and calcium, make sure the person is well hydrated, and do not test for Bence Jones protein just because of the scan",
      why: "Myeloma often affects the kidneys and raises calcium, but with normal kidneys and good hydration the risk is not higher.",
      source: "esur-2026",
      quote: "Multiple myeloma patients with normal renal function are not at increased risk of CA-AKI if they are well hydrated and low- or iso-osmolar iodine-based contrast media are used.",
    },
    {
      action: "For people on dialysis or with a kidney transplant, discuss the scan with the kidney team, without delaying emergency imaging; extra dialysis to clear iodine contrast is not needed",
      why: "Their kidney care is specialised, but dialysis timing does not need to be changed for the dye.",
      source: "nice-ng148",
      quote: "Discuss the person's care with a nephrology team before offering iodine-based contrast media to adults on renal replacement therapy, including people with a renal transplant, but do not delay emergency imaging for this.",
      grade: "[2019]",
    },
    {
      action: "Do not ask people to fast before a scan with modern low- or iso-osmolar contrast",
      why: "Fasting dates from older dyes that made people sick; it is not needed now and can leave people dehydrated.",
      source: "esur-2026",
      quote: "Fasting is not recommended before administration of low- or iso-osmolar non-ionic iodine-based contrast media, gadolinium-based agents or ultrasound contrast agents.",
    },
    {
      action: "In at-risk patients, recheck eGFR 48 hours after the contrast, and follow up for at least 30 days if kidney injury is found",
      why: "Kidney injury from contrast shows up in blood tests over two to three days and needs following until it settles.",
      source: "esur-2026",
      quote: "Determine eGFR 48 hours after contrast medium administration.",
    },
  ],
  bestInClass: {
    statement: "Judge risk from eGFR, with extra care for intravenous contrast only when eGFR is below 30 ml/min/1.73 m² or there is acute kidney injury (ESUR 2026, ACR/NKF 2020, NICE NG148 2024 all draw the line at 30); never delay emergency imaging for a kidney result (NICE [2024]; ACR/NKF: contrast for a life-threatening diagnosis should not be withheld on kidney function). For those at risk, intravenous 0.9% saline or isotonic bicarbonate around the scan (ESUR Level A for equivalence, Level B for use; ACR/NKF prefer saline; NICE considers it for inpatients at particularly high risk), no drug prophylaxis, the lowest diagnostic dose of low- or iso-osmolar contrast, and an eGFR at 48 hours. Metformin is stopped only below eGFR 30, in acute kidney injury or with first-pass intra-arterial contrast (ESUR Level D; ACR/NKF agree at eGFR below 30). The guidelines differ on when an eGFR must have been taken (ESUR: 7 days for inpatients or the acutely ill, 3 months otherwise; NICE: 6 months, or screening questions and no test if they are negative), on oral fluids (NICE encourages them; ESUR rejects them as the only measure) and on ACE inhibitors and ARBs (ESUR: need not be stopped, Level B; NICE: consider stopping when eGFR is below 30).",
    sources: ["esur-2026", "esur-2018-pcaki", "acr-nkf-2020", "nice-ng148"],
  },
  variants: [
    {
      name: "NICE: screening questions instead of a routine blood test",
      differs: "Uses an eGFR from the past 6 months; if there is none, asks whether the person has kidney disease or a transplant, sees a kidney specialist or urologist, or has an acute illness, and proceeds without a blood test if all answers are no and the person is stable (NG148 1.1.9 to 1.1.12, 2024). ESUR offers measuring eGFR in all patients or only in those with a listed history, within 7 days for inpatients and the acutely ill and within 3 months for others.",
      evidence: "NICE's 2024 update rests on its evidence review of eGFR and risk tools for predicting contrast-associated kidney injury (not read here). ESUR's timing is a consensus recommendation.",
      sources: ["nice-ng148", "esur-2026"],
    },
    {
      name: "Stopping ACE inhibitors and ARBs before contrast",
      differs: "NICE recommends considering temporarily stopping ACE inhibitors and angiotensin receptor blockers in adults with chronic kidney disease and an eGFR below 30 having iodine-based contrast (1.2.9, [2013, amended 2024]). ESUR says they do not have to be stopped.",
      evidence: "ESUR: meta-analyses of trials found no lower risk; withholding them may be associated with a slightly lower risk, but not strongly enough to recommend it (Level of evidence B).",
      sources: ["nice-ng148", "esur-2018-pcaki"],
    },
    {
      name: "Oral hydration encouraged (NICE)",
      differs: "NICE encourages oral hydration before and after intravenous contrast in adults at increased risk (1.2.7 [2019]) and reserves intravenous volume expansion for inpatients at particularly high risk (eGFR below 30, a kidney transplant, a large contrast volume, first-pass intra-arterial injection). ESUR supports unrestricted oral fluids only alongside intravenous volume expansion.",
      evidence: "ESUR graded oral hydration as the only preventive measure as not recommended (Level of evidence D).",
      sources: ["nice-ng148", "esur-2018-pcaki"],
    },
    {
      name: "Withholding metformin at eGFR 30 to 59 (US labelling)",
      differs: "The US Food and Drug Administration label advice, as reported by ACR/NKF, withholds metformin before iodinated contrast at eGFR 30 to 59 as well as below 30. ACR/NKF say decisions at 30 to 59 should be individualised by the referring clinician; ESUR continues metformin normally above 30 and notes its advice may differ from EMA and FDA recommendations.",
      evidence: "ACR/NKF: metformin does not raise the risk of contrast-associated kidney injury, and the risk of contrast-induced injury at eGFR 30 to 59 is low. The FDA text was not read directly.",
      sources: ["acr-nkf-2020", "esur-2026", "esur-2018-pcaki"],
    },
    {
      name: "Stopping metformin for every contrast scan (EANM PET-CT guideline)",
      differs: "The EANM FDG PET/CT procedure guideline (2015) stops metformin at the time of any intravenous contrast and withholds it for 48 hours, restarting without a kidney test when nephrotoxicity risk is low and only after a normal result when it is high. ESUR, ACR/NKF and the later ESUR handbook stop it only below eGFR 30, in acute kidney injury or with first-pass intra-arterial contrast.",
      evidence: "EANM states it as procedure advice without a grade; it predates the 2018 ESUR and 2020 ACR/NKF revisions, which rest on metformin not raising the risk of kidney injury.",
      sources: ["eanm-fdg-2015", "esur-2026", "acr-nkf-2020"],
    },
  ],
  grades: [
    { claim: "Preventive hydration in at-risk patients", grade: "Level of evidence B", source: "esur-2018-pcaki" },
    { claim: "Intravenous saline and bicarbonate are equally effective", grade: "Level of evidence A", source: "esur-2018-pcaki" },
    { claim: "Oral hydration alone is not recommended", grade: "Level of evidence D", source: "esur-2018-pcaki" },
    { claim: "ACE inhibitors and ARBs need not be stopped", grade: "Level of evidence B", source: "esur-2018-pcaki", quote: "ACE inhibitors and angiotensin receptor blockers do not have to be stopped before CM administration." },
    { claim: "Insufficient evidence to withhold nephrotoxic drugs, including chemotherapy, before contrast", grade: "Level of evidence C", source: "esur-2018-pcaki" },
    { claim: "Stop metformin at contrast when eGFR is below 30, in acute kidney injury or with first-pass intra-arterial contrast; restart after eGFR at 48 hours", grade: "Level of evidence D", source: "esur-2018-pcaki" },
    { claim: "Prophylaxis is indicated in acute kidney injury or eGFR below 30 (not on maintenance dialysis), may be considered at 30 to 44 in high-risk circumstances, and when given is isotonic normal saline", grade: "Consensus statement (ungraded)", source: "acr-nkf-2020", quote: "When prophylaxis is indicated, isotonic volume expansion with normal saline is the preferred method." },
    { claim: "Contrast needed for a life-threatening diagnosis should not be withheld on kidney function", grade: "Consensus statement (ungraded)", source: "acr-nkf-2020", quote: "If contrast media administration is required for a life-threatening diagnosis, then it should not be withheld based on kidney function." },
    { claim: "Metformin does not increase the risk of contrast-associated kidney injury", grade: "Consensus statement (ungraded)", source: "acr-nkf-2020", quote: "Metformin does not increase risk of CA-AKI." },
    { claim: "Encourage oral hydration before and after intravenous contrast in adults at increased risk", grade: "[2019]", source: "nice-ng148", quote: "Encourage oral hydration before and after procedures using intravenous iodine-based contrast media in adults at increased risk of contrast-associated acute kidney injury" },
    { claim: "For inpatients at particularly high risk, consider intravenous isotonic bicarbonate or 0.9% saline", grade: "[2019]", source: "nice-ng148", quote: "For inpatients having iodine-based contrast media, consider intravenous volume expansion with either isotonic sodium bicarbonate or 0.9% sodium chloride if they are at particularly high risk, for example, if:" },
    { claim: "Consider temporarily stopping ACE inhibitors and ARBs when eGFR is below 30 (the unit after the figure breaks in the raw text and is left out of the quote)", grade: "[2013, amended 2024]", source: "nice-ng148", quote: "Consider temporarily stopping ACE inhibitors and ARBs in adults having iodine-based contrast media if they have chronic kidney disease with an eGFR less than 30" },
    { claim: "Do not test for Bence Jones protein before contrast in myeloma", grade: "ungraded (handbook)", source: "esur-2026", quote: "Assessment for Bence Jones proteinuria before contrast medium administration is not recommended." },
  ],
  sources: [
    {
      key: "esur-2026",
      label: "Contrast Media Safety Committee Guidelines 2026 (successor to ESUR Guidelines on Contrast Agents 10.0)",
      publisher: "European Society of Urogenital Radiology (ESUR) Contrast Media Safety Committee",
      year: 2026,
      url: "https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf",
      gradingScheme: "The handbook prints no grades; it summarises the committee's published guidelines, whose levels of evidence are given in the papers behind them.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng148",
      label: "Acute kidney injury: prevention, detection and management (NG148), recommendations (last updated 16 October 2024)",
      publisher: "NICE",
      year: 2024,
      url: "https://www.nice.org.uk/guidance/ng148/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2013], [2019], [2024]).",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "acr-manual-contrast",
      label: "ACR Manual on Contrast Media",
      publisher: "American College of Radiology",
      year: 2024,
      url: "https://www.acr.org/Clinical-Resources/Contrast-Manual",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["iodinated-contrast-media", "ct"],
  cancers: ["multiple-myeloma"],
  related: ["contrast-reaction-history-and-premedication"],
  upgrades: ["idea-pu-contrast-ct-screening-questions", "idea-pu-no-fasting-before-contrast"],
  gaps: [
    "ESUR lists its guidelines on preventing contrast-associated kidney injury and on metformin as being updated; the 2026 handbook still carries the 2018 recommendations, and the levels of evidence quoted come from the 2018 paper.",
    "The ACR Manual on Contrast Media could not be read: its address served a JavaScript shell to a script. The ACR position is taken from the ACR/NKF consensus paper only.",
    "The risk of kidney injury caused by the contrast itself, as distinct from injury that happens around the same time for other reasons, is uncertain below eGFR 30; ACR/NKF report estimates from 0% to 17% from observational studies and no randomised trial separating the two.",
    "The best timing, volume and rate of intravenous fluid is uncertain (ACR/NKF); the ESUR regimens are expert opinion (Level D).",
    "No source read addresses people having contrast during chemotherapy that is itself nephrotoxic (cisplatin, high-dose methotrexate) beyond ESUR's finding of insufficient evidence to withhold such drugs.",
    "The FDA metformin label was not read directly; its position is as reported by ACR/NKF.",
  ],
});
