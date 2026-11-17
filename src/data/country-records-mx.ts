import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Mexico: the institutions and the paper behind /countries/mx/ that the corpus did not hold. Every record was
 * written from a primary source read raw on 4 November 2026: the Ley General de Salud as consolidated by the
 * Cámara de Diputados (text in force after the reform of 15 January 2026), the Diario Oficial de la Federación,
 * the decree creating IMSS-Bienestar as the institute publishes it, gob.mx pages and the Salud Pública de México
 * article on the registry network (DOI resolved through Crossref, PubMed id through Europe PMC).
 *
 * Inbound links: registro-nacional-cancer-mexico is linked from the paper; consejo-salubridad-general-mexico and
 * imss-bienestar link to each other, and imss-bienestar is also linked from the registry. Coordinates are a Mexico
 * City centroid for all three institutions, not an address.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const LGS = "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf";
const NORMAS_CNIS = "https://dof.gob.mx/nota_detalle.php?codigo=5722808&fecha=10/04/2024";
const DECRETO_IMSSB = "https://imssbienestar.gob.mx/assets/doc/juridico/01_normatividad/01_marcojuridico/03_decretos/Decreto%20de%20Creaci%C3%B3n%20IMSS-BIENESTAR%20Integrado%20DOF%2015-08-2025.pdf";
const FONSABI_RULES = "https://web.archive.org/web/20260113114526/https://imssbienestar.gob.mx/assets/docs/finanzas/REGLAS_OPERACION_FONSABI.pdf";
const LGDOCIA = "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGDOCIA_070121.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "registro-nacional-cancer-mexico", name: "Registro Nacional de Cáncer (Mexico)", aka: ["Mexican National Cancer Registry", "Red de Registros de Cáncer de Base Poblacional", "RedMex"],
    city: "Mexico City", country: "MX", lat: 19.433, lng: -99.133, institutionType: "government", website: "https://www.gob.mx/salud",
    tldr: "Mexico's national cancer registry was created in law in 2017 and OnCo found no national count of new cancers published from it; a network of nine local registries ran from 2017 to 2020, and in September 2025 the health minister presented a module for children's cancers.",
    summary: "A reform of the Ley General de Salud published in the Diario Oficial on 22 June 2017 added article 161 Bis, which says the Registro Nacional de Cáncer will be population-based, will draw on the national basic health information system, and will hold each patient's demographic data, the tumour's date of diagnosis, site, histology and stage, the treatment given, follow-up and survival. The reform's transitional articles told the Secretaría de Salud to issue the registry's regulation within sixty days of the reform taking effect and to pay for it from its own budget. A 2021 amendment added a separate section for children and adolescents under the Ley General para la Detección Oportuna del Cáncer en la Infancia y la Adolescencia.\n\nThe Instituto Nacional de Cancerología was designated to coordinate the effort. Its network of population-based registries ran in Acapulco, Baja California Sur, Campeche, Guadalajara, Hermosillo, León, Monterrey, Tijuana and Toluca, a population of 14,408,621 at the 2020 census, about 11% of Mexico; it recorded 13,517 new cancers from 2017 to 2020 from 481 information sources, without access to IMSS institutions, and was suspended in 2020 for budgetary reasons. Breast cancer was 23.3% of cases. A separate population-based registry has run in Mérida, at an IMSS institution, since 2016.\n\nOn 22 September 2025 the Secretario de Salud, David Kershenobich, presented the registry's paediatric module, and the press reported that the ministry was restarting the registry with children's cancers first. OnCo found no published national incidence figure from the registry; Mexico's national cancer numbers remain IARC's modelled estimates and INEGI's registered deaths.",
    programs: ["Population-based registry network (2017 to 2020, suspended)", "Paediatric module (presented September 2025)", "Registro Nacional de Cáncer en la Infancia y Adolescencia (2021 law)"],
    institutions: ["incan-mexico", "imss-bienestar", "iarc"], keyPapers: ["paper-mohar-mexico-cancer-registry-network-spm-2024"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Ley General de Salud, article 161 Bis (Cámara de Diputados, consolidated text, PDF)", url: LGS },
      doi("10.21149/15258", "Mohar et al., population-based cancer registry network in Mexico 2017 to 2020 (Salud Publica Mex 2024)"),
      { label: "Expansión: Salud retoma el registro de cáncer; empezará con datos infantiles (24 September 2025)", url: "https://politica.expansion.mx/mexico/2025/09/24/salud-retoma-el-registro-de-cancer-empezara-con-datos-infantiles" },
      { label: "Ley General para la Detección Oportuna del Cáncer en la Infancia y la Adolescencia (PDF)", url: LGDOCIA },
    ] }),

  i({ id: "consejo-salubridad-general-mexico", name: "Consejo de Salubridad General (Mexico)", aka: ["CSG", "General Health Council of Mexico", "Comisión del Compendio Nacional de Insumos para la Salud"],
    city: "Mexico City", country: "MX", lat: 19.433, lng: -99.133, institutionType: "government", website: "https://www.gob.mx/csg",
    tldr: "Mexico's General Health Council decides which medicines the public health institutions may buy, by listing them in the national formulary after a review that includes an economic evaluation, and defines which treatments count as high-cost for the fund that pays for them.",
    summary: "The Consejo de Salubridad General describes itself as a collegiate body that depends directly on the President of the Republic and acts as a health authority with normative, consultative and executive functions, whose general provisions are binding across the country. Article 28 of the Ley General de Salud makes it responsible for the Compendio Nacional de Insumos para la Salud, the national list of medicines and other health supplies to which the public institutions of the national health system must keep; under article 29 each public institution then draws its own list of essential medicines from the Compendio.\n\nThe Normas de Organización y Funcionamiento of the Compendio's commission, published in the Diario Oficial on 10 April 2024, require a request to add a medicine to include an economic evaluation following the council's guide, with a systematic review against the comparators already in the Compendio, a cost-minimisation, cost-effectiveness, cost-utility or cost-benefit analysis, a budget-impact analysis and the model files. The commission has up to sixty working days from acceptance to decide. Article 35 forbids a favourable decision for a medicine that does not meet the guide's criteria on costs and health effects, but allows exceptions, with reasons, for an unmet need, institutional health programmes, the effect on how services are organised, a potential long-term benefit, a health emergency or a request from a public institution or purchaser. Article 77 bis 29 of the Ley General de Salud gives the council the definition of the high-cost treatments the Fondo de Salud para el Bienestar pays for.",
    programs: ["Compendio Nacional de Insumos para la Salud", "Guide for economic evaluation studies", "Definition of high-cost treatments for the Fondo de Salud para el Bienestar"],
    institutions: ["imss-bienestar", "cofepris"],
    links: [
      { label: "Consejo de Salubridad General: ¿Qué hacemos?", url: "https://www.gob.mx/csg/que-hacemos" },
      { label: "Normas de Organización y Funcionamiento de la Comisión del Compendio Nacional de Insumos para la Salud (DOF, 10 April 2024)", url: NORMAS_CNIS },
      { label: "Ley General de Salud, articles 28, 29 and 77 bis 29 (PDF)", url: LGS },
    ] }),

  i({ id: "imss-bienestar", name: "IMSS-Bienestar (Servicios de Salud del Instituto Mexicano del Seguro Social para el Bienestar)", aka: ["IMSS-BIENESTAR", "Servicios de Salud del IMSS para el Bienestar"],
    city: "Mexico City", country: "MX", lat: 19.433, lng: -99.133, institutionType: "government", website: "https://imssbienestar.gob.mx",
    tldr: "IMSS-Bienestar is the federal public body, created in 2022, that gives free medical and hospital care, medicines included, to people in Mexico without social security, in the states that have handed their health services to it, and it is the settlor of the public fund that pays for high-cost treatments.",
    summary: "The decree published in the Diario Oficial on 31 August 2022, last amended on 15 August 2025, created Servicios de Salud del Instituto Mexicano del Seguro Social para el Bienestar as a decentralised public body based in Mexico City. Its purpose, in article 2, is to give people without affiliation to a social security institution comprehensive free medical and hospital care with medicines and associated supplies, in the states that sign coordination agreements to transfer those services to it. Article 77 bis 1 of the Ley General de Salud gives everyone in the country without social security the right to free public health services, medicines and supplies at the point of care.\n\nIMSS-Bienestar is the settlor of the Fondo de Salud para el Bienestar, the public trust whose three purposes, under article 77 bis 29 of the Ley General de Salud, are the care of diseases whose treatments and medicines are high-cost, as defined by the Consejo de Salubridad General; infrastructure and equipment; and complementing the supply of medicines and clinical tests for people without social security. The fund's operating rules, approved by its technical committee on 11 August 2023 and amended since, leave the list of covered interventions to that committee, which must review the financial data on them at least every two years. IMSS-Bienestar's director spoke at the September 2025 presentation of the paediatric module of the national cancer registry.",
    programs: ["Free care for people without social security", "Fondo de Salud para el Bienestar (settlor)", "Paediatric module of the national cancer registry (participant)"],
    institutions: ["consejo-salubridad-general-mexico", "imss-oncologia-siglo-xxi"],
    links: [
      { label: "Decreto de creación de IMSS-Bienestar, consolidated text to 15 August 2025 (PDF)", url: DECRETO_IMSSB },
      { label: "Ley General de Salud, articles 77 bis 1 and 77 bis 29 (PDF)", url: LGS },
      { label: "Reglas de Operación del Fondo de Salud para el Bienestar (Internet Archive copy of 13 January 2026, PDF)", url: FONSABI_RULES },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-mohar-mexico-cancer-registry-network-spm-2024", name: "Implementation of a population-based cancer registry network in Mexico 2017-2020",
    journal: "Salud Pública de México", year: 2024, doi: "10.21149/15258", pmid: "38065103", authors: "Mohar A, Paredes A, Brau-Figueroa H, et al.", paperType: "observational", participants: 13517,
    tldr: "The account, by the people who ran it, of Mexico's network of population-based cancer registries: nine registries covering about 11% of the population counted 13,517 new cancers from 2017 to 2020 before the network was suspended for lack of funds.",
    summary: "The Instituto Nacional de Cancerología coordinated a network of population-based cancer registries created after a 2016 to 2017 reform of the Ley General de Salud established a national cancer registry. Registries in Acapulco, Baja California Sur, Campeche, Guadalajara, Hermosillo, León, Monterrey, Tijuana and Toluca, with a combined 2020 census population of 14,408,621, collected new cases from 1 January 2017 using international (IARC) standards, with 34 registrars hired and trained by the institute and support from the IARC Global Initiative for Cancer Registry Development. Data came from 481 public and private sources; IMSS institutions, which cover around 55% of the population, were not included. Published online on 8 December 2023 in volume 66 (2024).",
    findings: [
      "13,517 new cancers were recorded between 2017 and 2020, 64% in women; more than 85% were histologically confirmed and 6.2% were known from the death certificate only.",
      "Breast cancer was the commonest (23.3%), followed by digestive organs (18.4%) and female genital organs (13.5%); among women cervical cancer was 13.2% of cases and among men prostate cancer was 21.7%.",
      "Children aged 0 to 14 accounted for 416 cases (3.1%), almost half of them leukaemias, and adolescents aged 15 to 19 for 182.",
      "The network was suspended in 2020 because of budgetary restrictions, and cases registered fell sharply that year.",
    ],
    whatItMeans: "Mexico still has no national incidence count of its own: IARC estimates its new cancers from deaths and from registries in neighbouring countries. This paper is the record of the one attempt to build a national network and of why it stopped, and its authors point to the ministry's renewed effort from 2023.",
    caveats: ["The authors call the results partial: the network ran for a short time, 2020 was cut short, and IMSS hospitals were not included, so the counts are not complete incidence for the cities covered.", "No rates or survival were published, only case counts and proportions."],
    institutions: ["incan-mexico", "registro-nacional-cancer-mexico", "iarc"], people: ["oscar-arrieta-rodriguez"], cancers: ["breast-cancer", "cervical"],
    links: [doi("10.21149/15258", "Salud Publica Mex 2024"), pubmed("38065103")] }),
];

export const recordsMX: EntityInput[] = [...institutions, ...papers];
