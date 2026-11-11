import type { CompanyInput, EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Cuba: the public bodies, the state industry group and the papers behind /countries/cu/ (wave 7) that the corpus did
 * not hold. Each was written from its own primary source, read raw on 11 November 2026. Cuban government sites
 * (sld.cu, cecmed.cu, biocubafarma.cu) timed out to a plain request from outside Cuba, so their pages were read from
 * Internet Archive copies, and the link labels say so: the Ministry of Public Health's Anuario Estadístico de Salud
 * 2024 (edition 2025) and 2023 (edition 2024), PDF text; CECMED's home, about, registration, clinical evaluation and
 * reliance resolution pages; the Cuban Public Registry of Clinical Trials' home page; BioCubaFarma's "about us" page;
 * and INOR's "who we are" page. PAHO's 30 September 2020 news release on regional reference authorities and WHO's list
 * of primary registries were read directly. DOIs were resolved through Europe PMC and the figures in `findings` are
 * taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the regulator, the trials centre, INOR and BioCubaFarma; the papers
 * link INOR and CIMAB. INOR (centres-wave3.ts), CIMAB (companies-makers-wave4.ts) and nimotuzumab (gap-fill.ts) already
 * exist and are reused, not duplicated. Coordinates are approximate district points in Havana, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type C = Omit<CompanyInput, "kind" | "asOf">;
const c = (x: C): CompanyInput => ({ kind: "company", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const AES_2024 = "https://web.archive.org/web/2026/https://files.sld.cu/dne/files/2025/09/AES-2024-para-sitio-3.pdf";
const AES_2023 = "https://web.archive.org/web/2026/https://files.sld.cu/dne/files/2024/09/Anuario-Estad%c3%adstico-de-Salud-2023-EDICION-2024.pdf";
const INOR_ABOUT = "https://web.archive.org/web/2026/https://instituciones.sld.cu/inor/quienes-somos-2/";
const CECMED_ABOUT = "https://web.archive.org/web/2026/https://www.cecmed.cu/acerca-de";
const CECMED_RELIANCE = "https://web.archive.org/web/2026/https://www.cecmed.cu/noticias/aprueba-cecmed-resolucion-que-pone-vigor-practica-confianza-reguladora";
const CECMED_CT = "https://web.archive.org/web/2026/https://www.cecmed.cu/evaluacion-clinica";
const PAHO_NRAR = "https://www.paho.org/en/news/30-9-2020-regulatory-capacities-have-improved-over-past-decade-americas-continuing-efforts-are";
const PAHO_BIOTEC = "https://www.paho.org/sites/default/files/2026/10/plegable-biotec-opscorreccion-17-08v-digital.pdf";
const RPCEC = "https://web.archive.org/web/2026/https://rpcec.sld.cu/en/home";
const WHO_PRIMARY = "https://www.who.int/tools/clinical-trials-registry-platform/network/primary-registries";
const BCF_ABOUT = "https://web.archive.org/web/2025/https://www.biocubafarma.cu/es/nosotros";
const GUERRILLERO_2023 = "https://web.archive.org/web/2025/https://guerrillero.cu/sigue-siendo-compleja-la-disponibilidad-de-medicamentos";

const institutions: InstitutionInput[] = [
  i({ id: "cuba-minsap", name: "Ministry of Public Health, Cuba (MINSAP)", aka: ["MINSAP", "Ministerio de Salud Pública de Cuba", "Cuban Ministry of Public Health"],
    city: "Havana", country: "CU", lat: 23.12, lng: -82.38, institutionType: "government",
    tldr: "Cuba's health ministry. It runs the national health system that the 2019 Constitution makes free of charge, publishes the yearly health statistics yearbook with the National Cancer Registry's figures, and runs the cervical screening programme.",
    summary: "The Ministerio de Salud Pública runs Cuba's Sistema Nacional de Salud. Article 72 of the 2019 Constitution says public health is a right of all people and that the State guarantees access to medical attention, protection and recovery services free of charge. The coordinates on this record are an approximate Havana city point.\n\nIts Dirección de Registros Médicos y Estadísticas de Salud publishes the Anuario Estadístico de Salud. The 2024 yearbook (edition 2025) counts 390,279 health workers, 76.1 doctors per 10,000 people, 149 hospitals, 451 polyclinics and 12 research institutes. It records 25,861 deaths from malignant tumours in 2024, the second cause of death after heart disease, and prints the National Cancer Registry's preliminary incidence for 2022: 19,567 new cancers in men and 17,812 in women. Its cervical screening programme, reported in the yearbook since 1970, counted 218,286 women with an up-to-date smear test in 2024, against 826,663 in 2019.\n\nIn July 2023 the Ministry's director of medicines told the National Assembly that, with imports added to national production, 44% of the basic medicines list was missing, and 74% was missing or held for fewer than 30 days. In October 2025, with Gavi and PAHO support, the Ministry added a bivalent HPV vaccine to the national immunisation programme for girls aged nine.",
    programs: ["Sistema Nacional de Salud (free of charge under article 72 of the Constitution)", "Anuario Estadístico de Salud (yearly)", "Programa de detección precoz del cáncer cérvico-uterino", "Programa Nacional de Inmunización (HPV vaccine from October 2025)", "Cuadro básico de medicamentos (basic medicines list)"],
    institutions: ["cuba-national-cancer-registry", "cecmed", "cencec-cuba", "inor-cuba"], companies: ["biocubafarma"],
    cancers: ["cervical", "prostate", "nsclc"], related: ["global-oncology-access"],
    links: [
      { label: "Anuario Estadístico de Salud 2024, edition 2025 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
      { label: "Constitution of Cuba 2019, article 72 (Constitute Project, English translation)", url: "https://www.constituteproject.org/constitution/Cuba_2019" },
      { label: "Granma, republished by Guerrillero: medicine supply report to the National Assembly (28 July 2023; read through the Internet Archive)", url: GUERRILLERO_2023 },
      { label: "PAHO: HPV vaccination begins in Cuba (29 October 2025, Spanish)", url: "https://www.paho.org/es/noticias/29-10-2025-inicia-cuba-vacunacion-contra-virus-papiloma-humano" },
    ] }),

  i({ id: "cuba-national-cancer-registry", name: "National Cancer Registry of Cuba (Registro Nacional del Cáncer)", aka: ["Registro Nacional del Cáncer", "Registro Nacional de Cáncer de Cuba", "RNC Cuba"],
    city: "Havana", country: "CU", lat: 23.137, lng: -82.392, institutionType: "government",
    tldr: "Cuba's national population-based cancer registry, established in 1964. Its preliminary counts appear in the Ministry of Public Health's yearbook about two years after diagnosis: 37,379 new cancers in 2022, skin cancers included.",
    summary: "A chapter of IARC Scientific Publication 162 by Garrote and colleagues (2011) describes the registry as a national population-based registry established in 1964, with registration done entirely by passive methods; in its 1994 to 1995 survival data, death certificate only cases made up between 8% and 50% of cases depending on the site. The Instituto Nacional de Oncología y Radiobiología (INOR) describes itself as carrying the cancer control programmes and the National Cancer Registry; the Ministry's yearbook credits the registry and the Dirección de Registros Médicos y Estadísticas de Salud. The coordinates are those of INOR in Vedado, approximately.\n\nThe 2024 yearbook prints the registry's last report, for 2022, marked preliminary: 19,567 new cancers in men (age-standardised to the world population, 190.4 per 100,000) and 17,812 in women (168.2). Prostate (3,846), skin (3,240) and lung (2,936) led in men, and breast (3,689), skin (2,593) and lung (1,986) in women; 234 cancers were registered in people under 20. The 2023 yearbook gave 20,835 cancers in men and 18,827 in women for 2020. The registry counts basal and squamous skin cancers in its totals. IARC's GLOBOCAN 2024 fact sheet lists no country-specific incidence data for Cuba and estimates incidence from national mortality instead.",
    programs: ["Population-based national cancer registration (from 1964)", "Cancer incidence tables in the Anuario Estadístico de Salud", "Cancer mortality tables 2021 to 2022"],
    institutions: ["cuba-minsap", "inor-cuba", "iarc"], cancers: ["prostate", "breast-cancer", "nsclc", "cervical"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-romero-cancer-control-cuba-medicc-2009"],
    links: [
      { label: "Anuario Estadístico de Salud 2024, tables 80 to 84 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
      { label: "Anuario Estadístico de Salud 2023, tables 77 and 78 (MINSAP, PDF; read through the Internet Archive)", url: AES_2023 },
      { label: "Garrote et al., cancer survival in Cuba 1994 to 1995 (IARC Sci Publ 2011, PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/21675409/" },
      { label: "INOR: who we are (Spanish; read through the Internet Archive)", url: INOR_ABOUT },
    ] }),

  i({ id: "cecmed", name: "Center for State Control of Medicines, Equipment and Medical Devices (CECMED)", aka: ["CECMED", "Centro para el Control Estatal de Medicamentos, Equipos y Dispositivos Médicos", "Centro para el Control Estatal de la Calidad de los Medicamentos"],
    city: "Havana", country: "CU", lat: 23.115, lng: -82.44, institutionType: "government", website: "https://www.cecmed.cu",
    tldr: "Cuba's medicines and medical devices regulator. It registers medicines, authorises every clinical trial, and was one of eight authorities PAHO listed in 2020 as national regulatory authorities of regional reference; since 2023 it can rely on other regulators' decisions.",
    summary: "CECMED describes itself as the regulatory authority for medicines, equipment and medical devices of the Republic of Cuba, with functions covering access to laboratories, registration of medicines, diagnostics and devices, clinical trials, post-marketing surveillance, good practice inspections, lot release and licensing of establishments. Its offices are at Calle 5ta A No. 6020, Miramar, Playa, Havana; the coordinates are an approximate district point.\n\nPAHO's news release of 30 September 2020 lists CECMED among the eight national regulatory authorities of regional reference in the Americas, with ANMAT, ANVISA, COFEPRIS, Health Canada, Chile's ISP, INVIMA and the US FDA. By Resolution 78 of 2023 CECMED put regulatory reliance into force: it may take into account decisions of the regional reference authorities certified by PAHO, WHO-listed authorities and authorities with bilateral agreements, and applies expedited procedures to WHO-prequalified vaccines and medical products.\n\nCECMED evaluates and authorises the start of each clinical trial and requires evidence of registration in the Cuban Public Registry of Clinical Trials before it issues an authorisation; its regulations include requirements for phase I and II trials of investigational products for cancer and AIDS. A project funded by the European Union and implemented with PAHO, with the contract signed in April 2025, is strengthening its laboratory and digital capacity.",
    programs: ["Registro Sanitario (marketing authorisation of medicines)", "Clinical trial authorisation", "Regulatory reliance (Resolution 78 of 2023)", "Lot release", "Pharmacovigilance"],
    institutions: ["cuba-minsap", "cencec-cuba"],
    links: [
      { label: "CECMED: about (Spanish; read through the Internet Archive)", url: CECMED_ABOUT },
      { label: "CECMED: Resolution 78 of 2023 on regulatory reliance (11 October 2023; read through the Internet Archive)", url: CECMED_RELIANCE },
      { label: "CECMED: clinical evaluation (Spanish; read through the Internet Archive)", url: CECMED_CT },
      { label: "PAHO: regulatory capacities have improved over the past decade in the Americas (30 September 2020)", url: PAHO_NRAR },
      { label: "PAHO: strengthening the capacities of Cuba's national regulatory authority (leaflet, Spanish, PDF)", url: PAHO_BIOTEC },
    ] }),

  i({ id: "cencec-cuba", name: "National Coordinating Centre of Clinical Trials, Cuba (CENCEC)", aka: ["CENCEC", "Centro Nacional Coordinador de Ensayos Clínicos", "RPCEC", "Registro Público Cubano de Ensayos Clínicos", "Cuban Public Registry of Clinical Trials"],
    city: "Havana", country: "CU", lat: 23.115, lng: -82.441, institutionType: "government", website: "https://rpcec.sld.cu",
    tldr: "The Ministry of Public Health centre that coordinates clinical trials in Cuba and runs the Cuban Public Registry of Clinical Trials, set up in 2007 and listed by WHO as a primary registry.",
    summary: "The Cuban Public Registry of Clinical Trials (RPCEC) was established in 2007 under the leadership of the National Coordinating Centre of Clinical Trials (CENCEC) and has national coverage. Its home page states that a trial must obtain an RPCEC code before the first patient is recruited, as established by Resolution 435 of 2017 of the Ministry of Public Health, the clinical trials regulation, and that for trials authorised by CECMED the code must be sent to CECMED before it issues the authorisation certificate. Registered trials are not removed from public view, and sponsors submit their data in both Spanish and English. The registry shares a building with CECMED at Calle 5ta A, Miramar, Playa, Havana; the coordinates are approximate.\n\nWHO lists the RPCEC among the primary registries of its International Clinical Trials Registry Platform, so Cuban trials registered there are searchable through WHO's portal. Earlier trials, such as the randomised trial of nimotuzumab with radiotherapy in high-grade glioma published in 2013, cite the Cuban National Register for clinical trials.",
    programs: ["Registro Público Cubano de Ensayos Clínicos (from 2007)", "Coordination of clinical trials for the national health system"],
    institutions: ["cuba-minsap", "cecmed"],
    keyPapers: ["paper-solomon-nimotuzumab-high-grade-glioma-bmc-cancer-2013", "paper-rodriguez-cimavax-egf-phase3-nsclc-ccr-2016", "paper-alfonso-racotumomab-maintenance-nsclc-ccr-2014"],
    links: [
      { label: "RPCEC: welcome to the Cuban Registry of Clinical Trials (read through the Internet Archive)", url: RPCEC },
      { label: "WHO: primary registries in the WHO registry network", url: WHO_PRIMARY },
      { label: "CECMED: clinical evaluation (Spanish; read through the Internet Archive)", url: CECMED_CT },
    ] }),
];

const companies: CompanyInput[] = [
  c({ id: "biocubafarma", name: "BioCubaFarma", aka: ["Grupo de las Industrias Biotecnológica y Farmacéutica de Cuba", "BioCubaFarma Group"], hq: "Havana", country: "CU", companyType: "pharma", website: "https://www.biocubafarma.cu",
    tldr: "Cuba's state group of biotechnology and pharmaceutical enterprises. It makes most of the medicines on Cuba's basic list, including cancer monoclonal antibodies and therapeutic vaccines, and has told parliament that missing raw materials cause most shortages.",
    summary: "BioCubaFarma's own description (July 2025) is of a business organisation that produces medicines, equipment and high-technology services for human health, for export and for food production, with 47 enterprises, 164 production lines, 21 science and technology units and 16,490 workers, 265 of them with doctorates. Among its main products it lists prophylactic vaccines and biopharmaceuticals for cancer such as monoclonal antibodies and therapeutic vaccines; it also makes generic medicines and systems for early diagnosis and prevention of malignant tumours. Its head office is at Avenida Independencia No. 8126, Boyeros, Havana.\n\nAt the National Assembly in July 2023, as reported by Granma and republished by the Pinar del Río newspaper Guerrillero, its president Eduardo Martínez Díaz said the national industry supplies 61% of the medicines on the basic list, that 251 medicines (40% of the list) were missing, and that missing raw materials and materials caused 94% of shortages. He gave as causes a lack of timely financing, problems paying suppliers because banks refused to work with Cuba, usual suppliers stopping because of the US economic embargo, and global shortages of some materials. Of 14 oncology products, five were affected at the end of June 2023: cisplatin, carboplatin, vinblastine, paclitaxel and zoledronic acid.",
    drugs: ["cisplatin", "carboplatin", "paclitaxel", "vinblastine", "zoledronic-acid"], related: ["cimab", "cuba-minsap"],
    links: [
      { label: "BioCubaFarma: about us (Spanish; read through the Internet Archive)", url: BCF_ABOUT },
      { label: "Granma, republished by Guerrillero: medicine supply report to the National Assembly (28 July 2023; read through the Internet Archive)", url: GUERRILLERO_2023 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-rodriguez-cimavax-egf-phase3-nsclc-ccr-2016", name: "CIMAvax-EGF as switch maintenance in advanced non-small cell lung cancer: the Cuban phase III trial",
    journal: "Clinical Cancer Research", year: 2016, doi: "10.1158/1078-0432.CCR-15-0855", pmid: "26927662", authors: "Rodriguez PC, Popa X, Martínez O, et al.", paperType: "rct", participants: 405,
    tldr: "In 405 Cuban patients with advanced lung cancer, the EGF vaccine CIMAvax-EGF after chemotherapy gave a median survival of 10.8 months against 8.9 with supportive care; the difference was significant only by a weighted test and among patients who had at least four doses.",
    summary: "Published as \"A Phase III Clinical Trial of the Epidermal Growth Factor Vaccine CIMAvax-EGF as Switch Maintenance Therapy in Advanced Non-Small Cell Lung Cancer Patients\". CIMAvax-EGF is human recombinant epidermal growth factor joined to a carrier protein with the adjuvant Montanide ISA51, intended to make the body produce antibodies that block EGF from reaching its receptor. Four to six weeks after first-line chemotherapy, 405 patients with stage IIIB or IV non-small cell lung cancer were randomised to the vaccine or to best supportive care.",
    findings: [
      "Median survival in the safety population was 10.83 months with the vaccine and 8.86 months with supportive care (HR 0.82, P = 0.100 by the standard log rank test; P = 0.04 by a weighted log rank test).",
      "Among patients who received at least four doses, median survival was 12.43 against 9.43 months (HR 0.77, P = 0.036).",
      "Vaccinated patients with high baseline EGF concentration had a median survival of 14.66 months; adverse reactions were mostly grade 1 or 2 injection-site pain, fever, vomiting and headache.",
    ],
    whatItMeans: "The main evidence for Cuba's lung cancer vaccine: well tolerated, with a survival gain that depends on how the analysis is done and that was clearest in patients who completed the induction doses.",
    caveats: ["The standard primary comparison was not statistically significant.", "The per-protocol benefit excludes patients who stopped early, which can favour the vaccine arm.", "Control patients received supportive care only, not an active maintenance treatment."],
    institutions: ["inor-cuba"], companies: ["cimab"], cancers: ["nsclc"], targets: ["egfr"],
    links: [doi("10.1158/1078-0432.CCR-15-0855", "Clin Cancer Res 2016"), pubmed("26927662")] }),

  p({ id: "paper-alfonso-racotumomab-maintenance-nsclc-ccr-2014", name: "Racotumomab-alum vaccine as switch maintenance in advanced non-small cell lung cancer: a randomised placebo-controlled trial",
    journal: "Clinical Cancer Research", year: 2014, doi: "10.1158/1078-0432.CCR-13-1674", pmid: "24788102", authors: "Alfonso S, Valdés-Zayas A, Santiesteban ER, et al.", paperType: "rct", participants: 176,
    tldr: "In 176 patients with advanced lung cancer whose disease was controlled by chemotherapy, the Cuban anti-idiotype vaccine racotumomab lengthened median survival from 6.8 to 8.2 months compared with placebo.",
    summary: "Published as \"A randomized, multicenter, placebo-controlled clinical trial of racotumomab-alum vaccine as switch maintenance therapy in advanced non-small cell lung cancer patients\". Racotumomab-alum is an anti-idiotype vaccine targeting the NeuGcGM3 ganglioside found on tumour cells. Patients with stage IIIb or IV disease that was at least stable after first-line chemotherapy were randomised 1:1 to the vaccine or placebo, with overall survival as the primary endpoint.",
    findings: [
      "Median overall survival was 8.23 months with racotumomab-alum (87 patients) and 6.80 months with placebo (89 patients) (HR 0.63, 95% CI 0.46 to 0.87, P = 0.004).",
      "Median progression-free survival was 5.33 against 3.90 months (HR 0.73, 95% CI 0.53 to 0.99, P = 0.039).",
      "The commonest adverse events were burning and pain at the injection site, bone pain and asthenia.",
    ],
    whatItMeans: "A second Cuban therapeutic vaccine for lung cancer with randomised evidence of a modest survival gain, in a setting where few patients received further treatment at progression.",
    caveats: ["Only five patients per group received further anticancer therapy at progression, which differs from current practice where immunotherapy and later lines are standard.", "The authors describe it as a preliminary estimate of efficacy."],
    institutions: ["inor-cuba", "cencec-cuba"], companies: ["cimab"], cancers: ["nsclc"],
    links: [doi("10.1158/1078-0432.CCR-13-1674", "Clin Cancer Res 2014"), pubmed("24788102")] }),

  p({ id: "paper-solomon-nimotuzumab-high-grade-glioma-bmc-cancer-2013", name: "Nimotuzumab or placebo with radiotherapy for high-grade glioma: a Cuban randomised double-blind trial",
    journal: "BMC Cancer", year: 2013, doi: "10.1186/1471-2407-13-299", pmid: "23782513", authors: "Solomón MT, Selva JC, Figueredo J, et al.", paperType: "rct", participants: 70,
    tldr: "In 70 Cuban patients with high-grade glioma, adding the Cuban anti-EGFR antibody nimotuzumab to radiotherapy gave a median survival of 17.8 months against 12.6 months with placebo, without the skin rash of other EGFR antibodies.",
    summary: "A randomised, double-blind, multicentre trial in 41 patients with anaplastic astrocytoma and 29 with glioblastoma, who received radiotherapy with six weekly doses of 200 mg nimotuzumab or placebo, then maintenance every three weeks for a year. The trial is registered in the Cuban National Register for clinical trials (No. 1745).",
    findings: [
      "Median survival was 17.76 months with nimotuzumab and 12.63 months with placebo; mean survival 31.06 against 21.07 months.",
      "The median cumulative dose was 3,200 mg over a median of 16 doses.",
      "The commonest related adverse reactions were nausea, fever, tremors, anorexia and altered liver tests; no anti-idiotypic antibody response was detected.",
    ],
    whatItMeans: "A small randomised trial behind nimotuzumab's use with radiotherapy for brain tumours in Cuba and other countries that approve it.",
    caveats: ["Small trial mixing two tumour types.", "The abstract reports medians without a hazard ratio or confidence interval."],
    related: ["cencec-cuba"], companies: ["cimab"], drugs: ["nimotuzumab"], cancers: ["glioblastoma"], targets: ["egfr"],
    links: [doi("10.1186/1471-2407-13-299", "BMC Cancer 2013"), pubmed("23782513")] }),

  p({ id: "paper-romero-cancer-control-cuba-medicc-2009", name: "Changing the paradigm of cancer control in Cuba",
    journal: "MEDICC Review", year: 2009, doi: "10.37757/mr2009v11.n3.2", pmid: "21483299", authors: "Romero T", paperType: "review",
    tldr: "This 2009 article reported that Cuba's National Cancer Registry recorded about 29,000 new cancers a year and that cancer was already the commonest cause of death in 8 of the country's 14 provinces.",
    summary: "An overview of cancer control in Cuba describing a rapidly ageing population, rising cancer incidence and mortality despite the universal public health system, and the case for changing the national approach to cancer control.",
    findings: [
      "Cuba's National Cancer Registry recorded 29,000 new cancers a year, about 50% in the western provinces and 55% in people aged 65 or over.",
      "Incidence was projected to reach 30,000 cases by 2010 in a population of 11.2 million.",
      "Cancer was already the commonest cause of death in 8 of the country's 14 provinces, while adjusted mortality from heart and cerebrovascular disease was generally falling.",
    ],
    whatItMeans: "An earlier yearly figure from the National Cancer Registry, useful beside the registry's later counts printed in the Ministry of Public Health's yearbooks.",
    caveats: ["A review and commentary rather than a registry report; the abstract does not give the year of the 29,000 figure."],
    institutions: ["cuba-national-cancer-registry"], cancers: [],
    links: [doi("10.37757/mr2009v11.n3.2", "MEDICC Rev 2009"), pubmed("21483299")] }),
];

/** Cuba: the records behind /countries/cu/ (wave 7) that the corpus did not hold. */
export const recordsCU: EntityInput[] = [...institutions, ...companies, ...papers];
