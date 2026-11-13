import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Serbia: the public bodies and papers behind /countries/rs/ (wave 7) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Serbian Cancer Registry's reports Malignant Tumours in
 * Republic of Serbia for 2022, 2023 and 2024 (PDF text, Institute of Public Health of Serbia "Dr Milan Jovanović
 * Batut"), the Programme for Improving Cancer Control in the Republic of Serbia 2020 to 2022 (Official Gazette 105/2020,
 * PDF text from the ICCP portal), the Law on Health Insurance and the Law on Medicines and Medical Devices (consolidated
 * text on paragraf.rs), the Batut institute's HPV immunisation page and its 2026 immunisation instructions (PDF text),
 * the Cancer Screening Office's site, the Agency for Medicines and Medical Devices of Serbia's pages, and the Institute
 * for Oncology and Radiology of Serbia's own pages. The Republic Health Insurance Fund's site refused plain requests and
 * was read through the Internet Archive. DOIs were resolved through Europe PMC and the figures in `findings` are taken
 * from the indexed abstracts.
 *
 * Inbound links: the Ministry links the Batut institute, the insurer, the regulator and both cancer institutes; the
 * Batut institute links both papers through keyPapers. The Oncology Institute of Vojvodina already exists
 * (institutions/europe.ts) and is reused, not duplicated. Coordinates are approximate Belgrade city or street points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MT_2024 = "https://www.batut.org.rs/download/publikacije/MaligniTumoriuRepubliciSrbiji2024.pdf";
const PKR_2020 = "https://www.iccp-portal.org/system/files/plans/SRB_B5_s21_PROGRAM%20UNAPREDJENJA%20KONTROLE%20RAKA%20U%20REPUBLICI%20SRBIJI%202020%202022%20%281%29.pdf";
const ZZO = "https://www.paragraf.rs/propisi/zakon_o_zdravstvenom_osiguranju.html";
const ZLMS = "https://www.paragraf.rs/propisi/zakon_o_lekovima_i_medicinskim_sredstvima.html";
const BATUT_HPV = "https://www.batut.org.rs/index.php?content=2383";
const SMU_2026 = "https://www.batut.org.rs/download/SMU%20za%20sprovodjenje%20imunizacije%202026.pdf";
const SKRINING = "https://www.skriningsrbija.rs/";
const SKRINING_PAPER = "https://serbjph.batut.org.rs/resources/Glavne-karakteristike-sprovodjenja-programa-organizovanog-skrininga.pdf";
const RFZO_WB = "https://web.archive.org/web/20260717211617/https://rfzo.rs/";
const ALIMS_ABOUT = "https://www.alims.gov.rs/o-agenciji/";
const ALIMS_WHO_2019 = "https://www.alims.gov.rs/2019/07/30/%d1%81%d0%b2%d0%b5%d1%82%d1%81%d0%ba%d0%b0-%d0%b7%d0%b4%d1%80%d0%b0%d0%b2%d1%81%d1%82%d0%b2%d0%b5%d0%bd%d0%b0-%d0%be%d1%80%d0%b3%d0%b0%d0%bd%d0%b8%d0%b7%d0%b0%d1%86%d0%b8%d1%98%d0%b0-%d1%81%d0%b2/";
const WAIT_2025 = "https://www.efpia.eu/media/mnfdwzax/efpia-patients-wait-indicator-2025.pdf";
const IORS_INFO = "https://www.ncrc.ac.rs/informacije-o-iors-u/";
const IORS_RT = "https://www.ncrc.ac.rs/klinika-za-radijacionu-onkologiju/";
const IORS_MED = "https://www.ncrc.ac.rs/klinika-za-medikalnu-onkologiju/";
const IORS_PED = "https://www.ncrc.ac.rs/sluzba-za-pedijatrijsku-onkologiju/";

const institutions: InstitutionInput[] = [
  i({ id: "serbia-ministry-of-health", name: "Ministry of Health of the Republic of Serbia", aka: ["Ministarstvo zdravlja Republike Srbije", "Ministry of Health Serbia", "MoH Serbia"],
    city: "Belgrade", country: "RS", lat: 44.806, lng: 20.461, institutionType: "government", website: "https://www.zdravlje.gov.rs",
    tldr: "Serbia's health ministry. It initiated the country's cancer control programme for 2020 to 2022, which followed the national programme Serbia against Cancer of 2010 to 2015, and it oversees the national screening programmes for breast, cervical and colorectal cancer.",
    summary: "The Ministry of Health initiated the Programme for Improving Cancer Control in the Republic of Serbia for 2020 to 2022, published in the Official Gazette (no. 105/2020); the programme says experts from the World Bank and the World Health Organization recognised its importance, and that it followed the national programme Serbia against Cancer, which covered 2010 to 2015. OnCo found no later national cancer programme. The Ministry's website refused a plain request on 11 November 2026. The coordinates are an approximate Belgrade city point.\n\nThe programme records that organised screening for breast, cervical and colorectal cancer began in December 2012, with target groups aligned to European guidelines by government decrees in 2013, and that in 2016 to 2019 the country bought 15 linear accelerators, nine CT scanners and five MRI machines. It names eight radiotherapy centres and seven tertiary institutions that hold most cancer resources, including the Institute for Oncology and Radiology of Serbia and the Oncology Institute of Vojvodina. It also sets out the system's weak points as the Ministry saw them: slow diagnosis, too few pathologists, radiologists and medical oncologists, targeted therapy and immunotherapy given only at tertiary level, national clinical guidelines not updated in the previous five years, and a cancer registry that does not record stage, treatment or survival.\n\nUnder the Law on Health Insurance (Official Gazette 25/2019, amended 2023 and 2025), examinations and treatment of malignant diseases and palliative care are paid in full from compulsory health insurance; the Minister, on the insurance fund's proposal, sets the criteria for putting a medicine on the national medicines list.",
    programs: ["Programme for Improving Cancer Control 2020 to 2022", "National programme Serbia against Cancer 2010 to 2015", "National programmes for early detection of breast, cervical and colorectal cancer (decrees of 2013)", "Radiotherapy equipment programme (15 linear accelerators, 2016 to 2019)"],
    institutions: ["batut-institute-of-public-health-serbia", "rfzo-serbia", "alims-serbia", "institute-for-oncology-and-radiology-of-serbia", "oncology-institute-of-vojvodina", "who", "iarc"],
    cancers: ["lung-cancer", "breast-cancer", "colorectal", "cervical"], related: ["global-oncology-access"],
    links: [
      { label: "Programme for Improving Cancer Control in the Republic of Serbia 2020 to 2022, Official Gazette 105/2020 (Serbian, PDF, ICCP portal)", url: PKR_2020 },
      { label: "Law on Health Insurance, articles 66, 69 and 131 (Serbian, consolidated text, paragraf.rs)", url: ZZO },
    ] }),

  i({ id: "batut-institute-of-public-health-serbia", name: "Institute of Public Health of Serbia \"Dr Milan Jovanović Batut\"", aka: ["Batut", "Institut za javno zdravlje Srbije", "IJZS", "Serbian Cancer Registry", "Registar za rak u Republici Srbiji", "Kancelarija za skrining raka", "Cancer Screening Office Serbia"],
    city: "Belgrade", country: "RS", lat: 44.799, lng: 20.457, institutionType: "government", website: "https://www.batut.org.rs",
    tldr: "Serbia's national public health institute. It keeps the Serbian Cancer Registry, which counted 41,472 new cancers in 2024, runs the Cancer Screening Office that organises the breast, cervical and colorectal screening programmes, and publishes the national immunisation instructions, including free HPV vaccination.",
    summary: "The Institute of Public Health of Serbia \"Dr Milan Jovanović Batut\" in Belgrade leads the cancer registry for the whole Republic, with a network of regional public health institutes keeping it for their own districts under the Law on Health Documentation and Records. Its report on 2024 dates the population cancer register to 1970, describes a reorganisation from 1996 following IARC and ENCR recommendations after a decade in which registered cases were about the same as or fewer than cancer deaths, and records that the register for Central Serbia was admitted to the IACR and ENCR in 1998. The register excludes residents of the territory under the United Nations Interim Administration Mission in Kosovo and does not include in situ tumours. Deaths come from the Statistical Office. The coordinates are an approximate street point.\n\nThe 2024 report counts 41,472 new cancers (21,793 in men, 19,679 in women, including 3,033 non-melanoma skin cancers) and 20,314 cancer deaths (10,967 men, 9,347 women). Lung cancer led in men (4,246 cases, 2,998 deaths) and breast cancer in women (4,544 cases, 1,700 deaths), while lung cancer killed more women (1,844) than breast cancer did. The 2020 to 2022 cancer programme notes that the registry does not record stage, treatment or survival.\n\nThe institute's Cancer Screening Office organises, monitors and evaluates the national screening programmes with the regional institutes: mammography every two years for women aged 50 to 69, a cervical smear every three years for women aged 25 to 64, and an immunochemical faecal occult blood test every two years for men and women aged 50 to 74, each aiming at 75% coverage. Its 2026 immunisation instructions recommend the nine-valent HPV vaccine for children from 9 to 19 years, first of all pupils in the fifth and seventh grades, and its HPV page says the vaccine is given at the state's expense to girls and boys.",
    programs: ["Serbian Cancer Registry (population register since 1970)", "Annual report Malignant Tumours in Republic of Serbia", "Cancer Screening Office: organised breast, cervical and colorectal screening", "Recommended HPV immunisation for girls and boys (Gardasil 9)", "National Health Survey"],
    institutions: ["serbia-ministry-of-health", "iarc", "who"], cancers: ["lung-cancer", "breast-cancer", "colorectal", "cervical", "prostate"], related: ["cancer-registries-surveillance", "hpv-vaccine"],
    keyPapers: ["paper-mihajlovic-serbia-cancer-incidence-1999-2009-bmc-2013", "paper-djordjevic-cervical-screening-serbia-fph-2023"],
    links: [
      { label: "Serbian Cancer Registry: Malignant Tumours in Republic of Serbia 2024 (Batut, 2025, PDF)", url: MT_2024 },
      { label: "Cancer Screening Office (Kancelarija za skrining raka), Batut institute", url: SKRINING },
      { label: "Jovanović and Naumović, main characteristics of the organised screening programmes in Serbia (Serbian Journal of Public Health, 2021, PDF)", url: SKRINING_PAPER },
      { label: "Batut: immunisation against diseases caused by human papillomaviruses (HPV)", url: BATUT_HPV },
      { label: "Batut: instructions for compulsory and recommended immunisation in 2026, section 6.2 (Serbian, PDF)", url: SMU_2026 },
    ] }),

  i({ id: "rfzo-serbia", name: "Republic Health Insurance Fund (RFZO)", aka: ["RFZO", "Republički fond za zdravstveno osiguranje", "Republic Fund for Health Insurance", "Serbian Health Insurance Fund"],
    city: "Belgrade", country: "RS", lat: 44.81, lng: 20.46, institutionType: "government", website: "https://www.rfzo.rs",
    tldr: "Serbia's compulsory health insurer. The law makes it pay in full for the examination and treatment of cancer and for palliative care, and it sets the national medicines list, on which the newest cancer medicines sit on a restricted list C prescribed only in tertiary hospitals.",
    summary: "The Republic Health Insurance Fund administers compulsory health insurance under the Law on Health Insurance (Official Gazette 25/2019, amended 2023 and 2025). Article 131 lists the services paid in full from compulsory insurance, among them examination and treatment of malignant diseases and palliative care. Under article 66 the Fund adopts the medicines list, which must include essential medicines in line with the WHO Model List, with the Government's consent; a medicine not on the list can still be provided when it is medically necessary, under conditions the Fund sets. Article 69 gives the Fund 90 days from a complete application to decide whether a medicine meets the criteria for the list. The Fund's website refused plain requests on 11 November 2026 and was read through the Internet Archive. The coordinates are an approximate Belgrade city point.\n\nThe 2020 to 2022 cancer control programme describes how cancer medicines reach patients: innovative medicines financed by the Fund are given to patients who meet set medical criteria under list C, which is administered only through tertiary institutions, and it named a lack of biological medicines and immunotherapy on the list as a weakness. The EFPIA Patients W.A.I.T. Indicator 2025 survey, compiled by IQVIA and published in 2026, found 8 of the 56 cancer medicines authorised centrally in the EU in 2021 to 2024 on Serbia's public reimbursement list by 5 January 2026 (14%, against an EU average of 51%), and described two forms of limited availability in Serbia: a listed medicine bought in a limited number of packs a year with committees approving each patient, and an unlisted medicine supplied free on a named-patient basis, such as under article 9 of the rulebook that allows hospitals to buy non-reimbursed medicines for patients with no other option on the list.",
    programs: ["Compulsory health insurance", "Medicines list (Lista lekova), including list C for innovative medicines", "Named-patient supply of unlisted medicines", "Voluntary health insurance"],
    institutions: ["serbia-ministry-of-health", "alims-serbia"],
    links: [
      { label: "Republic Health Insurance Fund (read through the Internet Archive, capture of 17 July 2026)", url: RFZO_WB },
      { label: "Law on Health Insurance, articles 66, 69 and 131 (Serbian, consolidated text, paragraf.rs)", url: ZZO },
      { label: "Programme for Improving Cancer Control 2020 to 2022, section on diagnosis and treatment (Serbian, PDF)", url: PKR_2020 },
      { label: "EFPIA Patients W.A.I.T. Indicator 2025 survey, pages 22, 27 and 68 (PDF)", url: WAIT_2025 },
    ] }),

  i({ id: "alims-serbia", name: "Medicines and Medical Devices Agency of Serbia (ALIMS)", aka: ["ALIMS", "Agencija za lekove i medicinska sredstva Srbije", "Agency for Medicines and Medical Devices of Serbia"],
    city: "Belgrade", country: "RS", lat: 44.77, lng: 20.48, institutionType: "government", website: "https://www.alims.gov.rs",
    tldr: "Serbia's medicines regulator, founded in 2004. It authorises medicines and clinical trials, and the law gives it an accelerated route, with a 150-day limit, for medicines already authorised through the EU centralised procedure.",
    summary: "The Medicines and Medical Devices Agency of Serbia was founded on 1 October 2004 under the Law on Medicines and Medical Devices, taking over the assets of the former Institute of Pharmacy of Serbia. It authorises medicines and medical devices, approves clinical trials, controls quality and runs pharmacovigilance. The coordinates are an approximate Belgrade city point.\n\nThe current Law on Medicines and Medical Devices (Official Gazette 30/2010, amended 2012 and 2017) requires the Agency to decide on a complete marketing authorisation application within 210 days, with the clock stopped while it waits for answers. Article 34 provides an accelerated procedure, with a 150-day limit, for a medicine of the highest public health interest, above all a therapeutic innovation, and for a medicine already authorised through the EU centralised procedure; article 35 allows a conditional authorisation for 12 months at a time for serious and life-threatening diseases, rare diseases and centrally authorised medicines. The law treats EU countries and members of the International Council for Harmonisation as having the same or similar authorisation requirements.\n\nIn July 2019 the Agency announced that the World Health Organization had confirmed, after checking 285 indicators in nine areas, that Serbia's national regulatory authority (the Ministry of Health, the Agency and the Batut institute) could be ranked among the 50 best in the world for regulating medicines and vaccines. The announcement does not name a maturity level, and OnCo did not read WHO's own list.",
    programs: ["Marketing authorisation of medicines (210 days; accelerated route 150 days)", "Accelerated route for medicines authorised by the EU centralised procedure", "Conditional authorisation", "Clinical trial approval and public register of approved trials", "Pharmacovigilance"],
    institutions: ["serbia-ministry-of-health", "batut-institute-of-public-health-serbia"],
    links: [
      { label: "ALIMS: about the Agency (Serbian)", url: ALIMS_ABOUT },
      { label: "Law on Medicines and Medical Devices, articles 28 and 33 to 35 (Serbian, consolidated text, paragraf.rs)", url: ZLMS },
      { label: "ALIMS: WHO ranks Serbia among the 50 most developed countries in medicines regulation (30 July 2019, Serbian)", url: ALIMS_WHO_2019 },
      { label: "ALIMS: register of approved clinical trials", url: "https://www.alims.gov.rs/humani-lekovi/klinicka-ispitivanja/pretraga-klinickih-ispitivanja/" },
    ] }),

  i({ id: "institute-for-oncology-and-radiology-of-serbia", name: "Institute for Oncology and Radiology of Serbia (IORS)", aka: ["IORS", "Institut za onkologiju i radiologiju Srbije"],
    city: "Belgrade", country: "RS", lat: 44.799, lng: 20.461, institutionType: "cancer-center", website: "https://www.ncrc.ac.rs",
    tldr: "Serbia's national cancer institute in Belgrade. Its radiotherapy clinic treats up to 4,000 patients a year on eight linear accelerators, and it is where most children in Serbia with brain, bone and other solid tumours receive radiotherapy.",
    summary: "The Institute for Oncology and Radiology of Serbia, at Pasterova 14 in Belgrade, is a tertiary cancer institute with clinics of radiation oncology, oncological surgery and medical oncology, a paediatric oncology service, nuclear medicine, radiological diagnostics, pathology and genetic counselling. A first appointment needs a referral from the patient's health centre, endorsed by a commission for patients from outside Belgrade, and is booked through the national electronic system IZIS. The coordinates are approximate.\n\nIts radiation oncology clinic describes itself as the reference institution in Serbia, treating up to 4,000 patients a year with radiotherapy on eight megavoltage linear accelerators with image guidance and respiratory gating, two CT simulators and two high-dose-rate brachytherapy machines, including MRI-based brachytherapy for gynaecological cancers; it wrote national radiotherapy planning protocols in 2022. The medical oncology clinic, whose department dates from 1958, runs inpatient wards, a chemotherapy day hospital and an intensive care unit where early-phase trials can be run, and its doctors take part in EORTC trials. The paediatric oncology service, founded in 1982, treats about 100 patients up to the age of 19 a year, mostly with tumours of the central nervous system and bones; children treated with chemotherapy in other centres come to the institute for radiotherapy.\n\nThe 2020 to 2022 national cancer programme names the institute among the tertiary institutions under heavy pressure from patient numbers, among the eight radiotherapy centres, and as the main place where children's brain and bone tumours and retinoblastoma are treated.",
    programs: ["Radiation oncology (8 linear accelerators, 2 HDR brachytherapy units)", "Medical oncology day hospital and wards", "Paediatric oncology (solid tumours, about 100 patients a year)", "Genetic counselling", "Oncofertility", "Psychosocial support and rehabilitation"],
    institutions: ["serbia-ministry-of-health", "oncology-institute-of-vojvodina"], cancers: ["breast-cancer", "lung-cancer", "cervical", "childhood-cancers"],
    links: [
      { label: "IORS: information about the institute (Serbian)", url: IORS_INFO },
      { label: "IORS: Clinic for Radiation Oncology (Serbian)", url: IORS_RT },
      { label: "IORS: Clinic for Medical Oncology (Serbian)", url: IORS_MED },
      { label: "IORS: Paediatric Oncology Service (Serbian)", url: IORS_PED },
      { label: "Programme for Improving Cancer Control 2020 to 2022 (Serbian, PDF)", url: PKR_2020 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-mihajlovic-serbia-cancer-incidence-1999-2009-bmc-2013", name: "Cancer incidence and mortality in Serbia, 1999 to 2009, from the two population registries",
    journal: "BMC Cancer", year: 2013, doi: "10.1186/1471-2407-13-18", pmid: "23320890", authors: "Mihajlović J, Pechlivanoglou P, Miladinov-Mikov M, Zivković S, Postma MJ.", paperType: "observational",
    tldr: "Using the cancer registries of Central Serbia and Vojvodina, the first nation-wide population-based estimates for Serbia showed incidence and mortality rising from 1999 to 2009, with lung cancer leading in men and breast cancer in women.",
    summary: "The authors note that no nation-wide, population-based cancer figures for Serbia had been reported before. They collected incidence and mortality from the two population-based registries, Central Serbia and Vojvodina, for 1999 to 2009, modelled time trends and five-year predictions, and compared world-standardised rates with GLOBOCAN 2008 estimates for Europe and the world.",
    findings: [
      "In men in 2009 lung cancer had the highest incidence (70.8 per 100,000, world standard), then colorectal (39.9), prostate (29.1) and bladder cancer (16.2).",
      "In women breast cancer was the commonest (70.8 per 100,000), then cervical (25.5), colorectal (21.1) and lung cancer (19.4).",
      "In 2008 Serbia had the highest breast cancer mortality rate of all European countries (22.7 per 100,000), and incidence and mortality of cervical, lung and colorectal cancer were well above European estimates.",
    ],
    whatItMeans: "The baseline for Serbia's national cancer figures before the registry published its own reports, and the first evidence that several cancers are commoner and deadlier in Serbia than in most of Europe.",
    caveats: ["Covers 1999 to 2009; the registry's own reports now give later figures.", "Comparison is with GLOBOCAN 2008 estimates, not with other countries' registries directly."],
    institutions: ["batut-institute-of-public-health-serbia", "oncology-institute-of-vojvodina"], cancers: ["lung-cancer", "breast-cancer", "colorectal", "cervical", "prostate"],
    links: [doi("10.1186/1471-2407-13-18", "BMC Cancer 2013"), pubmed("23320890")] }),

  p({ id: "paper-djordjevic-cervical-screening-serbia-fph-2023", name: "Who in Serbia has had a cervical screening test: the 2019 National Health Survey",
    journal: "Frontiers in Public Health", year: 2023, doi: "10.3389/fpubh.2023.1275354", pmid: "38249409", authors: "Djordjevic S, Boricic K, Radovanovic S, Simic Vukomanovic I, Mihaljevic O, Jovanovic V.", paperType: "observational", participants: 6747,
    tldr: "In Serbia's 2019 National Health Survey, 67.2% of women had ever had a Pap test and about a quarter (24.3%) never had; younger, unmarried and poorer women were more likely never to have been tested.",
    summary: "Published as \"Demographic and socioeconomic factors associated with cervical cancer screening among women in Serbia\". A cross-sectional analysis of the 2019 National Health Survey, a representative sample of Serbia's population, looking at which demographic and socioeconomic factors go with having had cervical screening; the authors note that Serbia introduced organised cervical screening in 2012.",
    findings: [
      "67.2% of women had had a Pap test at some time in their lives, and 46.1% of those had been screened in the past three years.",
      "24.3% of women had never had a Pap test.",
      "Never having been tested was more likely in the youngest age group (15 to 24), in unmarried women, in women with basic education and in women of lower socioeconomic status.",
    ],
    whatItMeans: "Organised screening has not yet reached a quarter of women in Serbia, and those it misses are more often poorer and less educated, which is where the authors say the programme needs strengthening.",
    caveats: ["Self-reported in a survey; it does not distinguish tests in the organised programme from opportunistic ones.", "Several of the odds ratios in the abstract are below 1 while the text describes higher likelihood, so read the full paper before relying on a specific ratio."],
    institutions: ["batut-institute-of-public-health-serbia"], cancers: ["cervical"],
    links: [doi("10.3389/fpubh.2023.1275354", "Front Public Health 2023"), pubmed("38249409")] }),
];

/** Records behind /countries/rs/ (wave 7). */
export const recordsRS: EntityInput[] = [...institutions, ...papers];
