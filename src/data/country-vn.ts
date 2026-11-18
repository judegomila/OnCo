import type { CountryDive } from "@/data/country-dive";

/**
 * Viet Nam deep dive: the hand-written cards for /countries/vn/ (wave 4). Vietnamese sources were read in Vietnamese
 * from their raw text (pdftotext of each PDF, the HTML of each page), not from a summary of it: Law No. 51/2024/QH15
 * amending the Law on Health Insurance, Circular 37/2024/TT-BYT on the insurance medicines list, Circular
 * 32/2026/TT-BYT on medicine registration, Decision 358/QD-BYT with the national action plan on breast and cervical
 * cancer 2026 to 2035, Politburo Resolution 72-NQ/TW, the Ministry of Justice's introduction to Law No. 44/2024/QH15,
 * K Hospital's and Ho Chi Minh City Oncology Hospital's own pages, and Vietnamese press reports quoting the Ministry of
 * Health and Vietnam Social Security by name, because moh.gov.vn, dav.gov.vn and baohiemxahoi.gov.vn reset our
 * connections. Registry figures come from the registries' own published analyses, resolved through Europe PMC. Every
 * figure below is quoted from one of those; where a figure could not be read it is named under `gaps`.
 */
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
const DANTRI_DRUGS_2026 = "https://dantri.com.vn/suc-khoe/30-thuoc-dieu-tri-ung-thu-the-he-moi-chi-phi-cao-sap-duoc-bhyt-chi-tra-20260528112629967.htm";
const SGGP_LIST_2026 = "https://www.sggp.org.vn/de-xuat-bo-sung-thuoc-ung-thu-the-he-moi-vao-danh-muc-bao-hiem-y-te-post873399.html";
const SGGP_REFERRAL_2025 = "https://www.sggp.org.vn/bo-giay-chuyen-tuyen-doi-voi-cac-benh-hiem-benh-hiem-ngheo-giam-phien-ha-tiet-kiem-chi-phi-post776040.html";
const HPV_EPI_2026 = "https://baovanhoa.vn/doi-song/be-gai-12-tuoi-o-4-vung-kho-khan-sap-duoc-tiem-vaccine-hpv-mien-phi-233615.html";
const K_ABOUT = "https://benhvienk.vn/gioi-thieu-benh-vien-pde6931.html";
const HCM_40 = "https://benhvienungbuou.vn/40-nam-dong-hanh-cung-su-phat-trien-nen-y-hoc-viet-nam/";
const HANOI_BREAST = "https://doi.org/10.1200/go-24-00570";
const HANOI_HN = "https://doi.org/10.1200/go-26-00083";
const HCMC_CRC = "https://doi.org/10.1016/j.canep.2022.102113";
const TRASTUZUMAB_CEA = "https://doi.org/10.1371/journal.pone.0300474";
const STEPS = "https://doi.org/10.1016/j.jcpo.2026.100748";
const K_DETEK = "https://doi.org/10.1186/s12916-025-03929-y";

export const VN_DIVE: CountryDive = {
  iso2: "VN",
  iso3: "VNM",
  name: "Viet Nam",
  flag: "🇻🇳",
  asOf: "2026-11-04",
  title: "Cancer in Viet Nam",
  description:
    "Cancer in Viet Nam from Vietnamese sources: GLOBOCAN's estimate of 177,404 new cancers in 2024 against city registries in Hanoi and Ho Chi Minh City, social health insurance covering more than 95.1% of people in 2025 and paying 80% of covered costs for most, a medicines list that asks for budget impact and cost-effectiveness evidence and a draft adding 30 cancer medicines, the Drug Administration's 12-month and 9-month registration routes, the 2026 to 2035 plan for breast and cervical cancer, and HPV vaccine in the national immunisation programme from July 2026.",
  lede:
    "The registry figures OnCo could read for Viet Nam come from city registries, the oldest in Hanoi since 1987. No published national registry count was found, and the national picture here is IARC's estimate: about 177,400 new cancers in 2024, with breast, lung, bowel and liver cancer the commonest. Social health insurance covered more than 95 in every 100 people in 2025, people with diseases on a Ministry of Health list that includes cancers can now go straight to a specialist hospital without a referral letter, and a new list of the medicines the fund pays for, adding 30 cancer medicines, was still in draft in late 2026.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Viet Nam is 177,404 new cancers and 111,015 deaths in 2024, including 1,987 non-melanoma skin cancers (175,417 without them), on a population of 100,987,690, with an age-standardised incidence rate of 142.4 per 100,000 and a cumulative risk to age 74 of 15.36%. GLOBOCAN's incidence for Viet Nam is built from subnational registry rates applied to the national population (method 2b), and its deaths are derived from those incidence estimates through modelled mortality-to-incidence ratios (method 3c) rather than counted from death certificates. OnCo found no published national registry count to compare it with. The city registries' own figures cover Hanoi and Ho Chi Minh City: the Hanoi Cancer Registry's age-standardised rate for breast cancer in women was 40.6 per 100,000 in 2016 to 2020, against GLOBOCAN's 38.51 for the whole country in 2024. The Ministry of Health's own action plan shows how far routine reporting falls short of the estimates: the secondary reports compiled for its plan summed to 3,895 new cervical cancers in 2024, while GLOBOCAN estimates 8,274, and the plan calls the data incomplete and of uncertain quality. GLOBOCAN ranks breast (25,711), lung (23,085), colorectum (22,584), liver (14,591), stomach (12,373) and thyroid (12,223) first for new cases, and lung cancer (21,340) and liver cancer (13,664) first for deaths.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Viet Nam",
      aside: { label: "Huong et al., 30-year breast cancer trends, Hanoi Cancer Registry (JCO Global Oncology 2025)", url: HANOI_BREAST },
      cards: [
        {
          id: "shape",
          title: "About 177,400 new cancers a year, led by breast, lung, bowel and liver cancer",
          plain:
            "IARC estimates 177,404 new cancers and 111,015 cancer deaths in Viet Nam in 2024. Breast cancer is the commonest cancer, followed by lung, bowel, liver, stomach and thyroid cancer. Lung and liver cancer account for the most deaths. These are IARC's estimates, built from the rates of registries that cover part of the country. OnCo found no national count.",
          detail:
            "GLOBOCAN 2024 gives Viet Nam 25,711 new breast cancers (age-standardised rate 38.51 per 100,000), 23,085 lung cancers (18.26), 22,584 colorectal cancers (17.78), 14,591 liver cancers (11.53), 12,373 stomach cancers (9.75), 12,223 thyroid cancers (10.09) and 8,274 cervical cancers (12.31 per 100,000 women). By deaths the order is lung (21,340), liver (13,664), colorectum (10,990), breast (10,609) and stomach (10,280); for liver cancer the estimated deaths are 94% of the estimated new cases. GLOBOCAN also estimates 3,354 nasopharyngeal cancers. The Ministry of Health's 2026 action plan says more than 60% of breast cancers in Viet Nam are found at stage III or IV. GLOBOCAN classes Viet Nam as lower-middle income with a population of about 101 million.",
          links: [
            { label: "IARC Global Cancer Observatory: Viet Nam fact sheet, GLOBOCAN 2024 (PDF)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/704-viet-nam-fact-sheet.pdf" },
            { label: "Decision 358/QD-BYT, national action plan on breast and cervical cancer, Part I (PDF, Vietnamese)", url: QD358 },
          ],
        },
        {
          id: "registries",
          title: "How Viet Nam counts: city registries, the oldest in Hanoi since 1987",
          plain:
            "The registry figures found for this page come from population-based cancer registries in Viet Nam's two largest cities. The Hanoi Cancer Registry, set up in 1987 on IARC guidelines, collects cases from 46 hospitals, and its analyses are published by researchers at the Vietnam National Cancer Institute, part of K Hospital. Ho Chi Minh City has its own registry. No national report of registered cancers was found.",
          detail:
            "The authors of the Hanoi registry's 2025 breast cancer analysis, at the Vietnam National Cancer Institute and Hanoi Medical University, describe it as the first population-based cancer registry in Vietnam, established in 1987 under IARC guidelines. Until 2018 trained registrars visited hospitals each year to find new cases; since 2019 it has used active and passive, paper and electronic collection from 46 hospitals (42 public, four private) that diagnose and treat cancer in Hanoi, cross-checking new cases against health insurance numbers to avoid duplicates. A 2019 projection study used 2004 to 2013 data from the Hanoi and Ho Chi Minh City registries supplied by the National Cancer Institute, and Ho Chi Minh City Oncology Hospital's doctors have published trends from their city's registry for 1996 to 2015. The Ministry of Health's 2026 action plan describes a national cancer surveillance and registration system that does not yet record people who were screened or had benign findings, and calls routine provincial data incomplete.",
          links: [
            { label: "Huong et al., Hanoi breast cancer trends 1991 to 2020 (JCO Global Oncology 2025)", url: HANOI_BREAST },
            { label: "Nguyen et al., projecting cancer incidence for 2025 in Hanoi and Ho Chi Minh City (Cancer Control 2019)", url: "https://doi.org/10.1177/1073274819865274" },
            { label: "Decision 358/QD-BYT, Part I (PDF, Vietnamese)", url: QD358 },
          ],
        },
        {
          id: "city-trends",
          title: "What the city registries show: breast and bowel cancer rising, nasopharyngeal and sinonasal cancers a shrinking share",
          plain:
            "In Hanoi the rate of breast cancer more than doubled between 1991 and 2020. Head and neck cancer peaked in 2006 to 2010; among men, nasopharyngeal and sinonasal cancers fell from 68% to 21% of cases while mouth cancers took a larger share. In Ho Chi Minh City the rate of bowel cancer rose 1.7 times between 1996 and 2015.",
          detail:
            "The Hanoi Cancer Registry counted 28,298 breast cancers in women from 1991 to 2020; the age-standardised rate rose from 15.2 per 100,000 to 40.6, an average of 4.1% a year, fastest in women aged 70 and over, and women born in 1976 to 1980 had higher rates than earlier generations. The authors note that the 2012 expansion of K Hospital, which they call Vietnam's largest cancer centre, likely improved diagnosis and reporting. For head and neck cancer the same registry counted 19,589 cases (74% in men); the rate went from 10.9 per 100,000 in 1991 to 1995 to 18.8 in 2006 to 2010 and 11.8 in 2016 to 2020, and nasopharyngeal and sinonasal cancers fell from 68% to 21% of men's cases. In Ho Chi Minh City's registry the age-standardised rate of colorectal cancer rose from 10.5 to 17.9 per 100,000 over 1996 to 2015, faster in men (4.7% a year) than in women (2.6%), with rectal cancer rising fastest.",
          links: [
            { label: "Huong et al. (JCO Global Oncology 2025)", url: HANOI_BREAST },
            { label: "Liu et al., Hanoi head and neck cancer trends 1991 to 2020 (JCO Global Oncology 2026)", url: HANOI_HN },
            { label: "Pham et al., Ho Chi Minh City colorectal cancer trends 1996 to 2015 (Cancer Epidemiology 2022)", url: HCMC_CRC },
          ],
        },
      ],
      tables: [
        {
          id: "hanoi-breast-registry",
          title: "Breast cancer in women in Hanoi, 1991 to 2020, by five-year period",
          caption: "New breast cancers in women resident in Hanoi registered by the Hanoi Cancer Registry, with crude and age-standardised rates per 100,000 women, from the registry's 30-year analysis (Table 1).",
          columns: [
            { key: "period", label: "Period" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "crude", label: "Crude rate", numeric: true },
            { key: "asr", label: "Age-standardised rate", numeric: true },
          ],
          rows: [
            { period: "1991 to 1995", cases: 1746, crude: 13.7, asr: 15.2 },
            { period: "1996 to 2000", cases: 2411, crude: 18.8, asr: 21.2 },
            { period: "2001 to 2005", cases: 3733, crude: 27.5, asr: 28.8 },
            { period: "2006 to 2010", cases: 5775, crude: 37.1, asr: 38.1 },
            { period: "2011 to 2015", cases: 6198, crude: 35.4, asr: 34.8 },
            { period: "2016 to 2020", cases: 8435, crude: 43.3, asr: 40.6 },
            { period: "All 30 years", cases: 28298, crude: 30.8, asr: 31.6 },
          ],
          note: "One city's registry, not a national count; men's breast cancers were excluded. The registry's other published series give head and neck cancer at 10.9, 18.8 and 11.8 per 100,000 in 1991 to 1995, 2006 to 2010 and 2016 to 2020. OnCo found no national registry table of all cancers; see the gaps below.",
          sources: [
            { label: "Huong et al., JCO Global Oncology 2025, Table 1", url: HANOI_BREAST },
            { label: "Liu et al., JCO Global Oncology 2026", url: HANOI_HN },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: social health insurance for almost everyone, with co-payments",
      aside: { label: "Law No. 51/2024/QH15 amending the Law on Health Insurance, full text (Vietnamese)", url: LAW51 },
      cards: [
        {
          id: "insurance",
          title: "Social health insurance covering more than 95% of people, paying 80% of covered costs for most",
          plain:
            "Vietnam Social Security estimated that health insurance covered more than 95.1% of the population in 2025. For most members the fund pays 80% of covered costs and the patient pays the rest; some groups get 95% or 100%. Once a member insured for five years in a row has paid co-payments above a set ceiling in a year, the fund pays everything.",
          detail:
            "Article 22 of the Law on Health Insurance, as rewritten by Law No. 51/2024/QH15 (in force from 1 July 2025, with the provisions on referral and levels of care from 1 January 2025), sets the fund's share of covered costs: 100% for groups named in the law, 100% when one visit costs less than a level set by the government, 100% at primary care facilities, 100% once a member with five continuous years of insurance has co-paid more than six times the reference level in a year, 95% for other named groups, and 80% for everyone else. Going to a hospital outside one's registration without referral reduces the fund's share, for example to 40% of the usual benefit for inpatient care at a specialist hospital. Vietnam Social Security's year-end figures, reported on 1 January 2026, estimate about 195.5 million insured visits in 2025 and about 161,628 billion dong in costs submitted for payment. Since 2025 Vietnam Social Security has been a special unit under the Ministry of Finance. Politburo Resolution 72-NQ/TW of 9 September 2025 sets a goal of free basic hospital care within insurance benefits by 2030, to come in stages.",
          links: [
            { label: "Law No. 51/2024/QH15, Article 1, point 17 (Article 22), full text (Vietnamese)", url: LAW51 },
            { label: "Thoi bao Tai chinh: Vietnam Social Security's 2025 results, 1 January 2026 (Vietnamese)", url: VSS_2025 },
            { label: "Politburo Resolution 72-NQ/TW (Vietnamese)", url: NQ72 },
          ],
        },
        {
          id: "no-referral",
          title: "Since January 2025, straight to a specialist hospital without a referral letter for listed diseases, cancers among them",
          plain:
            "Since 1 January 2025 a person confirmed by a local health facility to have one of 62 rare or serious diseases listed by the Ministry of Health, cancers among them, can go straight to a specialist hospital and keep full insurance benefits without a referral letter. Which cancers are on the list was not read for this page. K Hospital's director said 20,000 insured patients being treated there would not need a new referral letter in 2025.",
          detail:
            "Circular 01/2025/TT-BYT, which guides the amended law, lists 62 diseases and disease groups for which insured people can be diagnosed and treated at specialist-level hospitals with full benefits and no referral, 167 that can be treated at basic-level hospitals, and 141 for which a referral stays valid for a year, according to the head of the Ministry of Health's Health Insurance Department, Tran Thi Trang, as reported by SGGP on 3 January 2025. Ho Chi Minh City Oncology Hospital said nine of the 62 groups are cancers it usually treats. K Hospital's director, Le Van Quang, said 20,000 insured patients being treated there would not need a new referral letter in the new year, and the hospital said that patients with malignant tumours and in situ tumours could use a referral for one year. SGGP reports that the patient must have the disease confirmed by a lower-level facility to go straight to a specialist hospital. Referrals and follow-up appointments can also be issued electronically through the national VNeID identity app, in a pilot. The annex listing the 62 diseases was not read for this page (see gaps).",
          links: [
            { label: "SGGP: referral letters dropped for rare and serious diseases, 3 January 2025 (Vietnamese)", url: SGGP_REFERRAL_2025 },
            { label: "Law No. 51/2024/QH15, Article 22(4)(a) (Vietnamese)", url: LAW51 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Medicines list",
      title: "How Viet Nam decides which cancer medicines insurance pays for",
      aside: { label: "Circular 37/2024/TT-BYT (PDF, Vietnamese)", url: TT37 },
      cards: [
        {
          id: "drug-list",
          title: "A list of 76 cancer and immune medicines, admitted on budget impact and cost-effectiveness evidence",
          plain:
            "The Ministry of Health's insurance medicines list, issued in 2022, holds 1,037 medicines, 76 of them for cancer and immune modulation. Since 2025 a new medicine is considered only with a budget impact report for Viet Nam and evidence on cost-effectiveness. Expensive medicines can be paid at a partial rate, such as trastuzumab at 60%.",
          detail:
            "Circular 37/2024/TT-BYT, in force from 1 January 2025, says a single-ingredient medicine is considered for the list only if it has a valid registration or import licence from the Drug Administration, appears in a WHO, Ministry of Health or other recognised guideline, has a budget impact report for Viet Nam, and has evidence on cost-effectiveness in Viet Nam or a systematic review of it, Vietnamese evidence preferred. Medicines with high treatment costs or budget impact, or costlier than listed alternatives, can be given a payment rate below 100% or tighter conditions, and a company's price reduction can be taken into account. Cancer medicines are paid when prescribed by a doctor licensed in oncology, nuclear medicine or haematology at a facility approved to treat cancer; elsewhere a guideline or a consultation with an oncologist is needed. The ministry must review the list at least every two years, advised by an expert council on safety, efficacy and health economics. The fund paid nearly 9,600 billion dong for cancer and immune-modulating medicines in 2025, 16.4% of its spending on medicines. A 2024 Vietnamese model put one year of adjuvant trastuzumab, reimbursed at 60%, at 519.6 million dong per quality-adjusted life year, above three times GDP per head; the circular names no threshold.",
          links: [
            { label: "Circular 37/2024/TT-BYT, Articles 3, 4, 12 and 19 (PDF, Vietnamese)", url: TT37 },
            { label: "Nguoi Lao Dong: Ministry of Health on the list and spending on cancer medicines, 19 June 2026 (Vietnamese)", url: NLD_DRUGS_2026 },
            { label: "Nguyen et al., cost-effectiveness of adjuvant trastuzumab in Vietnam (PLoS One 2024)", url: TRASTUZUMAB_CEA },
          ],
        },
        {
          id: "new-list",
          title: "A new list with 30 more cancer medicines, still in draft",
          plain:
            "The Ministry of Health has drafted a new insurance list adding 84 medicines, 30 of them for cancer, mostly targeted medicines, antibodies and immunotherapies, some proposed for payment at 30% to 70%. It was expected in mid-2026; in late September the ministry told voters the list was still being revised.",
          detail:
            "Dan Tri reported on 28 May 2026 that the Ministry of Health expected to issue the circular with the new list in the second quarter, adding 84 medicines of which 30 are for cancer (35.7% of the additions), the largest group, because many new cancer medicines have been registered in Viet Nam in recent years; the paper called it the largest update of the list in eight years. Nguoi Lao Dong reported on 19 June 2026, citing the ministry's Health Insurance Department, that about 30 cancer medicines were expected to be added and that some costing 50 to 60 million dong a vial were proposed for payment at 30% to 70%. On 26 September 2026 SGGP reported the ministry's reply to voters in Vinh Long: the list is being reviewed and amended, will add some new cancer medicines, monoclonal antibodies and immunotherapies, will set payment rates to suit what patients and the fund can afford, and would extend payment for 349 medicines to primary care facilities. No signed circular was found by 4 November 2026; until one is issued the 2022 list applies.",
          links: [
            { label: "Dan Tri: 30 new cancer medicines expected on the insurance list, 28 May 2026 (Vietnamese)", url: DANTRI_DRUGS_2026 },
            { label: "Nguoi Lao Dong, 19 June 2026 (Vietnamese)", url: NLD_DRUGS_2026 },
            { label: "SGGP: Ministry of Health reply on the medicines list, 26 September 2026 (Vietnamese)", url: SGGP_LIST_2026 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Drug Administration of Vietnam and its reliance route",
      aside: { label: "Circular 32/2026/TT-BYT on registration of medicines (PDF, Vietnamese)", url: TT32 },
      cards: [
        {
          id: "dav-routes",
          title: "12 months for a decision on a new medicine, 9 when it relies on a reference regulator",
          plain:
            "Under rules in force since 1 October 2026, the Drug Administration has up to 12 months to decide on an application to market a medicine, up to 9 months when the application relies on the assessment of a reference regulator such as the European Medicines Agency or the US FDA, and up to 6 months for priority medicines. These are limits in the rules, not measured times.",
          detail:
            "Circular 32/2026/TT-BYT of 29 July 2026, issued under the Law on Pharmacy as amended by Law No. 44/2024/QH15, sets the processing times from receipt of an application: no more than 12 months for a medicine; no more than 9 months for one using the reliance route; no more than 6 months for priority cases under Article 7(5) of the Law on Pharmacy; and 15 days for a new medicine against a declared group A epidemic. The Ministry of Justice's introduction to the 2024 law describes the 9-month route as a cut from 12 months for applications that reference another regulator's assessment (that introduction could not be re-read on 17 November 2026, when the Ministry of Justice site returned an error). The reference regulators are the European Medicines Agency and the listed stringent regulators: the US FDA, the regulators of European Union countries, the United Kingdom's MHRA, Japan's PMDA, Swissmedic, Health Canada, and Australia, Iceland, Liechtenstein and Norway. A relying application must include the reference regulator's final assessment report, covering quality, non-clinical and clinical data and the benefit-risk assessment, and a table comparing it with the Vietnamese dossier. Experts assess each dossier and an advisory council appointed by the Minister of Health reviews them.",
          links: [
            { label: "Circular 32/2026/TT-BYT, Articles 2, 26, 30 and 45 (PDF, Vietnamese)", url: TT32 },
            { label: "Ministry of Justice: introduction to Law No. 44/2024/QH15 (Word, Vietnamese)", url: LAW44_INTRO },
          ],
        },
        {
          id: "dav-evidence",
          title: "Asian data instead of a Vietnamese trial, and three-year first licences",
          plain:
            "A new medicine already approved abroad can skip clinical trials in Viet Nam if its data are complete and allow the effect of Asian ethnicity to be analysed. A new medicine's first licence lasts three years rather than the usual five, so that its safety can be followed. Hospitals may also import an unregistered medicine for a patient's special treatment needs.",
          detail:
            "Article 19 of Circular 32/2026/TT-BYT exempts a new medicine (other than a vaccine) from clinical trials in Viet Nam when it is approved in at least one country, has the complete clinical data the circular requires, and its trial data are enough to analyse the effect of Asian ethnicity on safety and efficacy under the ICH E5 guideline; the Minister can waive some trial phases for rare or serious diseases or for medicines approved by a reference regulator on a reduced clinical dossier. A first registration of a new medicine, vaccine or biological is valid for three years, other registrations for five, and a licence stays in force while a renewal application filed on time is being decided. The Ministry of Justice's introduction to Law No. 44/2024/QH15 says the law lets hospitals import medicines not registered in Viet Nam for the special treatment needs of their patients, and lets unregistered medicines be imported for clinical trials approved by the Ministry of Health without an import licence (that introduction could not be re-read on 17 November 2026, when the Ministry of Justice site returned an error). For a cancer medicine, registration is only the first step: insurance pays only once it is on the Ministry of Health's list.",
          links: [
            { label: "Circular 32/2026/TT-BYT, Articles 12, 19 and 20 (PDF, Vietnamese)", url: TT32 },
            { label: "Ministry of Justice: introduction to Law No. 44/2024/QH15 (Word, Vietnamese)", url: LAW44_INTRO },
            { label: "Drug Administration of Vietnam (Internet Archive, 18 May 2026, Vietnamese)", url: DAV_ARCHIVE },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: a national plan for breast and cervical cancer, and HPV vaccine from July 2026",
      aside: { label: "Decision 358/QD-BYT, national action plan 2026 to 2035 (PDF, Vietnamese)", url: QD358 },
      cards: [
        {
          id: "cervical",
          title: "Cervical screening reached about one woman in four, and the new plan moves to HPV testing",
          plain:
            "The 2016 to 2025 plan aimed to screen 60% of women aged 30 to 54. By 2020, 28.2% of women aged 30 to 49 had ever been screened. The 2026 to 2035 plan aims for 35% of women aged 30 to 49 to have an HPV-based test by 2030 and 70% by 2035, with self-sampling, and wants insurance to pay for it.",
          detail:
            "Decision 358/QD-BYT of 3 February 2026 records that the 2016 to 2025 national plan (Decision 5240/QD-BYT) aimed for at least 25% of girls vaccinated against HPV and 60% screening coverage of women aged 30 to 54 by 2025. It cites the 2020 to 2021 survey of children and women: 28.2% of women aged 30 to 49 had ever been screened by any method, highest in the Red River Delta and South East regions, with Hanoi and Ho Chi Minh City above 30%, against 15.3% in the northern mountains and 0.9% among Hmong women; 12% of women aged 15 to 29 had had an HPV vaccine. Provincial reports show women aged 30 to 54 screened rising from about 729,000 to about 1.71 million a year between 2020 and 2024. The national WHO STEPS surveys found 24.86% of women had ever been screened in 2015 and 16.36% in 2021. The plan states that insurance does not pay for screening HPV tests or mammography. Its targets: 35% of women aged 30 to 49 tested with a high-performance test by 2030 and 70% by 2035, moving from cytology and visual inspection to HPV DNA or mRNA testing, including self-sampling, and incidence below 4 per 100,000 women by 2035.",
          links: [
            { label: "Decision 358/QD-BYT, Parts I, II and IV (PDF, Vietnamese)", url: QD358 },
            { label: "Toan et al., cervical screening in the 2015 and 2021 STEPS surveys (J Cancer Policy 2026)", url: STEPS },
          ],
        },
        {
          id: "breast-hpv",
          title: "No national breast screening programme yet, and free HPV vaccine starting in four provinces",
          plain:
            "Viet Nam has no national breast screening programme; the 2026 plan aims to screen 50% of women aged 40 to 70 by 2030 and 70% by 2035. From 1 July 2026 HPV vaccine joined the national immunisation programme, starting with about 18,900 girls aged 12 a year in four upland provinces.",
          detail:
            "The 2026 action plan says breast screening is carried out in some places but there is no national programme, that about 22.4% of women have ever had a clinical breast examination and 18.8% examine their breasts monthly, that few women aged 40 to 70 have regular mammograms, and that mammography is less common in rural than urban women (18% against 32%). It sets targets for 2030 and 2035: 50% and 70% of women aged 40 to 70 examined and screened, 50% and 80% of those with suspicious findings diagnosed within 60 days, 40% and 60% of invasive breast cancers found at stage I or II, and breast cancer mortality falling by 2.5% a year. Bao Van Hoa reported on 2 June 2026 that Circular 13/2026/TT-BYT, in force from 1 July 2026, added HPV to the diseases covered by the Expanded Programme on Immunization, with free quadrivalent vaccine first for girls aged 12 in four upland provinces, about 18,900 girls a year in grade 6 or out of school, before any wider roll-out. The plan targets 90% of girls aged 9 to 15 fully vaccinated in the areas where it is offered.",
          links: [
            { label: "Decision 358/QD-BYT, Parts II and IV (PDF, Vietnamese)", url: QD358 },
            { label: "Bao Van Hoa: free HPV vaccine for girls aged 12 in four provinces, 2 June 2026 (Vietnamese)", url: HPV_EPI_2026 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Viet Nam does",
      title: "What Viet Nam does that others do not",
      cards: [
        {
          id: "free-checkup",
          title: "A free health check or screening every year for everyone, written into party policy",
          plain:
            "The Politburo's Resolution 72 of September 2025 says that from 2026 every person should have a free health check or screening at least once a year and an electronic health record, and that basic hospital care within insurance benefits should be free by 2030. The insurance fund is to pay more for early diagnosis and treatment of some diseases from 2026.",
          detail:
            "Resolution 72-NQ/TW of 9 September 2025, signed by General Secretary To Lam, sets goals for 2030: from 2026 people receive a free periodic health check or screening at least once a year and an electronic health record to manage their health over the life course; by 2030 people are exempt from basic hospital fees within insurance benefits, in stages, starting with social policy groups, vulnerable and low-income people; and insurance coverage above 95% by 2026. It asks for the free checks to be combined with school, occupational and workers' health checks and insured care, for the insurance fund to raise its payment for prevention, diagnosis and early treatment of some diseases from 2026 alongside higher contributions from 2027, and for the state budget and the fund to pay for some prevention, chronic disease management and screening at primary and basic care. The resolution does not name cancer screening tests; the Ministry of Health's breast and cervical plan cites it as the policy it puts into practice.",
          links: [
            { label: "Politburo Resolution 72-NQ/TW, 9 September 2025, full text (Vietnamese)", url: NQ72 },
            { label: "Decision 358/QD-BYT, Part IV (PDF, Vietnamese)", url: QD358 },
          ],
        },
        {
          id: "home-grown-test",
          title: "A Vietnamese blood test for many cancers, studied in 9,057 people across 75 hospitals",
          plain:
            "Gene Solutions, a company in Ho Chi Minh City, developed a blood test called SPOT-MAS that looks for signs of several cancers at once. In the K-DETEK study, 9,057 adults aged 40 or older without symptoms were tested at 75 hospitals in Viet Nam; 43 tested positive and 17 of those had cancer.",
          detail:
            "K-DETEK (NCT05227261), published in BMC Medicine in 2025, enrolled 9,057 people without symptoms at 75 hospitals and one research institute in Viet Nam and followed them for 12 months. Of 9,024 eligible, 43 (0.48%) tested positive and 17 were confirmed to have cancer, a positive predictive value of 39.53%; the predicted organ of origin was right in 9 of the 17. Among those who tested negative, 8,974 of 8,981 stayed free of cancer for a year. The authors describe it as a prospective validation of a multi-cancer test in a lower-middle-income country and suggest such tests could add to national screening where programmes are limited; no national programme uses it, and whether screening with it reduces deaths has not been tested. The trial records list Hanoi Medical University, Hanoi Oncology Hospital, Hue Central Hospital and Can Tho Oncology Hospital among the collaborators.",
          links: [
            { label: "Nguyen et al., K-DETEK (BMC Medicine 2025)", url: K_DETEK },
            { label: "K-DETEK on ClinicalTrials.gov (NCT05227261)", url: "https://clinicaltrials.gov/study/NCT05227261" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-vietnam",
          title: "70 trials in OnCo's records have a site in Viet Nam, most of them AstraZeneca phase 3 trials",
          plain:
            "Of the trials in OnCo's records, 70 list a site in Viet Nam: 63 phase 3 and 7 phase 2. AstraZeneca sponsors 53 of them, and lung cancer is the largest group, then liver cancer. Two small ones stand out: a liver cancer trial run in two countries and a bowel cancer trial in three.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026: 70 trials list Vietnam among their countries, 63 of them phase 3 and 7 phase 2. OnCo's records mark 20 as recruiting and 31 as active; ClinicalTrials.gov gives 42 as active and not recruiting, 21 recruiting and 7 completed. AstraZeneca is lead sponsor of 53 and Merck Sharp & Dohme of 6; non-small cell lung cancer is the first-listed cancer for 30 and hepatocellular carcinoma for 7, including HIMALAYA, EMERALD-1 and EMERALD-3. The smallest are a phase 3 trial of ADI-PEG 20 in hepatocellular carcinoma with high arginine levels, listing two countries, a phase 2 trial of RBS2418 in colorectal cancer listing three, and CONCUR, the Asian phase 3 trial of regorafenib in colorectal cancer, listing five. OnCo's country snapshot of 8 September 2026 also records a ClinicalTrials.gov count of 1,304 studies of all conditions with a location in Viet Nam.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Vietnam", url: "https://clinicaltrials.gov/search?country=Vietnam&cond=Cancer" },
            { label: "NCT05317819, ADI-PEG 20 in hepatocellular carcinoma", url: "https://clinicaltrials.gov/study/NCT05317819" },
          ],
        },
        {
          id: "research-output",
          title: "Oncology research output: 233 papers in 2025 with authors based in Viet Nam",
          plain:
            "OpenAlex counts 233 oncology papers with at least one author based in Viet Nam in 2025, up from 145 in 2021, and 908 over the five years. Doctors at K Hospital in Hanoi and Ho Chi Minh City Oncology Hospital publish the city registry trends that the country's cancer picture rests on.",
          detail:
            "OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Viet Nam 145 works in 2021, 161 in 2022, 149 in 2023, 220 in 2024 and 233 in 2025, 908 in total, of which 643 are open access and 20 highly cited. K Hospital, the Vietnam National Cancer Hospital, traces its origin to the Institut Curie de l'Indochine opened in Hanoi on 19 October 1923 and was founded by a Ministry of Health decision of 17 July 1969; it has three sites in Hanoi, 74 institutes, centres and departments and nearly 2,000 staff, and its director is Le Van Quang. Ho Chi Minh City Oncology Hospital marked 40 years on 15 May 2025. Researchers from both hospitals publish the registry trends on this page with Hanoi Medical University, Pham Ngoc Thach University of Medicine and partners in the United States and Australia.",
          links: [
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "K Hospital: about the hospital (Vietnamese)", url: K_ABOUT },
            { label: "Ho Chi Minh City Oncology Hospital: 40 years, 1985 to 2025 (Vietnamese)", url: HCM_40 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "sites-unreachable",
      title: "The Ministry of Health, the Drug Administration and Vietnam Social Security sites could not be read directly",
      plain:
        "moh.gov.vn, dav.gov.vn and baohiemxahoi.gov.vn reset our connections when this page was written. Their documents were read from provincial and university copies of the signed texts and from Internet Archive copies, and their figures from Vietnamese newspapers quoting them by name, each linked.",
      detail:
        "Every request to moh.gov.vn, dav.gov.vn and baohiemxahoi.gov.vn on 4 November 2026 failed during the secure connection. The Drug Administration and Vietnam Social Security home pages were read from Internet Archive copies of 18 May and 7 October 2026. Circulars 37/2024 and 32/2026 and Decision 358/QD-BYT were read from the signed PDFs as posted by provincial portals and a medical university, and the amended health insurance law from the full text on a provincial portal; thuvienphapluat.vn and luatvietnam.vn refused our requests with 403. Coverage and spending figures for 2025 are Vietnam Social Security's year-end estimates as reported by Thoi bao Tai chinh, a Ministry of Finance newspaper, and the medicines spending figure is the Ministry of Health's as reported by Nguoi Lao Dong.",
      links: [
        { label: "Ministry of Health", url: "https://moh.gov.vn" },
        { label: "Vietnam Social Security (Internet Archive, 7 October 2026)", url: VSS_ARCHIVE },
      ],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find, from a source it could read, a national count of registered cancers, national cancer deaths counted from death records, population-based cancer survival for Viet Nam, the per-medicine payment rates on the 2022 insurance list, or the annex of Circular 01/2025 that lists the 62 diseases with direct specialist access.",
      detail:
        "No national cancer registry report was found; the registry figures on this page are the Hanoi and Ho Chi Minh City registries' own published analyses, and the national figures are GLOBOCAN's modelled estimates, its deaths derived from incidence. No national count of cancer deaths from vital registration was found. No population-based survival figure was found; the 2026 action plan gives a five-year breast cancer survival of about 74% without a source or cohort, so it is not used. The Circular 20/2022/TT-BYT list itself, with each cancer medicine's payment rate, was not read; the 60% rate for trastuzumab is quoted from a 2024 paper. The annex of Circular 01/2025/TT-BYT could not be downloaded (the provincial social security site reset the connection, and no archived copy existed), so which cancers are among the 62 diseases is reported only through SGGP's interviews. Breast screening counts by programme were not found.",
      links: [
        { label: "Decision 358/QD-BYT (PDF, Vietnamese)", url: QD358 },
        { label: "SGGP, 3 January 2025 (Vietnamese)", url: SGGP_REFERRAL_2025 },
      ],
    },
    {
      id: "approval-times",
      title: "No published approval or listing times for cancer medicines in Viet Nam",
      plain:
        "The registration rules set maximum processing times, but OnCo found no published figure for how long cancer medicines actually take to be registered in Viet Nam, or how long after registration they reach the insurance list, which had not been fully updated since 2022.",
      detail:
        "The 12-month, 9-month and 6-month figures on this page are limits in Circular 32/2026/TT-BYT, which came into force on 1 October 2026, not measured times; OnCo found no Drug Administration report of median approval times by therapeutic area. Industry surveys of time to availability in Asia were not used as a source. The insurance list is reviewed at least every two years under Circular 37/2024/TT-BYT, but Dan Tri described the 2026 draft as the largest update in eight years, and no signed circular adding the 30 proposed cancer medicines had been found by 4 November 2026.",
      links: [
        { label: "Circular 32/2026/TT-BYT (PDF, Vietnamese)", url: TT32 },
        { label: "SGGP, 26 September 2026 (Vietnamese)", url: SGGP_LIST_2026 },
      ],
    },
  ],
  institutions: ["moh-vietnam", "dav-vietnam", "vss-vietnam", "k-hospital-hanoi", "hcmc-oncology-hospital"],
  companies: ["gene-solutions"],
  drugs: ["trastuzumab", "trastuzumab-biosimilars", "spot-mas"],
  trials: [
    "himalaya", "emerald-1", "emerald-3", "nct03847428", "nct05883644", "nct06921785", "nct05317819", "nct06824064", "concur", "nct06467357",
    "nct04550260", "clarity-gastric01", "nct06731478", "nct06535607", "nct04940052", "flaura", "flaura2", "laura", "adaura", "pacific",
    "adriatic", "nct04606771", "tropion-breast05", "capitello-281", "niagara", "nct04075292", "k-detek", "k-accelerate",
  ],
  papers: [
    "paper-huong-hanoi-breast-incidence-trends-jco-go-2025", "paper-liu-hanoi-head-neck-incidence-trends-jco-go-2026",
    "paper-nguyen-trastuzumab-adjuvant-cea-vietnam-plos-one-2024", "paper-toan-vietnam-cervical-screening-steps-jcpo-2026",
    "paper-spot-mas-k-detek-bmc-med-2025",
  ],
  people: ["le-van-quang", "diep-bao-tuan"],
  how:
    "Every card was written from Vietnamese sources read in Vietnamese from their raw text: Law No. 51/2024/QH15 on health insurance, Circulars 37/2024/TT-BYT and 32/2026/TT-BYT, Decision 358/QD-BYT with the 2026 to 2035 breast and cervical cancer plan, Politburo Resolution 72-NQ/TW, the Ministry of Justice's introduction to the 2024 pharmacy law, K Hospital's and Ho Chi Minh City Oncology Hospital's own pages, and Vietnamese newspapers quoting the Ministry of Health and Vietnam Social Security by name, used because their own sites could not be reached. Registry figures come from the Hanoi and Ho Chi Minh City registries' published analyses; papers were resolved through Europe PMC and their abstracts read. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph. The new records for this page are the Ministry of Health, the Drug Administration, Vietnam Social Security and four papers; the hospitals, company, test, trials and people were already in OnCo.",
  verify:
    "National incidence and mortality are IARC's modelled estimates, and the registry figures cover two cities. Insurance benefit levels are those of the amended law in force from 1 July 2025, and the medicines list was under revision when this page was written, so a medicine's payment rate may have changed. Registration times are maximums in the rules, not measured times. Before relying on whether a cancer medicine is paid for, check the current list with the hospital's insurance desk or Vietnam Social Security.",
  verifyLinks: [
    { label: "Ministry of Health (Vietnamese)", url: "https://moh.gov.vn" },
    { label: "Vietnam Social Security (Vietnamese)", url: "https://baohiemxahoi.gov.vn" },
    { label: "Drug Administration of Vietnam (Vietnamese)", url: "https://dav.gov.vn" },
    { label: "IARC Global Cancer Observatory", url: "https://gco.iarc.who.int/today" },
  ],
};
