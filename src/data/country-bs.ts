import type { CountryDive } from "@/data/country-dive";

/**
 * Bahamas deep dive: the hand-written cards for /countries/bs/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for the Bahamas (PDF
 * text), the National Health Insurance Authority's home page and questions page, the National Prescription Drug Plan's
 * own site, PAHO's release on the imPACT review (dated 14 April 2026, published 29 April), The Tribune's reports of
 * 4 February 2026 (medicine
 * regulation), 16 June 2026 (the drug plan's move to the insurance authority) and 13 October 2020 (patients from Grand
 * Bahama), the Healthy Caribbean Coalition's 2022 rapid assessment of access to essential NCD medicines (PDF text),
 * CARPHA's pages on the Caribbean Regulatory System, IARC's page on its Caribbean Cancer Registry Hub, WHO's 2014 and
 * 2020 cancer
 * profiles and 2021 cervical cancer profile (PDF text), WHO's HPV coverage, vaccine introduction and health
 * expenditure rows from its public data APIs, IAEA DIRAC's public equipment data, and the papers' abstracts through
 * Europe PMC.
 *
 * Not read: the Public Hospitals Authority's site (phabahamas.org shows only an "under construction" notice), the
 * Ministry of Health and Wellness's pages on bahamas.gov.bs (the address tried returned 404), the Pharmacy Act on the
 * government's law site (HTTP 403 at first, no connection on the second pass), and IAEA's own page on the imPACT
 * review (HTTP 403). No page for a "Bahamas National Drug Agency" was found. These are named under `gaps`.
 *
 * Second pass, 16 November 2026: every claim re-read against its source. Corrected: the Caribbean Regulatory System's
 * reference authorities had been taken from its COVID-19 emergency table, not its standing list. Added from sources the
 * first pass had not opened: the drug plan's 2019 to 2021 formulary and NHI's benefits package (both PDF text).
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/44-bahamas-fact-sheet.pdf";
const NHI = "https://www.nhibahamas.gov.bs/";
const NHI_FAQ = "https://www.nhibahamas.gov.bs/faqs/";
const NPDP = "https://www.nibdrugplan.com/";
const PAHO_IMPACT = "https://www.paho.org/en/news/29-4-2026-comprehensive-cancer-control-assessment-bahamas";
const TRIBUNE_PHARMACY = "https://www.tribune242.com/news/2026/feb/04/pharmacy-practices-exposed-by-tribune-unlawful-and-unsafe-says-government/";
const TRIBUNE_NHI = "https://tribune242.com/news/2026/jun/16/pharmacy-concern-over-drug-plans-nhi-switch/";
const TRIBUNE_FREEPORT = "https://www.tribune242.com/news/2020/oct/13/covid-limits-show-need-freeport-cancer-centre/";
const NPDP_FORMULARY = "https://www.nibdrugplan.com/wp-content/uploads/2025/05/2019-2021-Formulary-Listing-Doc-rev1.pdf";
const NHI_BENEFITS = "https://www.nhibahamas.gov.bs/wp-content/uploads/Primary-Care-Benefits-Package.pdf";
const HCC_2022 = "https://www.healthycaribbean.org/wp-content/uploads/2023/04/Equitable-Access-to-Essential-Medicines-for-Non-Communicable-Diseases-in-the-Caribbean-Rapid-Assessment-Report-HCC-May-22.pdf";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/FAQ";
const GICR_HUB = "https://gicr.iarc.who.int/hub/caribbean/";
const WHO_2014 = "https://www.iccp-portal.org/sites/default/files/plans/CCC_Bahamas_2014.pdf";
const WHO_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/bhs_2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-bhs-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BHS'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'BHS'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BHS'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'BHS'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'BHS'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Bahamas&cond=cancer";
const DONENBERG_2011 = "https://doi.org/10.1007/s10549-010-1156-9";
const TROTTIER_2016 = "https://doi.org/10.1111/cge.12602";
const MUNGRUE_2016 = "https://doi.org/10.4137/BCBCR.S32792";
const JONES_CERVIX_2017 = "https://doi.org/10.1007/s10552-017-0964-1";
const JONES_PROSTATE_2017 = "https://doi.org/10.1007/s10552-017-0940-9";
const ROBERTS_2017 = "https://doi.org/10.1007/s10552-017-0972-1";
const HEIJNSDIJK_2022 = "https://doi.org/10.1001/jamahealthforum.2022.1116";

export const BS_DIVE: CountryDive = {
  iso2: "BS",
  iso3: "BHS",
  name: "the Bahamas",
  flag: "🇧🇸",
  asOf: "2026-11-16",
  title: "Cancer in the Bahamas",
  description:
    "Cancer in the Bahamas from its own and international sources: IARC's estimate of 1,116 new cancers and 525 deaths in 2024, modelled from deaths because IARC holds no national incidence data, a BRCA1 founder mutation found in 23% of women with breast cancer in one study of 214, a prescription drug plan that covers breast and prostate cancer, no national drug registration system by the Chief Pharmacist's account, one radiotherapy centre in IAEA's directory, and a national cancer review begun in 2026.",
  lede:
    "IARC holds no national incidence data for the Bahamas, so its figures are a model built from deaths: 1,116 new cancers and 525 deaths in 2024, with prostate and breast cancer the commonest and breast cancer causing the most deaths. In a study of 214 Bahamian women with breast cancer, 23% carried an inherited BRCA1 mutation. Radiotherapy is listed at one centre, in Nassau.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Bahamas is 1,116 new cancers and 525 deaths, an age-standardised incidence of 173.2 per 100,000 (179.0 in men, 175.9 in women) and mortality of 80.8. The fact sheet gives the country-specific incidence data source as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\", so new cases are modelled from deaths, not counted. For mortality the source is \"WHO (national)\" and the method \"Trends in national rates projected to 2024\". The fact sheet's table lists 0 new thyroid cancers and 2 kidney cancers for the year, so the figures for individual, less often fatal cancers should be read with the method in mind. WHO's 2020 and 2021 profiles record that a population-based cancer registry exists, but OnCo found no published incidence report from it. The all-cancer total is the same with and without non-melanoma skin cancer.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the Bahamas",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Bahamas (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,100 new cancers a year, with breast cancer causing the most deaths",
          plain:
            "IARC estimates 1,116 new cancers in the Bahamas in 2024, 539 in men and 577 in women, and 525 cancer deaths. Prostate cancer is the commonest by new cases and breast cancer second, but breast cancer is first by deaths. These are modelled estimates, not counts.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 260 prostate cancers (70 deaths), 208 breast cancers (87 deaths), 131 colorectal cancers (60 deaths), 68 cervical cancers (32 deaths) and 67 cancers of the corpus uteri (22 deaths). In men the leading cancers are prostate (260, 48.2%), colorectum (72) and non-Hodgkin lymphoma (27); in women, breast (208, 36.0%), cervix (68, 11.8%) and corpus uteri (67). Lung cancer is eighth by new cases (37) and fourth by deaths (35). The risk of developing cancer before 75 is 17.2% and of dying of it 8.8%. PAHO said in April 2026 that nearly half of the women diagnosed with breast cancer in the Bahamas are under 50 and almost half present at an advanced stage.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bahamas (PDF)", url: IARC_FACTSHEET },
            { label: "PAHO: comprehensive cancer control assessment in The Bahamas (dated 14 April 2026, published 29 April)", url: PAHO_IMPACT },
          ],
        },
        {
          id: "registry",
          title: "A cancer registry that WHO records as existing, with no published counts found",
          plain:
            "WHO's 2014 profile said the Bahamas had no cancer registry. Its 2020 and 2021 profiles record a population-based registry. IARC's 2024 estimate still lists no incidence data for the country, and OnCo found no incidence report published by a Bahamian registry.",
          detail:
            "The counted figures OnCo found come from single studies. A review of medical records, starting from data held by the National Oncology Board of the Bahamas, found 270 women with a confirmed diagnosis of breast cancer from 2009 to 2011, with a mean age at diagnosis of 56.6 years, most presenting at stage II or later, and New Providence having the highest occurrence among the islands. The IARC Caribbean Cancer Registry Hub, based at the Caribbean Public Health Agency in Trinidad and Tobago, lists the Bahamas among the countries it covers. The cancer review that began in 2026 with PAHO, IAEA and IARC covers the whole of cancer control; its report had not been published when this page was written.",
          links: [
            { label: "WHO: cancer country profile, Bahamas (2014, PDF)", url: WHO_2014 },
            { label: "WHO: cancer country profile, Bahamas (2020, PDF)", url: WHO_2020 },
            { label: "Mungrue et al., breast cancer in the Bahamas 2009 to 2011 (Breast Cancer (Auckl) 2016)", url: MUNGRUE_2016 },
            { label: "IARC Global Initiative for Cancer Registry Development: Caribbean hub", url: GICR_HUB },
          ],
        },
      ],
      tables: [
        {
          id: "bs-top",
          title: "IARC's leading cancers for the Bahamas, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 260, deaths: 70 },
            { site: "Breast", cases: 208, deaths: 87 },
            { site: "Colorectum", cases: 131, deaths: 60 },
            { site: "Cervix uteri", cases: 68, deaths: 32 },
            { site: "Corpus uteri", cases: 67, deaths: 22 },
            { site: "Non-Hodgkin lymphoma", cases: 51, deaths: 16 },
            { site: "Stomach", cases: 41, deaths: 31 },
            { site: "Lung", cases: 37, deaths: 35 },
            { site: "All cancers", cases: 1116, deaths: 525 },
          ],
          note: "IARC lists no incidence data for the Bahamas: new cases are modelled from national mortality estimates and mortality-to-incidence ratios, so this is the table a published registry report would replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Bahamas (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "National Prescription Drug Plan", url: NPDP },
      cards: [
        {
          id: "drug-plan",
          title: "A national prescription drug plan that covers breast and prostate cancer",
          plain:
            "The National Prescription Drug Plan, created by legislation in 2009, improves access to medicines for chronic conditions through public and private pharmacies. Breast cancer and prostate cancer are on its list of covered conditions. It is open to named groups, not to everyone.",
          detail:
            "The plan's site lists its conditions as rheumatic disease, asthma, benign prostate hypertrophy, breast cancer, diabetes, epilepsy, glaucoma, high cholesterol, hypertension, coronary heart disease and cardiomyopathy, prostate cancer, psychiatric illness, sickle cell anaemia and thyroid disease. The groups it names include Bahamian citizens aged 65 or over who are not eligible for a National Insurance pension, children under 18 (or under 25 in full-time education) with a covered condition, and indigent persons. The site says the National Insurance Board manages the plan; The Tribune reported in June 2026 that it was being moved to the National Health Insurance scheme and that some medicines were temporarily short. No other cancer is on the list. The plan's formulary for 2019 to 2021 lists, under breast cancer, anastrozole, letrozole, tamoxifen, trastuzumab and zoledronic acid, and under prostate cancer, bicalutamide, goserelin and zoledronic acid, each beside pain and other supportive medicines; OnCo found no later list, so the plan's office is the one to ask what it supplies now.",
          links: [
            { label: "National Prescription Drug Plan: conditions covered and who is eligible", url: NPDP },
            { label: "National Prescription Drug Plan: formulary list 2019 to 2021 (PDF)", url: NPDP_FORMULARY },
            { label: "The Tribune: pharmacy concern over the drug plan's move to NHI (16 June 2026)", url: TRIBUNE_NHI },
          ],
        },
        {
          id: "nhi-and-spending",
          title: "National Health Insurance covers primary care, and over a quarter of spending is out of pocket",
          plain:
            "NHI Bahamas covers primary care, such as visits to a doctor, health screening and some laboratory tests, with nothing to pay at the point of care. Asked whether it covers treatment for diseases such as cancer, its questions page says only treatments that can be delivered through primary care are covered. WHO puts out-of-pocket payment at 27.5% of health spending in 2023.",
          detail:
            "The National Health Insurance Authority says primary care services began in May 2017, that more than 160,000 Bahamians have joined, and that all legal residents are covered with no exclusion for a pre-existing condition; it describes the present benefits as an initial phase. WHO's Global Health Expenditure Database gives, for 2023, current health spending of about US$2,262 a person, 50.6% of it from domestic government sources and 27.5% paid out of pocket. A 2022 regional assessment says care is paid for by government spending, private insurance and out-of-pocket payment, and that the drug plan's 2019 list for primary care held 28.7% of the essential NCD medicines it checked, with the lowest shares for cancer and palliative medicines; that list leaves out medicines used in tertiary care institutions.",
          links: [
            { label: "National Health Insurance Authority: NHI Bahamas", url: NHI },
            { label: "National Health Insurance Authority: frequently asked questions", url: NHI_FAQ },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Bahamas (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "Healthy Caribbean Coalition: Equitable Access to Essential Medicines for NCDs in the Caribbean, section 7.3.2 (2022, PDF)", url: HCC_2022 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "The Tribune: the Ministry's statement on pharmacy practice (4 February 2026)", url: TRIBUNE_PHARMACY },
      cards: [
        {
          id: "no-registration-system",
          title: "No national drug registration system, by the Chief Pharmacist's account",
          plain:
            "The Chief Pharmacist at the Ministry of Health and Wellness has said, as quoted by The Tribune, that the Bahamas does not have a national drug registration system. The Ministry said in February 2026 that it was working with the Bahamas Pharmacy Council on reports of illegal dispensing and advancing changes to the law.",
          detail:
            "The Tribune of 4 February 2026 quotes the Chief Pharmacist: \"The Bahamas currently does not have a national drug registration system\", and that this limits what regulators can lawfully do when medicines are imported from unauthorised sources. In the same report the Ministry said legislative changes were being advanced to modernise pharmaceutical laws, and that it was working with the Bahamas Pharmacy Council on reports of illegal dispensing; a former chairman of what The Tribune calls the Bahamas Pharmaceutical Council said the country had no pharmacovigilance, the monitoring of medicines after they are licensed. A 2022 regional assessment says medicines for the public system are procured by the Supplies Management Agency of the Public Hospitals Authority. OnCo could not read the Pharmacy Act or an official page that sets out who authorises a medicine for sale.",
          links: [
            { label: "The Tribune: pharmacy practices 'unlawful' and 'unsafe', says government (4 February 2026)", url: TRIBUNE_PHARMACY },
            { label: "Healthy Caribbean Coalition: Equitable Access to Essential Medicines for NCDs in the Caribbean, section 7.3.2 (2022, PDF)", url: HCC_2022 },
          ],
        },
        {
          id: "caribbean-regulatory-system",
          title: "A regional review at CARPHA can recommend a medicine to CARICOM states",
          plain:
            "The Caribbean Regulatory System is a unit of the Caribbean Public Health Agency (CARPHA) that reviews medicines already approved by a reference regulator and recommends them to CARICOM member states. Each country still decides for itself. CARPHA's questions page names six countries that conduct marketing authorisation, and the Bahamas is not one of them; OnCo did not find how the Bahamas uses these recommendations.",
          detail:
            "CARPHA says CARICOM health ministers agreed in 2016 to create the system to support member states with marketing authorisation and pharmacovigilance, and that companies holding a marketing authorisation can submit reports of suspected adverse reactions through it for countries without reporting systems. It accepts medicines authorised by one of the eight national regulators that PAHO designates as regional reference authorities (those of Argentina, Brazil, Canada, Chile, Colombia, Cuba, Mexico and the United States) and, for non-biologic medicines, by a longer list that includes the regulators of Australia, Japan, Switzerland and the United Kingdom, the European Medicines Agency and European national agencies, or prequalified by WHO; they must generally be on WHO's essential medicines list or the PAHO Strategic Fund list. Its questions page says only a sovereign country can authorise products for sale in its market, and that currently only six countries conduct marketing authorisation: Belize, Guyana, Haiti, Jamaica, Suriname and Trinidad and Tobago.",
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
      aside: { label: "WHO: cervical cancer country profile, Bahamas (2021, PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "cervical-screening",
          title: "No national cervical screening programme in WHO's record, though most women have been screened",
          plain:
            "WHO's 2021 profile records no national cervical screening programme in the Bahamas. It still estimates that 6 in 10 women aged 30 to 49 had been screened in the previous five years, so testing is happening outside an organised programme.",
          detail:
            "The WHO cervical cancer profile gives 66% of women aged 30 to 49 screened in the last five years and 76% ever screened, as 2019 estimates, and 21 cervical cancer deaths in 2019. WHO's 2014 profile said Pap smears and visual inspection with acetic acid were generally available at the public primary care level. NHI Bahamas names Pap smears and prostate screening among its primary care services on its home page; its benefits package, revised on 10 June 2021, lists a liquid Pap smear every 3 years for women over 21, a PSA test offered annually to men over 40 and a faecal immunochemical test every two years for people over 45. WHO's 2020 profile also answers \"no\" for a breast cancer screening programme. A doctor in the NHI network or a public clinic can say which tests are offered and at what age.",
          links: [
            { label: "WHO: cervical cancer country profile, Bahamas (2021, PDF)", url: WHO_CX_2021 },
            { label: "WHO: cancer country profile, Bahamas (2014, PDF)", url: WHO_2014 },
            { label: "WHO: cancer country profile, Bahamas (2020, PDF)", url: WHO_2020 },
            { label: "National Health Insurance Authority: NHI Bahamas", url: NHI },
            { label: "National Health Insurance Authority: primary care benefits package (revised 10 June 2021, PDF)", url: NHI_BENEFITS },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination for girls and boys since 2015, with a third given a first dose in 2025",
          plain:
            "WHO records the HPV vaccine as introduced nationwide in the Bahamas in 2015. In 2025, 33% of girls and 30% of boys in the target group had a first dose, and 7% of girls and 12% of boys a last dose.",
          detail:
            "WHO's 2021 profile gives the primary target as children aged 9 to 10. First-dose programme coverage in girls was 24% in 2016, 7% in 2020 and 2021, 9% in 2022, 16% in 2023, 25% in 2024 and 33% in 2025 (875 doses against a target of 2,624). Boys have been in the rows from the first year, at 30% for a first dose in 2025. WHO's elimination target is 90% of girls fully vaccinated by the age of 15.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for the Bahamas (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for the Bahamas (API)", url: WHO_INTRO_API },
            { label: "WHO: cervical cancer country profile, Bahamas (2021, PDF)", url: WHO_CX_2021 },
          ],
        },
        {
          id: "prostate-screening",
          title: "Prostate screening run by a community group on Grand Bahama",
          plain:
            "A paper published in 2017 describes a yearly screening clinic that a prostate cancer support group had run on Grand Bahama each September since 2009. From 2012 to 2015 it registered 1,844 men and found 40 cancers, half of them high risk. A modelling study found that, among one-off options, a single PSA test at 60 took the fewest tests for each life saved.",
          detail:
            "The clinic was led by the local chapter of Us TOO with corporate funding, volunteers managing the clinics and health professionals providing care. A urologist reviewed 315 men; 45 met the criteria for biopsy and 40 had cancer, and the urologist counselled all 40 and arranged access to standard care. A 2022 decision analysis fitted to PSA results from 4,300 men tested in Nassau and Freeport projected that screening once at 60 would take 40,000 to 42,000 tests from 2022 to 2040 and prevent 500 to 600 of 10,000 to 14,000 prostate cancer deaths, and that adding a test at 50 doubled the tests for 15% to 16% more lives saved. Neither study describes a national programme.",
          links: [
            { label: "Roberts et al., the prostate cancer screening clinic in the Bahamas (Cancer Causes Control 2017)", url: ROBERTS_2017 },
            { label: "Heijnsdijk et al., prostate cancer screening strategies in the Bahamas (JAMA Health Forum 2022)", url: HEIJNSDIJK_2022 },
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
          title: "One radiotherapy centre in IAEA's directory, in Nassau",
          plain:
            "IAEA's radiotherapy directory lists one centre in the Bahamas, Radiation Therapy Services Bahamas Limited in Nassau, with one linear accelerator and a brachytherapy unit. The Tribune reported in 2020 that patients from Grand Bahama travel to Nassau for chemotherapy.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, lists the centre at 72 Collins Avenue with one linear accelerator, one high-dose-rate brachytherapy unit and a CT scanner, in an entry last updated in 2025. Published results from The Cancer Centre Bahamas cover 72 women given curative radiotherapy for cervical cancer from 2006 to 2016, managed in conjunction with Princess Margaret Hospital, with a median wait of 110 days from diagnosis to treatment for the 68 newly diagnosed and two-year survival of 71% for newly diagnosed stage 2B, and 216 men given radiotherapy for prostate cancer that had not spread from 2004 to 2016, with overall survival of 87% at 10 years. In 2020 The Tribune reported that patients from Grand Bahama fly to Nassau for chemotherapy at Princess Margaret Hospital, and that the Cancer Society's Grand Bahama branch was asking for an oncology centre in Freeport.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "Jones et al., curative radiotherapy for cervix cancer in the Bahamas 2006 to 2016 (Cancer Causes Control 2017)", url: JONES_CERVIX_2017 },
            { label: "Jones et al., outcomes in men with prostate cancer at the Cancer Centre Bahamas (Cancer Causes Control 2017)", url: JONES_PROSTATE_2017 },
            { label: "The Tribune: COVID limits show need for Freeport cancer centre (13 October 2020)", url: TRIBUNE_FREEPORT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What stands out in the Bahamas",
      cards: [
        {
          id: "brca-founder",
          title: "An inherited BRCA1 mutation in nearly a quarter of women with breast cancer",
          plain:
            "In a study of 214 Bahamian women with breast cancer, chosen without regard to age or family history, 49 (23%) carried one of six known BRCA1 mutations. The authors called it the highest prevalence reported for any country studied to that date, and advised genetic testing for all women diagnosed with breast cancer in the Bahamas.",
          detail:
            "The share was 33% in women diagnosed before 50, 41% in those with a first-degree relative with breast or ovarian cancer and 58% in those with cancer in both breasts. A later study tested 1,847 Bahamian women who had never had breast or ovarian cancer for seven founder mutations in BRCA1 and BRCA2: 2.8% of those with a family history (20 of 705) and 0.09% of those without (1 of 1,089) were carriers. Its authors advised offering the test to unaffected women with a family history as well. OnCo did not find whether testing is paid for by the public system; the treating oncologist or a genetic counsellor is the person to ask.",
          links: [
            { label: "Donenberg et al., BRCA1 mutations among breast cancer patients from the Bahamas (Breast Cancer Res Treat 2011)", url: DONENBERG_2011 },
            { label: "Trottier et al., founder BRCA mutations among unaffected women from the Bahamas (Clin Genet 2016)", url: TROTTIER_2016 },
            { label: "OnCo: triple-negative breast cancer", url: "/cancers/tnbc/" },
          ],
        },
        {
          id: "impact-review",
          title: "A review of the whole cancer system, begun in 2026",
          plain:
            "In April 2026 the Bahamas began an imPACT Review, a joint assessment of its cancer control by PAHO and WHO, the International Atomic Energy Agency and IARC. A visit by the review team was scheduled for June 2026. Its report had not been published when this page was written.",
          detail:
            "PAHO's release says the review assesses capacity from prevention and early detection to treatment, palliative care and radiation safety, with breast, cervical, colorectal, lung and childhood cancers as priorities, and that it will produce recommendations fitted to the Bahamas. It follows a breast imaging seminar in May 2025 for 41 health professionals from 11 institutions. A 2022 regional assessment says the Ministry of Health published a multisectoral NCD strategy and plan of action for 2017 to 2022, aiming at a 10% reduction in preventable premature NCD deaths; WHO's 2014 profile recorded no operational cancer plan, and OnCo found no national cancer control plan since.",
          links: [
            { label: "PAHO: comprehensive cancer control assessment in The Bahamas (dated 14 April 2026, published 29 April)", url: PAHO_IMPACT },
            { label: "Healthy Caribbean Coalition: Equitable Access to Essential Medicines for NCDs in the Caribbean, section 7.3.2 (2022, PDF)", url: HCC_2022 },
            { label: "WHO: cancer country profile, Bahamas (2014, PDF)", url: WHO_2014 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in the Bahamas", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in the Bahamas",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists the Bahamas. OnCo holds a selection of trials, not the whole registry: ClinicalTrials.gov itself returns seven cancer studies that listed a site in the Bahamas, six in breast cancer and one in lung cancer, all completed or terminated when read on 16 November 2026. The published research is on inherited breast cancer risk, prostate screening and radiotherapy outcomes.",
          detail:
            "The 2016 BRCA paper reports that 38% of unaffected women with a known mutation in the family carried it. The radiotherapy papers set out waiting and treatment times as a benchmark: for cervical cancer the overall treatment time fell from 78 days in 2006 to 2010 to 65 days in 2011 to 2016 in the group with no earlier surgery or chemotherapy. The search link beside this section shows whether a study has opened since. A trial in another country may be open to a patient from the Bahamas; the trial's own contact is the one to ask.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in the Bahamas", url: CTGOV },
            { label: "Trottier et al., founder BRCA mutations among unaffected women from the Bahamas (Clin Genet 2016)", url: TROTTIER_2016 },
            { label: "Jones et al., curative radiotherapy for cervix cancer in the Bahamas 2006 to 2016 (Cancer Causes Control 2017)", url: JONES_CERVIX_2017 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-counts",
      title: "No published national cancer counts, and no survival figures for the population",
      plain:
        "OnCo found no report of cancer incidence from a Bahamian registry and no population-based survival figure. The survival figures on this page are for patients treated at one centre. The national numbers are IARC's model.",
      detail:
        "The Public Hospitals Authority's website at phabahamas.org showed only a notice that a new site is under construction on 16 November 2026, and the Ministry of Health and Wellness address tried on the government portal returned no page, so neither gave anything to read. WHO's profiles disagree over time on whether a registry exists (no in 2014, yes in 2020 and 2021), which fits a registry set up between those years, but OnCo found no document that says so. The Department of Public Health or the oncology service at Princess Margaret Hospital is the place to ask for counts.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Bahamas (PDF)", url: IARC_FACTSHEET },
        { label: "WHO: cancer country profile, Bahamas (2020, PDF)", url: WHO_2020 },
      ],
    },
    {
      id: "medicines-law",
      title: "Who authorises a medicine, and which cancer medicines the public system supplies",
      plain:
        "OnCo could not read the Pharmacy Act or any official page setting out how a medicine is authorised for sale in the Bahamas, and found no page for a national drug agency. The drug plan's formulary for 2019 to 2021 was read; no later one was found, and the hospital formulary was not read.",
      detail:
        "The government's law site returned HTTP 403 for the Pharmacy Act and did not connect at all on a second try on 16 November 2026, and the only primary statement found on registration is the Chief Pharmacist's, as quoted in a newspaper. A 2022 regional assessment lists a Pharmacy Act of 2009, Pharmacy Regulations of 2010 and a Penicillin Act among the country's medicines laws. The formulary the National Prescription Drug Plan's site offers is its list for 2019 to 2021, and The Tribune reported in June 2026 that the plan was being transferred to the National Health Insurance scheme, so what it supplies may have changed. Whether a given cancer medicine is supplied free, through the plan, or has to be bought is a question for the oncology pharmacy at Princess Margaret Hospital or the plan's office.",
      links: [
        { label: "National Prescription Drug Plan", url: NPDP },
        { label: "National Prescription Drug Plan: formulary list 2019 to 2021 (PDF)", url: NPDP_FORMULARY },
        { label: "The Tribune: pharmacy practices 'unlawful' and 'unsafe', says government (4 February 2026)", url: TRIBUNE_PHARMACY },
        { label: "Healthy Caribbean Coalition: Equitable Access to Essential Medicines for NCDs in the Caribbean, table 5 (2022, PDF)", url: HCC_2022 },
      ],
    },
    {
      id: "plan-and-review",
      title: "No national cancer plan found, and the 2026 review's findings are not yet public",
      plain:
        "OnCo found no national cancer control plan for the Bahamas and did not read the NCD strategy for 2017 to 2022 itself. The findings of the imPACT Review that began in 2026 were not found.",
      detail:
        "IAEA's page on the review refused automated requests (HTTP 403), and PAHO's release predates the team's visit. The International Cancer Control Partnership's country address tried for the Bahamas returned no page; the one document read from its site is WHO's 2014 profile. Numbers of oncologists and waiting times for radiotherapy were not found in a current primary source: the 2014 profile counted three radiation oncologists, and the waiting times on this page end in 2016.",
      links: [
        { label: "PAHO: comprehensive cancer control assessment in The Bahamas (dated 14 April 2026, published 29 April)", url: PAHO_IMPACT },
        { label: "WHO: cancer country profile, Bahamas (2014, PDF)", url: WHO_2014 },
      ],
    },
  ],
  institutions: ["npdp-bahamas", "nhi-bahamas", "princess-margaret-hospital-bahamas", "radiation-therapy-services-bahamas", "iarc", "who", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-donenberg-bahamas-brca1-founder-bcrt-2011", "paper-trottier-brca-founder-unaffected-bahamas-clingenet-2016",
    "paper-jones-cervix-radiotherapy-bahamas-ccc-2017", "paper-roberts-prostate-screening-clinic-bahamas-ccc-2017",
  ],
  people: [],
  how:
    "Every card was written from Bahamian and international sources read in full as raw text, not through a summary: the National Health Insurance Authority's pages and benefits package, the National Prescription Drug Plan's site and 2019 to 2021 formulary, PAHO's release on the 2026 imPACT Review, three reports in The Tribune, the Healthy Caribbean Coalition's 2022 assessment of access to medicines, CARPHA's pages, WHO's 2014, 2020 and 2021 profiles and its vaccine and health expenditure rows from its public data APIs, IAEA DIRAC's public equipment data, IARC's GLOBOCAN 2024 fact sheet, and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The Public Hospitals Authority's and the Ministry of Health and Wellness's own pages gave nothing to read, so several statements about the public system rest on newspapers and a regional report, and say so. The new records added for this page (the drug plan, the insurance authority and three papers) carry their own sources. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "National figures for the Bahamas are modelled, not counted, and the drug plan was changing hands in 2026. What the plan or NHI covers, which medicines the hospital pharmacy has and how long the wait for radiotherapy is change faster than any report; ask the treating hospital, the National Prescription Drug Plan or the National Health Insurance Authority what applies to you.",
  verifyLinks: [
    { label: "National Health Insurance Authority", url: NHI },
    { label: "National Prescription Drug Plan", url: NPDP },
    { label: "PAHO: cancer control assessment in The Bahamas", url: PAHO_IMPACT },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Bahamas (PDF)", url: IARC_FACTSHEET },
  ],
};
