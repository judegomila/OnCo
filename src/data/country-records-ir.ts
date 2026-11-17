import type { CompanyInput, EntityInput, InstitutionInput, PaperInput, TrialInput } from "@/lib/schema";

/**
 * Iran: the institutions, companies, trials and papers behind /countries/ir/ that the corpus did not hold.
 *
 * Iranian government and company websites (behdasht.gov.ir, fda.gov.ir, ihio.gov.ir, tamin.ir, cinnagen.com,
 * aryogen.com, irct.behdasht.gov.ir) did not answer from here on 4 November 2026, so institution and company facts
 * were read in Persian from dated Internet Archive copies of their own pages, named in each record's links. DOIs and
 * PubMed ids were resolved through Europe PMC the same day and the figures in `findings` come from the indexed
 * abstract or, where Europe PMC holds the open-access text, from the paper itself. Registry ids, sponsors, dates and
 * site lists were read from the ClinicalTrials.gov API v2 the same day.
 *
 * Coordinates for the four Tehran government bodies are Tehran's city centroid, not the buildings.
 *
 * Inbound links: the ministry, regulator and two insurers link to each other; the papers are linked from the
 * institutions' and companies' keyPapers and from the trials; the trials from their papers and companies; the two
 * companies from each other and from their trials.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type C = Omit<CompanyInput, "kind" | "asOf">;
const c = (x: C): CompanyInput => ({ kind: "company", asOf, ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
const ctgov = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

const TEHRAN = { city: "Tehran", country: "IR", lat: 35.6892, lng: 51.389 } as const;

const WB_MOHME_ED = "https://web.archive.org/web/20240329151731/https://behdasht.gov.ir/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1-%D8%A7%D8%AE%D8%AA%D8%B5%D8%A7%D8%B5%DB%8C/%D8%A7%D8%AC%D8%B1%D8%A7%DB%8C-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86-%D9%88-%DA%A9%D8%B4%D9%88%D8%B1%DB%8C-%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D8%AA%D8%B4%D8%AE%DB%8C%D8%B5-%D8%B2%D9%88%D8%AF%D8%B1%D8%B3-%D8%B3%D8%B1%D8%B7%D8%A7%D9%86-%D9%87%D8%A7%DB%8C-%D8%B4%D8%A7%DB%8C%D8%B9%E2%81%84-%D8%B2%D9%86%D8%A7%D9%86-%D8%A8%D8%A7%D9%84%D8%A7%DB%8C-50-%D8%B3%D8%A7%D9%84-%D8%BA%D8%B1%D8%A8%D8%A7%D9%84%DA%AF%D8%B1%DB%8C-%D9%BE%D9%88%DA%A9%DB%8C-%D8%A7%D8%B3%D8%AA%D8%AE%D9%88%D8%A7%D9%86-%D9%85%DB%8C-%D8%B4%D9%88%D9%86%D8%AF";
const WB_IFDA_HISTORY = "https://web.archive.org/web/20210418231548/https://www.fda.gov.ir/en/%D8%A7%D8%AF%D8%A7%D8%B1%D8%A7%D8%AA-%D9%88-%D8%AF%D9%81%D8%A7%D8%AA%D8%B1/%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE%DA%86%D9%87-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86";
const WB_IHIO_SPECIAL = "https://web.archive.org/web/20210423164130/https://ihio.gov.ir/%D9%BE%D9%88%D8%B4%D8%B4-%D8%A8%DB%8C%D9%85%D9%87/%D8%B5%D9%86%D8%AF%D9%88%D9%82%D9%87%D8%A7-%D9%88-%D9%BE%D9%88%D8%B4%D8%B4%D9%87%D8%A7%DB%8C-%D8%A8%DB%8C%D9%85%D9%87-%D8%A7%DB%8C/%D9%BE%D9%88%D8%B4%D8%B4-%D8%A8%DB%8C%D9%85%D9%87-%D8%A7%DB%8C-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%A7%D9%86-%D8%AE%D8%A7%D8%B5";
const WB_IHIO_NEWS = "https://web.archive.org/web/20230611020801/https://ihio.gov.ir/%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D9%87-%D8%AE%D8%A8%D8%B1/ArticleId/29182/%D8%B3%DB%8C%20%D8%AF%D8%B1%D8%B5%D8%AF%20%D8%A7%D8%B2%20%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%A7%D9%86%20%D8%AE%D8%A7%D8%B5%20%D9%88%20%D8%B5%D8%B9%D8%A8%E2%80%8C%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D8%AC%20%D8%A7%D8%B2%20%D8%A8%D8%B3%D8%AA%D9%87%E2%80%8C%D9%87%D8%A7%DB%8C%20%D8%AD%D9%85%D8%A7%DB%8C%D8%AA%DB%8C%20%D8%A8%DB%8C%D9%85%D9%87%20%D8%B3%D9%84%D8%A7%D9%85%D8%AA%20%D8%A8%D9%87%D8%B1%D9%87%E2%80%8C%D9%85%D9%86%D8%AF%20%D8%B4%D8%AF%D9%86%D8%AF";
const WB_TAMIN = "https://web.archive.org/web/20260911105119/https://tamin.ir/";
const WB_CINNAGEN = "https://web.archive.org/web/20260930035205/https://www.cinnagen.com/about-us/";
const WB_ARYOGEN_ABOUT = "https://web.archive.org/web/20250517191056/https://www.aryogen.com/about/";
const WB_ARYOGEN_PRODUCTS = "https://web.archive.org/web/20260214201350/https://www.aryogen.com/%D9%85%D8%AD%D8%B5%D9%88%D9%84%D8%A7%D8%AA-%D9%85%D8%A7/";

const institutions: InstitutionInput[] = [
  i({ id: "iran-mohme", name: "Ministry of Health and Medical Education of Iran", aka: ["MOHME", "MoHME", "وزارت بهداشت، درمان و آموزش پزشکی", "Iranian Ministry of Health"],
    ...TEHRAN, institutionType: "government", website: "https://behdasht.gov.ir",
    tldr: "Iran's health ministry, which is also responsible for medical education. The country's medical universities manage the national cancer registry under it, and it runs the free early detection programmes for bowel and breast cancer.",
    summary: "The Ministry of Health and Medical Education was established in 1985, replacing the earlier health ministry, in part to answer a lack of integration between medical schools and the community, according to a 2021 policy analysis of Iran's insurance system. Its own website lists among its deputy ministries one for food and medicines, and among its affiliated organisations the Iran Health Insurance Organization.\n\nCancer counting sits with it. A 2024 analysis of the 2016 data describes the Iranian National Population-based Cancer Registry as managed by all 60 medical universities under the ministry, covering 31 provinces and following the standard protocols of the International Agency for Research on Cancer and the International Association of Cancer Registries, with pathology reports and hospital clinical data as sources; the 2014 report says it covered 30 of 31 provinces, 98% of the population.\n\nIn a ministry news item dated 22 Shahrivar 1402 (13 September 2023), read in Persian from an Internet Archive copy, the director-general of the ministry's office for non-communicable disease management, Dr Kourosh Etemad, said that early detection programmes for the two common cancers, colorectal and breast, are carried out free of charge across the whole country, with a simple first test for bowel cancer offered at comprehensive health service centres to attendees over 40 and positive results referred to hospitals. The ministry's own site did not answer from here on 4 November 2026.",
    programs: ["Iranian National Population-based Cancer Registry (with the universities of medical sciences)", "Office for non-communicable disease management: free early detection of colorectal and breast cancer", "Iran's Package of Essential Non-communicable Disease Interventions (IraPEN) in primary care", "Iranian Registry of Clinical Trials (set up with the ministry's help)"],
    cancers: ["colorectal", "breast-cancer", "gastric", "esophageal"], technologies: ["cancer-registries-surveillance", "colorectal-screening"],
    institutions: ["iran-fda", "iran-health-insurance-organization", "tehran-cancer-institute"],
    keyPapers: ["paper-inpcr-2014-roshandel-cancer-epidemiol-2019", "paper-inpcr-2016-hadavandsiri-cancer-rep-2024", "paper-iran-colorectal-screening-hassanlouei-mjiri-2022", "paper-golestan-opium-cancer-lancet-glob-health-2020"],
    notes: ["Coordinates are Tehran's city centroid.", "behdasht.gov.ir did not answer on 4 November 2026; the 13 September 2023 news item was read from an Internet Archive copy of 29 March 2024."],
    links: [
      { label: "Ministry of Health: free national early detection of common cancers (Persian, 13 September 2023; Internet Archive copy of 29 March 2024)", url: WB_MOHME_ED },
      doi("10.1002/cnr2.1967", "Hadavandsiri et al., cancer incidence in Iran in 2016 (Cancer Rep 2024)"),
      doi("10.1016/j.canep.2019.05.009", "Roshandel et al., cancer incidence in Iran in 2014 (Cancer Epidemiol 2019)"),
      doi("10.1186/s12939-020-01372-4", "Doshmangir et al., Iran health insurance system in transition (Int J Equity Health 2021)"),
    ] }),

  i({ id: "iran-fda", name: "Iran Food and Drug Administration (IFDA)", aka: ["IFDA", "سازمان غذا و دارو", "Food and Drug Organization of Iran", "Iranian Food and Drug Administration"],
    ...TEHRAN, institutionType: "government", website: "https://www.fda.gov.ir",
    tldr: "Iran's medicines and food regulator, part of the Ministry of Health. It keeps the country's official medicines list and approves new medicines, which a 2024 study found reached Iran years after the United States and Europe.",
    summary: "The Iran Food and Drug Administration, in Persian Sazman-e Ghaza va Daru, is the health ministry's food and medicines arm. Its own history page, read in Persian from an Internet Archive copy of 18 April 2021, says a pharmaceutical deputy ministry was formed in 1352 (1973 to 1974), a body called the Food and Drug Organization existed for one year from 1355, and the present organisation was formed in 1389 (2010 to 2011) with the approval of the Supreme Administrative Council. The same site lists offices for health technology assessment and economic studies, rational use of medicines, tariffs and pharmaceutical care standards, and pharmacovigilance, and publishes the country's official medicines list.\n\nA 2024 study of new molecular entities from 2001 to 2021 found that 148 of the 710 approved by the US Food and Drug Administration had also been approved by the Iranian regulator, and that for cancer and immune medicines (ATC group L) the mean lag behind approval in the United States was 77.2 months, behind the European Medicines Agency 63.96 months and behind Japan's agency 57.93 months. Policies the regulator applied during the 2012 sanctions crisis included facilitating domestic manufacture and reducing the market share of imported medicines, according to a 2019 study based on interviews with experts and managers in the regulatory system. fda.gov.ir did not answer from here on 4 November 2026.",
    programs: ["Medicine registration and the official national medicines list", "Health technology assessment and economic studies office", "Pharmacovigilance and adverse drug reactions office", "Tariffs and pharmaceutical care standards"],
    drugs: ["trastuzumab", "bevacizumab", "pertuzumab", "rituximab"], technologies: ["biosimilar-manufacturing"], terms: ["biosimilar"],
    institutions: ["iran-mohme"], companies: ["cinnagen", "aryogen-pharmed"], keyPapers: ["paper-ifda-drug-lag-alipour-medicine-2024", "paper-sanctions-cancer-care-iran-haghjou-2024"],
    notes: ["Coordinates are Tehran's city centroid.", "Read from an Internet Archive copy of the history page dated 18 April 2021; the live site did not answer on 4 November 2026."],
    links: [
      { label: "IFDA: history of the organisation (Persian; Internet Archive copy of 18 April 2021)", url: WB_IFDA_HISTORY },
      doi("10.1097/MD.0000000000038142", "Alipour et al., drug lag at the IFDA 2001 to 2021 (Medicine 2024)"),
      doi("10.1007/s40199-019-00259-2", "Yousefi et al., IFDA policies for medicines in shortage (Daru 2019)"),
    ] }),

  i({ id: "iran-health-insurance-organization", name: "Iran Health Insurance Organization (IHIO)", aka: ["IHIO", "سازمان بیمه سلامت ایران", "Bimeh Salamat", "Iran Health Insurance Organisation"],
    ...TEHRAN, institutionType: "government", website: "https://ihio.gov.ir",
    tldr: "A public health insurer affiliated with Iran's health ministry, which covers government employees, rural residents and people without other insurance, and has a fund for special and hard-to-treat diseases in which cancer is among the costliest conditions.",
    summary: "The Iran Health Insurance Organization is the public insurer affiliated with the Ministry of Health. A 2021 policy analysis lists its five funds: government employees, the self-employed, rural residents (and towns under 20,000 people), the universal insurance coverage fund created in 2014 under the Health Transformation Plan for people with no insurance, and other groups such as students and people with disabilities; it gives 2018 membership of 5,413,088 for government employees, 19,969,227 for rural residents, 14,441,544 for universal coverage and 1,438,973 for other groups.\n\nIts own page on insurance for special patients, read in Persian from an Internet Archive copy of 23 April 2021, defines special patients as people with haemophilia, thalassaemia, multiple sclerosis, haemodialysis, kidney transplant and peritoneal dialysis, who receive free cover; cancer is not on that list. A news item it published on 27 Farvardin 1402 (16 April 2023), read the same way, quotes its director-general of specialised services: about 665,000 people carry a marker for a special or hard-to-treat disease, 30% of them had used the matching package, the commonest markers are diabetes, hypertension, cancer, multiple sclerosis and dialysis, and cancer is among the conditions with the highest spending in the special and hard-to-treat diseases fund, whose benefits follow a package issued by the Ministry of Health. ihio.gov.ir did not answer from here on 4 November 2026.",
    programs: ["Government employees fund", "Rural residents fund", "Universal insurance coverage fund (from 2014)", "Special and hard-to-treat diseases fund"],
    institutions: ["iran-mohme", "iran-social-security-organization"],
    notes: ["Coordinates are Tehran's city centroid.", "Read from Internet Archive copies dated 23 April 2021 and 11 June 2023."],
    links: [
      { label: "IHIO: insurance cover for special patients (Persian; Internet Archive copy of 23 April 2021)", url: WB_IHIO_SPECIAL },
      { label: "IHIO news: 30% of special and hard-to-treat patients used their packages (Persian, 16 April 2023; Internet Archive copy)", url: WB_IHIO_NEWS },
      doi("10.1186/s12939-020-01372-4", "Doshmangir et al., Iran health insurance system in transition (Int J Equity Health 2021)"),
    ] }),

  i({ id: "iran-social-security-organization", name: "Social Security Organization of Iran (Tamin Ejtemaei)", aka: ["SSO", "سازمان تامین اجتماعی", "Tamin Ejtemaei", "Social Security Organisation of Iran"],
    ...TEHRAN, institutionType: "government", website: "https://www.tamin.ir",
    tldr: "Iran's social insurance fund for private-sector workers and the self-employed who contribute. It covered about 43 million people in 2019 and runs hospitals of its own.",
    summary: "The Social Security Organization was established in 1975 after the Social Security Act and became directly responsible for health care for workers after the 1989 Obligation Law, according to a 2021 policy analysis of Iran's insurance system. The same analysis describes it as a non-governmental organisation covering employees of the formal private sector, the self-employed and voluntary contributors, with 43,475,548 people covered in 2019, and a contribution of 30% of wages of which 9 points fund the health benefits package. Its own website, read from an Internet Archive copy of 11 September 2026, links to its provincial and hospital sites and an appointments system for its own medical centres. Like the other basic insurers it works under the regulations of the High Council of Health Insurance. tamin.ir did not answer from here on 4 November 2026.",
    programs: ["Health insurance for formal private-sector employees and contributors", "Own hospitals and medical centres"],
    institutions: ["iran-health-insurance-organization", "iran-mohme"],
    notes: ["Coordinates are Tehran's city centroid.", "Read from an Internet Archive copy of 11 September 2026."],
    links: [
      { label: "Social Security Organization (Persian; Internet Archive copy of 11 September 2026)", url: WB_TAMIN },
      doi("10.1186/s12939-020-01372-4", "Doshmangir et al., Iran health insurance system in transition (Int J Equity Health 2021)"),
    ] }),
];

const companies: CompanyInput[] = [
  c({ id: "cinnagen", name: "CinnaGen", aka: ["CinnaGen Co.", "Cinnagen", "سیناژن", "CinnaGen Pharmaceutical Group"], hq: "Tehran", country: "IR", companyType: "biotech", website: "https://www.cinnagen.com",
    tldr: "An Iranian maker of biological medicines, including copies of cancer antibodies, whose own pertuzumab copy matched the original in a phase 3 breast cancer trial.",
    summary: "CinnaGen describes itself as a biopharmaceutical company with a head office in Shahrak-e Gharb, Tehran, and a manufacturing site in the Simin Dasht industrial area of Karaj, with product lines including oncology and haematology and pages on biosimilars and clinical trials. Its site, read from an Internet Archive copy of 30 September 2026, lists AryoGen among its family of companies.\n\nIt sponsored the phase 3 equivalence trial of P013, its proposed pertuzumab biosimilar (NCT04957212, also registered in the Iranian Registry of Clinical Trials as IRCT20150303021315N11), in which 214 women with HER2-positive breast cancer were randomised to P013 or the originator Perjeta with trastuzumab, carboplatin and docetaxel before surgery; breast pathological complete response was 67.62% against 71.57%, within the equivalence margin. cinnagen.com did not answer from here on 4 November 2026.",
    drugs: ["pertuzumab"], cancers: ["breast-her2-positive"], technologies: ["biosimilar-manufacturing"], terms: ["biosimilar"],
    companies: ["aryogen-pharmed"], trials: ["nct04957212"], keyPapers: ["paper-p013-pertuzumab-biosimilar-bmc-cancer-2022"],
    links: [
      { label: "CinnaGen: about us (Internet Archive copy of 30 September 2026)", url: WB_CINNAGEN },
      ctgov("NCT04957212"),
      doi("10.1186/s12885-022-09895-5", "Allahyari et al., P013 pertuzumab biosimilar (BMC Cancer 2022)"),
    ] }),

  c({ id: "aryogen-pharmed", name: "AryoGen Pharmed", aka: ["AryoGen", "AryoGen Pharmed Co.", "آریوژن فارمد"], hq: "Tehran to Karaj road, km 24", country: "IR", companyType: "biotech", website: "https://www.aryogen.com",
    tldr: "An Iranian company in the CinnaGen group that makes copies of the cancer antibodies trastuzumab, bevacizumab and rituximab for patients in Iran.",
    summary: "AryoGen Pharmed's own about page, read in Persian from an Internet Archive copy of 17 May 2025, says the company was founded in 1389 in the Iranian calendar (2010 to 2011) to combine pharmacy with biotechnology, and gives its mission as producing biosimilars to maintain and improve people's quality of life; its research section names meeting the medicine needs of patients with hard-to-treat diseases in Iran and localising every stage of production among its aims. Its products page (Internet Archive copy of 14 February 2026) lists Zytux (rituximab), AryoTrust (trastuzumab), Stivant (bevacizumab), Arylia and Artenix (denosumab) among others, and places the company in the CinnaGen pharmaceutical group.\n\nIt sponsored the phase 3 trial that found its bevacizumab, tested as BE1040V and registered as Stivant, non-inferior to the originator with FOLFIRI-3 chemotherapy in 126 patients with metastatic colorectal cancer at 22 Iranian sites (NCT03288987), and a post-marketing safety study of AryoTrust in 597 women given it after surgery for HER2-positive breast cancer (NCT06021379). aryogen.com did not answer from here on 4 November 2026.",
    drugs: ["trastuzumab", "bevacizumab", "rituximab"], cancers: ["colorectal", "breast-her2-positive"], technologies: ["biosimilar-manufacturing"], terms: ["biosimilar"],
    companies: ["cinnagen"], trials: ["nct03288987", "nct06021379"], keyPapers: ["paper-be1040v-bevacizumab-biosimilar-clin-ther-2020", "paper-aryotrust-trastuzumab-pms-2024"],
    links: [
      { label: "AryoGen Pharmed: overview (Persian; Internet Archive copy of 17 May 2025)", url: WB_ARYOGEN_ABOUT },
      { label: "AryoGen Pharmed: our products (Persian; Internet Archive copy of 14 February 2026)", url: WB_ARYOGEN_PRODUCTS },
      ctgov("NCT03288987"),
      ctgov("NCT06021379"),
    ] }),
];

const trials: TrialInput[] = [
  t({ id: "nct03288987", name: "Stivant (AryoGen bevacizumab) against Avastin in metastatic colorectal cancer", aka: ["BE1040V phase 3", "BEV.ARY.HR.94 (III)"], nct: "NCT03288987", phase: "3", design: "non-inferiority", status: "completed",
    setting: "Phase 3, randomised, blinded, non-inferiority trial of a proposed bevacizumab biosimilar against the originator, each with FOLFIRI-3, in metastatic colorectal cancer",
    sponsor: "AryoGen Pharmed Co.", enrolled: 126, started: "2016-10-04", startedType: "actual", yearReported: 2020,
    tldr: "An Iranian phase 3 trial that found a locally made copy of bevacizumab worked as well as the original in bowel cancer that had spread.",
    summary: "AryoGen Pharmed's trial randomised patients with metastatic colorectal cancer 2:1 to its bevacizumab (5 mg/kg, called BE1040V in the paper and Stivant on ClinicalTrials.gov) or the originator Avastin, each with FOLFIRI-3 chemotherapy every two weeks for a year. ClinicalTrials.gov lists 22 sites, all in Iran, in Tehran, Mashhad, Isfahan, Shiraz, Rasht, Kermanshah, Ahvaz, Hamadan and Yazd; the trial ran from October 2016 to July 2018 and enrolled 126 patients.\n\nIn the 2020 report in Clinical Therapeutics, progression-free survival was 232 days (7.7 months) with the biosimilar and 210 days (7 months) with the reference product; the hazard ratio was 0.79 (90% CI 0.46 to 1.35), whose upper limit was under the non-inferiority margin of 1.44. Overall survival, response rate and safety did not differ significantly.",
    result: "Non-inferior: progression-free survival 7.7 months against 7.0 months, hazard ratio 0.79 (90% CI 0.46 to 1.35), margin 1.44 (Clin Ther 2020).",
    drugs: ["bevacizumab"], cancers: ["colorectal"], technologies: ["biosimilar-manufacturing"], terms: ["biosimilar"], companies: ["aryogen-pharmed"],
    keyPapers: ["paper-be1040v-bevacizumab-biosimilar-clin-ther-2020"],
    links: [ctgov("NCT03288987"), doi("10.1016/j.clinthera.2020.03.009", "Rezvani et al., Clin Ther 2020"), pubmed("32334845")] }),

  t({ id: "nct04957212", name: "P013 (CinnaGen pertuzumab) against Perjeta before surgery for HER2-positive breast cancer", aka: ["P013 phase 3", "IRCT20150303021315N11"], nct: "NCT04957212", phase: "3", design: "equivalence", status: "completed",
    setting: "Phase 3, randomised, triple-blind equivalence trial of a proposed pertuzumab biosimilar against the originator with trastuzumab, carboplatin and docetaxel before surgery for HER2-positive breast cancer",
    sponsor: "CinnaGen", enrolled: 214, started: "2018-08-11", startedType: "actual", yearReported: 2022,
    tldr: "An Iranian phase 3 trial in which a locally made copy of pertuzumab gave the same rate of complete tumour disappearance before surgery as the original.",
    summary: "CinnaGen randomised 214 chemotherapy-naive women with operable, locally advanced or inflammatory HER2-positive breast cancer 1:1 to six three-weekly cycles of its pertuzumab P013 or Roche's Perjeta, each with trastuzumab, carboplatin and docetaxel. ClinicalTrials.gov lists 44 sites, all in Iran; the trial was registered first in the Iranian Registry of Clinical Trials (IRCT20150303021315N11, 11 June 2018) and later on ClinicalTrials.gov (12 July 2021), and ran from August 2018 to May 2020.\n\nIn the 2022 BMC Cancer report, breast pathological complete response in the per-protocol population was 67.62% with P013 and 71.57% with the reference product, a mean difference of -0.04 (95% CI -0.16 to 0.09), within the equivalence margin; secondary endpoints and safety were comparable. A correction to the paper was published the same year.",
    result: "Equivalent: breast pathological complete response 67.62% against 71.57% (BMC Cancer 2022).",
    drugs: ["pertuzumab", "trastuzumab"], cancers: ["breast-her2-positive"], targets: ["her2"], technologies: ["biosimilar-manufacturing"], terms: ["biosimilar"], companies: ["cinnagen"],
    keyPapers: ["paper-p013-pertuzumab-biosimilar-bmc-cancer-2022"],
    links: [ctgov("NCT04957212"), doi("10.1186/s12885-022-09895-5", "Allahyari et al., BMC Cancer 2022"), pubmed("36071409")] }),

  t({ id: "nct06021379", name: "AryoTrust (AryoGen trastuzumab) post-marketing safety study in HER2-positive breast cancer", aka: ["TRA.ARY.FH.95.IV"], nct: "NCT06021379", phase: "observational", status: "completed",
    setting: "Post-marketing surveillance of a trastuzumab biosimilar in Iranian women with HER2-positive non-metastatic breast cancer after adjuvant chemotherapy",
    sponsor: "AryoGen Pharmed Co.", enrolled: 597, started: "2017-02-22", startedType: "actual", yearReported: 2024,
    tldr: "A safety study of a locally made copy of trastuzumab in 597 Iranian women treated after breast cancer surgery, whose authors judged it generally well tolerated.",
    summary: "AryoGen Pharmed followed women with HER2-positive non-metastatic breast cancer who received its trastuzumab, AryoTrust, every three weeks for nine cycles after adjuvant chemotherapy, at 15 Iranian sites listed on ClinicalTrials.gov, from February 2017 to August 2022. The 2024 report in Expert Opinion on Drug Safety covers 597 women and 5,313 injection cycles: 139 had at least one adverse event, the commonest being decreased ejection fraction (5.7%), peripheral neuropathy (5.36%) and nausea (5.19%); meningioma was the only life-threatening serious event and the mean ejection fraction did not change notably.",
    result: "Judged generally well tolerated by its authors in 597 women; decreased ejection fraction in 5.7% (Expert Opin Drug Saf 2024).",
    drugs: ["trastuzumab"], cancers: ["breast-her2-positive"], targets: ["her2"], technologies: ["biosimilar-manufacturing"], terms: ["biosimilar"], companies: ["aryogen-pharmed"],
    keyPapers: ["paper-aryotrust-trastuzumab-pms-2024"],
    links: [ctgov("NCT06021379"), doi("10.1080/14740338.2024.2385483", "Zahedi et al., Expert Opin Drug Saf 2024"), pubmed("39076099")] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-inpcr-2014-roshandel-cancer-epidemiol-2019", name: "Cancer incidence in Iran in 2014: results of the Iranian National Population-based Cancer Registry",
    journal: "Cancer Epidemiology", year: 2019, doi: "10.1016/j.canep.2019.05.009", pmid: "31132560", authors: "Roshandel G, Ghanbari-Motlagh A, Partovipour E, et al.", paperType: "observational", participants: 112131,
    tldr: "The first published national count from Iran's population-based cancer registry: 112,131 new cancers registered in 2014, with stomach cancer commonest in men and breast cancer in women.",
    summary: "The first report of the Iranian National Population-based Cancer Registry, for 2014. Iran's population that year was 76,639,000; the registry covered 30 of 31 provinces (98% of the population) and registered only malignant new primary tumours, from pathology centres, hospitals and death registries, with quality checks and analysis in CanReg-5. Age-standardised rates per 100,000 were reported nationally and by province.",
    findings: [
      "112,131 new cancers were registered in 2014, 60,469 (53.9%) in men; 76,568 (68.28%) were confirmed under the microscope.",
      "Age-standardised incidence was 177.44 per 100,000 in men and 141.18 in women.",
      "In men the commonest were stomach (21.24), prostate (18.41) and colorectum (16.57); in women breast (34.53), colorectum (11.86) and stomach (9.44). Cervical cancer was 1.78 per 100,000 women.",
      "Incidence of oesophageal, stomach and lung cancer was high in the north and north-west of the country.",
    ],
    whatItMeans: "It is the first published national count from the population-based registry. It places Iran as a medium-risk country with a different order of common cancers from the world average.",
    caveats: ["One province was not covered, and about a third of cancers were registered without microscopic confirmation.", "Counts are registrations for one year; the paper gives no mortality or survival."],
    cancers: ["gastric", "breast-cancer", "colorectal", "esophageal"], institutions: ["iran-mohme"], technologies: ["cancer-registries-surveillance"],
    links: [doi("10.1016/j.canep.2019.05.009", "Cancer Epidemiol 2019"), pubmed("31132560")] }),

  p({ id: "paper-inpcr-2016-hadavandsiri-cancer-rep-2024", name: "Cancer incidence in Iran in 2016: a study based on the Iranian National Cancer Registry",
    journal: "Cancer Reports", year: 2024, doi: "10.1002/cnr2.1967", pmid: "38148563", authors: "Hadavandsiri F, Allahqoli L, Rahimi Y, et al.", paperType: "observational", participants: 124833,
    tldr: "Iran's national cancer registry recorded 124,833 new cancers in 2016; prostate cancer was commonest in men and breast cancer in women, with rates highest in the north-west and centre of the country.",
    summary: "An analysis of the Iranian National Population-based Cancer Registry's 2016 data, which the authors describe as managed by all 60 medical universities under the Ministry of Health and Medical Education, covering 31 provinces and following the protocols of the International Agency for Research on Cancer and the International Association of Cancer Registries. Registration drew on pathology reports and clinical and paraclinical hospital data, by place of residence; about 30,679 patients without a national identity number were matched on name, father's name, date of birth and sex. Rates are standardised to the Segi-Doll world population.",
    findings: [
      "124,833 new cancers were registered in 2016; the sex-specific tables give 65,495 in men and 58,312 in women (a sum of 123,807).",
      "Age-standardised incidence was 192.96 per 100,000 in men and 162.33 in women, or 170.50 and 148.43 without non-melanoma skin cancer.",
      "In men the commonest were prostate (7,383 cases), stomach (7,104), colorectal (6,546), bladder (5,378) and lung (4,351); in women breast (15,333), colorectal (5,045), thyroid (4,477), stomach (3,442) and lung (1,887).",
      "West Azarbaijan had the highest rate in men and Yazd in women; Sistan and Baluchistan had the lowest in both.",
    ],
    whatItMeans: "The most recent full national incidence report from the registry that OnCo could read in full. It shows prostate cancer overtaking stomach cancer in men since 2014 and a large number of non-melanoma skin cancers, which change totals depending on whether they are counted.",
    caveats: ["The headline total (124,833) and the sum of the sex tables (123,807) differ by 1,026, which the paper does not explain.", "The authors note the registry holds no information on mortality, survival or recurrence."],
    cancers: ["prostate", "gastric", "colorectal", "breast-cancer", "lung-cancer"], institutions: ["iran-mohme"], technologies: ["cancer-registries-surveillance"],
    links: [doi("10.1002/cnr2.1967", "Cancer Rep 2024"), pubmed("38148563")] }),

  p({ id: "paper-golestan-opium-cancer-lancet-glob-health-2020", name: "Opium use and subsequent incidence of cancer: results from the Golestan Cohort Study",
    journal: "The Lancet Global Health", year: 2020, doi: "10.1016/S2214-109X(20)30059-0", pmid: "32353313", authors: "Sheikh M, Shakeri R, Poustchi H, et al.", paperType: "observational", participants: 50045,
    tldr: "In 50,045 adults followed for a median of ten years in north-east Iran, regular opium use was linked to more cancers of the gullet, stomach, lung, bladder and voice box, rising with dose.",
    summary: "The Golestan Cohort Study enrolled 50,045 people aged 40 to 75 in north-east Iran and recorded opium use, diet, lifestyle and other exposures with validated questionnaires at enrolment. Over a median ten years of follow-up, 1,833 were diagnosed with cancer, and proportional hazards models estimated the association between opium use and each cancer. The study was funded by World Cancer Research Fund International, Cancer Research UK, Tehran University of Medical Sciences, the US National Cancer Institute and the International Agency for Research on Cancer.",
    findings: [
      "Opium use was associated with all cancers combined (hazard ratio 1.40, 95% CI 1.24 to 1.58), gastrointestinal cancers (1.31) and respiratory cancers (2.28), in a dose-dependent manner.",
      "By site: oesophageal 1.38, gastric 1.36, lung 2.21, bladder 2.86 and laryngeal 2.53; only high-dose use was associated with pancreatic cancer (2.66).",
      "Associations held among never and ever tobacco users, men and women, and lower and higher socioeconomic groups.",
    ],
    whatItMeans: "With the International Agency for Research on Cancer's 2020 classification of opium consumption as carcinogenic to humans, it makes opium a cancer-prevention target in Iran alongside tobacco.",
    caveats: ["An observational cohort: opium use was self-reported at enrolment and residual confounding cannot be excluded.", "Results come from one region of Iran."],
    cancers: ["esophageal", "gastric", "lung-cancer", "urothelial"], institutions: ["iarc"], sections: ["prevention"],
    links: [doi("10.1016/S2214-109X(20)30059-0", "Lancet Glob Health 2020"), pubmed("32353313"), doi("10.1016/S1470-2045(20)30611-2", "IARC Monographs Vol 126 group, Carcinogenicity of opium consumption (Lancet Oncol 2020)")] }),

  p({ id: "paper-sanctions-cancer-care-iran-haghjou-2024", name: "The impact of economic sanctions on cancer diagnosis and treatment in Iran: a qualitative study",
    journal: "International Journal for Equity in Health", year: 2024, doi: "10.1186/s12939-024-02335-9", pmid: "39616398", authors: "Haghjou L, Mounesan L, Shamsi A, et al.", paperType: "observational", participants: 53,
    tldr: "Interviews with 53 Iranian cancer specialists describe how economic sanctions led to shortages, lower-quality imported materials, higher prices, lost staff and delays in cancer diagnosis and treatment.",
    summary: "In-depth qualitative interviews with 53 experts, including clinical and basic science specialists chosen by purposeful sampling, analysed by content analysis in MAXQDA 2020. The 900 codes were grouped into input, process and output categories with 13 subcategories.",
    findings: [
      "Inputs: instability in financing and regulations, shortages of materials, low-quality imported materials, high material prices and loss of human resources.",
      "Process: delayed and inadequate care, non-adherence to guidelines, limited international collaboration and reduced provider satisfaction.",
      "Outputs: lower effectiveness, more adverse events and wider equity gaps.",
    ],
    whatItMeans: "Sanctions on Iran exempt medicines and food in principle, but these clinicians report that cancer patients still meet shortages, substitutions and delays, which is the practical context for Iran's push to make cancer medicines itself.",
    caveats: ["Qualitative expert views, not measured outcomes; no counts of patients affected.", "Experts were chosen by purposeful sampling."],
    institutions: ["tehran-cancer-institute"], bottlenecks: ["b-global-access"], technologies: ["global-oncology-access"],
    links: [doi("10.1186/s12939-024-02335-9", "Int J Equity Health 2024"), pubmed("39616398")] }),

  p({ id: "paper-ifda-drug-lag-alipour-medicine-2024", name: "Assessing drug lag in new drug approvals by the Iran Food and Drug Administration compared to the U.S. FDA, EMA, and PMDA: a 20-year analysis (2001-2021)",
    journal: "Medicine", year: 2024, doi: "10.1097/MD.0000000000038142", pmid: "38905367", authors: "Alipour S, Nadimi Parashkouhi S, Mojahedian M, Abbasian H", paperType: "observational",
    tldr: "New medicines approved in the United States from 2001 to 2021 reached approval in Iran, when they did at all, more than five years later on average, and cancer medicines were no faster.",
    summary: "The authors compared new molecular entities approved by the US Food and Drug Administration, the European Medicines Agency, Japan's Pharmaceuticals and Medical Devices Agency and the Iran Food and Drug Administration between 2001 and 2021, using the Iranian government's official medicines list and the agencies' own records, and measured absolute and relative drug lag by therapeutic area of the Anatomical Therapeutic Chemical classification.",
    findings: [
      "Of 710 medicines approved by the US agency, 410 were approved by the European agency, 344 by the Japanese agency and 148 by the Iranian regulator.",
      "For the 148 approved by both, the mean relative lag behind the United States was 65.18 months (SD 61.56) and the maximum 237 months.",
      "For antineoplastic and immunomodulating agents (ATC group L) the mean relative lag was 77.2 months against the US agency, 63.96 against the European agency and 57.93 against the Japanese agency.",
    ],
    whatItMeans: "It is the only published measure OnCo found of how long new cancer medicines take to be approved in Iran, and it puts the delay in years rather than months.",
    caveats: ["Approval dates were taken as the start of the year when only the year was known.", "It measures registration, not when a medicine became available or reimbursed.", "It covers only medicines approved by both the US agency and the Iranian regulator, and excludes vaccines, combinations and new versions of medicines already approved."],
    institutions: ["iran-fda"], bottlenecks: ["b-global-access", "b-regulatory-fragmentation"],
    links: [doi("10.1097/MD.0000000000038142", "Medicine 2024"), pubmed("38905367")] }),

  p({ id: "paper-iran-colorectal-screening-hassanlouei-mjiri-2022", name: "Colorectal cancer screening program results in Iran",
    journal: "Medical Journal of the Islamic Republic of Iran", year: 2022, doi: "10.47176/mjiri.36.118", pmid: "36447540", authors: "Hassanlouei B, Ostovar A, Motevalian SA, et al.", paperType: "observational", participants: 2669625,
    tldr: "Iran's national bowel cancer screening programme, using a stool test in people aged 50 to 69, reached about one in seven eligible people in 2018 and 2019.",
    summary: "A cross-sectional report of 2,669,625 people aged 50 to 69 assessed for colorectal cancer screening at health centres in 2018 and 2019, from the integrated electronic health record (SIB). Primary health workers recorded risk factors and offered a faecal immunochemical test; positive results were to be referred for colonoscopy.",
    findings: [
      "1,365,248 people (14.23%) were assessed in 2018 and 1,304,377 (12.89%) in 2019; 56.3% were women.",
      "33,299 (3.09%) had a positive stool test in 2018 and 33,583 (2.57%) in 2019.",
      "The positive rate ranged from 0.59% in Bushehr to 7.35% in Isfahan in 2018.",
    ],
    whatItMeans: "A national screening programme exists and runs through primary care, but coverage was low and the paper calls for colonoscopy capacity to be prepared before screening expands.",
    caveats: ["The paper reports test results, not colonoscopy completion or cancers found.", "Percentages are of the target population as recorded by the programme."],
    cancers: ["colorectal"], institutions: ["iran-mohme"], technologies: ["colorectal-screening"], terms: ["fit-test"], sections: ["early-detection"],
    links: [doi("10.47176/mjiri.36.118", "Med J Islam Repub Iran 2022"), pubmed("36447540")] }),

  p({ id: "paper-be1040v-bevacizumab-biosimilar-clin-ther-2020", name: "Efficacy and safety of proposed bevacizumab biosimilar BE1040V in patients with metastatic colorectal cancer: a phase III, randomized, double-blind, noninferiority clinical trial",
    journal: "Clinical Therapeutics", year: 2020, doi: "10.1016/j.clinthera.2020.03.009", pmid: "32334845", authors: "Rezvani H, Mortazavizadeh SM, Allahyari A, et al.", paperType: "rct", participants: 126,
    tldr: "A phase 3 trial at Iranian hospitals found that a locally made copy of bevacizumab controlled metastatic bowel cancer as well as the original.",
    summary: "126 patients with histologically verified colorectal cancer and at least one metastasis were randomised 2:1 to 5 mg/kg of the proposed biosimilar or the reference bevacizumab, each with FOLFIRI-3 every two weeks for one year. Progression-free survival was the primary endpoint, assessed per protocol with a non-inferiority margin of 1.44 for the hazard ratio.",
    findings: [
      "Progression-free survival was 232 days (7.7 months) with the biosimilar and 210 days (7 months) with the reference (P = 0.47).",
      "Hazard ratio 0.79 (90% CI 0.46 to 1.35), upper limit below the 1.44 margin: non-inferior.",
      "Overall survival hazard ratio 0.99 (95% CI 0.55 to 1.80); safety comparable; one patient in each arm had anti-drug antibodies.",
    ],
    whatItMeans: "Evidence that the bevacizumab made in Iran by AryoGen performs like the original, which matters in a country where imported originals have been hard to obtain.",
    caveats: ["A small trial with a wide confidence interval and a 2:1 allocation.", "Industry-sponsored; the paper names the product BE1040V and the registry Stivant."],
    drugs: ["bevacizumab"], cancers: ["colorectal"], trials: ["nct03288987"], companies: ["aryogen-pharmed"], terms: ["biosimilar"],
    links: [doi("10.1016/j.clinthera.2020.03.009", "Clin Ther 2020"), pubmed("32334845")] }),

  p({ id: "paper-p013-pertuzumab-biosimilar-bmc-cancer-2022", name: "Comparing efficacy and safety of P013, a proposed pertuzumab biosimilar, with the reference product in HER2-positive breast cancer patients: a randomized, phase III, equivalency clinical trial",
    journal: "BMC Cancer", year: 2022, doi: "10.1186/s12885-022-09895-5", pmid: "36071409", authors: "Allahyari A, Ehsanpour A, Najafi B, et al.", paperType: "rct", participants: 214,
    tldr: "A phase 3 trial in Iran found that a locally made copy of pertuzumab, given before surgery, cleared tumours from the breast as often as the original.",
    summary: "214 chemotherapy-naive women with HER2-positive breast cancer were randomised 1:1 to six cycles of P013 (CinnaGen) or Perjeta (Roche) with trastuzumab, carboplatin and docetaxel every three weeks, stratified by cancer type and hormone receptor status. The primary endpoint was breast pathological complete response. A correction was published in BMC Cancer in 2022 (DOI 10.1186/s12885-022-10455-0).",
    findings: [
      "Breast pathological complete response was 67.62% with P013 and 71.57% with the reference product in the per-protocol population.",
      "Mean difference -0.04 (95% CI -0.16 to 0.09), meeting the equivalence criterion.",
      "Total pathological complete response, overall response, breast-conserving surgery, safety and immunogenicity were comparable.",
    ],
    whatItMeans: "A pertuzumab made in Iran has now been tested against the original, beside the locally made trastuzumab it is given with. A 2025 analysis of Iran's breast cancer services nevertheless listed pertuzumab among four medicines not covered by health insurance.",
    caveats: ["Industry-sponsored; registered on ClinicalTrials.gov after it was completed, though registered in the Iranian registry before it began.", "Pathological complete response is a surrogate; no survival data are reported."],
    drugs: ["pertuzumab", "trastuzumab"], cancers: ["breast-her2-positive"], targets: ["her2"], trials: ["nct04957212"], companies: ["cinnagen"], terms: ["biosimilar"],
    links: [doi("10.1186/s12885-022-09895-5", "BMC Cancer 2022"), pubmed("36071409"), doi("10.1186/s12885-022-10455-0", "Correction, BMC Cancer 2022")] }),

  p({ id: "paper-aryotrust-trastuzumab-pms-2024", name: "Safety evaluation of the trastuzumab biosimilar in Iranian women with HER2-positive breast cancer undergoing adjuvant chemotherapy: a post-marketing surveillance",
    journal: "Expert Opinion on Drug Safety", year: 2024, doi: "10.1080/14740338.2024.2385483", pmid: "39076099", authors: "Zahedi F, Jafari A, Nasiri Motlagh B, et al.", paperType: "real-world", participants: 597,
    tldr: "In 597 Iranian women given a locally made copy of trastuzumab after breast cancer surgery, the commonest side effects were reduced heart pumping function, nerve damage and nausea, and the authors judged it generally well tolerated.",
    summary: "Post-marketing surveillance of AryoTrust, the trastuzumab made by AryoGen in Iran, in women with HER2-positive non-metastatic breast cancer who had had adjuvant chemotherapy and then received trastuzumab every three weeks for nine cycles, from February 2017 to August 2022 (NCT06021379). Safety data were collected in booklets.",
    findings: [
      "597 women (mean age 48.13) received 5,313 injection cycles; 139 had at least one adverse event.",
      "The commonest were decreased ejection fraction (5.7%), peripheral neuropathy (5.36%) and nausea (5.19%); meningioma was the only life-threatening serious event.",
      "Mean ejection fraction did not change notably during the study.",
    ],
    whatItMeans: "Routine-use safety data for a trastuzumab made in Iran, collected at 15 sites in ten cities across the country.",
    caveats: ["No comparison group; industry-sponsored.", "Each woman was followed for nine three-weekly cycles of trastuzumab, so events after that window are not captured."],
    drugs: ["trastuzumab"], cancers: ["breast-her2-positive"], targets: ["her2"], trials: ["nct06021379"], companies: ["aryogen-pharmed"], terms: ["biosimilar"],
    links: [doi("10.1080/14740338.2024.2385483", "Expert Opin Drug Saf 2024"), pubmed("39076099")] }),
];

export const recordsIR: EntityInput[] = [...institutions, ...companies, ...trials, ...papers];
