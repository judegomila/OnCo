import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/pr/ (wave 10). Each role was read on 11 November 2026 from a primary source: the staff
 * page of the Puerto Rico Central Cancer Registry's report "Cancer in Puerto Rico, 2018-2022" (2025), and NCI's NCORP
 * site list. Papers are ones whose abstracts were read through Europe PMC for this page.
 */
const asOf = "2026-11-11";
const RCPR_REPORT = "https://rcpr.org/Portals/0/informe%202018-2022%20-%20Ingles.pdf";
const NCORP_SITES = "https://ncorp.cancer.gov/findasite/";

export const peoplePR: PersonInput[] = [
  { kind: "person", asOf, id: "karen-j-ortiz-ortiz", name: "Karen J. Ortiz-Ortiz", aka: ["Karen J. Ortiz Ortiz", "Karen Ortiz-Ortiz"],
    role: "Director, Puerto Rico Central Cancer Registry",
    institutionId: "puerto-rico-central-cancer-registry", institutions: ["puerto-rico-central-cancer-registry", "upr-comprehensive-cancer-center"],
    specialisms: ["Cancer registration", "Cancer epidemiology", "Health services research"],
    tldr: "Karen J. Ortiz-Ortiz directs Puerto Rico's population-based cancer registry, which counts every cancer diagnosed on the island, and is an author of many of the studies built on it.",
    summary: "The staff page of the registry's report Cancer in Puerto Rico, 2018-2022 (2025) names Karen J. Ortiz Ortiz, MA, MPH, DrPH, as director of the Puerto Rico Central Cancer Registry, and she is one of its editors. The registry is a Department of Health programme administered by the University of Puerto Rico Comprehensive Cancer Center. She is an author of registry studies on cervical cancer trends, colorectal cancer diagnoses after the 2017 hurricanes and COVID-19, radiotherapy after breast-conserving surgery by type of insurance, and cancer screening in the US territories.",
    profiles: [{ label: "Cancer in Puerto Rico, 2018-2022: registry staff (PDF)", url: RCPR_REPORT }],
    papers: [
      { title: "Evaluating the impact of hurricanes and the COVID-19 pandemic on colorectal cancer incidence in Puerto Rico: An interrupted time-series analysis", journal: "Cancer", year: 2025, doi: "10.1002/cncr.35793" },
      { title: "Recent cervical cancer incidence, stage at diagnosis, and mortality trends in Puerto Rico, 2001-2019", journal: "BMC Medicine", year: 2024, doi: "10.1186/s12916-024-03535-4" },
      { title: "Breast, cervical, and colorectal cancer screening test use in the US territories of Guam, Puerto Rico, and the US Virgin Islands", journal: "Cancer Epidemiology", year: 2023, doi: "10.1016/j.canep.2023.102371" },
      { title: "Underuse of Radiation Therapy After Breast Conservation Surgery in Puerto Rico: A Puerto Rico Central Cancer Registry-Health Insurance Linkage Database Study", journal: "Journal of Global Oncology", year: 2018, doi: "10.1200/JGO.2016.008664" },
    ],
    links: [{ label: "Cancer in Puerto Rico, 2018-2022 (Puerto Rico Central Cancer Registry, 2025, PDF)", url: RCPR_REPORT }],
    tags: ["epidemiology"], cancers: ["cervical", "colorectal", "breast-cancer"] },

  { kind: "person", asOf, id: "luis-j-santos-reyes", name: "Luis J. Santos Reyes", aka: ["Luis Santos Reyes"],
    role: "Principal investigator, Puerto Rico NCORP",
    institutionId: "puerto-rico-ncorp", institutions: ["puerto-rico-ncorp"],
    specialisms: ["Community oncology research"],
    tldr: "Luis J. Santos Reyes leads Puerto Rico's site in the National Cancer Institute's community research network, which brings NCI-funded cancer trials to hospitals and practices across the island.",
    summary: "NCI's NCORP site list names Luis J. Santos Reyes, M.D., as principal investigator of Puerto Rico NCORP, based in San Juan, whose affiliates include the University of Puerto Rico Comprehensive Cancer Center, HIMA San Pablo Oncologic Hospital, the I. González Martínez Oncologic Hospital, San Juan City Hospital and University Pediatric Hospital.",
    profiles: [{ label: "NCI NCORP: find a site (Puerto Rico NCORP)", url: NCORP_SITES }],
    links: [{ label: "NCI NCORP: find a site (Puerto Rico NCORP)", url: NCORP_SITES }],
    tags: ["clinician"], cancers: [] },
];
