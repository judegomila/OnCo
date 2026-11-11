import type { CountryDive } from "@/data/country-dive";

/**
 * Singapore deep dive: the hand-written cards for /countries/sg/ (wave 9). Every figure was read from the raw text of its
 * source on 11 November 2026: the Singapore Cancer Registry Annual Report 2023 (PDF text), the Ministry of Health's
 * Cancer Drug List page and its spreadsheet of 1 September 2026, its cancer treatment financing FAQs and 2022 brochure
 * (PDF text), the Health Sciences Authority's evaluation routes page, HealthHub's Healthier SG Screening page, IARC's
 * GLOBOCAN 2024 fact sheet for Singapore (PDF text), WHO's Global Health Observatory API (HPV coverage and the 2021
 * country capacity survey), the World Bank's health expenditure API, and OnCo's own ClinicalTrials.gov participation
 * data. Where a figure could not be read it is named under `gaps`.
 */
const SCR_2023 = "https://isomer-user-content.by.gov.sg/737/a9695c77-40d5-4bbd-a4b9-347a0942b191/singapore-cancer-registry-annual-report-2023.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/702-singapore-fact-sheet.pdf";
const CDL = "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/medishield-life/cancer-drug-list/";
const CDL_FAQ = "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/medishield-life/faqs-on-cancer-treatment-financing/";
const CDL_BROCHURE = "https://isomer-user-content.by.gov.sg/3/8192ecd7-304a-491b-a4a1-3ee9760581ee/moh-cancer-drug-treatment-brochure-2022-(final).pdf";
const HSA_ROUTES = "https://www.hsa.gov.sg/therapeutic-products/registration-of-therapeutic-products/register-your-therapeutic-product/registration-of-therapeutic-products/evaluation-routes/";
const HSG_SCREEN = "https://www.healthhub.sg/programmes/healthiersg-screening";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'SGP'";
const WHO_CCS = "https://ghoapi.azureedge.net/api/NCD_CCS_cervicalcancermethod?$filter=SpatialDim%20eq%20'SGP'";
const WB_OOP = "https://api.worldbank.org/v2/country/SGP/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Singapore&cond=cancer";

export const SG_DIVE: CountryDive = {
  iso2: "SG",
  iso3: "SGP",
  name: "Singapore",
  flag: "🇸🇬",
  asOf: "2026-11-11",
  title: "Cancer in Singapore",
  description:
    "Cancer in Singapore from Singapore sources: a national registry counting cancer since 1968, 91,574 cancers in residents in 2019 to 2023 and five-year survival of 61.4%, the Cancer Drug List that since September 2022 decides which outpatient cancer treatments MediShield Life pays for, the Health Sciences Authority's verification route, subsidised screening, and 294 trials in our records with a site in Singapore.",
  lede:
    "Singapore has counted every cancer in its residents since 1968, and its registry recorded 91,574 new cancers and 30,979 cancer deaths in 2019 to 2023. Cancer is the leading cause of death. What sets Singapore apart is how it pays for cancer medicines: since 1 September 2022 national insurance covers only treatments on a list that rewards cost-effectiveness.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Singapore is 19,290 new cancers and 7,612 deaths, an age-standardised incidence of 202.9 per 100,000 and mortality of 70.6, for a total population of 5,832,390. The national registry counts only Singapore residents (citizens and permanent residents): it recorded 19,321 cancers and 6,146 cancer deaths in 2023, and an age-standardised incidence of 243.5 per 100,000 for 2019 to 2023 (Segi world standard), so the two sets of figures measure different populations and are not interchangeable. IARC's fact sheet names its incidence method as national mortality estimates applied to modelled mortality-to-incidence ratios from registry data, and its mortality source as WHO national data projected to 2024. For figures about Singapore residents, use the registry.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Singapore",
      aside: { label: "Singapore Cancer Registry Annual Report 2023 (PDF)", url: SCR_2023 },
      cards: [
        {
          id: "shape",
          title: "About 19,000 new cancers a year in residents; prostate and breast lead",
          plain:
            "The Singapore Cancer Registry counted 91,574 cancers in residents in the five years 2019 to 2023 and 30,979 cancer deaths. Prostate, colorectal and lung cancer were the commonest in men; breast, colorectal and lung cancer in women. Lung cancer caused the most cancer deaths in men and breast cancer the most in women.",
          detail:
            "In 2019 to 2023 the registry counted 44,981 cancers in men and 46,593 in women. Prostate cancer was 18.0% of male cancers (8,114) and breast cancer 29.9% of female cancers (13,935). Lung cancer caused 4,033 deaths in men, 24.6% of male cancer deaths, and breast cancer 2,426 deaths in women, 17.9%. The registry estimates a lifetime risk of cancer by age 75 of 26.8% for men and 26.2% for women, about 1 in 4, and says cancer accounted for 26.2% of all deaths in 2019 to 2023. Median age at diagnosis has risen from 59.6 to 69.1 years in men and from 57.3 to 64.6 years in women since 1968 to 1972, and the report notes the fastest recent increases in incidence in people under 50.",
          links: [
            { label: "Singapore Cancer Registry Annual Report 2023, executive summary and table 1.1.2 (PDF)", url: SCR_2023 },
          ],
        },
        {
          id: "survival",
          title: "Five-year survival rose from 19.5% to 61.4%",
          plain:
            "The registry's age-standardised five-year relative survival for all cancers was 61.4% for people diagnosed in 2019 to 2023, against 19.5% in 1973 to 1977. Age-standardised death rates have fallen for both sexes since a peak in 1978 to 1982, even though more people are being diagnosed as the population ages.",
          detail:
            "Relative survival compares people with cancer to people of the same sex, age and calendar year in the general population; cases known only from a death certificate are excluded. The registry's age-standardised mortality rate for 2019 to 2023 was 84.5 per 100,000 in men and 61.7 in women. It also reports differences by ethnic group: the age-standardised incidence among Malay women rose from 98.5 per 100,000 in 1968 to 1972 to 258.2 in 2019 to 2023, overtaking Chinese women.",
          links: [
            { label: "Singapore Cancer Registry Annual Report 2023, sections 1.1 and 1.2 (PDF)", url: SCR_2023 },
          ],
        },
      ],
      tables: [
        {
          id: "sg-registry",
          title: "What the Singapore Cancer Registry counted",
          caption: "Cancers and cancer deaths in Singapore residents, with age-standardised rates per 100,000 (Segi world standard). Annual Report 2023.",
          columns: [
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "asir", label: "Incidence (ASR)", numeric: true },
            { key: "deaths", label: "Cancer deaths", numeric: true },
            { key: "asmr", label: "Mortality (ASR)", numeric: true },
          ],
          rows: [
            { period: "1968 to 1972", cases: 12113, asir: 189.5, deaths: 5858, asmr: 93.2 },
            { period: "2013 to 2017", cases: 72671, asir: 233.9, deaths: 29090, asmr: 86.9 },
            { period: "2019 to 2023", cases: 91574, asir: 243.5, deaths: 30979, asmr: 71.9 },
            { period: "2023", cases: 19321, asir: 241.2, deaths: 6146, asmr: 65.1 },
          ],
          note: "Residents only (citizens and permanent residents); benign and in situ tumours excluded. Incidence data stood at 28 February 2025 and mortality at 30 September 2024.",
          sources: [{ label: "Singapore Cancer Registry Annual Report 2023, tables 1.1.1(a) and 1.1.1(b) (PDF)", url: SCR_2023 }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry backed by law since 2007",
      aside: { label: "National Registry of Diseases Office: publications", url: "https://www.nrdo.gov.sg/publications/" },
      cards: [
        {
          id: "registry-law",
          title: "Reporting is compulsory, and every record is checked against the medical notes",
          plain:
            "The Singapore Cancer Registry was set up in 1967 and has counted cancers from 1 January 1968. Under the National Registry of Diseases Act of 2007 and its cancer notification regulations, in force since 1 August 2009, doctors, laboratories and hospitals must report cancers, and registry staff check each notification against the patient's medical record.",
          detail:
            "The registry is run by the National Registry of Diseases Office. The cancer notification regulations have been operational since 1 August 2009. Notifications come from medical practitioners, histopathology and haematology laboratories, and healthcare institutions; records are matched on the national identity card number to remove duplicates. Sites are coded in ICD-10-AM and histology in ICD-O-3, and stage follows the AJCC manual in use at diagnosis. The report says internal audits found inter-rater reliability above 95% for all data items.",
          links: [
            { label: "Singapore Cancer Registry Annual Report 2023, pages 5 and 6 (PDF)", url: SCR_2023 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: MediShield Life, MediSave and the Cancer Drug List",
      aside: { label: "Ministry of Health: Cancer Drug List", url: CDL },
      cards: [
        {
          id: "cdl",
          title: "Since September 2022, national insurance pays only for listed cancer treatments",
          plain:
            "From 1 September 2022, MediShield Life, the national insurance, and MediSave, the compulsory savings accounts, pay only for outpatient cancer treatments on the Ministry of Health's Cancer Drug List. Each listed treatment has its own monthly claim limit. Before, MediShield Life paid up to $3,000 a month for any cancer drug.",
          detail:
            "The Ministry's FAQs say the list holds treatments that are clinically proven (registered by the Health Sciences Authority for that use) and more cost-effective than the existing standard of care, that companies make the case through a submission to the Agency for Care Effectiveness, and that the list is updated three times a year. The page in force on 11 November 2026 sets MediShield Life claim limits in tiers from $200 to $9,600 a month, and the downloadable list dated 1 September 2026 has 410 rows (one per drug, form or indication). Of those rows, 167 carry no subsidy, 161 are subsidised through the Medication Assistance Fund and the other 82 through the Standard Drug List. The 2022 brochure said more than 90% of about 200 cancer drug treatments approved by the Health Sciences Authority were on the list at launch. The list does not apply to inpatient treatment, which falls under inpatient limits.",
          links: [
            { label: "Ministry of Health: Cancer Drug List (list dated 1 September 2026)", url: CDL },
            { label: "Ministry of Health: FAQs on cancer treatment financing", url: CDL_FAQ },
            { label: "Ministry of Health: Affordable cancer drug treatment for all (2022 brochure, PDF)", url: CDL_BROCHURE },
          ],
        },
        {
          id: "subsidy",
          title: "Subsidies depend on household income, and private plans may cover more",
          plain:
            "In public hospitals, subsidies for cancer drugs depend on household income per person. The Ministry's 2022 brochure gives the example of a patient paying nothing in cash after a 75% subsidy. Private Integrated Shield Plans set their own limits, and riders may cover treatments beyond the list.",
          detail:
            "The brochure's subsidy table runs by monthly per capita household income bands from $0 to $2,000 up to more than $6,500, for drugs under the Medication Assistance Fund; there is no change to subsidy levels for the Standard Drug List. MediShield Life also pays for cancer drug services, such as consultations, scans and chemotherapy preparation, up to $1,200 a year. Patients who still cannot afford their bills can approach a medical social worker for help such as MediFund. The World Bank's latest figure puts out-of-pocket spending at 25.4% of Singapore's current health expenditure in 2023.",
          links: [
            { label: "Ministry of Health: Affordable cancer drug treatment for all (2022 brochure, PDF)", url: CDL_BROCHURE },
            { label: "Ministry of Health: FAQs on cancer treatment financing", url: CDL_FAQ },
            { label: "World Bank: out-of-pocket expenditure, Singapore (API)", url: WB_OOP },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "How a cancer medicine is approved",
      aside: { label: "HSA: evaluation routes", url: HSA_ROUTES },
      cards: [
        {
          id: "hsa-routes",
          title: "Three routes, and a fast one for medicines two trusted regulators have approved",
          plain:
            "The Health Sciences Authority registers a new medicine by full evaluation, by abridged evaluation if one regulator elsewhere has approved it, or by verification if at least two of its six reference regulators have. A company can ask for priority review for a medicine for a serious condition with an unmet need, and HSA names cancer as a condition of local concern.",
          detail:
            "HSA's reference agencies are the US FDA, the European Medicines Agency through its centralised procedure, Health Canada, the UK MHRA, Swissmedic and Australia's TGA. The verification route needs approval by at least two of them, the chosen primary agency within three years, a declaration that the product is identical, and the unredacted assessment reports. Full evaluation requires notice at least two months before submission. Registration for the indication is also the first test for the Cancer Drug List, and companies may file with the Agency for Care Effectiveness in parallel. Singapore takes part in Project Orbis, the FDA's programme for reviewing cancer medicines together.",
          links: [
            { label: "HSA: evaluation routes for therapeutic products", url: HSA_ROUTES },
            { label: "FDA: Project Orbis partners, including Singapore's HSA", url: "https://www.fda.gov/about-fda/oncology-center-excellence/project-orbis" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "HealthHub: Healthier SG Screening", url: HSG_SCREEN },
      cards: [
        {
          id: "screening-cost",
          title: "Cervical and bowel screening for $5 or less, breast screening at selected polyclinics",
          plain:
            "Eligible Singapore citizens pay $5 or less for subsidised screening at CHAS clinics, which covers cervical and colorectal cancer screening, and nothing if enrolled with Healthier SG at their own clinic. Breast screening is offered at selected polyclinics, free for enrolled citizens.",
          detail:
            "HealthHub's Healthier SG Screening page sets the visit charge at $0 for the Pioneer Generation, $2 for the Merdeka Generation and CHAS Blue or Orange cardholders, and $5 for other eligible citizens and CHAS Green cardholders, covering all eligible tests in one visit plus one follow-up consultation. Breast screening at selected polyclinics costs $0 for Healthier SG-enrolled citizens, $25 for the Pioneer Generation, $37.50 for the Merdeka Generation, $50 for other citizens and $75 for permanent residents. Eligibility depends on age, sex, conditions and the last screening date. In WHO's 2021 country capacity survey Singapore reported the HPV test as the main cervical screening method.",
          links: [
            { label: "HealthHub: Healthier SG Screening", url: HSG_SCREEN },
            { label: "WHO Global Health Observatory: cervical screening method, Singapore (API)", url: WHO_CCS },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine coverage went from about 2% to 75% in two years",
          plain:
            "WHO estimates that 78% of girls in the target age group in Singapore had been vaccinated against HPV in 2024 and 2025. Coverage was 1% or 2% each year until 2017, then 39% in 2018 and 75% in 2019.",
          detail:
            "The figures are WHO's estimates of HPV vaccination coverage in the primary target cohort of girls aged 9 to 14, from its Global Health Observatory: 89% in 2020 and 2021, 74% in 2022, 72% in 2023 and 78% in 2024 and 2025. The jump from 2018 matches a move to vaccination in schools, but OnCo did not read the Ministry's announcement of that programme and does not give its date here; see the gaps.",
          links: [{ label: "WHO Global Health Observatory: HPV coverage, Singapore (API)", url: WHO_HPV }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Singapore does",
      title: "What Singapore does differently",
      cards: [
        {
          id: "value-list",
          title: "Insurance limits sized to the cost-effective treatment",
          plain:
            "Singapore links what insurance pays to value. For a cost-effective treatment, the Ministry sizes the MediShield Life limit to cover the bill after subsidy for a subsidised patient in a public hospital, and when a combination is not cost-effective its limit is pegged to the highest single drug in it. A company that raises its price can see its treatment removed.",
          detail:
            "The FAQs say treatments usually stay on the list unless there are strong reasons to remove them, that limits may be cut when a generic or biosimilar arrives, and that a treatment can be removed if the maker raises its price to a level that is not cost-effective. For three-weekly treatments the limit is usually sized for two courses in a month. Doctors may change a drug in a listed combination for intolerance or clinical judgement and keep the original claim limit, if the replacement is on the list for cancer treatment.",
          links: [{ label: "Ministry of Health: FAQs on cancer treatment financing", url: CDL_FAQ }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-research",
          title: "294 trials in OnCo's records have a site in Singapore",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, 294 cancer trials in our records list a site in Singapore and 101 were recruiting. Six run only in Singapore, sponsored by the National Cancer Centre Singapore or the National University Hospital.",
          detail:
            "Most of the 294 are international trials sponsored by drug companies. The six Singapore-only trials include metronomic chemotherapy with irinotecan dosed by UGT1A1 genotype in pancreatic cancer and a neoantigen dendritic cell vaccine with nivolumab in liver cancer at the National Cancer Centre, and early trials of new drug combinations, most with an immunotherapy antibody, at the National University Hospital. OnCo's participation data cover 5,899 trials, mostly large trials of new medicines, so this is not a count of all research in Singapore; the ClinicalTrials.gov search linked here shows more.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Singapore (search)", url: CTGOV },
            { label: "Open trials on OnCo", url: "/trials/open/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "radiotherapy-count",
      title: "No official count of radiotherapy machines or cancer specialists was read",
      plain:
        "OnCo found no Singapore source it could read that counts radiotherapy machines or oncologists. The IAEA's directory of radiotherapy centres works only in a browser, and WHO's 2021 survey records that radiotherapy is generally available in the public sector without giving numbers.",
      detail:
        "The IAEA DIRAC directory is a Tableau application that does not return its figures to a plain request, so no machine count is given. WHO's country capacity survey for 2021 reports radiotherapy, chemotherapy and pathology services as generally available in the public sector in Singapore; it also reports oral morphine as not generally available in the public health sector and no operational cancer plan, both of which may reflect how the questions were answered rather than practice, and OnCo has not checked them against a Ministry source.",
      links: [
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
        { label: "WHO Global Health Observatory: radiotherapy availability (API)", url: "https://ghoapi.azureedge.net/api/NCD_CCS_radio?$filter=SpatialDim%20eq%20'SGP'" },
      ],
    },
    {
      id: "unread-sources",
      title: "Other sources not reached",
      plain:
        "The Agency for Care Effectiveness's 'about us' page returned a page-not-found message, so its founding and remit are described from the Ministry's FAQs. The Ministry's announcement of school-based HPV vaccination and the Health Promotion Board's screening intervals were not read.",
      detail:
        "OnCo's web search budget was spent during this round, so pages had to be reached by known addresses. The HealthHub Screen for Life page answered 404; the Healthier SG Screening page was used instead and gives prices but not recommended intervals by age. Survival by stage and by cancer is in the registry report but is not summarised here beyond the all-cancer figure.",
      links: [
        { label: "Agency for Care Effectiveness", url: "https://www.ace-hta.gov.sg" },
        { label: "HealthHub: Healthier SG Screening", url: HSG_SCREEN },
      ],
    },
  ],
  institutions: [
    "ministry-of-health-singapore", "singapore-cancer-registry", "hsa-singapore", "ace-singapore", "nccs", "nuh-ncis", "singapore-cancer-society", "iarc", "who",
  ],
  companies: ["mirxes", "lucence", "hummingbird-bioscience", "prestige-biopharma"],
  drugs: [],
  trials: ["nct05929885", "nct06846268", "nct04912765", "nct05491083", "nct05035745", "nct07681297", "nct05910827", "nct06931717", "nct06340568"],
  papers: [],
  people: ["lim-soon-thye", "rebecca-dent", "chee-cheng-ean", "goh-cheng-liang"],
  how:
    "Every card was written from Singapore's own sources, read in full rather than through a summary: the Singapore Cancer Registry Annual Report 2023; the Ministry of Health's Cancer Drug List page, its list dated 1 September 2026, its financing FAQs and its 2022 brochure; the Health Sciences Authority's evaluation routes page; and HealthHub's screening page. International figures come from IARC's GLOBOCAN 2024 fact sheet, WHO's Global Health Observatory and the World Bank. Trials were counted from OnCo's ClinicalTrials.gov participation data. The four new records (the Ministry, the registry, the Health Sciences Authority and the Agency for Care Effectiveness) carry their own sources.",
  verify:
    "Claim limits, subsidy classes and the Cancer Drug List change three times a year, and what you pay depends on your household income, residency and insurance plan. Check the Ministry's current list and ask a medical social worker or your insurer before starting treatment.",
  verifyLinks: [
    { label: "Ministry of Health: Cancer Drug List", url: CDL },
    { label: "Health Sciences Authority", url: "https://www.hsa.gov.sg" },
    { label: "National Registry of Diseases Office: publications", url: "https://www.nrdo.gov.sg/publications/" },
  ],
};
