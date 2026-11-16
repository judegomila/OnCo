import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/pe/ (wave 5). Public professional information only, from the Peruvian state's directory
 * of officials on gob.pe, read on 11 November 2026. Nothing beyond the appointment is stated because nothing else was
 * found on an official page.
 */
const asOf = "2026-11-11";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peoplePE: PersonInput[] = [
  p({ id: "wilder-calmet-berrocal", name: "Wilder Genaro Calmet Berrocal", role: "Jefe Institucional (Institutional Head), Instituto Nacional de Enfermedades Neoplásicas, Lima",
    institutionId: "inen-peru", institutions: ["inen-peru"], papersExpected: false,
    tldr: "Institutional head of Peru's national cancer institute, INEN, since August 2026, appointed by supreme resolution.",
    summary: "Wilder Genaro Calmet Berrocal is the Jefe Institucional, the institutional head, of the Instituto Nacional de Enfermedades Neoplásicas (INEN) in Lima, Peru's national cancer institute. The Peruvian state's directory of officials gives the start date as 21 August 2026 and the appointing instrument as Resolución Suprema 017-2026-SA. Francisco Berrospi Espinoza, institutional head from 2022, now directs INEN's surgery directorate. OnCo found no official biography beyond the appointment.",
    profiles: [
      { label: "INEN directory of officials: Wilder Genaro Calmet Berrocal (gob.pe)", url: "https://www.gob.pe/institucion/inen/funcionarios/263521-wilder-genaro-calmet-berrocal" },
    ] }),
];
