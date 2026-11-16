import { protocol } from "./helpers";

/*
 * Image-guided needle (core) biopsy of a breast or liver abnormality: preparation, blood thinners, observation and
 * aftercare at home. Lung biopsy is named but not covered, for the reason given in `gaps`.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Neuberger et al., Guidelines on the use of liver biopsy in clinical practice from the British Society of
 *   Gastroenterology, the Royal College of Radiologists and the Royal College of Pathology (Gut 2020): full text,
 *   Europe PMC XML (PMC7398479). Recommendations carry a GRADE strength and quality of evidence.
 * - NHS Breast Screening Programme, Clinical guidance for breast cancer screening assessment (gov.uk, updated
 *   22 January 2026): full text (HTML), section on needle biopsy of the breast and axilla.
 * - BTS Guidelines for radiologically guided lung biopsy (Thorax 2003, PMC1746503): not reachable. PubMed Central
 *   serves only the reference list as text and the full text as a scanned PDF behind a bot check; the publisher's PDF
 *   returned 429 and Europe PMC's rendered PDF returned 403.
 * - SIR consensus guidelines on periprocedural thrombotic and bleeding risk (J Vasc Interv Radiol 2019,
 *   10.1016/j.jvir.2019.04.017): no abstract in Europe PMC and the full text is paywalled; named, not used.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined.
 */
export const imageGuidedCoreBiopsyPreparationAndAftercare = protocol({
  id: "image-guided-core-biopsy-preparation-and-aftercare",
  name: "Image-guided core needle biopsy of the breast and liver: preparation and aftercare",
  aka: ["core biopsy", "core needle biopsy", "needle biopsy", "ultrasound-guided biopsy", "breast biopsy", "liver biopsy", "percutaneous liver biopsy", "vacuum-assisted biopsy", "biopsy aftercare", "biopsy marker clip"],
  domain: "screening-diagnostics",
  tldr: "A core biopsy uses a hollow needle, guided by ultrasound or a scan, to take thin strips of tissue so a pathologist can say what an abnormality is. Breast biopsies are done under local anaesthetic in clinic, sometimes leaving a tiny marker. Liver biopsies need a plan for blood thinners and a few hours of observation; call the hospital for fever, breathlessness, heavy bleeding or bad pain.",
  simple: "A needle takes a small piece of tissue to find out what a lump or patch is. A scan guides the needle. You will have a numbing injection. Tell the team if you take blood thinners. After a liver biopsy you stay a few hours to be checked. Call the hospital if you get a fever, bad pain, bleeding or trouble breathing.",
  summary: "Breast. The NHS Breast Screening Programme assesses significant abnormalities by core or vacuum-assisted biopsy, with ultrasound as the guidance of choice, a permanent image of the needle in the lesion, a marker clip where the lesion may be hard to find again or there are several, and review of every needle biopsy at the multidisciplinary meeting. Fine needle aspiration may be added to, not substituted for, core biopsy. Every woman with a non-operative diagnosis of invasive cancer has axillary ultrasound, with core biopsy of the most suspicious abnormal node preferred to fine needle aspiration where safe (NHSBSP 2026). B3 lesions of uncertain malignant potential are managed by the MDT, usually by vacuum-assisted excision.\n\nLiver (BSG, RCR and RCPath 2020, GRADE). Give risk information in advance, verbally and in writing, in the form \"of 1000 people like you\" (Strong, high quality). Use image guidance for focal lesions (Strong). Bleeding occurs in up to 10%, major bleeding in under 2%, and death in fewer than 1 in 1000. Anticoagulants and antiplatelets are stopped by table 2: warfarin 5 days with an INR check, direct oral anticoagulants 2 days (longer for dabigatran with impaired kidney function), clopidogrel, prasugrel or ticagrelor 7 days, and aspirin 3 to 7 days for elective biopsies, considered against why it is taken (Moderate). An INR of 1.5 to 2.0 is not a contraindication to a targeted biopsy in stable liver disease, fresh frozen plasma is not used to correct an INR of 2.0 or less (Strong), and a platelet count below 50 x 10^9/L calls for a transvenous route where possible (Strong). Observe for at least 3 hours with pulse and blood pressure (Strong, weak evidence). People with a strong suspicion of malignancy are not biopsied as a day case, because they may bleed more. At discharge: rest the remainder of the day, no driving that day, no strenuous activity for 48 hours, and call the hospital for chills, fever, breathlessness, bright red bleeding, severe chest, shoulder or abdominal pain, blood in the stool or a swelling abdomen.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "radiographer", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults having an ultrasound- or CT-guided percutaneous core needle biopsy of a breast or axillary abnormality (including in breast screening assessment) or of a focal liver lesion. Non-lesional liver biopsy for liver disease, transjugular biopsy and children are outside scope except where the liver guideline's thresholds send someone to a transvenous route. Lung biopsy is not covered (see gaps).",
  trigger: "Imaging shows an abnormality that needs a tissue diagnosis, and a core biopsy is planned.",
  steps: [
    {
      action: "Give information about the risks and benefits in advance, spoken and written, in a language the person understands",
      why: "People decide better, and worry less, when they have read about the procedure before the day.",
      source: "bsg-liver-2020",
      quote: "Patients should be given information about the risks and benefits of the procedure, in advance of the procedure where possible",
      grade: "Strength of recommendation STRONG; quality of evidence HIGH",
    },
    {
      action: "Describe risks as numbers out of 1000 people like the patient",
      why: "A number out of a thousand is easier to picture than a percentage or a word like rare.",
      source: "bsg-liver-2020",
      quote: "Information on risks should be readily understood and the following is recommended ‘of 1000 people like you having a liver biopsy, X will develop (complication)’",
      grade: "Strength of recommendation MODERATE; evidence WEAK",
    },
    {
      action: "Before a liver biopsy, plan each blood thinner by the guideline's table: warfarin stopped 5 days before with an INR check, a direct oral anticoagulant 2 days before (longer for dabigatran with weak kidneys)",
      why: "Blood thinners raise the chance of bleeding inside the liver, but stopping them has its own risks, so each is timed.",
      source: "bsg-liver-2020",
      quote: "Direct oral anticoagulant drugs should be stopped for 2 days prior to the day of the biopsy or longer if taking dabigatran, depending on the renal function.",
      grade: "Strength of recommendation STRONG; evidence WEAK (table 2)",
    },
    {
      action: "Where time allows, consider stopping aspirin 3 days before a percutaneous liver biopsy, weighing why it is taken and how urgent the biopsy is",
      why: "Aspirin adds a little to bleeding risk; for someone with a heart stent stopping it can be more dangerous, so a senior decision is needed.",
      source: "bsg-liver-2020",
      quote: "We recommend that, where time allows, stopping aspirin 3 days prior to percutaneous biopsy should be considered, but the decision will depend on the indications for aspirin and the urgency of the biopsy",
      grade: "Strength of recommendation MODERATE; evidence WEAK",
    },
    {
      action: "Do not give fresh frozen plasma to correct an INR of 2.0 or less; if the platelet count is below 50, use a transvenous route where possible",
      why: "Plasma has not been shown to reduce bleeding, and when platelets are very low a route through a vein in the neck avoids puncturing the liver surface.",
      source: "bsg-liver-2020",
      quote: "Where the platelet count is <50 x 10 9 /L, a transvenous approach is recommended, where possible",
      grade: "Strength of recommendation STRONG; evidence MODERATE",
    },
    {
      action: "Use image guidance (ultrasound or CT) to target a focal liver lesion",
      why: "Seeing the needle reach the abnormality makes the sample more useful and avoids blood vessels.",
      source: "bsg-liver-2020",
      quote: "Image-guided liver biopsies should be used for targeting focal lesions or in patients with altered liver anatomy (such as split liver graft or prior liver resection)",
      grade: "Strength of recommendation STRONG; quality of evidence WEAK",
    },
    {
      action: "For a breast abnormality, take core or vacuum-assisted biopsies under ultrasound guidance where possible and keep an image of the needle in the lesion",
      why: "A core of tissue tells the team whether a lump is cancer, what type, and how fast-growing; the image proves the right spot was sampled.",
      source: "nhsbsp-assessment-2026",
      quote: "Ultrasound is the technique of choice for guided needle sampling. A permanent record of images showing the biopsy needle in the target lesion should be made.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "Place a marker clip when the area may be hard to find again, when there are several lesions, or when the biopsy might remove the abnormality",
      why: "The tiny metal marker lets the surgeon or radiologist find exactly the same spot later.",
      source: "nhsbsp-assessment-2026",
      quote: "Marker placing is particularly important to facilitate treatment planning/surgical localisation when there are multiple lesions or when there is any risk that the area of concern could be removed or rendered difficult to see by the biopsy.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "If invasive breast cancer is diagnosed on a needle biopsy, scan the armpit on the same side and biopsy the most suspicious abnormal node",
      why: "Knowing whether the lymph nodes are involved changes the operation and treatment plan.",
      source: "nhsbsp-assessment-2026",
      quote: "All patients with a non-operative diagnosis of invasive breast cancer should have ipsilateral axillary ultrasound performed, preferably at the time of initial assessment.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "Review every needle biopsy result at the multidisciplinary meeting before deciding what happens next",
      why: "The radiologist, pathologist and surgeon check together that the result matches the scan before anyone acts on it.",
      source: "nhsbsp-assessment-2026",
      quote: "All needle biopsies carried out as part of screening assessment must be reviewed at the multi-disciplinary meeting (MDM), where further management of each case should be agreed and documented.",
      grade: "NHSBSP guidance (ungraded)",
    },
    {
      action: "After a liver biopsy, observe for at least 3 hours with regular pulse and blood pressure",
      why: "Bleeding after a liver biopsy usually shows itself in the first few hours, while the person is still in hospital.",
      source: "bsg-liver-2020",
      quote: "Patients should be monitored for at least 3 hours after liver biopsy with regular clinical observations and measurement of blood pressure and pulse",
      grade: "Strength of recommendation STRONG; evidence WEAK",
    },
    {
      action: "Do not do a liver biopsy as a day case when cancer is strongly suspected",
      why: "Liver tumours can bleed more after a needle biopsy, so an overnight stay may be safer.",
      source: "bsg-liver-2020",
      quote: "Patients with a strong suspicion of malignancy should not be biopsied as a day case because such patients may have a higher risk of haemorrhage than patients without cancer.",
      grade: "Text statement (no separate grade)",
    },
    {
      action: "At discharge, advise rest for the rest of the day, no driving that day, no strenuous activity for 48 hours, and give a number to call for fever, breathlessness, bleeding or severe pain",
      why: "These are the signs of the uncommon complications, bleeding, a leak or infection, that need treatment quickly.",
      source: "bsg-liver-2020",
      quote: "If a patient experiences any symptoms such as chills, high fever, difficulty breathing, excessive bright red bleeding from the biopsy site, severe chest, shoulder or abdominal pain, passing blood in the stool or increasing abdominal swelling, then they are instructed to call the hospital.",
      grade: "Text statement (no separate grade)",
    },
  ],
  bestInClass: {
    statement: "For liver core biopsy, the BSG, RCR and RCPath 2020 guideline is the most complete graded standard: advance written risk information in numbers out of 1000 (Strong), image guidance for focal lesions (Strong), a drug-by-drug plan for anticoagulants and antiplatelets (Strong, weak evidence), no fresh frozen plasma for an INR of 2.0 or less (Strong), a transvenous route when platelets are below 50 x 10^9/L (Strong), at least 3 hours of observation (Strong, weak evidence), no day-case biopsy when cancer is strongly suspected, and clear discharge advice. For breast core biopsy, the NHS Breast Screening Programme assessment guidance (updated January 2026) sets the standard in England: ultrasound-guided core or vacuum-assisted biopsy, a marker clip where needed, axillary ultrasound in invasive cancer and multidisciplinary review of every result. It does not address blood thinners or aftercare, which are left to local policy.",
    sources: ["bsg-liver-2020", "nhsbsp-assessment-2026"],
  },
  variants: [
    {
      name: "Fine needle aspiration cytology instead of core biopsy (breast)",
      differs: "A thinner needle draws out cells rather than a strip of tissue.",
      evidence: "NHSBSP allows it in addition to core biopsy where high quality cytology with immediate reporting is available, and alone only in exceptional cases where core biopsy is not possible, because core biopsy gives invasive status, subtype, grade and receptor status.",
      sources: ["nhsbsp-assessment-2026"],
    },
    {
      name: "Shorter observation after liver biopsy",
      differs: "Some units observe for 1 hour rather than 3.",
      evidence: "BSG notes one recent study suggesting 1 hour is enough to recognise all major complications, but recommends at least 3 hours for low-risk patients and up to 8 hours otherwise.",
      sources: ["bsg-liver-2020"],
    },
    {
      name: "Continuing aspirin for urgent liver biopsy",
      differs: "Aspirin is continued rather than paused.",
      evidence: "BSG table 2: for urgent biopsies aspirin can be continued at the clinician's discretion; empirical experience in post-transplant biopsies suggests pausing may not be necessary.",
      sources: ["bsg-liver-2020"],
    },
  ],
  grades: [
    { claim: "Advance risk information, verbal and written", grade: "Strength of recommendation STRONG; quality of evidence HIGH", source: "bsg-liver-2020" },
    { claim: "Image guidance for focal liver lesions", grade: "Strength of recommendation STRONG; quality of evidence WEAK", source: "bsg-liver-2020" },
    { claim: "No fresh frozen plasma to correct an INR of 2.0 or less", grade: "Strength of recommendation STRONG; evidence MODERATE", source: "bsg-liver-2020", quote: "We recommend FFP should not be used to correct an INR ≤2.0 prior to liver biopsy" },
    { claim: "Consider stopping aspirin 3 days before percutaneous biopsy where time allows", grade: "Strength of recommendation MODERATE; evidence WEAK", source: "bsg-liver-2020" },
    { claim: "Monitor at least 3 hours after liver biopsy", grade: "Strength of recommendation STRONG; evidence WEAK", source: "bsg-liver-2020" },
    { claim: "Day-case liver biopsy is safe when there are no increased risk factors and the person can get help after leaving", grade: "Strength of recommendation STRONG; evidence WEAK", source: "bsg-liver-2020", quote: "Liver biopsy may be safely done as a day case procedure if there are no increased risk factors and the patient can be looked after when they have left hospital, can seek appropriate advice and access appropriate medical help if needed" },
    { claim: "Risk of bleeding and death after percutaneous liver biopsy", grade: "Summary statement (ungraded)", source: "bsg-liver-2020", quote: "Bleeding occurs in up to 10% with major bleeding occurring in less than 2%." },
  ],
  sources: [
    {
      key: "bsg-liver-2020",
      label: "Guidelines on the use of liver biopsy in clinical practice from the British Society of Gastroenterology, the Royal College of Radiologists and the Royal College of Pathology",
      publisher: "British Society of Gastroenterology, Royal College of Radiologists and Royal College of Pathologists (Neuberger et al., Gut)",
      year: 2020,
      url: "https://doi.org/10.1136/gutjnl-2020-321299",
      doi: "10.1136/gutjnl-2020-321299",
      gradingScheme: "GRADE: each recommendation printed with a strength (STRONG, MODERATE, LOW) and a quality of evidence (HIGH, MODERATE, WEAK).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nhsbsp-assessment-2026",
      label: "Clinical guidance for breast cancer screening assessment (updated 22 January 2026)",
      publisher: "NHS England, NHS Breast Screening Programme (gov.uk)",
      year: 2026,
      url: "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment",
      gradingScheme: "Programme guidance; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
  ],
  technologies: ["vacuum-assisted-breast-biopsy", "ultrasound", "ct"],
  cancers: ["breast-cancer", "hcc"],
  drugs: ["warfarin"],
  terms: ["core-needle-biopsy", "biopsy"],
  related: ["anticoagulants-and-antiplatelets-before-endoscopy"],
  upgrades: [],
  gaps: [
    "Lung core biopsy is not covered. The British Thoracic Society guideline (2003) could not be read: PubMed Central serves its text as a scanned PDF behind a bot check, the publisher returned 429 and Europe PMC returned 403. No more recent open guideline on CT-guided lung biopsy was found in Europe PMC; pneumothorax monitoring, chest X-ray timing and air travel after lung biopsy are therefore not on this page.",
    "The SIR 2019 consensus on bleeding risk in image-guided procedures, which classifies breast and liver biopsy by bleeding risk and sets drug intervals used in North America, is paywalled and has no abstract in Europe PMC; it was not read.",
    "The NHS Breast Screening Programme guidance does not address blood thinners, bruising or aftercare after breast biopsy; those come from local policies, none of which was read.",
    "BSG's 48-hour restriction on strenuous activity rests, in its own words, on weak evidence.",
    "Needle-tract seeding of cancer after biopsy of a liver tumour is not addressed in the passages read.",
  ],
});
