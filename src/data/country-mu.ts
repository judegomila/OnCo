import type { CountryDive } from "@/data/country-dive";

/**
 * Mauritius deep dive: the hand-written cards for /countries/mu/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: the Mauritius National Cancer Registry's report for 2024
 * (Ministry of Health and Wellness, dated December 2025, PDF text), the National Cancer Control Programme 2022-2025
 * (PDF text from the ICCP portal; the same document is on the Ministry's publications page), the Ministry's Health
 * Statistics Report 2024 (PDF text), its hospital services page, the Pharmacy Act 1983 and the Clinical Trials Act
 * 2011 (Revised Laws of Mauritius, PDF text from the Ministry's legislation page), the Pharmacy Board's 2026 list of
 * registered products (PDF text), the African Cancer Registry Network's page for the registry (updated 20 April 2025),
 * IARC's GLOBOCAN 2024 fact sheet, WHO's cancer country profile 2020 and cervical cancer profile 2021 (PDF text), WHO's
 * Global Health Expenditure rows and HPV coverage rows (public APIs), WHO's list of regulators at maturity levels 3 and
 * 4 (August 2026), the African Union's list of signatures of the African Medicines Agency treaty (19 September 2023),
 * the IAEA DIRAC public country table, the ClinicalTrials.gov API, and two registry papers' abstracts through Europe
 * PMC. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/480-mauritius-fact-sheet.pdf";
const WHO_CCP = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mus-2020.pdf";
const WHO_CERV = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-mus-2021-country-profile-en.pdf";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'MUS'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'MUS'";
const WHO_GGHE_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'MUS'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'MUS'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'MUS'%20and%20contains(DESCRIPTION,'HPV')";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AU_AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const AFCRN = "https://afcrn.org/index.php/membership/membership-list/103-mauritius";
const MOH = "https://health.govmu.org/health/";
const MOH_HOSP = "https://health.govmu.org/health/?page_id=5509";
const MOH_PUBS = "https://health.govmu.org/health/?page_id=5707";
const MOH_INFRA = "https://health.govmu.org/health/?page_id=6991";
const MOH_PCS = "https://health.govmu.org/health/?p=10581";
const NCR_2024 = "https://health.govmu.org/health/wp-content/uploads/2026/02/National-Cancer-Registry-2024.pdf";
const HSR_2024 = "https://health.govmu.org/health/wp-content/uploads/2026/01/Health-statistics-report-2024.pdf";
const NCCP = "https://www.iccp-portal.org/sites/default/files/plans/National%20Cancer%20Control%20Programme%202022-2025.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=mauritius";
const PHARMACY_ACT = "https://health.govmu.org/health/wp-content/uploads/2023/03/PHARMACY-ACT-1983-1.pdf";
const CT_ACT = "https://health.govmu.org/health/wp-content/uploads/2023/03/CLINICAL-TRIALS-ACT-2011-1.pdf";
const PB_LIST = "https://health.govmu.org/health/wp-content/uploads/2026/04/List-of-Pharmaceutical-Products-approved-by-the-PB-for-reg-2026.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Mauritius&cond=cancer";
const CTGOV_STUDY = "https://clinicaltrials.gov/study/NCT07562347";
const TRENDS_DOI = "https://doi.org/10.1016/j.canep.2019.101616";
const SURVIVAL_DOI = "https://doi.org/10.1002/ijc.35172";

const L = {
  iarc: { label: "IARC: GLOBOCAN 2024 fact sheet, Mauritius (PDF)", url: IARC_FACTSHEET },
  ncr: { label: "Ministry of Health and Wellness: Report of the National Cancer Registry 2024 (PDF)", url: NCR_2024 },
  nccp: { label: "National Cancer Control Programme 2022-2025 (ICCP portal, PDF)", url: NCCP },
  hsr: { label: "Ministry of Health and Wellness: Health Statistics Report 2024 (PDF)", url: HSR_2024 },
  afcrn: { label: "African Cancer Registry Network: Mauritius National Cancer Registry (updated 20 April 2025)", url: AFCRN },
  ccp: { label: "WHO: cancer country profile 2020, Mauritius (PDF)", url: WHO_CCP },
  cerv: { label: "WHO: cervical cancer profile 2021, Mauritius (PDF)", url: WHO_CERV },
  hosp: { label: "Ministry of Health and Wellness: hospital services", url: MOH_HOSP },
};

export const MU_DIVE: CountryDive = {
  iso2: "MU",
  iso3: "MUS",
  name: "Mauritius",
  flag: "🇲🇺",
  asOf: "2026-11-16",
  title: "Cancer in Mauritius",
  description:
    "Cancer in Mauritius from Mauritian, WHO and peer-reviewed sources: a national population-based registry that counted 3,362 new cancers and 1,649 cancer deaths in 2024, IARC's estimate of 2,976 new cancers built on that registry's rates, public care free at the point of delivery alongside out-of-pocket payments of 45.2% of health spending in 2023, a National Cancer Control Programme for 2022 to 2025, one radiotherapy centre, HPV vaccination since 2016 reaching 87% of girls in 2025 and extended to boys in 2024, and medicines registered by the Pharmacy Board.",
  lede:
    "Mauritius counts its own cancers: a national registry covering the whole republic, including Rodrigues, publishes its reports on the Ministry of Health and Wellness site, and recorded 3,362 new cancers in 2024. Public hospitals treat cancer free of charge, with surgery, radiotherapy and brachytherapy at the National Cancer Centre and chemotherapy at all five regional hospitals. Breast cancer is the commonest cancer and the commonest cause of cancer death.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Mauritius is 2,976 new cancers and 1,471 deaths, an age-standardised incidence of 147.6 per 100,000 (129.0 in men, 168.9 in women) and mortality of 67.7. The fact sheet gives the incidence source as \"Registry (national)\" with the method \"National rates applied to 2024 population\", and the mortality source as \"WHO (national)\" with the method \"Trends in national rates projected to 2024\": these are projections from Mauritius' own registry and death data, not the count for the year. The registry's own report for 2024 counted more: 3,362 new cancers (1,471 in men and 1,891 in women) and 1,649 cancer deaths. Neither source explains the difference between the two sets of figures, and OnCo does not. The registry's report states its own rules: it includes brain tumours that are not malignant and high-grade precancerous lesions of the cervix, and its death count includes people with cancer who died of another cause. IARC counts 43 non-melanoma skin cancers among the 2,976 (2,933 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Mauritius",
      aside: L.ncr,
      cards: [
        {
          id: "shape",
          title: "About 3,400 new cancers a year by the registry's count, more of them in women",
          plain:
            "The national registry recorded 3,362 new cancers in 2024: 1,471 in men and 1,891 in women. Breast cancer was the commonest in women (679 cases) and prostate cancer in men (251), with colorectal cancer second or third in both. The registry counted 1,649 cancer deaths, and cancer was the third cause of death after cardiovascular disease and diabetes.",
          detail:
            "The registry's report for 2024, dated December 2025, gives age-standardised incidence of 66.8 per 100,000 for breast cancer in women and 23.7 for prostate cancer in men. The mean age at diagnosis was 63.8 years for men and 59.8 for women. Of 12,493 deaths in 2024, 1,649 were attributed to cancer (803 men, 846 women): lung cancer caused the most cancer deaths in men (123) and breast cancer in women (244). The report counts 23 cancers in children under 15, leukaemias the most frequent. IARC's separate projection for 2024 is lower, at 2,976 new cancers and 1,471 deaths, with a risk of developing cancer before age 75 of 15.3% and an estimated 7,844 people living within five years of a diagnosis.",
          links: [L.ncr, L.iarc],
        },
        {
          id: "trends",
          title: "Breast, prostate, colorectal and womb cancer are rising; cervical cancer fell",
          plain:
            "The registry reports that new cancers have risen steadily since 2001 in both sexes. Rates of prostate and colorectal cancer in men and of breast, colorectal, womb and ovarian cancer in women are rising. Cervical cancer rates fell from 2001 to 2018 and have been stable since.",
          detail:
            "The registry's page on the African Cancer Registry Network gives 1,394 cancers in 2001 and 2,841 in 2023. Its 2024 report describes lung and stomach cancer rates in men as stable and mouth and pharynx cancer as slightly lower. A paper from the registry covering 1991 to 2015 measured the average yearly change in age-standardised rates: +4.2% for prostate and +3.9% for colorectal cancer in men, +3.4% for breast, +4.4% for colorectal and +5.2% for womb cancer in women, and -2% for cervical cancer. Its authors describe the commonest cancers as those associated with a westernised lifestyle, in contrast with the infection-related cancers that predominate in other sub-Saharan African countries.",
          links: [L.ncr, L.afcrn, { label: "Koon Sun Pat et al., trends in cancer incidence in Mauritius 1991 to 2015 (Cancer Epidemiol 2019)", url: TRENDS_DOI }],
        },
        {
          id: "mncr",
          title: "A registry for the whole country, population-based since 2001",
          plain:
            "The Mauritius National Cancer Registry was set up in 1993 in the pathology laboratory at Victoria Hospital and has covered the whole population since 2001. It sits in the Ministry of Health and Wellness, has belonged to the African Cancer Registry Network since 2013, and its data were accepted into the international series Cancer Incidence in Five Continents.",
          detail:
            "The registry's 2024 report says it covers the Republic of Mauritius including Rodrigues and the outer islands, 1,245,449 people in 2024. It gathers cases from the radiotherapy patient register, regional hospital records, the Central Health Laboratory, the Ministry's Overseas Treatment Unit and some private pathology services, and since July 2024 its staff also abstract records directly at the National Cancer Centre. Microscopic verification was available for 85.7% of 2024 cases and 2.2% had an unknown primary site. The report records one limit plainly: the Civil Status Office supplied anonymised death data, so cases known from a death certificate alone could not be traced. WHO's 2020 profile rated the registry \"high quality\" and death registration quality as high.",
          links: [L.ncr, L.afcrn, L.ccp],
        },
      ],
      tables: [
        {
          id: "mu-registry-incidence-2024",
          title: "The registry's five commonest cancers in men and in women, 2024",
          caption: "New cases diagnosed in 2024 and the age-standardised incidence rate (world standard) per 100,000, from the Mauritius National Cancer Registry's report.",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "share", label: "% of cases in that sex", numeric: true },
            { key: "asr", label: "Rate per 100,000", numeric: true },
          ],
          rows: [
            { sex: "Men", site: "Prostate", cases: 251, share: 18.5, asr: 23.7 },
            { sex: "Men", site: "Colorectal", cases: 209, share: 15.4, asr: 21.3 },
            { sex: "Men", site: "Lung", cases: 137, share: 10.1, asr: 13.3 },
            { sex: "Men", site: "Mouth and pharynx", cases: 69, share: 5.0, asr: 7.4 },
            { sex: "Men", site: "Bladder", cases: 68, share: 5.0, asr: 6.6 },
            { sex: "Women", site: "Breast", cases: 679, share: 37.5, asr: 66.8 },
            { sex: "Women", site: "Corpus uteri (womb)", cases: 191, share: 10.5, asr: 18.8 },
            { sex: "Women", site: "Colorectal", cases: 177, share: 9.8, asr: 15.6 },
            { sex: "Women", site: "Ovary", cases: 108, share: 6.0, asr: 11.0 },
            { sex: "Women", site: "Cervix uteri", cases: 85, share: 4.7, asr: 9.5 },
          ],
          note: "These are the registry's own counts for the whole Republic of Mauritius, 3,362 cancers in all (1,471 in men, 1,891 in women), not IARC's projection. Cases in foreign nationals are excluded. The registry could not trace cases known from a death certificate alone, because the death data it received were anonymised.",
          sources: [L.ncr],
        },
        {
          id: "mu-registry-mortality-2024",
          title: "The registry's five commonest causes of cancer death in men and in women, 2024",
          caption: "Cancer deaths registered in 2024 and the age-standardised mortality rate (world standard) per 100,000, from the same report.",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "asr", label: "Rate per 100,000", numeric: true },
          ],
          rows: [
            { sex: "Men", site: "Lung", deaths: 123, asr: 12.0 },
            { sex: "Men", site: "Prostate", deaths: 111, asr: 10.7 },
            { sex: "Men", site: "Colorectal", deaths: 102, asr: 10.2 },
            { sex: "Men", site: "Stomach", deaths: 49, asr: 4.8 },
            { sex: "Men", site: "Pancreas", deaths: 48, asr: 4.6 },
            { sex: "Women", site: "Breast", deaths: 244, asr: 21.2 },
            { sex: "Women", site: "Colorectal", deaths: 96, asr: 7.2 },
            { sex: "Women", site: "Lung", deaths: 60, asr: 4.9 },
            { sex: "Women", site: "Ovary", deaths: 60, asr: 5.6 },
            { sex: "Women", site: "Corpus uteri (womb)", deaths: 56, asr: 4.9 },
          ],
          note: "1,649 cancer deaths in all: 803 in men and 846 in women. The registry's count includes people with cancer who died of another cause, so it is not strictly deaths caused by cancer.",
          sources: [L.ncr],
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
          id: "free-public-care",
          title: "Public cancer care is free at the point of delivery",
          plain:
            "The national cancer plan states that the government provides free health care at the point of delivery, including on Rodrigues and Agalega, and that cancer medicines in the public sector are free of charge. For patients whom a hospital medical board recommends for treatment abroad, the Ministry's Overseas Treatment Unit gives financial help to those who meet its income rules.",
          detail:
            "The National Cancer Control Programme 2022-2025 says the public hospital formulary held 65 medicines for cancer patients, with immunotherapy and other newer agents added recently, and that a therapeutic board at the hospital can approve a medicine that is not on the list for an individual patient. The Ministry's hospital services page says the Overseas Treatment Unit gives financial assistance to patients recommended for treatment abroad by a medical board in a regional hospital, provided the household meets the Ministry's income criteria; patients are placed in hospitals in India with which the Ministry has an agreement, or may choose another hospital and receive assistance based on the lowest quotation. The page does not say how many cancer patients use the scheme.",
          links: [L.nccp, L.hosp],
        },
        {
          id: "out-of-pocket",
          title: "Households still pay 45% of health spending themselves",
          plain:
            "WHO's figures put out-of-pocket payments at 45.2% of Mauritius' health spending in 2023, with government paying 44.3%. Health spending was about 616 US dollars a person. The figures cover all health care, not cancer. Mauritius also has a private sector, with 21 private clinics that admit patients.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending as 48.2% of current health expenditure in 2016, 40.4% in 2021 and 45.2% in 2023; domestic government spending as 44.3% in 2023; and current health expenditure as 616.21 US dollars a person in 2023. The Ministry's Health Statistics Report 2024 counts 21 private clinics with in-patient services, and the registry's page on the African Cancer Registry Network says two private cancer clinics offer prevention, diagnosis and treatment alongside the public system. OnCo did not find a source that separates what cancer patients pay privately from the rest.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Mauritius (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: health spending per person, Mauritius (API)", url: WHO_CHE_API },
            { label: "WHO Global Health Expenditure Database: government share, Mauritius (API)", url: WHO_GGHE_API },
            L.hsr,
            L.afcrn,
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Pharmacy Act 1983 (Revised Laws of Mauritius, PDF)", url: PHARMACY_ACT },
      cards: [
        {
          id: "pharmacy-board",
          title: "The Pharmacy Board registers medicines under the Pharmacy Act 1983",
          plain:
            "A medicine cannot be imported into Mauritius unless it is registered with the Pharmacy Board, a body set up by the Pharmacy Act and chaired by the Chief Medical Officer; the Act lets the Board exempt a product from registration. The Ministry's site carries the Board's list of registered products for 2026. WHO's list of regulators at maturity level 3 or 4 does not include Mauritius.",
          detail:
            "Under the Pharmacy Act (Act 60 of 1983), the Board consists of the Chief Medical Officer as chairperson, the Chief Government Pharmacist, five pharmacists appointed by the Minister and a law officer. Section 25 bars the import of a pharmaceutical product that is not registered with the Board; an application goes to the Trade and Therapeutics Committee for its recommendation, and the Board then approves or rejects it. A certificate of registration lasts one year and is renewable, and the Board may exempt a product from registration. The Board's list for 2026 on the Ministry's site numbers 7,957 products and includes tamoxifen, letrozole and imatinib tablets. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Mauritius. The African Union's treaty list of 19 September 2023 records Mauritius signing and ratifying the African Medicines Agency treaty on 21 September 2021.",
          links: [
            { label: "Pharmacy Act 1983 (Revised Laws of Mauritius, PDF)", url: PHARMACY_ACT },
            { label: "Pharmacy Board: products approved for registration, 2026 (PDF)", url: PB_LIST },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
            { label: "African Union: African Medicines Agency treaty, signatures and ratifications (PDF)", url: AU_AMA },
          ],
        },
        {
          id: "clinical-trials-act",
          title: "Clinical trials need a licence from a statutory council",
          plain:
            "The Clinical Trials Act 2011 created the Clinical Research Regulatory Council, which grants or refuses a licence for each clinical trial, approves the investigators and inspects trial sites. The Act also provides for an Ethics Committee.",
          detail:
            "The Act (Act 8 of 2011, dated 1 September 2011 in the Revised Laws, which note that the Council's functions came into operation on 24 September 2011) gives the Council a chairperson and members who include three medical practitioners, two pharmacists, a representative of the University of Mauritius with experience of research in people, a statistician, a law officer, and people experienced in pharmacology and in clinical trials, appointed by the Minister for two years. Its functions include considering applications for a trial licence, issuing, amending, suspending or cancelling licences, approving every investigator's qualifications, and controlling licensees and sites by inspection. Regulations of 2021 on the Ministry's legislation page cover medical device trials and the registration of contract research organisations; OnCo did not read them.",
          links: [{ label: "Clinical Trials Act 2011 (Revised Laws of Mauritius, PDF)", url: CT_ACT }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Mauritius (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2016, 87% of girls in 2025, and boys since 2024",
          plain:
            "Mauritius began vaccinating schoolgirls against HPV in 2016 and extended the programme to boys in February 2024. WHO's figures give first-dose coverage of 87% of girls in the target group in 2025 and 17% of boys. Coverage in girls dipped to 42% in 2022 before recovering.",
          detail:
            "The Ministry's Health Statistics Report 2024 says the programme was introduced for girls in August 2016 and extended to boys in February 2024, that 19,890 doses were given in schools in 2024 (13,543 to boys and 6,347 to girls aged 9 to 15), and that a single-dose vaccine replaced the two-dose one that year. WHO's coverage rows for first dose in girls read 75% in 2016, 88% in 2017, 82% in 2020, 79% in 2021, 42% in 2022, 60% in 2023, 92% in 2024 (6,784 of 7,400) and 87% in 2025 (7,018 of 8,034); for boys, 29% in 2024 and 17% in 2025 (5,313 of 31,946). Last-dose coverage in girls fell to 22% in 2022 and 27% in 2023. The cancer plan describes the original programme, introduced in 2016, as two doses of a bivalent vaccine for girls aged 9 in grade 5, and WHO's 2021 cervical cancer profile also gives 2016 as the year of introduction. WHO's separate vaccine introduction table marks HPV vaccine \"No\" for 2016 and \"Yes\" from 2017, although WHO's coverage rows begin in 2016.",
          links: [{ label: "WHO: HPV vaccination coverage rows for Mauritius (public API)", url: WHO_HPV_API }, L.hsr, L.nccp, L.cerv, { label: "WHO immunisation data: HPV vaccine introduction rows for Mauritius (API)", url: WHO_INTRO_API }],
        },
        {
          id: "screening-programmes",
          title: "Breast and cervical screening in primary care clinics; organised programmes planned",
          plain:
            "The 2022 cancer plan describes breast examination and cervical screening at primary health care centres and mobile clinics, with mammography offered to women at high risk. It set out to build an organised breast screening programme by 2025 and to restructure cervical screening. WHO's profiles recorded no national screening programme for breast cancer in 2019 or for cervical cancer in 2021.",
          detail:
            "The National Cancer Control Programme 2022-2025 describes clinical breast examination by primary care doctors at health centres and the mobile \"Caravanes de Santé\". It recommends a national breast screening programme for women aged 50 to 65 by 2025, a breast unit in each regional hospital, cervical screening by cytology with HPV co-testing for women aged 25 to 65 every five years with a target of nearly 60% coverage, and a colorectal programme using a stool test after a 2018 pilot. WHO's 2020 profile recorded no breast or cervical screening programme in 2019; its 2021 cervical profile recorded no national programme and gave 25% of women aged 30 to 49 as screened in the last five years and 42% as ever screened (2019). OnCo did not find a report of what had been put in place by 2025.",
          links: [L.nccp, L.ccp, L.cerv],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Mauritius does differently",
      cards: [
        {
          id: "cancer-plan",
          title: "A costed national cancer plan built on the registry's figures",
          plain:
            "The Ministry's National Cancer Control Programme 2022-2025 sets priorities for five cancers: breast, cervical, colorectal, prostate and lung. It followed an earlier plan for 2010 to 2014 and took in the recommendations of an IAEA review mission in December 2018.",
          detail:
            "The programme says it drew on the National Cancer Registry's 2020 data, the Ministry's health statistics, a 2015 survey of non-communicable diseases and WHO data, and on the recommendations of the IAEA's imPACT mission of December 2018. It covers prevention, screening, treatment, palliative care and research, includes an evaluation of the 2010 to 2014 plan, and carries costings for staff, screening, diagnosis and radiotherapy. WHO's 2020 profile had recorded the national cancer plan as under development in 2019. The ICCP portal's search for Mauritius, read on 16 November 2026, returned two national cancer plans, this programme and the 2010 to 2014 action plan, beside WHO's profiles and a 2023 survivorship profile written by the portal itself.",
          links: [L.nccp, { label: "ICCP portal: resources for Mauritius", url: ICCP_SEARCH }, L.ccp],
        },
        {
          id: "measuring-survival",
          title: "Survival measured from the country's own records",
          plain:
            "Mauritius has measured how long its breast cancer patients live from its own records. For 1,399 breast cancers newly diagnosed from 2017 to 2020 at the public Central Health Laboratory, net survival was 93.9% at one year and 83.4% at three years.",
          detail:
            "The study, whose first author coordinates the registry, found 44.4% of the cancers diagnosed at stage 1, 20.1% at stage 2, 25.4% at stage 3 and 10.1% at stage 4. Three-year net survival was 77.1% in patients under 50, 71.3% in triple negative disease and 28.5% at stage 4. The authors conclude that a national breast screening programme, earlier stage at diagnosis and molecular subtyping of every breast cancer could improve survival. The earlier trends paper from the registry describes Mauritius as among the few African countries where cancer registration is population based and nationwide. Survival figures for other cancers were not found.",
          links: [
            { label: "Koon Sun Pat et al., breast cancer survival in Mauritius (Int J Cancer 2025)", url: SURVIVAL_DOI },
            { label: "Koon Sun Pat et al., trends in cancer incidence in Mauritius 1991 to 2015 (Cancer Epidemiol 2019)", url: TRENDS_DOI },
            L.afcrn,
          ],
        },
        {
          id: "radiotherapy",
          title: "One public radiotherapy centre",
          plain:
            "The IAEA's directory lists one radiotherapy centre in Mauritius, with five external-beam treatment machines and one brachytherapy unit. The registry's network page of April 2025 places radiotherapy, brachytherapy and cancer surgery at the National Cancer Centre.",
          detail:
            "The public country table of the IAEA's Directory of Radiotherapy Centres gives Mauritius one radiotherapy centre, the National Cancer Centre at Solferino in Vacoas, last updated in 2024, with five high-energy photon and electron beam units and one brachytherapy unit. The data the table loads breaks these down as three linear accelerators, two cobalt-60 machines and one low-dose-rate brachytherapy unit, with no high-dose-rate unit. The 2022 cancer plan described the service as it then stood at Victoria Hospital, where the radiotherapy department opened in 1969: one linear accelerator, two cobalt-60 machines and one low-dose-rate brachytherapy unit, giving conventional radiotherapy. It planned two new linear accelerators with multi-leaf collimators, high-dose-rate brachytherapy and a PET-CT scanner at the new cancer hospital at Solferino, with IAEA training for staff. WHO's 2020 profile counted 10.5 external-beam units per 10,000 cancer patients in 2019. The directory does not date individual machines or cover PET-CT, and OnCo did not find a Ministry source confirming which of the planned machines are now in use.",
          links: [{ label: "IAEA DIRAC: public country table (read 16 November 2026)", url: DIRAC }, L.nccp, L.afcrn, L.ccp],
        },
        {
          id: "services",
          title: "A National Cancer Centre, with chemotherapy at five regional hospitals",
          plain:
            "The National Cancer Centre at Solferino admitted 2,512 patients in 2024. Chemotherapy has been decentralised and is given at all five regional hospitals. Palliative care clinics began in 2017.",
          detail:
            "The Ministry's Health Statistics Report 2024 lists a National Cancer Centre among six specialised public hospitals and records 2,512 admissions there in 2024 (2,583 in 2023). Of 2,540 in-patient cases treated, breast cancer was 427 (16.8%), cancers of the rectum and anus 221 (8.7%) and lung cancer 217 (8.5%). The 2022 cancer plan says the renovated block at Solferino opened in October 2020, when chemotherapy moved there, and that in-patient wards followed in February 2021; a 13-bed children's cancer ward was at Victoria Hospital. It dates palliative care for cancer patients from 2017, with morphine and fentanyl patches on the list of medicines used. The registry's network page says chemotherapy is now available at all five regional hospitals. WHO's 2020 profile recorded no national cancer management guidelines in 2019.",
          links: [L.hsr, L.nccp, L.afcrn, L.ccp],
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
          title: "No trial in OnCo's records has a site in Mauritius",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Mauritius among its countries. The registry itself publishes research: a 25-year study of incidence trends and a breast cancer survival study.",
          detail:
            "OnCo's participation data covers the trials in its graph, mostly large trials of new medicines, not every study registered. A search of the ClinicalTrials.gov API for cancer studies with a location in Mauritius, run on 16 November 2026, returned one: an observational study of the immunotherapy envafolimab given through a patient access programme (NCT07562347), sponsored by IR Innovate Research with Glenmark Pharmaceuticals as collaborator, which plans to collect data on about 120 patients across five countries. ClinicalTrials.gov lists the study as recruiting and its one Mauritian site, C-Care Darny in Floréal, as not yet recruiting. The 2022 cancer plan lists clinical trials among the services intended for the new cancer hospital. Under the Clinical Trials Act a trial needs a licence from the Clinical Research Regulatory Council.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Mauritius", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT07562347", url: CTGOV_STUDY },
            { label: "Koon Sun Pat et al., trends in cancer incidence in Mauritius 1991 to 2015 (Cancer Epidemiol 2019)", url: TRENDS_DOI },
            L.nccp,
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "after-2025",
      title: "What followed the 2022 to 2025 plan was not found",
      plain:
        "OnCo did not find a cancer plan for the years after 2025, or a report on what the 2022 to 2025 programme delivered: whether the organised breast screening programme, HPV co-testing, high-dose-rate brachytherapy and the PET-CT scanner are in place. The IAEA's directory lists three linear accelerators at its 2024 update, where the 2022 plan described one.",
      detail:
        "The Ministry's publications page and the ICCP portal, both read on 16 November 2026, list the National Cancer Control Programme 2022-2025 as the latest cancer plan. The IAEA's public table names the one centre and counts its machines by type, three linear accelerators, two cobalt-60 machines and one low-dose-rate brachytherapy unit at its 2024 update, without dating individual machines; it does not cover PET-CT. The Ministry's page of ongoing infrastructure projects lists the new cancer centre at Solferino without a status. A later pass should read the Ministry's annual report and budget documents, and readers can ask the National Cancer Centre directly which treatments it gives now.",
      links: [
        { label: "Ministry of Health and Wellness: publications and action plans", url: MOH_PUBS },
        { label: "ICCP portal: resources for Mauritius", url: ICCP_SEARCH },
        { label: "Ministry of Health and Wellness: ongoing major infrastructure projects", url: MOH_INFRA },
        { label: "IAEA DIRAC: public table of radiotherapy centres (read 16 November 2026)", url: DIRAC },
      ],
    },
    {
      id: "coverage-and-costs",
      title: "Which medicines are funded, approval times and what the children's scheme pays for were not found",
      plain:
        "The public hospital formulary for cancer was not found as a document, so OnCo cannot say which cancer medicines the public service supplies. The Ministry's notice on the Paediatric Cancer Scheme says only where to apply, not what the scheme pays for.",
      detail:
        "The 2022 plan gives the size of the hospital cancer formulary (65 medicines) without listing it. The Pharmacy Board's list shows what is registered for import, not what public hospitals stock or how long registration takes, and the Board has no website of its own that OnCo could find. The Paediatric Cancer Scheme communiqué on the Ministry's site, dated 28 March 2025, is a scanned image with no text layer, which OnCo read by eye: it says the scheme, which had operated under the Child Cancer Cell at the Ministry of Finance, has been taken over by the Ministry of Health and Wellness's Overseas Treatment Unit, and that applications now go to that unit. It does not say who qualifies or what is paid. How many patients the Overseas Treatment Unit sends abroad for cancer, and the number of oncologists, were not found: WHO's 2020 profile gives no figure for radiation oncologists (\"n/a\"). The Ministry or the treating hospital can say what applies to an individual patient.",
      links: [
        { label: "Ministry of Health and Wellness: Paediatric Cancer Scheme (scanned notice)", url: MOH_PCS },
        { label: "Pharmacy Board: products approved for registration, 2026 (PDF)", url: PB_LIST },
        L.ccp,
      ],
    },
  ],
  institutions: [
    "mauritius-ministry-of-health", "mauritius-national-cancer-centre", "mauritius-national-cancer-registry", "mauritius-pharmacy-board",
    "link-to-life-mauritius", "enn-rev-enn-sourir", "iaea", "who", "iarc",
  ],
  companies: [],
  drugs: ["tamoxifen", "letrozole", "imatinib"],
  trials: [],
  papers: ["paper-koon-sun-pat-mauritius-cancer-trends-canep-2019", "paper-koon-sun-pat-mauritius-breast-survival-ijc-2025"],
  people: [],
  how:
    "Every card was written from Mauritian official sources, international agencies and peer-reviewed papers, read as raw text on 16 November 2026 and not through a summary: the National Cancer Registry's report for 2024, the National Cancer Control Programme 2022-2025, the Health Statistics Report 2024 and the hospital services page of the Ministry of Health and Wellness; the Pharmacy Act 1983, the Clinical Trials Act 2011 and the Pharmacy Board's 2026 list of registered products; the African Cancer Registry Network's page for the registry; IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer profile, 2021 cervical cancer profile, health expenditure rows, HPV coverage rows and August 2026 list of regulators; the African Union's treaty list; the IAEA DIRAC public country table; and two registry papers through Europe PMC. The Ministry's Paediatric Cancer Scheme notice is a scanned image and was read by eye. Trials were counted from OnCo's ClinicalTrials.gov participation data, with one search of the registry itself.",
  verify:
    "The registry's counts are for 2024 and the cancer plan describes services as they stood in 2022. Which machines are running, which medicines are in stock and what help is available for treatment abroad change faster than any published source; ask the National Cancer Centre or your regional hospital what applies to you, and the Ministry of Health and Wellness about the Overseas Treatment Unit.",
  verifyLinks: [
    { label: "Ministry of Health and Wellness, Mauritius", url: MOH },
    { label: "Report of the National Cancer Registry 2024 (PDF)", url: NCR_2024 },
    { label: "African Cancer Registry Network: Mauritius National Cancer Registry", url: AFCRN },
  ],
};
