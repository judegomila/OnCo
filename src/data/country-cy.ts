import type { CountryDive } from "@/data/country-dive";

/**
 * Cyprus deep dive: the hand-written cards for /countries/cy/ (wave 13). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: the OECD and European Commission EU Country Cancer Profile for
 * Cyprus 2025 and its one-page Cancer Performance Tracker (PDF text, from the European Cancer Inequalities Registry);
 * the Cyprus Cancer Registry's own summary of results for 1998 to 2016 (a Ministry of Health PDF in Greek, read through
 * the Internet Archive because the Ministry's sites refused a plain request); the European Observatory on Health Systems
 * and Policies' Health Systems and Policy Monitor for Cyprus (sections 2.7, 3.3, 3.4, 4.1, 5.1, 5.4 and 5.6 and its
 * country updates of 11 May 2025 and 7 April 2026); the Health Insurance Organisation's own page on contributions and
 * co-payments; the Bank of Cyprus Oncology Centre's pages (in Greek) and the German Medical Institute's home page; the
 * Health Minister's February 2026 figures as reported by Politis; Cyprus Mail reports of 15 May 2025, 13 June 2025 and
 * 4 November 2026; the Ministry of Health's 2009 National Cancer Control Strategy (English PDF on the ICCP portal); the
 * EMA leaflet on the centralised procedure; WHO's HPV coverage rows from its public immunisation data API; the World
 * Bank's health financing series; IAEA's DIRAC country row; ClinicalTrials.gov's record for NCT00021450; Europe PMC for
 * two registry papers; and IARC's GLOBOCAN 2024 fact sheet for Cyprus. Where a source could not be read it is named
 * under `gaps`.
 */
const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-cy-2024-1662-en.pdf";
const CCP_PAGE = "https://cancer-inequalities.jrc.ec.europa.eu/country-cancer-profiles-2025";
const REGISTRY_SUMMARY =
  "https://web.archive.org/web/20240217142433/https://www.moh.gov.cy/moh/moh.nsf/All/9245B3902339397CC22579C60026560F/$file/Cyprus%20Cancer%20Registry%20-%20Summary%20Results%201998-2016%20.pdf";
const HSPM = "https://eurohealthobservatory.who.int/monitors/health-systems-monitor/countries-hspm/hspm/cyprus2025";
const HSPM_REGULATION = `${HSPM}/organization-and-governance/regulation`;
const HSPM_FINANCING = `${HSPM}/financing/overview-of-the-statutory-financing-system`;
const HSPM_OOP = `${HSPM}/financing/out-of-pocket-payments`;
const HSPM_PUBLIC_HEALTH = `${HSPM}/provision-of-services/public-health`;
const HSPM_PHARMA = `${HSPM}/provision-of-services/pharmaceutical-care`;
const HSPM_SPECIALISED = `${HSPM}/provision-of-services/specialized-care`;
const HSPM_PHYSICAL = `${HSPM}/physical-and-human-resources/physical-resources`;
const HSPM_CRC = "https://eurohealthobservatory.who.int/monitors/health-systems-monitor/updates/hspm/cyprus2025/national-screening-programme-for-the-early-detection-of-colorectal-cancer";
const GESY_FINANCING = "https://www.gesy.org.cy/en-us/hiofinancing";
const POLITIS_2026 = "https://en.politis.com.cy/social-lens/985101/cyprus-records-4260-new-cancer-cases-annually";
const CM_CRC = "https://cyprus-mail.com/2025/05/15/in-major-public-health-push-government-launches-free-bowel-cancer-screening";
const CM_PROSTATE_2026 = "https://cyprus-mail.com/2026/11/04/men-urged-to-seek-early-prostate-cancer-screening";
const CM_PROSTATE_2025 = "https://cyprus-mail.com/2025/06/13/almost-10000-cases-of-prostate-cancer-in-cyprus-over-last-23-years";
const BOCOC_ABOUT = "https://www.bococ.org.cy/el/shetika-me-emas";
const BOCOC_RT = "https://www.bococ.org.cy/el/service/aktinotherapeytiki-ogkologia";
const GMI_HOME = "https://www.gmi.com.cy/";
const STRATEGY_2009 = "https://www.iccp-portal.org/system/files/plans/Cyprus_National_Strategy_on_Cancer_English.pdf";
const EMA_LEAFLET = "https://www.ema.europa.eu/en/documents/leaflet/applying-european-union-marketing-authorisation-medicinal-products-human-use_en.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/196-cyprus-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'CYP'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=CY";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=CY";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=CY";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const CTGOV = "https://clinicaltrials.gov/search?country=Cyprus&cond=cancer";
const TUMORI_2015 = "https://doi.org/10.5301/tj.5000204";
const CANCER_REPORTS_2024 = "https://doi.org/10.1002/cnr2.2000";

const CCP = (section: string) => ({ label: `OECD and European Commission: EU Country Cancer Profile Cyprus 2025, ${section} (PDF)`, url: CCP_2025 });
const REGISTRY_LINK = { label: "Cyprus Cancer Registry: summary results 1998 to 2016 (Ministry of Health PDF, in Greek, Internet Archive copy)", url: REGISTRY_SUMMARY };

export const CY_DIVE: CountryDive = {
  iso2: "CY",
  iso3: "CYP",
  name: "Cyprus",
  flag: "🇨🇾",
  asOf: "2026-11-16",
  title: "Cancer in Cyprus",
  description:
    "Cancer in Cyprus from Cypriot and European sources: a population-based registry whose own summary counted 3,573 new cancers in 2016, an average of 4,260 new cancers a year for 2018 to 2022 given by the Health Minister in a speech Politis reported on 7 February 2026, IARC's estimate of 6,015 cases and 2,680 deaths in 2024, a single public insurer since 2019 that cut out-of-pocket spending from 34% to 18% of health spending, a breast screening programme for ages 45 to 74, a bowel screening programme launched in May 2025, two radiotherapy centres, and 31% of a sample of new cancer medicines reimbursed.",
  lede:
    "Cyprus has a population-based cancer registry, a single public health insurer (GeSY) since 2019 that covers legal residents, and two cancer centres, in Nicosia and Limassol. The OECD's 2025 profile puts its cancer death rate among the lowest in the EU but rising, and finds that a smaller share of a sample of new cancer medicines is publicly paid for than the EU average. The Cyprus Cancer Registry gives its coverage, in its own words translated from the Greek, as the 'areas controlled by the Republic of Cyprus'.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Cyprus is 6,015 new cancers and 2,680 deaths, an age-standardised incidence of 269.4 per 100,000 (267.6 in men, 276.5 in women) and mortality of 99.2 (123.4 in men, 78.9 in women), with 19,697 people alive within five years of a diagnosis. IARC's fact sheet names a national registry as the source for incidence and WHO's national mortality data for deaths, each as trends in national rates projected to 2024. The estimate is well above the national figures read for this page: the Health Minister, in a speech reported by Politis on 7 February 2026, gave a Health Monitoring Unit average of 4,260 new cancers a year for 2018 to 2022, the registry's own summary counted 3,573 in 2016, and the OECD profile quotes the European Cancer Information System as expecting 4,637 in 2022 without non-melanoma skin cancer. The sources read here do not explain the difference, and IARC's fact sheet does not say what area its population of 1,358,289 covers. IARC's rates are standardised to the world population and the OECD's to the European one, so the two sets cannot be compared.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Cyprus",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Cyprus (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "Breast and prostate cancer are the commonest; lung cancer causes the most deaths",
          plain:
            "Breast cancer is the commonest cancer in women in Cyprus and prostate cancer the commonest in men, followed by thyroid, lung and bowel cancer. Lung cancer causes the most cancer deaths. Cyprus's cancer death rate is among the lowest in the EU, but it rose between 2011 and 2021 while the EU's fell.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet estimates 1,004 breast cancers (213 deaths), 709 prostate cancers (176 deaths), 626 thyroid cancers (10 deaths), 605 lung cancers (510 deaths) and 572 colorectal cancers (331 deaths). The OECD and European Commission's Country Cancer Profile 2025, using rates standardised to the European population, puts estimated 2022 incidence at 640 per 100,000 in men (EU 684) and 538 in women (EU 488), and thyroid cancer incidence at 42 per 100,000 against an EU average of 11, a difference for which it says no solid evidence of a cause has been reported. Cancer mortality was 213 per 100,000 in 2021 against an EU average of 235, the fifth lowest in the EU, but it rose by 8% among men and 10% among women between 2011 and 2021 while the EU's fell by 16% and 8%. Lung cancer accounted for 20% of cancer deaths in 2021, breast 10%, colorectal 9% and prostate 7%.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Cyprus (PDF)", url: IARC_FACTSHEET },
            CCP("section 2"),
          ],
        },
        {
          id: "registry",
          title: "A population-based registry in the Ministry of Health, with data from 1998",
          plain:
            "The Cyprus Cancer Registry is kept by the Health Monitoring Unit of the Ministry of Health. Its own summary counted 3,573 new cancers in 2016, and in February 2026, as the newspaper Politis reported, the Health Minister gave a Health Monitoring Unit average of 4,260 new cancers a year for 2018 to 2022. OnCo has not read that figure in a publication of the registry itself. The registry records the stage at diagnosis, but the OECD's profile says no survival data are systematically produced from it at national level.",
          detail:
            "The registry's summary of results for 1998 to 2016 describes it as a population-based registry operating since 1990 with data available from 1998, managed by the Health Monitoring Unit since 2008, and covering 95% of cases in what it calls the areas controlled by the Republic of Cyprus. It counted 50,991 cancers among residents over the 19 years, rising from 1,606 in 1998 to 3,573 in 2016, with a world age-standardised rate of 252.3 per 100,000 in 2016; it lists change in the size of the population and its ageing, better diagnosis and more complete recording among the explanations for the rise. The OECD profile dates the registry from 1998 and says it holds staging, diagnosis and treatment data and is linked with mortality data, but that Cyprus does not report incidence by region or socio-economic status and that no data on cancer survival are systematically produced at national level from it. In 2021 the stages at diagnosis were 34% localised, 24% regional and 21% distant, unchanged since 2017. Politis reported on 7 February 2026 that the Health Minister, Neophytos Charalambides, speaking the day before at the 2nd Pancyprian Oncology Congress, gave Health Monitoring Unit figures of 4,260 new cancers a year on average for 2018 to 2022 and about 1,600 cancer deaths a year for 2019 to 2023, with cancer causing 23% of deaths in 2023. These figures are second-hand: OnCo read them in the newspaper's report of the speech, not in a registry publication.",
          links: [
            REGISTRY_LINK,
            CCP("sections 2 and 5.2"),
            { label: "Politis: Cyprus records 4,260 new cancer cases annually (7 February 2026)", url: POLITIS_2026 },
            { label: "Health Systems and Policy Monitor, Cyprus: 5.1 Public health (the Health Monitoring Unit)", url: HSPM_PUBLIC_HEALTH },
          ],
        },
        {
          id: "coverage-area",
          title: "What area the national figures cover",
          plain:
            "The national sources say in their own words what area they cover. The registry gives its coverage, translated from the Greek, as the 'areas controlled by the Republic of Cyprus', and a note in the OECD's profile says its information 'relates to the area under the effective control of the Government of the Republic of Cyprus'. IARC's fact sheet gives a population but does not say what area it covers.",
          detail:
            "The Cyprus Cancer Registry's summary gives its coverage as 95% of cases, with the words (in Greek) 'areas controlled by the Republic of Cyprus', and says its counts exclude people who are not resident in those areas. The OECD and European Commission's Country Cancer Profile 2025 carries a note by the EU member states of the OECD and the European Union that reads: 'The information in this document relates to the area under the effective control of the Government of the Republic of Cyprus.' IARC's GLOBOCAN 2024 fact sheet gives a population of 1,358,289 (684,254 males and 674,039 females) with no statement of the area, and the World Bank's population series gives 1,358,282 for 2024. OnCo read no cancer statistics for any other area for this page.",
          links: [
            REGISTRY_LINK,
            CCP("inside cover"),
            { label: "IARC: GLOBOCAN 2024 fact sheet, Cyprus (PDF)", url: IARC_FACTSHEET },
            { label: "World Bank: population, total, Cyprus", url: "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=CY" },
          ],
        },
        {
          id: "registry-sites",
          title: "The registry's commonest cancers: prostate and breast, then thyroid in women",
          plain:
            "In the registry's summary for 2012 to 2016, prostate cancer was the commonest cancer in men, printed as 27.6% of their cancers, and breast cancer the commonest in women, printed as 33.6%. Thyroid cancer was the second commonest cancer in women. A patients' association, PASYKAF, citing the registry in a statement Cyprus Mail reported on 13 June 2025, gave 9,945 prostate cancers from 1998 to 2021.",
          detail:
            "The registry's summary lists, for 2012 to 2016, 2,422 prostate cancers, 1,260 cancers of the trachea, bronchus and lung, 1,135 colorectal and 721 bladder cancers among 9,064 cancers in men, and 2,837 breast, 1,221 thyroid, 760 colorectal and 542 cancers of the body of the womb among 8,397 in women. The summary's own arithmetic does not close: 2,422 of 9,064 is 26.7%, not the 27.6% it prints; the women's rows add up to 8,453, not 8,397; and its yearly table gives 8,982 cancers in men over the same five years, not 9,064. OnCo shows the figures as printed. From the cause of death registry it gives 778 cancer deaths in men in 2016 (lung 197, prostate 90) and 547 in women (breast 107, lung 62). A 2015 paper in Tumori on registry data for 1998 to 2008 found world age-standardised incidence rising from 195.4 to 239.0 per 100,000 in men and from 180.6 to 217.1 in women between 1998 to 2002 and 2006 to 2008, with thyroid cancer rising fast. A 2024 paper in Cancer Reports on 2004 to 2017 found breast and thyroid cancer rates rising and prostate cancer rates in men declining from 2012. The Pancyprian Association of Cancer Patients and Friends (PASYKAF), citing the registry in a statement reported by Cyprus Mail on 13 June 2025, gave 9,945 prostate cancers for 1998 to 2021. A later Cyprus Mail report printed a registry count for 2018 to 2022 without saying who gave it; it is not repeated here and is described under the gaps.",
          links: [
            REGISTRY_LINK,
            { label: "Incidence and time trends of cancer in Cyprus over 11 years (1998-2008), Tumori 2015", url: TUMORI_2015 },
            { label: "Temporal trends of cancer incidence rates for the most frequent cancer sites in Cyprus (2004-2017), Cancer Reports 2024", url: CANCER_REPORTS_2024 },
            { label: "Cyprus Mail: almost 10,000 cases of prostate cancer over 23 years (13 June 2025)", url: CM_PROSTATE_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "cy-registry",
          title: "New cancers counted by the Cyprus Cancer Registry, 1998 to 2016",
          caption: "Number of cancers among residents by sex and year, and the all-cancer rate per 100,000 standardised to the world population, from the registry's own summary.",
          columns: [
            { key: "year", label: "Year" },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "total", label: "Total", numeric: true },
            { key: "asr", label: "Rate per 100,000 (world standard)", numeric: true },
          ],
          rows: [
            { year: "1998", men: 774, women: 832, total: 1606, asr: 178.0 },
            { year: "2004", men: 1267, women: 1129, total: 2396, asr: 225.2 },
            { year: "2008", men: 1532, women: 1443, total: 2975, asr: 248.8 },
            { year: "2012", men: 1727, women: 1550, total: 3277, asr: 243.0 },
            { year: "2014", men: 1817, women: 1681, total: 3498, asr: 254.2 },
            { year: "2015", men: 1878, women: 1786, total: 3664, asr: 264.8 },
            { year: "2016", men: 1776, women: 1797, total: 3573, asr: 252.3 },
            { year: "1998 to 2016", men: 26393, women: 24598, total: 50991, asr: null },
          ],
          note: "Counts of new cases, not deaths. The registry's notes say in situ cancers are excluded, people not resident in the areas controlled by the Republic of Cyprus are excluded, and cases found only from death certificates are included. The registry gives its coverage as 95% of cases. For later years OnCo read no registry publication, only the Health Minister's average of 4,260 new cancers a year for 2018 to 2022 as Politis reported it on 7 February 2026.",
          sources: [REGISTRY_LINK],
        },
        {
          id: "cy-registry-sites",
          title: "Commonest cancers in the registry, 2012 to 2016",
          caption: "Number of cases over the five years and share of all cancers in that sex, from the registry's own summary.",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases, 2012 to 2016", numeric: true },
            { key: "share", label: "Share" },
          ],
          rows: [
            { sex: "Men", site: "Prostate", cases: 2422, share: "27.6%" },
            { sex: "Men", site: "Trachea, bronchus and lung", cases: 1260, share: "13.9%" },
            { sex: "Men", site: "Colorectal", cases: 1135, share: "12.5%" },
            { sex: "Men", site: "Bladder", cases: 721, share: "8.0%" },
            { sex: "Women", site: "Breast", cases: 2837, share: "33.6%" },
            { sex: "Women", site: "Thyroid", cases: 1221, share: "14.4%" },
            { sex: "Women", site: "Colorectal", cases: 760, share: "9.0%" },
            { sex: "Women", site: "Body of the womb", cases: 542, share: "6.4%" },
          ],
          note: "Figures as the registry's summary prints them. Its totals for the five years are 9,064 cancers in men and 8,397 in women, but 2,422 of 9,064 is 26.7%, not 27.6%, and the women's rows in the summary add up to 8,453. These are older than IARC's 2024 estimates in the table below and are counted differently, so the two should not be set side by side.",
          sources: [REGISTRY_LINK],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: one public insurer since 2019",
      aside: { label: "Health Insurance Organisation: financing of the General Healthcare System", url: GESY_FINANCING },
      cards: [
        {
          id: "gesy",
          title: "GeSY covers legal residents and buys care from public and private providers",
          plain:
            "Since 2019 Cyprus has had one public health insurance system, the General Healthcare System, known as GeSY. It is paid for by contributions from workers, employers, pensioners and the state, and covers people who are legally resident. The Health Insurance Organisation runs it and buys care from both public and private providers.",
          detail:
            "The OECD profile says GeSY began operating in 2019 as the country's first social health insurance system, with the aim of universal coverage with no or minimal co-payments. The Health Insurance Organisation's own page sets the contribution rates at full implementation as 2.65% of pay for employees and pensioners, 2.90% for employers, 4.00% for the self-employed and 4.70% from the state, on income up to EUR 180,000 a year. The Health Systems and Policy Monitor says entitlement is based on legal residence, not citizenship, income or payment of contributions; that asylum seekers are not covered by GeSY but are entitled to free care from the public provider; and that undocumented migrants and students from outside the EU are not covered. The Monitor describes the Health Insurance Organisation as the single purchaser, and the Organisation's page, written before the system started, says spending on each group of providers cannot exceed a global budget set in advance. The Monitor says the fund's unaudited 2024 accounts showed revenue of EUR 1,839 million and spending of EUR 1,726 million. The OECD profile counts 64 contracted providers of inpatient care and 50,172 visits to GeSY oncologists in 2022, against 27,819 in 2020.",
          links: [
            { label: "Health Insurance Organisation: financing of the General Healthcare System", url: GESY_FINANCING },
            { label: "Health Systems and Policy Monitor, Cyprus: 3.3 Overview of the statutory financing system", url: HSPM_FINANCING },
            CCP("sections 4 and 5.1"),
          ],
        },
        {
          id: "out-of-pocket",
          title: "Out-of-pocket spending fell from 34% to 18% of health spending",
          plain:
            "Before GeSY, people in Cyprus paid about a third of all health spending from their own pockets. The World Bank's series puts it at 33.7% in 2019 and 17.9% in 2023. The Health Insurance Organisation's page, which was written before the system started and is still in the future tense, sets a co-payment of EUR 1 for a medicine and none for hospital stays, with a yearly cap of EUR 150, or EUR 75 for children and people on low incomes. Check the current amounts with the Organisation.",
          detail:
            "The World Bank's series, from WHO's health expenditure database, gives out-of-pocket spending as 33.7% of current health spending in 2019, 21.4% in 2020, 16.2% in 2021, 18.0% in 2022 and 17.9% in 2023, across all care and not cancer alone; over the same years the government share rose from 54.2% to 76.8%, and health spending was US$2,899 a person and 8.1% of GDP in 2023. Other sources give different out-of-pocket figures: the OECD profile's words are 'a dramatic decrease in out-of-pocket spending (at 30% in 2022)', and the Health Systems and Policy Monitor says 34% in 2019, 14% in 2020 and 10% in 2021. The Health Insurance Organisation's page is written in the future tense, describes contributions as starting in March 2019 and carries a 2018 to 2022 copyright line, so it sets out the scheme as planned and OnCo has not confirmed the amounts are current. It lists co-payments of EUR 1 per pharmaceutical product, EUR 1 per laboratory test, EUR 10 per radiology service and EUR 10 for a visit to accident and emergency, none for inpatient care, and EUR 25 for seeing a specialist without a referral from a personal doctor. It says the yearly cap on co-payments will be EUR 75 for recipients of the Guaranteed Minimum Income, low-income pensioners and children up to 21, and EUR 150 for everyone else. A patient who chooses a dearer medicine than the one GeSY covers is to pay the difference. The OECD profile notes there are no up-to-date data on catastrophic health spending.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Cyprus", url: WB_OOP },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Cyprus", url: WB_GOV },
            { label: "World Bank: current health expenditure per capita, Cyprus", url: WB_PC },
            { label: "Health Insurance Organisation: co-payments and personal contributions", url: GESY_FINANCING },
            { label: "Health Systems and Policy Monitor, Cyprus: 3.4 Out-of-pocket payments", url: HSPM_OOP },
            CCP("section 5.1"),
          ],
        },
        {
          id: "medicines-access",
          title: "About 31% of a sample of new cancer medicines were reimbursed in 2023",
          plain:
            "For 13 uses of 10 new breast and lung cancer medicines with high clinical benefit, Cyprus publicly paid for about 31% in 2023, against almost 60% on average across the EU. Patient groups have reported a gap in access to new medicines under GeSY, and about 200 medicines were waiting to join its list at the end of 2023.",
          detail:
            "The OECD profile's sample is 13 indications of 10 new medicines for breast and lung cancer and 19 biosimilars of bevacizumab, rituximab and trastuzumab, checked against the public reimbursement list of 1 April 2023. Cyprus reimbursed about 31% of the indications (EU average almost 60%, economic peers 47%) and 21% of the biosimilars (EU 65%), and its mean time from European approval to public reimbursement of the biosimilars, almost 1,400 days, was the longest in the EU. The profile adds that Cyprus runs two kinds of early access scheme, one for a whole patient group and one for named patients at a doctor's request, with European Medicines Agency approval of the use as a prerequisite, and that it is among the countries with the highest availability of next-generation sequencing. The Health Systems and Policy Monitor says the patient organisation OSAK has often raised the delay in adding innovative medicines to the GeSY list, estimates that about 200 were pending at the end of 2023, and says the Ministry of Health still pays for new and expensive medicines where the Health Insurance Organisation has not concluded an agreement with the company.",
          links: [
            CCP("section 5.1"),
            { label: "Health Systems and Policy Monitor, Cyprus: 5.6 Pharmaceutical care", url: HSPM_PHARMA },
            { label: "Health Systems and Policy Monitor, Cyprus: 2.7 Regulation", url: HSPM_REGULATION },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: the European route, then the Health Insurance Organisation's list",
      aside: { label: "EMA: applying for EU marketing authorisation (leaflet, PDF)", url: EMA_LEAFLET },
      cards: [
        {
          id: "ema-route",
          title: "New cancer medicines are authorised through the European Medicines Agency",
          plain:
            "Cyprus is in the European Union, so a new cancer medicine is assessed once by the European Medicines Agency and the authorisation is valid in Cyprus. The national regulator is the Pharmaceutical Services of the Ministry of Health, which acts as secretariat of the Drugs Council, sets prices and monitors safety.",
          detail:
            "The EMA's leaflet on the centralised procedure says medicines from biotechnology, advanced therapies, designated orphan medicines and medicines with a new active substance for cancer must be evaluated by the Agency; its Committee for Medicinal Products for Human Use gives an opinion within up to 210 days of a valid application, and the European Commission decides within 67 days, with an authorisation valid across the EU and the EEA. The Health Systems and Policy Monitor says the quality, efficacy, safety and pricing of medicines in Cyprus are the responsibility of the Department of Pharmaceutical Services of the Ministry of Health, which acts as secretariat of the Drugs Council under the Medicinal Products for Human Use (Control of Quality, Supply and Pricing) Law of 2001 (70(I)/2001), harmonised with Directive 2001/83/EC. Medicines reach the Cypriot market through national procedures or, with other EU states, the centralised, decentralised and mutual recognition procedures. The department's pharmacovigilance and clinical trials sectors monitor safety after marketing. The Monitor adds that a bill to set up a National Pharmaceutical Authority was still pending.",
          links: [
            { label: "EMA: applying for EU marketing authorisation (leaflet, PDF)", url: EMA_LEAFLET },
            { label: "Health Systems and Policy Monitor, Cyprus: 2.7.4 Regulation and governance of pharmaceuticals", url: HSPM_REGULATION },
            { label: "Health Systems and Policy Monitor, Cyprus: 5.6 Pharmaceutical care", url: HSPM_PHARMA },
          ],
        },
        {
          id: "reimbursement",
          title: "The Health Insurance Organisation decides which medicines GeSY pays for",
          plain:
            "An authorised medicine is paid for by GeSY once the Health Insurance Organisation adds it to its list of reimbursed medicines. Its board decides on the advice of scientific and advisory committees. Prices are set by the Pharmaceutical Services by comparing prices in ten other European countries.",
          detail:
            "The Health Systems and Policy Monitor says that under GeSY the Ministry of Health's role in reimbursing medicines passed to the Health Insurance Organisation: a medicine with a marketing authorisation in force can join the list after a positive decision by the organisation's council, on the recommendations of a scientific committee and the Drug Compensation Advisory Committee, with comparative clinical evidence, clinical guidelines and health technology assessments by other European bodies weighed. It says little progress has been made in building Cyprus's own health technology assessment capacity. The Pharmaceutical Services' pricing sector must set a price within 90 days of a complete application, from wholesale prices in ten reference countries (Austria, Germany, Denmark, Belgium, Spain, Italy, Sweden, France, Greece and Portugal), and generics are priced at 80% of the original. The OECD profile adds that GeSY negotiates prices, uses price and volume agreements and mandatory switching to generics and biosimilars, and that Cyprus is part of the Valletta Declaration group of countries for joint negotiation. The Monitor says giving a medicine that is not on the list is permitted, subject to certain conditions, which it does not set out.",
          links: [
            { label: "Health Systems and Policy Monitor, Cyprus: 2.7.3 and 2.7.4, benefits package and pharmaceuticals", url: HSPM_REGULATION },
            CCP("sections 5.1 and 5.3"),
            { label: "Health Insurance Organisation (GeSY)", url: "https://www.gesy.org.cy/en-us/hioroleandresponsibilities" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Health Systems and Policy Monitor, Cyprus: 5.1 Public health", url: HSPM_PUBLIC_HEALTH },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening every two years for women aged 45 to 74",
          plain:
            "Cyprus has run a breast screening programme since 2003. It invites women aged 45 to 74 by email, and they ask their personal doctor for a referral for a mammogram every two years. The programme's own data show 29% of women of screening age screened in 2022, but a 2019 survey, as the OECD profile reports it, found 66% of women aged 20 to 69 had been screened in the previous two years.",
          detail:
            "The Health Systems and Policy Monitor says the Ministry of Health has run the programme since 2003 for women aged 50 to 69 at centres in each major city, and that a Council of Ministers decision widened the age range to 45 to 74 from 2023; the OECD profile's timeline dates the wider range to 2020. The OECD profile describes the email invitation and referral through the personal doctor, and reports from programme data that 29% of women 'of screening age (usually 50-69 years of age)' had a mammogram in the two years to 2022, against an EU average of 56% in its tracker, while the 2019 European Health Interview Survey found 66% of women aged 20 to 69, the age range as the profile prints it, had been screened within two years, which it attributes to screening outside the programme. The profile says Cyprus also runs a mobile screening programme for breast cancer, and that local authorities and the Ministry of Health provide transport to screening centres for people in remote areas.",
          links: [
            { label: "Health Systems and Policy Monitor, Cyprus: 5.1.3 Screening programmes", url: HSPM_PUBLIC_HEALTH },
            CCP("section 4"),
            { label: "EU Country Cancer Profiles 2025: Cyprus Cancer Performance Tracker (European Cancer Inequalities Registry)", url: CCP_PAGE },
          ],
        },
        {
          id: "bowel-cervical-prostate",
          title: "Bowel screening began in May 2025; cervical and prostate programmes are planned",
          plain:
            "In May 2025 the Ministry of Health launched a free bowel cancer screening programme for GeSY beneficiaries aged 50 to 74, using a stool test done at home every two years. Cervical screening is still done when a doctor recommends it, not by invitation. In February 2026, as Politis reported, the Health Minister said programmes for prostate and cervical cancer were being planned.",
          detail:
            "The Health Systems and Policy Monitor's update of 11 May 2025 says the Ministry posts an invitation with a faecal immunochemical test kit; the person asks their GP for a referral through the GeSY system, returns the sample to a public hospital or health centre, and all samples are tested at the microbiology laboratory of Limassol General Hospital. A negative result brings a new invitation after two years; after a positive result the GP refers to a gastroenterologist for colonoscopy. Cyprus Mail reported the launch on 15 May 2025 with a budget of EUR 1 million. Before the programme, the OECD profile says, 22% of people aged 50 to 74 had had a bowel screening test in 2019. For cervical cancer it describes screening by smear or HPV test on a doctor's recommendation, with 69% of women reporting a test within three years in 2019 (79% with higher education, 50% with lower), a planned population-based programme and a National Cancer Strategy target of 80%. It says the goal discussed in parliament in 2024 was a prostate screening programme set up in 2025; OnCo read no source saying one has started.",
          links: [
            { label: "Health Systems and Policy Monitor: national screening programme for colorectal cancer (11 May 2025)", url: HSPM_CRC },
            { label: "Cyprus Mail: government launches free bowel cancer screening (15 May 2025)", url: CM_CRC },
            CCP("section 4"),
            { label: "Politis: the Health Minister's figures and plans (7 February 2026)", url: POLITIS_2026 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination for girls since 2016 and for boys since 2020",
          plain:
            "Cyprus has offered the HPV vaccine free to girls aged 12 since 2016 and to boys as well since 2020. WHO's figures for 2024 give 83% of girls a first dose and 89% the last dose, and 69% and 70% of boys. Its 2025 figures are lower: 71% and 54% for girls. WHO's last-dose figure is above its first-dose figure for 2023 and 2024, and for girls in 2022, and the data do not say why.",
          detail:
            "The OECD profile says the vaccine was made free for girls aged 12 in 2016, extended to girls and boys aged 11 to 13 in 2020 (the Health Systems and Policy Monitor says 11 to 12, through GeSY), offered as a catch-up to people up to 19 until the end of 2023, and extended in 2022 to immunocompromised men and women aged 18 to 26. It reports that 67% of girls had received all doses by age 15 in 2023, against an EU average of 64%, and 50% of boys. WHO's immunisation data give HPV programme coverage among females, first and last dose, of 84% and 84% in 2021, 70% and 73% in 2022, 76% and 92% in 2023, 83% and 89% in 2024, and 71% and 54% in 2025; among males 53% and 53% in 2021, 59% and 53% in 2022, 66% and 79% in 2023, 69% and 70% in 2024, and 60% and 44% in 2025. WHO's 2025 row counts 3,434 first doses among a target of 4,813 girls. In 2023 and 2024 WHO's rows give more last doses than first doses for both sexes (for girls in 2024, 4,349 against 4,063), and in 2022 for girls (3,422 against 3,256), which is why last-dose coverage exceeds first-dose coverage in those rows; the figures are shown as WHO gives them.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Cyprus (data API)", url: WHO_HPV_API },
            CCP("section 3, Box 2"),
            { label: "Health Systems and Policy Monitor, Cyprus: 5.1 Public health", url: HSPM_PUBLIC_HEALTH },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Cyprus does differently",
      cards: [
        {
          id: "centres",
          title: "Two cancer centres: the Bank of Cyprus Oncology Centre in Nicosia and a private one in Limassol",
          plain:
            "The OECD's 2025 profile says the Bank of Cyprus Oncology Centre in Nicosia manages over 80% of cancer cases each year. It opened in 1998 under an agreement between the Republic of Cyprus and the Bank of Cyprus. A private centre, the German Oncology Center in Limassol, has since grown into a hospital called the German Medical Institute, and has joined GeSY.",
          detail:
            "The Bank of Cyprus Oncology Centre's own page says the agreement to create it was signed in November 1992 and that it has operated since September 1998, with three clinics, for radiation oncology and nuclear medicine, medical oncology, and diagnostic and interventional radiology, accreditation from the British body CHKS and ISO 9001 certification. The OECD profile says the Centre manages over 80% of newly diagnosed cases each year and describes it as essentially operating as a public oncology centre; the Health Systems and Policy Monitor counts 32 beds. The German Medical Institute's site says the German Oncology Center first opened its doors in 2018 and within five years became a full hospital under the new name; the Monitor dates its start to 2017, counts 27 beds and says it has joined GeSY. The OECD profile says oncology clinics are concentrated in Nicosia and Limassol, with oncologists visiting other public hospitals at regular intervals, and that one institution treats children and adolescents with cancer.",
          links: [
            { label: "Bank of Cyprus Oncology Centre: about us (in Greek)", url: BOCOC_ABOUT },
            { label: "German Medical Institute, Limassol", url: GMI_HOME },
            { label: "Health Systems and Policy Monitor, Cyprus: 4.1 Physical resources", url: HSPM_PHYSICAL },
            CCP("sections 5.1, 5.2 and 6"),
          ],
        },
        {
          id: "radiotherapy",
          title: "Two radiotherapy centres with ten high-energy treatment machines",
          plain:
            "The International Atomic Energy Agency's directory lists two radiotherapy centres in Cyprus with ten high-energy external beam machines between them. The OECD profile says the supply of machines matches the EU average for the population, but that they are in the main cities, so people from rural areas travel for treatment.",
          detail:
            "IAEA's DIRAC country row for Cyprus, marked as last updated in 2025, gives 2 radiotherapy centres, 10 in its field for high-energy photon and electron beam radiotherapy, 3 in its brachytherapy field and 1 X-ray generator; DIRAC's public summary does not name the centres. The OECD profile says Cyprus had 0.8 operational machines per 100,000 inhabitants in 2020, counting linear accelerators and other external beam and brachytherapy units, which matches the EU average after investment mainly in the private sector, and that most are in major urban centres, so patients from rural areas travel and pay for accommodation, in most cases at their own expense. The Bank of Cyprus Oncology Centre's page describes three-dimensional conformal, intensity-modulated (IMRT and VMAT) and image-guided radiotherapy, stereotactic radiotherapy since October 2019, brachytherapy mainly for gynaecological tumours, and radioactive iodine treatment for thyroid cancer.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            CCP("section 5.1"),
            { label: "Bank of Cyprus Oncology Centre: radiation oncology (in Greek)", url: BOCOC_RT },
          ],
        },
        {
          id: "plan",
          title: "A cancer strategy from 2009, updated in 2019, and a National Cancer Institute set up by law in 2026",
          plain:
            "The Ministry of Health published Cyprus's first National Cancer Control Strategy in November 2009 and updated it in 2019. In March 2026 a law was adopted to set up a National Cancer Institute, which is to co-ordinate cancer policy, write clinical guidelines, support the registry and check the quality of care.",
          detail:
            "In the Ministry's English text of the 2009 strategy, the Minister of Health's introductory note calls it the state's first organised response to cancer and names four pillars: prevention, early diagnosis and therapy, research and rehabilitation. The OECD profile says the 2019 update set out to organise all cancer resources into one network, build shared data, organise prevention country-wide, promote research and improve care, with a National Cancer Institute, wider screening and an upgraded registry among its measures; it judges the strategy partly aligned with Europe's Beating Cancer Plan, with prevention and inequalities less emphasised. The government announced funding for the Institute in December 2023 and pledged EUR 1.2 million. The Health Systems and Policy Monitor's update of 7 April 2026 reports that legislation adopted in March 2026 establishes the Institute as an autonomous scientific body, with a national quality assurance framework as a central role. The profile also says the Cyprus Cancer Research Institute, founded by the University of Cyprus, the Bank of Cyprus Oncology Centre and the Karaiskakio Foundation, became operational in 2019.",
          links: [
            CCP("sections 2, 5.2 and 5.3"),
            { label: "Health Systems and Policy Monitor, Cyprus: new legislation establishes the National Cancer Institute (7 April 2026)", url: HSPM_SPECIALISED },
            { label: "Ministry of Health: National Cancer Control Strategy, November 2009 (English PDF, ICCP portal)", url: STRATEGY_2009 },
          ],
        },
        {
          id: "rights",
          title: "A right to be forgotten, paid fertility preservation, and more doctors but fewer nurses than the EU average",
          plain:
            "A law passed in November 2023 stops banks and insurers from holding a past cancer against someone ten years after treatment ends, or five years for people under the age of 21. The state pays 85% of the cost of preserving fertility before treatment. Cyprus has more doctors but fewer nurses for each new cancer case than the EU average.",
          detail:
            "The OECD profile says the law on the right to be forgotten, covering bank credit and life insurance, was passed unanimously in November 2023, and that fertility preservation before active treatment is covered at 85% by the government with the rest paid by the patient. It counts 1,017 physicians per 1,000 new cancer cases against an EU average of 679, and 1,040 nurses against 1,376. It says palliative care has been undersupplied, that the government works with non-governmental organisations to support palliative care facilities in four cities, and that a law on palliative care was being prepared; the Health Minister said in February 2026, as Politis reported, that a Palliative Care Bill had been submitted to parliament. It also reports that multidisciplinary teams have been introduced for treatment decisions, that waiting times are not systematically reported, and that 82% of 68 medicines identified as essential for children with cancer were available in 2018, against 76% in the EU.",
          links: [
            CCP("sections 5.1, 5.2, 5.4 and 6"),
            { label: "Politis: the Health Minister's figures and plans (7 February 2026)", url: POLITIS_2026 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Cyprus", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "One trial in OnCo's records lists a site in Cyprus",
          plain:
            "One trial in OnCo's records includes Cyprus among its countries: EORTC 22991, a completed phase 3 trial of radiotherapy with or without hormone treatment for prostate cancer, which lists the Bank of Cyprus Oncology Centre in Nicosia. OnCo holds a selection of trials, not the whole registry, so this is not a count of research in Cyprus.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: one trial lists Cyprus, and none is recruiting. ClinicalTrials.gov's record for NCT00021450, sponsored by the European Organisation for Research and Treatment of Cancer, lists the Bank of Cyprus Oncology Centre among 20 locations and gives the status as completed. The link at the side of this section searches the registry itself for cancer studies with a site in Cyprus. The OECD profile describes the Cyprus Cancer Research Institute as a hub for researchers and, in its section on children's cancer, notes the absence of any clinical trial enrolling children with cancer in Cyprus.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Cyprus", url: CTGOV },
            { label: "EORTC 22991 (NCT00021450)", url: "https://clinicaltrials.gov/study/NCT00021450" },
            CCP("sections 5.2 and 6"),
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry",
      title: "The registry's recent reports were not read",
      plain:
        "The Ministry of Health's websites refused OnCo's requests, so the Cyprus Cancer Registry's reports for years after 2016 were not read. The one figure for 2018 to 2022 on this page comes from the Health Minister's speech as a newspaper reported it, not from the registry's own publication.",
      detail:
        "On 16 November 2026 www.moh.gov.cy answered with a server error and www.gov.cy/moh with a 403 from its firewall. The registry's summary for 1998 to 2016 was read from an Internet Archive copy of 17 February 2024; an earlier copy of the same file was truncated. The Cyprus News Agency's report of the Minister's figures is behind a paywall, and Politis's version was read instead. A Cyprus Mail report of 4 November 2026 on an appeal by a patients' association prints a registry count of prostate cancers for 2018 to 2022 and, separately, a yearly average without stating its years; the two do not match and neither is attributed to a named speaker, so OnCo does not repeat them. OnCo found no national survival figures; the OECD profile says none are produced systematically. OnCo did not read the European Cancer Information System's own data pages; its 2022 estimate is given here only as the OECD profile quotes it.",
      links: [
        REGISTRY_LINK,
        { label: "Politis: Cyprus records 4,260 new cancer cases annually (7 February 2026)", url: POLITIS_2026 },
        { label: "Cyprus Mail: men urged to seek early prostate cancer screening (4 November 2026)", url: CM_PROSTATE_2026 },
        { label: "European Cancer Information System", url: "https://ecis.jrc.ec.europa.eu" },
      ],
    },
    {
      id: "gap-estimates",
      title: "Figures that disagree between sources",
      plain:
        "IARC's estimate of 6,015 new cancers in 2024 is much higher than the average of 4,260 a year for 2018 to 2022 that the Health Minister gave in a speech Politis reported on 7 February 2026, and OnCo could not find the reason. The share of health spending paid out of pocket also differs between the World Bank, the OECD and the European Observatory.",
      detail:
        "IARC's fact sheet gives the same number, 6,015, for all cancers with and without non-melanoma skin cancer. The European Cancer Information System's estimate quoted by the OECD, 4,637 for 2022, is closer to the Minister's figure than to IARC's. For out-of-pocket spending the World Bank gives 18.0% of current health spending in 2022, the OECD profile 30% in 2022, and the Health Systems and Policy Monitor 10% in 2021; this page shows the World Bank series and names the others. Sources also give different starting years for the German Oncology Center (2017 in the Health Systems and Policy Monitor, 2018 on the German Medical Institute's site) and for the registry (operating since 1990 with data from 1998 in its own summary, 1998 in the OECD profile).",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Cyprus (PDF)", url: IARC_FACTSHEET },
        { label: "World Bank: out-of-pocket expenditure, Cyprus", url: WB_OOP },
        CCP("sections 2 and 5.1"),
        { label: "Health Systems and Policy Monitor, Cyprus: 3.4 Out-of-pocket payments", url: HSPM_OOP },
      ],
    },
    {
      id: "gap-sources",
      title: "Other sources not read, and things not found",
      plain:
        "OnCo did not read the Pharmaceutical Services' own pages, the 2019 text of the National Cancer Strategy, the GeSY list of reimbursed medicines or any report on how many people have taken up bowel screening. No named person's current role was confirmed from a primary source, so no people were added.",
      detail:
        "The Pharmaceutical Services' web address redirects to www.gov.cy/moh-phs, which answered 403; its role is described here from the Health Systems and Policy Monitor, and its location in Nicosia is taken from the European Medicines Agency's list of national competent authorities. The cancer strategy was read only in its 2009 English text on the ICCP portal; the 2019 update is described from the OECD profile. The Health Insurance Organisation's page on co-payments is written in the future tense and carries a 2018 to 2022 copyright line, so the amounts should be checked. The Monitor's table of co-payment caps is an image and was not read. OnCo read no source of its own for whether the Bank of Cyprus Oncology Centre is contracted with GeSY; the OECD profile describes it as essentially operating as a public oncology centre. The German Oncology Center's former address, www.goc.com.cy, no longer resolves; the German Medical Institute's site was read instead. DIRAC's fields are reported under IAEA's own names, and its row has a separate field for linear accelerators that reads zero, which OnCo does not interpret. OnCo found no published uptake for the bowel screening programme, no source confirming that a cervical or prostate programme has started, and no machine counts published by the two centres themselves.",
      links: [
        { label: "Health Systems and Policy Monitor, Cyprus: 2.7 Regulation", url: HSPM_REGULATION },
        { label: "Health Insurance Organisation: co-payments", url: GESY_FINANCING },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
      ],
    },
  ],
  institutions: [
    "cyprus-cancer-registry",
    "cyprus-health-insurance-organisation",
    "cyprus-pharmaceutical-services",
    "bank-of-cyprus-oncology-centre",
    "german-oncology-center-limassol",
    "ema",
  ],
  companies: [],
  drugs: [],
  trials: ["eortc-22991"],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: the OECD and European Commission's 2025 Country Cancer Profile for Cyprus, the Cyprus Cancer Registry's summary for 1998 to 2016 (in Greek, through the Internet Archive), the European Observatory's Health Systems and Policy Monitor, the Health Insurance Organisation's site, the Bank of Cyprus Oncology Centre's pages (in Greek), the German Medical Institute's site, reports in Politis and Cyprus Mail, the Ministry of Health's 2009 strategy, the EMA's leaflet, WHO's immunisation data, the World Bank, IAEA's DIRAC and IARC's GLOBOCAN 2024 fact sheet. The two papers were resolved by DOI through Europe PMC and their figures read from the abstracts. The Ministry of Health's own sites refused a plain request and were not read directly. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "The registry's recent counts on this page are second-hand; check the Ministry of Health's Health Monitoring Unit for its latest report. Co-payments, the list of reimbursed medicines and screening ages change; the Health Insurance Organisation and the Ministry of Health publish the current rules.",
  verifyLinks: [
    { label: "Health Insurance Organisation (GeSY)", url: "https://www.gesy.org.cy/en-us/home-en" },
    { label: "EU Country Cancer Profiles 2025 (European Cancer Inequalities Registry)", url: CCP_PAGE },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Cyprus (PDF)", url: IARC_FACTSHEET },
  ],
};
