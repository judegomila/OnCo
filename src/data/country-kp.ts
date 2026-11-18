import type { CountryDive } from "@/data/country-dive";

/**
 * North Korea (the Democratic People's Republic of Korea) deep dive: the hand-written cards for /countries/kp/ (wave 8).
 * This page is short on purpose. IARC publishes an estimate for the country, but almost nothing else about cancer there
 * could be verified from a primary source. Read raw on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet; WHO's public
 * immunisation and health expenditure data; Europe PMC; OnCo's ClinicalTrials.gov participation data and OpenAlex
 * counts. Nothing on this page comes from news reports, testimony or memory.
 *
 * Second accuracy pass, 17 November 2026: several absence statements were wrong. WHO's immunisation data hold HPV
 * rows for 2018 to 2025 (all blank) and record the vaccine as not introduced; WHO's Global Health Observatory holds
 * the country's answers about its cancer services (indicator codes beginning NCD_CCS); the IAEA's DIRAC feed lists
 * two centres in Pyongyang; Europe PMC holds two 2011 surveys about cervical screening done inside the country; and
 * ClinicalTrials.gov files one study location under North Korea, with Seoul as its city.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/408-korea-democratic-peoples-republic-of-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PRK'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'PRK'";
const WHO_COUNTRY = "https://www.who.int/countries/prk";
const CTGOV = "https://clinicaltrials.gov/search?country=Korea,%20Democratic%20People%27s%20Republic%20of";
const WHO_HPV_ALL = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PRK'%20and%20contains(ANTIGEN,'HPV')";
const WHO_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'PRK'";
const gho = (code: string) => `https://ghoapi.azureedge.net/api/${code}?$filter=SpatialDim%20eq%20'PRK'`;
const DIRAC = "https://dirac.iaea.org/";
const KAP_WOMEN = "https://europepmc.org/article/MED/22393985";
const KAP_STAFF = "https://europepmc.org/article/MED/22393984";
const CTGOV_STUDY = "https://clinicaltrials.gov/study/NCT03993873";

export const KP_DIVE: CountryDive = {
  iso2: "KP",
  iso3: "PRK",
  name: "North Korea",
  flag: "🇰🇵",
  asOf: "2026-11-11",
  title: "Cancer in North Korea",
  description:
    "Cancer in North Korea: IARC's modelled estimate of 70,520 new cancers and 51,108 deaths in 2024, with lung, liver and stomach cancer leading, and the little else a primary source records: no North Korean data source for incidence on IARC's fact sheet, the country's own answers to WHO about its cancer services, two cobalt-60 radiotherapy centres in the IAEA's directory, HPV vaccine not introduced according to WHO, no out-of-pocket figures in WHO's data, no trial site in OnCo's records, and three oncology papers in five years in OpenAlex.",
  lede:
    "IARC estimates 70,520 new cancers and 51,108 cancer deaths in North Korea in 2024, about seven deaths for every ten new cases, but builds the estimate from neighbouring countries' data; its fact sheet names no North Korean data source for incidence. Little else about cancer in North Korea could be checked against a primary source. WHO holds the country's own yes-or-no answers about its cancer services and the IAEA's directory lists two radiotherapy centres in Pyongyang; beyond that, this page names the gap rather than fill it.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for North Korea is 70,520 new cancers and 51,108 deaths, an age-standardised incidence of 171.5 per 100,000 (186.0 in men, 162.7 in women) and mortality of 120.2 (150.0 in men, 95.7 in women). IARC's fact sheet gives no country-specific data source for incidence and describes the method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data, and the fact sheet's data source field for mortality reads \"Survcan\". The totals include non-melanoma skin cancer. Every incidence and mortality figure for North Korea on this page is therefore a model, not a count.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What IARC's model shows",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "A modelled 70,000 new cancers a year, a quarter of them lung cancer",
          plain:
            "IARC estimates 70,520 new cancers in North Korea in 2024. Lung cancer is the commonest in both men and women and causes 29% of cancer deaths; liver and stomach cancer follow. These numbers are modelled from neighbouring countries, not counted in North Korea.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 16,904 lung cancers (14,650 deaths), 8,912 liver cancers (8,432 deaths), 7,061 stomach cancers (6,176 deaths), 6,947 colorectal cancers, 5,123 breast cancers and 4,114 thyroid cancers. In women the commonest are lung, breast and thyroid cancer. IARC's population figure for 2024 is 26,498,826. Deaths divided by new cases give 0.72, the highest ratio of the ten countries in this wave of OnCo's country pages.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "globocan-top",
          title: "The commonest cancers in IARC's 2024 model",
          caption: "Estimated new cases and deaths in 2024, both sexes, IARC GLOBOCAN 2024 (modelled from neighbouring countries)",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 70520, deaths: 51108 },
            { site: "Lung", cases: 16904, deaths: 14650 },
            { site: "Liver", cases: 8912, deaths: 8432 },
            { site: "Stomach", cases: 7061, deaths: 6176 },
            { site: "Colorectum", cases: 6947, deaths: 3806 },
            { site: "Breast", cases: 5123, deaths: 2388 },
            { site: "Thyroid", cases: 4114, deaths: 678 },
          ],
          note: "A model, not a count: IARC's fact sheet names no North Korean data source for incidence.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "no-data",
          title: "No health spending figures in WHO's database",
          plain:
            "WHO's Global Health Expenditure Database, which gives out-of-pocket spending for the other nine countries in this wave, returns no rows for North Korea. OnCo found no primary source on how cancer care is paid for there, and does not describe it.",
          detail:
            "OnCo queried WHO's public health expenditure data for the out-of-pocket share of current health expenditure for North Korea on 11 November 2026 and again on 17 November 2026 and received no rows both times; the same query returns rows for each of the other nine countries. Europe PMC holds no study that OnCo found of how cancer care is paid for inside North Korea. Multi-country Global Burden of Disease estimates and studies of North Korean defectors in South Korea exist, but OnCo did not use them. Accounts in the press or from people who have left the country were not used, because OnCo could not check them against a primary source.",
          links: [
            { label: "WHO Global Health Expenditure Database: North Korea (API; returns no rows)", url: WHO_GHED_API },
            { label: "WHO: Democratic People's Republic of Korea", url: WHO_COUNTRY },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Medicines",
      title: "Medicines, trials and research",
      cards: [
        {
          id: "medicines-research",
          title: "No regulator source, no trial site in OnCo's records, three papers in OpenAlex",
          plain:
            "OnCo found no primary source on how medicines are approved in North Korea. No cancer trial in OnCo's records lists a site there, and OpenAlex counts three oncology papers with a North Korea-based author in 2021 to 2025.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials (5,906 registrations when recounted on 17 November 2026), and none lists North Korea. ClinicalTrials.gov itself, searched on 17 November 2026, returns one study with a location filed under North Korea: NCT03993873, a company trial in solid tumours that OnCo does not hold. The city of that location is given as Seoul, beside three other Seoul sites filed under South Korea, so it is not evidence of a trial site in North Korea. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives North Korea 1 work in 2021 and 2 in 2025, 3 in total, none open access. OnCo's country file of 8 September 2026 holds no ClinicalTrials.gov study count for North Korea.",
          links: [
            { label: "ClinicalTrials.gov: studies with a site in North Korea (search)", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT03993873, the one study with a location filed under North Korea (city given as Seoul)", url: CTGOV_STUDY },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What is known",
      title: "What can and cannot be said",
      cards: [
        {
          id: "known",
          title: "What this page can say, and what it cannot",
          plain:
            "This page can say what IARC's model estimates for North Korea, what the country has told WHO about its cancer services, and what the IAEA's radiotherapy directory lists. It cannot say how many people are diagnosed, how they are treated, what care costs or how many survive, because OnCo found no measurement of any of these.",
          detail:
            "WHO's public immunisation data, queried on 17 November 2026, hold 44 HPV vaccination rows for North Korea for 2018 to 2025, administrative and official, for girls and boys, and every one is blank: none gives coverage, doses or a target population. A narrower query for programme coverage on 11 November 2026 returned no rows, and an earlier version of this page said from it that WHO held no HPV rows. WHO's vaccine introduction data record HPV vaccine as not introduced in North Korea in every year from 2006 to 2025. IARC's fact sheet names no North Korean data source for incidence. OnCo's rule is that a named gap is worth more than a plausible number. If a further authoritative source becomes available, from WHO, IARC or a peer-reviewed paper, it will be added.",
          links: [
            { label: "WHO immunisation data: all HPV rows, North Korea, 2018 to 2025 (API; every row blank)", url: WHO_HPV_ALL },
            { label: "WHO immunisation data: HPV programme coverage, North Korea (API; returns no rows)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccine introduction rows, North Korea (API)", url: WHO_INTRO },
            { label: "IARC: GLOBOCAN 2024 fact sheet, North Korea, data source and methods (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "who-answers",
          title: "What North Korea has told WHO about its cancer services",
          plain:
            "WHO's Global Health Observatory holds the country's own yes-or-no answers about cancer services. For 2021 the answers are yes to a cancer plan, a national cervical screening programme and radiotherapy in the public sector, and no to a population-based cancer registry. OnCo has no way to check these answers.",
          detail:
            "Read from WHO's data API on 17 November 2026 (indicator codes beginning NCD_CCS; notes on some rows read \"Country responded Don't know\"). For 2021: an operational cancer policy, strategy or plan, yes (also yes in 2013, 2015, 2017 and 2019); a population-based cancer registry, no (also no in 2013, 2015, 2017 and 2019); cancer centres or departments at tertiary level, cancer surgery, radiotherapy and pathology services generally available in the public sector, yes to each; national guidelines for the management of cancer, no; oral morphine generally available in the public sector, yes (no in 2013, don't know in 2015, 2017 and 2019). A national cervical cancer screening programme: yes in 2015, 2017, 2019 and 2021, described in 2015, 2017 and 2019 as organised and population-based, with visual inspection as the method in every year and coverage of \"70 or more\" per cent given for 2015 and 2019 and no response for 2017. A national breast cancer screening programme: yes in 2015, 2017 and 2019, no in 2021. A national HPV vaccination programme: don't know in 2015 and 2017, no in 2019. The same database holds two estimates whose rows name no data source and whose methods OnCo has not read: 51% of women aged 30 to 49 ever screened for cervical cancer in 2022 (the row's range is 38 to 66), and five-year net survival from breast cancer of 66.9% for 2017 to 2021 (the row's range is 46.9 to 81.3). Europe PMC holds two surveys done inside the country and published in 2011, each of a chosen, not random, sample of 200 people in six provinces: 6% of the women interviewed had ever had a cervical smear, and 4% of rural and 21% of urban health workers provided cytology.",
          links: [
            { label: "WHO Global Health Observatory: operational cancer plan, North Korea (API)", url: gho("NCD_CCS_CancerPlan") },
            { label: "WHO Global Health Observatory: population-based cancer registry, North Korea, 2021 (API)", url: gho("NCD_CCS_PBCR") },
            { label: "WHO Global Health Observatory: population-based cancer registry, North Korea, 2013 to 2019 (API)", url: gho("NCD_CCS_CancerRegNational") },
            { label: "WHO Global Health Observatory: radiotherapy in the public sector, North Korea (API)", url: gho("NCD_CCS_radio") },
            { label: "WHO Global Health Observatory: cancer centres at tertiary level, North Korea (API)", url: gho("NCD_CCS_CANCER_DEPT") },
            { label: "WHO Global Health Observatory: cancer surgery in the public sector, North Korea (API)", url: gho("NCD_CCS_cancer_surgery") },
            { label: "WHO Global Health Observatory: pathology services in the public sector, North Korea (API)", url: gho("NCD_CCS_path_lab") },
            { label: "WHO Global Health Observatory: national cancer management guidelines, North Korea (API)", url: gho("NCD_CCS_CANCER_GUIDE") },
            { label: "WHO Global Health Observatory: oral morphine in the public sector, North Korea (API)", url: gho("NCD_CCS_OralMorph") },
            { label: "WHO Global Health Observatory: national cervical cancer screening programme, North Korea (API)", url: gho("NCD_CCS_cervicalcancerscreening") },
            { label: "WHO Global Health Observatory: type of cervical screening programme, North Korea (API)", url: gho("NCD_CCS_cervicalcancerpgmtype") },
            { label: "WHO Global Health Observatory: cervical screening method, North Korea (API)", url: gho("NCD_CCS_cervicalcancermethod") },
            { label: "WHO Global Health Observatory: cervical screening programme coverage, North Korea (API)", url: gho("NCD_CCS_cervicalcancerpgmcvg") },
            { label: "WHO Global Health Observatory: national breast cancer screening programme, North Korea (API)", url: gho("NCD_CCS_breastcancerscreening") },
            { label: "WHO Global Health Observatory: national HPV vaccination programme, North Korea (API)", url: gho("NCD_CCS_hpv") },
            { label: "WHO Global Health Observatory: cervical cancer screening prevalence estimate, North Korea (API)", url: gho("NCD_CXCA_SCREENED_WITHIN_TIMEPERIOD") },
            { label: "WHO Global Health Observatory: breast cancer five-year net survival estimate, North Korea (API)", url: gho("CANCERSURVIVAL_BREASTCANCER") },
            { label: "Tran and colleagues, 2011: cervical cancer and screening survey of women in six provinces (Europe PMC)", url: KAP_WOMEN },
            { label: "Tran and colleagues, 2011: cervical cancer and screening survey of female health workers (Europe PMC)", url: KAP_STAFF },
          ],
        },
        {
          id: "radiotherapy",
          title: "Two radiotherapy centres in the IAEA's directory, both in Pyongyang",
          plain:
            "The IAEA's directory of radiotherapy centres lists two centres in North Korea, both in Pyongyang, each with one cobalt-60 machine and no linear accelerator. Both entries are dated 2016, so the list may be out of date.",
          detail:
            "The public data feed of the IAEA's DIRAC directory, read on 17 November 2026, lists the Korean Academy of Medical Science (Institute of Radiation Medicine) and the Red Cross General Hospital, both in Pyongyang. Each entry shows one cobalt-60 unit, no linear accelerator and no brachytherapy, and each is dated 2016. The directory's country row counts three centres, two of them with radiotherapy; the feed does not name the third. Entries are reported by the centres themselves and OnCo cannot confirm that either machine is in use. An earlier version of this page said the directory had not been read.",
          links: [{ label: "IAEA: DIRAC, Directory of Radiotherapy Centres", url: DIRAC }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "everything-else",
      title: "Registry, services, workforce, medicines, screening and survival",
      plain:
        "OnCo found no measured figure for cancer registration, the oncology workforce, medicines, payment or survival in North Korea, and nothing on how cancer services, radiotherapy or screening work in practice beyond the country's own answers to WHO and two entries in the IAEA's directory. Each of these is a gap, not a zero.",
      detail:
        "Sources tried on 11 November 2026 and read again on 17 November 2026: IARC's fact sheet (no national data source named for incidence), WHO's health expenditure data (no rows), WHO's immunisation data (HPV rows for 2018 to 2025, all blank), Europe PMC (a search for North Korea and a cancer term in the title returned three papers: two 2011 surveys about cervical cancer screening and a 2025 paper on medicinal plants), OnCo's trial participation data (no site) and OpenAlex (three oncology works in five years). An earlier version of this page said that no primary source existed for registration, services, radiotherapy, screening or vaccination and that WHO's country page and the IAEA's DIRAC directory had not been read. WHO's Global Health Observatory and DIRAC do hold rows, set out in the cards above. The raw text of WHO's country page, read on 17 November 2026, does not mention cancer.",
      links: [
        { label: "IAEA: DIRAC, Directory of Radiotherapy Centres", url: DIRAC },
        { label: "WHO immunisation data: all HPV rows, North Korea, 2018 to 2025 (API; every row blank)", url: WHO_HPV_ALL },
        { label: "WHO: Democratic People's Republic of Korea", url: WHO_COUNTRY },
        { label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: ["iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "This page uses only IARC's GLOBOCAN 2024 fact sheet, WHO's public data APIs, the IAEA's DIRAC directory, Europe PMC, ClinicalTrials.gov, OnCo's ClinicalTrials.gov participation data and OpenAlex, each read as raw text or data. It uses no news reports, testimony or memory.",
  verify:
    "Every count of cancers and deaths on this page is IARC's model. Do not read it as a measurement of cancer in North Korea. The answers recorded by WHO are the country's own and the IAEA's entries date from 2016; OnCo could not check either.",
  verifyLinks: [{ label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET }],
};
