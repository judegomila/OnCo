import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Panama: the public bodies behind /countries/pa/ (wave 12) that the corpus did not hold, written from the Instituto
 * Oncológico Nacional's own pages and its 2024 hospital registry bulletin, read raw in Spanish on 11 November 2026. The
 * Caja de Seguro Social's site refused a script, so its record describes only what the institute's sources say of it.
 * Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const ION_BULLETIN_2024 = "https://ion.gob.pa/wp-content/uploads/2025/07/BOLETIN-2024-FINAL.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "ion-panama", name: "Instituto Oncológico Nacional Dr. Juan Demóstenes Arosemena", aka: ["ION Panama", "Instituto Oncológico Nacional", "National Oncology Institute of Panama"],
    city: "Panama City", country: "PA", lat: 8.97, lng: -79.55, institutionType: "cancer-center", website: "https://ion.gob.pa",
    tldr: "Panama's national cancer institute, in the former Gorgas Hospital buildings in Ancón, Panama City. It saw 4,934 new patients in 2023, and its hospital registry recorded 5,273 cancers diagnosed or treated there in 2024.",
    summary: "The Instituto Oncológico Nacional traces itself to the Instituto Radiológico Nacional, founded in 1936 under President Juan Demóstenes Arosemena, which opened its own building on 18 September 1940. Law 11 of 4 July 1984 created the institute under its present name, and in 1999 it moved into buildings 242 and 254 of the former Gorgas Hospital, transferred by Cabinet Resolution 44 of 3 June 1999. Its hospital cancer registry (RHC-ION), kept since 1 January 2012, holds more than 55,935 cases; its 2024 bulletin counts 5,273 cases (breast 1,142, prostate 574, colon 409, cervix 372), referred 48% by the Caja de Seguro Social, 30% by the Ministry of Health and 22% by private hospitals and clinics. Its home page reports 4,934 new patients and 155,883 consultations in 2023.",
    programs: ["Hospital cancer registry (RHC-ION, since 2012)", "Radiotherapy", "Chemotherapy", "Surgical oncology", "Medicines committee"],
    institutions: ["css-panama"],
    cancers: ["breast-cancer", "prostate", "colorectal", "cervical"],
    links: [
      { label: "ION: historical review (Reseña histórica)", url: "https://ion.gob.pa/?page_id=395" },
      { label: "ION: hospital cancer registry (RHC-ION)", url: "https://ion.gob.pa/?page_id=556" },
      { label: "ION: hospital cancer registry bulletin 2024 (PDF, in Spanish)", url: ION_BULLETIN_2024 },
      { label: "ION: home page, figures for 2023", url: "https://ion.gob.pa/" },
    ] }),

  i({ id: "css-panama", name: "Caja de Seguro Social (Panama)", aka: ["CSS Panama", "Caja de Seguro Social", "Social Security Fund of Panama"],
    city: "Panama City", country: "PA", lat: 8.98, lng: -79.52, institutionType: "government", website: "https://www.css.gob.pa",
    tldr: "Panama's social security fund. Its hospitals and polyclinics referred 48% of the cancer cases the national cancer institute saw in 2024.",
    summary: "The Caja de Seguro Social is Panama's social security institution. The Instituto Oncológico Nacional's admission rules require insured patients to bring an authorisation form issued by the Caja and signed by the director of the Hospital de Cancerología de la Ciudad Salud, with their social security card. The institute's 2024 registry bulletin counts 2,552 of its 5,273 cases (48%) as referred from Caja facilities, 1,219 of them from the Complejo Hospitalario Dr. Arnulfo A. Madrid. OnCo could not read the Caja's own site, which refused a script on 11 November 2026, so this record holds only what the institute's sources say.",
    programs: ["Social health insurance", "Hospital de Cancerología de la Ciudad Salud", "Complejo Hospitalario Dr. Arnulfo A. Madrid"],
    institutions: ["ion-panama"],
    links: [
      { label: "ION: admission rules for insured patients", url: "https://ion.gob.pa/?page_id=493" },
      { label: "ION: hospital cancer registry bulletin 2024, graph 3 and table 7 (PDF)", url: ION_BULLETIN_2024 },
      { label: "Caja de Seguro Social", url: "https://www.css.gob.pa/" },
    ] }),
];

/** Records behind /countries/pa/ (wave 12). */
export const recordsPA: EntityInput[] = [...institutions];
