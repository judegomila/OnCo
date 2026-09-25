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
 *  - incidence  全国がん登録 (national cancer registry), diagnoses in 2023, published March 2026
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
    plain: "Every hospital in Japan, and every clinic that opts in, has to notify each new cancer to its prefecture, which passes it to the national register. That is a legal duty, not a survey, so Japan's incidence figures are counts rather than estimates. The register publishes diagnoses about two and a half years behind, and the death figures come from a separate system.",
    detail: "The Act on Promotion of Cancer Registration put a single national register in place of the patchwork of regional registries that preceded it; its first year of data is 2016. Every medical institution that treats cancer notifies 26 items to the prefecture, which deduplicates and forwards to the National Cancer Center; about 850 designated hospitals additionally keep a 105-item hospital-based registry of their own cases. The 2023 diagnosis year, published in March 2026, records 993,469 new cancers: 556,059 in men and 437,406 in women, a crude rate of 798.9 per 100,000. Deaths are counted separately in the vital statistics: 384,111 cancer deaths in 2024, published in January 2026. Five-year relative survival for the 2018 diagnosis cohort, published in July 2026, is 64.8 percent overall, 63.2 percent in men and 66.8 percent in women. GLOBOCAN's estimate for Japan in 2022, which the table below renders, is 1,005,157 cases and 426,278 deaths, with an age-standardised incidence of 267.1 and mortality of 78.6 per 100,000: a lower age-standardised incidence than the United States on a far older population.",
    links: [
      GANJOHO,
      { label: "National Cancer Center: what the national cancer registry is (全国がん登録)", url: "https://ganjoho.jp/public/institution/registry/index.html" },
      { label: "Registry and vital statistics downloads (集計表ダウンロード)", url: "https://ganjoho.jp/reg_stat/statistics/data/dl/index.html" },
    ],
  },
  {
    id: "mix",
    title: "A different mix: stomach and liver cancer at rates the West does not see",
    plain: "Age for age Japan has a lower cancer rate than most of Western Europe, but the cancers are different ones. Stomach cancer is the third commonest cancer in the country and the fourth in men; it is a rarity in most Western registries. Liver cancer kills more people in Japan than breast cancer does.",
    detail: "The registry's 2023 diagnosis year records 104,864 stomach cancers, 71,135 in men and 33,729 in women, and 37,867 stomach cancer deaths in 2024. Liver and intrahepatic bile duct cancer accounts for 32,673 diagnoses and 22,465 deaths, against 103,424 breast cancers and 16,005 breast cancer deaths. Colorectal cancer is the largest single site with 154,039 diagnoses and 54,416 deaths; lung follows with 123,989 and 75,569; prostate has risen to 102,094 diagnoses; pancreatic cancer causes 41,235 deaths on 47,540 diagnoses. Five-year relative survival for the 2018 cohort separates them sharply: prostate 95.7 percent, breast 89.7, colorectal 69.9, stomach 66.1, lung 39.3, liver 35.2, pancreas 13.2. Stomach cancer survival of 66.1 percent, in a disease usually written about as lethal, is a statement about when it is found rather than about how it is treated.",
    links: [
      { label: "Stomach (胃) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/5_stomach.html" },
      { label: "Liver (肝臓) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/8_liver.html" },
      { label: "Colorectal (大腸) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/67_colorectal.html" },
      { label: "All sites (全がん) statistics", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/1_all.html" },
    ],
  },
  {
    id: "stage",
    title: "A screened population: most stomach cancers are found while they are still local",
    plain: "The clearest sign of what decades of screening have done is the stage at which cancer is found. Across all cancers 46 percent are confined to the organ they started in when they are diagnosed. For stomach cancer it is 57 percent, and nine in ten of those people are alive five years later.",
    detail: "The registry publishes five-year relative survival by clinical extent for the 2018 diagnosis cohort, excluding death-certificate-only cases, second primaries, in-situ disease and cases of unknown age or address. For all sites, 46.0 percent were localised (survival 91.2 percent), 23.0 percent regional (62.2), 18.9 percent distant (19.4) and 12.1 percent unknown. Stomach cancer is the outlier: 57.3 percent localised (94.0 percent survival), 18.2 percent regional (50.4), 18.1 percent distant (7.0). Lung cancer, which has only a chest radiograph behind it, is the mirror image: 31.3 percent localised and 38.8 percent distant. The lesson runs both ways. Where Japan screens well the stage distribution is extraordinary; where it does not, it looks like everywhere else.",
    links: [
      { label: "Five-year relative survival by clinical extent, 2018 diagnoses (全国がん登録生存率データ, xlsx)", url: "https://ganjoho.jp/reg_stat/statistics/data/dl/excel/cancer_survivalNCR(2016-2018).xlsx" },
      GANJOHO,
    ],
  },
  {
    id: "corpus",
    title: "What this corpus did not hold about Japan, and why",
    plain: "OnCo ranks countries from what it has read, and it reads English. Japan comes tenth in our count of institutions and eleventh in our count of people, but fifth in the world by indexed oncology papers. The composite score on the rankings page puts Japan twenty-seventh, and most of that gap is measurement rather than substance.",
    detail: "Three of the five terms in the ranking formula work against Japan for reasons that have nothing to do with Japanese oncology. Growth scores zero because Japan's indexed output is flat: 4,929 oncology works in 2021 against 4,604 in 2025. The trial term counts ClinicalTrials.gov registrations with a site in the country, and Japan's investigator-initiated trials register in jRCT or UMIN-CTR instead, so 9,840 is an undercount of a country that runs one of the world's oldest cooperative groups. The highly cited share, 2.84 percent against 4.35 percent for the United States, partly reflects a publication culture that puts a great deal of clinical work in Japanese-language and Japanese-domiciled journals that index and cite differently. What does not change with better reading: Japan's oncology output has not grown in five years while China's has risen by half.",
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
    plain: "About half of Japanese adults aged 40 to 69 have had each screen in the period it covers. That is short of the government's own target of 60 percent, and it has barely moved across the 2016, 2019 and 2022 surveys.",
    detail: "The 2022 Comprehensive Survey of Living Conditions, which asks people rather than counting municipal records and so includes workplace and opportunistic screening, found that in the previous year 47.5 percent of men and 36.5 percent of women aged 40 to 69 had a stomach screen, 53.2 and 46.4 percent a lung screen and 49.1 and 42.8 percent a bowel screen. Over the previous two years 53.7 percent of men and 43.5 percent of women aged 50 to 69 had a stomach screen, 43.6 percent of women aged 20 to 69 a cervical screen and 47.4 percent of women aged 40 to 69 a breast screen. The survey's own comment is that all of these are broadly flat. The Fourth Basic Plan to Promote Cancer Control sets 60 percent uptake for every guideline-based screen and 90 percent attendance at the follow-up examination when a screen is positive.",
    links: [KOKUMIN, { label: "National Cancer Center: screening uptake (がん検診受診率)", url: "https://ganjoho.jp/reg_stat/statistics/stat/screening/screening.html" }, PLAN4],
  },
  {
    id: "evidence",
    title: "What the evidence behind the stomach programme actually says",
    plain: "Japan grades its own screening tests and publishes the grades. Both the barium meal and the endoscopy carry a middling grade B: enough evidence that they reduce deaths from stomach cancer to recommend them, and not more. But the largest study behind that recommendation found the benefit only for endoscopy, not for the barium meal that most people are still offered. The blood tests people often ask for are graded as insufficient evidence either way.",
    detail: "The National Cancer Center's gastric screening guideline, 2014 edition, gives grade B to upper gastrointestinal radiography and grade B to upper endoscopy, both defined as having reasonable evidence of a reduction in mortality, and recommends endoscopy from 50 at an interval of two to three years. The 2005 edition had graded endoscopy I, insufficient evidence; the upgrade to B came with the 2014 edition, and the guideline page names as its confirming evidence a Korean nested case-control study in 16.6 million people. That study is worth reading closely, because it separates the two tests Japan offers: against never being screened, the odds of dying of gastric cancer were 0.53 (95 percent confidence interval 0.51 to 0.56) for endoscopic screening and 0.98 (0.95 to 1.01) for the upper gastrointestinal series, and the endoscopy benefit deepened with each additional screen. In other words the largest study behind the recommendation found a 47 percent mortality reduction for endoscopy and none for barium, while Japan grades both B and still allows barium annually from 40. The Japanese grade for barium rests on older Japanese case-control and cohort work rather than on this study, and the guideline has not been revised since 2014. The guideline gives grade I, insufficient evidence to judge whether mortality is reduced, to the pepsinogen method and to Helicobacter pylori antibody testing, alone or combined, and so does not recommend them for organised screening. The named harms are aspiration with high-density barium, and for endoscopy false positives, overdiagnosis, shock from the pharyngeal anaesthetic, perforation and bleeding. None of the evidence comes from randomised trials, which is why the grade is B and not A.",
    links: [
      { label: "National Cancer Center, gastric cancer screening guideline 2014 (胃がん検診ガイドライン)", url: "https://canscreen.ncc.go.jp/guideline/igan.html" },
      { label: "National Cancer Center, evidence-based cancer screening (科学的根拠に基づくがん検診推進のページ)", url: "https://canscreen.ncc.go.jp/" },
      { label: "Effectiveness of the Korean National Cancer Screening Program in reducing gastric cancer mortality (Gastroenterology 2017)", url: "https://doi.org/10.1053/j.gastro.2017.01.029" },
    ],
  },
  {
    id: "causes",
    title: "Treating the cause: Helicobacter since 2013, hepatitis since the 2000s",
    plain: "Screening finds cancer early. Japan has also spent two decades removing the two infections that cause most of its stomach and liver cancer. Since 2013 the health insurance pays to eradicate Helicobacter pylori in anyone with gastritis seen at endoscopy, which in practice means almost anyone who is infected. Hepatitis B and C testing and antiviral treatment are subsidised nationally.",
    detail: "In February 2013 insurance cover for Helicobacter eradication was extended from ulcer disease to endoscopically diagnosed chronic gastritis with a positive test. A descriptive national time-trend study published in Helicobacter in 2026 reports annual stomach cancer deaths falling from 48,427 in 2013 to 37,394 in 2024, a 25.2 percent fall in crude deaths, with the decline concentrated below age 80 while deaths above 80 continued to rise; the authors are explicit that an ecological trend cannot separate eradication from endoscopy, birth-cohort effects and falling infection prevalence. On the liver side the Fourth Basic Plan records hepatitis B surface antigen positivity of 0.54 percent and hepatitis C antibody positivity of 0.25 percent in the 2019 reporting year, against 0.87 and 0.60 percent in 2011.",
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
    plain: "Everyone in Japan belongs to a public health insurance scheme, chosen for them by their job and their age rather than by them. Every scheme covers the same treatments at the same nationally fixed prices, and the patient pays 30 percent of the bill at the counter, falling to 20 percent at 70 and 10 percent at 75 for most people.",
    detail: "The ministry describes the system by four features: everyone covered by public insurance, free choice of provider, high-quality care at low cost, and public money used to keep universal coverage running on a social insurance base. At the end of March 2023 it counted 1,716 National Health Insurance schemes with about 24.1 million members, one nationally managed employees' scheme with about 39.4 million, 1,383 company health insurance societies with about 28.2 million, 85 mutual aid associations with about 9.8 million, and 47 Latter-Stage Elderly schemes with about 19.1 million. Co-payment is 30 percent for adults under 70, 20 percent before compulsory school age, 20 percent from 70 to 74, and 10 percent from 75, with 30 percent for those on incomes comparable to the working population and 20 percent for certain others above an income threshold since October 2022. Patients paid 11.6 percent of national health expenditure in the 2022 financial year, about 5.4 trillion yen, against 50.0 percent from premiums and 37.9 percent from public funds. There is no deductible and no separate drug benefit: an approved cancer drug in an approved indication is covered on the same terms as an X-ray.",
    links: [IRYOUHOKEN, { label: "MHLW: the medical insurance system (医療保険制度)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken01/index.html" }],
  },
  {
    id: "ceiling",
    title: "The high-cost medical expense benefit: a monthly ceiling on what any illness can cost you",
    plain: "The part that changes a cancer diagnosis is the monthly ceiling. Whatever the treatment costs, a middle-income household under 70 pays at most about 80,000 yen in a month, and from the fourth month in a year of hitting the ceiling, 44,400 yen. The price of the drug does not enter into it.",
    detail: "The high-cost medical expense benefit refunds anything a person pays above a monthly ceiling set by age and income; hospital meals and the charge for a private room are excluded. The ministry's own worked example, for someone under 70 on 3.7 to 7.7 million yen a year paying 30 percent: a month of care costing 1,000,000 yen means 300,000 yen at the counter, a ceiling of 80,100 yen plus 1 percent of the amount above 267,000 yen, so 87,430 yen, and 212,570 yen refunded. Households can add members' bills together in a month, and after three qualifying months in twelve the ceiling falls to 44,400 yen for the two middle bands. For inpatient care the ceiling is applied at the counter rather than reclaimed afterwards, and since April 2012 the same applies to outpatient care at a single institution. The ceilings in the table below are those in force from August 2018.",
    links: [KOUGAKU, IRYOUHOKEN, { label: "MHLW: high-cost medical expense benefit (高額療養費制度)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html" }],
  },
  {
    id: "reform",
    title: "The ceilings are going up in August 2026, and an annual cap is arriving with them",
    plain: "After a public row in 2025 the government settled a package in December 2025: monthly ceilings rise from August 2026, but the reduced ceiling for people who are ill month after month is frozen, and a new yearly cap is added so that people who never quite reach the monthly ceiling stop paying once they reach the annual one.",
    detail: "The expert committee on the future of the benefit reported on 16 December 2025 and the ministry published the resulting figures. For the 3.7 to 7.7 million yen band under 70, the monthly ceiling becomes 85,800 yen plus 1 percent of the amount above 286,000 yen from August 2026, against 80,100 yen plus 1 percent above 267,000 yen now, with the multiple-month figure held at 44,400 yen and a new annual cap of 530,000 yen. The top band moves to 270,300 yen plus 1 percent above 901,000 yen with an annual cap of 1,680,000 yen; the residence-tax-exempt band moves to 36,900 yen a month with an annual cap of 290,000 yen. Income bands are subdivided further from August 2027, and households under about 2 million yen a year get a lower multiple-month figure. The stated principle is that no one in long-term treatment should pay more than they do now.",
    links: [KOUGAKU_2026],
  },
  {
    id: "outside",
    title: "What the insurance does not pay for, and the rule that makes that expensive",
    plain: "Japan does not normally let you mix insured and uninsured care in the same course of treatment. The sanctioned exception is a list of 74 named advanced techniques: you pay the whole fee for the technique, and everything around it stays insured. That is how particle therapy outside its approved indications is paid for.",
    detail: "Advanced medical care is one of the evaluation treatments the minister designates under the 2006 amendment to the Health Insurance Act, for techniques being assessed for future insurance cover; a hospital meeting the facility standard for a given technique may notify and then combine it with insured care. There were 74 such techniques in August 2026. The money works like this, in the ministry\'s own worked example: on a course costing 1,000,000 yen of which 200,000 yen is the advanced technique fee, the patient pays that 200,000 yen in full, and of the remaining 800,000 yen of ordinary consultations, tests, drugs and bed charges the insurance pays 70 percent, 560,000 yen, leaving a 240,000 yen co-payment to which the high-cost medical expense ceiling then applies. Particle therapy has crossed from this list into insured care indication by indication over a decade, and the facility-level register in the section below still shows an advanced-medicine column of patients paying the technique fee themselves alongside the insured column. Private rooms, hospital meals above a set contribution and unapproved drugs sit outside cover altogether, which is what the drug loss section is about in money terms.",
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
    detail: "The agency's own performance report for the year to March 2025 gives the total review time for new drugs at the 80th percentile as 8.9 months for priority items, against a planned 9 months, and 12.0 months for standard items against a planned 12. Products with a Sakigake designation are held to 6 months; the one that reported was approved in 4.8 months. Priority items were 29.6 percent of the year's approvals. Because the target is a percentile of total elapsed time rather than a regulator-side clock, it is a harder measure than the review clocks quoted by some other agencies, and it makes the company's responsiveness part of the score.",
    links: [PMDA_REPORT],
  },
  {
    id: "lag",
    title: "The drug lag: a real gap, largely closed, and measured",
    plain: "For most of the 2000s a cancer drug reached Japanese patients years after American ones. That gap has been measured repeatedly and it has shrunk from more than two years to a few months. What closed it was not faster review: it was Japanese patients being in the trial in the first place, and the company filing in both countries at once.",
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
    plain: "Japan treated the world's first patient with carbon ions in 1994 and has been building particle therapy centres ever since. There are now 25 of them, seven able to deliver carbon ions, and they registered 12,110 patients in the year to March 2026. The national insurance pays for a growing list of indications.",
    detail: "The particle therapy foundation's facility register, updated in September 2026, lists 25 operating centres: 6 carbon-ion, 18 proton and one that does both, with a nineteenth proton centre suspended from March 2026. Its patient table runs from the first 21 patients treated at the Heavy Ion Medical Accelerator in Chiba in the 1994 financial year to 12,110 in the 2025 financial year, 122,314 in total, of whom 333 came from abroad. QST Hospital in Chiba has treated 17,812, the Kyushu International Heavy Ion Center in Saga 11,925, Gunma University 8,856 and the National Cancer Center Hospital East 5,726. Gunma University's indication pages, written for referring doctors, list which of those indications the insurance now pays for: localised prostate cancer; bone and soft tissue tumours, non-squamous carcinomas and squamous carcinoma of the nasal cavity, paranasal sinuses or external auditory canal in the head and neck; hepatocellular carcinoma of 4 cm or more not suitable for radical resection; intrahepatic cholangiocarcinoma not suitable for radical resection; stage I to IIA early lung cancer of 5 cm or less not suitable for radical resection; postoperative recurrence of colorectal cancer not suitable for radical resection; bone and soft tissue tumours not suitable for radical resection, including paediatric ones such as osteosarcoma; and, most recently, pancreatic cancer not suitable for radical resection. The rest of the list, including skull base tumours, locally advanced cervical cancer and oesophageal cancer, is delivered as advanced medical care under the unified indications and treatment policy written by the Japanese Society for Radiation Oncology, and paid for by the patient.",
    links: [ANTM, ANTM_PATIENTS, { label: "Gunma University Heavy Ion Medical Center: indications and insurance cover (重粒子線治療の適応となる疾患)", url: "https://heavy-ion.showa.gunma-u.ac.jp/page.php?id=9" }],
  },
  {
    id: "endoscopy",
    title: "Finding and removing early stomach cancer through the endoscope",
    plain: "Japan invented the operation that removes an early stomach cancer from inside the stomach, and the rules for deciding when it is safe. That only works in a country that finds stomach cancers early enough to be removable that way, which is what the screening programme delivers.",
    detail: "The criteria came from a study of 5,265 patients operated on at two Japanese centres, which established which early gastric cancers carry no measurable risk of lymph node spread and can therefore be cured by removing the mucosa alone. Endoscopic submucosal dissection turned that into a routine operation, and the Japanese Gastric Cancer Association's treatment guidelines, whose sixth edition appeared in English in 2023, define the curability categories that decide who needs surgery afterwards. The ministry's screening guidance requires stomach endoscopy to follow the manual of the Japanese Society of Gastroenterological Cancer Screening and to be double-read. The instruments are Japanese too: Olympus, Fujifilm and Pentax Medical, whose records sit in the company list below, make the endoscopes the rest of the world uses.",
    links: [
      { label: "Incidence of lymph node metastasis from early gastric cancer, 5,265 patients (Gastric Cancer 2000)", url: "https://doi.org/10.1007/PL00011720" },
      { label: "Japanese gastric cancer treatment guidelines 2021, 6th edition (Gastric Cancer 2023)", url: "https://doi.org/10.1007/s10120-022-01331-8" },
      SHISHIN,
    ],
  },
  {
    id: "jcog",
    title: "JCOG: a publicly funded trials group that has been running since 1978",
    plain: "The Japan Clinical Oncology Group is the reason so many Japanese standards of care rest on randomised evidence. It is not a company consortium: it is paid for out of national cancer research funds, it runs the trials industry will not pay for, and it has enrolled more than 70,000 patients.",
    detail: "JCOG began in 1978 as a health ministry research group on multimodal cancer treatment, took its present name in 1990, and set up its statistics centre, now the JCOG Data Center, in 1991. Its evaluation committee report for 2026 records 16 disease-specific groups, 107 trials of which 42 are enrolling, 186 participating medical institutions covering 804 departments, and a central support structure of 55 staff split between the National Cancer Center Hospital's clinical research support division and the non-profit Cancer Research Organization. It enrolled 2,728 patients in 2025 and passed 70,000 cumulative registrations. Core funding comes from the National Cancer Center's research and development funds, currently grant 2023-J-03, supplemented by AMED. It ran its first physician-initiated regulatory trial in 2007, its first international trial in 2008, and its first advanced-medical-care trial in 2013.",
    links: [JCOG_REPORT, { label: "JCOG history (沿革)", url: "https://jcog.jp/profile/history/" }, { label: "JCOG (English)", url: "https://jcog.jp/en/" }],
  },
  {
    id: "genomic",
    title: "Genomic medicine built as public infrastructure, not a market",
    plain: "Japan did not let comprehensive tumour sequencing grow up commercially. It designated a small number of hospitals, put the test on the national insurance, and required that every insured test's result and clinical record go into one government database.",
    detail: "A government consortium convened by the health ministry reported on 27 June 2017; eleven core hospitals were designated in February 2018 alongside 100 cooperating hospitals, with insured genomic care targeted for the 2019 financial year. From 1 October 2026 the ministry lists 13 cancer genomic medicine core hub hospitals, 32 hub hospitals and 262 cooperating hospitals. The Center for Cancer Genomics and Advanced Therapeutics at the National Cancer Center collects the panel result and the matching clinical record for every insured test, with the patient's individual consent, and returns an annotated report to the treating hospital. Alongside it the National Cancer Center Hospital East runs SCRUM-Japan, the industry-funded nationwide screening platform whose GI-SCREEN, LC-SCRN, MONSTAR-SCREEN and CIRCULATE-Japan arms feed the trials in the list below.",
    links: [
      { label: "C-CAT: background and role (設立の背景と役割)", url: "https://www.ncc.go.jp/jp/c_cat/about/070/index.html" },
      KYOTEN,
      { label: "SCRUM-Japan", url: "https://www.scrum-japan.ncc.go.jp/" },
    ],
  },
  {
    id: "system",
    title: "The law, the plan and the 468 designated hospitals",
    plain: "Japan legislated for cancer control in 2006 and has run a rolling national plan ever since. The plan is delivered through a network of hospitals the ministry designates and inspects, so that the standard of care does not depend on which prefecture a person lives in.",
    detail: "The Cancer Control Act, Act No. 98 of 2006, passed in June 2006 and in force from April 2007 with an amendment in December 2016, requires a Basic Plan to Promote Cancer Control reviewed at least every six years, with matching prefectural plans. The fourth plan, a cabinet decision of 28 March 2023, keeps the three pillars of prevention, treatment and living with cancer under the overall goal of cancer control that leaves nobody behind. As at 1 April 2026 the ministry designates 468 hospitals in all: 51 prefectural cancer care hub hospitals, 357 regional hub hospitals of which 11 are of a special type, 1 specific-domain hub and 59 regional cancer hospitals. Fifteen paediatric cancer hub hospitals and 2 central paediatric organisations were designated as at 1 April 2023.",
    links: [PLAN4, KYOTEN, { label: "Cancer Control Act and the structure it creates (がん対策基本法)", url: "https://www.mhlw.go.jp/content/10900000/001161234.pdf" }],
  },
  {
    id: "oncologists",
    title: "1,825 medical oncologists for 993,469 new cancers a year",
    plain: "Medical oncology is a young specialty in Japan. The first board-certified cancer drug therapy specialists were certified in 2006, forty-seven of them, and there were 1,825 in April 2025 against a national diagnosis count near a million. Most cancer drug treatment in Japan is given by organ specialists: gastroenterologists, respiratory physicians, breast and gastrointestinal surgeons.",
    detail: "The Japanese Society of Medical Oncology began as a study group in August 1993, became a society in March 2002 with 669 members, passed 1,000 members in 2003 and 5,000 in 2006, and became a public interest incorporated association in June 2015. Its specialist certification system was created in March 2002, certified its first 47 cancer drug therapy specialists in April 2006, opened its first renewal cycle in 2010, was recognised as a sub-specialty by the Japanese Medical Specialty Board in June 2018 and began its new training programme in 2022. Takayuki Yoshino of the National Cancer Center Hospital East, the society's seventh president from 28 March 2026 to 10 March 2028, writes in his inaugural address that 1,825 specialists were certified as at 1 April 2025 and sets a target of 5,000, naming workforce shortage, drug lag and drug loss, and regional inequality in provision as the society's three unsolved problems. This is worth holding in mind when reading a Japanese trial: the investigator is often a surgeon or an organ physician, and the design reflects that.",
    links: [{ label: "JSMO history (学会の歩み)", url: "https://www.jsmo.or.jp/members/about/history/" }, { label: "JSMO president's greeting (理事長挨拶)", url: "https://www.jsmo.or.jp/members/about/greeting/" }],
  },
];

/** Where Japanese evidence and Western practice part company, and why. */
export const JP_DIVERGENCE: CountryCard[] = [
  {
    id: "staging",
    title: "A different classification, so a Japanese stage is not always a Western stage",
    plain: "Japan classifies stomach cancer with its own system, which numbers the lymph node stations around the stomach and defines how far a surgeon should go by which stations are removed. The Western system counts how many nodes contain cancer. The two have converged but they still describe the operation differently.",
    detail: "The Japanese Classification of Gastric Carcinoma, maintained by the Japanese Gastric Cancer Association, numbers the perigastric and regional node stations and defines D1, D1+ and D2 dissection by which of those stations are cleared for a given resection. The UICC and AJCC systems stage by the count of involved nodes instead. A Japanese paper reporting a D2 gastrectomy is therefore describing an anatomical extent rather than a node yield, and the two are not interchangeable in a meta-analysis. The Japanese guidelines also carry an eCura curability assessment for endoscopic resection, which decides who needs an operation after an endoscopic one, and which has no direct equivalent in Western staging.",
    links: [{ label: "Japanese gastric cancer treatment guidelines 2021, 6th edition (Gastric Cancer 2023)", url: "https://doi.org/10.1007/s10120-022-01331-8" }, { label: "Japanese Gastric Cancer Association", url: "http://www.jgca.jp/" }],
  },
  {
    id: "surgery",
    title: "More surgery, and the Japanese trials that found the limit of it",
    plain: "Japanese gastric and rectal surgery removes more than Western surgery does, and Western surgeons long doubted it was worth the risk. The interesting part is that Japan tested its own maximalism and found where it stops paying.",
    detail: "JCOG9501 randomised 523 patients with curable T2b, T3 or T4 gastric cancer at 24 Japanese hospitals between 1995 and 2001 to D2 lymphadenectomy alone or D2 plus para-aortic nodal dissection, with no adjuvant therapy permitted before recurrence. Adding the para-aortic dissection did not improve survival, and surgical complications ran at 28.1 against 20.9 percent. The trial is the reason D2 rather than anything larger is the Japanese standard, and it settled an argument Japan was having with itself rather than with the West. A reader meeting a Japanese surgical trial should expect the comparison to be between two extents of a radical operation, not between operating and not operating.",
    links: [{ label: "D2 lymphadenectomy alone or with para-aortic nodal dissection for gastric cancer, JCOG9501 (NEJM 2008)", url: "https://doi.org/10.1056/NEJMoa0707035" }],
  },
  {
    id: "adjuvant",
    title: "A different backbone drug, so a different adjuvant standard",
    plain: "Japan's standard chemotherapy after stomach or pancreas surgery is built on S-1, an oral fluoropyrimidine developed in Japan. The Western standard is built on infused fluorouracil regimens. Two countries can have different standards of care for the same disease and both be following their own good randomised evidence.",
    detail: "ACTS-GC randomised 1,059 patients in Japan with stage II or III gastric cancer resected with D2 dissection to a year of S-1 at 80 mg per square metre per day or to surgery alone, and was stopped early at the first interim analysis for benefit; adjuvant S-1 after D2 surgery became the Japanese standard. JASPAC 01, already in this corpus, did the same for resected pancreatic cancer against gemcitabine. Western practice for gastric cancer went instead to perioperative combination chemotherapy, and for pancreatic cancer to modified FOLFIRINOX. Neither route has been tested head to head against the other in both populations, which is why the two guidelines can disagree without either being wrong.",
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
    title: "Japanese trials that changed the Western standard",
    plain: "The traffic is not one way. Several Japanese randomised trials have overturned or narrowed practice that had been standard in Europe and North America for years.",
    detail: "JCOG0802 randomised 1,106 patients with a peripheral non-small-cell lung cancer of 2 cm or less to segmentectomy or lobectomy and found the smaller operation not merely non-inferior but superior for overall survival, which together with CALGB 140503 moved sublobar resection from a compromise for the unfit to a standard option. The West Japan Oncology Group's trial of prophylactic cranial irradiation in extensive-stage small-cell lung cancer, run with MRI surveillance rather than without it, found no survival benefit and reversed a standard built on a European meta-analysis done before routine brain MRI. JCOG0403 established stereotactic body radiotherapy for operable as well as inoperable stage I lung cancer. Kuma Hospital's cohort of papillary thyroid microcarcinoma under active surveillance is much of the evidence behind the international shift away from operating on every small thyroid cancer.",
    links: [
      { label: "JCOG0802/WJOG4607L pure-solid supplemental analysis (Lancet Respiratory Medicine 2024)", url: "https://doi.org/10.1016/S2213-2600(23)00382-X" },
      { label: "Prophylactic cranial irradiation versus observation in extensive-disease small-cell lung cancer (Lancet Oncology 2017)", url: "https://doi.org/10.1016/S1470-2045(17)30230-9" },
    ],
  },
];

/** What we could not source, and what Japan does not publish in a form we could read. */
export const JP_GAPS: CountryCard[] = [
  {
    id: "gaps",
    title: "What this page could not establish",
    plain: "Several things a reader would want are either not published, published only inside a paywalled Japanese system, or published in a form that forbids automated reading.",
    detail: "jRCT, the national clinical trials register, asks users not to download its data programmatically, so the number of oncology studies registered there is not quoted here and the corpus's trial counts continue to come from ClinicalTrials.gov, which undercounts Japan. The number of cases in the C-CAT genomic database is published only through an interactive search we could not read. The National Cancer Center's screening uptake page renders its figures as charts, so the percentages here come from the underlying Comprehensive Survey of Living Conditions rather than from the page. Municipal-programme uptake, which is lower than the survey figure because the survey includes workplace and opportunistic screening, is published in a separate annual report we did not read. The cost of particle therapy under the advanced medical care scheme is set per facility and we found no consolidated national figure. The society's member directory is behind a login, so the specialist count here comes from the president's address rather than the register.",
    links: [
      { label: "jRCT terms of use notice", url: "https://jrct.mhlw.go.jp/" },
      { label: "C-CAT registration count search", url: "https://www.ncc.go.jp/jp/c_cat/about/index.html" },
      { label: "National Cancer Center: screening uptake charts", url: "https://ganjoho.jp/reg_stat/statistics/stat/screening/screening.html" },
    ],
  },
  {
    id: "missing-records",
    title: "Records that should be in this corpus and are not",
    plain: "Naming the holes is part of the job. These are Japanese trials, organisations and datasets that belong in OnCo and do not yet have a record.",
    detail: "Trials: JCOG9501 (D2 with or without para-aortic dissection), ACTS-GC (adjuvant S-1 in gastric cancer), JCOG0607 (expanded indications for endoscopic submucosal dissection), JCOG0912 (laparoscopic distal gastrectomy, whose paper is in the corpus without the trial), JCOG1109 NExT (neoadjuvant therapy in oesophageal cancer), JCOG0212 (lateral pelvic lymph node dissection in rectal cancer) and HERB / NCCH1805 (trastuzumab deruxtecan in biliary tract cancer, again a paper without a trial). Organisations: AMED, the Center for Cancer Genomics and Advanced Therapeutics, the Japanese Gastric Cancer Association, the Japan Gastroenterological Endoscopy Society, and the carbon-ion centres at Saga, Osaka, Kanagawa and Yamagata. Collections: jRCT and UMIN-CTR as registry records alongside ClinicalTrials.gov, and the national cancer registry itself. SCRUM-Japan exists in the corpus only as a programme line on its host institution.",
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
 * `now` is the rule in force since August 2018; `from2026` and `annual2026` are the figures published with the
 * December 2025 reform for August 2026 to July 2027. `multi` is the reduced ceiling from the fourth qualifying
 * month in twelve, which the reform holds at its current level.
 */
export type CeilingRow = { id: string; band: string; now: string; multi: string; from2026: string; annual2026: string };
export const JP_CEILINGS: CeilingRow[] = [
  { id: "a", band: "Above about ¥11.6 million a year", now: "¥252,600 + 1% of the bill above ¥842,000", multi: "¥140,100", from2026: "¥270,300 + 1% above ¥901,000", annual2026: "¥1,680,000" },
  { id: "b", band: "About ¥7.7 to ¥11.6 million", now: "¥167,400 + 1% above ¥558,000", multi: "¥93,000", from2026: "¥179,100 + 1% above ¥597,000", annual2026: "¥1,110,000" },
  { id: "c", band: "About ¥3.7 to ¥7.7 million", now: "¥80,100 + 1% above ¥267,000", multi: "¥44,400", from2026: "¥85,800 + 1% above ¥286,000", annual2026: "¥530,000" },
  { id: "d", band: "Up to about ¥3.7 million", now: "¥57,600", multi: "¥44,400", from2026: "¥61,500", annual2026: "¥530,000" },
  { id: "e", band: "Exempt from residence tax", now: "¥35,400", multi: "Not applicable", from2026: "¥36,900", annual2026: "¥290,000" },
];

/** Entity ids to render from the graph, in display order. Missing ids are skipped at render time. */
export const JP_INSTITUTIONS = ["ncc-japan", "ncc-hospital-east", "jfcr", "osaka-international-cancer-institute", "aichi-cancer-center", "shizuoka-cancer-center", "keio-university-hospital", "kyoto-university-hospital", "osaka-university", "kyushu-university-hospital", "tohoku-university-hospital", "hokkaido-university-hospital", "kindai-university-hospital", "qst-hospital", "gunma-heavy-ion-medical-center", "jsmo", "pmda"];
export const JP_COMPANIES = ["daiichi-sankyo", "takeda", "astellas", "eisai", "chugai", "otsuka", "taiho", "taiho-oncology", "sumitomo-pharma", "shionogi", "kyowa-kirin", "nippon-kayaku", "kissei", "zeria", "nobelpharma", "symbio-pharmaceuticals", "delta-fly-pharma", "stella-pharma", "sbi-pharmaceuticals", "takara-bio", "toray-industries", "cellseed", "olympus", "fujifilm", "fujifilm-diosynth", "pentax-medical", "canon-medical", "shimadzu", "hamamatsu", "hitachi", "sumitomo-heavy-industries", "toshiba-energy-systems", "fujirebio", "sakura-finetek", "jcog", "wjog"];
export const JP_TRIALS = ["jcog0403", "jcog0802", "jaspac-01", "ascot-jcog1202", "create-x", "j-alex", "paradigm", "triumph", "circulate-japan", "destiny-gastric01", "takahashi-pci", "jrosg-99-1"];
export const JP_PAPERS = ["paper-gotoda-endoscopic-resection-criteria-gastric-cancer-2000", "paper-japanese-gastric-cancer-treatment-guidelines-2021-gastric-cancer-2023", "paper-jcog0912-katai-lancet-gastroenterol-hepatol-2020", "paper-nagata-int-j-radiat-oncol-biol-phys", "paper-takahashi-lancet-oncol", "paper-create-x-adjuvant-capecitabine-nejm-2017", "paper-paradigm-jama-2023", "paper-galaxy-signatera-nat-med-2023", "paper-destiny-gastric01-nejm-2020", "paper-ohba-herb-trastuzumab-deruxtecan-biliary-jco-2024", "paper-ito-kuma-active-surveillance-microcarcinoma-thyroid-2014", "paper-remora-lenvatinib-thymic-carcinoma-lancet-oncol-2020", "paper-hayashi-site-specific-vs-empirical-chemotherapy-cup-jco-2019", "paper-nakamura-anti-pd1-acral-melanoma-ann-oncol-2020", "paper-nakamura-biliary-genomic-spectra-nat-genet-2015", "paper-jshbps-biliary-tract-cancer-guidelines-2019-jhbps-2021", "paper-nct05101096-int-j-clin-oncol-2024"];
export const JP_PEOPLE = ["tasuku-honjo", "shimon-sakaguchi", "nakagama-hitoshi", "ohe-yuichiro", "yoshino-takayuki", "shitara-kohei", "doi-toshihiko", "goto-koichi", "yamamoto-noboru", "yonemori-kan", "ken-kato", "kohno-takashi", "fukuda-haruhiko", "hitoshi-katai", "sano-takeshi", "kitagawa-yuko", "yuichiro-doki", "masatoshi-kudo", "takahashi-shunji", "ohno-shinji", "ueno-takayuki", "hidetoshi-hayashi", "nobuyuki-yamamoto", "tatsuya-ohno", "hitoshi-ishikawa", "katsuhiko-uesaka", "nariaki-matsuura", "yasumasa-niwa", "akifumi-takaori", "koichi-fukunaga", "takashi-kamei", "yasuharu-nakashima", "yasuyuki-nasuhara", "yasuhiro-fujiwara"];
