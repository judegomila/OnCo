import { protocol } from "./helpers";

/*
 * Bowel preparation before colonoscopy, for screening, diagnosis and surveillance of bowel cancer.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Hassan et al., Bowel preparation for colonoscopy: ESGE Guideline, Update 2019 (Endoscopy 2019): full text. The
 *   Thieme article PDF returned a bot challenge to a script and was not pursued; the same PDF is published by ESGE on
 *   esge.com and was read from there with pdftotext. No newer ESGE bowel preparation guideline was found in Europe PMC.
 * - Jacobson et al., Optimizing Bowel Preparation Quality for Colonoscopy: consensus recommendations by the US
 *   Multi-Society Task Force on Colorectal Cancer (Gastroenterology 2025; also in GIE and AJG): abstract only, Europe
 *   PMC. The full text is behind the publishers' paywalls; its grades could not be read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined; ESGE grades are printed beneath each recommendation and quoted as printed.
 */
export const bowelPreparationForColonoscopy = protocol({
  id: "bowel-preparation-for-colonoscopy",
  name: "Bowel preparation for colonoscopy",
  aka: ["bowel prep", "colonoscopy prep", "split-dose bowel preparation", "laxative before colonoscopy", "PEG bowel prep", "Moviprep", "low-fibre diet before colonoscopy", "clear liquid diet before colonoscopy"],
  domain: "screening-diagnostics",
  tldr: "A colonoscopy can only find polyps and early cancers if the bowel is clean. Eat low-fibre food the day before, drink the laxative in two halves (the evening before and the morning of the test, or all on the day for an afternoon test), and finish the last dose at least two hours before the test. Follow your unit's written instructions, which come first.",
  simple: "Before a colonoscopy you eat plain low-fibre food the day before and drink a strong laxative in two parts. The last part is on the morning of the test and must be finished at least two hours before it. A clean bowel means nothing is missed.",
  summary: "ESGE 2019 (GRADE): a low-fibre diet on the day before (strong, moderate); enhanced instructions, verbal or written, for patients and for ward staff caring for inpatients (strong, moderate); split-dose preparation for elective colonoscopy (strong, high), with same-day dosing an acceptable alternative for afternoon lists (strong, high); start the last dose within 5 hours of the procedure and finish it at least 2 hours before (strong, moderate); high- or low-volume PEG or clinically validated non-PEG agents, individualised where fluid and electrolyte disturbance is a risk (strong, moderate); simethicone suggested (weak, moderate); no routine enemas (strong, moderate), no routine oral sodium phosphate (strong, low) and no routine prokinetics (weak, low). After an inadequate preparation, repeat within a year (strong, moderate). PEG in inflammatory bowel disease and urgent bleeding; insufficient evidence in pregnancy. The US Multi-Society Task Force (2025) agrees on split dosing (and suggests 2 litres may be enough), same-day dosing for afternoon procedures (an inferior alternative in the morning), restriction limited to the day before with clear liquids or low-fibre food for early meals, and simethicone, and sets a target of more than 90% adequate preparations per endoscopist and per unit; ESGE's quality committee sets a minimum standard of 90% or more, assessed on validated scales.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor"],
    where: ["home", "outpatient-clinic", "ward"],
  },
  population: "Adults having elective colonoscopy, including screening after a positive stool test, diagnosis of suspected bowel cancer and surveillance after cancer or polyps. People with kidney or heart failure, or otherwise at risk of fluid and salt disturbance, need an individualised laxative choice; inpatients, inflammatory bowel disease, urgent colonoscopy for bleeding and pregnancy are named where ESGE addresses them. Children are not covered.",
  trigger: "A colonoscopy is booked.",
  steps: [
    {
      action: "Give the person clear, specific instructions, spoken and written, and give them to ward staff too when the person is an inpatient",
      why: "Most poor preparations come from instructions that were unclear or not followed.",
      source: "esge-2019",
      quote: "ESGE recommends specific verbal or written instructions to patients and to clinic staff caring for hospitalized patients, to improve the quality of bowel preparation.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Check whether the person is at risk of fluid or salt imbalance (kidney or heart failure, frailty) and choose the laxative with them in mind",
      why: "Some laxatives shift fluid and salts, which matters most for weak kidneys or hearts.",
      source: "esge-2019",
      quote: "ESGE recommends the use of high volume or low volume PEG-based regimens as well as that of non-PEG-based agents that have been clinically validated for routine bowel preparation. In patients at risk for hydroelectrolyte disturbances, the choice of laxative should be individualized.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Do not use oral sodium phosphate routinely",
      why: "It can damage the kidneys and upset blood salts.",
      source: "esge-2019",
      quote: "ESGE recommends against the routine use of oral sodium phosphate for bowel preparation.",
      grade: "Strong recommendation, low quality evidence.",
    },
    {
      action: "Eat a low-fibre diet on the day before the colonoscopy",
      why: "Less fibre leaves less residue in the bowel to hide the lining.",
      source: "esge-2019",
      quote: "ESGE recommends a low fiber diet on the day preceding colonoscopy.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Take the laxative as a split dose: half the evening before and half on the day",
      why: "Splitting the dose cleans the bowel better than taking it all the day before.",
      source: "esge-2019",
      quote: "ESGE recommends split-dose bowel preparation for elective colonoscopy.",
      grade: "Strong recommendation, high quality evidence.",
    },
    {
      action: "For an afternoon colonoscopy, the whole dose may be taken on the same day instead",
      why: "Same-day dosing works as well for afternoon lists and avoids an evening dose.",
      source: "esge-2019",
      quote: "ESGE recommends, for patients undergoing afternoon colonoscopy, a same-day bowel preparation as an acceptable alternative to split dosing.",
      grade: "Strong recommendation, high quality evidence.",
    },
    {
      action: "Start the last dose within 5 hours of the colonoscopy and finish it at least 2 hours before",
      why: "The bowel is cleanest a few hours after the last dose; finishing 2 hours before keeps the stomach empty for sedation.",
      source: "esge-2019",
      quote: "ESGE recommends to start the last dose of bowel preparation within 5 hours of colonoscopy, and to complete it at least 2 hours before the beginning of the procedure.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Consider adding simethicone to the preparation",
      why: "It reduces bubbles that can hide small polyps.",
      source: "esge-2019",
      quote: "ESGE suggests adding oral simethicone to bowel preparation.",
      grade: "Weak recommendation, moderate quality evidence.",
    },
    {
      action: "Do not add enemas or prokinetic drugs routinely",
      why: "In trials, adding an enema did not clean the bowel better and made preparation harder to bear.",
      source: "esge-2019",
      quote: "ESGE recommends against the routine use of enemas for bowel preparation.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "If the preparation was inadequate, repeat the colonoscopy within a year, or sooner after extra preparation, with the next regimen adjusted to the reason it failed",
      why: "A poorly prepared bowel can hide polyps and cancers, so the examination needs doing again.",
      source: "esge-2019",
      quote: "ESGE recommends early repetition of colonoscopy within 1 year in the case of inadequate bowel preparation, unless clinically contraindicated.",
      grade: "Strong recommendation, moderate level of evidence.",
    },
  ],
  bestInClass: {
    statement: "Split-dose preparation (ESGE strong, high quality; US Multi-Society Task Force 2025 recommends), or same-day dosing for afternoon procedures; the last dose started within 5 hours and finished at least 2 hours before; a validated PEG or non-PEG laxative chosen individually for people at risk of fluid and salt disturbance, without routine oral sodium phosphate, enemas or prokinetics; low-fibre food on the day before only; enhanced instructions; simethicone suggested. The two guidelines differ in emphasis: the US Task Force allows clear liquids or low-fibre food for early meals on the day before, suggests a 2-litre regimen may be sufficient, and calls same-day dosing an inferior alternative for morning procedures, where ESGE addresses same-day dosing only for afternoon lists.",
    sources: ["esge-2019", "usmstf-2025"],
  },
  variants: [
    {
      name: "Clear liquids all day before the colonoscopy",
      differs: "Restricts the person to clear liquids for the whole day before, rather than low-fibre food.",
      evidence: "ESGE recommends a low-fibre diet and notes that adherence to diet restriction is low in real life; the US Task Force (2025) allows either clear liquids or a low-fibre or low-residue diet for the early and midday meals of the day before.",
      sources: ["esge-2019", "usmstf-2025"],
    },
    {
      name: "Low-volume (2 litres or less) regimens",
      differs: "Uses a lower-volume PEG with ascorbate, or a non-PEG agent such as sodium picosulfate with magnesium citrate or oral sulfate solution, instead of 4 litres of PEG.",
      evidence: "ESGE accepts both high- and low-volume PEG and validated non-PEG agents (strong, moderate) and individualises the choice where fluid and salt disturbance is a risk; the US Task Force suggests a 2-litre regimen may be sufficient. The relative safety of each agent in kidney or heart failure was not read in full here.",
      sources: ["esge-2019", "usmstf-2025"],
    },
  ],
  grades: [
    { claim: "Enhanced instructions for bowel preparation", grade: "Strong recommendation, moderate quality evidence.", source: "esge-2019", quote: "ESGE recommends the use of enhanced instructions for bowel preparation." },
    { claim: "PEG regimens in inflammatory bowel disease", grade: "Strong recommendation, high quality evidence.", source: "esge-2019", quote: "ESGE recommends high volume or low volume PEG-based bowel preparation in patients with inflammatory bowel disease (IBD)." },
    { claim: "PEG regimens for urgent colonoscopy for lower gastrointestinal bleeding", grade: "Strong recommendation, moderate quality evidence.", source: "esge-2019", quote: "ESGE recommends PEG regimens for bowel preparation if urgent colonoscopy is scheduled for lower gastrointestinal bleeding (LGIB)." },
    { claim: "No routine prokinetic agents", grade: "Weak recommendation, low quality evidence.", source: "esge-2019", quote: "ESGE does not suggest the routine use of prokinetic agents for bowel preparation." },
    { claim: "Pregnancy and breastfeeding: insufficient evidence for a specific regimen", grade: "Insufficient evidence to determine net benefits or risks.", source: "esge-2019", quote: "ESGE found insufficient evidence to determine for or against the use of specific regimens in pregnant/breastfeeding women." },
    { claim: "Split dosing recommended; same-day an inferior alternative for morning colonoscopy (US)", grade: "recommend / suggest (GRADE terms in abstract; full grades not read)", source: "usmstf-2025", quote: "We recommend the use of a split-dose bowel preparation regimen and suggest that a 2 L regimen may be sufficient." },
  ],
  sources: [
    {
      key: "esge-2019",
      label: "Bowel preparation for colonoscopy: European Society of Gastrointestinal Endoscopy (ESGE) Guideline, Update 2019",
      publisher: "ESGE (Hassan et al., Endoscopy)",
      year: 2019,
      url: "https://www.esge.com/assets/downloads/pdfs/guidelines/2019_a_0959_0505.pdf",
      doi: "10.1055/a-0959-0505",
      gradingScheme: "GRADE: strong or weak recommendation; high, moderate, low or very low quality evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "usmstf-2025",
      label: "Optimizing Bowel Preparation Quality for Colonoscopy: Consensus Recommendations by the US Multi-Society Task Force on Colorectal Cancer",
      publisher: "US Multi-Society Task Force on Colorectal Cancer (Jacobson et al., Gastroenterology)",
      year: 2025,
      url: "https://doi.org/10.1053/j.gastro.2025.02.002",
      doi: "10.1053/j.gastro.2025.02.002",
      gradingScheme: "Consensus statements worded 'recommend' or 'suggest'; the grading detail is in the full text, which was not read.",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["colorectal"],
  terms: ["colonoscopy"],
  related: [],
  upgrades: [],
  gaps: [
    "The ESGE guideline dates from 2019; no newer ESGE bowel preparation guideline was found. The US Task Force update (2025) was read as an abstract only, so its grades and its advice for people at high risk of inadequate preparation are not stated.",
    "Neither source read gives specific advice for people having chemotherapy, with a stoma, or after bowel resection for cancer; their preparation follows local policy and the endoscopist's advice.",
    "How to manage diabetes medicines (insulin, SGLT2 inhibitors, GLP-1 receptor agonists) and anticoagulants around colonoscopy is outside these sources; anticoagulants are covered by the protocol on holding blood thinners before biopsy and endoscopy.",
    "The Thieme publisher page returned a bot challenge to a script; the ESGE-hosted copy of the same article was read instead.",
  ],
});
