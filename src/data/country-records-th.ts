import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Thailand: the institutions and papers behind /countries/th/ (wave 3) that the corpus did not hold. Thai sources were
 * read in Thai from the raw text of each PDF or page: the National Cancer Institute's Cancer in Thailand Vol. XI and
 * its Hospital-Based Cancer Registry 2025 (pdftotext), the National Drug Policy Division's page on the National List
 * of Essential Medicines sub-lists (Internet Archive copy of 8 September 2025, because the live page answered 502),
 * and the Thai FDA's own slides on registration timelines (hosted by Japan's PMDA). nhso.go.th did not answer from
 * our network on 4 November 2026, so the National Health Security Office's figures are quoted from press reports
 * of its own statements, named on each link. DOIs were resolved through Europe PMC and the abstracts read.
 *
 * Inbound links: the four institutions link to each other through `institutions`, and the two papers are linked
 * from the institution records' `keyPapers`, so none depends on the country page for a link.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const CIT_XI = "https://www.nci.go.th/files/cancer_stat/1771382030_file.pdf";
const HBCR_2025 = "https://www.nci.go.th/files/cancer_stat/1787713678_file.pdf";
const NCI_STATS = "https://www.nci.go.th/Cancer_Statistics.html";
const NLEM_SUBLISTS = "https://web.archive.org/web/20250908221706/https://ndp.fda.moph.go.th/drug/category/cat5";
const NLEM_NOTICES = "https://web.archive.org/web/20260710232928/https://ndp.fda.moph.go.th/drug/category/cat11";
const FDA_TIMELINES = "https://www.pmda.go.jp/files/000279149.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "nci-thailand", name: "National Cancer Institute, Thailand", aka: ["สถาบันมะเร็งแห่งชาติ", "NCI Thailand"],
    city: "Bangkok", country: "TH", lat: 13.759, lng: 100.534, institutionType: "cancer-center", website: "https://www.nci.go.th",
    tldr: "Thailand's national cancer institute, part of the Ministry of Public Health. It treats patients at its Bangkok hospital and publishes the country's cancer statistics, Cancer in Thailand, from a network of provincial registries.",
    summary: "The National Cancer Institute is part of the Department of Medical Services of Thailand's Ministry of Public Health, at 268/1 Rama VI Road, Ratchathewi, Bangkok. It runs a cancer hospital and has kept a hospital-based cancer registry of its own patients since 1985: the 2025 report, the 41st, counts 3,159 new cancer patients seen at the institute in 2025.\n\nIt also publishes Cancer in Thailand, the national incidence monograph. Volume XI, covering 2019 to 2021, pools 16 of the country's 19 population-based registries (Chiang Mai, Lampang, Lamphun, Nan, Khon Kaen, Ubon Ratchathani, Udon Thani, Lop Buri, Suphan Buri, Pathum Thani, Bangkok, Chon Buri, Rayong, Chanthaburi, Surat Thani and Songkhla) and estimates a mean of 140,799 new cancers a year for the whole country. The first population-based registry started in Chiang Mai in 1986 and the first volume was published in 1993 with the International Agency for Research on Cancer. The institute also runs Thai Cancer Base, the registration software and dashboard that hospitals use, which the Ministry names as one of the electronic systems behind the Cancer Anywhere referral policy.\n\nThe coordinates on this record are the centroid of Ratchathewi district, not the street address.",
    programs: ["Cancer in Thailand (national incidence monograph)", "Hospital-based cancer registry (since 1985)", "Thai Cancer Base registration system and dashboard", "Cancer hospital, Bangkok"],
    cancers: ["cholangiocarcinoma", "hcc", "breast-cancer", "colorectal", "lung-cancer", "cervical"],
    institutions: ["nhso-thailand", "thai-fda", "siriraj-hospital", "ramathibodi-hospital"],
    links: [
      { label: "NCI Thailand: Cancer in Thailand Vol. XI, 2019-2021 (PDF)", url: CIT_XI },
      { label: "NCI Thailand: Hospital-Based Cancer Registry 2025 (PDF, Thai)", url: HBCR_2025 },
      { label: "NCI Thailand: cancer statistics", url: NCI_STATS },
      { label: "Thai Post: Minister names TCB Plus among the Cancer Anywhere systems, 6 February 2025 (Thai)", url: "https://www.thaipost.net/news-update/735796/" },
    ] }),

  i({ id: "nhso-thailand", name: "National Health Security Office, Thailand", aka: ["สำนักงานหลักประกันสุขภาพแห่งชาติ", "สปสช.", "NHSO"],
    city: "Bangkok", country: "TH", lat: 13.756, lng: 100.502, institutionType: "government", website: "https://www.nhso.go.th",
    tldr: "The public body that runs Thailand's Universal Coverage Scheme, the gold card that covers most Thais. It pays for cancer treatment and screening and, since 2021, lets cancer patients be treated at any hospital ready to treat their cancer, under the rules restored in 2025 without a referral letter.",
    summary: "The National Health Security Office manages the Universal Coverage Scheme (บัตรทอง, the gold card or 30-baht scheme), the largest of Thailand's three public health schemes (76.3% of the population in 2013, according to a 2015 study); civil servants are covered separately by the Comptroller General's Department and private-sector employees by the Social Security Office. It also funds health promotion and screening for all Thais whatever their scheme.\n\nThe NHSO's secretary-general reported in June 2026 that 633,866 people with cancer used gold-card services in fiscal year 2025, up from 357,737 in fiscal year 2021, with outpatient visits rising from 1,677,509 to 3,522,486 and inpatient admissions from 490,519 to 627,165. The Cancer Anywhere policy, announced by the Minister of Public Health on 11 November 2020 and in force from 1 January 2021, lets gold-card patients be treated at any hospital ready to treat their cancer. A revised version that was due to apply from 1 April 2025 was cancelled in February 2025 and the 2023 to 2024 rules restored, under which no referral letter from the registered unit is needed and the hospital bills the NHSO for radiotherapy, chemotherapy, surgery, complications and other conditions the patient has.\n\nIn fiscal year 2025 the NHSO-funded faecal immunochemical test reached 1,387,573 people aged 50 to 70, and 1,414,771 women were screened for cervical cancer. In June 2026 the first lot of Imcranib 100, a targeted cancer medicine made in Thailand by the Chulabhorn Royal Academy, of which 690,000 tablets were granted to the NHSO, was delivered to the Government Pharmaceutical Organization's distribution centre for distribution to hospitals.\n\nwww.nhso.go.th did not answer from OnCo's network on 4 November 2026 or on 17 November 2026, when the office's English site did; the figures are the office's own as reported by Thai news outlets, and the coordinates are a Bangkok centroid, not the office's address.",
    programs: ["Universal Coverage Scheme (gold card)", "Cancer Anywhere (since 1 January 2021)", "Faecal immunochemical test screening, ages 50 to 70", "HPV DNA testing and self-sampling", "Central purchasing and distribution of high-cost medicines"],
    cancers: ["colorectal", "cervical", "breast-cancer", "cml"], drugs: ["imatinib", "letrozole", "trastuzumab"], technologies: ["hpv-testing"],
    institutions: ["nci-thailand", "hitap", "thai-fda", "chulabhorn-hospital"], keyPapers: ["paper-sruamsiri-thai-targeted-therapy-access-plos-one-2015"],
    links: [
      { label: "PPTV: NHSO reports cancer patients in the gold-card scheme, 7 June 2026 (Thai)", url: "https://www.pptvhd36.com/news/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E/277086" },
      { label: "InfoQuest: Cancer Anywhere from 1 January 2021, 11 November 2020 (Thai)", url: "https://www.infoquest.co.th/?p=47313" },
      { label: "Thai Post: revised Cancer Anywhere rules cancelled, 6 February 2025 (Thai)", url: "https://www.thaipost.net/news-update/735796/" },
      { label: "Thai PBS: Imcranib 100, first lot delivered, June 2026 (Thai)", url: "https://www.thaipbs.or.th/news/content/506671" },
      { label: "PPTV: NHSO on FIT screening, 6 July 2026 (Thai)", url: "https://www.pptvhd36.com/news/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E/279016" },
      { label: "PPTV: NHSO on cervical screening, 1 July 2026 (Thai)", url: "https://www.pptvhd36.com/news/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E/278714" },
      doi("10.1371/journal.pone.0119945", "Sruamsiri et al., scheme membership in 2013 (PLoS One 2015)"),
      { label: "National Health Security Office", url: "https://www.nhso.go.th" },
    ] }),

  i({ id: "thai-fda", name: "Food and Drug Administration, Thailand", aka: ["สำนักงานคณะกรรมการอาหารและยา", "อย.", "Thai FDA"],
    city: "Nonthaburi", country: "TH", lat: 13.86, lng: 100.51, institutionType: "government", website: "https://www.fda.moph.go.th",
    tldr: "Thailand's medicines regulator, part of the Ministry of Public Health. It registers new medicines on a full or a shortened review that relies on another regulator's assessment, and its drug policy division keeps the National List of Essential Medicines.",
    summary: "The Food and Drug Administration of the Ministry of Public Health registers medicines in Thailand. Its own slides for the 11th Thailand-Japan Symposium, citing the public manual for modern drug registration of 1 September 2025, give target times in working days: 220 for a full assessment of a new drug or new biologic, 154 for an abridged assessment that relies on an unredacted assessment report from a reference regulator, and 90 for the collaborative registration procedures for medicines prequalified by the World Health Organization or approved by a stringent regulator; vaccines take up to 280 days on full assessment. The reliance route accepts reports submitted and certified by sponsors, reports certified by Japan's PMDA, or reports sent by Australia's TGA under bilateral arrangements, and the Thai FDA keeps the right to revert to a full assessment. The slides cite a 2025 case in which a new Alzheimer's medicine was approved in 179 working days against the 220-day standard through cooperation with the PMDA.\n\nIts National Drug Policy Division, at 88/24 Tiwanon Road, Nonthaburi, serves the National Drug System Development Committee, which issues the National List of Essential Medicines (the list in force, as archived on 10 July 2026, is dated 12 February 2026; it replaced the list of 4 January 2024, amended 30 August 2024). The list's restricted sub-list R2, formerly called list E(2), holds medicines for patients with specific needs that are very expensive or need specialist skill, prescribed through an authorisation system run by the benefit schemes. In May 2025 it registered Imcranib 100, a targeted cancer tablet made by the Chulabhorn Royal Academy's pharmaceutical plant.\n\nThe coordinates are the centroid of Mueang Nonthaburi district, not the street address. The Thai FDA publishes no average approval time for cancer medicines that OnCo could find.",
    programs: ["New drug registration: full (220 working days) and abridged reliance (154)", "World Health Organization collaborative registration procedures (90 working days)", "National List of Essential Medicines (National Drug Policy Division)", "R2 restricted list for high-cost medicines"],
    drugs: ["imatinib"], institutions: ["hitap", "nhso-thailand", "nci-thailand"], keyPapers: ["paper-vargas-who-eml-cancer-chile-kenya-thailand-2026"],
    links: [
      { label: "Thai FDA: Collaboration on Streamlining Review for Pharmaceuticals, 11th Thailand-Japan Symposium (PDF)", url: FDA_TIMELINES },
      { label: "National Drug Policy Division: NLEM sub-lists (Internet Archive, 8 September 2025, Thai)", url: NLEM_SUBLISTS },
      { label: "National Drug Policy Division: NLEM notices (Internet Archive, 10 July 2026, Thai)", url: NLEM_NOTICES },
      { label: "Food and Drug Administration, Thailand", url: "https://www.fda.moph.go.th" },
    ] }),

  i({ id: "hitap", name: "Health Intervention and Technology Assessment Program (HITAP)", aka: ["HITAP", "โครงการประเมินเทคโนโลยีและนโยบายด้านสุขภาพ", "HITAP Foundation"],
    city: "Nonthaburi", country: "TH", lat: 13.86, lng: 100.51, institutionType: "research-institute", website: "https://www.hitap.net",
    tldr: "Thailand's health technology assessment programme. Its cost-effectiveness research is part of how Thailand decides what the public schemes pay for, including the National List of Essential Medicines, which in 2013 screened medicines against a value of 160,000 baht per quality-adjusted life year.",
    summary: "The Health Intervention and Technology Assessment Program is a health technology assessment body based at the Department of Health building of the Ministry of Public Health on Tiwanon Road, Nonthaburi, operating as the HITAP Foundation. A 2009 history by its researchers describes how demands to add expensive technologies to the public benefit package after 2006 made health technology assessment part of national policy decisions, with HITAP's work as the illustration.\n\nIts 2015 policy brief states that the value per quality-adjusted life year used by the subcommittee for the National List of Essential Medicines in 2013 was 160,000 baht, which it gives as about 1.2 times gross national income, and reports a 2012 survey of 4,320 people in 11 provinces in which Thais were willing to pay 195,000 to 325,000 baht for a year of life gained but 113,000 to 156,000 baht for a gain in quality of life alone. A 2026 comparison of cancer medicine lists describes Thailand's route as a technical-negotiation model, using assessment-informed selection and negotiation.\n\nThe coordinates are the centroid of Mueang Nonthaburi district, not the street address. Whether the 160,000 baht figure has changed since the 2015 brief was not verified.",
    programs: ["Economic evaluation for the National List of Essential Medicines", "Benefit package assessments for the Universal Coverage Scheme", "Willingness-to-pay per QALY research"],
    terms: ["hta"], institutions: ["thai-fda", "nhso-thailand"], keyPapers: ["paper-vargas-who-eml-cancer-chile-kenya-thailand-2026"],
    links: [
      { label: "HITAP policy brief: What is the value of a QALY and how much is it? (July 2015, PDF)", url: "https://www.hitap.net/wp-content/uploads/2014/12/PB_20-WTP-Eng-Final-for-web.pdf" },
      doi("10.1017/S0266462309090709", "Teerawattananon et al., Historical development of health technology assessment in Thailand (2009)"),
      { label: "HITAP", url: "https://www.hitap.net/en/" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-sruamsiri-thai-targeted-therapy-access-plos-one-2015", name: "Policies and programs to facilitate access to targeted cancer therapies in Thailand",
    journal: "PLoS One", year: 2015, doi: "10.1371/journal.pone.0119945", pmid: "25798948", authors: "Sruamsiri R, Ross-Degnan D, Lu CY, Chaiyakunapruk N, Wagner AK", paperType: "observational",
    tldr: "How Thailand widened access to expensive targeted cancer medicines in 2007 to 2009, through a special category on the national medicines list, compulsory licences, price negotiation and company programmes, and how many more patients were treated afterwards.",
    summary: "The authors built timelines of access policies for two medicines on Thailand's 2013 National List of Essential Medicines, letrozole and imatinib, and three unlisted medicines for the same uses, trastuzumab, nilotinib and dasatinib, from scientific and grey literature, and used IMS Health sales data from January 2001 to December 2012 to estimate how many patients were treated before and after.\n\nDuring 2007 to 2009 the government created a special category on the national list with different coverage requirements for payers and issued compulsory licences; payers negotiated prices and pooled procurement; companies expanded patient assistance programmes and lowered prices.",
    findings: [
      "Estimated patients treated with letrozole rose from 645 (95% CI 366 to 923) before the interventions to 3,683 (2,748 to 4,618) after.",
      "Imatinib: from 103 (72 to 174) to 350 (307 to 398).",
      "Trastuzumab: from 68 (45 to 118) to 412 (344 to 563).",
    ],
    whatItMeans: "Thailand's special high-cost category on its essential medicines list, now called R2, dates from these years, and this paper is the measured account of what the combined measures did to the number of patients reached.",
    caveats: ["Patient numbers are estimated from sales volumes, not counted from records.", "Several interventions happened at once, so the effect of any one of them cannot be separated."],
    drugs: ["letrozole", "imatinib", "trastuzumab", "nilotinib", "dasatinib"], cancers: ["breast-cancer", "cml"], institutions: ["nhso-thailand"],
    links: [doi("10.1371/journal.pone.0119945", "PLoS One 2015"), pubmed("25798948")] }),

  p({ id: "paper-vargas-who-eml-cancer-chile-kenya-thailand-2026", name: "Best practices for implementing the WHO Model List of Essential Cancer Medicines: Chile, Kenya, and Thailand",
    journal: "Journal of Cancer Policy", year: 2026, doi: "10.1016/j.jcpo.2026.100799", pmid: "42697524", authors: "Vargas V, Cortez R, Kizub D, Youngkong S, Bayona J", paperType: "review",
    tldr: "A comparison of how Chile, Kenya and Thailand put the World Health Organization's list of essential cancer medicines into their public benefit packages; Thailand lists 58 of its 64 medicines and 127 cancer medicines in all.",
    summary: "A comparative case study of three countries chosen for at least 80% alignment with the 2023 World Health Organization Model List of Essential Medicines for cancer (64 medicines), an income transition in the early 2010s and improved universal coverage between 2010 and 2023. Data came from predefined bilingual searches validated by country co-authors.\n\nThe authors describe three routes: Chile's political-fiscal model, anchored in statutory guarantees decided jointly by the health and finance ministries; Thailand's technical-negotiation model, using selection informed by health technology assessment, and negotiation; and Kenya's protocol-partnership model, driven by specialist consensus and international collaboration.",
    findings: [
      "Thailand's national list covers 58 of the 64 cancer medicines on the 2023 WHO list, and 127 cancer medicines in total.",
      "Chile covers 60 of 64 (119 in total) and Kenya 58 of 64 (84 in total).",
      "The authors note that only 25% of countries have a national cancer essential medicines list and fewer than 10% adequately fund it.",
    ],
    whatItMeans: "Thailand's essential medicines list reaches most of what the WHO considers essential for cancer and goes well beyond it, using cost-effectiveness evidence and negotiation rather than a statutory guarantee.",
    caveats: ["The authors state that high list alignment does not by itself guarantee that patients receive the medicines or are protected from the cost.", "Three purposively chosen countries; not a ranking."],
    institutions: ["hitap", "thai-fda"], terms: ["hta"],
    links: [doi("10.1016/j.jcpo.2026.100799", "J Cancer Policy 2026"), pubmed("42697524")] }),
];

/** Records behind /countries/th/ (wave 3). */
export const recordsTH: EntityInput[] = [...institutions, ...papers];
