/**
 * Russia deep dive: the hand-written cards for /countries/ru/. Plain English first, detail second, every card with
 * its sources. Entity lists are pulled from the graph on the page by id so they stay in step with the corpus.
 *
 * This page was written against Russian-language primary sources rather than against the corpus, because the corpus
 * held almost nothing: three Russian institutions, all of them found through the OECI membership list, two companies
 * and a dozen trials harvested from ClinicalTrials.gov. That is a fact about OnCo's reading, which is done in English,
 * and not about Russian oncology, which runs a national statistical service, its own approvals route and its own
 * manufacturers. The two Herzen institute annual volumes below are the national statistical record; figures quoted
 * from them are quoted with their year and their table, and where the volumes disagree with themselves or with
 * GLOBOCAN that is said rather than smoothed over.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const RU_ASOF = "2026-09-25";

/** The Herzen institute's two annual volumes, cited from several cards. */
const SOST_2025 = { label: "Состояние онкологической помощи населению России в 2025 году (Herzen institute, Moscow 2026)", url: "https://glavonco.ru/cancer_register/" };
const ZNO_2024 = { label: "Злокачественные новообразования в России в 2024 году (заболеваемость) (Herzen institute, Moscow 2025)", url: "https://glavonco.ru/cancer_register/" };
const GLAVONCO = { label: "Herzen institute cancer register library: all annual volumes as PDFs", url: "https://glavonco.ru/cancer_register/" };

export const RU_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "A cancer profile of skin, breast, prostate, lung and stomach, in an ageing and unevenly counted population",
    plain: "Russia registered 721,690 new cancers in 2025. The most commonly recorded cancer is skin cancer other than melanoma, then breast, prostate, lung and bowel. Stomach cancer is far more common than in western Europe. Most patients are over 60, and the number recorded per head of population varies more than fourfold between regions.",
    detail: "The Herzen institute's volume for 2025 records 721,690 first-ever malignant neoplasms (332,471 in men, 389,219 in women), 3.3 per cent more than in 2024, at a crude rate of 493.9 per 100,000. The incidence volume for 2024 gives 698,693 cases at a crude rate of 478.1 (confidence interval 477.0 to 479.2) against 461.0 in 2023, and age-standardised rates on the world standard of 287.8 in men and 243.0 in women. The leading sites in 2024 for both sexes were skin other than melanoma 13.5 per cent, breast 12.2, prostate 9.5, trachea, bronchus and lung 8.6, colon 7.1, stomach 4.8, lymphoid and haematopoietic tissue 4.6, corpus uteri 4.2, kidney 3.9 and rectum, anus and anal canal 3.8. Among men, prostate was 20.7 per cent and the urogenital organs together 30.5; among women, breast was 22.4 per cent and the reproductive organs together 39.1. The peak age band was 65 to 69 (18.4 per cent of cases), and 76.9 per cent of male and 68.7 per cent of female cases were diagnosed at 60 or over. Crude regional rates ran from 166.4 per 100,000 in Chechnya, 170.9 in Ingushetia and 176.8 in Dagestan to 687.2 in the Republic of Karelia, 658.6 in Arkhangelsk oblast and 644.4 in Bryansk oblast, a spread the report attributes to age structure and which the registry audits below show is also a spread in how completely cases are recorded.",
    links: [ZNO_2024, SOST_2025, { label: "GLOBOCAN 2022: Russian Federation fact sheet (IARC)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/643-russian-federation-fact-sheet.pdf" }],
  },
  {
    id: "prevalence",
    title: "Four and a half million people on the cancer register, and cancer as the leading cause of disability",
    plain: "At the end of 2025, 4,484,023 people in Russia were under cancer follow-up, about 3,068 per 100,000. Six in ten of them had been on the register five years or more. Cancer is the single largest cause of adult disability awards.",
    detail: "The 2025 volume records 4,484,023 patients under dispensary observation at the end of the year, up from 4,023,446 in 2022, of whom 20.9 per cent live in rural areas and 64.0 per cent are above working age. 2,656,564 of them, 59.3 per cent, had been on the register for five years or more, down from 60.1 per cent in 2024; that share ranged from 49.3 per cent in Chukotka to 70.7 per cent in Ingushetia. The prevalence rate was 3,068.4 per 100,000, 31.7 per cent above the 2015 figure of 2,329.8, which the report ascribes to rising incidence, rising detection and rising survival together. Breast cancer accounts for 19.2 per cent of the register, skin other than melanoma 10.7 and prostate 8.5. Separately, the incidence volume reports that of 1,777,739 people awarded or re-awarded disability status in Russia in 2024, cancer ranked first as a cause, at 33.8 per cent of first awards and 33.6 per cent of repeat awards.",
    links: [SOST_2025, ZNO_2024],
  },
  {
    id: "cervix",
    title: "Cervical cancer, rising where it is falling elsewhere",
    plain: "Cervical cancer is the sixth commonest cancer of Russian women and, unusually for a high-income health system, both its incidence and its death rate have been going up for decades in younger generations.",
    detail: "An analysis of Russian State Cancer Registry data published in Cancer Epidemiology in 2018 found cervical cancer incidence rising from 10.6 to 14.2 per 100,000 between 1993 and 2013 while mortality rose from 5.6 to 6.7 between 1980 and 2013; breast cancer incidence rose from 33.0 to 47.0 over the same two decades but breast mortality fell from 17.6 to 15.7. Age-period-cohort modelling put the break points in cohorts born between 1937 and 1953 and projected that cervical cancer, which had already overtaken breast cancer on years of life lost per death (23.4 against 18.5 in 2009 to 2013), would keep rising without vaccination and screening. The Herzen 2025 volume records that the share of cervical cancers found at stage III or IV was 33.5 per cent, worse than the 32.2 per cent of 2024, and that active detection of cervical cancer varied between regions from zero to 77.3 per cent.",
    links: [
      { label: "Breast and cervical cancer incidence and mortality trends in Russia 1980-2013 (Cancer Epidemiol 2018)", url: "https://doi.org/10.1016/j.canep.2018.05.008" },
      SOST_2025,
    ],
  },
];

export const RU_REGISTRY: CountryCard[] = [
  {
    id: "what-it-is",
    title: "What the Russian cancer register is: statistical form No. 7, compiled at the Herzen institute",
    plain: "Russia's national cancer figures are not a single linked registry. They are the sum of an annual statistical return, form No. 7, sent in by every regional cancer dispensary and compiled into two books each year by a unit inside the Herzen institute in Moscow.",
    detail: "The Russian Centre of Information Technologies and Epidemiological Research in Oncology, part of the P. A. Herzen Moscow Oncology Research Institute, itself a branch of the National Medical Research Radiological Centre, publishes two volumes a year: Состояние онкологической помощи населению России (the state of cancer care) and Злокачественные новообразования в России (malignant neoplasms in Russia). Both are edited by Andrey Kaprin, the centre's director general and the ministry's chief oncologist, with Valery Starinsky and Aida Shakhzadova. The 2025 care volume states that it analyses federal statistical observation form No. 7, Сведения о злокачественных новообразованиях, tables 2100, 2200, 2110, 2120, 2300 and 2310, together with form No. 47 on the network of medical organisations, form No. 30 on each organisation and form No. 12 on registered illnesses, and that population denominators come from Rosstat's mid-year estimates for the previous year. The unit of count is the patient taken onto dispensary observation at a cancer institution, which is why the volumes report the standing register (контингент) as prominently as the incidence.",
    links: [SOST_2025, GLAVONCO],
  },
  {
    id: "indicators",
    title: "What it reports: stage at diagnosis, one-year fatality, morphological verification and active detection",
    plain: "The four numbers the Russian service manages itself against are the share found at each stage, the share who die within a year of diagnosis, the share with a tissue diagnosis, and the share found by screening or check-up rather than by symptoms. In 2025 those were 38.3 per cent at stage I, 16.6 per cent dead within a year, 97.1 per cent with a tissue diagnosis and 28.0 per cent found actively.",
    detail: "For 2025 the care volume reports stage I 38.3 per cent (37.2 in 2024), stage II 23.3 (24.2), stage III 15.7 (15.8), stage IV 18.1 (18.5) and no stage recorded 4.6 (4.3). One-year fatality, defined as the share of patients taken onto the register in the previous year who died of cancer within a year, was 16.6 per cent against 17.3 in 2024 and 23.6 in 2015. Morphological verification was 97.1 per cent, lowest for pancreas (83.1), liver and intrahepatic ducts (83.5), eye (86.8) and lung (91.0). Active detection was 28.0 per cent (24.5 in 2022), highest for breast (45.1), skin other than melanoma (38.8) and cervix (38.1) and lowest for pancreas (7.9), liver (9.1), lymphoma (10.1) and leukaemia (10.5). Late presentation is worst for oropharynx (74.0 per cent at stage III or IV), mouth (62.3) and rectum (53.9); the national stage IV share is 56.8 per cent for pancreas, 53.2 for liver, 47.8 for pharynx and 42.4 for lung. Regional variation is the striking part: one-year fatality ran from 9.0 per cent in Moscow oblast to 24.3 per cent in Chukotka and the Nenets district, stage IV from 18.1 per cent nationally to 30.5 per cent in Tyva, and active detection from 6.3 per cent in Novgorod oblast to 97.0 per cent in Kamchatka.",
    links: [SOST_2025],
  },
  {
    id: "how-it-differs",
    title: "How the reporting differs from Western registries, which matters if you compare our country pages",
    plain: "Three things make Russian figures hard to line up with British, American or European ones: the headline rate is crude rather than age-standardised, common skin cancers are counted in the national total, and the count is of people registered for follow-up at a cancer dispensary rather than of all cases found in a population.",
    detail: "First, the number the volumes lead with is the crude rate per 100,000 (493.9 in 2025), not the age-standardised rate that GLOBOCAN and Western registries use; the incidence volume does give world-standard rates, but by sex (287.8 in men and 243.0 in women in 2024). Second, the registry counts and ranks skin cancer other than melanoma, making it the single commonest cancer at 13.5 per cent of 698,693 cases in 2024, roughly 94,000 cases; GLOBOCAN 2022 estimates 21,285 non-melanoma skin cancers in Russia, about a quarter as many, which is a large part of why the national count exceeds GLOBOCAN's 635,560 for 2022. Comparisons should therefore be made on all cancers excluding non-melanoma skin, which the Russian volumes do not publish as a headline. Third, the unit is dispensary registration: in 2025, 36,434 people who died of cancer had never been registered, 16.4 for every 100 cancer deaths, up from 10.4 in 2021, and the report itself warns that the share of deaths attributed to non-cancer causes, 27.8 per 100 registered cancer deaths nationally but 2.2 in Tyva and 87.3 in Mordovia, points at failures in matching deaths and coding causes. The GLOBOCAN data file records method codes of 1 for both Russian incidence and Russian mortality; what those codes mean is set out on the observatory's data and methods page, and it is worth weighing against the audits below.",
    links: [
      SOST_2025,
      ZNO_2024,
      { label: "IARC Global Cancer Observatory: data and methods", url: "https://gco.iarc.who.int/today/en/data-sources-methods" },
    ],
  },
  {
    id: "how-completeness-is-judged",
    title: "How completeness is judged: the register's own ratio test, and two independent audits",
    plain: "The Herzen report checks itself by asking whether more people died within a year than were found with advanced disease the year before, which is impossible if the staging is right. Two peer-reviewed audits of ten north-western registries found four of ten fit to compare internationally and eight of ten complete enough for research.",
    detail: "The report divides the reporting year's one-year fatality by the previous year's stage IV share; a ratio at or above one means the region is recording deaths it did not record as advanced disease. Nationally the ratio was 0.80 in 2025 (0.82 in 2024, 0.97 in 2023, 1.04 in 2020, 1.07 in 2019), and the number of regions at or above one has fallen from 55 in 2019 to 7 in 2025. The report also names figures it does not believe: 523 deaths from treatment complications, 0.1 per 100 cancer deaths, is called substantially understated, with no such death recorded at all in 53 regions; and the jump in cervical carcinoma in situ to 65.7 per 100 invasive cervical cancers in a single year, from a 2024 figure the report gives as 51.6 in its summary chapter and 52.7 in its analytical one, alongside regions reporting high active detection and almost no in-situ disease, leads it to say that in many regions the in-situ and early-detection data do not correspond to reality and staging errors cannot be excluded. Independently, an audit of ten population-based registries in the Northwestern Federal District covering 13 million people found morphological verification between 61.7 and 89 per cent by region in 2013 to 2017 and death-certificate-only cases up to 23 per cent in Saint Petersburg, with four of ten registries meeting international standards; a follow-up found eight of ten complete enough for research, Saint Petersburg below 90 per cent, and about 10 per cent of Saint Petersburg cases held in the registry database but absent from the national annual report. The regional morphological verification range of 61.7 to 89 per cent sits badly beside the national figure of 97.1 per cent.",
    links: [
      SOST_2025,
      { label: "Comparability and validity of cancer registry data in the northwest of Russia (Acta Oncol 2021)", url: "https://doi.org/10.1080/0284186X.2021.1967443" },
      { label: "Completeness of regional cancer registry data in Northwest Russia 2008-2017 (BMC Cancer 2023)", url: "https://doi.org/10.1186/s12885-023-11492-z" },
    ],
  },
];

export const RU_PAYING: CountryCard[] = [
  {
    id: "oms",
    title: "Compulsory medical insurance pays, and the state guarantees programme says what for",
    plain: "Every resident has a compulsory medical insurance policy, and cancer treatment in a state hospital is free at the point of use. What is free is defined by an annual government programme rather than by what a doctor thinks best.",
    detail: "Compulsory medical insurance is governed by federal law 326-FZ of 29 November 2010. What it buys is set by the Programme of State Guarantees of Free Medical Care, which article 80 of federal law 323-FZ of 21 November 2011 requires to cover primary care, specialised care including high-technology care, emergency care and inpatient palliative care, and which the government reissues each year with volumes and per-case financing standards. Cancer care is delivered through a network the 2025 volume counts as 76 oncology dispensaries, 75 of them with inpatient beds, and two specialist cancer hospitals, down from 92 dispensaries and three hospitals in 2019, with 35,170 oncology beds and 7,052 radiotherapy beds, 11,348 oncologists, 1,134 radiotherapists and 489 radiologists, and 395.1 registered patients per oncologist against 455.9 in 2020. The mean stay on an oncology bed was 6.0 days. The federal project Борьба с онкологическими заболеваниями, which paid for much of the equipment renewal since 2019, now sits inside the national project Продолжительная и активная жизнь for 2025 to 2030.",
    links: [
      { label: "Federal law 326-FZ on compulsory medical insurance (Russian)", url: "https://www.consultant.ru/document/cons_doc_LAW_107289/" },
      { label: "Federal law 323-FZ, article 80: the programme of state guarantees (Russian)", url: "https://www.consultant.ru/document/cons_doc_LAW_121895/d3162427a7e8305d6b6b1582927e76217c3ce45d/" },
      SOST_2025,
    ],
  },
  {
    id: "vital-list",
    title: "The vital and essential medicines list is the boundary of what is free",
    plain: "Article 80 says hospitals must supply patients with medicines from the list of vital and essential medicines. A cancer drug on that list is free in hospital and price-capped in the pharmacy. A cancer drug not on it is, in practice, the patient's problem.",
    detail: "Part 2 of article 80 of federal law 323-FZ obliges the health system, when giving day-hospital and urgent primary care, specialised and high-technology care, emergency care and palliative care in hospital, at day hospital or at home, to supply medicines included in the list of vital and essential medicines (жизненно необходимые и важнейшие лекарственные препараты, ЖНВЛП) drawn up under federal law 61-FZ. The list is approved by government order: order 2406-r of 12 October 2019, read here in the edition of 15 January 2025 and marked on the legal database as having lost force, sets out in its appendix 1 a list organised by ATC group in which group L is противоопухолевые препараты и иммуномодуляторы, antineoplastic and immunomodulating agents. Its appendix 3 is a separate list for centrally supplied high-cost conditions, and malignant neoplasms of lymphoid, haematopoietic and related tissues are on it, which means blood cancers have a federal drug supply route that solid tumours do not. Maximum ex-factory prices are registered by the state in the Государственный реестр предельных отпускных цен held with the state medicines register. The consequence for a patient is direct: getting a medicine onto the list, or getting an individual decision to buy one that is not on it, is the fight, and a 2023 ethnography of Russian cancer and rare-disease patients describes access not as something the system confers but as a trajectory patients build through what its authors call persisting, complying, adjusting and knowing work.",
    links: [
      { label: "Federal law 323-FZ, article 80 (Russian)", url: "https://www.consultant.ru/document/cons_doc_LAW_121895/d3162427a7e8305d6b6b1582927e76217c3ce45d/" },
      { label: "Government order 2406-r of 12 October 2019 approving the vital and essential medicines list (Russian)", url: "https://www.consultant.ru/document/cons_doc_LAW_335635/" },
      { label: "State register of maximum ex-factory prices (Russian)", url: "https://grls.rosminzdrav.ru/pricelims.aspx" },
      { label: "Patients' work and fluid trajectories: access to medicines for oncological and rare diseases in Russia (Soc Sci Med 2023)", url: "https://doi.org/10.1016/j.socscimed.2022.115613" },
    ],
  },
  {
    id: "out-of-pocket",
    title: "What comes out of the patient's pocket, and how much the region you live in matters",
    plain: "Russians paid 28 per cent of all health spending out of their own pockets in 2023, down from 40 per cent in 2017 but still high for a country with universal insurance. Because cancer care is organised and part-funded by region, the odds of being found early and of surviving the first year differ sharply from one region to the next.",
    detail: "The WHO Global Health Expenditure Database puts Russian out-of-pocket spending at 28.39 per cent of current health expenditure in 2023, against 40.49 per cent in 2017 and 24.88 per cent in the pandemic year of 2020; current health expenditure was 7.04 per cent of GDP in 2023 and government and compulsory contributory schemes covered 70.04 per cent of it. The regional dimension is visible in the national cancer figures themselves. In 2025 one-year fatality ranged from 9.0 per cent in Moscow oblast, 10.1 in the Altai Republic and 11.4 in Leningrad oblast and Moscow city to 21.5 in Tyva, 23.1 in Irkutsk oblast, 23.4 in Bryansk oblast and 24.3 in Chukotka and the Nenets district; 53 of the regions were worse than the national average. Active detection ranged from 6.3 per cent in Novgorod oblast to 97.0 per cent in Kamchatka, and the share of tumours with no stage recorded from under 1 per cent to 12.0 per cent in Leningrad oblast. OnCo has not found a published national figure for what a Russian cancer patient pays out of pocket for a course of treatment, and does not have one.",
    links: [
      { label: "WHO Global Health Expenditure Database (indicator GHED_OOPSCHE_SHA2011, Russian Federation)", url: "https://apps.who.int/nha/database" },
      SOST_2025,
    ],
  },
];

export const RU_REGULATOR: CountryCard[] = [
  {
    id: "national",
    title: "Who approves a cancer drug: the Ministry of Health, in 160 working days",
    plain: "Medicines are registered by the federal executive body responsible, in practice the Ministry of Health, after an expert review; the law gives it 160 working days for a human medicine. Everything registered goes into a public state register, and so does every clinical trial permit.",
    detail: "Federal law 61-FZ of 12 April 2010 on the circulation of medicines, in the edition of 4 August 2026 in force from 1 September 2026, provides at article 13 part 1 that a medicine may be made, imported, advertised, dispensed and used in Russia if it is registered by the authorised federal executive body under that law or registered under the acts constituting the law of the Eurasian Economic Union. Article 13 part 4 sets the national registration term at not more than 160 working days from acceptance of the application for a human medicine, excluding the time taken by the regulator's own requests for further material. Article 27 gives the body four working days after the expert commission reports to decide and to enter the product in the state register. Three public registers carry the results: the Государственный реестр лекарственных средств of registered medicines, the Реестр разрешённых клинических исследований of authorised clinical trials, searchable by protocol, sponsor, product and status, and the register of maximum ex-factory prices.",
    links: [
      { label: "Federal law 61-FZ, article 13 (Russian)", url: "https://www.consultant.ru/document/cons_doc_LAW_99350/20bf1d291330c06c7d90caf462173d74a07ac2b6/" },
      { label: "State register of medicines (GRLS)", url: "https://grls.rosminzdrav.ru/" },
      { label: "Register of authorised clinical trials (Russian)", url: "https://grls.rosminzdrav.ru/CIPermitionReg.aspx" },
    ],
  },
  {
    id: "eaeu",
    title: "The Eurasian Economic Union route, and the deadline that passed on 31 December 2025",
    plain: "Since 2021 new medicines are registered under common Eurasian Economic Union rules rather than purely Russian ones, and every medicine already registered in Russia had to be brought onto the Union dossier by the end of 2025. From January 2026 the old national fast track no longer applies to human medicines.",
    detail: "The Union procedure rests on the Agreement on unified principles and rules for the circulation of medicines within the Eurasian Economic Union of 23 December 2014 and on decision No. 78 of the Council of the Eurasian Economic Commission of 3 November 2016, which approved the Rules for the registration and examination of medicines for human use and came into force on 6 May 2017. Federal law 1-FZ of 30 January 2024 wrote the Union route into Russian law and set the transition: applications lodged before 1 January 2021 are finished under the earlier Russian requirements (article 4 part 8); medicines registered under 61-FZ had to be brought into conformity with the acts of Union law by 31 December 2025 (part 9); those not brought into conformity may go on being sold in Russia after that date until their shelf life runs out, but no longer (part 10); and from 1 January 2026 the accelerated examination procedure of article 26, together with parts of the articles on registration certificates and on confirmation of registration, ceases to apply to human medicines altogether (part 7). Paper registration certificates stopped being issued on 1 January 2026, replaced by a signed extract from the state register.",
    links: [
      { label: "EEC Council decision No. 78 of 3 November 2016 on the rules for registration and examination of medicines (Russian)", url: "https://docs.eaeunion.org/docs/ru-ru/01411969/cncd_21112016_78" },
      { label: "Federal law 1-FZ of 30 January 2024, article 4: transition to Union rules (Russian)", url: "https://www.consultant.ru/document/cons_doc_LAW_523261/ad890e68b83c920baeae9bb9fdc9b94feb1af0ad/" },
      { label: "Federal law 61-FZ, article 26: accelerated procedure (Russian)", url: "https://www.consultant.ru/document/cons_doc_LAW_99350/b317bd5982342018686a2fe4b1679c2c037774cc/" },
    ],
  },
  {
    id: "since-2022",
    title: "What changed after February 2022: new cancer trials with a Russian site fell by about three quarters",
    plain: "Before 2022 Russia was one of the world's larger sites for international cancer trials. Counting interventional cancer studies on ClinicalTrials.gov by the year they started, 111 began in 2021 with a Russian site and 31 in 2023. Almost all of the recent ones are run by Russian hospitals and Russian companies.",
    detail: "OnCo counted interventional studies on ClinicalTrials.gov with the condition query cancer and at least one site in the Russian Federation, grouped by start year: 130 in 2020, 111 in 2021, 45 in 2022, 31 in 2023, 30 in 2024, 36 in 2025 and 10 with a 2026 start date at the time of counting, against 1,628 in all years. The sponsor mix changed with the volume. Of the 447 such studies that started between 2018 and 2021 the largest lead sponsors were Merck Sharp and Dohme (57), AstraZeneca (47), Hoffmann-La Roche (33), Bristol-Myers Squibb (19), Novartis (18), Janssen (16), Pfizer (12) and GlaxoSmithKline (11). Of the 107 that started from 2023 onwards the largest were the Tomsk National Research Medical Centre (11), the Blokhin centre (9), Biocad (8), Pavlov University, the Rogachev centre and Saint Petersburg State University (7 each), the National Medical Research Radiological Centre (6), the Petrov centre and R-Pharm (5 each); AstraZeneca was the largest foreign sponsor with 4, and Hoffmann-La Roche, Sanofi and Merck Sharp and Dohme had one each. For scale, a count made between February and May 2022 found 508 cancer trials with a site in Russia or Ukraine, 93 per cent of them multinational and 68 per cent phase 3. On supply, the one dated and specific document OnCo could read is the Russian Society of Clinical Oncology’s Temporary recommendations for treating patients under a shortage of particular anticancer medicines, a PDF created on 9 September 2024, which addresses a shortage of mesna (Uromitexan), the uroprotector given with ifosfamide and high-dose cyclophosphamide, and sets out ifosfamide-sparing alternatives tumour by tumour, from doxorubicin monotherapy in metastatic soft tissue sarcoma onwards. OnCo has not established which individual sponsors stopped enrolling and why, nor found a list of cancer medicines that became unavailable in Russia; the European Union measures are Council Regulations 833/2014 and 269/2014, whose treatment of medicines OnCo has not read in the primary text.",
    links: [
      { label: "ClinicalTrials.gov API v2: interventional cancer studies with a Russian Federation site", url: "https://clinicaltrials.gov/search?cond=cancer&country=Russian%20Federation&aggFilters=studyType:int" },
      { label: "The impact of the 2022 Ukraine/Russian conflict on cancer clinical trials (J Int Med Res 2022)", url: "https://doi.org/10.1177/03000605221143284" },
      { label: "RUSSCO: Временные рекомендации по лечению пациентов в условиях дефицита отдельных противоопухолевых препаратов (PDF, Russian)", url: "https://www.rosoncoweb.ru/standarts/RUSSCO/temporary_recommendations.pdf" },
      { label: "EU sanctions adopted following Russia's military aggression against Ukraine (European Commission)", url: "https://finance.ec.europa.eu/eu-and-world/sanctions-restrictive-measures/sanctions-adopted-following-russias-military-aggression-against-ukraine_en" },
    ],
  },
];

export const RU_MAKING: CountryCard[] = [
  {
    id: "biocad",
    title: "Biocad: Russia's own PD-1 antibody, and copies of most of the rest",
    plain: "Biocad in Saint Petersburg makes the immunotherapy Russian oncologists use. It developed prolgolimab, sold as Forteca, an anti-PD-1 antibody of its own, and it sells Russian-made versions of pembrolizumab, daratumumab and pertuzumab alongside biosimilars of rituximab, trastuzumab and bevacizumab.",
    detail: "Biocad's own product pages list, under oncology, Фортека (prolgolimab), Нурдати (nurulimab plus prolgolimab), Пемброриа (pembrolizumab), Даратумиа (daratumumab), Пертувиа (pertuzumab) and Экстимия (empegfilgrastim), within a portfolio the company describes as more than 55 medicines. Prolgolimab is an IgG1 anti-PD-1 antibody with the Fc-silencing LALA mutation; the phase 2 MIRACULUM trial (NCT03269565, 126 patients recruited from August 2017 to March 2018) reported objective responses in 38.1 per cent on 1 mg/kg fortnightly and 28.6 per cent on 3 mg/kg three-weekly, and it was approved in Russia for melanoma in 2020. The phase 3 DOMAJOR trial (NCT03912389, 292 patients in Russia, China, Hungary and Slovakia) reported median overall survival not reached with prolgolimab plus pemetrexed and platinum against 14.6 months with chemotherapy alone in advanced non-squamous lung cancer, hazard ratio 0.51. The phase 3 OCTAVA trial of the fixed low-dose combination of nurulimab and prolgolimab against prolgolimab alone in first-line melanoma reported median progression-free survival of 15.4 against 10.8 months by iRECIST, hazard ratio 0.68, and carries a published corrigendum. The company announced on 1 June 2026 that phase 3 results for Пемброриа against reference pembrolizumab in advanced melanoma were presented at ASCO 2026, and on 14 May 2026 that it had a permit for a phase 3 trial of its own BCD-248 in myeloma.",
    links: [
      { label: "Biocad oncology products (Russian)", url: "https://biocad.ru/products/onco" },
      { label: "MIRACULUM: prolgolimab in advanced melanoma (Eur J Cancer 2021)", url: "https://doi.org/10.1016/j.ejca.2021.02.030" },
      { label: "DOMAJOR: prolgolimab with chemotherapy in non-squamous NSCLC (Eur J Cancer 2025)", url: "https://doi.org/10.1016/j.ejca.2025.115255" },
      { label: "OCTAVA: nurulimab plus prolgolimab in advanced melanoma (Eur J Cancer 2025)", url: "https://doi.org/10.1016/j.ejca.2025.115674" },
      { label: "Biocad news (Russian)", url: "https://biocad.ru/news" },
    ],
  },
  {
    id: "others",
    title: "R-Pharm, Mabscale and the rest of the domestic supply",
    plain: "Beside Biocad, several Russian companies run their own phase 3 trials of Russian-made versions of Western cancer medicines against the originator. That is now a large part of how cancer drugs reach Russian patients.",
    detail: "R-Pharm, founded in Moscow in 2001, is running a phase 3 comparison of its pertuzumab RPH-051 against Perjeta with trastuzumab and docetaxel in first-line HER2-positive breast cancer (NCT07386938, 246 patients) and a phase 2 dose-finding study of RS-113 in metastatic castration-resistant prostate cancer (NCT07553988); it also sponsored the international phase 3 of ixabepilone in advanced endometrial cancer (NCT00883116, 551 patients). Mabscale is running a 620-patient phase 3 of its bevacizumab with paclitaxel and carboplatin against Avastin in advanced non-squamous lung cancer (NCT05654454). Biocad's own comparative programme includes PREFER, a 398-patient phase 3 of BCD-178 against Perjeta as neoadjuvant therapy in HER2-positive breast cancer (NCT05802225), and UNIVERSE, a 392-patient phase 3 of BCD-263 against Opdivo in advanced melanoma (NCT06640530), alongside earlier-stage work on BCD-236 in triple-negative breast cancer and BCD-248 in myeloma. The pattern is the same in each: a domestic molecule compared against the originator in a trial run almost entirely at Russian sites, with the Russian regulator as the audience.",
    links: [
      { label: "ClinicalTrials.gov: studies led by Biocad", url: "https://clinicaltrials.gov/search?lead=Biocad" },
      { label: "R-Pharm", url: "https://r-pharm.com" },
      { label: "ClinicalTrials.gov NCT05654454 (Mabscale bevacizumab phase 3)", url: "https://clinicaltrials.gov/study/NCT05654454" },
    ],
  },
];

export const RU_INSTITUTIONS_CARDS: CountryCard[] = [
  {
    id: "blokhin",
    title: "The Blokhin centre: the reference hospital",
    plain: "The N. N. Blokhin National Medical Research Centre of Oncology on the Kashirskoye highway in south Moscow is the country's largest cancer hospital and its federal reference centre, seeing more than 200,000 people a year.",
    detail: "The centre describes itself as the largest oncology clinic in Russia and in Europe and states that more than 200,000 people a year come to it from every Russian region and from 100 countries. It is made up of several institutes, among them the Institute of Clinical Oncology and the Durnov Institute of Paediatric Oncology and Haematology. Its welcome to patients is signed by Ivan Sokratovich Stilidi, academician of the Russian Academy of Sciences, whom the Organisation of European Cancer Institutes lists as the centre's representative; the centre is an associate member of that organisation. On OnCo's ClinicalTrials.gov count it is the second most frequent Russian lead sponsor of cancer trials started since 2023.",
    links: [{ label: "N. N. Blokhin centre (Russian)", url: "https://www.ronc.ru" }, { label: "OECI membership list", url: "https://www.oeci.eu/Membership.aspx" }],
  },
  {
    id: "herzen",
    title: "The Herzen institute and the radiological centre: the statistics and the radiation",
    plain: "The P. A. Herzen Moscow Oncology Research Institute, founded in 1898, is now one of three branches of the National Medical Research Radiological Centre. It is where the national cancer statistics are compiled, and the centre it belongs to is where radiotherapy and radiopharmaceutical research sits.",
    detail: "The National Medical Research Radiological Centre of the Russian Ministry of Health, led by Andrey Kaprin, groups the P. A. Herzen Moscow Oncology Research Institute (Moscow, founded 1898), the A. F. Tsyb Medical Radiological Research Centre in Obninsk in Kaluga oblast, and the N. A. Lopatkin Research Institute of Urology and Interventional Radiology in Moscow. The centre states that more than 100,000 people a year come to it for care, and its own site marks 125 years of the Herzen institute over 1898 to 2023. Within the Herzen institute sits the Russian Centre of Information Technologies and Epidemiological Research in Oncology, at 2nd Botkinsky proezd 3 in Moscow, which compiles form No. 7 from every region and publishes the two annual statistical volumes this page rests on. Obninsk is also where much of Russia's reactor-produced medical isotope work is based.",
    links: [{ label: "National Medical Research Radiological Centre (Russian)", url: "https://new.nmicr.ru/" }, { label: "Herzen institute cancer register library (Russian)", url: "https://glavonco.ru/cancer_register/" }],
  },
  {
    id: "petrov-and-others",
    title: "Petrov in Saint Petersburg, Rogachev for children, Tomsk for Siberia, and the societies",
    plain: "The Petrov institute in Saint Petersburg is the oldest cancer institute in the country, founded in 1927. The Rogachev centre in Moscow is the national children's cancer hospital. The Tomsk institute is the busiest Russian trial sponsor of the last three years. Two professional bodies write the guidelines.",
    detail: "The N. N. Petrov National Medical Research Centre of Oncology dates itself to 15 March 1927, when Nikolai Petrov opened a cancer research institute with 100 clinical beds at the Mechnikov general hospital in Leningrad; its history page records that in 1966 it passed to the USSR Ministry of Health, was given Petrov’s name and opened a 40-bed childhood tumour department, and that it marked its ninetieth anniversary in 2017. It publishes the journal Voprosy Onkologii (Вопросы онкологии), which its site describes as peer-reviewed, indexed in Scopus and the RSCI core, and open access in Russian and English. The Dmitry Rogachev National Medical Research Centre of Paediatric Haematology, Oncology and Immunology in south-west Moscow is the federal children's hospital for leukaemia, solid tumours and immunodeficiency and appears on ClinicalTrials.gov as the Federal Research Institute of Pediatric Hematology, Oncology and Immunology. The Cancer Research Institute of the Tomsk National Research Medical Centre of the Russian Academy of Sciences is, on OnCo's count, the most frequent lead sponsor of any organisation for cancer trials with a Russian site started since 2023. Guidelines come from two bodies: the Russian Society of Clinical Oncology (RUSSCO), which publishes treatment guidelines, drug therapy protocols, the journal Malignant Tumours and a national molecular diagnosis programme, and is advertising its thirtieth Russian Oncological Congress for 10 to 12 December 2026 at Crocus Expo in Moscow, with abstracts open until 25 October; and the All-Russian national union Association of Oncologists of Russia (Общероссийский национальный союз «Ассоциация онкологов России»), a union of scientific societies and specialists whose site carries both clinical guidelines and drafts of them. The Tatarstan Cancer Centre in Kazan, founded in 1946, is the regional example OnCo already held.",
    links: [
      { label: "N. N. Petrov centre: history (Russian)", url: "https://www.niioncologii.ru/institute/institutehistory" },
      { label: "Dmitry Rogachev centre (Russian)", url: "https://fnkc.ru" },
      { label: "Cancer Research Institute, Tomsk NRMC (Russian)", url: "https://onco.tnimc.ru" },
      { label: "RUSSCO (Russian)", url: "https://www.rosoncoweb.ru" },
      { label: "Association of Oncologists of Russia (Russian)", url: "https://oncology-association.ru/" },
    ],
  },
];

export const RU_GAPS: CountryCard[] = [
  {
    id: "corpus-gap",
    title: "What OnCo did not hold, and still does not",
    plain: "Before this page OnCo held three Russian institutions, all of them found through a European membership list, two companies and a dozen trials scraped from an American registry. It held nothing from the Russian statistical service, nothing from the Russian regulator and no Russian-language source at all.",
    detail: "The three institutions were the Blokhin centre, the National Medical Research Radiological Centre and the Tatarstan Cancer Centre, each recorded because it appears on the Organisation of European Cancer Institutes membership list, and one person, the Blokhin director, recorded as its representative to that list. This page adds the Petrov, Rogachev and Tomsk institutes and RUSSCO, and four papers. What is still missing is large: the regional cancer dispensaries that do most of the treating, the Russian oncologists who would appear on any list of the field's leaders, the Russian-language journals, and the Russian trials that are registered only in the Russian permits register and never reach ClinicalTrials.gov. OnCo's country research ranking is built from OpenAlex, which indexes English-language journals most completely, so Russia's position there should be read as a statement about indexing as much as about output.",
    links: [
      { label: "Register of authorised clinical trials, Russia (Russian)", url: "https://grls.rosminzdrav.ru/CIPermitionReg.aspx" },
      { label: "OnCo country research rankings and their caveats", url: "/countries/" },
    ],
  },
  {
    id: "unsourced",
    title: "What could not be sourced",
    plain: "Several things this page would have liked to state could not be read from a primary page, and are named rather than guessed.",
    detail: "OnCo could not confirm which, if any, Russian registries are included in IARC's Cancer Incidence in Five Continents volume XII, because the volume's registry tables are rendered in the browser and the underlying list was not retrievable. It could not establish a national figure for what a Russian cancer patient pays out of pocket for a course of treatment. It could not count the oncology items on the current vital and essential medicines list: the 2019 government order that approved it, read in the edition of 15 January 2025, is marked as having lost force on the legal database used, and the successor order was not located. It did not read the primary text of the European Union regulations to establish how medicines are treated under them. It could not read Rosstat's own mortality tables directly: rosstat.gov.ru is served with a certificate from the Russian national certification authority that clients outside Russia do not trust by default, and the federal compulsory medical insurance fund's site did not respond at all from outside the country. Cancer mortality on this page therefore comes from GLOBOCAN rather than from Rosstat.",
    links: [
      { label: "Cancer Incidence in Five Continents volume XII (IARC)", url: "https://ci5.iarc.fr/ci5-xii/" },
      { label: "Rosstat (Russian)", url: "https://rosstat.gov.ru/" },
      { label: "GLOBOCAN 2022: Russian Federation fact sheet (IARC)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/643-russian-federation-fact-sheet.pdf" },
    ],
  },
  {
    id: "contradictions",
    title: "Where the sources contradict each other",
    plain: "The national report disagrees with itself in two places, and with GLOBOCAN in one that matters for any comparison.",
    detail: "Within the 2025 volume, the summary chapter reports 36,987 people who died of cancer without ever being registered, 16.7 for every 100 cancer deaths, while the analytical chapter at the back gives 36,434 and 16.4 for the same year; the summary gives non-cancer deaths among registered patients as 27.8 per 100 while table 24 gives 29.6. Both discrepancies are small but they mean a reader cannot reconstruct a national cancer death count from the report, and this page does not try. Against GLOBOCAN, the registry's count of non-melanoma skin cancer is about four times the GLOBOCAN estimate for 2022, and the registry's national morphological verification of 97.1 per cent sits against an audited regional range of 61.7 to 89 per cent in the north-west for 2013 to 2017. None of this makes the Russian figures wrong; it makes them figures that have to be read with their definitions attached, which is true of every registry on this site.",
    links: [SOST_2025, { label: "Comparability and validity of cancer registry data in the northwest of Russia (Acta Oncol 2021)", url: "https://doi.org/10.1080/0284186X.2021.1967443" }],
  },
];

/**
 * Interventional studies on ClinicalTrials.gov with the condition query "cancer" and at least one site in the Russian
 * Federation, by start year, counted through the API v2 on 25 September 2026 with
 * filter.advanced=AREA[LocationCountry]"Russian Federation" AND AREA[StudyType]INTERVENTIONAL AND AREA[StartDate]RANGE[...].
 * 2026 is a partial year. The all-years total on the same query was 1,628.
 */
export const RU_TRIAL_STARTS: Array<{ year: number; studies: number }> = [
  { year: 2015, studies: 91 },
  { year: 2016, studies: 72 },
  { year: 2017, studies: 106 },
  { year: 2018, studies: 96 },
  { year: 2019, studies: 110 },
  { year: 2020, studies: 130 },
  { year: 2021, studies: 111 },
  { year: 2022, studies: 45 },
  { year: 2023, studies: 31 },
  { year: 2024, studies: 30 },
  { year: 2025, studies: 36 },
  { year: 2026, studies: 10 },
];

/** Largest lead sponsors on the same query, split before and after the change. Counted 25 September 2026. */
export const RU_TRIAL_SPONSORS = {
  before: { period: "2018 to 2021", total: 447, rows: [["Merck Sharp & Dohme", 57], ["AstraZeneca", 47], ["Hoffmann-La Roche", 33], ["Bristol-Myers Squibb", 19], ["Novartis", 18], ["Janssen Research & Development", 16], ["Federal Research Institute of Pediatric Hematology, Oncology and Immunology", 13], ["Pfizer", 12], ["GlaxoSmithKline", 11]] as Array<[string, number]> },
  after: { period: "2023 onwards", total: 107, rows: [["Tomsk National Research Medical Center", 11], ["Blokhin Russian Cancer Research Center", 9], ["Biocad", 8], ["St Petersburg State Pavlov Medical University", 7], ["Federal Research Institute of Pediatric Hematology, Oncology and Immunology", 7], ["Saint Petersburg State University", 7], ["National Medical Research Radiological Centre", 6], ["N. N. Petrov National Medical Research Center of Oncology", 5], ["R-Pharm", 5], ["AstraZeneca", 4]] as Array<[string, number]> },
};

/** Entity ids to render from the graph, in display order. Missing ids are skipped at render time. */
export const RU_INSTITUTIONS = ["blokhin-cancer-center", "nmrrc-moscow", "petrov-institute", "rogachev-centre", "tomsk-cancer-research-institute", "tatarstan-cancer-center", "russco"];
export const RU_COMPANIES = ["biocad", "r-pharm"];
export const RU_DRUGS = ["bcd-100", "bcd-217"];
export const RU_TRIALS = ["nct05732805", "nct05751928", "nct06640530", "nct05802225", "nct07108309", "nct06668792", "nct07742215", "nct07386938", "nct07553988", "nct00883116", "nct05654454"];
export const RU_PAPERS = ["paper-nct05732805-eur-j-cancer-2025", "paper-tjulandin-prolgolimab-miraculum-ejc-2021", "paper-laktionov-prolgolimab-domajor-ejc-2025", "paper-barchuk-registry-validity-acta-oncol-2021", "paper-barchuk-registry-completeness-bmc-cancer-2023"];
export const RU_PEOPLE = ["ivan-s-stilidi"];
