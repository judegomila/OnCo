import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/hn/ (wave 12). The role was read on the Agencia de Regulación Sanitaria's home page, in
 * Spanish, on 11 November 2026, in a news item dated 29 July 2026.
 */
const asOf = "2026-11-11";
const ARSA = "https://arsa.gob.hn/";

export const peopleHN: PersonInput[] = [
  { kind: "person", asOf, id: "leonardo-a-sanchez", name: "Leonardo A. Sánchez",
    role: "Comisionado Presidente, Agencia de Regulación Sanitaria (ARSA), Honduras",
    institutionId: "arsa-honduras", institutions: ["arsa-honduras"], specialisms: ["Medicines regulation"],
    tldr: "Leonardo A. Sánchez heads Honduras's health products regulator, ARSA, as its Comisionado Presidente.",
    summary: "A news item of 29 July 2026 on the home page of the Agencia de Regulación Sanitaria, read in Spanish on 11 November 2026, names Dr. Leonardo A. Sánchez as ARSA's Comisionado Presidente. OnCo has not read a fuller biography.",
    profiles: [{ label: "ARSA: home page (in Spanish)", url: ARSA }],
    links: [{ label: "ARSA: home page (in Spanish)", url: ARSA }],
    tags: ["government", "regulation"], cancers: [] },
];
