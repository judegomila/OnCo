import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/cz/ (wave 5). Public professional information only. The role and its start date come
 * from SÚKL's own mandatory disclosure page (list of directors since 1952), read on 11 November 2026. Linked from the
 * SÚKL record (`sukl`) in src/data/country-records-cz.ts.
 */
const asOf = "2026-11-11";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleCZ: PersonInput[] = [
  p({ id: "tomas-boran", name: "Tomáš Boráň", role: "Director, State Institute for Drug Control (SÚKL), Prague",
    institutionId: "sukl", institutions: ["sukl"], specialisms: ["Medicines regulation", "Pricing and reimbursement of medicines"], papersExpected: false,
    tldr: "He has led SÚKL, Czechia's medicines regulator, since May 2024. SÚKL decides the price ceiling of a medicine and whether public health insurance pays for it.",
    summary: "MUDr. Tomáš Boráň is director of the Státní ústav pro kontrolu léčiv (SÚKL), according to the list of directors on SÚKL's mandatory disclosure page, which gives his term as starting on 2 May 2024. He followed PharmDr. Jakub Velík, Ph.D., who had been entrusted with running the institute in the interim from 21 December 2023 to 30 April 2024. SÚKL, under the Ministry of Health, oversees medicines and authorises clinical trials in Czechia and, under Act 48/1997 Coll., sets maximum prices and the level and conditions of reimbursement of medicines, including temporary reimbursement of highly innovative cancer medicines.",
    profiles: [{ label: "SÚKL: povinně zveřejňované informace (list of directors)", url: "https://sukl.gov.cz/o-nas/povinne-zverejnovane-informace/" }],
  }),
];
