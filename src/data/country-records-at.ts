import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Austria: the public bodies and papers behind /countries/at/ (wave 6) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: Statistik Austria's cancer statistics page and its press
 * release of 29 January 2026, the health ministry's National Cancer Framework Programme 2026 to 2035 (PDF text) and its
 * Bewertungsboard page, section 351c ASVG on the Erstattungskodex (JUSLINE consolidated text), the BASG's description of
 * itself, the breast screening programme's site, MedAustron's about and insurance pages, the Krebshilfe's history page,
 * and the OECD and European Commission's Country Cancer Profile Austria 2025. DOIs and PubMed ids were resolved through
 * Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the ministry links the registry, the regulator, the umbrella body, the ÖGK, the Krebshilfe and the three
 * papers through keyPapers; the umbrella body links the ÖGK and MedAustron; so none is reachable only from the page.
 * Existing Austrian records (ccc-vienna, st-anna-ccri-vienna, abcsg, aop-health) are reused, not duplicated.
 * Coordinates are approximate city points (Vienna; Wiener Neustadt for MedAustron), not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const SA = "https://www.statistik.at/statistiken/bevoelkerung-und-soziales/gesundheit/krebserkrankungen";
const SA_PM_2026 = "https://www.statistik.at/fileadmin/announcement/2026/01/20260129Krebsstatistik.pdf";
const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-at-2024-1658-en.pdf";
const KRP_2026 = "https://broschuerenservice.sozialministerium.gv.at/Home/Download?publicationId=929&attachmentName=Nationales_Krebsrahmenprogramm_2026_bis_2035.pdf";
const KRP_PAGE = "https://www.sozialministerium.gv.at/Themen/Gesundheit/Nicht-uebertragbare-Krankheiten/Krebs/Nationales-Krebsrahmenprogramm.html";
const BB = "https://www.sozialministerium.gv.at/Themen/Gesundheit/Gesundheitssystem/Bewertungsboard.html";
const ASVG_351C = "https://www.jusline.at/gesetz/asvg/paragraf/351c";
const BASG = "https://www.basg.gv.at/ueber-uns";
const FE = "https://www.frueh-erkennen.at/brustkrebs-frueherkennungsprogramm/";
const OEGK = "https://www.gesundheitskasse.at/cdscontent/?contentid=10007.867331&portal=oegkportal";
const AK_RG = "https://wien.arbeiterkammer.at/beratung/arbeitundrecht/krankheitundpflege/krankheit/Befreiung_von_der_Rezeptgebuehr.html";
const MA = "https://www.medaustron.at/en/about-us/";
const MA_INS = "https://www.medaustron.at/en/insurance/";
const MA_TC = "https://www.medaustron.at/en/therapy-center/";
const KH = "https://www.krebshilfe.net/ueber-uns/geschichte";

const institutions: InstitutionInput[] = [
  i({ id: "statistik-austria-cancer-registry", name: "Austrian National Cancer Registry (Statistik Austria)", aka: ["Österreichisches Nationales Krebsregister", "Österreichisches Krebsregister", "Krebsregister Statistik Austria"],
    city: "Vienna", country: "AT", lat: 48.208, lng: 16.373, institutionType: "government", website: SA,
    tldr: "Austria's population-based cancer registry, kept by the national statistics office. Every hospital must report each cancer it diagnoses or treats; it counted 48,360 new cancers and 21,345 cancer deaths in 2024.",
    summary: "The Österreichisches Nationales Krebsregister is kept by Statistik Austria and records cancers diagnosed or treated in hospitals, which must report every case and every cancer death under the Cancer Statistics Act 1969 and the Cancer Statistics Regulation 2019. Statistik Austria publishes incidence, mortality, prevalence and survival every year before World Cancer Day; the press release of 29 January 2026, with data of 12 January 2026, counted 48,360 new malignant cancers in 2024 (C00 to C97 without C44, including cases known only from a death certificate), 21,345 cancer deaths, five-year relative survival of 63.7% for cancers diagnosed in 2016 to 2020, and about 409,000 people living after a cancer diagnosis at the start of 2025.\n\nIn 2019 and 2020 names, addresses and social insurance numbers in the registry were replaced with a sector-specific pseudonym for official statistics, which lets reports about one person be joined and linked with population statistics from the central residence register; people not living in Austria are now excluded, which lowered total prevalence since 2002 by more than 20,000. The OECD and European Commission's 2025 profile notes that the registry has national coverage and holds stage, treatment, survival and mortality, but no screening, genetic or patient-reported data.",
    programs: ["National cancer incidence, mortality, prevalence and survival statistics", "Pseudonymised linkage with population and cause-of-death statistics", "Cancer forecast to 2045 for the health ministry"],
    institutions: ["bmasgpk-austria"], cancers: ["breast-cancer", "prostate", "lung-cancer", "colorectal"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Statistik Austria: Krebserkrankungen", url: SA },
      { label: "Statistik Austria: press release 14 099-018/26, 29 January 2026 (PDF)", url: SA_PM_2026 },
      { label: "OECD/EC, Country Cancer Profile Austria 2025, section 5.2 (PDF)", url: CCP_2025 },
    ] }),

  i({ id: "bmasgpk-austria", name: "Federal Ministry of Labour, Social Affairs, Health, Care and Consumer Protection, Austria", aka: ["BMASGPK", "Sozialministerium", "Bundesministerium für Arbeit, Soziales, Gesundheit, Pflege und Konsumentenschutz", "Austrian Ministry of Health"],
    city: "Vienna", country: "AT", lat: 48.208, lng: 16.373, institutionType: "government", website: "https://www.sozialministerium.gv.at",
    tldr: "Austria's health ministry. It publishes the National Cancer Framework Programme 2026 to 2035, hosts the oncology advisory board and the national board that assesses costly hospital medicines, and oversees the medicines authority.",
    summary: "The ministry published Austria's first National Cancer Framework Programme in 2014 and a second for 2026 to 2035, an expert paper written under its oncology advisory board (a commission under the Federal Ministries Act) that sets goals, measures and indicators from prevention to palliative care but deliberately names no responsibilities or milestones. The programme credits the first round with the National Screening Committee for Cancer founded in 2021, a model rulebook for tumour boards in 2015, a national information point on cancer trials in 2017 and digital-only reporting to the national cancer registry from 2019.\n\nThe ministry hosts the Bewertungsboard set up under section 62d of the federal Hospitals Act after the 2023 health reform, which first met on 11 September 2024 and recommends whether and how selected high-priced medicines should be used in hospitals; its cancer decisions include a conditional recommendation for tisotumab vedotin in cervical cancer (24 June 2026) and no recommendation for obe-cel in adults with relapsed B-cell leukaemia (19 November 2025). Statistik Austria produced the cancer forecast to 2045 on the ministry's behalf, and the medicines authority BASG is an authority under the ministry.",
    programs: ["National Cancer Framework Programme 2026 to 2035", "Oncology advisory board (Onkologiebeirat)", "Bewertungsboard for selected high-priced hospital medicines", "National Screening Committee for Cancer (2021)", "Model rulebook for tumour boards"],
    institutions: ["statistik-austria-cancer-registry", "basg-austria", "dachverband-sozialversicherung", "oegk-austria", "oesterreichische-krebshilfe"],
    drugs: ["tisotumab-vedotin", "obecabtagene-autoleucel", "lifileucel"], cancers: ["cervical", "breast-cancer", "colorectal"],
    keyPapers: ["paper-oberaigner-tyrol-mammography-advanced-breast-cancer-2017", "paper-geiger-gritsch-tyrol-mammography-ultrasound-2018", "paper-waser-hpv-vaccination-parents-tyrol-2022"],
    links: [
      { label: "BMASGPK: Nationales Krebsrahmenprogramm", url: KRP_PAGE },
      { label: "Nationales Krebsrahmenprogramm 2026 bis 2035 (PDF)", url: KRP_2026 },
      { label: "BMASGPK: Bewertungsboard für ausgewählte Arzneimittel", url: BB },
    ] }),

  i({ id: "dachverband-sozialversicherung", name: "Federation of Austrian Social Insurance Institutions (Dachverband der Sozialversicherungsträger)", aka: ["Dachverband der Sozialversicherungsträger", "Dachverband", "Hauptverband der österreichischen Sozialversicherungsträger"],
    city: "Vienna", country: "AT", lat: 48.208, lng: 16.373, institutionType: "government", website: "https://www.sozialversicherung.at",
    tldr: "The umbrella body of Austria's social insurance funds. It runs the Erstattungskodex, the list of medicines that social insurance pays for outside hospital, and agrees with MedAustron the indications for which ion therapy is covered.",
    summary: "Under section 351c of the General Social Insurance Act, a marketing authorisation holder applies to the Dachverband for a medicine to be listed in the yellow or green area of the Erstattungskodex. A complete application, with the authorisation number, a price, confirmation of supply and the patent expiry date, places the medicine temporarily in the red area; if the Dachverband decides within 90 days, or 180 days where a price is also decided, that it should not be listed, it is removed. Applicants must submit pharmacological, medical-therapeutic and health-economic evidence on the medicine's therapeutic benefit, and for the red and yellow areas a pricing commission sets an EU average price from member states' prices. The Dachverband may also start a listing procedure itself.\n\nThe OECD and European Commission's 2025 profile records that the 2020 reform merged 21 social health insurance funds into five. MedAustron states that patients insured in Austria are generally covered for ion therapy when the indication is on the list agreed with the Federation of Austrian Social Insurance Institutions.",
    programs: ["Erstattungskodex (outpatient reimbursement list: red, yellow and green areas)", "Coordination of the five social insurance funds"],
    institutions: ["oegk-austria", "medaustron", "bmasgpk-austria"],
    links: [
      { label: "§ 351c ASVG, Erstattungskodex (JUSLINE consolidated text)", url: ASVG_351C },
      { label: "MedAustron: insurance", url: MA_INS },
      { label: "OECD/EC, Country Cancer Profile Austria 2025, section 5.1 (PDF)", url: CCP_2025 },
    ] }),

  i({ id: "oegk-austria", name: "Austrian Health Insurance Fund (Österreichische Gesundheitskasse)", aka: ["Österreichische Gesundheitskasse", "ÖGK", "OeGK"],
    city: "Vienna", country: "AT", lat: 48.208, lng: 16.373, institutionType: "government", website: "https://www.gesundheitskasse.at",
    tldr: "Austria's largest social health insurance fund, formed in 2020 from the nine regional funds; it insures 7.6 million people, about 82% of those living in Austria. Insured people apply to it for exemption from the prescription charge, and social insurance is a partner in the national breast screening programme.",
    summary: "The OECD and European Commission's 2025 profile records that the 2020 mergers cut Austria's social health insurance funds from 21 to five and that the largest now covers more than 80% of the insured population, although benefits still differ because contract negotiations with the state medical chambers were not changed. The ÖGK's own page says it is the largest of them, formed on 1 January 2020 by merging the nine former regional health insurance funds (Gebietskrankenkassen), and that it insures 7.6 million people, about 82% of those living in Austria.\n\nThe breast screening programme früh erkennen is a joint initiative of the federal government, social insurance, the states and the Medical Chamber; for women aged 45 to 74 the e-card is activated automatically for a screening mammogram every two years. The Vienna Chamber of Labour's page for 2026 says insured people with incomes below 1,308.39 euros (2,064.12 euros for a couple living together) can apply to the ÖGK for exemption from the prescription charge of 7.55 euros, and that charges stop once they reach 2% of yearly net income.",
    programs: ["Social health insurance for most of the population", "Breast screening programme früh erkennen (with the federal government, states and Medical Chamber)", "Prescription charge exemptions"],
    institutions: ["dachverband-sozialversicherung"], cancers: ["breast-cancer"],
    links: [
      { label: "ÖGK: Über die ÖGK", url: OEGK },
      { label: "OECD/EC, Country Cancer Profile Austria 2025, section 5.1 (PDF)", url: CCP_2025 },
      { label: "früh erkennen: über das Programm", url: FE },
      { label: "Arbeiterkammer Wien: Befreiung von der Rezeptgebühr", url: AK_RG },
    ] }),

  i({ id: "basg-austria", name: "Federal Office for Safety in Health Care (BASG) and AGES Medicines Market Surveillance", aka: ["BASG", "Bundesamt für Sicherheit im Gesundheitswesen", "AGES Medizinmarktaufsicht", "AGES MEA", "AGES PharmMed"],
    city: "Vienna", country: "AT", lat: 48.208, lng: 16.373, institutionType: "government", website: "https://www.basg.gv.at",
    tldr: "Austria's medicines and medical devices authority. It authorises national medicines and clinical trials, monitors side effects and inspects manufacturers, with staff provided by the AGES medicines market surveillance division.",
    summary: "The Bundesamt für Sicherheit im Gesundheitswesen began work on 2 January 2006, after the tasks were moved out of the health ministry, together with the medicines market surveillance division of the Austrian Agency for Health and Food Safety (AGES MEA, called AGES PharmMed until 1 January 2012), as the national authority for medicines, medical devices, blood and tissues. Its own description says it is responsible for which medicines are newly authorised in Austria, for authorising clinical trials of medicines and medical devices, for pharmacovigilance and device vigilance and for inspections, and that it monitors medicines on the market nationally and with its European sister agencies.\n\nThe BASG is an authority under the health ministry with three members appointed by the minister, one from the ministry and two from AGES MEA; AGES provides its services, staff and buildings, and AGES MEA staff act in the BASG's name. Its legal basis is the Health and Food Safety Act. Cancer medicines authorised through the EU centralised procedure on the European Medicines Agency's opinion are valid in Austria without a national authorisation.",
    programs: ["National marketing authorisation", "Clinical trial authorisation (medicines and medical devices)", "Pharmacovigilance and device vigilance", "GMP and GCP inspections"],
    institutions: ["ema", "bmasgpk-austria"],
    links: [
      { label: "BASG: Über uns", url: BASG },
      { label: "EMA: authorisation of medicines", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
    ] }),

  i({ id: "medaustron", name: "MedAustron", aka: ["MedAustron Ion Therapy Centre", "MedAustron Wiener Neustadt"],
    city: "Wiener Neustadt", country: "AT", lat: 47.81, lng: 16.24, institutionType: "cancer-center", website: "https://www.medaustron.at/en/",
    tldr: "A cancer treatment and research centre in Wiener Neustadt that treats tumours with protons and carbon ions from a particle accelerator developed with CERN. Austrian social insurance pays for indications on an agreed list.",
    summary: "MedAustron describes itself as a cancer treatment and research centre in Wiener Neustadt, Lower Austria, about 50 kilometres south of Vienna, organised as a limited company indirectly owned by the State of Lower Austria and working as an independent outpatient clinic with more than 250 staff. It is the teaching and research site of Karl Landsteiner University of Health Sciences for radiation oncology and medical physics. Its accelerator, developed in cooperation with CERN, delivers proton or carbon-ion beams to three treatment rooms; MedAustron says it is unique in Austria and that comparable facilities exist at five other centres worldwide.\n\nIts insurance page says patients insured in Austria are generally covered when the indication is on the list agreed with the Federation of Austrian Social Insurance Institutions; for other indications it applies for individual approval, which requires a tumour board to have judged ion therapy the most suitable treatment. Privately paying patients pay the full cost in advance, and patients insured in other EU countries can apply to their own insurer. Austria's large equipment plan (ÖSG 2023) lists MedAustron as the one radiotherapy facility outside hospitals.",
    programs: ["Proton therapy", "Carbon-ion therapy", "Clinical and translational research", "Teaching site of Karl Landsteiner University for radiation oncology and medical physics"],
    technologies: ["proton-therapy", "carbon-ion"], institutions: ["dachverband-sozialversicherung"], cancers: ["childhood-cancers"],
    links: [
      { label: "MedAustron: about us", url: MA },
      { label: "MedAustron: therapy center", url: MA_TC },
      { label: "MedAustron: insurance", url: MA_INS },
    ] }),

  i({ id: "oesterreichische-krebshilfe", name: "Austrian Cancer Aid (Österreichische Krebshilfe)", aka: ["Österreichische Krebshilfe", "Krebshilfe", "Austrian Cancer Aid"],
    city: "Vienna", country: "AT", lat: 48.208, lng: 16.373, institutionType: "consortium", website: "https://www.krebshilfe.net",
    tldr: "Austria's national cancer charity, founded in Vienna in 1910. It runs 63 counselling centres, gives emergency financial help to patients in need because of cancer, and publishes the Austrian cancer report with the haematology and oncology society.",
    summary: "The Krebshilfe's history page traces it to a letter of 1909 from the surgeon Julius Hochenegg to Anton von Eiselsberg about the hardship of cancer patients, and to the founding meeting of the Society for the Research and Control of Cancer on 17 December 1910, with Eiselsberg as president; the society was registered with the Vienna police on 20 December 1910, which the Krebshilfe counts as its founding. In its early years it gave small sums to patients in need or paid for radium treatment, and it decided in 1912 to set up a chemical research laboratory.\n\nThe page says the Krebshilfe now provides immediate financial help across Austria to patients in need because of cancer and has 63 counselling centres, and that its campaigns have included HPV vaccination, breast screening and the Don't smoke petition. With the Austrian Society for Haematology and Medical Oncology (OeGHO) it publishes the Österreichischer Krebsreport, which the OECD's 2025 country profile and the National Cancer Framework Programme 2026 to 2035 cite.",
    programs: ["63 cancer counselling centres", "Emergency financial help for patients", "Österreichischer Krebsreport (with OeGHO)", "Awareness campaigns on early detection, HPV vaccination and smoking"],
    institutions: ["bmasgpk-austria"],
    links: [
      { label: "Österreichische Krebshilfe: Geschichte", url: KH },
      { label: "Nationales Krebsrahmenprogramm 2026 bis 2035, references (PDF)", url: KRP_2026 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-oberaigner-tyrol-mammography-advanced-breast-cancer-2017", name: "Fewer advanced breast cancers after organised mammography screening began in Tyrol, Austria",
    journal: "Breast", year: 2017, doi: "10.1016/j.breast.2017.04.002", pmid: "28419909", authors: "Oberaigner W, Geiger-Gritsch S, Edlinger M, et al.", paperType: "observational", participants: 1475,
    tldr: "In Tyrol, women who took part in the mammography screening programme were less likely to be diagnosed with large or advanced breast cancer than women who did not.",
    summary: "Published as \"Reduction in advanced breast cancer after introduction of a mammography screening program in Tyrol/Austria\". The authors linked all invasive breast cancers diagnosed in 2009 to 2013 in women aged 40 to 69 living in Tyrol, about 145,000 women, with the Tyrolean screening programme's database, and compared tumour characteristics in women exposed and not exposed to screening.",
    findings: [
      "1,475 invasive breast cancers were registered in women aged 40 to 69 in Tyrol in 2009 to 2013.",
      "Age-adjusted relative risk for a tumour of 21 mm or more was 0.72 (95% CI 0.60 to 0.86) in women exposed to screening compared with those not exposed.",
      "Relative risk was 0.27 (95% CI 0.17 to 0.46) for metastatic breast cancer and 0.83 (95% CI 0.71 to 0.96) for advanced breast cancer.",
    ],
    whatItMeans: "Taking part in Tyrol's organised screening was linked with a 28% lower risk of a breast cancer of 21 mm or more and a 17% lower risk of advanced breast cancer, which the authors expect to translate into fewer breast cancer deaths.",
    caveats: ["Observational: women who take part in screening may differ from those who do not.", "One Austrian state, before the national programme began in 2014; mortality was not measured."],
    cancers: ["breast-cancer"],
    links: [doi("10.1016/j.breast.2017.04.002", "Breast 2017"), pubmed("28419909")] }),

  p({ id: "paper-geiger-gritsch-tyrol-mammography-ultrasound-2018", name: "Four years of organised mammography screening combined with ultrasound in Tyrol, Austria",
    journal: "Wiener klinische Wochenschrift", year: 2018, doi: "10.1007/s00508-017-1293-9", pmid: "29209825", authors: "Geiger-Gritsch S, Daniaux M, Buchberger W, Knapp R, Oberaigner W", paperType: "observational", participants: 176957,
    tldr: "Tyrol's screening programme, which added ultrasound to mammography for most women, had 57% participation, detected 3.7 cancers per 1,000 screens and recalled 13 women per 1,000 for further tests.",
    summary: "Published as \"Performance of 4 years of population-based mammography screening for breast cancer combined with ultrasound in Tyrol / Austria\". The authors evaluated women aged 40 to 69 screened from June 2008 to May 2012 in Tyrol's organised programme, which uses ultrasound as a second-line test, against the performance indicators of the EU guidelines, and estimated harms.",
    findings: [
      "272,555 invitations led to 176,957 screening examinations; the estimated two-year participation rate was 56.9%.",
      "76.2% of screened women also had ultrasound; 2,322 women were recalled (13.1 per 1,000 screens) and 1,351 biopsies done (7.6 per 1,000).",
      "The cancer detection rate was 3.7 per 1,000 screens, with 35.5% of screen-detected cancers at stage II or higher.",
      "The estimated cumulative risk of a false positive result was 21.1% and of an unnecessary biopsy 9.4% for women following the invitations.",
    ],
    whatItMeans: "An Austrian regional programme, the forerunner of the national one, that adds ultrasound to mammography; the authors judge its performance favourable and its harms low compared with other European programmes.",
    caveats: ["The authors run the programme they evaluate.", "Regional, 2008 to 2012, before the national programme's age range and methods applied."],
    cancers: ["breast-cancer"],
    links: [doi("10.1007/s00508-017-1293-9", "Wien Klin Wochenschr 2018"), pubmed("29209825")] }),

  p({ id: "paper-waser-hpv-vaccination-parents-tyrol-2022", name: "Why parents in Tyrol, Austria, accept or reject HPV vaccination for their children",
    journal: "Human Vaccines & Immunotherapeutics", year: 2022, doi: "10.1080/21645515.2022.2126251", pmid: "36251011", authors: "Waser M, Heiss R, Borena W", paperType: "observational", participants: 334,
    tldr: "In a survey of 334 parents in Tyrol, 81.9% accepted HPV vaccination for their children; fear of side effects, too little information and feeling the child was too young were the commonest reasons for hesitancy.",
    summary: "Published as \"Factors affecting children's HPV vaccination in Austria: Evidence from a parent survey\". In Austria HPV vaccination is free for children, yet coverage remains below the level needed for herd immunity. The authors surveyed 334 parents in Tyrol on their knowledge of HPV, attitudes to vaccination, information sources and intentions, and modelled what predicted acceptance.",
    findings: [
      "Overall acceptance of HPV vaccination was 81.9%.",
      "The commonest reasons for hesitancy were fear of side effects, a perceived lack of information and the view that children are too young.",
      "Higher knowledge of HPV was linked with acceptance for daughters but not sons; parents who informed themselves online were less likely to accept.",
    ],
    whatItMeans: "Free vaccination alone has not brought Austrian coverage to herd immunity; the authors call for education that addresses fears of side effects and misinformation and stresses the benefit for both sexes.",
    caveats: ["One state, a cross-sectional survey of 334 parents.", "Stated intention, not recorded vaccination."],
    cancers: ["cervical"],
    links: [doi("10.1080/21645515.2022.2126251", "Hum Vaccin Immunother 2022"), pubmed("36251011")] }),
];

/** Records behind /countries/at/ (wave 6). */
export const recordsAT: EntityInput[] = [...institutions, ...papers];
