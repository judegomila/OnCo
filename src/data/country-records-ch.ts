import type { CompanyInput, EntityInput, InstitutionInput, PaperInput, TrialInput } from "@/lib/schema";

/**
 * Switzerland: the institutions, companies, trials and papers behind /countries/ch/ that the corpus did not hold.
 * People are in src/data/people/country-ch.ts. Every record carries its sources; DOIs and PubMed ids were resolved
 * through PubMed (E-utilities) on 2026-11-03 and the figures quoted come from the indexed abstract, not a summary.
 * Swiss sources were read in German: the Federal Statistical Office (BFS), the National Agency for Cancer Registration
 * (NKRS), the federal statutes on fedlex.admin.ch, Swissmedic, the Swiss Cancer Institute (formerly SAKK), the Swiss
 * Cancer League and Swiss Cancer Research.
 *
 * Existing Swiss records are linked, not duplicated: Swissmedic (institutions/bodies.ts), the five university hospitals
 * and IOSI (institutions/europe.ts, institutions-wave-investigators.ts), ETOP IBCSG and IELSG
 * (companies-cooperative-groups-migrated.ts), Roche and Novartis.
 */
const asOf = "2026-11-03";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const inst = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const institutions: InstitutionInput[] = [
  inst({ id: "nkrs-nicer", name: "National Agency for Cancer Registration (NKRS) / NICER", aka: ["NKRS", "Nationale Krebsregistrierungsstelle", "Organe national d'enregistrement du cancer", "ONEC", "NACR", "National Agency for Cancer Registration", "NICER", "Nationales Institut für Krebsepidemiologie und -registrierung", "National Institute for Cancer Epidemiology and Registration"],
    city: "Zurich", country: "CH", lat: 47.374, lng: 8.548, institutionType: "research-institute", website: "https://www.nkrs.ch",
    tldr: "The national office that pools the data of Switzerland's 13 cantonal cancer registries. Since 2020 every Swiss cancer must by law be reported, with its stage and first treatment, and this office turns that into national figures, including how well breast and prostate cancer are being treated.",
    summary: "Adult cancer registration in Switzerland is cantonal: 13 cantonal registries record each new case in the population of the canton where the patient lives, and the Childhood Cancer Registry in Bern records those under 20. The NKRS does not register cases itself; it collects, checks, harmonises and analyses what the cantonal registries send, and passes the national dataset to the Federal Statistical Office, which publishes the annual cancer monitoring.\n\nThe office is run by the Foundation National Institute for Cancer Epidemiology and Registration (NICER), founded in Zurich in 2007 out of the Association of Swiss Cancer Registries of 1978, and mandated by the Federal Department of Home Affairs since 2018 under Article 33 of the Cancer Registration Act (KRG) and Article 36 of its ordinance. The Act, passed by Parliament in March 2016 and in force since 1 January 2020, introduced a duty to report, the AHV insurance number as the person identifier and a standard national dataset. Reports are due within four weeks; patients are informed and may object at any time, and data are registered no earlier than three months after the report so that a patient has time to decide.\n\nBecause the Act asks for diagnosis and first-treatment data, the NKRS now publishes care-quality indicators from the whole country: 38 indicators on more than 20,000 breast cancers and precursors from 2020 to 2022, and 32 on more than 35,000 prostate cancers from 2020 to 2023. In the prostate report, published in September 2026 with Swiss Urology, 76 per cent of cancers were found by opportunistic early-detection testing, the treatment decision was made at a tumour board in 56 per cent of cases (85 per cent in breast cancer), and 20 per cent of men were on active surveillance; the report names avoidable overdiagnosis and overtreatment and recommends evaluating an organised early-detection programme.",
    programs: ["National cancer dataset from the 13 cantonal registries", "Care-quality indicators (breast 2020-2022, prostate 2020-2023)", "Annual data-quality reports", "Data for research on request"],
    cancers: ["prostate", "breast-hr-positive", "colorectal"], sections: ["prevention", "early-detection"], bottlenecks: ["b-data-silos", "b-overdiagnosis"],
    institutions: ["federal-statistical-office-ch", "childhood-cancer-registry-ch", "foph-bag"],
    people: ["katharina-staehelin"],
    keyPapers: ["paper-menges-prostate-cancer-switzerland-jama-netw-open-2026", "paper-fournier-early-onset-colorectal-switzerland-ejc-2026"],
    links: [
      { label: "NKRS (German)", url: "https://www.nkrs.ch/de/" },
      { label: "NKRS: history of cancer registration in Switzerland", url: "https://www.nkrs.ch/de/die-krebsregistrierung-kurz-erklaert/geschichte-des-nkrs" },
      { label: "NKRS: the right to object", url: "https://www.nkrs.ch/de/betroffene/ihr-recht-auf-widerspruch" },
      { label: "NKRS: Diagnose und Therapie von Prostatakrebs in der Schweiz 2020-2023 (short report, PDF)", url: "https://www.nkrs.ch/upload/downloads/Berichte%20und%20Statistiken/KennzahlenZuDiagnoseUndTherapie/Kurzbericht_zu_Prostatakrebskennzahlen_2020_2023.pdf" },
      { label: "Krebsregistrierungsgesetz (KRG), SR 818.33", url: "https://www.fedlex.admin.ch/eli/cc/2018/289/de" },
    ] }),

  inst({ id: "childhood-cancer-registry-ch", name: "Swiss Childhood Cancer Registry (Kinderkrebsregister)", aka: ["KiKR", "Kinderkrebsregister", "Schweizer Kinderkrebsregister", "SKKR", "Registre du cancer de l'enfant", "Childhood Cancer Registry"],
    city: "Bern", country: "CH", lat: 46.952, lng: 7.434, institutionType: "research-institute", website: "https://www.kinderkrebsregister.ch",
    tldr: "The national register of cancer in children and young people in Switzerland, kept since 1976 and now based at the University of Bern. It is the reason Swiss childhood cancer figures go back further and more completely than the adult ones.",
    summary: "The Swiss Childhood Cancer Registry was founded by the Swiss Paediatric Oncology Group (SPOG) and has recorded cancers in children and adolescents across the whole of Switzerland since 1976. The Cancer Registration Act, in force since 1 January 2020, made a national childhood registry a federal task; in summer 2018 the Confederation awarded it to a consortium of SPOG and the University of Bern, and from 2020 the registry became the federal Kinderkrebsregister, recording cancers up to and including age 20, at the Institute of Social and Preventive Medicine of the University of Bern. Reports for patients under 20 at diagnosis go to it rather than to a cantonal registry.\n\nThe Federal Statistical Office's overview page, updated on 16 November 2026, reports an average of about 247 new childhood cancers a year in 2019-2023, with deaths falling over time while registrations tend to rise, which the office attributes to a mix of better registration, changed diagnostic practice, chance variation in small numbers and a real increase.",
    programs: ["National childhood cancer registration since 1976", "Federal childhood registry under the KRG since 2020"],
    institutions: ["nkrs-nicer", "inselspital-bern"],
    links: [
      { label: "NKRS: history of cancer registration, including the childhood registry", url: "https://www.nkrs.ch/de/die-krebsregistrierung-kurz-erklaert/geschichte-des-nkrs" },
      { label: "Kinderkrebsregister", url: "https://www.kinderkrebsregister.ch" },
      { label: "BFS: Nationale Krebsstatistik, cancer in children", url: "https://www.bfs.admin.ch/bfs/de/home/statistiken/gesundheit/gesundheitszustand/krankheiten/krebs.html" },
    ] }),

  inst({ id: "federal-statistical-office-ch", name: "Swiss Federal Statistical Office (BFS/OFS)", aka: ["BFS", "OFS", "UST", "FSO", "Bundesamt für Statistik", "Office fédéral de la statistique", "Nationale Krebsstatistik", "NKS"],
    city: "Neuchâtel", country: "CH", lat: 46.996, lng: 6.938, institutionType: "government", website: "https://www.bfs.admin.ch",
    tldr: "The federal statistics office, which publishes Switzerland's official cancer numbers every year from the registry data, and a full cancer report every five years.",
    summary: "The Federal Statistical Office runs the National Cancer Statistics (Nationale Krebsstatistik): incidence estimated from the cantonal registries' data pooled by the NKRS, and mortality from its own cause-of-death statistics. Its key figures for 2022, updated on 10 November 2025, are 28,141 new cancers in men and 22,693 in women, excluding non-melanoma skin cancer, and 9,310 and 7,910 cancer deaths; cancer accounted for 25.5 per cent of deaths in men and 20.8 per cent in women. Rates are standardised to the 1976 European population, and the office publishes world-standardised rates too in its open data on the Swiss Stats Explorer.\n\nBecause registration was not national until the 2020 Act, the national figures are estimates: observed cases are weighted up by the share of the population covered by a registry, which the office's methods note gives as 55.3 per cent in 1993-1997, 91.6 per cent in 2013-2017 and 98.3 per cent in 2018-2022. The French- and Italian-speaking cantons have been fully covered since 2006 and all German-speaking cantons since 2020. The office also publishes the Swiss Cancer Report every five years; the latest, of 2021, gives relative five-year survival for 2013-2017 of 63.8 per cent in men and 67.1 per cent in women.",
    programs: ["National Cancer Statistics (annual monitoring)", "Swiss Cancer Report (five-yearly)", "Cause-of-death statistics", "Open data on stats.swiss"],
    institutions: ["nkrs-nicer"], sections: ["prevention"],
    links: [
      { label: "BFS: Nationale Krebsstatistik (German)", url: "https://www.bfs.admin.ch/bfs/de/home/statistiken/gesundheit/gesundheitszustand/krankheiten/krebs.html" },
      { label: "BFS: Kennzahlen zu Krebs, 2020-2022 (XLSX)", url: "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36582275/master" },
      { label: "BFS: Methoden der nationalen Krebsstatistik (PDF, 2026)", url: "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36531516/master" },
      { label: "Schweizerischer Krebsbericht 2021 (PDF)", url: "https://dam-api.bfs.admin.ch/hub/api/dam/assets/19305696/master" },
    ] }),

  inst({ id: "foph-bag", name: "Federal Office of Public Health (BAG/OFSP)", aka: ["BAG", "OFSP", "UFSP", "FOPH", "Bundesamt für Gesundheit", "Office fédéral de la santé publique", "Spezialitätenliste", "SL"],
    city: "Bern", country: "CH", lat: 46.934, lng: 7.418, institutionType: "government", website: "https://www.bag.admin.ch",
    tldr: "The federal health office that decides which medicines Swiss basic insurance pays for, and at what price, by listing them on the Spezialitätenliste. A cancer drug can be approved by Swissmedic and still not be paid for until it is listed.",
    summary: "Under the Health Insurance Act (KVG) every service the compulsory basic insurance pays for must be effective, appropriate and economical, the WZW criteria of Article 32. For medicines the BAG applies them by listing a product on the Spezialitätenliste (SL), advised by the Federal Drugs Commission (Eidgenössische Arzneimittelkommission, KVV Article 37e). A product needs a valid Swissmedic authorisation (KVV Article 65), and its economic price is set half from a therapeutic cross-comparison with drugs for the same disease and half from the average price in nine reference countries: Belgium, Denmark, Germany, Finland, France, the United Kingdom, the Netherlands, Austria and Sweden (KVV Article 65b, KLV Article 34abis). The ordinances do not use a cost-per-QALY threshold.\n\nA company may file with the BAG once Swissmedic has confirmed the indication and dose in its preliminary decision, and where it does, KLV Article 31b says the BAG decides as a rule within 60 days of final authorisation. The industry association Interpharma calculated that in 2025 this happened for 4 per cent of newly authorised medicines and that the median time from authorisation to SL listing was 219 days; that is an industry calculation from SL and Swissmedic data, not a BAG figure, and OnCo could not find the BAG's own measure.\n\nBefore a drug is listed, or for a use outside its label, insurers can pay case by case under KVV Articles 71a to 71d, after consulting their medical adviser, where a large therapeutic benefit is expected against a disease that can be fatal or cause severe chronic harm and there is no effective authorised alternative. The insurer must decide within two weeks of a complete request and must give reasons for a refusal to doctor and patient; the price is negotiated with the company at a discount of up to 50 per cent on the reference price, depending on the benefit category.",
    programs: ["Spezialitätenliste (list of reimbursed medicines)", "WZW review (effective, appropriate, economical)", "Federal Drugs Commission (EAK)", "Single-case reimbursement rules (KVV Articles 71a-71d)", "Cancer Registration Act supervision"],
    institutions: ["swissmedic", "nkrs-nicer"], bottlenecks: ["b-drug-pricing", "b-regulatory-fragmentation"], sections: ["targeted-therapy"],
    links: [
      { label: "Spezialitätenliste (BAG)", url: "https://sl.bag.admin.ch/sl" },
      { label: "KVG (SR 832.10), Articles 32 and 64", url: "https://www.fedlex.admin.ch/eli/cc/1995/1328_1328_1328/de" },
      { label: "KVV (SR 832.102), Articles 65, 65b, 69 and 71a-71d", url: "https://www.fedlex.admin.ch/eli/cc/1995/3867_3867_3867/de" },
      { label: "KLV (SR 832.112.31), Articles 31b and 34abis", url: "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/de" },
      { label: "Interpharma, Innovationsreport 2025 (PDF, industry association)", url: "https://www.interpharma.ch/wp-content/uploads/2026/03/IPH-Innovationsreport-2025-DE.pdf" },
    ] }),

  inst({ id: "swiss-cancer-league", name: "Swiss Cancer League (Krebsliga Schweiz)", aka: ["Krebsliga Schweiz", "Ligue suisse contre le cancer", "Lega svizzera contro il cancro", "Krebsliga", "KrebsInfo"],
    city: "Bern", country: "CH", lat: 46.946, lng: 7.434, institutionType: "consortium", website: "https://www.krebsliga.ch",
    tldr: "The national cancer charity: an umbrella for 18 cantonal and regional leagues that give advice and practical help to people with cancer and their families, with a free national helpline, and a funder of independent research.",
    summary: "The Swiss Cancer League describes itself as having worked for people with cancer and those around them for more than 110 years. As an umbrella organisation it works with 18 cantonal and regional leagues that provide advice, support and information locally, and runs KrebsInfo, a free service for patients, relatives and professionals reachable on weekdays from 10:00 to 18:00 by telephone on 0800 11 88 11, by e-mail, chat or WhatsApp. Its chief executive is Mirjam Lämmle. With the Swiss Cancer Research foundation it funds industry-independent research; the SAKK 16/00 lung cancer trial, for example, names the Swiss Cancer League among its funders.",
    programs: ["KrebsInfo helpline 0800 11 88 11", "18 cantonal and regional leagues", "Research funding with Swiss Cancer Research", "Prevention"],
    institutions: ["swiss-cancer-research-foundation"], sections: ["supportive-care", "prevention"], bottlenecks: ["b-patient-voice"],
    links: [
      { label: "Krebsliga Schweiz: about us (German)", url: "https://www.krebsliga.ch/ueber-uns" },
      { label: "Krebsliga Schweiz", url: "https://www.krebsliga.ch" },
    ] }),

  inst({ id: "swiss-cancer-research-foundation", name: "Swiss Cancer Research foundation (Krebsforschung Schweiz)", aka: ["Krebsforschung Schweiz", "KFS", "Recherche suisse contre le cancer", "Ricerca svizzera contro il cancro", "Swiss Cancer Research"],
    city: "Bern", country: "CH", lat: 46.946, lng: 7.434, institutionType: "consortium", website: "https://www.krebsforschung.ch",
    tldr: "A Bern charity that, since 1991, has given donated money to independent cancer research at Swiss universities and hospitals, decided by its board on the advice of a scientific committee; in 2026 it approved about CHF 12.2 million of new projects.",
    summary: "The Swiss Cancer Research foundation is a non-profit foundation based in Bern that has funded all areas of cancer research with donations since 1991, with particular weight on research close to patients. It funds only industry-independent projects at Swiss universities and hospitals; its board allocates the money on the recommendations of a Scientific Committee (Wissenschaftliche Kommission) that reviews every application against defined criteria. Its news page of 18 June 2026 reported new projects approved worth about CHF 12.2 million.",
    programs: ["Independent research grants", "Scientific Committee peer review", "Patient-centred research"],
    institutions: ["swiss-cancer-league"], bottlenecks: ["b-funding-allocation"],
    links: [
      { label: "Krebsforschung Schweiz: about us (German)", url: "https://www.krebsforschung.ch/ueber-uns" },
      { label: "Krebsforschung Schweiz", url: "https://www.krebsforschung.ch" },
    ] }),
];

const companies: CompanyInput[] = [
  { kind: "company", asOf, id: "swiss-cancer-institute", name: "Swiss Cancer Institute (formerly SAKK)", companyType: "cooperative-group", hq: "Bern", country: "CH", website: "https://www.swisscancerinstitute.ch",
    aka: ["SAKK", "Swiss Group for Clinical Cancer Research", "Schweizerische Arbeitsgemeinschaft für Klinische Krebsforschung", "Groupe Suisse de Recherche Clinique sur le Cancer", "Swiss Cancer Institute"],
    tags: ["cooperative-group"],
    tldr: "Switzerland's national academic cancer trials group, known until July 2025 as SAKK. Its member hospitals, every university hospital and the country's leading hospitals, reach about 80 per cent of the country's cancer patients.",
    summary: "The Swiss Cancer Institute is the non-profit organisation that runs independent, multicentre clinical cancer trials in Switzerland across all cancer types and specialties. It describes more than 60 years of work, and on 1 July 2025 it changed its name from SAKK (Swiss Group for Clinical Cancer Research) to Swiss Cancer Institute, with the same management and with existing contracts unchanged. Its members are all the Swiss university hospitals and leading hospitals, a network it says reaches about 80 per cent of cancer patients in the country, and it coordinates practically all the trials of international academic groups that run in Switzerland.\n\nIt is recognised by the State Secretariat for Education, Research and Innovation (SERI) as a research institution of national importance and is funded under a performance agreement based on Article 15a of the Research and Innovation Promotion Act. The board is chaired by Viviane Hess, a medical oncologist at University Hospital Basel; the chief executive is Vincent Gruntz. Trials registered under its name include SAKK 16/00, which showed that adding radiotherapy to induction chemotherapy before surgery did not improve event-free survival in stage IIIA/N2 non-small-cell lung cancer, and the SAKK 75/08 oesophageal cancer trial.",
    notes: ["Renamed from SAKK on 1 July 2025", "SERI performance agreement (FIFG Article 15a)", "SAKK 16/00 (NCT00030771), stage IIIA/N2 NSCLC", "Patient council"],
    trials: ["sakk-16-00", "nct06358573"], people: ["viviane-hess"], institutions: ["usb-basel", "inselspital-bern", "usz-zurich", "chuv-lausanne", "hug-geneva", "iosi-bellinzona"],
    companies: ["etop-ibcsg", "ielsg"], cancers: ["nsclc", "esophageal"], keyPapers: ["paper-pless-sakk-16-00-induction-chemoradiation-lancet-2015"],
    links: [
      { label: "Swiss Cancer Institute: about (German)", url: "https://www.swisscancerinstitute.ch/de/ueber-uns/ueber-swiss-cancer-institute/" },
      { label: "Press release: from SAKK to Swiss Cancer Institute (1 July 2025, PDF)", url: "https://www.swisscancerinstitute.ch/media/1rrpazo0/mm_sakk_swisscancerinstitute_de.pdf" },
      { label: "Q&A on the renaming (PDF)", url: "https://www.swisscancerinstitute.ch/media/cbcdnfxj/qa_renaming_mediencorner_en.pdf" },
    ] },
];

const trials: TrialInput[] = [
  { kind: "trial", asOf, id: "sakk-16-00", name: "SAKK 16/00", nct: "NCT00030771", phase: "3", status: "negative",
    aka: ["SAKK 16/00 induction chemoradiation trial", "Preoperative chemoradiotherapy vs chemotherapy alone in stage IIIA/N2 NSCLC"],
    setting: "Resectable stage IIIA/N2 non-small-cell lung cancer: three cycles of cisplatin and docetaxel before surgery, with or without 44 Gy of radiotherapy in 22 fractions",
    sponsor: "Swiss Cancer Institute (formerly SAKK)", started: "2001-04-04", startedType: "actual", yearReported: 2015, enrolled: 232,
    tldr: "A Swiss trial asked whether lung cancer that has reached the lymph nodes in the middle of the chest does better with radiotherapy added to chemotherapy before the operation. It did not, which spared patients a treatment that adds side effects without adding benefit.",
    summary: "SAKK 16/00 enrolled 232 patients with pathologically proven stage IIIA/N2 non-small-cell lung cancer at 23 centres in Switzerland, Germany and Serbia between 2001 and 2012. Everyone received three cycles of cisplatin 100 mg/m2 and docetaxel 85 mg/m2; 117 were randomised to radiotherapy of 44 Gy in 22 fractions over three weeks before surgery and 115 to surgery after chemotherapy alone. Median event-free survival, the primary endpoint, was 12.8 months with radiotherapy and 11.6 months without (p=0.67); median overall survival was 37.1 and 26.2 months, with wide confidence intervals. Grade 3 dysphagia from radiotherapy occurred in 7 per cent. The authors concluded that one definitive local treatment combined with induction chemotherapy is adequate. It was funded by the Swiss State Secretariat for Education, Research and Innovation, the Swiss Cancer League and Sanofi.",
    result: "Adding radiotherapy to induction chemotherapy before surgery did not improve event-free survival: median 12.8 against 11.6 months (p=0.67).",
    outcomes: [
      { endpoint: "Event-free survival", primary: true, unit: "months", arms: [{ name: "Chemotherapy then radiotherapy then surgery", n: 117, value: 12.8, note: "95 per cent CI 9.7 to 22.9" }, { name: "Chemotherapy then surgery", n: 115, value: 11.6, note: "95 per cent CI 8.4 to 15.2" }], p: "0.67", source: "https://doi.org/10.1016/S0140-6736(15)60294-X" },
      { endpoint: "Overall survival", unit: "months", arms: [{ name: "Chemotherapy then radiotherapy then surgery", value: 37.1, note: "95 per cent CI 22.6 to 50.0" }, { name: "Chemotherapy then surgery", value: 26.2, note: "95 per cent CI 19.9 to 52.1" }], source: "https://doi.org/10.1016/S0140-6736(15)60294-X" },
    ],
    cancers: ["nsclc"], sections: ["radiation", "chemotherapy"], companies: ["swiss-cancer-institute"], institutions: ["swiss-cancer-league"],
    keyPapers: ["paper-pless-sakk-16-00-induction-chemoradiation-lancet-2015"], bottlenecks: ["b-surgery-radiation-innovation"],
    links: [{ label: "ClinicalTrials.gov NCT00030771", url: "https://clinicaltrials.gov/study/NCT00030771" }, doi("10.1016/S0140-6736(15)60294-X", "Lancet 2015"), pubmed("26275735")] },
];

const papers: PaperInput[] = [
  { kind: "paper", asOf, id: "paper-pless-sakk-16-00-induction-chemoradiation-lancet-2015", name: "Induction chemoradiation in stage IIIA/N2 non-small-cell lung cancer: a phase 3 randomised trial (SAKK 16/00)",
    journal: "The Lancet", year: 2015, doi: "10.1016/S0140-6736(15)60294-X", pmid: "26275735", authors: "Pless M, Stupp R, Ris HB, Stahel RA, Weder W, et al.", paperType: "rct", participants: 232,
    tldr: "The Swiss trial group's randomised test of adding radiotherapy before lung cancer surgery: it added side effects and no benefit, so chemotherapy and one local treatment are enough.",
    summary: "The report of SAKK 16/00, led from Kantonsspital Winterthur with investigators at CHUV Lausanne, University Hospital Zurich and other centres. Patients with resectable stage IIIA/N2 non-small-cell lung cancer received three cycles of cisplatin and docetaxel and were randomised to 44 Gy of radiotherapy before surgery or to surgery directly. Event-free survival did not differ, and 91 per cent of patients completed the three chemotherapy cycles.",
    findings: [
      "232 patients were randomised at 23 centres in Switzerland, Germany and Serbia from 2001 to 2012: 117 to chemoradiotherapy and 115 to chemotherapy alone before surgery.",
      "Median event-free survival was 12.8 months (95 per cent CI 9.7 to 22.9) with radiotherapy and 11.6 months (8.4 to 15.2) without, p=0.67.",
      "Median overall survival was 37.1 months (22.6 to 50.0) with radiotherapy and 26.2 months (19.9 to 52.1) without.",
      "Grade 3 dysphagia from radiotherapy occurred in seven patients (7 per cent); three patients in the control group died within 30 days of surgery.",
    ],
    whatItMeans: "For resectable stage IIIA/N2 disease, induction chemotherapy followed by a single definitive local treatment, surgery or radiotherapy, is adequate; stacking radiotherapy before surgery adds toxicity without improving event-free survival.",
    caveats: ["The trial predates immunotherapy before and after surgery, which has since changed treatment of resectable stage III disease.", "Overall survival was a secondary endpoint and its confidence intervals overlap widely."],
    changedPractice: true,
    cancers: ["nsclc"], sections: ["radiation", "chemotherapy"], trials: ["sakk-16-00"], companies: ["swiss-cancer-institute"], institutions: ["chuv-lausanne", "usz-zurich", "swiss-cancer-league"], people: ["roger-stupp", "rolf-stahel"],
    links: [doi("10.1016/S0140-6736(15)60294-X", "Lancet 2015"), pubmed("26275735")] },

  { kind: "paper", asOf, id: "paper-menges-prostate-cancer-switzerland-jama-netw-open-2026", name: "Prostate cancer incidence, mortality, and survival in Switzerland",
    journal: "JAMA Network Open", year: 2026, doi: "10.1001/jamanetworkopen.2026.8289", pmid: "42012828", authors: "Menges D, Wildisen L, Scherer T, et al.; Staehelin K", paperType: "observational", participants: 142665,
    tldr: "Forty years of Swiss registry data on prostate cancer: more early, low-risk cancers found by testing, a rise in advanced cancers after 2011, and ten-year survival nearly doubled.",
    summary: "A population-based cohort study of every registered primary prostate cancer in Switzerland from 1980 to 2021, using data from the National Agency for Cancer Registration and the Federal Statistical Office, with the NKRS director as senior author. It estimated age-standardised incidence and mortality and relative survival up to ten years, by age, stage and Gleason score.",
    findings: [
      "142,665 primary prostate cancers were registered between 1980 and 2021; 70.2 per cent were in men aged 60 to 79.",
      "Incidence rose to 226.6 per 100,000 men by 2004, fell to 173.5 in 2011-2014, and rose again to 220.6 in 2021, mainly in localised, lower-grade cancers.",
      "Incidence of distant and stage IV cancer increased after 2011, while Gleason 8 to 10 cancers stayed stable.",
      "Mortality fell continuously from the early 1990s to 34.8 per 100,000 men in 2021; ten-year relative survival rose from 46.2 per cent in 1982-1991 to 88.5 per cent in 2012-2021, and 99.2 per cent for localised cancer.",
    ],
    whatItMeans: "The authors read the pattern as more overdiagnosis of lower-risk cancer alongside a rise in advanced diagnoses, and see room to organise early detection better, the same conclusion the NKRS care-quality report reached.",
    caveats: ["Registry coverage of Switzerland was incomplete before 2020, so early national figures are estimates weighted up from the covered cantons."],
    cancers: ["prostate"], sections: ["early-detection"], institutions: ["nkrs-nicer", "federal-statistical-office-ch"], people: ["katharina-staehelin"], bottlenecks: ["b-overdiagnosis"],
    links: [doi("10.1001/jamanetworkopen.2026.8289", "JAMA Network Open 2026"), pubmed("42012828")] },

  { kind: "paper", asOf, id: "paper-fournier-early-onset-colorectal-switzerland-ejc-2026", name: "Rising early-onset colorectal cancer in Switzerland despite declining incidence in older adults: a nationwide population-based study, 1980-2021",
    journal: "European Journal of Cancer", year: 2026, doi: "10.1016/j.ejca.2026.116707", pmid: "41946179", authors: "Fournier E, Schaffar R, Staehelin K, Rouxel N, Ris F, et al.", paperType: "observational", participants: 96410,
    tldr: "Bowel cancer is becoming less common in older Swiss adults and slowly more common in adults under 50, where more of it is in the rectum and more is found at stage IV.",
    summary: "A nationwide study, led from the Geneva Cancer Registry on the national dataset of the NKRS, of every adult diagnosed with a first colorectal adenocarcinoma in Switzerland from 1980 to 2021. Rates were standardised to the 1976 European population, trends estimated by joinpoint regression and five-year net survival by the Pohar-Perme method.",
    findings: [
      "Of 96,410 patients, 5,928 (6.1 per cent) were under 50.",
      "Early-onset incidence rose steadily: annual per cent change +0.46 in men and +0.49 in women, driven by rectal cancers and, in young women, proximal colon cancers; incidence in older adults declined after the mid-2000s.",
      "From 2010 to 2021, 27.7 per cent of early-onset cancers were UICC stage IV, against 22.1 per cent at ages 50-74 and 19.4 per cent at 75 and over.",
      "Five-year net survival in under-50s peaked at 76.9 per cent for men (2010) and 78.2 per cent for women (2007).",
    ],
    whatItMeans: "Swiss screening starts at 50; the authors call for prevention, awareness and screening strategies adapted to younger adults.",
    caveats: ["Stage data were harmonised only from 2010."],
    cancers: ["colorectal"], sections: ["early-detection"], institutions: ["nkrs-nicer", "hug-geneva"], people: ["katharina-staehelin"],
    links: [doi("10.1016/j.ejca.2026.116707", "European Journal of Cancer 2026"), pubmed("41946179")] },
];

export const recordsCH: EntityInput[] = [...institutions, ...companies, ...trials, ...papers];
