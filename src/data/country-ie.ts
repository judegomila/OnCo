import type { CountryDive } from "@/data/country-dive";

/**
 * Ireland deep dive: the hand-written cards for /countries/ie/ (wave 8). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the National Cancer Registry Ireland's annual statistical
 * report Cancer in Ireland 1994 to 2023 (PDF text, 2026) and its home page; the Department of Health's National Cancer
 * Strategy 2017 to 2026 (PDF text); the National Centre for Pharmacoeconomics' pages on the reimbursement process; the
 * HSE's Drugs Payment Scheme page and the National Screening Service's programme pages; the Health Products Regulatory
 * Authority's "About us" page; the Irish Statute Book's text of the Public Health (Alcohol) Act 2018 section 12 and the
 * 2023 labelling regulations; the European Medicines Agency's page on the centralised procedure; WHO's HPV coverage and
 * health expenditure rows from its public data APIs; and IARC's GLOBOCAN 2024 fact sheet. Gaps are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/372-ireland-fact-sheet.pdf";
const NCRI = "https://www.ncri.ie/";
const NCRI_2026 = "https://www.ncri.ie/sites/default/files/2026-08/NCRI_AnnualStatReport_2026.pdf";
const STRATEGY = "https://assets.gov.ie/static/documents/national-cancer-strategy-2017-2026.pdf";
const NCPE = "https://www.ncpe.ie/";
const NCPE_PROCESS = "https://www.ncpe.ie/submission-process/overview-of-the-drug-reimbursement-process/";
const DPS = "https://www2.hse.ie/services/schemes-allowances/drugs-payment-scheme/";
const HPRA = "https://www.hpra.ie/about-us";
const EMA_CENTRAL = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const BOWEL = "http://www2.healthservice.hse.ie/organisation/bowelscreen/";
const BREAST = "http://www2.healthservice.hse.ie/organisation/breastcheck/";
const CERVICAL = "http://www2.healthservice.hse.ie/organisation/cervicalcheck/";
const ALCOHOL_ACT = "https://www.irishstatutebook.ie/eli/2018/act/24/section/12/enacted/en/html";
const ALCOHOL_SI = "https://www.irishstatutebook.ie/eli/2023/si/249/made/en/html";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'IRL'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'IRL'";
const CTGOV = "https://clinicaltrials.gov/search?country=Ireland&cond=cancer";

export const IE_DIVE: CountryDive = {
  iso2: "IE",
  iso3: "IRL",
  name: "Ireland",
  flag: "🇮🇪",
  asOf: "2026-11-11",
  title: "Cancer in Ireland",
  description:
    "Cancer in Ireland from Irish sources: the National Cancer Registry's average of 26,528 invasive cancers and 10,007 cancer deaths a year in 2021 to 2023, IARC's 2024 estimate, eight designated cancer centres under the National Cancer Control Programme, the NCPE's four-week Rapid Review and 18-week full assessment of new medicines, a EUR 80 monthly cap under the Drugs Payment Scheme, free bowel, breast and cervical screening, and a cancer warning on alcohol labels that is not yet in force.",
  lede:
    "Ireland's registry has counted cancer in the whole population since 1994. In 2021 to 2023 it recorded an average of 26,528 invasive cancers a year, excluding non-melanoma skin cancer, and 10,007 cancer deaths, and five-year survival has risen from 50% to 66% in twenty years. Since the National Cancer Control Programme was set up in 2007, specialist cancer care has been concentrated in eight designated cancer centres.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Ireland is 30,752 new cancers and 10,914 deaths, an age-standardised incidence of 317.0 per 100,000 (358.2 in men, 279.9 in women) and mortality of 92.6. Excluding non-melanoma skin cancer, IARC's estimate is 26,172 new cancers. IARC's method is trends in the national registry's rates projected to 2024, with deaths projected from national WHO mortality data. The registry's own figures are three-year averages: 26,528 invasive cancers excluding non-melanoma skin cancer and 10,007 deaths a year in 2021 to 2023. Its rates use the European standard population, not IARC's world standard, so the two sets of rates cannot be set side by side.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Ireland",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Ireland (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "Prostate and breast cancer are each a third of cancers in men and women; lung cancer causes one death in five",
          plain:
            "Leaving out non-melanoma skin cancer, prostate cancer is about a third of cancers in men and breast cancer about a third in women. Lung cancer is the leading cause of cancer death in both sexes, about one cancer death in five. The median age at diagnosis is 68.",
          detail:
            "The registry's 2026 report gives prostate cancer as 31.8% of invasive cancers in men and breast cancer as 32.6% in women in 2021 to 2023, excluding non-melanoma skin cancer; for both sexes together prostate (17.0%) and breast (15.3%) lead, then colorectal and lung cancer (10.8% each) and melanoma (5.3%). Lung cancer caused 19.7% of cancer deaths, an average of 1,971 a year, followed by colorectal (10.4%), breast (7.6%), prostate (6.2%) and pancreatic cancer (6.1%). Non-melanoma skin cancer made up about a quarter of all registered tumours. The median age at diagnosis was 68; testicular cancer, Hodgkin lymphoma, cervical and thyroid cancer had median ages under 50. Melanoma incidence is rising strongly in both sexes, and melanoma mortality rose significantly in women in recent years.",
          links: [
            { label: "NCRI: Cancer in Ireland 1994 to 2023, executive summary and Table 1 (PDF)", url: NCRI_2026 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Ireland (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
      tables: [
        {
          id: "ncri-2021-2023",
          title: "The registry's own count, average a year 2021 to 2023",
          caption: "Average annual new cases and deaths, 2021 to 2023, invasive cancers",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "casesM", label: "Cases, men", numeric: true },
            { key: "casesF", label: "Cases, women", numeric: true },
            { key: "deaths", label: "Deaths, both sexes", numeric: true },
          ],
          rows: [
            { site: "All invasive, excluding non-melanoma skin", casesM: 14143, casesF: 12385, deaths: 9910 },
            { site: "Prostate", casesM: 4502, casesF: null, deaths: 621 },
            { site: "Breast", casesM: 33, casesF: 4036, deaths: 756 },
            { site: "Lung", casesM: 1491, casesF: 1364, deaths: 1971 },
            { site: "Colorectal", casesM: 1656, casesF: 1213, deaths: 1042 },
            { site: "Melanoma of skin", casesM: 723, casesF: 694, deaths: 188 },
            { site: "Pancreas", casesM: 353, casesF: 316, deaths: 614 },
          ],
          note: "From Tables 1-1 and 2-1 of the registry's 2026 report. Deaths come from the Central Statistics Office. Lung cases are bronchus and lung (C34).",
          sources: [{ label: "NCRI: Cancer in Ireland 1994 to 2023, Tables 1-1 and 2-1 (PDF)", url: NCRI_2026 }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "A national registry since 1994",
      cards: [
        {
          id: "registry-survival",
          title: "Survival up from 50% to 66%, and premature cancer deaths below the EU average",
          plain:
            "Five-year net survival for invasive cancers rose from 50% for people diagnosed in 1999 to 2003 to 66% for those diagnosed in 2019 to 2023. About 231,000 people, 4.4% of the population, were living after an invasive cancer diagnosis at the end of 2023.",
          detail:
            "The National Cancer Registry Ireland was established by the Minister for Health in 1991 and has collected data on the whole population since 1994. Its 2026 report finds the largest relative gain in five-year net survival in pancreatic cancer (175%), though survival remains low there, and large differences by stage, with lung and liver cancer often found late. It compares Ireland with the EU-27: cancer mortality before age 75 was 11% lower than the EU average, while mortality at all ages was 2.6% higher, which the registry attributes to longer life expectancy. Premature mortality was marginally higher than the EU average for oesophageal, ovarian and uterine cancer and melanoma. Incidence in men has fallen since 2009; in women it has been broadly stable.",
          links: [
            { label: "NCRI: Cancer in Ireland 1994 to 2023, executive summary (PDF)", url: NCRI_2026 },
            { label: "National Cancer Registry Ireland: home page", url: NCRI },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "public-private",
          title: "Public hospitals run by the HSE, with a monthly cap on medicines from the pharmacy",
          plain:
            "For medicines bought at a pharmacy in Ireland, the Drugs Payment Scheme means a person or family with a card pays no more than EUR 80 a month for approved medicines. WHO estimates that people pay about 11% of Ireland's health spending out of their own pockets.",
          detail:
            "The HSE's pages on the Drugs Payment Scheme say to apply for a card if you or your family pay more than EUR 80 in a month for approved drugs, medicines and appliances, and that with cards for all family members a family pays no more than EUR 80 in a month. WHO's Global Health Expenditure Database puts out-of-pocket spending at 11.3% of Ireland's current health expenditure in 2023. The National Cancer Strategy 2017 to 2026 names social and financial support as a priority raised in its public consultation. OnCo did not read the HSE's current rules on hospital charges, medical cards or what private health insurance pays for cancer care, so this page does not describe them; see the gaps.",
          links: [
            { label: "HSE: Drugs Payment Scheme", url: DPS },
            { label: "HSE: Drugs Payment Scheme card", url: "https://www2.hse.ie/services/schemes-allowances/drugs-payment-scheme/card/" },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Ireland (API)", url: WHO_GHED_API },
            { label: "Department of Health: National Cancer Strategy 2017 to 2026 (PDF)", url: STRATEGY },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "New medicines",
      title: "How a new cancer medicine is paid for",
      cards: [
        {
          id: "ncpe",
          title: "A Rapid Review for every new medicine, a full assessment for costly ones, then an HSE decision",
          plain:
            "A company that wants the HSE to pay for a new medicine applies to the HSE, which asks the National Centre for Pharmacoeconomics to assess it. Every medicine gets a Rapid Review of about four weeks; expensive or uncertain ones get a full assessment of about 18 weeks. The HSE then decides.",
          detail:
            "The NCPE describes itself as an independent health technology assessment agency. The HSE's Corporate Pharmaceutical Unit, its interface with industry on pricing and reimbursement, commissions the NCPE once an application arrives. A company can submit a Rapid Review at any point after a positive opinion from the European Medicines Agency's CHMP. A full assessment follows for products with a high cost relative to comparators, a net impact on the drugs budget, or doubt about comparative efficacy or value; it takes about 18 weeks, plus about five weeks while questions are with the company. For cancer medicines the full report also goes to the National Cancer Control Programme. The HSE leadership decides, under the criteria in Schedule 3, Part 3 of the Health (Pricing and Supply of Medical Goods) Act 2013.",
          links: [
            { label: "NCPE: overview of the drug reimbursement process", url: NCPE_PROCESS },
            { label: "NCPE: home page", url: NCPE },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "hpra-ema",
          title: "European approval, with the HPRA as the national regulator",
          plain:
            "New cancer medicines are approved for Ireland through the European Medicines Agency's centralised procedure, which is compulsory for them, and the authorisation is valid across the EU. The Health Products Regulatory Authority regulates medicines, health products and devices in Ireland.",
          detail:
            "The European Medicines Agency states that the centralised procedure is compulsory for medicines with a new active substance to treat cancer, for biotechnology medicines, advanced therapies and orphan medicines, and that the European Commission issues its decision within 67 days of EMA's recommendation. The HPRA describes itself as regulating medicines, health products and devices for the benefit of people and animals, and publishes lists of authorised and withdrawn medicines and notified shortages. Approval does not mean the HSE pays: reimbursement follows the NCPE's assessment and an HSE decision.",
          links: [
            { label: "European Medicines Agency: authorisation of medicines, the centralised procedure", url: EMA_CENTRAL },
            { label: "HPRA: about us", url: HPRA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      cards: [
        {
          id: "screening-programmes",
          title: "Three free screening programmes: BowelScreen, BreastCheck and CervicalCheck",
          plain:
            "The HSE's National Screening Service runs three free cancer screening programmes: BowelScreen for people aged 57 to 71 with a home stool test, BreastCheck for women aged 50 to 69 every two to three years, and CervicalCheck for women and people with a cervix aged 25 to 65.",
          detail:
            "The National Screening Service says it runs four national population screening programmes, three for cancer and one for diabetic retinopathy. BowelScreen uses a free home faecal immunochemical test (FIT) that checks for blood in a stool sample, for people aged 57 to 71. BreastCheck invites women aged 50 to 69 every 2 to 3 years. CervicalCheck offers free cervical screening tests to women and people with a cervix aged 25 to 65 and describes its test as checking a person's risk of developing cervical cancer. The registry links falling colorectal cancer incidence and mortality in part to screening.",
          links: [
            { label: "HSE: BowelScreen", url: BOWEL },
            { label: "HSE: BreastCheck", url: BREAST },
            { label: "HSE: CervicalCheck", url: CERVICAL },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine for girls and boys, with three quarters vaccinated in 2025",
          plain:
            "WHO and UNICEF's figures put HPV vaccination coverage in Ireland at 76% of girls and 74% of boys in 2025, with rows for boys from 2019. Coverage fell in 2020 and rose again, but has not returned to the 87% first-dose figure for girls in 2019.",
          detail:
            "WHO's immunisation data for Ireland give first-dose programme coverage of 87% in girls and 76% in boys in 2019, 61% and 58% in 2020, 81% and 77% in 2022 and 2023, 73% and 69% in 2024, and 76% and 74% in 2025, with the same figures for the last dose in 2025. The National Cancer Registry's 2026 report says the programme began in 2010/11 for girls aged 12 to 13 and was extended to boys in 2019.",
          links: [{ label: "WHO immunisation data: HPV programme coverage, Ireland (API)", url: WHO_HPV_API }, { label: "NCRI: Cancer in Ireland 1994 to 2023, HPV vaccination programme (PDF)", url: NCRI_2026 }],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing differently",
      title: "What Ireland does differently",
      cards: [
        {
          id: "designated-centres",
          title: "Cancer care concentrated in eight designated centres",
          plain:
            "After its 2006 cancer strategy Ireland set up the National Cancer Control Programme in 2007 and designated eight cancer centres where surgery and specialist treatment are concentrated, alongside rapid access clinics for people with suspected cancer.",
          detail:
            "The National Cancer Strategy 2017 to 2026 says the 2006 strategy led to the establishment of designated cancer centres and the reform of how cancer is diagnosed and treated, and that the NCCP, established in 2007, led the development of services such as rapid access clinics. It lists the designation of eight cancer centres, screening programmes, rapid access clinics, multidisciplinary team working and treatment standards among the achievements of that period, and says centralising care provides for optimal treatment. The eight centres are Beaumont, the Mater, St James's and St Vincent's in Dublin, Cork, Galway, Waterford and Limerick, each listed below. The strategy runs to 2026; OnCo did not find a successor published by November 2026.",
          links: [{ label: "Department of Health: National Cancer Strategy 2017 to 2026 (PDF)", url: STRATEGY }],
        },
        {
          id: "alcohol-warning",
          title: "A law that will require alcohol to carry a cancer warning",
          plain:
            "Ireland's Public Health (Alcohol) Act 2018 provides for alcohol containers to carry a warning about the direct link between alcohol and fatal cancers, worded \"There is a direct link between alcohol and fatal cancers\". In September 2025 the start was put back three years, so the labels are not yet compulsory.",
          detail:
            "Section 12 of the Act makes it an offence to sell an alcohol product whose container does not bear, among other things, a warning intended to inform the public of the direct link between alcohol and fatal cancers; licensed premises and online sellers must display the same warnings. The Public Health (Alcohol) (Labelling) Regulations 2023 (S.I. No. 249 of 2023) prescribe the wording and, as made, were to come into operation on 22 May 2026. On 3 September 2025 the Minister for Health made S.I. No. 422 of 2025, under which section 12 comes into operation three years after the date of that order, and S.I. No. 423 of 2025, which replaced the 22 May 2026 date in the labelling regulations. On the statute book's text the requirement therefore starts in 2028, not 2026.",
          links: [
            { label: "Irish Statute Book: Public Health (Alcohol) Act 2018, section 12", url: ALCOHOL_ACT },
            { label: "Irish Statute Book: S.I. No. 249/2023, labelling regulations (as made)", url: ALCOHOL_SI },
            { label: "Irish Statute Book: S.I. No. 422/2025, commencement order for section 12", url: "https://www.irishstatutebook.ie/eli/2025/si/422/made/en/html" },
            { label: "Irish Statute Book: S.I. No. 423/2025, amending the labelling regulations' start date", url: "https://www.irishstatutebook.ie/eli/2025/si/423/made/en/html" },
          ],
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
          title: "242 trials in OnCo's records have a site in Ireland",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 242 of the cancer trials in our records list a site in Ireland, many of them breast cancer trials. A selection is listed below.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and 242 list Ireland among their countries; that reflects the trials OnCo holds, not every study in Ireland. When OnCo built its country file on 8 September 2026, ClinicalTrials.gov counted 3,141 studies of any condition with a site in Ireland. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Ireland 583 works in 2021, 491 in 2022, 467 in 2023, 458 in 2024 and 580 in 2025, 2,579 in total, of which 1,920 are open access and 115 highly cited.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Ireland (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "costs",
      title: "Hospital charges, medical cards and private insurance",
      plain:
        "OnCo did not read the HSE's current rules on hospital charges for cancer care, who qualifies for a medical card, or what private health insurance covers, so this page does not say what a cancer patient in Ireland pays beyond the Drugs Payment Scheme cap.",
      detail:
        "The HSE's National Cancer Control Programme pages returned errors to a plain request on 11 November 2026 and were not read; what this page says about the NCCP comes from the 2017 to 2026 strategy and the NCPE. The Health Insurance Authority's figures on private cover were not read.",
      links: [{ label: "HSE: Drugs Payment Scheme", url: DPS }],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Waiting times for cancer care, radiotherapy capacity, screening uptake and the list of cancer medicines the HSE has approved or declined are not on this page, because OnCo did not read them from a primary source.",
      detail:
        "The NCPE publishes its recommendations and the HSE its reimbursement decisions; neither list was read. The National Screening Service's programme reports with uptake figures, and the IAEA's DIRAC radiotherapy database, were not read. A successor to the 2017 to 2026 strategy was not found.",
      links: [{ label: "NCPE: home page", url: NCPE }],
    },
  ],
  institutions: [
    "national-cancer-registry-ireland", "nccp-ireland", "ncpe-ireland", "hpra-ireland", "beaumont-rcsi-cancer-centre", "mater-misericordiae",
    "trinity-st-jamess-cancer-institute", "st-vincents-ucd-cancer-centre", "cork-university-hospital", "galway-university-hospital-cancer-centre",
    "university-hospital-waterford", "mid-western-cancer-centre", "irish-cancer-society", "ema", "iarc",
  ],
  companies: ["icon-plc", "jazz", "luminate-medical", "onk-therapeutics"],
  drugs: [],
  trials: ["tailorx", "rxponder", "aphinity", "katherine", "peace-1", "keynote-671", "checkmate-577", "coin"],
  papers: [],
  people: [],
  how:
    "Every card was written from Irish official sources read in full rather than through a summary: the National Cancer Registry Ireland's 2026 annual statistical report and its home page; the Department of Health's National Cancer Strategy 2017 to 2026; the NCPE's pages on the reimbursement process; the HSE's Drugs Payment Scheme and National Screening Service pages; the HPRA's description of itself; the Irish Statute Book; the European Medicines Agency's page on the centralised procedure; WHO's HPV coverage and health expenditure rows from its public data APIs; and IARC's GLOBOCAN 2024 fact sheet. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the registry, the NCCP, the NCPE and the HPRA) carry their own sources.",
  verify:
    "Which cancer medicines the HSE pays for changes with each decision, and screening age ranges can change. Check the NCPE and HSE for a specific medicine, and ask the designated cancer centre treating you what applies.",
  verifyLinks: [
    { label: "National Cancer Registry Ireland", url: NCRI },
    { label: "NCPE", url: NCPE },
    { label: "HSE National Screening Service", url: "https://www.screeningservice.ie/" },
  ],
};
