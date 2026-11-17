import type { CountryDive } from "@/data/country-dive";

/**
 * Guam deep dive: the hand-written cards for /countries/gu/ (wave 16). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Guam (PDF text); the Guam
 * Cancer Registry's page at the University of Guam, its "Guam Cancer Facts and Figures 2020 Updates" (PDF text, file
 * created August 2024), its 2007 to 2020 data sheet (PDF text, data dated 5 December 2022), its fiscal year 2023 annual
 * report (PDF text) and the University of Guam's news releases of 28 December 2022 and 2019; 21 U.S.C. 321 as published
 * by the Legal Information Institute; MACPAC's fact sheet "Medicaid and CHIP in Guam" (February 2021, PDF text), HHS's
 * Federal Register notice of 29 November 2024 and KFF's October 2024 brief on territory Medicaid; the Guam Medical
 * Referral Assistance Office's site; the Guam Comprehensive Cancer Control Plan 2018-2022 (PDF text, June 2017); CDC's
 * open data service for the National Immunization Survey-Teen (JSON rows for Guam); Guam Regional Medical City's
 * radiation and medical oncology pages; NCI's NCORP site list; IAEA's DIRAC equipment report (JSON); WHO's immunisation
 * and health expenditure data services (JSON, no rows for Guam); and the papers' abstracts through Europe PMC.
 *
 * Not readable: the registry's 80-page "Guam Cancer Facts and Figures 2013-2017" is a PDF of page images with no text
 * layer, so only the University's release about it is used; the Department of Public Health and Social Services' own
 * programme pages redirected to its home page; cdc.gov and stacks.cdc.gov answered 403. Each is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/316-guam-fact-sheet.pdf";
const GCR = "https://uog.edu/research/guam-cancer-registry";
const GCR_2020_UPDATE = "https://www.uog.edu/_resources/files/research/gcr/reports/Guam_cancer_facts_and_figures_2020_update.pdf";
const GCR_DATASHEET = "https://www.uog.edu/_resources/files/research/gcr/reports/2007-2020GuamCancerDataSheet.pdf";
const GCR_ANNUAL_2023 = "https://www.uog.edu/_resources/images/orsp/gcr/GCR-FY-2023-Annual-Report.pdf";
const GCR_FACTS_2013 = "https://www.uog.edu/_resources/files/research/gcr/reports/2013-2017GuamCancerFactsFigures.pdf";
const UOG_NEWS_2022 = "https://uog.edu/news-announcements/2022-2023/uog-publication-1-person-is-diagnosed-with-cancer-every-day-in-guam.php";
const UOG_NEWS_2019 = "https://uog.edu/news-announcements/2018-2019/2019-cancer-research-center-to-facilitate-clinical-trials-for-guam-cancer-patients.php";
const USC_321 = "https://www.law.cornell.edu/uscode/text/21/321";
const MACPAC_GU = "https://www.macpac.gov/wp-content/uploads/2019/06/Medicaid-and-CHIP-in-Guam.pdf";
const FR_FMAP_2026 = "https://www.federalregister.gov/documents/2024/11/29/2024-27910/federal-financial-participation-in-state-assistance-expenditures-federal-matching-shares-for";
const KFF_2024 = "https://www.kff.org/medicaid/recent-changes-in-medicaid-financing-in-puerto-rico-and-other-u-s-territories/";
const GMRO = "https://gmro.guam.gov/guam-medical-referral-office";
const PLAN_2018 = "https://www.iccp-portal.org/system/files/plans/guam_ccc_plan-508.pdf";
const CDC_TEEN = "https://data.cdc.gov/resource/ee48-w5t6.json?geography=Guam";
const GRMC_RT = "https://www.grmc.gu/radiationoncology/";
const GRMC_MO = "https://www.grmc.gu/medicaloncology/";
const NCORP_SITES = "https://ncorp.cancer.gov/findasite/";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GUM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'GUM'";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/gum-2020.pdf";
const DPHSS = "https://dphss.guam.gov/";
const CTGOV = "https://clinicaltrials.gov/search?country=Guam&cond=cancer";

const GOPALANI_2023 = { label: "Gopalani et al., cancer screening in Guam, Puerto Rico and the US Virgin Islands (Cancer Epidemiol 2023)", url: "https://doi.org/10.1016/j.canep.2023.102371" };
const HERNANDEZ_2017 = { label: "Hernandez et al., cancer in Guam and Hawaii compared (Cancer Epidemiol 2017)", url: "https://doi.org/10.1016/j.canep.2017.08.005" };
const DAVID_2017 = { label: "David et al., tobacco tax revenues to fund the Guam Cancer Registry (J Cancer Policy 2017)", url: "https://doi.org/10.1016/j.jcpo.2017.03.006" };
const BADOWSKI_2024 = { label: "Badowski et al., early-onset colorectal cancer in Guam (Prev Med Rep 2024)", url: "https://doi.org/10.1016/j.pmedr.2024.102774" };
const TAAFAKI_2022 = { label: "Taafaki et al., Guam residents' attitudes to cancer trial participation (Int J Environ Res Public Health 2022)", url: "https://doi.org/10.3390/ijerph192315917" };

export const GU_DIVE: CountryDive = {
  iso2: "GU",
  iso3: "GUM",
  name: "Guam",
  flag: "🇬🇺",
  asOf: "2026-11-16",
  title: "Cancer in Guam",
  description:
    "Cancer in Guam from Guam's and US federal sources: a registry at the University of Guam that counts about 381 new cancers and 161 cancer deaths a year, IARC's modelled figure of 451 and 240, FDA jurisdiction under the federal definition of a State, Medicaid with a federal cap and an 83% match, a linear accelerator at Guam Regional Medical City, a government office that helps patients referred to Honolulu, Los Angeles and Manila, HPV vaccination from the CDC's teen survey, and nine trials in our records with a Guam site.",
  lede:
    "Guam is a US territory in the western Pacific of about 168,000 people. Its cancer registry, at the University of Guam, counts an average of 381 residents diagnosed with invasive cancer each year and 161 cancer deaths; lung cancer is the leading cause of cancer death in men and women. Medicines are regulated by the US Food and Drug Administration. A hospital on the island lists chemotherapy and radiotherapy among its services, and a government office supports patients who travel to Hawaii, California or the Philippines for care.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Guam is 451 new cancers (243 in men, 208 in women) and 240 deaths, an age-standardised incidence of 176.5 per 100,000 (188.9 in men, 168.4 in women). Neither number is a count. IARC's fact sheet names no country-specific data source for incidence and gives its method as \"Rates based on incidence estimates or registry data from neighbouring countries\"; for mortality it says \"Country-specific data source: No data\" and \"National incidence estimates applied to model-based M:I ratios (neighbouring country registry data)\". The Guam Cancer Registry's own figures are lower: an average of 381 residents diagnosed with invasive cancer a year and 161 cancer deaths a year, and 1,193 new cases with 452 deaths over 2018 to 2020. For Guam the registry's counts are the measured figures; IARC's are a model built from other places.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Guam",
      aside: { label: "Guam Cancer Registry: Guam Cancer Facts and Figures, 2020 updates (PDF)", url: GCR_2020_UPDATE },
      cards: [
        {
          id: "shape",
          title: "About one new cancer a day, and lung cancer the leading cause of cancer death",
          plain:
            "Guam's cancer registry counts an average of 381 residents diagnosed with invasive cancer each year and 161 deaths from cancer. Prostate cancer is the most common cancer in men (21% of cases) and breast cancer in women (34%). Lung cancer causes the most cancer deaths in both: 31% of men's cancer deaths and 23% of women's.",
          detail:
            "The registry's 2020 update gives average annual incidence for 2015 to 2020 of 288.6 per 100,000 in men and 266.1 in women, and mortality of 149.2 and 100, age-adjusted to the US 2000 standard population, so they are not comparable with IARC's world-standardised rates. In men the next most common cancers are lung and bronchus (20%), colorectal (14%) and liver (6%); in women lung and bronchus (11%) and colorectal (10%). About 43% of new cases were diagnosed at age 65 or older. Colorectal cancer incidence in women rose by an average 5.83% a year over 2015 to 2020. The University of Guam's release on the 2013 to 2017 report said one person was diagnosed with cancer every day and one resident died of cancer every 2.3 days.",
          links: [
            { label: "Guam Cancer Facts and Figures, 2020 updates: overview and tables 1, 4 and 5 (PDF)", url: GCR_2020_UPDATE },
            { label: "University of Guam: 1 person is diagnosed with cancer every day in Guam (28 December 2022)", url: UOG_NEWS_2022 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Guam (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "who-is-affected",
          title: "Rates differ by ethnic group, and many cancers are found late",
          plain:
            "The registry reports cancer by ethnic group. In 2013 to 2017, Micronesians had the highest cancer incidence, 438 against 280 for Guam overall, with liver cancer rates three times Guam's. CHamorus had the highest rates of nasopharynx, oesophagus, bladder cancer and leukaemia. Of adults diagnosed in 2007 to 2020, 36% had died within five years.",
          detail:
            "The University of Guam's release defines Micronesians as people from the Federated States of Micronesia, Palau and the Marshall Islands, and says their liver cancer incidence was nearly five times that of the United States. The registry's data sheet for 2007 to 2020 counts 4,669 cancers in adults: 783 lung, 749 breast, 546 prostate, 524 colorectal and 230 liver. It classes 58% of adult cancers as tobacco-related and 32% as obesity-related, says 41% have an evidence-based screening test, and records that 79% of people with liver cancer and 62% of those with lung and other tobacco-related cancers had died within five years of diagnosis. A registry comparison with Hawaii for 2009 to 2013 found lower overall incidence in Guam but higher cancer mortality in Guam's men, and cancers diagnosed at younger ages. A later registry study found the steepest rises in colorectal cancer incidence between the late thirties and late forties, and supports starting screening at 45.",
          links: [
            { label: "University of Guam: 1 person is diagnosed with cancer every day in Guam (28 December 2022)", url: UOG_NEWS_2022 },
            { label: "Guam Cancer Registry: 2007-2020 Guam cancer data sheet (PDF, data dated 5 December 2022)", url: GCR_DATASHEET },
            HERNANDEZ_2017,
            BADOWSKI_2024,
          ],
        },
      ],
      tables: [
        {
          id: "gu-factsheet",
          title: "IARC's estimate for Guam, 2024, by cancer",
          caption: "Estimated new cancers and deaths in 2024, both sexes, from IARC's GLOBOCAN 2024 fact sheet. These are modelled from neighbouring countries, not counted in Guam.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 451, deaths: 240 },
            { site: "Lung", cases: 93, deaths: 81 },
            { site: "Prostate", cases: 57, deaths: 21 },
            { site: "Breast", cases: 55, deaths: 24 },
            { site: "Colorectum", cases: 47, deaths: 16 },
            { site: "Liver", cases: 33, deaths: 26 },
            { site: "Non-Hodgkin lymphoma", cases: 20, deaths: 8 },
            { site: "Thyroid", cases: 18, deaths: 0 },
            { site: "Stomach", cases: 16, deaths: 14 },
            { site: "Pancreas", cases: 15, deaths: 15 },
            { site: "Cervix uteri", cases: 15, deaths: 8 },
          ],
          note: "IARC gives 243 new cancers in men and 208 in women, and 136 and 104 deaths. Its method for Guam uses rates from neighbouring countries for incidence and model-based ratios for deaths, so small numbers by site are indicative only.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Guam (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "gu-registry",
          title: "What the Guam Cancer Registry counted, 2018 to 2020",
          caption: "Newly diagnosed cancers and cancer deaths over three years, from table 1 of the registry's 2020 update.",
          columns: [
            { key: "site", label: "Cancer site" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All sites", cases: 1193, deaths: 452 },
            { site: "Breast", cases: 210, deaths: 25 },
            { site: "Lung and bronchus", cases: 197, deaths: 137 },
            { site: "Prostate", cases: 121, deaths: 50 },
            { site: "Colorectal", cases: 99, deaths: 21 },
            { site: "Liver", cases: 52, deaths: 47 },
          ],
          note: "Three years of counts, so about 398 new cancers and 151 deaths a year. Tables 2 and 3 of the same update carry headings that do not match their totals (the table headed new cases totals 268 and the table headed deaths totals 1,193), so only table 1 and the overview are used here.",
          sources: [{ label: "Guam Cancer Registry: Guam Cancer Facts and Figures, 2020 updates (PDF)", url: GCR_2020_UPDATE }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry set up by law in 1998, at the University of Guam",
      aside: { label: "University of Guam: Guam Cancer Registry", url: GCR },
      cards: [
        {
          id: "registry-gcr",
          title: "A population-based registry, reporting through a Pacific regional registry to the CDC",
          plain:
            "The Guam Cancer Registry was established in 1998 by Guam's Public Law 24-198 to collect cancer data from all health-care providers. Since 2004 it has been part of the Cancer Research Center of Guam, a joint venture of the University of Guam, Guam's Department of Public Health and Social Services and the University of Hawai'i Cancer Center. It has been a full member of the North American registry association since 2006.",
          detail:
            "The registry's annual report for fiscal year 2023 describes a start in 1998 as one of the territorial epidemiologist's duties, using death certificates and American Cancer Society records, and a full-time data collector from 2004, funded by the National Cancer Institute. In 2022 it had six staff. It is mentored by the Hawai'i Tumor Registry and the Pacific Regional Central Cancer Registry, to which Guam reports its incidence data, and in fiscal year 2023 it submitted 414 cases diagnosed in 2021 to the CDC, against an annual average of 391. It collects from hospitals, clinics, laboratories and insurers in Guam, and in that year also received cases from the central cancer registries of Texas, California and Hawaii. The report says Typhoon Mawar badly damaged two of its major reporting facilities and would delay the next year's collection.",
          links: [
            { label: "University of Guam: Guam Cancer Registry", url: GCR },
            { label: "Guam Cancer Registry: annual report, fiscal year 2023 (PDF)", url: GCR_ANNUAL_2023 },
            { label: "Guam Cancer Registry: 2007-2020 Guam cancer data sheet (PDF)", url: GCR_DATASHEET },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: Medicaid with a federal cap, Medicare and private insurance",
      aside: { label: "MACPAC: Medicaid and CHIP in Guam (February 2021, PDF)", url: MACPAC_GU },
      cards: [
        {
          id: "medicaid",
          title: "Medicaid covers about a fifth of residents, with capped federal money matched at 83%",
          plain:
            "Guam has run a Medicaid programme since 1975, through its Department of Public Health and Social Services. In June 2019 it covered 35,499 people, about one-fifth of the population. In the states the federal share of Medicaid has no ceiling; in Guam it is paid only up to a yearly cap. Congress set Guam's federal match permanently at 83% in the Consolidated Appropriations Act, 2023.",
          detail:
            "MACPAC's fact sheet says Guam covers people with incomes up to 133% of a local Guam poverty level, about 61% of the federal poverty level for a family of four in 2021, has expanded to the new adult group, and is the only territory that covers all mandatory Medicaid benefits, with prescription drugs among its optional ones. The federal ceiling, the Section 1108 allotment, was about 18 million US dollars a year before Congress raised it to 130.9 million for fiscal year 2020. HHS's notice for fiscal year 2026 lists Guam's match at 83.00 and records that the Consolidated Appropriations Act, 2023 set it at 83% permanently; KFF says later allotments grow from the raised 2020 and 2021 levels. MACPAC's sheet is dated February 2021, so enrolment and spending figures are several years old.",
          links: [
            { label: "MACPAC: Medicaid and CHIP in Guam (February 2021, PDF)", url: MACPAC_GU },
            { label: "Federal Register: matching shares for fiscal year 2026 (29 November 2024)", url: FR_FMAP_2026 },
            { label: "KFF: recent changes in Medicaid financing in Puerto Rico and other US territories (28 October 2024)", url: KFF_2024 },
          ],
        },
        {
          id: "medicare-gaps",
          title: "Medicare works differently in Guam, and cost help for medicines is limited",
          plain:
            "People in Guam who have both Medicare and full Medicaid get help with Medicare costs, and Medicaid pays their Part B premium. But the Medicare Savings Programs that help lower-income people in the states are not available in the territories, and MACPAC reported in 2021 that no Medicare Part D drug plans were available in Guam.",
          detail:
            "In place of the Part D low-income subsidy, Guam receives a separate federal allotment, the Enhanced Allotment Plan under section 1935(e) of the Social Security Act, which can only be used to help low-income Medicare beneficiaries buy prescription drugs. Medicaid enrollees with incomes above the Guam poverty level make small copayments for prescriptions. MACPAC says most Medicaid services are provided through Guam Memorial Hospital, its clinics and a private hospital that opened in January 2016, paid fee for service. WHO's health expenditure database holds no rows for Guam, so no out-of-pocket share is given here. Anyone starting cancer treatment should ask the insurer or the Medicaid office what is covered before the first cycle.",
          links: [
            { label: "MACPAC: Medicaid and CHIP in Guam, benefits and delivery system (PDF)", url: MACPAC_GU },
            { label: "WHO: out-of-pocket share query for Guam (data API, no rows)", url: WHO_OOP_API },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the US Food and Drug Administration",
      aside: { label: "21 U.S.C. 321: definitions in the Federal Food, Drug, and Cosmetic Act", url: USC_321 },
      cards: [
        {
          id: "fda",
          title: "FDA approval is what puts a cancer medicine on the market in Guam",
          plain:
            "US federal medicines law applies in Guam. The federal Food, Drug, and Cosmetic Act defines a State to include any Territory of the United States, and Guam is a US territory, so the US Food and Drug Administration's decisions on cancer medicines apply in Guam as in the 50 states. The approvals count on this page is the US count for that reason.",
          detail:
            "Section 201(a)(1) of the Act, 21 U.S.C. 321(a)(1), says the term State, except in one sentence of section 372(a), \"means any State or Territory of the United States, the District of Columbia, and the Commonwealth of Puerto Rico\". Section 321(a)(2) says the term Territory \"means any Territory or possession of the United States, including the District of Columbia, and excluding the Commonwealth of Puerto Rico and the Canal Zone\". The statute does not name Guam; Guam falls under it as a US territory. MACPAC's fact sheet says \"Guam became a U.S. territory in 1950\", and the Guam authors of the registry funding paper call it \"an unincorporated Territory of the United States of America in the Western Pacific\". What a patient can actually get also depends on the payer and on what the island's pharmacies and hospitals stock. OnCo did not read an FDA page specific to Guam, or Guam's own pharmacy law, so this page does not say what local rules sit on top of the federal ones.",
          links: [
            { label: "21 U.S.C. 321: definitions (Legal Information Institute)", url: USC_321 },
            { label: "MACPAC: Medicaid and CHIP in Guam (February 2021, PDF)", url: MACPAC_GU },
            DAVID_2017,
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening, HPV vaccination and the cancer plan",
      aside: { label: "Guam Comprehensive Cancer Control Plan 2018-2022 (PDF, June 2017)", url: PLAN_2018 },
      cards: [
        {
          id: "screening-rates",
          title: "Fewer people up to date with screening than in the states, most of all for colorectal cancer",
          plain:
            "In surveys from 2016, 2018 and 2020, 74.8% of women in Guam aged 50 to 74 were up to date with breast screening, against 78.3% across the states, and 71.1% of women aged 21 to 65 with cervical screening, against 84.5%. Only 47.3% of adults aged 50 to 75 were up to date with colorectal screening, against 69.0%.",
          detail:
            "The figures come from the Behavioral Risk Factor Surveillance System, analysed by Gopalani and colleagues with 95% confidence intervals of 70.9 to 78.3 for breast, 67.6 to 74.3 for cervical and 43.6 to 51.0 for colorectal screening in Guam. Adults without health coverage reported low use of all three tests in every jurisdiction studied, and in most jurisdictions use was lower among people with less education and lower household income. These are self-reported answers, measured against the US Preventive Services Task Force recommendations of those years. The registry's annual report names a Guam Breast and Cervical Cancer Early Detection Program under the Department of Public Health and Social Services; OnCo could not read the Department's page for it, so its eligibility rules are not given here.",
          links: [
            GOPALANI_2023,
            { label: "Guam Cancer Registry: annual report, fiscal year 2023 (PDF)", url: GCR_ANNUAL_2023 },
          ],
        },
        {
          id: "hpv",
          title: "About half of Guam's teenagers were up to date with HPV vaccination in 2025",
          plain:
            "The CDC's National Immunization Survey-Teen samples Guam separately. For 2025 it estimates that 48.9% of adolescents aged 13 to 17 were up to date with HPV vaccination and 64.6% had had at least one dose. The sample was 117 teenagers, so the margins are wide: 37.4% to 60.5% for the up-to-date figure.",
          detail:
            "By sex the 2025 up-to-date estimates were 37.2% for girls (58 sampled) and 60.3% for boys (59 sampled). Earlier years in the same series were 43.1% in 2024, 51.9% in 2023, 44.6% in 2022 and 54.0% in 2021, each with overlapping confidence intervals, so the series shows no clear trend. The CDC's report on the 2024 survey says adolescents from Guam were excluded from the national estimates. WHO's immunisation data hold no HPV coverage or introduction rows for Guam. The 2018 to 2022 cancer plan set an objective to raise the share of children aged 9 to 18 who had completed the HPV vaccine series by 10%.",
          links: [
            { label: "CDC: vaccination coverage among adolescents 13 to 17 years, Guam rows (open data, JSON)", url: CDC_TEEN },
            { label: "Pingali et al., vaccination coverage among adolescents, National Immunization Survey-Teen 2024 (MMWR 2025)", url: "https://doi.org/10.15585/mmwr.mm7430a1" },
            { label: "WHO: HPV vaccination coverage query for Guam (data API, no rows)", url: WHO_HPV_API },
            { label: "Guam Comprehensive Cancer Control Plan 2018-2022 (PDF)", url: PLAN_2018 },
          ],
        },
        {
          id: "plan",
          title: "A cancer control plan for 2018 to 2022, the third, with lung, breast, cervical and colorectal cancer first",
          plain:
            "Guam's Department of Public Health and Social Services and the Guam Comprehensive Cancer Control Coalition published a cancer control plan for 2018 to 2022 in June 2017. It calls itself the third such plan. Its immediate priorities are lung cancer, breast and cervical cancer, and colorectal cancer.",
          detail:
            "The plan is organised by action teams for prevention; screening, early detection and treatment; survivorship and quality of life; policy and advocacy; and data and research. Its objectives for 2022 include raising the share of adults aged 50 to 75 screened for colorectal cancer, raising HPV vaccination, and having Guam's four cancer treatment centres use survivorship care plans. The registry's 2023 annual report shows the coalition and the Department's cancer control programme still active. OnCo found no plan covering the years after 2022: the copy held by the International Cancer Control Partnership is the 2018 to 2022 plan. The Department's cancer control programme is the place to ask for the current one.",
          links: [
            { label: "Guam Comprehensive Cancer Control Plan 2018-2022 (PDF, June 2017)", url: PLAN_2018 },
            { label: "Guam Cancer Registry: annual report, fiscal year 2023 (PDF)", url: GCR_ANNUAL_2023 },
            { label: "Guam Department of Public Health and Social Services", url: DPHSS },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy on the island, and care off it",
      aside: { label: "Guam Medical Referral Assistance Office", url: GMRO },
      cards: [
        {
          id: "radiotherapy",
          title: "A linear accelerator at Guam Regional Medical City; IAEA's directory lists no centre",
          plain:
            "The IAEA's Directory of Radiotherapy Centres has no entry for Guam. That is a gap in the directory, not proof of no service: Guam Regional Medical City, a hospital in Dededo, says its radiation oncology department has a TrueBeam linear accelerator and gives treatments including intensity-modulated radiotherapy and stereotactic radiosurgery.",
          detail:
            "The hospital's medical oncology page lists chemotherapy, targeted therapy, immunotherapy and hormone therapy. Both pages carry a 2017 to 2023 copyright line and no other date, so they may not describe the present service. The 2018 to 2022 cancer plan counted four cancer treatment centres in Guam, and the registry's 2023 annual report names the facilities that report cases to it, among them Guam Regional Medical City, Guam Memorial Hospital, the Island Cancer Center and the Cancer Center of Guam. OnCo found no public count of machines, radiation oncologists or medical oncologists for the island. A patient who needs radiotherapy should ask the treating oncologist which treatments are given locally and which need referral.",
          links: [
            { label: "Guam Regional Medical City: radiation oncology", url: GRMC_RT },
            { label: "Guam Regional Medical City: medical oncology", url: GRMC_MO },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Guam Cancer Registry: annual report, fiscal year 2023 (PDF)", url: GCR_ANNUAL_2023 },
          ],
        },
        {
          id: "off-island",
          title: "Off-island referral: a government office with branches in Honolulu, Los Angeles and Manila",
          plain:
            "When care is not available in Guam, patients travel. The Guam Medical Referral Assistance Office, a government office, helps patients and a family representative who go off-island for medical reasons. Its site lists offices in Honolulu, opened in 1989, Los Angeles, opened in 1991, and Manila, opened in 1995.",
          detail:
            "The office's site says it provides transport from the airport to the hotel, transport to doctors' clinics and pharmacies within its coverage area, and a list of lodgings within five miles of the referred hospital. It asks for a doctor's referral or a letter of authorisation from the health insurer, the travel itinerary and confirmed lodging, submitted by the patient, a family representative or the insurer. Medicaid enrollees can receive care outside the territory with prior authorisation when it is medically necessary and not provided in Guam, according to MACPAC. In 2019 the principal investigator of Guam's NCI trial site said 95 per cent of cancer care is delivered locally. OnCo found no published count of cancer patients referred off-island by destination.",
          links: [
            { label: "Guam Medical Referral Assistance Office", url: GMRO },
            { label: "MACPAC: Medicaid and CHIP in Guam, benefits (PDF)", url: MACPAC_GU },
            { label: "University of Guam: Cancer Research Center to facilitate clinical trials (2019)", url: UOG_NEWS_2019 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Guam does",
      title: "What Guam does differently",
      cards: [
        {
          id: "tobacco-tax",
          title: "A share of tobacco tax pays for the cancer registry",
          plain:
            "Guam's Public Law 30-80, passed in 2010, gives the Guam Cancer Registry 1% of tobacco tax revenues each year. The registry's annual report says continued National Cancer Institute support depends on evidence of local support, and that this law provides it. The authors of a 2017 paper call the arrangement a double win for cancer control.",
          detail:
            "David and colleagues describe Guam raising tobacco taxes and earmarking a percentage for the registry, which gave it a reliable funding stream for staffing and capacity building; they report that youth tobacco consumption fell after the tax increase. The registry's own data sheet shows why tobacco matters here: it classes 58% of adult cancers diagnosed in 2007 to 2020 as tobacco-related, and lung cancer is the leading cause of cancer death. The annual report for fiscal year 2023 is an account of how the tobacco tax money was used, including training, case collection and help to registries in American Samoa, Yap and the Marshall Islands. The paper's abstract gives no figures for the size of the fall in youth smoking.",
          links: [
            DAVID_2017,
            { label: "Guam Cancer Registry: annual report, fiscal year 2023 (PDF)", url: GCR_ANNUAL_2023 },
            { label: "Guam Cancer Registry: 2007-2020 Guam cancer data sheet (PDF)", url: GCR_DATASHEET },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Guam (search)", url: CTGOV },
      cards: [
        {
          id: "trials-research",
          title: "Nine trials in OnCo's records have a site in Guam, through the Hawaii NCI network",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026, nine cancer trials list Guam among their locations: by overall trial status, two were recruiting, six were active but no longer recruiting, and one had mixed status. All are sponsored by the US National Cancer Institute or its cooperative groups, and each lists FHP Health Center, Guam, as its site. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "The National Cancer Institute's list of community research sites shows the Hawaii NCORP, based in Honolulu, with locations in Guam and Hawaii and FHP Health Center, Guam, among its affiliates. The University of Guam reported in 2019 that NCI had approved adding FHP Health Center that January, so that patients in Guam could join NCI-sponsored trials without leaving the island. The nine trials include NCI-MATCH, ALCHEMIST for lung cancer, the DART rare tumours trial, the BWEL breast cancer weight-loss trial and a study of a website for cancer survivors' follow-up care. A trial that is recruiting overall may not be recruiting in Guam: on 16 November 2026 ClinicalTrials.gov showed the Guam site of one of the two recruiting trials (NCT04267848) as suspended, so ask the site what is open. A telephone survey of 152 Guam adults before trials began found 73.7% would take part in a trial if they had cancer, and 59.9% believed a trial offered in Guam would give good quality treatment.",
          links: [
            { label: "NCI NCORP: find a site (The Hawaii NCORP)", url: NCORP_SITES },
            { label: "University of Guam: Cancer Research Center to facilitate clinical trials (2019)", url: UOG_NEWS_2019 },
            TAAFAKI_2022,
            { label: "ClinicalTrials.gov: cancer studies with a site in Guam (search)", url: CTGOV },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "who-data",
      title: "WHO publishes no cancer profile, vaccination or spending rows for Guam",
      plain:
        "WHO's Cancer Country Profile 2020 does not exist for Guam, and WHO's immunisation and health expenditure databases return no rows for it. This page uses US and Guam sources in their place: the CDC's teen vaccination survey and MACPAC's Medicaid fact sheet. No out-of-pocket share of health spending is available.",
      detail:
        "The address where WHO publishes its 2020 cancer profiles answered 404 for Guam on 16 November 2026. WHO's HPV coverage and vaccine introduction queries and four Global Health Expenditure Database indicators (out-of-pocket share, government share, spending per person and external share) each returned an empty list for the code GUM. OnCo did not find a current uninsured rate for Guam read from a primary source, so none is given; the US Census Bureau and Guam's Bureau of Statistics and Plans are where to look.",
      links: [
        { label: "WHO: Cancer Country Profile 2020 address for Guam (answers 404)", url: WHO_PROFILE },
        { label: "WHO: HPV vaccination coverage query for Guam (data API, no rows)", url: WHO_HPV_API },
        { label: "WHO: out-of-pocket share query for Guam (data API, no rows)", url: WHO_OOP_API },
      ],
    },
    {
      id: "unread-sources",
      title: "Documents found but not readable",
      plain:
        "The registry's main report, Guam Cancer Facts and Figures 2013-2017, is an 80-page file of page images with no text, so OnCo could not read its tables and used the University of Guam's release about it. The Department of Public Health and Social Services' programme pages redirected to its home page, and CDC's web pages refused automated requests.",
      detail:
        "The figures on this page for 2015 to 2020 come from the registry's shorter 2020 update, whose tables 2 and 3 have headings that do not match their totals; only its overview and table 1 are used. The CDC's HPV figures were read from its open data service, not from its report pages, which answered 403. The Department's pages for Medicaid, the Comprehensive Cancer Control Program and the Breast and Cervical Cancer Early Detection Program could not be read, so eligibility rules for free screening and for off-island referral under Medicaid are not described. The Department itself is the place to ask.",
      links: [
        { label: "Guam Cancer Facts and Figures 2013-2017 (PDF of page images)", url: GCR_FACTS_2013 },
        { label: "Guam Cancer Facts and Figures, 2020 updates (PDF)", url: GCR_2020_UPDATE },
        { label: "Guam Department of Public Health and Social Services", url: DPHSS },
      ],
    },
    {
      id: "capacity-counts",
      title: "No count of radiotherapy machines, specialists or off-island referrals",
      plain:
        "OnCo found no authoritative public count of radiotherapy machines or cancer specialists in Guam, and no figure for how many cancer patients travel off-island each year or where they go. The IAEA's directory has no Guam entry, and the hospital pages read are undated.",
      detail:
        "The Guam Medical Referral Assistance Office's site lists its offices and services but no patient numbers. MACPAC's Medicaid fact sheet dates from February 2021 and its enrolment figure from June 2019. The statement that 95 per cent of cancer care is delivered locally was made in 2019 by one clinician and is not a measured figure. The registry receives cases from registries in Texas, California and Hawaii, which suggests some residents are diagnosed or treated there, but it publishes no count by place of treatment. The treating oncologist and the insurer are the people to ask about what can be done on the island.",
      links: [
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
        { label: "Guam Medical Referral Assistance Office", url: GMRO },
        { label: "Guam Cancer Registry: annual report, fiscal year 2023 (PDF)", url: GCR_ANNUAL_2023 },
      ],
    },
  ],
  institutions: [
    "guam-cancer-registry", "guam-dphss", "guam-regional-medical-city", "guam-memorial-hospital", "fhp-health-center-guam",
    "hawaii-cancer-center", "nci", "fda-oce", "cms", "naaccr", "iarc", "iaea",
  ],
  companies: [],
  drugs: [],
  trials: ["nct07018869", "nct04267848", "alchemist", "nci-match", "nct04092283", "nct03793179", "bwel", "dart-s1609", "nct04137107"],
  papers: [
    "paper-hernandez-cancer-guam-hawaii-canep-2017", "paper-david-tobacco-tax-guam-cancer-registry-jcpo-2017",
    "paper-badowski-early-onset-colorectal-guam-pmedr-2024", "paper-taafaki-trial-attitudes-guam-ijerph-2022",
    "paper-gopalani-screening-us-territories-canep-2023",
  ],
  people: [],
  how:
    "Every card was written from Guam's own and US federal sources, read as raw text and not through a summary: the Guam Cancer Registry's page, its 2020 update, its 2007 to 2020 data sheet and its fiscal year 2023 annual report; University of Guam news releases; the federal Food, Drug, and Cosmetic Act's definitions; MACPAC's fact sheet on Medicaid in Guam, HHS's matching-rate notice for 2026 and KFF's brief on territory Medicaid; the Guam Medical Referral Assistance Office's site; the Guam Comprehensive Cancer Control Plan 2018-2022; the CDC's open data for its teen immunisation survey; Guam Regional Medical City's pages; NCI's list of community research sites; IARC's GLOBOCAN fact sheet; IAEA's radiotherapy directory; and the papers' abstracts. Trial counts are from OnCo's own copy of ClinicalTrials.gov participation data.",
  verify:
    "The registry's latest published counts run to 2020 and its fuller report to 2017; IARC's 2024 figures are a model built from neighbouring countries and are higher than the registry's counts. MACPAC's Medicaid figures date from 2019 to 2021. Hospital pages are undated. Before relying on any of this, check coverage with the insurer or Guam's Medicaid office, and ask the treating oncologist which treatments are given on the island.",
  verifyLinks: [
    { label: "University of Guam: Guam Cancer Registry", url: GCR },
    { label: "Guam Department of Public Health and Social Services", url: DPHSS },
    { label: "Guam Medical Referral Assistance Office", url: GMRO },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Guam (PDF)", url: IARC_FACTSHEET },
  ],
};
