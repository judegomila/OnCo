import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Colombia: the institutions and paper behind /countries/co/ (wave 4) that the corpus did not hold. Spanish sources
 * were read in Spanish from the raw text of each PDF or page (pdftotext, or the HTML itself): the Cuenta de Alto
 * Costo's 2025 adult cancer report, its 2024 paediatric report and its 2014 to 2022 survival report; the laws as
 * published by the Secretaría del Senado (Leyes 1384 and 1388 de 2010, 1438 de 2011, 1751 and 1753 de 2015, 2026 de
 * 2020 and 2360 de 2024); the Ministry of Health's Resoluciones 2765 de 2025 (benefits paid from the capitation),
 * 1816 de 2026 (MIPRES) and 1233 de 2026 (the cancer plan); Decretos 677 de 1995, 1782 de 2014 and 433 de 2018 from
 * INVIMA's own legal compilation; and the price commission's Circulares 04 de 2016 and 22 de 2026. The Instituto
 * Nacional de Cancerología's own site answered 403 to every request, so its estimates are read from the institute's
 * paper in the Revista Colombiana de Cancerología and from the cancer plan that quotes them.
 *
 * Inbound links: the six institutions link to each other through `institutions`, and the paper is linked from the
 * Cali registry's `keyPapers`, so none depends on the country page for a link. The existing records for the
 * Instituto Nacional de Cancerología (`inc-colombia`), the Liga Colombiana Contra el Cáncer and Fundación Valle del
 * Lili are reused, not duplicated.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const CAC_2025 = "https://cuentadealtocosto.org/situacion-del-cancer-en-la-poblacion-adulta-atendida-en-el-sgsss-de-colombia-2025/";
const CAC_SURV = "https://cuentadealtocosto.org/informe-especial-resultados-de-supervivencia-global-en-las-personas-atendidas-en-el-marco-del-sistema-de-salud-colombiano-y-notificadas-a-la-cuenta-de-alto-costo-2014-2022/";
const CAC_PED = "https://cuentadealtocosto.org/situacion-del-cancer-en-la-poblacion-pediatrica-atendida-en-el-sgsss-de-colombia-2024/";
const CAC_ABOUT = "https://cuentadealtocosto.org/quienes-somos/";
const RES_2765 = "https://www.minsalud.gov.co/Normatividad_Nuevo/Resoluci%C3%B3n%20No%202765%20de%202025.pdf";
const RES_1816 = "https://consultorsalud.com/wp-content/uploads/2026/08/Resolucion-No-1816-de-2026.pdf";
const RES_1233 = "https://normograma.com/keralty/compilacion/docs/resolucion_minsaludps_1233_2026.htm";
const RES_2475 = "https://www.minsalud.gov.co/Normatividad_Nuevo/Resoluci%C3%B3n%202475%20de%202016.pdf";
const D677 = "https://normograma.invima.gov.co/normograma/compilacion/docs/decreto_0677_1995.htm";
const D1782 = "https://normograma.invima.gov.co/normograma/compilacion/docs/decreto_1782_2014.htm";
const D433 = "https://normograma.invima.gov.co/normograma/compilacion/docs/decreto_0433_2018.htm";
const INVIMA_2025 = "https://www.invima.gov.co/blog/sala-de-prensa-13/el-invima-activa-plan-de-contingencia-para-dar-celeridad-a-tramites-de-medicamentos-268";
const L1438_P2 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1438_2011_pr002.html";
const L1753_P1 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1753_2015_pr001.html";
const PARDO_2024 = "https://www.revistacancercol.org/index.php/cancer/article/view/1061/1045";

const institutions: InstitutionInput[] = [
  i({ id: "cuenta-de-alto-costo", name: "Cuenta de Alto Costo (Colombia)", aka: ["CAC", "Fondo Colombiano de Enfermedades de Alto Costo", "High Cost Account"],
    city: "Bogotá", country: "CO", lat: 4.69, lng: -74.056, institutionType: "consortium", website: "https://cuentadealtocosto.org",
    tldr: "A fund that Colombia's health insurers are required to join, created in 2007. Every insurer must report each person with cancer it covers once a year, and the fund audits those reports against clinical records and publishes a yearly report on cancer care across the insured population.",
    summary: "The Cuenta de Alto Costo describes itself as a body of the health system created by Decreto 2699 de 2007, which obliges the insurers (EPS) of both the contributory and subsidised regimes and the other entities obliged to compensate to join together to deal with high-cost diseases. It runs as a self-managed fund that offsets uneven concentrations of these patients between insurers, and it measures and ranks insurers and providers on health results.\n\nSince Resolución 0247 de 2014, every insurer, special and exception regime, prepaid plan and departmental health authority must report to it once a year every person with an in situ or invasive cancer it attended. For its 2025 report, covering care between 2 January 2024 and 1 January 2025, 74 entities reported cases; 806,503 records were audited against clinical records, and the cohort analysed held 759,390 prevalent cases of all ages. It counted 69,571 newly reported cases, 64,840 of them solid tumours (60,713 invasive), and 38,262 deaths from any cause in the cohort; the age-standardised rate of newly reported cases was 108.96 per 100,000. The median time from clinical suspicion to a histology result was 35 days and from diagnosis to the start of treatment 51 days.\n\nIts survival report for cases diagnosed in 2014 to 2022 gives five-year overall survival of 76.69% for breast cancer, 75.31% for prostate cancer, 69.64% for cervical cancer, 51.25% for colorectal cancer, 25.15% for stomach cancer and 15.85% for lung cancer, with lower figures in the subsidised regime than in the contributory one for every cancer reported. Its 2024 paediatric report counted 13,772 people under 18 with cancer attended in the period and 1,406 newly reported cases.\n\nThe figures from the three reports could not be re-read on 17 November 2026: the fund's report pages now ask the reader to sign in, and the Internet Archive holds only the sign-in page.\n\nThe coordinates are those its own site gives for its office at Carrera 45 No. 103-34, Bogotá.",
    programs: ["Annual mandatory cancer cohort (Resolución 0247 de 2014)", "Audit of insurer reports against clinical records", "Five-year survival reports", "Paediatric cancer report", "Ranking of insurers and providers", "Risk compensation between insurers"],
    cancers: ["breast-cancer", "prostate", "cervical", "colorectal", "gastric", "lung-cancer", "all-leukemia"],
    institutions: ["minsalud-colombia", "adres-colombia", "inc-colombia", "registro-poblacional-cancer-cali"],
    links: [
      { label: "Cuenta de Alto Costo: Situación del cáncer en la población adulta 2025 (Spanish)", url: CAC_2025 },
      { label: "Cuenta de Alto Costo: survival report 2014 to 2022 (Spanish)", url: CAC_SURV },
      { label: "Cuenta de Alto Costo: paediatric cancer report 2024 (Spanish)", url: CAC_PED },
      { label: "Cuenta de Alto Costo: who we are (Spanish)", url: CAC_ABOUT },
    ] }),

  i({ id: "invima", name: "Instituto Nacional de Vigilancia de Medicamentos y Alimentos (INVIMA)", aka: ["INVIMA", "Invima", "Colombian medicines regulator"],
    city: "Bogotá", country: "CO", lat: 4.711, lng: -74.072, institutionType: "government", website: "https://www.invima.gov.co",
    tldr: "Colombia's medicines regulator. A new medicine needs a pharmacological evaluation by its specialist committee before it can be registered; the rules set 180 working days for that step, or 30 when the medicine is already approved in two of eleven named reference countries.",
    summary: "INVIMA grants the sanitary registration (registro sanitario) that a medicine needs to be sold in Colombia. Under Decreto 677 de 1995 a new medicine needs a pharmacological evaluation, a judgement on its usefulness, suitability and safety, which is reserved to a specialist committee (the Comisión Revisora, now its Sala Especializada de Medicamentos). The decree gives that committee 180 working days, with the clock stopped while the applicant answers questions, or 30 working days when the medicine is registered in at least two reference countries and has not been rejected in any; the reference countries are the United States, Canada, Germany, Switzerland, France, England, Denmark, the Netherlands, Sweden, Japan and Norway. For biological medicines, Decreto 1782 de 2014 allows three routes, the full dossier, comparability and abbreviated comparability, holds them to the same standard, and gives INVIMA three months after a favourable pharmacological evaluation to decide on registration, which then lasts five years.\n\nSince Decreto 433 de 2018, an applicant for a new medicine also files a comparative dossier and its intended price, which INVIMA passes to the Instituto de Evaluación Tecnológica en Salud for a classification of therapeutic value in parallel; the result goes to the national price commission, and after 180 days without a final opinion the requirement is treated as met.\n\nIn March 2025 INVIMA adopted a six-month contingency plan (Resolución 2025010547) to clear more than 14,000 pending registrations and related procedures. In March 2026 the industry associations AFIDRO, FIFARMA and AmCham Colombia stated that 12,470 procedures were pending, that approval of new registrations had taken 29 months in 2025 against 22 in 2024, and that 45% of applications for new cancer molecules were rejected in 2025; those are the associations' figures, and INVIMA's own measured times were not found. The coordinates are a Bogotá centroid; its head office is at Carrera 10 No. 64-28.",
    programs: ["Sanitary registration of medicines", "Pharmacological evaluation of new medicines (Sala Especializada)", "Abbreviated route for medicines registered in two reference countries", "Three routes for biological medicines (Decreto 1782 de 2014)", "Contingency plan for pending registrations (2025)"],
    institutions: ["iets-colombia", "minsalud-colombia"],
    links: [
      { label: "Decreto 677 de 1995, articles 27 and 28 (INVIMA legal compilation, Spanish)", url: D677 },
      { label: "Decreto 1782 de 2014 (INVIMA legal compilation, Spanish)", url: D1782 },
      { label: "Decreto 433 de 2018 (INVIMA legal compilation, Spanish)", url: D433 },
      { label: "INVIMA: contingency plan for medicine procedures, 20 March 2025 (Spanish)", url: INVIMA_2025 },
      { label: "Consultorsalud: AFIDRO, AmCham and FIFARMA roadmap for INVIMA, 11 March 2026 (Spanish)", url: "https://consultorsalud.com/modernizacion-del-invima-afidro-amcham-fifarma/" },
    ] }),

  i({ id: "iets-colombia", name: "Instituto de Evaluación Tecnológica en Salud (IETS)", aka: ["IETS", "Colombian health technology assessment institute"],
    city: "Bogotá", country: "CO", lat: 4.711, lng: -74.072, institutionType: "research-institute", website: "https://iets.org.co",
    tldr: "Colombia's health technology assessment institute, a mixed public and private non-profit set up under a 2011 law. Its assessments inform what the public benefit plan covers, and since 2018 it classifies the therapeutic value of new medicines against the best treatment used in Colombia, for the price commission.",
    summary: "Article 92 of Ley 1438 de 2011 authorised the Ministry to create the Instituto de Evaluación Tecnológica en Salud as a mixed non-profit corporation, open to scientific societies and the Academia Nacional de Medicina, responsible for evidence-based assessment of health technologies and for guidelines and protocols, whose findings are a reference for defining benefit plans. The institute states that it was created in 2011 under that law, with public and private members, and is attached to the health sector.\n\nArticle 72 of Ley 1753 de 2015 made the IETS assessment of medicines chosen by the Ministry, and the price set from it, a requirement for registration. Decreto 433 de 2018 put this into practice for new medicines: the applicant files a comparative analysis of safety and efficacy against the comparators chosen for Colombia and its intended price, and the IETS classifies the medicine into one of six categories of therapeutic value, from significantly more effective than the comparator (category 1) to unclassifiable (category 6), and may add a cost-effectiveness and budget impact analysis; for orphan diseases only the classification and budget impact are done. The question and the result go to public consultation and are published, and the assessment goes to the national price commission.\n\nThe Ministry's resolution updating the benefits paid from the capitation for 2026 cites a budget impact study by the IETS as the basis for the one inclusion it names. OnCo did not find a published cost-effectiveness threshold for Colombia from the IETS. The coordinates are a Bogotá centroid.",
    programs: ["Health technology assessment for the benefit plan", "Therapeutic value classification of new medicines (Decreto 433 de 2018)", "Budget impact analyses", "Clinical practice guidelines"],
    terms: ["hta"], institutions: ["invima", "minsalud-colombia"],
    links: [
      { label: "IETS: about us (Spanish)", url: "https://iets.org.co/nosotros/sobre-nosotros/" },
      { label: "Ley 1438 de 2011, article 92 (Secretaría del Senado, Spanish)", url: L1438_P2 },
      { label: "Ley 1753 de 2015, article 72 (Secretaría del Senado, Spanish)", url: L1753_P1 },
      { label: "Decreto 433 de 2018 (INVIMA legal compilation, Spanish)", url: D433 },
    ] }),

  i({ id: "adres-colombia", name: "Administradora de los Recursos del Sistema General de Seguridad Social en Salud (ADRES)", aka: ["ADRES", "Colombian health system funds administrator"],
    city: "Bogotá", country: "CO", lat: 4.711, lng: -74.072, institutionType: "government", website: "https://www.adres.gov.co",
    tldr: "The public body that holds and pays out the money of Colombia's health system. It pays insurers a fixed amount per member each year and checks and pays claims for treatments that amount does not cover, such as medicines prescribed through the MIPRES system.",
    summary: "Article 66 of Ley 1753 de 2015 created a special national entity, attached to the Ministry of Health with its own legal personality and budget, to manage the resources of the General System of Social Security in Health in one place and control their flow; it operates as ADRES. The Ministry's Resolución 2765 de 2025 describes the capitation payment (Unidad de Pago por Capitación, UPC) as a per-person amount paid in advance to insurers through ADRES, and describes it as reaching coverage levels above 96%.\n\nFor technologies not funded by the capitation and not covered by the separate maximum budgets, and for some explicitly excluded technologies that a treating doctor may exceptionally prescribe, insurers claim from ADRES, which verifies, controls and pays those claims under Resolución 1816 de 2026; under article 73 of Ley 1753 de 2015, as amended by Ley 2294 de 2023, claims must be filed within 18 months of the service, the delivery of the technology or the patient's discharge. The coordinates are a Bogotá centroid.",
    programs: ["Payment of the capitation (UPC) to insurers", "Verification and payment of claims for technologies outside the capitation", "Health system funds management"],
    institutions: ["minsalud-colombia", "cuenta-de-alto-costo"],
    links: [
      { label: "Ley 1753 de 2015, articles 66 and 73 (Secretaría del Senado, Spanish)", url: L1753_P1 },
      { label: "Ministry of Health: Resolución 2765 de 2025, benefits paid from the capitation for 2026 (PDF, Spanish)", url: RES_2765 },
      { label: "Ministry of Health: Resolución 1816 de 2026 on MIPRES (copy hosted by Consultorsalud, PDF, Spanish)", url: RES_1816 },
      { label: "ADRES", url: "https://www.adres.gov.co" },
    ] }),

  i({ id: "minsalud-colombia", name: "Ministerio de Salud y Protección Social (Colombia)", aka: ["MinSalud", "Colombian Ministry of Health and Social Protection"],
    city: "Bogotá", country: "CO", lat: 4.711, lng: -74.072, institutionType: "government", website: "https://www.minsalud.gov.co",
    tldr: "Colombia's health ministry. It decides each year which services and medicines the insurers must fund from the per-member payment, runs the MIPRES prescription system for the rest, and adopted a ten-year cancer control plan for 2026 to 2035.",
    summary: "The Ministerio de Salud y Protección Social regulates the General System of Social Security in Health. By Resolución 2765 de 2025, dated 30 December 2025, it updated for 2026 the services and technologies that insurers must fund from the capitation (UPC), with annexes listing medicines, procedures and laboratory tests; it states that, under the statutory health law, the benefit plan must be updated in full every two years. Its Resolución 1816 de 2026, dated 6 August 2026, sets how doctors prescribe through the MIPRES tool technologies not funded by the capitation, the role of each hospital's Junta de Profesionales de la Salud and the time limits for supply.\n\nBy Resolución 1233 de 2026, dated 26 June 2026, it adopted the Plan Decenal para el Control del Cáncer 2026-2035, led with the Instituto Nacional de Cancerología, with evaluations in 2028, 2030 and 2035; the first plan, for 2012 to 2021, was adopted by Resolución 1383 de 2013. In 2016 it declared imatinib a matter of public interest (Resolución 2475 de 2016) and asked the price commission, of which it is part, to set a new price, which the commission did by Circular 04 de 2016 at 206.42 pesos per milligram. The coordinates are a Bogotá centroid.",
    programs: ["Benefits funded by the capitation (Resolución 2765 de 2025)", "MIPRES prescription of non-capitation technologies (Resolución 1816 de 2026)", "Plan Decenal para el Control del Cáncer 2026-2035", "Comisión Nacional de Precios de Medicamentos y Dispositivos Médicos (member)", "Screening rules of the health promotion pathway (Resolución 3280 de 2018)"],
    drugs: ["imatinib"], institutions: ["inc-colombia", "invima", "iets-colombia", "adres-colombia", "cuenta-de-alto-costo"],
    links: [
      { label: "Resolución 2765 de 2025 (PDF, Spanish)", url: RES_2765 },
      { label: "Resolución 1816 de 2026 on MIPRES (copy hosted by Consultorsalud, PDF, Spanish)", url: RES_1816 },
      { label: "Resolución 1233 de 2026, Plan Decenal para el Control del Cáncer 2026-2035 (Keralty legal compilation, Spanish)", url: RES_1233 },
      { label: "Resolución 2475 de 2016, imatinib (PDF, Spanish)", url: RES_2475 },
      { label: "Circular 04 de 2016 of the national price commission, Glivec (INVIMA legal compilation, Spanish)", url: "https://normograma.invima.gov.co/normograma/compilacion/docs/circular_cnpmd_0004_2016.htm" },
      { label: "Ministerio de Salud y Protección Social", url: "https://www.minsalud.gov.co" },
    ] }),

  i({ id: "registro-poblacional-cancer-cali", name: "Registro Poblacional de Cáncer de Cali", aka: ["RPCC", "Cali Cancer Registry", "Population Cancer Registry of Cali"],
    city: "Cali", country: "CO", lat: 3.452, lng: -76.532, institutionType: "research-institute", university: "Universidad del Valle",
    tldr: "The population-based cancer registry of Cali, operating since 1962. It is one of the four Colombian registries whose data the Instituto Nacional de Cancerología uses to estimate cancer for the whole country.",
    summary: "The Population Cancer Registry of Cali has operated since 1962. Its 2018 methods paper describes active searching of hospitals and public and private laboratories for new cancers in permanent residents of Cali, with mortality data from the municipal health secretariat; tumours are coded to ICD-O-3. It reports that 88.5% of registered cancers had morphological verification, cases known only from a death certificate were 0 to 3% depending on site, and its data had appeared in eleven volumes of Cancer Incidence in Five Continents; it has taken part in the CONCORD study and SURVCAN-3.\n\nThe Instituto Nacional de Cancerología's estimates for Colombia in 2017 to 2021 were built from the incidence data of four registries, Cali, Bucaramanga, Manizales and Pasto, as published in Cancer Incidence in Five Continents Volume XII for 2013 to 2017, combined with national death records; in that paper the Cali registry's histological verification was 86.5% in men and 89.1% in women. The registry's own website did not answer from OnCo's network, and the coordinates are a Cali centroid.",
    programs: ["Population-based cancer registration in Cali (since 1962)", "Five-year net survival analysis", "Contribution to Cancer Incidence in Five Continents"],
    institutions: ["inc-colombia", "cuenta-de-alto-costo", "fundacion-valle-del-lili"], keyPapers: ["paper-garcia-cali-cancer-registry-methods-2018"],
    links: [
      { label: "García et al., Cali cancer registry methods (Colomb Med 2018)", url: "https://doi.org/10.25100/cm.v49i1.3853" },
      { label: "Pardo-Ramos and Cendales-Duarte, incidence and mortality estimates for Colombia 2017-2021 (Rev Colomb Cancerol 2024, PDF, Spanish)", url: PARDO_2024 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-garcia-cali-cancer-registry-methods-2018", name: "Cali cancer registry methods",
    journal: "Colombia Médica", year: 2018, doi: "10.25100/cm.v49i1.3853", pmid: "29983471", authors: "García LS, Bravo LE, Collazos P, Ramírez O, Carrascal E, Nuñez M, Portilla N, Millan E", paperType: "methods",
    tldr: "How the population-based cancer registry of Cali, running since 1962, finds and codes every new cancer in the city's residents, and the quality measures that let its data appear in the international reference volumes.",
    summary: "The Population Cancer Registry of Cali (RPCC) has operated since 1962. New cancers in permanent residents of Cali are collected by active search in, and notification from, hospitals and public and private laboratories; the municipal health secretariat provides individual data on general and cancer mortality. Tumours are coded with ICD-O-3 and deaths with ICD-10; rates are age-standardised, trends are assessed with joinpoint regression and five-year net survival with the Pohar-Perme estimator.",
    findings: [
      "88.5% of registered cancers had morphological verification; unknown primary site was 5%, and death-certificate-only cases ranged from 0 to 3% by site.",
      "All deaths were certified by a physician and 94.2% of cancer deaths were correctly certified.",
      "Average loss to follow-up for survival analysis was 13.2%.",
    ],
    whatItMeans: "Cali's registry is one of the four whose data Colombia's national cancer institute uses to estimate cancer for the whole country, so the quality of its methods underpins the national figures.",
    caveats: ["It covers one city, not the country.", "This record summarises the abstract; the full methods were not reread for this page."],
    institutions: ["registro-poblacional-cancer-cali", "inc-colombia"],
    links: [{ label: "Colombia Médica 2018", url: "https://doi.org/10.25100/cm.v49i1.3853" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/29983471/" }] }),
];

/** Records behind /countries/co/ (wave 4). */
export const recordsCO: EntityInput[] = [...institutions, ...papers];
