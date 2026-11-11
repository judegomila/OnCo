import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Niger: the public bodies, civil society group and papers behind /countries/ne/ (wave 10) that the corpus did not hold.
 * Each was written from its own primary source, read raw on 11 November 2026: the Ministry of Public Health's integrated
 * strategic plan for non-communicable diseases 2012 to 2016 (PDF text, in French, on the ICCP portal), WHO's cancer
 * country profiles for Niger (2014 and 2020) and its cervical cancer profile (2021), the ClinicalTrials.gov record of the
 * French African paediatric oncology registry (NCT03803735), and the Internet Archive's March 2024 copy of UICC's
 * member page for the Ligue Nigérienne de Lutte contre le Cancer (UICC's live page refused a plain request). DOIs were
 * resolved through Crossref and Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the cancer centre, the registry, the pharmacy directorate and the league; the
 * registry and the cancer centre link the Ministry back, and the papers are linked through keyPapers. OnCo found no
 * official website for any of the Nigerien bodies that answered on 11 November 2026, so none is given. Coordinates are
 * an approximate Niamey city point, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PNLMNT_2012 = "https://www.iccp-portal.org/sites/default/files/plans/NER_B3_Plan%20Strat%C3%A9gique%20PNLMNT%20Niger.pdf";
const WHO_CCP_2014 = "https://www.iccp-portal.org/sites/default/files/plans/CCC_Niger_2014.pdf";
const WHO_CCP_2020 = "https://www.iccp-portal.org/sites/default/files/plans/NER_2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-ner-2021-country-profile-en.pdf";
const GFAOP_REGISTRY = "https://clinicaltrials.gov/study/NCT03803735";
const LNLC_UICC_WB = "https://web.archive.org/web/20240303202953/https://www.uicc.org/membership/ligue-nigerienne-de-lutte-contre-le-cancer-lnlc";

const institutions: InstitutionInput[] = [
  i({ id: "niger-ministry-of-public-health", name: "Ministry of Public Health, Niger", aka: ["Ministère de la Santé Publique, Niger", "MSP Niger"],
    city: "Niamey", country: "NE", lat: 13.51, lng: 2.11, institutionType: "government",
    tldr: "Niger's health ministry. By a 2007 decree it made care for women's cancers free in public facilities, and in 2011 it had the national cancer centre in Niamey created by law, built with the International Atomic Energy Agency.",
    summary: "The Ministry of Public Health runs Niger's public health services. Its integrated strategic plan for non-communicable diseases for 2012 to 2016, written by the national programme for non-communicable diseases that the Ministry created by order on 25 January 2012, names cancer as one of nine priority conditions. The plan lists the measures already taken: a cancer registry since 1992, ratification of the WHO tobacco convention in 2005, Decree No. 261/PRN/MSP of 19 July 2007 making services for women's cancers in public facilities free of charge (consultations after screening, tests, care including radiotherapy, hospital stays, surgery, medicines and follow-up), and Law No. 2011-16 of 8 August 2011 creating the Centre National de Lutte contre le Cancer as a public administrative body, built in partnership with the International Atomic Energy Agency. The coordinates on this record are an approximate Niamey city point.\n\nThe same plan describes the free care policy introduced in 2006 for children under five, caesarean sections, family planning, antenatal care and gynaecological cancers, and records that cancer screening campaigns were organised unevenly and often only in the capital, that diagnosis and treatment were costly, and that oral morphine and staff trained in palliative care were very limited. WHO's cancer country profile for 2020 gives no information on a national cancer control plan and records no national cancer management guidelines in 2019. The Ministry's multisectoral plan for non-communicable diseases for 2019 to 2021 is the newest national plan OnCo found, and it is not specific to cancer; see the page's gaps.",
    programs: ["Free care for women's cancers in public facilities (Decree No. 261/PRN/MSP, 19 July 2007)", "National programme for non-communicable diseases (created 25 January 2012)", "Integrated strategic plan for non-communicable diseases 2012 to 2016", "Hepatitis B vaccination in the routine childhood schedule (since 2008)"],
    institutions: ["cnlc-niger", "niger-cancer-registry", "dpmt-niger", "ligue-nigerienne-contre-le-cancer", "iaea", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "hcc"], related: ["global-oncology-access"],
    keyPapers: ["paper-garba-niger-cancer-registry-1992-2009-bulcan-2013", "paper-nouhou-diori-retinoblastoma-stage-niger-jfo-2024", "paper-abdou-breast-cancer-awareness-niger-heliyon-2020"],
    links: [
      { label: "Ministère de la Santé Publique: Plan stratégique national intégré de prévention et de lutte contre les maladies chroniques non transmissibles, March 2012 (PDF, ICCP portal)", url: PNLMNT_2012 },
      { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
    ] }),

  i({ id: "cnlc-niger", name: "Centre National de Lutte contre le Cancer (Niger)", aka: ["CNLC Niamey", "National Cancer Control Centre, Niger", "Centre National de Lutte contre le Cancer, Niamey"],
    city: "Niamey", country: "NE", lat: 13.52, lng: 2.12, institutionType: "cancer-center",
    tldr: "Niger's national cancer centre in Niamey, created as a public body by a 2011 law and built in partnership with the International Atomic Energy Agency. It is one of the children's cancer units in the French African paediatric oncology registry.",
    summary: "Law No. 2011-16 of 8 August 2011 created the Centre National de Lutte contre le Cancer as a public administrative body; the Ministry of Public Health's 2012 strategic plan for non-communicable diseases records that it was built in partnership with the International Atomic Energy Agency and that the Agency had committed to support Niger's fight against cancer. The coordinates on this record are an approximate Niamey city point, not the building.\n\nThe centre is listed, as \"CNLC, Centre National de Lutte contre le Cancer\", among the recruiting sites of the French African Pediatric Oncology Registry (NCT03803735), a hospital-based registry of children treated in units working with the French Africa Pediatric Oncology Group that started in January 2016, aims to record about 10,000 children and runs to 2030, with sites in 11 African countries and a coordinating site in France. WHO's cancer country profile for 2020 counts 1.2 public cancer centres and 1.2 external beam radiotherapy machines per 10,000 cancer patients in Niger in 2019, ratios that, for the 8,674 cancers WHO estimated for 2018, correspond to about one of each. OnCo found no official page of the centre setting out its services, machines or staff.",
    programs: ["Cancer treatment for adults and children", "Site of the French African Pediatric Oncology Registry (NCT03803735)"],
    institutions: ["niger-ministry-of-public-health", "iaea"], cancers: ["breast-cancer", "cervical", "childhood-cancers"], related: ["global-oncology-access"],
    links: [
      { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016, preface and section on achievements (PDF)", url: PNLMNT_2012 },
      { label: "ClinicalTrials.gov: French African Pediatric Oncology Registry (NCT03803735), sites", url: GFAOP_REGISTRY },
      { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
    ] }),

  i({ id: "niger-cancer-registry", name: "Niger Cancer Registry (Registre des cancers du Niger)", aka: ["Registre des cancers du Niger", "National Cancer Registry of Niger", "Niamey cancer registry"],
    city: "Niamey", country: "NE", lat: 13.5, lng: 2.1, institutionType: "research-institute",
    tldr: "Niger's cancer registry, kept since 1992 at the pathology laboratory of the Faculty of Health Sciences of Abdou Moumouni University in Niamey. It recorded 7,031 cancers between 1992 and 2009, most from the Niamey area.",
    summary: "The Ministry of Public Health's 2012 strategic plan for non-communicable diseases places the registry in the pathology laboratory of the Faculty of Health Sciences of Abdou Moumouni University in Niamey, created in 1992, and quotes its figures: 2,179 cancers in men and 2,940 in women, an average of 426 cases notified a year, with liver, skin, non-Hodgkin lymphoma, prostate and bladder cancer commonest in men and breast, cervix, ovary, liver and skin in women. The coordinates on this record are an approximate Niamey city point.\n\nThe registry's analysis for 1992 to 2009, by Garba and colleagues, counted 7,031 cancers, rising from 186 in 1992 to 646 in 2009; 70.2% of patients lived in the Niamey area and 42% of diagnoses were confirmed. WHO's cancer country profile for 2014 describes the registry as population-based with subnational coverage and 2012 as its last year of data, and WHO's cervical cancer profile for 2021 records that a population-based registry exists. The registry is not a member of the African Cancer Registry Network, whose member list OnCo read on 11 November 2026, and IARC's GLOBOCAN 2024 fact sheet for Niger names no country-specific source for its incidence estimate.",
    programs: ["Cancer registration from pathology and hospital records (since 1992)"],
    institutions: ["niger-ministry-of-public-health", "iarc"], cancers: ["breast-cancer", "cervical", "hcc", "ovarian"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-garba-niger-cancer-registry-1992-2009-bulcan-2013"],
    links: [
      doi("10.1684/bdc.2013.1699", "Garba et al., épidémiologie des cancers au Niger, 1992 à 2009 (Bull Cancer 2013)"),
      { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016, section on cancer (PDF)", url: PNLMNT_2012 },
      { label: "WHO: cancer country profile, Niger, 2014 (PDF)", url: WHO_CCP_2014 },
      { label: "WHO: cervical cancer country profile, Niger, 2021 (PDF)", url: WHO_CX_2021 },
    ] }),

  i({ id: "dpmt-niger", name: "Direction de la Pharmacie et de la Médecine Traditionnelle (Niger)", aka: ["DPMT Niger", "Directorate of Pharmacy and Traditional Medicine, Niger"],
    city: "Niamey", country: "NE", lat: 13.51, lng: 2.11, institutionType: "government",
    tldr: "The directorate of Niger's Ministry of Public Health that regulated medicines when African regulators were surveyed around 2021, under a 1997 pharmacy law then being revised to take in the African Union's model law.",
    summary: "In a census survey of African medicines regulators published in 2023 by Ncube and colleagues, Niger's regulator was the Direction de la Pharmacie et de la Médecine Traditionnelle, working under Law No. 97-05 of 2 June 1997 ratifying Ordinance 97-05 on pharmaceutical legislation, updated in 2021. The survey reports that the revision of the 1997 law was in progress and that it considered domesticating the African Union Model Law on Medical Products Regulation, and lists Niger among eight regulators domesticating the model law in part. The coordinates are an approximate Niamey city point.\n\nNiger does not appear in WHO's list of national regulatory authorities operating at maturity level 3 or 4, dated August 2026. OnCo could not reach an official website for Niger's medicines regulator on 11 November 2026 and could not confirm whether a separate regulatory agency has since replaced the directorate; this is named in the page's gaps.",
    programs: ["Medicines regulation under Law No. 97-05 of 2 June 1997", "Revision of the pharmacy law towards the African Union Model Law (in progress when surveyed)"],
    institutions: ["niger-ministry-of-public-health"],
    keyPapers: ["paper-ncube-au-model-law-domestication-fmed-2023"],
    links: [
      doi("10.3389/fmed.2023.1117439", "Ncube et al., domestication of the African Union model law on medical products regulation (Front Med 2023), table 2"),
      { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (PDF, August 2026)", url: "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf" },
    ] }),

  i({ id: "ligue-nigerienne-contre-le-cancer", name: "Ligue Nigérienne de Lutte contre le Cancer (LNLC)", aka: ["LNLC", "Nigerien League against Cancer"],
    city: "Niamey", country: "NE", lat: 13.51, lng: 2.11, institutionType: "consortium",
    tldr: "A Nigerien civil society league against cancer, based in Niamey and a member of the Union for International Cancer Control. It works on prevention, access to care, training, research and palliative care for all cancers.",
    summary: "UICC's member page for the Ligue Nigérienne de Lutte contre le Cancer, last updated on 16 January 2024 and read through the Internet Archive because UICC's live page refused a plain request, gives its address in the Niamey 2000 quarter and says, in French, that the league is concerned with all cancers and that its specific aims are cancer prevention, easier access to medical care, training, research and palliative care. That page listed it as a full member; UICC's member directory as OnCo holds it lists it as an associate member. The coordinates are an approximate Niamey city point.\n\nUICC's directory also lists other Nigerien members: SOS Cancer Niger, SOS Tabagisme, Tatalli, Tous Unis Contre le Cancer, and the Centre National de Lutte contre le Cancer. OnCo did not read their pages and holds no separate records for them.",
    programs: ["Cancer prevention and awareness", "Access to medical care", "Training and research", "Palliative care"],
    institutions: ["niger-ministry-of-public-health", "uicc"], related: ["global-oncology-access"],
    links: [
      { label: "UICC: Ligue Nigérienne de Lutte contre le Cancer (member page last updated January 2024, Internet Archive copy of March 2024)", url: LNLC_UICC_WB },
      { label: "UICC: Ligue Nigérienne de Lutte contre le Cancer (member page)", url: "https://www.uicc.org/membership/ligue-nigerienne-de-lutte-contre-le-cancer-lnlc" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-garba-niger-cancer-registry-1992-2009-bulcan-2013", name: "Cancers recorded by Niger's cancer registry, 1992 to 2009",
    journal: "Bulletin du Cancer", year: 2013, doi: "10.1684/bdc.2013.1699", pmid: "23420007", authors: "Garba SM, Zaki HM, Arfaoui A, et al.", paperType: "observational", participants: 7031,
    tldr: "Niger's cancer registry recorded 7,031 cancers between 1992 and 2009, rising from 186 a year to 646; breast and cervical cancer led in women and liver cancer in men, and fewer than half the diagnoses were confirmed.",
    summary: "Published in French as \"Épidémiologie des cancers au Niger, 1992 à 2009\" (Bull Cancer 2013;100(2):127-133). A retrospective, descriptive study of the data of Niger's national cancer register from 1992 to 2009, kept at the pathology laboratory of the Faculty of Health Sciences in Niamey.",
    findings: [
      "7,031 cancers were collected over 1992 to 2009; the number registered rose from 186 in 1992 to 646 in 2009.",
      "More women than men were registered (sex ratio 1.40); the average age was 43 years, and 70.2% of patients lived in the Niamey area.",
      "In women breast cancer was commonest (27.36%), then cervix (13.41%) and ovary (8.83%); in men liver (19%), skin (8.04%) and bladder (4.92%).",
      "About 7% of cases were children's cancers, among which Burkitt lymphoma was the commonest entity (15.1%); 42% of diagnoses were confirmed.",
    ],
    whatItMeans: "An 18-year series of cancers recorded in Niger, and the only national-level registry analysis OnCo found. It shows the same leading cancers as IARC's estimates, but most cases came from the capital, so it cannot give rates for the country.",
    caveats: ["Counts, not rates: most patients lived around Niamey, so the series cannot measure how common cancer is across Niger.", "Fewer than half of diagnoses were confirmed, and cases depend on who reached the laboratory or hospital."],
    institutions: ["niger-cancer-registry"], cancers: ["breast-cancer", "cervical", "hcc", "ovarian", "burkitt-lymphoma"],
    links: [doi("10.1684/bdc.2013.1699", "Bull Cancer 2013"), pubmed("23420007")] }),

  p({ id: "paper-nouhou-diori-retinoblastoma-stage-niger-jfo-2024", name: "Stage at diagnosis of retinoblastoma in Niger",
    journal: "Journal Français d'Ophtalmologie", year: 2024, doi: "10.1016/j.jfo.2024.104258", pmid: "39213923", authors: "Nouhou Diori A, Laminou L, Youssoufou Souley AS, et al.", paperType: "observational", participants: 119,
    tldr: "At Niger's tertiary centre for conservative treatment of retinoblastoma, 2016 to 2022, retinoblastoma was 43% of children's cancers seen, nearly half of children arrived with the tumour already outside the eye, and 58% had first seen a traditional healer.",
    summary: "Published in French as \"Stade au diagnostic du rétinoblastome au Niger : état des lieux et perspectives\". A retrospective study from January 2016 to October 2022 in the ophthalmology department of the tertiary care centre for the conservative treatment of retinoblastoma in Niger.",
    findings: [
      "Retinoblastoma represented 43.27% of paediatric cancers in the series; 10.92% of cases were bilateral, and the mean age was 36 months.",
      "Families travelled from 113 km (Tillabéry) to 1,355 km (Diffa); 5.88% came from neighbouring Mali and Benin, and 58% had seen traditional healers first.",
      "Extraocular extension was present in 47.90% (57 children) and intraocular disease in 27.73% (33); neoadjuvant chemotherapy was used in 63.03%, and histology was obtained in 26.89%, in 14 days on average.",
    ],
    whatItMeans: "White pupil (leukocoria) in a young child is a warning sign. In Niger many children reach treatment late, after long journeys and visits to traditional healers, and the authors call for early diagnosis campaigns to continue.",
    caveats: ["One referral centre; children never referred are not counted.", "The denominator (number of children) is given in the abstract only through percentages; 119 is the total implied by the counts reported."],
    cancers: ["retinoblastoma", "childhood-cancers"],
    links: [doi("10.1016/j.jfo.2024.104258", "J Fr Ophtalmol 2024"), pubmed("39213923")] }),

  p({ id: "paper-abdou-breast-cancer-awareness-niger-heliyon-2020", name: "What women in Niamey and Zinder know about breast cancer",
    journal: "Heliyon", year: 2020, doi: "10.1016/j.heliyon.2020.e04316", pmid: "32642585", authors: "Abdou A, Van Hal G, Dille I", paperType: "observational",
    tldr: "In a household survey in Niger's Zinder and Niamey regions, only 41.2% of women were aware of breast cancer and 16.9% showed good breast cancer practice; the authors call for awareness programmes promoting clinical breast examination.",
    summary: "A cross-sectional survey of women selected at random in households within health districts of the Zinder and Niamey regions, using a breast cancer knowledge score and a generalised linear model to find factors associated with awareness. The authors note that breast cancer is the leading cause of cancer illness and death among women in Niger and that mammography is not common.",
    findings: [
      "41.2% (95% CI 37.5 to 45.0) of women were aware of breast cancer; 65.0% showed awareness of its symptoms.",
      "27.4% had sufficient knowledge of risk and protective factors, and 16.9% of good breast cancer practice.",
      "Having had a clinical breast examination (OR 2.25) and breastfeeding (OR 3.34) were associated with awareness; awareness fell with age.",
    ],
    whatItMeans: "Knowing the signs of breast cancer is a first step to earlier diagnosis where screening by mammography is not available; this survey found most women in two of Niger's regions had not heard of the disease.",
    caveats: ["Two regions of Niger, not a national sample.", "Self-reported knowledge."],
    cancers: ["breast-cancer"],
    links: [doi("10.1016/j.heliyon.2020.e04316", "Heliyon 2020"), pubmed("32642585")] }),

  p({ id: "paper-ncube-au-model-law-domestication-fmed-2023", name: "How African medicines regulators are taking up the African Union model law",
    journal: "Frontiers in Medicine", year: 2023, doi: "10.3389/fmed.2023.1117439", pmid: "36793874", authors: "Ncube BM, Dube A, Ward K", paperType: "observational",
    tldr: "A survey of African medicines regulators found the African Union's 2016 model law on medical products regulation adopted in full by some and in part by others, slowed by lack of staff and money, competing priorities and slow law reform.",
    summary: "A qualitative, cross-sectional census survey of the national medicines regulatory authorities of English- and French-speaking African Union member states, applying the Consolidated Framework for Implementation Research to the domestication of the African Union Model Law on Medical Products Regulation, endorsed in 2016 with a target of 25 countries by 2020. Twenty-six questionnaires were returned by 21 regulators, including Niger's Direction de la Pharmacie et de la Médecine Traditionnelle.",
    findings: [
      "Perceived benefits included establishing a regulator, better governance and autonomy, and enabling harmonisation, reliance and mutual recognition.",
      "Political will, leadership and champions, and taking part in regional harmonisation, helped adoption.",
      "Barriers were lack of human and financial resources, competing national priorities, overlapping roles of government bodies and slow law reform.",
    ],
    whatItMeans: "Explains why medicines regulation is changing across Africa and records the legal basis of regulators, including Niger's, whose 1997 pharmacy law was being revised at the time.",
    caveats: ["Self-reported by regulators; fewer than half of African regulators responded.", "Survey responses predate publication; a regulator's status may since have changed."],
    institutions: ["dpmt-niger"],
    links: [doi("10.3389/fmed.2023.1117439", "Front Med 2023"), pubmed("36793874")] }),
];

/** Niger: the records behind /countries/ne/ (wave 10). */
export const recordsNE: EntityInput[] = [...institutions, ...papers];
