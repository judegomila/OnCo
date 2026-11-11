import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Tunisia: the papers behind /countries/tn/ (wave 8) that the corpus did not hold. Both were found and resolved through
 * Europe PMC on 11 November 2026 (PubMed id and DOI checked against each other) and the figures in `findings` are taken
 * from the indexed abstracts. Both come from the Northern Tunisia Cancer Registry, whose authors are at the Department
 * of Epidemiology and Biostatistics of the Institut Salah Azaïez, which already exists in the corpus and is reused.
 * Tunisian government sites (the health insurer CNAM, the health assessment body INEAS and the pharmacy directorate)
 * did not answer a plain request on that date, so no record was written for them; the page names that gap.
 */
const asOf = "2026-11-11";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-khiari-northern-tunisia-incidence-2023-apjcp-2024", name: "Estimated cancer incidence in northern Tunisia in 2023, from the Northern Tunisia Cancer Registry",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2024, doi: "10.31557/APJCP.2024.25.12.4359", pmid: "39733429", authors: "Khiari H, Arfaoui E, Mahjoub N, Henchiri S, Sliti A, Hsairi M.", paperType: "observational",
    tldr: "The Northern Tunisia Cancer Registry estimated age-standardised cancer incidence in 2023 at 165.9 per 100,000 men and 141.4 per 100,000 women, with lung cancer leading in men and breast cancer in women, and projected colorectal cancer rates to more than double by 2040.",
    summary: "Published as \"Estimated Cancer Incidence in Northern Tunisia in 2023: Northern Tunisia Cancer Registry\". The registry collects cases actively from public and private health services covering cancer patients in northern Tunisia, and the authors used its database with an age-period-cohort model to estimate incidence for 2023 and project it to 2040. Rates include non-melanoma skin cancer.",
    findings: [
      "Estimated age-standardised incidence in 2023 was 165.9 per 100,000 in men and 141.4 per 100,000 in women, including skin cancers other than melanoma.",
      "In men the commonest sites apart from skin were lung (37.6 per 100,000), colorectal (29.4), bladder (24.1), prostate (15.2) and stomach (6.0).",
      "In women they were breast (55.4 per 100,000), colorectal (23.0), corpus uteri (9.3), thyroid (9.0) and lung (5.8).",
      "Colorectal cancer rates were projected to more than double by 2040 in both sexes, as were breast, thyroid and uterine cancer rates in women; cervical cancer was expected to stay stable.",
    ],
    whatItMeans: "IARC builds its national estimate for Tunisia from subnational registry data; this is the northern registry's own estimate, and its projections point to colorectal and breast cancer as the growing burden.",
    caveats: ["The 2023 figures are model estimates from registry data, not a count of 2023 cases.", "Northern Tunisia only; IARC applies subnational rates to the whole country."],
    institutions: ["institut-salah-azaiez"], cancers: ["breast-cancer", "colorectal", "lung-cancer"],
    links: [doi("10.31557/APJCP.2024.25.12.4359", "Asian Pac J Cancer Prev 2024"), pubmed("39733429")] }),

  p({ id: "paper-khiari-cervical-trends-northern-tunisia-bmc-cancer-2025", name: "Cervical cancer incidence in northern Tunisia, 1994 to 2018, and projections to 2040",
    journal: "BMC Cancer", year: 2025, doi: "10.1186/s12885-025-13626-x", pmid: "40259222", authors: "Khiari H, Abdelfatteh YB, Mahjoub N, Mekni K, Chadli A, Aissi W, Hsairi M.", paperType: "observational",
    tldr: "Northern Tunisia recorded 3,092 cervical cancers in 1994 to 2018, about 129 a year, and the age-standardised rate fell from 6.6 to 4.7 per 100,000 women over the period.",
    summary: "Published as \"Trends and projections in cervical cancer incidence in northern Tunisia (1994-2040)\". The authors analysed cervical cancers in the Northern Tunisia Cancer Registry with joinpoint regression and projected incidence with an age-period-cohort model.",
    findings: [
      "3,092 cervical cancers were recorded in 1994 to 2018, an annual number of 129; mean age at diagnosis was 56.",
      "The age-standardised rate fell from 6.6 per 100,000 women in 1994 to 4.7 in 2018, an annual percentage change of -1.8% (95% CI -2.9 to -0.6).",
      "Rates were stable from 1994 to 1998, fell significantly from 1998 to 2006 (annual change -7.2%, 95% CI -13.0 to -1.0), and did not change significantly from 2006 to 2014.",
      "The projected age-standardised rate in 2040 is between 3.8 and 5.8 per 100,000 women.",
    ],
    whatItMeans: "Cervical cancer incidence in northern Tunisia has fallen, and the authors call for a control programme with screening, HPV vaccination for girls and timely treatment.",
    caveats: ["Northern Tunisia only.", "Registry data end in 2018."],
    institutions: ["institut-salah-azaiez"], cancers: ["cervical"],
    links: [doi("10.1186/s12885-025-13626-x", "BMC Cancer 2025"), pubmed("40259222")] }),
];

/** Records behind /countries/tn/ (wave 8). */
export const recordsTN: EntityInput[] = [...papers];
