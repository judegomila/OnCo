import type { CountryDive } from "@/data/country-dive";

/**
 * Trinidad and Tobago deep dive: the hand-written cards for /countries/tt/ (wave 16). Every figure was read from the
 * raw text of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Trinidad
 * and Tobago (PDF text), the Ministry of Health's pages on the national cancer registry, on cancer care and treatment,
 * on the Chronic Disease Assistance Programme and on the Chemistry, Food and Drugs Division, the registry's report
 * "Cancer in Trinidad and Tobago 2003-2020" (published 2025, PDF text), the Minister of Health's address of 11 July
 * 2025 on the Ministry's site, the National Strategic Plan for the Prevention and Control of Non Communicable Diseases
 * 2017 to 2021 (the copy in WHO's NCD document repository, PDF text), UDeCOTT's project page for the National Oncology
 * Centre, CARPHA's pages on the Caribbean Regulatory System and the Caribbean Cancer Registry Hub, WHO's 2020 cancer
 * profile and 2021 cervical cancer profile (PDF text), WHO's HPV coverage, vaccine introduction and health expenditure
 * rows from its public data APIs, IAEA DIRAC's public equipment data, and the papers' abstracts through Europe PMC.
 * Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/780-trinidad-and-tobago-fact-sheet.pdf";
const MOH = "https://health.gov.tt/";
const REGISTRY_PAGE = "https://health.gov.tt/national-cancer-registry";
const REGISTRY_REPORT = "https://health.gov.tt/sites/default/files/2025-02/2025-02-Cancer-in-Trinidad-and-Tobago-2003-2020.pdf";
const CANCER_CARE = "https://health.gov.tt/node/36";
const MINISTER_2025 = "https://health.gov.tt/node/1689";
const CDAP = "https://health.gov.tt/node/45";
const CFDD = "https://health.gov.tt/services/chemistry-food-and-drugs-division";
const NCD_PLAN = "https://extranet.who.int/ncdccs/Data/TTO_B3_TTO%20National-Strategic-Plan-%20for%20Prevention%20and%20Control%20of%20NCDs-2017-2021.pdf";
const UDECOTT_NOC = "https://udecott.com/projects/the-national-oncology-centre";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/FAQ";
const CRH_HUB = "https://caribbeancrh.carpha.org/";
const GICR_HUB = "https://gicr.iarc.who.int/hub/caribbean/";
const WHO_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/tto-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-tto-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'TTO'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'TTO'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'TTO'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'TTO'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'TTO'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Trinidad%20and%20Tobago&cond=cancer";
const WARNER_2018 = "https://doi.org/10.1186/s12885-018-4625-x";
const WARNER_PROSTATE_2018 = "https://doi.org/10.1007/s10552-018-1038-8";
const GOPAUL_2023 = "https://doi.org/10.1186/s41043-023-00395-1";
const ABRAHIM_2025 = "https://doi.org/10.26633/RPSP.2025.52";

export const TT_DIVE: CountryDive = {
  iso2: "TT",
  iso3: "TTO",
  name: "Trinidad and Tobago",
  flag: "🇹🇹",
  asOf: "2026-11-16",
  title: "Cancer in Trinidad and Tobago",
  description:
    "Cancer in Trinidad and Tobago from its own and international sources: IARC's estimate of 4,011 new cancers and 2,284 deaths in 2024, built on the national registry's rates, the Dr. Elizabeth Quamina Cancer Registry's count of 3,225 new cases in 2020, cancer care free of charge to citizens in public hospitals, medicines regulated by the Chemistry, Food and Drugs Division, three radiotherapy centres in IAEA's directory, and HPV vaccination since 2012.",
  lede:
    "Trinidad and Tobago has a national cancer registry, set up in 1994, whose latest report counts 43,380 people diagnosed from 2003 to 2020 and 3,225 new cases in 2020. IARC builds its national estimate on the registry's rates: 4,011 new cancers and 2,284 deaths in 2024, with prostate and breast cancer the commonest. The Ministry of Health says citizens are entitled to cancer care free of charge on a doctor's referral.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Trinidad and Tobago is 4,011 new cancers and 2,284 deaths, an age-standardised incidence of 170.6 per 100,000 (180.6 in men, 169.9 in women) and mortality of 95.5. The fact sheet gives the country-specific incidence data source as \"Registry (national)\" and the method as \"National rates applied to 2024 population\"; for mortality the source is \"WHO (national)\" and the method \"Trends in national rates projected to 2024\". So this is an estimate carried forward from counted cases, not a model from neighbours. The registry's own report gives 3,225 new cases and 2,035 cancer deaths in 2020, crude rates of 237.7 and 150.0 per 100,000; its figures are crude, IARC's headline rates are age-standardised, and the two are not directly comparable. IARC counts 20 non-melanoma skin cancers among the 4,011 (3,991 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Trinidad and Tobago",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Trinidad and Tobago (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 4,000 new cancers a year, with prostate and breast cancer the commonest",
          plain:
            "IARC estimates 4,011 new cancers in Trinidad and Tobago in 2024, 1,929 in men and 2,082 in women, and 2,284 cancer deaths. Prostate cancer is the commonest overall, then breast and colorectal cancer. In women, cancer of the womb lining (corpus uteri) is second after breast cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 793 prostate cancers (342 deaths), 654 breast cancers (284 deaths), 429 colorectal cancers (253 deaths), 278 lung cancers (226 deaths), 244 cancers of the corpus uteri (102 deaths) and 193 cervical cancers (112 deaths). In men the leading cancers are prostate (793, 41.1%), colorectum (221) and lung (197); in women, breast (654, 31.4%), corpus uteri (244, 11.7%) and colorectum (208). Pancreatic cancer is fifth by deaths (119). The risk of developing cancer before 75 is 17.8% and of dying of it 9.0%. An analysis of registry data for 1995 to 2009 put prostate cancer mortality at 47.1 per 100,000 in 2009, which its authors describe as one of the highest in the world.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Trinidad and Tobago (PDF)", url: IARC_FACTSHEET },
            { label: "Warner et al., the burden of prostate cancer in Trinidad and Tobago (Cancer Causes Control 2018)", url: WARNER_PROSTATE_2018 },
          ],
        },
        {
          id: "registry",
          title: "A national registry since 1994, with a report covering 2003 to 2020",
          plain:
            "The Dr. Elizabeth Quamina Cancer Registry is the national, population-based cancer registry. Its 2025 report covers 18 years: 43,380 people diagnosed from 2003 to 2020, 49% male and 51% female, with 2020 the year with the most new cases, 3,225. Reporting a cancer to it is not required by law.",
          detail:
            "The Ministry of Health says the registry was established in September 1994 as a project of the Trinidad and Tobago Cancer Society and named after its founder, who died in 1997; the report says it is managed by the Ministry, the North Central Regional Health Authority and the Cancer Society, and holds over 65,000 registered cases. Registry officers collect cases from most public and some private institutions. The report says its data were accepted in 2023 into Cancer Incidence in Five Continents, for the first time. Of those diagnosed, 36.2% were recorded as African, 23% as East Indian, and for 24.2% the ethnicity was unknown. An earlier analysis of 29,512 cases from 1995 to 2009 found incidence of 243 per 100,000 in people of African ancestry, 125 in East Indian and 119 in mixed ancestry.",
          links: [
            { label: "Ministry of Health: about the cancer registry", url: REGISTRY_PAGE },
            { label: "Dr. Elizabeth Quamina Cancer Registry: Cancer in Trinidad and Tobago 2003-2020 (2025, PDF)", url: REGISTRY_REPORT },
            { label: "Warner et al., cancer incidence and mortality in Trinidad and Tobago (BMC Cancer 2018)", url: WARNER_2018 },
          ],
        },
      ],
      tables: [
        {
          id: "tt-top",
          title: "IARC's leading cancers for Trinidad and Tobago, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates built on the national registry's rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 793, deaths: 342 },
            { site: "Breast", cases: 654, deaths: 284 },
            { site: "Colorectum", cases: 429, deaths: 253 },
            { site: "Lung", cases: 278, deaths: 226 },
            { site: "Corpus uteri", cases: 244, deaths: 102 },
            { site: "Cervix uteri", cases: 193, deaths: 112 },
            { site: "Ovary", cases: 133, deaths: 96 },
            { site: "Pancreas", cases: 130, deaths: 119 },
            { site: "All cancers", cases: 4011, deaths: 2284 },
          ],
          note: "IARC applies national registry rates to the 2024 population. The registry's own counts, in the next table, stop at 2020.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Trinidad and Tobago (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "tt-registry-years",
          title: "The national registry's counts by year, 2015 to 2020",
          caption: "New cancers registered and cancer deaths, with crude rates per 100,000, from Table 4.2 of the registry's 2025 report.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "rate", label: "Crude incidence rate", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "mrate", label: "Crude mortality rate", numeric: true },
          ],
          rows: [
            { year: "2015", cases: 2573, rate: 189.7, deaths: 1810, mrate: 133.4 },
            { year: "2016", cases: 2605, rate: 192.0, deaths: 1718, mrate: 126.6 },
            { year: "2017", cases: 2877, rate: 212.1, deaths: 1805, mrate: 133.0 },
            { year: "2018", cases: 3104, rate: 228.8, deaths: 1910, mrate: 140.8 },
            { year: "2019", cases: 3157, rate: 232.7, deaths: 2175, mrate: 160.3 },
            { year: "2020", cases: 3225, rate: 237.7, deaths: 2035, mrate: 150.0 },
          ],
          note: "Counted cases, with crude rates that are not adjusted for age. The report gives 2,142 new cases in 2003 and a low of 1,887 in 2013; notification is voluntary, and the report does not say how much of the rise since 2015 reflects more complete collection.",
          sources: [{ label: "Dr. Elizabeth Quamina Cancer Registry: Cancer in Trinidad and Tobago 2003-2020, Table 4.2 (2025, PDF)", url: REGISTRY_REPORT }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Ministry of Health: cancer care and treatment", url: CANCER_CARE },
      cards: [
        {
          id: "free-care",
          title: "Cancer care free of charge for citizens, on a doctor's referral",
          plain:
            "The Ministry of Health says all citizens of Trinidad and Tobago are entitled to cancer care and treatment free of charge, and that non-nationals must pay. A doctor's referral and one form of national identification are needed.",
          detail:
            "The Ministry's page describes the National Oncology Programme as covering treatment, education, prevention, screening and early diagnosis, palliation and supportive care, and lists the public sites: Port of Spain General Hospital, San Fernando General Hospital, the Eric Williams Medical Sciences Complex and the National Radiotherapy Centre at the St. James Medical Complex. In an address of 11 July 2025 the Minister of Health repeated that the programme provides free cancer care at those hospitals and at the Trinidad and Tobago Cancer Centre. Neither page says which medicines are supplied, or how long the wait is.",
          links: [
            { label: "Ministry of Health: cancer care and treatment", url: CANCER_CARE },
            { label: "Ministry of Health: the Minister's address to the Caribbean Association for Oncology and Hematology (11 July 2025)", url: MINISTER_2025 },
          ],
        },
        {
          id: "out-of-pocket",
          title: "Nearly half of health spending is still paid out of pocket",
          plain:
            "WHO puts out-of-pocket payment at 45.3% of Trinidad and Tobago's health spending in 2023, close to the government's 48.4%. The free medicines scheme for chronic illness, CDAP, lists twelve conditions and none of them is cancer.",
          detail:
            "WHO's Global Health Expenditure Database gives, for 2023, current health spending of about US$1,276 a person, 48.4% of it from domestic government sources and 45.3% paid out of pocket; the out-of-pocket share was 46.5% in 2020 and 48.2% in 2022. These are shares of all health spending, private care included, and are not specific to cancer. The Chronic Disease Assistance Programme gives citizens free prescription drugs through over 250 pharmacies for diabetes, asthma, cardiac diseases, arthritis, glaucoma, depression, high blood pressure, benign prostatic hyperplasia, epilepsy, high cholesterol, Parkinson's disease and thyroid diseases; its page says 47 drugs are available.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Trinidad and Tobago (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "Ministry of Health: Chronic Disease Assistance Programme", url: CDAP },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Ministry of Health: Chemistry, Food and Drugs Division", url: CFDD },
      cards: [
        {
          id: "cfdd",
          title: "The Chemistry, Food and Drugs Division administers the Food and Drugs Act",
          plain:
            "Medicines are regulated by the Chemistry, Food and Drugs Division of the Ministry of Health, which administers the Food and Drugs Act and its Regulations. A Drug Advisory Committee advises the Minister, and the Division's Drug Registration Unit takes applications to register new drugs.",
          detail:
            "The Division's page gives its mission as ensuring safe quality of an equitable standard for food, drugs, cosmetics and medical devices, and providing laboratory services. It says the Drug Advisory Committee advises the Minister on drug standards, schedules of drugs and conditions of sale, and that the Drug Registration Unit acts for the Committee in accepting applications to register new drugs under the Second Schedule, Division 3, of the Food and Drugs Act and Regulations, Chapter 30:01. The page offers a list of drugs registered from 1999 to 2025. OnCo did not read the Act itself or the list, so which cancer medicines are registered is not on this page.",
          links: [{ label: "Ministry of Health: Chemistry, Food and Drugs Division", url: CFDD }],
        },
        {
          id: "caribbean-regulatory-system",
          title: "A regional review, run by an agency with its head office in Port of Spain, can recommend a medicine to CARICOM states",
          plain:
            "The Caribbean Regulatory System is a unit of the Caribbean Public Health Agency (CARPHA), whose head office is in Port of Spain. It reviews medicines already approved by a reference regulator and recommends them to CARICOM member states. Each country still decides for itself.",
          detail:
            "CARPHA says CARICOM health ministers agreed in 2016 to create the system to support member states with marketing authorisation and pharmacovigilance. It accepts products authorised by regulators that the Pan American Health Organization has designated as regional reference authorities, or prequalified by WHO, and generally those on WHO's essential medicines list or the PAHO Strategic Fund list. Its page says only a sovereign country can authorise products for sale in its market, and that the goal is to turn a recommendation into a national authorisation within 60 calendar days; elsewhere the same page gives a target of 120 calendar days from recommendation to authorisation in a country. OnCo did not find how the Chemistry, Food and Drugs Division treats these recommendations.",
          links: [
            { label: "CARPHA: about the Caribbean Regulatory System", url: CRS_ABOUT },
            { label: "CARPHA: Caribbean Regulatory System, frequently asked questions", url: CRS_FAQ },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer country profile, Trinidad and Tobago (2021, PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening by Pap smear, for women aged 18 to 65",
          plain:
            "WHO's 2021 profile records a national cervical screening programme that uses cytology (the Pap smear) for women aged 18 to 65. It estimates that 5 in 10 women aged 30 to 49 had been screened in the previous five years.",
          detail:
            "The WHO cervical cancer profile gives 56% of women aged 30 to 49 screened in the last five years and 66% ever screened, and 97 cervical cancer deaths in 2019. WHO's 2020 cancer profile describes the cervical programme as organised. The National Strategic Plan for the Prevention and Control of Non Communicable Diseases 2017 to 2021 set out to scale up cervical screening to a national programme, to review the screening programmes for cervical, breast and prostate cancer in primary care and to standardise their protocols. For breast screening, the 2020 profile's answer is \"don't know\". OnCo found no published count of women screened.",
          links: [
            { label: "WHO: cervical cancer country profile, Trinidad and Tobago (2021, PDF)", url: WHO_CX_2021 },
            { label: "WHO: cancer country profile, Trinidad and Tobago (2020, PDF)", url: WHO_2020 },
            { label: "Ministry of Health: National Strategic Plan for the Prevention and Control of NCDs 2017 to 2021 (PDF)", url: NCD_PLAN },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination for girls and boys, with 41% of girls given a first dose in 2025",
          plain:
            "WHO records the HPV vaccine as introduced nationwide in Trinidad and Tobago in 2012. In 2025, 41% of girls and 27% of boys in the target group had a first dose, and 15% of girls and 9% of boys a last dose.",
          detail:
            "WHO's vaccine introduction rows give 2012 as the year of introduction; its 2021 cervical cancer profile gives 2013 and a primary target of girls aged 11 to 15. First-dose programme coverage in girls was 34% in 2023, 38% in 2024 and 41% in 2025 (3,756 doses against a target of 9,196); last-dose coverage was 12%, 16% and 15%. For boys, first-dose coverage was 34%, 17% and 27% in those years. WHO's elimination target is 90% of girls fully vaccinated by the age of 15.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Trinidad and Tobago (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Trinidad and Tobago (API)", url: WHO_INTRO_API },
            { label: "WHO: cervical cancer country profile, Trinidad and Tobago (2021, PDF)", url: WHO_CX_2021 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Three radiotherapy centres in IAEA's directory, all on Trinidad",
          plain:
            "IAEA's radiotherapy directory lists three centres in Trinidad: the Cancer Centre of Trinidad and Tobago at the public St. James Medical Complex, the Medcorp Cancer Centre of the Caribbean in Port of Spain, and Southern Medical Services in San Fernando. Between them it counts six linear accelerators and one cobalt-60 machine. It lists none in Tobago.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, lists the Cancer Centre of Trinidad and Tobago, run by the North West Regional Health Authority, with two linear accelerators, one cobalt-60 unit and high-dose-rate brachytherapy (entry last updated 2025); Medcorp with one linear accelerator and brachytherapy (2026); and Southern Medical Services Company Limited with three linear accelerators and brachytherapy (2026). The directory records equipment, not whether a machine is in service, and does not say who owns each centre or whether public patients are treated at Medcorp or Southern Medical Services. A centre missing from the directory is not proof that it does not exist.",
          links: [{ label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC }],
        },
        {
          id: "national-oncology-centre",
          title: "A National Oncology Centre at Mount Hope, described as nearing completion in July 2025",
          plain:
            "A National Oncology Centre is being built at the Eric Williams Medical Sciences Complex at Mount Hope. On 11 July 2025 the Minister of Health said it was nearing completion and would offer PET/CT imaging, radiotherapy, chemotherapy and brachytherapy. OnCo found no statement that it has opened.",
          detail:
            "The state developer UDeCOTT describes a three-storey ambulatory cancer centre of about 6,600 square metres, intended as the country's main treatment facility for cancer, with a twenty-one station chemotherapy suite, linear accelerators in shielded bunkers, high-dose-rate brachytherapy, a PET/CT scanner, a cyclotron, outpatient clinics and same-day surgery. Its page is not dated. The Minister's address listed bringing the centre into operation among its aims. The Ministry of Health can say whether patients are being treated there yet.",
          links: [
            { label: "Ministry of Health: the Minister's address to the Caribbean Association for Oncology and Hematology (11 July 2025)", url: MINISTER_2025 },
            { label: "UDeCOTT: the National Oncology Centre", url: UDECOTT_NOC },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Trinidad and Tobago is doing",
      cards: [
        {
          id: "registry-hub",
          title: "Home of the Caribbean's cancer registry hub",
          plain:
            "The IARC Caribbean Cancer Registry Hub, which helps Caribbean countries and territories build population-based cancer registries, is based at the Caribbean Public Health Agency in Port of Spain. One of the hub's regional trainers, for coding, is from Trinidad and Tobago's national registry.",
          detail:
            "IARC's Global Initiative for Cancer Registry Development says the Caribbean hub was inaugurated in June 2018, is based at CARPHA in Port of Spain, and is a partnership of IARC, CARPHA, the United States Centers for Disease Control and Prevention, the United States National Cancer Institute and the North American Association of Central Cancer Registries. CARPHA's hub site says it became operational in 2015. The Minister of Health said in July 2025 that the national registry, established in 1994 and institutionalised in 1998, is aligned with IARC's standards, and the registry's 2025 report thanks IARC, CARPHA and the Inter-American Development Bank for technical and financial support.",
          links: [
            { label: "IARC Global Initiative for Cancer Registry Development: Caribbean hub", url: GICR_HUB },
            { label: "CARPHA: IARC Caribbean Cancer Registry Hub", url: CRH_HUB },
            { label: "Dr. Elizabeth Quamina Cancer Registry: Cancer in Trinidad and Tobago 2003-2020 (2025, PDF)", url: REGISTRY_REPORT },
          ],
        },
        {
          id: "ncd-plan",
          title: "Cancer inside a national plan for non-communicable diseases",
          plain:
            "Trinidad and Tobago's National Strategic Plan for the Prevention and Control of Non Communicable Diseases 2017 to 2021 covers heart disease, diabetes, cancer and stroke. It planned to review the National Cancer Plan and draw a two-year plan from it. OnCo found no later plan.",
          detail:
            "The 2017 to 2021 plan lists, under early detection and treatment of the major cancers (cervical, breast, prostate, colon and lung), a review of the HPV vaccine strategy, standard screening protocols, a review of the National Cancer Plan and a two-year implementation plan by the end of 2017. WHO's 2020 profile, from a 2019 survey, records both an integrated NCD plan and a national cancer plan as operational. In July 2025 the Minister of Health said the Ministry was integrating the National Comprehensive Cancer Network guidelines within the local context. The National Cancer Plan itself was not found online.",
          links: [
            { label: "Ministry of Health: National Strategic Plan for the Prevention and Control of NCDs 2017 to 2021 (PDF)", url: NCD_PLAN },
            { label: "WHO: cancer country profile, Trinidad and Tobago (2020, PDF)", url: WHO_2020 },
            { label: "Ministry of Health: the Minister's address (11 July 2025)", url: MINISTER_2025 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Trinidad and Tobago", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Trinidad and Tobago",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Trinidad and Tobago. OnCo holds a selection of trials, not the whole registry, so the search link beside this section is the place to look. The published research found is mostly analysis of the national registry's data.",
          detail:
            "An analysis of 15,029 cases reported to the registry between 2008 and 2018 found most women with breast cancer were diagnosed at a localised stage, while for lung and colon cancer the stage was most often distant or unknown, and for prostate cancer mostly unknown. A 2025 study tested stored breast cancer biopsy samples from the public system for the BRCA1 185delAG mutation: 34 of 67 samples could be genotyped and none carried it, and the authors conclude the stored tissue is of limited use for genetic testing and that the result does not rule the mutation out in the population.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Trinidad and Tobago", url: CTGOV },
            { label: "Gopaul et al., cancer morbidity and mortality trends 2008 to 2018 (J Health Popul Nutr 2023)", url: GOPAUL_2023 },
            { label: "Abrahim et al., BRCA1 185delAG in stored breast cancer biopsies (Rev Panam Salud Publica 2025)", url: ABRAHIM_2025 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "after-2020",
      title: "No registry counts after 2020, and no survival figures",
      plain:
        "The national registry's latest report stops at 2020. OnCo found no population-based survival figure for any cancer in Trinidad and Tobago in the sources read, and the stage at diagnosis is often recorded as unknown.",
      detail:
        "The 2025 report follows one for 2000 to 2002, so the gap between reports has been long. Because notification is not mandatory and officers visit most public and some private institutions, some cases diagnosed and treated privately or abroad may be missed; the report also registers some cases from a death certificate alone. The registry's office at the Eric Williams Medical Sciences Complex in Champs Fleurs is the place to ask for later data.",
      links: [
        { label: "Dr. Elizabeth Quamina Cancer Registry: Cancer in Trinidad and Tobago 2003-2020 (2025, PDF)", url: REGISTRY_REPORT },
        { label: "Ministry of Health: about the cancer registry", url: REGISTRY_PAGE },
      ],
    },
    {
      id: "medicines-list",
      title: "Which cancer medicines the public hospitals supply was not found",
      plain:
        "The Ministry says cancer treatment is free to citizens, but OnCo found no public list of the cancer medicines its hospitals stock. The free chronic disease medicines scheme does not cover cancer, and the list of registered drugs was not read.",
      detail:
        "The Chemistry, Food and Drugs Division's list of drugs registered from 1999 to 2025 is a download that OnCo did not open, and the Food and Drugs Act was not read from the government's law site, which returned a web page in place of the document. Whether a newer medicine is registered, stocked or has to be bought privately is a question for the treating oncology clinic or the hospital pharmacy. The Ministry's page for the assistance programme lists a hotline, 800-CDAP.",
      links: [
        { label: "Ministry of Health: Chemistry, Food and Drugs Division", url: CFDD },
        { label: "Ministry of Health: Chronic Disease Assistance Programme", url: CDAP },
      ],
    },
    {
      id: "oncology-centre-and-plan",
      title: "Whether the National Oncology Centre is open, and the current cancer plan",
      plain:
        "The newest official statement OnCo read on the National Oncology Centre is from July 2025 and says it was nearing completion. The NCD plan found ran to 2021, and the National Cancer Plan it refers to was not found.",
      detail:
        "UDeCOTT's project page carries no date and no opening. The International Cancer Control Partnership's country addresses tried for Trinidad and Tobago returned no page, so its list of plans was not read. Numbers of oncologists and radiotherapy waiting times were not found in a current primary source; WHO's 2020 profile carries workforce figures from 2019. Tobago has no radiotherapy centre in IAEA's directory, and how patients there are referred to Trinidad was not found.",
      links: [
        { label: "UDeCOTT: the National Oncology Centre", url: UDECOTT_NOC },
        { label: "Ministry of Health", url: MOH },
      ],
    },
  ],
  institutions: [
    "moh-trinidad-tobago", "quamina-cancer-registry-tt", "cancer-centre-trinidad-tobago", "southern-medical-services-tt", "medcorp-cancer-centre-tt",
    "iarc", "who", "iaea",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-warner-cancer-incidence-mortality-trinidad-tobago-bmccancer-2018", "paper-warner-prostate-cancer-trinidad-tobago-ccc-2018",
    "paper-gopaul-cancer-trends-trinidad-tobago-jhpn-2023",
  ],
  people: [],
  how:
    "Every card was written from Trinidad and Tobago's own sources and from international agencies, read in full as raw text, not through a summary: the Ministry of Health's pages on the cancer registry, cancer care, the Chronic Disease Assistance Programme and the Chemistry, Food and Drugs Division; the registry's report for 2003 to 2020; the Minister's address of 11 July 2025; the NCD plan for 2017 to 2021; UDeCOTT's project page; CARPHA's pages; WHO's 2020 and 2021 profiles and its vaccine and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the registry and three papers) carry their own sources.",
  verify:
    "The registry's counts stop at 2020 and IARC's 2024 figures are estimates built on them. Whether the National Oncology Centre is open, which medicines a hospital has in stock and how long the wait for radiotherapy is change faster than any report; ask the treating hospital or the Ministry of Health what applies to you.",
  verifyLinks: [
    { label: "Ministry of Health: cancer care and treatment", url: CANCER_CARE },
    { label: "Ministry of Health: about the cancer registry", url: REGISTRY_PAGE },
    { label: "Chemistry, Food and Drugs Division", url: CFDD },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Trinidad and Tobago (PDF)", url: IARC_FACTSHEET },
  ],
};
