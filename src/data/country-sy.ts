import type { CountryDive } from "@/data/country-dive";

/**
 * Syria deep dive: the hand-written cards for /countries/sy/ (wave 7). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for the Syrian Arab Republic
 * (PDF text, including its data source and method box), WHO's Cancer Country Profile 2020 for Syria (PDF text), WHO and
 * the Ministry of Health's HeRAMS annual report on public hospitals for 2020 (PDF text), WHO's flash appeal of
 * 24 December 2024 (EMRO news page), the IAEA's articles of 15 June 2023 and 5 June 2025 (read through the Internet
 * Archive, as iaea.org returned HTTP 403), the Ministry of Health's home page (the Internet Archive's copy of
 * 17 October 2026, as the live site timed out), WHO's Global Health Expenditure rows for Syria from the Global Health
 * Observatory API, WHO's immunization introduction and coverage tables from its public WIISE API, the ClinicalTrials.gov
 * API, and the papers through Europe PMC, reading the full text of the three that are open access (Basha et al. 2024,
 * Nahhat et al. 2023, Al-Abdulla et al. 2025).
 *
 * This is a conflict and post-conflict setting. Statements about who governs are dated and limited to what WHO and the
 * IAEA wrote: WHO's appeal of 24 December 2024 speaks of "the recent transfer of authority", and the IAEA's article of
 * 5 June 2025 names President Ahmed Al-Sharaa. Areas are named as the sources name them (for example "northwest Syria"
 * and "government-controlled"), with the date of the source. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/760-syrian-arab-republic-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/syr-2020.pdf";
const HERAMS_2020 = "https://applications.emro.who.int/docs/SYR/EMRLIBSYR286E-eng.pdf";
const HERAMS_PAGE = "https://www.emro.who.int/syr/herams/herams-reports.html";
const WHO_APPEAL = "https://www.emro.who.int/syria/news/who-urgent-flash-appeal-for-the-health-emergency-response-in-syria-us-56-4-million-for-critical-needs-on-multiple-fronts.html";
const IAEA_2023_WB = "https://web.archive.org/web/20230923160600/https://www.iaea.org/newscenter/news/from-earthquake-response-to-cancer-care-in-syria-paving-a-way-forward-to-strengthen-national-capacities";
const IAEA_2025_WB = "https://web.archive.org/web/20250606055359/https://www.iaea.org/newscenter/news/director-general-in-syria-to-strengthen-cooperation-in-safeguards-cancer-care-and-food-security";
const IAEA_2025 = "https://www.iaea.org/newscenter/news/director-general-in-syria-to-strengthen-cooperation-in-safeguards-cancer-care-and-food-security";
const MOH_WB = "https://web.archive.org/web/20261017103129/https://www.moh.gov.sy/";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SYR'";
const GHO_GGHE = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'SYR'";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/AD_VACCINE_INTRODUCTIONS?$filter=COUNTRY%20eq%20'SYR'";
const WHO_DTP_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SYR'%20and%20ANTIGEN%20eq%20'DTPCV3'";
const CTGOV = "https://clinicaltrials.gov/search?cond=cancer&locStr=Syria&country=Syria";
const BASHA = "https://doi.org/10.1186/s12885-024-13256-9";
const NAHHAT = "https://doi.org/10.1186/s12885-023-11740-2";
const HANAFI = "https://doi.org/10.1001/jamanetworkopen.2024.2091";
const ATASSI = "https://doi.org/10.1055/s-0042-1755331";
const APELIAN = "https://doi.org/10.1186/s12885-025-14784-8";
const SAHLOUL = "https://doi.org/10.1200/JGO.2016.006189";
const ABDULLA_REVIEW = "https://doi.org/10.1186/s12961-025-01352-6";
const ABDULLA_FT = "https://doi.org/10.1186/s12913-024-11077-x";
const MARZOUK = "https://doi.org/10.1016/j.socscimed.2024.117364";
const KOULI = "https://doi.org/10.1200/GO-26-00095";
const KUTLUK = "https://doi.org/10.1001/jamanetworkopen.2023.12903";
const ABDUL_KHALEK = "https://doi.org/10.1016/S1470-2045(20)30067-X";
const SPIEGEL_2020 = "https://doi.org/10.1016/S1470-2045(20)30160-1";

export const SY_DIVE: CountryDive = {
  iso2: "SY",
  iso3: "SYR",
  name: "Syria",
  flag: "🇸🇾",
  asOf: "2026-11-11",
  title: "Cancer in Syria",
  description:
    "Cancer in Syria from WHO, IAEA and peer-reviewed sources: IARC's estimate of 27,280 new cancers and 16,455 deaths in 2024, made without a working national registry, one public cancer hospital that takes patients from across the country, out-of-pocket payment at 72% of health spending in 2023, cancer medicines available in 19% of functional public hospitals in 2020, the IAEA's 2025 brachytherapy project, care for Syrians in northwest Syria and abroad, and why no trial in our records has a site in Syria.",
  lede:
    "Syria has had no working national cancer registry since 2011, so its national figures are IARC estimates borrowed from neighbouring countries: 27,280 new cancers and 16,455 deaths in 2024, with breast cancer a fifth of all cases. More than a decade of conflict left cancer care concentrated in Damascus and Latakia, paid for largely by patients, and out of reach in parts of the north; since the transfer of authority that WHO described on 24 December 2024, the IAEA has begun working with Syria on rebuilding radiotherapy and diagnosis.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Syrian Arab Republic is 27,280 new cancers and 16,455 deaths, an age-standardised incidence of 142.6 per 100,000 (146.7 in men, 142.9 in women) and mortality of 88.4, for a population of 24,672,764. It is a model, not a count. IARC's fact sheet names no country-specific incidence source and gives the method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. Syria's own hospital-based national registry, set up in 2002, stopped when the conflict began in 2011, according to a 2024 systematic review, and WHO's 2020 country profile describes registration as an activity, not a population-based registry, and marks both incidence and mortality estimates as highly uncertain. The denominators differ too: WHO's 2020 profile used a 2019 population of 17,070,132 and the IAEA wrote of 18 million in 2023, against IARC's 24.7 million. Earlier estimates were lower: WHO's profile gave 23,170 cases and 14,042 deaths for 2018, and the IAEA cited 21,000 cases and 13,000 deaths for 2020. The hospital series in the table above count patients who reached a particular hospital, so they show the mix of cancers diagnosed, not a rate.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Syria",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Syrian Arab Republic (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 27,000 new cancers a year, with breast, lung and bladder cancer leading",
          plain:
            "IARC estimates 27,280 new cancers in Syria in 2024: 14,837 in women and 12,443 in men. Breast cancer is more than a third of cancers in women; in men lung, bladder and prostate cancer lead. Hospital studies from Damascus find most cancers are diagnosed late.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 5,537 breast cancers (2,552 deaths), 2,548 lung cancers (2,414 deaths), 2,120 bladder cancers (1,329 deaths), 2,017 colorectal cancers and 1,336 non-Hodgkin lymphomas. Breast cancer is 37.3% of cancers in women and 20.3% of all cancers; bladder cancer is 13.1% of cancers in men, second only to lung cancer (14.1%). Cervical cancer is comparatively rare, at 346 cases. The risk of developing a cancer before age 75 is 15.1% for men and 14.7% for women, and an estimated 52,835 people are living within five years of a diagnosis. WHO's 2020 profile gives 808 cancers a year in children aged 0 to 14, while the IAEA wrote in 2023 that about 1,500 childhood cancers arise each year, 5 to 10% of the burden. In hospital studies, 19% of 2,367 women treated for breast cancer at Al-Bairouni University Hospital between 2019 and 2022 already had metastases and 8% were at stage 0 or I; 60 to 80% of each year's lung cancers at a large oncology centre in 2011 to 2018 had metastases at diagnosis.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Syrian Arab Republic (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
            { label: "Nahhat et al., breast cancer quality of care in Syria (BMC Cancer 2023)", url: NAHHAT },
            { label: "Hanafi et al., lung cancer during the Syrian war 2011 to 2018 (JAMA Netw Open 2024)", url: HANAFI },
          ],
        },
        {
          id: "where-care-is",
          title: "Where care is: one hospital near Damascus carries most of the country",
          plain:
            "Cancer care in Syria is concentrated in a few public university hospitals, above all Al-Bairouni University Hospital in Harasta on the edge of Damascus, which takes patients from all over the country. In 2020 cancer treatment services were available in 29% of functional public hospitals, according to WHO's monitoring with the Ministry of Health.",
          detail:
            "WHO's HeRAMS annual report for 2020, written with the Ministries of Health and Higher Education, covered all 113 public hospitals in the 14 governorates. At the end of December 2020, 54 (48%) were fully functioning, 32 (28%) partly and 27 (24%) not functioning, and cancer treatment services were available in 29% of the 86 functional hospitals. Cancer consultations, 259,842 in 2020 against 231,523 in 2019, were the highest of any non-communicable disease, mainly in Damascus and Rural Damascus, which the report says has one specialised cancer hospital. Researchers at Damascus University call Al-Bairouni the principal cancer centre in Syria; 58.3% of its breast cancer patients in 2019 to 2022 came from outside Damascus and its suburbs. A 2024 systematic review, citing a 2022 book chapter by Manachi and colleagues, reports that it registered about 9,000 new cancers in 2020 and sees over 60% of Syria's cancer patients. Tishreen University Hospital in Latakia also gives radiotherapy; in 2019 and 2020, 30% of its radiotherapy patients came from Aleppo. WHO said on 24 December 2024 that over half the country's hospitals were non-functional.",
          links: [
            { label: "WHO and Ministry of Health: HeRAMS annual report 2020, public hospitals (PDF)", url: HERAMS_2020 },
            { label: "Nahhat et al., breast cancer quality of care in Syria (BMC Cancer 2023)", url: NAHHAT },
            { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
            { label: "WHO: urgent flash appeal for the health emergency response in Syria (24 December 2024)", url: WHO_APPEAL },
          ],
        },
      ],
      tables: [
        {
          id: "sy-hospital-series",
          title: "What Syrian hospitals and laboratories have published",
          caption: "Patients newly diagnosed with cancer in published hospital and laboratory series, as reported in each source. No population-based registry has published figures since 2011.",
          columns: [
            { key: "source", label: "Source (setting)" },
            { key: "period", label: "Years" },
            { key: "counted", label: "What was counted" },
            { key: "cases", label: "Patients", numeric: true },
            { key: "women", label: "Women (%)", numeric: true },
            { key: "breast", label: "Breast (% of all)", numeric: true },
          ],
          rows: [
            { source: "Al-Bairouni University Hospital registry, as reported by Basha et al. 2024", period: "2020", counted: "New cancers, approximate", cases: 9000, women: 56, breast: 24.36 },
            { source: "Tishreen, Al-Bairouni and Ibn Rushd university hospitals (Apelian et al.)", period: "2017 to 2021", counted: "Patients diagnosed with any cancer", cases: 44248, women: null, breast: null },
            { source: "Pathology department serving northwest Syria (Atassi et al.)", period: "2020", counted: "New cancers diagnosed on pathology", cases: 397, women: 51.9, breast: 20.2 },
            { source: "A large oncology centre, lung cancer only (Hanafi et al.)", period: "2011 to 2018", counted: "New lung cancers", cases: 5160, women: 14.7, breast: null },
          ],
          note: "Each row counts patients who reached one hospital, three hospitals or one laboratory, not a defined population, so none gives a rate and the rows cannot be added. The Al-Bairouni row is the review's summary of a 2022 book chapter by Manachi and colleagues, which OnCo could not read directly; the women's share in the Atassi and Hanafi rows is 100 minus the men's share each abstract reports.",
          sources: [
            { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
            { label: "Apelian et al., ovarian cancer in Syria 2017 to 2021 (BMC Cancer 2025)", url: APELIAN },
            { label: "Atassi et al., cancer diagnoses in northwest Syria (Avicenna J Med 2022)", url: ATASSI },
            { label: "Hanafi et al., lung cancer during the Syrian war (JAMA Netw Open 2024)", url: HANAFI },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry that stopped in 2011",
      aside: { label: "Basha et al., cancer and Syria in conflict (BMC Cancer 2024)", url: BASHA },
      cards: [
        {
          id: "registry-history",
          title: "A hospital-based national registry from 2002, halted by the conflict",
          plain:
            "Syria set up a national cancer registry in 2002, based on hospital records and some pathology laboratories. It stopped when the conflict began in 2011. Building a registry again was one of the milestones the IAEA, IARC and WHO set after reviewing Syria's cancer services in 2022.",
          detail:
            "The 2024 systematic review by Basha and colleagues records that the Syrian National Cancer Registry was set up in 2002 as a hospital-based registry, collecting data mainly from hospital records and some pathology laboratories, with the aim of becoming population based; that support from IARC became more erratic from 2007; and that the uprising and descent into conflict in 2011 halted it completely. WHO's Cancer Country Profile 2020 lists the availability of a population-based registry in 2019 as registration activity and rates the quality of mortality registration for 2007 to 2016 as low. After the imPACT Review of late 2022, the IAEA wrote in June 2023 that the milestones for a national action plan included the development of a cancer registry and surveillance tools. Hospitals keep their own registries in the meantime, such as Al-Bairouni's. OnCo found no published national registry report from after 2011.",
          links: [
            { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
            { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
            { label: "IAEA: From earthquake response to cancer care in Syria (15 June 2023; read through the Internet Archive)", url: IAEA_2023_WB },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care: free hospitals, but patients pay for most of the rest",
      aside: { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Syria", url: GHO_OOP },
      cards: [
        {
          id: "out-of-pocket",
          title: "Out-of-pocket payment rose to 72% of health spending in 2023",
          plain:
            "Public hospitals in Syria offer free or low-cost care, but patients pay for much of what cancer treatment needs, especially medicines. WHO's figures show households paying 72% of all health spending in 2023, up from 42% in 2019, while the government's share fell to 15%.",
          detail:
            "WHO's Global Health Expenditure Database, through the Global Health Observatory API, gives out-of-pocket payments as 41.7% of current health spending in 2019, 48.3% in 2020, 59.5% in 2021, 59.9% in 2022 and 72.4% in 2023, and domestic government spending as 49.7% of the total in 2019 and 14.9% in 2023. Current health spending was 33.3 US dollars per person in 2023, 2.7% of GDP. A 2025 scoping review of the health system states that small, fragmented insurance schemes, such as those for public sector employees and some professional associations, covered less than 5% of the population by the end of 2020; that public hospitals provided free or low-cost care; and that higher-cost treatments such as cancer drugs required direct payment. In northwest Syria a 2024 study found that among 99 cancer patients, humanitarian aid made no significant difference to their financial distress, and all 22 women interviewed at the Idlib oncology centre in 2022 described financial strain.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket spending as a share of current health expenditure, Syria (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: government share of current health expenditure, Syria (API)", url: GHO_GGHE },
            { label: "Al-Abdulla et al., the health system in Syria 2000 to 2024 (Health Res Policy Syst 2025)", url: ABDULLA_REVIEW },
            { label: "Al-Abdulla et al., humanitarian aid and financial toxicity in northwest Syria (BMC Health Serv Res 2024)", url: ABDULLA_FT },
            { label: "Marzouk et al., accessing breast cancer care in northwest Syria (Soc Sci Med 2024)", url: MARZOUK },
          ],
        },
        {
          id: "medicines",
          title: "Cancer medicines were the scarcest item in public hospitals in 2020",
          plain:
            "WHO's 2020 survey of Syria's public hospitals, measured against a priority list drawn from the national essential medicines list, found cancer medicines available in only 19% of functional hospitals, the lowest of any group of medicines it tracked.",
          detail:
            "The HeRAMS annual report for 2020 evaluated the availability of priority medicines, derived from the national Essential Medicine List, over one month in functional public hospitals. Cancer-related medicines were available at 19% and were the largest gap (81%), below hepatitis vaccine (20%) and tetanus shots (24%); the report says WHO addressed gaps using a priority medicines list agreed with the Ministry of Health. Studies of cancer care during the conflict report the same: physicians surveyed in 2015 described limited or no targeted drugs in both government-controlled and besieged areas, and a 2024 systematic review found chemotherapy shortages a recurring theme. A survey of 1,013 hospital staff in Damascus Governorate in February 2025 found 38.9% reporting limited access to essential medicines. OnCo did not read the national essential medicines list itself; see the gaps.",
          links: [
            { label: "WHO and Ministry of Health: HeRAMS annual report 2020, public hospitals, section 8 (PDF)", url: HERAMS_2020 },
            { label: "Sahloul et al., cancer care at times of crisis and war (J Glob Oncol 2017)", url: SAHLOUL },
            { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
            { label: "Kaddah et al., health system readiness in Damascus Governorate (BMC Health Serv Res 2026)", url: "https://doi.org/10.1186/s12913-026-14015-1" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Medicines regulation: inside the Ministry of Health",
      aside: { label: "Ministry of Health home page (archived 17 October 2026)", url: MOH_WB },
      cards: [
        {
          id: "moh-regulation",
          title: "The Ministry registers, prices and tests medicines; no WHO maturity rating is published",
          plain:
            "Medicines in Syria are regulated by the Ministry of Health, not a separate agency: it approves new medicines, checks their quality, sets prices and runs a drug control laboratory. Before the conflict Syrian factories made most of the country's medicines.",
          detail:
            "A 2025 scoping review of the health system describes the Ministry of Health as the body that approved new pharmaceuticals, monitored quality and set price controls, with inconsistent enforcement, weak oversight of private distributors and pharmacies, and informal markets that bypassed price rules. The same review states that before the conflict Syria's pharmaceutical industry covered 90% of domestic needs from more than 70 factories, mainly in Aleppo, Damascus and Homs, making generic medicines for chronic and infectious diseases. The Ministry's website, in the Internet Archive's copy of 17 October 2026, carried tender notices for repairs at its Directorate of Drug Control and Research Laboratories in Al-Adawi and linked a form for reporting side effects of medicines hosted on the WHO Uppsala Monitoring Centre's VigiFlow system. OnCo found no published WHO Global Benchmarking maturity level for Syria, no published registration timelines and no list of registered cancer medicines; these are named under gaps.",
          links: [
            { label: "Al-Abdulla et al., the health system in Syria 2000 to 2024 (Health Res Policy Syst 2025)", url: ABDULLA_REVIEW },
            { label: "Ministry of Health home page (archived 17 October 2026)", url: MOH_WB },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
      cards: [
        {
          id: "screening-programmes",
          title: "Breast and cervical screening programmes exist on paper; few cancers are found by them",
          plain:
            "WHO's 2020 profile records a breast screening programme starting at age 35 and an organised cervical programme using Pap smears, with participation unknown. In practice fewer than 5% of breast cancers treated at Syria's main cancer hospital in 2019 to 2022 were found by screening mammography.",
          detail:
            "WHO's Cancer Country Profile 2020 lists, for 2019, a breast cancer screening programme with a starting age of 35, an organised cervical screening programme using the Pap smear with participation rates marked as not known, early detection guidelines for two cancers, and a defined referral system for cervical cancer. A 2024 systematic review, citing a 2022 book chapter by Manachi and colleagues, reports that the first national breast screening programme ran in October 2019 using mammograms and guided biopsy for women aged 35 to 70, and that a national cervical screening programme started in 2021; it also cites an estimate that about 5% of the target population had cervical screening in 2014 to 2019. At Al-Bairouni, fewer than 5% of 2,367 breast cancers in 2019 to 2022 were detected by screening and 64.8% were diagnosed by surgery rather than a biopsy. In northwest Syria a 2022 survey cited in the review found 65% of women did not know where to go for a mammogram.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
            { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
            { label: "Nahhat et al., breast cancer quality of care in Syria (BMC Cancer 2023)", url: NAHHAT },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine has not been introduced; hepatitis B vaccine is in the schedule",
          plain:
            "WHO's records list no HPV vaccine introduction in Syria up to 2025, and its 2020 profile gave HPV coverage as not applicable. Hepatitis B vaccine, which prevents a cause of liver cancer, is in the national schedule. Routine childhood immunisation coverage fell in 2025.",
          detail:
            "WHO's table of vaccine introductions, read through its public WIISE API, lists for Syria hepatitis B, hepatitis B birth dose, Hib, pneumococcal conjugate, rotavirus, polio, measles, mumps, rubella, influenza and COVID-19 vaccines, but no HPV vaccine in any year; its HPV coverage table has no rows for Syria, and the 2020 country profile records HPV vaccination programme coverage as not applicable for 2018. WHO and UNICEF's estimate of third-dose diphtheria, tetanus and pertussis coverage, a common measure of how well routine immunisation reaches children, was 73% in 2024 and 60% in 2025. Cervical cancer is comparatively uncommon in Syria in IARC's estimate (346 cases in 2024), but the protection that HPV vaccination gives girls against it is not yet offered in Syria.",
          links: [
            { label: "WHO: vaccine introductions, Syria (WIISE API)", url: WHO_INTRO_API },
            { label: "WHO and UNICEF: DTP3 coverage estimates, Syria (WIISE API)", url: WHO_DTP_API },
            { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy, imaging and the people who run them",
      aside: { label: "IAEA: Director General in Syria (5 June 2025; Internet Archive)", url: IAEA_2025_WB },
      cards: [
        {
          id: "capacity",
          title: "Few machines and specialists, and no radiotherapy in the northwest during the conflict",
          plain:
            "WHO's 2020 profile counted 3 radiotherapy machines and 12.9 medical physicists and 0.9 PET scanners for every 10,000 cancer patients. During the conflict radiotherapy was given in Damascus and Latakia but not in Aleppo governorate or northwest Syria, where patients were referred to Türkiye.",
          detail:
            "WHO's Cancer Country Profile 2020 gives, per 10,000 cancer patients, 3.0 external beam radiotherapy machines (2019), 25.9 CT scanners, 19.4 MRI scanners and 0.9 PET or PET-CT scanners (2020), 12.9 medical physicists and 4.3 nuclear medicine physicians (2019), with radiation oncologists, radiologists and surgeons not reported; bone marrow transplantation and community palliative care were generally not available. A 2024 systematic review found staff shortages across the literature: a 2015 survey of 35 oncologists found over 20 in Damascus and 6 in Aleppo, and a 2023 advocacy brief by the Syrian American Medical Society and Relief International reported that radiotherapy was not available in northwest Syria, that referral to Türkiye took one to six months, and that referrals for radiotherapy there stopped after the February 2023 earthquake. In the IAEA's article of June 2023, Arwa Azmeh, head of the Syrian National Cancer Control Committee, described heavy workloads, an inadequate workforce and shortages of equipment and technologies in diagnostic imaging, radiotherapy and nuclear medicine, and the IAEA wrote that two well-equipped paediatric oncology centres treat more than half of children with cancer.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
            { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
            { label: "IAEA: From earthquake response to cancer care in Syria (15 June 2023; read through the Internet Archive)", url: IAEA_2023_WB },
          ],
        },
        {
          id: "iaea-2025",
          title: "Since 2025: an IAEA programme to rebuild radiotherapy, and Syria's first full brachytherapy suite",
          plain:
            "In June 2025 the IAEA signed an agreement with Syria on cancer control and announced equipment and training for hospitals, including Syria's first fully equipped brachytherapy suite at what the IAEA calls Al-Biruni Hospital in Damascus, which OnCo takes to be Al-Bairouni University Hospital, funded by Italy, for the more than 1,400 women diagnosed with gynaecological cancer each year.",
          detail:
            "The IAEA's article of 5 June 2025 reports that its Director General met President Ahmed Al-Sharaa in Damascus on 4 June 2025 and signed a memorandum of understanding with Foreign Minister Asaad Al-Shaibani on food security and cancer control under the Rays of Hope initiative. It says that more than 1,400 women in Syria are diagnosed with gynaecological cancer each year; that the IAEA, with financial support from the government of Italy, was working with local teams to build Syria's first fully equipped brachytherapy suite at Al-Biruni Hospital in Damascus (OnCo takes this to be Al-Bairouni University Hospital in Harasta; the article does not say so), training radiation oncologists, medical physicists and radiotherapy technologists while the machine was on its way; that it would provide CT scanners and other equipment not available in the country; and that an expert mission earlier in 2025 had evaluated national radiotherapy services and the dosimetry laboratory of the Atomic Energy Commission of Syria. OnCo could not confirm from a primary source whether the brachytherapy suite was treating patients in November 2026; see the gaps.",
          links: [
            { label: "IAEA: Director General in Syria to strengthen cooperation in safeguards, cancer care and food security (5 June 2025; read through the Internet Archive)", url: IAEA_2025_WB },
            { label: "IAEA: the same article on iaea.org (refused a plain request on 11 November 2026)", url: IAEA_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Syria does",
      title: "What Syria does differently",
      cards: [
        {
          id: "across-lines",
          title: "Cancer care delivered across lines of control, by humanitarian organisations",
          plain:
            "During the conflict, parts of Syria outside government control had their own cancer services, run by humanitarian groups. In northwest Syria the Syrian American Medical Society opened an oncology centre in Idlib in 2018 and, by 2020, two more in Al Bab and Jarablus; a 2024 review counts chemotherapy at three sites and no radiotherapy there.",
          detail:
            "A 2024 systematic review, drawing on a Syrian American Medical Society and Relief International brief covering October 2021 to March 2023, reports an estimated 2,000 to 3,000 new cancer diagnoses a year in northwest Syria, care there supported mainly by NGOs and poorly funded because donors treated cancer as tertiary care, chemotherapy and hormone therapy at three centres, free pathology testing at one hospital, and in 2022 seven CT scanners, one MRI machine and four mammography units for the area; citing a 2022 book chapter, it also describes the Idlib Oncology Centre as the only cancer centre in northwest Syria and notes there were no cancer centres in northeast Syria. Atassi and colleagues, writing from the programme, record SAMS opening its Idlib centre in 2018 and further oncology centres in Al Bab and Jarablus in 2020. A pathology department serving the northwest reported 397 new cancers in 2020, breast cancer (20.2%) the commonest and bladder cancer the commonest in men. Women treated at the Idlib centre in 2022 described financial strain and long journeys, including to Türkiye, and the study's authors concluded that stock-outs and the lack of radiotherapy may still force women to travel there. These descriptions date from before the transfer of authority WHO described on 24 December 2024; OnCo found no published account of how services in the northwest and northeast have been joined with the national system since.",
          links: [
            { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
            { label: "Atassi et al., cancer diagnoses in northwest Syria (Avicenna J Med 2022)", url: ATASSI },
            { label: "Marzouk et al., accessing breast cancer care in northwest Syria (Soc Sci Med 2024)", url: MARZOUK },
          ],
        },
        {
          id: "refugees",
          title: "Cancer care for Syrians abroad: a cost shared by neighbouring countries and the UN refugee agency",
          plain:
            "Millions of Syrians became refugees, and many with cancer were treated in Türkiye, Lebanon and Jordan. In southern Türkiye, Syrian refugees with cancer had universal health coverage, but their five-year survival was 17.5% for adults and 29.7% for children treated between 2011 and 2020.",
          detail:
            "Kutluk and colleagues studied 1,114 adults and 421 children from Syria diagnosed or treated for cancer between 2011 and 2020 at eight university hospitals in Türkiye's southern border provinces, which host more than half of the 3.6 million Syrian refugees in Türkiye; the median time from first symptom to diagnosis was 66 days for adults, and five-year survival was 17.5% in adults and 29.7% in children. A modelling study put the direct cost of cancer care for the 4.74 million Syrian refugees in Jordan, Lebanon and Türkiye in 2017 at between €33.68 million and €140.23 million, depending on the method. In Lebanon and Jordan, the UN refugee agency UNHCR decides case by case through exceptional care committees whether to pay for expensive treatment; a 2020 policy review of 733 refugees referred to it with cancer called for more funding and common procedures, prioritising breast and childhood cancers. Before 2011 Syria itself hosted refugees, and UNHCR's exceptional care committees reviewed applications to fund cancer treatment for refugees there in 2009 to 2011.",
          links: [
            { label: "Kutluk et al., cancer among Syrian refugees in southern Turkey (JAMA Netw Open 2023)", url: KUTLUK },
            { label: "Abdul-Khalek et al., the economic burden of cancer care for Syrian refugees (Lancet Oncol 2020)", url: ABDUL_KHALEK },
            { label: "Spiegel et al., cancer in Syrian refugees in Jordan and Lebanon 2015 to 2017 (Lancet Oncol 2020)", url: SPIEGEL_2020 },
            { label: "Spiegel et al., cancer in refugees in Jordan and Syria 2009 to 2012 (Lancet Oncol 2014)", url: "https://doi.org/10.1016/S1470-2045(14)70067-1" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Trials and research",
      aside: { label: "ClinicalTrials.gov: cancer studies listing a site in Syria", url: CTGOV },
      cards: [
        {
          id: "trials-research",
          title: "No trial in our records has a site in Syria, and most patients have never heard of one",
          plain:
            "None of the trials in OnCo's records lists a site in Syria. Studies registered from Syria are mostly local observational studies by Syrian universities, and a 2025 survey at Al-Bairouni found that 98.8% of cancer patients had never heard of clinical trials.",
          detail:
            "OnCo's ClinicalTrials.gov participation data lists no trial with a site in Syria. A search of the ClinicalTrials.gov API on 11 November 2026 for cancer studies with a location in Syria returned 20 records, about half of them not about cancer. The cancer studies are mostly small single-centre studies by Syrian universities, observational and a few interventional (such as a University of Aleppo trial of injected 5-fluorouracil for basal cell carcinoma, and a Latakia University study of temporary ileostomy in rectal cancer), including two 2025 surveys of breast and prostate cancer early detection by Al-Hawash Private University; the one industry study is Bayer's multinational observational registry of liver cancer treatment, GIDEON, which began in 2009. None is a trial in OnCo's records. Physicians surveyed in 2015 reported limited or no access to clinical trials. In March to August 2025, 322 cancer patients at Al-Bairouni were surveyed: 98.8% had never heard of clinical trials, 37.0% were willing to take part, and 61.5% would if transport and safety were guaranteed. Published research is largely retrospective hospital series from Damascus University, Tishreen University and humanitarian programmes, many cited on this page.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a location in Syria", url: CTGOV },
            { label: "Kouli et al., willingness to join clinical trials in post-conflict Syria (JCO Glob Oncol 2026)", url: KOULI },
            { label: "Sahloul et al., cancer care at times of crisis and war (J Glob Oncol 2017)", url: SAHLOUL },
          ],
        },
        {
          id: "plan",
          title: "A national cancer strategy agreed in principle in 2022, not yet published",
          plain:
            "After the IAEA, IARC and WHO reviewed Syria's cancer services in late 2022, the National Cancer Control Committee agreed to finalise a national strategy and action plan. OnCo found no published national cancer control plan for Syria.",
          detail:
            "WHO's 2020 country profile records a national cancer control plan as under development in 2019. The IAEA's article of 15 June 2023 describes the imPACT Review, requested by the Ministry of Health and carried out virtually and in country in 2022 with meetings at 13 facilities in Damascus and Latakia, including six civil society organisations. It names milestones for a national action plan: a cancer registry and surveillance tools, a national radiotherapy programme and accredited training in diagnostic imaging and nuclear medicine. The reviewers called reducing tobacco and alcohol use and better nutrition for children vital for prevention, and suggested early detection schemes, particularly for breast and prostate cancer. The Syrian National Cancer Control Committee, headed by Arwa Azmeh, agreed to finalise the National Strategy for Cancer Control and an action plan, and two IAEA technical cooperation projects were to be proposed for 2024 to 2025. The IAEA's agreement of June 2025 came after the transfer of authority WHO referred to on 24 December 2024; the IAEA's article of 5 June 2025 quotes its Director General speaking of \"a new government committed to engaging with the international community\".",
          links: [
            { label: "IAEA: From earthquake response to cancer care in Syria (15 June 2023; read through the Internet Archive)", url: IAEA_2023_WB },
            { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-registry-data",
      title: "No national cancer counts since 2011",
      plain:
        "There are no published national cancer counts for Syria since the registry stopped in 2011. Every national figure on this page is an estimate, and the hospital figures count only patients who reached those hospitals. OnCo could not find the registry's pre-2011 reports.",
      detail:
        "The registry's history is taken from the 2024 systematic review, not from the registry's own reports, which OnCo could not find online. IARC's detailed data sources and methods page for Syria was not read; the method is taken from the fact sheet. The book chapter by Manachi and colleagues that reports the hospital's 2020 figures, \"General Oncology Care in Syria\" in Cancer in the Arab World (Springer, 2022, DOI 10.1007/978-981-16-7945-2_17), sits behind a browser challenge on the publisher's site, which OnCo does not bypass, so its figures are quoted only as the 2024 review reports them.",
      links: [
        { label: "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)", url: BASHA },
        { label: "Manachi et al., General Oncology Care in Syria (Springer 2022; not read)", url: "https://doi.org/10.1007/978-981-16-7945-2_17" },
      ],
    },
    {
      id: "after-2024",
      title: "Little published data on cancer services since December 2024",
      plain:
        "Most sources on this page describe Syria before the transfer of authority that WHO referred to on 24 December 2024. OnCo found no national survey of cancer services, hospitals or medicine supply since then, and no confirmation that the IAEA's brachytherapy suite is treating patients.",
      detail:
        "The latest national HeRAMS report on public hospitals listed on WHO's regional HeRAMS page for Syria covers 2020; OnCo found no later national report there. The current number of working radiotherapy machines, the state of services in the former northwest and northeast, any change to who pays for cancer medicines, and whether the 2022 national cancer strategy has been finalised could not be confirmed. A reported 2025 agreement between the IAEA and the Qatar Fund for Development for radiation medicine in Syria was found only in secondary news reports and is not used.",
      links: [
        { label: "WHO EMRO: HeRAMS reports for Syria", url: HERAMS_PAGE },
        { label: "IAEA: Director General in Syria (5 June 2025; read through the Internet Archive)", url: IAEA_2025_WB },
      ],
    },
    {
      id: "regulation-unknowns",
      title: "No published registration rules, maturity level or medicines list",
      plain:
        "OnCo found no published WHO maturity level for Syria's medicines regulation, no registration timelines, no list of cancer medicines registered in Syria, and could not read the national essential medicines list. The Ministry of Health's website timed out and was read from an archived copy.",
      detail:
        "The Ministry of Health's site did not respond to a plain request on 11 November 2026 and was read from the Internet Archive's copy of 17 October 2026, which gives no regulatory guidance in the parts captured. The national Essential Medicine List is referred to in WHO's HeRAMS report but was not found. Commercial regulatory summaries and news reports about plans for a separate medicines authority were found while searching and are not used, as they are not primary or peer-reviewed sources. Ask the treating hospital's pharmacy whether a medicine is registered and stocked.",
      links: [
        { label: "Ministry of Health home page (archived 17 October 2026)", url: MOH_WB },
        { label: "WHO and Ministry of Health: HeRAMS annual report 2020, public hospitals (PDF)", url: HERAMS_2020 },
      ],
    },
  ],
  institutions: [
    "syria-ministry-of-health", "al-bairouni-university-hospital", "tishreen-university-hospital", "idlib-oncology-centre-sams",
    "who", "iaea", "iarc", "hacettepe-cancer-institute",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-basha-cancer-syria-conflict-review-bmc-cancer-2024", "paper-sahloul-cancer-care-crisis-war-syria-jgo-2017",
    "paper-hanafi-lung-cancer-syrian-war-jama-netw-open-2024", "paper-nahhat-breast-cancer-quality-syria-bmc-cancer-2023",
    "paper-atassi-cancer-diagnoses-northwest-syria-ajm-2022", "paper-apelian-ovarian-cancer-syria-bmc-cancer-2025",
    "paper-al-abdulla-syria-health-system-scoping-review-hrps-2025", "paper-al-abdulla-financial-toxicity-northwest-syria-bmc-hsr-2024",
    "paper-marzouk-breast-cancer-access-northwest-syria-ssm-2024", "paper-kouli-clinical-trial-willingness-syria-jco-go-2026",
    "paper-kutluk-syrian-refugees-cancer-turkey-jama-netw-open-2023", "paper-abdul-khalek-cancer-costs-syrian-refugees-lancet-oncol-2020",
    "paper-spiegel-cancer-syrian-refugees-jordan-lebanon-lancet-oncol-2020",
  ],
  people: [],
  how:
    "Every card was written from WHO, IAEA and IARC documents and peer-reviewed papers, read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; WHO's Cancer Country Profile 2020; the HeRAMS annual report on public hospitals for 2020, written by WHO with the Ministries of Health and Higher Education; WHO's flash appeal of 24 December 2024; the IAEA's articles of June 2023 and June 2025, through the Internet Archive; the Ministry of Health's home page, through the Internet Archive; WHO's health expenditure and immunization data from its public APIs; the ClinicalTrials.gov API; and the papers through Europe PMC. Statements about governance are dated to their source. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, three hospitals and thirteen papers) carry their own sources.",
  verify:
    "National figures for Syria are estimates with wide uncertainty, built without a national registry and on contested population figures. Services, medicine supply and who pays have changed since the transfer of authority WHO described in December 2024 and are changing faster than anything published; ask the treating hospital's oncology department which treatments are available and what they cost. Syrians abroad should ask the host country's health service or UNHCR office what cover applies to them.",
  verifyLinks: [
    { label: "Ministry of Health, Syrian Arab Republic", url: "https://www.moh.gov.sy/" },
    { label: "WHO EMRO: Syria", url: "https://www.emro.who.int/countries/syr/index.html" },
    { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Syrian Arab Republic (PDF)", url: IARC_FACTSHEET },
  ],
};
