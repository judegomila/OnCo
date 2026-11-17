import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Republic of the Congo (Brazzaville): the papers behind /countries/cg/ (wave 14) that the corpus did not hold. The
 * health ministry, the CHU de Brazzaville and the Brazzaville cancer registry already exist in
 * src/data/institutions/countries-2026-11-west-central-africa.ts and are linked, not repeated. Both papers were resolved
 * through Europe PMC on 16 November 2026 and their abstracts and author affiliations read; both are from Brazzaville,
 * not from the Democratic Republic of the Congo. Two multi-country survey papers that include the Brazzaville registry
 * live in src/data/country-records-ga.ts and are linked from here.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const RCB_DOI = "10.1684/bdc.2013.1701";
const LATE_DOI = "10.1177/10732748241270634";

const papers: PaperInput[] = [
  p({ id: "paper-nsonde-malanda-brazzaville-cancer-registry-1998-2009-bullcancer-2013", name: "Twelve years of the Brazzaville cancer registry, 1998 to 2009",
    journal: "Bulletin du Cancer", year: 2013, doi: RCB_DOI, pmid: "23406573", authors: "Nsondé Malanda J, Nkoua Mbon JB, Bambara AT, et al.", paperType: "observational", participants: 6048,
    tldr: "The Brazzaville cancer registry's own count for 1998 to 2009: 6,048 new cancers in twelve years, about 504 a year. Breast and cervical cancer led in women, liver and prostate cancer in men.",
    summary: "Published in French; indexed in English as \"Twelve years of working of Brazzaville cancer registry\". The authors, the first of whom is listed at the Service de Carcinologie et Radiothérapie of the Centre Hospitalier Universitaire de Brazzaville, describe a population-based registry created in 1996 with the support of the International Agency for Research on Cancer, recording new cancers in Brazzaville with the CanReg 4 software, and report incidence from 1 January 1998 to 31 December 2009.",
    findings: [
      "6,048 new cancers were recorded in twelve years: 3,377 in women (55.8%), 2,384 in men (39.4%) and 287 in children aged 0 to 14 (4.8%), an average of 504 a year.",
      "The incidence rate was 39.8 per 100,000 inhabitants a year: 49 in women and 35.2 in men.",
      "The commonest sites in women were breast, cervix, liver, ovary and blood cancers; in men liver, prostate, blood cancers, colon and stomach; in children the retina, kidney, blood cancers, liver and bone.",
    ],
    whatItMeans: "These are counted cases from one city, and they are the kind of data IARC's national estimate for the Republic of the Congo rests on. The authors present them as the basis for a national cancer control programme.",
    caveats: ["One city, and the period ends in 2009.", "The abstract does not say whether the rates are age-standardised, and its mean ages contain a misprint, so OnCo does not quote them."],
    cancers: ["breast-cancer", "cervical", "hcc", "prostate"],
    institutions: ["brazzaville-cancer-registry", "chu-brazzaville", "iarc"],
    related: ["cancer-registries-surveillance", "paper-ilboudo-late-breast-cancer-diagnosis-brazzaville-cancercontrol-2025"],
    links: [doi(RCB_DOI, "Bulletin du Cancer 2013"), pubmed("23406573")] }),

  p({ id: "paper-ilboudo-late-breast-cancer-diagnosis-brazzaville-cancercontrol-2025", name: "Late diagnosis of breast cancer at the Brazzaville university hospital, 2020",
    journal: "Cancer Control", year: 2025, doi: LATE_DOI, pmid: "39871482", authors: "Ilboudo M, Woromogo SH, Kaboré DD, Zerbo NAJ, Nkoua Mbon JB.", paperType: "observational", participants: 182,
    tldr: "A study of 182 people with breast cancer seen in the medical oncology service of the Brazzaville university hospital. Nine in ten were diagnosed late, and lack of money was one of the factors linked to delay.",
    summary: "Published as \"Factors Contributing to Late Breast Cancer Diagnosis at the Brazzaville University Hospital in 2020, Congo: A Cross-Sectional Analytic Study\". The authors, four of the five from the oncology department of the hospital and Marien Ngouabi University, collected data on every eligible patient of the medical oncology service and used logistic regression to look for factors linked to a delayed diagnosis.",
    findings: [
      "Data were collected for 182 patients; diagnosis was delayed in 91.21% of them.",
      "Delay was significantly associated with lack of finance (P = 0.011) and with disease beyond stage 2 (P < 0.001).",
      "In the multivariate analysis, delay was associated with proximity to the centre (P = 0.025) and with stage beyond 2.",
    ],
    whatItMeans: "The authors conclude that routine screening, a properly equipped cancer centre and subsidised care are what would shorten delays in the Congo. The national cancer plan of 2023 records that screening for early changes in the cervix is not free and that cancer care is outside the insurance scheme's packages.",
    caveats: ["One hospital service in one year.", "The abstract does not define the delay it measures."],
    cancers: ["breast-cancer"],
    institutions: ["chu-brazzaville"],
    related: ["paper-nsonde-malanda-brazzaville-cancer-registry-1998-2009-bullcancer-2013", "paper-konig-chemotherapy-barriers-africa-registries-ijc-2026"],
    links: [doi(LATE_DOI, "Cancer Control 2025"), pubmed("39871482"), { label: "Plan stratégique national de lutte contre le cancer 2022 to 2026, Republic of the Congo (March 2023, PDF)", url: "https://sante.gouv.cg/wp-content/uploads/2023/04/PSNLC-DU-12-AVRIL-2023.pdf" }] }),
];

/** Records behind /countries/cg/ (wave 14). */
export const recordsCG: EntityInput[] = [...papers];
