import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Guinea: the body behind /countries/gn/ (wave 12) that the corpus did not hold, written from the African Cancer Registry
 * Network's page for the Registre des cancers de Guinée, read raw on 11 November 2026. Coordinates are an approximate
 * city point for Conakry.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const AFCRN_GN = "https://afcrn.org/index.php/membership/membership-list/91-guineecr";

const institutions: InstitutionInput[] = [
  i({ id: "registre-cancers-guinee", name: "Registre des cancers de Guinée (Conakry)", aka: ["Cancer Registry of Guinea", "Conakry cancer registry", "Registre de Cancer de Guinée"],
    city: "Conakry", country: "GN", lat: 9.54, lng: -13.68, institutionType: "research-institute", website: AFCRN_GN,
    tldr: "Guinea's cancer registry, set up in 1990 in the pathology department of the Hôpital National de Donka in Conakry. It aims to count cancers among the city's residents, and IARC builds its national estimate for Guinea from a subnational registry.",
    summary: "The Registre des cancers de Guinée was established in 1990 in the Department of Pathology of the Hôpital National de Donka, Conakry, and aims to be population-based for the city, using a six-month residence rule. Its page on the African Cancer Registry Network describes active case-finding by medical students, sources at the Donka and Ignace Deen national hospitals, the Sino-Guinean Friendship Hospital at Kipé, community hospitals and private clinics, and data management in CanReg. Its first results, for 1992 to 1995, were published in the International Journal of Cancer in 1997. For 2006 to 2010 it registered 3,146 cases, 1,949 among Conakry residents, 71% confirmed by histology or cytology. The page's description of its setting, which says there was no radiotherapy service in Guinea and that patients were sent to Dakar, dates from the registry's early years and may not be current.",
    programs: ["Cancer registration for Conakry (since 1990)", "African Cancer Registry Network member registry"],
    institutions: ["hopital-national-donka", "iarc"],
    cancers: ["breast-cancer", "cervical", "hcc", "prostate"],
    links: [{ label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN }] }),

  i({ id: "hopital-national-donka", name: "Hôpital National de Donka (Conakry)", aka: ["Donka National Hospital", "Hôpital de Donka"],
    city: "Conakry", country: "GN", lat: 9.54, lng: -13.68, institutionType: "hospital",
    tldr: "A national hospital in Conakry whose pathology department houses Guinea's cancer registry. The registry's network page describes it as covering all specialities, with a department of oncological surgery and gynaecological oncology.",
    summary: "The African Cancer Registry Network's page for the Registre des cancers de Guinée says the registry, established in 1990, is located in the Department of Pathology of the Hôpital National de Donka, Conakry, and names the hospital as a main source of its cases: a hospital with all specialities, including oncological surgery, one of the city's two pathology laboratories, and, apart from a department of oncological surgery and gynaecological oncology at Donka, little specialised oncology in the country. That description dates from the registry's early years and may not be current; OnCo has not read the hospital's own pages.",
    programs: ["Oncological surgery and gynaecological oncology", "Pathology"],
    institutions: ["registre-cancers-guinee"],
    links: [{ label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN }] }),
];

/** Records behind /countries/gn/ (wave 12). */
export const recordsGN: EntityInput[] = [...institutions];
