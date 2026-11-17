import type { CountryDive } from "@/data/country-dive";

/**
 * Albania deep dive: the hand-written cards for /countries/al/ (wave 13). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: the Institute of Public Health's (ISHP) first national report on
 * cancers, 2015 to 2019 (PDF, in Albanian), its World Cancer Day statements with the 2023 and 2024 counts, its breast
 * cancer summary for 2022 and its evaluation of the first year of cervical screening (PDF, in English); the Compulsory
 * Health Care Insurance Fund's (FSDKSH) overview, history and reimbursed medicines pages, its List I for hospital
 * pharmacies 2026 (PDF) and Council of Ministers decision no. 324 of 6 May 2026 in the Official Gazette (PDF); the
 * medicines agency's (AKBPM) mission and register pages; the National Health Strategy 2021 to 2030 and the programme for
 * non-communicable diseases 2021 to 2030 (PDFs on WHO's document servers, in Albanian); the oncology service page of the
 * University Hospital Centre "Mother Teresa"; WHO Europe's 2020 account of cervical screening; UNFPA Albania's 2022 notice
 * on HPV vaccination; three IAEA documents (two news articles read through the Internet Archive because iaea.org refused
 * a plain request, and the technical cooperation country sheet); WHO's Cancer Country Profile 2020 (data for 2018 to
 * 2020); the IAEA DIRAC country row, WHO's HPV coverage rows and the World Bank's health spending series; IARC's GLOBOCAN
 * 2024 fact sheet for Albania; and ClinicalTrials.gov's API. Albanian sources were read in Albanian. What could not be
 * read or found is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/8-albania-fact-sheet.pdf";
const ISHP_REPORT = "https://www.ishp.gov.al/wp-content/uploads/2025/09/RAPORTI-KANCER-2015-2019-Fin-2021-edited.pdf";
const ISHP_WCD_2026 = "https://www.ishp.gov.al/4-shkurt-2026-dita-boterore-e-kancerit/";
const ISHP_WCD_EARLIER = "https://www.ishp.gov.al/dita-boterore-e-kancerit/";
const ISHP_BREAST_2022 = "https://ishp.gov.al/wp-content/uploads/2024/11/Permbledhjeper-Kancerin-e-Gjirit-pe-vitin-2022.pdf";
const ISHP_CERVICAL_EVAL = "https://www.ishp.gov.al/wp-content/uploads/2021/06/2report-evaluation-screening-program-final-2020.pdf";
const WHO_PROFILE_2020 = "https://www.who.int/docs/default-source/documents/health-topics/cancer/global-country-profiles-on-burden-of-cancer-a-to-k.pdf";
const HEALTH_STRATEGY = "https://extranet.who.int/countryplanningcycles/sites/default/files/public_file_rep/ALB_Albania_RENJK-National-Health-Strategy_2021-2030.pdf";
const NCD_PROGRAMME = "https://extranet.who.int/ncdccs/Data/ALB_B3_S23_Programi-i-Parandalimit-dhe-Kontrollit-te-Semundjeve-Jo-te-Transmetueshme-SJT-2021-2030.pdf";
const FSDKSH_OVERVIEW = "https://fsdksh.gov.al/panorame%cc%88-e-pe%cc%88rgjithshme/";
const FSDKSH_HISTORY = "https://fsdksh.gov.al/historiku/";
const FSDKSH_LISTS = "https://fsdksh.gov.al/project/lista-e-barnave/";
const FSDKSH_LIST_I = "https://fsdksh.gov.al/wp-content/uploads/2019/10/I-LISTA-E-BARNAVE-QE-TREGTOHEN-NE-FARMACITE-E-SPITALEVE-2026.pdf";
const VKM_324 = "https://fsdksh.gov.al/wp-content/uploads/2019/10/FZ-2026-100-VKM-324-06052026.pdf";
const AKBPM_MISSION = "https://akbpm.gov.al/akbpm-3/misioni/";
const AKBPM_REGISTER = "https://akbpm.gov.al/regjistri-i-barnave/";
const QSUT_ONCOLOGY = "https://www.qsut.gov.al/departments/sherbimi-i-onkologjise/";
const WHO_EURO_CERVICAL = "https://www.who.int/europe/news/item/17-11-2020-albania-upgrades-its-cervical-cancer-screening-programme-with-who-s-support";
const UNFPA_HPV = "https://albania.unfpa.org/en/news/human-papilloma-virus-vaccine-now-available-public-health-centers";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ALB'%20and%20startswith(ANTIGEN,'PRHPV')";
const IAEA_2017 = "https://web.archive.org/web/20201001034049/https://www.iaea.org/newscenter/news/albania-enhances-radiotherapy-treatment-for-cancer-patients-with-iaea-support";
const IAEA_2018 = "https://web.archive.org/web/20250711100126/https://www.iaea.org/newscenter/news/ten-years-of-bringing-hope-to-cancer-patients-in-albania-with-iaea-support";
const IAEA_TC = "https://www.iaea.org/sites/default/files/21/02/tc-albania.pdf";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=AL";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=AL";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=AL";
const WB_POP = "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=AL";
const CTGOV = "https://clinicaltrials.gov/search?cond=cancer&country=Albania";

export const AL_DIVE: CountryDive = {
  iso2: "AL",
  iso3: "ALB",
  name: "Albania",
  flag: "🇦🇱",
  asOf: "2026-11-16",
  title: "Cancer in Albania",
  description:
    "Cancer in Albania from Albanian sources: a national registry at the Institute of Public Health that counted 7,076 new cancers in 2024, IARC's higher estimate of 9,176 cases and 4,891 deaths, a single public insurance fund while households pay 48% of health spending themselves, a 2026 reimbursement list that names modern cancer medicines, cervical screening by HPV self-sampling, and a university hospital in Tirana that the IAEA described in 2018 as the only public provider of radiotherapy.",
  lede:
    "Albania counts its cancers through a registry at the Institute of Public Health, which recorded 7,076 new cases in 2024. Care is paid for through one public insurance fund, yet the World Bank's series puts household out-of-pocket payments at 48% of health spending in 2023. The IAEA wrote in 2018 that the University Hospital Centre \"Mother Teresa\" in Tirana was the only public hospital providing radiotherapy.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Albania is 9,176 new cancers and 4,891 deaths, an age-standardised incidence of 191.1 per 100,000 (203.5 in men, 180.6 in women) and mortality of 91.7 (114.2 in men, 71.8 in women). IARC's fact sheet names a national registry as the source for incidence, with national rates applied to the 2024 population. For deaths it says \"No data\": mortality is modelled from the incidence estimate using mortality-to-incidence ratios built on registry data from neighbouring countries, so the death figures are not counts made in Albania. The Institute of Public Health's own count for 2024 is 7,076 new cancers, about 2,100 fewer than IARC's estimate. The two are not built the same way: the institute's report describes its figure as incidence seen in hospitals and says some cases never reach its registry, and IARC's fact sheet uses a population of 2,791,771 where the World Bank's series gives 2,377,128 for 2024. IARC's rates are age-standardised to the world population; the institute publishes crude rates per 100,000 residents, which are not comparable with IARC's.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Albania",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Albania (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "Lung cancer is the commonest cancer and causes the most deaths",
          plain:
            "IARC estimates 9,176 new cancers and 4,891 cancer deaths in Albania in 2024. Lung cancer leads in both. Breast and bowel cancer come next in new cases, and bowel cancer causes more deaths than breast cancer. Among women, breast cancer is the commonest cancer. The Institute of Public Health says cancer is the second cause of death in Albania after heart disease.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet gives 1,443 lung cancers (1,275 deaths), 1,253 breast cancers (314 deaths), 1,050 colorectal cancers (467 deaths), 535 prostate cancers (170 deaths) and 482 bladder cancers (140 deaths). Men account for 4,882 of the new cases and 2,915 of the deaths, women for 4,294 and 1,976. IARC puts the risk of developing cancer before age 75 at 20.1% and counts 22,833 people living within five years of a diagnosis. The Institute of Public Health's World Cancer Day statement for 2026 says cancers have made up about 15% of all deaths each year over the last ten years, 15.3% in 2024 against 21.6% in the countries of the European Union, and that cancer remains the second cause of death after heart disease. IARC's death figures for Albania are modelled, not counted; see the note under the table below.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Albania (PDF)", url: IARC_FACTSHEET },
            { label: "ISHP: World Cancer Day, 4 February 2026 (in Albanian)", url: ISHP_WCD_2026 },
          ],
        },
        {
          id: "registry",
          title: "A national registry at the Institute of Public Health, fed by hospitals since 2015",
          plain:
            "The Institute of Public Health (Instituti i Shëndetit Publik, ISHP) keeps Albania's cancer registry. Public and private hospitals have reported each newly diagnosed case to it since 2015. It counted 5,472 new cancers in 2015, 6,326 in 2019 and 7,076 in 2024.",
          detail:
            "ISHP's first national report on cancers (Raporti kombëtar mbi sëmundjet tumorale, Tirana 2021) says the registry is case-based, with an individual record for each diagnosis. Data exist from 2014, when the new reporting system began at two hospitals, the University Hospital Centre \"Mother Teresa\" and the \"Shefqet Ndroqi\" hospital; 2015 is the first year in which hospitals across the whole country reported. The report states that what it presents is incidence as seen in hospitals, not incidence measured in the population, and lists how cases can be missed: people who do not seek care, deaths at home at older ages, and treatment abroad. It adds that cancers are still coded to ICD-9 in Albania and that deaths come from the death certificate system run by INSTAT, the statistics institute. New cases rose 16% between 2015 and 2019 while hospital admissions for cancer rose more than 70%. WHO's Cancer Country Profile 2020 recorded the registry's status in 2019 as \"Registration activity\" and noted that its incidence estimates for Albania were not based on a population-based registry.",
          links: [
            { label: "ISHP: national report on cancers, 2015 to 2019 (PDF, in Albanian)", url: ISHP_REPORT },
            { label: "ISHP: World Cancer Day, 4 February 2026 (in Albanian)", url: ISHP_WCD_2026 },
            { label: "WHO: Cancer Country Profiles 2020, A to K (PDF; Albania is on pages 7 and 8)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "iarc-method",
          title: "IARC's estimate is about 2,100 cases higher than the registry's count",
          plain:
            "For 2024 the national registry counted 7,076 new cancers and IARC estimated 9,176. IARC built its figure from the registry's rates, but applied them to a larger population than the World Bank reports. IARC had no Albanian death data, so its count of deaths is modelled from neighbouring countries' registries.",
          detail:
            "IARC's fact sheet gives the incidence source as \"Registry (national)\" and the method as \"National rates applied to 2024 population\". For mortality it gives the source as \"No data\" and the method as \"National incidence estimates applied to model-based M:I ratios (neighbouring country registry data)\"; M:I is the ratio of deaths to new cases. The fact sheet's population for Albania is 2,791,771, and the World Bank's series gives 2,377,128 for 2024. OnCo did not find a statement from IARC or ISHP explaining the difference between 9,176 and 7,076, so it reports both and does not choose between them. ISHP's own report says its registry misses some cases, and its breast cancer summary says its rates rest on INSTAT's estimates of the resident population. WHO's Cancer Country Profile 2020 rated the quality of Albania's mortality registration for 2007 to 2016 as low.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Albania (PDF)", url: IARC_FACTSHEET },
            { label: "ISHP: national report on cancers, 2015 to 2019 (PDF, in Albanian)", url: ISHP_REPORT },
            { label: "ISHP: summary on breast cancer for 2022 (PDF, in Albanian)", url: ISHP_BREAST_2022 },
            { label: "World Bank: population, total, Albania", url: WB_POP },
            { label: "WHO: Cancer Country Profiles 2020, A to K (PDF; Albania is on pages 7 and 8)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "breast",
          title: "About 710 to 720 women a year were diagnosed with breast cancer from 2017 to 2022",
          plain:
            "The registry recorded 710 women diagnosed with breast cancer in 2022, a number that had stayed at about 710 to 720 a year since 2017, and 805 in 2024. The median age at diagnosis was 57 in 2022. The institute reports that the breast cancer death rate fell 19% between 2015 and 2022.",
          detail:
            "ISHP's summary on breast cancer for 2022 gives 710 new cases among women, 50.7 per 100,000 women, about 9% above the 2015 rate of 46.0, with the age-standardised rate steady at about 37 per 100,000 from 2015 to 2022 (WHO standard population). The median age at diagnosis rose from 55 in 2015 to 57 in 2022, and more than 73% of new cases in 2022 were diagnosed after age 50: 130 cases at ages 40 to 49, 237 at 50 to 59, 184 at 60 to 69 and 99 at 70 and over. Recorded rates were higher in the counties of Berat, Fier and Vlorë and lower in Kukës, Dibër, Durrës and Shkodër; the summary says problems with identifying or reporting cases may have played a part in the last two. It gives a breast cancer death rate of 13.7 per 100,000 women in 2022, 19% lower than in 2015.",
          links: [
            { label: "ISHP: summary on breast cancer for 2022 (PDF, in Albanian)", url: ISHP_BREAST_2022 },
            { label: "ISHP: World Cancer Day, 4 February 2026 (in Albanian)", url: ISHP_WCD_2026 },
          ],
        },
      ],
      tables: [
        {
          id: "al-registry",
          title: "New cancers recorded by Albania's national registry, ISHP",
          caption: "Newly diagnosed cancers reported to the Institute of Public Health by year, all cancers and four sites, 2015 to 2024.",
          columns: [
            { key: "year", label: "Year" },
            { key: "all", label: "All cancers", numeric: true },
            { key: "lung", label: "Lung", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "bowel", label: "Large bowel", numeric: true },
            { key: "skin", label: "Skin (non-melanoma)", numeric: true },
          ],
          rows: [
            { year: "2015", all: 5472, lung: 777, breast: 653, bowel: 334, skin: 552 },
            { year: "2016", all: 5498, lung: 802, breast: 698, bowel: 328, skin: 644 },
            { year: "2017", all: 6325, lung: 862, breast: 713, bowel: 430, skin: 1034 },
            { year: "2018", all: 6220, lung: 854, breast: 708, bowel: 399, skin: 1080 },
            { year: "2019", all: 6326, lung: 850, breast: 719, bowel: 386, skin: 994 },
            { year: "2023", all: 6691, lung: 717, breast: 744, bowel: null, skin: 1183 },
            { year: "2024", all: 7076, lung: 771, breast: 805, bowel: null, skin: 1216 },
          ],
          note: "Counts of new cases reported by hospitals, not deaths. 2015 to 2019 are from table A.1 of the 2021 report, where the bowel column is the report's \"zorra e trashë\"; 2023 and 2024 are from World Cancer Day statements, which give three sites. The statement with the 2023 figures calls the 1,183 cases skin cancer without saying whether melanoma is included. The report warns that skin cancers were under-reported in 2016 and its table lists 620 cancers in 2015 as undifferentiated (\"padiferencuar\"); the report says a good part of that year's skin cancers were reported as unspecified. OnCo found no published counts for 2020 to 2022 except breast cancer in 2022 (710).",
          sources: [
            { label: "ISHP: national report on cancers, 2015 to 2019, table A.1 (PDF, in Albanian)", url: ISHP_REPORT },
            { label: "ISHP: World Cancer Day statement with 2023 figures (in Albanian)", url: ISHP_WCD_EARLIER },
            { label: "ISHP: World Cancer Day, 4 February 2026, with 2024 figures (in Albanian)", url: ISHP_WCD_2026 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: one public fund, and nearly half of spending from households",
      aside: { label: "FSDKSH: overview of the health insurance scheme (in Albanian)", url: FSDKSH_OVERVIEW },
      cards: [
        {
          id: "scheme",
          title: "A single public payer, funded by contributions and the state budget",
          plain:
            "Albania has one public health insurer, the Compulsory Health Care Insurance Fund (Fondi i Sigurimit të Detyrueshëm të Kujdesit Shëndetësor, FSDKSH). People in work pay contributions and the state budget pays for people who are not working and for groups in need. The fund pays public and private providers and reimburses medicines.",
          detail:
            "The fund's overview describes the scheme as a mixed model, part contributions and part general taxation, with the fund as single payer: anyone who pays a contribution, or for whom the state pays, is insured, and the health card (Karta e Shëndetit) is the proof. It says the scheme covers visits, examinations and treatment in public primary care centres and public hospitals, that copayments apply, and that veterans, pensioners, people with disabilities and other groups in need are exempt from them. The scheme began under Law 7870 of 13 October 1994 and now runs under Law 10 383 of 24 February 2011, in force since March 2013; the fund's history page counts 13 regional directorates and 592 staff. The National Health Strategy 2021 to 2030 says primary care was opened free of charge to uninsured people, about 600,000 of them in 2017. OnCo did not find a fund page that sets out what a person with cancer pays for hospital treatment; see the gaps.",
          links: [
            { label: "FSDKSH: overview of the health insurance scheme (in Albanian)", url: FSDKSH_OVERVIEW },
            { label: "FSDKSH: history (in Albanian)", url: FSDKSH_HISTORY },
            { label: "National Health Strategy 2021 to 2030 (PDF on WHO's server, in Albanian)", url: HEALTH_STRATEGY },
          ],
        },
        {
          id: "out-of-pocket",
          title: "Households paid 48% of health spending themselves in 2023",
          plain:
            "The World Bank's series puts out-of-pocket payments at 48.3% of Albania's health spending in 2023, down from 59.7% in 2021. Health spending was about US$591 a person in 2023. The government's health strategy aims to bring the out-of-pocket share down to 35% by 2030.",
          detail:
            "The World Bank's series, drawn from WHO's health expenditure database, gives out-of-pocket spending as 56.4% of current health expenditure in 2019, 59.4% in 2020, 59.7% in 2021, 48.3% in 2022 and 48.3% in 2023; domestic government spending as 39.7% of the total in 2021 and 49.6% in 2023; current health expenditure as 7.05% of GDP in 2023; and spending per person as US$590.63. These cover all care, not cancer alone. The National Health Strategy 2021 to 2030 cites national data for 2016 in which households paid 48% of health spending, and sets a target of 35% by 2030; one of its measures is titled a reduction to under 30%. The strategy also says the budget for reimbursed medicines grew from 8.3 billion lek in 2013 to 11 billion lek in 2020, with cancer treatment among the stated priorities, and that 191 medicines were added to the reimbursed list from 2014.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Albania", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Albania", url: WB_PC },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Albania", url: WB_GOV },
            { label: "National Health Strategy 2021 to 2030 (PDF on WHO's server, in Albanian)", url: HEALTH_STRATEGY },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and reimbursement: the medicines agency, then a government list",
      aside: { label: "FSDKSH: reimbursed medicines lists (in Albanian)", url: FSDKSH_LISTS },
      cards: [
        {
          id: "akbpm",
          title: "The medicines agency applies the law on placing medicines on the market",
          plain:
            "The National Agency for Medicines and Medical Devices (Agjencia Kombëtare e Barnave dhe Pajisjeve Mjekësore, AKBPM) is Albania's medicines regulator. It applies the law on placing medicines on the market, runs side-effect reporting, inspects medicines and devices, and publishes the register of medicines.",
          detail:
            "The agency's mission page says it carries out the legal duties for placing on the market, export, trade and use of medicines and medical devices; takes the actions needed for pharmacovigilance; approves the format of medicines advertising; registers medical devices; inspects medicines and devices; and proposes changes in the law to the ministry responsible for health. Its register of medicines is published as a spreadsheet. The 2026 government decision on reimbursement cites Law 105/2014 on medicines and pharmaceutical service as the governing law. The agency's page for its marketing authorisation sector carried no text when OnCo read it, so how a cancer medicine's national authorisation is assessed, how it relates to approvals made elsewhere, and how long it takes are not described here; see the gaps.",
          links: [
            { label: "AKBPM: mission (in Albanian)", url: AKBPM_MISSION },
            { label: "AKBPM: register of medicines (in Albanian)", url: AKBPM_REGISTER },
            { label: "Council of Ministers decision no. 324 of 6 May 2026, Official Gazette no. 100 (PDF, in Albanian)", url: VKM_324 },
          ],
        },
        {
          id: "reimbursement",
          title: "The government approves the reimbursed list; cancer medicines are covered at 90% to 100%",
          plain:
            "Which medicines the public fund pays for is set by a decision of the Council of Ministers. The current decision, of 6 May 2026, approves two lists, one for hospital pharmacies and one for community pharmacies, and sets the share of the price the fund covers. For cancer medicines that share is 90% to 100%.",
          detail:
            "Decision no. 324 of 6 May 2026, published in the Official Gazette on 15 May 2026, approves List I (medicines dispensed in hospital pharmacies) and List II (medicines reimbursed through community pharmacies) on the proposal of the health minister, and replaces decision no. 491 of 24 July 2024. It sets coverage between 50% and 100% by therapeutic group; its coverage table gives 90% to 100% for antineoplastics (ATC group L01), with 44 rows at 100% and methotrexate tablets at 90%. It fixes trade margins of 8% for wholesale and 24% for retail, bases prices on those approved for 2026 under the Medicines Price Commission set up in 2014, and charges the fund with setting restrictions on use, quantity and duration, with reaching price-reduction agreements with marketing authorisation holders, and with updating the list each January. The fund's site also carries a notice to pharmaceutical companies about completing files for managed entry agreements. OnCo did not find a published description of how a company applies for a medicine to be listed or of any health technology assessment step.",
          links: [
            { label: "Council of Ministers decision no. 324 of 6 May 2026, Official Gazette no. 100 (PDF, in Albanian)", url: VKM_324 },
            { label: "FSDKSH: reimbursed medicines lists (in Albanian)", url: FSDKSH_LISTS },
            { label: "FSDKSH: history page, with the notice on managed entry agreement files (in Albanian)", url: FSDKSH_HISTORY },
          ],
        },
        {
          id: "cancer-medicines",
          title: "The 2026 hospital list names targeted and immune therapies, each with conditions",
          plain:
            "The fund's 2026 list for hospital pharmacies includes modern cancer medicines such as pembrolizumab, nivolumab, trastuzumab, osimertinib and palbociclib at no charge to the patient. Each carries a condition, such as the cancer type it is paid for, and each is paid for only with a consultation at the oncology service of the University Hospital Centre in Tirana, most of them also under that service's monitoring.",
          detail:
            "List I for 2026 shows a reference price, the patient's price and the reimbursed amount for each product, and a restrictions column. Pembrolizumab is listed for unresectable melanoma and triple-negative breast cancer; nivolumab for advanced or metastatic melanoma, advanced or metastatic non-small cell lung cancer without EGFR or ALK mutations, and advanced or metastatic high-risk renal cell carcinoma; trastuzumab for HER2 3+ breast cancer; osimertinib for non-small cell lung cancer with activating EGFR mutations, as adjuvant treatment or in advanced or metastatic disease; and palbociclib for receptor-positive metastatic breast cancer (the list adds \"HER negativ\") after at least three lines of treatment have failed. Each of these rows shows a patient price of 0.00 and the wording \"with consultation and under the monitoring and responsibility of the Oncology Service at QSUT\" or close to it. Where several brands of one medicine are listed, the fund pays up to the lowest price: for capecitabine 500 mg the reimbursed amount is 19.52 for every brand, so the patient's price ranges from 0.00 to 78.89 by brand (the list does not print the currency). The list covers medicines dispensed through hospital pharmacies; OnCo did not read how infused chemotherapy bought by hospitals is funded.",
          links: [
            { label: "FSDKSH: List I, medicines dispensed in hospital pharmacies, 2026 (PDF, in Albanian)", url: FSDKSH_LIST_I },
            { label: "FSDKSH: reimbursed medicines lists (in Albanian)", url: FSDKSH_LISTS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "ISHP: evaluation of the first year of the cervical screening programme (PDF)", url: ISHP_CERVICAL_EVAL },
      cards: [
        {
          id: "cervical",
          title: "Cervical screening by HPV test since 2019, with a kit women can use themselves",
          plain:
            "Since 2019 Albania has screened women in their forties for cervical cancer with an HPV test at their local health centre. Women can take the sample themselves. The test and any follow-up examinations in public services are free whether or not the woman is insured.",
          detail:
            "ISHP's evaluation of the first year says the programme rests on Council of Ministers decree no. 47 of 30 January 2019, uses high-risk HPV testing as the primary test, and initially targets women aged 40 to 50, with the goal of offering the test to all of them within five years. Samples are tested at ISHP's molecular biology laboratory. By 1 December 2019 about 13,900 kits had been distributed and more than 12,300 samples collected; 6.1% were positive for high-risk HPV, results reached women in 25 days on average, and 58% of participants lived in rural areas. Of women who went on to colposcopy, more than one in three chose a private clinic and 8% went abroad, typically to Greece or Italy. WHO Europe's 2020 account says screening before 2019 was opportunistic Pap testing, that a 1,000-woman pilot ran in the Fier region in 2017, and that 15,000 women aged 44 or 49 received kits each year. UNFPA Albania said in November 2022 that more than 40,000 women had been screened since 2019, that the pandemic almost halted the programme in 2020, and that the target was 20,000 women a year. The programme for non-communicable diseases 2021 to 2030 sets a target of at least 60% of the target population screened. OnCo found no published coverage figure after 2022.",
          links: [
            { label: "ISHP: evaluation report of the first year, national cervical cancer programme (PDF)", url: ISHP_CERVICAL_EVAL },
            { label: "WHO Europe: Albania upgrades its cervical cancer screening programme (17 November 2020)", url: WHO_EURO_CERVICAL },
            { label: "UNFPA Albania: HPV vaccine now available in public health centres (5 November 2022)", url: UNFPA_HPV },
            { label: "Programme for non-communicable diseases 2021 to 2030 (PDF on WHO's server, in Albanian)", url: NCD_PROGRAMME },
          ],
        },
        {
          id: "breast-bowel-screening",
          title: "Free mammography, including two mobile units, and bowel screening inside the basic check-up",
          plain:
            "Albania's health strategy for 2021 to 2030 describes a national breast screening programme that gives women free mammograms on hospital machines and in two mobile units. The 2021 programme for non-communicable diseases says bowel cancer screening is part of the free basic health check-up for adults. OnCo did not find a published participation rate for either.",
          detail:
            "The National Health Strategy 2021 to 2030 lists a National Breast Cancer Screening Programme and says more than 74,000 women aged 50 to 65 had free mammograms, 33.6% of them in two mobile units and 66.4% on fixed machines at hospitals; it dates the programme's start to 2018 in one passage and to 2020 in the next. Its indicator table gives a baseline of 20,000 women a year having a mammogram and a target of 40,000 a year by 2030. The programme for non-communicable diseases 2021 to 2030 describes mammography screening for women aged 50 to 70 as cost-effective, sets targets of 30,000 to 40,000 women screened a year and at least 10 qualified radiologists, and says the basic health check-up screens for colorectal cancer. The strategy says the free check-up for people aged 35 to 70 was launched in 2016 in one passage and has applied since 2015 in another; the insurance fund's overview page gives the age range as 40 to 65. WHO's Cancer Country Profile 2020 recorded a breast screening programme in 2019.",
          links: [
            { label: "National Health Strategy 2021 to 2030 (PDF on WHO's server, in Albanian)", url: HEALTH_STRATEGY },
            { label: "Programme for non-communicable diseases 2021 to 2030 (PDF on WHO's server, in Albanian)", url: NCD_PROGRAMME },
            { label: "WHO: Cancer Country Profiles 2020, A to K (PDF; Albania is on pages 7 and 8)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination for 13-year-old girls since November 2022, reaching 50% in 2025",
          plain:
            "Albania began vaccinating girls aged 13 against HPV free of charge in November 2022. WHO's figures put coverage among girls at 18% in 2022, 41% in 2023, 43% in 2024 and 50% in 2025. WHO lists no coverage for boys.",
          detail:
            "UNFPA Albania's notice of 5 November 2022 says every girl born in 2009 could be vaccinated free of charge in every health centre, in a national campaign with the Ministry of Health and Social Protection. WHO's immunisation data give HPV programme coverage among females, first dose, of 18% in 2022 (2,761 doses for a target of 15,648), 41% in 2023 (6,402 of 15,606), 43% in 2024 (6,771 of 15,681) and 50% in 2025, for which no dose count or target is given. WHO reports the same percentage for the last dose as for the first in each year, and its rows for males are empty from 2021 to 2025.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Albania (data API)", url: WHO_HPV_API },
            { label: "UNFPA Albania: HPV vaccine now available in public health centres (5 November 2022)", url: UNFPA_HPV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Albania does differently",
      cards: [
        {
          id: "one-centre",
          title: "Public cancer treatment centres on one university hospital in Tirana, with lung cancer managed at another hospital",
          plain:
            "The University Hospital Centre \"Mother Teresa\" (Qendra Spitalore Universitare \"Nënë Tereza\", QSUT) in Tirana treated 90% of all cancer cases, the IAEA wrote in 2018, and the 2026 reimbursement list ties the cancer medicines read for this page to its oncology service. The Institute of Public Health's report names a different hospital, \"Shefqet Ndroqi\", as the reference centre for lung cancer. The oncology service's own page says it was created in November 1969.",
          detail:
            "The hospital's page says the oncology service was created in November 1969 as an oncology clinic, works as a multidisciplinary team with pathology and radiology, includes a gynaecological oncology unit it describes as unique in the public hospital service, and has a surgical oncology unit that serves as a referral point for the whole country in the public sector for breast, melanoma, soft tissue and lymphatic disease. It also mentions oncology units in the districts and a home oncology service. An IAEA article of October 2018 says the hospital treats 90% of all cancer cases and is the only public hospital providing radiotherapy; a later IAEA country sheet puts the hospital's radiotherapy capacity at 20% of the country's cancer patients and 90% of those requiring radiotherapy, so the two IAEA documents do not say the same thing. ISHP's cancer report, published in 2021, says the reference centre for diagnosing and treating lung cancer is the \"Shefqet Ndroqi\" hospital, where the great majority of the country's cases are managed. The National Health Strategy 2021 to 2030 says patients are referred for oncology services to QSUT and to specialty polyclinics and regional hospitals in Berat, Durrës, Elbasan, Korçë, Lezhë, Lushnjë, Shkodër, Vlorë, Fier and elsewhere. The first cancer report says public and private hospitals report to the registry and thanks the Hygeia, American and Salus hospitals among its sources of information.",
          links: [
            { label: "QSUT: oncology service (in Albanian)", url: QSUT_ONCOLOGY },
            { label: "IAEA: Ten years of bringing hope to cancer patients in Albania (5 October 2018, Internet Archive copy)", url: IAEA_2018 },
            { label: "IAEA: technical cooperation country sheet, Albania (PDF)", url: IAEA_TC },
            { label: "ISHP: national report on cancers, 2015 to 2019 (PDF, in Albanian)", url: ISHP_REPORT },
            { label: "National Health Strategy 2021 to 2030 (PDF on WHO's server, in Albanian)", url: HEALTH_STRATEGY },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: two centres in the IAEA directory, and a second linear accelerator for the public radiotherapy department in 2018",
          plain:
            "The IAEA's directory of radiotherapy centres counts two centres in Albania. The radiotherapy department of the University Hospital Centre in Tirana received its first linear accelerator in 2015 and its second in May 2018. The IAEA says waiting times then fell: from three months to four weeks in its country sheet, from two months to two or three weeks in its 2018 article.",
          detail:
            "The IAEA DIRAC country row for Albania, read on 16 November 2026 with a last update of 2026, gives RTCenters 2, a field named HePhotonAndElectronBeamRt (high-energy photon and electron beam units, that is megavoltage machines) of 6, XRayGenerator 1, and BrachyTherapy \"No\"; its separate LinearAccelerator and Co60 fields read 0 in this view, so OnCo does not break the six units down by type. An IAEA article of September 2017 counted five machines: a cobalt-60 unit and a linear accelerator in the hospital's radiotherapy department, one linear accelerator in its neurosurgery department and two in private practice; it said about 7,140 new cancers were reported each year, of which 3,900 needed radiotherapy. It says Austria's government helped acquire the first linear accelerator in 2015. The IAEA's October 2018 article quotes the hospital's chief of radiation oncology that with the second machine the centre could treat about 1,350 cases a year and that the waiting list had fallen from two months to two or three weeks; it quotes the health minister dating the first radiotherapy unit at the hospital to 1966. The IAEA's technical cooperation sheet, which carries no date of its own and lists achievements up to 2023, says the hospital's capacity covers 20% of the country's cancer patients and 90% of those requiring radiotherapy, and that waiting times fell from three months to four weeks.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "IAEA: Albania enhances radiotherapy treatment (14 September 2017, Internet Archive copy)", url: IAEA_2017 },
            { label: "IAEA: Ten years of bringing hope to cancer patients in Albania (5 October 2018, Internet Archive copy)", url: IAEA_2018 },
            { label: "IAEA: technical cooperation country sheet, Albania (PDF)", url: IAEA_TC },
          ],
        },
        {
          id: "plans",
          title: "A cancer control plan for 2011 to 2020; its successor could not be found",
          plain:
            "Albania's first National Cancer Control Plan covered 2011 to 2020. Cancer goals now sit inside the national programme for non-communicable diseases 2021 to 2030 and the National Health Strategy 2021 to 2030. The strategy names a cancer control strategy for 2021 to 2025, which OnCo could not find.",
          detail:
            "ISHP's cervical screening evaluation says the first National Cancer Control Plan 2011 to 2020 was developed and approved by an order of the Minister of Health in 2011, with the IAEA, WHO and UNFPA as partners, and that its first objective was a national programme to reduce breast and cervical cancer mortality. WHO's Cancer Country Profile 2020 recorded an operational national cancer control plan in 2019. The programme for non-communicable diseases 2021 to 2030 commits to strengthening population screening for cervical and breast cancer in line with the cancer control action plan, adapting colorectal screening within the basic check-up, strengthening the cancer registry and reporting stage at diagnosis. The National Health Strategy 2021 to 2030 lists a \"Strategjia Kombëtare e Kontrollit të Kancerit 2021-2025\" and its action plan among related strategies. OnCo did not find that document on the servers it could read, and the ministry's own site refused a plain request; see the gaps.",
          links: [
            { label: "ISHP: evaluation report of the first year, national cervical cancer programme (PDF)", url: ISHP_CERVICAL_EVAL },
            { label: "Programme for non-communicable diseases 2021 to 2030 (PDF on WHO's server, in Albanian)", url: NCD_PROGRAMME },
            { label: "National Health Strategy 2021 to 2030 (PDF on WHO's server, in Albanian)", url: HEALTH_STRATEGY },
            { label: "WHO: Cancer Country Profiles 2020, A to K (PDF; Albania is on pages 7 and 8)", url: WHO_PROFILE_2020 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Albania", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Albania; the registry lists 12 cancer studies",
          plain:
            "None of the trials OnCo holds lists a site in Albania. OnCo holds a selection of trials, not the whole registry. ClinicalTrials.gov itself lists 12 studies under the search term cancer with a site in Albania, out of 71 studies of any kind there.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial lists Albania. A query of ClinicalTrials.gov's API the same day for the condition term cancer and a location country of Albania returned 12 records out of 71 for the country in all. Five are sponsored by Hoffmann-La Roche, among them a completed phase 3 study of vemurafenib in metastatic melanoma (NCT01307397) and a completed study of subcutaneous trastuzumab (NCT01566721). The 12 include observational studies, an expanded access programme and at least one record that is not about cancer, so the number of cancer treatment trials is smaller. One, a study of primary cancer prevention programmes (NCT06718322), was enrolling by invitation; none was listed as recruiting.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Albania", url: CTGOV },
            { label: "NCT01307397: vemurafenib in metastatic melanoma", url: "https://clinicaltrials.gov/study/NCT01307397" },
            { label: "NCT06718322: PIECES, primary cancer prevention programmes", url: "https://clinicaltrials.gov/study/NCT06718322" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-blocked",
      title: "Sources that refused a plain request",
      plain:
        "OnCo could not read the health ministry's website, which answered with a browser check, or the IAEA's news pages, which returned an error. The IAEA articles were read from Internet Archive copies. Nothing on this page comes from the ministry's own site.",
      detail:
        "shendetesia.gov.al answered a plain request with an Incapsula script challenge on 16 November 2026, so ministry notices on the cancer plan, screening and radiotherapy were not read. iaea.org news pages returned 403; the Internet Archive copies of 1 October 2020 and 11 July 2025 were read, and the IAEA's technical cooperation PDF opened directly. WHO's single-country PDF of the 2020 cancer profile returned 404 and OnCo found no Internet Archive copy of it, so the compiled A to K volume was read instead; its data are for 2018 to 2020 and are dated wherever they are used. The national strategy and the programme for non-communicable diseases were read from copies on WHO's document servers, not from the ministry.",
      links: [
        { label: "Albania's health ministry (shendetesia.gov.al)", url: "https://shendetesia.gov.al/" },
        { label: "WHO: Cancer Country Profiles 2020, A to K (PDF)", url: WHO_PROFILE_2020 },
      ],
    },
    {
      id: "gap-data",
      title: "Figures and documents looked for and not found",
      plain:
        "OnCo found no survival figures for Albania, no counts of cancer deaths made in the country, no registry report after the one covering 2015 to 2019, no current cancer control plan, and no participation rates for breast or bowel screening.",
      detail:
        "Not found on the servers that could be read: the National Cancer Control Strategy 2021 to 2025 named in the health strategy, and the text of the 2011 to 2020 plan; a report of an IAEA, IARC and WHO imPACT review; a registry report or full site table for 2020 to 2024 (the 2023 and 2024 totals come from short World Cancer Day statements, one of them undated); stage at diagnosis; survival; INSTAT's cancer death counts, which were not read; cervical screening coverage after 2022; breast and bowel screening participation; what a patient pays for hospital cancer care; how a medicine is assessed for the reimbursed list; waiting times after 2018; and current staff or machine counts from the hospital itself. A government notice on free mammography was read but carries no date, so it is not used for any figure.",
      links: [
        { label: "ISHP: Institute of Public Health (in Albanian)", url: "https://www.ishp.gov.al/" },
        { label: "National Health Strategy 2021 to 2030 (PDF on WHO's server, in Albanian)", url: HEALTH_STRATEGY },
      ],
    },
    {
      id: "gap-regulator",
      title: "What the regulator's pages did not show",
      plain:
        "The medicines agency's page for its marketing authorisation sector had no text when OnCo read it, and its register of medicines is a spreadsheet that OnCo did not open. So this page cannot say which cancer medicines are authorised in Albania, only which are on the reimbursed list.",
      detail:
        "akbpm.gov.al's page \"Autorizimi për Tregtim dhe Çështjet Rregullatore\" returned a title and no body text on 16 November 2026. The register (Regjistri i barnave) is offered as an .xlsx file, which was not downloaded or read. OnCo did not read Law 105/2014 itself, so the authorisation routes it allows, including any recognition of approvals made elsewhere, are not described. The DIRAC row's fields for linear accelerators and cobalt units read 0 while its megavoltage field reads 6; OnCo reports the fields as named and did not query DIRAC's per-centre pages.",
      links: [
        { label: "AKBPM: register of medicines (in Albanian)", url: AKBPM_REGISTER },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
      ],
    },
  ],
  institutions: ["ishp-albania", "fsdksh-albania", "akbpm-albania", "mother-teresa-hospital-tirana"],
  companies: [],
  drugs: ["pembrolizumab", "nivolumab", "trastuzumab", "osimertinib", "palbociclib"],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from Albanian and international public sources read as raw text on 16 November 2026: the Institute of Public Health's cancer report, statements and screening evaluation, the insurance fund's pages and 2026 reimbursement list, the government decision in the Official Gazette, the medicines agency's pages, the national health strategy and non-communicable disease programme, the university hospital's oncology page, WHO, UNFPA and IAEA documents, the World Bank's series and IARC's GLOBOCAN 2024 fact sheet. Albanian sources were read in Albanian.",
  verify:
    "The reimbursed medicines list is updated each year and its conditions change; check the fund's current list before relying on a medicine being covered. The registry's latest totals come from short statements and may be revised. IARC's death figures for Albania are modelled, not counted.",
  verifyLinks: [
    { label: "FSDKSH: reimbursed medicines lists (in Albanian)", url: FSDKSH_LISTS },
    { label: "ISHP: Institute of Public Health (in Albanian)", url: "https://www.ishp.gov.al/" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Albania (PDF)", url: IARC_FACTSHEET },
  ],
};
