import { protocol } from "./helpers";

/*
 * Follow-up after treatment for early breast cancer and DCIS: mammography, clinical review, and what not to test.
 *
 * First written on 11 and 12 November 2026. Second accuracy pass on 17 November 2026: every source was read again as
 * raw text (curl, the Europe PMC REST API, tags stripped by script) and every quote was matched by script.
 * - NICE NG101, Early and locally advanced breast cancer: diagnosis and management (published 18 July 2018, last
 *   updated 14 April 2025), recommendations page, sections 1.15 and 1.16. A copy another checker fetched from NICE on
 *   17 November 2026 was re-used.
 * - ASCO breast cancer follow-up and management after primary treatment, guideline update (Khatcheressian et al.,
 *   J Clin Oncol 2013): abstract, from Europe PMC.
 * - American Cancer Society/ASCO Breast Cancer Survivorship Care Guideline (Runowicz et al., 2016): abstract, from
 *   Europe PMC, and the ASCO Post summary of its key recommendations (25 April 2016), read in full.
 * - ASCO Guideline Update 2026 (Nahleh et al., J Clin Oncol): abstract, from Europe PMC; DOI resolved through
 *   Crossref. The journal full text is not open.
 * - The ASCO pocket guide for that update on Guideline Central (publication date 10 September 2026): read in full,
 *   with each recommendation's printed grade and the grading legend. Its four figures are images and were not read.
 * - Cancer Research UK, Follow up after breast cancer treatment (last reviewed 28 July 2026): read in full.
 * - ESMO early breast cancer guideline (Loibl et al., Ann Oncol 2024): Europe PMC holds no abstract and the
 *   publisher's page did not return the article to a script. Not read.
 * - The trial and review abstracts behind the notes (GIVIO, Rosselli Del Turco, Cochrane 2016, c-TRAK TN, ESMO ctDNA
 *   2022, Dent 2007, Mammo-50, SURVIVE) were read from Europe PMC and each figure checked.
 * Changed in the second pass: the ASCO 2026 steps now carry the pocket guide's own sentences and grades; the claim
 * that NICE advises against routine tests for distant recurrence was removed (NICE's follow-up section does not
 * address them); the ASCO 2026 mammography interval is "recommended", not "can be considered"; an unsourced symptom
 * list, an unsourced statement about tumour markers and an NCCN schedule taken from an unlinked presentation were
 * taken out.
 */
export const breastCancerFollowUpAfterTreatment = protocol({
  id: "breast-cancer-follow-up-after-treatment",
  name: "Follow-up after treatment for early breast cancer",
  aka: ["breast cancer surveillance", "breast cancer follow-up mammogram", "follow-up after breast cancer surgery", "breast cancer survivorship care"],
  domain: "survivorship",
  tldr: "Breast cancer follow-up combines a written care plan, review of symptoms and treatment effects, and breast imaging suited to risk and remaining tissue. Routine scans and blood markers to seek distant recurrence are not recommended for the overall asymptomatic post-treatment population.",
  simple: "After breast cancer treatment, agree a written follow-up plan with your team. The visits and breast scans depend on your treatment, remaining breast tissue and risk. Tell your doctor or specialist nurse about any new symptom or concern between visits; you do not have to wait for the next appointment.",
  summary: "Follow-up after curative treatment for early breast cancer asks several questions: recurrence or a new breast cancer, treatment effects, ongoing therapy and support needs. Screening an asymptomatic person for distant recurrence is a different question from investigating a symptom or finding. Earlier detection alone does not establish longer life or better quality of life.\n\nNICE NG101 recommends annual mammography for 5 years, with women continuing annually until they enter the NHS Breast Screening Programme in England or Breast Test Wales, and a written care plan that includes contact details for immediate referral to specialist care. ASCO's 2026 update uses risk-based follow-up intensity in three groups. In its low-intensity group it recommends mammography every 1 to 2 years, after 3 years of annual mammograms, for people aged 50 or older with defined low-risk features who had breast-conserving surgery. It does not recommend imaging for distant metastases, or routine blood tests including tumour markers, for the overall asymptomatic post-treatment population. Supplemental MRI or other breast imaging is a separate, individualised risk and anatomy discussion.\n\nThe 2006/2013 ASCO calendar is historical: examinations every 3 to 6 months for 3 years, every 6 to 12 months in years 4 and 5, then annually. Its first mammogram after breast conservation was 1 year after the initial mammogram and at least 6 months after radiotherapy. Those dated recommendations should not be presented as the latest single calendar. The 2026 recommendations and their evidence limits are distinguished below from the older trials and from experimental molecular surveillance.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults after curative-intent primary treatment for early or locally advanced breast cancer, or DCIS; endocrine therapy may continue. The NICE mammography pathway names the screening programmes of England and Wales and is specific to them. ASCO 2026 distinguishes risk, ongoing therapy, age and remaining anatomy; its panel based its opinion on female breast cancer and says follow-up after male breast cancer should generally be similar. The ACS/ASCO 2016 guideline is written for adult women. Metastatic-disease monitoring and dedicated very-high-inherited-risk screening plans need their own setting-specific guidance.",
  trigger: "Primary treatment (surgery, with any chemotherapy and radiotherapy) is complete; endocrine therapy may continue.",
  steps: [
    {
      action: "Under ASCO 2026, place the person in the low-, intermediate- or high-intensity surveillance group and plan follow-up from that group",
      why: "ASCO defines the groups by stage, tumour type, response to treatment given before surgery, ongoing treatment, inherited gene changes and time since diagnosis, rather than giving everyone one calendar. NICE describes a different pathway.",
      source: "asco-2026-summary",
      quote: "This guideline offers recommendations for a risk-based approach to the frequency and intensity of follow-up among patients with breast cancer in the adjuvant setting.",
    },
    {
      action: "Give the person and their GP an agreed written care plan: named professionals, dates for review of any adjuvant therapy, the mammogram schedule, signs and symptoms to look out for, and contact details for immediate referral to specialist care and for support services",
      why: "The written plan tells the person what will happen, what to look out for and whom to contact.",
      source: "nice-ng101",
      quote: "Ensure all people who have had treatment for breast cancer have an agreed, written care plan, recorded in their notes by a named healthcare professional (or professionals) from the multidisciplinary team. Give a copy to the person and to their GP.",
    },
    {
      action: "Under NICE NG101, offer annual mammography for 5 years; for women, continue yearly after that until they enter the NHS Breast Screening Programme in England or Breast Test Wales",
      why: "This is the NICE pathway for England and Wales. ASCO 2026 recommends a different frequency for one lower-risk group, set out in a later step.",
      source: "nice-ng101",
      quote: "Offer annual mammography for 5 years to all people who have had or are being treated for breast cancer, including DCIS.",
    },
    {
      action: "Recognise the historical ASCO 2013 first-mammogram timing after breast conservation: 1 year after the initial mammogram and at least 6 months after radiotherapy",
      why: "The quoted timing belongs to that guideline version rather than a universal schedule.",
      source: "asco-2013",
      quote: "For women who have undergone breast-conserving surgery, a post-treatment mammogram should be obtained 1 year after the initial mammogram and at least 6 months after completion of radiation therapy.",
    },
    {
      action: "Do not do mammography of the chest wall on the side of a mastectomy",
      why: "This is a recommendation about routine imaging of the soft tissues on the operated side. It does not say that a new symptom there needs no assessment.",
      source: "nice-ng101",
      quote: "Do not perform mammography of the ipsilateral soft tissues after mastectomy.",
    },
    {
      action: "Under NICE NG101, do not routinely use ultrasound or MRI for post-treatment surveillance",
      why: "ASCO 2026 separately says supplemental MRI may be offered after shared decision-making for selected risk and anatomical contexts; each recommendation keeps its own source and population.",
      source: "nice-ng101",
      quote: "Do not routinely use ultrasound or MRI for post-treatment surveillance in people who have had treatment for invasive breast cancer or DCIS.",
    },
    {
      action: "Recognise the historical ASCO 2013 clinical-exam schedule: every 3 to 6 months for 3 years, every 6 to 12 months in years 4 and 5, then annually",
      why: "ASCO 2026 replaces a single calendar with risk-based intensity; the older quotation is retained as history.",
      source: "asco-2013",
      quote: "Physical examinations should be performed every 3 to 6 months for the first 3 years, every 6 to 12 months for years 4 and 5, and annually thereafter.",
    },
    {
      action: "Under ASCO 2026, set clinical review by group: a yearly visit in the low-intensity group; history and examination every 6 to 12 months for 5 to 10 years after diagnosis in the intermediate group; every 3 to 6 months for up to ten years after diagnosis in the high-intensity group, once active treatment other than endocrine therapy is complete",
      why: "People at higher risk of the cancer returning are seen more often. ASCO says visits can be in person or virtual, and that people can move to the low-intensity group later. The quoted sentence is the intermediate group's; the low-intensity recommendation is graded M, C and the high-intensity one L, C.",
      source: "asco-2026-summary",
      quote: "Clinical follow-up (history and physical examination) with oncology team or cancer survivorship clinic every 6–12 months for 5–10 years after diagnosis.",
      grade: "L, C",
    },
    {
      action: "Under ASCO 2026, in the low-intensity group after breast-conserving surgery, offer annual mammograms for the first 3 years after treatment; after that, mammography every 1 to 2 years is recommended for people aged 50 or older with low-risk features who are recurrence-free at 3 years, and annual mammography for people under 50 or with triple-negative or HER2-positive tumours",
      why: "ASCO bases this on expert consensus and one randomised trial, Mammo-50. It adds that staying on yearly mammograms is an option after discussing the possible harms and benefits with the clinician.",
      source: "asco-2026-summary",
      quote: "Thereafter, surveillance mammography every 1–2 years is recommended for patients 50 years or older with low-risk features (T1, low-grade, node negative, estrogen receptor [ER]-positive tumors, who underwent breast-conserving surgery [BCS], and who are recurrence free at 3 years post diagnosis).",
      grade: "M, C",
    },
    {
      action: "Do not use imaging to look for distant metastases in people who have completed treatment and have no symptoms; investigate symptoms or specific findings under the clinical plan",
      why: "ASCO 2026 does not recommend this imaging for the overall asymptomatic population. The 2013 guideline said the same of bone scans, chest radiographs, liver and pelvic ultrasound, CT, PET and MRI in a person with no symptoms and no specific findings on examination.",
      source: "asco-2026-summary",
      quote: "Imaging surveillance for distant metastases is not recommended for the overall population of patients who have completed breast cancer treatment and who are asymptomatic.",
      grade: "L, C",
    },
    {
      action: "Do not use routine blood tests, including the tumour markers CEA, CA 15-3 and CA 27.29, for breast cancer surveillance in people with no symptoms",
      why: "ASCO 2026 does not recommend them for surveillance in people without symptoms, as its 2013 guideline also said.",
      source: "asco-2026-summary",
      quote: "ASCO does not recommend routine blood tests like complete blood counts, chemistry panels, or tumor markers (carcinoembryonic antigen [CEA], cancer antigen [CA] 15-3, CA 27.29) for asymptomatic patients for the purpose of breast cancer surveillance.",
      grade: "L, C",
    },
    {
      action: "Advise a healthy weight, regular physical activity, and alcohol below 5 units a week",
      why: "NICE says a healthy lifestyle is associated with a lower risk of the cancer coming back.",
      source: "nice-ng101",
      quote: "Advise people who have had or are being treated for breast cancer that a healthy lifestyle is associated with a lower risk of recurrence, and that this should include:",
    },
    {
      action: "In primary care, counsel on a healthy lifestyle, monitor for post-treatment symptoms that affect quality of life, and monitor adherence to endocrine therapy",
      why: "The ACS/ASCO survivorship guideline, written for the care of adult women after breast cancer, gives primary care these tasks. Its detailed late-effect recommendations were read only through the abstract and the ASCO Post summary.",
      source: "acs-asco-2016",
      quote: "Primary care clinicians should counsel patients about the importance of maintaining a healthy lifestyle, monitor for post-treatment symptoms that can adversely affect quality of life, and monitor for adherence to endocrine therapy.",
    },
  ],
  bestInClass: {
    statement: "NICE NG101 and ASCO 2026 both keep breast surveillance within a planned follow-up, and their detailed pathways differ. ASCO 2026 does not recommend imaging for distant metastases or routine blood tests, including tumour markers, in the overall asymptomatic population (both graded low-quality evidence, conditional). The follow-up section of NICE NG101 does not address blood tests or imaging for distant recurrence; it says not to use ultrasound or MRI routinely for surveillance. ASCO now uses low-, intermediate- and high-intensity groups and less frequent mammography for one defined group; it is not simply the 2013 calendar reaffirmed. ASCO's abstract says no randomised trial compared follow-up approaches by risk of relapse, so those recommendations come from a formal consensus process, while one randomised trial (Mammo-50) is the evidence for the mammography recommendation. The 2026 journal full text and the ESMO 2024 guideline remain unread; the ASCO abstract and the pocket guide supply the 2026 recommendations given here.",
    sources: ["nice-ng101", "asco-2026", "asco-2026-summary", "esmo-2024"],
  },
  variants: [
    {
      name: "Risk-based intensity (ASCO 2026)",
      differs: "Uses risk group, ongoing treatment and time since diagnosis to determine clinical follow-up intensity; recommends mammography every 1 to 2 years only for people aged 50 or older with defined low-risk features after breast-conserving surgery, following 3 years of annual mammograms.",
      evidence: "Abstract and the full pocket guide. Every recommendation is conditional. The group definitions print a strength only (C); the intermediate- and high-intensity schedules are graded low-quality evidence; the low-intensity mammography recommendation is graded moderate-quality evidence and rests on Mammo-50 and expert consensus.",
      sources: ["asco-2026", "asco-2026-summary"],
    },
    {
      name: "Historical 2013 clinical examinations (ASCO)",
      differs: "Sets a frequency for physical examination (every 3 to 6 months for the first 3 years, every 6 to 12 months for years 4 and 5, then yearly), where NICE NG101 sets no visit schedule and relies on the written plan, with contact details for immediate referral to specialist care. This is a historical comparator, not the latest ASCO calendar.",
      evidence: "ASCO's 2013 update reviewed 14 new publications and concluded that no revisions to its existing recommendations were warranted; ACS/ASCO (2016) say most evidence is not sufficient for a strong evidence-based recommendation. Read as abstracts.",
      sources: ["asco-2013", "acs-asco-2016"],
    },
    {
      name: "Mammography handed to the screening programme after 5 years (NICE)",
      differs: "After 5 years of yearly mammography, women continue yearly until they enter the NHS Breast Screening Programme in England or Breast Test Wales. Cancer Research UK describes that programme as inviting women aged 50 to 70 every 3 years.",
      evidence: "NICE recommendation [2009, amended 2023]; NICE does not grade recommendations.",
      sources: ["nice-ng101", "cruk-follow-up"],
    },
  ],
  grades: [
    { claim: "Annual mammography for 5 years after breast cancer, including DCIS", grade: "not graded (NICE); dated [2009, amended 2023]", source: "nice-ng101" },
    { claim: "No routine ultrasound or MRI surveillance", grade: "not graded (NICE); dated [2009, amended 2023]", source: "nice-ng101" },
    { claim: "Most survivorship recommendations", grade: "evidence not sufficient for a strong evidence-based recommendation (ACS/ASCO's own statement)", source: "acs-asco-2016", quote: "Most of the evidence is not sufficient to warrant a strong evidence-based recommendation." },
    { claim: "ASCO 2026 Recommendation 1.1.2: low-intensity group, annual clinical visit and the mammography schedule after breast-conserving surgery", grade: "M, C", source: "asco-2026-summary", quote: "Patients after breast-conserving surgery should be offered annual mammograms for the first 3 years after completion of treatment." },
    { claim: "ASCO 2026 Recommendation 1.2.2: intermediate-intensity group, clinical follow-up every 6 to 12 months and annual mammography of remaining breast tissue", grade: "L, C", source: "asco-2026-summary" },
    { claim: "ASCO 2026 Recommendation 1.3.2: high-intensity group, clinical follow-up every 3 to 6 months for up to ten years after diagnosis", grade: "L, C", source: "asco-2026-summary" },
    { claim: "ASCO 2026 Recommendation 2.1: no routine blood tests or tumour markers for surveillance without symptoms", grade: "L, C", source: "asco-2026-summary" },
    { claim: "ASCO 2026 Recommendation 2.2: ctDNA testing for recurrence monitoring", grade: "L, C", source: "asco-2026-summary", quote: "ctDNA testing cannot be recommended generally or, at this time, in any specific context for recurrence monitoring." },
    { claim: "ASCO 2026 Recommendation 3.1: supplemental MRI may be offered after shared decision-making", grade: "L, C", source: "asco-2026-summary", quote: "There is no evidence to date for an overall survival benefit of MRI imaging in the post-treatment surveillance setting." },
    { claim: "ASCO 2026 Recommendation 3.4: no imaging surveillance for distant metastases without symptoms", grade: "L, C", source: "asco-2026-summary" },
  ],
  sources: [
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not') and each is dated, for example [2009, amended 2023]. Published 18 July 2018, last updated 14 April 2025.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2013", label: "Breast cancer follow-up and management after primary treatment: American Society of Clinical Oncology clinical practice guideline update", publisher: "ASCO, Journal of Clinical Oncology", year: 2013, url: "https://europepmc.org/abstract/MED/23129741", doi: "10.1200/JCO.2012.45.9859", gradingScheme: "The abstract prints no grades. Superseded by the ASCO 2026 guideline update.", read: "abstract", accessed: "2026-11-17" },
    { key: "acs-asco-2016", label: "American Cancer Society/American Society of Clinical Oncology Breast Cancer Survivorship Care Guideline", publisher: "American Cancer Society and ASCO, Journal of Clinical Oncology", year: 2016, url: "https://europepmc.org/abstract/MED/26644543", doi: "10.1200/JCO.2015.64.3809", read: "abstract", accessed: "2026-11-17" },
    { key: "ascopost-2016", label: "ACS/ASCO Breast Cancer Survivorship Care Guideline (summary of key recommendations, 25 April 2016)", publisher: "The ASCO Post", year: 2016, url: "https://web.archive.org/web/20251215105946/https://ascopost.com/issues/april-25-2016/acsasco-breast-cancer-survivorship-care-guideline/", gradingScheme: "A journalist's summary that reproduces the guideline's key recommendations with their levels of evidence (I, IA, IB, IC, IIA, IIB, IIC, III, 0, and 2A for those taken from NCCN guidelines).", read: "public-summary", accessed: "2026-11-17" },
    { key: "esmo-2024", label: "Early breast cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up", publisher: "ESMO, Annals of Oncology", year: 2024, url: "https://doi.org/10.1016/j.annonc.2023.11.016", doi: "10.1016/j.annonc.2023.11.016", read: "not-reachable", accessed: "2026-11-17" },
    { key: "asco-2026", label: "Breast Cancer Follow-Up and Surveillance After Primary Treatment: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2026, url: "https://pubmed.ncbi.nlm.nih.gov/42462191/", doi: "10.1200/jco-26-01700", read: "abstract", accessed: "2026-11-17", gradingScheme: "Abstract read in full; the journal full text is not open. Recommendations come from a systematic review and a formal modified Delphi consensus process; the abstract prints no grades." },
    { key: "asco-2026-summary", label: "ASCO Breast Cancer: Follow-Up and Surveillance After Primary Treatment pocket guide", publisher: "Guideline Central in participation with ASCO", year: 2026, url: "https://www.guidelinecentral.com/guideline/5236434/pocket-guide/5244655/", read: "public-summary", accessed: "2026-11-17", gradingScheme: "Each recommendation prints a quality of evidence (H high, M moderate, L low, VL very low) and a strength (S strong, W weak, C conditional, GPS good practice statement), for example 'L, C'. The pocket guide was read in full; its figures are images and were not read, and the journal article and its methods were not read." },
    { key: "cruk-follow-up", label: "Follow up after breast cancer treatment", publisher: "Cancer Research UK", year: 2026, url: "https://www.cancerresearchuk.org/about-cancer/breast-cancer/treatment/follow-up", gradingScheme: "Patient information for the UK, not a graded guideline. Last reviewed 28 July 2026.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-acc-risk-stratified-follow-up"],
  gaps: [
    "The ESMO 2024 early breast cancer guideline could not be read: Europe PMC holds no abstract, and on 17 November 2026 the publisher's page again did not return the article to a script. Its follow-up schedule is not stated here. A Pan-Asian adaptation of it (ESMO Open, 2024) is listed in Europe PMC and was not read.",
    "The ACS/ASCO 2016 survivorship guideline was read as an abstract and through the ASCO Post summary of its key recommendations, so its detailed recommendations on late effects are not given here.",
    "Women at high inherited risk (for example BRCA carriers) follow separate MRI surveillance schedules not covered here.",
    "The ASCO 2026 journal full text could not be reached. The abstract and the whole pocket guide were read; the complete methods, the data supplement and the pocket guide's four figures (which are images) were not.",
    "The follow-up section of NICE NG101 gives no schedule for clinic visits and does not address blood tests or imaging for distant recurrence, so nothing on this page about those tests is NICE's position.",
    "No source read lists which symptoms to report after breast cancer treatment or how quickly. NICE says the written plan should give the signs and symptoms to look out for, and Cancer Research UK says to contact the doctor or specialist nurse about any new symptom without waiting for the next visit. The symptom list an earlier version of this page gave had no source and was removed on 17 November 2026.",
    "An earlier version of this page gave an NCCN follow-up schedule taken from a SEER teaching presentation. On 17 November 2026 that presentation could not be found and the NCCN guideline needs a login, so the schedule was removed. NCCN's follow-up recommendations are not stated here.",
    "ASCO 2026 says no prospective study has established the clinical utility of ctDNA testing for surveillance; each ctDNA-triggered strategy needs its own trial evidence.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["mammography", "survivorship-care-plan"],
  terms: ["dcis"],
  cancers: ["breast-cancer"],
  sections: ["supportive-care"],
  tags: ["protocol", "follow-up", "survivorship"],

  notes: [
    "A smoke alarm can detect a problem earlier without showing that a proposed inspection programme changes its outcome. Follow-up has the same evidence distinction: the comparison needs survival, quality of life and harms, not just the date a recurrence was found. NICE says the written plan should list the signs and symptoms to look out for and seek advice on. Cancer Research UK advises contacting the doctor or specialist nurse about any concern or new symptom between appointments, without waiting for the next visit. This is an access-to-evaluation principle, not a symptom-specific triage protocol.",
    "The historical ASCO 2013 routine-testing recommendation applies to asymptomatic follow-up with no specific examination finding. It names complete blood counts, chemistry panels, bone scans, chest radiographs, liver and pelvic ultrasound, CT, PET and MRI, and the serum markers CEA, CA 15-3 and CA 27.29. Diagnostic tests for a symptom or specific finding ask a different question. ASCO 2026 keeps both parts: it does not recommend routine blood tests or tumour markers for surveillance in people without symptoms (Recommendation 2.1), or imaging surveillance for distant metastases in the overall asymptomatic post-treatment population (Recommendation 3.4).",
    "GIVIO randomised 1,320 women younger than 70 with stage I to III breast cancer to intensive testing or clinically indicated testing alongside follow-up. Added testing included bone scans, liver ultrasound, chest radiographs and laboratory tests. At median 71 months, 132 of 655 (20%) versus 122 of 665 (18%) had died; no difference in survival or in reported quality of life was found. That trial also found no significant difference in time to recurrence detection. Rosselli Del Turco's separate 1,243-person trial added six-month chest radiographs and bone scans. It found more isolated intrathoracic and bone metastases (112 versus 71) and earlier detection, with no difference in five-year mortality (18.6% versus 19.5%). The two detection results should not be merged into one claim.",
    "The 2016 Cochrane review pooled two intensive-testing trials with 2,563 participants for overall survival: hazard ratio 0.98, 95% confidence interval 0.84 to 1.15. The review included five trials overall and searched to July 2014; the survival denominator is not the denominator for every quality-of-life analysis. A nonsignificant result is not proof of equivalence or identical death times. The review's authors describe these as trials conducted almost 20 years earlier, so they do not settle every modern strategy. Measuring outcomes from randomisation avoids mistaking the extra interval after an earlier diagnosis for a delayed death. No exhaustive claim that comparable modern research does not exist is made here.",
    "In c-TRAK TN, 161 patients entered ctDNA surveillance after treatment for moderate- and high-risk early triple-negative breast cancer. Forty-four (27.3%) had detection by 12 months, and seven relapsed without prior detection. Of the patients allocated to intervention, 23 of 32 already had metastases on staging when ctDNA was detected. Five started pembrolizumab and none achieved sustained ctDNA clearance. Surveillance, staging and treatment denominators answer different questions; neither lead time nor an association with recurrence establishes a useful molecular-triggered intervention. ESMO's 2022 ctDNA recommendations say detection of molecular residual disease has high evidence of clinical validity but cannot be recommended in routine practice because there is no evidence of clinical utility in directing treatment. ASCO 2026 (Recommendation 2.2, graded L, C) says ctDNA testing cannot be recommended for recurrence monitoring.",
    "Dent's historical cohort included 1,601 women diagnosed in 1987 to 1997, of whom 180 had triple-negative disease. The distant-recurrence risk in that group peaked at about 3 years and declined rapidly thereafter, with a higher likelihood of distant recurrence than other types within 5 years of diagnosis but not thereafter. This is cohort evidence, not an individual forecast or proof that a particular visit interval improves survival. Do not derive the guideline calendar directly from the shape of that risk curve. The ACS/ASCO 2016 recommendations, as the ASCO Post summarises them, also cover screening for other cancers, heart, bone and nerve effects of treatment, adherence to endocrine therapy, distress and information needs. ASCO 2026 names the harms of more intensive breast surveillance as anxiety from false positive findings, increased fear of recurrence, further investigations for incidental findings, and time and financial costs; it gives no rate for them.",
    "A fictional person feels well one year after curative treatment and asks whether adding routine CT and CA 15-3 every few months will improve outcomes. A more sensitive alarm or an earlier date of detection is insufficient evidence for that proposal. The older intensive-testing trials and current ASCO guidance address routine asymptomatic surveillance, while a symptom, new finding, inherited-risk screening programme or research protocol changes the question. Breast imaging according to remaining tissue and risk continues to have its own purpose. This example supplies an evidence question, not a personal testing schedule.",
    "ASCO 2026 distinguishes risk-based clinical-review intensity. Its pocket guide recommends an annual clinical visit for the low-intensity group; intermediate-intensity history and examination every 6 to 12 months for 5 to 10 years after diagnosis; and high-intensity review every 3 to 6 months after active treatment other than endocrine therapy is complete, for up to ten years after diagnosis. The categories depend on stage, subtype, response, ongoing treatment, inherited risk and time since diagnosis, rather than time alone. ASCO's abstract says no randomised trial compared follow-up approaches by risk of relapse, so these schedules come from a formal consensus process. A clinical team must identify the applicable category.",
    "For the ASCO 2026 low-intensity group after breast-conserving surgery, annual mammograms should be offered for the first 3 years after completion of treatment. Mammography every 1 to 2 years is then recommended for people aged 50 or older with low-risk features (T1, low-grade, node-negative, ER-positive tumours, treated by breast-conserving surgery and recurrence-free at 3 years after diagnosis); annual mammography is recommended for people younger than 50 or with triple-negative or HER2-positive tumours. Continued annual mammography is an option after discussing harms and benefits. In the intermediate- and high-intensity groups, annual mammography is recommended after breast-conserving surgery and annual mammography of the other breast after a mastectomy on one side; mammography is not recommended after bilateral mastectomy (in the intermediate group, unless clinical symptoms warrant it). Supplemental MRI may be offered through shared decision-making for selected risk and anatomical contexts; ASCO says there is no evidence to date that it improves overall survival in this setting. That is separate from routine imaging for distant metastases.",
    "Mammo-50 randomised 5,235 women aged at least 50 at diagnosis who remained recurrence-free 3 years after curative surgery: 2,618 to annual mammography and 2,617 to less frequent imaging, two-yearly after breast conservation or three-yearly after mastectomy. Most had ER-positive tumours (82.7%). Five-year breast-cancer-specific survival was 98.1% versus 98.3%, hazard ratio 0.92 (95% confidence interval 0.64 to 1.32), meeting the prespecified 3% non-inferiority margin. This mammographic-frequency question does not test routine CT, tumour markers or ctDNA, or prove de-escalation for newly treated younger triple-negative patients. The 2025 SURVIVE publication is a protocol for a planned 3,500-person intensive liquid-biopsy-triggered surveillance trial, not an outcome result."
  ],
  links: [
    {"label":"ASCO 2026: follow-up and surveillance guideline abstract","url":"https://pubmed.ncbi.nlm.nih.gov/42462191/"},
    {"label":"ASCO/Guideline Central: official 2026 practice summary","url":"https://www.guidelinecentral.com/guideline/5236434/pocket-guide/5244655/"},
    {"label":"GIVIO, 1994: randomised follow-up testing trial","url":"https://pubmed.ncbi.nlm.nih.gov/8182811/"},
    {"label":"Rosselli Del Turco et al., 1994: intensive diagnostic follow-up","url":"https://pubmed.ncbi.nlm.nih.gov/7848404/"},
    {"label":"Moschetti et al., 2016: follow-up strategies systematic review","url":"https://pubmed.ncbi.nlm.nih.gov/27230946/"},
    {"label":"Turner et al., 2023: c-TRAK TN","url":"https://pubmed.ncbi.nlm.nih.gov/36423745/"},
    {"label":"Pascual et al., 2022: ESMO ctDNA recommendations","url":"https://pubmed.ncbi.nlm.nih.gov/35809752/"},
    {"label":"ASCO Post, 2016: survivorship care guideline summary","url":"https://web.archive.org/web/20251215105946/https://ascopost.com/issues/april-25-2016/acsasco-breast-cancer-survivorship-care-guideline/"},
    {"label":"Dent et al., 2007: historical triple-negative recurrence patterns","url":"https://pubmed.ncbi.nlm.nih.gov/17671126/"},
    {"label":"Dunn et al., 2025: Mammo-50 mammographic-frequency trial","url":"https://pubmed.ncbi.nlm.nih.gov/39892911/"},
    {"label":"Braun et al., 2025: SURVIVE trial protocol","url":"https://pubmed.ncbi.nlm.nih.gov/40924700/"}
  ]
});
