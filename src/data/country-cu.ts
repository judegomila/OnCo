import type { CountryDive } from "@/data/country-dive";

/**
 * Cuba deep dive: the hand-written cards for /countries/cu/ (wave 7). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it. Cuban government sites (sld.cu, cecmed.cu, biocubafarma.cu,
 * guerrillero.cu) timed out to a plain request from outside Cuba, so they were read from Internet Archive copies and
 * the link labels say so: the Ministry of Public Health's Anuario Estadístico de Salud 2024 (edition 2025) and 2023
 * (edition 2024) as PDF text, including the National Cancer Registry's incidence tables, the cancer mortality tables,
 * the cervical screening series and the workforce tables; CECMED's about, registration, clinical evaluation and
 * reliance pages; the Cuban Public Registry of Clinical Trials' home page; BioCubaFarma's "about us" page; INOR's
 * "who we are" page; and the Guerrillero newspaper's report of the July 2023 National Assembly session on medicines.
 * Read directly: IARC's GLOBOCAN 2024 fact sheet for Cuba, PAHO's 2020 release on regional reference authorities,
 * PAHO's October 2025 HPV vaccination news, PAHO's 2025 annual report for Cuba and its 2026 leaflet on the CECMED
 * project, WHO's health expenditure, UHC and HPV coverage rows from its public APIs, WHO's list of primary trial
 * registries, the Constitute Project's English text of the 2019 Constitution, ClinicalTrials.gov's record for
 * NCT02955290, and the papers' abstracts through Europe PMC. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/192-cuba-fact-sheet.pdf";
const AES_2024 = "https://web.archive.org/web/2026/https://files.sld.cu/dne/files/2025/09/AES-2024-para-sitio-3.pdf";
const AES_2023 = "https://web.archive.org/web/2026/https://files.sld.cu/dne/files/2024/09/Anuario-Estad%c3%adstico-de-Salud-2023-EDICION-2024.pdf";
const MINSAP_STATS = "https://web.archive.org/web/2026/https://temas.sld.cu/estadisticassalud/";
const MORT_2122 = "https://web.archive.org/web/2026/https://temas.sld.cu/estadisticassalud/2024/03/13/mortalidad-por-cancer-en-cuba/";
const GARROTE = "https://pubmed.ncbi.nlm.nih.gov/21675409/";
const INOR_ABOUT = "https://web.archive.org/web/2026/https://instituciones.sld.cu/inor/quienes-somos-2/";
const CONSTITUTION = "https://www.constituteproject.org/constitution/Cuba_2019";
const WHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'CUB'";
const WHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20'CUB'";
const WHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'CUB'";
const GUERRILLERO_2023 = "https://web.archive.org/web/2025/https://guerrillero.cu/sigue-siendo-compleja-la-disponibilidad-de-medicamentos";
const PAHO_AR_2025 = "https://iris.paho.org/items/5a3d0317-62b6-46b5-8765-7ac7ee9c1afb";
const CECMED_ABOUT = "https://web.archive.org/web/2026/https://www.cecmed.cu/acerca-de";
const CECMED_RELIANCE = "https://web.archive.org/web/2026/https://www.cecmed.cu/noticias/aprueba-cecmed-resolucion-que-pone-vigor-practica-confianza-reguladora";
const CECMED_CT = "https://web.archive.org/web/2026/https://www.cecmed.cu/evaluacion-clinica";
const PAHO_NRAR = "https://www.paho.org/en/news/30-9-2020-regulatory-capacities-have-improved-over-past-decade-americas-continuing-efforts-are";
const PAHO_BIOTEC = "https://www.paho.org/sites/default/files/2026/10/plegable-biotec-opscorreccion-17-08v-digital.pdf";
const RPCEC = "https://web.archive.org/web/2026/https://rpcec.sld.cu/en/home";
const WHO_PRIMARY = "https://www.who.int/tools/clinical-trials-registry-platform/network/primary-registries";
const PAHO_HPV = "https://www.paho.org/es/noticias/29-10-2025-inicia-cuba-vacunacion-contra-virus-papiloma-humano";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'CUB'%20and%20ANTIGEN%20eq%20'HPV'";
const WHO_HPV_API ="https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'CUB'%20and%20startswith(ANTIGEN,'PRHPV')";
const BCF_ABOUT = "https://web.archive.org/web/2025/https://www.biocubafarma.cu/es/nosotros";
const CTGOV = "https://clinicaltrials.gov/search?country=Cuba&cond=cancer";
const CIMAVAX_US = "https://clinicaltrials.gov/study/NCT02955290";

export const CU_DIVE: CountryDive = {
  iso2: "CU",
  iso3: "CUB",
  name: "Cuba",
  flag: "🇨🇺",
  asOf: "2026-11-11",
  title: "Cancer in Cuba",
  description:
    "Cancer in Cuba from Cuban sources: 25,861 cancer deaths in 2024 by the Ministry of Public Health's count, the National Cancer Registry's 37,379 new cancers in 2022, care free of charge under the Constitution, a medicines shortage the Ministry put at 44% of the basic list in 2023, CECMED and its regional reference status, a cervical screening programme that fell from 826,663 women in 2019 to 218,286 in 2024, HPV vaccination from October 2025, home-grown cancer vaccines and antibodies, and why no trial in our records has a site in Cuba.",
  lede:
    "Cancer is the second cause of death in Cuba after heart disease: the Ministry of Public Health counted 25,861 cancer deaths in 2024, lung cancer the most. Care is free under the Constitution and Cuba has its own national cancer registry and a biotechnology industry that developed cancer vaccines and antibodies, but official figures show missing medicines and a cervical screening programme that has shrunk sharply since 2020.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Cuba is 49,702 new cancers and 28,127 deaths, an age-standardised incidence of 215.4 per 100,000 (235.0 in men, 201.1 in women), including 2,485 non-melanoma skin cancers. IARC's fact sheet lists no country-specific incidence data for Cuba: it estimates incidence by applying modelled mortality-to-incidence ratios to national mortality, and projects mortality from WHO's national death data. So the National Cancer Registry's own counts are not the basis of the estimate. The registry's preliminary count for 2022 is 37,379 new cancers, with world-standardised rates of 190.4 per 100,000 men and 168.2 per 100,000 women, and it includes 5,833 skin cancers of all types, far more than IARC's 2,485. Part of the gap is population: IARC uses 10,979,788 people, while Cuba's statistics office puts the 2024 average at 9,901,988 after a fall from 11.19 million in 2020. Deaths agree once population is allowed for: IARC's 28,127 is about 256 per 100,000 of its population, close to the Ministry's crude rate of 261.2 for its 25,861 deaths in 2024. The Ministry's own age-adjusted mortality rates use Cuba's 1981 census as the standard, so they cannot be set beside IARC's world-standardised rates.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Cuba",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Cuba (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 26,000 cancer deaths a year, lung and prostate cancer the most",
          plain:
            "Cuba's Ministry of Public Health counted 25,861 deaths from cancer in 2024, second only to heart disease as a cause of death. Lung cancer caused the most deaths, then prostate, bowel and breast cancer. In men prostate cancer is the commonest cause of cancer death; in women it is lung cancer, then breast cancer.",
          detail:
            "The Anuario Estadístico de Salud 2024 counts 25,861 deaths from malignant tumours in 2024 (261.2 per 100,000 people), up from 25,350 in 2023, against 35,718 from heart disease; tumours of all kinds made up 21.0% of deaths. By site in 2024: lung 5,059, prostate 3,861, intestine except rectum 2,731, female breast 1,795, urinary tract 1,004, lip, mouth and pharynx 1,013, larynx 945 and cervix 478. Men died of cancer at 1.4 times the rate of women (302.7 against 220.6 per 100,000), with laryngeal cancer 7.5 times and oesophageal cancer 5.1 times commoner as a cause of death in men. The yearbook counts 10,684 cancer deaths at ages 30 to 69 in 2024. IARC's GLOBOCAN 2024 fact sheet estimates 7,084 lung cancers (6,003 deaths), 6,930 prostate cancers, 5,744 colorectal and 5,605 breast cancers, a 21.1% risk of developing cancer before age 75, and 120,872 people living within five years of a diagnosis.",
          links: [
            { label: "Anuario Estadístico de Salud 2024, tables 15, 40, 41 and 42 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Cuba (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "ageing",
          title: "A shrinking, ageing population changes the rates",
          plain:
            "Cuba's population has fallen fast: the statistics office's average for 2024 is 9.9 million, against 11.2 million in 2020. Because cancer is mostly a disease of older age, a smaller and older population pushes crude cancer rates up even when the number of deaths changes little, and international estimates using older population figures count more cases.",
          detail:
            "Table 1 of the 2024 yearbook gives an average population of 11,187,533 in 2020, 11,033,468 in 2021, 10,657,037 in 2022, 10,242,351 in 2023 and 9,901,988 in 2024, from the Oficina Nacional de Estadísticas e Información. Over the same years the crude cancer death rate rose from 247.5 per 100,000 in 2023 to 261.2 in 2024, while deaths rose by 511. IARC's GLOBOCAN 2024 uses a population of 10,979,788, about 1.08 million more than the Cuban figure, which raises its estimated counts. A 2009 review in MEDICC Review already described cancer in Cuba as linked to a rapidly ageing population, with 55% of new cancers in people aged 65 or over and cancer already the commonest cause of death in 8 of the country's 14 provinces.",
          links: [
            { label: "Anuario Estadístico de Salud 2024, table 1 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
            { label: "Romero, changing the paradigm of cancer control in Cuba (MEDICC Rev 2009)", url: "https://doi.org/10.37757/mr2009v11.n3.2" },
          ],
        },
      ],
      tables: [
        {
          id: "cu-registry",
          title: "What the National Cancer Registry has published",
          caption: "New cancers and incidence per 100,000 (age-standardised to the world population), as printed in the Ministry's yearbooks. Latest year: 2022, marked preliminary.",
          columns: [
            { key: "year", label: "Year" },
            { key: "men", label: "New cancers, men", numeric: true },
            { key: "women", label: "New cancers, women", numeric: true },
            { key: "asrm", label: "All sites, men", numeric: true },
            { key: "asrf", label: "All sites, women", numeric: true },
            { key: "prostate", label: "Prostate (cases)", numeric: true },
            { key: "breast", label: "Breast (cases)", numeric: true },
            { key: "lung", label: "Lung, both sexes (cases)", numeric: true },
            { key: "cervix", label: "Cervix (cases)", numeric: true },
          ],
          rows: [
            { year: "2020", men: 20835, women: 18827, asrm: 207.8, asrf: 181.4, prostate: 3890, breast: 3615, lung: 5225, cervix: 1078 },
            { year: "2022", men: 19567, women: 17812, asrm: 190.4, asrf: 168.2, prostate: 3846, breast: 3689, lung: 4922, cervix: 1151 },
          ],
          note: "Totals include skin cancers of all types (7,403 in 2020 and 5,833 in 2022), most of them basal and squamous cell cancers that IARC counts separately. Both years are labelled preliminary in the yearbook that printed them; the 2023 edition carried 2020 and the 2024 edition 2022. Lung is the sum of the men's and women's rows.",
          sources: [
            { label: "Anuario Estadístico de Salud 2024, tables 80 and 81 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
            { label: "Anuario Estadístico de Salud 2023, tables 77 and 78 (MINSAP, PDF; read through the Internet Archive)", url: AES_2023 },
          ],
        },
        {
          id: "cu-deaths",
          title: "Cancer deaths by site, 2023 and 2024",
          caption: "Deaths from malignant tumours and crude rates per 100,000, from the Ministry of Public Health's death registration.",
          columns: [
            { key: "site", label: "Site" },
            { key: "d23", label: "Deaths 2023", numeric: true },
            { key: "d24", label: "Deaths 2024", numeric: true },
            { key: "r24", label: "Rate 2024", numeric: true },
          ],
          rows: [
            { site: "Lung, trachea and bronchus", d23: 5003, d24: 5059, r24: 51.1 },
            { site: "Prostate (rate per 100,000 men)", d23: 3495, d24: 3861, r24: 79.0 },
            { site: "Intestine except rectum", d23: 2666, d24: 2731, r24: 27.6 },
            { site: "Female breast (rate per 100,000 women)", d23: 1814, d24: 1795, r24: 35.8 },
            { site: "Lip, mouth and pharynx", d23: 938, d24: 1013, r24: 10.2 },
            { site: "Larynx", d23: 920, d24: 945, r24: 9.5 },
            { site: "Cervix (rate per 100,000 women)", d23: 539, d24: 478, r24: 9.5 },
            { site: "All malignant tumours", d23: 25350, d24: 25861, r24: 261.2 },
          ],
          note: "A selection of the yearbook's 21 rows. Rates are crude, not age-standardised; the 2024 figures are marked preliminary.",
          sources: [{ label: "Anuario Estadístico de Salud 2024, table 41 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry since 1964",
      aside: { label: "MINSAP: health statistics (read through the Internet Archive)", url: MINSAP_STATS },
      cards: [
        {
          id: "registry-national",
          title: "One national registry, published about two years after diagnosis",
          plain:
            "Cuba has a national population-based cancer registry, set up in 1964. Its figures appear in the Ministry of Public Health's yearly statistics book about two years late and marked preliminary: the yearbook published in 2025 carries cancers diagnosed in 2022. INOR, the national cancer institute, says it keeps the registry.",
          detail:
            "A chapter in IARC Scientific Publication 162 (Garrote and colleagues, 2011) describes the registry as national and population-based, established in 1964, with registration done entirely by passive methods; in its 1994 to 1995 data, death certificate only registrations ranged from 8% to 50% by site and histological verification from 34% to 100%, with five-year relative survival of 69% for breast, 56% for cervical and 41% for colon cancer. INOR's description of itself says it carries the cancer control programmes and the National Cancer Registry; the yearbook credits the registry and the Ministry's Dirección de Registros Médicos y Estadísticas de Salud. The 2024 yearbook prints 2022 incidence by province, site and age, and 234 cancers in people under 20 (106.2 per million, world-standardised), 55 of them leukaemias. The Ministry's statistics site posted separate cancer mortality tables for 2021 and 2022 in March 2024. IARC's GLOBOCAN 2024 does not use the registry's incidence; see the note under the IARC table.",
          links: [
            { label: "Garrote et al., cancer survival in Cuba 1994 to 1995 (IARC Sci Publ 2011, PubMed)", url: GARROTE },
            { label: "INOR: who we are (Spanish; read through the Internet Archive)", url: INOR_ABOUT },
            { label: "Anuario Estadístico de Salud 2024, tables 80 to 84 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
            { label: "MINSAP statistics: cancer mortality in Cuba 2021 to 2022 (13 March 2024; read through the Internet Archive)", url: MORT_2122 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: free care by law, but medicines are short",
      aside: { label: "Constitution of Cuba 2019, article 72 (Constitute Project)", url: CONSTITUTION },
      cards: [
        {
          id: "free-care",
          title: "A state health system free of charge, with 76 doctors per 10,000 people",
          plain:
            "Cuba's health system is run by the state, and the Constitution says care is free of charge. More than 30,000 doctors work mainly in family medicine. WHO's figures show households paying directly for a rising share of health spending, 16.6% in 2023 against 8.4% in 2021.",
          detail:
            "Article 72 of the 2019 Constitution, in the Constitute Project's translation, says public health is a right of all people and that it is the State's responsibility to guarantee access to quality medical attention, protection and recovery services free of charge. The 2024 yearbook counts 390,279 health workers, 76.1 doctors and 12.6 dentists per 10,000 people, 149 hospitals, 451 polyclinics and 12 research institutes, and 30,222 doctors working mainly in family medicine. WHO's Global Health Expenditure Database gives out-of-pocket payments as 8.4% of current health spending in 2021, 11.1% in 2022 and 16.6% in 2023, and current health spending as 13.8% of GDP in 2021 and 9.4% in 2023. WHO's universal health coverage service index for Cuba is 86 for 2021 to 2023. OnCo found no official breakdown of what patients pay for cancer care; see the gaps.",
          links: [
            { label: "Constitution of Cuba 2019, article 72 (Constitute Project, English translation)", url: CONSTITUTION },
            { label: "Anuario Estadístico de Salud 2024, summary and table 96 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
            { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Cuba (API)", url: WHO_OOP },
            { label: "WHO Global Health Observatory: health spending as a share of GDP, Cuba (API)", url: WHO_CHE },
            { label: "WHO Global Health Observatory: UHC service coverage index, Cuba (API)", url: WHO_UHC },
          ],
        },
        {
          id: "medicines",
          title: "In 2023, 40% of the basic medicines list was missing, including five cancer drugs",
          plain:
            "At the National Assembly in July 2023, officials reported 251 medicines missing, 40% of Cuba's basic list. Five of 14 cancer medicines tracked by the national industry were affected, among them cisplatin, carboplatin and paclitaxel. The industry blamed missing raw materials, and gave lack of financing, bank refusals and the US embargo among the causes.",
          detail:
            "A report by Granma, republished by the Pinar del Río newspaper Guerrillero on 28 July 2023, said the parliament had heard of 251 missing medicines, made in Cuba or imported, 40% of the basic list. BioCubaFarma's president Eduardo Martínez Díaz said the national industry supplies 61% of the list and that missing raw materials and materials caused 94% of shortages and plant breakdowns 6%. He gave as causes the lack of timely financing, problems paying suppliers because foreign banks refused to work with Cuba, usual suppliers stopping because of the US economic embargo, and global shortages; he said about five million US dollars held abroad could not be brought in. Of 14 oncology products, five were affected at the end of June 2023: cisplatin 50 mg, carboplatin 450 mg, vinblastine 10 mg, paclitaxel 300 mg and zoledronic acid 4 mg. Cristina Lara, the Ministry's director of medicines, said about 244 medicines are imported with health system funds and that missing items reached 44% of the list, or 74% counting those held for fewer than 30 days. PAHO's 2025 annual report for Cuba records more than 9,300 kg of medicines, including vaccines, bought through PAHO for priority programmes. OnCo found no later official shortage count; see the gaps.",
          links: [
            { label: "Granma, republished by Guerrillero: medicine supply report to the National Assembly (28 July 2023, Spanish; read through the Internet Archive)", url: GUERRILLERO_2023 },
            { label: "PAHO: Cuba annual country report 2025 (Spanish, PDF)", url: PAHO_AR_2025 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: CECMED",
      aside: { label: "CECMED: about (read through the Internet Archive)", url: CECMED_ABOUT },
      cards: [
        {
          id: "cecmed",
          title: "One of eight regulators PAHO listed as regional references in 2020",
          plain:
            "CECMED registers medicines, medical devices and diagnostics in Cuba and authorises clinical trials. In 2020 PAHO listed it among eight regulators of regional reference in the Americas, beside those of the United States, Canada, Brazil, Argentina, Mexico, Chile and Colombia. Since 2023 it can rely on decisions by other trusted regulators to speed approvals.",
          detail:
            "CECMED describes itself as the regulatory authority for medicines, equipment and medical devices of the Republic of Cuba, covering laboratory access, registration of medicines, diagnostics and devices, clinical trials, post-marketing surveillance, good practice inspections, lot release and licensing. PAHO's release of 30 September 2020 lists the eight national regulatory authorities of regional reference: ANMAT (Argentina), ANVISA (Brazil), CECMED (Cuba), COFEPRIS (Mexico), Health Canada, ISP (Chile), INVIMA (Colombia) and the US FDA. CECMED's Resolution 78 of 2023, announced on 11 October 2023, puts regulatory reliance into force: CECMED may take into account decisions of the regional reference authorities certified by PAHO, WHO-listed authorities and authorities with bilateral agreements, while keeping responsibility for its own decisions, and applies expedited procedures to WHO-prequalified vaccines and medical products. A project funded by the European Union and implemented with PAHO, contracted in April 2025, is modernising CECMED's laboratory and digital systems. OnCo found no published WHO maturity level for CECMED and no published registration times.",
          links: [
            { label: "CECMED: about (Spanish; read through the Internet Archive)", url: CECMED_ABOUT },
            { label: "PAHO: regulatory capacities have improved over the past decade in the Americas (30 September 2020)", url: PAHO_NRAR },
            { label: "CECMED: Resolution 78 of 2023 on regulatory reliance (11 October 2023, Spanish; read through the Internet Archive)", url: CECMED_RELIANCE },
            { label: "PAHO: strengthening the capacities of Cuba's national regulatory authority (leaflet, Spanish, PDF)", url: PAHO_BIOTEC },
          ],
        },
        {
          id: "trial-rules",
          title: "Every trial authorised by CECMED and registered publicly before the first patient",
          plain:
            "Before a clinical trial opens in Cuba, CECMED must authorise it, and the trial must already be listed in the Cuban Public Registry of Clinical Trials, which has run since 2007. WHO counts this registry among its primary registries, so Cuban trials can be found through WHO's international search portal.",
          detail:
            "CECMED's clinical evaluation page says it evaluates and authorises the start of each clinical trial, ensures each trial site is accredited under good clinical practice, and requires evidence of registration in the public registry before it issues an authorisation or an authorisation of a change; its list of regulations includes requirements for phase I and II trials of investigational products for cancer and AIDS and for compassionate use. The Cuban Public Registry of Clinical Trials (RPCEC) was established in 2007 under the National Coordinating Centre of Clinical Trials (CENCEC). Its home page says a trial must obtain its RPCEC code before the first patient is recruited, under Ministry of Public Health Resolution 435 of 2017, that sponsors submit their entries in Spanish and English, and that a registered trial is never removed from public view. WHO's list of primary registries in its International Clinical Trials Registry Platform includes the RPCEC.",
          links: [
            { label: "CECMED: clinical evaluation (Spanish; read through the Internet Archive)", url: CECMED_CT },
            { label: "RPCEC: welcome to the Cuban Registry of Clinical Trials (read through the Internet Archive)", url: RPCEC },
            { label: "WHO: primary registries in the WHO registry network", url: WHO_PRIMARY },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Anuario Estadístico de Salud 2024, tables 77 to 79 (PDF)", url: AES_2024 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical smear testing since 1970, now reaching a quarter of the women it reached in 2019",
          plain:
            "Cuba has run a national cervical screening programme with smear tests for decades, offered every three years from age 25. In 2019, 826,663 women had an up-to-date test; in 2024, 218,286 did. Over the same years the cancers and precancers it found shifted later: in 2024 a third were precancers, against 60% in 2020.",
          detail:
            "Table 77 of the 2024 yearbook gives women with up-to-date cytology from 1970 (176,307) to a peak of 1,076,858 in 1995, then 826,663 in 2019, 707,550 in 2020, 251,102 in 2021, 340,491 in 2022, 264,555 in 2023 and 218,286 in 2024, a rate of 58.7 per 1,000 women aged 25 and over (re-examination every three years since 1997, every two years before). In 2024 coverage was 136.0 per 1,000 women aged 25 to 29 and 43.6 per 1,000 women aged 40 and over. Table 79 counts positives found by the programme by stage: of 925 in 2020, 59.8% were stage 0 (precancer or in situ) and 6.6% stage III or IV; of 586 in 2024, 32.9% were stage 0, 34.0% stage I and 12.1% stage III or IV. The yearbook does not give a reason for the fall. The yearbook reports no breast or bowel screening programme figures.",
          links: [
            { label: "Anuario Estadístico de Salud 2024, tables 77, 78 and 79 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine for girls aged nine from October 2025",
          plain:
            "Cuba added the HPV vaccine to its national immunisation programme in October 2025, giving one dose of the bivalent vaccine Cecolin to girls aged nine in school. The introduction had financial and technical support from Gavi and PAHO. Cuba reported to WHO that 94% of the girls targeted in 2025 were vaccinated.",
          detail:
            "PAHO reported that a national ceremony on 27 October 2025 at the Rafael María de Mendive primary school in Old Havana opened the campaign, which runs to 31 January 2026; that 68,000 doses of Cecolin, a bivalent vaccine prequalified by WHO, would be given to girls in fourth grade who are nine years old, with younger classmates vaccinated at their local clinic once they turn nine; and that the introduction had financial and technical support from Gavi, the Vaccine Alliance, and PAHO. WHO's vaccine introduction rows record the HPV vaccine introduced nationwide in Cuba in 2025 on a one-dose schedule, after recording it as not introduced from 2018 to 2024, and its coverage rows show 94% of a target of 57,727 girls (54,064 doses) for 2025. PAHO's 2025 annual report for Cuba lists the vaccine's introduction among the year's milestones.",
          links: [
            { label: "PAHO: HPV vaccination begins in Cuba (29 October 2025, Spanish)", url: PAHO_HPV },
            { label: "WHO immunisation data: HPV programme coverage rows for Cuba (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV vaccine introduction and schedule rows for Cuba (API)", url: WHO_HPV_INTRO },
            { label: "PAHO: Cuba annual country report 2025 (Spanish, PDF)", url: PAHO_AR_2025 },
          ],
        },
      ],
    },
    {
      id: "workforce",
      nav: "Workforce",
      title: "Oncologists and cancer services",
      aside: { label: "Anuario Estadístico de Salud 2024, tables 96 and 163 (PDF)", url: AES_2024 },
      cards: [
        {
          id: "oncologists",
          title: "653 doctors working mainly in oncology, and 35 in radiation oncology",
          plain:
            "The Ministry's 2024 workforce count lists 653 doctors whose main work is oncology, 35 in radiation oncology and 45 in surgical oncology, with 260 doctors training in medical oncology. Oncology clinics recorded 250,308 consultations in 2024. INOR in Havana describes itself as the main national institution for cancer treatment and research, and it trains Cuba's oncologists.",
          detail:
            "Table 96 of the 2024 yearbook counts doctors by the specialty they mainly work in and by the specialty they hold: oncology 653 working and 410 specialists, radiation oncology 35 and 3, surgical oncology 45, haematology 293 and 179, pathology 518 and 382, and radiology 599 and 566. Table 163 lists 260 residents in medical oncology (224 Cuban and 36 from abroad) and 20 in radiation oncology. The yearbook counts 232,387 oncology consultations in 2023 and 250,308 in 2024 (2.5 per 100 people). INOR, in Vedado, describes itself as the main national institution for cancer treatment and research and the Ministry's reference centre for oncology, responsible for training oncologists, the cancer control programmes and the National Cancer Registry; Cubadebate reported that a new outpatient unit for chemotherapy, immunotherapy and supportive treatment opened there on 3 June 2026, as the institute marked 60 years since its founding. OnCo could not read a count of radiotherapy machines; see the gaps.",
          links: [
            { label: "Anuario Estadístico de Salud 2024, tables 96, 163 and the oncology consultation table (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
            { label: "INOR: who we are (Spanish; read through the Internet Archive)", url: INOR_ABOUT },
            { label: "Cubadebate: outpatient oncology treatment unit opens at INOR (4 June 2026, Spanish)", url: "http://www.cubadebate.cu/noticias/2026/06/04/inauguran-unidad-de-tratamiento-ambulatorio-de-oncologia-en-hospital-capitalino/" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Cuba does",
      title: "What Cuba does differently",
      cards: [
        {
          id: "biotech",
          title: "Cancer vaccines and antibodies made in Cuba",
          plain:
            "Cuba's state biotechnology industry makes its own cancer medicines: nimotuzumab, an antibody against EGFR used with radiotherapy, and two lung cancer vaccines, CIMAvax-EGF and racotumomab, each tested in randomised trials in Cuban hospitals with researchers from the Center of Molecular Immunology. Racotumomab lengthened survival against placebo; CIMAvax-EGF's gain was significant only in some of its analyses.",
          detail:
            "In a Cuban phase III trial of 405 patients with advanced non-small cell lung cancer after chemotherapy, CIMAvax-EGF gave a median survival of 10.83 months against 8.86 with supportive care (HR 0.82, P = 0.100 by the standard test; significant only by a weighted test), and 12.43 against 9.43 months in patients who had at least four doses. In a placebo-controlled trial of 176 patients, the anti-idiotype vaccine racotumomab-alum gave 8.23 against 6.80 months (HR 0.63, P = 0.004). A double-blind trial of 70 patients with high-grade glioma found median survival of 17.76 months with nimotuzumab and radiotherapy against 12.63 with placebo. BioCubaFarma, the state group that makes these products, describes 47 enterprises, 164 production lines and 16,490 workers, and lists monoclonal antibodies and therapeutic vaccines for cancer among its main products. In the United States, Roswell Park Cancer Institute has been testing CIMAvax with nivolumab or pembrolizumab in a phase I/II trial (NCT02955290) that started in December 2016 and is active but no longer recruiting.",
          links: [
            { label: "Rodriguez et al., phase III trial of CIMAvax-EGF in advanced NSCLC (Clin Cancer Res 2016)", url: "https://doi.org/10.1158/1078-0432.CCR-15-0855" },
            { label: "Alfonso et al., randomised trial of racotumomab-alum in advanced NSCLC (Clin Cancer Res 2014)", url: "https://doi.org/10.1158/1078-0432.CCR-13-1674" },
            { label: "Solomón et al., nimotuzumab with radiotherapy in high-grade glioma (BMC Cancer 2013)", url: "https://doi.org/10.1186/1471-2407-13-299" },
            { label: "BioCubaFarma: about us (Spanish; read through the Internet Archive)", url: BCF_ABOUT },
            { label: "ClinicalTrials.gov: NCT02955290, CIMAvax with anti-PD-1 therapy (Roswell Park)", url: CIMAVAX_US },
          ],
        },
        {
          id: "count-everything",
          title: "Counting cancer nationally, and publishing it every year",
          plain:
            "Cuba counts both cancer deaths and new cancers nationally. The Ministry of Public Health publishes cancer deaths by site, sex, age and province every year, and cancer incidence by site and province two years behind, in a yearbook that is free to download.",
          detail:
            "The 2024 yearbook describes a national health statistics system with 69 information systems, 14 national registries and 20 administrative registries, with departments at every level of care, and carries 168 numbered tables in eight chapters. For cancer it prints deaths by 21 sites for two years, by sex and age group, premature deaths at ages 30 to 69, incidence by province and site, childhood cancer by diagnostic group under the International Classification of Childhood Cancer, and the cervical screening series back to 1970. The 2022 incidence table shows wide differences between provinces: the world-standardised rate for men ranged from 149.8 per 100,000 in Granma to 252.3 in Sancti Spíritus and 271.8 on the Isla de la Juventud. The yearbook marks the 2024 indicators and the 2022 cancer figures as preliminary and liable to small changes.",
          links: [
            { label: "Anuario Estadístico de Salud 2024, introduction and table 80 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
            { label: "MINSAP: health statistics (read through the Internet Archive)", url: MINSAP_STATS },
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
          title: "No trial in OnCo's records has a site in Cuba",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Cuba. Cuban trials are registered in the Cuban Public Registry of Clinical Trials instead, and the Cuban research on this page comes from that system: randomised trials of Cuban vaccines and antibodies run in Cuban hospitals.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Cuba among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines registered on ClinicalTrials.gov; Cuban trials are required to register in the RPCEC before recruitment, and the nimotuzumab glioma trial on this page cites the Cuban National Register (No. 1745). OnCo has not counted cancer trials in the RPCEC; see the gaps. The three Cuban randomised trials on this page, of CIMAvax-EGF, racotumomab and nimotuzumab, were published in Clinical Cancer Research and BMC Cancer between 2013 and 2016; INOR, the Center of Molecular Immunology, provincial hospitals and the National Coordinating Center of Clinical Trials are among the authors' affiliations for both vaccine trials. A trial of CIMAvax with anti-PD-1 therapy has run in the United States at Roswell Park (NCT02955290), outside Cuba.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Cuba (search)", url: CTGOV },
            { label: "RPCEC: welcome to the Cuban Registry of Clinical Trials (read through the Internet Archive)", url: RPCEC },
            { label: "ClinicalTrials.gov: NCT02955290, CIMAvax with anti-PD-1 therapy (Roswell Park)", url: CIMAVAX_US },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "radiotherapy-count",
      title: "How many radiotherapy machines Cuba has was not read",
      plain:
        "OnCo could not read a count of radiotherapy machines or centres in Cuba from an official or IAEA source. The Ministry's yearbook counts radiation oncologists but not machines, and the IAEA's radiotherapy database could not be read as plain text.",
      detail:
        "The 2024 yearbook lists 35 doctors working mainly in radiation oncology and 20 in training, but no table of linear accelerators, cobalt units or brachytherapy. The IAEA's Directory of Radiotherapy Centres (DIRAC) is an interactive database that did not return readable text to a plain request, and no IAEA imPACT Review report for Cuba was found. Ask the referring hospital or INOR where radiotherapy is given and how long the wait is.",
      links: [
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
        { label: "Anuario Estadístico de Salud 2024, table 96 (MINSAP, PDF; read through the Internet Archive)", url: AES_2024 },
      ],
    },
    {
      id: "medicines-now",
      title: "No current official count of missing cancer medicines",
      plain:
        "The latest official figures OnCo read on missing medicines are from July 2023. OnCo found no later published count, no list of which cancer medicines are on Cuba's basic list, and no record of which of them CECMED has registered, so availability today cannot be stated here.",
      detail:
        "BioCubaFarma's site has a page headed missing medicines; the Internet Archive copy of July 2025 showed the heading but no list. The basic medicines list (cuadro básico de medicamentos) itself was not read. CECMED publishes data on registered medicines, but its registration entries for CIMAvax-EGF, racotumomab and nimotuzumab were not read, so their registration dates in Cuba are not given. What the US embargo does to cancer care is described on this page only as Cuban officials stated it to the National Assembly in 2023; a 2026 paper on sanctions and child health in Cuba (BMJ Paediatrics Open) had no abstract to read. Out-of-pocket spending on cancer care specifically was not found.",
      links: [
        { label: "BioCubaFarma: missing medicines page (read through the Internet Archive)", url: "https://web.archive.org/web/2025/https://www.biocubafarma.cu/es/medicamentos-en-falta" },
        { label: "Granma, republished by Guerrillero: medicine supply report to the National Assembly (28 July 2023; read through the Internet Archive)", url: GUERRILLERO_2023 },
      ],
    },
    {
      id: "unread-sources",
      title: "Other sources not read or not found",
      plain:
        "Some figures a reader would want are missing: recent survival after a cancer diagnosis in Cuba, the registry's completeness today, the number of cancer trials in the Cuban registry, a national cancer control plan, and IARC's detailed method page for Cuba. Cuban government sites did not answer from outside Cuba and were read through the Internet Archive.",
      detail:
        "The newest population-based survival figures found are for patients diagnosed in 1994 and 1995. No recent measure of the registry's completeness or of the share of cases verified by histology was found. The RPCEC's search could not be queried to count cancer trials. No national cancer control plan document was found on the International Cancer Control Partnership portal or the Ministry's site. IARC's detailed data sources page for Cuba is an interactive page that was not read; the method is taken from the fact sheet. The Ministry's cancer mortality tables for 2021 and 2022 were not opened. Every sld.cu, cecmed.cu and biocubafarma.cu page on this page timed out to a direct request on 11 November 2026 and was read from its Internet Archive copy.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Cuba (PDF)", url: IARC_FACTSHEET },
        { label: "Garrote et al., cancer survival in Cuba 1994 to 1995 (IARC Sci Publ 2011, PubMed)", url: GARROTE },
      ],
    },
  ],
  institutions: ["cuba-minsap", "cuba-national-cancer-registry", "cecmed", "cencec-cuba", "inor-cuba", "roswell-park", "iarc", "who"],
  companies: ["biocubafarma", "cimab"],
  drugs: ["nimotuzumab", "cecolin", "cisplatin", "carboplatin", "paclitaxel", "vinblastine", "zoledronic-acid"],
  trials: [],
  papers: [
    "paper-rodriguez-cimavax-egf-phase3-nsclc-ccr-2016", "paper-alfonso-racotumomab-maintenance-nsclc-ccr-2014",
    "paper-solomon-nimotuzumab-high-grade-glioma-bmc-cancer-2013", "paper-romero-cancer-control-cuba-medicc-2009",
  ],
  people: ["luis-eduardo-martin-rodriguez"],
  how:
    "Every card was written from Cuban official sources and international agencies, read in full rather than through a summary: the Ministry of Public Health's Anuario Estadístico de Salud 2024 and 2023, with the National Cancer Registry's incidence tables; the 2019 Constitution; CECMED's pages and its 2023 reliance resolution; the Cuban Public Registry of Clinical Trials; BioCubaFarma's description of itself; INOR's description of itself; a newspaper report of the July 2023 National Assembly session on medicines; PAHO's releases and its 2025 annual report for Cuba; WHO's spending, coverage and HPV data from its public APIs; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Cuban government sites were read from Internet Archive copies. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, the registry, CECMED, the trials centre, BioCubaFarma and four papers) carry their own sources.",
  verify:
    "Cuba's national counts come from its own registry and death registration, but the newest incidence year is 2022 and is preliminary. Which medicines are available changes month to month; ask the treating oncologist or hospital pharmacy what is in stock and what alternatives exist. Screening and vaccination are run through local polyclinics and family doctors, so ask there what is offered.",
  verifyLinks: [
    { label: "MINSAP: health statistics (read through the Internet Archive)", url: MINSAP_STATS },
    { label: "CECMED (read through the Internet Archive)", url: CECMED_ABOUT },
    { label: "Cuban Public Registry of Clinical Trials (read through the Internet Archive)", url: RPCEC },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Cuba (PDF)", url: IARC_FACTSHEET },
  ],
};
