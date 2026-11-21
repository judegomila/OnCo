import type { CountryDive } from "@/data/country-dive";

/**
 * Jamaica deep dive: the hand-written cards for /countries/jm/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Jamaica (PDF text),
 * the Ministry of Health's Strategic Plan and Action Plan for the Prevention and Control of Cancer in Jamaica 2013 to
 * 2018 (the copy in WHO's NCD document repository, PDF text), the National Health Fund's own pages on the NHFCard, the
 * conditions it covers and the tests it subsidises, the Food and Drugs Regulations, 1975 (a consolidated copy, PDF
 * text), a Loop News report of May 2023 on the Standards and Regulation Division, as republished on the Ministry of
 * Industry, Investment and Commerce's site, the Jamaica Information
 * Service report of October 2023 on the cancer registration project, the University of the West Indies' Department of
 * Pathology page, CARPHA's pages on the Caribbean Regulatory System and the Caribbean Cancer Registry Hub, WHO's 2020
 * cancer profile and 2021 cervical cancer profile (PDF text), WHO's HPV coverage, vaccine introduction and health
 * expenditure rows from its public data APIs, IAEA DIRAC's public equipment data, the ClinicalTrials.gov record of
 * NCT07528768, a Gleaner report of 10 April 2023, and the papers' abstracts through Europe PMC.
 *
 * The Ministry of Health and Wellness's own site (moh.gov.jm, ncdip.moh.gov.jm) answered every request with a browser
 * challenge (HTTP 403), so nothing on this page is taken from it; that is named under `gaps`.
 *
 * Second check, 16 November 2026: every source was fetched again as raw text. The National Health Fund's site
 * (nhf.org.jm) returned HTTP 520 to every request, so the Fund's figures could not be re-read and the cards that use
 * them say so. The rest was re-read and several wordings were tightened to what the sources say.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/388-jamaica-fact-sheet.pdf";
const CANCER_PLAN = "https://extranet.who.int/ncdccs/Data/JAM_B5_NATIONAL%20CANCER%20STRATEGIC%20AND%20ACTION%20PLAN%20JAMAICA%20%20(2).pdf";
const ICCP_PLAN = "https://www.iccp-portal.org/plans/strategic-plan-and-action-plan-prevention-and-control-cancer-jamaica-2013-2018";
const UWI_PATHOLOGY = "https://www.mona.uwi.edu/pathology/jamaica-cancer-registry";
const GIBSON_2010 = "https://europepmc.org/article/MED/21473389";
const REID_2020 = "https://doi.org/10.1200/GO.20.00022";
const MORRISON_2016 = "https://doi.org/10.1155/2016/2606805";
const JIS_REGISTRY = "https://jis.gov.jm/cancer-registration-data-systems-being-strengthened/";
const NHF_CARD = "https://www.nhf.org.jm/nhf-card/";
const NHF_CONDITIONS = "https://www.nhf.org.jm/conditions-covered/";
const NHF_TESTS = "https://www.nhf.org.jm/screening-diagnostics-covered/";
const NHF_ABOUT = "https://www.nhf.org.jm/about-the-national-health-fund/";
const FD_REGS = "https://globalfoodlaws.georgetown.edu/wp-content/uploads/2022/08/Jamaica_1975.08.04_Food-and-Drugs-Act-Regulations_EN.pdf";
const MIIC_SRD = "https://www.miic.gov.jm/health-ministrys-standards-regulation-division-now-iso-certified/";
const MOHW = "https://www.moh.gov.jm/";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/FAQ";
const CRH_HUB = "https://caribbeancrh.carpha.org/";
const WHO_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/jam-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-jam-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'JAM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'JAM'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'JAM'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'JAM'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'JAM'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const GLEANER_LINAC = "https://past.jamaica-gleaner.com/article/news/20230410/faulty-linear-accelerator-hampers-cancer-treatment-cornwall-regional-hospital";
const HEADWATERS = "https://clinicaltrials.gov/study/NCT07528768";
const CTGOV = "https://clinicaltrials.gov/search?country=Jamaica&cond=cancer";

export const JM_DIVE: CountryDive = {
  iso2: "JM",
  iso3: "JAM",
  name: "Jamaica",
  flag: "🇯🇲",
  asOf: "2026-11-16",
  title: "Cancer in Jamaica",
  description:
    "Cancer in Jamaica from its own and international sources: IARC's estimate of 7,552 new cancers and 4,408 deaths in 2024, modelled from deaths, with no national incidence data listed by IARC, a registry at the University of the West Indies that has counted cancer in Kingston and St Andrew for decades, the National Health Fund card that subsidises medicines for seven cancers, four radiotherapy centres in IAEA's directory, and HPV vaccination since 2017.",
  lede:
    "Jamaica's cancer registry, at the University of the West Indies, has published incidence for decades, but it covers Kingston and St Andrew, about a quarter of the population, so the national figures are a model: IARC estimates 7,552 new cancers and 4,408 deaths in 2024, with prostate and breast cancer the commonest. The National Health Fund's card subsidises medicines for seven cancers, and IAEA's directory lists four radiotherapy centres, three of them in Kingston.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Jamaica is 7,552 new cancers and 4,408 deaths, an age-standardised incidence of 222.3 per 100,000 (238.5 in men, 213.2 in women) and mortality of 130.6. The fact sheet gives the country-specific incidence data source as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\", so new cases are modelled from deaths, not counted. For mortality the source is \"WHO (national)\" and the method \"Trends in national rates projected to 2024\". The Jamaica Cancer Registry's own counts cover Kingston and St Andrew only, and the 2013 cancer plan said no national data on incidence or outcome were available. IARC counts 69 non-melanoma skin cancers among the 7,552 (7,483 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Jamaica",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Jamaica (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 7,500 new cancers a year, with prostate and breast cancer the commonest",
          plain:
            "IARC estimates 7,552 new cancers in Jamaica in 2024, 3,622 in men and 3,930 in women, and 4,408 cancer deaths. Prostate cancer is the commonest overall and breast cancer second; together they are more than a third of all cases. These are modelled estimates, not counts.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,394 prostate cancers (809 deaths), 1,310 breast cancers (695 deaths), 892 colorectal cancers (446 deaths), 443 lung cancers (383 deaths) and 438 cervical cancers (237 deaths). In men the leading cancers are prostate (1,394, 38.5%), colorectum (477) and lung (294); in women, breast (1,310, 33.3%), cervix (438, 11.1%) and colorectum (415). The risk of developing cancer before 75 is 21.8% and of dying of it 11.9%. An analysis of deaths registered by the Registrar General's Department found 1,634 breast cancer deaths in women from 2010 to 2014, 24% of all female cancer deaths, with the age-standardised rate rising from 21.8 to 28 per 100,000; the difference between the first and last year was not statistically significant on its own, but the year-by-year trend was.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Jamaica (PDF)", url: IARC_FACTSHEET },
            { label: "Reid et al., breast cancer mortality in Jamaica 2010 to 2014 (JCO Glob Oncol 2020)", url: REID_2020 },
          ],
        },
        {
          id: "registry",
          title: "A registry at the university that counts Kingston and St Andrew, not the whole island",
          plain:
            "The Jamaica Cancer Registry sits in the Department of Pathology at the University of the West Indies, Mona. It has published cancer incidence for Kingston and St Andrew in five-year reports. The 2013 cancer plan said those two parishes hold 24% of the population and that no national incidence data existed.",
          detail:
            "The latest five-year report OnCo found in Europe PMC covers 2003 to 2007: 4,981 cancers, 2,536 in males and 2,445 in females, with age-standardised rates of 188.8 per 100,000 in males and 144.2 in females, almost unchanged from 1998 to 2002. The leading sites were prostate, bronchus and large bowel in males, and breast, cervix and large bowel in females. The Ministry's 2013 plan listed establishing a national cancer registry, and making cancer a reportable disease, among its activities. In October 2023 the Jamaica Information Service reported a project with CARPHA and Vital Strategies to collect cancer registration data across the Regional Health Authorities through an oncology module of the DHIS2 system, replacing paper. WHO's 2021 cervical cancer profile records that a population-based cancer registry exists.",
          links: [
            { label: "UWI Mona: Department of Pathology, including the Jamaica Cancer Registry", url: UWI_PATHOLOGY },
            { label: "Gibson et al., cancer incidence in Kingston and St Andrew 2003 to 2007 (West Indian Med J 2010)", url: GIBSON_2010 },
            { label: "Ministry of Health: Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018 (PDF)", url: CANCER_PLAN },
            { label: "Jamaica Information Service: cancer registration data systems being strengthened (October 2023)", url: JIS_REGISTRY },
          ],
        },
      ],
      tables: [
        {
          id: "jm-top",
          title: "IARC's leading cancers for Jamaica, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 1394, deaths: 809 },
            { site: "Breast", cases: 1310, deaths: 695 },
            { site: "Colorectum", cases: 892, deaths: 446 },
            { site: "Lung", cases: 443, deaths: 383 },
            { site: "Cervix uteri", cases: 438, deaths: 237 },
            { site: "Non-Hodgkin lymphoma", cases: 324, deaths: 141 },
            { site: "Corpus uteri", cases: 312, deaths: 113 },
            { site: "Stomach", cases: 290, deaths: 212 },
            { site: "All cancers", cases: 7552, deaths: 4408 },
          ],
          note: "IARC lists no national incidence data for Jamaica: new cases are modelled from national mortality estimates and mortality-to-incidence ratios, so this is the table a national registry would replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Jamaica (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "jm-ksa",
          title: "The Jamaica Cancer Registry's rates for Kingston and St Andrew, 2003 to 2007",
          caption: "Age-standardised incidence per 100,000 a year, from the registry's five-year report. Two parishes, not the whole country, and two decades old.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "males", label: "Males", numeric: true },
            { key: "females", label: "Females", numeric: true },
          ],
          rows: [
            { site: "All cancers", males: 188.8, females: 144.2 },
            { site: "Prostate", males: 78.1, females: null },
            { site: "Breast", males: null, females: 43 },
            { site: "Bronchus (lung)", males: 18.6, females: null },
            { site: "Colorectum", males: 17.2, females: 12.8 },
            { site: "Cervix uteri", males: null, females: 17.4 },
          ],
          note: "The registry recorded 4,981 cancers in the five years, 2,536 in males and 2,445 in females. An empty cell means the abstract gives no rate for that sex.",
          sources: [{ label: "Gibson et al., cancer incidence in Kingston and St Andrew 2003 to 2007 (West Indian Med J 2010)", url: GIBSON_2010 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "National Health Fund: conditions covered by the NHFCard", url: NHF_CONDITIONS },
      cards: [
        {
          id: "nhf-card",
          title: "The National Health Fund card subsidises medicines for seven cancers",
          plain:
            "The National Health Fund's NHFCard helps Jamaican residents of any age pay for medicines for 28 chronic illnesses. Seven are cancers: bladder, breast, cervical, colorectal, lung and prostate cancer, and multiple myeloma. The Fund pays a fixed amount on each item and the patient pays the difference.",
          detail:
            "The Fund is a statutory body set up in 2003 by the National Health Fund Act, with a board appointed by the Minister of Health and Wellness. Its card also pays part of some tests, in Jamaican dollars: $3,000 off a mammogram once a year, $1,300 off a Pap smear once every three years, $1,920 off each prostate specific antigen (PSA) test and $12,500 off each breast cancer receptor study. A doctor certifies the application and the card is issued at an NHFCard centre. The Fund's list names conditions, not medicines: which cancer drugs carry a subsidy, and how much, is in its benefits search tool, which OnCo did not read. The Fund's site answered every request with an error (HTTP 520) when these pages were checked again later on 16 November 2026, so what this card takes from them was not re-verified then.",
          links: [
            { label: "National Health Fund: conditions covered by the NHFCard", url: NHF_CONDITIONS },
            { label: "National Health Fund: screening and diagnostics covered", url: NHF_TESTS },
            { label: "National Health Fund: the NHFCard programme", url: NHF_CARD },
            { label: "National Health Fund: about the Fund", url: NHF_ABOUT },
          ],
        },
        {
          id: "spending",
          title: "About a fifth of health spending is paid out of pocket",
          plain:
            "WHO puts out-of-pocket payment at 20.2% of Jamaica's health spending in 2023, with 64.3% coming from government. Health spending was about US$520 a person. A doctor at a public hospital told The Gleaner in 2023 that radiotherapy there is free to the patient.",
          detail:
            "WHO's Global Health Expenditure Database gives, for 2023, current health spending of US$520 a person, 64.3% of it from domestic government sources, 20.2% paid out of pocket and 2.6% from external sources; the out-of-pocket share was 24.4% in 2020. In The Gleaner's report of 10 April 2023 a doctor at Cornwall Regional Hospital said private facilities would charge up to $4 million for the treatment the hospital offers for free; the report names no currency and reads as Jamaican dollars. The 2013 cancer plan named the National Health Fund and the Culture, Health, Arts, Sports and Education (CHASE) Fund as possible local funders of its projects. OnCo could not read the Ministry's own statement of what public hospitals charge.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Jamaica (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "The Gleaner: faulty linear accelerator hampers cancer treatment at Cornwall Regional Hospital (10 April 2023)", url: GLEANER_LINAC },
            { label: "Ministry of Health: Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018 (PDF)", url: CANCER_PLAN },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "The Food and Drugs Regulations, 1975 (consolidated copy, PDF)", url: FD_REGS },
      cards: [
        {
          id: "food-and-drugs",
          title: "Medicines are registered with the Ministry of Health under the Food and Drugs Act",
          plain:
            "Jamaica's Food and Drugs Regulations say a drug may not be sold, made, imported or distributed unless it has been registered with the Ministry of Health. A new drug needs a licence from the Minister. A 2023 news report describes product registration as a process of the Ministry's Standards and Regulation Division.",
          detail:
            "Regulation 40 of the Food and Drugs Regulations, 1975, made under section 21 of the Food and Drugs Act, requires registration with the Ministry of Health, and lets the Minister exempt a person or a drug. Regulation 65 requires a licence to import, sell or manufacture a new drug, and the application must include a certificate from the competent authority in the country of manufacture or export that the drug is approved for use there; the Minister may accept detailed safety test reports instead. The pages read are marked as authorised in 1995, so later amendments may not be reflected. A Loop News report of May 2023, republished on the Ministry of Industry, Investment and Commerce's site, says the Division had earned ISO 9001 certification for its product registration, import permit and health facilities registration processes, and quotes the Minister of State naming the Pharmaceutical and Regulatory Affairs Branch as where the public applies for them.",
          links: [
            { label: "The Food and Drugs Regulations, 1975, regulations 40 and 64 to 69 (consolidated copy, PDF)", url: FD_REGS },
            { label: "Loop News report on the Ministry of Industry, Investment and Commerce's site: Standards and Regulation Division now ISO certified (May 2023)", url: MIIC_SRD },
          ],
        },
        {
          id: "caribbean-regulatory-system",
          title: "A regional review at CARPHA can recommend a medicine to CARICOM states",
          plain:
            "The Caribbean Regulatory System is a unit of the Caribbean Public Health Agency (CARPHA) that reviews medicines already approved by a reference regulator and recommends them to CARICOM member states. Each country still decides for itself. OnCo did not find how often Jamaica acts on these recommendations.",
          detail:
            "CARPHA says CARICOM health ministers agreed in 2016 to create the system to support member states with marketing authorisation and pharmacovigilance. It accepts products authorised by the eight regulators that the Pan American Health Organization has designated as regional reference authorities, or prequalified by WHO, and, for non-biologic medicines, by a longer list that includes the European Medicines Agency, the United Kingdom's MHRA, Australia's TGA, Swissmedic and Japan's regulator; products should generally be on WHO's essential medicines list or the PAHO Strategic Fund list. Its page says it uses the word registration but that only a sovereign country can authorise products for sale in its market, and that the goal is to turn a recommendation into a national authorisation within 60 calendar days; elsewhere the same page gives a target of 120 calendar days from recommendation to authorisation in a country. A recommendation lasts five years.",
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
      aside: { label: "WHO: cervical cancer country profile, Jamaica (2021, PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening by Pap smear, for women aged 20 to 64",
          plain:
            "WHO's 2021 profile records a national cervical screening programme in Jamaica that uses cytology (the Pap smear) for women aged 20 to 64. It estimates that 7 in 10 women aged 30 to 49 had been screened in the previous five years.",
          detail:
            "The WHO cervical cancer profile gives 71% of women aged 30 to 49 screened in the last five years and 85% ever screened, as 2019 estimates, and an age-standardised incidence of 21.6 per 100,000 women in 2020. The Ministry's 2013 plan said it had run an active cervical screening programme for several years, with coverage gaps and inefficiencies, and linked it to a fall in cervical cancer incidence in Kingston and St Andrew from 25.2 per 100,000 in 1993 to 1997 to 17.4 in 2003 to 2007. WHO's 2020 cancer profile answered \"no\" for a cervical screening programme in 2019; the two WHO documents disagree, and the 2021 one is the later.",
          links: [
            { label: "WHO: cervical cancer country profile, Jamaica (2021, PDF)", url: WHO_CX_2021 },
            { label: "Ministry of Health: Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018 (PDF)", url: CANCER_PLAN },
            { label: "WHO: cancer country profile, Jamaica (2020, PDF)", url: WHO_2020 },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination since 2017, reaching 30% of girls in 2025",
          plain:
            "Jamaica introduced the HPV vaccine nationwide in 2017. WHO's coverage rows show first-dose coverage in girls of 23% in 2017, a fall to 1% in 2021, and 30% in 2025. Boys appear in the rows from 2023, at 19% in 2025.",
          detail:
            "WHO's vaccine introduction rows record HPV as introduced nationwide in 2017, and its 2021 profile gives the primary target cohort as ages 11 to 12 and reports coverage among girls. First-dose programme coverage in girls was 23% in 2017, 24% in 2018, 23% in 2019, 9% in 2020, 1% in 2021, 4% in 2022 and 2023, 7% in 2024 and 30% in 2025 (5,512 doses against a target of 18,454). For boys the rows give 4% in 2023, 7% in 2024 and 19% in 2025. WHO's elimination target is 90% of girls fully vaccinated by the age of 15.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Jamaica (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Jamaica (API)", url: WHO_INTRO_API },
            { label: "WHO: cervical cancer country profile, Jamaica (2021, PDF)", url: WHO_CX_2021 },
          ],
        },
        {
          id: "breast-and-prostate",
          title: "No organised breast screening programme in WHO's record, and subsidised tests instead",
          plain:
            "WHO's 2020 profile records no breast cancer screening programme in Jamaica. What exists is help with the cost: the National Health Fund card takes a fixed sum off a mammogram once a year and off each PSA test. Prostate screening has been offered at the Jamaica Cancer Society's clinic.",
          detail:
            "The 2013 plan said programmes for breast screening with mammography could likely reduce breast cancer as cervical screening had reduced cervical cancer, noted that government facilities had no mammography units, and proposed placing them in the four regional hospitals. The authors of the 2020 breast cancer mortality paper called for a national organised breast screening programme. A review of all men screened at the Jamaica Cancer Society from 1995 to 2005 counted 1,117 men of mean age 59.9: most came once, biopsies were requested at 11% of visits but only 59% of those were done, and 5.6% of the men screened were found to have cancer. The National Health Fund's site returned an error (HTTP 520) when its page on tests was checked again later on 16 November 2026, so the sums it takes off a mammogram and a PSA test were not re-verified then.",
          links: [
            { label: "WHO: cancer country profile, Jamaica (2020, PDF)", url: WHO_2020 },
            { label: "National Health Fund: screening and diagnostics covered", url: NHF_TESTS },
            { label: "Morrison et al., prostate cancer screening at the Jamaica Cancer Society (J Cancer Epidemiol 2016)", url: MORRISON_2016 },
            { label: "Reid et al., breast cancer mortality in Jamaica 2010 to 2014 (JCO Glob Oncol 2020)", url: REID_2020 },
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
          title: "Four radiotherapy centres in IAEA's directory, three in Kingston and one in Montego Bay",
          plain:
            "IAEA's radiotherapy directory lists four centres in Jamaica: Kingston Public Hospital, St. Joseph's Hospital and the Radiation Oncology Centre of Jamaica in Kingston, and Cornwall Regional Hospital in Montego Bay. Between them it counts three linear accelerators and two cobalt-60 machines.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, lists Kingston Public Hospital with one cobalt-60 unit and manual brachytherapy (entry last updated 2020); Cornwall Regional Hospital with one linear accelerator and one cobalt-60 unit (2025); the Radiation Oncology Centre of Jamaica with one linear accelerator and brachytherapy (2025); and St. Joseph's Hospital with one linear accelerator (2025). The 2013 plan called cobalt-60 treatment outdated and proposed linear accelerators for Kingston Public and Cornwall Regional. In April 2023 The Gleaner reported that the machines at Cornwall Regional, whose centre opened in 2017, and at St. Joseph's were the two in the public sector, that staff said the Cornwall machine had not worked since January, and that the Minister said both were treating patients with interruptions.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "Ministry of Health: Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018 (PDF)", url: CANCER_PLAN },
            { label: "The Gleaner: faulty linear accelerator hampers cancer treatment at Cornwall Regional Hospital (10 April 2023)", url: GLEANER_LINAC },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Jamaica is doing",
      cards: [
        {
          id: "cancer-plan",
          title: "A cancer plan for 2013 to 2018, and no later one that OnCo could read",
          plain:
            "The Ministry of Health wrote a Strategic Plan and Action Plan for the Prevention and Control of Cancer for 2013 to 2018. It is the plan the International Cancer Control Partnership lists for Jamaica. WHO's 2020 profile recorded that no national cancer plan was in effect in 2019.",
          detail:
            "The plan's six objectives run from prevention to palliative care and surveillance, and include establishing a national cancer registry, upgrading radiotherapy with linear accelerators, access to oral morphine and other palliative medicines, and making the Hope Institute a reference centre for training in palliative care. The copy in WHO's NCD document repository still carries a placeholder for its executive summary, so it may be a late draft and not the final text. WHO's 2020 profile answered \"not in effect\" for both an integrated NCD plan and a cancer plan in 2019. Whether a successor has been adopted could not be checked on the Ministry's site.",
          links: [
            { label: "Ministry of Health: Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018 (PDF)", url: CANCER_PLAN },
            { label: "ICCP Portal: Jamaica's cancer plan 2013 to 2018", url: ICCP_PLAN },
            { label: "WHO: cancer country profile, Jamaica (2020, PDF)", url: WHO_2020 },
          ],
        },
        {
          id: "registry-digital",
          title: "Moving cancer registration from paper to a national digital module",
          plain:
            "In October 2023 the Ministry of Health and Wellness, CARPHA and Vital Strategies launched a project to register cancers across the island's Regional Health Authorities with an oncology module of the DHIS2 health information system. CARPHA said Jamaica would be the second country to pilot the module.",
          detail:
            "The Jamaica Information Service reported on 25 October 2023 the launch, a day earlier, of a project titled 'Using District Health Information System 2 (DHIS2) to strengthen cancer registration data systems in low-resourced countries: from Rwanda to Jamaica'. CARPHA's executive director said installations at health facilities would replace the paper method then in use, and a steering committee was set up. The IARC Caribbean Cancer Registry Hub, which supports registries across the Caribbean basin, is based at CARPHA in Port of Spain and became operational in 2015. OnCo found no national incidence report from the new system.",
          links: [
            { label: "Jamaica Information Service: cancer registration data systems being strengthened (October 2023)", url: JIS_REGISTRY },
            { label: "CARPHA: IARC Caribbean Cancer Registry Hub", url: CRH_HUB },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Jamaica", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "One trial in OnCo's records has a site in Jamaica, and it has not started",
          plain:
            "HEADWATERS is a planned phase 2 trial comparing gemcitabine with paclitaxel in women of African ancestry with metastatic triple-negative breast cancer. The University of the West Indies sponsors it, with sites at Mona in Jamaica, in Barbados and in Ghana. It is not yet recruiting.",
          detail:
            "The ClinicalTrials.gov record for NCT07528768, last updated in September 2026, gives an estimated enrolment of 750, an estimated start in June 2027 and primary completion in June 2034, and lists The University of the West Indies, Mona, the Queen Elizabeth Hospital in Bridgetown and Korle Bu Teaching Hospital in Accra; the comparison arm is paclitaxel weekly or docetaxel every 21 days. OnCo holds a selection of trials, not the whole registry, so the search link beside this section is the place to look for others. The published papers found for this page are the Jamaica Cancer Registry's incidence reports and studies of breast cancer mortality and prostate screening.",
          links: [
            { label: "ClinicalTrials.gov: NCT07528768 (HEADWATERS)", url: HEADWATERS },
            { label: "ClinicalTrials.gov: cancer studies with a site in Jamaica", url: CTGOV },
            { label: "OnCo: triple-negative breast cancer", url: "/cancers/tnbc/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "ministry-site",
      title: "The Ministry of Health and Wellness's own pages could not be read",
      plain:
        "Every request to the Ministry's website and its NCD site was answered with a browser check that a script cannot pass, so OnCo read none of its pages. That includes its account of the National Cancer Registry, its current NCD and cancer plans and its medicine registration guidelines.",
      detail:
        "The addresses tried on 16 November 2026 were the Standards and Regulation Division's pages on moh.gov.jm, a page titled as the launch of a national cancer registry, and the strategic planning pages on ncdip.moh.gov.jm; each returned HTTP 403. The Ministry of Justice's copy of the Food and Drugs Act returned an error, so the Act itself was not read, only its Regulations in an older consolidation. What this page says about the Ministry comes from the 2013 plan held by WHO, the Jamaica Information Service and a news report republished by another ministry. A reader in Jamaica can open the Ministry's site in a browser.",
      links: [
        { label: "Ministry of Health and Wellness", url: MOHW },
        { label: "ICCP Portal: Jamaica's cancer plan 2013 to 2018", url: ICCP_PLAN },
      ],
    },
    {
      id: "national-incidence",
      title: "No national count of new cancers, and no survival figures",
      plain:
        "OnCo found no published national cancer incidence for Jamaica. The registry's published reports cover Kingston and St Andrew, and the latest one found is for 2003 to 2007. No population-based survival figure for any cancer was found.",
      detail:
        "IARC's fact sheet lists \"No data\" as its incidence source for Jamaica and models new cases from deaths. The Europe PMC search for the registry's reports returned five-year reports up to 2003 to 2007 and site-specific papers to 2007; a later report may exist in print or on a page that was not reachable. The Department of Pathology at the University of the West Indies, Mona, which houses the registry, gives its telephone numbers on its page and is the place to ask for later figures.",
      links: [
        { label: "UWI Mona: Department of Pathology, including the Jamaica Cancer Registry", url: UWI_PATHOLOGY },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Jamaica (PDF)", url: IARC_FACTSHEET },
      ],
    },
    {
      id: "medicines-and-machines",
      title: "Which cancer medicines are subsidised, and whether each radiotherapy machine is running",
      plain:
        "The National Health Fund lists the cancers its card covers but OnCo did not read which medicines carry a subsidy or how much. The newest account of the public radiotherapy machines that OnCo read is a newspaper report from April 2023.",
      detail:
        "The Fund's benefits search is an interactive tool and was not read, and the Fund's whole site returned an error (HTTP 520) when checked again later on 16 November 2026, so its list of conditions and its test subsidies were not re-verified then; a pharmacist at a participating pharmacy or the Fund itself can say what a given prescription will cost with the card. IAEA's directory entries for three of the four centres were updated in 2025 and for Kingston Public Hospital in 2020; the directory records equipment, not whether it is in service on a given day. Numbers of oncologists, waiting times for radiotherapy and the supply of morphine were not found in a current primary source. The treating hospital is the one to ask about its own machine.",
      links: [
        { label: "National Health Fund: the NHFCard programme", url: NHF_CARD },
        { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      ],
    },
  ],
  institutions: [
    "mohw-jamaica", "nhf-jamaica", "jamaica-cancer-registry", "uwi-mona", "kingston-public-hospital", "cornwall-regional-hospital",
    "st-josephs-hospital-jamaica", "radiation-oncology-centre-jamaica", "iarc", "who", "iaea",
  ],
  companies: [],
  drugs: ["gemcitabine", "paclitaxel"],
  trials: ["nct07528768"],
  papers: ["paper-gibson-cancer-incidence-kingston-wimj-2010", "paper-reid-breast-cancer-mortality-jamaica-jcogo-2020", "paper-morrison-prostate-screening-jamaica-jce-2016"],
  people: [],
  how:
    "Every card was written from Jamaican and international sources read in full as raw text, not through a summary: the Ministry of Health's cancer plan for 2013 to 2018 in the copy WHO holds, the National Health Fund's pages, the Food and Drugs Regulations, 1975, the Jamaica Information Service, the University of the West Indies' Department of Pathology page, CARPHA's pages on the Caribbean Regulatory System and the cancer registry hub, WHO's 2020 and 2021 profiles and its vaccine and health expenditure rows from its public data APIs, IAEA DIRAC's public equipment data, IARC's GLOBOCAN 2024 fact sheet, a Gleaner report, and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The Ministry of Health and Wellness's own website refused automated requests and was not read. On a second check later on 16 November 2026 the National Health Fund's site returned an error, so its figures were not re-verified then. The new records added for this page (the Ministry, the Jamaica Cancer Registry, St. Joseph's Hospital and three papers) carry their own sources. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "National incidence figures for Jamaica are modelled, not counted. What the National Health Fund card takes off a medicine, whether a radiotherapy machine is working and what a public hospital charges change faster than any plan or paper; ask the treating hospital, a participating pharmacy or the National Health Fund what applies to you.",
  verifyLinks: [
    { label: "National Health Fund", url: NHF_CARD },
    { label: "Ministry of Health and Wellness", url: MOHW },
    { label: "UWI Mona: Department of Pathology", url: UWI_PATHOLOGY },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Jamaica (PDF)", url: IARC_FACTSHEET },
  ],
};
