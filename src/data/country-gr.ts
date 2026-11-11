import type { CountryDive } from "@/data/country-dive";

/**
 * Greece deep dive: the hand-written cards for /countries/gr/ (wave 5). Sources were read from their raw text, not
 * from a summary of them, on 11 November 2026. In English: the OECD and European Commission's Country Cancer Profile
 * Greece 2025 (pdftotext of the JRC copy), Eurostat's causes-of-death table for Greece (the statistics API), the World
 * Bank's health expenditure indicators (its API) and IARC's GLOBOCAN 2024 fact sheet for Greece. In Greek: Law
 * 4931/2022 as published by the national insurer, the medicines regulator's own profile, the insurer's and the
 * e-government company's pages, and news reports of the ministerial decision founding the national registry and of
 * the Ministry of Health's screening figures (News4Health, CNN Greece), each labelled as a report. The Ministry of
 * Health's site and the Prolamvano programme site did not answer scripts, and the Hellenic Parliament's documents
 * refused them, so ministry figures are quoted as the press reported them. Every figure below is quoted from one of
 * those; where a figure could not be read it is named under `gaps`.
 */
const CCP = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-el-2024-1669-en.pdf";
const CCP_EL = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-2024-1669-Greece-el.pdf";
const EUROSTAT_CD = "https://ec.europa.eu/eurostat/databrowser/view/hlth_cd_aro/default/table";
const IARC_FS = "https://gco.iarc.who.int/media/globocan/factsheets/populations/300-greece-fact-sheet.pdf";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=GR";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=GR";
const LAW_4931 = "https://www.eopyy.gov.gr/media/ysyftfes/systasi-ed_ar5-n4931_2022.pdf";
const EOF_PROFILE = "http://old.eof.gr/assets/EOF_Profile.pdf";
const EOPYY_FYK = "https://www.eopyy.gov.gr/el/simeia-apostolis-farmakon-ypsilou-kostous/";
const REG_2024 = "https://www.news4health.gr/politiki-ygeias/to-ethniko-mitro-o-neoplasion-epitelous-thesmothetithike";
const REG_2025 = "https://www.news4health.gr/politiki-ygeias/se-leitourgia-to-ethniko-mitroo-neoplasmatikon-astheneion-se-poious-apefthynetai";
const REG_LAUNCH = "https://www.news4health.gr/politiki-ygeias/enarksi-tou-mitroou-neoplasion-ti-allazei-sti-diaxeirisi-tou-karkinou";
const PROL_2024 = "https://www.cnn.gr/ellada/story/416819/prolamvano-dorean-proliptikes-eksetaseis-gia-treis-morfes-karkinou-kai-gia-ta-kardiaggeiaka";
const PROL_2025 = "https://www.cnn.gr/ellada/story/485452/programma-prolamvano-pano-apo-3-6-ekat-polites-pragmatopoiisan-tis-provlepomenes-eksetaseis";

export const GR_DIVE: CountryDive = {
  iso2: "GR",
  iso3: "GRC",
  name: "Greece",
  flag: "🇬🇷",
  asOf: "2026-11-11",
  title: "Cancer in Greece",
  description:
    "Cancer in Greece from Greek and European sources: 29,318 cancer deaths registered in 2023, a national registry of cancer patients founded in 2024 that has published no figures yet, one public insurer with out-of-pocket payments at about a third of health spending, more than 550 days from EU authorisation to a reimbursement decision, and free screening for breast, cervical and bowel cancer by text message under the Prolamvano programme since 2024.",
  lede:
    "Greece counts its cancer deaths, 29,318 in 2023, but has not yet published a count of its new cancers: a national registry of patients was founded in 2024 and went into production in 2025. Fewer cancers are diagnosed than the EU average, yet cancer mortality fell far more slowly than elsewhere in the EU over the decade to 2021, and patients pay a large share of their care themselves. Since 2024 the state has invited millions of people by text message to free screening for breast, cervical and bowel cancer.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Greece is 63,549 new cancers and 31,965 deaths in 2024, labelled ICD-10 C00-97 and including 1,315 non-melanoma skin cancers (62,234 without them). Greece has no published national count of new cancers to compare: the national registry of patients with neoplastic diseases, founded in 2024 and in production since February 2025, had published no figures that could be found, and the OECD and European Commission's 2025 profile uses the European Cancer Information System's model estimate of 63,176 new cancers expected in 2022, excluding non-melanoma skin cancer. Deaths are counted: the Hellenic Statistical Authority's figures, as published by Eurostat, record 29,318 deaths from malignant cancers (C00-C97) in Greece in 2023, 22.9% of all deaths. GLOBOCAN's modelled 31,965 deaths for 2024 is about 9% higher, and the gap for lung cancer is 7,174 against 6,540 registered. Neither source explains the difference, so it is stated here rather than explained. GLOBOCAN's rates use the world standard population and the OECD's use the 2013 European standard, so the rates in the two cannot be compared with each other.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Greece",
      aside: { label: "OECD/EC: Country Cancer Profile Greece 2025 (PDF)", url: CCP },
      cards: [
        {
          id: "shape",
          title: "About 29,000 cancer deaths a year, more than a fifth of them from lung cancer",
          plain:
            "Greece registered 29,318 deaths from cancer in 2023, a little under one death in four. Lung cancer caused 6,540 of them, far more than any other cancer, followed by bowel, breast and pancreatic cancer. Fewer cancers are diagnosed in Greece than the EU average, but the death rate is slightly above it.",
          detail:
            "Eurostat's causes-of-death table, built from the Hellenic Statistical Authority's death registrations, records 29,318 deaths from malignant cancers (C00-C97) in Greece in 2023, out of 128,218 deaths from all causes, or 22.9%. Lung cancer caused 6,540 (22.3%), colon, rectum and anus 2,884, breast 2,094 (both sexes) and pancreas 2,038. The OECD and European Commission's 2025 profile gives an age-standardised cancer mortality rate of 239 per 100,000 in 2021, slightly above the EU average of 235, with men at 326 against 308 and women at 170 against 184, and, citing the Hellenic Statistical Authority, says that almost a quarter of cancer deaths were from lung cancer. Incidence is lower: using the European Cancer Information System's estimate for 2022, the profile puts the age-standardised rate at 529 per 100,000 against an EU average of 571, with only three EU countries lower. The commonest cancers estimated for men are prostate (20%), lung (18%), colorectal (12%) and bladder (12%), and for women breast (33%), colorectal (12%), lung (8%) and corpus uteri (7%). The system expects cases to rise by 11% between 2022 and 2040.",
          links: [
            { label: "Eurostat: causes of death by country of residence and occurrence (hlth_cd_aro), Greece 2020 to 2023", url: EUROSTAT_CD },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, section 2 (PDF)", url: CCP },
          ],
        },
        {
          id: "slow-decline",
          title: "Cancer mortality fell by 3.8% among men in a decade, against 16.1% across the EU",
          plain:
            "Between 2011 and 2021 the cancer death rate among Greek men fell by 3.8% and among Greek women by 0.3%, far less than across the EU. The OECD links the slow fall to the financial crisis and to the barriers it put in the way of care. Deaths that timely treatment could prevent, from breast and bowel cancer, did not fall.",
          detail:
            "The OECD and European Commission's 2025 profile reports that over 2011 to 2021 the age-standardised cancer mortality rate fell by 3.8% among Greek men, against 16.1% across the EU and 12.4% among Greece's economic peers, and by 0.3% among Greek women, against 8.5% and 6.7%; it suggests the financial crisis's effects on the social determinants of health and on access to care as a possible reason, citing Kyriopoulos, Nikoloski and Mossialos (2021). Treatable mortality from breast cancer was 18.2 per 100,000 in 2011 and 18.5 in 2021, while across the EU it fell from 22.2 to 18.7, and the profile reports a similar flat trend for colorectal cancer. Preventable lung cancer mortality among men fell from 71 to 61.3 per 100,000 between 2011 and 2021 but stayed about a third above the EU average of 44, which the profile links to smoking: 26% of cancer deaths in 2021 were attributed to it, and Greece has one of the highest smoking rates in the EU. Potential years of life lost to cancer fell by 9% between 2012 and 2020, against 19% across the EU.",
          links: [{ label: "OECD/EC: Country Cancer Profile Greece 2025, sections 2, 3 and 5.2 (PDF)", url: CCP }],
        },
      ],
      tables: [
        {
          id: "eurostat-deaths",
          title: "Cancer deaths registered in Greece, 2020 to 2023, by site",
          caption: "All deaths occurring in Greece, which in this Eurostat series includes deaths of non-residents, both sexes, all ages, by underlying cause (ICD-10). Hellenic Statistical Authority data as published by Eurostat, table updated 27 October 2026.",
          columns: [
            { key: "site", label: "Cause of death (ICD-10)" },
            { key: "y2020", label: "2020", numeric: true },
            { key: "y2021", label: "2021", numeric: true },
            { key: "y2022", label: "2022", numeric: true },
            { key: "y2023", label: "2023", numeric: true },
          ],
          rows: [
            { site: "All malignant cancers (C00-C97)", y2020: 30196, y2021: 30097, y2022: 28856, y2023: 29318 },
            { site: "Trachea, bronchus and lung (C33-C34)", y2020: 7014, y2021: 6959, y2022: 6696, y2023: 6540 },
            { site: "Colon, rectum and anus (C18-C21)", y2020: 2775, y2021: 2775, y2022: 2760, y2023: 2884 },
            { site: "Breast (C50)", y2020: 2219, y2021: 2269, y2022: 2039, y2023: 2094 },
            { site: "Pancreas (C25)", y2020: 2000, y2021: 2032, y2022: 1973, y2023: 2038 },
            { site: "Prostate (C61)", y2020: 1785, y2021: 1848, y2022: 1735, y2023: 1781 },
            { site: "Bladder (C67)", y2020: 1301, y2021: 1251, y2022: 1200, y2023: 1302 },
            { site: "Liver and intrahepatic bile ducts (C22)", y2020: 1384, y2021: 1326, y2022: 1322, y2023: 1299 },
            { site: "Stomach (C16)", y2020: 1181, y2021: 1137, y2022: 1044, y2023: 1095 },
            { site: "Leukaemia (C91-C95)", y2020: 1172, y2021: 1110, y2022: 1124, y2023: 1059 },
            { site: "Brain and central nervous system (C70-C72)", y2020: 1083, y2021: 1145, y2022: 1058, y2023: 1052 },
            { site: "Kidney, except renal pelvis (C64)", y2020: 597, y2021: 615, y2022: 609, y2023: 679 },
            { site: "Ovary (C56)", y2020: 534, y2021: 582, y2022: 533, y2023: 551 },
            { site: "Lip, oral cavity and pharynx (C00-C14)", y2020: 399, y2021: 425, y2022: 414, y2023: 400 },
            { site: "Melanoma of skin (C43)", y2020: 257, y2021: 238, y2022: 267, y2023: 278 },
            { site: "Cervix uteri (C53)", y2020: 148, y2021: 148, y2022: 137, y2023: 121 },
          ],
          note: "These are death registrations, not new cases: Greece has published no national count of new cancers. Deaths from all causes were 131,084 in 2020, 143,988 in 2021, 140,914 in 2022 and 128,218 in 2023, so the share caused by cancer moved with COVID-19 deaths. Breast deaths are both sexes.",
          sources: [{ label: "Eurostat: causes of death, deaths by country of residence and occurrence (hlth_cd_aro), Greece", url: EUROSTAT_CD }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry decided in 2024",
      aside: { label: "News4Health: the registry goes into operation, 25 February 2025 (in Greek)", url: REG_2025 },
      cards: [
        {
          id: "national-registry",
          title: "A national registry of cancer patients, built on the e-prescription system",
          plain:
            "Greece discussed a national cancer registry from the early 2000s and founded one by ministerial decision in February 2024. Every adult patient with cancer must be entered by the doctors who diagnose and treat them, and the data are drawn from the electronic prescription system. It went into production in February 2025, but no counts from it had been published that could be found.",
          detail:
            "A ministerial decision published in the Government Gazette on 9 February 2024, as News4Health reported that day, founds the Εθνικό Μητρώο Ασθενών με Νεοπλασματικές Ασθένειες. Inclusion is compulsory for every patient aged over 18 at diagnosis (and for younger patients treated in adult units) diagnosed with a neoplastic disease, blood cancers included, after the registry starts, and for anyone diagnosed earlier who uses health services for treatment or follow-up once it is running. Laboratory doctors in public and private units enter the diagnostic data and treating doctors the clinical data. The state e-government company designs and runs it and draws diagnoses, prescriptions, tests and treatment protocols from e-prescribing; it links to the childhood cancer registry and the electronic health record, and the insurer may link to it for payment but may not draw medical histories. The decision's justification quotes estimates of 64,530 new cancers and 33,166 deaths in 2020. The Minister of Health announced the platform's official start on 4 February 2025, and News4Health reported on 25 February 2025 that it went into production that day. The OECD's 2025 profile, with information to July 2024, says Greece was among the few EU countries without a working national cancer registry and had discussed one since the early 2000s.",
          links: [
            { label: "News4Health: the National Registry of Neoplasms is finally established, 9 February 2024 (in Greek)", url: REG_2024 },
            { label: "News4Health: start of the Registry of Neoplasms, 4 February 2025 (in Greek)", url: REG_LAUNCH },
            { label: "News4Health: the registry goes into operation, 25 February 2025 (in Greek)", url: REG_2025 },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, sections 2 and 5.2 (PDF)", url: CCP },
          ],
        },
        {
          id: "no-plan",
          title: "No cancer plan in force, and quality largely unmeasured",
          plain:
            "Greece has launched two cancer strategies in twenty years, but the OECD says they were implemented only in part and no process monitored them. The Minister of Health said in February 2025 that a national cancer plan would be delivered within the year; whether it has been adopted could not be confirmed. Survival, patient outcomes and the quality of care are not collected systematically.",
          detail:
            "The OECD and European Commission's 2025 profile says that over the last two decades two main cancer strategies were launched in Greece with limited implementation and no formal monitoring or evaluation; that a five-year National Action Plan for Public Health published in 2021 includes provisions on screening and palliative care; and that discussion is ongoing about a cross-sectoral national cancer plan. It records that Greece lacks a well-structured system for monitoring cancer incidence and survival, that patient-reported outcomes are not collected systematically, that laboratories and diagnostic centres are not consistently accredited and can be reimbursed without accreditation, that plans for a national cancer institute were abolished, and that the country has no comprehensive cancer centres, although Saint Savvas Hospital in Athens was announced as the first. News4Health reported the Minister of Health telling the Hellenic Cancer Federation's congress on 4 February 2025 that the national plan for cancer would be carried out within 2025, alongside a special budget line of 10 million euros for new biomarkers. The plan's text was not found, because the Ministry of Health's site did not answer scripts.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Greece 2025, sections 2 and 5.2 (PDF)", url: CCP },
            { label: "News4Health: start of the Registry of Neoplasms, 4 February 2025 (in Greek)", url: REG_LAUNCH },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one public insurer, and a third of health spending out of pocket",
      aside: { label: "World Bank: out-of-pocket expenditure, Greece", url: WB_OOP },
      cards: [
        {
          id: "eopyy-card",
          title: "A single insurer, and patients paying a large share themselves",
          plain:
            "Health care in Greece is paid for through a single public insurer, EOPYY, and the state budget. Patients paid 34% of current health spending themselves in 2023. Long public waiting lists push many patients with cancer to private care, and one study found half of households with a breast cancer patient spending more than a fifth of their income on health care.",
          detail:
            "The World Bank's indicators, drawn from the WHO Global Health Expenditure Database, put out-of-pocket spending at 34.3% of current health expenditure in Greece in 2023 (33.5% in 2022) and current health spending at 8.4% of GDP in 2023. The OECD and European Commission's 2025 profile says chronic health system deficiencies, long waiting lists and public dissatisfaction have contributed to high and persistent out-of-pocket payments, which together with lost income can cause financial catastrophe, especially for poorer households. It cites evidence that half of households with a breast cancer patient spent more than 20% of their income on health care in 2011 to 2014, and that 30% of cancer patients reported difficulty getting care, more than 40% of them because of cost. Screening is mainly done by specialists in private outpatient settings because of long waiting lists in public facilities. The insurer, EOPYY, can reimburse laboratories, diagnostic centres and private hospitals that are not formally accredited, Public hospitals are paid through a hybrid of diagnosis-related groups and retrospective payments from the public budget, and the profile cites evidence that the diagnosis-related groups do not reflect the cost of cancer care.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Greece", url: WB_OOP },
            { label: "World Bank: current health expenditure, % of GDP, Greece", url: WB_CHE },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, sections 4, 5.1 and 5.3 (PDF)", url: CCP },
          ],
        },
        {
          id: "cancer-medicines",
          title: "Cancer medicines: EOPYY pharmacies, case-by-case approval, and biomarker tests paid ad hoc",
          plain:
            "Many costly cancer medicines are collected from the insurer's own pharmacies; where there is none nearby, they are ordered through a dispatch point, which the insurer estimates can take 10 to 15 days. Medicines not yet on the reimbursed list can be paid for patient by patient through an electronic pre-approval system. Biomarker tests have had no formal framework for access.",
          detail:
            "EOPYY's page on high-cost medicines says that where none of its pharmacies works locally, patients can order and collect them at any of its dispatch points with the prescription, a hospital certificate where needed and an authorisation if someone else collects, and that the maximum estimated time from handing in the prescription to collection is 10 to 15 days. Law 4931/2022 lets the insurer's board, after the opinion of the national medicines assessment committee, approve in exceptional cases a medicine that is not on the reimbursed list for one patient's course of treatment, and opens the electronic pre-approval system, in which reviewing doctors including at least five medical oncologists and five radiotherapists decide whether a medicine needs to be reimbursed, to private doctors. The OECD's 2025 profile calls this electronic pre-authorisation a route that gives ad hoc coverage for cancer medicines not yet reimbursed, and says Greece has no formal framework for access to biomarker testing, which patients have obtained through grants from patient associations, scientific societies and others. News4Health reported in February 2025 the Minister of Health's announcement of a 10 million euro budget line for new biomarkers; whether it has been spent was not established.",
          links: [
            { label: "EOPYY: dispatch points for high-cost medicines (in Greek)", url: EOPYY_FYK },
            { label: "Law 4931/2022, articles 12 and 13, Government Gazette A 94 (PDF, in Greek)", url: LAW_4931 },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, section 5.1 (PDF)", url: CCP },
            { label: "News4Health: start of the Registry of Neoplasms, 4 February 2025 (in Greek)", url: REG_LAUNCH },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and the assessment committee",
      aside: { label: "EOF: organisation profile (PDF)", url: EOF_PROFILE },
      cards: [
        {
          id: "eof-card",
          title: "Approval in Amsterdam and Brussels, then a reimbursement decision in Athens",
          plain:
            "New cancer medicines are authorised once for the whole European Union, so they are legally available in Greece at the same time as elsewhere in the EU. Greece's regulator, EOF, supervises them on the market and authorises clinical trials. What a patient waits for is the decision to pay for the medicine, which the OECD puts at more than 550 days after EU authorisation.",
          detail:
            "New active substances for cancer go through the EU centralised procedure, in which the European Commission grants one marketing authorisation for every member state on the opinion of the European Medicines Agency. The National Organisation for Medicines (Εθνικός Οργανισμός Φαρμάκων), founded in 1983 by Law 1316 as a public-law body of the Ministry of Health according to its own profile, evaluates and authorises products in cooperation with the EU, monitors their quality and safety after marketing, inspects manufacturing, clinical studies and distribution, and runs pharmacovigilance. Reimbursement is decided separately. The OECD and European Commission's 2025 profile gives the total time from EMA authorisation to a reimbursement decision in Greece as more than 550 days, shorter than in Portugal (748 days), Poland (627 days) or Hungary (814 days), and notes that the time depends on both the company and the authorities. It says that during the period of economic adjustment the time to market entry for cancer medicines rose above the EU average.",
          links: [
            { label: "EOF: organisation profile (PDF, in Greek and English)", url: EOF_PROFILE },
            { label: "EMA: authorisation of medicines, scope of the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, section 5.1 (PDF)", url: CCP },
          ],
        },
        {
          id: "hta-card",
          title: "Health technology assessment since 2018, for medicines only",
          plain:
            "Greece has assessed new medicines for reimbursement since 2018, through a national committee. On 1 April 2023, 54% of a sample of breast and lung cancer medicine uses with high clinical benefit were publicly reimbursed in Greece, slightly below the EU average of 59%. Cheaper biosimilar cancer medicines were more widely covered than the EU average.",
          detail:
            "The OECD and European Commission's 2025 profile records that health technology assessment was established in Greece in 2018 and covers medicines but not other health technologies, and that it concentrates on clinical aspects and less on economic evaluation, partly because of understaffing and administrative barriers; an initiative to restructure it around value-based approaches had recently been announced, and an innovation fund to speed access was being discussed. Law 4931/2022 names the body as the Committee for the Evaluation and Reimbursement of Medicines for Human Use of article 247 of Law 4512/2018. Of 13 indications of 10 high-benefit breast and lung cancer medicines, 54% were on Greece's public reimbursement list on 1 April 2023, against an EU average of 59%, the same as the average of its economic peers; of 19 biosimilars of bevacizumab, rituximab and trastuzumab, 74% were reimbursed, against 65% across the EU. The profile adds that risk-sharing agreements are hard to implement for lack of infrastructure and data, and that the main tools to control spending on cancer medicines are price negotiations, rebates and clawbacks.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Greece 2025, sections 5.1 and 5.3 (PDF)", url: CCP },
            { label: "Law 4931/2022, article 12, Government Gazette A 94 (PDF, in Greek)", url: LAW_4931 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: Prolamvano, free tests invited by text message",
      aside: { label: "CNN Greece: Prolamvano results reported on 7 July 2025 (in Greek)", url: PROL_2025 },
      cards: [
        {
          id: "prolamvano",
          title: "Prolamvano: three cancer screening programmes for insured and uninsured people alike",
          plain:
            "Under the national Prolamvano (\"I prevent\") programme, launched in April 2024, the state invites people by text message to free screening for breast, cervical and bowel cancer, whether or not they are insured. CNN Greece reported the programme's figures in July 2025: more than 3.6 million people had done their tests, out of about 6 million eligible across its four programmes.",
          detail:
            "CNN Greece's report of the launch on 26 April 2024 describes four programmes, for breast, cervical and colorectal cancer and cardiovascular disease, with free tests for insured and uninsured people. Breast screening began with the Fofi Gennimata programme, which by then had done 300,000 free examinations with 20,000 positive findings, and was widened from ages 50 to 69 to 45 to 74; the OECD's 2025 profile describes yearly mammography for women aged 45 to 74, with ultrasound and a clinical examination if needed. Cervical screening under the Spyros Doxiadis public health programme began with text messages from 13 May 2024 to 2.5 million women aged 21 to 65; the OECD profile gives the schedule as a smear test every three years from 21 to 29 and an HPV test every five years from 30 to 65. Bowel screening sends free home self-tests to people aged 50 to 69 according to the launch report, and the OECD profile says 2.8 million people aged 50 to 65 are eligible, with colonoscopy after a positive test. CNN Greece reported on 7 July 2025 the programme's updated totals, quoting the Deputy Minister of Health: 817,984 mammograms with 51,632 women found to have findings, 418,641 smear and HPV tests with 5,962 colposcopies and biopsies, and 858,371 bowel self-tests with 29,509 colonoscopies and 11,079 biopsies.",
          links: [
            { label: "CNN Greece: Prolamvano launch, 26 April 2024 (in Greek)", url: PROL_2024 },
            { label: "CNN Greece: Prolamvano results, 7 July 2025 (in Greek)", url: PROL_2025 },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, section 4 (PDF)", url: CCP },
          ],
        },
        {
          id: "screening-limits",
          title: "Funded by the EU recovery fund, and not yet evaluated",
          plain:
            "The OECD says the screening programmes are paid for by the EU's Recovery and Resilience Fund, which ended in December 2025, and that no results on stage at diagnosis or on who takes part had been published. Before them, most screening in Greece was opportunistic and private, and only 28% of people aged 50 to 74 had had a bowel test in the past two years.",
          detail:
            "The OECD and European Commission's 2025 profile says screening activity in Greece was fragmented, with most tests done in the private sector on an opportunistic basis, and that the new programmes were funded through the EU's Recovery and Resilience Fund, which ends in December 2025, so their sustainability depends on continued investment. It records that no information had been published on the breast programme's impact, its participants' characteristics or stage at diagnosis, that processes for using screening data for quality assurance and evaluation were not available, and that no awareness campaign was designed for disabled, migrant or minority populations. In 2019 survey data, 66% of women aged 50 to 69 reported a mammogram in the past two years (53% of women with less education, 80% with more), 73% of women aged 20 to 69 reported a smear test in the past two years, and 28% of people aged 50 to 74 reported colorectal screening. The profile notes that the text-message invitations draw on the approach used for COVID-19 vaccination. How the programmes have been funded since the fund ended was not established for this page.",
          links: [{ label: "OECD/EC: Country Cancer Profile Greece 2025, section 4 (PDF)", url: CCP }],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination for girls and boys, with coverage at about half",
          plain:
            "Since 2022 the HPV vaccine has been recommended for both girls and boys aged 9 to 18. Prescription data show about 55% of girls aged 11 to 18 vaccinated and 44% of those aged 11 to 14, well below the WHO target of 90% of girls fully vaccinated by 15.",
          detail:
            "The OECD and European Commission's 2025 profile records that the National Vaccination Committee revised the HPV vaccination criteria in 2022 to make both boys and girls aged 9 to 18 eligible, that the vaccine was then fully covered by health insurance at all ages but that reimbursement would gradually be restricted to ages 9 to 14, and that prescription-based evidence shows coverage of 55% among girls aged 11 to 18 and 44% among those aged 11 to 14. It attributes low coverage to weak awareness campaigns, limited health literacy, perceived barriers to access, cultural factors and limited information from health professionals. CNN Greece's report of the Prolamvano launch in April 2024 says the Ministry of Health extended free vaccination against HPV to girls and boys aged 15 to 18 until the end of 2025. Whether that extension has been renewed was not established.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Greece 2025, section 3 (PDF)", url: CCP },
            { label: "CNN Greece: Prolamvano launch, 26 April 2024 (in Greek)", url: PROL_2024 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Machines and people: concentrated in Athens and Thessaloniki",
      aside: { label: "OECD/EC: Country Cancer Profile Greece 2025, section 5.1 (PDF)", url: CCP },
      cards: [
        {
          id: "workforce",
          title: "The fewest cancer nurses in the EU, and oncologists nearly ten times denser in Attica",
          plain:
            "Greece has 641 nurses for every 1,000 new cancer cases, the lowest number among the countries the OECD compared and less than half the EU average. Clinical oncologists are concentrated around Athens: 53 per million people in Attica, 5.6 in the Peloponnese. Almost two of every three hospitals and clinics that treat cancer are in Athens or Thessaloniki.",
          detail:
            "The OECD and European Commission's 2025 profile records 641 nurses per 1,000 new cancer cases in Greece against an EU average of 1,376, the lowest among EU countries, Iceland and Norway, with no nurse-led care or advanced cancer nursing roles, and shortages in the public sector of pathologists, haematologists, surgical and radiation oncologists. Citing the Hellenic Statistical Authority, it gives a density of clinical oncologists in 2022 ranging from 53 per million in Attica to 5.6 in the Peloponnese. Medical oncology is underrepresented in medical schools, surgical oncology is not recognised as a separate specialty, and many young doctors and nurses have moved abroad. Almost two out of three hospitals and clinics providing oncology care are in Athens and Thessaloniki, nearly a quarter of patients cite distance and transport as barriers, and the profile records substantial travel of patients towards Athens. Family members often stay at a patient's bedside in hospital for long hours and take on nursing duties because of understaffing.",
          links: [{ label: "OECD/EC: Country Cancer Profile Greece 2025, sections 5.1 and 5.4 (PDF)", url: CCP }],
        },
        {
          id: "radiotherapy",
          title: "Seven radiotherapy machines per million people, and long waits in public hospitals",
          plain:
            "Greece had 7 radiotherapy machines per million people in 2022, up from 6 in 2012 and just below the EU average of 8. They are all in hospitals, mostly in Athens and Thessaloniki. Waiting times for radiotherapy and surgery in public hospitals are long and have no targets.",
          detail:
            "The OECD and European Commission's 2025 profile, using OECD Health Statistics, records radiation therapy equipment of 6 per million people in 2012 and 7 in 2022, below the EU average of 8 and 3% below the average of Greece's economic peers; the equipment is kept in hospitals, most of it in the two largest cities, which produces significant geographical inequalities. It says waiting times for radiation and surgery in public hospitals are long, that no targets have been introduced, that earlier evidence found long waits the main barrier for more than half of patients reporting barriers, and that patients often turn to the private sector instead. Shortages of staff delay pathology tests needed for diagnosis. The profile says palliative care covers fewer than 1% of patients who could benefit, and that cancer patients account for an estimated 37% of palliative care needs (Ministry of Health, 2019). A 2022 law providing for a national palliative care system, committee, action plan and registry had not yet produced home and community services. The IAEA's own count of radiotherapy machines was not read for this page.",
          links: [{ label: "OECD/EC: Country Cancer Profile Greece 2025, sections 5.1 and 5.4 (PDF)", url: CCP }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Greece does",
      title: "What Greece does that others do not",
      cards: [
        {
          id: "digital-state",
          title: "Cancer care routed through the e-prescription system",
          plain:
            "Greece is building its cancer registry, its screening invitations and its treatment protocols on the national electronic prescription system rather than on hospital reports. The Minister of Health announced in February 2025 a plan to add electronic oncology records, tumour board software, end-to-end tracking of each patient's treatment and a patient app, first in three pilot hospitals.",
          detail:
            "The ministerial decision of February 2024 makes the national registry draw patients' diagnoses, prescriptions, tests and treatment protocols from e-prescribing, run by the state e-government company, and the 2024 screening programmes invite people by text message and through electronic referrals, drawing on the approach used for COVID-19 vaccination, according to the launch report and the OECD's 2025 profile. Law 4931/2022 allows filters in the e-prescription system for costly treatments without a therapeutic protocol, based on the summary of product characteristics and reimbursement limits, and runs case-by-case approval of medicines through an electronic pre-approval system. News4Health's report of 4 February 2025 lists the Minister's announced timetable: 12 oncology and haematology treatment protocols nationwide by the end of February, all approved protocols in the system by the end of May, an integrated system in three pilot hospitals with a specialist oncology record, tumour board software and tracking of each treatment from prescription to administration, a patient app by the end of May, and nine more public hospitals by the end of 2025. These are announcements; whether each was delivered was not established.",
          links: [
            { label: "News4Health: start of the Registry of Neoplasms, 4 February 2025 (in Greek)", url: REG_LAUNCH },
            { label: "News4Health: the National Registry of Neoplasms is finally established, 9 February 2024 (in Greek)", url: REG_2024 },
            { label: "Law 4931/2022, articles 11 to 13, Government Gazette A 94 (PDF, in Greek)", url: LAW_4931 },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, section 4 (PDF)", url: CCP },
          ],
        },
        {
          id: "home-and-survivorship",
          title: "Cancer treatment at home from Saint Savvas, and a survivorship clinic at Attikon",
          plain:
            "In 2021 Saint Savvas, the Athens cancer hospital, began giving cancer treatments in patients' homes, and the plan is to extend this to two more cancer hospitals in Athens and Thessaloniki. In 2023 Attikon Hospital opened Greece's first cancer survivorship clinic. A right to be forgotten for cancer survivors has been announced.",
          detail:
            "The OECD and European Commission's 2025 profile describes an initiative introduced in 2021 at Saint Savvas Oncological Hospital that offers cancer treatment in patients' homes; early qualitative evidence suggests it may have substantially improved the quality of life of patients and carers by easing access and avoiding long waits, and there are plans to expand it to two further oncological hospitals in Athens and Thessaloniki with EU Recovery and Resilience funds. It records a cancer survivorship clinic set up at Attikon Hospital, the first of its kind, in 2023, and calls the recently announced right to be forgotten for cancer patients a significant advance. It also notes that cancer patients are eligible for disability benefits such as tax relief, reduced working hours and places in tertiary education, but that targeted psychosocial support and help returning to work are left mainly to patient organisations and NGOs, and that no official reports on the quality of life of cancer patients exist. The Greek law on the right to be forgotten was not read for this page.",
          links: [{ label: "OECD/EC: Country Cancer Profile Greece 2025, sections 5.2 and 5.4 (PDF)", url: CCP }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-greece",
          title: "440 cancer trials in OnCo's records have a site in Greece",
          plain:
            "Of the cancer trials OnCo holds, 440 list a site in Greece on ClinicalTrials.gov, 148 of them recruiting when last read. Most are international company trials, led by MSD, Bristol-Myers Squibb and Roche. Three, all in early breast cancer, are led by a Greek group, the Hellenic Oncology Research Group.",
          detail:
            "Counted on 11 November 2026 from the ClinicalTrials.gov participation data in OnCo's graph: 440 trials list Greece among their countries, 342 of them phase 3, 60 phase 2, 22 phase 1/2, 15 phase 2/3 and 1 phase 1. ClinicalTrials.gov gives 182 as active but not recruiting, 148 recruiting, 95 completed, 13 terminated, 1 not yet recruiting and 1 of unknown status. Merck Sharp & Dohme is lead sponsor of 58, Bristol-Myers Squibb of 35, Hoffmann-La Roche of 31, AstraZeneca of 22 and Janssen of 21; non-small cell lung cancer is the first-listed cancer for 88 and multiple myeloma for 47. The Hellenic Oncology Research Group sponsors three completed phase 3 adjuvant breast cancer trials that ran only in Greece. Academic trials led from elsewhere in Europe with Greek sites include PERSEUS and CARTITUDE-6 from the European Myeloma Network, SENOMAC from the Karolinska Institutet and ESPAC-4 from Liverpool. The OECD's 2025 profile notes that of 436 trials involving children and adolescents with cancer in Europe from 2010 to 2022, 25 ran in Greece (5.7%).",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Greece", url: "https://clinicaltrials.gov/search?cond=Cancer&country=Greece" },
            { label: "OECD/EC: Country Cancer Profile Greece 2025, section 6 (PDF)", url: CCP },
          ],
        },
        {
          id: "children",
          title: "Children's cancer: eight hospitals, none of them a dedicated cancer centre",
          plain:
            "About 199 children up to age 15 were estimated to be diagnosed with cancer in Greece in 2022. Eight hospitals treat childhood cancer, five in Athens, two in Thessaloniki and one in Crete. Proton therapy, brachytherapy and palliative care for children were not available in Greece, according to the European paediatric oncology society.",
          detail:
            "The OECD and European Commission's 2025 profile, using the European Cancer Information System's estimates, gives 199 children and adolescents up to age 15 diagnosed with cancer in Greece in 2022, an incidence of 14.1 per 100,000 children aged 0 to 14 against an EU average of 13.7, with leukaemia 40% of cases, brain and central nervous system tumours 19%, lymphoma 11% and kidney cancer 0.7 per 100,000; Eurostat shows a three-year average mortality of 2.1 per 100,000, similar to the EU. Citing the European Society for Paediatric Oncology's 2024 country profile, it says eight hospitals treat childhood cancer, five in Athens, two in Thessaloniki and one in Crete, none of them a dedicated cancer centre, and that 10 of 13 infrastructure and treatment options are available, but proton therapy, brachytherapy and palliative care for children are not. Citing Vassal and colleagues (2021), it says 80% of 68 medicines identified as essential for treating cancer in patients up to 18 were available in Greece, against 76% across the EU.",
          links: [{ label: "OECD/EC: Country Cancer Profile Greece 2025, section 6 (PDF)", url: CCP }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-incidence",
      title: "No registered count of new cancers, and no survival figures",
      plain:
        "This page gives no registered number of new cancers in Greece, because none has been published: the national registry founded in 2024 had released no figures that could be found. Survival figures for Greek adults are also missing; the OECD says Greece has no system for monitoring them.",
      detail:
        "The incidence figures on this page are model estimates: GLOBOCAN's for 2024, ECIS's for 2022 as quoted by the OECD, and the 2020 estimate quoted in the ministerial decision. The registry's site, cancer-registry.gov.gr, did not answer scripts on 11 November 2026, so whether it publishes anything there was not checked. The Government Gazette number of the February 2024 ministerial decision was not read; it is described here through News4Health's report of its publication. The OECD's 2025 profile says Greece lacks a well-structured system for monitoring incidence and survival, so no five-year survival figure is quoted.",
      links: [
        { label: "News4Health: the National Registry of Neoplasms is finally established, 9 February 2024 (in Greek)", url: REG_2024 },
        { label: "OECD/EC: Country Cancer Profile Greece 2025, section 5.2 (PDF)", url: CCP },
      ],
    },
    {
      id: "unreached",
      title: "Sources that could not be read directly on 11 November 2026",
      plain:
        "Several official Greek websites refused automated reading, so ministry figures on this page come from press reports of them and are labelled as such. The Ministry of Health's site and the Prolamvano programme's site did not answer, and the Hellenic Parliament's documents refused scripts.",
      detail:
        "moh.gov.gr and prolamvano.gov.gr did not answer scripts, and the Internet Archive was temporarily offline when a copy was sought, so the Prolamvano figures are the Ministry's as reported by CNN Greece on 26 April 2024 and 7 July 2025, and the registry's founding and launch are described from News4Health's reports. The Hellenic Parliament's site returned 403 to scripts, so the Ministry's written answers to parliamentary questions about the registry, which search results describe as dating its production start to 24 February 2025, were not read. The Greek-language edition of the OECD profile was downloaded but the English edition was used for every figure. The IAEA's DIRAC database of radiotherapy centres was not read, so the radiotherapy figure is the OECD's. The register of medicines reimbursed by EOPYY and the assessment committee's decisions were not read.",
      links: [
        { label: "CNN Greece: Prolamvano results, 7 July 2025 (in Greek)", url: PROL_2025 },
        { label: "OECD/EC: Country Cancer Profile Greece 2025, Greek edition (PDF)", url: CCP_EL },
      ],
    },
    {
      id: "figures-missing",
      title: "Figures looked for and not found",
      plain:
        "Some figures a patient would want were looked for and not found: whether the national cancer plan promised for 2025 was adopted, how the screening programmes are paid for since the EU recovery fund ended, current HPV vaccination coverage, and how long the electronic pre-approval of an unlisted cancer medicine takes.",
      detail:
        "The Minister of Health said in February 2025 that a national plan for cancer would be carried out within 2025; no adopted text was found. The OECD says the screening programmes were funded by the Recovery and Resilience Fund until December 2025, and no source on their funding after that was read. The Ministry's screening totals of July 2025 do not give participation rates by programme or stage at diagnosis, and the colorectal age range differs between the launch report (50 to 69) and the OECD profile (50 to 65). The HPV coverage figures are prescription-based estimates quoted by the OECD without a year. No published time for decisions in the electronic pre-approval system was found, and the EFPIA W.A.I.T. survey's figures for Greece were not read.",
      links: [
        { label: "News4Health: start of the Registry of Neoplasms, 4 February 2025 (in Greek)", url: REG_LAUNCH },
        { label: "OECD/EC: Country Cancer Profile Greece 2025, sections 3 and 4 (PDF)", url: CCP },
      ],
    },
  ],
  institutions: [
    "saint-savvas-athens", "metaxa-cancer-hospital", "nkua-athens", "hellenic-cancer-federation", "greece-neoplastic-diseases-registry",
    "eopyy-greece", "eof-greece", "greece-medicines-assessment-committee", "idika-greece", "ema",
  ],
  companies: ["horg"],
  drugs: [],
  trials: [
    "nct00431080", "nct01985724", "nct00615602", "perseus", "cartitude-6", "senomac", "espac-4", "dreamm-7", "dreamm-8", "majestec-3",
    "cartitude-4", "checkmate-227", "pacific", "monarche", "katherine", "keynote-a18", "alina", "krystal-12", "codebreak-200", "destiny-breast05",
    "harmoni-3", "dllevate", "ideate-lung02", "interpath-001", "ev-304",
  ],
  papers: [],
  people: ["meletios-dimopoulos", "alexander-stratigos", "christos-fasianos", "panagiotis-klirides", "sarantos-efstathopoulos", "georgios-kapetanakis"],
  how:
    "Every card was written from sources read raw: in English, the OECD and European Commission's Country Cancer Profile Greece 2025, Eurostat's causes-of-death table for Greece, the World Bank's health expenditure indicators and IARC's GLOBOCAN 2024 fact sheet; in Greek, Law 4931/2022 as published by the national insurer, the medicines regulator's profile, the insurer's and the e-government company's own pages, and press reports of the ministerial decision founding the national registry and of the Ministry of Health's screening figures, each labelled as a report. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are the national registry of patients with neoplastic diseases, the national insurer, the medicines regulator, the medicines assessment committee and the e-government company.",
  verify:
    "Greece has published no registered count of new cancers, so every incidence figure here is an estimate. The screening programmes, their age ranges and their funding have changed since 2024 and may change again: before relying on an invitation or an age limit, check with a family doctor or the programme's own site. Whether a cancer medicine is reimbursed, and through which route, is for the treating oncologist and the insurer to confirm.",
  verifyLinks: [
    { label: "OECD/EC: Country Cancer Profile Greece 2025 (PDF)", url: CCP },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Greece (PDF)", url: IARC_FS },
    { label: "EOPYY: national insurer (in Greek)", url: "https://www.eopyy.gov.gr/" },
    { label: "EOF: National Organisation for Medicines (in Greek)", url: "https://www.eof.gr/" },
  ],
};
