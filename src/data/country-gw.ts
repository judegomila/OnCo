import type { CountryDive } from "@/data/country-dive";

/**
 * Guinea-Bissau deep dive: the hand-written cards for /countries/gw/ (wave 14). Very little is published about cancer
 * care in Guinea-Bissau, so this page is short and says where nothing was found. Every figure was read from the raw
 * text of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer
 * Country Profile 2020 and cervical cancer profile 2021 (PDF text), a Forbes África Lusófona report of 13 March 2025
 * quoting the health minister through the Lusa news agency, the Europe PMC record of a 2023 paper on breast surgery
 * missions at the national hospital, WHO's list of regulators at maturity level 3 and 4, the African Union's treaty
 * list, WHO's immunisation data API, the World Bank's health expenditure series and IAEA DIRAC's public data. The
 * Ministry of Public Health's site loads its content by script and could not be read.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/624-guinea-bissau-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/gnb-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-gnb-2021-country-profile-en.pdf";
const FORBES = "https://forbesafricalusofona.com/portugal-e-guine-bissau-analisam-possivel-criacao-de-instituto-de-oncologia/";
const DJEDJO_PAPER = "https://doi.org/10.1200/go.22.00317";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=guinea%20bissau";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const MINSAP = "https://www.minsap.gw/";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const WHO_HPV_COV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GNB'%20and%20contains(ANTIGEN,'HPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'GNB'%20and%20contains(ANTIGEN,'HPV')";
const WB_OOP = "https://api.worldbank.org/v2/country/GNB/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/GNB/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/GNB/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/GNB/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CLINREGS = "https://clinregs.niaid.nih.gov/";
const CTGOV = "https://clinicaltrials.gov/search?country=Guinea-Bissau&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Guinea-Bissau&query.cond=cancer&pageSize=20&countTotal=true";

export const GW_DIVE: CountryDive = {
  iso2: "GW",
  iso3: "GNB",
  name: "Guinea-Bissau",
  flag: "🇬🇼",
  asOf: "2026-11-16",
  title: "Cancer in Guinea-Bissau",
  description:
    "Cancer in Guinea-Bissau from the few sources that exist: IARC's 2024 estimate of 1,584 new cancers and 1,070 deaths, modelled from neighbouring countries' rates, cervical and breast cancer leading, people with cancer sent to Portugal through medical boards, an oncology institute under discussion with Portugal in 2025, no radiotherapy centre in IAEA's directory, no HPV vaccination programme in WHO's data, health spending of about USD 82 a person in 2023 with 62% paid out of pocket, and no trial in OnCo's records with a site in Guinea-Bissau.",
  lede:
    "A March 2025 news report says people with cancer in Guinea-Bissau are sent abroad through medical boards, to Portugal, and quotes the health minister saying that an oncology institute in Guinea-Bissau was being discussed with Portugal. No registry is on record, so IARC's 2024 figure of 1,584 new cancers a year is built from neighbouring countries' rates: these are modelled figures, not counts.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Guinea-Bissau is 1,584 new cancers and 1,070 deaths, an age-standardised incidence of 117.2 per 100,000 (97.2 in men, 136.8 in women) and an age-standardised mortality of 83.5. These are modelled figures, not counts. The fact sheet's \"Data source and methods\" box names no country-specific source for incidence and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\" (IARC's method 5); mortality is \"National incidence estimates applied to model-based M:I ratios (registry survival data)\" (method 3c). WHO's 2020 profile adds that the incidence estimates have a high degree of uncertainty because they are not based on a population-based cancer registry, and the mortality estimates because they are not based on any national mortality data.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Guinea-Bissau",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Guinea-Bissau (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,600 new cancers a year by IARC's estimate, two thirds in women",
          plain:
            "IARC estimates 1,584 new cancers in Guinea-Bissau in 2024, 1,050 of them in women, and 1,070 cancer deaths. Cervical cancer is estimated to be the commonest cancer, then breast and liver cancer; liver cancer is the commonest cause of cancer death. The estimate is modelled from neighbouring countries' rates, not counted in Guinea-Bissau.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 283 cervical cancers (169 deaths), 273 breast cancers (127 deaths), 215 liver cancers (191 deaths), 96 prostate cancers (67 deaths) and 67 stomach cancers (57 deaths). The risk of developing a cancer before age 75 is 12.3%, and an estimated 2,709 people are living within five years of a diagnosis. The fact sheet names no Bissau-Guinean data source for incidence. WHO's 2020 profile estimated 109 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Guinea-Bissau (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Guinea-Bissau (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "no-registry",
          title: "No cancer registry on record",
          plain:
            "WHO's 2020 profile had no information on a population-based cancer registry in Guinea-Bissau and recorded no coverage of death registration. WHO's 2021 cervical cancer profile recorded that no such registry existed.",
          detail:
            "The 2020 profile lists the availability of a population-based registry in 2019 as \"no information\" and the quality of mortality registration for 2007 to 2016 as \"no coverage\". The African Cancer Registry Network's member list, read on 16 November 2026, does not include Guinea-Bissau, and OnCo found no hospital-based registry report either. The one set of counts OnCo read from inside the country is from visiting breast surgery teams at the national hospital, described below. Until a registry exists, the figures on this page are borrowed from the region.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Guinea-Bissau (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Guinea-Bissau (PDF)", url: WHO_CERVICAL },
            { label: "African Cancer Registry Network: member list", url: AFCRN_LIST },
          ],
        },
      ],
      tables: [
        {
          id: "gw-globocan-sites",
          title: "The five commonest cancers in Guinea-Bissau, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Cervix uteri", cases: 283, deaths: 169 },
            { site: "Breast", cases: 273, deaths: 127 },
            { site: "Liver", cases: 215, deaths: 191 },
            { site: "Prostate", cases: 96, deaths: 67 },
            { site: "Stomach", cases: 67, deaths: 57 },
          ],
          note: "OnCo found no registry figures from Guinea-Bissau to set beside these. They are estimates built from other countries' rates, with a high degree of uncertainty.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Guinea-Bissau (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "oop",
          title: "About USD 82 a person on health in 2023, six tenths of it out of pocket",
          plain:
            "Guinea-Bissau spent about 82 US dollars a person on health in 2023, and households paid 62% of it out of their own pockets, according to WHO's health expenditure figures. OnCo found no source on who pays when a patient is sent to Portugal, or on any public scheme that covers cancer care.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 70 per person in 2021, 68 in 2022 and 82 in 2023, and out-of-pocket spending of 61.0%, 66.3% and 61.6% of it. In 2023 the government paid 10.6% of health spending from domestic funds and external donors 25.1%. These figures cover all health care. WHO's 2020 profile recorded the availability of opioids for pain relief for 2015 to 2017 as 0 defined daily doses per million people per day. A family facing evacuation should ask the medical board and the hospital, before travelling, what is paid for and what is not.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Guinea-Bissau (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Guinea-Bissau (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, Guinea-Bissau (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, Guinea-Bissau (API)", url: WB_EXT },
            { label: "WHO: Cancer Country Profile 2020, Guinea-Bissau (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "regulator-gap",
          title: "OnCo has not read a source on how medicines are approved in Guinea-Bissau",
          plain:
            "OnCo did not find or read the rules of Guinea-Bissau's medicines regulator for this page, so it states nothing about how cancer medicines are approved or how trials are authorised. This card stands for a missing source, not a claim that no regulator exists.",
          detail:
            "The Ministry of Public Health's site loads its content by script and returned no readable text on 16 November 2026. The NIH's ClinRegs site, read the same day, has no profile for Guinea-Bissau among its 23 countries. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Guinea-Bissau, and the African Union's list of 19 September 2023 shows it had neither signed nor ratified the African Medicines Agency treaty. A future pass should read the Ministry's site in a browser and the pharmacy legislation in Portuguese. Readers with a question about a particular medicine can ask the Ministry of Public Health or WHO's country office in Bissau.",
          links: [
            { label: "Ministério da Saúde Pública, Guiné-Bissau", url: MINSAP },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            { label: "NIH ClinRegs: countries with a profile", url: CLINREGS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer profile 2021, Guinea-Bissau (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "screening-2021",
          title: "No screening programme and no HPV vaccination programme in WHO's records",
          plain:
            "WHO's 2021 cervical cancer profile recorded no national cervical screening programme in Guinea-Bissau and HPV vaccination as not in the national schedule. WHO's immunisation database records the HPV vaccine as not introduced in every year to 2025 and holds no coverage figures.",
          detail:
            "The 2021 profile estimated that 8% of women aged 30 to 49 had been screened for cervical cancer in the previous five years and 11% ever (2019), and recorded no programme for early detection of first symptoms in primary care. WHO's 2020 profile recorded no breast or cervical screening programme in 2019 and early detection guidelines for none of the four cancers it asks about. A query of WHO's immunisation data API on 16 November 2026 returned 44 HPV coverage rows for Guinea-Bissau, for 2018 to 2025, none of them holding a coverage figure or a count of doses, and its vaccine introduction rows read \"No\" for each year from 2006 to 2025. Cervical cancer is the commonest cancer in IARC's estimate for the country. OnCo found no announcement of a planned introduction; the Ministry of Public Health and Gavi are the places to ask.",
          links: [
            { label: "WHO: cervical cancer profile 2021, Guinea-Bissau (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Guinea-Bissau (PDF)", url: WHO_PROFILE },
            { label: "WHO immunisation data API: HPV coverage rows, Guinea-Bissau (no figures in them)", url: WHO_HPV_COV },
            { label: "WHO immunisation data API: HPV vaccine introduction, Guinea-Bissau", url: WHO_HPV_INTRO },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Guinea-Bissau",
      cards: [
        {
          id: "evacuation",
          title: "Treatment abroad through medical boards, and an oncology institute under discussion",
          plain:
            "A report of 13 March 2025 says the lack of cancer services in Guinea-Bissau leads to medical evacuations arranged through medical boards (juntas médicas), and that Portugal is the one country with which Guinea-Bissau has agreements for them. The health minister said an oncology institute in Guinea-Bissau was being discussed with Portugal.",
          detail:
            "The report, in Forbes África Lusófona and citing the Lusa news agency, followed a meeting in Bissau between the Minister of Public Health, Pedro Tipote, and a delegation from Portugal's health ministry. The minister said they had spoken of the possibility of establishing an oncology institute, and that transfers of patients run into difficulties, in particular in obtaining visas, which he suggested taking up with the Portuguese embassy, the consular system and Portuguese cooperation. This is a news report of a discussion, not a decision: OnCo found no later source saying an institute has been agreed, funded or sited. Ask the Ministry of Public Health how a medical board referral is requested.",
          links: [{ label: "Forbes África Lusófona: Portugal and Guinea-Bissau discuss an oncology institute (13 March 2025, in Portuguese)", url: FORBES }],
        },
        {
          id: "simao-mendes",
          title: "Breast surgery by visiting teams at the Hospital Nacional Simão Mendes",
          plain:
            "A 2023 paper describes three short missions in one year by a breast cancer surgical team at the Hospital Nacional Simão Mendes, the national referral hospital in Bissau. The team saw 97 female patients aged 12 to 70 and found 19 with invasive breast cancer at stage IV.",
          detail:
            "The team did 21 excisional biopsies, 28 needle biopsies and five radical operations; in seven patients the biopsy showed malignancy. Of the women who had a needle biopsy, two came back for the recall consultation and accepted the treatment proposed. The authors report that a lack of trained pathology technicians to handle samples left 18 samples of poor quality, and conclude that a national cancer strategy is urgent and seems feasible, and that it should put training of local teams first. WHO's 2020 profile recorded pathology services as generally not available in 2019. The paper covers one hospital and one year; it is not a measure of how many women in the country have breast cancer.",
          links: [
            { label: "Djedjo et al., short-term breast surgical missions in Guinea-Bissau (JCO Global Oncology 2023)", url: DJEDJO_PAPER },
            { label: "WHO: Cancer Country Profile 2020, Guinea-Bissau (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "no-radiotherapy",
          title: "No radiotherapy centre in IAEA's directory and no cancer plan on record",
          plain:
            "IAEA's directory of radiotherapy centres, read on 16 November 2026, lists no centre in Guinea-Bissau. WHO's 2020 profile recorded \"n/a\" for a national cancer control plan and no cancer management guidelines, and a search of the ICCP portal returned WHO's profiles and no national plan.",
          detail:
            "The directory's public data had no row for Guinea-Bissau among its countries and no centre among 8,627 equipment rows. WHO's 2020 profile recorded, per 10,000 cancer patients, 0.0 external beam radiotherapy machines for 2019 and 0.0 mammographs, CT scanners, MRI scanners and PET scanners for 2020, with community or home-based palliative care generally not available. WHO's 2021 cervical cancer profile marks as data not available whether cancer surgery, chemotherapy, radiotherapy and pathology are generally available. The ICCP portal search for Guinea-Bissau on 16 November 2026 returned WHO's profiles of 2014, 2020 and 2021 and nothing else. These are survey answers from 2019 to 2021; OnCo found no more recent official account, so ask the national hospital what is offered now.",
          links: [
            { label: "IAEA DIRAC: directory of radiotherapy centres", url: DIRAC },
            { label: "WHO: Cancer Country Profile 2020, Guinea-Bissau (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Guinea-Bissau (PDF)", url: WHO_CERVICAL },
            { label: "ICCP portal: resources search for Guinea-Bissau", url: ICCP_SEARCH },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Guinea-Bissau", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Guinea-Bissau",
          plain:
            "None of the trials in OnCo's records lists Guinea-Bissau among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Guinea-Bissau. A query of the registry's own interface the same day for the condition \"cancer\" with a location in Guinea-Bissau returned one completed study, of self-collected vaginal and urine samples in women living with HIV (NCT05783167), which is not a trial of a cancer treatment. Published cancer research from the country that OnCo read is the 2023 paper on breast surgery missions.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Guinea-Bissau", url: CTGOV },
            { label: "ClinicalTrials.gov API: the query OnCo ran", url: CTGOV_API },
            { label: "Djedjo et al., short-term breast surgical missions in Guinea-Bissau (JCO Global Oncology 2023)", url: DJEDJO_PAPER },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "What OnCo could not find or read for Guinea-Bissau",
      plain:
        "OnCo found no cancer registry, no national cancer plan, no source on the medicines regulator, no account of what cancer treatment is given inside the country today, and no figures on how many patients are sent to Portugal or who pays.",
      detail:
        "The Ministry of Public Health's site loads its content by script and returned no readable text, so nothing on this page comes from the Ministry directly. The account of evacuation rests on one news report from March 2025. WHO's 2020 profile leaves most workforce rows as \"n/a\", and its 2021 cervical cancer profile marks treatment services as data not available. A future pass should read the Ministry's site in a browser, look for the Portugal and Guinea-Bissau health cooperation agreement and Portuguese figures on evacuated patients, and search Portuguese-language journals for hospital studies. Readers can ask the Hospital Nacional Simão Mendes, the Ministry of Public Health or WHO's country office in Bissau.",
      links: [
        { label: "Ministério da Saúde Pública, Guiné-Bissau", url: MINSAP },
        { label: "ICCP portal: resources search for Guinea-Bissau", url: ICCP_SEARCH },
        { label: "IAEA DIRAC: directory of radiotherapy centres", url: DIRAC },
      ],
    },
  ],
  institutions: ["guinea-bissau-ministry-of-health", "hospital-simao-mendes", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, a Forbes África Lusófona report of March 2025, the Europe PMC record of a 2023 paper from the national hospital, WHO's list of regulators, the African Union's treaty list, WHO's immunisation data, the World Bank's health expenditure series and IAEA's radiotherapy directory. No source from the Ministry of Public Health could be read.",
  verify:
    "The cancer numbers on this page are modelled estimates, survey answers from 2019 to 2021 and the counts of one visiting surgical team at one hospital, and the account of treatment abroad rests on one news report. Anyone seeking care should ask the national hospital or the Ministry of Public Health what is available now.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Guinea-Bissau (PDF)", url: IARC_FACTSHEET },
    { label: "WHO: Cancer Country Profile 2020, Guinea-Bissau (PDF)", url: WHO_PROFILE },
    { label: "Ministério da Saúde Pública, Guiné-Bissau", url: MINSAP },
  ],
};
