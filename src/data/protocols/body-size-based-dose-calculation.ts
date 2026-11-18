import { protocol } from "./helpers";

/*
 * Calculating anticancer doses from body surface area or weight, re-weighing during a course, and dosing people with
 * obesity, in adults.
 *
 * First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source fetched again as raw text
 * (curl, pdftotext, Europe PMC REST) and every quote checked by script, whitespace normalised only.
 * - ASCO guideline update, Appropriate Systemic Therapy Dosing for Obese Adult Patients With Cancer (Griggs et al.,
 *   J Clin Oncol 2021, DOI 10.1200/JCO.21.00471): abstract only, Europe PMC, re-read 17 November. ascopubs.org
 *   returned 403 to a script and there is no PubMed Central copy, so the full text, with its evidence ratings, the
 *   strength of each recommendation and any drug-by-drug exceptions, was not read. A Europe PMC search on 17 November
 *   found no later ASCO edition.
 * - ASCO guideline 2012 on chemotherapy dosing in obese adults (Griggs et al., J Clin Oncol 2012, DOI
 *   10.1200/JCO.2011.39.9436): abstract only, Europe PMC, re-read 17 November.
 * - The 2012 guideline's executive summary in Journal of Oncology Practice (Griggs, Mangu, Temin, Lyman, 2012, DOI
 *   10.1200/JOP.2012.000623, PMC3396831): added on 17 November. Full text read as HTML from PubMed Central with tags
 *   stripped by script. It reprints the guideline's table of recommendations (actual body weight, the fixed-dose
 *   exceptions, the vincristine cap, the choice of BSA formula) and prints no strength ratings.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): read in full on
 *   11 November 2026 from an Internet Archive capture. Re-read in full later on 17 November 2026 in
 *   the Oncology Nursing Society's open co-publication (the advance-print PDF offered on the ONS article page,
 *   Oncology Nursing Forum, July 2024, 51(4)), converted with pdftotext; a copy another checker fetched from ons.org
 *   the same day was re-used.
 *   ascopubs.org was not requested. Both quotes were checked by script. Corrected then: the quote for standard 3.9.8
 *   ran four list items together without the source's list markers, so it was replaced by one item copied whole; and
 *   the standard puts the dose calculation in the patient's medical record, which the page had put on the order.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025):
 *   full text, pdftotext of the PDF another checker fetched from bopa.org.uk on 17 November (re-used copy).
 * - Kemps et al., Eur J Hosp Pharm 2024 (DOI 10.1136/ejhpharm-2021-003215), frequency of weighing: abstract only;
 *   the publisher does not allow the PubMed Central XML to be downloaded.
 * - Tübingen dose-capping cohort, Arch Gynecol Obstet 2026 (DOI 10.1007/s00404-026-08317-2): full text, Europe PMC
 *   XML (PMC12872629).
 * - Chatelut et al., Br J Cancer 2012 (DOI 10.1038/bjc.2012.357), dose banding against BSA dosing: full text, Europe
 *   PMC XML (PMC3461153). It prints the DuBois formula.
 * - NHS England's dose banding pages returned an empty HTTP 202 response to a script again and were not read.
 *
 * Every DOI was resolved through Europe PMC and Crossref and its title checked. Quotes are copied with line breaks
 * joined only. The DuBois formula was recomputed for a 170 cm, 70 kg adult as a check (about 1.81 m2); that figure is
 * not on the page because no source prints it.
 */
export const bodySizeBasedDoseCalculation = protocol({
  id: "body-size-based-dose-calculation",
  name: "Body surface area and weight-based dose calculation for anticancer drugs, including full doses in obesity",
  aka: ["BSA dose calculation", "body surface area dosing", "mg/m2 dosing", "chemotherapy dose calculation", "dosing in obesity", "dose capping", "BSA capping", "actual body weight dosing", "re-weighing during chemotherapy", "chemotherapy dosing for obese patients"],
  domain: "pharmacy",
  tldr: "Most chemotherapy doses are worked out from your height and weight. American safety standards say both are measured in metric units and checked by two people before a new treatment starts, and your weight is rechecked during treatment. If you are a larger person, the American guideline says your dose should be based on your actual weight and given in full, not reduced because of your size.",
  simple: "Your dose comes from your height and weight, so the team measures them carefully. Bigger bodies get the full dose, because cutting it can make treatment work less well.",
  summary: "Most cytotoxic doses are expressed per square metre of body surface area (BSA), calculated from height and weight, or per kilogram. ASCO (2012) recommends any of the standard BSA formulae and finds no evidence to favour one. The two studies cited here used the DuBois formula, which Chatelut prints as 0.007184 x height (cm) to the power 0.725 x weight (kg) to the power 0.425; BOPA (2025) names the Boyd formula for children. Errors start at the scales: ASCO-ONS (2024) cites a study of 10,000 records in which 20% held height or weight errors, and requires height and weight in metric units, measured and documented and verified by two people, one a licensed clinician, before a new treatment plan is prepared. For each order the medical record must hold the calculation method, the variables, how often they are re-evaluated and what change prompts confirmation or recalculation. BOPA requires an up-to-date height, weight and BSA on the first prescription, weight updated during treatment at a minimum frequency set by local policy, and a local policy on when weight change triggers a new dose; it says adult doses should be banded where bands are available and that any BSA capping be documented.\n\nFor people with obesity, ASCO (2012) recommends actual body weight and full weight-based cytotoxic doses, particularly when the aim is cure, including for morbid obesity subject to other illnesses; the 2021 update keeps this and adds full approved doses of immunotherapy and targeted therapy. Toxicity is handled the same way as in anyone else. The 2012 guideline found that up to 40% of obese patients received limited doses and that fears of toxicity were unfounded. It allows fixed dosing to be considered only for select agents (carboplatin and bleomycin are its examples) and notes that vincristine is capped at 2.0 mg in CHOP and CVP. Capping persists: in a German cohort of 730 patients with early breast cancer capped at BSA 2.0 m2, those above 2.1 m2 had lower dose intensity and worse survival, with obesity a possible confounder. How often to re-weigh adults is unsettled; a 2,276-patient study found a BSA change of 10% or more in at most 7.6% of patients and advised weighing at least every three months in some groups and considering every six months for the rest.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "aseptic-unit", "ward"],
  },
  population: "Adults prescribed anticancer drugs dosed by body surface area or weight, including people with obesity. Children differ: BOPA asks for two separate weights before the first cycle, surface area by the Boyd formula, weight before every cycle, and doses and adjustments taken from the treatment protocol. Carboplatin is dosed by kidney function (see the carboplatin protocol), and flat-dosed drugs need no calculation.",
  trigger: "A new treatment plan is prescribed, or weight changes during a course.",
  steps: [
    {
      action: "Measure height and weight in metric units, record them, and have two people, one a licensed clinician, verify both before a new treatment plan is prepared",
      why: "The dose is worked out from these two numbers, so an error in either one changes the dose.",
      source: "asco-ons-2024",
      quote: "Weight and height are measured and documented in the medical record in metric units (eg, kg and cm). Both the measurement and documentation are verified by two individuals, one of whom is a licensed clinician, prior to preparation and administration of a newly prescribed antineoplastic treatment plan.",
    },
    {
      action: "Record the dose calculation in the medical record with the order: the method, the variables used, how often they will be re-evaluated and what change prompts confirmation or recalculation",
      why: "The first verification before the drug is prepared checks the dose calculations, including the variables used, so they have to be on record (standards 3.9.8 and 3.12.2.1.6).",
      source: "asco-ons-2024",
      quote: "The frequency at which variables are re-evaluated, such as weight or laboratory data",
    },
    {
      action: "Calculate body surface area with any of the standard formulae",
      why: "The 2012 guideline found no evidence that one formula is better than another, including for people with obesity.",
      source: "asco-obesity-2012-summary",
      quote: "The Panel recommends that BSA be calculated using any of the standard formulae. There is no evidence to support one formula for calculating BSA over another.",
    },
    {
      action: "Put an up-to-date height, weight and body surface area on the first prescription",
      why: "The person verifying the prescription needs the same numbers the prescriber used to check the dose independently.",
      source: "bopa-2025",
      quote: "Ensure an up-to-date height, weight and BSA (where relevant) is calculated and documented on the prescription.",
    },
    {
      action: "Use the person's actual body weight to select cytotoxic doses, whatever their size",
      why: "The 2012 guideline found no evidence that full weight-based doses cause more short-term or long-term toxicity in people with obesity.",
      source: "asco-obesity-2012-summary",
      quote: "The Panel recommends that actual body weight be used when selecting cytotoxic chemotherapy doses, regardless of obesity status.",
    },
    {
      action: "Give full weight-based cytotoxic doses to adults with obesity, particularly when treatment aims to cure",
      why: "The 2012 guideline, which stressed treatment that aims to cure, warned that reduced doses may lower disease-free and overall survival rates. The 2021 review again found that adults with obesity tolerate full doses as well as other patients.",
      source: "asco-obesity-2021",
      quote: "The Panel continues to recommend that full, weight-based cytotoxic chemotherapy doses be used to treat obese adults with cancer.",
    },
    {
      action: "Offer full approved doses of immunotherapy and targeted therapy to adults with obesity",
      why: "The 2021 update extended the full-dose recommendation to these drugs, while noting that fewer studies have looked at them in people with obesity.",
      source: "asco-obesity-2021",
      quote: "New to this version of the guideline, the Panel also recommends that full, approved doses of immunotherapy and targeted therapies be offered to obese adults with cancer.",
    },
    {
      action: "Consider a fixed dose only for the few drugs where it is established, and keep any maximum dose the regimen sets",
      why: "The 2012 guideline calls fixed dosing rarely justified. Its examples of select agents are carboplatin and bleomycin, and it notes the 2.0 mg vincristine cap in CHOP and CVP, set mainly because of nerve damage. BOPA asks the verifier to check that maximum doses for individual drugs, vincristine for example, are not exceeded.",
      source: "asco-obesity-2012-summary",
      quote: "The Panel recommends consideration of fixed dosing only with select cytotoxic agents (eg, carboplatin and bleomycin). On the basis primarily of neurotoxicity concerns, vincristine is capped at a maximum dose of 2.0 mg when used as part of the CHOP and CVP regimens.",
    },
    {
      action: "If side effects occur, handle dose changes in a person with obesity in the same way as in anyone else",
      why: "Toxicity, not body size, is the reason to change a dose.",
      source: "asco-obesity-2021",
      quote: "In the event of toxicity, the consensus of the Panel is that dose modifications of systemic antineoplastic therapies should be handled similarly for obese and nonobese patients.",
    },
    {
      action: "Recheck weight during treatment as often as local policy says, and recalculate the dose when it changes beyond the local threshold",
      why: "Weight loss or gain during treatment can make the original dose too high or too low.",
      source: "bopa-2025",
      quote: "There must be a local policy in place which determines when treatment doses should be recalculated if the patients’ weight changes during the course of treatment.",
    },
    {
      action: "For a child, check weight before every cycle",
      why: "The regimen and dose must stay suitable for the child's age and weight. BOPA also asks for two separate weights before the first cycle and surface area calculated with the Boyd formula.",
      source: "bopa-2025",
      quote: "Ensure weight checked prior to every cycle.",
    },
    {
      action: "Have a pharmacy professional check every calculation and its units at each cycle, and band adult doses where bands are available",
      why: "A second, independent calculation catches arithmetic and unit errors before the drug is prepared.",
      source: "bopa-2025",
      quote: "Check drug dose calculations (Flat, BSA, weight, AUC) and units are appropriate.",
    },
  ],
  bestInClass: {
    statement: "Metric height and weight, measured and verified by two people before a new plan (ASCO-ONS 2024); the calculation method, variables and recalculation triggers in the medical record for each order (ASCO-ONS 2024); an independent pharmacy check of every calculation (BOPA 2025); and actual body weight with full doses in obesity, for cytotoxics (ASCO 2012 and 2021) and, since 2021, immunotherapy and targeted therapy. ASCO 2012 accepts any standard BSA formula and reserves fixed dosing for select agents. For adults the sources set no re-weighing interval and no weight-change threshold; both are left to local policy, while BOPA asks for a child's weight before every cycle. BOPA notes that some clinicians cap BSA and asks that the decision be documented; ASCO recommends full weight-based doses, and no ASCO strength rating for that recommendation could be read.",
    sources: ["asco-ons-2024", "bopa-2025", "asco-obesity-2021", "asco-obesity-2012", "asco-obesity-2012-summary"],
  },
  variants: [
    {
      name: "Capping body surface area (for example at 2.0 m2)",
      differs: "Doses are calculated from a maximum BSA for larger patients; 2.0 m2 was the cap in the Tübingen cohort. BOPA notes that some clinicians cap BSA as individual or local practice and asks that the decision be documented in the treatment plan.",
      evidence: "ASCO 2012 found up to 40% of obese patients received limited doses not based on actual body weight, and recommended actual body weight and full weight-based doses. In 730 patients with early breast cancer at Tübingen, capping at 2.0 m2 meant those above 2.1 m2 received median relative dose intensity of 83.9% against 92.6%, and had worse 5-year overall survival (85.5% against 94.3%); the authors could not separate obesity itself from underdosing, and read their findings as supporting ASCO's position against routine capping when the aim is cure.",
      sources: ["bopa-2025", "asco-obesity-2012", "asco-obesity-2012-summary", "tubingen-capping-2026"],
    },
    {
      name: "Less frequent re-weighing",
      differs: "Weighs at least every three months for acute leukaemia, lymphoma, pancreatic cancer and people under 20, and considers every six months for others, rather than monthly.",
      evidence: "In 2,276 adults having chemotherapy over two years, a BSA change of 10% or more occurred in at most 7.6%, depending on tumour type; in the tumour types with more than 100 patients such changes occurred after 84 days (Kemps 2024, abstract). The authors assumed that a 10% change in BSA is what requires a new dose. ASCO-ONS cites the same study and leaves the interval to the organisation.",
      sources: ["kemps-2024", "asco-ons-2024"],
    },
    {
      name: "Dose banding instead of individual BSA dosing",
      differs: "Patients are grouped into BSA bands and given a standard prepared dose per band, so doses can be made in advance.",
      evidence: "Using clearance data from 1,012 adults and six drugs, banding changed individual doses by minus 14% to plus 22% with no significant difference in precision in reaching the target exposure, except for paclitaxel (Chatelut 2012). BOPA says adult doses should be banded where bands are available, and that banding is not usually used in children.",
      sources: ["chatelut-2012", "bopa-2025"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "asco-obesity-2021",
      label: "Appropriate Systemic Therapy Dosing for Obese Adult Patients With Cancer: ASCO Guideline Update",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology, Griggs et al.)",
      year: 2021,
      url: "https://doi.org/10.1200/JCO.21.00471",
      doi: "10.1200/JCO.21.00471",
      gradingScheme: "ASCO rates evidence quality and recommendation strength in the full text; not read here.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "asco-obesity-2012",
      label: "Appropriate chemotherapy dosing for obese adult patients with cancer: American Society of Clinical Oncology clinical practice guideline",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology, Griggs et al.)",
      year: 2012,
      url: "https://doi.org/10.1200/JCO.2011.39.9436",
      doi: "10.1200/JCO.2011.39.9436",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "asco-obesity-2012-summary",
      label: "Appropriate Chemotherapy Dosing for Obese Adult Patients With Cancer: American Society of Clinical Oncology Clinical Practice Guideline (executive summary, with the guideline's table of recommendations)",
      publisher: "American Society of Clinical Oncology (Journal of Oncology Practice, Griggs et al.)",
      year: 2012,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3396831/",
      doi: "10.1200/JOP.2012.000623",
      gradingScheme: "The table of recommendations prints no strength or evidence rating.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from literature reviews, expert panel opinion and public comment.",
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
      key: "kemps-2024",
      label: "Frequency of measuring body weight in (sub)populations of patients with cancer treated with chemotherapy",
      publisher: "European Journal of Hospital Pharmacy (Kemps et al.)",
      year: 2024,
      url: "https://doi.org/10.1136/ejhpharm-2021-003215",
      doi: "10.1136/ejhpharm-2021-003215",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "tubingen-capping-2026",
      label: "Impact of chemotherapy dose capping on treatment intensity and survival in early breast cancer patients with high body surface area",
      publisher: "Archives of Gynecology and Obstetrics (Englisch et al.)",
      year: 2026,
      url: "https://doi.org/10.1007/s00404-026-08317-2",
      doi: "10.1007/s00404-026-08317-2",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "chatelut-2012",
      label: "Dose banding as an alternative to body surface area-based dosing of chemotherapeutic agents",
      publisher: "British Journal of Cancer (Chatelut et al.)",
      year: 2012,
      url: "https://doi.org/10.1038/bjc.2012.357",
      doi: "10.1038/bjc.2012.357",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["chemotherapy-dosing-in-obesity"],
  related: ["body-surface-area-dosing", "carboplatin-dose-calculation", "sact-prescribing-and-pharmacy-verification"],
  terms: ["pharmacokinetics"],
  upgrades: [],
  gaps: [
    "The full ASCO 2021 guideline could not be read on 17 November 2026 (the publisher refuses a script and there is no open copy); the steps citing it rest on its abstract. The strength and evidence rating of each recommendation, the drug-by-drug notes on immunotherapy and targeted therapy, and whether the update keeps the 2012 fixed-dose exceptions and the vincristine cap were therefore not read. The exceptions on this page are the 2012 guideline's, read from its open executive summary.",
    "The ASCO-ONS standards (2024) were read in full on 17 November 2026 from the Oncology Nursing Society's open copy of the co-published text (Oncology Nursing Forum, July 2024), because the JCO Oncology Practice site refuses a script. The two quoted standards, the 10,000-record study with its 20% error figure, and the panel's citation of the re-weighing study were confirmed there. The standards say height and weight are measured again when clinically appropriate under the organisation's policy, and print no interval.",
    "For adults, no guideline read sets how often to re-weigh or what weight change should trigger a new dose; both are local policy. The 10% change in BSA used in the re-weighing study was the authors' assumption, not a standard. Only the abstract of that study could be read. The NHS England national dose banding pages, which set UK rounding rules, returned an empty response to a script on 17 November 2026 and were not read.",
    "No national standard on rounding doses to vial sizes could be read.",
    "The page prints the DuBois formula because a source read as text prints it. It does not print the Mosteller formula: no source read as text does (the one open review found holds it as an image). No source read says which formula UK adult services use.",
    "Body composition (sarcopenia) may explain toxicity better than BSA; ASCO 2021 names it as a research priority.",
  ],
});
