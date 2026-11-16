import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Haiti: the public bodies, hospitals and papers behind /countries/ht/ (wave 11) that the corpus did not hold. Each was
 * written from its own primary source, read raw on 11 November 2026: the Ministère de la Santé Publique et de la
 * Population's home page, its list of university hospitals and its register of authorised medicines (the full list of
 * 1,178 products from the page's own data endpoint), the Liste Nationale des Médicaments Essentiels, 2nd edition, January
 * 2020 (PDF text), OFATMA's home page and its 2014 to 2015 annual report (PDF text), PAHO's news releases of 28 June 2021
 * (paediatric cancer plan) and 18 September 2026 (non-communicable disease plan), Dana-Farber's page on its Haiti clinical
 * care, and Partners In Health's 2013 and 2019 articles on cancer care at Mirebalais (read through the Internet Archive,
 * as pih.org refused a plain request). DOIs were resolved through Europe PMC and the figures in `findings` are taken from
 * the indexed abstracts.
 *
 * Inbound links: the Ministry links the pharmacy directorate, OFATMA and the two hospitals, and each links the Ministry
 * back; the papers are linked through the hospitals' and the Ministry's keyPapers. Coordinates are approximate city or
 * district points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MSPP = "https://www.mspp.gouv.ht/";
const MSPP_MEDS = "https://mspp.gouv.ht/medicaments-autorises";
const LNME_2020 = "https://www.mspp.gouv.ht/sites/default/files/2025-12/Liste%20Nationale%20des%20M%C3%A9dicaments%20Essentiels%202e%20%C3%A9dition_publication%202022%20%281%29.pdf";
const PAHO_PED = "https://www.paho.org/fr/nouvelles/28-6-2021-validation-du-plan-national-operationnel-cancer-pediatrique-2021-2026";
const PAHO_NCD = "https://www.paho.org/fr/nouvelles/18-9-2026-haiti-lance-plan-strategique-national-prevention-et-controle-des-maladies-non";
const OFATMA = "https://www.ofatma.gouv.ht/";
const OFATMA_2015 = "https://www.ofatma.gouv.ht/medias/document/rapport_Annuel_2014_2015_web.pdf";
const DFCI_HAITI = "https://dana-farber.org/global-health/global-cancer-medicine/haiti-clinical-care";
const PIH_2013_WB = "https://web.archive.org/web/2026/https://www.pih.org/article/cancer-care-expands-at-university-hospital";
const PIH_2019_WB = "https://web.archive.org/web/2026/https://www.pih.org/article/evolution-cancer-care-haiti";

const institutions: InstitutionInput[] = [
  i({ id: "haiti-mspp", name: "Ministère de la Santé Publique et de la Population, Haiti", aka: ["MSPP", "Ministry of Public Health and Population, Haiti", "Haiti Ministry of Health"],
    city: "Port-au-Prince", country: "HT", lat: 18.54, lng: -72.34, institutionType: "government", website: MSPP,
    tldr: "Haiti's health ministry. Its Direction de Cancérologie validated a national paediatric cancer plan for 2021 to 2026, and in August 2026 it launched a national plan for non-communicable diseases; PAHO reports that its coordination unit for these diseases has a cancer programme.",
    summary: "The Ministère de la Santé Publique et de la Population (MSPP) runs Haiti's public health system and its university hospitals, and publishes the national essential medicines list and a register of authorised medicines through its Direction de la Pharmacie, du Médicament et de la Médecine Traditionnelle. The coordinates are an approximate Port-au-Prince city point.\n\nIn June 2021 its Direction de Cancérologie, with technical support from PAHO/WHO, validated a national operational plan for paediatric cancer for 2021 to 2026, covering data collection on childhood cancers, standard treatment protocols and training in early diagnosis, treatment, supportive and palliative care. On 31 August 2026, with PAHO/WHO, it launched a national strategic plan for the prevention and control of non-communicable diseases and injuries for 2026 to 2031; PAHO reports that these conditions cause more than 65% of deaths in Haiti and that a coordination unit now has programmes for cardiovascular disease, cancers, oral health and injuries.\n\nWHO's cancer country profile for 2020 recorded no national cancer control plan in effect in 2019, no information on a population-based cancer registry, and no external beam radiotherapy.",
    programs: ["Direction de Cancérologie", "National operational plan for paediatric cancer 2021 to 2026", "National strategic plan for non-communicable diseases and injuries 2026 to 2031", "Liste Nationale des Médicaments Essentiels (2nd edition, 2020)", "Register of authorised medicines"],
    institutions: ["haiti-dpm-mt", "ofatma-haiti", "hopital-universitaire-mirebalais", "hopital-saint-damien-haiti", "who", "iarc", "iaea"],
    cancers: ["breast-cancer", "cervical", "childhood-cancers", "prostate"], related: ["global-oncology-access"],
    keyPapers: ["paper-bolous-childhood-cancer-cost-haiti-ecancer-2024", "paper-oneill-oop-free-breast-care-haiti-surgery-2015"],
    links: [
      { label: "MSPP: home page", url: MSPP },
      { label: "PAHO: validation of the national operational plan for paediatric cancer 2021 to 2026 (28 June 2021, French)", url: PAHO_PED },
      { label: "PAHO: Haiti launches its national strategic plan for non-communicable diseases and injuries 2026 to 2031 (18 September 2026, French)", url: PAHO_NCD },
      { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/hti-2020.pdf" },
    ] }),

  i({ id: "haiti-dpm-mt", name: "Direction de la Pharmacie, du Médicament et de la Médecine Traditionnelle (DPM/MT), Haiti", aka: ["DPM/MT", "DPM/MT-MSPP", "Haiti medicines directorate"],
    city: "Port-au-Prince", country: "HT", lat: 18.54, lng: -72.33, institutionType: "government", website: MSPP_MEDS,
    tldr: "The directorate of Haiti's health ministry that deals with medicines. It wrote the national essential medicines list, and the ministry publishes a register of medicines authorised in Haiti.",
    summary: "The Direction de la Pharmacie, du Médicament et de la Médecine Traditionnelle is a directorate of the Ministère de la Santé Publique et de la Population, not a separate agency. It designed and coordinated the second edition of the Liste Nationale des Médicaments Essentiels (January 2020), which lists 596 medicines in 30 therapeutic groups plus a complementary list of 139 products; its cancer medicines, from cytotoxics such as cisplatin, doxorubicin and paclitaxel to imatinib, rituximab, trastuzumab and tamoxifen, are listed for use at tertiary level, in university and specialised hospitals. The list was prepared with WHO experts and GHSC-PSM/USAID and recommends that facilities buy generics. The coordinates are an approximate Port-au-Prince city point.\n\nThe Ministry's website publishes a register of authorised medicines; on 11 November 2026 it held 1,178 products, listed by name, pack, form and strength without dates. A search of it by name found few cancer medicines: tamoxifen, anastrozole, letrozole, bicalutamide, goserelin, imatinib, fluorouracil, methotrexate and zoledronic acid. Haiti does not appear on WHO's list of regulators operating at maturity level 3 or 4 (August 2026).",
    programs: ["Liste Nationale des Médicaments Essentiels (2nd edition, January 2020)", "Register of authorised medicines", "Formulaire Thérapeutique National"],
    institutions: ["haiti-mspp"],
    links: [
      { label: "MSPP: médicaments autorisés (register)", url: MSPP_MEDS },
      { label: "MSPP: Liste Nationale des Médicaments Essentiels, 2nd edition, January 2020 (PDF)", url: LNME_2020 },
      { label: "WHO: list of regulatory authorities operating at maturity level 3 and 4 (August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
    ] }),

  i({ id: "ofatma-haiti", name: "Office d'Assurance Accidents du Travail, Maladie et Maternité (OFATMA)", aka: ["OFATMA", "Haiti workers' accident, sickness and maternity insurance office"],
    city: "Port-au-Prince", country: "HT", lat: 18.55, lng: -72.33, institutionType: "government", website: OFATMA,
    tldr: "Haiti's public social insurance office for work accidents, sickness and maternity. It covers people who pay contributions, mainly formal-sector employees and civil servants, and reported just over half a million insured people and dependants in 2015.",
    summary: "OFATMA was created by decree on 4 November 1983 to offer compulsory or voluntary contributory insurance. Its 2014 to 2015 annual report says that for decades it ran only work accident insurance for private-sector employees, that in August 2014 the state gave it the self-insurance programme for civil servants (run from 1 October 2014), that enrolment in sickness and maternity insurance began in January 2015, and that a voluntary sickness and maternity scheme for people with an income outside the formal system was launched on 31 July 2015. On 30 September 2015 it managed a portfolio of more than half a million insured people and dependants, had 14 regional offices and had agreements with more than 218 care providers. The coordinates are an approximate Port-au-Prince city point.\n\nThe report does not say which cancer treatments the scheme pays for, and OnCo found no later coverage figure on its website, where several pages did not load on 11 November 2026.",
    programs: ["Work accident insurance", "Compulsory sickness and maternity insurance (private sector and civil servants)", "Voluntary sickness and maternity insurance (from July 2015)", "Civil servants' self-insurance (from October 2014)"],
    institutions: ["haiti-mspp"],
    links: [
      { label: "OFATMA: home page", url: OFATMA },
      { label: "OFATMA: annual report 2014 to 2015 (PDF, French)", url: OFATMA_2015 },
    ] }),

  i({ id: "hopital-universitaire-mirebalais", name: "Hôpital Universitaire de Mirebalais", aka: ["University Hospital of Mirebalais", "HUM", "Zanmi Lasante Mirebalais"],
    city: "Mirebalais", country: "HT", lat: 18.83, lng: -72.1, institutionType: "hospital",
    tldr: "A public teaching hospital in Haiti's Central Plateau, built by the government and Partners In Health (Zanmi Lasante) after the 2010 earthquake. Its oncology department gives chemotherapy and cancer surgery, and Dana-Farber calls it the only provider of free oncology services in Haiti.",
    summary: "Partners In Health and its Haitian sister organisation Zanmi Lasante began treating cancer in Cange in the early 2000s and moved oncology services to the new University Hospital in Mirebalais in the summer of 2013; between July and November that year the team saw about 700 patients; from July to September breast cancer was 40% of diagnoses and cervical cancer 12%; and radiotherapy was arranged by referral to a partner hospital in the Dominican Republic. PIH wrote in 2019 that more than 570 patients had been treated for cancer there the year before. The coordinates are an approximate point for the town of Mirebalais.\n\nDana-Farber's Center for Global Cancer Medicine has worked with PIH in Haiti since 2012. Its page says the hospital serves more than 45 patients a day in its outpatient cancer clinic, moved into the Centre Roselene Jean Bosquet in 2018, and offers chemotherapy, cancer surgery, basic pathology and an area for mixing chemotherapy, with weekly tumour boards, standard protocols and second-opinion pathology at Brigham and Women's Hospital. In a cohort of 341 women with non-metastatic breast cancer treated there from 2012 to 2016, 55.1% had locally advanced disease and event-free survival was 80.9% at two years and 63.4% at three. OnCo could not confirm how the hospital is operating in November 2026 amid Haiti's insecurity.",
    programs: ["Oncology department (from 2013)", "Breast cancer surgery and chemotherapy", "Cancer screening, including biopsies and pathology (2013)","Dana-Farber collaboration: tumour boards and protocols"],
    institutions: ["haiti-mspp", "dana-farber"], cancers: ["breast-cancer", "cervical"],
    keyPapers: ["paper-fadelu-nonmetastatic-breast-haiti-oncologist-2020", "paper-oneill-oop-free-breast-care-haiti-surgery-2015"],
    links: [
      { label: "Dana-Farber: CGCM and Haiti clinical care", url: DFCI_HAITI },
      { label: "Partners In Health: cancer care expands at University Hospital (20 December 2013; read through the Internet Archive)", url: PIH_2013_WB },
      { label: "Partners In Health: the evolution of cancer care in Haiti (19 March 2019; read through the Internet Archive)", url: PIH_2019_WB },
      doi("10.1634/theoncologist.2019-0951", "Fadelu et al., non-metastatic breast cancer in Haiti (Oncologist 2020)"),
    ] }),

  i({ id: "hopital-saint-damien-haiti", name: "Hôpital Saint-Damien (Nos Petits Frères et Sœurs)", aka: ["St Damien Hospital", "Hôpital Saint Damien"],
    city: "Port-au-Prince", country: "HT", lat: 18.58, lng: -72.27, institutionType: "hospital",
    tldr: "A hospital in the Port-au-Prince area that PAHO in 2021 called the only care centre in Haiti with a paediatric oncology service. In 2017 to 2018 its unit treated about 74 children newly diagnosed with cancer a year.",
    summary: "PAHO's news release of June 2021 on the national paediatric cancer plan quotes a representative of Saint-Damien hospital, which it describes as the only care centre in the country with a paediatric oncology service; St Jude Global Alliance took part in the plan's validation workshop. The costing paper gives its authors' affiliation as Nos Petit Frères et Sœurs-St Damien Hospital, Port-au-Prince. The coordinates are an approximate point for the Port-au-Prince area, not the building.\n\nA costing study by researchers from St Jude Children's Research Hospital and the hospital, using 2017 or 2018 records, describes childhood cancer services in Haiti as provided by a single hospital with the only dedicated paediatric oncology department in the country. Operating the unit for 74 newly diagnosed patients a year cost 803,184 US dollars, or 10,854 dollars per patient, with pharmacy the largest cost (25%), and the cost per disability-adjusted life year averted was 1,128 dollars, 76% of GDP per head, which the authors judged very cost-effective.",
    programs: ["Paediatric oncology department"],
    institutions: ["haiti-mspp", "st-jude"], cancers: ["childhood-cancers"],
    keyPapers: ["paper-bolous-childhood-cancer-cost-haiti-ecancer-2024"],
    links: [
      { label: "PAHO: validation of the national operational plan for paediatric cancer 2021 to 2026 (28 June 2021, French)", url: PAHO_PED },
      doi("10.3332/ecancer.2024.1675", "Bolous et al., cost and cost-effectiveness of childhood cancer treatment in Haiti (ecancermedicalscience 2024)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-fadelu-nonmetastatic-breast-haiti-oncologist-2020", name: "Outcomes of non-metastatic breast cancer treated in Haiti: a retrospective cohort",
    journal: "The Oncologist", year: 2020, doi: "10.1634/theoncologist.2019-0951", pmid: "32584461", authors: "Fadelu T, Damuse R, Lormil J, et al.", paperType: "observational", participants: 341,
    tldr: "Among 341 women with breast cancer that had not spread, treated at the University Hospital of Mirebalais from 2012 to 2016, most had locally advanced disease, and about two thirds were alive without progression or recurrence at three years.",
    summary: "Published as \"Patient Characteristics and Outcomes of Nonmetastatic Breast Cancer in Haiti: Results from a Retrospective Cohort\". The cohort included female patients with non-metastatic breast cancer presenting between June 2012 and December 2016; the primary endpoint was event-free survival (time to progression, recurrence or death).",
    findings: [
      "Median age at diagnosis was 49 years and 64.2% were premenopausal; 55.1% had locally advanced disease.",
      "Curative-intent surgery was performed in 278 patients (81.5%); 82.0% of patients with oestrogen receptor-positive disease received adjuvant endocrine therapy.",
      "Event-free survival was 80.9% at two years and 63.4% at three; locally advanced stage had an adjusted hazard ratio of 3.27 against early stage.",
    ],
    whatItMeans: "Breast cancer in Haiti is often found late and outcomes are worse than in high-income countries, but curative treatment is possible there.",
    caveats: ["Retrospective, from one hospital.", "The authors note several limitations, including follow-up."],
    institutions: ["hopital-universitaire-mirebalais", "dana-farber"], cancers: ["breast-cancer"],
    links: [doi("10.1634/theoncologist.2019-0951", "Oncologist 2020"), pubmed("32584461")] }),

  p({ id: "paper-oneill-oop-free-breast-care-haiti-surgery-2015", name: "Out-of-pocket costs for women receiving free breast cancer care in Haiti",
    journal: "Surgery", year: 2015, doi: "10.1016/j.surg.2015.04.040", pmid: "26150200", authors: "O'Neill KM, Mandigo M, Pyda J, et al.", paperType: "observational", participants: 61,
    tldr: "Even when breast cancer treatment at the University Hospital of Mirebalais was free, more than two thirds of 61 women interviewed met criteria for catastrophic spending, counting travel, meals and care elsewhere, and half went into debt.",
    summary: "Published as \"Out-of-pocket expenses incurred by patients obtaining free breast cancer care in Haiti: A pilot study\". Sixty-one patients receiving free breast cancer care at the Hôpital Universitaire de Mirebalais were interviewed between March and May 2014 about medical costs at other facilities and non-medical costs such as transport and meals.",
    findings: [
      "Median total out-of-pocket expense, including medical costs, was 717 US dollars; median patient income was 1,333 dollars.",
      "52% of participants said they went into debt to pay these expenses.",
      "More than two thirds met conservative criteria for catastrophic medical expenses (more than 40% of potential household income).",
    ],
    whatItMeans: "Free treatment does not make cancer care free for a family: transport, food, lost wages and tests elsewhere can still be ruinous.",
    caveats: ["A pilot study with a convenience sample of 61 patients at one hospital."],
    institutions: ["hopital-universitaire-mirebalais"], cancers: ["breast-cancer"],
    links: [doi("10.1016/j.surg.2015.04.040", "Surgery 2015"), pubmed("26150200")] }),

  p({ id: "paper-bolous-childhood-cancer-cost-haiti-ecancer-2024", name: "The cost and cost-effectiveness of treating childhood cancer in Haiti",
    journal: "ecancermedicalscience", year: 2024, doi: "10.3332/ecancer.2024.1675", pmid: "38439808", authors: "Bolous NS, Mercredi P, Bonilla M, et al.", paperType: "methods", participants: 74,
    tldr: "Running Haiti's only dedicated paediatric oncology unit cost about 10,854 US dollars per newly diagnosed child, and 1,128 dollars per disability-adjusted life year averted, which the authors judged very cost-effective.",
    summary: "Costing data were collected from 2017 or 2018 hospital records of the single hospital with a dedicated paediatric oncology department in Haiti, classified into 11 cost categories, and combined with five-year survival from hospital records to estimate the cost per disability-adjusted life year (DALY) averted, with sensitivity analyses for late effects, early deaths and discount rates.",
    findings: [
      "The unit treated 74 patients with newly diagnosed cancer a year at an annual cost of 803,184 US dollars, or 10,854 dollars per patient.",
      "Pharmacy was the largest cost (25% of the budget), followed by medical personnel (20%) and administration (12%).",
      "Cost per DALY averted was 1,128 dollars, 76% of GDP per head, very cost-effective by WHO-CHOICE criteria; it stayed cost-effective in the most conservative scenario.",
    ],
    whatItMeans: "Evidence written to support Haiti's national cancer planning: treating children with cancer is good value even in the poorest settings.",
    caveats: ["One hospital and one or two years of cost data.", "Survival taken from hospital records."],
    institutions: ["hopital-saint-damien-haiti", "st-jude"], cancers: ["childhood-cancers"],
    links: [doi("10.3332/ecancer.2024.1675", "ecancermedicalscience 2024"), pubmed("38439808")] }),
];

/** Records behind /countries/ht/ (wave 11). */
export const recordsHT: EntityInput[] = [...institutions, ...papers];
