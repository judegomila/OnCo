import { protocol } from "./helpers";

/*
 * Working out a carboplatin dose from kidney function with the Calvert formula, in adults.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source below was fetched again
 * that day as raw text (curl into a scratch directory; pdftotext for PDFs; tags stripped by script for XML), every
 * quote was re-checked by script against that text, and each claim was re-read against its passage.
 * - ADDIKD (International Consensus Guideline for Anticancer Drug Dosing in Kidney Dysfunction), Part 1, kidney
 *   function assessment (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103102, PMC12034077): full
 *   text, Europe PMC XML. The graded items are its three numbered recommendations; points 1.1 to 2.4 sit under them.
 * - ADDIKD integration paper (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103161, PMC12034076):
 *   full text, Europe PMC XML. Its carboplatin section was read; the body of its Table 3 is an image and was not.
 * - KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD (Kidney Int 2024;105(4S):S117-S314,
 *   DOI 10.1016/j.kint.2023.10.018): full text, PDF from kdigo.org with pdftotext. Quotes are taken only from the
 *   single-column summary of practice points, because the two-column body text interleaves in the extracted text.
 * - US prescribing information for carboplatin injection (Accord Healthcare, DailyMed set id
 *   48aa7ef3-9f44-2a08-e054-00144ff88e88, version 9, effective 6 November 2026): full text, SPL XML.
 * - Calvert et al., J Clin Oncol 1989 (DOI 10.1200/JCO.1989.7.11.1748): abstract only, Europe PMC.
 * - Janowitz et al., J Clin Oncol 2017 (DOI 10.1200/JCO.2017.72.7578, PMC5562175): full text, Europe PMC XML (the
 *   first pass had read the abstract only).
 * - Samani et al., ESMO Open 2022 (DOI 10.1016/j.esmoop.2022.100401, PMC9058909): full text, Europe PMC XML. Its 2023
 *   corrigendum (DOI 10.1016/j.esmoop.2022.100640) returned only its title, not its text.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025): full
 *   text, PDF from bopa.org.uk with pdftotext.
 * - NRG Oncology protocol NRG-GY027 (version date 22 December 2023), Appendix IV, carboplatin dose calculation
 *   instructions: full text, PDF posted on ClinicalTrials.gov (NCT05276973) with pdftotext. Added in the second pass.
 * - NCI CTEP follow-up information letter on AUC-based dosing of carboplatin (22 October 2010): the CTEP address still
 *   redirects to a general NCI page, but a copy is held in the University of North Texas web archive. It is a scanned
 *   image with no text layer, so it was read by eye and by OCR and nothing is quoted from it. Added in the second pass.
 * - The FDA's own 2010 notice on carboplatin dosing could not be read: its fda.gov address returns "Page Not Found"
 *   and the FDA.gov archive answered with a browser check, which was not worked round.
 *
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed; no sentence with a flattened superscript is quoted.
 */
export const carboplatinDoseCalculation = protocol({
  id: "carboplatin-dose-calculation",
  name: "Carboplatin dose calculation by the Calvert formula and kidney function",
  aka: ["Calvert formula", "carboplatin AUC dosing", "carboplatin dose by GFR", "AUC 5 carboplatin", "carboplatin GFR", "EDTA GFR for carboplatin", "carboplatin Cockcroft-Gault", "carboplatin maximum dose", "carboplatin GFR cap"],
  domain: "pharmacy",
  tldr: "Carboplatin is usually dosed not by your size but by how well your kidneys clear it. The team picks a target exposure (the 'AUC', often 5 or 6) and multiplies it by your kidney filtration rate plus 25. Your kidney function is either measured with a special test or estimated from a blood test. International guidance from 2025 prefers the measured test, most of all when treatment aims to cure.",
  simple: "Carboplatin doses come from a sum using your kidney function. A blood test, or a special kidney scan or injection test, tells the team how fast your kidneys work, and the dose is worked out from that.",
  summary: "The Calvert formula (1989) gives the total dose in mg as target AUC x (GFR + 25). It was developed with directly measured GFR, and the US label prints it with the note that GFR was measured by 51Cr-EDTA clearance. The kidney function fed into it is where practice differs.\n\nADDIKD (2025), an international consensus on anticancer drug dosing in kidney dysfunction, prefers directly measured GFR, not standardised to body surface area, for any level of kidney function. It accepts eGFR by CKD-EPI adjusted to the patient's own BSA as a suitable alternative, especially where eGFR is 45 to 125 ml/min/1.73 m2, treatment is not curative and the patient has no extreme of body size or muscle mass, amputation, paraplegia or muscle condition. KDIGO 2024 says BSA-adjusted eGFR may be indicated for carboplatin dosing and that measured GFR may be the preferred method for the first dose. ADDIKD notes that creatinine clearance overestimates GFR by 10 to 20% and that Cockcroft-Gault was developed on creatinine assays that were not standardised. In 2,471 white adults at one UK centre, 25.51% of Cockcroft-Gault doses were more than 20% off against 18.62% for BSA-adjusted CKD-EPI (Janowitz 2017).\n\nUS trial practice differs. The NCI's letter of 22 October 2010, written as laboratories moved to IDMS-standardised creatinine, said the GFR used in the formula should not exceed 125 ml/min, which gives maximum doses of 900 mg at AUC 6, 750 mg at AUC 5 and 600 mg at AUC 4. NRG Oncology trial instructions (2023) keep that ceiling and those maximum doses, use Cockcroft-Gault with a minimum creatinine of 0.7 mg/dL, and use adjusted body weight at a BMI of 25 or more. ADDIKD sets no ceiling and asks for measured GFR when eGFR is above 125 ml/min/1.73 m2. The US label read here prints no ceiling.\n\nADDIKD advises against lowering the target AUC because of reduced kidney function, and considers recalculation at each cycle unnecessary unless kidney function changes by more than 20% or the patient's condition changes. NRG trials recalculate for renal toxicity or a weight change of 10% or more. In the UK, BOPA (2025) leaves the method and the recalculation threshold to local policy, adult doses are banded to national tables, and the pharmacist checks the AUC calculation at verification.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist"],
    where: ["outpatient-clinic", "aseptic-unit", "chemotherapy-day-unit"],
  },
  population: "Adults prescribed carboplatin, alone or in combination, for any cancer. ADDIKD says eGFR by CKD-EPI is unsuitable in kidney replacement therapy, in pregnant women and in patients under 18. Children are outside this page: BOPA notes that in paediatrics the AUC dose is usually calculated from the DTPA half life and that dose banding is not usually used in children.",
  trigger: "Carboplatin is prescribed for a first cycle, or kidney function or weight changes during a course.",
  steps: [
    {
      action: "Calculate the total carboplatin dose in mg as target AUC x (GFR + 25), not in mg per square metre",
      why: "The kidneys are the main route by which carboplatin leaves the body, and the formula was built from the link between kidney filtration and how fast the drug is cleared.",
      source: "calvert-1989",
      quote: "Dose (mg) = target AUC x (GFR + 25) is now the recommended formula.",
    },
    {
      action: "Take the target AUC from the regimen protocol; the US label gives 4 to 6 as the most appropriate range for single-agent carboplatin in previously treated patients",
      why: "In the label's table, severe falls in platelets and white cells were more common at an AUC of 6 to 7 (33% and 34%) than at 4 to 5 (16% and 13%). Calvert's paper says the target has to be set again for combination chemotherapy.",
      source: "carboplatin-label",
      quote: "The target AUC of 4 mg/mL•min to 6 mg/mL•min using single agent carboplatin appears to provide the most appropriate dose range in previously treated patients.",
    },
    {
      action: "Use directly measured GFR (for example an isotope or iohexol clearance), not standardised to body surface area, where it is available, and especially when treatment aims to cure",
      why: "The formula was built on measured GFR, and ADDIKD says estimates become less reliable at very high or low kidney function and at extremes of body size or muscle mass.",
      source: "addikd-part1-2025",
      quote: "Following discussion and review of data on accuracy of the various kidney function estimates and their application in the Calvert formula, the clinical consensus was that directly measured GFR is the preferred kidney function value when calculating carboplatin doses with the Calvert formula for any kidney function.",
      grade: "clinical consensus; strong (the grade of ADDIKD recommendation 2, which this point sits under)",
    },
    {
      action: "If measured GFR is not feasible, ADDIKD's alternative is eGFR from the CKD-EPI equation adjusted to the patient's own body surface area (in ml/min), rather than Cockcroft-Gault creatinine clearance",
      why: "ADDIKD reports that a dose worked out from BSA-adjusted CKD-EPI is more accurate than one worked out from Cockcroft-Gault creatinine clearance. It calls the estimate a suitable alternative especially where eGFR is 45 to 125 ml/min/1.73 m2 and treatment is not curative.",
      source: "addikd-integration-2025",
      quote: "In these situations where the decision is made to use estimated kidney function values instead of the gold standard directly measured GFR, the use of BSA-adjusted estimated GFR as the kidney function value in the Calvert formula is recommended by expert clinical consensus.",
      grade: "expert clinical consensus",
    },
    {
      action: "Use a creatinine result taken while kidney function is stable and as close as possible to the treatment day",
      why: "A creatinine estimate assumes steady kidney function; ADDIKD notes that after a kidney injury the peak in blood creatinine can lag 24 to 72 hours behind.",
      source: "addikd-part1-2025",
      quote: "eGFR CKD-EPI requires stable kidney function and should be performed as close as possible to the time of administering the anticancer drug(s) to ensure it is a reflective estimation of the patient’s steady state kidney function.",
      grade: "clinical consensus; strong (the grade of ADDIKD recommendation 1, which this point sits under)",
    },
    {
      action: "Do not lower the target AUC because kidney function is reduced",
      why: "ADDIKD's reason is that a lower target may compromise the benefit of treatment. The formula itself already gives a smaller dose when the GFR is lower.",
      source: "addikd-integration-2025",
      quote: "This includes a recommendation against lowering target AUC in reduced kidney function, as it may compromise clinical benefit.",
    },
    {
      action: "Recalculate during the course when kidney function changes by more than 20% from baseline or the patient's condition changes; where a local or trial protocol sets a different rule, follow it",
      why: "ADDIKD judged a new calculation at every cycle unnecessary. Other bodies set the trigger differently: NRG Oncology trials recalculate for renal toxicity or a weight change of 10% or more, and BOPA leaves the threshold to local policy.",
      source: "addikd-integration-2025",
      quote: "The recalculation of carboplatin doses at each cycle was also deemed unnecessary, except when baseline kidney function (e.g., eGFR) alters by > 20% or when there is a change in the clinical status of the patient.",
    },
    {
      action: "Where the local or trial protocol sets a ceiling on the GFR entered into the formula, apply it: NRG Oncology trials use 125 ml/min, which gives a maximum dose of 900 mg at AUC 6, 750 mg at AUC 5 and 600 mg at AUC 4",
      why: "A creatinine-based estimate can overstate kidney function in some people with normal kidneys, and the dose would then be higher than intended. ADDIKD does not set a ceiling; it asks for a measured GFR when the estimate is above 125 ml/min/1.73 m2.",
      source: "nrg-gy027-2023",
      quote: "NOTE: the GFR used in the Calvert formula should not exceed 125 ml/min.",
    },
    {
      action: "Have the pharmacist check the AUC calculation and units at verification, and band the final adult dose where national bands exist",
      why: "An independent check catches arithmetic and unit errors before the drug is made.",
      source: "bopa-2025",
      quote: "Check drug dose calculations (Flat, BSA, weight, AUC) and units are appropriate.",
    },
    {
      action: "When rechecking a banded carboplatin dose, recalculate from the most recent creatinine; do not work out a percentage change from the old banded dose",
      why: "A banded dose is already rounded, so comparing against it can under or overestimate the real dose.",
      source: "bopa-2025",
      quote: "Warning: it is NOT appropriate to use the previous banded dose to work out a percentage dose change threshold as this risks under or overestimating the actual carboplatin dose when banding.",
    },
  ],
  bestInClass: {
    statement: "Dose = target AUC x (GFR + 25), with GFR measured directly and not BSA-indexed as the preferred value (ADDIKD 2025, clinical consensus, under a strong recommendation), in particular for curative treatment, extremes of body size or muscle mass, amputation, paraplegia, or an eGFR above 125 or at or below 45 ml/min/1.73 m2. Where measured GFR is not feasible, ADDIKD recommends CKD-EPI eGFR adjusted to the patient's BSA over Cockcroft-Gault, and KDIGO 2024 says BSA-adjusted eGFR may be indicated for carboplatin dosing; in the Cambridge cohort of 2,471 patients BSA-adjusted CKD-EPI was the most accurate published model (Janowitz 2017). ADDIKD advises against lowering the AUC for kidney function and recalculates when kidney function changes by more than 20%. Guidance disagrees on the estimate and on a ceiling. NRG Oncology trials (2023) use Cockcroft-Gault with adjusted body weight at a BMI of 25 or more, a minimum creatinine of 0.7 mg/dL and a GFR ceiling of 125 ml/min; the NCI's 2010 letter set the same ceiling; ADDIKD sets none. The US label prints the formula with GFR measured by 51Cr-EDTA clearance and names no estimating equation. Samani 2022, in two UK gynaecological cohorts, found adjusted-body-weight Cockcroft-Gault and CamGFR v2 the best performers and did not report CKD-EPI in its main results. BOPA 2025 leaves the method to local policy.",
    sources: ["addikd-part1-2025", "addikd-integration-2025", "kdigo-2024", "janowitz-2017", "samani-2022", "calvert-1989", "nrg-gy027-2023", "ctep-2010", "carboplatin-label", "bopa-2025"],
  },
  variants: [
    {
      name: "Cockcroft-Gault creatinine clearance in the formula",
      differs: "Estimates GFR as creatinine clearance by Cockcroft-Gault and puts that into the formula. NRG Oncology trial instructions say the Cockcroft-Gault formula will be used in NRG Oncology trials and treat the estimated creatinine clearance as the GFR. BOPA lists Cockcroft and Gault as a calculated method and tells pharmacists to know their organisation's chosen method. The US label's renal dose table for single-agent carboplatin, in mg per square metre, is set in creatinine clearance bands; its Calvert section names no estimating equation.",
      evidence: "ADDIKD notes that Cockcroft-Gault was derived from 249 hospitalised men using creatinine assays that were not standardised, and that creatinine clearance overestimates GFR by 10 to 20%. In 2,471 white adults at one UK centre, with creatinine measured by the kinetic Jaffe method, it gave a dose more than 20% off in 25.51% against 18.62% for BSA-adjusted CKD-EPI (Janowitz 2017). In two UK centres, unadjusted Cockcroft-Gault and Wright performed worst and adjusted-body-weight Cockcroft-Gault among the best (Samani 2022). The integration paper says many prescribing software packages use creatinine clearance as the default.",
      sources: ["addikd-part1-2025", "addikd-integration-2025", "janowitz-2017", "samani-2022", "carboplatin-label", "nrg-gy027-2023", "bopa-2025"],
    },
    {
      name: "A ceiling on the GFR and a floor on the creatinine (NCI 2010, NRG Oncology trials)",
      differs: "Limits the GFR entered into the formula to 125 ml/min, so the dose cannot exceed target AUC x 150: 900 mg at AUC 6, 750 mg at AUC 5 and 600 mg at AUC 4. For an abnormally low creatinine, the NCI letter says to estimate GFR with a minimum creatinine of 0.6 mg/dL or to apply the 125 ml/min ceiling; NRG Oncology trial instructions use a minimum of 0.7 mg/dL when creatinine is below that. ADDIKD sets neither and asks for measured GFR when eGFR is above 125 ml/min/1.73 m2.",
      evidence: "The NCI's Cancer Therapy Evaluation Program issued the ceiling on 22 October 2010 as US laboratories moved to IDMS-standardised creatinine, reasoning that the new method in general gives lower creatinine values in people with normal kidney function, so an estimated GFR, and with it the dose, could come out higher than intended. The letter also says direct measurement of GFR may be preferable in some patients, such as those with low muscle mass. The letter is addressed to trial investigators and treating physicians and gives no outcome data; it is a scanned image and was read by eye. The NRG instructions (protocol version of 22 December 2023) print the same ceiling and the same three maximum doses.",
      sources: ["ctep-2010", "nrg-gy027-2023", "addikd-integration-2025"],
    },
    {
      name: "Adjusted body weight in Cockcroft-Gault at a BMI of 25 or more (Gynecologic Oncology Group, NRG Oncology)",
      differs: "Uses actual weight in Cockcroft-Gault for patients with a BMI below 25 and adjusted weight for a BMI of 25 or more. NRG Oncology trial instructions define adjusted weight as ideal weight plus 0.40 of the difference between actual and ideal weight.",
      evidence: "Samani 2022 reports that the GOG recommended this after laboratories moved to IDMS creatinine assays, because Cockcroft-Gault may overestimate GFR at higher weight. In its two UK cohorts, Cockcroft-Gault with adjusted body weight was the next most accurate estimator after CamGFR v2 against nuclear medicine GFR, and showed no obvious trend in bias across BMI quartiles. ADDIKD takes a different route in people with extremes of body size, preferring measured GFR.",
      sources: ["samani-2022", "nrg-gy027-2023", "addikd-part1-2025"],
    },
    {
      name: "AUC 6 with an estimate, converted to AUC 5 with measured GFR",
      differs: "Doses at AUC 6 when GFR is estimated and converts to AUC 5 once a measured GFR is available. Samani 2022 found this in some centres in its UK survey and says some large clinical trials recommended it; four trusts used AUC 6 in specific circumstances and none used it exclusively.",
      evidence: "Samani 2022 found that with every formula tested, most patients were theoretically overdosed by at least 10% when dosed on AUC 6 with an estimate compared with AUC 5 on measured GFR; it advises centres to avoid AUC 6 dosing.",
      sources: ["samani-2022"],
    },
    {
      name: "A cancer-specific GFR model (CamGFR)",
      differs: "Estimates GFR with a model developed in people with cancer at Cambridge University Hospitals rather than CKD-EPI.",
      evidence: "In 2,471 patients it reduced doses more than 20% off to 14.17% (Janowitz 2017, in white adults at one centre, which the authors name as a limit), and version 2 was the most accurate estimator in the UK gynaecological cohorts (Samani 2022). ADDIKD's recommendation names CKD-EPI, not this model, and the KDIGO 2024 text does not mention it.",
      sources: ["janowitz-2017", "samani-2022", "addikd-part1-2025", "kdigo-2024"],
    },
  ],
  grades: [
    { claim: "eGFR by CKD-EPI to assess kidney function, except where directly measured GFR is clinically necessary (ADDIKD recommendation 1)", grade: "Evidence quality/certainty: clinical consensus; strength of recommendation: strong", source: "addikd-part1-2025" },
    { claim: "eGFR CKD-EPI to guide dosing of kidney-dependent anticancer drugs, with measured GFR preferred for the first dose of carboplatin, cisplatin and others and in specific situations (ADDIKD recommendation 2)", grade: "Evidence quality/certainty: clinical consensus; strength of recommendation: strong", source: "addikd-part1-2025", quote: "We recommend eGFR CKD-EPI to guide the dosing of anticancer drugs whose dose is dependent on kidney function, except in specific clinical situations or for a select group of anticancer drugs where eGFR CKD-EPI may be unsuitable." },
    { claim: "Non-BSA-indexed eGFR at extremes of body weight, for narrow-therapeutic-range drugs", grade: "Practice Point 4.2.4", source: "kdigo-2024", quote: "In people with extremes of body weight, eGFR nonindexed for body surface area (BSA) may be indicated, especially for medications with a narrow therapeutic range or requiring a minimum concentration to be effective." },
  ],
  sources: [
    {
      key: "addikd-part1-2025",
      label: "Aligning kidney function assessment in patients with cancer to global practices in internal medicine (ADDIKD, Part 1)",
      publisher: "eClinicalMedicine (Sandhu et al., ADDIKD Working Group, eviQ / Cancer Institute NSW)",
      year: 2025,
      url: "https://doi.org/10.1016/j.eclinm.2025.103102",
      doi: "10.1016/j.eclinm.2025.103102",
      gradingScheme: "Consensus recommendations, each printed with an evidence quality or certainty (here 'clinical consensus') and a strength of recommendation (here 'strong'). The grade is printed for the three numbered recommendations; points 1.1 to 2.4 sit under them without grades of their own.",
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
      gradingScheme: "Describes ADDIKD's carboplatin recommendations in prose and prints no grades for them.",
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
      key: "carboplatin-label",
      label: "Carboplatin injection, US prescribing information (Accord Healthcare)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=48aa7ef3-9f44-2a08-e054-00144ff88e88",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "calvert-1989",
      label: "Carboplatin dosage: prospective evaluation of a simple formula based on renal function",
      publisher: "Journal of Clinical Oncology (Calvert et al.)",
      year: 1989,
      url: "https://doi.org/10.1200/JCO.1989.7.11.1748",
      doi: "10.1200/JCO.1989.7.11.1748",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "janowitz-2017",
      label: "New Model for Estimating Glomerular Filtration Rate in Patients With Cancer",
      publisher: "Journal of Clinical Oncology (Janowitz et al.)",
      year: 2017,
      url: "https://doi.org/10.1200/JCO.2017.72.7578",
      doi: "10.1200/JCO.2017.72.7578",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "samani-2022",
      label: "Glomerular filtration rate estimation for carboplatin dosing in patients with gynaecological cancers",
      publisher: "ESMO Open (Samani et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/j.esmoop.2022.100401",
      doi: "10.1016/j.esmoop.2022.100401",
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
      key: "nrg-gy027-2023",
      label: "NRG-GY027 protocol, Appendix IV: Carboplatin dose calculation instructions (version date 22 December 2023)",
      publisher: "NRG Oncology and the US National Cancer Institute, posted on ClinicalTrials.gov (NCT05276973)",
      year: 2023,
      url: "https://cdn.clinicaltrials.gov/large-docs/73/NCT05276973/Prot_SAP_001.pdf",
      gradingScheme: "Trial protocol instructions; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ctep-2010",
      label: "Follow-up for Information Letter Regarding AUC-Based Dosing of Carboplatin (22 October 2010)",
      publisher: "US National Cancer Institute, Cancer Therapy Evaluation Program (archived copy, University of North Texas web archive)",
      year: 2010,
      url: "https://webarchive.library.unt.edu/web/20130216045944/http://ctep.cancer.gov/content/docs/Carboplatin_Information_Letter.pdf",
      gradingScheme: "A letter to investigators; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["carboplatin"],
  technologies: ["carboplatin-calvert-dosing"],
  terms: ["pharmacokinetics"],
  related: ["paper-calvert-j-clin-oncol", "sact-prescribing-and-pharmacy-verification", "iohexol"],
  upgrades: ["idea-upgrade-carboplatin-gfr-estimate-outcome-study"],
  gaps: [
    "No ESMO, ASCO or NICE guideline on carboplatin dose calculation was found to compare with ADDIKD. The ASCO 2021 guideline on dosing in obese adults (DOI 10.1200/JCO.21.00471) could be read on 17 November 2026 only as an abstract, which recommends full weight-based chemotherapy doses and does not mention carboplatin or which weight to use in a kidney estimate.",
    "A Europe PMC search on 17 November 2026 found no UK consensus statement on kidney function for carboplatin dosing. BOPA's 2025 standards leave the method of calculation to local policy, so UK practice is not described here beyond that and the survey in Samani 2022. The BOPA web page that lists editions refused a script, so a version later than 5.0 could not be ruled out there; the address of the PDF still serves version 5.0.",
    "The FDA's own 2010 notice on carboplatin dosing could not be read on 17 November 2026: its fda.gov address returns a page-not-found message and the FDA.gov archive answered with a browser check. The ceiling of 125 ml/min is therefore attributed here to the NCI letter and the NRG instructions, not to the FDA. The US label read (Accord, version 9, November 2026) prints no ceiling.",
    "The NCI letter of 22 October 2010 survives as a scanned image in a university web archive; it was read by eye and by OCR, and nothing is quoted from it. The ceiling and the three maximum doses also appear as text in the NRG instructions. The minimum creatinine of 0.6 mg/dL rests on the scanned letter alone.",
    "The NRG Oncology instructions were read in one trial protocol (NRG-GY027, version of 22 December 2023). Whether NRG has issued a later version, and the Gynecologic Oncology Group's original statement on adjusted body weight, were not read.",
    "ADDIKD's carboplatin points on the target AUC and on recalculation are taken from the integration paper's description. The body of that paper's Table 3 is an image, and the full ADDIKD guideline on the eviQ site and its supplementary carboplatin recommendations were not read. The paper says adoption still needs endorsement from outside bodies and integration into trial protocols and prescribing systems.",
    "Samani 2022 has a corrigendum (ESMO Open 2023, DOI 10.1016/j.esmoop.2022.100640) whose text could not be read on 17 November 2026; this page states Samani's ranking of the estimators and its AUC 6 finding and would need checking against the correction.",
    "The Calvert paper was read as an abstract only. Janowitz 2017 studied white adults at one centre, with creatinine measured by the kinetic Jaffe method, and names the white-only population as a limit.",
    "KDIGO posted a public review draft of a 2027 focused update on medicines in October 2026. Its summary of statements does not mention carboplatin, and a draft is not guidance; the 2024 guideline is the edition in force.",
    "ADDIKD says eGFR may be unreliable at extremes of body size or muscle mass, after amputation and in paraplegia, and prefers measured GFR in these people, while acknowledging that access to and the cost of measured GFR can make it unfeasible in some settings. No source read here compares outcomes between the methods.",
  ],
});
