import type { CountryDive } from "@/data/country-dive";

/**
 * Venezuela deep dive: the hand-written cards for /countries/ve/ (wave 6). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the Ministerio del Poder Popular para la Salud's mortality
 * yearbooks for 2013, 2014, 2015, 2016 and 2017 (PDF text) and its news pages (through the site's public API), the
 * Sociedad Anticancerosa de Venezuela's 2018 bulletin of projections (PDF text) and its own pages, the Instituto
 * Nacional de Higiene "Rafael Rangel"'s pages, the Instituto Venezolano de los Seguros Sociales' pharmacy directory,
 * WHO's 2020 cancer country profile (PDF text), WHO's immunisation and health expenditure data APIs, IAEA DIRAC's
 * public country table, OCHA's humanitarian response plans on ReliefWeb (PDF text) and the WHO Health Cluster page,
 * IARC's GLOBOCAN 2024 fact sheet, ClinicalTrials.gov's API, and the papers through Europe PMC. Where a figure could
 * not be read it is named under `gaps`. The page reports what each source states and does not assess Venezuelan politics.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/862-venezuela-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/ven-2020.pdf";
const MPPS_YEARBOOKS = "https://mpps.gob.ve/anuarios-de-mortalidad/";
const MPPS_2013 = "https://mpps.gob.ve/wp-content/uploads/2026/04/29-Anuario2013.pdf";
const MPPS_2016 = "https://mpps.gob.ve/wp-content/uploads/2026/05/32-Anuario2016.pdf";
const MPPS_2017 = "https://mpps.gob.ve/wp-content/uploads/2026/08/33-Anuario2017.pdf";
const MPPS_BULLETINS = "https://mpps.gob.ve/boletines-epidemiologicos/";
const MPPS_REGISTRY = "https://mpps.gob.ve/la-importancia-de-un-registro-confiable-sobre-el-cancer-en-el-sector-de-la-salud-publica-y-privada/";
const MPPS_CX_PLAN = "https://mpps.gob.ve/evaluaron-avances-del-plan-de-accion-sobre-la-prevencion-y-control-del-cancer-cervicouterino/";
const MPPS_IVSS = "https://mpps.gob.ve/instituto-venezolano-de-los-seguros-sociales-mas-de-ocho-decadas-de-proteccion-y-bienestar-para-el-pueblo-trabajador/";
const MPPS_RAZETTI = "https://mpps.gob.ve/instituto-oncologico-luis-razetti-celebro-90-anos-de-servicio-ininterrumpido-por-la-salud-del-pueblo-venezolano/";
const MPPS_MACHADO = "https://mpps.gob.ve/ministra-magaly-gutierrez-reinauguro-emergencia-del-hospital-oncologico-padre-machado/";
const SAV_2017 = "https://www.iccp-portal.org/system/files/resources/boletin-incidencia-mortalidad-cancer-informe-pronosticos-mortalidad-venezuela-2017.pdf";
const SAV_HOME = "https://www.sociedadanticancerosa.org/";
const SAV_ABOUT = "https://www.sociedadanticancerosa.org/quienes-somos/";
const INHRR_DG = "https://inhrr.gob.ve/?page_id=2058";
const INHRR_ABOUT = "https://inhrr.gob.ve/?page_id=3088";
const INHRR_JUNTA = "https://inhrr.gob.ve/?page_id=2096";
const IVSS_PHARM = "https://www.ivss.gov.ve/farmacias";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'VEN'";
const WHO_COV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'VEN'%20and%20startswith(ANTIGEN,'HEPB')";
const GHED = "https://apps.who.int/nha/database/ViewData/Indicators/en";
const HRP_2024 = "https://reliefweb.int/report/venezuela-bolivarian-republic/venezuela-extension-humanitarian-response-plan-2024-2025";
const HRP_2026 = "https://reliefweb.int/report/venezuela-bolivarian-republic/venezuela-extension-del-plan-de-respuesta-humanitaria-2026";
const HEALTH_CLUSTER = "https://healthcluster.who.int/countries-and-regions/venezuela-(bolivarian-republic-of)";
const CTGOV = "https://clinicaltrials.gov/search?locStr=Venezuela&country=Venezuela&cond=cancer";
const DUMA = "https://doi.org/10.1200/JGO.19.00031";

export const VE_DIVE: CountryDive = {
  iso2: "VE",
  iso3: "VEN",
  name: "Venezuela",
  flag: "🇻🇪",
  asOf: "2026-11-11",
  title: "Cancer in Venezuela",
  description:
    "Cancer in Venezuela from Venezuelan and international sources: IARC's estimate of 61,657 new cancers and 30,883 deaths in 2024, built without any national incidence data; 25,400 cancer deaths in the Ministry of Health's 2017 mortality yearbook, dated April 2026, after years without one; the Sociedad Anticancerosa de Venezuela's own projections; free cancer medicines through 56 social security pharmacies set beside reports of shortages; radiotherapy centres in IAEA records; HPV vaccine not yet introduced; and one trial in our records with a Venezuelan site.",
  lede:
    "Venezuela counts cancer deaths but has not published a national count of new cancers, and for several years published little health data at all. The Ministry of Health's mortality yearbooks, which for a time went no further than 2013, now run to 2017, when 25,400 Venezuelans died of cancer, the second cause of death. IARC estimates 61,657 new cancers and 30,883 deaths for 2024, with prostate and breast cancer the commonest and lung cancer the commonest cause of cancer death.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Venezuela is 61,657 new cancers and 30,883 deaths, an age-standardised incidence of 174.0 per 100,000 (188.3 in men, 168.0 in women) and mortality of 84.5, including non-melanoma skin cancer (58,007 cancers without it). IARC's fact sheet gives no country-specific source for incidence: it took national mortality estimates and applied model-based mortality-to-incidence ratios from neighbouring countries' registries. Its mortality source is WHO's national data, with trends in national rates projected to 2024. So the incidence figure is a model built on deaths, not a count, and its accuracy depends on how complete the death registration is; WHO rated the quality of Venezuela's mortality registration as medium for 2007 to 2016. The Ministry of Health's own 2017 yearbook, the latest it has published, registered 25,400 cancer deaths; IARC's 30,883 for 2024 is about a fifth higher, a gap that includes seven years of population ageing and any deaths not registered. By site, the yearbook counted 2,784 prostate cancer deaths (IARC 2024: 3,664), 2,723 breast cancer deaths in women (2,883), 3,358 lung cancer deaths (4,623) and 1,589 cervical cancer deaths (2,138). The Sociedad Anticancerosa de Venezuela's projection of 52,855 new cancers for 2017, built on the registry's counts to 2014, is lower than IARC's 61,979 for 2018 in WHO's 2020 profile.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Venezuela",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Venezuela (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 62,000 new cancers a year; prostate and breast cancer the commonest",
          plain:
            "IARC estimates 61,657 new cancers in Venezuela in 2024, almost equally split between men (30,302) and women (31,355). Prostate cancer is more than a third of cancers in men, and breast cancer more than a quarter of cancers in women, followed by cervical cancer. Lung cancer causes the most cancer deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 10,495 prostate cancers (3,664 deaths), 9,004 breast cancers (2,883 deaths), 5,249 lung cancers (4,623 deaths), 4,611 colorectal cancers (2,477 deaths) and 4,012 cervical cancers (2,138 deaths). Prostate cancer is 34.6% of cancers in men, and breast cancer 28.7% and cervical cancer 12.8% of cancers in women. Age-standardised incidence is 63.8 per 100,000 for prostate, 49.4 for breast and 23.0 for cervical cancer. The risk of developing a cancer before age 75 is 18.1% for men and 16.2% for women, and an estimated 143,117 people are living within five years of a diagnosis. These are model estimates: IARC had no Venezuelan incidence data and built them from deaths, as the note under the table explains. WHO's 2020 profile estimated 1,046 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Venezuela (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: cancer country profile 2020, Venezuela (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "deaths-counted",
          title: "Counted deaths: 25,400 from cancer in 2017, the second cause of death",
          plain:
            "The Ministry of Health counts deaths from death certificates in its yearly Anuario de Mortalidad. Its 2017 yearbook, dated April 2026, registered 192,957 deaths, of which 25,400 (13.2%) were from cancer, second only to heart disease. Registered cancer deaths rose from 23,118 in 2013 to about 25,000 a year in 2016 and 2017.",
          detail:
            "The 2017 yearbook counts 12,411 cancer deaths in men (10.8% of male deaths) and 12,989 in women (16.6%). By site it registers 3,358 deaths from lung cancer (1,852 men, 1,506 women), 2,784 from prostate cancer, 2,723 from breast cancer in women and 31 in men, 1,589 from cervical cancer and 1,638 from stomach cancer. The share of all deaths due to cancer fell from 15.4% in 2013 to 13.2% in 2017 while the number rose, because total registered deaths rose faster, from 149,883 to 192,957; the yearbook notes that diabetes climbed to third place in 2017, and its first table ranks suicides and homicides fifth. The table below gives each yearbook's own figures. A 2006 review by the Ministry's oncology division, using the 2005 yearbook, counted 18,155 cancer deaths that year, 14.9% of all deaths.",
          links: [
            { label: "MPPS: Anuario de Mortalidad 2017, cuadros 1, 2 and 8 (April 2026, PDF)", url: MPPS_2017 },
            { label: "MPPS: Anuarios de Mortalidad", url: MPPS_YEARBOOKS },
            { label: "Capote Negrín, aspectos epidemiológicos del cáncer en Venezuela (Rev Venez Oncol 2006, PDF)", url: "https://site.oncologia.org.ve/upload/revista/pdf/10.%20Capote%20L%20%28269-281%29.pdf" },
          ],
        },
      ],
      tables: [
        {
          id: "ve-yearbooks",
          title: "Cancer deaths in the Ministry of Health's mortality yearbooks",
          caption: "Registered deaths from cancer (ICD-10 C00 to C97) by year of death, with the date printed on each yearbook. Latest year published: 2017.",
          columns: [
            { key: "year", label: "Year of death" },
            { key: "dated", label: "Yearbook dated" },
            { key: "cancer", label: "Cancer deaths", numeric: true },
            { key: "share", label: "% of all deaths", numeric: true },
            { key: "lung", label: "Lung", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "breast", label: "Breast, women", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
          ],
          rows: [
            { year: "2013", dated: "March 2017", cancer: 23118, share: 15.42, lung: 3402, prostate: 2438, breast: 2062, cervix: 1386 },
            { year: "2014", dated: "August 2018", cancer: 24199, share: 14.93, lung: 3597, prostate: 2585, breast: 2204, cervix: 1563 },
            { year: "2015", dated: "October 2019", cancer: 24439, share: 14.52, lung: 3550, prostate: 2660, breast: 2317, cervix: 1565 },
            { year: "2016", dated: "January 2021", cancer: 25836, share: 13.56, lung: 3499, prostate: 2874, breast: 2513, cervix: 1594 },
            { year: "2017", dated: "April 2026", cancer: 25400, share: 13.16, lung: 3358, prostate: 2784, breast: 2723, cervix: 1589 },
          ],
          note: "Deaths only: Venezuela publishes no national count of new cancers. Lung is the sum of men and women in each yearbook's detailed cause table (C34); breast is women only (C50); cervix is C53. The date is the one printed on each yearbook; all five files sit in upload folders dated April to August 2026 on the Ministry's current website, so when each first became public is not stated there.",
          sources: [
            { label: "MPPS: Anuario de Mortalidad 2013 (PDF)", url: MPPS_2013 },
            { label: "MPPS: Anuario de Mortalidad 2016 (PDF)", url: MPPS_2016 },
            { label: "MPPS: Anuario de Mortalidad 2017 (PDF)", url: MPPS_2017 },
            { label: "MPPS: Anuarios de Mortalidad 1995 to 2017 (index)", url: MPPS_YEARBOOKS },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a central registry, a gap in publication, and a civil society estimate",
      aside: { label: "MPPS: Anuarios de Mortalidad", url: MPPS_YEARBOOKS },
      cards: [
        {
          id: "publication",
          title: "What was published, and when",
          plain:
            "For several years Venezuela published little official health data. In 2018 the mortality yearbook the Sociedad Anticancerosa cited was the one for 2013, dated March 2017. The yearbooks for 2014 to 2016 carry dates from 2018 to 2021, the 2017 yearbook is dated April 2026, and in 2026 the Ministry posted weekly epidemiological bulletins again.",
          detail:
            "The Sociedad Anticancerosa de Venezuela's 2018 bulletin cites the Anuario de Mortalidad 2013 as its source for cancer being the second cause of death, and modelled mortality only to 2013. Writing in 2019, two Venezuelan oncologists said the Ministry had published bulletins sporadically, if at all, for several years, and that cancer was scarcely mentioned. The Ministry's website now holds yearbooks for 1995 to 2017: the 2014 edition is dated August 2018, 2015 October 2019, 2016 January 2021 and 2017 April 2026, and the 2017 edition presents its publication as a commitment to transparency. All of the files sit in upload folders dated April to August 2026, so the site does not show when the 2014 to 2016 editions were first released. The bulletins page lists weekly bulletins for 2026 only, from week 1 (4 to 10 January) to week 42 (18 to 24 October). No yearbook for 2018 or later has been posted, and IARC's GLOBOCAN 2024 used WHO's national mortality data with trends projected to 2024.",
          links: [
            { label: "MPPS: Anuarios de Mortalidad", url: MPPS_YEARBOOKS },
            { label: "MPPS: Boletines Epidemiológicos", url: MPPS_BULLETINS },
            { label: "SAV: Boletín de incidencia y mortalidad del cáncer 2017 (2018, PDF, ICCP portal)", url: SAV_2017 },
            { label: "Duma and Duque Duran, the state of cancer care in Venezuela (J Glob Oncol 2019)", url: DUMA },
          ],
        },
        {
          id: "central-registry",
          title: "The Registro Central de Cáncer: counts to 2014, and a new system in 46 centres",
          plain:
            "The Ministry's Dirección de Oncología keeps a central cancer registry. Its counts of new cancers for 1990 to 2014 were given to the Sociedad Anticancerosa de Venezuela for its projections, but the registry publishes no report of its own that OnCo could find. Since 2023 the Ministry has been installing a national cancer registry system in 46 health centres.",
          detail:
            "The Sociedad's 2018 bulletin states that its incidence data for 1990 to 2014 were provided by the Programa de Oncología, Registro Central de Cáncer; the bulletin gives 56,906 new cancers for 2014, the last year of registry data, a crude rate of 195.9 per 100,000. WHO's 2020 profile records no information on a population-based cancer registry for Venezuela, and IARC's fact sheet lists no country-specific incidence source. In November 2024 the Ministry described the Sistema del Registro Nacional del Cáncer, implemented with the science ministry in 46 health centres since 2023 alongside an oncology clinical record, and invited private clinics in Caracas and Miranda to join; Luis Capote Negrín, coordinator of the central registry, said the aim was to widen coverage to private clinics. In August 2026, reporting a meeting at the Dirección Nacional de Oncología, the Ministry restated the goal of consolidating the cancer registry. OnCo found no published output from the new system.",
          links: [
            { label: "MPPS: the national cancer registry system (25 November 2024)", url: MPPS_REGISTRY },
            { label: "SAV: Boletín de incidencia y mortalidad del cáncer 2017 (2018, PDF, ICCP portal)", url: SAV_2017 },
            { label: "WHO: cancer country profile 2020, Venezuela (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "sav-projections",
          title: "The Sociedad Anticancerosa's own projections: 26,510 deaths and 52,855 new cancers for 2017",
          plain:
            "Without recent official figures, the Sociedad Anticancerosa de Venezuela, a charity founded in 1948, worked with statisticians at the Universidad Simón Bolívar to project cancer cases and deaths from the last published data. Its 2018 bulletin projected 26,510 cancer deaths and 52,855 new cancers for 2017, with the highest rates in Vargas and the Capital District.",
          detail:
            "The bulletin, the third yearly report from the Sociedad, the Centro de Estadística y Matemática Aplicada of the Universidad Simón Bolívar and HomoData, modelled the Ministry's yearbooks for 1990 to 2013 and the registry's incidence for 1990 to 2014. It projected deaths rising from 23,121 in 2013 to 26,510 in 2017, a 15% increase, and new cancers falling from 56,906 in 2014 to 52,855 in 2017, a 7% fall; all its national rates are crude. The highest projected crude death rates in 2017 were Vargas (139.8 per 100,000), Distrito Capital (120.1) and Sucre (94.9). Its age-standardised projections for 2017 were 49.2 new prostate cancers per 100,000 men, 31.8 breast cancers and 24.0 cervical cancers per 100,000 women. The 2017 yearbook later registered 25,400 cancer deaths, close to the projection. The Sociedad's later reports for 2023 and 2024 could not be read; see the gaps.",
          links: [
            { label: "SAV: Boletín de incidencia y mortalidad del cáncer 2017 (2018, PDF, ICCP portal)", url: SAV_2017 },
            { label: "Sociedad Anticancerosa de Venezuela: Nosotros", url: SAV_ABOUT },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a free public system, social security pharmacies, and households",
      aside: { label: "IVSS: Farmacias de Alto Costo", url: IVSS_PHARM },
      cards: [
        {
          id: "public-system",
          title: "Free public care and 56 high-cost pharmacies, alongside reported shortages",
          plain:
            "The Ministry describes cancer care in public hospitals and at the social security institute, the IVSS, as free, and the IVSS lists 56 high-cost pharmacies across the country that the Ministry says supply cancer medicines free. Patients and doctors have reported long shortages, and in 2023 households paid about 30% of all health spending out of pocket.",
          detail:
            "The Instituto Venezolano de los Seguros Sociales was founded on 9 October 1944. The Ministry's anniversary page of October 2026 says its farmacias de alto costo guarantee the continuous free supply of cancer therapies, haemodialysis, immunosuppressants and chronic disease medicines; the IVSS directory lists 56, seven each in Distrito Capital and Carabobo and at least one in 22 states. A patient at the Instituto Oncológico Luis Razetti is quoted thanking it for free medicines. Independent sources describe a different picture in earlier years: Venezuelan oncologists interviewed in 2019 reported shortages of tyrosine kinase inhibitors since 2010, then of cisplatin, bevacizumab and hormonal medicines, and an estimate that the country had 10% of the drugs needed for cancer care; in a national cohort followed in 2018 to 2020, 43.8% of adults reported lack of access to medications. WHO's health expenditure database puts Venezuela's health spending at 3.8% of GDP in 2023, with 31.7% of current health spending from government, 29.7% paid out of pocket and 0.5% from external sources. OnCo found no published list of the cancer medicines the IVSS pharmacies hold.",
          links: [
            { label: "IVSS: Farmacias de Alto Costo directory", url: IVSS_PHARM },
            { label: "MPPS: IVSS, more than eight decades (9 October 2026)", url: MPPS_IVSS },
            { label: "Duma and Duque Duran, the state of cancer care in Venezuela (J Glob Oncol 2019)", url: DUMA },
            { label: "Nieto-Martínez et al., seven crisis indicators in Venezuela 2014 to 2020 (BMC Public Health 2025)", url: "https://doi.org/10.1186/s12889-025-23125-0" },
            { label: "WHO: Global Health Expenditure Database", url: GHED },
          ],
        },
        {
          id: "humanitarian",
          title: "The UN humanitarian plan covers people with chronic disease who lack medicines",
          plain:
            "A UN-coordinated humanitarian response has worked in Venezuela since at least 2019, and its plans name people with non-communicable diseases who cannot get medicines among those to reach. The 2026 plan seeks 632 million US dollars for 5.5 million people, and in June 2026 the health part of the response was 31% funded.",
          detail:
            "OCHA's extension of the Humanitarian Response Plan for 2024 to 2025 targeted 5.1 million people with 617 million US dollars, listed among priority groups people with communicable and non-communicable diseases lacking access to medicines and health interventions, and set the objective of reducing people's vulnerability to death and illness from communicable, non-communicable and mental health conditions. The 2026 extension, dated January 2026, targets 5.5 million people with 632 million US dollars and plans for the health cluster to supply essential medicines and to prioritise control of communicable and non-communicable diseases, chronic diseases included. The WHO Health Cluster page, which dates the cluster's activation to 2019, gives 10.5 million people in need of health assistance and 5.2 million targeted in June 2026, 31% funded, with management of non-communicable disease among its priorities, and lists an addendum for the earthquakes of June 2026. None of these documents gives a cancer-specific figure.",
          links: [
            { label: "OCHA: extension of the Humanitarian Response Plan 2024 to 2025 (ReliefWeb)", url: HRP_2024 },
            { label: "OCHA: extensión del Plan de Respuesta Humanitaria 2026 (ReliefWeb)", url: HRP_2026 },
            { label: "WHO Health Cluster: Venezuela", url: HEALTH_CLUSTER },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Instituto Nacional de Higiene \"Rafael Rangel\"",
      aside: { label: "INHRR: Dirección General de Regulación Sanitaria", url: INHRR_DG },
      cards: [
        {
          id: "inhrr",
          title: "A medicine needs a registro sanitario from the INHRR before it can be sold",
          plain:
            "Venezuela's Instituto Nacional de Higiene \"Rafael Rangel\", created in 1938 and attached to the Ministry of Health, grants the registro sanitario a medicine needs before it can be marketed, tests medicines' quality and runs pharmacovigilance. A board called the Junta Revisora advises the Ministry on registration and on clinical trials.",
          detail:
            "The institute was created by decree on 17 October 1938 and given Rafael Rangel's name on 29 March 1977. Its Dirección General de Regulación Sanitaria de Productos de Uso y Consumo Humano authorises the marketing of medicines through the registro sanitario, evaluates the quality of medicines and medical products, runs post-marketing surveillance and pharmacovigilance from spontaneous reports, and certifies bioequivalence centres; it also accompanies the Ministry in inspecting manufacturers for good manufacturing practice. The Junta Revisora de Productos Farmacéuticos, the institute's president with two physicians and two pharmacists named by the Ministry, advises on registration, promotion, prescription, dispensing, pharmacovigilance and clinical trials, sets the criteria for granting, renewing and cancelling registrations, and maintains the Normas Farmacológicas. In October 2026 the institute posted a 2026 norm for the regulation of biotherapeutic products, a category that includes many biological cancer medicines; the file is a scanned image that OnCo could not read. OnCo found no published review times, no list of cancer medicines registered with their dates, and no WHO maturity level for the institute.",
          links: [
            { label: "INHRR: ¿Quiénes somos?", url: INHRR_ABOUT },
            { label: "INHRR: Dirección General de Regulación Sanitaria", url: INHRR_DG },
            { label: "INHRR: Junta Revisora de Productos Farmacéuticos", url: INHRR_JUNTA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO: cancer country profile 2020, Venezuela (PDF)", url: WHO_PROFILE },
      cards: [
        {
          id: "cervical-breast",
          title: "Cervical screening by Pap smear, with between 10% and 50% of women taking part",
          plain:
            "Venezuela reported to WHO an organised cervical screening programme using the Pap smear, with participation somewhere between 10% and 50%, and a breast screening programme starting at age 50. The Ministry reviewed its cervical cancer plan for 2018 to 2030 in August 2026, and the Sociedad Anticancerosa offers Pap smears in its clinic and mobile units.",
          detail:
            "WHO's 2020 profile, from the government's 2019 responses, records an organised cervical screening programme by Pap smear with participation in the 10% to 50% band, early detection guidelines for breast, cervical, colon and childhood cancers, a defined referral system, and a breast screening programme starting at 50; for 2020 it counts 32.9 mammographs per 10,000 cancer patients. In August 2026 the Ministry's Dirección Nacional de Oncología reviewed the Plan de Acción para la Prevención y Control del Cáncer Cervicouterino 2018 to 2030, assessing gynaecology clinics and colposcopes in community health areas and training staff to take cytology samples. In a 2026 study, researchers testing self-collected samples from Wayuu, Eñepa and Warao women found HPV in 55.4%, and only 20 of 78 HPV-positive women with a smear had an abnormal Pap result, which they read as a case for HPV-based screening with triage. In a 2023 survey of 197 women at Caracas University Hospital, 89.3% recognised a breast lump as a warning sign but 9% knew the risk factors well.",
          links: [
            { label: "WHO: cancer country profile 2020, Venezuela (PDF)", url: WHO_PROFILE },
            { label: "MPPS: review of the cervical cancer action plan 2018 to 2030 (26 August 2026)", url: MPPS_CX_PLAN },
            { label: "Garcés et al., HPV genotypes in three Indigenous communities of Venezuela (Diseases 2026)", url: "https://doi.org/10.3390/diseases14100384" },
            { label: "Fermín et al., breast cancer awareness among Venezuelan women (J Cancer Educ 2025)", url: "https://doi.org/10.1007/s13187-025-02743-7" },
          ],
        },
        {
          id: "hpv-hbv",
          title: "HPV vaccine not yet in the national schedule; hepatitis B coverage has fallen",
          plain:
            "WHO's immunisation records show Venezuela had not introduced the HPV vaccine nationally by 2025, and a 2017 study found it would save money there. Hepatitis B vaccine, which prevents liver cancer, has been given to infants since 2000, but coverage with three doses fell from 87% in 2015 to 50% in 2025.",
          detail:
            "WHO's vaccine introduction table records HPV vaccine as not introduced in every year from 2006 to 2025, and Venezuela reported no HPV coverage; the 2026 study of Indigenous women states that HPV vaccination is not part of the national programme. The Ministry's August 2026 review of the cervical cancer plan discussed strategies for applying the vaccine. A 2017 model of 264,489 eleven-year-old girls found the bivalent and quadrivalent vaccines cost-saving against screening alone, avoiding about 2,100 to 2,300 deaths; two of its authors worked for GSK, a vaccine maker. WHO records hepatitis B vaccine introduced in 2000 and the birth dose in 2003. WHO and UNICEF estimate three-dose hepatitis B coverage at 87% in 2015, 60% in 2018, 43% in 2022, 62% in 2024 and 50% in 2025, and birth-dose coverage at 39% in 2025.",
          links: [
            { label: "WHO immunisation data: vaccine introduction rows for Venezuela (API)", url: WHO_INTRO_API },
            { label: "WHO immunisation data: hepatitis B coverage rows for Venezuela (API)", url: WHO_COV_API },
            { label: "Bardach et al., cost-effectiveness of HPV vaccines in Venezuela (BMC Public Health 2017)", url: "https://doi.org/10.1186/s12889-017-4064-7" },
            { label: "MPPS: review of the cervical cancer action plan 2018 to 2030 (26 August 2026)", url: MPPS_CX_PLAN },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer hospitals",
      aside: { label: "IAEA DIRAC: radiotherapy centres by country", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "43 radiotherapy centres in IAEA records, but how many machines work is not published",
          plain:
            "The IAEA's directory of radiotherapy centres lists 43 centres in Venezuela with 59 megavoltage treatment machines and 13 brachytherapy units. The directory depends on what centres report and does not say which machines are working; Venezuelan oncologists described broken and abandoned machines in 2019.",
          detail:
            "IAEA DIRAC's public country table, read on 11 November 2026, gives Venezuela 43 radiotherapy centres, 59 megavoltage photon and electron units and 13 brachytherapy units; the IAEA warns that its data rely on voluntary reports and may be incomplete. WHO's 2020 profile gives, for 2019, 6.8 external beam radiotherapy units, 77.4 radiologists, 3.7 nuclear medicine physicians and 3.4 public cancer centres per 10,000 cancer patients, and, for 2020, 1.1 PET scanners per 10,000 patients. It records radiation oncologist and medical physicist numbers as not available. Duma and Duque Duran wrote in 2019 that radiation machines in public and private hospitals were often broken and abandoned for lack of supplies, technicians and physicians, and that many women with breast cancer had mastectomy because adjuvant radiotherapy was not available. The Ministry says the Instituto Oncológico Luis Razetti (July 2026) and the Hospital Oncológico Padre Machado (October 2023) have radiotherapy operating. OnCo found no national count of working machines; see the gaps.",
          links: [
            { label: "IAEA DIRAC: radiotherapy centres by country", url: DIRAC },
            { label: "WHO: cancer country profile 2020, Venezuela (PDF)", url: WHO_PROFILE },
            { label: "Duma and Duque Duran, the state of cancer care in Venezuela (J Glob Oncol 2019)", url: DUMA },
          ],
        },
        {
          id: "centres",
          title: "The Instituto Oncológico Luis Razetti, 90 years old, and the Hospital Padre Machado",
          plain:
            "Two public cancer hospitals in Caracas appear repeatedly in the Ministry's records. The Instituto Oncológico Luis Razetti marked 90 years of service in July 2026 and has trained about 300 oncologists since 1945. The Hospital Oncológico Padre Machado reopened its emergency area in 2023 and offers radiotherapy, chemotherapy and surgery.",
          detail:
            "The Ministry's page of 27 July 2026 quotes Razetti staff saying chemotherapy, radiotherapy and surgery are all operating and that the hospital stayed open through the worst periods of crisis; its postgraduate oncology programme, endorsed by the Universidad Central de Venezuela, has run since 1945. The institute sponsored a ClinicalTrials.gov-registered study of HPV genotypes in cervical cancer that enrolled 329 women from 2009. At Padre Machado, in Santa Rosalía parish, the Ministry reopened the emergency area on 24 October 2023, saying it would serve more than 1,800 patients a month, and listed radiotherapy, chemotherapy infusion, cancer surgery, a pathology unit reopened in September 2022 and a working mammograph. A 2026 multicentre study of locally advanced cervical cancer drew patients from hospitals in Caracas, Valencia, Barquisimeto and Punto Fijo, all of whom had MRI staging. WHO's 2020 profile records bone marrow transplantation and pathology services as generally available, and community palliative care as generally not available.",
          links: [
            { label: "MPPS: Instituto Oncológico Luis Razetti celebrates 90 years (27 July 2026)", url: MPPS_RAZETTI },
            { label: "MPPS: emergency area of the Hospital Oncológico Padre Machado reopened (24 October 2023)", url: MPPS_MACHADO },
            { label: "MPPS: pathology unit of the Hospital Oncológico Padre Machado reopened (27 September 2022)", url: "https://mpps.gob.ve/reinauguracion-de-la-unidad-de-anatomia-patologica-del-hospital-oncologico-padre-machado/" },
            { label: "Hoegl et al., endoscopy in staging cervical cancer in Venezuela (ecancermedicalscience 2026)", url: "https://doi.org/10.3332/ecancer.2026.2139" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Venezuela does",
      title: "What Venezuela does differently",
      cards: [
        {
          id: "civil-society-counts",
          title: "A charity filled the statistics gap with its own model",
          plain:
            "When official cancer figures stopped appearing, the Sociedad Anticancerosa de Venezuela commissioned yearly projections of cancer cases and deaths, state by state, from university statisticians, to serve, in its words, as a statistical reference for the Venezuelan population. Its projection for 2017 came within about 4% of the deaths the Ministry later registered.",
          detail:
            "The Sociedad, founded in 1948, made these projections with the Universidad Simón Bolívar's Centro de Estadística y Matemática Aplicada, HomoData, a pharmaceutical company and a bank's foundation; its 2018 bulletin was the third yearly report and the first to include age-standardised rates, which it said would let Venezuela be compared with other countries. It projected 26,510 cancer deaths for 2017; the Ministry's 2017 yearbook, dated April 2026, registered 25,400, about 4% fewer. The same bulletin gives state-level crude rates and changes, from Amazonas to Zulia, that no official source then provided. The Sociedad also runs a prevention clinic in Altagracia, Caracas, which describes its costs as affordable, and mobile clinic units that take Pap smears and skin checks to workplaces and communities. The Ministry's 2025 cervical cancer forum included an oncologist from the Sociedad and the Hospital Padre Machado among its speakers.",
          links: [
            { label: "SAV: Boletín de incidencia y mortalidad del cáncer 2017 (2018, PDF, ICCP portal)", url: SAV_2017 },
            { label: "Sociedad Anticancerosa de Venezuela", url: SAV_HOME },
            { label: "MPPS: Anuario de Mortalidad 2017 (April 2026, PDF)", url: MPPS_2017 },
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
          title: "One trial in OnCo's records has a Venezuelan site, and the registry shows few new ones",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, one cancer trial in our records lists a site in Venezuela: CONFIRM, a breast cancer trial of the hormone medicine fulvestrant that started in 2005. Most cancer trials registered with Venezuelan sites started before 2010.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 1 trial lists Venezuela among its countries, AstraZeneca's CONFIRM (NCT00099437), comparing two doses of fulvestrant in advanced oestrogen receptor positive breast cancer. A ClinicalTrials.gov search for cancer studies with a location in Venezuela, run the same day, returned 43 studies: 32 started between 2000 and 2009, 8 between 2010 and 2015, 2 since 2020, one of them a burn wound study the search matched loosely, and 1 gives no start date. The other is a phase 1b/2 trial of ConvitVax in metastatic breast cancer sponsored by the Jacinto Convit World Organization, registered with a planned start in April 2024 and still marked not yet recruiting, its record last updated in September 2023. Venezuelan researchers continue to publish observational work: HPV types across all 24 states (2012) and in Indigenous communities (2026), breast cancer awareness in Caracas (2025) and cervical cancer staging (2026).",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Venezuela (search)", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT06023277, ConvitVax in metastatic breast cancer", url: "https://clinicaltrials.gov/study/NCT06023277" },
            { label: "Sánchez-Lander et al., HPV in cervical cancer in Venezuela (Cancer Epidemiol 2012)", url: "https://doi.org/10.1016/j.canep.2012.04.005" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "sav-later-reports",
      title: "The Sociedad Anticancerosa's 2023 and 2024 reports could not be read",
      plain:
        "The Sociedad Anticancerosa de Venezuela lists bulletins for 2019, 2023 and 2024 and a 2024 report on its website, but every file returned an error on 11 November 2026, and the Internet Archive refused OnCo's automated request. Newer projections reported in the press are not used here because the reports themselves were not read.",
      detail:
        "The Sociedad's menu links Boletín 2019, Boletín General 2023 and 2024, women's and men's health bulletins for 2023 and 2024, and Informe 2024; each link returned HTTP 404, as did the earlier upload addresses that OnCo tried, including the one where the Internet Archive's index shows the forecasting report for 2023 was posted in 2024. The Internet Archive answered with a block on automated traffic, which OnCo did not try to get round. The latest Sociedad projection on this page is therefore the 2018 bulletin for 2017, read from the copy on the International Cancer Control Partnership's portal. UICC's member page, which would confirm whether the Sociedad is a member, also refused OnCo's automated request, so the page makes no claim about that membership.",
      links: [
        { label: "Sociedad Anticancerosa de Venezuela", url: SAV_HOME },
        { label: "SAV: Boletín de incidencia y mortalidad del cáncer 2017 (2018, PDF, ICCP portal)", url: SAV_2017 },
      ],
    },
    {
      id: "no-incidence",
      title: "No national count of new cancers, and no recent deaths after 2017",
      plain:
        "OnCo found no published count of new cancers in Venezuela after 2014, no population-based registry results, and no survival figures. The Ministry's mortality yearbooks stop at 2017, so registered cancer deaths for 2018 to 2025 are not available from a Venezuelan source.",
      detail:
        "IARC's fact sheet lists no country-specific incidence source, and WHO's 2020 profile records no information on a population-based registry. The registry's counts for 1990 to 2014 appear only as the Sociedad Anticancerosa's model inputs. The new Sistema del Registro Nacional del Cáncer, in 46 centres since 2023, has published nothing OnCo could find. IARC's 2024 mortality is a projection of WHO's national series, and OnCo did not read WHO's mortality database for the last year Venezuela reported to it. The Ministry's 2026 weekly bulletins track notifiable diseases and were not read for cancer.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Venezuela (PDF)", url: IARC_FACTSHEET },
        { label: "MPPS: Anuarios de Mortalidad", url: MPPS_YEARBOOKS },
      ],
    },
    {
      id: "medicines-unknown",
      title: "Which cancer medicines are registered, stocked or free is not published",
      plain:
        "OnCo found no list of cancer medicines registered by the INHRR with their dates, no review times, no list of cancer medicines dispensed by the IVSS high-cost pharmacies, and no recent independent measure of cancer medicine shortages. The 2026 biotherapeutics norm is a scanned file that could not be read.",
      detail:
        "The INHRR's pages describe the registro sanitario and the Junta Revisora but give no timelines and no public register that OnCo could search. The IVSS pharmacy directory gives locations, not stock. The shortage evidence on this page dates from 2017 to 2020: the Duma commentary of 2019 and a cohort followed in 2018 to 2020, measuring medicines in general. No WHO Global Benchmarking Tool rating for the INHRR was found. Ask the treating hospital or the IVSS pharmacy which medicines are available.",
      links: [
        { label: "INHRR: Junta Revisora de Productos Farmacéuticos", url: INHRR_JUNTA },
        { label: "IVSS: Farmacias de Alto Costo directory", url: IVSS_PHARM },
      ],
    },
    {
      id: "radiotherapy-working",
      title: "How many radiotherapy machines are treating patients is not confirmed",
      plain:
        "The IAEA lists 43 radiotherapy centres and 59 megavoltage machines, but it relies on reports from centres and does not record whether a machine works. OnCo found no imPACT Review of Venezuela and no Ministry count of working machines, waiting times or radiation oncologists.",
      detail:
        "WHO's 2020 profile left radiation oncologists and medical physicists as not available. The 2019 commentary describing broken machines is the only independent account read here, and the Ministry's statements that radiotherapy operates at the Razetti institute and Padre Machado cover two hospitals. A 2026 review of radiotherapy access across Latin America was found in Europe PMC but not read in full.",
      links: [
        { label: "IAEA DIRAC: radiotherapy centres by country", url: DIRAC },
        { label: "WHO: cancer country profile 2020, Venezuela (PDF)", url: WHO_PROFILE },
      ],
    },
  ],
  institutions: [
    "venezuela-ministry-of-health", "inhrr-venezuela", "ivss-venezuela", "instituto-oncologico-luis-razetti", "hospital-oncologico-padre-machado",
    "sociedad-anticancerosa-de-venezuela", "who", "iarc", "iaea", "uicc",
  ],
  companies: ["astrazeneca"],
  drugs: ["fulvestrant", "tamoxifen", "anastrozole"],
  trials: ["nct00099437"],
  papers: [
    "paper-duma-state-of-cancer-care-venezuela-jgo-2019", "paper-sanchez-lander-hpv-cervical-venezuela-canep-2012", "paper-bardach-hpv-vaccine-cea-venezuela-bmcph-2017",
    "paper-garces-hpv-indigenous-venezuela-diseases-2026", "paper-fermin-breast-awareness-venezuela-jce-2025", "paper-nieto-martinez-venezuela-crisis-indicators-bmcph-2025",
    "paper-hoegl-lacc-endoscopy-venezuela-ecancer-2026",
  ],
  people: ["luis-capote-negrin", "gisela-vargas"],
  how:
    "Every card was written from Venezuelan official sources, international agencies and peer-reviewed papers, read in full rather than through a summary: the Ministry of Health's mortality yearbooks for 2013 to 2017 and its news pages; the Sociedad Anticancerosa de Venezuela's 2018 bulletin and its own pages; the INHRR's and the IVSS's pages; WHO's 2020 cancer country profile and its immunisation and health expenditure data; IAEA DIRAC's country table; OCHA's humanitarian response plans and the WHO Health Cluster page; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and a ClinicalTrials.gov search. Government statements and independent accounts are given side by side with their dates. The new records added for this page (the Ministry, the INHRR, the IVSS, two cancer hospitals, the Sociedad, seven papers and two people) carry their own sources.",
  verify:
    "National incidence is an IARC model built from deaths, and the latest registered deaths are for 2017. Which medicines are in stock at an IVSS pharmacy or a hospital, and whether a radiotherapy machine is working, change faster than any published source; ask the treating hospital's oncology service, or the IVSS pharmacy, what is available now. Cervical screening is offered in public clinics and by the Sociedad Anticancerosa's clinic and mobile units.",
  verifyLinks: [
    { label: "Ministerio del Poder Popular para la Salud", url: "https://mpps.gob.ve/" },
    { label: "IVSS: Farmacias de Alto Costo", url: IVSS_PHARM },
    { label: "Instituto Nacional de Higiene \"Rafael Rangel\"", url: "https://inhrr.gob.ve/" },
    { label: "Sociedad Anticancerosa de Venezuela: Clínica de Prevención", url: "https://www.sociedadanticancerosa.org/clinica-de-prevencion/" },
  ],
};
