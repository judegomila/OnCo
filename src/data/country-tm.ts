import type { CountryDive } from "@/data/country-dive";

/**
 * Turkmenistan deep dive: the hand-written cards for /countries/tm/ (wave 15). Turkmenistan publishes very little on
 * cancer, so this page is short on purpose: it says what each source states, gives the source's date, and names what
 * was not found. Every figure was read from the raw text of its source on 16 November 2026, not from a summary of it:
 * IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer Country Profile 2020 and Cervical Cancer Profile 2021 (PDF text),
 * WHO's Global Health Expenditure rows and immunisation data API, the public country table of the IAEA's Directory of
 * Radiotherapy Centres, the Ministry of Health and Medical Industry's own site (English and Russian pages), the
 * ministry's 2016 to 2018 cancer strategy (Russian, PDF text on the ICCP portal), two WHO event pages of 2025, the
 * European Observatory's country page, WHO's list of regulators at maturity level 3 and 4, a Europe PMC search and
 * the ClinicalTrials.gov API. Official statistics are scarce and OnCo could not check them against an independent
 * count; the page does not fill those gaps from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/795-turkmenistan-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/tkm-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-tkm-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'TKM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'TKM'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'TKM'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'TKM'";
const WHO_GGHE_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'TKM'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const DIRAC_FEED = "https://dirac.iaea.org/api/DataGridWebApi/EquipmentReport";
const MOH = "https://www.saglykhm.gov.tm/en";
const MOH_TASKS = "https://www.saglykhm.gov.tm/en/tasks-and-functions-of-the-ministry";
const MOH_CENTRAL = "https://www.saglykhm.gov.tm/en/merkezi-bejeris-onuni-alys-edaralary";
const MOH_ONCOLOGY = "https://www.saglykhm.gov.tm/en/merkezi-bejeris-onuni-alys-edaralary/onkologiya-ylmy-kliniki-merkezi";
const MOH_PHARMA = "https://www.saglykhm.gov.tm/en/derman-senagaty-we-derman-upjunciligi-edaralary";
const MOH_REG_CENTRE = "https://www.saglykhm.gov.tm/en/derman-senagaty-we-derman-upjunciligi-edaralary/derman-serisdelerini-hasaba-alys-we-olaryn-hiline-dowlet-gozegciligi-merkezi";
const MOH_PROGRAMMES = "https://www.saglykhm.gov.tm/en/dowlet-maksatnamalary-we-strategiyalary";
const MOH_SERVICES = "https://www.saglykhm.gov.tm/en/hyzmatlar";
const MOH_INSURANCE = "https://www.saglykhm.gov.tm/en/dowlet-meyletin-saglygy-gorayys-atiyaclandyrmasy";
const STRATEGY_2016 = "https://www.iccp-portal.org/sites/default/files/plans/TKM_B5_Onkologi%C3%BDa2.pdf";
const NCD_2014 = "https://www.iccp-portal.org/sites/default/files/plans/TKM_B3_NCD%20%20Strategy%20TKM%20%20edited%20by%20MoH%20final%20eng.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Turkmenistan";
const WHO_IMPACT_2025 = "https://www.who.int/europe/news-room/events/item/2025/09/08/default-calendar/iaea--iarc-and-who-unite-to-conduct-the-impact-review-mission-and-strengthen-oncological-service-in-turkmenistan";
const WHO_TRAINING_2025 = "https://www.who.int/turkmenistan/events/item/2025/12/01/default-calendar/who-experts-lead-advanced-oncology-training-in-turkmenistan";
const OBSERVATORY = "https://eurohealthobservatory.who.int/countries/turkmenistan";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const EPMC_SEARCH = "https://europepmc.org/search?query=TITLE%3ATurkmenistan%20AND%20%28cancer%20OR%20oncology%20OR%20tumour%20OR%20neoplasm%29";
const CTGOV = "https://clinicaltrials.gov/search?country=Turkmenistan&cond=cancer";

export const TM_DIVE: CountryDive = {
  iso2: "TM",
  iso3: "TKM",
  name: "Turkmenistan",
  flag: "🇹🇲",
  asOf: "2026-11-16",
  title: "Cancer in Turkmenistan",
  description:
    "Cancer in Turkmenistan from the few sources that publish on it: IARC's estimate of 7,659 new cancers and 4,496 deaths in 2024, modelled from national deaths and not counted by a registry; breast cancer the commonest; WHO's rows showing households paying 77.4% of health spending out of pocket in 2023; HPV vaccination of girls and boys since 2016 with 95% first-dose coverage in 2025; five radiotherapy centres in an IAEA entry last updated in 2018; a national cancer strategy for 2016 to 2018 and no later one found; and no trial in OnCo's records with a site in the country.",
  lede:
    "The health ministry's 2016 to 2018 cancer strategy routes cancer care through the Scientific-Clinical Centre of Oncology in Ashgabat and oncology hospitals in the regions, and WHO's data record HPV vaccination of girls and boys since 2016. Little else is published: IARC's figure of 7,659 new cancers in 2024 is modelled from deaths, not counted by a registry, and OnCo found no national cancer statistics to set beside it.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Turkmenistan is 7,659 new cancers and 4,496 deaths, an age-standardised incidence of 115.9 per 100,000 (128.8 in men, 114.1 in women) and an age-standardised mortality of 70.1. These are modelled figures, not a registry count. The fact sheet gives the country-specific data source for incidence as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\": IARC estimates deaths first and then works back to new cases with mortality-to-incidence ratios. For mortality the source is \"WHO (national)\" and the method \"Trends in national rates projected to 2024\". WHO's 2020 profile rated the quality of Turkmenistan's mortality registration for 2007 to 2016 as low. The two agencies also use different populations: IARC's sheet gives 7,494,504 people in 2024 and WHO's 2020 profile gave 5,942,094 for 2019. OnCo found no national figure to settle either point.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Turkmenistan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Turkmenistan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 7,700 new cancers a year by IARC's estimate, modelled from deaths",
          plain:
            "IARC estimates 7,659 new cancers in Turkmenistan in 2024 (4,356 in women and 3,303 in men) and 4,496 cancer deaths. Breast cancer is estimated to be the commonest cancer and the commonest cause of cancer death, followed by stomach, lung and oesophageal cancer. The incidence figure is not a registry count.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,398 breast cancers (566 deaths), 563 stomach cancers (478 deaths), 525 lung cancers (473 deaths), 472 oesophageal cancers (407 deaths) and 392 cervical cancers (217 deaths). In men the leading cancers are lung (390), stomach (359) and prostate (254). The risk of developing a cancer before age 75 is 12.4%, and an estimated 18,497 people are living within five years of a diagnosis. IARC's stated incidence method is \"National mortality estimates applied to model-based M:I ratios (registry survival data)\", with \"No data\" as the country-specific source, so every case number here is derived from estimated deaths. WHO's 2020 profile estimated 198 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Turkmenistan (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Turkmenistan (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "No population-based registry in WHO's 2021 profile; a cancer registry was planned in 2016",
          plain:
            "WHO's 2021 cervical cancer profile records that no population-based cancer registry exists in Turkmenistan. The ministry's cancer strategy for 2016 to 2018 listed creating a cancer registry among its tasks. OnCo found no published registry report or national cancer statistics.",
          detail:
            "WHO's 2020 profile listed the availability of a population-based registry for 2019 as \"registration activity\" and noted that the country's incidence estimates carry a high degree of uncertainty because they are not based on one; the 2021 cervical profile answers \"No\" to whether a population-based registry exists. The 2016 strategy, which carries a deputy minister's approval block dated January 2016, set eight tasks, the eighth being to create a cancer registry, and called for a single computerised system for collecting information. It assigned statistical reporting on the strategy to the state statistics body. OnCo found no document reporting whether the registry was set up, and no counts from it.",
          links: [
            { label: "WHO: Cervical Cancer Country Profile 2021, Turkmenistan (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Turkmenistan (PDF)", url: WHO_PROFILE },
            { label: "Ministry of Health and Medical Industry: strategy for prevention, early detection and treatment of malignant neoplasms 2016 to 2018 (Russian, PDF, ICCP portal)", url: STRATEGY_2016 },
          ],
        },
      ],
      tables: [
        {
          id: "tm-globocan-sites",
          title: "The five commonest cancers in Turkmenistan, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024. Modelled from national mortality estimates, not counted by a registry.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1398, deaths: 566 },
            { site: "Stomach", cases: 563, deaths: 478 },
            { site: "Lung", cases: 525, deaths: 473 },
            { site: "Oesophagus", cases: 472, deaths: 407 },
            { site: "Cervix uteri", cases: 392, deaths: 217 },
          ],
          note: "OnCo found no Turkmen registry or ministry figures to set beside these. IARC derives the case numbers from estimated deaths, so they are a scale to read, not a count.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Turkmenistan (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "spending",
          title: "Households paid 77.4% of health spending out of pocket in 2023, in WHO's figures",
          plain:
            "WHO's health expenditure database puts out-of-pocket payments at 77.4% of Turkmenistan's current health spending in 2023, with total health spending of about 581 US dollars a person. Government spending made up 17.1% of the total. These rows cover all health care, not cancer care.",
          detail:
            "The out-of-pocket share in WHO's rows was between 76% and 80% in every year from 2018 to 2023 (76.6% in 2018, 79.2% in 2022, 77.4% in 2023). Current health expenditure per person was USD 472 in 2021, 579 in 2022 and 581 in 2023, and domestic general government health expenditure was 17.1% of current health spending in 2023. The European Observatory on Health Systems and Policies' country page carries no date for its overview, and the one review it lists was published in December 2000, so its account may be more than twenty years old; it says public funds for health come mainly from national government revenues, that hospitals do not admit patients without a referral from primary care except in emergencies or where patients are willing to pay, and that informal payments are widespread but difficult to quantify. OnCo found no source giving what a cancer patient pays.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket expenditure as % of current health expenditure, Turkmenistan (data API)", url: WHO_OOP_API },
            { label: "WHO Global Health Observatory: current health expenditure per capita in US$, Turkmenistan (data API)", url: WHO_CHE_API },
            { label: "WHO Global Health Observatory: government health expenditure as % of current health expenditure, Turkmenistan (data API)", url: WHO_GGHE_API },
            { label: "European Observatory on Health Systems and Policies: Turkmenistan", url: OBSERVATORY },
          ],
        },
        {
          id: "insurance",
          title: "A state voluntary medical insurance exists; what it covers for cancer was not readable",
          plain:
            "The Ministry of Health and Medical Industry lists state voluntary health insurance among its services, and its regulations give it the task of developing that system. The ministry's page describing the insurance and its benefits returned no text to OnCo, so what it covers for cancer is not stated here.",
          detail:
            "The ministry's regulations, as posted on its site and read on 16 November 2026, list \"development and improvement of the system of state voluntary medical insurance of citizens\" among its tasks, and its services page carries an entry headed \"State voluntary health insurance\" and described as \"Health insurance of citizen of Turkmenistan and its benefits\". The page behind that entry held a title and no body text in English, Russian and Turkmen when fetched on 16 and on 17 November 2026. The cancer strategy for 2016 to 2018 said the cancer programme, not the insurance, should be available to all citizens, and named two sources of funding for the strategy: the ministry and donors. OnCo found no source on premiums, on the share of people insured, or on charges for chemotherapy or radiotherapy.",
          links: [
            { label: "Ministry of Health and Medical Industry: tasks and functions of the ministry", url: MOH_TASKS },
            { label: "Ministry of Health and Medical Industry: all services", url: MOH_SERVICES },
            { label: "Ministry of Health and Medical Industry: state voluntary health insurance (page without body text on 16 and 17 November 2026)", url: MOH_INSURANCE },
            { label: "Ministry of Health and Medical Industry: cancer strategy 2016 to 2018 (Russian, PDF, ICCP portal)", url: STRATEGY_2016 },
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
          id: "medicines-regulation",
          title: "The health ministry registers medicines and authorises clinical trials",
          plain:
            "Medicines are regulated by the Ministry of Health and Medical Industry itself. Its regulations say it carries out the state registration of medicines and medical devices and authorises clinical trials of medicines. A registration and quality control centre sits among the ministry's institutions.",
          detail:
            "The ministry's regulations, read on its site on 16 November 2026, also say it controls the supply of safe, high-quality and effective medicines, defines the list of types of major narcotic drugs used in the country, centralises the purchase of medicines for the population and for health institutions, and can temporarily suspend the production and sale of medicines that do not meet requirements. Its list of institutions names the Center for registration of medical products and state quality control in Ashgabat; that centre's own site loads its content by script, and its data feed, read on 17 November 2026, carries application forms addressed to the centre for the state registration or re-registration of medicines and of products for medical purposes, and nothing on fees, timelines or which medicines are registered. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include Turkmenistan. OnCo found no public list of the cancer medicines registered in the country.",
          links: [
            { label: "Ministry of Health and Medical Industry: tasks and functions of the ministry", url: MOH_TASKS },
            { label: "Ministry of Health and Medical Industry: Center for registration of medical products and state quality control", url: MOH_REG_CENTRE },
            { label: "Ministry of Health and Medical Industry: medical industry and pharmaceutical supply institutions", url: MOH_PHARMA },
            { label: "WHO: list of regulatory authorities operating at maturity level 3 and 4 (PDF, August 2026)", url: WHO_ML3 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cervical Cancer Country Profile 2021, Turkmenistan (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination of girls and boys since 2016, with 95% first-dose coverage reported for 2025",
          plain:
            "WHO's immunisation data mark the HPV vaccine as part of Turkmenistan's schedule from 2016, for boys as well as girls. For 2025 the reported programme coverage is 95% for the first dose and 97% for the last dose, in both sexes. These are figures the country reports to WHO.",
          detail:
            "WHO's rows give first-dose programme coverage in girls of 90% in 2016, 99% in each year from 2019 to 2023, 97% in 2024 and 95% in 2025 (77,306 doses against a target of 81,124 girls), with the same percentages for boys. Last-dose coverage in 2025 is 97% for girls and for boys. In several years, 2019 and 2020 among them, the doses reported exceed the target number and WHO records 99%. WHO's 2021 cervical cancer profile describes the programme as national, introduced in 2016, with a primary target cohort of 9-year-olds. WHO's rows also mark hepatitis B vaccine, including a dose at birth, as part of the schedule from 2002. OnCo found no independent survey of coverage.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Turkmenistan (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccine introduction rows for Turkmenistan (data API)", url: WHO_INTRO_API },
            { label: "WHO: Cervical Cancer Country Profile 2021, Turkmenistan (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "screening-rows",
          title: "Cervical and breast screening programmes on record, with about half of women aged 30 to 49 screened in WHO's 2019 figure",
          plain:
            "WHO's 2021 cervical cancer profile records a national cervical screening programme for women aged 30 to 65 and estimates that 51% of women aged 30 to 49 had been screened in the previous five years (2019). WHO's 2020 profile recorded a breast screening programme starting at age 35.",
          detail:
            "The 2021 profile gives 62% of women aged 30 to 49 as ever screened and lists the primary screening test as data not available. The 2020 profile described the cervical programme for 2019 as opportunistic, by visual inspection, with participation above 50% and below 70%, and recorded early detection guidelines for all four cancers WHO asks about (breast, cervix, colon and childhood). The ministry's 2016 to 2018 strategy describes the screening itself: examination rooms in primary care clinics (health houses) that take a cervical smear for cytology, breast ultrasound for women aged 30 to 35, and mammography once a year at 35 to 40, twice a year at 41 to 49 and once a year at 50 to 60. The same strategy said 55 to 60% of patients were then seeking care with stage III or IV disease. OnCo found no report of what the programme achieved.",
          links: [
            { label: "WHO: Cervical Cancer Country Profile 2021, Turkmenistan (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Turkmenistan (PDF)", url: WHO_PROFILE },
            { label: "Ministry of Health and Medical Industry: cancer strategy 2016 to 2018 (Russian, PDF, ICCP portal)", url: STRATEGY_2016 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Turkmenistan",
      cards: [
        {
          id: "centres",
          title: "A national oncology centre in Ashgabat, with referral from oncology hospitals in the regions",
          plain:
            "The ministry lists the Scientific-Clinical Center of Oncology among its central institutions, at 22 Archabil avenue in Ashgabat. Under the 2016 to 2018 strategy, a family doctor refers a patient found to have a precancerous condition or a cancer to the oncology hospital of their region, or to the national centre for patients in Ashgabat and the Ahal region.",
          detail:
            "The ministry's page for the centre, read on 16 November 2026, gives its name, address, telephone numbers and bus routes and nothing on its departments, beds or patient numbers. The 2016 strategy made a working group at the centre responsible for carrying the strategy out, said every primary care clinic has an oncology office staffed by a doctor trained in oncology, and set a limit of up to 10 days for the diagnostic work-up of a suspected cancer. WHO's 2020 profile recorded, for 2019, cancer management guidelines in place, pathology services generally available, community or home-based palliative care generally available, and bone marrow transplantation generally not available. OnCo's five existing records for Turkmen oncology centres cite the IAEA's directory, and the record for the capital is named Oncology Centre, Ashgabat. The directory's public data feed, read on 17 November 2026, names the same five centres, each in an entry last updated in 2018: Oncology Centre Ashgabat, Balkan Regional Centre in Balkanabat, Dashoguz Regional Centre, Lebap Regional Centre in Türkmenabat and Mary Regional Centre. OnCo has no source stating that the directory's Ashgabat centre is the same institution as the ministry's centre.",
          links: [
            { label: "Ministry of Health and Medical Industry: Scientific-Clinical Center of Oncology", url: MOH_ONCOLOGY },
            { label: "Ministry of Health and Medical Industry: central treatment and prophylactic institutions", url: MOH_CENTRAL },
            { label: "Ministry of Health and Medical Industry: cancer strategy 2016 to 2018 (Russian, PDF, ICCP portal)", url: STRATEGY_2016 },
            { label: "WHO: Cancer Country Profile 2020, Turkmenistan (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "radiotherapy",
          title: "Five radiotherapy centres in the IAEA's table, in an entry eight years old",
          plain:
            "The public country table of the IAEA's Directory of Radiotherapy Centres gives Turkmenistan, last updated in 2018, 5 radiotherapy centres, 7 high-energy photon and electron beam units and 4 brachytherapy units. That entry is eight years old, and OnCo found no newer public count.",
          detail:
            "The directory's data feed, read on 17 November 2026, puts two linear accelerators at the Oncology Centre Ashgabat and cobalt-60 units at the four regional centres (one each in Balkanabat, Dashoguz and Türkmenabat, two in Mary), and marks brachytherapy at every centre except Mary. WHO's 2020 profile recorded 12.0 external beam radiotherapy units per 10,000 cancer patients for 2019, 27.5 CT scanners and 20.6 MRI scanners per 10,000 cancer patients for 2020, and no PET scanner. WHO's 2021 cervical profile gave 10 radiotherapy units and 6 brachytherapy units per 10,000 cancer patients for 2018 and listed radiotherapy, chemotherapy and cancer surgery as generally available. The numbers of radiation oncologists and medical physicists were not available in either profile. OnCo read no source on waiting times, on which machines are in service today, or on patients travelling abroad for treatment.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries table", url: DIRAC },
            { label: "IAEA: DIRAC public data feed, one row per centre (JSON)", url: DIRAC_FEED },
            { label: "WHO: Cancer Country Profile 2020, Turkmenistan (PDF)", url: WHO_PROFILE },
            { label: "WHO: Cervical Cancer Country Profile 2021, Turkmenistan (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "plan",
          title: "A cancer strategy for 2016 to 2018, and an international review of cancer services in September 2025",
          plain:
            "The latest national cancer plan OnCo could read is the ministry's strategy for the prevention, early detection and treatment of malignant neoplasms for 2016 to 2018. From 8 to 13 September 2025 the IAEA, IARC and WHO carried out a review of cancer services in Ashgabat and the Dashoguz region; OnCo found no published report of it.",
          detail:
            "The ICCP portal's search for Turkmenistan on 16 November 2026 returned that strategy, a national non-communicable disease strategy for 2014 to 2020 approved by presidential decree in May 2014, and WHO's profiles, and no cancer plan after 2018. WHO's 2020 profile recorded the national cancer plan and the integrated non-communicable disease plan as operational in 2019. The ministry's list of state programmes, read on 16 November 2026, includes a non-communicable disease strategy for 2021 to 2025 by title and no programme named for cancer. WHO's page on the 2025 review says the team visited the Scientific-Clinical Centre of Oncology and the Dashoguz oncology hospital, assessed access to essential cancer medicines, and presented preliminary findings and recommendations at a closing session. In December 2025 WHO ran a training course for oncologists at the centre on port systems and catheter-based chemotherapy, with support from the United Nations Development Programme.",
          links: [
            { label: "Ministry of Health and Medical Industry: cancer strategy 2016 to 2018 (Russian, PDF, ICCP portal)", url: STRATEGY_2016 },
            { label: "ICCP portal: resources search for Turkmenistan", url: ICCP_SEARCH },
            { label: "National strategy on non-communicable diseases 2014 to 2020 (English, PDF, ICCP portal)", url: NCD_2014 },
            { label: "Ministry of Health and Medical Industry: state programmes and strategies", url: MOH_PROGRAMMES },
            { label: "WHO Europe: IAEA, IARC and WHO imPACT Review mission in Turkmenistan, 8 to 13 September 2025", url: WHO_IMPACT_2025 },
            { label: "WHO Turkmenistan: advanced oncology training, 1 to 3 December 2025", url: WHO_TRAINING_2025 },
            { label: "WHO: Cancer Country Profile 2020, Turkmenistan (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Turkmenistan", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Turkmenistan",
          plain:
            "None of the trials in OnCo's records lists Turkmenistan among its countries, and a query of ClinicalTrials.gov for cancer studies with a site there returned none on 16 November 2026. Anyone looking for a trial should search the registry itself and ask the treating centre.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Turkmenistan. The registry's own search interface, queried the same day for the condition cancer and the location Turkmenistan, returned a total of 0 studies. A Europe PMC search for papers with Turkmenistan in the title and cancer, oncology, tumour or neoplasm anywhere returned four papers, none of them a study of cancer patients or cancer services in the country; one modelled hepatitis B vaccination in six countries including Turkmenistan. A wider search on 17 November 2026, for Turkmenistan in the title or abstract and a cancer term in the title, returned 14 papers, regional and global studies in which Turkmenistan is one country among several; OnCo has not read them for this page and takes no figure from them. OnCo has added no paper record for this page.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Turkmenistan", url: CTGOV },
            { label: "Europe PMC: papers with Turkmenistan in the title and cancer terms", url: EPMC_SEARCH },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-statistics",
      title: "No national cancer statistics, and no way to check the international ones",
      plain:
        "OnCo found no cancer registry report, no ministry statistics on cases, deaths, stage or survival, and no peer-reviewed study of cancer with Turkmenistan in its title. IARC's figures are modelled from deaths, the HPV figures are those the country reports to WHO, and the spending figures are WHO's own database rows. OnCo found no independent count to check any of them against.",
      detail:
        "Not found: counts from the registry planned in the 2016 strategy; any evaluation of that strategy; a cancer plan after 2018; the report of the September 2025 review by the IAEA, IARC and WHO; a list of registered or reimbursed cancer medicines; anything on childhood cancer services beyond WHO's 2020 estimate of 198 cases a year. A future pass should look for the review's report on the IAEA's and WHO's sites, for publications of the State Committee on Statistics, and for the next WHO country profile. Readers can ask the Scientific-Clinical Center of Oncology, whose contact details are on the ministry's page.",
      links: [
        { label: "Ministry of Health and Medical Industry: Scientific-Clinical Center of Oncology", url: MOH_ONCOLOGY },
        { label: "WHO Europe: imPACT Review mission in Turkmenistan, September 2025", url: WHO_IMPACT_2025 },
        { label: "ICCP portal: resources search for Turkmenistan", url: ICCP_SEARCH },
      ],
    },
    {
      id: "gap-unreadable",
      title: "Pages that could not be read",
      plain:
        "Two sources were reached and gave no usable text: the ministry's page on state voluntary health insurance, and an IAEA page found by search whose subject OnCo could not confirm. The site of the medicines registration centre gave application forms and exhibition notices and nothing else. An earlier version of this page said the IAEA's list of individual radiotherapy centres needed a sign-in; it was read on 17 November 2026 from the directory's public data feed, and the five centres it names match OnCo's records.",
      detail:
        "On 16 and again on 17 November 2026 the ministry's insurance page returned a heading and no body in three languages, and on 17 November the one entry it lists led to a server error (HTTP 500). An IAEA page found by search (iaea.org/node/107081) answered both days with a 403 challenge page, which OnCo did not try to get round, so nothing from it is on this page. centreg.gov.tm returns a page with a one-line description in Turkmen and loads its content by script from the site's own data feed. That feed, read on 17 November 2026, held seven notices under the heading \"Halkara Lukmançylyk sergisi\" (international medical exhibition) and two application forms addressed to the centre, in Turkmen, Russian and English: one for the state registration or re-registration of medicines and one for products for medical purposes. OnCo read the English forms; they ask for the product, applicant, manufacturer and composition and give no fees, no timelines and no list of registered medicines. OnCo did not read the laws and orders listed on the ministry's site. A future pass should read those texts in Turkmen or Russian and try the insurance page again; until then, ask the ministry or the treating hospital what is covered.",
      links: [
        { label: "Ministry of Health and Medical Industry: state voluntary health insurance", url: MOH_INSURANCE },
        { label: "Ministry of Health and Medical Industry: Center for registration of medical products and state quality control", url: MOH_REG_CENTRE },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
        { label: "IAEA: DIRAC public data feed, one row per centre (JSON)", url: DIRAC_FEED },
      ],
    },
  ],
  institutions: [
    "tm-oncology-centre-ashgabat",
    "tm-dashoguz-regional-oncology-centre",
    "tm-balkan-regional-oncology-centre",
    "tm-lebap-regional-oncology-centre",
    "tm-mary-regional-oncology-centre",
    "tm-ministry-of-health-and-medical-industry",
    "tm-centre-registration-medicines-quality-control",
    "who",
    "iarc",
    "iaea",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles, WHO's health expenditure and immunisation data, the IAEA's public radiotherapy table, the Ministry of Health and Medical Industry's own site, its 2016 to 2018 cancer strategy in Russian, and two WHO event pages from 2025. Turkmenistan publishes few health statistics, so the page is short and each statement carries its source and date.",
  verify:
    "The case and death numbers are modelled estimates, the vaccination figures are reported by the country to WHO, the spending figures are rows in WHO's health expenditure database, the radiotherapy entry dates from 2018 and the survey answers from 2019 to 2021. Anyone seeking care should ask the Scientific-Clinical Center of Oncology in Ashgabat, the regional oncology hospital or the ministry what is available and what it costs now.",
  verifyLinks: [
    { label: "Ministry of Health and Medical Industry of Turkmenistan", url: MOH },
    { label: "Ministry of Health and Medical Industry: Scientific-Clinical Center of Oncology", url: MOH_ONCOLOGY },
    { label: "WHO: Cancer Country Profile 2020, Turkmenistan (PDF)", url: WHO_PROFILE },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Turkmenistan (PDF)", url: IARC_FACTSHEET },
  ],
};
