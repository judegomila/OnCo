/**
 * Japan deep dive: the hand-written cards and tables for /countries/jp/. Plain English first, detail second, every
 * card with its sources. Entity lists are pulled from the graph on the page by id so they stay in step with the
 * corpus. Figures are quoted only where the linked source states them.
 *
 * This page was written from Japanese primary sources rather than from English summaries of them: the National
 * Cancer Center's registry statistics (ganjoho.jp), the Ministry of Health, Labour and Welfare's screening guidance
 * and high-cost medical expense material, the PMDA's own annual performance report, JCOG's evaluation committee
 * slides, the Japanese Society of Medical Oncology's society history, and the particle therapy foundation's
 * facility-by-facility patient register. Where an English-language paper is the source it is named as such.
 *
 * Counting conventions worth holding in mind while reading the numbers below:
 *  - incidence  全国がん登録 (national cancer registry), diagnoses in 2023, on ganjoho's statistics pages from April 2026
 *  - deaths     人口動態統計 (vital statistics), deaths in 2024, published January 2026
 *  - survival   全国がん登録生存率データ, five-year relative survival for cases diagnosed in 2018, published July 2026
 *  - "rate per 100,000" on ganjoho's summary panels is the crude rate, not an age-standardised one; Japan's
 *    population is the oldest in the world, so crude rates run far above age-standardised ones. The GLOBOCAN
 *    table on the page carries the age-standardised figures for comparison with other countries.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const JP_ASOF = "2026-09-25";

/** Shorthand for the sources used more than once. */
const GANJOHO = { label: "National Cancer Center, Cancer Statistics in Japan (がん統計)", url: "https://ganjoho.jp/reg_stat/statistics/stat/summary.html" };
const SHISHIN = { label: "MHLW, guidance for cancer prevention education and cancer screening (がん予防重点健康教育及びがん検診実施のための指針), revised 24 December 2025", url: "https://www.mhlw.go.jp/content/10900000/001642974.pdf" };
const KOKUMIN = { label: "MHLW, 2022 Comprehensive Survey of Living Conditions (令和4年国民生活基礎調査), health chapter", url: "https://www.mhlw.go.jp/toukei/saikin/hw/k-tyosa/k-tyosa22/dl/04.pdf" };
const KOUGAKU = { label: "MHLW, for those using the high-cost medical expense benefit (高額療養費制度を利用される皆さまへ), rules from August 2018", url: "https://www.mhlw.go.jp/content/000333280.pdf" };
const KOUGAKU_2026 = { label: "MHLW, revision of the high-cost medical expense benefit (高額療養費制度の見直しについて), 16 December 2025 expert committee", url: "https://www.mhlw.go.jp/content/001726232.pdf" };
const PMDA_REPORT = { label: "PMDA, business performance report for FY2024 (令和6事業年度業務実績報告書)", url: "https://www.pmda.go.jp/files/000277706.pdf" };
const ANTM = { label: "Foundation for Biomedical Research and Innovation in Atomic Energy: Japan's particle therapy facilities (日本の粒子線治療施設の紹介)", url: "https://www.antm.or.jp/05_treatment/04.html" };
const ANTM_PATIENTS = { label: "Registered patients by particle therapy facility and fiscal year (各粒子線施設における治療の登録患者数), 2025 edition", url: "https://www.antm.or.jp/file/a406a8faf60416aa0c16fc92794b99244154eca1.pdf" };
const JCOG_REPORT = { label: "JCOG evaluation committee report, 2026 (令和8年JCOG評価委員会)", url: "https://jcog.jp/assets/pdf/JCOGReport_2026.pdf" };
const KYOTEN = { label: "MHLW: designated cancer care hospitals (がん診療連携拠点病院等)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/gan/gan_byoin.html" };
const IRYOUHOKEN = { label: "MHLW, overview of the medical insurance system (我が国の医療保険について), slide pack", url: "https://www.mhlw.go.jp/content/12400000/001416337.pdf" };
const PLAN4 = { label: "Fourth Basic Plan to Promote Cancer Control (がん対策推進基本計画), cabinet decision 28 March 2023", url: "https://www.mhlw.go.jp/content/10900000/001522768.pdf" };

/** Cancer profile: what is different about cancer in Japan, read from Japan's own registry. */
export const JP_PROFILE: CountryCard[] = [
  {
    id: "registry",
    title: "How Japan counts cancer: a compulsory national register since 2016",
    plain: "Every medical institution in Japan that treats cancer has to notify each new cancer to its prefecture, which registers it for the national register. That is a legal duty, not a survey, so Japan's incidence figures are counts rather than estimates. The register publishes diagnoses about two and a half years behind, and the death figures come from a separate system.",
    detail: "The Act on Promotion of Cancer Registration put a single national register in place of the patchwork of regional registries that preceded it; its first year of data is 2016. Every medical institution that treats cancer notifies 26 items to the prefecture, which deduplicates and forwards to the National Cancer Center; about 850 designated hospitals additionally keep a 105-item hospital-based registry of their own cases. The 2023 diagnosis year, which the National Cancer Center's statistics pages have carried since April 2026, records 993,469 new cancers: 556,059 in men and 437,406 in women, a crude rate of 798.9 per 100,000. Deaths are counted separately in the vital statistics: 384,111 cancer deaths in 2024, added to the same pages in January 2026. Five-year relative survival for the 2018 diagnosis cohort, published in July 2026, is 64.8 percent overall, 63.2 percent in men and 66.8 percent in women. GLOBOCAN's estimate for Japan in 2024, which the table below renders, is 1,066,842 cases and 455,037 deaths, with an age-standardised incidence of 288.4 and mortality of 81.5 per 100,000: a lower age-standardised incidence than the United States on a far older population.",
    links: [
      GANJOHO,
      { label: "National Cancer Center: what the national cancer registry is (全国がん登録)", url: "https://ganjoho.jp/public/institution/registry/index.html" },
      { label: "Registry and vital statistics downloads (集計表ダウンロード)", url: "https://ganjoho.jp/reg_stat/statistics/data/dl/index.html" },
    ],
  },
  {
    id: "mix",
    title: "A different mix: far more stomach cancer than the West, and more liver cancer",
    plain: "Age for age Japan's cancer rate is about the same as western Europe's (GLOBOCAN 2024: 288 per 100,000, between Germany's 271 and France's 300), but the cancers are different ones. Stomach cancer is the third commonest cancer in the country and the fourth in men; GLOBOCAN 2024 puts its age-standardised rate at 32 per 100,000 in Japan against 4 in the United States and 6 in Germany. Liver cancer kills more people in Japan than breast cancer does.",
    detail: "The registry's 2023 diagnosis year records 104,864 stomach cancers, 71,135 in men and 33,729 in women, and 37,867 stomach cancer deaths in 2024. Liver and intrahepatic bile duct cancer accounts for 32,673 diagnoses and 22,465 deaths, against 103,424 breast cancers and 16,005 breast cancer deaths. Colorectal cancer is the largest single site with 154,039 diagnoses and 54,416 deaths; lung follows with 123,989 and 75,569; prostate has risen to 102,094 diagnoses; pancreatic cancer causes 41,235 deaths on 47,540 diagnoses. Five-year relative survival for the 2018 cohort separates them sharply: prostate 95.7 percent, breast 89.7 (women only), colorectal 69.9, stomach 66.1, lung 39.3, liver 35.2, pancreas 13.2. Stomach cancer survival of 66.1 percent sits beside the stage figures in the next card: 57.3 percent of stomach cancers in that cohort were found while still localised. The registry reports both figures and does not say what caused them.",
    links: [
      { label: "Stomach (胃) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/5_stomach.html" },
      { label: "Liver (肝臓) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/8_liver.html" },
      { label: "Colorectal (大腸) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/67_colorectal.html" },
      { label: "All sites (全がん) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/1_all.html" },
      { label: "Breast (乳房) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/14_breast.html" },
      { label: "Lung (肺) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/12_lung.html" },
      { label: "Prostate (前立腺) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/20_prostate.html" },
      { label: "Pancreas (膵臓) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/10_pancreas.html" },
    ],
  },
  {
    id: "stage",
    title: "Most stomach cancers are found while they are still local",
    plain: "The registry records how far each cancer has spread when it is found. Across all cancers 46 percent are confined to the organ they started in when they are diagnosed. For stomach cancer it is 57 percent, and their five-year survival, measured against people of the same age without cancer, is 94 percent. The registry does not say how much of that is due to screening.",
    detail: "The registry publishes five-year relative survival by clinical extent for the 2018 diagnosis cohort, excluding death-certificate-only cases, second primaries, in-situ disease and cases of unknown age or address. For all sites, 46.0 percent were localised (survival 91.2 percent), 23.0 percent regional (62.2), 18.9 percent distant (19.4) and 12.1 percent unknown. Stomach cancer is the outlier: 57.3 percent localised (94.0 percent survival), 18.2 percent regional (50.4), 18.1 percent distant (7.0). Lung cancer, which the national programme screens by chest radiograph, runs the other way: 31.3 percent localised and 38.8 percent distant. Bowel cancer, also screened, is close to the all-sites figure at 45.6 percent localised, and liver cancer, which is not one of the five screening programmes, is 59.2 percent localised. The registry's stage figures do not by themselves show what screening has done.",
    links: [
      { label: "Five-year relative survival by clinical extent, 2018 diagnoses (全国がん登録生存率データ, xlsx)", url: "https://ganjoho.jp/reg_stat/statistics/data/dl/excel/cancer_survivalNCR(2016-2018).xlsx" },
      GANJOHO,
    ],
  },
  {
    id: "corpus",
    title: "What this corpus did not hold about Japan, and why",
    plain: "OnCo ranks countries from what it has read, and it reads English. Japan is fifth in the world by indexed oncology papers, yet the composite score on the rankings page puts it twenty-seventh, and much of that gap is measurement rather than substance. Where Japan stands in our own count of institutions is computed from the corpus in the box below.",
    detail: "Three of the five terms in the ranking formula work against Japan for reasons that have nothing to do with Japanese oncology. Growth scores zero because Japan's indexed output is flat: 4,929 oncology works in 2021 against 4,604 in 2025. The trial term counts ClinicalTrials.gov registrations with a site in the country, and Japan's investigator-initiated trials register in jRCT or UMIN-CTR instead, so 9,840 is an undercount of a country whose cooperative group, JCOG, dates from 1978. The highly cited share, 2.84 percent against 4.35 percent for the United States, may partly reflect a publication culture that puts a great deal of clinical work in Japanese-language and Japanese-domiciled journals that index and cite differently. What does not change with better reading: Japan's oncology output has not grown in five years while China's has risen by half.",
    links: [
      { label: "OnCo country research rankings, with the formula and its caveats", url: "/countries/" },
      { label: "jRCT (Japan Registry of Clinical Trials, 臨床研究等提出・公開システム)", url: "https://jrct.mhlw.go.jp/" },
      { label: "UMIN Clinical Trials Registry (UMIN-CTR)", url: "https://www.umin.ac.jp/ctr/index.htm" },
    ],
  },
];

/** The national screening programme: what is offered, to whom, how often, and what the evidence behind it says. */
export const JP_SCREENING: CountryCard[] = [
  {
    id: "programme",
    title: "Five screening programmes, delivered by municipalities to one national specification",
    plain: "Japan does not have a national screening service. It has a national instruction, revised by the health ministry, which every municipality delivers. Five cancers are covered: stomach, cervix, lung, breast and bowel. The instruction says exactly which test, from what age and how often.",
    detail: "The guidance was issued on 31 March 2008 and has been amended eight times, most recently on 24 December 2025. Stomach screening is a questionnaire plus either barium photofluorography or upper endoscopy, the person's choice where both are offered, from age 50, every two years, with two long-standing concessions: barium may be offered from 40, and may be done annually. Cervical screening is a questionnaire, inspection, cervical cytology and bimanual examination from 20 every two years, or, as an alternative in the current text, HPV testing alone from 30 every five years with cytology as a triage test on a positive result and a follow-up test the next year for HPV-positive, cytology-negative women. Lung screening is a questionnaire and chest radiography from 40, annually; the current text lists no sputum cytology. Breast screening is a questionnaire and mammography from 40 every two years, and explicitly does not recommend clinical breast examination. Bowel screening is a questionnaire and a two-day immunochemical faecal occult blood test from 40, annually. A combined screen is offered at the milestone ages of 40 and 50. Each programme names the age band it most wants to reach, 40 to 69 in most cases, while requiring that anyone eligible be offered a slot every year.",
    links: [SHISHIN, { label: "MHLW cancer screening policy page (がん検診)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000059490.html" }],
  },
  {
    id: "uptake",
    title: "Roughly half the target population is screened, and the number has stopped moving",
    plain: "Between about a third and a half of Japanese adults in each target age group have had each screen in the period it covers, depending on the test and on sex. That is short of the government's own target of 60 percent, and it has barely moved across the 2016, 2019 and 2022 surveys.",
    detail: "The 2022 Comprehensive Survey of Living Conditions, which asks people rather than counting municipal records and so includes workplace and opportunistic screening, found that in the previous year 47.5 percent of men and 36.5 percent of women aged 40 to 69 had a stomach screen, 53.2 and 46.4 percent a lung screen and 49.1 and 42.8 percent a bowel screen. Over the previous two years 53.7 percent of men and 43.5 percent of women aged 50 to 69 had a stomach screen, 43.6 percent of women aged 20 to 69 a cervical screen and 47.4 percent of women aged 40 to 69 a breast screen. The survey's own comment is that all of these are broadly flat. The Fourth Basic Plan to Promote Cancer Control sets 60 percent uptake for every guideline-based screen and 90 percent attendance at the follow-up examination when a screen is positive.",
    links: [KOKUMIN, { label: "National Cancer Center: screening uptake (がん検診受診率)", url: "https://ganjoho.jp/reg_stat/statistics/stat/screening/screening.html" }, PLAN4],
  },
  {
    id: "evidence",
    title: "What the evidence behind the stomach programme actually says",
    plain: "Japan grades its own screening tests and publishes the grades. Both the barium meal and the endoscopy carry a middling grade B: enough evidence that they reduce deaths from stomach cancer to recommend them, and not more. But the Korean study that the guideline page cites in support of endoscopy found the benefit only for endoscopy, not for the barium meal, which the ministry's guidance still allows. The blood tests people often ask for are graded as insufficient evidence either way.",
    detail: "The National Cancer Center's gastric screening guideline, 2014 edition, gives grade B to upper gastrointestinal radiography and grade B to upper endoscopy, both defined as having reasonable evidence of a reduction in mortality, and recommends endoscopy from 50 at an interval of two to three years. The 2005 edition had graded endoscopy I, insufficient evidence; the upgrade to B came with the 2014 edition, and the guideline page names as its confirming evidence a Korean nested case-control study in 16.6 million people. That study is worth reading closely, because it separates the two tests Japan offers: against never being screened, the odds of dying of gastric cancer were 0.53 (95 percent confidence interval 0.51 to 0.56) for endoscopic screening and 0.98 (0.95 to 1.01) for the upper gastrointestinal series, and the endoscopy benefit deepened with each additional screen. In other words the study the guideline page cites found a 47 percent mortality reduction for endoscopy and none for barium, while Japan grades both B and still allows barium annually from 40. The guideline page cites the Korean study for endoscopy only and does not name the studies behind the barium grade; its latest edition is the 2014 one. The guideline gives grade I, insufficient evidence to judge whether mortality is reduced, to the pepsinogen method and to Helicobacter pylori antibody testing, alone or combined, and so does not recommend them for organised screening. The named harms are aspiration with high-density barium, and for endoscopy false positives, overdiagnosis, shock from the pharyngeal anaesthetic, perforation and bleeding. The Korean study is a nested case-control study, not a randomised trial.",
    links: [
      { label: "National Cancer Center, gastric cancer screening guideline 2014 (胃がん検診ガイドライン)", url: "https://canscreen.ncc.go.jp/guideline/igan.html" },
      { label: "National Cancer Center, evidence-based cancer screening (科学的根拠に基づくがん検診推進のページ)", url: "https://canscreen.ncc.go.jp/" },
      { label: "Effectiveness of the Korean National Cancer Screening Program in reducing gastric cancer mortality (Gastroenterology 2017)", url: "https://doi.org/10.1053/j.gastro.2017.01.029" },
    ],
  },
  {
    id: "causes",
    title: "Treating the cause: Helicobacter since 2013, and hepatitis B and C",
    plain: "Screening finds cancer early. Japan also acts on the infections linked to its stomach and liver cancer. Since February 2013 the health insurance has paid to eradicate Helicobacter pylori in people who test positive and have gastritis seen at endoscopy. A national hepatitis programme promotes testing and treatment for hepatitis B and C. The national cancer plan itself says there is not yet enough evidence that eradicating Helicobacter in healthy people without symptoms prevents stomach cancer.",
    detail: "In February 2013 insurance cover for Helicobacter eradication, until then limited mainly to peptic ulcer disease and a few other conditions, was extended to endoscopically diagnosed chronic gastritis with a positive test. A descriptive national time-trend study published in Helicobacter in 2026 reports annual stomach cancer deaths falling from 48,427 in 2013 to 37,394 in 2024, a 25.2 percent fall in crude deaths, with the decline concentrated below age 80 while deaths above 80 continued to rise; the authors are explicit that an ecological trend cannot separate eradication from endoscopy, birth-cohort effects and falling infection prevalence. On the liver side the Fourth Basic Plan records that, among people tested in local-government hepatitis virus screening, hepatitis B surface antigen positivity was 0.54 percent and hepatitis C antibody positivity 0.25 percent in the 2019 reporting year, against 0.87 and 0.60 percent in 2011.",
    links: [
      { label: "Population-level gastric cancer trends after the 2013 insurance expansion (Helicobacter 2026)", url: "https://doi.org/10.1111/hel.70162" },
      PLAN4,
      { label: "Population-based gastric cancer screening in Japan: evolution, challenges and lessons (Cancer Control 2026)", url: "https://doi.org/10.1177/10732748261476091" },
    ],
  },
];

/** Who pays. */
export const JP_PAYING: CountryCard[] = [
  {
    id: "universal",
    title: "Everybody is insured, and everybody pays the same share",
    plain: "Everyone in Japan is covered by a public health insurance scheme: employment-based schemes, National Health Insurance, or the scheme for people aged 75 and over. The patient pays 30 percent of the bill at the counter, falling to 20 percent at 70 and 10 percent at 75 for most people.",
    detail: "The ministry describes the system by four features: everyone covered by public insurance, free choice of provider, high-quality care at low cost, and public money used to keep universal coverage running on a social insurance base. At the end of March 2023 it counted 1,716 National Health Insurance schemes with about 24.1 million members, one nationally managed employees' scheme with about 39.4 million, 1,383 company health insurance societies with about 28.2 million, 85 mutual aid associations with about 9.8 million, and 47 Latter-Stage Elderly schemes with about 19.1 million. Co-payment is 30 percent for adults under 70, 20 percent before compulsory school age, 20 percent from 70 to 74, and 10 percent from 75, with 30 percent for those on incomes comparable to the working population and 20 percent for certain others above an income threshold since October 2022. Patients paid 11.6 percent of national health expenditure in the 2022 financial year, about 5.4 trillion yen, against 50.0 percent from premiums and 37.9 percent from public funds.",
    links: [IRYOUHOKEN, { label: "MHLW: the medical insurance system (医療保険制度)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken01/index.html" }],
  },
  {
    id: "ceiling",
    title: "The high-cost medical expense benefit: a monthly ceiling on what any illness can cost you",
    plain: "The part that changes a cancer diagnosis is the monthly ceiling. Under the rules the ministry gives for treatment from August 2026, a middle-income household under 70 (about 3.7 to 7.7 million yen a year) pays 85,800 yen in a month plus 1 percent of the bill above 286,000 yen, which the ministry puts at about 93,000 yen on a 1,000,000 yen month, and 44,400 yen from the fourth month in a year of hitting the ceiling. Until July 2026 the ceiling was 80,100 yen plus 1 percent above 267,000 yen (87,430 yen on a 1,000,000 yen month). The price of the drug barely enters into it.",
    detail: "The high-cost medical expense benefit refunds anything a person pays above a monthly ceiling set by age and income; hospital meals and the charge for a private room are excluded. The ministry's worked example in its 2018 leaflet, under the ceilings that applied until July 2026, for someone under 70 on 3.7 to 7.7 million yen a year paying 30 percent: a month of care costing 1,000,000 yen means 300,000 yen at the counter, a ceiling of 80,100 yen plus 1 percent of the amount above 267,000 yen, so 87,430 yen, and 212,570 yen refunded. Members of a household in the same insurance scheme can add their bills together in a month (under 70, only bills of 21,000 yen or more count), and after three qualifying months in twelve the ceiling falls to 44,400 yen for the two middle bands. For inpatient care the ceiling is applied at the counter rather than reclaimed afterwards, and since April 2012 the same applies to outpatient care at a single institution. The table below sets the ceilings that applied from August 2018 to July 2026 beside those the ministry gives for treatment from August 2026. The ministry's high-cost benefit page, read on 17 November 2026, describes the August 2026 rules as the present system and gives about 93,000 yen as the most a person under 70 on about 3.7 to 5.1 million yen a year pays on a 1,000,000 yen month.",
    links: [KOUGAKU, IRYOUHOKEN, { label: "MHLW: high-cost medical expense benefit (高額療養費制度)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html" }],
  },
  {
    id: "reform",
    title: "Higher monthly ceilings from August 2026, with a new annual cap",
    plain: "The government settled a package in December 2025: monthly ceilings rise for treatment from August 2026, the reduced ceiling for people who are ill month after month is frozen, and a new yearly cap is added so that people who never quite reach the monthly ceiling stop paying once they reach the annual one. A second step, with finer income bands, follows in August 2027.",
    detail: "The expert committee on the future of the benefit reported on 16 December 2025 and the ministry published the resulting figures. For the 3.7 to 7.7 million yen band under 70, the monthly ceiling becomes 85,800 yen plus 1 percent of the amount above 286,000 yen from August 2026, against 80,100 yen plus 1 percent above 267,000 yen before, with the multiple-month figure held at 44,400 yen and a new annual cap of 530,000 yen, counted from August to the following July. The top band moves to 270,300 yen plus 1 percent above 901,000 yen with an annual cap of 1,680,000 yen; the residence-tax-exempt band moves to 36,900 yen a month with an annual cap of 290,000 yen. Income bands are subdivided further from August 2027, and households under about 2 million yen a year get a lower multiple-month figure. The stated principle is that the cost to people in long-term continuing treatment should not rise.",
    links: [KOUGAKU_2026],
  },
  {
    id: "outside",
    title: "What the insurance does not pay for, and the rule that makes that expensive",
    plain: "Japan does not normally let you mix insured and uninsured care in the same course of treatment. One sanctioned exception is advanced medical care, a list of 70 techniques in October 2026: you pay the whole fee for the technique, and everything around it stays insured. That is how particle therapy outside its insured indications is paid for.",
    detail: "Advanced medical care is one of the evaluation treatments the minister designates under the 2006 amendment to the Health Insurance Act, for techniques being assessed for future insurance cover; a hospital meeting the facility standard for a given technique may notify and then combine it with insured care. There were 70 such techniques in October 2026. The money works like this, in the ministry\'s own worked example: on a course costing 1,000,000 yen of which 200,000 yen is the advanced technique fee, the patient pays that 200,000 yen in full, and of the remaining 800,000 yen of ordinary consultations, tests, drugs and bed charges the insurance pays 70 percent, 560,000 yen, leaving a 240,000 yen co-payment to which the high-cost medical expense ceiling then applies. The particle therapy register in the section below has carried an insured column beside its advanced-medicine column since the 2016 financial year, and it still records patients treated as advanced medical care, who pay the technique fee themselves. Private rooms, hospital meals above a set contribution and unapproved drugs sit outside cover altogether, which is what the drug loss section is about in money terms.",
    links: [
      { label: "MHLW: advanced medical care (先進医療の概要)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/sensiniryo/index.html" },
      ANTM_PATIENTS,
    ],
  },
];

/** The regulator and the approval gap. */
export const JP_REGULATOR: CountryCard[] = [
  {
    id: "pmda",
    title: "PMDA reviews, the ministry approves",
    plain: "Japan's medicines regulator is the Pharmaceuticals and Medical Devices Agency, set up in 2004 from three predecessor bodies. It does the scientific review; the marketing approval itself is granted by the Minister of Health, Labour and Welfare on its advice. It also runs safety monitoring and a compensation scheme for drug injury.",
    detail: "PMDA was established and came into service on 1 April 2004 under the Law for the Pharmaceuticals and Medical Devices Agency, consolidating the Pharmaceuticals and Medical Devices Evaluation Center of the National Institute of Health Sciences, the Organization for Pharmaceutical Safety and Research and part of the Japan Association for the Advancement of Medical Equipment. Its three service areas are reviews, post-marketing safety measures and relief for adverse health effects. The approval itself is issued by the ministry after deliberation by the Pharmaceutical Affairs and Food Sanitation Council, which is why PMDA's own review-time target explicitly accounts for the ministry's scheduling of that council. Japan has two expedited routes of its own that show up in the corpus: the Sakigake designation, held to a six-month total review, and the conditional early approval system for products where a confirmatory trial is impractical.",
    links: [
      { label: "PMDA: profile and functions", url: "https://www.pmda.go.jp/english/about-pmda/outline/0002.html" },
      { label: "PMDA: list of approved drugs (English)", url: "https://www.pmda.go.jp/english/review-services/reviews/approved-information/drugs/0002.html" },
      PMDA_REPORT,
    ],
  },
  {
    id: "times",
    title: "Review times: nine months for a priority drug, twelve for a standard one, and both met",
    plain: "PMDA is judged on the total time from filing to approval, including the time the company takes to answer questions, at the 80th percentile rather than the median. In the 2024 financial year it hit 8.9 months against a 9-month target for priority products and 12.0 months against 12 for standard ones.",
    detail: "The agency's own performance report for the year to March 2025 gives the total review time for new drugs at the 80th percentile as 8.9 months for priority items, against a planned 9 months, and 12.0 months for standard items against a planned 12. Products with a Sakigake designation are held to 6 months; the one that reported was approved in 4.8 months. Priority items were 29.6 percent of the year's approvals. The target is a percentile of the total time from filing to approval, so the time a company takes to answer questions counts towards it.",
    links: [PMDA_REPORT],
  },
  {
    id: "lag",
    title: "The drug lag: a real gap, much reduced, and measured",
    plain: "Cancer drugs have reached Japanese patients later than American ones, and the gap has been measured repeatedly. Across 142 drugs approved in both countries since 2004 the median was a little over two years, falling to about 100 days by the 2020s. The studies link a shorter gap to Japanese patients being in the trial in the first place and to approval in both countries at the same time. For drugs given accelerated approval in the United States, one study found substantial delays still.",
    detail: "An analysis of 142 anticancer agents approved by both PMDA and the FDA between October 2004 and March 2025 found a median approval lag of 774 days, interquartile range 217 to 1,370, falling to about 100 days by the 2020s; in multivariate analysis development through a multi-regional clinical trial and concurrent approval in both countries were each independently associated with a shorter lag, while company origin, cancer type and use of an expedited pathway were not. A separate study of the 55 anticancer drugs granted FDA accelerated approval between 2012 and 2021 put the median lag at 649 days and attributed most of it to the delay in filing rather than in reviewing, with Japanese participation in the pivotal study and use of a Japanese expedited pathway both shortening it.",
    links: [
      { label: "Trends in and determinants of approval lag for anticancer drugs in Japan and the US (Clin Transl Sci 2025)", url: "https://doi.org/10.1111/cts.70336" },
      { label: "Approval of high-benefit oncology drugs in Japan: expedited pathways for FDA accelerated-approval drugs (Invest New Drugs 2025)", url: "https://doi.org/10.1007/s10637-025-01549-0" },
    ],
  },
  {
    id: "loss",
    title: "What replaced it: drug loss, where the trial never comes to Japan at all",
    plain: "The problem has changed shape. A drug that is developed with Japanese sites now arrives on time. The worry is the growing number of drugs, especially from small foreign companies and in rare or paediatric cancers, that are never developed in Japan at all, so there is no lag to measure, only an absence.",
    detail: "Of 999 global phase 3 oncology trials started between 2008 and 2022, the share that included Japan rose from 34.3 percent in 2008-12 to 51.6 percent in 2013-17 and 60.2 percent in 2018-22, but the absolute number Japan did not join barely moved: 157, then 167, then 165. Not having an operational base in Japan and working in a less common cancer were both independently associated with leaving Japan out. In paediatric oncology the effect is stark: the share of US paediatric drug-indication pairs that reached Japanese approval fell from 81.8 percent before the 2017 RACE Act to 31.8 percent after it, while the median time to approval for those that did get through shortened from 48.9 to 21.1 months; where the supporting US study was early-phase or absent, 92.9 percent never reached Japanese approval.",
    links: [
      { label: "Evaluation of drug lag and drug loss in Japan: participation in global phase III oncology trials (Int J Clin Oncol 2025)", url: "https://doi.org/10.1007/s10147-025-02756-8" },
      { label: "Transition from drug lag to drug loss in paediatric oncology (Front Pharmacol 2026)", url: "https://doi.org/10.3389/fphar.2026.1882440" },
    ],
  },
];

/** What Japan does that others do not. */
export const JP_DOING: CountryCard[] = [
  {
    id: "particles",
    title: "Particle therapy: 25 centres and 122,314 patients since 1994",
    plain: "Japan began treating patients with carbon ions at Chiba in 1994 and has been building particle therapy centres ever since. There are now 25 of them, seven able to deliver carbon ions, and they registered 12,110 patients in the year to March 2026. The national insurance pays for a list of indications; outside it, treatment is given as advanced medical care and the patient pays the technique fee.",
    detail: "The particle therapy foundation's facility register, updated in October 2026, lists 25 operating centres: 6 carbon-ion, 18 proton and one that does both, with a nineteenth proton centre listed as suspended. Its patient table runs from the first 21 patients treated at the Heavy Ion Medical Accelerator in Chiba in the 1994 financial year to 12,110 in the 2025 financial year, 122,314 in total, of whom 333 came from abroad. QST Hospital in Chiba has treated 17,812, the Kyushu International Heavy Ion Center in Saga 11,925, Gunma University 8,856 and the National Cancer Center Hospital East 5,726. Gunma University's indication pages for carbon-ion therapy, written for referring doctors, say that insurance applies to: localised prostate cancer; bone and soft tissue tumours, non-squamous carcinomas and squamous carcinoma of the nasal cavity, paranasal sinuses or external auditory canal in the head and neck; hepatocellular carcinoma of 4 cm or more not suitable for radical resection; intrahepatic cholangiocarcinoma not suitable for radical resection; stage I to IIA early lung cancer of 5 cm or less not suitable for radical resection; postoperative recurrence of colorectal cancer not suitable for radical resection; bone and soft tissue tumours not suitable for radical resection, including paediatric ones such as osteosarcoma; and pancreatic cancer not suitable for radical resection. For the other diseases on its list, including locally advanced cervical cancer and oesophageal cancer, the page does not say whether insurance applies. It says carbon-ion therapy is given either as insured care or as advanced medical care, the latter under the indications and unified treatment policy drawn up under the Japanese Society for Radiation Oncology; ask the treating centre which applies.",
    links: [ANTM, ANTM_PATIENTS, { label: "Gunma University Heavy Ion Medical Center: indications and insurance cover (重粒子線治療の適応となる疾患)", url: "https://heavy-ion.showa.gunma-u.ac.jp/page.php?id=9" }],
  },
  {
    id: "endoscopy",
    title: "Finding and removing early stomach cancer through the endoscope",
    plain: "Japan wrote the rules for deciding when an early stomach cancer can be removed through the endoscope instead of by an operation. That only helps where stomach cancers are found early enough to be removed that way, and the registry shows 57 percent of them found while still localised.",
    detail: "The criteria came from a study of 5,265 patients operated on at two Japanese centres, which found no lymph node spread in defined groups of early gastric cancers and proposed widening the criteria for local treatment. The Japanese Gastric Cancer Association's treatment guidelines, whose sixth edition appeared in English in 2023, set out the indications for endoscopic resection and the curability categories that decide who needs surgery afterwards. The ministry's screening guidance asks that screening endoscopy follow the manual of the Japanese Society of Gastroenterological Cancer Screening, and says barium films should in principle be read by at least two experienced doctors. Three Japanese endoscope makers, Olympus, Fujifilm and Pentax Medical, have records in the company list below.",
    links: [
      { label: "Incidence of lymph node metastasis from early gastric cancer, 5,265 patients (Gastric Cancer 2000)", url: "https://doi.org/10.1007/PL00011720" },
      { label: "Japanese gastric cancer treatment guidelines 2021, 6th edition (Gastric Cancer 2023)", url: "https://doi.org/10.1007/s10120-022-01331-8" },
      SHISHIN,
    ],
  },
  {
    id: "jcog",
    title: "JCOG: a publicly funded trials group that has been running since 1978",
    plain: "The Japan Clinical Oncology Group is a cooperative trials group paid for out of public research funds, not a company consortium. Its core funding comes from the National Cancer Center's research funds, with further grants from AMED, and it has registered more than 70,000 patients.",
    detail: "JCOG began in 1978 as a health ministry research group on multimodal cancer treatment, took its present name in 1990, and set up its statistics centre, now the JCOG Data Center, in 1991. Its evaluation committee report for 2026 records 16 disease-specific groups, 107 trials of which 42 are enrolling, 186 participating medical institutions covering 804 departments, and a central support structure of 55 staff split between the National Cancer Center Hospital's clinical research support division and the non-profit Cancer Research Organization. It enrolled 2,728 patients in 2025 and passed 70,000 cumulative registrations. Core funding comes from the National Cancer Center's research and development funds, currently grant 2026-J-03, supplemented by AMED. It ran its first physician-initiated regulatory trial in 2007, its first international trial in 2008, and its first advanced-medical-care trial in 2013.",
    links: [JCOG_REPORT, { label: "JCOG history (沿革)", url: "https://jcog.jp/profile/history/" }, { label: "JCOG (English)", url: "https://jcog.jp/en/" }],
  },
  {
    id: "genomic",
    title: "Genomic medicine built as public infrastructure, not a market",
    plain: "Japan built comprehensive tumour sequencing as a public system. The government designated core hospitals, aimed to provide the test under the national insurance, and set up one national centre to gather and hold the genomic and clinical information.",
    detail: "A government consortium convened by the health ministry reported on 27 June 2017; eleven core hospitals were designated in February 2018 alongside 100 cooperating hospitals, with insured genomic care targeted for the 2019 financial year. From 1 November 2026 the ministry lists 13 cancer genomic medicine core hub hospitals, 32 hub hospitals and 263 cooperating hospitals. The Center for Cancer Genomics and Advanced Therapeutics at the National Cancer Center was set up with state funding to receive genomic and clinical information from the core and cooperating hospitals, hold it, and return a report with clinical annotation to the core hospitals. Alongside it the National Cancer Center Hospital East hosts SCRUM-Japan, which describes itself as a nationwide cancer genome screening project run by hospitals and drug companies together; its site, read on 17 November 2026, lists two projects, LC-SCRUM-Asia for lung cancer and MONSTAR-SCREEN for other solid and blood cancers.",
    links: [
      { label: "C-CAT: background and role (設立の背景と役割)", url: "https://www.ncc.go.jp/jp/c_cat/about/070/index.html" },
      KYOTEN,
      { label: "SCRUM-Japan", url: "https://www.scrum-japan.ncc.go.jp/" },
    ],
  },
  {
    id: "system",
    title: "The law, the plan and the 468 designated hospitals",
    plain: "Japan legislated for cancer control in 2006 and has run a rolling national plan ever since. The plan is delivered through a network of hospitals the ministry designates, so that the standard of care does not depend on which prefecture a person lives in.",
    detail: "The Cancer Control Act, Act No. 98 of 2006, passed in June 2006 and in force from April 2007 with an amendment in December 2016, requires a Basic Plan to Promote Cancer Control reviewed at least every six years, with matching prefectural plans. The fourth plan, a cabinet decision of 28 March 2023, keeps the three pillars of prevention, treatment and living with cancer under the overall goal of cancer control that leaves nobody behind. As at 1 April 2026 the ministry designates 468 hospitals in all: 51 prefectural cancer care hub hospitals, 357 regional hub hospitals of which 11 are of a special type, 1 specific-domain hub and 59 regional cancer hospitals. Fifteen paediatric cancer hub hospitals and 2 central paediatric organisations were designated as at 1 April 2023.",
    links: [PLAN4, KYOTEN, { label: "Cancer Control Act and the structure it creates (がん対策基本法)", url: "https://www.mhlw.go.jp/content/10900000/001161234.pdf" }],
  },
  {
    id: "oncologists",
    title: "1,825 medical oncologists for 993,469 new cancers a year",
    plain: "Medical oncology is a young specialty in Japan. The first board-certified cancer drug therapy specialists were certified in 2006, forty-seven of them, and there were 1,825 in April 2025 against a national diagnosis count near a million. The society's president has set a target of 5,000.",
    detail: "The Japanese Society of Medical Oncology began as a study group in August 1993, became a society in March 2002 with 669 members, passed 1,000 members in 2003 and 5,000 in 2006, and became a public interest incorporated association in June 2015. Its specialist certification system was created in March 2002, certified its first 47 cancer drug therapy specialists in April 2006, opened its first renewal cycle in 2010, was recognised as a sub-specialty by the Japanese Medical Specialty Board in June 2018 and began its new training programme in 2022. Takayuki Yoshino of the National Cancer Center Hospital East, the society's seventh president from 28 March 2026 to 10 March 2028, writes in his inaugural address that 1,825 specialists were certified as at 1 April 2025 and sets a target of 5,000, naming workforce shortage, drug lag and drug loss, and regional inequality in provision among the problems the society still has to solve.",
    links: [{ label: "JSMO history (学会の歩み)", url: "https://www.jsmo.or.jp/members/about/history/" }, { label: "JSMO president's greeting (理事長挨拶)", url: "https://www.jsmo.or.jp/members/about/greeting/" }],
  },
];

/** Where Japanese evidence and Western practice part company, and why. */
export const JP_DIVERGENCE: CountryCard[] = [
  {
    id: "staging",
    title: "The same stages as the West, but the operation is defined by numbered node stations",
    plain: "Japan has its own classification of stomach cancer. Its stages are now identical to the international TNM system, but it also numbers the lymph node stations around the stomach, and the Japanese guidelines define how far a surgeon should go by which stations are removed.",
    detail: "The Japanese Classification of Gastric Carcinoma, maintained by the Japanese Gastric Cancer Association, numbers the regional node stations. The 2021 treatment guidelines say their T, N, M and stage descriptions follow the 15th edition of that classification, which they describe as identical to the 8th edition of the UICC TNM classification. What remains particular to Japan is the definition of the operation: the guidelines define D1, D1+ and D2 dissection by which numbered stations are cleared for each type of gastrectomy, so a Japanese paper reporting a D2 gastrectomy is describing an anatomical extent. The guidelines also carry an endoscopic curability (eCura) assessment, which decides who needs an operation after an endoscopic resection.",
    links: [{ label: "Japanese gastric cancer treatment guidelines 2021, 6th edition (Gastric Cancer 2023)", url: "https://doi.org/10.1007/s10120-022-01331-8" }, { label: "Japanese Gastric Cancer Association", url: "http://www.jgca.jp/" }],
  },
  {
    id: "surgery",
    title: "More surgery, and the Japanese trials that found the limit of it",
    plain: "Gastrectomy with D2 lymph node dissection is the standard operation for curable stomach cancer in eastern Asia. Japan tested whether going further helped, and found that it did not.",
    detail: "JCOG9501 randomised 523 patients with curable T2b, T3 or T4 gastric cancer at 24 Japanese hospitals between 1995 and 2001 to D2 lymphadenectomy alone or D2 plus para-aortic nodal dissection, with no adjuvant therapy permitted before recurrence. Adding the para-aortic dissection did not improve survival (five-year overall survival 70.3 against 69.2 percent), and surgery-related complications ran at 28.1 against 20.9 percent, a difference that was not statistically significant (P=0.07). D2 was already the standard in eastern Asia when the trial began; the trial tested a larger operation against it. A reader meeting a Japanese surgical trial should expect the comparison to be between two extents of a radical operation, not between operating and not operating.",
    links: [{ label: "D2 lymphadenectomy alone or with para-aortic nodal dissection for gastric cancer, JCOG9501 (NEJM 2008)", url: "https://doi.org/10.1056/NEJMoa0707035" }],
  },
  {
    id: "adjuvant",
    title: "A different backbone drug, so a different adjuvant standard",
    plain: "Japan's standard chemotherapy after stomach or pancreas surgery is built on S-1, an oral fluoropyrimidine developed in Japan. The Western standard is built on infused fluorouracil regimens. Two countries can have different standards of care for the same disease and both be following their own good randomised evidence.",
    detail: "ACTS-GC randomised 1,059 patients in Japan with stage II or III gastric cancer resected with D2 dissection to a year of S-1 at 80 mg per square metre per day or to surgery alone, and was stopped early at the first interim analysis for benefit. The 2021 Japanese guidelines recommend a year of S-1 after surgery for pathological stage II disease and combination regimens for stage III. JASPAC 01, already in this corpus, tested S-1 against gemcitabine after resection of pancreatic cancer. Western guidelines rest on different trials run in different populations, which is how the two can differ while each follows its own randomised evidence.",
    links: [{ label: "Adjuvant chemotherapy for gastric cancer with S-1, ACTS-GC (NEJM 2007)", url: "https://doi.org/10.1056/NEJMoa072252" }],
  },
  {
    id: "dose",
    title: "The Japanese dose: mostly a myth, and occasionally real",
    plain: "It is often said that Japanese patients need lower doses. For modern targeted drugs that turns out not to be true: the doses chosen in Japan and in the West are almost always the same. Where the difference is real it has a pharmacological explanation, and S-1 is the clearest case.",
    detail: "A study of 17 single-agent molecularly targeted drugs approved in both North America or Europe and Asia between 2001 and 2015 found the recommended phase 2 dose identical across regions in 14 of 17, with differences that were not clinically meaningful, and the final approved dose identical in every case; a parallel first-in-human study of the same drug in the United States and Japan found comparable pharmacokinetics and toxicity. S-1 is the exception that has a mechanism behind it: a prospective comparison in East Asian and Caucasian patients found similar 5-fluorouracil exposure at the same dose, but higher tegafur and gimeracil exposure in East Asians, higher fluoro-beta-alanine in Caucasians, and grade 3 or 4 gastrointestinal toxicity in 21 percent of Caucasians against none of the East Asians. A reader who sees a Japanese trial using a dose their own guideline does not recognise should look for a pharmacokinetic reason before assuming a cultural one.",
    links: [
      { label: "Impact of race on dose selection of molecular-targeted agents in early-phase oncology trials (Br J Cancer 2018)", url: "https://doi.org/10.1038/s41416-018-0102-1" },
      { label: "Pharmacokinetics and pharmacodynamics of S-1 in Caucasian and East Asian patients (Cancer Sci 2011)", url: "https://doi.org/10.1111/j.1349-7006.2010.01793.x" },
    ],
  },
  {
    id: "reversals",
    title: "Japanese trials that tested standards set elsewhere",
    plain: "The traffic is not one way. Several Japanese trials have tested, and in places contradicted, practice built on earlier trials elsewhere.",
    detail: "JCOG0802 randomised 1,106 patients with a peripheral non-small-cell lung cancer of 2 cm or less to segmentectomy or lobectomy and found overall survival better after the smaller operation; a later post-hoc analysis of the pure-solid tumours found more local recurrence after segmentectomy and called for more research on who should have it. A Japanese multicentre trial of prophylactic cranial irradiation in extensive-stage small-cell lung cancer, run with MRI surveillance rather than without it, found no survival benefit, against an earlier phase 3 trial that had not required brain imaging before enrolment; its authors concluded that the irradiation is not essential when patients have regular MRI. JCOG0403, a prospective trial, concluded that stereotactic body radiotherapy can be considered a standard treatment for inoperable stage I lung cancer and is promising as an alternative to surgery for operable patients. Kuma Hospital's cohort of papillary thyroid microcarcinoma under active surveillance is in the corpus as a key paper below; this card cites no source for its influence abroad.",
    links: [
      { label: "JCOG0802/WJOG4607L pure-solid supplemental analysis (Lancet Respiratory Medicine 2024)", url: "https://doi.org/10.1016/S2213-2600(23)00382-X" },
      { label: "Prophylactic cranial irradiation versus observation in extensive-disease small-cell lung cancer (Lancet Oncology 2017)", url: "https://doi.org/10.1016/S1470-2045(17)30230-9" },
      { label: "JCOG0403: stereotactic body radiotherapy for operable and inoperable T1N0M0 non-small-cell lung cancer (IJROBP 2015)", url: "https://doi.org/10.1016/j.ijrobp.2015.07.2278" },
    ],
  },
];

/** What we could not source, and what Japan does not publish in a form we could read. */
export const JP_GAPS: CountryCard[] = [
  {
    id: "gaps",
    title: "What this page could not establish",
    plain: "Several things a reader would want are either not published where we looked, or published in a form we could not read automatically.",
    detail: "jRCT, the national clinical trials register, asks users not to gather its data in bulk by automated means, so the number of oncology studies registered there is not quoted here and the corpus's trial counts continue to come from ClinicalTrials.gov, which undercounts Japan. The C-CAT page linked below gave no count of registered cases when read on 17 November 2026, so none is quoted here. The National Cancer Center's screening uptake page renders its figures as charts, so the percentages here come from the underlying Comprehensive Survey of Living Conditions rather than from the page. Uptake of the municipal programmes alone is published in a separate annual report we did not read; the survey figures here also count workplace screening. The cost of particle therapy under the advanced medical care scheme is set per facility and we found no consolidated national figure. The specialist count here comes from the society president's address, not from a register of specialists, which we did not read.",
    links: [
      { label: "jRCT terms of use notice", url: "https://jrct.mhlw.go.jp/" },
      { label: "C-CAT: about the centre", url: "https://www.ncc.go.jp/jp/c_cat/about/index.html" },
      { label: "National Cancer Center: screening uptake charts", url: "https://ganjoho.jp/reg_stat/statistics/stat/screening/screening.html" },
    ],
  },
  {
    id: "missing-records",
    title: "Records that should be in this corpus and are not",
    plain: "Naming the holes is part of the job. These are Japanese trials, organisations and datasets that belong in OnCo and do not yet have a record.",
    detail: "Trials: JCOG9501 (D2 with or without para-aortic dissection), ACTS-GC (adjuvant S-1 in gastric cancer), JCOG0607 (expanded indications for endoscopic submucosal dissection), JCOG0912 (laparoscopic distal gastrectomy, whose paper is in the corpus without the trial), JCOG1109 NExT (neoadjuvant therapy in oesophageal cancer), JCOG0212 (lateral pelvic lymph node dissection in rectal cancer) and HERB / NCCH1805 (trastuzumab deruxtecan in biliary tract cancer, again a paper without a trial). Organisations: AMED, the Center for Cancer Genomics and Advanced Therapeutics, the Japanese Gastric Cancer Association, the Japan Gastroenterological Endoscopy Society, and the carbon-ion centres at Saga, Osaka and Yamagata as records of their own (Kanagawa's is a facility of Kanagawa Cancer Center, which has a record). Collections: jRCT and UMIN-CTR as registry records alongside ClinicalTrials.gov, and the national cancer registry itself. SCRUM-Japan exists in the corpus only as a programme line on its host institution.",
    links: [{ label: "Suggest a record or a correction", url: "/suggest/" }],
  },
];

/** The five national screening programmes, from the MHLW guidance revised 24 December 2025 and the 2022 survey. */
export type ScreeningRow = { id: string; cancer: string; test: string; age: string; interval: string; uptake: string; cancerIds: string[] };
export const JP_SCREENING_PROGRAMME: ScreeningRow[] = [
  { id: "stomach", cancer: "Stomach", test: "Questionnaire plus barium photofluorography or upper endoscopy, the person's choice where both are offered", age: "50 and over; barium may be offered from 40 for the time being", interval: "Every 2 years; barium may be annual for the time being", uptake: "Men 53.7%, women 43.5% (2 years, aged 50-69)", cancerIds: ["gastric"] },
  { id: "cervix", cancer: "Cervix", test: "Questionnaire, inspection, cervical cytology and bimanual examination; or HPV test alone with cytology triage", age: "20 and over; HPV-alone from 30", interval: "Every 2 years; HPV-alone every 5 years at milestone ages", uptake: "43.6% (2 years, aged 20-69)", cancerIds: ["cervical"] },
  { id: "lung", cancer: "Lung", test: "Questionnaire and chest radiography, double-read", age: "40 and over", interval: "Annual", uptake: "Men 53.2%, women 46.4% (1 year, aged 40-69)", cancerIds: ["nsclc", "sclc"] },
  { id: "breast", cancer: "Breast", test: "Questionnaire and mammography; clinical breast examination explicitly not recommended", age: "40 and over, women", interval: "Every 2 years", uptake: "47.4% (2 years, aged 40-69)", cancerIds: ["breast-hr-positive", "breast-her2-positive", "tnbc"] },
  { id: "colorectal", cancer: "Bowel", test: "Questionnaire and two-day immunochemical faecal occult blood test", age: "40 and over", interval: "Annual", uptake: "Men 49.1%, women 42.8% (1 year, aged 40-69)", cancerIds: ["colorectal"] },
];

/**
 * Five-year relative survival by clinical extent for cases diagnosed in 2018, both sexes, from the national cancer
 * registry survival file. Percentages of cases and survival percentages as published; the residual to 100 percent of
 * the three extent shares is the "extent unknown" group.
 */
export type StageRow = { id: string; site: string; localPct: number; localSurv: number; regionalPct: number; regionalSurv: number; distantPct: number; distantSurv: number; cancerIds: string[] };
export const JP_STAGE: StageRow[] = [
  { id: "all", site: "All sites", localPct: 46.0, localSurv: 91.2, regionalPct: 23.0, regionalSurv: 62.2, distantPct: 18.9, distantSurv: 19.4, cancerIds: [] },
  { id: "stomach", site: "Stomach", localPct: 57.3, localSurv: 94.0, regionalPct: 18.2, regionalSurv: 50.4, distantPct: 18.1, distantSurv: 7.0, cancerIds: ["gastric"] },
  { id: "colorectal", site: "Colorectum", localPct: 45.6, localSurv: 94.3, regionalPct: 28.4, regionalSurv: 74.5, distantPct: 19.1, distantSurv: 17.6, cancerIds: ["colorectal"] },
  { id: "liver", site: "Liver and intrahepatic bile duct", localPct: 59.2, localSurv: 52.5, regionalPct: 11.4, regionalSurv: 11.0, distantPct: 12.8, distantSurv: 2.9, cancerIds: ["hcc"] },
  { id: "lung", site: "Lung", localPct: 31.3, localSurv: 81.1, regionalPct: 19.4, regionalSurv: 39.3, distantPct: 38.8, distantSurv: 11.7, cancerIds: ["nsclc"] },
  { id: "breast", site: "Breast (women)", localPct: 58.7, localSurv: 99.1, regionalPct: 25.6, regionalSurv: 90.0, distantPct: 6.5, distantSurv: 42.5, cancerIds: ["breast-hr-positive", "breast-her2-positive", "tnbc"] },
  { id: "prostate", site: "Prostate", localPct: 59.9, localSurv: 100, regionalPct: 16.9, regionalSurv: 98.7, distantPct: 12.6, distantSurv: 55.9, cancerIds: ["prostate"] },
  { id: "pancreas", site: "Pancreas", localPct: 15.9, localSurv: 42.4, regionalPct: 29.1, regionalSurv: 15.9, distantPct: 46.3, distantSurv: 2.2, cancerIds: ["pancreatic"] },
];

/**
 * Monthly out-of-pocket ceilings under the high-cost medical expense benefit, for people under 70, in yen.
 * `now` is the rule that applied from August 2018 to July 2026 (the field name is historical); `from2026` and `annual2026` are the figures published with the
 * December 2025 reform for August 2026 to July 2027. `multi` is the reduced ceiling from the fourth qualifying
 * month in twelve, which the reform holds at its current level.
 */
export type CeilingRow = { id: string; band: string; now: string; multi: string; from2026: string; annual2026: string };
export const JP_CEILINGS: CeilingRow[] = [
  { id: "a", band: "Above about ¥11.6 million a year", now: "¥252,600 + 1% of the bill above ¥842,000", multi: "¥140,100", from2026: "¥270,300 + 1% above ¥901,000", annual2026: "¥1,680,000" },
  { id: "b", band: "About ¥7.7 to ¥11.6 million", now: "¥167,400 + 1% above ¥558,000", multi: "¥93,000", from2026: "¥179,100 + 1% above ¥597,000", annual2026: "¥1,110,000" },
  { id: "c", band: "About ¥3.7 to ¥7.7 million", now: "¥80,100 + 1% above ¥267,000", multi: "¥44,400", from2026: "¥85,800 + 1% above ¥286,000", annual2026: "¥530,000" },
  { id: "d", band: "Up to about ¥3.7 million", now: "¥57,600", multi: "¥44,400", from2026: "¥61,500", annual2026: "¥530,000" },
  { id: "e", band: "Exempt from residence tax", now: "¥35,400", multi: "¥24,600", from2026: "¥36,900", annual2026: "¥290,000" },
];

/** Entity ids to render from the graph, in display order. Missing ids are skipped at render time. */
export const JP_INSTITUTIONS = ["ncc-japan", "ncc-hospital-east", "jfcr", "osaka-international-cancer-institute", "aichi-cancer-center", "shizuoka-cancer-center", "keio-university-hospital", "kyoto-university-hospital", "osaka-university", "kyushu-university-hospital", "tohoku-university-hospital", "hokkaido-university-hospital", "kindai-university-hospital", "qst-hospital", "gunma-heavy-ion-medical-center", "jsmo", "pmda"];
export const JP_COMPANIES = ["daiichi-sankyo", "takeda", "astellas", "eisai", "chugai", "otsuka", "taiho", "taiho-oncology", "sumitomo-pharma", "shionogi", "kyowa-kirin", "nippon-kayaku", "kissei", "zeria", "nobelpharma", "symbio-pharmaceuticals", "delta-fly-pharma", "stella-pharma", "sbi-pharmaceuticals", "takara-bio", "toray-industries", "cellseed", "olympus", "fujifilm", "fujifilm-diosynth", "pentax-medical", "canon-medical", "shimadzu", "hamamatsu", "hitachi", "sumitomo-heavy-industries", "toshiba-energy-systems", "fujirebio", "sakura-finetek", "jcog", "wjog"];
export const JP_TRIALS = ["jcog0403", "jcog0802", "jaspac-01", "ascot-jcog1202", "create-x", "j-alex", "paradigm", "triumph", "circulate-japan", "destiny-gastric01", "takahashi-pci", "jrosg-99-1"];
export const JP_PAPERS = ["paper-gotoda-endoscopic-resection-criteria-gastric-cancer-2000", "paper-japanese-gastric-cancer-treatment-guidelines-2021-gastric-cancer-2023", "paper-jcog0912-katai-lancet-gastroenterol-hepatol-2020", "paper-nagata-int-j-radiat-oncol-biol-phys", "paper-takahashi-lancet-oncol", "paper-create-x-adjuvant-capecitabine-nejm-2017", "paper-paradigm-jama-2023", "paper-galaxy-signatera-nat-med-2023", "paper-destiny-gastric01-nejm-2020", "paper-ohba-herb-trastuzumab-deruxtecan-biliary-jco-2024", "paper-ito-kuma-active-surveillance-microcarcinoma-thyroid-2014", "paper-remora-lenvatinib-thymic-carcinoma-lancet-oncol-2020", "paper-hayashi-site-specific-vs-empirical-chemotherapy-cup-jco-2019", "paper-nakamura-anti-pd1-acral-melanoma-ann-oncol-2020", "paper-nakamura-biliary-genomic-spectra-nat-genet-2015", "paper-jshbps-biliary-tract-cancer-guidelines-2019-jhbps-2021", "paper-nct05101096-int-j-clin-oncol-2024"];
export const JP_PEOPLE = ["tasuku-honjo", "shimon-sakaguchi", "nakagama-hitoshi", "ohe-yuichiro", "yoshino-takayuki", "shitara-kohei", "doi-toshihiko", "goto-koichi", "yamamoto-noboru", "yonemori-kan", "ken-kato", "kohno-takashi", "fukuda-haruhiko", "hitoshi-katai", "sano-takeshi", "kitagawa-yuko", "yuichiro-doki", "masatoshi-kudo", "takahashi-shunji", "ohno-shinji", "ueno-takayuki", "hidetoshi-hayashi", "nobuyuki-yamamoto", "tatsuya-ohno", "hitoshi-ishikawa", "katsuhiko-uesaka", "nariaki-matsuura", "yasumasa-niwa", "akifumi-takaori", "koichi-fukunaga", "takashi-kamei", "yasuharu-nakashima", "yasuyuki-nasuhara", "yasuhiro-fujiwara"];
