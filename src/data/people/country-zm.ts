import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/zm/ (wave 10). The role was read on 11 November 2026 in the Zambia Medicines Regulatory
 * Authority's own press statement of 29 October 2026, which names its Director General. Susan Msadabwe, Senior Medical
 * Superintendent of the Cancer Diseases Hospital, already exists (people/leaders-wave4.ts) and is reused.
 */
const asOf = "2026-11-11";
const ZAMRA_AMA = "https://www.zamra.co.zm/wp-content/uploads/2026/10/ZAMRA-AMA-APOINTMENTS-edited.pdf";

export const peopleZM: PersonInput[] = [
  { kind: "person", asOf, id: "makomani-siyanga", name: "Makomani Siyanga",
    role: "Director General, Zambia Medicines Regulatory Authority",
    institutionId: "zamra-zambia", institutions: ["zamra-zambia"], specialisms: ["Medicines regulation"],
    tldr: "Makomani Siyanga is Director General of the Zambia Medicines Regulatory Authority, the body that registers medicines and authorises clinical trials in Zambia.",
    summary: "Mr Makomani Siyanga is named as Director General of the Zambia Medicines Regulatory Authority (ZAMRA) in its press statement of 29 October 2026 announcing the appointment of two ZAMRA staff to technical committees of the African Medicines Agency. He is also listed as the reviewer of ZAMRA's 2026 guidelines for the marketing authorisation of medicines for human use. A 2025 study of good review practices at ZAMRA lists an author M Siyanga with a ZAMRA affiliation.",
    profiles: [{ label: "ZAMRA: statement on appointments to African Medicines Agency technical committees (29 October 2026, PDF)", url: ZAMRA_AMA }],
    links: [
      { label: "ZAMRA: statement on appointments to African Medicines Agency technical committees (29 October 2026, PDF)", url: ZAMRA_AMA },
      { label: "ZAMRA: guidelines for marketing authorisation of a medicine for human use, MA/GUD/016 (scanned PDF)", url: "https://www.zamra.co.zm/wp-content/uploads/2026/10/MA_GUD_016_Guidelines-for-MA-of-Medcines-for-Human-Use-1.pdf" },
    ],
    papers: [{ title: "Assessment of compliance with good review practices by medicine assessors within the Zambia medicines regulatory authority", journal: "Frontiers in Medicine", year: 2025, doi: "10.3389/fmed.2025.1706139" }],
    tags: ["leadership", "government", "regulation"], cancers: [] },
];
