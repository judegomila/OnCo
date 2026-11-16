import type { CountryDive } from "@/data/country-dive";

/**
 * Azerbaijan deep dive: the hand-written cards for /countries/az/ (wave 11). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Azerbaijan (PDF text);
 * the State Statistical Committee's health tables 1.2.7, 1.2.8, 1.3, 1.1.2 and 1.1.8 (Excel files, read cell by cell);
 * the National Oncology Centre's history and cancer registry pages and the Ministry of Health's page for the Centre;
 * the State Medical Insurance and Expertise Agency's about page, compulsory insurance page and October 2026 news
 * releases; the Analytical Expertise Centre's about, registration, review-timeline and legislation pages; WHO's list of
 * regulators at maturity level 3 and 4 (PDF, August 2026); WHO's HPV coverage and vaccine introduction rows and its
 * Global Health Expenditure rows for Azerbaijan from the public APIs; and IAEA DIRAC's equipment report by centre.
 * Three statements are taken from press reports and labelled as such: the Prime Minister's December 2025 statement on
 * childhood cancer and insurance, the parliamentary health committee chair's November 2025 remarks on cancer medicines,
 * and the Ministry of Health's March 2026 statement on HPV vaccine. Where a figure could not be read it is named under
 * `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/31-azerbaijan-fact-sheet.pdf";
const STAT_HEALTH = "https://www.stat.gov.az/source/healthcare/?lang=en";
const STAT_CANCER = "https://www.stat.gov.az/source/healthcare/en/001_2_7en.xls";
const STAT_CANCER_AGE = "https://www.stat.gov.az/source/healthcare/en/001_2_8en.xls";
const STAT_DEATHS = "https://www.stat.gov.az/source/healthcare/en/001_3en.xls";
const STAT_BUDGET = "https://www.stat.gov.az/source/healthcare/en/001_1_8en.xls";
const MOH_NOC = "https://sehiyye.gov.az/nazirliyin-qurumlari/milli-onkologiya-merkezi/";
const NOC_ABOUT = "http://mom.gov.az/?smode=content&item=Milli_Onkologiya_Merkezi_haqqinda";
const NOC_WILMS = "http://mom.gov.az/?smode=metbuat-bulleteni&item=Milli_Onkologiya_Merkezinde_ushaq_onkologiyasina_hesr_olunmush_elmi_seminar_keciri&lang=az";
const NOC_REGISTRY = "http://mom.gov.az/?smode=content&item=AZERBAYCAN_RESPUBLIKASI_ONKO_REQSTRI&lang=az";
const DTSEA_ABOUT = "https://dtsea.gov.az/agentlik/haqqimizda";
const DTSEA_ITS = "https://dtsea.gov.az/fealiyyet/icbari-tibbi-sigorta";
const DTSEA_PACKAGE = "https://dtsea.gov.az/media/press-reliz/icbari-tibbi-sigorta-uzre-xidmetler-zerfine-arterial-hipertenziya-ile-bagli-derman-teminati-da-daxil-edilecek";
const DTSEA_BREAST = "https://dtsea.gov.az/media/press-reliz/15-oktyabr-sud-vezi-xercengine-qarsi-umumdunya-mubarize-gunudur";
const DTSEA_MAMMO = "https://dtsea.gov.az/media/press-reliz/icbari-tibbi-sigorta-ile-sud-vezilerinin-birterefli-ve-ikiterefli-mammoqrafiya-muayinesi-de-aparilir";
const DTSEA_9M = "https://dtsea.gov.az/media/press-reliz/9-ayda-icbari-tibbi-sigorta-ile-pasiyentlere-75-milyon-tibbi-xidmet-gosterilib";
const DTSEA_PHARM = "https://dtsea.gov.az/media/press-reliz/eczacilarin-vii-respublika-konfransinda-icbari-tibbi-sigorta-cercivesinde-derman-teminati-meseleleri-muzakire-olunub";
const AEM_ABOUT = "https://pharma.az/haqqimizda/about/haqqimizda/";
const AEM_TIMES = "https://pharma.az/dv-qeydiyyati/derman-vasitelerinin-ekspertizasinin-aparilmasi/d-rman-vasit-l-rinin-ekspertizasinin-aparilmasi/";
const AEM_LAW = "https://pharma.az/dv-qeydiyyati/qanunvericilik-dv-qeydiyyati/qanunvericilik-5/";
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'AZE'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'AZE'";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'AZE'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20'AZE'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'AZE'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const PRESS_PM = "https://sia.az/en/news/health/1305412.html";
const PRESS_APA = "https://en.apa.az/finance/azerbaijan-urged-to-boost-state-funding-for-cancer-treatment-medicines-482951";
const PRESS_HPV = "https://modern.az/en/news/576275/";
const CTGOV = "https://clinicaltrials.gov/search?country=Azerbaijan&cond=cancer";

export const AZ_DIVE: CountryDive = {
  iso2: "AZ",
  iso3: "AZE",
  name: "Azerbaijan",
  flag: "🇦🇿",
  asOf: "2026-11-11",
  title: "Cancer in Azerbaijan",
  description:
    "Cancer in Azerbaijan from Azerbaijani sources: 15,144 newly diagnosed cancers registered in 2025 by the State Statistical Committee against IARC's estimate of 15,251 for 2024, the National Oncology Centre in Baku and its network of dispensaries, compulsory health insurance that pays for breast cancer diagnosis, shorter registration reviews for cancer medicines, ten radiotherapy machines in three centres, no national HPV vaccination yet, and no trial in our records with a site in Azerbaijan.",
  lede:
    "Azerbaijan counts newly diagnosed cancers through its medical institutions and publishes the totals every year: 15,144 in 2025, with breast, lung and stomach cancer the largest of the sites it lists. Care is centred on the National Oncology Centre in Baku and a network of regional dispensaries. Compulsory health insurance pays for diagnosis. Cancer medicines are bought from the state budget, and in November 2025, according to a press report, the chair of parliament's health committee said that money was not enough.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Azerbaijan is 15,251 new cancers and 8,883 deaths, an age-standardised incidence of 120.3 per 100,000 (139.4 in men, 107.8 in women) and mortality of 69.0 (88.9 in men, 54.1 in women). IARC's fact sheet gives no country-specific incidence source: it derived incidence from national mortality data (WHO) using modelled mortality-to-incidence ratios. Azerbaijan's own registration count is close in total, 15,164 newly diagnosed cancers in 2024 and 15,144 in 2025, but differs by site and sex: the national tables have more cancers in women than men (8,051 against 7,113 in 2024), where IARC estimates more in men (7,847 against 7,404), and 2,674 breast cancers in 2024 against IARC's 1,659. The national figures are crude counts and rates, not age-standardised, so they cannot be compared rate for rate with IARC's. The national tables count 9,681 deaths from neoplasms in 2024, a cause group that also includes benign tumours, against IARC's 8,883 cancer deaths.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Azerbaijan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Azerbaijan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 15,000 new cancers a year; breast, stomach and lung lead",
          plain:
            "IARC estimates 15,251 new cancers in Azerbaijan in 2024 and 8,883 cancer deaths. Breast cancer is the commonest cancer, a fifth of cancers in women, followed by stomach and lung cancer. Stomach and lung cancer cause the most deaths. About one person in eight would develop a cancer before age 75 at current rates.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,659 breast cancers (446 deaths), 1,459 stomach cancers (1,074 deaths), 1,243 lung cancers (1,028 deaths), 876 colorectal cancers (384 deaths), 767 prostate cancers and 558 cervical cancers (205 deaths). In men the leading cancers are lung (964), stomach (912) and prostate (767); in women breast (1,659, 22.4% of cancers in women), cervix (558) and stomach (547). The risk of developing a cancer before age 75 is 12.5% (14.7% for men, 10.9% for women) and of dying from one 7.8%. An estimated 33,968 people are living within five years of a diagnosis. Stomach, lung and liver cancer are the three leading causes of cancer death for both sexes together. IARC's estimate rests on national mortality data, not on an Azerbaijani incidence source; the national registration counts are in the table below.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Azerbaijan (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "national-counts",
          title: "The national count: 15,144 newly diagnosed cancers in 2025, three times the number in 2000",
          plain:
            "Azerbaijan's State Statistical Committee publishes the number of newly diagnosed cancers that medical institutions register each year. It rose from 4,804 in 2000 to 15,144 in 2025, and 74,004 people with cancer were on medical institutions' registers in 2025. Breast cancer counts rose more than fourfold, from 669 to 2,928 new cases a year.",
          detail:
            "Table 1.2.7 records 4,804 newly diagnosed malignant neoplasms in 2000, 7,626 in 2010, 10,183 in 2015, 11,595 in 2020, 13,666 in 2023, 15,164 in 2024 and 15,144 in 2025, a crude rate of 147.8 per 100,000 population in 2025. People with cancer registered by medical institutions rose from 21,088 in 2000 to 74,004 in 2025. In 2025 table 1.2.8 splits new cases into 6,787 in men and 8,357 in women, with 125 in children aged 0 to 13, 43 aged 14 to 17, 5,970 aged 40 to 59 and 7,705 aged 60 and over. Deaths from neoplasms in table 1.3 were 10,102 in 2025 (98.6 per 100,000), 16.9% of the 59,834 deaths from all causes, and 9,681 in 2024; that cause group includes benign tumours. The National Oncology Centre's registry page credits the growth in the number of people with cancer on the registers between 2008 and 2013 mainly to stronger oncology services, wider access to modern diagnosis and public awareness. Counts rise when diagnosis improves as well as when disease becomes commoner, and these are crude figures, so they do not show on their own whether the risk of cancer is changing.",
          links: [
            { label: "State Statistical Committee, table 1.2.7: malignant neoplasms by localisation (Excel)", url: STAT_CANCER },
            { label: "State Statistical Committee, table 1.2.8: malignant neoplasms by sex and age (Excel)", url: STAT_CANCER_AGE },
            { label: "State Statistical Committee, table 1.3: deaths by causes (Excel)", url: STAT_DEATHS },
            { label: "National Oncology Centre: Azerbaijan cancer registry page", url: NOC_REGISTRY },
          ],
        },
      ],
      tables: [
        {
          id: "az-registered",
          title: "Newly diagnosed cancers registered in Azerbaijan, with IARC's 2024 estimate",
          caption: "New cases registered by medical institutions each year (State Statistical Committee), and the crude rate per 100,000 population. Latest year: 2025.",
          columns: [
            { key: "source", label: "Source" },
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "rate", label: "Crude rate per 100,000", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "lung", label: "Trachea, bronchus, lung", numeric: true },
            { key: "stomach", label: "Stomach", numeric: true },
          ],
          rows: [
            { source: "State Statistical Committee", year: "2000", cases: 4804, men: null, women: null, rate: 60.4, breast: 669, lung: 606, stomach: 574 },
            { source: "State Statistical Committee", year: "2010", cases: 7626, men: 3756, women: 3870, rate: 85.4, breast: 1221, lung: 981, stomach: 925 },
            { source: "State Statistical Committee", year: "2015", cases: 10183, men: 4967, women: 5216, rate: 106.9, breast: 1693, lung: 1147, stomach: 1066 },
            { source: "State Statistical Committee", year: "2020", cases: 11595, men: 5641, women: 5954, rate: 115.9, breast: 1960, lung: 1225, stomach: 1301 },
            { source: "State Statistical Committee", year: "2023", cases: 13666, men: 6442, women: 7224, rate: 134.6, breast: 2541, lung: 1461, stomach: 1363 },
            { source: "State Statistical Committee", year: "2024", cases: 15164, men: 7113, women: 8051, rate: 148.6, breast: 2674, lung: 1525, stomach: 1437 },
            { source: "State Statistical Committee", year: "2025", cases: 15144, men: 6787, women: 8357, rate: 147.8, breast: 2928, lung: 1480, stomach: 1392 },
            { source: "IARC GLOBOCAN estimate", year: "2024", cases: 15251, men: 7847, women: 7404, rate: null, breast: 1659, lung: 1243, stomach: 1459 },
          ],
          note: "The national figures are counts of newly diagnosed cases registered by medical institutions, and crude rates; the split by sex starts in 2007 in the source table. IARC's row is a model estimate built from mortality data, and its rates are age-standardised (120.3 per 100,000), so its rate is left blank here. The national table's breast row is headed \"mammary gland\".",
          sources: [
            { label: "State Statistical Committee, table 1.2.7 (Excel)", url: STAT_CANCER },
            { label: "State Statistical Committee, table 1.2.8 (Excel)", url: STAT_CANCER_AGE },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Azerbaijan (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a reporting form, a national centre and the statistics office",
      aside: { label: "National Oncology Centre: Azerbaijan cancer registry page", url: NOC_REGISTRY },
      cards: [
        {
          id: "registry-form",
          title: "The National Oncology Centre asks for every new diagnosis on one form",
          plain:
            "The National Oncology Centre asks hospitals, dispensaries and pathology laboratories in Azerbaijan to report each newly diagnosed cancer on a registration form, coded with the international classification for cancers. The national totals are published by the State Statistical Committee. IARC's 2024 fact sheet lists no Azerbaijani source for its incidence estimate.",
          detail:
            "The Centre's registry page explains what a cancer registry is for and says a registry depends on doctors, hospitals and histopathologists sending it their cases, coded in ICD-O-3, and asks for the completed primary cancer diagnosis registration form (TQS No. 025/2-O) to be sent to an oncology statistics email address. It does not say what share of diagnoses reach it. The Centre has a department of epidemiology and statistics of malignant tumours. The same page quotes the registry's earlier counts: 7,377 new cancers in 2008 and 9,064 in 2013, and 25,472 people with cancer registered in 2008 against 34,681 in 2013, figures that match the Statistical Committee's tables. It also notes that registries in Türkiye (Izmir), Belarus and Iran are full members of the International Association of Cancer Registries, without claiming the same for Azerbaijan. IARC's fact sheet lists no Azerbaijani incidence data source for GLOBOCAN 2024; OnCo could not find out why. See the gaps.",
          links: [
            { label: "National Oncology Centre: Azerbaijan cancer registry page", url: NOC_REGISTRY },
            { label: "State Statistical Committee: health tables", url: STAT_HEALTH },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Azerbaijan, data sources (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Where care is",
      title: "Where treatment is: one national centre, regional dispensaries and ten radiotherapy machines",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "network",
          title: "The National Oncology Centre in Baku and a network of dispensaries",
          plain:
            "The National Oncology Centre in Baku, run by the Ministry of Health, coordinates research, methods and prevention work in specialised cancer care in Azerbaijan. Information on diagnosis and treatment comes to it from the Baku Oncology Dispensary, seven interregional oncology dispensaries and up to 100 oncology rooms around the country. A children's cancer clinic opened at the Centre in 2012.",
          detail:
            "The Ministry of Health's page names the seven interregional dispensaries: Nakhchivan, Khankendi, Sumgayit, Shaki, Mingachevir, Shirvan and Lankaran. The Centre began as a radiology research institute ordered in December 1940, added oncology in 1963 and took its present name in October 1995. Its children's oncology clinic opened on 7 March 2012 with paediatric surgery, chemotherapy, radiotherapy and intensive care departments; a treatment building with endoscopy, chemotherapy, day chemotherapy and onco-haematology departments and a molecular oncology laboratory followed in 2014. The Centre runs a mobile diagnostic unit with ultrasound, X-ray, endoscopy and laboratory services for people in remote areas. The Statistical Committee counted 34,776 physicians at the start of 2026 (33.9 per 10,000 population); its table does not list oncologists separately.",
          links: [
            { label: "Ministry of Health: National Oncology Centre", url: MOH_NOC },
            { label: "National Oncology Centre: about the Centre", url: NOC_ABOUT },
            { label: "State Statistical Committee, table 1.1.2: physicians by specialisation (Excel)", url: "https://www.stat.gov.az/source/healthcare/en/001_1_2en.xls" },
          ],
        },
        {
          id: "radiotherapy",
          title: "Ten radiotherapy machines in three centres, eight of them in Baku",
          plain:
            "The IAEA's radiotherapy directory lists three centres in Azerbaijan with ten external-beam machines between them, about one for every million people. Seven are linear accelerators, all at the National Oncology Centre in Baku. Ganja and Nakhchivan each have one cobalt-60 machine, but their entries were last updated in 2018.",
          detail:
            "IAEA DIRAC, equipment by centre, read 11 November 2026: the National Center of Oncology in Baku has 8 megavoltage units (7 linear accelerators and 1 cobalt-60 unit) and brachytherapy (entry last updated 2023); Ganja Hospital of Oncology has 1 cobalt-60 unit (last updated 2018); Nakhchivan Oncology Centre has 1 cobalt-60 unit (last updated 2018). That is 10 megavoltage units, 1 brachytherapy service and 3 CT simulators for a population DIRAC gives as 10,246,996. DIRAC depends on centres reporting, and two of the three entries are eight years old, so machines installed or retired since may be missing. People outside Baku who need radiotherapy with a linear accelerator would, on these figures, travel to the capital.",
          links: [
            { label: "IAEA DIRAC: equipment by centre (read 11 November 2026)", url: DIRAC },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: insurance for diagnosis, the state budget for cancer medicines",
      aside: { label: "State Medical Insurance and Expertise Agency: compulsory health insurance", url: DTSEA_ITS },
      cards: [
        {
          id: "insurance",
          title: "Compulsory health insurance covers every citizen for a package of 3,318 services",
          plain:
            "Every Azerbaijani citizen is covered by compulsory health insurance on their identity card, in public hospitals and clinics. The package has grown from 1,829 services to 3,318. For breast disease it pays for mammography, ultrasound, MRI, biopsy and tumour markers on a doctor's referral. The package excludes care already provided under state programmes and laws, and OnCo found no source saying it pays for cancer treatment itself.",
          detail:
            "The State Medical Insurance and Expertise Agency, under the Ministry of Labour and Social Protection, is the legal successor of the State Agency on Mandatory Health Insurance. It covers citizens, refugees under UNHCR protection and foreign residents who pay the premium, in public facilities under TABIB and the Ministry of Health's research institutes, and in contracted private clinics on referral when the public sector cannot provide a service. Outpatient MRI and CT carry a 20% co-payment. The agency's page says the package does not include services whose examination and treatment are provided under state programmes and laws, nor cosmetic procedures, dentistry or IVF. In October 2026 it reported 3,318 services in the package, a yearly limit for bone marrow transplants raised from 20 to 50, and 75 million services to more than 4.8 million people from January to September 2026. Outpatient medicines are not yet covered: the agency is building a positive list and e-prescribing, with medicines for high blood pressure planned for 2027. In December 2025, according to a press report, the Prime Minister told parliament that including cancer treatment for children and adolescents in the package from 2027 was being considered and a draft was in preparation.",
          links: [
            { label: "Agency: compulsory health insurance, who is covered and where", url: DTSEA_ITS },
            { label: "Agency: about the agency", url: DTSEA_ABOUT },
            { label: "Agency: services package and medicines for high blood pressure (22 October 2026)", url: DTSEA_PACKAGE },
            { label: "Agency: 75 million services in nine months (19 October 2026)", url: DTSEA_9M },
            { label: "Agency: outpatient medicines, positive list and e-prescribing (22 October 2026)", url: DTSEA_PHARM },
            { label: "SIA (press report): childhood cancer treatment may join compulsory insurance (9 December 2025)", url: PRESS_PM },
          ],
        },
        {
          id: "out-of-pocket",
          title: "Households pay about two thirds of health spending directly",
          plain:
            "WHO's health spending figures show that in 2023 Azerbaijani households paid about 65% of all health spending out of their own pockets, and government about a third. In November 2025 the chair of parliament's health committee said the state money for cancer medicines was not enough to import what patients need.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending at 64.6% of current health expenditure in 2023 (71.3% in 2019, 57.8% in 2020), domestic general government spending at 32.6% of current health expenditure, and current health expenditure at 4.3% of GDP. The State Statistical Committee's preliminary figures put state budget spending on healthcare at 1,275.3 million manat in 2025, 1.0% of GDP and 3.3% of the state budget, against 1,828.8 million manat (1.45% of GDP, 4.9% of the budget) in 2024. According to a press report of 6 November 2025, the chair of the Milli Majlis health committee said outpatients were still not given the medicines they need, that state funds for cancer care were not sufficient for adequate treatment, that the medicines are expensive, and that additional funding was needed. OnCo did not find the current state programme for cancer medicines or its list of covered drugs in a primary source; see the gaps.",
          links: [
            { label: "WHO GHED: out-of-pocket share of current health expenditure, Azerbaijan (API)", url: GHO_OOP },
            { label: "WHO GHED: government share of current health expenditure, Azerbaijan (API)", url: GHO_GOV },
            { label: "WHO GHED: current health expenditure as % of GDP, Azerbaijan (API)", url: GHO_CHE },
            { label: "State Statistical Committee, table 1.1.8: state budget spending on healthcare (Excel)", url: STAT_BUDGET },
            { label: "APA (press report): Azerbaijan urged to boost state funding for cancer medicines (6 November 2025)", url: PRESS_APA },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "How medicines are approved: the Analytical Expertise Centre",
      aside: { label: "Analytical Expertise Centre: stages and times of expert review", url: AEM_TIMES },
      cards: [
        {
          id: "aem",
          title: "A national review of up to 210 days, shortened for cancer medicines and EU approvals",
          plain:
            "Medicines in Azerbaijan are registered after review by the Analytical Expertise Centre, set up by the Ministry of Health in 2007. A standard specialised review takes up to 210 days after a 15 working day initial check. For medicines approved through the European Medicines Agency's central procedure the two steps take 15 working days in all, and for cancer medicines 55 working days, about 11 weeks. Azerbaijan is not on WHO's list of maturity level 3 regulators.",
          detail:
            "The Centre's page on the stages of review sets the initial check of a registration dossier at 15 working days and the specialised review of quality, efficacy and safety at no more than 210 calendar days. For a medicine authorised by the European Medicines Agency's centralised procedure these steps take 5 and 10 working days. For medicines on WHO's list of recommended products, and those used to treat tuberculosis, HIV, infectious hepatitis, rare diseases and cancers, they take 10 and 45 working days. The legal basis it cites is the Law on Medicines of 22 December 2006 (No. 208-IIIQ) and Cabinet of Ministers decision No. 345 of 18 July 2024 on registration rules. The Centre has been a public legal entity since 14 October 2019 and describes itself as an observer of the European and US pharmacopoeias. Azerbaijan does not appear on WHO's list of national regulatory authorities operating at maturity level 3 or 4 (August 2026). OnCo found no published count of cancer medicines registered in Azerbaijan or of actual review times.",
          links: [
            { label: "AEM: stages and times of the expert review of medicines", url: AEM_TIMES },
            { label: "AEM: about the Centre", url: AEM_ABOUT },
            { label: "AEM: registration legislation", url: AEM_LAW },
            { label: "WHO: list of regulators operating at maturity level 3 and 4 (August 2026)", url: WHO_ML },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening and vaccines",
      title: "Screening and vaccination: diagnosis on referral, and no national HPV vaccination yet",
      cards: [
        {
          id: "breast-diagnosis",
          title: "Breast cancer: diagnosis paid by insurance, but OnCo found no organised screening programme",
          plain:
            "Compulsory health insurance pays for mammography of one or both breasts in public facilities, and for ultrasound, MRI and biopsy when a doctor finds a reason. The insurer asks women to see a doctor promptly about any change. OnCo found no national programme that invites women for screening at set ages.",
          detail:
            "In October 2026 the State Medical Insurance and Expertise Agency wrote that unilateral and bilateral mammography are in the services package, carried out in public facilities and, on referral, in contracted private clinics, and that breast diagnosis in the package also includes ultrasound, MRI, ductography, biopsy with histology and tumour markers, on medical indication and a specialist's referral. It reported 12,100 people living with a disability linked to breast cancer. The National Oncology Centre's history page says screening programmes for the early diagnosis of breast and lung cancer were developed and carried out, without dates or coverage. OnCo found no current organised cervical, breast or colorectal screening programme with an invitation system or coverage figures in the sources read; see the gaps.",
          links: [
            { label: "Agency: mammography under compulsory insurance (27 October 2026)", url: DTSEA_MAMMO },
            { label: "Agency: World Breast Cancer Day, what the package covers (15 October 2026)", url: DTSEA_BREAST },
            { label: "National Oncology Centre: about the Centre", url: NOC_ABOUT },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine is not yet in the national schedule",
          plain:
            "WHO's immunisation records show Azerbaijan had not introduced the HPV vaccine, which protects against cervical cancer, into its national programme by 2025, and report no coverage figures. According to a press report, in March 2026 the Ministry of Health said it was surveying, with WHO's support, how ready communities are for the vaccine before deciding whether to buy it.",
          detail:
            "WHO's vaccine introduction rows for Azerbaijan record HPV vaccine as not introduced for every year from 2006 to 2025, and its HPV coverage rows for Azerbaijan carry no values. According to a press report of 3 March 2026, based on a Baku TV item, the vaccine is available in the country but is not given under the state programme and is not in the compulsory insurance package; the Ministry of Health said surveys were being run with WHO support to assess community readiness, and that depending on the results either procurement would start or awareness campaigns on the vaccine's safety and effectiveness would be launched. IARC estimates 558 cervical cancers and 205 deaths in Azerbaijan in 2024. Families can ask a paediatrician or women's clinic whether the vaccine can be bought privately.",
          links: [
            { label: "WHO immunisation data: vaccine introduction rows for Azerbaijan (API)", url: WHO_INTRO_API },
            { label: "WHO immunisation data: HPV programme coverage rows for Azerbaijan (API)", url: WHO_HPV_API },
            { label: "Modern.az (press report): will the HPV vaccine be introduced in Azerbaijan? (3 March 2026)", url: PRESS_HPV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Azerbaijan does",
      title: "What Azerbaijan does differently",
      cards: [
        {
          id: "fast-track",
          title: "A written fast track for cancer medicines, and the shortest route for medicines approved in the EU",
          plain:
            "Azerbaijan's medicines review sets shorter times in writing for cancer medicines and for medicines the European Medicines Agency has approved centrally. A standard specialised review may take up to 210 days; for a cancer medicine it is 45 working days, and for an EU-approved medicine 10 working days.",
          detail:
            "The Analytical Expertise Centre's published review stages put cancer medicines alongside medicines for tuberculosis, HIV, infectious hepatitis and rare diseases, and products on WHO's recommended list, in a group with a 10 working day initial check and a 45 working day specialised review, against 15 working days and up to 210 calendar days for other medicines. For changes to an existing registration the group's specialised review is 30 calendar days, against up to 90. Medicines authorised through the European Medicines Agency's centralised procedure have the shortest route, 5 and 10 working days, so a cancer medicine approved in the European Union can in principle be registered within weeks. Registration is not the same as being paid for: whether a registered cancer medicine reaches patients depends on the state budget for cancer medicines, which the parliamentary health committee's chair called insufficient in November 2025.",
          links: [
            { label: "AEM: stages and times of the expert review of medicines", url: AEM_TIMES },
            { label: "APA (press report): Azerbaijan urged to boost state funding for cancer medicines (6 November 2025)", url: PRESS_APA },
          ],
        },
        {
          id: "children",
          title: "A children's cancer clinic inside the national centre, and 168 new cancers in under-18s in 2025",
          plain:
            "Azerbaijan treats children with cancer at a dedicated children's oncology clinic, opened in 2012 inside the National Oncology Centre, with its own surgery, chemotherapy, radiotherapy and intensive care departments. The national tables counted 125 new cancers in children up to 13 and 43 in young people aged 14 to 17 in 2025.",
          detail:
            "The National Oncology Centre's history page records the opening of the children's oncology clinic on 7 March 2012 and lists its paediatric surgery, paediatric chemotherapy, paediatric radiotherapy and paediatric anaesthesia and intensive care departments. In September 2026 the Centre and the Azerbaijan Oncologists Society held a seminar on the pathology and treatment of Wilms tumour based on the SIOP Renal Tumour Study Group approach. The State Statistical Committee's table 1.2.8 counts 125 newly diagnosed cancers at ages 0 to 13 in 2025 (6.7 per 100,000 children of that age) and 43 at ages 14 to 17 (6.4 per 100,000), and 139 and 70 in 2024. In December 2025, according to a press report, the Prime Minister said including cancer treatment for children and adolescents in compulsory insurance from 2027 was being considered. OnCo found no published survival figures for children with cancer in Azerbaijan.",
          links: [
            { label: "National Oncology Centre: about the Centre", url: NOC_ABOUT },
            { label: "National Oncology Centre: seminar on Wilms tumour, SIOP-RTSG approach (22 September 2026)", url: NOC_WILMS },
            { label: "State Statistical Committee, table 1.2.8: malignant neoplasms by sex and age (Excel)", url: STAT_CANCER_AGE },
            { label: "SIA (press report): childhood cancer treatment may join compulsory insurance (9 December 2025)", url: PRESS_PM },
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
          title: "No trial in OnCo's records has a site in Azerbaijan",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Azerbaijan. The National Oncology Centre does research, trains specialists and publishes its own journal; the search linked below shows any cancer studies registered in the country.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Azerbaijan among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study in Azerbaijan. The National Oncology Centre has published the Azerbaijan Journal of Oncology and Haematology since 1995, hosts a dissertation council for oncology and for radiation diagnosis and therapy since 1993, trains clinical residents, and opened a molecular oncology laboratory in 2014. Its history page also mentions research on new anti-tumour drugs and a vivarium built for it, without dates or results. A patient who wants to join a trial can ask the National Oncology Centre which studies are open there, and search ClinicalTrials.gov for sites in Azerbaijan and in nearby countries.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Azerbaijan (search)", url: CTGOV },
            { label: "National Oncology Centre: about the Centre", url: NOC_ABOUT },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "iarc-incidence",
      title: "Why IARC used no Azerbaijani incidence data is not known",
      plain:
        "Azerbaijan publishes yearly counts of newly diagnosed cancers, yet IARC's 2024 fact sheet lists no country-specific incidence source and models incidence from death data. The national and IARC totals are close, but their splits by sex and by site differ, and OnCo could not find out which is nearer the truth.",
      detail:
        "IARC's fact sheet states 'Country-specific data source: No data' for incidence and gives the method as national mortality estimates applied to modelled mortality-to-incidence ratios. The State Statistical Committee's tables give counts but not age-standardised rates, completeness checks or the share of cases confirmed under a microscope, which IARC uses to judge a registry. OnCo found no published evaluation of Azerbaijan's cancer registration against IARC or ENCR standards, and did not check Cancer Incidence in Five Continents for an Azerbaijani registry. The large gap in breast cancer (2,674 registered in 2024, 1,659 estimated) is unexplained here.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Azerbaijan (PDF)", url: IARC_FACTSHEET },
        { label: "State Statistical Committee, table 1.2.7 (Excel)", url: STAT_CANCER },
      ],
    },
    {
      id: "cancer-medicines-programme",
      title: "The state programme that pays for cancer medicines was not read",
      plain:
        "The insurance package excludes care provided under state programmes, and cancer medicines are bought from the state budget, but OnCo could not reach the current government decision, its budget or its list of medicines. The press reports on this page describe the debate; they are not the programme itself.",
      detail:
        "The legal texts on the government's legal database (e-qanun.az) did not render without a browser script, and no Ministry of Health page listing cancer medicines supplied free of charge, or the law on oncological care, was found in the time available. Figures quoted in the press for the yearly sum per patient and the number of medicines covered are not used here because they could not be traced to a primary source. Patients should ask their oncology dispensary which medicines the state supplies and which they must buy.",
      links: [
        { label: "Ministry of Health: National Oncology Centre", url: MOH_NOC },
        { label: "APA (press report): Azerbaijan urged to boost state funding for cancer medicines (6 November 2025)", url: PRESS_APA },
      ],
    },
    {
      id: "unread-sources",
      title: "Other sources not reached or not found",
      plain:
        "Some things a reader would want are missing because OnCo could not reach them: the IAEA's project documents on radiotherapy in Azerbaijan, any national cancer control plan, survival after a cancer diagnosis, and current screening coverage. Two of the three IAEA radiotherapy directory entries were last updated in 2018.",
      detail:
        "The IAEA's technical cooperation document on upgrading radiation oncology at the National Oncology Centre refused a plain request (HTTP 405) on 11 November 2026, and the Internet Archive could not be reached from OnCo's machine that day. OnCo found no IAEA imPACT Review report for Azerbaijan and no current national cancer control plan in the sources read. The date on which the insurance agency became part of the Ministry of Labour and Social Protection was not found. The Ministry of Health's own HPV statement and the government's insurance plans are cited from press reports because the original releases were not found.",
      links: [
        { label: "IAEA DIRAC: equipment by centre", url: DIRAC },
        { label: "State Medical Insurance and Expertise Agency: about the agency", url: DTSEA_ABOUT },
      ],
    },
  ],
  institutions: [
    "azerbaijan-ministry-of-health", "national-oncology-centre-azerbaijan", "aem-azerbaijan", "dtsea-azerbaijan", "azstat",
    "iarc", "iaea", "who",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from Azerbaijani official sources and international data, read in full rather than through a summary: the State Statistical Committee's health tables, read cell by cell; the National Oncology Centre's own pages and the Ministry of Health's page for it; the State Medical Insurance and Expertise Agency's pages and October 2026 releases; the Analytical Expertise Centre's pages on registration and review times; IARC's GLOBOCAN 2024 fact sheet; WHO's immunisation, health spending and regulator lists; and IAEA DIRAC. Three statements come from Azerbaijani press reports and are labelled as such. Where a source could not be reached it is named under the gaps.",
  verify:
    "National counts are registered cases, not age-standardised rates, and IARC's figures are model estimates. What compulsory insurance pays for changes each year as services are added, and which cancer medicines the state supplies depends on the current budget; ask the oncology dispensary or the National Oncology Centre what applies to you, and the insurance agency about the services package. HPV vaccination may be added to the national schedule after this page was checked.",
  verifyLinks: [
    { label: "National Oncology Centre", url: "http://mom.gov.az/" },
    { label: "Ministry of Health of Azerbaijan", url: "https://sehiyye.gov.az/" },
    { label: "State Medical Insurance and Expertise Agency", url: "https://dtsea.gov.az/" },
    { label: "Analytical Expertise Centre", url: "https://pharma.az/" },
  ],
};
