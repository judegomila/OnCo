import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Tanzania: the public bodies and papers behind /countries/tz/ (wave 6) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Ministry of Health's Tanzania Population-Based Cancer
 * Registry Report 2019 to 2023 (July 2025, PDF text), the Universal Health Insurance Act No. 13 of 2023 and its
 * commencement notice GN 700A of 2024 (Swahili PDF text from the National Health Insurance Fund's site), the National
 * Health Insurance Fund Act, Cap 395 (PDF text), the Fund's 25 September 2026 news page on its agreement with the Aga
 * Khan Hospital, TMDA's 17 October 2025 notice on its maturity level 3 status, WHO Africa's December 2018 news release on
 * the Tanzania Food and Drugs Authority, NIAID ClinRegs' Tanzania profile for trial review times, the IAEA's December 2025
 * imPACT Review article and its country sheet (both through the Internet Archive, as the IAEA site showed a bot
 * challenge), The Citizen's and The Guardian's June 2026 reports on the KCMC radiotherapy centre, The Citizen's
 * February 2026 report on Benjamin Mkapa Hospital, and GIZ's September 2023 story on the Zanzibar Health Services Fund.
 * DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the regulator, the insurer, the three zonal hospitals and the
 * research institute; the registry links the hospitals that host it and its papers through keyPapers; each hospital
 * links the registry back. Ocean Road Cancer Institute and the Aga Khan Hospital, Dar es Salaam already exist
 * (institutions/world.ts, institutions/europe.ts) and are reused, not duplicated. Coordinates are approximate city or
 * district points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PBCR_REPORT = "https://www.moh.go.tz/storage/app/uploads/public/691/ae9/8de/691ae98de1840169550933.pdf";
const UHI_ACT = "https://www.nhif.or.tz/uploads/documents/sw-1736978659-sw1729595633-Sheria%20ya%20Bima%20ya%20Afya%20kwa%20Wote.pdf";
const UHI_GN = "https://www.nhif.or.tz/uploads/documents/sw-1744266564-BIMA-GN%20NO.%20700A%20OF%202024%20-%20TANGAZO-KUANZA%20KUTUMIKA.pdf";
const NHIF_ACT = "https://www.nhif.or.tz/uploads/documents/sw-1736978743-sw1729595522-THE%20NATIONAL%20HEALTH%20INSURANCE%20FUND%20Cap%20395.pdf";
const NHIF_AK = "https://www.nhif.or.tz/news/agha-khan-kuhudumia-wanachama-wa-nhif";
const TMDA_ML3 = "https://www.tmda.go.tz/news/tmda-maintains-who-maturity-level-3-ml3-status";
const WHO_TFDA = "https://www.afro.who.int/news/tanzania-first-african-country-reach-important-milestone-regulation-medicines";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/tanzania";
const IAEA_IMPACT_WB = "https://web.archive.org/web/20251211230258/https://www.iaea.org/newscenter/news/international-review-sees-progress-in-cancer-control-in-tanzania";
const IAEA_TC_WB = "https://web.archive.org/web/20260301091525/https://www.iaea.org/sites/default/files/20/07/tc-tanzania.pdf";
const KCMC_CITIZEN = "https://www.thecitizen.co.tz/tanzania/news/national/samia-to-inaugurate-sh17-billion-kcmc-cancer-centre-5505366";
const KCMC_GUARDIAN = "https://ippmedia.co.tz/the-guardian/news/local-news/read/president-samia-to-unveil-kcmc-radiotherapy-centre-in-kilimanjaro-2026-06-24-125413";
const BMH_CITIZEN = "https://thecitizen.co.tz/tanzania/news/national/tanzania-s-benjamin-mkapa-hospital-set-to-become-regional-cancer-hub-5348178";
const ZHSF_GIZ = "https://health.bmz.de/stories/zanzibar-introduces-universal-health-insurance-with-co-ordinated-p4h-support/";

const institutions: InstitutionInput[] = [
  i({ id: "tanzania-ministry-of-health", name: "Ministry of Health, Tanzania", aka: ["Wizara ya Afya", "MoH Tanzania", "Ministry of Health Tanzania Mainland"],
    city: "Dodoma", country: "TZ", lat: -6.17, lng: 35.74, institutionType: "government", website: "https://www.moh.go.tz",
    tldr: "Tanzania's health ministry for the mainland, based in Dodoma. It runs the national cancer registration programme, wrote the 2013 to 2022 cancer control strategy, and its minister sets the benefit packages under the 2023 Universal Health Insurance Act.",
    summary: "The Ministry of Health of the United Republic of Tanzania is responsible for health on the mainland; Zanzibar has its own Ministry of Health. The coordinates on this record are an approximate Dodoma city point.\n\nThe Ministry published Tanzania's National Cancer Control Strategy for 2013 to 2022, and the IAEA, WHO and IARC imPACT Review of September 2025 was carried out to inform a new national cancer plan. With Vital Strategies (through the Bloomberg Data for Health initiative) and the African Cancer Registry Network, the Ministry set up and strengthened five population-based cancer registries from 2017, approved a national cancer registration plan, and in July 2025 published the first national registry report, covering 16,516 cancers diagnosed from 2019 to 2023.\n\nUnder the Universal Health Insurance Act No. 13 of 2023, which applies to mainland Tanzania, the Minister may amend the essential benefit package by order in the Gazette; the Minister brought most of the Act into force on 16 August 2024. The Act's essential package includes medicines on the national essential medicines list and specialist and super-specialist services.",
    programs: ["National Cancer Control Strategy 2013 to 2022", "Population-based cancer registration (five registries)", "Universal Health Insurance (Act No. 13 of 2023)", "HPV vaccination of adolescent girls (from April 2018)"],
    institutions: ["tanzania-population-based-cancer-registry", "tmda-tanzania", "nhif-tanzania", "ocean-road-cancer-institute", "kilimanjaro-christian-medical-centre", "bugando-medical-centre", "benjamin-mkapa-hospital", "nimr-tanzania", "iaea", "who", "iarc"],
    cancers: ["cervical", "prostate", "breast-cancer", "esophageal"], related: ["global-oncology-access", "hpv-vaccine"],
    keyPapers: ["paper-mphuru-hpv-vaccine-introduction-tanzania-vaccine-2022", "paper-baisley-doris-one-dose-hpv-tanzania-lgh-2022", "paper-mahiti-cervical-screening-tdhs-2022-aph-2025", "paper-mccormick-cervical-screening-phia-jaids-2026"],
    links: [
      { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023 (July 2025, PDF)", url: PBCR_REPORT },
      { label: "Universal Health Insurance Act No. 13 of 2023 (Swahili, PDF, NHIF site)", url: UHI_ACT },
      { label: "GN 700A of 2024: commencement of the Universal Health Insurance Act (Swahili, PDF)", url: UHI_GN },
      { label: "National Cancer Control Strategy 2013 to 2022 (PDF, ICCP portal)", url: "https://www.iccp-portal.org/system/files/plans/NCSS%20Book.pdf" },
      { label: "IAEA: international review sees progress in cancer control in Tanzania (10 December 2025; Internet Archive copy)", url: IAEA_IMPACT_WB },
    ] }),

  i({ id: "tanzania-population-based-cancer-registry", name: "Tanzania Population-Based Cancer Registry", aka: ["Tanzania Cancer Registry", "Tanzania PBCR"],
    city: "Dodoma", country: "TZ", lat: -6.17, lng: 35.75, institutionType: "government", website: "https://www.moh.go.tz",
    tldr: "The Ministry of Health's cancer registration programme: five population-based registries at Dar es Salaam, Dodoma, Kilimanjaro, Mbeya and Mwanza, covering about 6 million people on the mainland. Its first report counted 16,516 cancers diagnosed from 2019 to 2023.",
    summary: "The programme links five population-based cancer registries, each run by a registry director and registrars at a hospital: Dar es Salaam (Ocean Road Cancer Institute, covering Ilala, established 2018), Dodoma (Benjamin Mkapa Hospital, 2018), Kilimanjaro (Kilimanjaro Christian Medical Centre, 2017, though the report dates a registry there to 2007 in its introduction and to 1998 in its Kilimanjaro section), Mbeya (Mbeya Zonal Referral Hospital, 2018) and Mwanza (Bugando Medical Centre, 2016). Their combined catchment averaged 5,971,796 people over 2019 to 2023. The registries cover mainland Tanzania only, not Zanzibar. The coordinates on this record are an approximate Dodoma city point.\n\nThe Ministry's first report, published in July 2025 with data cleaned in April 2024, recorded 16,516 cancers diagnosed from 2019 to 2023: 6,161 in Kilimanjaro, 3,521 in Dar es Salaam, 2,999 in Dodoma, 2,220 in Mwanza and 1,615 in Mbeya. Cervical cancer (2,478), prostate (1,852), oesophagus (1,752) and breast (1,679) were the commonest. Age-standardised rates for all sites ranged from 175.4 per 100,000 men and 195.3 per 100,000 women in Dodoma to 43.2 and 58.8 in Mbeya, a spread the report attributes partly to incomplete case finding, outdated population figures and wrongly recorded places of residence. 86% of cases had no recorded stage; of those staged, 68% were stage III or IV.\n\nThe report names as obstacles that cancer is not a notifiable disease by law, that private facilities restrict access to records, and that too few registrars are deployed. Vital Strategies, IARC and the African Cancer Registry Network gave financial, logistical and technical support.",
    programs: ["Five population-based cancer registries (Dar es Salaam, Dodoma, Kilimanjaro, Mbeya, Mwanza)", "National cancer registration plan", "First national registry report (2019 to 2023)"],
    institutions: ["tanzania-ministry-of-health", "ocean-road-cancer-institute", "kilimanjaro-christian-medical-centre", "bugando-medical-centre", "benjamin-mkapa-hospital", "iarc"],
    cancers: ["cervical", "prostate", "esophageal", "breast-cancer", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-zullig-kilimanjaro-registry-validation-jgo-2016", "paper-ngowi-kilimanjaro-prostate-registry-bmccancer-2024", "paper-olson-bugando-cancer-registry-2008-2016-canep-2020"],
    links: [
      { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023 (July 2025, PDF)", url: PBCR_REPORT },
      doi("10.1200/jgo.2015.002873", "Zullig et al., validation and quality assessment of the Kilimanjaro Cancer Registry (J Glob Oncol 2016)"),
    ] }),

  i({ id: "tmda-tanzania", people: ["adam-fimbo"], name: "Tanzania Medicines and Medical Devices Authority (TMDA)", aka: ["TMDA", "Tanzania Food and Drugs Authority", "TFDA"],
    city: "Dodoma", country: "TZ", lat: -6.18, lng: 35.75, institutionType: "government", website: "https://www.tmda.go.tz",
    tldr: "Tanzania's medicines regulator, which authorises medicines, devices and clinical trials. As the Tanzania Food and Drugs Authority it was confirmed by WHO in 2018 as the first African regulator to reach maturity level 3, and it kept that level after a 2023 reassessment.",
    summary: "TMDA regulates medicines, medical devices and diagnostics for the mainland; Zanzibar has its own Zanzibar Food and Drug Agency. It has offices in Dodoma and Dar es Salaam; the coordinates are an approximate Dodoma city point. Its predecessor, the Tanzania Food and Drugs Authority, was established in July 2003.\n\nIn December 2018 WHO Africa announced that Tanzania was the first confirmed country in Africa with a well-functioning regulatory system for medical products: after self-assessments and a formal WHO evaluation of the Tanzania Food and Drugs Authority and the Zanzibar Food and Drug Agency, the mainland authority met all indicators for maturity level 3 on WHO's Global Benchmarking Tool. In a public notice dated 17 October 2025, TMDA said it had kept maturity level 3 after WHO's 2023 re-benchmarking and that its long-term goal is level 4.\n\nNIAID's ClinRegs profile, summarising TMDA's clinical trial guidelines, says TMDA completes evaluation of a trial application within 60 working days, or within 30 working days on a fast track for which the applicant pays twice the fee, and that the clock stops while TMDA waits for answers to its queries. Ethics clearance comes from the National Health Research Ethics Committee at the National Institute for Medical Research.",
    programs: ["Marketing authorisation of medicines and medical devices", "Clinical trial authorisation", "Pharmacovigilance and adverse event reporting", "East African Community mutual recognition procedures"],
    institutions: ["tanzania-ministry-of-health", "nimr-tanzania", "who"],
    links: [
      { label: "TMDA: TMDA maintains WHO maturity level 3 status (public notice, 17 October 2025)", url: TMDA_ML3 },
      { label: "WHO Africa: Tanzania is first African country to reach an important milestone in the regulation of medicines (December 2018)", url: WHO_TFDA },
      { label: "NIAID ClinRegs: Tanzania, regulatory authority and timeline of review", url: CLINREGS },
    ] }),

  i({ id: "nhif-tanzania", people: ["irene-isaka"], name: "National Health Insurance Fund, Tanzania (NHIF)", aka: ["NHIF Tanzania", "Mfuko wa Taifa wa Bima ya Afya"],
    city: "Dodoma", country: "TZ", lat: -6.17, lng: 35.74, institutionType: "government", website: "https://www.nhif.or.tz",
    tldr: "Tanzania's public health insurer, set up by an Act of 1999 for government employees. Ocean Road Cancer Institute treats its members, since September 2026 they can also be treated for cancer at the Aga Khan hospitals, and the 2023 Universal Health Insurance Act names it as the mainland's public insurance scheme.",
    summary: "The National Health Insurance Fund was established by the National Health Insurance Fund Act (Act No. 8 of 1999, now Chapter 395), in force from 1 December 1999, \"to provide for contributions to and payment of health care benefits to certain Government employees\". The coordinates are an approximate Dodoma city point.\n\nOcean Road Cancer Institute says it treats NHIF beneficiaries. On 25 September 2026 the Fund announced an agreement with the Aga Khan Hospital, Dar es Salaam, signed by its Director General, Dr Irene C. Isaka, under which members can receive treatment, cancer care in particular, at the Aga Khan hospitals in Dar es Salaam and Mwanza and the hospital's 14 clinics. The Fund said the agreement came while the government is implementing Universal Health Insurance.\n\nThe Universal Health Insurance Act No. 13 of 2023, assented on 19 November 2023 and applying to mainland Tanzania, recognises the Fund as the public health insurance scheme (section 8), sets an essential benefit package that includes specialist and super-specialist services, and creates a fund to pay insurance for people unable to pay, which may also be used for treatment of chronic and long-term illness. Most of the Act came into force on 16 August 2024, but section 5, which makes health insurance compulsory, was left out of the commencement notice.",
    programs: ["Statutory health insurance for public servants (Act No. 8 of 1999)", "Universal Health Insurance implementation (Act No. 13 of 2023)", "Toto Afya package for children"],
    institutions: ["tanzania-ministry-of-health", "ocean-road-cancer-institute", "aga-khan-hospital-dar-es-salaam", "zanzibar-health-services-fund"],
    links: [
      { label: "National Health Insurance Fund Act, Chapter 395, revised edition 2015 (PDF)", url: NHIF_ACT },
      { label: "NHIF: NHIF and Aga Khan agree treatment for members (25 September 2026, Swahili)", url: NHIF_AK },
      { label: "Universal Health Insurance Act No. 13 of 2023 (Swahili, PDF)", url: UHI_ACT },
      { label: "GN 700A of 2024: commencement of the Universal Health Insurance Act (Swahili, PDF)", url: UHI_GN },
    ] }),

  i({ id: "kilimanjaro-christian-medical-centre", name: "Kilimanjaro Christian Medical Centre (KCMC)", aka: ["KCMC", "KCMC Northern Zone Referral Hospital"],
    city: "Moshi", country: "TZ", lat: -3.32, lng: 37.33, institutionType: "hospital", website: "https://www.kcmc.ac.tz",
    tldr: "The northern zone referral hospital in Moshi. It hosts the Kilimanjaro population-based cancer registry, which recorded more cancers than any other Tanzanian registry in 2019 to 2023, and in February 2026 began radiotherapy in a new centre, sparing patients the trip to Dar es Salaam.",
    summary: "Kilimanjaro Christian Medical Centre in Moshi is the referral hospital for Tanzania's northern zone. The coordinates are an approximate Moshi town point.\n\nIt hosts the Kilimanjaro population-based cancer registry, which the Ministry of Health's report dates to 2017, adding that a registry existed there earlier (from 2007 in its introduction, from 1998 in its Kilimanjaro section); it covers Moshi municipal, Moshi, Rombo, Hai and Siha districts, an average of 1,490,511 people over 2019 to 2023, and recorded 6,161 cancers in that period, 37.3% of the national registry total. A 2015 validation found 98% agreement with medical records for primary site.\n\nKCMC began limited radiotherapy on 25 February 2026 in a new building costing about 17 billion Tanzanian shillings, 5.5 billion of it from government, which President Samia Suluhu Hassan was reported to open on 24 June 2026. Reports at the opening said the building was designed for five machines, two were installed (a linear accelerator and a brachytherapy unit, with a CT scanner for planning), about 1,500 patients a year could be treated, and 80 patients had been treated by June. Its executive director said 60 to 70% of the hospital's cancer patients need radiotherapy and had previously been referred to Ocean Road Cancer Institute. The IAEA's December 2025 review noted the new centre in the Kilimanjaro region.",
    programs: ["Kilimanjaro population-based cancer registry", "Radiotherapy centre (from February 2026)", "Oncology department"],
    institutions: ["tanzania-population-based-cancer-registry", "tanzania-ministry-of-health", "ocean-road-cancer-institute"],
    cancers: ["prostate", "cervical", "esophageal"], related: ["brachytherapy"],
    keyPapers: ["paper-zullig-kilimanjaro-registry-validation-jgo-2016", "paper-ngowi-kilimanjaro-prostate-registry-bmccancer-2024", "paper-smith-out-of-pocket-childhood-cancer-kcmc-plosone-2025"],
    links: [
      { label: "The Citizen: Samia to inaugurate Sh17 billion KCMC cancer centre (June 2026)", url: KCMC_CITIZEN },
      { label: "The Guardian (Tanzania): President Samia to unveil KCMC radiotherapy centre (24 June 2026)", url: KCMC_GUARDIAN },
      { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, table 1 (PDF)", url: PBCR_REPORT },
    ] }),

  i({ id: "bugando-medical-centre", name: "Bugando Medical Centre", aka: ["BMC Mwanza", "Bugando Hospital"],
    city: "Mwanza", country: "TZ", lat: -2.51, lng: 32.91, institutionType: "hospital", website: "https://bmc.or.tz",
    tldr: "The zonal referral hospital for the Lake Zone, in Mwanza. It gives radiotherapy with a cobalt-60 machine and brachytherapy, and hosts the Mwanza population-based cancer registry, built on the Bugando hospital registry that counted 2,772 cancers from 2008 to 2016.",
    summary: "Bugando Medical Centre in Mwanza is the referral hospital for the Lake Zone of north-western Tanzania. The coordinates are an approximate Mwanza city point.\n\nThe IAEA's country sheet for Tanzania states that Bugando provides radiotherapy to over 1,000 patients a year using a cobalt-60 teletherapy machine, a simulator, brachytherapy equipment and a SPECT gamma camera. A 2020 paper describing its clinical and pathology registry called it the only cancer referral hospital in the region and found that the 1,116 cases it recorded for 2016 were 12.2% of the cancers expected in the Lake Zone, with 46.1% of all recorded cases from 2008 to 2016 having no treatment recorded.\n\nThe Mwanza population-based registry, established in 2016 by expanding the hospital registry, covers Ilemela, Nyamagana and Sengerema districts (an average of 1,036,781 people over 2019 to 2023) and recorded 2,220 cancers in that period, with age-standardised rates of 99.7 per 100,000 men and 100.4 per 100,000 women.",
    programs: ["Radiotherapy (cobalt-60 teletherapy and brachytherapy)", "Mwanza population-based cancer registry", "Bugando cancer registry"],
    institutions: ["tanzania-population-based-cancer-registry", "tanzania-ministry-of-health"],
    cancers: ["cervical", "breast-cancer", "prostate", "burkitt-lymphoma"], related: ["cobalt-60-teletherapy", "brachytherapy"],
    keyPapers: ["paper-olson-bugando-cancer-registry-2008-2016-canep-2020"],
    links: [
      { label: "IAEA: United Republic of Tanzania country sheet (Internet Archive copy, March 2026)", url: IAEA_TC_WB },
      doi("10.1016/j.canep.2020.101772", "Olson et al., cancer incidence and treatment at a regional cancer center in Tanzania, 2008 to 2016 (Cancer Epidemiol 2020)"),
      { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, section 3.2 (PDF)", url: PBCR_REPORT },
    ] }),

  i({ id: "benjamin-mkapa-hospital", name: "Benjamin Mkapa Hospital", aka: ["BMH", "Benjamin Mkapa Hospital Dodoma"],
    city: "Dodoma", country: "TZ", lat: -6.2, lng: 35.81, institutionType: "hospital", website: "https://www.bmh.or.tz",
    tldr: "A zonal referral hospital in Dodoma that hosts the Dodoma population-based cancer registry and is building a cancer treatment centre with radiotherapy, reported in February 2026 as 61% complete and due to start treating patients that September.",
    summary: "Benjamin Mkapa Hospital is a zonal referral hospital in Dodoma, the capital. The coordinates are an approximate Dodoma city point.\n\nIt hosts the Dodoma population-based cancer registry, established in 2018 and covering Dodoma municipal (an average of 633,181 people over 2019 to 2023). The registry recorded 2,999 cancers over 2019 to 2023 and the highest age-standardised rates in the country, 175.4 per 100,000 men and 195.3 per 100,000 women; the Ministry of Health's report links the high rates partly to patients' place of residence being recorded wrongly and to population figures that lag behind, and its discussion notes that 18% of Dodoma cases were diagnosed through death certificates.\n\nIn February 2026 The Citizen reported, after a visit by the IAEA's Africa regional director, that the hospital's Centre of Excellence for Cancer Training and Treatment, a building costing 30.2 billion Tanzanian shillings, was about 61% complete, due for completion in August 2026 with treatment from September, and that the hospital still needed 12 billion shillings for equipment. Whether treatment started on schedule was not found in the sources read. The IAEA's December 2025 review lists Dodoma among the places where radiotherapy is planned.",
    programs: ["Dodoma population-based cancer registry", "Centre of Excellence for Cancer Training and Treatment (under construction in 2026)"],
    institutions: ["tanzania-population-based-cancer-registry", "tanzania-ministry-of-health", "iaea"],
    cancers: ["cervical", "prostate", "esophageal"],
    links: [
      { label: "The Citizen: Benjamin Mkapa Hospital set to become regional cancer hub (February 2026)", url: BMH_CITIZEN },
      { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, section 3.5 (PDF)", url: PBCR_REPORT },
    ] }),

  i({ id: "nimr-tanzania", name: "National Institute for Medical Research, Tanzania (NIMR)", aka: ["NIMR Tanzania", "National Health Research Ethics Committee", "NatHREC"],
    city: "Dar es Salaam", country: "TZ", lat: -6.81, lng: 39.29, institutionType: "research-institute", website: "https://www.nimr.or.tz",
    tldr: "Tanzania's national health research institute. Its National Health Research Ethics Committee reviews every clinical trial and all research with foreign collaborators, alongside the institutional ethics committee, before the medicines regulator authorises a trial.",
    summary: "The National Institute for Medical Research hosts the National Health Research Ethics Committee (NatHREC), a subcommittee of the Medical Research Coordination Committee, the national body for coordinating health research. The coordinates are an approximate Dar es Salaam city point.\n\nNIAID's ClinRegs profile for Tanzania, summarising NatHREC's charter and national guidelines, states that all clinical trials, research with vulnerable groups and all health research involving foreign collaborators need ethics approval from both NatHREC and the institutional or zonal ethics committee; that the NIMR Director General appoints NatHREC's 9 to 15 members; and that NatHREC meets at least once a month. The Tanzania Medicines and Medical Devices Authority requires NatHREC clearance for trial amendments, and foreign researchers also need a research permit from the Tanzania Commission for Science and Technology.",
    programs: ["National Health Research Ethics Committee (NatHREC)", "Registration and accreditation of research ethics committees"],
    institutions: ["tanzania-ministry-of-health", "tmda-tanzania"],
    links: [{ label: "NIAID ClinRegs: Tanzania, ethics committee", url: CLINREGS }] }),

  i({ id: "zanzibar-health-services-fund", name: "Zanzibar Health Services Fund (ZHSF)", aka: ["ZHSF", "Zanzibar Health Service Fund"],
    city: "Zanzibar", country: "TZ", lat: -6.16, lng: 39.2, institutionType: "government",
    tldr: "Zanzibar's universal health insurance scheme, separate from the mainland's, established by an Act of the Revolutionary Government of Zanzibar in March 2023 and operating since July 2023. It aims to protect residents from catastrophic out-of-pocket costs.",
    summary: "Zanzibar, the semi-autonomous islands of Unguja and Pemba with 1,889,773 people at the 2022 census (as the Ministry of Health's registry report gives it), runs its own health system; the mainland's Universal Health Insurance Act of 2023 applies to mainland Tanzania only. The coordinates are an approximate Zanzibar City point.\n\nGIZ's September 2023 account, which quotes the fund's acting Director General, says the Revolutionary Government of Zanzibar had provided public health care without user fees since 1964, but that a shortage of public facilities pushed people to private providers, with out-of-pocket spending at 19% of total health expenditure in 2017/18. The Zanzibar Health Services Fund was established by an Act in March 2023 and began operating in July 2023, with German technical support through the GIZ BACKUP Health programme and the Providing for Health (P4H) network. What cancer care the fund pays for was not found in the sources read.",
    programs: ["Universal health insurance for Zanzibar residents (from July 2023)"],
    institutions: ["nhif-tanzania"],
    links: [
      { label: "GIZ Healthy DEvelopments: Zanzibar introduces universal health insurance with co-ordinated P4H support (25 September 2023)", url: ZHSF_GIZ },
      { label: "Ministry of Health: Tanzania Population-Based Cancer Registry Report 2019 to 2023, table 2 (2022 census population, PDF)", url: PBCR_REPORT },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-olson-bugando-cancer-registry-2008-2016-canep-2020", name: "Cancer incidence and treatment at the Lake Zone's regional cancer centre in Tanzania, 2008 to 2016",
    journal: "Cancer Epidemiology", year: 2020, doi: "10.1016/j.canep.2020.101772", pmid: "32653779", authors: "Olson AC, Afyusisye F, Egger J, et al.", paperType: "observational", participants: 2772,
    tldr: "The Bugando Cancer Registry in Mwanza recorded 2,772 cancers from 2008 to 2016, cervical cancer the commonest in adults; it saw about one in eight of the cancers expected in its region, and nearly half of patients had no treatment recorded.",
    summary: "Published as \"Cancer incidence and treatment utilization patterns at a regional cancer center in Tanzania from 2008-2016: Initial report of 2,772 cases\". The authors reviewed every case in the Bugando Cancer Registry, a clinical and pathology registry at Bugando Medical Centre, the cancer referral hospital for the Lake Zone of north-western Tanzania, and compared it with GLOBOCAN 2012 estimates scaled to the region.",
    findings: [
      "2,772 cases were recorded from 2008 to 2016, 82.5% in adults; 85% were diagnosed by histology or cytology.",
      "In adults the commonest cancers were cervix (22.7%), breast (12.6%) and prostate (8.5%); in children non-Burkitt non-Hodgkin lymphoma (17.3%), Burkitt lymphoma (16.5%) and Wilms tumour (14.6%).",
      "The 1,116 cases recorded in 2016 were 12.2% of the 9,165 cancers expected for the Lake Zone.",
      "1,494 cases (53.9%) received some treatment; 1,278 (46.1%) had none recorded.",
    ],
    whatItMeans: "Most people with cancer in the Lake Zone never reached the one hospital that could treat them, so hospital counts there understate the burden many times over.",
    caveats: ["A hospital registry, not a population-based one.", "Treatment not recorded is not the same as treatment not given."],
    institutions: ["bugando-medical-centre"], cancers: ["cervical", "breast-cancer", "prostate", "burkitt-lymphoma"],
    links: [doi("10.1016/j.canep.2020.101772", "Cancer Epidemiol 2020"), pubmed("32653779")] }),

  p({ id: "paper-ngowi-kilimanjaro-prostate-registry-bmccancer-2024", name: "Prostate cancer in northern Tanzania from the Kilimanjaro cancer registry, 2015 to 2021",
    journal: "BMC Cancer", year: 2024, doi: "10.1186/s12885-024-13194-6", pmid: "39563287", authors: "Ngowi BN, Mremi A, Mbwambo OJ, et al.", paperType: "observational", participants: 5164,
    tldr: "Of 5,164 men in the Kilimanjaro cancer registry over 2015 to 2021, 31.4% had prostate cancer, with a rising trend; almost all had symptoms when diagnosed and 43.6% of those assessed already had metastatic disease.",
    summary: "Published as \"Trend in incidence and clinicopathological characteristics of prostate cancer in Northern Tanzania: analysis from a population based cancer registry data 2015-2021\". A cross-sectional study with chart review of all adult men registered with cancer in the Kilimanjaro cancer registry from January 2015 to December 2021.",
    findings: [
      "1,619 of 5,164 men registered (31.4%) had prostate cancer, with incidence increasing over the period; mean age at presentation was 73.9 years.",
      "Of 714 men with histologically confirmed disease, 710 (99.4%) had symptoms at presentation; median PSA was 109 ng/mL and 51.1% had a PSA above 100 ng/mL.",
      "Gleason grade groups 4 and 5 made up 29.5% and 31.2%; 178 (43.6%) had metastatic disease at presentation, and 94.6% were treated with androgen deprivation therapy.",
    ],
    whatItMeans: "Prostate cancer in northern Tanzania is usually found late, after symptoms appear, which is why the authors call for screening and why hormone therapy rather than curative treatment is the usual first treatment.",
    caveats: ["Detailed analysis was limited to the 714 men with confirmed histology.", "A regional registry; other regions may differ."],
    institutions: ["kilimanjaro-christian-medical-centre", "tanzania-population-based-cancer-registry"], cancers: ["prostate"],
    links: [doi("10.1186/s12885-024-13194-6", "BMC Cancer 2024"), pubmed("39563287")] }),

  p({ id: "paper-zullig-kilimanjaro-registry-validation-jgo-2016", name: "Validation and quality assessment of the Kilimanjaro Cancer Registry",
    journal: "Journal of Global Oncology", year: 2016, doi: "10.1200/jgo.2015.002873", pmid: "28717724", authors: "Zullig LL, Schroeder K, Nyindo P, et al.", paperType: "methods", participants: 100,
    tldr: "A 2015 check of 100 cases in the Kilimanjaro Cancer Registry against medical and pathology records found 98% agreement on primary site and 94% on morphology, but only 6 cases had a recorded stage.",
    summary: "In October 2015 four reviewers not connected with the registry compared about 100 randomly sampled cases in the Kilimanjaro Cancer Registry, based at Kilimanjaro Christian Medical Centre in Moshi, with the patients' medical and pathology records.",
    findings: [
      "All 100 cases had cancer site and morphology recorded; 92 were diagnosed by pathology.",
      "The registry agreed with medical records for 98% of primary sites and 94% of morphologies.",
      "Only 6 cases had a recorded stage, and diagnosis dates were within 30 days of the medical record for 32%.",
    ],
    whatItMeans: "The registry codes what kind of cancer a person has reliably, but stage and dates were weak, a gap the national registry report still describes in 2025.",
    caveats: ["A small sample.", "Checks accuracy of what was recorded, not completeness of case finding."],
    institutions: ["kilimanjaro-christian-medical-centre", "tanzania-population-based-cancer-registry"],
    links: [doi("10.1200/jgo.2015.002873", "J Glob Oncol 2016"), pubmed("28717724")] }),

  p({ id: "paper-mphuru-hpv-vaccine-introduction-tanzania-vaccine-2022", name: "How Tanzania introduced HPV vaccine nationally in 2018",
    journal: "Vaccine", year: 2022, doi: "10.1016/j.vaccine.2021.04.025", pmid: "33962839", authors: "Mphuru A, Li AJ, Kyesi F, et al.", paperType: "observational",
    tldr: "Tanzania introduced two doses of HPV vaccine for 14-year-old girls nationwide in April 2018, after a two-year pilot in Kilimanjaro; by the end of 2019 administrative coverage was 78% for the first dose and 49% for the second.",
    summary: "Published as \"National introduction of human papillomavirus (HPV) vaccine in Tanzania: Programmatic decision-making and implementation\". Key informant interviews in 2019 and a desk review of planning documents and administrative coverage data.",
    findings: [
      "The vaccine was introduced in April 2018 for a single age cohort of 14-year-old girls, through health facilities, outreach and schools.",
      "Over 6,000 health workers and 22,000 school staff were trained.",
      "Administrative coverage at the end of 2019 was 78% for the first dose and 49% for the second; no adverse events following vaccination were reported to the national level.",
    ],
    whatItMeans: "Describes how the programme that now reaches nearly every eligible girl began, and why a second dose was the hard part, before Tanzania moved to a single dose in 2024.",
    caveats: ["Administrative coverage depends on the accuracy of the target population estimate."],
    cancers: ["cervical"], related: ["hpv-vaccine"],
    links: [doi("10.1016/j.vaccine.2021.04.025", "Vaccine 2022"), pubmed("33962839")] }),

  p({ id: "paper-baisley-doris-one-dose-hpv-tanzania-lgh-2022", name: "DoRIS: one dose of HPV vaccine in Tanzanian girls compared with historical cohorts",
    journal: "The Lancet Global Health", year: 2022, doi: "10.1016/s2214-109x(22)00306-0", pmid: "36113532", authors: "Baisley K, Kemp TJ, Kreimer AR, et al.", paperType: "rct", participants: 930,
    tldr: "In the DoRIS trial in Mwanza, antibody levels two years after a single dose of HPV vaccine in girls aged 9 to 14 were not inferior to those in cohorts where one dose had protected for up to 11 years, supporting a one-dose schedule.",
    summary: "Published as \"Comparing one dose of HPV vaccine in girls aged 9-14 years in Tanzania (DoRIS) with one dose of HPV vaccine in historical cohorts: an immunobridging analysis of a randomised controlled trial\". DoRIS (NCT02834637) enrolled 930 girls from 54 government schools in Mwanza in 2017 and 2018 and randomised them to one, two or three doses of the 2-valent or 9-valent vaccine.",
    findings: [
      "930 girls were enrolled and 155 assigned to each of six schedules.",
      "At 24 months, HPV16 antibody levels after one dose of 2-valent vaccine were 22.9 IU/mL against 17.7 in the Costa Rica trial (ratio 1.30), and after one dose of 9-valent vaccine 13.7 against 6.7 in the IARC India trial (ratio 2.05).",
      "Non-inferiority was met for both vaccines and for both HPV16 and HPV18.",
    ],
    whatItMeans: "Tanzanian girls in this trial gave part of the evidence that one dose of HPV vaccine may be enough, the schedule Tanzania itself adopted in 2024.",
    caveats: ["Antibody levels are a bridge to protection, not a measure of prevented cancers.", "Girls with HIV were not eligible."],
    cancers: ["cervical"], related: ["hpv-vaccine"],
    links: [doi("10.1016/s2214-109x(22)00306-0", "Lancet Glob Health 2022"), pubmed("36113532")] }),

  p({ id: "paper-mahiti-cervical-screening-tdhs-2022-aph-2025", name: "Cervical screening among Tanzanian women aged 15 to 49 in the 2022 Demographic and Health Survey",
    journal: "Archives of Public Health", year: 2025, doi: "10.1186/s13690-025-01629-w", pmid: "40410900", authors: "Mahiti GR, Adam J, Luoga P", paperType: "observational", participants: 15254,
    tldr: "In Tanzania's 2022 Demographic and Health Survey, 7% of women aged 15 to 49 had ever been screened for cervical cancer; rural women, poorer women and those without health insurance were less likely to have been screened.",
    summary: "An analysis of 15,254 women aged 15 to 49 in the 2022 Tanzania Demographic and Health Survey, weighted according to DHS guidelines, looking at who had ever been screened for cervical cancer.",
    findings: [
      "7% (95% CI 6.58 to 7.93) of women aged 15 to 49 had ever been screened.",
      "Screening was more likely among women aged 30 to 49 (aOR 3.56) and women living with HIV (aOR 5.72).",
      "It was less likely among rural women (aOR 0.66), the poorest (aOR 0.49) and women never covered by health insurance (aOR 0.58).",
    ],
    whatItMeans: "Cervical screening reached very few Tanzanian women by 2022, far below WHO's 70% target, and least of all those with the fewest resources.",
    caveats: ["Self-reported screening.", "The 15 to 49 age range includes women younger than the screening target age."],
    cancers: ["cervical"],
    links: [doi("10.1186/s13690-025-01629-w", "Arch Public Health 2025"), pubmed("40410900")] }),

  p({ id: "paper-mccormick-cervical-screening-phia-jaids-2026", name: "Cervical screening coverage in Malawi, Tanzania, Zambia and Zimbabwe across two rounds of population HIV surveys",
    journal: "Journal of Acquired Immune Deficiency Syndromes", year: 2026, doi: "10.1097/qai.0000000000003880", pmid: "41983477", authors: "McCormick LJ, Gillot M, Ussery FL, et al.", paperType: "observational",
    tldr: "Self-reported cervical screening among women aged 30 to 49 rose by more than half in four African countries between survey rounds; Tanzania had the lowest coverage in both, 8.3% in 2015 to 2017 and 12.6% in 2020 to 2023.",
    summary: "Published as \"Cervical Cancer Screening Coverage Increased in Malawi, Tanzania, Zambia, and Zimbabwe: Findings From Sequential Population-Based HIV Impact Assessment Surveys 2015-2017 and 2020-2023\". The authors compared self-reported screening and treatment in two rounds of population-based HIV impact assessment surveys against WHO's elimination targets of 70% screening and 90% treatment.",
    findings: [
      "Screening coverage among women aged 30 to 49 ranged from 8.3% (Tanzania) to 19.8% (Zimbabwe) in round 1 and from 12.6% (Tanzania) to 37.3% (Zambia) in round 2.",
      "Coverage and its increase were higher among women with HIV than among HIV-negative women in all four countries.",
      "Reported treatment after a positive screen in round 2 ranged from 75.2% in Malawi to 93.6% in Zambia.",
    ],
    whatItMeans: "Tanzania's screening is rising but from the lowest base of the four countries, and remains far from the 70% target.",
    caveats: ["Self-reported.", "Tanzania's own treatment figure is not given in the abstract."],
    cancers: ["cervical"],
    links: [doi("10.1097/qai.0000000000003880", "J Acquir Immune Defic Syndr 2026"), pubmed("41983477")] }),

  p({ id: "paper-smith-out-of-pocket-childhood-cancer-kcmc-plosone-2025", name: "Out-of-pocket costs for families of children with cancer at KCMC, Tanzania",
    journal: "PLoS One", year: 2025, doi: "10.1371/journal.pone.0326755", pmid: "40569998", authors: "Smith ER, Espinoza P, Kajoka HD, et al.", paperType: "observational", participants: 13,
    tldr: "Among 13 families of children treated for cancer at Kilimanjaro Christian Medical Centre, median out-of-pocket health spending was about 53 US dollars, every family was pushed further into poverty, and caregivers described the hardest costs as those before definitive care.",
    summary: "Published as \"Impact of out-of-pocket expenses on children with cancer in Tanzania: A mixed-methods economic study\". The authors measured out-of-pocket spending and interviewed caregivers of children receiving cancer care at KCMC, using the Three Delays Framework.",
    findings: [
      "92% of the 13 families lived in rural areas and 68% were farmers or livestock keepers.",
      "Median out-of-pocket health spending was 53.01 US dollars (IQR 26.50 to 106.01).",
      "All families were pushed further into poverty; caregivers described selling assets to reach care.",
    ],
    whatItMeans: "Even modest costs before a child reaches treatment can impoverish rural families, which delays diagnosis.",
    caveats: ["Thirteen families at one hospital.", "Families reported higher costs in interviews than in the quantitative data."],
    institutions: ["kilimanjaro-christian-medical-centre"], cancers: ["childhood-cancers"],
    links: [doi("10.1371/journal.pone.0326755", "PLoS One 2025"), pubmed("40569998")] }),

];

export const recordsTZ: EntityInput[] = [...institutions, ...papers];
