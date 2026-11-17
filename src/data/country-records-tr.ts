import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Türkiye: the public bodies and papers behind /countries/tr/ that the corpus did not hold. Turkish sources were read
 * in Turkish from their raw text on 4 November 2026: the Ministry of Health's cancer department pages and its
 * Türkiye Kanser İstatistikleri 2019 and 2020 reports (through dated Internet Archive copies, because
 * hsgm.saglik.gov.tr did not answer scripted requests), the consolidated Sağlık Uygulama Tebliği PDF from
 * mevzuat.gov.tr, the Alternatif Geri Ödeme Yönetmeliği and the Beşeri Tıbbi Ürünler Ruhsatlandırma Yönetmeliği and
 * its 2022 and 2023 amendments from the Resmî Gazete, and the TİTCK and SGK websites. DOIs were resolved through
 * Crossref and Europe PMC the same day, and the figures in `findings` come from the indexed abstracts.
 *
 * Inbound links: the three institutions name each other in `institutions`, and each paper is a `keyPapers` entry of
 * the institution it describes, so none of these records is reachable only from the country page.
 *
 * The coordinates of the three Ankara bodies are the Ankara city centroid, not their addresses (given in each summary).
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ANKARA = { city: "Ankara", country: "TR", lat: 39.93, lng: 32.86 } as const;
const STATS_2020 = "https://web.archive.org/web/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Istatistikler/Turkiye_Kanser_Istatistikleri_2020.pdf";
const SCREENING = "https://web.archive.org/web/20251107193141/https://hsgm.saglik.gov.tr/tr/kanser-taramalari.html";
const SUT = "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=17229&MevzuatTur=9&MevzuatTertip=5";

const institutions: InstitutionInput[] = [
  i({ id: "tr-cancer-department", name: "Department of Cancer, Ministry of Health of Türkiye (Kanser Dairesi Başkanlığı)",
    aka: ["Kanser Dairesi Başkanlığı", "Turkish Ministry of Health Cancer Department", "Halk Sağlığı Genel Müdürlüğü Kanser Dairesi Başkanlığı", "Kanserle Savaş Daire Başkanlığı"],
    ...ANKARA, institutionType: "government", website: "https://hsgm.saglik.gov.tr/tr/kanser.html",
    tldr: "The department of Türkiye's Ministry of Health that counts the country's cancers through registry centres in all 81 provinces and sets the standards for the national breast, cervical and bowel screening programmes, which run through family doctors and 318 screening centres.",
    summary: "The Kanser Dairesi Başkanlığı sits within the Ministry of Health's General Directorate of Public Health in Ankara (Bilkent campus, Üniversiteler Mahallesi, Şehit Mehmet Bayraktar Caddesi No:3, Çankaya). Its published duties include planning and running preventive cancer services, developing the cancer screening and registration systems, setting the national cancer screening standards, coordinating screening between family doctors and the Cancer Early Diagnosis, Screening and Training Centres (KETEM), collecting and checking the quality of all cancer statistics, and running the National Cancer Advisory Board. Cancer became a notifiable disease in Türkiye in 1982 and the department's predecessor, the Kanserle Savaş Daire Başkanlığı, was founded in 1983.\n\nRegistration: active, population-based registration began in İzmir in 1992 and, according to the department's 2020 statistics report, had started in all 81 provinces from the 2013 reference year. Certified registry staff collect cases from every public, university and private hospital, laboratory and death certificate in a province; the provincial databases are merged into a national data pool in Ankara. The annual Türkiye Kanser İstatistikleri report uses the 14 provinces whose data pass quality checks, covering 50.6% of the population in 2020, and scales their rates to the national population: 223,087 new cancers in 2019 and 195,581 in 2020, a fall of about 13% that the report attributes to people not seeking care during the COVID-19 pandemic. The 2020 report, published in Ankara in 2025, is the latest on the department's statistics page. Data from the İzmir, Antalya, Trabzon, Edirne, Bursa, Erzurum, Eskişehir, Samsun, Malatya and Gaziantep registries have been accepted into IARC's Cancer Incidence in Five Continents series, and the İzmir registry has been an IARC regional hub for cancer registration since 9 October 2013.\n\nScreening: breast screening offers a mammogram every two years to women aged 40 to 69, cervical screening an HPV DNA test every five years to women aged 30 to 65, and bowel screening a faecal occult blood test every two years and a colonoscopy every ten years to men and women aged 50 to 70. The department's list of screening centres, dated 29 January 2025, names 318 KETEM centres across all 81 provinces.",
    programs: ["National population-based cancer registry (Türkiye Kanser Veri Havuzu)", "Annual Türkiye Kanser İstatistikleri report", "National breast, cervical and colorectal screening programmes", "Cancer Early Diagnosis, Screening and Training Centres (KETEM)", "National Cancer Advisory Board", "Turkey Cancer Control Programme (2021)"],
    cancers: ["breast-cancer", "cervical", "colorectal", "lung-cancer"], keyPapers: ["paper-gultekin-hpv-triage-gynecol-oncol-2020"], institutions: ["sgk-turkiye", "titck"],
    links: [
      { label: "Kanser Dairesi Başkanlığı: görev tanımı (Internet Archive copy, 15 October 2025)", url: "https://web.archive.org/web/20251015130710/https://hsgm.saglik.gov.tr/tr/baskanligimiz-kanser/gorev-tanimi.html" },
      { label: "Kanser Dairesi Başkanlığı: iletişim (Internet Archive copy, 15 October 2025)", url: "https://web.archive.org/web/20251015130739/https://hsgm.saglik.gov.tr/tr/iletisim-kanserdb.html" },
      { label: "Türkiye Kanser İstatistikleri 2020 (PDF, Internet Archive copy)", url: STATS_2020 },
      { label: "Türkiye Kanser İstatistikleri 2019 (PDF, Internet Archive copy)", url: "https://web.archive.org/web/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Istatistikler/Turkiye_Kanser_Istatistikleri_2019.pdf" },
      { label: "Turkey Cancer Control Programme, 18 April 2022 (PDF, Internet Archive copy)", url: "https://web.archive.org/web/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Raporlar/Turkey_NCCP_18_April_2022.pdf" },
      { label: "Kanser Taramaları (Internet Archive copy, 7 November 2025)", url: SCREENING },
      { label: "KETEM adresleri (Internet Archive copy, 8 October 2025)", url: "https://web.archive.org/web/20251008092847/https://hsgm.saglik.gov.tr/tr/ketem.html" },
      { label: "Turkey Cancer Control Programme, 2021: the 14 provinces with data of enough quality for the report (English, PDF, Internet Archive copy)", url: "https://web.archive.org/web/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Raporlar/Turkey_NCCP_18_April_2022.pdf" },
    ] }),

  i({ id: "sgk-turkiye", name: "Social Security Institution of Türkiye (Sosyal Güvenlik Kurumu, SGK)",
    aka: ["SGK", "Sosyal Güvenlik Kurumu", "Social Security Institution", "Turkish Social Security Institution"],
    ...ANKARA, institutionType: "government", website: "https://www.sgk.gov.tr",
    tldr: "The public institution that runs Türkiye's general health insurance and decides which cancer medicines it pays for, on what conditions, through its Health Implementation Communiqué and its reimbursement commissions.",
    summary: "The Sosyal Güvenlik Kurumu, at Ziyabey Caddesi No:6, Balgat, Ankara, runs genel sağlık sigortası, the general health insurance created by Law 5510 on social insurance and general health insurance. What the insurance pays for, and on what conditions, is set out in the Sağlık Uygulama Tebliği (SUT), the Health Implementation Communiqué, which is amended by notices in the Official Gazette; prices for services are set by the Health Services Pricing Commission.\n\nFor patients the SUT sets a contribution of 10% of the price of outpatient medicines for people who receive a pension or income from SGK, and their dependants, and 20% for everyone else, plus a fixed charge per prescription, but no contribution on medicines given during inpatient treatment or on medicines in its exemption list (EK-4/D) when backed by a health report. Contracted private hospitals and foundation universities may charge an additional fee up to a limit the institution sets, but not for cancer treatment: radiotherapy, chemotherapy and radioisotope treatment are on the list of services for which no additional fee may be taken. Chemotherapy medicines on a separate list (EK-4/H) must be supplied by the hospital.\n\nA medicine is paid for only if it appears on the list of reimbursed medicines (EK-4/A), which SGK amends in numbered announcements (the 43rd of 2026 was published on 4 November), and only within the conditions the SUT sets: chapter 4.2.14 sets the rules for cancer medicines, including which specialists must sign the health board report. Use outside the approved indication needs a Ministry of Health off-label approval. A medicine not available in Türkiye can be imported for a patient through the Turkish Pharmacists' Association under a protocol with SGK, and paid for if it is on the foreign medicines price list (EK-4/C). SGK also makes alternative reimbursement agreements, governed since 12 May 2023 by a regulation that replaced one of 2016, under which a company can offer confidential discounts, budget or patient-number caps or a purchase guarantee in exchange for reimbursement.",
    programs: ["General health insurance (genel sağlık sigortası, Law 5510)", "Sağlık Uygulama Tebliği (Health Implementation Communiqué)", "List of reimbursed medicines (EK-4/A)", "Alternative Reimbursement Commission", "Foreign medicines price list (EK-4/C)"],
    institutions: ["tr-cancer-department", "titck"],
    links: [
      { label: "Sosyal Güvenlik Kurumu Sağlık Uygulama Tebliği (mevzuat.gov.tr)", url: SUT },
      { label: "Sosyal Güvenlik Kurumu Genel Sağlık Sigortası Alternatif Geri Ödeme Yönetmeliği (Resmî Gazete, 12 May 2023)", url: "https://www.resmigazete.gov.tr/eskiler/2023/05/20230512-32.htm" },
      { label: "SGK: Bedeli Ödenecek İlaçlar Listesi duyurusu 2026/43 (4 November 2026)", url: "https://www.sgk.gov.tr/duyuru/detay/Bedeli-Odenecek-Ilaclar-Listesinde-Yapilan-Duzenlemeler-Hakkinda-Duyuru-202643-2026-11-04-06-22-08" },
      { label: "Sosyal Güvenlik Kurumu", url: "https://www.sgk.gov.tr" },
    ] }),

  i({ id: "titck", name: "Turkish Medicines and Medical Devices Agency (TİTCK)",
    aka: ["TİTCK", "TITCK", "Türkiye İlaç ve Tıbbi Cihaz Kurumu", "Turkish Medicines and Medical Devices Agency"],
    ...ANKARA, institutionType: "government", website: "https://www.titck.gov.tr",
    tldr: "Türkiye's national medicines regulator, which licenses every cancer medicine sold in the country, authorises clinical trials and can rely on the earlier assessments of other regulators.",
    summary: "The Türkiye İlaç ve Tıbbi Cihaz Kurumu was created as an agency of the Ministry of Health, with its own budget and legal personality, by Decree-Law 663 published on 2 November 2011; its offices are at Söğütözü Mahallesi 2176. Sokak No:5, Çankaya, Ankara. Unlike a member state of the European Union, Türkiye licenses medicines nationally, so a cancer medicine approved in Europe or the United States still needs a Turkish licence (ruhsat) before it can be sold.\n\nUnder the Beşeri Tıbbi Ürünler Ruhsatlandırma Yönetmeliği of 11 December 2021, applications can be made all year but the licensing process can start only in February, May, August and November, according to the agency's capacity. A completeness check takes 30 days; the licensing process is then to be concluded within 210 days, a clock that stops while the agency waits for information from the company and excludes laboratory testing and outside assessments. A Priority Evaluation Board can give priority or high priority to products that are first in treatment or diagnosis, bring an innovation, or are needed for public health, and decides which products may apply for conditional or exceptional licences. A 2022 amendment added article 37/A on reliance: the agency may take into account earlier assessments by other regulators with comparable standards, and for such applications the 210-day period is 90 days.\n\nA 2020 study of the agency's review process found that the median time from submission to approval for new active substances rose from 529 days in 2016 to 663 days in 2018, while the agency's own review time fell from 408 to 326 days and the time taken by companies rose from 137 to 268 days. The agency also authorises clinical trials and issues the off-label approvals that the Social Security Institution requires before it pays for a medicine outside its licence.",
    programs: ["Licensing of human medicines (ruhsatlandırma)", "Priority Evaluation Board", "Reliance on earlier assessments (article 37/A)", "Clinical trial authorisation", "Off-label use approvals"],
    keyPapers: ["paper-koyuncu-titck-review-front-pharmacol-2020"], institutions: ["sgk-turkiye", "tr-cancer-department"],
    links: [
      { label: "TİTCK: tarihçe", url: "https://www.titck.gov.tr/kurumsal/tarihce" },
      { label: "Beşeri Tıbbi Ürünler Ruhsatlandırma Yönetmeliği (Resmî Gazete, 11 December 2021)", url: "https://www.resmigazete.gov.tr/eskiler/2021/12/20211211-5.htm" },
      { label: "Amendment adding article 37/A, reliance (Resmî Gazete, 24 September 2022)", url: "https://www.resmigazete.gov.tr/eskiler/2022/09/20220924-1.htm" },
      doi("10.3389/fphar.2019.01557", "Koyuncu et al., Front Pharmacol 2020"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-gultekin-hpv-triage-gynecol-oncol-2020", name: "How to triage HPV positive cases: Results of four million females",
    journal: "Gynecologic Oncology", year: 2020, doi: "10.1016/j.ygyno.2020.04.698", pmid: "32362567",
    authors: "Gultekin M, Dundar S, Keskinkilic B, Turkyilmaz M, Ozgul N, Yuce K, Kara F", paperType: "real-world", participants: 4099230,
    tldr: "The first four million women screened in Türkiye's national cervical screening programme, which tests for human papillomavirus and takes a smear at the same visit; about one in twenty-three tested positive.",
    summary: "Türkiye's Ministry of Health replaced smear-based cervical screening with a national programme of primary HPV DNA testing in 2014, offered to women aged 30 to 65 every five years. Women were invited for screening with HPV DNA testing and conventional cytology collected at a single visit, so that triage (extended genotyping and the smear) needed no second appointment. The paper reports the programme's first 4,099,230 screened women. Under the Turkish algorithm a woman is referred to colposcopy if she has HPV 16 or 18 or any smear abnormality of ASC-US or worse.",
    findings: [
      "4,099,230 women attended HPV DNA screening; 4.39% were HPV DNA positive.",
      "The commonest HPV type was 16, followed by 51, 31, 52, 56 and 18, at all ages and in all regions.",
      "Cytology was reported normal in 69.2% and inadequate in 16.6%; the remainder were abnormal (ASC-US or worse).",
      "The Turkish referral rule gave an overall positive predictive value of 24.3% for CIN2 or worse; by genotype it was 32.6% for HPV 16 and 15.3% for HPV 18.",
    ],
    whatItMeans: "A middle-income country can run primary HPV screening at national scale, with triage done at the same visit and colposcopy referral rates the authors judge acceptable. For a woman in Türkiye it means the test offered at a family health centre or KETEM screening centre from age 30 is an HPV test, not only a smear.",
    caveats: ["Reports test results and positive predictive values, not effects on cancer incidence or deaths.", "The abstract does not give the share of eligible women who attended, so coverage cannot be read from it."],
    cancers: ["cervical"], institutions: ["tr-cancer-department"],
    links: [
      doi("10.1016/j.ygyno.2020.04.698", "Gynecol Oncol 2020"), pubmed("32362567"),
      { label: "Turkey Cancer Control Programme, 2021: the switch to HPV testing (Ministry of Health, PDF, Internet Archive copy)", url: "https://web.archive.org/web/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Raporlar/Turkey_NCCP_18_April_2022.pdf" },
    ] }),

  p({ id: "paper-koyuncu-titck-review-front-pharmacol-2020", name: "Evaluation of the Performance of the Turkish Regulatory Agency: Recommendations for Improved Patients' Access to Medicines",
    journal: "Frontiers in Pharmacology", year: 2020, doi: "10.3389/fphar.2019.01557", pmid: "32116658",
    authors: "Koyuncu O, Gursoz H, Alkan A, Cetintas HC, Pasaoglu T, Mashaki Ceyhan E, Walker S", paperType: "observational",
    tldr: "A review of how long Türkiye's medicines regulator took to approve new medicines from 2016 to 2018, which found the agency's own review time falling while the total time to approval rose.",
    summary: "The study evaluated the review process and timelines of the Turkish Medicines and Medical Devices Agency (TİTCK) from 2016 to 2018 and compared them with an earlier study of 2013 to 2015. Data on the agency's structure came from public sources, and a standard questionnaire collected its review practices and the milestones of the marketing authorisation process for new active substances.",
    findings: [
      "The median approval time for new active substances rose from 529 calendar days in 2016 to 663 in 2018.",
      "Over the same period the time spent in the agency's review fell from 408 to 326 calendar days, while company time rose from 137 to 268 days.",
      "The authors recommend good review practices, a structured benefit-risk framework, verification and abridged reviews based on a reliance model, PIC/S mutual recognition and full ICH membership.",
    ],
    whatItMeans: "The figures predate the 2021 licensing regulation and its 2022 reliance article, which set a 210-day licensing period and 90 days for applications that rely on other regulators' assessments; no later official average for new cancer medicines was found.",
    caveats: ["Covers all new active substances, not cancer medicines separately.", "The milestones were collected from the agency by questionnaire, not from an independent audit.", "Measures time to a Turkish licence, not time to reimbursement by the Social Security Institution."],
    institutions: ["titck"],
    links: [doi("10.3389/fphar.2019.01557", "Front Pharmacol 2020"), pubmed("32116658")] }),
];

/** Records behind /countries/tr/ (wave 3). */
export const recordsTR: EntityInput[] = [...institutions, ...papers];
