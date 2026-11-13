import type { CountryDive } from "@/data/country-dive";

/**
 * Sri Lanka deep dive: the hand-written cards for /countries/lk/ (wave 6). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the National Cancer Control Programme's Cancer Incidence and
 * Mortality Data Sri Lanka 2022 (PDF text, published November 2025), its Annual Report 2024 (PDF text, November 2025),
 * the National Strategic Plan on Prevention and Control of Cancer 2020 to 2024 (PDF text), the second report of the
 * Colombo district population-based registry (a scanned PDF, read by text recognition; only figures whose parts add
 * up are used), the programme's history and treatment-centre pages, the National Medicines Regulatory Authority's pages
 * and its clinical trial (GL-019) and pricing (GL-033) guidelines, the National Cancer Institute Maharagama's own pages,
 * WHO's 2023 crisis appeal and January 2023 news release for Sri Lanka, WHO's HPV and hepatitis B coverage rows and its
 * Global Health Expenditure Database rows from the public APIs, IARC's GLOBOCAN 2024 fact sheet for Sri Lanka, a
 * ClinicalTrials.gov API count, and the papers' abstracts through Europe PMC. Where a figure could not be read it is
 * named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/144-sri-lanka-fact-sheet.pdf";
const CID_2022 = "https://www.nccp.health.gov.lk/storage/post/pdfs/cancer_incidence_and_mortality_data_sri_lanka_2022.pdf";
const NCCP_DATA = "https://www.nccp.health.gov.lk/en/incedenceData";
const AR_2024 = "https://www.nccp.health.gov.lk/storage/post/pdfs/Final%20Annual%20Report%202024.pdf";
const NSP_2020 = "https://www.nccp.health.gov.lk/storage/post/pdfs/National%20Strategic%20Plan%20on%20Prevention%20and%20Control%20of%20Cancer%20in%20Sri%20Lanka%20(2020-2024).pdf";
const PBCR_COLOMBO = "https://www.nccp.health.gov.lk/storage/post/pdfs/PCBR%20Books.pdf";
const NCCP_HISTORY = "https://www.nccp.health.gov.lk/en/history";
const NCCP_CENTRES = "https://www.nccp.health.gov.lk/en/treatmentCenter";
const NCCP_STRATEGIC = "https://www.nccp.health.gov.lk/en/stratergic";
const NMRA_ABOUT = "https://www.nmra.gov.lk/about-us";
const NMRA_CT = "https://www.nmra.gov.lk/pages/clinical-trials";
const NMRA_CT_GL = "https://cdn.prod.website-files.com/666d0695ca3ba7fa496a5068/66b49ba870914dff8621a8cb_Clinical_trial_guideline_version_5-_final.pdf";
const NMRA_PRICE = "https://www.nmra.gov.lk/pages/price-controls";
const NMRA_PRICING_GL = "https://cdn.prod.website-files.com/666d0695ca3ba7fa496a5068/6881d57a674db1c8250c7cf7_Version%201_Guideline%20on%20Pricing%20Mechanism%20for%20Medicines%20in%20SL%20%20Final_V1.1%202025%2007%2024.pdf";
const NCI_ABOUT = "https://www.ncisl.health.gov.lk/?page_id=469";
const NCI_HOME = "https://www.ncisl.health.gov.lk/";
const WHO_APPEAL = "https://www.who.int/emergencies/funding/outbreak-and-crisis-response-appeal-2023/2023-appeals/appeal-sri-lanka";
const WHO_JAN23 = "https://www.who.int/srilanka/news/detail/24-01-2023-who-delivers-essential-medicines-and-supplies-to-help-sustain-vital-health-services-for-crisis-response-and-beyond";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LKA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'LKA'";
const WHO_GHED_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'LKA'";
const CTGOV = "https://clinicaltrials.gov/search?locStr=Sri%20Lanka&country=Sri%20Lanka&cond=cancer";
const SLCTR = "https://slctr.lk/";
const JOSEPH_2025 = "https://doi.org/10.3332/ecancer.2025.1941";
const NILAWEERA_2026 = "https://doi.org/10.1186/s12913-026-14599-8";

export const LK_DIVE: CountryDive = {
  iso2: "LK",
  iso3: "LKA",
  name: "Sri Lanka",
  flag: "🇱🇰",
  asOf: "2026-11-11",
  title: "Cancer in Sri Lanka",
  description:
    "Cancer in Sri Lanka from Sri Lankan sources: 35,855 new cancers counted by the national registry in 2022 and IARC's estimate of 43,428 in 2024, mouth cancer as the commonest cancer in men, free state cancer care through 25 treatment centres and the National Cancer Institute at Maharagama, the 2022 economic crisis that left 150 essential medicines out of stock, the National Medicines Regulatory Authority, HPV vaccination reported to WHO from 2017, and why no trial in our records has a site in Sri Lanka.",
  lede:
    "Sri Lanka has counted cancer nationally since 1985, and its registry recorded 35,855 new cancers in 2022, with breast cancer leading in women and lip, tongue and mouth cancer in men. Care in state hospitals is free at the point of delivery, but the 2022 economic crisis left essential imported medicines, cancer drugs among them, out of stock, and the national cancer programme reports long waits for diagnosis and treatment across the country.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Sri Lanka is 43,428 new cancers and 27,165 deaths, an age-standardised incidence of 133.8 per 100,000 (138.0 in men, 133.3 in women) and mortality of 81.9, including 325 non-melanoma skin cancers. IARC's fact sheet gives its incidence method as subnational registry rates applied to the 2024 population, and its mortality method as national incidence applied to modelled mortality-to-incidence ratios from registry survival data (its source is listed as SURVCAN). The national registry's own count for 2022 is lower in number (35,855) but higher in rate (143.7 per 100,000 age-standardised), and the two differ by site: the registry counted 3,013 lip, tongue and mouth cancers in men in 2022 against IARC's 1,842 lip and oral cavity cancers in men for 2024, and 1,381 lung cancers in men against IARC's 2,304. Deaths differ most. The latest cause-of-death data from vital registration, for 2020, record 15,242 cancer deaths, about 56% of IARC's estimate; the registry's report marks vital registration figures for several years as not published. Read IARC's numbers as a modelled estimate and the registry's as a count of what reached its sources.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Sri Lanka",
      aside: { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022 (PDF)", url: CID_2022 },
      cards: [
        {
          id: "shape",
          title: "About 36,000 cancers counted a year, with mouth cancer leading in men",
          plain:
            "Sri Lanka's national registry counted 35,855 new cancers in 2022, about 99 people a day. Breast cancer was the commonest in women and lip, tongue and mouth cancer the commonest in men, at 18% of male cancers. Among patients whose stage was recorded, two thirds of cervical cancers and nearly three quarters of mouth cancers were found at stage III or IV.",
          detail:
            "The registry's 24th report, published by the National Cancer Control Programme in November 2025, counted 16,398 cancers in men and 19,457 in women in 2022, a crude rate of 161.6 per 100,000 and an age-standardised rate of 143.7. The commonest in men were lip, tongue and mouth (3,013), colon and rectum (1,564), trachea, bronchus and lung (1,381), prostate (1,226) and oesophagus (1,178). In women they were breast (5,447, 28% of female cancers), thyroid (2,369), colon and rectum (1,519), uterus (1,238) and cervix (1,226). The cumulative risk of a cancer before age 75 was 18.5% for men and 17.3% for women. Stage was recorded for 41% of breast, 30% of cervical and 30% of lip, tongue and mouth cancers; of those, 32.4%, 65.6% and 72.9% were stage III or IV. There were 940 cancers in children and young people aged 0 to 19, 31% of them leukaemias. IARC's GLOBOCAN 2024 fact sheet estimates 43,428 cancers, with breast (6,242), colorectum (3,728) and lung (3,188) leading, and 110,552 people living within five years of a diagnosis.",
          links: [
            { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022, executive summary and table 6 (PDF)", url: CID_2022 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Sri Lanka (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "deaths",
          title: "Deaths are counted three ways, and the counts do not agree",
          plain:
            "Sri Lanka records cancer deaths through civil registration, through hospital returns and through IARC's model. Civil registration recorded 15,242 cancer deaths in 2020, its latest published year; government hospitals recorded 5,734 in 2022; IARC estimates 27,165 for 2024. OnCo cannot say how much of the gap is uncertified deaths and how much is the model.",
          detail:
            "The registry's 2022 report takes mortality from two national sources. The Department of Census and Statistics publishes cause-of-death data from the vital registration system: 15,598 cancer deaths in 2019 (10.7% of all deaths) and 15,242 in 2020, with no published figures for 2008, 2016 to 2018, 2021 or 2022. The Ministry of Health's Annual Health Bulletin, from hospital returns, counted 5,734 cancer deaths in government hospitals in 2022, 8.6% of hospital deaths. For Colombo district only, the registry also receives cancer deaths directly from 47 divisional death registrars. IARC's estimate is modelled from incidence and survival, not counted. OnCo does not know how much of the gap is deaths at home that were not certified as cancer and how much is the model; the registry gives no completeness figure for death certification.",
          links: [
            { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022, tables 36 to 40 (PDF)", url: CID_2022 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Sri Lanka (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
      tables: [
        {
          id: "lk-registry",
          title: "What Sri Lanka's cancer registries have counted",
          caption: "New cancers, crude rates per 100,000 by sex and the age-standardised rate for both sexes, as each report gives them. Latest published year: 2022.",
          columns: [
            { key: "source", label: "Source (area covered)" },
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "crudeMen", label: "Crude rate, men", numeric: true },
            { key: "crudeWomen", label: "Crude rate, women", numeric: true },
            { key: "asr", label: "Age-standardised rate", numeric: true },
          ],
          rows: [
            { source: "National Cancer Registry (whole country)", year: "2012", cases: 23136, crudeMen: 115.3, crudeWomen: 112.1, asr: 100.1 },
            { source: "National Cancer Registry (whole country)", year: "2016", cases: 34179, crudeMen: 161.1, crudeWomen: 161.3, asr: 142.0 },
            { source: "National Cancer Registry (whole country)", year: "2019", cases: 31849, crudeMen: 140.6, crudeWomen: 151.1, asr: 128.9 },
            { source: "National Cancer Registry (whole country)", year: "2020", cases: 37648, crudeMen: 164.4, crudeWomen: 178.6, asr: 152.3 },
            { source: "National Cancer Registry (whole country)", year: "2021", cases: 37753, crudeMen: 163.9, crudeWomen: 176.5, asr: 151.3 },
            { source: "National Cancer Registry (whole country)", year: "2022", cases: 35855, crudeMen: 152.7, crudeWomen: 170.1, asr: 143.7 },
            { source: "Population-based registry, Colombo district (about 2.3 million people)", year: "2012", cases: 2896, crudeMen: 119.8, crudeWomen: 129.2, asr: null },
            { source: "Population-based registry, Colombo district", year: "2019", cases: 4115, crudeMen: 150.8, crudeWomen: 184.8, asr: null },
          ],
          note: "The national registry counts cancers reported by 25 state cancer centres, laboratories and oral surgery units, so its rises partly track better reporting: it jumped from 17,482 cases in 2011 to 23,136 in 2012. The Colombo rows come from a scanned report read by text recognition; they are used only because men and women add to each total (1,366 and 1,530; 1,811 and 2,304) and the report states a 42% rise. Its age-standardised rates could not be read reliably.",
          sources: [
            { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022, table 6 (PDF)", url: CID_2022 },
            { label: "NCCP: Cancer Incidence and Mortality Data, Colombo District 2013 to 2019, executive summary (scanned PDF)", url: PBCR_COLOMBO },
          ],
        },
        {
          id: "lk-deaths",
          title: "Cancer deaths by source",
          caption: "Cancer deaths as each source reports them, with the year. Vital registration is the most recent published year.",
          columns: [
            { key: "source", label: "Source" },
            { key: "year", label: "Year" },
            { key: "deaths", label: "Cancer deaths", numeric: true },
          ],
          rows: [
            { source: "Vital registration (Department of Census and Statistics)", year: "2015", deaths: 13825 },
            { source: "Vital registration (Department of Census and Statistics)", year: "2019", deaths: 15598 },
            { source: "Vital registration (Department of Census and Statistics)", year: "2020", deaths: 15242 },
            { source: "Government hospital deaths (Annual Health Bulletin)", year: "2022", deaths: 5734 },
            { source: "IARC GLOBOCAN estimate", year: "2024", deaths: 27165 },
          ],
          note: "Hospital deaths cover only deaths in government hospitals. Vital registration figures for 2016 to 2018, 2021 and 2022 were not published, according to the registry's report.",
          sources: [
            { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022, tables 36 and 39 (PDF)", url: CID_2022 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Sri Lanka (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry since 1985, and one district counted in full",
      aside: { label: "NCCP: cancer incidence data, every edition", url: NCCP_DATA },
      cards: [
        {
          id: "registry-national",
          title: "A national registry built from hospitals and laboratories, publishing about three years late",
          plain:
            "The National Cancer Control Programme runs the registry, collecting new cancers from 25 state cancer centres, over 100 pathology laboratories and 34 oral surgery units. Almost all cancers (96.7% in 2022) are confirmed under the microscope. Its report on 2022 appeared in November 2025, and the Ministry's own officials ask why it is late.",
          detail:
            "The 2022 report describes three streams: patient and tumour details extracted at 25 government cancer treatment centres on the National Cancer Surveillance Form H 1256 and entered into IARC's CanReg5 software, sometimes by pre-intern doctors paid through WHO funds; monthly paper returns from 68 histopathology, 34 haematology and 3 oral pathology laboratories, four of them private; and, from 2022, CanReg5 entries from 34 oral and maxillofacial surgery units. Records are merged through Rupantaran, a tool built by the IARC regional hub in Mumbai, which merged 47,402 records when introduced. Of the 2022 cancers, 93.8% were confirmed by histology of the primary tumour and 2.0% were registered from a death certificate only. The Deputy Director General's message in the report says there is a delay in generating the registry's publications and asks that the reasons be identified. The report lists four private laboratories among its sources and no private treatment centre, so cancers diagnosed and treated wholly in private care may be missed. The programme published its first childhood cancer registry report in November 2021.",
          links: [
            { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022, methodology (PDF)", url: CID_2022 },
            { label: "Sawant et al., Rupantaran software for the Sri Lankan registry (ecancermedicalscience 2023)", url: "https://doi.org/10.3332/ecancer.2023.1553" },
            { label: "NCCP: cancer incidence data, all editions", url: NCCP_DATA },
          ],
        },
        {
          id: "registry-colombo",
          title: "Colombo district: the first population-based registry, from 2012",
          plain:
            "Since 2012 the programme has counted every cancer among residents of Colombo district, 12.4% of Sri Lankans at the 2012 census, adding records from other hospitals and from death registrars. Its counts rose 42% from 2012 to 2019, and its crude rates are higher than the national registry's, which the report reads as more complete case-finding.",
          detail:
            "The programme's history page dates the Colombo population-based registry to 2012, and its second report covers 2013 to 2019. It was built on the national registry's sources and adds quarterly returns from medical records departments of other hospitals in and around Colombo and cancer deaths from the district's divisional death registrars, with residents identified by permanent address. The report counts 2,896 cancers in 2012 (1,366 men, 1,530 women) and 4,115 in 2019 (1,811 men, 2,304 women), with crude rates rising from 119.8 to 150.8 per 100,000 in men and from 129.2 to 184.8 in women. It says the district's rates were higher than the national rates because of the more extensive methodology of population-based registration, and suggests extending such registries to other provinces in phases. The 2022 national report thanks Vital Strategies for supporting population-based registries in selected districts. OnCo read the Colombo report through text recognition of a scanned PDF and has not used its age-standardised rates; IARC's fact sheet names a subnational registry as its incidence source without naming which.",
          links: [
            { label: "NCCP: Cancer Incidence and Mortality Data, Colombo District 2013 to 2019 (scanned PDF)", url: PBCR_COLOMBO },
            { label: "NCCP: history of the National Cancer Control Programme", url: NCCP_HISTORY },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: free state care, and households paying more since the crisis",
      aside: { label: "Joseph et al., budget impact of novel cancer drugs in Sri Lanka (ecancermedicalscience 2025)", url: JOSEPH_2025 },
      cards: [
        {
          id: "free-care",
          title: "Cancer care in state hospitals is free at the point of delivery",
          plain:
            "The state runs and pays for Sri Lanka's public hospitals, and cancer care there is free at the point of delivery: the National Cancer Institute at Maharagama says anyone can use its services free of charge. Private care exists alongside; in 2020 five of the country's 49 clinical oncologists worked in the private sector.",
          detail:
            "Researchers who costed novel cancer drugs with the Ministry of Health's procurement prices describe cancer care in Sri Lanka as predominantly provided through the state health system, free at the point of delivery. The Ministry's National Strategic Plan 2020 to 2024 credits successive governments with investing in non-fee levying public education and a strong performing health system, and plans a shared care cluster system linking primary units to apex hospitals partly to reduce out-of-pocket expenditure incurred by households for cancer and hospital costs. Free care does not mean no cost: WHO's Global Health Expenditure Database puts out-of-pocket spending at 54.8% of Sri Lanka's current health expenditure in 2023, up from 37.5% in 2020, while domestic government spending fell from 50.4% to 33.6% of the total over the same years. OnCo found no Sri Lankan figure for what cancer patients themselves pay; the programme's 2024 report lists out-of-pocket costs of childhood cancer care as a research priority.",
          links: [
            { label: "Joseph et al., budget impact of novel cancer drugs in Sri Lanka (ecancermedicalscience 2025)", url: JOSEPH_2025 },
            { label: "National Cancer Institute Sri Lanka: home page", url: NCI_HOME },
            { label: "WHO Global Health Expenditure Database: out-of-pocket spending, Sri Lanka (API)", url: WHO_GHED_OOP },
            { label: "WHO Global Health Expenditure Database: government spending, Sri Lanka (API)", url: WHO_GHED_GOV },
            { label: "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024 (PDF)", url: NSP_2020 },
          ],
        },
        {
          id: "novel-drugs",
          title: "Which new cancer drugs the state buys: no appraisal body, but costed proposals",
          plain:
            "OnCo found no Sri Lankan agency that appraises each new cancer medicine for value. Researchers working with Ministry prices estimate that giving 42 novel cancer drugs to every eligible patient would cost almost 300 million US dollars a year, and that restricting them to uses that pass a cost-effectiveness test would cost 6 to 13 million.",
          detail:
            "Joseph and colleagues analysed 42 novel cancer drugs across 90 indications, taking survival gains from the literature and procurement costs from the Ministry of Health. Only 27 indications met a threshold of three times GDP per capita per life year gained (11,445 US dollars), and 18 drugs met no threshold for any indication; the annual cost was 6 million US dollars at one times GDP per capita and 13.2 million at three times. A second study by Joseph, Kularatna and Senanayake found that, at 6,700 US dollars per quality-adjusted life year, adjuvant osimertinib, adjuvant alectinib and neoadjuvant nivolumab for stage II to III lung cancer were cost-effective in Sri Lanka, with a five-year budget impact of about 11.8 million US dollars, but that at 3,000 dollars only osimertinib remained so. In a registry study at the National Cancer Institute, 59% of women with HER2-positive breast cancer diagnosed in 2016 to 2020 received trastuzumab. The thresholds are the authors' choices; OnCo found no official one.",
          links: [
            { label: "Joseph et al., budget impact of novel cancer drugs in Sri Lanka (ecancermedicalscience 2025)", url: JOSEPH_2025 },
            { label: "Joseph et al., perioperative therapies for lung cancer in Sri Lanka (BMJ Oncology 2026)", url: "https://doi.org/10.1136/bmjonc-2025-001046" },
            { label: "Wijeratne et al., breast cancer at the National Cancer Institute (BMC Cancer 2021)", url: "https://doi.org/10.1186/s12885-021-08929-8" },
          ],
        },
      ],
    },
    {
      id: "crisis",
      nav: "2022 crisis",
      title: "The 2022 economic crisis and the supply of medicines",
      aside: { label: "WHO: Sri Lanka, outbreak and crisis response appeal 2023", url: WHO_APPEAL },
      cards: [
        {
          id: "crisis-medicines",
          title: "Medicines ran short from April 2022, and by October 150 were out of stock, chemotherapy among them",
          plain:
            "Sri Lanka imports about 80% of its medical supplies. When its foreign currency ran short in 2022, imports were limited, and WHO reported that by October 2022 150 essential medicines were out of stock, including cancer chemotherapy drugs. Surgery and tests were delayed, and in January 2023 WHO put the country's funding gap for importing medicines and supplies at 220 million US dollars.",
          detail:
            "WHO's 2023 appeal for Sri Lanka says the economic crisis depleted foreign currency reserves and limited imports of fuel, medicines and consumables; with 80% of medical supplies imported, there had been a shortage of essential medicines since April 2022, and in October 2022 150 essential medicines were out of stock, including blood thinners, antibiotics, vaccines and cancer chemotherapy drugs. Routine non-emergency surgeries, procedures and laboratory tests were often delayed or put on hold, and outpatient clinics could not provide refills. WHO asked for 8 million US dollars for raw materials so the State Pharmaceutical Manufacturing Corporation could keep producing essential medicines locally. Its release of 24 January 2023 put the annual budget for importing medicines and surgical consumables at 300 million US dollars, with 80 million available from donors for 2023 and a gap of 220 million. A tertiary hospital described in BMJ Leader responded by buying drugs locally and recommends buffering six months of supplies. OnCo found no peer-reviewed study that counts which cancer medicines were missing, for how long, or what it did to patients.",
          links: [
            { label: "WHO: Sri Lanka, outbreak and crisis response appeal 2023", url: WHO_APPEAL },
            { label: "WHO Sri Lanka: WHO delivers essential medicines and supplies (24 January 2023)", url: WHO_JAN23 },
            { label: "Sabhapathige and Deerasinghe, a tertiary care hospital during the economic crisis (BMJ Leader 2025)", url: "https://doi.org/10.1136/leader-2024-001082" },
          ],
        },
        {
          id: "crisis-patients",
          title: "What patients with long-term illness reported: fewer visits and missed medicines",
          plain:
            "A survey of about 2,000 adults in two provinces at the end of 2022 found that nearly a third of people with a chronic illness had fewer clinic visits, missed medicines or worse control during the crisis. They kept using government hospitals, used private care much less, and turned more to Ayurveda and self-medication.",
          detail:
            "Nilaweera and colleagues telephoned randomly sampled adults in Western province (1,043 took part) and Uva province (1,016) in November and December 2022, comparing January to May 2018 with January to May 2022. Clinic visits fell for 29.6% and 36.4% of those with chronic conditions; medication omission was reported by 22.0% in Western and 32.9% in Uva, and deterioration of the condition by 21.2% and 31.3%. Use of private care fell (odds ratio 0.23) while Ayurveda (1.32) and self-medication (1.29) rose, and use of government facilities did not change. The authors attribute the worse effects in Uva to limited access to medicines and higher travel costs. The study covers chronic disease in general, not cancer. The National Cancer Control Programme's director wrote in its 2024 annual report that cancer control had been coordinated despite shifting priorities caused by economic and financial challenges, and the report lists the effects of the economic crisis on managing childhood cancer as a research priority.",
          links: [
            { label: "Nilaweera et al., the economic crisis and chronic disease care (BMC Health Serv Res 2026)", url: NILAWEERA_2026 },
            { label: "NCCP: Annual Report 2024 (PDF)", url: AR_2024 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the National Medicines Regulatory Authority",
      aside: { label: "NMRA: about us", url: NMRA_ABOUT },
      cards: [
        {
          id: "nmra",
          title: "An independent authority since 2015 that registers medicines and sets their prices",
          plain:
            "The National Medicines Regulatory Authority was set up by an Act of Parliament in 2015. It registers medicines and devices, licenses pharmacies and checks quality in its own laboratory. It also fixes a maximum retail price for every medicine it registers, using the import price plus taxes and a set markup.",
          detail:
            "The NMRA Act, No. 5 of 2015, certified on 19 March 2015, replaced the Cosmetics, Devices and Drugs Act of 1980. The Authority describes itself as independent within the Ministry of Health, governed by a board with no involvement in regulatory decisions, which rest with the Chief Executive Officer and expert committees such as the Medicines Evaluation Committee, whose policy decisions it posts. Under Gazette Extraordinary No. 2446/34 of 21 July 2025 and its pricing guideline GL-033 (version 1.1, effective 22 July 2025), the maximum retail price of a newly registered or renewed medicine is its cost, insurance and freight plus duties and taxes plus a supply chain total markup, with the declared import price checked against external reference prices (the guideline names India's, Bangladesh's and Pakistan's regulators, the British National Formulary and the price in the country of origin) and internal ones; maximum ceiling prices are set for some products from the median market price. Prices are published monthly. OnCo found no published target or measured time for registering a new medicine; see the gaps.",
          links: [
            { label: "NMRA: about us", url: NMRA_ABOUT },
            { label: "NMRA: price controls", url: NMRA_PRICE },
            { label: "NMRA: Guideline on Pricing Mechanism for Medicines in Sri Lanka, GL-033 version 1.1 (PDF)", url: NMRA_PRICING_GL },
          ],
        },
        {
          id: "nmra-trials",
          title: "Clinical trials: 75 days for a decision, with a priority route",
          plain:
            "A clinical trial in Sri Lanka needs approval from the regulator's Clinical Trials Evaluation Committee and from a recognised ethics committee, which can be sought in parallel. The guideline sets 75 days to process an application, not counting time waiting for the applicant, and lets sponsors ask for priority review when patients have no good treatment.",
          detail:
            "The Guideline for the Conduct of Clinical Trials in Sri Lanka (GL-019, version 5, effective 15 October 2022) requires approval from the Clinical Trials Evaluation Committee (CTEC) and from an ethics review committee recognised by it; submissions to both may be made in parallel. The Clinical Trials Regulatory Division screens an application for completeness within 7 working days and schedules it for the next monthly CTEC meeting. Timelines, excluding stop-clock, are 75 days for a clinical trial application, 35 days for an amendment needing approval and 7 days for a licence to import investigational products. An applicant may request priority review for an investigational product where there is unmet medical need, under a separate guideline for non-routine processing and emergencies. The NMRA's clinical trials page lists the applications it received in 2018 to 2022 and in 2025; OnCo found no list there for 2023 or 2024. Trials must also be registered: the Sri Lanka Clinical Trials Registry, set up by the Sri Lanka Medical Association, is a primary registry of WHO's International Clinical Trials Registry Platform.",
          links: [
            { label: "NMRA: Guideline for the Conduct of Clinical Trials in Sri Lanka, GL-019 version 5 (PDF)", url: NMRA_CT_GL },
            { label: "NMRA: clinical trials", url: NMRA_CT },
            { label: "Sri Lanka Clinical Trials Registry", url: SLCTR },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Treatment capacity: radiotherapy, oncologists and waiting lists",
      aside: { label: "NCCP: cancer treatment centres of Sri Lanka", url: NCCP_CENTRES },
      cards: [
        {
          id: "centres-workforce",
          title: "25 state cancer centres, radiotherapy in seven, and about 49 clinical oncologists in 2020",
          plain:
            "Sri Lanka treats cancer in 25 government cancer centres, from Apeksha Hospital at Maharagama to district hospitals. In 2020 the national plan counted radiotherapy in seven centres of excellence, 49 board-certified clinical oncologists and 33 working mammography units, most of them analogue, and said nearly a third of oncologists had no radiotherapy in their public hospital.",
          detail:
            "The registry's 2022 report lists 25 government cancer treatment centres: two national hospitals (Apeksha Hospital Maharagama and National Hospital Kandy), eight teaching hospitals, fourteen district general hospitals and Tellippalai base hospital in Jaffna. The National Strategic Plan 2020 to 2024 counted 49 board-certified clinical oncologists, 44 in the public sector and 5 in the private, who practise both medical and radiation oncology, 2 paediatric oncologists, 18 onco-surgeons and 6 gynaecological oncologists; radiotherapy was provided in seven centres of excellence, with a plan to add linear accelerators to the others, on the basis that one modern machine treats about 500 patients a year. It counted 33 functional mammography units and no public laboratory accredited by the Sri Lanka Accreditation Board. In 2022, 48.4% of newly registered patients had surgery, 43.6% radiotherapy and 41.3% chemotherapy. The programme's 2024 report says talks were continuing on a second phase of linear accelerator procurement, and that an IAEA project with the Sri Lanka Atomic Energy Board is training physicists and radiographers in radiation safety. OnCo could not read a current machine count; see the gaps.",
          links: [
            { label: "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024, diagnosis and treatment (PDF)", url: NSP_2020 },
            { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022, table 1 and figure 59 (PDF)", url: CID_2022 },
            { label: "NCCP: Annual Report 2024, diagnosis and treatment unit (PDF)", url: AR_2024 },
          ],
        },
        {
          id: "waits",
          title: "The national programme reports long waits and travel to Maharagama",
          plain:
            "In its 2024 report the National Cancer Control Programme wrote that there is an unusual waiting list and long delay for cancer diagnosis and treatment all over the country, because specialised care is concentrated at Apeksha Hospital and a few major hospitals. Patients from other regions travel long distances and lose time waiting.",
          detail:
            "The 2024 annual report's diagnosis and treatment unit describes a gap analysis of the cancer treatment centres and centres of excellence (it says Sri Lanka has nine cancer care treatment centres, one per province), aimed at shortening waits for diagnosis and treatment and the travel between regions; it records visits to the centres at Ratnapura and Kurunegala teaching hospitals. The 2020 to 2024 plan had already named long waits at clinics, for confirmation reports, diagnostics and treatment, a lack of standard operating procedures, ad hoc referrals and no electronic reporting in histopathology as causes of delay, and observed that a large majority of patients present at advanced stages. Apeksha Hospital, founded in 1956 as a ten-ward radiotherapy centre, describes itself as the leading tertiary hospital for cancer treatment in Sri Lanka; researchers using its registry say it sees about 40% of the country's cancer patients. The report gives no measured waiting time.",
          links: [
            { label: "NCCP: Annual Report 2024, gap analysis of cancer care (PDF)", url: AR_2024 },
            { label: "National Cancer Institute Sri Lanka: about us", url: NCI_ABOUT },
            { label: "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024 (PDF)", url: NSP_2020 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO immunisation data: HPV programme coverage rows for Sri Lanka (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening at 35 and 45 in Well Woman Clinics, moving to HPV testing",
          plain:
            "Since 1996 the Family Health Bureau has offered cervical screening to women at ages 35 and 45 through Well Woman Clinics, with health workers inviting women from family registers. At the end of 2017 just over half (53.3%) of 35-year-old women had been screened. The national plan supports moving from smear tests to HPV DNA testing.",
          detail:
            "The National Strategic Plan 2020 to 2024 describes the National Cervical Cancer Screening Programme, begun by the Family Health Bureau in 1996 in Well Woman Clinics, as a well-organised population-based programme targeting two cohorts, women aged 35 and 45, identified by family health workers from eligible-family registers. It quotes coverage of 53.3% among the 35-year-old cohort at the end of 2017, adopts WHO's elimination targets (70% of women screened twice with a high-performance test by 45, 90% treated), supports a goal of one Well Woman Clinic per 15,000 people and the shift to HPV DNA testing. A 2018 study in Kalutara district found HPV in 6.2% of ever-married 35-year-old women, and types 16 or 18 in 1.94%. At the programme's own Cancer Early Detection Centre at Narahenpita in 2024, 766 smear tests and 583 HPV DNA tests (May to December, 15% positive) were done. The registry recorded stage for only 30% of cervical cancers in 2022, and 65.6% of those were stage III or IV.",
          links: [
            { label: "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024, early detection (PDF)", url: NSP_2020 },
            { label: "Perera et al., HPV among 35-year-old women in Kalutara (BMC Medicine 2025)", url: "https://doi.org/10.1186/s12916-025-04246-0" },
            { label: "NCCP: Annual Report 2024, Cancer Early Detection Centre statistics (PDF)", url: AR_2024 },
          ],
        },
        {
          id: "hpv-hbv",
          title: "HPV vaccine for schoolgirls, reported to WHO from 2017; coverage fell in 2023 and recovered in 2025",
          plain:
            "Sri Lanka's HPV vaccination figures reported to WHO begin in 2017. In the coverage Sri Lanka reports to WHO, first-dose coverage reached 99% in 2019, fell to 31% in 2023, and was 96% in 2025, with 74% completing the course. Hepatitis B vaccine, which prevents liver cancer, reaches over 95% of infants.",
          detail:
            "In the programme coverage rows Sri Lanka reported to WHO, the first year with HPV data is 2017, when 65% of 180,924 girls received a first dose. First-dose coverage was 87% in 2018, 99% in 2019, 67% in 2020, 68% in 2021, 81% in 2022, 31% in 2023, 48% in 2024 (against a target of 335,100 girls, about twice the usual cohort) and 96% of 169,476 in 2025; last-dose coverage was 82% in 2019, 25% in 2023 and 74% in 2025. WHO's rows give no reason for the 2023 fall, and OnCo has not found one in a primary source. The 2020 to 2024 cancer plan quoted 66.8% coverage in 2018 and set a target of 90% by 2025, with girls in grade six (10 to 11 years) as its indicator. Third-dose hepatitis B coverage in infants was 98% in 2022 and 96% in WHO and UNICEF's estimate for 2025. Oral cancer prevention leans on betel and tobacco control: in 2024 the programme printed 10,000 posters on the ban on using and selling betel, tobacco and areca nut products in state premises.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Sri Lanka (API)", url: WHO_HPV_API },
            { label: "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024, strategy 2.8 (PDF)", url: NSP_2020 },
            { label: "NCCP: Annual Report 2024, oral cancer prevention and control unit (PDF)", url: AR_2024 },
          ],
        },
      ],
      tables: [
        {
          id: "lk-hpv",
          title: "HPV vaccination coverage reported to WHO",
          caption: "Girls in the target cohort, percentage receiving a first dose and completing the course, by year, as Sri Lanka reported them.",
          columns: [
            { key: "year", label: "Year" },
            { key: "target", label: "Target girls", numeric: true },
            { key: "first", label: "First dose (%)", numeric: true },
            { key: "last", label: "Last dose (%)", numeric: true },
          ],
          rows: [
            { year: "2017", target: 180924, first: 65, last: null },
            { year: "2019", target: 173130, first: 99, last: 82 },
            { year: "2021", target: 176030, first: 68, last: 44 },
            { year: "2022", target: 174750, first: 81, last: 66 },
            { year: "2023", target: 174801, first: 31, last: 25 },
            { year: "2024", target: 335100, first: 48, last: 12 },
            { year: "2025", target: 169476, first: 96, last: 74 },
          ],
          note: "Administrative coverage from the national programme. In 2024 the first-dose target was 335,100 and the last-dose target 522,477, larger cohorts than usual; the reason is not stated in the rows. Male vaccination rows are empty.",
          sources: [{ label: "WHO immunisation data: HPV programme coverage rows for Sri Lanka (API)", url: WHO_HPV_API }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Sri Lanka does",
      title: "What Sri Lanka does differently",
      cards: [
        {
          id: "oral-cancer",
          title: "A dedicated unit for mouth cancer, the commonest cancer in Sri Lankan men",
          plain:
            "Mouth cancer, linked to chewing betel quid with tobacco and areca nut, is the commonest cancer in Sri Lankan men. The national programme has a unit just for it, which trains dentists and doctors to spot pre-cancerous mouth lesions and, since 2012, runs surveillance of oral cancer and these lesions through hospital dental and oral surgery units.",
          detail:
            "The National Cancer Control Programme's Oral Cancer Prevention and Control Unit, one of its five technical units, provides guidance on prevention, early detection and diagnosis of oral cancer and oral potentially malignant disorders (OPMD), and runs their surveillance. The programme's roadmap dates the surveillance system for oral cancer and OPMD in oral and maxillofacial units and hospital dental clinics to 2012, and in 2023 it introduced a clinical record for every newly diagnosed OPMD patient. In 2024 the unit ran 20 hands-on training programmes for nearly 600 dental surgeons and medical officers, an art competition on oral cancer in 20 districts, CanReg5 training for surgical unit staff, and a poster campaign on the ban on betel, tobacco and areca nut products in state premises. In 2022, 3,013 lip, tongue and mouth cancers were registered in men, 18% of male cancers; of those with a recorded stage, 72.9% were stage III or IV. The 2020 to 2024 plan notes that the ban on locally produced betel quid is frequently defied.",
          links: [
            { label: "NCCP: Annual Report 2024, oral cancer prevention and control unit (PDF)", url: AR_2024 },
            { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022 (PDF)", url: CID_2022 },
            { label: "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024 (PDF)", url: NSP_2020 },
          ],
        },
        {
          id: "breast-clinics",
          title: "Breast clinics in 26 hospitals and early detection centres in the provinces",
          plain:
            "Rather than mass mammography screening, Sri Lanka has put breast clinics into ordinary secondary and tertiary hospitals so women with symptoms are seen quickly. By 2024 there were 26. The programme also runs Cancer Early Detection Centres, starting with Narahenpita in 2004, with new ones in Matara, Ratnapura and Badulla.",
          detail:
            "The 2024 annual report says breast clinics were set up in secondary and tertiary hospitals following the 2019 imPACT review and the National Advisory Committee's recommendations; 26 were operating by 2024, the latest at Dambadeniya base hospital, each reporting monthly to the programme, which visited every clinic and held a national review. The programme trains public health midwives and nurses in clinical and self breast examination. The Cancer Early Detection Centre at Narahenpita, opened in 2004 and equipped over twenty years by the Rotary Club of Colombo with a mammography machine, ultrasound and an HPV DNA test machine, saw 3,203 people in 2024, 96% of them women, did 1,009 mammograms and found 41 breast cancers. Centres opened in Matara and Ratnapura in 2022 and one was being set up at Badulla teaching hospital in 2024. Of breast cancers registered in 2022 with a stage, 32.4% were stage III or IV; at the National Cancer Institute in 2016 to 2020, 66% were stage I or II.",
          links: [
            { label: "NCCP: Annual Report 2024, prevention and early detection and diagnosis and treatment units (PDF)", url: AR_2024 },
            { label: "Wijeratne et al., breast cancer at the National Cancer Institute (BMC Cancer 2021)", url: "https://doi.org/10.1186/s12885-021-08929-8" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Sri Lanka",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Sri Lanka. A search of ClinicalTrials.gov the same day for cancer studies naming Sri Lanka returned 8 records, two of them not about cancer, and three phase 3 cancer trials that started in 2008 to 2010.",
          detail:
            "OnCo's graph holds no trial with a Sri Lankan site, which reflects the trials OnCo holds, mostly large industry and academic trials, not all research in Sri Lanka. Querying the ClinicalTrials.gov API on 11 November 2026 for cancer studies with a location matching Sri Lanka returned 8 records (130 for any condition), two of them biomarker studies of Fabry disease and tuberous sclerosis rather than cancer; among the rest were three phase 3 trials, of leukocyte interleukin injection for oral cavity cancer (NCT01265849, CEL-SCI), aspirin after colorectal cancer surgery (NCT00565708, National Cancer Centre Singapore) and afatinib in HER2-positive breast cancer (NCT01125566, LUX-Breast 1, Boehringer Ingelheim), and a completed University of Colombo study of early palliative care for oral cancer (NCT06726317). Sri Lankan trials are also registered on the Sri Lanka Clinical Trials Registry, which OnCo has not searched. Published Sri Lankan cancer research on this page is mostly registry work: hospital-based registry studies of breast and colorectal cancer at the National Cancer Institute, lymphoma trends in the national registry, and costing studies of novel drugs.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Sri Lanka (search)", url: CTGOV },
            { label: "Sri Lanka Clinical Trials Registry", url: SLCTR },
            { label: "Alvitigala et al., lymphoma trends in Sri Lanka 2005 to 2021 (Cancer Epidemiol 2025)", url: "https://doi.org/10.1016/j.canep.2025.102951" },
          ],
        },
        {
          id: "plan",
          title: "The 2020 to 2024 plan has ended, and its successor is not yet published",
          plain:
            "Sri Lanka's National Strategic Plan on Prevention and Control of Cancer ran from 2020 to 2024, alongside plans for childhood cancer (2021 to 2025) and cervical cancer elimination (2021 to 2030). The programme's 2024 report called that year the plan's last; OnCo found no published plan for 2025 onward.",
          detail:
            "The National Strategic Plan 2020 to 2024, first printed in November 2020 and built on the recommendations of the October 2019 imPACT review, set strategies from governance and prevention through early detection, diagnosis and treatment, palliative care and surveillance, under the National Advisory Committee on Prevention and Control of Cancers and its technical advisory committees. The programme's strategic plans page also lists the National Strategic Plan on Childhood and Adolescent Cancer Care 2021 to 2025, the National Strategic Framework on Palliative Care Development 2019 to 2023 and a social and behaviour change communication strategy; its roadmap adds a National Strategic Plan to reach the interim targets of cervical cancer elimination 2021 to 2030. The 2024 annual report says 2024 was the final year of the 2020 to 2024 plan and that a palliative care framework for 2025 to 2030 was being developed. Its list of research priorities includes survival rates for oral, colorectal, thyroid and oesophageal cancers and for childhood cancers, figures Sri Lanka does not yet publish nationally.",
          links: [
            { label: "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024 (PDF)", url: NSP_2020 },
            { label: "NCCP: strategic plans", url: NCCP_STRATEGIC },
            { label: "NCCP: Annual Report 2024, roadmap and research priorities (PDF)", url: AR_2024 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "radiotherapy-count",
      title: "No current count of radiotherapy machines",
      plain:
        "OnCo could not read a dated, official count of radiotherapy machines in Sri Lanka. The 2020 plan says radiotherapy is given in seven centres; the IAEA's directory of radiotherapy centres would hold machine counts but serves its data only through an interactive page OnCo could not read as text.",
      detail:
      "The IAEA's DIrectory of RAdiotherapy Centres (DIRAC) returned only its navigation shell to a plain request on 11 November 2026. The National Cancer Institute's treatment page lists cobalt teletherapy and brachytherapy machines but is undated, so its counts are not used. The programme's 2024 report mentions both cobalt and linear accelerator machines and a planned second phase of linear accelerator procurement without giving numbers. The full reports of the 2008 and 2019 imPACT reviews were not found; the recommendations quoted here come through the 2020 to 2024 plan and the 2024 annual report.",
      links: [
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
        { label: "NCCP: Annual Report 2024 (PDF)", url: AR_2024 },
      ],
    },
    {
      id: "approval-times",
      title: "No published registration times or cancer medicine list",
      plain:
        "OnCo found no published target or measured time for the NMRA to register a new cancer medicine, no read of Sri Lanka's national essential medicines list for cancer, and no list of which cancer medicines state hospitals stock. Whether a medicine is registered, priced and actually in stock are separate questions this page cannot answer medicine by medicine.",
      detail:
        "The NMRA publishes a spreadsheet of registered medicines and monthly maximum retail prices, which OnCo did not parse for cancer medicines. The clinical trial timeline of 75 days is from the trial guideline and does not apply to marketing authorisation. A 2026 multimethod study of eight South Asian countries including Sri Lanka examined inclusion of WHO essential cancer medicines in national lists, registration and local production, but its abstract does not give Sri Lanka's own figures, so they are not quoted. OnCo found no primary source counting which cancer medicines were out of stock during the 2022 crisis.",
      links: [
        { label: "NMRA: home page and registered medicines", url: "https://www.nmra.gov.lk/" },
        { label: "Shukar et al., access to anticancer medicines in South Asia (BMJ Open 2026)", url: "https://doi.org/10.1136/bmjopen-2025-115068" },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here: population-based survival after a cancer diagnosis, what cancer patients pay themselves, the reason HPV coverage fell in 2023, the Colombo registry's age-standardised rates, and anything about Sri Lankan patient groups, whose pages OnCo could not reach.",
      detail:
        "No national cancer survival figures were found; the programme lists survival studies among its research priorities. The Colombo registry report is a scanned image; its counts were checked by adding men and women, but its age-standardised rates and site tables were not readable. The 2022 national report's executive summary gives the female breast cancer crude rate as 487.6 per 100,000, an evident misprint, so OnCo uses its counts. The UICC directory lists the Indira Cancer Trust and the Sri Lanka Cancer Society as members, but their UICC pages refused a scripted request and OnCo has not written records for them. IARC's detailed data sources and methods page for Sri Lanka was not read, so which subnational registry IARC used is not named. The National Cancer Institute's performance reports end in 2019.",
      links: [
        { label: "NCCP: Cancer Incidence and Mortality Data, Colombo District 2013 to 2019 (scanned PDF)", url: PBCR_COLOMBO },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Sri Lanka (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: ["sri-lanka-ministry-of-health", "nccp-sri-lanka", "sri-lanka-national-cancer-registry", "nmra-sri-lanka", "apeksha-hospital-maharagama", "iarc", "iaea", "who"],
  companies: [],
  drugs: ["trastuzumab", "osimertinib", "alectinib", "nivolumab"],
  trials: [],
  papers: [
    "paper-joseph-novel-cancer-drugs-budget-impact-sri-lanka-ecancer-2025", "paper-joseph-perioperative-nsclc-cost-effectiveness-sri-lanka-bmjonc-2026",
    "paper-wijeratne-breast-cancer-hospital-registry-sri-lanka-bmccancer-2021", "paper-wijeratne-colorectal-hospital-registry-sri-lanka-jcogo-2022",
    "paper-alvitigala-lymphoma-trends-sri-lanka-canep-2025", "paper-sawant-rupantaran-sri-lanka-registry-ecancer-2023",
    "paper-nilaweera-economic-crisis-health-seeking-sri-lanka-bmchsr-2026", "paper-perera-hpv-prevalence-kalutara-bmcmed-2025",
  ],
  people: [],
  how:
    "Every card was written from Sri Lankan official sources and international agencies, read in full rather than through a summary: the National Cancer Control Programme's 2022 cancer incidence and mortality report, its 2024 annual report, its 2020 to 2024 national strategic plan and the Colombo district registry report (a scan, read by text recognition); the National Medicines Regulatory Authority's pages and its clinical trial and pricing guidelines; the National Cancer Institute Maharagama's own pages; WHO's 2023 crisis appeal and January 2023 release, its immunisation coverage rows and its health expenditure rows from public APIs; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and the ClinicalTrials.gov API. The new records added for this page (the Ministry, the programme, the registry, the regulator, the National Cancer Institute and eight papers) carry their own sources.",
  verify:
    "National counts come from a registry that publishes about three years after the year it counts, and IARC's figures are modelled estimates. Which centres give radiotherapy, which medicines are in stock and how long the waits are change faster than any report; ask the treating hospital's oncology clinic. Medicine supply was disrupted from 2022, so check with the hospital pharmacy before relying on a medicine being available free.",
  verifyLinks: [
    { label: "National Cancer Control Programme, Sri Lanka", url: "https://www.nccp.health.gov.lk/en" },
    { label: "Ministry of Health and Mass Media, Sri Lanka", url: "https://www.health.gov.lk/" },
    { label: "National Medicines Regulatory Authority", url: "https://www.nmra.gov.lk/" },
    { label: "National Cancer Institute Sri Lanka (Apeksha Hospital)", url: NCI_HOME },
  ],
};
