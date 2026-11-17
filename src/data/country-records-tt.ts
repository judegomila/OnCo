import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Trinidad and Tobago: the registry and papers behind /countries/tt/ (wave 16) that the corpus did not hold. The
 * registry record was written from the Ministry of Health's own page, the registry's report "Cancer in Trinidad and
 * Tobago 2003-2020" (published 2025, PDF text) and the Minister of Health's address of 11 July 2025, all read raw on
 * 16 November 2026. DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed
 * abstracts.
 *
 * Inbound links: the registry links the Ministry of Health, which the corpus already holds, and the papers are linked
 * through keyPapers. Coordinates are an approximate point for Champs Fleurs, not a building position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const REGISTRY_PAGE = "https://health.gov.tt/national-cancer-registry";
const REGISTRY_REPORT = "https://health.gov.tt/sites/default/files/2025-02/2025-02-Cancer-in-Trinidad-and-Tobago-2003-2020.pdf";
const MINISTER_2025 = "https://health.gov.tt/node/1689";

const institutions: InstitutionInput[] = [
  i({ id: "quamina-cancer-registry-tt", name: "Dr. Elizabeth Quamina Cancer Registry", aka: ["National Cancer Registry of Trinidad and Tobago", "Elizabeth Quamina Cancer Registry", "Trinidad and Tobago Cancer Registry"],
    city: "Champs Fleurs", country: "TT", lat: 10.65, lng: -61.42, institutionType: "government", website: REGISTRY_PAGE,
    tldr: "Trinidad and Tobago's national, population-based cancer registry, set up in September 1994. Its 2025 report counts 43,380 people diagnosed with cancer from 2003 to 2020 and 3,225 new cases in 2020.",
    summary: "The Ministry of Health says the Dr. Elizabeth Quamina Cancer Registry serves as the national cancer registry, that it was established in September 1994 as a project of the Trinidad and Tobago Cancer Society, and that it was named after its founder, who died in 1997. Its report 'Cancer in Trinidad and Tobago 2003-2020', published in 2025, says it is managed by the Ministry of Health, the North Central Regional Health Authority and the Trinidad and Tobago Cancer Society, follows IARC's standards and holds over 65,000 registered cases. Cancer notification is not mandatory by law; registry officers collect cases from most public and some private institutions. The report counts 43,380 people diagnosed from 2003 to 2020 (49% male, 51% female), with new cases rising from 2,142 in 2003 to 3,225 in 2020 and cancer deaths from 910 to 2,035, and says its data were accepted in 2023 into Cancer Incidence in Five Continents for the first time. IARC's GLOBOCAN 2024 fact sheet gives a national registry as its incidence source for Trinidad and Tobago. The Ministry gives the registry's address as the Eric Williams Medical Sciences Complex, Champs Fleurs; the coordinates are an approximate point.",
    programs: ["Cancer in Trinidad and Tobago 2003-2020 (report published 2025)", "Active case collection from public and private institutions"],
    institutions: ["moh-trinidad-tobago", "iarc"],
    cancers: ["prostate", "breast-cancer", "colorectal", "cervical"],
    keyPapers: ["paper-warner-cancer-incidence-mortality-trinidad-tobago-bmccancer-2018", "paper-warner-prostate-cancer-trinidad-tobago-ccc-2018", "paper-gopaul-cancer-trends-trinidad-tobago-jhpn-2023"],
    links: [
      { label: "Ministry of Health: about the cancer registry", url: REGISTRY_PAGE },
      { label: "Cancer in Trinidad and Tobago 2003-2020 (2025, PDF)", url: REGISTRY_REPORT },
      { label: "Ministry of Health: the Minister's address to the Caribbean Association for Oncology and Hematology (11 July 2025)", url: MINISTER_2025 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-warner-cancer-incidence-mortality-trinidad-tobago-bmccancer-2018", name: "Cancer incidence and mortality rates and trends in Trinidad and Tobago",
    journal: "BMC Cancer", year: 2018, doi: "10.1186/s12885-018-4625-x", pmid: "29973176", authors: "Warner WA, Lee TY, Badal K, et al.", paperType: "observational", participants: 29512,
    tldr: "An analysis of 29,512 cancers reported to Trinidad and Tobago's national registry from 1995 to 2009 found the highest incidence and mortality in people of African ancestry, and rates that differed by regional health authority.",
    summary: "Cancer surveillance data on incident cases reported to the Dr. Elizabeth Quamina Cancer Registry, the population-based registry of Trinidad and Tobago, between 1995 and 2009 were analysed, with age-standardised rates reported overall and by sex, ancestry and geography. The highest rates were for breast, cervical and uterine cancers in women and prostate, lung and colorectal cancers in men. The authors call for national investment in understanding cancer epidemiology to guide prevention and control.",
    findings: ["29,512 incident cases, 1995 to 2009.", "Incidence per 100,000 was 243 in people of African ancestry, 125 in East Indian and 119 in mixed ancestry; mortality was 156, 66 and 66.", "Average incidence was highest in the area of the Tobago Regional Health Authority (188 per 100,000), and average mortality in the North West Regional Health Authority (108 per 100,000)."],
    whatItMeans: "Cancer does not fall evenly across Trinidad and Tobago: rates differ by ancestry and by region, in data counted by the national registry.",
    caveats: ["Data end in 2009.", "Ancestry is as recorded by the registry, and a later registry report gives ethnicity as unknown for about a quarter of cases."],
    cancers: ["prostate", "breast-cancer", "cervical", "colorectal"], institutions: ["quamina-cancer-registry-tt"], links: [doi("10.1186/s12885-018-4625-x", "DOI"), pubmed("29973176")] }),

  p({ id: "paper-warner-prostate-cancer-trinidad-tobago-ccc-2018", name: "The burden of prostate cancer in Trinidad and Tobago: one of the highest mortality rates in the world",
    journal: "Cancer Causes & Control", year: 2018, doi: "10.1007/s10552-018-1038-8", pmid: "29774450", authors: "Warner WA, Lee TY, Fang F, et al.", paperType: "observational", participants: 6064,
    tldr: "Registry data on 6,064 prostate cancers and 3,704 prostate cancer deaths in Trinidad and Tobago from 1995 to 2009 showed the death rate rising while it fell in the United States.",
    summary: "Incident and mortality cases of prostate cancer from January 1995 to December 2009 reported to the Dr. Elizabeth Quamina Cancer Registry were analysed for survival, incidence and mortality by ancestry and geography. The authors note limitations in data quality and call for improved surveillance, targeted screening and optimised treatment.",
    findings: ["6,064 incident cases and 3,704 deaths, 1995 to 2009.", "In 2009 the age-standardised incidence was 64.2 per 100,000 and mortality 47.1 per 100,000 (1960 world standard).", "The mortality rate rose from 37.9 per 100,000 in 1995 to 79.4 in 2009, while the United States rate fell from 37.3 to 22.1.", "45.7% of patients of African ancestry received treatment, against 60.3% of Indian and 60.9% of mixed ancestry."],
    whatItMeans: "The authors describe prostate cancer as the most commonly diagnosed cancer and the leading cause of cancer death in men in Trinidad and Tobago, and a smaller share of men of African ancestry were recorded as treated.",
    caveats: ["Data end in 2009.", "The authors themselves flag limitations in data quality."],
    cancers: ["prostate"], institutions: ["quamina-cancer-registry-tt"], links: [doi("10.1007/s10552-018-1038-8", "DOI"), pubmed("29774450")] }),

  p({ id: "paper-gopaul-cancer-trends-trinidad-tobago-jhpn-2023", name: "Cancer morbidity and mortality trends in Trinidad and Tobago (2008-2018)",
    journal: "Journal of Health, Population, and Nutrition", year: 2023, doi: "10.1186/s41043-023-00395-1", pmid: "37370167", authors: "Gopaul CD, Singh A, Williams A, et al.", paperType: "observational", participants: 15029,
    tldr: "In 15,029 cancers reported to Trinidad and Tobago's registry from 2008 to 2018, most women with breast cancer were diagnosed at a localised stage, while lung and colon cancers were most often found at a distant or unknown stage.",
    summary: "A retrospective analysis of incident cases reported to the Dr. Elizabeth Quamina Cancer Registry between 2008 and 2018, by sex, ancestry and age. Prostate cancer in men and breast cancer in women had the highest incidence. In men the highest cancer mortality was from prostate, lung, colon, blood and pancreatic cancers; in women from breast, ovary, colon, blood and pancreatic cancers.",
    findings: ["15,029 incident cases, 2008 to 2018.", "The top five cancer sites were most frequent among Afro-Trinidadians, followed by Indo-Trinidadians.", "Most women with breast cancer were diagnosed at a localised stage; most men with breast cancer at a distant or regional stage.", "For lung and colon cancer the stage was distant or unknown for most patients, and for prostate cancer it was unknown for the majority."],
    whatItMeans: "The stage at diagnosis is often unrecorded in Trinidad and Tobago's registry data, which limits what can be said about how early cancers are found.",
    caveats: ["The abstract gives no rates or percentages.", "Stage was unknown for many cases, by the authors' own account."],
    cancers: ["breast-cancer", "prostate", "colorectal"], institutions: ["quamina-cancer-registry-tt"], links: [doi("10.1186/s41043-023-00395-1", "DOI"), pubmed("37370167")] }),
];

/** Records behind /countries/tt/ (wave 16). */
export const recordsTT: EntityInput[] = [...institutions, ...papers];
