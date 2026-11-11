import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Côte d'Ivoire: the registry and paper behind /countries/ci/ (wave 9) that the corpus did not hold. The registry was
 * written from its first published results (resolved through Europe PMC, abstract read on 11 November 2026) and the
 * African Cancer Registry Network's membership list, which names it; its member page returned no text. The Ministry of
 * Health's site showed only an entry page, and the regulator's site loads its content by script, so no records are
 * added for them. Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ABIDJAN_DOI = "10.1002/1097-0142(20000801)89:3<653::aid-cncr22>3.0.co;2-z";
const ABIDJAN_URL = "https://doi.org/10.1002/1097-0142(20000801)89:3%3C653::aid-cncr22%3E3.0.co;2-z";

const institutions: InstitutionInput[] = [
  i({ id: "abidjan-cancer-registry", name: "Abidjan Cancer Registry", aka: ["Registre des cancers d'Abidjan"],
    city: "Abidjan", country: "CI", lat: 5.35, lng: -4.01, institutionType: "research-institute", website: "https://afcrn.org/index.php/membership/membership-list/98-registre-des-cancers-d-abidjan",
    tldr: "The population-based cancer registry for the city of Abidjan, a member of the African Cancer Registry Network. Its first results, for 1995 to 1997, counted 2,815 new cancers.",
    summary: "The Registre des cancers d'Abidjan attempts to record every new cancer diagnosed in the city of Abidjan, including cases without histological confirmation. Its first results, for 1995 to 1997, counted 2,815 new cancers, an age-standardised incidence of 83.7 per 100,000 men and 98.6 per 100,000 women, with liver and prostate cancer leading in men and breast and cervical cancer in women; the authors expected some under-ascertainment. It is listed among the African Cancer Registry Network's member registries, but its member page returned no text on 11 November 2026, so its current coverage and latest data are not described here. The coordinates on this record are an approximate Abidjan point.",
    programs: ["Population-based cancer registration for Abidjan"],
    institutions: ["iarc"], cancers: ["breast-cancer", "cervical", "prostate", "hcc"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-echimane-abidjan-incidence-1995-1997-cancer-2000"],
    links: [
      { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" },
      { label: "Echimane et al., cancer incidence in Abidjan 1995 to 1997 (Cancer 2000)", url: ABIDJAN_URL },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-echimane-abidjan-incidence-1995-1997-cancer-2000", name: "Cancer incidence in Abidjan, Côte d'Ivoire: first results from the cancer registry, 1995 to 1997",
    journal: "Cancer", year: 2000, doi: ABIDJAN_DOI, pmid: "10931466", authors: "Echimane AK, Ahnoux AA, Adoubi I, et al.", paperType: "observational", participants: 2815,
    tldr: "Abidjan's registry counted 2,815 new cancers in 1995 to 1997; liver and prostate cancer led in men and breast and cervical cancer in women, with Kaposi sarcoma at moderate frequency.",
    summary: "Published as \"Cancer incidence in Abidjan, Ivory Coast: first results from the cancer registry, 1995-1997\". The registry attempts to record all new cancers diagnosed in the city of Abidjan, including those without histological confirmation.",
    findings: [
      "2,815 new cancers were registered in three years: age-standardised rates of 83.7 per 100,000 in men and 98.6 in women.",
      "In men liver cancer (15%) and prostate cancer (15.8%) led, with non-Hodgkin lymphoma 10.5% and gastric cancer 4.5%.",
      "In women breast cancer (25.7%) and cervical cancer (24.0%) led, followed by non-Hodgkin lymphoma (7.3%).",
      "Kaposi sarcoma was 7.7% of cancers in men and 2.1% in women; Burkitt lymphoma rates were relatively high in children.",
    ],
    whatItMeans: "An urban West African population with both infection-related cancers, such as liver and cervical cancer, and relatively high rates of breast and prostate cancer; rates are probably underestimated.",
    caveats: ["Some under-ascertainment of cases, according to the authors.", "One city, 1995 to 1997."],
    institutions: ["abidjan-cancer-registry"], cancers: ["breast-cancer", "cervical", "prostate", "hcc"],
    links: [{ label: "Cancer 2000", url: ABIDJAN_URL }, pubmed("10931466")] }),
];

/** Records behind /countries/ci/ (wave 9). */
export const recordsCI: EntityInput[] = [...institutions, ...papers];
