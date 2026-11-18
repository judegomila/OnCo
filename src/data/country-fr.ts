/**
 * France deep dive: the hand-written cards for /countries/fr/. Plain English first, detail second, every card with its
 * sources. Entity lists are pulled from the graph on the page by id so they stay in step with the corpus.
 *
 * Written from French primary sources read in French: INCa's Panorama des cancers en France, édition 2026 (dépôt légal
 * July 2026) and its pages on cancer.fr, the Bulletin épidémiologique hebdomadaire article that carries the national
 * incidence estimate, the HAS's pages on medicine assessment, economic evaluation and early access with its four-year
 * early-access report, the ANSM's pages on exceptional access, service-public.fr on the long-term condition scheme,
 * Unicancer's own pages, and INCa's annual clinical research survey. Every figure below was read from the raw page or
 * the PDF text, not from a summary of it.
 *
 * Counting conventions worth holding in mind:
 *  - incidence  modelled national estimate for metropolitan France in 2023, projected from local registry data
 *               observed to 2018; invasive cancers only, skin cancers other than melanoma excluded; the prostate
 *               figure is for 2018 because the 2019-2023 projection was too uncertain to publish
 *  - deaths     CépiDc (Inserm) cause-of-death data for 2023, as quoted by the Panorama
 *  - survival   five-year net survival, age-standardised, for people diagnosed 2010 to 2015
 *  - rates      "TSM" is the world age-standardised rate, so French rates can be set beside GLOBOCAN's, but the case
 *               definitions differ (see the registry cards)
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const FR_ASOF = "2026-11-03";

/** The sources cited from several cards. */
const PANORAMA = { label: "INCa, Panorama des cancers en France, édition 2026 (PDF)", url: "https://www.cancer.fr/content/download/141527/file/PANOKFR2026_Panorama%20des%20cancers%202026.pdf?version=3" };
const BEH_2023 = { label: "Lapôtre-Ledoux et al., Incidence des principaux cancers en France métropolitaine en 2023 (BEH 2023)", url: "https://beh.santepubliquefrance.fr/beh/2023/12-13/2023_12-13_1.html" };
const HAS_EVAL = { label: "HAS, Comprendre l'évaluation des médicaments", url: "https://www.has-sante.fr/jcms/c_412115/fr/comprendre-l-evaluation-des-medicaments" };
const HAS_ECO = { label: "HAS, Comprendre l'évaluation économique des produits de santé", url: "https://www.has-sante.fr/jcms/r_1502595/fr/evaluation-des-medicaments" };
const HAS_AAP = { label: "HAS, Accès précoce à un médicament", url: "https://www.has-sante.fr/jcms/r_1500918/fr/acces-precoce-a-un-medicament" };
const HAS_AAP_4Y = { label: "HAS, Bilan accès précoce à 4 ans (infographic, November 2025)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2025-11/dir7/bilan_aap_12_nov_v3.pdf" };
const HAS_AAP_PR = { label: "HAS, Accès précoce des médicaments : un bilan positif", url: "https://www.has-sante.fr/jcms/p_3470178/fr/acces-precoce-des-medicaments-un-bilan-positif-apres-deux-ans-de-mise-en-place-du-dispositif" };
const ANSM_ACCESS = { label: "ANSM, Encadrer l'accès précoce ou dérogatoire aux produits de santé", url: "https://ansm.sante.fr/qui-sommes-nous/nos-missions/faciliter-lacces-a-linnovation-therapeutique/p/encadrer-lacces-precoce-aux-produits-de-sante" };
const SP_ALD = { label: "Service-public.fr, Prise en charge d'une affection de longue durée (ALD)", url: "https://www.service-public.fr/particuliers/vosdroits/F34068" };
const AUTHORISATION = { label: "INCa, Le dispositif d'autorisation de traitement du cancer", url: "https://www.cancer.fr/professionnels-de-sante/l-organisation-de-l-offre-de-soins/les-etablissements-autorises-en-cancerologie/dispositif-d-autorisation-de-traitement-du-cancer" };
const RESEARCH_SURVEY = { label: "INCa, Enquête annuelle de recherche clinique en cancérologie", url: "https://www.cancer.fr/professionnels-de-la-recherche/enquetes-et-statistiques/enquete-annuelle-de-recherche-clinique-en-cancerologie" };
const ROADMAP_2026 = { label: "INCa, La seconde feuille de route 2026-2030", url: "https://www.cancer.fr/l-institut-national-du-cancer/la-strategie-de-lutte-contre-les-cancers-en-france/strategie-decennale-de-lutte-contre-les-cancers-2021-2030/le-cadre-national/la-seconde-feuille-de-route-2026-2030" };

export const FR_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "433,136 new cancers a year, with breast and prostate the commonest and lung cancer rising in women",
    plain: "France's national estimate is 433,136 new cancers in metropolitan France in 2023: 245,610 in men and 187,526 in women. Breast cancer is the commonest in women and prostate cancer in men, followed in both by bowel and lung cancer. Among women, lung and pancreatic cancer are both becoming more common.",
    detail: "The Panorama 2026 gives 433,136 new cases in 2023, 57 per cent in men, at world age-standardised rates of 354.9 per 100,000 in men and 274 in women; the median age at diagnosis was 70 in men and 68 in women. In women the leading cancers were breast (61,214 cases, 33 per cent), colon and rectum (21,370, 11 per cent), lung (19,339, 10 per cent) and pancreas (7,668, 4 per cent). In men they were prostate (59,885, 24 per cent, a 2018 figure), lung (33,438, 14 per cent), colon and rectum (26,212, 11 per cent) and pancreas (8,323, 3 per cent). Between 2019 and 2023 the age-standardised incidence of lung cancer in women rose by 3.6 per cent a year and of pancreatic cancer by 1.6 per cent a year, while the all-cancer rate in men was stable (plus 0.06 per cent a year). The estimate paper behind these figures finds that the annual number of new cancers has doubled since 1990 (up 98 per cent in men and 104 per cent in women), mainly through the growth and ageing of the population and secondarily through a rise in the risk of cancer, which counted for more in women than in men.",
    links: [PANORAMA, BEH_2023],
  },
  {
    id: "deaths",
    title: "164,314 cancer deaths in 2023: the first cause of death in men and the second in women",
    plain: "164,314 people died of cancer in France in 2023. Lung cancer killed the most men and breast cancer the most women. Cancer death rates are falling for most cancers; INCa names pancreatic cancer, and lung cancer in women, as the exceptions.",
    detail: "The Panorama, quoting the Inserm cause-of-death centre CépiDc, gives 164,314 cancer deaths in 2023, 91,380 in men and 72,934 in women, at world age-standardised mortality rates of 127.9 and 80.2 per 100,000, falling by 1.61 and 0.76 per cent a year between 2019 and 2023. Among men the leading causes were lung (20,468 deaths), prostate (9,002), colon and rectum (8,923), pancreas (6,645) and liver (6,272); among women breast (12,765), lung (10,699), colon and rectum (8,007), pancreas (6,730) and ovary (3,420). The Panorama says the overall decline reflects changes in which cancers occur, earlier diagnosis and treatment advances, with pancreas, and lung in women, the exceptions.",
    links: [PANORAMA, { label: "CépiDc (Inserm) open data", url: "https://opendata-cepidc.inserm.fr" }],
  },
  {
    id: "survival",
    title: "Survival depends on the cancer: above 85 per cent at five years for prostate, melanoma and breast, below 20 for pancreas, oesophagus and liver",
    plain: "Of people diagnosed between 2010 and 2015, the share alive five years later, counting only deaths from their cancer and adjusting for age, ranged from about nine in ten for prostate cancer, skin melanoma and breast cancer to about one in ten for pancreatic cancer. These are averages for people diagnosed more than ten years ago; treatment has changed since.",
    detail: "The Panorama gives age-standardised five-year net survival for people diagnosed 2010 to 2015 of 93 per cent for prostate cancer and for skin melanoma, 88 per cent for breast, 63 per cent for colon and rectum and for cervix, 43 per cent for ovary, 26 per cent for the central nervous system, 20 per cent for lung (24 in women, 18 in men), 18 per cent for liver, 17 per cent for oesophagus and 11 per cent for pancreas. INCa classes cancers with five-year net survival above 65 per cent as having a favourable prognosis and between 33 and 65 per cent as intermediate. The underlying survival study covers metropolitan registries for 1989 to 2018 and was published by INCa in July 2021.",
    links: [PANORAMA, { label: "Coureau et al., Survie des personnes atteintes de cancer en France métropolitaine 1989-2018 (INCa, 2021)", url: "https://www.cancer.fr/catalogue-des-publications" }],
  },
  {
    id: "children",
    title: "About 2,300 children and adolescents a year, counted by two national registries",
    plain: "Childhood cancer is counted everywhere in France: two national registries record every case in children and adolescents. About 1,847 children under 15 and 450 adolescents aged 15 to 17 are diagnosed each year.",
    detail: "The Registre national des cancers de l'enfant recorded 18,468 cancers in children aged 0 to 14 in France between 2014 and 2023, an average of 1,847 a year: leukaemias 517 (28 per cent), central nervous system tumours 487 (26.4 per cent), lymphomas 195 (10.6 per cent), sympathetic nervous system tumours 138 (7.5 per cent) and soft-tissue sarcomas 112 (6.1 per cent). Over the same years 4,497 cancers were registered in adolescents aged 15 to 17, about 450 a year, led by lymphomas (135 a year). For children diagnosed between 2000 and 2016, 92 per cent were alive one year and 83 per cent five years after diagnosis; for adolescents, 94 and 82 per cent. A first national study of adolescents and young adults aged 15 to 39 counted 54,735 diagnoses between 2000 and 2020 in 19 départements, with incidence rising by 1.62 per cent a year to 2014 and falling by 0.79 per cent a year from 2015 to 2020.",
    links: [PANORAMA, { label: "Registre national des cancers de l'enfant (Inserm): les chiffres", url: "https://rnce.inserm.fr/rnce/les-chiffres" }],
  },
  {
    id: "causes",
    title: "Tobacco, then alcohol: about four in ten cancers linked to avoidable causes",
    plain: "The study INCa relies on found that 41 per cent of cancers in adults in France in 2015, about 142,000 cases, were linked to causes that can be changed; INCa's Panorama rounds this to nearly half. Tobacco is linked to one cancer in five and alcohol to about one in twelve.",
    detail: "Using a 2018 study of cancers in metropolitan France in 2015, which puts the share attributable to the risk factors it studied at 41 per cent, the Panorama attributes 20 per cent of cancers to tobacco (68,000 cases), 8 per cent to alcohol (28,000), 5.4 per cent each to unbalanced diet and to excess weight (18,600), 4 per cent to certain infections, 3 per cent each to occupational exposures and to ultraviolet radiation, 1.8 per cent to ionising radiation and smaller shares to physical inactivity, hormone treatments, not breastfeeding and fine particles. Daily smoking among 18 to 75 year olds was 18 per cent in 2024, and the number of daily smokers fell by 28 per cent between 2021 and 2024. In 2021, 22 per cent of adults exceeded the national low-risk drinking guidelines on at least one measure. The Panorama adds that 21 per cent of colorectal cancers in people over 30 were directly linked to alcohol in 2015.",
    links: [PANORAMA, { label: "Marant-Micallef et al., cancers attribuables au mode de vie et à l'environnement en 2015 (BEH 2018)", url: "https://beh.santepubliquefrance.fr/beh/2018/21/2018_21_2.html" }],
  },
];

export const FR_REGISTRY: CountryCard[] = [
  {
    id: "local-registries",
    title: "No national count until now: 28 local registries covering about a fifth of the population, and a model",
    plain: "France has not counted every cancer. Its national figures are statistical estimates modelled from 28 local registries that cover between a fifth and a quarter of the population, which is why the latest national incidence figure is for 2023 but rests on cases observed up to 2018.",
    detail: "The Panorama says incidence data come from local registries designated by INCa: 28 in all, covering about 20 to 24 per cent of the population depending on the cancer, made up of 14 general registries, 10 specialised registries (by organ or entity) and 4 registries in the overseas departments of Guadeloupe, Martinique, French Guiana and La Réunion, where coverage of the population is complete. National figures are produced by statistical modelling of these registries' data. The estimates are made by a partnership of the Francim registry network, Santé publique France, INCa and the biostatistics service of the Hospices Civils de Lyon, which publishes a detailed study of incidence and mortality every five years; the 2023 estimate was projected from data observed from 1985 to 2018, and no projection was made for prostate or thyroid cancer, whose recent trends had changed, so their last year shown is 2018. Two national registries count childhood cancers across the whole territory, overseas included.",
    links: [PANORAMA, BEH_2023],
  },
  {
    id: "national-registry",
    title: "A national cancer registry created by law in June 2025, run by INCa",
    plain: "Law no. 2025-596 of 30 June 2025 created a national cancer registry, run by INCa. It is meant to record every cancer in France by linking the local registries with health insurance, hospital, death and screening data. Until it reports, the national figures remain estimates.",
    detail: "The Panorama calls 2025 a turning point. The registre national des cancers (RNC) is to collect all cancer cases nationally, using nine main sources named in the implementing decree, at least eight of them annually, including the local registries, the national health data system (SNDS) and other national databases such as causes of death, emergency care and disability, and screening, clinical and biological data specific to cancer. INCa is the sole data controller; data are pseudonymised, and researchers, public or private, will reach linked datasets after a favourable opinion from the registry's scientific and ethics committee and from CESREES, and CNIL authorisation where required. It builds on INCa's 2011 'cohorte cancer' extraction from SNDS and on its cancer data platform, which from 2019 to 2023 added the data of 27 local registries. The first national counts from it had not been published when this page was written.",
    links: [PANORAMA, { label: "INCa, Registre national des cancers", url: "https://www.cancer.fr/registre-national-des-cancers/le-catalogue-des-donnees" }],
  },
  {
    id: "comparing",
    title: "Why the French figure and GLOBOCAN 2024's differ by about 15,000 cases",
    plain: "GLOBOCAN 2024 estimates 421,655 new cancers in metropolitan France in 2024; the French estimate for 2023 is 433,136. The two do not count the same things: the French figure leaves out skin cancers other than melanoma, while GLOBOCAN's all-cancers figure includes them. GLOBOCAN puts those skin cancers at only 3,497, so without them its figure is 418,158, about 15,000 below the French one. The skin cancer rule does not explain the gap; the two are different models for different years.",
    detail: "The French national estimate counts invasive cancers only and excludes skin cancers other than melanoma, as its methods section states. GLOBOCAN's all-cancers figure for France, which the table on this page reproduces from the 2024 release, is its code 39, all cancers C00-C97, which includes them. Both describe metropolitan France only: GLOBOCAN labels its entry 'France (metropolitan)', and the French estimate is for metropolitan France. They refer to different years and are built by different models, and both are projections rather than counts. In the same 2024 file, GLOBOCAN's own count of non-melanoma skin cancer in France (its code 17) is 3,497, so its all-cancers figure without them is 418,158, which is 14,978 below the French estimate. Compare France with other countries on GLOBOCAN's figures from a single release, and read French trends from the French series.",
    links: [BEH_2023, { label: "GLOBOCAN 2024: France (metropolitan) fact sheet (IARC)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/250-france-metropolitan-fact-sheet.pdf" }],
  },
];

export const FR_SCREENING: CountryCard[] = [
  {
    id: "programmes",
    title: "Three organised screening programmes set up since 2004, with bowel screening below the European threshold",
    plain: "France invites people to organised screening for breast, bowel and cervical cancer. For cervical screening, a woman with an invitation letter has the laboratory analysis paid in full, while the consultation is reimbursed at 70 per cent of the agreed tariff. About six in ten eligible women take part in cervical screening and fewer than half in breast screening. Fewer than a third of eligible adults take part in bowel screening, below the 45 per cent the Panorama cites as the acceptable European threshold.",
    detail: "Breast: a mammogram every two years from 50 to 74; participation fell from a peak of 52.7 per cent in 2010-2011 to 46.3 per cent in 2023-2024, to which the Panorama adds 11 per cent of the target population screened individually; the programme found 41,759 breast cancers in 2021-2022. Tomosynthesis is not authorised within the organised programme. Bowel: a faecal immunochemical test every two years from 50 to 74, handed out by pharmacists and orderable online since 2022; participation was 30.7 per cent in 2024-2025 (31.8 in women, 29.6 in men), up from 29.6 per cent, and INCa is trialling posting the kit with the invitation. Cervix: a test every three years from 25 to 29 after two normal tests a year apart, then every five years from 30 to 65; INCa's page says that with an invitation letter the analysis of the test is paid in full with nothing to pay up front and the consultation is reimbursed at 70 per cent of the agreed tariff, and that without a letter the usual reimbursement rules apply; standardised participation was 59.5 per cent in 2020-2022, with only women not screened at the recommended interval sent an invitation, and about 32,000 precancerous lesions found a year.",
    links: [PANORAMA, { label: "INCa, Le dépistage du cancer du col de l'utérus en pratique", url: "https://www.cancer.fr/toute-l-information-sur-les-cancers/se-faire-depister/les-depistages/depistage-du-cancer-du-col-de-l-uterus/le-depistage-du-cancer-du-col-de-l-uterus-en-pratique" }],
  },
  {
    id: "lung",
    title: "Lung screening: a 20,000-person pilot opened in May 2026, before a national programme by 2030",
    plain: "France has no lung cancer screening programme yet. A national pilot called IMPULSION opened in May 2026 in five regions, offering low-dose CT scans and help to stop smoking to current and recent smokers aged 50 to 74. INCa's plan is to make lung screening a national programme by 2030.",
    detail: "After a call for projects in January 2025, INCa chose IMPULSION, coordinated by Professor Marie-Pierre Revel of the Paris public hospitals and Professor Sébastien Couraud of the Hospices Civils de Lyon, with 6 million euros. It aims to recruit 20,000 volunteers over 18 to 24 months in Île-de-France, Hauts-de-France, Pays de la Loire, Provence-Alpes-Côte d'Azur and Auvergne-Rhône-Alpes: smokers and people who stopped less than 15 years ago, aged 50 to 74, with at least 20 pack-years. Participants have two scans a year apart and then one every two years; the national health insurance covers the scans in full. INCa's 2026 to 2030 roadmap sets the goal of generalising organised lung screening by 2030.",
    links: [PANORAMA, { label: "ClinicalTrials.gov NCT07513818 (IMPULSION)", url: "https://clinicaltrials.gov/study/NCT07513818" }, ROADMAP_2026],
  },
];

/** The three organised programmes, as INCa's Panorama 2026 and its screening pages give them. */
export const FR_SCREENING_PROGRAMMES: Array<{ id: string; cancer: string; who: string; test: string; interval: string; participation: string; period: string }> = [
  { id: "breast", cancer: "Breast", who: "Women 50 to 74", test: "Mammogram", interval: "Every 2 years", participation: "46.3%", period: "2023-2024" },
  { id: "colorectal", cancer: "Colon and rectum", who: "Women and men 50 to 74", test: "Faecal immunochemical test", interval: "Every 2 years", participation: "30.7%", period: "2024-2025" },
  { id: "cervix", cancer: "Cervix", who: "Women 25 to 65", test: "Cervical sample (cytology or HPV test)", interval: "3 years from 25 to 29, then 5 years", participation: "59.5%", period: "2020-2022" },
  { id: "lung", cancer: "Lung (pilot)", who: "Smokers and recent ex-smokers 50 to 74, 20 pack-years", test: "Low-dose chest CT", interval: "Two scans a year apart, then every 2 years", participation: "Pilot opened May 2026", period: "2026-" },
];

export const FR_PAYING: CountryCard[] = [
  {
    id: "ald",
    title: "Cancer is a long-term condition: the health insurance pays 100 per cent of the official tariff",
    plain: "In France cancer is on the list of 'long-term conditions' (ALD 30). Once a doctor files a care protocol, the national health insurance covers cancer care at 100 per cent of its official tariff, with no co-payment. Some costs still fall on the patient: doctors' fees above the tariff, small flat charges, and the daily hospital charge, which a top-up insurance can cover.",
    detail: "Service-public.fr lists 'tumeur maligne (cancer), affection maligne du tissu lymphatique ou hématopoïétique' among the ALD 30 conditions, which are exempting: care related to the condition is reimbursed up to the ceiling with the ticket modérateur (patient co-payment) waived, once the care protocol opens the right to 100 per cent. A split prescription form separates care for the condition, paid at 100 per cent, from unrelated care, paid at the usual rates. What remains payable: excess fees above the agreed tariff (dépassements d'honoraires), the 2 euro flat contribution, the medical deductible (franchise médicale), the daily hospital charge (forfait hospitalier) and medicines rated of low clinical benefit (SMR faible). A complementary insurance can cover the hospital charge and excess fees. Transport linked to the condition is covered on prescription for patients who meet the criteria.",
    links: [SP_ALD],
  },
  {
    id: "spending",
    title: "29.3 billion euros a year on cancer care, and 5.6 billion on the costliest hospital medicines",
    plain: "The national health insurance puts the cost of cancer care at 29.3 billion euros in 2024. Cancer medicines paid on top of hospital tariffs cost 5.6 billion euros, most of it immunotherapy, and cancer medicines dispensed by community pharmacies 4.6 billion, most of it targeted therapy.",
    detail: "The Panorama, quoting the national health insurance fund (CNAM), gives 29.3 billion euros as the weight of cancer care in the national health insurance spending objective (ONDAM) for 2024, on a much wider scope than hospital data. For anticancer medicines in 2024 it gives 5.6 billion euros on the 'liste en sus', the list of costly innovative hospital medicines paid on top of the hospital tariff (82 per cent of it on immunotherapies, up 14.5 per cent on 2023), 4.6 billion dispensed in community pharmacies (66 per cent on targeted therapies, up 11.1 per cent) and 241 million dispensed by hospital pharmacies to outpatients (rétrocession, down 40.3 per cent). The same page prints a figure of 7.4 billion euros for 2024, up 6.9 per cent, whose label in the brochure does not match the breakdown beside it, so it is not used here. Hospital spending on cancer rose by nearly 7 per cent in 2024. About 1.4 million people were treated specifically for cancer in acute hospital care in 2024; 437,735 had cancer surgery, 403,400 systemic drug treatment, 137,470 radiotherapy in the public sector and 128,000 in the private sector. In 2023, 90,466 patients received checkpoint inhibitors and 1,173 CAR-T cells.",
    links: [PANORAMA],
  },
];

export const FR_ASSESSMENT: CountryCard[] = [
  {
    id: "smr-asmr",
    title: "The HAS rates each medicine twice: is it worth reimbursing (SMR), and how much better is it (ASMR I to V)",
    plain: "After a medicine is licensed, the Haute Autorité de Santé's Transparency Committee gives it two ratings, indication by indication. The first, the SMR, decides whether it should be reimbursed at all. The second, the ASMR, grades from I to V how much it improves on what already exists, and that grade feeds into the price the government negotiates.",
    detail: "The HAS page says the Commission de la transparence (CT) gives an opinion on the service médical rendu (SMR), graded important, moderate, low or insufficient; an insufficient SMR means the committee recommends against reimbursement. The SMR rests on the severity of the disease, the medicine's efficacy and side effects and its place in treatment. The amélioration du service médical rendu (ASMR) is graded from I to V, V meaning no progress over what is available, and is one of the criteria used to set the price. Opinions are given per medicine and per indication, so one indication can be reimbursed and another not. The committee is made up of doctors, pharmacists and methodologists and includes members drawn from patient and user associations; associations can submit written contributions on each medicine, which are published with the opinion. Prices are then negotiated by the Comité économique des produits de santé (CEPS).",
    links: [HAS_EVAL],
  },
  {
    id: "economic",
    title: "An economic opinion for the most promising and costliest medicines, but no published cost-per-QALY threshold",
    plain: "When a company claims a major, important or moderate improvement (ASMR I, II or III) for a medicine expected to sell at least 20 million euros a year, or for any advanced therapy such as a gene or cell therapy, a second HAS committee assesses its cost-effectiveness. The HAS publishes no cost-per-year-of-healthy-life figure above which a medicine is refused: the opinion goes to the price negotiators as an aid.",
    detail: "Under article R161-71-3 of the social security code and a HAS college decision of 23 June 2022, an economic evaluation by the Commission d'évaluation économique et de santé publique (CEESP) is required at listing when the company claims ASMR I, II or III and a significant impact on health insurance spending, defined as any advanced therapy medicinal product, or forecast second-year sales in the indication of 20 million euros or more, or a claimed impact on how care is organised. A budget impact analysis is also required under the 2021 framework agreement between CEPS and the industry body LEEM when forecast second-year sales exceed 50 million euros. The CEESP estimates an incremental cost-effectiveness ratio (ratio différentiel coût-résultat, RDCR) and sends its opinion to CEPS as an aid to negotiating the price. The HAS page on economic evaluation describes the ratio and its uncertainty and states no threshold value. The CEESP's doctrine, dated July 2021, says that the public decision-maker in France does not at present regulate prices by reference to a particular efficiency value, and that the committee may describe a ratio as high, very high or extremely high, case by case.",
    links: [HAS_ECO, { label: "HAS, Doctrine de la CEESP (July 2021, PDF)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2021-09/doctrine_de_la_ceesp.pdf" }],
  },
];

export const FR_REGULATOR: CountryCard[] = [
  {
    id: "who-licenses",
    title: "New cancer medicines are licensed for the whole EU; France decides access and price",
    plain: "A new cancer medicine reaches France through the European Medicines Agency, whose centralised procedure is compulsory for cancer medicines with a new active substance. The French medicines agency, the ANSM, takes part in that process and runs France's own exceptional-access routes, while the HAS and the CEPS decide whether and at what price the health insurance pays.",
    detail: "The EMA states that the centralised procedure is compulsory for human medicines containing a new active substance to treat cancer, as well as for biotechnology products and advanced therapies, so the marketing authorisation for a new cancer drug is a European Commission decision valid across the EU. The ANSM describes itself as the public body that gives access to health products in France and keeps them safe throughout their life cycle, with 1,000 staff at three sites, Saint-Denis, Lyon and Montpellier-Vendargues; it says it gives scientific advice on medicines in development through the EMA's scientific advice working party. After European authorisation, a medicine still needs a HAS opinion and a price negotiated with the CEPS before it is reimbursed in France. How long those steps take is not given on this page (see the gaps); the early-access route below exists to pay for promising medicines in the meantime.",
    links: [{ label: "EMA, Authorisation of medicines: scope of the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" }, { label: "ANSM, Qui sommes-nous", url: "https://ansm.sante.fr/qui-sommes-nous/" }, ANSM_ACCESS, HAS_EVAL],
  },
  {
    id: "early-access",
    title: "Early access: paid for before the price is agreed, with cancer the largest area of use",
    plain: "Since July 2021 France lets patients with serious diseases and no good alternative receive a presumed-innovative medicine, paid for by the health insurance, before it has a reimbursed price, and sometimes before it is licensed. In its first four years 152 first requests were granted, 75 of them in oncology, and more than 140,000 patients were treated this way.",
    detail: "The 2021 social security financing law replaced the earlier temporary authorisations and temporary recommendations for use (ATU and RTU) with two regimes: accès précoce, decided by the HAS, and accès compassionnel, run by the ANSM. Early access requires four conditions: a serious, rare or disabling disease; no appropriate treatment; treatment that cannot be deferred; and a medicine presumed innovative. It covers medicines authorised but not yet reimbursed, and medicines not yet authorised whose company commits to apply, in which case the ANSM must first give a binding opinion on efficacy and safety unless the EMA's CHMP has already given a favourable one. The legal time limit for a decision is 90 days. The HAS four-year report, for 1 July 2021 to 30 June 2025, counts 394 decisions, of which 223 on first requests (94 before and 129 after marketing authorisation): 152 favourable (68 per cent) and 71 unfavourable. Of the 152, 75 were in oncology and 12 in haematology. The median time to decide a first request was 80 days, and medicines stayed in early access for an average of 17 months (510 days) before ordinary reimbursement. The HAS reports more than 140,000 patients treated, and that 80 per cent of products later rated ASMR I to III in the ordinary procedure had already been available through early access. A decree of 3 June 2026 (no. 2026-448), in force from 1 September 2026, led the HAS to revise its guidance and application forms.",
    links: [HAS_AAP, HAS_AAP_4Y, HAS_AAP_PR, HAS_EVAL],
  },
  {
    id: "compassionate",
    title: "Compassionate access for one named patient, and compassionate prescribing frameworks",
    plain: "Where no company is developing a medicine for a use, a doctor can ask the ANSM for compassionate access for a named patient, for one year at a time. Where an approved medicine is widely used outside its label, the ANSM can set a three-year framework that makes that use safer to prescribe.",
    detail: "The ANSM issues autorisations d'accès compassionnel (AAC) at the request of a doctor or hospital for a named patient, for medicines mainly not intended to be marketed in that indication and not under development or review there, valid for one year and renewable; where the medicine is being developed commercially, compassionate supply is tied to the company's commitment to apply for early access. A cadre de prescription compassionnelle (CPC), for three renewable years, covers an authorised medicine used in practice for other situations, provided no other treatment meets the need and the data suggest a favourable balance of benefit and risk. The ANSM publishes a reference list of medicines under exceptional access.",
    links: [ANSM_ACCESS, { label: "ANSM, Référentiel des spécialités en accès dérogatoire", url: "https://ansm.sante.fr/documents/reference/medicaments-en-acces-derogatoires" }],
  },
];

export const FR_DOING: CountryCard[] = [
  {
    id: "authorisation",
    title: "Every hospital that treats cancer needs a licence, and every patient's case goes to a tumour board",
    plain: "In France a hospital or private clinic cannot treat cancer without a specific authorisation from its regional health agency. To keep it, it must discuss every patient's case at a multidisciplinary meeting, give a written care plan, offer access to tumour genetic testing and trials, and reach a minimum yearly volume for certain treatments. 826 establishments held an authorisation in 2024.",
    detail: "INCa describes the regime, defined in 2007 and recast by decrees no. 2022-689 and 2022-693 of 26 April 2022, as resting on three pillars: cross-cutting quality criteria, criteria specific to each treatment modality (cancer surgery, external radiotherapy and brachytherapy, systemic drug treatment), and minimum annual activity thresholds for some treatments and cancers. Authorised establishments must discuss each patient's file in a réunion de concertation pluridisciplinaire (RCP), announce the diagnosis and the treatment proposal according to INCa's protocol and give the patient a personalised care programme, belong to a regional cancer network (DSRC), organise supportive and palliative care, favour access to innovative treatments and trials, and be, or cooperate with, a hospital molecular genetics platform recognised by INCa so that tumour genetic tests can be done. Every child under 18 must be discussed at an interregional paediatric tumour board, and suspected rare cancers must be operated on within the rare-cancer networks. INCa's argument for volume thresholds cites a 2014 study of 11,865 patients in which high-volume hospitals and surgeons improved survival in advanced ovarian cancer. The Panorama counts 826 authorised establishments in 2024.",
    links: [AUTHORISATION, PANORAMA],
  },
  {
    id: "right-to-be-forgotten",
    title: "The right to be forgotten: no need to declare a cancer for a loan five years after treatment",
    plain: "Under France's AERAS agreement, someone who finished active cancer treatment at least five years ago without relapse does not have to declare the cancer when taking out loan insurance for a mortgage, a business loan or a consumer loan, as long as the insurance ends before their 71st birthday.",
    detail: "The droit à l'oubli applies to any cancer, whatever its site or type, if the treatment protocol ended at least five years earlier (the end of active treatment by surgery, radiotherapy or drugs, even if hormone therapy or immunotherapy continues), there has been no relapse, and the insurance contract ends before the borrower's 71st birthday. The person then declares neither the cancer nor the long-term condition status and is insured with no surcharge or exclusion. For people who do not qualify, the AERAS reference grid lists conditions, cancerous or not, that carry no or little excess risk and should be insured at or near the standard rate. The AERAS convention is signed by the government, banks, insurers and patient and consumer associations.",
    links: [{ label: "INCa, Emprunter après un cancer", url: "https://www.cancer.fr/personnes-malades/droits-et-demarches/emprunter-apres-un-cancer" }],
  },
  {
    id: "genomics",
    title: "Whole-genome sequencing inside the national health system",
    plain: "France has put genome sequencing into routine care through a national plan, PFMG2025, with 239 million euros invested since 2016. By the end of 2023 it had returned 3,109 results for people with cancer, typically within about six weeks.",
    detail: "The programme's own report, in The Lancet Regional Health - Europe in 2025, says France was one of the first countries to integrate genome sequencing into clinical practice nationwide, starting with rare diseases, cancer genetic predisposition and cancers. By 31 December 2023 it had returned 12,737 results for rare disease and predisposition patients (median 202 days, diagnostic yield 30.6 per cent) and 3,109 for cancer patients (median 45 days). A 2026 study of 120 people with liver cancers that had stopped responding to treatment, sequenced through the programme, found an actionable alteration in 67 of 103 interpretable genomes; 31 received a matched drug and the disease was controlled in 10.",
    links: [{ label: "PFMG2025 contributors, Lancet Reg Health Eur 2025", url: "https://doi.org/10.1016/j.lanepe.2024.101183" }, { label: "Campani et al., J Hepatol 2026", url: "https://doi.org/10.1016/j.jhep.2026.03.019" }],
  },
  {
    id: "clcc",
    title: "Hospitals that do nothing but cancer: the 18 Centres de lutte contre le cancer",
    plain: "Alongside its university and private hospitals, France has a network of 18 non-profit hospitals devoted entirely to cancer, the Centres de lutte contre le cancer, federated with two affiliated members as Unicancer. Gustave Roussy, Institut Curie and Centre Léon Bérard are among them. Unicancer also sponsors academic cancer trials across the network.",
    detail: "Unicancer's site describes itself as the only French hospital network dedicated 100 per cent to cancer, bringing together the 18 CLCCs and two affiliated establishments, with more than 25,500 staff; the federation marked its sixtieth anniversary in 2024. It sponsors academic trials across the network and runs Harmonie, a health data warehouse that links real-world clinical data from its centres to the national health data system (SNDS), with twenty years of history. INCa's clinical research survey found that 33 per cent of patients included in cancer studies in France in 2024 were included in CLCCs.",
    links: [{ label: "Unicancer, Le réseau Unicancer", url: "https://www.unicancer.fr/fr/" }, { label: "Unicancer, Qui sommes-nous", url: "https://www.unicancer.fr/fr/groupe-unicancer/qui-sommes-nous/" }, { label: "Unicancer, Les Centres de lutte contre le cancer", url: "https://www.unicancer.fr/fr/groupe-unicancer/les-centres-de-lutte-contre-le-cancer/" }, { label: "Unicancer, La recherche sur les données de santé", url: "https://www.unicancer.fr/fr/espace-recherche/la-recherche-sur-les-donnees-de-sante/" }, RESEARCH_SURVEY],
  },
  {
    id: "strategy",
    title: "One state cancer agency and a ten-year strategy",
    plain: "Since 2004 France has had a single state agency for cancer, INCa, which runs the national strategy, helps organise screening, sets the criteria hospitals must meet to treat cancer, funds research and now runs the national registry. Its ten-year strategy for 2021 to 2030 is in its second half.",
    detail: "INCa was created by the public health law of 9 August 2004 and implements the ten-year cancer control strategy 2021-2030, launched by the President of the Republic around four priorities: prevention, limiting after-effects and improving quality of life, poor-prognosis cancers, and making sure progress reaches everyone. INCa reports that 212 of the strategy's 237 actions had been started between 2021 and 2025, and more than 70 of them finished. The second roadmap, for 2026 to 2030, sets five priorities, including a 'prevention generation' starting in early childhood, screening for everyone with organised lung screening generalised by 2030, and an 'augmented' care pathway with faster diagnosis for poor-prognosis cancers. INCa also labels research sites: its page lists eight integrated cancer research sites (SIRIC): CARPEM, CURAMUS, Curie, EpiCURE, ILIAD, InSiTu, LYriCAN+ and Montpellier Cancer.",
    links: [PANORAMA, ROADMAP_2026, { label: "INCa, Les SIRIC", url: "https://www.cancer.fr/professionnels-de-la-recherche/nos-actions-de-recherche/recherche-translationnelle/les-siric" }],
  },
];

export const FR_RESEARCH: CountryCard[] = [
  {
    id: "trial-participation",
    title: "70,530 patients joined cancer studies in 2024, most of them academic",
    plain: "INCa's yearly survey of hospitals counted 3,665 open cancer studies in France in 2024 and 70,530 patients included in them, 44,690 in interventional trials. 86 per cent of inclusions were in studies sponsored by academic institutions rather than companies.",
    detail: "The survey, a declaration by university hospitals, CLCCs, general hospitals and private establishments, counts every cancer study open to inclusion or in follow-up. In 2024 it recorded 3,665 studies, 71 per cent multicentre and 44 per cent international, and 70,530 patients included: 44,690 in interventional trials, 60,455 in studies of solid tumours and 9,657 in haematology. Half the inclusions were in university hospitals (CHU), 33 per cent in CLCCs, 9 per cent in private establishments and 8 per cent in general hospitals. 1,366 children, adolescents and young adults were included, 97 per cent in academic trials, and the university hospitals of Martinique, Guadeloupe and La Réunion included 478 patients. INCa reports inclusions up by more than 22 per cent between 2021 and 2024.",
    links: [RESEARCH_SURVEY],
  },
  {
    id: "groups",
    title: "Cooperative groups that changed practice",
    plain: "French academic groups ran trials including PRODIGE 4 and PRODIGE 24, which tested FOLFIRINOX in pancreatic cancer, PRIMA, which tested rituximab maintenance in follicular lymphoma, the PEACE-1 prostate trial and the LMS-04 sarcoma trial. They are listed below as OnCo holds them.",
    detail: "The trial list below includes PRODIGE 4/ACCORD 11, PRODIGE 24, PRODIGE 23, PRODIGE 7, GETUG-AFU 15 and 17, GETUG 13, PEACE-1 and SAFIR-ABC10 (Unicancer), PRIMA, REMARC and AHL2011 (LYSA), IFM 2009 and CASSIOPEIA (Intergroupe Francophone du Myélome), ALFA-0701, MAPS (IFCT), PAOLA-1 (ARCAGY-GINECO), TPExtreme and NIVOPOSTOP (GORTEC), LAP07 (GERCOR), LMS-04 (French Sarcoma Group), and CARMENA and GRAALL-2005 (Paris public hospitals). Each record links to its registry entry and to its primary paper where the corpus has it.",
    links: [{ label: "Unicancer: trials sponsored by Unicancer", url: "https://www.unicancer.fr/fr/espace-recherche/la-recherche-clinique/" }],
  },
];

export const FR_GAPS: CountryCard[] = [
  {
    id: "not-reached",
    title: "What could not be read",
    plain: "Two sources a French page should rest on refused a script, and could not be re-read on 17 November 2026: the national health insurance site ameli.fr and the health ministry site that carries the CEPS pricing committee's annual report. The figures they hold are not on this page. The PFMG2025 programme site, which had also refused, now answers.",
    detail: "ameli.fr and assurance-maladie.ameli.fr answered with a human-verification page, so the number of people in the cancer long-term condition scheme, and the CNAM report the Panorama quotes for 29.3 billion euros, were not read at source; the 29.3 billion figure is quoted from the Panorama. sante.gouv.fr served a human-verification page, so CEPS's annual report, which gives price-negotiation times, was not read, and this page gives no figure for the time from European authorisation to French reimbursement. pfmg2025.aviesan.fr served a JavaScript wall when this page was written; in November 2026 it redirects to pfmg2025.fr and answers, but its home page describes the plan without the figures used here, so the genomics card still relies on the programme's peer-reviewed report. The HAS early-access figures are from its own report and infographic; there is no French public figure on this page for how many of those decisions were for cancer medicines later rated ASMR I to III.",
    links: [],
  },
  {
    id: "corpus",
    title: "Records that should be in this corpus and are not",
    plain: "OnCo still lacks records for Inserm, the Francim registry network, the CEPS, the national health insurance, the Assistance Publique-Hôpitaux de Paris as a whole, the cancéropôles and the CLIP² early-phase centres, and for the SeqOIA and AURAGEN sequencing laboratories. French-language trial registries, notably INCa's own registry of cancer trials, have not been read into the corpus.",
    detail: "This page adds the ANSM, Santé publique France and the Hospices Civils de Lyon, the national incidence estimate paper, the PFMG2025 programme report and its liver cancer study, and the IMPULSION lung screening pilot. The largest remaining gap is the trial record: OnCo's trials come mainly from ClinicalTrials.gov, while INCa runs its own registry of cancer trials open in France, and EU trials since 2023 are registered in CTIS. The 2024 survey counted 3,665 open cancer studies in France; OnCo's own count of trials with a French sponsor, or linked to a French institution, company or cooperative group, is about 200. The people list is weighted towards those who lead institutions and groups, because they are the people the corpus reached through institutional lists.",
    links: [{ label: "INCa, Registre des essais cliniques", url: "https://www.cancer.fr/personnes-malades/registre-des-essais-cliniques" }],
  },
  {
    id: "not-said",
    title: "What this page does not claim",
    plain: "It does not rank French cancer care against other countries. French and international survival studies use different periods and methods, and the French incidence and GLOBOCAN figures are built differently; setting them side by side would mislead.",
    detail: "The survival figures are for people diagnosed between 2010 and 2015 and are national averages; they say nothing about an individual's outlook. The incidence figures are modelled, and the national registry created in 2025 has not yet published a count. Participation figures for screening come from different periods for each programme, as the table shows.",
    links: [PANORAMA],
  },
];

export const FR_INSTITUTIONS = [
  "gustave-roussy", "institut-curie", "centre-leon-berard", "institut-bergonie", "institut-paoli-calmettes", "iuct-oncopole", "icm-montpellier", "ico-angers-nantes",
  "centre-oscar-lambret", "centre-antoine-lacassagne", "centre-francois-baclesse", "centre-jean-perrin", "centre-georges-francois-leclerc", "institut-de-cancerologie-de-lorraine",
  "centre-henri-becquerel", "centre-eugene-marquis", "institut-godinot", "institut-sainte-catherine", "institut-strauss", "hospices-civils-de-lyon", "aphp-nord-cancer-institute",
  "iuc-aphp-sorbonne", "carpem-aphp-centre", "henri-mondor", "aphp-paris-saclay-cancer-institute", "ap-hm-timone", "chu-lille", "chu-nantes", "inca", "has-france", "ansm",
  "sante-publique-france", "iarc", "institut-pasteur", "fondation-arc", "ligue-contre-le-cancer",
];
export const FR_COMPANIES = [
  "unicancer", "lysa", "ifm", "ifct", "gercor", "gortec", "arcagy-gineco", "french-sarcoma-group", "alfa", "filo", "itcc",
  "sanofi", "servier", "ipsen", "pierre-fabre", "curium", "orano-med", "advanced-accelerator-applications", "guerbet", "owkin", "bioptimus", "cellectis", "nanobiotix",
  "transgene", "ose-immunotherapeutics", "maat-pharma", "therapanacea", "quantum-surgical", "theryq", "carthera", "bpifrance", "sofinnova-partners", "jeito-capital",
];
export const FR_DRUGS = ["docetaxel", "cabazitaxel", "isatuximab", "vinorelbine", "ivosidenib", "vorasidenib", "trifluridine-tipiracil", "tusamitamab-ravtansine", "alphamedix", "lu177-psma-it"];
export const FR_TRIALS = [
  "impulsion", "peace-1", "prodige-4-accord-11", "prodige-24", "prodige-23", "prodige-7", "getug-afu-15", "getug-afu-17", "getug-13", "safir-abc10", "lung-art", "ialt", "maps",
  "paola-1", "alfa-0701", "ifm-2009", "cassiopeia", "prima-follicular", "remarc", "ahl2011", "lyma", "lms-04", "nivopostop", "tpextreme", "lap07", "estimabl2", "carmena",
  "graall-2005", "mosaic", "winther",
];
export const FR_PAPERS = [
  "paper-lapotre-ledoux-incidence-france-2023-beh", "paper-pfmg2025-genomic-medicine-france-lancet-reg-health-eur-2025", "paper-campani-pfmg2025-liver-cancer-j-hepatol-2026",
  "paper-conroy-folfirinox-pancreatic-nejm-2011", "paper-prodige-24-adjuvant-mfolfirinox-pancreatic-nejm-2018", "paper-conroy-prodige-23-neoadjuvant-folfirinox-rectal-lancet-oncol-2021",
  "paper-quenet-prodige-7-hipec-peritoneal-colorectal-lancet-oncol-2021", "paper-peace-1-lancet-2022", "paper-gravis-getug-afu-15-docetaxel-lancet-oncol-2013", "paper-paola-1-nejm-2019",
  "paper-ifm-2009-attal-nejm-2017", "paper-estimabl2-leboulleux-nejm-2022", "paper-lms-04-doxorubicin-trabectedin-lancet-oncol-2022", "paper-ahl2011-pet-adapted-treatment-advanced-hodgkin-lancet-oncol-2019",
  "paper-lyma-rituximab-maintenance-after-transplant-mantle-cell-nejm-2017", "paper-prima-rituximab-maintenance-follicular-lancet-2011", "paper-pages-immunoscore-international-validation-lancet-2018",
  "paper-mosaic-oxaliplatin-adjuvant-colon-nejm-2004", "paper-tpextreme-lancet-oncol-2021", "paper-ucart19-allogeneic-car-t-lancet-2020",
];
export const FR_PEOPLE = [
  "fabrice-barlesi", "fabrice-andre", "jean-charles-soria", "benjamin-besse", "karim-fizazi", "laurence-zitvogel", "caroline-robert", "aurelien-marabelle", "jean-yves-blay",
  "thierry-conroy", "thierry-andre", "isabelle-ray-coquard", "michel-attal", "philippe-moreau", "herve-dombret", "catherine-thieblemont", "franck-morschhauser",
  "francois-clement-bidard", "olivier-delattre", "christophe-le-tourneau", "pierre-laurent-puig", "antoine-italiano", "martin-schlumberger", "gilles-vassal",
  "jacques-grill", "joel-guigay", "suzette-delaloge", "nicolas-scotte",
];
