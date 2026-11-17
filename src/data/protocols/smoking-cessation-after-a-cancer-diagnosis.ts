import { protocol } from "./helpers";

/*
 * Stopping smoking, offered at a cancer diagnosis and through treatment: asking, advising, treating with behavioural
 * support and medicines, and referral that does not wait for the person to ask.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again raw with curl and read as text; every quote
 * was checked by script against that text (whitespace normalised, tags stripped, nothing else).
 * - NICE NG209, Tobacco: preventing uptake, promoting quitting and treating dependence (published 30 November 2021,
 *   last updated 4 February 2025, confirmed on the guideline's own page and its update information): the chapter
 *   "Treating tobacco dependence", HTML, full text. Each recommendation carries its year tag.
 * - NICE NG122, Lung cancer: diagnosis and management (published 28 March 2019, last updated 8 March 2024): the
 *   chapter "Management", section 1.3, HTML, full text.
 * - IASLC Position Statement on Tobacco Cessation After a Cancer Diagnosis (press release of 1 November 2022 carrying
 *   the statement): full text, HTML from iaslc.org. Ungraded.
 * - NCCN Guidelines for Smoking Cessation, version 3.2022 (J Natl Compr Canc Netw 2023): abstract only (Europe PMC).
 *   nccn.org lists version 2.2026 as current; it sits behind an NCCN login and was not read.
 * - AACR policy statement (Toll et al., Clin Cancer Res 2013): full text this time, PMC5992896 through the NCBI
 *   E-utilities API (the first pass had the abstract only).
 * - Wakeman 2026 (opt-out programme in one cancer centre): full text this time, PMC13475730 (Europe PMC).
 * - Cinciripini et al., JAMA Oncol 2024 (cohort of 4526 patients): full text, PMC11528342.
 * - Krech et al., ESMO Open 2023 (WHO and ESMO authors, a perspective, not a guideline): full text, PMC10229195.
 * - Abstracts only (Europe PMC): Park 2020 and Richter 2023 (both have PubMed Central records whose publisher does
 *   not allow the full text as XML, and the PubMed Central page answered with a browser check), Scholten 2024,
 *   Caini 2022, Sheikh 2021.
 * - Not readable: the US Surgeon General's report Smoking Cessation (2020): hhs.gov and cdc.gov both returned 403.
 *   The ASCO policy statement update (Hanna et al., J Clin Oncol 2013) has no abstract indexed and was not read. No
 *   step rests on either.
 *
 * What the second pass changed: reasons in `why` that no source stated were reworded to what the cited source says;
 * NICE's "if the person agrees" was restored to the behavioural support step; the timing NICE prints for each
 * medicine was added; a general statement that stopping is never a condition of treatment was narrowed to what NICE
 * says about lung cancer surgery; a session count no source prints was removed.
 *
 * No source read gives doses or course lengths for the stop-smoking medicines and the page gives none.
 *
 * The stop-smoking medicines (nicotine replacement, varenicline, bupropion, cytisinicline) have no drug records in the
 * corpus and are not anticancer drugs, so `drugs` is left empty. No cancers are listed: the sources apply to anyone
 * with cancer who smokes; the NICE lung cancer recommendations are shown with their scope.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed.
 */
export const smokingCessationAfterACancerDiagnosis = protocol({
  id: "smoking-cessation-after-a-cancer-diagnosis",
  name: "Smoking cessation at cancer diagnosis and during treatment: ask, advise, treat and refer",
  aka: ["stop smoking support in cancer care", "tobacco treatment in oncology", "tobacco cessation after cancer diagnosis", "quit smoking before cancer surgery", "opt-out stop-smoking referral", "very brief advice", "tobacco dependence treatment"],
  domain: "supportive-care",
  tldr: "If you smoke when cancer is found, your team should ask about it, explain why stopping helps, and offer treatment at once: support from an adviser with a stop-smoking medicine or nicotine replacement. Studies link stopping to longer survival, and in one US trial longer support with free medicine helped about one in three quit. NICE says lung cancer surgery should not wait for someone to stop.",
  simple: "It is never too late to stop smoking, even after a cancer diagnosis. Your team should ask if you smoke, offer you help from a stop-smoking adviser, and offer a medicine or nicotine patches and gum. UK guidance from NICE says an operation for lung cancer should not be put off to give someone time to stop.",
  summary: "NICE NG209 (updated February 2025) gives the general pathway: ask at every opportunity, advise sensitively, offer and (if the person agrees) arrange behavioural support during the visit, prescribe or provide bupropion, cytisinicline, NRT or varenicline to adults before they stop, provide accepted pharmacotherapy immediately, and offer weekly sessions for at least four weeks. It tells people that cytisinicline, combination NRT, varenicline and nicotine-containing e-cigarettes, with behavioural support, are the options more likely to succeed. NICE NG122 adds for lung cancer: advise stopping as soon as the diagnosis is suspected, and do not postpone surgery to allow it. The IASLC position statement (2022) asks that all cancer patients are screened and have access to counselling, pharmacotherapy and follow-up inside multidisciplinary cancer care; NCCN (abstract) sets the same three elements, done concurrently, with retreatment as needed. In a randomised trial in 303 people recently diagnosed with cancer at two United States cancer centres (Park 2020), sustained counselling with free medication gave biochemically confirmed quit rates of 34.5% against 21.5% at six months. Survival evidence is observational: a meta-analysis of 21 lung cancer studies (summary relative risk 0.71) and a cohort of 4526 patients in which benefit was largest when treatment began within six months of diagnosis. The guidelines differ on referral by default: NICE arranges support if the person agrees, while opt-out programmes treat unless the person declines; and NICE names e-cigarettes among the more effective options, which the IASLC statement and the NCCN abstract do not mention. NICE's medicine list reflects United Kingdom licensing; the sources read give no doses or course lengths, which are in each product's own information. The reader's own team's advice comes first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit", "radiotherapy-department", "community", "home"],
  },
  population: "Adults with a suspected or confirmed cancer of any type who smoke tobacco or have recently stopped, from first referral through treatment and follow-up. NICE NG209 is written for people using any health service and is not specific to cancer; NICE NG122 covers lung cancer; the IASLC and NCCN recommendations cover all patients with cancer. NICE states that cytisinicline, varenicline and bupropion are not for people under 18 and that cytisinicline is not offered at 66 and over; pregnancy has its own recommendations. The choice of medicine alongside cancer treatment belongs to the person's own team and pharmacist, whose advice comes first.",
  trigger: "Cancer is suspected or diagnosed in a person who smokes, or a person having cancer treatment is found to be smoking or to have recently stopped.",
  steps: [
    {
      action: "Ask every person whether they smoke or have recently stopped, at every opportunity",
      why: "Treatment cannot be offered to someone whose smoking nobody has asked about, and people who stopped recently may need help to stay stopped.",
      source: "nice-ng209",
      quote: "At every opportunity, ask people if they smoke or have recently stopped smoking.",
      grade: "[2018]",
    },
    {
      action: "Tell every person with cancer who uses tobacco what continuing does and what stopping gains",
      why: "The IASLC says the harms of continuing to smoke after a cancer diagnosis are under-appreciated. It cites US Surgeon General reports that link continued smoking to more toxicity from cancer treatment and higher mortality, and stopping after diagnosis to improved survival.",
      source: "iaslc-2022",
      quote: "All cancer patients should be screened for tobacco use and advised on the harms of tobacco use and the benefits of tobacco cessation.",
      grade: "Position statement (not graded)",
    },
    {
      action: "Advise stopping in a way that respects the person's preferences, and explain how support helps",
      why: "NICE asks for advice that is sensitive to the person's preferences and needs, given together with an explanation of how stop-smoking support can help.",
      source: "nice-ng209",
      quote: "If they smoke, advise them to stop smoking in a way that is sensitive to their preferences and needs, and advise them that stopping smoking in one go is the best approach. Explain how stop-smoking support can help.",
      grade: "[2018]",
    },
    {
      action: "Offer behavioural support and, if the person agrees, arrange it during the same outpatient visit or hospital stay",
      why: "NICE asks for support to be arranged while the person is still at the clinic or on the ward, and for immediate support at the outpatient site.",
      source: "nice-ng209",
      quote: "Offer and, if the person agrees, arrange for them to receive behavioural support to stop smoking during either their current outpatient visit or their inpatient stay.",
      grade: "[2013]",
    },
    {
      action: "Offer adults a stop-smoking medicine or nicotine replacement, prescribed or provided before they stop smoking",
      why: "NICE sets the timing for each: with bupropion a quit date within the first 2 weeks of treatment, with cytisinicline within the first 5 days, varenicline started 1 to 2 weeks before the quit date, and nicotine replacement ready to start the day before it. This is NICE's list for adults, written to United Kingdom licensing; the person's own team and pharmacist choose the medicine.",
      source: "nice-ng209",
      quote: "For adults, prescribe or provide bupropion, cytisinicline, NRT or varenicline before they stop smoking, and for:",
      grade: "[2018], cytisinicline [2025]",
    },
    {
      action: "Explain which options are more likely to work when combined with behavioural support: cytisinicline, long-acting with short-acting nicotine replacement, varenicline, or a nicotine-containing e-cigarette",
      why: "NICE asks advisers to say which options are more likely to work and which are less likely. It lists bupropion, and short-acting or long-acting nicotine replacement used without the other, as less likely to succeed.",
      source: "nice-ng209",
      quote: "Advise people (as appropriate for their age) that the following options, when combined with behavioural support, are more likely to result in them successfully stopping smoking:",
      grade: "[2021], cytisinicline [2025]",
    },
    {
      action: "Supply the medicine straight away once the person accepts it",
      why: "NICE asks acute and mental health services to provide the medicine immediately once it is accepted, and to send people home from hospital with enough to last at least 1 week or until their next contact with stop-smoking support.",
      source: "nice-ng209",
      quote: "If stop-smoking pharmacotherapy is accepted, make sure it is provided immediately.",
      grade: "[2013]",
    },
    {
      action: "Make counselling, medicine and follow-up part of cancer care itself, for patients and their family members",
      why: "The IASLC reports surveys in which 80 to 90% of oncology providers agreed that stopping smoking should be a standard part of cancer care but fewer than half regularly gave help, and says most patients do not receive evidence-based support as a result.",
      source: "iaslc-2022",
      quote: "All patients should have access to evidence-based tobacco cessation assistance consisting of counseling, pharmacotherapy, and follow-up, and access should be routinely incorporated into multidisciplinary cancer care for all cancer patients and their family members.",
      grade: "Position statement (not graded)",
    },
    {
      action: "Encourage people referred for surgery to stop before the operation, and refer them for support",
      why: "NICE says stopping at any time before surgery has no ill effects and that people who stop in the 8 weeks before surgery can benefit significantly. For lung cancer surgery it asks teams to say that smoking raises the risk of lung complications afterwards.",
      source: "nice-ng209",
      quote: "Encourage people being referred for elective surgery to stop smoking before their surgery. Refer them to local stop-smoking support.",
      grade: "[2018]",
    },
    {
      action: "Do not delay lung cancer surgery to give a person time to stop smoking",
      why: "NICE's lung cancer guideline asks for both together: advice to stop as soon as lung cancer is suspected, and surgery that is not postponed while the person tries.",
      source: "nice-ng122",
      quote: "Do not postpone surgery for lung cancer to allow people to stop smoking.",
      grade: "[2011]",
    },
    {
      action: "Offer weekly support sessions for at least four weeks after the date the person stopped smoking, or after discharge from hospital",
      why: "NICE sets this for outpatients from the date they stopped and for inpatients from discharge, preferably face to face, with a referral to local stop-smoking support if the person prefers or the hospital cannot provide it.",
      source: "nice-ng209",
      quote: "Offer weekly sessions, preferably face to face, for at least 4 weeks after the date they stopped smoking.",
      grade: "[2013]",
    },
    {
      action: "Check other prescribed medicines when someone stops, because the dose of some needs to change",
      why: "NICE names clozapine, olanzapine, theophylline and warfarin among the medicines affected by smoking or stopping, asks for the dosage to be adjusted as appropriate, and says it might be possible to reduce the dose of some prescribed medicines when a person stops.",
      source: "nice-ng209",
      quote: "Monitor people's use of prescribed medicines that are affected by smoking (or stopping smoking) for efficacy and adverse effects.",
      grade: "[2013, amended 2021]",
    },
    {
      action: "Record smoking status and what was offered, ask again at the next opportunity, and encourage another attempt if the person is smoking again",
      why: "The IASLC notes that many patients who smoke at diagnosis continue or relapse during cancer treatment. NICE asks advisers to encourage people who have not met their goal to try again and to discuss which option to use next; the NCCN panel asks for close follow-up with retreatment as needed.",
      source: "nice-ng209",
      quote: "Record smoking status and all actions, discussions and decisions related to advice, referrals or interventions about stopping smoking.",
      grade: "[2018]",
    },
  ],
  bestInClass: {
    statement: "Ask everyone, advise in a way sensitive to the person, and treat at once with behavioural support combined with a medicine or nicotine replacement, inside the cancer service, with follow-up and treatment again after relapse. NICE NG209 (updated 2025) supplies the detail and the IASLC statement (2022) and the NCCN guideline (version 3.2022, read as its abstract) set the same three elements for all patients with cancer: counselling, pharmacotherapy and follow-up. The trial evidence in cancer patients supports the combination: in a meta-analysis (Scholten 2024) combined interventions raised quitting (odds ratio 1.67) while medicine alone did not (odds ratio 1.11), on evidence the authors rate very low quality, and in a randomised trial of 303 people (Park 2020) sustained counselling with free medication gave 34.5% against 21.5% confirmed abstinence at six months. Two differences between sources are shown rather than resolved. Referral: NICE arranges support if the person agrees and refers \"if appropriate\"; opt-out programmes, studied in one cancer centre programme and in one randomised trial in a general hospital, offer treatment to everyone who smokes by default and let them decline. E-cigarettes: NICE names nicotine-containing e-cigarettes among the options more likely to succeed and says long-term harms are not known; the IASLC statement and the NCCN abstract speak only of counselling and pharmacotherapy.",
    sources: ["nice-ng209", "nice-ng122", "iaslc-2022", "nccn-2022", "park-2020", "scholten-2024"],
  },
  variants: [
    {
      name: "Opt-out referral: treatment unless the person declines",
      differs: "Everyone recorded as smoking is contacted or offered treatment by default, without first having to say they are willing to quit, and may decline any part of it. NICE instead words its referral as \"Offer and, if the person agrees, arrange for them to receive behavioural support\".",
      evidence: "A randomised trial of 1000 adult patients at one United States hospital (Richter 2023, not a cancer population): verified quit rates with opt-out against opt-in care were 22% against 16% at one month and 19% against 18% at six months; use of medication after discharge was 60% against 34%. In one United States cancer centre programme with no comparison group (Wakeman 2026), 3706 patients who smoked were contacted by default, 1089 chose a treatment, 873 were referred or connected to support, and among those who completed follow-up at 180 days 16.2% (53 of 327) reported abstinence. A proposal to test opt-out referral at diagnosis is linked under upgrades.",
      sources: ["richter-2023", "wakeman-2026", "nice-ng209"],
    },
    {
      name: "Nicotine-containing e-cigarettes as a stop-smoking aid",
      differs: "NICE includes nicotine-containing e-cigarettes among the options to be accessible to adults who smoke and among those more likely to succeed with behavioural support. The IASLC statement and the NCCN abstract describe counselling and pharmacotherapy and do not mention e-cigarettes.",
      evidence: "NICE asks advisers to explain that \"there is not enough evidence to know whether there are long-term harms from e-cigarette use\" and that \"use of e-cigarettes is likely to be substantially less harmful than smoking\". NICE also notes that at its February 2025 update no nicotine-containing e-cigarette was licensed as a medicine by the MHRA and commercially available in the UK, and that those not licensed as medicines cannot be marketed by the manufacturer for stopping smoking. This is the United Kingdom position; no source read states the position in other countries. No trial of e-cigarettes in people having cancer treatment was read.",
      sources: ["nice-ng209", "iaslc-2022", "nccn-2022"],
    },
    {
      name: "Sustained counselling with free medication, against brief counselling and advice",
      differs: "Four weekly telephone counselling sessions followed by four fortnightly and three monthly ones, with a free choice of nicotine replacement, bupropion or varenicline (the medicines approved by the US Food and Drug Administration that the trial offered), rather than four weekly telephone sessions and advice about medication.",
      evidence: "Park 2020, a randomised trial at two United States cancer centres in 303 people recently diagnosed with one of eight cancers: biochemically confirmed abstinence at six months was 34.5% against 21.5% (odds ratio 1.92, 95% CI 1.13 to 3.27). The authors state that the generalisability of the findings is uncertain.",
      sources: ["park-2020"],
    },
    {
      name: "Cutting down first, for people not ready to stop in one go",
      differs: "NICE advises that stopping in one go is the best approach, and for people who do not want to or are not ready, offers a harm-reduction route using licensed nicotine products with a quit date normally within 6 weeks of starting behavioural support where the person is cutting down to stop.",
      evidence: "NICE NG209 section 1.15 ([2013]; the box of approaches is [2013, amended 2021]). It also asks advisers to tell people who are not prepared to stop that the health benefits of only reducing are unclear. None of the cancer-specific sources read addresses cutting down.",
      sources: ["nice-ng209"],
    },
  ],
  grades: [
    { claim: "Advise people to stop as soon as lung cancer is suspected, and say why", grade: "[2011]", source: "nice-ng122", quote: "Advise people to stop smoking as soon as the diagnosis of lung cancer is suspected and tell them why this is important." },
    { claim: "Tell people that smoking raises the risk of lung complications after lung cancer surgery", grade: "[2011]", source: "nice-ng122", quote: "Inform people that smoking increases the risk of pulmonary complications after lung cancer surgery." },
    { claim: "Behavioural support offered whichever stop-smoking option the person chooses", grade: "[2021, amended 2022]", source: "nice-ng209", quote: "Offer behavioural support to people who smoke regardless of which option they choose to help them stop smoking, unless they have chosen the Allen Carr Easyway in-person group seminar." },
    { claim: "Immediate support at the outpatient site for people who smoke", grade: "[2013]", source: "nice-ng209", quote: "Provide immediate support at the outpatient site." },
    { claim: "Nicotine patches removed 24 hours before microvascular reconstructive surgery and surgery using vasopressin injections", grade: "[2013]", source: "nice-ng209", quote: "Advise people to remove nicotine replacement therapy patches 24 hours before microvascular reconstructive surgery and surgery using vasopressin injections." },
    { claim: "Cytisinicline not offered to people aged 66 and over", grade: "[2025]", source: "nice-ng209", quote: "Do not offer cytisinicline to people aged 66 and over." },
    { claim: "Three elements for every patient with cancer who smokes, done together: behaviour therapy, pharmacotherapy, and close follow-up with retreatment", grade: "NCCN panel recommendation (category of evidence not given in the abstract)", source: "nccn-2022", quote: "(1) evidence-based motivational strategies and behavior therapy (counseling), which can be brief; (2) evidence-based pharmacotherapy; and (3) close follow-up with retreatment as needed." },
    { claim: "Universal assessment and documentation of tobacco use as a standard of quality cancer care", grade: "Policy statement (not graded)", source: "aacr-2013", quote: "Progress on both fronts begins with universal assessment and documentation of tobacco use as a standard of quality cancer care regardless of treatment setting" },
    { claim: "Combined behavioural and pharmacological interventions raise quitting in people with cancer (odds ratio 1.67, 95% CI 1.24 to 2.26); medicine alone did not (odds ratio 1.11, 95% CI 0.69 to 1.78)", grade: "Meta-analysis; overall quality rated very low by GRADE criteria", source: "scholten-2024", quote: "A combination of pharmacological and behavioural interventions may be the most effective intervention for smoking cessation in patients with cancer." },
    { claim: "Quitting at or around a lung cancer diagnosis is associated with better overall survival (summary relative risk 0.71, 95% CI 0.64 to 0.80; 21 observational studies)", grade: "Meta-analysis of observational studies (not graded)", source: "caini-2022", quote: "Quitting smoking at or around diagnosis was significantly associated with improved overall survival (SRR 0.71, 95% CI 0.64-0.80)" },
    { claim: "In 517 people with early-stage non-small cell lung cancer who smoked at diagnosis, five-year overall survival was 60.6% in those who quit and 48.6% in those who continued (two hospitals in Moscow)", grade: "Prospective cohort (not graded)", source: "sheikh-2021" },
    { claim: "Survival benefit is largest when tobacco treatment starts within six months of a cancer diagnosis (cohort of 4526 patients)", grade: "Prospective cohort (not graded)", source: "cinciripini-2024", quote: "The results of this prospective cohort study suggest that evidence-based smoking cessation treatment within 6 months following a cancer diagnosis maximizes survival benefit." },
  ],
  sources: [
    {
      key: "nice-ng209",
      label: "Tobacco: preventing uptake, promoting quitting and treating dependence (NG209), chapter Treating tobacco dependence (published November 2021, last updated February 2025)",
      publisher: "NICE",
      year: 2025,
      url: "https://www.nice.org.uk/guidance/ng209/chapter/Treating-tobacco-dependence",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2013], [2018], [2021], [2025]).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng122",
      label: "Lung cancer: diagnosis and management (NG122), chapter Management, section 1.3 (published March 2019, last updated March 2024)",
      publisher: "NICE",
      year: 2024,
      url: "https://www.nice.org.uk/guidance/ng122/chapter/Management",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "iaslc-2022",
      label: "IASLC Position Statement on Tobacco Cessation After a Cancer Diagnosis",
      publisher: "International Association for the Study of Lung Cancer",
      year: 2022,
      url: "https://www.iaslc.org/iaslc-news/press-release/iaslc-position-statement-tobacco-cessation-after-cancer-diagnosis",
      gradingScheme: "Position statement; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nccn-2022",
      label: "Smoking Cessation, Version 3.2022, NCCN Clinical Practice Guidelines in Oncology",
      publisher: "National Comprehensive Cancer Network (J Natl Compr Canc Netw; Shields et al.)",
      year: 2023,
      url: "https://doi.org/10.6004/jnccn.2023.0013",
      doi: "10.6004/jnccn.2023.0013",
      gradingScheme: "NCCN categories of evidence and consensus (1, 2A, 2B, 3); not stated in the abstract that was read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "aacr-2013",
      label: "Assessing tobacco use by cancer patients and facilitating cessation: an American Association for Cancer Research policy statement",
      publisher: "AACR (Clinical Cancer Research; Toll et al.)",
      year: 2013,
      url: "https://doi.org/10.1158/1078-0432.ccr-13-0666",
      doi: "10.1158/1078-0432.ccr-13-0666",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "park-2020",
      label: "Effect of Sustained Smoking Cessation Counseling and Provision of Medication vs Shorter-term Counseling and Medication Advice on Smoking Abstinence in Patients Recently Diagnosed With Cancer: A Randomized Clinical Trial",
      publisher: "JAMA (Park et al.)",
      year: 2020,
      url: "https://doi.org/10.1001/jama.2020.14581",
      doi: "10.1001/jama.2020.14581",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "scholten-2024",
      label: "The effectiveness of smoking cessation interventions after cancer diagnosis: A systematic review and meta-analysis",
      publisher: "Journal of Cancer Policy (Scholten et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.jcpo.2023.100463",
      doi: "10.1016/j.jcpo.2023.100463",
      gradingScheme: "GRADE criteria applied by the review authors to the included studies.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "caini-2022",
      label: "Quitting Smoking At or Around Diagnosis Improves the Overall Survival of Lung Cancer Patients: A Systematic Review and Meta-Analysis",
      publisher: "Journal of Thoracic Oncology (Caini et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/j.jtho.2021.12.005",
      doi: "10.1016/j.jtho.2021.12.005",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "sheikh-2021",
      label: "Postdiagnosis Smoking Cessation and Reduced Risk for Lung Cancer Progression and Mortality: A Prospective Cohort Study",
      publisher: "Annals of Internal Medicine (Sheikh et al.)",
      year: 2021,
      url: "https://doi.org/10.7326/m21-0252",
      doi: "10.7326/m21-0252",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "cinciripini-2024",
      label: "Survival Outcomes of an Early Intervention Smoking Cessation Treatment After a Cancer Diagnosis",
      publisher: "JAMA Oncology (Cinciripini et al.)",
      year: 2024,
      url: "https://doi.org/10.1001/jamaoncol.2024.4890",
      doi: "10.1001/jamaoncol.2024.4890",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "richter-2023",
      label: "The Effects of Opt-out vs Opt-in Tobacco Treatment on Engagement, Cessation, and Costs: A Randomized Clinical Trial",
      publisher: "JAMA Internal Medicine (Richter et al.)",
      year: 2023,
      url: "https://doi.org/10.1001/jamainternmed.2022.7170",
      doi: "10.1001/jamainternmed.2022.7170",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "wakeman-2026",
      label: "No Smoker Left Behind: Evaluation of a Population-Based, Opt-Out Smoking Cessation Program for Patients With Cancer Who Smoke",
      publisher: "Journal of Clinical Oncology (Wakeman et al.)",
      year: 2026,
      url: "https://doi.org/10.1200/jco-25-02029",
      doi: "10.1200/jco-25-02029",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "krech-esmo-2023",
      label: "Tobacco cessation and the role of ESMO and medical oncologists: addressing the specific needs of cancer patients in times of the COVID-19 pandemic (perspective by WHO and ESMO authors; not a guideline)",
      publisher: "ESMO Open (Krech et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.esmoop.2023.101579",
      doi: "10.1016/j.esmoop.2023.101579",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "surgeon-general-2020",
      label: "Smoking Cessation: A Report of the Surgeon General",
      publisher: "US Department of Health and Human Services",
      year: 2020,
      url: "https://www.hhs.gov/sites/default/files/2020-cessation-sgr-full-report.pdf",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["smoking-cessation-after-diagnosis"],
  terms: ["smoking-cessation"],
  related: ["prehabilitation", "exercise-during-and-after-cancer-treatment", "nutrition-screening-and-support-during-cancer-treatment", "enhanced-recovery-after-lung-surgery", "surgical-site-infection-prevention"],
  upgrades: ["idea-upgrade-stop-smoking-treatment-at-diagnosis"],
  gaps: [
    "The US Surgeon General's report Smoking Cessation (2020) could not be read: on 17 November 2026 hhs.gov and cdc.gov both returned 403, and the NCBI Bookshelf copy had answered with a browser check the day before. Its conclusions appear here only as the IASLC statement reports them, and no step rests on it.",
    "The NCCN Guidelines for Smoking Cessation were read as the abstract of version 3.2022 only. On 17 November 2026 nccn.org listed version 2.2026 as the current one; it needs an NCCN login and was not read, so its medicine choices, its categories of evidence and anything it has changed since 2022 are not on this page.",
    "The ASCO policy statement update on tobacco cessation (2013) has no abstract indexed and was not read. The AACR statement (2013) was read in full on 17 November 2026. No ESMO or MASCC guideline on stopping smoking in people with cancer was found; the ESMO Open paper read is a perspective.",
    "The survival evidence is observational. People who manage to stop may differ from those who do not in ways that also affect survival, so the size of the benefit caused by stopping is not established by these studies.",
    "NICE NG209 is written for everyone using health services, not for people having cancer treatment. None of the sources read gives guidance on choosing between varenicline, cytisinicline, bupropion and nicotine replacement alongside particular anticancer drugs, radiotherapy to the mouth or throat, or after surgery to the head and neck, beyond removing nicotine patches before microvascular reconstructive surgery.",
    "E-cigarettes: NICE supports them as a stop-smoking aid for adults and says long-term harms are unknown; no trial in people having cancer treatment was read, and the cancer-specific sources read do not mention them.",
    "Opt-out referral has one randomised trial, in a general hospital, where the six-month quit rates were close (19% against 18%). In cancer care the evidence read is one programme evaluation at one centre without a comparison group, with self-reported abstinence among the 37.5% of referred patients who completed follow-up.",
    "No dose or course length for varenicline, cytisinicline, bupropion or nicotine replacement is given on this page, because no source read prints one; NICE NG209 gives only when to start each medicine relative to the quit date and points to the BNF and each product's summary of product characteristics. The product information was not read.",
    "Licensing differs by country and was checked only as far as the sources read state it. NICE NG209 (February 2025) lists cytisinicline, nicotine replacement, varenicline and bupropion as medicinally licensed products in the United Kingdom and says that a further course of bupropion to prevent relapse was an off-label use at that date. The United States trial read (Park 2020) offered nicotine replacement, bupropion or varenicline as the medicines approved by the Food and Drug Administration; no source read states whether cytisinicline is approved in the United States.",
    "The trial of sustained counselling with free medication (Park 2020) was run in two United States comprehensive cancer centres and read as an abstract (on 17 November 2026 its PubMed Central page answered with a browser check); its authors say its generalisability is uncertain.",
  ],
});
