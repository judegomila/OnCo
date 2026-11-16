import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Denmark: the public bodies and papers behind /countries/dk/ (wave 7) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: Sundhedsdatastyrelsen's 2024 incidence tables by
 * municipality, its survival report for 2010 to 2024 and its quarterly monitoring of cancer pathways for the first
 * quarter of 2026 (PDF text), its analysis "Kræftområdet: Udvikling 2013-2023" for Kræftplan V (PDF text),
 * Sundhedsstyrelsen's pages on the national cancer plans (read through the Internet Archive, as sst.dk answered a plain
 * request with a browser check), the June and November 2025 agreements on Kræftplan V between the government, Danske
 * Regioner and KL (PDF text), Medicinrådet's about pages, terms of reference, severity principle and 2026 news pages,
 * the Danish Medicines Agency's English pages, Statens Serum Institut's childhood vaccination page and its 2017 annual
 * report (PDF text), and the DCCC and DMCG.dk websites. DOIs were resolved through Europe PMC and the figures in
 * `findings` are taken from the indexed abstracts.
 *
 * Inbound links: Sundhedsstyrelsen links the registry, the data authority, the Medicines Council, the Medicines Agency,
 * Statens Serum Institut, DCCC and DMCG.dk; the registry links its methods paper and the vaccination programme links the
 * HPV effectiveness paper through Statens Serum Institut. The Danish Cancer Society, the cooperative groups DBCG and
 * DAHANCA and the university hospitals already exist and are reused, not duplicated. Coordinates are street or district
 * points for the Copenhagen addresses the sources give, not building positions; DCCC and DMCG.dk are national networks
 * placed at an approximate Copenhagen point.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const SDS_INC_2024 = "https://cdn1.gopublic.dk/sundhedsdatastyrelsen/Media/638938615398782138/Nye%20kr%C3%A6fttilf%C3%A6lde%202024,%20fordelt%20p%C3%A5%20kommuner%20(udgivet%2025.%20juni%202025).pdf";
const SDS_SURV = "https://cdn.sundhedsdatastyrelsen.dk/sundhedsdatastyrelsen/Media/639076903175066575/kraeftoverlevelse-i-danmark-2010-2024.pdf";
const SDS_DEV = "https://cdn1.gopublic.dk/sundhedsdatastyrelsen/Media/638955202737604757/Udvikling%20p%C3%A5%20kr%C3%A6ftomr%C3%A5det%202013-2023,%20Kr%C3%A6ftplan%20V%20(udgivet%2015.%20januar%202025).pdf";
const SDS_MON = "https://cdn1.gopublic.dk/sundhedsdatastyrelsen/Media/639168548108232079/monitorering-af-kraeftomraadet-1-kvartal-2026.pdf";
const SST_KP5_WB = "https://web.archive.org/web/2026/https://www.sst.dk/da/Fagperson/Sygdomme-lidelser-og-behandling/Kraeftsygdom/Kraeftplaner/Kraeftplan-V";
const SST_PLANS_WB = "https://web.archive.org/web/2026/https://www.sst.dk/da/Fagperson/Sygdomme-lidelser-og-behandling/Kraeftsygdom/Kraeftplaner";
const KPV_2026 = "https://medcom.dk/wp-content/uploads/2026/08/Bilag-2-Udmoentningsaftale-om-Kraeftplan-V-2026-og-frem.pdf";
const KPV_2025 = "https://www.ism.dk/Media/638926676927162662/KPV-udmoentningsaftale-2025.pdf";
const MR_ABOUT = "https://medicinraadet.dk/om-os";
const MR_EN = "https://medicinraadet.dk/om-os/in-english";
const MR_TOR = "https://filer.medicinraadet.dk/media/nvmdgxqu/medicinradet-kommissorium-version-1-7.pdf";
const MR_SEVERITY = "https://filer.medicinraadet.dk/media/weanjjre/medicinr%C3%A5dets-anvendelse-af-alvorlighedsprincippet-januar-2021.pdf";
const MR_PRINCIPLES = "https://filer.medicinraadet.dk/media/1oxfmhsz/ad-pkt-4-folketingets-7-principper-for-prioritering-af-sygehuslaegemidler_final-a.pdf";
const MR_OCT = "https://medicinraadet.dk/nyheder/2026/overblik-medicinradets-beslutninger-i-oktober-2026";
const DKMA_ABOUT = "https://laegemiddelstyrelsen.dk/en/about/";
const DKMA_THRESH = "https://laegemiddelstyrelsen.dk/en/reimbursement/reimbursement-thresholds/";
const SSI_CHILD = "https://www.ssi.dk/vaccinationer/boernevaccination";
const SSI_2017 = "https://www.ssi.dk/-/media/arkiv/dk/vaccination/boernevaccinationsprogrammet/aarsrapporten_for_2017.pdf";
const DCCC_EN = "https://www.dccc.dk/english/about-dccc/";
const DCCC_DA = "https://www.dccc.dk/om-dccc/baggrund/";
const DMCG_OM = "https://www.dmcg.dk/om-dmcg/";

const institutions: InstitutionInput[] = [
  i({ id: "sundhedsstyrelsen", name: "Sundhedsstyrelsen (Danish Health Authority)", aka: ["Danish Health Authority", "SST", "Sundhedsstyrelsen"],
    city: "Copenhagen", country: "DK", lat: 55.664, lng: 12.577, institutionType: "government", website: "https://www.sst.dk",
    tldr: "Denmark's national health authority. It wrote professional proposals for the national cancer plans, of which there have been five since 2000, describes the cancer patient pathways and their standard times, and reports to the ministry on how the latest plan is being carried out.",
    summary: "Sundhedsstyrelsen, at Islands Brygge 67 in Copenhagen, is the national health authority. Its pages list five national cancer plans: Kræftplan I (2000), II (2005), III (2010), IV (2016) and V (2025). Kræftplan II focused on organising the patient pathway, which led to the cancer patient pathways (pakkeforløb); Kræftplan III, agreed in November 2010, added a diagnostic pathway for people with non-specific symptoms that could be cancer and revised every pathway; Kræftplan IV, the Patients' Cancer Plan, set the goal that survival in 2025 should match the best of Denmark's Nordic neighbours.\n\nFor Kræftplan V the authority prepared a professional proposal with regions, municipalities, patient organisations and clinicians, with 11 recommendations, after a working process from December 2023 to October 2024. The government published Kræftplan V on 23 May 2025 with 36 initiatives and three goals and set aside 600 million kroner a year from 2025. Under the November 2025 agreement with Danske Regioner and KL, the regions report each year from 2026 to 2030 to Sundhedsstyrelsen, which reports in turn to the ministry. The coordinates are an approximate street point.",
    programs: ["National cancer plans I to V", "Cancer patient pathways (pakkeforløb) and standard pathway times", "Recommendations for the national screening programmes", "Annual reporting on Kræftplan V (2026 to 2030)"],
    institutions: ["danish-cancer-registry", "sundhedsdatastyrelsen", "medicinraadet", "danish-medicines-agency", "statens-serum-institut", "dccc-denmark", "dmcg-denmark", "danish-cancer-society"],
    cancers: ["lung-cancer", "breast-cancer", "colorectal", "cervical"], related: ["cancer-registries-surveillance"], technologies: ["low-dose-ct-screening"],
    links: [
      { label: "Sundhedsstyrelsen: Kræftplan V (Internet Archive copy; sst.dk asked for a browser check)", url: SST_KP5_WB },
      { label: "Sundhedsstyrelsen: Nationale kræftplaner (Internet Archive copy)", url: SST_PLANS_WB },
      { label: "Udmøntningsaftale om Kræftplan V (2026 og frem), 27 November 2025 (PDF)", url: KPV_2026 },
      { label: "Udmøntningsaftale om Kræftplan V (2025), June 2025 (PDF)", url: KPV_2025 },
    ] }),

  i({ id: "sundhedsdatastyrelsen", name: "Sundhedsdatastyrelsen (Danish Health Data Authority)", aka: ["Danish Health Data Authority", "SDS"],
    city: "Copenhagen", country: "DK", lat: 55.633, lng: 12.578, institutionType: "government", website: "https://sundhedsdatastyrelsen.dk",
    tldr: "Denmark's health data authority. It holds the national health registers, including the Danish Cancer Registry, the National Patient Register and the cause of death register, and publishes the yearly counts of new cancers, survival and the quarterly waiting-time monitoring of cancer pathways.",
    summary: "Sundhedsdatastyrelsen, at Ørestads Boulevard 5 in Copenhagen, publishes Denmark's official cancer statistics from the national registers. Its yearly report on new cancers for 2024, published on 25 June 2025, counts 24,794 men and 23,664 women with a new cancer from the Danish Cancer Registry. Its survival report for 2010 to 2024, dated 26 February 2026, gives five-year age-standardised relative survival of 74% for women and 71% for men diagnosed in 2022 to 2024 (all cancers except non-melanoma skin cancer); the calculations were made by the Danish Cancer Society for the authority.\n\nEach quarter it publishes the share of cancer pathways completed within the standard pathway time, from the National Patient Register: 80% nationally in the first quarter of 2026, ranging from 73% in Region Sjælland to 85% in Region Hovedstaden. In January 2025 it published an analysis of the cancer area from 2013 to 2023 as a contribution to Kræftplan V, which recorded 160,137 cancer pathways in 2023 and found that 26 to 30% of pathways each year confirmed the suspected cancer. The coordinates are an approximate street point.",
    programs: ["Danish Cancer Registry (Cancerregisteret)", "National Patient Register (Landspatientregisteret)", "Cause of death register", "Quarterly monitoring of cancer pathways", "Yearly reports on new cancers and cancer survival"],
    institutions: ["danish-cancer-registry", "sundhedsstyrelsen", "danish-cancer-society"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Nye kræfttilfælde i Danmark 2024, fordelt på kommuner (25 June 2025, PDF)", url: SDS_INC_2024 },
      { label: "Kræftoverlevelse i Danmark 2010-2024 (26 February 2026, PDF)", url: SDS_SURV },
      { label: "Monitorering af kræftområdet 1. kvartal 2026 (12 June 2026, PDF)", url: SDS_MON },
      { label: "Kræftområdet: Udvikling 2013-2023 (15 January 2025, PDF)", url: SDS_DEV },
    ] }),

  i({ id: "danish-cancer-registry", name: "Danish Cancer Registry (Cancerregisteret)", aka: ["Cancerregisteret", "Danish Cancer Register", "DCR"],
    city: "Copenhagen", country: "DK", lat: 55.633, lng: 12.578, institutionType: "government", website: "https://sundhedsdatastyrelsen.dk",
    tldr: "Denmark's national cancer registry, founded in 1942 with data from 1943. It recorded 24,794 men and 23,664 women with a new cancer in 2024, and it is linked through the personal identity number to the patient, death and population registers.",
    summary: "The Danish Cancer Registry was founded in 1942 and holds data on cancer incidence in the Danish population since 1943. A 2011 description in the Scandinavian Journal of Public Health reports that its validity rests on manual quality control, an automated coding logic and multiple notifications from different sources, and that by 2008 reporting had become electronic through integration with hospital administrative systems. It is held by Sundhedsdatastyrelsen; the coordinates are those of the authority's address, approximately.\n\nFor 2024 the registry counted 24,794 men and 23,664 women with a new cancer, excluding basal cell skin cancer; the commonest groups were prostate cancer in men (4,446) and breast cancer in women (5,389); lung cancer came next in women (2,783), while in men skin cancer other than melanoma (3,119) and urinary tract cancer (2,740) were each counted more often than lung cancer (2,394). Its groupings for brain and urinary tract tumours include some benign and uncertain tumours (ICD-10 D codes) as well as malignant ones. Age-standardised rates are given per 100,000 against the Danish population of 2000, not the World standard. Survival is calculated from the registry linked with the Central Person Register; five-year relative survival for lung cancer rose from 19% to 38% in women and from 13% to 27% in men between 2010 to 2012 and 2022 to 2024.",
    programs: ["National cancer incidence since 1943", "Yearly incidence report and municipal tables", "Relative survival by cancer and region", "Data for NORDCAN and GLOBOCAN"],
    institutions: ["sundhedsdatastyrelsen", "iarc", "danish-cancer-society"], cancers: ["prostate", "breast-cancer", "lung-cancer", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-gjerstorff-danish-cancer-registry-sjph-2011"],
    links: [
      { label: "Nye kræfttilfælde i Danmark 2024, fordelt på kommuner (Sundhedsdatastyrelsen, PDF)", url: SDS_INC_2024 },
      { label: "Kræftoverlevelse i Danmark 2010-2024 (Sundhedsdatastyrelsen, PDF)", url: SDS_SURV },
      doi("10.1177/1403494810393562", "Gjerstorff, The Danish Cancer Registry (Scand J Public Health 2011)"),
      { label: "NORDCAN (IARC and the Association of the Nordic Cancer Registries)", url: "https://nordcan.iarc.fr/en" },
    ] }),

  i({ id: "medicinraadet", name: "Medicinrådet (Danish Medicines Council)", aka: ["Danish Medicines Council", "Medicinraadet"],
    city: "Copenhagen", country: "DK", lat: 55.705, lng: 12.594, institutionType: "government", website: "https://medicinraadet.dk",
    tldr: "The council set up by Denmark's five regions in 2017 to decide which new hospital medicines, including cancer medicines, become standard treatment. It weighs benefit against the price Amgros negotiates, can accept a higher cost for very severe disease, and can recommend a drug under a risk-sharing deal.",
    summary: "Medicinrådet was established on 1 January 2017 by the board of Danske Regioner, replacing two earlier regional councils, RADS (from 2009) and KRIS (from 2012). Its terms of reference say it recommends to the five regions whether new medicines and new indications should be taken into use, on the basis of price negotiations and tenders by Amgros, that its recommendations are not binding on the regions, and that its decisions cannot be appealed to another administrative authority. The Council has up to 18 members, including a member from each region, representatives of the medical societies and two patient representatives, with observers from the pharmaceutical industry association, Sundhedsstyrelsen, the Danish Medicines Agency and Amgros; more than 50 expert committees with more than 500 members prepare its assessments. Its address is Dampfærgevej 21-23, Copenhagen; the coordinates are an approximate street point.\n\nIt works to seven principles for prioritising hospital medicines that the parties in the Folketing agreed in March 2016, among them that a medicine with well-documented added effect should not be rejected on cost alone and that there must be a reasonable relation between its price and its added value. Since its founding it has had a mandate to weigh severity: in particular cases it may accept higher costs, or recommend a medicine on weaker evidence than it normally requires, for example for disease with unusually early death or where the medicine is the only real curative treatment. In 2025 it received 81 applications from companies, against 66 in 2024. In October 2026 it recommended trastuzumab deruxtecan, under a risk-sharing agreement, for HER2-positive cancer of the stomach and gastro-oesophageal junction and for a group of people with lung cancer carrying a particular genetic change, and did not recommend sacituzumab govitecan for a group of previously treated breast cancer patients because it judged the cost not acceptable for the effect.",
    programs: ["Assessment of new hospital medicines and indications", "Treatment guidelines and medicine recommendations", "Severity principle", "Risk-sharing recommendations with Amgros"],
    institutions: ["sundhedsstyrelsen", "danish-medicines-agency"], drugs: ["trastuzumab-deruxtecan", "sacituzumab-govitecan", "brexucabtagene-autoleucel", "mogamulizumab", "teclistamab", "ciltacabtagene-autoleucel"],
    terms: ["hta"], people: ["birgitte-klindt-poulsen", "soren-gaard"],
    links: [
      { label: "Medicinrådet: om os", url: MR_ABOUT },
      { label: "Medicinrådet: in English", url: MR_EN },
      { label: "Kommissorium for Medicinrådet, version 1.7 (PDF)", url: MR_TOR },
      { label: "Princippapir om prioritering for sygehuslægemidler, 31 March 2016 (PDF)", url: MR_PRINCIPLES },
      { label: "Medicinrådets anvendelse af alvorlighedsprincippet (PDF)", url: MR_SEVERITY },
      { label: "Medicinrådet: decisions in October 2026", url: MR_OCT },
    ] }),

  i({ id: "danish-medicines-agency", name: "Lægemiddelstyrelsen (Danish Medicines Agency)", aka: ["Danish Medicines Agency", "DKMA", "Lægemiddelstyrelsen", "Laegemiddelstyrelsen"],
    city: "Copenhagen", country: "DK", lat: 55.657, lng: 12.578, institutionType: "government", website: "https://laegemiddelstyrelsen.dk",
    tldr: "Denmark's medicines regulator. It licenses medicines for the Danish market, authorises clinical trials, monitors side effects and decides which prescription medicines are eligible for reimbursement; new cancer medicines are approved for Denmark through the EU's centralised procedure.",
    summary: "The Danish Medicines Agency, at Axel Heides Gade 1 in Copenhagen, has around 650 employees. By its own description it authorises and inspects pharmaceutical companies and licenses medicinal products in the Danish market, monitors adverse reactions, authorises clinical trials, decides which medicines are eligible for reimbursement, monitors medical devices, and appoints and supervises pharmacies; it does most of this in cooperation with the other EU regulators. The coordinates are an approximate street point.\n\nNew medicines with a new active substance for cancer must be evaluated by the European Medicines Agency under the EU centralised procedure, and the resulting authorisation covers Denmark. The Agency also sets the reimbursement steps for prescription medicines bought at a pharmacy: in 2026 an adult pays the full price for the first 1,135 kroner in a twelve-month period, with 50%, 75% and 85% reimbursement above that, and full reimbursement once spending passes 22,596 kroner, so that the most an adult pays in co-payment is 4,850 kroner. Terminally ill patients who choose to spend their last time at home or in a hospice can have prescribed medicine expenses covered.",
    programs: ["Marketing authorisation (national and EU procedures)", "Clinical trial authorisation", "Pharmacovigilance", "Reimbursement of prescription medicines", "Reimbursement for the terminally ill"],
    institutions: ["ema", "medicinraadet", "sundhedsstyrelsen"],
    links: [
      { label: "Danish Medicines Agency: about us", url: DKMA_ABOUT },
      { label: "Danish Medicines Agency: reimbursement thresholds 2026", url: DKMA_THRESH },
      { label: "Danish Medicines Agency: individual reimbursement", url: "https://laegemiddelstyrelsen.dk/en/reimbursement/individual-reimbursement/" },
    ] }),

  i({ id: "statens-serum-institut", name: "Statens Serum Institut", aka: ["SSI", "Statens Serum Institut (Denmark)"],
    city: "Copenhagen", country: "DK", lat: 55.666, lng: 12.594, institutionType: "government", website: "https://www.ssi.dk",
    tldr: "Denmark's national institute for infectious disease control and vaccination. It runs the national vaccination register and the reminders for the childhood programme, which has included HPV vaccine for girls since 2009 and for boys since 2019.",
    summary: "Statens Serum Institut monitors uptake of the Danish childhood vaccination programme through the Danish Vaccination Register and has sent reminder letters to parents since May 2014. HPV vaccine entered the programme for girls in 2009 (from 1 October 2008, quadrivalent vaccine) and for boys in 2019; the nine-valent vaccine has been used since 1 November 2017. The institute states that about 328 cases of HPV-associated cervical cancer are seen in Denmark each year. The coordinates are an approximate city point.\n\nUptake fell in 2015 and 2016. The programme's annual report for 2017, written by Sundhedsstyrelsen, the Danish Medicines Agency and the institute, records that Sundhedsstyrelsen launched the information campaign \"Stop HPV, stop livmoderhalskræft\" in May 2017 with the Danish Cancer Society and the Danish Medical Association, and that first-dose coverage among 14-year-old girls (born 2003) rose to 68% in 2017 from 47% at the same point in 2016. WHO's estimates for the primary target cohort of girls put Denmark's coverage at 47% in 2016 and 89 to 92% from 2020 to 2025. A national register study of 867,689 women found that vaccination at 16 or younger cut the rate of cervical cancer to 0.14 times that of unvaccinated women.",
    programs: ["Danish childhood vaccination programme", "HPV vaccination (girls from 2009, boys from 2019)", "Danish Vaccination Register and reminder letters"],
    institutions: ["sundhedsstyrelsen", "danish-medicines-agency", "danish-cancer-society"], cancers: ["cervical"], technologies: ["hpv-vaccine"],
    keyPapers: ["paper-kjaer-hpv-vaccine-cervical-cancer-denmark-jnci-2021"],
    links: [
      { label: "Statens Serum Institut: børnevaccination", url: SSI_CHILD },
      { label: "Årsrapport for børnevaccinationsprogrammet 2017 (PDF)", url: SSI_2017 },
      { label: "WHO Global Health Observatory: HPV coverage, girls (SDGHPVRECEIVED), Denmark", url: "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'DNK'" },
    ] }),

  i({ id: "dccc-denmark", name: "Danish Comprehensive Cancer Center (DCCC)", aka: ["DCCC", "Danish Comprehensive Cancer Center"],
    city: "Copenhagen (national network)", country: "DK", lat: 55.676, lng: 12.568, institutionType: "consortium", website: "https://www.dccc.dk/english/",
    tldr: "A national, partly virtual collaboration on cancer research set up in 2017 under Kræftplan IV by the health ministry and Danske Regioner. Twelve national research centres have been set up by the Danish Cancer Society, the regions and DCCC working together.",
    summary: "The Danish Comprehensive Cancer Center describes itself as a national, binding collaboration on cancer research. It was established in 2017 as part of Kræftplan IV by the then Ministry of Health and Senior Citizens (Sundheds- og Ældreministeriet) and Danske Regioner, and is organised as one national, partly virtual centre with the regions' health directors as its board, a steering group, a scientific committee and a secretariat. Its aims are to strengthen national collaboration across research fields and sectors, speed the implementation of research results across the country and raise and even out quality in diagnosis, treatment and follow-up. It states that twelve national research centres have been established through collaboration between the Danish Cancer Society, the regions and DCCC, supported with 203 million kroner raised through the Danish Cancer Society's Knæk Cancer campaign, and it runs the yearly Danish Cancer Research Days. Under the November 2025 agreement on Kræftplan V, DCCC's remit was widened from January 2026 to research and development in primary care. The coordinates are an approximate Copenhagen point for a national network.",
    programs: ["National research networks and centres", "Danish Cancer Research Days", "Research in primary care (from 2026)"],
    institutions: ["danish-cancer-society", "dmcg-denmark", "rigshospitalet", "aarhus-university-hospital", "odense-university-hospital", "aalborg-university-hospital", "sundhedsstyrelsen"],
    links: [
      { label: "DCCC: about DCCC", url: DCCC_EN },
      { label: "DCCC: baggrund og strategi", url: DCCC_DA },
      { label: "DCCC: nationale forskningscentre", url: "https://www.dccc.dk/nationale-forskningscentre/" },
    ] }),

  i({ id: "dmcg-denmark", name: "DMCG.dk (Danish Multidisciplinary Cancer Groups)", aka: ["DMCG.dk", "Danske Multidisciplinære Cancer Grupper", "Danish Multidisciplinary Cancer Groups"],
    city: "Copenhagen (national network)", country: "DK", lat: 55.676, lng: 12.568, institutionType: "consortium", website: "https://www.dmcg.dk",
    tldr: "The association of Denmark's 25 national multidisciplinary cancer groups, founded in 2004. The groups run the national clinical quality databases and write the national clinical guidelines for diagnosing and treating each cancer.",
    summary: "DMCG.dk was established in 2004 to strengthen cooperation on raising the quality of cancer treatment in Denmark. It joins 25 Danish Multidisciplinary Cancer Groups, whose work includes running clinical quality databases and writing clinical guidelines for diagnosis and treatment; each group appoints up to three representatives and the groups are led by an executive committee that meets six or seven times a year. In 2017 a secretariat for clinical guidelines in cancer was set up within DMCG.dk. The groups include the Danish Breast Cancer Group (DBCG) and the Danish Head and Neck Cancer Group (DAHANCA). The Kræftplan V agreement of November 2025 gives DMCG a role in revising the cancer pathways so that they take more account of individual patients, within the rules on maximum waiting times. The coordinates are an approximate Copenhagen point for a national network.",
    programs: ["25 national multidisciplinary cancer groups", "National clinical guidelines", "Clinical quality databases", "Committee for genomic tumour profiling"],
    companies: ["dbcg", "dahanca"], institutions: ["dccc-denmark", "sundhedsstyrelsen"],
    links: [
      { label: "DMCG.dk: om DMCG", url: DMCG_OM },
      { label: "DMCG.dk", url: "https://www.dmcg.dk/" },
      { label: "Udmøntningsaftale om Kræftplan V (2026 og frem) (PDF)", url: KPV_2026 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-gjerstorff-danish-cancer-registry-sjph-2011", name: "The Danish Cancer Registry: founding, content and validity",
    journal: "Scandinavian Journal of Public Health", year: 2011, doi: "10.1177/1403494810393562", pmid: "21775350", authors: "Gjerstorff ML", paperType: "review",
    tldr: "A short description of Denmark's national cancer registry: founded in 1942, holding incidence data since 1943, with completeness secured by multiple notifications and electronic reporting since 2008.",
    summary: "Published as \"The Danish Cancer Registry.\" in a supplement describing Denmark's national registers. The author describes when the registry was founded, what it holds, how its validity and coverage are secured, and its modernisation.",
    findings: [
      "The Danish Cancer Registry was founded in 1942 and contains data on cancer incidence in the Danish population since 1943.",
      "Validity is secured by manual quality control routines, an automated cancer logic and multiple notifications from different data sources, which also secures a high degree of completeness.",
      "In 2008 the registry finished a modernisation in which reporting became electronic through integration with patient administrative systems and manual coding was partly replaced by automatic coding.",
    ],
    whatItMeans: "The reference description of the registry behind Denmark's cancer statistics and its contribution to NORDCAN and GLOBOCAN.",
    caveats: ["A brief description from 2011; reporting and coding have changed since."],
    institutions: ["danish-cancer-registry"], related: ["cancer-registries-surveillance"],
    links: [doi("10.1177/1403494810393562", "Scand J Public Health 2011"), pubmed("21775350")] }),

  p({ id: "paper-kjaer-hpv-vaccine-cervical-cancer-denmark-jnci-2021", name: "HPV vaccination and cervical cancer in Danish women aged 17 to 30, 2006 to 2019",
    journal: "Journal of the National Cancer Institute", year: 2021, doi: "10.1093/jnci/djab080", pmid: "33876216", authors: "Kjaer SK, Dehlendorff C, Belmonte F, Baandrup L", paperType: "observational", participants: 867689,
    tldr: "In 867,689 Danish women, those vaccinated against HPV at 16 or younger had a cervical cancer rate 0.14 times that of unvaccinated women; vaccination at 20 to 30 showed no immediate effect.",
    summary: "Published as \"Real-World Effectiveness of Human Papillomavirus Vaccination Against Cervical Cancer\". The study included women aged 17 to 30 living in Denmark from October 2006 to December 2019, took vaccination and cervical cancer diagnoses from nationwide registries, and estimated incidence rate ratios by age at vaccination, adjusted for attained age, education and ethnicity, with a one-year buffer period in the primary analysis.",
    findings: [
      "The cohort comprised 867,689 women; 36.3% were vaccinated at 16 or younger at baseline.",
      "For women vaccinated at 16 or younger the incidence rate ratio of cervical cancer was 0.14 (95% CI 0.04 to 0.53) compared with unvaccinated women, and 0.32 (0.08 to 1.28) for those vaccinated at 17 to 19.",
      "For women vaccinated at 20 to 30 the ratio was 1.19 (0.80 to 1.79), falling to 0.85 (0.55 to 1.32) with a four-year buffer period.",
    ],
    whatItMeans: "Population evidence from Denmark's linked registers that HPV vaccination given before 20 prevents cervical cancer, and that vaccinating early matters.",
    caveats: ["Observational; vaccinated and unvaccinated women may differ in ways the adjustment does not capture.", "Few cancers in the youngest vaccinated cohorts, so confidence intervals are wide."],
    cancers: ["cervical"], technologies: ["hpv-vaccine"],
    links: [doi("10.1093/jnci/djab080", "J Natl Cancer Inst 2021"), pubmed("33876216")] }),
];

/** Denmark: the records behind /countries/dk/ (wave 7) that the corpus did not hold. */
export const recordsDK: EntityInput[] = [...institutions, ...papers];
