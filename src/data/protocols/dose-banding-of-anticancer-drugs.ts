import { protocol } from "./helpers";

/*
 * Dose banding: rounding individually calculated anticancer doses to standard doses so they can be prepared in advance.
 *
 * First written on 11 November 2026 from BOPA, Chatelut 2012, Samani 2022 and the van Huet 2025 abstract, with the NHS
 * England tables unread.
 *
 * Second accuracy pass, 17 November 2026. Everything was fetched raw (curl, pdftotext -layout, Europe PMC XML with the
 * tags stripped by script) and every quote was checked by script against the saved text:
 * - NHS England, How to Use the NHS England Dose Banding Tables, version 1 (first published April 2016): full text,
 *   PDF fetched from england.nhs.uk. It prints the two rules on how far a banded dose may differ from the calculated
 *   dose, which the first pass could not read.
 * - NHS England, CA2 Nationally Standardised Dose Banding Adult Intravenous SACT (the 2016 to 2017 CQUIN scheme):
 *   full text, PDF fetched from england.nhs.uk.
 * - NHS England national dose banding tables for tisotumab vedotin 10 mg/mL (version 1, May 2026), durvalumab
 *   50 mg/mL (version 2, April 2025) and nivolumab 10 mg/mL (version 3, February 2022): full text, PDFs fetched
 *   from england.nhs.uk. The other tables were not fetched.
 * - NHS England page "Systemic anti-cancer therapies (SACT) dose banding", which lists the tables: the live page
 *   answered HTTP 202 with an empty body (a bot check), so it was read from the Internet Archive copy of 9 July 2026.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025):
 *   full text, re-using the PDF a sibling checker fetched from bopa.org.uk on 17 November 2026.
 * - Chatelut et al. (Br J Cancer 2012, PMC3461153) and Samani et al. (ESMO Open 2022, PMC9058909): full text, re-using
 *   the Europe PMC XML sibling checkers fetched on 17 November 2026.
 * - White-Koning et al. (Eur J Cancer 2018, PMC5811050), added in this pass: full text, Europe PMC XML.
 * - van Huet et al. (J Oncol Pharm Pract 2025) and Puisset et al. (Br J Clin Pharmacol 2023, added in this pass):
 *   abstract only, from Europe PMC; both full texts need a subscription.
 * - Not read: the NHS England drug list and the tables by concentration (their pages are behind the same bot check),
 *   the Scottish (SOPPG) tables, and NICE KTT22, which NICE withdrew in February 2022.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied with line breaks
 * joined only.
 */
export const doseBandingOfAnticancerDrugs = protocol({
  id: "dose-banding-of-anticancer-drugs",
  name: "Dose banding of anticancer drugs",
  aka: ["dose banding", "banded doses", "standard dose bands", "chemotherapy dose rounding", "national dose banding tables", "pre-made chemotherapy doses"],
  domain: "pharmacy",
  tldr: "Dose banding means your calculated dose is rounded to one of a set of standard doses, so the pharmacy can make doses in advance. NHS England's rule is that the rounded dose stays within 6% of the calculated dose for traditional anticancer drugs and within 10% for antibody drugs, unless a wider step has been specifically agreed. Your own team's protocol comes first.",
  simple: "Your dose may be rounded to a standard amount so it can be made ready sooner. In England the rounding is normally kept within 6%, or within 10% for antibody medicines.",
  summary: "In dose banding the individually calculated dose is grouped with nearby doses and rounded to a predefined banded dose, so that doses can be prepared in advance, waiting shortened and waste reduced. NHS England's guide to its national tables (version 1, April 2016, still the guide its tables page linked in July 2026) sets two rules: no banded dose of 'traditional' SACT more than 6% from the calculated dose, and none of a monoclonal antibody more than 10%, in each case without specific prior agreement. Each table prints its own variance: within 6% in the tisotumab vedotin table (May 2026), up to 10% in the nivolumab table (February 2022), and up to 12% and 11% in two bands of the durvalumab table (April 2025). NHS England calls dose standardisation the standard of care for adults, including standard-of-care drugs given within a trial. BOPA (2025) asks that adult doses be banded where bands exist, to the NHS England tables (England, Wales and Northern Ireland) or the SOPPG tables (Scotland), and says banding is not usually used in children; for carboplatin dosed on estimated kidney function, a significant change in creatinine or weight leads to a new calculated dose, from which the new band is chosen, never a percentage change from the old banded dose.\n\nThe pharmacokinetic case is Chatelut (2012): with clearance data from 1012 adults and six drugs, three BSA bands changed individual doses by minus 14% to plus 22% yet gave a spread of exposure very similar to BSA dosing, with no significant loss of precision except for paclitaxel (32.0% against 30.7%); fixed dosing was less precise for four of the six drugs. The authors note that one patient's exposure may change by as much as the dose does. White-Koning (2018) applied the NHS England tables to 385 drug administrations in 352 children and found doses within minus 6% to plus 5% and no significant loss of precision. One retrospective study of weekly paclitaxel (Puisset 2023, abstract) found no difference in efficacy or toxicity with doses fitted up to 10%.",
  asOf: "2026-11-17",
  setting: {
    who: ["pharmacist", "pharmacy-technician", "doctor"],
    where: ["aseptic-unit", "outpatient-clinic"],
  },
  population: "Adults prescribed anticancer drugs for which national or local dose bands exist. NHS England calls dose standardisation the standard of care for adult patients, and its 2016 scheme was limited to adult chemotherapy. BOPA says banding is not usually used in children.",
  trigger: "A dose has been calculated for a drug with defined bands.",
  steps: [
    {
      action: "Calculate the individual dose first, then band adult doses to the national tables where bands exist",
      why: "BOPA's standard is that an adult dose is banded wherever a band exists; the calculated dose is still checked first.",
      source: "bopa-2025",
      quote: "Note: SACT for adult patients should be dose banded where bands are available.",
    },
    {
      action: "Find the band whose range contains the calculated dose and prescribe that band's dose",
      why: "The table groups a run of calculated doses into a band and gives one dose for all of them.",
      source: "nhse-howto-2016",
      quote: "When selecting a dose band from a precise calculated dose – choose the range into which that dose fits and then select the corresponding dose band (show in the below example).",
    },
    {
      action: "Keep a banded dose of traditional SACT within 6% of the calculated dose unless a wider step has been specifically agreed",
      why: "This is the limit NHS England set for how far rounding may move a dose.",
      source: "nhse-howto-2016",
      quote: "No target dose of ‘traditional’ SACT is greater than ±6% of the precise calculated dose without specific prior agreement",
    },
    {
      action: "Keep a banded dose of a monoclonal antibody within 10% of the calculated dose unless a wider step has been specifically agreed",
      why: "NHS England allows a wider step for antibody drugs than for traditional SACT.",
      source: "nhse-howto-2016",
      quote: "No target dose of MAB’s used as a SACT is greater than ±10% of the precise calculated dose without specific prior agreement",
    },
    {
      action: "Do not read the top and bottom of a banding table as the highest and lowest doses allowed",
      why: "The table only covers a range of doses; the dose limits for a drug are set elsewhere, in its product information.",
      source: "nhse-tisotumab-2026",
      quote: "Upper and lower limits of the dose banding table do not imply absolute maximum or minimum doses, or endorse dose capping.",
    },
    {
      action: "Band standard-of-care drugs given within a clinical trial as well",
      why: "NHS England treats banded doses as the normal standard for adults, so the same doses apply when a standard drug is part of a trial.",
      source: "nhse-tables-2026",
      quote: "Accordingly, where patients are receiving standard‑of‑care treatment as part of a clinical trial, dosing should be aligned to standardised (banded) doses.",
    },
    {
      action: "Do not assume banding applies to a child's dose",
      why: "The national standards are written for adults, and BOPA says banding is not usually used in children.",
      source: "bopa-2025",
      quote: "Dose banding not usually used in children.",
    },
    {
      action: "For carboplatin dosed on estimated kidney function, when creatinine or weight changes significantly, recalculate the dose and choose the band from the new calculated dose",
      why: "Working out a percentage change from a dose that was already rounded risks giving too little or too much.",
      source: "bopa-2025",
      quote: "Warning: it is NOT appropriate to use the previous banded dose to work out a percentage dose change threshold as this risks under or overestimating the actual carboplatin dose when banding.",
    },
    {
      action: "Consider banding for drugs where it has been shown not to widen the spread of drug exposure between patients",
      why: "In a study of six drugs, drug levels varied between people about as much with banded doses as with exact body-size doses. For one person, the level can still change by as much as the dose does.",
      source: "chatelut-2012",
      quote: "For the studied drugs, implementation of dose banding should be considered as it entails no significant increase in interindividual plasma exposure.",
    },
  ],
  bestInClass: {
    statement: "Start from an individually calculated dose and band adult doses to the national tables where bands exist (BOPA 2025). NHS England's guide to its tables (version 1, April 2016) limits the step to 6% for traditional SACT and 10% for monoclonal antibodies unless specifically agreed, and the three tables read print the variance of every band. NHS England also provides recommended bands for carboplatin (Samani 2022). For carboplatin, recalculate from new values, never from the old band (BOPA 2025). The pharmacokinetic basis is Chatelut 2012 in adults (no significant loss of precision against BSA dosing for five of six drugs). The Scottish tables were not read.",
    sources: ["nhse-howto-2016", "nhse-tables-2026", "nhse-tisotumab-2026", "nhse-durvalumab-2025", "nhse-nivolumab-2022", "bopa-2025", "chatelut-2012", "samani-2022"],
  },
  variants: [
    {
      name: "Banding in children",
      differs: "BOPA (2025) says dose banding is not usually used in children. White-Koning (2018) tested the NHS England tables on children's data and concluded that the results support using them.",
      evidence: "Using 385 drug administrations in 352 children aged 1 month to 18 years and five drugs (dactinomycin, busulfan, carboplatin, cyclophosphamide and etoposide), the banded dose was within minus 6% to plus 5% of the recommended dose and there was no statistically significant difference in the precision of exposure. The authors add that many of the practical benefits do not transfer to children: the bands are not those commonly used in adults, ready-made volumes may be too large for young patients, and many children are treated in trials that may not allow banding.",
      sources: ["white-koning-2018", "bopa-2025"],
    },
    {
      name: "Local bands with a maximum deviation of 10%",
      differs: "A project set its own bands for paclitaxel, carboplatin, docetaxel, gemcitabine, irinotecan and oxaliplatin, allowing up to 10% deviation from the prescribed dose, with the rounding rules built into its HiX software.",
      evidence: "Comparing the year before with the year after, reissuing of prepared doses rose for all agents except carboplatin (for oxaliplatin from 3.7% to 27.8%, which was from 1 to 5 preparations) and waste fell for all agents except carboplatin, saving about 5,200 euros a year (van Huet 2025, abstract).",
      sources: ["van-huet-2025"],
    },
    {
      name: "Dose fitting up to 10% for weekly paclitaxel",
      differs: "Doses of weekly paclitaxel for breast cancer were approximated up or down by up to 10% from the dose calculated by body surface area.",
      evidence: "A retrospective study at one centre (224 patients with metastatic disease and 209 having treatment before surgery) found efficacy and toxicity no different in the groups rounded down or up compared with the group dosed by body surface area. The authors call it the first study to include clinical observations (Puisset 2023, abstract).",
      sources: ["puisset-2023"],
    },
    {
      name: "Three wide BSA bands",
      differs: "Chatelut (2012) modelled only three bands across all patients, which moved individual doses by minus 14% to plus 22%, wider than the 5% or less of the 2001 definition of dose banding the paper quotes.",
      evidence: "Precision in reaching the target exposure was not significantly worse than BSA dosing except for paclitaxel (32.0% against 30.7%). The authors note that a dose 22% higher than the BSA dose may be a limiting factor for the practice, and that a five-band version left fewer patients with a dose more than 10% different.",
      sources: ["chatelut-2012"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "nhse-howto-2016",
      label: "How to Use the NHS England Dose Banding Tables, version 1",
      publisher: "NHS England Medicines Optimisation Clinical Reference Group",
      year: 2016,
      url: "https://www.england.nhs.uk/commissioning/wp-content/uploads/sites/12/2017/01/dose-banding-tables-how-to.pdf",
      gradingScheme: "Rules are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhse-tables-2026",
      label: "Systemic anti-cancer therapies (SACT) dose banding: national dose banding tables (page read from the Internet Archive copy of 9 July 2026)",
      publisher: "NHS England",
      year: 2026,
      url: "https://www.england.nhs.uk/commissioning/spec-services/npc-crg/group-b/b02/chemotherapy-dose-banding/",
      gradingScheme: "Not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhse-tisotumab-2026",
      label: "National dose banding table: tisotumab vedotin 10 mg/mL, version 1, May 2026",
      publisher: "NHS England",
      year: 2026,
      url: "https://www.england.nhs.uk/wp-content/uploads/2026/05/national-dose-banding-table-tisotumab-vedotin-10mgmL-v1.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhse-durvalumab-2025",
      label: "National dose banding table: durvalumab 50 mg/mL, version 2, April 2025",
      publisher: "NHS England",
      year: 2025,
      url: "https://www.england.nhs.uk/wp-content/uploads/2019/06/national-dose-banding-table-durvalumab-50mgmL-version-2.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhse-nivolumab-2022",
      label: "National dose banding table: nivolumab 10 mg/mL, version 3, February 2022",
      publisher: "NHS England and NHS Improvement",
      year: 2022,
      url: "https://www.england.nhs.uk/wp-content/uploads/2018/04/National-Dose-Banding-Table-Nivolumab-10mgmL-v3.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhse-cquin-2016",
      label: "CA2 Nationally Standardised Dose Banding Adult Intravenous SACT (CQUIN scheme, April 2016 to March 2017)",
      publisher: "NHS England",
      year: 2016,
      url: "https://www.england.nhs.uk/wp-content/uploads/2016/03/ca2-nat-stndrd-dose-adlt-intrvnous.pdf",
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
      key: "chatelut-2012",
      label: "Dose banding as an alternative to body surface area-based dosing of chemotherapeutic agents",
      publisher: "British Journal of Cancer (Chatelut et al.)",
      year: 2012,
      url: "https://doi.org/10.1038/bjc.2012.357",
      doi: "10.1038/bjc.2012.357",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "white-koning-2018",
      label: "Investigating the potential impact of dose banding for systemic anti-cancer therapy in the paediatric setting based on pharmacokinetic evidence",
      publisher: "European Journal of Cancer (White-Koning et al.)",
      year: 2018,
      url: "https://doi.org/10.1016/j.ejca.2017.11.029",
      doi: "10.1016/j.ejca.2017.11.029",
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
      key: "puisset-2023",
      label: "Investigating the clinical impact of dose-banding for weekly paclitaxel in patients with breast cancer: A retrospective and monocentric study",
      publisher: "British Journal of Clinical Pharmacology (Puisset et al.)",
      year: 2023,
      url: "https://doi.org/10.1111/bcp.15702",
      doi: "10.1111/bcp.15702",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "van-huet-2025",
      label: "Optimizing chemotherapy practices: The impact of dose banding on reissuing and waste reduction",
      publisher: "Journal of Oncology Pharmacy Practice (van Huet et al.)",
      year: 2025,
      url: "https://doi.org/10.1177/10781552251370560",
      doi: "10.1177/10781552251370560",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["carboplatin", "paclitaxel"],
  related: ["body-size-based-dose-calculation", "carboplatin-dose-calculation", "sact-prescribing-and-pharmacy-verification", "body-surface-area-dosing"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the NHS England web pages answered a script with an empty HTTP 202 (a bot check), while its PDF files could be read. The tables page was therefore read from the Internet Archive copy of 9 July 2026, and the drug list and the tables by concentration (1 mg/mL to 100 mg/mL), whose links sit behind those pages, were not read. Only three tables were read: tisotumab vedotin, durvalumab and nivolumab. Which drugs each general table covers is not stated here.",
    "The two rules (6% and 10%) come from a guide dated April 2016, version 1. The tables page still linked that guide in July 2026 and no later version was found. Two bands of the durvalumab table (version 2, April 2025) print a variance of 12% and 11%, above the 10% rule; the documents read do not say whether that was specifically agreed.",
    "Who approves the bands today is not stated in what was read. The 2016 scheme said the drugs and bands would be approved by the Medicines Optimisation and Chemotherapy Clinical Reference Groups, with each provider's formulary committee approving the drugs and doses locally; the 2026 page calls those groups 'former'.",
    "The 2016 scheme excused a provider where taking part in a trial ruled out banded doses, while the 2026 page says standard-of-care treatment within a trial should be banded. How a trial protocol that fixes exact doses is handled is not stated.",
    "The Scottish SOPPG tables, which BOPA names for NHS Scotland, were not found or read. NICE's key therapeutic topic on chemotherapy dose standardisation (KTT22) was withdrawn in February 2022, and the archived copy NHS England links to answered with a CAPTCHA on 17 November 2026.",
    "BOPA's own web pages refused a script on 17 November 2026, so a version later than 5.0 could not be ruled out from its site; the address cited still serves version 5.0.",
    "Clinical outcome evidence is thin: one retrospective single-centre study of weekly paclitaxel (Puisset 2023, read as an abstract only). The rest is pharmacokinetic simulation (Chatelut 2012, White-Koning 2018) and operational (waste and reissuing; van Huet 2025, abstract only). A title search of Europe PMC on 17 November 2026 found no randomised comparison.",
    "Which drugs are suitable depends on the stability of the prepared product, which is not covered here.",
  ],
});
