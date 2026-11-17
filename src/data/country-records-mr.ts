import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Mauritania: the papers behind /countries/mr/ (wave 14) that the corpus did not hold. Both DOIs were resolved through
 * Europe PMC on 16 November 2026, which confirmed the title, authors, journal and PubMed id but holds no abstract for
 * either, so the figures were taken from the full text read on the Pan African Medical Journal's own site that day.
 * The oncology centre, the ministry and the insurance fund already exist in
 * src/data/institutions/countries-2026-11-west-central-africa.ts and are linked, not rewritten.
 *
 * Inbound links: each paper lists the other under `related`; the page lists both.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-baba-nouakchott-hospital-register-pamj-2013", name: "Cancer in Mauritania: ten years of the Nouakchott hospital register, 2000 to 2009",
    journal: "Pan African Medical Journal", year: 2013, doi: "10.11604/pamj.2013.14.149.2565", pmid: "23785554", authors: "Baba ND, Sauvaget C.", paperType: "observational", participants: 3305,
    tldr: "The pathology department of the national hospital in Nouakchott analysed 3,305 cancers confirmed by biopsy in ten years, 58% in women. Breast and cervical cancer led in women, and skin and prostate cancer in men.",
    summary: "An analysis of every cancer recorded from 1 January 2000 to 31 December 2009 by the register kept in the pathology and cytology department of the Centre Hospitalier National in Nouakchott, with some data from private facilities and from foreign hospitals that received Mauritanian patients sent abroad. The article is in French; its title is Le cancer en Mauritanie: résultats sur 10 ans du registre hospitalier de Nouakchott.",
    findings: ["3,534 samples were received and 3,305 analysed: 1,403 in men (42%) and 1,902 in women (58%).", "In women a quarter of the biopsies were breast cancers (485), followed by cervical cancer (344), cancers of the ovary and womb (218) and skin cancer (114).", "In men skin cancer was the most frequent (218, or 189 without melanoma), then prostate cancer (203), digestive cancers (179) and lymphomas (151).", "Cancers of the liver, lung and bladder were infrequent in the register."],
    whatItMeans: "The authors state that these results reflect neither the incidence nor the burden of cancer in Mauritania, since many patients diagnosed with cancer never have a biopsy; they describe what one laboratory saw.",
    caveats: ["A hospital pathology register, not a population registry: shares of biopsies, no rates.", "Ends in 2009, the year the national oncology centre was created according to the cancer plan of 2018."],
    cancers: ["breast-cancer", "cervical", "prostate"], related: ["paper-mamina-breast-cancer-cno-nouakchott-pamj-2025", "cancer-registries-surveillance"],
    links: [doi("10.11604/pamj.2013.14.149.2565", "DOI"), pubmed("23785554")] }),

  p({ id: "paper-mamina-breast-cancer-cno-nouakchott-pamj-2025", name: "Breast cancer in Mauritania: a retrospective series of 200 cases at the Centre National d'Oncologie in Nouakchott",
    journal: "Pan African Medical Journal", year: 2025, doi: "10.11604/pamj.2025.52.36.45258", pmid: "41356129", authors: "Mamina AEH, Hassen FME, Bouka J, Menny EH, Tolba CSA.", paperType: "observational", participants: 200,
    tldr: "Among 200 people with breast cancer at Mauritania's national oncology centre, the mean age was 50.46 years and about a third had waited three months or more before consulting. Of the 102 tumours tested, 35.3% were triple negative.",
    summary: "A letter to the editors reporting a retrospective study of 200 patients with usable clinical and pathology records, out of 429 breast cancers recorded at the Centre National d'Oncologie in 2020 and 2021, which were 15.71% of all cancers diagnosed there. The article is in French.",
    findings: ["98.5% of patients were women; the mean age was 50.46 years, with 32% of cases between 45 and 55.", "About a third of patients consulted between 3 and 6 months after the first signs.", "85% were invasive ductal carcinomas of no special type.", "Immunohistochemistry was available for 102 patients (51%): 52.94% were ER negative, 58.82% PR negative, 20.6% HER2 positive and 35.3% triple negative."],
    whatItMeans: "The authors point to two weaknesses: late diagnosis, and tumour testing that became reliably available at the centre in 2024 and is limited to hormone receptors, HER2 and Ki-67, with FISH not done locally.",
    caveats: ["The authors warn that the high share of triple-negative results may partly reflect false negatives from sample handling.", "A letter, retrospective, with biomarkers for half the series; it reports no treatment or survival figures."],
    cancers: ["breast-cancer", "tnbc"], institutions: ["cno-nouakchott"], related: ["paper-baba-nouakchott-hospital-register-pamj-2013"],
    links: [doi("10.11604/pamj.2025.52.36.45258", "DOI"), pubmed("41356129")] }),
];

/** Records behind /countries/mr/ (wave 14). */
export const recordsMR: EntityInput[] = [...papers];
