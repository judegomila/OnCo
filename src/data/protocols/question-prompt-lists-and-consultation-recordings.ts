import { protocol } from "./helpers";

/*
 * Question prompt lists before key cancer appointments, and an audio recording or written summary of the consultation
 * afterwards. Consent itself, and the education given before treatment, are
 * `consent-and-education-before-anticancer-treatment`; its steps are not repeated here.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - NICE NG197, Shared decision making (published 17 June 2021; the page shows no later update): the recommendations
 *   page, full text (HTML). It covers all healthcare, not cancer alone.
 * - Cochrane review CD004565.pub2, interventions before consultations for helping patients address their information
 *   needs (Kinnersley et al., 2007): abstract only on 16 November (the PubMed Central copy returned an error). It
 *   covers all healthcare; no later version was found in Europe PMC.
 * - Cochrane review CD001539.pub2, recordings or summaries of consultations for people with cancer (Pitkethly et al.,
 *   2008): abstract only. No later version was found in Europe PMC, so the latest Cochrane evidence on recordings is
 *   from searches run in 2007.
 * - Han et al., systematic review and meta-analysis of question prompt lists in cancer (Asia Pac J Oncol Nurs 2025):
 *   full text, Europe PMC (PMC12391282).
 * - Arthur et al., randomised trial of a question prompt sheet in advanced cancer (JAMA Netw Open 2023): full text,
 *   Europe PMC (PMC10155065).
 * - As abstracts from Europe PMC: Keinki et al. 2021 and Brandes et al. 2015 (systematic reviews of prompt lists in
 *   oncology), Wang et al. 2024 (meta-analysis in advanced cancer), Rieger et al. 2018 (systematic review of
 *   consultation recordings), Tsulukidze et al. 2014 (scoping review of recordings), Hack et al. 2021 (randomised
 *   trial of recordings in brain tumours), Licqurish et al. 2019 (overview of systematic reviews of communication
 *   tools in cancer care).
 * - British Medical Association, Patients recording consultations (updated 21 August 2024): public web page, raw HTML.
 *   It is a doctors' association writing for doctors in the United Kingdom, and its legal statements are about UK law.
 * - ASCO patient-clinician communication consensus guideline (Gilligan et al., J Clin Oncol 2017): abstract only; the
 *   publisher page returned 403 to a script and PubMed Central holds no copy. The abstract does not state what the
 *   guideline says about prompt lists or recordings, so no step rests on it.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text and every claim re-read against
 * it: the twelve Europe PMC records (titles, years and abstracts), the full text of Han 2025 and Arthur 2023 from the
 * Europe PMC REST API, the BMA page with curl, and NICE NG197 (the recommendations page from a copy another checker
 * saved from nice.org.uk the same day, and the overview page, which shows "Last reviewed: 17 June 2021"). The
 * Kinnersley Cochrane review, abstract only the day before, now reads in full as HTML from PubMed Central
 * (PMC9036848); the Europe PMC XML endpoint still returns an error. Crossref and Europe PMC show no later version of
 * either Cochrane review. The ASCO guideline page still returned 403. All 29 quotations (20 in steps and grades, 9 inside the prose) were checked by script and are
 * verbatim. Corrected: reasons in `why` that no source states were reworded to what the sources say; the BMA's
 * "encourage" had been written as an order; the anxiety statements now carry the 2018 review that did find an effect;
 * the robustness caveat in Han 2025 is scoped to the two outcomes it concerns; a shortened quotation was restored.
 */
export const questionPromptListsAndConsultationRecordings = protocol({
  id: "question-prompt-lists-and-consultation-recordings",
  name: "Question prompt lists before key appointments, and a recording or written summary of the consultation",
  aka: ["question prompt list", "QPL", "question prompt sheet", "questions to ask your doctor", "consultation recording", "audio recording of the consultation", "recording an appointment on a phone", "written consultation summary", "clinic letter to the patient"],
  domain: "consent-and-communication",
  tldr: "Before an important appointment, a ready-made list of questions can help you ask what matters; in trials people asked more when the list came with an explanation or the clinician's encouragement. Afterwards, most people use a recording or written summary, and five of nine studies found they remembered more. No study read shows either changes how the illness goes, and findings on anxiety are mixed.",
  simple: "Before a big appointment, you can be given a list of questions to help you think about what to ask. You can also ask to record the talk on your phone, or ask for a written summary. This can help you remember and tell your family. Ask the doctor before you record.",
  summary: "Prompt lists. A 2025 meta-analysis of 14 randomised trials in cancer found prompt lists increased questions asked (SMD 0.24, 95% CI 0.00 to 0.48) and engagement in shared decision making (SMD 0.33), with no significant effect on consultation length; lists given with instructions did better than lists alone (SMD 0.31 for questions asked), anxiety was slightly higher one week after use (SMD 0.17), and the authors rate the robustness of the pooled results for questions asked and consultation length as suboptimal. Earlier reviews disagree on how much this matters: Brandes 2015 called the interventions effective, Keinki 2021 found limited impact from a list alone, and the 2007 Cochrane review of 33 trials across healthcare concluded benefits were limited (question asking SMD 0.27). In advanced cancer, a review of seven trials (1059 participants) found more questions asked but no significant improvement in anxiety or quality of life.\n\nRecordings and summaries. The 2008 Cochrane review (16 trials, 2318 adults with cancer) found 60 to 100 per cent used their recording or summary, five of nine studies reported better recall, three of ten more satisfaction and none an effect on anxiety or depression; it concluded that practitioners should consider offering them. A 2018 systematic review of 26 studies, not limited to cancer, found statistically significant support for several patient-reported outcomes, among them recall, anxiety and depression, while a 2019 overview of reviews judged the benefit of audio recording limited, and a 2021 trial in brain tumours (133 patients, under-powered) found patients felt better informed at one week but not at 3 or 6 months.\n\nGuidance. NICE NG197 (2021), for all healthcare, recommends resources before a discussion that prompt questions, a letter written to the patient and resources afterwards on what was agreed (a printout is its example), and names encouraging a recording as one way to support people who need extra help. The BMA encourages UK doctors to support requests to record. The ASCO communication guideline could not be read in full. A person's own team and local policy on recording come first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults with cancer, and the family or friends who come with them, at consultations where important information is given or a decision is made: diagnosis, treatment planning, a change of treatment, and discussions about prognosis or the end of life. The trials are of adults (the 2025 meta-analysis took patients aged 16 or older), mostly in hospitals and cancer centres in developed countries. NICE NG197 and the BMA guidance cover all healthcare; the BMA's statements on the law apply to the United Kingdom, and rules on recording differ between countries and hospitals. This page describes what the evidence and guidance say; the reader's own team and the local policy on recording come first.",
  trigger: "A consultation is booked at which a diagnosis, a treatment plan, results or prognosis will be discussed.",
  steps: [
    {
      action: "Before the appointment, offer the person something to help them prepare, in the format they prefer, that prompts them to think about what matters to them and what they want to ask",
      why: "NICE says the resource should encourage people to think about what matters to them, what they hope will happen as a result of the discussion, and what questions they would like to ask.",
      source: "nice-ng197",
      quote: "Before a discussion, offer the person access to resources in their preferred format (for example, a booklet, flyer or app) to help them prepare for discussing options and making shared decisions.",
      grade: "NICE recommendation 1.2.5 (2021), ungraded",
    },
    {
      action: "Give a question prompt list written for the person's situation before the consultation, explain it, and invite them to mark the questions they want answered rather than handing it over without comment",
      why: "In the pooled trials, a list given with instructions (an explanation for the patient, or the clinician endorsing the list) increased the number of questions asked, and a list alone did not.",
      source: "han-2025",
      quote: "QPL interventions with accompanying instructions showed superior effectiveness in promoting patient question-asking behavior and enhancing decision self-efficacy.",
      grade: "systematic review and meta-analysis of 14 randomised trials",
    },
    {
      action: "Ask whether the person wants a family member, friend, carer or advocate with them",
      why: "NICE says including them can help the person take an active part in the discussion, explain what matters to them, make decisions, and remember the information given.",
      source: "nice-ng197",
      quote: "Ask the person if they want to involve family members, friends, carers or advocates (being aware of safeguarding).",
      grade: "NICE recommendation 1.2.3 (2021), ungraded",
    },
    {
      action: "At the start of the consultation, agree together what to cover, including the questions the person has brought, and say how long there is",
      why: "NICE asks for this so that the person and the clinician decide together what matters most to discuss in the time there is.",
      source: "nice-ng197",
      quote: "Agree an 'agenda' at the start of each discussion to prioritise together what to discuss. Say how long the discussion will last.",
      grade: "NICE recommendation 1.2.7 (2021), ungraded",
    },
    {
      action: "Consider offering a recording or a written summary of key consultations",
      why: "In the trials, 60 to 100 per cent of people listened to the recording or read the summary at least once, 41.5 to 94.4 per cent used a recording to inform family and friends, and five of nine studies found better recall.",
      source: "cochrane-pitkethly-2008",
      quote: "Practitioners should consider offering people recordings or written summaries of their consultations.",
      grade: "Cochrane review of 16 controlled trials (2318 adults), authors' conclusion",
    },
    {
      action: "If the person asks to record the consultation on their own phone, support the request where you can, and if you have concerns, sensitively explore why they want the recording",
      why: "The BMA says most people record so they can listen again in a more relaxed setting or share the information with family and friends, and that patients whose doctors agree are less likely to record in secret.",
      source: "bma-recording-2024",
      quote: "We encourage doctors to support patient requests to record their consultations.",
      grade: "professional association guidance (United Kingdom), ungraded",
    },
    {
      action: "As a patient or carer, ask the clinician before recording, and do not record other patients without their explicit consent",
      why: "The BMA, writing about the United Kingdom, says asking first is a matter of courtesy and respect and is more likely to lead to a trusting relationship, and that other patients have privacy rights. Rules differ in other countries.",
      source: "bma-recording-2024",
      quote: "Both legally, and as a matter of courtesy, patients should seek doctors’ agreement before recording a consultation.",
      grade: "professional association guidance (United Kingdom), ungraded",
    },
    {
      action: "Offer extra support to people who are likely to need it: this could be encouraging them to record the discussion, explaining the decisions in writing, or arranging a follow-up conversation",
      why: "NICE names these as ways to help people who need extra help to take part in decisions. The BMA lists language barriers, distress, memory loss and complex information as situations where a recording helps.",
      source: "nice-ng197",
      quote: "Offer additional support to people who are likely to need extra help to engage in shared decision making. This could include encouraging them to record the discussion, explaining in writing the decisions that have been made, or arranging follow up by a clinical member of staff or a suitable alternative.",
      grade: "NICE recommendation 1.2.21 (2021), ungraded",
    },
    {
      action: "Give the person something to take away, or soon after, that sums up the diagnosis, the options, and what was decided",
      why: "NICE says these resources are to help people understand what was discussed and agreed. The Cochrane review notes that many people find it difficult to remember information given in a consultation.",
      source: "nice-ng197",
      quote: "This could be a printout summarising their diagnosis, the options and decisions or plans made, and links to high-quality online resources. Ideally, give people this material to take away, or provide it very soon after the discussion.",
      grade: "NICE recommendation 1.2.18 (2021), ungraded",
    },
    {
      action: "Write the clinic letter to the patient, send them a copy unless they decline, and say who to contact with further questions",
      why: "NICE recommends writing the letter to the patient rather than to their healthcare professional, and that information given after a discussion says who to contact with further questions.",
      source: "nice-ng197",
      quote: "Send a copy of the letter to the patient (unless they say they do not want a copy) and to the relevant healthcare professional.",
      grade: "NICE recommendations 1.2.19 and 1.2.20 (2021), ungraded",
    },
  ],
  bestInClass: {
    statement: "No cancer guideline that could be read sets out this procedure; the best-supported version combines NICE NG197 (2021, all healthcare, ungraded) with the trial evidence. Before a key appointment, offer a prompt list written for the situation and encourage its use: lists given with instructions increased questions asked in a meta-analysis of randomised trials in cancer, without a significant effect on consultation length, though its authors call the robustness of both results suboptimal. Afterwards, give a written summary and a letter addressed to the patient (NICE), and consider offering a recording (Cochrane 2008). The reviews disagree on how much benefit to expect, and both positions are shown. On prompt lists: Brandes 2015 concludes they \"are effective in improving communication, psychological and cognitive outcomes\", while Keinki 2021 finds that lists alone \"show limited impact on communicative processes and psychological outcomes\" and the Cochrane review of 33 trials across healthcare found \"limited benefits to patients\". On recordings: the Cochrane review says they \"may benefit most adults with cancer\" and Rieger 2018 calls them \"valuable to patients and positively associated with patient-reported outcomes\", while the 2019 overview of reviews states \"There is limited benefit in audio recording consultations or using patient-held records during consultations.\" The reviews also disagree on anxiety: the Cochrane review of recordings found no difference in anxiety or depression in any of ten studies, Rieger 2018 reports statistically significant support for a beneficial effect on both, and one meta-analysis found slightly higher anxiety a week after a prompt list was used. No review read reports an effect on quality of life (the Cochrane review of recordings and the review in advanced cancer looked and found none), and the Cochrane review of recordings states that no study evaluated survival.",
    sources: ["nice-ng197", "han-2025", "cochrane-kinnersley-2007", "cochrane-pitkethly-2008", "brandes-2015", "keinki-2021", "rieger-2018", "licqurish-2019", "bma-recording-2024"],
  },
  variants: [
    {
      name: "Prompt list alone, or with coaching or the clinician's endorsement",
      differs: "The list is handed over with no explanation; or someone explains it to the person before the consultation; or the clinician endorses it and invites the questions.",
      evidence: "Han 2025: across nine studies the pooled effect on questions asked was SMD 0.24 (95% CI 0.00 to 0.48); with instructions it was 0.31 (0.10 to 0.52) and for a list alone it was not significant. Decision self-efficacy improved only with instructions (SMD 0.45). The review rated five of its 16 articles at high risk of bias. The 2007 Cochrane review across healthcare found coaching and written materials had similar effects on question asking, and stated: \"There appear to be no clear benefits from clinician training in addition to patient interventions, although the evidence is limited.\"",
      sources: ["han-2025", "cochrane-kinnersley-2007", "brandes-2015"],
    },
    {
      name: "Three general questions on posters, letters and websites",
      differs: "Instead of a list written for one situation, the organisation prompts everyone to ask three questions: what are my options, what are the possible benefits and risks, and how can we make a decision together that is right for me.",
      evidence: "NICE NG197 recommendation 1.1.16 gives these as examples for organisations to promote. No trial comparing the three questions with a cancer-specific prompt list was read.",
      sources: ["nice-ng197"],
    },
    {
      name: "Prompt lists in advanced cancer and palliative care",
      differs: "A list written for people with advanced cancer, given before a consultation with the oncologist or palliative care doctor.",
      evidence: "Wang 2024: seven randomised trials, 1059 participants, six of them pooled; more questions asked (SMD 0.73, 95% CI 0.28 to 1.18) with \"no significant improvements in health-related outcomes such as end of life, anxiety, and quality of life\". In a US double-blind trial of a 25-item sheet against a general information sheet at a first palliative care visit (130 patients), the two were rated equally helpful (7.2 against 7.1 points), with no significant difference in anxiety, number of questions asked or consultation length; of the 47 patients asked at four weeks, 24 preferred the prompt sheet and 7 the general sheet.",
      sources: ["wang-2024", "arthur-2023"],
    },
    {
      name: "Recording made by the clinic and given to the patient",
      differs: "The service records the key consultation and gives the patient the audio file, rather than leaving it to the patient's phone.",
      evidence: "Cochrane 2008: between 60 and 100 per cent of participants in twelve studies listened or read at least once; 41.5 to 94.4 per cent in nine studies used it to inform family and friends. A scoping review of 33 studies found a weighted average of 72 per cent listened. In a Canadian trial in brain tumours (133 patients), those given the recording felt more fully informed at one week (p = 0.007) but not at 3 or 6 months, with no statistically significant difference in satisfaction, anxiety or depression; the authors note it was under-powered. Rieger 2018 lists the barriers: concerns about the strength of evidence, patient distress, effect on the consultation, clinic procedures, medico-legal issues and cost.",
      sources: ["cochrane-pitkethly-2008", "tsulukidze-2014", "hack-2021", "rieger-2018"],
    },
    {
      name: "Recording on the patient's own phone",
      differs: "The patient or companion records with their own device, with the clinician's agreement. In the UK the BMA advises that patients should ask first, that no other patient may be recorded without explicit consent, and that NHS facilities will have local policies on recording devices.",
      evidence: "No trial of patient-made recordings was read. The BMA guidance (2024) states: \"In some circumstances, permitting a patient to record a consultation, who may otherwise struggle to remember or understand, is likely to amount to a reasonable adjustment requirement under equality legislation.\" It also says that where a doctor remains unhappy, the consultation should not be refused unless a colleague willing to be recorded can see the patient safely and promptly. This is guidance from a doctors' association about UK law, not a clinical guideline.",
      sources: ["bma-recording-2024"],
    },
  ],
  grades: [
    { claim: "Prompt lists increased the number of questions asked by people with cancer", grade: "meta-analysis of 9 randomised trials: SMD 0.24, 95% CI 0.00 to 0.48, P = 0.05", source: "han-2025", quote: "Nine studies reported the impact of interventions on the number of questions by patients with cancer." },
    { claim: "Interventions before consultations (33 trials, 8244 patients, all healthcare) produce small increases in question asking and satisfaction", grade: "Cochrane review (2007): question asking SMD 0.27, 95% CI 0.19 to 0.36", source: "cochrane-kinnersley-2007", quote: "Interventions before consultations designed to help patients address their information needs within consultations produce limited benefits to patients." },
    { claim: "Prompt lists alone have limited impact on communication and psychological outcomes", grade: "systematic review of 10 randomised trials", source: "keinki-2021", quote: "QPL-only interventions show limited impact on communicative processes and psychological outcomes." },
    { claim: "Prompt list interventions are effective for communication, psychological and cognitive outcomes", grade: "systematic review of 16 articles", source: "brandes-2015", quote: "Question Prompt List interventions are effective in improving communication, psychological and cognitive outcomes of cancer patients." },
    { claim: "Recordings or summaries of key consultations may benefit most adults with cancer", grade: "Cochrane review of 16 controlled trials, 2318 adults (2008)", source: "cochrane-pitkethly-2008", quote: "The provision of recordings or summaries of key consultations may benefit most adults with cancer." },
    { claim: "No effect of recordings or summaries on anxiety or depression", grade: "Cochrane review (2008), 10 studies", source: "cochrane-pitkethly-2008", quote: "No studies (out of ten) found any statistically significant difference between groups in terms of anxiety or depression." },
    { claim: "Consultation recordings are valuable to patients and associated with better patient-reported outcomes", grade: "systematic review of 26 studies (12 randomised trials)", source: "rieger-2018", quote: "Consultation recordings are valuable to patients and positively associated with patient-reported outcomes." },
    { claim: "Limited benefit from audio recording consultations or patient-held records", grade: "overview of 11 systematic reviews (84 primary studies)", source: "licqurish-2019", quote: "There is limited benefit in audio recording consultations or using patient-held records during consultations." },
    { claim: "Prompt lists increase questions without lengthening the consultation", grade: "overview of 11 systematic reviews (84 primary studies)", source: "licqurish-2019", quote: "Question prompt lists can increase the number of questions asked by patients without increasing consultation length and may encourage them to reflect and plan questions before the consultation." },
    { claim: "Share the record of the discussion and decisions with the person", grade: "NICE recommendation 1.2.17 (2021), ungraded", source: "nice-ng197", quote: "Offer to share this with the person, for example, in a post-clinic letter." },
  ],
  sources: [
    { key: "nice-ng197", label: "Shared decision making (NG197), recommendations", publisher: "NICE", year: 2021, url: "https://www.nice.org.uk/guidance/ng197/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider) carries the strength. The recommendation number and the year of the guideline are given instead.", read: "full-text", accessed: "2026-11-17" },
    { key: "cochrane-kinnersley-2007", label: "Interventions before consultations for helping patients address their information needs", publisher: "Cochrane Database of Systematic Reviews (Kinnersley et al.)", year: 2007, url: "https://doi.org/10.1002/14651858.CD004565.pub2", doi: "10.1002/14651858.CD004565.pub2", gradingScheme: "Cochrane review with meta-analyses of five outcomes; no GRADE certainty ratings in the abstract.", read: "full-text", accessed: "2026-11-17" },
    { key: "cochrane-pitkethly-2008", label: "Recordings or summaries of consultations for people with cancer", publisher: "Cochrane Database of Systematic Reviews (Pitkethly et al.)", year: 2008, url: "https://doi.org/10.1002/14651858.CD001539.pub2", doi: "10.1002/14651858.CD001539.pub2", gradingScheme: "Cochrane review with a narrative synthesis; no GRADE certainty ratings in the abstract read.", read: "abstract", accessed: "2026-11-17" },
    { key: "han-2025", label: "Effectiveness of question prompt list interventions for patients with cancer: A systematic review and meta-analysis of randomized controlled trials", publisher: "Asia-Pacific Journal of Oncology Nursing (Han et al.)", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12391282/", doi: "10.1016/j.apjon.2025.100765", read: "full-text", accessed: "2026-11-17" },
    { key: "keinki-2021", label: "Effect of question prompt lists for cancer patients on communication and mental health outcomes: A systematic review", publisher: "Patient Education and Counseling (Keinki et al.)", year: 2021, url: "https://europepmc.org/abstract/MED/33593643", doi: "10.1016/j.pec.2021.01.012", read: "abstract", accessed: "2026-11-17" },
    { key: "brandes-2015", label: "The characteristics and effectiveness of Question Prompt List interventions in oncology: a systematic review of the literature", publisher: "Psycho-Oncology (Brandes et al.)", year: 2015, url: "https://europepmc.org/abstract/MED/25082386", doi: "10.1002/pon.3637", read: "abstract", accessed: "2026-11-17" },
    { key: "wang-2024", label: "Question prompt list intervention for patients with advanced cancer: a systematic review and meta-analysis", publisher: "Supportive Care in Cancer (Wang et al.)", year: 2024, url: "https://europepmc.org/abstract/MED/38492095", doi: "10.1007/s00520-024-08432-3", read: "abstract", accessed: "2026-11-17" },
    { key: "arthur-2023", label: "Helpfulness of Question Prompt Sheet for Patient-Physician Communication Among Patients With Advanced Cancer: A Randomized Clinical Trial", publisher: "JAMA Network Open (Arthur et al.)", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10155065/", doi: "10.1001/jamanetworkopen.2023.11189", read: "full-text", accessed: "2026-11-17" },
    { key: "rieger-2018", label: "Should consultation recording use be a practice standard? A systematic review of the effectiveness and implementation of consultation recordings", publisher: "Psycho-Oncology (Rieger et al.)", year: 2018, url: "https://europepmc.org/abstract/MED/29178602", doi: "10.1002/pon.4592", read: "abstract", accessed: "2026-11-17" },
    { key: "tsulukidze-2014", label: "Providing recording of clinical consultation to patients: a highly valued but underutilized intervention: a scoping review", publisher: "Patient Education and Counseling (Tsulukidze et al.)", year: 2014, url: "https://europepmc.org/abstract/MED/24630697", doi: "10.1016/j.pec.2014.02.007", read: "abstract", accessed: "2026-11-17" },
    { key: "hack-2021", label: "Impact of consultation recordings on patient-reported outcomes in patients with brain tumors: a parallel randomized controlled trial", publisher: "Supportive Care in Cancer (Hack et al.)", year: 2021, url: "https://europepmc.org/abstract/MED/33595717", doi: "10.1007/s00520-021-06038-7", read: "abstract", accessed: "2026-11-17" },
    { key: "licqurish-2019", label: "Tools to facilitate communication during physician-patient consultations in cancer care: An overview of systematic reviews", publisher: "CA: A Cancer Journal for Clinicians (Licqurish et al.)", year: 2019, url: "https://europepmc.org/abstract/MED/31339560", doi: "10.3322/caac.21573", read: "abstract", accessed: "2026-11-17" },
    { key: "bma-recording-2024", label: "Patients recording consultations (updated 21 August 2024)", publisher: "British Medical Association (a doctors' professional association and trade union)", year: 2024, url: "https://www.bma.org.uk/advice-and-support/ethics/confidentiality-and-health-records/patients-recording-consultations", gradingScheme: "Professional guidance for doctors, not graded.", read: "public-summary", accessed: "2026-11-17" },
    { key: "asco-comm-2017", label: "Patient-Clinician Communication: American Society of Clinical Oncology Consensus Guideline", publisher: "ASCO, Journal of Clinical Oncology (Gilligan et al.)", year: 2017, url: "https://europepmc.org/abstract/MED/28892432", doi: "10.1200/jco.2017.75.2311", gradingScheme: "Formal consensus recommendations; the abstract read prints no grades.", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-moon-question-prompt-lists", "idea-moon-recorded-consultations"],
  gaps: [
    "No cancer guideline that could be read recommends prompt lists or recordings in terms. The ASCO patient-clinician communication guideline (2017) was read as an abstract only, which does not say what it recommends on either; the publisher page refused a script again on 17 November 2026.",
    "NICE NG197 covers all healthcare, does not grade its recommendations, and mentions recording only for people who need extra help; it does not name question prompt lists.",
    "The Cochrane review of recordings and summaries dates from 2008 (searches to 2007), when recordings were audiotapes; no update was found in Crossref or Europe PMC on 17 November 2026, and it was read as an abstract only. The 2007 Cochrane review of interventions before consultations was read in full on that date.",
    "No review read reports an effect of either tool on quality of life, and the Cochrane review of recordings states that no study evaluated survival. The findings on anxiety conflict: one meta-analysis found slightly higher anxiety one week after a prompt list was used (SMD 0.17), the Cochrane review of recordings found no difference in anxiety or depression, and a 2018 systematic review of recordings reports support for a beneficial effect on both. Most of these reviews were read as abstracts only.",
    "How often prompt lists or recordings are offered in cancer clinics was not measured in any source read; a 2014 scoping review calls recordings underused in its title.",
    "No trial of recordings made on the patient's own phone was read, and no source read covers the law on recording outside the United Kingdom.",
    "Summaries drafted by ambient artificial intelligence from a recording are not covered by any trial read.",
    "The 2025 meta-analysis notes that prompt lists have mostly been used in developed countries, with three of its 14 trials in Asia and the rest in Europe and the Americas; one pilot trial in migrant patients was found by title and not read.",
  ],
  terms: ["informed-consent", "quality-of-life"],
  institutions: ["nice", "asco"],
  related: ["consent-and-education-before-anticancer-treatment", "distress-screening-and-referral", "survivorship-care-plan-and-treatment-summary", "idea-acc-embedded-decision-aids"],
  tags: ["protocol", "communication", "shared-decision-making"],
});
