import { protocol } from "./helpers";

/*
 * Adjusting anticancer drug doses for reduced kidney function in adults: how kidney function is measured, how it is
 * classified and how a dose is chosen.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * (curl, pdftotext, Europe PMC XML with tags stripped) and each claim re-read against it. What was read, and how:
 * - ADDIKD guideline itself, version 1 (eviQ, Cancer Institute NSW, published 26 October 2022; the eviQ page shows
 *   "ID: 4174 v.1" and one history entry): PDF from eviq.org.au, pdftotext. NEW on this pass. Read: the scope, the
 *   three key recommendations and their grades, and the cisplatin, methotrexate, capecitabine and pemetrexed sections
 *   and tables. The other drug sections were not read line by line.
 * - ADDIKD, Part 1 (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103102, PMC12034077): full text,
 *   Europe PMC XML (the copy a sibling checker saved the same day was re-used).
 * - ADDIKD methodology (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103101, PMC12034072): full
 *   text, Europe PMC XML, including the table of evidence certainty and strength for the 59 drugs. Crossref lists a
 *   corrigendum (DOI 10.1016/j.eclinm.2026.104275, November 2026); its body could not be read (Europe PMC returned an
 *   error and the NCBI record has no body text), so no grade here rests on the methodology paper's table alone.
 * - ADDIKD integration paper (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103161, PMC12034076):
 *   full text, Europe PMC XML. Its Tables 1 to 3 are images and were not read; its supplementary appendix (a Word
 *   file from Europe PMC, with the summary table for 59 drugs and the full methotrexate, cisplatin, carboplatin and
 *   nivolumab tables) was read as text.
 * - KDIGO 2024 CKD guideline (Kidney Int 2024, DOI 10.1016/j.kint.2023.10.018): full text, PDF from kdigo.org; quotes
 *   from the single-column summary of practice points only.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025):
 *   full text, PDF.
 * - Giraud et al., Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update
 *   (Lancet Oncol 2023, DOI 10.1016/S1470-2045(23)00216-4): still not reachable. Paywalled, and Europe PMC holds no
 *   abstract. The first pass credited it to Krens, who is its third author and the first author of the 2019 paper.
 *   BOPA names the Lancet recommendations as a reference; nothing here rests on them.
 *
 * Doses independently re-read on 17 November 2026 against the ADDIKD guideline PDF (cisplatin and methotrexate
 * sections), ADDIKD Part 1 and the integration paper; the methotrexate and cisplatin conditions were reworded to
 * the guideline's own.
 *
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied with line breaks joined only; in
 * the XML, tags and citation-number cross-references are stripped. Sentences whose superscripts mangle in the raw
 * text (mg/m2, ml/min/1.73 m2) are not used as quotes; those figures are stated in prose.
 */
export const renalDoseAdjustmentOfAnticancerDrugs = protocol({
  id: "renal-dose-adjustment-of-anticancer-drugs",
  name: "Renal dose adjustment of anticancer drugs in reduced kidney function",
  aka: ["renal dosing of chemotherapy", "chemotherapy in kidney impairment", "anticancer drug dosing in kidney dysfunction", "ADDIKD", "chemotherapy dose reduction for renal impairment", "eGFR vs creatinine clearance for chemotherapy"],
  domain: "pharmacy",
  tldr: "Many cancer drugs leave the body through the kidneys, so if your kidneys work less well the dose may need changing. International guidance (ADDIKD, 2022) says to measure kidney function the way the rest of medicine does, with the eGFR on your blood test, to prefer a more exact kidney test for a few drugs, and to weigh any dose cut with care, because for some drugs a lower dose may work less well.",
  simple: "Your blood tests show how well your kidneys work. For some cancer drugs the team changes the dose if your kidneys are slower, and for a few they may do a special kidney test first.",
  summary: "Reduced kidney function is commonly an exclusion criterion for randomised cancer trials, so high-quality evidence on dosing is limited. ADDIKD, an international GRADE-and-consensus guideline from a 38-member working group covering 59 drugs (published on eviQ in October 2022, described in three journal papers in 2025), makes three general recommendations, all graded clinical consensus and strong: assess kidney function with eGFR by CKD-EPI, except where measured GFR is clinically necessary; use eGFR CKD-EPI to guide dosing of kidney-dependent drugs, with directly measured GFR preferred for the initial dosing of carboplatin, cisplatin and high-dose methotrexate (500 mg/m2 or more) and in people with extremes of body size or muscle mass, amputation, paraplegia or conditions of skeletal muscle; and use the KDIGO CKD categories to step doses. It does not routinely advise eGFR adjusted to the person's own body surface area, except for carboplatin, where BSA-adjusted eGFR is a suitable alternative to measured GFR in the Calvert formula, especially at eGFR 45 to 125, with non-curative intent and without those body-composition exceptions. Its dose tables are for the first cycle only.\n\nThis departs from long practice: ADDIKD and KDIGO both note that Cockcroft-Gault creatinine clearance remains widely used for anticancer dosing, and BOPA (2025) still allows measured or calculated methods, naming Cockcroft and Gault. ADDIKD also reports that a dose cut may cost efficacy: for cisplatin, several studies found poorer survival in people with eGFR below 60 given reduced doses than in people with normal kidney function given full doses, and it divides cisplatin into high and low dose at 50 mg/m2. When dosing, weigh patient factors (hydration, performance status, liver dysfunction, a single kidney), treatment factors (intent, an alternative protocol of similar efficacy not dependent on the kidneys, tumour lysis risk, therapeutic drug monitoring, nephrotoxic co-medicines) and access to measured GFR. KDIGO 2024 adds that dosing should be considered and adapted when GFR is not in a steady state, and that medicines should be reviewed periodically and at transitions of care.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist"],
    where: ["outpatient-clinic", "ward", "aseptic-unit"],
  },
  population: "Adults with cancer prescribed systemic anticancer drugs whose kidney function is reduced or uncertain. ADDIKD states eGFR CKD-EPI is unsuitable in kidney replacement therapy, pregnancy and people under 18. Its dosing recommendations do not apply beyond the first cycle, in acute kidney injury or unstable kidney function, in stem cell mobilisation, bone marrow transplantation or cellular therapies, in pregnancy or under 18. For kidney replacement therapy (which it defines as dialysis or a kidney transplant) it gives no doses and advises consulting a multidisciplinary team of oncology or haematology with nephrology, clinical pharmacology or both.",
  trigger: "A new anticancer regimen is planned, or eGFR is below 60 ml/min/1.73 m2, or kidney function changes during treatment.",
  steps: [
    {
      action: "Assess kidney function with eGFR from the CKD-EPI equation, as laboratories report it, unless measured GFR is clinically necessary",
      why: "ADDIKD judges CKD-EPI eGFR a more accurate and precise estimate of measured GFR than other estimates, and it is the measure the rest of medicine uses.",
      source: "addikd-part1-2025",
      quote: "We recommend the use of estimated glomerular filtration rate calculated via the Chronic Kidney Disease—Epidemiology Collaboration (eGFR CKD-EPI ) equation to guide the assessment of kidney function, except where directly measured glomerular filtration rate (GFR) is clinically necessary.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Prefer a directly measured GFR to guide the initial dosing of carboplatin, cisplatin and high-dose methotrexate (500 mg/m2 or more), and of any kidney-dependent drug in people with extremes of body size or muscle mass, amputation, paraplegia or conditions of skeletal muscle",
      why: "ADDIKD calls measured GFR the most accurate method, and says eGFR may be unreliable in these bodies; the list of drugs is given as 'including, but not limited to'.",
      source: "addikd-part1-2025",
      grade: "clinical consensus; strong",
    },
    {
      action: "Use the standardised (per 1.73 m2) eGFR to guide dosing, and do not routinely adjust it to the person's own body surface area, except for carboplatin",
      why: "Where a dose is already scaled to weight or body surface area, adjusting the eGFR for body size too would count body size twice.",
      source: "addikd-part1-2025",
      quote: "eGFR CKD-EPI adjusted to an individual’s body surface area (BSA) is not routinely advised to guide dosing of anticancer drugs over standardised eGFR CKD-EPI , except for carboplatin.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Take the eGFR as close as possible to the time of treatment, and interpret a creatinine-based estimate with caution in someone acutely ill or whose kidney function is changing quickly",
      why: "Blood creatinine can take one to three days to peak after the kidneys are injured, so the estimate can lag behind the kidneys. ADDIKD's dose tables do not cover acute kidney injury or unstable kidney function.",
      source: "addikd-part1-2025",
      quote: "eGFR CKD-EPI requires stable kidney function and should be performed as close as possible to the time of administering the anticancer drug(s) to ensure it is a reflective estimation of the patient’s steady state kidney function.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Place the patient in a KDIGO CKD category and use it to step the dose and the monitoring for each drug",
      why: "ADDIKD's workshops agreed that one classification across clinical settings makes kidney function simpler to estimate and decisions more uniform.",
      source: "addikd-part1-2025",
      quote: "We recommend the Kidney Disease Improving Global Outcomes (KDIGO) Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease (CKD) categories to guide the stepwise dose adjustment of anticancer drugs in reduced kidney function and the monitoring of drug-related adverse events.",
      grade: "clinical consensus; strong",
    },
    {
      action: "When dosing in reduced kidney function, carefully consider the patient's condition, the aim of treatment, whether an alternative protocol of similar efficacy avoids kidney-dependent drugs, the drug's properties and any other medicines that can harm the kidneys",
      why: "ADDIKD stresses the balance of risk and benefit of a particular dose for the individual, so the decision does not rest on a number alone.",
      source: "addikd-part1-2025",
      quote: "Treatment factors—treatment protocol (e.g., intent of treatment, appropriate alternative treatment protocols with similar efficacy and without drugs dependent on kidney function for dosing), risk of adverse events (e.g., tumour lysis syndrome), anticancer drug properties (e.g., pharmacokinetics, pharmacodynamics, formulation, availability of therapeutic drug monitoring), and concomitant drugs (especially with nephrotoxic potential).",
      grade: "clinical consensus; strong",
    },
    {
      action: "Treat ADDIKD's dose tables as guidance for the first cycle, and set later doses after assessing how the first cycle was tolerated",
      why: "The guideline says its recommendations do not apply beyond the first cycle.",
      source: "addikd-guideline-2022",
      quote: "Dose adjustment in kidney dysfunction beyond the first cycle of treatment (an assessment of the patient’s tolerance to the dose used in the first cycle is required before determining doses for subsequent cycles).",
    },
    {
      action: "Check kidney function at pharmacy verification of every cycle and see that doses are modified where the drug or regimen literature directs, knowing which method the organisation uses",
      why: "BOPA lists this among the checks for all cycles, including the first, and accepts measured or calculated methods.",
      source: "bopa-2025",
      quote: "Check renal function and ensure drug doses are modified accordingly where appropriate as per drug/regimen literature.",
    },
    {
      action: "Review all medicines periodically and at each transition of care, and review and limit over-the-counter and herbal products that may harm the kidneys",
      why: "People with kidney disease often have complex medicine lists and see several specialists.",
      source: "kdigo-2024",
      quote: "Perform thorough medication review periodically and at transitions of care to assess adherence, continued indication, and potential drug interactions because people with CKD often have complex medication regimens and are seen by multiple specialists.",
      grade: "Practice Point 4.3.1",
    },
  ],
  bestInClass: {
    statement: "ADDIKD (eviQ, 2022; journal papers 2025) is the guideline whose remit this is, and its authors say no internationally agreed guideline existed before it: eGFR CKD-EPI to assess kidney function and guide dosing, measured GFR preferred for the initial dosing of carboplatin, cisplatin, high-dose methotrexate and in unusual body composition, KDIGO categories to step doses, and a careful weighing of patient and treatment factors (all clinical consensus, strong). KDIGO 2024 says validated creatinine-based eGFR equations are appropriate for drug dosing for most people, that combined creatinine and cystatin C equations or measured GFR may be indicated where more accuracy is needed, and that measured GFR may be preferred for the initial dosing of carboplatin, cisplatin and methotrexate. The two differ in emphasis on one point: KDIGO says eGFR not indexed to body surface area may be indicated at extremes of body weight, while ADDIKD does not routinely advise it except for carboplatin, strongly prefers measured GFR in obesity, and lists BSA-adjusted eGFR there only as a practical option it calls inferior. ADDIKD sets its drug recommendations beside product information and older references (the Lancet Oncology recommendations of 2019 and 2023, BC Cancer monographs, the Renal Drug Database), whose cut-offs differ from it and from one another. BOPA is among the bodies ADDIKD lists as endorsing it, yet BOPA's 2025 verification standards still accept measured or calculated methods, naming Cockcroft and Gault, and leave the choice to the organisation.",
    sources: ["addikd-guideline-2022", "addikd-part1-2025", "addikd-method-2025", "addikd-integration-2025", "kdigo-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Cockcroft-Gault creatinine clearance with label or reference-book cut-offs",
      differs: "Estimates creatinine clearance by Cockcroft-Gault and applies the dose bands in the product information or a reference such as the Lancet Oncology recommendations (Krens et al. 2019; Giraud et al. 2023), BC Cancer monographs or the Renal Drug Database.",
      evidence: "ADDIKD notes that creatinine clearance overestimates GFR by 10 to 20%, that the accuracy of Cockcroft-Gault has not been confirmed since creatinine assays were standardised in 2010, and that existing references disagree with one another: for cisplatin some advise 25 to 50% reductions at a creatinine clearance or GFR of 30 to 59 ml/min and others contraindicate it below 40. KDIGO 2024 says Cockcroft-Gault is still among the most commonly used methods in people with cancer despite its lack of validation. BOPA 2025 accepts measured or calculated methods (naming Cockcroft and Gault) and asks the verifier to know the organisation's chosen method.",
      sources: ["addikd-part1-2025", "addikd-integration-2025", "kdigo-2024", "bopa-2025", "giraud-2023"],
    },
    {
      name: "Cisplatin divided into high and low dose at 50 mg/m2 (ADDIKD)",
      differs: "Treats a protocol starting dose above 50 mg/m2 (counting fractionated doses together) as high dose. At eGFR 45 to 59: above 50 mg/m2, consider an alternative protocol, especially with poor performance status or nephrotoxic co-medicines, or a 25 to 50% reduction if proceeding; at 50 mg/m2 or below, the consensus is to give the full dose where intent is curative, performance status is good and there are no nephrotoxic co-medicines, and otherwise a 25% reduction or an alternative protocol. Below eGFR 45: avoid cisplatin and use an alternative protocol. With eGFR below 60, measured GFR is preferred for initial dosing, especially above 50 mg/m2 or where eGFR is unreliable.",
      evidence: "ADDIKD grades its recommendation for an initial dose reduction moderate certainty, strong, and the use of KDIGO categories for cisplatin moderate, conditional. The split rests on the link between high peaks of free platinum and kidney injury; the caution about reducing rests on several studies reporting poorer overall survival in people with eGFR below 60 given reduced doses than in people with normal kidney function given full doses (50 mg/m2 or more). Avoidance below 45 is clinical consensus, given for lack of definitive evidence.",
      sources: ["addikd-guideline-2022", "addikd-integration-2025"],
    },
    {
      name: "Methotrexate divided at 500 mg/m2 (ADDIKD)",
      differs: "At eGFR 45 to 59: for starting doses of 500 mg/m2 or more, the consensus is to give the full dose where intent is curative, performance status is good and there are no nephrotoxic co-medicines (ADDIKD says this matters most in primary CNS lymphoma, where an exposure threshold has to be kept), and otherwise a 25% reduction or an alternative protocol; below 500 mg/m2, consider an alternative protocol where intent is curative and the person has both poor performance status and nephrotoxic co-medicines, and in all other patients consider a 25% reduction. At eGFR 30 to 44: consider an alternative protocol where intent is curative, or where there is both poor performance status and nephrotoxic co-medicines, and otherwise reduce the dose by 50%, whatever the starting dose. Below eGFR 30: avoid methotrexate and use an alternative protocol. These reductions are for non-transplant settings. Measured GFR is preferred for initial dosing, especially when eGFR is below 60, the dose is 500 mg/m2 or more, or eGFR may be unreliable.",
      evidence: "ADDIKD grades its recommendation for an initial dose reduction low certainty, strong, and the use of KDIGO categories for methotrexate low, conditional. It says existing guidance empirically halves the dose at a creatinine clearance or GFR of 20 to 50 ml/min and disagrees on the threshold for stopping (10 to 30 ml/min).",
      sources: ["addikd-guideline-2022", "addikd-integration-2025"],
    },
  ],
  grades: [
    { claim: "eGFR CKD-EPI to guide dosing of kidney-dependent anticancer drugs, except in specific situations", grade: "Evidence quality/certainty: clinical consensus; strength of recommendation: strong", source: "addikd-part1-2025", quote: "We recommend eGFR CKD-EPI to guide the dosing of anticancer drugs whose dose is dependent on kidney function, except in specific clinical situations or for a select group of anticancer drugs where eGFR CKD-EPI may be unsuitable." },
    { claim: "An initial dose reduction of cisplatin in kidney dysfunction", grade: "Evidence quality/certainty: moderate; strength of recommendation: strong", source: "addikd-guideline-2022", quote: "We recommend an initial dose reduction of intravenous cisplatin in kidney dysfunction." },
    { claim: "Consider GFR when dosing medicines cleared by the kidneys", grade: "Practice Point 4.2.1", source: "kdigo-2024", quote: "Consider GFR when dosing medications cleared by the kidneys." },
    { claim: "Validated creatinine-based eGFR equations are appropriate for drug dosing for most people", grade: "Practice Point 4.2.2", source: "kdigo-2024", quote: "For most people and clinical settings, validated eGFR equations using SCr are appropriate for drug dosing." },
  ],
  sources: [
    {
      key: "addikd-guideline-2022",
      label: "International consensus guideline on anticancer drug dosing in kidney dysfunction (ADDIKD), version 1",
      publisher: "eviQ, Cancer Institute NSW (Sandhu et al., ADDIKD Guideline Working Group)",
      year: 2022,
      url: "https://www.eviq.org.au/clinical-resources/addikd-guideline/4174-anticancer-drug-dosing-in-kidney-dysfunction",
      gradingScheme: "GRADE-informed consensus: evidence quality or certainty (very low, low, moderate, high, 'no studies' or 'clinical consensus') and strength of recommendation, strong ('we recommend') or conditional ('we suggest').",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "addikd-part1-2025",
      label: "Aligning kidney function assessment in patients with cancer to global practices in internal medicine (ADDIKD, Part 1)",
      publisher: "eClinicalMedicine (Sandhu et al., ADDIKD Working Group, eviQ / Cancer Institute NSW)",
      year: 2025,
      url: "https://doi.org/10.1016/j.eclinm.2025.103102",
      doi: "10.1016/j.eclinm.2025.103102",
      gradingScheme: "GRADE-informed consensus: evidence quality or certainty (here 'clinical consensus') and strength of recommendation, strong or conditional.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "addikd-method-2025",
      label: "A methodology for determining dosing recommendations for anticancer drugs in patients with reduced kidney function (ADDIKD)",
      publisher: "eClinicalMedicine (Sandhu et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.eclinm.2025.103101",
      doi: "10.1016/j.eclinm.2025.103101",
      gradingScheme: "GRADE certainty (very low to high) and strength (strong or conditional) for each drug and question, set by anonymous consensus voting.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "addikd-integration-2025",
      label: "Integrating International Consensus Guidelines for Anticancer Drug Dosing in Kidney Dysfunction (ADDIKD) into everyday practice",
      publisher: "eClinicalMedicine (Sandhu et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.eclinm.2025.103161",
      doi: "10.1016/j.eclinm.2025.103161",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "kdigo-2024",
      label: "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease",
      publisher: "KDIGO (Kidney International)",
      year: 2024,
      url: "https://doi.org/10.1016/j.kint.2023.10.018",
      doi: "10.1016/j.kint.2023.10.018",
      gradingScheme: "Recommendations graded 1 (we recommend) or 2 (we suggest) with evidence quality A to D; practice points are ungraded expert judgement.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "giraud-2023",
      label: "Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update",
      publisher: "The Lancet Oncology (Giraud et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/S1470-2045(23)00216-4",
      doi: "10.1016/S1470-2045(23)00216-4",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["carboplatin", "cisplatin", "methotrexate"],
  related: ["carboplatin-dose-calculation", "sact-prescribing-and-pharmacy-verification"],
  terms: ["pharmacokinetics"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the ADDIKD guideline (eviQ, version 1, 26 October 2022) was read as a PDF, and the supplementary appendix of the integration paper as text. Cisplatin and methotrexate are set out above from them. The tables for the other drugs are in the guideline and are not reproduced here; this page should not be used to find the dose of any other drug.",
    "No product label or SmPC was read for this page, so the label cut-offs that ADDIKD departs from are given only as ADDIKD summarises them. Tables 1 to 3 of the integration paper, which set ADDIKD beside each older reference, are images and were not read.",
    "The Lancet Oncology recommendations (Krens et al. 2019 and the 2023 update by Giraud et al.), which BOPA gives as its example of a renal and hepatic dose adjustment guideline, could not be read on 17 November 2026: the journal is paywalled and Europe PMC holds no abstract.",
    "A corrigendum to the ADDIKD methodology paper was published in November 2026 (DOI 10.1016/j.eclinm.2026.104275). Its text could not be read on 17 November 2026, so what it corrects is not known; the grades printed here are taken from the guideline itself and from Part 1.",
    "KDIGO 2024 is the current published edition. On 17 November 2026 the KDIGO site said a 'KDIGO 2027 CKD Guideline: Medications Management Focused Update' had closed its public review and was being revised; it is not final and was not used.",
    "ADDIKD rests on consensus and mostly observational data. KDIGO 2024 notes that few studies have compared eGFR equations in the context of drug dosing, and ADDIKD's authors say its adoption still needs endorsement by stakeholders and integration into reference sources, trial protocols and electronic prescribing systems.",
    "ADDIKD gives no doses for kidney replacement therapy (dialysis or a kidney transplant), for acute kidney injury or beyond the first cycle; its authors name kidney replacement therapy as a subject for a future update. No source read here gives dialysis dosing.",
  ],
});
