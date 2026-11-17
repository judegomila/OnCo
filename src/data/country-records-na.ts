import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Namibia: the papers behind /countries/na/ (wave 15) that the corpus did not hold. The institutions the page relies
 * on already exist (src/data/institutions/countries-2026-11-east-southern-africa.ts) and are linked, not repeated.
 * Each DOI was resolved through Europe PMC on 16 November 2026 and the figures in `findings` are taken from the
 * indexed abstract; nothing here comes from a full text OnCo did not read.
 *
 * Inbound links: the four papers list each other in `related`. No existing record links to them yet; the Namibian
 * registry, Windhoek Central Hospital's cancer centre and the ministry could carry them in `keyPapers`.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const BOUCHERON = "paper-boucheron-breast-cancer-journey-namibia-jamanetwopen-2023";
const KORN = "paper-korn-cervical-screen-and-treat-namibia-plosone-2022";
const KAHOLONGO = "paper-kaholongo-paediatric-cancer-windhoek-plosone-2023";
const STEFAN = "paper-stefan-childhood-cancer-incidence-namibia-pamj-2014";

const papers: PaperInput[] = [
  p({ id: BOUCHERON, name: "The breast cancer journey in Namibia: stage, treatment and three-year survival at Windhoek Central Hospital",
    journal: "JAMA Network Open", year: 2023, doi: "10.1001/jamanetworkopen.2023.41402", pmid: "37921764", authors: "Boucheron P, Zietsman A, Pontac J, et al.", paperType: "observational", participants: 405,
    tldr: "Among 405 women diagnosed with breast cancer at Namibia's main public cancer centre from 2014 to 2016, 60% of Black women were alive three years later, against 80% of women of mixed ancestry and 89% of White women. Black women were diagnosed later, and fewer than two thirds of all women completed surgery plus chemotherapy.",
    summary: "Published as \"Analysis of the Breast Cancer Journey in Namibia\". The study used the Namibian part of the African Breast Cancer: Disparities in Outcomes cohort: all Namibian residents with confirmed new breast cancer who presented at the public oncology centre of Windhoek Central Hospital, recruited from September 2014 to October 2016 and followed for up to three years. It measured the journey against the indicators of WHO's Global Breast Cancer Initiative: early-stage diagnosis, prompt diagnosis and completed treatment.",
    findings: [
      "405 women: 300 Black (74%), 49 of mixed ancestry (12%) and 56 White (14%).",
      "Three-year overall survival was 60% (95% CI 54 to 66) in Black women, 80% (65 to 89) in women of mixed ancestry and 89% (77 to 95) in White women.",
      "Early-stage diagnosis (stage I or II) was recorded in 37% of Black women and 75% of the other two groups combined; 60% and 77% respectively were diagnosed promptly.",
      "Completion of surgery plus chemotherapy was 53% in Black women and 63% in the other two groups, described as low in all women.",
    ],
    whatItMeans: "The authors conclude that survival differences were matched by inequities along the whole journey, and that earlier diagnosis for Black Namibian women and better completion of treatment for all women are where improvement is needed.",
    caveats: ["The cohort is women who reached the public centre in Windhoek, not all women with breast cancer in Namibia.", "Recruitment ended in 2016; services may have changed since."],
    institutions: ["windhoek-central-hospital-oncology", "cancer-association-of-namibia", "iarc"], cancers: ["breast-cancer"], related: [KORN, KAHOLONGO],
    links: [doi("10.1001/jamanetworkopen.2023.41402", "JAMA Network Open 2023"), pubmed("37921764")] }),

  p({ id: KORN, name: "Cervical screen-and-treat by visual inspection in seven regions of Namibia, 2018 to 2020",
    journal: "PLoS One", year: 2022, doi: "10.1371/journal.pone.0263920", pmid: "35171941", authors: "Korn AK, Muzingwani L, O'Bryan G, et al.", paperType: "real-world",
    tldr: "Namibia's health ministry introduced a screen-and-treat approach to cervical screening by visual inspection in 2018, with a focus on women living with HIV. From October 2018 to March 2020, in seven of the 14 regions, the programme carried out 14,786 screenings.",
    summary: "Published as \"Cervical cancer screening and treatment, HIV infection, and age: Program implementation in seven regions of Namibia\". The authors used routine programme data from October 2018 to March 2020 to compare screening results and treatment completion by HIV status, after the Ministry of Health and Social Services introduced a screen-and-treat approach using visual inspection with acetic acid and ablative treatment by cryotherapy or thermocoagulation. The abstract gives HIV prevalence among women aged 15 to 49 as 11.5%.",
    findings: [
      "14,786 cervical screenings were carried out between October 2018 and March 2020.",
      "Among 8,150 women having a first screening, 17% of women living with HIV and 15% of HIV-negative women screened positive (p = 0.02).",
      "Women living with HIV were more likely to complete treatment than HIV-negative women (p < 0.01).",
    ],
    whatItMeans: "The authors read the results as suggesting that ablative treatment is feasible and acceptable in resource-limited settings, and call for work on cancer incidence by HIV status and on possible overtreatment.",
    caveats: ["Routine programme data from seven of 14 regions, not a national coverage figure.", "The abstract's count of women completing treatment and its percentage do not share an obvious denominator, so neither is quoted here."],
    institutions: ["namibia-ministry-of-health"], cancers: ["cervical"], related: [BOUCHERON, STEFAN],
    links: [doi("10.1371/journal.pone.0263920", "PLoS One 2022"), pubmed("35171941")] }),

  p({ id: KAHOLONGO, name: "Childhood cancers admitted to Windhoek Central Hospital, 2011 to 2020",
    journal: "PLoS One", year: 2023, doi: "10.1371/journal.pone.0292794", pmid: "37972109", authors: "Kaholongo NO, Mashingaidze-Mano R", paperType: "observational", participants: 174,
    tldr: "A review of 174 children admitted with cancer to the paediatric oncology unit at Windhoek Central Hospital over ten years found that blood cancers, leukaemias the commonest among them, were the largest group. The median age at diagnosis was about five years.",
    summary: "Published as \"Paediatric cancer burden in Namibia: A 10-year retrospective, analytical cohort study of patients admitted at Windhoek Central Hospital\". The authors reviewed the files of children aged 0 to 16 admitted to the paediatric oncology unit with a cancer diagnosis between 1 January 2011 and 31 December 2020, to update two earlier studies of the pattern of childhood cancer in Namibia.",
    findings: [
      "174 files met the inclusion criteria; 55.7% of the children were boys.",
      "Haematopoietic cancers made up 44.8% of diagnoses, embryonal cancers 37.9%, soft tissue and bone sarcomas 13.8% and brain or central nervous system cancers 3.4%.",
      "The median age at diagnosis was 5.13 years.",
    ],
    whatItMeans: "The pattern of childhood cancer seen at the country's referral unit has shifted over three decades, though blood cancers remain the commonest; the authors recommend prospective studies.",
    caveats: ["A single hospital's admissions, read from files; it does not measure incidence.", "The abstract does not examine whether the 3.4% share of brain tumours reflects who is referred and diagnosed."],
    institutions: ["windhoek-central-hospital-oncology"], cancers: ["childhood-cancers"], related: [STEFAN, BOUCHERON],
    links: [doi("10.1371/journal.pone.0292794", "PLoS One 2023"), pubmed("37972109")] }),

  p({ id: STEFAN, name: "Childhood cancer incidence recorded at Windhoek Central Hospital, 2003 to 2010",
    journal: "Pan African Medical Journal", year: 2014, doi: "10.11604/pamj.2014.17.191.3830", pmid: "25396017", authors: "Stefan DC, Baadjes B, Kruger M", paperType: "observational",
    tldr: "A review of children's cancer cases seen at Windhoek Central Hospital from 2003 to 2010 found a recorded incidence of 29.4 per million, lower than a study in Namibia twenty years earlier. The authors concluded that many childhood cancers were not being diagnosed or reported.",
    summary: "Published as \"Incidence of childhood cancer in Namibia: the need for registries in Africa\". The authors reviewed paediatric oncology cases presenting to Windhoek Central Hospital, which they describe as the only centre in Namibia to which children with cancer are referred, between 2003 and 2010, recording age, sex, cancer type and area of residence, and compared the result with an incidence calculated twenty years before.",
    findings: [
      "The incidence of all recorded childhood cancers was 29.4 per million.",
      "Leukaemias (22.5%) and retinoblastomas (16.2%) were the commonest, followed by kidney tumours, soft tissue sarcomas and lymphomas.",
      "6.8% of the children with cancer had HIV.",
    ],
    whatItMeans: "Beside the lower recorded incidence, the authors say many cancers are still not diagnosed or reported and that others are not treated in the country. They describe a twinning programme with Tygerberg Hospital in Cape Town that includes setting up a cancer registry.",
    caveats: ["Cases recorded at one hospital; children never referred are not counted.", "The data end in 2010."],
    institutions: ["windhoek-central-hospital-oncology"], cancers: ["childhood-cancers"], related: [KAHOLONGO, KORN],
    links: [doi("10.11604/pamj.2014.17.191.3830", "Pan African Medical Journal 2014"), pubmed("25396017")] }),
];

/** Records behind /countries/na/ (wave 15). */
export const recordsNA: EntityInput[] = [...papers];
