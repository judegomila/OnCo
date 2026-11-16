import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Lithuania: the public bodies, patient organisation and papers behind /countries/lt/ (wave 10) that the corpus did not
 * hold. Each was written from sources read raw on 11 November 2026: the OECD and European Commission's EU Country Cancer
 * Profile: Lithuania 2025 (PDF text, from the Internet Archive's copy of the European Cancer Inequalities Registry
 * file), the National Cancer Institute's Cancer Registry page and its activity report for 2025 (PDF text, in
 * Lithuanian), the patient association POLA's own about and contact pages (in Lithuanian), and one VLK news page of
 * December 2021 through the Internet Archive. The Lithuanian government sites on lrv.lt (Ministry of Health, National
 * Health Insurance Fund, State Medicines Control Agency) answered a plain request with a bot challenge and were not read
 * live; otherwise what these records say about those bodies comes from the Country Cancer Profile. DOIs were resolved through Europe PMC and the figures in `findings` are taken from the
 * indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the insurer, the regulator, POLA and the four cancer hospitals; the
 * registry links the National Cancer Institute and its papers. The National Cancer Institute, Santaros Klinikos, Kauno
 * Klinikos and Klaipėda University Hospital already exist (centres-wave3.ts, europe.ts) and are reused, not duplicated.
 * Coordinates are approximate Vilnius city points, except the registry, which sits at the National Cancer Institute.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const CCP_2025 = "https://web.archive.org/web/20260519070348/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-lt-2024-1674-en.pdf";
const CCP_DOI = "https://doi.org/10.1787/b260e7d1-en";
const NVI_REGISTRY = "https://nvi.lt/vezio-registras/";
const NVI_REPORT_2025 = "https://nvi.lt/wp-content/uploads/2026/05/NVI_Ataskaita_2025_GALUTINE-2026-03-18.pdf";
const NVI_REGISTRY_REFORM = "https://nvi.lt/pradedamas-lietuvos-vezio-registro-pertvarkymas-siekiama-realaus-laiko-duomenu-ir-pazangios-onkologijos-politikos/";
const REGISTRY_PORTAL = "https://registras.nvi.lt/lt/";
const POLA_ABOUT = "https://pola.lt/apie-pola/";

const institutions: InstitutionInput[] = [
  i({ id: "lithuania-ministry-of-health", name: "Ministry of Health of the Republic of Lithuania", aka: ["Sveikatos apsaugos ministerija", "SAM", "Lithuanian Ministry of Health"],
    city: "Vilnius", country: "LT", lat: 54.687, lng: 25.28, institutionType: "government", website: "https://sam.lrv.lt",
    tldr: "Lithuania's health ministry. It wrote the National Cancer Prevention and Control Programme 2014 to 2025 and its 2023 to 2025 implementation plan, and since July 2025 it controls the Cancer Registry's information system.",
    summary: "The Ministry of Health is responsible for Lithuania's National Cancer Prevention and Control Programme 2014 to 2025, which the OECD and European Commission's Country Cancer Profile 2025 describes as broadly aligned with Europe's Beating Cancer Plan: it covers risk factors, the organisation of screening, the co-ordination of cancer care, rehabilitation and psychological support, and paediatric cancer. On 16 January 2023 an Implementation Measures Plan for 2023 to 2025 was adopted, and the profile reports that a programme for 2026 to 2030 was being prepared by the Monitoring Council for the Organisation of Oncological Care and the Ministry's Specialised Healthcare Division. The coordinates are an approximate Vilnius city point.\n\nThe profile records that in 2017 Lithuania set national waiting-time targets for cancer care, among them 14 days from diagnosis to the start of treatment, and that from May 2023 a Green Corridor model with oncology care managers was introduced to meet them. The Ministry announced a move to a more population-based approach to screening, with a GP referral no longer required from 1 January 2025. The National Cancer Institute's Cancer Registry page states that the regulations of the registry's information system were approved in July 2025 with the Ministry named as the system's controller.\n\nThe Ministry's own site, sam.lrv.lt, answered a plain request with a bot challenge on 11 November 2026 and was not read for this record.",
    programs: ["National Cancer Prevention and Control Programme 2014 to 2025", "Implementation Measures Plan 2023 to 2025", "Green Corridor for cancer patients (from May 2023)", "National cancer screening programmes"],
    institutions: ["lithuanian-cancer-registry", "vlk-lithuania", "vvkt-lithuania", "nci-vilnius", "santaros-klinikos", "kauno-klinikos", "klaipeda-university-hospital", "pola-lithuania"],
    cancers: ["breast-cancer", "cervical", "colorectal", "prostate"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-patasius-lithuania-psa-screening-jcm-2020", "paper-steponaviciene-lithuania-mammography-stage-cancer-control-2019", "paper-everatt-lithuania-breast-prostate-mortality-bmcph-2022"],
    links: [
      { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
      { label: "EU Country Cancer Profile Lithuania 2025 (OECD record)", url: CCP_DOI },
      { label: "National Cancer Institute: Cancer Registry (in Lithuanian)", url: NVI_REGISTRY },
    ] }),

  i({ id: "lithuanian-cancer-registry", name: "Lithuanian Cancer Registry", aka: ["Vėžio registras", "Lietuvos vėžio registras", "Cancer Registry of Lithuania"],
    city: "Vilnius", country: "LT", lat: 54.717, lng: 25.285, institutionType: "research-institute", website: REGISTRY_PORTAL,
    tldr: "Lithuania's population-based cancer registry, kept by the National Cancer Institute in Vilnius. It holds records of new cancers diagnosed in Lithuania since 1978, receives more than 25,000 notifications a year, and opened a public data portal in 2025.",
    summary: "The Cancer Registry (Vėžio registras) is a population-based registry covering the whole of Lithuania. Its page on the National Cancer Institute's site states that it was established by Government resolution No. 806 of 11 August 2016, which approved its regulations, and began work under them on 1 January 2017; the regulations of its information system were approved in July 2025, with the Ministry of Health as controller and the National Cancer Institute as the registry's keeper. The coordinates are those of the institute, approximately.\n\nDoctors who diagnose a cancer notify it on statistical form No. 090/a; notifications also arrive electronically and as pathology files, and from 1 January 2026 data are received from the national e-health system (ESPBI IS). The page counts more than 25,000 notifications a year and more than 500,000 since 1978, and cross-checks against death certificates and the State Register of Deaths and their Causes. Diagnoses are coded in ICD-10-AM and ICD-O-3.1, with tumour grade recorded since 2003 and TNM 8th edition stage since 2020. The registry is a member of the International Association of Cancer Registries and the European Network of Cancer Registries, has sent data to Cancer Incidence in Five Continents since 1998, and contributes to CONCORD, EUROCARE and the International Incidence of Childhood Cancer.\n\nThe institute's activity report for 2025 gives the registry's headline figures: 16,413 new cancers registered in 2022, an age-standardised rate of 287.9 per 100,000, about 138,500 people living after a cancer diagnosis in 2022, and five-year survival of 59% for men and 69% for women. Since 2025 an open data portal, registras.nvi.lt, shows incidence, prevalence, survival and mortality in interactive tables.",
    programs: ["Population-based registration of cancers in Lithuania (records from 1978; regulations from 2017)", "Open data portal registras.nvi.lt (from 2025)", "Contributions to Cancer Incidence in Five Continents, CONCORD and EUROCARE"],
    institutions: ["nci-vilnius", "lithuania-ministry-of-health", "iarc"], cancers: ["prostate", "breast-cancer", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-patasius-lithuania-psa-screening-jcm-2020", "paper-steponaviciene-lithuania-mammography-stage-cancer-control-2019", "paper-korobeinikova-baltic-radiotherapy-capacity-acta-oncol-2026"],
    links: [
      { label: "National Cancer Institute: Cancer Registry (in Lithuanian)", url: NVI_REGISTRY },
      { label: "Cancer Registry open data portal (in Lithuanian)", url: REGISTRY_PORTAL },
      { label: "National Cancer Institute: activity report 2025, epidemiology section (PDF, in Lithuanian)", url: NVI_REPORT_2025 },
      { label: "National Cancer Institute: the Lithuanian Cancer Registry's modernisation begins (17 December 2025, in Lithuanian)", url: NVI_REGISTRY_REFORM },
    ] }),

  i({ id: "vlk-lithuania", name: "National Health Insurance Fund under the Ministry of Health (VLK)", aka: ["Valstybinė ligonių kasa", "VLK", "Compulsory Health Insurance Fund", "PSDF", "Privalomojo sveikatos draudimo fondas"],
    city: "Vilnius", country: "LT", lat: 54.69, lng: 25.27, institutionType: "government", website: "https://ligoniukasa.lrv.lt",
    tldr: "The body that runs Lithuania's compulsory health insurance fund (PSDF), which pays for cancer treatment, the four national screening programmes and palliative care.",
    summary: "The National Health Insurance Fund (Valstybinė ligonių kasa, VLK) administers the Compulsory Health Insurance Fund, PSDF. The OECD and European Commission's Country Cancer Profile 2025 reports that the PSDF covers four cancer screening programmes free of charge for their target groups (breast, cervical, colorectal and prostate), that palliative care is fully covered by the PSDF in inpatient and outpatient settings, with up to 120 days of inpatient palliative care reimbursed, and that a 2020 amendment raised the number of reimbursable home visits to 52, 156 or 260 depending on need. The coordinates are an approximate Vilnius city point.\n\nThe profile describes the Green Corridor, in place since May 2023, as a fast-track pathway in which an oncology case manager arranges diagnosis and treatment once a cancer is found, including through the screening programmes. It reports that from 1 January 2025 a GP referral is no longer needed to join a screening programme, and that two co-ordination centres, Santaros Klinikos in Vilnius and Kauno Klinikos in Kaunas, were set up to send invitations, with EUR 340,000 of EU funds. On medicines, the profile reports that new cancer medicines reached the public reimbursement list a mean of 1,141 days after European approval, and that about 40% of a sample of high-benefit cancer medicine indications were reimbursed in April 2023, against almost 60% across the EU.\n\nA VLK news page of 1 December 2021, read from the Internet Archive's copy, put the fund's spending on cancer treatment in 2020 at more than EUR 280 million, including EUR 126 million to reimburse anti-cancer medicines for almost 40,000 patients. VLK's live site, ligoniukasa.lrv.lt, answered a plain request with a bot challenge on 11 November 2026.",
    programs: ["Compulsory Health Insurance Fund (PSDF)", "Breast, cervical, colorectal and prostate cancer screening programmes", "Reimbursed medicines", "Palliative care cover"],
    institutions: ["lithuania-ministry-of-health", "vvkt-lithuania", "santaros-klinikos", "kauno-klinikos"],
    cancers: ["breast-cancer", "cervical", "colorectal", "prostate"],
    links: [
      { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, sections 4 and 5 (PDF, Internet Archive copy)", url: CCP_2025 },
      { label: "EU Country Cancer Profile Lithuania 2025 (OECD record)", url: CCP_DOI },
      { label: "VLK: oncological diseases, will invest in both treatment and prevention (1 December 2021; Internet Archive copy)", url: "https://web.archive.org/web/20250911092910/https://ligoniukasa.lrv.lt/en/news/oncological-diseases-will-invest-in-both-treatment-and-prevention/" },
    ] }),

  i({ id: "vvkt-lithuania", name: "State Medicines Control Agency under the Ministry of Health (VVKT)", aka: ["Valstybinė vaistų kontrolės tarnyba", "VVKT", "State Medicines Control Service of Lithuania"],
    city: "Vilnius", country: "LT", lat: 54.7, lng: 25.3, institutionType: "government", website: "https://vvkt.lrv.lt",
    tldr: "Lithuania's medicines regulator. Most new cancer medicines are authorised for the whole EU through the European Medicines Agency; in Lithuania VVKT also evaluates applications for a medicine to be reimbursed, and an audit in 2023 found a long backlog.",
    summary: "The State Medicines Control Agency (Valstybinė vaistų kontrolės tarnyba, VVKT) is Lithuania's national medicines authority, part of the European medicines regulatory network in which new cancer medicines are authorised centrally on the European Medicines Agency's opinion. The OECD and European Commission's Country Cancer Profile 2025 describes its role in reimbursement: VVKT evaluates applications and makes recommendations, after which the Medicinal Products and Medical Aid Reimbursement Commission decides whether a medicine joins the reimbursable list. The coordinates are an approximate Vilnius city point.\n\nQuoting the State Audit Office's 2023 audit of medicine availability, the profile reports that of 140 new drug applications made since January 2020, 60 had received a decision from VVKT by 12 September 2023, of which 8 met the 180-day limit set by the EU Transparency Directive; 66 applications were pending, with waits of between 223 and 902 days. In 2022 the number of specialists assessing new drug applications rose from eight to ten. The profile gives a mean of 1,141 days between European approval and a reimbursement decision for new cancer medicines in Lithuania, the second longest of 22 EU countries with data.\n\nVVKT's own site, vvkt.lrv.lt, answered a plain request with a bot challenge on 11 November 2026 and was not read for this record.",
    programs: ["National marketing authorisation of medicines", "Evaluation of reimbursement applications", "Part of the European medicines regulatory network"],
    institutions: ["lithuania-ministry-of-health", "ema"],
    links: [
      { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
      { label: "EU Country Cancer Profile Lithuania 2025 (OECD record)", url: CCP_DOI },
    ] }),

  i({ id: "pola-lithuania", name: "Association for Assistance to Cancer Patients (POLA)", aka: ["Pagalbos onkologiniams ligoniams asociacija", "POLA", "Lithuanian Cancer Patient Coalition"],
    city: "Vilnius", country: "LT", lat: 54.71, lng: 25.27, institutionType: "consortium", website: "https://pola.lt",
    tldr: "An umbrella association of Lithuanian cancer patient organisations, founded in 2012. It joins 30 organisations, gives free consultations, and speaks for patients on cancer policy; more than 55,000 people hold its POLA card.",
    summary: "The Association for Assistance to Cancer Patients (Pagalbos onkologiniams ligoniams asociacija, POLA) has worked since 3 January 2012. Its about page describes it as one of the largest umbrella non-governmental organisations in Lithuania, joining 30 organisations that bring together or serve cancer patients, and a community of more than 55,000 cancer patients who hold a POLA card. It is a member of Digestive Cancers Europe, Youth Cancer Europe, the CML Advocates Network and the World Patients Alliance, and says it is funded by donations and project grants. Its contacts page gives an office in Vilnius and a registration address in Kaunas; the coordinates are an approximate Vilnius city point.\n\nThe OECD and European Commission's Country Cancer Profile 2025, which calls it the Lithuanian Cancer Patient Coalition, reports that it offers free consultations on legal and psychological questions and on lifestyle and nutrition, runs patient education and discounts with businesses, takes part in legislative consultations, and has raised concerns about how patients enter the Green Corridor. The profile records that POLA and other organisations aimed to reach at least 5,000 cancer patients and 1,000 family members in 2025.",
    programs: ["Free consultations for patients and families", "POLA card", "Patient guides and patient academy", "Policy proposals on cancer care"],
    institutions: ["digestive-cancers-europe", "youth-cancer-europe", "lithuania-ministry-of-health"],
    links: [
      { label: "POLA: about POLA (in Lithuanian)", url: POLA_ABOUT },
      { label: "POLA: contacts (in Lithuanian)", url: "https://pola.lt/kontaktai/" },
      { label: "OECD and European Commission: EU Country Cancer Profile Lithuania 2025, section 5.4 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-patasius-lithuania-psa-screening-jcm-2020", name: "Ten years of Lithuania's population-based PSA early detection programme for prostate cancer",
    journal: "Journal of Clinical Medicine", year: 2020, doi: "10.3390/jcm9123826", pmid: "33255919", authors: "Patasius A, Krilaviciute A, Smailyte G.", paperType: "observational",
    tldr: "In Lithuania's PSA testing programme for men aged 50 to 74, 70% of the men eligible were tested at least once in the first ten years, and men who took part were more likely to be diagnosed while the cancer was still confined to the prostate.",
    summary: "Published as \"Prostate Cancer Screening with PSA: Ten Years' Experience of Population Based Early Prostate Cancer Detection Programme in Lithuania\". A retrospective analysis of screening activity recorded in 2006 to 2015 among men aged 50 to 74, estimating coverage, cancer detection, compliance with biopsy and positive predictive values in each screening round, inside and outside the target population.",
    findings: [
      "16,061 prostate cancers were registered within the programme in its first ten years, 10,202 among screened men but reported outside the programme, and 1,455 in men never screened.",
      "Coverage reached up to 45.5% of the target population in recent rounds; 70% of the target population was screened at least once in ten years.",
      "The share of PSA-positive men fell from 16.9% in 2006 to 10.7% in 2014 to 2015; up to 40.0% of PSA-positive men had a biopsy, and 42.0% of biopsies found cancer.",
      "Screening participants were more likely than non-participants to be diagnosed with organ-confined disease.",
    ],
    whatItMeans: "Lithuania has offered PSA testing through a national programme since 2006; this is the Cancer Registry team's account of what the programme did in its first decade.",
    caveats: ["The authors describe the screening as unorganised, with low coverage in each round.", "The study reports detection and stage, not deaths prevented, and does not measure overdiagnosis."],
    institutions: ["lithuanian-cancer-registry", "nci-vilnius"], cancers: ["prostate"],
    links: [doi("10.3390/jcm9123826", "J Clin Med 2020"), pubmed("33255919")] }),

  p({ id: "paper-everatt-lithuania-breast-prostate-mortality-bmcph-2022", name: "Trends in breast and prostate cancer deaths in Lithuania, 1986 to 2020",
    journal: "BMC Public Health", year: 2022, doi: "10.1186/s12889-022-14207-4", pmid: "36151551", authors: "Everatt R, Gudavičienė D.", paperType: "observational",
    tldr: "Breast cancer death rates in Lithuania have fallen by about 1.2% a year since 1996 and prostate cancer death rates by about 1.7% a year since 2007; the authors judge that PSA testing may have helped modestly in men under 65 and find no key role for the screening programme in the breast cancer trend.",
    summary: "An analysis of death certificate data from the World Health Organization database for breast cancer in women and prostate cancer in men in Lithuania from 1986 to 2020, using Joinpoint regression on age-standardised rates and age-period-cohort models, written because both rates remained high despite screening programmes started in 2006.",
    findings: [
      "Breast cancer mortality rose by 1.6% a year until 1996 and then fell by 1.2% a year.",
      "Prostate cancer mortality, after a sharp rise of 3.0% a year, fell by 1.7% a year from 2007.",
      "Breast cancer trends were explained mainly by birth-cohort effects; prostate cancer trends mainly by period effects.",
    ],
    whatItMeans: "The fall in deaths is consistent with mammography and PSA testing arriving, lagging up to ten years, but the screening programmes are not shown to have driven it; better early detection and timely treatment are still needed.",
    caveats: ["Death certificate data only; the study cannot link individual deaths to screening.", "The authors find any screening effect on prostate cancer deaths moderate and limited to men under 65."],
    cancers: ["breast-cancer", "prostate"],
    links: [doi("10.1186/s12889-022-14207-4", "BMC Public Health 2022"), pubmed("36151551")] }),

  p({ id: "paper-steponaviciene-lithuania-mammography-stage-cancer-control-2019", name: "Breast cancer stage at diagnosis before and during Lithuania's mammography screening programme",
    journal: "Cancer Control", year: 2019, doi: "10.1177/1073274818821096", pmid: "30808202", authors: "Steponaviciene L, Briediene R, Vanseviciute R, Smailyte G.", paperType: "observational",
    tldr: "Using registry data from 1998 to 2012, the authors found that early breast cancers were already being found more often before mammography screening began in Lithuania, and that the programme's introduction did not significantly change the trends in early and advanced disease.",
    summary: "Published as \"Trends in Breast Cancer Incidence and Stage Distribution Before and During the Introduction of the Mammography Screening Program in Lithuania\". Incidence of localised and advanced breast cancer was compared between a prescreening period (1998 to 2005) and the implementation period (2006 to 2012) in three age groups, including the target group aged 50 to 69.",
    findings: [
      "In the target group, stage I breast cancer incidence rose by 10.3% a year, from 3.3 per 100,000 in 1998 to 12.2 per 100,000 in 2012.",
      "The rise in localised cancers was faster before the programme (10.3% a year) than during its introduction (5.7%).",
      "Advanced breast cancer fell slightly over the whole period (by 1.1% a year), with no significant change during the programme's introduction.",
    ],
    whatItMeans: "In its first years the programme did not by itself shift breast cancers to earlier stages; awareness and better diagnosis may explain the trends.",
    caveats: ["Covers the programme's first seven years only, when participation was lower than later.", "Registry stage data, not outcomes."],
    institutions: ["lithuanian-cancer-registry", "nci-vilnius"], cancers: ["breast-cancer"],
    links: [doi("10.1177/1073274818821096", "Cancer Control 2019"), pubmed("30808202")] }),

  p({ id: "paper-korobeinikova-baltic-radiotherapy-capacity-acta-oncol-2026", name: "Radiotherapy and diagnostic capacity in Estonia, Latvia and Lithuania",
    journal: "Acta Oncologica", year: 2026, doi: "10.2340/ao.v65.45442", pmid: "42043273", authors: "Korobeinikova E, Paļskis K, Dosanjh M, et al.", paperType: "observational",
    tldr: "A census of all 11 radiotherapy centres in the three Baltic States found that only 35 to 42% of cancer patients received radiotherapy, below the 50% usually recommended, and that Lithuania had 3.8 linear accelerators per million people, the only one of the three below the European guideline.",
    summary: "The authors, from Baltic cancer centres and universities including the Lithuanian University of Health Sciences in Kaunas, Klaipėda University Hospital, Šiauliai hospital and the National Cancer Institute's Cancer Registry, with IARC and CERN, surveyed all 11 radiotherapy centres in Estonia, Latvia and Lithuania for 2016 to 2023 with a standard questionnaire cross-checked against national registries and international databases, and compared equipment, workforce and use with EU countries.",
    findings: [
      "Only 35 to 42% of cancer patients received radiotherapy, below the 50% recommendation; in Lithuania the share was around 40%.",
      "Linear accelerators ranged from 3.8 to 5.1 per million inhabitants, about half the level of EU countries with higher GDP per head; Lithuania had 3.8, the only Baltic State below the ESTRO-QUARTS guideline of one per 250,000 people.",
      "Lithuania had the highest rate of external beam treatment, 252 patients per 100,000 inhabitants in 2023, and nearly double the treatments per machine of its neighbours.",
      "Use of IMRT, VMAT and stereotactic radiotherapy rose quickly, while staffing stayed static; the mortality-to-incidence ratio was lower where radiotherapy capacity was higher.",
    ],
    whatItMeans: "Lithuanian radiotherapy machines are modern and heavily used, but there are too few of them for the number of patients who could benefit.",
    caveats: ["Centre questionnaires, cross-validated but self-reported; the Lithuania figures here are from the full text, not only the abstract.", "The comparison countries were chosen by the authors."],
    institutions: ["klaipeda-university-hospital", "lithuanian-cancer-registry", "nci-vilnius", "iarc"],
    links: [doi("10.2340/ao.v65.45442", "Acta Oncol 2026"), pubmed("42043273"), { label: "Full text (Europe PMC)", url: "https://europepmc.org/articles/PMC13127107" }] }),
];

/** Records behind /countries/lt/ (wave 10). */
export const recordsLT: EntityInput[] = [...institutions, ...papers];
