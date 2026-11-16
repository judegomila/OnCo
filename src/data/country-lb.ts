import type { CountryDive } from "@/data/country-dive";

/**
 * Lebanon deep dive: the hand-written cards for /countries/lb/ (wave 10). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Ministry of Public Health's National Cancer Registry page and
 * its tables of counts for 2005 to 2024 (HTML), the Ministry's Health System Assessment and Reform Priorities (PDF
 * text, dated 27 October 2026), its Arabic news pages on the 2026 breast and prostate screening campaigns, the childhood
 * cancer initiative and the medicines reforms (translated by OnCo), the spreadsheet of medicines in its Catastrophic
 * Disease Management Program, the National Social Security Fund's home page, the Children's Cancer Center of Lebanon's
 * own pages, WHO's immunisation data API, the World Bank's API for WHO health expenditure series, ClinicalTrials.gov
 * participation data in OnCo's graph, IARC's GLOBOCAN 2024 fact sheet for Lebanon (PDF text), and the papers' abstracts
 * (and two open-access full texts) through Europe PMC. Where a figure could not be read it is named under `gaps`.
 *
 * Lebanon has lived through a financial collapse since late 2019, the Beirut port explosion of August 2020, and armed
 * conflict in 2024 and again in 2026. The cards state what official and peer-reviewed sources record about the effect
 * on cancer care and do not go beyond them.
 */
const NCR = "https://www.moph.gov.lb/en/Pages/8/19526/national-cancer-registry";
const NCR_2024 = "https://www.moph.gov.lb/userfiles/files/Esu_data/Esu_ncr/BA2024.HTM";
const NCR_2019 = "https://www.moph.gov.lb/userfiles/files/Esu_data/Esu_ncr/BA2019.HTM";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/422-lebanon-fact-sheet.pdf";
const HSA_2026 = "https://www.moph.gov.lb/userfiles/files/About%20MOPH/StrategicPlans/National-Health-Strategy%E2%80%93Vision2030/Reforms%20Health%20system%20final_%2027-10-2026.pdf";
const HSA_PAGE = "https://www.moph.gov.lb/en/Pages/0/86899/health-system-assessment-reform-priorities";
const CDMP_LIST = "https://www.moph.gov.lb/en/Pages/4/77215/list-of-medications-provided-by-moph-in-the-catastrophic-disease-management-program";
const BREAST_2026 = "https://www.moph.gov.lb/en/Pages/0/87269/nassereddine-launches-national-breast-cancer-awareness-and-early-detection-campaign";
const BREAST_LISTS = "https://www.moph.gov.lb/en/Pages/0/87129/national-breast-cancer-awareness-campaign-2026";
const PROSTATE_2026 = "https://www.moph.gov.lb/en/Pages/0/87718/nassereddine-announces-the-launch-of-the-national-campaign-for-prostate-cancer-screening";
const DOSSIERS_2026 = "https://www.moph.gov.lb/en/Pages/0/87710/nassereddine-announces-the-establishment-of-modern-standards-for-reviewing-pharmaceutical-dossiers-i";
const CCCL_MOU = "https://www.moph.gov.lb/en/Pages/0/87050/moph-and-the-children-s-cancer-center-launche-the-national-initiative-to-raise-awareness-about-child";
const NSSF = "https://www.cnss.gov.lb/";
const CCCL_ABOUT = "https://www.cccl.org.lb/about-us";
const WB_OOP = "https://api.worldbank.org/v2/country/LBN/indicator/SH.XPD.OOPC.CH.ZS?format=json&date=2010:2025";
const WB_GOV = "https://api.worldbank.org/v2/country/LBN/indicator/SH.XPD.GHED.CH.ZS?format=json&date=2010:2025";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'LBN'%20and%20startswith(ANTIGEN,'HPV')";
const WHO_HEPB3_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LBN'%20and%20ANTIGEN%20eq%20'HEPB3'%20and%20COVERAGE_CATEGORY%20eq%20'WUENIC'";
const CTGOV = "https://clinicaltrials.gov/search?country=Lebanon&cond=cancer";
const NCP_ABSTRACT = "https://www.moph.gov.lb/userfiles/files/About%20MOPH/StrategicPlans/National%20Cancer%20Plan%202023-2028/NCP%20ABSTRACT%20OFFICIAL%20VERSION.pdf";
const NCP_REVIEW = "https://moph.gov.lb/userfiles/files/About%20MOPH/StrategicPlans/National%20Cancer%20Plan%202023-2028/One%20year%20review%20of%20the%20National%20Cancer%20Plan.pdf";
const DIRAC = "https://dirac.iaea.org/Data/Country/LBN";

const MINA = { label: "Mina et al., the collapse in registration of innovative medicines in Lebanon (PLOS ONE 2025)", url: "https://doi.org/10.1371/journal.pone.0330585" };
const EL_ASSAAD = { label: "El Assaad et al., subsidy cuts and immunotherapy access for small cell lung cancer (JCO Glob Oncol 2026)", url: "https://doi.org/10.1200/go-25-00564" };
const HODROJ = { label: "Hodroj et al., immunotherapy shortage and stage IV lung cancer in Lebanon (JCO Glob Oncol 2026)", url: "https://doi.org/10.1200/go-26-00203" };
const SAMAHA = { label: "Samaha Jabbour et al., radiation therapy in Lebanon through financial collapse and armed conflict (Front Oncol 2026)", url: "https://doi.org/10.3389/fonc.2026.1836449" };
const EID = { label: "Eid et al., the economic crisis and drug shortage, as reported by cancer patients (World J Clin Oncol 2024)", url: "https://doi.org/10.5306/wjco.v15.i5.644" };
const RAAD = { label: "Raad et al., the cost of bladder cancer in Lebanon before and after the collapse (Int J Equity Health 2023)", url: "https://doi.org/10.1186/s12939-023-01885-8" };
const SEOUD = { label: "Seoud et al., a pilot of cervical screening in primary care centres (Int J Gynaecol Obstet 2023)", url: "https://doi.org/10.1002/ijgo.14489" };
const SHARMA = { label: "Sharma et al., cost-effectiveness of increasing cervical screening coverage in Lebanon (Vaccine 2017)", url: "https://doi.org/10.1016/j.vaccine.2016.12.015" };
const ISSA = { label: "Issa et al., breast cancer screening practices during a multifaceted crisis (PLOS ONE 2025)", url: "https://doi.org/10.1371/journal.pone.0325604" };

export const LB_DIVE: CountryDive = {
  iso2: "LB",
  iso3: "LBN",
  name: "Lebanon",
  flag: "🇱🇧",
  asOf: "2026-11-11",
  title: "Cancer in Lebanon",
  description:
    "Cancer in Lebanon from Lebanese sources: a national cancer registry that counted 17,483 new cancers in 2024, IARC's estimate of 17,728 cancers and 8,706 deaths, the Ministry of Public Health as payer of last resort and supplier of high-cost cancer medicines, the collapse of social insurance and medicine registration after 2019, free year-round mammography in government hospitals from 2026, childhood cancer treated free through a centre founded with St. Jude, radiotherapy adapting through war, and 16 trials in our records with a Lebanese site.",
  lede:
    "Lebanon counts its cancers nationally: its Ministry of Public Health registry recorded 17,483 new cancers in 2024, breast cancer first and, leaving aside non-melanoma skin cancer, lung, prostate, colon and bladder cancer next. Since late 2019 a financial collapse, then wars in 2024 and 2026, have cut what insurance pays and which new medicines reach the country; the Ministry now supplies high-cost cancer medicines to more patients than before, and has made breast screening free in its hospitals.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Lebanon is 17,728 new cancers and 8,706 deaths, an age-standardised incidence of 242.2 per 100,000 (259.6 in men, 232.5 in women) and mortality of 116.5. IARC's fact sheet names a national registry as its source and gives its method as national rates applied to the 2024 population; mortality is national incidence applied to model-based mortality-to-incidence ratios from registry survival data. The registry's own count for 2024 is close: 17,483 cancers, against IARC's 17,728. The two differ by site. The registry counted 3,855 breast cancers (IARC 3,404) and 1,257 non-melanoma skin cancers (IARC 456), but fewer bladder cancers, 1,242 against IARC's 1,680. IARC's breast cancer rate for Lebanon is 93.3 per 100,000 women standardised to the world population; the registry publishes counts and crude rates rather than world-standardised rates, so the two cannot be compared rate for rate here. Lebanon's population is itself uncertain: the Ministry's 2026 assessment notes the lack of a modern census and movement through displacement and migration, and IARC uses 5,805,968 for 2024.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Lebanon",
      aside: { label: "Ministry of Public Health: National Cancer Registry", url: NCR },
      cards: [
        {
          id: "shape",
          title: "About 17,500 new cancers a year, breast cancer first",
          plain:
            "The national cancer registry counted 17,483 new cancers in 2024: 9,297 in women and 8,159 in men. Breast cancer was the commonest, with 3,855 cases, followed by lung, prostate, colon and bladder cancer, leaving aside non-melanoma skin cancer. IARC estimates about 8,700 cancer deaths a year, with lung cancer causing the most.",
          detail:
            "The registry's 2024 table, dated 23 January 2026, gives 17,483 cancers including non-melanoma skin cancer and 16,226 without it. By site: breast 3,855 (92 in men), trachea, bronchus and lung 1,595 (980 men, 613 women), prostate 1,494, colon 1,251 and rectum 338, bladder 1,242 (999 men), non-Hodgkin lymphoma 736, thyroid 453 (340 women), multiple myeloma 394 and cervix 125. IARC's GLOBOCAN 2024 fact sheet ranks prostate, bladder and lung first in men and breast, colorectum and lung in women, and lung, breast and colorectal cancer as the leading causes of cancer death; it puts the risk of a cancer before age 75 at 25.6% for men and 22.9% for women, and estimates 42,382 people living within five years of a diagnosis. Bladder cancer is notably common: a 2023 cost study calls Lebanon's bladder cancer incidence one of the highest in the world. The registry's annual totals rose from 11,561 in 2012 to 15,117 in 2019, dipped to 13,456 in 2020 and 13,744 in 2021, and reached 17,068 in 2023; whether the dip reflects fewer diagnoses during the crisis and the pandemic or fewer reports reaching the registry is not stated.",
          links: [
            { label: "MoPH: National Cancer Registry, 2024 counts by site, both sexes (table dated 23 January 2026)", url: NCR_2024 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Lebanon (PDF)", url: IARC_FACTSHEET },
            RAAD,
          ],
        },
        {
          id: "crisis",
          title: "Cancer care through a financial collapse and two wars",
          plain:
            "Since late 2019 Lebanon's currency has lost more than 90% of its value, insurance funds have lost most of their purchasing power, and medicines ran short in 2021 and 2022. The 2024 war damaged about a third of the country's health facilities, and the Ministry of Public Health describes a further war in 2026 whose damage has not yet been assessed.",
          detail:
            "The Ministry of Public Health's Health System Assessment and Reform Priorities, dated October 2026 and prepared with WHO technical support, records that the 2024 conflict caused about 208 million US dollars of direct damage to the health sector, affecting 885 facilities (298 destroyed, 587 partly damaged), about one third of the country's baseline health infrastructure, with Nabatiyeh, South Lebanon and Baalbek-Hermel the governorates most affected; it puts losses at 700 million dollars and recovery needs at 409 million. It says that comprehensive assessments of the ongoing 2026 conflict are not yet available. A 2026 study of radiotherapy reports that two radiotherapy centres in South Lebanon and the Bekaa had to suspend operations in 2024, and that patients were redistributed to centres elsewhere. Patients felt the crisis first through medicines: in February 2022, 31.87% of 182 outpatients at a Beirut hospital had had treatment interrupted, mainly by drug shortages, and 69.60% paid for medicines themselves although 87.91% had insurance; in a multicentre survey in 2020 and 2021, 49.6% had difficulty finding chemotherapy medicines. The Ministry publishes regular updates of the conflict's toll on its website.",
          links: [
            { label: "MoPH: Health System Assessment and Reform Priorities, sections 4.5 and 5.2 (October 2026, PDF)", url: HSA_2026 },
            SAMAHA,
            EID,
            { label: "Nawfal et al., cancer patients during COVID-19 and the Lebanese financial crisis (ecancermedicalscience 2022)", url: "https://doi.org/10.3332/ecancer.2022.1359" },
          ],
        },
      ],
      tables: [
        {
          id: "lb-registry",
          title: "What Lebanon's National Cancer Registry has counted",
          caption: "New cancers recorded by the Ministry of Public Health's registry, by year of diagnosis; counts, not rates. Latest year: 2024.",
          columns: [
            { key: "year", label: "Year" },
            { key: "all", label: "All cancers", numeric: true },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "noskin", label: "Excluding non-melanoma skin", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "lung", label: "Lung", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "bladder", label: "Bladder", numeric: true },
          ],
          rows: [
            { year: "2012", all: 11561, men: 5548, women: 5985, noskin: 10797, breast: 2337, lung: 993, prostate: 870, bladder: 726 },
            { year: "2016", all: 12238, men: 5963, women: 6262, noskin: 11392, breast: 2309, lung: 1133, prostate: 901, bladder: 726 },
            { year: "2019", all: 15117, men: 7136, women: 7980, noskin: 14075, breast: 3067, lung: 1350, prostate: 1088, bladder: 1076 },
            { year: "2020", all: 13456, men: 6240, women: 7176, noskin: 12643, breast: 2849, lung: 1290, prostate: 858, bladder: 950 },
            { year: "2021", all: 13744, men: 6152, women: 7589, noskin: 12850, breast: 3133, lung: 1243, prostate: 832, bladder: 940 },
            { year: "2022", all: 14269, men: 6445, women: 7824, noskin: 13390, breast: 3309, lung: 1306, prostate: 912, bladder: 1137 },
            { year: "2023", all: 17068, men: 7734, women: 9321, noskin: 15981, breast: 3845, lung: 1638, prostate: 1408, bladder: 1167 },
            { year: "2024", all: 17483, men: 8159, women: 9297, noskin: 16226, breast: 3855, lung: 1595, prostate: 1494, bladder: 1242 },
          ],
          note: "Read from the registry's tables of counts by site for each year. Men and women do not always sum to the total because a few cases have sex unspecified. Breast includes men. The tables for 2012 to 2022 are dated 2 October 2025 (2015's 9 November 2025) and those for 2023 and 2024 January 2026, so earlier years may have been revised. The registry does not publish deaths.",
          sources: [
            { label: "MoPH: National Cancer Registry, tables 2005 to 2024", url: NCR },
            { label: "MoPH: 2024 counts by site, both sexes", url: NCR_2024 },
            { label: "MoPH: 2019 counts by site, both sexes", url: NCR_2019 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry fed by the Ministry's drug centre",
      aside: { label: "Ministry of Public Health: National Cancer Registry", url: NCR },
      cards: [
        {
          id: "registry-ncr",
          title: "A national registry with tables back to 2005, released late",
          plain:
            "Lebanon's National Cancer Registry belongs to the Ministry of Public Health's surveillance programme. Doctors report new cancers, some through the Ministry centre that hands out cancer medicines, and registry staff collect cases from pathology and blood laboratories to check and complete them. Its tables for 2005 to 2024 are public, but most were published only in late 2025.",
          detail:
            "The registry's page sets out its method: target cases are malignant tumours of all sites confirmed by histopathology or haematology, by year of diagnosis, coded with ICD-O-3. Data come through a capture system, in which physicians complete a reporting form in their clinic or indirectly through the Ministry's Drug Dispensing Center, where anticancer drugs are distributed to eligible patients, and a recapture system, in which registry staff contact histopathology and haematology laboratories directly. Reports for 2003 to 2004 and 2005 to 2007 are posted with yearly tables of counts by site, by age and as proportions, and graphs of crude rates for 2005 to 2024. Users are asked to cite the Ministry and to use the data for non-commercial public health purposes. The tables for 2016 to 2022 carry the date 2 October 2025, and a 2026 radiotherapy study notes that site-specific data for 2016 to 2024 were released only retrospectively in late 2025, which limited real-time planning. The Ministry also runs a hospital-based cause of death notification system, but the registry itself publishes no deaths or survival.",
          links: [
            { label: "MoPH: National Cancer Registry (method, reporting form, reports and tables)", url: NCR },
            SAMAHA,
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: many funds, a Ministry of last resort, and households",
      aside: { label: "MoPH: Health System Assessment and Reform Priorities (October 2026)", url: HSA_PAGE },
      cards: [
        {
          id: "funds",
          title: "Several insurance funds, and the Ministry pays for uninsured Lebanese",
          plain:
            "Lebanese health care is paid for by several public funds (social security for private employees, a civil servants' cooperative, military and security funds), private insurers, households and aid. The Ministry of Public Health pays hospital care and some medicines for Lebanese with no other cover. In a 2023 to 2024 survey, 37% of adults said they had health insurance.",
          detail:
            "The Ministry's Health System Assessment of October 2026 describes the Ministry as insurer of last resort for eligible uninsured Lebanese, financing medicines, hospitalisation and most recently primary care, while non-Lebanese residents often reach primary care at nominal fees and depend on UN, humanitarian and charitable arrangements for hospital care. It records that the National Social Security Fund's share of health financing fell from 48% in 2019 to 17% in 2023, and that its average drug reimbursement per beneficiary fell from 350 US dollars a year in 2013 to 2018 to 1 dollar in 2023, a fall it says may reflect interrupted processing of claims, reimbursement of only the cheapest generics, outdated tariffs and patients forgoing care. The fund's home page counts 1,273,097 health beneficiaries. WHO's health expenditure series, through the World Bank, put out-of-pocket payments at 29.7% of current health spending in 2023 (30.7% in 2019), and the government's share at 37.9% (49.3% in 2019, 26.9% in 2021); the Assessment cautions that post-crisis estimates of out-of-pocket spending vary widely and that the last National Health Accounts cover 2021. A 2023 modelling study of bladder cancer estimated that after the collapse out-of-pocket payments rose by 2,745% and payers covered 17% of costs.",
          links: [
            { label: "MoPH: Health System Assessment and Reform Priorities, sections 5.1 and 5.3 (PDF)", url: HSA_2026 },
            { label: "National Social Security Fund: home page (Arabic)", url: NSSF },
            { label: "World Bank API: out-of-pocket expenditure, % of current health expenditure, Lebanon (WHO GHED)", url: WB_OOP },
            { label: "World Bank API: domestic general government health expenditure, % of current health expenditure, Lebanon", url: WB_GOV },
            RAAD,
          ],
        },
        {
          id: "catastrophic-medicines",
          title: "High-cost cancer medicines from the Ministry, to 5,865 cancer patients in 2024",
          plain:
            "The Ministry of Public Health supplies selected expensive medicines for serious diseases through its Catastrophic Disease Management Program. Cancer patients were its largest group in 2024, 5,865 people. As insurance funds lost value, patients from nearly every scheme turned to it. In October 2022 the public subsidy for immunotherapy drugs was withdrawn.",
          detail:
            "The Health System Assessment's table of the program's beneficiaries for 2024 lists cancer 5,865, autoimmune diseases 3,219, organ transplant 1,353, multiple sclerosis 603 and others, and says that over the past two years the crisis widened the program beyond Ministry-covered patients to those of nearly all insurance schemes, putting its sustainability in doubt without long-term financing. The Ministry's list of the program's medicines, posted in October 2024, has 105 entries under antineoplastic drugs and six for children, including pembrolizumab, nivolumab, atezolizumab, palbociclib, trastuzumab and trastuzumab emtansine, mostly by brand or as biosimilars. Being on the list does not mean a medicine is free or in stock; eligibility rules are strict and are not published with the list. A study at Hôtel-Dieu de France University Hospital reports that Lebanon officially withdrew public subsidies for immune checkpoint inhibitors in October 2022; among 71 patients with extensive small cell lung cancer diagnosed from 2019 to 2024, 75% did not receive the recommended treatment, and access depended on how they paid. A multicentre study of stage IV lung cancer treated before and during the shortage of 2021 and 2022 found that 56% of patients given immunotherapy received reduced doses.",
          links: [
            { label: "MoPH: Health System Assessment and Reform Priorities, section 5.2 and table 9 (PDF)", url: HSA_2026 },
            { label: "MoPH: list of medications provided in the Catastrophic Disease Management Program", url: CDMP_LIST },
            EL_ASSAAD,
            HODROJ,
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Ministry, while a drug agency waits to start",
      aside: { label: "MoPH: modern standards for reviewing pharmaceutical dossiers with WHO (6 November 2026, Arabic)", url: DOSSIERS_2026 },
      cards: [
        {
          id: "registration",
          title: "New medicines registered: from 43.6% of FDA approvals before the crisis to none after",
          plain:
            "Medicines in Lebanon are registered by a technical committee of the Ministry of Public Health, which relies on decisions of the US FDA, the European Medicines Agency and regulators that follow WHO. A 2025 study found that none of the innovative medicines approved by the FDA or the European agency from 2020 to 2024 had been registered in Lebanon.",
          detail:
            "Mina and colleagues describe registration of innovative medicines as the mandate of the Ministry's Technical Committee for drug registration, which under Decree No. 571 recognises the FDA, the EMA and health authorities aligned with WHO recommendations as reference authorities. Comparing medicines approved in 2014 to 2019 with 2020 to 2024, the share of FDA-approved innovative medicines registered in Lebanon fell from 43.6% to 0% and of EMA-approved ones from 59.4% to 0%; before the crisis registration took under two years on average, and afterwards delays are estimated at more than four years. Interviewees attributed this to an informal policy within the Ministry to prioritise generics and biosimilars and avoid costly new therapies, and said it pushed patients to parallel imports; the authors recommend separating registration from reimbursement. The Ministry's 2026 Assessment notes that around half of registered products were reported as not marketed, and that about 74% of medicines available are imported. Its MediTrack system tracks medicines by two-dimensional barcode.",
          links: [
            MINA,
            { label: "MoPH: Health System Assessment and Reform Priorities (PDF)", url: HSA_2026 },
            { label: "MoPH: MediTrack, track and trace system for pharmaceuticals", url: "https://www.moph.gov.lb/en/Pages/6/2020/meditrack-project-track-trace-medicines-through-the-2d-barcode" },
          ],
        },
        {
          id: "drug-agency",
          title: "A Lebanese Drug Agency created by law in 2022, and WHO help with biosimilar reviews",
          plain:
            "A 2022 law created an independent Lebanese Drug Agency to register medicines, oversee clinical trials and monitor safety. In November 2026 the Health Minister said its appointments would be made soon, and announced draft standards for reviewing medicine files, prepared with a WHO team that trained university reviewers to assess biosimilars.",
          detail:
            "The Ministry's Health System Assessment lists Law No. 253/2022 as establishing the Lebanese Drug Agency as an independent regulator responsible for drug registration, quality control of laboratories, pharmacovigilance, clinical trials oversight, supply chain monitoring and regulatory approvals, and describes pharmaceutical governance as in transition. On 6 November 2026 the Minister of Public Health, Dr Rakan Nassereddine, told a press conference, with WHO's representative in Lebanon present, that a WHO technical team had run a workshop training an academic team drawn from Lebanese universities to review dossiers for biosimilar medicines, and that draft updated standards for reviewing every biological and biosimilar medicine entering Lebanon would be adopted once approved, pending completion of the National Drug Agency, whose appointments would be made soon with the Civil Service Council. WHO's representative said the work was supported by the European Union. OnCo found no WHO maturity level rating for Lebanon's regulator; see the gaps.",
          links: [
            { label: "MoPH: Health System Assessment and Reform Priorities, section 5.1.1 (PDF)", url: HSA_2026 },
            { label: "MoPH: the Minister announces modern standards for reviewing pharmaceutical dossiers with WHO (6 November 2026, Arabic)", url: DOSSIERS_2026 },
            MINA,
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "MoPH: National Breast Cancer Awareness Campaign 2026", url: BREAST_LISTS },
      cards: [
        {
          id: "breast-screening",
          title: "Free mammography all year in government hospitals for women over 40, from 2026",
          plain:
            "Lebanon has run national breast cancer awareness campaigns with mammography screening since 2002. In October 2026 the Ministry turned the campaign into a year-round programme: every government hospital now has a digital mammography machine, and the scan is free for Lebanese women over 40 at any time of year.",
          detail:
            "At the launch on 8 October 2026 the Minister said the Ministry had moved from a campaign to a programme, with digital mammography funded by the Ministry in every government hospital, free all year to Lebanese women over 40, linked to primary health care centres so that a woman with an abnormal result is followed up and referred; some private hospitals offered to take part for 30 US dollars, and contracted centres offer reduced prices for three months. He put breast cancer at about 23% of all cancers, over 3,800 cases a year. The chair of the national committee said campaigns begun more than 25 years ago moved diagnosis earlier, from two thirds of cancers found at an advanced stage in the 1990s to about 65% found early now, with about a third still found late, a share that rose after COVID-19 and the financial crisis; these are his figures as the Ministry reports them. The Ministry's 2026 Assessment records that breast screening in its primary care network fell by 48% in 2024 against 2023, and that Lebanon has 2.08 mammography units per 100,000 people. A 2023 survey of 400 women found one in ten had stopped mammography after 2020.",
          links: [
            { label: "MoPH: the Minister launches the national breast cancer awareness and early detection campaign (8 October 2026, Arabic)", url: BREAST_2026 },
            { label: "MoPH: National Breast Cancer Awareness Campaign 2026, with lists of participating hospitals", url: BREAST_LISTS },
            { label: "MoPH: Health System Assessment and Reform Priorities, sections 5.2 and 5.4 (PDF)", url: HSA_2026 },
            ISSA,
          ],
        },
        {
          id: "cervix-hpv-prostate",
          title: "No organised cervical screening and no HPV vaccine in the schedule; a prostate campaign from November 2026",
          plain:
            "Cervical screening in Lebanon has been opportunistic, mostly for women who can pay, and WHO records no national introduction of the HPV vaccine. A pilot showed smear tests can be offered through public primary care. In November 2026 the Ministry began paying for a PSA blood test, and an MRI if needed, for men aged 50 to 70 in government hospitals.",
          detail:
            "A 2017 modelling study stated that Lebanon has no national organised cervical screening programme, so screening is opportunistic and limited to women who can pay out of pocket, and found that screening half of women every three to five years would give more benefit at lower cost than repeated yearly smears for a few. A pilot through Ministry primary health care centres screened 12,273 women by cytology, of whom 1.7% had an abnormal smear. The Ministry's Assessment records that cervical screening in its primary care network fell by 33% in 2024 against 2023. WHO's immunisation data record no national introduction of HPV vaccine in Lebanon for any year from 2006 to 2025. Hepatitis B vaccine has been in the schedule since at least 2006, but WHO and UNICEF estimate third-dose coverage fell from 83% in 2018 and 2019 to 49% in 2024 and 52% in 2025; the Assessment warns that administrative coverage depends on population denominators. On 7 November 2026 the Minister launched a national prostate cancer screening campaign, to 15 February 2027, with a PSA test at the Ministry's expense for Lebanese men aged 50 to 70 in government hospitals and an MRI if the result is concerning; he said 12 government hospitals have MRI and 9 more are being equipped. PSA screening has known harms as well as benefits; ask what a raised result would lead to.",
          links: [
            SHARMA,
            SEOUD,
            { label: "WHO immunisation data: HPV vaccine introduction rows for Lebanon (API)", url: WHO_INTRO_API },
            { label: "WHO immunisation data: hepatitis B third-dose coverage estimates for Lebanon (API)", url: WHO_HEPB3_API },
            { label: "MoPH: the Minister announces the national prostate cancer screening campaign (7 November 2026, Arabic)", url: PROSTATE_2026 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Lebanon does",
      title: "What Lebanon does differently",
      cards: [
        {
          id: "children-free",
          title: "Children with cancer treated free, through a centre founded with St. Jude",
          plain:
            "The Children's Cancer Center of Lebanon was founded in 2002 through an agreement with St. Jude Children's Research Hospital in the United States and the American University of Beirut Medical Center. It treats children free of charge whatever their nationality, and says it supports almost 60% of children with cancer in Lebanon. In 2026 it signed an agreement with the Ministry.",
          detail:
            "The centre's own pages say it was inaugurated in 2002 as a foundation under Notice No. 138AD, as a result of an agreement with St. Jude Children's Research Hospital and the American University of Beirut Medical Center; that it treats children and adolescents up to 18 at no cost, including non-Lebanese children from the region and refugees; and that it supports almost 60% of children with cancer in Lebanon, a figure OnCo could not check against the registry. On 22 September 2026 the Ministry of Public Health and the centre signed a memorandum of understanding and launched a national initiative on the warning signs of childhood cancer. The Ministry's Director General said the Ministry is committed to no child being denied treatment for financial reasons, continues to supply its approved cancer medicines for children, and supports the centre financially under annual contribution agreements; the centre said the work continues amid ongoing financial challenges. The Ministry's list of high-cost medicines includes a separate set of six chemotherapy entries for children.",
          links: [
            { label: "Children's Cancer Center of Lebanon: who we are", url: CCCL_ABOUT },
            { label: "MoPH: the Ministry and the Children's Cancer Center launch a national childhood cancer awareness initiative (22 September 2026, Arabic)", url: CCCL_MOU },
            { label: "MoPH: list of medications provided in the Catastrophic Disease Management Program", url: CDMP_LIST },
          ],
        },
        {
          id: "radiotherapy-adapting",
          title: "Radiotherapy adapted to war: shorter courses, fewer journeys",
          plain:
            "Before the crisis Lebanon had about 12 radiotherapy centres, mostly private and in Beirut and Mount Lebanon. During the 2024 war two centres in the south and the Bekaa had to stop treating, and one centre near Beirut moved to shorter courses: short-course breast radiotherapy rose from about a third of treatments in 2023 to almost three quarters in 2025.",
          detail:
            "Samaha Jabbour and colleagues, at Mount Lebanon Hospital, report about 12 radiotherapy centres before the financial crisis and about four linear accelerators per million people, a number they call numerically adequate but fragile, with much equipment over ten years old and no national replacement schedule. Staffing was below European benchmarks: 3.9 radiation therapists per machine against 5 to 7, and 0.8 medical physicists against 1.2 to 1.7, with half of radiation oncologists and 40% of physicists part-time and no nationally accredited training pathway. At their centre, patients treated rose from 1,186 in 2018 to 1,498 in 2022, fell to 1,328 in 2023 and rose to 1,479 in 2025 as patients from closed centres moved there; hypofractionated breast radiotherapy rose from 34.1% in 2023 to 73.0% in 2025, which the authors explain by fewer hospital visits and less unsafe travel during the conflict. They caution that one centre's stability may hide a national contraction. The Ministry's 2026 Assessment counts 0.31 nuclear medicine units and 1.19 MRI units per 100,000 people.",
          links: [
            SAMAHA,
            { label: "MoPH: Health System Assessment and Reform Priorities, table 7 (PDF)", url: HSA_2026 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "Sixteen trials in OnCo's records have a site in Lebanon",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 16 of the cancer trials in our records list Lebanon among their countries: 9 have completed, 6 are active but no longer recruiting and 1 is recruiting. All are large international company trials, in lung, breast and prostate cancer, melanoma and blood cancers. Lebanese research since 2019 has documented what the crisis did to cancer care.",
          detail:
            "The completed trials are ASCEND-4 (NCT01828099) and NCT01828112, Novartis phase 3 trials of ceritinib in ALK-positive lung cancer; CheckMate 227 (nivolumab with ipilimumab) and EMPOWER-Lung 1 (cemiplimab) in untreated lung cancer; GEOMETRY mono-1, capmatinib in MET-altered lung cancer; ATLANTIS, lurbinectedin in relapsed small cell lung cancer; MONALEESA-2 (ribociclib) and SOLAR-1 (alpelisib) in hormone receptor-positive breast cancer; and 10TASQ10, tasquinimod in prostate cancer. Still active are KontRASt-02 (NCT05132075), JDQ443 against docetaxel in KRAS G12C lung cancer; NCT04603807, entrectinib against crizotinib in ROS1 lung cancer; heredERA (NCT05296798), giredestrant with Phesgo in HER2-positive, oestrogen receptor-positive breast cancer; PRIMORDIUM (NCT04557059), apalutamide with radiotherapy in high-risk prostate cancer; NCT06054555, Amgen's ABP 206 against nivolumab in melanoma; and INDEPENDENCE (NCT04717414), Celgene's luspatercept in myelofibrosis. The one recruiting is a long-term safety study of luspatercept (NCT04064060). That reflects the trials OnCo holds, not every study in Lebanon; the search linked below shows them all. Lebanese studies on this page include the drug registration analysis, the subsidy withdrawal and immunotherapy dose studies, the radiotherapy study, patient surveys on shortages and a bladder cancer cost study. The Ministry publishes a list of the institutional review boards it has authorised to approve research.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Lebanon (search)", url: CTGOV },
            MINA,
            HODROJ,
            { label: "MoPH: list of authorized IRBs", url: "https://www.moph.gov.lb/en/Pages/4/1729/list-of-authorized-irbs" },
          ],
        },
        {
          id: "plan",
          title: "A National Cancer Plan for 2023 to 2028 and a National Cancer Program to run it",
          plain:
            "Lebanon's Ministry of Public Health launched a National Cancer Plan for 2023 to 2028 in July 2023 and publishes its abstract. A National Cancer Program to oversee it has since been formally established, and the Ministry's 2026 assessment says it was formalised at cabinet level. The full plan was not found online.",
          detail:
            "The plan's official abstract sets out six chapters (monitoring and surveillance; prevention and screening; diagnosis, treatment and access to innovation; supportive care; rehabilitation; governance), among them improving HPV vaccination, expanding cervical screening, strengthening breast screening, prostate and lung screening, and creating a Cancer Program within the Ministry. The Ministry's one-year review, to July 2024, reported that a decree for the programme was ready. At the October 2026 breast campaign launch, the head of the National Cancer Plan, Dr Arafat Tfayli, welcomed the formal establishment, for the first time, of the National Cancer Program under the Minister's patronage, with the task of overseeing and following up the items of the plan; the page does not give the date it was established. The Ministry's Health System Assessment of October 2026 cites the formalisation of the National Cancer Program at cabinet level as a reform that contributed to programme support and enhanced cancer care, and identifies oncology treatments and repeated chemotherapy sessions as among the main cost drivers in Ministry-financed hospital care. It recommends a Drug Agency, health technology assessment, pooled procurement, generics and stock transparency, and a draft universal health coverage law for uninsured Lebanese is before parliamentary committees. In September 2026 the Minister took part in a seminar at the American University of Beirut on access to and affordability of cancer medicines, including biosimilars. OnCo could not find the full plan; see the gaps.",
          links: [
            { label: "MoPH: National Cancer Plan 2023 to 2028, official abstract (PDF)", url: NCP_ABSTRACT },
            { label: "MoPH: National Cancer Plan, one-year review, July 2023 to July 2024 (PDF)", url: NCP_REVIEW },
            { label: "MoPH: the Minister launches the national breast cancer awareness and early detection campaign (8 October 2026, Arabic)", url: BREAST_2026 },
            { label: "MoPH: Health System Assessment and Reform Priorities, sections 5.1 and 5.3 (PDF)", url: HSA_2026 },
            { label: "MoPH: the Minister at a seminar on cancer patient care and affordable medicines (22 September 2026, Arabic)", url: "https://www.moph.gov.lb/en/Pages/0/87060/nassereddine-participates-in-a-specialized-seminar-on-cancer-patient-care-and-the-provision-of-affor" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "plan-text",
      title: "Only an abstract of the National Cancer Plan 2023 to 2028 is published",
      plain:
        "The Ministry of Public Health publishes a short official abstract of its National Cancer Plan for 2023 to 2028 and a one-year review, but OnCo found no full text on the Ministry's website or the International Cancer Control Partnership's portal. The plan's targets and costs are therefore not on this page.",
      detail:
        "The abstract lists the plan's chapters, guiding principles, calendar and core team, and the one-year review (July 2023 to July 2024) reports progress item by item; neither gives targets or a budget. The plan is also named on the Ministry's page of 8 October 2026 and its programme in the October 2026 Health System Assessment. The International Cancer Control Partnership portal returned no Lebanon page to a plain request on 11 November 2026. The National Health Strategy: Vision 2030 and its midterm review are posted by the Ministry; the review was not read for this page.",
      links: [
        { label: "MoPH: National Cancer Plan 2023 to 2028, official abstract (PDF)", url: NCP_ABSTRACT },
        { label: "MoPH: National Cancer Plan, one-year review (PDF)", url: NCP_REVIEW },
        { label: "MoPH: the Minister launches the national breast cancer campaign (8 October 2026, Arabic)", url: BREAST_2026 },
        { label: "MoPH: Health System Assessment and Reform Priorities (PDF)", url: HSA_2026 },
      ],
    },
    {
      id: "radiotherapy-count",
      title: "No current national count of radiotherapy machines or cancer specialists",
      plain:
        "The IAEA's directory of radiotherapy centres loads its data by script and returned no readable figures for Lebanon. The radiotherapy figures here come from one 2026 study, and OnCo found no official count of oncologists, radiotherapy machines working in 2026, or how long patients wait.",
      detail:
        "The IAEA DIRAC country page for Lebanon returned a page shell without data to a plain request on 11 November 2026. The figures of about 12 centres and about four linear accelerators per million people describe the period before 2019 and come from Samaha Jabbour and colleagues; their staffing ratios are per machine. The Ministry's 2026 Assessment reports no oncology workforce figures and says registered professionals overstate active supply because of migration. No imPACT Review report for Lebanon was found.",
      links: [
        { label: "IAEA: DIRAC, Lebanon", url: DIRAC },
        SAMAHA,
      ],
    },
    {
      id: "who-counted",
      title: "Who the registry counts, survival, and the regulator's WHO rating",
      plain:
        "Some figures a reader would want are not here: whether the registry counts Syrian and Palestinian refugees and other non-Lebanese residents, survival after a cancer diagnosis in Lebanon, which cancer medicines the social security fund pays for, and whether WHO has benchmarked Lebanon's medicines regulation.",
      detail:
        "The registry's page does not say whether non-Lebanese residents are included, which matters when its counts are set beside IARC's estimate for a population of 5.8 million, because Lebanon hosts large refugee populations. No population-based survival figures were found in the sources read; IARC's mortality figures are modelled. The fund's lists of covered medicines and their 80% and 95% rates were not opened, and its rules for cancer medicines are not described here. OnCo found no WHO Global Benchmarking Tool maturity level for Lebanon. The Hôtel-Dieu de France university hospital's site presented a robot check and was not read. The eligibility rules of the Ministry's Catastrophic Disease Management Program are not published with its medicines list.",
      links: [
        { label: "MoPH: National Cancer Registry", url: NCR },
        { label: "National Social Security Fund: home page (Arabic)", url: NSSF },
      ],
    },
    {
      id: "conflict-2026",
      title: "The effect of the 2026 war on cancer care is not yet measured",
      plain:
        "The Ministry of Public Health's October 2026 assessment says comprehensive assessments of the ongoing 2026 conflict are not yet available, so this page gives damage figures for 2024 only. Which hospitals and radiotherapy centres are treating patients in the south and the Bekaa now is not known from published sources.",
      detail:
        "The 2024 figures (885 facilities damaged or destroyed, 208 million US dollars of direct damage) come from the rapid damage and needs assessment cited by the Ministry. The Ministry posts regular updates on the toll of the conflict, which were not used for cancer services because they do not report them. A patient in an affected area should ask the treating hospital or call the Ministry's line, 1214, about where treatment and medicines are available.",
      links: [
        { label: "MoPH: Health System Assessment and Reform Priorities, section 5.2 (PDF)", url: HSA_2026 },
        { label: "Ministry of Public Health, Lebanon", url: "https://www.moph.gov.lb/" },
      ],
    },
  ],
  institutions: [
    "lebanon-ministry-of-public-health", "lebanon-national-cancer-registry", "nssf-lebanon", "childrens-cancer-center-lebanon", "aubmc-basile-cancer-institute",
    "st-jude", "who", "iarc",
  ],
  companies: ["novartis", "amgen", "johnson-johnson"],
  drugs: ["pembrolizumab", "nivolumab", "palbociclib", "trastuzumab"],
  trials: ["nct01828099", "nct01828112", "checkmate-227", "empower-lung-1", "geometry-mono-1", "atlantis", "monaleesa-2", "solar-1", "tasquinimod-10tasq10", "nct05132075", "nct04603807", "nct05296798", "nct04557059", "nct06054555", "nct04717414", "nct04064060"],
  papers: [
    "paper-mina-lebanon-drug-registration-collapse-plosone-2025", "paper-el-assaad-ici-subsidy-sclc-lebanon-jcogo-2026", "paper-hodroj-nsclc-immunotherapy-shortage-lebanon-jcogo-2026",
    "paper-samaha-jabbour-radiotherapy-crisis-lebanon-frontonc-2026", "paper-eid-drug-shortage-lebanon-wjco-2024", "paper-raad-bladder-cost-lebanon-ijeh-2023", "paper-seoud-cervical-screening-pilot-lebanon-ijgo-2023",
  ],
  people: ["arafat-tfayli", "nagi-el-saghir"],
  how:
    "Every card was written from Lebanese official sources and peer-reviewed papers, read in full rather than through a summary: the Ministry of Public Health's National Cancer Registry page and its yearly tables, its Health System Assessment and Reform Priorities of October 2026, its Arabic news pages on the 2026 breast and prostate screening campaigns, the childhood cancer initiative, the medicines reforms and the cancer medicines seminar, translated by OnCo, and its list of medicines in the Catastrophic Disease Management Program; the National Social Security Fund's home page; the Children's Cancer Center of Lebanon's own pages; WHO's immunisation data and health expenditure series through public APIs; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, the registry, the social security fund, the children's centre, seven papers and two people) carry their own sources.",
  verify:
    "Lebanon's situation changes quickly: which medicines are in stock, what the Ministry or an insurance fund pays, and which hospitals are open in conflict-affected areas can change within weeks. Ask the treating hospital's oncology department, the Ministry of Public Health (hotline 1214) or your insurance fund what applies to you now. Screening campaigns have set dates and eligibility, which the Ministry publishes with each launch.",
  verifyLinks: [
    { label: "Ministry of Public Health, Lebanon", url: "https://www.moph.gov.lb/" },
    { label: "MoPH: National Cancer Registry", url: NCR },
    { label: "National Social Security Fund", url: NSSF },
    { label: "Children's Cancer Center of Lebanon", url: "https://www.cccl.org.lb/" },
  ],
};
