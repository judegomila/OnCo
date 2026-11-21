import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Cabo Verde: the papers behind /countries/cv/ (wave 14) that the corpus did not hold. Each DOI was resolved through
 * Europe PMC on 16 November 2026 and the figures are taken from the indexed abstracts. The ministry, the two central
 * hospitals and the national registry already exist in src/data/institutions/countries-2026-11-west-central-africa.ts,
 * and the Lisbon cancer institute (ipo-lisboa) in src/data/institutions/europe.ts; they are linked, not rewritten.
 *
 * Inbound links: the papers list each other under `related`; the page lists all three.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-silva-santiago-hospital-cancer-registry-ecancer-2019", name: "Cancer on Santiago island, Cape Verde: data from the Hospital Agostinho Neto cancer registry, 2017 to 2018",
    journal: "ecancermedicalscience", year: 2019, doi: "10.3332/ecancer.2019.995", pmid: "32010219", authors: "Silva ET, Spencer HB, Costa V, et al.", paperType: "observational",
    tldr: "The hospital cancer registry at Hospital Agostinho Neto in Praia described the cancers seen on Santiago island in 2017 and 2018. Prostate, breast, stomach, cervical and oesophageal cancer were the five commonest.",
    summary: "A report of the cancer cases that occurred in 2017 and 2018 on Santiago island according to the cancer registry of Hospital Agostinho Neto, written when Cabo Verde had no national cancer data.",
    findings: ["The five most common cancers were prostate, breast, stomach, cervix and oesophagus, in that order of frequency.", "The authors state that there were no national data at the time."],
    whatItMeans: "The authors call for the conditions to set up a population-based cancer registry for Cabo Verde as quickly as possible; the Ministry of Health reported a national registry in 2023.",
    caveats: ["A hospital registry for one island, over two years.", "The abstract gives the order of the cancers and no counts."],
    cancers: ["prostate", "breast-cancer", "gastric", "cervical", "esophageal"], institutions: ["hospital-agostinho-neto", "cabo-verde-cancer-registry"], related: ["paper-borges-breast-cancer-cape-verde-partnership-jcogo-2026", "cancer-registries-surveillance"],
    links: [doi("10.3332/ecancer.2019.995", "DOI"), pubmed("32010219")] }),

  p({ id: "paper-borges-breast-cancer-cape-verde-partnership-jcogo-2026", name: "Breast cancer in Cape Verde: clinical and molecular profile and the impact of an international treatment partnership",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-25-00258", pmid: "41759049", authors: "Borges P, Costa V, Spencer HB, et al.", paperType: "observational", participants: 158,
    tldr: "Among 158 women with breast cancer diagnosed at the Praia hospital from 2015 to 2021, 57% were at stage III or IV. Those treated as guidelines recommend, with radiotherapy given abroad, had 79.9% survival at three years.",
    summary: "A retrospective analysis of women with breast cancer diagnosed and treated at Agostinho Neto University Hospital between January 2015 and July 2021, after an international treatment partnership began, with immunohistochemistry in 114 patients and survival compared by log-rank tests and Cox models.",
    findings: ["The median age at diagnosis was 52.5 years (range 28 to 91); most patients lived on Santiago island.", "Invasive ductal carcinoma made up 93% of cases, and 57% were diagnosed at stage III or IV.", "24% were triple negative and 11% HER2 positive.", "Among patients with potentially curable disease, 61.4% received therapy that followed the NCCN Harmonized Guidelines for sub-Saharan Africa, including radiotherapy performed abroad.", "Patients treated according to stage and subtype had 79.9% survival at 3 years."],
    whatItMeans: "The authors report no local radiotherapy facilities, and access to radiotherapy abroad went with better survival; the authors argue that standard treatment frameworks can improve outcomes where resources are limited.",
    caveats: ["One hospital, retrospective; the link between radiotherapy abroad and survival is a correlation.", "Median follow-up was 33.7 months."],
    cancers: ["breast-cancer", "tnbc"], institutions: ["hospital-agostinho-neto"], related: ["paper-silva-santiago-hospital-cancer-registry-ecancer-2019", "paper-vilares-cervical-cancer-cape-verde-referral-ecancer-2022"],
    links: [doi("10.1200/go-25-00258", "DOI"), pubmed("41759049")] }),

  p({ id: "paper-vilares-cervical-cancer-cape-verde-referral-ecancer-2022", name: "Cervical cancer in Cape Verde: reappraisal upon referral to a tertiary cancer centre in Lisbon",
    journal: "ecancermedicalscience", year: 2022, doi: "10.3332/ecancer.2022.1471", pmid: "36819824", authors: "Vilares AT, Ciabattoni R, Cunha TM, Félix A.", paperType: "observational", participants: 58,
    tldr: "Fifty-eight women diagnosed with cervical cancer in Cabo Verde were treated in Lisbon from 2013 to 2020 under a health cooperation agreement. About six months passed between diagnosis and treatment, and the stage found in Lisbon matched the original in 15.5% of cases.",
    summary: "A retrospective evaluation of women diagnosed with cervical cancer in Cabo Verde who were evacuated for treatment to the Instituto Português de Oncologia de Lisboa Francisco Gentil between 2013 and 2020, reviewing risk factors, tumour characteristics, treatment and outcomes.",
    findings: ["Squamous cell carcinoma was the most frequent type (91.5%); HPV DNA was present in 25 of 26 samples tested.", "Pathology in Cabo Verde and in Portugal agreed in 87.9% of cases, but FIGO stage agreed in 15.5%.", "The interval between diagnosis and treatment was around 6 months.", "77.6% received combined chemotherapy and radiotherapy in Lisbon.", "The survival rate in the cohort was 89.7% and median overall survival 73.2 months."],
    whatItMeans: "Women who reach treatment abroad do well, but the wait is long and staging at home is limited; the authors link the disagreement on stage to both.",
    caveats: ["Only women who were evacuated and treated are included, so the results do not describe all women with cervical cancer in Cabo Verde.", "The abstract describes the absence of a national screening programme and of dedicated cancer treatment facilities at the time of the study."],
    cancers: ["cervical"], institutions: ["ipo-lisboa"], related: ["paper-borges-breast-cancer-cape-verde-partnership-jcogo-2026"],
    links: [doi("10.3332/ecancer.2022.1471", "DOI"), pubmed("36819824")] }),
];

/** Records behind /countries/cv/ (wave 14). */
export const recordsCV: EntityInput[] = [...papers];
