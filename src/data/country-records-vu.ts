import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Vanuatu: the paper behind /countries/vu/ (wave 16) that the corpus did not hold. The corpus already holds the
 * Ministry of Health, the Vanuatu Family Health Association and the Ikkana Cancer Society, so no institution is added.
 * The DOI was resolved through Europe PMC on 16 November 2026 and the figures in `findings` are taken from the indexed
 * abstract.
 *
 * Inbound links: the paper is listed on the country page and links the existing Ministry record.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-aruhuri-hpv-prevalence-vanuatu-cancerprevres-2012", name: "Prevalence of cervical human papillomavirus (HPV) infection in Vanuatu",
    journal: "Cancer Prevention Research", year: 2012, doi: "10.1158/1940-6207.capr-11-0515", pmid: "22427345", authors: "Aruhuri B, Tarivonda L, Tenet V, et al.", paperType: "observational", participants: 987,
    tldr: "A population-based survey of 987 women in Vanuatu found high-risk HPV types in 21.7%, and cervical abnormalities in 13.6% of the 840 with adequate cytology, including invasive cancer in 0.8%.",
    summary: "A population-based survey in Vanuatu of women aged 18 to 64, carried out to describe HPV prevalence and the distribution of HPV types in the Pacific islands. HPV was tested by a PCR assay, and by hybrid capture 2 performed in Vanuatu.",
    findings: ["The prevalence of 44 HPV types was 28.4% (age-standardised 25.0%, 95% CI 21.9 to 28.0); of high-risk types, 21.7% (age-standardised 19.2%, 95% CI 16.4 to 22.0).", "Among 840 women with adequate cytology, 13.6% had cervical abnormalities, including 3.6% with high-grade squamous intraepithelial lesions and 0.8% with invasive cervical carcinoma.", "HPV prevalence declined from 46.1% in women aged 21 or under to 15.3% in those aged 45 or over.", "Nearly half of screening-positive women could not be re-evaluated, mainly because they were difficult to trace."],
    whatItMeans: "It measured how common HPV and cervical abnormalities were among women in Vanuatu, and it carries its authors' case for a rapid HPV test with treatment at the same visit.",
    caveats: ["Fieldwork predates 2012, so it does not measure present prevalence or the effect of HPV vaccination.", "A survey of HPV and cytology, not of cancer incidence."],
    cancers: ["cervical"], technologies: ["hpv-testing"], institutions: ["vanuatu-ministry-of-health"], links: [doi("10.1158/1940-6207.capr-11-0515", "DOI"), pubmed("22427345")] }),
];

/** Records behind /countries/vu/ (wave 16). */
export const recordsVU: EntityInput[] = [...papers];
