import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Gabon: the bodies and papers behind /countries/ga/ (wave 14) that the corpus did not hold. The Institut de
 * Cancérologie d'Akanda and the CNAMGS already exist in src/data/institutions/countries-2026-11-west-central-africa.ts
 * and are linked, not repeated. Each record was written from its own source, read as raw text on 16 November 2026:
 * the health ministry's news pages of 30 June and 10 November 2026 (sante.gouv.ga), the front page of the medicines
 * agency (anmaps.ga), and four papers resolved through Europe PMC with their abstracts and author affiliations read.
 * The two survey papers cover nine countries, the Republic of the Congo among them, and /countries/cg/ lists them too.
 * Coordinates are the approximate Libreville city point the corpus already uses, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MIN_POLE = { label: "Ministère de la Santé, Gabon: colloquium on the future of cancer care and research (30 June 2026)", url: "https://sante.gouv.ga/lutte-contre-les-cancers-le-gabon-affirme-sa-volonte-de-batir-un-pole-dexcellence-en-oncologie/" };
const MIN_CHUL = { label: "Ministère de la Santé, Gabon: equipment for the pathology laboratory of CHU de Libreville (10 November 2026)", url: "https://sante.gouv.ga/%f0%9d%90%8b%f0%9d%90%84-%f0%9d%90%8c%f0%9d%90%88%f0%9d%90%8d%f0%9d%90%88%f0%9d%90%92%f0%9d%90%93%f0%9d%90%91%f0%9d%90%84-%f0%9d%90%83%f0%9d%90%84-%f0%9d%90%8b%f0%9d%90%80-%f0%9d%90%92%f0%9d%90%80/" };
const ANMAPS = { label: "ANMAPS: official site (front page)", url: "https://anmaps.ga/" };
const REG_DOI = "10.1016/j.canep.2024.102695";
const RT_DOI = "10.5603/rpor.97507";
const BARR_RT_DOI = "10.1002/ijc.70390";
const BARR_CT_DOI = "10.1002/ijc.70309";

const institutions: InstitutionInput[] = [
  i({ id: "gabon-ministry-of-health", name: "Ministère de la Santé, Gabon", aka: ["Ministry of Health, Gabon", "Ministère de la Santé de la République Gabonaise"],
    city: "Libreville", country: "GA", lat: 0.409, lng: 9.442, institutionType: "government", website: "https://sante.gouv.ga/",
    tldr: "Gabon's health ministry, which is responsible for cancer prevention and screening and oversees the medicines agency. In June 2026 it held an international meeting on the future of cancer care and research in Gabon.",
    summary: "The ministry's news page of 30 June 2026 reports a colloquium it held in Libreville on 25 June 2026 on the future of cancer care and research in Gabon, on the theme of a centre of excellence to improve access to cancer diagnosis and treatment. The page lists what the meeting retained: speeding up a programme called CORE (Care, Outreach, Research and Education) developed with the Global Health Catalyst, strengthening the buildings and equipment of the Institut de Cancérologie d'Akanda, modernising the national cancer registry, telemedicine, training in oncology, and support for clinical research. A second page, of 10 November 2026, reports that on 4 November the minister handed microscopes and consumables to the pathology laboratory of the Centre Hospitalier Universitaire de Libreville, to analyse samples from screening campaigns. The national insurance fund's care package page says prevention, screening and health promotion remain the ministry's responsibility, and the medicines agency's site says it is under the ministry's supervision. OnCo found no national cancer plan on the ministry's site, parts of which answered with an error on 16 November 2026. The coordinates are an approximate Libreville city point.",
    programs: ["Colloquium on the future of cancer care and research in Gabon (25 June 2026)", "Octobre Rose screening campaigns for breast and cervical cancer"],
    institutions: ["ica-akanda", "anmaps-gabon", "chu-libreville", "cnamgs-gabon"],
    cancers: ["breast-cancer", "cervical", "prostate"],
    keyPapers: ["paper-ivanga-cancer-grand-libreville-canep-2024", "paper-ndjembidouma-rectal-toxicity-prostate-radiotherapy-akanda-rpor-2023", "paper-kroeber-radiotherapy-barriers-africa-registries-ijc-2026", "paper-konig-chemotherapy-barriers-africa-registries-ijc-2026"],
    links: [MIN_POLE, MIN_CHUL, { label: "CNAMGS: care package", url: "https://cnamgs.ga/le-panier-de-soins-de-la-cnamgs/" }] }),

  i({ id: "anmaps-gabon", name: "Agence Nationale du Médicament et des Autres Produits de Santé (ANMAPS), Gabon", aka: ["ANMAPS", "National Agency for Medicines and Other Health Products, Gabon", "Agence du Médicament (Gabon)"],
    city: "Libreville", country: "GA", lat: 0.409, lng: 9.442, institutionType: "government", website: "https://anmaps.ga/",
    tldr: "Gabon's medicines regulator, a public agency under the health ministry created by an ordinance of October 2023. Its site lists the registration of medicines and the management of clinical trials among its functions.",
    summary: "The agency's own site says the Agence Nationale du Médicament et des Autres Produits de Santé is a public scientific establishment under the supervision of the Ministry of Health, created by Ordinance No. 0004 of 24 October 2023 and ratified by Law No. 006/2023 on 26 January 2024. Its stated mission is to assure the quality, safety and efficacy of medicines and health products for human and veterinary use, and it regulates their production, import, export, marketing, use and destruction. The site lists eight functions: pharmaceutical regulation, registration of medicines (homologation), management of clinical trials, market surveillance and control, vigilance, authorisation of pharmaceutical establishments, control of medicines advertising, and quality control, and gives an address at Oloumi in Libreville. The front page still carried template filler text beside these statements when read on 16 November 2026, and OnCo did not find there a register of authorised medicines or a description of how a trial is authorised. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Gabon. The coordinates are an approximate Libreville city point.",
    programs: ["Registration of medicines (homologation)", "Management of clinical trials", "Market surveillance and quality control of medicines"],
    institutions: ["gabon-ministry-of-health"],
    links: [ANMAPS, { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf" }] }),

  i({ id: "chu-libreville", name: "Centre Hospitalier Universitaire de Libreville (CHUL)", aka: ["CHUL", "CHU de Libreville", "Libreville University Hospital"],
    city: "Libreville", country: "GA", lat: 0.409, lng: 9.442, institutionType: "hospital",
    tldr: "The university hospital in Libreville whose pathology laboratory confirms cancer from tissue and cell samples. In November 2026 the health minister gave the laboratory microscopes and supplies to handle samples from screening campaigns.",
    summary: "The Gabonese health ministry's page of 10 November 2026 reports that on 4 November 2026 the minister handed equipment and consumables to the pathology laboratory (anatomie pathologique) of the Centre Hospitalier Universitaire de Libreville: four microscopes, slides, embedding wax, cytology brushes, single-use speculums, staining reagents and protective wear. The page says the aim is to improve the analysis of samples from screening campaigns, in particular the Octobre Rose campaign on cancers in women, and to shorten the wait for results, and that the laboratory's examinations concern breast, cervical and prostate cancer among others. OnCo has not read the hospital's own pages and found no count of the laboratory's pathologists or of the specimens it reads. The coordinates are an approximate Libreville city point.",
    programs: ["Pathology laboratory (anatomie pathologique)"],
    institutions: ["gabon-ministry-of-health"],
    cancers: ["breast-cancer", "cervical", "prostate"],
    links: [MIN_CHUL] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-ivanga-cancer-grand-libreville-canep-2024", name: "Cancer incidence in Greater Libreville, Gabon, 2013 to 2017",
    journal: "Cancer Epidemiology", year: 2024, doi: REG_DOI, pmid: "39527871", authors: "Ivanga M, Parkin DM, Filankembo Kava A, et al.", paperType: "observational", participants: 1549,
    tldr: "The first five years of the population-based cancer registry for Greater Libreville, the area around Gabon's capital. It recorded 1,549 cancers among residents from 2013 to 2017, with breast and cervical cancer making up half of the cancers in women.",
    summary: "Published as \"Cancer in the Grand Libreville, Gabon (2013-2017)\". The abstract describes the registry in Greater Libreville as the primary population-based cancer registry to be established in Gabon and reports incidence for its first five years of registration. Most of the authors give the Institut de Cancérologie d'Akanda as their affiliation, with co-authors at the University of Oxford and at the University of Limoges.",
    findings: [
      "1,549 cancers were recorded among residents of Greater Libreville from 2013 to 2017: 955 in women (61.6%) and 594 in men (38.3%).",
      "Age-standardised incidence for all sites was 73.3 per 100,000 in women and 47.7 per 100,000 in men.",
      "Breast cancer (19.0 per 100,000) and cervical cancer (16.3) made up half of cancers in women; prostate (12.0), liver (5.1) and colorectal cancer (5.0) made up 41.1% of cancers in men.",
    ],
    whatItMeans: "These are counted cases, not modelled ones, and they are the kind of data IARC's national estimate for Gabon rests on. The authors caution that breast and prostate rates are much lower than in other registries of the region and may be underestimated.",
    caveats: ["One urban area, not the whole country.", "The authors themselves suggest some cancers are under-recorded."],
    cancers: ["breast-cancer", "cervical", "prostate", "hcc", "colorectal"],
    institutions: ["ica-akanda"], related: ["cancer-registries-surveillance"],
    links: [doi(REG_DOI, "Cancer Epidemiology 2024"), pubmed("39527871")] }),

  p({ id: "paper-ndjembidouma-rectal-toxicity-prostate-radiotherapy-akanda-rpor-2023", name: "Rectal side effects after radiotherapy for localised prostate cancer at the Akanda Cancer Institute, Gabon",
    journal: "Reports of Practical Oncology and Radiotherapy", year: 2023, doi: RT_DOI, pmid: "38179290", authors: "Ndjembidouma BCM, James LG, Meye PO, et al.", paperType: "observational", participants: 46,
    tldr: "A report from Gabon's cancer institute on 46 men given curative radiotherapy for prostate cancer between 2013 and 2021. Early bowel side effects occurred in about one man in six and late ones in about one in nine, and none of the late ones was severe.",
    summary: "Published as \"Assessment of rectal toxicities after radiation therapy for localized prostate cancer: experience of the Akanda Cancer Institute in Gabon\". The authors, from the institute's department of medical physics and radiotherapy, reviewed men with clinically localised prostate cancer treated with three-dimensional conformal radiotherapy at doses of 66 to 80 Gy, and graded bowel side effects on a standard scale.",
    findings: [
      "46 men were treated between 2013 and 2021.",
      "Acute bowel side effects occurred in 8 of 46 (17.4%): grade 1 in 6 and grade 3 in 2.",
      "Late bowel side effects occurred in 5 of 46 (10.9%), after a median of 12 months: grade 1 in 3 and grade 2 in 2, with none at grade 3 or above.",
    ],
    whatItMeans: "It documents that curative radiotherapy for prostate cancer has been given in Gabon since 2013, and what its bowel side effects were in one small series.",
    caveats: ["A single-centre series of 46 men.", "The abstract reports side effects, not cancer control or survival."],
    cancers: ["prostate"],
    institutions: ["ica-akanda"],
    links: [doi(RT_DOI, "Reports of Practical Oncology and Radiotherapy 2023"), pubmed("38179290")] }),

  p({ id: "paper-kroeber-radiotherapy-barriers-africa-registries-ijc-2026", name: "Barriers to radiotherapy reported by patients and caregivers in nine sub-Saharan African countries",
    journal: "International Journal of Cancer", year: 2026, doi: BARR_RT_DOI, pmid: "41720748", authors: "Kroeber ES, König T, Stöter O, et al.", paperType: "observational", participants: 553,
    tldr: "A telephone survey of 553 people with cancer, or their carers, drawn from cancer registries in nine African countries including Gabon and the Republic of the Congo. Cost of treatment was the commonest problem with radiotherapy, reported by about seven in ten.",
    summary: "Published as \"Patient- and caregiver-reported barriers to radiotherapy for cancer in sub-Saharan Africa: a survey of population-based registries\". The survey randomly selected patients with breast, cervical, colorectal and prostate cancer, Kaposi sarcoma and non-Hodgkin lymphoma diagnosed in 2018 and 2019 and registered in population-based registries of the African Cancer Registry Network in the Republic of the Congo, Ethiopia, Gabon, Kenya, Mali, Nigeria, Tanzania, Uganda and Zimbabwe. Authors include staff of the Gabon cancer registry at the Institut de Cancérologie de Libreville and of the Brazzaville Cancer Registry.",
    findings: [
      "Cost of treatment was the commonest problem (69.0% overall) and a severe barrier for 39.6%.",
      "A high share of patients from Congo, Kenya, Nigeria and Tanzania reported barriers.",
      "People who received radiotherapy reported fewer problems with transport and with trust in health workers, and more fear.",
    ],
    whatItMeans: "The authors conclude that a shortage of machines is not the only obstacle: affordability, communication between patients and health workers, and psychological support also need attention.",
    caveats: ["A telephone survey of people diagnosed in 2018 and 2019; the abstract does not say when the interviews took place or how many of those selected could be reached.", "The abstract gives few results by country."],
    cancers: ["breast-cancer", "cervical", "colorectal", "prostate"],
    institutions: ["ica-akanda", "brazzaville-cancer-registry"], related: ["paper-konig-chemotherapy-barriers-africa-registries-ijc-2026"],
    links: [doi(BARR_RT_DOI, "International Journal of Cancer 2026"), pubmed("41720748")] }),

  p({ id: "paper-konig-chemotherapy-barriers-africa-registries-ijc-2026", name: "Barriers to chemotherapy reported by patients and caregivers in nine sub-Saharan African countries",
    journal: "International Journal of Cancer", year: 2026, doi: BARR_CT_DOI, pmid: "41467612", authors: "König T, Mezger NCS, Stoeter O, et al.", paperType: "observational", participants: 553,
    tldr: "A telephone survey of 553 people with cancer, or their carers, registered in 11 city cancer registries in nine African countries. Problems of cost were especially severe in the Republic of the Congo, and fear of treatment prevailed in Gabon.",
    summary: "Published as \"Patient- and caregiver-reported barriers to chemotherapy in nine sub-Saharan African countries: a cross-sectional survey among population-based registries\". Randomly selected patients registered in 2018 and 2019 with breast, cervical, prostate or colorectal cancer, non-Hodgkin lymphoma or Kaposi sarcoma rated barriers on a three-point scale. Authors include staff of the Brazzaville Cancer Registry and of the Gabon cancer registry at the Institut de Cancérologie d'Akanda.",
    findings: [
      "58.6% of participants received chemotherapy; 13.2% were recommended it and did not receive it.",
      "The main barriers were the cost of transport, the cost of treatment, being away from home, lack of knowledge and fear of treatment.",
      "Affordability was especially severe in the Republic of the Congo; in Gabon fear of treatment prevailed.",
    ],
    whatItMeans: "What keeps people from chemotherapy differs by country, so the authors call for locally adapted help: financial assistance for the most vulnerable, psychological support and education.",
    caveats: ["A telephone survey; the abstract does not say how many of those selected could be reached.", "The abstract gives no percentages for single countries."],
    cancers: ["breast-cancer", "cervical", "colorectal", "prostate"],
    institutions: ["ica-akanda", "brazzaville-cancer-registry"], related: ["paper-kroeber-radiotherapy-barriers-africa-registries-ijc-2026"],
    links: [doi(BARR_CT_DOI, "International Journal of Cancer 2026"), pubmed("41467612")] }),
];

/** Records behind /countries/ga/ (wave 14). */
export const recordsGA: EntityInput[] = [...institutions, ...papers];
