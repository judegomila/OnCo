import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Argentina: the institutions behind /countries/ar/ (wave 4) that the corpus did not hold. Spanish sources were read
 * in Spanish from the raw text of each page or PDF (pdftotext): ANMAT's own consolidated text of Decree 150/92 and
 * its international relations page, the Superintendencia de Servicios de Salud's Resolution 731/2023 (through the
 * Ministry of Health's e-legis copy) and its reimbursement page, PAMI's own pages, Decree 344/2023 creating CONETEC
 * (Boletín Oficial through the Internet Archive, because the live Boletín did not answer) and CONETEC's own pages, the
 * Registro Oncopediátrico Hospitalario Argentino's 2025 book and page, and the Hospital Garrahan's history page.
 *
 * The Instituto Nacional del Cáncer already has a record (inc-argentina); it was not duplicated. Inbound links: the
 * six institutions link to each other and to inc-argentina through `institutions`, so none depends on the country
 * page for a link.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DEC150 = "http://www.anmat.gob.ar/fna/150.asp";
const ANMAT_INTL = "https://www.argentina.gob.ar/anmat/relaciones-internacionales/escenarios-de-participacion";
const ANMAT_WHAT = "https://www.argentina.gob.ar/anmat/gestion-de-calidad/que-es-la-anmat";
const ANMAT_TRIALS = "https://argentina.gob.ar/sites/default/files/anmat_escenario_de_la_investigacion_clinica_-_cristina_papayannis.pdf";
const SSS_731 = "https://e-legis-ar.msal.gov.ar/legisalud/migration/pdf/sssalres731_2023.pdf";
const SSS_SUR = "https://www.argentina.gob.ar/sssalud/transparencia/subsidios/sur";
const RES_310 = "https://www.argentina.gob.ar/sites/default/files/resolucion_310_2004.pdf";
const PAMI_PLAN = "https://www.pami.org.ar/plan-oncologico";
const PAMI_MEDS = "https://www.pami.org.ar/tramite/medicamentos-oncologicos";
const PAMI_HIST = "https://www.pami.org.ar/historia";
const CONETEC = "https://www.argentina.gob.ar/salud/conetec";
const CONETEC_FUNC = "https://www.argentina.gob.ar/salud/conetec/funcionamiento";
const DEC344 = "https://web.archive.org/web/2024/https://www.boletinoficial.gob.ar/detalleAviso/primera/289801/20230707";
const ROHA = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/roha";
const ROHA_BOOK = "https://www.argentina.gob.ar/sites/default/files/2024/04/manual_registro_oncopediatrico_hospitalario_argentino_1642025.pdf";
const LEY_27674 = "https://www.argentina.gob.ar/salud/dnc/derechos-ley-27674-regimen-de-proteccion-integral-del-nino-nina-y-adolescente-con-cancer";
const GARRAHAN = "https://www.garrahan.gov.ar/hospital/historia";

const institutions: InstitutionInput[] = [
  i({ id: "anmat", name: "Administración Nacional de Medicamentos, Alimentos y Tecnología Médica (ANMAT)", aka: ["ANMAT", "National Administration of Drugs, Foods and Medical Technology"],
    city: "Buenos Aires", country: "AR", lat: -34.609, lng: -58.38, institutionType: "government", website: "https://www.argentina.gob.ar/anmat",
    tldr: "Argentina's medicines regulator. It registers medicines, authorises clinical trials of medicines and inspects factories, and a medicine already authorised in one of fifteen named countries can be registered for import through a shorter route.",
    summary: "The Administración Nacional de Medicamentos, Alimentos y Tecnología Médica is a decentralised body within Argentina's Ministry of Health with jurisdiction across the country. Its functions were set by Decree 1490 of 1992: control of the quality and safety of medicines, diagnostics, medical technology, food and cosmetics, and surveillance of adverse effects. Its address is Avenida de Mayo 869, Buenos Aires; the coordinates on this record are approximate.\n\nMedicines are registered under Decree 150 of 1992, in the text ordered by Decrees 1890/92 and 177/93 that ANMAT publishes. Article 3 gives the authority 120 calendar days to decide an application, except for the routes in articles 4 and 5. Article 4 lets a medicine authorised for public use in at least one of the countries in Annex I (the United States, Japan, Sweden, Switzerland, Israel, Canada, Austria, Germany, France, the United Kingdom, the Netherlands, Belgium, Denmark, Spain and Italy) be registered for import automatically, on presentation of the official certificate of that authorisation, labels, leaflets and bioavailability data. Article 5 requires evidence of efficacy and safety for a new medicine not authorised in an Annex I country.\n\nANMAT states that the Pan American Health Organization re-qualified it in 2017 as a regional reference regulatory authority for medicines and vaccines, that its inspectorate has been a full member of the Pharmaceutical Inspection Co-operation Scheme since 2008, and that it has been a regulatory member of the International Council for Harmonisation since 2024. Its clinical trials area evaluates trials under Disposition 6677/10; an analysis by its own staff of the 327 trials submitted from June 2017 to June 2019 found neoplasms the commonest therapeutic area (79 trials, 24.15%) and a mean evaluation time of 58 working days for the trials it approved (median 52).\n\nLater amendments to Decree 150/92, if any, were not read for this record.",
    programs: ["Registro de Especialidades Medicinales (medicine registration, Decree 150/92)", "Automatic import registration for medicines authorised in an Annex I country (article 4)", "Clinical trial authorisation (Disposition 6677/10)", "National pharmacovigilance system"],
    institutions: ["inc-argentina", "conetec-argentina", "superintendencia-servicios-salud-argentina"],
    links: [
      { label: "ANMAT: Decreto 150/92, texto ordenado (Decrees 1890/92 and 177/93), articles 3 to 5 and Annex I", url: DEC150 },
      { label: "ANMAT: qué es la ANMAT (Decree 1490/92)", url: ANMAT_WHAT },
      { label: "ANMAT: escenarios de participación internacional (PAHO, PIC/S, ICH)", url: ANMAT_INTL },
      { label: "Papayannis et al., ANMAT: escenario actual de la investigación clínica farmacológica (poster, PDF)", url: ANMAT_TRIALS },
    ] }),

  i({ id: "superintendencia-servicios-salud-argentina", name: "Superintendencia de Servicios de Salud (Argentina)", aka: ["SSSalud", "Superintendencia de Servicios de Salud", "Superintendency of Health Services"],
    city: "Buenos Aires", country: "AR", lat: -34.603, lng: -58.381, institutionType: "government", website: "https://www.argentina.gob.ar/sssalud",
    tldr: "The national body that regulates Argentina's social health insurance funds, the obras sociales. It runs the solidarity fund that reimburses the funds for rare, very expensive and long treatments, including cancer medicines.",
    summary: "The Superintendencia de Servicios de Salud was formed by Decree 1615 of 1996, which merged the national health insurance administration (ANSSAL), the national institute of obras sociales (INOS) and the national directorate of obras sociales (DINOS) into one decentralised body. It regulates the insurers of the national health insurance system under Laws 23.660 and 23.661 and administers the Fondo Solidario de Redistribución. The insurers must give their members the Programa Médico Obligatorio, the basic package set by Ministry of Health resolution; under the 2011 prepaid medicine law (Law 26.682, as enacted) private prepaid plans must also cover at least that package.\n\nFrom the solidarity fund it pays reimbursements to the insurers for care of low incidence and high economic impact and for prolonged treatments. Resolution 1200 of 2012 created the Sistema Único de Reintegro (SUR) for this; Resolution 731 of 28 March 2023 replaced it with the Sistema Único de Reintegro por Gestión de Enfermedades (SURGE), for services given from 1 April 2023, with the procedures, medicines and maximum amounts set in its annexes. The Superintendencia publishes quarterly reports of its reimbursement transfers to the obras sociales under SUR and SURGE.\n\nThe annexes listing the cancer medicines and amounts were not read for this record. The coordinates are a Buenos Aires centroid, not the office's address.",
    programs: ["Regulation of the obras sociales of the national health insurance system", "Fondo Solidario de Redistribución", "SURGE reimbursements for high-cost and prolonged treatments (Resolution 731/2023)"],
    institutions: ["pami-argentina", "conetec-argentina", "anmat"],
    links: [
      { label: "SSSalud: Resolución 731/2023 creating SURGE (e-legis copy of the Boletín Oficial, PDF)", url: SSS_731 },
      { label: "SSSalud: Sistema Único de Reintegro (SUR + SURGE), transfers by year", url: SSS_SUR },
      { label: "Ministerio de Salud: Resolución 310/2004, Programa Médico Obligatorio (PDF)", url: RES_310 },
      { label: "InfoLEG: Ley 26.682, marco regulatorio de medicina prepaga (2011)", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/180000-184999/182180/norma.htm" },
    ] }),

  i({ id: "pami-argentina", name: "PAMI (Instituto Nacional de Servicios Sociales para Jubilados y Pensionados)", aka: ["PAMI", "INSSJP", "Instituto Nacional de Servicios Sociales para Jubilados y Pensionados"],
    city: "Buenos Aires", country: "AR", lat: -34.603, lng: -58.381, institutionType: "government", website: "https://www.pami.org.ar",
    tldr: "Argentina's health insurer for retired people and pensioners, created in 1971, which says it covers 5 million people. It pays all of the cost of cancer medicines for its members and runs a cancer care plan.",
    summary: "The Instituto Nacional de Servicios Sociales para Jubilados y Pensionados, known as PAMI, was created in 1971 to give comprehensive medical care to older people. It describes itself as the largest obra social in Latin America, covering 5 million retired people and their dependants, pensioners and veterans of the Malvinas war.\n\nPAMI states that it covers 100% of the cost of cancer medicines for its members, prescribed on an electronic prescription with a form and a clinical summary. Its Plan Integral de Cuidado y Tratamiento Oncológico (PICTO) gives members on its list of cancer patients (those who have seen an oncologist, are on specific drug treatment, are having radiotherapy or have had cancer surgery) a choice of oncologist, simplified procedures, faster appointments, psycho-oncology support and a dedicated telephone line. How many of its members are treated for cancer was not found on the pages read; figures on this in the plan page's markup are not displayed on the page and are not used here.\n\nThe coordinates are a Buenos Aires centroid, not the office's address.",
    programs: ["100% coverage of cancer medicines", "Plan Integral de Cuidado y Tratamiento Oncológico (PICTO)", "Psycho-oncology support"],
    institutions: ["superintendencia-servicios-salud-argentina", "inc-argentina"],
    links: [
      { label: "PAMI: Plan Oncológico (PICTO)", url: PAMI_PLAN },
      { label: "PAMI: medicamentos oncológicos (trámite)", url: PAMI_MEDS },
      { label: "PAMI: historia", url: PAMI_HIST },
    ] }),

  i({ id: "conetec-argentina", name: "Comisión Nacional de Evaluación de Tecnologías Sanitarias y Excelencia Clínica (CONETEC)", aka: ["CONETEC", "Comisión Nacional de Evaluación de Tecnologías de Salud"],
    city: "Buenos Aires", country: "AR", lat: -34.603, lng: -58.381, institutionType: "government", website: CONETEC,
    tldr: "Argentina's national health technology assessment commission. It assesses medicines and other technologies and recommends whether and how they should be covered; its recommendations are the national technical reference, and the technical definitions put to it bind the national Ministry of Health.",
    summary: "The Comisión Nacional de Evaluación de Tecnologías de Salud was first created by Ministry of Health Resolution 623 of 2018. Decree 344 of 6 July 2023 re-created it as the Comisión Nacional de Evaluación de Tecnologías Sanitarias y Excelencia Clínica, a deconcentrated body under the Ministry's Secretariat of Access to Health, with the task of assessing health technologies by the quality of the evidence, clinical benefit and economic impact, and of formulating technical recommendations on their incorporation, disinvestment, form of use, financing and coverage. The decree makes the technical definitions submitted to it binding on the Ministry of Health and its decentralised and deconcentrated bodies; its page adds that the recommendations apply to the whole health system and that its reports are public.\n\nIt works through tables: patients, prioritisation, a technical table that votes on the domains of a value framework, recommendations, transparency and researchers who carry out the assessments, and it runs public consultations on draft reports. No cost-effectiveness threshold was stated on the pages read, and its list of published assessments is loaded by a script and was not read.",
    programs: ["Health technology assessment and coverage recommendations", "Prioritisation of technologies to assess", "Public consultations", "Clinical practice guidelines"],
    terms: ["hta"], institutions: ["superintendencia-servicios-salud-argentina", "anmat", "inc-argentina"],
    links: [
      { label: "CONETEC (Ministerio de Salud)", url: CONETEC },
      { label: "CONETEC: funcionamiento y mesas de trabajo", url: CONETEC_FUNC },
      { label: "Decreto 344/2023, Boletín Oficial (Internet Archive copy)", url: DEC344 },
      { label: "Ministerio de Salud: Resolución 623/2018 (PDF)", url: "https://argentina.gob.ar/sites/default/files/resolucion_623-18.pdf" },
    ] }),

  i({ id: "roha-argentina", name: "Registro Oncopediátrico Hospitalario Argentino (ROHA)", aka: ["ROHA", "Argentine Hospital Paediatric Cancer Registry"],
    city: "Buenos Aires", country: "AR", lat: -34.613, lng: -58.381, institutionType: "government", website: ROHA,
    tldr: "Argentina's national registry of childhood cancer, founded in 2000 and now run by the Ministry of Health. It collects children's cancers from 91 reporting sources and estimates that it captures about nine in ten of the cases expected.",
    summary: "The Registro Oncopediátrico Hospitalario Argentino was created in 2000 by the Fundación Kaleidos and became part of the Instituto Nacional del Cáncer, now the Ministry of Health's Dirección Nacional del Cáncer, in 2010. Its network of 91 reporting sources covers the providers of children's haemato-oncology in the country, and it has registered adolescents aged 15 to 19 since 2010 (formally since 2016, by its 2025 book).\n\nIts 2025 book, covering 2000 to 2022, counts 31,241 cancers in children under 15 and about 4,800 in those aged 15 to 19. Incidence in children under 15 was 131.0 a year per million children over the period and stable; the registry's average of 1,358 cases a year is about 92% of the 1,484 expected if Argentina had the average rate of the International Incidence of Childhood Cancer series. Five-year survival for children diagnosed in 2010 to 2019 was 70.3% and ten-year survival 67.7%, up from 59.7% five-year survival for those diagnosed in 2000 to 2004; it was 70.7% for leukaemias, 60.9% for central nervous system tumours, 84.5% for lymphomas and 52.3% for bone tumours. In 2013 to 2022, 76% of children were treated in public hospitals and 24% in private centres, and in 2018 to 2022, 48% moved to another province for part of their treatment.\n\nUnder the childhood cancer law (Law 27.674, regulated by Decree 68/2023), registration in ROHA is how a child obtains the Certificado Único Oncopediátrico that gives access to the law's benefits. The coordinates are those of the Ministry of Health building, not of the registry's office.",
    programs: ["Registration of cancers in children and adolescents (since 2000)", "Incidence, survival and mortality reports", "Gateway to the Certificado Único Oncopediátrico under Law 27.674"],
    institutions: ["inc-argentina", "hospital-garrahan"], people: ["florencia-moreno"],
    links: [
      { label: "Ministerio de Salud: Registro Oncopediátrico Hospitalario Argentino", url: ROHA },
      { label: "ROHA: Tendencia de incidencia 2000-2022, supervivencia 2010-2019 (2025, PDF)", url: ROHA_BOOK },
      { label: "Dirección Nacional del Cáncer: Ley 27.674 and the Certificado Único Oncopediátrico", url: LEY_27674 },
    ] }),

  i({ id: "hospital-garrahan", name: "Hospital de Pediatría SAMIC Prof. Dr. Juan P. Garrahan", aka: ["Hospital Garrahan", "Garrahan"],
    city: "Buenos Aires", country: "AR", lat: -34.63, lng: -58.392, institutionType: "hospital", website: "https://www.garrahan.gov.ar",
    tldr: "A children's hospital in Buenos Aires, created in 1987, whose founding programme set out to make it a referral hospital for the whole country. It is one of the hospitals that report children's cancers to the national childhood cancer registry.",
    summary: "The Hospital de Pediatría Prof. Dr. Juan P. Garrahan was created by national Decree 598 of 20 April 1987 as the Ente Hospital de Pediatría SAMIC under Law 17.102, a model its history describes as strongly decentralised. Its founding medical programme, drafted from 1969 by paediatricians of the Hospital de Niños Ricardo Gutiérrez led by Carlos Gianantonio, set out to give the most complex paediatric care and to make it a referral hospital for the whole country, with teaching and research. It stands at Combate de los Pozos 1881 in Buenos Aires, with the patient entrance on Pichincha.\n\nThe hospital appears among the reporting sources of the Registro Oncopediátrico Hospitalario Argentino in its 2025 book, and in 2008 its foundation and the registry published a guide on when to suspect cancer in a child. The registry reports that 45% of the childhood cancers reported by public hospitals were treated in two reference centres, without naming them on the pages read; the hospital's own case numbers were not read for this record.",
    programs: ["National paediatric referral hospital", "Paediatric haematology and oncology reporting to ROHA"],
    institutions: ["roha-argentina"],
    links: [
      { label: "Hospital Garrahan: historia", url: GARRAHAN },
      { label: "ROHA: list of reporting sources (2025 book, PDF)", url: ROHA_BOOK },
      { label: "Ministerio de Salud: ROHA, including the 2008 guide with the Garrahan foundation", url: ROHA },
    ] }),
];

/** Records behind /countries/ar/ (wave 4). */
export const recordsAR: EntityInput[] = [...institutions];
