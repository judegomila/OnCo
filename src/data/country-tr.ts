import type { CountryDive } from "@/data/country-dive";

/**
 * Türkiye deep dive: the hand-written cards for /countries/tr/. Turkish sources were read in Turkish from the raw text
 * of each PDF or page (pdftotext or the HTML itself), not from a summary: the Ministry of Health cancer department's
 * Türkiye Kanser İstatistikleri 2019 and 2020 reports, its screening, KETEM and duties pages and the English edition
 * of its 2021 Turkey Cancer Control Programme (all through dated Internet Archive copies, because
 * hsgm.saglik.gov.tr timed out on every scripted request on 4 November 2026), the consolidated Sağlık Uygulama
 * Tebliği PDF from mevzuat.gov.tr, the Alternatif Geri Ödeme Yönetmeliği and the Beşeri Tıbbi Ürünler
 * Ruhsatlandırma Yönetmeliği with its 2022 and 2023 amendments from the Resmî Gazete, and the TİTCK and SGK sites.
 * Every figure below is quoted from one of those; where a figure could not be read it is named under `gaps`.
 */
const ARCHIVE = "https://web.archive.org/web";
const STATS_2020 = `${ARCHIVE}/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Istatistikler/Turkiye_Kanser_Istatistikleri_2020.pdf`;
const STATS_2019 = `${ARCHIVE}/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Istatistikler/Turkiye_Kanser_Istatistikleri_2019.pdf`;
const STATS_PAGE = `${ARCHIVE}/20251015104754/https://hsgm.saglik.gov.tr/tr/kanser-istatistikleri.html`;
const SCREENING = `${ARCHIVE}/20251107193141/https://hsgm.saglik.gov.tr/tr/kanser-taramalari.html`;
const KETEM = `${ARCHIVE}/20251008092847/https://hsgm.saglik.gov.tr/tr/ketem.html`;
const NCCP = `${ARCHIVE}/2025/https://hsgm.saglik.gov.tr/depo/birimler/kanser-db/Dokumanlar/Raporlar/Turkey_NCCP_18_April_2022.pdf`;
const SUT = "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=17229&MevzuatTur=9&MevzuatTertip=5";
const SUT_PDF = "https://www.mevzuat.gov.tr/MevzuatMetin/yonetmelik/9.5.17229.pdf";
const AGO = "https://www.resmigazete.gov.tr/eskiler/2023/05/20230512-32.htm";
const RUHSAT = "https://www.resmigazete.gov.tr/eskiler/2021/12/20211211-5.htm";
const RUHSAT_2022 = "https://www.resmigazete.gov.tr/eskiler/2022/09/20220924-1.htm";
const KOYUNCU = "https://doi.org/10.3389/fphar.2019.01557";
const GULTEKIN = "https://doi.org/10.1016/j.ygyno.2020.04.698";
const SGK_EK4A = "https://www.sgk.gov.tr/duyuru/detay/Bedeli-Odenecek-Ilaclar-Listesinde-Yapilan-Duzenlemeler-Hakkinda-Duyuru-202643-2026-11-04-06-22-08";

export const TR_DIVE: CountryDive = {
  iso2: "TR",
  iso3: "TUR",
  name: "Türkiye",
  flag: "🇹🇷",
  asOf: "2026-11-04",
  title: "Cancer in Türkiye",
  description:
    "Cancer in Türkiye from Turkish sources: the Ministry of Health's registry count of 223,087 new cancers in 2019 and 195,581 in 2020, a population-based registry that has run in all 81 provinces since 2013, a single public insurer whose rules charge no additional fee for cancer treatment, how the Social Security Institution decides which cancer medicines it pays for and makes confidential reimbursement agreements, the national regulator's 210-day licensing clock and its 90-day reliance route, breast, cervical and bowel screening through 318 screening centres, and the national HPV test programme that screened its first four million women.",
  lede:
    "Türkiye counts its cancers through a Ministry of Health registry that collects cases in every province, and its latest published report puts the country at 195,581 new cancers in 2020, a year the pandemic kept many people from being diagnosed. One public insurer pays for cancer care under a single communiqué that bars extra charges for chemotherapy and radiotherapy, and the national cervical screening programme tests for the human papillomavirus at a single visit.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Türkiye is 235,949 new cancers and 113,805 deaths for 2024, including 7,554 non-melanoma skin cancers (228,395 without them). IARC's fact sheet gives its incidence source as subnational registry data, with subnational rates applied to the 2024 population, and does not name the registries; it gives its mortality method as national incidence estimates applied to model-based mortality-to-incidence ratios. The Ministry's own report counts cancers coded C00 to C96 including the other skin cancers (C44): 223,087 in 2019, or 203,389 without the 19,698 other skin cancers, and 195,581 in 2020 (182,984 without them). Those figures come from the 14 provinces whose data pass quality checks, 50.4% of the population in 2019 and 50.6% in 2020, scaled to the national population with crude rates. The Ministry's world-standardised rate for 2019 was 229.2 per 100,000 for both sexes, above GLOBOCAN's 206.0 for 2024, which also includes non-melanoma skin cancer. Leaving aside the other skin cancers, the two differ most for lung cancer (GLOBOCAN 37,846; registry 31,742 in 2019) and thyroid cancer (18,291 against 13,891), and the registry's 2020 figures are about 13% below 2019 because diagnoses fell during the COVID-19 pandemic.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Türkiye",
      aside: { label: "Türkiye Kanser İstatistikleri 2020 (Ministry of Health, PDF, Internet Archive copy)", url: STATS_2020 },
      cards: [
        {
          id: "shape",
          title: "223,087 new cancers in 2019, with lung cancer commonest in men and breast cancer in women",
          plain:
            "The Ministry of Health's registry counted 223,087 new cancers in 2019 and 195,581 in 2020. In men lung cancer is the commonest, then prostate, bowel, bladder and stomach cancer. In women breast cancer is the commonest, about one in four of women's cancers, followed by thyroid, bowel, lung and womb cancer.",
          detail:
            "The Türkiye Kanser İstatistikleri 2020 report, prepared by the cancer department of the General Directorate of Public Health and published in Ankara in 2025, gives a world-standardised incidence of 233.6 per 100,000 men and 162.8 per 100,000 women in 2020, and 198.2 for both sexes, against 264.9, 193.4 and 229.2 in 2019. The five commonest cancers in men in 2020 by standardised rate were lung (51.9 per 100,000), prostate (28.1), colorectal (24.1), bladder (19.1) and stomach (12.7); in women breast (43.4), thyroid (14.0), colorectal (13.3), lung (10.2) and uterine body (9.4). The report states that 30,004 people were diagnosed with lung cancer in 2020, that smoking-related cancers, above all lung cancer, are still very high in men, and that lung cancer incidence is rising in women. Thyroid cancer fell by 31% between 2019 and 2020 against about 13% for all cancers, which the report links to the pandemic, as SEER saw in the United States. Childhood leukaemias are the commonest childhood cancers, followed by lymphomas and central nervous system tumours, and childhood cancer incidence did not fall in 2020.",
          links: [
            { label: "Türkiye Kanser İstatistikleri 2020, Tablo 6 and Sonuç (PDF, Internet Archive copy)", url: STATS_2020 },
            { label: "Türkiye Kanser İstatistikleri 2019, Sonuç (PDF, Internet Archive copy)", url: STATS_2019 },
          ],
        },
        {
          id: "how-counted",
          title: "How the count is made: registry centres in all 81 provinces, 14 of them used for the national figure",
          plain:
            "Türkiye has a national, population-based cancer registry run by the Ministry of Health. Trained registry staff in every province collect each new cancer from hospitals, laboratories and death certificates. The national figures come from the 14 provinces whose data pass quality checks, covering about half the population, and the latest year published is 2020.",
          detail:
            "Cancer was made a notifiable disease in 1982, and active registration began with the İzmir cancer registry centre in 1992, then Antalya six years later. According to the 2020 report, population coverage in the national report was 23.4% until 2012, 47.9% after Gaziantep, Malatya, İstanbul and Mersin were added, and 50.6% in 2020 with 14 provinces after Kocaeli joined in 2016; active registration had started in all 81 provinces from the 2013 reference year. Certified cancer registry staff collect data from every public, university and private hospital in a province, from laboratories, death certificates and places such as nursing homes and palliative care centres, and send them to the registry centre at the provincial health directorate and then to the cancer department, which removes duplicates and builds the national data pool. Quality figures for 2020: 91.8% of cases were histologically verified and 3.3% were known from a death certificate only; 40.9% of 2020 cases had been registered within 12 months of the year's end and 70.9% within 24 months, against international targets of 90% and 95%. The department's statistics page, in its 15 October 2025 archived copy, lists annual reports from 2009 to 2020.",
          links: [
            { label: "Türkiye Kanser İstatistikleri 2020, sections 2.2 and 3 (PDF, Internet Archive copy)", url: STATS_2020 },
            { label: "Kanser İstatistikleri: list of annual reports (Internet Archive copy, 15 October 2025)", url: STATS_PAGE },
            { label: "Turkey Cancer Control Programme, 2021: the 14 provinces with data of enough quality for the report (English, PDF, Internet Archive copy)", url: NCCP },
          ],
        },
        {
          id: "stage-at-diagnosis",
          title: "Stage at diagnosis: most lung and ovarian cancers are found after they have spread",
          plain:
            "The registry records how far each cancer had spread when it was found. In 2020 almost three in five lung cancers and ovarian cancers had already spread to distant organs at diagnosis, while just under half of breast cancers and three in five cervical cancers were found while still confined to where they started.",
          detail:
            "The 2020 report gives SEER summary stage at diagnosis for the commonest cancers: 59.0% of lung cancers had distant metastases, which the report notes means lung cancer is usually diagnosed late; 45.5% of breast cancers were localised; 62.3% of cervical cancers were localised; and 58.9% of ovarian cancers were at a distant stage. For 2019 the same report series gave 54.9% of lung cancers with distant metastases, 48.3% of breast cancers localised and 54.9% of cervical cancers localised. Stage was unknown for 28.9% of the cases in the 2020 database, so these shares describe the cancers whose stage was recorded. The report publishes incidence, not survival; Türkiye's population survival figures appear instead in the international CONCORD-3 study, which used data from nine Turkish registries (Ankara, Antalya, Bursa, Edirne, Erzurum, Eskişehir, İzmir, Samsun and Trabzon).",
          links: [
            { label: "Türkiye Kanser İstatistikleri 2020, sections 3.2, 4.12 and Sonuç (PDF, Internet Archive copy)", url: STATS_2020 },
            { label: "Türkiye Kanser İstatistikleri 2019, Sonuç (PDF, Internet Archive copy)", url: STATS_2019 },
          ],
        },
      ],
      tables: [
        {
          id: "tki-2019-2020",
          title: "New cancers in 2019 and 2020, by site, from the Ministry of Health registry",
          caption: "Estimated national case counts, both sexes unless stated, Türkiye Kanser İstatistikleri 2019 and 2020 (Tablo 6).",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "y2019", label: "New cases, 2019", numeric: true },
            { key: "y2020", label: "New cases, 2020", numeric: true },
          ],
          rows: [
            { site: "All cancers, C00 to C96, including other skin cancers (C44)", y2019: 223087, y2020: 195581 },
            { site: "Trachea, bronchus and lung", y2019: 31742, y2020: 30004 },
            { site: "Breast (women)", y2019: 27280, y2020: 22805 },
            { site: "Colon and rectum", y2019: 20062, y2020: 18825 },
            { site: "Prostate", y2019: 17769, y2020: 13111 },
            { site: "Thyroid", y2019: 13891, y2020: 9461 },
            { site: "Bladder", y2019: 11620, y2020: 10621 },
            { site: "Stomach", y2019: 10379, y2020: 9143 },
            { site: "Cervix", y2019: 2374, y2020: 2464 },
          ],
          note: "The counts are the registry's own national estimates: rates measured in 14 provinces covering about half the population, multiplied by the national population, not a count of every case in the country. The 2020 figures are lower than 2019 for most sites because fewer people were diagnosed during the COVID-19 pandemic; childhood cancers and cervical cancer did not fall. Men and women are summed from the report's sex-specific columns.",
          sources: [
            { label: "Türkiye Kanser İstatistikleri 2019, Tablo 6 (PDF, Internet Archive copy)", url: STATS_2019 },
            { label: "Türkiye Kanser İstatistikleri 2020, Tablo 6 (PDF, Internet Archive copy)", url: STATS_2020 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one public insurer and one rulebook",
      aside: { label: "Sosyal Güvenlik Kurumu Sağlık Uygulama Tebliği (mevzuat.gov.tr)", url: SUT },
      cards: [
        {
          id: "gss",
          title: "General health insurance, run by the Social Security Institution under one communiqué",
          plain:
            "Public payment for cancer care in Türkiye goes through genel sağlık sigortası, the general health insurance run by the Social Security Institution (SGK). What it pays for, which doctors may prescribe a cancer medicine and on what report, and what the patient pays are all written in a single document, the Health Implementation Communiqué, which is amended in the Official Gazette.",
          detail:
            "The Sosyal Güvenlik Kurumu Sağlık Uygulama Tebliği (SUT) states its purpose as setting out how people covered by general health insurance under Law 5510 benefit from the health services the institution finances, and the prices the Health Services Pricing Commission sets for them; its legal bases are Law 5502 on the Social Security Institution, Law 5510 and the general health insurance implementing regulation. The consolidated text on mevzuat.gov.tr read for this page includes amendments up to the Official Gazette of 2 October 2026. Care is provided by Ministry of Health hospitals, university hospitals and contracted private hospitals, which bill the institution through its MEDULA system under the SUT's rules. For people insured under article 60(1)(c), subparagraphs 1 to 3, of Law 5510, the SUT provides that patient contributions they have paid are refunded on request by the social assistance and solidarity foundations.",
          links: [
            { label: "Sağlık Uygulama Tebliği, sections 1.1 to 1.3 and 1.8 (consolidated PDF, mevzuat.gov.tr)", url: SUT_PDF },
          ],
        },
        {
          id: "what-patient-pays",
          title: "What a patient pays: no extra fee for chemotherapy or radiotherapy, and hospital-supplied chemotherapy",
          plain:
            "Private hospitals that contract with the insurer may normally charge patients an additional fee on top of what the insurer pays, but not for cancer treatment: chemotherapy, radiotherapy and radioisotope treatment are on the list of services with no additional fee. Medicines given in hospital carry no patient contribution, and listed chemotherapy medicines must be supplied by the hospital.",
          detail:
            "Section 1.9.1 of the SUT lets contracted foundation universities and second and third level private providers take an additional fee (ilave ücret) from patients up to a rate the institution sets; section 1.9.3 lists services for which no additional fee may be taken at all, among them emergencies, intensive care, burns, newborn care, transplants and cancer treatment (radiotherapy, chemotherapy and radioisotope treatments). Section 1.8.2 sets a contribution on outpatient medicines of 10% for people who receive a pension or income from the institution and their dependants and 20% for others, plus 3.76 lira per prescription for up to three boxes and 1.25 lira for each further box, in the text amended on 31 December 2025. Section 1.8.5 removes the medicine contribution for medicines used in inpatient treatment and, with a health report, for those on the exemption list EK-4/D. Section 4.1.11 provides for a published list, EK-4/H, of chemotherapy medicines that hospitals are obliged to supply, and section 4.1.2 requires medicines used in inpatient and day-case treatment to be supplied by the hospital; where a hospital cannot supply one, section 4.1.2 lets a contracted pharmacy dispense it on a prescription carrying the chief physician's approval. Outpatient chemotherapy is dispensed one cycle at a time, or at most three months' supply, on a report showing the treatment protocol (section 4.2.14).",
          links: [
            { label: "Sağlık Uygulama Tebliği, sections 1.8, 1.9, 4.1.2, 4.1.11 and 4.2.14 (consolidated PDF)", url: SUT_PDF },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Drug funding",
      title: "How the insurer decides which cancer medicines it pays for",
      aside: { label: "Alternatif Geri Ödeme Yönetmeliği (Resmî Gazete, 12 May 2023)", url: AGO },
      cards: [
        {
          id: "reimbursed-list",
          title: "A medicine is paid for only if it is on the list, and only on the conditions the communiqué sets",
          plain:
            "The insurer pays for a medicine only if it appears on its list of reimbursed medicines, which it changes in numbered announcements throughout the year. For cancer medicines the communiqué also sets who may prescribe, on what kind of report and for which indications, and using a medicine outside its licence needs an approval from the Ministry of Health.",
          detail:
            "Section 4.1.9 of the SUT says the medicines the institution pays for are those on the Bedeli Ödenecek İlaçlar Listesi (EK-4/A) on its website, and that a medicine whose trade name and barcode are not on the list is not paid for under any circumstances; the institution's announcement 2026/43 of changes to the list was published on 4 November 2026. Section 4.2.14 sets the rules for cancer medicines: older cytotoxic medicines such as cisplatin, carboplatin and tamoxifen can be prescribed on a specialist's protocol report without regard to indication; a second group, including docetaxel, paclitaxel, capecitabine and irinotecan, needs a health board report; and targeted medicines carry conditions written medicine by medicine. Trastuzumab, for example, is paid for in HER2-positive metastatic breast cancer on a medical oncology health board report and stopped on progression, and in early breast cancer for 9 weeks, extended to a total of no more than 52 weeks on three-month reports that include an echocardiogram. Section 4.1.4 makes any use outside the approved indication or dose subject to a Ministry of Health off-label approval, patient by patient where the off-label guide does not cover it, and states that an indication in the licence that the commissions have not taken into reimbursement is not paid for.",
          links: [
            { label: "Sağlık Uygulama Tebliği, sections 4.1.4, 4.1.9 and 4.2.14 (consolidated PDF)", url: SUT_PDF },
            { label: "SGK: Bedeli Ödenecek İlaçlar Listesinde yapılan düzenlemeler, duyuru 2026/43", url: SGK_EK4A },
          ],
        },
        {
          id: "alternative-reimbursement",
          title: "Confidential agreements: the alternative reimbursement commission",
          plain:
            "For medicines it would not otherwise pay for on standard terms, the insurer can sign an alternative reimbursement agreement with the company: a confidential discount, a cap on budget or on patient numbers, or a purchase guarantee. A commission of six senior officials from the insurer, the Ministry of Health, the Presidency's budget office and the Treasury decides them.",
          detail:
            "The Sosyal Güvenlik Kurumu Genel Sağlık Sigortası Alternatif Geri Ödeme Yönetmeliği, in force since its publication on 12 May 2023 and replacing a regulation of 10 February 2016, defines an alternative reimbursement model as bringing a health service into payment according to the financial or medical benefit it brings, outside the standard rules, through models such as a discount rate other than the standard public discounts, a budget or patient-number limit, or a purchase guarantee. The commission has six full members: the President of the Social Security Institution as chair, the General Director of General Health Insurance, one member each from the Presidency of Strategy and Budget and the Ministry of Health and two from the Ministry of Treasury and Finance, these four at least at head-of-department level. It meets at least twice a year, in June and December, decides the model and the contract, whether to keep the price and model confidential at the company's request, and whether to exempt the medicine from patient contributions. The SUT refers to applications under this regulation and the İlaç Geri Ödeme Yönetmeliği as the route by which new indications are taken into reimbursement. Neither text sets a cost-effectiveness threshold.",
          links: [
            { label: "Alternatif Geri Ödeme Yönetmeliği, articles 1 to 7 and 11 (Resmî Gazete, 12 May 2023)", url: AGO },
            { label: "Sağlık Uygulama Tebliği, sections 2.2 and 4.1.4 (consolidated PDF)", url: SUT_PDF },
          ],
        },
        {
          id: "imports",
          title: "A medicine not sold in Türkiye can be imported for one patient and paid for",
          plain:
            "If a medicine a patient needs is not available in Türkiye, the Ministry of Health can approve importing it, and the Turkish Pharmacists' Association brings it in under a protocol with the insurer. The insurer pays if the medicine is on its foreign medicines price list; a third-level public hospital's health board report and prescription start the request to add one.",
          detail:
            "Section 4.3 of the SUT allows medicines that cannot be obtained in Türkiye to be brought from abroad when the Ministry of Health approves that the medicine is not available domestically and its use is essential, and states that a protocol between the Turkish Pharmacists' Association (Türk Eczacıları Birliği) and the institution is in force for this; protocols with other parties authorised by the Ministry are possible. If the Ministry publishes a list of medicines that may be imported, no separate approval is needed for those. The institution pays only for imported medicines on the Yurt Dışı İlaç Fiyat Listesi (EK-4/C). To have a medicine added to that list, a health board report and a prescription issued at a third-level public provider must be submitted. A patient who obtains a listed medicine by their own means is reimbursed by bank transfer, up to what the same medicine costs the institution. The patient contribution for imported medicines is collected by the organisation that supplies them.",
          links: [
            { label: "Sağlık Uygulama Tebliği, section 4.3 (consolidated PDF)", url: SUT_PDF },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: national licensing, with a priority board and a reliance route",
      aside: { label: "Beşeri Tıbbi Ürünler Ruhsatlandırma Yönetmeliği (Resmî Gazete, 11 December 2021)", url: RUHSAT },
      cards: [
        {
          id: "titck-licensing",
          title: "Every cancer medicine needs a Turkish licence: a 210-day clock that starts four times a year",
          plain:
            "Türkiye is not in the European Union's single approval system, so a cancer medicine approved in Europe or the United States still needs a licence from the Turkish Medicines and Medical Devices Agency. Companies can apply at any time, but the licensing process starts only in February, May, August and November, and is then to be completed within 210 days.",
          detail:
            "The TİTCK was established by Decree-Law 663 of 2 November 2011 as an agency of the Ministry of Health with its own budget. Under the Beşeri Tıbbi Ürünler Ruhsatlandırma Yönetmeliği of 11 December 2021 (article 12), applications may be made all year but the licensing process can only be started in February, May, August and November, taking the agency's licensing capacity into account. The agency checks a dossier for completeness within 30 days, the company has 30 days to fill any gaps, and a second check takes another 30 days. Article 14 then sets 210 days for the licensing process, with the clock stopped while the agency waits for information it has requested and excluding laboratory testing, assessment by outside bodies and public holidays. Article 15 lets the Priority Evaluation Board (Öncelik Değerlendirme Kurulu) move applications ahead of the queue for products that are first in treatment or diagnosis, innovative, or strategically needed for public health, within times set in the agency's prioritisation guideline. The board also decides which products may apply for a conditional or exceptional licence.",
          links: [
            { label: "Beşeri Tıbbi Ürünler Ruhsatlandırma Yönetmeliği, articles 4 and 12 to 15 (Resmî Gazete)", url: RUHSAT },
            { label: "TİTCK: tarihçe", url: "https://www.titck.gov.tr/kurumsal/tarihce" },
          ],
        },
        {
          id: "reliance-and-times",
          title: "A 90-day route that relies on other regulators, and the last published approval times",
          plain:
            "Since September 2022 the regulator may take into account assessments already made by other regulators with comparable standards, and for those applications the licensing period is 90 days rather than 210. The most recent published measure of how long approval actually takes, for 2016 to 2018, found a median of 663 days for new medicines in 2018.",
          detail:
            "The amendment published in the Resmî Gazete on 24 September 2022 added article 37/A, headed Güven (reliance): previous assessments by other medicines authorities or by regional or international bodies with comparable standards may be taken into account in line with a guideline the agency publishes; and it amended article 14 so that the 210-day licensing period is 90 days for applications made under article 37/A. A December 2023 amendment added that an application is rejected on substance if information the agency requests is not supplied within 30 days. The only published measurement of actual times found for this page is a study in Frontiers in Pharmacology: for new active substances the median time from submission to approval rose from 529 calendar days in 2016 to 663 in 2018, while the agency's own review time fell from 408 to 326 days and company time rose from 137 to 268 days. That study predates the 2021 regulation and the reliance route, and no later official average for cancer medicines was found.",
          links: [
            { label: "Amendment adding article 37/A (Resmî Gazete, 24 September 2022)", url: RUHSAT_2022 },
            { label: "Amendment of 26 December 2023 (Resmî Gazete)", url: "https://www.resmigazete.gov.tr/eskiler/2023/12/20231226-7.htm" },
            { label: "Koyuncu et al., Evaluation of the Performance of the Turkish Regulatory Agency (Front Pharmacol 2020)", url: KOYUNCU },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: three national programmes and 318 screening centres",
      aside: { label: "Kanser Taramaları, Ministry of Health (Internet Archive copy, 7 November 2025)", url: SCREENING },
      cards: [
        {
          id: "programmes",
          title: "Mammography from 40, an HPV test from 30 and a stool test from 50, through family doctors and screening centres",
          plain:
            "Türkiye screens for the three cancers the World Health Organization recommends. Women aged 40 to 69 are offered a mammogram every two years, women aged 30 to 65 an HPV test every five years, and men and women aged 50 to 70 a stool test for hidden blood every two years and a colonoscopy every ten years. The tests are offered through family doctors and 318 KETEM screening centres.",
          detail:
            "The Ministry of Health's screening page lists, for breast cancer, advice on monthly self-examination, a clinical breast examination every year and a mammogram every two years for women aged 40 to 69; for cervical cancer, an HPV DNA test every five years for women aged 30 to 65; and for colorectal cancer, a faecal occult blood test every two years and a colonoscopy every ten years for men and women aged 50 to 70. The department's list of Kanser Erken Teşhis, Tarama ve Eğitim Merkezleri (KETEM), dated 29 January 2025, names 318 centres in all 81 provinces, with their addresses and telephone numbers. The 2021 Turkey Cancer Control Programme states that screening mammography is free of charge under a Ministry regulation, that family physicians were integrated into screening in 2013, and that mobile screening units visit neighbourhoods, with films read centrally and women told of suspicious results. Cervical screening moved from smears to HPV testing in 2014, with reference laboratories in Ankara and İstanbul, and was extended to all 81 provinces the same year.",
          links: [
            { label: "Kanser Taramaları (Internet Archive copy, 7 November 2025)", url: SCREENING },
            { label: "KETEM adresleri (Internet Archive copy, 8 October 2025)", url: KETEM },
            { label: "Turkey Cancer Control Programme, 2021 (English, PDF, Internet Archive copy)", url: NCCP },
          ],
        },
        {
          id: "coverage",
          title: "How many people take part: the last published figures are below the 70% target",
          plain:
            "The 2021 national cancer programme gives 70% as the coverage that cervical and bowel screening need to reach. The figures it published were well below that: about one in five eligible women had been screened under the old smear programme, and bowel screening coverage was 30% to 40%. A newer national coverage figure was not found.",
          detail:
            "The 2021 Turkey Cancer Control Programme says that the smear-based cervical programme, run at KETEM centres for women aged 30 to 65 every five years, could not reach its 70% coverage target: 20% of the women planned to be screened were screened, which led to the December 2012 decision to switch to primary HPV testing. For colorectal cancer it states that coverage is between 30% and 40% and that a coverage of at least 70% must be achieved for screening to work, among the performance indicators for cervical screening it lists coverage of at least 70%, and its chapter on the principles of screening says participation of more than 70% of the target population is essential. No national coverage figure for breast screening was found in it; it describes mammography as offered to women who come to KETEM centres, hospital breast clinics, private hospitals and oncology institutes after invitations through the media, family doctors and sometimes the system. These figures date from before the programme's 2021 publication, and no later national participation figure for any of the three programmes was found on the Ministry's pages.",
          links: [
            { label: "Turkey Cancer Control Programme, 2021, screening chapters (English, PDF, Internet Archive copy)", url: NCCP },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Türkiye does",
      title: "What Türkiye does that others do not",
      cards: [
        {
          id: "hpv-single-visit",
          title: "A national HPV screening programme that does the test and the triage at one visit",
          plain:
            "Since 2014 Türkiye has screened women for cervical cancer with an HPV test, taking the smear for triage at the same visit so that a woman with a positive result does not need a second appointment before referral. By the time of a 2020 report, 4,099,230 women had been screened this way and 4.39% had tested positive.",
          detail:
            "The programme's results in Gynecologic Oncology report that women over 30 were invited for HPV DNA testing and conventional cytology, using a single-visit strategy to collect samples for both screening and triage (extended genotyping and a Pap smear). Of 4,099,230 women, 4.39% were HPV DNA positive; the commonest type was 16, then 51, 31, 52, 56 and 18, at every age and in every region. Cytology was normal in 69.2% and inadequate in 16.6%. The Turkish referral rule, colposcopy for HPV 16 or 18 or any smear abnormality of ASC-US or worse, gave a positive predictive value of 24.3% for CIN2 or worse. The authors describe it as the largest series in the world summarising real-world experience with primary HPV DNA screening and triage at a single visit, and conclude that it shows the method is feasible in developing countries with acceptable colposcopy referral rates. The 2021 cancer control programme adds that a new algorithm was introduced in 2020.",
          links: [
            { label: "Gultekin et al., How to triage HPV positive cases: results of four million females (Gynecol Oncol 2020)", url: GULTEKIN },
            { label: "Turkey Cancer Control Programme, 2021, cervical screening (PDF, Internet Archive copy)", url: NCCP },
          ],
        },
        {
          id: "izmir-hub",
          title: "A cancer registry that trains other countries' registries",
          plain:
            "The İzmir cancer registry, Türkiye's first, is a regional hub of the International Agency for Research on Cancer. Since 2013 it has been charged with training and advising cancer registries in about thirty countries across North Africa, the Middle East and Central and Western Asia. Ten Turkish registries now meet the quality bar for IARC's reference series on cancer incidence.",
          detail:
            "The 2021 Turkey Cancer Control Programme says the İzmir Cancer Registry Center was established in 1992 as Türkiye's first community-based registry, published its first data in 2001, and officially became a Regional Hub of IARC on 9 October 2013 under a protocol between the Public Health Agency of Turkey and IARC, within the Global Initiative for Cancer Registry Development, after the hub in Mumbai. It was commissioned to provide training, technical support and scientific advice for cancer registries in 30 countries in Asia, the Middle East and North Africa. The 2020 statistics report records that IARC's Cancer Incidence in Five Continents, which only includes registries that pass its quality assessment, carried İzmir and Antalya data in volume 9, added Trabzon and Edirne in volume 10, Bursa, Erzurum, Eskişehir and Samsun in volume 11, and Malatya and Gaziantep in volume 12, ten provinces in all.",
          links: [
            { label: "Turkey Cancer Control Programme, 2021, section 6.2.1 (PDF, Internet Archive copy)", url: NCCP },
            { label: "Türkiye Kanser İstatistikleri 2020, section 2.2 (PDF, Internet Archive copy)", url: STATS_2020 },
          ],
        },
        {
          id: "bahcesehir",
          title: "A ten-year test of invited mammography screening in an İstanbul district",
          plain:
            "To find out whether organised, invitation-based breast screening could work in Türkiye, a project in Bahçeşehir, İstanbul visited about 20,000 homes and invited women aged 40 to 69 for mammograms from 2009 to 2019. About 85% took part, and its authors calculated that it was cost-effective by the World Health Organization's yardstick.",
          detail:
            "The 2021 Turkey Cancer Control Programme describes the Bahçeşehir Community-Based Mammographic Screening Project: about 20,000 houses in Bahçeşehir and four surrounding neighbourhoods were visited and eligible women registered, then invited to a screening centre for examination by a breast surgeon and two-view digital mammography read by two independent radiologists. Between 2009 and 2019, 8,823 women aged 40 to 69 had 27,754 screenings, with participation around 85%, and 130 breast cancers were found, 51 (39.2%) in women aged 40 to 49; 17 (13.1%) were ductal carcinoma in situ, 81% of patients had breast-conserving surgery and 60% were at pathological stage 0 or I. The programme reports a 10-year survival of 96.9% for screen-detected patients against 76% for symptomatic patients in the Turkish Federation of Breast Diseases Societies registry, and an incremental cost-effectiveness ratio of 1,897 US dollars per life-year, 15% of 2014 income per head. Screen-detected and symptomatic patients differ in more than screening, so the survival comparison overstates what screening alone achieves.",
          links: [
            { label: "Turkey Cancer Control Programme, 2021, breast screening chapter (PDF, Internet Archive copy)", url: NCCP },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and clinical trials",
      cards: [
        {
          id: "trials-in-turkey",
          title: "567 cancer trials in OnCo with a site in Türkiye, almost all run by international companies",
          plain:
            "Of the cancer trials in OnCo's records, 567 list a site in Türkiye, and 186 of them were recruiting when last checked. Three in four are phase 3 trials, most sponsored by large international companies, and lung cancer is the commonest subject. For a patient in Türkiye, asking a large hospital's oncology department about a trial is a realistic question.",
          detail:
            "OnCo counts trial records whose ClinicalTrials.gov locations include Turkey (Türkiye): 567 when recounted on 17 November 2026, of which 421 are phase 3, 79 phase 2, 42 phase 1/2 and 24 phase 2/3; 186 were recruiting at the last registry check, and OnCo's own status field marks 197 as active and 126 as having reported a positive result. Non-small-cell lung cancer is the first-listed cancer in 139 of them; among the other named cancer types the commonest are prostate (37), hormone receptor-positive breast (29) and myeloma (24). AstraZeneca sponsors 76 and Merck Sharp & Dohme 71 under its two spellings; no trial in this set is sponsored by a Turkish institution, which reflects what OnCo has recorded rather than all Turkish research. Across all conditions, ClinicalTrials.gov listed 27,197 studies with a location in Türkiye on 4 November 2026. OpenAlex, counting every paper with at least one Turkish author, records 1,842 oncology papers in 2021 and 2,209 in 2025 (OnCo's OpenAlex country file, built on 8 September 2026).",
          links: [
            { label: "ClinicalTrials.gov: cancer studies in Türkiye", url: "https://clinicaltrials.gov/search?cond=Cancer&locStr=Turkey&country=Turkey" },
            { label: "OpenAlex", url: "https://openalex.org" },
          ],
        },
        {
          id: "centres",
          title: "University cancer institutes and three members of the European cancer institutes network",
          plain:
            "Several Turkish universities run oncology institutes, such as Hacettepe University's in Ankara and İstanbul University's. The Organisation of European Cancer Institutes lists three Turkish associate members: Anadolu Medical Center near İstanbul, Dokuz Eylül University Institute of Oncology in İzmir, and the state Türkiye Cancer Institute.",
          detail:
            "OnCo's records for the Hacettepe University Cancer Institute in Ankara and the İstanbul University Institute of Oncology describe institutes that combine medical, radiation and paediatric oncology with preventive oncology and epidemiology. OnCo's copy of the OECI membership list names Anadolu Sağlık Merkezi in Gebze, Dokuz Eylül Üniversitesi Onkoloji Enstitüsü in İzmir, and the Türkiye Kanser Enstitüsü, whose listed website is that of the Health Institutes of Türkiye (TÜSEB), as associate members. The Ministry's 2020 statistics report thanks by name the staff of the 14 provincial cancer registry centres behind the national figures: Ankara, Antalya, Bursa, Edirne, Erzurum, Eskişehir, Gaziantep, İstanbul, İzmir, Kocaeli, Malatya, Mersin, Samsun and Trabzon. Turkish research funding through TÜBİTAK and the Turkish Oncology Group's trials were not researched for this page.",
          links: [
            { label: "OECI: membership", url: "https://www.oeci.eu/Membership.aspx" },
            { label: "Hacettepe University Cancer Institute", url: "https://www.kanser.hacettepe.edu.tr" },
            { label: "İstanbul University Institute of Oncology", url: "https://onkoloji.istanbul.edu.tr/en/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "tuik-deaths",
      title: "Cancer deaths: the TÜİK bulletin read gives a share, not a count, and its 2025 bulletin was not read",
      plain:
        "The Turkish Statistical Institute publishes deaths by cause every year. Its 2024 bulletin, read from an archived copy, says benign and malignant tumours caused 16.3% of the 489,361 deaths in Türkiye in 2024, second after diseases of the heart and circulation. Its text does not give a number of cancer deaths, and the 2025 bulletin was not found. The death figure in the GLOBOCAN note on this page is IARC's model-based estimate.",
      detail:
        "The Ölüm ve Ölüm Nedeni İstatistikleri, 2024 bulletin (TÜİK, 19 June 2025), read from the Internet Archive's copy of 20 June 2025, reports 489,361 deaths in 2024: 36.0% from diseases of the circulatory system, 16.3% from benign and malignant tumours and 15.0% from diseases of the respiratory system. Of the deaths from tumours, 29.1% were from malignant tumours of the larynx, trachea, bronchus and lung, 8.0% from malignant tumours of the colon and 7.8% from malignant tumours of lymphoid and blood-forming tissue. The tumour share includes benign tumours, and the bulletin's text gives no count of cancer deaths, so none is calculated here. data.tuik.gov.tr now redirects to veriportali.tuik.gov.tr, which returned only a page asking for JavaScript to a plain request on 4 November 2026, so a bulletin for 2025 was not read. GLOBOCAN 2024's 113,805 deaths are an estimate: IARC's fact sheet gives its method as national incidence estimates applied to model-based mortality-to-incidence ratios, so they should not be read as a count.",
      links: [
        { label: "TÜİK: Ölüm ve Ölüm Nedeni İstatistikleri, 2024 (Internet Archive copy, 20 June 2025)", url: "https://web.archive.org/web/20250620204922/https://data.tuik.gov.tr/Bulten/Index?p=Olum-ve-Olum-Nedeni-Istatistikleri-2024-54195&dil=1" },
        { label: "TÜİK veri portalı", url: "https://veriportali.tuik.gov.tr/" },
      ],
    },
    {
      id: "ministry-site",
      title: "The Ministry's cancer pages were read from archived copies",
      plain:
        "The Ministry of Health's public health website did not answer any scripted request while this page was written, so every Ministry page and report here was read from a dated Internet Archive copy. The latest registry report in those copies covers 2020; a report for 2021 or later may exist and was not found.",
      detail:
        "hsgm.saglik.gov.tr timed out on every request on 4 November 2026. The statistics page, screening page, KETEM list, duties page and contact page were read from Internet Archive copies made between 8 October and 7 November 2025, and the 2019 and 2020 statistics reports and the 2021 cancer control programme from the archive's stored PDFs. The Turkish edition of the cancer control programme (17 August 2021) came back truncated and unreadable, so the English edition of 18 April 2022 was used. Survival by cancer type is not published in the Ministry's annual report and is not on this page.",
      links: [{ label: "Kanser İstatistikleri (Internet Archive copy, 15 October 2025)", url: STATS_PAGE }],
    },
    {
      id: "coverage-figures",
      title: "Not found: current screening participation, insurance coverage and the contribution-exempt list",
      plain:
        "Three things a patient would want to know were not found in a form this page could verify: how many eligible people are screened now, how many people are covered by general health insurance, and exactly which cancer medicines are on the insurer's list of medicines exempt from patient contributions.",
      detail:
        "The last national screening coverage figures found are those in the 2021 cancer control programme (20% under the old cervical smear programme, 30% to 40% for bowel screening, none for breast). The share of the population covered by general health insurance was not found in a primary source. The SUT names the exemption list EK-4/D and the hospital chemotherapy list EK-4/H but publishes them separately on the institution's website, and they were not read, so this page does not say which cancer medicines are exempt from the outpatient contribution.",
      links: [{ label: "Sağlık Uygulama Tebliği (mevzuat.gov.tr)", url: SUT }],
    },
    {
      id: "access-times",
      title: "Not found: an official time from licence to reimbursement, or a cost-effectiveness threshold",
      plain:
        "How long a new cancer medicine takes to be paid for after it is licensed in Türkiye was not found in what the regulator or the insurer publish, and the reimbursement texts read for this page set no cost-effectiveness threshold. The only measured approval times found are for 2016 to 2018.",
      detail:
        "The licensing regulation sets 210 days, or 90 under the reliance route, for the licensing process itself, but a clock that stops for company responses is not the time a patient waits; the 2020 study found a median of 663 days for new active substances in 2018. Reimbursement then depends on the reimbursement and alternative reimbursement commissions. The insurer announces changes to the list of reimbursed medicines in numbered notices; no published assessment or date of application for a medicine was found. The İlaç Geri Ödeme Yönetmeliği, which governs the standard reimbursement route, was not read for this page.",
      links: [{ label: "Alternatif Geri Ödeme Yönetmeliği (Resmî Gazete)", url: AGO }, { label: "Koyuncu et al. (Front Pharmacol 2020)", url: KOYUNCU }],
    },
  ],
  institutions: [
    "tr-cancer-department", "sgk-turkiye", "titck", "hacettepe-cancer-institute", "istanbul-oncology-institute", "dokuz-eylul-institute-of-oncology", "anadolu-medical-center",
  ],
  companies: ["astrazeneca", "merck", "bms", "novartis", "amgen", "abbvie", "pfizer"],
  drugs: [],
  trials: [
    "adaura", "alina", "caspian", "checkmate-649", "crown", "bruin-cll-321", "amaros",
    "nct06767514", "nct06712355", "nct07513376", "nct07185997", "nct06532006", "nct07221253", "nct06921785", "nct06079671", "rejoice-ovarian01", "nct06790693",
    "pik3ca-2", "nct06520345", "nct07218380", "nct06319820", "nct07489495", "nct07518186", "nct06846671", "nct06742996", "nct06051409", "nct03459534", "nct06093672",
  ],
  papers: ["paper-gultekin-hpv-triage-gynecol-oncol-2020", "paper-koyuncu-titck-review-front-pharmacol-2020"],
  people: ["kadir-mutlu-hayran", "refik-emre-cecen", "timur-atsuren"],
  how:
    "Every card was written from Turkish official sources read in Turkish: the Ministry of Health cancer department's Türkiye Kanser İstatistikleri 2019 and 2020 reports, its screening, KETEM and duties pages and its 2021 cancer control programme (read in English, from dated Internet Archive copies), the consolidated Sağlık Uygulama Tebliği, the Alternatif Geri Ödeme Yönetmeliği and the Beşeri Tıbbi Ürünler Ruhsatlandırma Yönetmeliği with its amendments from the Resmî Gazete, and the TİTCK and SGK websites. Each figure was checked against the raw text of the PDF or page rather than a summary, and the two papers were resolved through Crossref and Europe PMC. The trial counts come from OnCo's own ClinicalTrials.gov records and OnCo's OpenAlex country file. The new records added for this page are the cancer department, the Social Security Institution, the TİTCK and two papers.",
  verify:
    "Registry figures are national estimates scaled from 14 provinces, and 2020 is depressed by the pandemic. The SUT is amended often by notices in the Official Gazette, so contribution amounts and the conditions for any cancer medicine can change between readings. Before relying on whether a medicine is paid for, check the current list of reimbursed medicines and the SUT conditions with the hospital pharmacy or the treating oncologist.",
  verifyLinks: [
    { label: "Sağlık Uygulama Tebliği (mevzuat.gov.tr)", url: SUT },
    { label: "SGK announcements on the list of reimbursed medicines", url: SGK_EK4A },
    { label: "KETEM screening centre addresses (Internet Archive copy)", url: KETEM },
    { label: "TİTCK", url: "https://www.titck.gov.tr" },
  ],
};
