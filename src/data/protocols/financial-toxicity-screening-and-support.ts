import { protocol } from "./helpers";

/*
 * Financial toxicity (the money cost of cancer to the patient and household): asking about it, the conversation about
 * costs, and referral to financial counselling, benefits advice and work support. Distress screening in general is
 * `distress-screening-and-referral` and the end-of-treatment plan is `survivorship-care-plan-and-treatment-summary`;
 * their steps are not repeated here.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - ESMO expert consensus statements on the screening and management of financial toxicity in patients with cancer
 *   (Carrera et al., ESMO Open 2024): full text, Europe PMC full-text XML (PMC11033153). No later ESMO statement on the
 *   subject was found in a Europe PMC title search on the day; the supplementary materials, which define the level of
 *   evidence scale and hold the longer discussions, were not read.
 * - NCI PDQ, Financial Toxicity and Cancer Treatment, health professional version (updated 29 May 2024): full text of
 *   the cancer.gov page (HTML). It is an evidence summary about the United States and says of itself that it makes no
 *   recommendations.
 * - de Souza et al., validation of the COST measure (Cancer 2017): full text, Europe PMC (PMC5298039). Its development
 *   paper (Cancer 2014): abstract only.
 * - ASCO guidance statement on the cost of cancer care (Meropol et al., J Clin Oncol 2009): abstract only. The ASCO
 *   patient-clinician communication consensus guideline (Gilligan et al., J Clin Oncol 2017): abstract only; the
 *   publisher page returned 403 to a script and PubMed Central holds no copy, so its recommendation on discussing the
 *   cost of care could not be read and no step rests on it.
 * - Trials and reviews of financial navigation: the CAFE randomised trial (Henrikson et al., JCO Oncol Pract 2025),
 *   abstract only (the PubMed Central copy returned an error); Rashidi et al., systematic review and meta-analysis
 *   (Cancer 2024), abstract only; Jing et al., cluster randomised trial in China (Breast 2026), full text
 *   (PMC13251641); Waters et al., single-arm study in North Carolina (Psychooncology 2026), abstract only (on 16 November
 *   the abstract text was cut off where it states the entry score; on 17 November it read in full).
 * - Publicly funded systems: Longo et al., systematic review (Support Care Cancer 2020), abstract only; Ngan et al.,
 *   scoping review of the United Kingdom (J Public Health 2023), full text (PMC10687873). The Macmillan figures given
 *   here are as reported in that review; the Macmillan reports themselves were not read (the address tried returned
 *   404).
 * - Macmillan Cancer Support, Benefits and financial support (reviewed 1 June 2025): public web page, raw HTML.
 * - Not reachable: NHS England's personalised care pages (england.nhs.uk answered 202 with an empty body to a script);
 *   the NCCN distress guideline (not reproduced; see the distress screening protocol). No MASCC guideline on financial
 *   toxicity was found in a Europe PMC title search, and no NICE guideline on the subject was found.
 *
 * Second accuracy pass, 17 November 2026: every source was fetched again as raw text (Europe PMC full-text XML for
 * the ESMO statements, the COST validation paper, the UK scoping review and the trial in China; the cancer.gov and
 * Macmillan pages as HTML with curl; the Europe PMC abstract records for the rest) and every quote was checked against
 * it by script. All quotes were verbatim. The NCI summary is still the 29 May 2024 update and no later ESMO, ASCO or
 * MASCC statement on financial toxicity was found in a Europe PMC title search. The abstract of Waters et al. now
 * reads in full, including its entry score. NHS England's page still answered 202 with an empty body and the address
 * tried for the 2013 Macmillan report still returned 404. Corrected: several reasons in `why` that no source read
 * states, ESMO's hedged two-stage screening written as an order, a work step ESMO addresses to governments and
 * employers, and two statements about what drives costs that went further than the sources.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed; where a source sentence ends in a reference number, the quote stops before it.
 */
export const financialToxicityScreeningAndSupport = protocol({
  id: "financial-toxicity-screening-and-support",
  name: "Financial toxicity: screening, the cost conversation and referral for money, benefits and work support",
  aka: ["financial toxicity screening", "financial hardship in cancer", "cost of cancer to patients", "cost of care conversation", "financial navigation", "financial counselling", "benefits advice", "welfare rights advice", "COST questionnaire", "money worries during cancer treatment"],
  domain: "supportive-care",
  tldr: "Cancer costs money in every health system: bills and insurance payments in some countries, and lost wages and travel costs even where treatment is free. Your team should ask about money early, because help exists and is often missed: a social worker, financial counsellor or benefits adviser can check what you can claim. Money trouble can lead people to skip medicines, so it is part of your care.",
  simple: "Cancer can make money tight. You may earn less and spend more on travel, food and bills. It is normal for your care team to ask about this. Tell them if you are worried. They can send you to someone who knows about benefits, grants and help with work.",
  summary: "ESMO's 2024 expert consensus (19 experts, 11 countries, 25 statements) is the only society statement found that covers screening and management across health systems. It asks for a preliminary assessment of financial impact at diagnosis or before treatment (LoE: V), suggests a sequential strategy of a single screening question followed by a longer validated questionnaire such as COST (11 scored items, 0 to 44, lower is worse), and calls it ethically and medically reasonable to offer financial counselling from a dedicated professional such as a social worker after a positive screen (LoE: III). ASCO's 2009 guidance statement recognised discussion of the cost of care as a component of high-quality care. Most of the evidence is weak: ESMO's practice statements are graded III to V.\n\nWhat the money problem is differs by system. In the United States it is led by out-of-pocket medical costs: the NCI summary reports cancer survivors 2.7 times more likely to file for bankruptcy, and that fewer than one third of patients have had a cost discussion. In publicly funded systems it is led by lost income and non-medical costs: a systematic review of 32 studies found lost income of 17.6 to 67.3 per cent and out-of-pocket costs of US$17 to US$506 a month, and a UK scoping review found no study using a validated measure. The response differs to match: financial navigation in the United States, benefits and welfare rights advice in the United Kingdom.\n\nWhether these services work is less clear than whether the problem exists. In the CAFE randomised trial (371 people newly diagnosed, two US health systems) proactive financial navigation did not improve financial hardship or quality of life at 12 months against enhanced usual care; a meta-analysis found no significant pooled change in COST score but an effect in people with the worst scores at entry. This page describes what guidelines and studies say; a person's own team, and the benefits rules of their own country, come first.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward", "community", "home"],
  },
  population: "Adults with any cancer, and their households and carers, from diagnosis through treatment, life after treatment and care at the end of life, in any health system. The ESMO statements were written to apply across systems; the trials of financial navigation are almost all from the United States and may not transfer. Children and their parents are not covered by the sources read, beyond UK figures quoted in one review. Benefit names and rules are national and change: this page is for understanding care, and the reader's own team, social worker or benefits adviser comes first.",
  trigger: "A new cancer diagnosis or the start of treatment, which is the point ESMO names. Later prompts, such as a missed appointment, an unfilled prescription, a change in work, or a concern raised by the patient or a carer, are common sense; no source read lists them.",
  steps: [
    {
      action: "Ask about the financial impact of the illness and its treatment on the person and their household at diagnosis or before treatment starts",
      why: "ESMO says financial toxicity may be more likely close to diagnosis, while people are having their first treatment, though it adds that the evidence is not consistent (LoE: III).",
      source: "esmo-2024",
      quote: "Health care providers should make a preliminary assessment of financial impact of disease and treatment on the patient and their household at diagnosis or before the start of treatment.",
      grade: "LoE: V",
    },
    {
      action: "Consider screening in two stages: a simple question first, then an in-depth assessment with a longer validated questionnaire for anyone who screens positive",
      why: "A simple question can prompt a closer look, and the fuller assessment shows which part of life is affected, so help can be tailored. ESMO calls this a reasonable approach that still needs validation.",
      source: "esmo-2024",
      quote: "If screening is positive, it should be followed by an in-depth assessment of financial distress faced by the patient to identify which domain is impacted and lead to appropriate, tailored intervention.",
      grade: "discussion of Statement 4 (LoE: V)",
    },
    {
      action: "Talk about the cost of care as part of the treatment discussion",
      why: "ASCO, writing about the United States, calls these discussions an important part of high-quality care. The NCI summary reports that about 60 per cent of people across studies had positive attitudes to talking about cost, while fewer than one third had had such a discussion.",
      source: "asco-2009",
      quote: "It also recommends that the following steps be taken to address immediate needs: recognition that patient-physician discussions regarding the cost of care are an important component of high-quality care; the design of educational and support tools for oncology providers to promote effective communication about costs with patients; and the development of resources to help educate patients about the high cost of cancer care to help guide their decision making regarding treatment options.",
      grade: "ASCO guidance statement, ungraded",
    },
    {
      action: "Ask whether cost has led to a skipped dose, an unfilled prescription or a missed appointment, without blame",
      why: "People under financial strain sometimes stretch or stop their medicines without saying so, and the team can only help if it knows.",
      practice: "No guideline read states this question as a step. It follows from the evidence the NCI summary reports: retrospective studies link financial distress to reduced adherence to planned therapies, and in one survey of 300 patients 27 per cent reported not taking medication as prescribed.",
    },
    {
      action: "Avoid tests and treatments that will not change the plan, and help the person find their way to the services they need",
      why: "ESMO gives the reason as reducing costs for patients and for whoever pays for the care.",
      source: "esmo-2024",
      quote: "Clinicians are advised to ‘choose wisely’ and avoid low-value diagnostics and therapeutics, to reduce costs for patients and/or payers: examinations that are not essential to the treatment plan should be discouraged.",
      grade: "LoE: V",
    },
    {
      action: "Offer anyone who screens positive financial counselling from a dedicated professional, such as a social worker, who knows the local social security system",
      why: "Entitlements differ by country, so ESMO asks for someone who knows the local system thoroughly. It says counselling might produce benefit, which is a cautious claim.",
      source: "esmo-2024",
      quote: "Counselling should be given by a dedicated professional (like a social worker) who can assess the patient’s economic situation, knows thoroughly the social security system of the jurisdiction and is aware of modalities to help the patient in his/her economic situation.",
      grade: "LoE: III",
    },
    {
      action: "Check benefit and welfare entitlements, help with the applications, and point to charities that give grants or advice",
      why: "ESMO says benefits are often not used in full because people do not know what they are entitled to or because applying is difficult and slow. It writes this in its discussion of care near the end of life, about the whole course of the illness.",
      source: "esmo-2024",
      quote: "In many instances, social welfare benefits are not optimized because of lack of knowledge regarding available entitlements, or difficulties and delays in application.",
      grade: "discussion of Statement 10 (LoE: III)",
    },
    {
      action: "Ask about work, and point the person to paid leave, flexible hours and adjustments at work where these exist",
      why: "ESMO says that most studies suggest it is difficult for income to return to what it was before diagnosis. Its statement on return-to-work plans and adjustments at work is addressed to governments and employers; no source read sets out what the clinic should do.",
      source: "esmo-2024",
      quote: "Patient access to paid leave can help decrease financial hardship, thereby leading to improved health, better QoL and reduced stress.",
      grade: "discussion of Statement 13A (LoE: III)",
    },
    {
      action: "In advanced cancer and at the end of life, assess financial distress in every case and include the family",
      why: "Costs rise near the end of life, and relatives who are caring often lose income at the same time.",
      source: "esmo-2024",
      quote: "Because of the high prevalence of financial distress among patients with far advanced cancer, in addition to present physical and psychological distress, it needs to be assessed in all cases.",
      grade: "LoE: III",
    },
    {
      action: "After treatment, ask again at intervals set by the person's risk, since money problems can last into survivorship",
      why: "Earnings often do not return to what they were, and late effects of treatment bring new costs.",
      source: "esmo-2024",
      quote: "A risk-based approach necessitates tailored assessments, with frequency determined by factors such as the cancer stage, the risk of cancer recurrence and the potential for late complications, including secondary cancers.",
      grade: "LoE: III",
    },
  ],
  bestInClass: {
    statement: "The best-supported version is ESMO's 2024 expert consensus, the only society statement read that covers screening and management in more than one health system: assess financial impact at diagnosis or before treatment (LoE: V); as an approach it says still needs validation, use a simple question first and a longer validated questionnaire such as COST second; offer counselling from a dedicated professional who knows the local social security system (LoE: III); check benefit entitlements; assess every patient with far advanced cancer (LoE: III); and reassess after treatment by risk (LoE: III). ASCO's 2009 guidance statement adds that discussing the cost of care is part of high-quality care. The grades are low because the evidence is thin: no statement on practice is graded above III. The sources differ on the service to refer to. US practice has built financial navigation, and ESMO says that navigation \"is most relevant to the United States setting\"; the largest randomised trial of it read (CAFE, 371 participants) found no benefit over a list of resources, while a meta-analysis found benefit only in people with the worst scores. ESMO's own recommendation is counselling by a social worker and help with welfare entitlements, which is closer to UK benefits advice; no randomised trial of that model was found.",
    sources: ["esmo-2024", "asco-2009", "cost-2017", "nci-pdq-2024", "cafe-2025", "rashidi-2024"],
  },
  variants: [
    {
      name: "United States: out-of-pocket costs and financial navigation",
      differs: "The problem is led by medical bills: premiums, deductibles, copayments and coinsurance, with high coinsurance for many oral cancer medicines. The response is a financial navigator or counsellor who works on insurance, assistance programmes and bills, alongside the cost conversation.",
      evidence: "The NCI summary (updated May 2024) reports that 1.7 per cent of cancer survivors filed for bankruptcy within 5 years of diagnosis, 2.7 times the rate of people without cancer; that about 60 per cent of people across studies had positive attitudes to cost discussions while fewer than one third had had one; and it states of the proposed interventions: \"to date, there have been no prospective studies evaluating the impact of these interventions on the rates and severity of financial distress, care choices, quality of life, or survival\". Since then the CAFE trial (371 people newly diagnosed, two integrated health systems) found financial hardship and quality of life at 12 months similar with brief or extended navigation and with enhanced usual care, in which every arm received a list of resources. A meta-analysis of four navigation studies (373 participants) found no significant pooled change in COST score (1.21; 95 per cent confidence interval, minus 6.54 to 8.96) but a significant change where the score before the intervention was 14.5 or lower. A single-arm study of 86 survivors in North Carolina, recruited with a COST score below 23, reported improved anxiety, depression and global mental health after navigation, with no comparison group.",
      sources: ["nci-pdq-2024", "cafe-2025", "rashidi-2024", "waters-2026"],
    },
    {
      name: "United Kingdom: lost income, extra living costs and benefits advice",
      differs: "The UK scoping review gives two main reasons for hardship: lost income, and extra non-medical costs such as special diet, heating, travel and car parking. The response is benefits and welfare rights advice, often from a charity: Macmillan's page tells people to call its money advisers and lists Universal Credit, sick pay, Personal Independence Payment, help with rent, the Healthcare Travel Costs Scheme and carers' benefits.",
      evidence: "A scoping review of 29 UK studies and reports (searched July 2022) found that most reported severe financial problems after diagnosis, with loss of income and extra spending as the main reasons, and that only two quantified them: a 2013 Macmillan report put households on average £570 a month worse off. The review states that \"The validated questionnaire to investigate FT, COST, has not been used in any UK studies.\" It includes qualitative evaluations of a welfare rights advice service for people with cancer in County Durham, in which successful claims offset extra costs and reduced stress and anxiety about money; no UK randomised trial of benefits advice in cancer was found. The holistic needs assessment used in England is described in the distress screening protocol.",
      sources: ["ngan-2023", "macmillan-money"],
    },
    {
      name: "Other publicly funded systems",
      differs: "Cancer care is largely free at the point of service, medicines for self-administration may carry a copayment with or without a cap, and sick pay and unemployment payments replace part of lost income. ESMO notes that some new medicines lack public funding and that travel and accommodation costs remain.",
      evidence: "A systematic review of 32 studies in countries with publicly funded care (Canada, Australia, Ireland, the UK, Germany, Denmark, Malaysia, Finland, France, South Korea and the Netherlands) found out-of-pocket costs of US$17 to US$506 a month, lost income of 17.6 to 67.3 per cent, and financial burden, distress or toxicity in 22 to 27 per cent, and concluded: \"Despite government-funded universal public healthcare, financial toxicity is an issue for cancer patients and their families.\" ESMO's statement 3B (LoE: IV) says direct payments are probably modest under universal coverage but that non-medical and indirect costs remain.",
      sources: ["longo-2020", "esmo-2024"],
    },
    {
      name: "Financial navigation outside the United States (China)",
      differs: "A structured financial navigation programme for people with breast cancer in hospital, given in two core sessions with an optional third, with outcomes measured one and three months after discharge.",
      evidence: "A cluster randomised trial of 82 participants (41 per group) found an effect on subjective financial toxicity and on cost-related health literacy, and reported that \"no significant effects were found on material and behavioral domains of FT\". It is small, from one country, and its authors call the evidence preliminary.",
      sources: ["jing-2026"],
    },
    {
      name: "Choice of screening instrument",
      differs: "A single item from a general quality of life questionnaire (item 28 of the EORTC QLQ-C30, or the financial item of the Edmonton Symptom Assessment System Total Care), or a dedicated measure: COST (United States, 12 items of which 11 are scored, 0 to 44, lower scores meaning more financial toxicity) or PROFFIT (Italy, 16 items).",
      evidence: "COST was developed with 155 patients with advanced cancer and validated in 233 patients with stage IV solid tumours on chemotherapy in the United States, all insured; it showed internal consistency (Cronbach alpha 0.92) and correlated with quality of life. ESMO describes the two-stage approach as one \"which requires further validation\". No cut-off score for referral is set by any guideline read.",
      sources: ["esmo-2024", "cost-2017", "cost-2014"],
    },
  ],
  grades: [
    { claim: "Preliminary assessment of financial impact at diagnosis or before the start of treatment", grade: "LoE: V", source: "esmo-2024" },
    { claim: "Offer financial counselling after screening to a patient with any form of financial toxicity", grade: "LoE: III", source: "esmo-2024", quote: "Thus, it is both ethically and medically reasonable to offer financial counselling to a patient suffering from any form of financial toxicity following screening for financial toxicity." },
    { claim: "Avoid low-value diagnostics and therapeutics, and offer navigation into services", grade: "LoE: V", source: "esmo-2024", quote: "Navigation into services should be offered by relevant health care professionals." },
    { claim: "In far advanced cancer, manage identified financial distress with counselling and help with welfare entitlements", grade: "LoE: III", source: "esmo-2024", quote: "When financial distress is identified, management approaches should include financial counselling, assistance with social welfare entitlements and mobilization of other strategies to cope with distress." },
    { claim: "Include carers in survivorship care, with support for financial issues", grade: "LoE: III", source: "esmo-2024", quote: "Institutions need to include caregivers as important stakeholder in the survivorship care delivery model, ensuring optimal psychosocial support, including for financial issues, can help decrease the familial financial burden." },
    { claim: "Under universal coverage direct payments are probably modest, but non-medical and indirect costs remain", grade: "LoE: IV", source: "esmo-2024", quote: "Patients with cancer in publicly funded health systems may still face direct non-medical costs as well as indirect costs, some of which may be mitigated by coverage of benefits due to sickness, therapy and unemployment payment." },
    { claim: "The COST measure is reliable and valid for measuring financial toxicity (233 US patients with advanced cancer)", grade: "validation study, n = 233", source: "cost-2017", quote: "The COST measure demonstrated reliability and validity in measuring financial toxicity." },
    { claim: "Proactive financial navigation did not improve financial hardship or quality of life at 12 months against enhanced usual care", grade: "randomised trial, n = 371 (283 at 12 months)", source: "cafe-2025", quote: "Financial navigation was not associated with improved financial hardship or cancer-related quality of life in patients newly diagnosed with cancer compared with enhanced usual care." },
    { claim: "Across 11 intervention studies financial worry improved in a minority; navigation helped people at highest risk", grade: "systematic review and meta-analysis, 11 studies, 2211 participants", source: "rashidi-2024", quote: "Financial worry improved in only 27.3% of 11 studies." },
    { claim: "Financial distress is linked to reduced adherence, lower quality of life and shorter survival in retrospective studies", grade: "evidence summary, not graded", source: "nci-pdq-2024", quote: "Evidence from multiple retrospective studies shows that patients experiencing financial distress have reduced adherence to planned therapies, lower quality of life, and diminished survival." },
  ],
  sources: [
    { key: "esmo-2024", label: "ESMO expert consensus statements on the screening and management of financial toxicity in patients with cancer", publisher: "ESMO (ESMO Open; Carrera et al.)", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11033153/", doi: "10.1016/j.esmoop.2024.102992", gradingScheme: "A level of evidence (LoE) from I to V is printed beside each statement; statements were agreed by a Delphi panel of 19 experts. The scale is defined in the supplementary materials, which were not read. No strength of recommendation is given.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2009", label: "American Society of Clinical Oncology guidance statement: the cost of cancer care", publisher: "ASCO, Journal of Clinical Oncology (Meropol et al.)", year: 2009, url: "https://europepmc.org/abstract/MED/19581533", doi: "10.1200/jco.2009.23.1183", gradingScheme: "Guidance statement of an ASCO task force, not graded.", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-comm-2017", label: "Patient-Clinician Communication: American Society of Clinical Oncology Consensus Guideline", publisher: "ASCO, Journal of Clinical Oncology (Gilligan et al.)", year: 2017, url: "https://europepmc.org/abstract/MED/28892432", doi: "10.1200/jco.2017.75.2311", gradingScheme: "Formal consensus recommendations; the abstract read prints no grades and does not state the recommendation on cost of care.", read: "abstract", accessed: "2026-11-17" },
    { key: "nci-pdq-2024", label: "Financial Toxicity and Cancer Treatment (PDQ), health professional version, updated 29 May 2024", publisher: "National Cancer Institute", year: 2024, url: "https://www.cancer.gov/about-cancer/managing-care/track-care-costs/financial-toxicity-hp-pdq", gradingScheme: "Evidence summary; it states that it does not provide formal guidelines or recommendations.", read: "full-text", accessed: "2026-11-17" },
    { key: "cost-2017", label: "Measuring financial toxicity as a clinically relevant patient-reported outcome: The validation of the COmprehensive Score for financial Toxicity (COST)", publisher: "Cancer (de Souza et al.)", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5298039/", doi: "10.1002/cncr.30369", read: "full-text", accessed: "2026-11-17" },
    { key: "cost-2014", label: "The development of a financial toxicity patient-reported outcome in cancer: The COST measure", publisher: "Cancer (de Souza et al.)", year: 2014, url: "https://europepmc.org/abstract/MED/24954526", doi: "10.1002/cncr.28814", read: "abstract", accessed: "2026-11-17" },
    { key: "cafe-2025", label: "Financial Navigation for People Newly Diagnosed With Cancer: Primary Outcomes From the Cancer Financial Experience Randomized Trial", publisher: "JCO Oncology Practice (Henrikson et al.)", year: 2025, url: "https://europepmc.org/abstract/MED/41070850", doi: "10.1200/op-25-00874", read: "abstract", accessed: "2026-11-17" },
    { key: "rashidi-2024", label: "Interventions to mitigate cancer-related medical financial hardship: A systematic review and meta-analysis", publisher: "Cancer (Rashidi et al.)", year: 2024, url: "https://europepmc.org/abstract/MED/38758809", doi: "10.1002/cncr.35367", read: "abstract", accessed: "2026-11-17" },
    { key: "jing-2026", label: "The effects of a financial navigation intervention on financial toxicity among patients with breast cancer in China: A randomized controlled trial", publisher: "The Breast (Jing et al.)", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13251641/", doi: "10.1016/j.breast.2026.104824", read: "full-text", accessed: "2026-11-17" },
    { key: "waters-2026", label: "Improvements in Health-Related Quality of Life After Financial Navigation Among Cancer Survivors", publisher: "Psycho-Oncology (Waters et al.)", year: 2026, url: "https://europepmc.org/abstract/MED/42770487", doi: "10.1002/pon.70605", read: "abstract", accessed: "2026-11-17" },
    { key: "longo-2020", label: "Financial toxicity associated with a cancer diagnosis in publicly funded healthcare countries: a systematic review", publisher: "Supportive Care in Cancer (Longo et al.)", year: 2020, url: "https://europepmc.org/abstract/MED/32653957", doi: "10.1007/s00520-020-05620-9", read: "abstract", accessed: "2026-11-17" },
    { key: "ngan-2023", label: "Financial toxicity among cancer patients, survivors and their families in the United Kingdom: a scoping review", publisher: "Journal of Public Health (Ngan et al.)", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10687873/", doi: "10.1093/pubmed/fdad143", read: "full-text", accessed: "2026-11-17" },
    { key: "macmillan-money", label: "Benefits and financial support (reviewed 1 June 2025)", publisher: "Macmillan Cancer Support", year: 2025, url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/benefits-and-financial-support", gradingScheme: "Patient information, not graded.", read: "public-summary", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-acc-financial-toxicity-screening-at-diagnosis", "idea-upgrade-financial-navigation-targeted-by-screening-score"],
  gaps: [
    "No guideline read sets a questionnaire, a cut-off score or a screening interval, and none lists the later prompts for asking again or states what the clinic should do about work: ESMO's statement on work is addressed to governments and employers. ESMO calls its two-stage approach one that requires further validation, and says whether assessment should continue over time needs research.",
    "ESMO's practice statements are graded LoE III to V. The scale is defined in the supplementary materials, which were not read, so the grades are quoted as printed without their definitions.",
    "The ASCO patient-clinician communication guideline (2017) was read as an abstract only, which does not state its recommendation on discussing the cost of care; the publisher page refused a script. The ASCO 2009 guidance statement was also read as an abstract only.",
    "Trial evidence for financial navigation is mixed and almost all from the United States: the largest randomised trial read (CAFE) found no benefit, and the positive findings come from a meta-analysis subgroup, a small trial in China and a single-arm study. The CAFE trial, the meta-analysis and the single-arm study were read as abstracts. Results of the SWOG S1912CD (CREDIT) randomised trial were not found.",
    "No randomised trial of benefits or welfare rights advice for people with cancer in the United Kingdom was found, and the UK scoping review found no study that used a validated measure of financial toxicity.",
    "The Macmillan figures (households £570 a month worse off, 2013) are quoted from the scoping review, not from the Macmillan reports, which could not be fetched, and they are more than ten years old. On 17 November 2026 the one address tried for the 2013 report again returned 404.",
    "NHS England's personalised care pages, which describe the holistic needs assessment, could not be read by a script; on 17 November 2026 the site again answered 202 with an empty body. No NICE guideline and no MASCC guideline on financial toxicity was found.",
    "Benefit names, amounts and eligibility rules are national and change often; none are stated here beyond the names on the Macmillan page read on the access date.",
  ],
  technologies: ["financial-navigation"],
  terms: ["financial-toxicity", "patient-navigation", "quality-of-life"],
  institutions: ["esmo", "asco", "macmillan-cancer-support"],
  sections: ["supportive-care"],
  related: ["distress-screening-and-referral", "survivorship-care-plan-and-treatment-summary", "consent-and-education-before-anticancer-treatment", "macmillan-support-line", "idea-acc-return-to-work-rehabilitation", "rejuv-life-return-to-work", "rejuv-life-employment-rights-uk", "rejuv-life-employment-rights-us"],
  tags: ["protocol", "supportive-care", "financial-toxicity", "psychosocial"],
});
