import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * São Tomé and Príncipe: the body behind /countries/st/ (wave 14) that the corpus did not hold. The hospital record
 * (hospital-ayres-de-menezes) already exists in src/data/institutions/countries-2026-11-west-central-africa.ts and is
 * linked, not repeated. The one new record is the evacuation study, resolved through Europe PMC with its abstract and
 * author affiliations read on 16 November 2026.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const EVAC_DOI = "10.3332/ecancer.2026.2093";

const papers: PaperInput[] = [
  p({ id: "paper-david-cancer-medical-evacuees-sao-tome-ecancer-2026", name: "Cancer among medical evacuations abroad from São Tomé and Príncipe, 2019 to 2025",
    journal: "ecancermedicalscience", year: 2026, doi: EVAC_DOI, pmid: "42131878", authors: "David LC, Garcia TM, Barreto I, et al.", paperType: "observational",
    tldr: "Of 1,066 medical evacuations abroad from São Tomé and Príncipe between 2019 and 2025, 413 were for cancer. Breast, prostate and cervical cancer were the most frequent.",
    summary: "Published as \"Cancer profile among medical evacuees from São Tomé and Príncipe: a descriptive study (2019-2025)\". Doctors of Hospital Ayres de Menezes, with researchers at the Portuguese Institute of Oncology in Porto, reviewed the records of the Ministry of Health's Patient Evacuation Board. The abstract describes a small island state that relies heavily on medical evacuation for specialised cancer care and does not yet have a population-based cancer registry, and it reports patient demographics, primary diagnosis and the number of evacuations per patient.",
    findings: [
      "Of 1,066 evacuations in 2019 to 2025, 413 (38.7%) were cancer-related.",
      "Cancer patients had a mean age of 48.3 years (standard deviation 18.7), and 58.6% were women.",
      "Breast cancer was the most frequent (24.7%), followed by prostate (17.9%) and cervical cancer (9.4%); 76.9% of patients needed a single evacuation, and cancer patients were more likely to have several.",
    ],
    whatItMeans: "It is the one counted series on cancer from São Tomé and Príncipe that OnCo found. It shows what kinds of cancer leave the country for treatment, and the authors use it to argue for a population-based cancer registry and for more prevention and early detection at home.",
    caveats: ["It counts evacuations, not everyone who developed cancer, so it cannot give incidence.", "The abstract does not name the destination countries or say who paid."],
    cancers: ["breast-cancer", "prostate", "cervical"],
    institutions: ["hospital-ayres-de-menezes", "ipo-porto"],
    links: [{ label: "ecancermedicalscience 2026", url: `https://doi.org/${EVAC_DOI}` }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/42131878/" }] }),
];

/** Records behind /countries/st/ (wave 14). */
export const recordsST: EntityInput[] = [...papers];
