import { protocol } from "./helpers";

/*
 * Image-guided needle (core) biopsy of a breast or liver abnormality: preparation, blood thinners, observation and
 * aftercare at home. Lung biopsy has its own record (image-guided-lung-biopsy-preparation-and-aftercare).
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again as raw text
 * and each claim re-read against it; quotes were checked verbatim by script.
 * - Neuberger et al., Guidelines on the use of liver biopsy in clinical practice from the British Society of
 *   Gastroenterology, the Royal College of Radiologists and the Royal College of Pathology (Gut 2020): full text,
 *   Europe PMC XML (PMC7398479), re-read 17 November 2026. DOI resolved through Crossref and Europe PMC; no
 *   correction or newer edition is recorded there. Recommendations print a strength and a level of evidence.
 * - NHS Breast Screening Programme, Clinical guidance for breast cancer screening assessment (gov.uk, updated
 *   22 January 2026): full text (HTML), re-read 17 November 2026. Its flow charts are images and were not read.
 * - NHS, Biopsy (nhs.uk, page last reviewed 11 June 2025): full text (HTML), read 17 November 2026; added in the
 *   second pass for the local anaesthetic and the general warning signs after any biopsy.
 * - SIR consensus guidelines on periprocedural thrombotic and bleeding risk (J Vasc Interv Radiol 2019,
 *   10.1016/j.jvir.2019.04.017): no abstract in Europe PMC and the publisher's PDF answers a script with a browser
 *   check (seen on 17 November 2026 in a copy another checker of this pass had fetched); named, not used.
 * - BTS Guidelines for radiologically guided lung biopsy (Thorax 2003): not reachable on 11 November 2026 and not
 *   retried here, since lung biopsy is outside this record.
 *
 * Corrected in the second pass: grades attached to the wrong recommendation in the summary (the "of 1000 people"
 * wording is MODERATE with weak evidence, the INR 1.5 to 2.0 statement MODERATE with moderate evidence), a platelet
 * quote whose superscript had mangled, reasons in `why` that no source gave, and breast statements (local
 * anaesthetic, B3 management, node sampling) reworded to what the sources print.
 */
export const imageGuidedCoreBiopsyPreparationAndAftercare = protocol({
  id: "image-guided-core-biopsy-preparation-and-aftercare",
  name: "Image-guided core needle biopsy of the breast and liver: preparation and aftercare",
  aka: ["core biopsy", "core needle biopsy", "needle biopsy", "ultrasound-guided biopsy", "breast biopsy", "liver biopsy", "percutaneous liver biopsy", "vacuum-assisted biopsy", "biopsy aftercare", "biopsy marker clip"],
  domain: "screening-diagnostics",
  tldr: "A core biopsy uses a needle, guided by ultrasound or another scan, to take tissue for testing. You will usually have a local anaesthetic to numb the area. In the breast, a marker is sometimes left at the spot. A liver biopsy needs a plan for blood thinners and at least 3 hours of checks afterwards; call the hospital for chills, high fever, trouble breathing, heavy bleeding or severe pain.",
  simple: "A needle takes a small piece of tissue to find out what a lump or patch is. A scan guides the needle. You will usually have a numbing injection. Tell the team if you take blood thinners. After a liver biopsy you stay at least 3 hours to be checked. Call the hospital if you get a high fever, bad pain, bleeding or trouble breathing.",
  summary: "Breast. The NHS Breast Screening Programme assesses significant abnormalities by core or vacuum-assisted biopsy, with ultrasound as the technique of choice for guidance, a permanent image of the needle in the lesion, a marker where the change is hard to see, where there are several lesions or where the biopsy could remove the area, and review of every needle biopsy at the multidisciplinary meeting. Where high quality cytology with immediate reporting is available, fine needle aspiration may be added to core biopsy but not used instead of it. Everyone with a non-operative diagnosis of invasive breast cancer has ultrasound of the armpit on the same side; the most suspicious abnormal node is sampled, by core biopsy in preference to fine needle aspiration where technically possible and safe (NHSBSP 2026). For B3 lesions of uncertain malignant potential, management is decided and documented at the multidisciplinary meeting, which weighs vacuum-assisted excision against diagnostic surgery; all types warrant further histological examination.\n\nLiver (BSG, RCR and RCPath 2020, which states that it applied GRADE). Give information on risks and benefits in advance where possible, verbally and in writing (Strong, high quality evidence), with risks put in the form \"of 1000 people like you\" (Moderate, weak evidence). Use image guidance for focal lesions (Strong, weak evidence). After percutaneous liver biopsy, bleeding occurs in up to 10%, major bleeding in less than 2%, and death in less than 1 in 1000. Anticoagulants and antiplatelets are stopped by table 2 (Strong, weak evidence): warfarin 5 days before, with point-of-care testing before the procedure to confirm reversal; direct oral anticoagulants for 2 days before (longer for dabigatran with renal impairment); low molecular weight heparin 12 hours before at a prophylactic dose and 24 hours before at a higher dose; clopidogrel, prasugrel or ticagrelor 7 days; aspirin 3 to 7 days before elective procedures. On dual antiplatelet therapy the table says always to continue aspirin. A separate recommendation says that stopping aspirin 3 days before should be considered where time allows, depending on why it is taken and how urgent the biopsy is (Moderate, weak evidence). An INR of 1.5 to 2.0 is not a contraindication to a percutaneous targeted biopsy in stable liver disease (Moderate, moderate evidence), fresh frozen plasma should not be used to correct an INR of 2.0 or less (Strong, moderate evidence), and a platelet count below 50 x 10^9/L calls for a transvenous route where possible (Strong, moderate evidence). Monitor for at least 3 hours with regular clinical observations, pulse and blood pressure (Strong, weak evidence). People with a strong suspicion of malignancy should not be biopsied as a day case, because they may have a higher risk of haemorrhage. At discharge: rest for the remainder of the day, no driving or heavy machinery that day, strenuous activity discouraged for 48 hours (on evidence the guideline calls weak), and call the hospital for chills, high fever, difficulty breathing, excessive bright red bleeding from the biopsy site, severe chest, shoulder or abdominal pain, blood in the stool or increasing abdominal swelling.\n\nAny biopsy (NHS, page reviewed June 2025). A local anaesthetic is usual. The NHS advises contacting the healthcare team or NHS 111 for pain that painkillers have not helped or that is getting worse, a high temperature, blood or fluid oozing from the biopsy site, or swelling or redness there.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "radiographer", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "People having an image-guided needle biopsy of a breast or axillary abnormality found at NHS breast screening assessment, or a percutaneous image-guided biopsy of a focal liver lesion. Non-lesional liver biopsy for liver disease and transjugular biopsy are outside scope except where the liver guideline's thresholds send someone to a transvenous route. Children are not separately addressed in the passages used. Lung biopsy has its own record.",
  trigger: "Imaging shows an abnormality that needs a tissue diagnosis, and a core biopsy is planned.",
  steps: [
    {
      action: "Give information about the risks and benefits before the procedure where possible, spoken and backed up in writing or other media, in language the person understands",
      why: "Consent is valid only if it is informed, so the guideline asks for the risks, the benefits and any alternatives to be explained first.",
      source: "bsg-liver-2020",
      quote: "Patients should be given information about the risks and benefits of the procedure, in advance of the procedure where possible",
      grade: "Strength of recommendation STRONG; quality of evidence HIGH",
    },
    {
      action: "Describe risks as numbers out of 1000 people like the patient",
      why: "The guideline says it is better to avoid percentages or rates when giving figures to patients.",
      source: "bsg-liver-2020",
      quote: "Information on risks should be readily understood and the following is recommended ‘of 1000 people like you having a liver biopsy, X will develop (complication)’",
      grade: "Strength of recommendation MODERATE; evidence WEAK",
    },
    {
      action: "Before a liver biopsy, plan each anticoagulant by the guideline's table: warfarin stopped 5 days before, with point-of-care testing before the procedure to confirm it has worn off; a direct oral anticoagulant stopped for 2 days before the day of the biopsy (longer for dabigatran, depending on kidney function)",
      why: "The guideline reports more bleeding after ultrasound-guided abdominal procedures in people taking medicines that affect clotting or platelets. Bridging with heparin is started if judged necessary.",
      source: "bsg-liver-2020",
      quote: "Direct oral anticoagulant drugs should be stopped for 2 days prior to the day of the biopsy or longer if taking dabigatran, depending on the renal function.",
      grade: "Strength of recommendation STRONG; evidence WEAK (table 2)",
    },
    {
      action: "Where time allows, consider stopping aspirin 3 days before a percutaneous liver biopsy, weighing why it is taken and how urgent the biopsy is",
      why: "The guideline says the risks of stopping an antiplatelet drug must be weighed, with consultant advice where appropriate, especially for people with a recent stent.",
      source: "bsg-liver-2020",
      quote: "We recommend that, where time allows, stopping aspirin 3 days prior to percutaneous biopsy should be considered, but the decision will depend on the indications for aspirin and the urgency of the biopsy",
      grade: "Strength of recommendation MODERATE; evidence WEAK",
    },
    {
      action: "Do not give fresh frozen plasma to correct an INR of 2.0 or less before a liver biopsy; if the platelet count is below 50 x 10^9/L, use a transvenous route where possible",
      why: "The guideline finds no evidence that plasma reduces bleeding, and a route through a vein potentially avoids breaching the liver capsule.",
      source: "bsg-liver-2020",
      quote: "We recommend FFP should not be used to correct an INR ≤2.0 prior to liver biopsy",
      grade: "Strength of recommendation STRONG; evidence MODERATE",
    },
    {
      action: "Use image guidance (real-time ultrasound, CT or MRI) to target a focal liver lesion",
      why: "For a focal lesion the guideline calls image guidance a necessity, to place the needle accurately and obtain a relevant sample.",
      source: "bsg-liver-2020",
      quote: "Image-guided liver biopsies should be used for targeting focal lesions or in patients with altered liver anatomy (such as split liver graft or prior liver resection)",
      grade: "Strength of recommendation STRONG; quality of evidence WEAK",
    },
    {
      action: "For a significant breast abnormality, take a core or vacuum-assisted biopsy, with ultrasound as the technique of choice for guidance, and keep a permanent image of the needle in the lesion",
      why: "A wide-bore needle sample shows whether a cancer is invasive, its subtype, its grade and its receptor status, and helps confirm a benign lesion.",
      source: "nhsbsp-assessment-2026",
      quote: "Ultrasound is the technique of choice for guided needle sampling. A permanent record of images showing the biopsy needle in the target lesion should be made.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "Place a marker when the change is hard to see, when there are several lesions, or when the biopsy might remove the area of concern or make it hard to see",
      why: "A marker whose position is confirmed on a mammogram helps make sure the correct lesion is removed at surgery or followed up.",
      source: "nhsbsp-assessment-2026",
      quote: "Marker placing is particularly important to facilitate treatment planning/surgical localisation when there are multiple lesions or when there is any risk that the area of concern could be removed or rendered difficult to see by the biopsy.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "If invasive breast cancer is diagnosed on a needle biopsy, scan the armpit on the same side with ultrasound and sample the most suspicious abnormal node, by core biopsy in preference to fine needle aspiration where that is technically possible and safe",
      why: "Core biopsy of a node is preferred for its better diagnostic accuracy, and the guidance notes that an abnormal-looking node cannot be assumed to be cancer.",
      source: "nhsbsp-assessment-2026",
      quote: "All patients with a non-operative diagnosis of invasive breast cancer should have ipsilateral axillary ultrasound performed, preferably at the time of initial assessment.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "Review every needle biopsy result at the multidisciplinary meeting before deciding what happens next",
      why: "The meeting checks that imaging, clinical findings and pathology agree; if they do not, further action such as a repeat biopsy follows.",
      source: "nhsbsp-assessment-2026",
      quote: "All needle biopsies carried out as part of screening assessment must be reviewed at the multi-disciplinary meeting (MDM), where further management of each case should be agreed and documented.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "After a liver biopsy, monitor for at least 3 hours with regular clinical observations, pulse and blood pressure",
      why: "Regular checks of pulse and blood pressure are made so that a complication is detected early, while the person is still in hospital.",
      source: "bsg-liver-2020",
      quote: "Patients should be monitored for at least 3 hours after liver biopsy with regular clinical observations and measurement of blood pressure and pulse",
      grade: "Strength of recommendation STRONG; evidence WEAK",
    },
    {
      action: "Do not do a liver biopsy as a day case when cancer is strongly suspected",
      why: "The guideline says people with suspected cancer may have a higher risk of bleeding after the biopsy than people without cancer.",
      source: "bsg-liver-2020",
      quote: "Patients with a strong suspicion of malignancy should not be biopsied as a day case because such patients may have a higher risk of haemorrhage than patients without cancer.",
      grade: "Text statement (no separate grade)",
    },
    {
      action: "At discharge, give spoken and written advice: rest for the remainder of the day, no driving that day, no strenuous activity for 48 hours, and who to call for chills, high fever, difficulty breathing, bleeding or severe pain",
      why: "The guideline names bleeding, organ perforation and sepsis among the risks of a percutaneous liver biopsy, and these are the symptoms it tells people to call the hospital about.",
      source: "bsg-liver-2020",
      quote: "If a patient experiences any symptoms such as chills, high fever, difficulty breathing, excessive bright red bleeding from the biopsy site, severe chest, shoulder or abdominal pain, passing blood in the stool or increasing abdominal swelling, then they are instructed to call the hospital.",
      grade: "Text statement (no separate grade)",
    },
  ],
  bestInClass: {
    statement: "For liver core biopsy, the BSG, RCR and RCPath 2020 guideline is the most complete graded standard read: risk information in advance where possible, spoken and written (Strong, high quality evidence), put as numbers out of 1000 (Moderate, weak evidence), image guidance for focal lesions (Strong, weak evidence), a drug-by-drug table for anticoagulants and antiplatelets (Strong, weak evidence), no fresh frozen plasma to correct an INR of 2.0 or less (Strong, moderate evidence), a transvenous route where possible when platelets are below 50 x 10^9/L (Strong, moderate evidence), at least 3 hours of monitoring (Strong, weak evidence), no day-case biopsy when cancer is strongly suspected, and written discharge advice. For breast core biopsy at screening assessment, the NHS Breast Screening Programme guidance (updated January 2026) applies in England: core or vacuum-assisted biopsy with ultrasound as the technique of choice, a marker where needed, axillary ultrasound in invasive cancer and multidisciplinary review of every needle biopsy. It does not address blood thinners or aftercare.",
    sources: ["bsg-liver-2020", "nhsbsp-assessment-2026"],
  },
  variants: [
    {
      name: "Fine needle aspiration cytology instead of core biopsy (breast)",
      differs: "A needle draws out cells for cytology rather than a core of tissue for histology.",
      evidence: "NHSBSP allows it in addition to core biopsy where high quality cytology with immediate reporting is available, and alone only in exceptional cases where core biopsy is not possible. It says wide bore needle biopsy provides information on invasive status, tumour subtype, histological grade and receptor status.",
      sources: ["nhsbsp-assessment-2026"],
    },
    {
      name: "Shorter observation after liver biopsy",
      differs: "Observation for 1 hour rather than at least 3.",
      evidence: "BSG notes one recent study suggesting that 1 hour is enough to recognise all major complications. Its text says monitoring will be up to 8 hours, with 3 hours usually adequate for a low-risk patient with no complications after the biopsy, and its recommendation is at least 3 hours (Strong, weak evidence).",
      sources: ["bsg-liver-2020"],
    },
    {
      name: "Continuing aspirin for urgent liver biopsy",
      differs: "Aspirin is continued rather than paused.",
      evidence: "BSG table 2: for urgent biopsies aspirin can be continued at the discretion of the clinician. The text adds that empirical experience, such as with biopsies after liver transplant, suggests pausing aspirin may not be necessary.",
      sources: ["bsg-liver-2020"],
    },
  ],
  grades: [
    { claim: "Advance risk information, verbal and written", grade: "Strength of recommendation STRONG; quality of evidence HIGH", source: "bsg-liver-2020" },
    { claim: "Risks put as numbers out of 1000 people", grade: "Strength of recommendation MODERATE; evidence WEAK", source: "bsg-liver-2020" },
    { claim: "Image guidance for focal liver lesions", grade: "Strength of recommendation STRONG; quality of evidence WEAK", source: "bsg-liver-2020" },
    { claim: "When to stop anticoagulants and antiplatelet drugs (table 2)", grade: "Strength of recommendation STRONG; evidence WEAK", source: "bsg-liver-2020" },
    { claim: "An INR of 1.5 to 2.0 is not a contraindication to a percutaneous targeted biopsy in stable liver disease", grade: "Strength of recommendation MODERATE; evidence MODERATE", source: "bsg-liver-2020" },
    { claim: "No fresh frozen plasma to correct an INR of 2.0 or less", grade: "Strength of recommendation STRONG; evidence MODERATE", source: "bsg-liver-2020", quote: "We recommend FFP should not be used to correct an INR ≤2.0 prior to liver biopsy" },
    { claim: "Transvenous route where possible when the platelet count is below 50 x 10^9/L", grade: "Strength of recommendation STRONG; evidence MODERATE", source: "bsg-liver-2020" },
    { claim: "Consider stopping aspirin 3 days before percutaneous biopsy where time allows", grade: "Strength of recommendation MODERATE; evidence WEAK", source: "bsg-liver-2020" },
    { claim: "Monitor at least 3 hours after liver biopsy", grade: "Strength of recommendation STRONG; evidence WEAK", source: "bsg-liver-2020" },
    { claim: "Day-case liver biopsy is safe when there are no increased risk factors and the person can get help after leaving", grade: "Strength of recommendation STRONG; evidence WEAK", source: "bsg-liver-2020", quote: "Liver biopsy may be safely done as a day case procedure if there are no increased risk factors and the patient can be looked after when they have left hospital, can seek appropriate advice and access appropriate medical help if needed" },
    { claim: "Risk of bleeding after percutaneous liver biopsy", grade: "Summary statement (ungraded)", source: "bsg-liver-2020", quote: "Bleeding occurs in up to 10% with major bleeding occurring in less than 2%." },
  ],
  sources: [
    {
      key: "bsg-liver-2020",
      label: "Guidelines on the use of liver biopsy in clinical practice from the British Society of Gastroenterology, the Royal College of Radiologists and the Royal College of Pathology",
      publisher: "British Society of Gastroenterology, Royal College of Radiologists and Royal College of Pathologists (Neuberger et al., Gut)",
      year: 2020,
      url: "https://doi.org/10.1136/gutjnl-2020-321299",
      doi: "10.1136/gutjnl-2020-321299",
      gradingScheme: "The guideline states that it applied GRADE. Each recommendation is printed with a strength (STRONG, MODERATE or LOW) and a level of evidence (HIGH, MODERATE, WEAK or LOW); its table 1 defines four levels of certainty, from very low to high.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhsbsp-assessment-2026",
      label: "Clinical guidance for breast cancer screening assessment (updated 22 January 2026)",
      publisher: "NHS England, NHS Breast Screening Programme (gov.uk)",
      year: 2026,
      url: "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment",
      gradingScheme: "Programme guidance; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-biopsy-2025",
      label: "Biopsy (page last reviewed 11 June 2025)",
      publisher: "NHS (nhs.uk)",
      year: 2025,
      url: "https://www.nhs.uk/tests-and-treatments/biopsy/",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bts-lung-biopsy-2003",
      label: "Guidelines for radiologically guided lung biopsy",
      publisher: "British Thoracic Society (Manhire et al., Thorax)",
      year: 2003,
      url: "https://doi.org/10.1136/thorax.58.11.920",
      doi: "10.1136/thorax.58.11.920",
      read: "not-reachable",
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
      accessed: "2026-11-17",
    },
  ],
  technologies: ["vacuum-assisted-breast-biopsy", "ultrasound", "ct"],
  cancers: ["breast-cancer", "hcc"],
  drugs: ["warfarin"],
  terms: ["core-needle-biopsy", "biopsy"],
  related: ["anticoagulants-and-antiplatelets-before-endoscopy", "image-guided-lung-biopsy-preparation-and-aftercare"],
  upgrades: [],
  gaps: [
    "Lung biopsy is not covered here; it has its own record. The British Thoracic Society guideline (2003) could not be read on 11 November 2026 and was not retried for this record.",
    "On 17 November 2026 the SIR 2019 consensus on bleeding risk in image-guided procedures still could not be read: Europe PMC holds no abstract and the publisher's PDF answers a script with a browser check. Nothing on this page rests on it, so any difference between its intervals and thresholds and those of the British liver guideline is not shown.",
    "The liver figures (drug intervals, INR and platelet thresholds, 3 hours of monitoring) come from one British guideline for liver biopsy. No source read gives intervals or thresholds for breast biopsy.",
    "The NHS Breast Screening Programme guidance does not address blood thinners, bruising or aftercare after breast biopsy; those come from local policies, none of which was read. The NHS biopsy page gives general warning signs after any biopsy and no breast-specific advice. The programme's flow charts, including the one for B3 lesions, are images and were not read.",
    "BSG's 48-hour restriction on strenuous activity rests, in its own words, on weak evidence.",
    "Needle-tract seeding of cancer after biopsy of a liver tumour is not addressed in the guideline text read.",
  ],
});
