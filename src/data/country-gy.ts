import type { CountryDive } from "@/data/country-dive";

/**
 * Guyana deep dive: the hand-written cards for /countries/gy/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Guyana (PDF text);
 * WHO's Cancer Country Profile 2020 and Cervical Cancer Country Profile 2021 for Guyana (PDF text); WHO's vaccine
 * introduction, HPV coverage and Global Health Expenditure Database rows from its public data APIs; IAEA DIRAC's public
 * equipment data; the Ministry of Health's page on the Cervical Cancer Screening Voucher Programme and its Action Plan
 * for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF text, ICCP portal copy); IAEA's note on its imPACT
 * review of December 2018 (PDF text); the Food and Drugs Regulations under Cap. 34:03 (FAOLEX PDF text); the
 * Department of Public Information's report of 14 December 2017 on the Caribbean Regulatory System; CARPHA's Caribbean
 * Regulatory System pages; the Cancer Institute of Guyana's and the Georgetown Public Hospital Corporation's own pages;
 * a Kaieteur News report of 12 October 2024 on the cancer registry's figures; and two papers resolved through Europe
 * PMC. Sources that could not be found or read are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/328-guyana-fact-sheet.pdf";
const WHO_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/guy-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-guy-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GUY'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'GUY'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'GUY'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'GUY'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'GUY'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const VOUCHER = "https://health.gov.gy/cervical-cancer-screening-programme/";
const ACTION_PLAN = "https://www.iccp-portal.org/sites/default/files/2026-01/Guyana-Cervical-Cancer-Elimination-Strategy-2024-2030-1.pdf";
const IAEA_IMPACT = "https://iaea.org/sites/default/files/documents/review-missions/guyana_-_2018_impact_review.pdf";
const FD_REGS = "https://faolex.fao.org/docs/pdf/guy211856.pdf";
const DPI_CRS = "https://dpi.gov.gy/guyana-to-adopt-crs-measures-for-procurement-of-pharmaceuticals";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/faq";
const CIG_ABOUT = "https://cancerinstituteguyana.com/about_us.html";
const GPHC_CANCER = "https://gphc.gov.gy/services/cancer-care/";
const KAIETEUR_2024 = "https://www.kaieteurnewsonline.com/2024/10/12/693-cancer-cases-recorded-in-first-six-months-of-2024/";
const GHDX_REPORT = "https://ghdx.healthdata.org/node/55844";
const GICR_HUB = "https://gicr.iarc.fr/hub/caribbean/";
const MOH = "https://health.gov.gy/";
const PLUMMER_2009 = "https://doi.org/10.1186/1750-9378-4-s1-s7";
const MARTIN_2014 = "https://doi.org/10.1111/jog.12366";
const CTGOV = "https://clinicaltrials.gov/search?country=Guyana&cond=cancer";

export const GY_DIVE: CountryDive = {
  iso2: "GY",
  iso3: "GUY",
  name: "Guyana",
  flag: "🇬🇾",
  asOf: "2026-11-16",
  title: "Cancer in Guyana",
  description:
    "Cancer in Guyana from its own and WHO sources: IARC's estimate of 1,350 new cancers and 688 deaths in 2024, modelled from death records although a national cancer registry has existed since 2000, prostate, breast and cervical cancer the commonest, one radiotherapy centre in Georgetown, a voucher that pays for cervical screening, HPV vaccination reaching 71% of girls, and medicines licensed under the Food and Drugs Act.",
  lede:
    "Prostate, breast and cervical cancer are the commonest cancers in Guyana. A national cancer registry has collected cases since 2000, but IARC lists no incidence data for the country and models its estimate of 1,350 new cancers in 2024 from death records. Radiotherapy is given at one centre, the Cancer Institute of Guyana on the public hospital's compound in Georgetown, and since June 2024 a government voucher has paid for cervical screening.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Guyana is 1,350 new cancers and 688 deaths, an age-standardised incidence of 163.7 per 100,000 (166.6 in men, 169.2 in women, as the fact sheet prints them) and mortality of 83.7. The fact sheet gives the country-specific incidence data source as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\": new cases are worked out from deaths. Mortality comes from WHO national data, with the method \"Trends in national rates projected to 2024\". Guyana's own registry counts differ: the Ministry of Health's action plan gives 68 cervical cancers reported to the national registry for 2023, where IARC estimates 139 for 2024. A registry that misses cases and a model that estimates them from deaths will not agree, and neither figure here is a complete count.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Guyana",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Guyana (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,350 new cancers a year, with prostate cancer the commonest",
          plain:
            "IARC estimates 1,350 new cancers in Guyana in 2024, 585 in men and 765 in women, and 688 cancer deaths. Prostate cancer is the commonest, then breast and cervical cancer, and the same three cause the most deaths. Half of all cancers estimated in men are prostate cancers.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 288 prostate cancers (123 deaths), 215 breast cancers (80 deaths), 139 cervical cancers (76 deaths), 114 colorectal cancers (59 deaths), 81 cancers of the body of the womb (20 deaths), 63 lung cancers (59 deaths) and 48 liver cancers (46 deaths). In men the leading cancers are prostate (288, 49.2%), colorectum (48) and lung (36); in women, breast (215, 28.1%), cervix (139, 18.2%) and body of the womb (81). The risk of developing cancer before age 75 is 16.2%, and of dying of it 9.0%. An estimated 3,387 people are living within five years of a diagnosis.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Guyana (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "registry",
          title: "A national cancer registry since 2000, part of the Ministry of Health",
          plain:
            "The Cancer Registry of Guyana was set up in 2000 inside the Ministry of Health and collects cases from public and private hospitals and laboratories. Its yearly cervical cancer counts for 2020 to 2023, between 56 and 91, are below IARC's estimate of 139 for 2024, while the 693 cancers of all kinds it recorded in the first half of 2024 are about half of IARC's 1,350 for the whole year. IARC's fact sheet lists no incidence data for Guyana.",
          detail:
            "A 2009 paper by the registry's staff describes it as population-based, built on pathologically supported diagnoses abstracted from the records of institutions across the country, and names its difficulties: no law making cancer a notifiable disease, cancer not recorded as a contributory cause of death where it was the underlying disease, and wealthier patients seeking diagnosis and treatment abroad. Its database then held 589 breast, 573 cervical and 525 prostate cancers. The Ministry's 2024 action plan reports 56, 57, 91 and 68 cervical cancers from the registry for 2020 to 2023. Kaieteur News reported in October 2024 that the registry had recorded 693 cancers in the first half of 2024, 149 of them breast and 91 prostate. IAEA's note on its 2018 review says the Ministry planned to strengthen registration. Guyana is covered by the IARC Caribbean Hub for Cancer Registration.",
          links: [
            { label: "Best Plummer et al., ethnicity and cancer in Guyana (Infect Agent Cancer 2009)", url: PLUMMER_2009 },
            { label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF, ICCP portal)", url: ACTION_PLAN },
            { label: "Kaieteur News: 693 cancer cases recorded in first six months of 2024 (12 October 2024)", url: KAIETEUR_2024 },
            { label: "IAEA: imPACT review, Guyana, December 2018 (PDF)", url: IAEA_IMPACT },
            { label: "IARC Global Initiative for Cancer Registry Development: Caribbean Hub", url: GICR_HUB },
          ],
        },
      ],
      tables: [
        {
          id: "gy-top",
          title: "IARC's leading cancers for Guyana, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 288, deaths: 123 },
            { site: "Breast", cases: 215, deaths: 80 },
            { site: "Cervix uteri", cases: 139, deaths: 76 },
            { site: "Colorectum", cases: 114, deaths: 59 },
            { site: "Corpus uteri", cases: 81, deaths: 20 },
            { site: "Lung", cases: 63, deaths: 59 },
            { site: "Non-Hodgkin lymphoma", cases: 50, deaths: 16 },
            { site: "Liver", cases: 48, deaths: 46 },
            { site: "All cancers", cases: 1350, deaths: 688 },
          ],
          note: "IARC lists no incidence data for Guyana: new cases are modelled from national mortality estimates and mortality-to-incidence ratios, not taken from the national registry.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Guyana (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "gy-registry-cervix",
          title: "Cervical cancers reported by the national cancer registry, 2020 to 2023",
          caption: "New cervical cancers a year as the Ministry of Health's 2024 action plan reports them from the registry.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "Cervical cancers reported", numeric: true },
          ],
          rows: [
            { year: "2020", cases: 56 },
            { year: "2021", cases: 57 },
            { year: "2022", cases: 91 },
            { year: "2023", cases: 68 },
            { year: "2020 to 2023", cases: 272 },
          ],
          note: "Registry reports, not estimates. The plan marks 2021 and 2022 as finally updated, so 2023 may be incomplete. IARC's modelled estimate for 2024 is 139.",
          sources: [{ label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF, ICCP portal)", url: ACTION_PLAN }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Ministry of Health: Cervical Cancer Screening Voucher Programme", url: VOUCHER },
      cards: [
        {
          id: "spending",
          title: "Government pays about 70% of health spending; households pay about a quarter directly",
          plain:
            "WHO's figures put health spending in Guyana at about 505 US dollars a person in 2023. Government paid about 70% of it and households paid about 26% out of their own pockets. Radiotherapy is given by a non-profit centre that says it charges a subsidised rate to patients sent by the Ministry of Health.",
          detail:
            "WHO's Global Health Expenditure Database gives, for 2023, current health expenditure of US$505 per person, up from US$364 in 2020, with 70.1% from domestic government sources, 26.3% out of pocket and 1.2% from external sources. The Cancer Institute of Guyana says it was formed in 2006 as a public-private partnership between the Ministry and Global Imaging Services, and that its mission is to provide radiation treatment at a subsidised cost to patients who come through the Ministry. The Ministry's action plan says cervical cancer prevention, screening and treatment are part of its Package of Essential Health Services. OnCo found no official statement of what a patient pays for chemotherapy at the public hospital; the hospital's oncology department is the place to ask.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Guyana (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "Cancer Institute of Guyana: about us", url: CIG_ABOUT },
            { label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF, ICCP portal)", url: ACTION_PLAN },
          ],
        },
        {
          id: "voucher",
          title: "A government voucher worth 8,000 Guyanese dollars pays for a cervical screening test",
          plain:
            "Since 21 June 2024 women aged 21 to 65 can collect a voucher from any health centre and use it at approved private laboratories and clinics for cervical screening, including an HPV test. If the test finds a problem, the woman is referred to a public health facility.",
          detail:
            "The Ministry of Health's page describes the Cervical Cancer Screening Voucher Programme as a national initiative launched on 21 June 2024. The voucher, valued at $8,000 (the page names no currency; Guyanese dollars are assumed here), covers testing for human papillomavirus and other screening procedures used to detect abnormal cervical cells, through a network of approved private laboratories and healthcare providers. Women in whom precancerous cells or other abnormalities are detected are referred to a public health facility for further evaluation and treatment. The page says thousands of women have used it and gives no count.",
          links: [{ label: "Ministry of Health: Cervical Cancer Screening Voucher Programme", url: VOUCHER }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Food and Drugs Regulations, Laws of Guyana Cap. 34:03 (FAOLEX PDF)", url: FD_REGS },
      cards: [
        {
          id: "ga-fdd",
          title: "The Government Analyst Food and Drug Department, under the Food and Drugs Act",
          plain:
            "Medicines in Guyana are regulated under the Food and Drugs Act by the Government Analyst Food and Drug Department. The regulations say nobody may import or sell a new drug without a licence issued by the Minister.",
          detail:
            "Regulation 78 of the Food and Drugs Regulations, made under Chapter 34:03 of the Laws of Guyana, says no person shall import, sell or advertise for sale a new drug unless he holds a licence in force issued by the Minister for that drug; the application must set out, among other things, the ingredients, the proposed dosage, the claims to be made, known contraindications and side effects, and how the drug is manufactured and packaged. The regulations define the Government Analyst as including the Commissioner of Food and Drugs. In December 2017 the Department of Public Information reported the department's director saying that Guyana recognised the difficulty it faced in registering quality medicines locally. The text read is the 2012 revision of the laws; OnCo did not find the department's own website, so current forms and fees are not described here.",
          links: [
            { label: "Food and Drugs Regulations, Laws of Guyana Cap. 34:03, regulation 78 (FAOLEX PDF)", url: FD_REGS },
            { label: "Department of Public Information: Guyana to adopt CRS measures for procurement of pharmaceuticals (14 December 2017)", url: DPI_CRS },
          ],
        },
        {
          id: "crs",
          title: "A Caribbean review route that Guyana chose to use",
          plain:
            "The Caribbean Community's public health agency runs a shared review service for medicines, which recommends products that a trusted regulator elsewhere has already approved. Guyana is one of six countries the service lists as granting marketing authorisations of their own.",
          detail:
            "CARPHA's pages say health ministers agreed in 2016 to create the Caribbean Regulatory System within the Caribbean Public Health Agency, and its guidance says in one place that the aim is to turn its recommendation into a lawful national marketing authorisation within 60 calendar days and in another that the target is 120 calendar days. The guidance lists Belize, Guyana, Haiti, Jamaica, Suriname and Trinidad and Tobago as the countries that conduct marketing authorisation. At a workshop in Guyana in December 2017 a CARPHA officer said the system does not replace a country's own quality assurance, that taking part is voluntary, and that the products it had registered were either prequalified by WHO or registered by another stringent regulatory authority. CARPHA's guidance is undated.",
          links: [
            { label: "CARPHA: about the Caribbean Regulatory System", url: CRS_ABOUT },
            { label: "CARPHA: Caribbean Regulatory System, guidance and questions for applicants", url: CRS_FAQ },
            { label: "Department of Public Information: Guyana to adopt CRS measures for procurement of pharmaceuticals (14 December 2017)", url: DPI_CRS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF)", url: ACTION_PLAN },
      cards: [
        {
          id: "cervical-screening",
          title: "A cervical cancer plan to 2030 that starts from 1.3% of women screened",
          plain:
            "Guyana's action plan for 2024 to 2030 aims to screen 70% of women aged 21 to 65 twice, using visual inspection, HPV tests and Pap smears. It gives its own starting point: 1.3% of women in that age range screened by visual inspection in 2023.",
          detail:
            "The plan's indicator table sets yearly targets rising from 5% to 20% of women aged 21 to 65 screened once, from a baseline of 1.3% collected for visual inspection with acetic acid in 2023, and aims to treat 90% of women found to have precancer or cancer. WHO's 2021 profile recorded a national programme using visual inspection for women aged 25 to 49 and estimated that 18% of women aged 30 to 49 had been screened in the previous five years. An earlier project screened 21,597 women at 18 sites between January 2009 and June 2012 by visual inspection with immediate freezing treatment, reaching 17% of women aged 25 to 49; 13% tested positive and 85% of those eligible were treated at the same visit. WHO's 2020 profile recorded no breast screening programme.",
          links: [
            { label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF, ICCP portal)", url: ACTION_PLAN },
            { label: "WHO: Cervical Cancer Country Profile 2021, Guyana (PDF)", url: WHO_CX_2021 },
            { label: "Martin et al., single-visit cervical screening and treatment in Guyana (J Obstet Gynaecol Res 2014)", url: MARTIN_2014 },
            { label: "WHO: Cancer Country Profile 2020, Guyana (PDF)", url: WHO_2020 },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination reached 71% of girls in 2024, after years at 40% or lower",
          plain:
            "Guyana began HPV vaccination in 2012 and made it nationwide in 2017. WHO's figures show coverage among girls at 71% in 2024 and 2025, up from 40% in 2023 and 2% in 2021. Boys are also vaccinated; their coverage was 33% in 2025.",
          detail:
            "The Ministry's action plan says the quadrivalent HPV vaccine was introduced in 2012 and that the main target group now receives one dose. WHO's vaccine introduction rows record a partial introduction in 2011 and a nationwide one from 2017. Its programme coverage rows give, for girls' first dose, 14% in 2012, 31% in 2017, 37% in 2019 and 2020, 2% in 2021, 16% in 2022, 40% in 2023, 71% in 2024 (18,567 of a target of 26,178) and 71% in 2025 (33,333 of 46,997). Rows for boys begin in 2019 at 33% and stand at 33% for 2025 (15,850 of 48,402). The target populations reported to WHO change a good deal from year to year, so the percentages are not strictly comparable. The plan's own baseline is 40.8% for ages 9 to 15, with a goal of 90%.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Guyana (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Guyana (API)", url: WHO_INTRO_API },
            { label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF, ICCP portal)", url: ACTION_PLAN },
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
          title: "One radiotherapy centre, in Georgetown, with one linear accelerator",
          plain:
            "IAEA's radiotherapy directory lists one centre in Guyana, the Cancer Institute of Guyana on the Georgetown Public Hospital compound, with one linear accelerator and a brachytherapy unit. In 2018 most cancer surgery and chemotherapy were done at the public hospital, on whose compound the institute stands.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, lists for the Cancer Institute of Guyana one linear accelerator, one high-dose-rate brachytherapy unit, one CT scanner and one treatment planning system, in an entry last updated in 2024, for a population of about 836,000. IAEA's note on its December 2018 review quotes the PAHO/WHO representative saying radiotherapy was offered only at the private institute and so reached a small fraction of patients, and that most cancer surgery and chemotherapy were done at the Georgetown Public Hospital Corporation, with limited surgery at five regional hospitals. The hospital's oncology department lists chemotherapy, immunotherapy, hormone and targeted therapies. The Ministry's 2024 action plan schedules the establishment of radiotherapy services at one central site between May 2024 and May 2026; OnCo found no confirmation that it has opened.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "IAEA: imPACT review, Guyana, December 2018 (PDF)", url: IAEA_IMPACT },
            { label: "Georgetown Public Hospital Corporation: cancer care", url: GPHC_CANCER },
            { label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF, ICCP portal)", url: ACTION_PLAN },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Guyana",
      cards: [
        {
          id: "ethnicity",
          title: "A registry that records ethnicity, and what it showed",
          plain:
            "Guyana's registry records patients' ethnic group, though not for every patient. Its 2009 analysis found that Afro-Guyanese men accounted for about 65% of prostate cancers, and that cervical cancer made up a larger share of registered cancers among Indigenous Amerindian women than among Afro-Guyanese or Indo-Guyanese women.",
          detail:
            "In the registry's database, breast, cervical and prostate cancer were the three main cancers, at 23%, 22% and 20% of cases. Of 525 prostate cancers, 341 (65%; the abstract says over 65%) were in Afro-Guyanese men and 101 in Indo-Guyanese men. Indo-Guyanese women had the most breast cancers (265 of 589, 45%) and Afro-Guyanese women the most cervical cancers (225 of 573, 39%); among the 117 Amerindian patients, 57 had cervical cancer. Among women under 30 there were significantly more cervical than breast cancers. These are shares of registered cases, not rates per head of population, and the paper says most prostate cancers had no stage recorded. The data are from 2000 to about 2008.",
          links: [{ label: "Best Plummer et al., ethnicity and cancer in Guyana (Infect Agent Cancer 2009)", url: PLUMMER_2009 }],
        },
        {
          id: "regional-centre",
          title: "A radiotherapy centre that also treats patients from other Caribbean countries",
          plain:
            "The Cancer Institute of Guyana says patients from other Caribbean countries come to Guyana for cancer screening and treatment. A study of cancer survivors in Saint Lucia found that Guyana was one of the three places they most often travelled to for care.",
          detail:
            "The institute's own page says several patients from other Caribbean countries come for screening and treatment and describes the care as affordable; it gives no numbers. In interviews with 50 cancer survivors in Saint Lucia in 2019 and 2020, 56% had travelled abroad for care, and the paper gives the most frequent destinations as the United States (29%), Martinique (13%) and Guyana (13%). The same IAEA note that describes the institute says cancer diagnosis and treatment services in Guyana were limited to the capital at the time of its 2018 review. In January 2024, as Kaieteur News reported it, the Minister of Health said biopsy results at the public hospital had been cut from about three months to under seven days.",
          links: [
            { label: "Cancer Institute of Guyana: about us", url: CIG_ABOUT },
            { label: "Auguste et al., access to cancer care among survivors in Saint Lucia (Int J Environ Res Public Health 2021)", url: "https://doi.org/10.3390/ijerph18094770" },
            { label: "IAEA: imPACT review, Guyana, December 2018 (PDF)", url: IAEA_IMPACT },
            { label: "Kaieteur News: 693 cancer cases recorded in first six months of 2024 (12 October 2024)", url: KAIETEUR_2024 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Guyana", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Guyana",
          plain:
            "None of the cancer trials in OnCo's records lists Guyana among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search. The published research OnCo read is the registry's analysis by ethnicity and an evaluation of cervical screening.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Guyana. A Europe PMC search for Guyana in the titles of cancer papers returned seven results, two of them about French Guiana and one a 2026 preprint; the two papers read in full or in abstract for this page are the registry's 2009 paper and the 2014 evaluation of single-visit screening at 18 sites. A report from the registry's first years, the Guyana Cancer Report 2000 to 2004, is catalogued by the Institute for Health Metrics and Evaluation but OnCo did not find it online.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Guyana", url: CTGOV },
            { label: "Best Plummer et al., ethnicity and cancer in Guyana (Infect Agent Cancer 2009)", url: PLUMMER_2009 },
            { label: "Martin et al., single-visit cervical screening and treatment in Guyana (J Obstet Gynaecol Res 2014)", url: MARTIN_2014 },
            { label: "Global Health Data Exchange: Guyana Cancer Report 2000-2004 (catalogue entry)", url: GHDX_REPORT },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry-reports",
      title: "No registry report that OnCo could read, and no survival figures",
      plain:
        "The registry's recent counts on this page come from a Ministry plan and a newspaper report, not from a registry publication. OnCo found no annual report from the registry online and no survival figure for any cancer in Guyana.",
      detail:
        "The Guyana Cancer Report 2000 to 2004 appears in a data catalogue, which says it includes incidence, case-fatality and survival, but the report itself was not found. The Ministry of Health's site carried no registry report when read on 16 November 2026. The registry's own paper says undiagnosed cases and cancer deaths not managed by a health worker, which it puts at under 10%, are lost to it, and names wealthier patients going abroad for diagnosis and treatment as a difficulty. For current figures, the Ministry of Health is the body to ask; IARC's Caribbean hub supports registries in the region.",
      links: [
        { label: "Global Health Data Exchange: Guyana Cancer Report 2000-2004 (catalogue entry)", url: GHDX_REPORT },
        { label: "Ministry of Health", url: MOH },
      ],
    },
    {
      id: "gap-plan-and-costs",
      title: "No national cancer control plan found, and no account of what patients pay",
      plain:
        "Guyana has a plan for cervical cancer to 2030, but OnCo did not find a national plan covering all cancers. It also found no official statement of what chemotherapy or radiotherapy costs a patient, or whether the radiotherapy service scheduled in the cervical cancer plan has opened.",
      detail:
        "WHO's 2020 profile recorded an operational plan for noncommunicable diseases and gave no entry for a national cancer control plan, and IAEA's note says the Minister asked in 2018 for help designing one. An older strategic plan for noncommunicable diseases, for 2013 to 2020, was noted as listed on the ICCP portal and was not read for this page; the listing could not be found again on 16 November 2026, so it is not re-verified. The Cancer Institute of Guyana describes its rates as subsidised without giving them. The treating hospital or the Ministry of Health can say what applies now.",
      links: [
        { label: "WHO: Cancer Country Profile 2020, Guyana (PDF)", url: WHO_2020 },
        { label: "IAEA: imPACT review, Guyana, December 2018 (PDF)", url: IAEA_IMPACT },
        { label: "Cancer Institute of Guyana: about us", url: CIG_ABOUT },
      ],
    },
    {
      id: "gap-regulator",
      title: "The regulator's own pages and its list of registered medicines were not found",
      plain:
        "OnCo read the Food and Drugs Regulations but did not find a website for the Government Analyst Food and Drug Department, so it cannot say which cancer medicines are registered in Guyana or how long registration takes.",
      detail:
        "Two addresses tried for the department did not answer on 16 November 2026. The regulations read are the 2012 revision and may have been amended. News reports describe registration rules for importers, but OnCo has not used them as a source for the law. The Ministry of Health or the department itself can confirm whether a medicine is registered.",
      links: [
        { label: "Food and Drugs Regulations, Laws of Guyana Cap. 34:03 (FAOLEX PDF)", url: FD_REGS },
        { label: "Ministry of Health", url: MOH },
      ],
    },
  ],
  institutions: ["moh-guyana", "gphc-guyana", "cancer-institute-of-guyana", "guyana-cancer-registry", "ga-fdd-guyana", "iaea", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-best-plummer-ethnicity-cancer-guyana-iac-2009", "paper-martin-single-visit-cervical-guyana-jogr-2014"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles and its immunisation and health expenditure data, IAEA DIRAC's public equipment data and IAEA's note on its 2018 review, the Ministry of Health's voucher page and its cervical cancer action plan for 2024 to 2030, the Food and Drugs Regulations, CARPHA's pages on the Caribbean Regulatory System, the Cancer Institute of Guyana's and the public hospital's own pages, two news reports named where they are used, and two papers resolved through Europe PMC. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "IARC's figures for Guyana are modelled and the registry's counts are incomplete, so neither is an exact count. Whether a machine is running, which medicines are in stock and what a patient pays change faster than any plan; ask the oncology department at the Georgetown Public Hospital Corporation, the Cancer Institute of Guyana or the Ministry of Health what applies to you.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Guyana (PDF)", url: IARC_FACTSHEET },
    { label: "Ministry of Health", url: MOH },
    { label: "Georgetown Public Hospital Corporation: cancer care", url: GPHC_CANCER },
    { label: "Cancer Institute of Guyana: about us", url: CIG_ABOUT },
  ],
};
