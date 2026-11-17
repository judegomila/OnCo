import type { CountryDive } from "@/data/country-dive";

/**
 * Maldives deep dive: the hand-written cards for /countries/mv/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: the National Cancer Control Plan of Maldives 2022-2026
 * (Ministry of Health with WHO, PDF text from the ICCP portal), the Ministry of Health's National Treatment Guideline
 * for Lung Cancer (2025) and for Head and Neck Cancer (2026) and its publications pages, the Maldives Food and Drug
 * Authority's National Essential Medicines List, Review 2026 (PDF text), Indira Gandhi Memorial Hospital's pages for
 * its National Cancer Centre, the Cancer Society of Maldives' own page, IARC's GLOBOCAN 2024 fact sheet, WHO's cancer
 * country profile 2020 and cervical cancer profile 2021 (PDF text), WHO's Global Health Expenditure rows and HPV
 * coverage rows (public APIs), WHO's list of regulators at maturity levels 3 and 4 (August 2026), the IAEA DIRAC public
 * country table, the ClinicalTrials.gov API, and one review abstract through Europe PMC.
 *
 * IARC has no Maldivian incidence data: its figures are modelled from neighbouring countries. The insurer's site
 * (Aasandha) refused a script and the regulator's site was down for maintenance; each is named under `gaps`. A second
 * pass re-read every source and added the Ministry's thyroid guideline (PDF text), which is the one source read that
 * says where patients are sent for radiotherapy, the cervical screening document on the ICCP portal, and the social
 * protection agency's scheme pages.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/462-maldives-fact-sheet.pdf";
const WHO_CCP = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mdv-2020.pdf";
const WHO_CERV = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-mdv-2021-country-profile-en.pdf";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'MDV'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'MDV'";
const WHO_GGHE_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'MDV'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'MDV'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const NCCP = "https://www.iccp-portal.org/sites/default/files/plans/NCCP%202022-2026%20Maldives.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=maldives";
const MOH = "https://health.gov.mv/en";
const MOH_PUBS = "https://health.gov.mv/en/publications";
const GL_LUNG = "https://health.gov.mv/en/publications/national-treatment-guideline-for-lung-cancer";
const GL_HN = "https://health.gov.mv/en/publications/national-cancer-treatment-guideline-for-head-neck-cancer";
const GL_THYROID = "https://health.gov.mv/en/publications/national-guideline-on-the-diagnosis-and-management-of-thyroid-cancer";
const NEML = "https://health.gov.mv/en/publications/national-essential-medicine-list-review-2026";
const ADL = "https://health.gov.mv/en/publications/approved-drug-list-november-2026";
const MFDA = "https://mfda.gov.mv/en";
const AASANDHA = "https://aasandha.mv/en";
const NSPA = "https://www.nspa.gov.mv/v2/";
const IGMH_NCC = "https://www.igmh.gov.mv/en/centres/national-cancer-centre";
const IGMH_ABOUT = "https://www.igmh.gov.mv/en/about-us";
const CSM = "https://cancer.org.mv/about";
const CTGOV = "https://clinicaltrials.gov/search?country=Maldives&cond=cancer";
const SAARC_DOI = "https://doi.org/10.1016/S1470-2045(24)00514-X";

const L = {
  iarc: { label: "IARC: GLOBOCAN 2024 fact sheet, Maldives (PDF)", url: IARC_FACTSHEET },
  nccp: { label: "National Cancer Control Plan of Maldives 2022-2026 (ICCP portal, PDF)", url: NCCP },
  ccp: { label: "WHO: cancer country profile 2020, Maldives (PDF)", url: WHO_CCP },
  cerv: { label: "WHO: cervical cancer profile 2021, Maldives (PDF)", url: WHO_CERV },
  igmh: { label: "Indira Gandhi Memorial Hospital: National Cancer Centre", url: IGMH_NCC },
  neml: { label: "Maldives Food and Drug Authority: National Essential Medicines List, Review 2026", url: NEML },
};

export const MV_DIVE: CountryDive = {
  iso2: "MV",
  iso3: "MDV",
  name: "Maldives",
  flag: "🇲🇻",
  asOf: "2026-11-16",
  title: "Cancer in Maldives",
  description:
    "Cancer in the Maldives from Maldivian, WHO and peer-reviewed sources: IARC's estimate of 525 new cancers and 342 deaths in 2024, modelled from neighbouring countries, a national registry set up in 2016 that the national cancer plan says holds about a third of known patients, a government-financed insurance scheme that also pays for care abroad, out-of-pocket payments of 18.0% of health spending in 2023, a National Cancer Control Plan for 2022 to 2026, a National Cancer Centre at the largest government hospital in Malé since 2023, no radiotherapy on record, and HPV vaccination since 2019 reaching 84% of girls in 2025.",
  lede:
    "The national cancer plan describes a government-financed insurance scheme for Maldivian citizens, Aasandha, through which services the country does not have are provided abroad. The three hospitals the plan names as cancer treatment facilities are in the capital area, where the largest government hospital has housed a National Cancer Centre since 2023; the plan says chemotherapy has also reached many atoll hospitals. The national cancer plan records that this hospital has no radiotherapy, and WHO counted no radiotherapy units in the country in 2019. IARC's cancer figures for the Maldives are modelled from neighbouring countries, not counted.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Maldives is 525 new cancers and 342 deaths, an age-standardised incidence of 112.8 per 100,000 (123.6 in men, 105.1 in women) and mortality of 79.6. These are modelled figures, not counts. The fact sheet names no country-specific source for incidence and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\"; deaths are then derived from those estimates (\"National incidence estimates applied to model-based M:I ratios (registry survival data)\", with \"Survcan\" printed as the data source). The national cancer plan for 2022 to 2026 says the Maldives' own registry, set up in 2016, had registered about a third of known patients and could not yet produce incidence rates. IARC's population for the Maldives is 326,812 males and 200,997 females, and it estimates 311 cancers in men and 214 in women.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in the Maldives",
      aside: L.iarc,
      cards: [
        {
          id: "shape",
          title: "About 525 new cancers a year by IARC's estimate, modelled from neighbouring countries",
          plain:
            "IARC estimates 525 new cancers in the Maldives in 2024 and 342 cancer deaths. These are modelled figures built from neighbouring countries' data, not counts. Breast cancer is estimated to be the commonest, followed by lung cancer, cancer of the lip and mouth, thyroid cancer and colorectal cancer. Lung cancer is the commonest cause of cancer death in the estimate.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 76 breast cancers (33 deaths), 50 lung cancers (49 deaths), 43 cancers of the lip and oral cavity (29 deaths), 42 thyroid cancers (7 deaths) and 36 colorectal cancers (24 deaths). The risk of developing a cancer before age 75 is put at 12.8%, and an estimated 1,311 people are living within five years of a diagnosis. Its method box gives incidence as \"Rates based on incidence estimates or registry data from neighbouring countries\". The Ministry of Health's 2026 guideline on head and neck cancer says formal registry data remain limited and that chewing areca nut with tobacco is widespread across all atolls and is \"a primary driver\" of the risk of mouth cancer. WHO's 2020 profile estimated 9 cancers a year in children under 15.",
          links: [L.iarc, { label: "Ministry of Health: National Cancer Treatment Guideline for Head and Neck Cancer (2026)", url: GL_HN }, L.ccp],
        },
        {
          id: "registry",
          title: "A national cancer registry since 2016, not yet complete",
          plain:
            "The Maldives National Cancer Registry was set up in 2016 and is run from the Health Protection Agency. The national cancer plan for 2022 to 2026 says it had registered about one third of known cancer patients and could not yet give incidence or survival rates.",
          detail:
            "The National Cancer Control Plan 2022-2026 reports that the registry received its information as paper copies, that health facilities did not report regularly, that it had not been possible to ascertain patients' cancer stage, and that errors in disease coding had been identified in the health system. Records from the insurer Aasandha showed 2,257 cancer patients from 2015 to 2016 who were not on the registry. The plan's fifth objective is to strengthen the registry: make cancer a reportable disease, move the data into the CanReg5 software, and share data from Aasandha and civil registration. WHO's 2020 profile printed \"No information\" for a population-based registry in 2019 and rated the quality of death registration for 2007 to 2016 as low; WHO's 2021 cervical profile recorded that no population-based registry existed. OnCo found no published report of the registry's own counts.",
          links: [L.nccp, L.ccp, L.cerv],
        },
      ],
      tables: [
        {
          id: "mv-top",
          title: "IARC's five commonest cancers for the Maldives, 2024",
          caption: "Estimated new cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Modelled from neighbouring countries' data, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 76, deaths: 33 },
            { site: "Lung", cases: 50, deaths: 49 },
            { site: "Lip, oral cavity", cases: 43, deaths: 29 },
            { site: "Thyroid", cases: 42, deaths: 7 },
            { site: "Colorectum", cases: 36, deaths: 24 },
            { site: "All cancers", cases: 525, deaths: 342 },
          ],
          note: "IARC's fact sheet names no Maldivian data source for incidence; these numbers come from a model built on neighbouring countries' data. With so few cases, the ranking of individual cancers is uncertain. OnCo found no published national count to compare them with.",
          sources: [L.iarc],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: L.nccp,
      cards: [
        {
          id: "aasandha",
          title: "A government-financed insurance scheme that also pays for care abroad",
          plain:
            "The national cancer plan, citing the company's website, describes Aasandha as a state company set up in 2011 that runs the national health insurance scheme for all Maldivian citizens, fully financed by the government. The plan says cancer screening and treatment within the country are covered, and that services not available in the Maldives are provided abroad through the scheme.",
          detail:
            "The National Cancer Control Plan 2022-2026, citing the company's website, says the scheme has been called Husnuvaa Aasandha since 24 February 2014 and covers specified in-patient and out-patient treatment and medicines at public hospitals and health centres and at other facilities that have joined it. Indira Gandhi Memorial Hospital describes its services as fully covered by Aasandha. The plan is not consistent on screening: one passage says all cancer screening and treatment within the country is covered, and another says Aasandha's regulations did not cover preventive services such as screening and dietary or psychological counselling, though government hospitals gave screening free, and proposes extending cover. It cites the Ministry's National Health Accounts 2015-2017 for an estimate that 1.75 billion rufiyaa was spent on overseas referrals in 2017. That figure is for referrals abroad for all conditions; the plan does not break it down by disease, so it is not a figure for cancer. The Ministry's 2026 thyroid cancer guideline says Aasandha approves the receiving hospital and funds treatment for patients referred overseas for radioiodine. OnCo could not read Aasandha's own site, so the current rules for cancer treatment abroad are not confirmed here.",
          links: [L.nccp, { label: "Indira Gandhi Memorial Hospital: about us", url: IGMH_ABOUT }, { label: "Ministry of Health: National Guideline on the Diagnosis and Management of Thyroid Cancer (2026)", url: GL_THYROID }],
        },
        {
          id: "out-of-pocket",
          title: "Households pay about 18% of health spending themselves",
          plain:
            "WHO's figures put out-of-pocket payments at 18.0% of the Maldives' health spending in 2023, with government paying 78.9%. Health spending was about 1,159 US dollars a person. The figures cover all health care, not cancer.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending as 18.9% of current health expenditure in 2016, 20.3% in 2022 and 18.0% in 2023; domestic government spending as 78.9% in 2023; and current health expenditure as 1,159.03 US dollars a person in 2023. A 2024 review of cancer care across South Asian countries in The Lancet Oncology notes that the Maldives has few specialised cancer services for children, so that families depend on costly referrals abroad. OnCo did not find a figure for what Maldivian families spend on travel and living costs while a relative is treated in another country.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Maldives (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: health spending per person, Maldives (API)", url: WHO_CHE_API },
            { label: "WHO Global Health Expenditure Database: government share, Maldives (API)", url: WHO_GGHE_API },
            { label: "Huq et al., cancer care in the SAARC region (Lancet Oncol 2024)", url: SAARC_DOI },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: L.neml,
      cards: [
        {
          id: "mfda",
          title: "The Maldives Food and Drug Authority, with every medicine imported",
          plain:
            "Medicines in the Maldives are regulated by the Maldives Food and Drug Authority, which sits under the Ministry of Health. The Ministry's site carries its approved drug list and its national essential medicines list. The Authority states that the country relies entirely on imported medicines. WHO's list of regulators at maturity level 3 or 4 does not include the Maldives.",
          detail:
            "The Ministry's publications page lists the Authority among its departments and carries its Approved Drug List for November 2026 and the National Essential Medicines List, Review 2026, issued by the Authority's Medicine and Therapeutic Goods Division and posted on 29 July 2026. The list's foreword says importers and suppliers are required to register and keep stocks of essential medicines. Its section on anti-neoplastic medicines includes cisplatin, paclitaxel, letrozole, imatinib, rituximab, trastuzumab and bortezomib, each marked for the tertiary level of care, and tamoxifen, marked for secondary and tertiary care; morphine is listed as a controlled medicine. A list says what should be stocked, not what is on the shelf. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include the Maldives. The Authority's own website showed a maintenance notice on 16 November 2026, so its registration rules and timelines were not read.",
          links: [
            L.neml,
            { label: "Ministry of Health: Approved Drug List, November 2026", url: ADL },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Maldives (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2019, reaching 84% of girls in 2025",
          plain:
            "The Maldives introduced HPV vaccination in 2019, given to adolescent girls at primary health centres. WHO's figures show 84% of girls in the target group receiving a first dose in 2025, after 90% in the first year and a low of 57% in 2021. WHO has no figures for boys.",
          detail:
            "WHO's immunisation coverage rows for first dose in girls read 90% in 2019 (13,596 of a target of 15,163), 68% in 2020, 57% in 2021, 83% in 2022, 60% in 2023, 75% in 2024 (2,616 of 3,494) and 84% in 2025 (3,587 of 4,288). Last-dose coverage was 66% in 2020, 40% in 2021, 50% in 2022, 62% in 2023, 55% in 2024 and 84% in 2025. There are no rows with values for boys. WHO's 2021 cervical cancer profile gives 2019 as the year of introduction and girls aged 10 as the main target group. The national cancer plan for 2022 to 2026 gives first-dose coverage in the first year as 88%, not WHO's 90%, and asks for high coverage of both doses to be maintained.",
          links: [{ label: "WHO: HPV vaccination coverage rows for Maldives (public API)", url: WHO_HPV_API }, L.cerv, L.nccp],
        },
        {
          id: "screening-programmes",
          title: "Screening at well woman clinics in hospitals, with few women reached",
          plain:
            "Breast and cervical examinations are offered at well woman clinics in hospitals in Malé and Hulhumalé, with mammograms for women over 40. The national cancer plan says there was no organised screening programme in the community. WHO's 2021 profile recorded 5% of women aged 30 to 49 screened for cervical cancer in the previous five years (2019).",
          detail:
            "The National Cancer Control Plan 2022-2026 says that at community and primary health centre level there was no organised programme for screening or early detection, that community health workers were not trained in it, and that voluntary organisations screened independently of government agencies. Well woman clinics at the tertiary hospitals gave these services free at government hospitals. Outside Malé the plan's text counts four mammography machines, while its own table of hospitals outside Malé Atoll (Ministry of Health, December 2022) shows five hospitals with one each. WHO's records differ: its 2020 profile listed breast and cervical screening programmes as present in 2019, and its 2021 cervical profile listed a national programme using cytology for women aged 15 to 50, with 5% of women aged 30 to 49 screened in the last five years and 6% ever screened (2019). The ICCP portal also lists, under 2022, a document titled \"National Cervical Cancer Screening Program in Maldives\", an action plan supported by the Health Protection Agency and the Ministry of Health. OnCo found no date in its text. It says there was no organised cervical screening programme and that few women had a smear test, and it proposes screening women aged 30 to 50 every five years by visual inspection with acetic acid. OnCo found no source saying how far that proposal has been carried out.",
          links: [L.nccp, L.cerv, L.ccp, { label: "ICCP portal: resources for Maldives", url: ICCP_SEARCH }],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What the Maldives does differently",
      cards: [
        {
          id: "cancer-plan",
          title: "A national cancer plan for 2022 to 2026, written with WHO",
          plain:
            "The Ministry of Health and WHO's country office drew up the National Cancer Control Plan of Maldives 2022-2026. It has five objectives: prevention, early detection and timely diagnosis, treatment without financial burden, wider palliative care, and a working cancer registry with research.",
          detail:
            "The plan lists as its stakeholders the Ministry of Health, the Health Protection Agency, Aasandha, the National Social Protection Agency, four hospitals (ADK, Dhamanaveshi, Hulhumalé and Indira Gandhi Memorial), the Cancer Society of Maldives and WHO, and the WHO Representative's foreword says it was finalised with the support of a joint WHO and IAEA mission. It sets out actions by year, among them a referral pathway for cancer care, training atoll hospital staff to give chemotherapy safely with teleconsultation support, making morphine available in all tertiary and atoll hospitals, and extending insurance cover to screening. WHO's 2020 profile printed \"n/a\" in its row for a national cancer plan in 2019. The ICCP portal's search for the Maldives, read on 16 November 2026, returned this plan as the country's cancer plan; OnCo found no published review of progress against it.",
          links: [L.nccp, { label: "ICCP portal: resources for Maldives", url: ICCP_SEARCH }, L.ccp],
        },
        {
          id: "guidelines",
          title: "National treatment guidelines written for an island health system",
          plain:
            "The Ministry of Health has published national treatment guidelines for lung cancer (2025) and for head and neck cancer and thyroid cancer (2026). They set out who refers whom, from island health centres to oncologists in tertiary hospitals.",
          detail:
            "The lung cancer guideline, version 1 dated 29 June 2025 and adapted from the European Society for Medical Oncology's guidelines, describes a pathway from primary care to pulmonologists in regional or tertiary hospitals and then to oncologists in tertiary facilities for chemotherapy and radiotherapy. It names the difficulty it is written for: about 1,190 islands spread over roughly 90,000 square kilometres, where building many treatment centres is costly and centralising care makes travel and prompt treatment harder. The head and neck guideline, version 1 dated 18 June 2026, was published by the Ministry in collaboration with WHO Maldives. The national cancer plan for 2022 to 2026 had recorded that the country lacked national guidelines and treatment protocols. The lung guideline sends patients to oncologists in tertiary facilities \"for Chemotherapy and radiotherapy\", and the head and neck guideline treats radiotherapy as an integral part of care; a search of both texts found no mention of treatment abroad, so neither says where Maldivian patients receive radiotherapy. The thyroid guideline, version 1 dated 18 June 2026 and also published in collaboration with WHO Maldives, does: it says external beam radiotherapy and radioiodine are not available in the Maldives and that patients who need them are referred overseas through Aasandha, to centres in India and Sri Lanka.",
          links: [
            { label: "Ministry of Health: National Treatment Guideline for Lung Cancer (2025)", url: GL_LUNG },
            { label: "Ministry of Health: National Cancer Treatment Guideline for Head and Neck Cancer (2026)", url: GL_HN },
            { label: "Ministry of Health: National Guideline on the Diagnosis and Management of Thyroid Cancer (2026)", url: GL_THYROID },
            L.nccp,
          ],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy on record in the country",
          plain:
            "The public country table of the IAEA's Directory of Radiotherapy Centres has no entry for the Maldives. The national cancer plan for 2022 to 2026 says the largest government hospital, a tertiary hospital, has no radiotherapy or nuclear medicine, and that many patients are referred abroad for diagnosis and treatment. The Ministry of Health's 2026 thyroid cancer guideline says external beam radiotherapy is not available in the country and that patients who need it are referred overseas through Aasandha.",
          detail:
            "DIRAC's public table, read on 16 November 2026, lists no row for the Maldives; that is an absence from the directory, not a statement by the IAEA. WHO's 2020 profile counted zero external-beam radiotherapy units in 2019, and its 2021 cervical profile recorded radiotherapy as not generally available. The National Cancer Control Plan 2022-2026 says Indira Gandhi Memorial Hospital lacks radiotherapy, nuclear medicine, immunohistochemistry and molecular pathology, that patients are referred abroad \"at a huge cost\", that efforts were under way to establish a comprehensive cancer hospital, and that PET-CT was being planned. The plan does not name the countries or hospitals patients are sent to. The Ministry's thyroid cancer guideline (version 1, 18 June 2026) does in part: \"External beam radiotherapy and SBRT are not currently available within the Maldives. Patients requiring radiotherapy are referred overseas through the Aasandha pathway.\" It lists radioiodine, external beam radiotherapy and advanced surgery among the reasons for referral to \"Aasandha-empanelled centres in India and Sri Lanka\", and for radioiodine says the hospitals are predominantly in India. It names no hospital, and it is a guideline for one cancer, so OnCo has not confirmed that the same holds for every cancer.",
          links: [{ label: "IAEA DIRAC: public country table (read 16 November 2026)", url: DIRAC }, L.nccp, { label: "Ministry of Health: National Guideline on the Diagnosis and Management of Thyroid Cancer (2026)", url: GL_THYROID }, L.ccp, L.cerv],
        },
        {
          id: "services",
          title: "Chemotherapy and cancer surgery in the capital area, with a National Cancer Centre since 2023",
          plain:
            "Indira Gandhi Memorial Hospital in Malé, which describes itself as the largest government healthcare facility and provides tertiary care, has housed the National Cancer Centre of Maldives since 2023. It offers chemotherapy, immunotherapy, hormone therapy, cancer surgery, palliative care and weekly tumour board meetings. Chemotherapy began in the Maldives in 2015.",
          detail:
            "The hospital's page says the service began in January 2018 as a unit of general surgery with one cancer surgeon, added chemotherapy, an oncology department and a medical oncologist, and became the National Cancer Centre with a dedicated ward in 2023. The National Cancer Control Plan 2022-2026 names three hospitals in the Greater Malé area that treat cancer (ADK, Treetop and Indira Gandhi Memorial), says chemotherapy started at ADK Hospital in 2015 and later reached many atoll hospitals, and records shortages of surgical and clinical oncologists and oncology nurses. It found palliative care needs unmet, with oral morphine available at tertiary hospitals and some atoll facilities. The Cancer Society of Maldives, founded in 2012, gives psychosocial support; the plan describes its weekly support group, which patients being treated abroad join online.",
          links: [L.igmh, L.nccp, { label: "Cancer Society of Maldives: about", url: CSM }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in the Maldives",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists the Maldives among its countries, and a search of the registry itself for cancer studies with a Maldivian site returned none on 16 November 2026.",
          detail:
            "OnCo's participation data covers the trials in its graph, mostly large trials of new medicines, not every study registered; the ClinicalTrials.gov API search for cancer studies with a location in the Maldives returned a total of zero. A Europe PMC search on 16 November 2026 found few cancer papers from the Maldives, among them a 2014 study of women's knowledge, attitudes and practices on cervical cancer and a 2023 article on HPV vaccination and screening, which has no indexed abstract, alongside regional reviews that include the country. The national cancer plan makes research part of its fifth objective and suggests IARC's regional hub in Mumbai as a source of support for the registry.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Maldives", url: CTGOV }, L.nccp],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "insurance-and-referral-abroad",
      title: "The rules for treatment abroad, and which hospitals are used, could not be read",
      plain:
        "OnCo could not read the insurer's own site, so this page cannot say which cancer treatments Aasandha funds abroad, in which countries and hospitals, or what a family must arrange and pay for itself. The one source read that names a destination is the Ministry of Health's 2026 thyroid cancer guideline, which says patients needing radiotherapy or radioiodine are referred through Aasandha to centres in India and Sri Lanka; it names no hospital.",
      detail:
        "Aasandha's website answered a script with a 403 challenge page on 16 November 2026, and the National Social Protection Agency's home page is in Dhivehi. The agency has an English version, whose menu lists a Social Health Insurance Scheme and a Medical Welfare programme; Its Social Health Insurance Scheme page describes Aasandha as the national scheme giving free medical assistance to all Maldivian citizens and lists the documents asked for (an Aasandha recommendation form, a copy of the national identity card, recent medical documents and a copy of the passport); it does not say which treatments are funded abroad. Its Medical Welfare page carried only links to spending statistics. What is here about the scheme comes from the national cancer plan for 2022 to 2026, which cites Aasandha's site, from Indira Gandhi Memorial Hospital and from the Ministry's thyroid cancer guideline, which says that for radioiodine abroad Aasandha approves the receiving hospital and funds the treatment. The spending figure for overseas referrals is for 2017 and is not broken down by disease. People who need treatment abroad can ask Aasandha, the National Social Protection Agency or the National Cancer Centre at Indira Gandhi Memorial Hospital which hospitals are used and what is covered; a later pass should read Aasandha's site in a browser.",
      links: [
        { label: "Aasandha (refused a script on 16 November 2026)", url: AASANDHA },
        { label: "National Social Protection Agency (English version)", url: NSPA },
        { label: "Ministry of Health: National Guideline on the Diagnosis and Management of Thyroid Cancer (2026)", url: GL_THYROID },
        L.nccp,
      ],
    },
    {
      id: "registry-and-regulator",
      title: "No registry counts, and the regulator's site was down",
      plain:
        "There are no published counts from the Maldives' own cancer registry on this page, so every national figure is IARC's model. The regulator's website showed a maintenance notice, and the approved drug list is a spreadsheet OnCo did not check product by product.",
      detail:
        "The Health Protection Agency's site was not searched for a registry report, and whether the registry has moved to electronic reporting since 2022 is not known here. The Maldives Food and Drug Authority's site returned a maintenance page on 16 November 2026, so how a medicine is registered, how long it takes and whether approvals elsewhere are relied on were not read; the November 2026 approved list is a spreadsheet whose text includes the names tamoxifen, letrozole, imatinib, rituximab, trastuzumab and bortezomib, but OnCo did not check each product's status in it. Whether the comprehensive cancer hospital and PET-CT described as planned in the national cancer plan now exist was not found in a source. WHO's 2020 profile printed \"n/a\" for radiation oncologists and medical physicists in 2019. A later pass should read the Health Protection Agency's publications and the Authority's site once it is back.",
      links: [
        { label: "Maldives Food and Drug Authority (maintenance notice on 16 November 2026)", url: MFDA },
        { label: "Ministry of Health: publications", url: MOH_PUBS },
        L.ccp,
      ],
    },
  ],
  institutions: ["igmh-maldives", "cancer-society-of-maldives", "who", "iarc", "iaea"],
  companies: [],
  drugs: ["tamoxifen", "letrozole", "imatinib", "rituximab", "trastuzumab", "bortezomib"],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from Maldivian official sources, international agencies and one peer-reviewed review, read as raw text on 16 November 2026 and not through a summary: the National Cancer Control Plan of Maldives 2022-2026; the Ministry of Health's national treatment guidelines for lung cancer, for head and neck cancer and for thyroid cancer and its publications pages; the Maldives Food and Drug Authority's National Essential Medicines List, Review 2026; Indira Gandhi Memorial Hospital's pages; the Cancer Society of Maldives' page; IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer profile, 2021 cervical cancer profile, health expenditure rows, HPV coverage rows and August 2026 list of regulators; and the IAEA DIRAC public country table. Trials were counted from OnCo's ClinicalTrials.gov participation data and one search of the registry. A second pass re-read each source and added the thyroid guideline, the cervical screening document on the ICCP portal and the National Social Protection Agency's scheme pages. Aasandha's site and the regulator's site could not be read, and the page says so where it matters.",
  verify:
    "The national figures here are IARC's model, not counts, and the description of services comes largely from the national cancer plan for 2022 to 2026. What is treated in the Maldives, what is sent abroad and what Aasandha pays for change faster than any published source; ask the National Cancer Centre at Indira Gandhi Memorial Hospital or your treating hospital what applies to you, and Aasandha what is covered.",
  verifyLinks: [
    { label: "Ministry of Health, Maldives", url: MOH },
    { label: "Indira Gandhi Memorial Hospital: National Cancer Centre", url: IGMH_NCC },
    { label: "Aasandha", url: AASANDHA },
  ],
};
