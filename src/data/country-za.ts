import type { CountryDive } from "@/data/country-dive";

/**
 * South Africa deep dive: the hand-written cards for /countries/za/ (wave 4). Every figure was read from the raw text
 * of its source on 4 November 2026, not from a summary of it: the National Cancer Registry's 2024 pathology tables, its
 * Ekurhuleni and KwaZulu-Natal population-based reports for 2024 and its childhood cancer report for 2022 to 2023
 * (pdftotext), the gazetted cancer registration regulations of 2011, the Council for Medical Schemes' annual report for
 * 2025/26 and its consumer guide to the Prescribed Minimum Benefits, the National Health Insurance Act 20 of 2023 and
 * the Presidency's statement of 24 February 2026, the NEMLC's tertiary and quaternary list of July 2026 and its June
 * 2026 trastuzumab review, SAHPRA's reliance guideline and 2024/25 Annual Performance Plan, the Department of Health's
 * cervical and breast cancer policies of 2017, IARC's GLOBOCAN 2024 fact sheet, and the papers' abstracts through Europe
 * PMC. Where a figure could not be read it is named under `gaps`.
 */
const NCR_PAGE = "https://www.nicd.ac.za/centres/national-cancer-registry/";
const NCR_2024 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/NCR_Pathology_2024_Report.pdf";
const EPBCR_2024 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/EPBCR_2024_Report.pdf";
const KZN_2024 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/KZNPBCR-Annual-Report-2024.pdf";
const CHILD_2223 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/CHILDHOOD-CANCER-REGISTRY-2022-2023-ANNUAL-REPORT.pdf";
const REG_380 = "https://www.nicd.ac.za/wp-content/uploads/2020/02/Cancer-Registration-Regulation-380-of-National-Health-Act-no-61-of-2003.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/710-south-africa-fact-sheet.pdf";
const CMS_AR = "https://static.pmg.org.za/CMS_2025-26_AR.pdf";
const PMB_GUIDE = "https://www.medicalschemes.com/files/Consumer%20Education%20Material/PMB_ConsumerGuideBookLet.pdf";
const NHI_ACT = "https://www.gov.za/sites/default/files/gcis_document/202405/50664nathealthinsuranceact202023.pdf";
const NHI_PRESIDENCY = "https://presidency.gov.za/node/9772";
const NHI_EWN = "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge";
const TQ_EML = "https://www.health.gov.za/wp-content/uploads/2026/08/Tertiary-and-Quaternary-EM-Recommendations-July-2026.pdf";
const TRASTUZUMAB_2026 = "https://www.health.gov.za/wp-content/uploads/2026/06/Trastuzumab-Neoadjuvant-Therapy-for-Early-Breast-Cancer-NEMLC-Limited-Review-N-June-2026.pdf";
const SAHPRA_RELIANCE = "https://sahpra.org.za/wp-content/uploads/2022/01/SAHPGL-BAU-01_v4-Reliance-Guideline.pdf";
const SAHPRA_APP = "https://pmg.org.za/files/SAHPRA_APP_-_2024-25.pdf";
const SAHPRA_AR = "https://www.sahpra.org.za/document/annual-report-2024-2025/";
const CX_POLICY = "https://knowledgehub.health.gov.za/system/files/elibdownloads/2023-04/Cervical%2520Cancer%2520Prevention%2520Policy.pdf";
const BREAST_POLICY = "https://knowledgehub.health.gov.za/system/files/elibdownloads/2023-04/Breast-Cancer-Policy-2017.pdf";
const HPV_GAUTENG = "https://www.sanews.gov.za/south-africa/gauteng-health-urges-parents-support-hpv-vaccination-drive";
const WERKSMANS = "https://werksmans.com/court-orders-gauteng-department-of-health-to-provide-cancer-treatment-to-patients-awaiting-care/";
const SPOTLIGHT_2025 = "https://www.spotlightnsp.co.za/2025/08/28/what-next-for-cancer-patients-as-court-again-rules-against-gauteng-health-department/";
const WHO_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ZAF'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const IOL_DEC_2025 = "https://iol.co.za/news/crime-and-courts/2025-12-09-cancer-patients-in-gauteng-face-setbacks-as-court-suspends-vital-oncology-order/";

export const ZA_DIVE: CountryDive = {
  iso2: "ZA",
  iso3: "ZAF",
  name: "South Africa",
  flag: "🇿🇦",
  asOf: "2026-11-04",
  title: "Cancer in South Africa",
  description:
    "Cancer in South Africa from South African sources: IARC's estimate of 101,598 new cancers and 55,356 deaths in 2024 against the National Cancer Registry's laboratory count of 91,635 cancers diagnosed in 2024, the split between public care for about 85% of people and medical schemes covering 9.17 million with guaranteed cancer benefits, a National Health Insurance Act waiting on the Constitutional Court, the essential medicines list and SAHPRA's reliance routes, cervical screening and an HPV vaccine that cut infection with its two target types by 83%, HIV-associated cancers, and the trials in our records with sites in South Africa.",
  lede:
    "South Africa counts cancer mainly through laboratories: its National Cancer Registry recorded 91,635 cancers diagnosed by pathology in 2024, while IARC estimates 101,598 new cancers and 55,356 deaths that year, with prostate, breast and cervical cancer the commonest. About 85% of people rely on public health services, where an essential medicines list decides which cancer medicines are funded, while about 9.17 million belong to medical schemes that must pay in full for the treatment of most treatable cancers; a national health insurance law signed in 2024 has not yet taken effect.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for South Africa is 101,598 new cancers and 55,356 deaths, an age-standardised incidence of 161.5 per 100,000 (187.9 in men, 148.1 in women) and mortality of 87.9; the all-cancers figure includes 8,939 non-melanoma skin cancers (92,659 without them). IARC's fact sheet gives the incidence method as national or subnational rates scaled to regional all-cancer rates, and the deaths as trends in national mortality data held by the WHO, projected to 2024. The National Cancer Registry counts something narrower: cancers confirmed by a laboratory. Its tables for 2024 count 48,865 cancers in women and 42,770 in men, 91,635 in all; without the 24,512 basal and squamous cell skin cancers in that count, 67,123, against IARC's 92,659 without non-melanoma skin cancer. The two differ most for lung cancer, where the registry counts 2,272 against IARC's 7,693, and prostate cancer, 10,769 against 15,060, and least for cervical cancer (8,382 against 9,794) and breast cancer in women (11,264 against 13,338). Neither source explains the difference cancer by cancer: the registry's reports say a laboratory count leaves out cancers diagnosed clinically, radiologically or at death, and IARC's figures are modelled estimates. The registry's population-based registries, which also count cancers diagnosed clinically, measured rates in 2024 of 134.4 per 100,000 women and 100.6 per 100,000 men in Ekurhuleni, excluding skin cancers, and the Ekurhuleni report puts South Africa's burden at approximately 90,000 new cases a year.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in South Africa",
      aside: { label: "National Cancer Registry: cancers diagnosed histologically in 2024 (PDF)", url: NCR_2024 },
      cards: [
        {
          id: "shape",
          title: "About 100,000 new cancers a year, led by prostate, breast and cervical cancer",
          plain:
            "IARC estimates 101,598 new cancers in South Africa in 2024, 53,197 in women and 48,401 in men. Prostate cancer is the commonest, then breast and cervical cancer, and lung cancer causes the most cancer deaths. Before the age of 75, about one man in five and one woman in seven will be diagnosed with a cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 15,060 prostate cancers (5,281 deaths), 13,338 breast cancers (5,377 deaths), 9,794 cervical cancers (5,165 deaths), 7,693 lung cancers (6,732 deaths) and 6,816 colorectal cancers (3,676 deaths). In men the leading cancers are prostate, lung and colorectum; in women breast, cervix and colorectum. The cumulative risk of developing a cancer before 75 is 20.4% for men and 15.2% for women, and an estimated 240,745 people are living within five years of a diagnosis. The National Cancer Registry's laboratory count for 2024 shows the same order in women, breast (11,264) then cervix (8,382), and puts prostate cancer first in men (10,769), ahead of basal cell skin cancer (8,732). Its childhood registry counted 3,032 cancers in children and adolescents aged 0 to 19 in 2022 and 2023, an age-standardised rate of 68.4 per million, with leukaemias, lymphomas and brain tumours the commonest groups; the report attributes the rise from 57.7 per million in 2019 to better case finding rather than more cancer.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, South Africa (PDF)", url: IARC_FACTSHEET },
            { label: "National Cancer Registry: 2024 pathology tables (PDF)", url: NCR_2024 },
            { label: "National Cancer Registry: Childhood Cancer Registry 2022 to 2023 Annual Report (PDF)", url: CHILD_2223 },
          ],
        },
        {
          id: "how-counted",
          title: "Counted by laboratories since 1986, and by every route in Ekurhuleni since 2017 and eThekwini since 2023",
          plain:
            "South Africa's National Cancer Registry, part of the public laboratory service, has counted every cancer confirmed by a public or private laboratory since 1986. That misses cancers diagnosed only by scans or examination, so since 2017 it has also counted every cancer in Ekurhuleni, near Johannesburg, and since 2023 in eThekwini, around Durban.",
          detail:
            "Regulation R. 380 under the National Health Act, gazetted on 26 April 2011, established the National Cancer Registry in law under the National Health Laboratory Service and made cancer reportable: a health establishment confirming a diagnosis must notify the registry within three months, and laboratories must report every quarter. Laboratories send cases diagnosed by histology, cytology or bone marrow, and the registry publishes counts and rates by sex, age and population group; its tables for 2024 were published in 2026. Because this method excludes cancers diagnosed clinically, radiologically or at death, the registry built population-based registries: Ekurhuleni, chosen because it includes all four of South Africa's main population groups, counted 4,914 cancers in 2024, the highest in its eight years, with 96.6% confirmed under the microscope; eThekwini counted 3,923, with 69.6% confirmed. The Ekurhuleni report says a cyberattack on the National Health Laboratory Service and a new patient identification system delayed case confirmation, so the 2024 total likely modestly underestimates true incidence; its discussion adds that the cyberattack disrupted both 2023 and 2024, that 2023 was artificially low, and that part of the 2024 rise, such as cervical cancer's rate jumping from 14 to 35 per 100,000, reflects retrospective back-capture of manual records rather than a true increase. The report says further registries are planned in the Western Cape and Limpopo but need a formal government funding commitment.",
          links: [
            { label: "National Cancer Registry (NICD)", url: NCR_PAGE },
            { label: "Regulations relating to cancer registration, R. 380 of 2011 (PDF)", url: REG_380 },
            { label: "Ekurhuleni Population-Based Cancer Registry 2024 Report (PDF)", url: EPBCR_2024 },
            { label: "KwaZulu-Natal Population-Based Cancer Registry Annual Report 2024 (PDF)", url: KZN_2024 },
          ],
        },
      ],
      tables: [
        {
          id: "za-ncr-2024",
          title: "Cancers confirmed by a laboratory in South Africa, 2024",
          caption: "New cancers and age-standardised incidence per 100,000 (world standard population), National Cancer Registry pathology tables for 2024, all population groups.",
          columns: [
            { key: "cancer", label: "Cancer" },
            { key: "women", label: "Women, cases", numeric: true },
            { key: "womenAsr", label: "Women, rate", numeric: true },
            { key: "men", label: "Men, cases", numeric: true },
            { key: "menAsr", label: "Men, rate", numeric: true },
          ],
          rows: [
            { cancer: "All cancers (counts include basal and squamous cell skin cancers; rates exclude them)", women: 48865, womenAsr: 110, men: 42770, menAsr: 115 },
            { cancer: "All cancers without basal and squamous cell skin cancers (OnCo's subtraction)", women: 38070, womenAsr: null, men: 29053, menAsr: null },
            { cancer: "Breast", women: 11264, womenAsr: 32.47, men: 236, menAsr: 0.93 },
            { cancer: "Prostate", women: null, womenAsr: null, men: 10769, menAsr: 44.87 },
            { cancer: "Cervix", women: 8382, womenAsr: 24.57, men: null, menAsr: null },
            { cancer: "Colorectal", women: 2165, womenAsr: 6.16, men: 2525, menAsr: 9.91 },
            { cancer: "Non-Hodgkin lymphoma", women: 1094, womenAsr: 3.1, men: 1248, menAsr: 4.5 },
            { cancer: "Lung", women: 926, womenAsr: 2.56, men: 1346, menAsr: 5.46 },
            { cancer: "Oesophagus", women: 800, womenAsr: 2.34, men: 915, menAsr: 3.68 },
            { cancer: "Kaposi sarcoma", women: 301, womenAsr: 0.83, men: 493, menAsr: 1.47 },
            { cancer: "Basal cell carcinoma of the skin", women: 7105, womenAsr: 19.39, men: 8732, menAsr: 35.16 },
          ],
          note: "Only cancers diagnosed by histology, cytology or bone marrow are counted, so cancers diagnosed by scan or examination alone are missed. Counts are cases with sex known; the registry does not report deaths. The second row subtracts the registry's own basal cell (7,105 women, 8,732 men) and squamous cell skin cancer counts (3,690 and 4,985).",
          sources: [
            { label: "National Cancer Registry: summary statistics of cancer diagnosed histologically in 2024 (PDF)", url: NCR_2024 },
          ],
        },
        {
          id: "za-pbcr-2024",
          title: "Every cancer, however diagnosed, in two South African districts, 2024",
          caption: "New cancers and age-standardised incidence per 100,000 (world standard population), all sites including skin, from each population-based registry's 2024 report.",
          columns: [
            { key: "registry", label: "Registry (area covered)" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Men, cases", numeric: true },
            { key: "menAsr", label: "Men, rate", numeric: true },
            { key: "women", label: "Women, cases", numeric: true },
            { key: "womenAsr", label: "Women, rate", numeric: true },
            { key: "mv", label: "Confirmed by microscope (%)", numeric: true },
          ],
          rows: [
            { registry: "Ekurhuleni Population-Based Cancer Registry (Ekurhuleni, Gauteng)", cases: 4914, men: 2066, menAsr: 107.32, women: 2848, womenAsr: 139.77, mv: 96.6 },
            { registry: "KwaZulu-Natal Population-Based Cancer Registry (eThekwini district)", cases: 3923, men: 1593, menAsr: 67.02, women: 2330, womenAsr: 121.1, mv: 69.6 },
          ],
          note: "These registries count cancers diagnosed clinically, radiologically or by pathology among residents, using hospital files, laboratory reports, oncology networks, hospices and mortuary records. Excluding skin cancers, Ekurhuleni's rates are 100.55 for men and 134.41 for women, eThekwini's 54.27 and 102.9. Both cover one district each and are not national rates.",
          sources: [
            { label: "Ekurhuleni Population-Based Cancer Registry 2024 Report, tables 1 and 2 (PDF)", url: EPBCR_2024 },
            { label: "KwaZulu-Natal Population-Based Cancer Registry Annual Report 2024, tables 1 and 2 (PDF)", url: KZN_2024 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: public hospitals for most, medical schemes for some, national insurance in law but not in force",
      aside: { label: "Council for Medical Schemes: Annual Report 2025/26 (PDF)", url: CMS_AR },
      cards: [
        {
          id: "two-systems",
          title: "Two systems side by side: about 85% rely on public care, about one in seven on a medical scheme",
          plain:
            "Most South Africans with cancer are treated in public hospitals. About 9.17 million people, roughly one in seven, belong to a private medical scheme, which by law must pay in full for the treatment of most cancers that can be treated, if the member uses the scheme's chosen providers and medicine lists.",
          detail:
            "The National Essential Medicines List Committee's 2026 trastuzumab review estimates that approximately 85% of the South African population relies on the public health sector. The Council for Medical Schemes' annual report for 2025/26 counts 70 registered schemes, 16 open and 54 restricted, covering about 9.17 million beneficiaries in 2024, up from 9.13 million in 2023, which is about 14% of IARC's 2024 population estimate of 64.0 million; the Ekurhuleni registry report puts the share with medical insurance at 16%. Schemes paid R259.3 billion in benefits in 2024, and members paid a further R46.3 billion out of pocket. Every scheme option must cover the Prescribed Minimum Benefits: emergency care, 271 listed conditions and 26 chronic conditions in the 2025/26 report. The council's consumer guide lists cancers by site, each qualified as treatable, paired with medical and surgical management including chemotherapy and radiotherapy, plus cervical and breast cancer screening, and says schemes must pay for these in full without a co-payment or deductible; a co-payment can apply if a member chooses a medicine off the scheme's formulary or a provider other than its designated one.",
          links: [
            { label: "NEMLC: trastuzumab review, June 2026, population and level of care (PDF)", url: TRASTUZUMAB_2026 },
            { label: "Council for Medical Schemes: Annual Report 2025/26 (PDF)", url: CMS_AR },
            { label: "Council for Medical Schemes: Prescribed Minimum Benefits consumer guide (PDF)", url: PMB_GUIDE },
            { label: "Ekurhuleni Population-Based Cancer Registry 2024 Report, data sources (PDF)", url: EPBCR_2024 },
          ],
        },
        {
          id: "public-medicines",
          title: "In public hospitals, a national committee decides which cancer medicines are on the list",
          plain:
            "Which cancer medicines a public hospital should use is decided by the National Essential Medicines List Committee, which weighs evidence and price. Some medicines are listed, such as trastuzumab for early HER2-positive breast cancer and imatinib for chronic myeloid leukaemia; others are reviewed and turned down, some explicitly because of their price.",
          detail:
            "The committee's tertiary and quaternary list of July 2026 records, among cancer medicines, imatinib for chronic myeloid leukaemia and for gastrointestinal stromal tumours, dasatinib or nilotinib after imatinib, rituximab for first-line diffuse large B-cell lymphoma except patients with an International Prognostic Index of 0, lenalidomide for newly diagnosed myeloma (approved 8 December 2022), bortezomib on special access for transplant-eligible myeloma, and fulvestrant for hormone receptor-positive advanced breast cancer as third- or fourth-line therapy, approved on 30 July 2026 with the note that a reference price was met, after a decision not to approve it in March 2021. Not approved are, for example, pemetrexed for lung cancer and mesothelioma, temozolomide for glioblastoma, and rituximab for indolent B-cell lymphoma, where the committee wrote that despite better response rates it is deemed unaffordable at its current price. Trastuzumab for early HER2-positive breast cancer was listed in 2017 for 12 months, cut to 6 months in 2019 after the PERSEPHONE trial, and on 4 June 2026 extended to treatment before surgery and to locally advanced disease; the review notes its cost has fallen 59% over eight years. No immune checkpoint inhibitor appears among the list's reviewed items, and abiraterone and enzalutamide appear only in a review note for docetaxel in prostate cancer, not as reviewed items. New items are to be sourced on a national quotation, where possible, until a national tender is in place.",
          links: [
            { label: "NEMLC: Tertiary and Quaternary Level Essential Medicines List, reviewed items, July 2026 (PDF)", url: TQ_EML },
            { label: "NEMLC: trastuzumab, neoadjuvant therapy for early breast cancer, limited review, June 2026 (PDF)", url: TRASTUZUMAB_2026 },
          ],
        },
        {
          id: "nhi",
          title: "A national health insurance law signed in 2024 that has not yet taken effect",
          plain:
            "The National Health Insurance Act, signed in May 2024, sets up a single public fund to buy health care for everyone and would limit medical schemes to covering what the fund does not. No part of it is in force: the President agreed in February 2026 to wait for the Constitutional Court, which heard challenges in May 2026 and had not ruled in any report OnCo found.",
          detail:
            "The National Health Insurance Act 20 of 2023 was assented to on 15 May 2024; its commencement is to be proclaimed. It establishes a National Health Insurance Fund to purchase health care services strategically on behalf of users, and section 33 provides that once national health insurance has been fully implemented, as the Minister determines by regulation, medical schemes may only offer complementary cover for services not reimbursable by the fund. On 24 February 2026 the Presidency said that, because of litigation against the President and the Minister of Health, the President had agreed with the Minister to delay the proclamation of any sections of the Act until the Constitutional Court hands down judgment in challenges to the public participation process, due to be heard on 5 to 7 May 2026. Eyewitness News reported on 7 May 2026 that the court had reserved judgment in the combined applications of the Board of Healthcare Funders and the Western Cape government, and that the ruling is expected to clarify more than a dozen related cases. The Council for Medical Schemes' 2025/26 report notes the uncertainty for schemes, providers and members while there is no clear definition of when national health insurance is fully implemented. The Act does not set out a list of cancer services, so what it would cover for cancer is not yet known.",
          links: [
            { label: "National Health Insurance Act 20 of 2023 (PDF)", url: NHI_ACT },
            { label: "The Presidency: statement on National Health Insurance Act litigation (24 February 2026)", url: NHI_PRESIDENCY },
            { label: "EWN: ConCourt reserves judgment in NHI challenge (7 May 2026)", url: NHI_EWN },
            { label: "Council for Medical Schemes: Annual Report 2025/26 (PDF)", url: CMS_AR },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: SAHPRA",
      aside: { label: "SAHPRA: Reliance Guideline SAHPGL-BAU-01 v4 (PDF)", url: SAHPRA_RELIANCE },
      cards: [
        {
          id: "sahpra-reliance",
          title: "A regulator founded in 2018 that can rely on the reviews of trusted regulators abroad",
          plain:
            "South Africa's medicines regulator, SAHPRA, replaced the Medicines Control Council in 2018 and inherited a long backlog of applications, which it says it has cleared. A medicine already approved in the European Union, the United States, the United Kingdom, Canada, Switzerland, Japan or Australia can be registered through a shorter review that relies on that regulator's assessment.",
          detail:
            "SAHPRA's reliance guideline, SAHPGL-BAU-01 version 4 of May 2024 (first published in July 2019), describes three routes. An abridged review is based primarily on full assessment reports from a recognised regulatory authority; a verified review checks a product against one already approved by SAHPRA or such an authority; and recognition would accept the outcome of a review by an authority with which SAHPRA has a recognition agreement, which the guideline says SAHPRA was still negotiating. To qualify, a medicine must have been approved by at least one of: the European Union's centralised or decentralised procedure, Health Canada, the UK's MHRA, Japan's PMDA, Swissmedic, Australia's TGA, the US FDA, or a WHO-listed authority. The guideline follows the World Health Organization's definition of reliance, under which the relying authority remains responsible for its decision. A study of SAHPRA's approvals in 2020 found that approval timelines for applications in its backlog stream, assessed through facilitated pathways such as abridged and verification review, were 68% quicker for new chemical entities and generics alike; the abstract does not name the comparison, and business-as-usual applications all had a full review. SAHPRA also handles Section 21 applications, its route for access to medicines that are not registered in South Africa.",
          links: [
            { label: "SAHPRA: Reliance Guideline SAHPGL-BAU-01 v4, May 2024 (PDF)", url: SAHPRA_RELIANCE },
            { label: "Keyter et al., the impact of reliance on SAHPRA's review process (Front Pharmacol 2021)", url: "https://doi.org/10.3389/fphar.2021.699063" },
            { label: "SAHPRA: Annual Performance Plan 2024/25, clinical trials and Section 21 portfolio (PDF)", url: SAHPRA_APP },
          ],
        },
        {
          id: "sahpra-targets",
          title: "Targets of 360 working days for a new medicine, falling to 300 by 2026/27",
          plain:
            "SAHPRA sets itself targets for how long a review should take. For 2024/25 it aimed to finish 80% of new medicine applications within 360 working days, about a year and a half, tightening to 320 days in 2025/26 and 300 in 2026/27. It also runs a priority review for medicines that meet an unmet need or treat life-threatening conditions.",
          detail:
            "SAHPRA's 2024/25 Annual Performance Plan sets output targets of 80% of new chemical entity applications finalised within 360 working days in 2024/25, 320 in 2025/26 and 300 in 2026/27, and of 75% of generic applications within 250 working days, rising to 85% in later years. It reports earlier results against looser targets: in 2021/22, 44 of 246 new chemical entity applications received were finalised, all within 590 working days; in 2022/23 none was due for finalisation and 89 were finalised within 490 working days. It describes a Policy on Priority Review Pathways, approved by the Board and in use since the last quarter of 2021/22, for new medicines that address an unmet clinical need, show a major therapeutic advantage, or treat life-threatening or seriously debilitating conditions or rare diseases. The plan records that SAHPRA obtained the World Health Organization's maturity level 3 in 2022/23, which it describes as a stable, well-functioning regulatory system for vaccines, and aims for level 4; it was designated a Regional Centre of Regulatory Excellence for vaccine regulation in August 2023. OnCo could not open the 2024/25 annual report, so whether the 360-day target was met is not given here; see the gaps.",
          links: [
            { label: "SAHPRA: Annual Performance Plan 2024/25, programme 2 targets (PDF, via Parliamentary Monitoring Group)", url: SAHPRA_APP },
            { label: "SAHPRA: Annual Report 2024/25 (page)", url: SAHPRA_AR },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Cervical Cancer Prevention and Control Policy, 2017 (PDF)", url: CX_POLICY },
      cards: [
        {
          id: "cervical-screening",
          title: "Three free cervical screens in a lifetime, more often for women living with HIV",
          plain:
            "Public clinics offer women without HIV three free cervical screening tests in a lifetime, ten years apart, from the age of 30. Women living with HIV are screened from diagnosis, every three years or every year depending on results, for life, because they are at higher risk. Cervical cancer in the national registry began to fall from 2016.",
          detail:
            "The Department of Health's Cervical Cancer Prevention and Control Policy of June 2017 provides three free screening tests at ten-year intervals for HIV-negative, asymptomatic women over 30 attending public health services, with three-yearly repeat screening after an abnormal result until it is negative. Women living with HIV are screened irrespective of CD4 count and antiretroviral treatment, at three-yearly or annual intervals depending on the result, for life. The policy keeps cytology, introduces HPV DNA testing where resources permit and screen-and-treat with visual inspection in resource-limited settings, and set a goal of reducing invasive cervical cancer from 31.7 to 20 per 100,000 women by 2022. It noted that despite a national screening programme since 2002 incidence had remained unchanged, and gave screening coverage of women aged 30 and over as 54.5% in 2014/15 and 57.4% in the second quarter of 2015/16. Using National Cancer Registry data, Shing and colleagues measured cervical cancer incidence of 30.4 per 100,000 women a year in 2011 to 2021, stable until 2016 and then declining by an average of 2.7% a year, while vulvar, vaginal, penile and anal cancers rose.",
          links: [
            { label: "Cervical Cancer Prevention and Control Policy, June 2017 (PDF)", url: CX_POLICY },
            { label: "Shing et al., HPV-related cancers in South Africa 2011 to 2021 (Lancet Glob Health 2025)", url: "https://doi.org/10.1016/S2214-109X(25)00065-8" },
          ],
        },
        {
          id: "hpv-vaccination",
          title: "HPV vaccination at school since 2014, which cut infection with the two virus types it targets by 83%",
          plain:
            "Since 2014 girls in primary school have been offered the HPV vaccine, which protects against the virus types behind most cervical cancer. A study comparing 17 and 18 year olds before and after the programme found infection with those types fell by 83%, including among girls living with HIV. Gauteng now gives a single dose in Grade 5.",
          detail:
            "The programme began in 2014 for Grade 4 girls aged 9 and over through the Integrated School Health Programme, and reached 87% coverage with at least one of two doses, according to Machalek and colleagues. Comparing self-collected samples from girls aged 17 to 18 at 15 clinics in four provinces in 2019 (819 girls) and 2023 (1,538), they found HPV 16 or 18 prevalence fell from 21.6% to 3.2%, an adjusted prevalence ratio of 0.17, and among girls living with HIV from 29.4% to 4.4%, similar to the effect of three-dose programmes in high-income countries. In August 2026 the Gauteng Department of Health said its campaign, running to 9 October 2026, offers a single dose of Cervarix to Grade 5 girls aged nine and older, that more than 80,000 girls were vaccinated in 2025/26, and that learner absenteeism, 24,327 unreturned consent forms and misinformation held uptake back; it said no learner is vaccinated without a signed consent form, although learners aged 12 and older may consent for themselves. For the country as a whole, the World Health Organization's immunisation data, read on 17 November 2026, estimate that 79% of girls in the programme's target group received a first dose in 2024 (405,299 doses for a target of 512,080) and repeat 79% for 2025 with the dose and target numbers left blank; the figure South Africa itself reported for a first dose in 2024 is 88.57%.",
          links: [
            { label: "Machalek et al., population impact of South Africa's HPV vaccination programme (Lancet Glob Health 2026)", url: "https://doi.org/10.1016/S2214-109X(25)00525-X" },
            { label: "SAnews: Gauteng Health urges parents to support HPV vaccination drive (3 August 2026)", url: HPV_GAUTENG },
            { label: "Cervical Cancer Prevention and Control Policy, section 7.1 (PDF)", url: CX_POLICY },
            { label: "WHO immunisation data: HPV vaccination coverage rows for South Africa (JSON)", url: WHO_HPV },
          ],
        },
        {
          id: "breast-screening",
          title: "Breast examination at the clinic rather than population mammography",
          plain:
            "South Africa has no national mammography screening programme. National policy asks primary care clinics to examine the breasts of women over 40 twice a year and to teach breast awareness, and keeps mammography for women with symptoms or at high risk, because the public system cannot screen most women aged 50 and over reliably.",
          detail:
            "The Department of Health's Breast Cancer Prevention and Control Policy of 2017 sets as its first standard that women over 40 attending a primary health clinic have a clinical breast examination by a provider biannually, the policy's word, with breast education and awareness for all. It states that screening mammography should not be introduced unless resources are available to screen at least 70% of the target group, women aged 50 and older, reliably and effectively, that lack of resources and infrastructure in the public system makes this untenable, and that mammography should be performed on symptomatic and identifiable high-risk women at specialist breast units. Women the policy lists as at increased risk, including carriers of BRCA1 or BRCA2 variants and women with a first-degree relative with breast cancer, should be encouraged to have yearly mammography from 40 to 50 and yearly or two-yearly from 50. For people with medical scheme cover, the Prescribed Minimum Benefits include cervical smears and periodic breast examination. The registry's Ekurhuleni report finds the highest breast cancer rates among White women in that district.",
          links: [
            { label: "Breast Cancer Prevention and Control Policy, 2017, key area 1 (PDF)", url: BREAST_POLICY },
            { label: "Council for Medical Schemes: Prescribed Minimum Benefits consumer guide, code 960M (PDF)", url: PMB_GUIDE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What South Africa does",
      title: "What South Africa does differently",
      cards: [
        {
          id: "hiv-and-cancer",
          title: "Measuring cancer in people living with HIV by linking laboratory records nationally",
          plain:
            "Many South Africans live with HIV, and HIV raises the risk of several cancers, especially cervical cancer and Kaposi sarcoma. Because one public laboratory service does both the HIV tests and the cancer diagnoses, South African researchers linked the two for more than five million people to see which cancers people with HIV get, and at what age.",
          detail:
            "The South African HIV Cancer Match Study links HIV-related laboratory records from the National Health Laboratory Service to the National Cancer Registry. Ruffieux and colleagues followed 5,222,827 people living with HIV from 2004 to 2014 and found 29,580 cancers, most often cervical cancer (7,418), Kaposi sarcoma (6,380) and breast cancer (2,748); at age 40 cervical cancer was the commonest in women and Kaposi sarcoma in men, whose rate peaked at age 34, and after about age 54 cancers not caused by infection overtook those that are, with prostate cancer the commonest in older men. A 2026 analysis by Metekoua and colleagues of 496,517 cancers in the registry from 2004 to 2021 found that only 41% had a documented HIV status, rising from 29% to 52% over the period; where status was known, 75% of people with infection-related cancers and 32% with other cancers were living with HIV. The registry still counted 794 Kaposi sarcomas confirmed by a laboratory in 2024. National cervical screening policy treats every woman living with HIV as high risk and screens her more often for life.",
          links: [
            { label: "Ruffieux et al., age and cancer incidence in 5.2 million people with HIV (Clin Infect Dis 2023)", url: "https://doi.org/10.1093/cid/ciac925" },
            { label: "Metekoua et al., integration of HIV status in cancer surveillance in South Africa (Cancer Med 2026)", url: "https://doi.org/10.1002/cam4.71661" },
            { label: "National Cancer Registry: research projects", url: NCR_PAGE },
          ],
        },
        {
          id: "radiotherapy-court",
          title: "Patients waiting for radiotherapy took the Gauteng health department to court",
          plain:
            "In Gauteng, the province that includes Johannesburg and Pretoria, patients waited so long for radiotherapy that a group of cancer charities went to court. In March 2025 the High Court ordered the provincial health department to treat patients on the waiting list and report back; the department appealed, and in December 2025 the order was suspended until the Supreme Court of Appeal decides.",
          detail:
            "According to a summary of the judgment by the law firm Werksmans, on 27 March 2025 the High Court in Johannesburg, in Cancer Alliance v Member of the Executive Council for Health, Gauteng ([2025] ZAGPJHC 136), granted urgent interim relief. Cancer Alliance argued that the department had failed to use R784 million allocated by the Gauteng Treasury in March 2023 to address surgical and radiation oncology backlogs, of which R250 million for outsourcing radiotherapy was returned unspent, and the court found that the department had, without justifiable reason, ignored the patients' right to outsourced radiotherapy paid for from those ring-fenced funds; Spotlight reports the unspent allocation as the background to the ruling. It ordered the department to update the Cancer Alliance's backlog list within 45 days, take all necessary steps to provide radiotherapy to backlog patients at Charlotte Maxeke Johannesburg Academic Hospital and Steve Biko Academic Hospital, and report within three months on its steps and long-term plan. The department appealed to the Supreme Court of Appeal; in August 2025 a judge ordered the March order enforced in the meantime, and the department said 563 patients were receiving radiotherapy through private partnerships and 1,076 had completed treatment by the end of July 2025. In December 2025 a full bench of three judges suspended the order pending the appeal, finding the department had prospects of success. OnCo did not find the appeal's outcome.",
          links: [
            { label: "Werksmans: court orders Gauteng Department of Health to provide cancer treatment (summary of [2025] ZAGPJHC 136)", url: WERKSMANS },
            { label: "Spotlight: what next for cancer patients as court again rules against Gauteng health department (28 August 2025)", url: SPOTLIGHT_2025 },
            { label: "IOL: court suspends oncology order pending appeal (9 December 2025)", url: IOL_DEC_2025 },
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
          id: "trials-research",
          title: "155 cancer trials in OnCo's records list South Africa, most of them large international phase 3 trials",
          plain:
            "South Africa takes part in many international cancer trials: 155 in OnCo's records list it among their countries, most of them phase 3 trials sponsored by large drug companies in lung, prostate and breast cancer. A few are smaller, including a trial of chemotherapy for Kaposi sarcoma in people with HIV and one lymphoma study run only in South Africa.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026: 155 trials list South Africa among their countries, 132 of them phase 3, 11 phase 2, 8 phase 2/3, 3 phase 1/2 and 1 phase 1. ClinicalTrials.gov shows 29 recruiting, 79 active but not recruiting, 41 completed and 6 terminated, and names Merck Sharp & Dohme as lead sponsor of 23, Roche of 18, AstraZeneca of 17 and Pfizer of 13; non-small cell lung cancer (22), prostate cancer (19) and triple-negative breast cancer (14) are the commonest first conditions. Among those with the fewest countries, NCT07125872, an ImmunityBio phase 2 study in relapsed or refractory B-cell non-Hodgkin lymphoma, lists only South Africa; ECOG-ACRIN's EA1131 trial in triple-negative breast cancer ran in the United States and South Africa; and ACTG A5263, in six countries, found that oral etoposide and bleomycin with vincristine were worse than paclitaxel for advanced Kaposi sarcoma in people with HIV. OpenAlex counts 1,934 oncology papers with a South African author from 2021 to 2025, rising from 374 in 2021 to 436 in 2025, 1,514 of them open access, and ClinicalTrials.gov counted 3,864 studies of any condition with a site in South Africa when OnCo built its country file on 8 September 2026.",
          links: [
            { label: "ClinicalTrials.gov: NCT07125872", url: "https://clinicaltrials.gov/study/NCT07125872" },
            { label: "ClinicalTrials.gov: NCT02445391 (EA1131)", url: "https://clinicaltrials.gov/study/NCT02445391" },
            { label: "ClinicalTrials.gov: NCT01435018 (ACTG A5263)", url: "https://clinicaltrials.gov/study/NCT01435018" },
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "deaths-and-survival",
      title: "National cancer deaths and survival could not be read from a South African source",
      plain:
        "The registry counts new cancers, not deaths, and OnCo found no national figures for survival after a cancer diagnosis in South Africa. Statistics South Africa's causes of death report would give the counted deaths, but its website refused automated access and no archived copy existed, so the death figures here are IARC's.",
      detail:
        "Statistics South Africa publishes Mortality and causes of death in South Africa (P0309.3); the 2024 edition's PDF returned a bot-protection page to a plain request on 4 November 2026 and the Internet Archive held no copy, so registered cancer deaths could not be compared with IARC's 55,356. IARC's fact sheet says its South African mortality comes from national death data supplied through the WHO and projected to 2024. The Ekurhuleni registry report says survival and outcomes are not available from any existing South African registry and that a concept to embed registries in the South African Population Research Infrastructure Network aims to provide them. The registry's 2024 national report is a set of tables without a written methods section, so this page takes its methods from the registry's web page and its population-based reports.",
      links: [
        { label: "Statistics South Africa: Mortality and causes of death, P0309.3 (2024 edition, PDF)", url: "https://www.statssa.gov.za/publications/P03093/P030932024.pdf" },
        { label: "Ekurhuleni Population-Based Cancer Registry 2024 Report, introduction (PDF)", url: EPBCR_2024 },
      ],
    },
    {
      id: "approval-times",
      title: "SAHPRA's measured approval times for cancer medicines were not found",
      plain:
        "OnCo found SAHPRA's targets for how long a review should take, but not its results for 2024/25, because the annual report is stored on a file-sharing site that did not open. No published figure was found for how long cancer medicines take to be registered in South Africa, or for how long after approval elsewhere.",
      detail:
        "SAHPRA's annual report for 2024/25 is linked from its website as a SharePoint file that returned no document to a plain request on 4 November 2026. The 2024/25 Annual Performance Plan gives targets and results only up to 2022/23. The most recent peer-reviewed measurement read here is of approvals in 2020. Whether a registered cancer medicine is on the public essential medicines list, stocked by a province, or covered by a given medical scheme are separate questions this page cannot answer medicine by medicine; the essential medicines list itself is the July 2026 version.",
      links: [
        { label: "SAHPRA: Annual Report 2024/25 (page)", url: SAHPRA_AR },
        { label: "SAHPRA: Annual Performance Plan 2024/25 (PDF)", url: SAHPRA_APP },
      ],
    },
    {
      id: "coverage-and-capacity",
      title: "Current cervical screening coverage, a South African count of radiotherapy machines and two court outcomes were not found",
      plain:
        "Some figures a reader would want are not on this page because OnCo could not find them in a primary source: current national cervical screening coverage, a South African official count of radiotherapy machines, and the outcomes of the national health insurance and Gauteng radiotherapy cases. For HPV vaccination and radiotherapy the figures below come from international listings, not from South African reports.",
      detail:
        "The newest national cervical screening coverage figure found is the 57.4% for 2015/16 quoted in the 2017 policy. The HPV vaccination figures are the 87% one-dose coverage of the original two-dose programme, from a 2026 paper, Gauteng's count of more than 80,000 girls in 2025/26, and the World Health Organization's estimate, read on 17 November 2026, of 79% first-dose coverage among girls in 2024, repeated for 2025 with the dose and target numbers blank; no South African report of national coverage was read. No official South African count of radiotherapy machines or oncologists was read for this page. The International Atomic Energy Agency's directory of radiotherapy centres, read on 16 November 2026, lists 59 centres in South Africa with 99 linear accelerators and 3 cobalt-60 units between them, and marks 19 of the centres as having brachytherapy. The entries are reported by the centres and were last updated between 2015 and 2022, so the listing may be out of date, and two entries in Cape Town carry the name Panorama, so one centre may be listed twice. The Constitutional Court had not ruled on the national health insurance challenges when this page was written, and the Supreme Court of Appeal's decision in the Gauteng radiotherapy case was not found; the March 2025 judgment itself is described from a law firm's summary because the court's published text did not load.",
      links: [
        { label: "Cervical Cancer Prevention and Control Policy, 2017 (PDF)", url: CX_POLICY },
        { label: "WHO immunisation data: HPV vaccination coverage rows for South Africa (JSON)", url: WHO_HPV },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: DIRAC },
        { label: "EWN: ConCourt reserves judgment in NHI challenge (7 May 2026)", url: NHI_EWN },
        { label: "IOL: court suspends oncology order pending appeal (9 December 2025)", url: IOL_DEC_2025 },
      ],
    },
    {
      id: "pmb-detail",
      title: "The full text of the cancer Prescribed Minimum Benefits was read from a consumer guide",
      plain:
        "The exact wording of what medical schemes must pay for in cancer is in regulations under the Medical Schemes Act. OnCo read it from the Council for Medical Schemes' consumer guide, whose file was created in May 2011, and took the current number of conditions from the council's 2025/26 annual report.",
      detail:
        "The consumer guide lists 270 diagnosis and treatment pairs and 25 chronic conditions, while the 2025/26 annual report gives 271 conditions and 26 chronic conditions, so the list has been amended since the guide was written. The guide pairs cancers with medical and surgical management including chemotherapy and radiotherapy where the cancer is treatable; it does not define treatable, and schemes apply their own protocols, formularies and designated providers, which can decide what is paid in full. The council also publishes benefit definition guidelines for specific conditions, which OnCo did not read for this page. A member who disagrees with a scheme's decision can complain to the council, which registered 2,455 formal complaints in 2025/26.",
      links: [
        { label: "Council for Medical Schemes: Prescribed Minimum Benefits consumer guide (PDF)", url: PMB_GUIDE },
        { label: "Council for Medical Schemes: Annual Report 2025/26 (PDF)", url: CMS_AR },
      ],
    },
  ],
  institutions: [
    "national-cancer-registry-south-africa", "nhls-south-africa", "sahpra", "council-for-medical-schemes", "south-africa-national-department-of-health",
    "groote-schuur-uct", "wits-charlotte-maxeke", "chris-hani-baragwanath", "steve-biko-academic-hospital", "tygerberg-hospital", "inkosi-albert-luthuli-hospital",
    "cansa", "sabmr", "iarc", "who",
  ],
  companies: ["ntp-radioisotopes", "merck", "roche-genentech", "astrazeneca", "pfizer", "immunitybio", "ecog-acrin"],
  drugs: ["trastuzumab", "fulvestrant", "lenalidomide", "imatinib"],
  trials: [
    "nct07125872", "ea1131", "actg-a5263", "nct00433511", "nct00033332", "calla", "pacific", "flaura2", "keynote-671", "katherine", "aphinity",
    "hera-b31-n9831", "monaleesa-2", "destiny-breast09", "latitude", "talapro-2", "aramis", "aranote", "tropic", "checkmate-238", "keynote-716",
    "impassion131", "goya", "echelon-1", "lume-meso", "checkmate-743", "toga",
  ],
  papers: [
    "paper-machalek-hpv-vaccine-impact-south-africa-lancet-glob-health-2026", "paper-shing-hpv-related-cancers-south-africa-lancet-glob-health-2025",
    "paper-ruffieux-age-cancer-hiv-south-africa-cid-2023", "paper-metekoua-hiv-status-cancer-registry-south-africa-cancer-med-2026",
    "paper-keyter-sahpra-reliance-review-frontiers-pharmacol-2021",
  ],
  people: ["mazvita-muchengeti"],
  how:
    "Every card was written from South African official sources and peer-reviewed studies, read in full rather than through a summary: the National Cancer Registry's 2024 pathology tables, its Ekurhuleni and KwaZulu-Natal population-based reports and its childhood cancer report; the gazetted cancer registration regulations of 2011; the Council for Medical Schemes' 2025/26 annual report and its consumer guide to the Prescribed Minimum Benefits; the National Health Insurance Act 20 of 2023 and the Presidency's statement on the litigation; the National Essential Medicines List Committee's July 2026 tertiary and quaternary list and June 2026 trastuzumab review; SAHPRA's reliance guideline and 2024/25 Annual Performance Plan; the Department of Health's 2017 cervical and breast cancer policies; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Court proceedings are described from a law firm's summary and news reports, each named on its link. On a second reading in November 2026 the World Health Organization's HPV vaccination coverage rows and the International Atomic Energy Agency's directory of radiotherapy centres were read and added to the cards that had said no figure was found. The new records added for this page (the National Cancer Registry, the National Health Laboratory Service, SAHPRA, the Council for Medical Schemes, the National Department of Health, five papers and one person) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates; the registry's national count includes only cancers confirmed by a laboratory, and its full-count registries cover two districts. What a medical scheme pays depends on its rules, designated providers and formulary, and what a public hospital offers depends on the province; ask the scheme or the hospital's oncology unit what applies to you. National health insurance is not yet in force.",
  verifyLinks: [
    { label: "National Cancer Registry", url: NCR_PAGE },
    { label: "Council for Medical Schemes", url: "https://www.medicalschemes.co.za" },
    { label: "SAHPRA", url: "https://www.sahpra.org.za" },
    { label: "National Department of Health", url: "https://www.health.gov.za" },
  ],
};
