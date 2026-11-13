import { protocol } from "./helpers";

/*
 * Follow-up after treatment for early breast cancer and DCIS: mammography, clinical review, and what not to test.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - NICE NG101, Early and locally advanced breast cancer: diagnosis and management (published July 2018, last updated
 *   April 2025), recommendations page (HTML, full text), sections 1.14 to 1.16.
 * - ASCO breast cancer follow-up and management after primary treatment, guideline update (Khatcheressian et al.,
 *   J Clin Oncol 2013): abstract, from Europe PMC.
 * - American Cancer Society/ASCO Breast Cancer Survivorship Care Guideline (Runowicz et al., 2016, published jointly in
 *   J Clin Oncol and CA Cancer J Clin): abstract, from Europe PMC. The CA Cancer J Clin full text returned 403 to a script.
 * - ESMO early breast cancer guideline (Loibl et al., Ann Oncol 2024): Europe PMC holds no abstract and the publisher
 *   refused a script. Not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const breastCancerFollowUpAfterTreatment = protocol({
  id: "breast-cancer-follow-up-after-treatment",
  name: "Follow-up after treatment for early breast cancer",
  aka: ["breast cancer surveillance", "breast cancer follow-up mammogram", "follow-up after breast cancer surgery", "breast cancer survivorship care"],
  domain: "survivorship",
  tldr: "After treatment for early breast cancer, the main test is a yearly mammogram, usually for 5 years and then through the national screening programme. Routine scans and blood tests are not recommended when you are well, because the evidence does not show they help. You should get a written plan saying who to contact and which symptoms to report.",
  simple: "After breast cancer treatment you have a mammogram every year. You do not need regular scans or blood tests if you feel well. Tell your team about any new lump or symptom.",
  summary: "NICE NG101 offers annual mammography for 5 years to everyone who has had or is being treated for breast cancer, including DCIS, and for women continued annually until they enter the national screening programme; no mammography of the soft tissues on the side of a mastectomy; and no routine ultrasound or MRI for surveillance. ASCO (2013) recommends history and physical examination every 3 to 6 months for the first 3 years, every 6 to 12 months in years 4 and 5, and annually after that, with the first post-treatment mammogram 1 year after the initial one and at least 6 months after radiotherapy. Both advise against routine blood tests, tumour markers and body imaging in people without symptoms; the ACS/ASCO survivorship guideline (2016) agrees.\n\nEvery person should have an agreed written care plan held by them and their GP, with named professionals, dates for review of adjuvant therapy, the surveillance mammography, symptoms to report and how to reach specialist care quickly (NICE). Primary care follow-up includes healthy lifestyle advice, monitoring for long-term effects of treatment, and support to keep taking endocrine therapy (ACS/ASCO). Bone density checks on aromatase inhibitors and lymphoedema care are covered by their own protocols.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults who have completed primary treatment with curative intent for early or locally advanced breast cancer, or DCIS. The NHS screening programme rules in NG101 apply in England and Wales. People with metastatic breast cancer, and people at very high inherited risk who have their own MRI surveillance schedules, are not covered here.",
  trigger: "Primary treatment (surgery, with any chemotherapy and radiotherapy) is complete; endocrine therapy may continue.",
  steps: [
    {
      action: "Give the person and their GP an agreed written care plan with named professionals, review dates, the mammogram schedule, symptoms to report and how to reach the specialist team",
      why: "Most returns are noticed by the person between appointments, so knowing what to look for and whom to call matters more than the visits themselves.",
      source: "nice-ng101",
      quote: "Ensure all people who have had treatment for breast cancer have an agreed, written care plan, recorded in their notes by a named healthcare professional (or professionals) from the multidisciplinary team. Give a copy to the person and to their GP.",
    },
    {
      action: "Offer a mammogram every year for 5 years, then for women continue yearly until they join the national breast screening programme",
      why: "Mammography finds a return in the treated breast or a new cancer in the other breast early.",
      source: "nice-ng101",
      quote: "Offer annual mammography for 5 years to all people who have had or are being treated for breast cancer, including DCIS.",
    },
    {
      action: "After breast-conserving surgery, time the first mammogram 1 year after the diagnostic one and at least 6 months after radiotherapy",
      why: "Changes from radiotherapy settle over months, and an early image is harder to read.",
      source: "asco-2013",
      quote: "For women who have undergone breast-conserving surgery, a post-treatment mammogram should be obtained 1 year after the initial mammogram and at least 6 months after completion of radiation therapy.",
    },
    {
      action: "Do not do mammography of the chest wall on the side of a mastectomy",
      why: "There is no breast tissue left to image there; changes are found by examination and symptoms.",
      source: "nice-ng101",
      quote: "Do not perform mammography of the ipsilateral soft tissues after mastectomy.",
    },
    {
      action: "Do not use ultrasound or MRI routinely for surveillance",
      why: "NICE found no reason to use them routinely for people at ordinary risk; they find more harmless changes that then need checking.",
      source: "nice-ng101",
      quote: "Do not routinely use ultrasound or MRI for post-treatment surveillance in people who have had treatment for invasive breast cancer or DCIS.",
    },
    {
      action: "Review history and examine every 3 to 6 months for 3 years, every 6 to 12 months in years 4 and 5, then yearly",
      why: "Regular review is a chance to check symptoms, side effects and whether endocrine therapy is being taken.",
      source: "asco-2013",
      quote: "Physical examinations should be performed every 3 to 6 months for the first 3 years, every 6 to 12 months for years 4 and 5, and annually thereafter.",
    },
    {
      action: "Do not order routine blood tests, tumour markers, bone scans, chest X-rays, CT or PET in someone who is well with a normal examination",
      why: "The evidence does not support these tests in people without symptoms, and a false alarm leads to more tests and worry.",
      source: "asco-2013",
      quote: "is not recommended for routine follow-up in an otherwise asymptomatic patient with no specific findings on clinical examination.",
    },
    {
      action: "Advise a healthy weight, regular physical activity, and alcohol below 5 units a week",
      why: "These are linked with a lower risk of the cancer coming back.",
      source: "nice-ng101",
      quote: "Advise people who have had or are being treated for breast cancer that a healthy lifestyle is associated with a lower risk of recurrence, and that this should include:",
    },
    {
      action: "In primary care, watch for long-term effects of treatment and support the person to keep taking endocrine therapy",
      why: "Long-term side effects affect daily life, and stopping endocrine therapy early loses part of its benefit.",
      source: "acs-asco-2016",
      quote: "Primary care clinicians should counsel patients about the importance of maintaining a healthy lifestyle, monitor for post-treatment symptoms that can adversely affect quality of life, and monitor for adherence to endocrine therapy.",
    },
  ],
  bestInClass: {
    statement: "NICE NG101 (last updated 2025) and ASCO (2013, reaffirmed by ACS/ASCO in 2016) agree on the core: yearly mammography, clinical review, a written plan, and no routine blood tests, tumour markers or body imaging in people without symptoms. They differ in detail: NICE sets mammography yearly for 5 years and then hands over to the screening programme, and advises against routine ultrasound or MRI; ASCO sets a schedule of clinical examinations (every 3 to 6 months for 3 years, 6 to 12 months to year 5, then yearly) that NICE does not specify. The ESMO 2024 early breast cancer guideline could not be read.",
    sources: ["nice-ng101", "asco-2013", "acs-asco-2016", "esmo-2024"],
  },
  variants: [
    {
      name: "Scheduled clinical examinations (ASCO)",
      differs: "Sets a frequency for history and examination for life (every 3 to 6 months for 3 years, every 6 to 12 months for years 4 and 5, then yearly), where NICE sets no visit schedule and relies on the written plan and open access to the specialist team.",
      evidence: "ASCO's 2013 update found no new evidence that warranted changing its 2006 recommendations; ACS/ASCO (2016) say most evidence is not sufficient for a strong evidence-based recommendation. Read as abstracts.",
      sources: ["asco-2013", "acs-asco-2016"],
    },
    {
      name: "Mammography handed to the screening programme after 5 years (NICE)",
      differs: "After 5 years of yearly mammography, women continue yearly until they enter the NHS Breast Screening Programme in England or Breast Test Wales, after which screening follows the programme's own interval.",
      evidence: "NICE recommendation [2009, amended 2023]; NICE does not grade recommendations.",
      sources: ["nice-ng101"],
    },
  ],
  grades: [
    { claim: "Annual mammography for 5 years after breast cancer, including DCIS", grade: "not graded (NICE); dated [2009, amended 2023]", source: "nice-ng101" },
    { claim: "No routine ultrasound or MRI surveillance", grade: "not graded (NICE); dated [2009, amended 2023]", source: "nice-ng101" },
    { claim: "Most survivorship recommendations", grade: "evidence not sufficient for a strong evidence-based recommendation (ACS/ASCO's own statement)", source: "acs-asco-2016", quote: "Most of the evidence is not sufficient to warrant a strong evidence-based recommendation." },
  ],
  sources: [
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not') and each is dated, for example [2009, amended 2023]. Published July 2018, last updated April 2025.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2013", label: "Breast cancer follow-up and management after primary treatment: ASCO clinical practice guideline update", publisher: "ASCO, Journal of Clinical Oncology", year: 2013, url: "https://europepmc.org/abstract/MED/23129741", doi: "10.1200/JCO.2012.45.9859", read: "abstract", accessed: "2026-11-11" },
    { key: "acs-asco-2016", label: "American Cancer Society/American Society of Clinical Oncology Breast Cancer Survivorship Care Guideline", publisher: "American Cancer Society and ASCO, Journal of Clinical Oncology", year: 2016, url: "https://europepmc.org/abstract/MED/26644543", doi: "10.1200/JCO.2015.64.3809", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-2024", label: "Early breast cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up", publisher: "ESMO, Annals of Oncology", year: 2024, url: "https://doi.org/10.1016/j.annonc.2023.11.016", doi: "10.1016/j.annonc.2023.11.016", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-risk-stratified-follow-up"],
  gaps: [
    "The ESMO 2024 early breast cancer guideline could not be read: Europe PMC holds no abstract and the publisher refused a script. Its follow-up schedule is not stated here.",
    "ASCO's follow-up guideline dates from 2013 and reaffirms 2006 recommendations; no later ASCO follow-up guideline was found in Europe PMC.",
    "The ACS/ASCO 2016 survivorship guideline was read only as an abstract, so its detailed recommendations on late effects are not given here.",
    "No source read says how long yearly mammography should continue for men with breast cancer or for people outside a national screening programme after 5 years.",
    "Women at high inherited risk (for example BRCA carriers) follow separate MRI surveillance schedules not covered here.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["mammography", "survivorship-care-plan"],
  terms: ["dcis"],
  cancers: ["breast-cancer"],
  sections: ["supportive-care"],
  tags: ["protocol", "follow-up", "survivorship"],
});
