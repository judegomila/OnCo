import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Angola: the bodies and papers behind /countries/ao/ (wave 8) that the corpus did not hold. Written from sources read
 * raw on 11 November 2026: the African Cancer Registry Network's member page for the Lubango Cancer Registry, and
 * papers found and resolved through Europe PMC (PubMed id and DOI checked together), with figures taken from their
 * abstracts. The Instituto Angolano de Controlo do Cancro is described only from those papers, as no website of its
 * own was found; the medicines regulator's site shows content only with JavaScript. Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const AFCRN_LUBANGO = "https://afcrn.org/index.php/membership/membership-list/179-angola-lubango";

const institutions: InstitutionInput[] = [
  i({ id: "iacc-angola", name: "Instituto Angolano de Controlo do Cancro (IACC)", aka: ["IACC", "Angolan Institute of Cancer Control", "Instituto Angolano de Controlo do Cancer"],
    city: "Luanda", country: "AO", lat: -8.84, lng: 13.23, institutionType: "cancer-center", website: "https://doi.org/10.1186/s13027-019-0249-2",
    tldr: "Angola's national cancer institute in Luanda. Its hospital-based cancer registry recorded 5,609 valid new cancers in 2012 to 2016, with breast and cervical cancer together 60% of cancers in women.",
    summary: "The Instituto Angolano de Controlo do Cancro in Luanda keeps a hospital-based cancer registry that its authors describe as the oldest and most organised in Angola, covering cancers treated in several hospital facilities in Luanda. A 2019 paper from the registry counted 6,638 malignant tumours newly diagnosed in 2012 to 2016, of which 5,609 were valid for analysis after removing duplicates, missing data and non-melanoma skin cancers: 2,059 in men and 3,550 in women, 9.7% in children under 15. Breast (21.4%), cervical (16.8%) and prostate cancer (7.1%), non-Hodgkin lymphoma (4.5%) and Kaposi sarcoma (4.3%) were the commonest. The authors called for a true population-based registry in Luanda. A 2026 analysis of women with breast cancer followed at the institute from 2013 to 2019 found a median survival of 560 days. OnCo did not find a website of the institute's own; the record links the registry paper. The coordinates are an approximate Luanda city point.",
    programs: ["Hospital-based cancer registry (Luanda)", "Oncology treatment"],
    institutions: ["lubango-cancer-registry", "iarc"],
    cancers: ["breast-cancer", "cervical", "prostate", "kaposi-sarcoma"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-miguel-iacc-hospital-registry-luanda-iac-2019", "paper-jeronimo-breast-cancer-survival-angola-mbe-2026"],
    links: [
      doi("10.1186/s13027-019-0249-2", "Miguel et al., the IACC hospital-based cancer registry in Luanda (Infect Agent Cancer 2019)"),
      doi("10.3934/mbe.2026068", "Jerónimo et al., survival of women with breast cancer in Angola (Math Biosci Eng 2026)"),
    ] }),

  i({ id: "lubango-cancer-registry", name: "Lubango Cancer Registry", aka: ["Registo de Cancro do Lubango", "Lubango population-based cancer registry"],
    city: "Lubango", country: "AO", lat: -14.92, lng: 13.49, institutionType: "research-institute", website: AFCRN_LUBANGO,
    tldr: "A population-based cancer registry for the city of Lubango in Huíla province, established on 4 February 2022 and a member of the African Cancer Registry Network. It covers a population of about one million.",
    summary: "The Lubango Cancer Registry's page on the African Cancer Registry Network says it was established on 4 February 2022 at a ceremony attended by the Governor of Huíla and other public health bodies, and is directed by Dr Maria Lina Antunes with five staff. It collects cases on the network's notification form from clinical records, pathology and radiology reports and death certificates, codes them with ICD-O-3 and enters them into CanReg5. It gives the population projection for Lubango for 2022 to 2023 as 1,020,558, and says data quality is hampered by limited knowledge of oncology and difficulties with pathology. The coordinates are an approximate Lubango city point.",
    programs: ["Population-based cancer registration for Lubango (from 2022)", "African Cancer Registry Network member registry"],
    institutions: ["iarc"],
    related: ["cancer-registries-surveillance"],
    links: [{ label: "African Cancer Registry Network: Angola, Lubango Cancer Registry", url: AFCRN_LUBANGO }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-miguel-iacc-hospital-registry-luanda-iac-2019", name: "The hospital-based cancer registry of the Instituto Angolano de Controlo do Cancro, Luanda, 2012 to 2016",
    journal: "Infectious Agents and Cancer", year: 2019, doi: "10.1186/s13027-019-0249-2", pmid: "31719840", authors: "Miguel F, Bento MJ, de Lacerda GF, Weiderpass E, Santos LL.", paperType: "observational",
    tldr: "Angola's national cancer institute recorded 5,609 valid new cancers in 2012 to 2016; breast and cervical cancer made up 60% of cancers in women, and prostate cancer, Kaposi sarcoma and lymphoma led in men.",
    summary: "Published as \"A hospital-based cancer registry in Luanda, Angola: the Instituto Angolano de Controlo do Cancer (IACC) Cancer registry\". The authors analysed newly diagnosed cases recorded by the registry, which covers cancers treated in several hospital facilities in Luanda, and compared the five commonest cancers by sex with GLOBOCAN 2018's estimates for Angola.",
    findings: [
      "6,638 malignant tumours were recorded in 2012 to 2016; 5,609 were valid after excluding duplicates, missing data and non-melanoma skin cancers (2,059 men, 3,550 women).",
      "9.7% of cases were in children under 15, and most patients lived in Luanda.",
      "Breast (21.4%), cervix (16.8%), prostate (7.1%), non-Hodgkin lymphoma (4.5%) and Kaposi sarcoma (4.3%) were the commonest cancers.",
      "In men 19.3% were prostate cancers and 7.5% each Kaposi sarcoma and non-Hodgkin lymphoma; breast and cervix were 60% of cancers in women.",
    ],
    whatItMeans: "Angola's oldest and best-organised hospital-based registry is at the national institute, and its authors warn that national estimates may differ from reality until Luanda has a population-based registry.",
    caveats: ["Hospital-based: counts patients who reached the institute, not the whole population."],
    institutions: ["iacc-angola"], cancers: ["breast-cancer", "cervical", "prostate", "kaposi-sarcoma"],
    links: [doi("10.1186/s13027-019-0249-2", "Infect Agent Cancer 2019"), pubmed("31719840")] }),

  p({ id: "paper-jeronimo-breast-cancer-survival-angola-mbe-2026", name: "Survival of women with breast cancer followed at Angola's national cancer institute, 2013 to 2019",
    journal: "Mathematical Biosciences and Engineering", year: 2026, doi: "10.3934/mbe.2026068", pmid: "42543201", authors: "Jerónimo JA, Gomes D, Filipe PA.", paperType: "observational",
    tldr: "Among women diagnosed with breast cancer and followed at the Instituto Angolano de Controlo do Cancro from 2013 to 2019, median survival from diagnosis to death from breast cancer was 560 days.",
    summary: "Published as \"Survival analysis of women diagnosed with breast cancer in Angola\". The data set covers all patients followed at the institute from 2013 to 2022, analysed for the period before the COVID-19 pandemic (2013 to 2019) with Cox, parametric and flexible proportional hazards models.",
    findings: [
      "Median survival from diagnosis to death from breast cancer was 560 days.",
      "Age, stage of disease and body mass index were significant risk factors.",
      "A flexible proportional hazards model with one knot fitted the data best by Akaike's criterion.",
    ],
    whatItMeans: "Women treated for breast cancer at Angola's national institute lived a median of about a year and a half after diagnosis, and stage at diagnosis was one of the factors that mattered.",
    caveats: ["One institute's patients; the abstract does not give the number of women or the stage mix."],
    institutions: ["iacc-angola"], cancers: ["breast-cancer"],
    links: [doi("10.3934/mbe.2026068", "Math Biosci Eng 2026"), pubmed("42543201")] }),
];

/** Records behind /countries/ao/ (wave 8). */
export const recordsAO: EntityInput[] = [...institutions, ...papers];
