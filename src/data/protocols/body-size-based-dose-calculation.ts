import { protocol } from "./helpers";

/*
 * Calculating anticancer doses from body surface area or weight, re-weighing during a course, and dosing people with
 * obesity, in adults.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO guideline update, Appropriate Systemic Therapy Dosing for Obese Adult Patients With Cancer (Griggs et al.,
 *   J Clin Oncol 2021, DOI 10.1200/JCO.21.00471): abstract only, Europe PMC. ascopubs.org refuses a script and the
 *   Internet Archive's capture returned HTTP 429 to repeated requests, so the full text, with its evidence ratings, was
 *   not read. A Europe PMC search found no later ASCO edition; it is the current one.
 * - ASCO guideline 2012 on chemotherapy dosing in obese adults (Griggs et al., J Clin Oncol 2012, DOI
 *   10.1200/JCO.2011.39.9436): abstract only, Europe PMC.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): full text, read
 *   by the first protocol agent from the Internet Archive's capture of ascopubs.org (copy in /tmp/pf-chemo).
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF.
 * - Kemps et al., Eur J Hosp Pharm 2024 (DOI 10.1136/ejhpharm-2021-003215), frequency of weighing: abstract only.
 * - Tübingen dose-capping cohort, Arch Gynecol Obstet 2026 (DOI 10.1007/s00404-026-08317-2): abstract only.
 * - Chatelut et al., Br J Cancer 2012 (DOI 10.1038/bjc.2012.357), dose banding against BSA dosing: abstract only.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const bodySizeBasedDoseCalculation = protocol({
  id: "body-size-based-dose-calculation",
  name: "Body surface area and weight-based dose calculation for anticancer drugs, including full doses in obesity",
  aka: ["BSA dose calculation", "body surface area dosing", "mg/m2 dosing", "chemotherapy dose calculation", "dosing in obesity", "dose capping", "BSA capping", "actual body weight dosing", "re-weighing during chemotherapy", "chemotherapy dosing for obese patients"],
  domain: "pharmacy",
  tldr: "Most chemotherapy doses are worked out from your height and weight. Both are measured in metric units and checked by two people before a new treatment starts, and your weight is rechecked during treatment. If you are a larger person, the American guideline says you should get the full dose for your actual size, not a reduced or 'capped' one.",
  simple: "Your dose comes from your height and weight, so the team measures them carefully. Bigger bodies get the full dose, because cutting it can make treatment work less well.",
  summary: "Most cytotoxic doses are expressed per square metre of body surface area (BSA), calculated from height and weight (DuBois or Mosteller), or per kilogram. Errors start at the scales: ASCO-ONS (2024) cites a study of 10,000 records in which 20% held height or weight errors, and now requires height and weight in metric units, measured and documented and verified by two people, one licensed, before a new treatment plan is prepared. The order must state the calculation method, the variables, how often they are re-evaluated and what change prompts recalculation. BOPA (2025) requires an up-to-date height, weight and BSA on the first prescription and a local policy on when weight change triggers a new dose; it bands adult doses where national bands exist and asks that any BSA capping be documented.\n\nFor people with obesity, ASCO (2012, updated 2021) recommends full weight-based cytotoxic doses, especially when the aim is cure, and the 2021 update adds full approved doses of immunotherapy and targeted therapy; toxicity is handled the same way as in anyone else. The 2012 guideline found that up to 40% of obese patients received limited doses and that fears of toxicity were unfounded. Capping persists: in a German cohort of 730 women with early breast cancer capped at BSA 2.0 m2, those above 2.1 m2 had lower dose intensity and worse survival, with obesity a possible confounder. How often to re-weigh is unsettled; a 2,276-patient study found a 10% BSA change in at most 7.6% of patients and suggested three- to six-monthly weighing for most.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "aseptic-unit", "ward"],
  },
  population: "Adults prescribed anticancer drugs dosed by body surface area or weight, including people with obesity. Children are weighed before every cycle and dosed by protocol (BOPA); carboplatin is dosed by kidney function (see the carboplatin protocol), and flat-dosed drugs need no calculation.",
  trigger: "A new treatment plan is prescribed, or weight changes during a course.",
  steps: [
    {
      action: "Measure height and weight in metric units, record them, and have two people, one a licensed clinician, verify both before a new treatment plan is prepared",
      why: "Mistyped numbers, decimal slips and pounds written as kilograms are common, and each one changes the dose.",
      source: "asco-ons-2024",
      quote: "Weight and height are measured and documented in the medical record in metric units (eg, kg and cm). Both the measurement and documentation are verified by two individuals, one of whom is a licensed clinician, prior to preparation and administration of a newly prescribed antineoplastic treatment plan.",
    },
    {
      action: "Write the calculation on the order: the method, the variables used, how often they will be rechecked and what change prompts recalculation",
      why: "Anyone checking the dose later can repeat the sum and see when it should change.",
      source: "asco-ons-2024",
      quote: "The dose calculation, including: 3.9.8.1. The calculation methodology 3.9.8.2. The variables used to calculate the dose 3.9.8.3. The frequency at which variables are re-evaluated, such as weight or laboratory data 3.9.8.4. The changes in the values that prompt confirmation or recalculation of doses",
    },
    {
      action: "Put an up-to-date height, weight and body surface area on the first prescription",
      why: "The pharmacist needs the same numbers the prescriber used to check the dose independently.",
      source: "bopa-2025",
      quote: "Ensure an up-to-date height, weight and BSA (where relevant) is calculated and documented on the prescription.",
    },
    {
      action: "Use the person's actual weight and give full weight-based cytotoxic doses to people with obesity, especially when treatment aims to cure",
      why: "Reducing doses for larger people lowers the chance the treatment works, and full doses are not more toxic for them.",
      source: "asco-obesity-2021",
      quote: "The Panel continues to recommend that full, weight-based cytotoxic chemotherapy doses be used to treat obese adults with cancer.",
    },
    {
      action: "Give full approved doses of immunotherapy and targeted therapy to people with obesity",
      why: "There is no evidence that these drugs need reducing for body size, and the 2021 guideline extended full dosing to them.",
      source: "asco-obesity-2021",
      quote: "New to this version of the guideline, the Panel also recommends that full, approved doses of immunotherapy and targeted therapies be offered to obese adults with cancer.",
    },
    {
      action: "If side effects occur, reduce or delay doses in a person with obesity in the same way as in anyone else",
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
      action: "Have the pharmacist check every calculation and its units at each cycle, and band adult doses where national bands exist",
      why: "A second, independent calculation catches arithmetic and unit errors before the drug is prepared.",
      source: "bopa-2025",
      quote: "Check drug dose calculations (Flat, BSA, weight, AUC) and units are appropriate.",
    },
  ],
  bestInClass: {
    statement: "Metric height and weight, measured and verified by two people before a new plan (ASCO-ONS 2024); the calculation method, variables and recalculation triggers written on the order (ASCO-ONS 2024); an independent pharmacist check of every calculation (BOPA 2025); and full doses for actual body size in obesity, for cytotoxics and, since 2021, immunotherapy and targeted therapy (ASCO 2021). The sources do not set a re-weighing interval or a weight-change threshold; both are left to local policy, and BOPA tolerates documented BSA capping as individual practice, which ASCO recommends against routinely.",
    sources: ["asco-ons-2024", "bopa-2025", "asco-obesity-2021", "asco-obesity-2012"],
  },
  variants: [
    {
      name: "Capping body surface area (often at 2.0 m2)",
      differs: "Doses are calculated from a maximum BSA, commonly 2.0 m2, for larger patients. BOPA allows it as individual or local practice if documented in the treatment plan.",
      evidence: "ASCO 2012 found up to 40% of obese patients received limited doses and recommended against it. In 730 women with early breast cancer at Tübingen, capping at 2.0 m2 meant those above 2.1 m2 received median relative dose intensity of 83.9% against 92.6%, and had worse 5-year overall survival (85.5% against 94.3%); the authors could not separate obesity itself from underdosing.",
      sources: ["bopa-2025", "asco-obesity-2012", "tubingen-capping-2026"],
    },
    {
      name: "Less frequent re-weighing",
      differs: "Weighs every three months for acute leukaemia, lymphoma, pancreatic cancer and people under 20, and every six months for others, rather than monthly or every cycle.",
      evidence: "In 2,276 adults, a BSA change of 10% or more occurred in at most 7.6% and after a median of 84 days (Kemps 2024, Dutch hospital data). ASCO-ONS cites the same study and leaves the interval to the organisation.",
      sources: ["kemps-2024", "asco-ons-2024"],
    },
    {
      name: "Dose banding instead of individual BSA dosing",
      differs: "Patients are grouped into BSA bands and given a standard prepared dose per band, so doses can be made in advance.",
      evidence: "Using clearance data from 1,012 patients and six drugs, banding changed individual doses by minus 14% to plus 22% with no significant loss of precision in reaching the target exposure, except for paclitaxel (Chatelut 2012). BOPA asks for adult doses to be banded where national tables exist.",
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
      accessed: "2026-11-11",
    },
    {
      key: "asco-obesity-2012",
      label: "Appropriate chemotherapy dosing for obese adult patients with cancer: American Society of Clinical Oncology clinical practice guideline",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology, Griggs et al.)",
      year: 2012,
      url: "https://doi.org/10.1200/JCO.2011.39.9436",
      doi: "10.1200/JCO.2011.39.9436",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from a systematic review (2015 to 2023), expert panel consensus and public comment.",
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
      key: "kemps-2024",
      label: "Frequency of measuring body weight in (sub)populations of patients with cancer treated with chemotherapy",
      publisher: "European Journal of Hospital Pharmacy (Kemps et al.)",
      year: 2024,
      url: "https://doi.org/10.1136/ejhpharm-2021-003215",
      doi: "10.1136/ejhpharm-2021-003215",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "tubingen-capping-2026",
      label: "Impact of chemotherapy dose capping on treatment intensity and survival in early breast cancer patients with high body surface area",
      publisher: "Archives of Gynecology and Obstetrics",
      year: 2026,
      url: "https://doi.org/10.1007/s00404-026-08317-2",
      doi: "10.1007/s00404-026-08317-2",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "chatelut-2012",
      label: "Dose banding as an alternative to body surface area-based dosing of chemotherapeutic agents",
      publisher: "British Journal of Cancer (Chatelut et al.)",
      year: 2012,
      url: "https://doi.org/10.1038/bjc.2012.357",
      doi: "10.1038/bjc.2012.357",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["chemotherapy-dosing-in-obesity"],
  related: ["body-surface-area-dosing", "carboplatin-dose-calculation", "sact-prescribing-and-pharmacy-verification"],
  terms: ["pharmacokinetics"],
  upgrades: [],
  gaps: [
    "The full ASCO 2021 guideline, with its evidence ratings and its drug-by-drug notes on immunotherapy and targeted therapy, could not be read; the steps rest on its abstract.",
    "No guideline read sets how often to re-weigh or what weight change should trigger a new dose; both are local policy. The NHS England national dose banding principles, which set UK rounding rules, returned a bot challenge and were not read.",
    "No national standard on rounding doses to vial sizes could be read.",
    "Body composition (sarcopenia) may explain toxicity better than BSA; ASCO 2021 names it as a research priority.",
  ],
});
