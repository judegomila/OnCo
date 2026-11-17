import type { CountryDive } from "@/data/country-dive";

/**
 * Malta deep dive: the hand-written cards for /countries/mt/ (wave 13). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: the OECD and European Commission EU Country Cancer Profile for
 * Malta 2025 and its Cancer Performance Tracker (PDF text, from the European Cancer Inequalities Registry); the Malta
 * National Cancer Registry's incidence and mortality tables for 2007 to 2019 and its own page, and the National
 * Screening Centre's pages, the Cancer Care Pathways Directorate's page, the National Cancer Plan 2017 to 2021 and the
 * Directorate for Health Information and Research's Annual Mortality Report 2023, all read through the Internet Archive
 * because every gov.mt health site refused a plain request; the PPRI Pharma Brief Malta 2021, written by the
 * Directorate for Pharmaceutical Affairs; the Malta Medicines Authority's page on how medicines are registered; the
 * European Medicines Agency's leaflet on the centralised procedure; the Malta Community Chest Fund Foundation's own
 * pages; the European Observatory's 2025 case study of the Cancer Care Pathways Directorate; the European Commission's
 * Recovery and Resilience Facility project page; the IAEA DIRAC country row; WHO's HPV coverage rows; the World Bank's
 * health expenditure series; ClinicalTrials.gov's API; and IARC's GLOBOCAN 2024 fact sheet for Malta. The registry and
 * screening pages are in Maltese and were read in Maltese. Where a source could not be read it is named under `gaps`.
 */
const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-mt-2024-1677-en.pdf";
const CCP = { label: "OECD and European Commission: EU Country Cancer Profile Malta 2025 (PDF)", url: CCP_2025 };
const CAPTR = { label: "European Cancer Inequalities Registry: Malta's Cancer Performance Tracker (PDF)", url: "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-2024-Malta-CaPTr.pdf" };
const IARC_FACTSHEET = { label: "IARC: GLOBOCAN 2024 fact sheet, Malta (PDF)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/470-malta-fact-sheet.pdf" };
const NCR_PAGE = { label: "Directorate for Health Information and Research: National Cancer Registry page (in Maltese, Internet Archive copy of 9 August 2025)", url: "https://web.archive.org/web/20250809181738/https://dhir.gov.mt/registri/kancers/" };
const NCR_BASE = "https://web.archive.org/web/2023/https://deputyprimeminister.gov.mt/en/dhir/Documents/Cancer/2020/cancers%20pdfs/";
const NCR_ALL = { label: "Malta National Cancer Registry: all cancers, incidence and mortality 2007 to 2019 (PDF, Internet Archive copy of 29 March 2023)", url: `${NCR_BASE}All%20cancers%202019.pdf` };
const NCR_BREAST = { label: "Malta National Cancer Registry: cancer of the female breast 2007 to 2019 (PDF, Internet Archive copy)", url: `${NCR_BASE}Cancer%20of%20the%20female%20breast%202019.pdf` };
const NCR_PROSTATE = { label: "Malta National Cancer Registry: prostate 2007 to 2019 (PDF, Internet Archive copy)", url: `${NCR_BASE}Prostate%202019.pdf` };
const NCR_COLORECTAL = { label: "Malta National Cancer Registry: colorectal cancer 2007 to 2019 (PDF, Internet Archive copy)", url: `${NCR_BASE}Colorectal%20Cancer%202019.pdf` };
const NCR_LUNG = { label: "Malta National Cancer Registry: lung 2007 to 2019 (PDF, Internet Archive copy)", url: `${NCR_BASE}Lung%202019.pdf` };
const NCR_CERVIX = { label: "Malta National Cancer Registry: cervix uteri 2007 to 2019 (PDF, Internet Archive copy)", url: `${NCR_BASE}Cervix%20uteri%202019.pdf` };
const MORTALITY_2023 = { label: "Directorate for Health Information and Research: Annual Mortality Report 2023 (PDF, Internet Archive copy of 16 August 2026)", url: "https://web.archive.org/web/20260816152514/https://dhir.gov.mt/wp-content/uploads/2026/04/Annual-Mortality-Report-2023-.pdf" };
const PPRI = { label: "PPRI Pharma Brief: Malta 2021, by the Directorate for Pharmaceutical Affairs (PDF, published June 2022)", url: "https://ppri.goeg.at/system/files/inline-files/PPRI_Pharma_Malta_Brief_final.pdf" };
const MMA_REGISTER = { label: "Malta Medicines Authority: how medicines are registered", url: "https://medicinesauthority.gov.mt/howmedicinesregistered" };
const EMA_LEAFLET = { label: "EMA: applying for EU marketing authorisation (leaflet, PDF)", url: "https://www.ema.europa.eu/en/documents/leaflet/applying-european-union-marketing-authorisation-medicinal-products-human-use_en.pdf" };
const MCCFF_MEDICAL = { label: "Malta Community Chest Fund Foundation: the Medical Assistance Unit", url: "https://www.mccff.org.mt/en/services/medical-assistance/" };
const MCCFF_ABOUT = { label: "Malta Community Chest Fund Foundation: about, with its annual reports", url: "https://www.mccff.org.mt/en/about-mccff/" };
const NSC_BREAST = { label: "National Screening Centre: breast screening (in Maltese, Internet Archive copy of 9 August 2025)", url: "https://web.archive.org/web/20250809142605/https://healthscreening.gov.mt/screening-tas-sider/" };
const NSC_COLORECTAL = { label: "National Screening Centre: colorectal screening (in Maltese, Internet Archive copy of 9 August 2025)", url: "https://web.archive.org/web/20250809153840/https://healthscreening.gov.mt/screening-kolorettali/" };
const NSC_CERVICAL = { label: "National Screening Centre: cervical screening (in Maltese, Internet Archive copy of 9 August 2025)", url: "https://web.archive.org/web/20250809141549/https://healthscreening.gov.mt/screening-cervikali/" };
const WHO_HPV = { label: "WHO: HPV vaccination coverage rows for Malta (data API)", url: "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'MLT'%20and%20startswith(ANTIGEN,'PRHPV')" };
const WB_OOP = { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Malta", url: "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=MT" };
const WB_PC = { label: "World Bank: current health expenditure per person, Malta", url: "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=MT" };
const WB_GDP = { label: "World Bank: current health expenditure, % of GDP, Malta", url: "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=MT" };
const WB_GOV = { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Malta", url: "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=MT" };
const DIRAC = { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: "https://dirac.iaea.org/Query/Countries" };
const EC_MRLINAC = { label: "European Commission: cancer treatment and diagnosis facility at Sir Anthony Mamo Oncology Centre (Recovery and Resilience Facility)", url: "https://reforms-investments.ec.europa.eu/projects/cutting-edge-cancer-treatment-and-diagnosis-facility-sir-anthony-mamo-oncology-center_en" };
const DCCP_PAGE = { label: "Ministry for Health: Cancer Care Pathways Directorate (Internet Archive copy of 12 July 2025)", url: "https://web.archive.org/web/20250712063830/https://health.gov.mt/public-bodies/cancer-care-pathways/" };
const OBS_PACE = { label: "European Observatory on Health Systems and Policies: a dedicated directorate to improve cancer care pathways (Malta case study, 2025)", url: "https://eurohealthobservatory.who.int/monitors/pace/case-studies/pace/pace-malta-2025/a-dedicated-directorate-to-improve-cancer-care-pathways" };
const PLAN_2017 = { label: "Ministry for Health: The National Cancer Plan for the Maltese Islands 2017 to 2021 (October 2017, PDF, Internet Archive copy)", url: "https://web.archive.org/web/20260608075156/https://health.gov.mt/wp-content/uploads/2023/04/The_National_Cancer_Plan_for_the_Maltese_Islands_2017%E2%80%932021_EN.pdf" };
const CTGOV = { label: "ClinicalTrials.gov: cancer studies with sites in Malta", url: "https://clinicaltrials.gov/search?country=Malta&cond=cancer" };

export const MT_DIVE: CountryDive = {
  iso2: "MT",
  iso3: "MLT",
  name: "Malta",
  flag: "🇲🇹",
  asOf: "2026-11-16",
  title: "Cancer in Malta",
  description:
    "Cancer in Malta from Maltese and European sources: IARC's estimate of 3,499 new cancers and 1,068 deaths in 2024, a national registry whose latest public tables stop at 2019, one oncology centre and one radiotherapy centre for the islands, a tax-funded health service with a Government Formulary List that covered none of a sample of new breast and lung cancer medicines, and a national charity that the OECD's profile calls a major funder of cancer medicines outside the list.",
  lede:
    "Malta treats cancer in one place, the Sir Anthony Mamo Oncology Centre at Mater Dei Hospital, inside a tax-funded health service that is mostly free at the point of use. The OECD's 2025 profile reports the lowest cancer death rate in the EU in 2021, three screening programmes that each reached fewer than half of the people eligible in 2022, and a formulary that lags behind European approvals, with a named-patient route and a national charity filling part of the gap.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Malta is 3,499 new cancers and 1,068 deaths, an age-standardised incidence of 270.3 per 100,000 (285.5 in men, 265.3 in women) and mortality of 74.7 (88.0 in men, 63.8 in women), with 11,288 people alive within five years of a diagnosis. IARC's fact sheet names a national registry as the source for incidence and WHO's national mortality data for deaths, each as trends in national rates projected to 2024, so the estimate is built from Malta's own data. IARC's total includes non-melanoma skin cancer (729 cases); without it the figure is 2,770. The Malta National Cancer Registry's public tables exclude basal cell and squamous cell skin cancers and stop at 2019, when they record 2,351 new cancers, so the two are not counts of the same year or the same set of cancers. IARC's rates are standardised to the world population; the OECD profile's rates use the European standard population and are much higher numbers for the same disease burden.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Malta",
      aside: IARC_FACTSHEET,
      cards: [
        {
          id: "shape",
          title: "About 3,500 new cancers a year in IARC's estimate; lung cancer causes the most deaths",
          plain:
            "IARC estimates 3,499 new cancers and 1,068 cancer deaths in Malta in 2024. Breast cancer is the commonest, then colorectal, prostate and lung cancer. Lung cancer causes the most deaths. The OECD's 2025 profile says Malta had the lowest cancer death rate of all EU countries in 2021.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet gives 457 breast cancers (96 deaths), 318 colorectal cancers (128 deaths), 298 prostate cancers (54 deaths), 239 lung cancers (184 deaths) and 145 bladder cancers, with pancreatic cancer third among causes of cancer death (103 deaths). The OECD and European Commission's Country Cancer Profile 2025, using rates standardised to the European population, gives a 2021 cancer mortality rate of 198 per 100,000, 16% below the EU average of 235 and 20% below Malta's rate in 2011; the rate fell by 18% among men and 23% among women over those ten years, against an 8% fall among women across the EU. The same profile says cancer remained the second leading cause of death after cardiovascular diseases, at 25.6% of deaths, and that lifetime cancer prevalence rose by 28% between 2010 and 2020.",
          links: [IARC_FACTSHEET, CCP],
        },
        {
          id: "registry",
          title: "A national registry fed by every hospital and laboratory, with public tables to 2019",
          plain:
            "The Malta National Cancer Registry, in the health ministry's Directorate for Health Information and Research, records cancers diagnosed in residents of the Maltese Islands. Its latest tables that OnCo could read cover 2007 to 2019 and record 2,351 new cancers in 2019, not counting the common skin cancers.",
          detail:
            "The registry's own page says the present registry began in 1985 with cases diagnosed at St Luke's Hospital and that since 1991 it has collected cases from all hospitals, clinics and laboratories, public and private, in the islands; the OECD profile gives 1991 as the year it was established. The page lists its sources as clinicians' notifications under the Cancer Act of 1957, copies of histology, cytology and autopsy reports, death certificates from the National Mortality Registry and new referrals to the oncology department, and says it has been a full voting member of the International Association of Cancer Registries since January 1995. Its tables, marked on the page as updated in January 2023, give 1,154 new cancers in men and 1,197 in women in 2019 (ICD-O-3 C00 to C80, excluding basal cell and squamous cell skin cancers), with world-standardised rates of 224.3 and 245.3 per 100,000. The OECD profile says the registry offers national coverage but lacks data on patient-reported indicators, and that Malta plans to expand it within an integrated digital health system.",
          links: [NCR_PAGE, NCR_ALL, CCP],
        },
        {
          id: "deaths-2023",
          title: "986 cancer deaths in 2023, about one death in four",
          plain:
            "Malta's mortality registry counted 986 deaths from cancer in 2023, which was 24.4% of all deaths and 51 fewer than in 2022. Lung cancer caused the most, 195, followed by cancers of the pancreas, the bowel and the breast.",
          detail:
            "The Directorate for Health Information and Research's Annual Mortality Report 2023, released on 14 April 2026, says neoplasms were the second most common cause of death after diseases of the circulatory system (1,171 deaths, 29.0%). Its table of the commonest cancer deaths in 2023 lists trachea, bronchus and lung (195 deaths, 19.8% of cancer deaths), pancreas (98, 9.9%), colon, rectum and anus (93, 9.4%), breast (72, 7.3%) and liver and intrahepatic bile ducts (46, 4.7%). Lung cancer's share rose from 18.1% in 2022 and breast cancer's fell from 8.6%. These are counted deaths from death certificates, so they differ from IARC's projected 1,068 for 2024.",
          links: [MORTALITY_2023],
        },
      ],
      tables: [
        {
          id: "mt-registry",
          title: "New cancers registered in Malta, Malta National Cancer Registry",
          caption: "Number of new cases by year of registration, 2017 to 2019, from the registry's tables of trends in incidence 2007 to 2019 (data extracted 2021 and 2022).",
          columns: [
            { key: "year", label: "Year" },
            { key: "men", label: "All cancers, men", numeric: true },
            { key: "women", label: "All cancers, women", numeric: true },
            { key: "breast", label: "Breast (women)", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "colorectal", label: "Colorectal", numeric: true },
            { key: "lung", label: "Lung", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
          ],
          rows: [
            { year: "2017", men: 1109, women: 1144, breast: 363, prostate: 183, colorectal: 265, lung: 221, cervix: 11 },
            { year: "2018", men: 1669, women: 1364, breast: 324, prostate: 188, colorectal: 253, lung: 179, cervix: 22 },
            { year: "2019", men: 1154, women: 1197, breast: 378, prostate: 273, colorectal: 252, lung: 204, cervix: 18 },
          ],
          note: "Counts of new cases, not deaths. All cancers is ICD-O-3 C00 to C80 excluding basal cell and squamous cell skin cancers, so it is not comparable with IARC's total, which includes them. Colorectal (C18 to C20) and lung (C34) are the registry's separate tables for men and women added together. The 2018 all-cancer counts are far above the years either side while the site tables are not; the figures are printed as the registry's file gives them and the file does not explain the difference. No later year was readable.",
          sources: [NCR_ALL, NCR_BREAST, NCR_PROSTATE, NCR_COLORECTAL, NCR_LUNG, NCR_CERVIX],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: a tax-funded service, a formulary, and a charity for what the formulary leaves out",
      aside: CCP,
      cards: [
        {
          id: "health-service",
          title: "Cancer diagnosis and treatment are mostly free; out-of-pocket spending is high elsewhere",
          plain:
            "Malta's National Health Service is paid for mainly from general taxation and is mostly free when used. People do not pay for most cancer services. Even so, about 31% of all health spending in Malta came straight from patients' pockets in 2023, much of it for private family doctors and medicines.",
          detail:
            "The OECD and European Commission's 2025 profile says the service offers comprehensive and universal coverage for all residents, that oncology services are covered by the Social Security Act or by humanitarian exemptions, and that public providers deliver most hospital care while up to 70% of primary care visits are to private doctors who charge fees. It reports that out-of-pocket spending was 7.7% of household consumption in 2022, the highest in the EU and more than twice the EU average of 3.2%, and that 26% of people reported paying for medicines not covered by the national benefits package. The World Bank's series, from WHO's health expenditure database, puts out-of-pocket spending at 30.9% of current health spending in 2023 (34.1% in 2019), government spending at 66.0%, and total health spending at USD 3,623 per person, 8.8% of GDP. These shares cover all care, not cancer alone.",
          links: [CCP, WB_OOP, WB_GOV, WB_PC, WB_GDP],
        },
        {
          id: "formulary-entitlement",
          title: "Medicines on the Government Formulary List are free, with no copayment",
          plain:
            "A medicine is free to a patient in Malta when it is on the Government Formulary List and the patient is entitled to it. There is no copayment in the public system. A medicine that is not on the list is paid for by the patient, by private insurance, through an exceptional request, or by a charity.",
          detail:
            "The PPRI Pharma Brief for Malta, written by staff of the Directorate for Pharmaceutical Affairs and describing 2021, says the Fifth Schedule of the Social Security Act lists the chronic conditions (87 at the time) for which free outpatient medicines can be given, that some medicines are given free to means-tested patients under the Second Schedule, and that all medicines on the Government Formulary List are 100% reimbursed to entitled patients. The list is the positive reimbursement list and has two parts, the Hospital Formulary List and the Out-Patients Formulary List, the second used by the Pharmacy of Your Choice scheme and government pharmacies. In the private sector payment is fully out of pocket unless private insurance covers it. In December 2021 the outpatient list held 763 medicines, counted by form and dose.",
          links: [PPRI, CCP],
        },
        {
          id: "community-chest-fund",
          title: "A national charity is a major funder of cancer medicines that are not on the list, the OECD profile says",
          plain:
            "The Malta Community Chest Fund Foundation, a national charity, pays for specialised medicines for cancer and severe chronic illness and for the costs of patients treated abroad. The OECD's profile calls it a major funder of cancer medicines outside the Government Formulary List.",
          detail:
            "The Foundation's own site says its Medical Assistance Unit provides specialised medicine for severe chronic illness and cancer, specialised treatment for rare diseases, and accommodation, transport and subsistence for patients receiving treatment abroad and their accompanying relatives, and that it has an office at the Sir Anthony Mamo Oncology Centre. The 2025 Country Cancer Profile says the Foundation is funded through government support and public donations, that by 2023 it had enabled access to over 40 different chemotherapy treatments, and that its annual spending rose from less than EUR 1 million in 2015 to EUR 14 million in 2020 and over EUR 20 million in 2022, citing Maltese press reports for those sums. The profile adds that the Ministry for Health directly finances the reimbursement of oncology medicines provided through the Foundation. OnCo could not read the Foundation's own accounts, which are published as scanned images.",
          links: [MCCFF_MEDICAL, MCCFF_ABOUT, CCP],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: European authorisation, then Malta's formulary decision",
      aside: EMA_LEAFLET,
      cards: [
        {
          id: "approval",
          title: "New cancer medicines are authorised for Malta by the European route",
          plain:
            "Malta is in the European Union, so a new cancer medicine is assessed once by the European Medicines Agency and authorised by the European Commission for every member state. The Malta Medicines Authority is the national regulator: it assesses medicines registered nationally and watches their safety.",
          detail:
            "The European Medicines Agency's leaflet says medicines containing a new active substance for cancer must go through the centralised procedure: its scientific committee gives an opinion within up to 210 days of assessment, and the European Commission grants an authorisation valid in all EU states within 67 days of receiving that opinion. The Malta Medicines Authority's site says that in Malta the Authority assesses the information submitted for registration and the Licensing Authority issues the marketing authorisation, and that medicines can be authorised by the national, mutual recognition or decentralised, and centralised procedures. It also inspects manufacturers, distributors and pharmacies and collects reports of side effects. Authorisation allows a medicine to be sold; it does not put it on the Government Formulary List.",
          links: [EMA_LEAFLET, MMA_REGISTER],
        },
        {
          id: "formulary-route",
          title: "Two committees and the Minister decide what joins the Government Formulary List",
          plain:
            "A company or a hospital consultant applies to the Directorate for Pharmaceutical Affairs. The Directorate writes a health technology assessment, a technical committee and then a financial committee give advice, and the Minister for Health gives the final approval. The medicine is then bought by tender.",
          detail:
            "The PPRI Pharma Brief (describing 2021) sets out the steps. Applications come from marketing authorisation holders or clinical consultants; the Directorate's assessment unit prepares the assessment and presents it to the Government Formulary List Advisory Committee, which recommends inclusion and a maximum reference price; the Advisory Committee for Health Care Benefits then advises the Minister on budget impact, sustainability and capacity; the Minister endorses inclusion. The Superintendent of Public Health is legally responsible for the rules, under Legal Notice 58 of 2009. Listed medicines are bought centrally by the Central Procurement and Supplies Unit, mostly by price-driven tender, with negotiation where there is no competition and managed entry agreements for some high-cost items. Medicine prices are otherwise not regulated in Malta. The 2025 Country Cancer Profile adds that a medicine is officially listed only once procurement is finished and it is available for distribution.",
          links: [PPRI, CCP],
        },
        {
          id: "access-gap",
          title: "None of a sample of new breast and lung cancer medicines was on the Government Formulary List",
          plain:
            "A study of new breast and lung cancer medicines with the highest clinical benefit found that Malta's Government Formulary List covered none of them, although all could be obtained for a named patient. Malta's budget for new cancer medicines rose from EUR 20 million in 2022 to EUR 27 million in 2024.",
          detail:
            "The 2025 Country Cancer Profile reports this from an OECD study of access to oncology medicines, and says Malta publicly covered 16% of the biosimilars of three cancer medicines (bevacizumab, rituximab and trastuzumab) on its reimbursement list of 1 April 2023, against an EU average of 65%. Medicines outside the list can be supplied by the Government Health Services under the Exceptional Medicinal Treatment policy, on a named-patient basis; the PPRI brief says Legal Notice 58 of 2018 obliged the health services to consider such requests and moved the decision to a committee appointed by the Minister. The profile gives the budget for new oncology medicines as EUR 20 million in 2022, EUR 24 million in 2023 and EUR 27 million in 2024, and attributes Malta's difficulty in procurement to its limited manufacturing capacity and small market. Malta signed the Valletta Declaration with nine other European countries in 2017 to strengthen their negotiating position through transparency on medicine prices. OnCo did not read the current Formulary List itself; see the gaps.",
          links: [CCP, CAPTR, PPRI],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: NSC_BREAST,
      cards: [
        {
          id: "screening-programmes",
          title: "Three screening programmes, with many people screened privately instead",
          plain:
            "Malta invites people for breast screening (since 2009), bowel screening (since 2012) and cervical screening (since 2015), all free. In 2022 the programmes reached 44% of eligible women for breast screening, a quarter of those eligible for bowel screening and 16% for cervical screening. Surveys find more people are screened, because many go privately.",
          detail:
            "The 2025 Country Cancer Profile describes a mammogram every two years for women aged 51 to 69, a home stool test every two years for men and women aged 53 to 74 who opt in, and cervical tests in health centres for women aged 25 and over born after 1980, with plans to widen all three age ranges. The National Screening Centre's own pages, in the copies archived in August 2025, give the breast age group as 50 to 69 and the bowel age group as 50 to 74, using a FIT home kit, and say cervical screening invites women born from 1980 onwards, first at 25, then every three years, and every five years from 50. In the 2019 European Health Interview Survey 61% of women reported breast screening, 64% cervical screening and 40% of people bowel screening. The profile says the Ministry intends to study screening for prostate and lung cancer. OnCo could not read the Centre's live site to confirm today's age ranges.",
          links: [CCP, CAPTR, NSC_BREAST, NSC_COLORECTAL, NSC_CERVICAL],
        },
        {
          id: "hpv",
          title: "HPV vaccination for girls since 2013 and for boys since 2023",
          plain:
            "Malta has vaccinated girls against HPV since 2013 and boys aged 12 since January 2023. WHO's figures for 2025 give 95% of girls a first dose and 75% the last dose, and 70% of boys a first dose and 47% the last dose.",
          detail:
            "The 2025 Country Cancer Profile says the vaccine was rolled out in 2013 for girls born after 2000, that 82% of eligible girls aged 15 had been vaccinated in 2023 against an EU figure of 64% in the profile's tracker, that boys aged 12 were added in January 2023 with a catch-up for those aged 13 and 14 from July 2023, and that in January 2024 the government invited men aged 15 to 24. WHO's immunisation data give HPV programme coverage among females of 77% (first dose) and 70% (last dose) in 2023, 86% and 80% in 2024, and 95% and 75% in 2025; among males, 67% and 46% in 2023, 64% and 49% in 2024, and 70% and 47% in 2025. WHO's programme coverage and the profile's figure for 15-year-old girls are different measures.",
          links: [WHO_HPV, CCP, CAPTR],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Malta does differently",
      cards: [
        {
          id: "one-centre",
          title: "One oncology centre, with nurse navigators and a fast track for suspected cancer",
          plain:
            "Cancer care for the whole country is given at the Sir Anthony Mamo Oncology Centre at Mater Dei Hospital. A Cancer Care Pathways Directorate, set up in October 2014, fast-tracks family doctors' referrals for suspected cancer and employs nurse navigators who guide patients from diagnosis through treatment.",
          detail:
            "The 2025 Country Cancer Profile says the centre, opened in 2015, is Malta's only centre for oncology, haemato-oncology and paediatric oncology, with multidisciplinary teams for almost all cancer sites. The Directorate's page lists its services: fast-tracking of suspected cancer referrals to a first hospital consultation, nurse navigation, survivorship services, audits of pathway timelines and patient information. The European Observatory's 2025 case study says nurse navigation began in 2017 and had grown to 12 navigators covering nine cancer types, that 3,379 fast-track e-referrals had been made since that service started and 8,536 patients had used nurse navigation, and that home chemotherapy with portable pumps and outreach nurses was introduced in 2024. In a 2023 OECD survey Malta reported shortages in every cancer profession listed; relative to new cancer cases it had 868 physicians and 1,505 nurses per 1,000 cases against EU averages of 679 and 1,376.",
          links: [CCP, DCCP_PAGE, OBS_PACE, CAPTR],
        },
        {
          id: "radiotherapy",
          title: "One radiotherapy centre, no brachytherapy in 2024, and referral abroad for what Malta lacks",
          plain:
            "Malta has one radiotherapy centre, at the Sir Anthony Mamo Oncology Centre. IAEA's directory, last updated for Malta in 2024, lists three megavoltage treatment machines and no brachytherapy. When a treatment or machine is not available in Malta, patients are referred to specialist centres abroad through a Treatment Abroad service.",
          detail:
            "IAEA's DIRAC row for Malta, last updated in 2024, lists one radiotherapy centre, 3 under high-energy photon and electron beam radiotherapy, 1 X-ray generator and no brachytherapy. The 2025 Country Cancer Profile says that in 2024 Malta was the only EU country without a brachytherapy unit and had no particle accelerators for light ion beam therapy, and that Malta planned stereotactic radiotherapy by early 2025 and brachytherapy by 2026 to 2027; it also mentions one radionuclide teletherapy unit, which DIRAC's row does not show. The European Commission's Recovery and Resilience Facility page records EUR 9.4 million for an MR-guided linear accelerator at the centre, and the profile says Malta commissioned a Unity MR-Linac and delivered the first treatments using its motion-management gating in July 2024. The profile says most patients sent abroad are people with cancer or rare diseases. OnCo found no public count of patients referred abroad and could not confirm whether stereotactic radiotherapy or brachytherapy has started.",
          links: [DIRAC, CCP, EC_MRLINAC],
        },
        {
          id: "cancer-plan",
          title: "Two national cancer plans, 2011 to 2015 and 2017 to 2021; a third was planned for 2025 to 2030",
          plain:
            "Malta has published two national cancer plans, the second covering 2017 to 2021. The OECD's 2025 profile says a third plan, for 2025 to 2030, was planned. OnCo could not find a published third plan and the health ministry's site could not be read.",
          detail:
            "The National Cancer Plan for the Maltese Islands 2017 to 2021 was published by the Ministry for Health in October 2017. The 2025 Country Cancer Profile summarises its four pillars as prevention, early detection through free screening with wider age ranges and a switch of cervical screening to HPV testing, diagnosis and treatment including new radiotherapy services and the planned introduction of new cancer medicines, and quality of life through patient-centred care and nurse navigators; it also proposed a national Cancer Research Foundation. The profile says neither plan made childhood cancer or inequalities a separate aim, and that the National Health Systems Strategy for Malta 2023 to 2030 sets priorities for the next plan, including genetic testing and treatment at home. A Palliative Care Strategy for 2023 to 2033 is also in place.",
          links: [PLAN_2017, CCP],
        },
        {
          id: "children",
          title: "Children with cancer are treated at the same centre, and abroad for what is not available",
          plain:
            "Malta has one institution treating children with cancer, at the Sir Anthony Mamo Oncology Centre. The OECD's 2025 profile quotes National Cancer Registry counts of 18 children and adolescents up to age 15 diagnosed with cancer in 2023 and 13 in 2022. Treatments Malta does not have are given abroad.",
          detail:
            "The 2025 Country Cancer Profile reports that 7 of the 13 facilities and treatment types assessed by the European Society for Paediatric Oncology's OCEAN project were available in Malta, including inpatient and outpatient chemotherapy, surgery, photon radiotherapy, survivorship and palliative care, while stem cell transplantation, proton therapy and brachytherapy were not; children needing those are referred to centres abroad through the Treatment Abroad Unit. It says 78% of 68 recommended medicines for childhood cancer were available in Malta against an EU average of 76%, and that none of the 436 clinical trials that enrolled children and young people in Europe from 2010 to 2022 was conducted in Malta. With so few cases a year, rates for Malta move sharply from one year to the next.",
          links: [CCP],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: CTGOV,
      cards: [
        {
          id: "trial-count",
          title: "Three trials in OnCo's records list a site in Malta; none is recruiting",
          plain:
            "Three trials in OnCo's records include Malta among their countries, all phase 3 and none recruiting now. A search of ClinicalTrials.gov itself finds 13 cancer studies with a site in Malta, and none of those is recruiting either.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph: the CONFIRM trial of two doses of fulvestrant in advanced breast cancer (NCT00099437), the IBIS-II breast cancer prevention study and EORTC 22961 on the length of hormone therapy in prostate cancer. OnCo holds a selection of trials, not the whole registry. A search of ClinicalTrials.gov's public API on 16 November 2026 for the condition cancer with a location in Malta returned 14 studies. One of them is a rheumatoid arthritis trial that matched on a keyword, which leaves 13 cancer studies: 11 completed, 1 active and not recruiting, and 1 expanded access programme. Most were international company or academic trials; one was led by the University of Malta and one by the International Atomic Energy Agency. The 2025 Country Cancer Profile says the 2017 to 2021 plan proposed a national Cancer Research Foundation and that the Cancer Care Pathways Directorate co-ordinates research; the Observatory's case study dates the Directorate's Research Unit to 2023.",
          links: [CTGOV, { label: "CONFIRM (NCT00099437)", url: "https://clinicaltrials.gov/study/NCT00099437" }, CCP, OBS_PACE],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-gov-sites",
      title: "Malta's government health sites refused a script, so older archived copies were read",
      plain:
        "Every gov.mt health site OnCo tried on 16 November 2026 answered with a block page: the Ministry for Health, the Directorate for Health Information and Research, the National Screening Centre, the Directorate for Pharmaceutical Affairs and the government services portal. OnCo read Internet Archive copies where they exist.",
      detail:
        "health.gov.mt, dhir.gov.mt, healthscreening.gov.mt, pharmaceuticalaffairs.gov.mt, servizz.gov.mt and qualityofservice.gov.mt all returned HTTP 403 with a Cloudflare block page; only medicinesauthority.gov.mt answered. The Internet Archive copies used date from 29 March 2023 (registry tables), 12 July and 9 August 2025 (the Cancer Care Pathways, registry and screening pages) 8 June 2026 (the 2017 to 2021 plan) and 16 August 2026 (the mortality report), so anything changed since then is not on this page. Not read as a result: the current Government Formulary List, the Directorate for Pharmaceutical Affairs' own description of its committees (the PPRI brief describes 2021), the National Screening Centre's 2024 service charter and its current age ranges, the Treatment Abroad service's own page, and the National Health Systems Strategy 2023 to 2030.",
      links: [
        { label: "Ministry for Health, Malta", url: "https://health.gov.mt/" },
        { label: "Directorate for Health Information and Research", url: "https://dhir.gov.mt/" },
        { label: "National Screening Centre", url: "https://healthscreening.gov.mt/" },
        { label: "Directorate for Pharmaceutical Affairs", url: "https://pharmaceuticalaffairs.gov.mt/" },
      ],
    },
    {
      id: "gap-registry-years",
      title: "No registry counts after 2019",
      plain:
        "The Malta National Cancer Registry's public tables that OnCo could read stop at 2019. The registry page did not list a later set when it was archived in August 2025, and no registry annual report newer than the one for 1998 to 2000 is listed there.",
      detail:
        "The tables are marked as updated in January 2023 and carry extraction dates in 2021 and 2022. The 2018 all-cancer counts (1,669 in men and 1,364 in women) are far above 2017 and 2019 while the separate tables for breast, prostate, bowel and lung are not, and the file gives no explanation; OnCo prints them as published and draws no conclusion from them. Stage at diagnosis and survival by cancer are not in these tables. The OECD profile quotes registry counts of childhood cancers for 2022 and 2023, so later data exist inside the registry. The registry page's own background text is old: it still quotes the 2005 census and about 1,200 diagnoses a year.",
      links: [NCR_PAGE, NCR_ALL],
    },
    {
      id: "gap-plan-and-news",
      title: "The third National Cancer Plan, and what has changed since 2024",
      plain:
        "OnCo did not find a published National Cancer Plan for 2025 to 2030 and could not read the ministry's site to check. Whether screening ages were widened in 2025, and whether stereotactic radiotherapy and brachytherapy have started, could not be confirmed from a source read today.",
      detail:
        "The 2025 Country Cancer Profile describes the third plan, the wider screening ages and the new radiotherapy services as intentions. A web search on 16 November 2026 surfaced no plan document. Maltese news sites that might report these changes (The Malta Independent and MaltaToday) refused a script with HTTP 403, and OnCo does not take facts from search snippets. The European Commission's project page still says the MR-guided machine would be fully operational by mid-2024; the profile reports the first treatments using the machine's motion-management gating in July 2024.",
      links: [CCP, EC_MRLINAC],
    },
    {
      id: "gap-other",
      title: "Other things looked for and not found",
      plain:
        "The Malta Community Chest Fund Foundation's accounts are scanned images with no readable text, so its spending is quoted from the OECD profile, which cites press reports. OnCo found no public figure for waiting times for cancer treatment, for patients sent abroad, or for survival by stage in Malta.",
      detail:
        "The Foundation's summary financial statements for 2024 were downloaded and contain no text layer. The Cancer Performance Tracker notes that it holds no data for Malta on CT scanners, MRI units or radiation therapy equipment, and no data on cancer medicines reimbursement because none of the sampled indications was on the national list. IAEA's DIRAC row shows zero under its linear accelerator fields while showing 3 under high-energy photon and electron beam radiotherapy; OnCo reports the fields as named and does not know why they differ. The current number of oncologists was not found. No person is listed on this page because no institution page read today names a current office holder for the cancer services; the registry page that names its contacts is an archived copy from 2025.",
      links: [MCCFF_ABOUT, CAPTR, DIRAC],
    },
  ],
  institutions: [
    "sir-anthony-mamo-oncology-centre",
    "malta-national-cancer-registry",
    "malta-medicines-authority",
    "directorate-pharmaceutical-affairs-malta",
    "national-screening-centre-malta",
    "malta-community-chest-fund-foundation",
  ],
  companies: [],
  drugs: [],
  trials: ["nct00099437", "ibis-ii", "eortc-22961"],
  papers: [],
  people: [],
  how:
    "Every card was written from Maltese and European public sources read as raw text on 16 November 2026: the OECD and European Commission's 2025 Country Cancer Profile and performance tracker, the Malta National Cancer Registry's tables and page, the Annual Mortality Report 2023, the National Screening Centre's pages, the PPRI Pharma Brief written by the Directorate for Pharmaceutical Affairs, the Malta Medicines Authority's site, the European Medicines Agency's leaflet, the Malta Community Chest Fund Foundation's site, the European Observatory's case study, IAEA's DIRAC, WHO's immunisation data, the World Bank, ClinicalTrials.gov and IARC's GLOBOCAN 2024 fact sheet. Maltese government pages were read through Internet Archive copies, in Maltese where that is the language of the page, because the live sites refused a script.",
  verify:
    "Several sources here are archived copies from 2023, 2025 and 2026, and the registry's tables stop at 2019. Screening ages, the Government Formulary List and radiotherapy services change; check with the National Screening Centre, the Directorate for Pharmaceutical Affairs or the oncology centre before relying on a detail. Whether a medicine is free for one person depends on the formulary's entitlement rules or an exceptional request.",
  verifyLinks: [
    { label: "National Screening Centre", url: "https://healthscreening.gov.mt/" },
    { label: "Directorate for Health Information and Research", url: "https://dhir.gov.mt/" },
    { label: "Malta Medicines Authority", url: "https://medicinesauthority.gov.mt/" },
    IARC_FACTSHEET,
  ],
};
