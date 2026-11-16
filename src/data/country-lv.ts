import type { CountryDive } from "@/data/country-dive";

/**
 * Latvia deep dive: the hand-written cards for /countries/lv/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Centre for Disease Prevention and Control's (SPKC) public
 * statistics database, table ONKO021, queried through its PxWeb interface; the OECD and European Commission EU Country
 * Cancer Profile for Latvia 2025 (PDF text, read through the Internet Archive because the European Commission's server
 * refused a plain request); SPKC's World Cancer Day 2025 notice with the National Health Service's 2023 screening
 * uptake; the National Health Service's English home page; WHO's HPV coverage rows from its public immunisation data
 * API; the World Bank's out-of-pocket series; and IARC's GLOBOCAN 2024 fact sheet for Latvia. Where a figure could not
 * be read it is named under `gaps`.
 */
const CCP_2025 = "https://web.archive.org/web/20260519061152/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-lv-2024-1675-en.pdf";
const CCP_PAGE = "https://cancer-inequalities.jrc.ec.europa.eu/country-cancer-profiles-2025";
const SPKC_STATS = "https://statistika.spkc.gov.lv/pxweb/lv/Health/";
const SPKC_WCD = "https://lvportals.lv/dienaskartiba/372369-pasaules-pretveza-diena-spkc-aicina-rupeties-par-savu-un-lidzcilveku-veselibu-2025";
const NVD_EN = "https://www.vmnvd.gov.lv/en";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/428-latvia-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LVA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=LV";
const CTGOV = "https://clinicaltrials.gov/search?country=Latvia&cond=cancer";

export const LV_DIVE: CountryDive = {
  iso2: "LV",
  iso3: "LVA",
  name: "Latvia",
  flag: "🇱🇻",
  asOf: "2026-11-11",
  title: "Cancer in Latvia",
  description:
    "Cancer in Latvia from Latvian sources: a national registry that recorded 11,584 new cancers in 2025, IARC's estimate of 11,317 cases and 5,803 deaths in 2024, the widest gap in cancer death rates between men and women in the EU, a Green Corridor for suspected cancer, screening invitations by the National Health Service, and new medicines reaching public coverage more than three years after European approval.",
  lede:
    "Latvia has a national cancer registry, free screening for four cancers and public cover for most cancer care, yet its cancer death rate was the third highest in the EU, Iceland and Norway in 2021 and the gap between men and women was the widest in the EU. The OECD's 2025 profile also reports high smoking among men, high alcohol consumption, late diagnosis and slow access to new medicines.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Latvia is 11,317 new cancers and 5,803 deaths, an age-standardised incidence of 282.2 per 100,000 (348.5 in men, 245.4 in women) and mortality of 116.6 (170.7 in men, 83.7 in women). IARC's fact sheet names a national registry as the source for incidence and WHO's national mortality data for deaths, each projected to 2024 from recent trends. The registry's own count, 11,198 cancers diagnosed in 2024 and 11,584 in 2025, is close to IARC's estimate because IARC built it from the registry. IARC's rates are age-standardised to the world population; the registry publishes crude rates per 100,000 residents, which are not comparable with IARC's.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Latvia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Latvia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 11,000 new cancers a year; lung cancer kills the most",
          plain:
            "Latvia's registry counted 11,584 new cancers in 2025. Prostate cancer is the commonest, then breast, colorectal and lung cancer, but lung cancer causes the most deaths. Men are about twice as likely as women to die of cancer once age is taken into account.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet gives 1,715 prostate cancers (476 deaths), 1,302 breast cancers (427 deaths), 1,130 colorectal cancers (647 deaths), 1,030 lung cancers (916 deaths) and 542 kidney cancers, with age-standardised mortality of 170.7 per 100,000 in men and 83.7 in women. The OECD and European Commission's Country Cancer Profile 2025 says Latvia's cancer mortality rate was the third highest among the EU countries plus Iceland and Norway in 2021, that the rate among men (436 per 100,000) was the highest, and that the gender difference was the largest in the EU. Between 2011 and 2021 cancer mortality fell by 8% among men and 5% among women, against EU declines of 16% and 9%. The crude incidence rate in the Kurzeme region in 2021 was about 50% higher than in Vidzeme.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Latvia (PDF)", url: IARC_FACTSHEET },
            { label: "OECD and European Commission: EU Country Cancer Profile Latvia 2025, section 2 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "registry",
          title: "A national registry since 2009, fed by an electronic cancer patient card",
          plain:
            "The Centre for Disease Prevention and Control (SPKC) has run Latvia's Cancer Registry since 2009. Doctors report each cancer through a cancer patient card in the national e-health system, and SPKC publishes counts by year, cancer and region in an open database.",
          detail:
            "The 2025 Country Cancer Profile says SPKC has managed administrative databases and registries, including the Cancer Registry, since 2009, and that the registry holds incidence, stage, treatment, survival and mortality data but not screening, genetic or patient-reported data; it cites the State Audit Office's 2023 finding that the quality and completeness of the data need improving. SPKC's database table ONKO021 gives the number of newly registered malignant tumours (ICD-10 C00 to C97) as 11,204 in 2019, 10,325 in 2020, 9,596 in 2021, 10,812 in 2022, 11,064 in 2023, 11,198 in 2024 and 11,584 in 2025; the dip in 2020 and 2021 coincides with the pandemic, when the profile says screening was paused from March to May 2020. The count includes non-melanoma skin cancers, as IARC's does. From 1 January 2024 tumours are coded to ICD-O 3.2 in the cancer patient card, so 2024 onwards is coded differently from earlier years.",
          links: [
            { label: "SPKC statistics database: table ONKO021, newly registered malignant tumours", url: SPKC_STATS },
            { label: "EU Country Cancer Profile Latvia 2025, section 5 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "SPKC: the role of family doctors in reporting to the cancer patient card (26 March 2026, PDF, in Latvian)", url: "https://www.spkc.gov.lv/lv/media/25316/download" },
          ],
        },
      ],
      tables: [
        {
          id: "lv-registry",
          title: "New cancers registered in Latvia, SPKC",
          caption: "Number of newly registered malignant tumours by year and site, and the all-cancer crude rate per 100,000 residents, from SPKC table ONKO021.",
          columns: [
            { key: "year", label: "Year" },
            { key: "all", label: "All cancers (C00 to C97)", numeric: true },
            { key: "rate", label: "Crude rate per 100,000", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "colorectal", label: "Colorectal", numeric: true },
            { key: "lung", label: "Lung", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
          ],
          rows: [
            { year: "2019", all: 11204, rate: 585.4, prostate: 1029, breast: 1224, colorectal: 1079, lung: 907, cervix: 219 },
            { year: "2021", all: 9596, rate: 509.2, prostate: 994, breast: 1113, colorectal: 867, lung: 859, cervix: 169 },
            { year: "2023", all: 11064, rate: 586.4, prostate: 1285, breast: 1217, colorectal: 1128, lung: 773, cervix: 179 },
            { year: "2024", all: 11198, rate: 599.0, prostate: 1283, breast: 1356, colorectal: 1090, lung: 900, cervix: 194 },
            { year: "2025", all: 11584, rate: 625.2, prostate: 1340, breast: 1193, colorectal: 1154, lung: 933, cervix: 216 },
          ],
          note: "Counts of new cases, not deaths. The rate is crude, not age-standardised, so it cannot be compared with IARC's rates. Colorectal is ICD-10 C18 to C21. SPKC's table was queried on 11 November 2026 and recent years may still be revised.",
          sources: [{ label: "SPKC statistics database: table ONKO021", url: SPKC_STATS }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: public cover with small copayments, and slow access to new medicines",
      aside: { label: "EU Country Cancer Profile Latvia 2025 (European Cancer Inequalities Registry)", url: CCP_PAGE },
      cards: [
        {
          id: "copayments",
          title: "Cancer care is publicly covered; patients pay EUR 7 a day in hospital",
          plain:
            "Cancer care in Latvia is paid for by the state through the National Health Service. Patients pay small copayments, such as EUR 7 a day in hospital and EUR 0.71 per prescription for cancer medicines, and children, people on low incomes and people in palliative care pay none.",
          detail:
            "The 2025 Country Cancer Profile lists a copayment of EUR 7 a day for inpatient care, EUR 0.71 per prescription for cancer drugs, half the cost of medical devices and up to EUR 31 per hospitalisation for surgery while total copayments in the year are below EUR 570; children under 18, people needing long-term or palliative care, people on low incomes and asylum seekers pay nothing. Since 2022, after an assessment under the third National Cancer Plan, diagnostic tests ordered after a screening result carry no copayment. The World Bank's series, from WHO's health expenditure database, puts out-of-pocket spending at 35.1% of current health spending in 2023, across all care, not cancer alone.",
          links: [
            { label: "EU Country Cancer Profile Latvia 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Latvia", url: WB_OOP },
          ],
        },
        {
          id: "medicines",
          title: "New cancer medicines took over 1,100 days to reach public coverage",
          plain:
            "For 13 uses of 10 new breast and lung cancer medicines with high clinical benefit, Latvia publicly covered only 31%, about half the EU average. The time from European approval to Latvian coverage was over 1,100 days, among the longest in the EU, although public spending on cancer medicines doubled between 2017 and 2023.",
          detail:
            "The profile reports that about EUR 24 million was paid publicly for oncology medicines in 2017 and that the allocation had doubled by 2023, with adjuvant options for HER2-positive breast cancer and immunotherapy for triple-negative breast cancer added in 2023. Of 13 indications of 10 new oncology medicines with high clinical benefit for breast and lung cancer, 31% were covered in Latvia against an EU average of 59%, on the public reimbursement list of 1 April 2023. The time from European Medicines Agency authorisation to national coverage was over 1,100 days; the wait between authorisation and a company's application for reimbursement was 528 days against an EU average of 188. Public coverage of cancer biosimilars was 42% against an EU average of 65%.",
          links: [{ label: "EU Country Cancer Profile Latvia 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: the European route, then a national reimbursement decision",
      cards: [
        {
          id: "approval",
          title: "European authorisation first, then a national decision on coverage",
          plain:
            "The 2025 Country Cancer Profile measures Latvia's access to new cancer medicines from their European Medicines Agency authorisation to the national decision to pay for them, and finds the national step is where the delay lies. The State Agency of Medicines is the national medicines regulator.",
          detail:
            "The 2025 Country Cancer Profile attributes Latvia's low coverage of new oncology medicines to high prices, the time spent on health technology assessment and budget-impact decisions, and the late filing of reimbursement applications by companies, and measures the delay from European Medicines Agency authorisation to national reimbursement. The National Health Service's English site lists the State Agency of Medicines of Latvia among the bodies it links. OnCo did not read the State Agency of Medicines' own pages for this page, as its English site answered with a server error; see the gaps.",
          links: [
            { label: "EU Country Cancer Profile Latvia 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "National Health Service of Latvia (English)", url: NVD_EN },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "SPKC: World Cancer Day 2025 notice, screening uptake in 2023", url: SPKC_WCD },
      cards: [
        {
          id: "screening-programmes",
          title: "Four free screening programmes, with low uptake for breast and bowel",
          plain:
            "Latvia screens for breast, cervical, bowel and prostate cancer free of charge. Women are invited by letter for breast and cervical screening; bowel and prostate screening are arranged by family doctors. In 2023, 55.2% of invited women had cervical screening and 36.1% breast screening, and 25.8% took part in bowel screening.",
          detail:
            "The 2025 Country Cancer Profile says population-based breast and cervical screening started nationwide in 2009: mammography every two years for women aged 50 to 69 at 27 designated providers or a mobile bus, cytology at ages 25 and 28, and primary HPV testing for women aged 30 to 67 from 2022, with the interval planned to change from three to five years in 2025. Bowel screening is not population-based, so no letters are sent. Breast screening participation was 21% in 2009, 44% in 2017, 30% in 2020 when screening was paused, and 36% in 2023 against an EU average of 56%. SPKC's 2025 notice gives the National Health Service's 2023 uptake as 55.2% for cervical, 36.1% for breast, 25.8% for bowel and 80% for prostate screening. SPKC's notice describes prostate screening as a PSA blood test, and the profile gives it as every two years for men aged 50 to 75.",
          links: [
            { label: "SPKC: World Cancer Day 2025 notice (LV portāls)", url: SPKC_WCD },
            { label: "EU Country Cancer Profile Latvia 2025, section 4 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "National Health Service: state-funded prostate screening (English home page)", url: NVD_EN },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination since 2010 for girls and 2022 for boys, with coverage below the EU average",
          plain:
            "Family doctors vaccinate girls aged 12 to 18 against HPV free of charge, and boys aged 12 to 17 since 2022. WHO's figures give 66% of girls a first dose and 54% the last dose in 2025.",
          detail:
            "The Country Cancer Profile says HPV vaccination began for girls in 2010 and boys in 2022, that SPKC has run information campaigns since 2017, and that coverage among 15-year-old girls reached 46% in 2023 against an EU average of 64%. WHO's immunisation data give HPV programme coverage among females of 61% (first dose) and 46% (last dose) in 2023, 64% and 51% in 2024, and 66% and 54% in 2025.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Latvia (data API)", url: WHO_HPV_API },
            { label: "EU Country Cancer Profile Latvia 2025, section 3 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Latvia does differently",
      cards: [
        {
          id: "green-corridor",
          title: "A Green Corridor for suspected cancer, which an audit found did not speed diagnosis",
          plain:
            "Since 2016 Latvia has set waiting time targets for cancer care and paid for a fast track, the Green Corridor, for people with suspected cancer. A 2023 State Audit Office review found that the share of cancers found at an early stage did not change and only a quarter of patients were seen within the 10-day target.",
          detail:
            "The 2025 Country Cancer Profile lists the targets: 30 days to examination after a suspicious screening result, 10 working days to a first diagnostic test after a GP or gynaecologist's referral, 10 working days between primary and secondary diagnosis and 30 days to a treatment plan, with waits published by institution. It reports that the Green Corridor, fully funded from the state budget, shortened waits for some tests such as CT and colonoscopy but not for some chemotherapy and radiotherapy, and that the State Audit Office (2023) found the proportion of cancers diagnosed at stages 1 and 2 stayed about 42% from 2017 to 2021, that only a quarter of patients received care within the 10-day target, and that the average time from GP consultation to diagnosis was 195 days. Latvia introduced oncology patient co-ordinators in 2023 (four in 2024) and in 2024 began establishing a Latvian Cancer Centre with EU Recovery and Resilience Facility funds to set standards across hospitals.",
          links: [{ label: "EU Country Cancer Profile Latvia 2025, sections 5.1 and 5.2 (PDF, Internet Archive copy)", url: CCP_2025 }],
        },
        {
          id: "plans",
          title: "Three national cancer plans since 2009, and a fourth for 2025 to 2027",
          plain:
            "Latvia adopted its first National Cancer Plan in 2009, a second for 2017 to 2020 and a third for 2022 to 2024 aligned with Europe's Beating Cancer Plan. It started developing a plan for 2025 to 2027. Oncologists numbered 4 per 100,000 people in 2023, and a quarter of medical oncologists were near retirement in 2022.",
          detail:
            "The profile says the third plan, introduced in 2021 and implemented from July 2022, covers prevention, screening, access to and quality of care, cancer data, workforce and patient satisfaction. On workforce it counts 575 physicians and 706 nurses per 1,000 new cancer cases, against EU averages of 679 and 1,376; oncologists stayed at 3 per 100,000 from 2005 to 2015 and rose to 4 in 2023, and 24% of medical oncologists were approaching retirement in 2022, after which Latvia funded more oncology residencies.",
          links: [{ label: "EU Country Cancer Profile Latvia 2025, sections 1 and 5 (PDF, Internet Archive copy)", url: CCP_2025 }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Latvia", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "34 trials in OnCo's records list a site in Latvia, nearly all phase 3",
          plain:
            "Thirty-four trials in OnCo's records include Latvia among their countries, 31 of them phase 3 and mostly sponsored by large drug companies. Six were recruiting when the registry was last read.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 34 trials list Latvia, 31 phase 3, 2 phase 2 and 1 phase 2/3. ClinicalTrials.gov lists 6 as recruiting, 14 as active and not recruiting, 12 as completed and 2 as terminated. Merck Sharp & Dohme leads 7, Hoffmann-La Roche 4, Amgen 3 and UroGen Pharma 3. They include CLEOPATRA, IMpassion130, IMpower150, KEYNOTE-671 and ARAMIS. OnCo holds a selection of trials, not the whole registry.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Latvia", url: CTGOV },
            { label: "KEYNOTE-671 (NCT03425643)", url: "https://clinicaltrials.gov/study/NCT03425643" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not read for this page",
      plain:
        "OnCo could not read the State Agency of Medicines' site, which returned a server error, or the European Commission's copy of the Country Cancer Profile, which refused a script; it read an Internet Archive copy instead. It did not find a public count of radiotherapy machines in Latvia.",
      detail:
        "zva.gov.lv/en/about-us answered 503 on 11 November 2026. The European Cancer Inequalities Registry's PDF answered with a 'Request Rejected' page; the Internet Archive copy of 19 May 2026 was read. Radiotherapy capacity is published in IAEA's DIRAC database, which needs an account for most queries, and was not read.",
      links: [
        { label: "State Agency of Medicines of Latvia", url: "https://www.zva.gov.lv/en" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["spkc-latvia", "nvd-latvia", "riga-east-university-hospital", "pauls-stradins-clinical-university-hospital"],
  companies: [],
  drugs: [],
  trials: ["cleopatra", "impassion130", "impower150", "keynote-671", "aramis"],
  papers: [],
  people: [],
  how:
    "Every card was written from Latvian and European public sources read as raw text on 11 November 2026: SPKC's statistics database, the OECD and European Commission's 2025 Country Cancer Profile, SPKC's 2025 screening notice, the National Health Service's site, WHO's immunisation data, the World Bank and IARC's GLOBOCAN 2024 fact sheet. Latvian sources were read in Latvian.",
  verify:
    "Registry counts for the latest years can be revised as late reports arrive; check SPKC's table before relying on a single year. Copayments and the reimbursement list change; the National Health Service publishes the current rules.",
  verifyLinks: [
    { label: "SPKC statistics database", url: SPKC_STATS },
    { label: "National Health Service of Latvia", url: NVD_EN },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Latvia (PDF)", url: IARC_FACTSHEET },
  ],
};
