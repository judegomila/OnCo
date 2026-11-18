import type { CountryDive } from "@/data/country-dive";

/**
 * Tajikistan deep dive: the hand-written cards for /countries/tj/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Tajikistan (PDF text),
 * WHO's Cancer Country Profile 2020 and cervical cancer profile 2021 (PDF text), WHO's Global Health Observatory and
 * immunisation data APIs (JSON), the public country table of IAEA's Directory of Radiotherapy Centres (JSON), the
 * European Observatory's health system review 2025 for Tajikistan (page and PDF text) and its 2024 Health Systems in
 * Action note, the IAEA's country sheet and its entry on the United Nations partnerships platform, WHO Europe's account
 * of the HPV vaccine launch, a UNICEF press release, the Ministry of Health and Social Protection's site (in Tajik), the
 * Ministry's cancer plan for 2016 to 2017 on the ICCP portal (in Tajik), WHO's August 2026 list of regulators at
 * maturity level 3 and 4, and abstracts resolved through Europe PMC.
 *
 * The IAEA's news pages returned a challenge page to a script and were not read; that and the other missing sources are
 * named under `gaps`, not filled from memory.
 *
 * Second check, November 2026: every claim was re-read against the raw text. Three sources the first pass had not opened
 * were read: the centre-level feed of the IAEA's directory (JSON), the IAEA's Technical Cooperation Highlights 2019 (PDF
 * text), which carries the agency's account of the Khujand opening, and the cancer programme for 2010 to 2015 on the
 * ICCP portal (PDF text, in Tajik and Russian). A mammography figure credited to the wrong source was corrected.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/762-tajikistan-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/tjk-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-tjk-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'TJK'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'TJK'%20and%20startswith(ANTIGEN,'HPV')";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'TJK'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'TJK'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'TJK'";
const GHO_EXT = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'TJK'";
const DIRAC_API = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const DIRAC_CENTRES_API = "https://dirac.iaea.org/api/DataGridWebApi/EquipmentReport";
const IAEA_HIGHLIGHTS_2019 = "https://www.iaea.org/sites/default/files/20/06/tcp_highlights_2019.pdf";
const HIT_2025 = "https://eurohealthobservatory.who.int/publications/i/tajikistan-health-system-review-2025";
const HIT_2025_PDF = "https://iris.who.int/server/api/core/bitstreams/0ca0e9eb-e69f-4751-8bd8-89742897d9bf/content";
const OBS_COUNTRY = "https://eurohealthobservatory.who.int/countries/tajikistan";
const HSIA_2024 = "https://eurohealthobservatory.who.int/publications/i/health-systems-in-action-tajikistan-2024";
const IAEA_SHEET = "https://www.iaea.org/sites/default/files/25/02/tc-tajikistan.pdf";
const UN_PARTNERSHIP = "https://sdgs.un.org/partnerships/expanding-and-improving-access-cancer-care-tajikistan";
const WHO_HPV_LAUNCH =
  "https://www.who.int/europe/news-room/feature-stories/item/hpv-vaccination-launches-in-tajikistan--protecting-the-girls-of-today--saving-the-women-of-tomorrow";
const UNICEF_2026 = "https://www.unicef.org/tajikistan/press-releases/tajikistan-marks-european-immunization-week-press-conference";
const MOH = "https://moh.tj/";
const MOH_PROGRAMMES = "https://moh.tj/barnoma-oi-mill/";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Tajikistan";
const ICCP_PROGRAMME_2010 = "https://www.iccp-portal.org/resources/national-programme-prevention-diagnosis-and-treatment-cancer-republic-tajikistan-2010";
const ICCP_PROGRAMME_2010_PDF =
  "https://www.iccp-portal.org/sites/default/files/plans/TJK_B5_%D0%9E%D0%BD%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F%20%28FinaL%29.pdf";
const ICCP_PLAN_2016 = "https://www.iccp-portal.org/resources/plan-prevention-diagnosis-treatment-and-control-cancer-2016-2017";
const ICCP_PLAN_2016_PDF = "https://www.iccp-portal.org/sites/default/files/plans/TJK_B5_Oncology%20-%202016%20-%202017%20%281%29.pdf";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Tajikistan&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Tajikistan&query.cond=cancer&pageSize=20&countTotal=true";
const doi = (id: string) => `https://doi.org/${id}`;
const P_SCREENING = doi("10.1200/go-25-00582");
const P_IAEA = doi("10.1200/go-25-00271");
const P_KHOROG = doi("10.1111/tbj.12618");
const P_HEPB = doi("10.1016/j.vaccine.2015.05.092");
const P_BBP = doi("10.1186/s12913-020-05392-2");

export const TJ_DIVE: CountryDive = {
  iso2: "TJ",
  iso3: "TJK",
  name: "Tajikistan",
  flag: "🇹🇯",
  asOf: "2026-11-16",
  title: "Cancer in Tajikistan",
  description:
    "Cancer in Tajikistan: IARC's modelled estimate of 8,222 new cancers and 4,841 deaths in 2024 with no population-based registry behind it, stomach cancer leading, two public radiotherapy centres in Dushanbe and Khujand, households paying 62% of health spending in 2023, a decree that lists terminal-stage cancer among the groups exempt from charges, no screening programme in WHO's profiles, HPV vaccination since October 2025 with 84% programme coverage in its first year, and no trial in OnCo's records with a site in the country.",
  lede:
    "Tajikistan has two public radiotherapy centres, in Dushanbe and since 2019 in Khujand, and began HPV vaccination in October 2025, reaching 84% of the girls targeted that year by WHO's figures. Households pay about 62% of health spending themselves. IARC's incidence figure for the country is modelled from deaths, it is not a registry count.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Tajikistan is 8,222 new cancers and 4,841 deaths, an age-standardised incidence of 106.5 per 100,000 (117.9 in men, 99.0 in women). These incidence figures are modelled, not counted: the fact sheet gives the country-specific data source for incidence as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\", which means IARC started from national death figures and worked back to new cases using modelled ratios of deaths to new cases. For mortality the source is WHO's national data and the method \"National rates applied to 2024 population\". WHO's 2020 profile rated the quality of death registration in Tajikistan as low, so the death figures the model starts from are themselves uncertain. National data quoted by the European Observatory give a registered incidence of 35.5 per 100,000 in 2018; that is a different year and the review does not say whether the rate is age-standardised, so it is not like for like with IARC's figure.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Tajikistan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Tajikistan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 8,200 new cancers a year by IARC's model, with stomach cancer leading",
          plain:
            "IARC estimates 8,222 new cancers in Tajikistan in 2024, 4,223 in women and 3,999 in men, and 4,841 cancer deaths. Stomach cancer is the commonest, then bowel, breast and cervical cancer and brain tumours. Stomach cancer is also the commonest cause of cancer death, with about one death in five.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,297 stomach cancers (1,051 deaths), 841 colorectal cancers (384 deaths), 663 breast cancers (278 deaths), 447 cervical cancers (244 deaths), 431 brain and central nervous system tumours (319 deaths), 356 lung cancers (324 deaths) and 318 liver cancers (284 deaths). In men the leading cancers are stomach, colorectal and prostate; in women breast, stomach and cervical. The risk of developing a cancer before age 75 is 10.9%, and an estimated 18,552 people are living within five years of a diagnosis. The incidence figures are modelled from death statistics: the fact sheet records no country-specific incidence data. WHO's 2020 profile estimated 378 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Tajikistan (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Tajikistan (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "No population-based cancer registry in WHO's profiles; national data count more than 15,000 people registered with tumours",
          plain:
            "WHO's 2021 profile recorded no population-based cancer registry in Tajikistan, and its 2020 profile recorded registration activity short of one. People with cancer are registered all the same: national data quoted in 2025 count more than 15,000 people with tumours registered in the country. OnCo found no published report of the yearly counts.",
          detail:
            "WHO's 2020 profile answers the population-based registry question for 2019 with \"registration activity\", rates the quality of mortality registration for 2007 to 2016 as low, and notes that its incidence estimates carry a high degree of uncertainty because they do not rest on a population-based registry. WHO's 2021 cervical cancer profile answers no to whether a population-based registry exists. The European Observatory's 2025 review, citing the Ministry of Health and Social Protection, says more than 15,000 people with neoplasms are registered in the country and that incidence is rising from a recorded 35.5 per 100,000 in 2018, and says information on cancer survival rates is unavailable. The national cancer programme for 2010 to 2015, read in Russian, said that 9,634 people with malignant tumours were then on the register and 2,218 were newly diagnosed in 2008, that for want of a single state cancer registry the official statistics did not show the true position, and that a cancer registry on a legal basis was to be created by 2015. OnCo found no source saying whether one was. IARC's age-standardised estimate for 2024 is 106.5 per 100,000; the two are not like for like, because the years differ and the review does not say whether the national rate is age-standardised. The table below therefore shows IARC's modelled figures, because OnCo found no national count by cancer type to set beside them.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Tajikistan (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Tajikistan (PDF)", url: WHO_CX_2021 },
            { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
            { label: "Government of Tajikistan: National Programme for the prevention, diagnosis and treatment of cancer, 2010 to 2015 (PDF, Tajik and Russian, ICCP portal)", url: ICCP_PROGRAMME_2010_PDF },
          ],
        },
      ],
      tables: [
        {
          id: "tj-leading-cancers",
          title: "The five commonest cancers in IARC's estimate for 2024",
          caption: "New cases and deaths in 2024, both sexes, all ages, from the GLOBOCAN 2024 fact sheet. Modelled estimates, not registry counts.",
          columns: [
            { key: "cancer", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "share", label: "Share of all new cancers (%)", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { cancer: "Stomach", cases: 1297, share: 15.8, deaths: 1051 },
            { cancer: "Colorectum", cases: 841, share: 10.2, deaths: 384 },
            { cancer: "Breast", cases: 663, share: 8.1, deaths: 278 },
            { cancer: "Cervix uteri", cases: 447, share: 5.4, deaths: 244 },
            { cancer: "Brain and central nervous system", cases: 431, share: 5.2, deaths: 319 },
            { cancer: "All cancers", cases: 8222, share: null, deaths: 4841 },
          ],
          note: "Tajikistan has no population-based cancer registry in WHO's profiles, so there is no national count to show here. IARC built these figures from national death statistics and modelled ratios of deaths to new cases; by deaths, lung cancer (324) ranks third and liver cancer (284) fifth.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Tajikistan (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      aside: { label: "European Observatory: Tajikistan, health system review 2025", url: HIT_2025 },
      cards: [
        {
          id: "oop",
          title: "About USD 85 a person on health in 2023, 62% of it out of pocket",
          plain:
            "Tajikistan spent about 85 US dollars a person on health in 2023, and households paid 62% of it out of their own pockets, according to WHO's health expenditure figures. The government paid about a quarter. Public money comes from national and local budgets, and patients pay most of the cost of medicines.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending as 71.2% of current health spending in 2019, 65.1% in 2021, 65.2% in 2022 and 62.4% in 2023; current health spending of USD 85.15 per person in 2023; domestic government spending of 25.6% of the total; and external funding of 11.9%. The European Observatory's 2025 review says public spending on health was 1.9% of GDP in 2021, that spending per person adjusted for purchasing power was the second lowest in WHO's European Region, that payments by patients, formal and informal, are the main barrier to care, and that there is no real mechanism for pooling funds and no central purchasing of services or medicines. It says medicines are mostly paid for out of pocket, with listed exceptions.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Tajikistan (data API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: current health expenditure per capita, Tajikistan (data API)", url: GHO_CHE },
            { label: "WHO Global Health Observatory: government share of health spending, Tajikistan (data API)", url: GHO_GOV },
            { label: "WHO Global Health Observatory: external share of health spending, Tajikistan (data API)", url: GHO_EXT },
            { label: "European Observatory: Tajikistan, health system review 2025", url: HIT_2025 },
          ],
        },
        {
          id: "entitlements",
          title: "Decree No. 600 lists who is treated free; terminal-stage cancer is on the list, and the piloted benefit package ended in 2023",
          plain:
            "A government decree, No. 600, sets out which health services are free and which need a co-payment. OnCo read it only as the European Observatory describes it: people with terminal-stage cancer are among the groups listed as entitled to free services and medicines, with free outpatient medicines capped at a small yearly sum. A basic benefit package was piloted in some districts from 2007 and withdrawn in May 2023. Cancer is one of five conditions with a state medicines programme.",
          detail:
            "The European Observatory's 2025 review lists patients with terminal-stage cancer among the disease categories entitled to free health services and pharmaceuticals under Decree No. 600 (adopted on 2 December 2008), beside social groups such as war veterans. It adds that people in these groups can receive outpatient medicines free where these are on the essential list, up to a limit of 128 somoni (about 12 euros) a year. OnCo did not read the decree itself. The Observatory's country page says the basic benefits package, piloted since 2007, had reached 31 of the country's 65 districts by 2022, was withdrawn in May 2023, and that a new version had not yet been launched when the page was written; the Observatory's 2024 note says a significant number of people fall outside the scope of eligibility. The review names five \"special disease\" programmes, for diabetes, cancer, haematology, organ transplantation and addiction, whose medicines are chosen from the national Essential Medicines List (last updated in 2022) and WHO's list and bought with government funds. It does not say which cancer medicines are supplied or how reliably, and OnCo found no source that does. A survey of 1,600 primary care patients published in 2020 found that, in districts with the benefit package, people with chronic conditions paid about the same for a visit as people with acute conditions once other factors were allowed for, which its authors read as a protective effect.",
          links: [
            { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
            { label: "European Observatory: Tajikistan country page", url: OBS_COUNTRY },
            { label: "European Observatory: Health systems in action, Tajikistan 2024", url: HSIA_2024 },
            { label: "Fischer and others, BMC Health Services Research 2020: out-of-pocket spending in primary care", url: P_BBP },
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
          id: "regulator-service",
          title: "The state supervision service for health and social protection regulates medicines",
          plain:
            "Medicines in Tajikistan are regulated by the Service for State Supervision of the Healthcare System and Social Protection of the Population, an agency listed on the health ministry's site. A Pharmacological Committee judges the safety and effectiveness of new medicines. The regulator is not on WHO's list of regulators at maturity level 3 or 4.",
          detail:
            "The European Observatory's 2025 review says the Ministry of Health and Social Protection's Department of Pharmacy and Medical Goods sets state policy for the sector, and that the Service for State Supervision of the Healthcare System and Social Protection of the Population is the state agency authorised to regulate and supervise pharmaceutical activities; a Pharmacological Committee, part of the regulatory body, decides on clinical evidence for new medicines, doses and indications. The law on medicines and pharmaceutical activities dates from 2003 and was last updated in 2022. The review says nearly all medicines are imported, that a 2021 survey found the availability of essential medicines differing between regions, and that prices varied widely between facilities. The Ministry's site lists the Service among its agencies, but the Service's page there carried no text on 16 November 2026, and OnCo found no site of its own. WHO's August 2026 list of regulators operating at maturity level 3 and 4 does not include Tajikistan's regulator; the list says nothing about those it leaves out. OnCo did not read the state register of medicines or the rules for authorising clinical trials.",
          links: [
            { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
            { label: "Ministry of Health and Social Protection of the Population (Tajik)", url: MOH },
            { label: "WHO: list of regulators operating at maturity level 3 and 4, August 2026 (PDF)", url: WHO_ML3 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer profile 2021, Tajikistan (PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 1 October 2025, with 84% programme coverage in its first year",
          plain:
            "Tajikistan added the HPV vaccine to its national schedule on 1 October 2025, as a single dose for girls, given mainly in schools. WHO's immunisation data record that 84% of the girls targeted in 2025 were vaccinated. Hepatitis B vaccination, which protects against a cause of liver cancer, has been in the schedule since 2002.",
          detail:
            "WHO's Europe office describes the launch on 1 October 2025: more than 500,000 girls aged 10 to 14 offered a single dose, delivered mainly through schools by primary care teams, with technical support from WHO and UNICEF and funding from Gavi and the European Union. UNICEF's April 2026 release says routine vaccination is aimed at 10-year-old girls and that a national catch-up campaign for girls aged 11 to 14 was carried out. WHO's introduction table marks the vaccine as in the schedule, nationwide, from 2025, and its programme coverage row for girls gives 84% for 2025 (519,413 doses for a target of 620,148). That is the share of the first year's target group reached, not yet a measure of girls vaccinated by age 15. WHO's rows mark a hepatitis B vaccine from 2002 and a birth dose from 1998; a 2015 study of a 2010 national serosurvey found hepatitis B surface antigen in 0.4% of children born after coverage reached 80%.",
          links: [
            { label: "WHO Europe: HPV vaccination launches in Tajikistan", url: WHO_HPV_LAUNCH },
            { label: "UNICEF Tajikistan: European Immunization Week press conference (April 2026)", url: UNICEF_2026 },
            { label: "WHO immunisation data: HPV programme coverage, Tajikistan (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV vaccine introduction, Tajikistan (data API)", url: WHO_INTRO_API },
            { label: "Khetsuriani and others, Vaccine 2015: decline in hepatitis B after vaccine introduction", url: P_HEPB },
          ],
        },
        {
          id: "screening-tj",
          title: "No screening programme for breast or cervical cancer in WHO's profiles, and fewer than one woman in ten aged 15 to 49 reports ever being tested",
          plain:
            "WHO's 2020 and 2021 profiles recorded no national screening programme for cervical or breast cancer in Tajikistan. In the 2023 Demographic and Health Survey, 9.3% of women aged 15 to 49 said they had ever been tested for cervical cancer and 6.2% had ever had a clinical breast examination.",
          detail:
            "WHO's 2020 profile lists, for 2019, no breast screening programme, no cervical screening, and early detection guidelines for none of the four cancers it asks about. WHO's 2021 cervical profile gives 11% of women aged 30 to 49 screened in the last five years and 13% ever screened (2019), with guidelines for recognising first symptoms in primary care and a defined referral system both marked yes. An analysis of the 2023 Demographic and Health Survey (9,824 women) found testing more common among older, wealthier and urban women. WHO's 2020 profile recorded 9.0 mammography units per 10,000 cancer patients for 2020. The European Observatory's 2025 review calls prevention, screening and early diagnosis generally underdeveloped. A project in Khorog, published in 2016, trained 24 local health workers and examined 441 women; all six breast cancers it found were locally advanced.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Tajikistan (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Tajikistan (PDF)", url: WHO_CX_2021 },
            { label: "Gupta and others, JCO Global Oncology 2026: breast and cervical screening in the 2023 survey", url: P_SCREENING },
            { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
            { label: "Talib and others, The Breast Journal 2016: breast cancer programme in Khorog", url: P_KHOROG },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Tajikistan",
      cards: [
        {
          id: "radiotherapy",
          title: "Two radiotherapy centres: Dushanbe, and since 2019 Khujand in the north",
          plain:
            "Radiotherapy is given at the Republican Scientific Centre of Oncology in Dushanbe and, since 2019, at the Sughd regional oncology centre in Khujand. The IAEA says the Khujand centre ended the need for patients from the north to travel about 300 kilometres to the capital. The IAEA's directory lists two megavoltage machines for the whole country, one cobalt-60 unit at each centre, and no linear accelerator.",
          detail:
            "The public country table of the IAEA's Directory of Radiotherapy Centres gives Tajikistan, last updated in 2026, two radiotherapy centres, two high-energy photon and electron beam units and one brachytherapy unit. The directory's centre entries name them: the State Institution \"Oncological Scientific Centre\" in Dushanbe, with one cobalt-60 teletherapy unit, one cobalt-60 high-dose-rate brachytherapy unit and a simulator (entry updated in 2026), and the Sughd Regional Oncology Centre in Khujand, with one cobalt-60 teletherapy unit (entry updated in 2021). Neither entry lists a linear accelerator. The IAEA's entry on the United Nations partnerships platform says that until the project one hospital in Dushanbe treated about 4,200 patients a year, that its equipment had been out of service for a time so that those who could afford it travelled abroad, that the IAEA procured equipment for a new centre in Khujand, which the country inaugurated in 2019, and supported the refurbishment of two machines in Dushanbe. The IAEA's Technical Cooperation Highlights for 2019 dates the Khujand inauguration to 18 August 2019, says a cobalt-60 unit is the centrepiece of the new department, with a conventional simulator and a treatment planning system also procured by the IAEA, and quotes an IAEA director saying the department \"will soon be accepting patients\". The IAEA's country sheet shows a cobalt-60 unit provided at the Dushanbe centre, records an imPACT review in 2012, and says brachytherapy, CT and other diagnostic equipment are being procured. An IAEA review put Tajikistan, Kyrgyzstan and Uzbekistan at 0.1 to 0.2 megavoltage machines per million people in 2022.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres, country table", url: DIRAC },
            { label: "IAEA DIRAC: country table (data API)", url: DIRAC_API },
            { label: "IAEA DIRAC: centre entries and their machines (data API)", url: DIRAC_CENTRES_API },
            { label: "IAEA: Technical Cooperation Programme, Selected Highlights 2019 (PDF)", url: IAEA_HIGHLIGHTS_2019 },
            { label: "United Nations partnerships platform: IAEA, expanding and improving access to cancer care in Tajikistan", url: UN_PARTNERSHIP },
            { label: "IAEA: technical cooperation country sheet, Tajikistan (PDF)", url: IAEA_SHEET },
            { label: "AlKhatib and others, JCO Global Oncology 2025: radiotherapy resources in Central Asia", url: P_IAEA },
          ],
        },
        {
          id: "plan",
          title: "Cancer programmes for 2010 to 2015 and 2016 to 2017 on record; no current cancer programme found",
          plain:
            "The ICCP portal holds Tajikistan's national cancer programme for 2010 to 2015 and a ministry action plan for 2016 to 2017. OnCo did not find a cancer programme for later years: the health ministry's own list of national programmes names fifteen, none of them for cancer.",
          detail:
            "A search of the ICCP portal for Tajikistan on 16 November 2026 returned the National Programme for the prevention, diagnosis and treatment of cancer for 2010 to 2015, which the Government approved by Decree No. 587 of 31 October 2009, the Ministry of Health and Social Protection's plan of measures on the prevention, diagnosis, treatment and control of cancer for 2016 to 2017, the non-communicable disease strategy for 2013 to 2023 and WHO's profiles, among others. The 2016 to 2017 plan, read in Tajik, names the state institution Republican Scientific Centre of Oncology as responsible for the first tasks listed, among them reviewing the guidelines for diagnosing and treating malignant tumours and seeing them introduced in regional oncology centres. WHO's 2020 profile gives \"n/a\" in the national cancer plan field for 2019 and marks cancer management guidelines as present. The Ministry's page of national programmes lists fifteen, among them immunisation for 2021 to 2025 and reproductive health for 2023 to 2027, and none on cancer; the newest news item on the Ministry's home page was dated 30 January 2026, so the list may be out of date. The European Observatory's 2025 review counts five oncology inpatient facilities in the country.",
          links: [
            { label: "ICCP portal: search results for Tajikistan", url: ICCP_SEARCH },
            { label: "ICCP portal: National Programme for prevention, diagnosis and treatment of cancer, 2010 to 2015", url: ICCP_PROGRAMME_2010 },
            { label: "Government of Tajikistan: the 2010 to 2015 programme and Decree No. 587 (PDF, Tajik and Russian)", url: ICCP_PROGRAMME_2010_PDF },
            { label: "ICCP portal: Plan on prevention, diagnosis, treatment and control of cancer, 2016 to 2017", url: ICCP_PLAN_2016 },
            { label: "Ministry of Health and Social Protection: cancer plan for 2016 to 2017 (PDF, Tajik)", url: ICCP_PLAN_2016_PDF },
            { label: "Ministry of Health and Social Protection: national programmes (Tajik)", url: MOH_PROGRAMMES },
            { label: "WHO: Cancer Country Profile 2020, Tajikistan (PDF)", url: WHO_PROFILE },
            { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
          ],
        },
        {
          id: "palliative",
          title: "Palliative care in cancer hospitals and five nursing hospitals; WHO recorded opioid availability of 6 daily doses per million people",
          plain:
            "Inpatient palliative care is given in cancer and tuberculosis hospitals and in five regional nursing care hospitals, and day centres with mobile teams work in Dushanbe and the Gorno-Badakhshan region. WHO's 2020 profile recorded the availability of opioid pain medicines for 2015 to 2017 as 6 defined daily doses per million people per day; the same series gave 23 for neighbouring Kyrgyzstan.",
          detail:
            "The European Observatory's 2025 review says a national palliative care association and a university chair have been set up and national standards approved by the Ministry, that more than 4,000 adults needing palliative care are officially registered, which it calls a significant underestimate, and that palliative care for people with cancer is a particular concern. WHO's 2020 profile recorded opioid availability for 2015 to 2017 as 6 defined daily doses per million people per day, and community or home-based palliative care as generally available in 2019. WHO's 2021 cervical cancer profile answers no, for 2021, to whether palliative care is generally available in the public system in primary care facilities or in community or home-based care, so the two profiles disagree. The Observatory's review says the one organisation allowed to import narcotic medicines is the Republican Centre for Pharmaceutical and Medical Equipment Services. OnCo did not read a source on whether oral morphine is available outside the capital.",
          links: [
            { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
            { label: "WHO: Cancer Country Profile 2020, Tajikistan (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Tajikistan (PDF)", url: WHO_CX_2021 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Tajikistan", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Tajikistan",
          plain:
            "None of the trials in OnCo's records lists Tajikistan among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search. A query of the registry for cancer studies with a site in Tajikistan returned one record, an expanded access programme that is no longer available.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Tajikistan. The registry's own search on the same day, for the condition cancer and the location Tajikistan, returned one record, NCT03311542, an expanded access programme for pembrolizumab whose status is \"no longer available\". A registry search matches loosely, so check a record's site list before relying on it. OnCo found no open cancer treatment trial with a site in the country.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Tajikistan", url: CTGOV },
            { label: "ClinicalTrials.gov: the same query through the data API", url: CTGOV_API },
          ],
        },
        {
          id: "papers",
          title: "Published research is thin: survey analyses, one community breast programme and regional reviews",
          plain:
            "OnCo found few indexed papers on cancer in Tajikistan. The most recent uses the 2023 Demographic and Health Survey to measure screening. Others describe a breast cancer programme in Khorog and place Tajikistan in regional reviews of radiotherapy. OnCo read no indexed paper reporting the national oncology service's own counts.",
          detail:
            "A Europe PMC search on 16 November 2026 for papers with Tajikistan in the title and the terms cancer, oncology, tumour or neoplasm returned 23 results, most of them not about cancer; the count moves with the terms used. Those OnCo resolved and read as abstracts: a 2026 analysis of the 2023 survey (9,824 women; 6.2% ever had a clinical breast examination, 9.3% ever tested for cervical cancer); a 2016 report of a partnership in Khorog that examined 441 women and found six breast cancers, all locally advanced; a 2025 IAEA review of radiotherapy in five Central Asian countries, which counted 75 megavoltage machines in the region in 2022; and a 2015 study showing hepatitis B infection falling after vaccination began. The results also held a 2006 paper in Russian on the epidemiology of melanoma in Tajikistan, which OnCo did not read. The title search will have missed papers that name the country only in the abstract.",
          links: [
            { label: "Gupta and others, JCO Global Oncology 2026", url: P_SCREENING },
            { label: "Talib and others, The Breast Journal 2016", url: P_KHOROG },
            { label: "AlKhatib and others, JCO Global Oncology 2025", url: P_IAEA },
            { label: "Khetsuriani and others, Vaccine 2015", url: P_HEPB },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found, blocked or not read for this page",
      plain:
        "OnCo did not find a website for the oncology centre in Dushanbe or the medicines regulator, a current national cancer programme, a published count from the cancer register, or a list of the cancer medicines the state supplies. The IAEA's news pages on Tajikistan could not be read by a script, though the agency's 2019 highlights report carries its account of the Khujand opening.",
      detail:
        "The IAEA's news pages, including its report of the Khujand centre's opening, returned a challenge page (HTTP 403) on 16 November 2026, at both the first and the second check, and were not read. The opening is described instead from the IAEA's Technical Cooperation Highlights for 2019, a PDF that did open; the radiotherapy card rests on that, the IAEA's country sheet, its United Nations partnership entry and its directory. The second news page, on strengthening oncology services with a focus on women's cancers, has not been read at all. UICC's member page for the patient organisation AVESTO refused the request (HTTP 406) at both checks, so nothing about AVESTO was re-verified. The text of Decree No. 600 was not read directly, only as the European Observatory describes it, so the page gives no co-payment amounts and cannot say how the exemption for terminal-stage cancer works in practice. The cancer programme for 2010 to 2015 was opened at the second check and read in part, in Russian: the approving decree and its passages on the register and the planned registry, not its full text or budget tables. A future pass should read the decree and any cancer programme adopted since 2017 in the national legal database, the oncology centre's own reports, and the Demographic and Health Survey 2023 report itself. Patients can ask the oncology centre in Dushanbe or Khujand, or the Ministry of Health and Social Protection, what is free for them.",
      links: [
        { label: "United Nations partnerships platform: IAEA entry, which cites the IAEA news pages that were not read", url: UN_PARTNERSHIP },
        { label: "Ministry of Health and Social Protection of the Population (Tajik)", url: MOH },
        { label: "ICCP portal: search results for Tajikistan", url: ICCP_SEARCH },
        { label: "IAEA: Technical Cooperation Programme, Selected Highlights 2019 (PDF)", url: IAEA_HIGHLIGHTS_2019 },
      ],
    },
    {
      id: "gap-figures",
      title: "How far the figures can be trusted",
      plain:
        "Every national cancer figure for Tajikistan on this page is an estimate or a partial count. IARC models new cases from deaths, WHO's 2020 profile rated the country's death registration for 2007 to 2016 as low quality, and the registered incidence quoted from national data (35.5 per 100,000 in 2018) is far below IARC's age-standardised estimate (106.5 in 2024), though the two rates are not like for like.",
      detail:
        "IARC's age-standardised incidence for 2024 is 106.5 per 100,000; the national figure quoted in the European Observatory's 2025 review is 35.5 per 100,000 for 2018, and the review does not say whether it is age-standardised, and the years differ, so the two are not like for like; a gap that wide is consistent with cancers that are never diagnosed or registered, but does not measure them. WHO's 2020 profile carries a footnote that the mortality estimates have a high degree of uncertainty because they are not based on national cause-of-death data for non-communicable diseases. A future pass should look for the Ministry's annual health statistics and any report of the registry; until then, treat the totals as orders of magnitude.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Tajikistan (PDF)", url: IARC_FACTSHEET },
        { label: "WHO: Cancer Country Profile 2020, Tajikistan (PDF)", url: WHO_PROFILE },
        { label: "European Observatory: Tajikistan, health system review 2025 (PDF)", url: HIT_2025_PDF },
      ],
    },
  ],
  institutions: [
    "tj-ministry-of-health-and-social-protection",
    "tj-oncological-scientific-centre",
    "tj-sughd-regional-oncology-centre",
    "tj-health-supervision-service",
    "avesto-tajikistan",
    "who",
    "iarc",
    "iaea",
  ],
  companies: [],
  drugs: ["pembrolizumab"],
  trials: [],
  papers: [
    "paper-gupta-breast-cervical-screening-tajikistan-jcogo-2026",
    "paper-talib-breast-cancer-khorog-tajikistan-breastj-2016",
    "paper-alkhatib-radiotherapy-central-asia-jcogo-2025",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles, WHO's health expenditure and immunisation data, the IAEA's radiotherapy directory, country sheet, 2019 highlights report and United Nations partnership entry, the European Observatory's 2025 health system review, WHO Europe and UNICEF on the HPV vaccine launch, the Ministry of Health and Social Protection's site, its 2016 to 2017 cancer plan in Tajik, the 2010 to 2015 cancer programme in Russian, and paper abstracts through Europe PMC. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "Much of what is known about cancer services in Tajikistan here comes from international agencies, not from the services themselves. Check with the Ministry of Health and Social Protection or the treating hospital before relying on it.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Tajikistan (PDF)", url: IARC_FACTSHEET },
    { label: "European Observatory: Tajikistan, health system review 2025", url: HIT_2025 },
    { label: "Ministry of Health and Social Protection of the Population (Tajik)", url: MOH },
  ],
};
