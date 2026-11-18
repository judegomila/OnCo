import { protocol } from "./helpers";

/*
 * Hyponatraemia in a person with cancer, most often from SIADH (syndrome of inappropriate antidiuretic hormone, also
 * called SIAD): emergency treatment of severe symptoms, safe correction limits, and finding and treating the cause.
 *
 * What was read, and how (first on 11 November 2026; every source fetched again and re-read on 16 November 2026 for
 * the second accuracy pass, raw and as text):
 * - Society for Endocrinology Endocrine Emergency Guidance on severe symptomatic hyponatraemia (Endocrine Connections
 *   2016): open access, full text from Europe PMC (PMC5314809). Its three figures are images. On 16 November 2026 they
 *   were downloaded from the PubMed Central page and read by eye, so the bolus regimen in Figure 1 is now stated in
 *   the summary; figure text cannot be checked by script and is never used as a quote.
 * - Korean Society of Nephrology 2022 recommendations (Korean Journal of Internal Medicine): open access, full text from
 *   Europe PMC (PMC9666265). It tabulates the 2013 American and 2014 European regimens and quotes the European grades.
 * - ESE/ESICM/ERBP 2014 European guideline: abstract only. On 16 November 2026 academic.oup.com again returned 403 for
 *   the EJE and NDT copies, and no copy is in PubMed Central. Its recommendations are described here only as the
 *   Korean guideline reports them.
 * - SALSA trial (JAMA Internal Medicine 2021) and The Oncologist 2012 review: read in full on 16 November 2026 from
 *   their free PubMed Central pages (PMC7589081, PMC3380874); on 11 November only the abstracts had been read.
 * - 2026 scoping review of tolvaptan in small-cell lung cancer: abstract from Europe PMC.
 * - NICE CKS hyponatraemia returned 403 to a script again. Not read.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text. No
 * newer edition of any source was found in Europe PMC or Crossref on 16 November 2026.
 */
export const hyponatraemiaSiadh = protocol({
  id: "hyponatraemia-siadh",
  name: "Hyponatraemia and SIADH in cancer: emergency hypertonic saline, safe correction and treating the cause",
  aka: ["low sodium in cancer", "SIADH", "SIAD", "syndrome of inappropriate antidiuretic hormone", "paraneoplastic hyponatraemia", "hypertonic saline bolus"],
  domain: "emergencies",
  tldr: "Low sodium in the blood is common in cancer, especially small-cell lung cancer, and can also come from some cancer drugs, sickness or diarrhoea. Vomiting, confusion, drowsiness or a fit with low sodium is an emergency: hospital teams give a strong salt drip in small doses and check often, because raising sodium too fast can damage the brain. Then the cause is treated.",
  simple: "Low sodium can make you confused, sick or drowsy. It can be caused by the cancer or its treatment. If this happens, ring your cancer team the same day.",
  summary: "Treatment follows symptoms, not the number (Society for Endocrinology 2016): severe symptoms (vomiting, seizures, reduced consciousness, cardiorespiratory arrest) need immediate hypertonic saline whatever the cause, supervised by a senior clinician, aiming for a 5 mmol/L rise in the first hour. Its Figure 1 gives 150 mL of 3% hypertonic saline or equivalent over 20 minutes, a sodium check, a second 150 mL while the result is awaited, then a repeat twice or until sodium has risen by 5 mmol/L; after that the rise is limited to 10 mmol/L in the first 24 hours and a further 8 mmol/L in each 24 hours until 130 mmol/L. If the limit of 10 mmol/L in 24 hours or 18 mmol/L in 48 hours is exceeded, hypertonic fluid stops and an experienced clinician may consider hypotonic fluid, with or without anti-diuresis, to re-lower (the Korean guideline names 5% dextrose and desmopressin). After the emergency, urine osmolality and urine sodium define the cause.\n\nThe Korean Society of Nephrology 2022 guideline suggests rapid intermittent boluses for symptomatic severe hyponatraemia (B, low), drawing on the SALSA trial and one cohort study (SALSA, 178 patients: overcorrection, defined there as a rise of more than 12 mmol/L in 24 hours or 18 mmol/L in 48 hours, 17.2% with boluses against 24.2% with infusion, not significant; re-lowering treatment needed less often with boluses, 41.4% against 57.1%), and tabulates the European bolus regimen of 150 mL over 20 minutes, given two to three times as needed, for severe symptoms; it notes the European guideline graded bolus therapy 1D. It says sodium should not rise by 10 mmol/L or more in a day, with a stricter limit of 8 mmol/L a day for people at high risk of osmotic demyelination. For SIAD it names fluid restriction as standard, with oral salt plus a loop diuretic, or a vaptan, as options second line; it suggests vaptans for moderate to severe hyponatraemia (B, low) and reports that the European guideline recommends against them in people without moderately severe or severe symptoms. In people with brain disease, including brain tumours, it says clinicians should avoid volume depletion from water restriction.\n\nIn cancer, SIADH is the usual cause, most often with small-cell lung cancer, from ectopic vasopressin or from anticancer and palliative drugs; vomiting and diarrhoea cause hypovolaemic hyponatraemia (The Oncologist 2012). A 2026 scoping review of 86 SCLC patients on tolvaptan reported an initial response in all cases and overcorrection in five.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "emergency-team"],
    where: ["emergency-department", "acute-oncology-service", "ward", "intensive-care"],
  },
  population: "Adults with cancer who have a serum sodium below 135 mmol/L, with or without symptoms. The Society for Endocrinology guidance covers adults with severe or moderately severe symptoms; the Korean guideline also covers chronic and mild hyponatraemia and makes a separate recommendation for children's maintenance fluids, not covered here.",
  trigger: "A low sodium on a blood test, or vomiting, confusion, drowsiness or a seizure in a person with cancer, particularly small-cell lung cancer, or someone taking anticancer or palliative drugs that can cause SIADH.",
  steps: [
    {
      action: "Judge urgency by symptoms and signs, not by the sodium level alone",
      why: "A very low sodium can cause no symptoms, while a moderately low one can cause serious brain symptoms; how fast it fell is one of the things that matters.",
      source: "sfe-2016",
      quote: "Severity of clinical presentation may not match the degree of hyponatraemia: profound hyponatraemia may be symptom-free, while some patients with moderate biochemistry may have significant neurological symptoms and signs.",
    },
    {
      action: "For severe symptoms (vomiting, seizures, reduced consciousness, cardiorespiratory arrest), give hypertonic saline immediately, whatever the cause",
      why: "Swelling of the brain from low sodium can kill; the cause can be found afterwards.",
      source: "sfe-2016",
      quote: "Patients with severe symptoms require immediate treatment with hypertonic saline, irrespective of the cause of the hyponatraemia.",
    },
    {
      action: "Have a senior, experienced clinician decide on and supervise hypertonic saline, aiming for a 5 mmol/L rise in the first hour",
      why: "Raising sodium a little quickly relieves brain swelling; raising it too far is dangerous.",
      source: "sfe-2016",
      quote: "The aim is to achieve a 5 mmol/L rise in serum Na+ within the first hour, reducing immediate danger from cerebral oedema while minimising the risk of over-rapid correction and osmotic demyelination.",
    },
    {
      action: "For severe symptoms, give hypertonic saline as rapid, repeated small boluses rather than a slow continuous infusion",
      why: "In a randomised trial boluses reached the first-hour target more often and needed fewer corrections afterwards, with no more overcorrection.",
      source: "ksn-2022",
      quote: "We suggest RIB administration of hypertonic saline in patients with symptomatic severe hypotonic hyponatremia (B, low).",
      grade: "B, low",
    },
    {
      action: "Check sodium 1 hour after the first dose of hypertonic saline, then every 6 hours, and reassess once symptoms improve or sodium has risen by 5 to 9 mmol/L",
      why: "Sodium can rise faster than planned, especially once the body starts passing more urine.",
      source: "ksn-2022",
      quote: "We suggest checking SNa concentration 1 hour after first hypertonic saline administration, then re-checking SNa concentration every 6 hours to adjust the administration interval or infusion rate of hypertonic saline [1].",
    },
    {
      action: "Stop hypertonic fluid if sodium rises by more than 10 mmol/L in 24 hours or 18 mmol/L in 48 hours, and consult a clinician experienced in over-correction about re-lowering with hypotonic fluid, with or without an antidiuretic",
      why: "Correcting too fast can cause osmotic demyelination, a serious injury to the brain.",
      source: "sfe-2016",
      quote: "If the limit of 10 mmol/L in the first 24 h or 18 mmol/L in the first 48 h of treatment is exceeded, hypertonic fluid should be stopped.",
    },
    {
      action: "Use a stricter limit of 8 mmol/L a day for people at high risk: sodium of 105 mmol/L or less, low potassium, alcohol misuse, malnutrition or advanced liver disease",
      why: "These people are more likely to be harmed by fast correction, and malnutrition is common in advanced cancer.",
      source: "ksn-2022",
      quote: "SNa concentration should not be corrected by ≥ 10 mmol/L per day, with a more stringent limit of > 8 mmol/L per day for patients at high risk of ODS (SNa concentration ≤ 105 mmol/L, hypokalemia, alcoholism, malnutrition, and advanced liver disease) [2].",
    },
    {
      action: "Once the emergency is controlled, measure urine osmolality and urine sodium to find the cause",
      why: "Treatment differs by cause, and these two urine tests are what separate the causes.",
      source: "sfe-2016",
      quote: "Measurement of urine osmolality and urine Na+ concentration are central to defining the aetiology of hyponatraemia.",
    },
    {
      action: "In a person with cancer, think first of SIADH (from small-cell lung cancer above all, or from anticancer and palliative drugs), and of fluid loss from vomiting and diarrhoea; review the medicines that can cause it",
      why: "These are the usual causes in cancer and are treated differently; choosing the wrong treatment can make the sodium worse.",
      source: "castillo-2012",
      quote: "Hyponatremia in the cancer patient is usually caused by the syndrome of inappropriate antidiuretic hormone (SIADH), which develops more frequently with SCLC than with other malignancies.",
    },
    {
      action: "For SIADH without severe symptoms, restrict free water first; second-line options are oral salt with a loop diuretic, or a vaptan",
      why: "Fluid restriction lets the kidneys correct sodium slowly; tablets are added if it is not enough.",
      source: "ksn-2022",
      quote: "In patients with SIAD, the standard treatment is the restriction of free water because of water retention [32].",
    },
    {
      action: "In people with a brain tumour or other brain disease, avoid drying the person out with fluid restriction, and individualise treatment",
      why: "Low sodium with brain disease can come from salt loss or low cortisol as well as SIADH, and becoming dry can harm the brain.",
      source: "ksn-2022",
      quote: "Therefore, in the case of hyponatremia accompanying these cerebral diseases, clinicians should avoid volume depletion through water restriction [63].",
    },
  ],
  bestInClass: {
    statement: "For the emergency, the guidelines read agree: severe symptoms mean immediate hypertonic saline, a first-hour rise of about 5 mmol/L, and a limit of about 10 mmol/L in 24 hours (Society for Endocrinology 2016, which cites the 2014 European and 2013 American guidelines and adds 18 mmol/L in 48 hours; the Korean 2022 guideline aims for 4 to 6 mmol/L at first and says not to correct by 10 mmol/L or more in a day). How to give it has trial evidence since 2014: the SALSA randomised trial found boluses no more likely to overcorrect than continuous infusion and less likely to need re-lowering, and the Korean 2022 guideline therefore suggests boluses (B, low). Where they disagree is chronic SIADH: the Korean guideline suggests a vaptan for moderate to severe hyponatraemia (B, low), while it reports that the European 2014 guideline recommends against vaptans in SIAD without moderately severe or severe symptoms. None of these is cancer-specific; the oncology-specific source read (The Oncologist 2012) is a review. The 2014 European guideline itself could not be read in full.",
    sources: ["sfe-2016", "ksn-2022", "salsa-2021", "ese-2014", "castillo-2012"],
  },
  variants: [
    {
      name: "Slow continuous infusion of hypertonic saline",
      differs: "Gives hypertonic saline as a continuous infusion (for example 0.5 to 2 mL/kg/hour, the 2013 American regimen for moderate symptoms, as tabulated by KSN 2022) rather than boluses.",
      evidence: "SALSA, 178 patients: no difference in overcorrection, defined as a rise of more than 12 mmol/L in 24 hours or 18 mmol/L in 48 hours (24.2% with infusion against 17.2% with boluses, P = .26) but more re-lowering treatment with infusion (57.1% against 41.4%, P = .04).",
      sources: ["salsa-2021", "ksn-2022"],
    },
    {
      name: "Vaptans (tolvaptan) for SIADH in small-cell lung cancer",
      differs: "Uses an oral vasopressin receptor antagonist when fluid restriction is not enough or is hard to follow; The Oncologist 2012 review notes that fluid restriction is a particular problem when cisplatin is needed urgently, because that drug needs good hydration, and that tolvaptan should be started in hospital so sodium can be monitored.",
      evidence: "KSN 2022 suggests vaptans in SIAD with moderate to severe hyponatraemia (B, low; 12 trials, no survival benefit); a 2026 scoping review of published cases (29 studies, 86 SCLC patients) reported an initial response in all, overcorrection in five, and secondary failure in five, which it says should prompt a search for tumour progression.",
      sources: ["ksn-2022", "tolvaptan-sclc-2026", "castillo-2012"],
    },
  ],
  grades: [
    { claim: "Rapid intermittent bolus of hypertonic saline for symptomatic severe hyponatraemia", grade: "B, low", source: "ksn-2022" },
    { claim: "Vaptans in SIAD with moderate to severe hyponatraemia", grade: "B, low", source: "ksn-2022", quote: "We suggest treatment with vaptans in syndrome of inappropriate antidiuresis (SIAD) patients with moderate to severe hyponatremia (B, low)." },
    { claim: "Desmopressin applied individually to prevent or treat overcorrection", grade: "B, very low", source: "ksn-2022", quote: "We suggest that desmopressin should be applied individually according to risk factors affecting overcorrection, hypertonic saline therapeutic regimen, and whether to administer dextrose solution during overcorrection in patients with hyponatremia (B, very low)." },
    { claim: "Individualised treatment of hyponatraemia with brain disease", grade: "E (expert consensus)", source: "ksn-2022", quote: "We consider it reasonable that treatment with hypertonic or isotonic saline infusion, oral sodium chloride, or fludrocortisone for the correction of hypo-osmolar hyponatremia should be individualized among patients with cerebral diseases (E)." },
    { claim: "Hypertonic saline in small fixed boluses (as the European 2014 guideline grades it, reported by KSN 2022)", grade: "1D (European); expert opinion (American)", source: "ksn-2022", quote: "Although the American (2013) and European (2014) guidelines recommend administering hypertonic saline in small, fixed boluses (recommendation grade: expert opinion in the American guidelines, 1D in the European guidelines), they were not based on high-quality RCT evidence [1,2,17]." },
  ],
  sources: [
    { key: "sfe-2016", label: "Society for Endocrinology Endocrine Emergency Guidance: Emergency management of severe symptomatic hyponatraemia in adult patients", publisher: "Society for Endocrinology, Endocrine Connections", year: 2016, url: "https://europepmc.org/article/PMC/PMC5314809", doi: "10.1530/EC-16-0058", gradingScheme: "Emergency guidance from the Society for Endocrinology Clinical Committee; recommendations are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "ksn-2022", label: "Korean Society of Nephrology 2022 recommendations on controversial issues in diagnosis and management of hyponatremia", publisher: "Korean Society for Electrolyte and Blood Pressure Research with the Korean Society of Nephrology, Korean Journal of Internal Medicine", year: 2022, url: "https://europepmc.org/article/PMC/PMC9666265", doi: "10.3904/kjim.2022.174", gradingScheme: "Strength A (strong), B (conditional), C (against), I (inconclusive) or E (expert consensus), with quality of evidence high, moderate, low or very low, printed as '(B, low)'.", read: "full-text", accessed: "2026-11-16" },
    { key: "ese-2014", label: "Clinical practice guideline on diagnosis and treatment of hyponatraemia (ESE, ESICM and ERBP/ERA-EDTA)", publisher: "European Society of Endocrinology, European Journal of Endocrinology", year: 2014, url: "https://europepmc.org/abstract/MED/24569125", doi: "10.1530/EJE-13-1020", gradingScheme: "Grades are printed as a number and a letter (for example 1D), as KSN 2022 reports them; the abstract read gives no recommendations and no grading key.", read: "abstract", accessed: "2026-11-16" },
    { key: "salsa-2021", label: "Risk of Overcorrection in Rapid Intermittent Bolus vs Slow Continuous Infusion Therapies of Hypertonic Saline for Patients With Symptomatic Hyponatremia: The SALSA Randomized Clinical Trial", publisher: "JAMA Internal Medicine", year: 2021, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7589081/", doi: "10.1001/jamainternmed.2020.5519", read: "full-text", accessed: "2026-11-16" },
    { key: "castillo-2012", label: "Diagnosis and management of hyponatremia in cancer patients", publisher: "The Oncologist", year: 2012, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3380874/", doi: "10.1634/theoncologist.2011-0400", read: "full-text", accessed: "2026-11-16" },
    { key: "tolvaptan-sclc-2026", label: "Tolvaptan for paraneoplastic SIADH in small cell lung cancer: a scoping review", publisher: "Cancer Treatment and Research Communications", year: 2026, url: "https://doi.org/10.1016/j.ctarc.2026.101233", doi: "10.1016/j.ctarc.2026.101233", read: "abstract", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The 2014 European guideline (ESE, ESICM, ERBP) could not be read in full: its publisher refused a script and the Springer copy returned a bot check. On 16 November 2026 the publisher refused again (403 for both the EJE and NDT copies) and no copy is in PubMed Central, so only the abstract was re-read. Its recommendations and grades appear here only as the Korean 2022 guideline reports them, and its own wording on vaptans in SIAD could not be checked.",
    "The Society for Endocrinology bolus regimen is in figures that are images. On 16 November 2026 the three figures were downloaded from PubMed Central and read by eye: Figure 1 gives 150 mL of 3% hypertonic saline or equivalent over 20 minutes. That reading could not be checked by script, so no step quotes it. The European regimen (150 mL over 20 minutes, two to three times as needed) is given as tabulated by KSN 2022, whose table does not state the strength of the saline.",
    "The sources do not use one definition of going too fast: the Society for Endocrinology stops hypertonic fluid above 10 mmol/L in 24 hours or 18 mmol/L in 48 hours, the Korean guideline says not to correct by 10 mmol/L or more in a day, and the SALSA trial counted overcorrection only above 12 mmol/L in 24 hours or 18 mmol/L in 48 hours.",
    "No cancer-specific guideline on hyponatraemia was found; the oncology sources read are a 2012 review (in full on 16 November 2026) and a 2026 scoping review of case reports (abstract only). The Italian SIE, SIN and AIOM consensus (2018, Journal of Endocrinological Investigation) is not open access and was not read.",
    "Hyponatraemia from adrenal insufficiency after checkpoint inhibitors is not covered here; see the protocol on hypophysitis and adrenal insufficiency.",
    "NICE has no guideline on hyponatraemia; its Clinical Knowledge Summary refused a script, again on 16 November 2026.",
  ],
  cancers: ["sclc"],
  related: ["irae-hypophysitis-adrenal"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "electrolytes"],
});
