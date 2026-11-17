import type { CountryDive } from "@/data/country-dive";

/**
 * Thailand deep dive: the hand-written cards for /countries/th/ (wave 3). Thai sources were read in Thai, from the raw
 * text of each PDF or page (pdftotext or the HTML itself), not from a summary of it: the National Cancer Institute's
 * Cancer in Thailand Vol. XI (2019-2021) and Hospital-Based Cancer Registry 2025, the National Drug Policy Division's
 * pages on the National List of Essential Medicines (Internet Archive copies, the live site answering 502), the Thai
 * FDA's own slides on registration timelines, HITAP's policy brief, and press reports of the National Health Security
 * Office's own figures, because nhso.go.th did not answer from our network. Every figure below is quoted from one of
 * those; where a figure could not be read it is named under `gaps`.
 */
const CIT_XI = "https://www.nci.go.th/files/cancer_stat/1771382030_file.pdf";
const HBCR_2025 = "https://www.nci.go.th/files/cancer_stat/1787713678_file.pdf";
const NCI_STATS = "https://www.nci.go.th/Cancer_Statistics.html";
const NHSO_CANCER_2026 = "https://www.pptvhd36.com/news/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E/277086";
const NHSO_FIT_2026 = "https://www.pptvhd36.com/news/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E/279016";
const NHSO_CERVIX_2026 = "https://www.pptvhd36.com/news/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E/278714";
const ANYWHERE_2020 = "https://www.infoquest.co.th/?p=47313";
const ANYWHERE_2025 = "https://www.thaipost.net/news-update/735796/";
const OCPA_2018 = "https://www.thaipost.net/main/detail/13554";
const NLEM_SUBLISTS = "https://web.archive.org/web/20250908221706/https://ndp.fda.moph.go.th/drug/category/cat5";
const NLEM_NOTICES = "https://web.archive.org/web/20260710232928/https://ndp.fda.moph.go.th/drug/category/cat11";
const FDA_TIMELINES = "https://www.pmda.go.jp/files/000279149.pdf";
const HITAP_PB20 = "https://www.hitap.net/wp-content/uploads/2014/12/PB_20-WTP-Eng-Final-for-web.pdf";
const IMCRANIB = "https://www.thaipbs.or.th/news/content/506671";
const SRUAMSIRI = "https://doi.org/10.1371/journal.pone.0119945";
const VARGAS = "https://doi.org/10.1016/j.jcpo.2026.100799";

export const TH_DIVE: CountryDive = {
  iso2: "TH",
  iso3: "THA",
  name: "Thailand",
  flag: "🇹🇭",
  asOf: "2026-11-04",
  title: "Cancer in Thailand",
  description:
    "Cancer in Thailand from Thai sources: the National Cancer Institute's estimate of 140,799 new cancers a year in 2019 to 2021 from 16 provincial registries, liver and bile duct cancer as the commonest cancer in men, the three public schemes and the gold card's Cancer Anywhere policy, the R2 list that funds expensive cancer medicines, how cost-effectiveness evidence shapes the national medicines list, the Thai FDA's 220-day and 154-day review routes, and free bowel and cervical screening for every Thai in the target ages.",
  lede:
    "Thailand counts cancer through provincial registries pooled by its National Cancer Institute, which estimate about 140,800 new cancers a year, with liver and bile duct cancer the commonest in men. Most Thais are covered by the gold-card Universal Coverage Scheme, whose Cancer Anywhere policy has since 2021 let a person with cancer be treated at any hospital ready to treat it, under the rules restored in 2025 without a referral letter, and expensive cancer medicines are funded through a restricted list built on cost-effectiveness evidence and price negotiation.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Thailand is 176,951 new cancers and 116,234 deaths in 2024, including 2,641 non-melanoma skin cancers (174,310 without them). GLOBOCAN's incidence for Thailand is built from subnational registry rates applied to the 2024 population (method 2b), and its deaths are derived from those incidence estimates through modelled mortality-to-incidence ratios (method 3c) rather than counted from death certificates. The national registry's own figure is lower and older: Cancer in Thailand Vol. XI estimates a mean of 140,799 new cancers a year in 2019 to 2021 (73,122 in women; the report gives 67,677 men in one table and 67,667 in another), with age-standardised rates of 137.6 per 100,000 in men and 132.9 in women against GLOBOCAN's 141.75 for both sexes. The registry figure counts other skin cancers (3,354 a year) and myelodysplastic disease (1,267), excludes in situ tumours, and covers 2019 to 2021. Both put liver and bile duct cancer first, followed by the same three sites in a different order: GLOBOCAN has lung, breast and colorectum; the registry, with colon and rectum added together, has breast (18,590), colorectum (18,187) and lung (17,947).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Thailand",
      aside: { label: "NCI Thailand: Cancer in Thailand Vol. XI, 2019-2021 (PDF)", url: CIT_XI },
      cards: [
        {
          id: "shape",
          title: "About 140,800 new cancers a year, with liver and bile duct cancer leading in men and breast cancer in women",
          plain:
            "Thailand's National Cancer Institute estimates 140,799 new cancers a year in 2019 to 2021. In men the commonest are liver and bile duct cancer, lung cancer and bowel cancer; in women breast cancer, then bowel, lung, liver and cervical cancer. Age-standardised rates fell against the previous three years while the estimated number of cases rose.",
          detail:
            "Cancer in Thailand Vol. XI gives mean annual estimates for the whole country for 2019 to 2021: 13,561 liver and bile duct cancers in men (age-standardised rate 27.2 per 100,000) and 5,930 in women, 11,060 lung cancers in men and 6,887 in women, 18,421 breast cancers in women, 10,021 colon and rectal cancers in men and 8,166 in women, 5,219 cervical cancers and 4,701 prostate cancers. Against Volume X (2016 to 2018), the all-sites age-standardised rate fell from 147.5 to 137.6 per 100,000 in men and from 141.8 to 132.9 in women, while estimated new cases rose from 139,206 to 140,799 on a population of 65,988,354. The report says a larger than projected fall in liver and bile duct cancer may be due to the long-standing hepatitis vaccination policy, screening of people with chronic hepatitis and liver fluke prevention; it records rises in colorectal cancer in both sexes, breast cancer and prostate cancer, which it links to an ageing population and modern lifestyles, and a continuing fall in cervical cancer it attributes to screening and HPV vaccination.",
          links: [
            { label: "NCI Thailand: Cancer in Thailand Vol. XI, 2019-2021, Tables C, D and i (PDF)", url: CIT_XI },
            { label: "NCI Thailand: cancer statistics page", url: NCI_STATS },
          ],
        },
        {
          id: "registries",
          title: "How Thailand counts: 16 provincial registries pooled into a national estimate",
          plain:
            "Thailand's national cancer figures are estimates, not a count of every case. Provincial population-based registries count every cancer in their own area, and the National Cancer Institute scales their rates up, region by region, to estimate the national total. Bangkok's registry is counted as it is. The latest volume, Volume XI, covers cancers diagnosed in 2019 to 2021.",
          detail:
            "The first population-based registry started in Chiang Mai in 1986, followed by Khon Kaen in 1988, Bangkok in 1990 and Lampang in 1993, and the first volume of Cancer in Thailand was published in 1993 with the International Agency for Research on Cancer. The country now has 19 population-based registries; Volume XI uses 16 (Chiang Mai, Lampang, Lamphun, Nan, Khon Kaen, Ubon Ratchathani, Udon Thani, Lop Buri, Suphan Buri, Pathum Thani, Bangkok, Chon Buri, Rayong, Chanthaburi, Surat Thani and Songkhla), with Nan, Pathum Thani and Chanthaburi new in this volume. Registrars collect cases from hospitals, laboratories and death certificates, match deaths to registered cases, code to ICD-O-3 and register but do not count in situ cancers. For the national estimate, each region's registries are pooled, age and sex specific rates are applied to the region's population, and the expected cases of the five regions are added to Bangkok's actual cases. The National Cancer Institute's own hospital-based registry, kept since 1985, counted 3,159 new cancer patients at the institute in 2025; that is one hospital's caseload, not a national count.",
          links: [
            { label: "Cancer in Thailand Vol. XI, chapters 1 and 2 (PDF)", url: CIT_XI },
            { label: "NCI Thailand: Hospital-Based Cancer Registry 2025 (PDF, Thai)", url: HBCR_2025 },
          ],
        },
        {
          id: "liver-north-east",
          title: "Liver and bile duct cancer is highest in the north-east",
          plain:
            "Liver and bile duct cancer is the commonest cancer in Thai men, and its rate is highest in the registries of the north-eastern provinces. The national report says a fall in this cancer may be due to hepatitis vaccination, screening of people with chronic hepatitis and prevention of liver fluke disease. In Khon Kaen it is the leading cancer in men, at about twice the rate seen in Bangkok.",
          detail:
            "The Khon Kaen registry's summary in Volume XI reports 1,775 new cancers in men and 1,677 in women registered in 2020, with liver and bile duct cancer ranking first in men at an age-standardised rate of 42.9 per 100,000, followed by lung (16.0) and colon and rectum (16.0). Bangkok's registry table gives a rate of 20.0 per 100,000 for liver and bile duct cancer in men over 2019 to 2021, and the national estimate is 27.2. The national report says the fall in this cancer may be due to hepatitis vaccination, screening of people with chronic hepatitis, and management to prevent liver fluke disease. The registries of Udon Thani (38.9) and Ubon Ratchathani (36.8), also in the north-east, have the next highest rates in men. Cholangiocarcinoma trials with Thai sites in OnCo's records include KEYNOTE-966, TOPAZ-1, FIGHT-202 and a phase 3 trial of futibatinib in biliary tract cancer.",
          links: [
            { label: "Cancer in Thailand Vol. XI, section 3.5, Khon Kaen Cancer Registry (PDF)", url: CIT_XI },
            { label: "NCI Thailand: cancer statistics page", url: NCI_STATS },
          ],
        },
      ],
      tables: [
        {
          id: "cancer-in-thailand-xi",
          title: "Estimated new cancers a year in Thailand, 2019 to 2021, by site and sex",
          caption: "Mean annual estimated new cases for the whole country, and age-standardised rate per 100,000 (world standard), from Cancer in Thailand Vol. XI.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "men", label: "Men, cases a year", numeric: true },
            { key: "women", label: "Women, cases a year", numeric: true },
            { key: "asrM", label: "Rate, men", numeric: true },
            { key: "asrF", label: "Rate, women", numeric: true },
          ],
          rows: [
            { site: "All sites (men: 67,677 in Table i, 67,667 in Tables B and C)", men: 67677, women: 73122, asrM: 137.6, asrF: 132.9 },
            { site: "Liver and bile duct (C22, C24)", men: 13561, women: 5930, asrM: 27.2, asrF: 9.4 },
            { site: "Trachea, bronchus and lung", men: 11060, women: 6887, asrM: 21.5, asrF: 11.1 },
            { site: "Breast", men: 169, women: 18421, asrM: 0.3, asrF: 34.9 },
            { site: "Colon and rectum (C18 to C20; rate is the sum of the two sites)", men: 10021, women: 8166, asrM: 19.9, asrF: 13.6 },
            { site: "Cervix uteri", men: null, women: 5219, asrM: null, asrF: 10.3 },
            { site: "Prostate", men: 4701, women: null, asrM: 8.7, asrF: null },
            { site: "Thyroid", men: 666, women: 3022, asrM: 1.5, asrF: 6.6 },
            { site: "Non-Hodgkin lymphoma", men: 2634, women: 2233, asrM: 5.8, asrF: 4.1 },
            { site: "Oesophagus", men: 2052, women: 306, asrM: 4.1, asrF: 0.5 },
          ],
          note: "These are modelled national estimates from 16 provincial registries (Bangkok counted directly), not a count of every case. All sites include other skin cancers and myelodysplastic disease and exclude in situ tumours. Thailand's national registry does not publish deaths by cancer site; see the gaps below.",
          sources: [{ label: "NCI Thailand: Cancer in Thailand Vol. XI, Tables C, D and i (PDF)", url: CIT_XI }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: three public schemes, with the gold card covering most people",
      aside: { label: "Thai Post: Cancer Anywhere restored to its earlier rules (6 February 2025, Thai)", url: ANYWHERE_2025 },
      cards: [
        {
          id: "schemes",
          title: "Three public schemes: the gold card, civil servants' benefits and social security",
          plain:
            "Thais are covered by one of three public schemes: the Universal Coverage Scheme, known as the gold card or 30-baht scheme, run by the National Health Security Office; the Civil Servant Medical Benefit Scheme, run by the Comptroller General's Department; and the Social Security Scheme for private-sector employees. In 2013 the gold card covered about three in four Thais. In 2025 about 634,000 people with cancer used gold-card services.",
          detail:
            "The National Health Security Office reported in June 2026 that 633,866 people with cancer used services under the gold card (บัตรทอง 30 บาท) in fiscal year 2025, up from 357,737 in fiscal year 2021, with new patients rising from about 166,000 to about 248,000 a year, outpatient visits from 1,677,509 to 3,522,486 and inpatient admissions from 490,519 to 627,165. Its secretary-general listed the cancer benefits added since 2013: stem cell transplants for leukaemia and lymphoma (2013), one national standard for cancer treatment (2014), wider cervical screening (2017), HPV vaccination for girls in grade 5 and colorectal screening (2018), HPV DNA testing and a home chemotherapy pilot for colorectal cancer (2020), Cancer Anywhere (2021), BRCA1 and BRCA2 testing for high-risk breast cancer patients and relatives (2022), mammography and ultrasound screening, proton therapy and robotic surgery (2024), the 9-valent HPV vaccine and transport costs (2025), and MR-Linac radiotherapy and 3D-printed brachytherapy applicators (2026). The office also reported that the death rate among gold-card cancer patients fell from 20.3% in fiscal 2021 to 11.8% in fiscal 2025; that is its own administrative measure, not a survival statistic. A 2015 study gives the split for 2013: the Universal Coverage Scheme 76.3% of the population, the Civil Servant Medical Benefit Scheme 7.6% and the Social Security Scheme 16.1%; no more recent three-way split could be read (see gaps). The Civil Servant Medical Benefit Scheme pays for high-cost cancer medicines through its own direct-billing system, OCPA, described under assessment below.",
          links: [
            { label: "PPTV: NHSO on cancer care in the gold-card scheme, 7 June 2026 (Thai)", url: NHSO_CANCER_2026 },
            { label: "Sruamsiri et al., scheme membership in 2013 (PLoS One 2015)", url: SRUAMSIRI },
            { label: "National Health Security Office", url: "https://www.nhso.go.th" },
            { label: "Social Security Office", url: "https://www.sso.go.th" },
          ],
        },
        {
          id: "cancer-anywhere",
          title: "Cancer Anywhere: since January 2021, treatment at any hospital ready to treat the cancer",
          plain:
            "Since 1 January 2021 a gold-card patient with cancer can be treated at any hospital ready to treat their cancer. The aim was to shorten waiting times. A revised version due in April 2025 was cancelled and the 2023 to 2024 rules restored, under which no referral letter from the unit the patient is registered with is needed.",
          detail:
            "The Minister of Public Health announced the policy on 11 November 2020 as one of five New Normal Medical Care measures, to let cancer patients be treated at any ready hospital, cut queues and treat sooner, starting on 1 January 2021. In February 2025 the Minister stated that the National Health Security Office's secretary-general had signed an order cancelling a revised set of Cancer Anywhere rules due to apply from 1 April 2025, returning to the 2023 to 2024 rules: patients go to a hospital with cancer capability without a referral letter, the NHSO pays the hospital directly, and the hospital can bill for radiotherapy, chemotherapy, surgery, complications of the cancer and other diseases the patient has. Patient data move between hospitals through the National Cancer Institute's Thai Cancer Base (TCB Plus) and the digital ministry's Health Link. The policy dates from 2021; 2018 is the year HPV vaccination and colorectal screening entered the gold card.",
          links: [
            { label: "InfoQuest: Cancer Anywhere from 1 January 2021, 11 November 2020 (Thai)", url: ANYWHERE_2020 },
            { label: "Thai Post: revised rules cancelled, earlier rules restored, 6 February 2025 (Thai)", url: ANYWHERE_2025 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Thailand decides which cancer medicines the schemes pay for",
      aside: { label: "National Drug Policy Division: NLEM sub-lists (Internet Archive, Thai)", url: NLEM_SUBLISTS },
      cards: [
        {
          id: "r2-list",
          title: "The essential medicines list, and its R2 list for very expensive medicines",
          plain:
            "The National List of Essential Medicines sets which medicines the public schemes pay for. Very expensive medicines that need specialist use, many cancer medicines among them, go on a restricted sub-list now called R2 (formerly E2), where each prescription is approved through a central authorisation system and every scheme is expected to fund them.",
          detail:
            "The National Drug Policy Division of the Thai FDA defines R2, equivalent to the former list E(2), as medicines for patients with specific needs: medicines suited to only some indications, at risk of incorrect prescribing, needing disease-specific expertise or advanced technology, and very expensive or with a large effect on what society and patients can afford. They therefore need an authorisation system run by the benefit agency or a designated central agency, hospitals must monitor and record their use, and every health insurance fund is to develop financing so that patients can get them without a high financial burden on providers. The list is issued by the National Drug System Development Committee; the division's list of notices, as archived on 10 July 2026, gives the notice in force as the National List of Essential Medicines 2026, dated 12 February 2026, replacing the list of 4 January 2024 and its amendment of 30 August 2024. A 2015 study dates the special high-cost category to 2007 to 2009, when it came with compulsory licences, price negotiation, pooled procurement and company programmes, and estimated that patients treated with letrozole rose from 645 to 3,683 and with trastuzumab from 68 to 412. A 2026 comparison found Thailand's list holds 58 of the 64 cancer medicines on the World Health Organization's 2023 list and 127 cancer medicines in all.",
          links: [
            { label: "National Drug Policy Division: NLEM sub-lists, R1 and R2 (Internet Archive, 8 September 2025, Thai)", url: NLEM_SUBLISTS },
            { label: "National Drug Policy Division: NLEM notices (Internet Archive, 10 July 2026, Thai)", url: NLEM_NOTICES },
            { label: "Sruamsiri et al., access to targeted cancer therapies in Thailand (PLoS One 2015)", url: SRUAMSIRI },
            { label: "Vargas et al., WHO essential cancer medicines in Chile, Kenya and Thailand (J Cancer Policy 2026)", url: VARGAS },
          ],
        },
        {
          id: "hitap-threshold",
          title: "Cost-effectiveness evidence and a stated threshold: 160,000 baht per quality-adjusted life year",
          plain:
            "Cost-effectiveness is one of the factors weighed before a medicine is added to the list, and Thailand's health technology assessment programme, HITAP, is part of that work. The value per quality-adjusted life year used by the list's subcommittee in 2013 was 160,000 baht: a medicine costing less than that per year of healthy life gained was considered cost-effective.",
          detail:
            "HITAP's July 2015 policy brief states that the value of a quality-adjusted life year used to screen medicines for the National List of Essential Medicines in 2013 was 160,000 baht, which it gives as approximately 1.2 times gross national income, and that medicines costing less than that are considered cost-effective. Its 2012 survey of 4,320 people in 11 provinces, part of an Asian collaborative study with South Korea, Japan and Malaysia, found Thais willing to pay 195,000 to 325,000 baht for a year of life gained but 113,000 to 156,000 baht for a gain in quality of life only, and the brief recommends that the value should vary with the situation. A 2009 history by HITAP researchers traces how demands after 2006 to add expensive technologies to the public benefit package made health technology assessment part of national decisions. The 2026 comparison of cancer medicine lists calls Thailand's route a technical-negotiation model, using assessment-informed selection and negotiation. Whether the 2013 figure has since been revised was not verified and is named under gaps.",
          links: [
            { label: "HITAP policy brief: What is the value of a QALY and how much is it? (July 2015, PDF)", url: HITAP_PB20 },
            { label: "Teerawattananon et al., Historical development of health technology assessment in Thailand (2009)", url: "https://doi.org/10.1017/S0266462309090709" },
            { label: "Vargas et al. (J Cancer Policy 2026)", url: VARGAS },
          ],
        },
        {
          id: "ocpa",
          title: "Civil servants' scheme: high-cost cancer medicines through direct billing",
          plain:
            "The civil servants' scheme pays for high-cost medicines for cancer and blood diseases through a direct-billing system called OCPA, run by the Comptroller General's Department. As the department described it in 2018, its indications could be wider than the essential medicines list's, and its members could still obtain medicines outside the list when medically necessary.",
          detail:
            "In July 2018 the Director-General of the Comptroller General's Department described the OCPA system for direct billing of medicines for cancer and haematology patients that need high-cost drugs. A working group including the Thai Society of Clinical Oncology and the Thai Society of Hematology reviews the medicines and indications; where interchangeable medicines exist, prices are negotiated and one is chosen for the system, which the department said cut some prices by more than half. That revision raised the medicines covered from 6 to 9 and the indications from 7 diseases to 17, which the department expected to increase access about 1.5 times for lung cancer patients and twice for breast cancer patients. Six of the OCPA medicines were also on list E(2), but with wider indications: rituximab, for example, was payable in OCPA for diffuse large B-cell, follicular, mantle cell and marginal zone lymphoma and chronic lymphocytic leukaemia, against diffuse large B-cell lymphoma alone on E(2). The department stated that scheme members can still obtain medicines outside the essential list if medically necessary, under Ministry of Finance rules. The current OCPA list was not read for this page.",
          links: [{ label: "Thai Post: Comptroller General's Department revises OCPA rules, 17 July 2018 (Thai)", url: OCPA_2018 }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Thai FDA and its reliance route",
      aside: { label: "Thai FDA: Collaboration on Streamlining Review for Pharmaceuticals (PDF)", url: FDA_TIMELINES },
      cards: [
        {
          id: "fda-routes",
          title: "220 working days for a full review of a new medicine, 154 when it relies on a reference regulator",
          plain:
            "The Thai FDA registers new medicines on a full assessment, with a target of 220 working days, or an abridged assessment that relies on another regulator's detailed report, with a target of 154. A medicine prequalified by the World Health Organization or approved by a stringent regulator, submitted through a collaborative registration procedure, has a 90-day target. These are targets, not measured approval times.",
          detail:
            "The Thai FDA's slides for the 11th Thailand-Japan Symposium cite its public manual for modern drug registration submitted electronically (1 September 2025) and a notification on registration guidance dated 8 October 2025. Target times in working days are: new drugs and new biologics 220 full and 154 abridged; vaccines 280 and 154; biological products 160 and 110; new generics and generics 135 and 115; and 90 for the World Health Organization prequalification and stringent regulatory authority collaborative procedures; where an application deviates from the reference approval, the deviations must be notified and, in the slides' words, the timeline will be reduced by 30% from standard review. For the two collaborative procedures, the slides say the clock starts once a valid application is received and access to the confidential information is granted, whichever is later. The abridged route accepts unredacted assessment reports submitted and certified by sponsors, certified by Japan's PMDA, or sent by Australia's TGA with a letter of consent, and the Thai FDA reserves the right to perform a full assessment. Reviewers then weigh factors specific to Thailand: ethnicity and disease patterns, whether required gene tests are available, interactions with traditional herbal medicines and Asian fruits, clinical practice guidelines, and stability studies under ASEAN zone IVb conditions. The September 2025 revision added pre-submission and pre-review meetings for abridged reviews.",
          links: [{ label: "Thai FDA: Collaboration on Streamlining Review for Pharmaceuticals, 11th Thailand-Japan Symposium (PDF)", url: FDA_TIMELINES }],
        },
        {
          id: "fda-example",
          title: "One measured case, and no published average for cancer medicines",
          plain:
            "The Thai FDA's own example of the reliance route is a medicine for Alzheimer's disease approved in 179 working days in 2025 through cooperation with Japan's regulator. OnCo found no published average time from application to approval for cancer medicines in Thailand.",
          detail:
            "The symposium slides present the Alzheimer's case as an accelerated review through bilateral cooperation with the PMDA and the Thai FDA's subcommittee on drug regulatory science and innovation, completed in 179 working days against the 220-day standard. They do not give figures for cancer medicines, and OnCo did not find a Thai FDA report of median approval times by therapeutic area. For a cancer medicine, registration is the first step: payment by the public schemes depends on listing on the National List of Essential Medicines (often on its R2 list) or on the civil servants' scheme's OCPA list, each with its own process and timing. In May 2025 the Thai FDA registered Imcranib 100, a targeted cancer tablet made in Thailand, which was added to the Thai Innovation List on 30 March 2026.",
          links: [
            { label: "Thai FDA: Collaboration on Streamlining Review for Pharmaceuticals (PDF)", url: FDA_TIMELINES },
            { label: "Thai PBS: Imcranib 100, first lot delivered, June 2026 (Thai)", url: IMCRANIB },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: free bowel and cervical screening for every Thai in the target ages",
      aside: { label: "PPTV: NHSO on FIT screening, 6 July 2026 (Thai)", url: NHSO_FIT_2026 },
      cards: [
        {
          id: "bowel-screening",
          title: "A stool test every two years for everyone aged 50 to 70, whatever their scheme",
          plain:
            "Every Thai aged 50 to 70 can have a free faecal immunochemical test, a stool test for hidden blood, once every two years, whichever scheme covers them. A positive result leads to a colonoscopy. In 2025 about 1.39 million people were tested and about 46% of gold-card members with a positive result had the colonoscopy.",
          detail:
            "The National Health Security Office's deputy secretary-general reported in July 2026 that the test is a health promotion and prevention benefit covering Thais aged 50 to 70 under every scheme, once every two years, with counselling and referral for colonoscopy, biopsy or polyp removal after a positive result. People tested numbered 1,450,656 in fiscal year 2023, 1,331,915 in 2024 and 1,387,573 in 2025. In 2025, 102,450 results (7.38%) were positive. Among gold-card members, 1,104,325 were tested, 81,066 were positive and 37,314 of those (46.03%) had a colonoscopy, up from 30.27% in 2023 and 38.51% in 2024, against a target of at least 50%. For fiscal 2026 to 2 May 2026, 857,266 people had been tested and 81,296 were positive. The office named follow-up colonoscopy capacity as the system's challenge. OnCo found no published figure for the share of the eligible population tested.",
          links: [{ label: "PPTV: NHSO on FIT screening results, 6 July 2026 (Thai)", url: NHSO_FIT_2026 }],
        },
        {
          id: "cervical-screening",
          title: "HPV testing, including a self-sampling kit ordered through a phone app",
          plain:
            "Thai women aged 30 to 59 can be screened for cervical cancer free with an HPV DNA test, taken by a health worker or by themselves with a home kit, every five years after a negative result. HPV testing is now most of the screening done: about 85% in 2025, when 1.41 million women were screened.",
          detail:
            "The National Health Security Office reported in July 2026 that cervical screening rose from 869,831 women in fiscal year 2022 to 1,049,610 in 2023 and 1,514,891 in 2024, and was 1,414,771 in 2025, 64.34% of its target. HPV DNA tests were 1,207,640 of the 2025 screens (85.35%); 30,819 women (2.55%) had HPV types 16 or 18 and 90,781 (7.52%) other high-risk types. Self-sampling has been funded since 2023. Among gold-card members, 15,156 women had a colposcopy in 2025, 38.99% of those who needed one, and confirmatory testing found 827 cervical cancers, 697 of which (84.28%) had started treatment. A 2023 report describes the self-sampling kit as a benefit for Thai women aged 30 to 59, ordered free through the Paotang app, returned to a health unit, with results sent through the app and a repeat test every five years after a negative result. The gold card has paid for HPV vaccination of girls in grade 5 since 2018, switching to the 9-valent vaccine in 2025. Breast screening by mammography and ultrasound was added to the gold card in 2024; its eligibility criteria were not read for this page.",
          links: [
            { label: "PPTV: NHSO on cervical screening, 1 July 2026 (Thai)", url: NHSO_CERVIX_2026 },
            { label: "Bangkok Biz News: HPV DNA self-sampling, 3 July 2023 (Thai)", url: "https://www.bangkokbiznews.com/health/1076487" },
            { label: "PPTV: NHSO cancer benefits since 2013, 7 June 2026 (Thai)", url: NHSO_CANCER_2026 },
          ],
        },
      ],
      tables: [
        {
          id: "nhso-screening",
          title: "People screened under National Health Security Office funding, fiscal years 2022 to 2025",
          caption: "Number of people screened under the NHSO's health promotion and prevention benefit, which covers Thais of every scheme, Thai fiscal years (October to September), as reported by the NHSO in July 2026.",
          columns: [
            { key: "year", label: "Fiscal year" },
            { key: "fit", label: "Faecal immunochemical test, ages 50 to 70", numeric: true },
            { key: "cervix", label: "Cervical screening, all methods", numeric: true },
            { key: "hpv", label: "Of which HPV DNA test", numeric: true },
          ],
          rows: [
            { year: "2022", fit: null, cervix: 869831, hpv: 651017 },
            { year: "2023", fit: 1450656, cervix: 1049610, hpv: 838361 },
            { year: "2024", fit: 1331915, cervix: 1514891, hpv: 1325991 },
            { year: "2025", fit: 1387573, cervix: 1414771, hpv: 1207640 },
          ],
          note: "Counts of people tested, not coverage of the eligible population: the NHSO gives cervical screening in 2025 as 64.34% of its target but no population denominator for either test. The 2022 bowel screening figure was not given in the report read.",
          sources: [
            { label: "PPTV: NHSO on FIT screening, 6 July 2026 (Thai)", url: NHSO_FIT_2026 },
            { label: "PPTV: NHSO on cervical screening, 1 July 2026 (Thai)", url: NHSO_CERVIX_2026 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Thailand does",
      title: "What Thailand does that others do not",
      cards: [
        {
          id: "licences-and-lists",
          title: "Compulsory licences and a high-cost list to bring targeted cancer medicines within reach",
          plain:
            "Between 2006 and 2008 Thailand's Ministry of Public Health issued government use licences for seven patented medicines, cancer medicines among them, and in the same years created a special category on its essential medicines list for very expensive medicines. Afterwards the estimated number of patients treated with letrozole rose more than fivefold.",
          detail:
            "A 2011 assessment by HITAP researchers records that the Ministry granted government use licences for seven patented drugs between 2006 and 2008 to improve access, estimates that an additional 84,158 patients received the seven drugs over five years and 12,493 quality-adjusted life years were gained, and finds no relationship between the licences and foreign investment over 2002 to 2008, though exports of three products to the United States fell after it withdrew trade preferences. A 2015 study of targeted cancer medicines describes what happened around them in 2007 to 2009: the government created a special category on the national list with different coverage requirements for payers and issued compulsory licences, payers negotiated prices and pooled procurement, and companies expanded patient assistance programmes and lowered prices. Estimated patients treated rose for letrozole from 645 to 3,683, for imatinib from 103 to 350 and for trastuzumab from 68 to 412. That special category is today's R2 list.",
          links: [
            { label: "Yamabhai et al., Government use licenses in Thailand (Global Health 2011)", url: "https://doi.org/10.1186/1744-8603-7-28" },
            { label: "Sruamsiri et al. (PLoS One 2015)", url: SRUAMSIRI },
          ],
        },
        {
          id: "made-in-thailand",
          title: "A targeted cancer medicine made in Thailand, given to the public scheme",
          plain:
            "In June 2026 the Chulabhorn Royal Academy delivered the first lot of Imcranib 100, a targeted cancer tablet made at its own pharmaceutical plant, to the National Health Security Office's distribution centre for gold-card patients. The report says it can be used for several cancers, among them chronic myeloid leukaemia, Philadelphia-positive acute lymphoblastic leukaemia, gastrointestinal stromal tumour and dermatofibrosarcoma protuberans.",
          detail:
            "Thai PBS reported on 4 June 2026 that Princess Chulabhorn, president of the Chulabhorn Royal Academy, had granted 690,000 tablets of Imcranib 100 to the National Health Security Office, on the occasion of her birthday on 4 July, and that on 2 June the academy's plant delivered the first lot to the Government Pharmaceutical Organization's distribution centre, which distributes medicines for the NHSO, for onward distribution to hospitals for gold-card patients. The report calls it the first targeted cancer medicine produced in Thailand, made at the academy's royal-initiative pharmaceutical plant, established in 2020, which it describes as the country's first cancer medicine plant certified to PIC/S good manufacturing and distribution practice. The Thai FDA registered it on 20 May 2025 and it was added to the Thai Innovation List on 30 March 2026. The report describes it as a tyrosine kinase inhibitor and names among its uses chronic myeloid leukaemia, Philadelphia-positive acute lymphoblastic leukaemia, gastrointestinal stromal tumour and dermatofibrosarcoma protuberans; the report read does not name the active ingredient, so OnCo does not link it to a drug record.",
          links: [{ label: "Thai PBS: Imcranib 100, first lot delivered, June 2026 (Thai)", url: IMCRANIB }],
        },
        {
          id: "screening-for-all",
          title: "Screening paid for by one fund for everyone, whatever their scheme",
          plain:
            "Thailand funds cancer screening through the gold card's health promotion and prevention benefit for every Thai citizen, including those covered by the civil servants' and social security schemes. Bowel and cervical screening are free in the target ages, and cervical self-sampling kits can be ordered through the Paotang phone app.",
          detail:
            "The National Health Security Office states that its faecal immunochemical test benefit covers Thais aged 50 to 70 under every scheme, not only gold-card members, and its secretary-general said in June 2026 that bowel, cervical and breast cancer screening under the health promotion and prevention benefit is available to all Thais of every scheme without charge. This puts screening in one fund for the whole population rather than splitting it across three schemes. The office reports colonoscopy and colposcopy follow-up rates for gold-card members only, 46.03% and 38.99% in 2025. The self-sampling route uses the Paotang app to order the kit and return results.",
          links: [
            { label: "PPTV: NHSO on FIT screening, 6 July 2026 (Thai)", url: NHSO_FIT_2026 },
            { label: "PPTV: NHSO cancer care, 7 June 2026 (Thai)", url: NHSO_CANCER_2026 },
            { label: "Bangkok Biz News: HPV DNA self-sampling, 3 July 2023 (Thai)", url: "https://www.bangkokbiznews.com/health/1076487" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-thailand",
          title: "237 trials in OnCo's records have a site in Thailand, most of them industry phase 3 trials",
          plain:
            "Of the trials in OnCo's records, 237 list a site in Thailand. Most are phase 3 trials run by international companies, with lung cancer the largest group, then breast, liver and bile duct, prostate and stomach cancer. Several large liver, bile duct and cervical cancer trials had sites in Thailand.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026: 237 trials list Thailand among their countries, 186 of them phase 3, 24 phase 2, 13 phase 1/2, 13 phase 2/3 and 1 phase 1. OnCo's records mark 80 as recruiting and 84 as active. ClinicalTrials.gov names AstraZeneca as lead sponsor of 66 and Merck Sharp & Dohme of 43; non-small cell lung cancer is the first-listed cancer for 82. By first-listed cancer, 11 are in hepatocellular carcinoma and 7 in cholangiocarcinoma, including HIMALAYA, REFLECT, EMERALD-1, KEYNOTE-966 and TOPAZ-1, and 4 in cervical cancer, including KEYNOTE-A18. A few are small and regional: a phase 1/2 trial of JIN-A02 in EGFR-mutant lung cancer and a phase 3 trial of golidocitinib in peripheral T-cell lymphoma each list three countries, and a personalised neoantigen vaccine trial lists Thailand alone. OnCo's OpenAlex snapshot of 8 September 2026 also records 4,324 ClinicalTrials.gov studies of all conditions with a site in Thailand.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Thailand", url: "https://clinicaltrials.gov/search?locStr=Thailand&country=Thailand&cond=Cancer" },
            { label: "KEYNOTE-966 (NCT04003636)", url: "https://clinicaltrials.gov/study/NCT04003636" },
          ],
        },
        {
          id: "research-output",
          title: "Oncology research output: 383 papers in 2025 with authors based in Thailand",
          plain:
            "OpenAlex counts 383 oncology papers with at least one author based in Thailand in 2025, up from 310 in 2021, and 1,710 over the five years. The National Cancer Institute's registry network, with the university registries in Chiang Mai and Khon Kaen, produces the country's cancer statistics.",
          detail:
            "OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Thailand 310 works in 2021, 343 in 2022, 319 in 2023, 355 in 2024 and 383 in 2025, 1,710 in total, of which 1,284 are open access and 56 highly cited. Cancer in Thailand Vol. XI was prepared with statistics and graphics from the Khon Kaen Cancer Registry and Wattanosoth cancer hospital in Bangkok, with contributors at Chiang Mai University, Khon Kaen University and the cancer hospitals of Lampang, Ubon Ratchathani, Udon Thani and Lop Buri, and data from hospitals including Chon Buri and Surat Thani cancer hospitals and Songklanagarind Hospital. Siriraj, Ramathibodi and Chulabhorn hospitals, all in Bangkok, appear on this page's institution list.",
          links: [
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "Cancer in Thailand Vol. XI, acknowledgements and contributors (PDF)", url: CIT_XI },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "nhso-unreachable",
      title: "The National Health Security Office's Thai site could not be reached",
      plain:
        "nhso.go.th did not answer from OnCo's network when this page was written, and its Thai site still did not answer on 17 November 2026. Its English site did answer that day. The office's cancer and screening figures on this page are quoted from Thai news reports of its own statements, each linked, rather than from its announcements or annual report.",
      detail:
        "Every request to www.nhso.go.th and eng.nhso.go.th on 4 November 2026 timed out without a response, and the Internet Archive answered 429 to the copy of the English site. On 17 November 2026 www.nhso.go.th timed out again, but eng.nhso.go.th answered. Its page on the scheme says that cancer patients can receive treatment at any qualified facility ready to provide it and that screening, vaccination and preventive services are available to all Thais, not only scheme members. Its report of the secretary-general's briefing to the House of Representatives on 5 November 2026 gives 47.026 million people entitled to the Universal Coverage Scheme in fiscal year 2025. The gold-card cancer figures, the Cancer Anywhere rules and the screening counts were read from the raw text of PPTV, InfoQuest and Thai Post reports quoting the NHSO's secretary-general, deputy secretary-general and the Minister of Public Health by name. Hfocus and Matichon, which also carried these statements, refused our requests with 403. The NHSO's annual report and the full text of the Cancer Anywhere notification were not read.",
      links: [
        { label: "National Health Security Office", url: "https://www.nhso.go.th" },
        { label: "NHSO English site: UCS at a glance", url: "https://eng.nhso.go.th/ucs-at-a-glance" },
        { label: "NHSO English site: 2024 to 2025 results reported to Parliament", url: "https://eng.nhso.go.th/posts/nhso-reports-2024-2025-ucs-results-to-parliament-as-service-units-increase-by-more-than-6-000" },
        { label: "PPTV: NHSO on cancer care, 7 June 2026 (Thai)", url: NHSO_CANCER_2026 },
      ],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find, from a source it could read, the national count of cancer deaths by site, population-based cancer survival for Thailand, how many people the civil servants' and social security schemes cover now (the latest three-way split read is for 2013; the gold card's own count for 2025 is 47.026 million), the current OCPA medicine list, or the Social Security Scheme's rules for cancer care.",
      detail:
        "Cancer in Thailand reports incidence only; the Ministry of Public Health's public health statistics, which tabulate deaths by cause, were not found in a readable edition for 2024, and secondary tables seen in search results disagreed with each other, so no national death figure is given and the GLOBOCAN deaths are modelled estimates. No national population-based survival figure was found. The NHSO's English site, read on 17 November 2026, gives 47.026 million people entitled to the Universal Coverage Scheme in fiscal year 2025 and says more than 99% of people are covered by a public scheme, but gives no count for the other two schemes; the 2013 shares on this page come from a 2015 study. The Comptroller General's Department site (cgd.go.th) refused our request with 403, so OCPA is described from the department's 2018 statement as reported in Thai Post. The Social Security Office's site returned only a landing page. Whether HITAP's 2013 threshold of 160,000 baht per quality-adjusted life year has been revised was not verified, and HITAP's paper on the effect of raising it returned 404.",
      links: [
        { label: "NCI Thailand: cancer statistics page", url: NCI_STATS },
        { label: "HITAP", url: "https://www.hitap.net/en/" },
      ],
    },
    {
      id: "approval-times",
      title: "No published approval or funding times for cancer medicines in Thailand",
      plain:
        "The Thai FDA publishes target review times but OnCo found no published figure for how long cancer medicines actually take to be registered, or how long after registration they reach the R2 list or the civil servants' OCPA list.",
      detail:
        "The 220-day and 154-day figures on this page are the Thai FDA's targets in working days, from its own symposium slides; its single published case is an Alzheimer's medicine at 179 working days. The National Drug Policy Division's site links to an NLEM dashboard, which was not read. Industry surveys of time to availability in Asia were not used as a source. The live National Drug Policy Division site returned 502 when this page was written, so its pages were read from Internet Archive copies of 8 September 2025 and 10 July 2026. On 17 November 2026 the live page of notices answered and named the same list in force, dated 12 February 2026; the live page of sub-list definitions still returned 502.",
      links: [
        { label: "Thai FDA: Collaboration on Streamlining Review for Pharmaceuticals (PDF)", url: FDA_TIMELINES },
        { label: "National Drug Policy Division: NLEM notices (Internet Archive, 10 July 2026, Thai)", url: NLEM_NOTICES },
      ],
    },
  ],
  institutions: ["nci-thailand", "nhso-thailand", "thai-fda", "hitap", "siriraj-hospital", "ramathibodi-hospital", "chulabhorn-hospital"],
  companies: ["x-zell"],
  drugs: ["imatinib", "letrozole", "trastuzumab", "nilotinib", "dasatinib"],
  trials: [
    "keynote-966", "topaz-1", "fight-202", "nct07710885", "nct07221253", "nct06109779", "nct06467357", "himalaya", "reflect", "imbrave050", "emerald-1",
    "emerald-3", "leap-002", "leap-012", "nct03847428", "nct05904886", "nct06921785", "nct03755791", "keynote-a18", "patricia", "nct06079671", "nct07216703",
    "destiny-pantumor02", "alesia", "nct05394831", "nct07234162", "nct07002203", "nct04606771",
  ],
  papers: ["paper-sruamsiri-thai-targeted-therapy-access-plos-one-2015", "paper-vargas-who-eml-cancer-chile-kenya-thailand-2026"],
  people: ["yongyut-sirivatanauksorn", "atiporn-ingsathit", "princess-chulabhorn"],
  how:
    "Every card was written from Thai sources read in Thai from their raw text: the National Cancer Institute's Cancer in Thailand Vol. XI (2019 to 2021) and Hospital-Based Cancer Registry 2025, the National Drug Policy Division's pages on the essential medicines list (Internet Archive copies), the Thai FDA's own slides on registration timelines, HITAP's 2015 policy brief, and Thai news reports quoting the National Health Security Office, the Minister of Public Health and the Comptroller General's Department by name, used because the NHSO's site could not be reached. Papers were resolved through Europe PMC and their abstracts read. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph. The new records for this page are the National Cancer Institute, the NHSO, the Thai FDA, HITAP and two papers; the hospitals, company and people were already in OnCo.",
  verify:
    "Incidence figures are modelled national estimates for 2019 to 2021 from 16 provincial registries, not counts, and the latest volume is the source to check. Review times are the Thai FDA's targets, not measured times. Screening ages and intervals are the NHSO's current benefits and can change each fiscal year. Before relying on whether a particular cancer medicine is paid for, check the current National List of Essential Medicines and ask the hospital which scheme and list applies.",
  verifyLinks: [
    { label: "NCI Thailand: cancer statistics and Cancer in Thailand volumes", url: NCI_STATS },
    { label: "National Drug Policy Division: National List of Essential Medicines (Thai)", url: "https://ndp.fda.moph.go.th/nlem" },
    { label: "National Health Security Office (hotline 1330)", url: "https://www.nhso.go.th" },
    { label: "Food and Drug Administration, Thailand", url: "https://www.fda.moph.go.th" },
  ],
};
