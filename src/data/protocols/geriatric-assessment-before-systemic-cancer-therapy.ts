import { protocol } from "./helpers";

/*
 * Geriatric assessment and geriatric assessment-guided management for people aged 65 and over starting systemic
 * cancer therapy.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ASCO guideline update, Practical Assessment and Management of Vulnerabilities in Older Patients Receiving Systemic
 *   Cancer Therapy (Dale et al., J Clin Oncol 2023): full text, the author manuscript in PubMed Central (PMC12803700),
 *   including the recommendations with type, evidence quality and strength, and the table of the Practical Geriatric
 *   Assessment with the G8 screen and the CARG toxicity tool. An erratum (2025) exists; its content was not read.
 * - The 2018 ASCO geriatric oncology guideline (PMC6063790) was found and not used, as the 2023 update replaces it.
 * The DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const geriatricAssessmentBeforeSystemicCancerTherapy = protocol({
  id: "geriatric-assessment-before-systemic-cancer-therapy",
  name: "Geriatric assessment before systemic cancer therapy in older adults",
  aka: ["geriatric assessment in oncology", "GA-guided management", "Practical Geriatric Assessment", "G8 screening", "CARG chemotherapy toxicity score", "assessment of older people before chemotherapy"],
  domain: "supportive-care",
  tldr: "If you are 65 or over and about to start chemotherapy, targeted therapy or immunotherapy, your team should check more than the cancer: how well you move and manage day to day, memory, mood, other illnesses, medicines, nutrition and who supports you. The results help choose a treatment you can tolerate and find problems that can be fixed, such as falls, poor nutrition or too many tablets.",
  simple: "Before cancer treatment, older people should have a full check of health, memory, mood, medicines, food and support. This helps pick safer treatment.",
  summary: "ASCO (2023) recommends that every person with cancer aged 65 or over with impairments found on geriatric assessment (GA) has GA-guided management in their care plan, using the results both to inform the treatment decision and to address the impairments through interventions, counselling and referrals; this includes chemotherapy, targeted therapy and immunotherapy (evidence based, high quality, strong). The GA should cover physical and cognitive function, emotional health, comorbidities, polypharmacy, nutrition and social support (high, strong); the Practical Geriatric Assessment is one option (informal consensus, weak).\n\nLife expectancy is estimated with a validated tool such as the Lee or Schonberg index from ePrognosis (strong that it predicts mortality; weak that it improves decisions). A G8 screen of 14 or below prompts a full assessment, and the CARG toxicity tool scores the risk of serious chemotherapy toxicity (0 to 5 low, 6 to 9 intermediate, 10 to 23 high); at intermediate or high risk, ASCO's table suggests the full assessment and considering treatment modifications. Clinicians should share GA results with patients and caregivers, and implement targeted interventions for problems outside the cancer (informal consensus, moderate).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic"],
  },
  population: "Adults aged 65 and over with cancer who are being considered for or receiving systemic therapy (chemotherapy, targeted therapy or immunotherapy). Assessment before surgery or radiotherapy alone is outside ASCO's 2023 scope.",
  trigger: "A person aged 65 or over is being considered for systemic cancer therapy.",
  steps: [
    {
      action: "Assess everyone aged 65 or over before systemic treatment, and build geriatric assessment-guided management into the care plan when impairments are found",
      why: "Trials showed that acting on the assessment reduces serious side effects, and problems such as falls or poor nutrition are often missed otherwise.",
      source: "asco-2023",
      quote: "All patients with cancer aged 65 and over with geriatric assessment (GA)-identified impairments should have GA-guided management (GAM) included in their care plan.",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "Cover physical function, cognition, emotional health, other illnesses, medicines, nutrition and social support",
      why: "These are the areas linked with how older people fare on cancer treatment.",
      source: "asco-2023",
      quote: "A GA should include high priority aging-related domains known to be associated with outcomes in older patients with cancer to include assessment of physical and cognitive function, emotional health, comorbid conditions, polypharmacy, nutrition, and social support.",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "Use a short screen such as the G8 where a full assessment cannot be done for everyone, and do the full assessment when it is 14 or below",
      why: "A quick screen finds the people who most need the full assessment.",
      source: "asco-2023",
      quote: "Score: 0–14 recommend completing a full geriatric assessment evaluation",
    },
    {
      action: "Estimate the risk of serious chemotherapy toxicity with the CARG tool, and at intermediate or high risk consider changing the treatment plan",
      why: "The score combines age, the cancer, the treatment, blood tests and the assessment to predict harm before it happens.",
      source: "asco-2023",
      quote: "For Intermediate and High Risk patients, consider administering the full PGA and implement the recommendations noted above based on the patient-reported results",
    },
    {
      action: "Estimate life expectancy apart from the cancer with a validated index such as the Lee or Schonberg index",
      why: "Other illnesses may shape someone's future more than the cancer, which matters for treatments whose benefit comes years later.",
      source: "asco-2023",
      quote: "Based on the best clinical opinion of the Expert Panel, clinicians should use one of the validated tools listed at ePrognosis ( https://eprognosis.ucsf.edu/ ) to estimate life expectancy (LE) greater than or equal to 4 years.",
      grade: "informal consensus; strong that it predicts mortality, weak that it improves outcomes or decisions",
    },
    {
      action: "Use the results to choose the treatment with the person and their carer, and act on problems outside the cancer, such as falls, poor nutrition or too many medicines",
      why: "The point of the assessment is what is done with it: a safer plan and fixes for problems that can be fixed.",
      source: "asco-2023",
      quote: "In addition, clinicians should implement targeted, GA-guided interventions to manage nononcologic problems.",
      grade: "informal consensus; evidence quality moderate; strength moderate",
    },
  ],
  bestInClass: {
    statement: "ASCO's 2023 update, read in full, is the most recent guideline and the only one read: geriatric assessment-guided management for everyone aged 65 or over with impairments, extended from chemotherapy to all systemic therapy, on high-quality evidence with a strong recommendation; a GA covering function, cognition, mood, comorbidity, medicines, nutrition and social support; and the Practical Geriatric Assessment as one practical tool. The SIOG and ESMO positions on geriatric assessment were not read, so differences between societies are not stated here.",
    sources: ["asco-2023"],
  },
  variants: [
    {
      name: "Screen first, full assessment for those who screen positive (G8)",
      differs: "Uses the 8-item G8 screen (food intake, weight loss, mobility, neuropsychological problems, BMI, prescription drugs, self-rated health and age), with a full GA for scores of 14 or below, rather than a full GA for everyone; the VES-13 is listed as an alternative screen.",
      evidence: "Listed in ASCO's 2023 table of assessment tools; the GERICO trial cited there enrolled vulnerable patients by G8 of 14 or below.",
      sources: ["asco-2023"],
    },
    {
      name: "CRASH instead of CARG for toxicity risk",
      differs: "Uses the Chemotherapy Risk Assessment Scale for High-Age Patients to estimate chemotherapy toxicity risk.",
      evidence: "ASCO's 2023 table lists CRASH as an alternative tool.",
      sources: ["asco-2023"],
    },
  ],
  grades: [
    { claim: "The Practical Geriatric Assessment as one option", grade: "informal consensus; evidence quality moderate; strength weak", source: "asco-2023", quote: "The Panel recommends the Practical Geriatric Assessment (PGA) as one option for this purpose." },
  ],
  sources: [
    { key: "asco-2023", label: "Practical Assessment and Management of Vulnerabilities in Older Patients Receiving Systemic Cancer Therapy: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12803700/", doi: "10.1200/JCO.23.00933", gradingScheme: "Each recommendation printed with type (evidence based or informal consensus), evidence quality (high, moderate, low, insufficient) and strength (strong, moderate, weak).", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-geriatric-assessment-by-default", "idea-acc-electronic-frailty-index-oncology"],
  gaps: [
    "Only ASCO was read. The SIOG recommendations and ESMO's position on geriatric assessment were not read, and NICE has no cancer-specific geriatric assessment guidance.",
    "The text read is the author manuscript in PubMed Central; a 2025 erratum to the guideline exists and was not read.",
    "ASCO does not say who should carry out the assessment or how long it should take; the Practical Geriatric Assessment is offered as one option.",
    "The CARG table's suggested treatment modifications for intermediate and high risk are not reproduced here.",
  ],
  institutions: ["asco"],
  technologies: ["geriatric-assessment", "g8-geriatric-screening"],
  related: ["idea-moon-geriatric-assessment-default", "idea-tr1-geriatric-dose-finding-cohorts"],
  sections: ["supportive-care"],
  tags: ["protocol", "geriatric-oncology", "supportive-care"],
});
