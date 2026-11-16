import type { CountryDive } from "@/data/country-dive";

/**
 * Bulgaria deep dive: the hand-written cards for /countries/bg/ (wave 8). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Bulgaria; the Sofia
 * oncology hospital's (USBALO's) history and "about" pages; the National Health Insurance Fund's pages on hospital and
 * expensive medicines; the Bulgarian Drug Agency's history page; the National Council on Prices and Reimbursement's
 * home page; the European Medicines Agency's page on the centralised procedure; WHO's HPV coverage and health
 * expenditure rows from its public data APIs. Bulgarian pages were read in Bulgarian. The National Cancer Registry's
 * own recent counts were not found on a page that answered a plain request, and are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/100-bulgaria-fact-sheet.pdf";
const USBALO_HIST = "https://www.sbaloncology.bg/За-болницата/История/s2";
const NHIF_HOSP = "https://www.nhif.bg/bg/medicine_food/hospital-drugs";
const NHIF_EXP = "https://www.nhif.bg/bg/administrative-services/expensive-drugs";
const BDA_HIST = "https://www.bda.bg/bg/за-иал/история";
const NCPR = "https://www.ncpr.bg/bg/";
const EMA_CENTRAL = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BGR'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BGR'";
const CTGOV = "https://clinicaltrials.gov/search?country=Bulgaria&cond=cancer";

export const BG_DIVE: CountryDive = {
  iso2: "BG",
  iso3: "BGR",
  name: "Bulgaria",
  flag: "🇧🇬",
  asOf: "2026-11-11",
  title: "Cancer in Bulgaria",
  description:
    "Cancer in Bulgaria: IARC's estimate of 31,876 new cancers and 19,354 deaths in 2024, built on the national registry at the Sofia oncology hospital, whose roots go back to 1952; a public insurer that pays for hospital cancer medicines outside the price of a clinical pathway; a reimbursement council and a positive drug list; EU approval of new medicines; out-of-pocket payments at about a third of health spending; and HPV vaccination that reached 14% of girls in 2025.",
  lede:
    "Bulgaria's National Cancer Registry grew from a section of the Sofia cancer institute opened in 1952. IARC estimates 31,876 new cancers and 19,354 cancer deaths in 2024, about six deaths for every ten new cases, with men's cancer death rate well above women's. Patients pay about a third of the country's health spending themselves.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Bulgaria is 31,876 new cancers and 19,354 deaths, an age-standardised incidence of 219.9 per 100,000 (252.4 in men, 200.6 in women) and mortality of 117.1 (153.2 in men, 90.9 in women). IARC's method for incidence is trends in the national registry's rates projected to 2024, and for deaths trends in national WHO mortality data. Deaths divided by new cases give 0.61. OnCo did not find the National Cancer Registry's own recent counts on a page that answered a plain request, so they are not set beside IARC's estimate here; see the gaps.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Bulgaria",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Bulgaria (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 32,000 new cancers a year, with colorectal, lung, breast and prostate leading, and lung the leading cause of death",
          plain:
            "IARC estimates 31,876 new cancers in Bulgaria in 2024: 17,097 in men and 14,779 in women. Colorectal, lung, breast and prostate cancer are the four commonest, and lung cancer causes the most deaths. Pancreatic cancer, though seventh by cases, is fourth by deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 4,371 colorectal cancers (2,812 deaths), 3,884 lung cancers (3,429 deaths, 17.7% of cancer deaths), 3,559 breast cancers (1,411 deaths), 3,183 prostate cancers (1,285 deaths) and 1,698 bladder cancers. Pancreatic cancer has 1,389 cases and 1,361 deaths. Cervical cancer has 844 cases and 451 deaths. The age-standardised mortality rate in men is 153.2 per 100,000 against 90.9 in women. An estimated 79,557 people are living within five years of a diagnosis. These are IARC's projections from Bulgaria's registry and death records, not a count.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Bulgaria (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "globocan-top",
          title: "The commonest cancers in IARC's 2024 estimate",
          caption: "Estimated new cases and deaths in 2024, both sexes, IARC GLOBOCAN 2024",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 31876, deaths: 19354 },
            { site: "Colorectum", cases: 4371, deaths: 2812 },
            { site: "Lung", cases: 3884, deaths: 3429 },
            { site: "Breast", cases: 3559, deaths: 1411 },
            { site: "Prostate", cases: 3183, deaths: 1285 },
            { site: "Bladder", cases: 1698, deaths: 739 },
            { site: "Stomach", cases: 1412, deaths: 1079 },
            { site: "Pancreas", cases: 1389, deaths: 1361 },
          ],
          note: "IARC's estimates, projected from the national registry's trends. The registry's own counts were not read; see the gaps.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Bulgaria (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "A national registry since 1952",
      cards: [
        {
          id: "registry-history",
          title: "The registry grew out of the Sofia cancer institute",
          plain:
            "Bulgaria's National Cancer Registry is part of the specialised oncology hospital in Sofia. It began in 1952 as a section of the country's oncology research institute, which itself grew from a 50-bed anti-cancer centre opened in 1936.",
          detail:
            "The history page of the University Specialised Hospital for Active Treatment in Oncology \"Prof. Ivan Chernozemski\" (USBALO) says the first anti-cancer centre, with 50 beds, opened in 1936 at the X-ray institute of the Sofia medical faculty, where radium treatment began. The Research Oncology Institute was created on that base in 1950, and in 1952 it opened a scientific organisational and methodological section, which the hospital says is today the National Cancer Registry. IARC classifies Bulgaria's incidence data source as a national registry. OnCo did not find the registry's recent annual publication on a page that answered a plain request.",
          links: [
            { label: "USBALO: history (in Bulgarian)", url: USBALO_HIST },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bulgaria, data source and methods (PDF)", url: IARC_FACTSHEET },
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
          id: "nhif",
          title: "One public insurer, paying for hospital cancer medicines separately",
          plain:
            "Bulgaria's National Health Insurance Fund pays hospitals for treatment and pays separately for medicines used in hospital care, including cancer medicines, outside the price of each clinical pathway. Expensive medicines are granted after an expert assessment under the Health Insurance Act.",
          detail:
            "The Fund's pages publish the lists of medicines it pays for, including medicines used in hospital care, and reports of hospital medicines paid outside the value of clinical pathways and outpatient procedures, by region, hospital, diagnosis code and ATC code. It publishes a list of medicines for oncological and onco-haematological diseases for which a remainder is allowed. Expensive medicines are granted after expert assessment under Article 78, point 2, of the Health Insurance Act, and medicines for home treatment are tracked through electronic protocols. WHO's Global Health Expenditure Database puts out-of-pocket spending at 35.5% of Bulgaria's current health expenditure in 2023 (against 14.1% for Finland and 11.3% for Ireland in the same database).",
          links: [
            { label: "NHIF: medicinal products used in hospital care (in Bulgarian)", url: NHIF_HOSP },
            { label: "NHIF: expert assessments for expensive medicines (in Bulgarian)", url: NHIF_EXP },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Bulgaria (API)", url: WHO_GHED_API },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Reimbursement",
      title: "How a new cancer medicine is paid for",
      cards: [
        {
          id: "ncpr",
          title: "A national council decides prices and the Positive Drug List",
          plain:
            "The National Council on Prices and Reimbursement decides which medicines are included in the Positive Drug List and keeps their reimbursement status under review, and publishes summaries of the health technology assessments behind its decisions.",
          detail:
            "The Council's home page lists its administrative procedures, the rules for appealing its acts, decisions on keeping medicines' reimbursement status, health technology assessment summaries behind decisions on inclusion in the Positive Drug List, including for listed medicines proposed by the Ministry of Health, the insurance fund or the marketing-authorisation holder, a schedule of official reviews, and an archive of assessment summaries held at the National Centre of Public Health and Analyses. It lists its participation in the Heads of HTA Agencies group. OnCo did not read the Council's rules on the evidence or thresholds it applies, or how long its decisions take; see the gaps.",
          links: [{ label: "National Council on Prices and Reimbursement: home page (in Bulgarian)", url: NCPR }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "bda-ema",
          title: "European approval, with the Bulgarian Drug Agency as the national regulator",
          plain:
            "As an EU member, Bulgaria receives new cancer medicines through the European Medicines Agency's centralised procedure, which is compulsory for them. The Bulgarian Drug Agency, an executive agency of the Ministry of Health, regulates medicines nationally.",
          detail:
            "The European Medicines Agency states that the centralised procedure is compulsory for medicines with a new active substance to treat cancer, for biotechnology medicines, advanced therapies and orphan medicines, and that the European Commission's authorisation is valid in every member state. The Bulgarian Drug Agency's history page dates drug regulation in Bulgaria from a decree of 31 October 1904 and records the founding of a drug safety centre in 1974, its entry into WHO's drug monitoring programme in 1975, and the adoption of the European Pharmacopoeia in 1995. In 1997 Sofia hosted the first official meeting aimed at setting up CADREAC, the collaboration of medicines regulators of the countries then associated with the EU.",
          links: [
            { label: "European Medicines Agency: authorisation of medicines, the centralised procedure", url: EMA_CENTRAL },
            { label: "Bulgarian Drug Agency: history (in Bulgarian)", url: BDA_HIST },
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
          id: "hpv",
          title: "HPV vaccination reaches few girls: 14% in 2025",
          plain:
            "WHO and UNICEF's figures put HPV vaccination coverage in Bulgaria at 14% of girls for the first dose in 2025, and 9% for the last dose. Coverage fell to 2% in 2021 and has risen since. 2025 is the first year with a figure for boys, 3%.",
          detail:
            "WHO's immunisation data give first-dose programme coverage in girls of 7% in 2019, 4% in 2020, 2% in 2021, 4% in 2022, 6% in 2023, 11% in 2024 and 14% in 2025; last-dose coverage was 9% in 2024 and 2025. The first row for boys, for 2025, is 3% for the first dose and 0% for the last. IARC estimates 844 cervical cancers and 451 cervical cancer deaths in Bulgaria in 2024. OnCo did not find a primary source describing an organised national screening programme for breast, cervical or colorectal cancer; see the gaps.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Bulgaria (API)", url: WHO_HPV_API },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bulgaria (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing differently",
      title: "What stands out in Bulgaria",
      cards: [
        {
          id: "trial-sites",
          title: "Many international cancer trials for a country of under seven million",
          plain:
            "166 of the cancer trials in OnCo's records list a site in Bulgaria, counted from ClinicalTrials.gov participation data on 11 November 2026. That is about 70% of the number for Norway or Ireland and 78% of Finland's, while Bulgaria publishes about a quarter as many oncology papers as Norway.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials: 166 list Bulgaria, against 238 for Norway, 213 for Finland and 242 for Ireland. OpenAlex counts 655 oncology works with an author in Bulgaria in 2021 to 2025, against 2,637 for Norway. OnCo did not find a primary source on why sponsors place trials in Bulgaria, and makes no claim about it.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Bulgaria (search)", url: CTGOV }],
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
          title: "Research output and trials",
          plain:
            "OpenAlex counts 158 oncology papers with at least one author based in Bulgaria in 2025, up from 117 in 2021. The trials with a Bulgarian site listed below are a selection from the 166 in OnCo's records.",
          detail:
            "OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Bulgaria 117 works in 2021, 105 in 2022, 128 in 2023, 147 in 2024 and 158 in 2025, 655 in total, of which 549 are open access and 10 highly cited. The Bulgarian Joint Cancer Network and the Heart and Brain Hospital in Pleven are members of the Organisation of European Cancer Institutes, according to their records in OnCo. The trial counts reflect the trials OnCo holds, not every study in Bulgaria.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Bulgaria (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-counts",
      title: "The registry's own counts",
      plain:
        "OnCo did not find the Bulgarian National Cancer Registry's recent annual counts on a page that answered a plain request, so this page gives IARC's estimate and not the registry's own figures.",
      detail:
        "The Sofia oncology hospital's website describes the registry's history but no current statistical publication was linked from the pages read. The OECD and European Commission's country cancer profile for Bulgaria was not read. Survival after a cancer diagnosis in Bulgaria is therefore not on this page.",
      links: [{ label: "USBALO: history (in Bulgarian)", url: USBALO_HIST }],
    },
    {
      id: "unread-sources",
      title: "Screening, the cancer plan and waiting times",
      plain:
        "Whether Bulgaria runs organised screening for breast, cervical or bowel cancer, the state of a national cancer plan, radiotherapy capacity and waiting times are not on this page, because OnCo did not read them from a primary source.",
      detail:
        "The Ministry of Health's pages were not read. The National Council on Prices and Reimbursement's methods and decision times, and the insurance fund's disease-by-disease requirements for expensive medicines, were not read. The IAEA's DIRAC radiotherapy database was not read.",
      links: [{ label: "National Council on Prices and Reimbursement (in Bulgarian)", url: NCPR }],
    },
  ],
  institutions: ["usbalo-sofia", "nhif-bulgaria", "ncpr-bulgaria", "bda-bulgaria", "bjcn", "heart-and-brain-pleven", "ema", "iarc"],
  companies: [],
  drugs: [],
  trials: ["latitude", "arasens", "capitello-281", "serena-6", "topaz-1", "caspian", "duo-o", "cll14"],
  papers: [],
  people: [],
  how:
    "Every card was written from Bulgarian official sources read in Bulgarian rather than through a summary: the Sofia oncology hospital's history pages; the National Health Insurance Fund's pages on medicines; the Bulgarian Drug Agency's history; the National Council on Prices and Reimbursement's home page; the European Medicines Agency's page on the centralised procedure; WHO's HPV coverage and health expenditure rows from its public data APIs; and IARC's GLOBOCAN 2024 fact sheet. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the hospital and registry, the insurance fund, the drug agency and the reimbursement council) carry their own sources.",
  verify:
    "Which medicines the insurance fund pays for depends on the Positive Drug List and the fund's requirements for each disease, which change. Ask the treating oncology centre or the regional health insurance office what applies to you.",
  verifyLinks: [
    { label: "National Health Insurance Fund (in Bulgarian)", url: "https://www.nhif.bg" },
    { label: "Bulgarian Drug Agency", url: "https://www.bda.bg" },
    { label: "National Council on Prices and Reimbursement (in Bulgarian)", url: NCPR },
  ],
};
