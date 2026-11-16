import type { CountryDive } from "@/data/country-dive";

/**
 * Uzbekistan deep dive: the hand-written cards for /countries/uz/ (wave 6). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the presidential resolutions on lex.uz (PP-2866 of
 * 4 April 2017, PP-402 of 22 November 2024, PP-186 of 19 May 2025, PP-238 of 24 June 2026 and PP-18 of 20 January
 * 2026, in lex.uz's Russian text, which it marks as an unofficial translation where amended), Cabinet of Ministers
 * resolution No. 738 of 2025 in its Uzbek original, the November 2020 resolution founding the State Medical Insurance
 * Fund and the President's May 2021 visit to the national cancer centre (president.uz, Russian), the national cancer
 * centre's own pages, UZINFOCOM's news item on the Cancer-registr software, the IAEA's imPACT Review summaries of
 * 2014 and 2022 (PDF text), WHO Europe's 2022 HPV news release, WHO's immunisation coverage rows and its Global Health
 * Expenditure Database row from the public APIs, IARC's GLOBOCAN 2024 fact sheet for Uzbekistan (PDF text), a
 * ClinicalTrials.gov API query, and the papers' abstracts through Europe PMC. Where a figure could not be read it is
 * named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/860-uzbekistan-fact-sheet.pdf";
const IMPACT_2014 = "https://www.iaea.org/sites/default/files/documents/review-missions/uzbekistan_2014_impact_review.pdf";
const IMPACT_2022 = "https://www.iaea.org/sites/default/files/documents/review-missions/impact2-uzbekistan-260622.pdf";
const PP_2866 = "https://lex.uz/ru/docs/3150747";
const PP_402 = "https://lex.uz/ru/docs/7232847";
const PP_186 = "https://lex.uz/ru/docs/7533975";
const PP_238 = "https://lex.uz/ru/docs/8287520";
const PP_18 = "https://lex.uz/ru/docs/8012680";
const CM_738_UZ = "https://lex.uz/docs/7853907";
const PP_SHIF_2020 = "https://president.uz/ru/lists/view/3957";
const PRES_2021 = "https://president.uz/ru/lists/view/4366";
const CC_ABOUT = "https://cancercenter.uz/about/about-cancer-center?lang=en";
const CC_BRANCHES = "https://cancercenter.uz/about/branches?lang=en";
const CC_GR = "https://cancercenter.uz/about/gustave-roussy-international?lang=en";
const CC_FREE = "https://cancercenter.uz/patients/free-care-and-referral?lang=en";
const UZINFOCOM_REG = "https://uzinfocom.uz/en/news/111";
const WHO_HPV_NEWS = "https://www.who.int/europe/news/item/07-09-2022-uzbekistan-achieves-high-hpv-vaccination-coverage-against-cervical-cancer";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'UZB'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HEPB_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'UZB'%20and%20ANTIGEN%20eq%20'HEPB3'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'UZB'";
const CTGOV = "https://clinicaltrials.gov/search?locStr=Uzbekistan&country=Uzbekistan&cond=cancer";
const DOI = (id: string) => `https://doi.org/${id}`;

export const UZ_DIVE: CountryDive = {
  iso2: "UZ",
  iso3: "UZB",
  name: "Uzbekistan",
  flag: "🇺🇿",
  asOf: "2026-11-11",
  title: "Cancer in Uzbekistan",
  description:
    "Cancer in Uzbekistan from Uzbek sources: IARC's estimate of 38,465 new cancers and 22,509 deaths in 2024, a single national oncology service with 14 regional branches, the June 2026 presidential resolution that makes the State Medical Insurance Fund pay for cancer care from 2027, the medicines regulator's 210-day registration clock, HPV screening and a vaccine programme reaching more than nine in ten girls, radiotherapy machines rising from 5 to 19, and why no trial in our records has a site in Uzbekistan.",
  lede:
    "OnCo found no published national count of new cancers for Uzbekistan, so its figures are IARC estimates built from national death records: 38,465 new cancers and 22,509 deaths in 2024, with breast, colorectal and cervical cancer the commonest. The government's own baseline is that only 30% of the commonest cancers are found at stages I and II, and a June 2026 presidential resolution sets out to change that from January 2027.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Uzbekistan is 38,465 new cancers and 22,509 deaths, an age-standardised incidence of 112.5 per 100,000 (119.0 in men, 110.9 in women) and mortality of 66.9. IARC's fact sheet gives no country-specific incidence source for Uzbekistan: it estimated incidence by applying national mortality estimates to modelled mortality-to-incidence ratios from registry survival data, and it projected mortality from trends in national death rates reported to WHO. So the incidence figure is built backwards from deaths, not counted by a registry. Uzbek sources give lower counts: the IAEA wrote in 2022 that more than 20,000 new cancers were registered in Uzbekistan in 2020, and WHO estimated about 15,000 a year in 2014. Registered counts fall short where diagnosis is missed or not reported, and the Cancer-registr software built in 2024 is still being brought up to international standards, so neither figure can settle which is closer. The fact sheet ranks breast, colorectal and cervical cancer first by cases and stomach, breast and lung cancer first by deaths.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Uzbekistan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Uzbekistan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 38,000 new cancers a year, and nearly six deaths for every ten",
          plain:
            "IARC estimates 38,465 new cancers in Uzbekistan in 2024, slightly more in women (20,293) than in men (18,172), and 22,509 deaths. Breast cancer is the commonest, then colorectal, cervical and prostate cancer. Stomach and lung cancer cause almost as many deaths each year as there are new cases.",
          detail:
            "The GLOBOCAN 2024 fact sheet and data give 4,793 breast cancers (2,085 deaths), 3,586 colorectal cancers (1,699 deaths), 3,147 cervical cancers (1,733 deaths), 3,042 prostate cancers (895 deaths), 2,662 stomach cancers (2,146 deaths), 2,297 lung cancers (2,068 deaths), 1,507 liver cancers (1,437 deaths) and 1,377 oesophageal cancers (1,258 deaths). In men the leading cancers by cases are prostate, colorectum and stomach, and by deaths lung, stomach and colorectum; in women breast, cervix and colorectum lead on both. The risk of developing a cancer before age 75 is 13.2% for men and 11.6% for women, and an estimated 93,727 people are living within five years of a diagnosis. Deaths divided by new cases give 0.59. The presidential resolution of 24 June 2026 records as its baselines that 30% of the commonest cancers are found at stages I and II and 65% at stages III and IV, that five-year survival for them is 35%, and that they kill 5.1 people per 100,000.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Uzbekistan (PDF)", url: IARC_FACTSHEET },
            { label: "Resolution PP-238 of 24 June 2026, item 1 (lex.uz, Russian)", url: PP_238 },
          ],
        },
        {
          id: "care-capacity",
          title: "One oncology service: a national centre in Tashkent and 14 regional branches",
          plain:
            "Since 2017 Uzbekistan's cancer hospitals have been run as one service. The national centre in Tashkent lists 650 beds, and each region has a branch, the former regional oncology dispensary. Since May 2026 the national centre has worked as Gustave Roussy International Uzbekistan, in partnership with the French cancer institute Gustave Roussy.",
          detail:
            "Presidential resolution PP-2866 of 4 April 2017 turned the Republican Oncology Research Centre into the Republican Specialized Scientific-Practical Medical Center of Oncology and Radiology and made the regional oncology dispensaries and the Tashkent city dispensary its branches, under a single methodological chain of command. The centre's site lists 14 regional branches, 650 inpatient beds, 100 ambulatory chemotherapy beds, 1,250 medical staff and more than 6,000 high-technology operations a year. Its branch pages give each branch's beds and yearly patients: 240 beds and 80,114 patients in the Tashkent region, 185 and 60,394 in Andijan, 175 and 55,057 in Samarkand, down to 50 and 27,749 in Kokand. On a visit in May 2021 the President's office reported 10 buildings with 370 beds at the old site and ordered a new complex. The Ministry of Health and Gustave Roussy signed an agreement in Paris on 19 January 2026 to bring the centre into Gustave Roussy's international network, and it opened under that name on 20 May 2026; the centre's director is Sedat Kaya. Equipment comes partly through an Islamic Development Bank project: 22.8 million US dollars of equipment for regional branches in 2016 to 2021, and a second-phase loan the government records as 90 million US dollars for 2022 to 2027.",
          links: [
            { label: "Cancer Center Uzbekistan: about the center", url: CC_ABOUT },
            { label: "Cancer Center Uzbekistan: regional branches", url: CC_BRANCHES },
            { label: "Cancer Center Uzbekistan: Gustave Roussy International Uzbekistan", url: CC_GR },
            { label: "Resolution PP-2866 of 4 April 2017 (lex.uz, Russian)", url: PP_2866 },
            { label: "Resolution PP-18 of 20 January 2026 on the Islamic Development Bank project (lex.uz, Russian)", url: PP_18 },
            { label: "President.uz: a new building for the Republican Oncology Centre (14 May 2021, Russian)", url: PRES_2021 },
          ],
        },
      ],
      tables: [
        {
          id: "uz-baselines",
          title: "The government's own baselines and targets for cancer",
          caption: "Baselines and targets stated in presidential resolutions PP-238 (24 June 2026) and PP-186 (19 May 2025). Percentages unless marked.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "baseline", label: "Baseline", numeric: true },
            { key: "target", label: "Target", numeric: true },
            { key: "source", label: "Resolution" },
          ],
          rows: [
            { measure: "Commonest cancers found at stage I or II (%)", baseline: 30, target: 40, source: "PP-238, 2026" },
            { measure: "Commonest cancers found at stage III or IV (%)", baseline: 65, target: 55, source: "PP-238, 2026" },
            { measure: "Five-year survival, commonest cancers (%)", baseline: 35, target: 45, source: "PP-238, 2026" },
            { measure: "Deaths from commonest cancers per 100,000", baseline: 5.1, target: 3.7, source: "PP-238, 2026" },
            { measure: "Screening coverage, six commonest cancers (%)", baseline: null, target: 60, source: "PP-238, 2026" },
            { measure: "One-year survival, children with cancer (%)", baseline: 34, target: 90, source: "PP-186, 2025" },
            { measure: "Five-year survival, children with cancer (%)", baseline: null, target: 60, source: "PP-186, 2025" },
          ],
          note: "The commonest cancers are named in PP-238 as cervical, breast, colorectal, stomach, prostate and lung cancer. The resolutions give no year or method for their baselines, and no published registry report lets OnCo check them; the 5.1 per 100,000 death rate is far below IARC's age-standardised cancer mortality for all cancers (66.9), and the resolution does not say how it is calculated.",
          sources: [
            { label: "Resolution PP-238 of 24 June 2026 (lex.uz, Russian)", url: PP_238 },
            { label: "Resolution PP-186 of 19 May 2025 (lex.uz, Russian)", url: PP_186 },
          ],
        },
        {
          id: "uz-registry",
          title: "What analyses of Uzbek registry data have published",
          caption: "Cases and rates per 100,000 as reported in each source. Uzbekistan publishes no national registry report that OnCo could find.",
          columns: [
            { key: "source", label: "Source (area, cancer)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "Cases", numeric: true },
            { key: "rate", label: "Rate per 100,000", numeric: true },
          ],
          rows: [
            { source: "IAEA imPACT summary: new cancers registered, all sites (national)", period: "2020", cases: "more than 20,000", rate: null },
            { source: "Tashkent City Oncoregister: invasive cervical cancer and carcinoma in situ (age-standardised rate, invasive only)", period: "2014 to 2024", cases: 2140, rate: 14.9 },
            { source: "National epidemiological database: oesophageal cancer (mean crude incidence)", period: "2000 to 2018", cases: 17144, rate: 2.8 },
          ],
          note: "Registries count new cases; deaths are not shown. The rates are not comparable with each other: one is age-standardised for one city and one is a crude national mean.",
          sources: [
            { label: "IAEA: imPACT Review Uzbekistan (26 September 2022, PDF)", url: IMPACT_2022 },
            { label: "Mirzaev et al., cervical cancer trends in Tashkent 2014 to 2024 (JNCI Cancer Spectr 2026)", url: DOI("10.1093/jncics/pkag107") },
            { label: "Yusupbekov et al., oesophageal cancer in Uzbekistan 2000 to 2018 (Asian Pac J Cancer Prev 2020)", url: DOI("10.31557/APJCP.2020.21.8.2281") },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national register on new software",
      aside: { label: "UZINFOCOM: the Cancer-registr program (8 November 2024)", url: UZINFOCOM_REG },
      cards: [
        {
          id: "registry-national",
          title: "A national cancer register since 2017, moving to Cancer-registr software built in 2024",
          plain:
            "Since 2017 the national cancer centre's Cancer Prevention Centre has been charged with keeping Uzbekistan's cancer register. In November 2024 the state IT integrator UZINFOCOM and the centre built new Cancer-registr software following IARC advice and trained staff from every region. A 2026 resolution asks for the system to meet international standards by the end of 2026.",
          detail:
            "Presidential resolution PP-2866 of 4 April 2017 gave the Cancer Prevention Centre within the national oncology centre the job of forming a single information base of cancer patients, the cancer register, and of monitoring the epidemiological situation. UZINFOCOM reported on 8 November 2024 that the Cancer-registr software met international standards and IARC specialists' recommendations, that training seminars had been held from 4 to 8 November for registry staff of all regional centres and branches, and that it was being prepared for launch across the country. Resolution PP-238 of 24 June 2026 tells the digital technologies and health ministries to bring Cancer-registr up to international standards for cancer registration by the end of 2026, with decision-support tools using artificial intelligence, and to build by the end of 2027 a digital pathway in the national e-health system covering a patient's registration, diagnosis, treatment, follow-up and referral. Published analyses show what the data hold: the Tashkent City Oncoregister counted 2,140 women with cervical cancer or carcinoma in situ in 2014 to 2024, and the national epidemiological database 17,144 oesophageal cancers in 2000 to 2018. OnCo found no national registry report with counts for all cancers.",
          links: [
            { label: "UZINFOCOM: UZINFOCOM and the Republican Oncology Centre developed the Cancer-registr program (8 November 2024, Russian)", url: UZINFOCOM_REG },
            { label: "Resolution PP-2866 of 4 April 2017, item 5 (lex.uz, Russian)", url: PP_2866 },
            { label: "Resolution PP-238 of 24 June 2026, item 14 (lex.uz, Russian)", url: PP_238 },
            { label: "Mirzaev et al., cervical cancer trends in Tashkent 2014 to 2024 (JNCI Cancer Spectr 2026)", url: DOI("10.1093/jncics/pkag107") },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: state insurance on referral, and a guaranteed cancer package from 2027",
      aside: { label: "Resolution PP-238 of 24 June 2026 (lex.uz)", url: PP_238 },
      cards: [
        {
          id: "shif",
          title: "Cancer care is free on an electronic referral, paid by the State Medical Insurance Fund",
          plain:
            "Uzbekistan is moving its hospitals onto state medical insurance, piloted in Syrdarya region from 2020. At the national cancer centre, a patient who arrives with an electronic referral from their family polyclinic is treated free, including scans, pathology, chemotherapy, radiotherapy and surgery; the insurance fund pays. Without a referral, a planned visit is charged by the price list.",
          detail:
            "A presidential resolution of 12 November 2020, on a new model of health care and state medical insurance in Syrdarya region based on WHO recommendations, founded the State Medical Insurance Fund from 1 December 2020 to introduce and run state medical insurance and buy a guaranteed package of services and medicines. The national cancer centre's free-care page, which it marks as a draft awaiting legal review, describes the route: the family polyclinic does blood tests, X-ray and ultrasound; a suspected cancer is referred through the district medical association to the centre for examination; once the diagnosis is confirmed, the polyclinic doctor creates an electronic subsidised referral in the DMED system, the centre confirms it and the Fund allocates the money. Examination including contrast CT and MRI, PET-CT, histology and immunohistochemistry, and treatment by chemotherapy, radiotherapy and surgery, are then free, and staff may not ask a referred patient to pay or buy medicines. The page says Tashkent residents have used electronic referrals since 2 October 2026, the other regions earlier, and that each step is allowed one working day. Emergency care needs no referral. WHO's Global Health Expenditure Database puts out-of-pocket payments at 64.1% of current health spending in Uzbekistan in 2023.",
          links: [
            { label: "Cancer Center Uzbekistan: free treatment, referrals and what is paid (draft page)", url: CC_FREE },
            { label: "Presidential resolution of 12 November 2020 on state medical insurance in Syrdarya region (president.uz, Russian)", url: PP_SHIF_2020 },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share of current health spending, Uzbekistan (API)", url: WHO_OOP_API },
          ],
        },
        {
          id: "package-2027",
          title: "From January 2027 the fund pays for the whole cancer pathway, and half the excise on soft drinks and alcohol goes to a new fund",
          plain:
            "A presidential resolution of June 2026 makes the State Medical Insurance Fund pay, from 1 January 2027, for cancer screening tests, diagnosis, surgery, basic cancer medicines, radiotherapy, palliative care and follow-up. It adds a fund for non-communicable diseases inside the insurer, fed by half the excise on soft drinks, crisps, alcohol and energy drinks, and gives the Ministry of Health an extra 1.7 trillion som for 2027.",
          detail:
            "Item 7 of resolution PP-238 of 24 June 2026 lists what the Fund covers for cancer patients from 1 January 2027 within the state-guaranteed volume of care: laboratory and instrumental tests for early detection; diagnosis and staging, with a Ministry list of molecular genetic tests; surgery; medicines of the first (basic) group for anticancer, hormonal and supportive treatment, and radiotherapy; palliative care; and rehabilitation and follow-up. The Ministry must, by the end of 2026, agree the guaranteed volume with the Ministry of Economy and Finance, approve a list of anticancer medicines using WHO's three-tier priority classification with a state guarantee of uninterrupted supply of the first group, and add WHO-prequalified biosimilars and targeted and immune therapies to clinical guidance in stages; the volume is to be reviewed at least every three years. Medicines and supplies are to be bought and delivered to the regions with the UN Development Programme from 2027. The new Fund for Combating Non-communicable Diseases receives 50% of excise revenue on soft drinks (with or without sugar or flavourings), crisps, alcohol, beer and energy drinks, and spends on decisions of the Coordination Council for cancer control, including treatment at home and abroad for cancer and rare diseases. Item 15, as amended by decree UP-191 of 10 September 2026, gives the Ministry an extra 1.7 trillion som in 2027. In May 2021 the President's office said spending on cancer medicines and equipment had risen from 8 billion som in 2016 to almost 62 billion in 2021.",
          links: [
            { label: "Resolution PP-238 of 24 June 2026, items 3, 5, 7, 9, 10, 15 and 17 (lex.uz, Russian)", url: PP_238 },
            { label: "President.uz: a new building for the Republican Oncology Centre (14 May 2021, Russian)", url: PRES_2021 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Center for the Safety of Pharmaceutical Products",
      aside: { label: "Cabinet of Ministers resolution No. 738 (lex.uz, Uzbek)", url: CM_738_UZ },
      cards: [
        {
          id: "registration",
          title: "210 days for a new medicine, 60 if it is approved abroad or prequalified by WHO",
          plain:
            "Before a medicine can be sold in Uzbekistan, the Center for the Safety of Pharmaceutical Products, under the Ministry of Health, must register it. Under rules in force since 26 February 2026 the review takes up to 210 days by the standard route, or 60 days for a medicine registered by recognising a foreign approval or prequalified by WHO.",
          detail:
            "Cabinet of Ministers resolution No. 738 of 24 November 2025, in force from 26 February 2026, approved a new regulation on the state registration of medicines; lex.uz publishes its text in Uzbek only. Item 19 sets review times of 30 days for a one-year registration of a vaccine used in an epidemic or pandemic, 45 days for an active substance, 60 days for a medicine registered by recognition or a WHO-prequalified medicine, and 210 days by the general procedure. The clock stops for the 45 days an applicant has to correct deficiencies found at first review, for the 90 days to correct deficiencies found at specialised expert review, while an official request to verify foreign certificates awaits a reply, for clinical studies not yet done in Uzbekistan (up to one year for a generic and up to three years for an original medicine), and for GMP assessment. Item 9 gives priority to medicines with no registered analogue, orphan medicines, medicines in high demand and the first copy of an original. The resolution asks the Ministry to have the Center's laboratories prequalified by WHO by the end of 2026, to publish the priority list on the Center's site, and to bring experienced foreign experts into its work. A certificate is sent within two working days of a decision. OnCo found no published measured registration times.",
          links: [
            { label: "Cabinet of Ministers resolution No. 738 of 24 November 2025, items 9 and 19 of the medicines regulation (lex.uz, Uzbek)", url: CM_738_UZ },
            { label: "Cabinet of Ministers resolution No. 738, Russian page (the text is published in Uzbek only) (lex.uz)", url: "https://lex.uz/ru/docs/7861694" },
            { label: "Center for the Safety of Pharmaceutical Products (site)", url: "https://uzpharm-control.uz/" },
          ],
        },
        {
          id: "cancer-drug-access",
          title: "A fast lane for new cancer medicines at the national centre",
          plain:
            "The June 2026 resolution lets the national cancer centre use newer cancer, blood cancer, immune and pain medicines approved abroad but not made in Uzbekistan, registered by recognition on a list the Coordination Council approves, and imported after quality testing. It also plans multi-year purchasing contracts for cancer medicines by 2027.",
          detail:
            "Item 8 of resolution PP-238 gives the Coordination Council for cancer control projects, created under PP-402 in 2024, the power to approve a list of pharmaceutical products for use at the national centre: state registration by recognition of the newest oncological, haematological, immunological and pain medicines, supportive treatments and medical devices not made in Uzbekistan and approved for use abroad, and import on condition of quality control and identification on some indicators. The Council also decides how equipment and consumables are distributed among institutions, must avoid conflicts of interest in purchasing, and is to publish annual reports on progress against the programme's targets. Item 17 asks the Ministry to set up a technical group on the supply and logistics of anticancer medicines, to introduce digital forecasting and stock management, and to buy anticancer medicines on multi-year contracts by the end of 2027. In May 2021 the President's office said finding and buying medicines was the problem patients met most often.",
          links: [
            { label: "Resolution PP-238 of 24 June 2026, items 8 and 17 (lex.uz, Russian)", url: PP_238 },
            { label: "Resolution PP-402 of 22 November 2024, items 4 and 5 (lex.uz, Russian)", url: PP_402 },
            { label: "President.uz: a new building for the Republican Oncology Centre (14 May 2021, Russian)", url: PRES_2021 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Resolution PP-402 of 22 November 2024 (lex.uz)", url: PP_402 },
      cards: [
        {
          id: "cervical-breast-screening",
          title: "HPV testing for women 30 to 50, and breast checks every two years, under a 2025 to 2030 programme",
          plain:
            "Since 2025 Uzbekistan's programme invites women aged 30 to 50 for an HPV test, repeated after 10 years if negative, and checks women aged 30 to 65 for breast cancer every two years, by ultrasound under 45 and mammography from 45. A 2021 pilot tested 50,000 women in Karakalpakstan, but in Tashkent more than 80% of women had never been screened.",
          detail:
            "Resolution PP-402 of 22 November 2024 approved a cervical and breast cancer control programme for 2025 to 2030. Primary care keeps an electronic list of women aged 30 to 65 and invites them. Women aged 30 to 50 are screened by PCR testing for human papillomavirus with liquid-based cytology; if negative they are retested after 10 years, and those with precancerous lesions are treated as outpatients at the national maternal and child health centre and its branches. Every two years, women aged 30 to 65 are selected for breast examination, by ultrasound under 45 and by mammography at 45 to 65, with images read centrally at the national oncology centre. Diagnosis and treatment of cancers found through screening are paid from the state budget, and private providers can be paid through the State Medical Insurance Fund. Before this, a 2021 Ministry pilot tested 50,000 women aged 30 to 55 at 11 polyclinics in Karakalpakstan: 6.8% were HPV positive and 93.9% of them attended colposcopy, but test supply, referral, pathology quality and data were weak points. In Tashkent's register, carcinoma in situ diagnoses rose 3.4-fold after screening projects began, yet 76.6% of staged invasive cancers were stage II to IV and more than 80% of women had never been screened.",
          links: [
            { label: "Resolution PP-402 of 22 November 2024, items 2, 3 and 7 (lex.uz, Russian)", url: PP_402 },
            { label: "Zahirova et al., lessons from an HPV screening pilot in Uzbekistan (JCO Glob Oncol 2026)", url: DOI("10.1200/GO-25-00250") },
            { label: "Mirzaev et al., cervical cancer trends in Tashkent 2014 to 2024 (JNCI Cancer Spectr 2026)", url: DOI("10.1093/jncics/pkag107") },
          ],
        },
        {
          id: "hpv-hbv-early-detection",
          title: "HPV vaccine reaching more than nine in ten girls, hepatitis B vaccine since 2001, and new early detection from 2027",
          plain:
            "Uzbekistan added the HPV vaccine to its schedule in 2019, and the coverage it reports to WHO for the last dose has been 90% or more every year since 2020. Infants have had hepatitis B vaccine since 2001. From 2027 the country plans early detection for stomach, colorectal, lung and prostate cancer.",
          detail:
            "WHO Europe reported in September 2022 that, according to the Ministry of Health, 94% of girls aged 12 to 14 had received a first dose of HPV vaccine, introduced into the national schedule in 2019 with WHO and UNICEF support. In the programme rows Uzbekistan reports to WHO, first-dose coverage of girls was 97% in 2019, 91% in 2020, 99% in 2021 and 2022, 93% in 2023, 91% in 2024 and 94% in 2025; last-dose coverage was 97% in 2020, 90% in 2021, 99% in 2022, 97% in 2023, 99% in 2024 and 94% in 2025. For hepatitis B, which causes liver cancer, a 2022 national serosurvey of 3,753 schoolchildren found 0.20% carrying the virus, and 97.7% of children with records had three doses; WHO's estimate of three-dose infant coverage was 98% in 2025. Resolution PP-238 adds, phased in by region from 1 January 2027, early detection for stomach, colorectal, lung and prostate cancer under a national programme drawn up with WHO, with test kits for stomach, colorectal and prostate cancer supplied to primary care and central laboratories, a rapid diagnostic pathway, and training of district endoscopists through a grant project with Dana-Farber Cancer Institute experts.",
          links: [
            { label: "WHO Europe: Uzbekistan achieves high HPV vaccination coverage against cervical cancer (7 September 2022)", url: WHO_HPV_NEWS },
            { label: "WHO immunisation data: HPV programme coverage rows for Uzbekistan (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: hepatitis B third dose coverage, Uzbekistan (API)", url: WHO_HEPB_API },
            { label: "Khetsuriani et al., chronic hepatitis B among children in Uzbekistan (Vaccine 2025)", url: DOI("10.1016/j.vaccine.2025.126743") },
            { label: "Resolution PP-238 of 24 June 2026, items 2, 4 and 12 (lex.uz, Russian)", url: PP_238 },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy: from 5 machines to 19",
      aside: { label: "IAEA: imPACT Review Uzbekistan 2022 (PDF)", url: IMPACT_2022 },
      cards: [
        {
          id: "radiotherapy-growth",
          title: "Working radiotherapy machines rose from 5 in 2014 to 19 in 2022, and cobalt units are being replaced",
          plain:
            "When IAEA reviewers visited in 2014 they counted five radiotherapy machines in service against an estimated need of 18, and no working brachytherapy machine for treating cervical cancer. By 2022 there were 19 machines in 15 institutions. The 2026 resolution plans to replace the remaining cobalt machines with linear accelerators.",
          detail:
            "The IAEA's summary of the imPACT Review mission of 31 March to 3 April 2014, in Tashkent and Samarkand, estimated that Uzbekistan needed 18 radiotherapy machines, found only five in service, a deficit of 13, and found not a single brachytherapy machine in service. Its summary of the 2022 review by the IAEA, WHO and IARC, published 26 September 2022, says functioning external beam machines grew from five in four institutions to 19 in 15 institutions, that the review analysed infrastructure, equipment and workforce needs in the main cancer hospitals, and that it would guide an Uzbekistan and Islamic Development Bank project under the IAEA's Rays of Hope initiative. In May 2021 the President's office said all 22 regional oncology institutions had for the first time been equipped with modern radiotherapy equipment, a claim the IAEA's machine count does not show directly. Resolution PP-238 of 2026 commits to modernising radiotherapy by replacing cobalt units with linear accelerators in stages and expanding high-dose-rate brachytherapy, and to interregional molecular genetic diagnostic centres and modernised pathology laboratories. The national centre's radiation oncology department lists 33 places.",
          links: [
            { label: "IAEA: imPACT Review Uzbekistan, March and April 2014 (PDF)", url: IMPACT_2014 },
            { label: "IAEA: imPACT Review Uzbekistan (26 September 2022, PDF)", url: IMPACT_2022 },
            { label: "Resolution PP-238 of 24 June 2026, item 3 (lex.uz, Russian)", url: PP_238 },
            { label: "President.uz: a new building for the Republican Oncology Centre (14 May 2021, Russian)", url: PRES_2021 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Uzbekistan does",
      title: "What Uzbekistan does differently",
      cards: [
        {
          id: "presidential-programmes",
          title: "Cancer policy written as presidential resolutions with numbered targets",
          plain:
            "In Uzbekistan the main decisions about cancer care are presidential resolutions, published on the national legal database lex.uz, each with named ministers responsible and targets. Three since 2024 cover women's cancers, childhood cancer and the whole cancer pathway, and a council meets quarterly to track them and publish yearly reports.",
          detail:
            "PP-402 of 22 November 2024 set the cervical and breast cancer programme for 2025 to 2030 and created the Coordination Council for cancer control projects, with the national oncology and maternal and child health centres as its working bodies; purchases of cancer equipment and consumables must be agreed and distributed by the Council. PP-186 of 19 May 2025 set the childhood cancer programme for 2025 to 2030. PP-238 of 24 June 2026 added the national programme and gave the Council further duties: quarterly meetings, key performance indicators, roadmaps, and annual public reports on progress against the programme's targets. The Agency for Strategic Development and Reforms monitors the programme, and the resolution makes the Minister of Health and every regional governor personally responsible, with oversight by the Prime Minister. Several of these resolutions have been amended since adoption, including by decree UP-191 of 10 September 2026, so lex.uz's current text is the one to read. OnCo did not find the Council's first annual report.",
          links: [
            { label: "Resolution PP-402 of 22 November 2024 (lex.uz, Russian)", url: PP_402 },
            { label: "Resolution PP-238 of 24 June 2026, items 8, 19, 22 and 23 (lex.uz, Russian)", url: PP_238 },
            { label: "Resolution PP-186 of 19 May 2025 (lex.uz, Russian)", url: PP_186 },
          ],
        },
        {
          id: "childhood",
          title: "Childhood cancer: one-year survival from 34% to 90%, with a green corridor for diagnosis",
          plain:
            "Uzbekistan is a focus country of WHO's Global Initiative for Childhood Cancer. Its 2025 to 2030 childhood cancer programme aims to raise one-year survival from 34% to 90% and five-year survival to at least 60%, diagnose blood cancers within 4 days and other cancers within 14, and start treatment within 10 to 20 days.",
          detail:
            "The IAEA's 2022 imPACT summary notes that Uzbekistan is a focus country of the WHO Global Initiative for Childhood Cancer. Resolution PP-186 of 19 May 2025, renamed by decree UP-191 in September 2026, takes note of a National Childhood Cancer Programme for 2025 to 2030 drawn up with international experts and WHO. Its goals are 65% of childhood cancers found early, one-year survival of children with cancer and blood cancers raised from 34% to 90% and five-year survival to at least 60%, all children with cancer in specialist care, diagnosis within 4 days for blood cancers and 14 for other cancers, and treatment started within 10 to 20 days. It sets a fast-track route for children with suspected cancer (a green corridor), strengthens the national Scientific-Practical Medical Center of Paediatric Oncology, Haematology and Immunology and the regional children's centres, and adds palliative and hospice care for children. A pilot in 2025 and 2026 in Samarkand city and Ishtikhan district trains primary care teams to question and examine children for early signs. The 2026 resolution makes the International Academic Hub for childhood cancer, created under PP-186, the scientific base for oncology research.",
          links: [
            { label: "Resolution PP-186 of 19 May 2025, items 1, 5 and 6 (lex.uz, Russian)", url: PP_186 },
            { label: "IAEA: imPACT Review Uzbekistan (26 September 2022, PDF)", url: IMPACT_2022 },
            { label: "Resolution PP-238 of 24 June 2026, item 13 (lex.uz, Russian)", url: PP_238 },
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
          title: "No trial in OnCo's records has a site in Uzbekistan",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Uzbekistan. ClinicalTrials.gov itself lists nine cancer studies with an Uzbek site, including one run by the national oncology centre on cervical cancer.",
          detail:
            "OnCo's graph holds no trial with a site in Uzbekistan. A ClinicalTrials.gov query on 11 November 2026 returned 92 studies of any condition listing a site in Uzbekistan, 9 of them matching cancer: among them NCT07325682, a study of viral persistence in cervical cancer sponsored by the Oncology Center of the Ministry of Health (enrolling by invitation since April 2025); NCT07435324, R-Pharm's comparison of RPH-002 with Erbitux (cetuximab) in unresectable metastatic or recurrent head and neck squamous cell carcinoma (completed); NCT07303660, a phase 1b study of lonitoclax with azacitidine in acute myeloid leukaemia (recruiting); NCT07524140, a first-in-human study of ZE94-0605 in advanced solid tumours (recruiting); and the Moscow-Berlin childhood leukaemia protocols ALL-MB 2008 and 2015. The Uzbek cancer research OnCo found indexed in Europe PMC is mostly observational: the Tashkent cervical register, the evaluation of the 2021 HPV screening pilot, HPV prevalence in 44,000 women, a national oesophageal cancer series with Nagoya University, and three reports of an Uzbekistan-Korea oncology consortium. The medicines registration regulation of 2025 (Cabinet of Ministers resolution No. 738) stops the registration clock for up to three years while clinical studies of an original medicine not yet studied in Uzbekistan are done.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Uzbekistan (search)", url: CTGOV },
            { label: "Zahirova et al., lessons from an HPV screening pilot in Uzbekistan (JCO Glob Oncol 2026)", url: DOI("10.1200/GO-25-00250") },
            { label: "Rim et al., first report of the Uzbekistan-Korea Oncology Consortium (Medicina 2022)", url: DOI("10.3390/medicina58101428") },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "national-counts",
      title: "No published national count of new cancers or cancer deaths",
      plain:
        "OnCo could not find a national cancer registry report or an official statistics table giving Uzbekistan's new cancers and cancer deaths by site for a recent year. IARC's fact sheet lists no Uzbek incidence source, and the national figures on this page are IARC estimates or single statements.",
      detail:
        "The figure of more than 20,000 cancers registered in 2020 is the IAEA's statement in its 2022 summary, not a registry table; WHO's 15,000 a year is a 2014 estimate. The national statistics agency's health tables were not reached: the addresses tried returned 404, and OnCo's web search budget ran out before another route could be found. The baselines in the presidential resolutions (30% found at stages I and II, 35% five-year survival, 5.1 deaths per 100,000) carry no year or method. The registry's own data are visible only through published analyses of one cancer or one city.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Uzbekistan (PDF)", url: IARC_FACTSHEET },
        { label: "IAEA: imPACT Review Uzbekistan (26 September 2022, PDF)", url: IMPACT_2022 },
      ],
    },
    {
      id: "programme-annexes",
      title: "The national cancer programme and the screening plan's annexes were not read",
      plain:
        "The presidential resolutions publish their programmes, action plans and target tables as annexes in Uzbek only, and OnCo read the resolutions' main text but not these annexes. The national cancer programme the Ministry was told to post on its site was not found, nor the Coordination Council's annual reports.",
      detail:
        "Annexes 1 to 5 of PP-238 (the early detection plan, the national programme, its action plan, its targets and the equipment allocation), annex 1 of PP-402 (the cervical and breast programme's action plan) and annexes 1 to 4a of PP-186 are given in Uzbek on lex.uz and were not read. Neither was the full imPACT Review report for 2022, of which the IAEA published only a two-page summary; its machine and workforce counts by institution are therefore not here. The State Medical Insurance Fund's site returned only news headlines, and OnCo found no published list of the cancer medicines it pays for.",
      links: [
        { label: "Resolution PP-238 of 24 June 2026 (lex.uz, Russian)", url: PP_238 },
        { label: "Resolution PP-402 of 22 November 2024 (lex.uz, Russian)", url: PP_402 },
        { label: "State Medical Insurance Fund (site, Uzbek)", url: "https://dtsj.uz/" },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: survival after a cancer diagnosis nationally, the number of oncologists and radiation oncologists, waiting times for treatment, measured medicine registration times, and screening coverage for 2025 or 2026.",
      detail:
        "No population-based survival figures for all cancers were found; the survival figures on this page are the resolutions' baselines and per-stage figures from the Tashkent cervical and national oesophageal analyses. The national cancer centre's free-care page is marked as a draft awaiting legal review, so the referral steps it describes may change. The national centre's statement that care with a referral is free could not be checked against patient experience; WHO's data put out-of-pocket payments at 64.1% of health spending in 2023. The regulator's own site is a script-built page that returned no readable text to a plain request, so the regulation was read on lex.uz instead. The President's office statement that all 22 regional oncology institutions have modern radiotherapy equipment and the IAEA's count of 19 machines in 15 institutions could not be reconciled.",
      links: [
        { label: "Cancer Center Uzbekistan: free treatment, referrals and what is paid (draft page)", url: CC_FREE },
        { label: "Center for the Safety of Pharmaceutical Products (site)", url: "https://uzpharm-control.uz/" },
        { label: "WHO Global Health Expenditure Database: out-of-pocket share, Uzbekistan (API)", url: WHO_OOP_API },
      ],
    },
  ],
  institutions: [
    "uzbekistan-ministry-of-health", "rsspmcor-uzbekistan", "uzbekistan-state-health-insurance-fund", "uzbekistan-pharmaceutical-safety-center",
    "uzbekistan-cancer-registry", "uzbekistan-maternal-child-health-center", "uzbekistan-paediatric-oncology-center", "gustave-roussy", "dana-farber", "iaea", "iarc", "who",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-mirzaev-tashkent-cervical-registry-2014-2024-jncics-2026", "paper-zahirova-hpv-screening-pilot-uzbekistan-jcogo-2026",
    "paper-oltieva-high-risk-hpv-44000-women-uzbekistan-bmcid-2025", "paper-yusupbekov-oesophageal-cancer-uzbekistan-apjcp-2020",
    "paper-rim-uzbekistan-korea-consortium-breast-cervical-medicina-2022",
  ],
  people: [],
  how:
    "Every card was written from Uzbek official sources and international reviews, read in full rather than through a summary: the presidential resolutions on cancer of 2017, 2024, 2025 and 2026 and the Islamic Development Bank resolution of 2026 on lex.uz, in its Russian text, and the Cabinet of Ministers' 2025 medicines registration regulation in its Uzbek original; the 2020 resolution founding the State Medical Insurance Fund and the President's office report of May 2021 on president.uz; the national cancer centre's own pages; UZINFOCOM's note on the Cancer-registr software; the IAEA's imPACT Review summaries of 2014 and 2022; WHO Europe's HPV release and WHO's immunisation and health expenditure rows from its public APIs; IARC's GLOBOCAN 2024 fact sheet; a ClinicalTrials.gov query; and the papers through Europe PMC. Where lex.uz marks a Russian text as an unofficial translation, the Uzbek text is the binding one. The new records added for this page (the Ministry, the national cancer centre, the insurer, the regulator, the registry, two specialist centres and five papers) carry their own sources.",
  verify:
    "National incidence figures are IARC estimates built from death records, not a registry count. What the State Medical Insurance Fund pays for, which medicines are registered and in stock, and how referrals work are changing through 2026 and 2027 as the June 2026 resolution takes effect; ask your family polyclinic or the national cancer centre's line, 1303, what applies to you. Screening is being extended region by region, so availability depends on where you live.",
  verifyLinks: [
    { label: "Ministry of Health of Uzbekistan", url: "https://gov.uz/en/ssv" },
    { label: "Cancer Center Uzbekistan (national cancer centre)", url: "https://cancercenter.uz/?lang=en" },
    { label: "State Medical Insurance Fund", url: "https://dtsj.uz/" },
    { label: "National database of legislation (lex.uz)", url: "https://lex.uz/" },
  ],
};
