import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Mali: the public bodies, hospitals, registry and papers behind /countries/ml/ (wave 11) that the corpus did not hold.
 * Each was written from its own primary source, read raw on 11 November 2026: Law 2018-074 of 31 December 2018
 * instituting universal health insurance (RAMU) and Decree 2022-0018/PT-RM applying it (Journal officiel, PDF text from
 * WHO's health legislation database), the Ministry of Health and Social Development's news pages of July, October and
 * November 2026, the African Cancer Registry Network's member page for the Bamako registry, the NIH ClinRegs profile
 * for Mali (updated January 2026), IAEA DIRAC's public equipment data, and the papers: DOIs resolved through Europe PMC
 * and Crossref with figures taken from the indexed abstracts, and the Health Sciences and Disease article read as PDF
 * text from the journal's site, as the DOI printed on it (10.5281/hsd.v23i1.3225) did not resolve through doi.org or Crossref.
 *
 * Inbound links: the Ministry links the registry, DPM, CANAM and the three hospitals, and each links the Ministry
 * back; the papers are linked through keyPapers. Coordinates are approximate points in Bamako, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MSDS = "https://www.sante.gov.ml";
const RAMU_LAW = "https://extranet.who.int/cpcd/sites/default/files/public_file_repository/MLI_Mali_Loi-No2018-074-portant-institution-du-regime-dassurance-maladie-universelle_2018.pdf";
const RAMU_DECREE = "https://extranet.who.int/cpcd/sites/default/files/public_file_repository/MLI_Mali_Decret-No2022-0018-PT-RM-fixant-les-modaltes-d_application-de-certaines-dispositions-de-la-loi-portant-institution-du-regime-d_assurance-maladie-universelle-2022.pdf";
const MSDS_RAMU = "https://www.sante.gov.ml/index.php?option=com_content&view=article&id=270&catid=10&Itemid=105";
const AFCRN_BAMAKO = "https://afcrn.org/index.php/membership/membership-list/136-malicancerregistry";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/mali";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const HSD_FREE = "https://hsd-fmsb.org/index.php/hsd/article/view/3225";

const institutions: InstitutionInput[] = [
  i({ id: "mali-ministry-of-health", name: "Ministère de la Santé et du Développement Social, Mali", aka: ["MSDS", "Ministry of Health and Social Development, Mali", "Ministère de la Santé Mali"],
    city: "Bamako", country: "ML", lat: 12.64, lng: -8.0, institutionType: "government", website: MSDS,
    tldr: "Mali's health ministry. The medicines regulator (DPM) is one of its directorates, it oversaw the 2026 contracts that extend the universal health insurance scheme run by CANAM, and it runs the national Octobre Rose and Novembre Bleu cancer campaigns.",
    summary: "The Ministère de la Santé et du Développement Social is Mali's ministry for health and social protection. The Direction de la Pharmacie et du Médicament, which examines marketing authorisation dossiers and evaluates clinical trial applications, is a directorate under it; the minister gives final approval of a clinical trial. In July 2026 the minister presided over the signing of delegation contracts between the Caisse Nationale d'Assurance Maladie (CANAM) and the bodies that will help run the Régime d'Assurance Maladie Universelle (RAMU), created by Law 2018-074 of 31 December 2018. The coordinates are an approximate Bamako city point.\n\nIn October 2026 the Ministry launched the fifth national Octobre Rose campaign on breast and cervical cancer, handing thermocoagulation devices for treating precancerous cervical lesions to hospitals in Bamako and giving HPV vaccine to girls aged 10. In November 2026 it launched the second Novembre Bleu campaign on prostate cancer; the minister said 832 men had been screened in the first edition in 2025, against 2,000 expected, and that 43.42% of prostate cancers diagnosed in the urology service of CHU du Point G were already metastatic.",
    programs: ["Régime d'Assurance Maladie Universelle (RAMU), Law 2018-074", "Octobre Rose national campaign (fifth edition, 2026)", "Novembre Bleu national campaign (second edition, 2026)", "Anticancer medicines supplied free to public hospitals"],
    institutions: ["dpm-mali", "canam-mali", "bamako-cancer-registry", "chu-point-g", "chu-gabriel-toure", "hopital-du-mali", "who", "iaea"],
    cancers: ["breast-cancer", "cervical", "prostate"],
    keyPapers: ["paper-schantz-oncology-access-mali-bmc-cancer-2024", "paper-ballo-free-anticancer-drugs-point-g-hsd-2022", "paper-teguete-weekend70-screening-aogs-2021"],
    links: [
      { label: "Ministère de la Santé et du Développement Social", url: MSDS },
      { label: "MSDS: delegation of RAMU management signed (July 2026)", url: MSDS_RAMU },
      { label: "MSDS: Novembre Bleu 2026 launch", url: "https://www.sante.gov.ml/index.php?option=com_content&view=article&id=562&catid=10&Itemid=105" },
      { label: "MSDS: Octobre Rose 2026 launch", url: "https://www.sante.gov.ml/index.php?option=com_content&view=article&id=543&catid=10&Itemid=105" },
    ] }),

  i({ id: "dpm-mali", name: "Direction de la Pharmacie et du Médicament, Mali (DPM)", aka: ["DPM Mali", "Directorate of Pharmacy and Medicine, Mali"],
    city: "Bamako", country: "ML", lat: 12.645, lng: -8.01, institutionType: "government",
    tldr: "Mali's medicines regulator, a directorate of the Ministry of Health rather than a separate agency. It examines marketing authorisation dossiers, runs the essential medicines programme and pharmacovigilance, and evaluates clinical trial applications, which the minister then approves.",
    summary: "The NIH's ClinRegs profile for Mali, last reviewed in January 2026, summarises the decrees that govern the Direction de la Pharmacie et du Médicament: Decree 2011-753 places it under the Ministry of Health and Social Development, led by a director, with three divisions covering regulation of the pharmaceutical profession and marketing authorisation, quality assurance and the economics of medicines, and biomedical analysis laboratories. Its mission includes defining pharmaceutical regulations, examining and monitoring marketing authorisation dossiers, running national essential medicines programmes and pharmacovigilance, and reviewing clinical trial applications after an ethics committee has given its opinion; ClinRegs describes the evaluated application then going to the Minister of Health and Social Development for final approval. The coordinates are an approximate Bamako point.\n\nWHO's list of regulators operating at maturity level 3 or 4, dated August 2026, does not include Mali. Mali signed the treaty establishing the African Medicines Agency on 29 October 2019 and ratified it on 12 May 2020. The Health Sciences and Disease study of 2022 describes the DPM passing validated needs for anticancer medicines from CHU du Point G to the Ministry for purchase from the Pharmacie Populaire du Mali.",
    programs: ["Examination of marketing authorisation (AMM) dossiers", "Evaluation of clinical trial applications", "Pharmacovigilance", "National essential medicines programme"],
    institutions: ["mali-ministry-of-health"],
    links: [
      { label: "NIH ClinRegs: Mali regulatory authority profile (updated January 2026)", url: CLINREGS },
      { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
      { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (PDF)", url: "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf" },
    ] }),

  i({ id: "canam-mali", name: "Caisse Nationale d'Assurance Maladie, Mali (CANAM)", aka: ["CANAM", "National Health Insurance Fund, Mali"],
    city: "Bamako", country: "ML", lat: 12.635, lng: -7.995, institutionType: "government",
    tldr: "Mali's national health insurance fund. By law it manages the universal health insurance scheme (RAMU) created in 2018, which brings together compulsory insurance for formal workers, community mutuals, and free cover for people who are destitute.",
    summary: "Law 2018-074 of 31 December 2018 institutes the Régime d'Assurance Maladie Universelle, a compulsory health insurance scheme for everyone resident in Mali. It has contributory parts (the compulsory health insurance for formal workers, AMO, and people in the informal and farming sectors who join a mutual) and non-contributory parts (people covered by the medical assistance scheme, RAMED, and those entitled to free care by law). The scheme pays part of the cost of care directly, leaving a co-payment to the insured person, and pays the whole cost for people eligible for medical assistance. Article 57 of the law gives its management to the Caisse Nationale d'Assurance Maladie, which may delegate some tasks to other bodies. Decree 2022-0018 of 28 January 2022 limits cover to contracted facilities, bases the list of reimbursed medicines on Mali's national essential medicines list, and leaves co-payment rates to an order of the minister for social protection. The coordinates are an approximate Bamako point.\n\nOn 2 July 2026 CANAM signed delegation contracts with the Agence Nationale d'Assistance Médicale (ANAM) and the Union Technique de la Mutualité (UTM), which joined the Caisse Malienne de Sécurité Sociale and the Institut National de Prévoyance Sociale, already involved in running the AMO. The list of covered services is set by joint order of the ministers for social protection, health and finance; OnCo did not find a published list naming the cancer treatments covered.",
    programs: ["Régime d'Assurance Maladie Universelle (RAMU)", "Assurance Maladie Obligatoire (AMO)"],
    institutions: ["mali-ministry-of-health"],
    links: [
      { label: "Law 2018-074 instituting the RAMU (Journal officiel, via WHO, PDF)", url: RAMU_LAW },
      { label: "Decree 2022-0018/PT-RM applying the RAMU law (Journal officiel, via WHO, PDF)", url: RAMU_DECREE },
      { label: "MSDS: delegation of RAMU management signed (July 2026)", url: MSDS_RAMU },
    ] }),

  i({ id: "bamako-cancer-registry", name: "Registre des cancers du Mali (Bamako cancer registry)", aka: ["Bamako Cancer Registry", "Registre des cancers de Bamako", "Mali Cancer Registry"],
    city: "Bamako", country: "ML", lat: 12.665, lng: -7.99, institutionType: "research-institute", website: AFCRN_BAMAKO,
    tldr: "Mali's population-based cancer registry, created in 1986 and now based in the pathology department of CHU du Point G. It aims to count every cancer among residents of Bamako, has data from 1987, and is a member of the African Cancer Registry Network.",
    summary: "The African Cancer Registry Network's member page for Mali, which is undated, says the Bamako cancer registry was created in 1986 and sits in the pathology department of the national hospital of Point G, aiming to cover the population of the city of Bamako (1,810,366 at the 2009 census). Medical students find cases actively each year in the clinical services of the city's hospitals, pathology reports are abstracted, and death certificates are matched to the database, with unmatched cancer deaths recorded as death certificate only. Coding is in ICD-O-3 and the registry used CanReg-4. The page says it had no running costs other than those carried by the pathology department. The coordinates are an approximate point for the Point G hospital.\n\nIts data from 1987 to 2015 showed liver cancer incidence falling steadily in Bamako, and it contributed cases diagnosed from 2005 to 2014 to IARC's SURVCAN-3 study of cancer survival in sub-Saharan Africa. IARC's GLOBOCAN 2024 fact sheet gives a subnational registry as Mali's incidence source, applying its rates to the national population.",
    programs: ["Population-based cancer registration for Bamako (from 1986)", "African Cancer Registry Network member registry"],
    institutions: ["chu-point-g", "mali-ministry-of-health", "iarc"], cancers: ["hcc", "cervical", "breast-cancer"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-amadou-bamako-liver-cancer-trends-wjh-2022", "paper-joko-fru-survcan3-lancet-gh-2024"],
    links: [
      { label: "African Cancer Registry Network: Mali, Registre des cancers du Mali", url: AFCRN_BAMAKO },
      doi("10.4254/wjh.v14.i9.1767", "Amadou et al., liver cancer incidence in Bamako 1987 to 2015 (World J Hepatol 2022)"),
    ] }),

  i({ id: "chu-point-g", name: "Centre Hospitalier Universitaire du Point G, Bamako", aka: ["CHU du Point G", "Point G University Hospital", "Hôpital du Point G"],
    city: "Bamako", country: "ML", lat: 12.665, lng: -7.99, institutionType: "hospital",
    tldr: "A public university hospital in Bamako with a medical oncology service that grew out of its haemato-oncology department. It hosts the national cancer registry and the main pathology laboratory, and dispenses free anticancer medicines supplied by the state.",
    summary: "The African Cancer Registry Network's undated page on the Bamako registry describes CHU du Point G as a university hospital with all specialities, including medical oncology developed from haemato-oncology, and its pathology laboratory as the main one in the country, doing most of the pathology work for Bamako and beyond. The cancer registry sits in its pathology department. The coordinates are an approximate point for the hospital.\n\nA study by its hospital pharmacy of 1,490 prescriptions for 301 patients from January to June 2019 found that FOLFOX, AC and paclitaxel with carboplatin were the most prescribed regimens, that on average 63.64% of the anticancer medicines were available, and that eight medicines ran out of stock, for up to 120 days. The authors describe the state supplying anticancer medicines worth 285 million CFA francs a year so that chemotherapy is free. In November 2026 the Minister of Health said that 43.42% of prostate cancers diagnosed in its urology service were already metastatic.",
    programs: ["Medical oncology and haemato-oncology", "Pathology", "Free chemotherapy with state-supplied anticancer medicines", "Host of the Bamako cancer registry"],
    institutions: ["mali-ministry-of-health", "bamako-cancer-registry"],
    cancers: ["breast-cancer", "colorectal", "prostate"],
    keyPapers: ["paper-ballo-free-anticancer-drugs-point-g-hsd-2022"],
    links: [
      { label: "African Cancer Registry Network: Mali registry page (hospitals in the registration area)", url: AFCRN_BAMAKO },
      { label: "Ballo et al., free anticancer medicines at CHU du Point G (Health Sci Dis 2022)", url: HSD_FREE },
    ] }),

  i({ id: "chu-gabriel-toure", name: "Centre Hospitalier Universitaire Gabriel Touré, Bamako", aka: ["CHU Gabriel Touré", "Gabriel Touré Teaching Hospital", "Hôpital Gabriel Touré"],
    city: "Bamako", country: "ML", lat: 12.65, lng: -8.0, institutionType: "hospital",
    tldr: "A public university hospital in central Bamako with a paediatric oncology unit and a hospital-based cancer registry, from which a 2026 study followed more than 3,000 women with cervical cancer.",
    summary: "The African Cancer Registry Network's page on the Bamako registry lists CHU Gabriel Touré as a university hospital with all specialities, including paediatric oncology. Its paediatric oncology unit, with the Institute of African Tropical Ophthalmology, treated 88 children with early retinoblastoma from 2011 to 2015 following the French-African Paediatric Oncology Group's guidelines, with 73% alive at four years. The coordinates are an approximate point in central Bamako.\n\nA 2026 study drew on the hospital-based cancer registry to follow 3,083 women with invasive cervical cancer diagnosed there from 2003 to 2024: 60.1% presented at FIGO stage IV, 47.1% received palliative care only, and median overall survival was 15.5 months.",
    programs: ["Paediatric oncology", "Cervical cancer care (2003 to 2024 cohort)", "Hospital-based cancer registry"],
    institutions: ["mali-ministry-of-health"],
    cancers: ["cervical", "childhood-cancers"],
    keyPapers: ["paper-tounkara-cervical-survival-gabriel-toure-ogi-2026"],
    links: [
      { label: "African Cancer Registry Network: Mali registry page (hospitals in the registration area)", url: AFCRN_BAMAKO },
      doi("10.1155/ogi/9966827", "Tounkara et al., cervical cancer survival at Gabriel Touré 2003 to 2024 (Obstet Gynecol Int 2026)"),
      doi("10.1002/pbc.27101", "Traoré et al., retinoblastoma treatment in Bamako (Pediatr Blood Cancer 2018)"),
    ] }),

  i({ id: "hopital-du-mali", name: "Hôpital du Mali, Bamako", aka: ["Hôpital du Mali Radiotherapy Center", "Hospital of Mali"],
    city: "Bamako", country: "ML", lat: 12.61, lng: -7.93, institutionType: "hospital",
    tldr: "A public hospital in Bamako with the one radiotherapy centre that IAEA's directory lists in Mali, with two linear accelerators; for years it had one, which broke down 198 times between 2014 and 2021.",
    summary: "IAEA DIRAC's public equipment data, read on 11 November 2026 with the entry updated in 2026, lists the Hôpital du Mali Radiotherapy Center in Bamako, the one centre it lists for Mali, with two linear accelerators, no brachytherapy unit and one CT scanner. The African Cancer Registry Network's undated page describes it as a hospital of about 100 beds with surgery, gynaecology and radiotherapy since 2012, mainly for cervical cancer. The coordinates are an approximate point on the right bank of Bamako.\n\nA 2022 study in Santé Publique, written when Mali had one radiotherapy machine, found from hospital registers that it broke down 198 times between 3 April 2014 and 24 September 2021, more than 54 weeks of cumulative downtime, and that the average wait for a radiotherapy appointment was 3 to 6 months.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)"],
    institutions: ["mali-ministry-of-health", "iaea"],
    cancers: ["cervical", "breast-cancer"],
    keyPapers: ["paper-schantz-hopital-du-mali-linac-sante-publique-2022"],
    links: [
      { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
      doi("10.3917/spub.223.0425", "Schantz et al., maintaining the linear accelerator at Hôpital du Mali (Santé Publique 2022)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-amadou-bamako-liver-cancer-trends-wjh-2022", name: "Decrease in liver cancer incidence rates in Bamako, Mali over 28 years of population-based cancer registration (1987 to 2015)",
    journal: "World Journal of Hepatology", year: 2022, doi: "10.4254/wjh.v14.i9.1767", pmid: "36185725", authors: "Amadou A, Sighoko D, Coulibaly B, et al.", paperType: "observational",
    tldr: "Bamako's population-based registry shows primary liver cancer incidence falling by more than half from 1987 to 2015, in both men and women, the first such decrease reported in a high-incidence area of Africa.",
    summary: "An analysis of 28 years of data from the Bamako cancer registry, split into 1987 to 1996, 1997 to 2006 and 2007 to 2015, with world age-standardised rates, incidence rate ratios and joinpoint regression for annual percentage change.",
    findings: ["In men, age-standardised incidence fell from 19.41 to 13.12 to 8.15 per 100,000 person-years across the three periods (rate ratio 0.42, annual change -4.59%).", "In women it fell from 7.02 in 1987 to 1996 to 2.57 per 100,000 in 2007 to 2015 (rate ratio 0.37, annual change -5.63%).", "The authors judged that the trend did not appear to result from biases or changes in registration practice."],
    whatItMeans: "Liver cancer, long one of the commonest cancers in West Africa, has become less common in Bamako; the authors suggest a more varied diet with less aflatoxin exposure may explain part of it.",
    caveats: ["The dietary explanation is the authors' hypothesis, not tested in the study.", "Bamako only; the study does not cover the rest of Mali."],
    cancers: ["hcc"], institutions: ["bamako-cancer-registry"], links: [doi("10.4254/wjh.v14.i9.1767", "DOI"), pubmed("36185725")] }),

  p({ id: "paper-joko-fru-survcan3-lancet-gh-2024", name: "Cancer survival in sub-Saharan Africa (SURVCAN-3): a population-based study",
    journal: "The Lancet Global Health", year: 2024, doi: "10.1016/S2214-109X(24)00130-X", pmid: "38762297", authors: "Joko-Fru WY, Bardot A, Bukirwa P, et al.", paperType: "observational", participants: 10500,
    tldr: "IARC's study of 10,500 people with cancer in 13 African population-based registries, including Bamako, found 3-year net survival of 52.3% for cervical cancer, 18.1% for liver cancer and 32.4% for lung cancer.",
    summary: "Survival for 18 cancers in patients diagnosed from 2005 to 2014 in 13 registries of the African Cancer Registry Network across 11 countries, including Bamako in Mali, followed to the end of 2018.",
    findings: ["10,500 patients were included; 87.4% of cases were morphologically verified.", "3-year age-standardised net survival was 52.3% for cervical cancer, 18.1% for liver cancer and 32.4% for lung cancer.", "Fewer than half of patients were alive 3 years after diagnosis for eight cancer types."],
    whatItMeans: "Survival from cancers that can be prevented or found early is poor across the region, which argues for prevention and earlier diagnosis.",
    caveats: ["Pooled across registries; the abstract does not give figures for Bamako alone."],
    cancers: ["cervical", "hcc"], links: [doi("10.1016/S2214-109X(24)00130-X", "DOI"), pubmed("38762297")] }),

  p({ id: "paper-teguete-weekend70-screening-aogs-2021", name: "A population-based combination strategy to improve the cervical cancer screening coverage rate in Bamako, Mali",
    journal: "Acta Obstetricia et Gynecologica Scandinavica", year: 2021, doi: "10.1111/aogs.14119", pmid: "33560520", authors: "Téguété I, Tounkara FK, Diawara B, et al.", paperType: "observational", participants: 289924,
    tldr: "Bamako's Weekend70 programme of free weekend screening and awareness raising screened 289,924 women from 2016 to 2020, raising weekly numbers from under 800 to a peak of 4,100 and reaching an estimated 47.3% coverage of women aged 20 and over.",
    summary: "Operational research from 1 January 2016 to 31 July 2020 on a multi-component strategy (awareness raising, stronger screening practice in health facilities and free cervical screening at weekends) to raise cervical screening among women aged 15 and over in Bamako.",
    findings: ["289,924 women were screened, 91.9% of them Bamako residents.", "Participation rose from fewer than 800 women a week before the programme to a peak of 4,100 a week.", "Estimated coverage at the end was 47.3% of women aged 20 and over and 56.9% in WHO's target population."],
    whatItMeans: "Free weekend screening with community awareness raised cervical screening sharply in a poor city, where the authors note coverage across French-speaking Africa is below 2%.",
    caveats: ["Coverage was estimated from numbers screened over national demographic data, not from a population survey."],
    cancers: ["cervical"], links: [doi("10.1111/aogs.14119", "DOI"), pubmed("33560520")] }),

  p({ id: "paper-schantz-hopital-du-mali-linac-sante-publique-2022", name: "Radiotherapy and cancer control: the challenge of maintaining the only linear accelerator at Hôpital du Mali",
    journal: "Santé Publique", year: 2022, doi: "10.3917/spub.223.0425", pmid: "36575124", authors: "Schantz C, Diarra I, Traoré A, et al.", paperType: "observational",
    tldr: "Mali's single radiotherapy machine at Hôpital du Mali broke down 198 times between April 2014 and September 2021, more than 54 weeks of downtime in all, and patients waited 3 to 6 months on average for an appointment.",
    summary: "A study tracing the history and functioning of what was then Mali's only radiotherapy machine, from interviews with patient associations and health professionals in Bamako and data from medical registers and institutional reports.",
    findings: ["The machine had 198 breakdowns between 3 April 2014 and 24 September 2021, more than 54 weeks of cumulative downtime.", "The average wait for a radiotherapy appointment was 3 to 6 months."],
    whatItMeans: "For a country with one machine, every breakdown stops radiotherapy for everyone; the authors argue that cancer treatment capacity should be a public health priority within universal health coverage reform.",
    caveats: ["Describes the period before a second linear accelerator was listed by IAEA DIRAC."],
    cancers: ["cervical"], institutions: ["hopital-du-mali"], links: [doi("10.3917/spub.223.0425", "DOI"), pubmed("36575124")] }),

  p({ id: "paper-tounkara-cervical-survival-gabriel-toure-ogi-2026", name: "Cervical cancer survival in Mali: a 21-year retrospective cohort at Gabriel Touré Teaching Hospital (2003 to 2024)",
    journal: "Obstetrics and Gynecology International", year: 2026, doi: "10.1155/ogi/9966827", pmid: "42757161", authors: "Tounkara FK, Sissoko A, Traoré M, et al.", paperType: "observational", participants: 3083,
    tldr: "Of 3,083 women with invasive cervical cancer at a Bamako teaching hospital, 60.1% arrived at stage IV, nearly half received palliative care only, and median survival was 15.5 months.",
    summary: "A retrospective cohort from the hospital-based cancer registry of Gabriel Touré Teaching Hospital, of women with histologically confirmed invasive cervical cancer diagnosed from January 2003 to December 2024, with Kaplan-Meier survival and Cox models for predictors of death.",
    findings: ["Median overall survival was 15.5 months (95% CI 14.3 to 17.1).", "Survival was 82.4%, 65.8% and 52.1% at 6, 12 and 24 months.", "60.1% presented with FIGO stage IV disease and 47.1% received palliative care only.", "Radiotherapy, chemotherapy, both, or multimodal treatment were each associated with lower mortality than palliative care."],
    whatItMeans: "Most women with cervical cancer in Mali are diagnosed too late for cure, so screening and earlier access to treatment matter most.",
    caveats: ["One referral hospital; overall survival counts deaths from any cause and includes women lost to follow-up at last contact."],
    cancers: ["cervical"], institutions: ["chu-gabriel-toure"], links: [doi("10.1155/ogi/9966827", "DOI"), pubmed("42757161")] }),

  p({ id: "paper-schantz-oncology-access-mali-bmc-cancer-2024", name: "Access to oncology care in Mali: a qualitative study on breast cancer",
    journal: "BMC Cancer", year: 2024, doi: "10.1186/s12885-024-11825-6", pmid: "38225594", authors: "Schantz C, Coulibaly A, Traoré A, et al.", paperType: "observational", participants: 38,
    tldr: "Interviews with doctors, women with breast cancer and associations in Mali found access to cancer care held back by equipment failures, strikes in university hospitals, incomplete free care, missing medicines and the security crisis since 2012.",
    summary: "Thirty-eight semi-structured interviews (10 health professionals, 25 women with breast cancer, 3 association representatives) and 40 observations in an oncology unit in Bamako, analysed with Levesque's framework on access to care.",
    findings: ["Barriers included technical platform failures, repeated strikes in university hospitals, incomplete free health care and unavailable medicines, made worse by the security crisis since 2012.", "Care was centralised and fragmented in Bamako, with few specialist doctors and limited screening.", "Women described debt, and some wanted to leave Mali for treatment."],
    whatItMeans: "Getting to cancer care in Mali depends on more than free medicines: equipment, staff, information and money for everything else all matter.",
    caveats: ["Qualitative, with observations in one Bamako oncology unit; not a measure of how common each barrier is."],
    cancers: ["breast-cancer"], links: [doi("10.1186/s12885-024-11825-6", "DOI"), pubmed("38225594")] }),

  p({ id: "paper-ballo-free-anticancer-drugs-point-g-hsd-2022", name: "Free anticancer drugs in Mali: factors limiting availability at the University Teaching Hospital Point G",
    journal: "Health Sciences and Disease", year: 2022, authors: "Ballo M, Guindo AA, Traoré MS, et al.", paperType: "observational", participants: 301,
    tldr: "At CHU du Point G in the first half of 2019, on average 63.64% of the anticancer medicines meant to be free were available, eight ran out for up to 120 days, and wasted medicine was valued at about 11.1 million CFA francs.",
    summary: "A cross-sectional study at the hospital pharmacy of CHU du Point G of 1,490 prescriptions for 301 patients from 1 January to 30 June 2019, measuring prescribing, wastage and stock-outs of anticancer medicines that the state supplies so that chemotherapy is free.",
    findings: ["31 regimens using 22 medicines were prescribed; FOLFOX (208), AC (188) and paclitaxel with carboplatin (179) were the commonest.", "The average share of anticancer medicines available was 63.64%; eight medicines ran out, for between 20 and 120 days.", "Wasted medicine was valued at 11,148,890 CFA francs, mostly fluorouracil, docetaxel and paclitaxel."],
    whatItMeans: "Free chemotherapy only helps when the medicines are on the shelf; pooling preparations for patients on the same regimen could stretch stock further.",
    caveats: ["One hospital, six months, 2019.", "The 285 million CFA franc annual figure for state supply is cited from an undated Ministry of Health news item consulted in October 2021, not measured in the study; that page no longer opens."],
    cancers: ["breast-cancer", "colorectal"], institutions: ["chu-point-g"], links: [{ label: "Health Sciences and Disease, vol 23 no 1 (2022)", url: HSD_FREE }] }),
];

/** Records behind /countries/ml/ (wave 11). */
export const recordsML: EntityInput[] = [...institutions, ...papers];
