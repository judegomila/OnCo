import { protocol } from "./helpers";

/*
 * Blood thinners (anticoagulants) and antiplatelet drugs around elective endoscopy: diagnostic endoscopy with biopsy,
 * colonoscopy with polypectomy, endoscopic resection, ERCP, endoscopic ultrasound sampling and stenting, all common in
 * the diagnosis and treatment of cancer.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Veitch et al., Endoscopy in patients on antiplatelet or anticoagulant therapy: BSG and ESGE guideline update (Gut
 *   2021; also Endoscopy 2021): full text, Europe PMC XML (PMC8355884). No newer BSG/ESGE edition was found.
 * - Abraham et al., ACG and CAG clinical practice guideline on anticoagulants and antiplatelets during acute GI
 *   bleeding and the periendoscopic period (Am J Gastroenterol 2022): full text, Europe PMC XML (PMC8966740).
 * - Image-guided percutaneous biopsy (the census row's other half): the SIR consensus guidelines (J Vasc Interv Radiol
 *   2019, Part II recommendations) have no abstract in Europe PMC and are paywalled; the CIRSE Standards of Practice
 *   (Cardiovasc Intervent Radiol 2021) are paywalled and their abstract states only their aim. Neither could be read, so
 *   this protocol is limited to endoscopy and image-guided biopsy is named as a gap.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined; the grade in brackets is part of each source's sentence and is repeated in `grade` as printed.
 */
export const anticoagulantsAndAntiplateletsBeforeEndoscopy = protocol({
  id: "anticoagulants-and-antiplatelets-before-endoscopy",
  name: "Anticoagulants and antiplatelet drugs around elective endoscopy and endoscopic biopsy",
  aka: ["stopping blood thinners before endoscopy", "warfarin before colonoscopy", "DOAC before endoscopy", "apixaban before endoscopy", "rivaroxaban before colonoscopy", "clopidogrel before endoscopy", "aspirin before endoscopy", "heparin bridging endoscopy", "antithrombotics and polypectomy"],
  domain: "screening-diagnostics",
  tldr: "If you take a blood thinner or a drug like aspirin or clopidogrel, tell the team well before an endoscopy or colonoscopy. For a simple look with small biopsies most people carry on, perhaps missing one morning dose. For riskier procedures, such as removing polyps, the team will say which drug to stop, for how long, and when to restart. Never stop a heart or clot medicine on your own.",
  simple: "Tell the team about any blood thinner. Usually you keep taking aspirin. For a simple test you may skip one morning dose of some blood thinners. For bigger procedures you may stop for a few days, as the team tells you. Do not stop on your own.",
  summary: "BSG/ESGE 2021 (GRADE) sorts procedures by bleeding risk (low: diagnostic endoscopy with or without biopsy, stenting, EUS without sampling; high: polypectomy, endoscopic resection, ERCP with sphincterotomy, EUS-guided sampling, PEG and others) and patients by thrombotic risk. Everyone is told both the thrombotic risk of stopping and the bleeding risk of continuing (strong, low). Aspirin continues for all procedures except ampullectomy (strong, low). Low-risk procedures: continue P2Y12 inhibitors, single or dual (strong, low); continue warfarin with an INR within range in the week before (weak, low); omit the morning DOAC dose (weak, low). High-risk procedures, low thrombotic risk: stop P2Y12 inhibitors 7 days before (strong, moderate) keeping aspirin; stop warfarin 5 days before with INR below 1.5 (strong, high); last DOAC dose 3 days before (strong, low), 5 days for dabigatran with clearance 30 to 50 ml/min. High thrombotic risk: keep aspirin and discuss P2Y12 interruption with an interventional cardiologist (strong, high); bridge warfarin with LMWH (strong, low). Restart within 2 to 3 days (strong, moderate). ACG-CAG 2022 (GRADE, all conditional) differs: it suggests continuing warfarin for elective endoscopy generally and suggests against heparin bridging when warfarin is held, suggests interrupting DOACs rather than continuing them, suggests not interrupting aspirin for secondary prevention, interrupting the P2Y12 inhibitor but not aspirin on dual therapy, and could not recommend on resumption timing.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults taking an anticoagulant (warfarin, a direct oral anticoagulant, or low molecular weight heparin) or an antiplatelet drug (aspirin, clopidogrel, prasugrel, ticagrelor) who need elective gastrointestinal endoscopy, including people with cancer and cancer-associated thrombosis. Acute GI bleeding is a different setting (both guidelines address it separately). Image-guided percutaneous biopsy (liver, lung, bone, kidney) is not covered: its guidelines could not be read. Children are not covered.",
  trigger: "An elective endoscopy or colonoscopy is booked for someone taking an anticoagulant or antiplatelet drug.",
  steps: [
    {
      action: "When booking, record every anticoagulant and antiplatelet drug, why it is taken, and the planned procedure, and judge both the bleeding risk of the procedure and the clot risk of stopping",
      why: "Whether to stop depends on both: how likely the procedure is to bleed, and how dangerous a pause is for the heart or a clot.",
      source: "bsg-esge-2021",
      quote: "We recommend that all patients are advised of the thrombotic risks of discontinuing antiplatelets or anticoagulants, as well as the haemorrhagic risks of continuing therapy (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Keep taking aspirin for all endoscopic procedures, except ampullectomy",
      why: "Aspirin adds little bleeding risk to endoscopy, and stopping it can trigger a heart attack or stroke.",
      source: "bsg-esge-2021",
      quote: "For all endoscopic procedures we recommend continuing aspirin (strong recommendation, low quality evidence), with the exception of ampullectomy (weak recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "For low-risk procedures such as diagnostic endoscopy with biopsy, continue clopidogrel, prasugrel or ticagrelor",
      why: "Ordinary biopsies rarely bleed enough to matter.",
      source: "bsg-esge-2021",
      quote: "For low-risk endoscopic procedures we recommend continuing P2Y12 receptor antagonists as single or dual antiplatelet therapy (DAPT) (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "For low-risk procedures, continue warfarin and check that the INR has not been above range in the week before",
      why: "Warfarin can be kept going for simple procedures as long as the blood is not thinner than intended.",
      source: "bsg-esge-2021",
      quote: "It should be ensured that the international normalised ratio (INR) does not exceed the therapeutic range in the week prior to the procedure (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "For low-risk procedures on a direct oral anticoagulant (apixaban, rivaroxaban, edoxaban, dabigatran), omit only the morning dose on the day",
      why: "Skipping one dose lowers the drug level at the time of the biopsy without leaving a long gap in protection.",
      source: "bsg-esge-2021",
      quote: "For low-risk endoscopic procedures we suggest omitting the morning dose of direct oral anticoagulants (DOACs) on the day of the procedure (weak recommendation, low quality evidence).",
      grade: "weak recommendation, low quality evidence",
    },
    {
      action: "For high-risk procedures in people at low clot risk, stop clopidogrel, prasugrel or ticagrelor 7 days before, keeping aspirin if on dual therapy",
      why: "These drugs affect platelets for about a week, and procedures such as polyp removal can bleed.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing P2Y12 receptor antagonists 7 days before the procedure (strong recommendation, moderate quality evidence).",
      grade: "strong recommendation, moderate quality evidence",
    },
    {
      action: "For high-risk procedures in people at low clot risk, stop warfarin 5 days before and check the INR is below 1.5",
      why: "Warfarin takes several days to wear off; the INR confirms it has.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing warfarin for 5 days before the procedure (strong recommendation, high quality evidence).",
      grade: "strong recommendation, high quality evidence",
    },
    {
      action: "For high-risk procedures on a direct oral anticoagulant, take the last dose 3 days before (5 days for dabigatran with reduced kidney function), and ask a haematologist if kidney function is falling fast",
      why: "These drugs clear in a few days, faster or slower depending on the kidneys.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients on DOACs, we recommend that the last dose of DOACs be taken 3 days before the procedure (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "For people at high clot risk (recent coronary stents, mechanical heart valves, recent clots), keep aspirin and plan any pause with the cardiologist; bridge warfarin with low molecular weight heparin",
      why: "For them a pause in treatment can cause a stent to block or a clot to form, which may be worse than bleeding.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at high thrombotic risk, we recommend continuing aspirin and liaising with a consultant interventional cardiologist about the risk/benefit of discontinuing P2Y12 receptor antagonists (strong recommendation, high quality evidence).",
      grade: "strong recommendation, high quality evidence",
    },
    {
      action: "Restart any drug that was stopped within 2 to 3 days after the procedure, and tell the person that bleeding afterwards is more likely while on these drugs",
      why: "The longer the pause, the higher the risk of a clot; the timing balances that against bleeding from the site.",
      source: "bsg-esge-2021",
      quote: "If antiplatelet or anticoagulant therapy is discontinued, then we recommend this should be resumed up to 2–3 days after the procedure depending on the perceived haemorrhagic and thrombotic risks (strong recommendation, moderate quality evidence).",
      grade: "strong recommendation, moderate quality evidence",
    },
  ],
  bestInClass: {
    statement: "BSG/ESGE 2021 for UK and European practice: classify the procedure's bleeding risk and the patient's thrombotic risk; continue aspirin; for low-risk procedures continue P2Y12 inhibitors and warfarin (INR in range) and omit the morning DOAC dose; for high-risk procedures at low thrombotic risk stop P2Y12 inhibitors 7 days, warfarin 5 days (INR below 1.5) and DOACs 3 days before; at high thrombotic risk involve cardiology and bridge warfarin; restart within 2 to 3 days. The North American ACG-CAG guideline (2022) disagrees on two points, both on conditional recommendations: it suggests continuing warfarin for elective endoscopy rather than interrupting it, and suggests against heparin bridging when warfarin is held. Both agree on continuing aspirin for secondary prevention and on interrupting DOACs, rather than continuing them, for procedures that need it.",
    sources: ["bsg-esge-2021", "acg-cag-2022"],
  },
  variants: [
    {
      name: "ACG-CAG: continue warfarin and do not bridge",
      differs: "Suggests continuing warfarin for elective endoscopic procedures rather than interrupting it for 1 to 7 days, and, where it is held, suggests against heparin bridging; it excludes patients at high thromboembolic risk, for whom elective procedures should be deferred.",
      evidence: "Conditional recommendations: very low certainty for continuing warfarin, low certainty against bridging. BSG/ESGE itself notes studies showing more post-polypectomy bleeding with LMWH bridging without fewer clots, while still advising bridging for those at high thromboembolic risk.",
      sources: ["acg-cag-2022", "bsg-esge-2021"],
    },
    {
      name: "ACG-CAG: no recommendation on single P2Y12 inhibitor or on restart timing",
      differs: "For patients on a P2Y12 inhibitor alone, ACG-CAG could not recommend for or against interruption, and it could not recommend a time to resume warfarin, a DOAC or a P2Y12 inhibitor (same day versus 1 to 7 days). BSG/ESGE gives 7 days off before high-risk procedures and restart within 2 to 3 days.",
      evidence: "ACG-CAG found one randomised trial and one cohort study for P2Y12 interruption and no comparative studies of resumption timing.",
      sources: ["acg-cag-2022", "bsg-esge-2021"],
    },
  ],
  grades: [
    { claim: "Bridge warfarin with LMWH for high-risk procedures in people at high thrombotic risk", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "For high-risk endoscopic procedures in patients at high thrombotic risk, we recommend that warfarin should be temporarily discontinued and substituted with low molecular weight heparin (LMWH) (strong recommendation, low quality evidence)." },
    { claim: "Check INR below 1.5 before a high-risk procedure after stopping warfarin", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "Check INR prior to the procedure to ensure <1.5 (strong recommendation, low quality evidence)." },
    { claim: "Dabigatran with creatinine clearance 30 to 50 ml/min: last dose 5 days before", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "For patients on dabigatran with a creatinine clearance (CrCl) (or estimated glomerular filtration rate (eGFR)) of 30–50 mL/min we recommend that the last dose be taken 5 days prior to the procedure (strong recommendation, low quality evidence)." },
    { claim: "Continue warfarin rather than interrupt it for elective endoscopy (US and Canada)", grade: "conditional recommendation, very low certainty of evidence", source: "acg-cag-2022", quote: "For patients on warfarin undergoing elective/planned endoscopic GI procedures, we suggest warfarin be continued, as opposed to temporarily interrupted (1–7 days) (conditional recommendation, very low certainty of evidence)." },
    { claim: "No heparin bridging when warfarin is held (US and Canada)", grade: "conditional recommendation, low certainty of evidence", source: "acg-cag-2022", quote: "For patients on warfarin, who hold warfarin in the periprocedural period for elective/planned endoscopic GI procedures, we suggest against bridging anticoagulation (conditional recommendation, low certainty of evidence)." },
    { claim: "Interrupt DOACs rather than continue them (US and Canada)", grade: "conditional recommendation, very low certainty of evidence", source: "acg-cag-2022", quote: "For patients on direct oral anticoagulants (DOACs) who are undergoing elective/planned endoscopic GI procedures, we suggest temporarily interrupting DOACs rather than continuing DOACs (conditional recommendation, very low certainty of evidence)." },
    { claim: "Do not interrupt aspirin for secondary prevention (US and Canada)", grade: "conditional recommendation, very low certainty of evidence", source: "acg-cag-2022", quote: "For patients on ASA 81–325 mg/d (monotherapy) for secondary cardiovascular prevention, we suggest against interruption of ASA (conditional recommendation, very low certainty of evidence)." },
  ],
  sources: [
    {
      key: "bsg-esge-2021",
      label: "Endoscopy in patients on antiplatelet or anticoagulant therapy: British Society of Gastroenterology (BSG) and European Society of Gastrointestinal Endoscopy (ESGE) guideline update",
      publisher: "BSG and ESGE (Veitch et al., Gut; also published in Endoscopy, 10.1055/a-1547-2282)",
      year: 2021,
      url: "https://doi.org/10.1136/gutjnl-2021-325184",
      doi: "10.1136/gutjnl-2021-325184",
      gradingScheme: "GRADE: strong or weak recommendation; high, moderate, low or very low quality evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acg-cag-2022",
      label: "American College of Gastroenterology-Canadian Association of Gastroenterology Clinical Practice Guideline: Management of Anticoagulants and Antiplatelets During Acute Gastrointestinal Bleeding and the Periendoscopic Period",
      publisher: "ACG and CAG (Abraham et al., American Journal of Gastroenterology)",
      year: 2022,
      url: "https://doi.org/10.14309/ajg.0000000000001627",
      doi: "10.14309/ajg.0000000000001627",
      gradingScheme: "GRADE: strong or conditional recommendation; high, moderate, low or very low certainty of evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "sir-2019",
      label: "Society of Interventional Radiology Consensus Guidelines for the Periprocedural Management of Thrombotic and Bleeding Risk in Patients Undergoing Percutaneous Image-Guided Interventions, Part II: Recommendations",
      publisher: "Society of Interventional Radiology (Journal of Vascular and Interventional Radiology)",
      year: 2019,
      url: "https://doi.org/10.1016/j.jvir.2019.04.017",
      doi: "10.1016/j.jvir.2019.04.017",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
    {
      key: "cirse-2021",
      label: "CIRSE Standards of Practice on Peri-operative Anticoagulation Management During Interventional Radiology Procedures",
      publisher: "Cardiovascular and Interventional Radiological Society of Europe (Cardiovascular and Interventional Radiology)",
      year: 2021,
      url: "https://doi.org/10.1007/s00270-020-02763-4",
      doi: "10.1007/s00270-020-02763-4",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["aspirin", "apixaban", "rivaroxaban", "edoxaban", "warfarin"],
  technologies: ["cancer-associated-thrombosis", "endoscopic-resection"],
  terms: ["endoscopy", "colonoscopy", "vte"],
  related: ["antithrombotic-interruption-around-surgery"],
  upgrades: ["idea-pu-lmwh-plan-around-endoscopy"],
  gaps: [
    "Image-guided percutaneous biopsy and other interventional radiology procedures are not covered: the SIR 2019 consensus guidelines (no abstract in Europe PMC, paywalled) and the CIRSE 2021 Standards of Practice (paywalled; abstract states only the aim) could not be read.",
    "Neither guideline read gives specific advice for low molecular weight heparin used to treat cancer-associated thrombosis, which many people with cancer take; BSG/ESGE discusses LMWH only as a bridge for warfarin.",
    "Most recommendations rest on low or very low quality evidence, and the two guidelines disagree on continuing warfarin and on bridging.",
    "Thrombocytopenia from chemotherapy or marrow disease, which also changes bleeding risk, is outside both guidelines.",
  ],
});
