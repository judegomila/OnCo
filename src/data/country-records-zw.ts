import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Zimbabwe: the bodies and papers behind /countries/zw/ (wave 8) that the corpus did not hold. Written from sources read
 * raw on 11 November 2026: the African Cancer Registry Network's member page for the Zimbabwe National Cancer Registry
 * (undated; its newest entries are from 2013 and 2014), and the Medicines Control Authority of Zimbabwe's home page and
 * "Who we are" page. Papers were resolved through Europe PMC (PubMed id and DOI checked together) and their figures are
 * taken from the abstracts. Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const AFCRN_ZNCR = "https://afcrn.org/index.php/membership/membership-list/83-zimbabwe-harare";
const MCAZ = "https://www.mcaz.co.zw/";
const MCAZ_WHO = "https://www.mcaz.co.zw/who-we-are/";

const institutions: InstitutionInput[] = [
  i({ id: "zimbabwe-national-cancer-registry", name: "Zimbabwe National Cancer Registry (ZNCR)", aka: ["ZNCR", "Harare Cancer Registry", "Bulawayo Cancer Registry"],
    city: "Harare", country: "ZW", lat: -17.81, lng: 31.04, institutionType: "research-institute", website: AFCRN_ZNCR,
    tldr: "Zimbabwe's population-based cancer registry, set up in 1985 by the Ministry of Health and Child Care with IARC and based at Parirenyatwa Group of Hospitals in Harare. It has covered Harare completely since 1990, with a branch in Bulawayo revived in 2011.",
    summary: "The registry's page on the African Cancer Registry Network says the Zimbabwe National Cancer Registry was established in 1985 under a research agreement between the Ministry of Health and Child Care and IARC, and is located in the Parirenyatwa Group of Hospitals complex in Harare. It achieved complete reporting and coverage of Harare in 1990 and aims to cover the whole country; the Bulawayo Cancer Registry, which reports cases from the south, was revived in 2011. Staff visit the three government referral hospitals (Parirenyatwa, Harare Central and Chitungwiza Central), oncology clinics, the radiotherapy department, municipal and private hospitals, pathology laboratories and the Harare death registry, and record HIV status where available.\n\nThe registry has contributed to volumes 7 to 10 of IARC's Cancer Incidence in Five Continents and to IARC's studies of childhood cancer and of cancer survival in Africa, and is a founding member of the network that became the African Cancer Registry Network in 2011. Its records were linked with an antiretroviral therapy clinic's records to measure cancer in people living with HIV. The page lists Professor Margaret Borok as medical director and Eric Chokunonga as registrar; it is undated, and its newest entries are from 2013 and 2014, so these roles may have changed. The coordinates are an approximate Harare city point.",
    programs: ["Population-based cancer registration for Harare (complete since 1990)", "Bulawayo Cancer Registry (revived 2011)", "Contributions to Cancer Incidence in Five Continents, volumes 7 to 10"],
    institutions: ["parirenyatwa-hospital", "zimbabwe-ministry-of-health-and-child-care", "iarc"],
    cancers: ["cervical", "kaposi-sarcoma", "prostate", "breast-cancer", "esophageal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-shamu-cancer-incidence-hiv-zimbabwe-cancer-reports-2022", "paper-stoeter-childhood-cancer-trends-harare-kyadondo-ijc-2021"],
    links: [{ label: "African Cancer Registry Network: Zimbabwe National Cancer Registry (Harare and Bulawayo)", url: AFCRN_ZNCR }] }),

  i({ id: "zimbabwe-ministry-of-health-and-child-care", name: "Ministry of Health and Child Care, Zimbabwe", aka: ["MoHCC", "MHCC", "Zimbabwe Ministry of Health"],
    city: "Harare", country: "ZW", lat: -17.83, lng: 31.05, institutionType: "government", website: AFCRN_ZNCR,
    tldr: "Zimbabwe's health ministry. It set up the Zimbabwe National Cancer Registry with IARC in 1985, supports it, and in February 2014 unveiled a Zimbabwe Cancer Prevention and Control Strategy for 2014 to 2018.",
    summary: "The Zimbabwe National Cancer Registry's page on the African Cancer Registry Network says the registry was established in 1985 through a collaborative research agreement between the Ministry of Health and Child Care and IARC, after the Ministry recognised cancer as a serious public health problem, and that the Ministry supports it. It records that the Ministry unveiled the Zimbabwe Cancer Prevention and Control Strategy (2014 to 2018) in February 2014, which envisaged extending registration to other parts of the country, and that the Ministry's Director of Epidemiology and Disease Control opened the African Cancer Registry Network's review meeting at Victoria Falls in January 2014. OnCo did not read the Ministry's own website or any later cancer strategy; the coordinates are an approximate Harare city point. The medicines regulator, MCAZ, and the Parirenyatwa hospitals are listed with it as Zimbabwe's public bodies on OnCo's country page.",
    programs: ["Zimbabwe Cancer Prevention and Control Strategy 2014 to 2018", "Support for the Zimbabwe National Cancer Registry"],
    institutions: ["zimbabwe-national-cancer-registry", "parirenyatwa-hospital", "mcaz-zimbabwe", "iarc"],
    links: [{ label: "African Cancer Registry Network: Zimbabwe National Cancer Registry, on the Ministry's role", url: AFCRN_ZNCR }] }),

  i({ id: "parirenyatwa-hospital", name: "Parirenyatwa Group of Hospitals", aka: ["Parirenyatwa Hospital", "Parirenyatwa"],
    city: "Harare", country: "ZW", lat: -17.81, lng: 31.04, institutionType: "hospital", website: AFCRN_ZNCR,
    tldr: "A government tertiary referral hospital complex in Harare and a teaching hospital of the University of Zimbabwe. It houses the Zimbabwe National Cancer Registry.",
    summary: "The Zimbabwe National Cancer Registry's page describes the Parirenyatwa Group of Hospitals as a large government tertiary referral centre that provides most of the cancer management services for the northern part of Zimbabwe, and as one of the two teaching hospitals of the University of Zimbabwe College of Health Sciences. The registry is located in its complex, and registry staff visit its wards and its radiology department. OnCo did not reach a website of the hospital's own; the coordinates are an approximate Harare city point.",
    programs: ["Cancer management for northern Zimbabwe", "University of Zimbabwe teaching hospital"],
    institutions: ["zimbabwe-national-cancer-registry"],
    links: [{ label: "African Cancer Registry Network: Zimbabwe National Cancer Registry, describing Parirenyatwa", url: AFCRN_ZNCR }] }),

  i({ id: "mcaz-zimbabwe", name: "Medicines Control Authority of Zimbabwe (MCAZ)", aka: ["MCAZ"],
    city: "Harare", country: "ZW", lat: -17.83, lng: 31.05, institutionType: "government", website: MCAZ,
    tldr: "Zimbabwe's medicines regulator, a statutory body under the Medicines and Allied Substances Control Act. It announces that Zimbabwe's regulatory system has reached WHO maturity level 3 for medicines and vaccines (non-producing).",
    summary: "MCAZ describes itself as a statutory body established by the Medicines and Allied Substances Control Act [Chapter 15.03], successor to the Drugs Control Council, set up by an act of 1969, and the Zimbabwe Regional Drug Control Laboratory, operational from 1989. Its mandate is to protect public health by ensuring that medicines and medical devices on the market are safe, effective and of good quality. Its home page announces that Zimbabwe's regulatory system has attained maturity level 3 in WHO's Global Benchmarking Tool for the regulation of medicines and vaccines (non-producing) and that it has published the assessment report; the linked media release returned a not-found error on 11 November 2026, so the date is not given here. The site lists alternative submission pathways for registering a medicine, and the ZaZiBoNa collaborative procedure, a Southern African Development Community initiative, for veterinary medicines. The coordinates are an approximate Harare city point.",
    programs: ["Registration of medicines", "Alternative submission pathways", "Pharmacovigilance", "ZaZiBoNa collaborative procedure for veterinary medicines (SADC)"],
    institutions: ["who"],
    links: [
      { label: "MCAZ: home page", url: MCAZ },
      { label: "MCAZ: who we are", url: MCAZ_WHO },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-shamu-cancer-incidence-hiv-zimbabwe-cancer-reports-2022", name: "Cancer incidence among people living with HIV in Harare, measured by linking clinic and registry records",
    journal: "Cancer Reports", year: 2022, doi: "10.1002/cnr2.1597", pmid: "34873875", authors: "Shamu T, Rohner E, Chokunonga E, Spoerri A, Mandiriri A, Chimbetete C, Egger M, Bohlius J, Borok M.", paperType: "observational",
    tldr: "Linking an antiretroviral therapy clinic's records with the Zimbabwe National Cancer Registry found 66 cancers among 3,442 people living with HIV, a third of them known only to the registry; cervical cancer, Kaposi sarcoma and lymphoma were the commonest.",
    summary: "Published as \"Cancer incidence among people living with HIV in Zimbabwe: A record linkage study\". A retrospective cohort of people aged 16 and over starting antiretroviral therapy at a Harare clinic between 2004 and 2017, matched to the national cancer registry by probabilistic record linkage and clerical review.",
    findings: [
      "3,442 people (64.9% women) were followed for 19,346 person-years; median CD4 count at the start of treatment was 169 cells/mm3.",
      "66 cancers were diagnosed, an incidence of 341 per 100,000 person-years (95% CI 268 to 434); 22 were recorded in the registry only.",
      "Cervical cancer was commonest (16 cases, 123 per 100,000 person-years), then Kaposi sarcoma and lymphoma (12 each).",
      "Cancer incidence rose with age and fell with higher CD4 counts at the start of treatment.",
    ],
    whatItMeans: "HIV clinics miss many cancers that the registry records; early HIV treatment, HPV vaccination and cervical screening are the prevention levers the authors name.",
    caveats: ["One clinic in Harare.", "Record linkage can miss or mismatch some cases."],
    institutions: ["zimbabwe-national-cancer-registry"], cancers: ["cervical", "kaposi-sarcoma"],
    links: [doi("10.1002/cnr2.1597", "Cancer Rep 2022"), pubmed("34873875")] }),

  p({ id: "paper-stoeter-childhood-cancer-trends-harare-kyadondo-ijc-2021", name: "Childhood cancer incidence over 25 years in Harare and Kyadondo, and its link to HIV and the economy",
    journal: "International Journal of Cancer", year: 2021, doi: "10.1002/ijc.33619", pmid: "33945631", authors: "Stoeter O, Seraphin TP, Chitsike I, Chokunonga E, Kambugu JB, Wabinga H, Parkin DM, Kantelhardt EJ.", paperType: "observational",
    tldr: "Childhood cancer incidence in the Harare and Kyadondo registries showed no significant overall trend from 1991 to 2015, but peaks driven by Kaposi sarcoma and lymphoma followed HIV prevalence, and in Harare registrations dropped when the economy contracted.",
    summary: "Published as \"Trends in childhood cancer incidence in sub-Saharan Africa: Results from 25 years of cancer registration in Harare (Zimbabwe) and Kyadondo (Uganda)\". Cases from the two population-based registries were classified by the International Classification of Childhood Cancer.",
    findings: [
      "Over 1991 to 2015 overall trends were small and not significant.",
      "Incidence peaked in 1996 to 2001 in Harare and 2003 to 2006 in Kyadondo, mostly Kaposi sarcoma and non-Hodgkin lymphoma, tracking HIV prevalence and the availability of antiretroviral therapy.",
      "In Harare, incidence fell in 2003 to 2004 and 2007 to 2008, when national gross domestic product declined.",
    ],
    whatItMeans: "In Zimbabwe, how many childhood cancers are registered depends on whether diagnostic services are working, which depends on the economy; HIV treatment has reduced some childhood cancers.",
    caveats: ["Registration reflects diagnosis; falls in incidence may be missed cases rather than fewer cancers."],
    institutions: ["zimbabwe-national-cancer-registry"], cancers: ["childhood-cancers", "kaposi-sarcoma"],
    links: [doi("10.1002/ijc.33619", "Int J Cancer 2021"), pubmed("33945631")] }),
];

/** Records behind /countries/zw/ (wave 8). */
export const recordsZW: EntityInput[] = [...institutions, ...papers];
