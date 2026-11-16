import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Ethiopia: the public bodies and papers behind /countries/et/ (wave 4) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 4 November 2026: the Federal Ministry of Health's Integrated National
 * Cancer Control Plan 2025 to 2029 (PDF text, posted on the ICCP portal on 24 January 2025), the Ethiopian Health
 * Insurance Service's news pages, the Ethiopian Food and Drug Authority's home page, its maturity level 3 announcement,
 * its 2024 reliance guideline for GMP inspection and its 2025 clinical trial authorisation guideline (PDF text), and the
 * African Cancer Registry Network's member page for the Addis Ababa registry. DOIs were resolved through Europe PMC and
 * the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the regulator, the insurer and its two priority-setting papers; the
 * registry links its three incidence papers through keyPapers and the Ministry back. Tikur Anbessa Specialized Hospital
 * and the Mathiwos Wondu Foundation already exist (centres-wave3.ts, uicc-societies.ts) and are reused, not duplicated.
 * Coordinates for the three Addis Ababa bodies are approximate city or district points, not building positions.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCCP_2025 = "https://www.iccp-portal.org/sites/default/files/plans/NCCP%20Ethiopia%20Final%20%20Submitted%20%20PDF_1.pdf";
const AFCRN_ADDIS = "https://afcrn.org/index.php/membership/membership-list/100-addisababa";
const EHIS_65M = "https://www.ehis.gov.et/en/news/27";
const EHIS_63M = "https://www.ehis.gov.et/en/news/29";
const EHIS_ZIM = "https://www.ehis.gov.et/en/news/30";
const EFDA_ML3 = "https://www.efda.gov.et/efda-attains-who-maturity-level-3-in-medicine-regulation-2/";
const EFDA_GMP_RELIANCE = "https://www.efda.gov.et/wp-content/uploads/2024/07/Guideline-on-Reliance-for-GMP-inspection-scan-pdf.pdf";
const EFDA_CT = "https://www.efda.gov.et/wp-content/uploads/2025/08/GUIDELINE-FOR-CLINICAL-TRIAL-AUTHORIZATION-2025-Version-005-3.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "ethiopia-ministry-of-health", name: "Federal Ministry of Health, Ethiopia", aka: ["Ministry of Health Ethiopia", "FMOH Ethiopia", "MoH Ethiopia"],
    city: "Addis Ababa", country: "ET", lat: 9.03, lng: 38.74, institutionType: "government", website: "https://www.moh.gov.et",
    tldr: "Ethiopia's health ministry. Its non-communicable disease desk wrote the country's cancer control plans, the latest for 2025 to 2029, and it decides with partners which cancer services the essential health services package covers.",
    summary: "The Federal Ministry of Health set up a dedicated coordination unit for non-communicable diseases in 2013 and launched Ethiopia's first costed National Cancer Control Plan for 2016 to 2020, followed by a National Childhood and Adolescent Cancer Control Plan for 2019 to 2023. Its Integrated National Cancer Control Plan 2025 to 2029, led by the Disease Prevention and Control Lead Executive Office and the NCD desk and informed by an IAEA, WHO and IARC imPACT Review mission in November 2023, sets the goal of reducing premature cancer mortality by 15% by 2029 and prioritises breast, cervical and childhood cancers. It is costed at about 141.0 million US dollars over five years. The coordinates on this record are an approximate Addis Ababa city point.\n\nThe plan reports that comprehensive cancer treatment centres grew from 1 to 7, that 30 hospitals now give breast cancer chemotherapy, that clinical oncologists grew from 3 or 4 to over 50, and that cervical screening has reached more than 1,500 public facilities and over 1 million women aged 30 to 49. In February 2022 the Ministry opened Ethiopia's second radiotherapy centre, at Jimma University Hospital, and said seven more were being built.\n\nThe Ministry led the 2019 revision of the essential health services package, which ranked 1,018 interventions using seven criteria including cost-effectiveness and financial risk protection, and the plan records that the package lists 70 interventions for neoplastic conditions. The national essential medicines list (6th edition, 2020) includes 54 essential cancer medicines.",
    programs: ["Integrated National Cancer Control Plan 2025 to 2029", "National Cancer Control Plan 2016 to 2020", "National Childhood and Adolescent Cancer Control Plan 2019 to 2023", "National cervical cancer screening and treatment programme", "Decentralised breast cancer chemotherapy (30 hospitals)", "Essential health services package (revised 2019)"],
    institutions: ["addis-ababa-city-cancer-registry", "efda-ethiopia", "ehis-ethiopia", "tikur-anbessa-hospital", "mathiwos-wondu-foundation", "iaea", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "childhood-cancers"], related: ["global-oncology-access"],
    keyPapers: ["paper-eregata-ethiopia-ehsp-revision-hsr-2020", "paper-kiros-paediatric-oncology-cea-ethiopia-bmjopen-2023", "paper-stroetmann-via-follow-up-ethiopia-oncologist-2024"],
    links: [
      { label: "Integrated National Cancer Control Plan 2025 to 2029 (Federal Ministry of Health, PDF, ICCP portal)", url: NCCP_2025 },
      { label: "ICCP: National Cancer Control Plan of Ethiopia 2025 to 2029 (24 January 2025)", url: "https://www.iccp-portal.org/news/national-cancer-control-plan-ethiopia-2025-2029" },
      { label: "Ministry of Health: radiation therapy centre inaugurated at Jimma University Hospital (20 February 2022)", url: "https://www.moh.gov.et/node/317" },
      doi("10.1080/23288604.2020.1829313", "Eregata et al., revision of the Ethiopian essential health service package (Health Syst Reform 2020)"),
    ] }),

  i({ id: "addis-ababa-city-cancer-registry", name: "Addis Ababa City Cancer Registry", aka: ["Addis Ababa Population-Based Cancer Registry", "AACCR", "AAPBCR"],
    city: "Addis Ababa", country: "ET", lat: 9.013, lng: 38.763, institutionType: "research-institute", website: AFCRN_ADDIS,
    tldr: "Ethiopia's only population-based cancer registry, set up in 2011 at the Radiotherapy Center of Tikur Anbessa Specialized Hospital. It counts new cancers among about 3.7 million residents of the capital, and IARC applies its rates to the whole country.",
    summary: "The Addis Ababa City Cancer Registry was established in September 2011 at the Radiotherapy Center of Tikur Anbessa Specialized Hospital, Addis Ababa University. Its member page on the African Cancer Registry Network, last updated in October 2014, records funding from the German Federal Ministry of Education and Research until March 2014 and then from the American Cancer Society, technical support from Martin Luther University Halle-Wittenberg and the American Cancer Society, more than 20 contact persons trained in health institutions across the city, data entry in CanReg5, and a residence rule of six months in the city. It covers the city's ten sub-cities. The coordinates on this record are those of the hospital campus, approximately.\n\nIts first published data, for 2012 and 2013, counted 4,139 new cancers, two thirds in women. Its 2018 to 2022 report counted 14,053 cancers in a population of about 3.7 million (2020), roughly 3% of Ethiopians, with breast cancer (38.8%) and cervical cancer (14.3%) together just over half of cancers in women, and colorectal cancer the commonest in men. The Ministry of Health's 2025 to 2029 plan calls it the foundation for a national registry, says the registry depends on donors, and plans population-based registries at all five university-affiliated cancer treatment centres. The imPACT reviewers of November 2023 recommended complete coverage of the city so that its data could be accepted in Cancer Incidence in Five Continents, absorbing its staff into Ministry structures, and making cancer a notifiable disease by law.",
    programs: ["Population-based cancer registration for Addis Ababa (from September 2011)", "African Cancer Registry Network member registry"],
    institutions: ["tikur-anbessa-hospital", "ethiopia-ministry-of-health", "iarc"], cancers: ["breast-cancer", "cervical", "colorectal"], related: ["cancer-registries-surveillance", "american-cancer-society"],
    keyPapers: ["paper-gizaw-addis-ababa-incidence-2018-2022-canep-2026", "paper-timotewos-addis-ababa-first-data-canep-2018", "paper-memirie-ethiopia-cancer-incidence-2015-jgo-2018"],
    links: [
      { label: "African Cancer Registry Network: Ethiopia, Addis Ababa City Cancer Registry", url: AFCRN_ADDIS },
      doi("10.1016/j.canep.2026.103048", "Gizaw et al., cancer incidence in Addis Ababa 2018 to 2022 (Cancer Epidemiol 2026)"),
      doi("10.1016/j.canep.2018.01.008", "Timotewos et al., first data from a population based cancer registry in Ethiopia (Cancer Epidemiol 2018)"),
      { label: "Integrated National Cancer Control Plan 2025 to 2029, section 6.2.2 and appendix 2 (PDF)", url: NCCP_2025 },
    ] }),

  i({ id: "efda-ethiopia", name: "Ethiopian Food and Drug Authority (EFDA)", aka: ["EFDA", "Ethiopian Food, Medicine and Healthcare Administration and Control Authority", "EFMHACA", "FMHACA"],
    city: "Addis Ababa", country: "ET", lat: 9.02, lng: 38.75, institutionType: "government", website: "https://www.efda.gov.et",
    tldr: "Ethiopia's medicines regulator. It authorises medicines and clinical trials, has relied on stringent foreign regulators' approvals since 2014, and reached the World Health Organization's maturity level 3 for medicine regulation in September 2025.",
    summary: "The Ethiopian Food and Drug Authority is an autonomous federal body established under the Definition of Powers and Duties of the Executive Organs Proclamation No. 1263/2021, with its powers set by Council of Ministers Regulation No. 531/2023; it regulates medicines, medical devices, food, cosmetics, alcohol and tobacco. Its earlier name was the Ethiopian Food, Medicine and Healthcare Administration and Control Authority. The coordinates are an approximate Addis Ababa city point.\n\nOn 29 September 2025 EFDA announced that the World Health Organization had rated it at maturity level 3 for medicine regulation, which it described as making Ethiopia the ninth country in Africa to reach that level. Its reliance guideline for GMP inspection (EFDA/GDL/052, issued July 2024) states that the Authority has relied on stringent regulatory authorities for medicine registration and GMP inspection since 2014, and acknowledges that shortages of essential medicines, a limited number of registered medicines and relatively long waiting times for registration remain challenges.\n\nIts clinical trial authorisation guideline (EFDA/GDL/005, version 5, issued 9 June 2025) sets a routine review time of 45 working days for first feedback on a complete application, up to 90 calendar days for a high-risk trial and no more than 30 calendar days for a non-routine application, and allows the Authority to use decisions and reports from WHO, AVAREF, the EMA and the US FDA.",
    programs: ["Marketing authorisation of medicines", "Reliance on stringent regulatory authorities (since 2014)", "Clinical trial authorisation (EFDA/GDL/005)", "Pharmacovigilance and post-market surveillance", "Tobacco and alcohol control"],
    institutions: ["ethiopia-ministry-of-health"],
    links: [
      { label: "EFDA: about EFDA", url: "https://www.efda.gov.et/" },
      { label: "EFDA: EFDA attains WHO maturity level 3 in medicine regulation (1 October 2025)", url: EFDA_ML3 },
      { label: "EFDA: guideline on reliance for cGMP inspection, EFDA/GDL/052 (PDF)", url: EFDA_GMP_RELIANCE },
      { label: "EFDA: guideline for clinical trial authorization 2025, EFDA/GDL/005 (PDF)", url: EFDA_CT },
    ] }),

  i({ id: "ehis-ethiopia", name: "Ethiopian Health Insurance Service (EHIS)", aka: ["EHIS", "Ethiopian Health Insurance Agency", "EHIA"],
    city: "Addis Ababa", country: "ET", lat: 8.99, lng: 38.76, institutionType: "government", website: "https://www.ehis.gov.et",
    tldr: "Ethiopia's health insurance body. It runs community-based health insurance with district governments, which it reported in 2025 covered 1,195 districts and about 65 million people, 15 million of them with premiums waived.",
    summary: "The Ethiopian Health Insurance Service guides and finances community-based health insurance, which district governments run for households in the informal sector; WHO's December 2022 article on the scheme refers to it both by that name and as the Ethiopian Health Insurance Agency. Its offices are at Gotera, Nifas Silk Lafto sub-city, Addis Ababa; the coordinates are an approximate district point. The scheme was piloted in 13 districts in four regions in 2011 (2003 in the Ethiopian calendar).\n\nIn May 2025 its Deputy Director General said the scheme covered 1,195 districts and that 65 million people benefited, 50 million making payments and 15 million covered although unable to pay. In July 2025 its news page reported the Health Minister giving 63 million beneficiaries in 13.67 million households for the 2017 Ethiopian fiscal year. In August 2025 a consultant presenting for the service said community-based insurance covers 80% of citizens and social health insurance for the formal sector will cover the remaining 20%; beside 65 million members in a population he put at over 115 million (about 57%), the 80% reads as the share the scheme is meant for, not the share enrolled. The Ministry of Health's cancer plan for 2025 to 2029 records that members can use all services available at government facilities, but that because services are often unavailable there, 60 to 70% of member families still pay out of pocket, including for medicines bought privately.",
    programs: ["Community-based health insurance", "Fee waivers for households unable to pay", "Social health insurance (formal sector, planned)"],
    institutions: ["ethiopia-ministry-of-health"],
    links: [
      { label: "EHIS: Somali Region expands community-based health insurance to 37 more woredas (1 June 2025)", url: EHIS_65M },
      { label: "EHIS: community based health insurance and the prosperity journey (6 July 2025)", url: EHIS_63M },
      { label: "EHIS: Ethiopia and Zimbabwe connect on universal health coverage (22 August 2025)", url: EHIS_ZIM },
      { label: "Integrated National Cancer Control Plan 2025 to 2029, section 2.2 (PDF)", url: NCCP_2025 },
      { label: "WHO Africa: community-based health insurance drives Ethiopia's bid for universal health coverage (9 December 2022)", url: "https://www.afro.who.int/countries/ethiopia/news/community-based-health-insurance-drives-ethiopias-bid-universal-health-coverage" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-gizaw-addis-ababa-incidence-2018-2022-canep-2026", name: "Cancer incidence in Addis Ababa, 2018 to 2022, from Ethiopia's only population-based registry",
    journal: "Cancer Epidemiology", year: 2026, doi: "10.1016/j.canep.2026.103048", pmid: "41814110", authors: "Gizaw M, Parkin DM, Asmare S, et al.", paperType: "observational", participants: 14053,
    tldr: "The Addis Ababa registry recorded 14,053 new cancers over 2018 to 2022, two thirds of them in women; breast and cervical cancer led in women and colorectal and prostate cancer in men.",
    summary: "Published as \"Cancer incidence in Addis Ababa, 2018-2022: The only population based cancer registry in Ethiopia\". The authors analysed cancers diagnosed between 2018 and 2022 in the population covered by the Addis Ababa population-based cancer registry, about 3.7 million people in 2020 and about 3% of Ethiopia's population, and compared age-standardised rates with estimates for East Africa, West Africa, the Black population of the United States and the world.",
    findings: [
      "14,053 cancers were recorded: 4,584 in men (age-standardised rate 66.5 per 100,000) and 9,469 in women (113.5 per 100,000).",
      "In men the commonest were colorectal cancer (14.3% of male cancers, 9.8 per 100,000), prostate cancer (12.9%, 11.8) and mouth and pharynx cancer (6.6%, 3.9).",
      "In women the commonest were breast cancer (38.8%, 39.8 per 100,000), cervical cancer (14.3%, 18.9) and colorectal cancer (7.2%, 8.9).",
    ],
    whatItMeans: "These are the latest rates from Ethiopia's only population-based registry, and IARC applies the registry's rates to the whole country; they show breast and cervical cancer dominating in women and a relatively high rate of colorectal cancer.",
    caveats: ["One city, about 3% of the population; rural Ethiopia may differ.", "The authors read the low prostate and liver cancer rates as possible under-diagnosis or under-reporting."],
    institutions: ["addis-ababa-city-cancer-registry", "tikur-anbessa-hospital"], cancers: ["breast-cancer", "cervical", "colorectal"],
    links: [doi("10.1016/j.canep.2026.103048", "Cancer Epidemiol 2026"), pubmed("41814110")] }),

  p({ id: "paper-timotewos-addis-ababa-first-data-canep-2018", name: "First data from Ethiopia's population-based cancer registry: Addis Ababa, 2012 to 2013",
    journal: "Cancer Epidemiology", year: 2018, doi: "10.1016/j.canep.2018.01.008", pmid: "29414637", authors: "Timotewos G, Solomon A, Mathewos A, et al.", paperType: "observational", participants: 4139,
    tldr: "In its first two years the Addis Ababa City Cancer Registry recorded 4,139 new cancers, 67% in women; breast and cervical cancer led in women, and colorectal cancer and non-Hodgkin lymphoma in men.",
    summary: "Published as \"First data from a population based cancer registry in Ethiopia\". The Addis Ababa City Cancer Registry, established in September 2011 and then covering just over three million people, actively collected newly diagnosed cases from 22 hospitals, clinics and diagnostic facilities in the capital, and the paper reports incidence for 2012 to 2013.",
    findings: [
      "4,139 new cancers were recorded in 2012 to 2013, 67% in women.",
      "Average annual age-standardised incidence for all sites was 136.2 per 100,000 women and 70.7 per 100,000 men.",
      "Breast (31.5% of female cancers, 40.6 per 100,000) and cervix (14.1%, 21.5) led in women; colorectal cancer (10.6%, 7.6) and non-Hodgkin lymphoma (10.2%, 6.8) led in men.",
    ],
    whatItMeans: "The first population-based cancer rates for Ethiopia, showing a pattern similar to neighbouring countries apart from colorectal cancer being the commonest cancer in men, which the authors called novel.",
    caveats: ["The registry's first years; completeness of case finding was still being built.", "One city only."],
    institutions: ["addis-ababa-city-cancer-registry", "tikur-anbessa-hospital"], cancers: ["breast-cancer", "cervical", "colorectal"],
    links: [doi("10.1016/j.canep.2018.01.008", "Cancer Epidemiol 2018"), pubmed("29414637")] }),

  p({ id: "paper-memirie-ethiopia-cancer-incidence-2015-jgo-2018", name: "Estimates of cancer incidence in Ethiopia in 2015 using population-based registry data",
    journal: "Journal of Global Oncology", year: 2018, doi: "10.1200/JGO.17.00175", pmid: "30241262", authors: "Memirie ST, Habtemariam MK, Asefa M, et al.", paperType: "observational", participants: 10187,
    tldr: "Using the Addis Ababa registry and cases from six regions, the authors estimated about 21,600 new cancers in men and 42,700 in women in Ethiopia in 2015, with breast cancer by far the commonest.",
    summary: "The authors combined primary data on 8,539 patients from the Addis Ababa population-based cancer registry with 1,648 cancer cases collected from six Ethiopian regions to estimate the number of common cancers diagnosed in Ethiopia in 2015, with crude and age-standardised rates.",
    findings: [
      "An estimated 21,563 (95% CI 17,416 to 25,660) new cancers in men and 42,722 (37,412 to 48,040) in women in 2015.",
      "Breast cancer made up 33% of cancers in women and 23% of all cancers in the Addis Ababa registry, and was the commonest cancer in four of the six regions studied.",
      "Colorectal cancer and non-Hodgkin lymphoma were the commonest cancers in men; leukaemia was the leading diagnosis in children aged 0 to 14.",
    ],
    whatItMeans: "An early national estimate built from Ethiopian data rather than regional models, which the Ministry of Health's cancer plan cites.",
    caveats: ["The regional cases were not from population-based registries, so national figures rest mainly on Addis Ababa rates."],
    institutions: ["addis-ababa-city-cancer-registry"], cancers: ["breast-cancer", "colorectal"],
    links: [doi("10.1200/JGO.17.00175", "J Glob Oncol 2018"), pubmed("30241262")] }),

  p({ id: "paper-eregata-ethiopia-ehsp-revision-hsr-2020", name: "Ethiopia's 2019 revision of its essential health services package: process and methods",
    journal: "Health Systems & Reform", year: 2020, doi: "10.1080/23288604.2020.1829313", pmid: "33300838", authors: "Eregata GT, Hailu A, Geletu ZA, et al.", paperType: "methods",
    tldr: "Ethiopia's 2019 revision of its essential health services package ranked 1,018 interventions using seven criteria, including cost-effectiveness and financial risk protection, and made 570 of them free of charge.",
    summary: "Published as \"Revision of the Ethiopian Essential Health Service Package: An Explication of the Process and Methods Used\". It describes the process the Ministry of Health followed in 2019: 35 consultative workshops with experts and the public to define scope, list interventions, agree criteria, gather evidence and compare interventions.",
    findings: [
      "Seven prioritisation criteria were used: disease burden, cost-effectiveness, equity, financial risk protection, budget impact, public acceptability and political acceptability.",
      "1,749 interventions were identified, narrowed to 1,442 relevant and then 1,018 evaluated: 594 (58%) high priority, 213 (21%) medium and 211 (21%) low.",
      "Policy is to provide 570 interventions (56%) free of charge, with the rest available through cost-sharing (38%) or cost-recovery (6%).",
    ],
    whatItMeans: "This package is how Ethiopia decides which services, including cancer services, public facilities provide and on what terms; it is the nearest thing to a national health technology assessment process.",
    caveats: ["Written by people who took part in the revision.", "The abstract does not give the priority level of individual cancer interventions."],
    institutions: ["ethiopia-ministry-of-health"],
    links: [doi("10.1080/23288604.2020.1829313", "Health Syst Reform 2020"), pubmed("33300838")] }),

  p({ id: "paper-kiros-paediatric-oncology-cea-ethiopia-bmjopen-2023", name: "Cost-effectiveness of running a paediatric oncology unit in Ethiopia",
    journal: "BMJ Open", year: 2023, doi: "10.1136/bmjopen-2022-068210", pmid: "36918241", authors: "Kiros M, Memirie ST, Tolla MTT, et al.", paperType: "methods",
    tldr: "Running the paediatric oncology unit at Tikur Anbessa Specialized Hospital cost about 361 US dollars per disability-adjusted life year averted, which the authors judged cost-effective, and they recommended reassessing the low and medium priority that Ethiopia's essential package gives childhood cancer treatment.",
    summary: "A decision-tree model compared running a paediatric oncology unit with no paediatric oncology care, from a healthcare provider perspective, using 2018 to 2019 costing of the unit at Tikur Anbessa Specialized Hospital and outcome data from similar settings, over a lifetime horizon with 3% discounting. The willingness-to-pay threshold used was 50% of Ethiopia's GDP per capita, 477 US dollars in 2019.",
    findings: [
      "Incremental cost per child treated was 876 US dollars and 2.4 disability-adjusted life years were averted per child.",
      "The incremental cost-effectiveness ratio was 361 US dollars per DALY averted.",
      "The unit was cost-effective in 90% of 100,000 Monte Carlo iterations at the 477 US dollar threshold.",
    ],
    whatItMeans: "Evidence written to inform Ethiopia's next revision of its essential health services package, which ranks childhood cancer treatment at low and medium priority.",
    caveats: ["Health outcomes were taken from other studies in similar settings, not measured at the unit.", "The threshold is the authors' choice; OnCo found no official Ethiopian cost-effectiveness threshold."],
    institutions: ["tikur-anbessa-hospital"], cancers: ["childhood-cancers"],
    links: [doi("10.1136/bmjopen-2022-068210", "BMJ Open 2023"), pubmed("36918241")] }),

  p({ id: "paper-stroetmann-via-follow-up-ethiopia-oncologist-2024", name: "Adherence to treatment and follow-up after a positive cervical screening test in Ethiopia",
    journal: "The Oncologist", year: 2024, doi: "10.1093/oncolo/oyae027", pmid: "38394385", authors: "Stroetmann CY, Gizaw M, Alemayehu R, et al.", paperType: "observational", participants: 741,
    tldr: "In 14 health facilities in Addis Ababa and Oromia, over 90% of women with a positive visual inspection screening test were treated, but only about half came back for the recommended follow-up check.",
    summary: "Screening logbooks from 2017 to 2020 were reviewed in 14 health facilities of Addis Ababa and Oromia region, and women with a positive VIA (visual inspection with acetic acid) result were invited to a telephone interview about treatment and follow-up.",
    findings: [
      "Around 13,800 women had VIA screening, of whom about 820 (5.9%) were positive; data for 741 were extracted.",
      "Over 90% of women with a positive screen received treatment, but only about half of those treated returned for follow-up; 31 had a positive re-screen.",
      "Educational status, age over 40, missing or incorrect follow-up appointments, facility barriers and the use of reminders influenced follow-up.",
    ],
    whatItMeans: "Ethiopia's screen-and-treat approach reaches treatment well, but follow-up is where women are lost; appointment cards and phone calls can help.",
    caveats: ["Two regions and logbook data; phone interviews reach only women who could be contacted."],
    institutions: ["ethiopia-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1093/oncolo/oyae027", "Oncologist 2024"), pubmed("38394385")] }),
];

/** Records behind /countries/et/ (wave 4). */
export const recordsET: EntityInput[] = [...institutions, ...papers];
