import { protocol } from "./helpers";

/*
 * Screening for distress (the distress thermometer and problem list), and the stepped referral that follows it.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, NCBI E-utilities, the Europe PMC REST API, pdftotext) and every claim re-read against it; every quote
 * was checked by script, with only whitespace and XML or HTML tags normalised.
 * - NCCN Distress Management, Version 1.2026: the distress thermometer and problem list page (DIS-A), as the PDF NCCN
 *   publishes for free; and the NCCN Guidelines Insights on Version 1.2026 (JNCCN 2026), abstract only, because the
 *   journal text is paywalled. On 17 November 2026 NCCN's own guideline page listed Version 1.2027; the guideline
 *   itself sits behind a login and was not read, in that or any 2026 version.
 * - NCCN Distress Management, Version 3.2019 (JNCCN 2019): full text from PubMed Central (PMC6907687) through NCBI
 *   E-utilities. This is the latest edition whose full text could be read; the 2019 cut-off, referral pathway and
 *   standards of care are quoted from it and dated as such.
 * - ASCO guideline update on anxiety and depression in adult survivors (J Clin Oncol 2023): abstract only; PubMed
 *   Central holds no copy.
 * - ASCO adaptation of the pan-Canadian guideline on screening, assessment and care of anxiety and depressive symptoms
 *   (J Clin Oncol 2014): on 11 November only the abstract could be read; on 17 November the full text read from
 *   PubMed Central (PMC4090422) as HTML. Its two algorithm figures are images and were not read.
 * - Carlson et al., randomised trial of screening for distress (J Clin Oncol 2010): abstract.
 * - Macmillan Cancer Support, personalised care and support planning (holistic needs assessment): web page, raw HTML.
 * - NICE CSG4, Improving supportive and palliative care for adults with cancer (2004): the NICE page, which says the
 *   guideline is retired, and the retired PDF it links, read for the four-level model (recommendation 5.17) and the
 *   evidence grading table.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with nothing changed.
 */
export const distressScreeningAndReferral = protocol({
  id: "distress-screening-and-referral",
  name: "Distress screening with the distress thermometer, and referral by need",
  aka: ["distress thermometer", "NCCN distress thermometer and problem list", "screening for distress", "sixth vital sign", "psychosocial screening", "holistic needs assessment", "stepped care for anxiety and depression"],
  domain: "supportive-care",
  tldr: "Many people with cancer feel worried, low or overwhelmed, and money, work or caring for others add to it. Clinics often ask you to mark a scale from 0 to 10 for your distress in the past week and tick a list of problems. A score of 4 or more is a signal for the team to talk it through and offer help, such as a psychologist, social worker or chaplain. Screening only helps when someone acts on it.",
  simple: "Your team may ask how upset or worried you feel, from 0 to 10. If the number is 4 or more, they should talk with you and offer help.",
  summary: "NCCN's standard is that distress should be recognised, monitored, documented and treated promptly at all stages of disease and in all settings. Ideally patients are screened at every medical visit; at a minimum at the first visit, at appropriate intervals and as clinically indicated, especially when disease status changes (Version 3.2019, the latest full text that could be read; NCCN's website listed Version 1.2027 on 17 November 2026, which could not be read). The tool is a single 0 to 10 distress thermometer for the past week with a problem list; the free tool page, marked Version 1.2026, groups the list into physical, emotional, social, practical and spiritual or religious concerns. In NCCN 2019 a score of 4 or more triggers further questions and referral by the problem found (mental health, social work or chaplaincy); a score below 4 is routinely managed by the oncology team as expected distress. NCCN 2019 reports a meta-analysis of 42 studies in which a cut-off of 4 had a pooled sensitivity of 81 per cent and a pooled specificity of 72 per cent, and one study of women within a month of a breast cancer diagnosis in which the same cut-off gave 95 per cent sensitivity and only 45 per cent specificity.\n\nASCO (2014, adapting the pan-Canadian guideline, for adults aged 18 and over) recommends that all patients with cancer be evaluated for symptoms of depression and anxiety at periodic times across the course of care using validated measures: at the initial visit, at appropriate intervals and as clinically indicated, especially after treatment, at recurrence or progression, and at the transition to palliative and end-of-life care. It builds its depression screen on the PHQ-9 questionnaire and recommends the GAD-7 scale for anxiety, and it says anyone identified as at risk of harm to self or others should be referred for emergency evaluation. ASCO's 2023 update sets out stepped care: education about depression and anxiety for everyone; for moderate depression, cognitive behavioural therapy, behavioural activation, mindfulness-based stress reduction, structured physical activity or empirically supported psychosocial interventions; for moderate anxiety, cognitive behavioural therapy, behavioural activation, structured physical activity, acceptance and commitment therapy or psychosocial interventions; for severe symptoms of either, cognitive therapy, behavioural activation, cognitive behavioural therapy, mindfulness-based stress reduction or interpersonal therapy; and medicines may be offered where first-line care is unavailable, the person prefers them, they have worked before, or first-line care has not helped.\n\nThe evidence that screening helps is conditional. In a randomised trial of online screening in new patients (585 with breast cancer and 549 with lung cancer), 20 per cent fewer patients with lung cancer in the triage arm still had high distress at three months than in the other two arms, and patients with breast cancer in the full screening and triage arms had lower distress than those given the thermometer alone; the best predictor of less anxiety and depression was receiving a referral to psychosocial services. NCCN also records a randomised trial with no difference at 12 months, and concludes that screening is not enough without follow-up referral and treatment. In the UK, Macmillan describes the holistic needs assessment within personalised care and support planning, which it ties to the NHS Long Term Plan; NICE's 2004 supportive and palliative care service guidance is retired.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward"],
  },
  population: "Adults with cancer at any stage, from diagnosis through treatment, survivorship and advanced disease. ASCO 2014 covers adults aged 18 and over at any phase of the cancer continuum, and the NCCN 2019 text concerns adult patients; children and adolescents are not covered by the sources read. NCCN 2019 names suicidal ideation among common psychosocial problems, and the PHQ-9 questionnaire ASCO uses has an item on thoughts of self-harm. ASCO 2014 says a person at risk of harm to self or others needs referral for emergency evaluation, and asks teams to check their hospital's preferred pathway for a mental health emergency.",
  trigger: "The first oncology visit, then at appropriate intervals and whenever clinically indicated, especially at a change in disease status: remission, recurrence, progression or a treatment-related complication (NCCN 2019). ASCO 2014 adds the period after treatment and the transition to palliative and end-of-life care.",
  steps: [
    {
      action: "Screen every patient for distress at the first visit, then at appropriate intervals and at each change in disease status",
      why: "Distress is common, and NCCN says the oncology team often under-recognises it; NCCN's ideal is screening at every medical visit, and this is its minimum.",
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
      why: "ASCO asks for a valid and reliable measure with established cut-offs; its 2014 text builds the depression screen on the PHQ-9 questionnaire and recommends the GAD-7 scale for anxiety.",
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
      action: "For a score of 4 or more, go through the problem list with the person, ask further questions and refer where needed to the right service: mental health, social work or chaplaincy",
      why: "A higher score needs a conversation and the right professional, matched to the problem behind it.",
      source: "nccn-2019",
      quote: "If the patient’s distress level is ≥4, a member of the oncology team looks at the Problem List (discussed in the next section) to identify key issues of concern and asks further questions to determine the best resources (psychiatry, psychology, social work, or chaplaincy professionals) to address the patient’s concerns.",
      grade: "category 2A",
    },
    {
      action: "Refer anyone identified as at risk of harm to themselves or others for emergency evaluation, and keep them safe while it is arranged",
      why: "ASCO treats this as needing emergency evaluation, a safe environment and one-to-one observation, and asks teams to know in advance their hospital's preferred pathway for a mental health emergency.",
      source: "asco-2014",
      quote: "For any patient who is identified as at risk of harm to self and/or others, refer to appropriate services for emergency evaluation. Facilitate a safe environment and one-to-one observation, and initiate appropriate harm-reduction interventions.",
    },
    {
      action: "Offer every patient information about depression and anxiety, and match further help to how severe the symptoms are (stepped care)",
      why: "Stepped care means giving the most effective help that uses the least resource, chosen by how severe the symptoms are.",
      source: "asco-2023",
      quote: "It is recommended to use a stepped-care model, that is, provide the most effective and least resource-intensive intervention based on symptom severity. All oncology patients should be offered education regarding depression and anxiety.",
    },
    {
      action: "For moderate symptoms offer a psychological or behavioural treatment or structured physical activity, and for severe symptoms a psychological therapy; a medicine may be offered where that care is unavailable, the person prefers it, it has worked before, or first-line care has not helped",
      why: "ASCO's review found that psychological, educational and psychosocial interventions improved depression and anxiety, and that the evidence for medicines in cancer survivors was inconsistent.",
      source: "asco-2023",
      quote: "For patients with severe symptoms of depression or anxiety, clinicians should offer cognitive therapy, BA, CBT, MBSR, or interpersonal therapy. Treating clinicians may offer a pharmacologic regimen for depression or anxiety for patients who do not have access to first-line treatment, prefer pharmacotherapy, have previously responded well to pharmacotherapy, or have not improved following first-line psychological or behavioral management.",
    },
    {
      action: "Make sure a positive screen leads to further evaluation, referral where needed and follow-up, not only a score in the notes",
      why: "NCCN cites a review in which the trials that found no benefit lacked follow-up care for distressed patients, while those that linked screening to mandatory referral or treatment improved outcomes.",
      source: "nccn-2019",
      quote: "Overall, results of these studies show that screening, although a critical component of psychosocial care, is not sufficient to impact patient outcomes without adequate follow-up referrals and treatment.",
    },
  ],
  bestInClass: {
    statement: "Screen at the first visit, at appropriate intervals and at every change in disease status, with the NCCN distress thermometer and problem list or another validated measure, and act on what is found: a score of 4 or more (NCCN 2019) leads to further questions and referral by problem, anyone at risk of harm to self or others is referred for emergency evaluation (ASCO 2014), and anxiety and depression are treated by stepped care (ASCO 2023), with psychological and behavioural care first-line. NCCN (2019 full text, 2026 tool) and ASCO (2014) both recommend routine screening with validated tools; they differ in emphasis, NCCN on general distress across practical, social and spiritual problems, ASCO on anxiety and depression specifically. NCCN concludes from the trials that screening does not change outcomes without follow-up referral and treatment. The NCCN 2026 and 2027 guideline texts and the full ASCO 2023 text could not be read, so their grades are not given here; the ASCO 2014 text prints no grade for its recommendations.",
    sources: ["nccn-2019", "nccn-dt-2026", "nccn-insights-2026", "asco-2014", "asco-2023", "carlson-2010"],
  },
  variants: [
    {
      name: "Holistic needs assessment within personalised care and support planning (Macmillan, for the NHS)",
      differs: "An assessment of the person's holistic needs, on paper or electronically, leading to a personalised care and support plan that covers physical, practical, emotional and social needs and is reached through a series of supportive conversations, rather than a single distress score. Macmillan's page says needs should be identified at the earliest opportunity and does not say at which points the assessment should be repeated.",
      evidence: "Described by Macmillan Cancer Support, which says it is committed to supporting the NHS Long Term Plan to deliver personalised care and support planning; no trial of it was read. NICE's 2004 service guidance on supportive and palliative care, which recommended a four-level model of professional psychological assessment and intervention in each cancer network, is retired, and NICE says the health and care system is not expected to follow it.",
      sources: ["macmillan-pcsp", "nice-csg4"],
    },
    {
      name: "Full screening with personalised triage (Calgary trial)",
      differs: "Adds a problem checklist, an anxiety and depression screen, a personalised report on the medical file and an optional telephone triage with referral, rather than the thermometer alone.",
      evidence: "Randomised trial in new patients, 585 with breast cancer and 549 with lung cancer, assessed at baseline and again three months later: in lung cancer, 20 per cent fewer patients in the triage arm still had high distress than in the other two arms; in breast cancer, the full screening and triage arms both showed lower distress than the thermometer alone. In the full screening and triage arms, receiving a referral to psychosocial services was the best predictor of less anxiety and depression. Read as an abstract.",
      sources: ["carlson-2010"],
    },
    {
      name: "A higher thermometer cut-off",
      differs: "Uses a cut-off above 4 to reduce false positives, for example 7 in women within a month of a breast cancer diagnosis.",
      evidence: "NCCN 2019 cites a study of 181 Dutch women in which a cut-off of 4 gave 95 per cent sensitivity and 45 per cent specificity, and the investigators suggested 7 as optimal, with 73 and 84 per cent. Against that, the meta-analysis NCCN cites (42 studies, more than 14,000 patients) found a pooled sensitivity of 81 per cent and specificity of 72 per cent at a cut-off of 4. NCCN 2019 uses 4 as its trigger.",
      sources: ["nccn-2019"],
    },
  ],
  grades: [
    { claim: "NCCN recommendations on distress management", grade: "category 2A unless otherwise noted", source: "nccn-2019", quote: "All recommendations are category 2A unless otherwise noted." },
    { claim: "A cut-off of 4 is sensitive but not specific shortly after a breast cancer diagnosis", grade: "no grade printed; a single study cited in the NCCN discussion text", source: "nccn-2019", quote: "However, an analysis including 181 Dutch women who completed the DT within 1 month after breast cancer diagnosis showed that sensitivity was 95% and specificity was only 45% when the recommended cut-off score of 4 was used." },
  ],
  sources: [
    { key: "nccn-dt-2026", label: "NCCN Distress Thermometer and Problem List (NCCN Guidelines Distress Management, Version 1.2026, DIS-A)", publisher: "National Comprehensive Cancer Network", year: 2026, url: "https://www.nccn.org/docs/default-source/patient-resources/nccn_distress_thermometer.pdf", gradingScheme: "NCCN categories of evidence and consensus: category 1 (high-level evidence, uniform consensus), 2A (lower-level evidence, uniform consensus), 2B, 3.", read: "full-text", accessed: "2026-11-17" },
    { key: "nccn-insights-2026", label: "NCCN Guidelines Insights: Distress Management, Version 1.2026", publisher: "Journal of the National Comprehensive Cancer Network", year: 2026, url: "https://europepmc.org/abstract/MED/41956112", doi: "10.6004/jnccn.2026.0018", read: "abstract", accessed: "2026-11-17" },
    { key: "nccn-2019", label: "Distress Management, Version 3.2019, NCCN Clinical Practice Guidelines in Oncology", publisher: "Journal of the National Comprehensive Cancer Network", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6907687/", doi: "10.6004/jnccn.2019.0048", gradingScheme: "NCCN categories of evidence and consensus: category 1 (high-level evidence, uniform consensus), 2A (lower-level evidence, uniform consensus), 2B, 3.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2023", label: "Management of Anxiety and Depression in Adult Survivors of Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/37075262", doi: "10.1200/JCO.23.00293", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-2014", label: "Screening, assessment, and care of anxiety and depressive symptoms in adults with cancer: an American Society of Clinical Oncology guideline adaptation", publisher: "ASCO, Journal of Clinical Oncology", year: 2014, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4090422/", doi: "10.1200/JCO.2013.52.4611", gradingScheme: "No grade is printed beside the recommendations. Recommendations marked with an asterisk are taken verbatim from the pan-Canadian guideline, the others are adapted by the ASCO panel, and those on follow-up rest on the panel's consensus alone.", read: "full-text", accessed: "2026-11-17" },
    { key: "carlson-2010", label: "Screening for distress in lung and breast cancer outpatients: a randomized controlled trial", publisher: "Journal of Clinical Oncology", year: 2010, url: "https://europepmc.org/abstract/MED/20940193", doi: "10.1200/JCO.2009.27.3698", read: "abstract", accessed: "2026-11-17" },
    { key: "macmillan-pcsp", label: "Personalised care and support planning (holistic needs assessment, treatment summary, cancer care review)", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/healthcare-professionals/innovation-in-cancer-care/personalised-care", read: "public-summary", accessed: "2026-11-17" },
    { key: "nice-csg4", label: "Improving supportive and palliative care for adults with cancer (CSG4), retired", publisher: "NICE", year: 2004, url: "https://www.nice.org.uk/guidance/csg4", gradingScheme: "The 2004 text grades the evidence behind its recommendations from A (randomised trials or systematic reviews of them) through B (non-randomised or observational studies) to C (professional consensus); the recommendations themselves carry no grade. This service guideline is retired.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The full NCCN Distress Management guideline was not read in any version after 3.2019: the 2026 journal summary is paywalled and the guideline itself sits behind a login. On 17 November 2026 NCCN's guideline page listed Version 1.2027, while the free thermometer page was still marked Version 1.2026. The cut-off, referral pathway and standards quoted are from Version 3.2019, the latest full text available, and may have changed. The abstract of the 2026 summary says the panel's recent recommendations include care delivery models such as collaborative care, which is not described here.",
    "The ASCO 2023 update was read only as an abstract, so its grades and its definitions of moderate and severe symptoms are not given here. The ASCO 2014 adaptation was read in full on 17 November 2026, apart from its two algorithm figures, which are images; its questionnaire cut-off scores are not repeated here.",
    "The pan-Canadian guideline that ASCO adapted, and the International Psycho-Oncology Society's quality standard, were not read.",
    "NCCN cites one randomised trial of the thermometer and problem list that found no difference in distress at 12 months, and another that found benefit with triage; the size of the benefit of screening alone is not settled.",
    "No source read sets a single best interval for repeat screening; NCCN says every visit ideally, and at minimum at appropriate intervals and at changes in disease status.",
    "Screening for children and adolescents is not covered by the sources read. ASCO 2014 asks that assessment be tailored for people with learning disabilities or cognitive impairment and be culturally sensitive, without saying how.",
  ],

  institutions: ["asco", "nice", "macmillan-cancer-support", "ipos"],
  technologies: ["psycho-oncology", "rejuv-mind-distress-screening", "rejuv-mind-anxiety-after-cancer", "rejuv-mind-depression-after-cancer", "mindfulness-based-interventions", "cbt-fatigue-distress"],
  terms: ["quality-of-life"],
  sections: ["supportive-care"],
  related: ["rejuv-access-survivorship-care-uk"],
  tags: ["protocol", "supportive-care", "psychosocial"],
});
