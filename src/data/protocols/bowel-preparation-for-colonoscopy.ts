import { protocol } from "./helpers";

/*
 * Bowel preparation before colonoscopy, for screening, diagnosis and surveillance of bowel cancer.
 *
 * What was read, and how (first on 11 November 2026; every claim re-read against the raw text on 17 November 2026):
 * - Hassan et al., Bowel preparation for colonoscopy: ESGE Guideline, Update 2019 (Endoscopy 2019): full text, the
 *   PDF published by ESGE on esge.com, fetched again with curl and read with pdftotext. Every quote and the grade
 *   printed beneath it was checked by script against that text. No newer ESGE bowel preparation guideline was found
 *   in Europe PMC or Crossref; the guideline listing on esge.com is drawn by script and could not be read.
 * - Jacobson et al., Optimizing Bowel Preparation Quality for Colonoscopy: consensus recommendations by the US
 *   Multi-Society Task Force on Colorectal Cancer (2025; co-published in the American Journal of Gastroenterology,
 *   Gastroenterology and Gastrointestinal Endoscopy). On 11 November only the abstract was read. On 17 November the
 *   American Journal of Gastroenterology copy answered a plain request with its full text, which was read with the
 *   tags stripped by script; its recommendations and their grades are now quoted from it. Its tables open in a
 *   viewer and were not read. The Gastroenterology and Gastrointestinal Endoscopy copies returned only a redirect page.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined; grades are quoted as printed.
 */
export const bowelPreparationForColonoscopy = protocol({
  id: "bowel-preparation-for-colonoscopy",
  name: "Bowel preparation for colonoscopy",
  aka: ["bowel prep", "colonoscopy prep", "split-dose bowel preparation", "laxative before colonoscopy", "PEG bowel prep", "Moviprep", "low-fibre diet before colonoscopy", "clear liquid diet before colonoscopy"],
  domain: "screening-diagnostics",
  tldr: "A colonoscopy misses fewer polyps when the bowel is clean. Eat low-fibre food the day before, drink the laxative as a split dose with the last part on the day of the test (or all on the day for an afternoon test), and finish it at least two hours before the test. Follow your unit's written instructions, which come first.",
  simple: "Before a colonoscopy you eat plain low-fibre food the day before and drink a strong laxative in parts. The last part is on the day of the test and should be finished at least two hours before it. A cleaner bowel means fewer polyps are missed.",
  summary: "ESGE 2019 (GRADE): a low-fibre diet on the day before (strong, moderate); enhanced instructions (strong, moderate), and for inpatients specific verbal or written instructions to patients and ward staff (strong, moderate); split-dose preparation for elective colonoscopy (strong, high), with same-day dosing an acceptable alternative for afternoon colonoscopy (strong, high); start the last dose within 5 hours of the procedure and finish it at least 2 hours before (strong, moderate); high- or low-volume PEG or clinically validated non-PEG agents, individualised where fluid and electrolyte disturbance is a risk (strong, moderate); simethicone suggested (weak, moderate); no routine enemas (strong, moderate), no routine oral sodium phosphate (strong, low) and no routine prokinetics (weak, low). After an inadequate preparation, repeat within 1 year unless clinically contraindicated (strong, moderate); same-day or next-day repeat after additional preparation may be suggested (weak, very low). PEG in inflammatory bowel disease and urgent bleeding; insufficient evidence in pregnancy. The US Multi-Society Task Force (2025), whose recommendations apply to ambulatory patients at low risk of inadequate preparation unless stated, agrees on split dosing (strong, high), same-day dosing for afternoon colonoscopy (strong, high; an inferior alternative in the morning: weak, low), dietary change limited to the day before (strong, high) and simethicone (weak, moderate). It differs in detail: both verbal and written instructions (strong, high); the second portion begun 4 to 6 hours before and finished at least 2 hours before (strong, moderate); 2-litre rather than 4-litre regimens (weak, moderate); no hyperosmotic regimens for people at risk of volume overload or electrolyte disturbance (strong, high). It recommends an adequacy rate of 90% or more for each endoscopist and each unit (strong, moderate; its abstract prints more than 90%); ESGE's quality committee sets a minimum standard of 90% or more, assessed on validated scales.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor"],
    where: ["home", "outpatient-clinic", "ward"],
  },
  population: "Adults having elective colonoscopy, including screening after a positive stool test, diagnosis of suspected bowel cancer and surveillance after cancer or polyps. People at risk of fluid and salt disturbance (ESGE names chronic kidney insufficiency, congestive heart failure and liver failure with ascites) need an individualised laxative choice; inpatients, inflammatory bowel disease, urgent colonoscopy for bleeding and pregnancy are named where ESGE addresses them. The US Task Force recommendations apply, unless it says otherwise, to ambulatory patients at low risk of inadequate preparation. Neither source read gives advice for children.",
  trigger: "A colonoscopy is booked.",
  steps: [
    {
      action: "Give enhanced instructions for the preparation; the trials used visual aids, phone calls, text messages, videos and smartphone apps",
      why: "In pooled trials, people given enhanced instructions had cleaner bowels and were more willing to repeat the preparation than people given regular instructions.",
      source: "esge-2019",
      quote: "ESGE recommends the use of enhanced instructions for bowel preparation.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "For someone in hospital, give specific spoken or written instructions to the person and to the ward staff caring for them",
      why: "ESGE reports that inadequate preparation is frequent in inpatients and that teaching patients and staff may improve it.",
      source: "esge-2019",
      quote: "ESGE recommends specific verbal or written instructions to patients and to clinic staff caring for hospitalized patients, to improve the quality of bowel preparation.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Check whether the person is at risk of fluid or salt disturbance (ESGE names chronic kidney insufficiency, congestive heart failure and liver failure with ascites) and choose the laxative individually",
      why: "Every regimen carries some risk of dehydration and salt imbalance, and ESGE says hyperosmotic preparations may raise it further in these groups.",
      source: "esge-2019",
      quote: "ESGE recommends the use of high volume or low volume PEG-based regimens as well as that of non-PEG-based agents that have been clinically validated for routine bowel preparation. In patients at risk for hydroelectrolyte disturbances, the choice of laxative should be individualized.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Do not use oral sodium phosphate routinely",
      why: "ESGE names kidney injury as its most feared harm and sudden disturbance of blood salts as another severe one.",
      source: "esge-2019",
      quote: "ESGE recommends against the routine use of oral sodium phosphate for bowel preparation.",
      grade: "Strong recommendation, low quality evidence.",
    },
    {
      action: "Eat a low-fibre diet on the day before the colonoscopy",
      why: "In pooled trials a low-residue diet cleaned the bowel as well as clear liquids alone and was easier to tolerate.",
      source: "esge-2019",
      quote: "ESGE recommends a low fiber diet on the day preceding colonoscopy.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Take the laxative as a split dose, with the last part on the day of the colonoscopy",
      why: "In pooled trials split dosing gave good cleansing more often than taking the whole preparation the day before.",
      source: "esge-2019",
      quote: "ESGE recommends split-dose bowel preparation for elective colonoscopy.",
      grade: "Strong recommendation, high quality evidence.",
    },
    {
      action: "For an afternoon colonoscopy, the whole preparation may be taken on the same day instead",
      why: "Pooled trials, mostly of afternoon colonoscopies, found similar cleansing with same-day and split dosing. For a morning colonoscopy ESGE says the data favour split dosing.",
      source: "esge-2019",
      quote: "ESGE recommends, for patients undergoing afternoon colonoscopy, a same-day bowel preparation as an acceptable alternative to split dosing.",
      grade: "Strong recommendation, high quality evidence.",
    },
    {
      action: "Start the last dose within 5 hours of the colonoscopy and finish it at least 2 hours before",
      why: "ESGE reports the best cleansing with 3 to 5 hours between the last dose and the colonoscopy, and takes 2 hours as the minimum, in line with anaesthetists' advice on clear liquids before sedation.",
      source: "esge-2019",
      quote: "ESGE recommends to start the last dose of bowel preparation within 5 hours of colonoscopy, and to complete it at least 2 hours before the beginning of the procedure.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "Consider adding simethicone to the preparation",
      why: "In the trials ESGE cites, oral simethicone reduced bubbles and improved bowel cleanliness.",
      source: "esge-2019",
      quote: "ESGE suggests adding oral simethicone to bowel preparation.",
      grade: "Weak recommendation, moderate quality evidence.",
    },
    {
      action: "Do not add enemas routinely",
      why: "In one randomised trial, adding an enema did not clean the bowel better and made the preparation less acceptable.",
      source: "esge-2019",
      quote: "ESGE recommends against the routine use of enemas for bowel preparation.",
      grade: "Strong recommendation, moderate quality evidence.",
    },
    {
      action: "If the preparation was inadequate, repeat the colonoscopy within 1 year unless there is a clinical reason not to",
      why: "ESGE says there is a high risk that relevant lesions were missed. It adds, as a weak recommendation on very low evidence, that a same-day or next-day repeat after additional preparation may be suggested, and that the next regimen should fit the likely reasons for failure.",
      source: "esge-2019",
      quote: "ESGE recommends early repetition of colonoscopy within 1 year in the case of inadequate bowel preparation, unless clinically contraindicated.",
      grade: "Strong recommendation, moderate level of evidence.",
    },
  ],
  bestInClass: {
    statement: "Split-dose preparation (ESGE: strong, high quality; US Multi-Society Task Force 2025: strong, high quality), or same-day dosing for an afternoon colonoscopy; the last dose finished at least 2 hours before; a validated PEG or non-PEG laxative chosen individually for people at risk of fluid and salt disturbance, without routine oral sodium phosphate, enemas or prokinetics; low-fibre food on the day before; enhanced instructions; simethicone suggested. The two guidelines differ in detail. On timing, ESGE says start the last dose within 5 hours of the colonoscopy and the US Task Force says begin the second portion 4 to 6 hours before (each strong, moderate). On diet, ESGE recommends a low-fibre diet on the day before; the US Task Force limits dietary change to the day before, with low-residue and low-fibre foods or full liquids for the early and midday meals (its abstract says clear liquids or low-fibre or low-residue diets). On volume, ESGE accepts high or low volume and the US Task Force suggests 2 litres rather than 4 for ambulatory patients at low risk of inadequate preparation (weak, moderate). On a morning colonoscopy, ESGE's text says the data favour split dosing without making a recommendation, and the US Task Force suggests same-day dosing is an inferior alternative (weak, low).",
    sources: ["esge-2019", "usmstf-2025"],
  },
  variants: [
    {
      name: "Clear liquids all day before the colonoscopy",
      differs: "Restricts the person to clear liquids for the whole day before, rather than low-fibre food.",
      evidence: "ESGE recommends a low-fibre diet and notes that adherence to diet restriction is low in real life. The US Task Force (2025) recommends low-residue and low-fibre foods or full liquids for the early and midday meals of the day before, for ambulatory patients at low risk of inadequate preparation on a split-dose regimen (strong, high); it lists clear liquids only on the day before among the changes to make after a previous inadequate preparation (strong, moderate).",
      sources: ["esge-2019", "usmstf-2025"],
    },
    {
      name: "Low-volume (2 litres or less) regimens",
      differs: "Uses a lower-volume PEG with ascorbate, or a non-PEG agent such as sodium picosulfate with magnesium citrate or oral sulfate solution, instead of 4 litres of PEG.",
      evidence: "ESGE accepts both high- and low-volume PEG and validated non-PEG agents (strong, moderate) and individualises the choice where fluid and salt disturbance is a risk; it reports that osmotically balanced PEG solutions are often selected for people with chronic kidney insufficiency, congestive heart failure or liver failure with ascites, and that PEG with ascorbate is not recommended with a creatinine clearance below 30 mL/min or NYHA class III or IV heart failure. The US Task Force suggests 2-litre rather than 4-litre regimens for ambulatory patients at low risk of inadequate preparation (weak, moderate) and recommends against hyperosmotic regimens in people at risk of volume overload or electrolyte disturbance (strong, high).",
      sources: ["esge-2019", "usmstf-2025"],
    },
    {
      name: "Intensified regimen for people at high risk of inadequate preparation (US Task Force)",
      differs: "Uses a larger laxative volume with bisacodyl and a longer, stricter diet than the standard preparation.",
      evidence: "The US Task Force suggests split-dose 4 L PEG-ELS plus 15 mg bisacodyl the afternoon before the colonoscopy, a low-residue diet 3 and 2 days before, and clear liquids the day before (weak, low). ESGE found insufficient data to recommend specific predictive models for inadequate preparation.",
      sources: ["usmstf-2025", "esge-2019"],
    },
  ],
  grades: [
    { claim: "Same-day or next-day repeat after an inadequate preparation", grade: "Weak recommendation, very low level of evidence.", source: "esge-2019", quote: "Same-day or next-day colonoscopy after additional preparation – with either laxative or enema – may be suggested. The next regimen of bowel preparation should be individualized according to the possible reasons for failure." },
    { claim: "PEG regimens in inflammatory bowel disease", grade: "Strong recommendation, high quality evidence.", source: "esge-2019", quote: "ESGE recommends high volume or low volume PEG-based bowel preparation in patients with inflammatory bowel disease (IBD)." },
    { claim: "PEG regimens for urgent colonoscopy for lower gastrointestinal bleeding", grade: "Strong recommendation, moderate quality evidence.", source: "esge-2019", quote: "ESGE recommends PEG regimens for bowel preparation if urgent colonoscopy is scheduled for lower gastrointestinal bleeding (LGIB)." },
    { claim: "No routine prokinetic agents", grade: "Weak recommendation, low quality evidence.", source: "esge-2019", quote: "ESGE does not suggest the routine use of prokinetic agents for bowel preparation." },
    { claim: "Pregnancy and breastfeeding: insufficient evidence for a specific regimen", grade: "Insufficient evidence to determine net benefits or risks.", source: "esge-2019", quote: "ESGE found insufficient evidence to determine for or against the use of specific regimens in pregnant/breastfeeding women." },
    { claim: "Split dosing for all patients (US)", grade: "strong recommendation, high-quality evidence", source: "usmstf-2025", quote: "We recommend a split-dose administration of bowel preparation purgatives for all patients, regardless of high-volume or low-volume preparation (strong recommendation, high-quality evidence)." },
    { claim: "Timing of the second portion (US)", grade: "strong recommendation, moderate-quality evidence", source: "usmstf-2025", quote: "For individuals using a split-dose regimen for colonoscopy preparation, we recommend the consumption of the second portion begin 4–6 hours before the time of colonoscopy and be completed at least 2 hours before the procedure start (strong recommendation, moderate-quality evidence)." },
    { claim: "Same-day dosing an inferior alternative for a morning colonoscopy (US)", grade: "weak recommendation, low-quality evidence", source: "usmstf-2025", quote: "We suggest that a same-day regimen is an inferior alternative to split dosing for individuals undergoing a morning colonoscopy (weak recommendation, low-quality evidence)." },
    { claim: "Both verbal and written instructions (US)", grade: "strong recommendation, high-quality evidence", source: "usmstf-2025", quote: "We recommend that individuals undergoing colonoscopy receive both verbal and written patient education instructions for all components of the colonoscopy preparation (strong recommendation, high-quality evidence)." },
    { claim: "No hyperosmotic regimens for people at risk of volume overload or electrolyte disturbance (US)", grade: "strong recommendation, high-quality evidence", source: "usmstf-2025", quote: "We recommend against the use of hyperosmotic regimens in individuals at risk for volume overload or electrolyte disturbances (strong recommendation, high-quality evidence)." },
    { claim: "Repeat within 12 months after an inadequate screening or surveillance colonoscopy (US)", grade: "strong recommendation, moderate-quality evidence", source: "usmstf-2025", quote: "When the bowel preparation is deemed inadequate to allow assigning standard screening or surveillance intervals, we recommend completing a colonoscopy within 12 months for screening or surveillance colonoscopies (strong recommendation, moderate-quality evidence)." },
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
      accessed: "2026-11-17",
    },
    {
      key: "usmstf-2025",
      label: "Optimizing Bowel Preparation Quality for Colonoscopy: Consensus Recommendations by the US Multi-Society Task Force on Colorectal Cancer",
      publisher: "US Multi-Society Task Force on Colorectal Cancer (Jacobson et al., American Journal of Gastroenterology; co-published in Gastroenterology and Gastrointestinal Endoscopy)",
      year: 2025,
      url: "https://doi.org/10.14309/ajg.0000000000003287",
      doi: "10.14309/ajg.0000000000003287",
      gradingScheme: "Committee consensus: strong ('we recommend') or weak ('we suggest') recommendation; high, moderate, low or very low quality evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["colorectal"],
  terms: ["colonoscopy"],
  related: [],
  upgrades: [],
  gaps: [
    "The ESGE guideline dates from 2019. On 17 November 2026 no newer ESGE bowel preparation guideline was found in Europe PMC or Crossref; the guideline listing on esge.com is drawn by script and could not be read.",
    "The US Task Force update (2025) was read in full on 17 November 2026 from the American Journal of Gastroenterology copy. Its tables, including the list of risk factors for inadequate preparation, open in a viewer and were not read, so who counts as high risk is not stated here.",
    "ESGE does not define how a split dose is divided. The US Task Force describes the most common convention as half the evening before and half on the morning of the colonoscopy, and notes that other splits are used; the unit's own instructions decide.",
    "The two guidelines word the timing of the last dose differently (ESGE: start within 5 hours; US Task Force: begin 4 to 6 hours before) and neither discusses the other's figure.",
    "Neither source read gives specific advice for people having chemotherapy, with a stoma, or after bowel resection for cancer; their preparation follows local policy and the endoscopist's advice.",
    "How to manage diabetes medicines and blood pressure medicines around colonoscopy is, in the US Task Force's words, beyond the scope of its document, and it leaves antithrombotic medicines to separate guidelines; it notes that advice on GLP-1 receptor agonists is likely to change. Anticoagulants are covered by the protocol on holding blood thinners before biopsy and endoscopy.",
  ],
});
