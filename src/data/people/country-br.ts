import type { PersonInput } from "@/lib/schema";

/**
 * People: Brazil, added for /countries/br/. Public professional information only; every record carries at least one
 * paper with a DOI or PubMed id resolved through Crossref or PubMed on 3 November 2026. Roles are taken from the
 * affiliation line of the person's most recent indexed paper, a ClinicalTrials.gov record or an institutional page,
 * named in each record, and change over time; treat `role` as indicative.
 */
const asOf = "2026-11-03";
const provenance = { editedBy: "OnCo country deep dive, Brazil (wave 2)", editedOn: asOf };
const pm = (q: string) => ({ label: "PubMed author search", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, provenance, links: x.profiles, ...x });

export const peopleBR: PersonInput[] = [
  p({ id: "mariana-boroni", name: "Mariana Boroni", role: "Researcher, Laboratory of Bioinformatics and Computational Biology, Instituto Nacional de Câncer (INCA), Rio de Janeiro", institutionId: "inca-brazil", institutions: ["inca-brazil"],
    specialisms: ["Cancer bioinformatics", "Cancer genomics", "Single-cell and multi-omics analysis", "Ovarian cancer"],
    tldr: "A computational biologist at Brazil's national cancer institute who co-coordinates the Brazilian Population Tumor Atlas, a public map of the molecular make-up of tumours from Brazilian patients.",
    summary: "Mariana Boroni works in INCA's Laboratory of Bioinformatics and Computational Biology, the affiliation on her 2026 papers (one places it in the Division of Basic and Experimental Research, the other in the Division of Experimental and Translational Research). INCA names her, with João Paulo Viola, as coordinator of the Atlas Tumoral da População Brasileira (ATPBR), approved in 2023 with R$8.72 million over three years under the federal Genomas Brasil programme, and she is first author of the paper describing it in The Lancet Regional Health - Americas (2026). Her group's other recent work includes a microRNA-based prognostic model for high-grade serous ovarian cancer in the same journal (2026, last author) and a contribution to a Latin American single-cell genomics perspective in Cell (2025).",
    profiles: [pm("Boroni M[au] INCA"), { label: "INCA: INCA leads project that drives precision oncology in Brazil (13 March 2026)", url: "https://www.gov.br/inca/pt-br/assuntos/noticias/2026/inca-lidera-projeto-que-impulsiona-oncologia-de-precisao-no-brasil" }],
    papers: [
      { title: "The Brazilian Population Tumor Atlas Project: addressing representation in cancer genomics in Brazil", journal: "The Lancet Regional Health - Americas", year: 2026, doi: "10.1016/j.lana.2026.101397" },
      { title: "Development and validation of a miRNA-based prognostic model for high-grade serous ovarian cancer: a retrospective cohort study", journal: "The Lancet Regional Health - Americas", year: 2026, doi: "10.1016/j.lana.2026.101527" },
      { title: "Exploring Latin America one cell at a time", journal: "Cell", year: 2025, doi: "10.1016/j.cell.2025.09.013", note: "One of 57 authors." },
    ],
    keyPapers: ["paper-boroni-atpbr-lancet-rha-2026"], technologies: ["cgp"], terms: ["ngs"], cancers: ["ovarian"],
    tags: ["computational-biology", "genomics"] }),

  p({ id: "diego-villa-cle", name: "Diego Villa Clé", role: "Haematologist; principal investigator and medical coordinator of the CARTHEDRALL CAR-T trial, Ribeirão Preto Medical School, University of São Paulo", institutionId: "hemocentro-ribeirao-preto", institutions: ["hemocentro-ribeirao-preto"],
    specialisms: ["CAR-T cell therapy", "Haematopoietic cell transplantation", "Lymphoma and acute lymphoblastic leukaemia"],
    tldr: "A haematologist at the University of São Paulo in Ribeirão Preto who leads the clinical trial of Brazil's own CAR-T cell therapy.",
    summary: "Diego Villa Clé is the principal investigator of CARTHEDRALL (NCT06101381), the multicentre phase 1/2 trial of the academic CD19-directed CAR-T cell made at the University of São Paulo's Ribeirão Preto campus; ClinicalTrials.gov gives his affiliation as the Ribeirão Preto Medical School and his title as medical coordinator. He is senior author of the 2024 Bone Marrow Transplantation report of 20 patients treated with the product from 2019 to 2023, and first author of the 2021 Brazilian Association of Haematology, Haemotherapy and Cell Therapy consensus on structuring centres to give CAR-T therapy.",
    profiles: [pm("Clé DV[au]"), { label: "ClinicalTrials.gov: NCT06101381", url: "https://clinicaltrials.gov/study/NCT06101381" }],
    papers: [
      { title: "Safety and efficacy of a new academic CD19-directed CAR-T cell for refractory/relapsed non-Hodgkin lymphoma and acute lymphoblastic leukemia in Brazil", journal: "Bone Marrow Transplantation", year: 2024, doi: "10.1038/s41409-024-02283-6" },
      { title: "Associação Brasileira de Hematologia, Hemoterapia e Terapia Celular Consensus on genetically modified cells. I: Structuring centers for the multidisciplinary clinical administration and management of CAR-T cell therapy patients", journal: "Hematology, Transfusion and Cell Therapy", year: 2021, doi: "10.1016/j.htct.2021.09.001" },
    ],
    keyPapers: ["paper-donadel-academic-cart19-brazil-bmt-2024"], trials: ["nct06101381"], technologies: ["car-t"], targets: ["cd19"], cancers: ["all-leukemia", "dlbcl"], sections: ["cell-therapy"],
    tags: ["clinician-scientist", "cell-therapy"] }),

  p({ id: "rodrigo-calado", name: "Rodrigo Calado", aka: ["Rodrigo T. Calado"], role: "Director-President, Fundação Hemocentro de Ribeirão Preto; Ribeirão Preto Medical School, University of São Paulo", institutionId: "hemocentro-ribeirao-preto", institutions: ["hemocentro-ribeirao-preto"],
    specialisms: ["Telomere biology disorders", "Bone marrow failure", "CAR-T cell therapy programme leadership"],
    tldr: "A haematologist who heads the Ribeirão Preto blood centre behind Brazil's national CAR-T programme, and a researcher on inherited telomere diseases.",
    summary: "Rodrigo Calado is director-president of the Fundação Hemocentro de Ribeirão Preto, as the centre's own page names him in October 2026, writing with Phillip Scheinberg that Brazil must train treating centres in every region now if its national CAR-T is to reach patients of the public health system. In 2022 Agência FAPESP quoted him, then the Hemocentro's scientific director, on the aim of a CAR-T costing 10 to 15 per cent of market prices. His research is on telomere biology disorders: he was an author of the 2016 New England Journal of Medicine trial of danazol in telomere diseases and senior author of a 2024 Blood study of clonal haematopoiesis and cancer mutations in those disorders. He is a co-author of the 2024 report of 20 patients treated with the centre's academic CD19 CAR-T cell.",
    profiles: [pm("Calado RT[au]"), { label: "Hemocentro RP: national CAR-T, preparing the health network (23 October 2026)", url: "https://www.hemocentro.fmrp.usp.br/car-t-nacional-preparar-a-rede-de-saude-e-essencial-para-ampliar-o-acesso-a-terapia/" }],
    papers: [
      { title: "Safety and efficacy of a new academic CD19-directed CAR-T cell for refractory/relapsed non-Hodgkin lymphoma and acute lymphoblastic leukemia in Brazil", journal: "Bone Marrow Transplantation", year: 2024, doi: "10.1038/s41409-024-02283-6" },
      { title: "Clonal landscape and clinical outcomes of telomere biology disorders: somatic rescue and cancer mutations", journal: "Blood", year: 2024, doi: "10.1182/blood.2024025023" },
      { title: "Danazol Treatment for Telomere Diseases", journal: "New England Journal of Medicine", year: 2016, doi: "10.1056/NEJMoa1515319" },
    ],
    keyPapers: ["paper-donadel-academic-cart19-brazil-bmt-2024"], trials: ["nct06101381"], technologies: ["car-t"], bottlenecks: ["b-manufacturing-cell-therapy"],
    tags: ["leadership", "clinician-scientist", "cell-therapy"] }),

  p({ id: "daniela-dornelles-rosa", name: "Daniela Dornelles Rosa", aka: ["Daniela D. Rosa"], orcid: "0000-0002-6196-1919", role: "Medical oncologist; Hospital Moinhos de Vento, Hospital de Clínicas de Porto Alegre and Universidade Federal do Rio Grande do Sul (2026 paper affiliations); breast cancer investigator with GBECAM and LACOG", institutionId: "hcpa-porto-alegre", institutions: ["hcpa-porto-alegre"], companies: ["lacog"],
    specialisms: ["Breast cancer", "Health services research", "Cooperative group trials"],
    tldr: "A breast cancer oncologist in Porto Alegre who led the AMAZONA III study, which measured how much later Brazilian women in the public health system are diagnosed and treated than women with private insurance.",
    summary: "Daniela Dornelles Rosa is first author of the main AMAZONA III paper (Breast Cancer Research and Treatment, 2020), a cohort of 2,950 women at 23 Brazilian centres run by LACOG and the Brazilian breast cancer study group GBECAM, which found publicly insured women diagnosed at stage III more than twice as often as privately insured ones (33.5 against 14.7 per cent). She is senior author of its sub-analysis of time to treatment, which measured a median of 56 days from diagnosis to first treatment in the public system against 34 in the private. On the time-to-treatment paper (published online in December 2022) she gave UFCSPA, GBECAM, LACOG and Hospital Moinhos de Vento as affiliations; on a 2026 pharmacogenomics study of Brazilian cancer patients, on which she is senior author, Hospital Moinhos de Vento, Hospital de Clínicas de Porto Alegre and the Federal University of Rio Grande do Sul.",
    profiles: [pm("Rosa DD[au] breast"), { label: "ORCID", url: "https://orcid.org/0000-0002-6196-1919" }],
    papers: [
      { title: "The impact of sociodemographic factors and health insurance coverage in the diagnosis and clinicopathological characteristics of breast cancer in Brazil: AMAZONA III study (GBECAM 0115)", journal: "Breast Cancer Research and Treatment", year: 2020, doi: "10.1007/s10549-020-05831-y" },
      { title: "Time interval between diagnosis to treatment of breast cancer and the impact of health insurance coverage: a sub analysis of the AMAZONA III Study (GBECAM 0115)", journal: "Breast Cancer Research and Treatment", year: 2023, doi: "10.1007/s10549-022-06809-8" },
      { title: "Prevalence of actionable pharmacogenomic variants in Brazilian patients with cancer", journal: "Frontiers in Pharmacology", year: 2026, doi: "10.3389/fphar.2026.1736887" },
    ],
    keyPapers: ["paper-rosa-amazona-iii-bcrt-2020", "paper-maschmann-amazona-iii-time-to-treatment-bcrt-2023"], trials: ["nct02663973"], cancers: ["breast-hr-positive"],
    tags: ["clinician-scientist", "breast-cancer"] }),
];
