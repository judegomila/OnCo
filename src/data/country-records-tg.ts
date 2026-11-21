import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Togo: the papers behind /countries/tg/ (wave 14) that the corpus did not hold. Both DOIs were resolved through
 * Europe PMC on 16 November 2026 and the figures are taken from the indexed abstracts. The institutions the page
 * relies on (togo-ministry-of-health, chu-sylvanus-olympio, cicl-lome) already exist in
 * src/data/institutions/countries-2026-11-west-central-africa.ts and are linked, not rewritten.
 *
 * Inbound links: each paper lists the other under `related` and both name chu-sylvanus-olympio; the page lists both.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-darre-cancers-togo-2009-2016-apjcp-2017", name: "Descriptive epidemiology of cancers in Togo from 2009 to 2016",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2017, doi: "10.22034/apjcp.2017.18.12.3407", pmid: "29286611", authors: "Darre T, Kpatcha TM, Bagny A, et al.", paperType: "observational", participants: 1738,
    tldr: "The register of the pathology laboratory in Lomé held 1,738 confirmed cancers from 2009 to 2016. Prostate, breast, stomach and cervical cancer were the commonest, and Burkitt lymphoma led among children.",
    summary: "A retrospective, descriptive study over eight years of all histologically confirmed cancers in the register of the anatomical pathology laboratory that the authors describe as Togo's only one, reporting frequency, site, histological type, age and sex.",
    findings: ["1,738 cancers were found, in patients aged from 4 months to 109 years; the male to female ratio was 1.3.", "Overall the most frequent sites were prostate (10.3%), breast (9.9%), stomach (8.4%) and cervix (7.2%).", "In women breast cancer was 21.2% and cervical cancer 16.3%; in men prostate cancer was 18.5%, non-Hodgkin lymphoma 13.2% and stomach cancer 10.7%.", "In children Burkitt lymphoma was 41.8%, retinoblastoma 11.6% and nephroblastoma 9.6%."],
    whatItMeans: "Until Togo's population registry reports, a laboratory register is the main count of cancers in the country; the authors call for emphasis on early detection and diagnosis.",
    caveats: ["A pathology register counts biopsies examined in one laboratory, not the cancers in a population, so it gives shares and no rates.", "Blood cancers diagnosed in haematology services are not recorded in it, according to the draft national cancer plan of 2021."],
    cancers: ["prostate", "breast-cancer", "gastric", "cervical", "burkitt-lymphoma"], institutions: ["chu-sylvanus-olympio"], related: ["paper-amegbor-cancers-togo-1984-2008-jce-2011"],
    links: [doi("10.22034/apjcp.2017.18.12.3407", "DOI"), pubmed("29286611")] }),

  p({ id: "paper-amegbor-cancers-togo-1984-2008-jce-2011", name: "Cancers in Togo from 1984 to 2008: epidemiological and pathological aspects of 5,251 cases",
    journal: "Journal of Cancer Epidemiology", year: 2011, doi: "10.1155/2011/319872", pmid: "22007216", authors: "Amégbor K, Darre T, Ayéna KD, et al.", paperType: "observational", participants: 5251,
    tldr: "Twenty-five years of records from the pathology laboratory of the teaching hospital in Lomé held 5,251 cancers, about 210 a year. Breast cancer led in women and prostate cancer in men.",
    summary: "A retrospective review of the epidemiological and pathological features of cancers observed from 1984 to 2008 at the pathology laboratory of CHU Tokoin in Lomé, which Togo's draft national cancer plan of 2021, citing this study, refers to as the laboratory of CHU Sylvanus Olympio.",
    findings: ["5,251 cancers were found, an annual average of 210; the average age was 45.3 years.", "In men the most frequent were prostate cancer (12.9%), non-melanoma skin cancer (10.4%) and gastric cancer (10.3%).", "In women they were breast cancer (27.1%), cervical cancer (11.2%) and non-Hodgkin lymphoma (6.3%).", "Childhood cancers were mainly Burkitt lymphoma (27.9%) and retinoblastoma (8.5%)."],
    whatItMeans: "The authors conclude that cancers are frequent in Togo and that the country needs a cancer registry to prevent and control them.",
    caveats: ["One laboratory's biopsy records: relative frequencies, not incidence in the population."],
    cancers: ["breast-cancer", "prostate", "cervical", "burkitt-lymphoma"], institutions: ["chu-sylvanus-olympio"], related: ["paper-darre-cancers-togo-2009-2016-apjcp-2017"],
    links: [doi("10.1155/2011/319872", "DOI"), pubmed("22007216")] }),
];

/** Records behind /countries/tg/ (wave 14). */
export const recordsTG: EntityInput[] = [...papers];
