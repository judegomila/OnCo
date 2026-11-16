import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Costa Rica: the public bodies, research agency and papers behind /countries/cr/ (wave 11) that the corpus did not hold.
 * Each was written from its own primary source, read raw on 11 November 2026: the Ministry of Health's Plan Nacional
 * para el Control del Cáncer 2024-2030 (PDF text, from the ICCP portal copy), the Ministry's December 2023 release on
 * the Registro Nacional de Tumores and its 2017 to 2022 incidence workbooks, Ministerial Resolution MS-5917-2024 on
 * medicine registration (PDF text), the CCSS Lista Oficial de Medicamentos page (Internet Archive copy of 18 September
 * 2024, because www.ccss.sa.cr did not answer), and the ClinicalTrials.gov record of NCT03180034. DOIs and PubMed ids were
 * resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the CCSS and ACIB-FUNIN, and each links the Ministry back; the papers are linked
 * through keyPapers. Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PLAN = "https://www.iccp-portal.org/sites/default/files/plans/plan_nacional_control_cancer-compressed_1.pdf";
const RNT_RELEASE = "https://www.ministeriodesalud.go.cr/index.php/prensa/60-noticias-2023/1739-salud-actualiza-datos-de-tumores-malignos-del-registro-nacional-de-tumores-en-pagina-web";
const RNT_INCIDENCE = "https://www.ministeriodesalud.go.cr/index.php/biblioteca-de-archivos-left/documentos-ministerio-de-salud/material-informativo/material-publicado/estadisticas-y-bases-de-datos/estadisticas-y-bases-de-datos-vigilancia-de-la-salud/estadistica-de-cancer-registro-nacional-tumores/incidencia/incidencia-2017-al-2022";
const MS_5917 = "https://www.ministeriodesalud.go.cr/index.php/biblioteca-de-archivos-left/documentos-ministerio-de-salud/ministerio-de-salud/legislacion-sanitaria/leyes-decretos-y-directrices/resoluciones-ministeriales/8483-ms-5917-2024-resolucion-ministerial-procedimiento-para-la-facilitacion-de-registros-sanitarios-de-medicamentos-que-cuentan-con-un-registro-sanitario-emitido-por-las-autoridades-reguladoras-que-son-parte-de-la-lista-de-autoridades-catalogadas-por-la-organi/file";
const CCSS_LOM = "https://web.archive.org/web/20240918044342/https://www.ccss.sa.cr/lom";
const PAHO_PLAN = "https://www.paho.org/es/noticias/1-11-2024-ministerio-salud-costa-rica-presento-plan-nacional-para-control-cancer";
const ESCUDDO_CTGOV = "https://clinicaltrials.gov/study/NCT03180034";

const institutions: InstitutionInput[] = [
  i({ id: "costa-rica-ministry-of-health", name: "Ministerio de Salud, Costa Rica", aka: ["Ministry of Health, Costa Rica", "MINSA Costa Rica", "Ministerio de Salud de Costa Rica"],
    city: "San José", country: "CR", lat: 9.93, lng: -84.08, institutionType: "government", website: "https://www.ministeriodesalud.go.cr",
    tldr: "Costa Rica's health ministry. It keeps the national cancer registry, registers medicines, has the national cancer council attached to the minister's office, and published the national cancer control plan for 2024 to 2030.",
    summary: "The Ministerio de Salud is the steering body of Costa Rica's health sector. Its Dirección de Vigilancia de la Salud keeps the Registro Nacional de Tumores, created by Executive Decree 6584 of 6 December 1976 to supply cancer incidence by site, sex, age and area from public and private providers. Since 2013 the registry has run as a web notification system (SIRNAT) holding records from 1977. In December 2023 the Ministry published incidence data for 2017 to 2022 after clearing a backlog, with funds from a tobacco agreement with PAHO and two medical records staff from ACIB-FUNIN; figures from 2020 on are marked preliminary. The coordinates are an approximate San José city point.\n\nThe Ministry's Dirección de Regulación de Productos de Interés Sanitario registers medicines under the Central American technical regulation RTCA 11.03.59:18. Resolution MS-5917-2024 of 24 October 2024 set a faster route for first registration of medicines already registered by a WHO-listed authority, noting a backlog of 999 registration files. The Ministry presented the Plan Nacional para el Control del Cáncer 2024-2030 in 2024, with technical advice from PAHO/WHO (PAHO reported the launch on 1 November 2024); the Consejo Nacional de Cáncer, attached to the minister's office by Executive Decree 33271, advises on cancer care across public and private institutions.",
    programs: ["Registro Nacional de Tumores (Decree 6584 of 1976)", "Plan Nacional para el Control del Cáncer 2024-2030", "Consejo Nacional de Cáncer", "Medicine registration (Dirección de Regulación de Productos de Interés Sanitario)", "Facilitated registration for medicines approved by WHO-listed authorities (MS-5917-2024)"],
    institutions: ["ccss-costa-rica", "acib-funin-costa-rica", "who", "iarc", "iaea"],
    cancers: ["cervical", "breast-cancer", "gastric", "colorectal"],
    links: [
      { label: "Plan Nacional para el Control del Cáncer 2024-2030 (PDF, ICCP portal copy)", url: PLAN },
      { label: "Ministerio de Salud: update of Registro Nacional de Tumores data (15 December 2023)", url: RNT_RELEASE },
      { label: "Registro Nacional de Tumores: incidence 2017 to 2022 (workbooks)", url: RNT_INCIDENCE },
      { label: "Resolution MS-5917-2024 on facilitated medicine registration (PDF)", url: MS_5917 },
      { label: "PAHO: Costa Rica presents its national cancer control plan (1 November 2024)", url: PAHO_PLAN },
    ] }),

  i({ id: "ccss-costa-rica", name: "Caja Costarricense de Seguro Social (CCSS)", aka: ["CCSS", "Costa Rican Social Security Fund", "la Caja"],
    city: "San José", country: "CR", lat: 9.935, lng: -84.075, institutionType: "government", website: "https://www.ccss.sa.cr",
    tldr: "Costa Rica's social security fund and its main public provider of health care, which diagnoses and treats most cancers in its national hospitals and buys medicines from its own official list.",
    summary: "The Caja Costarricense de Seguro Social runs Costa Rica's public health services. The national cancer plan of 2024 calls it the public provider of health services and describes three levels of care: 1,019 basic primary care teams (EBAIS), 104 health areas with regional and peripheral hospitals, and national and specialised hospitals. Prevention and early detection happen across the network, while diagnosis and treatment of cancer happen mainly in the national hospitals. It has run haemato-oncology departments in its national general hospitals and the Hospital Nacional de Niños under one model since 2009, a national oncology network, an institutional oncology council and a project to strengthen cancer care. In 2021, 4,296 people with cancer, 20.23% of those treated in its haemato-oncology departments, were seen by multidisciplinary teams. The coordinates are an approximate San José city point.\n\nThe CCSS buys medicines from its Lista Oficial de Medicamentos. The archived copy of 18 September 2024 lists 102 entries in group 41, antineoplastics and immunomodulators, including trastuzumab, trastuzumab emtansine, bevacizumab, rituximab, imatinib, osimertinib, palbociclib and lenalidomide, each restricted to named levels of care. Patients have also sought medicines through the constitutional chamber of the Supreme Court, which in 2014 began a partnership with the Cochrane Collaboration to bring medical expert evaluations into its decisions on such claims.",
    programs: ["Lista Oficial de Medicamentos", "Red Oncológica Nacional", "Haemato-oncology departments in national hospitals", "Plan de fortalecimiento de los servicios de radioterapia 2020-2025", "Cervical and breast screening in primary care"],
    institutions: ["costa-rica-ministry-of-health"],
    keyPapers: ["paper-loaiza-sala-iv-medicines-litigation-costa-rica-hhr-2018"],
    cancers: ["breast-cancer", "cervical", "gastric", "colorectal"],
    links: [
      { label: "Plan Nacional para el Control del Cáncer 2024-2030, section 5.2.2 (PDF)", url: PLAN },
      { label: "CCSS: Lista Oficial de Medicamentos (Internet Archive, 18 September 2024)", url: CCSS_LOM },
    ] }),

  i({ id: "acib-funin-costa-rica", name: "Agencia Costarricense de Investigaciones Biomédicas, Fundación INCIENSA (ACIB-FUNIN)", aka: ["ACIB-FUNIN", "ACIB", "Agencia Costarricense de Investigaciones Biomédicas", "Costa Rican Agency for Biomedical Research"],
    city: "Liberia", country: "CR", lat: 10.635, lng: -85.438, institutionType: "research-institute",
    tldr: "A Costa Rican research agency that has run the HPV vaccine trials in Guanacaste with the US National Cancer Institute, including the trial that found one dose of HPV vaccine as good as two.",
    summary: "The Agencia Costarricense de Investigaciones Biomédicas, linked with the Fundación INCIENSA, is the Costa Rican partner in the HPV vaccine studies run with the US National Cancer Institute's Division of Cancer Epidemiology and Genetics. ClinicalTrials.gov lists its site in Liberia, Guanacaste, for ESCUDDO (NCT03180034), the NCI-sponsored trial with the Gates Foundation as collaborator that randomised 20,330 girls aged 12 to 16 to one or two doses of a bivalent or nonavalent HPV vaccine and found one dose noninferior to two. Its researchers are authors of the Costa Rica Vaccine Trial of 7,466 women enrolled in 2004 and 2005, of PRIMAVERA in Guanacaste, and of PRISMA, a trial of single-dose vaccination in 4,925 women aged 18 to 30. Papers give its address as San José; the coordinates are an approximate point for Liberia, where the trials are run.\n\nIn 2023 it lent two medical records staff to the Ministry of Health to clear the backlog of the national cancer registry.",
    programs: ["Costa Rica HPV Vaccine Trial (CVT)", "ESCUDDO single-dose HPV vaccine trial", "PRIMAVERA immunobridging trial", "PRISMA single-dose trial in women aged 18 to 30"],
    institutions: ["nci", "gates-foundation", "costa-rica-ministry-of-health"],
    drugs: ["hpv-bivalent-vaccine", "gardasil-9"],
    keyPapers: ["paper-kreimer-escuddo-one-dose-hpv-nejm-2025", "paper-porras-costa-rica-vaccine-trial-11-years-lancet-oncol-2020", "paper-cortes-primavera-single-dose-hpv-lancet-infect-dis-2025"],
    cancers: ["cervical"],
    links: [
      { label: "ClinicalTrials.gov: ESCUDDO, NCT03180034 (site and sponsor)", url: ESCUDDO_CTGOV },
      doi("10.1056/NEJMoa2506765", "Kreimer et al., one HPV vaccine dose versus two (NEJM 2025)"),
      { label: "Ministerio de Salud: update of Registro Nacional de Tumores data (15 December 2023)", url: RNT_RELEASE },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-kreimer-escuddo-one-dose-hpv-nejm-2025", name: "Noninferiority of one HPV vaccine dose to two doses (ESCUDDO)",
    journal: "New England Journal of Medicine", year: 2025, doi: "10.1056/NEJMoa2506765", pmid: "41337735", authors: "Kreimer AR, Porras C, Liu D, Hildesheim A, et al.", paperType: "rct", participants: 20330,
    tldr: "In a trial of 20,330 girls aged 12 to 16 in Costa Rica, one dose of either the bivalent or the nonavalent HPV vaccine protected against HPV 16 and 18 infection as well as two doses.",
    summary: "ESCUDDO randomised girls aged 12 to 16, in a 1:1:1:1 ratio, to one or two doses of a bivalent or a nonavalent HPV vaccine. The primary end point was new HPV 16 or 18 infection from month 12 to month 60 persisting for at least 6 months, with a noninferiority margin of 1.25 infections per 100 participants. Vaccine effectiveness was estimated against 3,005 unvaccinated girls and women in a parallel survey. The trial was funded by the US National Cancer Institute and others; ClinicalTrials.gov lists its site at ACIB in Liberia, Guanacaste.",
    findings: ["20,330 participants were randomised and 3,005 unvaccinated participants enrolled in the survey.", "Rate difference between one and two doses: -0.13 infections per 100 participants for the bivalent vaccine (95% CI -0.45 to 0.15) and 0.21 for the nonavalent vaccine (95% CI -0.09 to 0.51); both noninferior (P<0.001).", "Vaccine effectiveness was at least 97% in each of the four groups.", "No safety concerns were identified."],
    whatItMeans: "One dose of HPV vaccine is enough to protect girls against the two types that cause most cervical cancers, so the same supply of vaccine can protect more girls.",
    caveats: ["The end point is persistent infection, not precancer or cancer.", "The primary end point counts infections from month 12 to month 60 after vaccination."],
    cancers: ["cervical"], drugs: ["hpv-bivalent-vaccine", "gardasil-9"], institutions: ["acib-funin-costa-rica", "nci"],
    links: [doi("10.1056/NEJMoa2506765", "DOI"), pubmed("41337735"), { label: "ClinicalTrials.gov NCT03180034", url: ESCUDDO_CTGOV }] }),

  p({ id: "paper-porras-costa-rica-vaccine-trial-11-years-lancet-oncol-2020", name: "Efficacy of the bivalent HPV vaccine against HPV 16/18-associated precancer: long-term follow-up results from the Costa Rica Vaccine Trial",
    journal: "Lancet Oncology", year: 2020, doi: "10.1016/S1470-2045(20)30524-6", pmid: "33271093", authors: "Porras C, Tsang SH, Herrero R, Guillén D, et al.", paperType: "rct", participants: 7466,
    tldr: "At the year 11 visit, none of 1,913 women given the bivalent HPV vaccine in Costa Rica had new HPV 16/18 precancer of the cervix, against 34 of 2,233 unvaccinated women.",
    summary: "The Costa Rica Vaccine Trial, publicly funded and begun before the HPV vaccines were licensed, randomised women aged 18 to 25 between June 2004 and December 2005 to three doses of the bivalent HPV 16/18 vaccine or a hepatitis A control vaccine, followed them for 4 years, and then followed the vaccinated group for 7 more years against a new unvaccinated control group. The primary outcome was HPV 16/18-associated CIN2 or worse.",
    findings: ["7,466 women were enrolled: 3,727 received the HPV vaccine and 3,739 the control vaccine.", "At year 11, efficacy against incident HPV 16/18-associated CIN2+ was 100% (95% CI 89.2 to 100): 34 of 2,233 unvaccinated women and none of 1,913 vaccinated women had CIN2+.", "Cumulative efficacy against HPV 16/18-associated CIN2+ over 11 years was 97.4% (95% CI 88.0 to 99.6).", "No serious adverse events were judged related to the vaccine."],
    whatItMeans: "Protection from the bivalent HPV vaccine against the precancers that lead to cervical cancer lasted more than a decade.",
    caveats: ["The control group was replaced after year 4, and the follow-up phase was open-label."],
    cancers: ["cervical"], drugs: ["hpv-bivalent-vaccine"], institutions: ["acib-funin-costa-rica", "nci"],
    links: [doi("10.1016/S1470-2045(20)30524-6", "DOI"), pubmed("33271093")] }),

  p({ id: "paper-cortes-primavera-single-dose-hpv-lancet-infect-dis-2025", name: "HPV 16 and 18 antibody concentrations after a single dose of bivalent HPV vaccine in girls aged 9 to 14 years compared with three doses of quadrivalent vaccine in women aged 18 to 25 years in Costa Rica (PRIMAVERA)",
    journal: "Lancet Infectious Diseases", year: 2025, doi: "10.1016/S1473-3099(25)00284-1", pmid: "40683285", authors: "Cortés B, Ocampo R, Porras C, Liu D, et al.", paperType: "translational", participants: 1240,
    tldr: "In Guanacaste, one dose of the bivalent HPV vaccine in 620 girls gave antibody levels non-inferior to three quadrivalent doses in women for HPV 18 but not HPV 16, though almost every girl had antibodies to both after three years.",
    summary: "A non-randomised, open-label immunobridging trial in Guanacaste Province (NCT03728881) that gave one dose of bivalent HPV vaccine to girls aged 9 to 14 and three doses of quadrivalent vaccine to women aged 18 to 25, and compared antibody concentrations at 36 months, to support a single-dose indication for the bivalent vaccine. Funded by the National Cancer Institute, Cancer Research UK and the Gates Foundation.",
    findings: ["620 girls and 620 women were enrolled between April and August 2019.", "At 36 months the HPV 16 antibody ratio was 0.50 (96% CI 0.44 to 0.57), not non-inferior; the HPV 18 ratio was 1.11 (96% CI 0.95 to 1.29), non-inferior.", "99.8% of girls were seropositive for HPV 16 and 98.9% for HPV 18."],
    whatItMeans: "Antibody levels alone did not meet the bar for changing the vaccine's label to one dose, which is why trials measuring protection directly, such as ESCUDDO, were needed.",
    caveats: ["Not randomised, and it measures antibodies rather than protection from infection."],
    cancers: ["cervical"], drugs: ["hpv-bivalent-vaccine"], institutions: ["acib-funin-costa-rica", "nci"],
    links: [doi("10.1016/S1473-3099(25)00284-1", "DOI"), pubmed("40683285")] }),

  p({ id: "paper-loaiza-sala-iv-medicines-litigation-costa-rica-hhr-2018", name: "Revisiting health rights litigation and access to medications in Costa Rica: preliminary evidence from the Cochrane Collaboration reform",
    journal: "Health and Human Rights", year: 2018, pmid: "30008554", authors: "Loaiza OR, Morales S, Norheim OF, Wilson BM", paperType: "observational",
    tldr: "In 2014 Costa Rica's constitutional court began a partnership with the Cochrane Collaboration to bring medical expert evaluations into its rulings on claims for medicines; afterwards claimants won more often, and fewer rulings granted experimental medicines.",
    summary: "Costa Rica's constitutional chamber of the Supreme Court, the Sala IV, built an expansive right to health that led to a large volume of litigation for medicines, criticised for placing the right above the finances of the state health system. In 2014 the court began a partnership with the Cochrane Collaboration to bring medical expert evaluations into its decisions on medicine claims. The authors reviewed all medicine claims from 2016, classified the successful ones by standard priority-setting criteria and compared them with 2008 rulings.",
    findings: ["An earlier study found more than 70% of favourable rulings were for low-priority medications.", "Under the reformed process the probability of winning a medication lawsuit increased significantly.", "The share of rulings granting experimental medicines declined and the share granting high-priority medicines increased."],
    whatItMeans: "In Costa Rica a patient refused a medicine by the public system can go to the constitutional court, and since a 2014 reform the court draws on medical expert evaluations in these cases.",
    caveats: ["The authors call their conclusion tentative and the gains in fairness minor.", "Not specific to cancer medicines."],
    institutions: ["ccss-costa-rica"],
    links: [pubmed("30008554"), { label: "PubMed Central full text", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6039739/" }] }),
];

/** Records behind /countries/cr/ (wave 11). */
export const recordsCR: EntityInput[] = [...institutions, ...papers];
