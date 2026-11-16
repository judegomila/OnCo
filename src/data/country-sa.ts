import type { CountryDive } from "@/data/country-dive";

/**
 * Saudi Arabia deep dive: the hand-written cards for /countries/sa/ (wave 6). Every figure was read from the raw text
 * of its source on 11 November 2026, not from a summary of it: the Saudi Cancer Registry's incidence reports for
 * 2022, 2023 and 2024 (PDF text, including the 2024 report's part on the Ministry of Health's early screening
 * programme), its first mortality report (deaths in 2022) and first survival report (2005 to 2019), the National
 * Cancer Center's own pages on the Saudi Health Council site, the Ministry of Health's history page and its Health
 * Sector Transformation Program delivery plan (PDF text), the Saudi Food and Drug Authority's regulatory guidance for
 * submissions and applications (PDF text, October 2026), WHO's news release on the SFDA's maturity level 4, WHO's
 * immunisation data API rows for Saudi Arabia, the Council of Health Insurance's own pages (through the Internet
 * Archive, as chi.gov.sa did not answer), IARC's GLOBOCAN 2024 fact sheet for Saudi Arabia, and the papers' abstracts
 * through Europe PMC. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/682-saudi-arabia-fact-sheet.pdf";
const SCR_REPORTS = "https://shc.gov.sa/ar/Centers/NCC/Pages/AnnualReports.aspx";
const SCR_2024 = "https://shc.gov.sa/ar/Centers/NCC/AnnualReports/Cancer%20Incidence%20Report%202024%20-%20without%20Regions.pdf";
const SCR_2023 = "https://shc.gov.sa/ar/Centers/NCC/AnnualReports/Cancer%20Incidence%20Report%202023.pdf";
const SCR_2022 = "https://shc.gov.sa/ar/Centers/NCC/AnnualReports/Cancer%20Incidence%20Report%202022.pdf";
const SCR_MORT_2022 = "https://shc.gov.sa/ar/Centers/NCC/NationalReportsDL/Cancer%20Mortality%20Report%202022.pdf";
const SCR_SURV = "https://shc.gov.sa/ar/Centers/NCC/NationalReportsDL/Cancer%20Survival%20Report%20Saudi%20Arabia.pdf";
const NCC_HOME = "https://shc.gov.sa/en/Centers/NCC/Pages/default.aspx";
const NCC_VISION = "https://shc.gov.sa/en/Centers/NCC/Pages/Vision.aspx";
const NCC_REPORTS = "https://shc.gov.sa/en/Centers/NCC/Pages/NationalReports.aspx";
const NCC_GUIDELINES = "https://shc.gov.sa/en/Centers/NCC/Activities/Pages/NationalClinicalGuideline.aspx";
const MOH_ABOUT = "https://www.moh.gov.sa/en/Ministry/About/Pages/default.aspx";
const HSTP_PLAN = "https://www.moh.gov.sa/en/Ministry/vro/Documents/HSTP-Guide-EN.pdf";
const HSTP_PAGE = "https://www.vision2030.gov.sa/en/explore/programs/health-sector-transformation-program";
const SFDA_GUIDANCE = "https://www.sfda.gov.sa/sites/default/files/2026-10/Regulatory%20guidance%20for%20submissions%20and%20applications_V1.0.pdf";
const WHO_ML4 = "https://www.who.int/news/item/30-10-2023-saudi-arabia-regulatory-system-becomes-third-to-reach-who-maturity-level-4";
const CHI_ABOUT = "https://web.archive.org/web/20260127055957/https://www.chi.gov.sa/en/aboutchi/Pages/who-we-are.aspx";
const CHI_STATS = "https://www.chi.gov.sa/en/open-data/Pages/Indicators-and-statistics.aspx";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SAU'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'SAU'";
const DIRAC = "https://dirac.iaea.org/";
const KFSHRC_HOME = "https://www.kfshrc.edu.sa/en/home";
const CTGOV = "https://clinicaltrials.gov/search?country=Saudi%20Arabia&cond=cancer";

export const SA_DIVE: CountryDive = {
  iso2: "SA",
  iso3: "SAU",
  name: "Saudi Arabia",
  flag: "🇸🇦",
  asOf: "2026-11-11",
  title: "Cancer in Saudi Arabia",
  description:
    "Cancer in Saudi Arabia from Saudi sources: the national cancer registry's 27,771 new cancers reported in 2024, breast and colorectal cancer rising quickly, the first national survival and mortality reports, free government care for citizens and private insurance held by most foreign residents in a 2018 survey, the Ministry of Health's mammography and FIT screening for people aged 40 to 69, HPV vaccination since 2022, the Saudi Food and Drug Authority's review targets from 2027, radiotherapy waits, and 30 corpus trials with a Saudi site.",
  lede:
    "Saudi Arabia has counted cancer nationally since 1992. Its registry recorded 27,771 new cancers in 2024, most of them in Saudi citizens, with breast cancer leading in women and colorectal cancer in men, both rising quickly and both now the targets of a national screening programme for people aged 40 to 69. Citizens are treated free in government hospitals; in a 2018 national survey nearly three quarters of foreign residents had private insurance.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Saudi Arabia is 24,624 new cancers and 10,357 deaths, an age-standardised incidence of 95.8 per 100,000 (93.9 in men, 103.7 in women), for a population of 33,962,761 men, women and children of every nationality. IARC's fact sheet gives its source as the national registry and its method as national rates applied to the 2024 population; deaths are national incidence applied to modelled mortality-to-incidence ratios from registry survival data. The Saudi Cancer Registry's own count for the same year is higher: 27,771 cancers reported (27,424 analysed), including 5,728 breast cancers in women of all nationalities against IARC's 3,865. Its age-standardised rates for Saudi nationals, 141.2 per 100,000 men and 181.8 per 100,000 women, are also well above IARC's figures for the whole population. The registry's rates for non-Saudi residents are much lower, 41.3 per 100,000 men and 104.7 per 100,000 women, so a rate for everyone living in the country would sit below the Saudi figure, but neither source explains the whole difference and OnCo could not reconcile them. The registry counted 8,541 cancer deaths in 2022 and gives an age-standardised mortality of 65.8 per 100,000 men and 62.7 per 100,000 women for Saudi nationals. IARC's fact sheet does not say which registry years it used.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Saudi Arabia",
      aside: { label: "Saudi Cancer Registry: Cancer Incidence Report 2024 (PDF)", url: SCR_2024 },
      cards: [
        {
          id: "shape",
          title: "About 28,000 cancers reported in 2024, more in women than men, with a median age at diagnosis in the fifties",
          plain:
            "The national registry recorded 27,771 new cancers in 2024: 22,728 in Saudi citizens and 4,981 in foreign residents. Among Saudis, more cancers were found in women than in men, mainly because of breast and thyroid cancer. The commonest cancers were breast, colorectal and thyroid cancer, and the median age at diagnosis was 54 for women and 59 for men.",
          detail:
            "The Cancer Incidence Report 2024 counts 11,831 cancers in men and 15,940 in women of all nationalities. Among analysed Saudi cases, 9,267 were in men and 13,206 in women, a ratio of about 70 men to 100 women. In Saudi women the leading cancers were breast (4,601, 34.8%), thyroid (1,559, 11.8%), colorectal (1,322, 10.0%) and uterine body (966, 7.3%); in Saudi men colorectal (1,626, 17.5%), prostate (771, 8.3%), non-Hodgkin lymphoma (627, 6.8%), leukaemia (534) and lung (527). Women's cancers peaked at ages 45 to 59 (33.7% of cases) and men's at 60 to 74 (33.6%). 805 cancers were in children aged 0 to 14, with leukaemia and brain tumours the commonest. Breast cancer's age-standardised rate in Saudi women was 63.3 per 100,000, up from 49.7 in 2022; colorectal cancer's was 26.4 in men and 19.1 in women. IARC's GLOBOCAN 2024 fact sheet ranks colorectal cancer first for deaths (1,540) and breast cancer second (1,022).",
          links: [
            { label: "Saudi Cancer Registry: Cancer Incidence Report 2024, part II (PDF)", url: SCR_2024 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Saudi Arabia (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "stage-and-survival",
          title: "More cancers found early, and the first national survival figures",
          plain:
            "More breast and colorectal cancers are now found while still confined to where they started. In 2024 about six in ten breast cancers in Saudi women were found at a localised or earlier stage, and about half of colorectal cancers. The registry's first survival report, for Saudis diagnosed from 2015 to 2019, gives 82.4% of people with breast cancer alive five years on after allowing for other causes of death.",
          detail:
            "The 2024 report puts 60.7% of breast cancers at a localised or in situ stage, 25.7% regional and 13.0% with distant spread; in 2022 the figure for distant spread was 11.4% and in 2023 13.6%. For colorectal cancer in 2024, 52.9% were localised, 25.4% regional and 21.1% distant. Alshamsan's analysis of registry data from 2002 to 2022 found localised breast cancer rising from 26% to 52% of cases. The Cancer Survival Report 2005 to 2019 linked 137,683 records of Saudi nationals with the National Information Center to find deaths, and gives age-standardised 5-year net survival for 2015 to 2019 of 94.5% for thyroid, 82.4% for breast, 71.7% for prostate, 67.6% for cervical, 67.1% for colon, 60.6% for rectal, 37.5% for liver, 31.7% for lung and 25.9% for pancreatic cancer. These are averages for people diagnosed several years ago; stage, type and treatment matter more for any one person. Non-Saudis were left out because their deaths could be traced for only 67% of records.",
          links: [
            { label: "Saudi Cancer Registry: Cancer Incidence Report 2024, part III (PDF)", url: SCR_2024 },
            { label: "Cancer Survival Report, Saudi Arabia 2005 to 2019, table 3 (PDF)", url: SCR_SURV },
            { label: "Alshamsan, breast cancer trends in Saudi Arabia 2002 to 2022 (Cancer Treat Res Commun 2026)", url: "https://doi.org/10.1016/j.ctarc.2025.101077" },
          ],
        },
      ],
      tables: [
        {
          id: "sa-registry",
          title: "What the Saudi Cancer Registry reported, 2022 to 2024",
          caption: "Cancers reported to the registry each year, and age-standardised incidence per 100,000 (world standard) for Saudi nationals, from each year's report.",
          columns: [
            { key: "year", label: "Year of diagnosis" },
            { key: "total", label: "Cancers reported, all nationalities", numeric: true },
            { key: "saudi", label: "Of which Saudi nationals", numeric: true },
            { key: "men", label: "All cancers, Saudi men", numeric: true },
            { key: "women", label: "All cancers, Saudi women", numeric: true },
            { key: "breast", label: "Breast, Saudi women", numeric: true },
            { key: "crcmen", label: "Colorectal, Saudi men", numeric: true },
            { key: "distant", label: "Breast cancers with distant spread (%)", numeric: true },
          ],
          rows: [
            { year: "2022", total: 24470, saudi: 19419, men: 144.9, women: 159.1, breast: 49.7, crcmen: 26.2, distant: 11.4 },
            { year: "2023", total: 25864, saudi: 20496, men: 135.1, women: 172.0, breast: 58.1, crcmen: 24.1, distant: 13.6 },
            { year: "2024", total: 27771, saudi: 22728, men: 141.2, women: 181.8, breast: 63.3, crcmen: 26.4, distant: 13.0 },
          ],
          note: "Counts include cases later excluded from analysis (unknown nationality, or codes the registry's CanReg software could not convert). Rates are for Saudi nationals only; the registry analyses non-Saudis separately. The 2022 share with distant spread is read from the report's pie chart. Registries publish new cases; deaths are in a separate report.",
          sources: [
            { label: "Saudi Cancer Registry: Cancer Incidence Report 2022 (PDF)", url: SCR_2022 },
            { label: "Saudi Cancer Registry: Cancer Incidence Report 2023 (PDF)", url: SCR_2023 },
            { label: "Saudi Cancer Registry: Cancer Incidence Report 2024 (PDF)", url: SCR_2024 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry since 1992, now with deaths and survival",
      aside: { label: "Saudi Health Council: Saudi Cancer Registry annual reports", url: SCR_REPORTS },
      cards: [
        {
          id: "registry-scr",
          title: "A notifiable disease by royal decree, counted by registrars in every oncology centre",
          plain:
            "Saudi Arabia's cancer registry has covered the whole country since 1992 and is run by the National Cancer Center of the Saudi Health Council. A royal decree makes cancer a notifiable disease, so every government and private hospital must report it. It has now also published its first national reports on cancer deaths, for 2022, and on survival.",
          detail:
            "The registry's reports describe trained cancer registrars in oncology centres who abstract each case from medical records, code site and cell type with ICD-O-3 and stage with the SEER Summary Stage 2000 manual, and enter it in IARC's CanReg software; regional offices check site, morphology, stage and linkage. 92.1% of 2024 cases were confirmed by histology and 0.01% came from a death certificate alone. The first mortality report counted 8,541 cancer deaths in 2022 (7,458 Saudi nationals), including 882 breast cancer deaths in Saudi women; registrars cross-check deaths outside hospital against civil registration, death certificates and Ministry of Health vital statistics. The survival report says the registry's own follow-up was so incomplete that linkage with the National Information Center raised the share of patients known to have died from 20.8% to 33.9%. The 2024 report aims to keep the gap between diagnosis and publication to two years; its PDF was dated July 2026.",
          links: [
            { label: "Saudi Cancer Registry: Cancer Incidence Report 2024, part I (PDF)", url: SCR_2024 },
            { label: "Saudi Cancer Registry: Cancer Mortality Report 2022 (PDF)", url: SCR_MORT_2022 },
            { label: "Cancer Survival Report, Saudi Arabia 2005 to 2019 (PDF)", url: SCR_SURV },
            { label: "National Cancer Center: vision and establishment", url: NCC_VISION },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination: mammography and FIT from 40, HPV vaccine since 2022",
      aside: { label: "Saudi Cancer Registry: Cancer Incidence Report 2024, part VI (PDF)", url: SCR_2024 },
      cards: [
        {
          id: "screening-programme",
          title: "A national programme screens people aged 40 to 69 for breast and colorectal cancer",
          plain:
            "The Ministry of Health offers people aged 40 to 69 without symptoms a mammogram for breast cancer and a stool test (the faecal immunochemical test, FIT) for colorectal cancer, at screening centres and in mobile screening trucks. In 2024 it screened about 224,000 women and 241,000 people for colorectal cancer, and found about one in five of the breast cancers registered that year.",
          detail:
            "The 2024 registry report gives 223,891 women screened for breast cancer and 240,834 people for colorectal cancer, through Ministry screening centres, mobile trucks and partner sectors. After cleaning, 303,255 unique screening records were linked with the registry: 1,088 breast cancers were screen detected, 19.0% of the 5,728 registered in women, and 197 colorectal cancers, 5.4% of 3,620. Of the screen-detected breast cancers 64.7% were localised and 9.9% had distant spread; of the colorectal cancers 55.8% and 19.3%. The report does not give how many eligible people were invited or what share took part. Among privately insured people, a 2026 analysis of Council of Health Insurance data counted 102,048 breast, cervical and colorectal screening tests in 2023 and 159,496 in 2024, with no denominator. The National Cancer Center has published cost-effectiveness analyses of screening for breast, cervical, lung, colon and prostate cancer.",
          links: [
            { label: "Saudi Cancer Registry: Cancer Incidence Report 2024, part VI, Early Cancer Screening Program (PDF)", url: SCR_2024 },
            { label: "Alloghbi, cancer screening among insured beneficiaries 2023 to 2024 (Front Oncol 2026)", url: "https://doi.org/10.3389/fonc.2026.1837321" },
            { label: "National Cancer Center: national reports, including screening cost-effectiveness analyses", url: NCC_REPORTS },
          ],
        },
        {
          id: "vaccination",
          title: "HPV vaccine for girls since 2022, and hepatitis B vaccine since 1989",
          plain:
            "Saudi Arabia added the HPV vaccine, which prevents most cervical cancers, to its national programme in 2022, and reported that about six in ten girls in the target group received a first dose in 2025. Hepatitis B vaccine, which prevents liver cancers caused by that virus, has been in the national programme since 1989. Cervical cancer is already uncommon in Saudi Arabia.",
          detail:
            "In WHO's immunisation data for Saudi Arabia, the HPV vaccine is recorded as introduced nationwide in 2022, and hepatitis B vaccine from 1989, with a birth dose from 1995. The programme coverage rows Saudi Arabia reported to WHO give first-dose HPV coverage in girls of 66% of a target of 257,258 in 2022, 50% of 267,428 in 2024 and 62% of 269,774 in 2025, and last-dose coverage of 47% of 258,254 in 2023. The registry counted 157 cervical cancers in Saudi women in 2022, an age-standardised rate of 2.4 per 100,000. Alkhalawi and colleagues' analysis of 3,038 cervical cancers from 2005 to 2019 found higher rates in non-Saudi than Saudi women and the share found at a localised stage rising from 24.2% to over 40%. OnCo found no national cervical screening programme in the Ministry's 2024 report, which covers breast and colorectal screening only.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Saudi Arabia (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccine introduction rows for Saudi Arabia (API)", url: WHO_INTRO_API },
            { label: "Alkhalawi et al., fifteen-year analysis of cervical cancer trends in Saudi Arabia (East Mediterr Health J 2025)", url: "https://doi.org/10.26719/2025.31.6.380" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: free government care for citizens, and compulsory private insurance for groups the insurance council defines",
      aside: { label: "Health Sector Transformation Program delivery plan (Ministry of Health, PDF)", url: HSTP_PLAN },
      cards: [
        {
          id: "citizens",
          title: "Citizens are treated free in government hospitals, and the system is being split into health clusters",
          plain:
            "Saudi citizens receive government healthcare, including cancer treatment, free of charge. Under the Vision 2030 health reform the Ministry of Health is moving hospitals and clinics into regional health clusters overseen by a government-owned company, and plans a national insurance centre that would buy care for citizens from them, keeping it free.",
          detail:
            "The Health Sector Transformation Program delivery plan (2021) says the Ministry of Health currently provides, finances and regulates care, and sets out to separate those roles. Care is to be delivered by 22 health clusters of primary care centres, hospitals, medical cities and specialised hospitals: five launched first by ministerial decree to test the concept, and seventeen through business units supervised by a government-owned health holding company. A Center for National Health Insurance, funded by the Ministry of Finance, is to buy services from the clusters under a benefit package based on clinical and cost effectiveness, so that the citizen keeps 100% comprehensive medical coverage free of charge. The plan lists a cancer control initiative for breast and colon cancer, and an initiative to strengthen the National Cancer Center's role in policy and early detection. OnCo could not read the Vision 2030 site's current page on the programme, which refused a plain request, and found no published benefit package listing cancer medicines; see the gaps.",
          links: [
            { label: "Health Sector Transformation Program delivery plan (Ministry of Health, PDF)", url: HSTP_PLAN },
            { label: "Vision 2030: Health Sector Transformation Program", url: HSTP_PAGE },
            { label: "Ministry of Health: about the Ministry", url: MOH_ABOUT },
          ],
        },
        {
          id: "private-insurance",
          title: "Private health insurance is compulsory for the groups the Council of Health Insurance defines",
          plain:
            "Health insurance is compulsory for the groups the Council of Health Insurance defines, and it is mostly bought by employers. In a 2018 national survey about a quarter of adults had private insurance: nearly three quarters of foreign residents but only one in eight Saudis.",
          detail:
            "The Council of Health Insurance says it was established by Cabinet Decision No. 71 of 27/4/1420 AH (11 August 1999) to oversee the Cooperative Health Insurance System, and that Cabinet Decision No. 85 of 28/01/1445 AH gives it the job of enforcing mandatory insurance, defining the groups that must be covered, accrediting providers and running the NPHIES insurance exchange. It publishes a mandatory policy document and a drug formulary; OnCo did not read what they say about cancer treatment. Althabaiti and colleagues' analysis of the 2018 Saudi Family Health Survey, 8,276 adults, found 26.2% privately insured, 72.8% of non-Saudis against 12.1% of Saudis, and lower outpatient use among the privately insured than among people using government care. They describe the reform as aiming to reduce government spending and rely more on employer insurance. The Council's current beneficiary statistics are drawn by script and could not be read; see the gaps.",
          links: [
            { label: "Council of Health Insurance: who we are (read through the Internet Archive)", url: CHI_ABOUT },
            { label: "Althabaiti et al., private health insurance enrollees in Saudi Arabia (PLoS One 2026)", url: "https://doi.org/10.1371/journal.pone.0312887" },
            { label: "Council of Health Insurance: statistics and indicators", url: CHI_STATS },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves medicines: the Saudi Food and Drug Authority",
      aside: { label: "SFDA: regulatory guidance for submissions and applications (PDF)", url: SFDA_GUIDANCE },
      cards: [
        {
          id: "sfda-card",
          title: "Rated at WHO's top maturity level, with set review times from January 2027",
          plain:
            "The Saudi Food and Drug Authority approves medicines in Saudi Arabia. In 2023 WHO rated it at maturity level 4, its highest. From 1 January 2027 its new guidance sets target review times: 30 or 60 working days for a medicine already approved in the United States or the European Union, 60 for a breakthrough medicine and 160 for priority review.",
          detail:
            "WHO's release of 30 October 2023 says the SFDA was established in 2003 as the sole agency responsible for regulatory oversight of medical products, was benchmarked for medicines and vaccines in November 2022, and reached maturity level 4, which WHO's Assistant Director-General called the first in the Eastern Mediterranean and the third worldwide. The SFDA's regulatory guidance for submissions and applications (version 1.0, October 2026) replaces its earlier framework from 1 January 2027. Its targets count working days of assessment and stop while the SFDA waits for the applicant: 205 days for an innovative product already registered with a stringent regulatory authority, 250 for one that is not, 160 for priority review (which includes first generics and biosimilars and certain products made entirely in the Kingdom), 60 under the Breakthrough Medicine Program, and 30 for the verification and 60 for the abridged routes, which rely on a prior US FDA or EMA approval. These are targets, not measured times; OnCo found no published record of how long cancer medicines actually took.",
          links: [
            { label: "SFDA: regulatory guidance for submissions and applications, V1.0, appendix I (PDF)", url: SFDA_GUIDANCE },
            { label: "WHO: Saudi Arabia regulatory system becomes third to reach WHO maturity level 4 (30 October 2023)", url: WHO_ML4 },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy: twenty units surveyed, and waits longest in public centres",
      aside: { label: "Mulla et al., radiotherapy access in Saudi Arabia (Front Oncol 2026)", url: "https://doi.org/10.3389/fonc.2026.1802072" },
      cards: [
        {
          id: "rt-capacity",
          title: "Public centres treat the most patients with fewer machines per patient",
          plain:
            "A survey of radiotherapy units in Saudi Arabia in late 2025 found that public hospitals treated the most patients but had fewer machines per patient and longer waits, with waits for radical treatment often longer than two weeks and sometimes longer than six. Most centres said delays in buying equipment through tenders hurt their care.",
          detail:
            "Mulla and colleagues surveyed the supervisors and managers of 20 radiotherapy units between 24 September and 23 October 2025 about staffing, equipment, patient volumes and waiting times in 2024; 85% responded. Public facilities had the highest caseloads, fewer linear accelerators per patient and higher clinician workloads; waits for radical treatment often exceeded 14 days and in some cases 42 days. Centres mixing public and private work had the most machine capacity and advanced technology. 65% of centres, most of them public, said tendering delays for equipment severely or critically affected care, and most public departments rated their staffing inadequate. The abstract gives no national count of machines. The National Cancer Center has a standing committee on radiotherapy, cyclotron and PET, and lists national proton therapy guidelines. OnCo could not read the IAEA's DIRAC directory of radiotherapy centres for Saudi Arabia or the Center's 2018 report on radiotherapy equipment; see the gaps.",
          links: [
            { label: "Mulla et al., radiotherapy access in Saudi Arabia (Front Oncol 2026)", url: "https://doi.org/10.3389/fonc.2026.1802072" },
            { label: "National Cancer Center: national clinical guidelines", url: NCC_GUIDELINES },
            { label: "IAEA: DIRAC, directory of radiotherapy centres", url: DIRAC },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What is being done",
      title: "What is being done",
      cards: [
        {
          id: "ncc-role",
          title: "A national cancer centre that sets guidelines and publishes the numbers",
          plain:
            "The National Cancer Center of the Saudi Health Council writes national treatment guidelines, runs the registry and publishes cost-effectiveness studies of screening. Its stated goals include tracking what cancer costs patients and the system, and making more cancer medicines and devices in the Kingdom.",
          detail:
            "The Center's pages list national clinical guidelines for breast, lung, gastrointestinal, ovarian, prostate, kidney, bladder and testicular cancer, mantle cell and primary CNS lymphoma, lung cancer screening and prevention, palliative care and proton therapy, several of them dated 2019. Its strategic goals are to update national cancer plans and policies on screening, prevention, treatment, rehabilitation and survivorship, to adopt new treatments and protocols, to govern and classify cancer services on evidence, to follow the financial burden of cancer, to follow local manufacture of cancer medicines and devices, to manage the cancer data bank, and to direct cancer research. It has a standing committee on CAR-T cell therapy. OnCo found no published national cancer control plan with targets, costs and dates; see the gaps. King Faisal Specialist Hospital and Research Centre, whose site says it treats nearly a quarter of cancers in the Kingdom each year, provided one of the reviewers of the registry's 2024 report.",
          links: [
            { label: "Saudi Health Council: National Cancer Center", url: NCC_HOME },
            { label: "National Cancer Center: national clinical guidelines", url: NCC_GUIDELINES },
            { label: "King Faisal Specialist Hospital and Research Centre: home page", url: KFSHRC_HOME },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials: multinational late-phase trials, with research concentrated in Riyadh",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Saudi Arabia", url: CTGOV },
      cards: [
        {
          id: "trials-saudi",
          title: "Saudi hospitals take part in multinational phase 3 cancer trials, but few patients have been in one",
          plain:
            "30 cancer trials in OnCo's records list a site in Saudi Arabia, most of them large phase 3 trials run by drug companies or international cooperative groups in breast cancer, lung cancer, myeloma and lymphoma. A 2026 survey found that fewer than one in three Saudi cancer patients would be willing to join a trial.",
          detail:
            "The trials in our records with a Saudi site include DESTINY-Breast06, 09 and 11, monarchE, CAMBRIA and RxPONDER in breast cancer, lung cancer trials of adagrasib, amivantamab, sigvotatug vedotin and nivolumab with relatlimab, myeloma trials of talquetamab and a BCMA CAR-T, and children's cancer trials from the Children's Oncology Group. Aldurdunji's analysis of 1,502 studies with a Saudi site registered on ClinicalTrials.gov to August 2025 found 75.5% interventional, more late-phase than early-phase work, 73.0% sponsored outside industry, activity concentrated in Riyadh with smaller hubs in Jeddah and Dammam, and results posted for only 12.1%. Alkaiyat and colleagues surveyed 367 cancer patients in 2023 and 2024: 1.9% had been in a trial, 31.6% would join one and 64% would join an observational study, and fear of side effects (61.6%) and lack of information (46.3%) were the main barriers.",
          links: [
            { label: "Aldurdunji, clinical research in Saudi Arabia on ClinicalTrials.gov to 2025 (Medicine 2026)", url: "https://doi.org/10.1097/md.0000000000048740" },
            { label: "Alkaiyat et al., participation in oncology clinical trials in Saudi Arabia (JCO Glob Oncol 2026)", url: "https://doi.org/10.1200/go-25-00254" },
            { label: "ClinicalTrials.gov: cancer studies with a site in Saudi Arabia", url: CTGOV },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry-vs-iarc",
      title: "The registry's rates and IARC's estimate do not match, and OnCo could not reconcile them",
      plain:
        "The Saudi Cancer Registry reports more cancers in 2024 than IARC estimates for the same year, and age-standardised rates for Saudi citizens far above IARC's rate for the whole population. Neither source explains the difference, so this page gives both and does not choose.",
      detail:
        "IARC's fact sheet gives 24,624 cancers and an incidence of 93.9 per 100,000 men and 103.7 per 100,000 women in 2024, built on national registry rates. The registry reported 27,771 cancers in 2024 and, for Saudi nationals only, 141.2 and 181.8 per 100,000. The registry publishes rates for non-Saudi residents separately, and they are much lower (41.3 per 100,000 men and 104.7 per 100,000 women in 2024), but it does not publish a rate for all nationalities combined, and IARC does not state which registry years it used, so OnCo could not check how much of the gap that explains. Readers comparing Saudi Arabia with other countries should say which source they are using. The registry's 2024 report was published without its regional tables.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Saudi Arabia (PDF)", url: IARC_FACTSHEET },
        { label: "Saudi Cancer Registry: Cancer Incidence Report 2024 (PDF)", url: SCR_2024 },
      ],
    },
    {
      id: "gap-insurance-numbers",
      title: "How many people are insured, and what insurance pays for in cancer, could not be read",
      plain:
        "OnCo could not read the Council of Health Insurance's current count of insured people, its mandatory policy document or its drug formulary, so this page does not say which cancer treatments private insurance must pay for, or how many residents it covers today.",
      detail:
        "chi.gov.sa did not answer a plain request on 11 November 2026. Its pages were read through the Internet Archive, but the statistics page draws its figures by script and returned no numbers, and the policy and formulary pages timed out. Press reports quote beneficiary counts attributed to the Council; they were not used. The planned Center for National Health Insurance's benefit package for citizens, which the 2021 delivery plan says will be based on clinical and cost effectiveness, was not found in published form, and OnCo found no national cost-effectiveness threshold.",
      links: [
        { label: "Council of Health Insurance: statistics and indicators", url: CHI_STATS },
        { label: "Health Sector Transformation Program delivery plan (PDF)", url: HSTP_PLAN },
      ],
    },
    {
      id: "gap-radiotherapy-plan",
      title: "No national count of radiotherapy machines, and no published national cancer plan",
      plain:
        "OnCo found no current national count of radiotherapy centres or machines in Saudi Arabia, and no published national cancer control plan with targets and dates. The Vision 2030 programme page on health and the IAEA's radiotherapy directory could not be read.",
      detail:
        "The IAEA's DIRAC directory loads its data by script and returned none to a plain request. The National Cancer Center's 2018 report on radiotherapy equipment, in Arabic, did not finish downloading within two minutes and was not read. The Vision 2030 page on the Health Sector Transformation Program returned HTTP 403 and its archived copy holds no text; the program's 2023 annual report link returned 404. The Ministry's 2021 delivery plan was read instead. Workforce figures for oncologists, radiation oncologists and physicists were not found in a primary source. No proton therapy centre was found in operation. The National Cancer Center's 2019 proton therapy guideline says the Saudi Particle Therapy Center was setting up a proton unit at King Fahad Medical City in Riyadh, and the updated national guideline published in the Saudi Medical Journal in 2025 says that centre is still making efforts to establish proton therapy in the Kingdom. King Faisal Specialist Hospital's own pages do not mention proton therapy.",
      links: [
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: DIRAC },
        { label: "National Cancer Center: national reports", url: NCC_REPORTS },
        { label: "Vision 2030: Health Sector Transformation Program", url: HSTP_PAGE },
        { label: "National Cancer Center: Saudi Arabia national proton beam therapy guidelines, 2019 (PDF)", url: "https://shc.gov.sa/ar/Centers/NCC/Activities/Documents/Proton%20Therapy%20Clinical%20Guidelines%20Final%20(18042019).pdf" },
        { label: "Proton beam therapy indications in Saudi Arabia: a SARO clinical practice guideline (Saudi Med J 2025)", url: "https://doi.org/10.15537/smj.2025.46.11.20250572" },
      ],
    },
    {
      id: "gap-other",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: how long cancer medicines actually take to be approved and reimbursed, waiting times from diagnosis to treatment nationally, the Saudi Clinical Trials Registry's own counts, and cervical screening coverage.",
      detail:
        "The SFDA publishes target review times, not measured ones, and OnCo found no list of cancer medicines with their Saudi approval dates. The national waiting-time figures here come from one survey of radiotherapy units. The SFDA's Saudi Clinical Trials Registry was not read, so the trial counts on this page come from ClinicalTrials.gov through OnCo's records and Aldurdunji's analysis. The Ministry's screening programme report covers breast and colorectal cancer; OnCo found no national figure for cervical screening. The survival report covers Saudi nationals only, and its figures are for people diagnosed from 2015 to 2019.",
      links: [
        { label: "SFDA: regulatory guidance for submissions and applications (PDF)", url: SFDA_GUIDANCE },
        { label: "Cancer Survival Report, Saudi Arabia 2005 to 2019 (PDF)", url: SCR_SURV },
      ],
    },
  ],
  institutions: [
    "saudi-ministry-of-health", "saudi-national-cancer-center", "saudi-cancer-registry", "sfda", "saudi-council-of-health-insurance",
    "kfshrc", "saudi-stem-cells-donor-registry", "king-faisal-foundation", "iarc", "who",
  ],
  companies: [],
  drugs: [],
  trials: [
    "destiny-breast06", "destiny-breast09", "destiny-breast11", "monarche", "cambria", "rxponder", "impassion131", "nct03997123", "nct05296798",
    "nct06875310", "nct06667076", "nct06561386", "nct06758401", "nct02542293", "nct04155034",
    "nct06208150", "nct04133636", "quintessential-2", "nct06911502", "golseek-1", "amplify",
    "nct06256588", "nct06467357", "emerald-3", "decision-sorafenib", "exam", "outback",
    "acns1422", "agct1531", "nct02521493",
  ],
  papers: [
    "paper-alshamsan-breast-trends-saudi-2002-2022-ctarc-2026", "paper-alshamsan-colorectal-trends-saudi-2002-2023-pmedr-2026", "paper-alkhalawi-cervical-trends-saudi-emhj-2025",
    "paper-alloghbi-insured-screening-saudi-front-oncol-2026", "paper-althabaiti-private-insurance-saudi-plos-one-2026", "paper-mulla-radiotherapy-access-saudi-front-oncol-2026",
    "paper-aldurdunji-saudi-clinicaltrials-gov-medicine-2026", "paper-alkaiyat-trial-willingness-saudi-jco-go-2026",
  ],
  people: [],
  how:
    "Every card was written from Saudi official sources and peer-reviewed papers, read in full rather than through a summary: the Saudi Cancer Registry's incidence reports for 2022, 2023 and 2024, its first mortality and survival reports, and the National Cancer Center's pages, all on the Saudi Health Council site; the Ministry of Health's history page and its Health Sector Transformation Program delivery plan; the SFDA's October 2026 regulatory guidance; WHO's release on the SFDA and WHO's immunisation data; the Council of Health Insurance's own description of itself, through the Internet Archive; IARC's GLOBOCAN 2024 fact sheet; and the abstracts of the papers listed, resolved through Europe PMC. The trials are those in OnCo's records whose ClinicalTrials.gov entry lists a Saudi site, leaving out one acromegaly trial.",
  verify:
    "Registry figures describe cancers reported to the registry, and its rates are for Saudi citizens; IARC's are estimates for everyone living in the country, and the two differ. What government hospitals offer, what an insurance policy covers and which medicines are registered change faster than published reports; ask the treating hospital's oncology department, your insurer or the Council of Health Insurance what applies to you. Screening is offered through Ministry of Health screening centres and health clusters, and the vaccine schedule through primary care.",
  verifyLinks: [
    { label: "Ministry of Health, Saudi Arabia", url: "https://www.moh.gov.sa/" },
    { label: "Saudi Health Council: National Cancer Center", url: NCC_HOME },
    { label: "Saudi Food and Drug Authority", url: "https://www.sfda.gov.sa/" },
    { label: "Council of Health Insurance", url: "https://www.chi.gov.sa/" },
  ],
};
