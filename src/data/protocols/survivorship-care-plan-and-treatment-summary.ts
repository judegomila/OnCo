import { protocol } from "./helpers";

/*
 * The end-of-treatment handover: a treatment summary and follow-up care plan (the survivorship care plan), the
 * holistic needs assessment and care plan used in England, and the review in primary care. The record states what is
 * recommended and, beside it, what the randomised trials of written care plans found, which is no benefit on
 * patient-reported outcomes. See also `rejuv-access-survivorship-care-us` and `rejuv-access-survivorship-care-uk`.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - National Cancer Institute, Follow-up care after cancer treatment: web page, raw HTML.
 * - Macmillan Cancer Support, Personalised care and support planning: web page, raw HTML (holistic needs assessment,
 *   end of treatment summary, cancer care review and its Quality and Outcomes Framework timing).
 * - ASCO clinical expert statement on survivorship care planning (J Oncol Pract 2014): abstract only.
 * - ESMO Expert Consensus Statements on Cancer Survivorship (Ann Oncol 2022): abstract only; the publisher refused a
 *   script and PubMed Central holds no copy.
 * - ACS/ASCO Breast Cancer Survivorship Care Guideline (2016): abstract only.
 * - Grunfeld et al. randomised trial (J Clin Oncol 2011), ROGY Care cluster randomised trial (J Clin Oncol 2015),
 *   immediate against delayed care plan trial (Cancer 2019), Jacobsen et al. systematic review (J Clin Oncol 2018) and
 *   Hill et al. meta-analysis (Oncologist 2020): abstracts.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const survivorshipCarePlanAndTreatmentSummary = protocol({
  id: "survivorship-care-plan-and-treatment-summary",
  name: "End of treatment: treatment summary, survivorship care plan and handover to primary care",
  aka: ["survivorship care plan", "SCP", "end of treatment summary", "treatment summary", "follow-up care plan", "personalised care and support plan", "cancer care review", "Recovery Package"],
  domain: "survivorship",
  tldr: "When main treatment ends, you should get a written summary of the treatment you had, side effects to look out for, signs the cancer might be back, who to contact, and the follow-up planned. In England it goes to you and your GP. Trials found the written plan alone did not make people feel better; it works best with a real conversation about who looks after you next.",
  simple: "At the end of treatment, ask for a written summary of your treatment and your follow-up plan. Your family doctor should get a copy too.",
  summary: "The Institute of Medicine's 2006 report recommended that every survivor receive a survivorship care plan: a treatment summary and a follow-up care plan, to improve communication with the patient and between the oncology team and primary care (as summarised in ASCO's 2014 statement, which also revised the template because plans were rarely completed). The NCI tells patients they should receive one when treatment ends. In England the same handover is part of personalised care and support planning: a holistic needs assessment and a personalised care and support plan; an end of treatment summary written by the hospital clinician and shared with the patient and GP, containing the treatment given, possible side effects, the signs and symptoms of recurrence and contact details; and a cancer care review in primary care, which the Quality and Outcomes Framework requires within 12 months of the end of acute treatment. ESMO's 2022 consensus names five components of survivorship care (physical effects, psychological effects, social, work and financial effects, surveillance for recurrence and second cancers, and prevention and health promotion) and leaves the care model to local circumstances.\n\nThe evidence on the written plan is consistently negative for patient-reported outcomes. In a randomised trial of 408 women after early breast cancer, a care plan reviewed with a nurse made no difference to distress or any patient-reported secondary outcome; its one gain was that more patients knew their GP was now responsible. A cluster randomised trial of automatically generated plans in endometrial cancer found more information received but no gain in satisfaction, and more symptoms and concern reported. A 2018 systematic review (13 randomised studies) and a 2020 meta-analysis (eight trials, 1,286 survivors) found no improvement in patient-reported outcomes, with more positive signals for information received and for care delivery when the plan comes with counselling. The defensible protocol is therefore the handover itself (the summary, the named responsible clinician, the needs assessment and the follow-up schedule) rather than the document as an end in itself.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults completing primary treatment for cancer with curative intent, at the move from active treatment to follow-up. The trials read were in early breast cancer and endometrial cancer. People living with advanced cancer, and survivors of childhood cancer, have different follow-up arrangements not covered here.",
  trigger: "The end of initial treatment: the last surgery, chemotherapy or radiotherapy, or the start of long-term tablet treatment such as endocrine therapy.",
  steps: [
    {
      action: "At the end of initial treatment, write a treatment summary and share it with the patient and their GP",
      why: "Your GP and other doctors need to know what treatment you had, sometimes years later, and you need a copy too.",
      source: "macmillan-pcsp",
      quote: "A Treatment Summary is a document produced by the hospital clinician at the end of initial treatment for cancer. It's designed to be shared with the patient and their GP.",
    },
    {
      action: "Include the treatment given, its possible side effects, the signs and symptoms of recurrence, and who to contact",
      why: "These are what you and your GP need in order to notice problems early and know where to turn.",
      source: "macmillan-pcsp",
      quote: "The End of Treatment Summary usually contains: an overview of any treatment the patient has received details of any potential side effects of treatment the signs and symptoms of cancer recurrence contact details to address any concerns.",
    },
    {
      action: "Give a follow-up care plan with the recommended follow-up, and cover emotional, social and financial needs as well as medical ones",
      why: "Knowing which tests and appointments to expect, and what help exists, makes the move out of active treatment less uncertain.",
      source: "nci-followup",
      quote: "A follow-up care plan is a summary of your treatment, along with recommendations for your cancer care after treatment ends. Your plan may also include suggestions to help meet other needs, such as emotional, social, or financial issues.",
    },
    {
      action: "Agree with the patient which doctor will be responsible for follow-up, and make sure the doctors share their notes",
      why: "Tests and decisions can fall between clinics; a named person and shared notes prevent that.",
      source: "nci-followup",
      quote: "Ask each doctor you see to share notes with your other doctors.",
    },
    {
      action: "Assess holistic needs and agree a personalised care and support plan",
      why: "Physical, practical, emotional and social problems after treatment are common and are easier to deal with when they are found early.",
      source: "macmillan-pcsp",
      quote: "A Personalised Care and Support Plan ensures people’s physical, practical, emotional and social needs are identified and addressed at the earliest opportunity.",
    },
    {
      action: "In England, offer a cancer care review in primary care within 12 months of the end of acute treatment",
      why: "A conversation with the GP or practice nurse brings the cancer experience into everyday care and points to local support.",
      source: "macmillan-pcsp",
      quote: "The Quality and Outcomes Framework (QOF) requires primary care professionals to carry out a CCR at the time of a patient's diagnosis (within 3 months) and after a patient has received acute treatment (within 12 months).",
    },
    {
      action: "Plan survivorship care across physical and psychological effects, social, work and financial effects, surveillance, and health promotion",
      why: "Life after cancer treatment involves much more than checking for recurrence.",
      source: "esmo-2022",
      quote: "We identified five main components of survivorship care: (i) physical effects of cancer and chronic medical conditions; (ii) psychological effects of cancer; (iii) social, work and financial effects of cancer; (iv) surveillance for recurrences and second cancers; and (v) cancer prevention and overall health and well-being promotion.",
    },
    {
      action: "Do not rely on the written plan alone: pair it with a discharge conversation and make sure its recommendations are acted on",
      why: "In trials, handing over a document did not on its own make people feel better or less worried.",
      source: "jacobsen-2018",
      quote: "Findings are limited but more positive for proximal outcomes (eg, information received) and for care delivery, particularly when SCPs are accompanied by counseling to prepare survivors for future clinical encounters.",
    },
  ],
  bestInClass: {
    statement: "Every major body read still recommends a written handover at the end of treatment: a treatment summary and follow-up plan shared with the patient and primary care (NCI, ASCO 2014, the English personalised care model), within survivorship care that covers the five ESMO components. The trials disagree with the expectation behind it: randomised trials and two systematic reviews found that written plans do not improve distress, quality of life or satisfaction. The best-supported practice is to keep the summary for what it does do (move information and make responsibility clear) and put the effort into the needs assessment, the named responsible clinician and follow-through, not into the document. The full ESMO 2022 consensus and the full ASCO 2014 statement could not be read.",
    sources: ["macmillan-pcsp", "nci-followup", "asco-2014", "esmo-2022", "grunfeld-2011", "jacobsen-2018", "hill-2020"],
  },
  variants: [
    {
      name: "Written survivorship care plan reviewed with a nurse, with transfer to primary care (Grunfeld trial)",
      differs: "A care plan reviewed in a 30-minute educational session with a nurse, and sent with a follow-up guideline to the GP, on top of a discharge visit.",
      evidence: "Randomised trial of 408 women after early breast cancer at nine centres: no difference in cancer-related distress at 12 months or in any patient-reported secondary outcome; more patients correctly named their GP as responsible for follow-up (98.7 against 89.1 per cent). Read as an abstract.",
      sources: ["grunfeld-2011"],
    },
    {
      name: "Automatically generated care plan from the hospital record (ROGY Care)",
      differs: "A patient-tailored plan generated by a button in the gynaecological oncology registration system, rather than written by hand.",
      evidence: "Cluster randomised trial in 12 Dutch hospitals with women newly diagnosed with endometrial cancer: more information received, no difference in satisfaction with information or care, and more symptoms, illness concern, emotional impact and GP contact reported in the care plan arm. Read as an abstract.",
      sources: ["rogy-2015"],
    },
    {
      name: "Holistic needs assessment, treatment summary and GP cancer care review (England)",
      differs: "Builds the handover from four parts (needs assessment and care plan, end of treatment summary, cancer care review in primary care, and health and well-being information) and ties the GP review to a contractual timing.",
      evidence: "Described by Macmillan Cancer Support as the NHS personalised care model, built on the earlier Recovery Package; no randomised trial of the package as a whole was read.",
      sources: ["macmillan-pcsp"],
    },
  ],
  grades: [
    { claim: "Survivorship care plans do not improve patient-reported outcomes", grade: "meta-analysis of eight randomised trials (1,286 survivors)", source: "hill-2020", quote: "SCPs appear feasible but do not improve survivors' patient-reported outcomes." },
    { claim: "Randomised evidence on the effect of care plans on well-being is generally negative", grade: "systematic review of 13 randomised and 11 non-randomised studies", source: "jacobsen-2018", quote: "Existing research provides little evidence that SCPs improve health outcomes and health care delivery." },
    { claim: "A care plan reviewed with a nurse did not reduce distress after breast cancer", grade: "single randomised trial, 408 women", source: "grunfeld-2011", quote: "There were no differences between groups on cancer-related distress or on any of the patient-reported secondary outcomes, and there were no differences when the two strata were analyzed separately." },
    { claim: "ACS/ASCO breast survivorship recommendations mostly rest on consensus", grade: "expert consensus; most evidence not sufficient for a strong recommendation", source: "acs-asco-2016", quote: "Most of the evidence is not sufficient to warrant a strong evidence-based recommendation." },
  ],
  sources: [
    { key: "macmillan-pcsp", label: "Personalised care and support planning (holistic needs assessment, end of treatment summary, cancer care review)", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/healthcare-professionals/innovation-in-cancer-care/personalised-care", read: "public-summary", accessed: "2026-11-11" },
    { key: "nci-followup", label: "Follow-up care after cancer treatment", publisher: "National Cancer Institute", year: 2026, url: "https://www.cancer.gov/about-cancer/coping/survivorship/follow-up-care", read: "public-summary", accessed: "2026-11-11" },
    { key: "asco-2014", label: "American Society of Clinical Oncology clinical expert statement on cancer survivorship care planning", publisher: "ASCO, Journal of Oncology Practice", year: 2014, url: "https://europepmc.org/abstract/MED/25316025", doi: "10.1200/JOP.2014.001321", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-2022", label: "ESMO Expert Consensus Statements on Cancer Survivorship: promoting high-quality survivorship care and research in Europe", publisher: "ESMO, Annals of Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/35963481", doi: "10.1016/j.annonc.2022.07.1941", read: "abstract", accessed: "2026-11-11" },
    { key: "acs-asco-2016", label: "American Cancer Society/American Society of Clinical Oncology Breast Cancer Survivorship Care Guideline", publisher: "ACS and ASCO, Journal of Clinical Oncology", year: 2016, url: "https://europepmc.org/abstract/MED/26644543", doi: "10.1200/JCO.2015.64.3809", read: "abstract", accessed: "2026-11-11" },
    { key: "grunfeld-2011", label: "Evaluating survivorship care plans: results of a randomized, clinical trial of patients with breast cancer", publisher: "Journal of Clinical Oncology", year: 2011, url: "https://europepmc.org/abstract/MED/22042959", doi: "10.1200/JCO.2011.36.8373", read: "abstract", accessed: "2026-11-11" },
    { key: "rogy-2015", label: "Impact of an Automatically Generated Cancer Survivorship Care Plan on Patient-Reported Outcomes in Routine Clinical Practice: Longitudinal Outcomes of a Pragmatic, Cluster Randomized Trial", publisher: "Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/26304900", doi: "10.1200/JCO.2014.60.3399", read: "abstract", accessed: "2026-11-11" },
    { key: "scp-timing-2019", label: "A randomized trial of immediate versus delayed survivorship care plan receipt on patient satisfaction and knowledge of diagnosis and treatment", publisher: "Cancer", year: 2019, url: "https://europepmc.org/abstract/MED/30690714", doi: "10.1002/cncr.31875", read: "abstract", accessed: "2026-11-11" },
    { key: "jacobsen-2018", label: "Systematic Review of the Impact of Cancer Survivorship Care Plans on Health Outcomes and Health Care Delivery", publisher: "Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29775389", doi: "10.1200/JCO.2018.77.7482", read: "abstract", accessed: "2026-11-11" },
    { key: "hill-2020", label: "Survivorship Care Plans in Cancer: A Meta-Analysis and Systematic Review of Care Plan Outcomes", publisher: "The Oncologist", year: 2020, url: "https://europepmc.org/abstract/MED/32043786", doi: "10.1634/theoncologist.2019-0184", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The ESMO 2022 consensus and the ASCO 2014 statement were read only as abstracts, so the contents of the ASCO template and ESMO's detailed statements are not given here.",
    "No graded guideline read was published after the randomised trials that found no benefit and explicitly re-weighed the care plan in their light.",
    "NHS England's own personalised care pages did not return content to a script; the English model is described from Macmillan's page.",
    "The evidence covers mainly breast and endometrial cancer; whether a written plan helps in cancers with heavier late effects (for example after chest radiotherapy or stem cell transplant) has not been tested in the trials read.",
    "A 2019 trial found that a small gain in knowledge was seen in both arms and was probably due to repeating the questionnaire rather than to the plan; whether any form of the plan improves knowledge is not settled.",
    "Survivors of childhood cancer have separate long-term follow-up guidance, not covered here.",
  ],
  institutions: ["nci", "macmillan-cancer-support", "asco", "esmo"],
  technologies: ["survivorship-care-plan", "rejuv-access-survivorship-care-us", "rejuv-access-survivorship-care-uk"],
  terms: ["late-effects", "quality-of-life", "rejuv-history-lost-in-transition", "rejuv-history-ncsi-england"],
  sections: ["supportive-care"],
  related: ["idea-acc-auto-generated-survivorship-plans", "idea-acc-risk-stratified-follow-up", "idea-acc-primary-care-shared-care-agreements", "breast-cancer-follow-up-after-treatment", "colorectal-cancer-follow-up-after-curative-treatment", "distress-screening-and-referral"],
  bottlenecks: ["b-survivorship", "b-care-fragmentation"],
  tags: ["protocol", "survivorship"],
});
