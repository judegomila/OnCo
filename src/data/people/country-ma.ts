import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/ma/ (wave 5). Public professional information only. The role comes from the registry team
 * page of the Greater Casablanca cancer registry's incidence report for 2013 to 2017 (PDF published on the Fondation Lalla
 * Salma's site, file dated April 2022), read on 11 November 2026; the paper was resolved through Europe PMC.
 */
const asOf = "2026-11-11";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleMA: PersonInput[] = [
  p({ id: "karima-bendahhou", name: "Karima Bendahhou", role: "Epidemiologist responsible for the Registre des Cancers de la Région du Grand Casablanca",
    institutionId: "casablanca-cancer-registry", institutions: ["casablanca-cancer-registry", "centre-mohammed-vi-casablanca"],
    specialisms: ["Cancer epidemiology", "Cancer registration"],
    tldr: "An epidemiologist named as the person responsible for the Greater Casablanca cancer registry, whose 2013 to 2017 incidence report she analysed and wrote.",
    summary: "Dr Karima Bendahhou is listed in the registry team of the Registre des Cancers de la Région du Grand Casablanca's incidence report for 2013 to 2017 as the registry's responsible officer, a medical epidemiologist, and is credited with its statistical analysis and writing. The report counts 25,143 new cancers among residents of Greater Casablanca over the five years. The 2020 to 2029 national cancer plan lists her among the participants in its treatment and palliative care planning workshop as the person responsible for the registry, at the Centre Mohammed VI for cancer treatment of the CHU Ibn Rochd. She has co-authored papers with the registry's director, Abdellatif Benider, including a 2019 study using the population and hospital registries in Casablanca to estimate the incidence of inflammatory breast cancer.",
    profiles: [
      { label: "RCGC: incidence report 2013 to 2017, registry team (PDF)", url: "https://contrelecancer.ma/site_media/uploaded_files/Registre_des_Cancers_de_la_Region_du_Grand_Casablanca_2013-2017.pdf" },
      { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, list of workshop participants (PDF)", url: "https://lodj.ma/attachment/2414341" },
      { label: "PubMed author search", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Bendahhou%20K%5BAuthor%5D" },
    ],
    papers: [
      { title: "Evaluating the incidence of inflammatory breast cancer using population- and hospital-based cancer registries in Casablanca, Morocco", journal: "Breast Disease", year: 2019, doi: "10.3233/bd-180357" },
    ] }),
];
