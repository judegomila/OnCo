import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Morocco: the public bodies, the registry, the foundation, the cancer centre and the papers behind /countries/ma/
 * (wave 5) that the corpus did not hold. Each was written from its own primary source, read raw on 11 November 2026, in
 * French where that is the original: the Plan National de Prévention et de Contrôle du Cancer 2020 to 2029 (PDF text,
 * French edition; the Arabic edition on the ICCP portal was checked against it), the Registre des Cancers de la Région
 * du Grand Casablanca's incidence report for 2013 to 2017 (PDF text from the Fondation Lalla Salma's site), the
 * Foundation's own pages, and press reports of ministers' statements and official notes (Hespress, Aujourd'hui le Maroc,
 * Le360, Finances News Hebdo), each named where it is used. The websites of the medicines agency, the social security
 * fund and the health insurance agency did not answer. Both papers were resolved through Europe PMC and Crossref and are
 * described from their indexed abstracts.
 *
 * Inbound links: the registry, the Foundation, the ministry, the medicines agency, the CNSS and the Casablanca centre
 * link to each other and to the existing Institut National d'Oncologie record; the registry links both papers through
 * keyPapers. Coordinates are city points, not buildings.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PNPCC2 = "https://www.iccp-portal.org/system/files/plans/Plan_National_de_Prevention_et_de_Controle_du_Cancer_2020-2029_VA.pdf";
const PNPCC2_FR = "https://lodj.ma/attachment/2414341";
const RCGC_2013_17 = "https://contrelecancer.ma/site_media/uploaded_files/Registre_des_Cancers_de_la_Region_du_Grand_Casablanca_2013-2017.pdf";
const FLSC = "https://www.contrelecancer.ma/fr/alsc";
const FLSC_PNPCC = "https://www.contrelecancer.ma/fr/le_pnpcc";
const FLSC_ACCES = "https://www.contrelecancer.ma/fr/hopitaux_acces_aux_medicaments";
const FLSC_MV = "https://www.contrelecancer.ma/fr/maisons-de-vie/";
const HES_REVIEW_2026 = "https://fr.hespress.com/481494-lutte-contre-le-cancer-le-ms-veut-accelerer-la-prevention-et-reduire-les-inegalites-dacces-aux-soins.html";
const AUJ_REVIEW_2026 = "https://aujourdhui.ma/?p=524782";
const HES_AMMPS_2025 = "https://fr.hespress.com/454502-ca-ammps-tahraoui-fixe-le-cap-de-la-souverainete-sanitaire.html";
const L360_LAW_10_22 = "https://fr.le360.ma/politique/chambre-des-representants-adoption-du-projet-de-loi-sur-la-creation-de-lagence-des-medicaments_FPLLIXKSPBCEPE6TPIZ5B7CFQQ/";
const FNH_2026 = "https://www.fnh.ma/article/actualite-economique/reglementation-pharmaceutique-maroc-pharmacovigilance-reforme";
const HES_CNSS_2026 = "https://fr.hespress.com/487088-cnss-plus-de-25-millions-de-beneficiaires-de-lamo-en-2025-en-hausse-de-3.html";
const HES_AMO_89 = "https://fr.hespress.com/495393-amo-plus-de-4-millions-de-marocains-toujours-exclus-malgre-un-taux-de-couverture-de-89.html";
const HES_TADAMON_2024 = "https://fr.hespress.com/392505-amo-tadamon-1551-mmdh-de-cotisations-des-beneficiaires-versees-par-letat-a-la-cnss.html";

const institutions: InstitutionInput[] = [
  i({ id: "casablanca-cancer-registry", name: "Registre des Cancers de la Région du Grand Casablanca (Greater Casablanca cancer registry)", aka: ["RCGC", "Casablanca Cancer Registry", "Registre des cancers du Grand Casablanca"],
    city: "Casablanca", country: "MA", lat: 33.573, lng: -7.589, institutionType: "consortium",
    tldr: "Morocco's population-based cancer registry for the Greater Casablanca region, set up in 2004 and supported by the Fondation Lalla Salma since 2005. It recorded 25,143 new cancers among residents in 2013 to 2017, and the 2020 to 2029 national cancer plan built its situation analysis on the registry's data.",
    summary: "The registry was set up in 2004 on the initiative of teachers and researchers at the Casablanca faculty of medicine and pharmacy, and has been supported by the Fondation Lalla Salma since 2005, according to its fourth incidence report. Its mission of active cancer surveillance in the covered area was attributed to it by the Ministry of Health. It collects every new invasive cancer diagnosed since 1 January 2004 in residents of the region as drawn in 2003 (the prefectures of Casablanca and Mohammedia and the provinces of Médiouna and Nouaceur, 1,140.54 square kilometres), from public hospitals, oncology centres, private clinics and public and private pathology laboratories, with deaths taken from the municipal hygiene offices' death records. The report states that it follows IARC's standards, that in 2018 it was named an IARC collaborating centre in Africa for training in cancer registration, and that it is a member of the registry hub of WHO's Eastern Mediterranean region. The coordinates are a Casablanca city point.\n\nIt has published incidence reports for 2004, 2005 to 2007, 2008 to 2012 and 2013 to 2017. The last counts 25,143 new cancers (10,557 in men, 14,586 in women), an age-standardised incidence on the world population of 101.9 per 100,000 men and 123.0 per 100,000 women, with breast cancer (5,555 cases in women, 45.6 per 100,000), lung cancer in men (2,698 cases, 25.8 per 100,000), cervical cancer (1,187 cases, 10.2 per 100,000), prostate cancer (1,438 cases, 15.3 per 100,000) and thyroid cancer in women (1,651 cases, 13.4 per 100,000) among the commonest. The report names Professor Abdellatif Benider, director of the Centre Mohammed VI for cancer treatment at the Ibn Rochd university hospital, as the registry's director and Dr Karima Bendahhou, an epidemiologist, as the person responsible for it. The 2020 to 2029 national cancer plan used its data for the situation analysis and, in measure 7.15, commits to consolidating it and publishing a report every two years, alongside a national children's cancer registry and hospital registries in every regional oncology centre.",
    programs: ["Population-based registration for Greater Casablanca (since 2004)", "Incidence reports for 2004, 2005 to 2007, 2008 to 2012 and 2013 to 2017", "Training in cancer registration for registries in Africa"],
    institutions: ["fondation-lalla-salma", "ministry-of-health-morocco", "centre-mohammed-vi-casablanca", "institut-national-oncologie-rabat", "iarc"],
    people: ["karima-bendahhou"],
    keyPapers: ["paper-chellat-casablanca-registry-survey-j-cancer-policy-2026", "paper-tazi-rabat-cancer-incidence-ecancer-2013"],
    cancers: ["breast-cancer", "cervical", "prostate", "thyroid", "colorectal"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "RCGC: Registre des cancers de la région du Grand Casablanca, rapport d'incidence 2013 to 2017 (PDF, Fondation Lalla Salma)", url: RCGC_2013_17 },
      { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029, measure 7.15 (PDF)", url: PNPCC2_FR },
      doi("10.1016/j.jcpo.2026.100774", "Chellat et al., use of the Casablanca cancer registry (Journal of Cancer Policy 2026)"),
    ] }),

  i({ id: "fondation-lalla-salma", name: "Fondation Lalla Salma, Prévention et traitement des cancers", aka: ["Fondation Lalla Salma", "Lalla Salma Foundation", "FLSC", "مؤسسة للا سلمى"],
    city: "Rabat", country: "MA", lat: 34.02, lng: -6.84, institutionType: "consortium", website: "https://www.contrelecancer.ma",
    tldr: "A Moroccan non-profit foundation, recognised as being of public utility, created in 2005 on the initiative of Princess Lalla Salma. It wrote and carried out Morocco's two national cancer plans with the Ministry of Health, and runs a programme that gives low-income patients cancer medicines free in public hospitals, as well as lodging houses near oncology centres.",
    summary: "The Foundation describes itself as a non-governmental, non-profit foundation recognised as being of public utility, created in 2005 on the initiative of Princess Lalla Salma, financed only by partnerships with national and international bodies and by private donors, and governed by a board and a scientific council, with a central office and regional committees. The coordinates are a Rabat city point.\n\nWith the Ministry of Health it drew up the first Plan National de Prévention et de Contrôle du Cancer, launched on 24 March 2010 with 78 measures, and the second, for 2020 to 2029. Its programmes include ACCES (access to medicines for patients of modest income), which provides cancer medicines in public facilities without any payment by the patient and aims at 100% access to chemotherapy for low-income patients without health cover; the building, equipping and refurbishing of oncology centres and paediatric oncology units with the ministry; and the maisons de vie, houses near oncology centres where patients and their families stay during outpatient treatment, the first opened in Casablanca in May 2007, each offering 6,000 to 12,000 nights a year with occupancy of 60% to 89%. It has supported the Greater Casablanca cancer registry since 2005 and published its incidence reports.",
    programs: ["National cancer plans with the Ministry of Health (2010 to 2019, 2020 to 2029)", "ACCES: cancer medicines for low-income patients", "Maisons de vie (patient lodging)", "Support for the Greater Casablanca cancer registry", "Tobacco cessation centres and smoke-free schools and companies"],
    institutions: ["ministry-of-health-morocco", "casablanca-cancer-registry", "institut-national-oncologie-rabat", "centre-mohammed-vi-casablanca"],
    cancers: ["breast-cancer", "cervical"], related: ["global-oncology-access"],
    links: [
      { label: "Fondation Lalla Salma: who we are", url: FLSC },
      { label: "Fondation Lalla Salma: how it works (governance)", url: "https://www.contrelecancer.ma/fr/fonctionnement" },
      { label: "Fondation Lalla Salma: the national cancer plan", url: FLSC_PNPCC },
      { label: "Fondation Lalla Salma: hospitals and access to medicines", url: FLSC_ACCES },
      { label: "Fondation Lalla Salma: maisons de vie", url: FLSC_MV },
    ] }),

  i({ id: "ministry-of-health-morocco", name: "Ministère de la Santé et de la Protection Sociale (Morocco)", aka: ["Ministry of Health and Social Protection, Morocco", "Ministère de la Santé du Maroc", "وزارة الصحة والحماية الاجتماعية"],
    city: "Rabat", country: "MA", lat: 34.02, lng: -6.84, institutionType: "government", website: "https://www.sante.gov.ma",
    tldr: "Morocco's health ministry. It co-owns the national cancer plan with the Fondation Lalla Salma, runs the public regional oncology centres and the breast and cervical early detection programme, buys cancer medicines for public centres, and supervises the new medicines agency.",
    summary: "The ministry and the Fondation Lalla Salma wrote and implemented both national cancer plans. The 2020 to 2029 plan, built on the first plan's evaluations and the Greater Casablanca registry's data, records ten operational regional oncology centres, two paediatric haemato-oncology centres in the Casablanca and Rabat university hospitals, 45 linear accelerators (21 public, 24 private), breast screening every two years for women aged 40 to 69 and cervical screening every three years for women aged 30 to 49, both free in the public sector, and sets out an investment budget of 7.83 billion dirhams over ten years. The coordinates are a Rabat city point.\n\nAt the plan's mid-term review on 15 July 2026, chaired by the minister, Amine Tahraoui, the ministry reported that public oncology centres follow more than 110,000 patients a year, nearly 24,000 of them new cases, that 59 reproductive health reference centres take part in early detection, and that it spends close to 200 million dirhams a year on cancer medicines for all oncology centres, including innovative ones; the minister said screening, diagnosis and treatment are already largely free in the public sector whatever a patient's income or cover. The steering committee named HPV vaccination coverage as a weakness and approved priorities for 2027 to 2029, including integrating the plan into the new territorial health groups. The ministry introduced the HPV vaccine into the national immunisation schedule in October 2022.",
    programs: ["Plan National de Prévention et de Contrôle du Cancer 2020 to 2029", "Regional oncology centres", "Early detection of breast and cervical cancer", "HPV vaccination in the national immunisation programme (since 2022)", "Purchase of cancer medicines for public oncology centres"],
    institutions: ["fondation-lalla-salma", "ammps-morocco", "cnss-morocco", "casablanca-cancer-registry", "institut-national-oncologie-rabat", "centre-mohammed-vi-casablanca"],
    cancers: ["breast-cancer", "cervical"], related: ["global-oncology-access", "hpv-vaccine"],
    links: [
      { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029 (French, PDF)", url: PNPCC2_FR },
      { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029 (Arabic, PDF, ICCP portal)", url: PNPCC2 },
      { label: "Hespress: mid-term review of the cancer plan (15 July 2026)", url: HES_REVIEW_2026 },
      { label: "Aujourd'hui le Maroc: priorities for 2027 to 2029 (17 July 2026)", url: AUJ_REVIEW_2026 },
    ] }),

  i({ id: "ammps-morocco", name: "Agence Marocaine du Médicament et des Produits de Santé (AMMPS)", aka: ["AMMPS", "Moroccan Agency of Medicines and Health Products", "Direction du Médicament et de la Pharmacie", "DMP"],
    city: "Rabat", country: "MA", lat: 34.02, lng: -6.84, institutionType: "government", website: "https://ammps.sante.gov.ma",
    tldr: "Morocco's medicines regulator, created by law 10-22 to replace the health ministry's Direction du Médicament et de la Pharmacie. It authorises and monitors medicines and other health products, sets the essential medicines list with other departments, and runs pharmacovigilance.",
    summary: "Bill 10-22 creating the agency was adopted by the House of Representatives' social sectors committee and then by the House in February 2023; the health minister of the time described its role as carrying out the state's policy on pharmaceutical sovereignty and on the availability, safety and quality of medicines and health products. Under the bill it coordinates national pharmaceutical policy, regulates and inspects the sector, oversees narcotics and psychotropic substances, promotes local manufacture of generics and biosimilars, and draws up and updates the list of essential medicines in coordination with the sectors concerned. The coordinates are a Rabat city point.\n\nThe agency's first board meeting, chaired by the head of government, approved its strategy, 2025 budget and organisation; at the second, on 17 December 2025, the health minister reviewed its 2025 management report and its programme for 2026. In a May 2026 interview with Finances News Hebdo, a pharmaceutical industry analyst, Abdelmadjid Belaïche, named Professor Samir Ahid as its director, said it now covers medicines, vaccines, biological products, medical devices, cosmetics, supplements and diagnostic reagents, has taken over pharmacovigilance from the poison and pharmacovigilance centre, and works towards WHO maturity level 3, and listed decrees of 2026 on import visas for medicines (2.26.28) and on biomedical research (2.26.223). The agency's own site did not answer when this record was written, so no approval times or reliance procedures are stated here.",
    programs: ["Marketing authorisation of medicines", "Essential medicines list", "Pharmacovigilance and other vigilances", "Inspection of pharmaceutical establishments", "Price dossiers and supply monitoring"],
    institutions: ["ministry-of-health-morocco", "cnss-morocco"],
    related: ["who-essential-medicines"],
    links: [
      { label: "Le360: House of Representatives adopts bill 10-22 (1 March 2023)", url: L360_LAW_10_22 },
      { label: "Hespress: second board meeting of the AMMPS (17 December 2025)", url: HES_AMMPS_2025 },
      { label: "Finances News Hebdo: interview on pharmaceutical regulation (18 May 2026)", url: FNH_2026 },
    ] }),

  i({ id: "cnss-morocco", name: "Caisse Nationale de Sécurité Sociale (CNSS), Morocco", aka: ["CNSS", "Caisse Nationale de Sécurité Sociale", "الصندوق الوطني للضمان الاجتماعي"],
    city: "Casablanca", country: "MA", lat: 33.573, lng: -7.589, institutionType: "government", website: "https://www.cnss.ma",
    tldr: "Morocco's social security fund, which manages compulsory health insurance (AMO) for private-sector employees, the self-employed, people without paid work who can contribute (AMO Achamil), and people the state pays for (AMO Tadamon, which replaced the RAMED medical assistance scheme from December 2022).",
    summary: "The CNSS manages the compulsory health insurance schemes created or extended by Morocco's generalisation of social protection. AMO Tadamon succeeded the RAMED medical assistance scheme for the economically deprived, with the state paying beneficiaries' contributions from December 2022: 15.51 billion dirhams from December 2022 to the end of September 2024, according to the finance bill note reported by Hespress, which also stated that the state covers the patient's share (ticket modérateur) for Tadamon beneficiaries treated in public facilities with an annual budget of one billion dirhams. The coordinates are a Casablanca city point.\n\nAfter its board meeting in September 2026 the CNSS reported 25.08 million AMO beneficiaries in 2025 and 22.65 billion dirhams of benefits paid; AMO Tadamon covered 3.95 million people for 8.49 billion dirhams (a count that matches the ministry's figure of about four million principal insured persons, not its 11.1 million beneficiaries including dependants), and AMO Achamil 265,551 insured persons. The health ministry's note on the 2027 finance bill, as reported, put health cover at more than 32 million people in 2025, about 89% of the population, against 42% before the reform, with 11.1 million Tadamon beneficiaries holding open rights, and said that affiliation does not always mean effective access to care. The CNSS website did not answer when this record was written, so the list of conditions it reimburses in full, including cancers, could not be read.",
    programs: ["AMO for private-sector employees", "AMO TNS (self-employed)", "AMO Tadamon (state-paid, successor to RAMED)", "AMO Achamil (people without paid work who can contribute)"],
    institutions: ["ministry-of-health-morocco", "ammps-morocco"],
    related: ["global-oncology-access"],
    links: [
      { label: "Hespress: CNSS, more than 25 million AMO beneficiaries in 2025 (4 September 2026)", url: HES_CNSS_2026 },
      { label: "Hespress: AMO, 89% covered and more than four million still excluded (7 November 2026)", url: HES_AMO_89 },
      { label: "Hespress: AMO Tadamon contributions paid by the state (25 October 2024)", url: HES_TADAMON_2024 },
    ] }),

  i({ id: "centre-mohammed-vi-casablanca", name: "Centre Mohammed VI pour le traitement des cancers, CHU Ibn Rochd, Casablanca", aka: ["Centre Mohammed VI de traitement des cancers", "Mohammed VI Cancer Treatment Center", "CHU Ibn Rochd oncology centre"],
    city: "Casablanca", country: "MA", lat: 33.58, lng: -7.62, institutionType: "cancer-center",
    tldr: "The cancer treatment centre of the Ibn Rochd university hospital in Casablanca. Its director led the Greater Casablanca cancer registry, it hosts a Fondation Lalla Salma volunteers' office and a gynaecological and breast oncology centre of excellence, and Casablanca has one of the country's two paediatric haemato-oncology centres.",
    summary: "The Greater Casablanca registry's 2013 to 2017 report names Professor Abdellatif Benider as director of the Centre Mohammed VI for cancer treatment at the CHU Ibn Rochd and as director of the registry. The 2020 to 2029 national cancer plan lists centres of excellence created under the first plan, among them gynaecological and breast oncology in Casablanca and in Rabat and thoracic surgery in Casablanca, and two operational paediatric haemato-oncology centres at the Casablanca and Rabat university hospitals; it does not say which buildings house them. The Fondation Lalla Salma lists a volunteers' office at the CHU Ibn Rochd's Centre Mohammed VI. The coordinates are an approximate Casablanca city point, not the building.",
    programs: ["Radiotherapy and medical oncology", "Gynaecological and breast oncology (Casablanca centre of excellence)", "Fondation Lalla Salma volunteers' office"],
    institutions: ["casablanca-cancer-registry", "fondation-lalla-salma", "ministry-of-health-morocco", "institut-national-oncologie-rabat"],
    cancers: ["breast-cancer", "cervical"],
    links: [
      { label: "RCGC: incidence report 2013 to 2017, registry team (PDF)", url: RCGC_2013_17 },
      { label: "Plan National de Prévention et de Contrôle du Cancer 2020 to 2029 (French, PDF)", url: PNPCC2_FR },
      { label: "Fondation Lalla Salma: volunteering programme and offices", url: "https://www.contrelecancer.ma/fr/" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-tazi-rabat-cancer-incidence-ecancer-2013", name: "Cancer incidence in Rabat, Morocco, 2006 to 2008",
    journal: "ecancermedicalscience", year: 2013, doi: "10.3332/ecancer.2013.338", pmid: "23940493", authors: "Tazi MA, Er-Raki A, Benjaafar N", paperType: "observational",
    tldr: "A population-based cancer incidence report that its authors described as the first from Morocco: 2,473 new cancers among Rabat residents in 2006 to 2008, with breast and cervical cancer leading in women and lung and prostate cancer in men.",
    summary: "Published as \"Cancer incidence in Rabat, Morocco: 2006-2008\" whose first author is at the Institut National d'Oncologie in Rabat; the authors wrote that no population-based incidence data from Morocco had been published before. The Rabat registry collects all new cancers diagnosed in residents of the Rabat area, with registry staff visiting hospitals, pathology laboratories and private clinics.",
    findings: [
      "2,473 new cancers were registered among Rabat residents in 2006 to 2008.",
      "The world age-standardised rate for all sites was 136.6 per 100,000 men and 114.5 per 100,000 women.",
      "In men the commonest cancers were lung (19.0%, 24.8 per 100,000), prostate (15.5%, 22.9), colorectal (8.8%, 12.0), bladder (6.9%) and non-Hodgkin lymphoma (6.0%).",
      "In women they were breast (39.9%, 43.4 per 100,000), cervix (11.4%, 13.0), colorectal (7.5%, 9.0), non-Hodgkin lymphoma and thyroid (3.4% each).",
      "2% of cancers occurred in children aged 0 to 14, about 43% of them haematological.",
    ],
    whatItMeans: "Rabat and Casablanca are the two Moroccan cities with published population-based registry data, and this report shows the pattern later confirmed in Casablanca: breast and cervical cancer in women, lung and prostate cancer in men.",
    caveats: ["One city over three years; rates elsewhere in Morocco may differ.", "No later report from the Rabat registry was found online."],
    institutions: ["institut-national-oncologie-rabat", "casablanca-cancer-registry"], cancers: ["breast-cancer", "cervical", "prostate", "colorectal"],
    links: [doi("10.3332/ecancer.2013.338", "ecancermedicalscience 2013"), pubmed("23940493")] }),

  p({ id: "paper-chellat-casablanca-registry-survey-j-cancer-policy-2026", name: "Awareness and use of the Casablanca cancer registry among Moroccan health stakeholders",
    journal: "Journal of Cancer Policy", year: 2026, doi: "10.1016/j.jcpo.2026.100774", pmid: "42409284", authors: "Chellat FZ, Khazraji YC, Azrib S, et al.", paperType: "observational",
    tldr: "An online survey of 319 people working in cancer control in Morocco: 56.4% knew of the Casablanca cancer registry, and 70.6% of those had used its data, mostly for research rather than planning.",
    summary: "Published as \"Knowledge, perceptions, and utilization of the casablanca cancer registry among health stakeholders in Morocco: An online survey\", with authors from the Cancer Research Institute in Fez, the Fondation Lalla Salma, the Ministry of Health and Social Protection and the Moroccan Association of Cancer Registries. A cross-sectional survey with convenience sampling assessed awareness, use and perceptions of the registry.",
    findings: [
      "319 complete responses were analysed; 56.4% of respondents knew of the registry.",
      "Of the 180 who knew it, 70.6% had used its data at least once, mainly for research, teaching, publications and epidemiology.",
      "Use in health planning and policy remained limited.",
      "Awareness was associated with age group, employment sector, institution and region; use only with institution.",
    ],
    whatItMeans: "The registry that supplies Morocco's incidence figures is known to only about half of the people working in cancer control, and its data are used more for papers than for planning.",
    caveats: ["Convenience sample of an online survey; respondents may not represent all stakeholders."],
    institutions: ["casablanca-cancer-registry", "fondation-lalla-salma"], cancers: [],
    links: [doi("10.1016/j.jcpo.2026.100774", "Journal of Cancer Policy 2026"), pubmed("42409284")] }),
];

/** Records behind /countries/ma/ (wave 5). */
export const recordsMA: EntityInput[] = [...institutions, ...papers];
