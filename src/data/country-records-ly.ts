import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Libya: the public bodies, registries, one hospital and the papers behind /countries/ly/ (wave 13) that the corpus did
 * not hold. Each was written from its own source, read raw on 16 November 2026: the Arabic texts of Cabinet Decisions
 * 963 of 2022 and 321 of 2023 as published by the Law Society of Libya; the National Cancer Control Authority's site
 * (ncca.gov.ly); the National Cancer Control Program's site (nccp.gov.ly) in its Internet Archive copies of 17 June
 * 2022 and 16 March 2025, the live site's certificate having expired; the Ministry of Health's site in Tripoli
 * (moh.gov.ly); the Food and Drug Control Centre's site (fdcc.ly); WHO EMRO's 2024 report "Understanding the private
 * health sector in Libya" (PDF text) and its notes of April and December 2018; WHO's August 2026 list of regulators at
 * maturity level 3 and 4 (PDF text); the IAEA DIRAC equipment report (JSON); and a Libya Observer report of
 * 10 January 2024. DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed
 * abstracts or, for the King Hussein Cancer Center paper, from the open full text.
 *
 * Authority in Libya is divided. The decisions and the ministry and Authority sites read here belong to the Government
 * of National Unity in Tripoli; each record says so and does not describe arrangements under the government based in
 * the east, for which no source was read. Coordinates are approximate city points, not building positions, except
 * Tripoli Central Hospital, whose point is the one IAEA DIRAC lists.
 *
 * The corpus already holds nccp-libya, nci-misurata, nci-sabratha, tripoli-university-hospital and
 * benghazi-national-cancer-center (src/data/institutions/countries-2026-11-mena.ts); they are linked, not repeated.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCCA = "https://ncca.gov.ly";
const NCCP_ARCHIVE = "https://web.archive.org/web/20250316105837/https://www.nccp.gov.ly/";
const NCCP_REGISTRY_ARCHIVE = "https://web.archive.org/web/20220617015654/https://www.nccp.gov.ly/cancer-registry.html";
const D963 =
  "https://lawsociety.ly/legislation/%d9%82%d8%b1%d8%a7%d8%b1-%d8%b1%d9%82%d9%85-963-%d9%84%d8%b3%d9%86%d8%a9-2022-%d9%85-%d8%a8%d8%a5%d9%86%d8%b4%d8%a7%d8%a1-%d8%a7%d9%84%d9%87%d9%8a%d8%a6%d8%a9-%d8%a7%d9%84%d9%88%d8%b7%d9%86%d9%8a/";
const D321 =
  "https://lawsociety.ly/legislation/%d9%82%d8%b1%d8%a7%d8%b1-%d8%b1%d9%82%d9%85-321-%d9%84%d8%b3%d9%86%d8%a9-2023-%d9%85-%d8%a8%d8%a7%d8%b9%d8%aa%d9%85%d8%a7%d8%af-%d8%a7%d9%84%d9%87%d9%8a%d9%83%d9%84-%d8%a7%d9%84%d8%aa%d9%86%d8%b8/";
const LO_2024 = "https://libyaobserver.ly/health/libyan-pm-urges-handling-file-tumors-patients-professionally-and-seriously";
const WHO_PRIVATE = "https://applications.emro.who.int/docs/9789292742447-eng.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/lby-2020.pdf";
const EMRO_SIAMED = "https://www.emro.who.int/lby/libya-events/siamed-workshop.html";
const EMRO_SUPPLY = "https://www.emro.who.int/lby/libya-news/seminar-on-developing-libyan-supply-chain-technical-guidelines.html";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const DIRAC = { label: "IAEA DIRAC: radiotherapy centres and equipment (read 16 November 2026)", url: "https://dirac.iaea.org/Data/CountriesLight" };
const BCR_2015 = "10.1016/j.annepidem.2015.03.012";
const BCR_2007 = "10.1002/ijc.22273";
const MISURATA_2022 = "10.1002/cnr2.1448";
const KHCC_2023 = "10.3389/fonc.2022.1025757";

const institutions: InstitutionInput[] = [
  i({ id: "ncca-libya", name: "National Cancer Control Authority, Libya", aka: ["NCCA Libya", "الهيئة الوطنية لمكافحة السرطان"],
    city: "Tripoli", country: "LY", lat: 32.89, lng: 13.19, institutionType: "government", website: NCCA,
    tldr: "A public authority created in Tripoli by a Cabinet decision of the Government of National Unity in 2022. The decision charges it with supplying cancer medicines and transfers the cancer centres and institutes to it. Its site, read in November 2026, says it imports and distributes medicines and keeps a register of patients, whose counter showed 35,908 people in September 2026.",
    summary: "Cabinet Decision 963 of 2022 of the Government of National Unity creates the National Cancer Control Authority as a public authority with legal personality, attached to the Cabinet office, with its seat in Tripoli. Its listed aims include policies and programmes for cancer control, treating cancer patients inside the country, early detection, a database of patients and cancer types, supplying and importing medicines and equipment for all centres and departments that treat cancer, training, and palliative and psychological support. Article 11 transfers the programmes, centres and institutes concerned with cancer prevention and treatment to it. The text published by the Law Society of Libya is dated 14 October 2022, although it cites letters dated November 2022; OnCo did not read the official gazette.\n\nDecision 321 of 24 May 2023 approves its structure: departments for prevention and early detection; diagnosis, treatment and palliative care; monitoring and scientific and medical research, which oversees the national cancer registry; pharmacy, equipment and medical supply; and the affairs of branches, centres and institutes.\n\nThe Authority's site, in undated text read on 16 November 2026, says that registered patients receive their medicines free of charge using its Muhareb card; it says in one place that it has launched an early detection programme and in another that it is working on one; and, in a counter dated 23 September 2026, it says that it has 35,908 registered people, whom it calls fighters; the number of health centres beside that figure is 17 on the English page and 22 on the Arabic page. The Libya Observer reported on 10 January 2024 that the Authority's director, Haider Al-Sayeh, told the Prime Minister of the Government of National Unity that 22,059 cases had been registered. The site gives its address as Suq al-Jumaa, Tripoli; the coordinates here are an approximate Tripoli city point. No source from the government based in eastern Libya was read, and OnCo does not know how far the Authority's arrangements apply there.",
    programs: ["Import and distribution of cancer medicines (as its site said, read 16 November 2026)", "Muhareb patient registration platform and card (as its site said, read 16 November 2026)", "Early detection programme (announced on its site, read 16 November 2026; not confirmed as running)", "Oversight of the national cancer registry (assigned by Decision 321 of 2023)"],
    institutions: ["nccp-libya", "libya-national-cancer-registry", "nci-misurata", "nci-sabratha", "libya-ministry-of-health"],
    cancers: ["breast-cancer", "colorectal"], related: ["global-oncology-access"],
    links: [
      { label: "National Cancer Control Authority, Libya", url: NCCA },
      { label: "Cabinet Decision 963 of 2022, creating the Authority (Arabic, Law Society of Libya)", url: D963 },
      { label: "Cabinet Decision 321 of 2023, structure of the Authority (Arabic, Law Society of Libya)", url: D321 },
      { label: "Libya Observer: meeting on the Authority's plan for 2024 (10 January 2024)", url: LO_2024 },
    ] }),

  i({ id: "libya-national-cancer-registry", name: "National Cancer Registry, Libya", aka: ["Libyan Cancer Registry", "سجل السرطان الوطني", "سجل السرطان الليبي"],
    city: "Tripoli", country: "LY", lat: 32.89, lng: 13.18, institutionType: "research-institute",
    tldr: "A national cancer registry described in 2022 on the site of the National Cancer Control Program in Tripoli, counting cases from 1 January 2020. It published 3,784 cases for 2020 after removing duplicates; breast cancer was 25.8% and colon cancer 18.9%. No later figures were found.",
    summary: "The registry's page on the National Cancer Control Program's site, read in its Internet Archive copy of 17 June 2022, describes the National Cancer Registry as a population-based registry that collects data on cancer patients from different sources in all parts of Libya, supervised by the programme, with 1 January 2020 as its reference date and a single data collection form. Its aims include annual incidence, geographic distribution, stage at diagnosis and death rates.\n\nThe programme's home page, in the Internet Archive copy of 16 March 2025, carries statistics for cases with a 2020 diagnosis date, dated 15 June 2022: 6,528 records from cancer centres and departments in Sabha, Sirte, Misrata, Sabratha and Tripoli (2,887), public histopathology departments (602), private histopathology laboratories (1,735), private clinics (211) and the Ministry of Health's treatment affairs department (1,093), which became 3,784 cases once duplicates were removed. The ten commonest were breast (976), colon (715), lung (193), prostate (182), lymphoma (163), leukaemia (152), uterus (144), stomach (118), bladder (110) and brain (91). No cancer centre in eastern Libya is named among the sources. OnCo found no figures for any later year and no rates.\n\nCabinet Decision 321 of 2023, a decision of the Government of National Unity, gives oversight of the national cancer registry to the monitoring and research department of the National Cancer Control Authority; OnCo read no source on whether the registry has passed from the programme to the Authority. WHO's 2020 profile, for 2019, described the availability of a population-based registry as registration activity. The coordinates are an approximate Tripoli city point.",
    programs: ["National cancer registration (reference date 1 January 2020; described on the programme's site in 2022, figures published for 2020)"],
    institutions: ["nccp-libya", "ncca-libya", "nci-misurata", "nci-sabratha", "tripoli-university-hospital", "tripoli-central-hospital"],
    cancers: ["breast-cancer", "colorectal", "lung-cancer"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "National Cancer Registry page (Arabic; Internet Archive copy of 17 June 2022)", url: NCCP_REGISTRY_ARCHIVE },
      { label: "National Cancer Control Program, Libya: registry statistics for 2020 (Arabic; Internet Archive copy of 16 March 2025)", url: NCCP_ARCHIVE },
      { label: "Cabinet Decision 321 of 2023 (Arabic, Law Society of Libya)", url: D321 },
      { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
    ] }),

  i({ id: "benghazi-cancer-registry", name: "Benghazi Cancer Registry", aka: ["BCR Libya", "Benghazi Population-Based Cancer Registry"],
    city: "Benghazi", country: "LY", lat: 32.12, lng: 20.08, institutionType: "research-institute",
    tldr: "A cancer registry whose reports of 2007 and 2015 describe population-based registration for eastern Libya, about 1.6 million people. It registered 997 cancers in 2003 and 3,307 over 2003 to 2005; OnCo found no report from it for any later year.",
    summary: "The registry's first report, published in 2007, says that until then no population-based data had been available for Libya, and describes registry staff routinely visiting all hospitals and pathology laboratories in eastern Libya (1.6 million inhabitants) and collecting information from all death registration offices. It registered 997 primary cancers among residents in 2003. The updated report for 2003 to 2005 counted 3,307 patients, age-standardised incidence of 135.4 per 100,000 in men and 107.1 in women, 1,367 cancer deaths and a five-year relative survival of 22.3% for all cancers combined.\n\nIARC's GLOBOCAN 2024 fact sheet says its estimate for Libya applies the rates of a subnational registry to the 2024 population without naming the registry; its national rates (135.9 in men, 106.2 in women) are close to this registry's for 2003 to 2005, which is OnCo's comparison and not IARC's statement. OnCo found no website for the registry and no report after 2005; a later hospital series from Benghazi Medical Center covers 2012. The coordinates are an approximate Benghazi city point.",
    programs: ["Population-based cancer registration for eastern Libya (reports for 2003 to 2005)"],
    institutions: ["iarc"], cancers: ["lung-cancer", "breast-cancer", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-el-mistiri-benghazi-cancer-registry-2003-2005-ann-epidemiol-2015", "paper-el-mistiri-benghazi-cancer-registry-2003-int-j-cancer-2007"],
    links: [
      doi(BCR_2015, "El Mistiri et al., updated report from the Benghazi Cancer Registry (Ann Epidemiol 2015)"),
      doi(BCR_2007, "El Mistiri et al., first report from the Benghazi Cancer Registry, 2003 (Int J Cancer 2007)"),
      { label: "IARC: GLOBOCAN 2024 fact sheet, Libya (PDF)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/434-libya-fact-sheet.pdf" },
    ] }),

  i({ id: "libya-ministry-of-health", name: "Ministry of Health, Libya (Tripoli)", aka: ["MoH Libya", "وزارة الصحة الليبية", "Libyan Ministry of Health"],
    city: "Tripoli", country: "LY", lat: 32.89, lng: 13.18, institutionType: "government", website: "https://moh.gov.ly",
    tldr: "The health ministry in Tripoli whose site, read in November 2026, says its structure rests on a 2022 decision of the Cabinet of the Government of National Unity. WHO's 2024 report says care in public facilities is free under a health law of 1973; the ministry's site describes a Medical Insurance Authority and a Health Strategic Plan for 2023 to 2030 about the health workforce.",
    summary: "This record describes the Ministry of Health whose site (moh.gov.ly) gives its address as behind Tripoli University Hospital. WHO's Regional Office wrote in 2024 that Libya has a Government of National Unity based in Tripoli and a rival government in Benghazi, and that health governance has been fragmented since 2014; OnCo read no source from a health ministry in the east.\n\nWHO's 2024 report says that under Law No. 106 of 1973 care in public health facilities is free for the whole population, and that the Ministry directly supervises central institutions including the Health Information Centre, the National Centre for Disease Control, the Medical Supply Organization, hospitals and medical centres. WHO described the Ministry's Pharmacy Administration in 2018 as Libya's drug regulatory authority.\n\nThe Ministry's site, in undated pages read on 16 November 2026, describes a Medical Insurance Authority whose role is to set and run insurance schemes and contract with providers, says on its health policy page that the insurance system faces major challenges in application and funding, and summarises a Health Strategic Plan for 2023 to 2030 centred on the health workforce, which does not mention cancer. Cabinet Decision 963 of 2022 of the Government of National Unity transfers cancer programmes, centres and institutes to the National Cancer Control Authority, which it attaches to the Cabinet office and not to the Ministry; OnCo read no account of how far the transfer was carried out. A paper from Jordan's King Hussein Cancer Center records an agreement with the Libyan Ministry of Health in June 2017 to treat Libyan cancer patients, and says the agreement fell short in 2021 because of unpaid debts; the paper does not say which government's ministry signed in 2017. The coordinates are an approximate Tripoli city point.",
    programs: ["Free care in public facilities (Law No. 106 of 1973, as WHO described it in 2024)", "Medical Insurance Authority (described on the ministry's site, read 16 November 2026)", "Health Strategic Plan 2023 to 2030 (summarised on the ministry's site, read 16 November 2026)"],
    institutions: ["ncca-libya", "nccp-libya", "libya-pharmacy-administration", "tripoli-university-hospital", "tripoli-central-hospital", "khcc", "who"],
    related: ["global-oncology-access"],
    links: [
      { label: "Ministry of Health, Tripoli (Arabic)", url: "https://moh.gov.ly" },
      { label: "Ministry of Health, Tripoli: Medical Insurance Authority (Arabic)", url: "https://moh.gov.ly/pages/centers-offices/medical-insurance" },
      { label: "Ministry of Health, Tripoli: Health Strategic Plan 2023 to 2030 (Arabic)", url: "https://moh.gov.ly/pages/about-ministry/health-plan" },
      { label: "WHO EMRO: Understanding the private health sector in Libya (2024, PDF)", url: WHO_PRIVATE },
    ], keyPapers: ["paper-erashdi-libyan-patients-khcc-front-oncol-2022"] }),

  i({ id: "libya-pharmacy-administration", name: "Pharmacy Administration, Ministry of Health, Libya", aka: ["Pharmacy Administration (Libya)", "Libya drug regulatory authority", "إدارة الصيدلة"],
    city: "Tripoli", country: "LY", lat: 32.89, lng: 13.18, institutionType: "government",
    tldr: "The department of Libya's Ministry of Health that WHO described in 2018 as the country's drug regulatory authority, responsible for registering medicines. No Libyan regulator is on WHO's August 2026 list of regulators at maturity level 3 or 4, and OnCo found nothing newer than 2018 on its work.",
    summary: "WHO wrote on 12 April 2018 that it had run a workshop in Tripoli for the Pharmacy Administration, Libya's drug regulatory authority, based in the Ministry of Health, to set up SIAMED, WHO's model system for computer-assisted drug registration; seven staff of its Registration Department took part, under a European Union funded project. A WHO note of 30 December 2018 records the Pharmacy Administration and the Medical Supply Organization among the bodies that agreed guidelines for selecting, procuring, storing and distributing medicines, to be sent for ministerial approval.\n\nA 2010 review in the Libyan Journal of Medicine says the Health Law, Act 106 of 1973, requires a medicine to be registered with the Ministry of Health before it is available on the Libyan market. Libya is not on WHO's August 2026 list of regulators at maturity level 3 or 4. OnCo found no website with a register of approved medicines or registration rules: the pharmacy system linked from the Ministry's site did not resolve on 16 November 2026. How its work is divided with the Food and Drug Control Centre was not established. The coordinates are an approximate Tripoli city point.",
    programs: ["Registration of medicines (WHO workshop to set up the SIAMED system, 2018)"],
    institutions: ["libya-ministry-of-health", "libya-food-and-drug-control-centre", "who"],
    links: [
      { label: "WHO EMRO: workshop to install the WHO model system for computer-assisted drugs registration (12 April 2018)", url: EMRO_SIAMED },
      { label: "WHO EMRO: seminar on Libyan supply chain technical guidelines (30 December 2018)", url: EMRO_SUPPLY },
      doi("10.3402/ljm.v5i0.5440", "Mustafa and Kowalski, a need for the standardization of the pharmaceutical sector in Libya (Libyan J Med 2010)"),
      { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
    ] }),

  i({ id: "libya-food-and-drug-control-centre", name: "Food and Drug Control Centre, Libya", aka: ["FDCC Libya", "مركز الرقابة على الأغذية والأدوية", "Food and Drug Control Center"],
    city: "Tripoli", country: "LY", lat: 32.88, lng: 13.19, institutionType: "government", website: "https://fdcc.ly",
    tldr: "A Libyan public centre, with its general administration in Tripoli, that says on its site, read in November 2026, that it is charged with ensuring that the food and medicines in circulation are safe. The site carries undated inspection news, mostly about food shipments, and no register of medicines; the latest dated items on its front page are from February 2022.",
    summary: "The centre's site carries its director's statement that the Food and Drug Control Centre was established as an independent centre with legal personality, entrusted with the procedural, executive and control tasks needed to ensure the safety of food and medicines for people and animals and of biological and chemical preparations that directly affect citizens' health. The front page read on 16 November 2026 reports rejected food shipments, inspection campaigns and training in undated items, and names offices in Sabha and Al Bayda and a unit in Suq al-Jumaa; its footer is dated 2021, the latest dated items on it are from 13 February 2022, and it does not say which government the centre answers to. The site gives the general administration's address in Tripoli; the coordinates are an approximate Tripoli city point.\n\nOnCo found no list of registered medicines on the site and did not establish how the centre's work on medicines is divided with the Ministry of Health's Pharmacy Administration, which WHO described in 2018 as the drug regulatory authority.",
    programs: ["Inspection and control of food and medicines (its stated remit; site read 16 November 2026)"],
    institutions: ["libya-pharmacy-administration", "libya-ministry-of-health"],
    links: [{ label: "Food and Drug Control Centre, Libya (Arabic)", url: "https://fdcc.ly" }] }),

  i({ id: "tripoli-central-hospital", name: "Tripoli Central Hospital", aka: ["مستشفى طرابلس المركزي", "Tripoli Central Hospital oncology departments"],
    city: "Tripoli", country: "LY", lat: 32.874, lng: 13.192, institutionType: "hospital",
    tldr: "A hospital in Tripoli whose oncology departments supplied records to the national cancer registry for 2020. The IAEA's directory lists it with three linear accelerators and a cobalt unit, in an entry last updated in 2022.",
    summary: "IAEA DIRAC, read on 16 November 2026, lists Tripoli Central Hospital with three linear accelerators and one cobalt-60 unit, one simulator and no brachytherapy, in an entry last updated in 2022; the coordinates on this record are the point DIRAC gives. The national cancer registry's statistics for 2020 name the hospital's oncology departments and its histopathology department among their data sources. OnCo found no website for the hospital and could not confirm which machines are working now.",
    programs: ["Radiotherapy (three linear accelerators and a cobalt unit in IAEA DIRAC, 2022 entry)", "Oncology and histopathology departments named as sources in the national cancer registry's 2020 statistics"],
    institutions: ["libya-national-cancer-registry", "libya-ministry-of-health", "iaea"],
    links: [DIRAC, { label: "National Cancer Control Program, Libya: registry statistics for 2020 (Arabic; Internet Archive copy of 16 March 2025)", url: NCCP_ARCHIVE }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-el-mistiri-benghazi-cancer-registry-2003-2005-ann-epidemiol-2015", name: "Cancer incidence, mortality and survival in eastern Libya, 2003 to 2005, from the Benghazi Cancer Registry",
    journal: "Annals of Epidemiology", year: 2015, doi: BCR_2015, pmid: "25911981", authors: "El Mistiri M, Salati M, Marcheselli L, Attia A, Habil S, Alhomri F, Spika D, Allemani C, Federico M", paperType: "observational", participants: 3307,
    tldr: "Over 2003 to 2005 the Benghazi Cancer Registry recorded 3,307 people with cancer in eastern Libya; lung cancer led in men and breast cancer in women, and five-year relative survival for all cancers combined was 22.3%.",
    summary: "Published as \"Cancer incidence, mortality, and survival in Eastern Libya: updated report from the Benghazi Cancer Registry\". Incidence, mortality and survival data were collected by the Benghazi Cancer Registry for residents of eastern Libya over three years, from 1 January 2003 to 31 December 2005.",
    findings: [
      "3,307 cancer patients were registered; world age-standardised incidence for all sites was 135.4 per 100,000 in men and 107.1 in women.",
      "In men the commonest cancers were lung (18.9%), colorectum (10.4%), bladder (10.1%) and prostate (9.4%); in women breast (23.2%), colorectum (11.2%), corpus uteri (6.7%) and leukaemia (5.1%).",
      "1,367 cancer deaths were recorded; five-year relative survival for all cancers combined was 22.3%, 19.8% in men and 28.2% in women.",
    ],
    whatItMeans: "Its authors describe it as the most comprehensive survival data set so far generated for people diagnosed in eastern Libya in 2003 to 2005. It is the source of the survival figures for eastern Libya on OnCo's page; no later ones were found, and none for the country as a whole. They describe people diagnosed two decades ago in the east of the country.",
    caveats: ["Eastern Libya only, for diagnoses in 2003 to 2005; no later report from the registry was found.", "Figures here are from the abstract; the full text was not read."],
    institutions: ["benghazi-cancer-registry"], cancers: ["lung-cancer", "breast-cancer", "colorectal"],
    links: [doi(BCR_2015, "Ann Epidemiol 2015"), pubmed("25911981")] }),

  p({ id: "paper-el-mistiri-benghazi-cancer-registry-2003-int-j-cancer-2007", name: "Cancer incidence in eastern Libya in 2003: the first report from the Benghazi Cancer Registry",
    journal: "International Journal of Cancer", year: 2007, doi: BCR_2007, pmid: "17066425", authors: "El Mistiri M, Verdecchia A, Rashid I, El Sahli N, El Mangush M, Federico M", paperType: "observational", participants: 997,
    tldr: "Described by its authors as the first population-based cancer data for Libya: 997 cancers registered in 2003 among about 1.6 million people in the east, with age-standardised rates of 118 per 100,000 in men and 95 in women.",
    summary: "Published as \"Cancer incidence in eastern Libya: the first report from the Benghazi Cancer Registry, 2003\". Registry staff routinely visited all hospitals and pathology laboratories in eastern Libya (1.6 million inhabitants) and collected information from all death registration offices; an archive of existing cases was built before the 2003 data were collected.",
    findings: [
      "997 primary cancers were registered among residents in 2003; world age-standardised incidence for all sites except non-melanoma skin was 118 per 100,000 in men and 95 in women.",
      "In men the commonest were lung (19%), colorectal (10%), head and neck (9%) and bladder (9%) cancers; in women breast (26%), colon and rectum (9%), uterus (7%) and non-Hodgkin lymphoma (5%).",
      "The authors found the pattern quite different from earlier estimates based on neighbouring countries' data.",
    ],
    whatItMeans: "The first of the registry's two reports: registered incidence for eastern Libya in 2003, from a registry whose authors describe active collection of cases across the east of the country. They write that until then no population-based data had been available for Libya.",
    caveats: ["One year, eastern Libya only.", "Figures here are from the abstract; the full text was not read."],
    institutions: ["benghazi-cancer-registry"], cancers: ["lung-cancer", "breast-cancer", "colorectal"],
    links: [doi(BCR_2007, "Int J Cancer 2007"), pubmed("17066425")] }),

  p({ id: "paper-zarmouh-misurata-cancer-incidence-cancer-rep-2022", name: "Cancer incidence in Misurata, central Libya, July 2019 to June 2020",
    journal: "Cancer Reports", year: 2022, doi: MISURATA_2022, pmid: "34129289", authors: "Zarmouh A, Almalti A, Alzedam A, Hamad M, Elmughrabi H, Alnajjar L, Elmugassabi M, Kashbour M, Elsaghayer W", paperType: "observational", participants: 430,
    tldr: "A city-wide search of imaging and pathology reports in Misurata found 430 cancers diagnosed in twelve months, an incidence of 71.7 per 100,000; breast and colorectal cancer were each about a fifth.",
    summary: "Published as \"Cancer incidence in the middle region of Libya: Data from the cancer epidemiology study in Misurata\". An observational, multi-centre study that examined all computed tomography, magnetic resonance and pathology reports across public and private hospitals in and around Misurata to count cancers diagnosed from July 2019 to June 2020.",
    findings: [
      "430 cancers were identified, an incidence of 71.7 per 100,000 population (the abstract's conclusion gives 71.1).",
      "Breast cancer (84, 19.5%), colorectal cancer (83, 19.3%), lung cancer (33, 7.7%) and prostate cancer (21, 4.9%) were the most frequent.",
      "The authors say cases were missed, mostly because of poor documentation and a disorganised healthcare structure, and call for a national or regional registry.",
    ],
    whatItMeans: "A local count from central Libya for the twelve months to June 2020. Its authors say that cases were missed, and they call for a national or regional registry.",
    caveats: ["One city and one year; a crude rate, not age-standardised.", "The abstract states two slightly different incidence figures."],
    institutions: ["nci-misurata"], cancers: ["breast-cancer", "colorectal", "lung-cancer"],
    links: [doi(MISURATA_2022, "Cancer Rep 2022"), pubmed("34129289")] }),

  p({ id: "paper-erashdi-libyan-patients-khcc-front-oncol-2022", name: "Libyan patients with cancer treated at the King Hussein Cancer Center, Jordan, 2006 to 2019",
    journal: "Frontiers in Oncology", year: 2022, doi: KHCC_2023, pmid: "36776359", authors: "Erashdi M, Al-Ani A, Mansour A, Al-Hussaini M", paperType: "observational", participants: 3170,
    tldr: "A review of all 3,170 Libyan patients seen at Jordan's King Hussein Cancer Center over fourteen years: breast, blood and gastrointestinal cancers were the most often referred, and 37.8% had cancer that had spread when they first arrived.",
    summary: "Published as \"Libyan cancer patients at King Hussein Cancer Center for more than a decade, the current situation, and a future vision\". A retrospective chart review of every Libyan patient with cancer presenting to the centre between 2006 and 2019. It is in volume 12 of the journal, dated 2022, and was published online on 26 January 2023.",
    findings: [
      "3,170 records were analysed; the abstract calls the sample predominantly adults (71%), the full text gives 71% as aged 30 to 69 and 355 patients (11%) as paediatric, and the male-to-female ratio was 1 to 1.2.",
      "The cancers most often referred were breast (21%), haematolymphoid (17%) and gastrointestinal (16.2%).",
      "37.8% of patients presented with distant metastasis at their first visit to the centre.",
      "From the full text: 2,888 patients (91%) came between 2012 and 2019, and an agreement with the Libyan Ministry of Health in June 2017 was followed by a surge in referrals; the authors write that the agreement fell short in 2021 because of unpaid debts.",
    ],
    whatItMeans: "A published account of Libyans travelling abroad for cancer care, from one centre in Jordan. The authors recommend national screening and awareness programmes, multidisciplinary boards and a national cancer registry for Libya.",
    caveats: ["The study covers patients referred abroad to one centre; it does not describe all people with cancer in Libya.", "Survival was not reported, and many patients had been diagnosed and partly treated before arrival."],
    institutions: ["khcc", "libya-ministry-of-health"], cancers: ["breast-cancer", "colorectal"],
    links: [doi(KHCC_2023, "Front Oncol 2022"), pubmed("36776359")] }),
];

/** Records behind /countries/ly/ (wave 13). */
export const recordsLY: EntityInput[] = [...institutions, ...papers];
