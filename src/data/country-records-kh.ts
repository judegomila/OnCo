import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Cambodia: the hospital and papers behind /countries/kh/ (wave 8) that the corpus did not hold. Papers were found and
 * resolved through Europe PMC on 11 November 2026 (PubMed id and DOI checked together) and their figures are taken from
 * the abstracts. The Khmer-Soviet Friendship Hospital is described only from those papers, as OnCo did not read a
 * website of its own. Cambodian government sites were not read. Coordinates are an approximate city point.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const institutions: InstitutionInput[] = [
  i({ id: "khmer-soviet-friendship-hospital", name: "Khmer-Soviet Friendship Hospital, Phnom Penh", aka: ["Khmer Soviet Friendship Hospital", "KSFH"],
    city: "Phnom Penh", country: "KH", lat: 11.55, lng: 104.92, institutionType: "hospital", website: "https://doi.org/10.35772/ghmo.2023.01002",
    tldr: "A hospital in Phnom Penh described in a 2023 study as one of Cambodia's two national cancer centres. Its gynaecology department diagnosed 351 cervical cancers in 2019, about a third of the country's estimated cases, and 57.6% of those staged were advanced.",
    summary: "A 2023 study by the hospital's gynaecology department with Japan's National Center for Global Health and Medicine describes the Khmer-Soviet Friendship Hospital as one of the two national cancer centres in Cambodia. Using the department's gynaecologic test registry for 2019, it found 351 women histologically diagnosed with cervical cancer, which the authors put at about a third of the estimated cases in the country; mean age was 54.7, 83.8% were squamous cell carcinomas, and of 309 women with recorded stage, 57.6% had advanced cancer (stage IIB or higher). A 2015 study described liver cancer at the same hospital. OnCo did not read a website of the hospital's own; the coordinates are an approximate Phnom Penh city point.",
    programs: ["Cancer diagnosis and treatment", "Gynaecologic oncology"],
    cancers: ["cervical", "hcc"],
    keyPapers: ["paper-tanaka-cervical-cancer-ksfh-cambodia-ghmo-2023"],
    links: [doi("10.35772/ghmo.2023.01002", "Tanaka et al., clinical features of cervical cancer at a national cancer center in Phnom Penh (GHM Open 2023)")] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-tanaka-cervical-cancer-ksfh-cambodia-ghmo-2023", name: "Cervical cancer at a national cancer centre in Phnom Penh, 2019: stage and histology",
    journal: "GHM Open", year: 2023, doi: "10.35772/ghmo.2023.01002", pmid: "40143838", authors: "Tanaka A, Koun L, Haruyama R, Uy K, Chhit M, Kim L, Fujita N, Osuga Y, Kimura T, Koum K.", paperType: "observational",
    tldr: "351 women were diagnosed with cervical cancer at the Khmer-Soviet Friendship Hospital in 2019, about a third of Cambodia's estimated cases, and 57.6% of those with a recorded stage had advanced disease.",
    summary: "Published as \"Clinical features of cervical cancer at a national cancer center in Phnom Penh, Cambodia: A descriptive cross-sectional study\". A descriptive study of the gynaecology department's test registry for January to December 2019.",
    findings: [
      "351 women were histologically diagnosed with cervical cancer in 2019, about one third of the estimated total in Cambodia.",
      "Mean age at presentation was 54.7 years.",
      "Squamous cell carcinoma made up 83.8% and adenocarcinoma 15.4%.",
      "Of 309 women with recorded stage, 57.6% had advanced cancer (stage IIB or higher).",
    ],
    whatItMeans: "Most women reach the national centre with cervical cancer that is already advanced, so earlier diagnosis and access to it are the gaps the authors name.",
    caveats: ["One hospital and one year.", "Stage was missing for 42 of 351 women."],
    institutions: ["khmer-soviet-friendship-hospital"], cancers: ["cervical"],
    links: [doi("10.35772/ghmo.2023.01002", "GHM Open 2023"), pubmed("40143838")] }),

];

/** Records behind /countries/kh/ (wave 8). */
export const recordsKH: EntityInput[] = [...institutions, ...papers];
