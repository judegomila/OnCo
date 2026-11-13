import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Mozambique: the public bodies and papers behind /countries/mz/ (wave 9) that the corpus did not hold. Institutions were
 * written from their own pages read as raw text in Portuguese and English on 11 November 2026: the African Cancer
 * Registry Network's member pages for the Beira and Maputo registries, and the national medicines regulator ANARME's
 * home page and its news item of 10 September 2026 on WHO maturity level 3. DOIs were resolved through Europe PMC and
 * every figure in `findings` is taken from the indexed abstract. The Ministry of Health's website (misau.gov.mz) did not
 * answer, so no ministry record is added. Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const AFCRN_MAPUTO = "https://afcrn.org/index.php/membership/membership-list/143-maputo";
const AFCRN_BEIRA = "https://afcrn.org/index.php/membership/membership-list/105-beira";
const ANARME_ML3 = "https://anarme.gov.mz/conselho-coordenador-de-saude-destaca-nivel-de-maturidade-3-alcancado-pela-anarme/";

const institutions: InstitutionInput[] = [
  i({ id: "maputo-cancer-registry", name: "Maputo Cancer Registry", aka: ["Registo de Cancro de Maputo", "Maputo Central Hospital Cancer Registry"],
    city: "Maputo", country: "MZ", lat: -25.97, lng: 32.59, institutionType: "research-institute", website: AFCRN_MAPUTO,
    tldr: "The population-based cancer registry for Maputo City, run from Maputo Central Hospital, covering about 1.2 million people. Since 2015 it has combined the hospital's own registry with the city's population registry.",
    summary: "The Maputo registry covers the whole province of Maputo City, about 300 square kilometres with 1,225,868 inhabitants in 2014 according to Statistics Mozambique, as described on its African Cancer Registry Network member page. Registration is passive and active; pathologists check the coding, data are kept in CanReg 5, and death certificates mentioning cancer are registered, with plans to add civil registry deaths. Since 2015 the hospital-based and population-based registries have been merged into one CanReg database. Papers on cancer in Maputo report 12,674 cancers registered in 1991 to 2008 and 1,707 in city residents in 2015 to 2016, with prostate cancer, Kaposi sarcoma and liver cancer leading in men and cervical and breast cancer and Kaposi sarcoma in women. The coordinates on this record are an approximate Maputo point.",
    programs: ["Population-based cancer registration for Maputo City", "Hospital-based registry of Maputo Central Hospital (merged 2015)"],
    institutions: ["beira-cancer-registry", "anarme-mozambique", "iarc"], cancers: ["cervical", "kaposi-sarcoma", "prostate", "breast-cancer"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-lorenzoni-maputo-incidence-trends-1991-2008-plosone-2015", "paper-carrilho-maputo-incidence-2015-2016-ejcp-2019"],
    links: [
      { label: "African Cancer Registry Network: Maputo", url: AFCRN_MAPUTO },
      doi("10.1097/cej.0000000000000457", "Carrilho et al., cancer incidence in Mozambique 2015 to 2016 (Eur J Cancer Prev 2019)"),
    ] }),

  i({ id: "beira-cancer-registry", name: "Beira Cancer Registry", aka: ["Registro de Cancro de Beira"],
    city: "Beira", country: "MZ", lat: -19.83, lng: 34.84, institutionType: "research-institute", website: AFCRN_BEIRA,
    tldr: "Mozambique's population-based cancer registry for the district of Beira, founded in 2005 at Beira Central Hospital, covering about 458,000 people.",
    summary: "The Beira Cancer Registry (Registro de Cancro de Beira) was founded in 2005 at Hospital Central de Beira, according to its African Cancer Registry Network member page. It covers the district of Beira, one of 13 districts of Sofala Province, with 443,369 people at the 2007 census and an estimated 457,799 in 2013. The page says a grant from IARC in 2008 supported salaries, equipment and running costs, with some government contributions to indirect costs. A 2024 paper using the Beira and Maputo registries found colorectal cancer rising in Beira between 2009 and 2020, particularly at ages 50 and over. The coordinates on this record are an approximate Beira point.",
    programs: ["Population-based cancer registration for Beira district (from 2005)"],
    institutions: ["maputo-cancer-registry", "iarc"], cancers: ["colorectal", "cervical", "kaposi-sarcoma"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "African Cancer Registry Network: Beira", url: AFCRN_BEIRA },
      doi("10.3332/ecancer.2024.1693", "Selemane et al., is colorectal cancer incidence increasing in Mozambique? (ecancer 2024)"),
    ] }),

  i({ id: "anarme-mozambique", name: "National Medicines Regulatory Authority of Mozambique", aka: ["ANARME", "ANARME, IP", "Autoridade Nacional Reguladora de Medicamento"],
    city: "Maputo", country: "MZ", lat: -25.96, lng: 32.58, institutionType: "government", website: "https://www.anarme.gov.mz",
    tldr: "Mozambique's medicines regulator. It grants marketing authorisation by registration, notification or special and emergency import, and reached WHO maturity level 3, which the Minister of Health highlighted in September 2026.",
    summary: "The Autoridade Nacional Reguladora de Medicamento (ANARME, IP) grants marketing authorisation (Autorização de Introdução no Mercado) after assessing quality, safety and efficacy; its website says authorisation can be by registration, notification or special and emergency import. It also licenses manufacturers, importers and pharmacies, runs pharmacovigilance and clinical trial oversight, and tests product quality. On 10 September 2026, at the 51st Health Coordinating Council in Beira, the Minister of Health, Ussene Isse, named its attainment of WHO maturity level 3 as one of the sector's main achievements; ANARME's board chair is Tânia Vuyeya Sitoie. The coordinates on this record are an approximate Maputo point.",
    programs: ["Marketing authorisation (registration, notification, special import)", "Pharmacovigilance and clinical trials", "Quality control laboratory"],
    institutions: ["maputo-cancer-registry", "who"],
    links: [
      { label: "ANARME: home page", url: "https://www.anarme.gov.mz/" },
      { label: "ANARME: Health Coordinating Council highlights maturity level 3 (11 September 2026, Portuguese)", url: ANARME_ML3 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-lorenzoni-maputo-incidence-trends-1991-2008-plosone-2015", name: "Trends in cancer incidence in Maputo, Mozambique, 1991 to 2008",
    journal: "PLoS One", year: 2015, doi: "10.1371/journal.pone.0130469", pmid: "26110774", authors: "Lorenzoni C, Vilajeliu A, Carrilho C, et al.", paperType: "observational", participants: 12674,
    tldr: "Over 18 years 12,674 cancers were registered in Maputo; the risk of cancer rose in both sexes, with prostate cancer rising fastest and cervical cancer reaching 62.0 per 100,000 women in 2003 to 2008.",
    summary: "Published as \"Trends in cancer incidence in Maputo, Mozambique, 1991-2008\". The authors calculated age-standardised rates and average annual percentage changes by sex for the population of Maputo city.",
    findings: [
      "12,674 cancers were registered in 1991 to 2008, 56.9% in women.",
      "In men the commonest were prostate cancer, Kaposi sarcoma and liver cancer; prostate cancer rose 11.3% a year to 61.7 per 100,000 in 2003 to 2008.",
      "In women the commonest were cervical cancer, breast cancer and Kaposi sarcoma; cervical cancer rose 4.7% a year to 62.0 per 100,000 in 2003 to 2008, and breast cancer 6.5% a year.",
    ],
    whatItMeans: "Cancers linked to changing lifestyles (prostate, breast) were rising alongside high or rising infection-related cancers (cervix, liver, Kaposi sarcoma).",
    caveats: ["One city."],
    institutions: ["maputo-cancer-registry"], cancers: ["cervical", "prostate", "kaposi-sarcoma", "breast-cancer"],
    links: [doi("10.1371/journal.pone.0130469", "PLoS One 2015"), pubmed("26110774")] }),

  p({ id: "paper-carrilho-maputo-incidence-2015-2016-ejcp-2019", name: "Cancer incidence in Maputo City, 2015 to 2016, from the Maputo Central Hospital Cancer Registry",
    journal: "European Journal of Cancer Prevention", year: 2019, doi: "10.1097/cej.0000000000000457", pmid: "29939861", authors: "Carrilho C, Fontes F, Tulsidás S, et al.", paperType: "observational", participants: 1707,
    tldr: "The Maputo Central Hospital registry counted 1,707 cancers in city residents in 2015 to 2016; cervical cancer (32.4 per 100,000) led in women and prostate cancer (24.5) in men.",
    summary: "Published as \"Cancer incidence in Mozambique in 2015-2016: data from the Maputo Central Hospital Cancer Registry\". Rates for Maputo City were computed on the assumption that most cancers in city residents were identified at the hospital, and compared with 1956 to 1961.",
    findings: [
      "1,707 cancers in Maputo City residents were registered; 76.6% were confirmed by histology.",
      "In men the commonest were prostate cancer (24.5 per 100,000), Kaposi sarcoma (19.8) and liver cancer (13.3).",
      "In women the commonest were cervical cancer (32.4), breast cancer (11.8) and Kaposi sarcoma (9.5).",
      "Since 1956 to 1961, prostate cancer rose 172.2% and breast cancer 237.1%; bladder and liver cancer fell most.",
    ],
    whatItMeans: "Infection-related cancers remain frequent in Maputo while cancers linked to demographic and economic change are rising.",
    caveats: ["Hospital-registry data used as population rates, assuming most city cases reach the hospital."],
    institutions: ["maputo-cancer-registry"], cancers: ["cervical", "prostate", "kaposi-sarcoma", "breast-cancer"],
    links: [doi("10.1097/cej.0000000000000457", "Eur J Cancer Prev 2019"), pubmed("29939861")] }),
];

/** Records behind /countries/mz/ (wave 9). */
export const recordsMZ: EntityInput[] = [...institutions, ...papers];
