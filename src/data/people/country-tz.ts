import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/tz/ (wave 6). Each role was read on the institution's own pages on 11 November 2026: the
 * National Health Insurance Fund's management page and its news page of 25 September 2026, and the Tanzania
 * Medicines and Medical Devices Authority's home page news items of October 2026.
 */
const asOf = "2026-11-11";
const NHIF_AK = "https://www.nhif.or.tz/news/agha-khan-kuhudumia-wanachama-wa-nhif";
const TMDA_HOME = "https://www.tmda.go.tz/";

export const peopleTZ: PersonInput[] = [
  { kind: "person", asOf, id: "irene-isaka", name: "Irene C. Isaka",
    role: "Director General, National Health Insurance Fund, Tanzania",
    institutionId: "nhif-tanzania", institutions: ["nhif-tanzania"], specialisms: ["Health insurance", "Health financing"],
    tldr: "Dr Irene C. Isaka is Director General of Tanzania's National Health Insurance Fund, and signed its September 2026 agreement with the Aga Khan Hospital that lets members be treated for cancer there.",
    summary: "The National Health Insurance Fund's management page and its news page of 25 September 2026 name Dr Irene C. Isaka as the Fund's Director General. She signed, for the Fund, an agreement with the Aga Khan Hospital, Dar es Salaam under which NHIF members can receive specialist treatment, cancer care in particular, at the Aga Khan hospitals in Dar es Salaam and Mwanza and the hospital's 14 clinics, and described it as part of widening members' access to specialist cancer treatment while the government implements Universal Health Insurance.",
    profiles: [{ label: "NHIF: management (Swahili)", url: "https://www.nhif.or.tz/administration/management" }],
    links: [{ label: "NHIF: NHIF and Aga Khan agree treatment for members (25 September 2026, Swahili)", url: NHIF_AK }],
    tags: ["government"], cancers: [] },

  { kind: "person", asOf, id: "adam-fimbo", name: "Adam Fimbo",
    role: "Director General, Tanzania Medicines and Medical Devices Authority",
    institutionId: "tmda-tanzania", institutions: ["tmda-tanzania"], specialisms: ["Medicines regulation"],
    tldr: "Dr Adam Fimbo is Director General of the Tanzania Medicines and Medical Devices Authority, the regulator that authorises medicines, devices and clinical trials on the Tanzanian mainland.",
    summary: "The Tanzania Medicines and Medical Devices Authority's home page, in a news item about a courtesy call on the newly appointed Chief Medical Officer at the Ministry of Health in Dodoma on 1 October 2026, names Dr Adam Fimbo as TMDA's Director General. TMDA kept the World Health Organization's maturity level 3 rating for medicine regulation after a 2023 reassessment.",
    profiles: [{ label: "TMDA: home page news", url: TMDA_HOME }],
    links: [{ label: "TMDA: home page news (October 2026)", url: TMDA_HOME }],
    tags: ["government"], cancers: [] },
];
