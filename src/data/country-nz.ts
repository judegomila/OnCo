import type { CountryDive } from "@/data/country-dive";

/**
 * New Zealand deep dive: the hand-written cards for /countries/nz/ (wave 9). Every figure was read from the raw text of
 * its source on 11 November 2026: Te Aho o Te Kahu's The State of Cancer in New Zealand 2025 (full report and insights
 * summary, PDF text) and its media release, its page on the Cervical Cancer Elimination Plan 2026 to 2040, Health New
 * Zealand's page on the New Zealand Cancer Registry, Pharmac's and Medsafe's "about" pages, IARC's GLOBOCAN 2024 fact
 * sheet (PDF text), WHO's Global Health Observatory API, the World Bank's health expenditure API and OnCo's own
 * ClinicalTrials.gov participation data. Where a figure could not be read it is named under `gaps`.
 */
const SOC_2025 = "https://teaho.govt.nz/index.php/CanStats/reports/state-cancer-new-zealand-2025";
const SOC_FULL = "https://teaho.govt.nz/index.php/download_file/view/c2d96fa6-bbad-4b38-bbf2-96b7fdcb5c3e/584";
const SOC_SUMMARY = "https://teaho.govt.nz/index.php/download_file/view/1ebdf8f1-6c08-4c12-b48f-ec36df7f0335/584";
const SOC_MR = "https://teaho.govt.nz/index.php/media-releases/media-release-state-cancer-new-zealand-2025";
const CX_PLAN = "https://teaho.govt.nz/index.php/CanStats/reports/new-zealand-cervical-cancer-elimination-plan-2026-2040";
const NZCR = "https://www.healthnz.govt.nz/about-us/health-data/data-sets-and-collections/cancer-data-and-statistics/new-zealand-cancer-registry";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/554-new-zealand-fact-sheet.pdf";
const PHARMAC = "https://pharmac.govt.nz/about";
const MEDSAFE = "https://www.medsafe.govt.nz/other/about.asp";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'NZL'";
const WB_OOP = "https://api.worldbank.org/v2/country/NZL/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=New%20Zealand&cond=cancer";

export const NZ_DIVE: CountryDive = {
  iso2: "NZ",
  iso3: "NZL",
  name: "New Zealand",
  flag: "🇳🇿",
  asOf: "2026-11-11",
  title: "Cancer in New Zealand",
  description:
    "Cancer in New Zealand from New Zealand sources: 137,000 people diagnosed in 2018 to 2022 according to the national registry, Māori 1.6 times and Pacific peoples 1.4 times as likely to die from cancer, Pharmac's fixed medicines budget and the 33 cancer medicines funded after the 2024 increase, HPV self-testing for cervical screening, the plan to eliminate cervical cancer by 2040, and 229 trials in our records with a site in New Zealand.",
  lede:
    "New Zealand's registry counted 137,000 people diagnosed with cancer in the five years 2018 to 2022, and cancer is the leading cause of death. Death rates have fallen by almost a quarter in twenty years, but not equally: Māori and Pacific peoples are more likely to die from cancer, and the cancer agency's reports measure that gap.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for New Zealand is 28,738 new cancers and 11,842 deaths, an age-standardised incidence of 294.4 per 100,000 and mortality of 97.6. IARC's fact sheet names the national registry as its incidence source and WHO national mortality data as its mortality source, both projected to 2024 from recent trends. GLOBOCAN's all-cancers figure includes non-melanoma skin cancer, while the New Zealand Cancer Registry excludes squamous and basal cell skin cancers, so the two are not counted on the same basis. The registry's own latest five-year total is 137,000 diagnoses in 2018 to 2022, and Te Aho o Te Kahu projects more than 30,000 in 2025.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in New Zealand",
      aside: { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025", url: SOC_2025 },
      cards: [
        {
          id: "shape",
          title: "137,000 diagnoses in five years, rising to more than 45,000 a year by 2044",
          plain:
            "Te Aho o Te Kahu, the Cancer Control Agency, reports that 137,000 people were diagnosed with cancer in 2018 to 2022 and that 10,566 died of it in 2021. It projects more than 30,000 diagnoses in 2025 and more than 45,000 a year by 2044, mostly because the population is growing and ageing.",
          detail:
            "The 2025 report says the population grew from 4.9 million in 2018 to 5.2 million in 2023, with about 828,600 people aged 65 or over in 2023. Age-standardised cancer death rates have fallen by almost 25% in twenty years while incidence rates fell by only 5%, so the report attributes most of the fall to better survival: five-year net survival for all cancers combined improved by 15% over the period, and between 1998 and 2021 it improved substantially for 18 of the 23 commonest cancers. Lung cancer remains the leading cause of cancer death, and half of cancer deaths come from lung, bowel, prostate, breast and pancreatic cancer. In 2022, 160 children aged 0 to 14 and 170 people aged 15 to 24 were diagnosed with cancer. GLOBOCAN 2024 lists breast, prostate, colorectal, lung cancer and melanoma as the commonest cancers by number.",
          links: [
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, chapter 2 (PDF)", url: SOC_FULL },
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, insights and summary (PDF)", url: SOC_SUMMARY },
            { label: "IARC: GLOBOCAN 2024 fact sheet, New Zealand (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "equity",
          title: "Māori 1.6 times, Pacific peoples 1.4 times as likely to die from cancer",
          plain:
            "Between 2017 and 2021, Māori were 1.6 times and Pacific peoples 1.4 times as likely to die from cancer as people of European or other ethnicity, according to Te Aho o Te Kahu. The agency says these differences run through the whole system, from prevention and screening to treatment.",
          detail:
            "The 2025 report and its media release of 11 December 2025 set out the gap and the agency's aim of closing it. Screening has narrowed part of it: between 2022 and 2024, cervical screening coverage rose by 8 percentage points for wāhine Māori and 15 for Pacific women, and breast screening participation has reached the 70% target for European/other and Pacific women, while rates for Māori are rising more slowly. The cervical elimination plan records that Māori, Pacific peoples and people in areas of high deprivation have higher rates of cervical cancer and poorer outcomes.",
          links: [
            { label: "Te Aho o Te Kahu: media release on the 2025 report (11 December 2025)", url: SOC_MR },
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, insights and summary (PDF)", url: SOC_SUMMARY },
          ],
        },
      ],
      tables: [
        {
          id: "nz-registry",
          title: "What the national figures say",
          caption: "Counts from the New Zealand Cancer Registry and mortality data as reported by Te Aho o Te Kahu in December 2025, with its projections.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "period", label: "Year or period" },
            { key: "value", label: "Number", numeric: true },
          ],
          rows: [
            { measure: "People diagnosed with cancer", period: "2018 to 2022", value: 137000 },
            { measure: "Deaths from cancer", period: "2021", value: 10566 },
            { measure: "Children aged 0 to 14 diagnosed", period: "2022", value: 160 },
            { measure: "People aged 15 to 24 diagnosed", period: "2022", value: 170 },
            { measure: "Projected diagnoses", period: "2025", value: 30000 },
            { measure: "Projected diagnoses a year", period: "2044", value: 45100 },
          ],
          note: "The 137,000 is rounded in the source. The registry excludes squamous and basal cell skin cancers. Projections are the report's, not counts; the 2025 figure is given as 'over 30,000'.",
          sources: [{ label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, chapter 2 (PDF)", url: SOC_FULL }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry under a 1993 law",
      aside: { label: "Health New Zealand: New Zealand Cancer Registry", url: NZCR },
      cards: [
        {
          id: "registry-act",
          title: "Laboratories must report every new cancer",
          plain:
            "The New Zealand Cancer Registry was set up under the Cancer Registry Act 1993, which requires laboratories and other health providers to report new cancers. It counts every new primary cancer except squamous and basal cell skin cancers, and it does not record recurrences. Health New Zealand runs it.",
          detail:
            "Health New Zealand's page says the registry combines four sources: laboratory results, including biopsies, from hospital and community laboratories; cancer diagnoses from the National Minimum Dataset of public and private hospital discharges; information from radiation oncology providers; and the underlying cause of death from the National Mortality Collection. Cancers are coded to international standards for site, type and stage. The Act gives the registry's purposes as information on cancer incidence and mortality and a basis for survival studies and research; the page lists uses including monitoring cancer services and screening programmes. A public web tool gives counts by cancer, year and group.",
          links: [
            { label: "Health New Zealand: New Zealand Cancer Registry", url: NZCR },
            { label: "Cancer Registry Act 1993 (New Zealand Legislation)", url: "https://www.legislation.govt.nz/act/public/1993/102/en/latest/" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: public hospitals and Pharmac",
      aside: { label: "Pharmac: about Pharmac", url: PHARMAC },
      cards: [
        {
          id: "pharmac",
          title: "One agency decides which medicines are funded, and the law holds it to its budget",
          plain:
            "Public hospital cancer care in New Zealand is run by Health New Zealand. Which medicines the public system pays for is decided by Pharmac, a government agency that must stay within a fixed budget. A medicine can be approved for sale by Medsafe and still not be publicly funded.",
          detail:
            "Pharmac describes itself as the agency that decides which medicines and related products are funded in New Zealand and says the law requires it to stay within its budget; its Pharmaceutical Schedule lists the funded medicines for the community and for hospitals. In 2022 Te Aho o Te Kahu compared funded cancer medicines with Australia's and found 20 medicines for solid tumours that would give substantial clinical benefit if funded in New Zealand, three of them used with the intention of cure; a 2024 follow-up found 12 such medicines for blood cancers. The World Bank's latest figure puts out-of-pocket spending at 12.7% of current health expenditure in 2024.",
          links: [
            { label: "Pharmac: about Pharmac", url: PHARMAC },
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, chapter on systemic therapy (PDF)", url: SOC_FULL },
            { label: "World Bank: out-of-pocket expenditure, New Zealand (API)", url: WB_OOP },
          ],
        },
        {
          id: "funding-2024",
          title: "A $604 million budget increase funded 33 new cancer medicines",
          plain:
            "In June 2024 the Government announced a $604 million increase to Pharmac's medicines budget over four years. By May 2025 Pharmac had funded 33 new cancer medicines as a result, for solid tumours and blood cancers, expected to help about 2,350 people in the first year.",
          detail:
            "Te Aho o Te Kahu's 2025 report records the increase to the Combined Pharmaceutical Budget, the extra funding Health New Zealand received to put the new medicines into use, and the 33 cancer medicines funded by May 2025. It notes that medical oncologists are under strain from the resulting demand, and that biomarker testing will be needed for some of the new medicines.",
          links: [{ label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, page 109 (PDF)", url: SOC_FULL }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and funding are two decisions",
      aside: { label: "Medsafe: about Medsafe", url: MEDSAFE },
      cards: [
        {
          id: "medsafe",
          title: "Medsafe approves, Pharmac funds",
          plain:
            "Medsafe, a business unit of the Ministry of Health, is the authority that regulates medicines in New Zealand. Its approval allows a medicine to be sold. Whether the public system pays for it is a separate decision by Pharmac, so a newly approved cancer medicine may be available only to people who pay for it privately.",
          detail:
            "Medsafe's own page describes it as the New Zealand Medicines and Medical Devices Safety Authority, a business unit of the Ministry of Health and the authority responsible for the regulation of therapeutic products. OnCo did not read Medsafe's guidance on its evaluation routes or timelines for this page; see the gaps.",
          links: [
            { label: "Medsafe: about Medsafe", url: MEDSAFE },
            { label: "Pharmac: about Pharmac", url: PHARMAC },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Te Aho o Te Kahu: Cervical Cancer Elimination Plan 2026 to 2040", url: CX_PLAN },
      cards: [
        {
          id: "screening-programmes",
          title: "Three national programmes, HPV self-testing, and bowel screening from 58",
          plain:
            "New Zealand runs national breast, cervical and bowel screening. Cervical screening now uses an HPV test, with the option of taking it yourself. More than 310,000 people were screened between September 2023 and the end of 2024, and the report says 81% of them chose the new HPV screening. Bowel screening starts at 58 from October 2025, down from 60.",
          detail:
            "Te Aho o Te Kahu's 2025 report says breast screening is being extended to people aged 70 to 74, supported by a new invitation and booking platform, Te Puna; that planning is under way to lower the bowel screening age further; and that a lung cancer screening programme is being proposed. Between 2020 and 2024 the number of people invited to bowel screening rose by 500,000 and the number who completed it by 280,000. The report also notes early-onset bowel cancer rising in people under 50.",
          links: [
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, insights and summary (PDF)", url: SOC_SUMMARY },
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025, screening chapter (PDF)", url: SOC_FULL },
          ],
        },
        {
          id: "hpv",
          title: "A plan to eliminate cervical cancer by 2040",
          plain:
            "On 1 September 2026 the Government launched the New Zealand Cervical Cancer Elimination Plan 2026 to 2040. About 179 people are diagnosed with cervical cancer each year and about 52 die. The plan aims for 90% of young people to have at least one dose of HPV vaccine by age 15 by 2035.",
          detail:
            "The plan defines elimination as fewer than four cases per 100,000 women a year and also sets a target of 80% of people receiving colposcopy within 30 working days by 2030. It says young adults, Māori, Pacific peoples and people in areas of high deprivation have lower vaccination rates. The 2025 State of Cancer report says HPV vaccine has been free for everyone aged 9 to 26 since 2017. WHO's estimate of HPV vaccine coverage among girls in the primary target cohort was 70% in 2025, after 53% in 2024 and 70% in 2022 and 2023.",
          links: [
            { label: "Te Aho o Te Kahu: Cervical Cancer Elimination Plan 2026 to 2040", url: CX_PLAN },
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025 (full report, PDF)", url: SOC_FULL },
            { label: "WHO Global Health Observatory: HPV coverage, New Zealand (API)", url: WHO_HPV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What New Zealand does",
      title: "What New Zealand does differently",
      cards: [
        {
          id: "measure-gaps",
          title: "A cancer agency that reports on the system, and on who it fails",
          plain:
            "New Zealand has a dedicated agency, Te Aho o Te Kahu, that publishes a five-yearly report on how the whole cancer system is performing, monitoring reports by cancer, and comparisons of funded medicines with Australia's. Each breaks results down by ethnicity, so differences for Māori and Pacific peoples are measured rather than assumed.",
          detail:
            "The 2025 report covers prevention, screening, diagnosis, treatment, survivorship and palliative care, and the workforce, infrastructure, data and research behind them. It records shorter radiotherapy courses (in 2018 every breast cancer radiotherapy course had at least 15 sessions; in 2023 half had fewer than 15), regional waits for radiation oncology that were longer in Canterbury than elsewhere, ten ageing linear accelerators replaced in public hospitals over five years, and new machines planned for Counties Manukau, Nelson Marlborough and Canterbury. The report says its findings informed the development of the New Zealand Cancer Action Plan 2026 to 2029.",
          links: [
            { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025 (full report, PDF)", url: SOC_FULL },
            { label: "Te Aho o Te Kahu: media release on the 2025 report (11 December 2025)", url: SOC_MR },
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
          id: "trials-research",
          title: "229 trials in OnCo's records have a site in New Zealand",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, 229 cancer trials in our records list a site in New Zealand and 55 were recruiting. None runs only in New Zealand: most are international trials, and 217 of the 229 also have sites in Australia.",
          detail:
            "Among the recruiting trials are studies sponsored by Merck Sharp & Dohme, Roche, BeOne Medicines and Bristol-Myers Squibb. OnCo also holds records for the Australian and New Zealand trial groups that run academic cancer trials in both countries, such as ANZGOG for gynaecological cancers and the Australasian Leukaemia and Lymphoma Group, and for New Zealand companies including Pacific Edge. OnCo's participation data cover 5,899 trials, mostly large trials of new medicines, so this is not a count of all research in New Zealand.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in New Zealand (search)", url: CTGOV },
            { label: "Open trials on OnCo", url: "/trials/open/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unread-sources",
      title: "Sources not reached or not read",
      plain:
        "OnCo did not read Medsafe's guidance on its approval routes and timelines, Health New Zealand's cancer web tool (which works only in a browser), or the IAEA directory of radiotherapy centres. Counts of new cancers by cancer type for the latest year are therefore not given from the registry here.",
      detail:
        "The registry's web tool and the agency's online dashboard are interactive and return no figures to a plain request. Te Aho o Te Kahu's report says workforce requirements have not been quantified except for radiation oncologists, so no official count of oncologists is given. OnCo's web search budget was spent during this round, so pages had to be reached by known addresses, and some Health New Zealand addresses returned an empty page.",
      links: [
        { label: "Health New Zealand: cancer data and statistics", url: "https://www.healthnz.govt.nz/about-us/health-data/data-sets-and-collections/cancer-data-and-statistics" },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: [
    "te-aho-o-te-kahu", "health-new-zealand", "nz-cancer-registry", "pharmac-nz", "medsafe-nz", "auckland-city-hospital", "starship-blood-cancer-centre",
    "cancer-society-new-zealand", "psychosocial-oncology-new-zealand",
  ],
  companies: ["pacific-edge", "volpara-health", "anzgog", "allg", "trog", "agitg", "breast-cancer-trials"],
  drugs: [],
  trials: ["nct06863272", "nct06961006", "nct06427941", "nct07266428", "nct06072781", "nct06163430", "nct06793215"],
  papers: [],
  people: ["dale-bramley"],
  how:
    "Every card was written from New Zealand's own sources, read in full rather than through a summary: Te Aho o Te Kahu's The State of Cancer in New Zealand 2025 and its summary, its media release and its page on the cervical elimination plan; Health New Zealand's registry page; and Pharmac's and Medsafe's own pages. International figures come from IARC's GLOBOCAN 2024 fact sheet, WHO's Global Health Observatory and the World Bank. Trials were counted from OnCo's ClinicalTrials.gov participation data. The five new records (Te Aho o Te Kahu, Health New Zealand, the registry, Pharmac and Medsafe) carry their own sources.",
  verify:
    "Pharmac funding decisions, screening ages and hospital waiting times change; check Pharmac's Schedule for whether a medicine is funded, and ask your treatment team or the Cancer Society about travel and accommodation support.",
  verifyLinks: [
    { label: "Pharmac", url: "https://pharmac.govt.nz" },
    { label: "Te Aho o Te Kahu, Cancer Control Agency", url: "https://teaho.govt.nz" },
    { label: "Health New Zealand", url: "https://www.healthnz.govt.nz" },
  ],
};
