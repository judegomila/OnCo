import type { CountryDive } from "@/data/country-dive";

/**
 * Serbia deep dive: the hand-written cards for /countries/rs/ (wave 7). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Serbian Cancer Registry's reports Malignant Tumours in
 * Republic of Serbia for 2022, 2023 and 2024 (PDF text, Institute of Public Health of Serbia "Dr Milan Jovanović
 * Batut"), the Cancer Screening Office's note on breast cancer in 2024 and its home page, the Programme for Improving
 * Cancer Control in the Republic of Serbia 2020 to 2022 (Official Gazette 105/2020, PDF text), the Law on Health
 * Insurance and the Law on Medicines and Medical Devices (consolidated texts on paragraf.rs), the Batut institute's HPV
 * page and its 2026 immunisation instructions (PDF text), the Jovanović and Naumović 2021 paper on the screening
 * programmes (PDF text), the medicines agency's pages, the Institute for Oncology and Radiology of Serbia's clinic
 * pages, the EFPIA Patients W.A.I.T. Indicator 2025 survey (PDF text and page images for the two oncology charts), WHO's
 * Global Health Observatory and immunisation data APIs, IARC's GLOBOCAN 2024 fact sheet for Serbia, and the papers'
 * abstracts through Europe PMC. The Republic Health Insurance Fund's site refused plain requests and was read through
 * the Internet Archive. Where a figure could not be read it is named under `gaps`.
 */
const MT_2024 = "https://www.batut.org.rs/download/publikacije/MaligniTumoriuRepubliciSrbiji2024.pdf";
const MT_2023 = "https://www.batut.org.rs/download/publikacije/MaligniTumoriuRepubliciSrbiji2023.pdf";
const MT_2022 = "https://www.batut.org.rs/download/publikacije/MaligniTumoriURepubliciSrbiji2022.pdf";
const BREAST_2024 = "https://www.skriningsrbija.rs/files/Image/2026/Epidemioloske_karakteristike_karcinoma_dojke_u_Srbiji_2024-godina.pdf";
const SKRINING = "https://www.skriningsrbija.rs/";
const SKRINING_PAPER = "https://serbjph.batut.org.rs/resources/Glavne-karakteristike-sprovodjenja-programa-organizovanog-skrininga.pdf";
const PKR_2020 = "https://www.iccp-portal.org/system/files/plans/SRB_B5_s21_PROGRAM%20UNAPREDJENJA%20KONTROLE%20RAKA%20U%20REPUBLICI%20SRBIJI%202020%202022%20%281%29.pdf";
const ZZO = "https://www.paragraf.rs/propisi/zakon_o_zdravstvenom_osiguranju.html";
const ZLMS = "https://www.paragraf.rs/propisi/zakon_o_lekovima_i_medicinskim_sredstvima.html";
const BATUT_HPV = "https://www.batut.org.rs/index.php?content=2383";
const SMU_2026 = "https://www.batut.org.rs/download/SMU%20za%20sprovodjenje%20imunizacije%202026.pdf";
const RFZO_WB = "https://web.archive.org/web/20260717211617/https://rfzo.rs/";
const ALIMS_ABOUT = "https://www.alims.gov.rs/o-agenciji/";
const ALIMS_WHO_2019 = "https://www.alims.gov.rs/2019/07/30/%d1%81%d0%b2%d0%b5%d1%82%d1%81%d0%ba%d0%b0-%d0%b7%d0%b4%d1%80%d0%b0%d0%b2%d1%81%d1%82%d0%b2%d0%b5%d0%bd%d0%b0-%d0%be%d1%80%d0%b3%d0%b0%d0%bd%d0%b8%d0%b7%d0%b0%d1%86%d0%b8%d1%98%d0%b0-%d1%81%d0%b2/";
const ALIMS_TRIALS = "https://www.alims.gov.rs/humani-lekovi/klinicka-ispitivanja/pretraga-klinickih-ispitivanja/";
const WAIT_2025 = "https://www.efpia.eu/media/mnfdwzax/efpia-patients-wait-indicator-2025.pdf";
const IORS_RT = "https://www.ncrc.ac.rs/klinika-za-radijacionu-onkologiju/";
const IORS_MED = "https://www.ncrc.ac.rs/klinika-za-medikalnu-onkologiju/";
const IORS_PED = "https://www.ncrc.ac.rs/sluzba-za-pedijatrijsku-onkologiju/";
const IORS_FIRST = "https://www.ncrc.ac.rs/prvi-pregled/";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/688-serbia-fact-sheet.pdf";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SRB'";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'SRB'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20'SRB'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SRB'%20and%20startswith(ANTIGEN,'PRHPV')";
const CTGOV = "https://clinicaltrials.gov/search?country=Serbia&cond=cancer";

export const RS_DIVE: CountryDive = {
  iso2: "RS",
  iso3: "SRB",
  name: "Serbia",
  flag: "🇷🇸",
  asOf: "2026-11-11",
  title: "Cancer in Serbia",
  description:
    "Cancer in Serbia from Serbian sources: 41,472 new cancers and 20,314 cancer deaths counted by the national registry in 2024, with lung cancer the leading cause of cancer death in men and women; cancer treatment paid in full by compulsory insurance, but 8 of 56 recent cancer medicines available through the insurance fund, some only in limited quantities; the medicines agency and its accelerated route for EU-authorised medicines; organised breast, cervical and colorectal screening since 2012; free HPV vaccine for girls and boys with coverage near 3%; and 75 trials in our records with sites in Serbia.",
  lede:
    "Serbia counts its own cancers: the national registry recorded 41,472 new cancers and 20,314 cancer deaths in 2024, about 6.6 million people covered, with lung, colorectal and prostate cancer leading in men and breast, lung and colorectal cancer in women. The law pays in full for cancer treatment, and the country hosts many international trials, but recent cancer medicines reach the public list slowly and the screening and HPV vaccination programmes reach a minority of the people they are meant for.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Serbia is 37,741 new cancers and 21,481 deaths, an age-standardised incidence of 266.5 per 100,000 (299.5 in men, 242.2 in women) on a population of 6,736,222, including 1,632 non-melanoma skin cancers. IARC's fact sheet gives Serbia's incidence data source as \"No data\": the estimate is national mortality applied to modelled mortality-to-incidence ratios from neighbouring countries' registries. Deaths are WHO national mortality data with trends projected to 2024. The national registry's own counts therefore do not appear in IARC's incidence estimate, and they are higher: 41,472 new cancers in 2024 (38,439 without non-melanoma skin cancer, against IARC's 36,109), with world-standardised rates of 320.6 in men and 283.8 in women. The registry counted 4,544 breast cancers (IARC 4,374), 6,424 lung cancers (IARC 5,494) and 1,048 cervical cancers (IARC 917), but 5,348 colorectal cancers against IARC's 5,533. For deaths the registry, which takes them from the Statistical Office, counted 20,314, fewer than IARC's projected 21,481. The two also cover different populations: the registry uses the Statistical Office's estimate of 6,586,476 for 2024 and excludes the territory under the United Nations Interim Administration Mission in Kosovo.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Serbia",
      aside: { label: "Serbian Cancer Registry: Malignant Tumours in Republic of Serbia 2024 (PDF)", url: MT_2024 },
      cards: [
        {
          id: "shape",
          title: "About 41,500 new cancers a year, and about one cancer death for every two new cases",
          plain:
            "The Serbian Cancer Registry recorded 41,472 new cancers in 2024, 21,793 in men and 19,679 in women, and 20,314 deaths from cancer. In men the commonest cancers were lung, colorectal and prostate cancer; in women breast, lung and colorectal cancer. These are counts made in Serbia, not estimates.",
          detail:
            "The registry's 2024 report gives 4,246 lung cancers in men, 3,271 colorectal cancers and 2,704 prostate cancers, followed by bladder (1,786) and pancreas (741). In women breast cancer came first with 4,544 cases, then lung (2,178), colorectal (2,077), cervix (1,048) and the body of the uterus (1,042). The totals include 3,033 non-melanoma skin cancers; without them there were 20,132 cancers in men and 18,307 in women. World-standardised incidence was 320.6 per 100,000 men and 283.8 per 100,000 women, and mortality 143.2 and 105.4. The counts were close in 2022 (41,578 cancers, 19,350 deaths) and 2023 (41,852 and 20,253). IARC estimates 102,090 people living within five years of a cancer diagnosis in 2024.",
          links: [
            { label: "Serbian Cancer Registry: Malignant Tumours in Republic of Serbia 2024, tables 4, 5, 12, 13 and 26 (PDF)", url: MT_2024 },
            { label: "Serbian Cancer Registry: Malignant Tumours in Republic of Serbia 2023 (PDF)", url: MT_2023 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Serbia (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "lung-deaths",
          title: "Lung cancer is the leading cause of cancer death in both men and women",
          plain:
            "In 2024 lung cancer killed 2,998 men and 1,844 women in Serbia, almost a quarter of all cancer deaths. In women it caused more deaths than breast cancer (1,700), although breast cancer was diagnosed twice as often. The national cancer programme put adult smoking at more than a third of the population.",
          detail:
            "The registry counted 4,842 lung cancer deaths of 20,314 cancer deaths in 2024 (23.8%), against 6,424 new lung cancers. After lung cancer, the leading causes of cancer death in men were colorectal (1,570), prostate (1,059) and pancreatic cancer (623); in women breast (1,700), colorectal (973) and pancreatic cancer (588). The Programme for Improving Cancer Control 2020 to 2022 cites the 2013 National Health Survey: 34.7% of adults smoked occasionally or daily, above the EU average it gives of 26%, only 35.2% of smokers had been advised by a health worker to stop, smoking cessation services reached no more than 1,000 smokers a year, and the Republic Health Insurance Fund did not pay for stop-smoking medicines. The programme called for a ban on smoking in hospitality venues. Its organised screening covers cervical, breast and colorectal cancer only; it says screening for lung and prostate cancer needs more evidence on effectiveness and cost before it meets the criteria.",
          links: [
            { label: "Serbian Cancer Registry 2024, tables 12 and 13 (deaths by site, men and women, PDF)", url: MT_2024 },
            { label: "Programme for Improving Cancer Control 2020 to 2022, section on primary prevention (Serbian, PDF)", url: PKR_2020 },
          ],
        },
      ],
      tables: [
        {
          id: "rs-registry",
          title: "What the Serbian Cancer Registry has counted, 2022 to 2024",
          caption: "New cancers and cancer deaths by year, with incidence and mortality per 100,000 age-standardised to the world population. All sites, C00 to C97, including non-melanoma skin cancer.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "casesmen", label: "Men", numeric: true },
            { key: "caseswomen", label: "Women", numeric: true },
            { key: "deaths", label: "Cancer deaths", numeric: true },
            { key: "incmen", label: "Incidence, men", numeric: true },
            { key: "incwomen", label: "Incidence, women", numeric: true },
            { key: "mortmen", label: "Mortality, men", numeric: true },
            { key: "mortwomen", label: "Mortality, women", numeric: true },
          ],
          rows: [
            { year: "2022", cases: 41578, casesmen: 22056, caseswomen: 19522, deaths: 19350, incmen: 337.7, incwomen: 292.3, mortmen: 142.7, mortwomen: 100.7 },
            { year: "2023", cases: 41852, casesmen: 22019, caseswomen: 19833, deaths: 20253, incmen: 328.2, incwomen: 285.7, mortmen: 146.8, mortwomen: 104.5 },
            { year: "2024", cases: 41472, casesmen: 21793, caseswomen: 19679, deaths: 20314, incmen: 320.6, incwomen: 283.8, mortmen: 143.2, mortwomen: 105.4 },
          ],
          note: "Each row is from that year's report, summing the men's and women's totals in its tables. The registry excludes in situ tumours and residents of the territory under the United Nations Interim Administration Mission in Kosovo; deaths are taken from the Statistical Office. The reports also give rates standardised to the European and Serbian populations, which are higher.",
          sources: [
            { label: "Serbian Cancer Registry: Malignant Tumours in Republic of Serbia 2022 (PDF)", url: MT_2022 },
            { label: "Serbian Cancer Registry: Malignant Tumours in Republic of Serbia 2023 (PDF)", url: MT_2023 },
            { label: "Serbian Cancer Registry: Malignant Tumours in Republic of Serbia 2024 (PDF)", url: MT_2024 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry built from regional ones",
      aside: { label: "Institute of Public Health of Serbia \"Dr Milan Jovanović Batut\"", url: "https://www.batut.org.rs/" },
      cards: [
        {
          id: "registry-history",
          title: "A population cancer register since 1970, rebuilt from 1996 on international rules",
          plain:
            "Serbia has kept a population cancer register since 1970. Regional public health institutes collect cases for their districts and the Batut institute in Belgrade holds the national database. The registry counts new cases and deaths but, the national programme says, does not record stage, treatment or survival.",
          detail:
            "The registry's 2024 report says that in 1986 to 1995 imprecise guidance, little training and no computer support meant that the number of cancers reported was about the same as, or lower than, the number of cancer deaths. Reorganisation began in 1996 on the recommendations of IARC and the European Network of Cancer Registries: regional registers, active as well as passive case finding, new data sources, training and computer support. Its sources now include oncology institutes, hospitals, pathology and haematology laboratories, death certificates and health insurance funds, and it runs on IARC's CanReg software. The register for Central Serbia was admitted to the IACR and ENCR in 1998. The Law on Health Documentation and Records of 2014 made regional and district public health institutes responsible for their territories. The report says data collection usually takes two years before a report is published; its report on 2024 data is dated 2025. The 2020 to 2022 cancer programme notes that the registry does not provide stage, treatment or survival data, so Serbia cannot compare the results of its cancer care with other countries; the 2024 report lists stage and outcome among the items the register holds, but publishes no figures for them.",
          links: [
            { label: "Serbian Cancer Registry 2024: introduction and method (PDF)", url: MT_2024 },
            { label: "Programme for Improving Cancer Control 2020 to 2022, section on diagnosis and treatment (Serbian, PDF)", url: PKR_2020 },
            { label: "Mihajlović et al., cancer incidence and mortality in Serbia 1999 to 2009 (BMC Cancer 2013)", url: "https://doi.org/10.1186/1471-2407-13-18" },
          ],
        },
        {
          id: "registry-breast",
          title: "Breast cancer in 2024: 4,544 women diagnosed, rates twice as high in some districts as others",
          plain:
            "The Cancer Screening Office's note on breast cancer in 2024 records 4,544 women diagnosed and 1,700 deaths. Incidence was highest in the Kolubara, Nišava, North Banat and North Bačka districts and lowest in Central Banat, Zlatibor and Mačva, which the office reads partly as differences in screening and diagnosis.",
          detail:
            "The note gives a world-standardised incidence of 69.4 per 100,000 women and mortality of 19.4. By district, incidence ranged from 99.0 per 100,000 in Kolubara and 90.0 in Nišava to 41.4 in Central Banat and 43.2 in Zlatibor; Belgrade's rate was 76.4. The most new cases were in women aged 75 and over (735), 70 to 74 (712) and 65 to 69 (670). The office writes that the territorial differences may reflect age structure, coverage by preventive check-ups and organised screening, access to diagnostics and possible differences in how completely cases are registered, and that differences in mortality may point to differences in how early diagnosis is made and in access to cancer treatment. Mihajlović and colleagues found that in 2008 Serbia had the highest breast cancer mortality rate in Europe (22.7 per 100,000), using GLOBOCAN 2008 for the comparison.",
          links: [
            { label: "Cancer Screening Office: epidemiological characteristics of breast cancer in Serbia, 2024 (Serbian, PDF)", url: BREAST_2024 },
            { label: "Mihajlović et al., cancer incidence and mortality in Serbia 1999 to 2009 (BMC Cancer 2013)", url: "https://doi.org/10.1186/1471-2407-13-18" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: cancer treatment in full by law, with a slow medicines list",
      aside: { label: "Law on Health Insurance (Serbian, paragraf.rs)", url: ZZO },
      cards: [
        {
          id: "insurance",
          title: "The law makes compulsory insurance pay the whole cost of cancer treatment and palliative care",
          plain:
            "Under the Law on Health Insurance, examination and treatment of malignant diseases, palliative care and early detection programmes are paid in full by compulsory health insurance, run by the Republic Health Insurance Fund. Even so, WHO estimates that households paid about a third of Serbia's health spending directly in 2023.",
          detail:
            "Article 131 of the Law on Health Insurance (Official Gazette 25/2019, amended 2023 and 2025) lists the services provided entirely at the expense of compulsory insurance, including prevention and early detection, examination and treatment of malignant diseases, and palliative care. WHO's Global Health Observatory gives out-of-pocket payments as 32.14% of current health expenditure in 2023, down from 38.31% in 2018; current health expenditure was 8.03% of GDP in 2023; and Serbia's universal health coverage service index was 73 in 2023. The WHO figures are for all health spending, not cancer alone; OnCo found no Serbian figure for what cancer patients pay themselves. The 2020 to 2022 programme describes long waits for diagnosis and treatment at the tertiary institutions, and treatment often given in four- or five-week cycles instead of three because of the pressure.",
          links: [
            { label: "Law on Health Insurance, article 131 (Serbian, paragraf.rs)", url: ZZO },
            { label: "WHO Global Health Observatory: out-of-pocket spending as a share of current health expenditure, Serbia (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: UHC service coverage index, Serbia (API)", url: GHO_UHC },
            { label: "WHO Global Health Observatory: current health expenditure as a share of GDP, Serbia (API)", url: GHO_CHE },
          ],
        },
        {
          id: "medicines-list",
          title: "8 of 56 recent cancer medicines on the public list, against an EU average of 28",
          plain:
            "New cancer medicines are paid for through the insurance fund's medicines list, and innovative medicines sit on list C, prescribed only through tertiary hospitals to patients who meet set medical criteria. An industry survey found 8 of the 56 cancer medicines authorised in the EU in 2021 to 2024 on Serbia's list by January 2026.",
          detail:
            "The Law on Health Insurance (article 66) has the Fund adopt the medicines list, which must include essential medicines in line with the WHO Model List, with the Government's consent; article 69 gives the Fund 90 days to decide on a complete application. A medicine not on the list can be supplied when medically necessary under conditions the Fund sets. The EFPIA Patients W.A.I.T. Indicator 2025 survey, compiled by IQVIA and published in 2026, counted 8 of 56 oncology medicines (14%) available in Serbia on 5 January 2026, against an EU average of 28 (51%); for Serbia it measured availability as first listing on the public reimbursement list and used local authorisation dates, and for the 6 medicines with dates the median wait was 273 days. The survey describes two forms of limited availability in Serbia: listed medicines bought in a limited number of packs a year with committees approving each patient, and unlisted medicines supplied free on a named-patient basis. The 2020 to 2022 programme named the lack of biological medicines and immunotherapy on list C as a weakness. The survey is published by the pharmaceutical industry's association.",
          links: [
            { label: "Law on Health Insurance, articles 66 and 69 (Serbian, paragraf.rs)", url: ZZO },
            { label: "EFPIA Patients W.A.I.T. Indicator 2025 survey, pages 22, 27, 66, 68 and 70 (PDF)", url: WAIT_2025 },
            { label: "Programme for Improving Cancer Control 2020 to 2022 (Serbian, PDF)", url: PKR_2020 },
            { label: "Republic Health Insurance Fund (read through the Internet Archive, capture of 17 July 2026)", url: RFZO_WB },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Medicines and Medical Devices Agency of Serbia",
      aside: { label: "ALIMS: about the Agency (Serbian)", url: ALIMS_ABOUT },
      cards: [
        {
          id: "alims-routes",
          title: "A 210-day standard route, and a 150-day route for medicines the EU has already authorised",
          plain:
            "Serbia is not in the EU, so a cancer medicine authorised by the European Commission still needs a Serbian licence from ALIMS, the national agency founded in 2004. The law sets 210 days for a standard decision and 150 days for an accelerated one, which is open to medicines authorised through the EU centralised procedure.",
          detail:
            "Article 33 of the Law on Medicines and Medical Devices (Official Gazette 30/2010, amended 2012 and 2017) requires a decision within 210 days of a complete application, the clock stopping while the Agency waits for more data, and licences run for five years. Article 34 provides the accelerated procedure, with a 150-day limit, for a medicine of the highest public health interest, above all a therapeutic innovation, and for one already authorised by the EU centralised procedure. Article 35 allows a conditional licence for 12 months at a time, renewable, for serious and life-threatening diseases, emergencies, rare diseases and centrally authorised medicines, with safety reports every six months. A licence is only the first step: whether a medicine is paid for depends on the insurance fund's list. ALIMS also approves clinical trials and publishes a register of the trials it has approved.",
          links: [
            { label: "Law on Medicines and Medical Devices, articles 28 and 33 to 35 (Serbian, paragraf.rs)", url: ZLMS },
            { label: "ALIMS: about the Agency (Serbian)", url: ALIMS_ABOUT },
            { label: "ALIMS: register of approved clinical trials", url: ALIMS_TRIALS },
          ],
        },
        {
          id: "alims-who",
          title: "WHO benchmarking in 2019: 285 indicators across nine areas",
          plain:
            "In July 2019 ALIMS announced that the World Health Organization had confirmed, after checking 285 indicators in nine areas, that Serbia's national regulatory authority could be ranked among the 50 best in the world for medicines and vaccines. The announcement does not name a maturity level.",
          detail:
            "The Agency's announcement of 30 July 2019 describes the national regulatory authority as the Ministry of Health, ALIMS and the Batut institute, and lists what was checked: strategic and development planning, preparing for crises and recalls, assessing documentation and issuing licences, monitoring adverse reactions, aligning clinical trials with international standards, and quality control of medicines including vaccines. It says WHO will repeat the checks periodically. OnCo did not read WHO's own published list of authorities and their maturity levels, so the level Serbia holds is not stated here; see the gaps. The Agency was founded on 1 October 2004, taking over the assets of the Institute of Pharmacy of Serbia.",
          links: [
            { label: "ALIMS: WHO ranks Serbia among the 50 most developed countries in medicines regulation (30 July 2019, Serbian)", url: ALIMS_WHO_2019 },
            { label: "ALIMS: about the Agency (Serbian)", url: ALIMS_ABOUT },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Cancer Screening Office, Batut institute", url: SKRINING },
      cards: [
        {
          id: "screening-programmes",
          title: "Three organised programmes since December 2012: mammography, Pap smear and a stool test",
          plain:
            "Serbia invites women aged 50 to 69 for mammography every two years, women aged 25 to 64 for a cervical smear every three years, and men and women aged 50 to 74 for a stool test every two years. A positive stool test means a colonoscopy. Each programme aims to test at least 75% of the people it covers.",
          detail:
            "The 2020 to 2022 programme dates the start of organised screening to December 2012, after pilots funded by the European Union, the Government of Japan and the World Bank, with target groups aligned to European guidelines by government decrees in 2013 (Official Gazette 73/13). Jovanović and Naumović of the Batut institute describe the model in 2021: health centres draw up lists of the target population and post invitations; the chosen gynaecologist at the health centre is the provider for cervical and breast screening, and the chosen family doctor for the immunochemical faecal occult blood test. Mammograms are read twice by two radiologists. Cervical smears are read in accredited cytology laboratories, with HPV testing or colposcopy as triage. The Cancer Screening Office at the Batut institute organises, monitors and evaluates the programmes with the regional institutes. In October 2026 the office reported two mobile mammography units in Aleksandrovac and Trstenik that examined 357 and 399 women between 14 and 21 October.",
          links: [
            { label: "Jovanović and Naumović, main characteristics of the organised screening programmes in Serbia (Serbian Journal of Public Health, 2021, PDF)", url: SKRINING_PAPER },
            { label: "Programme for Improving Cancer Control 2020 to 2022, section on secondary prevention (Serbian, PDF)", url: PKR_2020 },
            { label: "Cancer Screening Office: news, including the October 2026 mobile mammography campaign", url: SKRINING },
          ],
        },
        {
          id: "screening-reach",
          title: "In 2013 to 2018 breast and bowel screening reached about one in nine of the people they were meant for",
          plain:
            "The national programme's own review found that organised screening ran on about a third of Serbia's territory, with opportunistic testing elsewhere. Mammography in the programme covered 11.6% of women aged 50 to 69, and the stool test 11.2% of its target group. In a 2019 survey a quarter of women had never had a Pap test.",
          detail:
            "For breast screening, run by 35 health centres in 2016 to 2018, invitations reached on average about 33.3% of the target population, about 34.4% of invited women attended, and coverage by mammography was 11.6% of the roughly 1,000,000 women aged 50 to 69; the programme estimated 100 mammography units would be needed. For cervical screening, in 17 health centres, invitations reached about 52% of women and 59.9% of those invited attended; 6.2% of smears were positive. For colorectal screening, 31 health centres, 7 clinical hospitals and 13 general hospitals tested 90,000 people; 52% of those invited returned a test, coverage was 11.2%, 7.2% of tests were positive, 43.3% of those went on to colonoscopy, adenomas were found and removed in 39% of colonoscopies, and cancer was confirmed in 0.2% of people tested. In the 2019 National Health Survey 67.2% of women had ever had a Pap test and 24.3% never had. OnCo found no national coverage figures for 2019 onwards; see the gaps.",
          links: [
            { label: "Programme for Improving Cancer Control 2020 to 2022, section on secondary prevention (Serbian, PDF)", url: PKR_2020 },
            { label: "Djordjevic et al., cervical cancer screening among women in Serbia (Front Public Health 2023)", url: "https://doi.org/10.3389/fpubh.2023.1275354" },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine free for girls and boys, but WHO records coverage of about 3%",
          plain:
            "Serbia gives the nine-valent HPV vaccine at the state's expense to girls and boys, recommended from age 9 to 19 and mainly in the fifth and seventh grades. It is a recommended vaccination, not a compulsory one, and needs a parent's written consent under 15. WHO's figures show 3% of girls had a first dose in 2024 and 2025.",
          detail:
            "The Batut institute's HPV page says Serbia introduced vaccination against HPV at the state's expense for children of both sexes, distributed through the public health institutes to health centres, as recommended immunisation that a doctor must recommend and that needs prior written consent from the parent or guardian for children under 15. The institute's instructions for 2026 recommend the HPV9 vaccine (Gardasil 9) from 9 to 19 years, mainly for pupils in the fifth and seventh grades of primary school during preventive check-ups, two doses six months apart from 9 to 14 and three doses from 15; vaccination can be offered from 19 to 26 as supplies allow. WHO's immunisation data record HPV programme coverage in Serbia for the first time in 2022: first dose in girls 2% in 2022 and 2023 and 3% in 2024 and 2025, last dose in girls 3% in 2024 and 2025, and first dose in boys 2% from 2022 to 2025.",
          links: [
            { label: "Batut: immunisation against diseases caused by human papillomaviruses (HPV)", url: BATUT_HPV },
            { label: "Batut: instructions for compulsory and recommended immunisation in 2026, section 6.2 (Serbian, PDF)", url: SMU_2026 },
            { label: "WHO immunisation data: HPV programme coverage rows for Serbia (API)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Treatment capacity: radiotherapy in eight centres, new drugs only at tertiary level",
      aside: { label: "IORS: Clinic for Radiation Oncology (Serbian)", url: IORS_RT },
      cards: [
        {
          id: "rt-centres",
          title: "Eight radiotherapy centres and 15 new linear accelerators bought in 2016 to 2019",
          plain:
            "The national programme counts eight centres giving radiotherapy in Serbia, among them the national institute in Belgrade, the two Vojvodina institutes and the clinical centres of Niš and Kragujevac. In 2016 to 2019 the country bought 15 linear accelerators. The Institute for Oncology and Radiology of Serbia in Belgrade treats up to 4,000 patients a year with radiotherapy on eight linear accelerators.",
          detail:
            "The 2020 to 2022 programme names the centres: the Institute for Oncology and Radiology of Serbia, the Institute for Pulmonary Diseases of Vojvodina, the Oncology Institute of Vojvodina, the clinical centres of Niš and Kragujevac, Kladovo Health Centre, the Military Medical Academy and the Clinical Centre of Serbia. It records the purchase of 15 linear accelerators, nine CT scanners and five MRI machines in 2016 to 2019 and says radiotherapy capacity was much better as a result, but that heavy workloads still made high quality hard to achieve. Children's radiotherapy is given mostly at the Belgrade institute, whose paediatric service treats about 100 patients up to age 19 a year, mostly with brain and bone tumours. The institute's radiotherapy clinic lists eight megavoltage linear accelerators with image guidance and respiratory gating, two CT simulators, two high-dose-rate brachytherapy units with MRI-based planning for gynaecological cancers, and national radiotherapy protocols written in 2022.",
          links: [
            { label: "Programme for Improving Cancer Control 2020 to 2022, section on diagnosis and treatment (Serbian, PDF)", url: PKR_2020 },
            { label: "IORS: Clinic for Radiation Oncology (Serbian)", url: IORS_RT },
            { label: "IORS: Paediatric Oncology Service (Serbian)", url: IORS_PED },
          ],
        },
        {
          id: "rt-waits",
          title: "In early 2018 fewer than half of patients started radiotherapy within 28 days",
          plain:
            "Data from six radiotherapy centres for January to June 2018 showed that 31.6% of breast cancer patients, 32.9% of cervical cancer patients, 39.35% of prostate cancer patients and 45.6% of lung cancer patients started radiotherapy within 28 days of it being prescribed. OnCo found no later national figure.",
          detail:
            "The figures are a footnote in the 2020 to 2022 programme, from data the six centres sent to the office of the Second Serbia Health Project. The programme expected two new national quality indicators, the average wait to start chemotherapy and the share of patients starting radiotherapy within 28 days, to be adopted in a new rulebook on quality indicators. It also describes waits for diagnosis: too few pathologists, radiologists and medical oncologists, some molecular and genetic tests available in only three tertiary institutions, and secondary hospitals without their own multidisciplinary teams sending patients to tertiary centres even for routine chemotherapy. Targeted therapy and immunotherapy could be given only at tertiary level. For a patient this means the referring hospital decides where treatment happens: a first visit to the Belgrade institute needs a referral from the local health centre, endorsed by a commission for patients from outside Belgrade.",
          links: [
            { label: "Programme for Improving Cancer Control 2020 to 2022, footnote 41 and section on diagnosis and treatment (Serbian, PDF)", url: PKR_2020 },
            { label: "IORS: first appointment (Serbian)", url: IORS_FIRST },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Serbia does",
      title: "What Serbia does differently",
      cards: [
        {
          id: "named-patient",
          title: "Medicines not on the list can still be supplied, one patient at a time",
          plain:
            "Serbia's law lets the insurance fund supply a medicine that is not on its list when it is medically necessary, and hospitals can buy unlisted medicines for patients who have no other option on the list. Committees approve each patient for some listed cancer medicines bought in limited quantities.",
          detail:
            "Article 66 of the Law on Health Insurance says an insured person can receive a medicine not on the medicines list if it is medically necessary, under conditions set by the Fund. The EFPIA W.A.I.T. 2025 survey describes how this works for new medicines in Serbia: some are listed as reimbursed but the Fund buys a limited number of packs a year, so special committees approve therapy and not all patients can get them; others are not publicly listed but can be obtained from the Fund free of charge on a named-patient basis, for example under article 9 of the rulebook that allows hospitals to buy non-reimbursed medicines for patients with no other therapeutic option on the list. The survey counts such limited availability within its figure of 8 available oncology medicines. Ask the treating oncologist whether a medicine is on list C, needs committee approval, or can be requested by name.",
          links: [
            { label: "Law on Health Insurance, article 66 (Serbian, paragraf.rs)", url: ZZO },
            { label: "EFPIA Patients W.A.I.T. Indicator 2025 survey, appendix page 68 (PDF)", url: WAIT_2025 },
          ],
        },
        {
          id: "hpv-boys",
          title: "One of the countries that vaccinates boys against HPV free of charge",
          plain:
            "Serbia offers the HPV vaccine free to boys as well as girls, using the nine-valent vaccine, and allows young people aged 15 and over to come for it without a parent's consent. The challenge is uptake: WHO records about 2% to 3% coverage.",
          detail:
            "The Batut institute's page says Serbia is among the countries that have introduced HPV vaccination at the state's expense for children of both sexes, girls and boys. Children aged 15 and over can go to their chosen doctor themselves; for younger children a parent or guardian gives written consent on a set form. The 2026 instructions tie the vaccine to the preventive check-ups and the compulsory diphtheria and tetanus booster given in schools. WHO's coverage figures, 3% for a first dose in girls and 2% in boys in 2025, show how far the programme has to go; the registry counted 1,048 cervical cancers in 2024.",
          links: [
            { label: "Batut: immunisation against diseases caused by human papillomaviruses (HPV)", url: BATUT_HPV },
            { label: "Batut: instructions for compulsory and recommended immunisation in 2026 (Serbian, PDF)", url: SMU_2026 },
            { label: "WHO immunisation data: HPV programme coverage rows for Serbia (API)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Serbia", url: CTGOV },
      cards: [
        {
          id: "trials-in-serbia",
          title: "75 trials in OnCo's records have a site in Serbia, most of them international phase 3 studies",
          plain:
            "OnCo's ClinicalTrials.gov data list Serbia as a site country for 75 trials, 21 of them recruiting when OnCo last retrieved them. Most are large phase 3 trials run by international companies, in lung, breast, prostate, bladder and blood cancers. One recruiting trial, of SNB-101 in small-cell lung cancer, lists a single site, in Serbia.",
          detail:
            "Of the 75, 21 were recruiting, 32 active but no longer recruiting, 19 completed and 3 terminated, and 55 are phase 3. Completed trials with Serbian sites include KATHERINE (trastuzumab emtansine after surgery for HER2-positive breast cancer), ALEX (alectinib in ALK-positive lung cancer), IMpower133 (atezolizumab in small-cell lung cancer), ARAMIS and PROSPER (darolutamide and enzalutamide in prostate cancer), MIRASOL (mirvetuximab soravtansine in ovarian cancer) and QuANTUM-First (quizartinib in AML). Recruiting ones include a camizestrant trial in early breast cancer after at least two years of standard hormone therapy (NCT05774951), HARMONi-3 (ivonescimab in lung cancer), HERIZON-BTC-302 (zanidatamab in biliary tract cancer), a givinostat trial in polycythaemia vera and trials of telisotuzumab vedotin and telisotuzumab adizutecan in lung cancer. One of the 75, a trial of vibegron in children with a neurogenic bladder, is not a cancer trial. Several are biosimilar trials of pembrolizumab and nivolumab. The Belgrade institute's medical oncology clinic says it can run early-phase trials and that its doctors take part in EORTC trials. Trials in Serbia are approved by ALIMS, which publishes a register; ask the treating centre which are open.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Serbia", url: CTGOV },
            { label: "ALIMS: register of approved clinical trials", url: ALIMS_TRIALS },
            { label: "IORS: Clinic for Medical Oncology (Serbian)", url: IORS_MED },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-plan",
      title: "No national cancer programme after 2022 was found",
      plain:
        "The Programme for Improving Cancer Control ran from 2020 to 2022. OnCo found no successor programme, and the Ministry of Health's website refused a plain request, so whether a newer plan exists, and what it targets, could not be checked.",
      detail:
        "The ICCP portal holds the 2020 to 2022 programme as published in the Official Gazette (105/2020), and that programme records its predecessor, Serbia against Cancer, for 2010 to 2015. The Ministry of Health's site returned HTTP 403 to a plain request on 11 November 2026, and a search of other sources found no later programme. Many figures on this page about screening coverage, radiotherapy waits and treatment capacity therefore come from the 2020 to 2022 programme and describe the years up to 2019; they may have changed since.",
      links: [
        { label: "Programme for Improving Cancer Control 2020 to 2022 (Serbian, PDF, ICCP portal)", url: PKR_2020 },
        { label: "Ministry of Health of the Republic of Serbia", url: "https://www.zdravlje.gov.rs/" },
      ],
    },
    {
      id: "gap-survival",
      title: "No survival, stage or treatment figures from the registry",
      plain:
        "The Serbian Cancer Registry publishes new cases and deaths but not survival, stage at diagnosis or treatment received, and the national programme says it does not provide them. So this page cannot say how many people in Serbia are alive five years after a cancer diagnosis.",
      detail:
        "The 2020 to 2022 programme states that the registry does not provide data on stage, treatment or survival, and that the health information system cannot record the time from first symptoms to diagnosis. OnCo did not look for survival estimates from European studies such as CONCORD or EUROCARE that may include Serbian registries; none is quoted here. The ratio of deaths to new cases in the registry's 2024 counts, about 0.49, is not a survival rate and should not be read as one.",
      links: [
        { label: "Programme for Improving Cancer Control 2020 to 2022 (Serbian, PDF)", url: PKR_2020 },
        { label: "Serbian Cancer Registry 2024 (PDF)", url: MT_2024 },
      ],
    },
    {
      id: "gap-medicines",
      title: "The medicines list itself and recent screening coverage were not read",
      plain:
        "The Republic Health Insurance Fund's site refused plain requests, so OnCo did not read its current medicines list or list C, and cannot say medicine by medicine which cancer drugs are paid for. National screening coverage after 2018 was not found either.",
      detail:
        "The Fund's home page was read through an Internet Archive copy of 17 July 2026, which does not include the list. The count of 8 reimbursed cancer medicines comes from an industry survey, not from the Fund. For screening, the latest national coverage figures found are the 2013 to 2018 programme results in the 2020 to 2022 programme and the 2019 National Health Survey; the Cancer Screening Office's site publishes news and a breast cancer note but OnCo found no annual coverage report there. IAEA radiotherapy data for Serbia, a current count of working machines across the eight centres, and WHO's own list of regulatory authorities and their maturity levels were not read.",
      links: [
        { label: "Republic Health Insurance Fund (read through the Internet Archive)", url: RFZO_WB },
        { label: "Cancer Screening Office, Batut institute", url: SKRINING },
      ],
    },
  ],
  institutions: [
    "serbia-ministry-of-health", "batut-institute-of-public-health-serbia", "rfzo-serbia", "alims-serbia",
    "institute-for-oncology-and-radiology-of-serbia", "oncology-institute-of-vojvodina", "oeci", "iarc", "who",
  ],
  companies: ["astrazeneca", "roche-genentech", "abbvie", "amgen", "pfizer", "genmab", "summit-therapeutics", "jazz", "samsung-bioepis", "mabxience-research-s-l", "italfarmaco"],
  drugs: ["trastuzumab-emtansine", "alectinib", "atezolizumab", "darolutamide", "enzalutamide", "mirvetuximab-soravtansine", "quizartinib", "camizestrant", "ivonescimab", "zanidatamab", "givinostat", "telisotuzumab-vedotin"],
  trials: [
    "katherine", "alex", "impower133", "aramis", "prosper", "mirasol", "quantum-first", "javelin-bladder-100", "oak",
    "cambria", "harmoni-3", "herizon-btc-302", "nct05774951", "nct06093672", "nct07155187", "nct07391813", "lidera", "litespark-012",
  ],
  papers: ["paper-mihajlovic-serbia-cancer-incidence-1999-2009-bmc-2013", "paper-djordjevic-cervical-screening-serbia-fph-2023"],
  people: ["jasna-trifunovic"],
  how:
    "Every card was written from Serbian official sources, read in full rather than through a summary: the Serbian Cancer Registry's reports for 2022, 2023 and 2024 and the Cancer Screening Office's breast cancer note, from the Batut institute; the Programme for Improving Cancer Control 2020 to 2022; the Law on Health Insurance and the Law on Medicines and Medical Devices; the Batut institute's HPV page and 2026 immunisation instructions; the medicines agency's pages; and the Belgrade institute's clinic pages. International sources were WHO's Global Health Observatory and immunisation data, the EFPIA W.A.I.T. 2025 survey, IARC's GLOBOCAN 2024 fact sheet and two papers through Europe PMC. The insurance fund's site was read through the Internet Archive. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, the Batut institute, the insurance fund, the medicines agency, the Belgrade institute and two papers) carry their own sources.",
  verify:
    "Which cancer medicines are on list C, which need committee approval and which can be requested by name changes with each revision of the medicines list; ask the treating oncologist or the insurance fund's branch office. Screening invitations come from your chosen doctor's health centre, and whether the organised programme runs where you live depends on the health centre. HPV vaccination is through the chosen doctor at the health centre.",
  verifyLinks: [
    { label: "Institute of Public Health of Serbia \"Dr Milan Jovanović Batut\"", url: "https://www.batut.org.rs/" },
    { label: "Cancer Screening Office", url: SKRINING },
    { label: "Medicines and Medical Devices Agency of Serbia", url: "https://www.alims.gov.rs/" },
    { label: "Republic Health Insurance Fund", url: "https://www.rfzo.rs/" },
  ],
};
