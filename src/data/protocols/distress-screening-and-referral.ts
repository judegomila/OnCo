import { protocol } from "./helpers";

/*
 * Screening for distress (the distress thermometer and problem list), and the stepped referral that follows it.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl, NCBI E-utilities or the Europe PMC REST API
 * into a scratch directory and read as text):
 * - NCCN Distress Management, Version 1.2026: the distress thermometer and problem list page (DIS-A), as the PDF NCCN
 *   publishes for free; and the NCCN Guidelines Insights on Version 1.2026 (JNCCN 2026), abstract only, because the
 *   journal text is paywalled and NCCN does not allow its guideline text to be reproduced. The full NCCN 2026
 *   guideline was not read.
 * - NCCN Distress Management, Version 3.2019 (JNCCN 2019): full text from PubMed Central (PMC6907687). This is the
 *   latest edition whose full text could be read; the 2019 cut-off, referral pathway and standards of care are quoted
 *   from it and dated as such.
 * - ASCO guideline update on anxiety and depression in adult survivors (J Clin Oncol 2023): abstract only; the
 *   publisher refused a script and PubMed Central holds no copy.
 * - ASCO adaptation of the pan-Canadian guideline on screening, assessment and care of anxiety and depressive symptoms
 *   (J Clin Oncol 2014): abstract only; the publisher does not allow PubMed Central to release the full text.
 * - Carlson et al., randomised trial of screening for distress (J Clin Oncol 2010): abstract.
 * - Macmillan Cancer Support, personalised care and support planning (holistic needs assessment): web page, raw HTML.
 * - NICE CSG4, Improving supportive and palliative care for adults with cancer (2004): the NICE page, which says the
 *   guideline is retired.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const distressScreeningAndReferral = protocol({
  id: "distress-screening-and-referral",
  name: "Distress screening with the distress thermometer, and referral by need",
  aka: ["distress thermometer", "NCCN distress thermometer and problem list", "screening for distress", "sixth vital sign", "psychosocial screening", "holistic needs assessment", "stepped care for anxiety and depression"],
  domain: "supportive-care",
  tldr: "Many people with cancer feel worried, low or overwhelmed, and money, work or caring for others add to it. Clinics often ask you to mark a scale from 0 to 10 for your distress in the past week and tick a list of problems. A score of 4 or more is a signal for the team to talk it through and offer help, such as a psychologist, social worker or chaplain. Screening only helps when someone acts on it.",
  simple: "Your team may ask how upset or worried you feel, from 0 to 10. If the number is 4 or more, they should talk with you and offer help.",
  summary: "NCCN's standard is that distress should be recognised, monitored, documented and treated promptly at all stages of disease and in all settings, with screening at the first visit, at appropriate intervals and whenever the clinical picture changes (Version 3.2019, the latest full text that could be read; the Version 1.2026 tool page still pairs the 0 to 10 thermometer with a problem list). The tool is a single 0 to 10 distress thermometer for the past week with a problem list of physical, emotional, social, practical and spiritual concerns. In NCCN 2019 a score of 4 or more triggers a further assessment and referral by the problem found (mental health, social work or chaplaincy); a score below 4 is handled by the oncology team as expected distress. The cut-off is a convention with known limits: NCCN itself cites a study in which a cut-off of 4 gave 95 per cent sensitivity and only 45 per cent specificity shortly after a breast cancer diagnosis.\n\nASCO (2014, adapting the pan-Canadian guideline) recommends that every patient be evaluated for symptoms of depression and anxiety at periodic times across the course of care using validated measures. ASCO's 2023 update sets out stepped care: education about depression and anxiety for everyone; for moderate symptoms, cognitive behavioural therapy, behavioural activation, mindfulness-based stress reduction, structured physical activity or psychosocial interventions; for severe symptoms, psychological therapy; and medicines where first-line care is unavailable, preferred, previously effective or has not worked.\n\nThe evidence that screening helps is conditional. In a randomised trial in 1,134 new patients, full screening with a problem checklist and triage lowered distress at three months against the thermometer alone, and the best predictor of improvement was receiving a referral; NCCN also records a randomised trial with no difference at 12 months, and concludes that screening is not enough without follow-up referral and treatment. In England the equivalent is the holistic needs assessment within personalised care and support planning (Macmillan and NHS); NICE's 2004 supportive and palliative care service guidance is retired.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward"],
  },
  population: "Adults with cancer at any stage, from diagnosis through treatment, survivorship and advanced disease. The NCCN guideline and the ASCO guidelines read are for adults; children and adolescents have separate psychosocial standards not covered here. Thoughts of suicide are among the problems NCCN lists; how urgently they are assessed is set by the local team's emergency pathway, which no source read here spells out.",
  trigger: "The first oncology visit, then at set intervals and at every change in disease or treatment: the end of treatment, recurrence, progression, or a serious complication.",
  steps: [
    {
      action: "Screen every patient for distress at the first visit, then at regular intervals and at each change in disease status",
      why: "Distress is common and often missed in a busy clinic; asking at set moments catches it when it changes.",
      source: "nccn-2019",
      quote: "At a minimum, patients should be screened to ascertain their level of distress at the initial visit, at appropriate intervals, and as clinically indicated, especially with changes in disease status (eg, remission, recurrence, or progression; treatment-related complications).",
      grade: "category 2A",
    },
    {
      action: "Ask the person to rate their distress over the past week on the 0 to 10 thermometer and to mark their concerns on the problem list",
      why: "One number shows how much distress there is; the problem list shows what it is about, which decides who can help.",
      source: "nccn-dt-2026",
      quote: "Instructions: Please circle the number (0–10) that best describes how much distress you have been experiencing in the past week, including today.",
      grade: "category 2A",
    },
    {
      action: "Use validated, published measures for anxiety and depression when screening or assessing further",
      why: "A validated questionnaire is more reliable than a general impression, and allows a change to be measured over time.",
      source: "asco-2014",
      quote: "It is recommended that all patients with cancer be evaluated for symptoms of depression and anxiety at periodic times across the trajectory of care. Assessment should be performed using validated, published measures and procedures.",
    },
    {
      action: "For a score below 4, manage the concerns within the oncology team as part of usual supportive care",
      why: "Some distress is expected after a cancer diagnosis; the treating team can often address it directly.",
      source: "nccn-2019",
      quote: "Mild distress (DT score <4) is routinely managed by the primary oncology team and represents what the panel terms “expected distress” symptoms.",
      grade: "category 2A",
    },
    {
      action: "For a score of 4 or more, go through the problem list with the person and refer to the right service: mental health, social work or chaplaincy",
      why: "A higher score needs a conversation and the right professional, matched to the problem behind it.",
      source: "nccn-2019",
      quote: "If the patient’s distress level is ≥4, a member of the oncology team looks at the Problem List (discussed in the next section) to identify key issues of concern and asks further questions to determine the best resources (psychiatry, psychology, social work, or chaplaincy professionals) to address the patient’s concerns.",
      grade: "category 2A",
    },
    {
      action: "Offer every patient information about depression and anxiety, and match further help to how severe the symptoms are (stepped care)",
      why: "Most people need information and support; those with more severe symptoms need more intensive help.",
      source: "asco-2023",
      quote: "It is recommended to use a stepped-care model, that is, provide the most effective and least resource-intensive intervention based on symptom severity. All oncology patients should be offered education regarding depression and anxiety.",
    },
    {
      action: "For moderate or severe depression or anxiety, offer a psychological therapy first, and consider medicines where that is unavailable, preferred or has not worked",
      why: "Psychological therapies improved depression and anxiety in the trials reviewed; the evidence for medicines in people with cancer was less consistent.",
      source: "asco-2023",
      quote: "For patients with severe symptoms of depression or anxiety, clinicians should offer cognitive therapy, BA, CBT, MBSR, or interpersonal therapy. Treating clinicians may offer a pharmacologic regimen for depression or anxiety for patients who do not have access to first-line treatment, prefer pharmacotherapy, have previously responded well to pharmacotherapy, or have not improved following first-line psychological or behavioral management.",
    },
    {
      action: "Make sure every positive screen leads to a referral and a follow-up, not only a score in the notes",
      why: "Trials of screening without follow-up care found little benefit; those that linked screening to referral or treatment did better.",
      source: "nccn-2019",
      quote: "Overall, results of these studies show that screening, although a critical component of psychosocial care, is not sufficient to impact patient outcomes without adequate follow-up referrals and treatment.",
    },
  ],
  bestInClass: {
    statement: "Screen at the first visit, at set intervals and at every change in disease, with the NCCN distress thermometer and problem list or another validated measure, and act on what is found: a score of 4 or more (NCCN) leads to assessment and referral by problem, and anxiety and depression are treated by stepped care (ASCO 2023), psychological therapies first. NCCN (2019 full text, 2026 tool) and ASCO (2014, 2023) agree on routine screening with validated tools; they differ in emphasis, NCCN on general distress across practical, social and spiritual problems, ASCO on anxiety and depression specifically. The randomised evidence supports screening only when it is coupled to triage and referral. The full NCCN 2026 text and the full ASCO 2023 text could not be read, so their grades are not given here.",
    sources: ["nccn-2019", "nccn-dt-2026", "nccn-insights-2026", "asco-2014", "asco-2023", "carlson-2010"],
  },
  variants: [
    {
      name: "Holistic needs assessment within personalised care and support planning (England)",
      differs: "A structured assessment of physical, practical, emotional and social concerns, on paper or electronically, leading to a personalised care and support plan agreed through a series of conversations, rather than a single distress score. Macmillan's page does not say at which points it should be repeated.",
      evidence: "Described by Macmillan Cancer Support as part of the NHS personalised care model; no trial of it was read. NICE's 2004 service guidance on supportive and palliative care, which set out a four-level model of psychological support, is retired and NICE says the health system is not expected to follow it.",
      sources: ["macmillan-pcsp", "nice-csg4"],
    },
    {
      name: "Full screening with personalised triage (Calgary trial)",
      differs: "Adds a problem checklist, an anxiety and depression screen, a personalised report on the medical file and an optional telephone triage with referral, rather than the thermometer alone.",
      evidence: "Randomised trial of 1,134 new patients with breast or lung cancer: in lung cancer, 20 per cent fewer patients in the triage arm still had high distress at three months; in breast cancer, full screening and triage both lowered distress against the thermometer alone. Receiving a referral was the best predictor of improvement. Read as an abstract.",
      sources: ["carlson-2010"],
    },
    {
      name: "A higher thermometer cut-off",
      differs: "Uses a cut-off above 4 to reduce false positives, for example 7 in women shortly after a breast cancer diagnosis.",
      evidence: "NCCN 2019 cites a study of 181 Dutch women in which a cut-off of 4 gave 95 per cent sensitivity and 45 per cent specificity, and a cut-off of 7 gave 73 and 84 per cent. NCCN kept 4 as its trigger.",
      sources: ["nccn-2019"],
    },
  ],
  grades: [
    { claim: "NCCN recommendations on distress management", grade: "category 2A unless otherwise noted", source: "nccn-2019", quote: "All recommendations are category 2A unless otherwise noted." },
    { claim: "A cut-off of 4 is sensitive but not specific shortly after a breast cancer diagnosis", grade: "single diagnostic accuracy study, as cited by NCCN", source: "nccn-2019", quote: "However, an analysis including 181 Dutch women who completed the DT within 1 month after breast cancer diagnosis showed that sensitivity was 95% and specificity was only 45% when the recommended cut-off score of 4 was used." },
  ],
  sources: [
    { key: "nccn-dt-2026", label: "NCCN Distress Thermometer and Problem List (NCCN Guidelines Distress Management, Version 1.2026, DIS-A)", publisher: "National Comprehensive Cancer Network", year: 2026, url: "https://www.nccn.org/docs/default-source/patient-resources/nccn_distress_thermometer.pdf", gradingScheme: "NCCN categories of evidence and consensus: category 1 (high-level evidence, uniform consensus), 2A (lower-level evidence, uniform consensus), 2B, 3.", read: "full-text", accessed: "2026-11-11" },
    { key: "nccn-insights-2026", label: "NCCN Guidelines Insights: Distress Management, Version 1.2026", publisher: "Journal of the National Comprehensive Cancer Network", year: 2026, url: "https://europepmc.org/abstract/MED/41956112", doi: "10.6004/jnccn.2026.0018", read: "abstract", accessed: "2026-11-11" },
    { key: "nccn-2019", label: "Distress Management, Version 3.2019, NCCN Clinical Practice Guidelines in Oncology", publisher: "Journal of the National Comprehensive Cancer Network", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6907687/", doi: "10.6004/jnccn.2019.0048", gradingScheme: "NCCN categories of evidence and consensus: category 1 (high-level evidence, uniform consensus), 2A (lower-level evidence, uniform consensus), 2B, 3.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2023", label: "Management of Anxiety and Depression in Adult Survivors of Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/37075262", doi: "10.1200/JCO.23.00293", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-2014", label: "Screening, assessment, and care of anxiety and depressive symptoms in adults with cancer: an American Society of Clinical Oncology guideline adaptation", publisher: "ASCO, Journal of Clinical Oncology", year: 2014, url: "https://europepmc.org/abstract/MED/24733793", doi: "10.1200/JCO.2013.52.4611", read: "abstract", accessed: "2026-11-11" },
    { key: "carlson-2010", label: "Screening for distress in lung and breast cancer outpatients: a randomized controlled trial", publisher: "Journal of Clinical Oncology", year: 2010, url: "https://europepmc.org/abstract/MED/20940193", doi: "10.1200/JCO.2009.27.3698", read: "abstract", accessed: "2026-11-11" },
    { key: "macmillan-pcsp", label: "Personalised care and support planning (holistic needs assessment, treatment summary, cancer care review)", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/healthcare-professionals/innovation-in-cancer-care/personalised-care", read: "public-summary", accessed: "2026-11-11" },
    { key: "nice-csg4", label: "Improving supportive and palliative care for adults with cancer (CSG4), retired", publisher: "NICE", year: 2004, url: "https://www.nice.org.uk/guidance/csg4", gradingScheme: "NICE does not grade recommendations; this service guideline is retired.", read: "public-summary", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The full NCCN Distress Management guideline, Version 1.2026, was not read: the journal summary is paywalled and NCCN does not allow its text to be reproduced. The cut-off, referral pathway and standards quoted are from Version 3.2019, the latest full text available, and may have changed in wording.",
    "The ASCO 2023 update and the ASCO 2014 adaptation were read only as abstracts, so their grades, the named screening tools and the time points are not given here.",
    "The pan-Canadian guideline that ASCO adapted, and the International Psycho-Oncology Society's quality standard, were not read.",
    "NCCN cites one randomised trial of the thermometer and problem list that found no difference in distress at 12 months, and another that found benefit with triage; the size of the benefit of screening alone is not settled.",
    "No source read sets a single best interval for repeat screening; NCCN says every visit ideally, and at minimum at set intervals and at changes.",
    "Screening for children, adolescents and young adults, and for people with cognitive impairment or limited literacy, is not covered by the sources read.",
  ],
  institutions: ["asco", "nice", "macmillan-cancer-support", "ipos"],
  technologies: ["psycho-oncology", "rejuv-mind-distress-screening", "rejuv-mind-anxiety-after-cancer", "rejuv-mind-depression-after-cancer", "mindfulness-based-interventions", "cbt-fatigue-distress"],
  terms: ["quality-of-life"],
  sections: ["supportive-care"],
  related: ["rejuv-access-survivorship-care-uk"],
  tags: ["protocol", "supportive-care", "psychosocial"],
});
