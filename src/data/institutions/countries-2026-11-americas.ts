import type { InstitutionInput } from "@/lib/schema";

/**
 * Institutions for under-covered countries in Central America and the Caribbean (census fill, November 2026), largest
 * cancer burden first: Dominican Republic, Guatemala, Honduras, El Salvador, Panama, Nicaragua, Jamaica, Trinidad and
 * Tobago, Guyana, Suriname, the Bahamas, Barbados, Curaçao and Belize. Saint Lucia has none (see "Not read").
 *
 * Read as raw text on 11 November 2026: IAEA DIRAC's public equipment data (the JSON behind
 * dirac.iaea.org/Data/CountriesLight, every operator in these countries, with its equipment counts and last update);
 * UICC's member pages for the Liga Nacional Contra el Cáncer (Guatemala), the Liga Dominicana Contra el Cáncer, the
 * Patronato Cibaeño Contra el Cáncer, the Asociación Hondureña de Lucha contra el Cáncer, the Liga Contra el Cáncer
 * (Honduras) and the Fundación Hondureña para el Niño con Cáncer; AGN (Guatemala's government news agency) on the 2022
 * MSPAS and Liga agreement; and each institution's own pages where they answered: SNS (who we are, cancer detection
 * programme), CEDIMAT (history, haemato-oncology unit), HOMS (cancer centre), IGSS (home page, 2025 services portfolio
 * PDF), Hospital Roosevelt (history), Grupo Ángeles's CRECE site, SESAL Honduras (cancer portal), Hospital Escuela
 * (history), the Fundación Hondureña para el Niño con Cáncer (history, hospital locations, model of care), ISSS El
 * Salvador (home page, service guide), MINSA Panama (home page, October 2026 cancer prevention news), CHOP (home, who we
 * are, research), The Panama Clinic (home page), Hospiten Paitilla (home, oncology), MINSA Nicaragua (home page and its
 * lists of hospitals and specialised centres), Jamaica's National Health Fund (home, about), the Western Regional Health
 * Authority (about), UWI Mona (home page), the Ministry of Health of Trinidad and Tobago (home, Chemistry, Food and Drugs
 * Division), the North West Regional Health Authority (services by speciality), Guyana's Ministry of Health (home,
 * cervical cancer screening voucher), GPHC (cancer care, history), the Cancer Institute of Guyana (home, about, radiation
 * therapy), the Queen Elizabeth Hospital (about, radiotherapy), Barbados's Ministry of Health and Wellness
 * (pharmaceutical services), Curaçao Medical Center (oncology/haematology and radiotherapy, in Papiamentu), the Karl
 * Heusner Memorial Hospital (home page), Belize's Ministry of Health and Wellness (contact page), Global Oncology's Belize
 * page, Amandala (May 2020, on the KHMH oncology unit), the UK government's lists of medical facilities in the Bahamas,
 * Suriname and Barbados, and The Tribune (Bahamas, October 2020) on chemotherapy at Princess Margaret Hospital.
 * ClinicalTrials.gov facility names come from the trials the corpus already holds; a trial is linked to an institution
 * only where the facility name names it (and, for GATSBY, where CHOP's own protocol list names the trial).
 *
 * Coordinates: IAEA DIRAC's operator coordinates for every centre DIRAC lists; Wikidata P625 for Hospital Escuela
 * (Q17633897), Georgetown Public Hospital (Q5547032), Karl Heusner Memorial Hospital (Q6371904), Cornwall Regional
 * Hospital (Q30254192), Kingston Public Hospital (Q104863743), the Academic Hospital Paramaribo (Q23926511) and MINSA
 * Nicaragua (Q30282287); OpenStreetMap Nominatim for IGSS, Hospital Roosevelt, UWI Mona, Princess Margaret Hospital and
 * Pacific Center (The Panama Clinic); Nominatim city points, said so in the summary, for the rest.
 *
 * Not read: mspas.gob.gt (HTTP 403), salud.gob.sv (HTTP 403), ihss.hn (HTTP 403), inss.gob.ni (HTTP 403), moh.gov.jm
 * (HTTP 403), bahamas.gov.bs/health (HTTP 403); msp.gob.do (a 177-byte JavaScript shell); senasa.gob.do, the INCAN and
 * Liga sites (ligacancerguate.com), ccerc.org (Emma Romero), ligacontraelcancer.hn, hospitalbloom.gob.sv,
 * hospitalrosales.gob.sv, dnm.gob.sv (medicines regulator), cirro.com.pa, serha.gov.jm (Kingston Public Hospital),
 * smsl.co.tt, medcorpcancercentre.com, health.govt.lc and iorc.org.do did not answer (no connection); iohp.org (the
 * Heriberto Pieter institute's address on UICC's page) returned 404; uhwi.gov.jm is a suspended hosting page;
 * okeuhospital.org is a lapsed domain; the Public Hospitals Authority of the Bahamas site is under construction; khmh.bz
 * pages other than the home page returned 404; the NHF card coverage page and the SNS home page render their lists in
 * JavaScript; Grupo Ángeles's English pages returned HTTP 500; the Hospital Bloom oncology manual on transparencia.gob.sv
 * returned 404; ESMO's page for INCAN returned 404. National cancer registries were not found for any country here
 * except Guatemala (the Liga's registry department); Saint Lucia's Ministry of Health and its hospitals could not be read,
 * so no Saint Lucia record is written.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DIRAC = { label: "IAEA DIRAC: directory of radiotherapy centres, equipment by operator", url: "https://dirac.iaea.org/Data/CountriesLight" };
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct} (site list)`, url: `https://clinicaltrials.gov/study/${nct}` });

const UICC_DO_LIGA = "https://www.uicc.org/membership/liga-dominicana-contra-el-cancer";
const UICC_DO_PCCC = "https://www.uicc.org/membership/patronato-cibaeno-contra-el-cancer";
const SNS_CANCER = "https://sns.gob.do/servicios/programa-deteccion-de-cancer/";
const UICC_GT_LIGA = "https://www.uicc.org/membership/liga-nacional-contra-el-cancer-guatemala";
const AGN_INCAN = "https://agn.gt/firman-acuerdo-para-que-pacientes-referidos-por-hospitales-nacionales-sean-atendidos-en-incan/";
const IGSS_PDF = "https://www.igssgt.org/wp-content/uploads/2026/09/Portafolio-de-Servicios-IGSS.pdf";
const CRECE_GA = "https://crece.xplorandoguatemala.com/notas/grupo-ngeles";
const UICC_HN_AHLCC = "https://www.uicc.org/membership/asociacion-hondurena-de-lucha-contra-el-cancer";
const UICC_HN_LIGA = "https://www.uicc.org/membership/liga-contra-el-cancer-honduras";
const UICC_HN_FHNC = "https://www.uicc.org/membership/fundacion-hondurena-para-el-nino-con-cancer";
const FHNC_LOCATIONS = "https://salvamivida.org/ubicaciones";
const FHNC_HISTORY = "https://salvamivida.org/nuestro-comienzo";
const SESAL_CANCER = "https://www.salud.gob.hn/vistas/portalcancer.html";
const CHOP_RESEARCH = "https://www.chop.com.pa/investigacion/";
const MINSA_NI_HOSPITALS = "https://www.minsa.gob.ni/index.php/red-de-salud/hospitales";
const GLOBALONC_BZ = "https://www.globalonc.org/belize";

const institutions: InstitutionInput[] = [
  // Dominican Republic (DO)
  i({ id: "heriberto-pieter-oncology-institute", name: "Instituto de Oncología Dr. Heriberto Pieter", aka: ["Heriberto Pieter Oncology Institute", "Instituto Oncológico Dr. Heriberto Pieter", "Liga Dominicana Contra el Cáncer"],
    city: "Santo Domingo", country: "DO", lat: 18.454, lng: -69.928, institutionType: "cancer-center",
    tldr: "A cancer hospital in Santo Domingo with radiotherapy machines, at the address the Dominican League Against Cancer gives as its home. It is a separate institution from the National Cancer Institute nearby.",
    summary: "UICC's member page for the Liga Dominicana Contra el Cáncer, a full member, gives the league's address as the Instituto de Oncología Dr Heriberto Pieter, Calle Bernardo Correa y Cidrón No 1, Santo Domingo. IAEA DIRAC lists the institute in Santo Domingo with two linear accelerators, one brachytherapy unit and two CT scanners (entry last updated 2018). The National Cancer Institute (INCART) is a separate public institute on the same avenue; DIRAC lists it as its own centre. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (two linear accelerators and brachytherapy in IAEA DIRAC)"],
    // TODO: re-link incart-dominican-republic (defined in the country deep dive, PR #395) once it merges.
    institutions: ["iaea"],
    links: [{ label: "UICC: Liga Dominicana Contra el Cáncer (member page, address)", url: UICC_DO_LIGA }, DIRAC] }),

  i({ id: "iorc-santiago-dominican-republic", name: "Instituto Oncológico Regional del Cibao", aka: ["IORC", "Regional Oncology Institute of Cibao", "Patronato Cibaeño Contra el Cáncer", "Centro de Radioterapia IORC"],
    city: "Santiago de los Caballeros", country: "DO", lat: 19.455, lng: -70.7, institutionType: "cancer-center",
    tldr: "A charity cancer hospital in Santiago de los Caballeros, in the north of the Dominican Republic, with surgery, chemotherapy, radiotherapy and palliative care.",
    summary: "The Instituto Oncológico Regional del Cibao is the hospital of the Patronato Cibaeño Contra el Cáncer, a private not-for-profit organisation founded in October 1964 and an associate member of UICC since 2002. UICC's member page describes the hospital as having 40 beds and 110 salaried staff, with diagnostic imaging, clinical and pathology laboratories, nuclear medicine, surgery, clinical oncology, radiotherapy and palliative care, financed by donations, low-cost charges to patients and a small annual government allocation. IAEA DIRAC lists the Centro de Radioterapia IORC at the same address, Pedro Francisco Bonó 33, with one linear accelerator and one brachytherapy unit (entry last updated 2021). Coordinates are DIRAC's.",
    programs: ["Clinical oncology", "Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)", "Nuclear medicine", "Palliative care"],
    institutions: ["homs-santiago-dominican-republic", "iaea"],
    links: [{ label: "UICC: Patronato Cibaeño Contra el Cáncer (member page)", url: UICC_DO_PCCC }, DIRAC] }),

  i({ id: "sns-dominican-republic", name: "Servicio Nacional de Salud (República Dominicana)", aka: ["SNS", "National Health Service, Dominican Republic"],
    city: "Santo Domingo", country: "DO", lat: 18.471, lng: -69.892, institutionType: "government", website: "https://sns.gob.do",
    tldr: "The public body that runs the Dominican Republic's public hospitals. It runs a free programme that checks for breast, cervical and prostate cancer at ten public hospitals, including the National Cancer Institute.",
    summary: "The Servicio Nacional de Salud was created on 16 July 2015 by Law 123-15 as a public body with its own legal personality, attached to the Ministry of Public Health and Social Assistance, to run the network of regional public health services. Its Programa Detección de Cáncer de Mama, Cervicouterino y Próstata offers free laboratory tests, imaging, gynaecology and oncology consultations, biopsy and treatment where cancer is confirmed, for women aged 40 and over (breast), women aged 25 to 60 (cervix) and men aged 40 and over (prostate) who have lived for six months in a province with a participating hospital. The ten listed hospitals include INCART in the Distrito Nacional, Hospital Presidente Estrella Ureña in Santiago and Hospital Jaime Mota in Barahona. The coordinates are an approximate Santo Domingo city point.",
    programs: ["Programa Detección de Cáncer de Mama, Cervicouterino y Próstata (ten hospitals)"],
    // TODO: re-link incart-dominican-republic, sisalril-dominican-republic (defined in the country deep dive, PR #395) once it merges.
    cancers: ["breast-cancer", "cervical", "prostate"],
    links: [
      { label: "SNS: who we are (Law 123-15)", url: "https://sns.gob.do/sobre-nosotros/quienes-somos/" },
      { label: "SNS: breast, cervical and prostate cancer detection programme", url: SNS_CANCER },
    ] }),

  i({ id: "cedimat-dominican-republic", name: "CEDIMAT (Santo Domingo)", aka: ["CEDIMAT", "Centro Gamma Knife Dominicano", "Centro Avanzado de Radioterapia Savia Care"],
    city: "Santo Domingo", country: "DO", lat: 18.488, lng: -69.924, institutionType: "hospital", website: "https://cedimat.com",
    tldr: "A medical centre at the Plaza de la Salud in Santo Domingo with a blood cancer and cancer unit, and with radiotherapy and a Gamma Knife radiosurgery centre on its campus.",
    summary: "CEDIMAT's own history says the centre was inaugurated on 17 March 1999 and began operating in August that year with diagnostic imaging, adding a cardiovascular centre in 2016; it lists nuclear medicine among its services. Its Unidad de Hemato-Oncología has offered specialist consultations, outpatient haemato-oncology therapy and admissions, pain treatment and emotional support since 2011, with haematologists and oncologists on staff. IAEA DIRAC lists two operators at the Plaza de la Salud and CEDIMAT: the Centro Avanzado de Radioterapia, Savia Care, with two linear accelerators (entry last updated 2021), and the Centro Gamma Knife Dominicano at CEDIMAT (entry last updated 2018). Coordinates are DIRAC's.",
    programs: ["Unidad de Hemato-Oncología (from 2011)", "Radiotherapy, Savia Care (two linear accelerators in IAEA DIRAC)", "Gamma Knife radiosurgery", "Nuclear medicine"],
    institutions: ["heriberto-pieter-oncology-institute", "iaea"],
    links: [
      { label: "CEDIMAT: about us (history)", url: "https://cedimat.com/index.php/sobre-nosotros/" },
      { label: "CEDIMAT: haemato-oncology unit", url: "https://cedimat.com/index.php/medicina/unidad-de-hemato-oncologia/" },
      DIRAC,
    ] }),

  i({ id: "homs-santiago-dominican-republic", name: "Hospital Metropolitano de Santiago (HOMS)", aka: ["HOMS", "Metropolitan Hospital of Santiago", "Centro de Cáncer HOMS"],
    city: "Santiago de los Caballeros", country: "DO", lat: 19.42, lng: -70.649, institutionType: "hospital", website: "https://homs.com.do",
    tldr: "A hospital in Santiago de los Caballeros with a cancer centre offering chemotherapy in a day unit, radiotherapy and nuclear medicine.",
    summary: "HOMS's cancer centre page describes outpatient consultations by 15 specialists (clinical oncology, radiation oncology, onco-haematology, palliative care, haematology, psycho-oncology, nutrition and cardio-oncology), a day hospital with 13 chairs and two suites for intravenous chemotherapy and immunotherapy, a radiotherapy unit offering 3D conformal radiotherapy, IMRT, IGRT, VMAT and stereotactic radiosurgery, and nuclear medicine. IAEA DIRAC lists the Hospital Metropolitano de Santiago with two linear accelerators and a CT scanner (entry last updated 2025). Coordinates are DIRAC's.",
    programs: ["Centro de Cáncer: day hospital for chemotherapy and immunotherapy", "Radiotherapy (two linear accelerators in IAEA DIRAC)", "Nuclear medicine"],
    institutions: ["iorc-santiago-dominican-republic", "iaea"],
    links: [{ label: "HOMS: Centro de Cáncer", url: "https://homs.com.do/centros-de-servicios/centro-de-cancer/" }, DIRAC] }),

  // Guatemala (GT)
  i({ id: "incan-guatemala", name: "Instituto de Cancerología y Hospital Dr. Bernardo del Valle S. (INCAN)", aka: ["INCAN", "Liga Nacional Contra el Cáncer", "National Cancer Institute of Guatemala", "National League Against Cancer, Guatemala"],
    city: "Guatemala City", country: "GT", lat: 14.616, lng: -90.541, institutionType: "cancer-center",
    tldr: "A cancer hospital in Guatemala City run by the National League Against Cancer, a charity that also keeps a national cancer registry. Under an agreement with the Ministry of Health it treats patients sent from public hospitals.",
    summary: "UICC's member page says the Liga Nacional Contra el Cáncer was founded in 1953 and is financed by donations, charges to patients who can pay, and an annual allocation from the Ministry of Public Health; it runs its hospital, the Instituto de Cancerología Dr. Bernardo del Valle S. (INCAN), from 1957, a Department of National Cancer Registry from 1975, and prevention and education through PIENSA from 1996. In February 2022 the Ministry (MSPAS) and the Liga signed an agreement for INCAN to treat at least 3,500 cancer patients referred by national hospitals that year, against 1,600 in 2021, covering chemotherapy, radiotherapy, surgery, minor procedures, biopsies and outpatient follow-up (AGN). IAEA DIRAC lists the Liga Nacional Contra el Cáncer at 6a avenida \"A\" 6-58, zona 11, with three linear accelerators, two brachytherapy units and a CT scanner (entry last updated 2023). Coordinates are DIRAC's.",
    programs: ["Chemotherapy, radiotherapy and surgery for patients referred from public hospitals (MSPAS agreement)", "Radiotherapy (three linear accelerators and brachytherapy in IAEA DIRAC)", "Department of National Cancer Registry (from 1975)", "PIENSA prevention and education (from 1996)"],
    // TODO: re-link unop-guatemala (defined in the country deep dive, PR #395) once it merges.
    institutions: ["igss-guatemala", "hospital-roosevelt-guatemala", "iaea"],
    links: [
      { label: "UICC: Liga Nacional Contra el Cáncer Guatemala (member page)", url: UICC_GT_LIGA },
      { label: "AGN: agreement for INCAN to treat patients referred by national hospitals (February 2022)", url: AGN_INCAN },
      DIRAC,
    ] }),

  i({ id: "igss-guatemala", name: "Instituto Guatemalteco de Seguridad Social (IGSS)", aka: ["IGSS", "Guatemalan Social Security Institute"],
    city: "Guatemala City", country: "GT", lat: 14.626, lng: -90.515, institutionType: "government", website: "https://www.igssgt.org",
    tldr: "Guatemala's social security institute, which insures formal workers and their families and runs its own hospitals. It says it protects more than 3.8 million people.",
    summary: "IGSS was created by Decree 295 of the Congress, its organic law, of 28 October 1946, as an autonomous public institution running a national, single and compulsory social security scheme; the 1985 Constitution guarantees social security in article 100. Its 2025 services portfolio describes two programmes: invalidity, old age and survivors (IVS), and sickness, maternity and accidents (EMA), which covers medical care and dispenses medicines to members through ODEMPA. Its home page, read on 11 November 2026, says it protects more than 3.8 million people. OnCo did not find a published list of the cancer treatments it covers. The coordinates are Nominatim's for its central offices, 7a avenida 22-72, zona 1.",
    programs: ["Sickness, Maternity and Accidents programme (EMA)", "Invalidity, Old Age and Survivors programme (IVS)"],
    institutions: ["incan-guatemala", "grupo-medico-angeles-guatemala"],
    links: [{ label: "IGSS: home page", url: "https://www.igssgt.org/" }, { label: "IGSS: 80 years (October 2026)", url: "https://www.igssgt.org/noticias/2026/10/30/el-igss-80-anos-de-historia-proteccion-y-compromiso-con-guatemala/" }, { label: "IGSS: services portfolio, second edition 2025 (PDF)", url: IGSS_PDF }] }),

  i({ id: "hospital-roosevelt-guatemala", name: "Hospital Roosevelt", aka: ["Roosevelt Hospital, Guatemala City"],
    city: "Guatemala City", country: "GT", lat: 14.614, lng: -90.542, institutionType: "hospital", website: "https://hospitalroosevelt.gob.gt",
    tldr: "A public referral hospital in Guatemala City that treats people sent from departmental and regional hospitals across the country free of charge.",
    summary: "Hospital Roosevelt's own history says construction began in 1944, with support from the United States government, and finished in 1955, and that a radioisotope laboratory opened in 1962 with a cobalt-60 unit among the donated equipment. It describes itself as receiving patients from the capital and referred from departmental and regional hospitals across the country, providing specialised medical and hospital services free of charge in internal medicine, surgery, gynaecology, paediatrics, ophthalmology and other subspecialties. ClinicalTrials.gov lists Hospital Roosevelt as a Guatemala City site of the HERA trial of trastuzumab after surgery for HER2-positive breast cancer. Coordinates are Nominatim's.",
    programs: ["Free public specialist care for patients referred from across Guatemala"],
    // TODO: re-link unop-guatemala (defined in the country deep dive, PR #395) once it merges.
    institutions: ["incan-guatemala"],
    links: [{ label: "Hospital Roosevelt: history", url: "https://hospitalroosevelt.gob.gt/historia/" }, ct("NCT00045032")] }),

  i({ id: "grupo-medico-angeles-guatemala", name: "Grupo Médico Ángeles (Guatemala)", aka: ["Grupo Angeles", "Grupo Medico Angeles", "Angeles Medical Group, Guatemala"],
    city: "Guatemala City", country: "GT", lat: 14.642, lng: -90.513, institutionType: "hospital",
    tldr: "A group of oncologists in Guatemala City that has been a site for many international cancer drug trials, in breast, stomach and lung cancer among others.",
    summary: "Grupo Médico Ángeles is listed on ClinicalTrials.gov as a Guatemala City site of trials the corpus holds, including ALEX, APHINITY, CLEOPATRA, GATSBY, KATHERINE, IMpassion130, OAK, LIDERA and HERIZON-GEA-01. Its CRECE website names Hugo Castro, a medical oncologist trained at the Instituto Nacional de Ciencias Médicas y Nutrición Salvador Zubirán in Mexico and an associate professor of the Guatemala National Cancer Institute, as medical director, with research interests in the natural history of breast cancer, and describes him as a co-investigator in multicentre trials in breast, lung and gastric cancer. The coordinates are an approximate Guatemala City point.",
    programs: ["Clinical trial site (breast, gastric, lung and other solid tumours)"],
    institutions: ["incan-guatemala"],
    links: [{ label: "CRECE: Grupo Ángeles (medical directors)", url: CRECE_GA }, ct("NCT01358877"), ct("NCT04961996"), ct("NCT05152147")] }),

  i({ id: "cem-quetzaltenango-radiotherapy", name: "Corporación de Especialidades Médicas, S.A. (Quetzaltenango)", aka: ["Corporación de Especialidades Médicas"],
    city: "Quetzaltenango", country: "GT", lat: 14.861, lng: -91.471, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in Quetzaltenango, in western Guatemala. It is the one radiotherapy centre that the international directory lists outside Guatemala City.",
    summary: "IAEA DIRAC lists the Corporación de Especialidades Médicas, S.A. in Quetzaltenango with one linear accelerator and one brachytherapy unit (entry last updated 2026). The other Guatemalan centres DIRAC lists (the Liga Nacional Contra el Cáncer, the Centro de Radioterapia y Oncología, the Clínica de Radioterapia La Asunción and the Centro de Radioterapia Hope International) are all in Guatemala City. OnCo found no website for it. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)"],
    institutions: ["incan-guatemala", "iaea"],
    links: [DIRAC] }),

  // Honduras (HN)
  i({ id: "sesal-honduras", name: "Secretaría de Salud de Honduras (SESAL)", aka: ["SESAL", "Ministry of Health of Honduras", "Secretaría de Salud"],
    city: "Tegucigalpa", country: "HN", lat: 14.106, lng: -87.205, institutionType: "government", website: "https://www.salud.gob.hn",
    tldr: "Honduras's Ministry of Health. It runs the public hospitals, keeps a cancer information portal for the public, and works with the children's cancer foundation, which treats children free of charge in public hospitals.",
    summary: "The Secretaría de Salud runs Honduras's public health system and administers Hospital Escuela under its 1977 agreement with the National Autonomous University of Honduras. Its cancer portal explains prevention, staging and spread in plain language and lists the Fundación Hondureña para el Niño con Cáncer among its partners; the foundation says it leads the country's work on childhood cancer together with the Ministry. Health products are regulated by a separate agency, ARSA. The coordinates are an approximate Tegucigalpa city point.",
    programs: ["Cancer information portal", "Public hospital network, including Hospital Escuela and Hospital General San Felipe"],
    // TODO: re-link arsa-honduras (defined in the country deep dive, PR #395) once it merges.
    institutions: ["hospital-escuela-honduras", "hospital-san-felipe-honduras", "fhnc-honduras", "centro-cancer-emma-romero-de-callejas", "liga-contra-el-cancer-honduras"],
    links: [{ label: "SESAL: cancer portal", url: SESAL_CANCER }, { label: "Hospital Escuela: history", url: "https://hospitalescuela.hn/historia-el-hospital/" }, { label: "FHNC: our beginning", url: FHNC_HISTORY }] }),

  i({ id: "hospital-escuela-honduras", name: "Hospital Escuela (Tegucigalpa)", aka: ["Hospital Escuela Universitario", "HEU", "University Teaching Hospital, Tegucigalpa"],
    city: "Tegucigalpa", country: "HN", lat: 14.089, lng: -87.197, institutionType: "hospital", website: "https://hospitalescuela.hn",
    tldr: "A public teaching hospital in Tegucigalpa, run by the Ministry of Health. Its children's cancer ward has treated children with cancer since 1982, with medicines paid for by a charity.",
    summary: "Hospital Escuela's history says the Materno Infantil block opened on 1 May 1969 and the medical-surgical block on 19 May 1979, the two merging to form the Hospital Escuela; it was planned under a 1968 agreement with the National Autonomous University of Honduras, and from 1977 the Secretaría de Salud took over its administration. The Fundación Hondureña para el Niño con Cáncer says the hospital has been the centre of care for children with cancer in Honduras since 1982, with a paediatric haemato-oncology ward that has inpatient beds, outpatient clinics and a high-dose chemotherapy room, and that its own Casa Hogar near the hospital houses families from outside the capital. Coordinates are Wikidata's (Q17633897).",
    programs: ["Paediatric haemato-oncology (inpatient, outpatient, high-dose chemotherapy)", "Pathology laboratory"],
    institutions: ["sesal-honduras", "fhnc-honduras"],
    cancers: ["childhood-cancers"],
    links: [{ label: "Hospital Escuela: history", url: "https://hospitalescuela.hn/historia-el-hospital/" }, { label: "FHNC: hospital locations", url: FHNC_LOCATIONS }] }),

  i({ id: "hospital-san-felipe-honduras", name: "Hospital General San Felipe", aka: ["Hospital San Felipe", "San Felipe General Hospital"],
    city: "Tegucigalpa", country: "HN", lat: 14.072, lng: -87.192, institutionType: "hospital",
    tldr: "A public general hospital in Tegucigalpa with an oncology service and radiotherapy equipment.",
    summary: "IAEA DIRAC lists the Hospital General San Felipe in Tegucigalpa with one linear accelerator, two cobalt-60 units, one brachytherapy unit and a CT scanner (entry last updated 2023). DIRAC records installed equipment and does not say whether each machine is working. OnCo found no website for the hospital. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator, two cobalt-60 units and brachytherapy in IAEA DIRAC)"],
    institutions: ["sesal-honduras", "iaea"],
    links: [DIRAC] }),

  i({ id: "centro-cancer-emma-romero-de-callejas", name: "Centro de Cáncer Emma Romero de Callejas", aka: ["Asociación Hondureña de Lucha contra el Cáncer", "Emma Romero de Callejas Cancer Centre"],
    city: "Tegucigalpa", country: "HN", lat: 14.088, lng: -87.179, institutionType: "cancer-center",
    tldr: "A charity cancer centre in Tegucigalpa with radiotherapy and outpatient chemotherapy, run by the Honduran Association for the Fight Against Cancer.",
    summary: "UICC's member page says the Asociación Hondureña de Lucha contra el Cáncer was founded in 1987 as a non-profit institution for cancer prevention and treatment, running education and early detection programmes, housing for patients and support groups, and treating patients at its Centro de Cáncer Emma Romero de Callejas regardless of ability to pay, with radiotherapy and an outpatient chemotherapy clinic. IAEA DIRAC lists the centre in Colonia Lomas del Guijarro with two linear accelerators, one cobalt-60 unit, one brachytherapy unit and a CT scanner (entry last updated 2024). Coordinates are DIRAC's.",
    programs: ["Radiotherapy (two linear accelerators, one cobalt-60 unit and brachytherapy in IAEA DIRAC)", "Outpatient chemotherapy", "Patient housing and support groups"],
    institutions: ["sesal-honduras", "iaea"],
    links: [{ label: "UICC: Asociación Hondureña de Lucha contra el Cáncer (member page)", url: UICC_HN_AHLCC }, DIRAC] }),

  i({ id: "liga-contra-el-cancer-honduras", name: "Liga Contra el Cáncer (Honduras)", aka: ["Liga Contra el Cáncer San Pedro Sula", "League Against Cancer, Honduras"],
    city: "San Pedro Sula", country: "HN", lat: 15.498, lng: -88.014, institutionType: "cancer-center",
    tldr: "A charity in San Pedro Sula that offers cancer surgery, chemotherapy and radiotherapy at low cost or free to people who cannot pay.",
    summary: "UICC's member page for the Liga Contra el Cáncer, a full member since 1981, says it provides surgery, chemotherapy, radiology services, laboratory, medicines and psychological support, keeping costs low and in some cases free, with the help of volunteer doctors. IAEA DIRAC lists the Liga in Barrio Suyapa, San Pedro Sula, with one cobalt-60 unit (entry last updated 2023). Coordinates are DIRAC's.",
    programs: ["Surgery, chemotherapy and laboratory services", "Radiotherapy (one cobalt-60 unit in IAEA DIRAC)"],
    institutions: ["sesal-honduras", "iaea"],
    links: [{ label: "UICC: Liga Contra el Cáncer, Honduras (member page)", url: UICC_HN_LIGA }, DIRAC] }),

  i({ id: "fhnc-honduras", name: "Fundación Hondureña para el Niño con Cáncer", aka: ["FHNC", "Honduran Foundation for Children with Cancer", "Salva Mi Vida"],
    city: "Tegucigalpa", country: "HN", lat: 14.106, lng: -87.205, institutionType: "cancer-center", website: "https://salvamivida.org",
    tldr: "A charity that pays for and organises free cancer treatment for children in Honduras, working in seven hospitals and running its own children's cancer clinic and family homes.",
    summary: "The foundation says it began in 1982 with volunteers visiting the paediatric ward of Hospital Escuela and was constituted in 1989; working with the Secretaría de Salud, it provides cancer medicines, diagnostic tests and psychological and nutritional support free of charge. It lists paediatric haemato-oncology units at Hospital Escuela in Tegucigalpa, Hospital Mario Catarino Rivas in San Pedro Sula and Hospital General de Atlántida in La Ceiba (from 2011), its own Centro Médico para el niño con cáncer, and Casas Hogar in Tegucigalpa and San Pedro Sula; it says it has brought treatment to 7 hospitals and runs a laboratory with flow cytometry. The foundation states that survival of children with cancer has risen from 10% to 70%. UICC's page (full member) says it treats patients aged 0 to 18, has helped more than 6,500 and supports about 1,200 a year. The coordinates are an approximate Tegucigalpa city point.",
    programs: ["Free paediatric cancer treatment in public hospitals", "Casas Hogar (family housing) in Tegucigalpa and San Pedro Sula", "Diagnostic laboratory with flow cytometry"],
    institutions: ["hospital-escuela-honduras", "sesal-honduras"],
    cancers: ["childhood-cancers"],
    links: [
      { label: "FHNC: our beginning", url: FHNC_HISTORY },
      { label: "FHNC: hospital locations", url: FHNC_LOCATIONS },
      { label: "FHNC: model of care", url: "https://salvamivida.org/modelo-operativo" },
      { label: "UICC: Fundación Hondureña para el Niño con Cáncer (member page)", url: UICC_HN_FHNC },
    ] }),

  // El Salvador (SV)
  i({ id: "isss-el-salvador", name: "Instituto Salvadoreño del Seguro Social (ISSS)", aka: ["ISSS", "Salvadoran Social Security Institute"],
    city: "San Salvador", country: "SV", lat: 13.693, lng: -89.218, institutionType: "government", website: "https://www.isss.gob.sv",
    tldr: "El Salvador's social security institute, which insures formal workers, pensioners and their families and runs its own health services, including an oncology building with radiotherapy.",
    summary: "The Instituto Salvadoreño del Seguro Social insures contributing workers and pensioners, with spouses and children registered as beneficiaries (its service guide). IAEA DIRAC lists the ISSS oncology building at 1a calle poniente and 25 avenida norte, San Salvador, with three linear accelerators, one brachytherapy unit and a CT scanner (entry last updated 2025). OnCo did not find a published list of the cancer treatments it covers. Coordinates are DIRAC's.",
    programs: ["Health insurance for contributing workers, pensioners and beneficiaries", "Radiotherapy, oncology building (three linear accelerators and brachytherapy in IAEA DIRAC)"],
    institutions: ["iaea", "centro-nacional-radioterapia-el-salvador"],
    links: [{ label: "ISSS: home page", url: "https://www.isss.gob.sv/" }, { label: "ISSS: service guide", url: "https://www.isss.gob.sv/guia-de-servicios/" }, DIRAC] }),

  i({ id: "liga-contra-el-cancer-el-salvador", name: "Liga Contra el Cáncer de El Salvador", aka: ["League Against Cancer of El Salvador"],
    city: "San Salvador", country: "SV", lat: 13.69, lng: -89.19, institutionType: "cancer-center",
    tldr: "The League Against Cancer of El Salvador, which runs a radiotherapy service in San Salvador with cobalt machines and brachytherapy.",
    summary: "IAEA DIRAC lists the Liga Contra el Cáncer de El Salvador at 1a Calle Poniente and 33a Avenida Norte, San Salvador, with three cobalt-60 units and one brachytherapy unit (entry last updated 2026). Its website did not answer. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (three cobalt-60 units and brachytherapy in IAEA DIRAC)"],
    institutions: ["isss-el-salvador", "iaea"],
    links: [DIRAC] }),

  i({ id: "centro-nacional-radioterapia-el-salvador", name: "Centro Nacional de Radioterapia (El Salvador)", aka: ["National Radiotherapy Centre, El Salvador"],
    city: "San Salvador", country: "SV", lat: 13.729, lng: -89.207, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in San Salvador with three linear accelerators.",
    summary: "IAEA DIRAC lists the Centro Nacional de Radioterapia in San Salvador with three linear accelerators (entry last updated 2026). OnCo could not read the Ministry of Health's site (HTTP 403) to confirm who runs it. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (three linear accelerators in IAEA DIRAC)"],
    institutions: ["isss-el-salvador", "iaea"],
    links: [DIRAC] }),

  i({ id: "centro-internacional-de-cancer-el-salvador", name: "Centro Internacional de Cáncer (El Salvador)", aka: ["CIC El Salvador", "International Cancer Centre, San Salvador"],
    city: "San Salvador", country: "SV", lat: 13.704, lng: -89.247, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in the Escalón district of San Salvador.",
    summary: "IAEA DIRAC lists the Centro Internacional de Cáncer at 3a Calle Poniente, Colonia Escalón, San Salvador, with two linear accelerators and a CT scanner (entry last updated 2025). DIRAC also lists the Centro Salvadoreño de Radioterapia, in the same district, with two linear accelerators (entry last updated 2023). Its website did not answer. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)"],
    institutions: ["liga-contra-el-cancer-el-salvador", "iaea"],
    links: [DIRAC] }),

  // Panama (PA)
  i({ id: "minsa-panama", name: "Ministerio de Salud de Panamá (MINSA)", aka: ["MINSA Panamá", "Ministry of Health of Panama"],
    city: "Panama City", country: "PA", lat: 8.971, lng: -79.534, institutionType: "government", website: "https://www.minsa.gob.pa",
    tldr: "Panama's Ministry of Health, which runs public health centres and national campaigns, including cancer prevention events each October.",
    summary: "The Ministerio de Salud sets Panama's national health policy and runs public health centres; the Instituto Oncológico Nacional and the Caja de Seguro Social, held as separate records, provide public cancer care. In October 2026 it held an academic day on cancer prevention through healthy lifestyles as part of the month's awareness activities. The coordinates are an approximate Panama City point.",
    programs: ["National cancer awareness and prevention activities (October)"],
    // TODO: re-link ion-panama, css-panama (defined in the country deep dive, PR #395) once it merges.
    links: [{ label: "MINSA: home page", url: "https://www.minsa.gob.pa/" }, { label: "MINSA: cancer prevention through healthy lifestyles (October 2026)", url: "https://www.minsa.gob.pa/centro-de-prensa/noticias/minsa-impulsa-la-prevencion-del-cancer-desde-los-habitos-de-vida" }] }),

  i({ id: "chop-panama", name: "Centro Hemato Oncológico Panamá (CHOP)", aka: ["CHOP", "Centro Hemato Oncologico Panama", "Centro Hemato Oncologico Paitilla"],
    city: "Panama City", country: "PA", lat: 8.971, lng: -79.534, institutionType: "cancer-center", website: "https://www.chop.com.pa",
    tldr: "A group of cancer and blood specialists in Panama City, working since 1994, that has taken part in international trials of lymphoma, breast, stomach and lung cancer medicines.",
    summary: "CHOP describes itself as a group of oncologists, haematologists and allied specialists who have treated patients with cancer and blood diseases since 1994, with about 25 doctors across medical oncology, haematology, paediatric haematology, radiation oncology, palliative care, psycho-oncology, nutrition and geriatrics, four clinics, and a branch at The Panama Clinic, where it works on a bone marrow transplant programme. Its research page lists closed protocols including GOYA (diffuse large B-cell lymphoma), GATSBY (gastric cancer), OAK (lung cancer), TASQ 10 (metastatic prostate cancer), MARIANNE and KAMILA (HER2-positive breast cancer). ClinicalTrials.gov lists it as a Panama City site of GOYA and OAK. The coordinates are an approximate Panama City point.",
    programs: ["Medical oncology, haematology and radiation oncology", "Bone marrow transplant programme at The Panama Clinic", "Clinical trial site"],
    // TODO: re-link ion-panama (defined in the country deep dive, PR #395) once it merges.
    institutions: ["the-panama-clinic"],
    links: [{ label: "CHOP: home page", url: "https://www.chop.com.pa/" }, { label: "CHOP: research protocols", url: CHOP_RESEARCH }, ct("NCT01287741"), ct("NCT02008227")] }),

  i({ id: "the-panama-clinic", name: "The Panama Clinic", aka: ["Hospital The Panama Clinic"],
    city: "Panama City", country: "PA", lat: 8.977, lng: -79.513, institutionType: "hospital", website: "https://thepanamaclinic.com",
    tldr: "A private hospital in Panama City with oncology, haematology and a bone marrow transplant unit, and a site for international breast cancer trials.",
    summary: "The Panama Clinic describes itself as a private hospital in Panama City. Its home page, giving its address as Torre B of Pacific Center on Calle Ramón H. Jurado, lists oncology and haematology, a bone marrow transplant unit, and treatment of breast, prostate, colon, gastric and skin cancers among its services. The Centro Hemato Oncológico Panamá has a branch there. ClinicalTrials.gov lists The Panama Clinic as a Panama City site of APHINITY, KATHERINE and NCT00781612, trials of HER2-targeted medicines in breast cancer. Coordinates are Nominatim's for Pacific Center.",
    programs: ["Oncology and haematology", "Bone marrow transplant unit", "Clinical trial site"],
    institutions: ["chop-panama", "minsa-panama"],
    links: [{ label: "The Panama Clinic: home page", url: "https://thepanamaclinic.com/" }, ct("NCT01358877"), ct("NCT01772472")] }),

  i({ id: "hospiten-paitilla", name: "Hospiten Paitilla (Centro Oncológico Paitilla)", aka: ["Hospital Paitilla", "Centro Oncológico Paitilla", "Paitilla Oncology Centre"],
    city: "Panama City", country: "PA", lat: 8.99, lng: -79.53, institutionType: "hospital", website: "https://hospitenpaitilla.com",
    tldr: "A hospital in Panama City whose cancer centre gives radiotherapy, chemotherapy and children's cancer care.",
    summary: "Hospiten Paitilla says it has cared for patients since 1975 and that its Centro Oncológico Paitilla has operated for more than 25 years, with radiation oncologists, adult and paediatric medical oncologists, medical physicists, radiotherapy technicians and oncology nurses, offering radiotherapy, chemotherapy, palliative treatment and paediatric oncology; it does not give radioactive iodine therapy. IAEA DIRAC lists Hospital Paitilla, at calle 53 and avenida Balboa, with two linear accelerators and a CT scanner (entry last updated 2026). Coordinates are DIRAC's.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)", "Chemotherapy", "Paediatric oncology", "Palliative treatment"],
    institutions: ["minsa-panama", "iaea"],
    links: [{ label: "Hospiten Paitilla: oncology", url: "https://hospitenpaitilla.com/atencion-medica/oncologia" }, DIRAC] }),

  i({ id: "cirro-panama", name: "Radioterapia Oncológica, S.A. (CIRRO)", aka: ["CIRRO"],
    city: "Panama City", country: "PA", lat: 8.972, lng: -79.533, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in the Bella Vista district of Panama City.",
    summary: "IAEA DIRAC lists Radioterapia Oncológica, S.A. (CIRRO) at avenida Justo Arosemena and calle 38, Bella Vista, with one linear accelerator and one brachytherapy unit (entry last updated 2026). DIRAC's other Panamanian operators are the Instituto Oncológico Nacional (five linear accelerators), Hospital Paitilla and the Caja de Seguro Social at Ciudad de la Salud (four linear accelerators). Its website did not answer. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)"],
    institutions: ["minsa-panama", "iaea"],
    links: [DIRAC] }),

  // Nicaragua (NI)
  i({ id: "minsa-nicaragua", name: "Ministerio de Salud de Nicaragua (MINSA)", aka: ["MINSA Nicaragua", "Ministry of Health of Nicaragua"],
    city: "Managua", country: "NI", lat: 12.127, lng: -86.225, institutionType: "government", website: "https://www.minsa.gob.ni",
    tldr: "Nicaragua's Ministry of Health. It runs the public hospitals, including the national radiotherapy hospital in Managua, and through its health regulation authority it registers medicines.",
    summary: "MINSA's site lists its Autoridad Nacional de Regulación Sanitaria among its entities and offers the health registration of pharmaceutical products as an online service. Its list of hospitals names the Hospital Nacional de Radioterapia \"Nora Astorga\" in Managua as a hospital with national referral services, and its list of specialised centres includes a Centro Oncológico de Quimioterapias y Cuidados Paliativos in Managua. Coordinates are Wikidata's (Q30282287).",
    programs: ["Autoridad Nacional de Regulación Sanitaria (medicines registration)", "Public hospital network"],
    institutions: ["nora-astorga-radiotherapy-nicaragua", "hospital-escuela-davila-bolanos"],
    links: [{ label: "MINSA Nicaragua: home page", url: "https://www.minsa.gob.ni/" }, { label: "MINSA Nicaragua: hospitals", url: MINSA_NI_HOSPITALS }, { label: "MINSA Nicaragua: specialised centres", url: "https://www.minsa.gob.ni/index.php/red-de-salud/centros-especializados" }] }),

  i({ id: "nora-astorga-radiotherapy-nicaragua", name: "Centro Nacional de Radioterapia Nora Astorga", aka: ["Hospital Nacional de Radioterapia Nora Astorga", "Nora Astorga National Radiotherapy Centre"],
    city: "Managua", country: "NI", lat: 12.115, lng: -86.236, institutionType: "cancer-center",
    tldr: "Nicaragua's public radiotherapy hospital in Managua, run by the Ministry of Health, with linear accelerators, a cobalt machine and brachytherapy.",
    summary: "MINSA lists the Hospital Nacional de Radioterapia \"Nora Astorga\" in Managua as a hospital with national referral services. IAEA DIRAC lists the Centro Nacional de Radioterapia Nora Astorga with three linear accelerators, one cobalt-60 unit, one brachytherapy unit and a CT scanner (entry last updated 2026). Coordinates are DIRAC's.",
    programs: ["Radiotherapy (three linear accelerators, one cobalt-60 unit and brachytherapy in IAEA DIRAC)"],
    institutions: ["minsa-nicaragua", "iaea"],
    links: [{ label: "MINSA Nicaragua: hospitals", url: MINSA_NI_HOSPITALS }, DIRAC] }),

  i({ id: "hospital-escuela-davila-bolanos", name: "Hospital Escuela Dr. Alejandro Dávila Bolaños", aka: ["Alejandro Dávila Bolaños Teaching Hospital"],
    city: "Managua", country: "NI", lat: 12.133, lng: -86.278, institutionType: "hospital",
    tldr: "A teaching hospital in Managua that has a radiotherapy service with a linear accelerator and brachytherapy.",
    summary: "IAEA DIRAC lists the Hospital Escuela Dr. Alejandro Dávila Bolaños in Managua with one linear accelerator and one brachytherapy unit (entry last updated 2026), making it one of the two radiotherapy operators DIRAC lists in Nicaragua, with the Centro Nacional de Radioterapia Nora Astorga. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)"],
    institutions: ["nora-astorga-radiotherapy-nicaragua", "iaea"],
    links: [DIRAC] }),

  // Jamaica (JM)
  i({ id: "nhf-jamaica", name: "National Health Fund (Jamaica)", aka: ["NHF", "NHF Jamaica"],
    city: "Kingston", country: "JM", lat: 17.971, lng: -76.793, institutionType: "government", website: "https://www.nhf.org.jm",
    tldr: "Jamaica's public fund that helps pay for medicines and specified health benefits through its NHF card, and runs public pharmacies called DrugServ.",
    summary: "The National Health Fund is a statutory body established in 2003 by the National Health Fund Act, with a board appointed by the Minister of Health and Wellness. Its mission is to fund specified healthcare benefits, health promotion, health projects and pharmacy services; it runs the NHFCard subsidy and the DrugServ public pharmacies. For financial year 2025/26 it reports JMD 10.6 billion in NHFCard benefits, 2.6 million DrugServ prescriptions filled and 4.3 million NHFCard claims approved. The list of conditions the card covers is rendered by JavaScript and was not read. The coordinates are an approximate Kingston city point.",
    programs: ["NHFCard medicine subsidies", "DrugServ public pharmacies", "Institutional grants"],
    institutions: ["uwi-mona", "cornwall-regional-hospital", "kingston-public-hospital"],
    links: [{ label: "NHF: about the National Health Fund", url: "https://www.nhf.org.jm/about-the-national-health-fund/" }] }),

  i({ id: "uwi-mona", name: "The University of the West Indies, Mona", aka: ["UWI Mona", "University of the West Indies Mona campus"],
    city: "Kingston", country: "JM", lat: 18.005, lng: -76.745, institutionType: "university", website: "https://www.mona.uwi.edu",
    tldr: "The Jamaican campus of the regional University of the West Indies, with a Faculty of Medical Sciences, and a site for a cancer trial run in Jamaica and Barbados.",
    summary: "UWI Mona is the Jamaican campus of the University of the West Indies, with a Faculty of Medical Sciences that held its 32nd annual research conference in November 2026. ClinicalTrials.gov lists The University of the West Indies, Mona as a site of NCT07528768 (HEADWATERS), a planned phase 2 trial of gemcitabine against paclitaxel for metastatic triple-negative breast cancer in women of African ancestry, alongside the Queen Elizabeth Hospital in Barbados. Coordinates are Nominatim's.",
    programs: ["Faculty of Medical Sciences", "Clinical trial site (NCT07528768)"],
    institutions: ["nhf-jamaica", "qeh-barbados"],
    links: [{ label: "UWI Mona: home page", url: "https://www.mona.uwi.edu/" }, ct("NCT07528768")] }),

  i({ id: "cornwall-regional-hospital", name: "Cornwall Regional Hospital", aka: ["CRH", "Cornwall Regional Hospital, Montego Bay"],
    city: "Montego Bay", country: "JM", lat: 18.47, lng: -77.91, institutionType: "hospital",
    tldr: "A public hospital in Montego Bay, in western Jamaica, with radiotherapy equipment.",
    summary: "Cornwall Regional Hospital in Montego Bay is a hospital of the Western Regional Health Authority, which runs it alongside Noel Holmes, Falmouth and Savanna-la-Mar hospitals. IAEA DIRAC lists it with one linear accelerator, one cobalt-60 unit and a CT scanner (entry last updated 2025). Coordinates are Wikidata's (Q30254192), matching DIRAC.",
    programs: ["Radiotherapy (one linear accelerator and one cobalt-60 unit in IAEA DIRAC)"],
    institutions: ["nhf-jamaica", "iaea"],
    links: [{ label: "Western Regional Health Authority: about us", url: "https://www.wrha.gov.jm/about-us/" }, DIRAC] }),

  i({ id: "kingston-public-hospital", name: "Kingston Public Hospital", aka: ["KPH"],
    city: "Kingston", country: "JM", lat: 17.977, lng: -76.795, institutionType: "hospital",
    tldr: "A public hospital on North Street, Kingston, with radiotherapy, listed in the international directory with a cobalt machine and brachytherapy.",
    summary: "IAEA DIRAC lists Kingston Public Hospital, North Street, Kingston, with one cobalt-60 unit, one brachytherapy unit and a CT scanner (entry last updated 2020). DIRAC also lists two other Kingston operators: the Radiation Oncology Centre of Jamaica (one linear accelerator, brachytherapy) and St. Joseph's Hospital (one linear accelerator). The South East Regional Health Authority's site did not answer. Coordinates are Wikidata's (Q104863743).",
    programs: ["Radiotherapy (one cobalt-60 unit and brachytherapy in IAEA DIRAC)"],
    institutions: ["nhf-jamaica", "radiation-oncology-centre-jamaica", "iaea"],
    links: [DIRAC] }),

  i({ id: "radiation-oncology-centre-jamaica", name: "Radiation Oncology Centre of Jamaica", aka: ["ROC Jamaica"],
    city: "Kingston", country: "JM", lat: 18.0, lng: -76.79, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in Kingston, Jamaica, with a linear accelerator and brachytherapy.",
    summary: "IAEA DIRAC lists the Radiation Oncology Centre of Jamaica at 1 Ripon Road, Kingston 5, with one linear accelerator, one brachytherapy unit and a CT scanner (entry last updated 2025). OnCo found no website for it. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)"],
    institutions: ["kingston-public-hospital", "iaea"],
    links: [DIRAC] }),

  // Trinidad and Tobago (TT)
  i({ id: "moh-trinidad-tobago", name: "Ministry of Health, Trinidad and Tobago", aka: ["Ministry of Health Trinidad and Tobago", "MoH Trinidad and Tobago"],
    city: "Port of Spain", country: "TT", lat: 10.657, lng: -61.518, institutionType: "government", website: "https://health.gov.tt",
    tldr: "Trinidad and Tobago's Ministry of Health. Its Chemistry, Food and Drugs Division regulates medicines, and regional health authorities run the public hospitals, including the cancer centre at St James.",
    summary: "The Ministry of Health oversees five regional health authorities (North West, North Central, Eastern, South West and Tobago) and the Children's Life Fund Authority. Its Chemistry, Food and Drugs Division is charged with ensuring safe standards for food, drugs, cosmetics and medical devices and keeps a public drug database. It also runs a Tobacco Control Unit and a non-communicable disease programme. The coordinates are an approximate Port of Spain city point.",
    programs: ["Chemistry, Food and Drugs Division (medicines regulation)", "Tobacco Control Unit", "Non-communicable disease programme"],
    institutions: ["cancer-centre-trinidad-tobago", "southern-medical-services-tt", "medcorp-cancer-centre-tt"],
    links: [{ label: "Ministry of Health: home page", url: "https://health.gov.tt/" }, { label: "Ministry of Health: Chemistry, Food and Drugs Division", url: "https://health.gov.tt/services/chemistry-food-and-drugs-division" }] }),

  i({ id: "cancer-centre-trinidad-tobago", name: "Cancer Centre of Trinidad and Tobago (NWRHA)", aka: ["St James Medical Complex oncology", "North West Regional Health Authority Cancer Centre"],
    city: "St James", country: "TT", lat: 10.674, lng: -61.539, institutionType: "cancer-center",
    tldr: "The public cancer centre at the St James Medical Complex in Port of Spain, run by the North West Regional Health Authority, with oncology clinics and radiotherapy.",
    summary: "The North West Regional Health Authority lists oncology at the St James Medical Complex from Monday to Friday, with a Thursday clinic at the Woodbrook Health Facility. IAEA DIRAC lists the Cancer Centre of Trinidad and Tobago, NWRHA, at 112 Western Main Road, St James Medical Complex, with two linear accelerators, one cobalt-60 unit, one brachytherapy unit and a CT scanner (entry last updated 2025). Coordinates are DIRAC's.",
    programs: ["Oncology clinics (St James Medical Complex)", "Radiotherapy (two linear accelerators, one cobalt-60 unit and brachytherapy in IAEA DIRAC)"],
    institutions: ["moh-trinidad-tobago", "iaea"],
    links: [{ label: "NWRHA: services by speciality", url: "https://www.nwrha.co.tt/services-by-speciality/" }, DIRAC] }),

  i({ id: "southern-medical-services-tt", name: "Southern Medical Services Company Limited", aka: ["Southern Medical Services"],
    city: "San Fernando", country: "TT", lat: 10.285, lng: -61.467, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in San Fernando, in the south of Trinidad.",
    summary: "IAEA DIRAC lists Southern Medical Services Company Limited at 26 to 34 Dr. Rupert Indar Snr. Street, San Fernando, with three linear accelerators, one brachytherapy unit and two CT scanners (entry last updated 2026). Its website did not answer. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (three linear accelerators and brachytherapy in IAEA DIRAC)"],
    institutions: ["moh-trinidad-tobago", "iaea"],
    links: [DIRAC] }),

  i({ id: "medcorp-cancer-centre-tt", name: "Medcorp Cancer Centre of the Caribbean", aka: ["Medcorp Cancer Centre"],
    city: "Port of Spain", country: "TT", lat: 10.662, lng: -61.531, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in Woodbrook, Port of Spain.",
    summary: "IAEA DIRAC lists the Medcorp Cancer Centre of the Caribbean at 7 Fitzblackman Drive, Woodbrook, Port of Spain, with one linear accelerator, one brachytherapy unit and a CT scanner (entry last updated 2026). Its website did not answer. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)"],
    institutions: ["moh-trinidad-tobago", "iaea"],
    links: [DIRAC] }),

  // Guyana (GY)
  i({ id: "moh-guyana", name: "Guyana Ministry of Health", aka: ["Ministry of Health, Guyana", "MoH Guyana"],
    city: "Georgetown", country: "GY", lat: 6.803, lng: -58.146, institutionType: "government", website: "https://health.gov.gy",
    tldr: "Guyana's Ministry of Health. Since June 2024 it has given women aged 21 to 65 a voucher worth 8,000 Guyanese dollars for a cervical cancer screening test.",
    summary: "The Ministry of Health's Cervical Cancer Screening Voucher Programme, launched on 21 June 2024, gives eligible women a government voucher of GYD 8,000 that covers a test for human papillomavirus (HPV) and other screening procedures at approved facilities; its home page gives the eligible ages as 21 to 65. The Cancer Institute of Guyana says it was set up as a project between the Ministry and Global Imaging Services. The coordinates are an approximate Georgetown city point.",
    programs: ["Cervical Cancer Screening Voucher Programme (from June 2024)", "Universal Health Voucher for laboratory tests"],
    institutions: ["gphc-guyana", "cancer-institute-of-guyana"],
    cancers: ["cervical"],
    links: [{ label: "Ministry of Health: home page", url: "https://health.gov.gy/" }, { label: "Ministry of Health: cervical cancer screening programme", url: "https://health.gov.gy/cervical-cancer-screening-programme/" }] }),

  i({ id: "gphc-guyana", name: "Georgetown Public Hospital Corporation", aka: ["GPHC", "Georgetown Public Hospital"],
    city: "Georgetown", country: "GY", lat: 6.816, lng: -58.156, institutionType: "hospital", website: "https://gphc.gov.gy",
    tldr: "A public hospital in Georgetown, founded in 1838, with an oncology department that gives chemotherapy and other cancer medicines to referred patients.",
    summary: "GPHC says it was founded in 1838. Its oncology department offers multidisciplinary care from oncologists, nurses, pharmacists, social workers and nutritionists: medical oncology and haemato-oncology consultations, chemotherapy, targeted therapy, hormonal therapy and palliative care, Monday to Friday, for patients referred with a positive biopsy. The Cancer Institute of Guyana, which gives radiotherapy, is on the hospital's compound. Coordinates are Wikidata's (Q5547032).",
    programs: ["Medical oncology and haemato-oncology clinic", "Chemotherapy, targeted and hormonal therapy", "Palliative care"],
    institutions: ["moh-guyana", "cancer-institute-of-guyana"],
    links: [{ label: "GPHC: cancer care (oncology)", url: "https://gphc.gov.gy/services/cancer-care/" }, { label: "GPHC: history", url: "https://gphc.gov.gy/about/history/" }] }),

  i({ id: "cancer-institute-of-guyana", name: "Cancer Institute of Guyana", aka: ["CIG"],
    city: "Georgetown", country: "GY", lat: 6.817, lng: -58.156, institutionType: "cancer-center", website: "https://cancerinstituteguyana.com",
    tldr: "A non-profit radiotherapy centre on the grounds of the public hospital in Georgetown, run since 2006 as a partnership with the Ministry of Health. It is the one radiotherapy centre the international directory lists in Guyana.",
    summary: "The Cancer Institute of Guyana says it is a non-profit organisation operating since 2006 as a project between the Ministry of Health and Global Imaging Services, on the Georgetown Public Hospital compound, with a mission to provide evaluation, radiation treatment at a subsidised cost and follow-up. Its site describes external beam radiotherapy and chemotherapy. IAEA DIRAC lists it at Lamaha Street as the one radiotherapy centre in Guyana, with one linear accelerator, one brachytherapy unit and a CT scanner (entry last updated 2024). Coordinates are DIRAC's.",
    programs: ["External beam radiotherapy (one linear accelerator in IAEA DIRAC)", "Brachytherapy", "Chemotherapy"],
    institutions: ["gphc-guyana", "moh-guyana", "iaea"],
    links: [{ label: "Cancer Institute of Guyana: about us", url: "https://cancerinstituteguyana.com/about_us.html" }, DIRAC] }),

  // Suriname (SR)
  i({ id: "azp-suriname", name: "Academisch Ziekenhuis Paramaribo", aka: ["AZP", "Academic Hospital Paramaribo", "Radiotherapeutisch Centrum Suriname"],
    city: "Paramaribo", country: "SR", lat: 5.837, lng: -55.183, institutionType: "hospital", website: "https://www.azp.sr",
    tldr: "Suriname's academic hospital in Paramaribo, which houses the Suriname Radiotherapy Centre, the one radiotherapy centre the international directory lists in the country.",
    summary: "IAEA DIRAC lists the Radiotherapeutisch Centrum Suriname, Academic Hospital Paramaribo, on Flustraat, as the one radiotherapy centre in Suriname, with two linear accelerators, one brachytherapy unit and a CT scanner (entry last updated 2026). The UK government's list of medical facilities in Suriname gives AZP as providing emergency services and all health care, affiliated to the Ministry of Health. Its website is being rebuilt. Coordinates are Wikidata's (Q23926511).",
    programs: ["Radiotherapeutisch Centrum Suriname (two linear accelerators and brachytherapy in IAEA DIRAC)"],
    institutions: ["iaea"],
    links: [DIRAC, { label: "GOV.UK: list of medical facilities in Suriname", url: "https://www.gov.uk/government/publications/suriname-list-of-list-of-medical-facilities-practioners/list-of-medical-facilities-in-suriname" }] }),

  // Bahamas (BS)
  i({ id: "princess-margaret-hospital-bahamas", name: "Princess Margaret Hospital (Nassau)", aka: ["PMH", "Princess Margaret Hospital, Bahamas"],
    city: "Nassau", country: "BS", lat: 25.074, lng: -77.336, institutionType: "hospital",
    tldr: "A hospital in Nassau with an oncology centre where public patients, including those flying in from Grand Bahama, receive chemotherapy.",
    summary: "The UK government's list of medical facilities in the Bahamas gives Princess Margaret Hospital, on Shirley Street, Nassau, as a public and private hospital with an oncology clinic among its specialised services; Rand Memorial Hospital in Freeport also lists oncology. In October 2020 The Tribune reported that Grand Bahama cancer patients who travel to Nassau for chemotherapy at the oncology centre at PMH could not do so during the five-month COVID-19 shutdown, and that the Cancer Society of the Bahamas in Grand Bahama was asking for an oncology centre in Freeport. The Public Hospitals Authority's website is under construction. Coordinates are Nominatim's.",
    programs: ["Oncology clinic and chemotherapy for public patients"],
    institutions: ["radiation-therapy-services-bahamas"],
    links: [{ label: "GOV.UK: Bahamas medical facilities", url: "https://www.gov.uk/government/publications/list-of-medical-facilitiespractitioners-in-bahamas/bahamas-medical-facilities" }, { label: "The Tribune: COVID limits show need for Freeport cancer centre (October 2020)", url: "https://www.tribune242.com/news/2020/oct/13/covid-limits-show-need-freeport-cancer-centre/" }] }),

  i({ id: "radiation-therapy-services-bahamas", name: "Radiation Therapy Services Bahamas Limited", aka: ["Radiation Therapy Services Bahamas"],
    city: "Nassau", country: "BS", lat: 25.066, lng: -77.336, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in Nassau, the one radiotherapy centre the international directory lists in the Bahamas.",
    summary: "IAEA DIRAC lists Radiation Therapy Services Bahamas Limited at 72 Collins Avenue, Nassau, as the one radiotherapy centre in the Bahamas, with one linear accelerator, one brachytherapy unit and a CT scanner (entry last updated 2025). Its website did not answer. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)"],
    institutions: ["princess-margaret-hospital-bahamas", "iaea"],
    links: [DIRAC] }),

  // Barbados (BB)
  i({ id: "qeh-barbados", name: "The Queen Elizabeth Hospital (Barbados)", aka: ["QEH", "Queen Elizabeth Hospital Barbados", "Clara Brathwaite Centre for Oncology and Nuclear Medicine"],
    city: "Bridgetown", country: "BB", lat: 13.096, lng: -59.606, institutionType: "hospital", website: "https://www.qehconnect.com",
    tldr: "Barbados's primary acute care hospital, opened in 1964, whose oncology centre gives radiotherapy, chemotherapy, nuclear medicine and children's cancer care.",
    summary: "The Queen Elizabeth Hospital opened on 14 November 1964 and is Barbados's primary acute care hospital, with 519 beds, and a teaching hospital affiliated with the University of the West Indies, Cave Hill. Its Department of Radiotherapy is housed in the Clara Brathwaite Centre for Oncology and Nuclear Medicine, which gives radiotherapy, chemotherapy and nuclear medicine to public and private, local and overseas patients, treating breast, prostate, gynaecological, gastrointestinal, head and neck, lung, brain and urological cancers, lymphoma, leukaemia, myeloma, melanoma and sarcoma, with paediatric cancer care for children from birth to 16. IAEA DIRAC lists it as the one radiotherapy centre in Barbados, with two linear accelerators, one cobalt-60 unit and one brachytherapy unit (entry last updated 2025). ClinicalTrials.gov lists it as a site of NCT07528768 (HEADWATERS), a planned trial in metastatic triple-negative breast cancer. Coordinates are DIRAC's.",
    programs: ["Clara Brathwaite Centre for Oncology and Nuclear Medicine", "Radiotherapy (two linear accelerators, one cobalt-60 unit and brachytherapy in IAEA DIRAC)", "Paediatric cancer care (birth to 16)"],
    institutions: ["moh-barbados", "uwi-mona", "iaea"],
    cancers: ["breast-cancer", "prostate"],
    links: [{ label: "QEH: about the hospital", url: "https://www.qehconnect.com/about-the-hospital/" }, { label: "QEH: radiotherapy", url: "https://www.qehconnect.com/services/radiotherapy/" }, DIRAC, ct("NCT07528768")] }),

  i({ id: "moh-barbados", name: "Ministry of Health and Wellness, Barbados", aka: ["Ministry of Health and Wellness Barbados", "Barbados Drug Service"],
    city: "Bridgetown", country: "BB", lat: 13.098, lng: -59.618, institutionType: "government", website: "https://www.health.gov.bb",
    tldr: "Barbados's Ministry of Health and Wellness. Its Barbados Drug Service publishes the national medicines formulary and buys and distributes the medicines on it.",
    summary: "The Ministry's pharmaceutical services are provided by the Barbados Drug Service, which produces the Barbados National Drug Formulary each year and procures and distributes the drugs listed in it; a drug inspectorate inspects and licenses public and private pharmacies and drug manufacturing plants under the Health Services Act. It administers the Drug Service Act (Cap 40A) and the Health Services Act (Cap 44). The Queen Elizabeth Hospital is the country's public acute hospital. The coordinates are an approximate Bridgetown city point.",
    programs: ["Barbados Drug Service and National Drug Formulary", "Drug inspectorate"],
    institutions: ["qeh-barbados"],
    links: [{ label: "Ministry of Health and Wellness: pharmaceutical services", url: "https://www.health.gov.bb/For-Public/Pharmaceutical-Services" }] }),

  // Curaçao (CW)
  i({ id: "curacao-medical-center", name: "Curaçao Medical Center", aka: ["CMC", "Curaçao Medical Center Willemstad"],
    city: "Willemstad", country: "CW", lat: 12.111, lng: -68.941, institutionType: "hospital", website: "https://www.cmc.cw",
    tldr: "A hospital in Willemstad, Curaçao, with a cancer and blood disorders department and a radiotherapy department.",
    summary: "Curaçao Medical Center's oncology and haematology department, which brings together medical haemato-oncology and radiation oncology, says it diagnoses and treats most kinds of cancer with surgeons, haematologists, medical, radiation and gynaecological oncologists and interventional radiologists, and offers complex palliative care. Its radiotherapy department gives conformal external beam radiotherapy, chemoradiotherapy and HDR brachytherapy, treating breast, prostate, head and neck, lung and paediatric cancers among others. IAEA DIRAC lists it with two linear accelerators (entry last updated 2024); DIRAC still carries a 2015 entry for the Saint Elisabeth Hospital, Willemstad, with a cobalt-60 unit and brachytherapy. Coordinates are DIRAC's.",
    programs: ["Oncology and haematology department", "Radiotherapy (two linear accelerators in IAEA DIRAC)", "HDR brachytherapy", "Palliative care"],
    institutions: ["iaea"],
    links: [{ label: "CMC: oncology and haematology (Papiamentu)", url: "https://www.cmc.cw/clinics/oncology/" }, { label: "CMC: radiotherapy (Papiamentu)", url: "https://www.cmc.cw/clinics/radiotherapy/" }, DIRAC] }),

  // Belize (BZ)
  i({ id: "khmh-belize", name: "Karl Heusner Memorial Hospital", aka: ["KHMH", "Karl Heusner Memorial Hospital Authority"],
    city: "Belize City", country: "BZ", lat: 17.507, lng: -88.196, institutionType: "hospital", website: "https://khmh.bz",
    tldr: "Belize's national referral hospital in Belize City, which has run a public oncology clinic for chemotherapy, set up with the charity Global Oncology from 2018.",
    summary: "The Karl Heusner Memorial Hospital describes itself as Belize's national referral hospital. Global Oncology says it partnered with the hospital in 2018 to build a public cancer clinic, and that before 2018 Belize had no public oncology programme; it works on protocols, patient navigation and mentorship with the hospital and the Ministry of Health. In May 2020 the Social Security Board gave BZD 200,000 to equip the hospital's new oncology unit for patients receiving chemotherapy; the hospital's chief executive said an oncologist had been doing mostly outpatient work there for about two years (Amandala). IAEA DIRAC lists no radiotherapy centre in Belize. Coordinates are Wikidata's (Q6371904).",
    programs: ["Oncology unit (chemotherapy)", "Global Oncology partnership (from 2018)"],
    institutions: ["moh-belize"],
    links: [
      { label: "KHMH: home page", url: "https://khmh.bz/" },
      { label: "Global Oncology: Belize", url: GLOBALONC_BZ },
      { label: "Amandala: Social Security Board donates $200,000 to KHMH Oncology Unit (May 2020)", url: "https://amandala.com.bz/news/social-security-board-donates-200000-to-khmh-oncology-unit/" },
    ] }),

  i({ id: "moh-belize", name: "Ministry of Health and Wellness, Belize", aka: ["Ministry of Health Belize", "MoH Belize"],
    city: "Belmopan", country: "BZ", lat: 17.25, lng: -88.77, institutionType: "government", website: "https://www.health.gov.bz",
    tldr: "Belize's Ministry of Health and Wellness, in Belmopan, which worked with the national hospital and a charity to start public cancer care from 2018.",
    summary: "The Ministry of Health and Wellness is at the East Block Building, Independence Plaza, Belmopan. Global Oncology says it introduced public oncology care in partnership with the Karl Heusner Memorial Hospital and the Ministry from 2018, and works with the Ministry and the Social Security Board on policies to reduce the cost of care for patients. The coordinates are an approximate Belmopan city point.",
    programs: ["Public oncology care with KHMH (from 2018)"],
    institutions: ["khmh-belize"],
    links: [{ label: "Ministry of Health and Wellness: contact page", url: "https://www.health.gov.bz/" }, { label: "Global Oncology: Belize", url: GLOBALONC_BZ }] }),
];

export const institutionsCountriesAmericas: InstitutionInput[] = institutions;

/** Existing record id to the new institution ids it should list (applied in src/data/index.ts). */
export const countriesAmericasBacklinks: Record<string, string[]> = {
  // In-country records another file owns.
  // TODO: incart-dominican-republic is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "incart-dominican-republic": ["sns-dominican-republic", "heriberto-pieter-oncology-institute"],
  // TODO: sisalril-dominican-republic is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "sisalril-dominican-republic": ["sns-dominican-republic"],
  // TODO: unop-guatemala is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "unop-guatemala": ["incan-guatemala", "hospital-roosevelt-guatemala"],
  // TODO: arsa-honduras is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "arsa-honduras": ["sesal-honduras"],
  // TODO: ion-panama is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "ion-panama": ["minsa-panama", "chop-panama"],
  // TODO: css-panama is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "css-panama": ["minsa-panama"],
  // The SNS runs the country's free breast, cervical and prostate cancer detection programme for set age groups
  // (its programme page, linked on the record), so it is listed on the national screening programmes page. This is its
  // inbound link until INCART and SISALRIL, which link to it, arrive with the country deep dive (PR #395).
  "national-screening-programmes": ["sns-dominican-republic"],
  // IAEA DIRAC lists every radiotherapy operator below.
  iaea: [
    "heriberto-pieter-oncology-institute", "iorc-santiago-dominican-republic", "cedimat-dominican-republic", "homs-santiago-dominican-republic",
    "incan-guatemala", "cem-quetzaltenango-radiotherapy", "hospital-san-felipe-honduras", "centro-cancer-emma-romero-de-callejas", "liga-contra-el-cancer-honduras",
    "isss-el-salvador", "liga-contra-el-cancer-el-salvador", "centro-nacional-radioterapia-el-salvador", "centro-internacional-de-cancer-el-salvador",
    "hospiten-paitilla", "cirro-panama", "nora-astorga-radiotherapy-nicaragua", "hospital-escuela-davila-bolanos",
    "cornwall-regional-hospital", "kingston-public-hospital", "radiation-oncology-centre-jamaica",
    "cancer-centre-trinidad-tobago", "southern-medical-services-tt", "medcorp-cancer-centre-tt", "cancer-institute-of-guyana",
    "azp-suriname", "radiation-therapy-services-bahamas", "qeh-barbados", "curacao-medical-center",
  ],
  // ClinicalTrials.gov facility names in trials the corpus holds.
  "hera-b31-n9831": ["hospital-roosevelt-guatemala"],
  alex: ["grupo-medico-angeles-guatemala"],
  aphinity: ["grupo-medico-angeles-guatemala", "the-panama-clinic"],
  cleopatra: ["grupo-medico-angeles-guatemala"],
  gatsby: ["grupo-medico-angeles-guatemala", "chop-panama"],
  katherine: ["grupo-medico-angeles-guatemala", "the-panama-clinic"],
  impassion130: ["grupo-medico-angeles-guatemala"],
  oak: ["grupo-medico-angeles-guatemala", "chop-panama"],
  lidera: ["grupo-medico-angeles-guatemala"],
  "herizon-gea-01": ["grupo-medico-angeles-guatemala"],
  nct00781612: ["grupo-medico-angeles-guatemala", "the-panama-clinic"],
  nct03768063: ["grupo-medico-angeles-guatemala"],
  nct06065748: ["grupo-medico-angeles-guatemala"],
  goya: ["chop-panama"],
  nct07528768: ["uwi-mona", "qeh-barbados"],
};
