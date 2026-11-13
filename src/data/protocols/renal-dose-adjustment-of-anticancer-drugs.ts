import { protocol } from "./helpers";

/*
 * Adjusting anticancer drug doses for reduced kidney function in adults: how kidney function is measured, how it is
 * classified and how a dose is chosen.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ADDIKD, Part 1 (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103102, PMC12034077): full text,
 *   Europe PMC XML.
 * - ADDIKD methodology (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103101, PMC12034072): full
 *   text, Europe PMC XML, including the table of evidence certainty and strength for the 59 drugs.
 * - ADDIKD integration paper (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103161, PMC12034076):
 *   full text, Europe PMC XML (cisplatin, methotrexate, carboplatin and nivolumab compared with older guidance).
 * - KDIGO 2024 CKD guideline (Kidney Int 2024, DOI 10.1016/j.kint.2023.10.018): full text, PDF from kdigo.org; quotes
 *   from the single-column summary of practice points only.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF.
 * - Krens et al., Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update
 *   (Lancet Oncol 2023, DOI 10.1016/S1470-2045(23)00216-4): not reachable. Paywalled, and Europe PMC holds no abstract.
 *   BOPA names the Lancet recommendations as a reference; nothing here rests on them.
 * - The ADDIKD drug-by-drug tables (eviQ quick reference tool and supplementary appendices) were not read; individual
 *   drug doses are not stated here for that reason.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const renalDoseAdjustmentOfAnticancerDrugs = protocol({
  id: "renal-dose-adjustment-of-anticancer-drugs",
  name: "Renal dose adjustment of anticancer drugs in reduced kidney function",
  aka: ["renal dosing of chemotherapy", "chemotherapy in kidney impairment", "anticancer drug dosing in kidney dysfunction", "ADDIKD", "chemotherapy dose reduction for renal impairment", "eGFR vs creatinine clearance for chemotherapy"],
  domain: "pharmacy",
  tldr: "Many cancer drugs leave the body through the kidneys, so if your kidneys work less well the dose may need changing. The newest international guidance (2025) says to measure kidney function the same way the rest of medicine does, with the eGFR on your blood test, to use a more exact kidney test for a few drugs, and to think hard before cutting doses, because a lower dose can work less well.",
  simple: "Your blood tests show how well your kidneys work. For some cancer drugs the team changes the dose if your kidneys are slower, and for a few they may do a special kidney test first.",
  summary: "No randomised trials guide anticancer dosing in kidney dysfunction, because reduced kidney function usually excludes people from trials. ADDIKD (2025), an international GRADE-and-consensus guideline from 38 working-group members covering 59 drugs, makes three general recommendations, all clinical consensus and strong: assess kidney function with eGFR by CKD-EPI, except where measured GFR is clinically necessary; use eGFR CKD-EPI to guide dosing of kidney-dependent drugs, preferring measured GFR for initial dosing of carboplatin, cisplatin and high-dose methotrexate (500 mg/m2 or more) and at extremes of body size or muscle mass, amputation or paraplegia; and use the KDIGO CKD categories to step doses. Standardised (1.73 m2) eGFR is used for every drug except carboplatin, where BSA-adjusted eGFR goes into the Calvert formula.\n\nThis departs from long practice: product information and older references use Cockcroft-Gault creatinine clearance, and BOPA (2025) still allows measured or calculated methods by local policy. ADDIKD also warns that dose cuts can harm: for cisplatin, several studies found poorer survival in people with eGFR below 60 given reduced doses, and it splits cisplatin into high and low dose at 50 mg/m2. Before deciding, weigh patient factors (hydration, performance status, liver disease, a single kidney), treatment factors (intent, an alternative regimen not dependent on the kidneys, tumour lysis risk, therapeutic drug monitoring, nephrotoxic co-medicines) and access to measured GFR. KDIGO 2024 adds that creatinine-based estimates are unreliable when kidney function is changing, and that medicines should be reviewed at transitions of care.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist"],
    where: ["outpatient-clinic", "ward", "aseptic-unit"],
  },
  population: "Adults with cancer prescribed systemic anticancer drugs whose kidney function is reduced or uncertain. ADDIKD states eGFR CKD-EPI is unsuitable in kidney replacement therapy, pregnancy and people under 18, and does not cover dialysis dosing; those patients need nephrology and specialist pharmacy input.",
  trigger: "A new anticancer regimen is planned, or eGFR is below 60 ml/min/1.73 m2, or kidney function changes during treatment.",
  steps: [
    {
      action: "Assess kidney function with eGFR from the CKD-EPI equation, as laboratories report it, unless measured GFR is clinically necessary",
      why: "CKD-EPI eGFR is closer to true kidney function than older estimates and is the measure the rest of medicine uses.",
      source: "addikd-part1-2025",
      quote: "We recommend the use of estimated glomerular filtration rate calculated via the Chronic Kidney Disease—Epidemiology Collaboration (eGFR CKD-EPI ) equation to guide the assessment of kidney function, except where directly measured glomerular filtration rate (GFR) is clinically necessary.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Use a directly measured GFR to set the first dose of carboplatin, cisplatin and high-dose methotrexate, and of any kidney-dependent drug in people with extremes of body size or muscle mass, amputation or paraplegia",
      why: "For drugs where a small error matters, or bodies where creatinine misleads, a measured GFR avoids under- or overdosing.",
      source: "addikd-part1-2025",
      quote: "Directly measured GFR is preferred to guide the initial dosing: • for a select group of anticancer drugs including, but not limited to, carboplatin, cisplatin, and methotrexate (≥500 mg/m 2 ).",
      grade: "clinical consensus; strong",
    },
    {
      action: "Use the standard (per 1.73 m2) eGFR for dosing every drug except carboplatin",
      why: "Most doses are already scaled to body size; adjusting the eGFR for body size too would count it twice.",
      source: "addikd-part1-2025",
      quote: "eGFR CKD-EPI adjusted to an individual’s body surface area (BSA) is not routinely advised to guide dosing of anticancer drugs over standardised eGFR CKD-EPI , except for carboplatin.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Do not rely on a creatinine-based estimate when kidney function is changing quickly, for example after an acute kidney injury",
      why: "Blood creatinine can take one to three days to rise after the kidneys are injured, so the estimate can look better than the kidneys are.",
      source: "addikd-part1-2025",
      quote: "eGFR CKD-EPI requires stable kidney function and should be performed as close as possible to the time of administering the anticancer drug(s) to ensure it is a reflective estimation of the patient’s steady state kidney function.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Place the patient in a KDIGO CKD category and use it to step the dose and the monitoring for each drug",
      why: "Common bands across all of medicine make dosing rules consistent and easier to check.",
      source: "addikd-part1-2025",
      quote: "We recommend the Kidney Disease Improving Global Outcomes (KDIGO) Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease (CKD) 9 , 10 categories to guide the stepwise dose adjustment of anticancer drugs in reduced kidney function and the monitoring of drug-related adverse events.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Before cutting a dose, weigh the patient's condition, the aim of treatment, whether an equally effective regimen avoids kidney-dependent drugs, the drug's properties and any other medicines that harm the kidneys",
      why: "A lower dose can mean a less effective treatment, so the decision depends on the person and the goal, not on a number alone.",
      source: "addikd-part1-2025",
      quote: "Treatment factors—treatment protocol (e.g., intent of treatment, appropriate alternative treatment protocols with similar efficacy and without drugs dependent on kidney function for dosing), risk of adverse events (e.g., tumour lysis syndrome), anticancer drug properties (e.g., pharmacokinetics, pharmacodynamics, formulation, availability of therapeutic drug monitoring), and concomitant drugs (especially with nephrotoxic potential).",
      grade: "clinical consensus; strong",
    },
    {
      action: "Check kidney function at every cycle at pharmacy verification and modify doses as the regimen's literature directs, knowing which method the organisation uses",
      why: "Kidney function changes during treatment, and the pharmacist is the second check that the dose still fits.",
      source: "bopa-2025",
      quote: "Check renal function and ensure drug doses are modified accordingly where appropriate as per drug/regimen literature.",
    },
    {
      action: "Review all medicines, including over-the-counter and herbal products, for kidney harm and interactions, and repeat at each transition of care",
      why: "Other medicines can damage the kidneys or raise the levels of kidney-cleared cancer drugs.",
      source: "kdigo-2024",
      quote: "Perform thorough medication review periodically and at transitions of care to assess adherence, continued indication, and potential drug interactions because people with CKD often have complex medication regimens and are seen by multiple specialists.",
      grade: "Practice Point 4.3.1",
    },
  ],
  bestInClass: {
    statement: "ADDIKD (2025) is the only international guideline on the subject and the most recent: eGFR CKD-EPI to assess kidney function and guide dosing, measured GFR for carboplatin, cisplatin, high-dose methotrexate and unusual body composition, KDIGO categories to step doses, and a deliberate weighing of patient and treatment factors before any reduction (all clinical consensus, strong). KDIGO 2024 agrees on CKD-EPI eGFR for most drug dosing and on measured GFR or cystatin C where accuracy matters. It conflicts with product labels and older references (Krens 2019/2023, BC Cancer monographs, the Renal Drug Database), which mostly use Cockcroft-Gault creatinine clearance and sometimes different cut-offs; UK pharmacy standards (BOPA 2025) leave the method to local policy.",
    sources: ["addikd-part1-2025", "addikd-method-2025", "addikd-integration-2025", "kdigo-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Cockcroft-Gault creatinine clearance with label or reference-book cut-offs",
      differs: "Estimates creatinine clearance by Cockcroft-Gault and applies the dose bands in the product information or a reference such as the Lancet Oncology recommendations (Krens et al.), BC Cancer monographs or the Renal Drug Database.",
      evidence: "ADDIKD notes Cockcroft-Gault overestimates GFR by 10 to 20% and was not validated after creatinine assays were standardised in 2010, and that existing references disagree with one another: for cisplatin some advise 25 to 50% reductions at 30 to 59 ml/min and others contraindicate it below 40. BOPA 2025 accepts measured or calculated methods (including Cockcroft-Gault) by local policy.",
      sources: ["addikd-part1-2025", "addikd-integration-2025", "bopa-2025", "krens-2023"],
    },
    {
      name: "Cisplatin split into high and low dose (ADDIKD)",
      differs: "Treats cisplatin above 50 mg/m2 (counting fractionated doses together) as high dose, and in the eGFR 45 to 59 category reduces high-dose cisplatin or considers another regimen, taking performance status and nephrotoxic co-medicines into account.",
      evidence: "Based on the link between high free-platinum peaks and kidney injury, and on studies showing poorer overall survival when people with eGFR below 60 were given reduced doses; low to moderate certainty in the ADDIKD tables.",
      sources: ["addikd-integration-2025", "addikd-method-2025"],
    },
  ],
  grades: [
    { claim: "eGFR CKD-EPI to guide dosing of kidney-dependent anticancer drugs, except in specific situations", grade: "Evidence quality/certainty: clinical consensus; strength of recommendation: strong", source: "addikd-part1-2025", quote: "We recommend eGFR CKD-EPI to guide the dosing of anticancer drugs whose dose is dependent on kidney function, except in specific clinical situations or for a select group of anticancer drugs where eGFR CKD-EPI may be unsuitable." },
    { claim: "Consider GFR when dosing medicines cleared by the kidneys", grade: "Practice Point 4.2.1", source: "kdigo-2024", quote: "Consider GFR when dosing medications cleared by the kidneys." },
    { claim: "Validated creatinine-based eGFR equations are appropriate for drug dosing for most people", grade: "Practice Point 4.2.2", source: "kdigo-2024", quote: "For most people and clinical settings, validated eGFR equations using SCr are appropriate for drug dosing." },
  ],
  sources: [
    {
      key: "addikd-part1-2025",
      label: "Aligning kidney function assessment in patients with cancer to global practices in internal medicine (ADDIKD, Part 1)",
      publisher: "eClinicalMedicine (Sandhu et al., ADDIKD Working Group, eviQ / Cancer Institute NSW)",
      year: 2025,
      url: "https://doi.org/10.1016/j.eclinm.2025.103102",
      doi: "10.1016/j.eclinm.2025.103102",
      gradingScheme: "GRADE-informed consensus: evidence quality or certainty (here 'clinical consensus') and strength of recommendation, strong or conditional.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "addikd-integration-2025",
      label: "Integrating International Consensus Guidelines for Anticancer Drug Dosing in Kidney Dysfunction (ADDIKD) into everyday practice",
      publisher: "eClinicalMedicine (Sandhu et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.eclinm.2025.103161",
      doi: "10.1016/j.eclinm.2025.103161",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "krens-2023",
      label: "Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update",
      publisher: "The Lancet Oncology (Krens et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/S1470-2045(23)00216-4",
      doi: "10.1016/S1470-2045(23)00216-4",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["carboplatin", "cisplatin", "methotrexate"],
  related: ["carboplatin-dose-calculation", "sact-prescribing-and-pharmacy-verification"],
  terms: ["pharmacokinetics"],
  upgrades: [],
  gaps: [
    "The drug-by-drug ADDIKD recommendations (dose by KDIGO category for each of 59 drugs) sit in the eviQ quick reference tool and supplementary appendices, which were not read; this protocol does not give individual drug doses.",
    "The Lancet Oncology recommendations (Krens et al., 2019 and the 2023 update), the reference UK pharmacists name most often, could not be read.",
    "ADDIKD rests on consensus and observational data; no randomised trial compares eGFR-based with creatinine-clearance-based dosing on outcomes, and its uptake outside Australia is not yet measured.",
    "Dosing on dialysis and after kidney transplant is outside ADDIKD's scope and is not covered here.",
  ],
});
