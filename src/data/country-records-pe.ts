import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Peru: the public bodies, the registry and the papers behind /countries/pe/ (wave 5) that the corpus did not hold. Each
 * was written from its own primary source, read raw in Spanish on 11 November 2026: the Registro de Cáncer de Lima
 * Metropolitana, Incidencia y Mortalidad 2013 to 2015, volume 6 (INEN, Lima 2021, PDF text); Ley 31336, Ley Nacional
 * del Cáncer, as printed in El Peruano on 10 August 2021; its regulation, Decreto Supremo 004-2022-SA (a scanned PDF,
 * read by OCR); Decreto Supremo 009-2012-SA and the Plan Esperanza annexed to it (scanned, OCR); the Plan Nacional
 * Multisectorial para la lucha contra el cáncer 2025 to 2030 (Decreto Supremo 016-2025-SA, OCR); Ley 32319 as published
 * by El Peruano; DIGEMID's Comunicado 051-2024 (read from an Internet Archive copy, because digemid.minsa.gob.pe answered
 * 403); and the gob.pe institutional pages of the SIS, FISSAL, EsSalud and CENARES. The DOIs of the three papers were
 * resolved through Europe PMC and their abstracts read.
 *
 * Inbound links: the registry, the Ministry, SIS, FISSAL, EsSalud and DIGEMID link to each other and to INEN; the
 * registry links the two Lima papers through keyPapers and the Ministry links the childhood cancer paper. Coordinates
 * are city or district points, not buildings.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const RCLM_2013 = "https://cdn.www.gob.pe/uploads/document/file/4016334/REGISTRO-DE-CANCER-DE-LIMA-METROPOLITANA-2013-2015.pdf";
const RCLM_PAGE = "https://www.gob.pe/institucion/inen/informes-publicaciones/8299322-registro-del-cancer-de-lima-metropolitana-rclm-registro-de-cancer-de-base-poblacional";
const LEY_31336 = "https://cdn.www.gob.pe/uploads/document/file/9750064/7973110-ley-nacional-de-cancer.pdf";
const DS_004_2022 = "https://www.gob.pe/institucion/minsa/normas-legales/2879401-004-2022-sa";
const DS_009_2012 = "https://www.gob.pe/institucion/minsa/normas-legales/241347-009-2012-sa";
const PNM_2025 = "https://www.gob.pe/institucion/minsa/normas-legales/7148697-016-2025-sa";
const LEY_32319 = "https://busquedas.elperuano.pe/api/visor_html/2395814-4";
const DIGEMID_COM_051 = "https://web.archive.org/web/2025/https://www.digemid.minsa.gob.pe/Archivos/Comunicados/2024/COM_051-2024.pdf";
const FISSAL_INST = "https://www.gob.pe/institucion/fissal/institucional";
const FISSAL_TRASLADO = "https://www.gob.pe/institucion/fissal/pages/9774-solicitar-cobertura-para-traslado-y-estadia-de-pacientes-oncologicos-estables";
const SIS_INST = "https://www.gob.pe/institucion/sis/institucional";
const ESSALUD_INST = "https://www.gob.pe/institucion/essalud/institucional";
const INEI_2025 = "https://www.gob.pe/institucion/inei/noticias/1192559-38-1-de-la-poblacion-con-algun-problema-de-salud-acudio-a-un-establecimiento-en-busca-de-atencion";
const RM_480_2025 = "https://www.gob.pe/institucion/minsa/normas-legales/6972661-480-2025-minsa";

const institutions: InstitutionInput[] = [
  i({ id: "lima-metropolitan-cancer-registry", name: "Registro de Cáncer de Lima Metropolitana (Metropolitan Lima Cancer Registry)", aka: ["RCLM", "Registro de Cáncer de Lima Metropolitana", "Metropolitan Lima Cancer Registry", "Lima cancer registry"],
    city: "Lima (Lima and Callao)", country: "PE", lat: -12.046, lng: -77.043, institutionType: "research-institute",
    tldr: "A population-based cancer registry run by Peru's national cancer institute, INEN, covering Lima and Callao. Its sixth report counted 70,162 new invasive cancers in 2013 to 2015, an age-standardised rate of 225.8 per 100,000, and 32,572 cancer deaths.",
    summary: "The Registro de Cáncer de Lima Metropolitana is a population-based registry kept by the Departamento de Epidemiología y Estadística del Cáncer, one of the five departments of INEN's Dirección de Control del Cáncer. It began in 1968 with the whole of Metropolitan Lima (the provinces of Lima and Callao) as its area, stopped in 1978 and was restarted in 1990 at the Maes-Heller cancer research centre with funding from the Fundación Peruana de Cáncer; since 1990 it has published reports for 1990 to 1991, 1990 to 1993, 1994 to 1997, 1998, 2004 to 2005, 2010 to 2012 and 2013 to 2015. Cases come from Ministry of Health hospitals, EsSalud, the armed forces and police hospitals, private clinics, doctors' practices and specialist centres in Lima and Callao. Volume 6 (Lima, 2021) covers 2013 to 2015 for an estimated population of 9,751,717 over 2,811.65 square kilometres. It registered 75,418 new cancers, of which 70,162 were invasive (31,440 in men and 38,722 in women) and 5,256 in situ, with an age-standardised incidence of 225.8 per 100,000 (224.4 in men, 230.8 in women), histological verification of 81.6%, and 32,572 cancer deaths, an age-standardised mortality of 101.7 per 100,000 (112.5 in men, 94.6 in women). Leaving aside non-melanoma skin cancer, breast (43.15 per 100,000 women), cervical (21.99), stomach, thyroid and colon cancer led in women; prostate (45.12 per 100,000 men), stomach (19.39), lung, non-Hodgkin lymphoma and colon in men. Stomach cancer was the leading cause of cancer death in both sexes together. The report states that its 2010 to 2012 data were included in Cancer Incidence in Five Continents volume XI and that the registry has been an active member of the International Association of Cancer Registries since 1990. The 2022 regulation of the national cancer law charges the Ministry, through INEN, with building a national cancer registry that draws on population-based registries such as this one and on hospital registries.",
    programs: ["Population-based cancer registration for Lima and Callao (since 1968, restarted 1990)", "Incidence and mortality reports, latest for 2013 to 2015 (volume 6, 2021)", "Childhood cancer incidence and mortality in Metropolitan Lima"],
    institutions: ["inen-peru", "ministry-of-health-peru", "essalud-peru", "iarc"],
    keyPapers: ["paper-stenning-persivale-mir-survival-lima-ecancer-2018", "paper-pineros-cancer-patterns-peru-lancet-oncol-2017"],
    cancers: ["gastric", "cervical", "prostate", "breast-cancer"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "INEN: Registro de Cáncer de Lima Metropolitana, Incidencia y Mortalidad 2013 to 2015, volume 6 (PDF)", url: RCLM_2013 },
      { label: "INEN: the registry's page with its three latest reports (gob.pe)", url: RCLM_PAGE },
      { label: "Decreto Supremo 004-2022-SA: regulation of Ley 31336, articles 35 to 37 on the national cancer registry", url: DS_004_2022 },
    ] }),

  i({ id: "ministry-of-health-peru", name: "Ministerio de Salud del Perú (MINSA)", aka: ["MINSA", "Ministerio de Salud", "Ministry of Health of Peru", "Peruvian Ministry of Health"],
    city: "Lima", country: "PE", lat: -12.072, lng: -77.044, institutionType: "government", website: "https://www.gob.pe/minsa",
    tldr: "Peru's Ministry of Health, the governing body of the health sector. It wrote Plan Esperanza in 2012, regulates the 2021 national cancer law, approved a multisectoral cancer plan for 2025 to 2030, and sets the screening and HPV vaccination rules.",
    summary: "The Ministerio de Salud is the governing body (ente rector) of Peru's health sector. Decreto Supremo 009-2012-SA of 2 November 2012 declared comprehensive cancer care of national interest, placed it with the Ministry and INEN, and approved the Plan Nacional para la Atención Integral del Cáncer y Mejoramiento del Acceso a los Servicios Oncológicos, called Plan Esperanza, funded from the budgets of the Ministry, INEN and the Seguro Integral de Salud; the plan recorded that about 75% of cancers in Peru were diagnosed late and that only Arequipa, La Libertad and Lima had public radiotherapy among regional governments. Ley 31336, the Ley Nacional del Cáncer of 9 August 2021, makes the Ministry responsible for the national cancer policy, and its regulation, Decreto Supremo 004-2022-SA of 30 March 2022, sets the route by which an oncology medicine outside the national essential medicines list is assessed and paid for. Decreto Supremo 016-2025-SA of 10 September 2025 approved the Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030, which records that only eight public hospitals had their own radiotherapy service and five more outsourced it, and that the International Atomic Energy Agency's 2024 imPACT review counted 370 qualified medical oncologists against an estimated need of 877. The Ministry's Dirección de Prevención y Control del Cáncer (DPCAN), created in 2017, runs the screening programmes, and Resolución Ministerial 480-2025-MINSA of 18 July 2025 sets cervical screening by HPV test, visual inspection or cytology for women aged 25 to 64.",
    programs: ["Plan Esperanza (Decreto Supremo 009-2012-SA)", "Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030 (Decreto Supremo 016-2025-SA)", "Programa Presupuestal 0024, Prevención y Control del Cáncer", "Directiva Sanitaria 165 on cervical cancer prevention (2025)", "HPV vaccination for girls and boys aged 9 to 18"],
    institutions: ["inen-peru", "sis-peru", "fissal-peru", "essalud-peru", "digemid-peru", "lima-metropolitan-cancer-registry", "liga-peruana-contra-el-cancer", "iaea"],
    keyPapers: ["paper-maradiegue-childhood-cancer-peru-gicc-rpsp-2023"],
    cancers: ["cervical", "breast-cancer", "gastric", "prostate"], technologies: ["hpv-vaccine"], related: ["global-oncology-access"],
    links: [
      { label: "Decreto Supremo 009-2012-SA and Plan Esperanza (gob.pe)", url: DS_009_2012 },
      { label: "Ley 31336, Ley Nacional del Cáncer (El Peruano, 10 August 2021, PDF)", url: LEY_31336 },
      { label: "Decreto Supremo 004-2022-SA: regulation of Ley 31336 (gob.pe)", url: DS_004_2022 },
      { label: "Decreto Supremo 016-2025-SA: Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030 (gob.pe)", url: PNM_2025 },
      { label: "Resolución Ministerial 480-2025-MINSA: cervical cancer prevention directive (gob.pe)", url: RM_480_2025 },
    ] }),

  i({ id: "sis-peru", name: "Seguro Integral de Salud (SIS), Peru", aka: ["SIS", "Seguro Integral de Salud", "Comprehensive Health Insurance (Peru)"],
    city: "Lima", country: "PE", lat: -12.09, lng: -77.05, institutionType: "government", website: "https://www.gob.pe/sis",
    tldr: "Peru's public health insurer for people without other cover. Under the 2021 cancer law, anyone resident in Peru with a confirmed cancer and no insurance covering at least the essential plan is enrolled in the SIS directly, whatever their income.",
    summary: "The Seguro Integral de Salud is the public insurance fund whose mission, in its own words, is to give financial protection in health to every resident of Peru who has no insurance with at least the cover of the Plan Esencial de Aseguramiento en Salud (PEAS). Article 5.2 of Ley 31336 of 2021 provides that a cancer patient without EsSalud or private cover, or whose cover is insufficient, is affiliated to the SIS immediately. Its regulation, Decreto Supremo 004-2022-SA, makes this a direct affiliation to the SIS's subsidised scheme for every resident with a definitive cancer diagnosis and no qualifying cover, independent of socioeconomic status, keeps the SIS paying during a waiting period when a patient moves to another insurer, and gives SIS cancer patients the PEAS, the complementary plan and FISSAL cover. In the first quarter of 2025 the national statistics institute reported that 91.1% of the population had some health insurance and that, of those insured, 63.1% were in the SIS. High-cost cancers are paid for through the SIS's executing unit FISSAL.",
    programs: ["Subsidised and semi-contributory insurance (SIS Gratuito, SIS Independiente, SIS Emprendedor)", "Direct affiliation of uninsured cancer patients (Ley 31336, article 5.2)"],
    institutions: ["fissal-peru", "ministry-of-health-peru", "essalud-peru", "inen-peru"],
    related: ["global-oncology-access"],
    links: [
      { label: "SIS: institutional page and mission (gob.pe)", url: SIS_INST },
      { label: "Ley 31336, article 5 (El Peruano, PDF)", url: LEY_31336 },
      { label: "Decreto Supremo 004-2022-SA, article 9 (gob.pe)", url: DS_004_2022 },
      { label: "INEI: health insurance in the first quarter of 2025 (23 June 2025)", url: INEI_2025 },
    ] }),

  i({ id: "fissal-peru", name: "Fondo Intangible Solidario de Salud (FISSAL), Peru", aka: ["FISSAL", "Fondo Intangible Solidario de Salud"],
    city: "Lima", country: "PE", lat: -12.093, lng: -77.047, institutionType: "government", website: "https://www.gob.pe/fissal",
    tldr: "The fund inside Peru's public insurer that pays for high-cost illness. For SIS members it covers seven cancers from diagnosis to treatment (cervix, breast, colon, stomach, prostate, leukaemias and lymphomas), automatically from diagnosis, and can pay travel and lodging for treatment away from home.",
    summary: "The Fondo Intangible Solidario de Salud was created by article 10 of Ley 29761 as an executing unit of the Seguro Integral de Salud to finance high-cost illnesses, and describes itself as the only public health insurance fund charged with paying for care of high-cost illnesses, rare and orphan diseases and high-cost procedures. Its own page lists the cancers it finances from diagnosis to treatment as the seven commonest in Peru: cervix, breast, colon, stomach, prostate, leukaemias and lymphomas; it also pays for bone marrow transplant, kidney transplant and liver transplant in children under two, under Resolución Jefatural 093-2015/SIS. Cover is automatic once a SIS member (SIS Gratuito, Independiente or Emprendedor) is diagnosed with a listed illness and includes medicines, tests, outpatient, inpatient and emergency care and surgery. A SIS member with one of the seven cancers who has to continue treatment outside their region and cannot afford it can ask FISSAL, through the hospital's insurance office, to pay for travel and lodging for the patient and one companion. Decreto Supremo 004-2022-SA requires FISSAL to add cancer procedures to its tariff on application by hospitals and to seek budget priority for comprehensive cancer cover.",
    programs: ["High-cost cancer cover: cervix, breast, colon, stomach, prostate, leukaemias, lymphomas", "Bone marrow, kidney and paediatric liver transplant", "Travel and lodging for SIS cancer patients treated outside their region"],
    institutions: ["sis-peru", "ministry-of-health-peru", "inen-peru"],
    cancers: ["cervical", "breast-cancer", "colorectal", "gastric", "prostate", "all-leukemia", "non-hodgkin-lymphoma"], related: ["global-oncology-access"],
    links: [
      { label: "FISSAL: what it does and what it covers (gob.pe)", url: FISSAL_INST },
      { label: "FISSAL: travel and lodging for stable cancer patients (gob.pe)", url: FISSAL_TRASLADO },
      { label: "Decreto Supremo 009-2012-SA, considerations on FISSAL (gob.pe)", url: DS_009_2012 },
      { label: "Decreto Supremo 004-2022-SA, articles 7 and 9 (gob.pe)", url: DS_004_2022 },
    ] }),

  i({ id: "essalud-peru", name: "Seguro Social de Salud (EsSalud), Peru", aka: ["EsSalud", "Seguro Social de Salud", "Social Health Insurance of Peru"],
    city: "Lima (Jesús María)", country: "PE", lat: -12.077, lng: -77.04, institutionType: "government", website: "https://www.gob.pe/essalud",
    tldr: "Peru's social security health insurer for salaried workers and their families, with its own hospitals, including radiotherapy at the Rebagliati and Almenara hospitals in Lima. It runs cervical, breast and prostate screening alongside the Ministry's programmes.",
    summary: "EsSalud, the Seguro Social de Salud, gives health, economic and social benefits to its insured members, in its own words, and runs its own network of hospitals. The 2012 Plan Esperanza listed EsSalud's radiotherapy services at the Hospital Nacional Edgardo Rebagliati Martins and Hospital Nacional Guillermo Almenara Irigoyen in Lima, the Hospital Nacional Carlos Alberto Seguín Escobedo in Arequipa, the Hospital Nacional Víctor Lazarte Echegaray in La Libertad and the Hospital Nacional Ramiro Prialé in Huancayo. Under Ley 31336 every insurer, public or private, must finance cancer care within the universal health insurance framework, and a patient whose EsSalud cover lapses or is insufficient is enrolled in the SIS. The Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030 sets EsSalud its own screening targets: 621,555 women screened by Pap test and 203,876 mammograms in 2025, and 122,516 men tested with PSA. INEI did not give EsSalud's share of the insured population in its first-quarter 2025 release, so it is not stated here.",
    programs: ["Social security health insurance for salaried workers and dependants", "Radiotherapy at five national hospitals (Plan Esperanza list, 2012)", "Cervical, breast and prostate screening targets in the 2025 to 2030 plan"],
    institutions: ["sis-peru", "ministry-of-health-peru", "inen-peru", "lima-metropolitan-cancer-registry"],
    cancers: ["cervical", "breast-cancer", "prostate"],
    links: [
      { label: "EsSalud: institutional page and mission (gob.pe)", url: ESSALUD_INST },
      { label: "Decreto Supremo 009-2012-SA and Plan Esperanza, table 15 (gob.pe)", url: DS_009_2012 },
      { label: "Decreto Supremo 016-2025-SA: Plan Nacional Multisectorial 2025 to 2030 (gob.pe)", url: PNM_2025 },
    ] }),

  i({ id: "digemid-peru", name: "Dirección General de Medicamentos, Insumos y Drogas (DIGEMID), Peru", aka: ["DIGEMID", "Dirección General de Medicamentos, Insumos y Drogas", "Autoridad Nacional de Productos Farmacéuticos (ANM)"],
    city: "Lima (San Miguel)", country: "PE", lat: -12.077, lng: -77.085, institutionType: "government", website: "https://www.digemid.minsa.gob.pe",
    tldr: "Peru's medicines regulator, part of the Ministry of Health. A 2025 law requires it to decide within 45 calendar days on cancer and rare-disease medicines already registered and sold in a high-surveillance country, or the application is approved by default.",
    summary: "DIGEMID is the Ministry of Health's general directorate for medicines and the national authority for pharmaceutical products under Ley 29459. In December 2024 it stated that it then had 2,200 medicine registration files in process, 86% of them filed that year, and that its average wait for registration was 2.8 months for biological products and 4.9 months for synthetic medicines; that Ley 31738 of May 2023 already gave a 45-calendar-day accelerated procedure for rare, orphan and cancer medicines from high-surveillance countries (países de alta vigilancia sanitaria), under which it had granted four registrations; and that 14 of 55 foreign factories it inspected that year failed its manufacturing standards. Ley 32319, signed on 30 April 2025, exempts medicines and biological products for rare and orphan diseases, cancer and other diseases that are registered and sold in a high-surveillance country from articles 10 and 11 of Ley 29459, and subjects them to an accelerated evaluation of no more than 45 calendar days with positive administrative silence, provided the full quality, safety and efficacy dossier in common technical document format, climate zone IV-A or IV-B stability studies, a certificate of pharmaceutical product, a risk management plan and Spanish labelling are filed; it repealed the earlier article of Ley 31738. In the same December 2024 statement DIGEMID had opposed a bill for automatic registration, arguing that no regulator grants it. Ley 31336 of 2021 declares the technological strengthening of DIGEMID and the national health institute for health technology assessment of cancer resources to be of national interest.",
    programs: ["Registro Sanitario of medicines and biological products (Ley 29459)", "Accelerated 45-day route for products registered in high-surveillance countries (Ley 32319, 2025)", "Good manufacturing practice inspection of foreign laboratories"],
    institutions: ["ministry-of-health-peru", "sis-peru"],
    related: ["global-oncology-access"],
    links: [
      { label: "Ley 32319 (El Peruano)", url: LEY_32319 },
      { label: "DIGEMID: Comunicado 051-2024, 5 December 2024 (PDF, Internet Archive copy)", url: DIGEMID_COM_051 },
      { label: "Ley 31336, fifth final provision (El Peruano, PDF)", url: LEY_31336 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-stenning-persivale-mir-survival-lima-ecancer-2018", name: "Mortality-incidence ratio as an estimate of five-year cancer survival in Metropolitan Lima",
    journal: "Ecancermedicalscience", year: 2018, doi: "10.3332/ecancer.2018.799", pmid: "29456616", authors: "Stenning-Persivale K, Franco MJS, Cordero-Morales A, et al.", paperType: "observational",
    tldr: "Using the Lima cancer registry's 2004 to 2005 cases linked to the national identity register, the authors found that one minus the mortality-incidence ratio closely tracked observed five-year survival for ten common cancers in Lima.",
    summary: "Published as \"The mortality-incidence ratio as an indicator of five-year cancer survival in metropolitan Lima\". The authors took new cases and deaths for breast, stomach, prostate, thyroid, lung, colon, cervical and liver cancer, non-Hodgkin lymphoma and leukaemia from the Registro de Cáncer de Lima Metropolitana for 2004 to 2005, checked each case's vital status at five years in the national identity and civil status register (RENIEC), and compared observed five-year survival with the complement of the mortality-incidence ratio.",
    findings: [
      "Observed and estimated five-year survival were 66.7% and 86.7% for thyroid cancer, 69.6% and 68% for breast, 64.3% and 63.8% for prostate, and 50.1% and 58.5% for cervical cancer.",
      "Pearson's r for the correlation between the two measures was 0.9839, and the ratio captured 96.82% of observed survival.",
    ],
    whatItMeans: "Lima has no routine survival statistics, and this study supports using the registry's mortality-incidence ratio as a stand-in, which is how the registry's later reports present survival by cancer.",
    caveats: ["Cases diagnosed in 2004 to 2005 in Lima only.", "The estimate was far from observed survival for thyroid cancer."],
    institutions: ["lima-metropolitan-cancer-registry", "inen-peru"], cancers: ["breast-cancer", "gastric", "prostate", "cervical"],
    links: [doi("10.3332/ecancer.2018.799", "Ecancermedicalscience 2018"), pubmed("29456616")] }),

  p({ id: "paper-pineros-cancer-patterns-peru-lancet-oncol-2017", name: "Cancer patterns, trends and transitions in Peru",
    journal: "Lancet Oncology", year: 2017, doi: "10.1016/S1470-2045(17)30377-7", pmid: "28971824", authors: "Piñeros M, Ramos W, Antoni S, et al.", paperType: "review",
    tldr: "A review with IARC and Peruvian authors: prostate and breast cancer are the commonest cancers in Lima and Arequipa, the two areas with population-based registries, while cervical and stomach cancer rank highest in national cancer mortality.",
    summary: "Published as \"Cancer patterns, trends, and transitions in Peru: a regional perspective\". It describes how population growth, ageing and urbanisation are changing Peru's cancer profile, with prostate and breast cancer the most frequent in men and women in Lima and Arequipa, and the infection-related cervical and stomach cancers still common and highest in national mortality.",
    findings: [
      "Lima and Arequipa were the two areas of Peru with population-based cancer registries.",
      "Infection-associated cancers of the cervix and stomach ranked highest in the national cancer mortality profile.",
      "The authors called for better vital statistics and for linking the two registries to the national mandatory cancer reporting system to obtain national incidence.",
    ],
    whatItMeans: "It sets out why Peru's national cancer figures are still estimates built from two cities' registries and death records, and what the country would need to measure cancer nationally.",
    caveats: ["A review; the figures are from the registries and vital statistics available before 2017."],
    institutions: ["lima-metropolitan-cancer-registry", "iarc", "inen-peru"], cancers: ["prostate", "breast-cancer", "cervical", "gastric"],
    links: [doi("10.1016/S1470-2045(17)30377-7", "Lancet Oncology 2017"), pubmed("28971824")] }),

  p({ id: "paper-maradiegue-childhood-cancer-peru-gicc-rpsp-2023", name: "Peru's childhood cancer policy under the WHO Global Initiative for Childhood Cancer",
    journal: "Revista Panamericana de Salud Pública", year: 2023, doi: "10.26633/RPSP.2023.132", pmid: "37750053", authors: "Maradiegue E, Pascual C, Vasquez L, et al.", paperType: "observational",
    tldr: "Since June 2019 Peru has applied the WHO CureAll framework for childhood cancer; the authors report national treatment abandonment falling from 18.6% to 8.5% and the passage of a childhood cancer law.",
    summary: "Published as \"Strengthening public health policies for childhood cancer: Peru's achievements through the WHO Global Initiative for Childhood Cancer\". A participatory and documentary evaluation of what Peru did after joining the initiative in June 2019, with more than 150 participants in Ministry of Health working committees drafting policy and regulatory documents.",
    findings: [
      "The national rate of treatment abandonment fell from 18.6% to 8.5%.",
      "Achievements included the approval of the Childhood Cancer Law, better management of febrile neutropenia, and fewer events of clinical deterioration and deaths among children in hospital.",
    ],
    whatItMeans: "A child who abandons treatment is very unlikely to be cured, so halving the abandonment rate is a direct gain for children with cancer in Peru; the paper also documents the policy steps behind it.",
    caveats: ["Written by the people who ran the programme; the before and after periods are not set out in the abstract."],
    institutions: ["ministry-of-health-peru", "inen-peru", "who"], cancers: ["all-leukemia"],
    links: [doi("10.26633/RPSP.2023.132", "Revista Panamericana de Salud Pública 2023"), pubmed("37750053")] }),
];

/** Peru: the records behind /countries/pe/ (wave 5) that the corpus did not hold. */
export const recordsPE: EntityInput[] = [...institutions, ...papers];
