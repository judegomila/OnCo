import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Uruguay: the public bodies and papers behind /countries/uy/ (wave 10) that the corpus did not hold. Each was written
 * from its own primary source, read raw in Spanish on 11 November 2026: Ley 16.097 (the cancer commission), Ley 16.343
 * and the Fondo Nacional de Recursos' own pages and 2023 annual report, Ley 18.211 (the integrated health system),
 * Decreto 18/020 and Decreto 158/019 as published by IMPO, the Ministry of Public Health's medicines and formulary pages,
 * the Comisión Honoraria de Lucha contra el Cáncer's pages on its registry, screening programmes and electronic oncology
 * record, and the registry's November 2025 report (PDF text). DOIs were resolved through Europe PMC and the figures in
 * `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the commission, the registry, the fund, the national cancer institute and the
 * children's cancer foundation; the commission links the registry, whose keyPapers are the three trend papers. The
 * Instituto Nacional del Cáncer already exists (centres-wave3.ts, `inca-uruguay`) and is reused, not duplicated.
 * Coordinates are approximate Montevideo street or district points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const CHLCC = "https://www.comisioncancer.org.uy/";
const RNC = "https://www.comisioncancer.org.uy/Ocultas/Registro-Nacional-de-Cancer-uc11";
const RNC_ABOUT = "https://www.comisioncancer.org.uy/Institucional/Registro-Nacional-de-Cancer-uc201";
const RNC_2025 = "https://www.comisioncancer.org.uy/aucdocumento.aspx?108,2188";
const CHLCC_MAMA = "https://www.comisioncancer.org.uy/Institucional/Prevencion-y-diagnostico-oportuno-de-cancer-de-mama-uc204";
const CHLCC_CX = "https://www.comisioncancer.org.uy/Institucional/Prevencion-y-diagnostico-oportuno-del-cancer-de-cuello-uterino-uc205";
const CHLCC_HCEO = "https://www.comisioncancer.org.uy/Institucional/Historia-Clinica-Electronica-Oncologica-uc207";
const LEY_16097 = "https://www.impo.com.uy/bases/leyes/16097-1989";
const LEY_16343 = "https://www.impo.com.uy/bases/leyes/16343-1992";
const LEY_18211 = "https://www.impo.com.uy/bases/leyes/18211-2007";
const DEC_18_020 = "https://www.impo.com.uy/bases/decretos/18-2020";
const DEC_158_019 = "https://www.impo.com.uy/bases/decretos/158-2019";
const MSP_MEDS = "https://www.gub.uy/ministerio-salud-publica/tematica/medicamentos";
const MSP_FTM = "https://www.gub.uy/ministerio-salud-publica/formulario-terapeutico-de-medicamentos-FTM";
const FNR_WHAT = "https://www.fnr.gub.uy/que-es-el-fondo-nacional-de-recursos/";
const FNR_HISTORY = "https://www.fnr.gub.uy/historia/";
const FNR_MEDS = "https://www.fnr.gub.uy/tratamientos_medicamentos/";
const FNR_BREAST = "https://www.fnr.gub.uy/noticia_slide/octubre-rosa-2026/";
const FNR_2023 = "https://www.fnr.gub.uy/wp-content/uploads/2024/11/memoria_2023.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "msp-uruguay", name: "Ministerio de Salud Pública (Uruguay)", aka: ["MSP Uruguay", "Ministry of Public Health of Uruguay", "Uruguayan Ministry of Public Health"],
    city: "Montevideo", country: "UY", lat: -34.895, lng: -56.182, institutionType: "government", website: "https://www.gub.uy/ministerio-salud-publica",
    tldr: "Uruguay's health ministry. It runs the integrated national health system created in 2007, decides which medicines are on the national formulary that every provider must offer, and its Medicines Department registers medicines.",
    summary: "Ley 18.211 of 5 December 2007 created the Sistema Nacional Integrado de Salud and gave the Ministerio de Salud Pública the task of implementing it, joining public and private providers so that every resident has access to comprehensive health services; its guiding principles include universal coverage and the informed choice of provider. The system is financed through two funds, the Fondo Nacional de Salud (FONASA) and the Fondo Nacional de Recursos, for the services in the ministry's comprehensive care plan (Plan Integral de Atención a la Salud, PIAS). The coordinates are an approximate Montevideo city point.\n\nThe ministry keeps the Formulario Terapéutico de Medicamentos, the compulsory positive list from which every provider builds its own formulary, and decides on applications to add medicines to it and to the PIAS. Its Medicines Department registers medicines under Decreto 18/020 of 13 January 2020, which replaced the 1999 registration decree after twenty years, and its National Research Ethics Commission oversees the accredited institutional ethics committees that must approve every study in people under Decreto 158/019.\n\nCancer surveillance is delegated: the Comisión Honoraria de Lucha contra el Cáncer, created by law in 1989, runs the national cancer registry, and its registry works with the ministry's national cancer control programme. Cervical screening functions the commission had carried out passed to the ministry in 2012 under its ordinance 466, and a 2006 ministry ordinance obliges every public and private provider to offer periodic mammography.",
    programs: ["Sistema Nacional Integrado de Salud (Ley 18.211, 2007)", "Formulario Terapéutico de Medicamentos", "Plan Integral de Atención a la Salud (PIAS)", "Registration of medicines (Decreto 18/020)", "Research ethics (Decreto 158/019)", "National cancer control programme"],
    institutions: ["chlcc-uruguay", "registro-nacional-cancer-uruguay", "fnr-uruguay", "inca-uruguay", "fundacion-perez-scremini", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "colorectal", "lung-cancer"], related: ["global-oncology-access"],
    keyPapers: ["paper-abascal-uruguay-tobacco-control-lancet-2012"],
    links: [
      { label: "IMPO: Ley 18.211, creation of the Sistema Nacional Integrado de Salud (5 December 2007)", url: LEY_18211 },
      { label: "MSP: Formulario Terapéutico de Medicamentos", url: MSP_FTM },
      { label: "MSP: medicines (Departamento de Medicamentos)", url: MSP_MEDS },
      { label: "IMPO: Decreto 18/020, regulation for the registration of medicines for human use", url: DEC_18_020 },
      { label: "IMPO: Decreto 158/019, research in human beings", url: DEC_158_019 },
    ] }),

  i({ id: "chlcc-uruguay", name: "Comisión Honoraria de Lucha contra el Cáncer", aka: ["CHLCC", "Comisión contra el Cáncer", "Honorary Commission for the Fight against Cancer (Uruguay)", "Uruguayan Cancer Commission"],
    city: "Montevideo", country: "UY", lat: -34.903, lng: -56.17, institutionType: "government", website: CHLCC,
    tldr: "Uruguay's cancer commission, set up by law in 1989. It runs the national cancer registry, ran the mobile mammography programme that took screening across the country, monitors cervical screening coverage and educates the public about prevention.",
    summary: "Ley 16.097 of 29 October 1989 declared the fight against cancer of national interest and created the Comisión Honoraria de Lucha contra el Cáncer as a non-state public body, chaired by a delegate of the executive and including the director of the oncology institute, the director of the national cancer registry and delegates of the Faculty of Medicine, public education and the two medical unions. Its duties under the law include promoting prevention, early diagnosis, treatment and rehabilitation programmes, informing the public, supporting research with the university, and overseeing the production and import of cancer medicines. Its offices are at Brandzen 1961, Montevideo; the coordinates are approximate.\n\nThe commission runs the Registro Nacional de Cáncer. From 1998 it took mammography across the country with six mobile units, two trailers in Montevideo and four vans, at a cost it puts at about 14 million US dollars, and handed the service to the health system at the end of 2017, saying there are now 200 mammographs in the country. Its cervical cancer prevention area, set up in 1994, supported the public cytology laboratories until those functions passed to the ministry in 2012; it now records Pap test coverage nationally, runs external quality control for cytology laboratories and follows up women with abnormal results in the public system, and since 2014 it has taken part in IARC's ESTAMPA study of HPV testing. A ministry ordinance (641, under Decreto 242/017) made an electronic oncology record compulsory for the country's cancer services and named the commission to manage it; the commission says it is waiting for government funding to build it.",
    programs: ["Registro Nacional de Cáncer", "Mammography programme (1998 to 2017)", "Cervical cancer prevention area (from 1994)", "ESTAMPA study of HPV screening with IARC (from 2014)", "Historia Clínica Electrónica Oncológica", "Tumour bank", "Public education on tobacco, sun and diet"],
    institutions: ["registro-nacional-cancer-uruguay", "msp-uruguay", "inca-uruguay", "iarc"],
    cancers: ["breast-cancer", "cervical", "colorectal", "lung-cancer", "melanoma"], related: ["cancer-registries-surveillance", "hpv-vaccine"],
    links: [
      { label: "IMPO: Ley 16.097, creation of the Comisión Honoraria de Lucha contra el Cáncer (29 October 1989)", url: LEY_16097 },
      { label: "CHLCC: breast cancer prevention and the mammography programme", url: CHLCC_MAMA },
      { label: "CHLCC: cervical cancer prevention", url: CHLCC_CX },
      { label: "CHLCC: electronic oncology record", url: CHLCC_HCEO },
    ] }),

  i({ id: "registro-nacional-cancer-uruguay", name: "Registro Nacional de Cáncer (Uruguay)", aka: ["RNC Uruguay", "National Cancer Registry of Uruguay", "Uruguay National Cancer Registry"],
    city: "Montevideo", country: "UY", lat: -34.903, lng: -56.17, institutionType: "research-institute", website: RNC,
    tldr: "Uruguay's population-based cancer registry, run by the national cancer commission. It counts new cancers in the whole country, IARC rates its data in the highest quality class, and its 2017 to 2021 data recorded about 17,200 new cancers a year.",
    summary: "The Registro Nacional de Cáncer is a population-based registry covering the whole of Uruguay, run by the Comisión Honoraria de Lucha contra el Cáncer at Brandzen 1961, Montevideo (approximate coordinates). It rests on Decreto 246/984 of 15 June 1984, which requires professionals to report every cancer diagnosed in the country, on Ley 16.097 of 1989 and on Decreto 431/002. The registry itself notes that cancer is not on the ministry's list of notifiable diseases (Decreto 64/004) and that no sanction applies for not reporting, so it relies mainly on active case finding: about 30 data finders review pathology and clinical records in every department of the interior and in Montevideo's hospitals and laboratories. It describes itself as an IARC collaborating centre for advising other registries in the region.\n\nIts data were the first national data from Uruguay published in Cancer Incidence in Five Continents (volume X) and are rated class A by IARC; IARC's GLOBOCAN 2024 estimate for Uruguay is built on them. Its November 2025 report counts 85,891 new cancers in 2017 to 2021, an average of 17,178 a year including non-melanoma skin cancer (about 14,200 excluding it), and 41,055 cancer deaths, an average of 8,211 a year. Breast, prostate, colorectal and lung cancer made up 48% of cancers other than non-melanoma skin cancer, and age-standardised mortality for all cancers has fallen since 1990, with the fall in women stopping from 2012 as lung cancer deaths in women rose by 3.43% a year.",
    programs: ["Population-based cancer registration for all of Uruguay", "Atlas of cancer incidence (2017 to 2021) and mortality (2019 to 2023)", "Incidence and mortality trend analysis"],
    institutions: ["chlcc-uruguay", "msp-uruguay", "iarc"], cancers: ["breast-cancer", "prostate", "colorectal", "lung-cancer", "cervical"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-garau-uruguay-incidence-trends-colombmed-2019", "paper-alonso-uruguay-lung-cancer-apc-canep-2018", "paper-musetti-uruguay-colorectal-young-adults-ijerph-2021"],
    links: [
      { label: "CHLCC: Registro Nacional de Cáncer", url: RNC },
      { label: "CHLCC: what the national cancer registry does", url: RNC_ABOUT },
      { label: "Registro Nacional de Cáncer: Situación epidemiológica del Uruguay en relación al cáncer, November 2025 (PDF)", url: RNC_2025 },
      doi("10.25100/cm.v50i4.4212", "Garau et al., trends in cancer incidence in Uruguay 2002 to 2015 (Colomb Med 2019)"),
    ] }),

  i({ id: "fnr-uruguay", name: "Fondo Nacional de Recursos (Uruguay)", aka: ["FNR", "FNR Uruguay", "National Resource Fund of Uruguay"],
    city: "Montevideo", country: "UY", lat: -34.904, lng: -56.188, institutionType: "government", website: "https://www.fnr.gub.uy",
    tldr: "Uruguay's national fund for high-cost care. It pays for specialised procedures and, since 2005, for high-cost medicines on the national formulary, including cancer medicines such as trastuzumab, pembrolizumab and osimertinib, for everyone covered by the national health system.",
    summary: "The Fondo Nacional de Recursos began work on 1 December 1980 under Decreto-Ley 14.897 and is now governed by Ley 16.343 of 24 December 1992. It is a non-state public body run by an honorary board of nine: three ministry of health representatives, with the minister in the chair, and members for social security, the economy ministry, the comprehensive care providers and the specialised institutes. It acts as a reinsurer for the providers: it gives universal financial cover for high-complexity procedures, devices and high-cost medicines to everyone with cover through the national health system. Most of its income is a fixed monthly quota for each FONASA contributor, transferred by social security; the economy ministry reimburses the cost for public-system patients who do not contribute. Its offices are at La Cumparsita 1373, Montevideo; the coordinates are approximate.\n\nArticle 313 of the 2005 budget law, Ley 17.930, added high-cost medicines to its cover, starting with tyrosine kinase inhibitors for leukaemia and GIST, rituximab for non-Hodgkin lymphoma, and trastuzumab and fulvestrant for breast cancer; cetuximab for colon cancer and daratumumab for myeloma were added in 2023, when it authorised 4,980 new medicine treatments for all conditions. Its pages list cover for breast cancer (fulvestrant, lapatinib, pertuzumab, trastuzumab emtansine, trastuzumab, ribociclib and pembrolizumab), for which it authorised 714 treatment requests in 2025, and for lung cancer (erlotinib, gefitinib, osimertinib, alectinib, atezolizumab, atezolizumab with bevacizumab and pembrolizumab). Under article 462 of Ley 19.355 (2015), adding a medicine it will fund to the national formulary requires a prior technical report from representatives of the Faculty of Medicine, the medical profession, the ministry and the fund. It is also a Cochrane collaborating centre for Uruguay.",
    programs: ["High-cost medicines (from 2005)", "Specialised procedures in the Institutos de Medicina Altamente Especializada", "PET scanning and bone marrow transplantation", "Tobacco dependence treatment", "Cochrane collaborating centre for Uruguay"],
    institutions: ["msp-uruguay"], drugs: ["trastuzumab", "pertuzumab", "fulvestrant", "ribociclib", "pembrolizumab", "osimertinib", "cetuximab", "daratumumab", "imatinib", "rituximab"],
    cancers: ["breast-cancer", "lung-cancer", "colorectal", "prostate", "melanoma"], related: ["global-oncology-access"],
    links: [
      { label: "FNR: what the Fondo Nacional de Recursos is", url: FNR_WHAT },
      { label: "FNR: history", url: FNR_HISTORY },
      { label: "FNR: treatments with medicines", url: FNR_MEDS },
      { label: "FNR: October, breast cancer prevention month (2025 authorisations)", url: FNR_BREAST },
      { label: "FNR: annual report 2023 (PDF)", url: FNR_2023 },
      { label: "IMPO: Ley 16.343 (24 December 1992)", url: LEY_16343 },
    ] }),

  i({ id: "fundacion-perez-scremini", name: "Fundación Pérez Scremini", aka: ["Pérez Scremini Foundation", "FPS Uruguay"],
    city: "Montevideo", country: "UY", lat: -34.895, lng: -56.166, institutionType: "hospital", website: "https://perezscremini.org/",
    tldr: "A Uruguayan foundation that runs the national referral centre for children's cancer with the public health service, caring for about 70% of children with cancer in the country; a 2026 report gives five-year survival above 79%.",
    summary: "The Fundación Pérez Scremini manages Uruguay's national referral centre for children and adolescents with cancer in partnership with the public provider ASSE (Administración de los Servicios de Salud del Estado) and the public children's hospital, under specific legislation. A 2026 report by its clinicians in the Revista Panamericana de Salud Pública states that it cares for about 70% of children with cancer in Uruguay, that ASSE contributes about 35% of its budget for general hospital supplies and services and that donations fund the remaining 65%, including home-based care. The same report gives overall five-year survival above 79.6% for children treated in Uruguay, above the 60% target of WHO's Global Initiative for Childhood Cancer, with care at no cost to families. Its offices are on Bulevar General Artigas, Montevideo; the coordinates are approximate.",
    programs: ["National referral centre for childhood cancer (with ASSE)", "Home-based care and psychosocial support"],
    institutions: ["msp-uruguay"], cancers: ["childhood-cancers", "all-leukemia"], keyPapers: ["paper-nion-uruguay-childhood-cancer-rpsp-2026"],
    links: [
      { label: "Fundación Pérez Scremini (site under renovation when read)", url: "https://perezscremini.org/" },
      doi("10.26633/rpsp.2026.61", "Nion et al., childhood cancer in Uruguay: a public-private partnership (Rev Panam Salud Publica 2026)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-garau-uruguay-incidence-trends-colombmed-2019", name: "Trends in cancer incidence in Uruguay, 2002 to 2015",
    journal: "Colombia Médica", year: 2019, doi: "10.25100/cm.v50i4.4212", pmid: "32476689", authors: "Garau M, Musetti C, Alonso R, Barrios E.", paperType: "observational",
    tldr: "The first report of cancer incidence trends from Uruguay's national registry found stable rates overall from 2002 to 2015, falling oesophageal and stomach cancer, rising kidney and thyroid cancer, and lung cancer falling in men while rising in women.",
    summary: "Published as \"Trends in cancer incidence in Uruguay: 2002 -2015\". The authors analysed all new invasive cancers at twelve sites diagnosed in 2002 to 2015 in the National Cancer Registry, which has collected cases nationwide since 1989, calculating age-standardised rates and fitting joinpoint regression models to the trends.",
    findings: [
      "In both sexes, incidence trends for all cancer sites, colorectal cancer and bladder cancer were stable.",
      "Oesophageal and gastric cancer fell, while thyroid and kidney cancer rose.",
      "Lung cancer fell in men and rose in women; testicular cancer rose; prostate cancer rose early in the period and fell in the final years; cervical cancer fell from 2005 to 2010 and then levelled off.",
    ],
    whatItMeans: "The registry's long series shows which cancers are changing in Uruguay, and the authors link the changes to tobacco control, vaccination, screening and changes in diagnosis as well as lifestyle.",
    caveats: ["Twelve sites only.", "Some of the trends, such as thyroid and prostate cancer, reflect how much doctors test as well as how much disease there is, as the authors note."],
    institutions: ["registro-nacional-cancer-uruguay", "chlcc-uruguay"], cancers: ["lung-cancer", "prostate", "cervical", "thyroid"],
    links: [doi("10.25100/cm.v50i4.4212", "Colomb Med (Cali) 2019"), pubmed("32476689")] }),

  p({ id: "paper-alonso-uruguay-lung-cancer-apc-canep-2018", name: "Lung cancer incidence trends in Uruguay, 1990 to 2014, and projections to 2035",
    journal: "Cancer Epidemiology", year: 2018, doi: "10.1016/j.canep.2018.04.012", pmid: "29758490", authors: "Alonso R, Piñeros M, Laversanne M, et al.", paperType: "observational",
    tldr: "Using Uruguay's national registry, the authors found lung cancer risk falling by generation in men but rising in women born between 1940 and 1960, and projected a 69% rise in the yearly number of lung cancers in women by 2035.",
    summary: "Published as \"Lung cancer incidence trends in Uruguay 1990-2014: An age-period-cohort analysis\". With data from the National Cancer Registry of Uruguay, the authors ran an age-period-cohort analysis of lung cancer incidence over 25 years and used the NORDPRED package to predict new cases and rates to 2035, as a baseline for judging the comprehensive anti-smoking measures Uruguay began in 2005.",
    findings: [
      "In men, rates fell from a peak in 1995, a 70% reduction in lung cancer risk for men born in 1970 relative to those born in the early 1940s.",
      "In women, rates rose steadily from 1991 to 2014, with risk increasing in successive generations born 1940 to 1960 and signs of a decline in women born after 1960.",
      "Extrapolating the trends gives an 8% fall in the mean yearly number of new lung cancers in men by 2035 and a 69% rise in women.",
    ],
    whatItMeans: "Lung cancer in Uruguayan women will keep rising for years because of smoking in earlier generations, even as tobacco control works; the projections are the baseline against which the 2005 measures can be judged.",
    caveats: ["Projections assume past trends continue.", "The analysis predates the 2019 plain packaging rules."],
    institutions: ["registro-nacional-cancer-uruguay", "iarc"], cancers: ["lung-cancer"],
    links: [doi("10.1016/j.canep.2018.04.012", "Cancer Epidemiol 2018"), pubmed("29758490")] }),

  p({ id: "paper-musetti-uruguay-colorectal-young-adults-ijerph-2021", name: "Colorectal cancer in young and older adults in Uruguay: recent incidence and mortality trends",
    journal: "International Journal of Environmental Research and Public Health", year: 2021, doi: "10.3390/ijerph18158232", pmid: "34360522", authors: "Musetti C, Garau M, Alonso R, et al.", paperType: "observational", participants: 27561,
    tldr: "In Uruguay's national registry, colorectal cancer incidence rose by 3.1% a year in men and 2.1% a year in women aged 40 to 49 between 2002 and 2017, while death rates in younger adults stayed stable.",
    summary: "Published as \"Colorectal Cancer in Young and Older Adults in Uruguay: Changes in Recent Incidence and Mortality Trends\". The authors assessed colorectal cancer incidence (2002 to 2017) and mortality (1990 to 2017) by age group and sex from the National Cancer Registry, estimating annual percent changes with joinpoint regression; the abstract notes that Uruguay has the highest colorectal cancer incidence in Latin America.",
    findings: [
      "27,561 colorectal cancers and 25,403 deaths were included.",
      "Incidence rose among men and women aged 40 to 49, by 3.1% (95% CI 1.21 to 5.03) and 2.1% (0.49 to 3.66) a year, and by 0.60% a year in men aged 70 and over.",
      "Mortality was stable under 50, fell in women aged 50 to 69 and 70 and over, and rose in men aged 70 and over (0.74% a year).",
    ],
    whatItMeans: "Colorectal cancer is becoming more common in Uruguayans in their forties, younger than most screening starts; the authors point to diet, lifestyle and unequal access to screening.",
    caveats: ["Registry trends cannot show causes.", "The rises in young adults are from small numbers relative to older ages."],
    institutions: ["registro-nacional-cancer-uruguay", "iarc"], cancers: ["colorectal"],
    links: [doi("10.3390/ijerph18158232", "Int J Environ Res Public Health 2021"), pubmed("34360522")] }),

  p({ id: "paper-nion-uruguay-childhood-cancer-rpsp-2026", name: "Childhood cancer in Uruguay: a public and private partnership for equity and results",
    journal: "Revista Panamericana de Salud Pública", year: 2026, doi: "10.26633/rpsp.2026.61", pmid: "42516614", authors: "Nion G, Pagés C, Lafluf V, et al.", paperType: "review",
    tldr: "Uruguay treats about 70% of children with cancer at a national referral centre run by the Pérez Scremini Foundation with the public health service, and reports five-year survival above 79.6%, with care at no cost to families.",
    summary: "Published in Spanish with the English title \"Childhood cancer in Uruguay: A public-private partnership that delivers equity, science, and results\". The report describes how care for children and adolescents with cancer is organised in Uruguay against the guidelines of WHO's Global Initiative for Childhood Cancer: universal coverage through the national integrated health system, and a strategic partnership, set in specific legislation, between the public provider ASSE and the Fundación Pérez Scremini to manage the national referral centre with the public children's hospital.",
    findings: [
      "Overall five-year survival for children with cancer in Uruguay is over 79.6%, above the 60% target set by WHO's Global Initiative for Childhood Cancer.",
      "The foundation cares for approximately 70% of children with cancer in the country.",
      "ASSE contributes about 35% of the budget, covering general hospital supplies and services; the foundation's donations fund the other 65%, including home-based care.",
    ],
    whatItMeans: "A model in which a charity and the public health service share one referral centre, with care free to families, which the authors present as aligned with WHO's CureAll approach.",
    caveats: ["Written by clinicians from the model it describes.", "The abstract does not give the survival cohort's years or source."],
    institutions: ["fundacion-perez-scremini", "who"], cancers: ["childhood-cancers"],
    links: [doi("10.26633/rpsp.2026.61", "Rev Panam Salud Publica 2026"), pubmed("42516614")] }),

  p({ id: "paper-abascal-uruguay-tobacco-control-lancet-2012", name: "Uruguay's tobacco control campaign: a population-based trend analysis",
    journal: "The Lancet", year: 2012, doi: "10.1016/s0140-6736(12)60826-5", pmid: "22981904", authors: "Abascal W, Esteves E, Goja B, et al.", paperType: "observational",
    tldr: "After Uruguay began comprehensive anti-smoking measures in 2005, cigarette consumption per person fell by 4.3% a year to 2011 while it rose slightly in neighbouring Argentina, and smoking fell faster among Uruguayan teenagers and adults.",
    summary: "Published as \"Tobacco control campaign in Uruguay: a population-based trend analysis\". The authors compared Uruguay with neighbouring Argentina, which had not adopted such extensive measures, on three endpoints: cigarette consumption per person from tax records, tobacco use among students aged 13, 15 and 17 from school surveys, and adult tobacco use from national household surveys.",
    findings: [
      "Per-person cigarette consumption fell by 4.3% a year (95% CI 2.4 to 6.2) in Uruguay during 2005 to 2011, against a rise of 0.6% a year in Argentina.",
      "Thirty-day tobacco use among Uruguayan students fell by about 8.0% a year in 2003 to 2009, against 2.5% a year in Argentinian students.",
      "Current tobacco use among Uruguayan adults fell by about 3.3% a year from 2005 to 2011, against 1.7% in Argentina.",
    ],
    whatItMeans: "Evidence that Uruguay's package of smoke-free laws, advertising bans, large warnings and taxes was followed by an unusually fast fall in smoking, which matters for the lung and other tobacco-related cancers that make up more than half of its cancer deaths.",
    caveats: ["A comparison of trends between two countries, not a trial; other differences between them could contribute."],
    institutions: ["msp-uruguay"], cancers: ["lung-cancer"],
    links: [doi("10.1016/s0140-6736(12)60826-5", "Lancet 2012"), pubmed("22981904")] }),
];

/** Records behind /countries/uy/ (wave 10). */
export const recordsUY: EntityInput[] = [...institutions, ...papers];
