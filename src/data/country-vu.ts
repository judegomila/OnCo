import type { CountryDive } from "@/data/country-dive";

/**
 * Vanuatu deep dive: the hand-written cards for /countries/vu/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Vanuatu (PDF text);
 * the Ministry of Health's National Referral Policy, adopted December 2019, and its National Medicines Policy
 * 2015-2020 of September 2015 (PDF text); the Sale of Medicines (Control) Act, Cap. 48, from the Vanuatu Trade Portal
 * (PDF text); WHO's cancer country profile 2020 and cervical cancer country profile 2021 (PDF text); WHO's vaccine
 * introduction, HPV coverage and Global Health Expenditure Database rows from its public data APIs; IAEA DIRAC's public
 * equipment data; the Pasifika Medical Association Group's page for the New Zealand Medical Treatment Scheme; the
 * full text of Sarfati et al. 2019 through PubMed Central; and Aruhuri et al. 2012 through Europe PMC. UICC's member
 * pages refused automated requests (406) on that day, so the Vanuatu Family Health Association's statement is cited
 * from OnCo's record of it, written on 11 November 2026. Where a figure could not be read it is named under `gaps`.
 *
 * Second accuracy pass, 16 November 2026: every source above was fetched again as raw text. The abstract of Paksoy et
 * al. (Trop Geogr Med 1990, PubMed 2260214), which the first draft listed as unread, was read through Europe PMC and
 * its count is now on the page; ClinicalTrials.gov's own API was searched for sites in Vanuatu; DIRAC was read from its
 * public equipment report. UICC (406) and the Pacific Islands Legal Information Institute (403) still refused.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/548-vanuatu-fact-sheet.pdf";
const MOH = "https://moh.gov.vu";
const REFERRAL_POLICY = "https://moh.gov.vu/images/health_policies/policies/Vanuatu_MOH_National_Referral_Policy_-_FINAL.pdf";
const MEDICINES_POLICY = "https://moh.gov.vu/images/health_policies/policies/Vanuatu_National_Medicines_Policy_2015-2020-_Final.pdf";
const SALE_OF_MEDICINES_ACT = "https://tradeportal.gov.vu/media/Sale_of_MedicinesCAP_48.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/vut-2020.pdf";
const WHO_CERVICAL_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-vut-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'VUT'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'VUT'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'VUT'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'VUT'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'VUT'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'VUT'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const NZMTS = "https://pmagroup.org.nz/medical-treatment-scheme";
const CTGOV = "https://clinicaltrials.gov/search?country=Vanuatu&cond=cancer";
const ARUHURI_2012 = "https://doi.org/10.1158/1940-6207.CAPR-11-0515";
const SARFATI_2019 = "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746436/";

export const VU_DIVE: CountryDive = {
  iso2: "VU",
  iso3: "VUT",
  name: "Vanuatu",
  flag: "🇻🇺",
  asOf: "2026-11-16",
  title: "Cancer in Vanuatu",
  description:
    "Cancer in Vanuatu from its own and WHO sources: IARC's estimate of 313 new cancers and 145 deaths in 2024, based on neighbouring countries' data; no radiotherapy or chemotherapy for adults in WHO's and published records; a referral policy under which the Ministry of Health does not fund treatment overseas; a medicines policy under which medicines are free in public facilities; cervical screening by HPV test; and HPV vaccination that began in 2023 and has been nationwide since 2024.",
  lede:
    "The sources read record no radiotherapy in Vanuatu, and a 2019 review describes chemotherapy as available for children only, so on these records most cancer treatment beyond surgery is not available in the country. The Ministry of Health's referral policy says it cannot fund overseas referrals; New Zealand's Medical Treatment Scheme is one route for people who cannot pay. IARC estimates 313 new cancers and 145 deaths in 2024, a figure built from neighbouring countries' data.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Vanuatu is 313 new cancers and 145 deaths, an age-standardised incidence of 131.9 per 100,000 (129.7 in men, 133.6 in women) and mortality of 65.2. The fact sheet names no country-specific incidence source and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\": the incidence is not built from diagnoses made in Vanuatu. For mortality the data source is \"No data\" and the method \"National incidence estimates applied to model-based M:I ratios (neighbouring country registry data)\", so the deaths are in turn derived from that incidence estimate. OnCo found no national registry count to set beside it. The fact sheet's totals with and without non-melanoma skin cancer are the same.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Vanuatu",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Vanuatu (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 310 new cancers a year in IARC's estimate, spread across several cancers",
          plain:
            "IARC estimates 313 new cancers in Vanuatu in 2024, 148 in men and 165 in women, and 145 cancer deaths. Colorectal cancer is the commonest overall at 37 cases, then breast and prostate cancer. The estimate is built from neighbouring countries' data, not from diagnoses made in Vanuatu.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 37 colorectal cancers (12 deaths), 33 breast cancers (12 deaths), 28 prostate cancers (8 deaths), and 25 each of liver (21 deaths), cervical (18 deaths) and thyroid cancer. In men the leading cancers are prostate (28, 18.9%), then liver and colorectum (21 each); in women, breast (33, 20.0%), cervix (25, 15.2%) and thyroid (24). By deaths, liver and lung cancer lead with 21 each, then cervical cancer with 18. The risk of developing cancer before 75 is 14.2%, and of dying of it 7.2%. With numbers this small, a few cases change a ranking.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Vanuatu (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "no-registry",
          title: "No population-based cancer registry in the sources read",
          plain:
            "WHO's 2021 profile says Vanuatu has no population-based cancer registry, and a 2019 review of the Pacific listed its cancer registration status as no data. WHO's 2020 profile describes some registration activity. The only published count OnCo found is a pathology series of 269 confirmed cancers from 1980 to 1986.",
          detail:
            "The three sources use different words for the same gap: \"No\" in WHO's 2021 cervical cancer profile, \"Registration activity\" in its 2020 cancer profile, and \"No data\" in the table of cancer surveillance in Sarfati and colleagues' 2019 review, which also listed no national cancer plan. WHO's 2020 profile rates the quality of mortality registration as having no coverage. Vanuatu is among the countries covered by IARC's Pacific Islands hub for cancer registration, which its page describes as still being implemented with regional partners. The one count OnCo found is old: the abstract of a pathology-based study by Paksoy and colleagues records 269 pathologically confirmed cancers (118 in men, 151 in women) over the seven years 1980 to 1986, with cervical cancer 25.2% of cancers in women, liver cancer 14.4% of those in men, and a high proportion of thyroid cancers. OnCo read the abstract through Europe PMC, not the full paper, and found no later count.",
          links: [
            { label: "WHO: cervical cancer country profile 2021, Vanuatu (PDF)", url: WHO_CERVICAL_2021 },
            { label: "WHO: cancer country profile 2020, Vanuatu (PDF)", url: WHO_PROFILE_2020 },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
            { label: "IARC Global Initiative for Cancer Registry Development: Pacific Islands hub", url: "https://gicr.iarc.who.int/hub/pacific-islands/" },
            { label: "Paksoy et al., cancer occurrence in Vanuatu, 1980-86 (Trop Geogr Med 1990, PubMed abstract)", url: "https://pubmed.ncbi.nlm.nih.gov/2260214/" },
          ],
        },
      ],
      tables: [
        {
          id: "vu-top",
          title: "IARC's leading cancers for Vanuatu, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Colorectum", cases: 37, deaths: 12 },
            { site: "Breast", cases: 33, deaths: 12 },
            { site: "Prostate", cases: 28, deaths: 8 },
            { site: "Liver", cases: 25, deaths: 21 },
            { site: "Cervix uteri", cases: 25, deaths: 18 },
            { site: "Thyroid", cases: 25, deaths: 0 },
            { site: "Lung", cases: 21, deaths: 21 },
            { site: "Leukaemia", cases: 17, deaths: 3 },
            { site: "All cancers", cases: 313, deaths: 145 },
          ],
          note: "IARC bases Vanuatu's incidence on estimates or registry data from neighbouring countries, and derives deaths from that incidence, so a zero here is a product of the model and not a count of no deaths.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Vanuatu (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Ministry of Health: National Referral Policy (adopted December 2019, PDF)", url: REFERRAL_POLICY },
      cards: [
        {
          id: "health-spending",
          title: "Government and donors pay for most care, and policy makes medicines free in public facilities",
          plain:
            "WHO's figures for 2023 put Vanuatu's health spending at about US$143 a person. The government paid 56.6% of it, external donors 32.0%, and people paid 8.4% out of their own pockets. The National Medicines Policy says medicines are provided free at public facilities.",
          detail:
            "The figures are from WHO's Global Health Expenditure Database: current health expenditure per person of US$143.44 in 2023, with the out-of-pocket share steady at about 8% since 2020. The balance between government and donors has swung widely: the external share was 62.5% in 2021 and the government's 26.9%. The National Medicines Policy 2015-2020 states that medicines \"will continue to be provided free-of-charge at the point of delivery at public facilities in accordance with the existing Government policies\". That policy's period has ended and OnCo found no successor, so check with the hospital pharmacy what is supplied and whether any charge applies.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Vanuatu (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: external share (API)", url: WHO_EXT_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "Ministry of Health: National Medicines Policy 2015-2020, section 3 (PDF)", url: MEDICINES_POLICY },
          ],
        },
        {
          id: "overseas-not-funded",
          title: "The Ministry does not pay for treatment overseas; a New Zealand scheme may",
          plain:
            "Vanuatu's National Referral Policy says the Ministry of Health cannot afford overseas referrals and does not fund them. If a patient or family can pay, the Ministry helps arrange the referral. New Zealand's Medical Treatment Scheme takes referrals from Vanuatu for people who cannot afford treatment that is not available at home.",
          detail:
            "The policy, adopted in December 2019, says: \"MOH does not fund referrals to or repatriation from overseas medical services.\" Where the patient or relatives can afford it, the Ministry, through the approval of its Director of Hospital and Curative Services, who must approve any referral out of Vanuatu, helps organise it and contact overseas health facilities, and may assist with medical equipment and a medical escort. The New Zealand scheme is funded by New Zealand's Ministry of Foreign Affairs and Trade and run by the Pasifika Medical Association Group under a contract to January 2028. It covers six countries including Vanuatu, refers patients to New Zealand, Australia or Fiji through each country's referral committee, and also sends visiting specialist teams. Its page does not say how many people with cancer it has referred.",
          links: [
            { label: "Ministry of Health: National Referral Policy (adopted December 2019, PDF)", url: REFERRAL_POLICY },
            { label: "Pasifika Medical Association Group: New Zealand Medical Treatment Scheme", url: NZMTS },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Ministry of Health: National Medicines Policy 2015-2020 (PDF)", url: MEDICINES_POLICY },
      cards: [
        {
          id: "ministry-regulation",
          title: "The Ministry of Health oversees medicines; registration was still an aspiration in 2015",
          plain:
            "The sources OnCo read describe no separate medicines agency in Vanuatu. The National Medicines Policy of 2015 makes the Ministry of Health responsible for regulating medicines and calls it an aspiration that medicines used in Vanuatu should be registered. The Sale of Medicines (Control) Act, read in its 2006 consolidated edition, controls who may sell medicines.",
          detail:
            "The policy says the Ministry oversees the practice of pharmacy and the regulation of medicines, that it is \"an aspiration of the Government of Vanuatu\" that medicines in the public and private sectors be registered and that legislation be made to regulate their manufacture, import, marketing, prescribing and dispensing, and that funding should allow regulatory work to begin, including checking the legality and quality of imports. An Essential Drug List is kept by the National Drug and Therapeutics Committee and should be revised at least every two years. The Sale of Medicines (Control) Act, Cap. 48, restricts who may sell medicines, naming pharmacists and druggists licensed by the Pharmacists Practitioners Commission, has the Director of Customs record imports and send the list to the Director of Health, and lets regulations authorise the Principal Pharmacist to issue directives. OnCo found no source saying registration has since begun.",
          links: [
            { label: "Ministry of Health: National Medicines Policy 2015-2020, sections 1 and 6 (PDF)", url: MEDICINES_POLICY },
            { label: "Sale of Medicines (Control) Act, Cap. 48 (Vanuatu Trade Portal, PDF)", url: SALE_OF_MEDICINES_ACT },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer country profile 2021, Vanuatu (PDF)", url: WHO_CERVICAL_2021 },
      cards: [
        {
          id: "hpv-vaccine",
          title: "HPV vaccination began in 2023 and reached 80% of the girls targeted in 2025",
          plain:
            "Vanuatu introduced the HPV vaccine in part of the country in 2023 and nationwide in 2024. WHO's rows for 2025 give 80% coverage, with 3,689 doses for a target of 4,599 girls. The rows give the same figure for the first and the last dose, and record a one-dose schedule.",
          detail:
            "WHO's vaccine introduction rows record a partial introduction in 2023 and nationwide vaccination from 2024. Its coverage rows give 45% of 3,972 girls in 2023, 43% of 19,076 in 2024, when the target group was several times larger, and 80% of 4,599 in 2025. WHO's 2021 cervical cancer profile, written before the introduction, records no HPV vaccination programme. A table in a 2019 review of the Pacific lists a national programme for 10-year-old girls, which does not agree with WHO's rows; this page follows WHO's.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Vanuatu (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Vanuatu (API)", url: WHO_INTRO_API },
            { label: "WHO: cervical cancer country profile 2021, Vanuatu (PDF)", url: WHO_CERVICAL_2021 },
          ],
        },
        {
          id: "cervical-screening",
          title: "A cervical screening programme using the HPV test; by 2019 screening had reached about one woman in ten",
          plain:
            "WHO's 2021 profile says Vanuatu has a national cervical screening programme using the HPV test for women aged 30 to 65. Its estimate for 2019 is that 8% of women aged 30 to 49 had been screened in the previous five years and 12% had ever been screened.",
          detail:
            "WHO's earlier profile describes screening in 2019 as opportunistic and by Pap smear, so the two profiles record different methods, and the screening figures for 2019 predate the HPV test programme recorded in 2021. The 2021 profile also records national guidelines on managing cervical cancer and a defined referral system from primary care. OnCo's record of the Vanuatu Family Health Association, written from its UICC member statement, says the Association coordinates the national cervical cancer elimination programme with the Ministry of Health, using HPV tests on samples women collect themselves, and was helping the Ministry draft elimination strategy guidelines for the next five years; UICC's page refused a request on 16 November 2026, so that statement was not read again. WHO's 2020 profile ticks a breast screening programme from the age of 40, which no other source OnCo read describes, alongside no mammography machine in the country.",
          links: [
            { label: "WHO: cervical cancer country profile 2021, Vanuatu (PDF)", url: WHO_CERVICAL_2021 },
            { label: "WHO: cancer country profile 2020, Vanuatu (PDF)", url: WHO_PROFILE_2020 },
            { label: "OnCo: Vanuatu Family Health Association", url: "/institutions/vanuatu-family-health-association/" },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer treatment",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "No radiotherapy, and chemotherapy recorded for children only",
          plain:
            "IAEA's radiotherapy directory lists no centre in Vanuatu, and WHO's profiles record no radiotherapy and no chemotherapy service. A 2019 review found chemotherapy available for children only, one pathologist and no radiologist. These sources are several years old, so ask the hospital what is available now.",
          detail:
            "WHO's 2020 profile gives no external beam radiotherapy machine in 2019 and no CT scanner or mammography machine in 2020. Its 2021 cervical cancer profile answers \"No\" for chemotherapy, radiotherapy, cancer surgery and a cancer centre at tertiary level, and \"Yes\" for pathology services. Sarfati and colleagues' table for mid-2018 lists some cytology and histology, ultrasound and X-ray, no operational cancer unit, chemotherapy for paediatric cases only, no medical or radiation oncologist, cancer surgery available, and no formal palliative care; the two sources disagree on surgery. The Ministry's 2019 referral policy counts one national referral hospital, one regional referral hospital and four provincial hospitals. No DIRAC entry is not proof of no radiotherapy, but here WHO's records agree with it.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "WHO: cancer country profile 2020, Vanuatu (PDF)", url: WHO_PROFILE_2020 },
            { label: "WHO: cervical cancer country profile 2021, Vanuatu (PDF)", url: WHO_CERVICAL_2021 },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
            { label: "Ministry of Health: National Referral Policy (adopted December 2019, PDF)", url: REFERRAL_POLICY },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Vanuatu does differently",
      cards: [
        {
          id: "hpv-test-first",
          title: "Cervical screening built on the HPV test, after a survey showed why one visit matters",
          plain:
            "A survey of 987 women in Vanuatu, published in 2012, found a cancer-causing type of HPV in about one in five. Nearly half of the women who screened positive could not be seen again, mainly because they were hard to trace. The authors concluded that a rapid HPV test allowing treatment at the same visit would be essential.",
          detail:
            "Aruhuri and colleagues tested women aged 18 to 64 in a population-based survey. High-risk HPV types were found in 21.7% (19.2% age-standardised, 95% CI 16.4 to 22.0). Among 840 women with adequate cytology, 13.6% had cervical abnormalities, including 3.6% with high-grade lesions and 0.8% with invasive cervical cancer. HPV prevalence fell from 46.1% in women aged 21 or under to 15.3% in those 45 or over, and the authors advised including women over 40 in at least the first round of screening in an unscreened population. WHO's 2021 profile records the HPV test as the primary test of Vanuatu's screening programme. The survey is more than a decade old and does not measure today's prevalence.",
          links: [
            { label: "Aruhuri et al., prevalence of cervical HPV infection in Vanuatu (Cancer Prev Res 2012)", url: ARUHURI_2012 },
            { label: "WHO: cervical cancer country profile 2021, Vanuatu (PDF)", url: WHO_CERVICAL_2021 },
          ],
        },
        {
          id: "referral-policy",
          title: "A written referral policy that says plainly what the Ministry cannot pay for",
          plain:
            "Vanuatu's care is spread over many islands, with one national referral hospital. The Ministry's National Referral Policy sets out how patients are referred between health facilities, and states openly that the Ministry does not fund referral overseas.",
          detail:
            "The policy describes a health service of one national referral hospital, one regional referral hospital, four provincial hospitals, 34 health centres, 91 dispensaries and more than 245 aid posts in 2019. It applies to all health service providers, covers patients who need continuing care after returning from a provincial hospital, including those with chronic illness or needing terminal care, and carries an implementation plan running from 2019 to 2022. It reserves overseas referral for exceptional circumstances where it is clinically indicated, approved by the Director of Hospital and Curative Services. OnCo found no review of how the policy has worked.",
          links: [{ label: "Ministry of Health: National Referral Policy (adopted December 2019, PDF)", url: REFERRAL_POLICY }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Vanuatu",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Vanuatu. OnCo holds a selection of trials, not the whole registry. The registry itself, searched on 16 November 2026, listed two studies with a site in Vanuatu, one on malaria and one on mosquito-borne infections, and none on cancer. The published research OnCo could read on cancer in Vanuatu is almost all about HPV and cervical screening.",
          detail:
            "The one paper with an abstract that OnCo added for this page is the 2012 HPV prevalence survey. Europe PMC also lists a 2021 update on cervical cancer screening in Vanuatu in the International Journal of Gynecological Cancer, written with the Ministry of Health, and studies from 2007 and 2010 on cervical abnormalities and on knowledge of cervical cancer; the 2021 update has no abstract online and OnCo did not read its full text. The 2019 Lancet Oncology review of cancer control in the Pacific carries Vanuatu's rows in its tables.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Vanuatu", url: CTGOV },
            { label: "Aruhuri et al., prevalence of cervical HPV infection in Vanuatu (Cancer Prev Res 2012)", url: ARUHURI_2012 },
            { label: "Allanson et al., an update on cervical cancer screening in Vanuatu (Int J Gynecol Cancer 2021)", url: "https://doi.org/10.1136/ijgc-2020-002129" },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "current-services",
      title: "What cancer treatment Vila Central Hospital gives today was not found",
      plain:
        "The descriptions of cancer services on this page date from 2018 to 2021. OnCo found no Ministry of Health page describing cancer treatment at Vila Central Hospital now, including whether any chemotherapy is given to adults.",
      detail:
        "The Ministry's home page, read on 16 November 2026, carries news items but no cancer service page that OnCo could find. WHO's 2020 profile showed no CT scanner in 2020 and the 2019 review no radiologist; either may have changed. Where patients who can pay are referred, and how many people with cancer New Zealand's scheme has treated, are not published in the sources read. The hospital, the Ministry's Director of Hospital and Curative Services, or the Ikkana Cancer Society can say what is available; OnCo's record places the Society in Port Vila from its UICC listing, which was not re-verified on 16 November 2026.",
      links: [
        { label: "Ministry of Health, Vanuatu", url: MOH },
        { label: "Pasifika Medical Association Group: New Zealand Medical Treatment Scheme", url: NZMTS },
      ],
    },
    {
      id: "plan-and-counts",
      title: "No national cancer plan, no recent cancer count and no survival figures found",
      plain:
        "OnCo found no national cancer control plan for Vanuatu and no count of cancers diagnosed there later than a pathology series from 1980 to 1986. WHO's 2020 profile records a plan for non-communicable diseases in general. OnCo found no survival figure for any cancer.",
      detail:
        "WHO's 2020 profile lists an operational integrated plan for non-communicable diseases in 2019 and no entry for a national cancer control plan; the 2019 review of the Pacific also lists none. OnCo's record of the Vanuatu Family Health Association says the Association was helping the Ministry draft cervical cancer elimination strategy guidelines for the next five years; the document itself was not found. The International Cancer Control Partnership portal was not read. IARC's estimate on this page is the only current national figure, and it is a model; the one count found, 269 pathologically confirmed cancers from 1980 to 1986, is described in the profile section.",
      links: [
        { label: "WHO: cancer country profile 2020, Vanuatu (PDF)", url: WHO_PROFILE_2020 },
        { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
        { label: "Paksoy et al., cancer occurrence in Vanuatu, 1980-86 (Trop Geogr Med 1990, PubMed abstract)", url: "https://pubmed.ncbi.nlm.nih.gov/2260214/" },
      ],
    },
    {
      id: "medicines-list",
      title: "The Essential Drug List and any newer medicines policy were not read",
      plain:
        "The National Medicines Policy OnCo read covers 2015 to 2020. OnCo did not find a later policy or the current Essential Drug List, so which cancer and pain medicines the public system supplies is not on this page.",
      detail:
        "The copy of the Sale of Medicines (Control) Act read is the one on the Vanuatu Trade Portal; whether it includes every amendment was not checked, and the Pacific Islands Legal Information Institute refused an automated request on 16 November 2026. WHO's 2021 profile records palliative care for people with non-communicable diseases as not generally available in primary care or in community or home-based care, and the 2019 review says oral morphine was available but commonly out of stock outside urban areas. The Ministry's Principal Pharmacist is the office the Act and the policy name.",
      links: [
        { label: "Ministry of Health: National Medicines Policy 2015-2020 (PDF)", url: MEDICINES_POLICY },
        { label: "Sale of Medicines (Control) Act, Cap. 48 (Vanuatu Trade Portal, PDF)", url: SALE_OF_MEDICINES_ACT },
      ],
    },
  ],
  institutions: ["vanuatu-ministry-of-health", "vanuatu-family-health-association", "ikkana-cancer-society", "iaea", "who", "iarc"],
  companies: [],
  drugs: ["morphine"],
  trials: [],
  papers: ["paper-aruhuri-hpv-prevalence-vanuatu-cancerprevres-2012"],
  people: [],
  how:
    "Every card was written from Vanuatu's own policies and law and from international agencies, read in full rather than through a summary: the Ministry of Health's National Referral Policy of December 2019 and National Medicines Policy 2015-2020; the Sale of Medicines (Control) Act, Cap. 48; WHO's 2020 cancer profile, its 2021 cervical cancer profile, and its vaccine and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet; the Pasifika Medical Association Group's page for the New Zealand Medical Treatment Scheme; and the papers through Europe PMC and PubMed Central. Trials were counted from OnCo's ClinicalTrials.gov participation data. The one paper record added for this page carries its own sources. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "National incidence figures for Vanuatu are modelled from neighbouring countries, not counted, and the descriptions of services here are several years old. What Vila Central Hospital can treat, whether a referral overseas is possible and who would pay change faster than any policy; ask the hospital, the Ministry of Health or the Vanuatu Family Health Association what applies to you.",
  verifyLinks: [
    { label: "Ministry of Health, Vanuatu", url: MOH },
    { label: "National Referral Policy (PDF)", url: REFERRAL_POLICY },
    { label: "National Medicines Policy 2015-2020 (PDF)", url: MEDICINES_POLICY },
    { label: "New Zealand Medical Treatment Scheme", url: NZMTS },
  ],
};
