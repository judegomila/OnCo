import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Viet Nam: the institutions and papers behind /countries/vn/ (wave 4) that the corpus did not hold. Vietnamese
 * sources were read in Vietnamese from their raw text: Law No. 51/2024/QH15 amending the Law on Health Insurance
 * (full text as posted by the Nghe An provincial portal), Circular 37/2024/TT-BYT on the insurance medicines list
 * (pdftotext of a provincial copy of the signed PDF), Circular 32/2026/TT-BYT on medicine registration (pdftotext of a
 * provincial copy), Decision 358/QD-BYT of 3 February 2026 with the national action plan on breast and cervical cancer
 * 2026 to 2035, Politburo Resolution 72-NQ/TW, the Ministry of Justice's introduction to Law No. 44/2024/QH15 amending
 * the Law on Pharmacy, and press reports quoting the Ministry of Health and Vietnam Social Security. moh.gov.vn,
 * dav.gov.vn and baohiemxahoi.gov.vn reset our connections on 4 November 2026; the last two were read through the
 * Internet Archive. DOIs were resolved through Europe PMC and the abstracts read.
 *
 * Inbound links: the three government bodies link to each other through `institutions`, and the four papers are
 * linked from the Ministry of Health's and Vietnam Social Security's `keyPapers`.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const TT37 = "https://giavien.ninhbinh.gov.vn/uploads/files/v%C4%83n_b%E1%BA%A3n_qppl/2024/37-TT-BYT.pdf";
const TT32 = "https://nghiahanh.quangngai.gov.vn/upload/2006784/20260810/Thong_tu_32_dang_ky_luu_hanh_thuoc_d0d6d.pdf";
const QD358 = "https://pnt.edu.vn/Resources/Docs/SubDomain/khoaduoc/Q%C4%90%20358%20Q%C4%90-BYT.pdf";
const LAW51 = "https://hcc.nghean.gov.vn/tin-tong-hop/toan-van-luat-sua-doi-bo-sung-mot-so-dieu-cua-luat-bao-hiem-y-te-1910.html";
const NQ72 = "https://tapchitoaan.vn/nghi-quyet-72-nqtw-cua-bo-chinh-tri-ve-mot-so-giai-phap-dot-pha-tang-cuong-bao-ve-cham-soc-va-nang-cao-suc-khoe-nhan-dan14083.html";
const LAW44_INTRO = "https://pbgdpl.gov.vn/noidung/tintuc/Lists/TLDCGioiThieu/Attachments/367/Lu%E1%BA%ADt%20s%E1%BB%ADa%20%C4%91%E1%BB%95i%20b%E1%BB%95%20sung%20m%E1%BB%99t%20s%E1%BB%91%20%C4%91i%E1%BB%81u%20c%E1%BB%A7a%20Lu%E1%BA%ADt%20D%C6%B0%E1%BB%A3c.docx";
const DAV_ARCHIVE = "https://web.archive.org/web/20260518025616/https://dav.gov.vn/";
const VSS_ARCHIVE = "https://web.archive.org/web/20261007162353/https://baohiemxahoi.gov.vn/Pages/default.aspx";
const VSS_2025 = "https://thoibaotaichinhvietnam.vn/diem-tua-an-sinh-trong-bien-dong-189896.html";
const NLD_DRUGS_2026 = "https://nld.com.vn/nguoi-benh-ung-thu-sap-duoc-ho-tro-them-tien-thuoc-ung-thu-196260618165702522.htm";
const SGGP_LIST_2026 = "https://www.sggp.org.vn/de-xuat-bo-sung-thuoc-ung-thu-the-he-moi-vao-danh-muc-bao-hiem-y-te-post873399.html";
const SGGP_REFERRAL_2025 = "https://www.sggp.org.vn/bo-giay-chuyen-tuyen-doi-voi-cac-benh-hiem-benh-hiem-ngheo-giam-phien-ha-tiet-kiem-chi-phi-post776040.html";

const institutions: InstitutionInput[] = [
  i({ id: "moh-vietnam", name: "Ministry of Health, Viet Nam", aka: ["Bộ Y tế", "MOH Viet Nam", "Vietnam Ministry of Health"],
    city: "Hanoi", country: "VN", lat: 21.028, lng: 105.834, institutionType: "government", website: "https://moh.gov.vn",
    tldr: "Viet Nam's health ministry. It decides which medicines the social health insurance fund pays for, registers medicines through its Drug Administration, founded K Hospital in 1969, and in February 2026 issued the national plan against breast and cervical cancer for 2026 to 2035.",
    summary: "The Ministry of Health sets the list of medicines that Viet Nam's social health insurance pays for. Under Circular 37/2024/TT-BYT, in force from 1 January 2025, a single-ingredient medicine is considered for the list only if it has a valid registration or import licence from the Drug Administration, appears in a recognised treatment guideline, and comes with a budget impact report for Viet Nam and evidence on cost-effectiveness, Vietnamese evidence preferred. Its Health Insurance Department gathers proposals, consults an expert council on safety, efficacy and health economics, and must review the list at least every two years; insurance pays for cancer medicines when they are prescribed by doctors licensed in oncology, nuclear medicine or haematology at a facility approved to treat cancer.\n\nThe list in force is the one issued with Circular 20/2022/TT-BYT, which the ministry describes as holding 1,037 chemical and biological medicines, 76 of them for cancer treatment and immune modulation. In 2026 the ministry drafted a new list that would add 84 medicines, 30 of them for cancer; in its September 2026 reply to voters it said the list was still under revision.\n\nOn 3 February 2026 the ministry issued Decision 358/QD-BYT with the national action plan on breast and cervical cancer for 2026 to 2035, which aims for 70% of women aged 30 to 49 to have high-performance cervical screening by 2035 and states that insurance does not yet pay for screening mammography or HPV tests. Its Circular 13/2026/TT-BYT, reported in June 2026, added HPV to the diseases covered by the Expanded Programme on Immunization from 1 July 2026. Politburo Resolution 72-NQ/TW of 9 September 2025 sets the ministry the goals of a free health check or screening at least once a year from 2026 and free basic hospital care within insurance benefits by 2030.\n\nThe coordinates on this record are approximate for central Hanoi, not the street address. The ministry's own site reset our connection on 4 November 2026; the documents above were read from provincial and university copies of the signed texts.",
    programs: ["Social health insurance medicines list (Circular 20/2022/TT-BYT, criteria in Circular 37/2024/TT-BYT)", "Medicine registration through the Drug Administration of Vietnam", "National action plan on breast and cervical cancer 2026 to 2035", "Expanded Programme on Immunization, HPV from 1 July 2026"],
    cancers: ["breast-cancer", "cervical", "lung-cancer", "hcc", "colorectal"], terms: ["hta"], technologies: ["hpv-vaccine", "hpv-testing", "mammography"],
    institutions: ["dav-vietnam", "vss-vietnam", "k-hospital-hanoi", "hcmc-oncology-hospital"],
    keyPapers: ["paper-toan-vietnam-cervical-screening-steps-jcpo-2026", "paper-nguyen-trastuzumab-adjuvant-cea-vietnam-plos-one-2024", "paper-huong-hanoi-breast-incidence-trends-jco-go-2025", "paper-liu-hanoi-head-neck-incidence-trends-jco-go-2026"],
    links: [
      { label: "Circular 37/2024/TT-BYT, criteria for the insurance medicines list (PDF, Vietnamese)", url: TT37 },
      { label: "Decision 358/QD-BYT, national action plan on breast and cervical cancer 2026 to 2035 (PDF, Vietnamese)", url: QD358 },
      { label: "Politburo Resolution 72-NQ/TW, 9 September 2025 (full text, Vietnamese)", url: NQ72 },
      { label: "SGGP: Ministry of Health on revising the insurance medicines list, 26 September 2026 (Vietnamese)", url: SGGP_LIST_2026 },
      { label: "Nguoi Lao Dong: Ministry of Health on insurance spending on cancer medicines, 18 June 2026 (Vietnamese)", url: NLD_DRUGS_2026 },
      { label: "Dan Tri: the new insurance list would add 84 medicines, 30 of them for cancer, 28 May 2026 (Vietnamese)", url: "https://dantri.com.vn/suc-khoe/30-thuoc-dieu-tri-ung-thu-the-he-moi-chi-phi-cao-sap-duoc-bhyt-chi-tra-20260528112629967.htm" },
    ] }),

  i({ id: "dav-vietnam", name: "Drug Administration of Vietnam", aka: ["Cục Quản lý Dược", "DAV"],
    city: "Hanoi", country: "VN", lat: 21.028, lng: 105.834, institutionType: "government", website: "https://dav.gov.vn",
    tldr: "Viet Nam's medicines regulator, a department of the Ministry of Health. Under the registration rules in force from 1 October 2026 it has 12 months to decide on a medicine, 9 months when it relies on the assessment report of a reference regulator such as the EMA or US FDA, and 6 months for priority medicines.",
    summary: "The Drug Administration of Vietnam (Cục Quản lý Dược) receives and assesses applications to market medicines in Viet Nam, issues and renews registration certificates, and publishes decisions such as its lists of originator medicines and reference biologicals. An advisory council set up by the Minister of Health reviews the expert assessments.\n\nCircular 32/2026/TT-BYT of 29 July 2026, in force from 1 October 2026 and issued under the Law on Pharmacy as amended by Law No. 44/2024/QH15, sets the time to process an application from receipt: no more than 12 months for a medicine, no more than 9 months where the application relies on the assessment of a reference regulator, no more than 6 months for priority cases defined in the Law on Pharmacy, and 15 days for a new medicine against a declared group A epidemic. The reference regulators are the European Medicines Agency and the stringent regulators listed in the circular: the US FDA, the regulators of European Union countries, the United Kingdom's MHRA, Japan's PMDA, Swissmedic, Health Canada, and Australia, Iceland, Liechtenstein and Norway. A relying application must include the reference regulator's final assessment report and a table comparing the Vietnamese dossier with the approved product.\n\nA new medicine (other than a vaccine) can be exempted from clinical trials in Viet Nam if it is approved in at least one country, has complete clinical data and enough information to analyse the effect of Asian ethnicity on safety and efficacy under ICH E5. A first registration of a new medicine, vaccine or biological is valid for 3 years; most others for 5. These are maximum processing times in the rules, not measured approval times. The live site reset our connection on 4 November 2026 and was read through the Internet Archive.",
    programs: ["Medicine registration (Circular 32/2026/TT-BYT)", "Reliance on reference regulators' assessment reports", "Published lists of originator medicines and reference biologicals"],
    institutions: ["moh-vietnam", "vss-vietnam"],
    links: [
      { label: "Circular 32/2026/TT-BYT on registration of medicines, 29 July 2026 (PDF, Vietnamese)", url: TT32 },
      { label: "Ministry of Justice: introduction to Law No. 44/2024/QH15 amending the Law on Pharmacy (Word, Vietnamese)", url: LAW44_INTRO },
      { label: "Drug Administration of Vietnam (Internet Archive, 18 May 2026, Vietnamese)", url: DAV_ARCHIVE },
    ] }),

  i({ id: "vss-vietnam", name: "Vietnam Social Security", aka: ["Bảo hiểm xã hội Việt Nam", "BHXH Việt Nam", "VSS"],
    city: "Hanoi", country: "VN", lat: 21.028, lng: 105.834, institutionType: "government", website: "https://baohiemxahoi.gov.vn",
    tldr: "The body that collects social health insurance contributions in Viet Nam and pays hospitals for insured care, including cancer treatment. It estimated that insurance covered more than 95.1% of the population in 2025, and since 2025 it has been part of the Ministry of Finance.",
    summary: "Vietnam Social Security runs social insurance, health insurance and unemployment insurance. It signs contracts with hospitals for insured care and pays them for medicines on the Ministry of Health's list, at the rates and under the conditions the list sets; under Circular 37/2024/TT-BYT it must also give the ministry the claims data it needs when the list is revised. In 2025 it became a special unit under the Ministry of Finance.\n\nIts year-end figures, reported on 1 January 2026, estimated health insurance coverage at more than 95.1% of the population in 2025, about 195.5 million insured visits and about 161,628 billion dong in costs submitted for payment, up 6.5% and 14.3% on 2024. The Ministry of Health reported in June 2026 that the fund paid nearly 9,600 billion dong for cancer and immune-modulating medicines in 2025, 16.4% of its spending on medicines.\n\nThe amended Law on Health Insurance (Law No. 51/2024/QH15) sets what the fund pays: 80% of covered costs for most members, 95% or 100% for groups named in the law, 100% at primary care facilities, and 100% once a member insured for five continuous years has paid co-payments in a year above six times the reference level. A member who goes straight to a specialist hospital without referral for one of the rare or serious diseases listed by the Minister of Health, cancers among them, keeps full benefits. The live site reset our connection on 4 November 2026 and was read through the Internet Archive.",
    programs: ["Social health insurance fund", "Payment of hospitals for insured care", "Claims data for revising the medicines list"],
    cancers: ["breast-her2-positive"], drugs: ["trastuzumab"], terms: ["financial-toxicity"],
    institutions: ["moh-vietnam", "k-hospital-hanoi"],
    keyPapers: ["paper-nguyen-trastuzumab-adjuvant-cea-vietnam-plos-one-2024"],
    links: [
      { label: "Thoi bao Tai chinh: Vietnam Social Security's 2025 results, 1 January 2026 (Vietnamese)", url: VSS_2025 },
      { label: "Law No. 51/2024/QH15 amending the Law on Health Insurance, full text (Vietnamese)", url: LAW51 },
      { label: "Nguoi Lao Dong: Ministry of Health on insurance spending on cancer medicines, 19 June 2026 (Vietnamese)", url: NLD_DRUGS_2026 },
      { label: "Vietnam Social Security (Internet Archive, 7 October 2026, Vietnamese)", url: VSS_ARCHIVE },
      { label: "SGGP: referral rules for rare and serious diseases, 3 January 2025 (Vietnamese)", url: SGGP_REFERRAL_2025 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-huong-hanoi-breast-incidence-trends-jco-go-2025", name: "Thirty-Year Trends (1991-2020) in Breast Cancer Incidence Rates: Hanoi, Vietnam",
    journal: "JCO Global Oncology", year: 2025, doi: "10.1200/go-24-00570", pmid: "40403196", authors: "Huong GN, Nguyen HL, Goldberg RJ, Epstein MM, Allison JJ, et al.", paperType: "observational", participants: 28298,
    tldr: "In the Hanoi Cancer Registry, the age-standardised rate of breast cancer in women rose from 15.2 per 100,000 in 1991 to 40.6 in 2020, more than doubling over three decades.",
    summary: "The authors analysed 28,298 breast cancers in women registered by the Hanoi Cancer Registry from 1991 to 2020, using joinpoint regression for the average annual percent change and an age-period-cohort analysis. The registry, set up in 1987 following International Agency for Research on Cancer guidelines, is described by the authors as the first population-based cancer registry in Vietnam; it collects cases from 46 public and private hospitals in Hanoi and cross-checks new cases against health insurance identifiers.\n\nThe age-standardised rate was 15.2 per 100,000 in 1991 to 1995 and 40.6 in 2016 to 2020, with the highest number of cases in women aged 50 to 59.",
    findings: [
      "Age-standardised incidence rose from 15.2 per 100,000 in 1991 to 40.6 in 2020; average annual percent change 4.1% (95% CI 2.9 to 5.4).",
      "Women aged 70 and over had the fastest rise (6.4% a year), against 2.6% a year at ages 40 to 49.",
      "Rates in 2016 to 2020 were 1.6 times those in 2001 to 2005, and women born in 1976 to 1980 had higher rates than earlier cohorts.",
    ],
    whatItMeans: "Viet Nam's first population-based registry, as its authors describe it, shows breast cancer becoming much commoner in the capital, which is the background to the 2026 national plan's targets for breast screening in women aged 40 to 70.",
    caveats: ["One city's registry, not a national count.", "The authors note that the 2012 expansion of K Hospital may have improved diagnosis and reporting, so part of the rise may be better counting."],
    cancers: ["breast-cancer"], institutions: ["k-hospital-hanoi"], technologies: ["cancer-registries-surveillance"],
    links: [doi("10.1200/go-24-00570", "JCO Global Oncology 2025"), pubmed("40403196")] }),

  p({ id: "paper-liu-hanoi-head-neck-incidence-trends-jco-go-2026", name: "Thirty-Year Trends (1991-2020) in Head and Neck Cancer Incidence Rates: Hanoi Cancer Registry, Vietnam",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-26-00083", pmid: "42525914", authors: "Liu AW, Do HVM, Nguyen GH, Nguyen ND, Tran LH, et al.", paperType: "observational", participants: 19589,
    tldr: "In the Hanoi Cancer Registry, head and neck cancer rates rose from 10.9 per 100,000 in 1991 to 1995 to 18.8 in 2006 to 2010 and fell to 11.8 in 2016 to 2020, with nasopharyngeal and sinonasal cancers falling as a share of cases and oral cavity cancers rising as a share in men.",
    summary: "The authors used ICD-10 coded data from the Hanoi Cancer Registry for 1991 to 2020, 19,589 head and neck cancers of which 74% were in men, with ratio-based imputation for changes in Hanoi's administrative boundaries, joinpoint regression and age-period-cohort models.\n\nThe age-standardised rate was 10.9 per 100,000 in 1991 to 1995, peaked at 18.8 in 2006 to 2010 and was 11.8 in 2016 to 2020. Nasopharyngeal and sinonasal cancers fell from 68% to 21% of male cases and from 59% to 36% of female cases, while oral cavity cancers rose as a share of cases in men.",
    findings: [
      "Age-standardised incidence: 10.9 per 100,000 (1991 to 1995), 18.8 (2006 to 2010), 11.8 (2016 to 2020).",
      "Men were 62.2% of cases in 1991 to 1995 and 79% in 2016 to 2020.",
      "Nasopharyngeal and sinonasal cancers fell from 68% to 21% of male cases; the models show declining risk in cohorts born after 1950.",
    ],
    whatItMeans: "Head and neck cancer in northern Viet Nam is shifting from nasopharyngeal and sinonasal towards oral cavity cancer and towards men, which bears on where prevention and early detection should aim.",
    caveats: ["One city's registry.", "Boundary changes in Hanoi required imputation, and the abstract does not separate the effect of changes in reporting."],
    cancers: ["head-and-neck", "nasopharyngeal"], institutions: ["k-hospital-hanoi"], technologies: ["cancer-registries-surveillance"],
    links: [doi("10.1200/go-26-00083", "JCO Global Oncology 2026"), pubmed("42525914")] }),

  p({ id: "paper-nguyen-trastuzumab-adjuvant-cea-vietnam-plos-one-2024", name: "Cost-effectiveness of one-year adjuvant trastuzumab therapy in treatment for early-stage breast cancer patients with HER2+ in Vietnam",
    journal: "PLoS One", year: 2024, doi: "10.1371/journal.pone.0300474", pmid: "38489305", authors: "Nguyen AQ, Tran OTM, Nguyen PK, Nguyen HT", paperType: "methods",
    tldr: "Trastuzumab is reimbursed at 60% by Viet Nam's social health insurance; this model found a year of adjuvant trastuzumab cost 519.6 million dong (22,845 US dollars) per quality-adjusted life year gained, above thresholds of one and three times GDP per head.",
    summary: "A Markov model from a societal perspective compared one year of adjuvant trastuzumab with chemotherapy against chemotherapy (paclitaxel) alone in early HER2-positive breast cancer, using efficacy from the N9831, NSABP B-31, HERA and BCIRG 006 trials and Vietnamese costs and utilities. The authors state that trastuzumab is included in the social health insurance benefits package with a reimbursement rate of 60%.\n\nTrastuzumab added 888,453,971 dong (39,062 US dollars), 3.09 life years and 1.61 quality-adjusted life years, an incremental cost-effectiveness ratio of 519,616,972 dong (22,845 US dollars) per quality-adjusted life year.",
    findings: [
      "Incremental cost per quality-adjusted life year gained: 519,616,972 dong (22,845 US dollars); per life year gained: 287,390,682 dong (12,635 US dollars).",
      "The ratio exceeds thresholds of one and three times GDP per head by 6.3 and 2.1 times.",
      "It would be cost-effective at three times GDP per head if the prices of the 150 mg and 450 mg vials fell by 56% and 54%.",
    ],
    whatItMeans: "Trastuzumab works in HER2-positive breast cancer; the question this paper answers for Viet Nam is price. It gives the payer the price reductions, or biosimilars and vial sharing, that would bring the medicine within common thresholds.",
    caveats: ["A model built on trial efficacy, not observed Vietnamese outcomes.", "Results were driven mainly by transition probabilities and the trastuzumab price."],
    cancers: ["breast-her2-positive"], drugs: ["trastuzumab", "trastuzumab-biosimilars"], terms: ["hta"], institutions: ["vss-vietnam"],
    links: [doi("10.1371/journal.pone.0300474", "PLoS One 2024"), pubmed("38489305")] }),

  p({ id: "paper-toan-vietnam-cervical-screening-steps-jcpo-2026", name: "Trends and disparities in cervical cancer screening prevalence in Vietnam: Evidence from the 2015 and 2021 WHO STEPS surveys",
    journal: "Journal of Cancer Policy", year: 2026, doi: "10.1016/j.jcpo.2026.100748", pmid: "42069248", authors: "Thi Ngoc Toan A, Palmer MR, Phung TL, Nguyen PT", paperType: "observational", participants: 4168,
    tldr: "In Viet Nam's national WHO STEPS surveys, the share of women who had ever been screened for cervical cancer fell from 24.86% in 2015 to 16.36% in 2021, with wider gaps by ethnicity, wealth and region.",
    summary: "A secondary analysis of the nationally representative 2015 and 2021 Vietnam WHO STEPS surveys, defining screening as a self-reported history of ever having a Pap smear, visual inspection with acetic acid or Lugol's iodine, or an HPV test, with survey-weighted estimates and logistic regression.\n\nAmong 4,168 women, 20.47% had ever been screened: 24.86% in 2015 and 16.36% in 2021. Kinh women (adjusted odds ratio 2.56), urban residents (1.27) and women who were or had been married were more likely to have been screened.",
    findings: [
      "Ever screened: 24.86% (2015) and 16.36% (2021), p < 0.001.",
      "Kinh ethnicity: adjusted odds ratio 2.56 (95% CI 1.45 to 4.50); urban residence 1.27 (1.01 to 1.60).",
      "Disparities by ethnicity, wealth and geography widened between the two surveys.",
    ],
    whatItMeans: "Cervical screening reached far fewer women than the 2016 to 2025 national plan aimed for, and the 2026 to 2035 plan moves to HPV testing, including self-sampling, and asks for insurance to pay for screening.",
    caveats: ["Self-reported screening.", "The abstract does not give results by age group."],
    cancers: ["cervical"], technologies: ["hpv-testing"], institutions: ["moh-vietnam"],
    links: [doi("10.1016/j.jcpo.2026.100748", "Journal of Cancer Policy 2026"), pubmed("42069248")] }),
];

/** Records behind /countries/vn/ (wave 4). */
export const recordsVN: EntityInput[] = [...institutions, ...papers];
