import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/iq/ (wave 5). Public professional information only. The role comes from the Iraqi Cancer
 * Board's own Cancer Registry of Iraq annual report 2022 (Ministry of Health PDF), which lists him as the Board's
 * General Secretary and a reviewer of the report, read on 11 November 2026.
 */
const asOf = "2026-11-11";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleIQ: PersonInput[] = [
  p({ id: "tahseen-al-rubai", name: "Tahseen Al-Rubai", aka: ["Tahseen Al Rubai"], role: "General Secretary, Iraqi Cancer Board, Ministry of Health, Iraq",
    institutionId: "iraqi-cancer-board", institutions: ["iraqi-cancer-board"],
    specialisms: ["Clinical oncology", "Cancer registration"],
    tldr: "A clinical oncologist who is General Secretary of the Iraqi Cancer Board, the Ministry of Health body that runs Iraq's national cancer registry, and who reviewed its annual report for 2022.",
    summary: "The Iraqi Cancer Board's Cancer Registry of Iraq annual report 2022 lists Dr Tahseen Al-Rubai, clinical oncologist (MBChB, DMTR), as General Secretary of the Cancer Board in Iraq and as a reviewer of the report, and names him last in its list of the Board's secretaries general since it was set up in 1985, whose main responsibility was preparing the registry's annual report. In 2023, as director general of the Board, he told The National that the true number of cancers could be higher than the registry's count because it does not include Iraqis treated outside the country.",
    profiles: [
      { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: "https://storage.moh.gov.iq/2024/03/31/2024_03_31_11983087032_3940351786864953.pdf" },
      { label: "The National: cancer's toll in Iraq (4 August 2023)", url: "https://www.thenationalnews.com/health/2023/08/04/cancers-devastating-toll-in-iraq-families-face-emotional-and-financial-strain" },
    ],
    papersExpected: false }),
];
