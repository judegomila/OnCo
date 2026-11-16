import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Uganda: the public bodies and papers behind /countries/ug/ (wave 6) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the African Cancer Registry Network's member pages for the
 * Kampala and Gulu registries (the Kampala page updated July 2025), the Parliament of Uganda's news pages on the
 * committee hearing of 17 September 2025 and the third reading of 26 March 2026 and its bill tracker for the National Drug and Health Products Authority Bill, 2025,
 * WHO's Regional Office for Africa article on the January 2024 regulatory mission, the Uganda Cancer Institute Act 2016
 * (PDF text from Laws.Africa), and the slides on the Uganda National Cancer Control Plan 2025/26 to 2029/30 posted on
 * the ICCP portal in April 2026. DOIs were resolved through Europe PMC; the figures in `findings` are taken from the
 * indexed abstracts, and for Asasira et al. from the open-access full text in Europe PMC.
 *
 * Inbound links: the Ministry links the regulator, both registries, the Uganda Cancer Institute and three papers; the
 * registries link their incidence papers through keyPapers and the Ministry back. The Uganda Cancer Institute already
 * exists (institutions/world.ts) and is reused, not duplicated. Coordinates are approximate city or campus points, not
 * building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const AFCRN_KAMPALA = "https://afcrn.org/index.php/membership/membership-list/81-kampala-uganda";
const AFCRN_GULU = "https://afcrn.org/index.php/membership/membership-list/137-gulucancerregistry";
const NCCP_SLIDES = "https://www.iccp-portal.org/sites/default/files/2026-04/ICCP%20ECHO%202026%20Session%203%20slides_Uganda.pdf";
const PARL_BILL = "https://www.parliament.go.ug/news/4203/draft-national-drugs-bill-presented-health-committee";
const PARL_PASSED = "https://www.parliament.go.ug/news/4323/parliament-passes-sweeping-reforms-medicines";
const BILL_TRACKER = "https://bills.parliament.ug/user_bill_stage.php?billid=580";
const WHO_NDA = "https://www.afro.who.int/pt/node/20555";
const UCI_ACT = "https://commons.laws.africa/akn/ug/act/2016/19/media/publication/ug-act-2016-19-publication-document.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "uganda-ministry-of-health", name: "Ministry of Health, Uganda", aka: ["MoH Uganda", "Uganda Ministry of Health"],
    city: "Kampala", country: "UG", lat: 0.32, lng: 32.58, institutionType: "government", website: "https://www.health.go.ug",
    tldr: "Uganda's health ministry. It sponsored the 2026 law that turns the National Drug Authority into a wider regulator, runs HPV and hepatitis B vaccination through its immunisation programme, and oversees the Uganda Cancer Institute, which coordinates the national cancer plan for 2025/26 to 2029/30.",
    summary: "The Ministry of Health is responsible for Uganda's public health services. Its minister sponsored the National Drug and Health Products Authority Bill, 2025, which Parliament passed on 26 March 2026 and the President assented to on 29 April 2026, replacing the 1993 law under which the National Drug Authority worked. Its immunisation programme (UNEPI) introduced the HPV vaccine nationwide in 2015 and the hepatitis B birth dose in 2022, according to the introduction records Uganda reports to WHO. The coordinates on this record are an approximate Kampala city point.\n\nThe Uganda Cancer Institute, made an autonomous body corporate by the Uganda Cancer Institute Act 2016, works under the Minister's written policy directions. Slides on the Uganda National Cancer Control Plan 2025/26 to 2029/30, presented through the International Cancer Control Partnership in 2026, place oversight with a national steering committee under the Office of the Prime Minister and coordination with a national cancer control secretariat given technical guidance by the Uganda Cancer Institute under the Ministry, with district health committees and cancer control focal persons overseeing activities in the districts.\n\nUganda has no national health insurance. A National Health Insurance Bill was passed by Parliament in 2021 but not assented to; in November 2026 the Daily Monitor reported that the government planned to roll out a scheme by 2027.",
    programs: ["Uganda National Cancer Control Plan 2025/26 to 2029/30 (coordinated through the Uganda Cancer Institute)", "Uganda National Expanded Programme on Immunisation: HPV vaccine (nationwide since 2015) and hepatitis B", "National Drug and Health Products Authority Act 2026 (sponsor)", "Cervical cancer screen-and-treat"],
    institutions: ["uganda-cancer-institute", "nda-uganda", "kampala-cancer-registry", "gulu-cancer-registry", "who", "iaea"],
    cancers: ["cervical", "breast-cancer", "prostate"], related: ["global-oncology-access", "hpv-vaccine"],
    keyPapers: ["paper-kavuma-radiotherapy-uganda-jgo-2025", "paper-kavuma-cervical-waiting-times-uci-jgo-2025", "paper-rukundo-ayeh-via-screen-treat-uganda-bmjph-2026"],
    links: [
      { label: "ICCP: the Uganda National Cancer Control Plan 2025/26 to 2029/30 (slides, PDF)", url: NCCP_SLIDES },
      { label: "Parliament of Uganda: draft National Drugs Bill presented to health committee (17 September 2025)", url: PARL_BILL },
      { label: "Uganda Cancer Institute Act, 2016 (Act 19 of 2016, PDF)", url: UCI_ACT },
      { label: "Daily Monitor: government targets 2027 rollout of long-awaited health insurance scheme (4 November 2026)", url: "https://www.monitor.co.ug/uganda/news/national/govt-targets-2027-rollout-of-long-awaited-health-insurance-scheme-5658826" },
    ] }),

  i({ id: "nda-uganda", name: "National Drug Authority, Uganda (NDA)", aka: ["NDA", "National Drug Authority", "National Drug and Health Products Authority"],
    city: "Kampala", country: "UG", lat: 0.33, lng: 32.59, institutionType: "government", website: "https://www.nda.or.ug",
    tldr: "Uganda's medicines regulator. A 2026 law replaces it with the National Drug and Health Products Authority, with a wider mandate that includes clinical trials, vaccines and medical devices, a step the Ministry of Health tied to reaching WHO maturity level 3.",
    summary: "The National Drug Authority regulated medicines in Uganda under the National Drug Policy and Authority Act of 1993, which the Minister of Health told Parliament in September 2025 had never been amended. The National Drug and Health Products Authority Bill, 2025, with 14 parts and 122 clauses, was passed at third reading on 26 March 2026 and assented to on 29 April 2026, according to Parliament's bill tracker. It establishes the National Drug and Health Products Authority with a mandate covering drugs, vaccines, diagnostics, biologicals, medical devices, cosmetics, public health products and nutritional supplements, and it regulates clinical trials and pharmacovigilance. Clause 21 lets the authority permit the use or importation of unregistered drugs for clinical trials, research, personal use and compassionate use. The coordinates are an approximate Kampala city point.\n\nWHO's Regional Office for Africa reported a mission on 20 and 21 January 2024 that reviewed the institutional development plan drawn up after a 2019 benchmarking assessment, setting out steps towards maturity level 3; WHO said neighbouring Rwanda and Tanzania had already reached that level, and the mission visited NDA's WHO-prequalified pharmaceutical laboratory. The Minister told Parliament that the new law was central to reaching maturity level 3. OnCo found no WHO announcement that Uganda has reached it.",
    programs: ["Registration of medicines", "Clinical trial authorisation", "Pharmacovigilance", "Quality control laboratory (WHO prequalified)", "Institutional development plan towards WHO maturity level 3"],
    institutions: ["uganda-ministry-of-health", "who"],
    links: [
      { label: "Parliament of Uganda: Parliament passes sweeping reforms on medicines", url: PARL_PASSED },
      { label: "Parliament of Uganda bill tracker: National Drug and Health Products Authority Bill, 2025", url: BILL_TRACKER },
      { label: "Parliament of Uganda: draft National Drugs Bill presented to health committee (17 September 2025)", url: PARL_BILL },
      { label: "WHO Africa: strengthening Uganda's medical products regulatory systems (January 2024 mission)", url: WHO_NDA },
    ] }),

  i({ id: "kampala-cancer-registry", name: "Kampala Cancer Registry", aka: ["KCR", "Kyadondo County Cancer Registry", "Kampala Cancer Registry, Makerere University"],
    city: "Kampala", country: "UG", lat: 0.338, lng: 32.576, institutionType: "research-institute", website: AFCRN_KAMPALA,
    tldr: "A population-based cancer registry founded in 1951 in the Department of Pathology at Makerere University, counting new cancers in Kyadondo County, which takes in Kampala; its authors call it the longest established in Africa.",
    summary: "The Kampala Cancer Registry was established in 1951 in the Department of Pathology of the Makerere Faculty of Medicine, now the College of Health Sciences of Makerere University, to measure cancer incidence in Kyadondo County: the city of Kampala and a peri-urban area reaching about 30 km north, 1,914 square kilometres with a population of about 3.67 million in the 2024 census. Its African Cancer Registry Network page, updated July 2025, describes a staff of a pathologist director, a cancer registrar and a volunteer registrar, monthly visits to hospitals, hospices and pathology laboratories, data managed in IARC's CanReg software, and completeness of about 90% for adult cancers when evaluated in 2001. Death certificates are not used because certification is very incomplete. The coordinates are those of the Mulago campus, approximately.\n\nThe registry was re-established after an interruption, with incidence counted again from September 1989. Its data have appeared in Cancer Incidence in Five Continents volumes I and VII to XII, and its trend papers trace the effects of HIV: Kaposi sarcoma became the leading cancer in men by 1989 to 1991 and has since declined, while prostate, breast and cervical cancer rates rose. The page says the data are used in national cancer control planning, and that screening in Uganda is opportunistic and focused mainly on cervical cancer in women living with HIV.",
    programs: ["Population-based cancer registration for Kyadondo County (from 1951; counted again from September 1989 after an interruption)", "Cancer Incidence in Five Continents contributor", "African Cancer Registry Network member registry"],
    institutions: ["uganda-ministry-of-health", "uganda-cancer-institute", "iarc"],
    cancers: ["cervical", "breast-cancer", "prostate", "kaposi-sarcoma", "esophageal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-bukirwa-kampala-incidence-trends-1991-2015-ijc-2021", "paper-wabinga-kampala-incidence-trends-1991-2010-ijc-2014", "paper-asasira-kampala-cancer-projections-2030-bmjopen-2022", "paper-wabinga-kampala-cancer-1989-1991-aids-ijc-1993"],
    links: [
      { label: "African Cancer Registry Network: Uganda, Kampala Cancer Registry (updated July 2025)", url: AFCRN_KAMPALA },
      doi("10.1002/ijc.33373", "Bukirwa et al., trends in the incidence of cancer in Kampala, 1991 to 2015 (Int J Cancer 2021)"),
      doi("10.1002/ijc.28661", "Wabinga et al., trends in the incidence of cancer in Kampala 1991 to 2010 (Int J Cancer 2014)"),
    ] }),

  i({ id: "gulu-cancer-registry", name: "Gulu Cancer Registry", aka: ["GCR", "Gulu Population-Based Cancer Registry"],
    city: "Gulu", country: "UG", lat: 2.78, lng: 32.25, institutionType: "research-institute", website: AFCRN_GULU,
    tldr: "A population-based cancer registry for four districts of the Acholi sub-region of northern Uganda, operating since June 2014 from St. Mary's Hospital Lacor near Gulu, set up to compare a largely rural population with Kampala.",
    summary: "The Gulu Cancer Registry became operational in June 2014 with support from the International Network on Cancer Treatment and Research, to measure cancer in the Acholi sub-region given its possible environmental and ethnic differences from Kampala. Its African Cancer Registry Network page places it at St. Mary's Hospital Lacor, about 7 km west of Gulu town, serving the districts of Gulu, Nwoya, Omoro and Amuru (762,343 people in the 2014 census). A registrar collects cases from six hospitals and medical centres in the four districts and follows patients referred to Mulago National Referral Hospital and the Uganda Cancer Institute; data are coded to ICD-O-3 and entered in CanReg5. The coordinates are an approximate point for the Lacor hospital area.\n\nIts first four years, 2013 to 2016, recorded 1,627 cancers in a population of 771,514, with age-standardised rates of 106.7 per 100,000 men and 118.5 per 100,000 women. Cervical cancer and non-Hodgkin lymphoma were the commonest in women; in children, Burkitt lymphoma incidence was high compared with elsewhere in Africa, and breast cancer in women was relatively low.",
    programs: ["Population-based cancer registration for Gulu, Nwoya, Omoro and Amuru districts (from 2014)", "African Cancer Registry Network member registry"],
    institutions: ["uganda-ministry-of-health", "uganda-cancer-institute"],
    cancers: ["cervical", "burkitt-lymphoma", "kaposi-sarcoma", "prostate"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-okongo-northern-uganda-incidence-2013-2016-ijc-2019"],
    links: [
      { label: "African Cancer Registry Network: Gulu Cancer Registry", url: AFCRN_GULU },
      doi("10.1002/ijc.32053", "Okongo et al., cancer incidence in Northern Uganda 2013 to 2016 (Int J Cancer 2019)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-bukirwa-kampala-incidence-trends-1991-2015-ijc-2021", name: "Trends in cancer incidence in Kampala, Uganda, 1991 to 2015",
    journal: "International Journal of Cancer", year: 2021, doi: "10.1002/ijc.33373", pmid: "33129228", authors: "Bukirwa P, Wabinga H, Nambooze S, Amulen PM, Joko WY, Liu B, Parkin DM", paperType: "observational",
    tldr: "Over 25 years of Kampala Cancer Registry data, age-adjusted cancer incidence rose by about a quarter, led by prostate, breast and cervical cancer, while Kaposi sarcoma, the most often registered cancer over the period, declined as HIV prevalence fell.",
    summary: "Published as \"Trends in the incidence of cancer in Kampala, Uganda, 1991 to 2015\". The authors present 25 years of incidence for Kyadondo County, which comprises Kampala and a peri-urban hinterland, from the Kampala Cancer Registry.",
    findings: [
      "Age-adjusted incidence of all cancers was some 25% higher in 2011 to 2015 than in 1991 to 1995.",
      "The largest absolute increases were in prostate cancer (about 100% higher), breast cancer (about 70%) and cervical cancer (about 45%) between 1991 to 1995 and 2010 to 2015.",
      "Kaposi sarcoma was by far the most often registered cancer over 25 years, but its incidence declined, consistent with falling HIV prevalence; non-Hodgkin lymphoma rose until 2006/2007 and then declined, possibly because antiretroviral therapy became available.",
      "Liver cancer, the fifth commonest, rose until 2007 and then declined; oesophageal and colorectal cancer increased.",
    ],
    whatItMeans: "The longest population-based cancer series in Africa shows a city moving from cancers driven by infection towards prostate, breast and colorectal cancer, while cervical cancer keeps rising without organised screening.",
    caveats: ["One county around the capital; rural Uganda may differ.", "Rising rates partly reflect better access to diagnosis in the city."],
    institutions: ["kampala-cancer-registry"], cancers: ["prostate", "breast-cancer", "cervical", "kaposi-sarcoma", "esophageal"],
    links: [doi("10.1002/ijc.33373", "Int J Cancer 2021"), pubmed("33129228")] }),

  p({ id: "paper-wabinga-kampala-incidence-trends-1991-2010-ijc-2014", name: "Trends in cancer incidence in Kampala, Uganda, 1991 to 2010",
    journal: "International Journal of Cancer", year: 2014, doi: "10.1002/ijc.28661", pmid: "24615279", authors: "Wabinga HR, Nambooze S, Amulen PM, Okello C, Mbus L, Parkin DM", paperType: "observational",
    tldr: "Twenty years of Kampala registry data showed breast and prostate cancer rising by 3.7% and 5.2% a year, cervical cancer by 1.8% a year, and Kaposi sarcoma falling as HIV prevalence dropped and antiretroviral drugs arrived.",
    summary: "Published as \"Trends in the incidence of cancer in Kampala, Uganda 1991-2010\". The authors, who describe the Kampala Cancer Registry as the longest established in Africa, report trends for Kyadondo County over 1991 to 2010 against the changing HIV epidemic.",
    findings: [
      "Breast and prostate cancer incidence rose by 3.7% and 5.2% a year respectively.",
      "Cervical cancer, always the commonest cancer in women, rose by 1.8% a year, although rates appeared to decline in the last four years.",
      "Oesophageal cancer, the commonest cancer in men in the 1960s, had not declined in the last 20 years.",
      "Kaposi sarcoma in men fell until about 2002 and then held steady; in women it declined continuously from 2000.",
    ],
    whatItMeans: "Shows the arrival of cancers linked to urban lifestyles in Kampala alongside the waning of HIV-linked cancers.",
    caveats: ["One county; changes in diagnostic access can mimic changes in risk."],
    institutions: ["kampala-cancer-registry"], cancers: ["breast-cancer", "prostate", "cervical", "kaposi-sarcoma", "esophageal"],
    links: [doi("10.1002/ijc.28661", "Int J Cancer 2014"), pubmed("24615279")] }),

  p({ id: "paper-wabinga-kampala-cancer-1989-1991-aids-ijc-1993", name: "Cancer in Kampala, Uganda, 1989 to 1991, in the era of AIDS",
    journal: "International Journal of Cancer", year: 1993, doi: "10.1002/ijc.2910540106", pmid: "8478145", authors: "Wabinga HR, Parkin DM, Wabwire-Mangen F, Mugerwa JW", paperType: "observational",
    tldr: "When the Kampala registry was re-established in 1989, Kaposi sarcoma had become the leading cancer in men, almost half of all cancers registered in men, tracking the AIDS epidemic, and cervical cancer had more than doubled since the 1950s.",
    summary: "Published as \"Cancer in Kampala, Uganda, in 1989-91: changes in incidence in the era of AIDS\". The re-established registry for Kyadondo County estimated incidence for September 1989 to December 1991 and compared it with earlier data from the same area and other African registries.",
    findings: [
      "Kaposi sarcoma was the leading cancer in men, almost half of all registered cases, and the second most frequent in women (17.9%).",
      "Oesophageal and prostate cancer incidence had increased markedly, while penile and bladder cancer had declined.",
      "Cervical cancer incidence had more than doubled since the 1950s and was among the highest recorded in Africa.",
    ],
    whatItMeans: "The baseline from which Kampala's later trends are measured, recorded at the height of the HIV epidemic.",
    caveats: ["A short period of just over two years after the registry restarted."],
    institutions: ["kampala-cancer-registry"], cancers: ["kaposi-sarcoma", "cervical", "esophageal", "prostate"],
    links: [doi("10.1002/ijc.2910540106", "Int J Cancer 1993"), pubmed("8478145")] }),

  p({ id: "paper-asasira-kampala-cancer-projections-2030-bmjopen-2022", name: "Projected incidence of the five commonest cancers in Kampala, Uganda, to 2030",
    journal: "BMJ Open", year: 2022, doi: "10.1136/bmjopen-2021-056722", pmid: "35296484", authors: "Asasira J, Lee S, Tran TXM, Mpamani C, Wabinga H, Jung SY, Chang YJ, Park Y, Cho H", paperType: "observational",
    tldr: "Using Kampala Cancer Registry data for 2001 to 2015, the authors projected that cervical, breast and prostate cancer cases will rise by a third to a half by 2026 to 2030, while Kaposi sarcoma and non-Hodgkin lymphoma keep falling.",
    summary: "Published as \"Infection-related and lifestyle-related cancer burden in Kampala, Uganda: projection of the future cancer incidence up to 2030\". Registry incidence for 2001 to 2015 and Uganda Bureau of Statistics population data were projected to 2030 with an age-period-cohort model (Nordpred), with joinpoint regression as a check.",
    findings: [
      "Observed age-standardised incidence in 2011 to 2015 was 60.5 per 100,000 women for cervical cancer, 37.6 for breast cancer and 54.2 per 100,000 men for prostate cancer, and 16.4 per 100,000 for Kaposi sarcoma.",
      "Cases were projected to rise by 35.3% for cervical, 57.7% for breast and 33.4% for prostate cancer between 2011 to 2015 and 2026 to 2030.",
      "Kaposi sarcoma cases were projected to fall by 22.6% and non-Hodgkin lymphoma by 37.3%, with Kaposi sarcoma incidence falling from 29.6 per 100,000 in 2001 to 2005 to 10.4 by 2030.",
    ],
    whatItMeans: "Cancer control in Uganda has to plan for more cervical, breast and prostate cancer, not only for the infection-related cancers it has long dealt with.",
    caveats: ["Projections assume past trends continue and do not model changes in risk factors such as HPV vaccination.", "The text and table give different starting rates for prostate cancer; the table's observed rates are used here."],
    institutions: ["kampala-cancer-registry", "uganda-cancer-institute"], cancers: ["cervical", "breast-cancer", "prostate", "kaposi-sarcoma"],
    links: [doi("10.1136/bmjopen-2021-056722", "BMJ Open 2022"), pubmed("35296484")] }),

  p({ id: "paper-okongo-northern-uganda-incidence-2013-2016-ijc-2019", name: "Cancer incidence in northern Uganda, 2013 to 2016, from the Gulu Cancer Registry",
    journal: "International Journal of Cancer", year: 2019, doi: "10.1002/ijc.32053", pmid: "30536374", authors: "Okongo F, Ogwang DM, Liu B, Maxwell Parkin D", paperType: "observational", participants: 1627,
    tldr: "In its first four years the Gulu Cancer Registry recorded 1,627 cancers in a largely rural population of about 770,000, with a pattern unlike Kampala's: non-Hodgkin lymphoma near the top for both sexes, high childhood Burkitt lymphoma and relatively little breast cancer.",
    summary: "Published as \"Cancer incidence in Northern Uganda (2013-2016)\". The Gulu Cancer Registry, established in 2014 in four districts of the Acholi sub-region, reports its first four years of registration.",
    findings: [
      "1,627 cancers were registered in a population of 771,514: 644 in men (age-standardised rate 106.7 per 100,000) and 983 in women (118.5 per 100,000).",
      "The commonest cancers were cervical cancer and non-Hodgkin lymphoma in women, and non-Hodgkin lymphoma, Kaposi sarcoma, prostate and liver cancer in men.",
      "Burkitt lymphoma incidence in children was high compared with elsewhere in Africa, and breast cancer incidence in women was rather low.",
    ],
    whatItMeans: "Uganda's second population-based registry shows that the capital's figures do not describe the north, which helps target prevention and treatment by region.",
    caveats: ["The registry's first years, when case finding was still being established.", "Four districts only."],
    institutions: ["gulu-cancer-registry"], cancers: ["cervical", "burkitt-lymphoma", "kaposi-sarcoma", "prostate"],
    links: [doi("10.1002/ijc.32053", "Int J Cancer 2019"), pubmed("30536374")] }),

  p({ id: "paper-kavuma-radiotherapy-uganda-jgo-2025", name: "How radiotherapy developed in Uganda, 1988 to 2023",
    journal: "JCO Global Oncology", year: 2025, doi: "10.1200/go-24-00339", pmid: "39883898", authors: "Kavuma A, Kibudde S, Kanyike D, Kigula-Mugambe J, Zhao T, Gay H, Sun B, Orem J", paperType: "review",
    tldr: "Radiotherapy at the Uganda Cancer Institute grew from about 600 new patients a year in its second decade to about 2,600 in 2023, and about half of patients are now treated with image-guided or 3D-conformal techniques.",
    summary: "Published as \"Evolution and Recent Radiation Therapy Advancement in Uganda: A Precedent on How to Increase Access to Quality Radiotherapy Services in Low- and Middle-Income Countries\". The authors, from the Uganda Cancer Institute and partners, review radiotherapy in Uganda since services began in 1988 to 1989, including the role of IAEA support.",
    findings: [
      "About 600 new patients a year were treated around the second decade of the service, against about 2,600 in 2023.",
      "About 1,440 brachytherapy insertions are done a year, against 300 a year over the first 20 years.",
      "About 51% of patients are treated with IMRT or VMAT (42%) or three-dimensional conformal radiotherapy (10%).",
      "The government has begun decentralising radiotherapy to other regions.",
    ],
    whatItMeans: "Uganda's radiotherapy has grown fast from a single centre, which the authors offer as a model for the more than 25 African countries without radiotherapy.",
    caveats: ["Written by staff of the service it describes.", "Figures are the authors' reported totals, not an audit."],
    institutions: ["uganda-cancer-institute", "iaea"], cancers: ["cervical"],
    links: [doi("10.1200/go-24-00339", "JCO Glob Oncol 2025"), pubmed("39883898")] }),

  p({ id: "paper-kavuma-cervical-waiting-times-uci-jgo-2025", name: "Waiting times for chemoradiation for locally advanced cervical cancer at the Uganda Cancer Institute",
    journal: "JCO Global Oncology", year: 2025, doi: "10.1200/go-25-00325", pmid: "41061174", authors: "Kavuma A, Kibudde S, Kanyike DM, Luutu I, Orem J", paperType: "observational", participants: 196,
    tldr: "Among 196 women treated for locally advanced cervical cancer at the Uganda Cancer Institute, only a quarter finished radiotherapy within the recommended eight weeks, mainly because of the wait for brachytherapy.",
    summary: "Published as \"Impact of Waiting Time and Treatment Duration on Short-Term Outcomes for Patients With Locally Advanced Cervical Cancer at the Uganda Cancer Institute: The Challenges in Resource-Limited Settings\". A prospective study recorded nine treatment milestones from diagnosis to the end of brachytherapy for 196 patients given conventional or hypofractionated external beam radiotherapy followed by brachytherapy.",
    findings: [
      "The median waiting time was 88 days, and the median wait before starting brachytherapy was 40 days.",
      "Overall treatment took a median of 85 days with conventional radiotherapy and 66 days with hypofractionated radiotherapy.",
      "Only 25% completed treatment within the recommended eight weeks (18% with conventional and 37% with hypofractionated radiotherapy).",
    ],
    whatItMeans: "Brachytherapy capacity, not only external beam machines, decides whether women with cervical cancer in Uganda finish treatment in time.",
    caveats: ["One centre; short-term response only, assessed six months after treatment."],
    institutions: ["uganda-cancer-institute"], cancers: ["cervical"],
    links: [doi("10.1200/go-25-00325", "JCO Glob Oncol 2025"), pubmed("41061174")] }),

  p({ id: "paper-rukundo-ayeh-via-screen-treat-uganda-bmjph-2026", name: "Cost-effectiveness of national cervical screen-and-treat policies in Uganda",
    journal: "BMJ Public Health", year: 2026, doi: "10.1136/bmjph-2026-005684", pmid: "42968783", authors: "Rukundo-Ayeh T, McBain RK, Rasmussen PW, Nakisige C, Beyeza-Kashesya J, Wanyenze RK, Mutungi G, Bogart LM, Wagner GJ", paperType: "methods",
    tldr: "A microsimulation of 30 visual-inspection screen-and-treat policies for Ugandan women aged 25 to 49 found that 13% to 50% of cervical cancer deaths could be averted, at 88 to 313 US dollars per quality-adjusted life year, and that treating women who screen positive matters as much as screening more.",
    summary: "Published as \"Optimising a national screen-and-treat cervical cancer strategy in Uganda: a microsimulation cost-effectiveness and budget impact analysis\". The authors note that fewer than a third of Ugandan women have ever been screened and that current guidelines recommend screening women aged 25 to 49 every three years, and they model policies varying screening frequency, uptake and treatment follow-through over 15 years.",
    findings: [
      "Depending on frequency, uptake and treatment follow-through, 13% to 50% of deaths could be averted compared with current levels.",
      "Fifteen-year costs ranged from 32.9 to 158.6 million US dollars, 5 to 23 dollars per eligible woman.",
      "Incremental cost-effectiveness ratios ranged from 88 to 313 US dollars per quality-adjusted life year gained.",
      "Policies with lower treatment follow-through were dominated by those with higher follow-through, regardless of screening uptake.",
    ],
    whatItMeans: "For Uganda's screening programme, making sure women who test positive are treated is a better use of money than screening more women without that follow-through.",
    caveats: ["A model of visual inspection screening; HPV testing was not among the 30 policies.", "Costs and effects depend on the model's assumptions."],
    institutions: ["uganda-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1136/bmjph-2026-005684", "BMJ Public Health 2026"), pubmed("42968783")] }),
];

/** Records behind /countries/ug/ (wave 6). */
export const recordsUG: EntityInput[] = [...institutions, ...papers];
