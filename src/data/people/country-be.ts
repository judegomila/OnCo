import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/be/ (wave 5). Public professional information only, read on 11 November 2026: the
 * Belgian Cancer Registry's staff page and its news of 17 July 2025, and the FAMHP's announcement of its 2025 annual
 * report (19 October 2026). The papers were resolved through Europe PMC and their author lists read.
 */
const asOf = "2026-11-11";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleBE: PersonInput[] = [
  p({ id: "liesbet-van-eycken", name: "Liesbet Van Eycken", role: "Director, Belgian Cancer Registry",
    institutionId: "belgian-cancer-registry", institutions: ["belgian-cancer-registry"],
    specialisms: ["Cancer registration", "Cancer epidemiology", "TNM staging"],
    tldr: "She directs the Belgian Cancer Registry, which counts every cancer diagnosed in Belgium, and led a 2025 global survey of population-based cancer registries.",
    summary: "Liesbet Van Eycken is listed on the Belgian Cancer Registry's staff page as Director, Director Research and Director Data Collection and Processing. The registry's news of 17 July 2025 describes her as its director and says she led an international survey of population-based cancer registries with the Union for International Cancer Control, IARC, the International Association of Cancer Registries, NAACCR and the Global Initiative for Cancer Registry Development, published in the International Journal of Cancer with responses from 141 of 268 registries surveyed. She is second author of the 2026 paper setting out the updates and rationale of the ninth edition of the UICC TNM classification, and co-author of the registry's work on cancer survival in Belgium after the COVID-19 pandemic.",
    profiles: [
      { label: "Belgian Cancer Registry: employees", url: "https://kankerregister.org/en/employees" },
      { label: "Belgian Cancer Registry: global survey of population-based cancer registries (17 July 2025)", url: "https://kankerregister.org/en/news/global-survey-reveals-needs-and-future-vision-population-based-cancer-registries" },
    ],
    papers: [
      { title: "Future of population-based cancer registries: A global perspective-A survey of population-based cancer registries", journal: "International Journal of Cancer", year: 2025, doi: "10.1002/ijc.35516", note: "First author" },
      { title: "The 9th Edition of the UICC TNM Classification of Malignant Tumours: Updates and Rationale for Change", journal: "International Journal of Cancer", year: 2026, doi: "10.1002/ijc.70561", note: "Second author" },
      { title: "Monitoring cancer survival in Belgium: early insights 3 years after the COVID-19 pandemic", journal: "Cancer Causes & Control", year: 2026, doi: "10.1007/s10552-025-02121-0" },
    ] }),

  p({ id: "hugues-malonne", name: "Hugues Malonne", role: "Chief Executive Officer, Federal Agency for Medicines and Health Products (FAMHP)",
    institutionId: "famhp", institutions: ["famhp"],
    specialisms: ["Medicines regulation"],
    tldr: "He is chief executive of Belgium's medicines regulator, the FAMHP, which authorises clinical trials and early access programmes in Belgium.",
    summary: "Hugues Malonne is named as the FAMHP's Chief Executive Officer in the agency's announcement of its 2025 annual report, dated 19 October 2026, in which he is quoted on supporting innovation, ensuring the availability of medicines, strengthening dialogue with patients and the agency's handling of the case of a sperm donor carrying a TP53 gene mutation.",
    profiles: [{ label: "FAMHP: 2025 annual report announcement (19 October 2026)", url: "https://www.famhp.be/en/news/ensuring_access_to_treatments_today_while_preparing_for_those_of_tomorrow" }] }),
];
