import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Papua New Guinea: the public bodies and papers behind /countries/pg/ (wave 11) that the corpus did not hold. Each was
 * written from its own primary source, read raw on 11 November 2026: the National Department of Health's National
 * Cancer Control Policy 2015 (PDF text), its Free Primary Health Care and Subsidized Specialist Services Policy of 2013
 * (PDF text), its Pharmaceutical Services Standards Branch page and the Medicines and Cosmetics Act 1999 it links (PDF
 * text), IAEA DIRAC's public equipment data and WHO's release of 8 September 2026 on the HPV vaccine launch. DOIs were
 * resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Department links the National Cancer Centre, Port Moresby General Hospital and the Pharmaceutical
 * Services Standards Branch, and each links the Department back; the papers are linked through keyPapers.
 * Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NDOH = "https://www.health.gov.pg/";
const NCCP_2015 = "https://www.health.gov.pg/pdf/NCCP_2015.pdf";
const FREE_CARE_2013 = "https://www.health.gov.pg/pdf/FPHCSSSP_2014.pdf";
const PSSB = "https://www.health.gov.pg/subindex.php?pharm=1";
const MCA_1999 = "https://www.health.gov.pg/param_pdf/M%26CA1999.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_HPV_LAUNCH = "https://www.who.int/papuanewguinea/news/detail/08-09-2026-papua-new-guinea-launches-hpv-vaccination-to-protect-girls-from-cervical-cancer";

const institutions: InstitutionInput[] = [
  i({ id: "png-national-department-of-health", name: "National Department of Health, Papua New Guinea", aka: ["NDoH", "PNG National Department of Health", "Department of Health Papua New Guinea"],
    city: "Port Moresby", country: "PG", lat: -9.43, lng: 147.19, institutionType: "government", website: NDOH,
    tldr: "Papua New Guinea's health department. It wrote the National Cancer Control Policy approved by the National Executive Council in 2015, runs the free primary health care policy of 2013, and regulates medicines through its Pharmaceutical Services Standards Branch.",
    summary: "The National Department of Health describes itself as the steward of Papua New Guinea's health system. Its National Cancer Control Policy, approved by the National Executive Council in 2015 (NEC Decision No. 25/2015), was, in the words of its foreword, the first time a comprehensive policy had been developed for the burden of cancer in Papua New Guinea. It says cancer services had grown without a national plan, that a cancer registry from the 1980s had stopped working, that the National Cancer Centre at Angau Memorial Hospital in Lae was the only place giving radiotherapy, and that Port Moresby General Hospital was the only domestic hospital with a histopathology service. The policy set out a National Cancer Control Program, a National Cancer Coordination Committee advised by a National Cancer Advisory Council, a phased cancer registry beginning in Lae and Port Moresby, and screening methods that are cost-effective and locally appropriate. Its Free Primary Health Care and Subsidized Specialist Services Policy of 2013 set out to abolish user fees at aid posts, health centres and urban clinics and planned subsidised specialist care in hospitals. On 8 September 2026 it introduced HPV vaccination into the national immunisation programme with Australia, Gavi, WHO and UNICEF. The coordinates are an approximate Port Moresby city point.",
    programs: ["National Cancer Control Policy 2015", "National Cancer Control Program", "Free Primary Health Care and Subsidized Specialist Services Policy (2013)", "HPV vaccination in the national immunisation programme (from September 2026)", "Pharmaceutical Services Standards Branch"],
    institutions: ["angau-national-cancer-centre-png", "port-moresby-general-hospital", "pssb-png", "who", "iaea", "iarc"],
    cancers: ["cervical", "breast-cancer", "oral-cavity-cancer", "hcc"],
    keyPapers: ["paper-vallely-hpv-stat-png-lancetgh-2022", "paper-nguyen-hpv-screen-treat-png-bmjgh-2022", "paper-kelwaip-oral-cancer-png-oooo-2020", "paper-umo-breast-cancer-cost-png-jcpo-2023"],
    links: [
      { label: "National Department of Health: National Cancer Control Policy 2015 (PDF)", url: NCCP_2015 },
      { label: "National Department of Health: Free Primary Health Care and Subsidized Specialist Services Policy (2013, PDF)", url: FREE_CARE_2013 },
      { label: "WHO: Papua New Guinea launches HPV vaccination (8 September 2026)", url: WHO_HPV_LAUNCH },
    ] }),

  i({ id: "angau-national-cancer-centre-png", name: "National Cancer Centre, Angau Memorial Hospital, Lae", aka: ["NCC Lae", "Angau Memorial Hospital National Cancer Centre", "Papua New Guinea National Cancer Centre", "National Cancer Treatment Centre Lae"],
    city: "Lae", country: "PG", lat: -6.72, lng: 146.99, institutionType: "cancer-center", website: NCCP_2015,
    tldr: "Papua New Guinea's national cancer centre, at Angau Memorial Hospital in Lae, and the only radiotherapy centre IAEA's directory lists in the country: two cobalt-60 machines and one brachytherapy unit, in an entry last updated in 2024.",
    summary: "The 2015 National Cancer Control Policy says the government set up the National Cancer Centre at Angau Memorial Hospital in Lae, Morobe Province, before independence, and that it became the main centre for cancer treatment with a cobalt-60 external beam machine, chemotherapy and brachytherapy. Radiotherapy stopped in 1998, when the cobalt-60 machine broke down and no cancer specialist was available, and for the next ten years there was no radiotherapy in the country; those who could afford it went overseas. The centre was revitalised in 2009. The policy describes it as the only facility giving external beam radiotherapy, brachytherapy and chemotherapy, with many capacity issues, an annual budget of under two million kina, and a plan to make it a centre of excellence before any satellite radiotherapy is built. IAEA DIRAC's public data, in an entry last updated in 2024, lists two cobalt-60 teletherapy units, one remote afterloading brachytherapy unit, one CT scanner, one simulator and one X-ray therapy unit. The coordinates are an approximate Lae city point.",
    programs: ["Cobalt-60 external beam radiotherapy", "Brachytherapy", "Chemotherapy and direction of chemotherapy in regional and provincial hospitals", "Hospital-based cancer registry (planned under the 2015 policy)"],
    institutions: ["png-national-department-of-health", "iaea"],
    technologies: ["cobalt-60-teletherapy"],
    cancers: ["cervical", "breast-cancer", "oral-cavity-cancer"],
    links: [
      { label: "National Department of Health: National Cancer Control Policy 2015, sections 1.2, 3.2.6 and 3.2.9 (PDF)", url: NCCP_2015 },
      { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
    ] }),

  i({ id: "port-moresby-general-hospital", name: "Port Moresby General Hospital", aka: ["PMGH"],
    city: "Port Moresby", country: "PG", lat: -9.47, lng: 147.15, institutionType: "hospital",
    tldr: "Papua New Guinea's national referral hospital. It has a cancer ward giving chemotherapy without radiotherapy, the country's only domestic histopathology service in 2015, and a dedicated childhood cancer service whose overseas partnership helped develop a childhood cancer registry.",
    summary: "The 2015 National Cancer Control Policy describes Port Moresby General Hospital as the national referral hospital, with a cancer ward providing chemotherapy and outpatient services but no radiotherapy, the place where major specialised cancer surgery is done, and the only domestic hospital providing histopathology, where results often take months. The policy planned a hospital-based cancer registry there and in Lae, and considered a future second cancer centre with linear accelerators at the hospital. A 2025 report in the Journal of Global Health describes a dedicated childhood cancer service at the hospital and a long partnership with the International Society of Paediatric Oncology Oceania that helped develop a childhood cancer registry, training and research. The coordinates are an approximate Port Moresby city point.",
    programs: ["Cancer ward: chemotherapy and outpatient care", "Histopathology", "Childhood cancer service and registry", "Major specialised cancer surgery"],
    institutions: ["png-national-department-of-health"],
    cancers: ["childhood-cancers"],
    keyPapers: ["paper-raj-childhood-cancer-png-jogh-2025"],
    links: [
      { label: "National Department of Health: National Cancer Control Policy 2015, sections 1.2, 3.1, 3.2.4 and 3.2.7 (PDF)", url: NCCP_2015 },
      doi("10.7189/jogh.15.03008", "Raj et al., building capacity to treat childhood cancer in Papua New Guinea (J Glob Health 2025)"),
    ] }),

  i({ id: "pssb-png", name: "Pharmaceutical Services Standards Branch, Papua New Guinea (PSSB)", aka: ["PSSB", "Pharmaceutical Services Standards Branch", "PNG medicines regulator"],
    city: "Port Moresby", country: "PG", lat: -9.43, lng: 147.19, institutionType: "government", website: PSSB,
    tldr: "The branch of Papua New Guinea's National Department of Health that regulates medicines under the Medicines and Cosmetics Act 1999: product registration, licensing and inspection, a medicines quality control laboratory and pharmacovigilance.",
    summary: "The National Department of Health's page says the Pharmaceutical Services Standards Branch administers the Medicines and Cosmetics Act 1999 and its 2002 regulations so that medicinal products and medical devices used in Papua New Guinea are safe, effective and of good quality. It registers medicinal products under the department's Guidelines for Medicines, licenses pharmacies, importers and wholesalers, runs a medicine quality control laboratory, provides the secretariat for the Pharmacy Board, the Pharmaceutical Advisory Board and the Medicines Evaluation Committee, keeps product specifications in the Medical and Dental Catalogue for public procurement, and reports adverse drug reactions to the Uppsala Monitoring Centre. Under section 10 of the Act, when the licensing authority (the departmental head) considers an imported product it must take into account whether the product is registered with the licensing authority of the exporting country. Papua New Guinea is not on WHO's list of regulators operating at maturity level 3 or 4 (August 2026). The coordinates are an approximate Port Moresby city point.",
    programs: ["Medicinal product registration", "Compliance, licensing and inspection", "Medicine Quality Control Laboratory", "Pharmacovigilance (reports to the Uppsala Monitoring Centre)", "Medical and Dental Catalogue specifications"],
    institutions: ["png-national-department-of-health"],
    links: [
      { label: "National Department of Health: Pharmaceutical Services Standards Branch", url: PSSB },
      { label: "Medicines and Cosmetics Act 1999 (PDF, National Department of Health)", url: MCA_1999 },
      { label: "WHO: list of regulatory authorities operating at maturity level 3 and 4 (August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-vallely-hpv-stat-png-lancetgh-2022", name: "Point-of-care HPV DNA testing of self-collected specimens and same-day thermal ablation for the early detection and treatment of cervical pre-cancer in women in Papua New Guinea (HPV-STAT)",
    journal: "The Lancet Global Health", year: 2022, doi: "10.1016/S2214-109X(22)00271-6", pmid: "35878625", authors: "Vallely AJB, Saville M, Badman SG, et al.", paperType: "real-world", participants: 4285,
    tldr: "In 4,285 women in Papua New Guinea who took their own vaginal sample for a point-of-care HPV test, 93% of those who tested positive were treated with thermal ablation the same day, and the strategy detected 85% of high-grade lesions.",
    summary: "HPV-STAT was a large single-arm intervention trial at two clinical sites in Papua New Guinea, from June 2018 to January 2020. Women aged 30 to 59 self-collected a vaginal specimen for point-of-care GeneXpert HPV testing; those who tested positive had a pelvic examination and same-day thermal ablation or referral. The authors call it the first real-world evaluation of a fully integrated self-collect, test and treat strategy for same-day cervical screening in a low- or middle-income country. Registered as ISRCTN13476702 and funded by Australia's National Health and Medical Research Council.",
    findings: ["4,285 women were recruited; 647 (15.1%) tested positive for one or more oncogenic HPV types.", "Sensitivity for high-grade squamous intraepithelial lesion or worse was 85.4% (95% CI 81.0 to 89.6), specificity 89.6%, positive predictive value 35.2% and negative predictive value 98.9%.", "602 of the HPV-positive women (93.0%) received same-day thermal ablation; 42 were referred for gynaecology review and 37 of them attended.", "Of 329 women seen at 3 months, 51 (15.5%) reported mild symptoms that had resolved; there were no serious adverse events."],
    whatItMeans: "A woman in Papua New Guinea can take her own sample, get the result and, if needed, be treated in a single visit.",
    caveats: ["Two clinics with an on-site consultant gynaecologist, chosen with health authorities; results at less well staffed sites may differ.", "Single-arm design, without a comparison group in the same trial."],
    cancers: ["cervical"], technologies: ["hpv-testing", "precancer-ablation"], links: [doi("10.1016/S2214-109X(22)00271-6", "DOI"), pubmed("35878625")] }),

  p({ id: "paper-nguyen-hpv-screen-treat-png-bmjgh-2022", name: "Towards the elimination of cervical cancer in low-income and lower-middle-income countries: modelled evaluation of the effectiveness and cost-effectiveness of point-of-care HPV self-collected screening and treatment in Papua New Guinea",
    journal: "BMJ Global Health", year: 2022, doi: "10.1136/bmjgh-2021-007380", pmid: "35241461", authors: "Nguyen DTN, Simms KT, Keane A, et al.", paperType: "methods",
    tldr: "A model calibrated to Papua New Guinea found self-collected HPV screen-and-treat more effective and more cost-effective than visual inspection with acetic acid, and estimated it could prevent 23,000 to 29,000 deaths over 50 years if scaled to 70% coverage from 2023.",
    summary: "The authors note that Papua New Guinea has a high burden of cervical cancer but no national cervical screening programme. They calibrated the Policy1-Cervix model to the country, compared 38 strategies of self-collected HPV screen-and-treat and visual inspection with acetic acid (VIA), and estimated effectiveness, cost-effectiveness and budget impact, assuming HPV testing cost US$18.",
    findings: ["Self-collected HPV screen-and-treat was more effective and more cost-effective than VIA; VIA screening was not effective or cost-effective.", "Twice or three times lifetime screening was cost-effective at half of GDP per capita, with an incremental cost-effectiveness ratio of US$460 to US$656 per life-year saved.", "If scale-up reached 70% coverage from 2023, it could prevent 33,000 to 42,000 cases and 23,000 to 29,000 deaths over the next 50 years."],
    whatItMeans: "It gives Papua New Guinea its own estimate of what a national HPV screen-and-treat programme could achieve and what it would cost.",
    caveats: ["A model: its outputs depend on assumed test performance, costs and coverage."],
    cancers: ["cervical"], technologies: ["hpv-testing"], links: [doi("10.1136/bmjgh-2021-007380", "DOI"), pubmed("35241461")] }),

  p({ id: "paper-kelwaip-oral-cancer-png-oooo-2020", name: "Oral cancer in Papua New Guinea: looking back and looking forward",
    journal: "Oral Surgery, Oral Medicine, Oral Pathology and Oral Radiology", year: 2020, doi: "10.1016/j.oooo.2020.06.010", pmid: "32665206", authors: "Kelwaip RA, Fose S, Siddiqui MS, et al.", paperType: "review",
    tldr: "A review of oral cancer in Papua New Guinea, where it has been identified for decades as the commonest cancer in men, with areca nut and betel quid, tobacco and alcohol as common risk factors and no measured national prevalence.",
    summary: "A literature review written after a Global Challenges Research Fund workshop on oral cancer in Port Moresby. It notes that oral cancer has for many decades been identified as the most common cancer in men in Papua New Guinea, but that GLOBOCAN figures are estimates extrapolated from surrounding countries, so the real prevalence is not known; that alcohol, tobacco and areca nut or betel quid are common risk factors with robust data linking them to oral cancer in the country; and that the National Health Plan 2011 to 2020 did not name oral health as a priority.",
    findings: ["Oral cancer has for decades been identified as the commonest cancer in men in Papua New Guinea.", "GLOBOCAN 2018 figures for the country were estimates extrapolated from surrounding countries, so true prevalence is unknown.", "Alcohol, tobacco and areca nut or betel quid are common risk factors, with robust local data linking them to oral cancer."],
    whatItMeans: "Oral cancer is one of Papua New Guinea's main cancers, and its main risk factors, betel quid, tobacco and alcohol, are ones prevention can target.",
    caveats: ["A narrative review and workshop report, not new data."],
    cancers: ["oral-cavity-cancer", "head-and-neck"], links: [doi("10.1016/j.oooo.2020.06.010", "DOI"), pubmed("32665206")] }),

  p({ id: "paper-raj-childhood-cancer-png-jogh-2025", name: "Building capacity to treat childhood cancer in Papua New Guinea: 'It's a multidisciplinary village'",
    journal: "Journal of Global Health", year: 2025, doi: "10.7189/jogh.15.03008", pmid: "39946562", authors: "Raj TAS, Harrison J, Wakefield CE, et al.", paperType: "observational",
    tldr: "Describes the childhood cancer service at Port Moresby General Hospital and its partnership with the International Society of Paediatric Oncology Oceania, which helped build a childhood cancer registry, training and a national oncology nurses association.",
    summary: "A report of an in-country visit to Port Moresby General Hospital's dedicated childhood cancer service, with a tailored childhood cancer workshop for health workers, registry implementation, clinical support and stakeholder engagement. The authors write that late presentation and limited diagnosis and treatment shape childhood cancer outcomes in Papua New Guinea, and that the hospital's long partnership with SIOP Oceania has supported a cancer registry, education, research and technical support.",
    findings: ["A national oncology nurses association was established for peer support and education.", "Palliative care was identified as an unmet need.", "Further collaboration on adapted treatment regimens and formal multidisciplinary meetings were planned."],
    whatItMeans: "Childhood cancer in Papua New Guinea is managed by a dedicated service at Port Moresby General Hospital, which is being built up with outside partners.",
    caveats: ["A descriptive report by the partners involved; it gives no survival figures."],
    cancers: ["childhood-cancers"], institutions: ["port-moresby-general-hospital"], links: [doi("10.7189/jogh.15.03008", "DOI"), pubmed("39946562")] }),

  p({ id: "paper-umo-breast-cancer-cost-png-jcpo-2023", name: "The direct medical cost of breast cancer management in a provincial hospital of Papua New Guinea: a cost of illness study of consecutive patients from 2017 to 2022",
    journal: "Journal of Cancer Policy", year: 2023, doi: "10.1016/j.jcpo.2023.100447", pmid: "37813161", authors: "Umo I, Kulai M, Umo P, James K, Ikasa R", paperType: "observational",
    tldr: "At Alotau Provincial Hospital, breast cancer care from 2017 to 2022 cost an average of K24,994.71 (US$7,248.47) per patient, 99.7% of it borne by the hospital, and 58.5% of patients had no surgery.",
    summary: "A bottom-up micro-costing study of patients with breast cancer at Alotau Provincial Hospital, Milne Bay, from January 2017 to August 2022, estimating direct medical costs from the patient's and the hospital's perspectives.",
    findings: ["Total cost was K1,624,656.14 (US$471,150.28), of which hospital costs were 99.7%.", "The average cost per patient was K24,994.71 (US$7,248.47).", "38 patients (58.5%) did not undergo any form of surgery."],
    whatItMeans: "In a public provincial hospital the cost of breast cancer care falls almost entirely on the hospital rather than the patient, and many women do not reach surgery.",
    caveats: ["One provincial hospital; costs at the national referral hospital or in Lae will differ.", "Direct medical costs only; travel and lost income are not counted."],
    cancers: ["breast-cancer"], links: [doi("10.1016/j.jcpo.2023.100447", "DOI"), pubmed("37813161")] }),
];

/** Records behind /countries/pg/ (wave 11). */
export const recordsPG: EntityInput[] = [...institutions, ...papers];
