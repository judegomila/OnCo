import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Burkina Faso: the public bodies, hospitals and papers behind /countries/bf/ (wave 11) that the corpus did not hold.
 * Each was written from its own primary source, read raw in French on 11 November 2026: the Ministry of Health's news
 * pages on sante.gov.bf (each dated on the page), Law 060-2015/CNT on universal health insurance and the CNAMU's own
 * pages on cnamu.bf, Faso FDA's presentation page on fasofda.bf, IAEA DIRAC's public equipment data, and a statement by
 * Burkina Faso's delegation to the IAEA General Conference in 2019 (PDF text on iaea.org). DOIs were resolved through
 * Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * The two hospitals have no website OnCo could reach, so their records rest on the Ministry's pages, DIRAC and the
 * IAEA statement. Inbound links: the Ministry links the CNAMU, Faso FDA and both hospitals, and each links the Ministry
 * back; the papers are linked through keyPapers. Coordinates are approximate Ouagadougou city points, not building
 * positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MS = (n: number, hash: string) =>
  `https://www.sante.gov.bf/detail?tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=${n}&cHash=${hash}`;
const MS_PLAN_2020 = MS(148, "37a1ece8a90f478684496de066c2362e");
const MS_ANTICANCER_LIST_2025 = MS(1021, "b2135836a2aafb09f7ec2da2d6c0f0c4");
const MS_WORKING_GROUP_2025 = MS(1017, "d2f61236026193604dcd51281368c365");
const MS_CERVIX_DAY_2021 = MS(448, "3d8ef1c81de95c830216a023120000a9");
const MS_GRATUITE_2020 = MS(320, "85d8b177692b1c119a83d59ce6e5feb8");
const MS_BOGODOGO_2021 = MS(646, "916e10d6663a91d77778f732ead2cb94");
const MS_BREAST_SURGERY_2025 = MS(1042, "a8bb6ecd50e99945c6d4c12b8d9e07fe");
const MS_BOGODOGO_CERT_2020 = MS(114, "3c518c4d7fb90d96e29ac113026efd1f");
const LOI_060 = "https://cnamu.bf/wp-content/uploads/2026/10/Loi-060-2015-_-RAMU-BF.pdf";
const CNAMU_HOW = "https://cnamu.bf/le-ramu/comment-ca-marche/";
const CNAMU_HISTORY = "https://cnamu.bf/le-ramu/historique/";
const CNAMU_PILOT = "https://cnamu.bf/atelier-bilan-de-la-phase-pilote-du-ramu/";
const FASO_FDA = "https://fasofda.bf/fr/";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const IAEA_GC_2019 = "https://iaea.org/sites/default/files/19/10/firstlady_burkinafaso.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "burkina-faso-ministry-of-health", name: "Ministère de la Santé, Burkina Faso", aka: ["Ministère de la Santé et de l'Hygiène Publique", "Ministry of Health, Burkina Faso", "MSHP Burkina Faso"],
    city: "Ouagadougou", country: "BF", lat: 12.37, lng: -1.52, institutionType: "government", website: "https://www.sante.gov.bf",
    tldr: "Burkina Faso's health ministry. It runs the national cancer control programme, pays for free care for women and children under five, which has included screening and treatment of precancerous cervical lesions since 2016, and oversees the regulator, Faso FDA.",
    summary: "The Ministry of Health is the technical supervisor of Burkina Faso's public hospitals and of the medicines regulator, Faso FDA. Its national cancer control programme (Programme national de lutte contre le cancer, PNLC) worked under a national cancer strategy for 2021 to 2025. In January 2020 the Ministry validated a strategic plan against cancer; at that workshop its secretary general said cancer absorbed more than 60% of the Ministry's budget for medical evacuations abroad, and listed the construction of a cancer centre and a radiotherapy unit, the start of a cancer registry and free screening and treatment of precancerous breast and cervical lesions among the actions under way. The coordinates are an approximate Ouagadougou city point.\n\nSince 2016 care for women and children under five has been free in public facilities and in private ones under agreement with the Ministry: medical acts, tests, generic medicines, consumables and hospital stays. At a review in October 2020 the Ministry counted 70 million free services in five years, at a cost to the state of more than 120 billion CFA francs. In 2021 the minister said the free care measures had included screening and treatment of precancerous cervical lesions since 2016, and that HPV vaccination of girls aged 9 to 13 had been run in the Baskuy and Solenzo health districts in 2014 and 2015. In May 2025 the PNLC updated the national list of anticancer medicines at the national purchasing centre for essential generic medicines, CAMEG, and in April 2025 it amended a draft order creating a technical working group on the ten commonest cancers.",
    programs: ["Programme national de lutte contre le cancer (PNLC)", "Stratégie nationale de lutte contre le cancer 2021 to 2025", "Free care for women and children under five (gratuité des soins, since 2016)", "National list of anticancer medicines (updated May 2025)", "Radiotherapy centre of Bobo-Dioulasso (under construction in 2025)"],
    institutions: ["cnamu-burkina-faso", "faso-fda", "chu-bogodogo", "chu-yalgado-ouedraogo", "iaea", "who"],
    cancers: ["cervical", "breast-cancer", "prostate", "hcc"],
    keyPapers: ["paper-ouedraogo-single-visit-cervical-burkina-ghsp-2018", "paper-diendere-cervical-screening-uptake-burkina-respe-2023", "paper-kiendrebeogo-hpv-vaccination-cost-effectiveness-burkina-bmchsr-2023", "paper-ida-childhood-cancer-diagnostic-delay-burkina-bmccancer-2026", "paper-zongo-breast-cancer-survival-ouagadougou-ejso-2022"],
    links: [
      { label: "Ministry of Health: strategic plan against cancer validated (10 February 2020)", url: MS_PLAN_2020 },
      { label: "Ministry of Health: national list of anticancer medicines updated (16 May 2025)", url: MS_ANTICANCER_LIST_2025 },
      { label: "Ministry of Health: technical working group on the ten commonest cancers (29 April 2025)", url: MS_WORKING_GROUP_2025 },
      { label: "Ministry of Health: free care, more than 120 billion CFA francs in five years (13 October 2020)", url: MS_GRATUITE_2020 },
      { label: "Ministry of Health: world cancer day and cervical cancer (10 February 2021)", url: MS_CERVIX_DAY_2021 },
    ] }),

  i({ id: "cnamu-burkina-faso", name: "Caisse nationale d'assurance maladie universelle, Burkina Faso (CNAMU)", aka: ["CNAMU", "National Universal Health Insurance Fund, Burkina Faso", "RAMU"],
    city: "Ouagadougou", country: "BF", lat: 12.36, lng: -1.53, institutionType: "government", website: "https://cnamu.bf",
    tldr: "The public fund that runs Burkina Faso's compulsory universal health insurance scheme, the RAMU, for civilians. Created in 2018, it ran a pilot in two regions and had registered 388,803 beneficiaries by 30 April 2026.",
    summary: "Law 060-2015/CNT of 5 September 2015 created a compulsory health insurance scheme, the régime d'assurance maladie universelle (RAMU), for every person living in Burkina Faso, with no distinction by nationality, sex or medical history. It covers care on the basis of a benefit package set by decree, which may leave part of the cost to the insured person; the state pays the whole contribution of people classed as indigent. The CNAMU, a public social insurance body created by decree 2018-0265 of 9 April 2018, runs the scheme for civilians; the armed forces have their own fund, the CAMA. The benefit package is set by decree 2023-1410. The coordinates are an approximate Ouagadougou city point.\n\nThe CNAMU began with a pilot in the Kadiogo and Guiriko regions. At its review of the pilot on 19 May 2026 it reported, for 30 April 2026, 431 affiliated facilities (216 of them private), 388,803 registered beneficiaries (119,639 public employees, 18,934 salaried workers, 4,192 self-employed workers in the informal economy and 231,322 dependants), and, at the time of the review, agreements with 3,102 providers and 1,375 contacts for 784 services delivered in the pilot zones. Its home page, read on 11 November 2026, says the RAMU now covers the whole territory. Every public health facility, from primary health centres to university hospitals, is part of its network.",
    programs: ["Régime d'assurance maladie universelle (RAMU, Law 060-2015/CNT)", "Benefit package (decree 2023-1410)", "Pilot phase in Kadiogo and Guiriko regions"],
    institutions: ["burkina-faso-ministry-of-health"],
    links: [
      { label: "CNAMU: how the RAMU works", url: CNAMU_HOW },
      { label: "CNAMU: history of the RAMU", url: CNAMU_HISTORY },
      { label: "CNAMU: review of the RAMU pilot phase (4 June 2026)", url: CNAMU_PILOT },
      { label: "CNAMU: benefits and contracted facilities", url: "https://cnamu.bf/prestations/" },
      { label: "Law 060-2015/CNT on universal health insurance (PDF, CNAMU)", url: LOI_060 },
    ] }),

  i({ id: "faso-fda", name: "Faso Food and Drug Administration (Faso FDA)", aka: ["Faso FDA", "Agence nationale de régulation pharmaceutique (ANRP)", "ANRP Burkina Faso"],
    city: "Ouagadougou", country: "BF", lat: 12.37, lng: -1.51, institutionType: "government", website: FASO_FDA,
    tldr: "Burkina Faso's medicines and food regulator, created in May 2026 by merging the national pharmaceutical regulatory agency (ANRP) with the agency for environmental, food, occupational and health product safety (ANSSEAT).",
    summary: "Faso FDA describes itself as a non-hospital public health body under the technical supervision of the Ministry of Health and the financial supervision of the Ministry of Finance. It was created by decree 2026-0602/PF/PRIM/MEF/MS of 22 May 2026 from the merger of the Agence nationale de régulation pharmaceutique (ANRP) and the Agence nationale pour la sécurité sanitaire de l'environnement, de l'alimentation, du travail et des produits de santé (ANSSEAT). It grants marketing authorisations, inspects establishments, regulates prices, controls advertising and acts against falsified health products, for human and veterinary medicines, vaccines, blood products, devices and food. Its site carries a national register of clinical trials, the national nomenclature of health products and the national therapeutic formulary, and takes reports of side effects through the Med Safety app. The coordinates are an approximate Ouagadougou city point.\n\nWHO's list of regulators operating at maturity levels 3 and 4, dated August 2026, does not include Burkina Faso.",
    programs: ["Marketing authorisation (homologation) of health products", "Pharmaceutical inspection", "Pharmacovigilance (Med Safety)", "National register of clinical trials", "Price regulation"],
    institutions: ["burkina-faso-ministry-of-health"],
    links: [
      { label: "Faso FDA: presentation, decree 2026-0602 and missions", url: FASO_FDA },
      { label: "WHO: regulatory authorities at maturity levels 3 and 4 (August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
    ] }),

  i({ id: "chu-bogodogo", name: "Centre hospitalier universitaire de Bogodogo, Ouagadougou", aka: ["CHU Bogodogo", "CHU de Bogodogo", "Centre de radiothérapie de Bogodogo"],
    city: "Ouagadougou", country: "BF", lat: 12.35, lng: -1.47, institutionType: "hospital", website: "https://www.sante.gov.bf",
    tldr: "A public university hospital in Ouagadougou that holds Burkina Faso's only radiotherapy centre in IAEA DIRAC, with two linear accelerators. The centre was built from 2019 and was treating its first patients in June 2021.",
    summary: "The CHU de Bogodogo is a public university hospital in Ouagadougou. Construction of a radiotherapy centre in its grounds began in April 2019, according to the statement of Burkina Faso's delegation to the IAEA General Conference that year, with IAEA support for licensing through the national radiation protection and nuclear safety authority (ARSN). The Ministry of Health reported the minister visiting the centre about two months after its inauguration, in June 2021, and meeting its first patients. IAEA DIRAC's public equipment data, read on 11 November 2026 with the entry last updated in 2025, lists the CHU de Bogodogo as the only radiotherapy centre in Burkina Faso, with two megavoltage machines, both linear accelerators, and no brachytherapy. On a visit on 31 December 2019 the Ministry praised the hospital's implementation of free care for women and children under five and gave it a certificate for its hospital pharmacy and its use of the Robson classification for caesarean sections. It has no website OnCo could reach; the coordinates are an approximate point in eastern Ouagadougou.",
    programs: ["Radiotherapy (two linear accelerators, IAEA DIRAC)"],
    institutions: ["burkina-faso-ministry-of-health", "iaea"],
    cancers: ["cervical", "breast-cancer"],
    links: [
      { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
      { label: "Ministry of Health: the Bogodogo radiotherapy centre (24 June 2021)", url: MS_BOGODOGO_2021 },
      { label: "Burkina Faso statement to the IAEA General Conference, 2019 (PDF)", url: IAEA_GC_2019 },
      { label: "Ministry of Health: CHU Bogodogo praised for free care and given a certificate (visit of 31 December 2019)", url: MS_BOGODOGO_CERT_2020 },
    ] }),

  i({ id: "chu-yalgado-ouedraogo", name: "Centre hospitalier universitaire Yalgado Ouédraogo, Ouagadougou", aka: ["CHU Yalgado Ouédraogo", "CHU-YO", "Yalgado Ouédraogo University Hospital"],
    city: "Ouagadougou", country: "BF", lat: 12.38, lng: -1.52, institutionType: "hospital", website: "https://www.sante.gov.bf",
    tldr: "A public university hospital in Ouagadougou with a nuclear medicine service set up with IAEA support, and the site of free breast cancer surgery campaigns run with the Université Joseph Ki-Zerbo.",
    summary: "The CHU Yalgado Ouédraogo is a public university hospital in Ouagadougou. Burkina Faso's statement to the IAEA General Conference in 2019 credits cooperation with the IAEA for a functioning nuclear medicine service there. In May 2025 the hospital hosted the third free breast cancer surgery campaign, run with the Université Joseph Ki-Zerbo's master's programme in breast surgery and reconstruction and funded by the Fondation Orange Burkina: 22 women were to be operated on, half for breast cancer and half for breast reconstruction after earlier surgery, without paying for consultation, operation, theatre supplies or stay, with surgeons from nine African and European countries. It has no website OnCo could reach; the coordinates are an approximate Ouagadougou city point.",
    programs: ["Nuclear medicine", "Free breast cancer surgery campaigns (third edition, May 2025)"],
    institutions: ["burkina-faso-ministry-of-health", "iaea"],
    cancers: ["breast-cancer"],
    links: [
      { label: "Ministry of Health: third free breast cancer surgery campaign at CHU-YO (5 June 2025)", url: MS_BREAST_SURGERY_2025 },
      { label: "Burkina Faso statement to the IAEA General Conference, 2019 (PDF)", url: IAEA_GC_2019 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-ouedraogo-single-visit-cervical-burkina-ghsp-2018", name: "Expanding the single-visit approach for cervical cancer prevention: successes and lessons from Burkina Faso",
    journal: "Global Health: Science and Practice", year: 2018, doi: "10.9745/GHSP-D-17-00326", pmid: "29959272", authors: "Ouedraogo Y, Furlane G, Fruhauf T, et al.", paperType: "observational", participants: 13999,
    tldr: "A programme in 14 facilities screened 13,999 women with visual inspection and offered same-day cryotherapy. Same-day treatment fell from over 80% to 51% when a $10 fee was charged, and the Ministry added the service to its minimum package in 2016.",
    summary: "A description of a cervical cancer prevention programme run with the Ministry of Health and professional associations in 14 facilities from September 2010 to August 2014, coupling visual inspection with acetic acid with same-day cryotherapy and referral for loop excision.",
    findings: ["13,999 women were screened over four years; 8.9% screened positive and 65.9% of them received cryotherapy in a single visit.", "Same-day treatment was 82% to 93% while services were free, fell to 51% when a $10 fee for supplies was charged, and rose again to 78% after the fee was cut to $4 in November 2012.", "The Ministry of Health included the service in its minimum service delivery package in 2016."],
    whatItMeans: "Fees decided whether women with a positive screen were treated the same day, which is why free screening and treatment matter.",
    caveats: ["A programme report, not a controlled study."],
    cancers: ["cervical"], links: [doi("10.9745/GHSP-D-17-00326", "DOI"), pubmed("29959272")] }),

  p({ id: "paper-diendere-cervical-screening-uptake-burkina-respe-2023", name: "Low attendance in cervical cancer screening among adult women in Burkina Faso: results from the first nationwide population-based survey",
    journal: "Revue d'Épidémiologie et de Santé Publique", year: 2023, doi: "10.1016/j.respe.2023.101845", pmid: "37146541", authors: "Diendéré J, Kiemtoré S, Coulibaly A, et al.", paperType: "observational", participants: 2293,
    tldr: "In WHO's 2013 STEPS survey covering all 13 regions, 6.2% of 2,293 women had ever been screened for cervical cancer: 18.5% in towns and 2.8% in the countryside.",
    summary: "A secondary analysis of the 2013 WHO STEPwise survey in Burkina Faso, covering all 13 regions, of lifetime cervical cancer screening among adult women and its geographical and sociodemographic determinants.",
    findings: ["6.2% (95% CI 5.3 to 7.3) of women had ever been screened.", "Uptake was 16.6% in the Centre and Hauts-Bassins regions together and 3.3% in the other eleven regions.", "Uptake was 18.5% in urban and 2.8% in rural areas."],
    whatItMeans: "Before the free screening measure of 2016, very few women outside the Centre and Hauts-Bassins regions, home to Ouagadougou and Bobo-Dioulasso, had ever been screened.",
    caveats: ["The data are from 2013, before screening became free in 2016."],
    cancers: ["cervical"], links: [doi("10.1016/j.respe.2023.101845", "DOI"), pubmed("37146541")] }),

  p({ id: "paper-kiendrebeogo-hpv-vaccination-cost-effectiveness-burkina-bmchsr-2023", name: "Cost-effectiveness of human papillomavirus (HPV) vaccination in Burkina Faso: a modelling study",
    journal: "BMC Health Services Research", year: 2023, doi: "10.1186/s12913-023-10283-3", pmid: "38041075", authors: "Kiendrébéogo JA, Sidibe ARO, Compaoré GB, et al.", paperType: "methods",
    tldr: "Burkina Faso began vaccinating 9-year-old girls against HPV in 2022 with Gavi support. A model found vaccination could prevent 37% to 72% of cervical cancer cases and deaths and is cost-effective.",
    summary: "A static cohort model of the impact and cost-effectiveness of HPV vaccination of 9-year-old girls in Burkina Faso over 2022 to 2031, comparing four vaccines with no vaccination, using local HPV type distribution, costs and coverage with GLOBOCAN 2020 burden data.",
    findings: ["Burkina Faso launched HPV vaccination for 9-year-old girls in 2022 with support from Gavi.", "HPV vaccination could prevent 37% to 72% of cervical cancer cases and deaths.", "Vaccination was cost-effective from a limited societal perspective; a single-dose strategy could improve cost-effectiveness further."],
    whatItMeans: "It supports keeping the national HPV programme going after Gavi support.",
    caveats: ["A model; its results depend on assumed coverage, costs and efficacy."],
    cancers: ["cervical"], links: [doi("10.1186/s12913-023-10283-3", "DOI"), pubmed("38041075")] }),

  p({ id: "paper-zongo-breast-cancer-survival-ouagadougou-ejso-2022", name: "Survival of patients operated on for breast cancer in Ouagadougou, Burkina Faso",
    journal: "European Journal of Surgical Oncology", year: 2022, doi: "10.1016/j.ejso.2022.07.001", pmid: "35871031", authors: "Zongo N, Ouédraogo S, Bado C, Kaboré A, Dem A", paperType: "observational", participants: 550,
    tldr: "Of 550 patients operated on for breast cancer in Ouagadougou between 2013 and 2020, 66.2% were alive five years later; survival was 29.8% for stage IV disease.",
    summary: "A descriptive and analytical study of survival among patients operated on for breast cancer in Ouagadougou from 1 January 2013 to 31 December 2020, using Kaplan-Meier estimates and Cox models for prognostic factors.",
    findings: ["550 cases were collected.", "Five-year overall survival was 66.2%.", "Five-year survival was 53% for patients under 30, 63.5% for rural patients, 50.5% for HER2-positive patients and 29.8% for stage IV."],
    whatItMeans: "Survival after breast cancer surgery depended strongly on stage and on patients' social and educational circumstances.",
    caveats: ["Only patients who reached surgery; those never operated on are not counted."],
    cancers: ["breast-cancer"], links: [doi("10.1016/j.ejso.2022.07.001", "DOI"), pubmed("35871031")] }),

  p({ id: "paper-ida-childhood-cancer-diagnostic-delay-burkina-bmccancer-2026", name: "Diagnostic delay as health system navigation: a mixed-methods study of childhood cancer in Burkina Faso",
    journal: "BMC Cancer", year: 2026, doi: "10.1186/s12885-026-16462-9", pmid: "42471650", authors: "Ida A, Kaboret SD, Bouda GC, Kouéta F", paperType: "observational", participants: 30,
    tldr: "At the two national paediatric oncology units in Ouagadougou, the median time from first symptoms to a childhood cancer diagnosis was 103.5 days, and the more providers a family saw, the longer the delay.",
    summary: "A sequential explanatory mixed-methods study at the two national paediatric oncology units in Ouagadougou, with quantitative analysis of 30 children with a first cancer diagnosis and interviews with 20 caregivers, read through a health system navigation framework.",
    findings: ["The median total diagnostic delay was 103.5 days (IQR 58 to 196), with referral delay the longest component.", "More provider encounters were associated with a longer total delay.", "Caregivers described looping between providers and bottlenecks at higher-level facilities."],
    whatItMeans: "Better referral coordination and patient navigation could shorten the time to a diagnosis for children with cancer.",
    caveats: ["Small and exploratory; associations, not causes."],
    cancers: ["childhood-cancers"], links: [doi("10.1186/s12885-026-16462-9", "DOI"), pubmed("42471650")] }),
];

/** Records behind /countries/bf/ (wave 11). */
export const recordsBF: EntityInput[] = [...institutions, ...papers];
