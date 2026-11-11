import type { CountryDive } from "@/data/country-dive";

/**
 * Croatia deep dive: the hand-written cards for /countries/hr/ (wave 9). Every figure was read from the raw text of its
 * source, in Croatian, on 11 November 2026: the Croatian Institute of Public Health's pages on cancer incidence in 2022
 * and 2023 and on the report Rak u Hrvatskoj 2023./2024., its page on the national early detection programmes, the
 * Croatian Health Insurance Fund's page on the right to medicines, the EMA's page on authorisation, the Europe PMC
 * record and abstract of the paper describing the national lung screening programme, IARC's GLOBOCAN 2024 fact sheet
 * (PDF text), WHO's Global Health Observatory API, the World Bank's health expenditure API and OnCo's own
 * ClinicalTrials.gov participation data. Where a figure could not be read it is named under `gaps`.
 */
const HZJZ_2023 = "https://www.hzjz.hr/aktualnosti/incidencija-raka-u-hrvatskoj-u-2023-godini/";
const HZJZ_2022 = "https://www.hzjz.hr/aktualnosti/incidencija-raka-u-hrvatskoj-u-2022-godini/";
const HZJZ_REPORT = "https://www.hzjz.hr/aktualnosti/rak-u-hrvatskoj-2023-2024/";
const HZJZ_BILTEN = "https://www.hzjz.hr/wp-content/uploads/2026/02/Bilten-2023.pdf";
const HZJZ_SCREEN = "https://www.hzjz.hr/sluzba-epidemiologija-prevencija-nezaraznih-bolesti/nacionalni-programi-ranog-otkrivanja-raka/";
const HZZO_LIJEKOVI = "https://hzzo.hr/zdravstvena-zastita/lijekovi/pravo-na-koristenje-lijekova";
const EMA_AUTH = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const LUNG_PAPER = "https://doi.org/10.1007/s00330-025-12185-w";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/191-croatia-fact-sheet.pdf";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'HRV'";
const WB_OOP = "https://api.worldbank.org/v2/country/HRV/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Croatia&cond=cancer";

export const HR_DIVE: CountryDive = {
  iso2: "HR",
  iso3: "HRV",
  name: "Croatia",
  flag: "🇭🇷",
  asOf: "2026-11-11",
  title: "Cancer in Croatia",
  description:
    "Cancer in Croatia from Croatian sources: a national registry counting cancer since 1959 that recorded 26,736 new cancers in 2023, more than 13,000 cancer deaths a year, compulsory insurance through HZZO and its medicines lists, national screening for breast, bowel and cervical cancer, a national low-dose CT lung screening programme since 2020, and 45 trials in our records with a site in Croatia.",
  lede:
    "Croatia's national cancer registry recorded 26,736 new cancers in 2023. The Croatian Institute of Public Health counts more than 13,000 cancer deaths a year and names cancer the leading cause of premature death. Croatia also runs a national lung cancer screening programme with low-dose CT, which its designers describe as the first in the European Union.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Croatia is 26,955 new cancers and 13,573 deaths, an age-standardised incidence of 311.8 per 100,000 and mortality of 123.4. IARC's fact sheet names the national registry as its incidence source and WHO national mortality data as its mortality source, both projected to 2024 from recent trends. The registry's own count for 2023 is 26,736 new cancers excluding non-melanoma skin cancer, while GLOBOCAN's all-cancers figure includes it, so the two are close but not counted on the same basis. The registry age-standardises to Croatia's 2011 census population, not the world standard IARC uses, so its rates and IARC's cannot be compared directly.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Croatia",
      aside: { label: "HZJZ: Incidencija raka u Hrvatskoj u 2023. godini", url: HZJZ_2023 },
      cards: [
        {
          id: "shape",
          title: "26,736 new cancers in 2023, more than a third before 65",
          plain:
            "The Croatian National Cancer Registry recorded 26,736 new cancers in 2023, 14,239 in men and 12,497 in women, not counting non-melanoma skin cancer. Prostate, lung and bowel cancer were the commonest in men; breast, bowel and lung cancer in women. Thirty-seven per cent were diagnosed before age 65.",
          detail:
            "The Croatian Institute of Public Health's page for 2023 gives prostate cancer 2,927 cases (21% of cancers in men), lung 2,388 (17%), colorectal 2,262 (16%), bladder 753 and kidney 662; in women breast 3,293 (26%), colorectal 1,558 (12%), lung 1,306 (10%), uterine body 850 and thyroid 659. The crude incidence was 692.7 per 100,000 (761.7 in men, 627.9 in women), and new diagnoses returned to pre-pandemic levels. Age-standardised incidence was highest in men in Međimurje, Varaždin and Zagreb counties and in women in Karlovac county, the City of Zagreb and Varaždin county. The institute's February 2026 report says more than 26,000 cancers are diagnosed and more than 13,000 people die of cancer each year, and that survival is gradually improving.",
          links: [
            { label: "HZJZ: Incidencija raka u Hrvatskoj u 2023. godini", url: HZJZ_2023 },
            { label: "HZJZ: Rak u Hrvatskoj 2023./2024.", url: HZJZ_REPORT },
          ],
        },
      ],
      tables: [
        {
          id: "hr-registry",
          title: "What the Croatian National Cancer Registry counted",
          caption: "New cancers (ICD-10 C00 to C97, excluding non-melanoma skin cancer C44), as published by the Croatian Institute of Public Health.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
          ],
          rows: [
            { year: "2022", cases: 26105, men: null, women: null },
            { year: "2023", cases: 26736, men: 14239, women: 12497 },
          ],
          note: "The registry is a dynamic database, so later reports can revise a year's count slightly. Deaths are not in this table: the institute gives 'more than 13,000' a year, and its full report holds the counts by cancer.",
          sources: [
            { label: "HZJZ: Incidencija raka u Hrvatskoj u 2022. godini", url: HZJZ_2022 },
            { label: "HZJZ: Incidencija raka u Hrvatskoj u 2023. godini", url: HZJZ_2023 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry since 1959",
      aside: { label: "HZJZ: Rak u Hrvatskoj 2023./2024. (PDF)", url: HZJZ_BILTEN },
      cards: [
        {
          id: "registry-history",
          title: "Counting since 1959, and now reporting survival and prevalence",
          plain:
            "The cancer registry at the Croatian Institute of Public Health has operated since 1959 and produced its first report for 1968. Since 2015 it has been part of the National Public Health Information System. Its February 2026 report added survival and prevalence to incidence and mortality for the first time.",
          detail:
            "The institute explains that population-based registries in most European countries publish 18 to 24 months after the year they cover, because collecting and checking the data is complex, and that its database is updated continuously, so counts published in trend tables may differ slightly from the annual report. The 2023/2024 report shows stage at diagnosis by summary stage (localised, regional, distant), five-year net survival for people diagnosed in 2019 to 2023 against 2014 to 2018 (59% for all cancers excluding non-melanoma skin cancer, against 54.9%, and 44% in the early 2000s), and prevalence on 31 December 2023. Incidence and mortality for 2001 to 2022 are also published through the European Cancer Information System.",
          links: [
            { label: "HZJZ: Incidencija raka u Hrvatskoj u 2023. godini", url: HZJZ_2023 },
            { label: "HZJZ: Rak u Hrvatskoj 2023./2024. (PDF)", url: HZJZ_BILTEN },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: compulsory insurance and the medicines lists",
      aside: { label: "HZZO: Pravo na korištenje lijekova", url: HZZO_LIJEKOVI },
      cards: [
        {
          id: "hzzo-lists",
          title: "Medicines on HZZO's lists are covered; a hospital committee can approve others",
          plain:
            "Croatia's compulsory health insurer, HZZO, covers the medicines on its Basic List in full and those on its Supplementary List with a patient co-payment. If a patient cannot be treated with listed medicines for medical reasons, the treating hospital's medicines committee can approve another, on a specialist's proposal, and the hospital pays for it from its own budget.",
          detail:
            "HZZO's page on the right to medicines sets out the two lists: medicines on the Basic List (Osnovna lista lijekova) are paid in full by compulsory insurance, while for those on the Supplementary List (Dopunska lista lijekova) the patient pays a share, directly or through supplementary insurance. It also sets out the exception: an unlisted medicine, or a listed one used outside the indications on the list, can be given if the hospital's medicines committee approves it, at the cost of the hospital, which must then obtain it. The World Bank's latest figure puts out-of-pocket spending at 9.4% of Croatia's current health expenditure in 2023.",
          links: [
            { label: "HZZO: Pravo na korištenje lijekova", url: HZZO_LIJEKOVI },
            { label: "World Bank: out-of-pocket expenditure, Croatia (API)", url: WB_OOP },
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
          id: "ema-halmed",
          title: "New cancer medicines come through the EU; HALMED regulates nationally",
          plain:
            "As an EU member, Croatia receives new cancer medicines through the European Medicines Agency's centralised procedure, which is compulsory for medicines with a new active substance for cancer and gives one authorisation valid in every member state. HALMED, Croatia's own agency, handles national authorisations, inspection and safety monitoring.",
          detail:
            "The EMA's page says the European Commission issues a legally binding decision within 67 days of the agency's recommendation and that the authorisation is valid in all EU member states and in Iceland, Liechtenstein and Norway. Authorisation does not decide payment: in Croatia that depends on HZZO placing the medicine on its lists, or on a hospital committee's exception. OnCo did not read HALMED's or HZZO's rules and timelines for adding a medicine to the lists; see the gaps.",
          links: [
            { label: "EMA: authorisation of medicines", url: EMA_AUTH },
            { label: "HALMED: about HALMED", url: "https://www.halmed.hr/O-HALMED-u/" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "HZJZ: Nacionalni programi ranog otkrivanja raka", url: HZJZ_SCREEN },
      cards: [
        {
          id: "screening-programmes",
          title: "Breast screening since 2006, bowel since 2007, cervical since 2010",
          plain:
            "The Croatian Government adopted a national breast cancer early detection programme in June 2006, a colorectal programme in 2007 and a cervical programme in July 2010, following the European Commission's 2003 recommendation on screening. The Croatian Institute of Public Health publishes the programmes' information.",
          detail:
            "The institute's page says the aim of the programmes is to find cancer early, to find and remove precancerous lesions, and so reduce illness and death over time. WHO's 2021 country capacity survey records cytology as the main cervical screening method. WHO's estimate of HPV vaccine coverage among girls in the primary target cohort rose from 3% in 2016 to 47% in 2021 and was 53% in 2024 and 2025.",
          links: [
            { label: "HZJZ: Nacionalni programi ranog otkrivanja raka", url: HZJZ_SCREEN },
            { label: "WHO Global Health Observatory: HPV coverage, Croatia (API)", url: WHO_HPV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Croatia does",
      title: "What Croatia does differently",
      cards: [
        {
          id: "lung-screening",
          title: "A national lung cancer screening programme, fully reimbursed",
          plain:
            "Croatia's Ministry of Health set up a national lung cancer screening programme with low-dose CT, fully reimbursed, in which family doctors identify and refer people at high risk. From October 2020 to August 2025 more than 50,000 people were screened with more than 70,000 scans, and 4.5% had a result that needed follow-up.",
          detail:
            "The programme's design paper (Samaržija and colleagues, European Radiology, 2026) describes modified I-ELCAP criteria for managing nodules, volume measurement by artificial intelligence, full digitalisation, smoking cessation and nationwide deployment. It says Croatia recorded more than 3,300 new lung cancers and more than 2,800 lung cancer deaths in 2021. Of those screened, 54% were men and the average age was 62. The authors write that no other EU country had implemented a national programme.",
          links: [
            { label: "Samaržija et al., the Croatian model of national lung cancer screening (European Radiology 2026)", url: LUNG_PAPER },
            { label: "Lung cancer screening programme in Croatia on OnCo", url: "/terms/screening-hr-lung/" },
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
          title: "45 trials in OnCo's records have a site in Croatia",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, 45 cancer trials in our records list a site in Croatia and 9 were recruiting. None runs only in Croatia: they are international trials, mostly sponsored by drug companies.",
          detail:
            "The recruiting trials include studies sponsored by Merck Sharp & Dohme, Mirati Therapeutics, Johnson & Johnson and Pfizer. OnCo's participation data cover 5,899 trials, mostly large trials of new medicines, so this is not a count of all cancer research in Croatia; the ClinicalTrials.gov search linked here shows more.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Croatia (search)", url: CTGOV },
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
        "OnCo did not read the National Strategic Framework against Cancer to 2030 (the Ministry of Health's page returned not found), HALMED's procedures and timelines, HZZO's rules for adding a medicine to its lists, or a count of radiotherapy machines and oncologists. Survival by cancer is in the institute's report but was not extracted here.",
      detail:
        "The Ministry of Health's address for the strategic framework returned HTTP 404 on 11 November 2026. HALMED's 'about' page returned only its menu. The institute's full report is a PDF whose tables do not extract cleanly as text, so stage figures and survival by cancer are not quoted; only the all-cancer survival figure is given. The IAEA's directory of radiotherapy centres works only in a browser. OnCo's web search budget was spent during this round, so pages had to be reached by known addresses.",
      links: [
        { label: "HZJZ: Rak u Hrvatskoj 2023./2024. (PDF)", url: HZJZ_BILTEN },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["hzjz-croatia", "hzzo-croatia", "halmed-croatia", "sestre-milosrdnice-tumors", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: ["nct07227402", "nct06875310", "nct04892173", "nct06152575", "nct04613596", "nct06093672", "cll14", "lidera"],
  papers: [],
  people: ["robert-separovic"],
  how:
    "Every card was written from Croatian sources read in Croatian, in full rather than through a summary: the Croatian Institute of Public Health's registry pages and report and its page on screening programmes, and HZZO's page on medicines. The EU route is from the EMA's own page, and the lung screening programme from the abstract of its design paper through Europe PMC. International figures come from IARC's GLOBOCAN 2024 fact sheet, WHO's Global Health Observatory and the World Bank. Trials were counted from OnCo's ClinicalTrials.gov participation data. The three new records (the institute, HZZO and HALMED) carry their own sources.",
  verify:
    "Which medicines HZZO pays for changes when its lists are updated, and a hospital committee decides exceptions case by case; ask the treating hospital's oncology department. Screening invitations come by post; ask your family doctor about lung screening if you smoke or have smoked.",
  verifyLinks: [
    { label: "Croatian Institute of Public Health", url: "https://www.hzjz.hr" },
    { label: "Croatian Health Insurance Fund", url: "https://hzzo.hr" },
    { label: "HALMED", url: "https://www.halmed.hr" },
  ],
};
