import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Belgium: the public bodies and the paper behind /countries/be/ (wave 5) that the corpus did not hold. Every record
 * was written from the body's own pages or publications, read raw on 11 November 2026: the Belgian Cancer Registry's
 * Cancer Fact Sheets 2024 (PDF, pdftotext) and its history, mission and staff pages; the pages of the National Institute
 * for Health and Disability Insurance (RIZIV-INAMI) in French; the pages of the Federal Agency for Medicines and Health
 * Products (FAMHP) in English, until its site answered with a bot challenge; the Belgian Health Care Knowledge Centre's
 * own pages; the Flemish Centre for Cancer Detection's infosheet on screening year 2023 and its site; and the Walloon
 * screening centre's site and the registry's Walloon breast screening memento. The paper was resolved through Europe
 * PMC and its abstract read.
 *
 * Coordinates are city points, stated as such, not street addresses.
 *
 * Inbound links: the registry, the insurer, the regulator and the knowledge centre link one another through
 * `institutions`; the two screening centres are linked from the registry; the paper is a key paper of the registry and
 * of the Flemish screening centre. The existing records for the Foundation against Cancer, Kom op tegen Kanker and the
 * cancer centres are reused, not duplicated.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const BCR_CFS_ALL = "https://kankerregister.org/sites/default/files/2026/2026_BE_CFS2024_ALL_0_1.pdf";
const BCR_NEWS_2024 = "https://kankerregister.org/en/news/belgian-cancer-registry-publishes-new-figures-more-78000-new-cancer-diagnoses-recorded-first";
const BCR_HISTORY = "https://kankerregister.org/en/history";
const BCR_MISSION = "https://kankerregister.org/en/mission";
const BCR_CONC = "https://kankerregister.org/en/news/concentration-care-bears-fruit-better-outcomes-after-pancreatic-and-oesophageal-surgery";
const INAMI_PARTNERS = "https://www.inami.fgov.be/fr/l-inami/nos-partenaires";
const INAMI_MAF = "https://www.inami.fgov.be/fr/themes/soins-de-sante-cout-et-remboursement/facilites-financieres/types-de-maximum-a-facturer-maf";
const INAMI_REFORM = "https://www.inami.fgov.be/fr/themes/soins-de-sante-cout-et-remboursement/les-prestations-de-sante-que-vous-rembourse-votre-mutualite/medicaments/reformer-les-procedures-de-remboursement-des-medicaments";
const INAMI_EEFA = "https://www.inami.fgov.be/fr/actualites/un-acces-plus-rapide-aux-medicaments-innovants-grace-a-la-procedure-early-and-equitable-fast-access-eefa";
const INAMI_UMN = "https://www.inami.fgov.be/fr/themes/soins-de-sante-cout-et-remboursement/les-prestations-de-sante-que-vous-rembourse-votre-mutualite/fonds-special-de-solidarite/intervention-dans-le-cadre-d-un-besoin-medical-non-rencontre-unmet-medical-need";
const INAMI_BNLA = "https://www.inami.fgov.be/fr/l-inami/nos-collaborations-internationales/initiative-beneluxa";
const FAMHP_CUP = "https://www.famhp.be/en/human_use/medicines/medicines/research_development/compassionate_use_medical_need";
const FAMHP_2025 = "https://www.famhp.be/en/news/ensuring_access_to_treatments_today_while_preparing_for_those_of_tomorrow";
const FAMHP_CT = "https://www.famhp.be/en/human_use/medicines/medicines/research_development/clinical_trials";
const KCE_MISSION = "https://kce.fgov.be/en/about-us/what-is-kce/missions-and-values";
const KCE_WHY = "https://kce.fgov.be/en/about-us/what-is-kce/why-a-belgian-healthcare-knowledge-centre";
const KCE_MGMT = "https://kce.fgov.be/en/about-us/what-is-kce/our-management";
const CVKO_2023 = "https://dikkedarmkanker.bevolkingsonderzoek.be/sites/default/files/2024-12/CVK24-027%20Verkorte%20Jaarfiche_DDK-BK-BHK%282024%29-DEF%28Hires%29.pdf";
const CVKO_ABOUT = "https://bevolkingsonderzoek.be/nl/bevolkingsonderzoek/over-ons";
const CCREF = "https://www.ccref.org/";
const MEMENTO_WAL = "https://kankerregister.org/sites/default/files/2026/Memento%20evaluation%20depistage%20cancer%20du%20sein%202021-2024%20Wallonie.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "belgian-cancer-registry", name: "Belgian Cancer Registry (Stichting Kankerregister / Fondation Registre du Cancer)", aka: ["BCR", "Stichting Kankerregister", "Fondation Registre du Cancer", "Kankerregister", "Belgian Cancer Registry"],
    city: "Brussels", country: "BE", lat: 50.85, lng: 4.35, institutionType: "research-institute", website: "https://kankerregister.org",
    tldr: "Belgium's national population-based cancer registry, a public benefit foundation set up in 2005. Hospitals and pathology laboratories must report every cancer to it, and it registered 78,697 new cancers in Belgium in 2024.",
    summary: "The Belgian Cancer Registry was established on 28 June 2005 in a partnership between the federal and regional governments, combining the earlier Flemish cancer registration network and the National Cancer Registry founded in 1983, according to its own history page. It has data for Flanders since 1999 and for the whole of Belgium since 2004. Participation in cancer registration became mandatory in 2003, when the multidisciplinary oncology consultation and oncology care programmes were introduced nationally; the registry's mission page gives article 39 of the act of 13 December 2006 as the legal basis of its tasks. It is a public benefit foundation, and its data come from the hospitals' oncology care programmes, the pathology laboratories and, for vital status, the Crossroads Bank for Social Security.\n\nIts Cancer Fact Sheet 2024 counts 78,697 new invasive cancers in 2024 (all sites except non-melanoma skin cancer, with myelodysplastic syndromes and myeloproliferative neoplasms included), 25,836 cancer deaths in 2023 and a five-year net survival of 70.6%. The registry also computes the quality indicators of the three regions' screening programmes, and it analyses the data that hospitals must submit under the national insurer's agreements that concentrated complex pancreatic and oesophageal surgery in reference centres from 2019.",
    programs: ["National population-based cancer registration (since 2004; Flanders since 1999)", "Cancer Fact Sheets by site", "Evaluation of the regional screening programmes", "Quality of care studies", "Cancer incidence projections to 2035", "BBMRI.be national biobank node"],
    cancers: ["breast-cancer", "prostate", "lung-cancer", "colorectal"],
    institutions: ["riziv-inami", "kce-belgium", "centrum-voor-kankeropsporing", "ccref-wallonia", "kom-op-tegen-kanker", "foundation-against-cancer-belgium"],
    people: ["liesbet-van-eycken"], keyPapers: ["paper-de-troeyer-flemish-breast-screening-mortality-2023"],
    links: [
      { label: "Belgian Cancer Registry: Cancer Fact Sheet 2024, all invasive tumours (PDF)", url: BCR_CFS_ALL },
      { label: "Belgian Cancer Registry: more than 78,000 new cancer diagnoses (23 July 2026)", url: BCR_NEWS_2024 },
      { label: "Belgian Cancer Registry: history", url: BCR_HISTORY },
      { label: "Belgian Cancer Registry: mission", url: BCR_MISSION },
    ] }),

  i({ id: "riziv-inami", name: "National Institute for Health and Disability Insurance (RIZIV-INAMI)", aka: ["RIZIV", "INAMI", "NIHDI", "Rijksinstituut voor ziekte- en invaliditeitsverzekering", "Institut national d'assurance maladie-invalidité"],
    city: "Brussels", country: "BE", lat: 50.85, lng: 4.35, institutionType: "government", website: "https://www.inami.fgov.be",
    tldr: "The federal body that runs Belgium's compulsory health insurance. The sickness funds pay patients back under its rules; it decides with them which medicines are reimbursed, and since January 2026 it runs an early access route for innovative medicines.",
    summary: "RIZIV-INAMI manages the compulsory health care and benefits insurance. Its own pages describe the system as one of negotiation: the sickness funds (mutualités), which reimburse care and pay benefits, the care providers, employers and trade unions sit on its committees, and the insurance is 75% financed by social security contributions. A patient pays a personal share (ticket modérateur) for many services, capped each year by the maximum billing scheme (MàF), whose ceiling depends on household income; it is fixed at 450 euros (indexed) for households with increased reimbursement, lowered in 2022 to 250 euros for the lowest-income households, and reduced by 100 euros (indexed) for a household with a chronic patient.\n\nFor medicines, its Commission for the Reimbursement of Medicines advises on reimbursement, and confidential agreements under articles 81 and 111 are concluded for some innovative medicines; since 2024 the public parts of those agreements are published in a web application. A reform roadmap approved in January 2024 brought patient representatives into the Commission from 1 April 2025, started the Early and Equitable Fast Access procedure on 1 January 2026, under which the insurance pays a temporary flat amount per patient for a medicine a company provides free, and plans an added-value classification from 1 January 2027. Its Special Solidarity Fund can pay for an innovative medicine in an unmet medical need cohort. With the Netherlands, Luxembourg, Austria and Ireland it runs the BeNeLuxA collaboration on joint assessment and negotiation. It also funds the multidisciplinary oncology consultation, the concentration of complex pancreatic and oesophageal surgery in reference centres, and a temporary agreement covering about fifty unreimbursed medicines for children with cancer from 2024 to 2026.",
    programs: ["Compulsory health care insurance", "Maximum billing (MàF)", "Commission for the Reimbursement of Medicines (CRM)", "Article 81 and 111 agreements for innovative medicines", "Early and Equitable Fast Access (from 1 January 2026)", "Special Solidarity Fund and unmet medical need cohorts", "BeNeLuxA initiative", "Multidisciplinary oncology consultation (COM/MOC)", "Reference centres for complex pancreatic and oesophageal surgery"],
    terms: ["hta"], institutions: ["kce-belgium", "famhp", "belgian-cancer-registry"],
    links: [
      { label: "RIZIV-INAMI: nos partenaires (French)", url: INAMI_PARTNERS },
      { label: "RIZIV-INAMI: types de maximum à facturer (French)", url: INAMI_MAF },
      { label: "RIZIV-INAMI: réformer les procédures de remboursement des médicaments (French)", url: INAMI_REFORM },
      { label: "RIZIV-INAMI: Early and Equitable Fast Access, 23 September 2025 (French)", url: INAMI_EEFA },
      { label: "RIZIV-INAMI: Fonds spécial de solidarité, Unmet Medical Need (French)", url: INAMI_UMN },
      { label: "RIZIV-INAMI: initiative BeNeLuxA (French)", url: INAMI_BNLA },
    ] }),

  i({ id: "famhp", name: "Federal Agency for Medicines and Health Products (FAMHP)", aka: ["FAMHP", "AFMPS", "FAGG", "Agence fédérale des médicaments et des produits de santé", "Federaal agentschap voor geneesmiddelen en gezondheidsproducten"],
    city: "Brussels", country: "BE", lat: 50.85, lng: 4.35, institutionType: "government", website: "https://www.famhp.be",
    tldr: "Belgium's medicines regulator. It authorises clinical trials in Belgium under the European regulation, approves compassionate use and medical need programmes that give patients a medicine before it is on the market, and monitors side effects.",
    summary: "The FAMHP is the competent authority for medicines and health products in Belgium; new cancer medicines are authorised centrally for the whole European Union, so its role for them lies mainly in trials, early access and safety. Its compassionate use and medical need programmes follow the Royal Decree of 25 April 2014, in force from 1 July 2014; its page lists the authorised programmes, which in November 2026 included trastuzumab deruxtecan for HER2-positive (IHC 3+) solid tumours with no satisfactory treatment options and niraparib with abiraterone for metastatic hormone-sensitive prostate cancer with BRCA1/2 mutations. A medicine already in such a programme is one of the two routes into the national insurer's Early and Equitable Fast Access procedure. For trials it points patients to the EU clinical trials database and publishes a quarterly dashboard of initial applications decided in Belgium under the clinical trials regulation.\n\nIts announcement of its 2025 annual report, dated 19 October 2026, gives 654 staff, names Hugues Malonne as chief executive officer, and says that 2025 was marked by the case of a sperm donor carrying a TP53 gene mutation, which affected many families and led the agency to analyse how protection could be strengthened.",
    programs: ["Clinical trial authorisation under the EU regulation", "Compassionate use and medical need programmes (Royal Decree of 25 April 2014)", "Pharmacovigilance", "Medicine availability and shortages"],
    drugs: ["trastuzumab-deruxtecan", "niraparib", "abiraterone"], institutions: ["riziv-inami", "ema"], people: ["hugues-malonne"],
    links: [
      { label: "FAMHP: compassionate use and medical need programmes", url: FAMHP_CUP },
      { label: "FAMHP: clinical trials for human medicines", url: FAMHP_CT },
      { label: "FAMHP: 2025 annual report announcement (19 October 2026)", url: FAMHP_2025 },
    ] }),

  i({ id: "kce-belgium", name: "Belgian Health Care Knowledge Centre (KCE)", aka: ["KCE", "Federaal Kenniscentrum voor de Gezondheidszorg", "Centre fédéral d'expertise des soins de santé", "Belgian Healthcare Knowledge Centre"],
    city: "Brussels", country: "BE", lat: 50.85, lng: 4.35, institutionType: "government", website: "https://kce.fgov.be",
    tldr: "Belgium's independent federal research centre that advises policymakers on health care and health insurance, including health technology assessment. Set up in 2003, it advises but does not decide.",
    summary: "The KCE describes itself as an independent research centre that gives scientific advice on health care to policymakers, on topics generally submitted by the authorities, including the Minister and Ministry of Public Health and RIZIV-INAMI, and by universities and professional associations. It was established in 2003, after the idea arose in 2002 in the cabinet of the then Minister of Social Affairs, Frank Vandenbroucke, and published its first reports in 2004; it names NICE, the Haute Autorité de Santé and the Zorginstituut Nederland as comparable bodies. It states that it is strictly advisory and not involved in decisions, so decision-makers may choose not to follow its recommendations, and that as a type B parastatal body it has a high degree of independence from the federal authorities that fund it.\n\nIts management page names Ann Van den Bruel as general director. The national insurer cites its 2015 report on better managed off-label use of medicines on the page that explains the temporary reimbursement of unlicensed medicines for children with cancer, and the Belgian Cancer Registry lists it among the partners it works with.",
    programs: ["Health technology assessment", "Health services research", "Good clinical practice guidelines"],
    terms: ["hta"], institutions: ["riziv-inami", "belgian-cancer-registry"],
    links: [
      { label: "KCE: missions and values", url: KCE_MISSION },
      { label: "KCE: why a Belgian Healthcare Knowledge Centre?", url: KCE_WHY },
      { label: "KCE: our management", url: KCE_MGMT },
    ] }),

  i({ id: "centrum-voor-kankeropsporing", name: "Centrum voor Kankeropsporing (CvKO)", aka: ["CvKO", "Centre for Cancer Detection", "Flemish Centre for Cancer Detection", "Bevolkingsonderzoek Vlaanderen"],
    city: "Bruges", country: "BE", lat: 51.209, lng: 3.225, institutionType: "consortium", website: "https://bevolkingsonderzoek.be",
    tldr: "The scientific centre that runs Flanders' three cancer screening programmes for the Flemish government: breast, cervical and bowel. In 2023 about two thirds of each target group were covered by screening of some kind.",
    summary: "The CvKO describes itself as a scientific expertise centre responsible, on behalf of the Flemish government, for the early detection of breast, cervical and colorectal cancer in Flanders; its administrative seat is in Bruges. Its quality indicators are calculated with the Belgian Cancer Registry, following the European guidelines.\n\nIts infosheet on screening year 2023, published in 2024 with the registry and the Flemish Department of Care, describes three programmes. Breast: since 15 June 2001 every woman aged 50 to 69 is invited every two years, with an appointment already proposed in the letter, and each mammogram is read by two radiologists; 434,268 invitations were sent in 2023 and total coverage in the target group of 896,559 was 65.6%. Bowel: run since October 2013, and since 2020 everyone aged 50 to 74 receives a stool test kit by post every two years; 51.9% of those invited took part in 2023 (436,927 people), 6.2% had an abnormal result, and total coverage was 64.0% of 2,148,358 people. Cervical: women aged 25 to 64 who are not screened on their own initiative every three years are invited; coverage was 66.1% of 1,744,891 women. The infosheet notes that among breast screening participants in 2022, 1,135 breast cancers were found, and it cites the registry's case-referent study finding a 51% lower risk of breast cancer death among participants.",
    programs: ["Bevolkingsonderzoek Borstkanker (breast, 50 to 69, every two years)", "Bevolkingsonderzoek Dikkedarmkanker (bowel, FIT, 50 to 74, every two years)", "Bevolkingsonderzoek Baarmoederhalskanker (cervical, 25 to 64)"],
    cancers: ["breast-cancer", "colorectal", "cervical"], technologies: ["mammography", "colorectal-screening"],
    institutions: ["belgian-cancer-registry", "kom-op-tegen-kanker"], related: ["screening-bel-colorectal"],
    keyPapers: ["paper-de-troeyer-flemish-breast-screening-mortality-2023"],
    links: [
      { label: "CvKO, BCR and Departement Zorg: infosheet, screening year 2023 (PDF, Dutch)", url: CVKO_2023 },
      { label: "Bevolkingsonderzoek: over ons (Dutch)", url: CVKO_ABOUT },
    ] }),

  i({ id: "ccref-wallonia", name: "Centre de Coordination et de Référence pour le dépistage des cancers (CCRef)", aka: ["CCRef", "Walloon cancer screening coordination centre"],
    city: "Mont-Saint-Guibert", country: "BE", lat: 50.634, lng: 4.611, institutionType: "consortium", website: CCREF,
    tldr: "The non-profit body that runs Wallonia's breast, bowel and cervical cancer screening programmes. In 2023 only 4% of eligible Walloon women had their mammogram inside its breast programme; 44% were screened outside it.",
    summary: "The CCRef describes itself as an approved non-profit association (asbl) responsible for steering the breast, colorectal and cervical cancer screening programmes in Wallonia, with its tasks set by the Walloon Government's order (arrêté) of 25 January 2024 on preventive medicine programmes against cancer; its registered office is in Mont-Saint-Guibert. It organises breast screening by mammography every two years for women aged 50 to 69, with the Walloon health agency AVIQ, and the Belgian Cancer Registry calculates the programme's indicators.\n\nThe registry's memento on the Walloon breast programme for screening years 2021 to 2024 gives 482,922 eligible women in 2023, of whom 4% were covered inside the organised programme and 44% by screening outside it, leaving 52% not covered; total coverage was 48.4% in 2023 and, provisionally, 50.3% in 2024. In 2023, 22.1% of first screening mammograms and 8.9% of later ones were positive, against European recommendations of under 7% and under 5%, and 85 cancers were detected in the programme.",
    programs: ["Breast cancer screening (Mammotest, 50 to 69)", "Colorectal cancer screening", "Cervical cancer screening"],
    cancers: ["breast-cancer", "colorectal", "cervical"], technologies: ["mammography"],
    institutions: ["belgian-cancer-registry"],
    links: [
      { label: "CCRef: présentation (French)", url: CCREF },
      { label: "Belgian Cancer Registry: memento, breast screening in Wallonia 2021 to 2024 (PDF, French)", url: MEMENTO_WAL },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-de-troeyer-flemish-breast-screening-mortality-2023", name: "The effect of the Flemish breast cancer screening program on breast cancer-specific mortality: A case-referent study",
    journal: "Cancer Epidemiology", year: 2023, doi: "10.1016/j.canep.2022.102320", pmid: "36608495",
    authors: "De Troeyer K, Silversmit G, Rosskamp M, Truyen I, Van Herck K, Goossens MM, et al.", paperType: "observational", participants: 7855,
    tldr: "A Belgian Cancer Registry study found that women who took part in the Flemish breast screening programme had about half the risk of dying of breast cancer of women who did not, even where many women are screened privately.",
    summary: "A case-referent study of the population-based mammography screening programme introduced in Flanders in 2001, in a setting with high levels of opportunistic screening. It compared participation in the programme in the four years before (pseudo)diagnosis between women who died of breast cancer from 2005 to 2017 and randomly selected referents, using multiple logistic regression adjusted for individual socio-economic position and calendar year of diagnosis, stratified by age, with sensitivity analyses and a correction for self-selection.",
    findings: [
      "1,571 cases and 6,284 referents were identified.",
      "Participants had a 51% lower risk of breast cancer-specific death than non-participants (adjusted odds ratio 0.49, 95% CI 0.44 to 0.55).",
      "Correction for self-selection bias reduced the effect size, but the estimate remained significant.",
    ],
    whatItMeans: "Even where many women already have mammograms outside the programme, taking part in the organised programme was associated with a substantially lower risk of dying of breast cancer. The authors say this should be weighed against the harms of screening, including overdiagnosis and overtreatment.",
    caveats: ["An observational case-referent design, not a randomised trial; self-selection can only be partly corrected.", "This record summarises the abstract."],
    cancers: ["breast-cancer"], technologies: ["mammography"], institutions: ["belgian-cancer-registry", "centrum-voor-kankeropsporing"],
    links: [{ label: "Cancer Epidemiology 2023", url: "https://doi.org/10.1016/j.canep.2022.102320" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/36608495/" }] }),
];

/** Records behind /countries/be/ (wave 5). */
export const recordsBE: EntityInput[] = [...institutions, ...papers];
