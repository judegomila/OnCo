import { protocol } from "./helpers";

/*
 * Working out a carboplatin dose from kidney function with the Calvert formula, in adults.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or urllib into a scratch directory and read as
 * text):
 * - ADDIKD (International Consensus Guideline for Anticancer Drug Dosing in Kidney Dysfunction), Part 1, kidney
 *   function assessment (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103102, PMC12034077): full
 *   text, Europe PMC XML. Recommendation strengths and certainty quoted as printed.
 * - ADDIKD integration paper (Sandhu et al., eClinicalMedicine 2025, DOI 10.1016/j.eclinm.2025.103161, PMC12034076):
 *   full text, Europe PMC XML. Its carboplatin section and Table 3 compare ADDIKD with older guidance.
 * - KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD (Kidney Int 2024;105(4S):S117-S314,
 *   DOI 10.1016/j.kint.2023.10.018): full text, PDF from kdigo.org with pdftotext. Quotes are taken only from the
 *   single-column summary of practice points, because the two-column body text interleaves in the extracted text.
 * - US prescribing information for carboplatin injection (Accord Healthcare, DailyMed set id
 *   48aa7ef3-9f44-2a08-e054-00144ff88e88, effective 6 November 2026): full text, SPL XML.
 * - Calvert et al., J Clin Oncol 1989 (DOI 10.1200/JCO.1989.7.11.1748): abstract only, Europe PMC.
 * - Janowitz et al., J Clin Oncol 2017 (DOI 10.1200/JCO.2017.72.7578): abstract only, Europe PMC.
 * - Samani et al., ESMO Open 2022 (DOI 10.1016/j.esmoop.2022.100401, PMC9058909): full text, Europe PMC XML.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF from bopa.org.uk (copy read by the first protocol agent, in a scratch directory).
 * - The NCI CTEP information letter on capping the GFR used in the Calvert formula could not be read: the CTEP
 *   address now redirects to a general NCI page and the Internet Archive refused repeated requests (HTTP 429). No cap is
 *   stated here.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const carboplatinDoseCalculation = protocol({
  id: "carboplatin-dose-calculation",
  name: "Carboplatin dose calculation by the Calvert formula and kidney function",
  aka: ["Calvert formula", "carboplatin AUC dosing", "carboplatin dose by GFR", "AUC 5 carboplatin", "carboplatin GFR", "EDTA GFR for carboplatin", "carboplatin Cockcroft-Gault"],
  domain: "pharmacy",
  tldr: "Carboplatin is not dosed by your size but by how well your kidneys clear it. The team picks a target exposure (the 'AUC', often 5 or 6) and multiplies it by your kidney filtration rate plus 25. Your kidney function is either measured with a special test or estimated from a blood test, and the newest international guidance prefers the measured test when treatment aims to cure.",
  simple: "Carboplatin doses come from a sum using your kidney function. A blood test, or a special kidney scan or injection test, tells the team how fast your kidneys work, and the dose is worked out from that.",
  summary: "The Calvert formula (1989) gives the total dose in mg as target AUC x (GFR + 25). It was derived and validated with GFR measured by 51Cr-EDTA clearance, and the US label prints it with that note. The kidney function fed into it is where practice differs.\n\nADDIKD (2025), the first international consensus on anticancer drug dosing in kidney dysfunction, prefers directly measured GFR, not standardised to body surface area, especially with curative intent, extremes of body size or muscle mass, amputation or paraplegia, or an eGFR above 125 or at or below 45 ml/min/1.73 m2. Where measured GFR is not feasible, it recommends eGFR by CKD-EPI de-indexed to the patient's own BSA (clinical consensus; strong). KDIGO 2024 says non-indexed eGFR may be indicated at extremes of body weight for narrow-therapeutic-range drugs, and its text names carboplatin. Much of the world still uses Cockcroft-Gault creatinine clearance, which overestimates GFR by 10 to 20% and, with modern IDMS-standardised creatinine assays, can overdose: in a UK cohort of 2,471 patients, 25.5% of Cockcroft-Gault doses were more than 20% off against 18.6% for BSA-adjusted CKD-EPI (Janowitz 2017).\n\nADDIKD advises against lowering the target AUC because of reduced kidney function, and against recalculating each cycle unless kidney function changes by more than 20% or the patient's condition changes. In the UK, adult doses are then banded to national tables (BOPA 2025) and the pharmacist checks the AUC calculation at verification.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist"],
    where: ["outpatient-clinic", "aseptic-unit", "chemotherapy-day-unit"],
  },
  population: "Adults prescribed carboplatin, alone or in combination, for any cancer. ADDIKD notes that eGFR CKD-EPI is unsuitable in kidney replacement therapy, pregnancy and people under 18; children are dosed by protocol, often from a measured GFR (BOPA notes the AUC dose is usually calculated from the DTPA half life).",
  trigger: "Carboplatin is prescribed for a first cycle, or kidney function or weight changes during a course.",
  steps: [
    {
      action: "Calculate the total carboplatin dose in mg as target AUC x (GFR + 25), not in mg per square metre",
      why: "Carboplatin leaves the body almost entirely through the kidneys, so the dose that gives a predictable exposure depends on kidney function rather than body size.",
      source: "calvert-1989",
      quote: "Dose (mg) = target AUC x (GFR + 25) is now the recommended formula.",
    },
    {
      action: "Take the target AUC from the regimen protocol; for single-agent carboplatin in previously treated patients the label range is 4 to 6",
      why: "Higher AUC gives more blood count toxicity, and combination regimens use their own targets.",
      source: "carboplatin-label",
      quote: "The target AUC of 4 mg/mL•min to 6 mg/mL•min using single agent carboplatin appears to provide the most appropriate dose range in previously treated patients.",
    },
    {
      action: "Use directly measured GFR (for example an isotope or iohexol clearance), not standardised to body surface area, where it is available, and especially when treatment aims to cure",
      why: "The formula was built on measured GFR; estimates drift furthest from the truth in people with very high or low kidney function or unusual body build.",
      source: "addikd-integration-2025",
      quote: "ADDIKD proposes that directly measured GFR (not standardised to body surface area [BSA]) as the preferred kidney function value to be used to mirror the original Calvert formula study.",
      grade: "clinical consensus; strong",
    },
    {
      action: "If measured GFR is not feasible, use eGFR from the CKD-EPI equation adjusted to the patient's own body surface area (in ml/min), rather than Cockcroft-Gault creatinine clearance",
      why: "BSA-adjusted CKD-EPI is closer to measured GFR than Cockcroft-Gault in people with cancer, so the dose is closer to the intended one.",
      source: "addikd-part1-2025",
      quote: "BSA-adjusted eGFR CKD-EPI is a suitable alternative to directly measured GFR for use in the Calvert formula when dosing carboplatin, especially where eGFR CKD-EPI 45–125 mL/min/1.73 m 2 , treatment intent is non-curative and the patient is neither an amputee, paraplegic or has conditions of skeletal muscle and is without extremes of body size or muscle mass.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Use a creatinine result taken while kidney function is stable and as close as possible to the treatment day",
      why: "A creatinine estimate assumes steady kidney function; after an acute kidney injury the blood level can lag one to three days behind.",
      source: "addikd-part1-2025",
      quote: "eGFR CKD-EPI requires stable kidney function and should be performed as close as possible to the time of administering the anticancer drug(s) to ensure it is a reflective estimation of the patient’s steady state kidney function.",
      grade: "clinical consensus; strong",
    },
    {
      action: "Do not lower the target AUC because kidney function is reduced; the formula already lowers the dose",
      why: "Reducing both the GFR and the AUC would cut the dose twice and may cost treatment benefit.",
      source: "addikd-integration-2025",
      quote: "This includes a recommendation against lowering target AUC in reduced kidney function, as it may compromise clinical benefit.",
    },
    {
      action: "Recalculate during the course when kidney function changes by more than 20% from baseline or the patient's condition changes",
      why: "Small cycle-to-cycle wobbles in creatinine do not need a new dose; a real change in kidney function does.",
      source: "addikd-integration-2025",
      quote: "The recalculation of carboplatin doses at each cycle was also deemed unnecessary, except when baseline kidney function (e.g., eGFR) alters by > 20% or when there is a change in the clinical status of the patient.",
    },
    {
      action: "Have the pharmacist check the AUC calculation and units at verification, and band the final adult dose where national bands exist",
      why: "An independent check catches arithmetic and unit errors before the drug is made.",
      source: "bopa-2025",
      quote: "Check drug dose calculations (Flat, BSA, weight, AUC) and units are appropriate.",
    },
    {
      action: "When rechecking a banded carboplatin dose, recalculate from the new kidney function; do not work out a percentage change from the old banded dose",
      why: "A banded dose is already rounded, so comparing against it can hide or exaggerate a real change.",
      source: "bopa-2025",
      quote: "Warning: it is NOT appropriate to use the previous banded dose to work out a percentage dose change threshold as this risks under or overestimating the actual carboplatin dose when banding.",
    },
  ],
  bestInClass: {
    statement: "Dose = target AUC x (GFR + 25), with GFR measured directly (not BSA-indexed) where available and always for curative treatment, extremes of body size or muscle mass, or an eGFR above 125 or at or below 45 ml/min/1.73 m2 (ADDIKD 2025, clinical consensus, strong). Where measured GFR is not feasible, ADDIKD and KDIGO 2024 favour CKD-EPI eGFR de-indexed to the patient's BSA over Cockcroft-Gault, supported by the 2,471-patient Cambridge cohort (Janowitz 2017) and the UK gynaecological cohorts of Samani 2022. Do not lower the AUC for kidney function; recalculate when kidney function changes by more than 20%. Guidance disagrees on the estimate: the US label and much software still use creatinine clearance, and the Gynecologic Oncology Group recommended Cockcroft-Gault with adjusted body weight above a BMI of 25.",
    sources: ["addikd-part1-2025", "addikd-integration-2025", "kdigo-2024", "janowitz-2017", "samani-2022", "calvert-1989"],
  },
  variants: [
    {
      name: "Cockcroft-Gault creatinine clearance in the formula",
      differs: "Estimates GFR as creatinine clearance by Cockcroft-Gault, sometimes with ideal or adjusted body weight, and puts that into the formula. The US label's renal dose table for single-agent carboplatin is set in creatinine clearance bands.",
      evidence: "Cockcroft-Gault was built on 249 hospitalised men with a creatinine assay that predates IDMS standardisation, and overestimates GFR by 10 to 20% (ADDIKD). In 2,471 UK patients it gave a dose more than 20% off in 25.5% against 18.6% for BSA-adjusted CKD-EPI (Janowitz 2017). In two UK centres, unadjusted Cockcroft-Gault and Wright performed worst and adjusted-body-weight Cockcroft-Gault among the best (Samani 2022).",
      sources: ["addikd-part1-2025", "janowitz-2017", "samani-2022", "carboplatin-label"],
    },
    {
      name: "Adjusted body weight in Cockcroft-Gault above a BMI of 25 (Gynecologic Oncology Group)",
      differs: "Uses adjusted rather than actual body weight in Cockcroft-Gault for patients with a BMI of 25 or more, to avoid overestimating clearance in larger people.",
      evidence: "Recommended by the GOG after the switch to IDMS creatinine assays, as cited by Samani 2022, where CG with adjusted body weight was among the most accurate estimators against nuclear medicine GFR in two UK cohorts. The GOG document itself was not read.",
      sources: ["samani-2022"],
    },
    {
      name: "AUC 6 with an estimate, converted to AUC 5 with measured GFR",
      differs: "Some UK centres and trials dose at AUC 6 when GFR is estimated and AUC 5 when it is measured, on the reasoning that estimates run low.",
      evidence: "Samani 2022 found this practice in its survey and that dosing on AUC 6 with an estimate carried a risk of overdosing compared with measured GFR at AUC 5; it advises centres to avoid it.",
      sources: ["samani-2022"],
    },
    {
      name: "A cancer-specific GFR model (CamGFR)",
      differs: "Estimates GFR with a model developed in people with cancer at Cambridge University Hospitals rather than CKD-EPI.",
      evidence: "In 2,471 patients it reduced doses more than 20% off to 14.2% (Janowitz 2017), and version 2 was the most accurate estimator in the UK gynaecological cohorts (Samani 2022). Not adopted by ADDIKD or KDIGO.",
      sources: ["janowitz-2017", "samani-2022"],
    },
  ],
  grades: [
    { claim: "eGFR by CKD-EPI to assess kidney function, except where measured GFR is clinically necessary", grade: "Evidence quality/certainty: clinical consensus; strength of recommendation: strong", source: "addikd-part1-2025", quote: "We recommend the use of estimated glomerular filtration rate calculated via the Chronic Kidney Disease—Epidemiology Collaboration (eGFR CKD-EPI ) equation to guide the assessment of kidney function, except where directly measured glomerular filtration rate (GFR) is clinically necessary." },
    { claim: "eGFR CKD-EPI to guide dosing of kidney-dependent anticancer drugs, with measured GFR preferred for carboplatin, cisplatin and others in specific situations", grade: "Evidence quality/certainty: clinical consensus; strength of recommendation: strong", source: "addikd-part1-2025", quote: "We recommend eGFR CKD-EPI to guide the dosing of anticancer drugs whose dose is dependent on kidney function, except in specific clinical situations or for a select group of anticancer drugs where eGFR CKD-EPI may be unsuitable." },
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
      gradingScheme: "GRADE-informed consensus: evidence quality or certainty (here 'clinical consensus') and strength of recommendation, strong or conditional.",
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
      key: "carboplatin-label",
      label: "Carboplatin injection, US prescribing information (Accord Healthcare)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=48aa7ef3-9f44-2a08-e054-00144ff88e88",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "calvert-1989",
      label: "Carboplatin dosage: prospective evaluation of a simple formula based on renal function",
      publisher: "Journal of Clinical Oncology (Calvert et al.)",
      year: 1989,
      url: "https://doi.org/10.1200/JCO.1989.7.11.1748",
      doi: "10.1200/JCO.1989.7.11.1748",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "janowitz-2017",
      label: "New Model for Estimating Glomerular Filtration Rate in Patients With Cancer",
      publisher: "Journal of Clinical Oncology (Janowitz et al.)",
      year: 2017,
      url: "https://doi.org/10.1200/JCO.2017.72.7578",
      doi: "10.1200/JCO.2017.72.7578",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "samani-2022",
      label: "Glomerular filtration rate estimation for carboplatin dosing in patients with gynaecological cancers",
      publisher: "ESMO Open (Samani et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/j.esmoop.2022.100401",
      doi: "10.1016/j.esmoop.2022.100401",
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
  ],
  drugs: ["carboplatin"],
  technologies: ["carboplatin-calvert-dosing"],
  terms: ["pharmacokinetics"],
  related: ["paper-calvert-j-clin-oncol", "sact-prescribing-and-pharmacy-verification", "iohexol"],
  upgrades: ["idea-upgrade-carboplatin-gfr-estimate-outcome-study"],
  gaps: [
    "No ESMO, ASCO or NICE guideline on carboplatin dose calculation exists to compare with ADDIKD; ADDIKD is a consensus (its carboplatin recommendations rest on clinical consensus), and its uptake outside Australia is not yet known.",
    "Many trial protocols cap the GFR entered into the formula; the NCI CTEP letter that is the usual source could not be read, so no cap figure is given here. ADDIKD handles high estimates differently, asking for measured GFR when eGFR is above 125 ml/min/1.73 m2.",
    "The Gynecologic Oncology Group's adjusted-body-weight guidance is cited only through Samani 2022; the original was not read.",
    "The Calvert and Janowitz papers were read as abstracts only.",
    "Which estimate to use in obesity, cachexia and after amputation is not settled by trials; ADDIKD asks for measured GFR in these people, which many centres cannot provide quickly.",
  ],
});
