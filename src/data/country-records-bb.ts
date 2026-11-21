import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Barbados: the registry and papers behind /countries/bb/ (wave 16) that the corpus did not hold. The registry record
 * was written from its own report "Cancer in Barbados (2013-2022), Report 2025" (PDF text) and its policy brief of 19
 * December 2025 (PDF text), both on the Ministry of Health and Wellness's site and read raw on 16 November 2026. The
 * registry's own website (bnr.org.bb) returned HTTP 500 that day and was not read. DOIs were resolved through Europe
 * PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the registry links the Ministry and the Queen Elizabeth Hospital, which the corpus already holds, and
 * the papers are linked through keyPapers. Coordinates are an approximate Bridgetown city point, not a building
 * position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const BNR_REPORT = "https://health.gov.bb/attachments/BNR%20Cancer%20Annual%20Report%202025_Years%202021-2022.pdf";
const BNR_BRIEF = "https://health.gov.bb/attachments/Cancer%20in%20Barbados%20Policy%20Brief.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "barbados-national-registry", name: "Barbados National Registry for Chronic Non-Communicable Disease", aka: ["BNR", "Barbados National Registry", "BNR-Cancer", "Barbados cancer registry"],
    city: "Bridgetown", country: "BB", lat: 13.1, lng: -59.61, institutionType: "research-institute", website: "https://www.bnr.org.bb",
    tldr: "Barbados's national registry of cancer and other chronic diseases, a Ministry of Health and Wellness project led by a University of the West Indies research centre. It counted 983 new cancers in 2022 and publishes survival by year of diagnosis.",
    summary: "The registry's 2025 report describes it as a Ministry of Health and Wellness project led by the George Alleyne Chronic Disease Research Centre at The University of the West Indies, and gives its address as Jemmott's Lane, St Michael. Trained abstractors find cancer cases from pathology and laboratory data and from the haematology clinic, the Clara Brathwaite Centre for Oncology and Nuclear Medicine, colposcopy and death records at the Queen Elizabeth Hospital, with follow-up from private physicians and clinics. The report covers ten years of incidence, 2013 to 2022, and twelve years of deaths. It registered 941 tumours in 2021 and 983 in 2022, an age-standardised rate of 213.7 per 100,000 in 2022; cases registered from a death certificate only were 2.5% in 2022. One-year survival was 63.8% for 2022 diagnoses and five-year survival 52.6% for 2020 diagnoses. Its policy brief of December 2025 says stage at diagnosis is not yet consistently available and that waiting times and treatment pathways are not captured. IARC's GLOBOCAN 2024 fact sheet gives a national registry as its incidence source for Barbados. The registry's own website returned an error on 16 November 2026. The coordinates are an approximate Bridgetown city point.",
    programs: ["Cancer in Barbados annual reports (incidence 2013 to 2022, mortality 2013 to 2024)", "Policy brief: Cancer in Barbados, key trends and policy implications (December 2025)", "Registers of cardiovascular disease"],
    institutions: ["moh-barbados", "qeh-barbados", "iarc"],
    cancers: ["prostate", "breast-cancer", "colorectal"],
    keyPapers: ["paper-martelly-registry-cost-barbados-canep-2016", "paper-hennis-prostate-cancer-barbados-prostatecancer-2011"],
    links: [
      { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
      { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-hennis-prostate-cancer-barbados-prostatecancer-2011", name: "Prostate cancer incidence and mortality in Barbados, West Indies",
    journal: "Prostate Cancer", year: 2011, doi: "10.1155/2011/565230", pmid: "22110989", authors: "Hennis AJ, Hambleton IR, Wu SY, et al.", paperType: "observational", participants: 1101,
    tldr: "Every confirmed prostate cancer in Barbados from July 2002 to December 2008 was counted: 1,101 cases, an incidence lower than in African-American men, with death rates that appeared higher.",
    summary: "The study ascertained all histologically confirmed cases of prostate cancer in Barbados from July 2002 to December 2008 and reviewed each death registration citing prostate cancer over 14 years from January 1995. Rates were standardised to the United States population and compared with those of African-American and White American men. The authors conclude that prostate cancer risks in Caribbean-origin populations are lower than previously believed, while mortality appeared higher than in African-American men.",
    findings: ["1,101 new cases; incidence 160.4 per 100,000 (95% CI 151.0 to 170.2), standardised to the US population.", "Comparable rates were 248.2 per 100,000 in African-American men and 158.0 in White American men.", "Prostate cancer mortality in Barbados ranged from 63.2 to 101.6 per 100,000, against 51.1 to 78.8 among African Americans."],
    whatItMeans: "In Barbados prostate cancer was diagnosed less often than in African-American men but appeared to cause more deaths; the abstract does not say why.",
    caveats: ["Cases from 2002 to 2008; the national registry now publishes later figures.", "Histologically confirmed cases only, so cancers never biopsied are not counted."],
    cancers: ["prostate"], links: [doi("10.1155/2011/565230", "DOI"), pubmed("22110989")] }),

  p({ id: "paper-martelly-registry-cost-barbados-canep-2016", name: "Economic assessment of integrated cancer and cardiovascular registries: The Barbados experience",
    journal: "Cancer Epidemiology", year: 2016, doi: "10.1016/j.canep.2016.10.020", pmid: "27865650", authors: "Martelly TN, Rose AM, Subramanian S, et al.", paperType: "methods",
    tldr: "Running Barbados's combined cancer and cardiovascular disease registry cost about US$382 to US$573 for each cancer case in 2014 to 2015, with the Ministry of Health paying 56% and staff the largest cost.",
    summary: "The report describes the resources needed for the Barbados National Registry's integrated approach to registering non-communicable diseases, using a modified version of the United States Centers for Disease Control and Prevention's International Registry Costing Tool and cost data for April 2014 to March 2015. Cancer cases are collected retrospectively, so the cost per case was estimated on the assumption that two or three years are needed. The authors conclude that fixed management and administration costs are substantial and can be shared when registries are combined.",
    findings: ["The Ministry of Health provided 56% of the registries' resources.", "Labour was over 70% of both registries' budgets.", "Variable costs of data collection and analysis were US$58,917 for cancer and US$131,297 for cardiovascular disease.", "Cost per case: cancer US$382 on a two-year and US$573 on a three-year assumption; cardiovascular disease US$489."],
    whatItMeans: "A small country can run a cancer registry by sharing staff and administration with other disease registers, and this paper puts a price on it.",
    caveats: ["One year of cost data, 2014 to 2015.", "The cancer cost per case depends on an assumption about how long retrospective collection takes."],
    institutions: ["barbados-national-registry"], links: [doi("10.1016/j.canep.2016.10.020", "DOI"), pubmed("27865650")] }),
];

/** Records behind /countries/bb/ (wave 16). */
export const recordsBB: EntityInput[] = [...institutions, ...papers];
