import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Afghanistan: the registry and paper behind /countries/af/ (wave 8) that the corpus did not hold. Papers were found
 * and resolved through Europe PMC on 11 November 2026 (PubMed id and DOI checked together) and the figures are taken
 * from their abstracts. The Kabul Cancer Registry is described only from its first report, as OnCo found no website of
 * its own. No record was written for any Afghan authority: OnCo read no primary source from one, and does not describe
 * the country's governance from memory. Coordinates are an approximate city point.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const institutions: InstitutionInput[] = [
  i({ id: "kabul-cancer-registry", name: "Kabul Cancer Registry", aka: ["KCR", "Kabul population-based cancer registry"],
    city: "Kabul", country: "AF", lat: 34.53, lng: 69.17, institutionType: "research-institute", website: "https://doi.org/10.1002/cam4.70844",
    tldr: "Afghanistan's first population-based cancer registry, established in 2018. Its first report counted 4,498 new cancers among Kabul residents in 2018 to 2020, with breast cancer leading in women and stomach cancer in men.",
    summary: "The Kabul Cancer Registry was established in 2018 as Afghanistan's first population-based cancer registry, according to its first report, published in 2025 by authors including staff of the Ministry of Public Health in Kabul and of Harvard's School of Public Health. Following IARC standards, it actively collected new cases from health facilities in Kabul and used CanReg5. For 2018 to 2020 it recorded 4,498 new cancers among Kabul residents, with age-standardised incidence of 44.3 per 100,000 in men and 60.9 in women. Stomach, oesophageal and colorectal cancer led in men; breast, oesophageal and stomach cancer in women. Children aged 0 to 14 had 6.8% of cancers, and leukaemia was 43.5% of those. The authors call for the registry to be strengthened to improve data quality. OnCo found no website of the registry's own; the coordinates are an approximate Kabul city point.",
    programs: ["Population-based cancer registration for Kabul (from 2018)"],
    institutions: ["iarc"],
    cancers: ["breast-cancer", "gastric", "esophageal", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-abdullah-kabul-cancer-registry-first-report-cam4-2025"],
    links: [doi("10.1002/cam4.70844", "Abdullah et al., cancer incidence in Kabul: the first report from the population-based cancer registry (Cancer Med 2025)")] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-abdullah-kabul-cancer-registry-first-report-cam4-2025", name: "Cancer incidence in Kabul, 2018 to 2020: the first report of Afghanistan's first population-based registry",
    journal: "Cancer Medicine", year: 2025, doi: "10.1002/cam4.70844", pmid: "40249646", authors: "Abdullah M, Niazi N, Danaei G, Bump J, Rebbeck TR, Hashimi I, Niyazi S, Sarwari M, Ghasemi-Kebria F, Roshandel G.", paperType: "observational",
    tldr: "The Kabul Cancer Registry recorded 4,498 new cancers among Kabul residents in 2018 to 2020: age-standardised incidence was 44.3 per 100,000 men and 60.9 per 100,000 women, with breast, stomach and oesophageal cancer leading.",
    summary: "Published as \"Cancer Incidence in Kabul, Afghanistan: The First Report From the Population-Based Cancer Registry\". The registry, established in 2018, collected new cases actively from health facilities in Kabul to IARC standards; rates were calculated in CanReg5 with Segi's world standard population.",
    findings: [
      "4,498 new cancers among Kabul residents in 2018 to 2020, a male-to-female ratio of 0.82 to 1.",
      "Age-standardised incidence was 44.3 per 100,000 person-years in men and 60.9 in women.",
      "In men the top sites were stomach (9.1), oesophagus (5.5), colorectum (3.7), lymphoma (2.4) and liver (2.1); in women breast (14.9), oesophagus (6.7), stomach (4.2), colorectum (3.8) and gallbladder (1.8).",
      "Children aged 0 to 14 had 6.8% of cancers; leukaemia was 43.5% of childhood cancers.",
    ],
    whatItMeans: "The first population-based cancer figures for any part of Afghanistan. The rates are far below IARC's modelled national estimate for 2024 (119.0 per 100,000), and the authors call for the registry to be strengthened to improve data quality.",
    caveats: ["Kabul residents only.", "The authors say data quality needs to improve."],
    institutions: ["kabul-cancer-registry"], cancers: ["breast-cancer", "gastric", "esophageal"],
    links: [doi("10.1002/cam4.70844", "Cancer Med 2025"), pubmed("40249646")] }),

];

/** Records behind /countries/af/ (wave 8). */
export const recordsAF: EntityInput[] = [...institutions, ...papers];
