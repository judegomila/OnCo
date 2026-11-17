import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Ukraine: the public bodies and papers behind /countries/ua/ that the corpus did not hold. Every record was written
 * from Ukrainian sources read raw in Ukrainian on 4 November 2026: the National Cancer Registry of Ukraine's Bulletin
 * No. 27, "Cancer in Ukraine, 2024-2025" (PDF, pdftotext), the Cabinet of Ministers' resolution No. 1808 of
 * 31 December 2025 on the 2026 Programme of Medical Guarantees and the Law "On Medicinal Products" (both read through
 * Internet Archive copies of zakon.rada.gov.ua, which did not answer directly), the State Expert Centre's own pages
 * and its health technology assessment conclusions, and the Ministry of Health's pages. The two papers were resolved
 * through Europe PMC and written from their abstracts.
 *
 * Coordinates: the registry (at the National Cancer Institute, 33/43 Yulii Zdanovskoi Street) and the State Expert
 * Centre (10 Simi Brodskykh Street) are their published addresses geocoded through OpenStreetMap Nominatim. The
 * addresses of the National Health Service of Ukraine and of Medical Procurement of Ukraine were not read, so both
 * carry central Kyiv coordinates.
 *
 * Inbound links: the payer links the registry, the regulator and the procurement agency; the regulator and the
 * procurement agency link each other and the payer; the two papers link each other.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCRU_B27 = "http://www.ncru.inf.ua/publications/BULL_27/index.htm";
const NCRU_REVIEW = "http://www.ncru.inf.ua/publications/BULL_27/PDF/10-23-oglyad_N27.pdf";
const NCRU_30Y = "http://www.ncru.inf.ua/publications/BULL_27/PDF/1-4_NCRU_30years.pdf";
const PMG_2026 = "https://web.archive.org/web/20260719132453/https://zakon.rada.gov.ua/laws/show/1808-2025-%D0%BF";
const DEC_HTA = "https://www.dec.gov.ua/materials/derzhavna-oczinka-medychnyh-tehnologij/";
const DEC_HTA_DOSSIERS = "https://www.dec.gov.ua/materials/derzhavna-oczinka-medychnyh-tehnologij-zayavy-ta-dosye/";
const DEC_SRA = "https://www.dec.gov.ua/applicant/perelikiv-lz-yaki-zare-strovani-kompetentnimi-organami/";
const DEC_ABOUT = "https://www.dec.gov.ua/derzhavne-pidpryyemstvo-derzhavnyj-ekspertnyj-czentr-ministerstva-ohorony-zdorov-ya-ukrayiny/";
const MOZ_MEA = "https://moz.gov.ua/uk/v-ukrayini-z-yavlyatsya-tri-novi-innovacijni-preparati-dlya-likuvannya-onkologichnih-zahvoryuvan";
const IFX_MPU = "https://interfax.com.ua/news/pharmacy/1142030.html";
const TDXD_HTA = "https://www.dec.gov.ua/files/b7Hhr3JN9G/vysnovok-z-derzhavnoyi-omt-trastuzumab-derukstekan-enhertu-vid-27.02.2026.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "ncru-ukraine", name: "National Cancer Registry of Ukraine (Національний канцер-реєстр України)", aka: ["Національний канцер-реєстр України", "НКРУ", "NCRU", "National Cancer Registry of Ukraine", "Ukrainian Cancer Registry"],
    city: "Kyiv", country: "UA", lat: 50.389, lng: 30.485, institutionType: "government", website: "http://www.ncru.inf.ua",
    tldr: "Ukraine's population-based cancer registry, run from the National Cancer Institute in Kyiv with a registry in every region. Its latest bulletin counts 124,801 new cancers and 44,545 cancer deaths registered in 2024, and says deaths are badly undercounted because regional registries have lost access to death records.",
    summary: "The registry traces its legal start to the Ministry of Health's order No. 10 of 30 December 1996 on creating a national cancer registry, built on a state system of compulsory cancer registration that its own history dates to 1953. A population-based registry runs in every region, inside the regional cancer centres, and a hospital registry system is used in 26 of the largest cancer clinics, which send electronic discharge summaries to the population registry. Its central unit sits in the National Cancer Institute in Kyiv. The registry says it covers the whole population, that its data appear in volumes X to XII of Cancer Incidence in Five Continents, and that it has been a member of the European Network of Cancer Registries since the end of the 1990s.\n\nBulletin No. 27, \"Cancer in Ukraine, 2024-2025\", published in Kyiv in 2026, counts 124,801 new cancers in 2024 (60,397 in men and 64,404 in women) and 44,545 cancer deaths, excluding Crimea and Sevastopol. It gives only counts and proportions: with no population figures from the State Statistics Service for 2024 and 2025, it says, rates per 100,000 cannot be calculated. It reports a growing undercount of deaths since 2015, worse since 2019, because regional registries lost access to death records, and an undercount of cases in Donetsk and Luhansk since 2014 and in Zaporizhzhia and Kherson since 2022 because of occupation and displacement. It concludes that, in present conditions, it can keep only the count of new cancers at a reliable level, close to 95%, and not earlier than a year after the year ends.",
    programs: ["Annual bulletin: Cancer in Ukraine", "Regional population-based registries", "Hospital cancer registries in 26 cancer clinics", "Linkage with the Chornobyl registry"],
    cancers: ["breast-cancer", "prostate", "lung-cancer", "colorectal", "thyroid"], institutions: ["nci-ukraine"],
    links: [
      { label: "NCRU: Bulletin No. 27, Cancer in Ukraine 2024-2025", url: NCRU_B27 },
      { label: "NCRU: analytical review, Bulletin No. 27 (PDF)", url: NCRU_REVIEW },
      { label: "NCRU: 30 years of the National Cancer Registry (PDF)", url: NCRU_30Y },
    ] }),

  i({ id: "nhsu", name: "National Health Service of Ukraine (Національна служба здоров'я України)", aka: ["Національна служба здоров'я України", "НСЗУ", "NHSU", "National Health Service of Ukraine"],
    city: "Kyiv", country: "UA", lat: 50.45, lng: 30.524, institutionType: "government", website: "https://nszu.gov.ua",
    tldr: "Ukraine's national purchaser of health services under the Programme of Medical Guarantees. It contracts hospitals and clinics under the yearly Programme of Medical Guarantees, including separate packages for chemotherapy, radiotherapy and blood cancers, and reimburses a list of medicines for treatment outside hospital.",
    summary: "The National Health Service of Ukraine (НСЗУ) signs contracts with providers under the Programme of Medical Guarantees and pays them at rates the Cabinet of Ministers sets each year. For 2026 the rules are in Cabinet resolution No. 1808 of 31 December 2025. Chemotherapy for cancer is a package paid as a global rate, built from an annual capitation of 36,807 hryvnias per patient with age weights: 3.555 for children, 0.97 for adults treated in hospital and 0.7 for adults treated only as outpatients. Radiotherapy is paid per course at 51,368 hryvnias, weighted 1.5 for a linear accelerator, gamma knife or brachytherapy and 0.753 for older cobalt or X-ray units. Blood cancers have their own package, built from a rate of 74,429 hryvnias per patient per year with its own weights, and PET-CT is paid at 19,185 hryvnias a scan, with 4,000 scans planned for 2026.\n\nThe same resolution lists the medicines the service reimburses for outpatient treatment. Under the heading of cancer the 2026 list holds three: exemestane, letrozole and tamoxifen, for breast cancer patients prescribed hormone therapy. The resolution also has the service assess primary care providers once a year, by 30 November, on how much of their population is covered by screening for breast, cervical and colorectal cancer. Providers in areas with active fighting or under occupation are handled under separate rules.",
    programs: ["Programme of Medical Guarantees", "Chemotherapy package", "Radiotherapy package", "Haematology and blood cancer package", "Reimbursement of medicines for outpatient treatment", "Mammography and endoscopy packages"],
    drugs: ["letrozole", "tamoxifen", "exemestane"], cancers: ["breast-cancer"],
    institutions: ["ncru-ukraine", "dec-ukraine", "medical-procurement-ukraine"],
    links: [
      { label: "Cabinet of Ministers resolution No. 1808 of 31 December 2025, 2026 Programme of Medical Guarantees (Internet Archive copy of zakon.rada.gov.ua, July 2026)", url: PMG_2026 },
      { label: "NHSU website (did not answer scripts on 4 November 2026)", url: "https://nszu.gov.ua" },
    ] }),

  i({ id: "dec-ukraine", name: "State Expert Centre of the Ministry of Health of Ukraine (Державний експертний центр МОЗ України)", aka: ["Державний експертний центр МОЗ України", "ДЕЦ", "State Expert Centre", "SEC MOH Ukraine", "DEC Ukraine"],
    city: "Kyiv", country: "UA", lat: 50.452, lng: 30.447, institutionType: "government", website: "https://www.dec.gov.ua",
    tldr: "The Ministry of Health's expert body for clinical trials, medicine registration and drug safety, and Ukraine's health technology assessment agency. It assesses whether a cancer medicine is worth buying with public money, but its conclusions are advisory.",
    summary: "The State Expert Centre is a state enterprise that describes itself as the Ministry of Health's authorised specialist expert organisation for preclinical study, clinical trials and state registration of medicines, and the lead organisation for pharmacovigilance; registration decisions themselves are taken by the Ministry. It publishes lists of medicines registered by the competent authorities of the United States, the United Kingdom, Switzerland, Japan, Australia, Canada and the European Union, which go through a shortened Ukrainian procedure.\n\nIts Department of Health Technology Assessment carries out state assessment under Cabinet resolution No. 1300 of 23 December 2020: for adding medicines to the National List of Essential Medicines, to the lists bought with state budget money, for managed entry agreements and their extension, and for some regional purchases. It publishes each application and conclusion. For trastuzumab deruxtecan in HER2-positive metastatic breast cancer, applied for on 1 August 2025, the conclusion of 27 February 2026 found the cost per quality-adjusted life year above five times GDP per head (659,720 hryvnias, on 2021 figures) and so not cost-effective on Ukraine's recommended scale, and still recommended it for central purchase, including through a managed entry agreement.",
    programs: ["Health technology assessment", "Clinical trial review", "Registration dossier review", "Pharmacovigilance", "State Formulary of Medicines"],
    drugs: ["trastuzumab-deruxtecan", "pembrolizumab", "daratumumab"], terms: ["hta"],
    institutions: ["medical-procurement-ukraine", "nhsu"],
    links: [
      { label: "State Expert Centre: about the enterprise", url: DEC_ABOUT },
      { label: "State Expert Centre: state health technology assessment", url: DEC_HTA },
      { label: "State Expert Centre: HTA applications and conclusions", url: DEC_HTA_DOSSIERS },
      { label: "State Expert Centre: HTA conclusion on trastuzumab deruxtecan, 27 February 2026 (PDF)", url: TDXD_HTA },
      { label: "State Expert Centre: lists of medicines registered by competent authorities", url: DEC_SRA },
    ] }),

  i({ id: "medical-procurement-ukraine", name: "Medical Procurement of Ukraine (ДП «Медичні закупівлі України»)", aka: ["Медичні закупівлі України", "МЗУ", "Medical Procurement of Ukraine", "MPU", "Medzakupivli"],
    city: "Kyiv", country: "UA", lat: 50.45, lng: 30.524, institutionType: "government", website: "https://mpu.gov.ua",
    tldr: "The state enterprise that buys medicines and equipment for Ukraine's national health programmes, including cancer medicines given free to patients. It signs managed entry agreements, confidential price deals with manufacturers, for expensive cancer medicines.",
    summary: "Medical Procurement of Ukraine is the Ministry of Health's central purchasing agency. The Ministry announced on 22 October 2025 that the government had added three cancer medicines to the list bought under managed entry agreements, palbociclib for hormone-receptor-positive, HER2-negative advanced breast cancer, inotuzumab ozogamicin for acute lymphoblastic leukaemia and gemtuzumab ozogamicin for acute myeloid leukaemia, with a three-year contract signed by the agency. It said earlier agreements covered the HPV vaccine and atezolizumab for lung cancer, and that 17 medicines were then bought this way.\n\nOn 4 February 2026, as reported by Interfax-Ukraine, the agency said cancer medicines take more than 20% of its yearly budget for medical goods, that it bought 243 cancer medicines and medical devices worth 11.6 billion hryvnias in 2020 to 2025, that it had signed eight managed entry agreements, and that in 2025 it bought pembrolizumab, atezolizumab, brentuximab vedotin, palbociclib, inotuzumab ozogamicin and gemtuzumab ozogamicin. It also said it bought 21 linear accelerators in 2023 and 2024 and, in 2025, equipment for nuclear medicine centres at the National Cancer Institute in Kyiv and in Lviv, due for delivery in 2027.",
    programs: ["Central procurement of cancer medicines", "Managed entry agreements", "HPV vaccine procurement", "Radiotherapy and imaging equipment"],
    drugs: ["palbociclib", "inotuzumab-ozogamicin", "gemtuzumab-ozogamicin", "atezolizumab", "pembrolizumab", "brentuximab-vedotin"], technologies: ["hpv-vaccine"],
    institutions: ["dec-ukraine", "nhsu", "nci-ukraine"],
    links: [
      { label: "Ministry of Health: three new innovative cancer medicines under managed entry agreements (22 October 2025)", url: MOZ_MEA },
      { label: "Interfax-Ukraine: MPU on cancer medicine purchases (4 February 2026)", url: IFX_MPU },
      { label: "Medical Procurement of Ukraine", url: "https://mpu.gov.ua" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-huivaniuk-medevac-ukraine-cancer-2024", name: "Building an Effective International Medical Evacuation Program for Ukrainian Patients With Cancer Amid Prolonged Military Conflict",
    journal: "JCO Global Oncology", year: 2024, doi: "10.1200/go-24-00363", pmid: "39388657", authors: "Huivaniuk I, Kopetskyi V, Ivanykovych T, et al.", paperType: "observational", participants: 339,
    tldr: "A study of the programme that moved Ukrainian cancer patients to hospitals in the European Union for treatment after the full-scale invasion, using the Ministry of Health's records for April 2022 to April 2023.",
    summary: "A retrospective cohort study of the MedEvac programme, which arranged the transfer of Ukrainian patients with cancer to European Union hospitals after Russia's full-scale invasion in February 2022. The authors analysed patient data from the Ministry of Health of Ukraine's database for April 2022 to April 2023 and described the programme's parts.\n\nOf 639 applications, 339 had enough data to analyse, and 281 of those patients were evacuated.",
    findings: [
      "281 of 339 analysable applicants (82.9%) were evacuated to EU hospitals.",
      "Median age of evacuated patients was 47 years; 94.0% were newly diagnosed, and 81.9% were evacuated for systemic cancer therapy.",
      "A good performance status (ECOG 0 to 2) was the strongest factor linked to evacuation (odds ratio 9.64).",
      "Patients with melanoma were more likely to be evacuated (odds ratio 2.56) and patients with head and neck cancer less likely (odds ratio 0.20).",
    ],
    whatItMeans: "Ukraine kept some cancer patients on treatment during the first year of the full-scale war by sending them to EU hospitals, but those who were sicker were much less likely to go.",
    caveats: ["Only 339 of 639 applications had enough data to analyse.", "Retrospective analysis of one ministry database over one year."],
    related: ["paper-kovalyov-hpv-self-sampling-zaporizhzhia-2026"],
    links: [doi("10.1200/go-24-00363", "JCO Glob Oncol 2024"), pubmed("39388657")] }),

  p({ id: "paper-kovalyov-hpv-self-sampling-zaporizhzhia-2026", name: "HPV self-sampling for cervical cancer screening during wartime: a pilot implementation study from a conflict-affected region of Ukraine",
    journal: "BMJ Global Health", year: 2026, doi: "10.1136/bmjgh-2026-023478", pmid: "42049387", authors: "Kovalyov O, Kovalyov K, Deinichenko O, Dillner J, Arroyo Mühr LS", paperType: "observational", participants: 593,
    tldr: "A pilot in Zaporizhzhia region in 2025 that offered women aged 30 to 60 a do-it-yourself HPV test for cervical screening during the war. Almost everyone took part and results came back in about a week.",
    summary: "Women aged 30 to 60 living in Zaporizhzhia Oblast were offered HPV testing on self-collected samples, distributed through outpatient clinics, community outreach and refugee centres, between April and December 2025. Samples were analysed locally by PCR with external quality assurance, and women positive for HPV16 or HPV18 were referred straight to colposcopy. The study is registered as NCT07275333.",
    findings: [
      "593 women were offered self-sampling and 4 (0.67%) declined; 572 samples were returned and analysed.",
      "52 of 572 women (9.1%) tested positive for the targeted HPV types, 22 (3.8%) for HPV16 or HPV18.",
      "Median time from sampling to result was 6.3 days; samples went unreturned only in refugee centres.",
      "All women positive for HPV16 or HPV18 were contacted and referred; those who completed follow-up were assessed within 2 months.",
    ],
    whatItMeans: "HPV self-testing can start and keep running in a region under active war, a simpler route than clinic-based smear tests where services and people have been displaced.",
    caveats: ["A pilot in one region with no comparison group.", "Follow-up is reported for those who completed it, not for every referred woman."],
    cancers: ["cervical"], related: ["paper-huivaniuk-medevac-ukraine-cancer-2024"],
    links: [doi("10.1136/bmjgh-2026-023478", "BMJ Glob Health 2026"), pubmed("42049387"), { label: "ClinicalTrials.gov NCT07275333", url: "https://clinicaltrials.gov/study/NCT07275333" }] }),
];

/** Records behind /countries/ua/ (wave 4). */
export const recordsUA: EntityInput[] = [...institutions, ...papers];
