import { protocol } from "./helpers";

/*
 * Follow-up after curative treatment for colorectal cancer: CEA, CT and colonoscopy schedules.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl and read as text, every quote was checked verbatim by script (whitespace joined, tags stripped, nothing
 * else), and every interval, duration, trial figure and grade was compared with the passage it rests on.
 * - NICE NG151, Colorectal cancer (published 29 January 2020, last updated 15 December 2021): overview page,
 *   recommendations page and rationale and impact page (HTML, full text), section 1.6.
 * - American Cancer Society Colorectal Cancer Survivorship Care Guidelines (El-Shami et al., CA Cancer J Clin 2015):
 *   full text of the author manuscript in PubMed Central (PMC5385892) through the NCBI E-utilities API, including its
 *   Table 1, which reproduces the NCCN schedule the ACS endorses and notes where ASCO differs.
 * - BSG/ACPGBI/PHE post-polypectomy and post-colorectal cancer resection surveillance guidelines (Rutter et al., Gut
 *   2020): full text from Europe PMC (PMC6984062).
 * - ASCO endorsement of the Cancer Care Ontario follow-up guideline (Meyerhardt et al., J Clin Oncol 2013) and the
 *   Cochrane review of follow-up strategies (Jeffery et al., 2019): abstracts, from Europe PMC.
 * - Summary of the German S3 colorectal cancer guideline (Dtsch Arztebl Int 2025): full text as HTML from PubMed
 *   Central (PMC12947252). Its follow-up table (Table 2) was read cell by cell from the HTML this time, so the
 *   months are now given.
 * - Cancer Research UK, Follow up after bowel cancer treatment (last reviewed 21 May 2025): added on 17 November
 *   2026 as the source for the advice to report new symptoms between appointments.
 * - ESMO localised colon cancer (2020) and localised rectal cancer (2025) guidelines: tried once more on 17 November
 *   2026. Europe PMC holds no abstract and the publisher's link returns a script redirect page. Not read.
 * Every DOI was resolved through Europe PMC and its title checked. Europe PMC was searched for newer editions of each
 * source by title and none was found.
 */
export const colorectalCancerFollowUpAfterCurativeTreatment = protocol({
  id: "colorectal-cancer-follow-up-after-curative-treatment",
  name: "Follow-up after curative treatment for colorectal cancer",
  aka: ["bowel cancer follow-up", "colorectal cancer surveillance", "CEA and CT surveillance after bowel cancer", "colonoscopy after bowel cancer surgery"],
  domain: "survivorship",
  tldr: "After an operation to cure bowel cancer, you will usually have regular blood tests (CEA) and CT scans for the first 3 years, and a colonoscopy within about a year. The aim is to find a return early enough to operate again. How often you are tested differs between countries, and the large trials found that testing more often makes little or no difference to how long people live.",
  simple: "After bowel cancer surgery you have check-ups: blood tests, scans and a camera test of the bowel. These look for the cancer coming back. Tell your doctor or specialist nurse about new symptoms between check-ups; you do not have to wait for the next visit.",
  summary: "NICE NG151 offers follow-up for the first 3 years after potentially curative surgery for non-metastatic colorectal cancer, with serum carcinoembryonic antigen (CEA) and CT of the chest, abdomen and pelvis, and does not set a frequency. The American Cancer Society (2015) endorses the NCCN schedule for stages I to III: history and examination every 3 to 6 months for 2 years, then every 6 months to 5 years; CEA every 3 to 6 months for 2 years, then every 6 months to 5 years for T2 or greater tumours; CT every 12 months, continued in years 3 to 5 for stage III and high-risk disease. ASCO (2013) gives history, examination and CEA every 3 to 6 months for 5 years and CT annually for 3 years in most cases. Colonoscopy is within a year of diagnosis (BSG/ACPGBI 2020) or 1 year after surgery (ASCO, NCCN). The next is after an interval of 3 years (BSG/ACPGBI), or every 5 years (ASCO); the ACS text gives NCCN's as \"at 3 years\" and its table as \"in year 4\". ASCO says PET should not be used for surveillance outside a clinical trial.\n\nThe trial evidence does not favour intensity: the 2019 Cochrane review of 19 randomised trials (13,216 people) found that intensive follow-up made little or no difference to overall survival (hazard ratio 0.91, 95% confidence interval 0.80 to 1.04, high-quality evidence), although salvage surgery with curative intent was more frequent (risk ratio 1.98). ASCO says surveillance tests should not be done for someone who is not a candidate for surgery or systemic therapy. BSG/ACPGBI suggest colonoscopic surveillance only where life expectancy is over 10 years, and in general not past about 75. NICE says people who may have sphincter-preserving surgery should be given information about low anterior resection syndrome and advised to seek help from primary care.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "telephone-triage"],
  },
  population: "Adults who have had potentially curative treatment for non-metastatic colorectal cancer (stages I to III). Stage IV after treatment with no evidence of disease has a more intensive CT schedule in the ACS table that reproduces NCCN's, mentioned as a variant. Hereditary syndromes such as Lynch syndrome have their own colonoscopy schedules and are not covered here.",
  trigger: "Curative surgery and any adjuvant treatment are complete.",
  steps: [
    {
      action: "Decide with the person whether surveillance suits them, given their fitness for further surgery and their wishes",
      why: "Tests only help if finding a return would lead to treatment. ASCO, endorsed on this point by the ACS, says surveillance tests should not be done for someone who is not a candidate for surgery or systemic therapy because of severe other illness.",
      source: "acs-2015",
      quote: "Testing should only be performed in patients in whom the results will change treatment decisions.",
    },
    {
      action: "Offer follow-up for the first 3 years, with CEA blood tests and CT of the chest, abdomen and pelvis",
      why: "NICE found that a return was more likely to be operable when people had regular follow-up tests, and when those tests included CEA and imaging of the liver.",
      source: "nice-ng151",
      quote: "For people who have had potentially curative surgical treatment for non-metastatic colorectal cancer, offer follow-up for detection of local recurrence and distant metastases for the first 3 years. Follow-up should include serum carcinoembryonic antigen (CEA) and CT scan of the chest, abdomen and pelvis.",
    },
    {
      action: "See the person and check CEA every 3 to 6 months for the first 2 years, then every 6 months up to 5 years for T2 or larger tumours",
      why: "This is the frequency the ACS recommends. ASCO says people at higher risk of a return should be considered for testing at the more frequent end of the range.",
      source: "acs-2015",
      quote: "Recommendation 4: Carcinoembryonic antigen (CEA) testing should be conducted every 3–6 months for the first 2 years and every 6 months for years 3–5 for those with T2 or greater lesions. CEA is not recommended after 5 years.",
      grade: "2A",
    },
    {
      action: "Do a CT of the chest, abdomen and pelvis every 12 months: for 3 years in most cases under ASCO, up to 5 years for stage III and high-risk stage I to III disease under NCCN",
      why: "The two American bodies differ on how long: the ACS notes that ASCO recommends yearly CT of the abdomen and chest for only 3 years. NICE found a return more likely to be operable when follow-up included imaging of the liver.",
      source: "acs-2015",
      quote: "Recommendation 5: Chest/abdominal/pelvic CT should be performed every 12 months (stages I-III) or every 3–6 months (stage IV, NED) for up to 5 years.",
      grade: "2A",
    },
    {
      action: "Do a clearance colonoscopy within a year of diagnosis",
      why: "A colonoscopy after the operation may clear polyps or a second cancer missed at diagnosis. ASCO times it 1 year after surgery, or before 1 year, once adjuvant treatment is finished, if no colonoscopy was done before diagnosis; the German guideline says within 6 months of surgery if the bowel was not fully examined beforehand.",
      source: "bsg-2020",
      quote: "We recommend that patients who have undergone a potentially curative CRC resection should have a clearance colonoscopy within a year of their diagnosis",
      grade: "GRADE of evidence: low; strength of recommendation: strong",
    },
    {
      action: "After the clearance colonoscopy, do the next after an interval of 3 years, then decide further surveillance by the findings",
      why: "BSG and ACPGBI point to the long time from a clear colonoscopy, through new polyps, to a cancer that causes symptoms. ASCO instead repeats colonoscopy every 5 years, guided by the previous one.",
      source: "bsg-2020",
      quote: "We recommend that once a clearance colonoscopy has been performed in the postoperative period in patients who have had a CRC resection, their next surveillance should be performed after an interval of 3 years.",
      grade: "GRADE of evidence: low; strength of recommendation: strong",
    },
    {
      action: "Do not use PET-CT or routine blood counts and liver tests for surveillance, and stop routine CEA and CT after 5 years",
      why: "The ACS table lists each of these as not recommended, and ASCO says PET scans should not be used for surveillance outside a clinical trial. The texts read do not give their reasons.",
      source: "acs-2015",
      quote: "After five years, routine CEA monitoring is not recommended After five years, routine CT scans are not recommended Routine use of PET/CT is not recommended for any stage",
      grade: "2A",
    },
    {
      action: "In general, do not offer colonoscopic surveillance to people older than about 75 or with a life expectancy under 10 years",
      why: "It takes a long time for a new polyp to form and become a cancer that causes symptoms. This is a weak recommendation (\"we suggest\"), written for surveillance after polyp removal; after a cancer resection the same guideline decides further surveillance by those criteria.",
      source: "bsg-2020",
      quote: "surveillance should only be performed in people whose life-expectancy is greater than 10 years, and in general not in people older than about 75 years.",
      grade: "GRADE of evidence: low; strength of recommendation: weak",
    },
    {
      action: "Give information on low anterior resection syndrome to people who may have sphincter-preserving surgery, and advise them to seek help from primary care if they think they have symptoms",
      why: "NICE's committee said the syndrome can have a significant effect on quality of life and daily functioning and may only become apparent after discharge from hospital. The symptoms NICE lists are more frequent stools, urgency with or without incontinence, a feeling of incomplete emptying, passing small amounts little and often, and difficulty telling gas from stool.",
      source: "nice-ng151",
      quote: "Give information on low anterior resection syndrome (LARS) to people who will potentially have sphincter-preserving surgery.",
    },
    {
      action: "Give the non-specialist who will share the follow-up a plan with clear directions on what follow-up is needed",
      why: "ASCO says the specialist's plan should guide follow-up by a non-specialist, and the ACS asks primary care clinicians to request a treatment summary and follow-up care plan.",
      source: "asco-2013",
      quote: "A treatment plan from the specialist should have clear directions on appropriate follow-up by a nonspecialist.",
    },
    {
      action: "Tell the person to contact their doctor or specialist nurse if they notice new symptoms or have concerns between appointments",
      why: "Cancer Research UK tells patients they do not have to wait until their next visit.",
      source: "cruk-follow-up",
      quote: "Contact your doctor or specialist nurse if you have any concerns between appointments. You should also contact them if you notice any new symptoms. You don’t have to wait until your next visit.",
    },
  ],
  bestInClass: {
    statement: "NICE, ASCO and the American Cancer Society (endorsing NCCN) all recommend surveillance with CEA and CT in the first years after curative treatment; they differ on frequency and length. NICE NG151 (2020) sets the first 3 years with CEA and CT and no frequency, and leaves colonoscopy to the BSG and ACPGBI; ASCO (2013) sets CEA every 3 to 6 months for 5 years, CT annually for 3 years in most cases, and colonoscopy 1 year after surgery then every 5 years; the American Cancer Society (2015) endorses NCCN's longer schedule, with CT every 12 months continued to 5 years for stage III and high-risk stage I to III disease, and colonoscopy at 1 year, again at 3 years and then every 5 years; BSG/ACPGBI (2020) set a clearance colonoscopy within a year of diagnosis and the next after an interval of 3 years. The German S3 guideline summary (2025) differs most, relying on abdominal ultrasound with CT marked once. The Cochrane review (2019, 19 randomised trials) found with high-quality evidence that intensive follow-up made little or no difference to overall survival, although salvage surgery with curative intent was more frequent; its authors conclude there is no overall survival benefit from intensifying follow-up. No source read ranks one schedule above another. ESMO's 2020 colon and 2025 rectal guidelines could not be read.",
    sources: ["nice-ng151", "nice-ng151-rationale", "acs-2015", "asco-2013", "bsg-2020", "cochrane-2019", "german-s3-2025", "esmo-colon-2020", "esmo-rectal-2025"],
  },
  variants: [
    {
      name: "NCCN schedule endorsed by the American Cancer Society",
      differs: "CT every 12 months for stages I to III in years 1 and 2, continued in years 3 to 5 for stage III and for stages I to III at high risk of recurrence; colonoscopy at 1 year, at 3 years (the table says year 4) and then every 5 years; proctoscopy every 6 months for 5 years after low anterior resection for rectal cancer; and, for stage IV with no evidence of disease, CT every 3 to 6 months in years 1 and 2 and every 6 to 12 months in years 3 to 5.",
      evidence: "Level of evidence 2A for the whole table, as printed by the ACS; the ACS notes that ASCO does not recommend the 3-year colonoscopy, and that NCCN's own wording on proctoscopy is that it \"be considered\".",
      sources: ["acs-2015"],
    },
    {
      name: "ASCO endorsement of Cancer Care Ontario (2013)",
      differs: "History, examination and CEA every 3 to 6 months for 5 years; CT of abdomen and chest annually for 3 years in most cases; colonoscopy 1 year after the initial surgery and then every 5 years, guided by the previous one; PET not to be used for surveillance outside a clinical trial.",
      evidence: "An endorsement, with qualifying statements, of the Cancer Care Ontario guideline; read as an abstract, which prints no grades.",
      sources: ["asco-2013"],
    },
    {
      name: "Three years and no frequency (NICE NG151)",
      differs: "Sets the length (the first 3 years) and the tests (CEA and CT of chest, abdomen and pelvis) and states no frequency; colonoscopic surveillance was outside its scope, and it points to the BSG and ACPGBI guidance.",
      evidence: "NICE's committee found that recurrence was more likely to be resectable with regular follow-up tests, and when they included CEA and liver imaging, and found no evidence to change its 2011 recommendation.",
      sources: ["nice-ng151", "nice-ng151-rationale"],
    },
    {
      name: "Ultrasound-led follow-up, CEA where it was raised before treatment (German S3 guideline)",
      differs: "For UICC stages I to III its table marks history and examination at 6, 12, 18, 24, 36, 48 and 60 months; abdominal ultrasound at 12, 24, 36, 48 and 60 months; CT once, at 12 months, with the choice between CT and ultrasound made individually; and colonoscopy at 12 and 60 months, or within 6 months if not done before surgery. CEA can be re-assessed after curative treatment where it was raised before. Length of follow-up, 3 or 5 years, is decided individually.",
      evidence: "The 2025 English-language summary of the German S3 guideline calls intensity and duration topics of ongoing debate; it cites the same Cochrane review and an earlier meta-analysis that did find a benefit of intensive follow-up. It prints no grade for the follow-up table.",
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
    { key: "nice-ng151", label: "Colorectal cancer (NG151), recommendations", publisher: "NICE", year: 2020, url: "https://www.nice.org.uk/guidance/ng151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider'). Published 29 January 2020, last updated 15 December 2021.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng151-rationale", label: "Colorectal cancer (NG151), rationale and impact", publisher: "NICE", year: 2020, url: "https://www.nice.org.uk/guidance/ng151/chapter/Rationale-and-impact", read: "full-text", accessed: "2026-11-17" },
    { key: "acs-2015", label: "American Cancer Society Colorectal Cancer Survivorship Care Guidelines", publisher: "American Cancer Society, CA: A Cancer Journal for Clinicians", year: 2015, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5385892/", doi: "10.3322/caac.21286", gradingScheme: "Each recommendation is printed with a 'Level of Evidence'. The surveillance recommendations and the surveillance table are printed as '2A'; the key in the text read lists I, IA, IB, IC, IIA, IIB, IIC, III and 0 and does not define '2A', so it is quoted here as printed.", read: "full-text", accessed: "2026-11-17" },
    { key: "bsg-2020", label: "British Society of Gastroenterology/Association of Coloproctology of Great Britain and Ireland/Public Health England post-polypectomy and post-colorectal cancer resection surveillance guidelines", publisher: "BSG, ACPGBI and PHE, Gut", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6984062/", doi: "10.1136/gutjnl-2019-319858", gradingScheme: "GRADE: quality of evidence (high, moderate, low, very low) and strength of recommendation (strong or weak) printed after each statement; good practice recommendations where GRADE was inappropriate.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2013", label: "Follow-up care, surveillance protocol, and secondary prevention measures for survivors of colorectal cancer: ASCO clinical practice guideline endorsement", publisher: "ASCO, Journal of Clinical Oncology", year: 2013, url: "https://europepmc.org/abstract/MED/24220554", doi: "10.1200/JCO.2013.50.7442", read: "abstract", accessed: "2026-11-17" },
    { key: "cochrane-2019", label: "Follow-up strategies for patients treated for non-metastatic colorectal cancer", publisher: "Cochrane Database of Systematic Reviews", year: 2019, url: "https://europepmc.org/abstract/MED/31483854", doi: "10.1002/14651858.CD002200.pub4", gradingScheme: "GRADE quality of evidence for each outcome (high, moderate, low, very low).", read: "abstract", accessed: "2026-11-17" },
    { key: "german-s3-2025", label: "Clinical Practice Guideline: Colorectal Cancer: Diagnosis, Treatment, Prevention, and Long-Term Follow-Up Care", publisher: "Deutsches Ärzteblatt International (summary of the German S3 guideline)", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12947252/", doi: "10.3238/arztebl.m2025.0196", read: "full-text", accessed: "2026-11-17" },
    { key: "cruk-follow-up", label: "Follow up after bowel cancer treatment", publisher: "Cancer Research UK", year: 2025, url: "https://www.cancerresearchuk.org/about-cancer/bowel-cancer/treatment/follow-up", gradingScheme: "Patient information; no grades. Last reviewed 21 May 2025.", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-colon-2020", label: "Localised colon cancer: ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.06.022", doi: "10.1016/j.annonc.2020.06.022", read: "not-reachable", accessed: "2026-11-17" },
    { key: "esmo-rectal-2025", label: "Localised rectal cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up", publisher: "ESMO, Annals of Oncology", year: 2025, url: "https://doi.org/10.1016/j.annonc.2025.05.528", doi: "10.1016/j.annonc.2025.05.528", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-acc-risk-stratified-follow-up"],
  gaps: [
    "ESMO's localised colon (2020) and localised rectal (2025) guidelines could not be read: on 17 November 2026 Europe PMC still held no abstract for either and the publisher's link returned a script redirect page. Their schedules are not stated here. Europe PMC also lists a 2026 ESMO express update on physical exercise in localised colon cancer, which was not read.",
    "NCCN's own guideline requires a login; its schedule is given here only as reproduced and endorsed in the American Cancer Society guideline of 2015, which may be older than the current NCCN version. That guideline's text gives the second colonoscopy \"at 3 years\" and its table \"in year 4\".",
    "The American Cancer Society prints its surveillance recommendations at level of evidence \"2A\", a label its own key does not define in the text read.",
    "The ASCO endorsement (2013) and the Cochrane review (2019) were read as abstracts only; the ASCO abstract prints no grades. Title searches of Europe PMC on 17 November 2026 found no newer edition of either, or of the American Cancer Society or BSG/ACPGBI guidelines.",
    "NICE sets no frequency for CEA or CT, and no source read compares, for example, 6-monthly with yearly CT in a trial.",
    "The Cochrane review found harms of intensive follow-up and salvage treatment poorly reported, and that intensive follow-up probably makes little or no difference to quality of life, anxiety or depression.",
    "No source read sets a CEA level that should trigger investigation.",
    "No source read lists which symptoms of a return to report or sets a time limit for reporting them; Cancer Research UK says to contact the doctor or specialist nurse about any new symptoms without waiting for the next visit. NICE lists the symptoms of low anterior resection syndrome only.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["cea-surveillance-colorectal", "survivorship-care-plan"],
  terms: ["low-anterior-resection-syndrome", "colonoscopy"],
  cancers: ["colorectal"],
  sections: ["supportive-care"],
  tags: ["protocol", "follow-up", "survivorship"],
});
