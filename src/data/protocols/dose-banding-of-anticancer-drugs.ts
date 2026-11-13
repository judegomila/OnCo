import { protocol } from "./helpers";

/*
 * Dose banding: rounding individually calculated anticancer doses to standard doses so they can be prepared in advance.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF (first protocol agent's copy).
 * - Chatelut et al., Dose banding as an alternative to body surface area-based dosing (Br J Cancer 2012, DOI
 *   10.1038/bjc.2012.357, PMC3461153): full text, Europe PMC XML.
 * - Samani et al., GFR estimation for carboplatin dosing (ESMO Open 2022, DOI 10.1016/j.esmoop.2022.100401): full text;
 *   it describes UK banding practice and NHS England's carboplatin bands.
 * - van Huet et al., dose banding, reissuing and waste (J Oncol Pharm Pract 2025, DOI 10.1177/10781552251370560):
 *   abstract only.
 * - NHS England national dose banding tables and principles: not reachable (england.nhs.uk returned a bot challenge,
 *   HTTP 202, and the Internet Archive refused repeated requests with HTTP 429). The UK rules on how far a banded dose
 *   may differ from the calculated dose are therefore not stated here. The Scottish (SOPPG) tables were not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const doseBandingOfAnticancerDrugs = protocol({
  id: "dose-banding-of-anticancer-drugs",
  name: "Dose banding of anticancer drugs",
  aka: ["dose banding", "banded doses", "standard dose bands", "chemotherapy dose rounding", "national dose banding tables", "pre-made chemotherapy doses"],
  domain: "pharmacy",
  tldr: "Dose banding means your calculated dose is rounded to the nearest of a set of standard doses, so the pharmacy can make doses in advance. The difference from your exact dose is kept small, and studies show it gives about the same amount of drug in your blood as an individually calculated dose.",
  simple: "Your dose may be rounded to a standard amount so it can be made ready sooner. The change is small and does not make the treatment weaker.",
  summary: "In dose banding the individually calculated dose (by body surface area, weight or AUC) is rounded to a predefined standard dose for a range of calculated doses, so that doses can be prepared in advance, waiting times cut, waste reduced and products quality-controlled before use. BOPA (2025) asks that adult anticancer doses be banded where bands exist, to the NHS England (England, Wales and Northern Ireland) or SOPPG (Scotland) national tables, and notes banding is not usually used in children; for carboplatin, a changed creatinine or weight leads to a new calculated dose, from which the new band is chosen, never a percentage change from the old banded dose.\n\nThe pharmacokinetic case comes from Chatelut (2012): using clearance data from 1,012 adults and six drugs, banding into three BSA bands changed individual doses by minus 14% to plus 22% but gave a spread of drug exposure very similar to BSA dosing, with no significant loss of precision except for paclitaxel (32.0% against 30.7%), while flat dosing was less precise for four of the six drugs. A hospital that allowed a maximum deviation of 10% found more prepared doses could be reissued and less waste for all agents studied except carboplatin. The NHS England tables and principles, which set UK limits, could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["pharmacist", "pharmacy-technician", "doctor"],
    where: ["aseptic-unit", "outpatient-clinic"],
  },
  population: "Adults prescribed parenteral anticancer drugs for which national or local dose bands exist. Not usually used in children (BOPA).",
  trigger: "A dose has been calculated for a drug with defined bands.",
  steps: [
    {
      action: "Calculate the individual dose first, then band adult doses to the national tables where bands exist",
      why: "Standard doses can be prepared ahead and checked in advance, shortening waits without losing accuracy.",
      source: "bopa-2025",
      quote: "Note: SACT for adult patients should be dose banded where bands are available.",
    },
    {
      action: "Do not band doses for children unless a paediatric protocol says so",
      why: "Children's doses and volumes must match their age and size more closely.",
      source: "bopa-2025",
      quote: "Dose banding not usually used in children.",
    },
    {
      action: "When weight or kidney function changes, recalculate the dose from the new values and choose the band from the new calculated dose",
      why: "Comparing against an already rounded dose can hide or exaggerate a real change.",
      source: "bopa-2025",
      quote: "Warning: it is NOT appropriate to use the previous banded dose to work out a percentage dose change threshold as this risks under or overestimating the actual carboplatin dose when banding.",
    },
    {
      action: "Use bands that keep each patient's exposure close to that of individual dosing",
      why: "Within sensible bands, the difference in drug levels between people is about the same as with exact body-size dosing.",
      source: "chatelut-2012",
      quote: "For the studied drugs, implementation of dose banding should be considered as it entails no significant increase in interindividual plasma exposure.",
    },
  ],
  bestInClass: {
    statement: "Band adult doses to national tables where they exist, starting from an individually calculated dose, and not usually in children (BOPA 2025); recalculate from new values rather than from the old band. The pharmacokinetic basis is Chatelut 2012 (no significant loss of precision against BSA dosing for five of six drugs). The UK national tables and their deviation limits could not be read, so no limit is stated; one hospital used a maximum deviation of 10%.",
    sources: ["bopa-2025", "chatelut-2012", "samani-2022"],
  },
  variants: [
    {
      name: "Local bands with a maximum deviation of 10%",
      differs: "A hospital sets its own bands for paclitaxel, carboplatin, docetaxel, gemcitabine, irinotecan and oxaliplatin, allowing up to 10% deviation from the prescribed dose, built into electronic prescribing.",
      evidence: "In one hospital, reissuing of prepared doses rose for all agents except carboplatin (oxaliplatin from 3.7% to 27.8%) and waste fell, saving about 5,200 euros a year (van Huet 2025).",
      sources: ["van-huet-2025"],
    },
  ],
  grades: [],
  sources: [
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
      key: "chatelut-2012",
      label: "Dose banding as an alternative to body surface area-based dosing of chemotherapeutic agents",
      publisher: "British Journal of Cancer (Chatelut et al.)",
      year: 2012,
      url: "https://doi.org/10.1038/bjc.2012.357",
      doi: "10.1038/bjc.2012.357",
      read: "full-text",
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
      key: "van-huet-2025",
      label: "Optimizing chemotherapy practices: The impact of dose banding on reissuing and waste reduction",
      publisher: "Journal of Oncology Pharmacy Practice (van Huet et al.)",
      year: 2025,
      url: "https://doi.org/10.1177/10781552251370560",
      doi: "10.1177/10781552251370560",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["carboplatin", "paclitaxel"],
  related: ["body-size-based-dose-calculation", "carboplatin-dose-calculation", "sact-prescribing-and-pharmacy-verification", "body-surface-area-dosing"],
  upgrades: [],
  gaps: [
    "The NHS England national dose banding tables and principles, which set UK bands and the permitted deviation, returned a bot challenge and could not be read; the Scottish SOPPG tables were not read either.",
    "No clinical outcome study compares banded with individually calculated doses; the evidence is pharmacokinetic simulation (Chatelut 2012) and operational (waste and reissuing).",
    "Which drugs are suitable depends on the stability of the prepared product, which is not covered here.",
  ],
});
