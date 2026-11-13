import { protocol } from "./helpers";

/*
 * Follow-up after curative treatment for colorectal cancer: CEA, CT and colonoscopy schedules.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG151, Colorectal cancer (published January 2020, last updated December 2021): recommendations page and the
 *   rationale and impact page (HTML, full text), section 1.6.
 * - American Cancer Society Colorectal Cancer Survivorship Care Guidelines (El-Shami et al., CA Cancer J Clin 2015):
 *   full text from PubMed Central (PMC5385892), including its Table 1, which reproduces the NCCN schedule the ACS
 *   endorses and notes where ASCO differs.
 * - BSG/ACPGBI/PHE post-polypectomy and post-colorectal cancer resection surveillance guidelines (Rutter et al., Gut
 *   2020): full text from PubMed Central (PMC6984062).
 * - ASCO endorsement of the Cancer Care Ontario follow-up guideline (Meyerhardt et al., J Clin Oncol 2013) and the
 *   Cochrane review of follow-up strategies (Jeffery et al., 2019): abstracts, from Europe PMC.
 * - Summary of the German S3 colorectal cancer guideline (Dtsch Arztebl Int 2025): full text from PubMed Central
 *   (PMC12947252); its follow-up table lost its column positions in the text.
 * - ESMO localised colon cancer (2020) and localised rectal cancer (2025) guidelines: Europe PMC holds no abstract and
 *   the publisher refused a script. Not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const colorectalCancerFollowUpAfterCurativeTreatment = protocol({
  id: "colorectal-cancer-follow-up-after-curative-treatment",
  name: "Follow-up after curative treatment for colorectal cancer",
  aka: ["bowel cancer follow-up", "colorectal cancer surveillance", "CEA and CT surveillance after bowel cancer", "colonoscopy after bowel cancer surgery"],
  domain: "survivorship",
  tldr: "After an operation to cure bowel cancer, you will usually have regular blood tests (CEA) and CT scans for the first 3 years, and a colonoscopy about a year after surgery. The aim is to find a return early enough to operate again. How often you are tested differs between countries, and the large trials found that testing more often does not, on average, help people live longer.",
  simple: "After bowel cancer surgery you have check-ups: blood tests, scans and a camera test of the bowel. These look for the cancer coming back. Tell your team about new symptoms between check-ups.",
  summary: "NICE NG151 offers follow-up for the first 3 years after potentially curative surgery for non-metastatic colorectal cancer, with serum carcinoembryonic antigen (CEA) and CT of the chest, abdomen and pelvis, and does not set a frequency. The American Cancer Society (2015) endorses the NCCN schedule for stages I to III: history and examination and CEA every 3 to 6 months for 2 years, then every 6 months to 5 years; CT every 12 months; colonoscopy at 1 year. ASCO (2013) gives CEA every 3 to 6 months for 5 years and CT annually for 3 years in most cases. Colonoscopy is at 1 year after surgery in all these sources; the next is after 3 more years (BSG/ACPGBI 2020, NCCN) or 5 years (ASCO). PET-CT is not a surveillance test.\n\nThe evidence for intensity is weak: the 2019 Cochrane review of 19 randomised trials (13,216 people) found that intensive follow-up made little or no difference to overall survival (hazard ratio 0.91, high-quality evidence), although it nearly doubled salvage surgery with curative intent. Surveillance is only for people fit for further surgery or treatment, and colonoscopic surveillance stops in general at about 75 or with a life expectancy under 10 years (BSG/ACPGBI). People who had sphincter-preserving surgery should be told about low anterior resection syndrome and how to get help (NICE).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "telephone-triage"],
  },
  population: "Adults who have had potentially curative treatment for non-metastatic colorectal cancer (stages I to III). Stage IV after resection of metastases with no evidence of disease has a more intensive schedule in the ACS and NCCN tables, mentioned as a variant. Hereditary syndromes such as Lynch syndrome have their own colonoscopy schedules and are not covered here.",
  trigger: "Curative surgery and any adjuvant treatment are complete.",
  steps: [
    {
      action: "Decide with the person whether surveillance suits them, given their fitness for further surgery and their wishes",
      why: "Tests only help if finding a return would lead to treatment; someone who could not have further surgery or treatment gains nothing from them.",
      source: "acs-2015",
      quote: "Testing should only be performed in patients in whom the results will change treatment decisions.",
    },
    {
      action: "Offer follow-up for at least the first 3 years, with CEA blood tests and CT of the chest, abdomen and pelvis",
      why: "Most returns happen in the first few years, and finding them with CEA and liver imaging makes them more likely to be operable.",
      source: "nice-ng151",
      quote: "For people who have had potentially curative surgical treatment for non-metastatic colorectal cancer, offer follow-up for detection of local recurrence and distant metastases for the first 3 years. Follow-up should include serum carcinoembryonic antigen (CEA) and CT scan of the chest, abdomen and pelvis.",
    },
    {
      action: "See the person and check CEA every 3 to 6 months for the first 2 years, then every 6 months up to 5 years for T2 or larger tumours",
      why: "This is the frequency in the American schedules; people at higher risk of return are seen at the more frequent end.",
      source: "acs-2015",
      quote: "Recommendation 4: Carcinoembryonic antigen (CEA) testing should be conducted every 3–6 months for the first 2 years and every 6 months for years 3–5 for those with T2 or greater lesions. CEA is not recommended after 5 years.",
      grade: "2A",
    },
    {
      action: "Do a CT of the chest, abdomen and pelvis every 12 months; for 3 years under ASCO, up to 5 years for higher-risk and stage III disease under NCCN",
      why: "Yearly scans find spread to the liver or lungs while it may still be removable.",
      source: "acs-2015",
      quote: "In contrast to the NCCN recommendations, ASCO recommends CT scans of the abdomen and chest annually for only 3 years for CRC survivors.",
      grade: "2A",
    },
    {
      action: "Do a colonoscopy within a year of diagnosis or surgery, sooner if the whole bowel was not seen before the operation",
      why: "It finds polyps or a second cancer that were missed or have grown since, and clears the bowel.",
      source: "bsg-2020",
      quote: "We recommend that patients who have undergone a potentially curative CRC resection should have a clearance colonoscopy within a year of their diagnosis",
      grade: "GRADE of evidence: low; strength of recommendation: strong",
    },
    {
      action: "After a clear colonoscopy, repeat it after 3 more years, then decide further surveillance by the findings",
      why: "Polyps take years to turn into cancer, so a clear colonoscopy buys time before the next.",
      source: "bsg-2020",
      quote: "We recommend that once a clearance colonoscopy has been performed in the postoperative period in patients who have had a CRC resection, their next surveillance should be performed after an interval of 3 years.",
      grade: "GRADE of evidence: low; strength of recommendation: strong",
    },
    {
      action: "Do not use PET-CT or routine blood counts and liver tests for surveillance, and stop routine CEA and CT after 5 years",
      why: "They add cost and false alarms without finding treatable returns earlier.",
      source: "acs-2015",
      quote: "After five years, routine CEA monitoring is not recommended After five years, routine CT scans are not recommended Routine use of PET/CT is not recommended for any stage",
      grade: "2A",
    },
    {
      action: "Stop colonoscopic surveillance in general at about 75 or when life expectancy is under 10 years",
      why: "A new polyp takes many years to become a cancer that causes harm, so late surveillance rarely helps.",
      source: "bsg-2020",
      quote: "surveillance should only be performed in people whose life-expectancy is greater than 10 years, and in general not in people older than about 75 years.",
      grade: "GRADE of evidence: low; strength of recommendation: weak",
    },
    {
      action: "Before sphincter-preserving surgery, explain low anterior resection syndrome and tell the person to seek help from their GP if it happens",
      why: "Bowel urgency, frequency and leakage after rectal surgery are common and treatable, and may start after discharge.",
      source: "nice-ng151",
      quote: "Give information on low anterior resection syndrome (LARS) to people who will potentially have sphincter-preserving surgery.",
    },
    {
      action: "Give a written plan saying who does each test, and when, so the GP or nurse can follow it",
      why: "Follow-up is often shared between hospital and primary care, and missed tests happen when nobody knows whose job they are.",
      source: "asco-2013",
      quote: "A treatment plan from the specialist should have clear directions on appropriate follow-up by a nonspecialist.",
    },
  ],
  bestInClass: {
    statement: "All sources agree on surveillance with CEA and CT for the first years after curative treatment and a colonoscopy within a year; they differ on frequency and length. NICE NG151 (2020) sets 3 years with CEA and CT and no frequency; ASCO (2013) sets CEA every 3 to 6 months for 5 years, CT annually for 3 years, and colonoscopy at 1 year then every 5 years; the American Cancer Society (2015) endorses NCCN's longer schedule, with CT every 12 months up to 5 years for higher-risk stage I to III disease and colonoscopy at 1 and 3 years; BSG/ACPGBI (2020) set colonoscopy at 1 year and 3 years after that. The best-supported reading of the trials (Cochrane 2019, 19 randomised trials, high-quality evidence) is that intensive follow-up finds more returns that can be operated on but makes little or no difference to overall survival, which supports the shorter, lighter end of these schedules for most people. ESMO's 2020 colon and 2025 rectal guidelines could not be read.",
    sources: ["nice-ng151", "nice-ng151-rationale", "acs-2015", "asco-2013", "bsg-2020", "cochrane-2019", "esmo-colon-2020", "esmo-rectal-2025"],
  },
  variants: [
    {
      name: "NCCN schedule endorsed by the American Cancer Society",
      differs: "CT every 12 months for stages I to III in years 1 and 2 and up to 5 years for higher-risk and stage III disease; colonoscopy at 1 year, at 3 years and then every 5 years; proctoscopy every 6 months for rectal cancer; and, for stage IV with no evidence of disease, CT every 3 to 6 months in years 1 and 2.",
      evidence: "Level of evidence 2A for the whole table, as printed by the ACS; the ACS notes that ASCO does not recommend the 3-year colonoscopy.",
      sources: ["acs-2015"],
    },
    {
      name: "ASCO endorsement of Cancer Care Ontario (2013)",
      differs: "History, examination and CEA every 3 to 6 months for 5 years; CT of abdomen and chest annually for 3 years in most cases; colonoscopy 1 year after surgery and then every 5 years, guided by the previous one.",
      evidence: "An endorsement of a guideline built on the same trials; read as an abstract.",
      sources: ["asco-2013"],
    },
    {
      name: "Three years and no frequency (NICE NG151)",
      differs: "Sets the length (the first 3 years) and the tests (CEA and CT of chest, abdomen and pelvis) and leaves the frequency to local practice; leaves colonoscopic surveillance to the BSG and ACPGBI guidance.",
      evidence: "NICE's committee found that recurrence was more likely to be resectable with regular follow-up including CEA and liver imaging, and found no evidence to change its 2011 recommendation.",
      sources: ["nice-ng151", "nice-ng151-rationale"],
    },
    {
      name: "Ultrasound-led follow-up, CEA only if raised before treatment (German S3 guideline)",
      differs: "Schedules history and examination and abdominal ultrasound at intervals, with CT at a single point and the choice between CT and ultrasound made individually; re-assesses CEA after curative treatment where it was raised before; colonoscopy within 6 months of surgery if the bowel was not fully examined before; length of follow-up, 3 or 5 years, decided individually.",
      evidence: "The 2025 English-language summary of the German S3 guideline cites the same Cochrane review and an earlier meta-analysis that did find a benefit of intensive follow-up. Its table of months lost its column positions in the text read, so the exact months for each test are not given here.",
      sources: ["german-s3-2025"],
    },
  ],
  grades: [
    { claim: "Surveillance colonoscopy on a risk-based schedule", grade: "2A", source: "acs-2015", quote: "Recommendation 2: CRC survivors should receive surveillance colonoscopy according to a schedule based on based on risk. Level of Evidence = 2A" },
    { claim: "History and examination every 3 to 6 months for 2 years, every 6 months to 5 years, then annually", grade: "2A", source: "acs-2015", quote: "Recommendation 3: CRC survivors should receive a history and physical every 3–6 months in the first 2 years and every 6 months in years 3–5, and annually after 5 years." },
    { claim: "CT of chest, abdomen and pelvis every 12 months for stages I to III, up to 5 years", grade: "2A", source: "acs-2015", quote: "Recommendation 5: Chest/abdominal/pelvic CT should be performed every 12 months (stages I-III) or every 3–6 months (stage IV, NED) for up to 5 years." },
    { claim: "Clearance colonoscopy within a year of diagnosis after curative resection", grade: "GRADE of evidence low; strength strong", source: "bsg-2020" },
    { claim: "Next colonoscopy 3 years after the clearance colonoscopy", grade: "GRADE of evidence low; strength strong", source: "bsg-2020" },
    { claim: "Intensive follow-up and overall survival", grade: "high-quality evidence (GRADE): little or no difference", source: "cochrane-2019", quote: "Overall survival: we found intensive follow-up made little or no difference (hazard ratio (HR) 0.91, 95% confidence interval (CI) 0.80 to 1.04: I² = 18%; high-quality evidence)." },
    { claim: "Intensive follow-up and salvage surgery with curative intent", grade: "high-quality evidence (GRADE): more frequent", source: "cochrane-2019", quote: "Salvage surgery with curative intent: this was more frequent with intensive follow-up (risk ratio (RR) 1.98, 95% CI 1.53 to 2.56; I² = 31%; high-quality evidence)." },
  ],
  sources: [
    { key: "nice-ng151", label: "Colorectal cancer (NG151), recommendations", publisher: "NICE", year: 2020, url: "https://www.nice.org.uk/guidance/ng151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider'). Published January 2020, last updated December 2021.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng151-rationale", label: "Colorectal cancer (NG151), rationale and impact", publisher: "NICE", year: 2020, url: "https://www.nice.org.uk/guidance/ng151/chapter/Rationale-and-impact", read: "full-text", accessed: "2026-11-11" },
    { key: "acs-2015", label: "American Cancer Society Colorectal Cancer Survivorship Care Guidelines", publisher: "American Cancer Society, CA: A Cancer Journal for Clinicians", year: 2015, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5385892/", doi: "10.3322/caac.21286", gradingScheme: "Each recommendation printed with a level of evidence on the scheme the ACS used (for example 2A); the surveillance table carries 2A as a whole.", read: "full-text", accessed: "2026-11-11" },
    { key: "bsg-2020", label: "British Society of Gastroenterology/Association of Coloproctology of Great Britain and Ireland/Public Health England post-polypectomy and post-colorectal cancer resection surveillance guidelines", publisher: "BSG, ACPGBI and PHE, Gut", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6984062/", doi: "10.1136/gutjnl-2019-319858", gradingScheme: "GRADE: quality of evidence (high, moderate, low, very low) and strength of recommendation (strong or weak) printed after each statement; good practice recommendations where GRADE was inappropriate.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2013", label: "Follow-up care, surveillance protocol, and secondary prevention measures for survivors of colorectal cancer: ASCO clinical practice guideline endorsement", publisher: "ASCO, Journal of Clinical Oncology", year: 2013, url: "https://europepmc.org/abstract/MED/24220554", doi: "10.1200/JCO.2013.50.7442", read: "abstract", accessed: "2026-11-11" },
    { key: "cochrane-2019", label: "Follow-up strategies for patients treated for non-metastatic colorectal cancer", publisher: "Cochrane Database of Systematic Reviews", year: 2019, url: "https://europepmc.org/abstract/MED/31483854", doi: "10.1002/14651858.CD002200.pub4", gradingScheme: "GRADE quality of evidence for each outcome (high, moderate, low, very low).", read: "abstract", accessed: "2026-11-11" },
    { key: "german-s3-2025", label: "Clinical Practice Guideline: Colorectal Cancer: Diagnosis, Treatment, Prevention, and Long-Term Follow-Up Care", publisher: "Deutsches Ärzteblatt International (summary of the German S3 guideline)", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12947252/", doi: "10.3238/arztebl.m2025.0196", read: "full-text", accessed: "2026-11-11" },
    { key: "esmo-colon-2020", label: "Localised colon cancer: ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.06.022", doi: "10.1016/j.annonc.2020.06.022", read: "not-reachable", accessed: "2026-11-11" },
    { key: "esmo-rectal-2025", label: "Localised rectal cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up", publisher: "ESMO, Annals of Oncology", year: 2025, url: "https://doi.org/10.1016/j.annonc.2025.05.528", doi: "10.1016/j.annonc.2025.05.528", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-risk-stratified-follow-up"],
  gaps: [
    "ESMO's localised colon (2020) and localised rectal (2025) guidelines could not be read: Europe PMC holds no abstract for either and the publisher refused a script. Their schedules are not stated here.",
    "NCCN's own guideline requires a login; its schedule is given here only as reproduced and endorsed in the American Cancer Society guideline of 2015, which may be older than the current NCCN version.",
    "NICE sets no frequency for CEA or CT, and no source read compares, for example, 6-monthly with yearly CT in a trial.",
    "The Cochrane review found harms of intensive follow-up and salvage treatment poorly reported, and that intensive follow-up probably makes little or no difference to quality of life, anxiety or depression.",
    "No source read sets a CEA level that should trigger investigation.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["cea-surveillance-colorectal", "survivorship-care-plan"],
  terms: ["low-anterior-resection-syndrome", "colonoscopy"],
  cancers: ["colorectal"],
  sections: ["supportive-care"],
  tags: ["protocol", "follow-up", "survivorship"],
});
