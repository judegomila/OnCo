import { protocol } from "./helpers";

/*
 * Stopping and restarting blood thinners (anticoagulants and antiplatelets) around cancer surgery, biopsies and
 * endoscopic procedures, including whether to "bridge" with heparin.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - BSG and ESGE guideline, Endoscopy in patients on antiplatelet or anticoagulant therapy (Veitch et al., Gut 2021):
 *   full text, Europe PMC XML (PMC8355884). GRADE strength and quality printed after each recommendation. The newest
 *   edition found in Europe PMC (searched 2022 to 2026).
 * - American College of Chest Physicians guideline, Perioperative Management of Antithrombotic Therapy (Douketis et
 *   al., CHEST 2022): abstract only. The journal site refused a script (403) and there is no open copy in PMC.
 * - BRIDGE trial (Douketis et al., NEJM 2015) and PAUSE cohort (Douketis et al., JAMA Intern Med 2019): abstracts from
 *   Europe PMC; the PMC full texts could not be downloaded (the publisher does not allow XML download).
 * - ASH 2018 guideline on optimal management of anticoagulation therapy (Witt et al., Blood Adv 2018): abstract only,
 *   same reason.
 * - SIR 2019 consensus guidelines for image-guided procedures (Patel et al., JVIR 2019), CIRSE 2021 standards of
 *   practice (Cardiovasc Intervent Radiol), BSH 2016 guideline, NICE CKS and the ACC/AHA perioperative guideline: not
 *   reachable (publisher 403 or bot check, no abstract in Europe PMC for SIR); named in gaps, no step rests on them.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const antithromboticInterruptionAroundSurgery = protocol({
  id: "antithrombotic-interruption-around-surgery",
  name: "Blood thinners around cancer surgery, biopsy and endoscopy: when to stop, whether to bridge, when to restart",
  aka: ["perioperative anticoagulation management", "bridging anticoagulation", "heparin bridging", "stopping warfarin before surgery", "stopping DOAC before surgery", "periprocedural antithrombotic management", "stopping clopidogrel before biopsy"],
  domain: "surgery-perioperative",
  tldr: "If you take a blood thinner and need an operation, biopsy or endoscopy, your team will make a written plan saying exactly when to take your last dose and when to restart. Aspirin is often continued. Warfarin is usually stopped five days before, and the newer tablets (apixaban, rivaroxaban, edoxaban, dabigatran) one to three days before. Most people do not need heparin injections in the gap.",
  simple: "Do not stop or change a blood thinner on your own before a procedure. Ask for a written plan with the date of your last dose and the date to restart, and bring the list of all your medicines.",
  summary: "The CHEST 2022 guideline (44 recommendations, GRADE) makes two strong recommendations: against heparin bridging in atrial fibrillation, and to continue a vitamin K antagonist for pacemaker or defibrillator implantation; the rest are conditional, and the panel states that most perioperative questions remain uncertain. BRIDGE (n=1884, AF, warfarin) found no bridging noninferior for arterial thromboembolism (0.4% vs 0.3%) with less major bleeding (1.3% vs 3.2%). PAUSE (n=3007, AF, apixaban, dabigatran, rivaroxaban) omitted the DOAC 1 day before a low-bleeding-risk and 2 days before a high-bleeding-risk procedure, resumed 1 day or 2 to 3 days after, without bridging or coagulation testing, with low rates of bleeding and stroke. ASH 2018 recommends strongly against periprocedural LMWH bridging for people on anticoagulation for VTE. For endoscopy, BSG/ESGE 2021 continue aspirin for all procedures (strong, low), continue P2Y12 inhibitors and warfarin for low-risk procedures, stop P2Y12 inhibitors 7 days and warfarin 5 days before high-risk procedures in people at low thrombotic risk (INR below 1.5), take the last DOAC dose 3 days before a high-risk procedure (5 days for dabigatran with CrCl 30 to 50), and resume up to 2 to 3 days after (strong, moderate). Unlike CHEST, BSG/ESGE still bridge with LMWH for warfarin in high thrombotic risk (mechanical valves, AF with mitral stenosis, VTE within 3 months). Coronary stents: liaise with a cardiologist before stopping a P2Y12 inhibitor.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "surgical-team", "anaesthetist", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults on long-term warfarin, a direct oral anticoagulant (apixaban, rivaroxaban, edoxaban, dabigatran) or an antiplatelet (aspirin, clopidogrel, prasugrel, ticagrelor) who need elective cancer surgery, a biopsy or an endoscopic procedure. Not for emergency surgery, people with a recent coronary stent without cardiology input, or neuraxial anaesthesia timing, which follows anaesthetic guidance. People on therapeutic LMWH for cancer-associated thrombosis are covered only where a source names LMWH.",
  trigger: "A planned operation, biopsy or endoscopic procedure in someone taking an anticoagulant or antiplatelet.",
  steps: [
    {
      action: "Weigh the bleeding risk of the procedure against the person's clot risk, and explain both to them before deciding",
      why: "Stopping a blood thinner raises the risk of a stroke or clot; continuing it raises the risk of bleeding. The balance differs for each person and each procedure.",
      source: "bsg-esge-2021",
      quote: "We recommend that all patients are advised of the thrombotic risks of discontinuing antiplatelets or anticoagulants, as well as the haemorrhagic risks of continuing therapy (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, low quality evidence",
    },
    {
      action: "Give a written personal plan with the date and time of the last dose of each drug and of the first dose on restarting",
      why: "Mistakes in timing are common when several drugs or injections are involved; a written plan prevents them.",
      source: "bsg-esge-2021",
      quote: "Once the decision to modify antithrombotic medication is made, then a personal plan for that patient should be made. This should include written as well as verbal information regarding the precise timing of any changes.",
      grade: "Not graded (guideline text)",
    },
    {
      action: "Continue aspirin through most procedures; if stopping it is considered, decide case by case",
      why: "Aspirin taken to prevent a second heart attack or stroke protects more than it harms around most procedures.",
      source: "bsg-esge-2021",
      quote: "For all endoscopic procedures we recommend continuing aspirin (strong recommendation, low quality evidence), with the exception of ampullectomy (weak recommendation, low quality evidence).",
      grade: "Strong recommendation, low quality evidence (endoscopy)",
    },
    {
      action: "For a high-bleeding-risk procedure in someone at low clot risk, stop clopidogrel, prasugrel or ticagrelor 7 days before; with a coronary stent, keep aspirin and ask the cardiologist first",
      why: "These drugs affect platelets for about a week; stopping them too soon after a stent can cause the stent to block.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing P2Y12 receptor antagonists 7 days before the procedure (strong recommendation, moderate quality evidence). In patients on DAPT, we recommend continuing aspirin (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, moderate quality evidence",
    },
    {
      action: "For a high-bleeding-risk procedure, stop warfarin 5 days before and check that the INR is below 1.5",
      why: "Warfarin takes several days to wear off; the INR blood test shows when clotting is back to a safe level for surgery.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing warfarin for 5 days before the procedure (strong recommendation, high quality evidence). Check INR prior to the procedure to ensure <1.5 (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, high quality evidence (stop 5 days); strong, low (INR check)",
    },
    {
      action: "Do not bridge with heparin injections in people with atrial fibrillation whose warfarin is paused",
      why: "In a large randomised trial, heparin injections in the gap did not prevent strokes and more than doubled major bleeding.",
      source: "chest-2022",
      quote: "of which two are strong recommendations: (1) against the use of heparin bridging in patients with atrial fibrillation",
      grade: "Strong recommendation (GRADE)",
    },
    {
      action: "Stop a DOAC by the bleeding risk of the procedure and kidney function, without heparin bridging or routine clotting tests: omit 1 day before low-risk and 2 days before high-risk procedures",
      why: "These tablets wear off within a day or two in people with normal kidneys, so a short planned gap is enough.",
      source: "pause-2019",
      quote: "The DOAC regimens were omitted for 1 day before a low-bleeding-risk procedure and 2 days before a high-bleeding-risk procedure.",
      grade: "Prospective cohort study (not a guideline grade)",
    },
    {
      action: "For a high-risk endoscopic procedure, take the last DOAC dose 3 days before (5 days for dabigatran with creatinine clearance 30 to 50 ml/min)",
      why: "The endoscopy guideline counts the gap from the last dose taken, which is the same as missing two full days of tablets.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients on DOACs, we recommend that the last dose of DOACs be taken 3 days before the procedure (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, low quality evidence",
    },
    {
      action: "Restart the blood thinner once bleeding is controlled, usually within 2 to 3 days of the procedure",
      why: "Leaving it off for longer exposes the person to clots; DOACs work within hours of the first dose, warfarin takes days.",
      source: "bsg-esge-2021",
      quote: "If antiplatelet or anticoagulant therapy is discontinued, then we recommend this should be resumed up to 2–3 days after the procedure depending on the perceived haemorrhagic and thrombotic risks (strong recommendation, moderate quality evidence).",
      grade: "Strong recommendation, moderate quality evidence",
    },
  ],
  bestInClass: {
    statement: "For surgery, CHEST 2022 is the most recent full guideline (GRADE): no heparin bridging in atrial fibrillation (strong), on the evidence of BRIDGE, and a pharmacokinetic DOAC interruption schedule without bridging, on the evidence of PAUSE; ASH 2018 recommends strongly against bridging for people on anticoagulation for VTE. For endoscopy and endoscopic biopsy, BSG/ESGE 2021 is the current specialty standard. The two disagree on one point: BSG/ESGE still substitute LMWH for warfarin in people at high thrombotic risk (mechanical heart valves, atrial fibrillation with mitral stenosis or recent stroke, VTE within 3 months), while CHEST's strong recommendation against bridging covers atrial fibrillation; CHEST's position for mechanical valves could not be read beyond its abstract.",
    sources: ["chest-2022", "bridge-2015", "pause-2019", "ash-2018", "bsg-esge-2021"],
  },
  variants: [
    {
      name: "Heparin bridging for warfarin in high thrombotic risk (BSG/ESGE)",
      differs: "Stops warfarin 5 days before, starts a daily therapeutic LMWH dose 2 days later, gives the last LMWH dose at least 24 hours before the procedure and restarts LMWH the day after until the INR is in range.",
      evidence: "A strong recommendation in BSG/ESGE 2021 (the quality of evidence is printed as low in the summary and moderate in the section text) for high-risk endoscopic procedures in people at high thrombotic risk, as defined in its table 3. CHEST 2022 recommends strongly against bridging in atrial fibrillation.",
      sources: ["bsg-esge-2021", "chest-2022"],
    },
    {
      name: "Continuing warfarin or P2Y12 inhibitors for low-risk procedures",
      differs: "Does not stop warfarin (INR checked in the week before, not above range) or clopidogrel for diagnostic endoscopy and biopsy; omits only the morning DOAC dose.",
      evidence: "BSG/ESGE 2021: warfarin continued (weak, low), P2Y12 inhibitors continued (strong, low), morning DOAC dose omitted (weak, low).",
      sources: ["bsg-esge-2021"],
    },
    {
      name: "Longer interruption after very high bleeding risk procedures",
      differs: "Delays restarting antithrombotics for about a week after procedures such as endoscopic submucosal dissection of an early cancer.",
      evidence: "BSG/ESGE 2021 says it 'may be desirable' on the basis of a meta-analysis of post-ESD bleeding; thrombosis was not analysed.",
      sources: ["bsg-esge-2021"],
    },
  ],
  grades: [
    { claim: "Strong recommendations in CHEST 2022", grade: "Two strong of 44; the rest conditional", source: "chest-2022", quote: "A multidisciplinary panel generated 44 guideline recommendations for the perioperative management of VKAs, heparin bridging, DOACs, and antiplatelet drugs, of which two are strong recommendations" },
    { claim: "No bridging is as safe for strokes and causes less bleeding (BRIDGE)", grade: "Randomised, double-blind trial, n=1884", source: "bridge-2015", quote: "The incidence of major bleeding was 1.3% in the no-bridging group and 3.2% in the bridging group (relative risk, 0.41; 95% CI, 0.20 to 0.78; P=0.005 for superiority)." },
    { claim: "No LMWH bridging for people on anticoagulation for VTE", grade: "Strong recommendation (GRADE)", source: "ash-2018", quote: "Strong recommendations included using patient self-management of international normalized ratio (INR) with home point-of-care INR monitoring for vitamin K antagonist therapy and against using periprocedural low-molecular-weight heparin (LMWH) bridging therapy." },
    { claim: "DOAC resumption after the procedure (PAUSE schedule)", grade: "Prospective cohort study", source: "pause-2019", quote: "The DOAC regimens were resumed 1 day after a low-bleeding-risk procedure and 2 to 3 days after a high-bleeding-risk procedure." },
    { claim: "Stents: liaise with an interventional cardiologist before stopping a P2Y12 inhibitor", grade: "Strong recommendation, high quality evidence", source: "bsg-esge-2021", quote: "For high-risk endoscopic procedures in patients at high thrombotic risk, we recommend continuing aspirin and liaising with a consultant interventional cardiologist about the risk/benefit of discontinuing P2Y12 receptor antagonists (strong recommendation, high quality evidence)." },
    { claim: "Uncertainty remains", grade: "Panel statement", source: "chest-2022", quote: "Despite this new knowledge, uncertainty remains as to best practices for the majority of perioperative management questions." },
  ],
  sources: [
    {
      key: "chest-2022",
      label: "Douketis et al., Perioperative Management of Antithrombotic Therapy: an American College of Chest Physicians Clinical Practice Guideline (CHEST 2022)",
      publisher: "American College of Chest Physicians",
      year: 2022,
      url: "https://doi.org/10.1016/j.chest.2022.07.025",
      doi: "10.1016/j.chest.2022.07.025",
      gradingScheme: "GRADE: strong or conditional recommendations; high, moderate, low or very low certainty of evidence.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "bridge-2015",
      label: "Douketis et al., Perioperative Bridging Anticoagulation in Patients with Atrial Fibrillation (BRIDGE, NEJM 2015)",
      publisher: "New England Journal of Medicine",
      year: 2015,
      url: "https://doi.org/10.1056/NEJMoa1501035",
      doi: "10.1056/NEJMoa1501035",
      gradingScheme: "Randomised controlled trial; no recommendation grade.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "pause-2019",
      label: "Douketis et al., Perioperative Management of Patients With Atrial Fibrillation Receiving a Direct Oral Anticoagulant (PAUSE, JAMA Intern Med 2019)",
      publisher: "JAMA Internal Medicine",
      year: 2019,
      url: "https://doi.org/10.1001/jamainternmed.2019.2431",
      doi: "10.1001/jamainternmed.2019.2431",
      gradingScheme: "Prospective management cohort; no recommendation grade.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ash-2018",
      label: "Witt et al., American Society of Hematology 2018 guidelines for management of venous thromboembolism: optimal management of anticoagulation therapy (Blood Adv 2018)",
      publisher: "American Society of Hematology",
      year: 2018,
      url: "https://doi.org/10.1182/bloodadvances.2018024893",
      doi: "10.1182/bloodadvances.2018024893",
      gradingScheme: "GRADE: strong or conditional recommendations.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "bsg-esge-2021",
      label: "Veitch et al., Endoscopy in patients on antiplatelet or anticoagulant therapy: BSG and ESGE guideline update (Gut 2021)",
      publisher: "British Society of Gastroenterology and European Society of Gastrointestinal Endoscopy",
      year: 2021,
      url: "https://doi.org/10.1136/gutjnl-2021-325184",
      doi: "10.1136/gutjnl-2021-325184",
      gradingScheme: "GRADE: strength (strong or weak) and quality of evidence (high, moderate, low, very low), printed after each recommendation.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "sir-2019",
      label: "Patel et al., Society of Interventional Radiology Consensus Guidelines for the Periprocedural Management of Thrombotic and Bleeding Risk in Patients Undergoing Percutaneous Image-Guided Interventions, Part II (JVIR 2019)",
      publisher: "Society of Interventional Radiology",
      year: 2019,
      url: "https://doi.org/10.1016/j.jvir.2019.04.017",
      doi: "10.1016/j.jvir.2019.04.017",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  cancers: [],
  drugs: ["aspirin", "warfarin"],
  technologies: ["cancer-associated-thrombosis"],
  terms: ["biopsy", "core-needle-biopsy"],
  related: ["vte-prophylaxis-after-cancer-surgery", "routine-preoperative-tests", "anticoagulants-and-antiplatelets-before-endoscopy"],
  upgrades: [],
  gaps: [
    "CHEST 2022 could be read only as its abstract: its DOAC intervals, its position on bridging for mechanical heart valves and VTE, and its minor-procedure recommendations are not reproduced here.",
    "The SIR 2019 consensus and CIRSE 2021 standards for image-guided biopsy (the usual route to a cancer diagnosis), the BSH 2016 guideline, NICE CKS and the ACC/AHA perioperative guideline could not be read (publisher or site refused a script); bleeding-risk categories for percutaneous biopsy are therefore not given here.",
    "BRIDGE and PAUSE enrolled people with atrial fibrillation; how far their results apply to people anticoagulated for cancer-associated thrombosis, whose clot risk stays high while the cancer is active, is not settled by these sources.",
    "Timing of anticoagulants around spinal or epidural anaesthesia follows separate anaesthetic guidance not read here.",
  ],
});
