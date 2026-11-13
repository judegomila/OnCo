import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Iraq: the public bodies, cancer centres and papers behind /countries/iq/ (wave 5) that the corpus did not hold. Each
 * was written from its own primary source, read as raw text on 11 November 2026: the Iraqi Cancer Board's Cancer
 * Registry of Iraq annual report 2022 (Ministry of Health PDF, published March 2024), the Ministry of Justice's English
 * translation of Health Insurance Law No. 22 of 2020 (Internet Archive copy, because moj.gov.iq did not answer), the
 * Kurdistan Region government's service page for medicine registration (Internet Archive copy, because service.gov.krd
 * refused the request), the WHO Eastern Mediterranean Health Journal report on pharmaceutical regulation in Iraq, two
 * IAEA news stories on the 2021 imPACT review and its 2023 follow-up (Internet Archive copies, because iaea.org returned
 * a bot challenge), and UICC member profiles (Internet Archive copies, because uicc.org refused a script). Paper DOIs
 * and PubMed ids were resolved through Europe PMC and the abstracts read.
 *
 * Inbound links: the Cancer Board, the regulator, KIMADIA, the Health Insurance Authority, KMCA and the three cancer
 * centres link to each other, and the Cancer Board and the regulator link the three papers through keyPapers.
 * Coordinates are city points, not buildings.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ICR_2022 = "https://storage.moh.gov.iq/2024/03/31/2024_03_31_11983087032_3940351786864953.pdf";
const HI_LAW = "https://web.archive.org/web/20251130124032/https://moj.gov.iq/upload/pdf/%D9%82%D8%A7%D9%86%D9%88%20%D9%86%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%20%D8%A7%D9%84%D8%B5%D8%AD%D9%8A%20(1)%20(2)%20-%20Copy_306.pdf";
const EMHJ_2021 = "https://applications.emro.who.int/EMHJ/V27/10/1020-3397-2021-2710-1007-1015-eng.pdf";
const KMCA_SERVICE = "https://web.archive.org/web/20260320160440/https://service.gov.krd/en/node/993";
const IAEA_2022 = "https://web.archive.org/web/20250520170251/https://www.iaea.org/newscenter/news/iaea-review-prompts-regional-cooperation-to-address-cancer-workforce-challenges-in-iraq";
const IAEA_2023 = "https://web.archive.org/web/20250424190521/https://www.iaea.org/newscenter/news/iraq-makes-progress-in-improving-cancer-services-implements-impact-review-recommendation";
const UICC_ZHIANAWA = "https://web.archive.org/web/20260516022648/https://www.uicc.org/membership/zhianawa-cancer-center";
const UICC_RIZGARY = "https://web.archive.org/web/20260714223623/https://www.uicc.org/membership/rizgary-oncology-center";
const RUDAW_2025_02 = "https://www.rudaw.net/english/kurdistan/150220257";
const RUDAW_2025_11 = "https://www.rudaw.net/english/middleeast/iraq/141120254";

const institutions: InstitutionInput[] = [
  i({ id: "iraqi-cancer-board", name: "Iraqi Cancer Board (Ministry of Health, Iraq)", aka: ["ICB", "Cancer Board in Iraq", "Iraqi Cancer Registry", "Cancer Registry of Iraq"],
    city: "Baghdad", country: "IQ", lat: 33.315, lng: 44.366, institutionType: "government",
    tldr: "The Ministry of Health body, set up by law in 1985, that runs Iraq's national population-based cancer registry and publishes its annual report. Its registry counted 39,068 new cancers among Iraqis in 2022, including the three governorates of the Kurdistan Region.",
    summary: "The Iraqi Cancer Board was established by Law 63 of 1985 and is headed by the Minister of Health by law, according to the introduction to its Cancer Registry of Iraq annual report 2022. Its cancer registration division runs the Iraqi Cancer Registry, which the report describes as a population-based registry collecting all new cancers diagnosed in Iraq. Trained staff in cancer registry units in every health directorate record cases from hospitals, pathology laboratories and clinics in CanReg5; completed forms are reviewed by the Board's registry section and checked against an alphabetical index to prevent duplicates. The first registry report, published in 1987, covered 1976 to 1985, and after a series of multi-year reports ending with 1998 to 1999 the reports have been annual. The 2022 report notes that from 1995 to 2004 the data exclude the Kurdistan Region's three governorates (Erbil, Duhok and Sulaimaniyah), which are included in 2022.\n\nThe 2022 report counts 39,068 new cancers among Iraqi nationals (16,287 in men and 22,781 in women), a crude rate of 92.5 per 100,000 and an age-standardised rate of 158.9, and 11,421 cancer deaths. Breast cancer was 21.2% of all cases; lung, colorectal and prostate cancer led in men and breast, thyroid and colorectal cancer in women. The report was prepared by the director of the Board's cancer research division with the registry's statisticians, and reviewed by a panel including its General Secretary, Dr Tahseen Al-Rubai, and the director of its cancer registration division. In February 2025 the director of the cancer registration division told Rudaw that 43,062 cancers were registered in Iraq and the Kurdistan Region in 2023, 1,922 of them in children aged 14 or under. In the Kurdistan Region, a separate registry analysis of Erbil and Duhok used data from the Medical Statistics Department of the regional Ministry of Health. The coordinates are a Baghdad city point.",
    programs: ["Iraqi Cancer Registry (population-based, national)", "Annual report: Cancer Registry of Iraq", "Cancer registration and cancer research divisions"],
    institutions: ["iraq-moh-technical-affairs", "iraq-health-insurance-authority", "al-amal-national-oncology-hospital", "zhianawa-cancer-center", "rizgary-oncology-center", "iarc", "who", "iaea"],
    people: ["tahseen-al-rubai"],
    keyPapers: ["paper-m-amen-kurdistan-cancer-incidence-apjcp-2022", "paper-alwan-breast-cancer-iraq-emhj-2010"],
    cancers: ["breast-cancer", "lung-cancer", "colorectal", "thyroid", "childhood-cancers"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (Ministry of Health, PDF)", url: ICR_2022 },
      { label: "Rudaw: Iraqi Cancer Board figures for 2023 (15 February 2025)", url: RUDAW_2025_02 },
      { label: "IAEA: Iraq makes progress in improving cancer services (30 March 2023, Internet Archive copy)", url: IAEA_2023 },
    ] }),

  i({ id: "iraq-moh-technical-affairs", name: "Directorate of Technical Affairs, Ministry of Health, Iraq (medicines regulator)", aka: ["Directorate of Technical Affairs", "Iraqi medicines regulatory authority", "National Committee for Drug Selection", "National Centre for Drug Control and Research", "Iraqi Pharmacovigilance Centre"],
    city: "Baghdad", country: "IQ", lat: 33.32, lng: 44.38, institutionType: "government",
    tldr: "The Ministry of Health directorate that acts as Iraq's medicines regulator: it registers medicines and companies, keeps the national essential medicines list, sets registration prices, tests every batch and runs pharmacovigilance. A fast-track route introduced in 2019 relies on approvals by the FDA, EMA and other named regulators.",
    summary: "A 2021 report in the WHO's Eastern Mediterranean Health Journal, written by authors from the University of Baghdad, the Iraqi Pharmacovigilance Centre, the Minister's office and WHO, and based on the Iraq pharmaceutical country profile 2020, describes the Directorate of Technical Affairs as the main entity responsible for medicine regulation. Its Registration Department grants marketing authorisation to companies and products for the public and private sectors, sets registration prices (brand prices mainly by reference to Jordan, Saudi Arabia and the British National Formulary) and reviews registrations every five years. Its National Committee for Drug Selection, of 12 to 16 specialist physicians and pharmacists meeting usually weekly, selects medicines for the three-level national essential medicines list (1,105 medicines and vaccines, 554 of them at level 1, on 23 June 2020) and the comprehensive list (3,700 medicines), and asks for pharmacoeconomic studies before approving high-cost medicines such as biological and oncology medicines.\n\nThe Directorate recognises certificates from the FDA, EMA, WHO and the regulators of the United Kingdom, Switzerland, Canada, Australia, Japan and the Gulf Cooperation Council. Fast-track registration, introduced in February 2019, gives a product approved by one of these a temporary registration and import licence within a month on seven documents; the regular pathway takes about a year. Registered medicines rose from 2,500 in December 2018 to 4,665 in August 2020. Its National Centre for Drug Control and Research, founded in 1984, tests medicines before registration and usually every batch before release, with exemptions for products holding FDA, EMA or UK certificates, and the Iraqi Pharmacovigilance Centre, part of its Pharmacy Department, has been a member of the WHO Programme for International Drug Monitoring since 2010. The Kurdistan Region regulates medicines through its own agency, which requires the federal registration decision first. The coordinates are a Baghdad city point.",
    programs: ["Registration Department (marketing authorisation and pricing)", "National Committee for Drug Selection (essential and comprehensive medicines lists)", "Fast-track registration (since February 2019)", "National Centre for Drug Control and Research (since 1984)", "Iraqi Pharmacovigilance Centre"],
    institutions: ["kimadia-iraq", "kmca-kurdistan", "iraqi-cancer-board", "who"],
    keyPapers: ["paper-al-jumaili-pharmaceutical-regulation-iraq-emhj-2021"],
    related: ["global-oncology-access"],
    links: [
      { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021, PDF)", url: EMHJ_2021 },
      doi("10.26719/emhj.21.025", "EMHJ 2021 report (DOI)"),
    ] }),

  i({ id: "kimadia-iraq", name: "KIMADIA, State Company for Marketing Drugs and Medical Appliances (Iraq)", aka: ["KIMADIA", "State Company for Marketing Drugs and Medical Appliances"],
    city: "Baghdad", country: "IQ", lat: 33.31, lng: 44.39, institutionType: "government",
    tldr: "The Ministry of Health's central buyer, founded in 1964, which procures and distributes medicines and equipment for public hospitals and clinics across Iraq. In 2019 it secured 60% of the essential medicines it is responsible for, and a short budget is named as a main cause of shortages.",
    summary: "The 2021 Eastern Mediterranean Health Journal report on pharmaceutical regulation in Iraq describes KIMADIA, founded in 1964, as the agency responsible for procuring and distributing medicines, medical appliances and equipment to public hospitals and primary care in all 18 provinces. It is required to procure the level 1 medicines on the national essential medicines list; where it cannot, provincial health directorates and hospitals may buy level 2 and then level 3 alternatives, or buy essential medicines from the private sector. In 2019 KIMADIA procured 60% of the level 1 essential medicines, and the report names an insufficient budget as one of the main reasons for shortages of essential medicines over several decades. KIMADIA can negotiate prices below the registered price in its tenders; national manufacturers held 15.3% of the value and 47.8% of the volume of its contracts in 2019. Public outpatient prescriptions cost the patient between 0.8 and 2.5 US dollars, according to the same report. The coordinates are a Baghdad city point.",
    programs: ["Central procurement of level 1 essential medicines", "Distribution to public health facilities in 18 provinces", "Customs clearance for public-sector medicines"],
    institutions: ["iraq-moh-technical-affairs", "iraq-health-insurance-authority"],
    related: ["global-oncology-access"],
    links: [
      { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021, PDF)", url: EMHJ_2021 },
    ] }),

  i({ id: "iraq-health-insurance-authority", name: "Health Insurance Authority (Iraq)", aka: ["Iraqi Health Insurance Authority", "Health Insurance Body"],
    city: "Baghdad", country: "IQ", lat: 33.305, lng: 44.4, institutionType: "government",
    tldr: "The public body created by Iraq's Health Insurance Law No. 22 of 2020 to run national health insurance. The law exempts people with cancer from the subscription fee, the monthly premium and every co-payment the scheme charges.",
    summary: "Health Insurance Law No. 22 of 2020, published in the Iraqi Official Gazette No. 4614 of 1 February 2021 and amended by a 2022 Federal Supreme Court decision, creates the authority (the Ministry of Justice's English translation calls it the Body) to run health insurance through contracts with public and private providers. Its budget comes from a state allocation within the Ministry of Health budget, employer contributions, subscription fees and premiums, and 35% of revenues, taxes and fines from trade in cigarettes, tobacco, substances harmful to health and drinks. Insured people pay a one-time subscription of 10,000 to 100,000 dinars by grade, a monthly premium of 1% of salary for state employees, 10% of the value of a visit, 25% or 50% of the price of medicines and tests by grade, and 10% of the cost of surgery in a government hospital's private ward or 25% in a non-governmental hospital.\n\nArticle 27 exempts people suffering from cancer from the subscription fee, along with people with psychiatric illness, genetic blood diseases, kidney failure on dialysis and disabilities, and articles 27 to 31 exempt the same people from the monthly premium and from every one of those co-payments. The law came into effect at the end of 2023 and is being rolled out in four phases, starting in Baghdad; on 14 November 2025 the health minister said more than 2.5 million people were covered, and in September 2025 the authority's director general told Rudaw the Kurdistan Region would join by 2028. The coordinates are a Baghdad city point.",
    programs: ["Health Insurance Law No. 22 of 2020", "Phased national rollout (from Baghdad, end of 2023)", "Exemption of people with cancer from fees and co-payments (article 27)"],
    institutions: ["iraqi-cancer-board", "kimadia-iraq"],
    related: ["global-oncology-access"],
    links: [
      { label: "Health Insurance Law No. 22 of 2020, Ministry of Justice English translation (Official Gazette No. 4614, PDF, Internet Archive copy)", url: HI_LAW },
      { label: "Rudaw: 2.5 million Iraqis covered by national health insurance (14 November 2025)", url: RUDAW_2025_11 },
    ] }),

  i({ id: "kmca-kurdistan", name: "Kurdistan Medical Control Agency (KMCA), Kurdistan Region of Iraq", aka: ["KMCA", "Kurdistan Medicines Control Agency", "Directorate of Pharmaceutical Products Quality Control, Kurdistan Region Ministry of Health"],
    city: "Erbil", country: "IQ", lat: 36.191, lng: 44.009, institutionType: "government",
    tldr: "The Kurdistan Region's medicines control agency, under the regional Ministry of Health. It registers medicines for the region after the federal Ministry of Health has decided on them, and controls medicines at the region's points of entry.",
    summary: "The Kurdistan Regional Government's service page for drug product registration, under the Ministry of Health's Directorate of Pharmaceutical Products Quality Control in Erbil, describes an electronic registration of new medicines through the Kurdistan Medical Control Agency. Both preliminary and final registration require the corresponding registration decision of the federal Iraqi Ministry of Health, a manufacturer registration certificate from KMCA, a sample of the medicine and a legal pledge that the information matches what was given to the federal ministry. The page gives a time of 14 to 30 working days and fees of 750,000 dinars for preliminary and 1,500,000 dinars for final registration under administrative decree No. 4527 of 25 May 2014. The 2021 Eastern Mediterranean Health Journal report on Iraqi pharmaceutical regulation states that the agency regulates pharmaceuticals in the Kurdistan Region and that the region's customs posts each have a pharmacist, unlike the federal ones. The coordinates are an Erbil city point.",
    programs: ["Drug product registration for the Kurdistan Region (after the federal decision)", "Manufacturer registration", "Medicines control at points of entry"],
    institutions: ["iraq-moh-technical-affairs", "rizgary-oncology-center", "zhianawa-cancer-center"],
    links: [
      { label: "Kurdistan Regional Government: drug product registration service (Internet Archive copy)", url: KMCA_SERVICE },
      { label: "Al-Jumaili et al., Pharmaceutical regulations in Iraq (East Mediterr Health J 2021, PDF)", url: EMHJ_2021 },
    ] }),

  i({ id: "al-amal-national-oncology-hospital", name: "Al-Amal National Oncology Hospital, Baghdad",
    city: "Baghdad", country: "IQ", lat: 33.33, lng: 44.37, institutionType: "hospital",
    tldr: "A national public oncology hospital in Baghdad with diagnostic imaging and a pathology laboratory, whose director spoke for Iraqi cancer specialists after the IAEA, WHO and IARC review of Iraq's cancer services in 2021.",
    summary: "An IAEA report of February 2022 on the 2021 imPACT review of cancer control in Iraq, carried out by the IAEA, WHO and IARC at the Ministry of Health's request, pictures the hospital's diagnostic imaging and pathology laboratory and quotes its director, Musab Alabboodi, saying Iraqi specialists wanted an independent assessment of gaps and an action plan. The review, held virtually in November 2021, gathered data from more than 15 cancer diagnosis and treatment facilities and recommended workforce training in medical physics, radiation safety, radiation oncology and radiology, retention of qualified staff, and a nuclear law for the safe use of radiation sources; Iraqi Ministry of Health officials then observed services at Jordan's King Hussein Cancer Center. OnCo did not find the hospital's own website or published bed and equipment figures. The coordinates are a Baghdad city point.",
    programs: ["Cancer diagnosis and treatment", "Diagnostic imaging", "Pathology laboratory"],
    institutions: ["iraqi-cancer-board", "iaea", "khcc"],
    links: [
      { label: "IAEA: review prompts regional cooperation on Iraq's cancer workforce (7 February 2022, Internet Archive copy)", url: IAEA_2022 },
      { label: "IAEA: Iraq makes progress in improving cancer services (30 March 2023, Internet Archive copy)", url: IAEA_2023 },
    ] }),

  i({ id: "zhianawa-cancer-center", name: "Zhianawa Cancer Center, Sulaymaniyah", aka: ["ZCC", "Zhianawa Cancer Centre"],
    city: "Sulaymaniyah", country: "IQ", lat: 35.557, lng: 45.435, institutionType: "cancer-center",
    tldr: "A public radiotherapy centre in Sulaymaniyah, in the Kurdistan Region, that treats patients from across Iraq and is accredited for postgraduate training in radiation oncology and medical physics.",
    summary: "Zhianawa Cancer Center's member profile with the Union for International Cancer Control, where it is an associate member, describes it as a tertiary public radiotherapy centre, accredited for postgraduate education and training in radiation oncology and in medical physics, providing care to patients from all Iraqi cities. The profile gives its address as Qirga, Sulaymaniyah. Sulaymaniyah governorate recorded 2,909 new cancers in 2022 in the national registry, a crude rate of 121.4 per 100,000, and the highest crude rate in men (110.5 per 100,000) of any governorate. OnCo did not find the centre's own website or published machine and patient numbers. The coordinates are a Sulaymaniyah city point.",
    programs: ["Radiotherapy", "Postgraduate training in radiation oncology and medical physics"],
    institutions: ["kmca-kurdistan", "iraqi-cancer-board", "rizgary-oncology-center", "uicc"],
    links: [
      { label: "UICC: Zhianawa Cancer Center member profile (Internet Archive copy, May 2026)", url: UICC_ZHIANAWA },
      { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022, table 4 (PDF)", url: ICR_2022 },
    ] }),

  i({ id: "rizgary-oncology-center", name: "Rizgary Oncology Center, Erbil", aka: ["Rizgary Oncology Centre", "Rizgary Oncology Centre Association"],
    city: "Erbil", country: "IQ", lat: 36.19, lng: 44.01, institutionType: "cancer-center",
    tldr: "A cancer centre in Erbil, in the Kurdistan Region, affiliated with Rizgary Teaching Hospital, offering chemotherapy, radiotherapy and cancer surgery.",
    summary: "Rizgary Oncology Center's member profile with the Union for International Cancer Control, where it is an associate member, describes a specialised medical institution in Erbil affiliated with Rizgary Teaching Hospital, providing diagnosis, treatment and follow-up, including chemotherapy, radiotherapy and surgical oncology, and engaged in medical education, research and international collaboration; the profile gives its address on Koya Street, Erbil. Erbil governorate recorded 2,465 new cancers in 2022 in the national registry, a crude rate of 119.9 per 100,000, and the registry's highest age-standardised breast cancer rate, 80.3 per 100,000 women. A registry analysis of Erbil and Duhok found that registered incidence more than doubled between 2013 and 2019. OnCo did not find the centre's own website or published machine and patient numbers. The coordinates are an Erbil city point.",
    programs: ["Chemotherapy", "Radiotherapy", "Surgical oncology"],
    institutions: ["kmca-kurdistan", "iraqi-cancer-board", "zhianawa-cancer-center", "uicc"],
    keyPapers: ["paper-m-amen-kurdistan-cancer-incidence-apjcp-2022"],
    links: [
      { label: "UICC: Rizgary Oncology Center member profile (Internet Archive copy, July 2026)", url: UICC_RIZGARY },
      { label: "Iraqi Cancer Board: Cancer Registry of Iraq, annual report 2022 (PDF)", url: ICR_2022 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-m-amen-kurdistan-cancer-incidence-apjcp-2022", name: "Cancer incidence in Erbil and Duhok, Kurdistan Region of Iraq, 2013 to 2019",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2022, doi: "10.31557/APJCP.2022.23.2.601", pmid: "35225473", authors: "M-Amen K, Abdullah OS, Amin AMS, et al.", paperType: "observational",
    tldr: "Seven years of population-based cancer registration in two Kurdistan Region governorates show the crude incidence of cancer more than doubling between 2013 and 2019, with lung cancer and breast cancer the most common.",
    summary: "Published as \"Cancer Incidence in the Kurdistan Region of Iraq: Results of a Seven-Year Cancer Registration in Erbil and Duhok Governorates\". The authors analysed population-based cancer registry data for 2013 to 2019 retrieved from the Medical Statistics Department of the Ministry of Health of the Kurdistan Regional Government, and projected case numbers for the following decade with LSTM and bidirectional LSTM models.",
    findings: [
      "Incidence rose from 73 to 174 per 100,000 women and from 36 to 85 per 100,000 men between 2013 and 2019 in Erbil and Duhok.",
      "More cancers were recorded in women than in men in both governorates.",
      "Lung cancer and female breast cancer were the most common cancers diagnosed from 2013.",
      "The models projected Erbil's cases rising from 3,457 to about 4,450 to 4,550, and Duhok's from 1,365 to about 2,630 to 2,740 by 2028.",
    ],
    whatItMeans: "It is the published account of cancer registration in the Kurdistan Region, which keeps its own health statistics, and it shows registered cancer rising fast there, though a rise in registered cases also reflects better registration and population movement.",
    caveats: ["Two of the region's three governorates; Sulaymaniyah is not included.", "The abstract does not state whether the rates are crude or age-standardised; read the full text before comparing them with other figures.", "Projections are model outputs, not counts."],
    institutions: ["iraqi-cancer-board", "rizgary-oncology-center"], cancers: ["breast-cancer", "lung-cancer"],
    links: [doi("10.31557/APJCP.2022.23.2.601", "Asian Pac J Cancer Prev 2022"), pubmed("35225473")] }),

  p({ id: "paper-al-jumaili-pharmaceutical-regulation-iraq-emhj-2021", name: "Pharmaceutical regulation in Iraq, from medicine approval to post-marketing",
    journal: "Eastern Mediterranean Health Journal", year: 2021, doi: "10.26719/emhj.21.025", pmid: "34766327", authors: "Al-Jumaili AA, Younus MM, Kannan YJA, Nooruldeen ZE, Al-Nuseirat A.", paperType: "review",
    tldr: "A WHO regional journal report, written with Iraqi Ministry of Health and WHO staff, describing how medicines are approved, priced, bought, tested and monitored in Iraq, and naming budget shortfalls and shortages of essential medicines among the main problems.",
    summary: "Published as \"Pharmaceutical regulations in Iraq: from medicine approval to postmarketing\". The main source was the Iraq pharmaceutical country profile 2020, prepared by the Ministry of Health with WHO. The report describes the Directorate of Technical Affairs as the regulator, the National Committee for Drug Selection and the essential and comprehensive medicines lists, registration and fast-track registration, pricing rules, KIMADIA's public procurement, the National Centre for Drug Control and Research, the Iraqi Pharmacovigilance Centre and the separate regulation of medicines in the Kurdistan Region.",
    findings: [
      "Registered medicines rose from 2,500 in December 2018 to 4,665 in August 2020, after fast-track registration was introduced in February 2019.",
      "Fast-track registration gives a medicine approved by the FDA, EMA or other named regulators a temporary registration and import licence within one month; the regular pathway takes about a year.",
      "KIMADIA procured 60% of level 1 essential medicines in 2019, and an insufficient budget is named as a main reason for shortages.",
      "The national essential medicines list held 1,105 medicines and vaccines on 23 June 2020, 554 of them at level 1.",
    ],
    whatItMeans: "It is the clearest public description of the route a cancer medicine takes into Iraq and into public hospitals, written partly by the people who run that route.",
    caveats: ["Describes the system in 2020; rules have changed since.", "Based mainly on a country profile prepared by the Ministry of Health itself."],
    institutions: ["iraq-moh-technical-affairs", "kimadia-iraq", "kmca-kurdistan"],
    links: [doi("10.26719/emhj.21.025", "East Mediterr Health J 2021"), pubmed("34766327")] }),

  p({ id: "paper-alwan-breast-cancer-iraq-emhj-2010", name: "Breast cancer presentation among Iraqi women at the Baghdad early detection referral centre, 2004 to 2008",
    journal: "Eastern Mediterranean Health Journal", year: 2010, doi: "10.26719/2010.16.11.1159", pmid: "21218740", authors: "Alwan NA.", paperType: "observational",
    tldr: "Among 721 women diagnosed with breast cancer at Iraq's main referral centre for early detection of breast tumours in Baghdad, 90.6% had found the lump themselves but only 32% sought advice within a month, and 47% were diagnosed at stage III or IV.",
    summary: "Published as \"Breast cancer: demographic characteristics and clinico-pathological presentation of patients in Iraq\". The study reviewed women presenting with palpable breast lumps at the Main Referral Training Centre for Early Detection of Breast Tumours in the Medical City Teaching Hospital, Baghdad, between February 2004 and April 2008. The paper places the centre within the Iraqi national programme for early detection of breast cancer, initiated in 2001, under which specialised clinics were established in major hospitals in all provinces.",
    findings: [
      "Of 5,044 women with palpable breast lumps, 721 (14.3%) had cancer; about a third were aged 40 to 49.",
      "90.6% had detected the lump themselves, but only 32% sought medical advice within the first month.",
      "47% presented at stage III or IV, and 73.1% had axillary lymph node involvement at diagnosis.",
    ],
    whatItMeans: "It documents why Iraq's breast cancer effort has centred on earlier presentation: most women found the lump themselves and many waited, so nearly half were diagnosed late.",
    caveats: ["One referral centre in Baghdad, 2004 to 2008; not a national sample.", "Clinic-based early detection of symptomatic women, not population screening."],
    institutions: ["iraqi-cancer-board"], cancers: ["breast-cancer"],
    links: [doi("10.26719/2010.16.11.1159", "East Mediterr Health J 2010"), pubmed("21218740")] }),
];

/** Records behind /countries/iq/ (wave 5). */
export const recordsIQ: EntityInput[] = [...institutions, ...papers];
