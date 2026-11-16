import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Moldova: the public bodies behind /countries/md/ (wave 12) that the corpus did not hold, written from the Ministry of
 * Health's 2026 explanatory note to the draft National Cancer Control Programme 2026 to 2030, its 2024 draft action plan
 * (both read raw in Romanian on 11 November 2026 from the government's consultation portal) and the medicines agency's
 * home page. The Oncological Institute already exists (institutions/europe.ts) and is reused. Coordinates are approximate
 * city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const NOTE_2026 = "https://particip.gov.md/ro/download_attachment/42373";

const institutions: InstitutionInput[] = [
  i({ id: "moldova-ministry-of-health", name: "Ministry of Health of the Republic of Moldova", aka: ["Ministerul Sănătății", "Ministry of Health Moldova", "MS Moldova"],
    city: "Chișinău", country: "MD", lat: 47.02, lng: 28.83, institutionType: "government",
    tldr: "Moldova's health ministry. With the Oncological Institute and WHO support it drafted the National Cancer Control Programme 2026 to 2030, costed at about 2.6 billion lei and tied to the country's EU accession programme.",
    summary: "The Ministry of Health oversees Moldova's National Cancer Control Programme, approved for 2016 to 2025 by Government Decision 1291/2016. Its explanatory note to the draft programme for 2026 to 2030 counts 11,238 new cancers registered in 2024 (9,480 in 2015), 71,789 people living with cancer and more than 5,900 deaths a year, says cancer is found late in about half of cases and specialised treatment is concentrated in Chișinău, and costs the new programme at 2,595,058.6 thousand lei from the state budget, the compulsory health insurance funds and external partners. The draft rests on action 64 of the National Programme for Accession to the European Union 2025 to 2029 (Government Decision 306/2025), drew on imPACT missions in November 2025 and January 2026 with WHO, IARC, the IAEA and St. Jude, and was validated by the Council for the Coordination of Sustainable Development on 14 May 2026.",
    programs: ["National Cancer Control Programme 2016 to 2025", "Draft National Cancer Control Programme 2026 to 2030", "National Immunisation Programme 2023 to 2027"],
    institutions: ["oncological-institute-moldova", "amdm-moldova", "who", "iarc", "iaea"],
    links: [
      { label: "Ministry of Health: explanatory note to the draft National Cancer Control Programme 2026 to 2030 (PDF, in Romanian)", url: NOTE_2026 },
      { label: "Ministry of Health: draft action plan 2024 to 2025 for the National Cancer Control Programme (PDF, in Romanian)", url: "https://particip.gov.md/ro/download_attachment/22387" },
    ] }),

  i({ id: "amdm-moldova", name: "Medicines and Medical Devices Agency of Moldova (AMDM)", aka: ["AMDM", "Agenția Medicamentului și Dispozitivelor Medicale"],
    city: "Chișinău", country: "MD", lat: 47.02, lng: 28.83, institutionType: "government", website: "https://amdm.gov.md",
    tldr: "Moldova's medicines and medical devices regulator, in Chișinău. It publishes pharmaceutical market statistics and runs medicine safety reporting.",
    summary: "The Agenția Medicamentului și Dispozitivelor Medicale regulates medicines and medical devices in Moldova from Korolenko street 2/1, Chișinău. Its home page, read on 11 November 2026, carried notices on its meeting schedule, pharmaceutical market statistics and Moldova's participation in the 2026 #MedSafetyWeek campaign on reporting adverse reactions. OnCo has not read its rules for registering medicines or authorising clinical trials.",
    programs: ["Medicine registration", "Pharmacovigilance", "Pharmaceutical market statistics"],
    institutions: ["moldova-ministry-of-health"],
    links: [{ label: "AMDM: home page (in Romanian)", url: "https://amdm.gov.md/" }] }),
];

/** Records behind /countries/md/ (wave 12). */
export const recordsMD: EntityInput[] = [...institutions];
