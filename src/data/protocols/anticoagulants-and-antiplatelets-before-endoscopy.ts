import { protocol } from "./helpers";

/*
 * Blood thinners (anticoagulants) and antiplatelet drugs around elective endoscopy: diagnostic endoscopy with biopsy,
 * colonoscopy with polypectomy, endoscopic resection, ERCP, endoscopic ultrasound sampling and stenting, all common in
 * the diagnosis and treatment of cancer.
 *
 * What was read, and how (first on 11 November 2026; re-read in full by a second reader on 17 November 2026, fetched
 * raw into a scratch directory and read as text):
 * - Veitch et al., Endoscopy in patients on antiplatelet or anticoagulant therapy: BSG and ESGE guideline update (Gut
 *   2021; also Endoscopy 2021): full text, Europe PMC XML (PMC8355884), tables read with their columns preserved. The
 *   text says it is a scheduled 5-year update of the 2016 guideline and "will be considered for review in 2026"; on
 *   17 November 2026 Europe PMC and Crossref showed no newer BSG/ESGE edition and no correction.
 * - Abraham et al., ACG and CAG clinical practice guideline on anticoagulants and antiplatelets during acute GI
 *   bleeding and the periendoscopic period (Am J Gastroenterol 2022): full text, Europe PMC XML (PMC8966740). Its four
 *   tables are images in the XML and were not read; nothing here rests on them. No newer edition or correction found.
 * - Image-guided percutaneous biopsy (the census row's other half): the SIR consensus guidelines (J Vasc Interv Radiol
 *   2019, Part II recommendations) have no abstract in Europe PMC, and the publisher's free PDF link answered a script
 *   with a browser check on 17 November 2026; the CIRSE Standards of Practice (Cardiovasc Intervent Radiol 2021) are
 *   paywalled and their abstract states only their aim. Neither could be read, so this protocol is limited to
 *   endoscopy and image-guided biopsy is named as a gap.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked (the Crossref record for the Gut DOI was
 * re-used from a sibling checker's copy fetched the same day). Quotes are copied from the raw text with line breaks
 * joined and were checked verbatim by script on 17 November 2026; the grade in brackets is part of each source's
 * sentence and is repeated in `grade` as printed.
 *
 * Changed on 17 November 2026: continuing warfarin for low-risk procedures now carries its own grade (weak), not the
 * grade of the INR check beside it; the high-risk warfarin bridging plan has its own step; the ACG-CAG position is
 * stated with its own exceptions (advanced procedures, who may still be bridged) and its DOAC interval; a recent
 * clot is no longer listed as a reason to bridge without the guideline's caveat.
 */
export const anticoagulantsAndAntiplateletsBeforeEndoscopy = protocol({
  id: "anticoagulants-and-antiplatelets-before-endoscopy",
  name: "Anticoagulants and antiplatelet drugs around elective endoscopy and endoscopic biopsy",
  aka: ["stopping blood thinners before endoscopy", "warfarin before colonoscopy", "DOAC before endoscopy", "apixaban before endoscopy", "rivaroxaban before colonoscopy", "clopidogrel before endoscopy", "aspirin before endoscopy", "heparin bridging endoscopy", "antithrombotics and polypectomy"],
  domain: "screening-diagnostics",
  tldr: "If you take a blood thinner or a drug like aspirin or clopidogrel, tell the team before an endoscopy or colonoscopy. For a simple look with small biopsies most people carry on, perhaps missing one morning dose. For riskier procedures, such as removing polyps, the team will say which drug to stop, for how long, and when to restart. Stopping can raise the risk of a clot, so agree the plan first.",
  simple: "Tell the team about any blood thinner. Usually you keep taking aspirin. For a simple test you may skip one morning dose of some blood thinners. For bigger procedures you may stop for a few days, as the team tells you. Stopping can cause a clot, so agree the plan with the team first.",
  summary: "BSG/ESGE 2021 (GRADE) sorts procedures by bleeding risk (low: diagnostic endoscopy with or without biopsy, stenting, EUS without sampling; high: polypectomy, endoscopic resection, ERCP with sphincterotomy, dilatation, EUS-guided sampling, PEG and others) and patients by thrombotic risk. Everyone is told both the thrombotic risk of stopping and the bleeding risk of continuing (strong, low). Aspirin continues for all procedures (strong, low) except ampullectomy (weak, low). Low-risk procedures: continue P2Y12 inhibitors, single or dual (strong, low); continue warfarin (weak, low), ensuring the INR has not exceeded the therapeutic range in the week before (strong, low); omit the morning DOAC dose (weak, low). High-risk procedures, low thrombotic risk: stop P2Y12 inhibitors 7 days before (strong, moderate), keeping aspirin; stop warfarin 5 days before (strong, high) and check the INR is below 1.5 (strong, low), restarting the usual dose that night; last DOAC dose 3 days before (strong, low), 5 days for dabigatran with creatinine clearance 30 to 50 mL/min. High thrombotic risk: keep aspirin and discuss P2Y12 interruption with an interventional cardiologist (strong, high); replace warfarin with LMWH (strong, low in the summary; the body prints moderate). Resume up to 2 to 3 days after the procedure (strong, moderate). ACG-CAG 2022 (GRADE, all conditional) differs: it suggests continuing warfarin unless the procedure is an advanced one, where 5 days off without bridging would be appropriate; suggests against bridging, while allowing it may be appropriate with mechanical valves; suggests interrupting DOACs, for 1 to 2 days; suggests not interrupting aspirin for secondary prevention; on dual therapy suggests interrupting the P2Y12 inhibitor but not aspirin; and could not recommend on resumption timing. It excludes people at high thromboembolic risk, whose elective procedures it says should be deferred.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults taking an anticoagulant (warfarin or a direct oral anticoagulant) or an antiplatelet drug (aspirin, clopidogrel, prasugrel, ticagrelor) who need elective gastrointestinal endoscopy. Neither guideline is specific to cancer, and neither gives advice for people taking low molecular weight heparin as their treatment. Acute GI bleeding is a different setting (both guidelines address it separately). Image-guided percutaneous biopsy (liver, lung, bone, kidney) is not covered: its guidelines could not be read. Neither guideline addresses children.",
  trigger: "An elective endoscopy or colonoscopy is booked for someone taking an anticoagulant or antiplatelet drug.",
  steps: [
    {
      action: "When booking, record every anticoagulant and antiplatelet drug, why it is taken, and the planned procedure; judge the bleeding risk of the procedure and the clot risk of stopping, and tell the person about both",
      why: "Whether to stop depends on both: how likely the procedure is to bleed, and how dangerous a pause is for the heart or a clot. The guideline asks that the person is told and takes part in the decision.",
      source: "bsg-esge-2021",
      quote: "We recommend that all patients are advised of the thrombotic risks of discontinuing antiplatelets or anticoagulants, as well as the haemorrhagic risks of continuing therapy (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Keep taking aspirin for all endoscopic procedures, except ampullectomy, where stopping it is decided person by person",
      why: "In people taking low-dose aspirin after a heart attack or stroke, stopping it was linked to about three times the risk of another such event.",
      source: "bsg-esge-2021",
      quote: "For all endoscopic procedures we recommend continuing aspirin (strong recommendation, low quality evidence), with the exception of ampullectomy (weak recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence; the ampullectomy exception is weak recommendation, low quality evidence",
    },
    {
      action: "For low-risk procedures such as diagnostic endoscopy with biopsy, continue clopidogrel, prasugrel or ticagrelor",
      why: "Diagnostic endoscopy with small biopsies carries a minimal risk of bleeding.",
      source: "bsg-esge-2021",
      quote: "For low-risk endoscopic procedures we recommend continuing P2Y12 receptor antagonists as single or dual antiplatelet therapy (DAPT) (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "For low-risk procedures, continue warfarin and check the INR in the week before: if it is above the therapeutic range but below 5, reduce the dose until it is back in range; if above 5, defer the endoscopy and ask the anticoagulation clinic",
      why: "Warfarin can be kept going for simple procedures as long as the blood is not thinner than intended.",
      source: "bsg-esge-2021",
      quote: "For low-risk endoscopic procedures we suggest that warfarin therapy should be continued (weak recommendation, low quality evidence).",
      grade: "weak recommendation, low quality evidence",
    },
    {
      action: "For low-risk procedures on a direct oral anticoagulant (apixaban, rivaroxaban, edoxaban, dabigatran), omit only the morning dose on the day",
      why: "The drug level at the time of a biopsy cannot be predicted and there is no reliable test for it, so missing the morning dose leaves a safety margin.",
      source: "bsg-esge-2021",
      quote: "For low-risk endoscopic procedures we suggest omitting the morning dose of direct oral anticoagulants (DOACs) on the day of the procedure (weak recommendation, low quality evidence).",
      grade: "weak recommendation, low quality evidence",
    },
    {
      action: "For high-risk procedures in people at low clot risk, stop clopidogrel, prasugrel or ticagrelor 7 days before, keeping aspirin if on dual therapy",
      why: "After clopidogrel is stopped, platelets take 5 to 7 days to work normally again, and procedures such as polyp removal can bleed.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing P2Y12 receptor antagonists 7 days before the procedure (strong recommendation, moderate quality evidence).",
      grade: "strong recommendation, moderate quality evidence",
    },
    {
      action: "For high-risk procedures in people at low clot risk, stop warfarin 5 days before, check the INR is below 1.5 before the procedure, restart the usual dose that night and check the INR a week later",
      why: "The INR check confirms that the effect of warfarin has worn off enough for the procedure.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at low thrombotic risk, we recommend discontinuing warfarin for 5 days before the procedure (strong recommendation, high quality evidence).",
      grade: "strong recommendation, high quality evidence",
    },
    {
      action: "For high-risk procedures on a direct oral anticoagulant, take the last dose 3 days before (5 days before for dabigatran with a creatinine clearance or eGFR of 30 to 50 mL/min), and ask a haematologist if kidney function is falling fast",
      why: "These drugs have short half-lives, which lengthen when the kidneys work less well, particularly for dabigatran.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients on DOACs, we recommend that the last dose of DOACs be taken 3 days before the procedure (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "For high-risk procedures in people at high clot risk on clopidogrel, prasugrel or ticagrelor (a drug-eluting coronary stent placed within 12 months, or a bare metal stent within 1 month), keep aspirin and agree any pause with an interventional cardiologist",
      why: "Without antiplatelet treatment a coronary stent is at high risk of blocking with a clot, which can cause a heart attack.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at high thrombotic risk, we recommend continuing aspirin and liaising with a consultant interventional cardiologist about the risk/benefit of discontinuing P2Y12 receptor antagonists (strong recommendation, high quality evidence).",
      grade: "strong recommendation, high quality evidence",
    },
    {
      action: "For high-risk procedures in people on warfarin at high clot risk (for example a metal heart valve), stop warfarin 5 days before, start a daily treatment dose of low molecular weight heparin 2 days after stopping, give the last heparin dose at least 24 hours before the procedure, check the INR is below 1.5, restart warfarin that night and heparin the next day, and continue heparin until the INR is satisfactory",
      why: "Heparin is short acting, so it covers the days when warfarin is not working. The guideline adds that people should be told bridging raises the chance of bleeding afterwards.",
      source: "bsg-esge-2021",
      quote: "For high-risk endoscopic procedures in patients at high thrombotic risk, we recommend that warfarin should be temporarily discontinued and substituted with low molecular weight heparin (LMWH) (strong recommendation, low quality evidence).",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Restart any drug that was stopped up to 2 to 3 days after the procedure, depending on the bleeding and clot risks, and tell the person that bleeding afterwards is more likely while on these drugs",
      why: "The timing weighs bleeding from the site against the risk of a clot for that person. Bleeding can come up to two weeks after the procedure, often after the drug has been restarted.",
      source: "bsg-esge-2021",
      quote: "If antiplatelet or anticoagulant therapy is discontinued, then we recommend this should be resumed up to 2–3 days after the procedure depending on the perceived haemorrhagic and thrombotic risks (strong recommendation, moderate quality evidence).",
      grade: "strong recommendation, moderate quality evidence",
    },
  ],
  bestInClass: {
    statement: "BSG/ESGE 2021 for UK and European practice: classify the procedure's bleeding risk and the patient's thrombotic risk; continue aspirin; for low-risk procedures continue P2Y12 inhibitors and warfarin (INR not above range in the week before) and omit the morning DOAC dose; for high-risk procedures at low thrombotic risk stop P2Y12 inhibitors 7 days before, warfarin 5 days before (INR below 1.5) and take the last DOAC dose 3 days before; at high thrombotic risk involve an interventional cardiologist and replace warfarin with LMWH; resume up to 2 to 3 days after. The North American ACG-CAG guideline (2022) differs, on conditional recommendations: it suggests continuing warfarin for elective endoscopy unless the procedure is an advanced one, and suggests against heparin bridging when warfarin is held, while saying bridging may be appropriate for some people, such as those with mechanical valves. BSG/ESGE stops warfarin for all its high-risk procedures, which include polypectomy. Both continue aspirin for secondary prevention and both interrupt DOACs where a pause is needed; ACG-CAG describes 1 to 2 days of interruption, excluding the day of the procedure, and BSG/ESGE a last dose 3 days before a high-risk procedure.",
    sources: ["bsg-esge-2021", "acg-cag-2022"],
  },
  variants: [
    {
      name: "ACG-CAG: continue warfarin and do not bridge",
      differs: "Suggests continuing warfarin for elective endoscopic procedures rather than interrupting it for 1 to 7 days, unless the procedure is an advanced one with a higher bleeding risk, for which it says 5 days of interruption without bridging heparin would be appropriate. Where warfarin is held it suggests against heparin bridging, adding that bridging may be appropriate for people with mechanical valves, atrial fibrillation with a CHADS2 score above 5, or a previous clot during a pause in warfarin. Its recommendations exclude patients at high thromboembolic risk, for whom it says elective procedures should be deferred.",
      evidence: "Conditional recommendations: very low certainty for continuing warfarin, low certainty against bridging. BSG/ESGE itself notes studies showing more post-polypectomy bleeding with LMWH bridging without fewer clots, while still advising bridging for those at high thromboembolic risk.",
      sources: ["acg-cag-2022", "bsg-esge-2021"],
    },
    {
      name: "ACG-CAG: no recommendation on single P2Y12 inhibitor or on restart timing",
      differs: "For patients on a P2Y12 inhibitor alone, ACG-CAG could not recommend for or against interruption, and it could not recommend a time to resume warfarin, a DOAC or a P2Y12 inhibitor (same day versus 1 to 7 days). BSG/ESGE continues a single P2Y12 inhibitor for low-risk procedures, stops it 7 days before high-risk procedures and resumes up to 2 to 3 days after.",
      evidence: "ACG-CAG found one randomised trial and one cohort study for P2Y12 interruption and no studies comparing the resumption times it asked about.",
      sources: ["acg-cag-2022", "bsg-esge-2021"],
    },
    {
      name: "ACG-CAG: a shorter pause for direct oral anticoagulants",
      differs: "ACG-CAG says the DOAC interruption associated with favourable outcomes is between 1 and 2 days, excluding the day of the procedure, without separating procedures by bleeding risk in that statement. BSG/ESGE omits only the morning dose for low-risk procedures and asks for the last dose 3 days before high-risk ones, 5 days for dabigatran with a creatinine clearance of 30 to 50 mL/min.",
      evidence: "ACG-CAG: conditional recommendation, very low certainty, for interrupting rather than continuing; the interval is in its conclusions, not in the graded statement. BSG/ESGE: strong recommendation, low quality evidence, for 3 days; both cite the PAUSE cohort.",
      sources: ["acg-cag-2022", "bsg-esge-2021"],
    },
  ],
  grades: [
    { claim: "For low-risk procedures on warfarin, the INR should not have exceeded the therapeutic range in the week before", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "It should be ensured that the international normalised ratio (INR) does not exceed the therapeutic range in the week prior to the procedure (strong recommendation, low quality evidence)." },
    { claim: "Keep aspirin when a P2Y12 inhibitor is stopped in someone on dual therapy", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "In patients on DAPT, we recommend continuing aspirin (strong recommendation, low quality evidence)." },
    { claim: "Check INR below 1.5 before a high-risk procedure after stopping warfarin", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "Check INR prior to the procedure to ensure <1.5 (strong recommendation, low quality evidence)." },
    { claim: "Dabigatran with creatinine clearance 30 to 50 mL/min: last dose 5 days before", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "For patients on dabigatran with a creatinine clearance (CrCl) (or estimated glomerular filtration rate (eGFR)) of 30–50 mL/min we recommend that the last dose be taken 5 days prior to the procedure (strong recommendation, low quality evidence)." },
    { claim: "Consult a haematologist where kidney function is deteriorating rapidly in someone on a DOAC", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "In any patient with rapidly deteriorating renal function a haematologist should be consulted (strong recommendation, low quality evidence)." },
    { claim: "Tell everyone on these drugs that bleeding after the procedure is more likely", grade: "strong recommendation, low quality evidence", source: "bsg-esge-2021", quote: "For all patients on antiplatelets or anticoagulants we recommend advising that there is an increased risk of post-procedure haemorrhage compared with patients not on these drugs (strong recommendation, low quality evidence)." },
    { claim: "Continue warfarin rather than interrupt it for elective endoscopy (US and Canada)", grade: "conditional recommendation, very low certainty of evidence", source: "acg-cag-2022", quote: "For patients on warfarin undergoing elective/planned endoscopic GI procedures, we suggest warfarin be continued, as opposed to temporarily interrupted (1–7 days) (conditional recommendation, very low certainty of evidence)." },
    { claim: "No heparin bridging when warfarin is held (US and Canada)", grade: "conditional recommendation, low certainty of evidence", source: "acg-cag-2022", quote: "For patients on warfarin, who hold warfarin in the periprocedural period for elective/planned endoscopic GI procedures, we suggest against bridging anticoagulation (conditional recommendation, low certainty of evidence)." },
    { claim: "Interrupt DOACs rather than continue them (US and Canada)", grade: "conditional recommendation, very low certainty of evidence", source: "acg-cag-2022", quote: "For patients on direct oral anticoagulants (DOACs) who are undergoing elective/planned endoscopic GI procedures, we suggest temporarily interrupting DOACs rather than continuing DOACs (conditional recommendation, very low certainty of evidence)." },
    { claim: "On dual antiplatelet therapy, interrupt the P2Y12 inhibitor and continue aspirin (US and Canada)", grade: "conditional recommendation, very low certainty of evidence", source: "acg-cag-2022", quote: "For patients on dual antiplatelet therapy for secondary cardiovascular prevention who are undergoing elective endoscopic GI procedures, we suggest temporary interruption of the P2Y12 inhibitor while continuing ASA (conditional recommendation, very low certainty of evidence)." },
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "sir-2019",
      label: "Society of Interventional Radiology Consensus Guidelines for the Periprocedural Management of Thrombotic and Bleeding Risk in Patients Undergoing Percutaneous Image-Guided Interventions, Part II: Recommendations",
      publisher: "Society of Interventional Radiology (Journal of Vascular and Interventional Radiology)",
      year: 2019,
      url: "https://doi.org/10.1016/j.jvir.2019.04.017",
      doi: "10.1016/j.jvir.2019.04.017",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "cirse-2021",
      label: "CIRSE Standards of Practice on Peri-operative Anticoagulation Management During Interventional Radiology Procedures",
      publisher: "Cardiovascular and Interventional Radiological Society of Europe (Cardiovascular and Interventional Radiology)",
      year: 2021,
      url: "https://doi.org/10.1007/s00270-020-02763-4",
      doi: "10.1007/s00270-020-02763-4",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["aspirin", "apixaban", "rivaroxaban", "edoxaban", "warfarin"],
  technologies: ["cancer-associated-thrombosis", "endoscopic-resection"],
  terms: ["endoscopy", "colonoscopy", "vte"],
  related: ["antithrombotic-interruption-around-surgery"],
  upgrades: ["idea-pu-lmwh-plan-around-endoscopy"],
  gaps: [
    "Image-guided percutaneous biopsy and other interventional radiology procedures are not covered. On 17 November 2026 the SIR 2019 consensus guidelines still could not be read (no abstract in Europe PMC; the publisher's free PDF link answered a script with a browser check), nor could the CIRSE 2021 Standards of Practice (paywalled; abstract states only the aim). Crossref lists a correction to the CIRSE document dated May 2026 (10.1007/s00270-026-04468-6), which also could not be read.",
    "Neither guideline read gives specific advice for low molecular weight heparin used to treat cancer-associated thrombosis, which many people with cancer take; both discuss LMWH only as a bridge for warfarin.",
    "A clot in the last 3 months: BSG/ESGE lists it as high risk, but notes that most such people now take a DOAC, for whom bridging is not recommended, and that it may be preferable to defer a high-risk procedure beyond 3 months of anticoagulation if that is safe. ACG-CAG likewise says elective procedures should be deferred in people within 3 months of a clot. Neither says what to do when a cancer procedure cannot wait.",
    "BSG/ESGE prints two of its grades differently in its summary and in its body. Bridging warfarin with LMWH is strong recommendation, low quality evidence in the summary and moderate quality evidence in the body; continuing warfarin for low-risk procedures is a weak recommendation in the summary and a \"moderate recommendation\" in the body. This page uses the summary's wording.",
    "BSG/ESGE gives 7 days for all three P2Y12 inhibitors and says the time can be shortened depending on the drug, without giving the shorter figures.",
    "The ACG-CAG tables of procedure bleeding risk and of thromboembolic risk are images in the open full text and were not read, so which procedures it counts as advanced is not listed here.",
    "The BSG/ESGE guideline says it would be considered for review in 2026; on 17 November 2026 no newer edition was found in Europe PMC or Crossref. Two other guidelines were found and not read for this page: the ASGE guideline on antithrombotic agents in GI endoscopy (Gastrointestinal Endoscopy, 2016) and the International Digestive Endoscopy Network consensus (2024).",
    "Most recommendations rest on low or very low quality evidence, and the two guidelines differ on continuing warfarin and on bridging.",
    "Thrombocytopenia from chemotherapy or marrow disease, which also changes bleeding risk, is outside both guidelines.",
    "The patient-facing lines telling people to agree the plan before stopping rest on the BSG/ESGE advice that patients are told the thrombotic risk of stopping and given a personal written plan; it also says people should be told how to seek urgent medical advice at any time, without listing symptoms. No source read gives a symptom list or a time limit, so none is given here.",
  ],
});
