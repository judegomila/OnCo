import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Hungary: the public bodies and papers behind /countries/hu/ (wave 6) that the corpus did not hold. Each was written
 * from its own primary source, read raw in Hungarian on 11 November 2026: the National Institute of Oncology's page
 * for the National Cancer Registry and the registry's public query tool (stat.nrr.hu, dataset closed 20 October 2026),
 * the National Health Insurance Fund's pages on individual equity support for medicines and its notice of
 * 1 September 2026, the National Centre for Public Health and Pharmacy's "about us" page and its notices of
 * 3 November 2026 on the renaming to National Institute of Public Health and the split of its pharmaceutical tasks
 * into a new National Institute of Pharmacy, its screening pages, and an Internet Archive copy (14 August 2025) of the
 * Hungarian League Against Cancer's home page, because rakliga.hu answered scripts with a browser check. DOIs were
 * resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the insurer links the regulator, the public health institute, the national cancer institute and the
 * registry; the registry links the institute, the insurer and its papers through keyPapers; the public health
 * institute links the insurer, the regulator and the League. The National Institute of Oncology (noi-budapest) and the
 * Korányi Institute already exist in institutions/europe.ts and are reused. Coordinates are approximate points for the
 * published street addresses (or, for the new pharmacy institute, whose address was not found, central Budapest).
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NRR = "https://onkol.hu/nemzeti-rakregiszter-es-biostatisztikai-kozpont/";
const NRR_STAT = "https://stat.nrr.hu/";
const NEAK_EGYEDI = "https://www.neak.gov.hu/felso_menu/lakossagnak/ellatas_magyarorszagon/gyogyszer_segedeszkoz_gyogyfuro_tamogatas/egyedi_tamogatas";
const NEAK_AFA = "https://www.neak.gov.hu/szakmai_kozlemenyek/tajekoztato-a-2026.-szeptember-1-tol-hatalyos-afa-csokkentes-alkalmazasarol-az-egyedi-meltanyossagi-engedely-alapjan-tamogatott-kizarolag--orvosi-rendelvenyhez-kotott-gyogyszerek-tb.-tamogatasanak-osszegerol-es-teritesi-dijarol";
const NNGYK_ROLUNK = "https://nngyk.gov.hu/hu/rolunk.html";
const ONI_NAME = "https://nngyk.gov.hu/hu/tovabbi-hirek/az-nngyk-uj-elnevezese-orszagos-nepegeszsegugyi-intezetre-oni.html";
const NNGYK_SZURES = "https://nngyk.gov.hu/hu/szuresek.html";
const CCP_HU = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-hu-2024-1670-en.pdf";
const LIGA_WB = "https://web.archive.org/web/20250814151909/https://rakliga.hu/";

const institutions: InstitutionInput[] = [
  i({ id: "neak-hungary", name: "National Health Insurance Fund of Hungary (Nemzeti Egészségbiztosítási Alapkezelő)", aka: ["Nemzeti Egészségbiztosítási Alapkezelő", "NEAK", "NHIF", "National Health Insurance Fund Administration"],
    city: "Budapest", country: "HU", lat: 47.531, lng: 19.067, institutionType: "government", website: "https://www.neak.gov.hu",
    tldr: "Hungary's single public health insurer. It pays for cancer care from screening to palliative care, buys some high-cost cancer medicines centrally, and can approve a medicine it does not normally pay for, case by case, through individual equity support.",
    summary: "The Nemzeti Egészségbiztosítási Alapkezelő manages Hungary's compulsory social health insurance, which the OECD and European Commission's 2025 Country Cancer Profile describes as giving access to all elements of cancer care, from screening to palliative care. In the profile's account, inpatient procedures, surgery, chemotherapy and radiotherapy are paid by diagnosis-related groups, outpatient imaging and laboratory tests by fee for service, and certain high-value treatments by itemised reimbursement from an earmarked budget, with procurement managed by the Fund. For cancer, statutory financing protocols set out the care a provider must follow, and the Fund can withdraw payment when care departs from them; new protocols for 40 diseases, several in oncology, were published with the inclusion of new cancer medicines in public financing from 1 January 2024.\n\nFor a medicine that is not reimbursed, the Fund's own page on individual support (egyedi támogatás) says it may grant equity support when the patient cannot be treated effectively with any reimbursed medicine, including for products without a Hungarian marketing authorisation that can be prescribed under a regulator's permit and for off-label use. The page, last updated in July 2024, says the Fund decides within 60 days, or out of turn for life-threatening cases and children, grants support for at most one year at first, and its decisions cannot be appealed, though they can be challenged in an administrative court within 30 days. Telex reported in June 2026 that the Batthyány-Strattmann László Foundation had decided these requests since February 2025 and that a government bill would hand its tasks back to the insurer. The Fund's notice of 1 September 2026 recalculated the support for medicines held under equity permits after VAT on prescription-only medicines fell to 0%.",
    programs: ["Compulsory social health insurance", "Financing protocols for cancer care", "Itemised reimbursement of high-cost medicines (tételes elszámolás)", "Individual equity support for non-reimbursed medicines (egyedi méltányosság)", "Public funding of breast, cervical and colorectal screening"],
    institutions: ["ogyi-hungary", "oni-hungary", "noi-budapest", "hungarian-national-cancer-registry"], cancers: ["lung-cancer", "colorectal", "breast-cancer"],
    keyPapers: ["paper-kiss-hulc-postmortem-lung-cancer-hungary-front-oncol-2022", "paper-hofmarcher-cee-cancer-medicine-access-esmo-open-2023"],
    links: [
      { label: "NEAK: egyedi támogatás (individual support for medicines)", url: NEAK_EGYEDI },
      { label: "NEAK: notice on VAT and equity-supported medicines, 1 September 2026", url: NEAK_AFA },
      { label: "Telex: the insurer to take over the foundation's tasks, 24 June 2026 (Internet Archive copy, Hungarian)", url: "https://web.archive.org/web/20260625025954/https://telex.hu/belfold/2026/06/24/batthyany-strattmann-alapitvany-gyogyszertamogatas-oep-hegedus-zsolt" },
      { label: "OECD/EC: Country Cancer Profile Hungary 2025, sections 5.1 and 5.3 (PDF)", url: CCP_HU },
    ] }),

  i({ id: "ogyi-hungary", name: "National Institute of Pharmacy of Hungary (Országos Gyógyszerészeti Intézet)", aka: ["Országos Gyógyszerészeti Intézet", "OGYI", "OGYÉI", "Országos Gyógyszerészeti és Élelmezés-egészségügyi Intézet", "National Institute of Pharmacy and Nutrition"],
    city: "Budapest", country: "HU", lat: 47.498, lng: 19.04, institutionType: "government", website: "https://ogyei.gov.hu",
    tldr: "Hungary's medicines authority. The work was done by OGYÉI until 2023, then by the National Centre for Public Health and Pharmacy, and from 1 November 2026 by a new National Institute of Pharmacy. New cancer medicines are authorised for the whole EU through the European Medicines Agency.",
    summary: "The National Centre for Public Health and Pharmacy (NNGYK) states that it was formed on 1 August 2023 when the National Institute of Pharmacy and Nutrition (Országos Gyógyszerészeti és Élelmezés-egészségügyi Intézet, OGYÉI) merged into the National Public Health Centre, and that as an authority it was responsible for medicines supervision and the pharmaceutical market. Its notice of 3 November 2026 says that under Government Decree 324/2026 (X. 29.) the pharmaceutical tasks were split off on 1 November 2026 into the Országos Gyógyszerészeti Intézet (OGYI), a separate central office that is the legal successor for those tasks.\n\nNew active substances for cancer go through the EU centralised procedure, so they are authorised in Hungary at the same time as elsewhere in the EU. The OECD and European Commission's 2025 profile notes that since August 2023 the pharmacy authority has also carried out the mandatory health technology assessment of new medicines. The authority's medicines database and adverse reaction reporting site at ogyei.gov.hu were suspended from 22 to 26 October 2026 after a national cyber security alert, according to NNGYK.",
    programs: ["Medicines supervision and authorisation", "Health technology assessment of new medicines", "Clinical trial authorisation", "Pharmacovigilance and adverse reaction reporting", "Permits for medicines without a Hungarian marketing authorisation"],
    institutions: ["ema", "neak-hungary"],
    links: [
      { label: "NNGYK: rólunk (about us, with the November 2026 notice)", url: NNGYK_ROLUNK },
      { label: "NNGYK: new name and the split of pharmaceutical tasks, 3 November 2026", url: ONI_NAME },
      { label: "NNGYK: pharmacy websites temporarily unavailable, 22 October 2026", url: "https://nngyk.gov.hu/hu/tovabbi-hirek/tajekoztatas-gyogyszereszeti-honlapjaink-atmeneti-elerhetetlensegerol.html" },
      { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 5.1 (PDF)", url: CCP_HU },
    ] }),

  i({ id: "oni-hungary", name: "National Institute of Public Health of Hungary (Országos Népegészségügyi Intézet)", aka: ["Országos Népegészségügyi Intézet", "ONI", "NNGYK", "Nemzeti Népegészségügyi és Gyógyszerészeti Központ", "National Centre for Public Health and Pharmacy"],
    city: "Budapest", country: "HU", lat: 47.474, lng: 19.095, institutionType: "government", website: "https://nngyk.gov.hu",
    tldr: "Hungary's public health institute, called the National Centre for Public Health and Pharmacy until 1 November 2026. It organises the national breast, cervical and colorectal screening programmes, sends the cervical screening invitations and runs the mobile screening buses.",
    summary: "The Nemzeti Népegészségügyi és Gyógyszerészeti Központ (NNGYK) states that from 1 November 2026, under Government Decree 323/2026 (X. 29.), its name changed to Országos Népegészségügyi Intézet (ONI), and that its pharmaceutical tasks passed on the same day to a new National Institute of Pharmacy. It is led by the national chief medical officer and works under the health minister, with national responsibility for public health, epidemics, health promotion, occupational health and the planning and organisation of population screening.\n\nIts screening directorate coordinates the targeted public health screening programmes: mammography every two years for women aged 45 to 65, cervical screening every three years for women aged 25 to 65, which it says has been organised since 2003, and colorectal screening for women and men aged 50 to 70. It prepares and sends the cervical screening invitations centrally and runs the mobile programme \"Helybe visszük a szűrővizsgálatokat\" (bring the screening to people), whose buses the OECD's 2025 profile says had visited 300 disadvantaged communities by November 2023.",
    programs: ["Breast screening (mammography, women 45 to 65, every two years)", "Cervical screening (women 25 to 65, every three years)", "Colorectal screening (FIT then colonoscopy, ages 50 to 70)", "Mobile screening programme (Helybe visszük a szűrővizsgálatokat)", "Oral cavity screening", "National vaccine procurement"],
    institutions: ["neak-hungary", "ogyi-hungary"], related: ["hungarian-league-against-cancer", "screening-hun-colorectal"], cancers: ["breast-cancer", "cervical", "colorectal"],
    people: ["beatrix-oroszi"],
    links: [
      { label: "NNGYK: new name, Országos Népegészségügyi Intézet, 3 November 2026", url: ONI_NAME },
      { label: "NNGYK: Szűrésirányítási Főosztály (screening directorate)", url: NNGYK_SZURES },
      { label: "NNGYK: emlőszűrés (breast screening)", url: "https://nngyk.gov.hu/hu/nepegeszsegugyi-celu-szuresi-koordinacios-osztaly/emloszures.html" },
      { label: "NNGYK: méhnyakszűrés (cervical screening)", url: "https://nngyk.gov.hu/hu/nepegeszsegugyi-celu-szuresi-koordinacios-osztaly/mehnyakszures.html" },
      { label: "NNGYK: vastagbélszűrés (colorectal screening)", url: "https://nngyk.gov.hu/hu/nepegeszsegugyi-celu-szuresi-koordinacios-osztaly/vastagbelszures.html" },
    ] }),

  i({ id: "hungarian-national-cancer-registry", name: "Hungarian National Cancer Registry (Nemzeti Rákregiszter)", aka: ["Nemzeti Rákregiszter", "NRR", "HNCR", "Nemzeti Rákregiszter és Biostatisztikai Központ"],
    city: "Budapest", country: "HU", lat: 47.501, lng: 19.015, institutionType: "research-institute", website: NRR,
    tldr: "Hungary's population-based cancer registry, required by law since 1999 and run by the National Institute of Oncology since 2000. Hospitals report every cancer they treat, and anyone can query its counts by year, site, sex and county online.",
    summary: "The registry's page at the National Institute of Oncology says that its operation has been required by law since 1999 and is the Institute's task, that it began work in 2000 with the help of a World Bank programme, and that this turned hospital-based registration into population-based registration. Hospitals report the cancer cases they treat; the registry checks data quality and returns errors for correction, has published an annual report since 2001, and works with IARC and the European Cancer Inequalities Registry. Its public query tool at stat.nrr.hu gives registered cases by ICD-10 code, year from 2000, sex and county, and warns that registry data are corrected continuously, so the latest year will change and the three to five years before it probably will.\n\nThe OECD and European Commission's 2025 profile adds that hospitals report electronically every quarter, that the National Health Insurance Fund adds financing data linked by social security number, and that identifiable death records from the Central Statistical Office confirm cancer deaths. A 2023 evaluation by the registry's own staff with IARC found that it codes in ICD-10 rather than ICD-O, that 57.8% of cases were morphologically verified, and that its 2018 incidence was 11.6% (men) and 14.6% (women) above IARC's estimates, mostly because of cases coded to ill-defined or unspecified sites.",
    programs: ["Population-based cancer registration (from 2000)", "Annual report (from 2001)", "Public online query tool (stat.nrr.hu)", "Data for the European Cancer Inequalities Registry"],
    institutions: ["noi-budapest", "neak-hungary", "iarc"], cancers: ["lung-cancer", "colorectal", "breast-cancer"], related: ["cancer-registries-surveillance"],
    people: ["istvan-kenessey"],
    keyPapers: ["paper-weber-hungarian-cancer-registry-data-quality-canep-2023", "paper-kenessey-lung-cancer-hungary-2018-sci-rep-2024", "paper-kerpel-fronius-hunchest-ii-eur-radiol-2024", "paper-garami-childhood-cancer-registry-hungary-orv-hetil-2024"],
    links: [
      { label: "Országos Onkológiai Intézet: Nemzeti Rákregiszter és Biostatisztikai Központ", url: NRR },
      { label: "Nemzeti Rákregiszter: online query (stat.nrr.hu)", url: NRR_STAT },
      doi("10.1016/j.canep.2022.102306", "Wéber et al., evaluation of data quality at the Hungarian National Cancer Registry, 2000 to 2019 (Cancer Epidemiol 2023)"),
      { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 5.2 (PDF)", url: CCP_HU },
    ] }),

  i({ id: "hungarian-league-against-cancer", name: "Hungarian League Against Cancer (Magyar Rákellenes Liga)", aka: ["Magyar Rákellenes Liga", "Rákliga", "Hungarian Cancer League"],
    city: "Budapest", country: "HU", lat: 47.498, lng: 19.04, institutionType: "consortium", website: "https://rakliga.hu",
    tldr: "A Hungarian patient and prevention charity with local branches across the country. It offers emotional support, patient information, patient rights advice, rehabilitation and support groups, and runs awareness weeks on screening.",
    summary: "The League's home page, as captured by the Internet Archive in August 2025, says it supports health maintenance, cancer risk reduction, early detection and recovery; offers emotional support, patient information, patient rights advice and rehabilitation; builds community through regular club meetings for patients and families run by local branches (alapszervezetek); and takes part in school health education and screening awareness. It lists seven yearly events: World Cancer Day, the National Day Against Cancer, Movember, Pink October, Cervical Cancer Prevention Week, a patient rights conference and World Lymphoma Day. It names Balázs Rozványi as president.",
    programs: ["Emotional support and patient information", "Patient rights advice and an annual patient rights conference", "Local branches with support groups", "Screening awareness: Pink October, Movember, Cervical Cancer Prevention Week"],
    sections: ["supportive-care", "prevention"], bottlenecks: ["b-patient-voice"],
    links: [
      { label: "Magyar Rákellenes Liga home page (Internet Archive copy, 14 August 2025)", url: LIGA_WB },
      { label: "UICC: Hungarian League Against Cancer, member page", url: "https://www.uicc.org/membership/hungarian-league-against-cancer" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-weber-hungarian-cancer-registry-data-quality-canep-2023", name: "Evaluation of data quality at the Hungarian National Cancer Registry, 2000 to 2019",
    journal: "Cancer Epidemiology", year: 2023, doi: "10.1016/j.canep.2022.102306", pmid: "36521336", authors: "Wéber A, Mery L, Nagy P, Polgár C, Bray F, Kenessey I.", paperType: "methods",
    tldr: "An evaluation of Hungary's national cancer registry by its own staff and IARC: its incidence figures run 12 to 15% above IARC's estimates, mostly because of cancers coded to ill-defined sites, and only 57.8% of cases were confirmed under the microscope.",
    summary: "The authors assessed the comparability, completeness, validity and timeliness of the data the Hungarian National Cancer Registry collected for diagnoses from 2000 to 2019, with a focus on 2018, using qualitative and semiquantitative methods from international guidelines.",
    findings: [
      "The registry codes cases in ICD-10 rather than the internationally recommended ICD-O.",
      "Age-standardised (European standard) incidence in 2018 was 647.9 per 100,000 men and 501.6 per 100,000 women, 11.6% and 14.6% higher than IARC's estimates.",
      "Most of the difference came from ill-defined codes: C76 (other and ill-defined sites) and C80 (site unspecified); there were no major discrepancies by site otherwise.",
      "57.8% of cases were morphologically verified, 2.3% were registered from death certificates and 1.4% were unknown primaries.",
    ],
    whatItMeans: "Hungary's registry counts are usable for planning but overstate incidence somewhat; IARC's GLOBOCAN 2024 fact sheet lists no country-specific incidence source for Hungary and models incidence from deaths instead.",
    caveats: ["Written by the registry's own staff with IARC co-authors.", "Focuses on 2018; later years were not evaluated."],
    institutions: ["hungarian-national-cancer-registry", "noi-budapest", "iarc"], cancers: ["lung-cancer", "colorectal", "breast-cancer"],
    links: [doi("10.1016/j.canep.2022.102306", "Cancer Epidemiol 2023"), pubmed("36521336")] }),

  p({ id: "paper-kenessey-lung-cancer-hungary-2018-sci-rep-2024", name: "The epidemiology of lung cancer in Hungary based on the characteristics of patients diagnosed in 2018",
    journal: "Scientific Reports", year: 2024, doi: "10.1038/s41598-024-70143-w", pmid: "39209889", authors: "Kenessey I, Parrag P, Dobozi M, Szatmári I, Wéber A, Nagy P, Polgár C.", paperType: "observational", participants: 9519,
    tldr: "After cleaning every lung cancer reported to Hungary's registry for 2018, the count fell from 11,746 to 9,519; Hungary was still among the European countries with the highest rates, and five-year survival was 14.8%.",
    summary: "Registry staff checked each lung cancer case reported to the Hungarian National Cancer Registry for 2018, described the clinical and pathological features and survival of the corrected population, and compared the figures with European estimates.",
    findings: [
      "Data cleansing reduced the number of 2018 lung cancer cases from 11,746 reported to 9,519.",
      "Age-standardised incidence was 92.9 per 100,000 men and 50.6 per 100,000 women; the authors conclude Hungary did not have the highest incidence and mortality in Europe but was among the worst-ranking countries.",
      "From 2001 to 2019 reported cases fell slightly in men and rose in women; adenocarcinoma was the commonest subtype, more so in women.",
      "Most cases were diagnosed at an advanced stage, and five-year overall survival was 14.8%.",
    ],
    whatItMeans: "Raw registry counts for lung cancer in Hungary include cases that do not survive checking, so the cleaned figure is closer to IARC's estimate than the reported one.",
    caveats: ["One diagnosis year.", "Written by the registry's own staff."],
    institutions: ["hungarian-national-cancer-registry", "noi-budapest"], cancers: ["lung-cancer", "nsclc"],
    links: [doi("10.1038/s41598-024-70143-w", "Sci Rep 2024"), pubmed("39209889")] }),

  p({ id: "paper-kerpel-fronius-hunchest-ii-eur-radiol-2024", name: "HUNCHEST-II: final results of a nationwide low-dose CT lung cancer screening programme in Hungary",
    journal: "European Radiology", year: 2024, doi: "10.1007/s00330-023-10379-8", pmid: "37921926", authors: "Kerpel-Fronius A, Megyesfalvi Z, Markóczy Z, et al.; Bogos K.", paperType: "observational", participants: 4215,
    tldr: "In 18 Hungarian centres, 4,215 heavy smokers aged 50 to 75 were assigned to low-dose CT screening; 76 lung cancers were found, 60.7% of them at stage I, significantly earlier than in unscreened Hungarian patients.",
    summary: "Published as \"HUNCHEST-II contributes to a shift to earlier-stage lung cancer detection: final results of a nationwide screening program\". High-risk people aged 50 to 75 with at least 25 pack-years of smoking were screened with low-dose CT, and the stage of screen-detected cancers was compared with two databases of unscreened patients: the National Korányi Institute of Pulmonology's archive and the Hungarian Cancer Registry.",
    findings: [
      "4,215 participants in 18 facilities; at baseline 74.2% of tests were negative, 21.7% indeterminate and 4.1% positive.",
      "76 lung cancers were diagnosed (1.8% of participants), 62 of them in the first round; the positive predictive value of a positive test was 58%.",
      "60.7% of screen-detected cancers were stage I and 16.4% stage IV, a significantly earlier distribution than in either comparison database (p < 0.001).",
    ],
    whatItMeans: "The authors conclude that the results argue for systematic lung cancer screening in Hungary; the OECD's 2025 profile cites the study beside the National Institute of Oncology's recommendation of low-dose CT screening for people at high risk.",
    caveats: ["Single-arm programme; it measures stage shift, not deaths prevented.", "Comparison groups were unscreened patients from other databases, not a randomised control arm."],
    institutions: ["koranyi-institute-budapest", "hungarian-national-cancer-registry"], people: ["krisztina-bogos"], cancers: ["lung-cancer", "nsclc"],
    links: [doi("10.1007/s00330-023-10379-8", "Eur Radiol 2024"), pubmed("37921926")] }),

  p({ id: "paper-kiss-hulc-postmortem-lung-cancer-hungary-front-oncol-2022", name: "Underlying reasons for post-mortem diagnosed lung cancer cases: a retrospective comparative study from Hungary (HULC study)",
    journal: "Frontiers in Oncology", year: 2022, doi: "10.3389/fonc.2022.1032366", pmid: "36505881", authors: "Kiss ZN, Bogos K, Tamási L, et al.", paperType: "real-world", participants: 8435,
    tldr: "Of 8,435 people who died of lung cancer in Hungary in 2019, 1,203 (14.24%) had never had lung cancer recorded in insurance data while alive: their cancer was found only after death.",
    summary: "The Hungarian Undiagnosed Lung Cancer study linked the Central Statistical Office's death records with the National Health Insurance Fund's care records for everyone who died of lung cancer in 2019, and compared those diagnosed only after death with those diagnosed in life.",
    findings: [
      "1,203 of 8,435 lung cancer deaths in 2019 (14.24%) had no lung cancer code in insurance records during life.",
      "People diagnosed after death were older (mean 71.20 against 68.69 years) and had fewer GP and specialist visits, X-rays and CT scans in the months before death.",
      "People diagnosed in life were more often married (47.62% against 33.49%) and had higher educational attainment.",
    ],
    whatItMeans: "Part of Hungary's high recorded lung cancer mortality comes from cancers found at post-mortem examination, which the OECD links to Hungary's high autopsy rate.",
    caveats: ["Based on administrative codes; a missing code may not always mean a missed diagnosis.", "One year of deaths."],
    institutions: ["neak-hungary", "koranyi-institute-budapest", "hungarian-national-cancer-registry"], people: ["krisztina-bogos"], cancers: ["lung-cancer"],
    links: [doi("10.3389/fonc.2022.1032366", "Front Oncol 2022"), pubmed("36505881")] }),

  p({ id: "paper-hofmarcher-cee-cancer-medicine-access-esmo-open-2023", name: "Access to novel cancer medicines in four countries in Central and Eastern Europe in relation to clinical benefit",
    journal: "ESMO Open", year: 2023, doi: "10.1016/j.esmoop.2023.101593", pmid: "37413761", authors: "Hofmarcher T, Szilagyiova P, Gustafsson A, Dolezal T, Rutkowski P, Baxter C, Karamousouli E.", paperType: "observational",
    tldr: "Of 124 indications of cancer medicines authorised in the EU from 2011 to 2020, Hungary reimbursed 40%, and the median wait from authorisation to reimbursement was 37 months, the longest of the four countries studied.",
    summary: "The authors followed 124 indications of 51 cancer medicines authorised by the European Medicines Agency in 2011 to 2020 until 2022, and compared reimbursement status and waiting time in Czechia, Hungary, Poland and Slovakia against each indication's ESMO Magnitude of Clinical Benefit Scale rating.",
    findings: [
      "Reimbursed indications: 64% in Czechia, 40% in Hungary, 51% in Poland and 19% in Slovakia.",
      "In every country, indications with substantial clinical benefit were more likely to be reimbursed (P < 0.05).",
      "Median waiting time to reimbursement ranged from 27 months in Poland to 37 months in Hungary, with no difference by clinical benefit (P = 0.25 to 0.84).",
    ],
    whatItMeans: "Hungarian patients waited a median of just over three years for new cancer medicines to be reimbursed, and the wait was no shorter for the medicines that help most.",
    caveats: ["Data end in 2022, before Hungary's 2024 inclusion of new oncology medicines in public financing.", "Four countries only, and reimbursement status is counted per indication, not per patient treated."],
    institutions: ["neak-hungary"], cancers: ["lung-cancer", "breast-cancer"],
    links: [doi("10.1016/j.esmoop.2023.101593", "ESMO Open 2023"), pubmed("37413761")] }),

  p({ id: "paper-garami-childhood-cancer-registry-hungary-orv-hetil-2024", name: "National Childhood Cancer Registry of Hungary (Nemzeti Gyermekonkológiai Regiszter)",
    journal: "Orvosi Hetilap", year: 2024, doi: "10.1556/650.2024.33061", pmid: "38888981", authors: "Garami M, Jakab Z.", paperType: "review",
    tldr: "Hungary's childhood cancer registry, run by the Hungarian Paediatric Oncology Network since 1971 and based at Semmelweis University's paediatric centre, covers every insured child aged 0 to 18 and has collected data online since 2010.",
    summary: "The authors describe the Childhood Cancer Registry, which is separate from the National Cancer Registry: it has been operated by the Hungarian Pediatric Oncology Network since 1971 to record the epidemiology, treatment, outcomes and long-term follow-up of childhood cancers, and is located at the Pediatric Center of Semmelweis University.",
    findings: [
      "Reporting moved from paper to an online system in April 2010.",
      "Data come from the National Health Insurance Fund and the network's centres, and cover all Hungarian children aged 0 to 18 with a social security card.",
      "Completeness is monitored through written procedures, and results are published in annual reports, papers and presentations.",
    ],
    whatItMeans: "Children's cancers in Hungary are counted by a dedicated registry with five decades of data, not only by the adult national registry.",
    caveats: ["A descriptive account in Hungarian; the abstract gives no incidence or survival figures."],
    institutions: ["hungarian-national-cancer-registry"], cancers: ["childhood-cancers"],
    links: [doi("10.1556/650.2024.33061", "Orv Hetil 2024"), pubmed("38888981")] }),
];

/** Records behind /countries/hu/ (wave 6). */
export const recordsHU: EntityInput[] = [...institutions, ...papers];
