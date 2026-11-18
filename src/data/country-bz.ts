import type { CountryDive } from "@/data/country-dive";

/**
 * Belize deep dive: the hand-written cards for /countries/bz/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Belize (PDF text);
 * WHO's Cancer Country Profile 2020 for Belize (the copy on the ICCP portal; WHO's own address returns 404) and its
 * Cervical Cancer Country Profile 2021 (PDF text); WHO's vaccine introduction, HPV coverage and Global Health
 * Expenditure Database rows from its public data APIs; IAEA DIRAC's public equipment data (no row for Belize); the
 * National Health Insurance scheme's own pages (history, screenings, co-payment); PAHO's Health in the Americas profile
 * of Belize; the Government of Belize Press Office release of 10 April 2026 and PAHO's release on a workshop with the
 * Drug Inspectorate Unit (datelined 13 August 2026, published 1 September); the UNEP Law and Environment Assistance
 * Platform entry for the Food and Drugs (Registration, Licensing and Inspection) Regulations, 2017, and the scanned text
 * of the regulations that entry links at FAO's legal database (PDF text, read in the second check on 16 November
 * 2026); the Belize Cancer Society's own site (home, about, services and contact pages, found in the second check);
 * CARPHA's Caribbean Regulatory System pages; the GICR page of the IARC
 * Caribbean Cancer Registry Hub; Global Oncology's Belize page; Amandala's report on the Belize
 * Cancer Center (datelined 13 December 2021, published 15 December); and three papers, their abstracts resolved through Europe PMC and their open full texts read there.
 * The National Assembly's copy of the 2025 amending regulations and PAHO's PRAIS page could not be read (certificate
 * errors), and the ICCP portal's list of documents for Belize could not be re-read in the second check; each missing
 * source is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/84-belize-fact-sheet.pdf";
const WHO_2020 = "https://www.iccp-portal.org/system/files/plans/BLZ_2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-blz-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BLZ'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'BLZ'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BLZ'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'BLZ'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'BLZ'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'BLZ'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const NHI_HISTORY = "https://www.nhi.bz/history-of-nhi/";
const NHI_SCREENINGS = "https://www.nhi.bz/screenings/";
const NHI_COPAY = "https://www.nhi.bz/copayment/";
const PAHO_HIA = "https://hia.paho.org/en/country-profiles/belize";
const PRESS_OTC = "https://www.pressoffice.gov.bz/mohw-addresses-public-concerns-regarding-over-the-counter-medicines-in-belize/";
const PAHO_PMS = "https://www.paho.org/en/news/1-9-2026-strengthening-post-market-surveillance-quality-and-safety-medicines-and-vaccines";
const LEAP_REGS = "https://leap.unep.org/en/countries/bz/national-legislation/food-and-drugs-registration-licensing-and-inspection-regulations";
const FAOLEX_REGS = "https://faolex.fao.org/docs/pdf/blz176493.pdf";
const BCS_SITE = "https://www.belizecancersociety.org/";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/faq";
const GICR_HUB = "https://gicr.iarc.fr/hub/caribbean/";
const GLOBALONC = "https://www.globalonc.org/belize";
const AMANDALA_BCC = "https://amandala.com.bz/news/cancer-center-opens-doors-in-belize-city";
const MOHW = "https://www.health.gov.bz/";
const WONG_2023 = "https://doi.org/10.1093/oncolo/oyad030";
const NEIBART_2021 = "https://doi.org/10.1200/go.21.00138";
const MITTAL_2023 = "https://doi.org/10.1007/s10552-023-01703-0";
const CTGOV = "https://clinicaltrials.gov/search?country=Belize&cond=cancer";

export const BZ_DIVE: CountryDive = {
  iso2: "BZ",
  iso3: "BLZ",
  name: "Belize",
  flag: "🇧🇿",
  asOf: "2026-11-16",
  title: "Cancer in Belize",
  description:
    "Cancer in Belize from its own and WHO sources: IARC's estimate of 415 new cancers and 201 deaths in 2024, modelled from deaths, a 2023 paper from the national oncology clinic saying there was no cancer registry, one public oncology clinic at the national referral hospital since 2018, no radiotherapy in the country so that patients travel to Mexico or Guatemala, a National Health Insurance scheme that covers primary care in parts of the country, and HPV vaccination since 2016.",
  lede:
    "Belize's national cancer figures are a model: IARC lists no incidence data for the country and works out 415 new cancers in 2024 from an estimated 201 deaths, with breast, prostate and cervical cancer the commonest. A 2023 paper from the national oncology clinic says there was no cancer registry. Public cancer care began in 2018 with one oncology clinic at the Karl Heusner Memorial Hospital in Belize City. There is no radiotherapy in the country, and people who need it travel to Mexico or Guatemala.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Belize is 415 new cancers and 201 deaths, an age-standardised incidence of 118.8 per 100,000 (121.1 in men, 117.7 in women) and mortality of 59.7. The fact sheet gives the country-specific incidence data source as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\": new cases are worked out from deaths, not counted. Mortality comes from WHO national data, with the method \"Trends in national rates projected to 2024\". With about 417,000 people the numbers for single cancers are small, and the fact sheet shows no cases at all for several sites, including thyroid, bladder and melanoma. Read those as the limits of a model built on recorded deaths, not as a finding that these cancers do not occur in Belize.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Belize",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Belize (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 415 new cancers a year, with breast, prostate and cervical cancer the commonest",
          plain:
            "IARC estimates 415 new cancers in Belize in 2024, 194 in men and 221 in women, and 201 cancer deaths. Breast cancer is the commonest, then prostate and cervical cancer. Prostate cancer causes the most deaths, followed by cervical and lung cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 89 breast cancers (22 deaths), 64 prostate cancers (28 deaths), 41 cervical cancers (25 deaths), 40 colorectal cancers (16 deaths), 37 lung cancers (25 deaths), 29 liver cancers (21 deaths) and 26 stomach cancers (13 deaths). In men the leading cancers are prostate (64, 33.0%), lung (28) and liver (21); in women, breast (89, 40.3%), cervix (41, 18.6%) and colorectum (22). The risk of developing cancer before age 75 is 11.6%, and of dying of it 6.1%. An estimated 893 people are living within five years of a diagnosis. All of these are modelled from national death records, as the note under the table explains.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Belize (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "no-registry",
          title: "No cancer registry yet; the first clinic-based figures were published in 2023",
          plain:
            "Belize does not have a cancer registry that counts new cases across the country. The first clinic-based cancer statistics for Belize, as their authors describe them, came from the public oncology clinic in Belize City: 465 patients seen between 2018 and 2022, most often with breast or cervical cancer, and two in three with stage 3 or 4 disease.",
          detail:
            "WHO's 2021 cervical cancer profile answers \"No\" to whether a population-based cancer registry exists, and its 2020 cancer profile records only \"registration activity\". The clinic's own paper (Wong and colleagues, 2023) says there was no cancer registry in Belize, that work on one dates back to a 2008 collaboration between the Belize Cancer Society and the Ministry of Health, and that there was renewed interest in building one in 2023. Of the 465 patients, 28% had breast cancer and 12% cervical cancer, 68% presented with stage 3 or 4 disease, and 21% ever started treatment with curative intent. Belize is among the countries covered by the IARC Caribbean Cancer Registry Hub, based at the Caribbean Public Health Agency in Trinidad and Tobago. OnCo found no announcement that a registry has since started work.",
          links: [
            { label: "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)", url: WONG_2023 },
            { label: "WHO: Cervical Cancer Country Profile 2021, Belize (PDF)", url: WHO_CX_2021 },
            { label: "WHO: Cancer Country Profile 2020, Belize (PDF, ICCP portal copy)", url: WHO_2020 },
            { label: "IARC Global Initiative for Cancer Registry Development: Caribbean Hub", url: GICR_HUB },
          ],
        },
      ],
      tables: [
        {
          id: "bz-top",
          title: "IARC's leading cancers for Belize, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 89, deaths: 22 },
            { site: "Prostate", cases: 64, deaths: 28 },
            { site: "Cervix uteri", cases: 41, deaths: 25 },
            { site: "Colorectum", cases: 40, deaths: 16 },
            { site: "Lung", cases: 37, deaths: 25 },
            { site: "Liver", cases: 29, deaths: 21 },
            { site: "Stomach", cases: 26, deaths: 13 },
            { site: "Leukaemia", cases: 13, deaths: 7 },
            { site: "All cancers", cases: 415, deaths: 201 },
          ],
          note: "IARC lists no incidence data for Belize: new cases are modelled from national mortality estimates and mortality-to-incidence ratios, so this is the table a registry would replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Belize (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "bz-clinic",
          title: "What the public oncology clinic recorded, 2018 to 2022",
          caption: "Patients seen at the Karl Heusner Memorial Hospital oncology clinic, from the abstract of the clinic's 2023 paper.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "value", label: "Value", numeric: true },
          ],
          rows: [
            { measure: "Patients with cancer seen", value: 465 },
            { measure: "Breast cancer (%)", value: 28 },
            { measure: "Cervical cancer (%)", value: 12 },
            { measure: "Stage 3 or 4 at presentation (%)", value: 68 },
            { measure: "Ever started treatment with curative intent (%)", value: 21 },
            { measure: "Median days from first symptoms to biopsy", value: 130 },
            { measure: "Median days from first symptoms to treatment", value: 189 },
          ],
          note: "One clinic's patients, not national incidence: it counts people who reached the public clinic in Belize City, and people treated privately or abroad are not in it.",
          sources: [{ label: "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)", url: WONG_2023 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "National Health Insurance Belize: history of the scheme", url: NHI_HISTORY },
      cards: [
        {
          id: "nhi",
          title: "National Health Insurance buys primary care in parts of the country, not cancer treatment",
          plain:
            "Belize's National Health Insurance scheme pays for a package of primary care, including screening for breast, cervical and prostate cancer, for people registered in the areas it covers. The oncology clinic's own study says patients, including insured ones, pay for chemotherapy and scans themselves.",
          detail:
            "The scheme's history page says it was established in 2000 through an amendment to the Social Security Act, began as a pilot on the south side of Belize City in August 2001, expanded to the Southern Region in January 2006 and rolled out to Corozal in 2015, and that a sustainable source of funding has been the main obstacle to a national roll-out. Members pay a 10% co-payment on some services, with exemptions. Wong and colleagues describe the scheme as available only to people in the poorer areas it serves and as covering basic diagnostic services and primary care; nearly four in five of the clinic's patients had no health insurance. They add that a regular stock of chemotherapy medicines was first secured in 2021 in partnership with the scheme, and that before then patients bought chemotherapy outside Belize and brought it to the clinic.",
          links: [
            { label: "National Health Insurance Belize: history of the scheme", url: NHI_HISTORY },
            { label: "National Health Insurance Belize: co-payment", url: NHI_COPAY },
            { label: "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)", url: WONG_2023 },
            { label: "PAHO: Health in the Americas, Belize country profile", url: PAHO_HIA },
          ],
        },
        {
          id: "spending",
          title: "About US$309 a person on health, just over a quarter of it out of pocket",
          plain:
            "WHO's figures put health spending in Belize at about 309 US dollars a person in 2023. Government paid about 65% of it and households paid about 27% directly out of their own pockets. Those figures cover all health care, not cancer alone.",
          detail:
            "WHO's Global Health Expenditure Database gives, for 2023, current health expenditure of US$309 per person, 65.1% of it from domestic government sources, 26.8% out of pocket and 1.6% from external sources. The out-of-pocket share was 20.8% in 2020 and 22.0% in 2021. Global Oncology, the charity that helped set up the public clinic, says it is working with the Ministry of Health and the Social Security Board on policies to reduce the financial burden on patients who must travel abroad for radiotherapy. OnCo found no official scheme that pays for cancer treatment abroad; the hospital's oncology clinic or the Ministry of Health and Wellness is the place to ask what help exists.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Belize (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "WHO Global Health Expenditure Database: external share (API)", url: WHO_EXT_API },
            { label: "Global Oncology: Belize", url: GLOBALONC },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Food and Drugs (Registration, Licensing and Inspection) Regulations, 2017 (UNEP LEAP entry)", url: LEAP_REGS },
      cards: [
        {
          id: "drug-inspectorate",
          title: "Regulations of 2017 require medicines to be registered; the Ministry's Drug Inspectorate Unit is the public contact",
          plain:
            "Regulations made in 2017 under the Food and Drugs Act require a medicine to be registered and licensed before it is sold in Belize, and license the businesses that handle medicines. The authority they name is the Director of Health Services in the Ministry of Health and Wellness. The Ministry's Drug Inspectorate Unit is the contact it gives the public for questions about medicines.",
          detail:
            "The Food and Drugs (Registration, Licensing and Inspection) Regulations, Statutory Instrument 54 of 2017, were made by the Minister responsible for health under section 55 of the Food and Drugs Act, Chapter 291, and gazetted on 29 July 2017. OnCo read the scanned copy held by FAO's legal database on 16 November 2026. Regulation 3 says a person shall not put a drug on the market without registering it and receiving a product licence from the competent authority, which the regulations define as the Director of Health Services or his nominee in the Ministry; the Minister may grant exemptions, and the penalty is a fine of up to 10,000 dollars. Regulation 5 exempts orphan drugs, meaning drugs for rare diseases, from registration but requires an import authorisation for them. Other parts cover facility licences, inspection and offences. The text OnCo read does not name the Drug Inspectorate Unit. A file on the National Assembly's site whose name describes amending regulations of 2025 could not be opened, so whether the 2017 text has been changed is not confirmed here. A Government press release of 10 April 2026 names the Drug Inspectorate Unit as the contact for questions on medicines, and PAHO reports a workshop on 12 and 13 August 2026, convened by the Ministry, that brought the unit together with pharmacists, importers and others on monitoring the quality and safety of medicines after they reach the market.",
          links: [
            { label: "Food and Drugs (Registration, Licensing and Inspection) Regulations, 2017: scanned text at FAO's legal database (PDF)", url: FAOLEX_REGS },
            { label: "UNEP Law and Environment Assistance Platform: Food and Drugs (Registration, Licensing and Inspection) Regulations, 2017", url: LEAP_REGS },
            { label: "Government of Belize Press Office: release on medicines, 10 April 2026", url: PRESS_OTC },
            { label: "PAHO: strengthening post-market surveillance of medicines and vaccines in Belize (August 2026)", url: PAHO_PMS },
          ],
        },
        {
          id: "crs",
          title: "A Caribbean review route: the Caribbean Regulatory System recommends, Belize decides",
          plain:
            "Belize belongs to the Caribbean Community, whose public health agency runs a shared review service for medicines. It reviews products that a trusted regulator elsewhere has already approved and recommends them to member states. Belize is one of six countries the service lists as granting marketing authorisations of their own.",
          detail:
            "CARPHA's pages say Caribbean Community health ministers agreed in 2016 to create the Caribbean Regulatory System inside the Caribbean Public Health Agency, to support marketing authorisation and the monitoring of medicine safety, and that it reviews and recommends medicines and vaccines using regulatory reliance. Its guidance for applicants says in one place that the aim is to turn a recommendation into a lawful national marketing authorisation within 60 calendar days and in another that the target is 120 calendar days, and lists Belize, Guyana, Haiti, Jamaica, Suriname and Trinidad and Tobago as the countries that conduct marketing authorisation. The guidance is undated. Which cancer medicines are registered in Belize is not something OnCo could read: see the gaps.",
          links: [
            { label: "CARPHA: about the Caribbean Regulatory System", url: CRS_ABOUT },
            { label: "CARPHA: Caribbean Regulatory System, guidance and questions for applicants", url: CRS_FAQ },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cervical Cancer Country Profile 2021, Belize (PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "cervical-screening",
          title: "Free cervical screening in public clinics, by smear or visual inspection, with HPV testing added in 2022",
          plain:
            "Public clinics in Belize offer cervical screening free of charge, by Pap smear or by looking at the cervix after applying dilute vinegar. PAHO's country profile says HPV testing was introduced in 2022, with women able to collect their own sample. Surveys of the service found too few staff and supplies to reach every woman.",
          detail:
            "WHO's 2021 profile records a national screening programme using cytology for women aged 18 to 49 and estimates that 47% of women aged 30 to 49 had been screened in the previous five years (2019). Its 2020 cancer profile described screening as opportunistic, by visual inspection, with participation under 10%; the two are not measured the same way. An assessment in June 2018 counted 75 nurses and doctors doing screening in the public sector, one for every 1,076 eligible women, and found that half of facilities offered it one day a week and that three quarters of pathology supplies had run out at least once in the previous year. In 47 interviews that month, 64 people involved in screening, from clinic staff to officials and patient advocates, named possible delays in smear results among the barriers. The National Health Insurance scheme's guidance for its clinics lists a Pap test every three years from age 21 and yearly mammograms from 40.",
          links: [
            { label: "WHO: Cervical Cancer Country Profile 2021, Belize (PDF)", url: WHO_CX_2021 },
            { label: "WHO: Cancer Country Profile 2020, Belize (PDF, ICCP portal copy)", url: WHO_2020 },
            { label: "Neibart et al., cervical cancer prevention and treatment infrastructure in Belize (JCO Glob Oncol 2021)", url: NEIBART_2021 },
            { label: "Mittal et al., barriers and facilitators to cervical screening in Belize (Cancer Causes Control 2023)", url: MITTAL_2023 },
            { label: "PAHO: Health in the Americas, Belize country profile", url: PAHO_HIA },
            { label: "National Health Insurance Belize: screenings", url: NHI_SCREENINGS },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination since 2016, with WHO coverage figures for boys as well as girls from 2019",
          plain:
            "Belize added the HPV vaccine to its national programme in 2016. WHO's figures for 2025 show 69% of girls and 55% of boys in the target group vaccinated. Coverage fell to 8% of girls in 2021, during the pandemic, and has since recovered.",
          detail:
            "WHO's vaccine introduction rows record nationwide HPV vaccination from 2016. Its programme coverage rows give, for girls' first dose, 55% in 2016, 77% in 2019, 54% in 2020, 8% in 2021, 83% in 2022, 50% in 2023, 62% in 2024 and 69% in 2025 (2,574 of a target of 3,741). Rows for boys begin in 2019 at 50% and stand at 55% for 2025 (2,156 of 3,921). From 2023 the first-dose and last-dose figures are identical, which fits PAHO's statement that Belize now gives one dose to school-aged boys and girls. WHO's 2021 profile gives the primary target group as ages 9 to 14.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Belize (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Belize (API)", url: WHO_INTRO_API },
            { label: "PAHO: Health in the Americas, Belize country profile", url: PAHO_HIA },
            { label: "WHO: Cervical Cancer Country Profile 2021, Belize (PDF)", url: WHO_CX_2021 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Belize",
      cards: [
        {
          id: "public-clinic",
          title: "One public oncology clinic, opened in 2018 at the national referral hospital",
          plain:
            "Public cancer care in Belize dates from 2018, when the Karl Heusner Memorial Hospital in Belize City, the Ministry of Health and the charity Global Oncology set up an oncology clinic. Its 2023 paper describes a small team: four nurses, a pharmacist and one medical oncologist, who was then the only one in the country.",
          detail:
            "The paper dates the clinic's soft launch to spring 2018 and its official launch to 2021, and says it had seen at least 533 patients by 2022. Once a patient reached the clinic, a biopsy and the start of chemotherapy each followed within 30 days, against a median of 130 days from first symptoms to biopsy before that. It reports that in 2022 Belize had two diagnostic pathologists, and that general surgeons carried out cancer operations. Of 131 patients with breast cancer, 44 arranged for their own tumour samples to be sent abroad for immunohistochemistry, the laboratory staining that guides the choice of treatment, more than half of them to the United States. These are the paper's figures for 2018 to 2022; staffing may have changed since, and the hospital is the place to ask.",
          links: [
            { label: "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)", url: WONG_2023 },
            { label: "Global Oncology: Belize", url: GLOBALONC },
          ],
        },
        {
          id: "radiotherapy",
          title: "No radiotherapy in Belize: patients travel to Mexico or Guatemala",
          plain:
            "There is no radiotherapy machine in Belize. Global Oncology, which works with the public clinic, says patients whose treatment needs radiotherapy have to travel to Mexico or Guatemala. IAEA's directory of radiotherapy centres lists no centre in the country.",
          detail:
            "The 2018 assessment of cervical cancer services found radiotherapy unavailable anywhere in Belize, and chemotherapy and radical hysterectomy in two of the six districts. WHO's 2021 profile records radiotherapy as not generally available and no radiation oncologists or medical physicists. IAEA DIRAC's public equipment data, read on 16 November 2026, has no entry for Belize, which is not proof on its own but agrees with the other sources. The clinic's paper says many patients who can afford to travel go to Mexico and Guatemala, and that 84 of its patients had first sought cancer care outside the country. The Belize Cancer Center Dangriga, a clinic that receives some sponsorship and asks patients to cover as much of their bill as they can, has operated in Dangriga since October 2008, and in December 2021 the Belize Cancer Society opened a clinic in Belize City on the same model, where the Dangriga centre provides consultations and chemotherapy, according to the newspaper Amandala.",
          links: [
            { label: "Global Oncology: Belize", url: GLOBALONC },
            { label: "Neibart et al., cervical cancer prevention and treatment infrastructure in Belize (JCO Glob Oncol 2021)", url: NEIBART_2021 },
            { label: "IAEA DIRAC: radiotherapy equipment by country (read 16 November 2026)", url: DIRAC },
            { label: "WHO: Cervical Cancer Country Profile 2021, Belize (PDF)", url: WHO_CX_2021 },
            { label: "Amandala: Cancer Center opens doors in Belize City (published 15 December 2021)", url: AMANDALA_BCC },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Belize", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Belize",
          plain:
            "None of the cancer trials in OnCo's records lists Belize among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search. The published research OnCo found is on the public clinic's patients and on cervical screening.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Belize. Three papers were read for this page: the oncology clinic's review of 465 patients seen from 2018 to 2022, a 2018 assessment of 13 public facilities involved in cervical cancer control, and 47 interviews that year with 64 people involved in cervical screening. A Europe PMC search for papers with Belize and cancer in the title returned only these three; widening it to leukaemia adds a 2018 report on treating childhood leukaemia jointly with a hospital in Mérida, Mexico, which was not read for this page.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Belize", url: CTGOV },
            { label: "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)", url: WONG_2023 },
            { label: "Neibart et al., cervical cancer prevention and treatment infrastructure in Belize (JCO Glob Oncol 2021)", url: NEIBART_2021 },
            { label: "Mittal et al., barriers and facilitators to cervical screening in Belize (Cancer Causes Control 2023)", url: MITTAL_2023 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-counts-and-plan",
      title: "No national case counts, no survival figures and no published cancer plan found",
      plain:
        "Without a registry there is no count of new cancers in Belize and no survival figure for any cancer. WHO's 2020 profile recorded a national cancer control plan as under development in 2019; OnCo did not find a published plan.",
      detail:
        "The 2021 paper on cervical cancer services cites a Cancer Prevention and Control Strategic Plan with a target of 15 public and private centres offering screening by visual inspection by 2020, and the clinic's paper names a Cervical Cancer Prevention and Control Strategic Plan for 2016 to 2020, drawn up by the Ministry with the non-profit Jhpiego. OnCo could not find the plan itself. On 16 November 2026 the Ministry of Health and Wellness's address showed only a page of contact details. The first reading of the ICCP portal found WHO's profiles, a national strategy and action plan for noncommunicable diseases and cervical cancer clinical guidelines listed for Belize, but no cancer plan; that list was not re-verified on 16 November 2026, when the portal's country list could not be read as plain text, and the last two documents were not read for this page. The clinic's paper says it has no outcome data for its patients. A future pass should look for the plan, for any registry launched since 2023, and for the Ministry's own cancer statistics; until then the Ministry and the oncology clinic at the Karl Heusner Memorial Hospital are the places to ask.",
      links: [
        { label: "WHO: Cancer Country Profile 2020, Belize (PDF, ICCP portal copy)", url: WHO_2020 },
        { label: "Neibart et al., cervical cancer prevention and treatment infrastructure in Belize (JCO Glob Oncol 2021)", url: NEIBART_2021 },
        { label: "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)", url: WONG_2023 },
        { label: "Ministry of Health and Wellness", url: MOHW },
      ],
    },
    {
      id: "gap-medicines",
      title: "A 2025 amendment to the medicines regulations could not be read, and no list of registered medicines was found",
      plain:
        "OnCo read the 2017 medicines regulations in a scanned copy, but could not open what appears to be a 2025 amendment or a page about Belize on PAHO's regulatory information site. Which cancer medicines are registered or stocked in Belize is not stated here.",
      detail:
        "The National Assembly's site, which holds a file named as Statutory Instrument 136 of 2025 amending the regulations, returned an expired security certificate on 16 November 2026, so neither the existence nor the content of that amendment is confirmed here, and PAHO's regulatory information site returned a certificate that did not match its address; OnCo does not work around such errors. No list of medicines on the public formulary was found, and the clinic's paper notes that one patient obtained a targeted breast cancer medicine privately. The Drug Inspectorate Unit of the Ministry of Health and Wellness can say whether a given medicine is registered.",
      links: [
        { label: "Food and Drugs (Registration, Licensing and Inspection) Regulations, 2017: scanned text at FAO's legal database (PDF)", url: FAOLEX_REGS },
        { label: "UNEP Law and Environment Assistance Platform: Food and Drugs (Registration, Licensing and Inspection) Regulations, 2017", url: LEAP_REGS },
        { label: "Government of Belize Press Office: release on medicines, 10 April 2026", url: PRESS_OTC },
      ],
    },
    {
      id: "gap-abroad",
      title: "No official account of how treatment abroad is arranged or paid for",
      plain:
        "The sources agree that people from Belize go to Mexico and Guatemala for radiotherapy, but OnCo found no official description of a referral scheme, which hospitals receive patients, or what the state pays. The Belize Cancer Society's site lists screening and support groups, and does not describe help with treatment abroad.",
      detail:
        "Global Oncology says it is developing patient navigation for people seeking radiotherapy outside the country and working with the Ministry and the Social Security Board on the cost; it gives no figures. Amandala's 2021 report names Guatemala City and Mérida as the places families had travelled to. The Belize Cancer Center's website returned a certificate error on 16 November 2026. A site at belizecancersociety.org that presents itself as the Belize Cancer Society's answered the same day: it describes the society as a non-governmental organisation of volunteers founded in 1996, gives an address on Mercy Lane, Belize City, and a telephone number, and lists breast screening, Pap smears, prostate screening, counselling and support groups. The pages OnCo read (home, about, services and contact) give no prices and do not mention treatment abroad, and some still hold placeholder text, so the two clinics' consultations and chemotherapy are described here only from the newspaper. Ask the oncology clinic at the Karl Heusner Memorial Hospital or the Belize Cancer Society what support is available before travelling.",
      links: [
        { label: "Global Oncology: Belize", url: GLOBALONC },
        { label: "Amandala: Cancer Center opens doors in Belize City (published 15 December 2021)", url: AMANDALA_BCC },
        { label: "Belize Cancer Society: services", url: `${BCS_SITE}services` },
      ],
    },
  ],
  institutions: ["khmh-belize", "moh-belize", "nhi-belize", "belize-cancer-society", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-wong-cancer-time-to-care-belize-oncologist-2023", "paper-neibart-cervical-infrastructure-belize-jcogo-2021", "paper-mittal-cervical-screening-barriers-belize-ccc-2023"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles and its immunisation and health expenditure data, IAEA DIRAC's public equipment data, the National Health Insurance scheme's own pages, PAHO's country profile and releases, a Government press release, the 2017 medicines regulations in a scanned copy at FAO's legal database, with the legal database entry that links it, the Belize Cancer Society's own site, CARPHA's pages on the Caribbean Regulatory System, Global Oncology's page, one newspaper report, and three papers whose abstracts were resolved through Europe PMC. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "National cancer figures for Belize are modelled, not counted, and the description of the public clinic comes from a paper covering 2018 to 2022. Staffing, medicine stocks and what the insurance scheme covers change; ask the oncology clinic at the Karl Heusner Memorial Hospital or the Ministry of Health and Wellness what applies to you.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Belize (PDF)", url: IARC_FACTSHEET },
    { label: "Ministry of Health and Wellness", url: MOHW },
    { label: "National Health Insurance Belize", url: "https://www.nhi.bz/" },
    { label: "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)", url: WONG_2023 },
  ],
};
