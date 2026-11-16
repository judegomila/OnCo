import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Uzbekistan: the public bodies and papers behind /countries/uz/ (wave 6) that the corpus did not hold; before this
 * file it held no Uzbek institution, company, person or trial. Each record was written from its own primary source,
 * read raw on 11 November 2026: the presidential resolutions on lex.uz (PP-2866 of 4 April 2017, PP-402 of
 * 22 November 2024, PP-186 of 19 May 2025, PP-238 of 24 June 2026 and PP-18 of 20 January 2026, in lex.uz's Russian
 * text, which lex.uz marks as an unofficial translation where it has been amended; the Uzbek text is the official one),
 * Cabinet of Ministers resolution No. 738 of 24 November 2025 in its Uzbek original, the presidential resolution of
 * 12 November 2020 on president.uz that founded the State Medical Insurance Fund, the national cancer centre's own site
 * (cancercenter.uz: about, branches, management, the Gustave Roussy page and the free-care page), UZINFOCOM's
 * November 2024 news item on the Cancer-registr software, and the IAEA's imPACT Review summaries of 2014 and 2022.
 * DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the centre, the insurer, the regulator, the registry and both specialist centres;
 * the centre links its two registry papers and the screening pilot through keyPapers, the registry links the cervical
 * and oesophageal papers, and the maternal and child health centre links the HPV prevalence paper. Coordinates for the
 * national cancer centre are the map point its own site publishes; the others are approximate Tashkent city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PP_2866 = "https://lex.uz/ru/docs/3150747";
const PP_402 = "https://lex.uz/ru/docs/7232847";
const PP_186 = "https://lex.uz/ru/docs/7533975";
const PP_238 = "https://lex.uz/ru/docs/8287520";
const PP_18 = "https://lex.uz/ru/docs/8012680";
const CM_738_UZ = "https://lex.uz/docs/7853907";
const PP_SHIF_2020 = "https://president.uz/ru/lists/view/3957";
const CC_ABOUT = "https://cancercenter.uz/about/about-cancer-center?lang=en";
const CC_BRANCHES = "https://cancercenter.uz/about/branches?lang=en";
const CC_GR = "https://cancercenter.uz/about/gustave-roussy-international?lang=en";
const CC_FREE = "https://cancercenter.uz/patients/free-care-and-referral?lang=en";
const UZINFOCOM_REG = "https://uzinfocom.uz/en/news/111";

const institutions: InstitutionInput[] = [
  i({ id: "uzbekistan-ministry-of-health", name: "Ministry of Health of the Republic of Uzbekistan", aka: ["Ministry of Health Uzbekistan", "Sog'liqni saqlash vazirligi", "Минздрав Узбекистана"],
    city: "Tashkent", country: "UZ", lat: 41.31, lng: 69.28, institutionType: "government", website: "https://gov.uz/en/ssv",
    tldr: "Uzbekistan's health ministry. It runs the cancer service through the national oncology centre and its 14 regional branches, and under a June 2026 presidential resolution must approve a national cancer programme and a guaranteed package of cancer care, paid by the State Medical Insurance Fund from January 2027.",
    summary: "Cancer policy in Uzbekistan is set largely by presidential resolutions that the Ministry of Health carries out. Resolution PP-2866 of 4 April 2017 set up a single methodological chain of command for the oncology service, turning the Republican Oncology Research Centre into the Republican Specialized Scientific-Practical Medical Center of Oncology and Radiology and the regional oncology dispensaries into its branches. Resolution PP-402 of 22 November 2024 approved a cervical and breast cancer control programme for 2025 to 2030, with HPV testing for women aged 30 to 50 and breast examination every two years for women aged 30 to 65, and created a Coordination Council for cancer control projects. Resolution PP-186 of 19 May 2025 set childhood cancer goals for 2025 to 2030. The coordinates on this record are an approximate Tashkent city point.\n\nResolution PP-238 of 24 June 2026 sets national goals: screening coverage of at least 60% for the six commonest cancers, raising the share found at stages I and II from 30% to 40%, raising five-year survival for those cancers from 35% to at least 45%, and cutting their mortality from 5.1 to 3.7 per 100,000. It tells the Ministry to approve a national cancer programme drawn up with WHO, to adopt WHO's three-tier priority classification of cancer medicines, and to agree with the Ministry of Economy and Finance, by the end of 2026, the guaranteed volume of cancer care paid from the state budget. From 1 January 2027 the State Medical Insurance Fund is to pay for early detection tests, diagnosis and staging, surgery, first-group (basic) cancer medicines, radiotherapy, palliative care, rehabilitation and follow-up. The resolution names the Minister of Health, E. E. Adilov, as personally responsible for carrying it out.",
    programs: ["National cancer programme (PP-238, from 1 January 2027)", "Cervical and breast cancer control programme 2025 to 2030 (PP-402)", "National childhood cancer programme 2025 to 2030 (PP-186)", "Coordination Council for cancer control projects", "Modernisation of oncology institutions with the Islamic Development Bank (PP-242, phase II)"],
    institutions: ["rsspmcor-uzbekistan", "uzbekistan-state-health-insurance-fund", "uzbekistan-pharmaceutical-safety-center", "uzbekistan-cancer-registry", "uzbekistan-maternal-child-health-center", "uzbekistan-paediatric-oncology-center", "who", "iaea", "iarc"],
    cancers: ["breast-cancer", "cervical", "colorectal", "gastric", "prostate", "childhood-cancers"], related: ["global-oncology-access"],
    links: [
      { label: "Resolution PP-238 of 24 June 2026 on prevention, early detection and treatment of cancer (lex.uz, Russian)", url: PP_238 },
      { label: "Resolution PP-402 of 22 November 2024 on cancer control among women (lex.uz, Russian)", url: PP_402 },
      { label: "Resolution PP-2866 of 4 April 2017 on the oncology service for 2017 to 2021 (lex.uz, Russian)", url: PP_2866 },
      { label: "Resolution PP-186 of 19 May 2025 on the national childhood cancer programme (lex.uz, Russian)", url: PP_186 },
    ] }),

  i({ id: "rsspmcor-uzbekistan", name: "Republican Specialized Scientific-Practical Medical Center of Oncology and Radiology (Cancer Center Uzbekistan)", aka: ["Cancer Center Uzbekistan", "RSSPMCOR", "RSSPMCO&R", "Republican Oncology Research Centre", "Республиканский специализированный научно-практический медицинский центр онкологии и радиологии"],
    city: "Tashkent", country: "UZ", lat: 41.3562, lng: 69.1712, institutionType: "cancer-center", website: "https://cancercenter.uz",
    tldr: "Uzbekistan's national cancer centre in Tashkent, at the head of a single oncology service with 14 regional branches. It lists 650 inpatient beds, and since 20 May 2026 it has worked as Gustave Roussy International Uzbekistan in partnership with the French cancer institute.",
    summary: "The centre was founded in 1962 as a research institute for oncology and radiology. Presidential resolution PP-2866 of 4 April 2017 turned the Republican Oncology Research Centre into the Republican Specialized Scientific-Practical Medical Center of Oncology and Radiology, made the regional oncology dispensaries and the Tashkent city dispensary its branches, and set up within it a Cancer Prevention Centre, charged among other things with the national cancer registry, and a Centre of Experimental Oncology. Its site lists 14 regional branches, 650 inpatient beds, 100 ambulatory chemotherapy beds, 1,250 medical staff and more than 6,000 high-technology operations a year; its branch pages give each regional branch's beds and yearly patients, from 50 beds in Kokand to 240 in the Tashkent region. Its new complex is at 14A Tashkent Ring Road, Almazar district; the coordinates are the map point its site publishes.\n\nThe centre's partnership with Gustave Roussy began with a cooperation agreement in September 2025; on 19 January 2026 the Ministry of Health and Gustave Roussy signed an agreement in Paris to bring the centre into the Gustave Roussy international network, and it opened under the name Gustave Roussy International Uzbekistan on 20 May 2026. Equipment for the new complex is financed in part through the Islamic Development Bank's oncology modernisation project, whose loan the government records as 90 million US dollars after an April 2025 addition. Under PP-402 the centre hosts a central mammogram reading centre for breast screening. Its free-care page, marked as a draft awaiting legal review, says care is free for patients with an electronic referral through the DMED system, paid by the State Medical Insurance Fund, and that Tashkent residents have used electronic referrals since 2 October 2026.",
    programs: ["National oncology service with 14 regional branches", "Cancer Prevention Centre and national cancer registry", "Central mammogram reading centre (PP-402)", "Gustave Roussy International Uzbekistan (from 20 May 2026)", "Free care on electronic referral through DMED"],
    institutions: ["gustave-roussy", "uzbekistan-ministry-of-health", "uzbekistan-cancer-registry", "uzbekistan-state-health-insurance-fund", "iaea"],
    cancers: ["breast-cancer", "cervical", "colorectal", "gastric", "esophageal"],
    keyPapers: ["paper-zahirova-hpv-screening-pilot-uzbekistan-jcogo-2026", "paper-yusupbekov-oesophageal-cancer-uzbekistan-apjcp-2020", "paper-rim-uzbekistan-korea-consortium-breast-cervical-medicina-2022"],
    links: [
      { label: "Cancer Center Uzbekistan: about the center", url: CC_ABOUT },
      { label: "Cancer Center Uzbekistan: regional branches", url: CC_BRANCHES },
      { label: "Cancer Center Uzbekistan: Gustave Roussy International Uzbekistan", url: CC_GR },
      { label: "Cancer Center Uzbekistan: free treatment, referrals and what is paid (draft page)", url: CC_FREE },
      { label: "Resolution PP-2866 of 4 April 2017 (lex.uz, Russian)", url: PP_2866 },
      { label: "Resolution PP-18 of 20 January 2026 on the Islamic Development Bank project (lex.uz, Russian)", url: PP_18 },
    ] }),

  i({ id: "uzbekistan-state-health-insurance-fund", name: "State Medical Insurance Fund of Uzbekistan", aka: ["State Health Insurance Fund", "Davlat tibbiy sug'urta jamg'armasi", "Фонд государственного медицинского страхования", "SHIF"],
    city: "Tashkent", country: "UZ", lat: 41.3, lng: 69.27, institutionType: "government", website: "https://dtsj.uz",
    tldr: "Uzbekistan's public health purchaser, founded on 1 December 2020 for a pilot in Syrdarya region. It pays for hospital cancer care on electronic referral, and from January 2027 a presidential resolution makes it the payer for cancer diagnosis, treatment, palliative care and follow-up.",
    summary: "A presidential resolution of 12 November 2020 on a new model of health care and state medical insurance in Syrdarya region, based on WHO recommendations, founded the State Medical Insurance Fund from 1 December 2020 to introduce and run state medical insurance, with an executive staff limit of 46. It buys services in a guaranteed package financed from the state budget. The coordinates on this record are an approximate Tashkent city point.\n\nPresidential resolution PP-402 of 2024 told the Ministry of Health to buy cervical and breast screening from public and private providers through the Fund from 2025. Resolution PP-238 of 24 June 2026 sets that from 1 January 2027 the Fund pays, within the state-guaranteed volume of care, for early detection tests, diagnosis and staging (with a Ministry list of molecular tests), surgery, first-group (basic) anticancer, hormonal and supportive medicines and radiotherapy, palliative care, and rehabilitation and follow-up. The same resolution creates inside the Fund a Fund for Combating Non-communicable Diseases, without separate legal status, financed from 2027 by half of the excise on soft drinks, crisps, alcohol, beer and energy drinks, among other sources, and spent on decisions of the Coordination Council on cancer and rare-disease care. The national cancer centre's free-care page says the Fund pays for each confirmed electronic referral.",
    programs: ["State medical insurance (from the Syrdarya pilot, December 2020)", "Payment for cancer care on electronic referral", "Cancer care in the guaranteed volume (PP-238, from 1 January 2027)", "Fund for Combating Non-communicable Diseases (PP-238)", "Purchase of cervical and breast screening (PP-402)"],
    institutions: ["uzbekistan-ministry-of-health", "rsspmcor-uzbekistan"],
    links: [
      { label: "Presidential resolution of 12 November 2020 on state medical insurance in Syrdarya region (president.uz, Russian)", url: PP_SHIF_2020 },
      { label: "Resolution PP-238 of 24 June 2026, items 7, 9 and 10 (lex.uz, Russian)", url: PP_238 },
      { label: "State Medical Insurance Fund (site, Uzbek)", url: "https://dtsj.uz/" },
    ] }),

  i({ id: "uzbekistan-pharmaceutical-safety-center", name: "Center for the Safety of Pharmaceutical Products (Uzbekistan)", aka: ["Pharmaceutical Products Safety Center", "Farmatsevtika mahsulotlari xavfsizligi markazi", "Центр безопасности фармацевтической продукции", "CPPS"],
    city: "Tashkent", country: "UZ", lat: 41.31, lng: 69.26, institutionType: "government", website: "https://uzpharm-control.uz",
    tldr: "Uzbekistan's medicines regulator, a state institution under the Ministry of Health. Under rules in force since 26 February 2026 it reviews a standard application for a new medicine in 210 days and one registered by recognition of a foreign approval, or WHO-prequalified, in 60.",
    summary: "The Center for the Safety of Pharmaceutical Products is the state institution under the Ministry of Health that registers medicines and medical devices. Cabinet of Ministers resolution No. 738 of 24 November 2025, in force from 26 February 2026, approved its regulation on the state registration of medicines. The coordinates on this record are an approximate Tashkent city point.\n\nIn the Uzbek text of the regulation, the Center reviews an application in 30 days for a one-year registration of an epidemic or pandemic vaccine, 45 days for an active substance, 60 days for a medicine registered by recognition or a WHO-prequalified medicine, and 210 days under the standard procedure. Time the applicant takes to correct deficiencies, time to verify foreign certificates, clinical studies not yet done in Uzbekistan (up to one year for a generic and up to three years for an original medicine) and GMP assessment are not counted. Medicines without a registered analogue, orphan medicines, medicines in high demand and the first copy of an original are registered with priority, and the Ministry is to publish the priority list on the Center's site and have its laboratories prequalified by WHO by the end of 2026. Separately, presidential resolution PP-238 of June 2026 lets the national cancer centre use newer cancer, haematology and pain medicines approved abroad but not made in Uzbekistan, registered by recognition, on a list the Coordination Council approves.",
    programs: ["State registration of medicines and medical devices (Cabinet resolution No. 738, from 26 February 2026)", "Registration by recognition of foreign approvals", "Priority registration (no analogue, orphan, high demand, first copy)", "Post-marketing quality control"],
    institutions: ["uzbekistan-ministry-of-health"],
    links: [
      { label: "Cabinet of Ministers resolution No. 738 of 24 November 2025 on state registration of medicines and medical devices (lex.uz, Uzbek)", url: CM_738_UZ },
      { label: "Resolution PP-238 of 24 June 2026, item 8 (lex.uz, Russian)", url: PP_238 },
      { label: "Center for the Safety of Pharmaceutical Products (site)", url: "https://uzpharm-control.uz/" },
    ] }),

  i({ id: "uzbekistan-cancer-registry", name: "Uzbekistan national cancer registry (Cancer-registr)", aka: ["Cancer-registr", "Cancer-регистр", "Uzbekistan cancer register"],
    city: "Tashkent", country: "UZ", lat: 41.35, lng: 69.18, institutionType: "government", website: UZINFOCOM_REG,
    tldr: "Uzbekistan's cancer register, assigned in 2017 to the national oncology centre's Cancer Prevention Centre and being moved onto new Cancer-registr software built with UZINFOCOM in 2024. A June 2026 resolution asks for it to meet international standards by the end of 2026.",
    summary: "Presidential resolution PP-2866 of 4 April 2017 gave the Cancer Prevention Centre within the Republican Specialized Scientific-Practical Medical Center of Oncology and Radiology the task of forming a single information base of cancer patients (a cancer registry) and monitoring the epidemiological situation. On 8 November 2024 UZINFOCOM, the state information systems integrator, reported that it and the centre had developed Cancer-registr software following IARC specialists' recommendations, and had trained registry staff from all regional centres and branches from 4 to 8 November, with launch across Uzbekistan in preparation. Presidential resolution PP-238 of 24 June 2026 tells the digital technologies and health ministries to bring the Cancer-registr system into line with international standards for cancer registration by the end of 2026, and to build a digital patient pathway in the national e-health system by the end of 2027. The coordinates on this record are approximate, at the national cancer centre.\n\nPublished analyses draw on the registry's data: the Tashkent City Oncoregister counted 2,140 women with invasive cervical cancer or carcinoma in situ in 2014 to 2024, and the national epidemiological database recorded 17,144 oesophageal cancers in 2000 to 2018. OnCo found no published national registry report with counts for all cancers, and did not check whether any Uzbek registry is included in IARC's Cancer Incidence in Five Continents.",
    programs: ["National cancer register (PP-2866, 2017)", "Cancer-registr software with UZINFOCOM (2024)", "Upgrade to international registration standards (PP-238, by end of 2026)"],
    institutions: ["rsspmcor-uzbekistan", "uzbekistan-ministry-of-health", "iarc"], cancers: ["cervical", "esophageal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-mirzaev-tashkent-cervical-registry-2014-2024-jncics-2026", "paper-yusupbekov-oesophageal-cancer-uzbekistan-apjcp-2020"],
    links: [
      { label: "UZINFOCOM: UZINFOCOM and the Republican Oncology Centre developed the Cancer-registr program (8 November 2024, Russian)", url: UZINFOCOM_REG },
      { label: "Resolution PP-2866 of 4 April 2017, item 5 (lex.uz, Russian)", url: PP_2866 },
      { label: "Resolution PP-238 of 24 June 2026, item 14 (lex.uz, Russian)", url: PP_238 },
    ] }),

  i({ id: "uzbekistan-maternal-child-health-center", name: "Republican Specialized Scientific-Practical Medical Center of Maternal and Child Health (Uzbekistan)", aka: ["Republican Center of Maternal and Child Health", "Республиканский специализированный научно-практический медицинский центр здоровья матери и ребенка"],
    city: "Tashkent", country: "UZ", lat: 41.3, lng: 69.25, institutionType: "hospital", website: PP_402,
    tldr: "The national maternal and child health centre in Tashkent. Under Uzbekistan's 2024 cervical and breast cancer programme it treats precancerous cervical lesions found by HPV screening, runs the HPV test quality reference laboratory and trains gynaecologists in screening.",
    summary: "Presidential resolution PP-402 of 22 November 2024 makes the Republican Specialized Scientific-Practical Medical Center of Maternal and Child Health, with the national oncology centre, the working body of the Coordination Council for cancer control projects. Women found to have precancerous cervical lesions through the programme's HPV screening are sent to this centre and its regional branches for outpatient treatment. From 1 January 2025 it was to run a reference laboratory for the quality of HPV test systems, and from the 2025/2026 academic year to run courses training gynaecologists in cervical and breast screening. The coordinates on this record are an approximate Tashkent city point; OnCo did not find the centre's own website.\n\nResearchers from the centre published an analysis of 44,497 women aged 20 and over tested for high-risk HPV in Tashkent, Andijan and Samarkand in 2021 to 2023, which found the virus in 8.5% and HPV 16 or 18 in 41.1% of infections.",
    programs: ["Treatment of precancerous cervical lesions (PP-402)", "Reference laboratory for HPV test quality", "Training of gynaecologists in cervical and breast screening"],
    institutions: ["uzbekistan-ministry-of-health", "rsspmcor-uzbekistan"], cancers: ["cervical", "breast-cancer"],
    keyPapers: ["paper-oltieva-high-risk-hpv-44000-women-uzbekistan-bmcid-2025"],
    links: [
      { label: "Resolution PP-402 of 22 November 2024, items 2 to 4 and 7 (lex.uz, Russian)", url: PP_402 },
      doi("10.1186/s12879-025-12096-7", "Oltieva et al., high-risk HPV among 44,000 women in Uzbekistan (BMC Infect Dis 2025)"),
    ] }),

  i({ id: "uzbekistan-paediatric-oncology-center", name: "Scientific-Practical Medical Center of Paediatric Oncology, Haematology and Immunology (Uzbekistan)", aka: ["Centre of Paediatric Oncology, Haematology and Immunology", "Научно-практический медицинский центр детской онкологии, гематологии и иммунологии"],
    city: "Tashkent", country: "UZ", lat: 41.32, lng: 69.24, institutionType: "hospital", website: PP_186,
    tldr: "Uzbekistan's national centre for children with cancer and blood cancers. The 2025 to 2030 childhood cancer programme strengthens it and aims to raise one-year survival for these children from 34% to 90% and five-year survival to at least 60%.",
    summary: "Presidential resolution PP-186 of 19 May 2025, renamed by decree UP-191 of 10 September 2026 as measures to implement the National Childhood Cancer Programme for 2025 to 2030 drawn up with WHO and international experts, names the Scientific-Practical Medical Center of Paediatric Oncology, Haematology and Immunology as the centre whose infrastructure is to be strengthened for high-technology care, with regional children's multidisciplinary centres. The programme's goals are to find 65% of childhood cancers at an early stage, raise one-year survival of children with cancer and blood cancers from 34% to 90% and five-year survival to at least 60%, give all children with cancer specialist care, diagnose blood cancers within 4 days and other cancers within 14, and start treatment within 10 to 20 days. A pilot in 2025 and 2026 in Samarkand city and Ishtikhan district trains primary care teams, sets a fast-track route for children with suspected cancer and adds palliative care. The coordinates on this record are an approximate Tashkent city point; OnCo did not find the centre's own website.\n\nResolution PP-238 of June 2026 sets that the International Academic Hub for childhood cancer, created under PP-186, serves as the scientific base for oncology research in the national cancer programme.",
    programs: ["National Childhood Cancer Programme 2025 to 2030 (PP-186)", "Fast-track diagnosis for suspected childhood cancer", "Pilot in Samarkand city and Ishtikhan district", "International Academic Hub for childhood cancer"],
    institutions: ["uzbekistan-ministry-of-health", "who"], cancers: ["childhood-cancers"],
    links: [
      { label: "Resolution PP-186 of 19 May 2025 on the national childhood cancer programme (lex.uz, Russian)", url: PP_186 },
      { label: "Resolution PP-238 of 24 June 2026, item 13 (lex.uz, Russian)", url: PP_238 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-mirzaev-tashkent-cervical-registry-2014-2024-jncics-2026", name: "Cervical cancer trends in Tashkent, 2014 to 2024, from the city oncology register",
    journal: "JNCI Cancer Spectrum", year: 2026, doi: "10.1093/jncics/pkag107", pmid: "42853092", authors: "Mirzaev UK, Juraev JR, Sharipova IP, et al.", paperType: "observational", participants: 2140,
    tldr: "In Tashkent's cancer register, 2,140 women had cervical cancer or carcinoma in situ in 2014 to 2024. After screening projects began, in situ diagnoses rose and advanced-stage disease fell, but three quarters of staged invasive cancers were still stage II to IV.",
    summary: "Published as \"Population-based registry analysis of cervical cancer trends in Tashkent, Uzbekistan 2014-2024\". The authors analysed Tashkent City Oncoregister data for women diagnosed with invasive cervical cancer or carcinoma in situ, calculating age-standardised incidence and mortality and survival, to look at the effect of a Korea Foundation for International Healthcare (KOFIH) screening project and UNFPA and UNDP HPV testing initiatives.",
    findings: [
      "The age-standardised incidence of invasive cervical cancer was 14.9 per 100,000.",
      "After the screening projects began, carcinoma in situ diagnoses rose 3.4-fold and the share of stage III to IV disease fell by 43%.",
      "Five-year survival ranged from 91.5% for carcinoma in situ to 27.8% for stage IV; crude mortality fell from 10.2 to 1.1 per 100,000 between 2014 and 2024.",
      "76.6% of staged invasive cases were stage II to IV, and more than 80% of women had never been screened.",
    ],
    whatItMeans: "One of the few published analyses of an Uzbek population register, it shows organised screening finding cervical cancer earlier in the capital, and how far coverage still has to go.",
    caveats: ["One city.", "Before and after comparison, not a trial; other changes over the period may contribute."],
    institutions: ["uzbekistan-cancer-registry"], cancers: ["cervical"],
    links: [doi("10.1093/jncics/pkag107", "JNCI Cancer Spectr 2026"), pubmed("42853092")] }),

  p({ id: "paper-zahirova-hpv-screening-pilot-uzbekistan-jcogo-2026", name: "Evaluation of Uzbekistan's 2021 HPV screening pilot in Karakalpakstan",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/GO-25-00250", pmid: "41538754", authors: "Zahirova N, Tillyashaykhov M, Egamberdiev D, et al.", paperType: "observational", participants: 50000,
    tldr: "In 2021 the Ministry of Health tested 50,000 women for HPV at 11 polyclinics in Karakalpakstan. 6.8% were positive and almost all attended colposcopy, but test supply, referral, pathology quality and data collection were problems.",
    summary: "Published as \"Lessons Learned From Evaluation of a Human Papillomavirus Screening Pilot in Uzbekistan\". Women aged 30 to 55 were invited for HPV screening at 11 polyclinics in Karakalpakstan; samples were tested locally with GeneXpert in nine polyclinics and HPV-positive women were triaged with colposcopy. Authors include staff of the national oncology centre.",
    findings: [
      "Over 10 months 50,000 women were tested; 98% of results were satisfactory and 6.8% were HPV positive.",
      "93.9% of HPV-positive women had triage colposcopy, which was abnormal in 32.5%.",
      "An external review agreed with local histopathology in 64.6% of cases; treatment adherence was not tracked systematically.",
    ],
    whatItMeans: "The pilot that preceded the national HPV-based cervical screening programme of 2024; it shows that women came forward in large numbers and where the system needs strengthening.",
    caveats: ["One province; colposcopists in the pilot were not trained to take biopsies or treat."],
    institutions: ["rsspmcor-uzbekistan"], cancers: ["cervical"],
    links: [doi("10.1200/GO-25-00250", "JCO Glob Oncol 2026"), pubmed("41538754")] }),

  p({ id: "paper-oltieva-high-risk-hpv-44000-women-uzbekistan-bmcid-2025", name: "High-risk HPV among 44,000 women in Tashkent, Andijan and Samarkand",
    journal: "BMC Infectious Diseases", year: 2025, doi: "10.1186/s12879-025-12096-7", pmid: "41402780", authors: "Oltieva MP, Alieva DA, Abdusattorova SB, et al.", paperType: "observational", participants: 44497,
    tldr: "Among 44,497 women attending gynaecological services in three regions in 2021 to 2023, 8.5% carried high-risk HPV, and HPV 16 or 18, the types the vaccine prevents, accounted for 41.1% of infections.",
    summary: "Published as \"Epidemiology of high-risk HPV in Uzbekistan among 44,000 women - genotypes, risk profiles and screening needs in Uzbekistan\". Women aged 20 and over attending gynaecological services in Tashkent, Andijan and Samarkand had liquid-based cytology and HPV DNA testing for 12 high-risk types.",
    findings: [
      "High-risk HPV was found in 3,779 women (8.5%): 9.2% in Andijan, 8.8% in Tashkent and 6.5% in Samarkand.",
      "52.8% of infections were mixed; HPV 16 or 18 accounted for 41.1%.",
      "Among HPV-positive women with cytology, 6.9% had HSIL and 0.3% carcinoma.",
    ],
    whatItMeans: "HPV prevalence data from three Uzbek regions, supporting HPV-based screening and vaccination.",
    caveats: ["Women attending services, not a random population sample."],
    institutions: ["uzbekistan-maternal-child-health-center"], cancers: ["cervical"],
    links: [doi("10.1186/s12879-025-12096-7", "BMC Infect Dis 2025"), pubmed("41402780")] }),

  p({ id: "paper-yusupbekov-oesophageal-cancer-uzbekistan-apjcp-2020", name: "Oesophageal cancer in Uzbekistan, 2000 to 2018, from the national epidemiological database",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2020, doi: "10.31557/APJCP.2020.21.8.2281", pmid: "32856856", authors: "Yusupbekov A, Kanda M, Usmanov B, et al.", paperType: "observational", participants: 17144,
    tldr: "Uzbekistan's national database recorded 17,144 oesophageal cancers in 2000 to 2018. Incidence peaked at 3.9 per 100,000 in 2007, most patients were diagnosed at stage III, and five-year survival at that stage rose from about 15% to about 25%.",
    summary: "Published as \"Surveillance of Esophageal Cancer in the Republic of Uzbekistan from 2000 to 2018\". Authors from the national oncology centre and Nagoya University reviewed incidence trends using data on 17,144 patients from Uzbekistan's national epidemiological database.",
    findings: [
      "Mean incidence over the period was 2.8 per 100,000; it peaked at 3.9 in 2007 and was below 2.5 from 2014.",
      "80.0% were squamous cell carcinoma and 20.0% adenocarcinoma; 37.5% of patients were aged 61 to 70.",
      "Most patients were diagnosed at stage III, where five-year survival rose from about 15% (2000 to 2009) to a plateau of about 25% (2012 to 2018).",
    ],
    whatItMeans: "A rare long run of national registry data from Uzbekistan, showing late diagnosis of oesophageal cancer.",
    caveats: ["Crude incidence from a passive national database; completeness is not reported in the abstract."],
    institutions: ["rsspmcor-uzbekistan", "uzbekistan-cancer-registry"], cancers: ["esophageal"],
    links: [doi("10.31557/APJCP.2020.21.8.2281", "Asian Pac J Cancer Prev 2020"), pubmed("32856856")] }),

  p({ id: "paper-rim-uzbekistan-korea-consortium-breast-cervical-medicina-2022", name: "Breast and cervical cancer in Uzbekistan and Korea: first report of the Uzbekistan-Korea Oncology Consortium",
    journal: "Medicina", year: 2022, doi: "10.3390/medicina58101428", pmid: "36295588", authors: "Rim CH, Lee WJ, Musaev B, et al.", paperType: "review",
    tldr: "Oncologists from Uzbekistan's national cancer centre and Korea formed an advisory consortium and reviewed Uzbek cancer statistics, starting with breast and cervical cancer, to recommend how Uzbekistan could manage cancer, drawing on Korea's national screening experience.",
    summary: "Published as \"Comparison of Breast Cancer and Cervical Cancer in Uzbekistan and Korea: The First Report of The Uzbekistan-Korea Oncology Consortium\". The consortium of the Republican Specialized Scientific-Practical Medical Center of Oncology and Radiology and a South Korean advisory group reviewed literature and cancer statistics for both countries, covering breast and cervical cancer in this report; later reports covered lung and liver, and stomach and colorectal cancer.",
    findings: [
      "The review groups Uzbekistan's major cancers into gynaecological (breast and cervical), cancers common in men (lung and liver) and gastrointestinal (stomach and colorectal).",
      "It contrasts Uzbekistan with South Korea, whose national screening covers seven major cancers and where five-year survival rose from 42.9% to 70.7% over 20 years.",
    ],
    whatItMeans: "A starting point for Uzbek cancer planning written with the national cancer centre; its recommendations, not new data, are its contribution.",
    caveats: ["A narrative review; the abstract gives no Uzbek figures."],
    institutions: ["rsspmcor-uzbekistan", "uzbekistan-ministry-of-health"], cancers: ["breast-cancer", "cervical"],
    links: [doi("10.3390/medicina58101428", "Medicina 2022"), pubmed("36295588")] }),
];

/** Records behind /countries/uz/ (wave 6). */
export const recordsUZ: EntityInput[] = [...institutions, ...papers];
