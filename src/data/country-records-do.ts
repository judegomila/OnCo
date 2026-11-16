import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Dominican Republic: the institutions behind /countries/do/ (wave 9) that the corpus did not hold, each written from its
 * own pages read as raw text in Spanish on 11 November 2026: INCART's home page and its report Indicadores Estadísticos y
 * Epidemiológicos 2017-2021 (PDF text, published 2023), and SISALRIL's home page and its page on health technology
 * assessment (EVTESA). SENASA's website did not answer. Coordinates are approximate Santo Domingo points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const INCART_REPORT = "https://incart.gob.do/descargas/2294/publicaciones/35163/indicadores-estadisticos-y-epidemiologicos-incart-2017-2021.pdf";
const EVTESA = "https://www.sisalril.gob.do/evtesa/";

const institutions: InstitutionInput[] = [
  i({ id: "incart-dominican-republic", name: "Instituto Nacional del Cáncer Rosa Emilia Sánchez Pérez de Tavares", aka: ["INCART", "National Cancer Institute, Dominican Republic"],
    city: "Santo Domingo", country: "DO", lat: 18.46, lng: -69.92, institutionType: "cancer-center", website: "https://www.incart.gob.do",
    tldr: "The Dominican Republic's public national cancer institute in Santo Domingo, part of the National Health Service. It keeps a hospital cancer registry and published five years of its figures, 2017 to 2021, in 2023.",
    summary: "INCART, the Instituto Nacional del Cáncer Rosa Emilia Sánchez Pérez de Tavares, is a public hospital in the Zona Universitaria of Santo Domingo and part of the public health network of the Servicio Nacional de Salud. Its hospital cancer registry, run by its Directorate of Research and Knowledge Management, recorded 1,115 cases in 2017, 1,411 in 2018, 1,481 in 2019, 1,023 in 2020 and 854 in 2021, as published in its report Indicadores Estadísticos y Epidemiológicos 2017-2021 (2023). The report also covers its paediatric oncology centre, its radio-oncology centre and a pharmacovigilance programme. Its website advertises a breast cancer early detection programme. The coordinates on this record are an approximate Santo Domingo point.",
    programs: ["Hospital cancer registry", "Centro de Oncología Pediátrica", "Centro de Radio-Oncología", "Breast cancer early detection programme", "Pharmacovigilance programme"],
    institutions: ["sisalril-dominican-republic"], cancers: ["breast-cancer", "prostate", "cervical"],
    links: [
      { label: "INCART (Spanish)", url: "https://www.incart.gob.do/" },
      { label: "INCART: Indicadores Estadísticos y Epidemiológicos 2017-2021 (PDF, Spanish)", url: INCART_REPORT },
    ] }),

  i({ id: "sisalril-dominican-republic", name: "Superintendencia de Salud y Riesgos Laborales", aka: ["SISALRIL"],
    city: "Santo Domingo", country: "DO", lat: 18.47, lng: -69.93, institutionType: "government", website: "https://www.sisalril.gob.do",
    tldr: "The Dominican Republic's regulator of the Family Health Insurance (Seguro Familiar de Salud). Its EVTESA unit assesses medicines, procedures and supplies before they are added to the insurance plan.",
    summary: "SISALRIL supervises the Seguro Familiar de Salud and the occupational risks insurance of the Dominican social security system, and publishes what the basic health plan (Plan Básico de Salud) covers. Its EVTESA process of health technology assessment, its page says, supports decisions on including medicines, procedures and health supplies so that the insurance's resources are used efficiently, and anyone can request an assessment through SISALRIL's online office. The coordinates on this record are an approximate Santo Domingo point.",
    programs: ["Seguro Familiar de Salud supervision", "Plan Básico de Salud", "EVTESA health technology assessment"],
    institutions: ["incart-dominican-republic"],
    links: [
      { label: "SISALRIL (Spanish)", url: "https://www.sisalril.gob.do/" },
      { label: "SISALRIL: EVTESA (Spanish)", url: EVTESA },
    ] }),
];

/** Records behind /countries/do/ (wave 9). */
export const recordsDO: EntityInput[] = [...institutions];
