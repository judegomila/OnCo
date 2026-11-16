import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Democratic Republic of the Congo: the public bodies, hospitals, patient groups and papers behind /countries/cd/
 * (wave 6) that the corpus did not hold. Each was written from its own primary source, read raw on 11 November 2026:
 * the IAEA, WHO and IARC imPACT Review summary report for the country (PDF text, review of May to November 2021,
 * published December 2022), the IAEA's news articles of 22 February 2022 and 17 November 2023 (read through the
 * Internet Archive, as the IAEA site refused a plain request), the OPEC Fund's project page for the Kinshasa Cancer
 * Center Project, the Ministry of Public Health's 2015 national strategy against cervical and breast cancer (PDF text,
 * in French), the home page of the Ministry, the regulator ACOREP's site and its register of marketing authorisations
 * (PDF text, posted 4 February 2026), NIAID ClinRegs' profile of the country (reviewed 16 December 2025), the Centre
 * National de Lutte contre le Cancer's own site, ClinicalTrials.gov, and UICC's member pages (read through the Internet
 * Archive, as UICC refused a plain request). DOIs were resolved through Europe PMC and the figures in `findings` are
 * taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the cancer centre, the regulator, the hospitals and the patient groups; the
 * national cancer centre (CNLC) links the papers through keyPapers; the hospitals link the papers written there. No
 * record in the country existed before this file. Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const IMPACT_2022 = "https://www.iaea.org/sites/default/files/documents/review-missions/democratic-republic-of-congo-impact-review-report-2022.pdf";
const IAEA_2022_WB = "https://web.archive.org/web/20220703120837/https://www.iaea.org/newscenter/news/strengthening-cancer-care-in-the-democratic-republic-of-the-congo-experts-recommend-decentralizing-services";
const IAEA_2023_WB = "https://web.archive.org/web/20231117192811/https://www.iaea.org/newscenter/news/iaea-director-general-and-president-of-the-democratic-republic-of-the-congo-celebrate-cancer-care-milestone";
const OPEC_KCC = "https://opecfund.org/where-we-work/list/kinshasa-cancer-center-project";
const STRAT_2015 = "https://www.iccp-portal.org/system/files/plans/COD_B5_Strat%C3%A9gie%20version%20finale%20du%2024042015.pdf";
const ACOREP = "https://acorep.gouv.cd/";
const ACOREP_AMM = "https://acorep.gouv.cd/repertoire-des-medicaments-autorises/";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/drc";
const CNLC_SCREENING = "https://cnlc.cd/2025/10/20/le-cnlc-encourage-le-depistage-volontaire-et-gratuit-du-cancer/";
const CNLC_ABOUT = "https://cnlc.cd/a-propos/";
const ACP_EXCELLENCE = "https://acp.cd/science-sante-environnement/rdc-le-gouvernement-projette-de-creer-un-centre-national-dexcellence-contre-le-cancer/";
const ACP_MEDICINES = "https://acp.cd/science-sante-environnement/rdc-des-medicaments-receptionnes-a-kinshasa-pour-lutter-contre-le-cancer/";
const OKAPI_PAEDIATRIC = "https://fr.allafrica.com/stories/202602200120.html";
const CTGOV_LMB = "https://clinicaltrials.gov/study/NCT04425421";

const institutions: InstitutionInput[] = [
  i({ id: "drc-ministry-of-health", name: "Ministry of Public Health, Hygiene and Social Welfare, Democratic Republic of the Congo",
    aka: ["Ministère de la Santé Publique, Hygiène et Prévoyance Sociale", "MSPHPS", "Ministry of Health DRC", "Ministère de la Santé RDC"],
    city: "Kinshasa", country: "CD", lat: -4.32, lng: 15.31, institutionType: "government", website: "https://sante.gouv.cd/",
    tldr: "The Democratic Republic of the Congo's health ministry. It asked the IAEA, WHO and IARC to review the country's cancer services in 2018, set up a national cancer centre in 2020, and is extending universal health coverage, which began with free childbirth and newborn care in Kinshasa.",
    summary: "The Ministry of Public Health, Hygiene and Social Welfare sets health policy for the Democratic Republic of the Congo. Its home page, read on 11 November 2026, quotes the Minister, Dr Samuel Roger Kamba, on universal health coverage as a right for every Congolese person. The coordinates are an approximate Kinshasa city point.\n\nIts 2015 national strategy against cervical and breast cancer, written by the National Reproductive Health Programme with WHO support and signed on 27 April 2015, recorded that a specific cancer control programme existed but was not functional, that HPV vaccination had not been introduced, and that a Ministry data collection in 25 Kinshasa hospitals and 3 in Bas-Congo from 2008 to 2010 found 646 cancers, prostate 28%, cervix 19% and breast 18%. In June 2018 the Ministry asked the IAEA for an imPACT Review, which IAEA, WHO and IARC experts carried out virtually from May to November 2021. The review found no population-based or hospital-based cancer registry, no radiotherapy in the public sector, and anticancer medicines missing from the essential medicines list. The Ministry created the Centre National de Lutte contre le Cancer in 2020 to coordinate cancer control and write a national cancer control plan.",
    programs: ["Centre National de Lutte contre le Cancer (created 2020)", "National strategy against cervical and breast cancer (2015; revised for 2024 to 2029)", "Universal health coverage, starting with free childbirth and newborn care", "Expanded Programme on Immunisation (hepatitis B; HPV vaccine planned)"],
    institutions: ["cnlc-drc", "acorep-drc", "cliniques-universitaires-de-kinshasa", "cliniques-universitaires-de-lubumbashi", "monkole-hospital", "biamba-marie-mutombo-hospital", "congo-cancer-foundation", "lalucas-drc", "opec-fund-for-international-development", "iaea", "who", "iarc"],
    cancers: ["cervical", "breast-cancer", "prostate"], related: ["global-oncology-access", "hpv-vaccine"],
    keyPapers: ["paper-mekonen-ncd-screening-dhs-drc-scirep-2026"],
    links: [
      { label: "Ministère de la Santé Publique, Hygiène et Prévoyance Sociale (home page)", url: "https://sante.gouv.cd/" },
      { label: "imPACT Review summary report, Democratic Republic of the Congo (IAEA, WHO, IARC, PDF)", url: IMPACT_2022 },
      { label: "Stratégie nationale de lutte contre les cancers du col utérin et du sein (Ministry of Public Health, 2015, PDF, ICCP portal)", url: STRAT_2015 },
    ] }),

  i({ id: "cnlc-drc", name: "Centre National de Lutte contre le Cancer (CNLC), Democratic Republic of the Congo",
    aka: ["CNLC", "National Cancer Control Center DRC", "National Centre for the Fight against Cancer", "NCCC DRC"],
    city: "Kinshasa", country: "CD", lat: -4.33, lng: 15.31, institutionType: "government", website: "https://cnlc.cd/",
    tldr: "The public body created in 2020 to coordinate cancer control in the Democratic Republic of the Congo and write its first national cancer plan. It runs free screening days in Kinshasa and in 2026 received a first consignment of cancer medicines for distribution to the provinces.",
    summary: "The imPACT Review of 2021 describes the National Cancer Control Center as a coordinating structure created in 2020 to act as the national cancer control programme, strengthen governance and develop a National Cancer Control Plan, and recommends adding a cancer registry division to it with premises, a budget and staff. The CNLC's own site calls it a public institution created to coordinate cancer control nationally, from prevention and early detection to access to care, research and training. The coordinates are an approximate Kinshasa city point.\n\nIn October 2025 the CNLC's director, Dr Bienvenu Lebwaze, announced free screening points in Kinshasa during breast cancer awareness month, with hospitals including the Centre hospitalier Nganda, the Clinique Ngaliema, the Hôpital de l'amitié sino-congolaise and the Hôpital Biamba Marie Mutombo, and said people diagnosed would be treated free by the CNLC. In June 2026 the state news agency ACP reported the CNLC receiving a first consignment of cancer medicines from a private supplier under a five-year supply project, to be deployed to the provinces through universal health coverage. In February 2026 Radio Okapi quoted Dr Lebwaze saying about a hundred children with cancer had been treated in 2025 and that the Cliniques Universitaires de Kinshasa had granted children half the usual fee. In August 2026 ACP quoted its technical coordinator, Dr Benjamin Penge, saying complete treatment costs 80,000 US dollars, of which the government covers 85%.",
    programs: ["National cancer control coordination (from 2020)", "National cancer control plan (in preparation)", "Free cancer screening days in Kinshasa", "Distribution of cancer medicines to the provinces under universal health coverage", "Paediatric cancer care support with the Cliniques Universitaires de Kinshasa"],
    institutions: ["drc-ministry-of-health", "cliniques-universitaires-de-kinshasa", "biamba-marie-mutombo-hospital", "opec-fund-for-international-development", "iaea"],
    cancers: ["cervical", "breast-cancer", "prostate", "childhood-cancers"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-kajimina-cervical-cancer-kinshasa-gofs-2022", "paper-bukasa-kakamba-kinshasa-pathology-cancers-wjem-2023", "paper-ali-risasi-cervical-lesions-kinshasa-iac-2015", "paper-paluku-screen-and-treat-eastern-drc-bmcwh-2019", "paper-mekonen-ncd-screening-dhs-drc-scirep-2026", "paper-pilz-quality-of-life-lubumbashi-bmjopen-2026"],
    links: [
      { label: "CNLC: à propos", url: CNLC_ABOUT },
      { label: "CNLC: le CNLC encourage le dépistage volontaire et gratuit du cancer (20 October 2025)", url: CNLC_SCREENING },
      { label: "imPACT Review summary report, findings 2 and 3 (PDF)", url: IMPACT_2022 },
      { label: "ACP: des médicaments réceptionnés à Kinshasa pour lutter contre le cancer (23 June 2026)", url: ACP_MEDICINES },
      { label: "ACP: le gouvernement projette de créer un centre national d'excellence contre le cancer (2 August 2026)", url: ACP_EXCELLENCE },
    ] }),

  i({ id: "acorep-drc", name: "Autorité Congolaise de Réglementation Pharmaceutique (ACOREP)",
    aka: ["ACOREP", "Congolese Pharmaceutical Regulatory Authority", "Direction de la Pharmacie et du Médicament", "DPM RDC"],
    city: "Kinshasa", country: "CD", lat: -4.31, lng: 15.31, institutionType: "government", website: ACOREP,
    tldr: "The Democratic Republic of the Congo's medicines regulator since March 2020. It grants five-year marketing authorisations, publishes a register of authorised medicines, and authorises clinical trials after ethics approval.",
    summary: "ACOREP was created by Decree No. 20/002 of 5 March 2020 as a public body under the Ministry of Public Health, taking over the equipment and infrastructure of the Directorate of Pharmacy and Medicine and of the national quality control laboratory, according to NIAID's ClinRegs profile of the country (reviewed 16 December 2025). It regulates medicines, foods, medical devices, herbal products, cosmetics and psychotropic drugs, runs the national pharmacovigilance system, and authorises clinical trials: ClinRegs reports that a trial needs a favourable opinion from an ethics committee such as the National Committee of Health Ethics (CNES), that ACOREP decides on a complete application within 30 days, and that the fee for a phase III trial funded by a non-resident sponsor is 3,000 US dollars. The coordinates are an approximate Kinshasa city point; ClinRegs gives its address as Boulevard du 30 juin.\n\nOn 4 February 2026 ACOREP posted its register of marketing authorisations, a 355-page PDF. Read on 11 November 2026, its entries were registered in 2021, 2022 and 2024 and each is valid for five years. About 40 entries are classed as anticancer or antineoplastic, among them rituximab, bevacizumab, atezolizumab, pertuzumab with trastuzumab, imatinib, dasatinib, docetaxel, paclitaxel, capecitabine, anastrozole, letrozole and abiraterone. Its Director General, Christian Ntumba Ngoy, was appointed by presidential ordinance No. 22/136 of 29 August 2022, according to its site.",
    programs: ["Marketing authorisation of medicines (five-year validity)", "Register of authorised medicines (posted 4 February 2026)", "Clinical trial authorisation", "National pharmacovigilance system", "Provincial divisions (Kinshasa, Haut-Katanga, Kongo Central)"],
    institutions: ["drc-ministry-of-health"],
    links: [
      { label: "ACOREP (home page)", url: ACOREP },
      { label: "ACOREP: répertoire des médicaments autorisés (4 February 2026)", url: ACOREP_AMM },
      { label: "NIAID ClinRegs: Democratic Republic of the Congo, regulatory authority and clinical trial requirements", url: CLINREGS },
    ] }),

  i({ id: "cliniques-universitaires-de-kinshasa", name: "Cliniques Universitaires de Kinshasa (CUK)",
    aka: ["CUK", "University Clinics of Kinshasa", "Kinshasa University Clinics", "Cliniques universitaires de Kinshasa, Université de Kinshasa"],
    city: "Kinshasa", country: "CD", lat: -4.42, lng: 15.31, institutionType: "hospital", university: "University of Kinshasa",
    tldr: "The University of Kinshasa's teaching hospital. It treats children with cancer within the French-African paediatric oncology group's trials and was one of the hospitals the imPACT reviewers recommended re-equipping for pathology and imaging.",
    summary: "The Cliniques Universitaires de Kinshasa are the teaching hospital of the University of Kinshasa's Faculty of Medicine, which the imPACT Review describes as organising training in some twenty medical and surgical specialties. The review recommended renewing the CUK's laboratory, pathology, endoscopy and imaging equipment and introducing oncology teaching and medical oncology as a specialty there. The coordinates are an approximate point for the university's Mont Amba campus.\n\nThe hospital is a recruiting site, with the Cliniques Universitaires de Lubumbashi, of NCT04425421, the French Africa Pediatric Oncology Group's fourth study of treatment for children with Burkitt lymphoma, which also runs in Burkina Faso, Côte d'Ivoire, Madagascar, Mali and Senegal. In February 2026 Radio Okapi quoted the national cancer centre's director saying about a hundred children with cancer were treated in 2025 and that the CUK had granted them half the usual fee, and quoted its medical director, Dr Jean-Robert Makulo, saying targeted therapy had become possible in Kinshasa. The University of Kinshasa is also to host the new public radiotherapy centre, according to the IAEA.",
    programs: ["Paediatric oncology (French Africa Pediatric Oncology Group sites)", "Pathology", "Specialist medical training"],
    institutions: ["drc-ministry-of-health", "cnlc-drc"],
    cancers: ["burkitt-lymphoma", "childhood-cancers", "retinoblastoma", "cervical"],
    keyPapers: ["paper-kajimina-cervical-cancer-kinshasa-gofs-2022", "paper-bukasa-kakamba-kinshasa-pathology-cancers-wjem-2023"],
    links: [
      { label: "ClinicalTrials.gov: NCT04425421, French Africa Pediatric Oncology Group Burkitt lymphoma study (sites)", url: CTGOV_LMB },
      { label: "imPACT Review summary report, recommendations on diagnosis and training (PDF)", url: IMPACT_2022 },
      { label: "Radio Okapi via allAfrica: plus de 100 cas de cancers pédiatriques pris en charge en 2025 (19 February 2026)", url: OKAPI_PAEDIATRIC },
      { label: "IAEA: celebrating a cancer care milestone (17 November 2023; read through the Internet Archive)", url: IAEA_2023_WB },
    ] }),

  i({ id: "cliniques-universitaires-de-lubumbashi", name: "Cliniques Universitaires de Lubumbashi (CUL)",
    aka: ["CUL", "University Clinics of Lubumbashi", "Cliniques universitaires de Lubumbashi, Université de Lubumbashi"],
    city: "Lubumbashi", country: "CD", lat: -11.66, lng: 27.48, institutionType: "hospital", university: "University of Lubumbashi",
    tldr: "The University of Lubumbashi's teaching hospital in Haut-Katanga. It is a site for the French-African paediatric oncology group's trials, and the imPACT reviewers proposed a population-based cancer registry covering the whole city.",
    summary: "The Cliniques Universitaires de Lubumbashi are the teaching hospital of the University of Lubumbashi in Haut-Katanga province, one of the four provinces whose facilities the imPACT reviewers interviewed in 2021. The review recommended renewing the CUL's laboratory and imaging equipment, teaching oncology there, and a population-based cancer registry covering the whole of Lubumbashi. The coordinates are an approximate Lubumbashi city point.\n\nIt is a recruiting site of NCT04425421, the French Africa Pediatric Oncology Group's Burkitt lymphoma study, and of the group's studies of retinoblastoma and nephroblastoma, according to ClinicalTrials.gov. A 2026 study of quality of life among 103 people with cancer recruited in 12 hospitals in Lubumbashi found financial problems the most frequent clinically important problem.",
    programs: ["Paediatric oncology (French Africa Pediatric Oncology Group sites)", "Specialist medical training"],
    institutions: ["drc-ministry-of-health"],
    cancers: ["burkitt-lymphoma", "retinoblastoma", "childhood-cancers", "prostate"],
    keyPapers: ["paper-pilz-quality-of-life-lubumbashi-bmjopen-2026"],
    links: [
      { label: "ClinicalTrials.gov: NCT04425421, French Africa Pediatric Oncology Group Burkitt lymphoma study (sites)", url: CTGOV_LMB },
      { label: "imPACT Review summary report, recommendations on registration (PDF)", url: IMPACT_2022 },
      doi("10.1136/bmjopen-2025-114083", "Pilz et al., quality of life in patients with cancer in Lubumbashi (BMJ Open 2026)"),
    ] }),

  i({ id: "monkole-hospital", name: "Monkole Hospital, Kinshasa", aka: ["Hôpital Monkole", "Centre Hospitalier Monkole", "Monkole"],
    city: "Kinshasa", country: "CD", lat: -4.43, lng: 15.26, institutionType: "hospital",
    tldr: "A private hospital in Kinshasa that the imPACT reviewers visited in 2021, and where a cervical screening programme validated visual inspection photographed by smartphone and checked by specialists abroad.",
    summary: "The IAEA describes Monkole Hospital as a private hospital in Kinshasa and one of the 21 facilities covered by the 2021 imPACT Review, which recommended renewing its laboratory and imaging equipment. The coordinates are an approximate point for south-western Kinshasa.\n\nAt Monkole, Tendobi and colleagues screened 480 women aged 25 to 70 with visual inspection after acetic acid and Lugol's iodine, photographed by smartphone and reviewed by two specialists abroad, offering immediate cryotherapy when the test was suspicious, and compared the result with cytology read in Navarra, Spain. The combined test had a negative predictive value of 99.7% for high-grade lesions.",
    programs: ["Cervical cancer screening with smartphone-monitored visual inspection"],
    institutions: ["drc-ministry-of-health"],
    cancers: ["cervical"],
    keyPapers: ["paper-tendobi-smartphone-via-monkole-ijgc-2022"],
    links: [
      { label: "IAEA: experts recommend decentralising cancer services in the DRC (22 February 2022; read through the Internet Archive)", url: IAEA_2022_WB },
      doi("10.1136/ijgc-2022-003592", "Tendobi et al., smartphone visual inspection screening in Kinshasa (Int J Gynecol Cancer 2022)"),
    ] }),

  i({ id: "biamba-marie-mutombo-hospital", name: "Hôpital Biamba Marie Mutombo, Kinshasa", aka: ["Biamba Marie Mutombo Hospital", "HBMM"],
    city: "Kinshasa", country: "CD", lat: -4.38, lng: 15.39, institutionType: "hospital",
    tldr: "A private hospital in Kinshasa where, from 2017, Zambian and US teams trained Congolese staff and opened a breast clinic and a chemotherapy unit for breast and cervical cancer; it took part in the national cancer centre's free screening in 2025.",
    summary: "Three 2021 papers describe a women's cancer programme at the Biamba Marie Mutombo Hospital, a private sector facility in Kinshasa. Zambian and US gynaecologic and breast oncology specialists trained Congolese providers in clinical breast examination, breast ultrasound, image-guided biopsy and breast surgery, a breast care clinic opened, and from April 2017 to August 2020 5,211 women with breast abnormalities on examination were seen; 88% of the 164 cancers diagnosed were stage 3 or 4. A chemotherapy infusion unit was set up with staff trained at the Cancer Diseases Hospital in Lusaka and medicines procured through a global access initiative, and general gynaecologists were trained to perform radical hysterectomy for early cervical cancer. The coordinates are an approximate point for eastern Kinshasa.\n\nThe hospital was one of those taking part in the national cancer centre's free screening campaign in Kinshasa in October 2025.",
    programs: ["Breast care clinic", "Chemotherapy infusion unit for breast and cervical cancer", "Surgical training for cervical cancer"],
    institutions: ["cnlc-drc", "drc-ministry-of-health"],
    cancers: ["breast-cancer", "cervical"],
    keyPapers: ["paper-mathieu-breast-platform-kinshasa-ecancer-2021", "paper-youyou-chemotherapy-access-drc-ecancer-2021"],
    links: [
      doi("10.3332/ecancer.2021.1233", "Mathieu et al., a breast cancer detection and treatment platform in the DRC (ecancer 2021)"),
      doi("10.3332/ecancer.2021.1234", "YouYou et al., access to chemotherapy for women's cancers in the DRC (ecancer 2021)"),
      doi("10.3332/ecancer.2021.1232", "Hicks et al., surgical capacity for cervical cancer in the DRC (ecancer 2021)"),
      { label: "CNLC: free screening campaign and participating hospitals (20 October 2025)", url: CNLC_SCREENING },
    ] }),

  i({ id: "congo-cancer-foundation", name: "Congo Cancer Foundation (CCF)", aka: ["CCF", "Congo Cancer Organization"],
    city: "Kinshasa", country: "CD", lat: -4.32, lng: 15.32, institutionType: "consortium",
    tldr: "A Kinshasa non-profit and full member of the Union for International Cancer Control. It runs free screening in poorer districts, helps patients find their way through care, and is studying HPV self-sampling for cervical screening.",
    summary: "The Congo Cancer Foundation's member page on the Union for International Cancer Control (UICC), last updated on 29 August 2025, describes a non-profit organisation working to improve cancer control in the Democratic Republic of the Congo through education, research and patient-centred care. It lists free screening mainly in disadvantaged areas of the Kinshasa region, awareness of cervical and breast cancer through local spiritual and community leaders, an ASCO multidisciplinary cervical cancer management course, a first breast and gynaecological cancer international conference in Kinshasa, a programme to help patients navigate the health system, a study of HPV self-sampling for cervical screening, and a planned hospital-based cancer registry in Kinshasa. The coordinates are an approximate Kinshasa city point.",
    programs: ["Free cancer screening in Kinshasa", "Patient navigation", "HPV self-sampling study", "Professional education on breast and gynaecological cancers"],
    institutions: ["uicc", "asco", "drc-ministry-of-health"],
    cancers: ["cervical", "breast-cancer"],
    links: [{ label: "UICC member page: Congo Cancer Foundation (read through the Internet Archive)", url: "https://web.archive.org/web/20251104233858/https://www.uicc.org/membership/congo-cancer-foundation" }] }),

  i({ id: "lalucas-drc", name: "Ligue Africaine pour la Lutte contre le Cancer du Sein (LALuCaS)", aka: ["LALuCaS", "African League against Breast Cancer"],
    city: "Kinshasa", country: "CD", lat: -4.32, lng: 15.30, institutionType: "consortium",
    tldr: "A breast cancer organisation listed in the Democratic Republic of the Congo and a full member of the Union for International Cancer Control, working on research, awareness, training of health workers, advocacy and clinical care.",
    summary: "The UICC member page for the Ligue Africaine pour la Lutte contre le Cancer du Sein, last updated on 25 December 2025, lists it as a full member located in the Democratic Republic of the Congo whose main mission is to help reduce breast cancer deaths in Africa through scientific research, awareness, training of health workers, advocacy and clinical work. OnCo found no other primary source for its activities. The coordinates are an approximate Kinshasa city point; UICC does not give a city.",
    programs: ["Breast cancer awareness", "Training of health workers", "Advocacy", "Research"],
    institutions: ["uicc"],
    cancers: ["breast-cancer"],
    links: [{ label: "UICC member page: LALuCaS (read through the Internet Archive)", url: "https://web.archive.org/web/20260618011641/https://www.uicc.org/membership/la-ligue-africaine-pour-la-lutte-contre-le-cancer-du-sein-lalucas" }] }),

  i({ id: "opec-fund-for-international-development", name: "OPEC Fund for International Development", aka: ["OPEC Fund", "OFID"],
    city: "Vienna", country: "AT", lat: 48.2, lng: 16.37, institutionType: "government", website: "https://opecfund.org",
    tldr: "A multilateral development institution in Vienna. In June 2026 it approved a 38 million US dollar loan to the Democratic Republic of the Congo towards the 76 million dollar Kinshasa Cancer Center Project, co-financed by the IAEA and the government.",
    summary: "The OPEC Fund for International Development describes itself as a multilateral institution that finances work towards the Sustainable Development Goals; its address is in Vienna. Its project page for the Kinshasa Cancer Center Project, read on 11 November 2026, records a public sector project loan to the Democratic Republic of the Congo approved on 24 June 2026, status ongoing, with the OPEC Fund contributing 38.00 million US dollars of a total project cost of 76.00 million, the CGEA as executing agency, and the IAEA and the government as co-financiers. The page does not describe the facility. The coordinates are an approximate Vienna city point.",
    programs: ["Kinshasa Cancer Center Project (loan approved 24 June 2026)"],
    institutions: ["iaea"],
    links: [{ label: "OPEC Fund: Kinshasa Cancer Center Project", url: OPEC_KCC }, { label: "OPEC Fund: about us", url: "https://opecfund.org/who-we-are/about-us" }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-kajimina-cervical-cancer-kinshasa-gofs-2022", name: "Cervical cancer in five Kinshasa pathology laboratories: 1,280 cases reviewed",
    journal: "Gynécologie Obstétrique Fertilité & Sénologie", year: 2022, doi: "10.1016/j.gofs.2021.07.001", pmid: "34242824", authors: "Kajimina Katumbayi JC, Muyulu NP, Zakayi PK, Lebwaze Massamba B, et al.", paperType: "observational", participants: 1280,
    tldr: "Of 5,801 cancers diagnosed over ten years in five Kinshasa pathology laboratories, 1,280 were cervical cancers, 22% of all cancers, most often in women aged 49 to 58.",
    summary: "Published in French as \"Caractéristiques épidémiologiques et histopathologiques de 1280 cancers du col utérin à Kinshasa\". With no cancer registry and no large-scale cervical screening, the authors reviewed all cancers recorded over the previous ten years in five pathology laboratories in Kinshasa, and at least two pathologists re-read the slides of every cervical cancer and classified it under the 2014 WHO classification.",
    findings: [
      "Cervical cancer was 22% of all 5,801 cancers and 40.4% of breast and gynaecological cancers.",
      "It was commonest among women aged 49 to 58.",
      "Squamous cell carcinoma made up 73.2%, adenocarcinoma 18.4% and adenosquamous carcinoma 8.4%.",
    ],
    whatItMeans: "Laboratory counts are the best direct measure Kinshasa has of which cancers are diagnosed; the authors offer them as a base for a cancer registry, screening and HPV vaccination.",
    caveats: ["Laboratory series count only cancers that reached a biopsy in the capital, not the population's cancers.", "The abstract does not give the exact years covered."],
    institutions: ["cliniques-universitaires-de-kinshasa"], cancers: ["cervical"],
    links: [doi("10.1016/j.gofs.2021.07.001", "Gynecol Obstet Fertil Senol 2022"), pubmed("34242824")] }),

  p({ id: "paper-bukasa-kakamba-kinshasa-pathology-cancers-wjem-2023", name: "Which cancers Kinshasa's pathology laboratories diagnosed, 2005 to 2019",
    journal: "World Journal of Experimental Medicine", year: 2023, doi: "10.5493/wjem.v13.i3.17", pmid: "37396884", authors: "Bukasa-Kakamba J, Bangolo AI, Bayauli P, et al.", paperType: "observational", participants: 6106,
    tldr: "In 6,106 cancers recorded by four Kinshasa pathology laboratories from 2005 to 2019, 68% were in women; breast and cervical cancer led in women, and prostate and skin cancer in men.",
    summary: "Published as \"Proportion of thyroid cancer and other cancers in the democratic republic of Congo\". A retrospective, descriptive study of all consecutive cancer cases in the pathology registers of four laboratories in Kinshasa between 2005 and 2019, written to measure the share of thyroid cancer.",
    findings: [
      "Of 6,106 cancers, 68.3% were in women and 31.7% in men.",
      "Breast and cervical cancer were the commonest in women; prostate and skin cancer the commonest in men.",
      "Thyroid cancer ranked sixth in women and eleventh in men, and papillary carcinoma was the commonest type.",
    ],
    whatItMeans: "With no registry, laboratory registers are the main window on which cancers are diagnosed in the capital; this series shows a pattern close to IARC's modelled estimate, led by breast, cervical and prostate cancer.",
    caveats: ["Proportions among biopsied cancers, not incidence rates.", "Four laboratories in one city."],
    institutions: ["cliniques-universitaires-de-kinshasa"], cancers: ["breast-cancer", "cervical", "prostate", "thyroid"],
    links: [doi("10.5493/wjem.v13.i3.17", "World J Exp Med 2023"), pubmed("37396884")] }),

  p({ id: "paper-ali-risasi-cervical-lesions-kinshasa-iac-2015", name: "Cervical precancer and HPV types among women in Kinshasa",
    journal: "Infectious Agents and Cancer", year: 2015, doi: "10.1186/s13027-015-0015-z", pmid: "26180542", authors: "Ali-Risasi C, Verdonck K, Padalko E, Vanden Broeck D, Praet M.", paperType: "observational", participants: 1018,
    tldr: "Among 1,018 women in Kinshasa, abnormal cervical cells (LSIL or worse) were found in 31% of women living with HIV and about 4% of the others, and HPV16 was not the commonest type.",
    summary: "Published as \"Prevalence and risk factors for cancer of the uterine cervix among women living in Kinshasa, the Democratic Republic of the Congo: a cross-sectional study\". Between 2006 and 2013, four groups of women were recruited in HIV screening centres, large hospitals and primary health centres in Kinshasa; Pap smears were read by the Bethesda classification and HPV types identified in abnormal samples.",
    findings: [
      "LSIL or worse was found in 76 of 1,018 women: 31.3% of 131 women living with HIV, 3.9% of 128 HIV-negative women, 3.9% in hospitals and 4.1% in primary health centres.",
      "Using plants for vaginal care was associated with LSIL or worse (adjusted odds ratio 2.70, 95% CI 1.04 to 7.01).",
      "The commonest HPV types in abnormal samples were HPV52, HPV35 and HPV68 among women with HIV, and HPV52 among the others; HPV16 was not the commonest.",
    ],
    whatItMeans: "Women living with HIV in Kinshasa carry a much higher risk of cervical precancer, which is why WHO recommends screening them earlier and more often; the HPV types matter for which vaccine protects best.",
    caveats: ["Not a random sample of the city's women.", "HPV typing was done only in abnormal samples."],
    cancers: ["cervical"],
    links: [doi("10.1186/s13027-015-0015-z", "Infect Agent Cancer 2015"), pubmed("26180542")] }),

  p({ id: "paper-paluku-screen-and-treat-eastern-drc-bmcwh-2019", name: "Single-visit cervical screen-and-treat campaigns in eastern Democratic Republic of the Congo",
    journal: "BMC Women's Health", year: 2019, doi: "10.1186/s12905-019-0737-y", pmid: "30832697", authors: "Paluku JL, Carter TE, Lee M, Bartels SA.", paperType: "observational", participants: 644,
    tldr: "Two mass screening campaigns in eastern DRC screened 644 women in a single visit and biopsied 48 suspicious lesions, finding 15 precancers and 6 squamous cell cancers.",
    summary: "Published as \"Massive single visit cervical pre-cancer and cancer screening in eastern Democratic Republic of Congo\". In two campaigns women were screened by visual inspection with acetic acid and with Lugol's iodine and by colposcopy, with loop excision where indicated, and biopsies were sent for histology.",
    findings: [
      "Of 644 women screened, 48 (7.45%) had suspicious lesions that were biopsied.",
      "Histology found cervical intraepithelial neoplasia in 15 (2.33%) and squamous cell carcinoma in 6 (0.93%).",
      "Abnormal bleeding was associated with precancer or cancer; age, region and prior pregnancy were not.",
    ],
    whatItMeans: "Screen-and-treat campaigns are feasible in eastern DRC, but the authors say they need trained providers, referral and follow-up, and secure supplies to work at scale, alongside HPV vaccination.",
    caveats: ["Campaign data from one region; no follow-up of treated women is reported in the abstract."],
    cancers: ["cervical"],
    links: [doi("10.1186/s12905-019-0737-y", "BMC Womens Health 2019"), pubmed("30832697")] }),

  p({ id: "paper-mekonen-ncd-screening-dhs-drc-scirep-2026", name: "Screening for hypertension, diabetes and cervical cancer among women in the 2023 to 2024 DRC Demographic and Health Survey",
    journal: "Scientific Reports", year: 2026, doi: "10.1038/s41598-026-62712-y", pmid: "42477022", authors: "Mekonen EG, Endalew HL, Bazezew AM, et al.", paperType: "observational", participants: 11368,
    tldr: "In the nationally representative 2023 to 2024 survey, 0.69% of Congolese women aged 30 to 49 had ever been screened for cervical cancer.",
    summary: "Published as \"Screening for hypertension, diabetes, and cervical cancer in the democratic Republic of Congo: insights from a nationally representative survey\". A secondary analysis of the Demographic and Health Survey for the DRC, 2023 to 2024, covering a weighted sample of 11,368 women aged 30 to 49, with multilevel models of who was screened.",
    findings: [
      "53.42% had been screened for at least one non-communicable disease: hypertension 52.18%, diabetes 14.25% and cervical cancer 0.69%.",
      "Older age, more education, employment, media exposure, wealth, health insurance and recent health visits were associated with being screened.",
      "Urban residence, lower community poverty and higher contraceptive use were associated with higher screening at community level.",
    ],
    whatItMeans: "Fewer than one woman in a hundred of screening age in the DRC reported ever having a cervical screening test, far from WHO's target of 70%.",
    caveats: ["Self-reported screening in a household survey.", "The abstract gives the national figure, not provincial ones."],
    cancers: ["cervical"],
    links: [doi("10.1038/s41598-026-62712-y", "Sci Rep 2026"), pubmed("42477022")] }),

  p({ id: "paper-mathieu-breast-platform-kinshasa-ecancer-2021", name: "Building a breast cancer diagnosis and treatment service at a Kinshasa hospital",
    journal: "ecancermedicalscience", year: 2021, doi: "10.3332/ecancer.2021.1233", pmid: "34221116", authors: "Mathieu KM, YouYou TG, Hicks ML, et al.", paperType: "observational", participants: 5211,
    tldr: "Over three years at the Biamba Marie Mutombo Hospital in Kinshasa, 5,211 women with breast abnormalities were assessed after local staff were trained, and 88% of the 164 cancers found were advanced.",
    summary: "Published as \"Building a breast cancer detection and treatment platform in the Democratic Republic of the Congo by integrating training, service and infrastructure development\". Zambian and US specialists made five week-long training visits over two years to teach clinical breast examination, breast and axillary ultrasound, image-guided biopsy and breast surgery, while a breast clinic was opened and operating theatres upgraded at a private hospital in Kinshasa.",
    findings: [
      "From April 2017 to August 2020, 5,211 women with abnormalities on clinical breast examination were seen; ultrasound was abnormal in 1,420 (27%).",
      "Of 368 biopsies with pathology reports, 164 were malignant and 204 benign; 88% of the cancers were stage 3 or 4.",
      "183 lumpectomies, 58 modified radical mastectomies and 45 axillary dissections were performed.",
    ],
    whatItMeans: "Training and equipment together can create a working breast service quickly, but most women still arrive with advanced disease.",
    caveats: ["A single private hospital; written by the programme's own team."],
    institutions: ["biamba-marie-mutombo-hospital"], cancers: ["breast-cancer"],
    links: [doi("10.3332/ecancer.2021.1233", "ecancer 2021"), pubmed("34221116")] }),

  p({ id: "paper-youyou-chemotherapy-access-drc-ecancer-2021", name: "Opening a chemotherapy unit for breast and cervical cancer in Kinshasa",
    journal: "ecancermedicalscience", year: 2021, doi: "10.3332/ecancer.2021.1234", pmid: "34221117", authors: "YouYou TG, Mathieu KM, Hicks ML, et al.", paperType: "observational", participants: 100,
    tldr: "A chemotherapy infusion unit opened at a private Kinshasa hospital, with staff trained in Zambia and low-cost medicines; over 100 women with breast or cervical cancer received 337 courses without serious adverse events.",
    summary: "Published as \"Leveraging a matrix of stakeholders to facilitate access to chemotherapy for women's cancers in the Democratic Republic of the Congo\". Congolese providers were trained at the Cancer Diseases Hospital in Zambia to give chemotherapy for breast and cervical cancer, and medicines were procured through a global cancer medicine access initiative.",
    findings: [
      "A new chemotherapy infusion unit was established at the Biamba Marie Mutombo Hospital in Kinshasa.",
      "Over 100 breast and cervical cancer patients received 337 courses of chemotherapy.",
      "No serious adverse events were reported.",
    ],
    whatItMeans: "Regional training, a private hospital and pooled procurement of low-cost medicines together made chemotherapy available where there was very little.",
    caveats: ["The participant count is the abstract's \"over 100\".", "Written by the programme's own team; no survival outcomes are reported."],
    institutions: ["biamba-marie-mutombo-hospital"], cancers: ["breast-cancer", "cervical"],
    links: [doi("10.3332/ecancer.2021.1234", "ecancer 2021"), pubmed("34221117")] }),

  p({ id: "paper-tendobi-smartphone-via-monkole-ijgc-2022", name: "Cervical screening by visual inspection photographed on a smartphone, Monkole Hospital, Kinshasa",
    journal: "International Journal of Gynecological Cancer", year: 2022, doi: "10.1136/ijgc-2022-003592", pmid: "35858712", authors: "Tendobi C, Fernandez-Marques M, Carlos S, et al.", paperType: "observational", participants: 480,
    tldr: "In 480 women screened at Monkole Hospital, visual inspection by local staff, photographed and checked by specialists abroad, ruled out high-grade lesions with a negative predictive value of 99.7%.",
    summary: "Published as \"Validation of a sustainable internationally monitored cervical cancer screening system using a visual smartphone inspection in Kinshasa, Democratic Republic of Congo\". Local providers performed visual inspection with acetic acid and Lugol's iodine while a smartphone photograph was taken for two international specialists; liquid-based cytology and HPV genotyping were done in Navarra, Spain.",
    findings: [
      "480 women aged 25 to 65 took part; 18.7% had HPV, and HPV16 was the commonest high-risk type (12.2%).",
      "Against cytology, the combined visual test had sensitivity 66.0%, specificity 87.8%, positive predictive value 40.7% and negative predictive value 95.3% for any lesion.",
      "The negative predictive value for high-grade lesions was 99.7%.",
    ],
    whatItMeans: "Visual screening by non-specialists, checked remotely, can be a valid low-cost screening method where HPV testing is not yet available.",
    caveats: ["One hospital; women came in response to a free screening campaign.", "Cytology, not histology, was the reference."],
    institutions: ["monkole-hospital"], cancers: ["cervical"],
    links: [doi("10.1136/ijgc-2022-003592", "Int J Gynecol Cancer 2022"), pubmed("35858712")] }),

  p({ id: "paper-pilz-quality-of-life-lubumbashi-bmjopen-2026", name: "Quality of life of people with cancer in Lubumbashi",
    journal: "BMJ Open", year: 2026, doi: "10.1136/bmjopen-2025-114083", pmid: "42716684", authors: "Pilz MJ, Giesinger JM, Mutoke S, et al.", paperType: "observational", participants: 103,
    tldr: "Among 103 people with cancer in 12 Lubumbashi hospitals, 94% reported clinically important financial problems, and symptom burden was much higher than in matched Spanish patients.",
    summary: "Published as \"Health-related quality of life in patients with cancer in Lubumbashi/Democratic Republic of the Congo: a semi-structured qualitative and quantitative prospective cross-sectional study\". Patients were recruited in 12 hospitals in Lubumbashi, interviewed with healthcare professionals about what makes a health problem important, and assessed with the EORTC QLQ-C30 questionnaire against matched Spanish controls.",
    findings: [
      "103 patients with various cancers were assessed (mean age 54, 67% women).",
      "Clinically important problems ranged from 26.2% for fatigue to 94.1% for financial problems.",
      "Compared with 207 matched Spanish patients, the odds of a symptom problem ranged from 1.18 for insomnia to 28.0 for financial problems.",
    ],
    whatItMeans: "For people with cancer in Lubumbashi the cost of care is the most common serious problem, and better symptom management could ease much of the burden.",
    caveats: ["A small sample from one city.", "The comparison with Spain is exploratory."],
    institutions: ["cliniques-universitaires-de-lubumbashi"], cancers: ["breast-cancer", "cervical", "prostate"],
    links: [doi("10.1136/bmjopen-2025-114083", "BMJ Open 2026"), pubmed("42716684")] }),
];

/** Records behind /countries/cd/ (wave 6). */
export const recordsCD: EntityInput[] = [...institutions, ...papers];
