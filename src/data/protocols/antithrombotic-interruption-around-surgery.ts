import { protocol } from "./helpers";

/*
 * Stopping and restarting blood thinners (anticoagulants and antiplatelets) around cancer surgery, biopsies and
 * endoscopic procedures, including whether to "bridge" with heparin.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw with
 * curl into a scratch directory and read as text, and every quote was checked by script (whitespace only normalised).
 * - BSG and ESGE guideline, Endoscopy in patients on antiplatelet or anticoagulant therapy (Veitch et al., Gut 2021):
 *   full text, Europe PMC XML (PMC8355884). GRADE strength and quality printed after each recommendation. Still the
 *   newest edition in Europe PMC (searched 2021 to 2026); it was published in Gut and in Endoscopy at the same time.
 * - BRIDGE trial (Douketis et al., NEJM 2015): now read in full, the author manuscript in PubMed Central (PMC4931686)
 *   through the NCBI E-utilities API. The quoted sentence is from the abstract as Europe PMC prints it.
 * - PAUSE cohort (Douketis et al., JAMA Intern Med 2019): now read in full, the PubMed Central page (PMC6686768). The
 *   schedule figure is an image and was not read. The quotes are the abstract as Europe PMC prints it (PubMed Central
 *   prints the same sentences with a different dash in "low-bleeding-risk").
 * - ASH 2018 guideline on optimal management of anticoagulation therapy (Witt et al., Blood Adv 2018): now read in
 *   full, the PubMed Central page (PMC6258922), including recommendations 14 and 15 and table 4.
 * - American College of Chest Physicians guideline, Perioperative Management of Antithrombotic Therapy (Douketis et
 *   al., CHEST 2022): abstract only, again. The journal site answered a script with a browser check (403) and there is
 *   no open copy. Europe PMC and Crossref list a corrigendum (CHEST, July 2023), which could not be read either.
 * - NHS, Anticoagulant medicines: considerations (page last reviewed 9 September 2024): read in full; it is the
 *   source for the advice to patients not to stop a medicine without being told to.
 * - ESAIC and ESRA joint guideline on regional anaesthesia in patients on antithrombotic drugs (2022): abstract only.
 * - Not reachable on 17 November 2026 (publisher browser check, or UK-only site): SIR 2019, CIRSE 2021, BSH 2016, the
 *   ASRA fifth edition (2025), the ESC 2022 non-cardiac surgery guideline, the AHA/ACC perioperative guidelines and
 *   NICE CKS. They are named in gaps and no step rests on them.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const antithromboticInterruptionAroundSurgery = protocol({
  id: "antithrombotic-interruption-around-surgery",
  name: "Blood thinners around cancer surgery, biopsy and endoscopy: when to stop, whether to bridge, when to restart",
  aka: ["perioperative anticoagulation management", "bridging anticoagulation", "heparin bridging", "stopping warfarin before surgery", "stopping DOAC before surgery", "periprocedural antithrombotic management", "stopping clopidogrel before biopsy"],
  domain: "surgery-perioperative",
  tldr: "If you take a blood thinner and need an operation, biopsy or endoscopy, your team should give you a written plan for when to take your last dose and when to restart. Aspirin is usually continued for endoscopy. Where warfarin has to stop, it is usually five days before; the newer tablets often stop for one or two days. People with atrial fibrillation usually need no heparin injections in the gap.",
  simple: "Only stop a blood thinner before a procedure when a healthcare professional tells you to. Tell the team doing the procedure which blood thinner you take, and ask for a written plan with the date of your last dose and the date to restart.",
  summary: "The CHEST 2022 guideline (44 recommendations, GRADE), read here only as its abstract, makes two strong recommendations: against heparin bridging in atrial fibrillation, and to continue a vitamin K antagonist for pacemaker or defibrillator implantation; the panel states that most perioperative questions remain uncertain. BRIDGE (n=1884, AF, warfarin stopped 5 days before; mechanical valves and stroke within 12 weeks excluded) found no bridging noninferior for arterial thromboembolism (0.4% vs 0.3%) with less major bleeding (1.3% vs 3.2%); major cancer surgery was not represented. PAUSE (n=3007, AF, apixaban, dabigatran, rivaroxaban) omitted the DOAC 1 day before a low-bleeding-risk and 2 days before a high-bleeding-risk procedure (longer for dabigatran with CrCl below 50 mL/min), resumed 1 day or 2 to 3 days after, without bridging or coagulation testing, with low rates of major bleeding and arterial thromboembolism. ASH 2018 recommends against LMWH or UFH bridging when a vitamin K antagonist is interrupted in people at low to moderate risk of recurrent VTE (strong, moderate certainty); its table puts VTE within 3 months at high risk and active cancer at moderate risk. For endoscopy, BSG/ESGE 2021 continue aspirin for all procedures except ampullectomy (strong, low), continue P2Y12 inhibitors and warfarin for low-risk procedures, stop P2Y12 inhibitors 7 days and warfarin 5 days before high-risk procedures in people at low thrombotic risk (INR below 1.5), take the last DOAC dose 3 days before a high-risk procedure (5 days for dabigatran with CrCl 30 to 50 mL/min), and resume up to 2 to 3 days after (strong, moderate). BSG/ESGE bridge with LMWH for warfarin in high thrombotic risk (metal heart valves, some atrial fibrillation, VTE within 3 months). Coronary stents: liaise with an interventional cardiologist before stopping a P2Y12 inhibitor.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "surgical-team", "anaesthetist", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults on long-term warfarin, a direct oral anticoagulant (apixaban, rivaroxaban, edoxaban, dabigatran) or an antiplatelet (aspirin, clopidogrel, prasugrel, ticagrelor) who need elective cancer surgery, a biopsy or an endoscopic procedure. The timed steps come from an endoscopy guideline and from two studies of people with atrial fibrillation; PAUSE did not include edoxaban or people with creatinine clearance below 25 to 30 mL/min. Not for emergency surgery, people with a recent coronary stent without cardiology input, or neuraxial anaesthesia timing, which follows anaesthetic guidance. People on therapeutic LMWH for cancer-associated thrombosis are covered only where a source names LMWH.",
  trigger: "A planned operation, biopsy or endoscopic procedure in someone taking an anticoagulant or antiplatelet.",
  steps: [
    {
      action: "Explain both risks to the person before deciding: the clot risk of stopping the blood thinner and the bleeding risk of continuing it",
      why: "Stopping a blood thinner raises the risk of a stroke or clot; continuing it raises the risk of bleeding. The guideline asks that every patient is told about both.",
      source: "bsg-esge-2021",
      quote: "We recommend that all patients are advised of the thrombotic risks of discontinuing antiplatelets or anticoagulants, as well as the haemorrhagic risks of continuing therapy (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, low quality evidence",
    },
    {
      action: "Give a written personal plan with the time of the last dose of each drug and of the first dose on restarting",
      why: "Where several drugs or heparin injections are involved, the guideline asks that the timing for each one is clearly communicated, in writing as well as aloud.",
      source: "bsg-esge-2021",
      quote: "Once the decision to modify antithrombotic medication is made, then a personal plan for that patient should be made. This should include written as well as verbal information regarding the precise timing of any changes.",
      grade: "Not graded (guideline text)",
    },
    {
      action: "Continue aspirin for endoscopic procedures, except ampullectomy; if stopping it is considered, decide case by case",
      why: "In people taking aspirin after a heart attack or stroke, the guideline reports that stopping it was associated with about three times the risk of another such event.",
      source: "bsg-esge-2021",
      quote: "For all endoscopic procedures we recommend continuing aspirin (strong recommendation, low quality evidence), with the exception of ampullectomy (weak recommendation, low quality evidence).",
      grade: "Strong recommendation, low quality evidence (endoscopy); ampullectomy exception weak, low",
    },
    {
      action: "For a high-bleeding-risk endoscopic procedure in someone at low clot risk, stop clopidogrel, prasugrel or ticagrelor 7 days before and continue aspirin; with a drug-eluting coronary stent placed within 12 months or a bare metal stent within 1 month, continue aspirin and ask the interventional cardiologist before stopping anything",
      why: "For clopidogrel, platelet function returns to normal 5 to 7 days after stopping. Without antiplatelet treatment a coronary stent is at high risk of blocking with a clot.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing P2Y12 receptor antagonists 7 days before the procedure (strong recommendation, moderate quality evidence). In patients on DAPT, we recommend continuing aspirin (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, moderate quality evidence (stop 7 days); strong, low (continue aspirin)",
    },
    {
      action: "For a high-bleeding-risk endoscopic procedure in someone at low clot risk, stop warfarin 5 days before and check before the procedure that the INR is below 1.5",
      why: "Warfarin's effect takes days to wear off; the INR blood test confirms that it has. The BRIDGE trial also stopped warfarin 5 days before the procedure.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing warfarin for 5 days before the procedure (strong recommendation, high quality evidence). Check INR prior to the procedure to ensure <1.5 (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, high quality evidence (stop 5 days); strong, low (INR check)",
    },
    {
      action: "Do not bridge with heparin injections in people with atrial fibrillation whose warfarin is paused",
      why: "In the BRIDGE trial, going without heparin injections was no worse for stroke and other arterial clots (0.4% against 0.3%) and major bleeding was less common (1.3% against 3.2%). The trial did not include people with a mechanical heart valve or a stroke in the previous 12 weeks.",
      source: "chest-2022",
      quote: "of which two are strong recommendations: (1) against the use of heparin bridging in patients with atrial fibrillation",
      grade: "Strong recommendation (GRADE); certainty not printed in the abstract",
    },
    {
      action: "Plan the DOAC gap by the bleeding risk of the procedure and kidney function, without heparin bridging or routine clotting tests: the PAUSE study omitted apixaban, dabigatran or rivaroxaban for 1 day before a low-risk and 2 days before a high-risk procedure, and for longer with dabigatran and creatinine clearance below 50 mL/min",
      why: "PAUSE set the gap by how fast these tablets clear, with half-lives of 10 to 14 hours: one day without tablets is about three half-lives and two days about five. Dabigatran is cleared by the kidneys, so its gap was longer when kidney function was reduced.",
      source: "pause-2019",
      quote: "The DOAC regimens were omitted for 1 day before a low-bleeding-risk procedure and 2 days before a high-bleeding-risk procedure.",
      grade: "Prospective cohort study (not a guideline grade)",
    },
    {
      action: "For a high-risk endoscopic procedure, take the last DOAC dose 3 days before (5 days for dabigatran with creatinine clearance 30 to 50 mL/min); ask a haematologist where kidney function is falling quickly",
      why: "The endoscopy guideline counts from the last dose taken: it describes the PAUSE schedule of two days without tablets as a last dose 3 days before a high-risk procedure.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients on DOACs, we recommend that the last dose of DOACs be taken 3 days before the procedure (strong recommendation, low quality evidence).",
      grade: "Strong recommendation, low quality evidence",
    },
    {
      action: "Restart the blood thinner within 2 to 3 days of the procedure, with the day set by the person's bleeding and clot risks",
      why: "DOACs act within hours of the first dose and warfarin takes days. In the guideline's warfarin schedules the usual dose restarts on the evening of the procedure.",
      source: "bsg-esge-2021",
      quote: "If antiplatelet or anticoagulant therapy is discontinued, then we recommend this should be resumed up to 2–3 days after the procedure depending on the perceived haemorrhagic and thrombotic risks (strong recommendation, moderate quality evidence).",
      grade: "Strong recommendation, moderate quality evidence",
    },
  ],
  bestInClass: {
    statement: "For surgery, CHEST 2022 is the most recent full guideline on this subject that was found (GRADE), but only its abstract could be read: it recommends strongly against heparin bridging in atrial fibrillation, and its DOAC, antiplatelet and valve recommendations are not reproduced here. BRIDGE is the randomised trial on bridging in atrial fibrillation and PAUSE the cohort behind the DOAC schedule given here; both were read in full. ASH 2018 recommends strongly against bridging when a vitamin K antagonist is interrupted in people at low to moderate risk of recurrent VTE, and says this does not apply to people who also have another reason for it, such as a mechanical heart valve. For endoscopy and endoscopic biopsy, BSG/ESGE 2021 is the current specialty standard. The two differ on one point as far as the CHEST abstract shows: BSG/ESGE substitute LMWH for warfarin in people at high thrombotic risk, who in its table include people with atrial fibrillation and mitral stenosis, a stroke or transient ischaemic attack within 3 months, or a prosthetic valve, as well as metal heart valves and VTE within 3 months, while CHEST's strong recommendation against bridging in atrial fibrillation is printed in the abstract without subgroups.",
    sources: ["chest-2022", "bridge-2015", "pause-2019", "ash-2018", "bsg-esge-2021"],
  },
  variants: [
    {
      name: "Heparin bridging for warfarin in high thrombotic risk (BSG/ESGE)",
      differs: "Stops warfarin 5 days before, starts a daily therapeutic LMWH dose 2 days later, gives the last LMWH dose at least 24 hours before the procedure, checks that the INR is below 1.5, resumes warfarin that night and restarts LMWH the day after until the INR is satisfactory.",
      evidence: "A strong recommendation in BSG/ESGE 2021 (the quality of evidence is printed as low in the summary and moderate in the section text) for high-risk endoscopic procedures in people at high thrombotic risk, as defined in its table 3. For a metal aortic valve the guideline follows European cardiology guidance and says practice varies. For VTE within 3 months it adds that most such people now take a DOAC, for which bridging is not recommended, and that deferring a high-risk procedure may be preferable. CHEST 2022 recommends strongly against bridging in atrial fibrillation.",
      sources: ["bsg-esge-2021", "chest-2022"],
    },
    {
      name: "Continuing warfarin or P2Y12 inhibitors for low-risk procedures",
      differs: "Does not stop warfarin (INR checked in the week before, not above range) or a P2Y12 inhibitor for diagnostic endoscopy and biopsy; omits only the morning DOAC dose.",
      evidence: "BSG/ESGE 2021: warfarin continued (weak, low in the summary; the section text prints 'low quality evidence, moderate recommendation'), P2Y12 inhibitors continued (strong, low), morning DOAC dose omitted (weak, low).",
      sources: ["bsg-esge-2021"],
    },
    {
      name: "Longer interruption after very high bleeding risk procedures",
      differs: "Delays restarting antithrombotics beyond the usual 2 to 3 days after procedures such as endoscopic submucosal dissection of an early cancer.",
      evidence: "BSG/ESGE 2021 says it 'may be desirable', on a meta-analysis in which bleeding was not significantly increased when treatment resumed at least 1 week after ESD; thrombosis was not analysed.",
      sources: ["bsg-esge-2021"],
    },
    {
      name: "Preventive-dose heparin after surgery while the DOAC is still paused",
      differs: "Gives a prophylactic (not bridging) dose of heparin after the operation until the DOAC restarts, for people at high risk of venous thromboembolism.",
      evidence: "Allowed in the PAUSE protocol, which otherwise used no heparin bridging; a cohort study, not a guideline recommendation.",
      sources: ["pause-2019"],
    },
  ],
  grades: [
    { claim: "Strong recommendations in CHEST 2022", grade: "Two strong of 44; strong or conditional under GRADE", source: "chest-2022", quote: "A multidisciplinary panel generated 44 guideline recommendations for the perioperative management of VKAs, heparin bridging, DOACs, and antiplatelet drugs, of which two are strong recommendations" },
    { claim: "No bridging is noninferior for arterial clots and causes less major bleeding in atrial fibrillation (BRIDGE)", grade: "Randomised, double-blind trial, n=1884", source: "bridge-2015", quote: "The incidence of major bleeding was 1.3% in the no-bridging group and 3.2% in the bridging group (relative risk, 0.41; 95% CI, 0.20 to 0.78; P=0.005 for superiority)." },
    { claim: "No LMWH or UFH bridging when a vitamin K antagonist is interrupted in people at low to moderate risk of recurrent VTE", grade: "Strong recommendation based on moderate certainty in the evidence", source: "ash-2018", quote: "For patients at low to moderate risk of recurrent VTE who require interruption of VKA therapy for invasive procedures, the ASH guideline panel recommends against periprocedural bridging with LMWH or UHF in favor of interruption of VKA alone" },
    { claim: "No routine laboratory test of DOAC effect before a scheduled procedure", grade: "Conditional recommendation based on very low certainty in the evidence", source: "ash-2018", quote: "For patients interrupting DOAC therapy for scheduled invasive procedures, the ASH guideline panel suggests against performing laboratory testing for DOAC anticoagulant effect prior to procedures" },
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
      accessed: "2026-11-17",
    },
    {
      key: "bridge-2015",
      label: "Douketis et al., Perioperative Bridging Anticoagulation in Patients with Atrial Fibrillation (BRIDGE, NEJM 2015)",
      publisher: "New England Journal of Medicine",
      year: 2015,
      url: "https://doi.org/10.1056/NEJMoa1501035",
      doi: "10.1056/NEJMoa1501035",
      gradingScheme: "Randomised controlled trial; no recommendation grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "pause-2019",
      label: "Douketis et al., Perioperative Management of Patients With Atrial Fibrillation Receiving a Direct Oral Anticoagulant (PAUSE, JAMA Intern Med 2019)",
      publisher: "JAMA Internal Medicine",
      year: 2019,
      url: "https://doi.org/10.1001/jamainternmed.2019.2431",
      doi: "10.1001/jamainternmed.2019.2431",
      gradingScheme: "Prospective management cohort; no recommendation grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ash-2018",
      label: "Witt et al., American Society of Hematology 2018 guidelines for management of venous thromboembolism: optimal management of anticoagulation therapy (Blood Adv 2018)",
      publisher: "American Society of Hematology",
      year: 2018,
      url: "https://doi.org/10.1182/bloodadvances.2018024893",
      doi: "10.1182/bloodadvances.2018024893",
      gradingScheme: "GRADE: strong ('recommends') or conditional ('suggests') recommendations, each printed with the certainty in the evidence (high, moderate, low or very low).",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "nhs-anticoagulants-2024",
      label: "NHS, Anticoagulant medicines: considerations (page last reviewed 9 September 2024)",
      publisher: "NHS",
      year: 2024,
      url: "https://www.nhs.uk/medicines/anticoagulants/considerations/",
      gradingScheme: "Patient information; no recommendation grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esaic-esra-2022",
      label: "Kietaibl et al., Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines (Eur J Anaesthesiol 2022)",
      publisher: "European Society of Anaesthesiology and Intensive Care and European Society of Regional Anaesthesia",
      year: 2022,
      url: "https://doi.org/10.1097/EJA.0000000000001600",
      doi: "10.1097/EJA.0000000000001600",
      gradingScheme: "GRADE, with a Delphi consensus; the abstract says the certainty of evidence was GRADE C throughout.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "asra-2025",
      label: "Kopp et al., Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy: ASRA Evidence-Based Guidelines, fifth edition (Reg Anesth Pain Med, online January 2025)",
      publisher: "American Society of Regional Anesthesia and Pain Medicine",
      year: 2025,
      url: "https://doi.org/10.1136/rapm-2024-105766",
      doi: "10.1136/rapm-2024-105766",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "bsh-2016",
      label: "Keeling et al., Peri-operative management of anticoagulation and antiplatelet therapy (British Society for Haematology guideline, Br J Haematol 2016)",
      publisher: "British Society for Haematology",
      year: 2016,
      url: "https://doi.org/10.1111/bjh.14344",
      doi: "10.1111/bjh.14344",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "esc-2022",
      label: "Halvorsen et al., 2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (Eur Heart J 2022)",
      publisher: "European Society of Cardiology",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac270",
      doi: "10.1093/eurheartj/ehac270",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "sir-2019",
      label: "Patel et al., Society of Interventional Radiology Consensus Guidelines for the Periprocedural Management of Thrombotic and Bleeding Risk in Patients Undergoing Percutaneous Image-Guided Interventions, Part II (JVIR 2019)",
      publisher: "Society of Interventional Radiology",
      year: 2019,
      url: "https://doi.org/10.1016/j.jvir.2019.04.017",
      doi: "10.1016/j.jvir.2019.04.017",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  cancers: [],
  drugs: ["aspirin", "warfarin"],
  technologies: ["cancer-associated-thrombosis"],
  terms: ["biopsy", "core-needle-biopsy"],
  related: ["vte-prophylaxis-after-cancer-surgery", "routine-preoperative-tests", "anticoagulants-and-antiplatelets-before-endoscopy"],
  upgrades: [],
  gaps: [
    "CHEST 2022 could be read only as its abstract, on 11 November and again on 17 November 2026 (the journal site answers a script with a browser check and there is no open copy): its DOAC intervals by drug and kidney function, its aspirin and P2Y12 inhibitor intervals before surgery, its INR advice, its position on bridging for mechanical heart valves and VTE, the certainty printed for each recommendation and its minor-procedure recommendations are not reproduced here. A corrigendum to it was published in CHEST in July 2023 (doi 10.1016/j.chest.2023.05.019) and could not be read either, so what it corrects is not known here.",
    "Because CHEST could not be read, the stopping times on this page for clopidogrel, prasugrel, ticagrelor and warfarin, the INR target of below 1.5 and the last DOAC dose 3 days before come from the BSG/ESGE endoscopy guideline, and the DOAC schedule of one or two days from the PAUSE study of people with atrial fibrillation. No source read here gives stopping times graded for cancer surgery itself.",
    "PAUSE studied apixaban, dabigatran and rivaroxaban, not edoxaban, and left out people with creatinine clearance below 25 mL/min (apixaban) or 30 mL/min (dabigatran, rivaroxaban). Its schedule figure, which holds the exact days for dabigatran with creatinine clearance below 50 mL/min, is an image and was not read; the 5 days given here for dabigatran is the BSG/ESGE recommendation.",
    "BRIDGE enrolled people with atrial fibrillation and excluded those with a mechanical heart valve or a stroke within 12 weeks; its authors say that major surgery with high clot and bleeding rates, including major cancer surgery, was not represented. PAUSE also enrolled only people with atrial fibrillation. How far their results apply to people anticoagulated for cancer-associated thrombosis, whose clot risk stays high while the cancer is active, is not settled by these sources.",
    "The SIR 2019 consensus (Europe PMC also lists a 2022 appendix to it) and the CIRSE 2021 standards for image-guided biopsy, the usual route to a cancer diagnosis, could not be read on 17 November 2026 (publisher browser check); bleeding-risk categories for percutaneous biopsy are therefore not given here.",
    "The British Society for Haematology guideline (Keeling et al., 2016; the society's page gives a last review date of 27 February 2022 and no newer edition was found), the ESC 2022 non-cardiac surgery guideline (corrected in 2023) and the AHA/ACC perioperative guidelines could not be read on 17 November 2026 (publisher browser checks). Crossref lists a 2026 AHA/ACC perioperative guideline (Circulation, September 2026, doi 10.1161/CIR.0000000000001472) as well as the 2024 one. NICE CKS answers only from the UK.",
    "Timing of anticoagulants around spinal or epidural anaesthesia follows separate anaesthetic guidance. The ESAIC/ESRA 2022 joint guideline could be read only as its abstract, which says that specific time intervals apply before and after neuraxial procedures and vary with the drug, the dose and kidney function; the intervals themselves were not read. The ASRA fifth edition (2025) could not be read at all. PAUSE managed the 230 people who had neuraxial anaesthesia as high-bleeding-risk procedures.",
  ],
});
