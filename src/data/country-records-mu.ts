import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Mauritius: the two registry papers behind /countries/mu/ (wave 15) that the corpus did not hold. Both are listed by
 * the Mauritius National Cancer Registry on its African Cancer Registry Network page; each DOI was resolved through
 * Europe PMC on 16 November 2026 and the figures are taken from the indexed abstract.
 *
 * The institutions the page relies on already exist (src/data/institutions/countries-2026-11-east-southern-africa.ts)
 * and are linked, not repeated. Inbound links: the two papers list each other under `related`; the registry record
 * (`mauritius-national-cancer-registry`) lives in another file and should list both under `keyPapers`.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-koon-sun-pat-mauritius-cancer-trends-canep-2019", name: "Cancer incidence trends in the Republic of Mauritius, 1991 to 2015",
    journal: "Cancer Epidemiology", year: 2019, doi: "10.1016/j.canep.2019.101616", pmid: "31590038", authors: "Koon Sun Pat M, Manraj M, Fauzee J, Sewsurn S, Parkin DM, Manraj S.", paperType: "observational",
    tldr: "Twenty-five years of data from the Mauritius National Cancer Registry show colorectal, prostate, breast and womb cancer becoming more common and cervical cancer less common. The authors describe a pattern of cancers linked to lifestyle, unlike the infection-related cancers that predominate elsewhere in sub-Saharan Africa.",
    summary: "Published as \"Trends in cancer incidence in the Republic of Mauritius, 1991-2015\". The authors, whose listed affiliations are Mauritian public hospitals, the Central Laboratory at Victoria Hospital and the University of Mauritius, with D. M. Parkin of the University of Oxford, calculated age-standardised incidence rates by sex for five successive five-year periods from 1991 to 2015, the average annual percentage change by cancer site, and the ratio of deaths to new cases for 2001 to 2004 and 2012 to 2015 as the registry's main quality indicator. The abstract describes Mauritius as among the few African countries where cancer registration is population based and nationwide.",
    findings: [
      "In men the commonest cancers, by age-standardised rate per 100,000, were colon and rectum (17.0), prostate (16.5), lung (13.0), stomach (8.4) and lip, mouth and pharynx (7.7), with average annual changes of +3.9%, +4.2%, +0.5%, -0.1% and -1.3%.",
      "In women they were breast (53.7), colon and rectum (13.2), cervix (11.2), womb (7.7) and ovary (5.7), with average annual changes of +3.4%, +4.4%, -2%, +5.2% and -0.1%.",
      "Ratios of deaths to new cases fell between 2001 to 2004 and 2012 to 2015, for example from 1.9 to 1.0 for liver cancer in men and from 3.4 to 1.3 for pancreatic cancer in women, which the authors read as improving data quality.",
    ],
    whatItMeans: "It is the long view behind the registry's later reports: the cancers that are rising in Mauritius are the ones screening and lifestyle change can act on, and cervical cancer was already falling before HPV vaccination began.",
    caveats: ["The series ends in 2015; the registry's reports for 2022, 2023 and 2024 on the Ministry's site carry later years.", "A ratio of deaths to new cases above 1, as in the early years, means some cancers were missed by the registry at that time."],
    institutions: ["mauritius-national-cancer-registry", "mauritius-ministry-of-health"], cancers: ["breast-cancer", "colorectal", "prostate", "cervical"],
    related: ["paper-koon-sun-pat-mauritius-breast-survival-ijc-2025"],
    links: [doi("10.1016/j.canep.2019.101616", "Cancer Epidemiol 2019"), pubmed("31590038")] }),

  p({ id: "paper-koon-sun-pat-mauritius-breast-survival-ijc-2025", name: "Breast cancer survival in the Republic of Mauritius by age, stage and molecular subtype",
    journal: "International Journal of Cancer", year: 2025, doi: "10.1002/ijc.35172", pmid: "39243396", authors: "Koon Sun Pat M, Manraj M, Manraj S.", paperType: "observational", participants: 1399,
    tldr: "Among 1,399 breast cancers newly diagnosed in Mauritius from 2017 to 2020, net survival was 93.9% at one year and 83.4% at three years. About two thirds were diagnosed at stage 1 or 2.",
    summary: "Published as \"Breast cancer survival analysis in the Republic of Mauritius by age, stage at diagnosis and molecular subtype: A retrospective cohort study\" (online September 2024, in print 2025). The authors identified 1,399 breast cancers newly diagnosed between 2017 and 2020 at the Central Health Laboratory, Victoria Hospital, grouped them into five molecular subtypes, and estimated net survival at one and three years by age group, stage and subtype.",
    findings: [
      "Stage at diagnosis: stage 1 in 44.4%, stage 2 in 20.1%, stage 3 in 25.4% and stage 4 in 10.1%. The commonest subtype was luminal B, HER2 negative (36.7%).",
      "Net survival was 93.9% (95% CI 92.3 to 95.4) at one year and 83.4% (80.4 to 86.4) at three years.",
      "Three-year survival was lower in patients under 50 (77.1%), in triple negative disease (71.3%) and at stage 4 (28.5%).",
    ],
    whatItMeans: "Mauritius can measure survival from its own registry and laboratory. The authors call for a national breast screening programme, earlier stage at diagnosis and subtype testing for every breast cancer.",
    caveats: ["Follow-up is three years; five-year survival is not reported in the abstract.", "Cases were identified at the public Central Health Laboratory, so people diagnosed wholly in the private sector may be missing."],
    institutions: ["mauritius-national-cancer-registry", "mauritius-ministry-of-health"], cancers: ["breast-cancer"],
    related: ["paper-koon-sun-pat-mauritius-cancer-trends-canep-2019"],
    links: [doi("10.1002/ijc.35172", "Int J Cancer 2025"), pubmed("39243396")] }),
];

/** Records behind /countries/mu/ (wave 15). */
export const recordsMU: EntityInput[] = [...papers];
