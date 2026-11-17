import type { CompanyInput, EntityInput, InstitutionInput, PaperInput, TrialInput } from "@/lib/schema";

/**
 * Spain: the institutions, companies, trials and papers behind /countries/es/ that the corpus did not hold.
 * People are in src/data/people/country-es.ts. Every record carries its sources; DOIs were resolved through
 * PubMed (Europe PMC returned server errors on 3 November 2026) and the figures in `findings` are taken from the
 * indexed abstract. Registry ids were read from ClinicalTrials.gov API v2 the same day.
 *
 * Inbound links: each record here is linked from another record in the graph, not only from the country page.
 * redecan, aemps, isciii and ciberonc are linked from the papers and from each other; the two academic CAR-T trials
 * from their papers (and cart19-be-01 from varnimcabtagene-autoleucel in src/data/india.ts); gecp from the EURTAC
 * paper in src/data/papers-ideas-wave6.ts and pethema from its PEVOLAM trial in src/data/trials-entities-wave5.ts.
 */
const asOf = "2026-11-03";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type C = Omit<CompanyInput, "kind" | "asOf" | "companyType">;
const grp = ({ tags = [], ...x }: C): CompanyInput => ({ kind: "company", asOf, companyType: "cooperative-group", tags: ["cooperative-group", ...tags], ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
const ctgov = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

const institutions: InstitutionInput[] = [
  i({ id: "redecan", name: "Spanish Network of Cancer Registries (REDECAN)", aka: ["REDECAN", "Red Española de Registros de Cáncer"],
    city: "Spain (network of regional registries)", country: "ES", lat: 40.4, lng: -3.7, institutionType: "consortium", website: "https://redecan.org/es",
    tldr: "Spain's national cancer figures are estimates, not a count of every case. REDECAN is the network of regional registries that projects how many cancers Spain will see each year and measures how many people survive them.",
    summary: "REDECAN was created in November 2010, in its own words, to bring together all of Spain's population-based cancer registries and the Spanish childhood tumour registry (RETI) so that they could work in a coordinated way. Spain has no single national incidence count: the registries cover defined regions, and the national figures are estimates built from them. Its 2026 incidence report, published in January 2026, used the twelve consolidated registries covering all ages (Asturias, Gran Canaria and Tenerife, Castellón, the province of Salamanca, Euskadi, Girona, Granada, La Rioja, Mallorca, Murcia, Navarra and Tarragona) together with national mortality data from the Instituto Nacional de Estadística, and projected 301,884 new cancers for 2026, excluding non-melanoma skin cancer.\n\nIts third survival report, published on 3 December 2025, included 813,661 cancers in adults diagnosed from 2003 to 2017 in twelve registries covering 25% of the Spanish population; age-standardised five-year net survival for those diagnosed in 2013 to 2017 was 57.4% in men and 65.2% in women. The network also publishes estimates for haematological neoplasms and works with the Spanish childhood tumour registry.\n\nThe network's website gives no single registered seat; the coordinates on this record are a country centroid, not an address.",
    programs: ["Annual incidence estimates for Spain", "Population survival reports (2000-2007, 2002-2013, 2003-2017)", "Haematological neoplasm estimates", "Childhood cancer registration (with RETI)"],
    cancers: ["colorectal", "prostate", "lung-cancer"], keyPapers: ["paper-redecan-young-adults-ejc-2026"], institutions: ["isciii"],
    links: [
      { label: "REDECAN: Estimaciones de la incidencia del cáncer en España, 2026 (PDF)", url: "https://redecan.org/storage/documents/dc9dc273-8b61-475f-ae4f-88d447dc81fc.pdf" },
      { label: "REDECAN: Supervivencia de cáncer en población adulta en España, 2003-2017 (PDF)", url: "https://redecan.org/storage/documentation/5b3cde59-a541-45af-aab4-9c29152f1931.pdf" },
      { label: "REDECAN: antecedentes", url: "https://redecan.org/es/antecedentes" },
    ] }),

  i({ id: "aemps", name: "Spanish Agency of Medicines and Medical Devices (AEMPS)", aka: ["AEMPS", "Agencia Española de Medicamentos y Productos Sanitarios"],
    city: "Madrid", country: "ES", lat: 40.448, lng: -3.597, institutionType: "government", website: "https://www.aemps.gob.es",
    tldr: "Spain's medicines regulator. It authorises clinical trials and the medicines not approved centrally in Europe, lets doctors obtain unapproved medicines for individual patients, and in 2021 approved a CAR-T made by a Spanish public hospital.",
    summary: "The AEMPS is the state agency that authorises and supervises medicines and medical devices in Spain. Most new cancer medicines are authorised for the whole European Union by the European Commission after an opinion of the European Medicines Agency's CHMP, so for them the AEMPS's national role is to assign the national code, take part in the European assessment, and supervise use afterwards.\n\nIts own activity report for 2025, published on 2 June 2026, records 962 clinical trials of medicines authorised in humans, which it describes as the highest number in the European Union for another year, 1,354 human medicines authorised and 101,150 requests for foreign medicines received and assessed, 98% of them resolved. In January 2026 it reported that 378 of the 962 trials were in oncology, close to 40% of the total, and that phase I and I/II trials had risen from 156 (19% of those authorised) in 2015 to 244 (25%) in 2025.\n\nUnder Real Decreto 1015/2009 it authorises compassionate use of investigational medicines for individual patients, access to medicines authorised abroad but not in Spain, and sets the rules for off-label use. In February 2021 it authorised the Hospital Clínic CAR-T ARI-0001 under the hospital exemption for adults over 25 with relapsed or refractory acute lymphoblastic leukaemia. Under Real Decreto 415/2026 it hosts the new office for the evaluation of medicines in Spain's health technology assessment system.",
    programs: ["Clinical trial authorisation (REec registry)", "Medicines in special situations (RD 1015/2009)", "Therapeutic positioning reports (IPT, REvalMed SNS)", "Office for the evaluation of medicines (RD 415/2026)", "Hospital exemption for advanced therapies"],
    drugs: ["varnimcabtagene-autoleucel"], technologies: ["car-t"], keyPapers: ["paper-trias-hospital-exemption-ari-0001-bmt-2022"], institutions: ["hospital-clinic-barcelona"],
    links: [
      { label: "AEMPS: Memoria de Actividades 2025 announcement (2 June 2026)", url: "https://www.aemps.gob.es/informa/la-aemps-presenta-los-principales-hitos-de-2025-en-su-memoria-de-actividades/" },
      { label: "AEMPS: España consolida su liderazgo europeo en investigación clínica (12 January 2026)", url: "https://www.aemps.gob.es/informa/espana-consolida-su-liderazgo-europeo-en-investigacion-clinica/" },
      { label: "AEMPS: authorisation of ARI-0001 (10 February 2021)", url: "https://www.aemps.gob.es/informa/la-aemps-autoriza-el-car-t-ari-0001-del-hospital-clinic-para-pacientes-con-leucemia-linfoblastica-aguda/" },
      { label: "Real Decreto 1015/2009, medicines in special situations (BOE)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-12002" },
    ] }),

  i({ id: "isciii", name: "Instituto de Salud Carlos III (ISCIII)", aka: ["ISCIII", "Carlos III Health Institute"],
    city: "Madrid", country: "ES", lat: 40.478, lng: -3.708, institutionType: "government", website: "https://www.isciii.es",
    tldr: "Spain's public health research institute. It created the CIBER research networks, including the cancer network CIBERONC, and funds academic trials such as Barcelona's CAR-T studies.",
    summary: "The Instituto de Salud Carlos III is Spain's public biomedical and health research body. The CIBER consortium describes itself as a public research consortium created on the initiative of the ISCIII, dating from 2006, and it added cancer as a thematic area, CIBERONC, on 1 January 2017. The ISCIII is listed on ClinicalTrials.gov as a collaborator on CART19-BE-01, the trial behind the academic CAR-T ARI-0001, and is named first among the funders of CARTBCMA-HCB-01, the trial of the academic BCMA CAR-T ARI0002h.\n\nThe ISCIII's own website returned a maintenance page on 3 November 2026, so this record does not describe its budget, its centres or its funding calls; those are named as a gap on the Spain page. The site answered again on 17 November 2026, but its budget and funding calls were not read for this record.",
    programs: ["CIBER consortium (including CIBERONC)", "Health research funding (Acción Estratégica en Salud)"],
    institutions: ["ciberonc", "cnio"], trials: ["cart19-be-01", "cartbcma-hcb-01"],
    links: [
      { label: "CIBER: quiénes somos", url: "https://www.ciberisciii.es/quienes-somos" },
      ctgov("NCT03144583"),
      doi("10.1016/S1470-2045(23)00222-X", "CARTBCMA-HCB-01, Lancet Oncol 2023 (funding statement)"),
    ] }),

  i({ id: "ciberonc", name: "CIBERONC (Centro de Investigación Biomédica en Red de Cáncer)", aka: ["CIBERONC", "CIBER Cáncer", "Biomedical Research Networking Centre in Cancer"],
    city: "Madrid", country: "ES", lat: 40.478, lng: -3.708, institutionType: "consortium", website: "https://www.ciberonc.es",
    tldr: "Spain's national network of cancer research groups, set up in 2017 inside the CIBER consortium so that laboratory and hospital groups across the country work on shared programmes.",
    summary: "CIBERONC is the cancer thematic area of the CIBER consortium, the public research consortium created on the initiative of the Instituto de Salud Carlos III. CIBER's own history records that cancer was added as a new thematic area on 1 January 2017, through the Acción Estratégica en Salud 2013-2016 call. CIBERONC's site lists research programmes including breast and gynaecological cancers and molecular mechanisms of cancer, and working modules on liquid biopsy, experimental models, immuno-oncology and bioinformatics, with linked clinical groups. Its group directory is loaded by script and could not be read on 3 November 2026, so this record does not state how many groups it has. Authors of the CART19-BE-01 paper list CIBERONC affiliations at Hospital Clínic de Barcelona.",
    programs: ["Breast and gynaecological cancers", "Molecular mechanisms of cancer", "Liquid biopsy working module", "Experimental models working module", "Immuno-oncology working module", "Bioinformatics working module"],
    institutions: ["isciii", "hospital-clinic-barcelona"],
    links: [
      { label: "CIBERONC", url: "https://www.ciberonc.es/" },
      { label: "CIBER: quiénes somos (history of the thematic areas)", url: "https://www.ciberisciii.es/quienes-somos" },
    ] }),
];

const companies: CompanyInput[] = [
  grp({ id: "gecp", name: "Spanish Lung Cancer Group (GECP)", aka: ["GECP", "Grupo Español de Cáncer de Pulmón", "Fundación GECP", "Spanish Lung Cancer Group"], hq: "Barcelona", country: "ES", founded: 1991, website: "https://www.gecp.org",
    tldr: "Spain's independent lung cancer trials group, founded in 1991. It ran EURTAC, the phase 3 trial that showed in European patients that an EGFR tablet beats chemotherapy for EGFR-mutated lung cancer.",
    summary: "The Grupo Español de Cáncer de Pulmón describes itself as an independent, non-profit clinical research group founded in 1991 to promote the study of lung cancer, and one of the first independent clinical research groups formed by oncologists in Spain. By its own count it brings together more than 750 specialists, medical oncologists, thoracic surgeons, radiation oncologists and basic researchers, across 193 hospitals.\n\nIts best-known trial is EURTAC (NCT00446225), which randomised 173 European patients with EGFR-mutated advanced non-small-cell lung cancer at 42 hospitals in France, Italy and Spain to erlotinib or chemotherapy; median progression-free survival was 9.7 months against 5.2 (hazard ratio 0.37). The trial was run by the Spanish Lung Cancer Group with the French and Italian thoracic groups and funded by the group with Roche. As Fundación GECP it sponsors trials registered on ClinicalTrials.gov, including NADIM-ADJUVANT (NCT04564157).",
    notes: ["EURTAC (erlotinib, EGFR-mutated NSCLC)", "NADIM-ADJUVANT (NCT04564157)", "More than 750 specialists in 193 hospitals, by its own count"],
    cancers: ["nsclc", "lung-cancer"], trials: ["nct04564157", "nct06431633"], keyPapers: ["paper-egfr-nsclc-lancet-oncol-2012"], people: ["enriqueta-felip"],
    links: [{ label: "GECP: quiénes somos", url: "https://www.gecp.org/quienes-somos/" }, doi("10.1016/s1470-2045(11)70393-x", "EURTAC, Lancet Oncol 2012"), pubmed("22285168")] }),

  grp({ id: "pethema", name: "PETHEMA (Programa Español de Tratamientos en Hematología)", aka: ["PETHEMA", "Fundación PETHEMA", "PETHEMA Foundation", "Programa Español de Tratamientos en Hematología"], hq: "Madrid", country: "ES", website: "https://www.fundacionpethema.es",
    tldr: "Spain's academic haematology trials group, part of the Spanish Society of Haematology. Its working groups cover the leukaemias, myelodysplastic syndromes and, through GEM, myeloma.",
    summary: "PETHEMA, the Programa Español de Tratamientos en Hematología, describes itself as an independent academic cooperative group of haematologists and laboratory researchers from the hospitals of Spain's public health system, some private centres and hospitals in Europe and South America, belonging to the Sociedad Española de Hematología y Hemoterapia (SEHH). The Fundación PETHEMA is its instrument for clinical trials, observational and registry studies. Its working groups include GEM (myeloma), acute myeloid leukaemia, acute lymphoblastic leukaemia, chronic lymphocytic leukaemia, myelodysplastic syndromes and immune thrombocytopenia.\n\nAs PETHEMA Foundation it sponsors PEVOLAM (NCT04090736), a phase 3 trial of azacitidine with or without pevonedistat in older or unfit adults with newly diagnosed acute myeloid leukaemia.",
    notes: ["GEM myeloma group", "PEVOLAM (NCT04090736)", "Part of the Sociedad Española de Hematología y Hemoterapia"],
    cancers: ["apl", "aml", "multiple-myeloma"], trials: ["nct04090736"], people: ["miguel-sanz", "maria-victoria-mateos"], institutions: ["la-fe-valencia", "hospital-universitario-salamanca"],
    links: [{ label: "Fundación PETHEMA: sobre PETHEMA", url: "https://www.fundacionpethema.es/sobre-pethema" }, { label: "PETHEMA: grupo de trabajo GEM", url: "https://www.fundacionpethema.es/grupo-de-trabajo/GEM" }] }),
];

const trials: TrialInput[] = [
  t({ id: "cart19-be-01", name: "CART19-BE-01 (ARI-0001 CAR-T, Hospital Clínic de Barcelona)", aka: ["CART19-BE-01", "ARI-0001 pilot study"], nct: "NCT03144583", phase: "1", status: "completed",
    setting: "Pilot Study on the Infusion of ARI-0001 Cells in Patients With CD19+ Leukemia or Lymphoma Refractory to Therapy",
    sponsor: "Institut d'Investigacions Biomèdiques August Pi i Sunyer (IDIBAPS), with the Instituto de Salud Carlos III", enrolled: 50, started: "2017-06-15", startedType: "actual", yearReported: 2020,
    tldr: "The academic trial at Hospital Clínic and Sant Joan de Déu in Barcelona that tested a CAR-T cell therapy made in the hospital itself, and led to Spain authorising it in 2021.",
    summary: "CART19-BE-01 tested ARI-0001, a CD19-directed CAR-T cell product with 4-1BB and CD3-zeta signalling designed and manufactured at Hospital Clínic de Barcelona, in adults and children with relapsed or refractory CD19-positive leukaemia or lymphoma. Patients received cyclophosphamide and fludarabine and then ARI-0001 cells, at first as a single dose and, after a protocol amendment, split into three fractions (10%, 30% and 60%) with the full dose given only in the absence of cytokine release syndrome.\n\nIn the 2021 report in Molecular Therapy, 58 patients were included and 47 treated: 38 with acute lymphoblastic leukaemia, 8 with non-Hodgkin lymphoma and 1 with chronic lymphocytic leukaemia. In acute lymphoblastic leukaemia, grade 3 or higher cytokine release syndrome occurred in 13.2% (26.7% before the amendment against 4.3% after), and the measurable residual disease-negative complete response rate at day 100 was 71.1%. The registry lists 50 participants and completion on 13 September 2022. On these results the AEMPS authorised ARI-0001 under the hospital exemption in February 2021 for adults over 25 with relapsed or refractory acute lymphoblastic leukaemia.",
    result: "Measurable residual disease-negative complete response at day 100 in 71.1% of patients with acute lymphoblastic leukaemia; one-year overall survival 68.6% (Mol Ther 2021).",
    drugs: ["varnimcabtagene-autoleucel"], cancers: ["all-leukemia", "dlbcl", "cll"], targets: ["cd19"], technologies: ["car-t", "point-of-care-cell-manufacturing"], terms: ["crs", "icans"],
    institutions: ["hospital-clinic-barcelona", "isciii"], people: ["julio-delgado", "valentin-ortiz-maldonado", "manel-juan"], keyPapers: ["paper-cart19-be-01-mol-ther-2021"],
    links: [ctgov("NCT03144583"), doi("10.1016/j.ymthe.2020.09.027", "Ortíz-Maldonado et al., Mol Ther 2021"), pubmed("33010231")] }),

  t({ id: "cartbcma-hcb-01", name: "CARTBCMA-HCB-01 (ARI0002h BCMA CAR-T, Hospital Clínic de Barcelona)", aka: ["CARTBCMA-HCB-01", "ARI0002h pilot study", "cesnicabtagene autoleucel"], nct: "NCT04309981", phase: "1/2", status: "positive",
    setting: "Pilot study of the humanised BCMA-directed CAR-T ARI0002h in relapsed or refractory multiple myeloma previously treated with a proteasome inhibitor, an immunomodulatory drug and an anti-CD38 antibody",
    sponsor: "Institut d'Investigacions Biomèdiques August Pi i Sunyer (IDIBAPS)", enrolled: 73, started: "2020-05-27", startedType: "actual", yearReported: 2023,
    tldr: "Hospital Clínic's second home-made CAR-T, aimed at BCMA in myeloma, given in fractions with a booster dose; every treated patient responded at the interim analysis, and Spain's health service now pays for it.",
    summary: "CARTBCMA-HCB-01 is a single-arm academic study at five Spanish centres of ARI0002h, a humanised BCMA-directed CAR-T cell product made at Hospital Clínic de Barcelona, in adults aged 18 to 75 with relapsed or refractory multiple myeloma after at least two previous lines including a proteasome inhibitor, an immunomodulatory drug and an anti-CD38 antibody. Patients received 3 x 10^6 CAR T cells per kg in three fractions on days 0, 3 and 7, and a booster dose at least 100 days later.\n\nAt the planned interim analysis published in The Lancet Oncology in 2023, 35 patients had been enrolled and 30 treated; overall response in the first 100 days was 100%, with very good partial response or better in 24 of 30 (complete response in 15). Cytokine release syndrome occurred in 24 of 30 patients, all grade 1 or 2, and no neurotoxic events were observed; persistent grade 3 to 4 cytopenias and infections each occurred in 20 patients. The registry lists 73 participants. The Ministerio de Sanidad lists ARI0002h beside ARI-0001 as an academic CAR-T funded by the national health service.",
    result: "Overall response 100% in the first 100 days in 30 treated patients, complete response in 15; no neurotoxic events at the interim analysis (Lancet Oncol 2023).",
    cancers: ["multiple-myeloma"], targets: ["bcma"], technologies: ["car-t", "point-of-care-cell-manufacturing"], terms: ["crs"],
    institutions: ["hospital-clinic-barcelona", "isciii"], people: ["julio-delgado", "manel-juan", "maria-victoria-mateos"], keyPapers: ["paper-cartbcma-hcb-01-lancet-oncol-2023"],
    links: [ctgov("NCT04309981"), doi("10.1016/S1470-2045(23)00222-X", "Oliver-Caldés et al., Lancet Oncol 2023"), pubmed("37414060"), { label: "Ministerio de Sanidad: terapias avanzadas en el SNS", url: "https://www.sanidad.gob.es/areas/farmacia/infoMedicamentos/terapiasAvanzadas/home.htm" }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-cart19-be-01-mol-ther-2021", name: "CART19-BE-01: A Multicenter Trial of ARI-0001 Cell Therapy in Patients with CD19(+) Relapsed/Refractory Malignancies",
    journal: "Molecular Therapy", year: 2021, doi: "10.1016/j.ymthe.2020.09.027", pmid: "33010231", authors: "Ortíz-Maldonado V, Rives S, Castellà M, et al.", paperType: "observational", participants: 47,
    tldr: "The results of the academic CAR-T trial that Spain's regulator used to authorise a hospital-made cell therapy for adult leukaemia, which the AEMPS described as the first CAR-T developed entirely in Europe to be approved by a regulator.",
    summary: "Hospital Clínic de Barcelona and Hospital Sant Joan de Déu treated adults and children with relapsed or refractory CD19-positive malignancies with ARI-0001, a CD19 CAR-T cell product made at the hospital, after cyclophosphamide and fludarabine. The dose of 0.4 to 5 x 10^6 cells per kg was given at first as one infusion and later, after an amendment, split into three fractions with the full dose depending on the absence of cytokine release syndrome. Of 58 patients included, 47 were treated: 38 with acute lymphoblastic leukaemia, 8 with non-Hodgkin lymphoma and 1 with chronic lymphocytic leukaemia. The authors conclude that the safety and efficacy results are comparable with other academic or commercially available products. The trial is registered as NCT03144583.",
    findings: [
      "In acute lymphoblastic leukaemia, grade 3 or higher cytokine release syndrome occurred in 13.2% of patients: 26.7% before the fractionation amendment against 4.3% after.",
      "Grade 3 or higher neurotoxicity occurred in 2.6%; procedure-related mortality was 7.9% at day 100, with no procedure-related deaths after the amendment.",
      "The measurable residual disease-negative complete response rate at day 100 was 71.1%.",
      "Progression-free survival at one year was 47% (95% CI 27% to 67%) and overall survival 68.6% (95% CI 49.2% to 88%).",
    ],
    whatItMeans: "This is the evidence behind the AEMPS's February 2021 authorisation of ARI-0001 under the hospital exemption, which let a public hospital make and give its own CAR-T to adults with relapsed acute lymphoblastic leukaemia. The fractionated dosing it introduced is the approach later used for the hospital's BCMA CAR-T.",
    caveats: ["A single-arm pilot study with 47 treated patients and no comparison group; one-year confidence intervals are wide.", "The dosing schedule changed partway through, so the before and after figures come from small subgroups."],
    changedPractice: true,
    drugs: ["varnimcabtagene-autoleucel"], trials: ["cart19-be-01"], cancers: ["all-leukemia"], targets: ["cd19"], technologies: ["car-t"], institutions: ["hospital-clinic-barcelona", "ciberonc"], people: ["valentin-ortiz-maldonado", "julio-delgado", "manel-juan"],
    links: [doi("10.1016/j.ymthe.2020.09.027", "Mol Ther 2021"), pubmed("33010231")] }),

  p({ id: "paper-cartbcma-hcb-01-lancet-oncol-2023", name: "Fractionated initial infusion and booster dose of ARI0002h, a humanised, BCMA-directed CAR T-cell therapy, for patients with relapsed or refractory multiple myeloma (CARTBCMA-HCB-01): a single-arm, multicentre, academic pilot study",
    journal: "The Lancet Oncology", year: 2023, doi: "10.1016/S1470-2045(23)00222-X", pmid: "37414060", authors: "Oliver-Caldés A, González-Calle V, Cabañas V, et al.", paperType: "observational", participants: 30,
    tldr: "The interim results of Hospital Clínic's academic BCMA CAR-T for myeloma: every one of 30 treated patients responded in the first 100 days, with no neurotoxic events.",
    summary: "CARTBCMA-HCB-01 is a single-arm study at five academic centres in Spain of ARI0002h, a humanised BCMA-directed CAR-T made by an academic centre, in adults aged 18 to 75 with relapsed or refractory multiple myeloma previously treated with a proteasome inhibitor, an immunomodulatory agent and an anti-CD38 antibody and refractory to the last line. Patients received a fractionated initial infusion of 3 x 10^6 CAR T cells per kg over days 0, 3 and 7 and a non-fractionated booster at least 100 days later. Between 2 June 2020 and 24 February 2021, 44 patients were assessed and 35 enrolled; 30 received ARI0002h. The study was funded by the Instituto de Salud Carlos III (co-funded by the EU), Fundación La Caixa and Fundació Bosch i Aymerich, and is registered as NCT04309981.",
    findings: [
      "Overall response during the first 100 days was 100% in 30 treated patients: 15 complete responses, 9 very good partial responses and 6 partial responses.",
      "Cytokine release syndrome occurred in 24 of 30 patients (80%), all grade 1 or 2; no neurotoxic events were observed.",
      "Persistent grade 3 to 4 cytopenias occurred in 20 patients (67%) and infections in 20 (67%).",
      "Three patients died: one from progression, one from a head injury and one from COVID-19. Median follow-up was 12.1 months.",
    ],
    whatItMeans: "An academic hospital can make a BCMA CAR-T on site and give it with low rates of severe toxicity. Spain's health service now funds ARI0002h beside the commercial BCMA products, which makes the price and supply of a hospital-made product a live comparison rather than a hypothesis.",
    caveats: ["Interim analysis of a single-arm study with 30 treated patients and about a year of follow-up; durability needs the final analysis.", "Response rates in single-arm studies are not directly comparable with randomised trials of commercial products."],
    trials: ["cartbcma-hcb-01"], cancers: ["multiple-myeloma"], targets: ["bcma"], technologies: ["car-t", "point-of-care-cell-manufacturing"], institutions: ["hospital-clinic-barcelona", "isciii"], people: ["julio-delgado", "manel-juan", "maria-victoria-mateos"], journals: ["lancet-oncology"],
    links: [doi("10.1016/S1470-2045(23)00222-X", "Lancet Oncol 2023"), pubmed("37414060")] }),

  p({ id: "paper-trias-hospital-exemption-ari-0001-bmt-2022", name: "The hospital exemption pathway for advanced therapies and the case of the CAR-T ARI-0001",
    journal: "Bone Marrow Transplantation", year: 2022, doi: "10.1038/s41409-021-01463-y", pmid: "35046545", authors: "Trias E, Juan M, Urbano-Ispizua A, Calvo G", paperType: "review",
    tldr: "How Hospital Clínic got its own CAR-T authorised in Spain through a route in European law that lets a hospital make an advanced therapy for its own patients, and what stands in the way of others doing the same.",
    summary: "Published as \"The hospital exemption pathway for the approval of advanced therapy medicinal products: an underused opportunity? The case of the CAR-T ARI-0001\". The authors, from Hospital Clínic de Barcelona's Advanced Therapies Unit, describe how in February 2021 the advanced therapy medicinal product ARI-0001 (CART19-BE-01), developed at the hospital, received authorisation from the AEMPS under the hospital exemption pathway for patients aged over 25 with relapsed or refractory acute lymphoblastic leukaemia. The hospital exemption, foreseen in the European regulation on advanced therapies, allows access to products prepared on a non-routine basis, to quality standards, for an individual patient, limited to the member state where the product was developed and used in a hospital under a medical practitioner's responsibility. Such products must meet national traceability, pharmacovigilance and quality requirements.",
    findings: [
      "ARI-0001 was authorised by the AEMPS under the hospital exemption in February 2021 for patients aged over 25 with relapsed or refractory acute lymphoblastic leukaemia.",
      "Use under the hospital exemption is limited to the member state where the product was developed, in a hospital, under the responsibility of a medical practitioner.",
      "The authors argue the route offers close contact with clinical practice, the quality and rapid access patients need, and lower cost than a regular marketing authorisation, while barriers remain because member states implement it differently.",
    ],
    whatItMeans: "Spain's use of the hospital exemption is a working model for public hospitals making cell therapies at lower cost; the paper is the account of how it was done by the people who did it.",
    caveats: ["A perspective article by the hospital that developed the product; it reports no new patient outcomes and makes no cost figure public."],
    drugs: ["varnimcabtagene-autoleucel"], trials: ["cart19-be-01"], technologies: ["car-t", "point-of-care-cell-manufacturing"], institutions: ["hospital-clinic-barcelona", "aemps"], people: ["manel-juan"], bottlenecks: ["b-manufacturing-cell-therapy"],
    links: [doi("10.1038/s41409-021-01463-y", "Bone Marrow Transplant 2022"), pubmed("35046545")] }),

  p({ id: "paper-redecan-young-adults-ejc-2026", name: "Cancer incidence trends in young adults in Spain, 1993 to 2018, from the Spanish Network of Cancer Registries (REDECAN)",
    journal: "European Journal of Cancer", year: 2026, doi: "10.1016/j.ejca.2026.116883", pmid: "42314360", authors: "Redondo-Sánchez D, Petrova D, Bigorra J, et al.", paperType: "observational", participants: 153599,
    tldr: "Fifteen Spanish cancer registries looked at cancers in adults aged 20 to 49 from 1993 to 2018: smoking-related cancers fell sharply, while some obesity-related cancers rose in people under 40.",
    summary: "Published as \"Is cancer increasing in young adults in Spain? Incidence trends from the Spanish Network of Cancer Registries (REDECAN)\". A population-based study within REDECAN using data from 15 cancer registries included every new cancer diagnosed in people aged 20 to 49 between 1993 and 2018, 153,599 cases, 58% of them in women. Truncated age-standardised incidence rates were calculated with the European standard population and trends assessed with Joinpoint regression to estimate the annual percent change. A corrigendum was published in September 2026 (DOI 10.1016/j.ejca.2026.116950).",
    findings: [
      "Incidence rose for kidney (annual percent change 2.5%), thyroid (4.0%) and Hodgkin lymphoma (1.1%) in men, and for pancreas (2.0%), Hodgkin (2.1%) and non-Hodgkin lymphoma (1.7%) in women.",
      "Several digestive cancers (stomach, colon, rectum), breast and cervical cancers increased significantly among adults under 40.",
      "Incidence fell for larynx, lung, urinary bladder and liver cancers in both sexes, with annual percent changes between -3.1% and -8.7%, and for lip, oral cavity and pharynx cancers in men.",
    ],
    whatItMeans: "Spain's registries see the same early-onset signal reported elsewhere, but not across the board: in young adults smoking-related cancers have fallen while some obesity-associated cancers have risen, which points prevention at weight and diet as well as tobacco.",
    caveats: ["Registries cover part of Spain, not the whole country, and the series ends in 2018.", "Annual percent changes describe relative trends; absolute numbers of cancers in young adults remain small for most sites. A corrigendum has been published."],
    institutions: ["redecan"], cancers: ["colorectal"],
    links: [doi("10.1016/j.ejca.2026.116883", "Eur J Cancer 2026"), pubmed("42314360"), doi("10.1016/j.ejca.2026.116950", "Corrigendum, Eur J Cancer 2026")] }),
];

export const recordsES: EntityInput[] = [...institutions, ...companies, ...trials, ...papers];
