import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Bolivia: the public bodies and papers behind /countries/bo/ (wave 10) that the corpus did not hold. Each was written
 * from its own primary source, read raw in Spanish on 11 November 2026: Ley 1223 del Cáncer (2019), Ley 1152 (2019) and
 * Decretos Supremos 4881 (2023) and 4608 (2021) as reproduced by Lexivox (the Gaceta Oficial did not answer); the
 * Ministerio de Salud y Deportes' 2026 news pages; PAHO's October 2023 note on the national cancer registry; AGEMED's
 * pages, served through its content API, and its LINAME 2026 to 2027 spreadsheet; and the Agencia Boliviana de Energía
 * Nuclear's service page and press notes. DOIs were resolved through Europe PMC and the figures in `findings` are taken
 * from the indexed abstracts, or from the full text for the EULAT Eradicate GBC profile, which has no abstract.
 *
 * Inbound links: the Ministry links AGEMED, ABEN and the six papers; AGEMED and ABEN link the Ministry back. No
 * Bolivian institution was in the corpus before this page. Coordinates are approximate city points, not buildings.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const L1223 = "https://www.lexivox.org/norms/BO-L-N1223.html";
const L1152 = "https://www.lexivox.org/norms/BO-L-N1152.html";
const DS4881 = "https://www.lexivox.org/norms/BO-DS-N4881.html";
const DS4608 = "https://www.lexivox.org/norms/BO-DS-N4608.html";
const PAHO_RNC = "https://www.paho.org/es/noticias/6-10-2023-definen-conjunto-variables-registro-nacional-cancer-listado-medicamentos-que";
const MSYD_ROSA = "https://www.minsalud.gob.bo/9584-consultorios-rosas-para-promover-deteccion-oportuna-de-cancer-de-mama";
const LINAME_XLSX = "https://www.agemed.gob.bo/archivo_uso_racional/liname/LINAME_2026_2027_07-04-26.xlsx";
const AGEMED_EC_NORM = "https://www.agemed.gob.bo/archivos_agemed/ensayosclinicos/001-2021.pdf";
const ABEN_RED = "https://www.aben.gob.bo/servicio/red-de-centros-de-medicina-nuclear-y-radioterapia/";
const ABEN_106K = "https://www.aben.gob.bo/index.php/nota_prensa/aben-supera-las-106-mil-atenciones-oncologicas-con-tecnologia-nuclear/";
const ABEN_4Y = "https://www.aben.gob.bo/index.php/nota_prensa/cuatro-anos-de-servicio-de-la-salud-de-los-bolivianos/";
const ABEN_LP = "https://www.aben.gob.bo/index.php/nota_prensa/cmnyr-la-paz-celebra-2-anos-con-la-primera-residencia-medica-en-radioncologia-del-pais/";

const institutions: InstitutionInput[] = [
  i({ id: "bolivia-ministry-of-health", name: "Ministerio de Salud y Deportes, Bolivia", aka: ["Ministry of Health and Sports of Bolivia", "Ministry of Health Bolivia", "MSyD Bolivia", "Programa Nacional de Lucha Contra el Cáncer"],
    city: "La Paz", country: "BO", lat: -16.505, lng: -68.13, institutionType: "government", website: "https://www.minsalud.gob.bo",
    tldr: "Bolivia's health ministry. Through its Programa Nacional de Lucha Contra el Cáncer it applies the 2019 cancer law, keeps the national cancer registry and runs the free Sistema Único de Salud for people without social insurance.",
    summary: "Ley 1223 del Cáncer of 5 September 2019 makes the Ministry of Health the authority that applies the law through its Programa Nacional de Lucha Contra el Cáncer, from surveillance and prevention to treatment and palliative care, and requires it to run the Registro Nacional de Cáncer, to which every public, social insurance and private facility must report. Decreto Supremo 4881 of 22 February 2023 regulates the law: it sets up a National Cancer Commission chaired by the minister, with the programme as its technical secretariat, and asks the programme to write the registry's manuals. The coordinates are an approximate La Paz city point.\n\nThe Ministry also runs the Sistema Único de Salud (SUS), created by Ley 1152 of 20 February 2019, which gives Bolivians not covered by social security free care in public facilities, reached by referral from a first-level health centre; the cancer law adds cancer care to the SUS progressively. In October 2026 the Ministry reported more than 103,500 new cancers and more than 31,500 cancer deaths in the national registry for 2016 to 2025, and launched Consultorios Rosa with Roche Bolivia for earlier breast cancer diagnosis among women aged 40 to 60 in the SUS.\n\nIts essential medicines list for 2026 to 2027, kept by AGEMED, includes 41 antineoplastic medicines and 10 hormone treatments for cancer. Cervical screening reached about 14% of women aged 20 to 69 in 2022, according to a nationwide study.",
    programs: ["Programa Nacional de Lucha Contra el Cáncer", "Registro Nacional de Cáncer", "Sistema Único de Salud (SUS, Ley 1152 of 2019)", "Comisión Nacional del Cáncer (Decreto Supremo 4881 of 2023)", "Consultorios Rosa for breast cancer diagnosis (2026)", "Telesalud screening brigades and childhood cancer campaign"],
    institutions: ["agemed-bolivia", "aben-bolivia", "who", "iarc"],
    cancers: ["cervical", "breast-cancer", "gallbladder", "prostate"], related: ["global-oncology-access", "cancer-registries-surveillance"],
    keyPapers: ["paper-huanca-challgua-cervical-screening-coverage-bolivia-rpsp-2025", "paper-rios-dalenz-cancer-la-paz-ijc-1981", "paper-scherer-eulat-eradicate-gbc-ije-2025", "paper-allende-hpv-self-sampling-bolivia-bmcid-2020", "paper-carozzi-hpv-self-sampling-bolivia-plosone-2024", "paper-frank-palliative-care-bolivia-pmr-2026"],
    links: [
      { label: "Ley 1223 del Cáncer, 5 September 2019 (Lexivox, Spanish)", url: L1223 },
      { label: "Decreto Supremo 4881, 22 February 2023 (Lexivox, Spanish)", url: DS4881 },
      { label: "Ley 1152, the Sistema Único de Salud (Lexivox, Spanish)", url: L1152 },
      { label: "PAHO: variables of the national cancer registry agreed (6 October 2023, Spanish)", url: PAHO_RNC },
      { label: "Ministerio de Salud y Deportes: Consultorios Rosa (16 October 2026, Spanish)", url: MSYD_ROSA },
    ] }),

  i({ id: "agemed-bolivia", name: "Agencia Estatal de Medicamentos y Tecnologías en Salud (AGEMED)", aka: ["AGEMED", "Bolivian State Agency for Medicines and Health Technologies", "UNIMED Bolivia"],
    city: "La Paz", country: "BO", lat: -16.51, lng: -68.125, institutionType: "government", website: "https://www.agemed.gob.bo",
    tldr: "Bolivia's medicines regulator, created in 2016. It registers medicines, authorises clinical trials, runs the national pharmacovigilance centre and keeps the national essential medicines list that guides public purchasing.",
    summary: "AGEMED was created on 21 September 2016 by Decreto Supremo 2905 as a deconcentrated body of the Ministry of Health with administrative, financial, legal and technical independence. Its own history traces the function to a national chemical and pharmaceutical service founded in 1937, later the Dirección de Medicamentos y Tecnología en Salud (DINAMED) and, from 2006, the Unidad de Medicamentos y Tecnología en Salud (UNIMED). Its offices are in Sopocachi, La Paz; the coordinates are approximate.\n\nIts departments cover marketing authorisation, inspection and post-market control, health technology assessment and rational use, and the national pharmacovigilance centre, and its quality control laboratory, CONCAMYT, works to WHO good practices for pharmaceutical laboratories. It keeps the Lista Nacional de Medicamentos Esenciales (LINAME); the 2026 to 2027 list, approved by Ministerial Resolution 0121, includes 41 antineoplastic medicines under ATC group L01, among them trastuzumab, pertuzumab, rituximab, imatinib and dasatinib, and 10 hormone treatments under L02.\n\nThe clinical trial norm it publishes gives the authority 60 calendar days to decide on an application. Its list of registered trials holds studies of Chagas disease, leishmaniasis and COVID-19 and none of cancer. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Bolivia.",
    programs: ["Marketing authorisation (registro sanitario)", "Lista Nacional de Medicamentos Esenciales (LINAME)", "Clinical trial authorisation", "Centro Nacional de Farmacovigilancia", "CONCAMYT quality control laboratory", "Health technology assessment and rational use"],
    institutions: ["bolivia-ministry-of-health"],
    links: [
      { label: "AGEMED: home page (Spanish)", url: "https://www.agemed.gob.bo/" },
      { label: "AGEMED: LINAME 2026 to 2027 (spreadsheet, Spanish)", url: LINAME_XLSX },
      { label: "AGEMED: Norma para Estudios Clínicos (PDF, Spanish)", url: AGEMED_EC_NORM },
      { label: "WHO: list of national regulatory authorities at maturity level 3 and 4", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
    ] }),

  i({ id: "aben-bolivia", name: "Agencia Boliviana de Energía Nuclear (ABEN)", aka: ["ABEN", "Bolivian Nuclear Energy Agency", "Red de Centros de Medicina Nuclear y Radioterapia", "Red CMNyR", "CMNyR El Alto", "CMNyR La Paz", "CMNyR Santa Cruz"],
    city: "El Alto", country: "BO", lat: -16.55, lng: -68.19, institutionType: "government", website: "https://www.aben.gob.bo",
    tldr: "Bolivia's state nuclear energy agency. It built and runs the country's three public centres for radiotherapy and nuclear medicine, in El Alto, La Paz and Santa Cruz, which treat SUS patients free of charge.",
    summary: "The Agencia Boliviana de Energía Nuclear is the state's operator for nuclear technology, under the hydrocarbons and energy ministry. Decreto Supremo 3257 of 19 July 2017 authorised treasury funds for it to build a network of nuclear medicine and radiotherapy centres in Santa Cruz, El Alto and La Paz, and Decreto Supremo 4608 of 3 November 2021 authorised it to run them on an exceptional and temporary basis. Under Ley 1393 of 2021, as quoted in that decree, the Ministry of Health provides the network's services free to people covered by the Sistema Único de Salud, under agreement. The coordinates are an approximate point in El Alto, where the first centre opened.\n\nThe El Alto centre began operating on 6 March 2022 and had recorded 37,920 specialist attendances by March 2026; ABEN says its physicists, technologists, doctors and nurses are Bolivians trained abroad on state scholarships. The La Paz centre, two years old in November 2025, has two linear accelerators, high dose rate brachytherapy, a CT simulator, PET/CT and SPECT/CT, and began what ABEN calls the country's first medical residency in radiation oncology. The network offers clinical oncology, nuclear medicine, radiotherapy, brachytherapy, chemotherapy, pain therapy, nutrition and psychology, and had recorded 106,054 oncology attendances by 4 February 2026. Patients of social insurance funds are treated under agreements.",
    programs: ["Red de Centros de Medicina Nuclear y Radioterapia (El Alto, La Paz, Santa Cruz)", "First radiation oncology residency in Bolivia (La Paz, 2025)", "Cyclotron and radiopharmacy complex", "Centro Multipropósito de Irradiación (CMI)"],
    institutions: ["bolivia-ministry-of-health", "iaea"],
    links: [
      { label: "ABEN: Red de Centros de Medicina Nuclear y Radioterapia (Spanish)", url: ABEN_RED },
      { label: "Decreto Supremo 4608, 3 November 2021 (Lexivox, Spanish)", url: DS4608 },
      { label: "ABEN: four years of the El Alto centre (6 March 2026, Spanish)", url: ABEN_4Y },
      { label: "ABEN: La Paz centre and the first radiation oncology residency (28 November 2025, Spanish)", url: ABEN_LP },
      { label: "ABEN: 106,054 oncology attendances (4 February 2026, Spanish)", url: ABEN_106K },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-huanca-challgua-cervical-screening-coverage-bolivia-rpsp-2025", name: "Geographical inequities in cervical cancer screening coverage in Bolivia",
    journal: "Revista Panamericana de Salud Pública", year: 2025, doi: "10.26633/RPSP.2025.44", pmid: "40433197", authors: "Huanca Challgua C, Linander I, Goicolea I, et al.", paperType: "observational",
    tldr: "About 14% of Bolivian women aged 20 to 69 were screened for cervical cancer in 2022, with coverage ranging from 59% in some municipalities to under 1% in others.",
    summary: "A spatial, nationwide ecological study. The authors calculated directly standardised cervical screening coverage rates for Bolivia's departments and municipalities, tested for spatial clustering with the global Moran's I, and used the Getis-Ord Gi* statistic to find clusters of municipalities with high or low coverage.",
    findings: [
      "Around 14% of women aged 20 to 69 were screened in Bolivia in 2022.",
      "Coverage between municipalities ranged from 59% to below 1%.",
      "Clusters of higher coverage were found in Pando, Chuquisaca and Tarija, and of lower coverage in Beni and Santa Cruz.",
    ],
    whatItMeans: "Bolivia is far from WHO's target of 70% screening coverage, and the gaps are geographical, which shows where the screening programme most needs strengthening.",
    caveats: ["Ecological data from service records, not individual women's screening histories."],
    cancers: ["cervical"],
    links: [doi("10.26633/RPSP.2025.44", "Rev Panam Salud Publica 2025"), pubmed("40433197")] }),

  p({ id: "paper-rios-dalenz-cancer-la-paz-ijc-1981", name: "Cancer incidence from a population-based registry in La Paz, Bolivia",
    journal: "International Journal of Cancer", year: 1981, doi: "10.1002/ijc.2910280309", pmid: "7319674", authors: "Ríos-Dalenz J, Correa P, Haenszel W", paperType: "observational",
    tldr: "An early population-based cancer registry in La Paz found high rates in women of cancers of the cervix, gallbladder and thyroid, and unusually high rates of testicular cancer in men.",
    summary: "Published as \"Morbidity from cancer in La Paz, Bolivia\". The paper presents data from a population-based cancer registry in La Paz, a city at about 4,000 metres strongly shaped by Aymara migration from the altiplano.",
    findings: [
      "Incidence in women was high for cancers of the cervix, gallbladder and thyroid.",
      "Men had unusually high rates of testicular cancer; stomach cancer rates were lower than in other Andean populations.",
      "Smoking-related and sex-hormone-related cancers were below average, and cancer of the nasal mucosa and paranasal sinuses was unusually frequent.",
    ],
    whatItMeans: "The first population-based picture of cancer in Bolivia, already showing the high cervical and gallbladder cancer rates that IARC's estimates show today; OnCo found no current population-based registry in the country.",
    caveats: ["One city; the abstract gives no rates or years of registration."],
    cancers: ["cervical", "gallbladder"],
    links: [doi("10.1002/ijc.2910280309", "Int J Cancer 1981"), pubmed("7319674")] }),

  p({ id: "paper-scherer-eulat-eradicate-gbc-ije-2025", name: "EULAT Eradicate GBC: a European and Latin American consortium to prevent gallbladder cancer",
    journal: "International Journal of Epidemiology", year: 2025, doi: "10.1093/ije/dyaf127", pmid: "40735836", authors: "Scherer D, Barahona Ponce C, Mengoa C, et al.", paperType: "methods", participants: 11453,
    tldr: "A data resource profile of a case-control study and biobank of 11,453 people with gallstones or gallbladder cancer in Argentina, Bolivia, Chile and Peru, 1,570 of them in Bolivia, built to find markers that predict who will develop the cancer.",
    summary: "Published as \"Data Resource Profile: EULAT Eradicate GBC: the European-Latin American Research Consortium towards Eradication of Preventable Gallbladder Cancer\". Funded by the EU's Horizon 2020 programme, the consortium recruits people with gallstone disease before cholecystectomy, and people with gallbladder cancer, in four South American countries, and links them to large European cohorts. Samples of blood, saliva, urine, bile and stool are processed in more than 17 Chilean, 9 Peruvian, 4 Bolivian and 3 Argentinean centres. The paper has no abstract; the figures here are from its full text.",
    findings: [
      "By March 2025, 11,453 Latin American participants were enrolled: 68% in Chile, 16% in Peru, 14% in Bolivia (1,570) and 2% in Argentina.",
      "74% of participants are women and the median age is 48; 1,033 have gallbladder cancer, 391 dysplasia and 10,029 gallstone disease.",
      "Quechua is the most represented Indigenous ancestry (13%), followed by Mapuche (11%) and Aymara (5%).",
    ],
    whatItMeans: "A resource for finding who among the many people with gallstones in the Andes should have their gallbladder removed before cancer develops; Bolivia, with GLOBOCAN's highest estimated gallbladder cancer rate, contributes about one participant in seven.",
    caveats: ["A description of a study resource, not results.", "Most participants have gallstones rather than cancer, by design."],
    cancers: ["gallbladder"],
    links: [doi("10.1093/ije/dyaf127", "Int J Epidemiol 2025"), pubmed("40735836"), { label: "ClinicalTrials.gov: NCT06192719", url: "https://clinicaltrials.gov/study/NCT06192719" }] }),

  p({ id: "paper-allende-hpv-self-sampling-bolivia-bmcid-2020", name: "HPV self-sampling compared with cytology and visual inspection for cervical screening in Bolivia",
    journal: "BMC Infectious Diseases", year: 2020, doi: "10.1186/s12879-020-04963-2", pmid: "32245369", authors: "Allende G, Surriabre P, Ovando N, et al.", paperType: "observational", participants: 469,
    tldr: "In Bolivian women, visual inspection with acetic acid and HPV testing of self-collected samples found high-grade cervical lesions far more often than the Pap smear, which detected 44% of them.",
    summary: "Published as \"Evaluation of the effectiveness of high-risk human papilloma self-sampling test for cervical cancer screening in Bolivia\". 362 women had three screening tests in turn: self-collected samples for high-risk HPV, conventional cytology and visual inspection with acetic acid (VIA); 107 women referred after a positive HPV test had cytology and VIA. High-grade lesions or cancer were confirmed by colposcopy and biopsy.",
    findings: [
      "In the screening group, sensitivity for high-grade lesions (CIN2+) or cancer was 100% for VIA, 76% for HPV self-sampling and 44% for cytology.",
      "In the referred group, sensitivity was 100% for VIA and 81% for cytology.",
      "The authors judged VIA plus HPV self-sampling the best combination.",
    ],
    whatItMeans: "Evidence for moving Bolivian screening beyond the Pap smear, toward HPV self-sampling and visual inspection that can be done close to home.",
    caveats: ["A few hundred women in one setting, Cochabamba.", "Sensitivity figures from a small sample carry wide uncertainty."],
    cancers: ["cervical"],
    links: [doi("10.1186/s12879-020-04963-2", "BMC Infect Dis 2020"), pubmed("32245369")] }),

  p({ id: "paper-carozzi-hpv-self-sampling-bolivia-plosone-2024", name: "Feasibility of HPV self-sampling and on-site testing in rural and urban Bolivia",
    journal: "PLoS One", year: 2024, doi: "10.1371/journal.pone.0292605", pmid: "38451956", authors: "Carozzi FM, Royder Yanez R, Paganini I, et al.", paperType: "observational", participants: 2168,
    tldr: "In 2,168 women in La Paz, Toro Toro and Acasio, 12.5% of self-collected samples were positive for high-risk HPV, a rate similar to Europe and the USA, and self-sampling with testing done locally was feasible.",
    summary: "Published as \"Cervical cancer prevention: Feasibility of self-sampling and HPV testing in rural and urban areas of Bolivia: An observational study\". A pilot by the Italian Agency for Development Cooperation enrolled women aged 20 to 65 in public health centres in one urban and two rural areas between December 2019 and June 2021, using self-sampling brushes and a portable PCR system that gives results in about an hour.",
    findings: [
      "2,043 of 2,168 samples (94.2%) were adequate; 255 (12.5%) were positive for high-risk HPV.",
      "HPV was more common in the city of La Paz than in the rural areas combined (15.0% against 11.4%).",
      "HPV 16 was found in 2.7% of samples and HPV 18/45 in 1.8%.",
    ],
    whatItMeans: "The authors conclude that Bolivia's high rate of cervical cancer is not explained by more HPV infection than elsewhere, and that testing on site, with results in about an hour, avoids the very long waits for screening results in Bolivia.",
    caveats: ["Three sites; a feasibility study, not a trial of outcomes."],
    cancers: ["cervical"],
    links: [doi("10.1371/journal.pone.0292605", "PLoS One 2024"), pubmed("38451956")] }),

  p({ id: "paper-frank-palliative-care-bolivia-pmr-2026", name: "Palliative care in Bolivia: a scoping review and needs assessment",
    journal: "Palliative Medicine Reports", year: 2026, doi: "10.1177/26892820261428648", pmid: "42558997", authors: "Frank HR, Smith C, Antelo G, Conklin JL, Tilly AE", paperType: "review",
    tldr: "A review of 34 studies found palliative care in Bolivia expanding since 2008, with barriers in access to opioids, where care is located, training and policy.",
    summary: "Published as \"Palliative Care in Bolivia: A Scoping Review and Needs Assessment\". Following PRISMA guidance, the authors searched six databases to September 2023 and grouped findings under WHO's pillars of public health strategy: policy, medicine availability, education, implementation and research.",
    findings: [
      "Of 645 records, 34 studies met inclusion criteria; most were descriptive or narrative.",
      "Policy and implementation were the pillars most often addressed, and research the least.",
      "Barriers included opioid availability and access, the geographic distribution of care, standardised training and policy development.",
    ],
    whatItMeans: "Palliative care has grown in Bolivia over two decades, and the review finds gaps across every WHO pillar, including access to opioids and the places care is offered.",
    caveats: ["Built on a small and mostly descriptive literature."],
    links: [doi("10.1177/26892820261428648", "Palliat Med Rep 2026"), pubmed("42558997")] }),
];

/** Records behind /countries/bo/ (wave 10). */
export const recordsBO: EntityInput[] = [...institutions, ...papers];
