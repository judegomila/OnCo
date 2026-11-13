import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Paraguay: the public bodies and papers behind /countries/py/ (wave 11) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: Law 6266 of 2018 on comprehensive care for people with
 * cancer and Law 6788 of 2021 on DINAVISA (full text on the Biblioteca y Archivo Central del Congreso Nacional),
 * DINAVISA's 2025 annual report (PDF text), the Instituto Nacional del Cáncer's guidelines page, PAHO's April 2026 news
 * release on the imPACT Review and PAHO's 2021 report on its COVID-19 response in Paraguay (PDF text). DOIs were
 * resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links INCAN, DINAVISA and the Instituto de Previsión Social, and each links the Ministry
 * back; the papers are linked through keyPapers. Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const LEY_6266 = "https://www.bacn.gov.py/leyes-paraguayas/8708/ley-n-6266-de-atenci-n-integral-a-las-personas-con-c-ncer";
const LEY_6788 = "https://www.bacn.gov.py/leyes-paraguayas/9645/ley-n-6788-establece-la-competencia-atribuciones-y-estructura-org-nica-de-la-direcci-n-nacional-de-vigilancia-sanitaria";
const DINAVISA_2025 = "https://dinavisa.gov.py/wp-content/uploads/2026/03/Memoria-2025.pdf";
const INCAN_GUIAS = "https://incan.mspbs.gov.py/guias/";
const PAHO_IMPACT = "https://www.paho.org/es/noticias/24-4-2026-paraguay-identifica-brechas-oportunidades-respuesta-al-cancer-con-mision-impact";
const PAHO_COVID = "https://paho.org/sites/default/files/2021-05/OPSPARCOVID-19210002-spa.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "paraguay-ministry-of-health", name: "Ministerio de Salud Pública y Bienestar Social, Paraguay", aka: ["MSPBS", "Ministry of Public Health and Social Welfare, Paraguay", "Ministerio de Salud Paraguay"],
    city: "Asunción", country: "PY", lat: -25.28, lng: -57.63, institutionType: "government", website: "https://www.mspbs.gov.py",
    tldr: "Paraguay's health ministry. Under Law 6266 of 2018 it is the authority for cancer care, runs the public network that PAHO says covers about 70% of Paraguayans, and administers the solidarity fund for cancer care.",
    summary: "The Ministerio de Salud Pública y Bienestar Social is the governing body of Paraguay's national health system. Law 6266 of 2018 on comprehensive care for people with cancer, promulgated on 27 December 2018 and published on 3 January 2019, makes it the authority applying the law, places the Instituto Nacional del Cáncer under it, and requires it to set a national list of anticancer and supportive medicines as part of the national essential medicines list, with treatment protocols built on that list. The law creates a Fondo Solidario para la Atención Integral de las Personas con Cáncer, administered by the Ministry, fed by state budget lines, 40% of a health allocation from the FONACIDE public investment fund, 25% of the participation rate on the tobacco selective consumption tax and 25% of the selective consumption tax collected on alcoholic drinks. The coordinates are an approximate Asunción city point.\n\nPAHO's 2021 report on its COVID-19 response in Paraguay says about 70% of the population has health service coverage through the Ministry's network, 22% through the Instituto de Previsión Social and 5% through private insurers. In April 2026 the Ministry coordinated an imPACT Review of the national cancer response by the IAEA with PAHO and WHO, through its national cancer control programme (PRONAC).",
    programs: ["Law 6266 of 2018 on comprehensive care for people with cancer", "Fondo Solidario para la Atención Integral de las Personas con Cáncer", "Programa Nacional de Control del Cáncer (PRONAC)", "Red Nacional de Atención a las Personas con Cáncer", "imPACT Review (April 2026)"],
    institutions: ["incan-paraguay", "dinavisa-paraguay", "ips-paraguay", "iaea", "who"],
    cancers: ["breast-cancer", "cervical"],
    keyPapers: ["paper-kasamatsu-hrhpv-paraguay-plosone-2019", "paper-codas-itapua-cancer-mortality-canep-2016", "paper-samudio-paediatric-cancer-network-paraguay-jpho-2015"],
    links: [
      { label: "Law 6266 of 2018 on comprehensive care for people with cancer (Congress library, full text)", url: LEY_6266 },
      { label: "PAHO: Paraguay identifies gaps and opportunities in its cancer response with the imPACT mission (25 April 2026)", url: PAHO_IMPACT },
      { label: "PAHO: response to COVID-19 in Paraguay (2021, PDF)", url: PAHO_COVID },
    ] }),

  i({ id: "incan-paraguay", name: "Instituto Nacional del Cáncer, Paraguay (INCAN)", aka: ["INCAN", "National Cancer Institute Paraguay"],
    city: "Capiatá", country: "PY", lat: -25.355, lng: -57.445, institutionType: "cancer-center", website: INCAN_GUIAS,
    tldr: "Paraguay's public cancer institute in Capiatá, near Asunción. By law it treats patients, keeps the national register of people with cancer, assesses cancer technologies and publishes the national cancer treatment guidelines.",
    summary: "Law 6266 of 2018 sets the Instituto Nacional del Cáncer up as a specialised technical body of the Ministry of Public Health and Social Welfare, led by a director general appointed by the minister. Its functions under article 6 include providing specialised cancer care, proposing technical standards and treatment protocols, assessing cancer health technologies for adoption on evidence and cost-effectiveness, administering the national register of people with cancer, running an integrated cancer information system and coordinating the national cancer care network. Article 12 makes every confirmed cancer diagnosis in the country notifiable. The coordinates are an approximate point for Capiatá.\n\nIts guidelines page publishes national guidelines for breast, invasive cervical and colorectal cancer and paediatric leukaemia, a national palliative care plan, a strategic plan for radiotherapy in Asunción, a radiotherapy quality assurance programme, and Ministry resolution 1127 of 2021, which makes multidisciplinary tumour boards compulsory in every institution of the national health system that treats cancer. IAEA DIRAC lists INCAN with three megavoltage machines, all linear accelerators, and brachytherapy. Volunteers from Health Volunteers Overseas reported that between 2012 and 2017 the wait to start radiotherapy for cervical cancer there fell from 2 to 3 months to 4 to 6 weeks.",
    programs: ["Specialised cancer care", "Registro Nacional de Personas con Cáncer (Law 6266, article 12)", "National cancer treatment guidelines", "Radiotherapy and brachytherapy", "Health technology assessment for cancer (Law 6266, article 6)"],
    institutions: ["paraguay-ministry-of-health", "iaea"],
    cancers: ["breast-cancer", "cervical", "colorectal"],
    keyPapers: ["paper-jacobson-incan-paraguay-cervical-radiotherapy-gore-2018"],
    links: [
      { label: "INCAN: oncology guidelines, plans and resolutions of Paraguay", url: INCAN_GUIAS },
      { label: "Law 6266 of 2018, articles 5, 6 and 12 (Congress library)", url: LEY_6266 },
      { label: "IAEA DIRAC: radiotherapy equipment by centre", url: "https://dirac.iaea.org/Data/CountriesLight" },
    ] }),

  i({ id: "dinavisa-paraguay", name: "Dirección Nacional de Vigilancia Sanitaria, Paraguay (DINAVISA)", aka: ["DINAVISA", "National Directorate of Health Surveillance, Paraguay"],
    city: "Asunción", country: "PY", lat: -25.29, lng: -57.62, institutionType: "government", website: "https://dinavisa.gov.py",
    tldr: "Paraguay's medicines regulator. A 2021 law made it an autonomous public body that registers and controls medicines, medical devices and other health products, and its plan aims for recognition by PAHO as a regional reference authority.",
    summary: "Law 6788, promulgated on 23 August 2021 and published the next day, sets out the autonomy, powers and structure of the Dirección Nacional de Vigilancia Sanitaria, making it a public-law body with administrative autonomy and its own assets that relates to the executive through the Ministry of Public Health and Social Welfare. It regulates and controls medicines and other health products. The coordinates are an approximate Asunción city point.\n\nIts 2025 annual report lists among its strategic objectives accreditation by PAHO/WHO as a regional reference regulatory authority, which it does not yet hold; describes cooperation with Brazil's ANVISA and an agreement with Argentina's ANMAT on food standards; speaks of reliance strategies for regulatory decisions; and records its designation as coordinator of the network of pharmacovigilance focal points of the Americas. It also records a tool for setting retail prices of medicines.",
    programs: ["Health registration of medicines (registro sanitario)", "Pharmacovigilance and technovigilance", "Retail price setting for medicines", "Regulatory reliance and cooperation (ANVISA, ANMAT)"],
    institutions: ["paraguay-ministry-of-health", "anvisa", "anmat"],
    links: [
      { label: "Law 6788 of 2021 on DINAVISA (Congress library, full text)", url: LEY_6788 },
      { label: "DINAVISA: annual report 2025 (PDF)", url: DINAVISA_2025 },
    ] }),

  i({ id: "ips-paraguay", name: "Instituto de Previsión Social, Paraguay (IPS)", aka: ["IPS Paraguay", "Social Security Institute of Paraguay"],
    city: "Asunción", country: "PY", lat: -25.3, lng: -57.6, institutionType: "government", website: "https://www.ips.gov.py",
    tldr: "Paraguay's social security institute, which administers social insurance, provides health benefits to its insured members and runs its own hospital services. PAHO put its health coverage at about 22% of Paraguayans in 2021.",
    summary: "The Instituto de Previsión Social is Paraguay's social security institute. Its stated mission is to administer social insurance and guarantee economic and health benefits to its insured members, and it runs its own health services, including the Hospital Central, which the IAEA's imPACT reviewers visited in April 2026. PAHO's 2021 report on its COVID-19 response in Paraguay gives its health coverage as 22% of the population, against about 70% covered by the Ministry's network and 5% by private insurers. Law 6266 of 2018 names it among the institutions of the national health system the cancer law applies to and gives it three seats, for oncology and haemato-oncology physicians, on the national advisory commission for comprehensive cancer care. The coordinates are an approximate Asunción city point.",
    programs: ["Social insurance with health benefits for insured members", "Hospital Central"],
    institutions: ["paraguay-ministry-of-health"],
    links: [
      { label: "Instituto de Previsión Social: mission (portal)", url: "https://portal.ips.gov.py/sistemas/ipsportal/" },
      { label: "PAHO: response to COVID-19 in Paraguay (2021, PDF)", url: PAHO_COVID },
      { label: "Law 6266 of 2018, articles 2 and 8 (Congress library)", url: LEY_6266 },
      { label: "PAHO: imPACT mission to Paraguay (25 April 2026)", url: PAHO_IMPACT },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-kasamatsu-hrhpv-paraguay-plosone-2019", name: "Factors associated with high-risk HPV infection and high-grade cervical neoplasia: a population-based study in Paraguay",
    journal: "PLoS One", year: 2019, doi: "10.1371/journal.pone.0218016", pmid: "31246959", authors: "Kasamatsu E, Rodríguez Riveros MI, Soilan AM, et al.", paperType: "observational", participants: 5677,
    tldr: "Among 5,677 women aged 30 to 64 in Paraguay's Central Department screened with an HPV test and a Pap smear, 13.8% carried a high-risk HPV type.",
    summary: "A population-based study that screened women aged 30 to 64 in the Central Department of Paraguay with the Hybrid Capture 2 HPV test and a Pap smear, interviewed them about risk factors, and referred HPV-positive women to colposcopy and biopsy, to inform whether HPV-based cervical screening could be implemented in Paraguay.",
    findings: ["5,677 women aged 30 to 64 were screened with an HPV test and a Pap smear.", "High-risk HPV prevalence was 13.8% (95% CI 13.0 to 14.8) and fell with age.", "In HPV-positive women, under-screening and multiple pregnancies were associated with CIN2 or worse."],
    whatItMeans: "It gives Paraguay its own figures for planning HPV-based cervical screening, rather than borrowing them from neighbouring countries.",
    caveats: ["One department, Central, which surrounds Asunción; rural departments may differ."],
    cancers: ["cervical"], links: [doi("10.1371/journal.pone.0218016", "DOI"), pubmed("31246959")] }),

  p({ id: "paper-codas-itapua-cancer-mortality-canep-2016", name: "Cancer mortality in Itapúa, a rural province of Paraguay, 2003 to 2012",
    journal: "Cancer Epidemiology", year: 2016, doi: "10.1016/j.canep.2015.11.005", pmid: "26599413", authors: "Codas M, Pesch B, Adolphs M, et al.", paperType: "observational",
    tldr: "Death certificates from Itapúa in southern Paraguay recorded about 2,000 cancer deaths in ten years, with cervical cancer the leading cancer death in women and lower recorded rates in remote districts, where causes of death were often ill-defined.",
    summary: "An analysis of death certificates in Itapúa, a rural department of about 500,000 people, calculating age-standardised cancer mortality rates for 2003 to 2012 and comparing central with remote districts, as a first step towards epidemiological data for cancer prevention in a region where only basic health care is provided.",
    findings: ["About 2,000 cancer deaths were recorded in the decade.", "Age-standardised mortality from all cancers was 90.9 per 100,000 men in central districts against 49.1 in remote districts, and 69.0 against 45.0 in women.", "Cause of death was ill-defined on 19.6% of death certificates, especially in remote areas and among older people.", "The uterus, mainly the cervix, was the leading cancer site in women (17.2 per 100,000 in central and 14.0 in remote districts); lung and prostate led in men."],
    whatItMeans: "Where there is no cancer registry, death certificates are the main count, and this shows how much they can miss in rural Paraguay.",
    caveats: ["The authors judge the true burden most likely underestimated, especially in remote regions and in children."],
    cancers: ["cervical", "lung-cancer", "prostate"], links: [doi("10.1016/j.canep.2015.11.005", "DOI"), pubmed("26599413")] }),

  p({ id: "paper-samudio-paediatric-cancer-network-paraguay-jpho-2015", name: "Building a national pediatric cancer center and network in Paraguay",
    journal: "Journal of Pediatric Hematology/Oncology", year: 2015, doi: "10.1097/MPH.0000000000000338", pmid: "25929610", authors: "Samudio A, Figueredo D, Lassaletta A, et al.", paperType: "observational",
    tldr: "Describes how Paraguay built its first paediatric cancer centre at the National University School of Medicine and a national referral network, and reports better survival and less treatment abandonment for childhood leukaemia after the network began.",
    summary: "A report of the challenges and solutions in building Paraguay's first paediatric cancer centre, at the National University School of Medicine, and the outcomes of the National Network for Pediatric Cancer, and the role of local, national and international contributors.",
    findings: ["Children with acute lymphoblastic leukaemia treated from 2008 to 2012 had higher 3-year survival and lower treatment abandonment than those treated from 2000 to 2007, before the network was established."],
    whatItMeans: "Faster referral and follow-up through a national network is one route other low-resource countries can copy for childhood cancer.",
    caveats: ["The abstract gives no survival percentages; the comparison is before and after, not randomised."],
    cancers: ["childhood-cancers"], links: [doi("10.1097/MPH.0000000000000338", "DOI"), pubmed("25929610")] }),

  p({ id: "paper-jacobson-incan-paraguay-cervical-radiotherapy-gore-2018", name: "Improving quality of care and timely access to radiation therapy for invasive cervical cancer at the National Cancer Institute Paraguay",
    journal: "Gynecologic Oncology Reports", year: 2018, doi: "10.1016/j.gore.2018.06.006", pmid: "29928685", authors: "Jacobson G, Chuang L, Pankow M", paperType: "observational",
    tldr: "Volunteer visits to Paraguay's national cancer institute between 2012 and 2017 coincided with more radiotherapy capacity, 3D planning, chemoradiation with brachytherapy, and the wait to start radiotherapy for cervical cancer falling from 2 to 3 months to 4 to 6 weeks.",
    summary: "A report, based on Health Volunteers Overseas site visits in 2012, 2013 and 2016 and a 2017 follow-up from the site, of interventions at the National Cancer Institute Paraguay to improve treatment quality and efficiency for cervical cancer, with an emphasis on radiotherapy quality and access.",
    findings: ["The wait to start radiotherapy fell from 2 to 3 months to 4 to 6 weeks.", "The centre moved from 2D to 3D planning and began offering concurrent chemoradiation including brachytherapy for locally advanced cervical cancer.", "By ASCO's resource-stratified guidelines the practice moved from a basic to an enhanced setting."],
    whatItMeans: "For women with cervical cancer at INCAN, more access to external beam radiotherapy and brachytherapy shortened the wait to start treatment.",
    caveats: ["A descriptive report by the volunteers involved, not a controlled study."],
    cancers: ["cervical"], institutions: ["incan-paraguay"], links: [doi("10.1016/j.gore.2018.06.006", "DOI"), pubmed("29928685")] }),
];

/** Records behind /countries/py/ (wave 11). */
export const recordsPY: EntityInput[] = [...institutions, ...papers];
