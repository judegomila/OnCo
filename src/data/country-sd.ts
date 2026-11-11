import type { CountryDive } from "@/data/country-dive";

/**
 * Sudan deep dive: the hand-written cards for /countries/sd/ (wave 6). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Sudan (PDF text), the
 * Federal Ministry of Health's National Cancer Strategy 2012 to 2016 (PDF text, ICCP portal), WHO's news release of
 * 14 April 2026 on three years of conflict, WHO's immunisation introduction and coverage rows and its Global Health
 * Expenditure rows from the public APIs, the IAEA's press release of 4 May 2026 (read through the Internet Archive,
 * as the IAEA site returned a bot challenge), the National Medicines and Poisons Board's and the National Health
 * Insurance Fund's Arabic pages, a ClinicalTrials.gov API query, and the papers through Europe PMC (full text where
 * Europe PMC holds it, otherwise the abstract).
 *
 * Sudan has been at war since 15 April 2023. Each statement about a centre working or not working is dated to its
 * source. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/729-sudan-fact-sheet.pdf";
const NCS_2012 = "https://www.iccp-portal.org/system/files/plans/SDN_B5_National%20Cancer%20Strategy.pdf";
const WHO_2026 = "https://www.who.int/news/item/14-04-2026-after-three-years-of-conflict--sudan-faces-a-deeper-health-crisis";
const IAEA_NCI = "https://www.iaea.org/newscenter/pressreleases/iaea-rays-of-hope-initiative-delivers-critical-equipment-to-restore-radiotherapy-services-in-sudan";
const IAEA_NCI_WB = `https://web.archive.org/web/20260504142754/${IAEA_NCI}`;
const NMPB_ABOUT = "https://www.nmpb.gov.sd/intro.php";
const NMPB_HOME = "https://www.nmpb.gov.sd/";
const NHIF_ABOUT = "https://nhif.gov.sd/about/";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SDN'";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'SDN'";
const WHO_HEPB_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SDN'%20and%20ANTIGEN%20eq%20'HEPB3'";
const CTGOV = "https://clinicaltrials.gov/search?cond=cancer&locStr=Sudan&country=Sudan";
const D_SAEED = "https://doi.org/10.1002/cam4.254";
const D_ALRAWA = "https://doi.org/10.3332/ecancer.2023.128";
const D_COLLAPSE = "https://doi.org/10.1200/GO.24.00144";
const D_IMPACT = "https://doi.org/10.1200/GO-24-00568";
const D_KASSALA = "https://doi.org/10.1016/j.jcpo.2025.100604";
const D_RT = "https://doi.org/10.1016/j.radonc.2026.111637";
const D_WOMEN = "https://doi.org/10.3332/ecancer.2022.1433";
const D_MUDDATHER = "https://doi.org/10.1200/GO.20.00538";
const D_EAST = "https://doi.org/10.3332/ecancer.2024.1704";
const D_FINANCING = "https://doi.org/10.1101/2023.12.20.23300333";

export const SD_DIVE: CountryDive = {
  iso2: "SD",
  iso3: "SDN",
  name: "Sudan",
  flag: "🇸🇩",
  asOf: "2026-11-11",
  title: "Cancer in Sudan",
  description:
    "Cancer in Sudan from Sudanese, WHO, IAEA and peer-reviewed sources: IARC's estimate of 41,022 new cancers and 25,766 deaths in 2024, a registry that has published only Khartoum's 2009 to 2010 figures, the collapse of cancer care after the war began in April 2023, the Radiation and Isotopes Centre Khartoum and the National Cancer Institute in Wad Madani, radiotherapy cut to one working centre by September 2025 and IAEA equipment to restore it, free public cancer medicines that patients still pay for when stocks run out, no HPV vaccine and no organised screening.",
  lede:
    "Sudan's national cancer figures are IARC estimates: 41,022 new cancers and 25,766 deaths in 2024, breast cancer first in women and prostate cancer in men. Since war broke out on 15 April 2023 a 2024 commentary has called Khartoum's main cancer hospital nonfunctional and said the institute in Wad Madani faced a similar fate, Wad Madani's radiotherapy stopped in August 2023, and a survey found radiotherapy left at a single centre by September 2025.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Sudan is 41,022 new cancers and 25,766 deaths, an age-standardised incidence of 132.5 per 100,000 (133.7 in men, 129.2 in women) and mortality of 87.2. The fact sheet names no country-specific incidence data source and gives the method as national or subnational rates scaled to regional all-cancer rates; mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data (Survcan). A 2022 paper by Sudanese clinicians states that GLOBOCAN's Sudan figures rest on Federal Ministry of Health data, most of it from hospital-based registries. The only population-based figures Sudan has published, from Khartoum State in 2009 and 2010, are much higher on the world standard IARC uses (188.6 per 100,000 women and 145.4 per 100,000 men, 1966 world standard), but the registry's authors noted that some registered cases may have come from outside the state, because most treatment facilities are in Khartoum. GLOBOCAN 2020 gave 27,382 new cancers and 17,055 deaths, as cited in the 2022 paper, and the IAEA's May 2026 release speaks of nearly 30,000 new cases a year; the 2024 estimate is higher still. Deaths divided by new cases give 0.63.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Sudan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Sudan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 41,000 new cancers a year, breast cancer first and more than half of cancers in women",
          plain:
            "IARC estimates 41,022 new cancers in Sudan in 2024, 21,763 in women and 19,259 in men, and 25,766 deaths. Breast cancer is two in every five cancers in women. In men prostate, liver cancer and non-Hodgkin lymphoma lead. For every ten new cancers IARC estimates about six deaths in the same year.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 8,611 breast cancers (3,624 deaths), 3,357 prostate cancers (2,077 deaths), 2,728 non-Hodgkin lymphomas, 2,501 leukaemias, 2,424 liver cancers (2,289 deaths) and 1,711 cervical cancers (1,125 deaths). Breast cancer is 39.6% of cancers in women and 21.0% of all cancers. In men the leading cancers by cases are prostate (17.4%), liver (10.2%) and non-Hodgkin lymphoma (10.1%), and the same three lead by deaths. In women breast, cervix and leukaemia lead by both cases and deaths. Colorectal (1,559), oesophageal (1,264), ovarian (1,198) and nasopharyngeal (1,007) cancers follow. The risk of developing cancer before age 75 is 14.8% for men and 13.6% for women, and an estimated 73,087 people are living within five years of a diagnosis. Deaths divided by new cases give 0.63. The Ministry of Health's 2012 to 2016 strategy put the share of patients presenting at stage 3 or 4 at 80%, and breast cancer studies at Wad Madani and Gedaref found 65% and 82% diagnosed at stage III or IV.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Sudan (PDF)", url: IARC_FACTSHEET },
            { label: "National Cancer Strategy 2012 to 2016, annex 1 (Federal Ministry of Health, PDF)", url: NCS_2012 },
            { label: "Muddather et al., breast cancer survival at the National Cancer Institute (JCO Glob Oncol 2021)", url: D_MUDDATHER },
            { label: "Ahmed et al., breast cancer in eastern Sudan (ecancer 2024)", url: D_EAST },
          ],
        },
        {
          id: "centres-before-war",
          title: "Before the war: fifteen oncology centres, four with radiotherapy, two main public hubs",
          plain:
            "Sudan opened its first cancer centre in Khartoum in 1967, and for three decades it was the only one. A second public centre opened in Wad Madani in 1999. By 2023 Sudanese clinicians counted fifteen public and private oncology centres, of which four gave radiotherapy, and public centres gave chemotherapy and radiotherapy without charge.",
          detail:
            "The Ministry of Health's 2012 to 2016 strategy records that the Radiation and Isotopes Centre Khartoum started work in 1967 and was officially opened on 18 October 1968, with WHO training staff and supplying drugs and the IAEA installing machines, and that the strategy's authors called it the third such centre in Africa after Egypt and South Africa. Until April 1999, when the National Cancer Institute opened in Wad Madani, it was the only specialised cancer centre. In 2012 cancer was managed at three centres (Khartoum, Wad Madani and Shendi), the two radiotherapy centres were 200 km apart in central Sudan, histopathology was available in only four states outside Khartoum, and a palliative care unit had opened at the Khartoum centre in February 2010, with another recently started at Suba hospital. An editorial by Sudanese clinicians in 2023 counted fifteen public and private oncology centres before the war, four offering radiotherapy, and said government centres had for decades given chemotherapy and radiotherapy as part of universal health coverage. A radiotherapy survey of January 2023 counted 52 clinical oncologists and 27 medical physicists, with about 77% of radiation oncologists in Khartoum.",
          links: [
            { label: "National Cancer Strategy 2012 to 2016, annex 1 (PDF)", url: NCS_2012 },
            { label: "Alrawa et al., five months into conflict: near total collapse of cancer services in Sudan (ecancer 2023)", url: D_ALRAWA },
            { label: "Elhaj et al., radiotherapy in Sudan (Radiother Oncol 2026)", url: D_RT },
          ],
        },
      ],
      tables: [
        {
          id: "sd-registry",
          title: "What Sudan's cancer registries have counted",
          caption: "New cancers counted by the National Cancer Registry and the Khartoum centre's patient register, with age-standardised incidence per 100,000 where published. Latest population-based period: 2009 to 2010.",
          columns: [
            { key: "source", label: "Source (area covered)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "men", label: "Men", numeric: true },
            { key: "asrw", label: "Rate, women (Sudan 2010 standard)", numeric: true },
            { key: "asrm", label: "Rate, men (Sudan 2010 standard)", numeric: true },
          ],
          rows: [
            { source: "National Cancer Registry, population-based (Khartoum State)", period: "2009 to 2010", cases: 6771, women: 3646, men: 3125, asrw: 124.3, asrm: 90.8 },
            { source: "Radiation and Isotopes Centre Khartoum, hospital patient register", period: "2000", cases: 2471, women: null, men: null, asrw: null, asrm: null },
            { source: "Radiation and Isotopes Centre Khartoum, hospital patient register", period: "2009", cases: 5739, women: null, men: null, asrw: null, asrm: null },
          ],
          note: "The registry paper also gives rates on the 1966 world standard (188.6 per 100,000 women, 145.4 per 100,000 men) and the 2000 world standard (206.3 and 160.0); its authors note that some registered cases may have come from outside Khartoum State, where most treatment facilities are. The Khartoum centre's rows are patients registered at one hospital, not incidence, and the Ministry's 2012 strategy estimated that hospital data captured only 20 to 30% of the national cancer load. No later population-based report was found.",
          sources: [
            { label: "Saeed et al., cancer incidence in Khartoum, first results from the Cancer Registry 2009 to 2010 (Cancer Med 2014)", url: D_SAEED },
            { label: "National Cancer Strategy 2012 to 2016, section 2.2 (PDF)", url: NCS_2012 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry that has published one state's figures",
      aside: { label: "Saeed et al., first results from the Cancer Registry (Cancer Med 2014)", url: D_SAEED },
      cards: [
        {
          id: "registry-ncr",
          title: "A National Cancer Registry since 2009, with Khartoum State its only published area",
          plain:
            "The Federal Ministry of Health set up a National Cancer Registry in 2009. It began in Khartoum State and planned six more registries across the country. Its first and only published incidence figures cover Khartoum in 2009 and 2010. Without wider coverage, Sudan's national numbers are estimates.",
          detail:
            "The Ministry's 2012 to 2016 strategy says the registry started by surveying every public and private facility and histopathology laboratory in Khartoum State, collects cases through passive and active case finding, also took hospital data from the National Cancer Institute in Wad Madani, whose own registry was population-based for Gezira State, and planned six more registries distributed across Sudan. It named the registry's lack of mortality and survival data, and its coverage, as its greatest weaknesses. An earlier registry ran at the National Health Laboratory from 1966 into the 1980s, drawing on two pathology laboratories, and closed for lack of funds. The 2014 paper reports 6,771 cancers in Khartoum State in 2009 and 2010, entered in CanReg-5. The African Cancer Registry Network's current membership list, read on 11 November 2026, includes no Sudanese registry. OnCo found no statement of the registry's status since fighting reached Khartoum in April 2023.",
          links: [
            { label: "National Cancer Strategy 2012 to 2016, annex 1, cancer information system (PDF)", url: NCS_2012 },
            { label: "Saeed et al., cancer incidence in Khartoum 2009 to 2010 (Cancer Med 2014)", url: D_SAEED },
            { label: "African Cancer Registry Network: current membership list", url: "https://afcrn.org/index.php/membership/membership-list" },
          ],
        },
      ],
    },
    {
      id: "war",
      nav: "The war",
      title: "What the war since April 2023 has done to cancer care",
      aside: { label: "WHO: after three years of conflict, Sudan faces a deeper health crisis (14 April 2026)", url: WHO_2026 },
      cards: [
        {
          id: "war-health-system",
          title: "A health system under attack: 37% of facilities not working, 217 verified attacks",
          plain:
            "Fighting between the Sudanese Armed Forces and the Rapid Support Forces began on 15 April 2023. Three years later WHO reported that 37% of health facilities across Sudan's 18 states were not functioning, that 21 million people lacked health services, and that it had verified 217 attacks on health care, with 2,052 deaths.",
          detail:
            "WHO's news release of 14 April 2026 describes Sudan as the world's largest humanitarian crisis, with 34 million people needing aid and 21 million lacking health services. Across the 18 states 37% of health facilities remained non-functional; WHO had verified 217 attacks on health care since 15 April 2023, with 2,052 deaths and 810 injuries; and it said the situation was improving in some states while deepening where fighting continued, naming Darfur and Kordofan. WHO's March 2025 public health situation analysis warned that disrupted treatment raised the risk of poor outcomes for oncology patients and that many patients arrived at advanced stages. A 2024 commentary by Sudanese and international clinicians and researchers described air raids, ground invasion, looting of assets and supplies, and the killing of health workers, and gave 9.05 million people displaced inside Sudan and 1.47 million refugees at the time of writing. Cancer patients, it said, had been displaced several times, and the oncology workforce had itself been displaced.",
          links: [
            { label: "WHO: after three years of conflict, Sudan faces a deeper health crisis (14 April 2026)", url: WHO_2026 },
            { label: "WHO: public health situation analysis, Sudan conflict and complex emergency (10 March 2025, PDF)", url: "https://cdn.who.int/media/docs/default-source/2021-dha-docs/20250310_phsa_sudan-conflict.pdf" },
            { label: "Ahmed et al., collapse of cancer care under the current conflict in Sudan (JCO Glob Oncol 2024)", url: D_COLLAPSE },
          ],
        },
        {
          id: "war-centres",
          title: "Khartoum's cancer services stopped, Wad Madani lost radiotherapy, patients moved to the states",
          plain:
            "When fighting reached Khartoum, its cancer services stopped, including the Radiation and Isotopes Centre Khartoum. Patients went to the National Cancer Institute in Wad Madani and to centres in Shendi, Gedaref and Merowe, where new patients roughly doubled, and at Shendi rose almost fivefold. Wad Madani's radiotherapy machines failed by August 2023, and a 2024 commentary said the institute faced a similar fate to Khartoum's as fighting reached Al Gezira State.",
          detail:
            "An editorial by Sudanese clinicians, one from the National Cancer Institute, reported total cessation of oncology services in Khartoum after 15 April 2023, leaving six centres operating, two of them comprehensive: the public National Cancer Institute in Wad Madani and the private Merowe Oncology Center. The institute's two cobalt machines failed in June and August 2023 and radiotherapy there stopped on 15 August. Centres had received no medicines since March, and by 15 August were declared lacking essential chemotherapy, hormonal and targeted therapy; staff had not been paid since the war began; isotope shortages had stopped nuclear medicine by early April; opioid analgesics were absent. A 2024 commentary called Khartoum Oncology Hospital nonfunctional and said the institute in Wad Madani faced a similar fate as the conflict spread to Al Gezira State. A 2025 paper reported the surge of patients at the East Oncology Centre and the White Nile Cancer Centre; at Dr. Tiraky Oncology Center in Kassala in late 2024, 89 of 100 patients had their chemotherapy interrupted, mainly by displacement.",
          links: [
            { label: "Alrawa et al., five months into conflict (ecancer 2023)", url: D_ALRAWA },
            { label: "Ahmed et al., collapse of cancer care (JCO Glob Oncol 2024)", url: D_COLLAPSE },
            { label: "Ahmed et al., impact of armed conflict on cancer care in Sudan (JCO Glob Oncol 2025)", url: D_IMPACT },
            { label: "Elhassan et al., cancer treatment amid armed conflict, Kassala (J Cancer Policy 2025)", url: D_KASSALA },
          ],
        },
      ],
      tables: [
        {
          id: "sd-war-patients",
          title: "New cancer patients at centres outside Khartoum, before and after the war began",
          caption: "New cancer patients registered from 15 April to 31 August 2023, against the same period of 2022, as reported by the centres to the authors of a 2023 editorial.",
          columns: [
            { key: "centre", label: "Centre" },
            { key: "before", label: "15 April to 31 August 2022", numeric: true },
            { key: "after", label: "15 April to 31 August 2023", numeric: true },
          ],
          rows: [
            { centre: "National Cancer Institute, Wad Madani (Gezira State)", before: 1560, after: 2980 },
            { centre: "Tumour Therapy and Cancer Research Center, Shendi (River Nile State)", before: 163, after: 791 },
            { centre: "East Oncology Center, Gedaref", before: 165, after: 337 },
            { centre: "Eldaman Oncology and Radiotherapy Center, Merowe (Northern State)", before: 217, after: 397 },
          ],
          note: "Counts reported by the centres in an editorial, not an audited survey. Khartoum's centres, which before the war saw most patients, had stopped; the rises show where patients went, not the total treated. The National Cancer Institute was itself later affected as fighting reached Al Gezira State.",
          sources: [{ label: "Alrawa et al., five months into conflict: near total collapse of cancer services in Sudan (ecancer 2023)", url: D_ALRAWA }],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy: seven machines before the war, one centre in 2025, repairs in 2026",
      aside: { label: "IAEA: equipment to restore radiotherapy services in Sudan (4 May 2026; Internet Archive)", url: IAEA_NCI_WB },
      cards: [
        {
          id: "rt-capacity",
          title: "One working machine per seven million people before April 2023, and one centre by September 2025",
          plain:
            "Radiotherapy was scarce in Sudan before the war: seven working machines for about 50 million people, far below the IAEA's guide of one per 250,000. Surveys of all five radiotherapy centres found that by September 2025 only one, Merowe Medical City in Northern State, was still treating patients.",
          detail:
            "A survey of all five radiotherapy centres (three public, two private) in January 2023, with a follow-up in September 2025, counts 13 cobalt-60 teletherapy units, eight linear accelerators and six HDR brachytherapy systems installed since 1967. Before April 2023 seven megavoltage units were working, four cobalt-60 and three linear accelerators, one per seven million people against an IAEA recommendation of one per 250,000. About 30% of cobalt units had been dismantled prematurely for lack of maintenance and source replacement, only two of six brachytherapy units still worked, and intensity-modulated techniques were available only privately. By September 2025 Merowe Medical City was the sole functioning facility in the country. The 2023 editorial named the private Eldaman Oncology and Radiotherapy Center in Merowe, with one linear accelerator, as the only centre then giving radiotherapy, and said its cost, travel and lodging were beyond many patients. OnCo could not confirm whether these two names describe the same centre.",
          links: [
            { label: "Elhaj et al., radiotherapy in Sudan: facing infrastructure, workforce and armed conflict challenges (Radiother Oncol 2026)", url: D_RT },
            { label: "Alrawa et al., five months into conflict (ecancer 2023)", url: D_ALRAWA },
          ],
        },
        {
          id: "rt-iaea-2026",
          title: "IAEA equipment worth about 2 million US dollars arrived for Wad Madani in April 2026",
          plain:
            "In May 2026 the IAEA announced that equipment to repair the two radiotherapy machines at the National Cancer Institute in Wad Madani had arrived in April and was being installed. It expected treatment to restart later in 2026, for up to 10,000 patients a year once fully working, and plans the same for Sudan's other public centres.",
          detail:
            "The IAEA's press release of 4 May 2026 says the equipment, delivered under its technical cooperation programme and Rays of Hope initiative and worth about 2 million US dollars, comprises components to refurbish the institute's two teletherapy machines, upgraded treatment planning systems and dosimeters. It states that radiotherapy had been offered at public centres in Khartoum, Shendi and Wad Madani and had halted at all three because of equipment breakdowns, and calls the delivery a step towards re-establishing radiotherapy in Sudan after three years of interruption due to the civil crisis. An IAEA technical mission in September 2025 evaluated the public radiotherapy centres in order to develop a rehabilitation plan with national health authorities. In the release's words, the institute is the first facility to benefit from the IAEA assistance supported by national funding, which included the procurement and shipment of the equipment; further help is planned for the remaining centres, with training. The Minister of Health, Haitham Awad Allah, is quoted saying radiotherapy was almost entirely unavailable across the country. The IAEA page refused a plain request on 11 November 2026 and was read from the Internet Archive's copy of 4 May 2026. OnCo found no source confirming that treatment had restarted.",
          links: [
            { label: "IAEA: Rays of Hope delivers critical equipment to restore radiotherapy services in Sudan (4 May 2026; Internet Archive copy)", url: IAEA_NCI_WB },
            { label: "IAEA: the same press release on its own site", url: IAEA_NCI },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: free public cancer medicines, when they are in stock",
      aside: { label: "National Health Insurance Fund: about the Fund (Arabic)", url: NHIF_ABOUT },
      cards: [
        {
          id: "free-treatment",
          title: "Chemotherapy and radiotherapy are free at public centres, but shortages push costs onto families",
          plain:
            "Sudan's public cancer centres have long given chemotherapy and radiotherapy free of charge, and the government still covers essential cancer medicines. In practice, when medicines run out patients buy them privately, and they pay for travel and lodging. A 2024 study in Kassala put the average cost of one chemotherapy cycle at about 900 US dollars.",
          detail:
            "The Ministry of Health's 2012 to 2016 strategy describes cancer patients frustrated by costly treatment and inaccessible services and names the high cost of medicines as a challenge. A 2022 paper by Sudanese clinicians states that chemotherapy drugs and radiotherapy sessions are free, but that the health system could not keep radiotherapy running, causing waiting lists and treatment breaks; a 2023 editorial says government centres gave both as part of universal health coverage. In a survey of 100 patients at Dr. Tiraky Oncology Center in Kassala between September and November 2024, the government covered essential cancer medicines, but patients paid for out-of-stock chemotherapy, transport and accommodation, and one cycle cost on average about 900 US dollars; international donations gave some relief. WHO's Global Health Expenditure Database puts out-of-pocket payments at 57.4% of current health spending in 2023 (67.5% in 2019), and total health spending at 2.85% of GDP in 2023. A 2023 preprint based on interviews with five senior financing advisers gave out-of-pocket payments as over 70% of health spending.",
          links: [
            { label: "Elhassan et al., cancer treatment amid armed conflict, Kassala (J Cancer Policy 2025)", url: D_KASSALA },
            { label: "Husain et al., women's cancers in Sudan (ecancer 2022)", url: D_WOMEN },
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Sudan (API)", url: WHO_OOP_API },
            { label: "Bashir and Allen, health financing in Sudan after the 2023 conflict (medRxiv preprint)", url: D_FINANCING },
          ],
        },
        {
          id: "nhif",
          title: "The National Health Insurance Fund, set up in 1994, covers a minority",
          plain:
            "Sudan's National Health Insurance Fund dates from a 1994 decree and first paid for care in Sennar State in 1995. Salaried workers pay 4% of pay and others a flat rate, and poor families can be enrolled with help from bodies such as the Zakat Chamber. Researchers report that it covers only a minority of Sudanese.",
          detail:
            "The Fund's Arabic history page records that health insurance formally began with the provisional decree of 1994 on administering health insurance, after earlier experiments with free and then fee-paying care, with technical help from WHO, and that the first insured service was given in Sennar State in 1995. It describes one package of services for all members, referral between levels of care and between states, contributions of 4% for salaried workers and a fixed rate for those with irregular incomes, and subsidised membership for poor families. The Fund's news pages for September to November 2026 report health centres reopened after rehabilitation in Sennar State, a new health centre in Berber (River Nile State), and new offices and a reference laboratory for the Fund in Kassala. The 2023 preprint's informants said the scheme covers only a minority and that purchaser and provider roles, and federal and state responsibilities, are unclear. OnCo found no Fund document listing which cancer medicines or treatments it pays for, nor a coverage figure from the Fund itself.",
          links: [
            { label: "NHIF: about the Fund (Arabic)", url: NHIF_ABOUT },
            { label: "NHIF: home page and news (Arabic)", url: "https://nhif.gov.sd/" },
            { label: "Bashir and Allen, health financing in Sudan after the 2023 conflict (medRxiv preprint)", url: D_FINANCING },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the National Medicines and Poisons Board",
      aside: { label: "NMPB: about the Board (Arabic)", url: NMPB_ABOUT },
      cards: [
        {
          id: "nmpb",
          title: "One board registers medicines, sets prices and licenses clinical trials, under a 2009 Act",
          plain:
            "Sudan's medicines regulator is the National Medicines and Poisons Board. Under the Medicines and Poisons Act 2009 it registers medicines and medical supplies, sets conditions for importing, making, storing and pricing them, and licenses trials of medicines in people. Its home page links to a public register of registered products.",
          detail:
            "The Board's Arabic history page traces regulation to the Pharmacy and Poisons Act of 1963, enforced by the Federal Ministry of Health's pharmacy directorate; a Federal Pharmacy and Poisons Board created under the 2001 Act, under the pharmacy directorate until 2007 and then under the supervision of the Federal Minister of Health; and the Medicines and Poisons Act 2009, which remains in force. Article 6 makes the Board the national authority for the specifications and conditions governing the import, manufacture, control, storage, pricing, transport and use of medicines, cosmetics and medical supplies. Its powers include registering medicines on criteria of need, safety, efficacy, price and quality, licensing trials of medicines in humans or animals under article 22, requiring an importer to bring in a medicine the country needs, requiring local factories to produce a medicine when necessary, and approving exports. The Board also runs a pharmacovigilance centre, and its home page links to a public register of registered products, which did not resolve from OnCo on 11 November 2026. Its news page in late October 2026 reported inspection campaigns seizing smuggled, expired and unregistered medicines in Kassala and in North Kordofan.",
          links: [
            { label: "NMPB: about the Board (Arabic)", url: NMPB_ABOUT },
            { label: "NMPB: home page and news (Arabic)", url: NMPB_HOME },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO immunisation data: vaccine introduction rows for Sudan (API)", url: WHO_INTRO_API },
      cards: [
        {
          id: "no-screening",
          title: "No organised cancer screening, and no HPV vaccine",
          plain:
            "Sudan has no organised screening programme for any cancer. Before the war there were only pilots and private or charity efforts, mostly for breast cancer. WHO's immunisation records show that Sudan had not introduced the HPV vaccine, which prevents most cervical cancers, by 2025.",
          detail:
            "The Ministry of Health's 2012 to 2016 strategy states that there were no organised screening programmes apart from sporadic private and charity efforts, largely mammography not linked to treatment; small pilot breast screening in Gezira and River Nile states; and a demonstration of visual inspection with acetic acid for cervical screening in North Kordofan. Guidelines for early detection of breast, cervical and oral cancers had been written. A 2022 paper by Sudanese clinicians found screening by visual inspection and Pap smears limited and uncoordinated, not linked to treatment of precancerous lesions, and said Sudan had not used its eligibility for Gavi support to introduce the HPV vaccine. WHO's vaccine introduction rows for Sudan record HPV vaccine as not introduced in every year to 2025. Breast cancer studies at Wad Madani (2012 diagnoses) and Gedaref (2016 to 2022) found 65% and 82% of women diagnosed at stage III or IV; the Wad Madani study found 5-year survival of 58% overall and 8.4% at stage IV.",
          links: [
            { label: "National Cancer Strategy 2012 to 2016, annex 1, early detection (PDF)", url: NCS_2012 },
            { label: "Husain et al., women's cancers in Sudan with a focus on cervical cancer (ecancer 2022)", url: D_WOMEN },
            { label: "WHO immunisation data: vaccine introduction rows for Sudan (API)", url: WHO_INTRO_API },
            { label: "Muddather et al., breast cancer survival at the National Cancer Institute (JCO Glob Oncol 2021)", url: D_MUDDATHER },
          ],
        },
        {
          id: "hepb",
          title: "Hepatitis B vaccine for infants since 2004, with coverage falling to 39% in 2024",
          plain:
            "Hepatitis B causes much liver cancer, which IARC ranks second among cancer deaths in Sudan. Infants have been vaccinated since 2004 by WHO's records. Coverage was above 90% before 2020, fell to 39% in 2024 during the war, and recovered to 71% in 2025. Sudan gives no birth dose.",
          detail:
            "WHO's vaccine introduction rows record hepatitis B vaccine in Sudan's schedule from 2004 and no hepatitis B birth dose in any year to 2025; the Ministry's 2012 strategy dates infant vaccination to 2006 and notes that it was generally not offered to groups at high risk. WHO and UNICEF estimates of three-dose coverage are 93% in 2018 and 2019, 90% in 2020, 84% in 2021 and 2022, 51% in 2023, 39% in 2024 and 71% in 2025; the government's own administrative figure for 2024 was 38.93%, 722,649 of 1,856,373 infants. IARC estimates 2,424 liver cancers and 2,289 liver cancer deaths in 2024, second only to breast cancer among deaths. The Ministry's strategy also cites an unpublished registry survey across the states in which more than a third of respondents smoked cigarettes and one in four used toombak, a smokeless tobacco.",
          links: [
            { label: "WHO immunisation data: hepatitis B three-dose coverage, Sudan (API)", url: WHO_HEPB_API },
            { label: "WHO immunisation data: vaccine introduction rows for Sudan (API)", url: WHO_INTRO_API },
            { label: "National Cancer Strategy 2012 to 2016, annex 1, prevention (PDF)", url: NCS_2012 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Sudan (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Sudan does",
      title: "What Sudan does: free public treatment, and keeping care going outside the capital",
      cards: [
        {
          id: "peripheral-centres",
          title: "State centres in Shendi, Gedaref, Kassala and Merowe carried cancer care after Khartoum stopped",
          plain:
            "When Khartoum's cancer services stopped in 2023, smaller centres in the states took the patients. From 15 April to 31 August 2023 new patients at Shendi rose almost fivefold against the same months of 2022, and those at Gedaref and Merowe roughly doubled. Researchers have studied how these centres coped, with few staff, unpaid salaries and medicines that ran out.",
          detail:
            "The 2023 editorial reported new patients from 15 April to 31 August rising, against the same months of 2022, from 163 to 791 at the Tumour Therapy and Cancer Research Center in Shendi, from 165 to 337 at the East Oncology Center in Gedaref and from 217 to 397 at the Eldaman Oncology and Radiotherapy Center in Merowe, while staff worked unpaid. A 2025 paper in JCO Global Oncology reports data on the surge at the East Oncology Centre and the White Nile Cancer Centre and on supply shortages, and argues that Sudan's cancer crisis received less international attention than other conflicts. At Dr. Tiraky Oncology Center in Kassala in late 2024 the authors named a limit of 12 chemotherapy chairs, staff shortages and an increased workload. Before the war the Ministry's 2012 strategy had already noted that the two radiotherapy centres were only 200 km apart in central Sudan, and proposed centres in Merowe, Al Fasher and Suba. The 2024 commentary adds that Sudan's doctors in the diaspora have rallied to provide support but face many obstacles.",
          links: [
            { label: "Alrawa et al., five months into conflict (ecancer 2023)", url: D_ALRAWA },
            { label: "Ahmed et al., impact of armed conflict on cancer care in Sudan (JCO Glob Oncol 2025)", url: D_IMPACT },
            { label: "Elhassan et al., cancer treatment amid armed conflict, Kassala (J Cancer Policy 2025)", url: D_KASSALA },
            { label: "Ahmed et al., collapse of cancer care (JCO Glob Oncol 2024)", url: D_COLLAPSE },
          ],
        },
        {
          id: "children",
          title: "Children with cancer: a call to evacuate them, as was done for Ukraine and Gaza",
          plain:
            "Leukaemia was the commonest cancer in children in Khartoum State in 2009 and 2010, according to the registry there. In 2024 Sudanese and international clinicians and researchers asked WHO, UNICEF, St Jude and partners to airlift children with cancer to neighbouring countries to continue treatment, as was done for children from Ukraine and Gaza.",
          detail:
            "The Khartoum registry's 2009 to 2010 figures found leukaemia the commonest cancer in children under 15, followed by lymphoma and cancers of the eye, bone, kidney and brain. The 2024 commentary in JCO Global Oncology says repeated displacement has had grave consequences for the continuity of care and palpable negative effects on children, and calls on WHO, the United Nations Children's Fund, St Jude Children's Research Hospital and all relevant partners to implement an immediate evacuation operation with urgent airlifts of affected children to neighbouring countries. The IAEA's May 2026 release describes the National Cancer Institute in Wad Madani as a main provider of adult and paediatric oncology care in Al Gazira State. OnCo found no published account of whether an evacuation of children with cancer took place, and no count of children with cancer receiving treatment in Sudan since 2023.",
          links: [
            { label: "Ahmed et al., collapse of cancer care under the current conflict in Sudan (JCO Glob Oncol 2024)", url: D_COLLAPSE },
            { label: "Saeed et al., cancer incidence in Khartoum 2009 to 2010 (Cancer Med 2014)", url: D_SAEED },
            { label: "IAEA: Rays of Hope delivers equipment to restore radiotherapy services in Sudan (4 May 2026; Internet Archive)", url: IAEA_NCI_WB },
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
          title: "No trial in OnCo's records has a site in Sudan",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Sudan. ClinicalTrials.gov itself returns only about ten studies for cancer with a Sudanese location, several of them not about cancer. Sudanese cancer research on this page is observational.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Sudan among their countries. A query of the ClinicalTrials.gov API the same day for the condition cancer and the location Sudan returned 10 studies, 9 listing a site in Sudan; the cancer-related ones include two studies of liver devascularisation for large hepatocellular carcinoma sponsored by the National Ribat University (2017), a study of bladder cancer patterns in Darfur, a prospective study of malignancy in long-standing goitres from the University of Khartoum, the international Recurrence After Whipple's study, and the US National Cancer Institute's Helicobacter pylori Genome Project (terminated); others concern malaria and polycystic ovary syndrome. Trials of medicines need a licence from the National Medicines and Poisons Board under article 22 of the Medicines and Poisons Act 2009. Sudanese clinicians have published the registry's incidence, breast cancer survival at Wad Madani, breast cancer in Gedaref, the radiotherapy census and studies of care during the war, all listed on this page.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Sudan (search)", url: CTGOV },
            { label: "NMPB: about the Board, article 22 licensing of trials (Arabic)", url: NMPB_ABOUT },
            { label: "Elhaj et al., radiotherapy in Sudan (Radiother Oncol 2026)", url: D_RT },
          ],
        },
        {
          id: "plan",
          title: "The last published cancer strategy covered 2012 to 2016",
          plain:
            "Sudan's most recent national cancer plan on the international cancer planning portal is a draft strategy for 2012 to 2016, written by the Ministry of Health with WHO, the two main cancer centres and the registry. It followed a 2002 to 2003 plan that had lapsed. OnCo found no newer plan published.",
          detail:
            "The National Cancer Strategy 2012 to 2016, dated 4 April 2012 and marked as a draft for ratification by the Higher Committee for Cancer Control, was drafted by the Ministry's non-communicable diseases directorate with the Public Health Institute, the Radiation and Isotopes Centre Khartoum, the National Cancer Institute in Wad Medani, the National Cancer Registry, the laboratory directorate and WHO. It notes that the cancer control plan of 2002 to 2003 had lapsed without being updated, that a national cancer council of 28 professionals had been formed in 2008, and that both it and a cancer advisory committee needed to be activated. Its priorities ran from primary prevention and early detection to diagnosis, treatment, palliative care, coordination, and research and surveillance through the registry. It cited the IAEA's recommendation of one radiotherapy centre for every 2 to 5 million people against the two centres Sudan then had. Whether a successor plan has been adopted since 2016 could not be confirmed from a primary source.",
          links: [
            { label: "National Cancer Strategy 2012 to 2016 (Federal Ministry of Health, PDF, ICCP portal)", url: NCS_2012 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "status-now",
      title: "Which cancer centres are treating patients in November 2026 is not known",
      plain:
        "The sources that describe Sudan's cancer centres during the war are dated: the 2023 editorial, the 2024 commentary, a radiotherapy survey of September 2025 and the IAEA's release of May 2026. OnCo found no primary source dated after May 2026 on whether Khartoum's centre or Wad Madani's radiotherapy is working again.",
      detail:
        "No statement from the Federal Ministry of Health, the Radiation and Isotopes Centre Khartoum or the National Cancer Institute on their current services was found. News reports that OnCo could not read raw, because the sites returned a bot challenge or HTTP 403 on 11 November 2026 (Sudan Tribune and allAfrica reprints of Sudan News Agency stories about the IAEA and the National Cancer Institute), are not used. A further search for 2026 reports on Khartoum Oncology Hospital could not be completed for this page. Ask the referring hospital or the state Ministry of Health which centre is treating and with what.",
      links: [
        { label: "IAEA: Rays of Hope delivers equipment to restore radiotherapy services in Sudan (4 May 2026; Internet Archive)", url: IAEA_NCI_WB },
        { label: "WHO: after three years of conflict, Sudan faces a deeper health crisis (14 April 2026)", url: WHO_2026 },
      ],
    },
    {
      id: "unread-full-texts",
      title: "Several key papers were read only as abstracts",
      plain:
        "The 2025 JCO Global Oncology paper on patient surges at peripheral centres, the 2024 commentary on the collapse of cancer care, and the 2026 radiotherapy census were read only as abstracts; the publishers' pages refused a script. Their detailed tables, including centre-by-centre patient numbers since 2023, are not on this page.",
      detail:
        "ascopubs.org returned a bot challenge (HTTP 403) for both JCO Global Oncology papers on 11 November 2026, and Europe PMC holds no full text for them or for the Radiotherapy and Oncology paper. The 2023 Lancet correspondence by Hammad and Ahmed on Sudan's conflict and cancer care has no abstract in Europe PMC and is not used. The full text of the 2023 ecancermedicalscience editorial, the 2022 women's cancers paper and the 2014 registry paper were read through Europe PMC.",
      links: [
        { label: "Ahmed et al., impact of armed conflict on cancer care in Sudan (JCO Glob Oncol 2025)", url: D_IMPACT },
        { label: "Elhaj et al., radiotherapy in Sudan (Radiother Oncol 2026)", url: D_RT },
      ],
    },
    {
      id: "unfound-figures",
      title: "Figures not found: coverage of insurance, regulator ratings, survival, a current plan",
      plain:
        "OnCo could not find from a primary source: how many Sudanese the National Health Insurance Fund covers and which cancer treatments it pays for, whether WHO has benchmarked the medicines regulator, any population-based cancer survival figure, or a national cancer plan adopted after 2016.",
      detail:
        "The Fund's pages give its history and contribution rates but no coverage count; the preprint's statement that it covers a minority is from interviews, not Fund data. WHO's list of regulators assessed with its Global Benchmarking Tool was not checked here, so no maturity level is given for the National Medicines and Poisons Board, and the Board publishes no registration timelines that OnCo found. The only survival figure on this page is one hospital's breast cancer cohort. IARC's detailed data sources page for Sudan was not read; the method is taken from the fact sheet. The IAEA's DIRAC directory and the WHO cancer country profile for Sudan were not read; machine counts come from the 2026 census paper. Sudan's essential medicines list was not read.",
      links: [
        { label: "NHIF: about the Fund (Arabic)", url: NHIF_ABOUT },
        { label: "NMPB: about the Board (Arabic)", url: NMPB_ABOUT },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Sudan (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: [
    "sudan-federal-ministry-of-health", "sudan-national-cancer-registry", "nmpb-sudan", "nhif-sudan", "rick-khartoum-oncology-hospital",
    "nci-university-of-gezira", "shendi-tumour-therapy-centre", "east-oncology-centre-gedaref", "who", "iaea", "iarc", "st-jude",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-saeed-khartoum-cancer-registry-2009-2010-cam4-2014", "paper-alrawa-sudan-cancer-services-five-months-ecancer-2023", "paper-ahmed-collapse-cancer-care-sudan-jcogo-2024",
    "paper-ahmed-armed-conflict-cancer-care-sudan-jcogo-2025", "paper-elhassan-kassala-cancer-treatment-conflict-jcpo-2025", "paper-elhaj-radiotherapy-sudan-radonc-2026",
    "paper-husain-womens-cancers-sudan-ecancer-2022", "paper-muddather-breast-cancer-survival-gezira-jcogo-2021", "paper-ahmed-breast-cancer-eastern-sudan-ecancer-2024",
  ],
  people: [],
  how:
    "Every card was written from Sudanese official sources, UN agencies and peer-reviewed papers, read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; the Federal Ministry of Health's National Cancer Strategy 2012 to 2016; WHO's April 2026 news release and March 2025 situation analysis; WHO's immunisation and health expenditure rows from its public APIs; the IAEA's May 2026 press release, through the Internet Archive; the National Medicines and Poisons Board's and the National Health Insurance Fund's Arabic pages; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and a ClinicalTrials.gov API query. Statements about the war are dated to their source. The new records added for this page (the Ministry, the registry, the regulator, the insurer, four cancer centres and nine papers) carry their own sources.",
  verify:
    "Sudan is at war, and which centres are open, which medicines are in stock and whether radiotherapy is available change month to month. National incidence and death figures are IARC estimates, not a count. Before travelling for treatment, ask the referring hospital or the state Ministry of Health which oncology centre is working and what it can give.",
  verifyLinks: [
    { label: "WHO: health emergency in Sudan", url: "https://www.who.int/emergencies/situations/sudan-emergency" },
    { label: "National Medicines and Poisons Board", url: NMPB_HOME },
    { label: "National Health Insurance Fund", url: "https://nhif.gov.sd/" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Sudan (PDF)", url: IARC_FACTSHEET },
  ],
};
