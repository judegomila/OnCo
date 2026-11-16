import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Ecuador: the public bodies, cancer centres and papers behind /countries/ec/ (wave 7) that the corpus did not hold.
 * Each was written from its own primary source, read raw in Spanish on 11 November 2026: the Ministry of Public
 * Health's Acuerdo Ministerial 0059-2017 and the Estrategia Nacional para la Atención Integral del Cáncer it approved
 * (PDF text, from the ICCP portal), the Ministry's news pages on the eleventh revision of the Cuadro Nacional de
 * Medicamentos Básicos (15 November 2022) and on its 7.4 million dollar investment in ARCSA (31 August 2026), the
 * Registro Nacional de Tumores page and history page of SOLCA Núcleo de Quito, the history page of SOLCA in Guayaquil,
 * ARCSA's procedure page on gob.ec for registration by homologation, and two PAHO news pages on ARCSA. DOIs were
 * resolved through Europe PMC; the Quito registry figures come from the full text of the two registry papers in
 * Europe PMC (PMC9651078 and PMC6018821), and the other figures from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the regulator and both SOLCA hospitals; the registry links its two
 * papers through keyPapers and SOLCA Quito back. None of these bodies was in the corpus before (searched by name,
 * acronym and website). Coordinates are approximate city or district points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ENC_2017 = "https://www.iccp-portal.org/system/files/plans/ac_0059_2017.pdf";
const MSP_CNMB_2022 = "https://www.salud.gob.ec/?p=76057";
const MSP_ARCSA_2026 = "https://www.salud.gob.ec/gobierno-del-presidente-noboa-ejecuta-inversion-historica-de-usd-7-4-millones-para-el-fortalecimiento-operativo-y-tecnologico-de-arcsa-hacia-estandares-de-la-ops-oms/";
const RNT = "https://www.solcaquito.org.ec/registro-nacional-de-tumores/";
const SOLCA_Q_HIST = "https://www.solcaquito.org.ec/historia/";
const SOLCA_G_HIST = "https://www.solca.med.ec/nosotros-historia/";
const ARCSA_HOMOL = "https://www.gob.ec/arcsa/tramites/inscripcion-certificado-registro-sanitario-medicamentos-fabricacion-extranjera-homologacion";
const PAHO_ARCSA_2025 = "https://www.paho.org/es/noticias/14-5-2025-agencia-regulacion-control-vigilancia-sanitaria-va-hacia-certificacion-nivel-iii";
const PAHO_ARCSA_2024 = "https://www.paho.org/es/noticias/28-10-2024-ops-ecuador-recibio-reconocimiento-por-apoyo-compromiso-tecnico-con-agencia";
const IMPACT_2019 = "https://www.iaea.org/sites/default/files/documents/review-missions/ecuador_-_2019_impact_review.pdf";
const LEXIS_LAW = "https://www.lexis.com.ec/noticias/registro-oficial-del-dia-ecuador-promulga-la-ley-organica-para-la-atencion-integral-del-cancer";

const institutions: InstitutionInput[] = [
  i({ id: "msp-ecuador", name: "Ministerio de Salud Pública del Ecuador", aka: ["Ministry of Public Health of Ecuador", "MSP Ecuador", "Ecuador Ministry of Health"],
    city: "Quito", country: "EC", lat: -0.29, lng: -78.55, institutionType: "government", website: "https://www.salud.gob.ec",
    tldr: "Ecuador's health ministry and the country's national health authority. It wrote the 2017 national cancer strategy, runs the public network that buys cancer care from SOLCA, and chairs the council that keeps the national list of essential medicines.",
    summary: "Under article 4 of Ecuador's Ley Orgánica de Salud the Ministerio de Salud Pública is the national health authority, responsible for applying and enforcing the law. Its Acuerdo Ministerial 0059-2017 approved the Estrategia Nacional para la Atención Integral del Cáncer en el Ecuador (dated April 2017, valid for five years) and made it binding on the whole national health system. The strategy records that the public network (Red Pública Integral de Salud, which the Constitution defines as state establishments, social security and other state providers; the social security institutes are IESS, ISSFA for the armed forces and ISSPOL for the police) covers prevention, diagnosis and treatment, and buys services from private providers in a complementary network, among them SOLCA. The Constitution, quoted in the agreement, guarantees free specialised care at every level to people with catastrophic or highly complex illness (article 50). The coordinates are an approximate point for the Ministry's offices in south Quito.\n\nThe strategy set screening recommendations for cervical, breast, colorectal and stomach cancer and informed-choice testing for prostate cancer, and asked for histopathological diagnosis and staging within 45 days. An IAEA, WHO and IARC imPACT Review in March 2019, requested by the Ministry, recommended a cancer control steering committee and a budgeted action plan. On 15 November 2022 the Ministry presented the eleventh revision of the Cuadro Nacional de Medicamentos Básicos, which grew from 454 to 484 active ingredients and added 14 cancer and immunomodulating medicines. According to the legal publisher LEXIS and the law firm NMS, the Ley Orgánica para la Atención Integral del Cáncer, published on 4 March 2026, makes cancer a national priority and creates a National Cancer Committee attached to the health authority and a five-year National Cancer Plan; OnCo did not read the official text.",
    programs: ["Estrategia Nacional para la Atención Integral del Cáncer (Acuerdo Ministerial 0059-2017)", "Red Pública Integral de Salud", "Cuadro Nacional de Medicamentos Básicos (with CONASA)", "HPV vaccination in the national schedule (since 2014)", "Ley Orgánica para la Atención Integral del Cáncer (2026)"],
    institutions: ["registro-nacional-de-tumores-ecuador", "arcsa-ecuador", "solca-quito", "solca-guayaquil", "iaea", "who", "iarc"],
    cancers: ["cervical", "breast-cancer", "colorectal", "gastric", "prostate"], related: ["global-oncology-access"],
    keyPapers: ["paper-cueva-quito-cancer-incidence-1985-2017-colomb-med-2022", "paper-puente-vallejo-cervical-treatment-delay-quito-ecancer-2025", "paper-montero-oleas-gastric-cancer-mortality-ecuador-canep-2017", "paper-padilla-sanchez-ecuador-cancer-research-bibliometric-2025"],
    links: [
      { label: "Ministerio de Salud Pública: Acuerdo Ministerial 0059-2017 and the Estrategia Nacional para la Atención Integral del Cáncer en el Ecuador (PDF, ICCP portal)", url: ENC_2017 },
      { label: "Ministerio de Salud Pública: 30 medicines added to the Cuadro Nacional de Medicamentos Básicos (15 November 2022)", url: MSP_CNMB_2022 },
      { label: "IAEA: imPACT Review Ecuador, March 2019 (PDF)", url: IMPACT_2019 },
      { label: "LEXIS: Ecuador promulgates the Ley Orgánica para la Atención Integral del Cáncer (4 March 2026)", url: LEXIS_LAW },
    ] }),

  i({ id: "registro-nacional-de-tumores-ecuador", name: "Registro Nacional de Tumores (Quito population-based cancer registry)", aka: ["RNT", "National Tumour Registry of Ecuador", "Quito Cancer Registry", "Registro Nacional de Tumores SOLCA Quito"],
    city: "Quito", country: "EC", lat: -0.155, lng: -78.47, institutionType: "research-institute", website: RNT,
    tldr: "Quito's population-based cancer registry, created in 1984, before Ecuador's other population-based registries, and run by SOLCA. Despite its name it counts cancer in the city of Quito, about 1.9 million people, and its data have been accepted in Cancer Incidence in Five Continents.",
    summary: "The Registro Nacional de Tumores was created in 1984 by Ministerial Agreement 6345, which delegated it to the Sociedad de Lucha contra el Cáncer (SOLCA) Núcleo de Quito. Its own page says the plan was to reach national coverage progressively, hence the name, but that because a reliable national method could not be applied, population-based registries were set up instead in Guayaquil, Manabí, Cuenca, Loja and El Oro. It collects actively: staff visit the pathology, haematology and cytology laboratories of every public and private service in Quito, and add cases never examined under the microscope from hospital discharges and cancer deaths recorded by the national statistics institute (INEC). It is a member of the International Association of Cancer Registries, and its data have been published in volumes of Cancer Incidence in Five Continents. The coordinates are those of the SOLCA hospital in Quito, approximately.\n\nIts registry paper for 1985 to 2017 counted 93,821 new cancers among Quito residents, from 1,355 in 1985 to 5,846 in 2017. For 2013 to 2017 it reported age-standardised incidence, excluding non-melanoma skin cancer, of 212.2 per 100,000 men and 227.3 per 100,000 women, with 89.6% of cases histologically verified and 5.1% known from the death certificate only. The paper says Quito's is one of five population-based registries in Ecuador considered of high quality, which together cover 41.4% of the population.",
    programs: ["Population-based cancer registration for Quito (from 1985)", "Training and support for the registries of Guayaquil, Cuenca, Loja, Manabí and El Oro", "Boletín epidemiológico"],
    institutions: ["solca-quito", "msp-ecuador", "iarc"], cancers: ["breast-cancer", "cervical", "prostate", "thyroid", "gastric", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-cueva-quito-cancer-incidence-1985-2017-colomb-med-2022", "paper-corral-quito-cancer-trends-1985-2013-colomb-med-2018"],
    links: [
      { label: "SOLCA Núcleo de Quito: Registro Nacional de Tumores", url: RNT },
      doi("10.25100/cm.v53i1.4929", "Cueva et al., cancer incidence and mortality in Quito 1985 to 2017 (Colomb Med 2022)"),
      doi("10.25100/cm.v49i1.3785", "Corral Cordero et al., trends in cancer incidence and mortality in Quito 1985 to 2013 (Colomb Med 2018)"),
      { label: "Estrategia Nacional para la Atención Integral del Cáncer, section 5 (PDF)", url: ENC_2017 },
    ] }),

  i({ id: "solca-quito", name: "SOLCA Núcleo de Quito, Hospital Oncológico Solón Espinosa Ayala", aka: ["SOLCA Quito", "Hospital SOLCA Quito", "Hospital Oncológico Solón Espinosa Ayala", "Sociedad de Lucha contra el Cáncer, Núcleo de Quito"],
    city: "Quito", country: "EC", lat: -0.155, lng: -78.47, institutionType: "cancer-center", website: "https://www.solcaquito.org.ec",
    tldr: "The Quito branch of SOLCA, Ecuador's private non-profit cancer society. Its 160-bed Hospital Oncológico Solón Espinosa Ayala treats cancer for the centre and north of the country, and it runs the Quito cancer registry.",
    summary: "SOLCA Núcleo de Quito is one of the regional branches of the Sociedad de Lucha contra el Cáncer del Ecuador, a private non-profit society founded in Guayaquil in 1951 and charged with fighting cancer by a legislative decree of 15 October 1953, under which it created its Quito and Cuenca branches. Its history page says the branch was given responsibility for the centre and north of the country, started in a pavilion of the Hospital San Juan de Dios with one operating theatre and 22 beds, and now works from the Hospital Oncológico Solón Espinosa Ayala on Avenida Eloy Alfaro in Quito, with 160 beds, and oncology units in Santo Domingo, Ibarra and Chimborazo. Its services include clinical, surgical and paediatric oncology, radiotherapy, nuclear medicine and PET, a bone marrow transplant service and palliative care. The coordinates are approximate.\n\nThe branch runs the Registro Nacional de Tumores, Quito's population-based cancer registry, created in 1984. The Ministry of Public Health's 2017 strategy says the public network buys services from SOLCA. A 2025 cohort study of 1,363 women treated for cervical cancer at SOLCA Quito between 2012 and 2015 found that women first seen in the public system and then referred waited a mean of 162 days to start treatment, against 62 days for women cared for at SOLCA from the start. The hospital was one of four Ecuadorian sites in the CLEOPATRA trial of pertuzumab, according to ClinicalTrials.gov.",
    programs: ["Hospital Oncológico Solón Espinosa Ayala (160 beds)", "Oncology units in Santo Domingo, Ibarra and Chimborazo", "Radiotherapy and nuclear medicine", "Bone marrow transplantation", "Registro Nacional de Tumores"],
    institutions: ["registro-nacional-de-tumores-ecuador", "solca-guayaquil", "msp-ecuador"], cancers: ["cervical", "breast-cancer"], trials: ["cleopatra"],
    keyPapers: ["paper-puente-vallejo-cervical-treatment-delay-quito-ecancer-2025"],
    links: [
      { label: "SOLCA Núcleo de Quito: history", url: SOLCA_Q_HIST },
      { label: "SOLCA (Guayaquil): history of the society", url: SOLCA_G_HIST },
      { label: "SOLCA Núcleo de Quito: Registro Nacional de Tumores", url: RNT },
      doi("10.3332/ecancer.2025.2039", "Puente-Vallejo et al., treatment delay and survival in cervical cancer, Quito (ecancer 2025)"),
      { label: "ClinicalTrials.gov: NCT00567190 (CLEOPATRA), locations", url: "https://clinicaltrials.gov/study/NCT00567190" },
    ] }),

  i({ id: "solca-guayaquil", name: "SOLCA Guayaquil, Instituto Oncológico Nacional Dr. Juan Tanca Marengo", aka: ["SOLCA Guayaquil", "Instituto Oncológico Nacional Dr. Juan Tanca Marengo", "ION SOLCA", "Sociedad de Lucha contra el Cáncer del Ecuador, Matriz Guayaquil"],
    city: "Guayaquil", country: "EC", lat: -2.15, lng: -79.89, institutionType: "cancer-center", website: "https://www.solca.med.ec",
    tldr: "The head office of SOLCA, Ecuador's private non-profit cancer society, founded in Guayaquil in 1951, and its hospital, the Instituto Oncológico Nacional Dr. Juan Tanca Marengo, which says it receives patients from the whole country, mainland and islands.",
    summary: "The Sociedad de Lucha contra el Cáncer del Ecuador describes itself as a private-law institution with a social purpose and no profit motive, founded in Guayaquil on 7 December 1951. A legislative decree of 15 October 1953 charged it with the fight against cancer, and it created branches in Quito and Cuenca and later in Loja, Portoviejo and Machala. Its history page records its first cancer dispensary opening on 20 April 1954, a 20-bed ward in 1957 with radiotherapy and surgery departments added later, and the move on 3 November 1991 to a new hospital named the Instituto Oncológico Nacional Dr. Juan Tanca Marengo after its founder. Its home page says patients come from the whole of continental and island Ecuador. The coordinates are an approximate Guayaquil point.\n\nSOLCA's branches are funded partly by a contribution of 0.5% on credit operations with private financial institutions, set in the Código Orgánico Monetario y Financiero, which banks withhold and the Ministry of Public Health transfers to the branches each quarter. IAEA reviewers visited the institute during the imPACT Review of March 2019, and it was one of four Ecuadorian sites in the CLEOPATRA trial, according to ClinicalTrials.gov.",
    programs: ["Instituto Oncológico Nacional Dr. Juan Tanca Marengo", "Registro de Tumores (tumour registry)", "Preventive diagnosis centre", "Radiation oncology and nuclear medicine"],
    institutions: ["solca-quito", "msp-ecuador"], cancers: ["breast-cancer"], trials: ["cleopatra"],
    links: [
      { label: "SOLCA: history of the society", url: SOLCA_G_HIST },
      { label: "SOLCA: home page", url: "https://www.solca.med.ec/" },
      { label: "IAEA: imPACT Review Ecuador, March 2019 (PDF)", url: IMPACT_2019 },
      { label: "El Diario: what the contribution for SOLCA is (6 April 2026)", url: "https://www.eldiario.ec/centro/bancos-de-ecuador-que-es-la-contribucion-para-solca-y-por-que-te-la-descuentan-durante-ciertas-transacciones-06042026/" },
      { label: "ClinicalTrials.gov: NCT00567190 (CLEOPATRA), locations", url: "https://clinicaltrials.gov/study/NCT00567190" },
    ] }),

  i({ id: "arcsa-ecuador", name: "Agencia Nacional de Regulación, Control y Vigilancia Sanitaria (ARCSA)", aka: ["ARCSA", "National Agency for Health Regulation, Control and Surveillance"],
    city: "Guayaquil", country: "EC", lat: -2.10, lng: -79.90, institutionType: "government", website: "https://www.controlsanitario.gob.ec",
    tldr: "Ecuador's medicines regulator. It grants the registro sanitario a medicine needs to be sold, with a shortened route for medicines already registered by strict foreign regulators, and in 2025 began a WHO maturity level 3 pre-assessment with PAHO.",
    summary: "ARCSA, headquartered at Parque Samanes in Guayaquil, grants the registro sanitario (marketing authorisation) for medicines on behalf of the national health authority. Its procedure for foreign-made medicines by homologation defines homologation as the official recognition of registrations granted by countries whose regulators ARCSA lists as high health-surveillance agencies, and of medicines prequalified by WHO; the route is open only to medicines on the current Cuadro Nacional de Medicamentos Básicos, and the certificate lasts five years. The fee listed on gob.ec is 2,258.41 dollars for a foreign medicine, 565.21 for a foreign generic and 452.17 for a generic on the national list. The coordinates are approximate.\n\nPAHO wrote in October 2024 that ARCSA had begun a process to be certified under WHO's Global Benchmarking Tool as a maturity level 3 authority, and in May 2025 that it had started the pre-assessment, accompanied by PAHO and WHO staff. On 31 August 2026 the Ministry of Public Health announced a 7.4 million dollar project to renew ARCSA's vehicles and equipment for its reference laboratories in Quito, Guayaquil and Cuenca, with the aim of certification as a regional reference regulator by PAHO and WHO. The Ley Orgánica para la Atención Integral del Cáncer of March 2026 provides, according to legal summaries, a conditional registration for medicines for serious disease where the benefit outweighs the risk on preliminary evidence.",
    programs: ["Registro sanitario for medicines", "Registration by homologation (recognition of high-surveillance regulators and WHO prequalification)", "Pharmacovigilance and post-market control", "Reference laboratories in Quito, Guayaquil and Cuenca"],
    institutions: ["msp-ecuador", "who"],
    links: [
      { label: "gob.ec: ARCSA, registration of foreign-made medicines by homologation", url: ARCSA_HOMOL },
      { label: "PAHO: ARCSA moves towards level III certification (14 May 2025)", url: PAHO_ARCSA_2025 },
      { label: "PAHO: PAHO Ecuador recognised for its technical support to ARCSA (28 October 2024)", url: PAHO_ARCSA_2024 },
      { label: "Ministerio de Salud Pública: 7.4 million dollar investment in ARCSA (31 August 2026)", url: MSP_ARCSA_2026 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-cueva-quito-cancer-incidence-1985-2017-colomb-med-2022", name: "Cancer incidence and mortality in Quito, 1985 to 2017, from the Quito population-based registry",
    journal: "Colombia Médica", year: 2022, doi: "10.25100/cm.v53i1.4929", pmid: "36415599", authors: "Cueva P, Tarupi W, Caballero H.", paperType: "observational", participants: 93821,
    tldr: "Quito's cancer registry counted 93,821 new cancers from 1985 to 2017; incidence and mortality rose by about 2% a year, with breast, prostate, colorectal, thyroid cancer and lymphoma increasing and the fall in cervical and stomach cancer stalling.",
    summary: "Published as \"Cancer incidence and mortality in Quito: information to monitor cancer control policies\". The authors, from the Registro Nacional de Tumores at SOLCA Quito, analysed age-standardised incidence and mortality in the city of Quito from 1985 to 2017 with joinpoint regression, and discussed the results against Ecuador's 2017 national cancer strategy. Mortality figures come from the national statistics institute and are checked against the registry's own case records.",
    findings: [
      "93,821 new cancers were diagnosed among Quito residents from 1985 to 2017, rising from 1,355 in 1985 to 5,846 in 2017.",
      "Incidence rose by an annual 2.0% in men and 2.0% in women, and mortality by 2.0% in men and 1.3% in women.",
      "For 2013 to 2017, incidence excluding non-melanoma skin cancer was 212.2 per 100,000 men and 227.3 per 100,000 women; thyroid (47.0) and breast (41.8) led in women, prostate (63.0) and stomach (19.5) in men.",
    ],
    whatItMeans: "The latest published rates from the Quito registry, which predates Ecuador's other population-based registries. They show thyroid cancer overtaking breast cancer in Quito's women and cervical and stomach cancer no longer falling, which the authors read as a reason to strengthen prevention.",
    caveats: ["One city, about 1.9 million people in 2017; Quito's rates are higher than IARC's national estimate.", "Five high-quality registries cover 41.4% of Ecuador's population, so most of the country is not counted directly."],
    institutions: ["registro-nacional-de-tumores-ecuador", "solca-quito"], cancers: ["thyroid", "breast-cancer", "prostate", "gastric", "cervical", "colorectal"],
    links: [doi("10.25100/cm.v53i1.4929", "Colomb Med 2022"), pubmed("36415599"), { label: "Europe PMC full text (PMC9651078)", url: "https://europepmc.org/article/PMC/PMC9651078" }] }),

  p({ id: "paper-corral-quito-cancer-trends-1985-2013-colomb-med-2018", name: "Three decades of cancer incidence and mortality trends in Quito, 1985 to 2013",
    journal: "Colombia Médica", year: 2018, doi: "10.25100/cm.v49i1.3785", pmid: "29983462", authors: "Corral Cordero F, Cueva Ayala P, Yépez Maldonado J, Tarupi Montenegro W.", paperType: "observational",
    tldr: "Quito's registry data for 1985 to 2013 show cervical and stomach cancer falling while breast, colorectal and especially thyroid cancer in women rose; lung cancer rose in women and stayed stable in men.",
    summary: "Published as \"Trends in cancer incidence and mortality over three decades in Quito - Ecuador\". The authors analysed age-standardised incidence and mortality rates (world standard population) from the Registro Nacional de Tumores for six periods from 1985 to 2013, using joinpoint regression for trends at selected sites.",
    findings: [
      "Incidence and mortality of cervical and stomach cancer decreased over the period.",
      "Breast and colorectal cancer rates increased, and the rise in thyroid cancer incidence in women was marked.",
      "Lung cancer increased in women while it remained stable in men.",
    ],
    whatItMeans: "The registry's long view of how Quito's cancer pattern has shifted from infection-related cancers towards breast, colorectal, prostate and thyroid cancer, used to monitor Ecuador's cancer control measures.",
    caveats: ["One city only.", "The abstract reports directions of change; the rates themselves are in the paper's tables."],
    institutions: ["registro-nacional-de-tumores-ecuador", "solca-quito"], cancers: ["cervical", "gastric", "breast-cancer", "colorectal", "thyroid"],
    links: [doi("10.25100/cm.v49i1.3785", "Colomb Med 2018"), pubmed("29983462"), { label: "Europe PMC full text (PMC6018821)", url: "https://europepmc.org/article/PMC/PMC6018821" }] }),

  p({ id: "paper-puente-vallejo-cervical-treatment-delay-quito-ecancer-2025", name: "Treatment delay after referral from the public system and survival in cervical cancer, SOLCA Quito, 2012 to 2015",
    journal: "ecancermedicalscience", year: 2025, doi: "10.3332/ecancer.2025.2039", pmid: "41778185", authors: "Puente-Vallejo R, García-Gutiérrez A, Jara-Jimenez S, et al.", paperType: "observational", participants: 1363,
    tldr: "Among 1,363 women treated for cervical cancer at SOLCA Quito, those first seen in the public system and then referred waited a mean of 162 days to start treatment, against 62 days for those cared for at SOLCA throughout, and the delay was linked to shorter survival in advanced stages.",
    summary: "Published as \"Impact of treatment delay on survival in women diagnosed with cervical cancer in Quito, Ecuador: a retrospective cohort study\". A retrospective cohort of patients diagnosed between 2012 and 2015 and treated at SOLCA Quito, grouped by whether their care began in the public health system with later referral to SOLCA or was given entirely at SOLCA, and by FIGO 2009 stage.",
    findings: [
      "1,363 cases were analysed.",
      "Mean time to start treatment was 162 days for women referred from the public system and 62 days for women cared for at SOLCA from the start.",
      "The survival hazard ratio for comprehensive care at SOLCA against referral was 0.85 (95% CI 0.73 to 1) overall and 0.48 (0.37 to 0.63) in stage IV.",
    ],
    whatItMeans: "Shows the cost of the referral path between Ecuador's public network and SOLCA: women who entered through the public system started treatment about three months later, and in advanced stages this was linked to shorter survival.",
    caveats: ["Retrospective and from one hospital.", "The two groups may differ in ways other than the point of first contact."],
    institutions: ["solca-quito"], cancers: ["cervical"],
    links: [doi("10.3332/ecancer.2025.2039", "ecancer 2025"), pubmed("41778185")] }),

  p({ id: "paper-montero-oleas-gastric-cancer-mortality-ecuador-canep-2017", name: "The geography of stomach cancer deaths in Ecuador, 2004 to 2015",
    journal: "Cancer Epidemiology", year: 2017, doi: "10.1016/j.canep.2017.10.014", pmid: "29096319", authors: "Montero-Oleas N, Núñez-González S, Simancas-Racines D.", paperType: "observational", participants: 19115,
    tldr: "Stomach cancer caused 19,115 deaths in Ecuador from 2004 to 2015, and the highest-risk cluster of provinces lay along the Andes, with a relative risk of 1.34.",
    summary: "Published as \"The remarkable geographical pattern of gastric cancer mortality in Ecuador\". Using national death records from INEC, the authors calculated crude and indirectly standardised gastric cancer mortality by province for 2004 to 2015, analysed trends with joinpoint regression and searched for high-risk clusters for 2010 to 2015 with spatial scan statistics.",
    findings: [
      "Between 2004 and 2015 gastric cancer caused 19,115 deaths in Ecuador: 10,679 in men and 8,436 in women.",
      "Crude mortality fell significantly (average annual change -1.8%), but the fall in indirectly standardised mortality (-0.53% a year) was not significant.",
      "The most likely high-occurrence cluster covered Bolívar, Los Ríos, Chimborazo, Tungurahua and Cotopaxi, with a relative risk of 1.34.",
    ],
    whatItMeans: "Stomach cancer causes more cancer deaths than any other cancer in Ecuador in IARC's 2024 estimate, and this study shows high-risk clusters along the Andes.",
    caveats: ["Death certificates only; no incidence or stage data.", "Province-level analysis cannot identify individual risk factors."],
    cancers: ["gastric"],
    links: [doi("10.1016/j.canep.2017.10.014", "Cancer Epidemiol 2017"), pubmed("29096319")] }),

  p({ id: "paper-padilla-sanchez-ecuador-cancer-research-bibliometric-2025", name: "Cancer research in Ecuador, 2008 to 2021: a bibliometric study",
    journal: "Discover Oncology", year: 2025, doi: "10.1007/s12672-025-03168-w", pmid: "40643823", authors: "Padilla-Sánchez SD, Espinosa I, Sisa I.", paperType: "observational",
    tldr: "Ecuador's cancer research output rose after 2014, but nearly a third of it was case reports, and the cancers most often studied (gastrointestinal, gynaecological and breast) differed from the commonest in national statistics (breast, prostate and stomach).",
    summary: "Published as \"The state of cancer research and its association with the cancer burden in Ecuador: a bibliometric study\". The authors retrieved Ecuadorian cancer research articles published from 2008 to 2021 from Scopus, PubMed and LILACS and described their designs, institutions, collaborations and journal rankings against the national cancer burden.",
    findings: [
      "Output increased markedly after 2014.",
      "The commonest designs were case reports (244, 30.7%), cross-sectional studies (174, 21.9%) and reviews (131, 16.5%).",
      "Universities produced 32.4% of publications; 25.3% were university and hospital collaborations, of which 45.1% were in the lowest SCImago quartile.",
    ],
    whatItMeans: "A picture of the kind of cancer research Ecuador produces, mostly case reports, cross-sectional studies and reviews, and a call to raise its quality and align it with the cancers that affect most people.",
    caveats: ["Counts publications, not trials or their quality.", "Ends in 2021."],
    links: [doi("10.1007/s12672-025-03168-w", "Discov Oncol 2025"), pubmed("40643823")] }),
];

/** Ecuador: the records behind /countries/ec/ (wave 7) that the corpus did not hold. */
export const recordsEC: EntityInput[] = [...institutions, ...papers];
