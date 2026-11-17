import { protocol } from "./helpers";

/*
 * Stopping smoking, offered at a cancer diagnosis and through treatment: asking, advising, treating with behavioural
 * support and medicines, and referral that does not wait for the person to ask.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG209, Tobacco: preventing uptake, promoting quitting and treating dependence (published 30 November 2021,
 *   last updated 4 February 2025; its cytisinicline recommendations carry [2025] tags): the chapter "Treating tobacco dependence",
 *   HTML, full text. This is the current edition on nice.org.uk. Each recommendation carries its year tag.
 * - NICE NG122, Lung cancer: diagnosis and management (published 28 March 2019, last updated 8 March 2024): the
 *   chapter "Management", section 1.3, HTML, full text.
 * - IASLC Position Statement on Tobacco Cessation After a Cancer Diagnosis (press release of 1 November 2022 carrying
 *   the statement): full text, HTML from iaslc.org. Ungraded.
 * - NCCN Guidelines for Smoking Cessation, version 3.2022 (J Natl Compr Canc Netw 2023): abstract only (Europe PMC).
 *   The guideline itself sits behind an NCCN login and was not read; a newer version may exist and could not be checked.
 * - AACR policy statement (Toll et al., Clin Cancer Res 2013): abstract only; the Europe PMC full-text record
 *   returned an error.
 * - Krech et al., ESMO Open 2023 (WHO and ESMO authors, a perspective, not a guideline): full text, PMC10229195.
 * - Cinciripini et al., JAMA Oncol 2024 (cohort of 4526 patients): full text, PMC11528342.
 * - Abstracts only (Europe PMC): Park 2020 (randomised trial), Scholten 2024 (meta-analysis of cessation
 *   interventions in cancer), Caini 2022 (meta-analysis, lung cancer survival), Sheikh 2021 (prospective cohort),
 *   Richter 2023 (randomised trial of opt-out care in a general hospital), Wakeman 2026 (opt-out programme in a
 *   cancer centre).
 * - Not readable: the US Surgeon General's report Smoking Cessation (2020): hhs.gov returned 403 and the NCBI
 *   Bookshelf copy answered with a browser check. The ASCO policy statement update (Hanna et al., J Clin Oncol 2013)
 *   has no abstract indexed and was not read. No step rests on either.
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
  tldr: "If you smoke when cancer is found, your team should ask about it, explain without blame why stopping helps, and offer treatment at once: a trained adviser with a stop-smoking medicine or nicotine replacement. Studies link stopping to longer survival, and in a randomised trial longer support with free medicine helped about one in three quit. Lung cancer surgery should not wait for someone to stop.",
  simple: "It is never too late to stop smoking, even after a cancer diagnosis. Your team should ask if you smoke, offer you help from a stop-smoking adviser, and offer a medicine or nicotine patches and gum. Stopping is not a test you have to pass to get treatment.",
  summary: "NICE NG209 (updated February 2025) gives the general pathway: ask at every opportunity, advise sensitively, offer behavioural support during the visit, prescribe or provide bupropion, cytisinicline, NRT or varenicline before the quit date, provide accepted pharmacotherapy immediately, and offer weekly sessions for at least four weeks. It tells people that cytisinicline, combination NRT, varenicline and nicotine-containing e-cigarettes, with behavioural support, are the options more likely to succeed. NICE NG122 adds for lung cancer: advise stopping as soon as the diagnosis is suspected, and do not postpone surgery to allow it. The IASLC position statement (2022) asks that all cancer patients are screened and have access to counselling, pharmacotherapy and follow-up inside multidisciplinary cancer care; NCCN (abstract) sets the same three elements, done concurrently, with retreatment as needed. In a randomised trial in 303 people recently diagnosed with cancer (Park 2020), sustained counselling with free medication gave biochemically confirmed quit rates of 34.5% against 21.5% at six months. Survival evidence is observational: a meta-analysis of 21 lung cancer studies (summary relative risk 0.71) and a cohort of 4526 patients in which benefit was largest when treatment began within six months of diagnosis. The guidelines differ on referral by default: NICE arranges support if the person agrees, while opt-out programmes treat unless the person declines; and NICE names e-cigarettes among the more effective options, which the IASLC statement and the NCCN abstract do not mention. The reader's own team's advice comes first.",
  asOf: "2026-11-16",
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
      why: "Many people believe the damage is done once cancer is found; in fact stopping after diagnosis is linked to fewer treatment complications and longer survival.",
      source: "iaslc-2022",
      quote: "All cancer patients should be screened for tobacco use and advised on the harms of tobacco use and the benefits of tobacco cessation.",
      grade: "Position statement (not graded)",
    },
    {
      action: "Advise stopping in a way that respects the person's preferences, and explain how support helps",
      why: "Blame makes people hide their smoking. Advice given with an offer of help is what leads to a quit attempt.",
      source: "nice-ng209",
      quote: "If they smoke, advise them to stop smoking in a way that is sensitive to their preferences and needs, and advise them that stopping smoking in one go is the best approach. Explain how stop-smoking support can help.",
      grade: "[2018]",
    },
    {
      action: "Offer behavioural support from a trained adviser and arrange it during the same clinic visit or hospital stay",
      why: "Support that starts during the visit does not depend on the person making another call or another journey while they are dealing with a new diagnosis.",
      source: "nice-ng209",
      quote: "Offer and, if the person agrees, arrange for them to receive behavioural support to stop smoking during either their current outpatient visit or their inpatient stay.",
      grade: "[2013]",
    },
    {
      action: "Offer a stop-smoking medicine or nicotine replacement, started before the quit date",
      why: "Medicines reduce cravings and withdrawal, and work best when they are in place before the last cigarette.",
      source: "nice-ng209",
      quote: "For adults, prescribe or provide bupropion, cytisinicline, NRT or varenicline before they stop smoking, and for:",
      grade: "[2018], cytisinicline [2025]",
    },
    {
      action: "Explain which options are more likely to work when combined with behavioural support: cytisinicline, long-acting with short-acting nicotine replacement, varenicline, or a nicotine-containing e-cigarette",
      why: "People choose better, and stick with their choice, when they know which options have the best results.",
      source: "nice-ng209",
      quote: "Advise people (as appropriate for their age) that the following options, when combined with behavioural support, are more likely to result in them successfully stopping smoking:",
      grade: "[2021], cytisinicline [2025]",
    },
    {
      action: "Supply the medicine straight away once the person accepts it",
      why: "The moment someone agrees to treatment is the moment to start it, before cravings or a busy week of appointments get in the way.",
      source: "nice-ng209",
      quote: "If stop-smoking pharmacotherapy is accepted, make sure it is provided immediately.",
      grade: "[2013]",
    },
    {
      action: "Make counselling, medicine and follow-up part of cancer care itself, for patients and their family members",
      why: "People with cancer already attend many appointments; help that sits inside the cancer service reaches more of them than a separate service does.",
      source: "iaslc-2022",
      quote: "All patients should have access to evidence-based tobacco cessation assistance consisting of counseling, pharmacotherapy, and follow-up, and access should be routinely incorporated into multidisciplinary cancer care for all cancer patients and their family members.",
      grade: "Position statement (not graded)",
    },
    {
      action: "Encourage people referred for surgery to stop before the operation, and refer them for support",
      why: "Smoking raises the risk of lung complications after an operation; NICE asks teams to tell people having lung cancer surgery exactly that.",
      source: "nice-ng209",
      quote: "Encourage people being referred for elective surgery to stop smoking before their surgery. Refer them to local stop-smoking support.",
      grade: "[2018]",
    },
    {
      action: "Do not delay lung cancer surgery to give a person time to stop smoking",
      why: "Stopping helps, but waiting for it lets the cancer grow; treatment and stop-smoking support go ahead together.",
      source: "nice-ng122",
      quote: "Do not postpone surgery for lung cancer to allow people to stop smoking.",
      grade: "[2011]",
    },
    {
      action: "Offer weekly support sessions for at least four weeks after the quit date",
      why: "The first weeks carry the strongest cravings, and regular contact is when problems with the medicine or a slip can be dealt with.",
      source: "nice-ng209",
      quote: "Offer weekly sessions, preferably face to face, for at least 4 weeks after the date they stopped smoking.",
      grade: "[2013]",
    },
    {
      action: "Check other prescribed medicines when someone stops, because the dose of some needs to change",
      why: "Smoking changes how the body handles some medicines, so the dose of a few may need adjusting, and sometimes lowering, once a person stops.",
      source: "nice-ng209",
      quote: "Monitor people's use of prescribed medicines that are affected by smoking (or stopping smoking) for efficacy and adverse effects.",
      grade: "[2013, amended 2021]",
    },
    {
      action: "Record smoking status and what was offered, ask again at the next visit, and offer treatment again after a relapse",
      why: "Going back to smoking during cancer treatment is common, and it is a reason to offer treatment again, not a failure.",
      source: "nice-ng209",
      quote: "Record smoking status and all actions, discussions and decisions related to advice, referrals or interventions about stopping smoking.",
      grade: "[2018]",
    },
  ],
  bestInClass: {
    statement: "Ask everyone, advise without blame, and treat at once with behavioural support combined with a medicine or nicotine replacement, inside the cancer service, with follow-up and treatment again after relapse. NICE NG209 (updated 2025) supplies the detail and the IASLC statement (2022) and NCCN guideline (abstract) set the same three elements for all patients with cancer: counselling, pharmacotherapy and follow-up. The trial evidence in cancer patients supports the combination: in a meta-analysis (Scholten 2024) combined interventions raised quitting (odds ratio 1.67) while medicine alone did not (odds ratio 1.11), on evidence the authors rate very low quality, and in a randomised trial of 303 people (Park 2020) sustained counselling with free medication gave 34.5% against 21.5% confirmed abstinence at six months. Two differences between sources are shown rather than resolved. Referral: NICE arranges support if the person agrees and refers \"if appropriate\"; opt-out programmes, studied in cancer centres and in one randomised hospital trial, treat everyone who smokes unless they decline. E-cigarettes: NICE names nicotine-containing e-cigarettes among the options more likely to succeed and says long-term harms are not known; the IASLC statement and the NCCN abstract speak only of counselling and pharmacotherapy.",
    sources: ["nice-ng209", "nice-ng122", "iaslc-2022", "nccn-2022", "park-2020", "scholten-2024"],
  },
  variants: [
    {
      name: "Opt-out referral: treatment unless the person declines",
      differs: "Everyone recorded as smoking is contacted or treated by default, without first being asked whether they are ready to quit. NICE instead words its referral as \"Offer and, if the person agrees, arrange for them to receive behavioural support\".",
      evidence: "A randomised trial of 1000 general hospital inpatients (Richter 2023, not a cancer population): verified quit rates with opt-out against opt-in care were 22% against 16% at one month and 19% against 18% at six months; use of medication after discharge was 60% against 34%. In a cancer centre programme (Wakeman 2026), 3706 patients who smoked were contacted by default, 1089 chose a treatment, and among those who completed follow-up at 180 days 16.2% (53 of 327) reported abstinence. A proposal to test opt-out referral at diagnosis is linked under upgrades.",
      sources: ["richter-2023", "wakeman-2026", "nice-ng209"],
    },
    {
      name: "Nicotine-containing e-cigarettes as a stop-smoking aid",
      differs: "NICE includes nicotine-containing e-cigarettes among the options to be accessible to adults who smoke and among those more likely to succeed with behavioural support. The IASLC statement and the NCCN abstract describe counselling and pharmacotherapy and do not mention e-cigarettes.",
      evidence: "NICE asks advisers to explain that \"there is not enough evidence to know whether there are long-term harms from e-cigarette use\" and that \"use of e-cigarettes is likely to be substantially less harmful than smoking\". No trial of e-cigarettes in people having cancer treatment was read.",
      sources: ["nice-ng209", "iaslc-2022", "nccn-2022"],
    },
    {
      name: "Sustained counselling with free medication, against brief counselling and advice",
      differs: "Eleven telephone counselling sessions (four weekly, four fortnightly and three monthly) and a free choice of nicotine replacement, bupropion or varenicline, rather than four weekly sessions and advice about medication.",
      evidence: "Park 2020, a randomised trial at two United States cancer centres in 303 people recently diagnosed with one of eight cancers: biochemically confirmed abstinence at six months was 34.5% against 21.5% (odds ratio 1.92, 95% CI 1.13 to 3.27). The authors state that the generalisability of the findings is uncertain.",
      sources: ["park-2020"],
    },
    {
      name: "Cutting down first, for people not ready to stop in one go",
      differs: "NICE advises that stopping in one go is the best approach, and for people who do not want to or are not ready, offers a harm-reduction route using licensed nicotine products with a quit date within six weeks where the person is cutting down to stop.",
      evidence: "NICE NG209 section 1.15 ([2013]). It also asks advisers to tell people who are not prepared to stop that the health benefits of only reducing are unclear. None of the cancer-specific sources read addresses cutting down.",
      sources: ["nice-ng209"],
    },
  ],
  grades: [
    { claim: "Advise people to stop as soon as lung cancer is suspected, and say why", grade: "[2011]", source: "nice-ng122", quote: "Advise people to stop smoking as soon as the diagnosis of lung cancer is suspected and tell them why this is important." },
    { claim: "Tell people that smoking raises the risk of lung complications after lung cancer surgery", grade: "[2011]", source: "nice-ng122", quote: "Inform people that smoking increases the risk of pulmonary complications after lung cancer surgery." },
    { claim: "Behavioural support offered whichever stop-smoking option the person chooses", grade: "[2021, amended 2022]", source: "nice-ng209", quote: "Offer behavioural support to people who smoke regardless of which option they choose to help them stop smoking, unless they have chosen the Allen Carr Easyway in-person group seminar." },
    { claim: "Immediate support at the outpatient site for people who smoke", grade: "[2013]", source: "nice-ng209", quote: "Provide immediate support at the outpatient site." },
    { claim: "Nicotine patches removed 24 hours before microvascular reconstructive surgery", grade: "[2013]", source: "nice-ng209", quote: "Advise people to remove nicotine replacement therapy patches 24 hours before microvascular reconstructive surgery and surgery using vasopressin injections." },
    { claim: "Cytisinicline not offered to people aged 66 and over", grade: "[2025]", source: "nice-ng209", quote: "Do not offer cytisinicline to people aged 66 and over." },
    { claim: "Three elements for every patient with cancer who smokes, done together: behaviour therapy, pharmacotherapy, and close follow-up with retreatment", grade: "NCCN panel recommendation (category of evidence not given in the abstract)", source: "nccn-2022", quote: "(1) evidence-based motivational strategies and behavior therapy (counseling), which can be brief; (2) evidence-based pharmacotherapy; and (3) close follow-up with retreatment as needed." },
    { claim: "Universal assessment and documentation of tobacco use as a standard of quality cancer care", grade: "Policy statement (not graded)", source: "aacr-2013", quote: "Progress on both fronts begins with universal assessment and documentation of tobacco use as a standard of quality cancer care regardless of treatment setting" },
    { claim: "Combined behavioural and pharmacological interventions raise quitting in people with cancer (odds ratio 1.67); medicine alone did not (odds ratio 1.11)", grade: "Meta-analysis; overall quality rated very low by GRADE criteria", source: "scholten-2024", quote: "A combination of pharmacological and behavioural interventions may be the most effective intervention for smoking cessation in patients with cancer." },
    { claim: "Quitting at or around a lung cancer diagnosis is associated with better overall survival (summary relative risk 0.71, 95% CI 0.64 to 0.80; 21 observational studies)", grade: "Meta-analysis of observational studies (not graded)", source: "caini-2022", quote: "Quitting smoking at or around diagnosis was significantly associated with improved overall survival (SRR 0.71, 95% CI 0.64-0.80)" },
    { claim: "In 517 people with early-stage non-small cell lung cancer who smoked at diagnosis, five-year survival was 60.6% in those who quit and 48.6% in those who continued", grade: "Prospective cohort (not graded)", source: "sheikh-2021" },
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
      accessed: "2026-11-16",
    },
    {
      key: "nice-ng122",
      label: "Lung cancer: diagnosis and management (NG122), chapter Management, section 1.3 (published March 2019, last updated March 2024)",
      publisher: "NICE",
      year: 2024,
      url: "https://www.nice.org.uk/guidance/ng122/chapter/Management",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "iaslc-2022",
      label: "IASLC Position Statement on Tobacco Cessation After a Cancer Diagnosis",
      publisher: "International Association for the Study of Lung Cancer",
      year: 2022,
      url: "https://www.iaslc.org/iaslc-news/press-release/iaslc-position-statement-tobacco-cessation-after-cancer-diagnosis",
      gradingScheme: "Position statement; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
    {
      key: "aacr-2013",
      label: "Assessing tobacco use by cancer patients and facilitating cessation: an American Association for Cancer Research policy statement",
      publisher: "AACR (Clinical Cancer Research; Toll et al.)",
      year: 2013,
      url: "https://doi.org/10.1158/1078-0432.ccr-13-0666",
      doi: "10.1158/1078-0432.ccr-13-0666",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "park-2020",
      label: "Effect of Sustained Smoking Cessation Counseling and Provision of Medication vs Shorter-term Counseling and Medication Advice on Smoking Abstinence in Patients Recently Diagnosed With Cancer: A Randomized Clinical Trial",
      publisher: "JAMA (Park et al.)",
      year: 2020,
      url: "https://doi.org/10.1001/jama.2020.14581",
      doi: "10.1001/jama.2020.14581",
      read: "abstract",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
    {
      key: "caini-2022",
      label: "Quitting Smoking At or Around Diagnosis Improves the Overall Survival of Lung Cancer Patients: A Systematic Review and Meta-Analysis",
      publisher: "Journal of Thoracic Oncology (Caini et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/j.jtho.2021.12.005",
      doi: "10.1016/j.jtho.2021.12.005",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "sheikh-2021",
      label: "Postdiagnosis Smoking Cessation and Reduced Risk for Lung Cancer Progression and Mortality: A Prospective Cohort Study",
      publisher: "Annals of Internal Medicine (Sheikh et al.)",
      year: 2021,
      url: "https://doi.org/10.7326/m21-0252",
      doi: "10.7326/m21-0252",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "cinciripini-2024",
      label: "Survival Outcomes of an Early Intervention Smoking Cessation Treatment After a Cancer Diagnosis",
      publisher: "JAMA Oncology (Cinciripini et al.)",
      year: 2024,
      url: "https://doi.org/10.1001/jamaoncol.2024.4890",
      doi: "10.1001/jamaoncol.2024.4890",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "richter-2023",
      label: "The Effects of Opt-out vs Opt-in Tobacco Treatment on Engagement, Cessation, and Costs: A Randomized Clinical Trial",
      publisher: "JAMA Internal Medicine (Richter et al.)",
      year: 2023,
      url: "https://doi.org/10.1001/jamainternmed.2022.7170",
      doi: "10.1001/jamainternmed.2022.7170",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "wakeman-2026",
      label: "No Smoker Left Behind: Evaluation of a Population-Based, Opt-Out Smoking Cessation Program for Patients With Cancer Who Smoke",
      publisher: "Journal of Clinical Oncology (Wakeman et al.)",
      year: 2026,
      url: "https://doi.org/10.1200/jco-25-02029",
      doi: "10.1200/jco-25-02029",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "krech-esmo-2023",
      label: "Tobacco cessation and the role of ESMO and medical oncologists: addressing the specific needs of cancer patients in times of the COVID-19 pandemic (perspective by WHO and ESMO authors; not a guideline)",
      publisher: "ESMO Open (Krech et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/j.esmoop.2023.101579",
      doi: "10.1016/j.esmoop.2023.101579",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "surgeon-general-2020",
      label: "Smoking Cessation: A Report of the Surgeon General",
      publisher: "US Department of Health and Human Services",
      year: 2020,
      url: "https://www.hhs.gov/sites/default/files/2020-cessation-sgr-full-report.pdf",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  technologies: ["smoking-cessation-after-diagnosis"],
  terms: ["smoking-cessation"],
  related: ["prehabilitation", "exercise-during-and-after-cancer-treatment", "nutrition-screening-and-support-during-cancer-treatment", "enhanced-recovery-after-lung-surgery", "surgical-site-infection-prevention"],
  upgrades: ["idea-upgrade-stop-smoking-treatment-at-diagnosis"],
  gaps: [
    "The US Surgeon General's report Smoking Cessation (2020) could not be read: hhs.gov returned 403 and the NCBI Bookshelf copy answered with a browser check. Its conclusions on stopping after a cancer diagnosis are not stated here and nothing rests on it.",
    "The NCCN Guidelines for Smoking Cessation were read as the abstract of version 3.2022 only; the guideline needs an NCCN login. Its medicine choices, categories of evidence and any later version could not be checked.",
    "The ASCO policy statement update on tobacco cessation (2013) has no abstract indexed and was not read, and the AACR statement (2013) was read as an abstract. No ESMO or MASCC guideline on stopping smoking in people with cancer was found; the ESMO Open paper read is a perspective.",
    "The survival evidence is observational. People who manage to stop may differ from those who do not in ways that also affect survival, so the size of the benefit caused by stopping is not established by these studies.",
    "NICE NG209 is written for everyone using health services, not for people having cancer treatment. None of the sources read gives guidance on choosing between varenicline, cytisinicline, bupropion and nicotine replacement alongside particular anticancer drugs, radiotherapy to the mouth or throat, or after surgery to the head and neck, beyond removing nicotine patches before microvascular reconstructive surgery.",
    "E-cigarettes: NICE supports them as a stop-smoking aid for adults and says long-term harms are unknown; no trial in people having cancer treatment was read, and the cancer-specific sources read do not mention them.",
    "Opt-out referral has one randomised trial, in general hospital inpatients, where the six-month quit rates were close (19% against 18%). In cancer centres the evidence read is from programme evaluations without a comparison group.",
    "The trial of sustained counselling with free medication (Park 2020) was run in two United States comprehensive cancer centres and read as an abstract; its authors say its generalisability is uncertain.",
  ],
});
