import type { CountryDive } from "@/data/country-dive";

/**
 * Brunei deep dive: the hand-written cards for /countries/bn/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Brunei Darussalam;
 * the Brunei Darussalam Cancer Registry's counts for 2011 to 2020 as published in BMC Cancer (abstract and open full
 * text through Europe PMC); the Ministry of Health's own pages on screening, pharmacy services and its departments,
 * its Scheme of Charges of July 2025 and its National Cervical Cancer Prevention and Control Guideline 2025; WHO's
 * 2020 cancer country profile and 2021 cervical cancer profile; WHO's immunisation and health expenditure rows from
 * its public data APIs; the IAEA DIRAC public country table; and Jerudong Park Medical Centre's own page. IARC's
 * incidence estimate for Brunei is projected from national registry rates. The registry's own annual reports, the
 * current noncommunicable disease plan and any rule on treatment abroad were not read and are named as gaps.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/96-brunei-darussalam-fact-sheet.pdf";
const REGISTRY_PAPER = "https://doi.org/10.1186/s12885-023-10962-8";
const REGISTRY_PAPER_FULL = "https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10201047/fullTextXML";
const BREAST_PAPER = "https://doi.org/10.1186/s12885-025-13861-2";
const CRC_SURVIVAL_PAPER = "https://doi.org/10.1186/s12885-021-08224-6";
const CRC_REVIEW_PAPER = "https://doi.org/10.31557/apjcp.2019.20.12.3571";
const NHL_PAPER = "https://doi.org/10.1186/s12885-024-12725-5";
const MOH_NHSP = "https://moh.gov.bn/services/national-health-screening-programme/";
const MOH_PHARMACY = "https://moh.gov.bn/services/pharmary-services/";
const MOH_DEPARTMENTS = "https://moh.gov.bn/about-us/ministry-departments/";
const MOH_CHARGES = "https://moh.gov.bn/wp-content/uploads/2025/07/SCHEME-OF-CHARGES-V3.pdf";
const CERVICAL_GUIDELINE = "https://www.iccp-portal.org/sites/default/files/2026-05/CERVICAL-CANCER-2025.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Brunei";
const ICCP_NCD_PLAN = "https://www.iccp-portal.org/resources/brunei-darussalam-national-multi-sectoral-action-plan-prevention-and-control-non";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-brn-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-brn-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BRN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BRN'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'BRN'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'BRN'";
const WHO_ML_LIST = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const JPMC = "https://jpmcbrunei.com/about-us/";
const CTGOV = "https://clinicaltrials.gov/search?country=Brunei%20Darussalam&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=AREA%5BLocationCountry%5DBrunei%20Darussalam&query.cond=cancer&pageSize=20&countTotal=true&fields=NCTId,BriefTitle,OverallStatus,LocationCountry";

const L = {
  iarc: { label: "IARC: GLOBOCAN 2024 fact sheet, Brunei Darussalam (PDF)", url: IARC_FACTSHEET },
  registry: { label: "Leong et al., cancer incidence and mortality in Brunei Darussalam, 2011 to 2020 (BMC Cancer 2023)", url: REGISTRY_PAPER },
  registryFull: { label: "The same paper's full text as read (Europe PMC API, XML)", url: REGISTRY_PAPER_FULL },
  nhsp: { label: "Ministry of Health Brunei: National Health Screening Programme", url: MOH_NHSP },
  pharmacy: { label: "Ministry of Health Brunei: Pharmacy Services", url: MOH_PHARMACY },
  departments: { label: "Ministry of Health Brunei: Ministry Departments", url: MOH_DEPARTMENTS },
  charges: { label: "Ministry of Health Brunei: Scheme of Charges, updated 8 July 2025 (PDF)", url: MOH_CHARGES },
  guideline: { label: "Brunei Darussalam National Cervical Cancer Prevention and Control Guideline 2025 (Ministry of Health, PDF on the ICCP portal)", url: CERVICAL_GUIDELINE },
  who2020: { label: "WHO: Cancer Country Profile 2020, Brunei Darussalam (PDF)", url: WHO_PROFILE_2020 },
  whoCx: { label: "WHO: Cervical Cancer Country Profile 2021, Brunei Darussalam (PDF)", url: WHO_CX_2021 },
  hpv: { label: "WHO immunisation data: HPV programme coverage, Brunei Darussalam (API)", url: WHO_HPV_API },
  oop: { label: "WHO Global Health Expenditure Database: out-of-pocket share, Brunei Darussalam (API)", url: WHO_OOP_API },
  dirac: { label: "IAEA DIRAC: public country table of radiotherapy centres", url: DIRAC },
  jpmc: { label: "Jerudong Park Medical Centre: about us", url: JPMC },
  breast: { label: "Yean et al., breast cancer treatment, delays and survival in Brunei Darussalam (BMC Cancer 2025)", url: BREAST_PAPER },
  ctgov: { label: "ClinicalTrials.gov: cancer studies with a site in Brunei Darussalam (search)", url: CTGOV },
};

export const BN_DIVE: CountryDive = {
  iso2: "BN",
  iso3: "BRN",
  name: "Brunei",
  flag: "🇧🇳",
  asOf: "2026-11-16",
  title: "Cancer in Brunei",
  description:
    "Cancer in Brunei: a national cancer registry since 2001 that counted 6,495 new cancers and 3,359 deaths from 2011 to 2020; IARC's estimate of 849 new cancers and 472 deaths in 2024, projected from national rates; colorectal and breast cancer as the commonest cancers and lung cancer as the commonest cause of cancer death; government money paying 92.5% of health spending and households 7.4% in 2023; national screening for bowel, breast and cervical cancer since 2019; HPV vaccination in schools since 2012, at 89% of girls for the first dose in 2025; one radiotherapy centre in the IAEA's public table, and referral to The Brunei Cancer Centre for radiotherapy; and the ministry reports OnCo could not find.",
  lede:
    "Brunei counts its cancers: a national registry set up by the Ministry of Health in 2001 recorded 6,495 new cancers from 2011 to 2020, and IARC's estimate of 849 new cancers and 472 deaths in 2024 is projected from national rates. The Ministry screens for bowel, breast and cervical cancer, vaccinates schoolgirls against HPV, and its cervical cancer guideline refers women to The Brunei Cancer Centre for radiotherapy; government spending was 92.5% of health expenditure in 2023.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Brunei (which IARC lists as Brunei Darussalam) is 849 new cancers and 472 deaths, an age-standardised incidence of 167.0 per 100,000 (160.9 in men, 180.1 in women) and mortality of 95.3 (99.7 in men, 93.8 in women). For incidence the fact sheet gives the country-specific data source as \"Registry (national)\" and the method as \"Trends in national rates projected to 2024\". For mortality the source is Survcan and the method \"National incidence estimates applied to model-based M:I ratios (registry survival data)\", so IARC's deaths are modelled from incidence, not taken from Brunei's death records. The registry's own published counts are for 2011 to 2020 and cover citizens and permanent residents: 827 new cancers in 2020, at an age-standardised rate of 230.5 per 100,000 as calculated in the 2023 paper, and 3,359 deaths over the ten years. The two sources use different years and methods, and OnCo has not reconciled their rates.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Brunei",
      aside: L.iarc,
      cards: [
        {
          id: "shape",
          title: "About 850 new cancers a year, with colorectal and breast cancer first",
          plain:
            "IARC estimates 849 new cancers and 472 cancer deaths in Brunei in 2024, projected from the national registry's rates. Colorectal cancer is the commonest, then breast and lung cancer, and lung cancer is the commonest cause of cancer death.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 145 colorectal cancers (17.1% of new cancers, 71 deaths), 128 breast cancers (53 deaths), 98 lung cancers (85 deaths, 18.0% of cancer deaths), 46 non-Hodgkin lymphomas, 43 prostate cancers, 42 cervical cancers and 37 liver cancers. In men colorectal cancer is first with 88 of 386 new cancers (22.8%); in women breast cancer is first with 128 of 463 (27.6%). The estimated risk of developing cancer before age 75 is 17.9%, and 2,403 people are estimated to be living within five years of a diagnosis. Brunei's population in IARC's 2024 figures is 462,727, so the yearly numbers are small.",
          links: [L.iarc],
        },
        {
          id: "registry-counts",
          title: "The registry's own count: 6,495 new cancers in ten years",
          plain:
            "The Brunei Darussalam Cancer Registry recorded 6,495 new cancers and 3,359 cancer deaths among citizens and permanent residents from 2011 to 2020. New cases rose from 516 in 2011 to 827 in 2020; the age-standardised rate was similar in those two years, having fallen until 2017 and risen after.",
          detail:
            "The 2023 analysis in BMC Cancer counted 3,792 cancers in women and 2,703 in men. In men the commonest were colorectal (551, 20.4%), lung (323), prostate (258), liver (195) and non-Hodgkin lymphoma (172); in women breast (906), colorectal (455), lung (293), cervix (286) and corpus uteri (284). The age-standardised incidence rate was 234.4 per 100,000 in 2011 and 230.5 in 2020; between those years the paper's trend analysis found a significant fall from 2011 to 2017 (2.0% a year) and a significant rise from 2017 to 2020 (4.5% a year). Over the decade cervical cancer incidence fell significantly and cancer of the body of the womb rose; stomach cancer mortality fell. The authors expect the number of cancers to keep growing as the population ages.",
          links: [L.registry, L.registryFull],
        },
        {
          id: "how-the-registry-works",
          title: "How the Brunei Darussalam Cancer Registry collects its cases",
          plain:
            "The Ministry of Health set up the Brunei Darussalam Cancer Registry in 2001 as a population-based record of every malignant cancer diagnosed in the country. Reporting is not required by law, so the registry collects cases itself from pathology, hospital records and death registration.",
          detail:
            "The registry's description comes from the methods of the 2023 BMC Cancer paper. Doctors and nurses in all hospitals, health centres and clinics are encouraged to notify new cancers on a standard form; deaths are taken from the national register of births and deaths and checked against medical records. Since 2013 the national electronic patient record system has made it easier to extract and verify cases. The Ministry's departments page lists national cancer registry management among the services of the Epidemic Intelligence and Response Unit of the Brunei Centre for Disease Control and Prevention, a unit established on 1 November 2023. WHO's 2020 profile recorded a population-based registry and death registration of high quality, and IARC's 2024 fact sheet names a national registry as its incidence source.",
          links: [L.registryFull, L.registry, L.departments, L.who2020, L.iarc],
        },
        {
          id: "survival",
          title: "Published survival figures for Brunei",
          plain:
            "Brunei researchers have published survival figures for several cancers. Overall five-year survival was 56.0% for 1,035 people diagnosed with colorectal cancer from 2002 to 2017, and 61.2% for 330 people diagnosed with non-Hodgkin lymphoma from 2011 to 2020.",
          detail:
            "These are averages across everyone in each group, diagnosed some years ago, and stage at diagnosis changes them a great deal. In the colorectal study one-year survival was 78.6% and three-year survival 62.5%; five-year survival was 64.7% for those diagnosed in 2002 to 2009 and 51.3% for 2010 to 2017, a difference the abstract reports and does not explain. In the lymphoma study diffuse large B-cell lymphoma was 39.1% of cases, and survival was lower in older patients and in those diagnosed after the disease had spread. A 2025 study of 431 women treated for breast cancer from 2013 to 2022 found five-year relative survival of 98.7% and overall survival of 92.3% among those treated with surgery alone; the abstract does not say how many women were in that group. For each paper only the abstract was read.",
          links: [
            { label: "Lee et al., survival of colorectal cancer patients in Brunei Darussalam, 2002 to 2017 (BMC Cancer 2021)", url: CRC_SURVIVAL_PAPER },
            { label: "Mwalim et al., non-Hodgkin lymphoma in Brunei Darussalam, 2011 to 2020 (BMC Cancer 2024)", url: NHL_PAPER },
            L.breast,
          ],
        },
      ],
      tables: [
        {
          id: "registry-2011-2020",
          title: "The national registry's counts, 2011 to 2020",
          caption: "New cancers and cancer deaths recorded by the Brunei Darussalam Cancer Registry among citizens and permanent residents, 2011 to 2020 (ten years together), from Leong et al., BMC Cancer 2023",
          columns: [
            { key: "group", label: "Group" },
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { group: "Everyone", site: "All cancers", cases: 6495, deaths: 3359 },
            { group: "Men", site: "All cancers", cases: 2703, deaths: 1636 },
            { group: "Men", site: "Colorectal", cases: 551, deaths: 278 },
            { group: "Men", site: "Lung and bronchus", cases: 323, deaths: 293 },
            { group: "Men", site: "Prostate", cases: 258, deaths: 153 },
            { group: "Men", site: "Liver", cases: 195, deaths: 158 },
            { group: "Men", site: "Non-Hodgkin lymphoma", cases: 172, deaths: null },
            { group: "Men", site: "Stomach", cases: null, deaths: 105 },
            { group: "Women", site: "All cancers", cases: 3792, deaths: 1723 },
            { group: "Women", site: "Breast", cases: 906, deaths: 309 },
            { group: "Women", site: "Colorectal", cases: 455, deaths: 214 },
            { group: "Women", site: "Lung and bronchus", cases: 293, deaths: 250 },
            { group: "Women", site: "Cervix uteri", cases: 286, deaths: 116 },
            { group: "Women", site: "Corpus uteri", cases: 284, deaths: null },
            { group: "Women", site: "Ovary", cases: null, deaths: 116 },
          ],
          note: "The paper's text gives the five commonest cancers and the five leading causes of cancer death for each sex; a blank cell means the cancer was outside that sex's top five for that measure, not that the count was zero. These are ten-year totals, not annual figures, and they cover citizens and permanent residents only.",
          sources: [L.registry, L.registryFull],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "spending",
          title: "Government money pays for 92.5% of health care",
          plain:
            "WHO estimates that government spending was 92.5% of Brunei's current health expenditure in 2023 and out-of-pocket payments 7.4%. Total health spending was US$733 per person that year.",
          detail:
            "WHO's Global Health Expenditure Database gives an out-of-pocket share of 6.9% in 2021, 7.9% in 2022 and 7.4% in 2023, a domestic government share of 93.0%, 92.1% and 92.5% in the same years, and no external funding. Current health expenditure per person was US$665.87 in 2021, US$648.55 in 2022 and US$733.01 in 2023. WHO's index of essential health service coverage for Brunei was 84 out of 100 in 2023. None of these figures is specific to cancer.",
          links: [
            L.oop,
            { label: "WHO Global Health Expenditure Database: government share, Brunei Darussalam (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person, Brunei Darussalam (API)", url: WHO_CHE_API },
            { label: "WHO Global Health Observatory: service coverage index, Brunei Darussalam (API)", url: "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'BRN'" },
          ],
        },
        {
          id: "charges",
          title: "Who is exempt from hospital charges, in the Ministry's 2025 scheme",
          plain:
            "The Ministry of Health's Scheme of Charges, revised from 1 July 2025, marks holders of a yellow identity card, and holders of a purple identity card labelled stateless, as exempt from charges at government facilities and for referrals to non-government facilities. Their outpatient registration fee is one dollar.",
          detail:
            "The same table marks holders of a purple identity card labelled \"With Foreign Nationalities\" and holders of a green identity card as charged, with an exception for contract government officers depending on their terms of reference; the outpatient registration fee is three dollars for those officers and for purple card holders with a foreign nationality, and five dollars for others. Spouses are listed row by row: a stateless spouse with a purple card is marked exempt, and a spouse with a foreign nationality or a green card is marked charged. The scheme lists prices for those who pay, including cancer operations, but OnCo did not find in it a statement about chemotherapy or radiotherapy at The Brunei Cancer Centre, which is part of a private hospital. The document does not define the card colours or say who holds which card, so check your own category with the hospital's billing office. The 2023 registry paper refers to the \"adoption of universal health coverage in Brunei Darussalam\" without setting out the rules.",
          links: [L.charges, L.registryFull],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "medicines-control-authority",
          title: "The Brunei Darussalam Medicines Control Authority, through the Department of Pharmaceutical Services",
          plain:
            "Medicines in Brunei are regulated under the Medicines Order, 2007. The Brunei Darussalam Medicines Control Authority decides on registration and licences through the Ministry of Health's Department of Pharmaceutical Services, and a medicine has had to be registered before sale since July 2012.",
          detail:
            "The Ministry's Pharmacy Services page says the authority is responsible for decisions and recommendations on any registration, the issue of any licence and the listing of any medicinal product, and that importers, wholesalers and manufacturers must register a product before it is marketed. The page also carries an application for an import permit for medicinal products with special approval, a route OnCo did not read in detail. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include the authority. OnCo did not read a list of registered cancer medicines or a hospital formulary, so the cancer centre's pharmacy is the place to ask whether a given medicine is available.",
          links: [L.pharmacy, { label: "WHO: list of regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML_LIST }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      cards: [
        {
          id: "national-screening",
          title: "National screening for bowel, breast and cervical cancer since 2019",
          plain:
            "The Ministry of Health's National Health Screening Programme, organised in 2019, offers citizens and permanent residents a stool test for bowel cancer at ages 50 to 75, a mammogram at ages 40 to 69 and an HPV test for cervical cancer at ages 25 to 65.",
          detail:
            "The Ministry's page says the bowel test is a faecal immunochemical test for people who have not had a stool test in the last two years or a colonoscopy in the last ten; the mammogram is for women who have not had one in the last three years; and the cervical test is for sexually active women who have not had a Pap smear in three years or an HPV test in five. Each test is for people with no history of that cancer. People register through the BruHealth app or with a form at a health centre, where a screening nurse checks eligibility. A 2019 review by Brunei researchers recorded that there was then no formal national bowel screening programme, and that screening was offered case by case. WHO's 2020 profile recorded no breast screening programme for 2019, the year the national programme was organised. The Ministry's page gives no participation figures.",
          links: [L.nhsp, L.departments, { label: "Lim et al., colorectal cancer in Brunei Darussalam and the rationale for national screening (Asian Pac J Cancer Prev 2019)", url: CRC_REVIEW_PAPER }, L.who2020],
        },
        {
          id: "cervical",
          title: "Cervical cancer: from Pap tests to HPV self-sampling, and a falling rate",
          plain:
            "Brunei's 2025 national guideline makes the HPV test the screening method for women aged 25 to 65, every five years, with a self-taken sample offered first. The guideline reports that cervical cancer incidence fell from 20 per 100,000 in 2012 to 12 in 2021.",
          detail:
            "The Ministry's guideline, first printed in January 2025, replaces one from 2009. It records a national Pap test registry with mailed invitations and recall from 2011 and a move to liquid-based cytology in 2012, and says cervical cancer went from the second most diagnosed cancer in women in 2009 to the fifth in 2021. WHO's 2021 cervical cancer profile estimated that 70% of women aged 30 to 49 had ever been screened and 32% in the last five years (2019). Under the guideline a woman with cancer is discussed at the Joint Cancer Clinic in the obstetrics and gynaecology department of Raja Isteri Pengiran Anak Saleha Hospital, held every Wednesday morning, and referred to The Brunei Cancer Centre for radiotherapy, brachytherapy or chemotherapy.",
          links: [L.guideline, L.whoCx],
        },
        {
          id: "hpv",
          title: "HPV vaccination in schools since 2012, at 89% of girls in 2025",
          plain:
            "Brunei has vaccinated schoolgirls against HPV since 2012. WHO's programme coverage figures for girls in 2025 are 89% for the first dose and 85% for the last dose, and coverage has stayed between 76% and 93% every year since the programme began.",
          detail:
            "The Ministry's 2025 guideline says the National School-Based HPV Vaccination Programme was launched on 6 October 2011 and given from 2012 to girls in Year 7 (aged 10 to 12), with a catch-up for Year 11 girls from 2012 to 2015; it is voluntary and needs a parent's written consent, and the nine-type vaccine has been used since 2022. WHO's immunisation data give first-dose programme coverage in girls of 91% in 2012, 79% in 2015, 93% in 2021, 92% in 2024 and 89% in 2025, and last-dose coverage of 88% in 2012, 76% in 2015, 88% in 2024 and 85% in 2025. WHO's rows hold no figure for boys.",
          links: [L.hpv, L.guideline, L.whoCx],
        },
      ],
    },
    {
      id: "doing",
      nav: "Treatment",
      title: "Where cancer is treated",
      cards: [
        {
          id: "cancer-centre",
          title: "One radiotherapy centre, and referral to The Brunei Cancer Centre",
          plain:
            "Brunei has one radiotherapy centre in the IAEA's public table, with two treatment machines and one internal radiotherapy (brachytherapy) unit, in an entry last updated in 2025. The Ministry's cervical cancer guideline refers women to The Brunei Cancer Centre for radiotherapy, brachytherapy and chemotherapy.",
          detail:
            "The Brunei Cancer Centre is one of three centres of excellence of Jerudong Park Medical Centre, a private specialist hospital founded in 1992. Its own page says Jerudong Park Medical Centre and Pantai Jerudong Specialist Centre integrated on 1 January 2025, and that the hospital was first accredited by Joint Commission International in 2014 and re-accredited in 2017, 2020 and 2023. The public country table of the IAEA's Directory of Radiotherapy Centres gives Brunei, last updated in 2025, one radiotherapy centre, two high-energy photon and electron beam units and one brachytherapy unit; the table does not name the centre. WHO's 2020 profile counted all three treatment services (surgery, radiotherapy and chemotherapy) for 2019. OnCo found no primary source on which cancers, if any, are referred abroad.",
          links: [L.jpmc, L.dirac, L.guideline, L.who2020],
        },
        {
          id: "treatment-delay",
          title: "Time to treatment is measured, and it matters",
          plain:
            "A 2025 registry study of 431 women treated for breast cancer from 2013 to 2022 found that 62.9% started treatment within 60 days of diagnosis. Starting later than 60 days was linked to a risk of death 2.5 times as high.",
          detail:
            "Surgery was the commonest first treatment (55.9%), at a median of 37 days from diagnosis, followed by chemotherapy (30.6%). Stage at diagnosis was regional in 45.7% of women and localised in 39.0%; women with distant spread at diagnosis had a much higher risk of death than those with localised disease (hazard ratio 15.3). The authors, from Universiti Brunei Darussalam and colleagues, suggest a policy target of starting breast cancer treatment within two months of diagnosis. The figures describe a group, not one person, and the abstract does not say why some women started later. If you are waiting, it is reasonable to ask the clinic for the planned date of your first treatment.",
          links: [L.breast],
        },
        {
          id: "plan",
          title: "No separate cancer plan found; cancer sits within the noncommunicable disease plan",
          plain:
            "OnCo found no stand-alone national cancer control plan for Brunei. WHO's 2020 profile recorded an operational plan for noncommunicable diseases in 2019, and the International Cancer Control Partnership portal lists a national multisectoral action plan for 2021 to 2025.",
          detail:
            "A search of the portal on 16 November 2026 returned Brunei's multisectoral action plans for noncommunicable diseases of 2013 and of 2021 to 2025, the 2025 cervical cancer guideline and WHO's profiles, and no cancer control plan. The portal's link to the 2021 to 2025 plan points to a file on the Ministry of Health's site that returned page not found, so OnCo did not read it and does not describe its cancer content. WHO's 2020 profile gives no entry for a national cancer control plan and recorded that there were no cancer management guidelines in 2019; the 2025 cervical guideline is one such guideline published since. The Ministry of Health can say what plan is in force now.",
          links: [{ label: "ICCP portal: search for Brunei (results on 16 November 2026)", url: ICCP_SEARCH }, { label: "ICCP portal: Brunei Darussalam multisectoral action plan for noncommunicable diseases 2021 to 2025", url: ICCP_NCD_PLAN }, L.who2020, L.guideline],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records has a site in Brunei",
          plain:
            "None of the cancer trials in OnCo's records lists a site in Brunei. ClinicalTrials.gov itself returned two studies with a site in Brunei for the search term cancer on 16 November 2026, and neither was recruiting.",
          detail:
            "The count from OnCo's graph reflects the trials OnCo holds, not every study in Brunei. The two studies the registry's API returned were the Molecular Profiling Project (NCT04025515), a multi-country study listed as suspended, and a trial comparing selective internal radiation therapy with sorafenib in liver cancer (NCT01135056), whose status the registry gives as unknown. Much of Brunei's published cancer research is analysis of registry data: a title search of Europe PMC returned papers from the last five years on incidence and mortality, breast, colorectal, lung, ovarian and cervical cancer survival, non-Hodgkin lymphoma and inherited BRCA mutations. A patient looking for a trial can ask the oncologist about studies in neighbouring countries.",
          links: [L.ctgov, { label: "ClinicalTrials.gov API: the query read on 16 November 2026", url: CTGOV_API }, L.registry],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "ministry-reports",
      title: "The registry's own reports were not found",
      plain:
        "OnCo did not find an annual report of the Brunei Darussalam Cancer Registry on the Ministry of Health's website, so the newest counted figures on this page are for 2020, from a journal paper. Press reports of later years were not read and are not repeated here.",
      detail:
        "A search of the Ministry's site for the registry returned no document, and the addresses tried for its publications and legislation pages returned page not found. A Borneo Bulletin article about the registry's figures returned a challenge page to the script (HTTP 403) and was not read. UICC's member page for Jerudong Park Medical Centre refused the request (HTTP 406). WHO's 2020 cancer profile for Brunei is on WHO's own site at the address linked on this page (the file cancer-brn-2020.pdf); the shorter address that works for some other countries (brn-2020.pdf) returns not found. A future pass should ask the Ministry's Brunei Centre for Disease Control and Prevention for the registry's latest report, which is also where a reader can ask for current figures.",
      links: [L.departments, L.who2020, L.registry],
    },
    {
      id: "rules-not-read",
      title: "Rules not read: treatment abroad, the medicines list and the current plan",
      plain:
        "OnCo found no primary source on whether and when the government sends cancer patients abroad for treatment, did not read a list of cancer medicines registered or stocked in Brunei, and could not open the noncommunicable disease plan for 2021 to 2025.",
      detail:
        "The Scheme of Charges was searched for cancer treatment and for the card categories; it sets prices and exemptions but does not define who holds which card or what is paid at The Brunei Cancer Centre. The Medicines Order, 2007 itself was not read, only the Ministry's description of it. The IAEA's list of individual radiotherapy centres needs a sign-in, so only its public country table was read. For the survival and treatment papers only abstracts were read, and a 2024 overview of lung cancer in Brunei has no abstract in Europe PMC and was not used. A future pass should read the Order itself and the plan; a patient can ask the treating team at Raja Isteri Pengiran Anak Saleha Hospital or The Brunei Cancer Centre what is covered and where treatment will be given.",
      links: [L.charges, L.pharmacy, L.dirac],
    },
  ],
  institutions: ["brunei-cancer-centre-jpmc", "brunei-darussalam-cancer-registry", "brunei-ministry-of-health", "brunei-department-of-pharmaceutical-services", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-leong-cancer-incidence-mortality-brunei-bmccancer-2023"],
  people: [],
  how:
    "Every card was written from sources read as raw text on 16 November 2026, not through a summary: IARC's GLOBOCAN 2024 fact sheet; the Brunei Darussalam Cancer Registry's counts as published in BMC Cancer in 2023 (abstract and open full text through Europe PMC); the Ministry of Health's pages on the National Health Screening Programme, Pharmacy Services and its departments, its Scheme of Charges updated 8 July 2025 and its National Cervical Cancer Prevention and Control Guideline 2025; WHO's 2020 cancer country profile and 2021 cervical cancer profile; WHO's HPV and health expenditure rows from its public data APIs; the public country table of the IAEA's Directory of Radiotherapy Centres; WHO's August 2026 list of regulators at maturity level 3 and 4; Jerudong Park Medical Centre's own page; the International Cancer Control Partnership portal; the ClinicalTrials.gov API; and the abstracts of registry papers resolved through Europe PMC. Trials were counted from OnCo's own ClinicalTrials.gov participation data. The new records added for this page (the Ministry of Health, the Department of Pharmaceutical Services and one paper) carry their own sources.",
  verify:
    "The counted figures here stop at 2020 and the charges scheme is dated July 2025. Check with the Ministry of Health, Raja Isteri Pengiran Anak Saleha Hospital or The Brunei Cancer Centre what applies to you now: which screening you are due, what you would pay, and where your treatment will be given.",
  verifyLinks: [L.iarc, L.registry, L.nhsp, L.charges],
};
