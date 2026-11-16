import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Honduras: the body behind /countries/hn/ (wave 12) that the corpus did not hold, written from the Agencia de Regulación
 * Sanitaria's home page, read raw in Spanish on 11 November 2026. Coordinates are an approximate city point for
 * Tegucigalpa.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const institutions: InstitutionInput[] = [
  i({ id: "arsa-honduras", name: "Agencia de Regulación Sanitaria (ARSA), Honduras", aka: ["ARSA", "Agencia de Regulación Sanitaria", "Sanitary Regulation Agency of Honduras"],
    city: "Tegucigalpa", country: "HN", lat: 14.08, lng: -87.21, institutionType: "government", website: "https://arsa.gob.hn",
    tldr: "Honduras's health products regulator. Its website has sections on pharmaceutical products, clinical trials and a national pharmacovigilance centre.",
    summary: "The Agencia de Regulación Sanitaria regulates pharmaceutical and other health products in Honduras. Its home page, read in Spanish on 11 November 2026, lists services for pharmaceutical products, clinical trials, surveillance and inspection, donations and special authorisations, and a Centro Nacional de Farmacovigilancia. News items of 28 and 29 July 2026 describe work with experts from SE-COMISCA on pharmacovigilance and with UNAH on the pharmaceutical sector, and name Dr Leonardo A. Sánchez as its Comisionado Presidente. OnCo has not read its registration or trial authorisation rules.",
    programs: ["Pharmaceutical product registration", "Clinical trials", "Centro Nacional de Farmacovigilancia", "Surveillance and inspection"],
    people: ["leonardo-a-sanchez"],
    links: [{ label: "Agencia de Regulación Sanitaria (ARSA): home page", url: "https://arsa.gob.hn/" }] }),
];

/** Records behind /countries/hn/ (wave 12). */
export const recordsHN: EntityInput[] = [...institutions];
