import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Venezuela: the public bodies and papers behind /countries/ve/ (wave 6) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Ministerio del Poder Popular para la Salud's mortality
 * yearbooks for 2013 to 2017 (PDF text) and its news pages through its site's public API, the Instituto Nacional de
 * Higiene "Rafael Rangel"'s own pages, the Instituto Venezolano de los Seguros Sociales' pharmacy directory, the
 * Sociedad Anticancerosa de Venezuela's pages and its 2018 bulletin (PDF text, ICCP portal copy), and the
 * ClinicalTrials.gov record of the Instituto Oncológico Luis Razetti's study. DOIs were resolved through Europe PMC and
 * the figures in `findings` are taken from the indexed abstracts, or, for the Duma commentary, its full text in PMC.
 *
 * Inbound links: the Ministry links the regulator, the insurer, the two cancer hospitals, the Sociedad and two papers;
 * the Razetti institute links its HPV paper, the Sociedad links its partners. No Venezuelan institution existed in the
 * corpus before this file. Coordinates are approximate Caracas city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MPPS_YEARBOOKS = "https://mpps.gob.ve/anuarios-de-mortalidad/";
const MPPS_2017 = "https://mpps.gob.ve/wp-content/uploads/2026/08/33-Anuario2017.pdf";
const MPPS_REGISTRY = "https://mpps.gob.ve/la-importancia-de-un-registro-confiable-sobre-el-cancer-en-el-sector-de-la-salud-publica-y-privada/";
const MPPS_CERVIX_PLAN = "https://mpps.gob.ve/evaluaron-avances-del-plan-de-accion-sobre-la-prevencion-y-control-del-cancer-cervicouterino/";
const MPPS_IVSS = "https://mpps.gob.ve/instituto-venezolano-de-los-seguros-sociales-mas-de-ocho-decadas-de-proteccion-y-bienestar-para-el-pueblo-trabajador/";
const MPPS_RAZETTI = "https://mpps.gob.ve/instituto-oncologico-luis-razetti-celebro-90-anos-de-servicio-ininterrumpido-por-la-salud-del-pueblo-venezolano/";
const MPPS_MACHADO = "https://mpps.gob.ve/ministra-magaly-gutierrez-reinauguro-emergencia-del-hospital-oncologico-padre-machado/";
const INHRR_ABOUT = "https://inhrr.gob.ve/?page_id=3088";
const INHRR_DG = "https://inhrr.gob.ve/?page_id=2058";
const INHRR_JUNTA = "https://inhrr.gob.ve/?page_id=2096";
const IVSS_PHARM = "https://www.ivss.gov.ve/farmacias";
const SAV_ABOUT = "https://www.sociedadanticancerosa.org/quienes-somos/";
const SAV_2017 = "https://www.iccp-portal.org/system/files/resources/boletin-incidencia-mortalidad-cancer-informe-pronosticos-mortalidad-venezuela-2017.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "venezuela-ministry-of-health", name: "Ministerio del Poder Popular para la Salud (Venezuela)", aka: ["MPPS", "MinSalud Venezuela", "Ministry of Health of Venezuela", "Ministerio de Salud de Venezuela"],
    city: "Caracas", country: "VE", lat: 10.503, lng: -66.917, institutionType: "government", website: "https://mpps.gob.ve",
    tldr: "Venezuela's health ministry. It publishes the national mortality yearbooks, runs the Dirección Nacional de Oncología and the Registro Central de Cáncer, and its website holds the yearbooks for 1995 to 2017, in upload folders dated 2026, and weekly epidemiological bulletins for 2026.",
    summary: "The Ministerio del Poder Popular para la Salud compiles deaths from death certificates into its Anuario de Mortalidad. The yearbooks on its website run from 1995 to 2017: the 2013 edition is dated March 2017, 2014 August 2018, 2015 October 2019, 2016 January 2021 and 2017 April 2026, and all of them sit in upload folders dated April to August 2026 on the current site. The 2017 yearbook counts 192,957 deaths, 25,400 of them from cancer (13.16%), the second cause after heart disease. The site also lists weekly epidemiological bulletins for 2026, from week 1 (4 to 10 January) to week 42 (18 to 24 October). The coordinates are an approximate Caracas city point.\n\nIts Dirección Nacional de Oncología houses the Registro Central de Cáncer, which supplied incidence counts for 1990 to 2014 to the Sociedad Anticancerosa de Venezuela's projections. In November 2024 the Ministry described a Sistema del Registro Nacional del Cáncer being implemented in 46 health centres since 2023 with the science ministry, and invited private clinics in Caracas and Miranda to join. In August 2026 it reviewed progress on the Plan de Acción para la Prevención y Control del Cáncer Cervicouterino 2018 to 2030, including colposcopes, cytology training and strategies for HPV vaccination.\n\nIt reported to WHO in 2019 an operational national cancer control plan, early detection guidelines for breast, cervical, colon and childhood cancers, and an organised cervical screening programme by Pap smear. Its public network includes the Instituto Oncológico Luis Razetti and the Hospital Oncológico Padre Machado in Caracas.",
    programs: ["Anuario de Mortalidad (yearbooks 1995 to 2017 online)", "Boletín Epidemiológico semanal (2026)", "Dirección Nacional de Oncología", "Registro Central de Cáncer", "Sistema del Registro Nacional del Cáncer (46 centres, from 2023)", "Plan de Acción para la Prevención y Control del Cáncer Cervicouterino 2018 to 2030"],
    institutions: ["inhrr-venezuela", "ivss-venezuela", "instituto-oncologico-luis-razetti", "hospital-oncologico-padre-machado", "sociedad-anticancerosa-de-venezuela", "who", "iarc", "iaea"],
    people: ["luis-capote-negrin", "gisela-vargas"],
    cancers: ["cervical", "breast-cancer", "prostate", "lung-cancer"], related: ["cancer-registries-surveillance", "global-oncology-access"],
    keyPapers: ["paper-duma-state-of-cancer-care-venezuela-jgo-2019", "paper-nieto-martinez-venezuela-crisis-indicators-bmcph-2025", "paper-bardach-hpv-vaccine-cea-venezuela-bmcph-2017", "paper-garces-hpv-indigenous-venezuela-diseases-2026", "paper-hoegl-lacc-endoscopy-venezuela-ecancer-2026", "paper-fermin-breast-awareness-venezuela-jce-2025"],
    links: [
      { label: "MPPS: Anuarios de Mortalidad", url: MPPS_YEARBOOKS },
      { label: "MPPS: Anuario de Mortalidad 2017 (April 2026, PDF)", url: MPPS_2017 },
      { label: "MPPS: Boletines Epidemiológicos", url: "https://mpps.gob.ve/boletines-epidemiologicos/" },
      { label: "MPPS: the national cancer registry system (25 November 2024)", url: MPPS_REGISTRY },
      { label: "MPPS: review of the cervical cancer action plan 2018 to 2030 (26 August 2026)", url: MPPS_CERVIX_PLAN },
      { label: "WHO: cancer country profile 2020, Venezuela (PDF)", url: "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/ven-2020.pdf" },
    ] }),

  i({ id: "inhrr-venezuela", name: "Instituto Nacional de Higiene \"Rafael Rangel\" (INHRR)", aka: ["INHRR", "Instituto Nacional de Higiene Rafael Rangel", "National Institute of Hygiene Rafael Rangel"],
    city: "Caracas", country: "VE", lat: 10.49, lng: -66.89, institutionType: "government", website: "https://inhrr.gob.ve",
    tldr: "Venezuela's medicines regulator and public health laboratory, attached to the health ministry. It grants the registro sanitario that a medicine needs to be sold, runs pharmacovigilance, and hosts the Junta Revisora that advises on registration and clinical trials.",
    summary: "The Instituto Nacional de Higiene was created by executive decree on 17 October 1938 and named after Rafael Rangel on 29 March 1977. It is attached to the Ministerio del Poder Popular para la Salud and describes itself as part of the national system of sanitary regulation. Its Dirección General de Regulación Sanitaria de Productos de Uso y Consumo Humano authorises the marketing of medicines by granting the registro sanitario, evaluates the quality of medicines, foods, cosmetics and medical products, runs post-marketing surveillance and pharmacovigilance from spontaneous reports, and certifies bioequivalence centres. The coordinates are an approximate Caracas city point.\n\nThe Junta Revisora de Productos Farmacéuticos, a body of the institute's president, two physicians and two pharmacists named by the Ministry, advises the Ministry on the registration, promotion, prescription, dispensing, pharmacovigilance and clinical trials of medicines, sets the criteria for granting, renewing and cancelling the registro sanitario, and maintains the Normas Farmacológicas that set the conditions of use of medicines in Venezuela. In October 2026 the institute posted a 2026 norm for the sanitary regulation of biotherapeutic products; the posted file is a scanned image and its text could not be read. The institute's pages give no target or measured time for registering a medicine.",
    programs: ["Registro sanitario of medicines", "Junta Revisora de Productos Farmacéuticos", "Normas Farmacológicas", "Pharmacovigilance (CENAVIF)", "Bioequivalence certification", "Public health laboratory network"],
    institutions: ["venezuela-ministry-of-health"],
    links: [
      { label: "INHRR: ¿Quiénes somos?", url: INHRR_ABOUT },
      { label: "INHRR: Dirección General de Regulación Sanitaria", url: INHRR_DG },
      { label: "INHRR: Junta Revisora de Productos Farmacéuticos", url: INHRR_JUNTA },
      { label: "INHRR: Norma para la Regulación Sanitaria de Bioterapéuticos 2026 (scanned PDF)", url: "https://inhrr.gob.ve/wp-content/uploads/2026/10/Norma_para_la_Regulacion_Sanitaria_Bioterapeuticos_2026.pdf" },
    ] }),

  i({ id: "ivss-venezuela", name: "Instituto Venezolano de los Seguros Sociales (IVSS)", aka: ["IVSS", "Venezuelan Social Security Institute", "Seguro Social Venezuela"],
    city: "Caracas", country: "VE", lat: 10.5, lng: -66.91, institutionType: "government", website: "https://www.ivss.gov.ve",
    tldr: "Venezuela's social security institute, founded in 1944. Besides pensions it runs hospitals and a network of high-cost pharmacies, which the health ministry says supply cancer medicines free of charge; its directory lists 56 of them in 22 states and the Capital District.",
    summary: "The Instituto Venezolano de los Seguros Sociales was founded on 9 October 1944 under the Ley del Seguro Social Obligatorio, at first covering sickness, maternity and work accidents in Caracas and La Guaira; a 1966 reform added old-age, invalidity and survivors' benefits. The health ministry's October 2026 anniversary page describes it as running hospitals, outpatient clinics and farmacias de alto costo that give continuous free supply of cancer therapies, haemodialysis, immunosuppressants and medicines for chronic diseases. The coordinates are an approximate Caracas city point.\n\nThe institute's own directory of farmacias de alto costo, read on 11 November 2026, lists 56 pharmacies: seven each in Distrito Capital and Carabobo, five in Aragua, four each in Bolívar and Zulia, three each in Anzoátegui, Falcón, Lara and Miranda, two each in Cojedes, Guárico and Mérida, and one in each of eleven other states, with no site of its own in La Guaira. Independent accounts describe shortages: two Venezuelan oncologists wrote in 2019 that breast cancer patients were often switched between hormonal medicines because supply fluctuated, and a national cohort found 43.8% of adults reporting lack of access to medications in 2018 to 2020. OnCo found no published list of the cancer medicines the pharmacies dispense.",
    programs: ["Farmacias de alto costo (56 listed)", "Hospital network", "Old-age, invalidity and survivors' pensions"],
    institutions: ["venezuela-ministry-of-health"],
    links: [
      { label: "IVSS: Farmacias de Alto Costo directory", url: IVSS_PHARM },
      { label: "MPPS: IVSS, more than eight decades (9 October 2026)", url: MPPS_IVSS },
      doi("10.1200/JGO.19.00031", "Duma and Duque Duran, the state of cancer care in Venezuela (J Glob Oncol 2019)"),
    ] }),

  i({ id: "sociedad-anticancerosa-de-venezuela", name: "Sociedad Anticancerosa de Venezuela", aka: ["SAV", "Venezuelan Anticancer Society"],
    city: "Caracas", country: "VE", lat: 10.48, lng: -66.86, institutionType: "consortium", website: "https://www.sociedadanticancerosa.org",
    tldr: "A Venezuelan non-profit founded in 1948 that runs a cancer prevention clinic in Caracas and mobile clinics, and has published its own yearly projections of cancer cases and deaths because recent official figures were not available.",
    summary: "The Sociedad Anticancerosa de Venezuela was founded in 1948 and began work in January 1949. It is a non-profit that runs a Clínica de Prevención in Altagracia, Caracas, offering cytology, laboratory tests and surgery at what it describes as affordable costs, and Unidades Clínicas Móviles that take cervical cytology and skin checks to workplaces and communities. Its membership of the Union for International Cancer Control could not be confirmed: UICC's member page refused OnCo's automated request on 11 November 2026. The coordinates are an approximate Caracas city point.\n\nWith the Centro de Estadística y Matemática Aplicada of the Universidad Simón Bolívar and HomoData, it has published projections of cancer incidence and mortality. Its 2018 bulletin, the third yearly report, modelled the Ministry's mortality yearbooks for 1990 to 2013 and the Registro Central de Cáncer's incidence counts for 1990 to 2014 and projected 26,510 cancer deaths and 52,855 new cases for 2017, with Vargas and Distrito Capital the states with the highest crude rates. Later reports, for 2023 and 2024, were listed on its website but the files returned errors on 11 November 2026.",
    programs: ["Clínica de Prevención (Caracas)", "Unidades Clínicas Móviles", "Projections of cancer incidence and mortality in Venezuela", "Cancer education campaigns"],
    institutions: ["venezuela-ministry-of-health"], cancers: ["cervical", "breast-cancer", "prostate"],
    links: [
      { label: "SAV: Nosotros", url: SAV_ABOUT },
      { label: "SAV: Clínica de Prevención", url: "https://www.sociedadanticancerosa.org/clinica-de-prevencion/" },
      { label: "SAV: Boletín de incidencia y mortalidad del cáncer 2017 (2018, PDF, ICCP portal)", url: SAV_2017 },
      { label: "UICC: Sociedad Anticancerosa de Venezuela", url: "https://www.uicc.org/membership/sociedad-anticancerosa-de-venezuela" },
    ] }),

  i({ id: "instituto-oncologico-luis-razetti", name: "Instituto Oncológico Luis Razetti", aka: ["Instituto de Oncología Luis Razetti", "Hospital Oncológico Luis Razetti", "Luis Razetti Institute of Oncology"],
    city: "Caracas", country: "VE", lat: 10.51, lng: -66.91, institutionType: "cancer-center",
    tldr: "A public cancer hospital in Caracas that marked 90 years of service in July 2026. The health ministry says it gives chemotherapy, radiotherapy and surgery, and that its postgraduate oncology programme has trained about 300 oncologists since 1945.",
    summary: "The Instituto Oncológico Luis Razetti is a cancer hospital of the public health network in Caracas. The health ministry's page of 27 July 2026 marks its 90th anniversary and quotes its staff saying that chemotherapy, radiotherapy and surgery are all operating and that the hospital stayed open through the worst periods of crisis. Since 1945 it has run a postgraduate oncology programme endorsed by the Universidad Central de Venezuela, which the same page says has trained close to 300 oncologists. The coordinates are an approximate Caracas city point.\n\nIt sponsored a ClinicalTrials.gov-registered study of HPV genotypes in cervical cancer (NCT00937547, started November 2009, 329 women enrolled), and the first author of the 2012 paper reporting HPV types in 329 cervical samples from 29 centres in all 24 states gave the institute as affiliation.",
    programs: ["Chemotherapy, radiotherapy and surgical oncology", "Postgraduate oncology training (Universidad Central de Venezuela, from 1945)"],
    institutions: ["venezuela-ministry-of-health"], cancers: ["cervical", "breast-cancer"],
    keyPapers: ["paper-sanchez-lander-hpv-cervical-venezuela-canep-2012"],
    links: [
      { label: "MPPS: Instituto Oncológico Luis Razetti celebrates 90 years (27 July 2026)", url: MPPS_RAZETTI },
      { label: "ClinicalTrials.gov: NCT00937547, HPV genotyping in cervical cancer in Venezuela", url: "https://clinicaltrials.gov/study/NCT00937547" },
    ] }),

  i({ id: "hospital-oncologico-padre-machado", name: "Hospital Oncológico Padre Machado", aka: ["Padre Machado Oncology Hospital", "Hospital Padre Machado"],
    city: "Caracas", country: "VE", lat: 10.49, lng: -66.91, institutionType: "cancer-center",
    tldr: "A public cancer hospital in the Santa Rosalía parish of Caracas. In October 2023 the health ministry reopened its emergency area and said radiotherapy, chemotherapy infusion, cancer surgery, pathology and a working mammograph were available.",
    summary: "The Hospital Oncológico Padre Machado is a public cancer hospital in Santa Rosalía parish, Libertador municipality, Caracas. On 24 October 2023 the then health minister reopened its refurbished emergency area, which the ministry said would raise capacity to more than 1,800 patients a month, and stated that the hospital covered the full cancer pathway: diagnosis, a pathology laboratory reopened in September 2022, radiotherapy, a chemotherapy infusion room, cancer surgery and a working mammograph. The coordinates are an approximate Caracas city point. OnCo found no independent figure for its waiting times or machine availability.",
    programs: ["Radiotherapy", "Chemotherapy infusion", "Surgical oncology", "Pathology", "Mammography"],
    institutions: ["venezuela-ministry-of-health"], cancers: ["breast-cancer", "cervical"],
    links: [
      { label: "MPPS: emergency area of the Hospital Oncológico Padre Machado reopened (24 October 2023)", url: MPPS_MACHADO },
      { label: "MPPS: pathology unit of the Hospital Oncológico Padre Machado reopened (27 September 2022)", url: "https://mpps.gob.ve/reinauguracion-de-la-unidad-de-anatomia-patologica-del-hospital-oncologico-padre-machado/" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-duma-state-of-cancer-care-venezuela-jgo-2019", name: "The state of cancer care in Venezuela: interviews with Venezuelan oncologists, 2019",
    journal: "Journal of Global Oncology", year: 2019, doi: "10.1200/JGO.19.00031", pmid: "31050921", authors: "Duma N, Duque Duran L", paperType: "review",
    tldr: "Two Venezuelan doctors interviewed oncologists in and outside Venezuela and reported shortages of cancer medicines and opioids, radiotherapy machines out of service, and oncologists leaving the country.",
    summary: "Published as \"The State of Cancer Care in Venezuela\", a commentary by Narjust Duma (Mayo Clinic) and Liseth Duque Duran (Hospital Dr. José María Vargas de Caracas) built on interviews with Venezuelan surgical and medical oncologists. The authors note that data on cancer care in Venezuela were difficult to find and that the health ministry had published bulletins sporadically, if at all, for several years.",
    findings: [
      "Interviewed oncologists dated the worsening of medicine shortages to 2010, starting with tyrosine kinase inhibitors; in 2019 cisplatin and bevacizumab were short, and the authors cite an estimate that Venezuela had 10% of the drugs needed for cancer care.",
      "Supply of aromatase inhibitors and tamoxifen fluctuated, so breast cancer patients could be switched between hormonal medicines within their first year of adjuvant treatment.",
      "Radiation machines in public and private hospitals were often broken and abandoned for lack of supplies, technicians and physicians, and many breast cancer patients had mastectomy with extensive node dissection because adjuvant radiotherapy was unavailable.",
      "Hospital Dr. José María Vargas de Caracas had empty fellowship places in surgical and medical oncology for the first time.",
    ],
    whatItMeans: "A first-hand account of what shortages meant for treatment choices in 2019, at a time when official figures were not being published; it is evidence of conditions then, not a measurement of them now.",
    caveats: ["A commentary based on interviews, not a survey or registry study.", "The figures it quotes come from its cited sources, not from its own data collection.", "Describes 2019; the situation may have changed since."],
    institutions: ["venezuela-ministry-of-health"], cancers: ["breast-cancer"], drugs: ["tamoxifen", "anastrozole"],
    links: [doi("10.1200/JGO.19.00031", "J Glob Oncol 2019"), pubmed("31050921"), { label: "Full text (PMC)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6550090/" }] }),

  p({ id: "paper-sanchez-lander-hpv-cervical-venezuela-canep-2012", name: "HPV types in invasive cervical cancer and CIN2 and CIN3 across Venezuela",
    journal: "Cancer Epidemiology", year: 2012, doi: "10.1016/j.canep.2012.04.005", pmid: "22608058", authors: "Sánchez-Lander J, Cortiñas P, Loureiro CL, et al.", paperType: "observational", participants: 329,
    tldr: "In samples from 329 women from 29 centres in all 24 states, HPV was found in 98.9% of invasive cervical cancers, and HPV16 and HPV18 were the commonest types.",
    summary: "Published as \"Human papillomavirus in invasive cervical cancer and cervical intraepithelial neoplasia 2 and 3 in Venezuela: a cross-sectional study\". Paraffin-embedded samples from 329 women from 29 medical centres in the 24 states of Venezuela were typed by PCR and reverse hybridisation. The first author's affiliation is the Luis Razetti Institute of Oncology, Caracas; Luis Capote-Negrín is among the co-authors.",
    findings: [
      "HPV was identified in 95 of 96 invasive cervical cancers (98.9%), 142 of 149 CIN3 (95.3%) and 78 of 84 CIN2 samples (92.8%).",
      "The commonest types in invasive cancer and CIN3 were HPV16, 18, 31 and 33.",
      "HPV16 or HPV18 was more prevalent in CIN3 or worse than in CIN2 (73.4% against 50%).",
    ],
    whatItMeans: "The authors describe it as the first nationwide study of HPV types in cervical lesions in Venezuela, and say it supports HPV-based screening and considering vaccination.",
    caveats: ["Hospital samples, not a population survey."],
    institutions: ["instituto-oncologico-luis-razetti"], cancers: ["cervical"], people: ["luis-capote-negrin"],
    links: [doi("10.1016/j.canep.2012.04.005", "Cancer Epidemiol 2012"), pubmed("22608058")] }),

  p({ id: "paper-bardach-hpv-vaccine-cea-venezuela-bmcph-2017", name: "Cost-effectiveness of HPV vaccination for girls in Venezuela",
    journal: "BMC Public Health", year: 2017, doi: "10.1186/s12889-017-4064-7", pmid: "28148228", authors: "Bardach AE, Garay OU, Calderón M, et al.", paperType: "methods",
    tldr: "A Markov model of a cohort of 264,489 Venezuelan 11-year-old girls found the bivalent and quadrivalent HPV vaccines cost-saving compared with screening alone in all scenarios tested.",
    summary: "Published as \"Health economic evaluation of Human Papillomavirus vaccines in women from Venezuela by a lifetime Markov cohort model\". Authors from the Instituto de Efectividad Clínica y Sanitaria in Buenos Aires, Venezuelan public health researchers and two authors from GSK adapted a published model to Venezuela from the health payer's perspective, discounting costs and QALYs at 5%.",
    findings: [
      "Compared with screening only, the bivalent and quadrivalent vaccines were cost-saving in all eight scenarios, avoiding 2,310 and 2,143 deaths and 4,781 and 4,431 cervical cancers respectively.",
      "They gained 4,486 and 4,395 discounted QALYs; neither vaccine was consistently more cost-effective than the other.",
    ],
    whatItMeans: "Economic evidence for adding HPV vaccine to Venezuela's schedule; WHO's immunisation data still recorded the vaccine as not introduced nationally in 2025.",
    caveats: ["GSK, which makes the bivalent vaccine, funded the study, and two authors were GSK employees.", "Prices and exchange rates in Venezuela have changed greatly since the model was built."],
    institutions: ["venezuela-ministry-of-health"], cancers: ["cervical"], technologies: ["hpv-vaccine"],
    links: [doi("10.1186/s12889-017-4064-7", "BMC Public Health 2017"), pubmed("28148228")] }),

  p({ id: "paper-garces-hpv-indigenous-venezuela-diseases-2026", name: "HPV genotypes in three Indigenous communities of Venezuela",
    journal: "Diseases", year: 2026, doi: "10.3390/diseases14100384", pmid: "42930011", authors: "Garcés MF, Guzmán Silva J, Aranguren D, et al.", paperType: "observational", participants: 260,
    tldr: "Among 260 Wayuu, Eñepa and Warao women who took their own samples, 55.4% carried HPV; the nonavalent vaccine covered a type in 69.4% of infected women, and cytology and HPV testing agreed poorly.",
    summary: "Published as \"Divergent Human Papillomavirus Genotype Spectra in Three Indigenous Communities of Venezuela: Implications for Vaccine Choice and Cervical Screening\". Researchers at the Universidad Central de Venezuela tested self-collected samples from women in La Guajira (Wayuu), Maniapure (Eñepa) and Delta Amacuro (Warao) with a PCR assay resolving 21 genotypes; cytology was available for 144.",
    findings: [
      "HPV prevalence was 55.4% and high-risk HPV 51.2%, rising from 42.6% in La Guajira to 59.6% in Maniapure and 80.0% in Delta Amacuro.",
      "HPV-31 was the commonest type (15.8%), then HPV-16 (11.5%); half of infected women carried more than one type.",
      "Only 20 of 78 HPV-positive women with a smear had an abnormal result.",
      "At least one nonavalent vaccine type was present in 69.4% of infected women, against 30.6% for the bivalent vaccine.",
    ],
    whatItMeans: "The authors state that HPV vaccination is not part of the Venezuelan national programme, and read their data as favouring the nonavalent vaccine and HPV-based screening with a workable triage step.",
    caveats: ["Small samples, especially in Delta Amacuro (25 women).", "Communities differ, so results may not apply to other Indigenous peoples."],
    cancers: ["cervical"], technologies: ["hpv-vaccine"],
    links: [doi("10.3390/diseases14100384", "Diseases 2026"), pubmed("42930011")] }),

  p({ id: "paper-fermin-breast-awareness-venezuela-jce-2025", name: "Breast cancer awareness and early detection among women in Caracas",
    journal: "Journal of Cancer Education", year: 2025, doi: "10.1007/s13187-025-02743-7", pmid: "41042483", authors: "Fermín BAN, Aponte-Rueda ME, Shah D, Nieves M, Rebolledo TM", paperType: "observational", participants: 197,
    tldr: "Of 197 women attending Caracas University Hospital in 2023, 89.3% recognised a breast lump as a warning sign but only 9% knew the risk factors well.",
    summary: "Published as \"Bridging the Knowledge Gap: Assessment of Breast Cancer Awareness and Early Detection Practices among Venezuelan Women\". A cross-sectional, interviewer-administered questionnaire of 197 women attending outpatient services at Caracas University Hospital between April and August 2023, by authors from the hospital's surgery department and breast unit and the Venezuelan Breast Cancer Research and Education Foundation.",
    findings: [
      "89.3% recognised a breast lump as a warning sign.",
      "Only 9% showed a high level of knowledge of risk factors; obesity (54.8%) was the risk factor most often named.",
      "Higher education was associated with better knowledge of risk factors, and attending a breast clinic with better knowledge of early detection.",
    ],
    whatItMeans: "The authors say late-stage diagnosis remains common in Venezuela and call for education that goes beyond awareness to practical information about screening.",
    caveats: ["One hospital in Caracas; women attending hospital may differ from the general population."],
    cancers: ["breast-cancer"],
    links: [doi("10.1007/s13187-025-02743-7", "J Cancer Educ 2025"), pubmed("41042483")] }),

  p({ id: "paper-nieto-martinez-venezuela-crisis-indicators-bmcph-2025", name: "Seven crisis indicators in a national cohort of Venezuelan adults, 2018 to 2020",
    journal: "BMC Public Health", year: 2025, doi: "10.1186/s12889-025-23125-0", pmid: "40483436", authors: "Nieto-Martínez R, Babagoli MA, Gonzalez-Rivas JP, et al.", paperType: "observational", participants: 1257,
    tldr: "Following up 1,257 adults from a nationally representative cardiometabolic study, 43.8% reported lack of access to medications in 2018 to 2020, and 77.3% disruption of at least one utility.",
    summary: "Published as \"Characterizing the Venezuelan situation between 2014-2020 in a population-based study using seven key indicators\". Follow-up data from 2018 to 2020 on 1,257 participants (35% of the total) in the Venezuelan Study of Cardiometabolic Health (EVESCAM, 2014 to 2017) were analysed for food insecurity, stressful events, family separation, utility disruption, lack of medications, lack of transport and disrupted schooling.",
    findings: [
      "77.3% reported disruption of at least one utility and 31.7% of two or more; lack of electricity affected 70.2%.",
      "Lack of access to medications was reported by 43.8% and did not differ across subgroups.",
      "Food insecurity was 60.2%, more frequent in the low socioeconomic group (odds ratio 2.17).",
    ],
    whatItMeans: "Not a cancer study, but a population measure of how often Venezuelans could not obtain medicines during the years official health statistics were not being published.",
    caveats: ["Follow-up reached 35% of the original sample, 71.8% of them women.", "Medications in general, not cancer medicines specifically."],
    institutions: ["venezuela-ministry-of-health"],
    links: [doi("10.1186/s12889-025-23125-0", "BMC Public Health 2025"), pubmed("40483436")] }),

  p({ id: "paper-hoegl-lacc-endoscopy-venezuela-ecancer-2026", name: "Routine cystoscopy and rectosigmoidoscopy in staging locally advanced cervical cancer in Venezuela",
    journal: "ecancermedicalscience", year: 2026, doi: "10.3332/ecancer.2026.2139", pmid: "42437065", authors: "Hoegl J, Fernandes A, Hidalgo F, et al.", paperType: "observational", participants: 233,
    tldr: "In 233 Venezuelan women with locally advanced cervical cancer, routine endoscopy found bladder or rectal invasion in 6.0% and 3.0%, almost always already suspected on MRI, and changed no treatment plan.",
    summary: "Published as \"Diagnostic value of routine endoscopic studies in staging locally advanced cervical cancer: a multicenter experience from a low and middle-income country\". A retrospective cohort of 233 patients (FIGO 2018 stages IB3 to IVB) from centres in Caracas, Valencia, Barquisimeto and Punto Fijo who all had clinical examination, MRI and routine cystoscopy and rectosigmoidoscopy.",
    findings: [
      "Endoscopy confirmed bladder mucosal invasion in 6.0% and rectal in 3.0%; in 95% of positive cases MRI or symptoms had already raised suspicion.",
      "MRI's negative predictive value was 95.9% for bladder and 97.4% for rectal invasion.",
      "No treatment plan was changed on endoscopic findings alone.",
    ],
    whatItMeans: "The authors recommend dropping routine endoscopy from local staging protocols in favour of imaging-guided selection, saving scarce resources.",
    caveats: ["Retrospective; all patients had MRI, which may not be available everywhere in Venezuela."],
    cancers: ["cervical"],
    links: [doi("10.3332/ecancer.2026.2139", "ecancermedicalscience 2026"), pubmed("42437065")] }),
];

/** Records behind /countries/ve/ (wave 6). */
export const recordsVE: EntityInput[] = [...institutions, ...papers];
