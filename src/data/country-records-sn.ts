import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Senegal: the public bodies, hospital and papers behind /countries/sn/ (wave 11) that the corpus did not hold. Each was
 * written from its own primary source, read raw on 11 November 2026: the Ministry of Health's site (live site under
 * maintenance, so the Internet Archive copy of 31 December 2025 was read), the SEN-CSU agency's site (its page text is
 * built by script, so it was read from the site's own script bundle), the ARP regulator's "about" and regulatory
 * functions pages, IAEA DIRAC's public equipment data, and the papers' abstracts through Europe PMC, which resolved
 * every DOI. The figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links SEN-CSU, ARP and Dalal Jamm hospital, and each links the Ministry back; the papers
 * are linked through keyPapers. Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MSHP_ARCHIVE = "https://web.archive.org/web/20251231195126/https://www.sante.gouv.sn/";
const MSHP_DGAS = "https://web.archive.org/web/2025/https://www.sante.gouv.sn/Actualites/laction-sociale-transf%C3%A9r%C3%A9-au-minist%C3%A8re-de-la-famille-de-laction-sociale-et-des";
const SEN_CSU = "https://www.agencecmu.sn/";
const ARP_ABOUT = "https://www.arp.sn/a-propos";
const ARP_FUNCTIONS = "https://www.arp.sn/fonctions-reglementaires";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/sen-2020.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "senegal-ministry-of-health", name: "Ministère de la Santé et de l'Hygiène publique, Senegal", aka: ["MSHP", "Ministry of Health and Public Hygiene, Senegal", "Ministère de la Santé et de l'Action sociale", "MSAS", "Ministry of Health Senegal"],
    city: "Dakar", country: "SN", lat: 14.69, lng: -17.44, institutionType: "government", website: "https://www.sante.gouv.sn",
    tldr: "Senegal's health ministry, the Ministry of Health and Public Hygiene. After a government reshuffle on 6 September 2025, social action moved from it to another ministry. It oversees the public hospitals, the health coverage agency and the medicines regulator.",
    summary: "The Ministère de la Santé et de l'Hygiène publique runs Senegal's public health system. It was earlier the Ministère de la Santé et de l'Action sociale. The ministry's own news release says the Direction générale de l'Action sociale passed to the Ministry of Family, Social Action and Solidarity following the reshuffle of 6 September 2025, at a handover on 15 September 2025 between the health minister, Dr Ibrahima Sy, and the minister for the family, Maïmouna Dieye. The live ministry site was under maintenance when OnCo read it on 11 November 2026, so the Internet Archive copy of 31 December 2025 was used. The coordinates are an approximate Dakar city point.\n\nWHO's 2020 cancer country profile for Senegal records an operational national cancer control plan and integrated NCD plan in 2019, cancer management guidelines, a breast cancer screening programme and opportunistic cervical screening by visual inspection. The bodies on OnCo's Senegal page that work alongside it include the health coverage agency SEN-CSU, the medicines regulator ARP, and Dalal Jamm University Hospital, where radiotherapy and Senegal's first autologous stem cell transplant are based.",
    programs: ["Public hospital network", "National cancer control plan (operational in 2019, per WHO)", "HPV vaccination of 9-year-old girls (national since 2018)", "WHO Global Initiative for Childhood Cancer, CureAll (launched 2021)"],
    institutions: ["sen-csu-senegal", "arp-senegal", "dalal-jamm-hospital", "who", "iaea"],
    cancers: ["cervical", "breast-cancer", "hcc"],
    keyPapers: ["paper-mallon-dakar-childhood-cancer-registry-ejcpo-2025", "paper-casey-hpv-introduction-senegal-vaccine-2022", "paper-diop-medical-oncology-senegal-ecancer-2019", "paper-ramirez-mena-sen-b-hcc-surveillance-lgh-2024"],
    links: [
      { label: "Ministry of Health and Public Hygiene (Internet Archive copy, 31 December 2025)", url: MSHP_ARCHIVE },
      { label: "Ministry: social action transferred to the Ministry of Family (15 September 2025, Internet Archive)", url: MSHP_DGAS },
      { label: "WHO: cancer country profile 2020, Senegal (PDF)", url: WHO_PROFILE },
    ] }),

  i({ id: "sen-csu-senegal", name: "Agence de la Couverture Sanitaire Universelle, Senegal (SEN-CSU)", aka: ["SEN-CSU", "Sen-CSU", "Agence de la Couverture Maladie Universelle", "ACMU", "Agence CMU", "Universal Health Coverage Agency, Senegal"],
    city: "Dakar", country: "SN", lat: 14.7, lng: -17.45, institutionType: "government", website: SEN_CSU,
    tldr: "Senegal's universal health coverage agency. It runs community health insurance through local mutual health schemes and free-care schemes for children under five, caesarean sections, dialysis and older people.",
    summary: "The agency's own site gives its history: a 2015 decree created the Agence de la Couverture Maladie Universelle (ACMU), a 2019 national health and social development plan ran to 2028, a 2023 to 2027 strategic plan and decrees on coverage of care were adopted in 2023, and SEN-CSU was created in 2024. Its services listed on the site, read on 11 November 2026, are health insurance through communal mutual health schemes (mutuelles de santé), including cover for Koranic schools (daaras), and free-care schemes: free care for children aged 0 to 5, free caesarean section, dialysis, Plan Sésame for older people, cover for beneficiaries of the national family security grants programme (PNBSF) and the Carte d'égalité des chances. OnCo did not find cancer care among the schemes the site lists; the free chemotherapy policy is described on the country page from a peer-reviewed source. The coordinates are an approximate Dakar city point.\n\nTwo studies question how well the subsidised schemes protect the poorest. A 2019 household survey in three regions found community health insurance raised primary care use and financial protection for non-poor members but not for the poor, and a 2019 to 2020 study in rural Niakhar found free enrolment of PNBSF households had limited effects on use of care and on catastrophic spending.",
    programs: ["Community-based health insurance (mutuelles de santé)", "Free care for children aged 0 to 5", "Free caesarean section", "Dialysis", "Plan Sésame (older people)", "PNBSF beneficiaries", "Carte d'égalité des chances"],
    institutions: ["senegal-ministry-of-health"],
    links: [
      { label: "SEN-CSU: agency site", url: SEN_CSU },
      { label: "Ly et al., community health insurance and the poor in Senegal (BMJ Open 2022)", url: "https://doi.org/10.1136/bmjopen-2022-063035" },
      { label: "Bousmah et al., free health insurance for the poor in Senegal (BMJ Glob Health 2022)", url: "https://doi.org/10.1136/bmjgh-2022-009977" },
    ] }),

  i({ id: "arp-senegal", name: "Agence sénégalaise de Réglementation pharmaceutique (ARP)", aka: ["ARP", "ARP Sénégal", "Senegalese Pharmaceutical Regulatory Agency"],
    city: "Dakar", country: "SN", lat: 14.7, lng: -17.46, institutionType: "government", website: "https://www.arp.sn",
    tldr: "Senegal's medicines regulator, created by decree in April 2022. It registers medicines, licenses pharmaceutical establishments, oversees clinical trials and runs pharmacovigilance. WHO lists it at maturity level 3 for medicines and vaccines, announced in 2024.",
    summary: "Decree 2022-824 of 7 April 2022 created the Agence sénégalaise de Réglementation pharmaceutique and set its rules of organisation. Its stated mission is to carry out the regulatory functions of national pharmaceutical policy, control the pharmaceutical sector and enforce the laws on pharmacy, medicines and other health products, pharmaceutical establishments, medical biology laboratories, testing and calibration laboratories and clinical trials. Its director general is Dr Aïssatou Sougou. The coordinates are an approximate Dakar city point.\n\nThe agency sets out its work against WHO's Global Benchmarking Tool: marketing authorisation, vigilance, market surveillance and control, licensing of establishments, inspection, laboratory testing, clinical trial oversight, lot release for vaccines, and approval and oversight of blood products. WHO's list of regulators at maturity levels 3 and 4, dated August 2026, gives ARP maturity level 3 for medicines and vaccines (non-producing), announced in 2024. Its own site, read on 11 November 2026, carries the banner that Senegal is the first country of French-speaking Africa to reach maturity level 3; that ranking is ARP's claim, not WHO's. Adverse effects can be reported to it through the Med Safety app or its online form.",
    programs: ["Marketing authorisation of medicines", "Pharmacovigilance (Med Safety)", "Clinical trial oversight", "Licensing and inspection of pharmaceutical establishments", "Laboratory quality control"],
    institutions: ["senegal-ministry-of-health", "who"],
    links: [
      { label: "ARP: about the agency, decree 2022-824 and missions", url: ARP_ABOUT },
      { label: "ARP: regulatory functions", url: ARP_FUNCTIONS },
      { label: "WHO: regulatory authorities at maturity levels 3 and 4 (PDF, August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
    ] }),

  i({ id: "dalal-jamm-hospital", name: "Dalal Jamm University Hospital, Senegal", aka: ["Dalal Jamm", "Hôpital Dalal Jamm", "Dalal Jamm University Hospital", "Dalal Jamm Hospital"],
    city: "Dakar", country: "SN", lat: 14.77, lng: -17.4, institutionType: "hospital",
    tldr: "A university hospital in Guédiawaye, in the Dakar region, with a radiotherapy department. IAEA's directory lists two linear accelerators and brachytherapy there, and Senegal's first autologous stem cell transplant was performed there in February 2025.",
    summary: "IAEA DIRAC's public equipment data, read on 11 November 2026, lists Dalal Jamm Hospital in Dakar with two megavoltage machines, both linear accelerators, and brachytherapy; the entry was last updated in 2019, so it may not reflect the current equipment. The coordinates are an approximate point in the Dakar region.\n\nIn February 2025 the hospital's haematology team performed what they report as the first autologous haematopoietic stem cell transplant in Senegal, for a 51-year-old man with high-risk multiple myeloma, using stem cells stored at 4°C for 24 hours without cryopreservation and high-dose melphalan; he was discharged on day 17 and was in complete remission at five months. The authors describe it as part of a national initiative for Senegal's first transplant programme and say local cryopreservation and molecular diagnostics are needed for allogeneic transplants.",
    programs: ["Radiotherapy (linear accelerators and brachytherapy)", "Autologous stem cell transplant (first in Senegal, February 2025)"],
    institutions: ["senegal-ministry-of-health", "iaea"],
    cancers: ["multiple-myeloma", "cervical", "breast-cancer"],
    links: [
      { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
      { label: "Niang et al., first autologous stem cell transplant in Senegal (ecancermedicalscience 2026)", url: "https://doi.org/10.3332/ecancer.2026.2100" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-mallon-dakar-childhood-cancer-registry-ejcpo-2025", name: "The path towards a population-based childhood cancer registry in the region of Dakar in Senegal: a feasibility study of the Franco-African Paediatric Oncology Group (GFAOP)",
    journal: "EJC Paediatric Oncology", year: 2025, doi: "10.1016/j.ejcped.2025.100420", pmid: "41368026", authors: "Mallon B, Dial C, Akonde FB, et al.", paperType: "observational",
    tldr: "The hospital-based childhood cancer registry at Le Dantec Hospital in Dakar recorded 568 cancers in children under 18 in 2017 to 2019, and a search of other hospitals found 283 more, so the authors argue for a population-based registry for the Dakar region.",
    summary: "A feasibility study of a population-based childhood cancer registry for the Dakar region. The paediatric oncology unit at Le Dantec Hospital keeps a hospital-based registry that collects patients from the whole of Senegal; the authors also searched other hospitals and departments that might diagnose or treat children with cancer, assessed completeness and described the patterns.",
    findings: ["From 2017 to 2019 the hospital-based registry recorded 568 cancers in children under 18, of whom 133 lived in the Dakar region.", "283 further cases were found in other sources, 149 of them without a recorded place of residence.", "The estimated overall incidence was 33 per million person-years, which the authors judge low."],
    whatItMeans: "Senegal has no population-based count of childhood cancer; this study shows that cases are missed when only one hospital unit records them.",
    caveats: ["The authors say political and financial support is needed to sustain such a registry."],
    cancers: ["childhood-cancers"], links: [doi("10.1016/j.ejcped.2025.100420", "DOI"), pubmed("41368026")] }),

  p({ id: "paper-diop-medical-oncology-senegal-ecancer-2019", name: "The state of medical oncology in Senegal",
    journal: "ecancermedicalscience", year: 2019, doi: "10.3332/ecancer.2019.941", pmid: "31552114", authors: "Diop M", paperType: "review",
    tldr: "In 2019 Senegal had one medical oncology specialist, at the Cancer Institute, with chemotherapy given at several public and private sites in Dakar by general practitioners and oncology surgeons.",
    summary: "A short account of medical oncology in Senegal and its needs: training for doctors and nurses, subsidy of anticancer drugs and their control by the national drug-control laboratory, and centralised management of anticancer drugs with a platform for secure storage, preparation and delivery.",
    findings: ["Senegal had only one medical oncology specialist, working at the Cancer Institute.", "Chemotherapy was given at several public and private sites in Dakar by general practitioners and oncology surgeons.", "The author called for a substantial subsidy of anticancer drugs, especially targeted treatments."],
    whatItMeans: "It describes the workforce gap that Senegal's later free chemotherapy policy and training efforts had to work within.",
    caveats: ["A single author's account from 2019; workforce numbers have probably changed since."],
    links: [doi("10.3332/ecancer.2019.941", "DOI"), pubmed("31552114")] }),

  p({ id: "paper-casey-hpv-introduction-senegal-vaccine-2022", name: "National introduction of HPV vaccination in Senegal: successes, challenges, and lessons learned",
    journal: "Vaccine", year: 2022, doi: "10.1016/j.vaccine.2021.08.042", pmid: "34593269", authors: "Casey RM, Adrien N, Badiane O, et al.", paperType: "observational",
    tldr: "Senegal introduced HPV vaccine nationwide in 2018 for 9-year-old girls through health facilities, schools and outreach, after school-based demonstration programmes from 2014 to 2016; a health worker strike, rumours and hesitancy held it back.",
    summary: "A review of Senegal's national HPV vaccine introduction, based on ten interviews with national stakeholders in 2019 and 2020 and a desk review of country documents, covering decision-making, planning and implementation.",
    findings: ["Because of the global HPV vaccine shortage, the introduction was limited to a single age cohort, 9-year-old girls, chosen to reach more girls while still in primary school.", "Routine delivery through health facilities, schools and community outreach was perceived as more cost-effective than a campaign.", "All informants said the health worker strike, rumours and vaccine hesitancy hurt the introduction."],
    whatItMeans: "It explains why Senegal vaccinates one age group of girls through routine services, and what slowed the start.",
    caveats: ["Interviews with national stakeholders; the authors call for assessments of coverage and costs."],
    cancers: ["cervical"], links: [doi("10.1016/j.vaccine.2021.08.042", "DOI"), pubmed("34593269")] }),

  p({ id: "paper-ramirez-mena-sen-b-hcc-surveillance-lgh-2024", name: "Hepatocellular carcinoma surveillance among people living with hepatitis B in Senegal (SEN-B): insights from a prospective cohort study",
    journal: "The Lancet Gastroenterology & Hepatology", year: 2024, doi: "10.1016/s2468-1253(24)00040-2", pmid: "38588691", authors: "Ramírez Mena A, Thiam M, Ka D, et al.", paperType: "observational", participants: 758,
    tldr: "In a cohort of people with hepatitis B in Dakar, six-monthly ultrasound screening for liver cancer was feasible: 93.0% kept optimal surveillance, falling to 77.8% after two years.",
    summary: "A prospective cohort of treatment-naive people with hepatitis B referred to two infectious diseases clinics at Fann University Hospital in Dakar between October 2019 and October 2022, offered abdominal ultrasound, elastography and clinical and virological assessment at entry and every six months.",
    findings: ["755 of 758 participants had at least one ultrasound; median age was 31 and 10.9% had a family history of liver cancer.", "Three liver cancers were found at entry and one more during 809.5 person-years of follow-up, an incidence of 1.24 per 1,000 person-years.", "702 of 755 (93.0%) had optimal surveillance, falling to 77.8% (42 of 54) after 24 months."],
    whatItMeans: "Liver cancer is the commonest cancer in Senegalese men and mostly follows hepatitis B; this shows regular ultrasound surveillance can be run in Dakar.",
    caveats: ["A research cohort with short follow-up (median 12 months), in the Dakar region only."],
    cancers: ["hcc"], links: [doi("10.1016/s2468-1253(24)00040-2", "DOI"), pubmed("38588691")] }),
];

/** Records behind /countries/sn/ (wave 11). */
export const recordsSN: EntityInput[] = [...institutions, ...papers];
