import type { CountryDive } from "@/data/country-dive";

/**
 * Iran deep dive: the hand-written cards for /countries/ir/.
 *
 * No Iranian government site answered from here on 4 November 2026 (behdasht.gov.ir, fda.gov.ir, ihio.gov.ir,
 * tamin.ir, irct.behdasht.gov.ir and ikhc.tums.ac.ir all timed out), so official pages were read in Persian from
 * dated Internet Archive copies, raw, and each card names the copy's date. The national registry's figures come from
 * the peer-reviewed reports that publish them, resolved through Europe PMC and read from the abstract or, where Europe
 * PMC holds it, the open-access full text. GLOBOCAN figures come only from public/globocan/countries.json (IRN).
 * Trial counts come from OnCo's own graph, public/openalex/countries.json and the IRCT home page copy. Every figure
 * below is quoted from one of those; what could not be read is named under `gaps`.
 */
const INPCR_2016 = "https://doi.org/10.1002/cnr2.1967";
const INPCR_2014 = "https://doi.org/10.1016/j.canep.2019.05.009";
const DOSHMANGIR = "https://doi.org/10.1186/s12939-020-01372-4";
const DRUG_LAG = "https://doi.org/10.1097/MD.0000000000038142";
const MOHME_ED =
  "https://web.archive.org/web/20240329151731/https://behdasht.gov.ir/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1-%D8%A7%D8%AE%D8%AA%D8%B5%D8%A7%D8%B5%DB%8C/%D8%A7%D8%AC%D8%B1%D8%A7%DB%8C-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86-%D9%88-%DA%A9%D8%B4%D9%88%D8%B1%DB%8C-%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D8%AA%D8%B4%D8%AE%DB%8C%D8%B5-%D8%B2%D9%88%D8%AF%D8%B1%D8%B3-%D8%B3%D8%B1%D8%B7%D8%A7%D9%86-%D9%87%D8%A7%DB%8C-%D8%B4%D8%A7%DB%8C%D8%B9%E2%81%84-%D8%B2%D9%86%D8%A7%D9%86-%D8%A8%D8%A7%D9%84%D8%A7%DB%8C-50-%D8%B3%D8%A7%D9%84-%D8%BA%D8%B1%D8%A8%D8%A7%D9%84%DA%AF%D8%B1%DB%8C-%D9%BE%D9%88%DA%A9%DB%8C-%D8%A7%D8%B3%D8%AA%D8%AE%D9%88%D8%A7%D9%86-%D9%85%DB%8C-%D8%B4%D9%88%D9%86%D8%AF";
const IFDA_HISTORY =
  "https://web.archive.org/web/20210418231548/https://www.fda.gov.ir/en/%D8%A7%D8%AF%D8%A7%D8%B1%D8%A7%D8%AA-%D9%88-%D8%AF%D9%81%D8%A7%D8%AA%D8%B1/%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE%DA%86%D9%87-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86";
const IHIO_SPECIAL =
  "https://web.archive.org/web/20210423164130/https://ihio.gov.ir/%D9%BE%D9%88%D8%B4%D8%B4-%D8%A8%DB%8C%D9%85%D9%87/%D8%B5%D9%86%D8%AF%D9%88%D9%82%D9%87%D8%A7-%D9%88-%D9%BE%D9%88%D8%B4%D8%B4%D9%87%D8%A7%DB%8C-%D8%A8%DB%8C%D9%85%D9%87-%D8%A7%DB%8C/%D9%BE%D9%88%D8%B4%D8%B4-%D8%A8%DB%8C%D9%85%D9%87-%D8%A7%DB%8C-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%A7%D9%86-%D8%AE%D8%A7%D8%B5";
const IHIO_NEWS = "https://web.archive.org/web/20230611020801/https://ihio.gov.ir/%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D9%87-%D8%AE%D8%A8%D8%B1/ArticleId/29182/%D8%B3%DB%8C%20%D8%AF%D8%B1%D8%B5%D8%AF%20%D8%A7%D8%B2%20%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%A7%D9%86%20%D8%AE%D8%A7%D8%B5%20%D9%88%20%D8%B5%D8%B9%D8%A8%E2%80%8C%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D8%AC%20%D8%A7%D8%B2%20%D8%A8%D8%B3%D8%AA%D9%87%E2%80%8C%D9%87%D8%A7%DB%8C%20%D8%AD%D9%85%D8%A7%DB%8C%D8%AA%DB%8C%20%D8%A8%DB%8C%D9%85%D9%87%20%D8%B3%D9%84%D8%A7%D9%85%D8%AA%20%D8%A8%D9%87%D8%B1%D9%87%E2%80%8C%D9%85%D9%86%D8%AF%20%D8%B4%D8%AF%D9%86%D8%AF";
const IRCT_HOME = "https://web.archive.org/web/20250610083858/https://irct.behdasht.gov.ir/";
const ARYOGEN_PRODUCTS = "https://web.archive.org/web/20260214201350/https://www.aryogen.com/%D9%85%D8%AD%D8%B5%D9%88%D9%84%D8%A7%D8%AA-%D9%85%D8%A7/";

export const IR_DIVE: CountryDive = {
  iso2: "IR",
  iso3: "IRN",
  name: "Iran",
  flag: "🇮🇷",
  asOf: "2026-11-04",
  title: "Cancer in Iran",
  description:
    "Cancer in Iran from Iranian sources: the national population-based cancer registry's 124,833 registered cancers in 2016 against IARC's 156,467 estimated for 2024, a 2014 reform that aimed to cap a patient's share of a public hospital bill at 10%, a fund for special and hard-to-treat diseases in which cancer is among the costliest conditions, a regulator whose approvals of new cancer medicines trail the United States by about six years on average, free bowel and breast early detection in primary care, the antibody copies Iran makes for itself under sanctions, and opium as a cancer cause.",
  lede:
    "Iran counts its cancers through a national population-based registry run by its universities of medical sciences, which registered 124,833 new cancers in 2016; IARC estimates 156,467 for 2024. A 2014 reform run by the health ministry aimed to cap what a patient pays for a stay in a public hospital at a tenth of the bill, and Iranian companies now make their own versions of the cancer antibodies trastuzumab, bevacizumab, pertuzumab and rituximab, under sanctions that Iranian cancer specialists link to shortages and delays.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Iran is 156,467 new cancers and 97,732 deaths. IARC labels the all-cancers figure ICD-10 C00-97, and it includes 4,242 non-melanoma skin cancers (152,225 without them). IARC's incidence method for Iran is national rates applied to the 2024 population; its death figure is not a count of deaths but is derived from the incidence estimate through modelled mortality-to-incidence ratios. The latest national registry report OnCo could read in full is for 2016: 124,833 new cancers registered, of which 12,136 were non-melanoma skin cancers, nearly three times IARC's skin figure, so that without them the registry's sex tables give 111,672. Both standardise to the world population: the registry's all-cancers rate for 2016 was 177.48 per 100,000 against GLOBOCAN's 146.88 for 2024, and the two differ by eight years and in how skin cancer is counted. The registry covered 30 of 31 provinces (98% of the population) in its first national report, for 2014.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Iran",
      aside: { label: "Hadavandsiri et al., Cancer incidence in Iran in 2016 (Cancer Rep 2024)", url: INPCR_2016 },
      cards: [
        {
          id: "shape",
          title: "124,833 new cancers registered in 2016, with prostate commonest in men and breast in women",
          plain:
            "Iran's national cancer registry recorded 124,833 new cancers in 2016. In men the commonest were prostate, stomach, bowel, bladder and lung cancer; in women breast cancer led by a wide margin, followed by bowel, thyroid, stomach and lung. Rates were highest in the north-west and centre of the country and lowest in Sistan and Baluchistan.",
          detail:
            "The 2024 analysis of the registry's 2016 data gives 7,383 prostate, 7,104 stomach, 6,546 colorectal, 5,378 bladder and 4,351 lung cancers in men, and 15,333 breast, 5,045 colorectal, 4,477 thyroid, 3,442 stomach and 1,887 lung cancers in women. Age-standardised incidence (Segi world population) was 192.96 per 100,000 in men and 162.33 in women, or 170.50 and 148.43 without non-melanoma skin cancer, which the authors note is below the world rates of 206.9 and 178.1. Median age at diagnosis was 64 in men and 57 in women. West Azarbaijan had the highest rate in men and Yazd in women. The paper's headline total of 124,833 and the sum of its sex tables, 123,807, differ by 1,026, which it does not explain. In the registry's first national report, for 2014, 112,131 cancers were registered and the order in men was stomach, prostate and colorectum, so prostate cancer moved to first place in men between the two reports.",
          links: [
            { label: "Hadavandsiri et al., Cancer incidence in Iran in 2016 (Cancer Rep 2024)", url: INPCR_2016 },
            { label: "Roshandel et al., Cancer incidence in Iran in 2014 (Cancer Epidemiol 2019)", url: INPCR_2014 },
          ],
        },
        {
          id: "inpcr",
          title: "Who counts cancer: a population-based registry run through the medical universities",
          plain:
            "Iran's cancer registry is population-based: it aims to count every new cancer among residents, not only those treated at particular hospitals. It is run through the country's universities of medical sciences under the health ministry, collects pathology and hospital records and death registrations, and covered 98% of the population when it first reported nationally, for 2014.",
          detail:
            "The 2014 report describes the Iranian National Population-based Cancer Registry as covering 30 of 31 provinces, registering only malignant new primary tumours from pathology centres, hospitals and death registries, with quality checks and analysis in CanReg-5 software; 68.28% of the 112,131 cancers that year were confirmed under the microscope. The 2016 analysis describes it as managed by all 60 medical universities under the Ministry of Health and Medical Education, following IARC and International Association of Cancer Registries protocols, coding tumours in ICD-O-3 and registering by place of residence; about 30,679 patients without a national identity number were matched on name, father's name, birth date and sex. Researchers describe the registry's annual reports as publicly available, and peer-reviewed studies have used them up to diagnosis year 2018. The 2016 authors note the registry holds no information on mortality, survival or recurrence. A 2023 study linked records from SEPAS, Iran's integrated electronic health record, to find about 197,164 cancer patients for the registry.",
          links: [
            { label: "Roshandel et al., Cancer incidence in Iran in 2014 (Cancer Epidemiol 2019)", url: INPCR_2014 },
            { label: "Hadavandsiri et al., Cancer incidence in Iran in 2016 (Cancer Rep 2024)", url: INPCR_2016 },
            { label: "Nahvijou et al., using the electronic health record for the cancer registry (Int J Med Inform 2023)", url: "https://doi.org/10.1016/j.ijmedinf.2023.105245" },
          ],
        },
        {
          id: "what-is-changing",
          title: "What is changing: more thyroid cancer, more bowel cancer in younger adults",
          plain:
            "Studies of the registry's data from 2014 to 2018 find thyroid cancer rising steeply, mostly in women, and bowel cancer rising in adults under 50. The north and north-west have long had high rates of cancers of the gullet, stomach and lung, a pattern the 2014 report and later mapping studies both describe.",
          detail:
            "A 2025 analysis of the registry found 27,530 thyroid cancers from 2014 to 2018, 79.7% in women, with the age-standardised rate rising from 4.61 per 100,000 in 2014 to 8.17 in 2018; the authors leave open how much is a true increase and how much is more diagnosis. A 2024 study of the registry's annual reports counted 19,679 gastrointestinal cancers in people under 50 from 2014 to 2018 and found the rate of early-onset colorectal cancer rising (age-standardised 3.07 per 100,000 over the period), while early-onset oesophageal cancer fell and early-onset stomach cancer held steady; Golestan had the highest rate of early-onset oesophageal cancer. A spatial analysis of 482,229 cancers registered from 2014 to 2017 identified the northern and north-western regions as high-risk areas for stomach cancer in both sexes and for lung cancer in men.",
          links: [
            { label: "Pejman Sani et al., thyroid cancer in Iran 2014 to 2018 (J Diabetes Metab Disord 2025)", url: "https://doi.org/10.1007/s40200-025-01581-0" },
            { label: "Gholami Chahkand et al., early-onset gastrointestinal cancers in Iran 2014 to 2018 (Middle East J Dig Dis 2024)", url: "https://doi.org/10.34172/mejdd.2024.365" },
            { label: "Faramarzi et al., spatial patterns of cancer incidence in Iran 2014 to 2017 (BMC Cancer 2024)", url: "https://doi.org/10.1186/s12885-024-11940-4" },
          ],
        },
      ],
      tables: [
        {
          id: "inpcr-2016-table",
          title: "New cancers registered in 2016 by sex, beside IARC's 2024 estimate",
          caption: "Registered new cases, Iranian National Population-based Cancer Registry, 2016, by sex; and GLOBOCAN 2024 estimated new cases, both sexes.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "men", label: "Men, 2016 (registry)", numeric: true },
            { key: "women", label: "Women, 2016 (registry)", numeric: true },
            { key: "glo", label: "Both sexes, 2024 (GLOBOCAN estimate)", numeric: true },
          ],
          rows: [
            { site: "All cancers, including non-melanoma skin", men: 65495, women: 58312, glo: 156467 },
            { site: "All cancers except non-melanoma skin (GLOBOCAN: total less its skin figure)", men: 58061, women: 53611, glo: 152225 },
            { site: "Non-melanoma skin", men: 7434, women: 4702, glo: 4242 },
            { site: "Breast", men: 292, women: 15333, glo: 21304 },
            { site: "Colorectal", men: 6546, women: 5045, glo: 16338 },
            { site: "Stomach", men: 7104, women: 3442, glo: 14595 },
            { site: "Prostate", men: 7383, women: null, glo: 10024 },
            { site: "Bladder", men: 5378, women: 1165, glo: 9287 },
            { site: "Lung", men: 4351, women: 1887, glo: 9002 },
            { site: "Thyroid", men: 1111, women: 4477, glo: 6538 },
            { site: "Brain and central nervous system (registry: brain)", men: 2639, women: 1968, glo: 5987 },
            { site: "Leukaemia", men: 2229, women: 1394, glo: 7009 },
            { site: "Oesophagus", men: 1977, women: 1579, glo: 5008 },
          ],
          note: "The registry columns are counts of cancers registered in 2016; the GLOBOCAN column is a modelled estimate for 2024, eight years and several million people later, and is not comparable cell by cell. The registry paper's headline total is 124,833, while its sex tables sum to 123,807. The registry recorded far more non-melanoma skin cancers than IARC estimates.",
          sources: [
            { label: "Hadavandsiri et al., Cancer incidence in Iran in 2016, Tables 1 and 2 (Cancer Rep 2024)", url: INPCR_2016 },
            { label: "IARC Global Cancer Observatory: Cancer Today, 2024 estimates", url: "https://gco.iarc.who.int/today" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: several public insurers, a 2014 reform and a fund for hard-to-treat diseases",
      aside: { label: "Doshmangir et al., Iran health insurance system in transition (Int J Equity Health 2021)", url: DOSHMANGIR },
      cards: [
        {
          id: "insurers",
          title: "Several public insurance funds rather than one health service",
          plain:
            "Iranians are covered by several public insurers rather than one national fund: the Iran Health Insurance Organization for government employees, rural residents and people with no other cover, the Social Security Organization for private-sector workers, and funds for the armed forces and some large employers. Private insurance tops up what they do not pay.",
          detail:
            "A 2021 policy analysis lists the Iran Health Insurance Organization's funds for government employees (5,413,088 members in 2018), rural residents and towns under 20,000 people (19,969,227), universal coverage, created in 2014 for people without insurance (14,441,544), and other groups such as students and people with disabilities (1,438,973); the Social Security Organization, which it describes as non-governmental and which covered 43,475,548 people in 2019; the Armed Forces Medical Services Insurance Organization; 17 institutional funds run by employers such as the petroleum industry; and commercial insurers selling supplementary cover. Since the Universal Health Insurance Act all basic insurers work under the regulations of the High Council of Health Insurance, and the basic benefits package is decided by representatives of the insurers, the medical associations and the Medical Council. The authors report that out-of-pocket payments fell from 80.5% of current health spending in 1995 to 38.8% in 2016, when Iran spent 8.1% of its GDP on health, and that a gap between public and private tariffs keeps out-of-pocket spending high.",
          links: [
            { label: "Doshmangir et al., Iran health insurance system in transition (Int J Equity Health 2021)", url: DOSHMANGIR },
            { label: "Social Security Organization (Persian; Internet Archive copy of 11 September 2026)", url: "https://web.archive.org/web/20260911105119/https://tamin.ir/" },
          ],
        },
        {
          id: "htp-2014",
          title: "The 2014 Health Transformation Plan: a 10% share of hospital bills and 53 cancer medicines added",
          plain:
            "In May 2014 Iran began a reform meant to stop patients paying more than a tenth of the cost of a stay in a public hospital, or a twentieth for rural patients referred through the system. Insurance was also extended to some expensive medicines, including 53 for treating cancer. Studies since disagree on how far it protected families from large bills.",
          detail:
            "The 2021 policy analysis says the Health Transformation Plan, funded by 10% of the net proceeds of the targeted subsidies law and 1% of value added tax, aimed that patients would not pay more than 10% of inpatient costs, 5% for rural patients following the referral system, with the same share whatever their insurer, and that coverage was extended to some expensive pharmaceuticals including 53 medicines for cancer treatment; rising costs then delayed insurers' payments to hospitals. At one Tabriz hospital, a study of 1,778 people admitted with lung cancer from 2010 to 2017 found the patient's share of hospital costs fell from 22.16% before the plan to 10.5% after it, while the cost of admissions rose. A 2021 scoping review of 137 studies found mostly positive effects on satisfaction and hospital performance but different, contradictory and sometimes negative results for financial protection and informal payments.",
          links: [
            { label: "Doshmangir et al., Iran health insurance system in transition (Int J Equity Health 2021)", url: DOSHMANGIR },
            { label: "Jalilian et al., hospital costs and out-of-pocket payments for lung cancer in Tabriz (PLoS One 2024)", url: "https://doi.org/10.1371/journal.pone.0297934" },
            { label: "Jafari et al., Health Transformation Plan achievements and outcomes 2014 to 2020 (Med J Islam Repub Iran 2021)", url: "https://doi.org/10.47176/mjiri.35.151" },
          ],
        },
        {
          id: "hard-to-treat-fund",
          title: "Cancer drugs and the fund for special and hard-to-treat diseases",
          plain:
            "Cancer is not one of the six 'special diseases' that give free insurance with the Iran Health Insurance Organization, but cancer patients can be flagged for its fund for special and hard-to-treat diseases, whose benefits follow a package set by the health ministry. Cancer is one of the conditions costing that fund the most.",
          detail:
            "The Iran Health Insurance Organization's page on special patients, read in Persian from an Internet Archive copy of 23 April 2021, defines them as people with haemophilia, thalassaemia, multiple sclerosis, haemodialysis, kidney transplant and peritoneal dialysis, who receive free cover in its universal coverage fund. A news item it published on 16 April 2023 quotes its director-general of specialised services: about 665,000 people carried a marker for a special or hard-to-treat disease, 30% had used the matching package, the commonest markers were diabetes, hypertension, cancer, multiple sclerosis and dialysis, and cancer, spinal muscular atrophy, diabetes and multiple sclerosis had the highest spending in the special and hard-to-treat diseases fund. Markers are assigned by doctors, from health ministry data or by the insurer's staff, and the services are then delivered through electronic prescribing. OnCo could not read the ministry's package itself, so which cancer medicines it covers, and at what co-payment, is not on this page.",
          links: [
            { label: "IHIO: insurance cover for special patients (Persian; Internet Archive copy of 23 April 2021)", url: IHIO_SPECIAL },
            { label: "IHIO news, 16 April 2023 (Persian; Internet Archive copy of 11 June 2023)", url: IHIO_NEWS },
          ],
        },
        {
          id: "breast-package",
          title: "What insurance pays for in breast cancer, and what families still pay",
          plain:
            "A 2025 review of Iran's breast cancer services found that most services are recognised by the insurers, but cover ranges from a fifth of the cost of an MRI scan to all of the cost of intravenous targeted therapy for metastatic disease, and genomic tests and four medicines, pembrolizumab and pertuzumab among them, were not covered.",
          detail:
            "Using WHO's Universal Health Coverage Service Planning, Delivery and Implementation tool and information from Iran's health insurance agencies, the 2025 study found all 73 listed breast cancer actions provided in Iran, with heavy reliance on outpatient centres and hospitals rather than primary care; 87% of services were recognised and accepted by health insurance, with coverage from 20% for magnetic resonance imaging to 100% for intravenous targeted therapy for metastasis, and genomic tests and four medicines (pembrolizumab, pertuzumab, anastrozole and fluorouracil) not covered. In a 2019 household survey of 138 women with breast cancer in one city, Urmia, the average out-of-pocket payment was 97.87 US dollars a month; 13.77% of their households faced catastrophic health spending and 5.07% were pushed into poverty, concentrated among the poorest, many of whom sold assets or borrowed.",
          links: [
            { label: "Goudarzi et al., breast cancer services and insurance coverage in Iran (J Cancer Policy 2025)", url: "https://doi.org/10.1016/j.jcpo.2025.100571" },
            { label: "Ahmadi et al., catastrophic health spending among breast cancer patients in Iran (BMC Health Serv Res 2021)", url: "https://doi.org/10.1186/s12913-021-06330-6" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Iran Food and Drug Administration",
      aside: { label: "Alipour et al., drug lag at the IFDA 2001 to 2021 (Medicine 2024)", url: DRUG_LAG },
      cards: [
        {
          id: "ifda",
          title: "A regulator inside the health ministry, with its own medicines list and an assessment office",
          plain:
            "Medicines in Iran are approved by the Iran Food and Drug Administration, part of the Ministry of Health, formed in its present shape in 2010 to 2011. It keeps the country's official medicines list and has its own office for health technology assessment and economic studies.",
          detail:
            "The regulator's history page, read in Persian from an Internet Archive copy of 18 April 2021, traces a pharmaceutical deputy ministry back to 1352 (1973 to 1974) and says the Food and Drug Organization was formed in 1389 (2010 to 2011) with the approval of the Supreme Administrative Council. The same site lists offices for health technology assessment and economic studies, rational use of medicines, tariffs and pharmaceutical care standards, and pharmacovigilance, and publishes the official national medicines list. A 2019 study based on interviews with experts and managers in the regulatory system describes how, when sanctions-related shortages peaked in 2012, the regulator lowered prices, cut the market share of imports, made domestic manufacture easier, encouraged foreign investment in local production and gave financial support to patients who could not pay for medicines. OnCo found no published description of reliance or priority pathways for cancer medicines in Iran; it is named under gaps.",
          links: [
            { label: "IFDA: history of the organisation (Persian; Internet Archive copy of 18 April 2021)", url: IFDA_HISTORY },
            { label: "Yousefi et al., IFDA policies for medicines in shortage (Daru 2019)", url: "https://doi.org/10.1007/s40199-019-00259-2" },
          ],
        },
        {
          id: "drug-lag",
          title: "New cancer medicines reach approval in Iran about six years after the United States",
          plain:
            "A study of every new medicine approved in the United States from 2001 to 2021 found that about one in five was also approved in Iran, and that cancer and immune medicines were approved there on average 77 months after the United States and 64 months after Europe.",
          detail:
            "The 2024 study compared new molecular entities approved by the US Food and Drug Administration, the European Medicines Agency, Japan's Pharmaceuticals and Medical Devices Agency and the Iranian regulator from 2001 to 2021, using the Iranian government's official medicines list. Of 710 US approvals, 410 were approved in Europe, 344 in Japan and 148 in Iran. For the 148 approved in both the United States and Iran, the mean relative lag was 65.18 months (SD 61.56), with a maximum of 237 months. For antineoplastic and immunomodulating agents (ATC group L) the mean lag was 77.2 months against the United States, 63.96 against Europe and 57.93 against Japan. It measures registration, not when a medicine reached patients or was paid for; where only the year of approval was known, the authors took the start of that year.",
          links: [{ label: "Alipour et al., drug lag at the IFDA 2001 to 2021 (Medicine 2024)", url: DRUG_LAG }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and early detection",
      aside: { label: "Ministry of Health: free national early detection of common cancers (Persian, 13 September 2023)", url: MOHME_ED },
      cards: [
        {
          id: "bowel-screening",
          title: "Bowel cancer: a free stool test in primary care, reaching about one in seven",
          plain:
            "Iran offers a free stool test for hidden blood at its primary health centres, with positive results referred to hospital for colonoscopy. In 2018 and 2019 about one in seven people aged 50 to 69 took part nationally; in Isfahan, where it began in 2016, four in ten did, but about one in five with a positive test had a reported colonoscopy.",
          detail:
            "In a ministry news item dated 22 Shahrivar 1402 (13 September 2023), read in Persian from an Internet Archive copy, the director-general of the office for non-communicable disease management said early detection of colorectal cancer is carried out free across the country in comprehensive health service centres, with a simple first test offered by health workers to attendees over 40 and positive results referred through the referral system to hospitals. National programme data for 2018 and 2019 cover people aged 50 to 69: 1,365,248 (14.23%) were assessed in 2018 and 1,304,377 (12.89%) in 2019, and 3.09% and 2.57% had a positive faecal immunochemical test. In Isfahan, where the test has been used since January 2016 under the IraPEN primary care package for people aged 50 to 70, 345,207 of 874,674 eligible people (about 40%) took part from 2016 to 2019; 21,264 (6.1%) tested positive, about 20% of them had a reported colonoscopy, and 971 people were found to have polyps and 110 to have bowel cancer.",
          links: [
            { label: "Ministry of Health news item, 13 September 2023 (Persian; Internet Archive copy of 29 March 2024)", url: MOHME_ED },
            { label: "Hassanlouei et al., colorectal cancer screening programme results in Iran (Med J Islam Repub Iran 2022)", url: "https://doi.org/10.47176/mjiri.36.118" },
            { label: "Rahimi et al., participation in colorectal cancer screening in Isfahan (Arch Iran Med 2024)", url: "https://doi.org/10.34172/aim.31072" },
          ],
        },
        {
          id: "breast-detection",
          title: "Breast cancer: free clinical examination and referral, not an organised mammography programme",
          plain:
            "Iran offers free breast cancer early detection at primary health centres, built on examination by a health worker and referral for mammography when something is found. A 2025 review of twenty years of studies concludes Iran has no organised breast screening programme of the kind that invites every woman in an age group for regular mammograms.",
          detail:
            "The health ministry's director-general for non-communicable diseases said in September 2023 that breast cancer early detection is done free at health centres, and gave breast cancer as the commonest cancer in the country at about 15,000 new cases a year, over 95% of them in women. Under IraPEN, Iran's package of essential non-communicable disease interventions introduced as a pilot in 2015, the Isfahan programme examined 450,876 people aged 30 to 69 from 2017 to 2020; it identified 134,508 with symptoms, referred 258,599 to the next level and recorded about 55,974 mammograms, at a direct cost of 310,514,608,558 rials. A 2025 scoping review of 129 studies concluded that Iran's health system lacks an organised breast cancer screening initiative, citing infrastructure, sociocultural barriers, health insurance packages that are not integrated, and little research on key indicators.",
          links: [
            { label: "Ministry of Health news item, 13 September 2023 (Persian; Internet Archive copy)", url: MOHME_ED },
            { label: "Rahimi et al., clinical breast examination within IraPEN in Isfahan (Asian Pac J Cancer Prev 2024)", url: "https://doi.org/10.31557/apjcp.2024.25.9.3151" },
            { label: "Dehkordi et al., twenty years of breast cancer screening in Iran (Iran J Public Health 2025)", url: "https://doi.org/10.18502/ijph.v54i1.17577" },
          ],
        },
        {
          id: "cervical-hpv",
          title: "Cervical cancer: four in ten young women screened, and very few vaccinated against HPV",
          plain:
            "A national survey in 2021 found that about 39% of women aged 18 to 45 had had cervical screening and fewer than one in a hundred had received the HPV vaccine, far from the World Health Organization's elimination targets. Cervical cancer is uncommon in Iran: the registry counted 806 cases in 2016.",
          detail:
            "The 2026 analysis of the national STEPS 2021 survey included 8,158 women aged 18 to 45: 0.85% (95% CI 0.69 to 1.02) had received the HPV vaccine and 39.4% (38.21 to 40.6) had taken part in cervical screening, rising from 27.99% at 18 to 35 to 54.07% at 36 to 45, and higher among married and wealthier women (42.47% in the highest wealth quintile against 28.29% in the lowest). The authors compare this with the World Health Organization's elimination target of 90% vaccination coverage and put screening about 30 points short of its target. The 2014 registry report gives an age-standardised rate of 1.78 per 100,000 women, and the 2016 tables 806 cases. OnCo could not read a ministry source describing a national cervical screening programme, its age range or its test; it is named under gaps.",
          links: [
            { label: "Haddadi et al., HPV vaccination and cervical screening in Iran, STEPS 2021 (PLoS One 2026)", url: "https://doi.org/10.1371/journal.pone.0341888" },
            { label: "Roshandel et al., Cancer incidence in Iran in 2014 (Cancer Epidemiol 2019)", url: INPCR_2014 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Differently",
      title: "What Iran does differently",
      cards: [
        {
          id: "own-biosimilars",
          title: "Making its own copies of cancer antibodies",
          plain:
            "Iranian companies make their own versions of the antibody medicines trastuzumab, bevacizumab, pertuzumab and rituximab, and have tested two of them, bevacizumab and pertuzumab, against the originals in Iranian trials. A locally made bevacizumab controlled metastatic bowel cancer as well as the original, and a locally made pertuzumab matched the original before breast cancer surgery.",
          detail:
            "AryoGen Pharmed, which its own site places in the CinnaGen group, lists among its products Zytux (rituximab), AryoTrust (trastuzumab) and Stivant (bevacizumab). Its phase 3 trial in 126 patients with metastatic colorectal cancer at 22 Iranian sites (NCT03288987) found progression-free survival of 7.7 months with its bevacizumab and 7 months with the original, a hazard ratio of 0.79 (90% CI 0.46 to 1.35), within the non-inferiority margin. CinnaGen's trial of its pertuzumab P013 in 214 women with HER2-positive breast cancer (NCT04957212) found breast pathological complete response of 67.62% against 71.57% with Perjeta, within the equivalence margin. A post-marketing study of AryoTrust in 597 women (NCT06021379) found decreased heart pumping function in 5.7%. Local production was among the regulator's responses to sanctions-related shortages in 2012. A 2025 analysis of breast cancer services nevertheless lists pertuzumab among medicines the insurers did not cover.",
          links: [
            { label: "AryoGen Pharmed: our products (Persian; Internet Archive copy of 14 February 2026)", url: ARYOGEN_PRODUCTS },
            { label: "Rezvani et al., bevacizumab biosimilar BE1040V in metastatic colorectal cancer (Clin Ther 2020)", url: "https://doi.org/10.1016/j.clinthera.2020.03.009" },
            { label: "Allahyari et al., P013 pertuzumab biosimilar (BMC Cancer 2022)", url: "https://doi.org/10.1186/s12885-022-09895-5" },
          ],
        },
        {
          id: "sanctions",
          title: "Cancer care under sanctions",
          plain:
            "Sanctions on Iran exempt medicines in principle, but published studies describe shortages of cancer medicines, banks reluctant to handle payments, lower-quality imported materials and delays in diagnosis and treatment. A 2016 review counted 73 medicines in shortage, 17 of them for cancer.",
          detail:
            "A 2016 review of Iran's drug shortages identified 73 shortage medicines, 17 (23%) used for cancer, among them cytarabine, doxorubicin, fluorouracil, capecitabine and rituximab, and found that the vast majority of the 73 were covered by export-control exemptions that should have eased their purchase; the authors attribute the shortages to firms and banks remaining cautious about business with Iran. In a 2024 qualitative study, 53 Iranian specialists described instability in financing and regulation, shortages, low-quality imported materials, high prices, loss of staff, delayed and inadequate care, limited international collaboration, more adverse events and wider equity gaps. In a 2022 survey of 21 outpatient medicines for children's cancers in Urmia, 14 had availability below 50% and one was unavailable; insured patients in every income decile could afford the lowest-priced versions. Without insurance, the paper's summary says only the richest decile could afford the regimens studied, and not the acute lymphoblastic leukaemia regimen, while its results table differs by regimen: no decile could afford the leukaemia regimen, but every decile could afford the brain tumour regimen. These are reports and surveys, not a measure of outcomes.",
          links: [
            { label: "Setayesh and Mackey, sanctions and Iranian drug shortages (Global Health 2016)", url: "https://doi.org/10.1186/s12992-016-0168-6" },
            { label: "Haghjou et al., economic sanctions and cancer care in Iran (Int J Equity Health 2024)", url: "https://doi.org/10.1186/s12939-024-02335-9" },
            { label: "Baghban et al., access to paediatric cancer medicines in Urmia (BMC Pediatr 2025)", url: "https://doi.org/10.1186/s12887-025-05993-y" },
          ],
        },
        {
          id: "opium",
          title: "Opium as a cause of cancer",
          plain:
            "Iran has studied a cancer risk that is common there: opium use. A cohort of 50,045 adults in the north-east found regular opium users had more cancers of the gullet, stomach, lung, bladder and voice box, and in 2020 the International Agency for Research on Cancer classified opium consumption as carcinogenic to humans.",
          detail:
            "In the Golestan Cohort Study, 1,833 of 50,045 people aged 40 to 75 developed cancer over a median ten years; opium use was associated with all cancers combined (hazard ratio 1.40, 95% CI 1.24 to 1.58) and with oesophageal (1.38), gastric (1.36), lung (2.21), bladder (2.86) and laryngeal (2.53) cancer, rising with dose and holding in never-smokers as well as smokers. A 2024 modelling study, noting that Iran accounts for 42% of global opium consumption, estimated that keeping opium use at its current prevalence of 5.6% would cause 111,130 new cancers in Iran by 2035, and that cutting prevalence by 10% to 50% could prevent 9,016 to 49,006, mostly lung, stomach and bladder cancers. The International Agency for Research on Cancer's Monographs volume 126 group summarised the classification in The Lancet Oncology in 2020.",
          links: [
            { label: "Sheikh et al., opium use and cancer in the Golestan Cohort Study (Lancet Glob Health 2020)", url: "https://doi.org/10.1016/S2214-109X(20)30059-0" },
            { label: "Nemati et al., controlling opium use and future cancer incidence in Iran (EClinicalMedicine 2024)", url: "https://doi.org/10.1016/j.eclinm.2024.102650" },
            { label: "IARC Monographs Vol 126 group, Carcinogenicity of opium consumption (Lancet Oncol 2020)", url: "https://doi.org/10.1016/S1470-2045(20)30611-2" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "Iranian Registry of Clinical Trials (Internet Archive copy of 10 June 2025)", url: IRCT_HOME },
      cards: [
        {
          id: "research-output",
          title: "A large oncology literature, and trials registered mostly in Iran's own registry",
          plain:
            "Authors in Iran published 5,956 oncology papers from 2021 to 2025, 17th among the 214 countries OnCo tracks. The Iranian Registry of Clinical Trials holds far more registrations than ClinicalTrials.gov lists for Iran, so the international registry shows a fraction of Iranian research; OnCo's graph held two trials with an Iranian site before this page.",
          detail:
            "OnCo's OpenAlex file (oncology as the primary subfield, whole counting by author country, built 8 September 2026) gives Iran 1,258 works in 2021, 1,159 in 2022, 1,175 in 2023, 1,139 in 2024 and 1,225 in 2025. The same file counts 1,463 ClinicalTrials.gov studies of any condition with a site in Iran. The Iranian Registry of Clinical Trials, whose home page (Internet Archive copy of 10 June 2025) describes it as a primary registry in the World Health Organization's registry network set up with the Ministry of Health and hosted by Iran University of Medical Sciences, showed 43,868 trials registered, across all conditions and all registrants; OnCo could not read how many are cancer trials. The CinnaGen pertuzumab trial shows the pattern: registered in the Iranian registry on 11 June 2018 and on ClinicalTrials.gov on 12 July 2021, after it had finished. OnCo's graph's trial records whose ClinicalTrials.gov sites include Iran numbered two before this page; it adds the three biosimilar studies listed below.",
          links: [
            { label: "Iranian Registry of Clinical Trials (Internet Archive copy of 10 June 2025)", url: IRCT_HOME },
            { label: "OpenAlex: oncology works by country", url: "https://openalex.org" },
            { label: "Allahyari et al., P013 pertuzumab biosimilar, registration details (BMC Cancer 2022)", url: "https://doi.org/10.1186/s12885-022-09895-5" },
          ],
        },
        {
          id: "trials-here",
          title: "The trials in OnCo's graph with a site in Iran",
          plain:
            "Five trial records in OnCo's graph have Iranian sites: a phase 3 trial of chemotherapy-loaded beads for bowel cancer that has spread to the liver at Tehran's Imam Khomeini Hospital Complex, a phase 2 trial of donor natural killer cells for high-grade glioma, and three studies of Iranian-made antibody copies.",
          detail:
            "NCT06555003 (CLEAR-DEBIRI), sponsored by Tehran University of Medical Sciences, compares irinotecan-loaded drug-eluting beads with systemic chemotherapy against chemotherapy alone in unresectable colorectal liver metastases; it started in January 2025 at the Imam Khomeini Hospital Complex and plans 116 participants. NCT06687681 tests intrathecal injection of active allogeneic natural killer cells in 40 planned patients with high-grade glioma at Rasoul Akram Hospital in Tehran, from November 2024. The three biosimilar studies, all completed and all with sites only in Iran, are AryoGen's bevacizumab trial in metastatic colorectal cancer (NCT03288987, 126 patients, 22 sites), CinnaGen's pertuzumab trial in HER2-positive breast cancer (NCT04957212, 214 patients, 44 sites) and AryoGen's trastuzumab safety study (NCT06021379, 597 women, 15 sites).",
          links: [
            { label: "ClinicalTrials.gov NCT06555003", url: "https://clinicaltrials.gov/study/NCT06555003" },
            { label: "ClinicalTrials.gov NCT06687681", url: "https://clinicaltrials.gov/study/NCT06687681" },
            { label: "ClinicalTrials.gov NCT04957212", url: "https://clinicaltrials.gov/study/NCT04957212" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreachable",
      title: "Iranian official sites that could not be reached on 4 November 2026",
      plain:
        "None of the Iranian government sites this page needed answered: the health ministry, the regulator, the two main insurers, the trial registry and the Imam Khomeini Hospital Complex all timed out. Their pages were read from dated Internet Archive copies, which may be out of date, and anything not archived is missing here.",
      detail:
        "behdasht.gov.ir, fda.gov.ir, ihio.gov.ir, tamin.ir, irct.behdasht.gov.ir and ikhc.tums.ac.ir all failed to respond within 25 seconds. The Internet Archive's most recent copy of the health ministry's home page held only a JavaScript challenge, so the ministry is quoted from a single archived news item of 13 September 2023. The regulator's history page is from an April 2021 copy, the insurer's special-patients page from April 2021 and its news item from June 2023, and the trial registry's home page from June 2025. The archive itself began refusing requests partway through the work, so other archived pages, such as the Cancer Institute's own site and the regulator's medicines list, were not read. Every institution record built from these copies says which copy it used.",
      links: [{ label: "Internet Archive: Ministry of Health and Medical Education", url: "https://web.archive.org/web/2026/https://behdasht.gov.ir/" }],
    },
    {
      id: "registry-years",
      title: "No national registry report after 2016 read in full, and none after 2018 found",
      plain:
        "The registry's own annual reports, which researchers describe as publicly available, could not be reached. The newest complete national incidence report OnCo could read is for 2016, and the newest diagnosis year used by any peer-reviewed study OnCo found is 2018, so this page gives no national count for 2019 or later.",
      detail:
        "The figures on this page are from the 2014 report (Cancer Epidemiology, 2019) and the 2016 analysis (Cancer Reports, 2024), plus thyroid and early-onset gastrointestinal studies that use registry data to 2018. The ministry's own registry pages were not reachable or archived in readable form. Whether the registry has published national figures for 2019 to 2024, and whether coverage changed during the COVID-19 pandemic, could not be checked. The 2016 analysis's headline total and the sum of its sex tables differ by 1,026.",
      links: [{ label: "Hadavandsiri et al., Cancer incidence in Iran in 2016 (Cancer Rep 2024)", url: INPCR_2016 }],
    },
    {
      id: "deaths-count",
      title: "No national count of cancer deaths",
      plain:
        "OnCo found no recent national count of deaths from cancer from Iran's own death registration system. IARC's estimate of 97,732 deaths in 2024 is modelled from incidence, not counted, and the registry itself holds no mortality or survival data according to the 2016 analysis.",
      detail:
        "IARC codes Iran's mortality estimate as derived from national incidence through modelled mortality-to-incidence ratios using registry survival data. A 2025 study used the health ministry's death registration system for spatial analysis of cancer deaths from 2017 to 2019, but its counts fall sharply from 2017 to 2018 and do not read as complete national totals, so OnCo did not use them. National five-year survival figures were not found either. Both would need the ministry's own statistics, which could not be reached.",
      links: [{ label: "Zangeneh et al., spatial analysis of cancer mortality in Iran 2017 to 2019 (Prev Med Rep 2025)", url: "https://doi.org/10.1016/j.pmedr.2025.103180" }],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find an official description of a national cervical screening programme, of any priority or reliance route for approving cancer medicines, of the cost-effectiveness rule used to decide what insurers pay for, or of which cancer medicines the hard-to-treat diseases fund covers. The national cancer control programme document was not read either.",
      detail:
        "The cervical screening figures on this page come from a national survey, not from a programme description. The regulator lists an office for health technology assessment and economic studies, and the health ministry an office for health technology assessment, standards and tariffs, but no published threshold or decision record for cancer medicines was found. The health insurer's special and hard-to-treat diseases package is issued by the ministry and was not reachable. Published average times from Iranian approval to insurance cover were not found. The country's National Cancer Control Programme is referred to in a 2015 review, but its current text was not reached. The Iranian Registry of Clinical Trials publishes a total of registered trials but OnCo could not read a count of cancer trials, and gives none here.",
      links: [{ label: "Shahabi et al., international sanctions and Iranian cancer healthcare (Health Policy 2015)", url: "https://doi.org/10.1016/j.healthpol.2015.08.012" }],
    },
  ],
  institutions: ["tehran-cancer-institute", "iran-mohme", "iran-fda", "iran-health-insurance-organization", "iran-social-security-organization", "iarc"],
  companies: ["cinnagen", "aryogen-pharmed"],
  drugs: ["trastuzumab", "bevacizumab", "pertuzumab", "rituximab"],
  trials: ["nct06555003", "nct06687681", "nct03288987", "nct04957212", "nct06021379"],
  papers: [
    "paper-inpcr-2014-roshandel-cancer-epidemiol-2019", "paper-inpcr-2016-hadavandsiri-cancer-rep-2024", "paper-golestan-opium-cancer-lancet-glob-health-2020",
    "paper-sanctions-cancer-care-iran-haghjou-2024", "paper-ifda-drug-lag-alipour-medicine-2024", "paper-iran-colorectal-screening-hassanlouei-mjiri-2022",
    "paper-be1040v-bevacizumab-biosimilar-clin-ther-2020", "paper-p013-pertuzumab-biosimilar-bmc-cancer-2022", "paper-aryotrust-trastuzumab-pms-2024",
  ],
  people: [],
  how:
    "Every card was written from Iranian sources or peer-reviewed studies of Iran. Iranian government websites did not answer on 4 November 2026, so the health ministry, the regulator, the main insurer, the Social Security Organization, the trial registry and the two antibody makers were read, mostly in Persian, from dated Internet Archive copies of their own pages, raw. The national cancer registry's figures come from its published reports for 2014 and 2016, whose DOIs were resolved through Europe PMC; the 2016 tables were read from the open-access full text. Trial details were read from the ClinicalTrials.gov API, GLOBOCAN figures from OnCo's copy of IARC's 2024 estimates, and research counts from OnCo's OpenAlex file.",
  verify:
    "Registry figures are counts for 2014 and 2016, not current estimates; GLOBOCAN's 2024 figures are modelled and its death figure is derived from incidence. Insurance rules, the hard-to-treat diseases package and medicine availability change often and were read from archived pages up to five years old. Before relying on whether a medicine is available or covered, ask the treating hospital's pharmacy and the patient's insurer.",
  verifyLinks: [
    { label: "Hadavandsiri et al., Cancer incidence in Iran in 2016 (Cancer Rep 2024)", url: INPCR_2016 },
    { label: "Iran Health Insurance Organization", url: "https://ihio.gov.ir" },
    { label: "Iran Food and Drug Administration", url: "https://www.fda.gov.ir" },
    { label: "Iranian Registry of Clinical Trials", url: "https://irct.behdasht.gov.ir" },
  ],
};
