import type { CountryDive } from "@/data/country-dive";

/**
 * Yemen deep dive: the hand-written cards for /countries/ye/ (wave 7). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Yemen (PDF text), WHO's
 * cancer country profile for Yemen (2020, PDF text), WHO's HeRAMS report for 2020 (PDF text) and WHO's release of
 * 6 November 2016 on the first HeRAMS survey, four WHO news pages on cancer care in Yemen (February 2018 through
 * ReliefWeb, November 2018, February 2019 and September 2020), the IAEA's technical cooperation page for Yemen (PDF
 * text), UICC's member pages and its article of 28 June 2021, WHO's Global Health Observatory API for out-of-pocket
 * spending and the UHC service coverage index, WHO's immunisation data API for vaccine introductions and hepatitis B
 * coverage, WHO's August 2026 list of regulators at maturity level 3 and 4 (PDF text), Saba news agency items of
 * January 2024 and October 2025, Yemen Monitor items of December 2024 and July 2026, Cairo 24's report of January
 * 2023, and the papers' abstracts (and, for the two registry papers, open full text) through Europe PMC.
 *
 * This is a conflict setting. The page describes what each source states, with its date, and does not attribute
 * blame or speculate about politics. Most international sources on cancer care in Yemen are from 2018 to 2021; where
 * nothing newer could be read, that is said in the card or under `gaps`.
 */
const GCO_FACT = "https://gco.iarc.who.int/media/globocan/factsheets/populations/887-yemen-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/yem-2020.pdf";
const HERAMS_2020 = "https://applications.emro.who.int/docs/WHOEMYEM031E-eng.pdf";
const HERAMS_2016 = "https://www.emro.who.int/media/news/survey-reveals-extent-of-damage-to-yemens-health-system.html";
const WHO_2018_FEB = "https://reliefweb.int/report/yemen/cancer-patients-yemen-face-slow-death-treatment-options-diminish";
const WHO_2018_NOV = "https://www.emro.who.int/yemen/news/leukaemia-patients-in-yemen-suffer-in-silence-amid-war.html";
const WHO_2019 = "https://www.emro.who.int/yemen/news/cancer-patients-face-death-sentence-in-yemen.html";
const WHO_2020 = "https://www.emro.who.int/yemen/news/cancer-patients-in-yemen-face-the-compounded-pain-of-disease-and-conflict.html";
const IAEA_TC = "https://iaea.org/sites/default/files/20/10/tc-yemen.pdf";
const UICC_2021 = "https://www.uicc.org/news/conflict-yemen-reverses-years-progress-and-gains-cancer-care";
const UICC_NCCF = "https://www.uicc.org/membership/national-cancer-control-foundation";
const UICC_SCCF = "https://www.uicc.org/membership/shabwah-cancer-control-foundation";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'YEM'";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'YEM'";
const WIISE_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'YEM'";
const WIISE_HEPB3 = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'YEM'%20and%20ANTIGEN%20eq%20'HEPB3'";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const SABA_2024 = "https://sabanew.net/story/en/105656";
const SABA_2025 = "https://sabanew.net/story/en/136949";
const YM_STRATEGY = "https://www.yemenmonitor.com/?p=130102";
const YM_SMUGGLED = "https://www.yemenmonitor.com/?p=175570";
const CAIRO24_MOU = "https://www.cairo24.com/1734033";
const ACR_2018 = "https://doi.org/10.1186/s12885-018-4411-9";
const ACR_2010 = "https://pubmed.ncbi.nlm.nih.gov/20843142/";
const HCR_2016 = "https://doi.org/10.15537/smj.2016.5.14954";
const NPC_2019 = "https://pubmed.ncbi.nlm.nih.gov/31242984/";
const KAP_2025 = "https://doi.org/10.1186/s13031-025-00709-6";
const NUTRITION_2023 = "https://doi.org/10.7759/cureus.45411";
const LEUK_2026 = "https://doi.org/10.1080/19932820.2026.2735579";
const PHARMACY_2014 = "https://doi.org/10.4066/amj.2014.1890";
const CTGOV = "https://clinicaltrials.gov/search?country=Yemen&cond=cancer";

export const YE_DIVE: CountryDive = {
  iso2: "YE",
  iso3: "YEM",
  name: "Yemen",
  flag: "🇾🇪",
  asOf: "2026-11-11",
  title: "Cancer in Yemen",
  description:
    "Cancer in Yemen from WHO, UN agencies, Yemeni registries and peer-reviewed papers: IARC's estimate of 24,836 new cancers and 14,495 deaths in 2024, built from neighbouring countries' data; the Aden and Hadhramout registries; the National Oncology Centre in Sana'a running on donated medicines; out-of-pocket payments at 69% of health spending; no HPV vaccine and no screening programme; a national strategy for 2025 to 2030; and why no trial in our records has a site in Yemen.",
  lede:
    "Yemen has no national cancer registry, so its national figures are IARC estimates built largely from neighbouring countries' data: 24,836 new cancers and 14,495 deaths in 2024, with breast cancer by far the commonest. Cancer care has been carried through years of conflict by a few centres, above all the National Oncology Centre in Sana'a, with medicines supplied by WHO, donors and Yemeni charities, and households paying most of the cost of health care themselves.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Yemen is 24,836 new cancers and 14,495 deaths, an age-standardised incidence of 111.6 per 100,000 (107.1 in men, 118.8 in women) and mortality of 71.4, including 443 non-melanoma skin cancers. IARC's fact sheet names no country-specific source for incidence: its method is rates based on incidence estimates or registry data from neighbouring countries. Mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. WHO's 2020 profile adds that incidence estimates for Yemen carry a high degree of uncertainty because they are not based on a population-based registry, and that there is no coverage of deaths by cause for 2007 to 2016. Yemen's own registries count far fewer cancers: the Aden Cancer Registry measured age-standardised rates of 38.2 per 100,000 in men and 36.1 in women over 1997 to 2011, about a third of IARC's national rate, and its author notes that counts depend on what can be diagnosed. Part of the gap may be cancers that are never diagnosed or recorded: the registry's author writes that its incidence depended on the diagnostic facilities available and that it receives no mortality data. National counts quoted by officials differ again: WHO wrote in 2019 of about 11,000 newly registered cases a year, and the Minister of Public Health and Population was reported in December 2024 as saying that about 30,000 are recorded each year. IARC's 2024 estimate also rests on a population of 40.6 million; WHO's 2020 profile used 29.2 million for 2019.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Yemen",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Yemen (PDF)", url: GCO_FACT },
      cards: [
        {
          id: "shape",
          title: "About 25,000 new cancers a year in IARC's estimate, a fifth of them breast cancer",
          plain:
            "IARC estimates 24,836 new cancers in Yemen in 2024: 14,369 in women and 10,467 in men. Breast cancer is more than a third of cancers in women. In men the commonest are lung cancer, leukaemia and bladder cancer. For every ten new cancers IARC estimates about six deaths in the same year, and these figures are modelled, not counted.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 5,299 breast cancers (2,335 deaths), 21.3% of all cancers and 36.9% of cancers in women; 1,870 lung cancers (1,765 deaths); 1,823 leukaemias (1,158 deaths); 1,509 colorectal cancers; and 1,254 brain and nervous system cancers. In men the leading cancers by cases are lung (1,284), leukaemia (1,020), bladder (904), colorectum (793) and brain (678); in women breast, thyroid (848), leukaemia (803), colorectum (716) and lung (586). The risk of developing a cancer before age 75 is 11.5% for men and 12.4% for women, and an estimated 38,852 people are living within five years of a diagnosis. WHO's 2020 profile put cancer at 13.4% of premature deaths from noncommunicable diseases in 2016, and estimated that 16.3% of cancer deaths are attributable to tobacco (2017) and 13.4% of cancers to infections (2012). It also estimated 1,739 cancers a year in children aged 0 to 14. WHO wrote in February 2019 that more than 1,000 children were among about 11,000 newly registered cancer cases a year.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Yemen (PDF)", url: GCO_FACT },
            { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
            { label: "WHO EMRO: cancer patients face 'death sentence' in Yemen (4 February 2019)", url: WHO_2019 },
          ],
        },
        {
          id: "late-and-far",
          title: "Patients travel far, and many cannot complete treatment",
          plain:
            "WHO has reported repeatedly that people with cancer in Yemen travel long distances for treatment, sometimes hundreds of kilometres, and borrow or sell what they own to pay for medicines and transport. In February 2018 WHO's representative said that only around 40% of the more than 10,000 patients registered in 2017 received complete treatment.",
          detail:
            "In February 2018 WHO's representative in Yemen said that more than 10,000 cancer patients were registered in 2017 and around 40% of them received appropriate complete treatment, and that treatment for noncommunicable diseases including cancer was available in only about 20% of health facilities. In February 2019 WHO described families paying almost 50,000 Yemeni rials (under 100 US dollars) for each trip to treatment and at least 120,000 rials (250 US dollars) from Haradh to Sana'a. In September 2020 WHO quoted a 60-year-old patient travelling 350 km for treatment, said that treatment was available at only a fifth of Yemen's health facilities and that in 2016 many cancer clinics had closed for lack of staff, medicines and equipment. A 2022 survey of 296 inpatients at the National Oncology Centre found that 49% had lost at least 5% of their body weight. OnCo found no Yemeni data on the stage at which cancers are diagnosed; see the gaps.",
          links: [
            { label: "WHO (via ReliefWeb): cancer patients in Yemen face slow death as treatment options diminish (4 February 2018)", url: WHO_2018_FEB },
            { label: "WHO EMRO: cancer patients face 'death sentence' in Yemen (4 February 2019)", url: WHO_2019 },
            { label: "WHO EMRO: cancer patients in Yemen face the compounded pain of disease and conflict (20 September 2020)", url: WHO_2020 },
            { label: "Al-Shahethi et al., malnutrition among cancer inpatients in Sana'a (Cureus 2023)", url: NUTRITION_2023 },
          ],
        },
      ],
      tables: [
        {
          id: "ye-registries",
          title: "What Yemen's cancer registries have published",
          caption: "New cancers and age-standardised incidence per 100,000, as each paper reports them. Latest published period: 2002 to 2014.",
          columns: [
            { key: "source", label: "Registry (area covered)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "All cancers, men", numeric: true },
            { key: "women", label: "All cancers, women", numeric: true },
            { key: "breast", label: "Breast, % of cancers in women", numeric: true },
          ],
          rows: [
            { source: "Aden Cancer Registry (Aden, Lahej, Abyan, Al Dhale; about 2.6 million people)", period: "1997 to 2011", cases: 6974, men: 38.2, women: 36.1, breast: 30.0 },
            { source: "Aden Cancer Registry, second report", period: "2002 to 2006", cases: null, men: 30.2, women: 31.1, breast: null },
            { source: "Hadhramout Cancer Registry, hospital-based (Hadhramout, Shabwa, Al Mahra; about 1.8 million people)", period: "2002 to 2014", cases: 4796, men: null, women: null, breast: null },
          ],
          note: "Yemen has no national cancer registry and WHO's 2020 profile records no information on one. The Aden registry is population-based and covers four of 22 governorates; the Hadhramout registry is kept by a cancer centre and counts the patients who reach it, so it gives no rates. Registries publish new cases, not deaths. OnCo found no data from either registry after 2014. The 2002 to 2006 rates are given in the paper's abstract in the order men, women.",
          sources: [
            { label: "Bawazir, cancer incidence in Yemen from 1997 to 2011: a report from the Aden cancer registry (BMC Cancer 2018)", url: ACR_2018 },
            { label: "Ba Saleem et al., five years cancer incidence in Aden Cancer Registry 2002 to 2006 (Asian Pac J Cancer Prev 2010, PubMed)", url: ACR_2010 },
            { label: "Jawass et al., childhood malignancies in the Hadhramout Cancer Registry 2002 to 2014 (Saudi Med J 2016)", url: HCR_2016 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: two regional registries, both kept by universities and centres",
      aside: { label: "Bawazir, Aden cancer registry 1997 to 2011 (BMC Cancer 2018)", url: ACR_2018 },
      cards: [
        {
          id: "registry-aden",
          title: "The Aden Cancer Registry: population-based since 1997, for four southern governorates",
          plain:
            "Yemen's first population-based cancer registry was set up in Aden in 1997 by Aden University's cancer centre, with staff trained by IARC. It covers Aden, Lahej, Abyan and Al Dhale, about 2.6 million people, and counted 6,974 cancers over 15 years. Its last published data are for 2011.",
          detail:
            "The registry's 15-year report describes it as supervised by the Aden Cancer Centre at the Faculty of Medicine and Health Sciences, Aden University, established in 1997 and included in the International Association of Cancer Registries in 1998. Cases came from outpatient and ward records of seven main hospitals, haematology and histopathology laboratories, imaging, the registries of local cancer societies and the Ministry of Public Health's committee for treatment abroad, coded with ICD-O and analysed in CanReg4. Yearly new cases rose from 263 in 1997 to 1,004 in 2009. Over 1997 to 2011 breast cancer was 30.0% of cancers in women, and leukaemia (10.5%) and non-Hodgkin lymphoma (10.1%) led in men; the 2002 to 2006 report found breast cancer, leukaemia and non-Hodgkin lymphoma the commonest overall. The author notes that the registry does not record stage or deaths, that counts depend on the diagnostic facilities available, and called on the government to support Yemen's registries.",
          links: [
            { label: "Bawazir, cancer incidence in Yemen from 1997 to 2011 (BMC Cancer 2018)", url: ACR_2018 },
            { label: "Ba Saleem et al., Aden Cancer Registry 2002 to 2006 (Asian Pac J Cancer Prev 2010, PubMed)", url: ACR_2010 },
          ],
        },
        {
          id: "registry-hadhramout",
          title: "The Hadhramout Cancer Registry: 4,796 cancers at one centre over 13 years",
          plain:
            "In the east, the cancer centre in Mukalla, opened by the Ministry of Health in 2002 for Hadhramout, Shabwa and Al Mahra, keeps a hospital registry. It recorded 4,796 cancers between 2002 and 2014, 406 of them in children. Because it counts patients who reach the centre rather than everyone in an area, it gives no population rates.",
          detail:
            "Paediatricians at Hadhramout University described the Hadhramout Cancer Center as established by the Ministry of Health in 2002 to serve about 1,820,163 people in three governorates, and the Hadhramout Cancer Registry as built partly by entering earlier paper charts retrospectively into an electronic registry. Of 4,796 malignancies registered from January 2002 to December 2014, 406 (8.5%) were in children under 15; haematological cancers were 47% of childhood cases, and the authors calculated a childhood incidence of 1.9 per 100,000. A 2019 paper from the centre reported 109 patients with nasopharyngeal carcinoma treated without surgery and followed for 72 months. WHO's 2020 profile records no information on a population-based registry for Yemen as a whole, and OnCo found no national registry plan; whether the National Cancer Control Strategy 2025 to 2030 includes one could not be read.",
          links: [
            { label: "Jawass et al., childhood malignancies in the Hadhramout Cancer Registry (Saudi Med J 2016)", url: HCR_2016 },
            { label: "Bahannan et al., nasopharyngeal carcinoma at Hadhramout National Cancer Centre (Gulf J Oncolog 2019, PubMed)", url: NPC_2019 },
            { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: households, donors and charities",
      aside: { label: "WHO Global Health Observatory: out-of-pocket spending, Yemen (API)", url: GHO_OOP },
      cards: [
        {
          id: "out-of-pocket",
          title: "Households pay about 69% of all health spending themselves",
          plain:
            "OnCo found no national health insurance scheme in the sources read. WHO's figures put out-of-pocket payments at 69% of current health spending in 2023, down from a peak of 88% in 2017. For cancer that means families buy many medicines and pay for transport and lodging themselves, unless a centre or charity has donated supplies.",
          detail:
            "WHO's Global Health Expenditure Database, read through the Global Health Observatory API, gives out-of-pocket spending as 69.13% of current health expenditure in 2023, after 87.90% in 2017, 78.78% in 2020 and 68.82% in 2021; in 2000 it was 43.49%. WHO's universal health coverage service coverage index for Yemen was 43 out of 100 in 2023 (45 in 2022). WHO reported in February 2018 that before the crisis the government gave the National Oncology Centre in Sana'a about 12 million US dollars a year, but that it had received no funding for around two years, leaving it dependent on external support; in November 2018 WHO described the Leukaemia Centre in Sana'a, the only specialised leukaemia centre for children, as having no government support and covering 20% or less of its needs, with medicine prices tripling as the exchange rate fell. The centre's director told WHO that some medicines cost 100 US dollars or more. OnCo found no published list of which cancer services are free at public facilities.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket spending as % of current health expenditure, Yemen (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: UHC service coverage index, Yemen (API)", url: GHO_UHC },
            { label: "WHO (via ReliefWeb): cancer patients in Yemen face slow death as treatment options diminish (4 February 2018)", url: WHO_2018_FEB },
            { label: "WHO EMRO: leukaemia patients in Yemen suffer in silence amid war (20 November 2018)", url: WHO_2018_NOV },
          ],
        },
        {
          id: "donated-medicines",
          title: "Cancer medicines supplied by WHO and donors",
          plain:
            "Since 2018 WHO has supplied the National Oncology Centre in Sana'a and its branches with chemotherapy, anti-cancer medicines and pain relief, paid for by donors including the World Bank, Germany, Saudi Arabia's KSrelief and Kuwait. WHO has said each time that this covers acute shortages, not all needs. In 2020 WHO said all cancer centres were open.",
          detail:
            "WHO wrote in February 2018 that, with support from the World Bank and Germany, it was providing the centre with 2.5 million US dollars' worth of anti-cancer and chemotherapy medicines, sufficient for almost 30,000 patients, and that day delivered enough for 5,000 patients for one month. In November 2018 it described supporting the centre and its branches in all governorates with medicines sufficient for acute shortages for more than 30,000 patients for a year, adding that this is not enough. In February 2019 it listed the funders of its supplies as the World Bank, USAID/OFDA, KSrelief, UAE Aid, ECHO, Canada, Korea, Japan, Germany and Kuwait, and reported delivering two mammography machines, to Al Jumhoori hospital in Sana'a and Al Sadakah hospital in Aden. In September 2020 it said that with partners including KSrelief and Kuwait it had supplied anti-cancer medicines, and morphine and fentanyl for patients with advanced disease, and that thanks to donors all cancer centres were open. WHO's 2020 profile recorded opioid consumption for pain at 0 defined daily doses per million people per day for 2015 to 2017. OnCo found no WHO statement on cancer medicine supply after 2020.",
          links: [
            { label: "WHO (via ReliefWeb): cancer patients in Yemen face slow death as treatment options diminish (4 February 2018)", url: WHO_2018_FEB },
            { label: "WHO EMRO: leukaemia patients in Yemen suffer in silence amid war (20 November 2018)", url: WHO_2018_NOV },
            { label: "WHO EMRO: cancer patients face 'death sentence' in Yemen (4 February 2019)", url: WHO_2019 },
            { label: "WHO EMRO: cancer patients in Yemen face the compounded pain of disease and conflict (20 September 2020)", url: WHO_2020 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Supreme Board of Drugs and Medical Appliances",
      aside: { label: "WHO: regulators at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
      cards: [
        {
          id: "sbdma",
          title: "A board chaired by the health minister, not yet assessed by WHO",
          plain:
            "Medicines in Yemen are registered and controlled by the Supreme Board of Drugs and Medical Appliances, whose board the Minister of Public Health and Population chairs. Yemen is not on WHO's list of regulators assessed at maturity level 3 or 4, and OnCo found no published rules or timelines for registering a new cancer medicine there.",
          detail:
            "Cairo 24 reported on 22 January 2023 that the board's executive director, Dr Abdulqader Al-Bakri, signed a memorandum with Egypt's Drug Authority on professional development and capacity building, in the presence of the Minister, who chairs the board and led the Yemeni delegation, and that the delegation toured the Authority's laboratories. In July 2026 the Minister ordered provincial health offices to carry out regular and unannounced inspections of pharmacies, drug warehouses and hospitals against smuggled, unregistered or expired medicines, in coordination with the board and the security and judicial authorities, and required facilities to display prices. WHO's list of national regulatory authorities at maturity level 3 or 4, dated August 2026, does not include Yemen. OnCo found no WHO benchmarking result, reliance pathway or clinical trial authorisation guideline published by the board; these are named under gaps.",
          links: [
            { label: "Cairo 24: memorandum between Egypt's Drug Authority and Yemen's medicines board (22 January 2023, Arabic)", url: CAIRO24_MOU },
            { label: "Yemen Monitor: Health Minister orders tighter controls on smuggled medicines (6 July 2026)", url: YM_SMUGGLED },
            { label: "WHO: list of national regulatory authorities at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
          ],
        },
        {
          id: "medicine-quality",
          title: "Counterfeit and black-market medicines are a recognised problem",
          plain:
            "A Yemeni cancer charity's former head has described cancer medicines being sold on the black market at high prices, often as copies of unknown origin, and a 2014 study found counterfeit medicines a serious problem in Yemen. A medicine from an unknown source may not contain what its label says. Ask the treating centre where a medicine came from before paying for it outside the centre.",
          detail:
            "A 2014 study of pharmacy practice in Yemen, combining a literature review with interviews of pharmacists, Ministry staff and patients, found medicines expensive and hard to access, counterfeit medicines a serious problem, and few regulations and standards for pharmacy practice. In June 2021 the former general manager of the National Cancer Control Foundation, Dr Labeeb Alaghbari, told UICC that much of the medication available before the war, such as radioactive iodine, was no longer available because of cross-border issues, and that some medicines were available on the black market but at a huge cost and often as inferior copies of unknown source. The Minister's directive of July 2026 targets smuggled, unregistered and expired medicines. A mother quoted by WHO in November 2018 said her family bought cheaper brands because the better ones were very expensive.",
          links: [
            { label: "Al-Worafi, pharmacy practice and its challenges in Yemen (Australas Med J 2014)", url: PHARMACY_2014 },
            { label: "UICC: conflict in Yemen reverses years of progress and gains in cancer care (28 June 2021)", url: UICC_2021 },
            { label: "WHO EMRO: leukaemia patients in Yemen suffer in silence amid war (20 November 2018)", url: WHO_2018_NOV },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO immunisation data: vaccine introductions, Yemen (API)", url: WIISE_INTRO },
      cards: [
        {
          id: "no-programme",
          title: "No organised screening programme, and only 8.5% of people surveyed had been screened",
          plain:
            "WHO's 2020 profile records no breast or cervical screening programme in Yemen and no early detection guidelines for any cancer. In a 2025 survey of 996 people, about half had heard of cancer screening but only 8.5% had ever been screened, and cost was among the main reasons. The Cancer Control Foundation runs a free breast early detection centre in Sana'a.",
          detail:
            "WHO's 2020 profile marks breast cancer screening programme, cervical cancer screening and early detection guidelines all as no for 2019, and counts 17.4 mammography machines per 10,000 cancer patients in 2020. WHO delivered two mammography machines in 2019, to Al Jumhoori hospital in Sana'a and Al Sadakah hospital in Aden, and in 2020 said it had run workshops on early diagnosis of breast cancer. UICC's member page says the National Cancer Control Foundation's breast cancer early detection centre in Sana'a receives more than 350 women a month. Al-Jamei and colleagues surveyed 996 people: 52.1% had heard of cancer screening, 21.4% rated their knowledge good, breast screening was the best known, and 8.5% had been screened; financial constraints, lack of awareness and the belief that screening is unnecessary were the main barriers.",
          links: [
            { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
            { label: "Al-Jamei et al., cancer screening knowledge and practice in Yemen (Confl Health 2025)", url: KAP_2025 },
            { label: "UICC: National Cancer Control Foundation (member page)", url: UICC_NCCF },
            { label: "WHO EMRO: cancer patients face 'death sentence' in Yemen (4 February 2019)", url: WHO_2019 },
          ],
        },
        {
          id: "vaccines",
          title: "Hepatitis B vaccine since 1999, falling coverage, and no HPV vaccine yet",
          plain:
            "Two vaccines prevent cancers caused by infection: hepatitis B, against liver cancer, and HPV, against cervical cancer. Yemen has given hepatitis B vaccine nationwide since 1999, but WHO and UNICEF estimate that only 39% of infants received all three doses in 2025. WHO's records show that Yemen had not introduced the HPV vaccine by 2025.",
          detail:
            "WHO's immunisation data record hepatitis B vaccine introduced partially in 1998 and nationwide from 1999, and the HPV vaccine as not introduced in every year reported up to 2025; WHO's 2020 profile lists HPV vaccination coverage as not applicable. WHO and UNICEF's estimates of coverage with three doses of hepatitis B vaccine fell from 58% in 2022 to 46% in 2023, 42% in 2024 and 39% in 2025. In December 2024 the Minister of Public Health and Population was reported as saying the Ministry was working to introduce essential vaccines to reduce disease, without naming them. WHO's 2020 profile estimated that 13.4% of cancers in Yemen are attributable to infections.",
          links: [
            { label: "WHO immunisation data: vaccine introductions, Yemen (API)", url: WIISE_INTRO },
            { label: "WHO and UNICEF estimates: hepatitis B third dose coverage, Yemen (API)", url: WIISE_HEPB3 },
            { label: "Yemen Monitor: Yemen records 30,000 new cancer cases annually; national strategy launched (31 December 2024)", url: YM_STRATEGY },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy, staff and facilities",
      aside: { label: "WHO: HeRAMS report 2020, Yemen (PDF)", url: HERAMS_2020 },
      cards: [
        {
          id: "radiotherapy",
          title: "Radiotherapy is concentrated in Sana'a; Aden's centre is still being equipped",
          plain:
            "WHO's 2020 profile counts less than one radiotherapy machine for every 10,000 cancer patients in Yemen and no PET scanner. The IAEA has trained staff at the National Oncology Centre in Sana'a. Yemen's Saba news agency reported official work since 2024 to equip the oncology centre in Aden for radiotherapy, and a new cancer hospital with a radiation unit under construction there.",
          detail:
            "WHO's 2020 profile records 0.8 external beam radiotherapy machines per 10,000 cancer patients (2019), and per 10,000 cancer patients 66.8 CT scanners, 23.5 MRI scanners and no PET or PET-CT scanners (2020); bone marrow transplantation is generally not available and pathology generally available. The IAEA's country page lists Yemen as a member since October 1994, its first Country Programme Framework signed in 2024 for 2024 to 2029, an imPACT Review in 2007, and group fellowships in 2023 for 21 Yemeni professionals in nuclear medicine, diagnostics and radiotherapy; it says staff at the National Oncology Centre were trained to move from two-dimensional to three-dimensional radiotherapy. Saba reported in January 2024 a meeting chaired by the Deputy Minister on providing the oncology centre in Aden with what it needs for radiation and nuclear therapy, and in October 2025 the Minister's inspection of the Hope Cancer Hospital under construction in Aden, planned with 200 beds and radiation and nuclear medicine units. UICC was told in 2021 that \"there is no space for radiotherapy\". OnCo could not read a current count of working machines; see the gaps.",
          links: [
            { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
            { label: "IAEA: technical cooperation with Yemen (PDF)", url: IAEA_TC },
            { label: "Saba: meeting on the conditions of oncology centres (21 January 2024; refused a request when this page was checked on 11 November 2026, no archived copy)", url: SABA_2024 },
            { label: "Saba: Health Minister inspects Hope Cancer Hospital project in Aden (28 October 2025; refused a request when this page was checked on 11 November 2026, no archived copy)", url: SABA_2025 },
          ],
        },
        {
          id: "facilities",
          title: "Half of health facilities not fully working, and 12 health workers per 10,000 people",
          plain:
            "WHO and the Ministry of Public Health and Population survey Yemen's health facilities through a system called HeRAMS. In 2020 it found 49% of facilities not working or only partly working, a third of districts with no functioning hospital, and fewer than half the health workers WHO considers a minimum. Cancer care depends on the few hospitals that are working.",
          detail:
            "The HeRAMS report for 2020, covering all 22 governorates and published by WHO's regional office in 2022, found 49% of health facilities non-functioning or partially functioning, 11% fully or partially damaged, no functioning hospital in 117 of 333 districts, 12 health workers per 10,000 people (below 50% of WHO's threshold), no specialist in 97 of 261 functioning hospitals, and fewer than 6 inpatient beds per 10,000 people. The first survey, reported by WHO on 6 November 2016 for 16 of 22 governorates, found 45% of 3,507 facilities fully functional, and services for noncommunicable diseases fully available in only 21%. WHO's 2020 profile counts 4.6 medical physicists and 4.6 nuclear medicine physicians per 10,000 cancer patients, and gives no figure for radiation oncologists. WHO in 2018 and the Cancer Control Foundation in 2021 described senior oncologists and other skilled health workers leaving the country, and health workers going unpaid.",
          links: [
            { label: "WHO: HeRAMS report 2020, Yemen (published 2022, PDF)", url: HERAMS_2020 },
            { label: "WHO EMRO: survey reveals extent of damage to Yemen's health system (6 November 2016)", url: HERAMS_2016 },
            { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Yemen does",
      title: "What Yemen does differently",
      cards: [
        {
          id: "charities",
          title: "Cancer charities that run centres, not only support them",
          plain:
            "Much of Yemen's cancer care is run or paid for by Yemeni charities. The National Cancer Control Foundation, working since 2003 with branches in Taiz, Aden, Ibb and Al Hodeidah, offers early detection, chemotherapy, food and transport, and supervises a new cancer hospital in Aden. In Shabwah a foundation set up in 2021 describes itself as the main supporter of the province's oncology centre.",
          detail:
            "UICC's member page says the National Cancer Control Foundation's services reach more than ten thousand patients a year, with mobile units bringing diagnostic equipment to remote areas. UICC's article of June 2021 says it opened the first surgical centre specifically for oncology in 2014, that its network was disrupted from 2015, and that it continues to provide free screening, chemotherapy, and food and transport for patients travelling to Sana'a, looking to countries such as Kuwait for funds and medicines. Saba reported in October 2025 that the foundation supervises the Hope Cancer Hospital being built in Aden with funding from the Hayel Saeed Anam Group. The Shabwah Cancer Control Foundation, a UICC member established in August 2021, describes itself as the main supporting body for the National Oncology Center in Shabwah, providing chemotherapy drugs, visiting oncologists, financial and travel aid and accommodation.",
          links: [
            { label: "UICC: National Cancer Control Foundation (member page)", url: UICC_NCCF },
            { label: "UICC: conflict in Yemen reverses years of progress and gains in cancer care (28 June 2021)", url: UICC_2021 },
            { label: "UICC: Shabwah Cancer Control Foundation (member page; refused a request when this page was checked on 11 November 2026, no archived copy)", url: UICC_SCCF },
            { label: "Saba: Health Minister inspects Hope Cancer Hospital project in Aden (28 October 2025; refused a request when this page was checked on 11 November 2026, no archived copy)", url: SABA_2025 },
          ],
        },
        {
          id: "strategy",
          title: "A national cancer strategy for 2025 to 2030",
          plain:
            "WHO's 2020 profile had no information on a national cancer control plan for Yemen. In December 2024 the Minister of Public Health and Population announced a National Cancer Control Strategy for 2025 to 2030, launched in Aden, and said the Ministry would build cancer treatment centres with the governorates. OnCo could not find the strategy document itself.",
          detail:
            "Yemen Monitor reported on 31 December 2024 that the Minister, Dr Qasem Buhaibah, told Al Jazeera Net that about 30,000 new cancer cases are recorded each year, that the spread of cancer had reached alarming levels, and that the strategy, launched in Aden, sets out the prevalence of cancer, its current status and priority actions for the coming years; he said the Ministry would start development projects against cancer in Aden and other governorates, work with the governorates to set up treatment centres, and introduce essential vaccines. WHO's 2020 profile recorded for 2019 no cancer management guidelines and no defined referral system for childhood cancer, and gave no information (n/a) on a national cancer control plan or an integrated plan for noncommunicable diseases. The strategy text is named under gaps.",
          links: [
            { label: "Yemen Monitor: Yemen records 30,000 new cancer cases annually; national strategy launched (31 December 2024)", url: YM_STRATEGY },
            { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
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
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Yemen",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Yemen. Research from Yemen is observational: registry reports, surveys and studies at single centres, many by doctors at the National Oncology Centre and Yemen's universities.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Yemen among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines; the search linked below shows any cancer studies registered with a site in Yemen. A Europe PMC search on 11 November 2026 for records with Yemen in the title and cancer, oncology, tumour, leukaemia or carcinoma returned about 60 records, the number varying with the spellings searched. They include the Aden and Hadhramout registry reports; a 2022 study of malnutrition in 296 inpatients at the National Oncology Centre; a 2024 study of 75 patients with acute leukaemia there, in which microscopy and flow cytometry agreed in 89.3% of cases; and a 2025 survey of 996 people on cancer screening. OnCo found no Yemeni rules for authorising a clinical trial; see the gaps.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Yemen (search)", url: CTGOV },
            { label: "Al-Aghbri et al., acute leukaemia diagnosis at the National Oncology Centre, Sana'a (Libyan J Med 2026)", url: LEUK_2026 },
            { label: "Al-Shahethi et al., malnutrition among cancer inpatients in Sana'a (Cureus 2023)", url: NUTRITION_2023 },
            { label: "Europe PMC: search", url: "https://europepmc.org/search?query=TITLE%3A%22Yemen%22%20AND%20TITLE%3Acancer" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "strategy-text",
      title: "The National Cancer Control Strategy 2025 to 2030 could not be read",
      plain:
        "The Ministry's strategy was announced in December 2024, but OnCo found no published text of it, on the ministry's pages, WHO's or the International Cancer Control Partnership's. Its targets, costs and plans for a registry, screening or radiotherapy are therefore not on this page.",
      detail:
        "The only account of the strategy read for this page is a Yemen Monitor news report of 31 December 2024 quoting the Minister's statement to Al Jazeera Net. The figure of about 30,000 new cases recorded each year comes from that statement; OnCo did not find the dataset behind it, and it differs from WHO's earlier figure of about 11,000 newly registered cases a year and from IARC's estimate of 24,836. OnCo could not confirm the address of a ministry website carrying the strategy.",
      links: [
        { label: "Yemen Monitor: Yemen records 30,000 new cancer cases annually; national strategy launched (31 December 2024)", url: YM_STRATEGY },
      ],
    },
    {
      id: "radiotherapy-now",
      title: "How many radiotherapy machines work now is not confirmed",
      plain:
        "OnCo could not read a current, dated count of working radiotherapy machines in Yemen. The IAEA's directory of radiotherapy centres does not show country data without its interactive tool, and the IAEA's project pages refused a plain request. Ask the referring doctor which centre is treating and how long the wait is.",
      detail:
        "WHO's 2020 profile gives 0.8 external beam machines per 10,000 cancer patients for 2019, a ratio rather than a count. The IAEA's DIRAC directory serves its country data through an interactive tool that a plain request does not return, and the IAEA's news and project pages on Yemen returned HTTP 403 on 11 November 2026, with no Internet Archive copy found. News reports from other outlets give counts for the Sana'a centre; they are not used. Whether the oncology centre in Aden or the Hope Cancer Hospital has begun radiotherapy could not be confirmed.",
      links: [
        { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
    {
      id: "regulation-rules",
      title: "No published registration rules, essential medicines list or trial guideline",
      plain:
        "OnCo found no website for the Supreme Board of Drugs and Medical Appliances with its registration rules, timelines or a list of registered cancer medicines, no national essential medicines list for Yemen that could be read, and no guideline for authorising clinical trials.",
      detail:
        "What is said here about the board comes from news reports of the Minister's statements and a 2023 Egyptian report of a memorandum, and from WHO's list of regulators at maturity level 3 and 4, which does not include Yemen. Commercial regulatory consultancies publish descriptions of Yemeni registration; they are not used. WHO's database of national essential medicines lists serves its pages through a script that a plain request does not return, so whether Yemen has a current national list, and which cancer medicines are on it, is not on this page.",
      links: [
        { label: "WHO: list of national regulatory authorities at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
        { label: "WHO: national essential medicines lists", url: "https://global.essentialmeds.org/" },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: survival after a cancer diagnosis in Yemen, the stage at which cancers are found, any registry data after 2014, and WHO statements on cancer care in Yemen after 2020.",
      detail:
        "No population-based survival figures for Yemen were found; IARC's mortality estimate is modelled from other countries' survival data. No national data on stage at diagnosis were found. The Aden registry's latest published data are for 2011 and the Hadhramout registry's for 2014. The WHO news pages read for this page date from 2018 to 2020; OnCo found no later WHO statement specifically on cancer medicines or oncology centres in Yemen, so the situation they describe may have changed. The WHO HeRAMS report read is for 2020; later rounds were not found as reports. IARC's detailed data sources and methods page for Yemen was not read; the method is taken from the fact sheet.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Yemen (PDF)", url: GCO_FACT },
        { label: "WHO: HeRAMS report 2020, Yemen (PDF)", url: HERAMS_2020 },
      ],
    },
  ],
  institutions: [
    "yemen-ministry-of-public-health", "national-oncology-centre-sanaa", "hadhramout-national-cancer-centre", "aden-cancer-registry",
    "yemen-sbdma", "national-cancer-control-foundation-yemen", "who", "iaea", "iarc", "uicc",
  ],
  companies: [],
  drugs: ["fentanyl", "radioactive-iodine"],
  trials: [],
  papers: [
    "paper-bawazir-aden-cancer-registry-1997-2011-bmc-cancer-2018", "paper-jawass-hadhramout-childhood-cancer-smj-2016",
    "paper-al-jamei-yemen-cancer-screening-kap-confl-health-2025", "paper-al-shahethi-malnutrition-noc-sanaa-cureus-2023",
    "paper-al-aghbri-acute-leukaemia-noc-sanaa-ljm-2026",
  ],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer country profile for Yemen; WHO's HeRAMS report for 2020 and its 2016 release on the first survey; WHO news pages on cancer care in Yemen from 2018 to 2020; WHO's Global Health Observatory and immunisation data APIs; WHO's August 2026 list of regulators at maturity level 3 and 4; the IAEA's technical cooperation page for Yemen; UICC's member pages and its 2021 article; Saba and Yemen Monitor reports of ministerial statements, and a Cairo 24 report in Arabic; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. In a conflict setting the page reports what each source states and when, and does not attribute blame. The new records added for this page (the Ministry, two cancer centres, the Aden registry, the medicines board, the Cancer Control Foundation and five papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates built from neighbouring countries' data, not a Yemeni count. Which centres are open, which medicines are in stock and what they cost change quickly in Yemen, and most international reports read here are several years old; ask the treating centre or the National Cancer Control Foundation what applies to you, and ask where any medicine bought outside a centre came from.",
  verifyLinks: [
    { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
    { label: "WHO EMRO: Yemen", url: "https://www.emro.who.int/countries/yem/index.html" },
    { label: "UICC: National Cancer Control Foundation (member page)", url: UICC_NCCF },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Yemen (PDF)", url: GCO_FACT },
  ],
};
