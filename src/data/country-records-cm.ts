import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Cameroon: the public bodies, hospitals and papers behind /countries/cm/ (wave 10) that the corpus did not hold. Each
 * was written from its own primary source, read raw on 11 November 2026: the Ministry of Public Health's National
 * Strategic Plan for Prevention and Cancer Control 2020 to 2024 (English edition, PDF text, ICCP portal), the Ministry's
 * own news pages (minsante.cm) on universal health coverage, the National Committee for the Fight against Cancer, the
 * cervical cancer elimination strategy, the planned Cameroonian Medicines Agency and Douala General Hospital, and the
 * papers' abstracts (and, where open access, full text) through Europe PMC. Every DOI was resolved through Europe PMC.
 *
 * Inbound links: the Ministry links every institution here; the Committee links the person and the plan's papers; the
 * hospitals link their own papers through keyPapers. Coordinates are approximate city or district points, not
 * building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PLAN = "https://www.iccp-portal.org/sites/default/files/plans/FINAL%20COPY%20OF%20PSNPLCa%20ENGLISH.pdf";
const MS = "https://minsante.cm/site/?q=fr/content";
const CSU_2023 = `${MS}/couverture-sant%C3%A9-universelle-plus-de-1052849-personnes-d%C3%A9j%C3%A0-enr%C3%B4l%C3%A9es-0`;
const CSU_2025 = `${MS}/le-ministre-de-la-sant%C3%A9-publique-%C3%A0-douala-entre-reconnaissance-du-personnel-suivi-des-grands`;
const CNLCA_2026 = `${MS}/comit%C3%A9-national-de-lutte-contre-le-cancer-cnlca-dr-zeh-kakanou-florence-prend-la-rel%C3%A8ve`;
const CCU_2025 = `${MS}/cancer-du-col-de-lut%C3%A9rus-le-cameroun-sur-la-voie-de-son-%C3%A9limination`;
const ACM_2025 = `${MS}/r%C3%A9gulation-pharmaceutique-lagence-camerounaise-de-m%C3%A9dicaments-acm-en-gestation`;
const HGD_2026 = `${MS}/h%C3%B4pital-g%C3%A9n%C3%A9ral-de-douala-un-p%C3%B4le-d%E2%80%99excellence-au-service-de-la-sant%C3%A9-des-camerounais`;

const institutions: InstitutionInput[] = [
  i({ id: "cameroon-ministry-of-public-health", name: "Ministry of Public Health, Cameroon (MINSANTE)", aka: ["MINSANTE", "Ministère de la Santé Publique du Cameroun", "MOH Cameroon"],
    city: "Yaoundé", country: "CM", lat: 3.87, lng: 11.52, institutionType: "government", website: "https://www.minsante.cm",
    tldr: "Cameroon's health ministry. It wrote the National Strategic Plan for Prevention and Cancer Control 2020 to 2024, runs universal health coverage (launched in April 2023, without cancer in its first basket of care), and holds the country's medicines regulation functions.",
    summary: "The Ministry of Public Health published the National Strategic Plan for Prevention and Cancer Control 2020 to 2024 in June 2020, drafted by the National Committee for the Fight against Cancer with technical and financial support from WHO. The plan aims to cut cancer morbidity and mortality by at least 10% by 2024, and is costed at 52,486,566,318 FCFA (about 90.4 million US dollars at the plan's June 2020 rate). It describes cancer treatment concentrated in the general hospitals of Yaoundé and Douala, one functioning public cobalt-60 radiotherapy unit, a Yaoundé population cancer registry interrupted since 2012, and a Ministry subsidy for cancer drugs, in place since 2005, that covers less than 10% of national needs. The coordinates on this record are an approximate Yaoundé city point.\n\nThe Ministry launched phase 1 of universal health coverage (Couverture Santé Universelle, CSU) on 12 April 2023 in the East region. Its basket of care covers vaccination, nutrition, free consultations for children under 5, pregnant women, HIV, tuberculosis and chronic kidney failure; in May 2025 the Minister reported more than 3.9 million people enrolled. Cancer care is not named in the basket.\n\nMedicines regulation sits inside the Ministry: its Department of Pharmacy, Medicines and Laboratories reported in March 2025 on the preparation of a separate Cameroonian Medicines Agency (Agence Camerounaise du Médicament), following the country's ratification of the African Medicines Agency treaty.",
    programs: ["National Strategic Plan for Prevention and Cancer Control 2020 to 2024", "Universal health coverage, phase 1 (from April 2023)", "National cervical cancer elimination strategy (validated July 2025)", "Partial subsidy of cancer drugs (since 2005)", "Paediatric oncology shared care network (from 2023)"],
    institutions: ["cnlc-cameroon", "dpml-cameroon", "yaounde-general-hospital", "douala-general-hospital", "mbingo-baptist-hospital", "chantal-biya-foundation-mother-child-centre", "cameroon-oncology-center", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "prostate"], related: ["global-oncology-access"],
    keyPapers: ["paper-saidu-cancer-medicines-barriers-cameroon-pgph-2026"],
    links: [
      { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024 (Ministry of Public Health, June 2020, PDF, ICCP portal)", url: PLAN },
      { label: "MINSANTE: universal health coverage, more than 1,052,849 people enrolled (press briefing of 4 October 2023)", url: CSU_2023 },
      { label: "MINSANTE: the Minister in Douala, two years of universal health coverage (2 May 2025)", url: CSU_2025 },
      { label: "MINSANTE: pharmaceutical regulation, the Cameroonian Medicines Agency in preparation (13 March 2025)", url: ACM_2025 },
    ] }),

  i({ id: "cnlc-cameroon", name: "National Committee for the Fight against Cancer, Cameroon (CNLCa)", aka: ["Comité National de Lutte contre le Cancer", "CNLC", "CNLCa", "NACFAC"],
    city: "Yaoundé", country: "CM", lat: 3.866, lng: 11.517, institutionType: "government",
    tldr: "The Ministry of Public Health's cancer control body. It drafted the 2020 to 2024 national cancer plan and the 2025 cervical cancer elimination strategy, and runs awareness and screening campaigns.",
    summary: "The National Committee for the Fight against Cancer (Comité National de Lutte contre le Cancer, called NACFAC in the English edition of the national plan) was reorganised by Prime Ministerial Decision No. 017/PM of 6 March 2020, which gives it responsibility for cancer control policy, prevention, early diagnosis, treatment and palliative care, data collection, research and resource mobilisation. The plan dates the national cancer control strategy to 1990, reorganised as the Committee in 2002; elsewhere it gives 1992 for the Committee's creation. The coordinates are an approximate Yaoundé city point.\n\nThe Committee led the 2020 to 2024 national plan, which describes it as short of material and financial resources and plans to buy it office equipment and improve its internet line. On 16 July 2025 its national strategy to eliminate cervical cancer was validated at the Ministry, with 2030 targets of 90% HPV vaccination coverage, 70% of women screened, and 90% of precancerous lesions and 90% of invasive cancers treated, and an aim to cut incidence from 33.1 to 17 per 100,000 women. On 12 February 2026 Dr Florence Zeh Kakanou took over as Permanent Secretary from Professor Blaise Nkegoum; the Ministry's Secretary General asked for mobile mammography and ultrasound in screening campaigns, a screening protocol for breast, cervical and prostate cancer in all hospitals, accreditation of hospitals for cancer care and a follow-up plan for radiotherapy equipment.",
    programs: ["National Strategic Plan for Prevention and Cancer Control 2020 to 2024", "National cervical cancer elimination strategy (2025 to 2030)", "Pink October and cancer awareness campaigns", "Paediatric oncology shared care network (with partners)"],
    institutions: ["cameroon-ministry-of-public-health", "mbingo-baptist-hospital", "chantal-biya-foundation-mother-child-centre", "who"],
    people: ["florence-zeh-kakanou"], cancers: ["cervical", "breast-cancer", "prostate", "childhood-cancers"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-afungchwi-paediatric-oncology-shared-care-cameroon-jcpo-2026", "paper-woks-cervical-screening-disparities-cameroon-ijeh-2023", "paper-levy-3t-cervical-screening-dschang-cammed-2020"],
    links: [
      { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 2.3 and 5 (PDF)", url: PLAN },
      { label: "MINSANTE: cervical cancer, Cameroon on the road to elimination (19 July 2025)", url: CCU_2025 },
      { label: "MINSANTE: CNLCa, Dr Zeh Kakanou Florence takes over (12 February 2026)", url: CNLCA_2026 },
    ] }),

  i({ id: "dpml-cameroon", name: "Department of Pharmacy, Medicines and Laboratories, Cameroon (DPML)", aka: ["Direction de la Pharmacie, du Médicament et des Laboratoires", "DPML"],
    city: "Yaoundé", country: "CM", lat: 3.868, lng: 11.519, institutionType: "government",
    tldr: "The Ministry of Public Health department for pharmacy, medicines and laboratories, whose director reported in March 2025 on preparing a separate Cameroonian Medicines Agency. Cameroon is not on WHO's list of regulators at maturity level 3 or 4.",
    summary: "Cameroon has no autonomous medicines agency. Medicines regulation is carried out within the Ministry of Public Health. The Ministry's March 2025 report on pharmaceutical regulation brought together this Department, the Inspectorate General of Pharmaceutical Services and Laboratories, the national quality control laboratory (LANACOME) and the national essential medicines supply centre (CENAME), and referred to the missions of a national pharmaceutical regulatory authority (Autorité Nationale de Réglementation Pharmaceutique) in a report by the Department of Operational Health Research. The coordinates are an approximate Yaoundé city point.\n\nAt a meeting on 12 March 2025 the Department's director reported that, after Cameroon ratified the African Union treaty on the African Medicines Agency, a road map and a draft text creating a Cameroonian Medicines Agency (Agence Camerounaise du Médicament) had been prepared, with a sustainability study to follow. The same meeting reported ten applications for clinical trial authorisation in 2024, two of them in progress, on subjects including malaria, cancers, tuberculosis and hepatitis, and 577 pharmaceutical batches received by LANACOME. WHO's list of regulators operating at maturity level 3 or 4, updated August 2026, does not include Cameroon. A 2026 study interviewing 57 people across the chemotherapy supply chain named weak regulatory systems, underfunded regulatory work and high prices as reasons substandard cancer medicines circulate.",
    programs: ["Pharmaceutical regulation", "Preparation of the Cameroonian Medicines Agency (ACM)"],
    institutions: ["cameroon-ministry-of-public-health"],
    keyPapers: ["paper-saidu-cancer-medicines-barriers-cameroon-pgph-2026"],
    links: [
      { label: "MINSANTE: pharmaceutical regulation, the Cameroonian Medicines Agency in preparation (13 March 2025)", url: ACM_2025 },
      { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
      doi("10.1371/journal.pgph.0005370", "Saidu et al., barriers to accessing high-quality cancer medicines in Cameroon (PLOS Glob Public Health 2026)"),
    ] }),

  i({ id: "yaounde-general-hospital", name: "Yaoundé General Hospital", aka: ["Hôpital Général de Yaoundé", "HGY", "YGH"],
    city: "Yaoundé", country: "CM", lat: 3.89, lng: 11.53, institutionType: "hospital",
    tldr: "A tertiary public hospital in Yaoundé with a medical oncology department that received more than 800 new patients a year in the 2020 national plan; its radiotherapy has been closed since 2012.",
    summary: "Yaoundé General Hospital is one of the two tertiary hospitals, with Douala General Hospital, that the Ministry of Public Health's 2020 to 2024 cancer plan describes as having cancer services able to treat almost all tumours. The plan dates its chemotherapy service to 11 June 1993 and records that its medical oncology department received more than 800 new patients a year, that only about half started chemotherapy, and that courses rose from 3,061 in 2015 to over 4,000 in 2017, prepared at the bedside by a nurse without specific protective measures. Its radiotherapy department has been closed since 2012 because its radioactive source was exhausted, and the country's only nuclear medicine department, housed there, closed in early 2019. The plan says Yaoundé's cancer registry, interrupted since 2012, should be reactivated. The coordinates are an approximate district point.",
    programs: ["Medical oncology", "Chemotherapy (since 1993)"],
    institutions: ["cameroon-ministry-of-public-health"], cancers: ["breast-cancer", "cervical"],
    links: [{ label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 1.4 and 2.5 (PDF)", url: PLAN }] }),

  i({ id: "douala-general-hospital", name: "Douala General Hospital", aka: ["Hôpital Général de Douala", "HGD", "DGH"],
    city: "Douala", country: "CM", lat: 4.06, lng: 9.75, institutionType: "hospital",
    tldr: "A first-category public hospital in Douala that holds Cameroon's public radiotherapy, a cobalt-60 unit. The Ministry reported 1,232 new radiotherapy consultations and 3,468 chemotherapy courses in April 2026.",
    summary: "Douala General Hospital is one of the two tertiary hospitals the 2020 to 2024 national cancer plan describes as able to treat almost all tumours, and the plan records its single functioning public radiotherapy service, a cobalt-60 unit giving two-dimensional treatment, overused and with waits of up to three months. A 2026 cost study by the private Cameroon Oncology Center describes a cobalt-60 teletherapy unit at Douala General Hospital as the country's one other radiotherapy unit. The coordinates are an approximate Douala city point.\n\nThe Ministry of Public Health's April 2026 profile of the hospital lists 320 beds, more than 715 staff and, for oncology and radiotherapy, 1,232 new radiotherapy consultations, 3,468 chemotherapy courses and 1,683 new oncology consultations, without saying over what period. In May 2025 the Minister inspected building work on an extension of the radiotherapy department, a future nuclear medicine unit and an onco-haematology building reported as 87% complete.",
    programs: ["Radiotherapy (cobalt-60)", "Medical oncology and chemotherapy", "Radiotherapy extension and nuclear medicine unit (under construction in 2025)"],
    institutions: ["cameroon-ministry-of-public-health"], cancers: ["breast-cancer", "cervical", "prostate"],
    keyPapers: ["paper-mobit-radiotherapy-cost-cameroon-oncology-center-radiatoncol-2026"],
    links: [
      { label: "MINSANTE: Douala General Hospital (11 April 2026)", url: HGD_2026 },
      { label: "MINSANTE: the Minister in Douala, building work at Douala General Hospital (2 May 2025)", url: CSU_2025 },
      { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, section 2.5 (PDF)", url: PLAN },
    ] }),

  i({ id: "mbingo-baptist-hospital", name: "Mbingo Baptist Hospital", aka: ["MBH", "Mbingo Baptist Hospital, Cameroon Baptist Convention Health Services"],
    city: "Mbingo", country: "CM", lat: 6.15, lng: 10.35, institutionType: "hospital",
    tldr: "A rural faith-based hospital of the Cameroon Baptist Convention Health Services in the North-West region. It sees about 1,000 new cancer cases a year, runs a childhood cancer programme and women's cancer screening, and is building a radiotherapy department.",
    summary: "Mbingo Baptist Hospital, run by the Cameroon Baptist Convention Health Services, is a 278-bed rural hospital in the North-West region and a postgraduate training site through the Baptist Institute of Health Sciences. Its staff write that cancer care began in 2003 with a childhood cancer programme supported by World Child Cancer, that its Women's Health Program for breast and cervical screening began in 2007, a pathology laboratory in 2010 and adult medical oncology in 2017, and that it now sees about 1,000 new cancer cases a year, most often breast, prostate and cervical cancer in adults and Burkitt lymphoma in children. Patients needing radiotherapy were referred to Douala; the hospital has described building a bunker and installing a linear accelerator. The 2020 to 2024 national plan lists it among nine facilities giving chemotherapy (since 2006), and in 2023 Cameroon's paediatric oncology shared care network designated it one of two hub centres. The coordinates are an approximate point in the North-West region.",
    programs: ["Childhood cancer programme (since 2003)", "Women's Health Program, breast and cervical screening (since 2007)", "Adult medical oncology (since 2017)", "Radiotherapy department (in development)", "Paediatric Oncology Networked Database registry"],
    institutions: ["cameroon-ministry-of-public-health", "cnlc-cameroon"], cancers: ["breast-cancer", "cervical", "prostate", "burkitt-lymphoma", "childhood-cancers"],
    keyPapers: ["paper-akundoh-mbingo-radiotherapy-tipsro-2024", "paper-afungchwi-hospital-cancer-registry-northwest-cameroon-jtp-2021", "paper-hesseling-burkitt-lymphoma-934-cameroon-plosone-2024"],
    links: [
      doi("10.1016/j.tipsro.2024.100293", "Akundoh Tontu et al., developing a modern radiotherapy department in a rural hospital in Cameroon (Tech Innov Patient Support Radiat Oncol 2024)"),
      { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, table 5 (PDF)", url: PLAN },
      { label: "UICC: Cameroon Baptist Convention Health Services (member page)", url: "https://www.uicc.org/membership/cameroon-baptist-convention-health-services-cbchs" },
    ] }),

  i({ id: "chantal-biya-foundation-mother-child-centre", name: "Mother and Child Centre of the Chantal Biya Foundation", aka: ["Centre Mère et Enfant de la Fondation Chantal Biya", "CME-FCB", "Mother and Child Centre, Yaoundé"],
    city: "Yaoundé", country: "CM", lat: 3.86, lng: 11.51, institutionType: "hospital",
    tldr: "A children's hospital in Yaoundé whose paediatric oncology service recorded 150 new childhood cancers in 2018. It is one of the two hub centres of Cameroon's paediatric oncology shared care network.",
    summary: "The 2020 to 2024 national cancer plan records that the paediatric oncology service of the Mother and Child Centre of the Chantal Biya Foundation in Yaoundé recorded 150 new cases of cancer in 2018, against about 900 expected each year nationally, and notes that many children never reach Yaoundé because of poverty, distance or missed diagnosis. The plan lists the centre among the facilities giving chemotherapy since 2000. When Cameroon set up a national paediatric oncology shared care network in 2023 under WHO's Global Initiative for Childhood Cancer, the centre and Mbingo Baptist Hospital were designated the two hub centres with full oncology services. The coordinates are an approximate Yaoundé city point.",
    programs: ["Paediatric oncology", "Hub centre, paediatric oncology shared care network (from 2023)"],
    institutions: ["cameroon-ministry-of-public-health", "cnlc-cameroon"], cancers: ["childhood-cancers", "burkitt-lymphoma"],
    keyPapers: ["paper-afungchwi-paediatric-oncology-shared-care-cameroon-jcpo-2026"],
    links: [
      { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, section 2.1 and table 5 (PDF)", url: PLAN },
      doi("10.1016/j.jcpo.2026.100780", "Afungchwi et al., a national shared care network for paediatric oncology in Cameroon (J Cancer Policy 2026)"),
    ] }),

  i({ id: "cameroon-oncology-center", name: "Cameroon Oncology Center (COC)", aka: ["COC Douala"],
    city: "Douala", country: "CM", lat: 4.05, lng: 9.7, institutionType: "cancer-center",
    tldr: "A private cancer centre in Douala with a linear accelerator, treating patients since 2019. Its own study put the operating cost of a course of radiotherapy at about 2,106 US dollars a patient in 2021.",
    summary: "The Cameroon Oncology Center is a privately owned cancer centre in Douala that began clinical operations in 2019 and had treated more than 1,000 patients on its single medical linear accelerator by the time of its 2026 cost study. That study, written by the centre's staff, put the operating cost of radiotherapy in 2021 at about 2,106 US dollars (1.32 million FCFA) per patient, or 3,651 US dollars with the equipment and building cost spread over 12 years, and describes the centre's machine and a cobalt-60 unit at Douala General Hospital as Cameroon's two megavoltage radiotherapy machines. The 2020 to 2024 national plan describes private three-dimensional radiotherapy near Douala as limited in its reach by high cost. The coordinates are an approximate Douala city point.",
    programs: ["Radiotherapy (linear accelerator, since 2019)"],
    institutions: ["douala-general-hospital"],
    keyPapers: ["paper-mobit-radiotherapy-cost-cameroon-oncology-center-radiatoncol-2026"],
    links: [doi("10.1186/s13014-026-02813-0", "Mobit et al., the cost of providing high-quality radiotherapy services: the Cameroon Oncology Center (Radiat Oncol 2026)")] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-saidu-cancer-medicines-barriers-cameroon-pgph-2026", name: "Barriers to good-quality cancer medicines in Cameroon, as regulators and frontline staff see them",
    journal: "PLOS Global Public Health", year: 2026, doi: "10.1371/journal.pgph.0005370", pmid: "41576006", authors: "Saidu Y, Makia MC, Frambo A, et al.", paperType: "observational", participants: 57,
    tldr: "Interviews with 57 people across Cameroon's chemotherapy supply chain found weak regulation, underfunded regulatory work and high prices encouraging substandard cancer medicines and treatment.",
    summary: "Published as \"Barriers to accessing high-quality cancer medicines in Cameroon. A qualitative study of the views and practices of regulators and frontline healthcare providers\". A cross-sectional qualitative study combining a document review with interviews of 57 stakeholders working in regulation, procurement, quality control and use of chemotherapy.",
    findings: [
      "Weak regulatory systems, inadequate funding for regulatory activities and a lack of core competencies among regulatory staff affected the quality of chemotherapy medicines.",
      "The high cost of cancer medicines affected access to quality products and the care given to patients who could not afford high-priced products.",
      "With no point-of-care testing tools, these weaknesses appeared to encourage substandard medicines and the use of substandard therapies or protocols.",
    ],
    whatItMeans: "Cancer medicines in Cameroon are often paid for by families, and the people who regulate and use them describe a market where cheaper products of uncertain quality fill the gap.",
    caveats: ["Qualitative; it does not measure how many products are substandard."],
    institutions: ["dpml-cameroon", "cameroon-ministry-of-public-health"],
    links: [doi("10.1371/journal.pgph.0005370", "PLOS Glob Public Health 2026"), pubmed("41576006")] }),

  p({ id: "paper-afungchwi-paediatric-oncology-shared-care-cameroon-jcpo-2026", name: "Setting up Cameroon's national shared care network for children with cancer",
    journal: "Journal of Cancer Policy", year: 2026, doi: "10.1016/j.jcpo.2026.100780", pmid: "42480902", authors: "Afungchwi GM, Pondy-Ongotsoyi A, Waindim Y, et al.", paperType: "observational",
    tldr: "Cameroon launched a paediatric oncology shared care network in 2023 with two hub hospitals and eight shared-care centres; none of the ten had radiotherapy or immunohistochemistry, and five paediatric oncologists were identified.",
    summary: "Published as \"Establishing a national shared care network for paediatric oncology in Cameroon: Development process, baseline findings and early lessons\". A baseline assessment with the SIOP Global Mapping Survey in ten hospitals across six regions, validated with the Ministry of Public Health and the National Committee for the Fight against Cancer, informed the design of the network launched in 2023 under WHO's Global Initiative for Childhood Cancer.",
    findings: [
      "Mbingo Baptist Hospital and the Mother and Child Centre of the Chantal Biya Foundation were designated hub centres with full oncology services; eight others give basic chemotherapy and diagnostics.",
      "All ten facilities had X-ray and ultrasound; CT and paediatric surgery were available only at the hubs; none had immunohistochemistry or radiotherapy.",
      "Forty-nine healthcare workers were identified, including five paediatric oncologists and thirty-five trained nurses; psychosocial and rehabilitation services existed in three centres.",
    ],
    whatItMeans: "Children with cancer in Cameroon are now meant to be treated close to home where possible and referred to one of two hubs; diagnosis and radiotherapy remain the gaps.",
    caveats: ["Written by people who built the network; outcomes for children are not yet reported."],
    institutions: ["mbingo-baptist-hospital", "chantal-biya-foundation-mother-child-centre", "cnlc-cameroon"], cancers: ["childhood-cancers"],
    links: [doi("10.1016/j.jcpo.2026.100780", "J Cancer Policy 2026"), pubmed("42480902")] }),

  p({ id: "paper-afungchwi-hospital-cancer-registry-northwest-cameroon-jtp-2021", name: "A hospital-based childhood cancer registry in North-West Cameroon, 2004 to 2015",
    journal: "Journal of Tropical Pediatrics", year: 2021, doi: "10.1093/tropej/fmaa038", pmid: "33020840", authors: "Afungchwi GM, Kruger M, Wharin PD, et al.", paperType: "observational", participants: 1029,
    tldr: "The Paediatric Oncology Networked Database at Banso and Mbingo Baptist hospitals recorded 1,029 cancers in children aged 0 to 15 over 2004 to 2015, most often lymphomas.",
    summary: "Published as \"The Evolution of a Hospital-Based Cancer Registry in Northwest Cameroon from 2004 to 2015\". Cancer registration was set up in 2008 at Banso Baptist Hospital and Mbingo Baptist Hospital using the Pediatric Oncology Networked Database (POND); the paper analyses its data for children aged 0 to 15.",
    findings: [
      "1,029 malignancies were recorded in children aged 0 to 15 over 2004 to 2015, with a male to female ratio of 1.4 to 1 and a median age at diagnosis of 7.22 years.",
      "The commonest were lymphomas, then nephroblastoma, retinoblastoma, rhabdomyosarcoma and Kaposi sarcoma.",
      "Burkitt lymphoma cases were fewer in 2010 to 2015 than in 2004 to 2009, while retinoblastoma and nephroblastoma rose.",
    ],
    whatItMeans: "In the absence of a working population-based registry, hospital registries like this are among the few direct counts of childhood cancer in Cameroon.",
    caveats: ["Hospital-based: it counts children who reached two hospitals, not all children in the region."],
    institutions: ["mbingo-baptist-hospital"], cancers: ["childhood-cancers", "burkitt-lymphoma"],
    links: [doi("10.1093/tropej/fmaa038", "J Trop Pediatr 2021"), pubmed("33020840")] }),

  p({ id: "paper-hesseling-burkitt-lymphoma-934-cameroon-plosone-2024", name: "Burkitt lymphoma in 934 children in Cameroon: age, sex, delay and one-year survival",
    journal: "PLOS ONE", year: 2024, doi: "10.1371/journal.pone.0299777", pmid: "38466670", authors: "Hesseling PB, Afungchwi GM, Njodzeka BW, et al.", paperType: "observational", participants: 934,
    tldr: "Of 934 children with Burkitt lymphoma treated with cyclophosphamide and intrathecal methotrexate in Cameroon, 53% were alive at one year; most had stage III disease and the median delay to diagnosis was 31 days.",
    summary: "Published as \"Burkitt lymphoma: The effect of age, sex and delay to diagnosis on treatment completion and outcome of treatment in 934 Patients in Cameroon\". Records of 934 children diagnosed with Burkitt lymphoma from 2004 to 2015 were taken from the Paediatric Oncology Networked Database registry.",
    findings: [
      "The median delay from first symptoms to diagnosis was 31 days; 71.5% of children had St Jude stage III disease and 16.2% stage IV.",
      "Overall one-year survival was 53.45%: 77.1% for stage I, 67.9% for stage II, 55.1% for stage III and 32.4% for stage IV.",
      "Survival did not differ significantly by sex or age group.",
    ],
    whatItMeans: "Burkitt lymphoma can be cured with simple chemotherapy, but in Cameroon it is usually found late; survival fell with each stage at diagnosis, while age and sex made no significant difference.",
    caveats: ["One-year survival only.", "Hospital registry data from 2004 to 2015."],
    institutions: ["mbingo-baptist-hospital"], cancers: ["burkitt-lymphoma", "childhood-cancers"],
    links: [doi("10.1371/journal.pone.0299777", "PLOS ONE 2024"), pubmed("38466670")] }),

  p({ id: "paper-mobit-radiotherapy-cost-cameroon-oncology-center-radiatoncol-2026", name: "What radiotherapy costs to deliver in Cameroon: the Cameroon Oncology Center",
    journal: "Radiation Oncology", year: 2026, doi: "10.1186/s13014-026-02813-0", pmid: "42231461", authors: "Mobit P, Ade N, Njeh CF, et al.", paperType: "methods", participants: 215,
    tldr: "A private Douala centre with one linear accelerator estimated its operating cost at about 2,106 US dollars per radiotherapy patient in 2021, or 3,651 US dollars including equipment and building.",
    summary: "Published as \"The cost of providing high-quality radiotherapy services in a resource-limited setting: a case study of the Cameroon Oncology Center\". The authors estimated operating costs over calendar year 2021 from the 215 patients treated that year at the privately owned centre, which began clinical operations in 2019 and had treated more than 1,000 patients on its single linear accelerator.",
    findings: [
      "The average operating cost per patient was about 2,106 US dollars (1.32 million FCFA), including palliative and curative courses.",
      "Labour (41.1%), linear accelerator parts and service (17.7%) and power (14.8%) were the largest operating costs.",
      "With capital costs amortised over 12 years, the total was about 3,651 US dollars (2.2 million FCFA) per patient.",
    ],
    whatItMeans: "A course of radiotherapy in Cameroon costs the provider far more than most families can pay, which is why the national plan calls private radiotherapy out of reach for most patients.",
    caveats: ["One private centre, one year; written by the centre's staff.", "Costs to the provider, not prices charged to patients."],
    institutions: ["cameroon-oncology-center", "douala-general-hospital"],
    links: [doi("10.1186/s13014-026-02813-0", "Radiat Oncol 2026"), pubmed("42231461")] }),

  p({ id: "paper-akundoh-mbingo-radiotherapy-tipsro-2024", name: "Building a radiotherapy department in a rural Cameroonian hospital: Mbingo",
    journal: "Technical Innovations & Patient Support in Radiation Oncology", year: 2024, doi: "10.1016/j.tipsro.2024.100293", pmid: "39640209", authors: "Akundoh Tontu N, Cheung WWY, Jones M, et al.", paperType: "methods",
    tldr: "A faith-based hospital in North-West Cameroon describes raising funds, training staff and building a bunker to install a linear accelerator, at a time when the country's two radiotherapy facilities were both in Douala.",
    summary: "Published as \"Developing a modern radiotherapy department in a rural hospital in Cameroon: The Mbingo experience\". The authors, from Mbingo Baptist Hospital and partners, describe engagement with international bodies and volunteers for fund raising, local training of radiation oncologists, dosimetrists, radiation therapists and medical physicists, and the construction of a bunker and installation of a linear accelerator.",
    findings: [
      "The paper's introduction states that Cameroon, with about 28 million people, had two radiotherapy facilities, both in Douala: a cobalt unit in a state hospital and a linear accelerator in a private centre, and no brachytherapy.",
      "Mbingo Baptist Hospital sees about 1,000 new cancer cases a year; patients needing radiotherapy had been referred to Douala.",
      "The project combined international fund raising, volunteer expertise and local workforce training.",
    ],
    whatItMeans: "Outside Douala, radiotherapy in Cameroon depended on projects such as this one; the paper describes the work, not results for patients.",
    caveats: ["A description of a project by its team; it does not report treatment numbers."],
    institutions: ["mbingo-baptist-hospital"],
    links: [doi("10.1016/j.tipsro.2024.100293", "Tech Innov Patient Support Radiat Oncol 2024"), pubmed("39640209")] }),

  p({ id: "paper-levy-3t-cervical-screening-dschang-cammed-2020", name: "HPV self-sampling with test, triage and treat for cervical screening in Dschang, Cameroon",
    journal: "Cancer Medicine", year: 2020, doi: "10.1002/cam4.3355", pmid: "32757469", authors: "Levy J, de Preux M, Kenfack B, et al.", paperType: "observational", participants: 840,
    tldr: "In Dschang, 840 women aged 30 to 49 took their own HPV sample, tested on the spot; 19.8% were HPV positive and most of those needing treatment were treated at a single visit.",
    summary: "Published as \"Implementing the 3T-approach for cervical cancer screening in Cameroon: Preliminary results on program performance\". After a sensitisation campaign in Dschang, women aged 30 to 49 were invited to screening by HPV self-sampling analysed with the point-of-care Xpert HPV assay, followed by visual inspection (VIA/VILI) triage and thermal ablation where needed, and key performance indicators were defined.",
    findings: [
      "840 women took part, mean age 39.4 years; the screening rate was 8.4% of the target at seven months against a 12-month target of 20%.",
      "19.8% were HPV positive; all were referred to VIA/VILI and all referred for thermal ablation complied.",
      "79.8% were treated at a single visit from diagnosis; follow-up was 96.4% at one month and 70.6% at six months.",
    ],
    whatItMeans: "HPV self-sampling with same-day testing and treatment, the approach WHO recommends, can work in a Cameroonian district; the hard part is reaching enough women.",
    caveats: ["One district, early results.", "Run by a research programme, not the national health system."],
    cancers: ["cervical"],
    links: [doi("10.1002/cam4.3355", "Cancer Med 2020"), pubmed("32757469")] }),

  p({ id: "paper-woks-cervical-screening-disparities-cameroon-ijeh-2023", name: "Why cervical screening reaches so few women in Cameroon: a scoping review",
    journal: "International Journal for Equity in Health", year: 2023, doi: "10.1186/s12939-023-01942-2", pmid: "37592286", authors: "Woks NIE, Anwi MM, Kefiye TB, et al.", paperType: "review",
    tldr: "A review of 20 studies on cervical screening in Cameroon, where its authors say only 3 to 5% of eligible women have been screened, found no national training curriculum and little information reaching women.",
    summary: "Published as \"Disparities in cervical cancer screening programs in Cameroon: a scoping review of facilitators and barriers to implementation and uptake of screening\". The authors searched six databases for 2012 to 2022 and included 20 articles on cervical screening programmes in Cameroon, analysed with WHO's health system building blocks.",
    findings: [
      "The authors state that only 3 to 5% of eligible women in Cameroon have been screened and that there is no effective national cervical cancer prevention programme.",
      "Cross-cutting barriers were the lack of a national training curriculum and harmonised screen-and-treat algorithm, and women's lack of information about screening.",
      "Low or no-cost screening in some programmes and point-of-care HPV DNA testing were facilitators; few studies came from the North, Adamawa, East and South regions.",
    ],
    whatItMeans: "Before the 2025 elimination strategy, cervical screening in Cameroon was a patchwork of projects, mostly in the west and in cities.",
    caveats: ["A scoping review of published studies; it maps programmes rather than measuring coverage."],
    cancers: ["cervical"],
    links: [doi("10.1186/s12939-023-01942-2", "Int J Equity Health 2023"), pubmed("37592286")] }),
];

/** Records behind /countries/cm/ (wave 10). */
export const recordsCM: EntityInput[] = [...institutions, ...papers];
