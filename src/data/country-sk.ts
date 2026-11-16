import type { CountryDive } from "@/data/country-dive";

/**
 * Slovakia deep dive: the hand-written cards for /countries/sk/ (wave 9). Every figure was read from the raw text of its
 * source, in Slovak, on 11 November 2026: the National Health Information Centre's pages on the National Cancer Registry,
 * on expected cancer counts and on oncology service statistics, the Ministry of Health's categorisation page, the Health
 * Care Surveillance Authority's page on the insurers, the National Oncology Institute's statute and programme pages, the
 * OnkoKontrola screening site, the EMA's page on authorisation, IARC's GLOBOCAN 2024 fact sheet (PDF text), WHO's Global
 * Health Observatory API, the World Bank's health expenditure API and OnCo's ClinicalTrials.gov participation data.
 * The National Health Information Centre's data server (data.nczisk.sk) did not answer, so its report on expected
 * counts could not be read; that and other gaps are named under `gaps`.
 */
const NCZI_NOR = "https://www.nczisk.sk/Statisticke_vystupy/Tematicke_statisticke_vystupy/Onkologia/Incidencia_registrovanych_nadorovych_ochoreni_NOR_SR/Pages/default.aspx";
const NCZI_EXPECTED = "https://www.nczisk.sk/Statisticke_vystupy/Tematicke_statisticke_vystupy/Onkologia/Vyskyt_zhubnych_nadorov_SR/Pages/default.aspx";
const NCZI_EXPECTED_PDF = "https://data.nczisk.sk/statisticke_vystupy/Onkologia/Vyskyt_zhubnych_nadorov_v_SR_vratane_ocakavanych_pripadov_1996_2025_Sprava.pdf";
const NCZI_RT = "https://www.nczisk.sk/Statisticke_vystupy/Tematicke_statisticke_vystupy/Onkologia/Nuklearna_medicina_klinicka_radiacna_onkologia/Pages/default.aspx";
const MZ_KAT = "https://www.health.gov.sk/odbornik/kategorizacia-a-cenotvorba/kategorizacia-liekov/";
const UDZS = "https://www.udzs-sk.sk/zdravotne-poistovne/";
const NOI_STATUT = "https://www.noisk.sk/o-nas/poslanie";
const NOI_NOP = "https://www.noisk.sk/o-nas/narodny-onkologicky-program";
const ONKO = "https://www.onkokontrola.sk/";
const ONKO_CRC = "https://www.onkokontrola.sk/skrining-kolorektalneho-karcinomu";
const EMA_AUTH = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/703-slovakia-fact-sheet.pdf";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'SVK'";
const WB_OOP = "https://api.worldbank.org/v2/country/SVK/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Slovakia&cond=cancer";

export const SK_DIVE: CountryDive = {
  iso2: "SK",
  iso3: "SVK",
  name: "Slovakia",
  flag: "🇸🇰",
  asOf: "2026-11-11",
  title: "Cancer in Slovakia",
  description:
    "Cancer in Slovakia from Slovak sources: IARC's estimate of 31,384 new cancers and 15,341 deaths in 2024, a national cancer registry whose confirmed counts stop at 2016 and expected counts from insurers' claims since, three public health insurers, drug categorisation with a required pharmacoeconomic analysis, the National Oncology Programme for 2026 to 2030, OnkoKontrola screening, and 110 trials in our records with a site in Slovakia.",
  lede:
    "IARC estimates 31,384 new cancers and 15,341 cancer deaths in Slovakia in 2024, with bowel cancer first among both. Slovakia's own cancer registry has confirmed counts only up to 2016; for later years the National Health Information Centre publishes expected counts worked out from what health insurers paid for.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Slovakia is 31,384 new cancers and 15,341 deaths, an age-standardised incidence of 286.1 per 100,000 and mortality of 121.9. IARC's fact sheet names sub-national registries as its incidence source and its method as national mortality estimates applied to modelled mortality-to-incidence ratios from registry data; mortality comes from WHO national data projected to 2024. That is consistent with the national registry's own position: its confirmed counts reach 2016, and the National Health Information Centre's figures for 2017 to 2025 are expected counts estimated from insurers' data and death records rather than registrations. The IARC figure includes non-melanoma skin cancer.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Slovakia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Slovakia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 31,000 new cancers a year; bowel cancer leads in cases and deaths",
          plain:
            "IARC estimates 31,384 new cancers in Slovakia in 2024, 16,741 in men and 14,643 in women, and 15,341 deaths. Colorectal cancer is the commonest cancer and the commonest cause of cancer death, ahead of breast, prostate and lung cancer for cases and lung cancer for deaths.",
          detail:
            "GLOBOCAN 2024 gives colorectal cancer 4,402 new cases and 2,360 deaths, breast 3,803 cases and 1,171 deaths, prostate 3,335 cases, lung 2,677 cases and 2,272 deaths, and pancreatic cancer 1,024 deaths. Age-standardised incidence is 332.7 per 100,000 in men and 258.2 in women, and mortality 161.7 in men and 93.0 in women. The OnkoKontrola screening site, whose partners include the Ministry of Health, says more than 3,000 new breast cancers are registered in Slovakia each year.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Slovakia (PDF)", url: IARC_FACTSHEET },
            { label: "OnkoKontrola: breast screening", url: "https://www.onkokontrola.sk/skrining-rakoviny-prsnika" },
          ],
        },
      ],
      tables: [
        {
          id: "sk-registry",
          title: "What Slovakia's national sources publish, and for which years",
          caption: "The kinds of national cancer figures the National Health Information Centre publishes, as described on its pages on 11 November 2026.",
          columns: [
            { key: "series", label: "Series" },
            { key: "years", label: "Years" },
            { key: "basis", label: "Basis" },
          ],
          rows: [
            { series: "National Cancer Registry: incidence, mortality and survival infographics", years: "1978 to 2016", basis: "Confirmed registrations" },
            { series: "Occurrence of cancer including expected cases", years: "1996 to 2016", basis: "Confirmed registry counts" },
            { series: "Occurrence of cancer including expected cases", years: "2017 to 2025", basis: "Expected counts from insurers' reimbursed care and death records" },
            { series: "Clinical and radiation oncology activity", years: "2013 to 2024", basis: "Annual service returns" },
          ],
          note: "The counts themselves are in an interactive infographic and a PDF report on data.nczisk.sk, which did not answer on 11 November 2026; see the gaps. The expected-count series was last updated on 29 October 2026.",
          sources: [
            { label: "NCZI: incidence of registered cancers from the National Cancer Registry", url: NCZI_NOR },
            { label: "NCZI: occurrence of cancer including expected cases", url: NCZI_EXPECTED },
            { label: "NCZI: nuclear medicine, clinical and radiation oncology", url: NCZI_RT },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry with a gap after 2016",
      aside: { label: "NCZI: occurrence of cancer including expected cases", url: NCZI_EXPECTED },
      cards: [
        {
          id: "registry-expected",
          title: "Confirmed counts to 2016, estimates from insurance claims since",
          plain:
            "Slovakia's National Cancer Registry, kept by the National Health Information Centre, has published confirmed data from 1978 to 2016. For 2017 to 2025 the centre publishes expected numbers of new cancers, calculated from the care health insurers paid for and from death records, using an algorithm it documents separately.",
          detail:
            "The centre's page names its data sources as the registry, insurers' data on reimbursed care sent to it under the health insurance and national health information system laws, and the Statistical Office's death records. The series also shows one-, three- and five-year survival, cancers in the screening programmes and deaths, by region. The registry's infographics show quality measures such as the share of cases known only from a death certificate and the share microscopically confirmed. OnCo could not read the counts themselves because the centre's data server did not respond.",
          links: [
            { label: "NCZI: occurrence of cancer including expected cases", url: NCZI_EXPECTED },
            { label: "NCZI: incidence of registered cancers from the National Cancer Registry", url: NCZI_NOR },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: three insurers and categorisation",
      aside: { label: "MZ SR: kategorizácia liekov", url: MZ_KAT },
      cards: [
        {
          id: "categorisation",
          title: "A medicine is paid for once the Ministry categorises it, after a pharmacoeconomic analysis",
          plain:
            "Public health insurance in Slovakia is run by three insurers: Všeobecná zdravotná poisťovňa, Dôvera and Union. Which medicines they pay for is decided by the Ministry of Health through categorisation, and a company applying must submit a pharmacoeconomic analysis.",
          detail:
            "The Ministry's categorisation page publishes the list of categorised medicines and the template and methodological guide for the pharmacoeconomic analysis required under Ministry Decree 422/2011, both dated 1 August 2024, and has a route for submissions by patient organisations. The Health Care Surveillance Authority's page names the three insurers. The World Bank's latest figure puts out-of-pocket spending at 20.2% of Slovakia's current health expenditure in 2023. OnCo did not read the rules for reimbursing a medicine that is not categorised, which an insurer can approve case by case; see the gaps.",
          links: [
            { label: "MZ SR: kategorizácia liekov", url: MZ_KAT },
            { label: "ÚDZS: the three health insurers", url: UDZS },
            { label: "World Bank: out-of-pocket expenditure, Slovakia (API)", url: WB_OOP },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "How a cancer medicine is approved",
      aside: { label: "EMA: authorisation of medicines", url: EMA_AUTH },
      cards: [
        {
          id: "ema-sukl",
          title: "New cancer medicines come through the EU; ŠÚKL regulates nationally",
          plain:
            "As an EU member, Slovakia receives new cancer medicines through the European Medicines Agency's centralised procedure, which is compulsory for medicines with a new active substance for cancer and gives one authorisation valid in every member state. The State Institute for Drug Control (ŠÚKL) is the national regulator.",
          detail:
            "The EMA's page says the European Commission issues a binding decision within 67 days of the agency's recommendation, valid in all EU member states and in Iceland, Liechtenstein and Norway. Authorisation is not reimbursement: in Slovakia a medicine reaches patients through public insurance once the Ministry categorises it. ŠÚKL's pages for this round showed only its menus, so its own description is not quoted.",
          links: [
            { label: "EMA: authorisation of medicines", url: EMA_AUTH },
            { label: "ŠÚKL: State Institute for Drug Control", url: "https://www.sukl.sk" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "OnkoKontrola", url: ONKO },
      cards: [
        {
          id: "onkokontrola",
          title: "Breast screening from 45, cervical from 23, bowel from 50 to 75",
          plain:
            "Slovakia's screening programmes are explained to the public on OnkoKontrola. Women aged 45 to 74 are offered screening mammography; women from 23 are advised to see a gynaecologist regularly for cervical checks; and men and women aged 50 to 75 can choose a stool test for hidden blood or a screening colonoscopy.",
          detail:
            "The site says people are invited by their health insurer or their doctor and can also book themselves. Its partners include the Ministry of Health, all three health insurers, the National Oncology Institute, the League Against Cancer and patient groups. WHO's 2021 country capacity survey records cytology as the main cervical screening method. WHO's estimate of HPV vaccine coverage among girls in the primary target cohort was 33% in 2022, 44% in 2023 and 36% in 2024 and 2025.",
          links: [
            { label: "OnkoKontrola", url: ONKO },
            { label: "OnkoKontrola: bowel screening", url: ONKO_CRC },
            { label: "WHO Global Health Observatory: HPV coverage, Slovakia (API)", url: WHO_HPV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Slovakia does",
      title: "What Slovakia does differently",
      cards: [
        {
          id: "noi",
          title: "A national oncology institute to run the cancer programme",
          plain:
            "Slovakia set up a National Oncology Institute within the National Cancer Institute in Bratislava on 1 August 2018 to coordinate its National Oncology Programme. It publishes the programme for 2026 to 2030, lists of cancer medicines, treatment recommendations and a register of clinical trials.",
          detail:
            "The institute's statute names its areas as coordinating cancer infrastructure, prevention, diagnosis and treatment, research and education, and the processing and interpretation of cancer data. Its programme page says the National Oncology Programme aims to reduce the number of new cancers and deaths and improve patients' quality of life through evidence-based prevention, early diagnosis, treatment, rehabilitation, supportive and end-of-life care and research, and it publishes yearly accounts of the programme's action plans. It works with Gustave Roussy and IARC and takes part in EU joint actions on cancer.",
          links: [
            { label: "NOI: mission and statute", url: NOI_STATUT },
            { label: "NOI: National Oncology Programme", url: NOI_NOP },
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
          title: "110 trials in OnCo's records have a site in Slovakia",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, 110 cancer trials in our records list a site in Slovakia and 24 were recruiting. None runs only in Slovakia: they are international trials, mostly sponsored by drug companies.",
          detail:
            "The recruiting trials include studies sponsored by Pfizer, Merck Sharp & Dohme, Loxo Oncology, Bayer, Novartis and AstraZeneca, and an academic lymphoma trial led from University College London. The National Oncology Institute keeps its own register of clinical trials in Slovakia. OnCo's participation data cover 5,899 trials, mostly large trials of new medicines, so this is not a count of all research in Slovakia.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Slovakia (search)", url: CTGOV },
            { label: "Open trials on OnCo", url: "/trials/open/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "nczi-data",
      title: "The registry's counts could not be read",
      plain:
        "The National Health Information Centre publishes its cancer counts on a separate data server, data.nczisk.sk, which did not respond to repeated requests on 11 November 2026 and has no Internet Archive copy. So this page gives no national registry or expected count for any year, and no national radiotherapy figures.",
      detail:
        "The report on expected cancer cases for 1996 to 2025 and its methodology, the radiation oncology datasets for 2013 to 2024 and the annual oncology activity reports are all hosted on that server. When it answers, they will give the national counts by cancer and region and the number of patients treated with radiotherapy. The IAEA's directory of radiotherapy centres works only in a browser.",
      links: [
        { label: "NCZI: report on cancer including expected cases, 1996 to 2025 (PDF)", url: NCZI_EXPECTED_PDF },
        { label: "NCZI: nuclear medicine, clinical and radiation oncology", url: NCZI_RT },
      ],
    },
    {
      id: "unread-sources",
      title: "Other sources not read",
      plain:
        "OnCo did not read the rules for insurers' exceptional approval of uncategorised medicines (the insurer page returned an error), ŠÚKL's own description of its role, or the National Oncology Programme 2026 to 2030 document itself.",
      detail:
        "The Všeobecná zdravotná poisťovňa page on exceptions returned HTTP 502. OnCo's web search budget was spent during this round, so pages had to be reached by known addresses. WHO's 2021 country capacity survey records 'no response' for Slovakia on radiotherapy, chemotherapy and pathology availability, so it cannot fill the gap.",
      links: [
        { label: "NOI: National Oncology Programme", url: NOI_NOP },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["nczi-slovakia", "ministry-of-health-slovakia", "national-cancer-institute-slovakia", "biomedical-research-center-sas", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: ["nct06588478", "nct06136650", "nct06989437", "nct06452277", "nct05939414", "radar-hodgkin", "nct06467357", "telimet-nsclc-01"],
  papers: [],
  people: ["miroslav-chovanec"],
  how:
    "Every card was written from Slovak sources read in Slovak, in full rather than through a summary: the National Health Information Centre's registry and statistics pages, the Ministry of Health's categorisation page, the Health Care Surveillance Authority's insurer page, the National Oncology Institute's pages, and the OnkoKontrola screening site. The EU route is from the EMA's own page. International figures come from IARC's GLOBOCAN 2024 fact sheet, WHO's Global Health Observatory and the World Bank. Trials were counted from OnCo's ClinicalTrials.gov participation data. The three new records (the National Health Information Centre, the Ministry and the National Cancer Institute) carry their own sources.",
  verify:
    "Whether a medicine is categorised, and at what co-payment, changes with each categorisation list; ask your oncologist or your health insurer. Screening invitations come from your insurer or your doctor, and you can book yourself through OnkoKontrola.",
  verifyLinks: [
    { label: "Ministry of Health: categorisation of medicines", url: MZ_KAT },
    { label: "OnkoKontrola", url: ONKO },
    { label: "National Oncology Institute", url: "https://www.noisk.sk" },
  ],
};
