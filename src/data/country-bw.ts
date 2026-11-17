import type { CountryDive } from "@/data/country-dive";

/**
 * Botswana deep dive: the hand-written cards for /countries/bw/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Botswana (PDF text),
 * the African Cancer Registry Network's undated page for the Botswana National Cancer Registry, the Ministry of
 * Health and Wellness's multi-sectoral strategy against non-communicable diseases 2018 to 2023 (PDF text, ICCP
 * portal), WHO's Cancer Country Profile 2020 (WHO's own file, which is byte-identical to the ICCP portal's copy) and
 * cervical cancer profile 2021, WHO's immunisation data API, the Botswana Medicines Regulatory Authority's mandate
 * page, a WHO Africa report on its August 2025 self-benchmarking, WHO's August 2026 list of regulators at maturity
 * level 3 and 4, the African Union's treaty status list, the UN in Botswana's August 2023 report on the public
 * radiotherapy centre, WHO Botswana's newsletter for October to December 2025, IAEA DIRAC's public country table, the
 * World Bank's health expenditure series, the ClinicalTrials.gov interface, and the indexed abstracts of six papers
 * resolved through Europe PMC.
 *
 * The strategy PDF is laid out in three columns and pdftotext interleaves them; only passages that read cleanly
 * within one column are used. Sources that refused or could not be read are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/72-botswana-fact-sheet.pdf";
const AFCRN_BW = "https://afcrn.org/index.php/membership/membership-list/118-bncr";
const NCD_STRATEGY = "https://www.iccp-portal.org/sites/default/files/plans/Botswana%20NCD%20Strategy%20Final.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Botswana";
const ICCP_GUIDELINES = "https://www.iccp-portal.org/sites/default/files/resources/Botswana%20Cancer%20Management%20Guidelines%20Final%20Version_Final_Final%20%288%29.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-bwa-2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-bwa-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BWA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'BWA'";
const BOMRA_MANDATE = "https://www.bomra.co.bw/our-mandate/";
const WHO_AFRO_BOMRA = "https://www.afro.who.int/countries/botswana/news/botswana-medicines-regulatory-authority-conducts-five-day-assisted-self-benchmarking-exercise";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const UN_BW = "https://botswana.un.org/en/243955-botswana-opens-its-first-public-radiotherapy-centre-iaea-support";
const WHO_BW_Q4_2025 = "https://afro.who.int/sites/default/files/2026-07/WHO_Botswana_2025_Q4_Newsletter_compressed.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=BW";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=BW";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=BW";
const CTGOV = "https://clinicaltrials.gov/search?country=Botswana&cond=cancer";
const DOI_MATHOMA = "https://doi.org/10.3390/cancers17142374";
const DOI_DRYDEN = "https://doi.org/10.1371/journal.pone.0135602";
const DOI_RAMOGOLA = "https://doi.org/10.1097/qai.0b013e3182426227";
const DOI_MARTEI = "https://doi.org/10.1200/jgo.17.00063";
const DOI_SWART = "https://doi.org/10.1200/go.24.00196";
const DOI_GROVER = "https://doi.org/10.1016/j.gore.2022.101094";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Botswana (PDF)", url: IARC_FACTSHEET };
const L_AFCRN = { label: "African Cancer Registry Network: Botswana National Cancer Registry (undated)", url: AFCRN_BW };
const L_NCD = { label: "Ministry of Health and Wellness: Botswana Multi-Sectoral Strategy for the Prevention and Control of Non-Communicable Diseases 2018 to 2023 (PDF, ICCP portal)", url: NCD_STRATEGY };
const L_WHO_2020 = { label: "WHO: Cancer Country Profile 2020, Botswana (PDF)", url: WHO_PROFILE };
const L_WHO_CX = { label: "WHO: cervical cancer profile 2021, Botswana (PDF, ICCP portal)", url: WHO_CX_2021 };
const L_DIRAC = { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), country table", url: DIRAC };
const L_UN = { label: "UN in Botswana: Botswana opens its first public radiotherapy centre, with IAEA support (30 August 2023)", url: UN_BW };
const L_SWART = { label: "Swart and colleagues: Expanding Geographical Access to Cancer Care in Botswana (JCO Global Oncology, 2024)", url: DOI_SWART };
const L_MATHOMA = { label: "Mathoma and colleagues: cancer incidence trends in people with and without HIV in Botswana, 1990 to 2021 (Cancers, 2025)", url: DOI_MATHOMA };
const L_DRYDEN = { label: "Dryden-Peterson and colleagues: Cancer Incidence following Expansion of HIV Treatment in Botswana (PLoS One, 2015)", url: DOI_DRYDEN };
const L_ICCP = { label: "ICCP portal: resources for Botswana (search)", url: ICCP_SEARCH };

export const BW_DIVE: CountryDive = {
  iso2: "BW",
  iso3: "BWA",
  name: "Botswana",
  flag: "🇧🇼",
  asOf: "2026-11-16",
  title: "Cancer in Botswana",
  description:
    "Cancer in Botswana: a national cancer registry kept by the Ministry of Health, IARC's modelled estimate of 2,900 new cancers and 1,558 deaths in 2024 with cervical cancer leading, health spending of about USD 490 a person with three quarters paid by government and 4.3% out of pocket, four public oncology centres, a public radiotherapy centre opened in Gaborone in July 2023, HPV vaccination since 2015 with 93% first-dose coverage reported for 2024, a national cancer control plan being finalised in the last quarter of 2025, and no trial in OnCo's records with a site in Botswana.",
  lede:
    "Botswana's government pays for about three quarters of the country's health spending, has designated four public hospitals as oncology centres, and opened a public radiotherapy centre in Gaborone in July 2023. Girls have been offered HPV vaccination since 2015, and cervical cancer is the commonest cancer in IARC's estimates for the country, which are modelled figures, not counts.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Botswana is 2,900 new cancers and 1,558 deaths, an age-standardised incidence of 165.0 per 100,000 (182.6 in men, 154.3 in women). These are modelled figures, not counts. The fact sheet gives the incidence method as \"National or subnational rates scaled to regional all-cancer rates\" and names no country-specific data source beside it; deaths come from \"National incidence estimates applied to model-based M:I ratios (registry survival data)\". The Botswana National Cancer Registry's own published figures are older and are set out in the registry table on this page; the ministry's 2018 strategy counted 11,398 cancers registered from 2005 to 2012 and said an average of 1,200 are registered a year.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Botswana",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 2,900 new cancers a year by IARC's estimate; cervical cancer leads for cases and for deaths",
          plain:
            "IARC estimates 2,900 new cancers in Botswana in 2024, 1,510 of them in women, and 1,558 cancer deaths. Cervical cancer is the commonest, then breast, prostate, lung and oesophageal cancer. Cervical cancer is also the commonest cause of cancer death, followed by lung and oesophageal cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 502 cervical cancers (331 deaths), 273 breast cancers (79 deaths), 210 prostate cancers (54 deaths), 172 lung cancers (146 deaths), 151 oesophageal cancers (139 deaths), 135 liver cancers (104 deaths) and 131 cases of Kaposi sarcoma (43 deaths). The age-standardised death rate is 92.0 per 100,000 (102.6 in men, 84.7 in women). The risk of developing a cancer before age 75 is 16.9%, and an estimated 7,142 people are living within five years of a diagnosis. Deaths divided by new cases give 0.54 for 2024. IARC's method here is to scale national or subnational rates to regional all-cancer rates, so these are modelled estimates and should not be read as the registry's count.",
          links: [L_IARC],
        },
        {
          id: "registry",
          title: "A national registry inside the Ministry of Health, with 27,726 adult cancers analysed for 1990 to 2021",
          plain:
            "The Botswana National Cancer Registry is population-based and sits in the Ministry of Health's non-communicable disease programme. A 2025 analysis of its data counted 27,726 cancers in adults from 1990 to 2021, about half of them in people living with HIV.",
          detail:
            "The registry's page on the African Cancer Registry Network, which is undated and cites 2012 figures, says the ministry set it up in 1999 with help from the International Association of Cancer Registries; the ministry's 2018 strategy gives 1998. The page says staff collect cases from the two referral hospitals, Princess Marina and Nyangabgwe, and from the radiotherapy department of Gaborone Private Hospital, using notification forms, laboratory reports, death certificates and the electronic patient system, and that cancer is not a notifiable disease, which puts the work on a small team. The strategy says 11,398 cancers were diagnosed and registered from 2005 to 2012, says separately that an average of 1,200 are registered a year, and says the registry had published two incidence reports, in 2006 and 2008. In the 2025 analysis, which used cases reported to the registry and to the National Data Warehouse, 13,737 of the 27,726 adults (49.5%) were living with HIV, 3,505 (12.6%) were not, and HIV status was unknown for 10,484 (37.8%). OnCo did not find a registry report more recent than those the page and the strategy mention.",
          links: [L_AFCRN, L_NCD, L_MATHOMA],
        },
        {
          id: "hiv",
          title: "Much of Botswana's cancer is linked to HIV, and that has shaped which cancers are common",
          plain:
            "From 2003 to 2008, as HIV treatment expanded, 61.6% of the cancers in the national registry were diagnosed in people with HIV. Kaposi sarcoma became less common over those years, while non-Hodgkin lymphoma and cancers associated with HPV became more common.",
          detail:
            "The study, published in PLoS One in 2015, used 8,479 cases from the registry over a period when coverage of antiretroviral treatment rose from 7.3% to 82.3%. It estimated that 45.4% of cancers in men and 36.4% in women were attributable to HIV. Age-adjusted cancer incidence among people with HIV fell by 8.3% a year, but because that population grew larger and older the number of cancers diagnosed each year stayed level. Across the whole population Kaposi sarcoma fell by 4.6% a year, non-Hodgkin lymphoma rose by 11.5% a year and HPV-associated cancers rose by 3.9% a year. The ministry's strategy, using registry data for 2008 to 2012, listed Kaposi sarcoma (24%), oesophageal cancer (9%) and prostate cancer (7%) as the commonest cancers in men, and cervical cancer (26%), breast cancer (16%) and Kaposi sarcoma (14%) in women.",
          links: [L_DRYDEN, L_NCD],
        },
        {
          id: "cervical-outcomes",
          title: "Cervical cancer: most women in a Botswana cohort were diagnosed at stage II or III",
          plain:
            "A study enrolled 1,043 women with cervical cancer in Botswana from 2013 to 2020. Seven in ten were living with HIV, most were diagnosed at stage II or III, and two in three were alive two years later. Survival did not differ by HIV status.",
          detail:
            "The cohort, published in Gynecologic Oncology Reports in 2022, recorded stage I in 17% of women, stage II in 37%, stage III in 35% and stage IV in 8%. Women living with HIV were diagnosed at a median age of 44, against 61 for women without HIV, and 95% of them were on antiretroviral therapy. For treatment, 51% received chemoradiation, 33% radiotherapy, 6% surgery and 7% no treatment. Two-year overall survival was 67%; a later stage and a haemoglobin of 10 g/dL or below were associated with worse survival. The cohort is women who were enrolled in the study, so it is not a count of every cervical cancer in the country.",
          links: [{ label: "Grover and colleagues: Stage and outcomes of invasive cervical cancer patients in Botswana, 2013 to 2020 (Gynecologic Oncology Reports, 2022)", url: DOI_GROVER }],
        },
      ],
      tables: [
        {
          id: "bw-registry",
          title: "What the Botswana National Cancer Registry has reported",
          caption: "Cases registered, by period, as given in the four sources that quote the registry. The periods overlap and the sources count differently, so the rows should not be added together.",
          columns: [
            { key: "period", label: "Period" },
            { key: "cases", label: "Cancers registered", numeric: true },
            { key: "what", label: "What was counted" },
            { key: "source", label: "Where the figure is given" },
          ],
          rows: [
            { period: "1986 to 2004", cases: 2000, what: "Malignant cancers in the registry's first report, 56.7% in women", source: "Registry's network page" },
            { period: "2003 to 2008", cases: 8479, what: "Incident cancers used in a study of HIV treatment and cancer", source: "PLoS One, 2015" },
            { period: "2005 to 2012", cases: 11398, what: "Cancers diagnosed and registered; the strategy also gives an average of 1,200 registered a year", source: "Ministry strategy, 2018" },
            { period: "1990 to 2021", cases: 27726, what: "Cancers in adults aged 18 and over, reported to the registry and the National Data Warehouse", source: "Cancers, 2025" },
          ],
          note: "A registry counts new cases, not deaths. The registry's page says cancer is not a notifiable disease in Botswana, so these are the cases its staff were able to collect.",
          sources: [L_AFCRN, L_DRYDEN, L_NCD, L_MATHOMA],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "oop",
          title: "About USD 490 a person on health in 2023, three quarters of it from government and 4.3% out of pocket",
          plain:
            "Botswana spent about 490 US dollars a person on health in 2023. Government paid 75.5% of it and households paid 4.3% out of their own pockets, according to WHO's health expenditure figures as published by the World Bank.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 492 per person in 2021, 478 in 2022 and 490 in 2023; out-of-pocket spending of 4.3%, 4.4% and 4.3% of current health spending in those years; and domestic government spending of 76.6%, 75.1% and 75.5%. The rest is external funding and private spending other than out-of-pocket payments; the series cited here do not break that remainder down. These are national averages for all health care. OnCo did not find an official page that sets out what a patient is charged for cancer treatment in a public hospital.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Botswana", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Botswana", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Botswana", url: WB_GOV },
          ],
        },
        {
          id: "public-care",
          title: "Radiotherapy at a private hospital was paid for by government; a public centre opened in 2023",
          plain:
            "A survey of Botswana's four public oncology centres in 2021 found that patients who needed radiotherapy were referred to Gaborone Private Hospital at government expense. A public radiotherapy centre opened at Sir Ketumile Masire Teaching Hospital in July 2023.",
          detail:
            "The survey, published in JCO Global Oncology in 2024, was carried out from February to April 2021. At the opening of the new centre on 27 July 2023 the Minister of Health, Edwin Dikoloti, said it would reduce government spending on health care for cancer patients and shorten waiting times, as reported by the UN in Botswana. On medicines, a study of the government's Central Medical Store catalogue found that Botswana's 2015 national essential medicines list for cancer matched 80.5% of WHO's list, and that at least 40% of essential cancer drugs were out of stock for a median of 30 days in 2015, including drugs in first-line regimens for cervical, breast and colorectal cancer. OnCo did not find a source describing how referral of patients to other countries is arranged or paid for, and says nothing about it here.",
          links: [L_SWART, L_UN, { label: "Martei and colleagues: Availability of WHO Essential Medicines for Cancer Treatment in Botswana (Journal of Global Oncology, 2018)", url: DOI_MARTEI }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "bomra",
          title: "The Botswana Medicines Regulatory Authority, established in 2018",
          plain:
            "Medicines in Botswana, including cancer medicines, are regulated by the Botswana Medicines Regulatory Authority, known as BoMRA, a statutory body under the Ministry of Health. It is working with WHO towards the standard WHO calls maturity level 3.",
          detail:
            "BoMRA's own page says it is a corporate body established through the Medicines and Related Substances Act of 2013, strengthened and re-enacted in 2025, that it was established in 2018, and that its mandate is to ensure the safety, efficacy and quality of medical products and cosmetics for human and veterinary use. WHO's Africa office reported an assisted self-benchmarking exercise from 11 to 15 August 2025 against WHO's benchmarking tool: the function for licensing establishments was scored at maturity level 3 and the other functions at level 1, which the report attributes to the Medicines and Related Substances Bill then pending, and it noted a backlog in registration as workload grew without matching staff. That was a self-assessment, not a WHO listing. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include Botswana. The African Union's list of 19 September 2023 shows no signature or ratification by Botswana of the treaty establishing the African Medicines Agency.",
          links: [
            { label: "BoMRA: our mandate", url: BOMRA_MANDATE },
            { label: "WHO Africa: Botswana Medicines Regulatory Authority conducts five-day assisted self-benchmarking exercise (on the exercise of 11 to 15 August 2025)", url: WHO_AFRO_BOMRA },
            { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: L_WHO_CX,
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2015: 93% of the target group had a first dose in 2024",
          plain:
            "Botswana added the HPV vaccine to its national programme in 2015, for girls aged 9 to 13. WHO's figures for 2024 put first-dose coverage of the programme's target group at 93% and last-dose coverage at 34%.",
          detail:
            "WHO's 2021 cervical cancer profile records a national programme introduced in 2015 with a primary target of girls aged 9 to 13. WHO's immunisation database gives programme coverage among girls, first dose and last dose, of 76% and 65% in 2015, 94% and 76% in 2016, 89% and 70% in 2017, and 88% and 47% in 2019. Coverage fell in the following years: 54% for the first dose in 2020, and 15% for the first dose and 22% for the last in 2022. It then recovered to 76% and 36% in 2023 (37,208 first doses against a target of 49,160 girls) and 93% and 34% in 2024. The database does not say why the last-dose figure stays low; OnCo did not find the current dosing schedule and does not interpret it. The ministry's 2018 strategy set a target of 95% coverage of those eligible.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Botswana (immunisation data API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Botswana (immunisation data API)", url: WHO_INTRO_API },
            L_WHO_CX,
            L_NCD,
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening: a national programme, with see-and-treat clinics alongside Pap tests",
          plain:
            "Botswana has a national cervical screening programme. WHO's 2021 profile recorded that half of women aged 30 to 49 had ever been screened and 39% in the previous five years. Clinics that inspect the cervix and treat early changes at the same visit have spread from Gaborone to other sites.",
          detail:
            "WHO's 2021 cervical cancer profile records a national screening programme with the HPV test as its primary test, a target age range that depends on the method and on HIV status, national guidelines on managing cervical cancer and a defined referral system. Its figures for screening, 50% ever and 39% in the last five years, are for 2019. WHO's 2020 cancer profile, compiled from 2019 data, had recorded no cervical screening programme; the two WHO documents differ and OnCo reports both. The ministry's 2018 strategy says the first cervical strategy, in 2004, was based on cytology, and that see-and-treat services had expanded to 45 clinics offering visual inspection and cryotherapy and 25 offering colposcopy and loop excision; it set a target of 80% screening coverage by 2023. The see-and-treat model was described in 2012: of 2,175 women living with HIV screened by nurses in Gaborone from March 2009 to January 2011, 253 (11.6%) had cryotherapy the same day and 575 were referred on. The 2021 survey of public oncology centres called cervical screening the only national cancer screening programme and found mammography used solely for diagnosis.",
          links: [
            L_WHO_CX,
            L_WHO_2020,
            L_NCD,
            { label: "Ramogola-Masire and colleagues: Cervical cancer prevention in HIV-infected women using the \"see and treat\" approach in Botswana (JAIDS, 2012)", url: DOI_RAMOGOLA },
            L_SWART,
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Botswana",
      cards: [
        {
          id: "centres",
          title: "Four public oncology centres, with the fullest services at Princess Marina and Nyangabgwe",
          plain:
            "The government has designated four hospitals across the country as public oncology centres. A 2021 survey found that Princess Marina Hospital and Nyangabgwe Referral Hospital had a broad range of diagnosis, surgery and treatment, and that the two district-level centres offered much less.",
          detail:
            "The four are Princess Marina Hospital, Nyangabgwe Referral Hospital, Sekgoma Memorial Hospital and Letsholathebe II Memorial Hospital. The survey, published in JCO Global Oncology in 2024, found that Princess Marina was the only one with a dedicated inpatient oncology service, a multidisciplinary committee to review patients and a palliative care team, and that hysterectomy for cervical cancer was performed only there. The authors suggest the two district-level centres could provide selected services for common cancers, follow-up and palliative care. WHO's 2020 profile recorded pathology services and community or home-based palliative care as generally available in 2019. The survey predates the public radiotherapy centre and describes 2021.",
          links: [L_SWART, L_WHO_2020],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: a public centre opened in July 2023; the IAEA's directory lists three centres, all in Gaborone",
          plain:
            "The radiotherapy centre at Sir Ketumile Masire Teaching Hospital in Gaborone opened on 27 July 2023 with support from the International Atomic Energy Agency. The UN in Botswana described it as the country's first public radiotherapy centre.",
          detail:
            "The IAEA's Directory of Radiotherapy Centres lists three radiotherapy centres in Botswana, all in Gaborone: Sir Ketumile Masire Teaching Hospital (entry last updated in 2025), Lifehealthcare Gaborone, which is Gaborone Private Hospital (2022), and Village Oncology (2026). Each is listed with one high-energy photon and electron beam unit and one brachytherapy unit. The directory does not say whether each machine is in use. The UN's report says five IAEA technical cooperation projects supported the new centre, with long-term training for radiation oncologists, medical physicists, oncology nurses and radiotherapy technologists, help with shielded rooms and with specifying and commissioning equipment, and that the minister expected it to serve patients from other countries in the region as well. WHO's 2020 profile, from 2019 data, had recorded no medical physicists. WHO's 2021 cervical profile marks radiotherapy as not generally available, which predates the public centre.",
          links: [L_UN, L_DIRAC, L_WHO_2020, L_WHO_CX],
        },
        {
          id: "plan",
          title: "A strategy against non-communicable diseases to 2023; a first national cancer control plan was being finalised in late 2025",
          plain:
            "Botswana's published strategy that covers cancer is its multi-sectoral strategy against non-communicable diseases for 2018 to 2023. WHO Botswana reported that the Ministry of Health was finalising a five-year National Cancer Control Plan in the last quarter of 2025.",
          detail:
            "WHO's 2020 profile recorded an operational integrated plan for non-communicable diseases and cancer management guidelines in 2019, and a national cancer control plan as under development. The UN in Botswana reported in August 2023 that the IAEA, WHO and IARC were supporting the country's first National Cancer Control Programme, with a draft expected that October. WHO Botswana's newsletter for October to December 2025 says the ministry and WHO worked with stakeholders, including cancer survivors, to finalise the plan, which was scheduled for completion before the end of that year. A search of the ICCP portal for Botswana on 16 November 2026 returned five items: the 2018 strategy, WHO's 2014 and 2020 cancer profiles, its 2021 cervical profile and national guidelines dated 2020 for managing cervical, breast, colon and head and neck cancers; none is a cancer plan. OnCo found no published plan and does not know whether it has been adopted.",
          links: [
            L_NCD,
            L_WHO_2020,
            L_UN,
            { label: "WHO Botswana: quarterly newsletter, October to December 2025 (PDF)", url: WHO_BW_Q4_2025 },
            L_ICCP,
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Botswana", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Botswana; ClinicalTrials.gov lists nine cancer studies",
          plain:
            "None of the trials in OnCo's records lists Botswana among its countries. OnCo holds a selection of trials, not the whole registry: a search of ClinicalTrials.gov itself on 16 November 2026 returned nine cancer studies with a location in Botswana.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Botswana. The nine studies the registry returned are about how care is delivered more than about new medicines: several test ways of screening for cervical cancer, including HPV-based screening and self-collected samples, and others test ways to shorten the time from symptoms or diagnosis to treatment. Two were listed as recruiting and two as active but no longer recruiting. Published research from Botswana that OnCo has read includes the registry analyses, the cervical cancer cohort, the see-and-treat programme, and studies of medicine stock and of the public oncology centres.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Botswana", url: CTGOV },
            L_MATHOMA,
            L_SWART,
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-who-profile",
      title: "WHO's 2020 and 2021 profiles disagree on whether Botswana has a cervical screening programme",
      plain:
        "WHO's Cancer Country Profile 2020 records no cervical screening programme in Botswana for 2019. WHO's cervical cancer profile of 2021 records a national programme. OnCo reports both and could not settle the difference from an official Botswana source.",
      detail:
        "OnCo read the 2020 profile from WHO's own file, which is identical to the copy on the ICCP portal. It gives \"no\" for cervical cancer screening in 2019, while the 2021 cervical profile gives \"Yes\" for a national screening programme in 2021. Neither document explains the difference. The ministry's programme page would settle it; its home page, read the same day, carried nothing on cancer. Patients can ask their clinic which screening test is offered and at what age.",
      links: [L_WHO_2020, L_WHO_CX, { label: "Ministry of Health, Botswana", url: "https://www.moh.gov.bw/" }],
    },
    {
      id: "gap-plan-guidelines",
      title: "Not read: the national cancer control plan and the 2020 treatment guidelines",
      plain:
        "OnCo found reports that a national cancer control plan was being finalised but no published plan. The national guidelines for managing cervical, breast, colon and head and neck cancers are posted on the ICCP portal, but the text of the file could not be extracted, so nothing from them is quoted.",
      detail:
        "The guidelines PDF downloaded, but its fonts produce unreadable characters when converted to text; reading it needs a person or a different tool. The IAEA's news page on the plan returned a browser challenge (HTTP 403) and was not read, and a newspaper page that mentions the plan loads its text by script. A future pass should read the guidelines by eye and look for the adopted plan on the ICCP portal or the ministry's site.",
      links: [{ label: "ICCP portal: National Guidelines for the Management of Cervical, Breast, Colon, Head and Neck Cancers (PDF)", url: ICCP_GUIDELINES }, L_ICCP],
    },
    {
      id: "gap-costs-and-referral",
      title: "Not found: what patients pay, how treatment abroad is arranged, and a recent registry report",
      plain:
        "OnCo did not find an official source on fees for cancer care in public hospitals, on referral of patients to other countries, or a registry report more recent than 2008. The Cancer Association of Botswana's member profile at UICC refused a plain request and was not read.",
      detail:
        "The statement that radiotherapy at Gaborone Private Hospital was paid for by government comes from a 2021 survey and predates the public centre; whether that arrangement continues is not known here. The registry's network page is undated and names staff who may have moved on, so no one is named on this page. The IAEA's directory lists one treatment machine and one brachytherapy unit at each of three centres in Gaborone and does not say whether they are in use. A future pass should read the ministry's referral policy and the registry's latest report; meanwhile the treating hospital's social worker or the Cancer Association of Botswana are the places to ask about costs and accommodation.",
      links: [L_SWART, L_AFCRN, L_DIRAC],
    },
  ],
  institutions: [
    "botswana-ministry-of-health",
    "botswana-national-cancer-registry",
    "sir-ketumile-masire-teaching-hospital",
    "gaborone-private-hospital",
    "village-oncology-gaborone",
    "bomra-botswana",
    "cancer-association-of-botswana",
    "who",
    "iarc",
    "iaea",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-mathoma-cancer-incidence-hiv-botswana-cancers-2025",
    "paper-dryden-peterson-cancer-incidence-art-botswana-plosone-2015",
    "paper-grover-cervical-cancer-stage-outcomes-botswana-gore-2022",
    "paper-ramogola-masire-see-and-treat-botswana-jaids-2012",
    "paper-swart-public-oncology-centres-botswana-jcogo-2024",
    "paper-martei-essential-cancer-medicines-botswana-jgo-2018",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, the African Cancer Registry Network's page for the national registry, the ministry's 2018 strategy against non-communicable diseases, WHO's 2020 and 2021 country profiles and immunisation data, the regulator's own page and a WHO Africa report on it, WHO's list of regulators, the African Union's treaty list, the UN in Botswana's report on the radiotherapy centre, WHO Botswana's newsletter, the IAEA's public radiotherapy table, the World Bank's health expenditure series, ClinicalTrials.gov and the abstracts of six papers resolved through Europe PMC.",
  verify:
    "The registry's page is undated, WHO's profiles rest on 2019 to 2021 data, and services have changed since the public radiotherapy centre opened. Check with the Ministry of Health or the treating hospital before relying on anything here.",
  verifyLinks: [L_IARC, L_AFCRN, L_UN],
};
