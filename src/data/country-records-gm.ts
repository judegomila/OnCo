import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * The Gambia: the ministry and the two papers behind /countries/gm/ (wave 14) that the corpus did not hold. Each was
 * written from its own source, read raw on 16 November 2026: the Ministry of Health's National Cancer Control Strategy
 * 2024 to 2029 (PDF text, posted on the ICCP portal), the Ministry's home page, the slides its National Cancer Control
 * Programme presented to an ICCP ECHO session on 18 March 2026 (PDF text), and the two papers, whose DOIs were resolved
 * through Europe PMC with the figures taken from the indexed abstracts.
 *
 * Inbound links: the registry paper lists the Ministry, which is one of its author affiliations, and the Ministry lists
 * both papers in keyPapers and links the three existing Gambian records. The coordinates are an approximate Banjul
 * point, not a building position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCCS = { label: "Ministry of Health, The Gambia: National Cancer Control Strategy 2024 to 2029 (PDF via ICCP)", url: "https://www.iccp-portal.org/sites/default/files/2026-03/The%20Finalized%20National%20Cancer%20Control%20Strategy%20%28NCCS%29%202024%20-2029.pdf" };
const ECHO = { label: "National Cancer Control Programme, The Gambia: ICCP ECHO session slides (18 March 2026, PDF)", url: "https://www.iccp-portal.org/sites/default/files/2026-03/ICCP%20ECHO%202026%20Session%202%20Country%20example%20Gambia.pdf" };
const MOH = "https://moh.gov.gm/";

const institutions: InstitutionInput[] = [
  i({ id: "gambia-ministry-of-health", name: "Ministry of Health, The Gambia", aka: ["MoH Gambia", "Ministry of Health and Social Welfare, The Gambia", "National Cancer Control Programme, The Gambia"],
    city: "Banjul", country: "GM", lat: 13.453, lng: -16.578, institutionType: "government", website: MOH,
    tldr: "The Gambia's health ministry. It set up a National Cancer Control Programme in September 2022 and wrote the country's cancer control strategy for 2024 to 2029, which records that chemotherapy is given at two hospitals and that there is no radiotherapy in the country.",
    summary: "The Ministry's National Cancer Control Strategy 2024 to 2029, posted on the ICCP portal and described in its foreword as the first national cancer control strategic plan, says the National Cancer Control Programme was established in September 2022; the programme sits under the Ministry's non-communicable diseases directorate. Its assessment of services records histopathology and cytology at the teaching hospital alone, chemotherapy at the teaching hospital and one private hospital, one oncologist in the country (a paediatric oncologist at the teaching hospital), no radiotherapy, no list of essential medicines for oncology, and a National Cancer Registry inactive since December 2019. Its aims include raising the share of facilities offering screening and early detection to 20% and those offering basic diagnosis, treatment and palliative care to 30%, reactivating the registry and advocating for a radiotherapy centre. It gives the allocation for cancer care in the health budget as about 11 million dalasi. The coordinates are an approximate Banjul city point.\n\nThe Ministry's home page, read on 16 November 2026, gives its address as The Quadrangle, Banjul, and lists the Medicines Control Agency among its agencies. Slides the programme presented to an ICCP ECHO session on 18 March 2026 name the Edward Francis Small Teaching Hospital among the health care institutions in cancer control and WHO, IAEA and IARC among its international partners.",
    programs: ["National Cancer Control Programme (from September 2022)", "National Cancer Control Strategy 2024 to 2029", "HPV vaccination in the routine immunisation programme"],
    institutions: ["efsth-banjul", "gambia-national-cancer-registry", "mca-gambia", "who", "iarc", "iaea"],
    cancers: ["hcc", "cervical", "breast-cancer"],
    keyPapers: ["paper-bah-gambia-cancer-registration-20-years-plos-one-2013", "paper-adegoke-childhood-cancer-gambia-hsr-2024"],
    links: [NCCS, { label: "Ministry of Health, The Gambia", url: MOH }, ECHO] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-bah-gambia-cancer-registration-20-years-plos-one-2013", name: "20-years of population-based cancer registration in hepatitis B and liver cancer prevention in the Gambia, West Africa",
    journal: "PLoS One", year: 2013, doi: "10.1371/journal.pone.0075775", pmid: "24098724", authors: "Bah E, Carrieri MP, Hainaut P, et al.", paperType: "observational",
    tldr: "Twenty years of the Gambian national cancer registry, 1990 to 2009, show liver cancer making up 60% of cancers in men and cervical cancer 33% of cancers in women, with incidence relatively stable over the period.",
    summary: "An analysis of data from the National Cancer Registry of The Gambia, a population-based registry set up in 1986 within the Gambia Hepatitis Intervention Study, a randomised trial of infant hepatitis B vaccination. World age-standardised incidence rates of the commonest cancers were estimated by sex for 1990 to 2009 in four five-year intervals.",
    findings: ["In men, liver cancer accounted for 60% of cancers, prostate 5%, lung and bronchus 4%, non-Hodgkin lymphoma 5% and stomach 3%.", "In women, cervical cancer accounted for 33% of cancers, liver 24%, breast 11% and non-Hodgkin lymphoma 4%.", "Incidence remained relatively stable over time, and the data were not yet enough to detect an effect of hepatitis B vaccination on liver cancer incidence."],
    whatItMeans: "The commonest cancers in The Gambia over these two decades were related to infections that can mostly be prevented: hepatitis B in men, and HPV and HIV in women.",
    caveats: ["The registry covers 1990 to 2009 here; the Ministry of Health's cancer strategy for 2024 to 2029 says it has been inactive since December 2019.", "The abstract gives shares of cancers, not counts."],
    cancers: ["hcc", "cervical", "breast-cancer"], institutions: ["gambia-national-cancer-registry", "gambia-ministry-of-health"],
    links: [doi("10.1371/journal.pone.0075775", "DOI"), pubmed("24098724")] }),

  p({ id: "paper-adegoke-childhood-cancer-gambia-hsr-2024", name: "A prospective registry study of the epidemiology and management of childhood cancer in the Gambia-The first year experience",
    journal: "Health Science Reports", year: 2024, doi: "10.1002/hsr2.70084", pmid: "39319248", authors: "Adegoke S, Jallow C, Ogun O, et al.", paperType: "observational", participants: 44,
    tldr: "In the first year of a new children's cancer service at The Gambia's teaching hospital, 44 children were seen; the families of 93.8% could not obtain chemotherapy medicines, and no child had radiotherapy.",
    summary: "A prospective registry study of children with cancer who presented at the paediatric units of Edward Francis Small Teaching Hospital, Banjul, between November 2022 and October 2023, appraising newly established paediatric oncology services.",
    findings: ["Of 44 children, 12 (27.3%) had Wilms tumour, 11 (25.0%) leukaemia, 8 (18.2%) a germ cell tumour, 6 (13.6%) lymphoma and 4 (9.1%) retinoblastoma.", "The median time from first symptom to diagnosis was 62.5 days.", "Treatment refusal and abandonment rates were 20.5% and 13.6%; families of 93.8% of children could not procure cytotoxic drugs because they were unavailable, too costly, or both.", "Adequate laboratory monitoring was available for 6.8%, and none had platelet transfusion or radiotherapy; 9 (20.5%) completed treatment and 8 (18.2%) died."],
    whatItMeans: "A children's cancer service now exists in The Gambia, and the study finds it held back by the supply and cost of medicines, laboratory support and blood products.",
    caveats: ["One hospital and its first year; 44 children.", "Outcomes were reported while 10 children were still receiving chemotherapy."],
    cancers: ["childhood-cancers", "wilms-tumor"], institutions: ["efsth-banjul"],
    links: [doi("10.1002/hsr2.70084", "DOI"), pubmed("39319248")] }),
];

/** Records behind /countries/gm/ (wave 14). */
export const recordsGM: EntityInput[] = [...institutions, ...papers];
