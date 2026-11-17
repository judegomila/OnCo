import { protocol } from "./helpers";

/*
 * The end-of-treatment handover: a treatment summary and follow-up care plan (the survivorship care plan), the
 * holistic needs assessment and care plan used in England, and the review in primary care. The record states what is
 * recommended and, beside it, what the randomised trials of written care plans found, which is no benefit on
 * patient-reported outcomes. See also `rejuv-access-survivorship-care-us` and `rejuv-access-survivorship-care-uk`.
 *
 * What was read, and how. First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source
 * was fetched again raw (curl, the Europe PMC REST API, NCBI E-utilities) and read as text, and every quote was
 * checked verbatim by script against the saved text.
 * - National Cancer Institute, Follow-up care after cancer treatment: web page, raw HTML (page dated 2 December 2024).
 * - Macmillan Cancer Support, Personalised care and support planning: web page, raw HTML (holistic needs assessment,
 *   end of treatment summary, cancer care review).
 * - Macmillan Cancer Support, Cancer Care Review: web page, raw HTML, added on 17 November 2026 because it prints the
 *   two Quality and Outcomes Framework indicators. They count from the date of diagnosis, which the first version of
 *   this record had as the end of treatment.
 * - ASCO clinical expert statement on survivorship care planning (J Oncol Pract 2014): abstract only; the free PDF
 *   address refused a script (403).
 * - ESMO Expert Consensus Statements on Cancer Survivorship (Ann Oncol 2022): abstract only; the publisher reserves
 *   its pages from scripts and PubMed Central holds no copy.
 * - ACS/ASCO Breast Cancer Survivorship Care Guideline (2016), Grunfeld et al. (J Clin Oncol 2011) and ROGY Care
 *   (J Clin Oncol 2015): abstracts.
 * - Jacobsen et al. systematic review (J Clin Oncol 2018): abstract only; the Europe PMC full-text endpoint returned
 *   an error and PubMed Central answered with a browser check, which was not retried.
 * - Hill et al. meta-analysis (Oncologist 2020): full text, PubMed Central HTML.
 * - Tevaarwerk et al. immediate against delayed care plan trial (Cancer 2019): full text (author manuscript), NCBI
 *   E-utilities XML.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const survivorshipCarePlanAndTreatmentSummary = protocol({
  id: "survivorship-care-plan-and-treatment-summary",
  name: "End of treatment: treatment summary, survivorship care plan and handover to primary care",
  aka: ["survivorship care plan", "SCP", "end of treatment summary", "treatment summary", "follow-up care plan", "personalised care and support plan", "cancer care review", "Recovery Package"],
  domain: "survivorship",
  tldr: "When main treatment ends, you should get a written summary of the treatment you had, side effects to look out for, signs the cancer might be back, who to contact, and the follow-up planned. In the NHS it is meant to go to you and your GP. Trials found the written plan alone did not make people feel better; results looked a little better when it came with counselling to prepare for later visits.",
  simple: "At the end of treatment, ask for a written summary of your treatment and your follow-up plan. Your family doctor should get a copy too.",
  summary: "The Institute of Medicine's report From Cancer Patient to Cancer Survivor: Lost in Transition (National Academies Press, 2006) recommended a survivorship care plan: a treatment summary and a follow-up care plan, meant to improve communication with the patient and between the oncology team and primary care. That is how ASCO's 2014 statement summarises it; ASCO also revised its template then, because there had been limited success in putting plans into practice (the barriers it names include the time a plan takes to complete, unclear roles and no payment for the time). The NCI tells patients they should receive a follow-up care plan when treatment ends. In the NHS, as Macmillan describes it, the same handover is part of personalised care and support planning: a personalised care and support plan based on a holistic needs assessment; an end of treatment summary produced by the hospital clinician and designed to be shared with the patient and GP, usually containing the treatment given, possible side effects, the signs and symptoms of recurrence and contact details; a cancer care review in primary care; and health and well-being information and support. The Quality and Outcomes Framework indicators Macmillan prints (those for 2023/24, in a specification published by NHS England) count from diagnosis: a discussion and information about support from primary care within 3 months of diagnosis, and a cancer care review using a structured template within 12 months of the date of diagnosis, which Macmillan says is so that it can coincide with the end of treatment. ESMO's 2022 consensus names five components of survivorship care (physical effects, psychological effects, social, work and financial effects, surveillance for recurrence and second cancers, and prevention and health promotion) and says the choice of care model has to be adapted to local realities.\n\nThe evidence on the written plan is generally negative for patient-reported outcomes. In a randomised trial of 408 women after early breast cancer, a care plan reviewed with a nurse made no difference to distress or to any patient-reported secondary outcome; the abstract reports one difference, that more patients correctly named their own doctor as primarily responsible for follow-up, and concludes that the plan was no better than a standard discharge visit with the oncologist. A cluster randomised trial of automatically generated plans in endometrial cancer found more information received but no difference in satisfaction with information or care, and more symptoms, concern and emotional impact reported. A 2018 systematic review (13 randomised and 11 non-randomised studies) found the randomised results generally negative for physical, functional and psychological well-being, with positive findings in single studies for information received, satisfaction with care and doctors carrying out recommended care; it found the picture more positive for care delivery when the plan comes with counselling to prepare survivors for later appointments. A 2020 meta-analysis (eight articles, 1,286 survivors) found no significant difference in knowledge, physical functioning, satisfaction with information or self-efficacy at 6 months, or in anxiety, distress, depression or satisfaction with follow-up care at 12 months. None of the sources read grades a recommendation on the written plan itself. What they support is modest: the plan moves information, it does not on its own change how people feel, and the 2018 review asks for research on making sure a plan's recommendations are acted on.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults at the end of initial treatment for cancer, at the move from active treatment to follow-up. The trials read as abstracts or in full were in breast cancer (after primary or curative-intent treatment) and in newly diagnosed endometrial cancer. People living with advanced cancer are not covered here. The NCI says follow-up for childhood cancer survivors is very similar and points to separate guidance, which is not covered here either.",
  trigger: "The end of initial treatment. The 2019 breast cancer trial read in full counted this as the end of curative-intent surgery, chemotherapy or radiotherapy, and did not count continuing endocrine or HER2-targeted therapy as active treatment.",
  steps: [
    {
      action: "At the end of initial treatment, write a treatment summary and share it with the patient and their GP",
      why: "The summary is designed to be shared with you and your GP, and it helps the GP carry out the cancer care review.",
      source: "macmillan-pcsp",
      quote: "A Treatment Summary is a document produced by the hospital clinician at the end of initial treatment for cancer. It's designed to be shared with the patient and their GP.",
    },
    {
      action: "Include the treatment given, its possible side effects, the signs and symptoms of recurrence, and who to contact",
      why: "These are the things Macmillan says the summary usually contains: what was done, what to look out for, and where to turn with a concern.",
      source: "macmillan-pcsp",
      quote: "The End of Treatment Summary usually contains: an overview of any treatment the patient has received details of any potential side effects of treatment the signs and symptoms of cancer recurrence contact details to address any concerns.",
    },
    {
      action: "Give a follow-up care plan with the recommended follow-up; it may also cover emotional, social and financial needs",
      why: "The plan holds the details you and your doctor should discuss so that you get regular care after treatment ends.",
      source: "nci-followup",
      quote: "A follow-up care plan is a summary of your treatment, along with recommendations for your cancer care after treatment ends. Your plan may also include suggestions to help meet other needs, such as emotional, social, or financial issues.",
    },
    {
      action: "Discuss with the patient which doctor or doctors they will see for follow-up, and have each doctor share notes with the others",
      why: "The NCI says research has shown that tests or treatments with one doctor are sometimes not shared with the other, and that it may fall to you or someone close to you to make sure they communicate.",
      source: "nci-followup",
      quote: "Ask each doctor you see to share notes with your other doctors.",
    },
    {
      action: "Assess holistic needs and agree a personalised care and support plan",
      why: "The aim is to find physical, practical, emotional and social needs, and deal with them, as early as possible.",
      source: "macmillan-pcsp",
      quote: "A Personalised Care and Support Plan ensures people’s physical, practical, emotional and social needs are identified and addressed at the earliest opportunity.",
    },
    {
      action: "In England, offer a cancer care review in primary care within 12 months of diagnosis, timed where possible to the end of treatment",
      why: "It is a conversation in which you can talk about your experience of cancer and your concerns, find out what support exists locally, and get information to help you manage your own health.",
      source: "macmillan-ccr",
      quote: "Primary Care teams now need to offer a patient the CCR within 12 months so it can coincide with the end of their cancer treatment.",
    },
    {
      action: "Plan survivorship care across physical and psychological effects, social, work and financial effects, surveillance, and health promotion",
      why: "Life after cancer treatment involves much more than checking for recurrence.",
      source: "esmo-2022",
      quote: "We identified five main components of survivorship care: (i) physical effects of cancer and chronic medical conditions; (ii) psychological effects of cancer; (iii) social, work and financial effects of cancer; (iv) surveillance for recurrences and second cancers; and (v) cancer prevention and overall health and well-being promotion.",
    },
    {
      action: "Do not expect the written plan alone to improve how patients feel; where a plan is given, consider adding counselling that prepares the patient for later appointments",
      why: "Trials gave little evidence that the plan improves health outcomes; the findings were limited but more positive for information received and for care delivery when the plan came with counselling.",
      source: "jacobsen-2018",
      quote: "Findings are limited but more positive for proximal outcomes (eg, information received) and for care delivery, particularly when SCPs are accompanied by counseling to prepare survivors for future clinical encounters.",
    },
  ],
  bestInClass: {
    statement: "The bodies read recommend a written handover at the end of treatment: a treatment summary and follow-up plan shared with the patient and primary care (NCI, ASCO 2014, the NHS personalised care model as Macmillan describes it), within survivorship care that covers the five ESMO components. The trials do not bear out the expectation behind it. A randomised trial in breast cancer found no difference in distress or any patient-reported secondary outcome and concluded the plan was no better than a standard discharge visit with the oncologist; a 2018 systematic review found little evidence that plans improve health outcomes or care delivery; and a 2020 meta-analysis found no significant difference in anxiety, distress, depression, physical functioning or satisfaction with information or follow-up care. The more encouraging findings are for information received, and for care delivery when the plan comes with counselling to prepare survivors for later appointments; the 2018 review asks for research on making sure a plan's recommendations are acted on. No source read grades a recommendation on the written plan, so this is a reading of the evidence and not a graded recommendation. The full ESMO 2022 consensus, the full ASCO 2014 statement and the full 2018 review could not be read.",
    sources: ["macmillan-pcsp", "macmillan-ccr", "nci-followup", "asco-2014", "esmo-2022", "grunfeld-2011", "jacobsen-2018", "hill-2020"],
  },
  variants: [
    {
      name: "Written survivorship care plan reviewed with a nurse, with transfer to primary care (Grunfeld trial)",
      differs: "A care plan reviewed in a 30-minute educational session with a nurse, and sent with a guideline on follow-up to the patient's own primary care doctor, on top of a discharge visit. All patients, in both groups, were transferred to their primary care doctor for follow-up.",
      evidence: "Randomised trial of 408 women after early breast cancer at nine tertiary cancer centres: no difference in cancer-related distress at 12 months or in any patient-reported secondary outcome; more patients correctly named their primary care doctor as primarily responsible for follow-up (98.7 against 89.1 per cent). The authors concluded the plan was no better than a standard discharge visit with the oncologist. Read as an abstract.",
      sources: ["grunfeld-2011"],
    },
    {
      name: "Automatically generated care plan from the hospital record (ROGY Care)",
      differs: "A patient-tailored plan generated by clicking a button in the web-based gynaecological oncology registration system (ROGY).",
      evidence: "Cluster randomised trial in 12 hospitals (in the Netherlands, according to the 2020 meta-analysis) with women newly diagnosed with endometrial cancer; 74 per cent of patients in the care plan arm received a plan. More information received, no difference in satisfaction with information or care, and more symptoms, illness concern, emotional impact and cancer-related contact with the primary care doctor reported in the care plan arm. Read as an abstract.",
      sources: ["rogy-2015", "hill-2020"],
    },
    {
      name: "Holistic needs assessment, treatment summary and GP cancer care review (England)",
      differs: "Builds the handover from four parts (a care and support plan based on a needs assessment, an end of treatment summary, a cancer care review in primary care, and health and well-being information and support) and ties the GP review to contract indicators: contact within 3 months of diagnosis and a review within 12 months of diagnosis.",
      evidence: "Described by Macmillan Cancer Support as its support for the NHS Long Term Plan, building on the earlier Recovery Package; no randomised trial of the package as a whole was read. The indicators are the 2023/24 ones as Macmillan prints them.",
      sources: ["macmillan-pcsp", "macmillan-ccr"],
    },
  ],
  grades: [
    { claim: "Survivorship care plans do not improve patient-reported outcomes", grade: "ungraded; meta-analysis of eight articles reporting randomised trials (1,286 survivors)", source: "hill-2020", quote: "SCPs appear feasible but do not improve survivors' patient-reported outcomes." },
    { claim: "There is little evidence that care plans improve health outcomes or care delivery", grade: "ungraded; systematic review of 13 randomised and 11 non-randomised studies", source: "jacobsen-2018", quote: "Existing research provides little evidence that SCPs improve health outcomes and health care delivery." },
    { claim: "A care plan reviewed with a nurse did not reduce distress after breast cancer", grade: "ungraded; single randomised trial, 408 women", source: "grunfeld-2011", quote: "There were no differences between groups on cancer-related distress or on any of the patient-reported secondary outcomes, and there were no differences when the two strata were analyzed separately." },
    { claim: "ACS/ASCO breast survivorship recommendations rest on current evidence and expert consensus opinion", grade: "no grade printed in the abstract; most evidence not sufficient for a strong recommendation", source: "acs-asco-2016", quote: "Most of the evidence is not sufficient to warrant a strong evidence-based recommendation." },
  ],
  sources: [
    { key: "macmillan-pcsp", label: "Personalised care and support planning (holistic needs assessment, end of treatment summary, cancer care review)", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/healthcare-professionals/innovation-in-cancer-care/personalised-care", read: "public-summary", accessed: "2026-11-17" },
    { key: "macmillan-ccr", label: "Cancer Care Review (guidance for primary care, with the Quality and Outcomes Framework indicators for 2023/24)", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/healthcare-professionals/cancer-pathways/prevention-and-diagnosis/cancer-care-review", read: "public-summary", accessed: "2026-11-17" },
    { key: "nci-followup", label: "Follow-up care after cancer treatment", publisher: "National Cancer Institute", year: 2024, url: "https://www.cancer.gov/about-cancer/coping/survivorship/follow-up-care", read: "public-summary", accessed: "2026-11-17" },
    { key: "asco-2014", label: "American Society of Clinical Oncology clinical expert statement on cancer survivorship care planning", publisher: "ASCO, Journal of Oncology Practice", year: 2014, url: "https://europepmc.org/abstract/MED/25316025", doi: "10.1200/JOP.2014.001321", read: "abstract", accessed: "2026-11-17" },
    { key: "esmo-2022", label: "ESMO Expert Consensus Statements on Cancer Survivorship: promoting high-quality survivorship care and research in Europe", publisher: "ESMO, Annals of Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/35963481", doi: "10.1016/j.annonc.2022.07.1941", read: "abstract", accessed: "2026-11-17" },
    { key: "acs-asco-2016", label: "American Cancer Society/American Society of Clinical Oncology Breast Cancer Survivorship Care Guideline", publisher: "ACS and ASCO, Journal of Clinical Oncology", year: 2016, url: "https://europepmc.org/abstract/MED/26644543", doi: "10.1200/JCO.2015.64.3809", read: "abstract", accessed: "2026-11-17" },
    { key: "grunfeld-2011", label: "Evaluating survivorship care plans: results of a randomized, clinical trial of patients with breast cancer", publisher: "Journal of Clinical Oncology", year: 2011, url: "https://europepmc.org/abstract/MED/22042959", doi: "10.1200/JCO.2011.36.8373", read: "abstract", accessed: "2026-11-17" },
    { key: "rogy-2015", label: "Impact of an Automatically Generated Cancer Survivorship Care Plan on Patient-Reported Outcomes in Routine Clinical Practice: Longitudinal Outcomes of a Pragmatic, Cluster Randomized Trial", publisher: "Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/26304900", doi: "10.1200/JCO.2014.60.3399", read: "abstract", accessed: "2026-11-17" },
    { key: "scp-timing-2019", label: "A randomized trial of immediate versus delayed survivorship care plan receipt on patient satisfaction and knowledge of diagnosis and treatment", publisher: "Cancer", year: 2019, url: "https://europepmc.org/abstract/MED/30690714", doi: "10.1002/cncr.31875", read: "full-text", accessed: "2026-11-17" },
    { key: "jacobsen-2018", label: "Systematic Review of the Impact of Cancer Survivorship Care Plans on Health Outcomes and Health Care Delivery", publisher: "Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29775389", doi: "10.1200/JCO.2018.77.7482", read: "abstract", accessed: "2026-11-17" },
    { key: "hill-2020", label: "Survivorship Care Plans in Cancer: A Meta-Analysis and Systematic Review of Care Plan Outcomes", publisher: "The Oncologist", year: 2020, url: "https://europepmc.org/abstract/MED/32043786", doi: "10.1634/theoncologist.2019-0184", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The ESMO 2022 consensus and the ASCO 2014 statement were read only as abstracts, so the contents of the ASCO template and ESMO's detailed statements are not given here. On 17 November 2026 the ASCO free PDF address refused a script and the ESMO article page is reserved from scripts; neither was pursued further.",
    "On 17 November 2026 the full text of the 2018 systematic review could not be read (the Europe PMC full-text endpoint returned an error and PubMed Central answered with a browser check), so what this record says about it rests on its abstract. The breast and endometrial cancer trials and the ACS/ASCO guideline were also read as abstracts only.",
    "No graded guideline read was published after the randomised trials that found no benefit and explicitly re-weighed the care plan in their light. None of the sources read prints a grade for a recommendation on the written plan; the entries under grades describe the kind of study, not a grade. A title search of Europe PMC on 17 November 2026 found no later ASCO or ESMO statement on survivorship care planning and no later meta-analysis of care plans; that search is not exhaustive.",
    "On 17 November 2026 NHS England's own pages (personalised care for people living with cancer, and the Quality and Outcomes Framework guidance) again returned no content to a script. The NHS model is described from Macmillan's pages, which do not say which nations of the UK it applies to; the framework specification Macmillan links to is published by NHS England. The indicators given are those for 2023/24 as Macmillan prints them, and whether the current year's framework keeps them unchanged could not be checked.",
    "Macmillan's two pages summarise the review after treatment as 'after a patient has received acute treatment (within 12 months)', while the indicator they print counts 12 months from the date of diagnosis. This record follows the indicator.",
    "The evidence covers mainly breast and endometrial cancer; whether a written plan helps in cancers with heavier late effects (for example after chest radiotherapy or stem cell transplant) has not been tested in the trials read.",
    "A 2019 trial of immediate against delayed receipt of a plan in 127 women after breast cancer found a small gain in knowledge for both arms combined that did not appear to be related to the plan; the authors' hypothesis was that it came from repeating the questionnaire. Whether any form of the plan improves knowledge is not settled.",
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
