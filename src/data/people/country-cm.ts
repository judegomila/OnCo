import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/cm/ (wave 10). The role was read on the Ministry of Public Health's own news pages on
 * 11 November 2026: the handover at the National Committee for the Fight against Cancer (12 February 2026) and the
 * paediatric oncology manual meeting (30 May 2025).
 */
const asOf = "2026-11-11";
const HANDOVER = "https://minsante.cm/site/?q=fr/content/comit%C3%A9-national-de-lutte-contre-le-cancer-cnlca-dr-zeh-kakanou-florence-prend-la-rel%C3%A8ve";
const PAEDS = "https://minsante.cm/site/?q=fr/content/lutte-contre-les-cancers-p%C3%A9diatriques-am%C3%A9liorer-la-prise-en-charge-des-cancers-infantiles";

export const peopleCM: PersonInput[] = [
  { kind: "person", asOf, id: "florence-zeh-kakanou", name: "Florence Zeh Kakanou",
    role: "Permanent Secretary, National Committee for the Fight against Cancer (CNLCa), Ministry of Public Health of Cameroon",
    institutionId: "cnlc-cameroon", institutions: ["cnlc-cameroon", "cameroon-ministry-of-public-health"], specialisms: ["Cancer control policy"],
    tldr: "Dr Florence Zeh Kakanou has led Cameroon's National Committee for the Fight against Cancer as Permanent Secretary since February 2026.",
    summary: "The Ministry of Public Health reports that Dr Florence Zeh Kakanou took over as Permanent Secretary of the National Committee for the Fight against Cancer (CNLCa) on 12 February 2026, succeeding Professor Blaise Nkegoum, at a handover chaired by the Ministry's Secretary General, and promised a 100-day work plan. Before that the Ministry's pages name her as its Technical Adviser No. 3: in that role she declared the national cervical cancer elimination strategy validated on 16 July 2025, on the Minister's behalf, and at a May 2025 meeting on revising the paediatric oncology care network manual she gave the team one week to finalise it.",
    profiles: [
      { label: "MINSANTE: CNLCa, Dr Zeh Kakanou Florence takes over (12 February 2026)", url: HANDOVER },
      { label: "MINSANTE: improving care for childhood cancers (30 May 2025)", url: PAEDS },
    ],
    links: [
      { label: "MINSANTE: CNLCa, Dr Zeh Kakanou Florence takes over (12 February 2026)", url: HANDOVER },
      { label: "MINSANTE: cervical cancer, Cameroon on the road to elimination (19 July 2025)", url: "https://minsante.cm/site/?q=fr/content/cancer-du-col-de-lut%C3%A9rus-le-cameroun-sur-la-voie-de-son-%C3%A9limination" },
    ],
    tags: ["government"], cancers: ["cervical"] },
];
