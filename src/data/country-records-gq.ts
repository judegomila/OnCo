import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Equatorial Guinea: the body behind /countries/gq/ (wave 14) that the corpus did not hold. The corpus held no
 * institution for the country. Written from the Ministry of Health and Social Welfare's own site (guineasalud.org, its
 * front page, one news page of December 2020 and the minister's speech of 22 April 2024) and from one paper, resolved through Europe PMC with its abstract
 * read, all on 16 November 2026. The coordinates are OpenStreetMap Nominatim's city point for Malabo.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const MOH = "https://guineasalud.org/";
const MOH_WORKSHOP = "https://guineasalud.org/clausura-del-taller-sobre-tecnicas-de-diagnostico-del-cancer-cervicouterino/";
const MOH_HPV_PILOT = "https://guineasalud.org/discurso-de-s-e-el-ministro-de-sanidad-y-bienestar-social-con-motivo-del-lanzamiento-de-la-campana-piloto-de-vacunacion-contra-el-virus-de-papiloma-humano-en-guinea-ecuatorial/";
const CCST_DOI = "10.1200/GO-24-00658";

const institutions: InstitutionInput[] = [
  i({ id: "equatorial-guinea-ministry-of-health", name: "Ministerio de Sanidad y Bienestar Social, Guinea Ecuatorial (MINSABS)", aka: ["MINSABS", "Ministry of Health and Social Welfare, Equatorial Guinea"],
    city: "Malabo", country: "GQ", lat: 3.742, lng: 8.774, institutionType: "government", website: MOH,
    tldr: "Equatorial Guinea's health ministry. A cervical cancer screening and treatment project it supports began in 2017 and screened 26,998 women by 2023, and in April 2024 its minister launched a pilot HPV vaccination campaign.",
    summary: "The Ministry of Health and Social Welfare's site reported in December 2020 that its minister closed a seven-day workshop on techniques for diagnosing cervical cancer, part of a cervical cancer detection and control project that had seen more than 23,000 women since 2017, supported by oil companies and the ministry and extended to all the capitals and corners of the country, including the province of Annobón. The workshop taught visual inspection with acetic acid followed by Lugol's iodine, in an algorithm the page says the ministry's specialists designed with support from the World Health Organization. A 2025 report in JCO Global Oncology counts 26,998 women screened by the project from 2017 to 2023 and calls for capacity to pass increasingly to the ministry. The site also carries the minister's speech, dated 22 April and referring to 2024 as the present year, at the launch of a pilot HPV vaccination campaign for girls aged 9 to 13 in the health district of Baney and its surroundings. OnCo did not find a cancer plan or a cancer registry on the site's front page. The coordinates are an approximate city point for Malabo.",
    programs: ["Cervical cancer detection and control project (from 2017)", "Pilot HPV vaccination campaign, Baney health district (launched April 2024)"],
    institutions: ["who"],
    cancers: ["cervical"],
    technologies: ["via-cervical-screening"],
    keyPapers: ["paper-jayakumar-cervical-screening-equatorial-guinea-jcogo-2025"],
    links: [
      { label: "Ministerio de Sanidad y Bienestar Social", url: MOH },
      { label: "Ministerio de Sanidad y Bienestar Social: workshop on cervical cancer diagnosis closes (December 2020)", url: MOH_WORKSHOP },
      { label: "Ministerio de Sanidad y Bienestar Social: the minister's speech launching the pilot HPV vaccination campaign (22 April 2024, in Spanish)", url: MOH_HPV_PILOT },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-jayakumar-cervical-screening-equatorial-guinea-jcogo-2025", name: "Seven years of cervical cancer screening and treatment in Equatorial Guinea, 2017 to 2023",
    journal: "JCO Global Oncology", year: 2025, doi: CCST_DOI, pmid: "41043102", authors: "Jayakumar B, Ngua Roca A, Teklemichael L, et al.", paperType: "observational", participants: 26998,
    tldr: "A project in Equatorial Guinea screened 26,998 women for cervical cancer between 2017 and 2023 by looking at the cervix with acetic acid and treating early changes in the same visit. Health facilities and community outreach each reached about half of the women.",
    summary: "Published as \"Lessons Learned From 7 Years of Implementing Cervical Cancer Screening and Treatment in Equatorial Guinea\", with a first author at MCD Global Health. The Cervical Cancer Screening and Treatment project used the single-visit, screen-and-treat approach for women aged 20 to 60: visual inspection with acetic acid, treatment with cold coagulation, and referral for further evaluation where needed, delivered in health facilities and through community outreach, with cascaded training, routine supervision and communication campaigns. The abstract reports the number screened, who each route reached, the positivity rate and what happened to women who screened positive.",
    findings: [
      "Between 2017 and 2023, 26,998 women were screened; the facility-based and community outreach strategies reached almost equal numbers.",
      "Community outreach reached more women on the mainland, and more married, postmenopausal and multiparous women than facility-based screening.",
      "2.6% of women were positive on visual inspection, with higher rates among younger women; 55% of them were treated with cold coagulation, 10% were referred for further evaluation and 18% received no treatment.",
    ],
    whatItMeans: "It is the one counted series on cancer prevention OnCo found from Equatorial Guinea, a country with no population-based cancer registry in WHO's profiles. The authors describe it as, to their knowledge, the first such effort there, and say the work should continue, improve its data capture and pass increasingly to the Ministry of Health.",
    caveats: ["A project report, not a population survey: it counts women who came forward or were reached, not coverage of all eligible women.", "The abstract does not account for every woman who screened positive; 55%, 10% and 18% leave a remainder it does not describe."],
    cancers: ["cervical"],
    technologies: ["via-cervical-screening"],
    institutions: ["equatorial-guinea-ministry-of-health"],
    links: [{ label: "JCO Global Oncology 2025", url: `https://doi.org/${CCST_DOI}` }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/41043102/" }] }),
];

/** Records behind /countries/gq/ (wave 14). */
export const recordsGQ: EntityInput[] = [...institutions, ...papers];
