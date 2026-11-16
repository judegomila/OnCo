import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/ve/ (wave 6). Each role was read on the Ministerio del Poder Popular para la Salud's own
 * news pages on 11 November 2026 (25 November 2024, 31 March 2025 and 26 August 2026), through the site's public API.
 */
const asOf = "2026-11-11";
const MPPS_REGISTRY = "https://mpps.gob.ve/la-importancia-de-un-registro-confiable-sobre-el-cancer-en-el-sector-de-la-salud-publica-y-privada/";
const MPPS_CX_2025 = "https://mpps.gob.ve/venezuela-intensifica-lucha-contra-el-cancer-de-cuello-uterino-con-prevencion-y-deteccion-temprana/";
const MPPS_CX_PLAN = "https://mpps.gob.ve/evaluaron-avances-del-plan-de-accion-sobre-la-prevencion-y-control-del-cancer-cervicouterino/";

export const peopleVE: PersonInput[] = [
  { kind: "person", asOf, id: "luis-capote-negrin", name: "Luis Guillermo Capote Negrín", aka: ["Luis Capote Negrín", "Luis G. Capote Negrin", "Capote-Negrín L"],
    role: "Coordinator, Registro Central de Cáncer, Dirección de Oncología, Ministerio del Poder Popular para la Salud (Venezuela) (so named by the Ministry in November 2024 and March 2025)",
    institutionId: "venezuela-ministry-of-health", institutions: ["venezuela-ministry-of-health"], specialisms: ["Surgical oncology", "Cancer epidemiology", "Cancer registration"],
    tldr: "Luis Capote Negrín, a surgical oncologist and epidemiologist, was named by the health ministry in November 2024 and March 2025 as coordinator of Venezuela's central cancer registry, and has written on the country's cancer epidemiology since at least 2006.",
    summary: "The health ministry's news page of 25 November 2024 names Luis Guillermo Capote Negrín as coordinator of the Registro Central de Cáncer, speaking at a session inviting private clinics to join the national cancer registry system; its page of 31 March 2025 describes him as a surgical oncologist and epidemiologist in charge of the central cancer registry of the ministry's Dirección de Oncología. His 2006 review in the Revista Venezolana de Oncología, written from the ministry's oncology division, set out cancer mortality in Venezuela from the 2005 mortality yearbook, and he is a co-author of the 2012 nationwide study of HPV types in cervical lesions. The Sociedad Anticancerosa de Venezuela thanked him for his part in its 2017 projections.",
    profiles: [
      { label: "MPPS: the national cancer registry system (25 November 2024)", url: MPPS_REGISTRY },
      { label: "MPPS: cervical cancer forum (31 March 2025)", url: MPPS_CX_2025 },
    ],
    papers: [
      { title: "Human papillomavirus in invasive cervical cancer and cervical intraepithelial neoplasia 2 and 3 in Venezuela: a cross-sectional study", journal: "Cancer Epidemiology", year: 2012, doi: "10.1016/j.canep.2012.04.005", url: "https://doi.org/10.1016/j.canep.2012.04.005", note: "Co-author" },
      { title: "Aspectos epidemiológicos del cáncer en Venezuela", journal: "Revista Venezolana de Oncología", year: 2006, url: "https://site.oncologia.org.ve/upload/revista/pdf/10.%20Capote%20L%20%28269-281%29.pdf" },
    ],
    links: [
      { label: "MPPS: the national cancer registry system (25 November 2024)", url: MPPS_REGISTRY },
      { label: "MPPS: cervical cancer forum (31 March 2025)", url: MPPS_CX_2025 },
    ],
    tags: ["government", "epidemiology"], cancers: ["cervical"] },

  { kind: "person", asOf, id: "gisela-vargas", name: "Gisela Vargas",
    role: "Directora Nacional de Oncología, Ministerio del Poder Popular para la Salud (Venezuela) (so named by the Ministry in August 2026)",
    institutionId: "venezuela-ministry-of-health", institutions: ["venezuela-ministry-of-health"], specialisms: ["Cancer control policy"],
    tldr: "Gisela Vargas was named by Venezuela's health ministry in August 2026 as its national director of oncology, hosting a review of the country's cervical cancer action plan for 2018 to 2030.",
    summary: "The health ministry's news page of 26 August 2026 names Dra. Gisela Vargas as directora nacional de Oncología, hosting at the Dirección Nacional de Oncología a review of the Plan de Acción para la Prevención y Control del Cáncer Cervicouterino 2018 to 2030 that covered the equipping of gynaecology clinics and colposcopes, training in cytology sampling and strategies for HPV vaccination. She stressed training primary care doctors to detect cervical and childhood cancers early.",
    profiles: [{ label: "MPPS: review of the cervical cancer action plan (26 August 2026)", url: MPPS_CX_PLAN }],
    links: [{ label: "MPPS: review of the cervical cancer action plan (26 August 2026)", url: MPPS_CX_PLAN }],
    tags: ["government"], cancers: ["cervical", "childhood-cancers"] },
];
