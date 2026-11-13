import type { CountryDive } from "@/data/country-dive";

/**
 * Iraq deep dive: the hand-written cards for /countries/iq/ (wave 5). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Iraqi Cancer Board's Cancer Registry of Iraq annual report
 * 2022 (Ministry of Health PDF, March 2024), IARC's GLOBOCAN 2024 fact sheet for Iraq, the Ministry of Justice's English
 * translation of Health Insurance Law No. 22 of 2020 (Internet Archive copy), the World Bank's health expenditure
 * series (from WHO's Global Health Expenditure Database), WHO's immunisation introduction data, the Eastern
 * Mediterranean Health Journal report on pharmaceutical regulation in Iraq (2021), the Kurdistan Regional Government's
 * medicine registration service page (Internet Archive copy), IAEA reports on the 2021 imPACT review and its 2023
 * follow-up (Internet Archive copies), UICC member profiles (Internet Archive copies), two peer-reviewed papers resolved
 * through Europe PMC, and news reports quoting officials (Rudaw, The National), named as such. Iraq is treated as a
 * fragile setting: the page states what sources say and does not speculate beyond them. Gaps are named under `gaps`.
 */
const ICR_2022 = "https://storage.moh.gov.iq/2024/03/31/2024_03_31_11983087032_3940351786864953.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/368-iraq-fact-sheet.pdf";
const HI_LAW = "https://web.archive.org/web/20251130124032/https://moj.gov.iq/upload/pdf/%D9%82%D8%A7%D9%86%D9%88%20%D9%86%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%20%D8%A7%D9%84%D8%B5%D8%AD%D9%8A%20(1)%20(2)%20-%20Copy_306.pdf";
const EMHJ_2021 = "https://doi.org/10.26719/emhj.21.025";
const EMHJ_2010 = "https://doi.org/10.26719/2010.16.11.1159";
const KURD_2022 = "https://doi.org/10.31557/APJCP.2022.23.2.601";
const KMCA_SERVICE = "https://web.archive.org/web/20260320160440/https://service.gov.krd/en/node/993";
const IAEA_2022 = "https://web.archive.org/web/20250520170251/https://www.iaea.org/newscenter/news/iaea-review-prompts-regional-cooperation-to-address-cancer-workforce-challenges-in-iraq";
const IAEA_2023 = "https://web.archive.org/web/20250424190521/https://www.iaea.org/newscenter/news/iraq-makes-progress-in-improving-cancer-services-implements-impact-review-recommendation";
const UICC_ZHIANAWA = "https://web.archive.org/web/20260516022648/https://www.uicc.org/membership/zhianawa-cancer-center";
const UICC_RIZGARY = "https://web.archive.org/web/20260714223623/https://www.uicc.org/membership/rizgary-oncology-center";
const RUDAW_2025_02 = "https://www.rudaw.net/english/kurdistan/150220257";
const RUDAW_2025_11 = "https://www.rudaw.net/english/middleeast/iraq/141120254";
const NATIONAL_2023 = "https://www.thenationalnews.com/health/2023/08/04/cancers-devastating-toll-in-iraq-families-face-emotional-and-financial-strain";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=IQ";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=IQ";
const WHO_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ANTIGEN%20eq%20'HPV'%20and%20ISO_3_CODE%20eq%20'IRQ'";
const CTGOV = "https://clinicaltrials.gov/search?country=Iraq&cond=Cancer";

export const IQ_DIVE: CountryDive = {
  iso2: "IQ",
  iso3: "IRQ",
  name: "Iraq",
  flag: "🇮🇶",
  asOf: "2026-11-11",
  title: "Cancer in Iraq",
  description:
    "Cancer in Iraq from Iraqi sources: the Iraqi Cancer Board's national registry counted 39,068 new cancers in 2022 and its registration division 43,062 in 2023, against IARC's estimate of 34,279 for 2024; a health insurance law of 2020 that exempts people with cancer from every fee and co-payment; out-of-pocket payments at 54% of health spending; a Ministry of Health regulator with a fast-track route for medicines approved by the FDA or EMA; a separate medicines agency in the Kurdistan Region; and the IAEA, WHO and IARC review of cancer services.",
  lede:
    "Iraq has counted cancer through a national population-based registry, run by the Ministry of Health's Iraqi Cancer Board, since 1976: it recorded 39,068 new cancers among Iraqis in 2022, more of them in women than men, with breast cancer a fifth of the total. Chemotherapy and radiotherapy are free in government hospitals, but more than half of all health spending is paid out of pocket, and a review by the IAEA, WHO and IARC found broken equipment, missing treatment guidelines and too few trained staff.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Iraq is 34,279 new cancers and 19,963 deaths, an age-standardised incidence of 111.5 per 100,000 (107.2 in men, 118.9 in women) and mortality of 68.8. IARC's fact sheet names the incidence source as Iraq's national registry, with national rates applied to the 2024 population, and mortality as national incidence estimates applied to modelled mortality-to-incidence ratios from registry survival data. Iraq's own registry reports a different picture. Its annual report for 2022 counts 39,068 new cancers among Iraqi nationals, about 4,800 more than IARC estimates for two years later, and an age-standardised rate of 158.9 per 100,000 (144.3 in men, 173.5 in women); for breast cancer it gives 8,184 cases in women and an age-standardised rate of 62.1, against IARC's 7,461 and 42.7. In the other direction, the registry records 11,421 cancer deaths in 2022, about 8,500 fewer than IARC's modelled 19,963. Neither source explains the gap: IARC's fact sheet does not say which registry years it used, and the registry report gives no completeness estimate; its English text does not name the standard population behind its age-standardised rates, though its Arabic summary says they use the age structure adopted by WHO. The Cancer Board's registration division put the 2023 count at 43,062. Read IARC's figures as a model and the registry's as cases and deaths reported to it.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Iraq",
      aside: { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: ICR_2022 },
      cards: [
        {
          id: "shape",
          title: "Breast cancer is one cancer in five, and more cancers are found in women than in men",
          plain:
            "Iraq's national registry counted 39,068 new cancers among Iraqis in 2022: 22,781 in women and 16,287 in men. Breast cancer was 21% of all cancers and more than a third of cancers in women. In men lung, colorectal, prostate and bladder cancer led, and lung cancer caused the most cancer deaths overall.",
          detail:
            "The Iraqi Cancer Board's annual report for 2022 gives the leading cancers in both sexes as breast (21.2%), colorectal (7.3%), lung (7.3%), thyroid (6.1%), brain and central nervous system (5.4%), leukaemia (4.7%) and bladder (4.5%). In men the top five were lung (12.2%), colorectal (9.2%), prostate (8.5%), bladder (8.4%) and brain and nervous system tumours (6.6%); in women breast (35.9%), thyroid (8.4%), colorectal (6%), brain and nervous system (4.6%) and ovary (4%). Breast cancer in women had a median age at diagnosis of 52 and an age-standardised rate of 62.1 per 100,000, highest in Erbil (80.3) and Najaf (77.8). Children aged 0 to 14 had 1,818 cancers, 4.7% of the total, leukaemia the commonest. Of 11,421 registered cancer deaths, lung cancer caused 16.6%; in women breast cancer caused 23.6%. Najaf had the highest crude incidence (123.7 per 100,000) and Nineveh the lowest (63.6). IARC's 2024 estimate ranks the same cancers in a similar order: breast, lung, leukaemia, colorectum and bladder.",
          links: [
            { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: ICR_2022 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Iraq (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "registry",
          title: "A national registry since 1976, run by the Iraqi Cancer Board, and Kurdistan's own registry data",
          plain:
            "The Ministry of Health has registered cancer nationally since 1976 and published the first report in 1987. The Iraqi Cancer Board, set up by law in 1985, runs the registry through units in every health directorate. The three Kurdistan Region governorates were missing from the national data from 1995 to 2004 and are included again now.",
          detail:
            "The 2022 report describes the Iraqi Cancer Registry as a population-based registry collecting all new cancers diagnosed in Iraq. Registry staff in each health directorate, trained in IARC's CanReg5 software, collect cases from hospitals, pathology laboratories and clinics; the Board's registry section reviews each form and checks it against an alphabetical index to prevent duplicates. The Board was established by Law 63 of 1985 and is headed by the Minister of Health; reports covered several years each up to 1998 to 1999 and have been annual since. The crude incidence rate it records rose from 31.5 per 100,000 in 1976 to 92.5 in 2022, which the report attributes partly to lifestyle and environmental change and partly to better detection. In the 2022 national report the Kurdistan Region's governorates recorded 2,909 new cancers among Iraqi nationals in Sulaymaniyah, 2,465 in Erbil and 1,222 in Duhok, 6,596 together by OnCo's sum of the report's table 4. Their own Ministry of Health keeps regional statistics: a 2022 peer-reviewed analysis of its registry data for Erbil and Duhok found incidence rising from 73 to 174 per 100,000 women and from 36 to 85 per 100,000 men between 2013 and 2019. The registry's 2023 total has been given only in a news interview, not yet in a published report found by OnCo.",
          links: [
            { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022, introduction and table 4 (PDF)", url: ICR_2022 },
            { label: "M-Amen et al., cancer incidence in Erbil and Duhok 2013 to 2019 (Asian Pac J Cancer Prev 2022)", url: KURD_2022 },
            { label: "Rudaw: Iraqi Cancer Board figures for 2023 (15 February 2025)", url: RUDAW_2025_02 },
          ],
        },
      ],
      tables: [
        {
          id: "iq-registry",
          title: "What Iraq's cancer registries report",
          caption: "New cancers and rates per 100,000 as each source states them, 1976 to 2023. The rate type is named in the last column.",
          columns: [
            { key: "registry", label: "Source (area covered)" },
            { key: "period", label: "Year" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Men, per 100,000", numeric: true },
            { key: "women", label: "Women, per 100,000", numeric: true },
            { key: "rate", label: "Rate type" },
          ],
          rows: [
            { registry: "Iraqi Cancer Registry, all Iraq including the Kurdistan Region (registration division director, to Rudaw)", period: "2023", cases: 43062, men: null, women: null, rate: "Count only; 1,922 in children aged 14 or under" },
            { registry: "Iraqi Cancer Registry, Iraqi nationals in all 18 governorates: 16,287 men, 22,781 women", period: "2022", cases: 39068, men: 144.3, women: 173.5, rate: "Age-standardised (WHO age structure, per the report's Arabic summary); crude 92.5 both sexes" },
            { registry: "Iraqi Cancer Registry, cancer deaths", period: "2022", cases: 11421, men: null, women: null, rate: "Deaths, not new cases" },
            { registry: "Iraqi Cancer Registry, children aged 0 to 14", period: "2022", cases: 1818, men: null, women: null, rate: "Crude, 10.6 per 100,000 children" },
            { registry: "Iraqi Cancer Registry, Iraqi nationals in Erbil, Duhok and Sulaymaniyah governorates (OnCo's sum of three table 4 rows)", period: "2022", cases: 6596, men: null, women: null, rate: "Count only" },
            { registry: "Iraqi Cancer Registry, annual report quoted by The National", period: "2021", cases: 35815, men: null, women: null, rate: "Count only" },
            { registry: "Iraqi Cancer Registry, annual report quoted by The National", period: "2020", cases: 31692, men: null, women: null, rate: "Count only" },
            { registry: "Kurdistan Region Ministry of Health registry data, Erbil and Duhok", period: "2019", cases: null, men: 85, women: 174, rate: "Per 100,000, as the paper's abstract states" },
            { registry: "Iraqi Cancer Registry, all Iraq", period: "1976", cases: null, men: null, women: null, rate: "Crude, 31.5 both sexes" },
          ],
          note: "Only the 2022 and 1976 rows come from a registry report OnCo read in full; the 2019 row is from a paper's abstract. The 2020 and 2021 totals are an annual report's figures as The National quoted them, and the 2023 total is the Cancer Board's registration director's figure as Rudaw reported it; the reports for those years were not found online. The 2022 report excludes 133 cancers in non-Iraqis and gives no completeness estimate; the Kurdistan Region's three governorates were missing from 1995 to 2004. The Kurdistan sum is OnCo's addition of three rows of the report's table 4 (2,909, 2,465 and 1,222); it covers Iraqi nationals only, and 679 cases in the table have no governorate recorded.",
          sources: [
            { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: ICR_2022 },
            { label: "Rudaw: Iraqi Cancer Board figures for 2023 (15 February 2025)", url: RUDAW_2025_02 },
            { label: "The National: cancer's toll in Iraq (4 August 2023)", url: NATIONAL_2023 },
            { label: "M-Amen et al. (Asian Pac J Cancer Prev 2022)", url: KURD_2022 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: public hospitals, high out-of-pocket spending and a new insurance law",
      aside: { label: "Health Insurance Law No. 22 of 2020, English translation (PDF, Internet Archive copy)", url: HI_LAW },
      cards: [
        {
          id: "public-care",
          title: "Public care costs little at the point of use, but more than half of health spending is out of pocket",
          plain:
            "Government health services cover everyone in Iraq, and public facilities charge subsidised prices: an outpatient prescription at a public clinic costs between 0.8 and 2.5 US dollars. Yet households paid 54% of all health spending out of pocket in 2023, and a 2023 news report described public hospitals running short of medicines, with other needs met only privately.",
          detail:
            "The 2021 Eastern Mediterranean Health Journal report on pharmaceutical regulation, written with Ministry of Health and WHO staff, states that all people are covered by government health services, that public facilities are owned by the government and that public outpatient prescriptions cost between 0.8 and 2.5 US dollars; private health insurance is not commonly used. The World Bank's series, drawn from WHO's Global Health Expenditure Database, puts out-of-pocket payments at 54.0% of current health expenditure in 2023 (53.1% in 2022, 49.9% in 2021), general government spending at 46.0%, and total health spending at 5.5% of GDP in 2023. The National reported in 2023 that chemotherapy and radiotherapy are free only in government hospitals, which also give subsidised medicines with occasional shortages, and that other needs can only be met privately; a family in the report had sold land and a shop to pay for a father's treatment, and another patient had gone abroad for treatment. The same report gave a special allocation of 200 billion dinars for tumour treatment in the 2023 budget, and the Cancer Board's general director, Tahseen Al-Rubai, said plans were under way for at least five centres with modern radiation machines.",
          links: [
            { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021)", url: EMHJ_2021 },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Iraq", url: WB_OOP },
            { label: "World Bank: current health expenditure, % of GDP, Iraq", url: WB_CHE },
            { label: "The National: cancer's toll in Iraq (4 August 2023)", url: NATIONAL_2023 },
          ],
        },
        {
          id: "insurance-law",
          title: "The 2020 health insurance law exempts people with cancer from every fee and co-payment",
          plain:
            "Iraq's Health Insurance Law of 2020 creates a national insurance scheme in which members pay a joining fee, a monthly premium and a share of the cost of visits, medicines and surgery. People with cancer are exempt from all of these. The scheme began in Baghdad at the end of 2023 and is being extended province by province.",
          detail:
            "Health Insurance Law No. 22 of 2020, published in the Official Gazette No. 4614 of 1 February 2021 and amended by a 2022 Federal Supreme Court decision, sets a one-time subscription of 10,000 to 100,000 dinars by grade, a monthly premium of 1% of salary for state employees, a 10% charge on the value of a visit, 25% or 50% of the price of medicines, tests and imaging by grade, and 10% of the cost of surgery in a government hospital's private ward or 25% in a non-governmental hospital. Article 27 exempts people suffering from cancer from the subscription fee and the monthly premium, alongside psychiatric illness, genetic blood diseases, dialysis and disability, and articles 29 to 31 exempt the same group from the visit, medicine and surgery charges. Among the authority's revenues the law assigns 35% of revenues, taxes and fines from trade in cigarettes, tobacco and other harmful substances. On 14 November 2025 the health minister said more than 2.5 million people were covered in a four-phase rollout; the Kurdistan Region is to join by 2028, the authority's director general told Rudaw. OnCo found no published list of which cancer medicines or treatments the scheme pays for.",
          links: [
            { label: "Health Insurance Law No. 22 of 2020, articles 12 and 27 to 31 (Ministry of Justice translation, PDF, Internet Archive copy)", url: HI_LAW },
            { label: "Rudaw: 2.5 million Iraqis covered by national health insurance (14 November 2025)", url: RUDAW_2025_11 },
          ],
        },
        {
          id: "medicines-supply",
          title: "Cancer medicines reach public hospitals through one central buyer, and supply has fallen short",
          plain:
            "Public hospitals get their medicines from KIMADIA, the Ministry of Health's central purchasing company. It bought 60% of the essential medicines it is responsible for in 2019. Expensive medicines, including cancer medicines, need a cost-effectiveness study before they are added to the national essential list.",
          detail:
            "The 2021 EMHJ report describes a national essential medicines list in three levels (1,105 medicines and vaccines on 23 June 2020, 554 at level 1) and a wider comprehensive list of 3,700 medicines for the private sector. KIMADIA, founded in 1964, must procure level 1 medicines for public hospitals and clinics in all 18 provinces; when it cannot, provincial health directorates and hospitals may buy level 2 or level 3 alternatives or buy from the private sector. In 2019 it procured 60% of level 1 essential medicines, and the report names an insufficient budget as one of the main reasons for shortages over several decades. The National Committee for Drug Selection asks for pharmacoeconomic studies before approving high-cost medicines such as biological and oncology medicines for the list. Registered prices for brand medicines are set mainly by reference to Jordan, Saudi Arabia and the British National Formulary, and KIMADIA can negotiate below them in tenders. OnCo did not find a published list of cancer medicines on the current essential list or their availability by hospital.",
          links: [
            { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021)", url: EMHJ_2021 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Ministry of Health's Directorate of Technical Affairs, and Kurdistan's own agency",
      aside: { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021)", url: EMHJ_2021 },
      cards: [
        {
          id: "fast-track",
          title: "Reliance on the FDA, EMA and other named regulators, with a one-month fast track since 2019",
          plain:
            "Iraq's medicines regulator is a directorate within the Ministry of Health, which registers medicines. It leans on approvals by the FDA, the European Medicines Agency and a few other regulators. Since 2019 a medicine those regulators have approved can get a temporary registration and import licence within a month; the normal route takes about a year.",
          detail:
            "The 2021 EMHJ report, based on the Iraq pharmaceutical country profile 2020, names the Directorate of Technical Affairs as the main entity responsible for medicine regulation; its Registration Department grants marketing authorisation for both the public and private sectors and reviews registrations every five years. The Directorate recognises certificates from the FDA, EMA, WHO and the regulators of the United Kingdom, Switzerland, Canada, Australia, Japan and the Gulf Cooperation Council: under its February 2018 rules, companies holding them are exempt from the pre-registration inspection visit and from batch testing by the National Centre for Drug Control and Research, and the National Committee for Drug Selection treats FDA or EMA approval as the most acceptable basis for adding a new medicine to the essential or comprehensive lists. Fast-track registration, introduced in February 2019 to speed urgently needed medicines, requires seven documents and gives a temporary registration and import licence within one month. Registered medicines rose from 2,500 in December 2018 to 4,665 in August 2020. The report also names substandard and falsified medicines in the private sector as a problem, with no electronic tracking system.",
          links: [
            { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021)", url: EMHJ_2021 },
          ],
        },
        {
          id: "kurdistan-kmca",
          title: "In the Kurdistan Region, a second registration after the federal decision",
          plain:
            "The Kurdistan Region has its own medicines control agency. A company wanting to sell a medicine there must first obtain the federal Ministry of Health's registration decision and then register again with the regional agency, which the regional government says takes 14 to 30 working days.",
          detail:
            "The Kurdistan Regional Government's service page for drug product registration, run by the regional Ministry of Health's Directorate of Pharmaceutical Products Quality Control in Erbil, describes registration through the Kurdistan Medical Control Agency in two steps. Preliminary registration requires the federal Iraqi Ministry of Health's preliminary registration decision, a manufacturer registration certificate from KMCA, a sample and a legal pledge that the information matches what was given to the federal ministry; final registration repeats this with the federal final decision. The fees under administrative decree No. 4527 of 25 May 2014 are 750,000 dinars for preliminary and 1,500,000 dinars for final registration. The 2021 EMHJ report notes that the Kurdistan agency regulates pharmaceuticals at the region's customs posts, each staffed by a pharmacist, while federal customs posts have none.",
          links: [
            { label: "Kurdistan Regional Government: drug product registration service (Internet Archive copy)", url: KMCA_SERVICE },
            { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021)", url: EMHJ_2021 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Early detection and prevention",
      cards: [
        {
          id: "breast-early-detection",
          title: "A national breast cancer early detection programme since 2001, with clinics in major hospitals",
          plain:
            "Iraq started a national programme for early detection of breast cancer in 2001, with specialist clinics in major hospitals in every province. A study at its main Baghdad centre, of women who came with a breast lump in 2004 to 2008, found nearly half of those with cancer were already at an advanced stage.",
          detail:
            "A 2010 paper in the WHO's Eastern Mediterranean Health Journal by Nada Alwan describes the Iraqi national programme for early detection of breast cancer, initiated in 2001 to bring diagnosis forward, under which specialised centres and clinics for early detection of breast tumours were established in the major hospitals in all provinces. At the Main Referral Training Centre for Early Detection of Breast Tumours in Baghdad's Medical City Teaching Hospital, women with palpable lumps had clinical examination, mammography or ultrasound and fine needle aspiration. Of 5,044 women seen between February 2004 and April 2008, 721 had breast cancer; 90.6% had found the lump themselves but only 32% sought advice within a month, 47% presented at stage III or IV and 73.1% had lymph node involvement. OnCo found no national figure for how many women are examined each year, and no organised population screening programme for breast, cervical or colorectal cancer in Iraq.",
          links: [
            { label: "Alwan, breast cancer presentation in Iraq (East Mediterr Health J 2010)", url: EMHJ_2010 },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "No HPV vaccine in the national schedule through 2025",
          plain:
            "Iraq had not introduced the vaccine against the human papillomavirus, which causes most cervical cancers, into its national immunisation programme by 2025, according to WHO's immunisation data. Cervical cancer is less common in Iraq than in many countries: IARC estimates 496 cases in 2024.",
          detail:
            "WHO's immunisation introduction data, reported by countries each year, record Iraq's HPV vaccine status as not introduced for every year from 2022 to 2025, the latest year in the series. IARC's GLOBOCAN 2024 estimates 496 new cervical cancers and 303 deaths in Iraq, 1.4% of all cancers, against 7,461 breast cancers. The Iraqi Cancer Board's 2022 report does not list cervical cancer among the ten commonest cancers in women. OnCo found no Iraqi Ministry of Health document announcing a plan to introduce the vaccine, and no national cervical screening programme; whether the vaccine is available privately is not covered here. Tobacco taxes are tied to health financing: the 2020 health insurance law assigns 35% of revenues, taxes and fines from trade in tobacco and other harmful substances to the insurance authority.",
          links: [
            { label: "WHO immunisation data: HPV vaccine introduction, Iraq (raw API)", url: WHO_HPV },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Iraq (PDF)", url: IARC_FACTSHEET },
            { label: "Health Insurance Law No. 22 of 2020, article 12 (PDF, Internet Archive copy)", url: HI_LAW },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Treatment capacity: what the IAEA, WHO and IARC review found",
      aside: { label: "IAEA: Iraq makes progress in improving cancer services (30 March 2023, Internet Archive copy)", url: IAEA_2023 },
      cards: [
        {
          id: "impact-review",
          title: "Broken equipment, missing guidelines and too few trained staff, in a 2021 review and its 2023 follow-up",
          plain:
            "At the Ministry of Health's request, the IAEA, WHO and IARC reviewed Iraq's cancer services in 2021 and returned in 2023. They found equipment that was not working, no national treatment guidelines, and shortages of trained staff. Iraq confirmed it would write a national cancer control strategy and plan.",
          detail:
            "The 2021 imPACT review, held virtually because of the pandemic and the difficulty of reaching some areas, gathered data from more than 15 cancer diagnosis and treatment facilities and recommended training in medical physics, radiation safety, radiation oncology and radiology, ways to keep qualified staff, and a nuclear law for the safe use of radiation sources. The follow-up mission in early 2023 visited more than 15 hospitals and clinics in Baghdad, Erbil and Mosul. The IAEA reported progress in coordination between the Iraqi Cancer Board and the Ministry of Health's noncommunicable disease unit and a ministerial decree to make opioid prescription easier for terminally ill patients, and listed non-operational equipment, a lack of treatment guidelines, workforce shortages and limited training as the most urgent problems. Five Ministry of Health nominees completed IAEA fellowships in radiation oncology and medical physics, with clinical placements in Türkiye and Jordan, and more were training at Jordan's King Hussein Cancer Center. The ministry's cancer focal point said Iraq needed a five-year cancer plan.",
          links: [
            { label: "IAEA: Iraq makes progress in improving cancer services (30 March 2023, Internet Archive copy)", url: IAEA_2023 },
            { label: "IAEA: review prompts regional cooperation on Iraq's cancer workforce (7 February 2022, Internet Archive copy)", url: IAEA_2022 },
          ],
        },
        {
          id: "centres",
          title: "Public oncology hospitals in Baghdad and radiotherapy centres in the Kurdistan Region",
          plain:
            "Public oncology hospitals and centres in Iraq include Al-Amal National Oncology Hospital in Baghdad, Zhianawa Cancer Center in Sulaymaniyah and Rizgary Oncology Center in Erbil. OnCo found no current public count of radiotherapy machines in Iraq from an official source.",
          detail:
            "The registry report's reviewers include oncologists from the Oncology Teaching Hospital and the Baghdad Center for Radiotherapy and Nuclear Medicine in Baghdad Medical City. The IAEA's February 2022 report pictures the diagnostic imaging and pathology laboratory of Al-Amal National Oncology Hospital in Baghdad. Zhianawa Cancer Center describes itself in its UICC profile as a tertiary public radiotherapy centre, accredited for postgraduate training in radiation oncology and medical physics and treating patients from all Iraqi cities; Rizgary Oncology Center, affiliated with Rizgary Teaching Hospital in Erbil, offers chemotherapy, radiotherapy and surgical oncology. In 2023 The National reported a patient's son waiting since mid-June for a radiotherapy appointment in Maysan province because both machines there were broken, and a shortage of technicians trained to run radiation machines, with Iraq relying on foreign experts mainly from Egypt and India. The IAEA's DIRAC database of radiotherapy centres did not return figures to a script, so machine counts are not given here.",
          links: [
            { label: "UICC: Zhianawa Cancer Center member profile (Internet Archive copy)", url: UICC_ZHIANAWA },
            { label: "UICC: Rizgary Oncology Center member profile (Internet Archive copy)", url: UICC_RIZGARY },
            { label: "IAEA: review prompts regional cooperation on Iraq's cancer workforce (Internet Archive copy)", url: IAEA_2022 },
            { label: "The National: cancer's toll in Iraq (4 August 2023)", url: NATIONAL_2023 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Iraq does",
      title: "What Iraq does differently",
      cards: [
        {
          id: "cancer-exemption",
          title: "Cancer written into the insurance law as a reason to pay nothing",
          plain:
            "Iraq's 2020 health insurance law names cancer as a reason to pay nothing: a person with cancer pays no joining fee, no monthly premium and no share of the cost of visits, medicines, tests or surgery within the scheme. How far that reaches depends on what the scheme covers, which has not been published for cancer.",
          detail:
            "Article 27 of Health Insurance Law No. 22 of 2020 lists cancer first among the diseases whose sufferers are exempt from the subscription fee; the same article exempts them from the monthly premium, article 29 from the 10% visit charge, article 30 from the 25% or 50% share of medicines, laboratory tests and imaging, and article 31 from the 10% or 25% share of surgery. The minister and the head of the authority may jointly add or remove exempt categories. The scheme pays public and private providers under contract, and Rudaw's November 2025 report on the scheme listed 285 types of surgery, 40 types of consultation and all medical tests as covered. Whether chemotherapy, targeted medicines and radiotherapy outside public hospitals are covered for insured people with cancer is not stated in the law or in the reports OnCo read, so the exemption's practical value cannot yet be measured.",
          links: [
            { label: "Health Insurance Law No. 22 of 2020, articles 27 to 31 (PDF, Internet Archive copy)", url: HI_LAW },
            { label: "Rudaw: 2.5 million Iraqis covered by national health insurance (14 November 2025)", url: RUDAW_2025_11 },
          ],
        },
        {
          id: "two-systems",
          title: "Two health administrations: federal Iraq and the Kurdistan Region",
          plain:
            "The Kurdistan Region of Iraq runs its own Ministry of Health, keeps its own registry statistics and registers medicines through its own agency, while also reporting its cancers to the national registry. A patient's route to a medicine or a scheme can differ depending on which side of that line they live.",
          detail:
            "The national registry report for 2022 includes Erbil, Duhok and Sulaymaniyah, which together recorded 6,596 new cancers among Iraqi nationals by OnCo's sum of its table 4, and notes that the region's data were missing from 1995 to 2004. The regional Ministry of Health's Medical Statistics Department is the source of the Erbil and Duhok registry series analysed in a 2022 peer-reviewed paper, which found registered incidence more than doubling between 2013 and 2019. Medicines sold in the region need both the federal registration decision and a second registration with the Kurdistan Medical Control Agency. National health insurance under the 2020 law did not cover the region in November 2025; the insurance authority's director general said it would by 2028. Registry figures for the region therefore sit in the national count, but its health financing and medicines control are separate.",
          links: [
            { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: ICR_2022 },
            { label: "M-Amen et al. (Asian Pac J Cancer Prev 2022)", url: KURD_2022 },
            { label: "Kurdistan Regional Government: drug product registration service (Internet Archive copy)", url: KMCA_SERVICE },
            { label: "Rudaw: 2.5 million Iraqis covered by national health insurance (14 November 2025)", url: RUDAW_2025_11 },
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
          title: "No trial in OnCo's records lists a site in Iraq",
          plain:
            "None of the clinical trials in OnCo's records lists a site in Iraq, counted from the ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, and OnCo holds no record of an Iraqi institution beyond those written for this page. Patients interested in trials should search the registry directly.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov site snapshots for its trials, and none names Iraq; that describes the trials OnCo has recorded, not every study registered, so the ClinicalTrials.gov search below is the place to look. Iraqi cancer research that OnCo has read comes mainly from registry analysis and clinical series: the Cancer Board's own annual reports, the Kurdistan Region registry study of Erbil and Duhok, and the Baghdad early detection centre's breast cancer series. The 2023 IAEA follow-up review recorded the Ministry of Health's intention to write a national cancer control strategy and plan, and the ministry's cancer focal point said it should identify priority training needs; OnCo found no published strategy since.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Iraq", url: CTGOV },
            { label: "M-Amen et al. (Asian Pac J Cancer Prev 2022)", url: KURD_2022 },
            { label: "Alwan (East Mediterr Health J 2010)", url: EMHJ_2010 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-years",
      title: "Only one registry report was read in full; the 2020, 2021 and 2023 totals are quoted",
      plain:
        "OnCo read the Iraqi Cancer Board's 2022 annual report in full from the Ministry of Health's file server. The reports for other years were not found online, so the 2020 and 2021 totals are taken from a newspaper's reading of an annual report and the 2023 total from a news interview with the registry's director.",
      detail:
        "The 2022 report is a Ministry of Health PDF published in March 2024. No ministry page listing the registry's reports was found, and the search for this page did not find the 2020, 2021 or 2023 reports. The 2022 report gives no completeness estimate, names the standard population behind its age-standardised rates only in its Arabic summary (the age structure adopted by WHO), and its age-standardised rate of 158.9 per 100,000 is well above IARC's modelled 111.5 for 2024 without either source explaining why. Its registered deaths, 11,421, are far below IARC's modelled 19,963. The Kurdistan Region paper's abstract does not say whether its rates are crude or age-standardised.",
      links: [
        { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: ICR_2022 },
        { label: "Rudaw: Iraqi Cancer Board figures for 2023 (15 February 2025)", url: RUDAW_2025_02 },
        { label: "The National: cancer's toll in Iraq (4 August 2023)", url: NATIONAL_2023 },
      ],
    },
    {
      id: "sources-refused-iq",
      title: "Sources that refused a script, and figures not found",
      plain:
        "The IAEA's site returned a bot check and its radiotherapy directory returned no figures, so the IAEA reports were read from Internet Archive copies and no machine count is given. WHO's 2020 cancer country profile for Iraq was not found at the address used for other countries. The Ministry of Justice and Kurdistan government sites refused direct requests.",
      detail:
        "iaea.org answered with a human-verification page; the 2022 and 2023 imPACT news reports were read from the Internet Archive, the imPACT review report itself was not read, and DIRAC's country page loads its data by script. cdn.who.int returned not found for Iraq's 2020 cancer country profile under every file name tried, so WHO's figures on radiotherapy, workforce and medicine availability are not used. moj.gov.iq did not answer and the health insurance law was read from an archived copy; service.gov.krd refused the request and its registration page was read from an archived copy. uicc.org refused a script and its member profiles were read from archived copies. Not found: a published national cancer control plan, the list of cancer medicines on the essential list, medicine availability by hospital, waiting times, survival figures, the health insurance scheme's benefits for cancer, and an official count of oncologists. Warith International Cancer Institute in Karbala and other centres are not described because OnCo could not reach a primary source for them in this round.",
      links: [
        { label: "IAEA: Iraq makes progress in improving cancer services (Internet Archive copy)", url: IAEA_2023 },
        { label: "Health Insurance Law No. 22 of 2020 (PDF, Internet Archive copy)", url: HI_LAW },
        { label: "Kurdistan Regional Government: drug product registration service (Internet Archive copy)", url: KMCA_SERVICE },
      ],
    },
  ],
  institutions: ["iraqi-cancer-board", "iraq-moh-technical-affairs", "kimadia-iraq", "iraq-health-insurance-authority", "kmca-kurdistan", "al-amal-national-oncology-hospital", "zhianawa-cancer-center", "rizgary-oncology-center", "iarc", "who", "iaea", "khcc", "uicc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-m-amen-kurdistan-cancer-incidence-apjcp-2022", "paper-al-jumaili-pharmaceutical-regulation-iraq-emhj-2021", "paper-alwan-breast-cancer-iraq-emhj-2010"],
  people: ["tahseen-al-rubai"],
  how:
    "Every card was written from sources read in full rather than through a summary: the Iraqi Cancer Board's Cancer Registry of Iraq annual report 2022; IARC's GLOBOCAN 2024 fact sheet; the Ministry of Justice's English translation of Health Insurance Law No. 22 of 2020; the World Bank's health expenditure series; WHO's immunisation introduction data; the 2021 Eastern Mediterranean Health Journal report on pharmaceutical regulation; the Kurdistan Regional Government's medicine registration page; IAEA reports on the imPACT review; UICC member profiles; and two peer-reviewed papers resolved through Europe PMC. Officials' figures reported by Rudaw and The National are named as such. Government sites that refused a script were read from Internet Archive copies, and each is named. The new records for this page (the Cancer Board, the regulator, KIMADIA, the Health Insurance Authority, KMCA, three cancer centres, three papers and one person) carry their own sources.",
  verify:
    "National incidence and deaths are IARC estimates, and the registry's figures are cases and deaths reported to it, with no published completeness. What a patient pays depends on whether a medicine is in stock at a public hospital and, for insured people, on what the insurance scheme covers; ask the hospital pharmacy and the Health Insurance Authority directly. In the Kurdistan Region, ask the regional Ministry of Health.",
  verifyLinks: [
    { label: "Ministry of Health, Iraq", url: "https://moh.gov.iq" },
    { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: ICR_2022 },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Iraq (PDF)", url: IARC_FACTSHEET },
    { label: "ClinicalTrials.gov: cancer studies with sites in Iraq", url: CTGOV },
  ],
};
