import type { CountryDive } from "@/data/country-dive";

/**
 * Taiwan deep dive: the hand-written cards for /countries/tw/ (wave 4). Taiwanese sources were read in Chinese from
 * their raw text (pdftotext of each PDF, the HTML of each page), not from a summary: the Health Promotion
 * Administration's Cancer Registry Annual Report 2023 (published December 2025), the Ministry of Health and Welfare's
 * analysis of 2025 causes of death (June 2026), the Cancer Control Act and the National Health Insurance Act on the
 * Ministry of Justice's law database, the HPA's screening pages and 2023 screening dashboard, Ministry press releases
 * from the HPA, the National Health Insurance Administration and the TFDA, the TFDA's processing-time table of
 * 3 March 2026 (republished by Rootlaw), the Center for Drug Evaluation's 2025 annual report and HTA pages, the HPA's
 * hepatitis and liver cancer plan for 2026 to 2030, and the National Health Research Institutes' cancer pages.
 * IARC's GLOBOCAN file in OnCo has no entry for Taiwan, so the page uses the national registry instead. nhi.gov.tw
 * refused automated requests; the gaps say what that left unread.
 */
const TCR_2023 = "https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=269&pid=19733";
const TCR_LIST = "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=269";
const DEATHS_2025 = "https://www.mohw.gov.tw/dl-100895-54a44151-2be8-48d7-a1b7-6914bb0ad75d.html";
const DEATHS_2025_PRESS = "https://www.mohw.gov.tw/dl-100896-73bd5dff-71ba-439d-8ee3-87ebf2789912.html";
const DEATHS_LIST = "https://dep.mohw.gov.tw/DOS/lp-5069-113.html";
const CCA = "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070008";
const CCA_HISTORY = "https://law.moj.gov.tw/LawClass/LawHistory.aspx?pcode=L0070008";
const NHI_ACT = "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0060001";
const CATASTROPHIC_2013 = "https://www.mohw.gov.tw/cp-16-22701-1.html";
const CATASTROPHIC_STATS = "https://www.mohw.gov.tw/cp-16-21777-1.html";
const LISTING_2023 = "https://www.mohw.gov.tw/cp-16-76843-1.html";
const CANCER_FUND_2025 = "https://www.mohw.gov.tw/cp-16-82614-1.html";
const IO_2025 = "https://www.mohw.gov.tw/cp-16-82268-1.html";
const NGS_2026 = "https://www.mohw.gov.tw/cp-16-86349-1.html";
const CDE_HTA = "https://www.cde.org.tw/hta/";
const CDE_AR_2025 = "https://www.cde.org.tw/aboutcde/1416/2127/2138/76727/normalPost";
const TFDA_DEADLINES = "https://www.rootlaw.com.tw/Attach/S-Doc/01611503030015-001.pdf";
const TFDA_2021 = "https://www.mohw.gov.tw/cp-16-70394-1.html";
const TFDA_2015 = "https://www.fda.gov.tw/Tc/newsContent.aspx?cid=4&id=19542";
const SCREENING = "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=211";
const EXPAND_2025 = "https://www.mohw.gov.tw/cp-16-80948-1.html";
const LDCT_2025 = "https://www.mohw.gov.tw/cp-16-82095-1.html";
const DASHBOARD_2023 = "https://www.hpa.gov.tw/Pages/ashx/GetFile.ashx?lang=c&type=1&sid=76636fa1614741e488960edce241ffba";
const TALENT = "https://doi.org/10.1016/s2213-2600(23)00338-7";
const LIVER_PLAN = "https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=616&pid=19687";
const BETEL_HPA = "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=204";
const BETEL_2017 = "https://www.mohw.gov.tw/cp-16-38688-1.html";
const NICR_BETEL = "https://nicr.nhri.edu.tw/10912press/";
const TCOG = "https://www.nhri.edu.tw/Research/more?id=03d3e6d70ff044768388af407c30fad7";
const SURVIVAL = "https://twcr.tw/?page_id=1804";

export const TW_DIVE: CountryDive = {
  iso2: "TW",
  iso3: "TWN",
  name: "Taiwan",
  flag: "🇹🇼",
  asOf: "2026-11-04",
  title: "Cancer in Taiwan",
  description:
    "Cancer in Taiwan from Taiwanese sources: the national cancer registry's 138,051 new invasive cancers in 2023 and 54,838 cancer deaths in 2025, the absence of a separate entry for Taiwan in IARC's GLOBOCAN, National Health Insurance and the catastrophic illness certificate that removes co-payments for cancer, the 2025 fund for new cancer medicines, health technology assessment at the Center for Drug Evaluation, the TFDA's 360-day review clock, funded screening, now six programmes, including low-dose CT for never-smokers with a family history of lung cancer, and the hepatitis B vaccination that began in 1984.",
  lede:
    "Taiwan counts the cancers diagnosed in its hospitals of 50 or more beds through a national registry that has run since 1979: 138,051 new invasive cancers in 2023, with lung, bowel and breast cancer the commonest, and cancer has been the leading cause of death since 1982. Taiwan has one compulsory National Health Insurance scheme, in force since 1995, in which a cancer that needs active treatment brings a certificate that removes the patient's co-payments for it.",
  globocanNote:
    "IARC's GLOBOCAN 2024, as held in OnCo (187 countries), publishes no separate estimate for Taiwan, so this page has no GLOBOCAN table. The figures here are Taiwan's own: the Taiwan Cancer Registry's count of 138,051 new invasive cancers in 2023 (age-standardised rate 331.29 per 100,000 on the 2000 world standard) and the Ministry of Health and Welfare's count of 54,838 cancer deaths in 2025. Both are counts of registered cases and certified deaths, not modelled estimates.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Taiwan",
      aside: { label: "HPA: Cancer Registry Annual Report 2023 (PDF, Chinese)", url: TCR_2023 },
      cards: [
        {
          id: "no-globocan",
          title: "IARC's GLOBOCAN has no separate figure for Taiwan, so this page uses Taiwan's own registry",
          plain:
            "Most country pages in OnCo show IARC's GLOBOCAN estimates beside the national figures. GLOBOCAN publishes no separate estimate for Taiwan, so there is no GLOBOCAN table here. Taiwan's own registry and death statistics are counts rather than models, and they are the figures used throughout this page.",
          detail:
            "OnCo's copy of GLOBOCAN 2024 covers 187 countries and has no entry for Taiwan. In its place this page uses two national sources, both read in Chinese. The Health Promotion Administration's Cancer Registry Annual Report 2023, published in December 2025, counts 138,051 new invasive cancers diagnosed in 2023, an age-standardised rate of 331.29 per 100,000 on the 2000 world standard (298.99 on the 1976 world standard, which the report also gives), and 15,609 in situ cancers. The Ministry of Health and Welfare's cause-of-death statistics count 54,838 cancer deaths in 2025, 27.5% of all deaths, an age-standardised rate of 111.5 per 100,000 against 113.3 in 2024. Because both are counts of people, they can be compared with GLOBOCAN's figures for other countries only with care: GLOBOCAN's are modelled for a single year and the registry's include only people with Taiwanese nationality diagnosed in hospitals with 50 or more beds.",
          links: [
            { label: "HPA: Cancer Registry Annual Report 2023 (PDF, Chinese)", url: TCR_2023 },
            { label: "Ministry of Health and Welfare: 2025 cause-of-death analysis (PDF, Chinese)", url: DEATHS_2025 },
            { label: "IARC Global Cancer Observatory", url: "https://gco.iarc.who.int" },
          ],
        },
        {
          id: "shape",
          title: "138,051 new invasive cancers in 2023, with lung, bowel and breast cancer the commonest",
          plain:
            "Taiwan's registry counted 138,051 new invasive cancers in 2023, 5.95% more than in 2022. Lung cancer and bowel cancer each had about 19,000 to 20,000 cases, breast cancer about 17,800 in women, then liver, prostate and mouth and throat cancers. Lung cancer cases rose by 2,004 (11.14%) in one year, the largest increase in number of any cancer.",
          detail:
            "The 2023 report counts 71,244 cancers in men and 66,807 in women, with median ages at diagnosis of 67 and 63. The commonest by number were lung, bronchus and trachea (19,986), colon, rectum and anus (19,074), female breast (17,779), liver and intrahepatic bile ducts (10,449), prostate (9,985) and cancers of the mouth, oropharynx and hypopharynx (8,522). In men, cancers of the mouth and throat were fourth by rate (7,641 cases), at ten times the rate in women; in women, thyroid cancer was fourth (4,538). The cancers with the largest rises from 2022 were lung (up 2,004 to 19,986), colorectum (up 1,431) and prostate (up 923). The registry recorded 3,641 in situ breast cancers and 2,671 in situ cervical cancers, against 1,429 invasive cervical cancers. In the same year, according to the report, 53,126 people died of cancer, 25.84% of all deaths.",
          links: [
            { label: "HPA: Cancer Registry Annual Report 2023, pages xix and 2 to 5 (PDF, Chinese)", url: TCR_2023 },
            { label: "HPA: cancer registry reports, all years (Chinese)", url: TCR_LIST },
          ],
        },
        {
          id: "registry",
          title: "How Taiwan counts: hospitals report every new cancer, and the law requires them to",
          plain:
            "Since 1979 every hospital in Taiwan with 50 or more beds has reported each new cancer to a national registry. The Cancer Control Act of 2003 made reporting a legal duty with fines. Hospitals taking part in the long form also send detailed records with stage, treatment, genetic test results and smoking and betel quid habits for 17 cancers.",
          detail:
            "The 2023 report analyses cases filed by 199 hospitals with 50 or more beds up to 1 April 2025. Hospitals file quarterly and must report within 12 months of diagnosis. The registry received 178,638 reports of invasive cancer for 2023 and, after removing duplicates and applying IARC's rules for multiple primary cancers, counted 138,051 (22.72% fewer). From 2002 hospitals began a long form for six cancers, now 17 with pancreas added in 2022, which carries stage, first treatment, recurrence and site-specific factors such as EGFR and ALK in lung cancer and HER2 in breast cancer; since 2011 both the long and the short form also record smoking, betel quid chewing, alcohol and body mass index. Missing cases are chased against death records, the national insurance file of catastrophic illness certificates and the screening files, and completeness was estimated at 98% from 2012. In 2023, 0.67% of cases were known only from a death certificate and 95.32% were confirmed under the microscope. Article 11 of the Cancer Control Act requires cancer hospitals to report, and Article 17 fines a hospital NT$10,000 to NT$50,000 if it does not report by the deadline set.",
          links: [
            { label: "HPA: Cancer Registry Annual Report 2023, foreword (PDF, Chinese)", url: TCR_2023 },
            { label: "Cancer Control Act, Articles 11 and 17 (Chinese)", url: CCA },
          ],
        },
        {
          id: "deaths-2025",
          title: "54,838 cancer deaths in 2025, more than a quarter of all deaths, with the age-standardised rate still falling",
          plain:
            "Cancer has been Taiwan's leading cause of death since 1982. In 2025, 54,838 people died of cancer, 27.5% of all deaths. Because the population is ageing the number keeps rising, but the age-standardised death rate fell to 111.5 per 100,000 from 113.3 in 2024. Lung cancer causes the most deaths, then liver and bowel cancer.",
          detail:
            "The Ministry of Health and Welfare's analysis of 2025 deaths, published on 22 June 2026, counts 32,537 cancer deaths in men and 22,301 in women, a median age at death of 71, and 37,918 deaths at 65 or older, 32.4% more than in 2015, against 16,920 under 65, 9.6% fewer. Over the last ten years the age-standardised cancer death rate fell by 1.5% a year on average. The ten cancers with the highest death rates were lung (10,831 deaths), liver (7,601), colorectum (7,146), female breast (3,116), prostate (1,895), mouth (3,697), pancreas (3,204), stomach (2,225), oesophagus (1,981) and ovary (899). Among them, only lung, pancreatic and ovarian cancer had higher age-standardised death rates than in 2024. Among the cancers that can be screened for, cervical cancer deaths also rose on that measure. Mouth, oesophageal and ovarian cancer killed at a median age of 64, seven years younger than cancer as a whole.",
          links: [
            { label: "Ministry of Health and Welfare: 2025 cause-of-death analysis with tables (PDF, Chinese)", url: DEATHS_2025 },
            { label: "Ministry of Health and Welfare: cause-of-death statistics, all years (Chinese)", url: DEATHS_LIST },
          ],
        },
      ],
      tables: [
        {
          id: "tcr-2023",
          title: "New invasive cancers and cancer deaths in Taiwan, 2023, by site",
          caption: "Registered new invasive cancers and deaths in 2023, both sexes, with age-standardised rates per 100,000 on the 2000 world standard, from the Cancer Registry Annual Report 2023.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "asr", label: "Incidence rate", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "mort", label: "Death rate", numeric: true },
          ],
          rows: [
            { site: "All invasive cancers", cases: 138051, asr: 331.29, deaths: 53126, mort: 113.66 },
            { site: "Lung, bronchus and trachea", cases: 19986, asr: 44.89, deaths: 10348, mort: 21.27 },
            { site: "Colon, rectum and anus", cases: 19074, asr: 43.09, deaths: 6791, mort: 14.0 },
            { site: "Breast, women (rates per 100,000 women)", cases: 17779, asr: 91.2, deaths: 2972, mort: 13.16 },
            { site: "Liver and intrahepatic bile ducts", cases: 10449, asr: 22.75, deaths: 7724, mort: 16.08 },
            { site: "Prostate (rates per 100,000 men)", cases: 9985, asr: 43.91, deaths: 1815, mort: 7.59 },
            { site: "Mouth, oropharynx and hypopharynx", cases: 8522, asr: 21.17, deaths: 3610, mort: 8.53 },
            { site: "Thyroid", cases: 6045, asr: 18.91, deaths: 225, mort: null },
            { site: "Stomach", cases: 4518, asr: 9.78, deaths: 2327, mort: 4.79 },
            { site: "Corpus uteri (rates per 100,000 women)", cases: 3690, asr: 19.26, deaths: 535, mort: 2.34 },
            { site: "Pancreas", cases: 3427, asr: 7.53, deaths: 2879, mort: 6.07 },
            { site: "Oesophagus", cases: 3000, asr: 7.18, deaths: 2064, mort: 4.8 },
            { site: "Ovary, fallopian tube and broad ligament (rates per 100,000 women)", cases: 1943, asr: 10.82, deaths: 751, mort: 3.41 },
          ],
          note: "Counts of people with Taiwanese nationality newly diagnosed in 2023, as reported by 199 hospitals with 50 or more beds; in situ cancers are excluded. Deaths are the registry report's own figures for the same year, coded to ICD-10. Incidence rates for the pancreas and the oesophagus, which are outside the ten leading sites, come from the report's table of incidence by site. For thyroid cancer the report's summary gives the death rate only for each sex (0.39 per 100,000 men and 0.50 per 100,000 women), so that cell is empty rather than calculated by OnCo.",
          sources: [{ label: "HPA: Cancer Registry Annual Report 2023, pages 2 to 5, site pages and the table of incidence by site (PDF, Chinese)", url: TCR_2023 }],
        },
        {
          id: "deaths-2025-table",
          title: "The ten cancers with the highest death rates in Taiwan, 2025",
          caption: "Deaths registered in 2025, crude rate per 100,000 people and age-standardised rate per 100,000 on the 2000 world standard, from the Ministry of Health and Welfare's cause-of-death statistics.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "crude", label: "Crude rate", numeric: true },
            { key: "asr", label: "Age-standardised rate", numeric: true },
          ],
          rows: [
            { site: "All cancers", deaths: 54838, crude: 234.9, asr: 111.5 },
            { site: "Trachea, bronchus and lung", deaths: 10831, crude: 46.4, asr: 21.3 },
            { site: "Liver and intrahepatic bile ducts", deaths: 7601, crude: 32.6, asr: 14.8 },
            { site: "Colon, rectum and anus", deaths: 7146, crude: 30.6, asr: 14.2 },
            { site: "Breast, women (rates per 100,000 women)", deaths: 3116, crude: 26.3, asr: 13.1 },
            { site: "Prostate (rates per 100,000 men)", deaths: 1895, crude: 16.5, asr: 7.5 },
            { site: "Mouth", deaths: 3697, crude: 15.8, asr: 8.3 },
            { site: "Pancreas", deaths: 3204, crude: 13.7, asr: 6.3 },
            { site: "Stomach", deaths: 2225, crude: 9.5, asr: 4.3 },
            { site: "Oesophagus", deaths: 1981, crude: 8.5, asr: 4.4 },
            { site: "Ovary (rates per 100,000 women)", deaths: 899, crude: 7.6, asr: 3.9 },
          ],
          note: "Ranked by crude rate, as the Ministry ranks them. These are the Ministry's 2025 figures; the registry's own report for 2025 diagnoses is not yet published, so the two tables on this page cover different years.",
          sources: [{ label: "Ministry of Health and Welfare: 2025 cause-of-death analysis, Table 4 (PDF, Chinese)", url: DEATHS_2025 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one compulsory insurance, with co-payments removed for cancer",
      aside: { label: "National Health Insurance Act (Ministry of Justice law database, Chinese)", url: NHI_ACT },
      cards: [
        {
          id: "nhi",
          title: "National Health Insurance since 1995, and a catastrophic illness certificate for cancer",
          plain:
            "Taiwan's National Health Insurance is a compulsory social insurance run by a single payer, in force since 1 March 1995. Patients usually pay part of each bill, but someone whose cancer needs active or long-term treatment can get a catastrophic illness certificate, and while it is valid they pay no co-payment for care of that cancer. Certificates for cancer last five years and can be renewed.",
          detail:
            "Under the National Health Insurance Act, patients pay 20% of outpatient costs, or 30%, 40% and 50% at district hospitals, regional hospitals and medical centres if they go without a referral (Article 43), and 5% to 30% of inpatient costs depending on the ward and the length of stay (Article 47). Article 48 exempts people with a catastrophic illness (重大傷病) from both. Cancer needing active or long-term treatment is one such illness. Certificates for cancer were permanent when the scheme began; since 2002 they last five years, and in December 2013 the insurer explained that renewal depends on the treating doctor showing the cancer still needs active or long-term treatment, and that people whose certificate lapses still have follow-up tests covered with only the basic co-payment. At the end of 2013, 923,396 people held a certificate, 3.94% of the insured, and cancer accounted for 482,949 of the 986,287 certificates in force (49.0%); certificate holders used 28% of the insurance's medical spending. OnCo could not read a more recent count (see gaps).",
          links: [
            { label: "National Health Insurance Act, Articles 43, 47 and 48 (Chinese)", url: NHI_ACT },
            { label: "NHIA: renewing cancer certificates, 25 December 2013 (Chinese)", url: CATASTROPHIC_2013 },
            { label: "NHIA: catastrophic illness statistics for 2013, 8 July 2014 (Chinese)", url: CATASTROPHIC_STATS },
          ],
        },
        {
          id: "cancer-drug-fund",
          title: "Since 2025, a separate fund pays for new cancer medicines while their value is reassessed",
          plain:
            "From 1 January 2025 the government added NT$5 billion of public money to the insurance fund to pay temporarily for new cancer medicines that the insurance's fixed budget could not yet afford. Medicines paid this way must have their benefit reassessed. In April 2025 the fund was used to widen coverage of the immunotherapy medicines pembrolizumab and atezolizumab, in lung, bowel and breast cancer.",
          detail:
            "The National Health Insurance Administration published the operating rules for the cancer medicine temporary payment fund (癌症新藥暫時性支付專款) on 25 February 2025. They cover cancer medicines or new indications with a Taiwanese licence and clear evidence of benefit that the global budget has not yet listed, and other cases the administration judges necessary. In April 2025 its drug-listing committee agreed to use the fund to widen pembrolizumab to first-line non-squamous non-small cell lung cancer, first-line MSI-high or mismatch-repair-deficient metastatic colorectal cancer and early triple-negative breast cancer, and to widen atezolizumab, which the release discusses under non-small cell lung cancer without setting out its new indication, for about 3,400 patients at an estimated NT$3.295 billion a year before the companies' repayments under their payment agreements. Selumetinib for children with plexiform neurofibromas and elranatamab and teclistamab for myeloma after four lines of treatment were also paid from it. In May 2025 the administration held a workshop with England's NICE on its Cancer Drugs Fund and managed access agreements, to refine Taiwan's fund. Since 2023 it has also paid temporarily for medicines given accelerated approval, and since January 2024 companies can apply for reimbursement while the TFDA is still reviewing the licence; when it announced the route, the insurer estimated that qualifying medicines would be listed within six months of the licence.",
          links: [
            { label: "NHIA: the cancer medicine temporary payment fund and NICE workshop, 28 May 2025 (Chinese)", url: CANCER_FUND_2025 },
            { label: "NHIA: immunotherapy coverage widened, 24 April 2025 (Chinese)", url: IO_2025 },
            { label: "NHIA: faster listing of new medicines, 4 December 2023 (Chinese)", url: LISTING_2023 },
          ],
        },
        {
          id: "ngs",
          title: "Tumour gene sequencing paid for by the insurance since May 2024",
          plain:
            "Since May 2024 National Health Insurance has paid for next-generation sequencing of solid tumours and blood cancers, to find the gene changes that decide which targeted medicines a patient can have. By February 2026, 62 hospitals had claimed for it, matched to 27 cancer medicines in 10 cancers, and 5,700 people had benefited.",
          detail:
            "The administration reported in May 2026 that it had committed NT$300 million to sequencing panels for solid tumours and blood cancers since May 2024. In October 2025 it began a project to collect the results in the international FHIR standard, with the National Health Research Institutes presenting the data format and Linkou Chang Gung and Shin Kong hospitals among the hospitals testing the upload. Prior authorisation of cancer medicines can now also be filed as structured electronic records: by April 2026, 81 hospitals took part and 35 filed in FHIR format. Over the previous three months, liver cancer medicines had the highest share of prior-review requests filed in FHIR format (29%), then colorectal cancer medicines (24%). The registry's long form already records site-specific genetic results such as EGFR and ALK in lung cancer and RAS and BRAF in colorectal cancer, so test results and outcomes can in principle be linked.",
          links: [
            { label: "NHIA: NGS reimbursement and FHIR data collection, 14 May 2026 (Chinese)", url: NGS_2026 },
            { label: "HPA: Cancer Registry Annual Report 2023, site-specific factors (PDF, Chinese)", url: TCR_2023 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Taiwan decides which cancer medicines the insurance pays for",
      aside: { label: "CDE: health technology assessment (Chinese)", url: CDE_HTA },
      cards: [
        {
          id: "joint-committee",
          title: "A joint committee of payers, providers and experts lists medicines, and patient groups may speak",
          plain:
            "The insurance pays for a medicine once a joint committee agrees its listing and price and the Ministry approves. The committee includes the insurer, experts, people who pay the premiums, employers and hospitals and doctors. Companies and patient groups can be invited to give their views, and any health technology assessment must be published before the decision.",
          detail:
            "Article 41 of the National Health Insurance Act sets up the joint drafting meeting (共同擬訂會議) for medicines, made up of representatives of the insurer, relevant agencies, experts, the insured, employers and healthcare providers, which may invite manufacturers and patient groups to express views; its minutes and members' declarations of interest must be published, and so must the result of any health technology assessment before the decision. Article 42 lets the insurer commission an assessment that weighs health, medical ethics, cost-effectiveness and the insurance's finances, and requires prior approval before use of medicines that are high-risk, expensive or open to misuse; the insurer's prior review of cancer medicines rests on this. In 2023 the insurer listed 31 new medicines, 8 of them for cancer, and widened 24, 11 of them for cancer, with spending of about NT$11.3 billion; it estimated the saving for a patient on a new cancer medicine at about NT$3.51 million a year. In 2024 it set up the Center for Health Policy and Technology Assessment, which it plans to make an independent public body.",
          links: [
            { label: "National Health Insurance Act, Articles 41 and 42 (Chinese)", url: NHI_ACT },
            { label: "NHIA: faster listing of new medicines, 4 December 2023 (Chinese)", url: LISTING_2023 },
            { label: "NHIA: plans for a national HTA centre, 28 May 2025 (Chinese)", url: CANCER_FUND_2025 },
          ],
        },
        {
          id: "cde-hta",
          title: "Health technology assessment in 42 days at the Center for Drug Evaluation",
          plain:
            "Since 2008 the Center for Drug Evaluation, a foundation set up by the health ministry, has assessed the clinical and economic value of new medicines for the insurer. An assessment is required for an expensive new medicine for a serious illness, and the report is due within 42 days. In 2025 it completed 203 assessments of new medicines.",
          detail:
            "The CDE's history of its HTA work says the insurer first considered formal assessment in 2000, a working group began in August 2007 and its Division of Health Technology Assessment opened on 1 April 2008; its reports are published in full. When the insurer receives a listing request, the CDE accepts the case within 2 days and replies within 42. The insurer's manual requires an assessment for a new medicine that treats a catastrophic illness or has a new mechanism of action and is forecast to cost more than NT$100 million in any of its first five years, and for a wider indication of such a medicine forecast to cost more than NT$50 million in any year. Companies applying as a breakthrough medicine must show clear clinical improvement over current best treatment, and the application form asks for the HTA reports of the United Kingdom, Australia and Canada. In 2025 the CDE completed 58 assessments of breakthrough new medicines (38 of them new chemical entities), 145 of other new medicines and 12 of special materials, held 26 expert advisory meetings and 6 review meetings on reassessment plans for temporarily paid medicines. OnCo found no published cost-effectiveness threshold for Taiwan.",
          links: [
            { label: "CDE: health technology assessment, history and process (Chinese)", url: CDE_HTA },
            { label: "CDE: Annual Report 2025, section 4 (PDF, Chinese)", url: CDE_AR_2025 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the TFDA and its 360-day clock",
      aside: { label: "TFDA: processing-time table, 3 March 2026 (as republished by Rootlaw, PDF)", url: TFDA_DEADLINES },
      cards: [
        {
          id: "tfda-routes",
          title: "360 calendar days for a new medicine, and faster routes for urgent ones",
          plain:
            "The Taiwan Food and Drug Administration registers medicines. Its legal processing time for a new chemical entity or biological medicine is 360 calendar days. Priority review, accelerated approval, breakthrough therapy and a route for children's and rare serious diseases can shorten it; the Ministry reported that these brought many 2021 reviews under 240 days. These are processing limits, not measured approval times.",
          detail:
            "The TFDA's table of processing times, amended on 3 March 2026, gives 360 calendar days for a new chemical entity, including botanical new drugs, or a biological product: 30 days to classify and assign the file, 300 for filing and review meetings, advisory committee discussion and labelling review, and 30 to close. Orphan medicines also have 360 days; a new indication, route or combination with clinical data has 300. In July 2022 the Ministry reported 134 approvals of new drugs and new formulations in 2021 (125 imported, 9 made in Taiwan), and gave the case of a targeted cancer medicine approved under the rare serious disease scheme which made Taiwan, in its words, the first country in Asia to approve it after the US FDA. The TFDA's 2015 review gives a median of 171 days for its 15 priority reviews that year. The technical reviews are done by the Center for Drug Evaluation, which in 2025 completed 141 new drug applications, 38 of them antineoplastic or immunomodulating medicines; 29 qualified for at least one expedited route. The TFDA was formed on 1 January 2010 and became part of the Ministry of Health and Welfare on 23 July 2013.",
          links: [
            { label: "TFDA: processing-time table, 3 March 2026 (as republished by Rootlaw, PDF, Chinese)", url: TFDA_DEADLINES },
            { label: "Ministry of Health and Welfare: TFDA accelerated review and 2021 approvals, 6 July 2022 (Chinese)", url: TFDA_2021 },
            { label: "TFDA: review of 2015 new drug approvals, 27 January 2016 (Chinese)", url: TFDA_2015 },
            { label: "CDE: Annual Report 2025, new drug applications (PDF, Chinese)", url: CDE_AR_2025 },
          ],
        },
        {
          id: "licence-then-listing",
          title: "A licence is the first step; insurance listing is the second",
          plain:
            "A TFDA licence does not by itself mean that National Health Insurance pays for a cancer medicine: listing is a separate decision. Since 2024 a company can ask for listing during the licence review. OnCo found no published measure of how long cancer medicines take to reach patients after approval in Taiwan.",
          detail:
            "The insurer's parallel submission route, open since January 2024, lets a company apply for reimbursement while the TFDA is reviewing the licence; it applies to medicines the TFDA has given priority review, accelerated approval, breakthrough or rare serious disease status, medicines not yet marketed anywhere, new medicines made in Taiwan within two years of their first approval abroad, new ingredients developed and made in Taiwan, and new technologies better and cheaper than those listed. When it announced the route in December 2023, the insurer estimated that these medicines would be listed within six months of the licence. The CDE completed 19 eligibility checks for parallel submission in 2025. Neither the TFDA nor the insurer publishes a median time from licence to listing for cancer medicines that OnCo could find; industry surveys of drug lag were not used as a source.",
          links: [
            { label: "NHIA: parallel submission from 2024, 4 December 2023 (Chinese)", url: LISTING_2023 },
            { label: "CDE: Annual Report 2025 (PDF, Chinese)", url: CDE_AR_2025 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: six funded screenings, including lung cancer in never-smokers",
      aside: { label: "HPA: the five funded cancer screenings (Chinese)", url: SCREENING },
      cards: [
        {
          id: "five-screenings",
          title: "Breast, cervical, bowel and mouth screening since 2010, lung screening since 2022, widened in 2025",
          plain:
            "Taiwan pays for screening for five cancers: mammography every two years for women aged 40 to 74; cervical smears from 25, with an HPV test at 35, 45 and 65; a home stool test every two years from 45 to 74; a mouth examination every two years for people who chew betel quid or smoke; and low-dose CT of the chest for people at high risk of lung cancer. From 2026 a one-off stool test for Helicobacter pylori, aimed at stomach cancer, is added for people aged 45 to 74.",
          detail:
            "The Health Promotion Administration's screening page lists the current offer: mammography for women aged 40 to 74 every two years; a cervical smear every three years for women aged 25 to 29 and once a year from 30 (at least every three years recommended); a faecal immunochemical test every two years from 45 to under 75, and from 40 to 44 for people whose parent, sibling or child had bowel cancer; an oral mucosal examination every two years for people aged 30 or over who chew betel quid (including former chewers) or smoke, and for indigenous people from 18 who chew betel quid; and low-dose CT. The four older screenings have run nationwide since 2010. The widening from 1 January 2025 added women aged 40 to 44 and 70 to 74 to mammography, people aged 45 to 49 to bowel screening, women aged 25 to 29 to cervical smears and a one-off HPV test at 35, 45 and 65, as part of the government's goal of cutting the age-standardised cancer death rate by a third by 2030. The Ministry's June 2026 release on causes of death adds a sixth programme from 2026: a once-in-a-lifetime stool antigen test for Helicobacter pylori, aimed at stomach cancer, for people aged 45 to 74. The HPA states that in 2023 the five screenings were done 4.872 million times and found about 11,000 cancers and 52,000 precancerous lesions. The HPA pays for them from its Tobacco Hazards Prevention and Health Protection Fund; Article 13 of the Cancer Control Act allows screening to be funded from the tobacco health and welfare surcharge.",
          links: [
            { label: "HPA: the five funded cancer screenings (Chinese)", url: SCREENING },
            { label: "Ministry of Health and Welfare: screening widened from 2025, 24 December 2024 (Chinese)", url: EXPAND_2025 },
            { label: "Cancer Control Act, Article 13 (Chinese)", url: CCA },
            { label: "Ministry of Health and Welfare: 2025 causes of death, news release with slides, 22 June 2026 (PDF, Chinese)", url: DEATHS_2025_PRESS },
          ],
        },
        {
          id: "ldct",
          title: "Lung screening for never-smokers with a family history, not only for heavy smokers",
          plain:
            "Taiwan began low-dose CT lung screening on 1 July 2022. Since 2025 it is offered every two years to heavy smokers aged 50 to 74, and to men aged 45 to 74 and women aged 40 to 74 whose parent, sibling or child had lung cancer, whether or not they smoke. To the end of 2024, 158,937 people were screened and 1,957 lung cancers found, 83% of them at stage 0 or 1.",
          detail:
            "The family-history group comes from TALENT, a Taiwanese study of 12,011 never-smokers aged 55 to 75 that found lung cancer in 2.6% at the first scan, 77.4% of it stage I, and more invasive cancer in people with a family history (2.7% against 1.6%); its authors warn that some of the early cancers found may be overdiagnosis. The 2025 widening lowered the family-history ages by five years. The smoking criterion follows the US Preventive Services Task Force: since 2025, 20 pack-years or more, for people still smoking or who quit less than 15 years ago. The Ministry's April 2025 release gives the stage at diagnosis for all lung cancers diagnosed in 2022: 6.2% stage 0, 32.3% stage 1, 3.7% stage 2, 10.4% stage 3 and 47.7% stage 4. Among the 1,957 cancers found by screening to the end of 2024, 1,621 (83%) were stage 0 or 1. The HPA notes that screening finds lung cancer early but does not prevent it, and that stopping smoking remains the main prevention.",
          links: [
            { label: "Ministry of Health and Welfare: lung screening results, 8 April 2025 (Chinese)", url: LDCT_2025 },
            { label: "Chang et al., TALENT (Lancet Respir Med 2024)", url: TALENT },
            { label: "Ministry of Health and Welfare: screening widened from 2025 (Chinese)", url: EXPAND_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "screening-2023",
          title: "People screened in 2023 under the HPA's programmes",
          caption: "People screened in 2023 and the number with a positive or abnormal result, from the HPA's 2023 screening dashboard, with the ages then in force; low-dose CT is the cumulative count from July 2022 to December 2024.",
          columns: [
            { key: "test", label: "Programme" },
            { key: "ages", label: "Ages screened" },
            { key: "screened", label: "People screened", numeric: true },
            { key: "positive", label: "Positive results", numeric: true },
          ],
          rows: [
            { test: "Faecal immunochemical test, every two years", ages: "50 to 75 in 2023", screened: 1292834, positive: 72341 },
            { test: "Mammography, every two years", ages: "45 to 70 in 2023", screened: 922911, positive: 79230 },
            { test: "Cervical smear", ages: "30 and over in 2023", screened: 2147659, positive: 46642 },
            { test: "Low-dose CT, July 2022 to December 2024 (lung cancers found)", ages: "High risk only", screened: 158937, positive: 1957 },
          ],
          note: "Counts of people screened, not coverage of the eligible population, which the dashboard does not give. A positive mammogram includes BI-RADS 0 (needs more imaging). For smears, the dashboard's note defines its positive rate as LSIL or worse, while its chart of positive results also shows ASCUS, so it is not certain which of the two the count of 46,642 uses. The LDCT row counts cancers found, not positive scans. Oral screening counts were not in the dashboard read.",
          sources: [
            { label: "HPA: 2023 bowel, breast and cervical screening dashboard (PDF, Chinese)", url: DASHBOARD_2023 },
            { label: "Ministry of Health and Welfare: lung screening results, 8 April 2025 (Chinese)", url: LDCT_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Taiwan does",
      title: "What Taiwan does that others do not",
      cards: [
        {
          id: "hbv-vaccine",
          title: "Hepatitis B vaccination of every newborn since 1986, to prevent liver cancer",
          plain:
            "In July 1984 Taiwan began vaccinating babies against hepatitis B, starting with babies at high risk, and from July 1986 all newborns. The health ministry describes it as the first national infant hepatitis B vaccination in the world. Carriage in young children fell from more than 10% to under 1%, and liver cancer in children fell.",
          detail:
            "The Ministry of Health and Welfare's National Hepatitis and Liver Cancer Control Plan for 2026 to 2030, dated October 2025 and published by the HPA, states that hepatitis B carriage in children under six fell from 10.5% before the programme to under 0.8%, and that liver cancer in children aged 6 to 14 fell from 0.54 to 0.20 per 100,000. About 80% of people with liver cancer in Taiwan have chronic hepatitis B or C, according to the registry; the share of new liver cancers with hepatitis B or C fell from 74.2% in 2011 to 70.7% in 2022. In 2023, 91% of babies had their first dose within 24 hours of birth and 98% completed three doses. Since February 2018 the insurance pays for antiviral medicines in late pregnancy for highly infectious mothers to cut transmission further, and the national plan to eliminate hepatitis C, set in 2018, aimed to reach the World Health Organization's 2030 target by 2025. Liver cancer remains the second cause of cancer death, with 7,601 deaths in 2025.",
          links: [
            { label: "HPA: National Hepatitis and Liver Cancer Control Plan 2026 to 2030 (Chinese)", url: LIVER_PLAN },
            { label: "Ministry of Health and Welfare: 2025 cause-of-death analysis (PDF, Chinese)", url: DEATHS_2025 },
          ],
        },
        {
          id: "betel-quid",
          title: "Betel quid control and a government oral cancer screening for chewers",
          plain:
            "Chewing betel quid, which IARC classes as a cause of cancer, drives Taiwan's high rate of mouth cancer in men. Taiwan screens chewers and smokers with a mouth examination every two years. Betel chewing among men fell from 17.2% in 2007 to 8.4% in 2017, and mouth cancer incidence began to fall from 2014.",
          detail:
            "The HPA notes that IARC classed betel quid with tobacco as carcinogenic in 1987 and the areca nut itself in 2003, with Taiwanese scientists among those consulted. In the 2023 registry, cancers of the mouth, oropharynx and hypopharynx occurred in 7,641 men and 881 women, a tenfold difference in rate, at a median age of 60 in men against 67 for all cancers in men. The Ministry reported in 2017 that betel chewing among men aged 18 and over fell from 17.2% in 2007 to 8.4% in 2017; in 2020 the National Health Research Institutes and the HPA reported in Oral Oncology that it was below 7% by 2018 and that oral cancer incidence, after levelling off about two years after chewing began to fall, declined from 2014. The institutes call Taiwan's programme the only regular oral cancer screening run by a government. A study in BMJ Evidence-Based Medicine (2026) of all 92,342 men diagnosed from 2004 to 2022 found that early-stage diagnoses rose to 2013 and then fell as screening uptake dropped, late-stage incidence was stable from 2009 and oral cancer mortality rose from 14.4 to 16.6 per 100,000 men, and concluded that cutting betel quid and cigarette use should come first. Betel control and oral screening moved to the Ministry's Department of Oral Health in 2023.",
          links: [
            { label: "HPA: betel quid and oral cancer (Chinese)", url: BETEL_HPA },
            { label: "Ministry of Health and Welfare: 20 years of betel quid control, 30 November 2017 (Chinese)", url: BETEL_2017 },
            { label: "NHRI: betel quid chewing falls, 2020 (Chinese)", url: NICR_BETEL },
            { label: "Gao et al., oral cancer screening in Taiwan 2004 to 2022 (BMJ Evid Based Med)", url: "https://doi.org/10.1136/bmjebm-2024-113340" },
            { label: "Oral cancer screening programme in Taiwan (OnCo)", url: "/terms/screening-tw-oral/" },
          ],
        },
        {
          id: "cancer-control-act",
          title: "A cancer law that puts the Premier in charge and names a research institute",
          plain:
            "Taiwan's Cancer Control Act of 2003 requires a national cancer council chaired by the Premier that meets at least once a year, a policy committee under the health minister that meets every quarter, compulsory registry reporting, and a cancer research centre at the National Health Research Institutes. It also lets the tobacco surcharge pay for screening.",
          detail:
            "The act was promulgated on 21 May 2003 and last amended on 26 April 2023. Article 6 sets up the Central Cancer Control Council (中央癌症防治會報) under the Executive Yuan, convened by the Premier, meeting at least once a year. Article 8 sets up a cancer control policy committee of 18 to 24 unpaid members chaired by the health minister, at least half of them clinicians, researchers or civil society representatives, with no more than two thirds of one sex, meeting at least every quarter; under Article 7 the committee must seek the views of other experts, industry, and representatives of cancer patients and their families. Article 10 requires the National Health Research Institutes to run a cancer research centre for treatments, diagnostics and clinical trials, and Article 11 requires hospitals to report new cases, stage, treatment, screening follow-up and deaths. Article 14 obliges screening providers to call back people with a positive result. The Taiwan Cooperative Oncology Group, set up in 1989 and now part of the institutes, helped build the national cancer care quality certification and core measures for 13 cancers.",
          links: [
            { label: "Cancer Control Act, full text (Ministry of Justice law database, Chinese)", url: CCA },
            { label: "Cancer Control Act, legislative history (Chinese)", url: CCA_HISTORY },
            { label: "NHRI: Taiwan Cooperative Oncology Group (Chinese)", url: TCOG },
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
          id: "trials-in-taiwan",
          title: "810 trials in OnCo's records have a site in Taiwan, and 36 are run in Taiwan alone",
          plain:
            "Of the trials in OnCo's records, 810 list a site in Taiwan, most of them international phase 3 trials led by companies, with lung cancer the largest group. Thirty-six list Taiwan as their only country: early trials by Taiwanese biotech companies and hospital-led studies at National Taiwan University, Chang Gung and National Cheng Kung University hospitals.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph, and recounted on 17 November 2026: 810 trial records list Taiwan among their countries (two of them each hold two ClinicalTrials.gov registrations, which makes 812 registrations), 531 of them phase 3, 136 phase 2, 106 phase 1/2 and 33 phase 2/3. ClinicalTrials.gov names AstraZeneca as lead sponsor of 124 and Merck Sharp & Dohme of 84; non-small cell lung cancer is the first-listed cancer for 174; 65 are filed first under advanced cancer of any type; then come prostate (52), hormone receptor-positive breast (42), colorectal (34) and liver cancer (33). Taiwanese sites took part in liver cancer trials including IMbrave150, HIMALAYA, REFLECT and EMERALD-1, the EGFR lung cancer trials LUX-Lung 3, FLAURA, ADAURA and LAURA, and JUPITER-02 in nasopharyngeal cancer, which lists three countries. Of the 36 Taiwan-only trials, 17 are phase 1/2, and their sponsors include TaiRx, AP Biosciences, Anbogen, OBI Pharma, InnoPharmax and Ever Supreme; the National Health Research Institutes sponsor one in biliary tract cancer, and National Taiwan University Hospital is testing surgery of the primary tumour in oligometastatic EGFR-mutant lung cancer. The CDE reports that 83 of the 147 new trial protocols it reviewed in 2025 outside the abridged route for multinational multicentre trials (56%) were for cancer.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Taiwan", url: "https://clinicaltrials.gov/search?locStr=Taiwan&country=Taiwan&cond=Cancer" },
            { label: "CDE: Annual Report 2025, clinical trial reviews (PDF, Chinese)", url: CDE_AR_2025 },
          ],
        },
        {
          id: "research-output",
          title: "Oncology research output: 912 papers in 2025 with authors based in Taiwan",
          plain:
            "OpenAlex counts 912 oncology papers with at least one author based in Taiwan in 2025 and 4,534 over 2021 to 2025, a steady output of about 900 a year. National Taiwan University Hospital, Chang Gung, Taipei Veterans General and the Koo Foundation Sun Yat-Sen Cancer Center appear on this page's institution list.",
          detail:
            "OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Taiwan 874 works in 2021, 928 in 2022, 930 in 2023, 890 in 2024 and 912 in 2025, 4,534 in total, of which 3,225 are open access and 179 highly cited. OnCo's OpenAlex snapshot of 8 September 2026 also records 12,924 ClinicalTrials.gov studies of all conditions with a site in Taiwan. The national research base for cancer is the National Health Research Institutes' National Institute of Cancer Research in Zhunan and Tainan, which hosts the Taiwan Cooperative Oncology Group; it reports work on a map of genomic variants in Taiwanese breast cancer and a combination treatment for biliary tract cancer. The registry itself is a research resource: the HPA's process chart describes the annual report as made available for academic research.",
          links: [
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "NHRI: National Institute of Cancer Research", url: "https://nicr.nhri.edu.tw/" },
            { label: "NHRI: Taiwan Cooperative Oncology Group (Chinese)", url: TCOG },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "nhia-unreachable",
      title: "The National Health Insurance Administration's own site could not be read",
      plain:
        "nhi.gov.tw answered every page request from OnCo with a Cloudflare challenge that a script cannot pass. The insurer's figures on this page come from its own statements republished on the health ministry's site and from the law, not from its statistics pages or annual report.",
      detail:
        "Requests to www.nhi.gov.tw on 4 November 2026 returned HTTP 403 with a Cloudflare challenge. As a result OnCo could not read the current count of catastrophic illness certificates for cancer (the latest figure on this page is for the end of 2013, from a Ministry release), insurance spending on cancer and cancer medicines, the list of medicines paid from the temporary payment fund, the drug-listing committee's minutes, or the number of people insured. The NHIA's statements quoted on this page were read on mohw.gov.tw, where the Ministry republishes them with the NHIA named as the source.",
      links: [
        { label: "National Health Insurance Administration", url: "https://www.nhi.gov.tw" },
        { label: "Ministry of Health and Welfare: news releases", url: "https://www.mohw.gov.tw/lp-16-1.html" },
      ],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find, from a source it could read, the share of the eligible population screened, how long cancer medicines take from licence to insurance listing, or any stated cost-effectiveness threshold. Survival, first listed here as not found, is published by the Taiwan Cancer Registry Center: five-year relative survival was 62.3% for all invasive cancers diagnosed from 2019 to 2023. The TFDA's processing-time table was read from a law database's copy.",
      detail:
        "The Cancer Registry Annual Report gives incidence, stage and first treatment but not survival, and points readers to the Taiwan Cancer Registry Center's website for it. An earlier version of this page said no population-based survival figure had been found; the Center's table, read on 17 November 2026, gives five-year relative survival for invasive cancers newly diagnosed from 2019 to 2023 and followed to 2024: 62.3% for all cancers, 88.9% for female breast cancer, 87.2% for prostate cancer, 61.7% for colorectal cancer, 43.3% for lung cancer and 35.6% for liver cancer. The Ministry's hepatitis and liver cancer plan also gives five-year relative survival by stage for liver cancers newly diagnosed from 2018 to 2022, from 68.2% at stage 1 to 3.2% at stage 4. The HPA's stage-specific five-year lung cancer survival figures quoted in a 2025 release are rounded approximations and were not used. The 2023 screening dashboard gives counts of people screened and positive results but no coverage of the eligible population, and its follow-up rates could not be read reliably from the PDF layout. The TFDA's notice of 3 March 2026 was read from the Rootlaw law database's copy because OnCo did not find it on fda.gov.tw. China Medical University Hospital in Taichung has no record in OnCo because its own pages could not be read. The registry's 2024 report and population figures were not yet published.",
      links: [
        { label: "HPA: cancer registry reports (Chinese)", url: TCR_LIST },
        { label: "Taiwan Cancer Registry Center: five-year survival tables (Chinese)", url: SURVIVAL },
        { label: "HPA: National Hepatitis and Liver Cancer Control Plan 2026 to 2030 (Chinese)", url: LIVER_PLAN },
        { label: "TFDA: processing-time table (Rootlaw copy, PDF, Chinese)", url: TFDA_DEADLINES },
      ],
    },
  ],
  institutions: [
    "hpa-taiwan", "nhia-taiwan", "tfda-taiwan", "cde-taiwan", "nhri-taiwan", "ntuh", "chang-gung-memorial-hospital", "taipei-veterans-general-hospital",
    "koo-foundation-sun-yat-sen-cancer-center", "formosa-cancer-foundation", "taiwan-psycho-oncology-society",
  ],
  companies: ["pharmaessentia", "obi-pharma", "tairx", "ap-biosciences", "anbogen-therapeutics", "innopharmax", "ever-supreme-bio-technology", "shine-on-biomedical", "foresee-pharmaceuticals"],
  drugs: ["pembrolizumab", "atezolizumab", "selumetinib", "elranatamab", "teclistamab", "ropeginterferon-alfa-2b"],
  trials: [
    "imbrave150", "himalaya", "reflect", "emerald-1", "keynote-966", "topaz-1", "lux-lung-3", "flaura", "adaura", "laura", "mariposa", "jupiter-02", "checkmate-649",
    "keynote-522", "nct07738172", "nct06225284", "nct05170438", "nct02448992", "nct07248020", "nct06903273", "nct06162650", "nct05257590", "nct05473156",
    "nct05532696", "nct05442060", "nct06150885", "nct05065957", "nct07055594",
  ],
  papers: ["paper-chang-talent-ldct-never-smokers-taiwan-2024"],
  people: ["ann-lii-cheng", "chong-jen-yu", "chen-chien-tzung", "chen-wei-ming", "nei-min-chu"],
  how:
    "Every card was written from Taiwanese sources read in Chinese from their raw text: the Health Promotion Administration's Cancer Registry Annual Report 2023, the Ministry of Health and Welfare's 2025 cause-of-death analysis, the Cancer Control Act and National Health Insurance Act on the Ministry of Justice's law database, the HPA's screening pages, 2023 screening dashboard and hepatitis and liver cancer plan, Ministry releases quoting the HPA, the National Health Insurance Administration and the TFDA, the TFDA's processing-time table (from a law database's copy), the Center for Drug Evaluation's 2025 annual report and HTA pages, and the National Health Research Institutes' pages. GLOBOCAN has no Taiwan entry, so no IARC estimate is shown. The TALENT paper was resolved through Europe PMC and its abstract read. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph. The new records for this page are the HPA, the NHIA, the TFDA, the CDE, the National Health Research Institutes and one paper; the hospitals, companies and people were already in OnCo.",
  verify:
    "Incidence figures are registry counts for 2023 and deaths are the Ministry's counts for 2025, so the two years differ. Review times are statutory processing limits, not measured times. Screening ages changed on 1 January 2025 and can change again. Before relying on whether a particular cancer medicine is paid for, check the NHIA's current drug benefit rules, ask the hospital whether prior review is needed, and ask whether a catastrophic illness certificate applies.",
  verifyLinks: [
    { label: "HPA: cancer registry reports (Chinese)", url: TCR_LIST },
    { label: "HPA: cancer screening (Chinese)", url: SCREENING },
    { label: "National Health Insurance Administration (toll-free 0800-030-598)", url: "https://www.nhi.gov.tw" },
    { label: "Taiwan Food and Drug Administration", url: "https://www.fda.gov.tw" },
  ],
};
