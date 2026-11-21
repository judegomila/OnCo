import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Gaza Strip and West Bank: the bodies, hospitals and papers behind /countries/ps/ (wave 13) that the corpus did not
 * hold. Each was written from sources read raw on 16 November 2026: WHO's report "Right to health: barriers to health
 * and attacks on health care in the occupied Palestinian territory, 2019 to 2021" (PDF text), WHO's situation updates
 * for the occupied Palestinian territory, issues 66, 69, 70, 71, 72 and 73 (PDF text), WHO's news release of
 * 10 November 2023, OCHA's Flash Update 26 (1 November 2023) and Humanitarian Situation Update 275 (25 March 2025),
 * the Palestinian Ministry of Health's World Cancer Day figures for the West Bank as relayed by the WAFA news agency
 * on 4 February 2026 (registry counts only; named in the sentence and not linked), and the papers' abstracts through
 * Europe PMC.
 *
 * Every statement about a service carries the date of its source, because services here have changed within months.
 * The records say what each source states and when, and do not attribute responsibility. Coordinates are approximate
 * city points (the ones the corpus already uses for Ramallah and Gaza City), not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const WHO_RTH = "https://applications.emro.who.int/docs/9789292740887-eng.pdf";
const WHO_SITREP_66 = "https://www.emro.who.int/images/stories/palestine/sitrep66.pdf";
const WHO_SITREP_69 = "https://www.emro.who.int/images/stories/palestine/Sitrep_69b.pdf";
const WHO_SITREP_70 = "https://www.emro.who.int/images/stories/palestine/Sitrep_70b_latest_1.pdf";
const WHO_SITREP_71 = "https://www.emro.who.int/images/stories/palestine/Sitrep_71.pdf";
const WHO_SITREP_73 = "https://www.emro.who.int/images/stories/palestine/SItrep73_final.pdf";
const WHO_NOV_2023 = "https://www.emro.who.int/opt/news/children-with-cancer-evacuated-from-gaza-for-treatment-to-egypt-and-jordan.html";
const OCHA_FLASH_26 = "https://www.ochaopt.org/content/hostilities-gaza-strip-and-israel-flash-update-26";
const OCHA_HSU_275 = "https://www.ochaopt.org/content/humanitarian-situation-update-275-gaza-strip";
const BOUQUET = "10.1371/journal.pone.0251058";
const ALWAHEIDI = "10.1200/go.23.00170";
const MASSAD = "10.1136/bmjgh-2024-015493";
const ABU_RMEILEH = "10.1186/s12889-016-2715-8";

const institutions: InstitutionInput[] = [
  i({ id: "palestinian-ministry-of-health", name: "Palestinian Ministry of Health", aka: ["Palestinian MoH", "Ministry of Health, Ramallah"],
    city: "Ramallah", country: "PS", lat: 31.934, lng: 35.163, institutionType: "government",
    tldr: "The health ministry that WHO's report on 2019 to 2021 describes as providing most health services in the West Bank and Gaza Strip and paying for referrals to other hospitals. Its West Bank cancer registry counts for 2024, relayed by the WAFA news agency on 4 February 2026, give 3,926 new cancers.",
    summary: "WHO's report on 2019 to 2021 (published 2023) describes the Palestinian Ministry of Health as one of four main health service providers, with UNRWA, non-governmental organisations and for-profit providers, and as the provider of most services, especially primary and secondary care. The same report says the Ministry purchases services it cannot provide through the medical and financial committees of its Services Purchasing Unit, under Cabinet Decision 11 of 2006, and that 37.5% of its spending in 2021 went on these referrals, 37.2% on salaries and 19.4% on medicines and supplies. Oncology was 26% of referrals in 2019 to 2021.\n\nOn 4 February 2026 the WAFA news agency relayed the Ministry's World Cancer Day statement: 3,926 new cancers recorded in the West Bank in 2024, a rate of 130 per 100,000, against 3,590 in 2023; and, the Ministry said, no available data on new cancers in Gaza. WHO's situation update for June 2026 refers to the Ministry of Health in Ramallah and reports that its working days were reduced to two of five a week at that time. OnCo could not reach the Ministry's own websites on 16 November 2026, so nothing here is taken from them; only the registry counts are taken from the relay, which is not linked.",
    programs: ["Outside medical referrals through the Services Purchasing Unit (WHO report on 2019 to 2021)", "Cancer registry counts for the West Bank (2024 figures relayed by the WAFA news agency on 4 February 2026)", "Central Drugs Stores in the West Bank and the Gaza Strip (WHO report on 2019 to 2021)"],
    institutions: ["augusta-victoria-hospital", "an-najah-national-university-hospital", "who"],
    related: ["cancer-registries-surveillance"],
    links: [
      { label: "WHO: Right to health, barriers to health and attacks on health care in the occupied Palestinian territory, 2019 to 2021 (published 2023, PDF)", url: WHO_RTH },
      { label: "WHO: oPt emergency situation update, issue 71 (to 30 June 2026, PDF)", url: WHO_SITREP_71 },
    ], keyPapers: ["paper-bouquet-gaza-cancer-permits-survival-plos-one-2021", "paper-massad-children-cancer-gaza-access-bmjgh-2026", "paper-abu-rmeileh-cancer-mortality-west-bank-bmc-public-health-2016"] }),

  i({ id: "turkish-palestinian-friendship-hospital", name: "Turkish-Palestinian Friendship Hospital, Gaza", aka: ["Turkish Friendship Hospital", "Turkish-Palestinian Friendship hospital"],
    city: "Gaza", country: "PS", lat: 31.513, lng: 34.458, institutionType: "hospital",
    tldr: "The hospital OCHA called the only specialised cancer hospital in Gaza. OCHA wrote on 1 November 2023 that it had reportedly stopped most of its activities, and on 25 March 2025 that it was destroyed on 21 March 2025. OnCo has read no later UN or WHO report of services there.",
    summary: "OCHA's Flash Update 26 reported that on 1 November 2023 the Turkish-Palestinian Friendship hospital in Gaza city 'reportedly ran out of fuel and was forced to stop most of its activities, rendering 70 cancer patients at serious life risk'. WHO's news release of 10 November 2023 said that of the two specialised hospitals offering care to cancer patients in the Gaza Strip, including children, one had been forced to close and the second remained partially operational. OCHA's Humanitarian Situation Update 275, dated 25 March 2025, reported that the hospital was destroyed on 21 March 2025, described it as the only specialised cancer hospital in Gaza and said it became non-operational in November 2023 after running out of fuel and sustaining significant damage. OCHA's update says who carried out the destruction; this record gives the event and its date as OCHA reported them and does not attribute responsibility for any act to any party.\n\nFor where WHO has since reported oncology services in the Gaza Strip, see the record for Al-Shifa Medical Complex. The coordinates are an approximate point for Gaza City, not the hospital's position.",
    programs: ["Specialised cancer hospital (non-operational from November 2023 and destroyed on 21 March 2025, per OCHA on 25 March 2025)"],
    institutions: ["al-shifa-medical-complex", "palestinian-ministry-of-health", "who"],
    links: [
      { label: "OCHA: Hostilities in the Gaza Strip and Israel, Flash Update 26 (1 November 2023)", url: OCHA_FLASH_26 },
      { label: "OCHA: Humanitarian Situation Update 275, Gaza Strip (25 March 2025)", url: OCHA_HSU_275 },
      { label: "WHO: children with cancer evacuated from Gaza for treatment to Egypt and Jordan (10 November 2023)", url: WHO_NOV_2023 },
    ] }),

  i({ id: "al-shifa-medical-complex", name: "Al-Shifa Medical Complex, Gaza", aka: ["Shifa Hospital", "El-Shifa Hospital", "Al-Shifa Hospital"],
    city: "Gaza", country: "PS", lat: 31.513, lng: 34.458, institutionType: "hospital",
    tldr: "A hospital in Gaza City. WHO reported in April 2026 that the Ministry of Health had resumed oncology services there, including chemotherapy, and in June 2026 that they were partial and short of medicines, consumables and diagnostics.",
    summary: "WHO's situation update for April 2026 reported that the Ministry of Health had resumed oncology services, including chemotherapy for patients with cancer, at the WHO-supported Al-Shifa Medical Complex during that month. The update for May 2026 described day-care chemotherapy and inpatient care there. The update for June 2026 said oncology services had partially resumed, including day-care chemotherapy and inpatient care, and that delivery remained constrained by shortages of oncology medicines, consumables and diagnostic capacity. WHO's update for September 2026 does not name the hospital's oncology service; it says that limited specialised services and referral pathways continued to restrict access to advanced diagnosis and treatment for cancer across the Gaza Strip.\n\nWHO's update for October 2025 said El-Shifa Hospital was to be scaled up as a main trauma centre and that Al-Ahli Arab Hospital was expected to return gradually to a focus on oncology and other specialised care; OnCo has read no later WHO statement on oncology at Al-Ahli. Nothing here says what the hospital offers today. The coordinates are an approximate point for Gaza City.",
    programs: ["Day-care chemotherapy and inpatient oncology (WHO, April to June 2026)"],
    institutions: ["turkish-palestinian-friendship-hospital", "palestinian-ministry-of-health", "who"],
    links: [
      { label: "WHO: oPt emergency situation update, issue 69 (to 30 April 2026, PDF)", url: WHO_SITREP_69 },
      { label: "WHO: oPt emergency situation update, issue 70 (to 31 May 2026, PDF)", url: WHO_SITREP_70 },
      { label: "WHO: oPt emergency situation update, issue 71 (to 30 June 2026, PDF)", url: WHO_SITREP_71 },
      { label: "WHO: oPt emergency situation update, issue 73 (to 30 September 2026, PDF)", url: WHO_SITREP_73 },
      { label: "WHO: oPt emergency situation update, issue 66 (to 31 October 2025, PDF)", url: WHO_SITREP_66 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-bouquet-gaza-cancer-permits-survival-plos-one-2021", name: "Survival of cancer patients from Gaza by the outcome of their first permit application, 2008 to 2017",
    journal: "PLoS One", year: 2021, doi: BOUQUET, pmid: "34077436", authors: "Bouquet B, Barone-Adesi F, Lafi M, Quanstrom K, Riccardi F, Doctor H, et al.", paperType: "observational", participants: 3816,
    tldr: "A study that WHO's 2023 report cites as WHO research matched 17,072 permit applications for 3,816 cancer patients from Gaza referred for chemotherapy or radiotherapy. For 2015 to 2017, death was more likely among those whose first application was not approved in time.",
    summary: "Published as \"Comparative survival of cancer patients requiring Israeli permits to exit the Gaza Strip for health care: A retrospective cohort study from 2008 to 2017\". The authors matched permit applications from 1 January 2008 to 31 December 2017 with referral data and with mortality data to 30 June 2018, and compared survival by the first decision (approved against denied or delayed), separately for 2008 to 2014 and 2015 to 2017.",
    findings: [
      "17,072 permit applications for 3,816 cancer patients referred for chemotherapy and/or radiotherapy were matched.",
      "For first applications in 2015 to 2017, mortality was higher among patients whose application was unsuccessful: hazard ratio 1.45 (95% CI 1.19 to 1.78).",
      "For first applications in 2008 to 2014, the abstract reports no significant difference in mortality risk between the two groups.",
      "The abstract gives the approval rate for patient permits to exit Gaza as 94% in 2012 and 54% in 2017.",
    ],
    whatItMeans: "A cohort study of mortality by the outcome of a first travel permit application, for people from Gaza referred for chemotherapy or radiotherapy elsewhere. It found a difference for 2015 to 2017 and none for 2008 to 2014. WHO's 2023 report on 2019 to 2021 cites it.",
    caveats: ["An observational cohort: it compares groups and cannot rule out other differences between them.", "The data end in 2018. WHO's summary to 31 October 2026 describes a different route since October 2023, medical evacuation abroad.", "OnCo read the abstract, not the full text."],
    institutions: ["who", "palestinian-ministry-of-health"],
    links: [doi(BOUQUET, "PLoS One 2021"), pubmed("34077436")], related: ["paper-alwaheidi-breast-cancer-gaza-jco-go-2024"] }),

  p({ id: "paper-alwaheidi-breast-cancer-gaza-jco-go-2024", name: "Breast cancer in women in Gaza diagnosed in 2017 and 2018: stage, treatment and two-year survival",
    journal: "JCO Global Oncology", year: 2024, doi: ALWAHEIDI, pmid: "38991184", authors: "AlWaheidi S, Sullivan R, Davies EA", paperType: "observational", participants: 524,
    tldr: "A review of the clinical records of 524 women diagnosed with breast cancer in Gaza in 2017 and 2018: about half were diagnosed at stage III or IV, and 86.6% were alive two years after diagnosis.",
    summary: "Published as \"Breast Cancer in Women in Gaza: A Review of Clinical Characteristics and Short-Term Survival\". A clinical record case series of women diagnosed in 2017 and 2018, followed to 31 December 2020.",
    findings: [
      "524 new diagnoses (mean age 53), a crude annual incidence of 27 per 100,000 population.",
      "Stage at diagnosis: 6% stage I, 35% stage II, 33% stage III and 19% stage IV.",
      "52% had a modified radical mastectomy; 77% received chemotherapy, 70% hormone therapy and 39% radiotherapy.",
      "Overall survival was 95.4% at one year and 86.6% at two years.",
    ],
    whatItMeans: "A published account of the stage at which breast cancer was found in Gaza in 2017 and 2018. It describes 2017 to 2020 and says nothing about services since.",
    caveats: ["The authors note incomplete investigations and reporting of grade, size and receptor status.", "Short follow-up: two-year survival is not a long-term outcome.", "Diagnoses from 2017 and 2018 only."],
    cancers: ["breast-cancer"],
    links: [doi(ALWAHEIDI, "JCO Global Oncology 2024"), pubmed("38991184")] }),

  p({ id: "paper-massad-children-cancer-gaza-access-bmjgh-2026", name: "Access to diagnosis and treatment for children with cancer in the Gaza Strip, studied in 2021 and 2022",
    journal: "BMJ Global Health", year: 2026, doi: MASSAD, pmid: "41500662", authors: "Massad S, Isbeih M, Abu Saman K, Goncalves MB, Mahmoud L, Pourghazian N, et al.", paperType: "observational",
    tldr: "Interviews and 2021 referral data on children with cancer in Gaza: the route to treatment outside Gaza ran through a physician's referral, the Ministry's purchasing unit and an exit permit, and a quarter of children waited over a month for a permit.",
    summary: "Published as \"Challenges of access to care for children with cancer living in the Gaza Strip/occupied Palestinian territory in 2022: a cross-sectional study\". The study drew on 51 key informant interviews and two focus groups with relatives, healthcare providers and Ministry of Health officials between November 2021 and January 2022, and on referral data for paediatric oncology care outside Gaza in 2021.",
    findings: [
      "The referral pathway began with a physician's referral, then approval by the Ministry of Health Service Purchasing Unit, then exit permit requests for the child and a companion.",
      "In the 2021 referral data, 25% of children with cancer had permit delays of over one month.",
      "8% died while waiting for an exit permit.",
    ],
    whatItMeans: "A description of how children with cancer in Gaza reached specialised care before October 2023, and how long the steps took.",
    caveats: ["Data are from 2021 and early 2022. WHO's summary to 31 October 2026 describes a different process since October 2023, medical evacuation abroad.", "Qualitative interviews with a small number of informants, plus one year of referral data.", "OnCo read the abstract, not the full text."],
    cancers: ["childhood-cancers"], institutions: ["who", "palestinian-ministry-of-health"],
    links: [doi(MASSAD, "BMJ Global Health 2026"), pubmed("41500662")] }),

  p({ id: "paper-abu-rmeileh-cancer-mortality-west-bank-bmc-public-health-2016", name: "Cancer deaths in the West Bank from death certificates, 1999 to 2009",
    journal: "BMC Public Health", year: 2016, doi: ABU_RMEILEH, pmid: "26812960", authors: "Abu-Rmeileh NME, Gianicolo EAL, Bruni A, Mitwali S, Portaluri M, Bitar J, et al.", paperType: "observational",
    tldr: "A study of death certificates collected by the Palestinian Ministry of Health for the West Bank from 1999 to 2009: lung cancer was 22.8% of cancer deaths in men and breast cancer 21.5% in women.",
    summary: "Published as \"Cancer mortality in the West Bank, Occupied Palestinian Territory\". The authors used death certificates collected by the Palestinian Ministry of Health for Palestinians living in the West Bank, computed age-standardised mortality rates, and compared governorates and urban, rural and camp locales.",
    findings: [
      "Lung cancer was the commonest cause of cancer death in men (22.8%), followed by prostate cancer (9.5%).",
      "Breast cancer was the commonest cause of cancer death in women (21.5%), followed by colon cancer (11.4%).",
      "The authors conclude that the quality of the mortality registry improved over the period.",
    ],
    whatItMeans: "A published analysis of counted cancer deaths in the West Bank for 1999 to 2009. IARC's mortality figures for the Gaza Strip and West Bank are modelled, not taken from death certificates.",
    caveats: ["West Bank only, and 1999 to 2009.", "The authors examine the quality of the death data as part of the study."],
    institutions: ["palestinian-ministry-of-health"], related: ["cancer-registries-surveillance"],
    links: [doi(ABU_RMEILEH, "BMC Public Health 2016"), pubmed("26812960")] }),
];

/** Records behind /countries/ps/ (wave 13). */
export const recordsPS: EntityInput[] = [...institutions, ...papers];
