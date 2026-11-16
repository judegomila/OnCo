import type { CountryDive } from "@/data/country-dive";

/**
 * Ecuador deep dive: the hand-written cards for /countries/ec/ (wave 7). Spanish sources were read in Spanish, from the
 * raw text of each page or PDF (the HTML itself or pdftotext), not from a summary of it, on 11 November 2026: the
 * Ministry of Public Health's Acuerdo Ministerial 0059-2017 and the Estrategia Nacional para la Atención Integral del
 * Cáncer en el Ecuador it approved (63-page PDF from the ICCP portal), the Ministry's news pages on the eleventh
 * revision of the Cuadro Nacional de Medicamentos Básicos (15 November 2022) and on ARCSA (31 August 2026), Expreso's
 * report of the twelfth revision (5 August 2026), the Registro Nacional de Tumores page and history page of SOLCA
 * Núcleo de Quito, the history page of SOLCA in Guayaquil, ARCSA's procedure page on gob.ec, PAHO's two news pages on
 * ARCSA, LEXIS's and NMS's summaries of the Ley Orgánica para la Atención Integral del Cáncer, the National
 * Assembly's January 2026 news page and El Comercio's report of the vote, El Diario's explainer of the SOLCA levy, the
 * IAEA's two-page imPACT Review summary of March 2019, IARC's GLOBOCAN 2024 fact sheet for Ecuador (PDF text), WHO's
 * Global Health Observatory and immunisation data APIs, the ClinicalTrials.gov API, and the papers through Europe PMC
 * (the two Quito registry papers in full text). The official text of the 2026 law in the Registro Oficial was not
 * reached; where a figure could not be read it is named under `gaps`.
 */
const ENC_2017 = "https://www.iccp-portal.org/system/files/plans/ac_0059_2017.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/218-ecuador-fact-sheet.pdf";
const RNT = "https://www.solcaquito.org.ec/registro-nacional-de-tumores/";
const SOLCA_Q_HIST = "https://www.solcaquito.org.ec/historia/";
const SOLCA_G_HIST = "https://www.solca.med.ec/nosotros-historia/";
const CUEVA_2022 = "https://doi.org/10.25100/cm.v53i1.4929";
const CUEVA_2022_FT = "https://europepmc.org/article/PMC/PMC9651078";
const CORRAL_2018 = "https://doi.org/10.25100/cm.v49i1.3785";
const CORRAL_2018_FT = "https://europepmc.org/article/PMC/PMC6018821";
const PUENTE_2025 = "https://doi.org/10.3332/ecancer.2025.2039";
const MONTERO_2017 = "https://doi.org/10.1016/j.canep.2017.10.014";
const PADILLA_2025 = "https://doi.org/10.1007/s12672-025-03168-w";
const LOJA_2023 = "https://doi.org/10.3390/nursrep13010030";
const MSP_CNMB_2022 = "https://www.salud.gob.ec/?p=76057";
const EXPRESO_CNMB_2026 = "https://www.expreso.ec/politica/ecuador-actualiza-cuadro-nacional-medicamentos-basicos-son-cambios-291613.html";
const MSP_ARCSA_2026 = "https://www.salud.gob.ec/gobierno-del-presidente-noboa-ejecuta-inversion-historica-de-usd-7-4-millones-para-el-fortalecimiento-operativo-y-tecnologico-de-arcsa-hacia-estandares-de-la-ops-oms/";
const ARCSA_HOMOL = "https://www.gob.ec/arcsa/tramites/inscripcion-certificado-registro-sanitario-medicamentos-fabricacion-extranjera-homologacion";
const PAHO_ARCSA_2025 = "https://www.paho.org/es/noticias/14-5-2025-agencia-regulacion-control-vigilancia-sanitaria-va-hacia-certificacion-nivel-iii";
const PAHO_ARCSA_2024 = "https://www.paho.org/es/noticias/28-10-2024-ops-ecuador-recibio-reconocimiento-por-apoyo-compromiso-tecnico-con-agencia";
const LEXIS_LAW = "https://www.lexis.com.ec/noticias/registro-oficial-del-dia-ecuador-promulga-la-ley-organica-para-la-atencion-integral-del-cancer";
const NMS_LAW = "https://nmslaw.com.ec/blog/2026/03/09/ecuador-ley-organica-atencion-integral-del-cancer/";
const ASAMBLEA_LAW = "https://www.asambleanacional.gob.ec/es/node/112837";
const ELCOMERCIO_LAW = "https://www.elcomercio.com/actualidad/politica/aprobada-por-unanimidad-ecuador-tiene-una-ley-para-la-atencion-integral-del-cancer/";
const ELDIARIO_SOLCA = "https://www.eldiario.ec/centro/bancos-de-ecuador-que-es-la-contribucion-para-solca-y-por-que-te-la-descuentan-durante-ciertas-transacciones-06042026/";
const IMPACT_2019 = "https://www.iaea.org/sites/default/files/documents/review-missions/ecuador_-_2019_impact_review.pdf";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20%27ECU%27";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20%27ECU%27";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20%27ECU%27";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ECU'%20and%20startswith(ANTIGEN,'PRHPV')";
const CTGOV = "https://clinicaltrials.gov/search?country=Ecuador&cond=cancer";
const CLEOPATRA = "https://clinicaltrials.gov/study/NCT00567190";

export const EC_DIVE: CountryDive = {
  iso2: "EC",
  iso3: "ECU",
  name: "Ecuador",
  flag: "🇪🇨",
  asOf: "2026-11-11",
  title: "Cancer in Ecuador",
  description:
    "Cancer in Ecuador from Ecuadorian sources: IARC's estimate of 31,204 new cancers and 15,711 deaths in 2024, the Quito cancer registry SOLCA has run since 1984, the 2026 cancer law and its right to be forgotten after cancer as legal summaries describe it, SOLCA's funding from a 0.5% levy on bank credit, the national essential medicines list, the regulator ARCSA, HPV vaccination since 2014, and the one trial in our records with sites in Ecuador.",
  lede:
    "Ecuador has counted cancer in Quito since 1984 and has five population-based registries of good quality, yet IARC's 2024 estimate of 31,204 new cancers and 15,711 deaths uses no Ecuadorian incidence data and is built from national death records. Stomach cancer causes the most cancer deaths, prostate and breast cancer are the commonest, and the public network buys specialised care from SOLCA, a private non-profit society paid partly through a levy on bank loans. In March 2026 a cancer law made cancer a national priority, according to legal summaries of it.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Ecuador is 31,204 new cancers and 15,711 deaths, an age-standardised incidence of 145.1 per 100,000 (144.2 in men, 149.9 in women) including non-melanoma skin cancer. IARC's fact sheet gives its incidence source for Ecuador as no data, and its method as national mortality estimates applied to modelled mortality-to-incidence ratios from registry survival data; deaths are WHO's national mortality data, with trends projected to 2024. So none of Ecuador's registries feeds the national incidence figure directly, and it moves with the death records. The registries themselves count more: Quito's registry measured 212.2 cancers per 100,000 men and 227.3 per 100,000 women in 2013 to 2017, excluding non-melanoma skin cancer, with breast cancer at 41.8 per 100,000 women (IARC's national figure 33.5) and prostate cancer at 63.0 per 100,000 men (IARC 41.8). Quito is one city, the capital, so neither figure is the national picture: the Ministry of Public Health's 2017 strategy projected a national rate from the registries of 164.8 and 172 per 100,000 for 2015. The five high-quality registries cover about 41% to 45% of the population, depending on the source.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Ecuador",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Ecuador (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 31,000 new cancers a year; stomach cancer causes the most deaths",
          plain:
            "IARC estimates 31,204 new cancers in Ecuador in 2024, 17,023 in women and 14,181 in men, and 15,711 deaths. Prostate cancer is the commonest in men and breast cancer in women, followed by cervical and thyroid cancer. Stomach cancer is third by cases but first by deaths, with 2,281 in the year.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 4,072 prostate cancers (1,518 deaths), 3,614 breast cancers (994 deaths), 3,100 stomach cancers (2,281 deaths), 2,543 colorectal cancers (1,320 deaths), 1,967 cervical cancers (991 deaths) and 1,921 thyroid cancers (209 deaths). In women the leading cancers by cases are breast (21.2% of female cancers), cervix (11.6%) and thyroid (1,508 cases, 8.9%); in men prostate (28.7%), stomach (1,602) and colorectum (1,153). By deaths, stomach cancer leads in women and is second to prostate cancer in men. The risk of developing a cancer before age 75 is 12.4% for men and 13.6% for women, and an estimated 77,512 people are living within five years of a diagnosis. Stomach cancer deaths are not spread evenly: a study of national death records from 2004 to 2015 counted 19,115 stomach cancer deaths and found the highest-risk cluster in the Andean provinces of Bolívar, Los Ríos, Chimborazo, Tungurahua and Cotopaxi, with a relative risk of 1.34.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Ecuador (PDF)", url: IARC_FACTSHEET },
            { label: "Montero-Oleas et al., the geographical pattern of gastric cancer mortality in Ecuador (Cancer Epidemiol 2017)", url: MONTERO_2017 },
          ],
        },
        {
          id: "quito-shift",
          title: "In Quito, thyroid cancer has overtaken breast cancer in women, and the fall in cervical cancer has stalled",
          plain:
            "Quito's registry shows a pattern changing over three decades. In the late 1980s cervical and stomach cancer were the commonest. By 2013 to 2017 the leading cancers in women were thyroid and breast, and in men prostate cancer. Cervical and stomach cancer fell at first and then stopped falling, which the registry's authors call a reason to strengthen prevention.",
          detail:
            "The registry's 2018 paper gives age-standardised incidence for six periods from 1985 to 2013: cervical cancer fell from 31.0 per 100,000 women in 1985 to 1988 to 18.6 in 2009 to 2013, stomach cancer in men from 28.5 to 20.3, while breast cancer rose from 25.4 to 38.8, prostate cancer from 22.7 to 62.9 and thyroid cancer in women from 6.3 to 35.0. Its 2022 paper extends this to 2017: for 2013 to 2017 thyroid cancer was 47.0 per 100,000 women and breast cancer 41.8, cervical cancer 17.5, prostate cancer 63.0 per 100,000 men and stomach cancer 19.5. Mortality from all cancers was 123.6 per 100,000 men and 107.9 per 100,000 women, with prostate (27.7) and stomach (16.8) highest in men and breast (15.1), stomach (11.3) and cervix (9.6) in women. Over the whole period incidence rose by about 2% a year in both sexes. The 2022 paper describes the stagnation in the decline of cervical and stomach cancer as worrying and the rise in thyroid, breast, prostate and colorectal cancer as making the national strategy urgent.",
          links: [
            { label: "Cueva et al., cancer incidence and mortality in Quito 1985 to 2017 (Colomb Med 2022; full text in Europe PMC)", url: CUEVA_2022_FT },
            { label: "Corral Cordero et al., trends in cancer incidence and mortality in Quito 1985 to 2013 (Colomb Med 2018; full text in Europe PMC)", url: CORRAL_2018_FT },
          ],
        },
      ],
      tables: [
        {
          id: "ec-quito-registry",
          title: "What the Quito registry (Registro Nacional de Tumores) has published",
          caption: "Age-standardised incidence per 100,000 (world standard), excluding non-melanoma skin cancer, from the registry's own papers. Latest published period: 2013 to 2017.",
          columns: [
            { key: "period", label: "Years" },
            { key: "men", label: "All cancers, men", numeric: true },
            { key: "women", label: "All cancers, women", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
            { key: "stomach", label: "Stomach, men", numeric: true },
            { key: "thyroid", label: "Thyroid, women", numeric: true },
          ],
          rows: [
            { period: "1985 to 1988", men: 142.3, women: 185.9, prostate: 22.7, breast: 25.4, cervix: 31.0, stomach: 28.5, thyroid: 6.3 },
            { period: "2009 to 2013", men: 200.8, women: 207.9, prostate: 62.9, breast: 38.8, cervix: 18.6, stomach: 20.3, thyroid: 35.0 },
            { period: "2013 to 2017", men: 212.2, women: 227.3, prostate: 63.0, breast: 41.8, cervix: 17.5, stomach: 19.5, thyroid: 47.0 },
          ],
          note: "One city: Quito had about 1.9 million people in 2017. The registry counted 20,197 new cancers other than non-melanoma skin cancer in 2013 to 2017 (8,730 in men, 11,467 in women). The 2013 to 2017 period overlaps the 2009 to 2013 one by a year because the two rows come from different papers.",
          sources: [
            { label: "Corral Cordero et al., Colomb Med 2018, table 1 (1985 to 2013)", url: CORRAL_2018 },
            { label: "Cueva et al., Colomb Med 2022, table 2 (2013 to 2017)", url: CUEVA_2022 },
          ],
        },
        {
          id: "ec-registries-2015",
          title: "Ecuador's six population-based registries, in the 2017 national strategy",
          caption: "Incidence per 100,000 projected to 2015 by each registry, excluding in situ and non-melanoma skin cancer, as printed in table 6 of the Ministry of Public Health's strategy.",
          columns: [
            { key: "registry", label: "Registry (area)" },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
          ],
          rows: [
            { registry: "Quito (city)", men: 195.9, women: 245.5 },
            { registry: "Guayaquil (city)", men: 206.9, women: 173 },
            { registry: "Cuenca (canton)", men: 186.7, women: 187.3 },
            { registry: "Loja (canton)", men: 119.3, women: 134.4 },
            { registry: "Manabí (province)", men: 93.2, women: 111.6 },
            { registry: "El Oro (province)", men: 59.8, women: 82.8 },
            { registry: "Ecuador (national projection)", men: 164.8, women: 172 },
          ],
          note: "The strategy's table estimated 13,289 cancers in men and 14,130 in women for 2015. Its text gives the national pair the other way round (164.8 for women, 172 for men); the table is reproduced as printed. The spread from El Oro to Quito is partly how much diagnosis each area has, not only how much cancer.",
          sources: [
            { label: "Estrategia Nacional para la Atención Integral del Cáncer en el Ecuador (2017), table 6 (PDF)", url: ENC_2017 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry run by SOLCA since 1984, and five more",
      aside: { label: "SOLCA Núcleo de Quito: Registro Nacional de Tumores", url: RNT },
      cards: [
        {
          id: "registry-rnt",
          title: "A national registry by name that counts one city, with five regional registries beside it",
          plain:
            "Ecuador's Registro Nacional de Tumores was created in 1984 and given to SOLCA in Quito to run. It was meant to cover the whole country in time, but it counts cancer in Quito, and separate registries were set up for Guayaquil, Cuenca, Loja, Manabí and El Oro. Its staff go to every laboratory in the city, public and private, to find each new case.",
          detail:
            "The registry's page says it was created in 1984 under Ministerial Agreement 6345, attached to SOLCA Núcleo de Quito, to monitor cancer and plan and evaluate control programmes, and that it took its national name from the original aim of reaching national coverage progressively; because a reliable national method could not be applied, population-based registries were created in other areas instead. Staff visit the pathology, haematology and cytology laboratories of all public and private services in Quito, and cases never examined under the microscope are found in hospital discharges and cancer deaths recorded by INEC, the national statistics institute. It is a member of the International Association of Cancer Registries, and its data have been accepted in volumes of Cancer Incidence in Five Continents. For 2013 to 2017 89.6% of its cases were histologically verified and 5.1% were known only from a death certificate. The 2017 national strategy puts the registries' coverage at 45% of the population, and the registry's 2022 paper says the five registries judged of high quality cover 41.4%. The registry's page links an epidemiological bulletin held on SOLCA Quito's library server, which did not respond when this page was checked on 11 November 2026.",
          links: [
            { label: "SOLCA Núcleo de Quito: Registro Nacional de Tumores", url: RNT },
            { label: "Estrategia Nacional para la Atención Integral del Cáncer, section 5 (PDF)", url: ENC_2017 },
            { label: "Cueva et al., cancer incidence and mortality in Quito (Colomb Med 2022)", url: CUEVA_2022 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: free public care by law, a private cancer society paid partly by a levy, and about 31% out of pocket",
      aside: { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Ecuador (API)", url: GHO_OOP },
      cards: [
        {
          id: "public-network",
          title: "The Constitution promises free specialised care for catastrophic illness; the public network buys much of it from SOLCA",
          plain:
            "Ecuador's Constitution guarantees free specialised care at every level to anyone with a catastrophic or highly complex illness. Public hospitals, the social security institute IESS and the armed forces and police insurers form a public network, which covers prevention, diagnosis and treatment and pays private providers, including SOLCA, for care it cannot give itself. Even so, households still pay about 31% of health spending directly.",
          detail:
            "The Ministry's 2017 strategy quotes article 50 of the Constitution, which guarantees the right to specialised and free care at every level, timely and preferential, to people with catastrophic or highly complex illness, and article 362, which defines the Red Pública Integral de Salud as state establishments, social security and other state providers. The strategy lists the social security institutes as IESS, ISSFA (armed forces) and ISSPOL (police), and says the public network covers prevention, diagnosis and treatment and holds agreements with private establishments, buying services from providers in the complementary network, among them SOLCA. It names weak referral and very little counter-referral between levels as a continuing problem. WHO's Global Health Observatory puts out-of-pocket payments at 30.9% of current health expenditure in 2023 (29.1% in 2019), total health spending at 7.6% of GDP and about 509 US dollars a person, government health spending at 11.9% of government expenditure, and Ecuador's universal health coverage service index at 78 in 2023. The cancer law of March 2026, according to legal summaries, guarantees free specialised care in the public system for people with a cancer diagnosis.",
          links: [
            { label: "Estrategia Nacional para la Atención Integral del Cáncer, Acuerdo Ministerial 0059-2017 and section 5.3 (PDF)", url: ENC_2017 },
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Ecuador (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: UHC service coverage index, Ecuador (API)", url: GHO_UHC },
            { label: "WHO Global Health Observatory: current health expenditure as a share of GDP, Ecuador (API)", url: GHO_CHE },
            { label: "LEXIS: Ecuador promulgates the Ley Orgánica para la Atención Integral del Cáncer (4 March 2026)", url: LEXIS_LAW },
          ],
        },
        {
          id: "solca-levy",
          title: "SOLCA: a private non-profit cancer society, funded partly by 0.5% of every private bank loan",
          plain:
            "Ecuador's public network buys specialised cancer care from SOLCA, a private non-profit society founded in Guayaquil in 1951, with branches in Quito, Cuenca and other cities. By law, 0.5% of every loan from a private bank or credit card instalment plan goes to cancer care: banks withhold it, and the Ministry of Public Health passes it to SOLCA's branches every quarter.",
          detail:
            "SOLCA's history page says it was founded in Guayaquil on 7 December 1951 as a private-law institution with a social purpose and no profit motive, and was charged with the fight against cancer by a legislative decree of 15 October 1953, under which it created its Quito and Cuenca branches and later branches in Loja, Portoviejo and Machala. Its Guayaquil hospital, the Instituto Oncológico Nacional Dr. Juan Tanca Marengo, opened in its present building in 1991; the Quito branch runs the 160-bed Hospital Oncológico Solón Espinosa Ayala and units in Santo Domingo, Ibarra and Chimborazo. According to El Diario's explainer, the levy is set in the Fourteenth General Provision of the Código Orgánico Monetario y Financiero: 0.5% of credit operations with private financial institutions, including loans, deferred credit card purchases, financing, portfolio purchases and discounted bills, withheld by the bank, deposited daily in the national treasury and transferred quarterly in advance by the Ministry of Public Health to SOLCA's branches, for comprehensive cancer care only. State institutions are exempt. On a 1,000 dollar loan the contribution is 5 dollars. A law firm's summary of the 2026 cancer law says the law's financing comes mainly from this contribution, with obligations of transparency, audit and annual publication of results.",
          links: [
            { label: "SOLCA: history of the society", url: SOLCA_G_HIST },
            { label: "SOLCA Núcleo de Quito: history", url: SOLCA_Q_HIST },
            { label: "El Diario: what the contribution for SOLCA is and why banks deduct it (6 April 2026)", url: ELDIARIO_SOLCA },
            { label: "NMS: the National Assembly issues the Ley Orgánica para la Atención Integral del Cáncer (9 March 2026)", url: NMS_LAW },
          ],
        },
        {
          id: "cnmb",
          title: "The national essential medicines list: 14 cancer and immune medicines added in 2022, and a six-monthly cancer medicines register under the 2026 law",
          plain:
            "Ecuador's national health system works from a national essential medicines list, the Cuadro Nacional de Medicamentos Básicos. Its 2022 revision added 30 medicines, including pembrolizumab, olaparib, alectinib and trastuzumab emtansine. A twelfth revision with 512 active ingredients was approved in August 2026, and the 2026 cancer law, according to legal summaries, adds a cancer medicines register to be updated every six months.",
          detail:
            "The Ministry of Public Health presented the eleventh revision on 15 November 2022: the list grew from 454 active ingredients in 2019 to 484, after 223 requests, 62% of them from the public network, and the 18-month review against prevalence, public health impact, evidence of safety and efficacy and cost-effectiveness replaced a previous revision that had taken about five years. The 14 additions classed as antineoplastic and immunomodulating agents were ibrutinib, lenvatinib, pembrolizumab, olaparib, ocrelizumab, guselkumab, alectinib, axitinib, azacitidine, triptorelin, apalutamide, vedolizumab, pirfenidone and trastuzumab emtansine; aprepitant and tapentadol were also added. The Ministry said inclusion would from then on be reviewed every three months. On 5 August 2026 the national health council CONASA approved a twelfth revision with 512 active ingredients, 18 more than the 494 of the version in force, including treatments for certain cancers; Expreso reported that it takes effect once published in the Registro Oficial. According to the legal publisher LEXIS, the 2026 cancer law creates a Registro Dinámico de Medicamentos Oncológicos linked to the list, to be updated every six months on cost-effectiveness and scientific evidence, and binding on the list. OnCo did not find the cancer medicines added in 2026 named in a primary source.",
          links: [
            { label: "Ministerio de Salud Pública: 30 medicines added to the Cuadro Nacional de Medicamentos Básicos (15 November 2022)", url: MSP_CNMB_2022 },
            { label: "Expreso: Ecuador updates the Cuadro Nacional de Medicamentos Básicos (5 August 2026)", url: EXPRESO_CNMB_2026 },
            { label: "LEXIS: Ecuador promulgates the Ley Orgánica para la Atención Integral del Cáncer (4 March 2026)", url: LEXIS_LAW },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: ARCSA",
      aside: { label: "gob.ec: ARCSA, registration of foreign-made medicines by homologation", url: ARCSA_HOMOL },
      cards: [
        {
          id: "arcsa-homologation",
          title: "A shorter route for medicines already registered by strict regulators, but only if they are on the national list",
          plain:
            "A medicine needs a registro sanitario from ARCSA, Ecuador's regulator in Guayaquil, before it can be sold. A foreign medicine already registered by a regulator ARCSA lists as a high-surveillance agency, or prequalified by the World Health Organization, can be registered by recognition. That route is open only to medicines on the national essential medicines list.",
          detail:
            "ARCSA's procedure page on gob.ec defines homologation as the official recognition of registrations granted by the health authorities of countries whose medicines regulators are high health-surveillance agencies, on a list ARCSA keeps and publishes, and extends it to medicines prequalified by WHO. Only medicines on the current Cuadro Nacional de Medicamentos Básicos that are registered and sold in such a country can use it, unless the national health authority makes a reasoned request. The applicant submits the foreign registration certificate, apostilled or legalised, through the Ventanilla Única Ecuatoriana, and must keep the full dossier available; if stability studies were not done for climatic zone IV, the shelf life granted is six months. The certificate lasts five years. The fee listed is 2,258.41 dollars for a foreign medicine, 565.21 for a foreign generic and 452.17 for a generic on the national list. Legal summaries of the 2026 cancer law say it adds a conditional registration for medicines for serious disease, to ease import where preliminary evidence shows benefit outweighing risk. ARCSA's own list of high-surveillance countries was not reachable; see the gaps.",
          links: [
            { label: "gob.ec: ARCSA, registration of foreign-made medicines by homologation", url: ARCSA_HOMOL },
            { label: "LEXIS: Ecuador promulgates the Ley Orgánica para la Atención Integral del Cáncer (4 March 2026)", url: LEXIS_LAW },
          ],
        },
        {
          id: "arcsa-maturity",
          title: "Working towards the World Health Organization's maturity level 3 with PAHO",
          plain:
            "The World Health Organization rates medicines regulators on a scale of maturity. ARCSA began a pre-assessment for level 3, a stable and well-functioning system, with the Pan American Health Organization in 2025, and in August 2026 the government announced a 7.4 million dollar project to equip it. OnCo found no announcement that the level has been awarded.",
          detail:
            "PAHO wrote in October 2024 that ARCSA, with intense national and regional cooperation, had started a process to be certified under WHO's Global Benchmarking Tool as a level 3 authority, which would give Ecuador a stable, well-functioning and integrated regulatory system. In a news item dated 14 May 2025, written by ARCSA's communications office, PAHO reported that ARCSA had begun the pre-assessment, with technical staff from PAHO's regional and country offices reviewing its processes, indicators and regulatory criteria. On 31 August 2026 the Ministry of Public Health announced a 7.4 million dollar investment to renew ARCSA's vehicles and equip its reference laboratories in Quito, Guayaquil and Cuenca, with the aim of certification as a regional reference regulatory agency by PAHO and WHO. OnCo did not find ARCSA in a published WHO list of authorities at maturity level 3 or above, and treats its level as not yet confirmed.",
          links: [
            { label: "PAHO: PAHO Ecuador recognised for its technical support to ARCSA (28 October 2024)", url: PAHO_ARCSA_2024 },
            { label: "PAHO: ARCSA moves towards level III certification (14 May 2025)", url: PAHO_ARCSA_2025 },
            { label: "Ministerio de Salud Pública: 7.4 million dollar investment in ARCSA (31 August 2026)", url: MSP_ARCSA_2026 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Estrategia Nacional para la Atención Integral del Cáncer (2017, PDF)", url: ENC_2017 },
      cards: [
        {
          id: "screening-rules",
          title: "What the 2017 strategy recommends: cervix, breast, bowel and stomach, and prostate testing by informed choice",
          plain:
            "Ecuador's national cancer strategy sets out who should be screened: women aged 21 to 65 for cervical cancer, women aged 50 to 69 by mammogram, adults aged 50 to 75 by a stool test for bowel cancer, and adults over 50 for stomach cancer. For prostate cancer it advises against mass screening and asks doctors to explain the uncertain benefits before a PSA test.",
          detail:
            "The strategy recommends a Papanicolaou smear every three years for women aged 21 to 65 and, where possible, cytology with HPV DNA testing every five years from 30 to 65; mammography for healthy women from 50 to 69, with earlier detection for women at higher risk; a quantitative faecal immunochemical test every year for people aged 50 to 75, or a qualitative test where that is not available; and for stomach cancer, for people over 50, a combination of Helicobacter pylori serology and pepsinogen with upper endoscopy (the ABC method). For men aged 50 to 74 it says generalised prostate screening is not appropriate and that early detection should be offered to well-informed men after the doctor explains its uncertain benefits and harms. It asks for diagnosis and staging within 45 days. It also records that public first-level facilities mostly offer cervical smears and breast self-examination advice, and that second-level hospitals often refer screening to the third level. The strategy also records a memorandum of understanding signed with Tokyo Medical and Dental University on 27 August 2012 to support national colorectal screening. OnCo did not find national screening coverage figures; see the gaps.",
          links: [
            { label: "Estrategia Nacional para la Atención Integral del Cáncer, sections 5.3, 5.5 and line of action 3 (PDF)", url: ENC_2017 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine in the national schedule since 2014, and boys vaccinated from 2024",
          plain:
            "Ecuador added the HPV vaccine to its national schedule in 2014. In the coverage Ecuador reported to the World Health Organization, 68% of girls in the target group received a first dose in 2025, after a fall to 29% in 2021. Boys were added in 2024, and 70% of them received a first dose in 2025.",
          detail:
            "The 2017 strategy states that the HPV vaccine has been in the national schedule since 2014 and expects the fall in cervical cancer to continue because of it. WHO's HPV programme coverage rows for Ecuador give first-dose coverage among girls of 93% in 2014, 99% in 2015 and 2016, 90% in 2017, 98% in 2018, 82% in 2019, 73% in 2020, 29% in 2021, 98% in 2022, 80% in 2023, 89% in 2024 and 68% in 2025 (104,174 doses for a target of 153,491 girls). Coverage of the last dose fell to 2% in 2021 and was 52% in 2022, 51% in 2023, 89% in 2024 and 68% in 2025. Rows for boys start in 2024, with first-dose coverage of 62% that year and 70% in 2025. WHO's rows do not say why coverage fell in 2020 and 2021, and OnCo does not guess.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Ecuador (API)", url: WHO_HPV_API },
            { label: "Estrategia Nacional para la Atención Integral del Cáncer, section 5.2 (PDF)", url: ENC_2017 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Ecuador does",
      title: "What Ecuador does differently",
      cards: [
        {
          id: "cancer-law-2026",
          title: "A 2026 cancer law with a right to be forgotten after cancer and job protection for patients and carers",
          plain:
            "In February 2026 Ecuador's National Assembly approved a cancer law with 142 votes, and it was published on 4 March 2026. Legal summaries of it, which OnCo read in place of the official text, say it makes cancer a national priority, protects patients and their carers from dismissal because of the illness, and stops insurers and lenders using a cancer history against someone five years after recovery without relapse.",
          detail:
            "The Ley Orgánica para la Atención Integral del Cáncer was approved in second debate on 4 February 2026 with 142 votes and published in the Seventh Supplement of Registro Oficial No. 236 on 4 March 2026, after the President signed it the day before. According to the legal publisher LEXIS and the law firm NMS, it binds every public, private, community and academic actor in the national health system; guarantees free specialised care in the public system; creates a right to oncological oblivion, under which a medical history cannot be used to restrict access to contracts, private insurance or financial services after five years of recovery without relapse; gives reinforced job stability to patients, substitute workers and carers; gives parents and carers of children with cancer paid leave and flexible hours; sets a maximum of 15 days between suspicion and diagnosis of childhood cancer; creates a National Cancer Committee with patient organisations among its voting members and a five-year National Cancer Plan; and regulates advanced therapies and biobanks. Its fifth transitional provision gave the Ministry of Labour 180 days to issue the rules on job stability. The National Assembly said the bill set out, for the first time in Ecuador, a comprehensive legal framework for cancer.",
          links: [
            { label: "LEXIS: Ecuador promulgates the Ley Orgánica para la Atención Integral del Cáncer (4 March 2026)", url: LEXIS_LAW },
            { label: "NMS: the National Assembly issues the Ley Orgánica para la Atención Integral del Cáncer (9 March 2026)", url: NMS_LAW },
            { label: "Asamblea Nacional: health committee approves the report for second debate (28 January 2026)", url: ASAMBLEA_LAW },
            { label: "El Comercio: Ecuador has a law for comprehensive cancer care (4 February 2026)", url: ELCOMERCIO_LAW },
          ],
        },
        {
          id: "referral-delay",
          title: "Measuring the cost of referral: 162 days to treatment through the public system, 62 at SOLCA",
          plain:
            "Because the public network sends many patients on to SOLCA, the path between the two matters. A study of 1,363 women treated for cervical cancer at SOLCA Quito found that those first seen in the public system waited a mean of 162 days to start treatment, against 62 days for women cared for at SOLCA from the start, and that the delay was linked to shorter survival in advanced stages.",
          detail:
            "The retrospective cohort covered women diagnosed with cervical cancer between 2012 and 2015 and treated at SOLCA Quito, grouped by whether care began in the public system with referral to SOLCA or was given entirely at SOLCA, and by FIGO 2009 stage. The difference in mean waiting time (162 against 62 days) was significant. Overall the survival hazard ratio for care at SOLCA from the start was 0.85 (95% confidence interval 0.73 to 1); the difference was clearest in stages III and IV, with a hazard ratio of 0.48 (0.37 to 0.63) in stage IV. The authors conclude that referral delays from the public system delayed treatment and affected survival in advanced disease, and call for research into the causes. The 2017 strategy had already named weak referral and counter-referral as a problem. For children, the 2026 law sets a maximum of 15 days between suspicion and diagnosis of cancer, according to the law firm NMS's summary.",
          links: [
            { label: "Puente-Vallejo et al., treatment delay and survival in cervical cancer, Quito (ecancer 2025)", url: PUENTE_2025 },
            { label: "Estrategia Nacional para la Atención Integral del Cáncer, section 5.3 (PDF)", url: ENC_2017 },
          ],
        },
        {
          id: "ivermectin-loja",
          title: "Where care is costly, people turn to cattle ivermectin; specialists in Loja do not recommend it",
          plain:
            "A study in rural Loja province found that 19% of its participants were people with cancer taking ivermectin, an antiparasitic commonly used in cattle, alongside chemotherapy, radiotherapy or immunotherapy; the other 81% used it for other diseases. Specialists interviewed said there is no authorisation to prescribe it and no scientific evidence for its use against cancer in people, and they did not recommend it.",
          detail:
            "The mixed-methods study used observation, surveys and interviews in the rural area of Loja province. It reports that cancer treatment is expensive and that social and economic pressures push patients to look for alternatives; in the abstract's words, 19% of the participants diagnosed with cancer take ivermectin-based medicines as an alternative therapy without leaving their cancer treatment, while 81% use it to treat other diseases. Participants said they felt better after the third dose; the specialists interviewed said there was no authorisation to prescribe it and no scientific knowledge of its application in humans for cancer, and did not recommend it. The abstract reports no clinical measurements. OnCo's ivermectin page sets out what is and is not known.",
          links: [
            { label: "Jiménez-Gaona et al., ivermectin in cancer treatment in Loja, Ecuador (Nurs Rep 2023)", url: LOJA_2023 },
            { label: "OnCo: ivermectin", url: "/drugs/ivermectin/" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "One trial in OnCo's records has sites in Ecuador: CLEOPATRA, at four hospitals",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, one cancer trial in our records lists Ecuador: CLEOPATRA, which tested pertuzumab with trastuzumab and docetaxel for HER2-positive breast cancer that had spread. Its Ecuadorian sites were SOLCA in Guayaquil and Quito and the oncology services of two other hospitals, one in each city.",
          detail:
            "CLEOPATRA (NCT00567190), sponsored by Genentech and completed, enrolled 808 patients at 322 sites; ClinicalTrials.gov lists four in Ecuador: SOLCA Guayaquil, the Teodoro Maldonado Carbo Hospital oncology service in Guayaquil (an IESS hospital, according to the IAEA's 2019 review), the Hospital Carlos Andrade Marín oncology service in Quito, and Hospital SOLCA Quito. That reflects the trials OnCo holds, mostly large industry and academic trials, not every study in Ecuador: a ClinicalTrials.gov search on 11 November 2026 for cancer with a location in Ecuador returned 42 studies, and 224 for any condition. A bibliometric study of Ecuadorian cancer publications from 2008 to 2021 found output rising after 2014 but dominated by case reports (30.7%), cross-sectional studies (21.9%) and reviews (16.5%), with gastrointestinal, gynaecological and breast cancers studied most often, while the commonest cancers in national statistics were breast, prostate and stomach cancer. The 2017 strategy itself noted little development of cancer research.",
          links: [
            { label: "ClinicalTrials.gov: NCT00567190 (CLEOPATRA), locations", url: CLEOPATRA },
            { label: "ClinicalTrials.gov: cancer studies with a site in Ecuador (search)", url: CTGOV },
            { label: "Padilla-Sánchez et al., cancer research in Ecuador: a bibliometric study (Discov Oncol 2025)", url: PADILLA_2025 },
          ],
        },
        {
          id: "plan-strategy",
          title: "From a 2017 strategy and a 2019 review to a five-year national cancer plan under the 2026 law",
          plain:
            "The Ministry of Public Health's national cancer strategy of 2017 was binding on the whole health system and valid for five years. Reviewers from the IAEA, WHO and IARC visited in March 2019 and recommended a steering committee and a budgeted action plan. According to legal summaries, the 2026 law now requires a National Cancer Committee and a five-year National Cancer Plan.",
          detail:
            "Acuerdo Ministerial 0059-2017 approved the Estrategia Nacional para la Atención Integral del Cáncer en el Ecuador, dated April 2017, as a mandatory standard for the national health system; the document gives itself five years of validity. It was prepared with clinicians from SOLCA, the social security hospitals and the Registro Nacional de Tumores. The imPACT Review, requested by the Ministry and carried out in March 2019, built on an earlier IAEA assessment in 2012; its summary, published on 27 June 2019, says reviewers visited facilities in Quito and Guayaquil, the Ministry, SOLCA and the social security institute, and recommended a cancer control steering committee of all major stakeholders to oversee the strategy with a performance management and action plan and a budget, more diagnostic capacity in public paediatric hospitals, a phased plan for national radiotherapy services, and full radiation safety measures. The 2026 law, according to legal summaries, creates the National Cancer Committee as an advisory body to the health authority and requires a National Cancer Plan for five years covering policy, clinical guidelines, prevention, early detection and specialist training. OnCo did not find the plan published.",
          links: [
            { label: "Ministerio de Salud Pública: Acuerdo Ministerial 0059-2017 and the national strategy (PDF, ICCP portal)", url: ENC_2017 },
            { label: "IAEA: imPACT Review Ecuador, March 2019 (PDF)", url: IMPACT_2019 },
            { label: "NMS: the National Assembly issues the Ley Orgánica para la Atención Integral del Cáncer (9 March 2026)", url: NMS_LAW },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "law-text",
      title: "The official text of the 2026 cancer law was not read",
      plain:
        "OnCo did not reach the Registro Oficial's own text of the Ley Orgánica para la Atención Integral del Cáncer. What this page says about the law comes from a legal publisher, a law firm, the National Assembly and a newspaper, all read in full. Its implementing regulation and the National Cancer Plan were not found.",
      detail:
      "The law's publication in the Seventh Supplement of Registro Oficial No. 236 on 4 March 2026 is reported by LEXIS, NMS and a monthly legislation digest published on ccq.ec; none reproduces the articles. Details such as the article numbers, the exact wording of the right to oncological oblivion, the members of the National Cancer Committee and how the Registro Dinámico de Medicamentos Oncológicos will be run should be checked against the Registro Oficial. The Ministry of Labour's rules on job stability were due within 180 days of publication; OnCo did not find them. A reader who needs to rely on the law should read it in the Registro Oficial or ask a lawyer.",
      links: [
        { label: "LEXIS: Ecuador promulgates the Ley Orgánica para la Atención Integral del Cáncer (4 March 2026)", url: LEXIS_LAW },
        { label: "ccq.ec: relevant legislation, March 2026 (PDF)", url: "https://ccq.ec/wp-content/uploads/2026/04/Legislacion-Relevante-Marzo-2026.pdf" },
      ],
    },
    {
      id: "registry-recent",
      title: "No registry figures after 2017, and none from the other five registries",
      plain:
        "The newest figures from the Quito registry that OnCo could read cover 2013 to 2017. The registry's own reports, such as its book for 2011 to 2015, and the reports of the Guayaquil, Cuenca, Loja, Manabí and El Oro registries were not found online in a readable form.",
      detail:
      "The Quito registry's page links no report, and the library server that holds its epidemiological bulletin did not respond on 11 November 2026. Its book Epidemiología del Cáncer en Quito 2011-2015 is cited in the registry's 2022 paper but was not found as a file. The figures for the other registries on this page are the 2015 projections printed in the Ministry's 2017 strategy. Survival after a cancer diagnosis in Ecuador was not found in a population-based source that OnCo could read. National cancer death counts from INEC after 2015 were not read.",
      links: [
        { label: "SOLCA Núcleo de Quito: Registro Nacional de Tumores", url: RNT },
        { label: "Cueva et al., cancer incidence and mortality in Quito (Colomb Med 2022)", url: CUEVA_2022 },
      ],
    },
    {
      id: "capacity",
      title: "Radiotherapy machines, cancer specialists and IESS's cancer spending are not counted here",
      plain:
        "OnCo could not read how many radiotherapy machines Ecuador has, how many oncologists work there, or how much the social security institute IESS spends on cancer. The IAEA's radiotherapy directory did not return data to a plain request, and the full 2019 imPACT Review report is not published.",
      detail:
      "The IAEA's Directory of Radiotherapy Centres serves its country figures through an interactive viewer that returned no data to a plain request on 11 November 2026, so no machine count is given. The IAEA's public summary of the March 2019 imPACT Review gives recommendations but no counts of equipment or staff. No current figures were found from IESS on the number of insured people, its cancer patients or its payments to SOLCA, or from the Ministry on the share of cancer care bought from SOLCA. WHO's 2020 cancer country profile for Ecuador was not at the address used for other countries.",
      links: [
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
        { label: "IAEA: imPACT Review Ecuador, March 2019 (PDF)", url: IMPACT_2019 },
      ],
    },
    {
      id: "regulator-unread",
      title: "ARCSA's list of recognised regulators, its approval times and screening coverage were not found",
      plain:
        "OnCo could not read ARCSA's current list of the foreign regulators whose approvals it recognises, any published target or measured time for registering a new medicine, or national figures for how many people are screened for cervical, breast or bowel cancer.",
      detail:
      "ARCSA's procedure page points to an external instruction document for the list of high-surveillance countries, and a copy on the public procurement portal did not respond. No ARCSA statistics on registration times for cancer medicines were found; figures quoted by consultancies and older news reports are not used. The 2017 strategy defines screening coverage indicators but OnCo found no published results for them. Which cancer medicines were added in the August 2026 revision of the national list was not found in a primary source, and the revision takes effect only on publication in the Registro Oficial.",
      links: [
        { label: "gob.ec: ARCSA, registration of foreign-made medicines by homologation", url: ARCSA_HOMOL },
        { label: "Expreso: Ecuador updates the Cuadro Nacional de Medicamentos Básicos (5 August 2026)", url: EXPRESO_CNMB_2026 },
      ],
    },
  ],
  institutions: ["msp-ecuador", "registro-nacional-de-tumores-ecuador", "solca-quito", "solca-guayaquil", "arcsa-ecuador", "iaea", "iarc", "who"],
  companies: ["roche-genentech"],
  drugs: [
    "pertuzumab", "trastuzumab", "docetaxel", "pembrolizumab", "olaparib", "alectinib", "trastuzumab-emtansine", "ibrutinib", "lenvatinib",
    "axitinib", "azacitidine", "triptorelin", "apalutamide", "ivermectin",
  ],
  trials: ["cleopatra"],
  papers: [
    "paper-cueva-quito-cancer-incidence-1985-2017-colomb-med-2022", "paper-corral-quito-cancer-trends-1985-2013-colomb-med-2018",
    "paper-puente-vallejo-cervical-treatment-delay-quito-ecancer-2025", "paper-montero-oleas-gastric-cancer-mortality-ecuador-canep-2017",
    "paper-padilla-sanchez-ecuador-cancer-research-bibliometric-2025", "paper-jimenez-gaona-ivermectin-loja-ecuador-2023", "paper-cleopatra-n-engl-j-med-2012",
  ],
  people: [],
  how:
    "Every card was written from Ecuadorian official sources, international agencies and indexed papers, read in Spanish or English in full rather than through a summary: the Ministry of Public Health's 2017 national cancer strategy and its news pages on the essential medicines list and on ARCSA; SOLCA's pages on its history and on the Quito registry; ARCSA's procedure page on gob.ec; PAHO's news pages on ARCSA; legal summaries and parliamentary and press reports of the 2026 cancer law; the IAEA's imPACT Review summary; IARC's GLOBOCAN 2024 fact sheet; WHO's health spending, coverage and immunisation data; ClinicalTrials.gov; and the registry papers in full text through Europe PMC. Spanish was translated by OnCo. The GLOBOCAN table below the profile is IARC's estimate; the tables in the profile are the registries' own figures.",
  verify:
    "National incidence is an IARC estimate made without Ecuadorian incidence data; the registries' figures describe their own areas. What the public network, IESS and SOLCA pay for, which medicines are on the national list and how the 2026 law is applied change faster than published documents; ask the treating hospital, the social security office or SOLCA's social work service what applies to you. The rights in the 2026 law should be checked in the Registro Oficial before relying on them.",
  verifyLinks: [
    { label: "Ministerio de Salud Pública", url: "https://www.salud.gob.ec/" },
    { label: "SOLCA Núcleo de Quito", url: "https://www.solcaquito.org.ec/" },
    { label: "SOLCA (Guayaquil)", url: "https://www.solca.med.ec/" },
    { label: "ARCSA", url: "https://www.controlsanitario.gob.ec/" },
    { label: "Estrategia Nacional para la Atención Integral del Cáncer (2017, PDF)", url: ENC_2017 },
  ],
};
