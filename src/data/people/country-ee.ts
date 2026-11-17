import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/ee/ (wave 13). Each role was read on the institution's own page on 16 November 2026:
 * Tervise Arengu Instituut's release of 24 September 2026 names Margit Mägi as head of the cancer registry ("TAI
 * vähiregistri juht"), its release of 25 March 2026 names Dolores Eamets as head of the cancer screening registry ("TAI
 * vähi sõeluuringute registri juht"), and the State Agency of Medicines' "about" page names Katrin Kiisk as its
 * Director General.
 */
const asOf = "2026-11-16";
const TAI_2024 = "https://www.tai.ee/et/uudised/vahijuhtude-arv-pusinud-eelmise-aastaga-samal-tasemel";
const TAI_SCREEN_2025 = "https://www.tai.ee/et/uudised/elupaastvatel-vahi-soeluuringutel-osales-eelmisel-aastal-ule-183-000-inimese";
const TAI_REPORT = "https://www.tai.ee/sites/default/files/2026-07/cancer_in_estonia_2023.pdf";
const SAM = "https://www.ravimiamet.ee/en/agency-and-contact/about-state-agency-medicines";

export const peopleEE: PersonInput[] = [
  { kind: "person", asOf, id: "margit-magi", name: "Margit Mägi",
    role: "Head of the Estonian Cancer Registry, Tervise Arengu Instituut (National Institute for Health Development)",
    institutionId: "estonian-cancer-registry", institutions: ["estonian-cancer-registry", "tervise-arengu-instituut"], specialisms: ["Cancer registration", "Cancer epidemiology"],
    tldr: "Margit Mägi heads the Estonian Cancer Registry at Tervise Arengu Instituut, which has recorded every cancer diagnosed in Estonia since 1968.",
    summary: "Margit Mägi is named as head of the cancer registry in Tervise Arengu Instituut's release of 24 September 2026 on cancers diagnosed in 2024. In it she said that, looking at age-standardised rates since 2020, lung cancer has fallen in men and stayed stable in women, that the rise in colon and rectal cancer appears to have stopped in both sexes, and that cervical cancer continues to fall, which she linked to screening. She is a co-author of the institute's 2026 report Cancer in Estonia.",
    profiles: [{ label: "TAI: 2024 incidence release (24 September 2026)", url: TAI_2024 }],
    papers: [{ title: "Cancer in Estonia: incidence 2023, survival 2019-2023 and stage-specific incidence 2012-2023", journal: "National Institute for Health Development (report)", year: 2026, url: TAI_REPORT, note: "Zimmermann ML, Innos K, Paapsi K, Veerus P, Baburin A, Mägi M." }],
    links: [{ label: "TAI: Vähijuhtude arv on püsinud eelmise aastaga samal tasemel", url: TAI_2024 }, { label: "TAI: Cancer in Estonia (2026, PDF)", url: TAI_REPORT }],
    tags: ["government"], cancers: [] },

  { kind: "person", asOf, id: "dolores-eamets", name: "Dolores Eamets",
    role: "Head of the Cancer Screening Registry, Tervise Arengu Instituut (National Institute for Health Development)",
    institutionId: "estonian-cancer-screening-registry", institutions: ["estonian-cancer-screening-registry", "tervise-arengu-instituut"], specialisms: ["Cancer screening"],
    tldr: "Dolores Eamets heads the cancer screening registry at Tervise Arengu Instituut, which draws up Estonia's invitation lists for breast, cervical and bowel screening.",
    summary: "Dolores Eamets is named as head of the cancer screening registry in Tervise Arengu Instituut's release of 25 March 2026 on screening in 2025. She said that one birth cohort is planned to be added to bowel screening each year until it starts at 50, as recommended, and that differences in participation between districts of Tallinn point to a need for targeted work where rates are lowest.",
    profiles: [{ label: "TAI: screening in 2025 (25 March 2026)", url: TAI_SCREEN_2025 }],
    links: [{ label: "TAI: vähi sõeluuringutel osaleti eelmisel aastal üle 183 000 korra", url: TAI_SCREEN_2025 }],
    papersExpected: false,
    tags: ["government"], cancers: [] },

  { kind: "person", asOf, id: "katrin-kiisk", name: "Katrin Kiisk",
    role: "Director General, Ravimiamet (State Agency of Medicines, Estonia)",
    institutionId: "ravimiamet-estonia", institutions: ["ravimiamet-estonia"], specialisms: ["Medicines regulation"],
    tldr: "Katrin Kiisk is Director General of Ravimiamet, Estonia's State Agency of Medicines, which assesses medicines and clinical trial applications.",
    summary: "The State Agency of Medicines' own page names Katrin Kiisk as its Director General. The agency, under the Ministry of Social Affairs, has nine departments and over 130 employees, with its main office in Tartu and another in Tallinn.",
    profiles: [{ label: "Ravimiamet: about the State Agency of Medicines", url: SAM }],
    links: [{ label: "Ravimiamet: about the State Agency of Medicines", url: SAM }],
    papersExpected: false,
    tags: ["government"], cancers: [] },
];
