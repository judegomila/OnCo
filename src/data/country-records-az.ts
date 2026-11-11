import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Azerbaijan: the public bodies behind /countries/az/ (wave 11) that the corpus did not hold. Each was written from its
 * own primary source, read raw on 11 November 2026: the Ministry of Health's page for the National Oncology Centre and
 * its list of institutions; the National Oncology Centre's own site (its history page and its cancer registry page);
 * the State Medical Insurance and Expertise Agency's about page, its compulsory health insurance page and its October
 * 2026 news releases; the Analytical Expertise Centre's about page, its registration department page, its page on
 * review stages and timelines and its legislation page; and the State Statistical Committee's health tables (Excel
 * files 1.2.7, 1.2.8 and 1.3, updated in 2026). The corpus held no Azerbaijan record before this file.
 *
 * Inbound links: the Ministry of Health links the National Oncology Centre, the Analytical Expertise Centre, the
 * insurance agency and the Statistical Committee; each of them links the Ministry back. Coordinates for the National
 * Oncology Centre are those IAEA DIRAC gives for it; the other four are approximate Baku city points, not building
 * positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const MOH_NOC = "https://sehiyye.gov.az/nazirliyin-qurumlari/milli-onkologiya-merkezi/";
const MOH_LIST = "https://sehiyye.gov.az/nazirliyin-qurumlari/";
const NOC_HOME = "http://mom.gov.az/";
const NOC_ABOUT = "http://mom.gov.az/?smode=content&item=Milli_Onkologiya_Merkezi_haqqinda";
const NOC_REGISTRY = "http://mom.gov.az/?smode=content&item=AZERBAYCAN_RESPUBLIKASI_ONKO_REQSTRI&lang=az";
const DTSEA_ABOUT = "https://dtsea.gov.az/agentlik/haqqimizda";
const DTSEA_ITS = "https://dtsea.gov.az/fealiyyet/icbari-tibbi-sigorta";
const DTSEA_PACKAGE = "https://dtsea.gov.az/media/press-reliz/icbari-tibbi-sigorta-uzre-xidmetler-zerfine-arterial-hipertenziya-ile-bagli-derman-teminati-da-daxil-edilecek";
const DTSEA_BREAST = "https://dtsea.gov.az/media/press-reliz/15-oktyabr-sud-vezi-xercengine-qarsi-umumdunya-mubarize-gunudur";
const DTSEA_9M = "https://dtsea.gov.az/media/press-reliz/9-ayda-icbari-tibbi-sigorta-ile-pasiyentlere-75-milyon-tibbi-xidmet-gosterilib";
const AEM_ABOUT = "https://pharma.az/haqqimizda/about/haqqimizda/";
const AEM_REG = "https://pharma.az/dv-qeydiyyati/dv-qeydiyyat-ekspertiza-shobesi/d-rman-vasit-l-rinin-qeydiyyat-ekspertiza-sob-si-2/";
const AEM_TIMES = "https://pharma.az/dv-qeydiyyati/derman-vasitelerinin-ekspertizasinin-aparilmasi/d-rman-vasit-l-rinin-ekspertizasinin-aparilmasi/";
const AEM_LAW = "https://pharma.az/dv-qeydiyyati/qanunvericilik-dv-qeydiyyati/qanunvericilik-5/";
const STAT_HEALTH = "https://www.stat.gov.az/source/healthcare/?lang=en";
const STAT_CANCER = "https://www.stat.gov.az/source/healthcare/en/001_2_7en.xls";
const STAT_CANCER_AGE = "https://www.stat.gov.az/source/healthcare/en/001_2_8en.xls";
const STAT_DEATHS = "https://www.stat.gov.az/source/healthcare/en/001_3en.xls";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";

const institutions: InstitutionInput[] = [
  i({ id: "azerbaijan-ministry-of-health", name: "Ministry of Health of the Republic of Azerbaijan", aka: ["Səhiyyə Nazirliyi", "Azerbaijan Ministry of Health", "MoH Azerbaijan"],
    city: "Baku", country: "AZ", lat: 40.38, lng: 49.85, institutionType: "government", website: "https://sehiyye.gov.az",
    tldr: "Azerbaijan's health ministry. The National Oncology Centre in Baku is one of its institutions, the medicines registration centre works under it, and its research institutes are among the places where compulsory health insurance pays for care.",
    summary: "The Ministry of Health lists the National Oncology Centre among its institutions and describes it as the main centre coordinating research, methods and prevention work in specialised cancer care for the population: information on the diagnosis and treatment of people with cancer comes to it from the Professor A.T. Abbasov Baku Oncology Dispensary, seven interregional oncology dispensaries (Nakhchivan, Khankendi, Sumgayit, Shaki, Mingachevir, Shirvan and Lankaran) and up to 100 oncology rooms. The coordinates on this record are an approximate Baku city point.\n\nThe Analytical Expertise Centre, which examines medicines for state registration, was created in 2007 on the Ministry's initiative and has worked as a public legal entity since 14 October 2019 under a decision of the Ministry's collegium. Compulsory health insurance, run by the State Medical Insurance and Expertise Agency under the Ministry of Labour and Social Protection, pays for care in public facilities under TABIB and in the Ministry of Health's research institutes.\n\nNational cancer counts are published by the State Statistical Committee: 15,144 newly diagnosed malignant neoplasms were registered in 2025 and 74,004 people with cancer were registered with medical institutions.",
    programs: ["National oncology service: Baku Oncology Dispensary, seven interregional oncology dispensaries and up to 100 oncology rooms", "State registration of medicines (with the Analytical Expertise Centre)"],
    institutions: ["national-oncology-centre-azerbaijan", "aem-azerbaijan", "dtsea-azerbaijan", "azstat", "who", "iaea"],
    cancers: ["breast-cancer", "gastric", "lung-cancer"], related: ["global-oncology-access"],
    links: [
      { label: "Ministry of Health: National Oncology Centre (institution page)", url: MOH_NOC },
      { label: "Ministry of Health: list of the Ministry's institutions", url: MOH_LIST },
      { label: "Analytical Expertise Centre: about the Centre", url: AEM_ABOUT },
      { label: "State Medical Insurance and Expertise Agency: compulsory health insurance", url: DTSEA_ITS },
    ] }),

  i({ id: "national-oncology-centre-azerbaijan", name: "National Oncology Centre, Azerbaijan", aka: ["Milli Onkologiya Mərkəzi", "National Center of Oncology (Baku)", "MOM", "Republican Oncology Scientific Centre"],
    city: "Baku", country: "AZ", lat: 40.386, lng: 49.808, institutionType: "cancer-center", website: NOC_HOME,
    tldr: "Azerbaijan's national cancer centre in Baku, run by the Ministry of Health. It treats adults and children with surgery, chemotherapy and radiotherapy, coordinates research, methods and prevention work across the country's oncology dispensaries, and collects the registration forms for newly diagnosed cancers.",
    summary: "The Centre traces its origin to the Azerbaijan Scientific Research Institute of Roentgenology and Radiology, ordered by a decision of 10 December 1940. It was renamed the Research Institute of Roentgenology, Radiology and Oncology in July 1963, became the Republican Oncology Scientific Centre in February 1988 and took its present name in October 1995. The Ministry of Health and IAEA DIRAC give its address as 79B H. Zardabi Street, Baku; the coordinates are those IAEA DIRAC records for it.\n\nThe Ministry of Health describes it as the main centre coordinating research, methods and prevention work in specialised cancer care, receiving information from the Baku Oncology Dispensary, seven interregional oncology dispensaries and up to 100 oncology rooms. A children's oncology clinic opened at the Centre on 7 March 2012, with paediatric surgery, chemotherapy, radiotherapy and intensive care departments; a treatment building with endoscopy, chemotherapy, day chemotherapy and onco-haematology departments opened in 2014, as did a molecular oncology laboratory. It runs a mobile diagnostic centre for examinations in remote areas, publishes the Azerbaijan Journal of Oncology and Haematology (since 1995) and trains oncologists and radiotherapists.\n\nIAEA DIRAC, read on 11 November 2026, lists 7 linear accelerators, 1 cobalt-60 unit and brachytherapy at the Centre (entry last updated 2023), out of 10 megavoltage units in the country. Its cancer registry page asks for the primary cancer diagnosis registration form (TQS No. 025/2-O), coded in ICD-O-3, to be sent to an oncology statistics email address.",
    programs: ["Children's oncology clinic (opened 7 March 2012)", "Radiotherapy and brachytherapy", "Molecular oncology laboratory (2014)", "Mobile diagnostic centre", "Primary cancer diagnosis registration (form TQS No. 025/2-O)", "Azerbaijan Journal of Oncology and Haematology"],
    institutions: ["azerbaijan-ministry-of-health", "iaea"],
    cancers: ["breast-cancer", "gastric", "lung-cancer", "childhood-cancers"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "National Oncology Centre: home page", url: NOC_HOME },
      { label: "National Oncology Centre: about the Centre (history)", url: NOC_ABOUT },
      { label: "National Oncology Centre: Azerbaijan cancer registry page", url: NOC_REGISTRY },
      { label: "Ministry of Health: National Oncology Centre", url: MOH_NOC },
      { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
    ] }),

  i({ id: "aem-azerbaijan", name: "Analytical Expertise Centre (AEM), Ministry of Health of Azerbaijan", aka: ["Analitik Ekspertiza Mərkəzi", "AEM", "Analytical Expertise Center of Medicines"],
    city: "Baku", country: "AZ", lat: 40.4, lng: 49.87, institutionType: "government", website: "https://pharma.az",
    tldr: "The Ministry of Health body that examines and registers medicines in Azerbaijan and keeps the state register. Cancer medicines, and medicines approved through the European centralised procedure, have shorter review times.",
    summary: "The Analytical Expertise Centre was created in 2007 on the initiative of the Ministry of Health to strengthen state control of the quality, efficacy and safety of medicines, and has operated as a public legal entity since 14 October 2019. It describes itself as an observer of the European and US pharmacopoeias and as working with WHO, the Global Fund and the Uppsala Monitoring Centre. Its state registration department registers and re-registers medicines, registers changes to dossiers, cancels registrations and keeps the state register. The coordinates are an approximate Baku city point.\n\nThe legal basis it cites is the Law on Medicines of 22 December 2006 (No. 208-IIIQ) and Cabinet of Ministers decision No. 345 of 18 July 2024 on the rules for state registration of medicines, medicinal substances and medical devices. Its page on review stages sets the initial review of a registration dossier at 15 working days and the specialised review at no more than 210 calendar days. For medicines authorised through the European Medicines Agency's centralised procedure the steps are 5 and 10 working days. For medicines on WHO's list of recommended products and those used to treat tuberculosis, HIV, infectious hepatitis, rare diseases and cancers they are 10 and 45 working days.\n\nAzerbaijan's regulator does not appear on WHO's list of national regulatory authorities at maturity level 3 or 4 (August 2026).",
    programs: ["Expert review for state registration of medicines", "Shortened review for cancer, rare disease and EU centrally authorised medicines", "Pharmacovigilance"],
    institutions: ["azerbaijan-ministry-of-health"],
    links: [
      { label: "AEM: about the Centre", url: AEM_ABOUT },
      { label: "AEM: medicines registration and expertise department", url: AEM_REG },
      { label: "AEM: stages and times of the expert review of medicines", url: AEM_TIMES },
      { label: "AEM: registration legislation", url: AEM_LAW },
    ] }),

  i({ id: "dtsea-azerbaijan", name: "State Medical Insurance and Expertise Agency, Azerbaijan", aka: ["Dövlət Tibbi Sığorta və Ekspertiza Agentliyi", "State Agency on Mandatory Health Insurance", "İcbari Tibbi Sığorta üzrə Dövlət Agentliyi", "ITS"],
    city: "Baku", country: "AZ", lat: 40.41, lng: 49.86, institutionType: "government", website: "https://dtsea.gov.az",
    tldr: "Azerbaijan's compulsory health insurance agency, under the Ministry of Labour and Social Protection. It buys care for citizens from a package of more than 3,300 services, which pays for breast cancer diagnosis, including mammography and biopsy.",
    summary: "The agency runs compulsory health insurance, pools its money in the compulsory health insurance fund and buys medical services centrally on the state's behalf. It also assesses disability and carries out the final medical examination of conscripts. Its about page says it is the legal successor of the State Agency on Mandatory Health Insurance and of the State Medical and Social Expertise and Rehabilitation Agency of the Ministry of Labour and Social Protection. The coordinates are an approximate Baku city point.\n\nCitizens are covered on their identity card, as are refugees under UNHCR protection and foreign residents who pay the premium. Care is given in public facilities under TABIB and in the Ministry of Health's research institutes, and by contracted private clinics on referral when a public facility cannot provide it. Outpatient MRI and CT carry a co-payment of 20% of the tariff. In October 2026 the agency said the package had grown from 1,829 services at the start to 3,318, that the yearly limit on bone marrow transplants had been raised from 20 to 50, and that medicines for high blood pressure are planned for 2027. From January to September 2026 it reported 75 million services to more than 4.8 million people.\n\nFor breast disease the package pays for mammography, ultrasound, MRI, ductography, biopsy with histology and tumour markers on a doctor's referral. The agency said 12,100 people had a disability linked to breast cancer.",
    programs: ["Compulsory health insurance (Xidmətlər Zərfi, the services package)", "Disability assessment", "Outpatient medicines positive list and e-prescription (in preparation)"],
    institutions: ["azerbaijan-ministry-of-health"],
    cancers: ["breast-cancer"],
    links: [
      { label: "State Medical Insurance and Expertise Agency: about the agency", url: DTSEA_ABOUT },
      { label: "Agency: compulsory health insurance, who is covered and where", url: DTSEA_ITS },
      { label: "Agency: services package to include medicines for high blood pressure (22 October 2026)", url: DTSEA_PACKAGE },
      { label: "Agency: 15 October, World Breast Cancer Day (15 October 2026)", url: DTSEA_BREAST },
      { label: "Agency: 75 million services in nine months (19 October 2026)", url: DTSEA_9M },
    ] }),

  i({ id: "azstat", name: "State Statistical Committee of the Republic of Azerbaijan", aka: ["Dövlət Statistika Komitəsi", "Azstat", "SSC Azerbaijan"],
    city: "Baku", country: "AZ", lat: 40.38, lng: 49.84, institutionType: "government", website: "https://www.stat.gov.az",
    tldr: "Azerbaijan's national statistics office. Its yearly health tables give the number of newly diagnosed cancers registered by medical institutions, by site, sex and age, and the number of deaths from neoplasms.",
    summary: "The State Statistical Committee publishes health statistics as spreadsheet tables. Table 1.2.7 gives the number of newly diagnosed malignant neoplasms registered in 2000 and each year from 2005, by site, and the number of people with cancer registered with medical institutions; table 1.2.8 splits new cases by sex and age group; table 1.3 gives deaths by cause, including neoplasms. The coordinates are an approximate Baku city point.\n\nIn 2025 the tables record 15,144 newly diagnosed cancers (6,787 in men and 8,357 in women; 147.8 per 100,000 population), up from 4,804 in 2000, and 74,004 people with cancer registered with medical institutions. Among the sites the table lists, breast cancer led with 2,928 new cases in 2025, then cancers of the trachea, bronchus and lung (1,480) and of the stomach (1,392). Deaths from neoplasms numbered 10,102 in 2025, 98.6 per 100,000 population; this cause group includes benign neoplasms.",
    programs: ["Health statistics: morbidity of population with malignant neoplasms (tables 1.2.7 and 1.2.8)", "Deaths by causes (table 1.3)"],
    institutions: ["azerbaijan-ministry-of-health"],
    related: ["cancer-registries-surveillance"],
    links: [
      { label: "State Statistical Committee: health, social protection and sport (tables)", url: STAT_HEALTH },
      { label: "Table 1.2.7: morbidity with malignant neoplasms by localisation (Excel)", url: STAT_CANCER },
      { label: "Table 1.2.8: morbidity with malignant neoplasms by sex and age (Excel)", url: STAT_CANCER_AGE },
      { label: "Table 1.3: number of deaths by causes (Excel)", url: STAT_DEATHS },
    ] }),
];

export const recordsAZ: EntityInput[] = [...institutions];
