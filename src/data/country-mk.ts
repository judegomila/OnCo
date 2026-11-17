import type { CountryDive } from "@/data/country-dive";

/**
 * North Macedonia deep dive: the hand-written cards for /countries/mk/ (wave 13). Macedonian sources were read in
 * Macedonian, and every figure was read from the raw text of its source on 16 November 2026, not from a summary of it:
 * IARC's GLOBOCAN 2024 fact sheet for North Macedonia (PDF text); the Institute of Public Health's cancer report for
 * 2014 to 2023 (PDF text), its reports index, its report on the 2025 immunisation programme and its cervical and breast
 * screening reports for 2019; the Ministry of Health's programme list and the published texts of the 2024 programme for
 * early detection and screening of malignant diseases, the 2025 immunisation programme and the 2024 co-payment
 * programme; the Ministry's medicines site (prices and the rules for the reimbursement list); MALMED's pages on the
 * agency, its competences, marketing authorisation and clinical trials; Internet Archive copies of Health Insurance Fund
 * pages from 2024 (the live site answers with a browser check); the University Clinic of Radiotherapy and Oncology's
 * pages; WHO/Europe's 2021 news release on financial protection; WHO's 2020 cancer country profile; an Internet Archive
 * copy of the IAEA's summary of its 2018 imPACT review; three reports by the state news agency MIA (8 May 2025,
 * 4 April 2026, 12 November 2023); the IAEA DIRAC country row, WHO's HPV coverage rows and World Bank series from
 * their public APIs. What could not be read is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/807-north-macedonia-fact-sheet.pdf";
const IPH = "https://www.iph.mk/";
const IPH_REPORTS = "https://www.iph.mk/mk/home/izvestai";
const IPH_RAK_2023 = "https://www.iph.mk/Upload/Documents/%D0%98%D0%97%D0%92%D0%95%D0%A8%D0%A2%D0%90%D0%88%20%D0%97%D0%90%20%D0%A0%D0%90%D0%9A%202023.pdf";
const IPH_RAK_2020 = "https://www.iph.mk/Upload/Documents/%D0%98%D0%97%D0%92%D0%95%D0%A8%D0%A2%D0%90%D0%88-%D0%97%D0%90-%D0%A0%D0%90%D0%9A-2011-2020-%D0%93%D0%9E%D0%94%D0%98%D0%9D%D0%90(1).pdf";
const IPH_IMM_2025 = "https://www.iph.mk/Upload/Documents/%D0%93%D0%BE%D0%B4%D0%B8%D1%88%D0%B5%D0%BD%20%D0%BD%D0%B0%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%B5%D0%BD%20%D0%B8%D0%BC%D1%83%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%98%D0%B0%202025.pdf";
const IPH_CERVIX_2019 = "https://www.iph.mk/Upload/Documents/Godisen-izvestaj-za-skrining-Ca-PVU-2019(1).pdf";
const IPH_BREAST_2019 = "https://www.iph.mk/Upload/Documents/Izvestaj-skrining-rak-na-dojka-2019(1).pdf";
const MOH = "https://zdravstvo.gov.mk/";
const MOH_PROGRAMMES = "https://zdravstvo.gov.mk/mk-MK/dokumenti/programi";
const MOH_SCREENING_2024 = "https://portal.mdt.gov.mk/post-body-files/programi-file-avWx.pdf";
const MOH_IMM_2025 = "https://portal.mdt.gov.mk/post-body-files/programi-file-8akK.pdf";
const MOH_COPAY_2024 = "https://portal.mdt.gov.mk/post-body-files/programi-file-ry7A.pdf";
const MOH_MEDICINES = "https://lekovi.zdravstvo.gov.mk/";
const MALMED_ABOUT = "https://malmed.gov.mk/%d0%b7%d0%b0-%d0%bd%d0%b0%d1%81/";
const MALMED_POWERS = "https://malmed.gov.mk/%d0%bd%d0%b0%d0%b4%d0%bb%d0%b5%d0%b6%d0%bd%d0%be%d1%81%d1%82%d0%b8/";
const MALMED_MA = "https://malmed.gov.mk/%d1%81%d1%82%d0%b0%d0%b2%d0%b0%d1%9a%d0%b5-%d0%bd%d0%b0-%d0%bb%d0%b5%d0%ba%d0%be%d0%b2%d0%b8-%d0%b2%d0%be-%d0%bf%d1%80%d0%be%d0%bc%d0%b5%d1%82/";
const MALMED_TRIALS = "https://malmed.gov.mk/%d0%ba%d0%bb%d0%b8%d0%bd%d0%b8%d1%87%d0%ba%d0%b8-%d0%b8%d1%81%d0%bf%d0%b8%d1%82%d1%83%d0%b2%d0%b0%d1%9a%d0%b0-2/";
const FZO = "https://fzo.org.mk/";
const FZO_LIST_2024 = "https://web.archive.org/web/20241009135307/https://fzo.org.mk/240815-pozitivnata-lista-dopolneta-so-devet-generiki-prvpat-po-2014ta-godina";
const FZO_DIALOGUE_2024 = "https://web.archive.org/web/20241009122019/https://fzo.org.mk/240911-politichki-dijalog-za-pozitivnata-lista-na-lekovi-mozhnosti-i-predizvici";
const FZO_RIGHTS = "https://web.archive.org/web/20240519235406/https://fzo.org.mk/prava-od-zadolzhitelnoto-zdravstveno-osiguruvane";
const FZO_LIST_PAGE = "https://web.archive.org/web/20240523061557/https://fzo.org.mk/lista-lekovi-na-tovar-na-fzorsm";
const UKRO = "https://www.oncology.org.mk/";
const UKRO_RT = "https://www.oncology.org.mk/page/oddielieniie-za-radioterapija-brachitierapia";
const UKRO_SRT = "https://www.oncology.org.mk/news/srt";
const UKRO_PRESS = "https://www.oncology.org.mk/news/zaiednitchka-pries-konfieriencia-na-ukro-i-fzom";
const UKRO_HALCYON = "https://www.oncology.org.mk/news/tchietiri-godini-uspieshna-rabota-so-varian-halcyon-radiotherapy-system";
const MIA_AUDIT = "https://mia.mk/story/state-audit-office-only-68-of-advanced-medical-equipment-in-service-at-public-health-institutions";
const MIA_CLINIC = "https://new.mia.mk/index.php/en/story/oncology-clinic-better-treatment-increases-life-span-for-breast-lung-skin-cancer-patients";
const MIA_EC = "https://mia.mk/en/story/ec-progress-made-on-transplantations-funding-for-cancer-screening-and-rare-diseases-is-insufficient";
const WHO_FP_2021 = "https://www.who.int/europe/news/item/01-12-2021-the-cost-of-health-care--who-reports-on-financial-protection-in-north-macedonia";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mkd-2020.pdf";
const IAEA_IMPACT_2018 = "https://web.archive.org/web/20240617050148/https://www.iaea.org/sites/default/files/documents/review-missions/north_macedonia_-_2018_impact_review.pdf";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'MKD'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=MK";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=MK";
const WB_GDP = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=MK";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=MK";
const WB_POP = "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=MK";
const CTGOV = "https://clinicaltrials.gov/search?country=North%20Macedonia&cond=cancer";

export const MK_DIVE: CountryDive = {
  iso2: "MK",
  iso3: "MKD",
  name: "North Macedonia",
  flag: "🇲🇰",
  asOf: "2026-11-16",
  title: "Cancer in North Macedonia",
  description:
    "Cancer in North Macedonia from Macedonian sources: a national registry at the Institute of Public Health that counted 8,371 new cancers in 2023 and that IARC does not use for its estimate, the Health Insurance Fund, whose list of paid medicines had, by the Fund's own account, no addition between 2014 and 2024, the MALMED regulator, the government's 2024 screening programme for cervical, breast and bowel cancer, and one public clinic that a state audit, as the state news agency MIA reported it in May 2025, found was giving all public linear accelerator radiotherapy.",
  lede:
    "North Macedonia has about 1.8 million people and a national cancer registry kept at the Institute of Public Health, which counted 8,371 new cancers and 3,726 cancer deaths in 2023. IARC builds its own estimate without that registry. The Health Insurance Fund runs compulsory health insurance, and a state audit, as the state news agency MIA reported it on 8 May 2025, found that public radiotherapy with linear accelerators was given at one clinic, the oncology clinic in Skopje.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for North Macedonia is 7,981 new cancers and 4,431 deaths, an age-standardised incidence of 231.9 per 100,000 (260.2 in men, 212.2 in women) and mortality of 114.2 (146.5 in men, 88.6 in women). The fact sheet gives the country-specific source for incidence as \"No data\": IARC applied national mortality estimates to modelled ratios of deaths to new cases taken from registries in neighbouring countries. Mortality comes from WHO's national data, with trends in national rates projected to 2024. The national registry at the Institute of Public Health counted 8,371 new cancers in 2023, a total that includes other skin cancers (code C44, averaging 777 a year from 2014 to 2023). IARC's fact sheet gives 7,981 for all cancers and 7,573 without non-melanoma skin cancer, a difference of 408 by OnCo's subtraction. The Institute's report gives 3,726 cancer deaths in 2023, fewer than IARC's estimate of 4,431 for 2024. The registry publishes crude rates (406.3 new cases per 100,000 people a year on average for 2014 to 2023), not age-standardised ones, so its rates cannot be set beside IARC's.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in North Macedonia",
      aside: { label: "Institute of Public Health: reports", url: IPH_REPORTS },
      cards: [
        {
          id: "shape",
          title: "About 8,000 new cancers a year by IARC's estimate, with breast, lung and colorectal cancer the commonest",
          plain:
            "IARC estimates 7,981 new cancers in North Macedonia in 2024, 4,265 in men and 3,716 in women, and 4,431 cancer deaths. Breast, lung and colorectal cancer are the commonest, followed by prostate and bladder cancer. Lung cancer causes the most cancer deaths, followed by colorectal and breast cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,222 breast cancers (429 deaths), 995 lung cancers (952 deaths), 925 colorectal cancers (518 deaths), 701 prostate cancers (243 deaths) and 407 bladder cancers (149 deaths). Stomach cancer is sixth by cases, with 342, and fourth by deaths, with 287. In men the commonest are lung (729), prostate (701) and colorectal cancer (565); in women breast (1,222), colorectal (360) and cancer of the body of the womb (291). The risk of developing a cancer before age 75 is 26.9% for men and 21.4% for women, and 19,670 people are estimated to be living within five years of a diagnosis. The fact sheet's population for 2024 is 1,823,014.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, North Macedonia (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "iarc-method",
          title: "IARC's incidence figure is modelled from deaths, not taken from the national registry",
          plain:
            "For North Macedonia, IARC lists no national source for new cancer cases. It starts from the country's cancer deaths and uses the relationship between deaths and new cases seen in neighbouring countries' registries to estimate how many cancers were diagnosed.",
          detail:
            "The fact sheet's methods box reads \"Country-specific data source: No data\" for incidence, with the method \"National mortality estimates applied to model-based M:I ratios (neighbouring country registry data)\". Mortality is better founded: the source is \"WHO (national)\" and the method is trends in national rates projected to 2024. Five-year prevalence is computed from Nordic countries' ratios scaled by the Human Development Index. WHO's 2020 cancer country profile likewise notes that its incidence estimates were not based on a population-based cancer registry. The IAEA's summary of its 2018 imPACT review went further and said the country had \"no national cancer registration or surveillance system in place\", with IARC's projections used instead. The Institute of Public Health's own reports disagree with that sentence: they describe a national registry kept electronically since 1995 and publish its counts, described in the next card.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, North Macedonia (PDF)", url: IARC_FACTSHEET },
            { label: "IAEA: imPACT review summary, September 2018 (PDF, Internet Archive copy)", url: IAEA_IMPACT_2018 },
            { label: "WHO: cancer country profile 2020, North Macedonia (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "registry",
          title: "The national registry counted 8,371 new cancers in 2023, and names its own weaknesses",
          plain:
            "The National Cancer Registry is run by the Institute of Public Health in Skopje and has been electronic since 1995. Its latest report counts 8,371 new cancers in 2023 (4,403 in men, 3,968 in women) and 3,726 cancer deaths. The same report says cases are under-registered in rural and outlying regions.",
          detail:
            "The Institute's report \"Cancer in the Republic of North Macedonia (2014 to 2023)\", published in Skopje in 2025, counts 74,208 new cases over ten years, a mean of 7,421 a year, 53.7% in men, and says 182,659 individual people had been registered by 31 December 2023. The commonest sites over the decade were bronchus and lung (12.07% of cases, about 896 a year), breast (11.77%, about 873), other skin cancers (10.46%, about 777) and colon (6.26%, about 465). The fifth place is not given here, because the report's summary table and its year-by-year rows disagree on whether it is stomach or prostate cancer. The report says alignment with IARC and European Network of Cancer Registries standards began in 2019, and lists what limits the registry: under-registration in rural and peripheral regions, too little data from private health facilities, no link to electronic health records or death certificates, a shortage of specialised registrars, and quality indicators (the share verified by microscope, the share known from a death certificate alone, the ratio of deaths to cases) that are not followed systematically. In 2023, 68.28% of cases were entered through a web application. The Institute's report for 2011 to 2020 shows the registry's inputs: a notification form (number 3-35-86) sent by health organisations, pathology, cytology and haematology data, and the State Statistical Office.",
          links: [
            { label: "Institute of Public Health: cancer report 2014 to 2023 (PDF, in Macedonian)", url: IPH_RAK_2023 },
            { label: "Institute of Public Health: cancer report 2011 to 2020 (PDF, in Macedonian and English)", url: IPH_RAK_2020 },
            { label: "Institute of Public Health: reports index (in Macedonian)", url: IPH_REPORTS },
          ],
        },
      ],
      tables: [
        {
          id: "mk-registry-2019-2023",
          title: "North Macedonia's cancer registry counts, 2019 to 2023",
          caption: "New cancer cases and cancer deaths by sex and year, from the Institute of Public Health's report for 2014 to 2023. Counts, not estimates.",
          columns: [
            { key: "year", label: "Year" },
            { key: "casesMen", label: "New cases, men", numeric: true },
            { key: "casesWomen", label: "New cases, women", numeric: true },
            { key: "cases", label: "New cases, all", numeric: true },
            { key: "deathsMen", label: "Deaths, men", numeric: true },
            { key: "deathsWomen", label: "Deaths, women", numeric: true },
            { key: "deaths", label: "Deaths, all", numeric: true },
          ],
          rows: [
            { year: "2019", casesMen: 4073, casesWomen: 3399, cases: 7472, deathsMen: 2253, deathsWomen: 1548, deaths: 3801 },
            { year: "2020", casesMen: 3558, casesWomen: 3086, cases: 6644, deathsMen: 2324, deathsWomen: 1588, deaths: 3912 },
            { year: "2021", casesMen: 3666, casesWomen: 3309, cases: 6975, deathsMen: 2324, deathsWomen: 1589, deaths: 3913 },
            { year: "2022", casesMen: 4515, casesWomen: 3977, cases: 8492, deathsMen: 2223, deathsWomen: 1586, deaths: 3809 },
            { year: "2023", casesMen: 4403, casesWomen: 3968, cases: 8371, deathsMen: 2240, deathsWomen: 1486, deaths: 3726 },
          ],
          note: "The registry's totals include other skin cancers (code C44), about 777 a year on average; IARC's total also includes non-melanoma skin cancer, and its totals with and without it differ by 408 (OnCo's subtraction). The report itself says cases are under-registered in rural and outlying regions and that private facilities report too little, so these are the cases the registry received, not a complete count.",
          sources: [{ label: "Institute of Public Health: cancer report 2014 to 2023 (PDF, in Macedonian)", url: IPH_RAK_2023 }],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and the cancer clinic",
      aside: { label: "IAEA DIRAC: radiotherapy centres by country", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Two radiotherapy centres and four megavoltage machines in IAEA's directory",
          plain:
            "IAEA's radiotherapy directory lists two radiotherapy centres in North Macedonia with four megavoltage treatment machines between them. In the public system, the state news agency MIA reported on 8 May 2025 that a state audit had found only the oncology clinic treating patients with linear accelerators, although three other public hospitals had machines.",
          detail:
            "The DIRAC country row, read on 16 November 2026 and last updated in 2025, gives 2 radiotherapy centres, 4 in the field for high-energy photon and electron beam units and 1 in the field for brachytherapy. With the World Bank's 2024 population of 1,824,359 that is about 2.2 megavoltage machines per million people. The state news agency MIA reported on 8 May 2025 that a State Audit Office performance audit found nine linear accelerators in public health institutions, four of them in service; the hospitals in Shtip and Bitola and Skopje's 8 September city hospital had machines, but only what MIA calls the \"Oncology and Radiology Clinic\" gave linear accelerator treatment, which OnCo takes to be the University Clinic of Radiotherapy and Oncology in Skopje; the audit named a lack of trained staff as one reason equipment stood unused. On 4 April 2026 MIA reported that the clinic was operating three linear accelerators, one of them recently put into use after a decade in storage, and had a new device for treating brain metastases so that patients need not be sent abroad.",
          links: [
            { label: "IAEA DIRAC: radiotherapy centres by country (read 16 November 2026)", url: DIRAC },
            { label: "MIA: State Audit Office report on advanced medical equipment (8 May 2025)", url: MIA_AUDIT },
            { label: "MIA: oncology clinic and Health Insurance Fund press conference (4 April 2026)", url: MIA_CLINIC },
            { label: "World Bank: population, North Macedonia", url: WB_POP },
          ],
        },
        {
          id: "oncology-clinic",
          title: "The University Clinic of Radiotherapy and Oncology in Skopje",
          plain:
            "The public University Clinic of Radiotherapy and Oncology in Skopje has departments organised by tumour type, a day hospital for chemotherapy, radiotherapy and brachytherapy, its own laboratory, pathology and pharmacy. In April 2026 it reported its first treatment with stereotactic radiotherapy, which aims radiation precisely at a tumour.",
          detail:
            "The clinic's site lists departments for head and neck, breast, gastrointestinal, lung, gynaecological, urological and male genital, central nervous system, bone and skin tumours, and tumours of the reticuloendothelial system, thyroid and soft tissue, with a day hospital for cytostatic treatment, clinical biochemistry, histopathology and cytology, radiation physics, a hospital pharmacy and a department of radiotherapy and brachytherapy. That department describes brachytherapy placed inside body cavities and tissue, chemotherapy, immunotherapy, targeted and hormone treatment, and tumour boards that decide treatment across specialities. News items on the site report a larger 2026 budget from the Health Insurance Fund and a presentation of stereotactic radiotherapy (SRT), which the clinic calls a high-precision method that matters most for lesions in places such as the brain (4 April 2026), its first treatment with SRT (7 April 2026), and four years of clinical work with a Varian Halcyon machine (10 June 2026). The home page names Professor Igor Stojkovski as director. The IAEA's summary of its 2018 review said radiation oncology was available in Skopje, at two radiotherapy centres with four linear accelerators between them, three public and one private, and that Skopje's facilities serve the whole country.",
          links: [
            { label: "University Clinic of Radiotherapy and Oncology (in Macedonian)", url: UKRO },
            { label: "The clinic's department of radiotherapy and brachytherapy (in Macedonian)", url: UKRO_RT },
            { label: "Clinic news: joint press conference with the Health Insurance Fund (4 April 2026, in Macedonian)", url: UKRO_PRESS },
            { label: "Clinic news: first treatment with SRT (7 April 2026, in Macedonian)", url: UKRO_SRT },
            { label: "Clinic news: four years with the Varian Halcyon (10 June 2026, in Macedonian)", url: UKRO_HALCYON },
            { label: "IAEA: imPACT review summary, September 2018 (PDF, Internet Archive copy)", url: IAEA_IMPACT_2018 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Health Insurance Fund of North Macedonia", url: FZO },
      cards: [
        {
          id: "insurance-fund",
          title: "The Health Insurance Fund, with rights tied to insured status",
          plain:
            "Compulsory health insurance in North Macedonia is run by the Health Insurance Fund. A person can use its benefits only once registered as insured. For cancer, a government programme, read here for 2024, pays the co-payments that insured patients would otherwise owe for surgery, radiotherapy, chemotherapy, tests and check-ups.",
          detail:
            "The Fund's page on rights says the rights of compulsory health insurance can be used only by a person whose status as an insured person has been established, on an application filed with a regional office of the Fund, on the grounds set out in article 5 of the Law on Health Insurance. The Ministry of Health's programme list for 2024 includes a programme of compulsory insurance for citizens who are not otherwise insured, which OnCo did not read. The 2024 programme on co-payments for particular diseases has a section on malignant diseases: it covers treatment by surgery, radiation and chemotherapy, the diagnostic procedures linked to the disease and all follow-up examinations, and sets aside 27,960,000 denars for the co-payments of insured people, reckoned at a maximum of 6,000 denars. WHO/Europe's 2021 review of financial protection found gaps all the same: some people were uninsured, coverage of medicines was limited and protection from co-payments was insufficient.",
          links: [
            { label: "Health Insurance Fund: rights under compulsory insurance (Internet Archive copy, May 2024, in Macedonian)", url: FZO_RIGHTS },
            { label: "Ministry of Health: co-payment programme for particular diseases, 2024 (PDF, in Macedonian)", url: MOH_COPAY_2024 },
            { label: "WHO/Europe: the cost of health care in North Macedonia (1 December 2021)", url: WHO_FP_2021 },
            { label: "Ministry of Health: programmes by year (in Macedonian)", url: MOH_PROGRAMMES },
          ],
        },
        {
          id: "spending",
          title: "About four tenths of health spending is paid out of pocket",
          plain:
            "The World Bank's series puts out-of-pocket payment at 39.6% of North Macedonia's health spending in 2023, and government spending at 57.6%. Health spending was 7.4% of GDP, about US$639 a person. WHO found that the payments that strain households most are for medicines.",
          detail:
            "The World Bank's series give out-of-pocket spending of 39.1% of current health expenditure in 2019, 38.9% in 2020, 41.7% in 2021, 40.2% in 2022 and 39.6% in 2023, with no later year yet. Domestic government spending was 57.6% of the total in 2023, current health expenditure 7.4% of GDP, and spending per person US$639, up from US$469 in 2019. WHO/Europe's 2021 report said catastrophic health spending fell mostly on poorer and older households and was driven mainly by out-of-pocket payments for medicines, and recommended making outpatient medicines more affordable through regular updating of the list of covered medicines, exempting more people on low incomes from co-payments, and more public spending on health.",
          links: [
            { label: "World Bank: out-of-pocket share of health spending, North Macedonia", url: WB_OOP },
            { label: "World Bank: government share of health spending, North Macedonia", url: WB_GOV },
            { label: "World Bank: health spending as a share of GDP, North Macedonia", url: WB_GDP },
            { label: "World Bank: health spending per person, North Macedonia", url: WB_PC },
            { label: "WHO/Europe: the cost of health care in North Macedonia (1 December 2021)", url: WHO_FP_2021 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved and paid for",
      aside: { label: "MALMED", url: "https://malmed.gov.mk/" },
      cards: [
        {
          id: "malmed",
          title: "MALMED authorises each medicine nationally",
          plain:
            "A medicine can be sold in North Macedonia only with a marketing authorisation from the national Agency for Medicines and Medical Devices, MALMED. The agency also approves clinical trials, keeps the registers of medicines, runs safety monitoring and inspects makers, wholesalers and pharmacies.",
          detail:
            "MALMED says it was founded on 16 September 2014 under the Law on Medicines and Medical Devices as an independent body of state administration, taking over from the Bureau of Medicines in the Ministry of Health. Under article 17 of that law a medicine may be placed on the market if it holds an authorisation; a request is made for each pharmaceutical form, strength and pack, and the agency decides on the proposal of its Medicines Commission, a standing expert advisory body. Its listed powers include authorising manufacture, wholesale, retail and import, including parallel import, approving advertising, approving or being notified of clinical trials, pharmacovigilance, quality control, inspection, monitoring medicine consumption and assessing pharmacoeconomic data. Its mission statement speaks of moving towards the standards and requirements of the EU. Price is a separate decision: the Ministry of Health sets maximum wholesale prices under article 108 of the same law; its medicines site carries such decisions for 2023, 2024, 2025 and 2026, and its notice for 2026 says new prices apply from 1 May 2026.",
          links: [
            { label: "MALMED: about the agency (in Macedonian)", url: MALMED_ABOUT },
            { label: "MALMED: competences (in Macedonian)", url: MALMED_POWERS },
            { label: "MALMED: placing medicines on the market (in Macedonian)", url: MALMED_MA },
            { label: "Ministry of Health: medicines site, prices and the list of medicines (in Macedonian)", url: MOH_MEDICINES },
          ],
        },
        {
          id: "positive-list",
          title: "The Fund says the list of medicines it pays for had no addition between 2014 and 2024",
          plain:
            "The Health Insurance Fund pays for medicines on its list, often called the positive list. In August 2024 the Fund added nine medicines and said it was the first addition since 2014; none of the nine it named is a cancer medicine. The state news agency MIA reported on 4 April 2026 that the Fund's director said two new breast cancer medicines and new options for prostate cancer were among that year's updates.",
          detail:
            "The Ministry of Health's medicines site carries the rulebook on how the list of medicines paid for by the Fund is drawn up, published on 13 February 2023 and amended in June 2023, February 2024 and September 2025, with the forms used to ask for a medicine to be put on the list or removed, and guidance on special agreements for medicines under article 108-a of the Law on Medicines and Medical Devices. On 15 August 2024 the Fund's Management Board added nine medicines by generic name (20 by form and strength), for blood clotting, heart and blood vessel disease and the nervous system, at an estimated cost of about one million euros a year; the Fund called it the first addition since 2014. A month later the Government, the Ministry, the Fund and WHO representatives met to discuss revising the list. MIA reported on 4 April 2026 that the Fund's director said six prescription medicines had been added since the previous year, that updates in 2026 included two new medicines for breast cancer, new options for prostate cancer and a 10% increase in the availability of immunotherapy, and that the oncology clinic's budget had risen from about EUR 10 million in 2017 to EUR 57 million in 2026. The report does not name the medicines.",
          links: [
            { label: "Health Insurance Fund: positive list extended for the first time since 2014 (15 August 2024, Internet Archive copy, in Macedonian)", url: FZO_LIST_2024 },
            { label: "Health Insurance Fund: policy dialogue on the positive list (11 September 2024, Internet Archive copy, in Macedonian)", url: FZO_DIALOGUE_2024 },
            { label: "Health Insurance Fund: list of medicines paid by the Fund (Internet Archive copy, May 2024, in Macedonian)", url: FZO_LIST_PAGE },
            { label: "Ministry of Health: medicines site, prices and the list of medicines (in Macedonian)", url: MOH_MEDICINES },
            { label: "MIA: oncology clinic and Health Insurance Fund press conference (4 April 2026)", url: MIA_CLINIC },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Ministry of Health: programmes by year", url: MOH_PROGRAMMES },
      cards: [
        {
          id: "cervical-breast",
          title: "Pap tests for women aged 21 to 59 and mammograms for women aged 40 to 69",
          plain:
            "The government's 2024 screening programme offers a Pap test to women aged 21 to 59 who have not had one in three years, and a free mammogram every two years to women aged 40 to 69. The latest results the Institute of Public Health lists are for 2019, when 16,884 Pap tests and about 1,670 screening mammograms were done.",
          detail:
            "The programme for early detection and screening of malignant diseases for 2024 counts cervical screening a success if 75% of the target women are reached over three years; family gynaecologists invite women and take the test, and women can register interest through the national booking system Moj Termin. Organised breast screening began in April 2015; the mammogram is free and the Ministry pays the 80 denar co-payment and the cost for uninsured women. The Institute of Public Health's report for 2019, when cervical screening was aimed at women aged 36 to 45, counts 26,978 invitations, 25,262 received and 16,884 Pap tests, of which 13,203 smears were analysed, and says laboratories in several hospitals were not analysing tests. Its breast report for 2019, when the target age was 50 to 69, counts 1,672 women screened (one line gives 1,642), 1,036 of them in the Skopje region and one in the Vardar region. WHO's 2020 profile recorded organised Pap smear screening with participation of 10% to 50% in 2019.",
          links: [
            { label: "Ministry of Health: programme for early detection and screening of malignant diseases, 2024 (PDF, in Macedonian)", url: MOH_SCREENING_2024 },
            { label: "Institute of Public Health: cervical screening report for 2019 (PDF, in Macedonian)", url: IPH_CERVIX_2019 },
            { label: "Institute of Public Health: breast screening report for 2019 (PDF, in Macedonian)", url: IPH_BREAST_2019 },
            { label: "WHO: cancer country profile 2020, North Macedonia (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
        {
          id: "bowel-screening",
          title: "Bowel screening by colonoscopy for people aged 50 to 75",
          plain:
            "The 2024 programme screens for bowel cancer with a colonoscopy; its text describes no home stool test. Family doctors receive a list of their patients of the right age, starting with those who have turned 50, and book those at average risk for a screening colonoscopy at a health facility taking part.",
          detail:
            "The programme covers people aged 50 to 75 at average risk, leaving out those already being investigated or treated for bowel disease, those who have had adenomas removed and those with a normal colonoscopy in the past three years. The national electronic health administration supplies the list and is to build a screening register; the family doctor contacts the patient, explains the benefit and writes the referral. The programme's stated aims are to cut illness and deaths from colorectal cancer and to raise the share found early from 14% to more than 50% within 10 years. The University Clinic of Gastroenterohepatology and other health facilities that join the screening carry out the colonoscopies, and a national commission in the Ministry of Health supervises. OnCo found no published count of how many screening colonoscopies have been done.",
          links: [
            { label: "Ministry of Health: programme for early detection and screening of malignant diseases, 2024 (PDF, in Macedonian)", url: MOH_SCREENING_2024 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination reached 51.5% of children in 2025, with boys now included",
          plain:
            "HPV vaccination is part of North Macedonia's compulsory schedule for children aged 12, and since 2024 for boys as well as girls. The Institute of Public Health reports two-dose coverage of 51.5% in 2025, the lowest of any vaccine on the schedule, ranging from 9.9% in Ohrid to 100% in five local units.",
          detail:
            "The 2025 immunisation programme gives two doses six months apart to children in the seventh grade, three doses to those over 15, and catch-up to age 18; boys were added by a Ministry of Health decision of 16 May 2024, and the vaccine has been on the schedule since 2009. The Institute's report for 2025 gives coverage of 50.2% in 2024 and a mean of 47.5% for 2020 to 2024, and says 8,224 eligible children were not covered, 4,638 of them (56.4%) in the area of the Skopje public health centre. WHO's rows, which use their own definitions, show first-dose coverage of girls rising from 32% in 2021 to 47% in 2022, 48% in 2023 and 58% in 2024 and 2025, and last-dose coverage of 21%, 50%, 42%, 40% and 40%; for boys they show a first dose of 15% in 2024 and 58% in 2025, and a last dose of 40% in 2025.",
          links: [
            { label: "Institute of Public Health: report on the 2025 immunisation programme (PDF, in Macedonian)", url: IPH_IMM_2025 },
            { label: "Ministry of Health: compulsory immunisation programme, 2025 (PDF, in Macedonian)", url: MOH_IMM_2025 },
            { label: "WHO: HPV vaccination coverage rows for North Macedonia (public API)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What North Macedonia does",
      cards: [
        {
          id: "yearly-programmes",
          title: "Cancer control runs through programmes the government adopts year by year",
          plain:
            "OnCo found no multi-year national cancer plan for North Macedonia in force today. What it found is a set of yearly government programmes: one for early detection and screening, one for immunisation, and one that pays cancer patients' co-payments. The 2024 screening programme had a budget of 23 million denars.",
          detail:
            "WHO's 2020 cancer country profile recorded a national cancer control plan as \"operational\" in 2019, and the IAEA's summary of its 2018 review lists among the activities the health minister said were under way a comprehensive strategy for cancer control, the introduction of new oncology drugs, more linear accelerators in a network of hospitals, and cancer registration, which it calls an absolute priority. OnCo could not find the text of a plan on the Ministry of Health's site. The Ministry's programme list shows the early detection programme for 2020, 2022, 2023 and 2024; none appears there under 2025 or 2026. The 2024 text covers cervical, breast and bowel screening, national studies of seven cancers and of cardiovascular disease, and a liver disease centre, and totals 23,000,000 denars. MIA reported on 12 November 2023 that the European Commission's progress report found a comprehensive approach to cancer screening lacking and its funding insufficient.",
          links: [
            { label: "Ministry of Health: programmes by year (in Macedonian)", url: MOH_PROGRAMMES },
            { label: "Ministry of Health: programme for early detection and screening of malignant diseases, 2024 (PDF, in Macedonian)", url: MOH_SCREENING_2024 },
            { label: "WHO: cancer country profile 2020, North Macedonia (PDF)", url: WHO_PROFILE_2020 },
            { label: "IAEA: imPACT review summary, September 2018 (PDF, Internet Archive copy)", url: IAEA_IMPACT_2018 },
            { label: "MIA: European Commission report on cancer screening funding (12 November 2023)", url: MIA_EC },
          ],
        },
        {
          id: "mobile-clinics",
          title: "Mobile gynaecology clinics take Pap tests to places without a gynaecologist",
          plain:
            "The 2024 screening programme funds mobile gynaecology clinics: adapted ambulances with an examination chair and ultrasound, staffed by a gynaecologist and a nurse. They visit areas with too few family gynaecologists, mostly rural, and give a free examination, ultrasound and Pap test.",
          detail:
            "The programme says the clinics are run by the Macedonian Medical Association with the Red Cross of North Macedonia, under an agreement with the University Clinic of Gynaecology and Obstetrics, whose cytology laboratory reads the Pap tests. Appointments are made through the Red Cross and family doctors in each municipality, and the visits are recorded in the national electronic health system so that women can be referred on. The service is meant for women and girls from vulnerable families in hard-to-reach and under-served areas, and covers both insured and uninsured women. The United Nations Population Fund supports information materials. The programme text sets fees for each field visit but gives no count of women seen.",
          links: [
            { label: "Ministry of Health: programme for early detection and screening of malignant diseases, 2024 (PDF, in Macedonian)", url: MOH_SCREENING_2024 },
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
          id: "trial-sites",
          title: "Five trials in OnCo's records have a site in North Macedonia",
          plain:
            "OnCo's ClinicalTrials.gov participation data finds five trials with a site in North Macedonia, all international drug trials sponsored by Roche or its Genentech arm, and none recruiting now. Three are breast cancer trials and one is a lung cancer trial. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "The five are CLEOPATRA (pertuzumab in HER2-positive metastatic breast cancer, completed), IPATunity130 (ipatasertib with paclitaxel in breast cancer, completed), lidERA (a newer kind of hormone-blocking tablet after surgery for breast cancer, active and no longer recruiting), a safety extension study for people already treated with trastuzumab emtansine in earlier trials (NCT00781612, active and no longer recruiting) and ALINA (alectinib after surgery for ALK-positive lung cancer, active and no longer recruiting). OnCo's records place the sites at the private Acibadem Sistina hospital in Skopje and the oncology department of the public clinical hospital in Bitola. ClinicalTrials.gov, read on 16 November 2026, also lists the public University Clinic of Radiotherapy and Oncology in Skopje as a site of IPATunity130, lidERA and ALINA, and an \"Institute of Radiotherapy Oncology\" in Skopje as a site of CLEOPATRA. Trials in North Macedonia need approval from, or notification to, MALMED, which has a standing commission for clinical trials and keeps a register of them. A search of ClinicalTrials.gov itself will find more studies than OnCo holds.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in North Macedonia", url: CTGOV },
            { label: "MALMED: clinical trials (in Macedonian)", url: MALMED_TRIALS },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "fund-site-blocked",
      title: "The Health Insurance Fund's own site could not be read, so the list of covered cancer medicines is not given",
      plain:
        "The Fund's website answered OnCo's reader with a browser check on 16 November 2026, so its current pages were not read. This page uses Internet Archive copies from 2024 instead, and does not say which cancer medicines the Fund pays for today.",
      detail:
        "Both fzo.org.mk and www.fzo.org.mk returned HTTP 403 with a \"Just a moment...\" check, and the Internet Archive's latest captures of the home page hold the same check. Archived copies of individual pages from May and October 2024 could be read, and those are the ones linked here. Not read: the current list of medicines and its codebook, the Fund's rules on co-payments, its reports on medicine spending, and its own announcement of the 2025 and 2026 additions, which this page takes from a news agency report that does not name the medicines. An archived Fund page of 20 September 2024 offering clarifications on the extended list had no readable text. Whether a given cancer medicine is covered is a question for the treating clinic or the Fund.",
      links: [
        { label: "Health Insurance Fund of North Macedonia", url: FZO },
        { label: "Health Insurance Fund: list of medicines paid by the Fund (Internet Archive copy, May 2024, in Macedonian)", url: FZO_LIST_PAGE },
      ],
    },
    {
      id: "plan-not-found",
      title: "No national cancer plan document, and no screening programme for 2025 or 2026, was found",
      plain:
        "OnCo could not find the text of a national cancer control plan for North Macedonia, or its years. The Ministry of Health's list of programmes shows a screening programme for 2024 and none for 2025 or 2026, and the published 2024 text has a blank where the date of adoption should be.",
      detail:
        "WHO's 2020 profile says a plan was operational in 2019 but does not name it. The Ministry's prevention page showed no readable plan, and the country page on the International Cancer Control Partnership portal was not found after that site's 2025 rebuild. The absence of a 2025 or 2026 screening programme from the Ministry's list may mean it was not posted there; OnCo did not search the Official Gazette, so this page describes the 2024 programme and does not claim it is the one in force. The co-payment programme was likewise read for 2024. The European Commission's reports on North Macedonia were not read directly: the one statement used comes from a news agency report of the 2023 edition.",
      links: [
        { label: "Ministry of Health: programmes by year (in Macedonian)", url: MOH_PROGRAMMES },
        { label: "Ministry of Health", url: MOH },
      ],
    },
    {
      id: "screening-results",
      title: "No screening results after 2019 were found",
      plain:
        "The newest cervical and breast screening reports listed by the Institute of Public Health are for 2019, when the target ages were narrower than today's. OnCo found no published figures for how many women have been screened since, or for bowel screening at all.",
      detail:
        "The 2024 programme assigns the yearly evaluation of each screening programme to the Institute of Epidemiology and Biostatistics at the medical faculty in Skopje and says the evaluations are to be published on the Ministry's site and the institute's own; OnCo did not find them. The 2019 reports are internally uneven: the cervical report gives 16,884 Pap tests as 73.70% of the 25,262 women who received an invitation, which the two counts do not bear out, and the breast report gives the number screened as both 1,672 and 1,642. The counts are given here as printed and the percentage is left out. The Institute's separate publications list runs to 42 pages, which were not searched one by one.",
      links: [
        { label: "Institute of Public Health: reports index (in Macedonian)", url: IPH_REPORTS },
        { label: "Institute of Public Health: cervical screening report for 2019 (PDF, in Macedonian)", url: IPH_CERVIX_2019 },
      ],
    },
    {
      id: "registry-limits",
      title: "No survival figures, no age-standardised rates and no stage data from the registry",
      plain:
        "The registry's report gives counts and crude rates by cancer site, sex, age and region. OnCo found no figures in it for how long people live after diagnosis or for stage at diagnosis, and it does not publish age-standardised rates, so the country cannot be compared with others from its own data.",
      detail:
        "The report for 2014 to 2023 itself lists limited use of standard coding and age-standardised rates among the registry's weaknesses. Its own figures do not always agree: the summary table of the commonest cancers prints deaths per year that look misplaced between rows (61 for liver and 175 for cancer of the body of the womb, against 182 and 58 in the report for 2011 to 2020), so this page uses no deaths by site. The same table prints about 429 cases a year beside stomach cancer and 366 beside prostate cancer, while the report's year-by-year rows add up to about 366 a year for stomach and 429 for prostate, and it does the same with liver (254 printed, 232 from the yearly rows) and cancer of the body of the womb; this page therefore gives shares for the four commonest sites, whose yearly rows agree with the table, and does not rank the rest. The report's total of 3,726 cancer deaths in 2023 is well below IARC's estimate of 4,431 for 2024, which rests on WHO's national mortality data; OnCo could not establish why the two differ. Why IARC lists no national incidence source when a registry exists is not explained in IARC's fact sheet.",
      links: [
        { label: "Institute of Public Health: cancer report 2014 to 2023 (PDF, in Macedonian)", url: IPH_RAK_2023 },
        { label: "IARC: GLOBOCAN 2024 fact sheet, North Macedonia (PDF)", url: IARC_FACTSHEET },
      ],
    },
    {
      id: "capacity-detail",
      title: "Machines by hospital, staff numbers and waiting times were not found in a primary source",
      plain:
        "OnCo read IAEA's country totals for radiotherapy, not its list of machines by hospital, and took the state audit's findings from a news agency report, not the audit itself. It found no current official count of oncologists or of waiting times to start treatment.",
      detail:
        "The DIRAC row read for this page is a country total; its per-type fields, such as the count of linear accelerators, are zero in that table and are not quoted. The two sources on machines do not describe the same thing: DIRAC lists four megavoltage units in two centres, while the audit, as MIA reported it in May 2025, found nine linear accelerators in public institutions with four in service, and the later news report three operating at the clinic in April 2026. Which centres DIRAC counts was not established. The State Audit Office's report was not read. The IAEA's summary of its 2018 review is linked as an Internet Archive copy; the IAEA's own copy answered on 16 November 2026 with the same text. The clinic's site offers Macedonian and Albanian, and its English address returns \"Page not found\". WHO's 2020 profile gives workforce figures for 2019 per 10,000 cancer patients, too old to present as current.",
      links: [
        { label: "IAEA DIRAC: radiotherapy centres by country", url: DIRAC },
        { label: "MIA: State Audit Office report on advanced medical equipment (8 May 2025)", url: MIA_AUDIT },
      ],
    },
  ],
  institutions: [
    "university-clinic-radiotherapy-oncology-skopje", "institute-of-public-health-north-macedonia", "ministry-of-health-north-macedonia",
    "health-insurance-fund-north-macedonia", "malmed-north-macedonia", "acibadem-sistina-hospital", "clinical-hospital-bitola",
    "iaea", "who", "iarc",
  ],
  companies: [],
  drugs: [],
  trials: ["cleopatra", "ipatunity130", "lidera", "nct00781612", "alina"],
  papers: [],
  people: ["igor-stojkovski"],
  how:
    "Every card was written from Macedonian official sources and international agencies, read in full as raw text and in Macedonian where that is the original: the Institute of Public Health's cancer, screening and immunisation reports, the Ministry of Health's published programmes and its medicines site, MALMED's pages, the University Clinic of Radiotherapy and Oncology's pages, Internet Archive copies of Health Insurance Fund pages, WHO/Europe's 2021 release on financial protection, WHO's 2020 cancer country profile, the IAEA's 2018 review summary, three reports by the state news agency MIA, IARC's GLOBOCAN 2024 fact sheet, and the IAEA DIRAC, WHO immunisation and World Bank public data. Trials were counted from OnCo's ClinicalTrials.gov participation data, and their sites in North Macedonia were read from ClinicalTrials.gov on 16 November 2026. The new records added for this page (the Institute of Public Health, the Ministry of Health and the Health Insurance Fund) carry their own sources.",
  verify:
    "The screening programme described here is the one published for 2024, and the list of medicines the Health Insurance Fund pays for was changing in 2025 and 2026. Machine counts differ between sources and change as machines are commissioned. Ask your doctor, the University Clinic of Radiotherapy and Oncology or the Health Insurance Fund what applies to you.",
  verifyLinks: [
    { label: "University Clinic of Radiotherapy and Oncology", url: UKRO },
    { label: "Health Insurance Fund", url: FZO },
    { label: "Ministry of Health", url: MOH },
    { label: "Institute of Public Health", url: IPH },
  ],
};
