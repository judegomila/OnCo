import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/hu/ (wave 6). Each role was read on the body's own pages on 11 November 2026: the
 * National Institute of Oncology's page for the National Cancer Registry and Biostatistics Centre, and the National
 * Centre for Public Health and Pharmacy's notice of 3 November 2026 on its new name.
 */
const asOf = "2026-11-11";
const NRR = "https://onkol.hu/nemzeti-rakregiszter-es-biostatisztikai-kozpont/";
const ONI_NAME = "https://nngyk.gov.hu/hu/tovabbi-hirek/az-nngyk-uj-elnevezese-orszagos-nepegeszsegugyi-intezetre-oni.html";

export const peopleHU: PersonInput[] = [
  { kind: "person", asOf, id: "istvan-kenessey", name: "István Kenessey",
    role: "Head, National Cancer Registry and Biostatistics Centre, National Institute of Oncology, Budapest",
    institutionId: "hungarian-national-cancer-registry", institutions: ["hungarian-national-cancer-registry", "noi-budapest"], specialisms: ["Cancer registration", "Cancer epidemiology", "Biostatistics"],
    tldr: "István Kenessey heads Hungary's National Cancer Registry at the National Institute of Oncology in Budapest and is senior author of the registry's evaluations of its own data quality and of lung cancer in Hungary.",
    summary: "Dr. István Kenessey is named as head of department (osztályvezető) and centre head of the Nemzeti Rákregiszter és Biostatisztikai Központ on the National Institute of Oncology's registry page, which lists the registry's staff and selected publications. He is senior author of the 2023 evaluation of data quality at the Hungarian National Cancer Registry for 2000 to 2019, written with IARC's Cancer Surveillance Branch, and first author of a 2024 study that corrected the registry's 2018 lung cancer count from 11,746 reported cases to 9,519.",
    profiles: [
      { label: "Országos Onkológiai Intézet: Nemzeti Rákregiszter és Biostatisztikai Központ", url: NRR },
      { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Kenessey+I%5BAuthor%5D" },
    ],
    links: [
      { label: "Országos Onkológiai Intézet: Nemzeti Rákregiszter és Biostatisztikai Központ", url: NRR },
      { label: "Wéber et al., Cancer Epidemiol 2023 (DOI)", url: "https://doi.org/10.1016/j.canep.2022.102306" },
      { label: "Kenessey et al., Sci Rep 2024 (DOI)", url: "https://doi.org/10.1038/s41598-024-70143-w" },
    ],
    tags: ["epidemiology", "registry"], cancers: ["lung-cancer"] },

  { kind: "person", asOf, id: "beatrix-oroszi", name: "Beatrix Oroszi",
    role: "National Chief Medical Officer of Hungary (országos tisztifőorvos), head of the National Institute of Public Health",
    institutionId: "oni-hungary", institutions: ["oni-hungary"], specialisms: ["Public health", "Epidemiology"],
    tldr: "Beatrix Oroszi is Hungary's national chief medical officer and the head of the National Institute of Public Health, which organises the country's cancer screening programmes.",
    summary: "Dr. Beatrix Oroszi is named as national chief medical officer (országos tisztifőorvos) and the person entitled to represent the Országos Népegészségügyi Intézet in the institute's notice of 3 November 2026 announcing its new name. The institute's own page says it is led by the national chief medical officer and that it is responsible for the planning and organisation of population screening, including the national breast, cervical and colorectal cancer screening programmes.",
    profiles: [{ label: "NNGYK: notice on the new name, Országos Népegészségügyi Intézet, 3 November 2026", url: ONI_NAME }],
    links: [
      { label: "NNGYK: notice on the new name, Országos Népegészségügyi Intézet, 3 November 2026", url: ONI_NAME },
      { label: "NNGYK: rólunk (about us)", url: "https://nngyk.gov.hu/hu/rolunk.html" },
    ],
    tags: ["government", "public-health"], cancers: [] },
];
