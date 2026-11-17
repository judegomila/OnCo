import { protocol } from "./helpers";

/*
 * Geriatric assessment and geriatric assessment-guided management for people aged 65 and over starting systemic
 * cancer therapy.
 *
 * What was read, and how:
 * - ASCO guideline update, Practical Assessment and Management of Vulnerabilities in Older Patients Receiving Systemic
 *   Cancer Therapy (Dale et al., J Clin Oncol 2023): full text, the author manuscript in PubMed Central (PMC12803700),
 *   first read on 11 November 2026 and re-read on 17 November 2026 as XML from NCBI's E-utilities API (the Europe PMC
 *   full-text endpoint returned an error that day), tags stripped by script. It includes the recommendations with
 *   type, evidence quality and strength, the table listing the 2018 recommendations left unchanged, and the table of
 *   the Practical Geriatric Assessment with the G8 screen and the CARG toxicity tool.
 * - An erratum (J Clin Oncol, 20 December 2025, DOI 10.1200/JCO-25-02598) exists; the publisher's page returned 403 on
 *   17 November 2026 and no open copy was found, so its content was not read.
 * - The 2018 ASCO geriatric oncology guideline (PMC6063790) was found and not used, as the 2023 update replaces it.
 * The DOI was resolved through Crossref and Europe PMC and its title checked. Every quote was checked by script
 * against the raw text on 17 November 2026.
 *
 * Second accuracy pass, 17 November 2026: the page no longer says the guideline fixes the assessment to the time
 * before treatment, tells clinicians to use the G8 or the CARG tool (the guideline's table lists them with what a
 * score leads to; no recommendation orders them), or states a scope exclusion and reasons the text does not print.
 * The grading scheme and the life expectancy grade now follow the source's own words.
 */
export const geriatricAssessmentBeforeSystemicCancerTherapy = protocol({
  id: "geriatric-assessment-before-systemic-cancer-therapy",
  name: "Geriatric assessment before systemic cancer therapy in older adults",
  aka: ["geriatric assessment in oncology", "GA-guided management", "Practical Geriatric Assessment", "G8 screening", "CARG chemotherapy toxicity score", "assessment of older people before chemotherapy"],
  domain: "supportive-care",
  tldr: "If you are 65 or over and having chemotherapy, targeted therapy or immunotherapy, a US guideline says your team should check more than the cancer: how well you move and manage day to day, memory, mood, other illnesses, medicines, nutrition and who supports you. The results help in choosing treatment and in finding problems that can be helped, such as falls, weight loss or low mood.",
  simple: "Older people having cancer drug treatment should have a full check of health, memory, mood, medicines, food and support. This helps the team choose treatment and fix other problems.",
  summary: "ASCO (2023) repeats its 2018 position that geriatric assessment (GA) should be used for all patients over 65 with cancer to find vulnerabilities that oncology assessments do not routinely capture, and recommends that everyone aged 65 or over with GA-identified impairments has GA-guided management in their care plan, using the results both to inform the treatment decision and to address the impairments through interventions, counselling and referrals; this includes chemotherapy, targeted therapy and immunotherapy (evidence based, high quality, strong). The GA should cover physical and cognitive function, emotional health, comorbidities, polypharmacy, nutrition and social support (high, strong); the Practical Geriatric Assessment is one option (informal consensus, moderate quality, weak).\n\nTwo recommendations stand unchanged from 2018. Clinicians should use a validated ePrognosis tool, especially the Lee or Schonberg index, to estimate life expectancy of 4 years or more (strong that it predicts mortality; weak that it improves outcomes or decisions). The panel suggests that clinicians take GA results into account when recommending treatment and give the information to patients and caregivers, and says clinicians should implement targeted interventions for problems outside the cancer (informal consensus, moderate, moderate).\n\nASCO's table of the Practical Geriatric Assessment also lists two tools without a graded recommendation: the G8 screen, where a score of 0 to 14 leads to a full assessment, and the CARG toxicity tool (0 to 5 low, 6 to 9 intermediate, 10 to 23 high risk of chemotherapy toxicity), where at intermediate or high risk the table says to consider the full assessment and treatment modifications.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic"],
  },
  population: "Adults aged 65 and over with cancer receiving systemic therapy (chemotherapy, targeted therapy or immunotherapy), as ASCO's 2023 update scopes it. The update makes no recommendation about assessment before surgery or radiotherapy alone.",
  trigger: "A person aged 65 or over is to have, or is having, systemic cancer therapy. ASCO's recommendations do not fix a time point; the two trials behind the update enrolled people receiving a new treatment regimen.",
  steps: [
    {
      action: "Assess everyone aged 65 or over who is having systemic treatment, and build geriatric assessment-guided management into the care plan when impairments are found",
      why: "The assessment finds vulnerabilities that oncology assessments do not routinely capture, and in two randomised trials acting on it lowered the share of people with serious (grade 3 to 5) side effects of chemotherapy.",
      source: "asco-2023",
      quote: "All patients with cancer aged 65 and over with geriatric assessment (GA)-identified impairments should have GA-guided management (GAM) included in their care plan.",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "Cover physical function, cognition, emotional health, other illnesses, medicines, nutrition and social support",
      why: "ASCO calls these the high-priority areas known to be linked with outcomes in older people with cancer.",
      source: "asco-2023",
      quote: "A GA should include high priority aging-related domains known to be associated with outcomes in older patients with cancer to include assessment of physical and cognitive function, emotional health, comorbid conditions, polypharmacy, nutrition, and social support.",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "If a short screen such as the G8 is used first, do the full assessment when the score is 14 or below",
      why: "ASCO's table lists the G8 as a screening tool for geriatric assessment and attaches this action to a score of 0 to 14. It is a table entry, not a graded recommendation.",
      source: "asco-2023",
      quote: "Score: 0–14 recommend completing a full geriatric assessment evaluation",
    },
    {
      action: "If the CARG tool is used to estimate the risk of chemotherapy toxicity, at intermediate or high risk consider the full assessment and consider changing the treatment plan",
      why: "The tool has 11 items: sociodemographic details, the tumour and its treatment, haemoglobin and creatinine clearance, and geriatric assessment items. ASCO's table attaches these actions to its score; it is a table entry, not a graded recommendation.",
      source: "asco-2023",
      quote: "For Intermediate and High Risk patients, consider administering the full PGA and implement the recommendations noted above based on the patient-reported results",
    },
    {
      action: "Estimate life expectancy of 4 years or more with a validated ePrognosis tool; ASCO especially recommends the Lee or Schonberg index",
      why: "Answering no to an index's question about cancer gives life expectancy apart from the cancer, so that other causes of death can be weighed. ASCO rates the evidence that this improves outcomes or decisions as insufficient.",
      source: "asco-2023",
      quote: "Based on the best clinical opinion of the Expert Panel, clinicians should use one of the validated tools listed at ePrognosis (https://eprognosis.ucsf.edu/) to estimate life expectancy (LE) greater than or equal to 4 years.",
      grade: "informal consensus; evidence quality high that it predicts mortality, insufficient that it improves outcomes or improves decision making; strength strong that it predicts mortality, weak that it improves outcomes or improves decision making",
    },
    {
      action: "Take the results into account when recommending treatment, give them to the person and their carer, and act on problems outside the cancer",
      why: "ASCO says the results help estimate the risk of adverse outcomes and find problems outside the cancer that may respond to intervention.",
      source: "asco-2023",
      quote: "In addition, clinicians should implement targeted, GA-guided interventions to manage nononcologic problems.",
      grade: "informal consensus; evidence quality moderate; strength moderate",
    },
  ],
  bestInClass: {
    statement: "ASCO's 2023 update, read in full, is the only guideline read, and no later edition of it was found in Crossref or Europe PMC on 17 November 2026: geriatric assessment-guided management for everyone aged 65 or over with impairments, extended from chemotherapy to all systemic therapy, on high-quality evidence with a strong recommendation; a GA covering function, cognition, mood, comorbidity, medicines, nutrition and social support; and the Practical Geriatric Assessment as one practical tool. The SIOG and ESMO positions on geriatric assessment were not read, so differences between societies are not stated here.",
    sources: ["asco-2023"],
  },
  variants: [
    {
      name: "Screen first, full assessment for those who screen positive (G8)",
      differs: "Uses the 8-item G8 screen (food intake, weight loss, mobility, neuropsychological problems, BMI, prescription drugs, self-rated health and age), with a full GA for scores of 14 or below; the VES-13 is listed as an alternative screen.",
      evidence: "Listed in ASCO's 2023 table of assessment tools; the GERICO trial described in the guideline enrolled vulnerable patients aged 70 or over by a G8 of 14 or below.",
      sources: ["asco-2023"],
    },
    {
      name: "CRASH instead of CARG for toxicity risk",
      differs: "Uses the Chemotherapy Risk Assessment Scale for High-Age Patients to estimate chemotherapy toxicity risk.",
      evidence: "A footnote to ASCO's 2023 table names the CRASH score as an alternative tool for calculating the risk of chemotherapy toxicity; no comparison of the two is given.",
      sources: ["asco-2023"],
    },
  ],
  grades: [
    { claim: "The Practical Geriatric Assessment as one option", grade: "informal consensus; evidence quality moderate; strength weak", source: "asco-2023", quote: "The Panel recommends the Practical Geriatric Assessment (PGA) as one option for this purpose." },
  ],
  sources: [
    { key: "asco-2023", label: "Practical Assessment and Management of Vulnerabilities in Older Patients Receiving Systemic Cancer Therapy: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12803700/", doi: "10.1200/JCO.23.00933", gradingScheme: "Each recommendation is printed with type (evidence based or informal consensus), evidence quality and strength of recommendation. The appendix defines evidence quality as high, moderate, low or very low and strength as strong or weak; the recommendations also use insufficient for evidence and moderate for strength.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-acc-geriatric-assessment-by-default", "idea-acc-electronic-frailty-index-oncology"],
  gaps: [
    "Only ASCO was read. The SIOG recommendations and ESMO's position on geriatric assessment were not read, and NICE was not searched, so differences between societies and countries are not stated here. ASCO is a United States society.",
    "The text read is the author manuscript in PubMed Central. An erratum to the guideline was published in December 2025 (DOI 10.1200/JCO-25-02598); on 17 November 2026 the publisher's page refused a script and no open copy was found, so what it corrects is not known here.",
    "Crossref lists a 2025 ASCO news item saying ASCO approved a guideline on cancer-specific geriatric assessment in resource-limited settings. That guideline was not found or read on 17 November 2026.",
    "ASCO's recommendations do not say when the assessment should be done, who should carry it out or how long it should take; the text says adapting the assessment to the patient population, resources and time is appropriate, and offers the Practical Geriatric Assessment as one option.",
    "The G8 and the CARG toxicity tool appear in ASCO's 2023 table with what each score leads to. No graded recommendation in the 2023 update tells clinicians to use either, and the text read gives no reason for choosing a screen over a full assessment for everyone.",
    "The CARG table's suggested treatment modifications for intermediate and high risk, and the per-domain thresholds and actions of the Practical Geriatric Assessment, are not reproduced here.",
  ],
  institutions: ["asco"],
  technologies: ["geriatric-assessment", "g8-geriatric-screening"],
  related: ["idea-moon-geriatric-assessment-default", "idea-tr1-geriatric-dose-finding-cohorts"],
  sections: ["supportive-care"],
  tags: ["protocol", "geriatric-oncology", "supportive-care"],
});
