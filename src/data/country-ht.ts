import type { CountryDive } from "@/data/country-dive";

/**
 * Haiti deep dive: the hand-written cards for /countries/ht/ (wave 11). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Haiti (PDF text), WHO's
 * cancer country profile 2020 for Haiti (PDF text), WHO's Global Health Expenditure rows and UHC service coverage index
 * for Haiti from the GHO API, WHO's HPV programme coverage API (which returned no rows for Haiti), WHO's list of
 * regulators at maturity level 3 and 4 (August 2026, PDF text), IAEA DIRAC's public equipment report, the IAEA's
 * imPACT Review summary for Haiti of March 2013 (PDF text), the Ministry of Health's (MSPP) home page, its register of
 * authorised medicines and its essential medicines list of January 2020 (PDF text), OFATMA's 2014 to 2015 annual report
 * (PDF text), PAHO's news releases of June 2021 and September 2026, Dana-Farber's Haiti clinical care page, Partners In
 * Health's 2013 and 2019 articles (read through the Internet Archive, as pih.org refused a plain request), a Prensa
 * Latina report of November 2025, a Le Nouvelliste article of February 2026, and the papers' abstracts through Europe
 * PMC. Haiti is a fragile setting with armed violence and displacement; this page states only what those sources say.
 * Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/332-haiti-fact-sheet.pdf";
const WHO_CCP = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/hti-2020.pdf";
const WHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'HTI'";
const WHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'HTI'";
const WHO_EXT = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'HTI'";
const WHO_CHEGDP = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20'HTI'";
const WHO_UHC ="https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'HTI'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'HTI'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const IAEA_IMPACT_2013 = "https://iaea.org/sites/default/files/documents/review-missions/haiti-2013-impact-review.pdf";
const MSPP = "https://www.mspp.gouv.ht/";
const MSPP_MEDS = "https://mspp.gouv.ht/medicaments-autorises";
const LNME_2020 = "https://www.mspp.gouv.ht/sites/default/files/2025-12/Liste%20Nationale%20des%20M%C3%A9dicaments%20Essentiels%202e%20%C3%A9dition_publication%202022%20%281%29.pdf";
const OFATMA = "https://www.ofatma.gouv.ht/";
const OFATMA_2015 = "https://www.ofatma.gouv.ht/medias/document/rapport_Annuel_2014_2015_web.pdf";
const PAHO_PED = "https://www.paho.org/fr/nouvelles/28-6-2021-validation-du-plan-national-operationnel-cancer-pediatrique-2021-2026";
const PAHO_NCD = "https://www.paho.org/fr/nouvelles/18-9-2026-haiti-lance-plan-strategique-national-prevention-et-controle-des-maladies-non";
const DFCI_HAITI = "https://dana-farber.org/global-health/global-cancer-medicine/haiti-clinical-care";
const PIH_2013 = "https://www.pih.org/article/cancer-care-expands-at-university-hospital";
const PIH_2013_WB = "https://web.archive.org/web/2026/https://www.pih.org/article/cancer-care-expands-at-university-hospital";
const PIH_2019_WB = "https://web.archive.org/web/2026/https://www.pih.org/article/evolution-cancer-care-haiti";
const PRENSA_HPV = "https://www.plenglish.com/?p=269096";
const NOUVELLISTE = "https://lenouvelliste.com/en/article/264064/13000-annual-cancer-cases-highlight-gaps-in-haitis-healthcare-system";
const PAHO_VAX = "https://www.paho.org/fr/nouvelles/21-9-2026-vaccination-infantile-haiti-plus-100-000-enfants-immunises-lissue-dune-campagne";
const CTGOV = "https://clinicaltrials.gov/search?country=Haiti&cond=cancer";

export const HT_DIVE: CountryDive = {
  iso2: "HT",
  iso3: "HTI",
  name: "Haiti",
  flag: "🇭🇹",
  asOf: "2026-11-11",
  title: "Cancer in Haiti",
  description:
    "Cancer in Haiti from WHO, PAHO, IAEA and Haitian sources: IARC's estimate of 14,703 new cancers and 9,428 deaths in 2024 with no cancer registry behind it, prostate and breast cancer leading, no radiotherapy centre in the IAEA's database, households paying 52% of health spending out of pocket, free cancer care at the University Hospital of Mirebalais, one paediatric oncology unit, and why no trial in our records has a site in Haiti.",
  lede:
    "Haiti has no cancer registry, so its national figures are IARC models: 14,703 new cancers and 9,428 deaths in 2024, with prostate cancer the commonest in men and breast and cervical cancer in women. Treatment is scarce and concentrated in a few hospitals, the IAEA's radiotherapy database lists no centre in the country, and PAHO describes health teams working around the insecurity that affects the country.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Haiti is 14,703 new cancers and 9,428 deaths, an age-standardised incidence of 166.7 per 100,000 (174.5 in men, 169.7 in women) and mortality of 111.1, in a population of 11,772,562; 180 of the cancers are non-melanoma skin cancers. IARC's fact sheet gives no country-specific source for incidence: its method is national mortality estimates applied to modelled mortality-to-incidence ratios. For mortality it names WHO national data, scaled to regional all-cancer rates. WHO's 2020 country profile warned that Haiti's incidence estimates carry a high degree of uncertainty because they are not based on a population-based registry, and that mortality estimates are uncertain because they are not based on national data on deaths from non-communicable diseases; it rated mortality registration for 2007 to 2016 as no coverage. So every number in this table is a model, not a count. For comparison, WHO's profile gave 12,366 cases and 8,914 deaths for 2018, and the IAEA in 2013 quoted IARC at more than 8,400 new cancers a year.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Haiti",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Haiti (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 14,700 new cancers a year; prostate cancer leads in men, breast and cervical cancer in women",
          plain:
            "IARC estimates 14,703 new cancers in Haiti in 2024, 8,514 in women and 6,189 in men, and 9,428 deaths. Prostate cancer is more than a third of cancers in men. In women breast cancer comes first and cervical cancer second. For every ten new cancers IARC estimates about six deaths in the same year.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,146 prostate cancers (1,343 deaths), 1,952 breast cancers (880 deaths), 1,136 colorectal cancers (680 deaths), 1,091 cervical cancers (659 deaths), 1,089 stomach cancers (828 deaths), 937 liver cancers (864 deaths) and 782 lung cancers (705 deaths). Prostate cancer is 34.7% of cancers in men, followed by stomach (579) and liver (463); in women breast cancer is 22.9% and cervical cancer 12.8%, followed by colorectum (700). The risk of developing a cancer before age 75 is 14.4% for men and 15.6% for women, and an estimated 26,463 people are living within five years of a diagnosis. Deaths divided by new cases give 0.64 for 2024. WHO's 2020 profile estimated 541 cancers a year in children aged 0 to 14. Because there is no registry, these are modelled figures; see the note under the table below.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Haiti (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
          ],
        },
        {
          id: "capacity",
          title: "No radiotherapy centre in the IAEA's database, and few specialists",
          plain:
            "The IAEA's database of radiotherapy centres holds no centre in Haiti. WHO's 2020 profile recorded no radiotherapy machine, no radiation oncologist and no medical physicist in 2019. Partners In Health wrote in 2013 that its patients were referred to a partner hospital in the Dominican Republic for radiotherapy.",
          detail:
            "IAEA DIRAC's public equipment report, read on 11 November 2026, lists no radiotherapy centre, megavoltage machine or brachytherapy unit for Haiti; that is what the database holds, not proof that none exists. WHO's cancer country profile 2020 gives, per 10,000 cancer patients, 0.0 external beam radiotherapy units, radiation oncologists, medical physicists and nuclear medicine physicians (2019), 8.9 mammography units and 3.2 CT scanners (2020), 0.8 MRI scanners, no PET scanner, 32.3 radiologists (2019) and 93.0 surgeons (2014). It records pathology services and community or home-based palliative care as generally not available, and that it did not know whether bone marrow transplantation was possible. The IAEA's imPACT Review mission of 18 to 21 February 2013, with WHO and IARC, reported that the government had begun building a National Radiotherapy Centre after the 2010 earthquake destroyed the State University Hospital in Port-au-Prince. OnCo found no source saying it opened; see the gaps.",
          links: [
            { label: "IAEA DIRAC: equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
            { label: "IAEA: imPACT Review, Haiti, February 2013 (PDF)", url: IAEA_IMPACT_2013 },
            { label: "Partners In Health: cancer care expands at University Hospital (20 December 2013; read through the Internet Archive)", url: PIH_2013_WB },
          ],
        },
      ],
      tables: [
        {
          id: "ht-top-cancers",
          title: "The commonest cancers in Haiti, as IARC estimates them",
          caption: "New cases, deaths and age-standardised rates per 100,000 (world standard), both sexes, 2024. From IARC's GLOBOCAN 2024 fact sheet.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "asrInc", label: "Incidence rate", numeric: true },
            { key: "asrMort", label: "Death rate", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 2146, deaths: 1343, asrInc: 70.8, asrMort: 44.3 },
            { site: "Breast", cases: 1952, deaths: 880, asrInc: 38.9, asrMort: 18.1 },
            { site: "Colorectum", cases: 1136, deaths: 680, asrInc: 13.4, asrMort: 8.5 },
            { site: "Cervix", cases: 1091, deaths: 659, asrInc: 21.5, asrMort: 13.0 },
            { site: "Stomach", cases: 1089, deaths: 828, asrInc: 12.3, asrMort: 9.8 },
            { site: "Liver", cases: 937, deaths: 864, asrInc: 10.6, asrMort: 9.9 },
            { site: "Lung", cases: 782, deaths: 705, asrInc: 9.2, asrMort: 8.4 },
            { site: "All cancers", cases: 14703, deaths: 9428, asrInc: 166.7, asrMort: 111.1 },
          ],
          note: "Haiti has no population-based cancer registry, so this table is IARC's model, not a count. Rates for prostate, breast and cervix are per 100,000 of the sex concerned. The all-cancers row includes non-melanoma skin cancer.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Haiti (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: no registry, and hospital series instead",
      aside: { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
      cards: [
        {
          id: "no-registry",
          title: "No population-based registry; what is known comes from hospital records",
          plain:
            "Haiti has no population-based cancer registry, and IARC's fact sheet lists no Haitian source for its incidence figures. What is measured comes from hospital series: in one breast cancer programme in Port-au-Prince, 84% of women were diagnosed at stage III or IV. The paediatric cancer plan of 2021 includes collecting data on childhood cancers.",
          detail:
            "WHO's 2020 profile records no information on a population-based registry in 2019 and no coverage of mortality registration for 2007 to 2016, and IARC's 2024 fact sheet states \"no data\" as the country-specific incidence source. An early special survey counted cancers first diagnosed in 1979 to 1984 and found stomach and intestine, liver, cervix, penis and Kaposi sarcoma commonest (Mitacek et al., 1986). Recent figures come from hospital cohorts: among 525 women in Innovating Health International's breast cancer programme in Port-au-Prince from 2013 to 2017, 83.9% of those staged had stage III or IV disease, more than half had waited over a year after noticing a lump, 38.5% of tumours tested were triple-negative and 12-month mortality was 18.4%. The national operational plan for paediatric cancer 2021 to 2026, validated by the Ministry of Health's Direction de Cancérologie with PAHO/WHO, includes strengthening data collection on childhood cancer cases.",
          links: [
            { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
            { label: "DeGennaro et al., features of breast cancer in Haiti (J Glob Oncol 2018)", url: "https://doi.org/10.1200/JGO.17.00135" },
            { label: "Mitacek et al., cancer in Haiti 1979 to 1984 (Int J Cancer 1986)", url: "https://doi.org/10.1002/ijc.2910380103" },
            { label: "PAHO: validation of the national operational plan for paediatric cancer 2021 to 2026 (28 June 2021, French)", url: PAHO_PED },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: mostly households and donors",
      aside: { label: "WHO Global Health Expenditure Database: out-of-pocket share, Haiti (API)", url: WHO_OOP },
      cards: [
        {
          id: "oop",
          title: "Households pay more than half of all health spending out of pocket",
          plain:
            "In WHO's figures for 2023, people in Haiti paid 52% of the country's health spending out of their own pockets, foreign donors paid 32% and the government 9%. The public social insurer, OFATMA, covers those who pay contributions, mainly formal-sector workers and civil servants, and reported just over half a million insured people and dependants in 2015.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket payments as 52.4% of current health expenditure in 2023, up from 38.9% in 2018 and 45.5% in 2021; external sources 31.6% (42.3% in 2019); and domestic general government spending 9.3% (12.2% in 2017). Current health spending was 3.2% of GDP in 2023, and WHO's universal health coverage service index for Haiti was 44 out of 100 in 2023. OFATMA, created by decree in 1983, ran only work accident insurance for decades; its 2014 to 2015 annual report says it took over civil servants' health insurance from October 2014, began enrolling for sickness and maternity insurance in January 2015 and launched a voluntary scheme for people in the informal economy in July 2015, and on 30 September 2015 managed more than half a million insured people and dependants. OnCo found no later figure and no statement of which cancer treatments it pays for.",
          links: [
            { label: "WHO GHO: out-of-pocket share of current health expenditure, Haiti (API)", url: WHO_OOP },
            { label: "WHO GHO: government share of current health expenditure, Haiti (API)", url: WHO_GOV },
            { label: "WHO GHO: external share of current health expenditure, Haiti (API)", url: WHO_EXT },
            { label: "WHO GHO: current health expenditure as a share of GDP, Haiti (API)", url: WHO_CHEGDP },
            { label: "WHO GHO: UHC service coverage index, Haiti (API)", url: WHO_UHC },
            { label: "OFATMA: annual report 2014 to 2015 (PDF, French)", url: OFATMA_2015 },
          ],
        },
        {
          id: "medicines-list",
          title: "Cancer medicines are on the national list, for university and specialist hospitals",
          plain:
            "Haiti's essential medicines list of 2020 includes the cancer medicines most often used, from older chemotherapy to tamoxifen, imatinib, trastuzumab and rituximab, for use in university and specialist hospitals. Oral morphine for pain is listed from community referral hospitals upward. Being on the list does not mean a medicine is in stock or free.",
          detail:
            "The second edition of the Liste Nationale des Médicaments Essentiels, dated January 2020 and coordinated by the Ministry's medicines directorate (DPM/MT), has 596 medicines in 30 therapeutic groups and a complementary list of 139 products. Its section on cytotoxics, in the complementary list, has 49 entries, including cisplatin, carboplatin, doxorubicin, paclitaxel, docetaxel, capecitabine, imatinib, rituximab and trastuzumab, and its hormones section lists tamoxifen, anastrozole, bicalutamide and leuprorelin, all marked for tertiary level (university and specialised hospitals). Oral and injectable morphine are marked for community referral hospitals, departmental hospitals and university hospitals. WHO's 2020 profile gives the availability of opioids for pain as 5 defined daily doses per million people per day for 2015 to 2017. The list asks facilities to buy generics. WHO's 2020 profile rated palliative care at home or in the community as generally not available. A 2015 study at the University Hospital of Mirebalais, where treatment was free, found that more than two thirds of 61 women with breast cancer still met criteria for catastrophic spending, with a median 717 US dollars spent out of pocket, and 52% went into debt.",
          links: [
            { label: "MSPP: Liste Nationale des Médicaments Essentiels, 2nd edition, January 2020 (PDF)", url: LNME_2020 },
            { label: "O'Neill et al., out-of-pocket costs of free breast cancer care in Haiti (Surgery 2015)", url: "https://doi.org/10.1016/j.surg.2015.04.040" },
            { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: a directorate of the Ministry of Health",
      aside: { label: "MSPP: médicaments autorisés", url: MSPP_MEDS },
      cards: [
        {
          id: "dpm-mt",
          title: "Medicines are authorised by the Ministry's pharmacy directorate, which publishes its register",
          plain:
            "Haiti has no separate medicines agency. The Ministry of Health's Direction de la Pharmacie, du Médicament et de la Médecine Traditionnelle (DPM/MT) handles medicines, and the Ministry publishes a register of authorised medicines. Haiti is not on WHO's list of regulators rated at maturity level 3 or 4.",
          detail:
            "On 11 November 2026 the Ministry's register of authorised medicines held 1,178 products, listed by name, pack, form and strength, with no dates of authorisation. Searching it by name found few cancer medicines: tamoxifen (two brands), anastrozole, letrozole, bicalutamide, goserelin, imatinib, fluorouracil, methotrexate and zoledronic acid, as well as morphine sulfate. Many medicines on the essential list, such as trastuzumab, rituximab, paclitaxel and doxorubicin, did not appear in it by name. OnCo found no published guideline on how DPM/MT registers a medicine, how long it takes, whether it relies on other regulators' approvals, or how clinical trials are authorised. WHO's list of regulators operating at maturity level 3 or 4, dated August 2026, does not include Haiti; that list names only those that reached those levels and says nothing about others.",
          links: [
            { label: "MSPP: médicaments autorisés (register)", url: MSPP_MEDS },
            { label: "MSPP: Liste Nationale des Médicaments Essentiels, 2nd edition, January 2020 (PDF)", url: LNME_2020 },
            { label: "WHO: list of regulatory authorities operating at maturity level 3 and 4 (August 2026)", url: WHO_ML },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening is opportunistic; projects test women with HPV self-swabs",
          plain:
            "WHO's 2020 profile describes cervical screening in Haiti as opportunistic, offered when women happen to attend, not by invitation, with HPV testing as the method, and says participation was not known. Projects have taken HPV self-swabs to women where they live and work, and treated abnormal areas on the spot.",
          detail:
            "WHO's profile for 2019 records a cervical screening programme of the opportunistic type using HPV tests, with participation rates and a defined referral system marked as not known, and a breast cancer screening programme starting at age 40; early detection programmes or guidelines existed for 3 of the 4 cancers WHO asked about (breast, cervix, colon and childhood cancer). In a 2009 to 2010 project in the Central Plateau, 13 community health workers enrolled 493 women aged 30 to 50 for HPV self-sampling: 12.7% of 426 samples were positive for high-risk HPV and 85.2% of those received follow-up care. In garment factories near Port-au-Prince, Innovating Health International screened 4,005 of 4,153 eligible women with HPV self-swabs; 25% tested positive and 90% of them had visual inspection and thermocoagulation in the factory infirmary, for a total cost of 76,000 US dollars. Prensa Latina reported in November 2025 that PAHO/WHO had donated 10 thermocoagulation devices to the Ministry.",
          links: [
            { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
            { label: "Mandigo et al., community health workers and HPV self-sampling in rural Haiti (Int J Gynaecol Obstet 2015)", url: "https://doi.org/10.1016/j.ijgo.2014.09.016" },
            { label: "DeGennaro et al., cervical screening for factory employees in Haiti (Int J Gynaecol Obstet 2025)", url: "https://doi.org/10.1002/ijgo.15940" },
            { label: "Prensa Latina: Haiti announces HPV vaccination campaign (6 November 2025)", url: PRENSA_HPV },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination: a campaign announced in 2025, but no coverage reported to WHO",
          plain:
            "Haiti has reported no HPV vaccination coverage to WHO: the WHO data service returned no rows for Haiti on 11 November 2026. In November 2025 the Minister of Health announced an HPV vaccination campaign for the most vulnerable adolescent girls, according to the news agency Prensa Latina. OnCo found no official figure for how many girls have been vaccinated.",
          detail:
            "WHO's public immunisation data API, queried for HPV programme coverage rows with the code HTI on 11 November 2026, returned an empty result, and WHO's 2020 cancer profile marks HPV vaccination programme coverage for 2018 as not available. Prensa Latina reported on 6 November 2025 that the Minister of Public Health and Population, Dr Bertrand Sinal, announced a campaign against human papillomavirus to prevent cervical cancer in the most vulnerable adolescent girls, working with PAHO/WHO; it gives no target number or start date. Until official coverage figures are published, families should ask their local health centre or the Ministry whether the vaccine is offered where they live.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Haiti (API; empty on 11 November 2026)", url: WHO_HPV_API },
            { label: "Prensa Latina: Haiti announces HPV vaccination campaign (6 November 2025)", url: PRENSA_HPV },
            { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Haiti does",
      title: "What Haiti does differently",
      cards: [
        {
          id: "mirebalais",
          title: "Free cancer care in a public hospital run with a non-profit partner",
          plain:
            "At the University Hospital of Mirebalais, built by the government and Partners In Health after the 2010 earthquake, cancer treatment is free. Its oncology team gives chemotherapy and surgery, with Dana-Farber oncologists joining weekly tumour boards. Dana-Farber calls it the only provider of free oncology services in Haiti.",
          detail:
            "Partners In Health and its Haitian sister organisation Zanmi Lasante began treating cancer in Cange in the early 2000s and moved the service to Mirebalais in 2013, where the team saw about 700 patients between July and November that year; from July to September, 40% of diagnoses were breast cancer. Dana-Farber's Center for Global Cancer Medicine, a partner since 2012, says the clinic sees more than 45 patients a day, moved into the Centre Roselene Jean Bosquet in 2018, and works from standard protocols, with weekly tumour boards and second-opinion pathology at Brigham and Women's Hospital. In 341 women with breast cancer that had not spread, treated there from 2012 to 2016, 81.5% had curative-intent surgery and 63.4% were alive without progression or recurrence at three years; the authors conclude that curative treatment is possible in Haiti. A later study by the same team, of 312 women with non-metastatic breast cancer in Haiti, found that nearly half had delays of more than 12 weeks in surgery and in starting chemotherapy after it. Free care is not costless for families: see Who pays.",
          links: [
            { label: "Dana-Farber: CGCM and Haiti clinical care", url: DFCI_HAITI },
            { label: "Partners In Health: the evolution of cancer care in Haiti (19 March 2019; read through the Internet Archive)", url: PIH_2019_WB },
            { label: "Fadelu et al., non-metastatic breast cancer in Haiti (Oncologist 2020)", url: "https://doi.org/10.1634/theoncologist.2019-0951" },
            { label: "Fadelu et al., gaps in timeliness of breast cancer treatment in Haiti (Breast Cancer Res Treat 2022)", url: "https://doi.org/10.1007/s10549-022-06582-8" },
          ],
        },
        {
          id: "childhood",
          title: "One paediatric cancer unit, costed and shown to be good value",
          plain:
            "PAHO in 2021 and a 2024 study describe one dedicated paediatric cancer unit in Haiti, at Saint-Damien hospital in Port-au-Prince. A study of its costs found that treating a child cost about 10,854 US dollars, and that this was very cost-effective by WHO's measure. A national plan for childhood cancer covers 2021 to 2026.",
          detail:
            "PAHO's June 2021 release on the national operational plan for paediatric cancer 2021 to 2026 quotes a doctor from Saint-Damien hospital, which it describes as the only care centre in the country with a paediatric oncology service; the plan was validated at a workshop of the Ministry of Health, specialised centres, PAHO/WHO and St Jude Global Alliance, and covers data collection, standard treatment protocols and training in early diagnosis, treatment, supportive and palliative care. Costing the unit from 2017 or 2018 records, researchers from St Jude and the hospital found that it treated 74 newly diagnosed children a year at an annual cost of 803,184 US dollars; pharmacy was a quarter of the budget, and the cost per disability-adjusted life year averted was 1,128 dollars, 76% of GDP per head. WHO estimated 541 cancers a year in children aged 0 to 14 in 2020; OnCo found no published figure for how many of these children reach treatment.",
          links: [
            { label: "PAHO: validation of the national operational plan for paediatric cancer 2021 to 2026 (28 June 2021, French)", url: PAHO_PED },
            { label: "Bolous et al., cost and cost-effectiveness of childhood cancer treatment in Haiti (ecancermedicalscience 2024)", url: "https://doi.org/10.3332/ecancer.2024.1675" },
            { label: "WHO: cancer country profile 2020, Haiti (PDF)", url: WHO_CCP },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and national plans",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Haiti",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Haiti. Haitian cancer research on this page is observational: hospital cohorts of women with breast cancer, screening projects, and the costing of childhood cancer care.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Haiti among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study in Haiti; the search linked below shows cancer studies registered with a Haitian site. Published cancer research from Haiti comes mostly from partnerships: the University Hospital of Mirebalais with Dana-Farber, whose 2026 study of 85 women after mastectomy found that nearly all had received chemotherapy and that depressive symptoms were widespread; Innovating Health International in Port-au-Prince with the University of Florida; and Saint-Damien hospital with St Jude. A 2024 paper by doctors at Mirebalais and in the United States describes delivering gynaecological cancer treatment amid insecurity.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Haiti (search)", url: CTGOV },
            { label: "Turenne et al., quality of life after mastectomy for breast cancer in Haiti (JCO Glob Oncol 2026)", url: "https://doi.org/10.1200/GO-26-00132" },
            { label: "Millien et al., delivering safe gynecologic oncology treatment amid insecurity in Haiti (Int J Gynecol Cancer 2024)", url: "https://doi.org/10.1136/ijgc-2023-005007" },
          ],
        },
        {
          id: "plans",
          title: "Plans: childhood cancer from 2021, and a non-communicable disease plan launched in August 2026",
          plain:
            "WHO recorded no national cancer control plan in effect in 2019. Since then the Ministry of Health has validated a paediatric cancer plan for 2021 to 2026 and, in August 2026, launched a national plan for non-communicable diseases for 2026 to 2031; PAHO reports that the Ministry's coordination unit for these diseases has a cancer programme. In February 2026 the newspaper Le Nouvelliste reported a Haitian oncologist, speaking on a radio show, lamenting the absence of a structured cancer programme at the Ministry.",
          detail:
            "WHO's 2020 profile marks a national cancer control plan as not in effect for 2019 and gives no entry (n/a) for an integrated non-communicable disease plan. The IAEA wrote after its 2013 imPACT Review that its recommendations were expected to guide the drafting of a national cancer control plan. PAHO reports that on 31 August 2026 the Ministry, with PAHO/WHO, launched the National Strategic Plan for the Prevention and Control of Non-communicable Diseases and Injuries 2026 to 2031; these conditions cause more than 65% of deaths in Haiti, and a coordination unit (UCMNTT) now has programmes for cardiovascular disease, cancers, oral health and injuries. PAHO will support training of a first cohort of 50 leaders under the NCD Compact. Le Nouvelliste reported on 5 February 2026 that, on the Magik 9 radio morning show, Dr Joseph Bernard Jr, executive director of the cancer clinic of Saint-François de Sales Hospital and of the Saint Peregrine Cancer Clinic in Les Cayes, lamented the absence of a structured cancer programme at the Ministry. OnCo has not read the text of the 2026 plan.",
          links: [
            { label: "PAHO: Haiti launches its national strategic plan for non-communicable diseases and injuries 2026 to 2031 (18 September 2026, French)", url: PAHO_NCD },
            { label: "IAEA: imPACT Review, Haiti, February 2013 (PDF)", url: IAEA_IMPACT_2013 },
            { label: "Le Nouvelliste: 13,000 annual cancer cases highlight gaps in Haiti's healthcare system (5 February 2026)", url: NOUVELLISTE },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "radiotherapy-centre",
      title: "Whether any radiotherapy is given in Haiti is not confirmed",
      plain:
        "The IAEA's database lists no radiotherapy centre in Haiti, and WHO recorded none in 2019. The IAEA wrote in 2013 that a National Radiotherapy Centre was under construction. OnCo found no official source saying it opened, or saying where Haitian patients are referred for radiotherapy today.",
      detail:
        "IAEA DIRAC, read on 11 November 2026, holds no Haitian centre; DIRAC depends on what countries and centres report, so an absence there is not proof. WHO's 2020 profile gives 0.0 external beam radiotherapy units per 10,000 cancer patients for 2019. The IAEA's 2013 imPACT summary says construction of a National Radiotherapy Centre had been initiated; the full imPACT report was not found. Partners In Health wrote in 2013 that it referred patients to a partner hospital in the Dominican Republic; OnCo could not confirm whether that continues. Ask the treating hospital what is available and where.",
      links: [
        { label: "IAEA DIRAC: equipment by centre", url: DIRAC },
        { label: "IAEA: imPACT Review, Haiti, February 2013 (PDF)", url: IAEA_IMPACT_2013 },
      ],
    },
    {
      id: "insecurity-services",
      title: "Which cancer services are open now, amid insecurity, is not known",
      plain:
        "PAHO describes vaccination teams in 2026 adapting to a complex security situation, and campaigns in the parts of the West department most affected by the insecurity that affects the country. OnCo could not find an official, dated statement of which hospitals were giving cancer treatment in November 2026, including Mirebalais and Saint-Damien.",
      detail:
        "The hospital descriptions on this page come from Dana-Farber's page, Partners In Health articles of 2013 and 2019 (pih.org refused a plain request on 11 November 2026 and the articles were read through the Internet Archive), PAHO's 2021 release and published papers whose data end in 2023 at the latest. A 2024 paper by Mirebalais gynaecologists describes delivering cancer treatment amid insecurity, but its abstract was not available to read. Before travelling, call the hospital or ask a local health centre whether the oncology service is open.",
      links: [
        { label: "PAHO: childhood vaccination campaign in three departments (21 September 2026, French)", url: PAHO_VAX },
        { label: "Partners In Health: cancer care expands at University Hospital (2013)", url: PIH_2013 },
        { label: "Millien et al., delivering safe gynecologic oncology treatment amid insecurity in Haiti (Int J Gynecol Cancer 2024)", url: "https://doi.org/10.1136/ijgc-2023-005007" },
        { label: "Dana-Farber: CGCM and Haiti clinical care", url: DFCI_HAITI },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: HPV vaccine coverage, cervical screening coverage, how many people OFATMA covers now and what it pays for cancer, how medicines are registered and how long it takes, and the text of the 2026 non-communicable disease plan.",
      detail:
        "WHO's HPV coverage API returned no rows for Haiti, and the November 2025 campaign is known here only from a news agency report, not from PAHO or the Ministry. WHO's 2020 profile records cervical screening participation as not known. OFATMA's coverage figure is from September 2015; pages on its website meant to give current figures did not load. The essential medicines list was read from the Ministry's website on 11 November 2026; when it was checked again later that day, the Ministry's server returned 'page not found' for it and for other documents linked from its home page. The Ministry's register of authorised medicines carries no dates, and OnCo found no DPM/MT guideline on registration, reliance or trial authorisation. The 2021 paediatric plan and the 2026 non-communicable disease plan are known only from PAHO's releases. IARC's detailed data sources page for Haiti was not read; the method is taken from the fact sheet. No survival figures for Haiti beyond single hospital cohorts were found.",
      links: [
        { label: "WHO immunisation data: HPV programme coverage rows for Haiti (API)", url: WHO_HPV_API },
        { label: "OFATMA: home page", url: OFATMA },
        { label: "MSPP: home page", url: MSPP },
      ],
    },
  ],
  institutions: [
    "haiti-mspp", "haiti-dpm-mt", "ofatma-haiti", "hopital-universitaire-mirebalais", "hopital-saint-damien-haiti",
    "dana-farber", "st-jude", "who", "iarc", "iaea",
  ],
  companies: [],
  drugs: ["tamoxifen", "trastuzumab", "imatinib"],
  trials: [],
  papers: [
    "paper-fadelu-nonmetastatic-breast-haiti-oncologist-2020", "paper-oneill-oop-free-breast-care-haiti-surgery-2015", "paper-bolous-childhood-cancer-cost-haiti-ecancer-2024",
  ],
  people: [],
  how:
    "Every card was written from WHO, PAHO, IAEA and Haitian sources and peer-reviewed papers, read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer country profile, its health expenditure and coverage rows from the GHO API, its HPV coverage API and its August 2026 list of regulators at maturity levels 3 and 4; IAEA DIRAC and the IAEA's 2013 imPACT summary; the Ministry of Health's register of authorised medicines and its 2020 essential medicines list; OFATMA's 2014 to 2015 annual report; PAHO's 2021 and 2026 releases; Dana-Farber's and Partners In Health's pages on Mirebalais, the latter through the Internet Archive; and the papers through Europe PMC. Two news reports, from Prensa Latina and Le Nouvelliste, are quoted only as reports. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, its pharmacy directorate, OFATMA, two hospitals and three papers) carry their own sources.",
  verify:
    "National cancer figures for Haiti are IARC models with no registry behind them. Which hospitals are open, which medicines are in stock and whether radiotherapy is available anywhere change quickly in Haiti's security situation; call the hospital or ask a local health centre before travelling, and ask OFATMA or your employer what your insurance pays for.",
  verifyLinks: [
    { label: "Ministère de la Santé Publique et de la Population", url: MSPP },
    { label: "OFATMA", url: OFATMA },
    { label: "PAHO: Haiti", url: "https://www.paho.org/fr/haiti" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Haiti (PDF)", url: IARC_FACTSHEET },
  ],
};
