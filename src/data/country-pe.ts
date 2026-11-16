import type { CountryDive } from "@/data/country-dive";

/**
 * Peru deep dive: the hand-written cards for /countries/pe/ (wave 5). Every figure was read on 11 November 2026 from the
 * raw text of its source, in Spanish where that is the original, not from a summary of it: INEN's Registro de Cáncer
 * de Lima Metropolitana, Incidencia y Mortalidad 2013 to 2015 (volume 6, 2021, PDF text); Ley 31336 as printed in El
 * Peruano; its regulation, Decreto Supremo 004-2022-SA, Decreto Supremo 009-2012-SA with Plan Esperanza, the Plan
 * Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030 and the complementary oncology list to the
 * essential medicines list (all scanned, read by OCR); Resolución Ministerial 480-2025-MINSA (OCR); Ley 32319 from El
 * Peruano; DIGEMID's Comunicado 051-2024 (Internet Archive copy, because digemid.minsa.gob.pe answered 403); the gob.pe
 * pages of FISSAL, SIS, EsSalud, INEN and INEI; Agencia Andina reports of the Ministry's HPV statements; the World
 * Bank's health expenditure series; the WHO cancer country profile 2020; and IARC's GLOBOCAN 2024 fact sheet for Peru.
 * Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/604-peru-fact-sheet.pdf";
const RCLM_2013 = "https://cdn.www.gob.pe/uploads/document/file/4016334/REGISTRO-DE-CANCER-DE-LIMA-METROPOLITANA-2013-2015.pdf";
const RCLM_PAGE = "https://www.gob.pe/institucion/inen/informes-publicaciones/8299322-registro-del-cancer-de-lima-metropolitana-rclm-registro-de-cancer-de-base-poblacional";
const LEY_31336 = "https://cdn.www.gob.pe/uploads/document/file/9750064/7973110-ley-nacional-de-cancer.pdf";
const DS_004_2022 = "https://www.gob.pe/institucion/minsa/normas-legales/2879401-004-2022-sa";
const DS_009_2012 = "https://www.gob.pe/institucion/minsa/normas-legales/241347-009-2012-sa";
const PNM_2025 = "https://www.gob.pe/institucion/minsa/normas-legales/7148697-016-2025-sa";
const PNM_2025_PDF = "https://cdn.www.gob.pe/uploads/document/file/8630682/7148697-plan-nacional-multisectorial-para-la-lucha-contra-el-cancer-2025-2030.pdf";
const RM_480_2025 = "https://www.gob.pe/institucion/minsa/normas-legales/6972661-480-2025-minsa";
const RM_945_2022 = "https://www.gob.pe/institucion/minsa/normas-legales/3684926-945-2022-minsa";
const LEY_32319 = "https://busquedas.elperuano.pe/api/visor_html/2395814-4";
const DIGEMID_COM_051 = "https://web.archive.org/web/2025/https://www.digemid.minsa.gob.pe/Archivos/Comunicados/2024/COM_051-2024.pdf";
const FISSAL_INST = "https://www.gob.pe/institucion/fissal/institucional";
const FISSAL_TRASLADO = "https://www.gob.pe/institucion/fissal/pages/9774-solicitar-cobertura-para-traslado-y-estadia-de-pacientes-oncologicos-estables";
const SIS_INST = "https://www.gob.pe/institucion/sis/institucional";
const INEI_2025 = "https://www.gob.pe/institucion/inei/noticias/1192559-38-1-de-la-poblacion-con-algun-problema-de-salud-acudio-a-un-establecimiento-en-busca-de-atencion";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=PE";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=PE";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/per-2020.pdf";
const ANDINA_HPV_2023 = "https://andina.pe/agencia/noticia-atencion-minsa-vacunara-tambien-a-varones-primaria-contra-vph-927401.aspx";
const ANDINA_HPV_2025 = "https://andina.pe/agencia/noticia-minsa-garantiza-vacuna-contra-vph-para-todos-los-varones-y-mujeres-9-a-18-anos-1017649.aspx";
const ELPERUANO_INEN = "https://elperuano.pe/noticia/138721-mas-de-17000-nuevos-casos-de-cancer-se-registraron-en-el-2021";
const INEN_DIRECTORY = "https://www.gob.pe/institucion/inen/funcionarios";
const MIR_2018 = "https://doi.org/10.3332/ecancer.2018.799";
const PINEROS_2017 = "https://doi.org/10.1016/S1470-2045(17)30377-7";
const GICC_2023 = "https://doi.org/10.26633/RPSP.2023.132";
const CTGOV_PE = "https://clinicaltrials.gov/search?cond=Cancer&country=Peru";

export const PE_DIVE: CountryDive = {
  iso2: "PE",
  iso3: "PER",
  name: "Peru",
  flag: "🇵🇪",
  asOf: "2026-11-11",
  title: "Cancer in Peru",
  description:
    "Cancer in Peru from Peruvian sources: IARC's estimate of 77,485 new cancers and 36,956 deaths in 2024 against the Lima registry's own count for 2013 to 2015, the 2021 national cancer law that enrols any uninsured cancer patient in the SIS, FISSAL's cover for seven cancers, DIGEMID's 45-day route for medicines registered in high-surveillance countries, cervical screening by HPV test, HPV vaccine for boys and girls, and eight public hospitals with their own radiotherapy.",
  lede:
    "Peru's cancer counts rest mainly on a long-running population registry in Lima and Callao, which registered 70,162 new invasive cancers in 2013 to 2015; IARC estimates 77,485 new cancers nationally for 2024, with prostate, breast, stomach, colorectal and cervical cancer leading and stomach cancer the commonest cause of cancer death. A 2021 law promises universal, free and priority cover for every cancer patient, and anyone without insurance is enrolled in the public SIS on diagnosis.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Peru is 77,485 new cancers and 36,956 deaths, an age-standardised incidence of 186.6 per 100,000 (174.7 in men, 200.6 in women) and mortality of 84.2; the all-cancers figure includes non-melanoma skin cancer, and without it IARC gives 74,073 cases. IARC's fact sheet names sub-national registries as the incidence source, with national mortality estimates applied to modelled mortality to incidence ratios, and WHO national data projected to 2024 for deaths. The Lima registry's own rate for 2013 to 2015, which also counts non-melanoma skin cancer, was higher at 225.8 per 100,000, and its mortality rate was 101.7 against IARC's 84.2 for the whole country; Lima is an urban population of about 9.75 million and its rates are not national ones. The Ministry's 2025 to 2030 plan quotes GLOBOCAN 2022 at 72,827 cases and 35,934 deaths, and gives a national age-adjusted cancer death rate from vital statistics of 124.2 per 100,000 in 2019, without naming the standard population, so it cannot be set beside IARC's world-standard rate. WHO rated the quality of Peru's mortality registration low for 2007 to 2016.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Peru",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Peru (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 77,000 new cancers a year, with stomach cancer the leading cause of cancer death",
          plain:
            "IARC estimates 77,485 new cancers in Peru in 2024: 42,241 in women and 35,244 in men. Prostate cancer is the commonest, then breast, stomach, colorectal and cervical cancer. Stomach cancer causes the most cancer deaths, more than lung cancer, and cervical cancer is the second commonest cancer in women.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 8,526 prostate cancers (2,993 deaths), 7,471 breast (2,083 deaths), 6,625 stomach (5,170 deaths), 5,313 colorectal (2,823 deaths) and 4,814 cervical cancers (2,405 deaths), with lung cancer seventh by cases (3,727) but second by deaths (3,100). In women the leading cancers are breast (17.7% of cases), cervix (11.4%), stomach, colorectum and thyroid; in men prostate (24.2%), stomach, colorectum, non-Hodgkin lymphoma and lung. IARC puts the risk of developing cancer before 75 at 18.2% and of dying of it at 8.4%. The Ministry's plan cites the Centre for Disease Control's finding that 46.9% of cancer deaths in 2016 were premature, between 30 and 69, rising above 58% in Tumbes, San Martín, Ucayali and Loreto.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Peru (PDF)", url: IARC_FACTSHEET },
            { label: "Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030, section 6.2.2 (PDF)", url: PNM_2025_PDF },
          ],
        },
        {
          id: "lima-registry",
          title: "The Lima and Callao population registry, with its latest report for 2013 to 2015",
          plain:
            "Peru's population-based cancer counting rests mainly on the Lima registry, run by the national cancer institute, INEN. Its sixth report, published in 2021, covers 2013 to 2015 and found 70,162 new invasive cancers among about 9.75 million people, with breast and prostate cancer the commonest after non-melanoma skin cancer and stomach cancer the leading cause of cancer death.",
          detail:
            "The Registro de Cáncer de Lima Metropolitana began in 1968, stopped in 1978 and restarted in 1990; it draws cases from Ministry of Health and EsSalud hospitals, the armed forces and police hospitals, private clinics and specialist centres. For 2013 to 2015 it registered 75,418 new cancers, 70,162 invasive (31,440 men, 38,722 women) and 5,256 in situ, an age-standardised incidence of 225.8 per 100,000, 81.6% histologically verified, and 32,572 deaths. The cumulative risk of cancer by age 74 was 21.09% in men and 21.68% in women. Its 2010 to 2012 data were included in IARC's Cancer Incidence in Five Continents volume XI. A 2017 review in the Lancet Oncology named Lima and Arequipa as the two areas of Peru with population-based registries. The 2022 regulation of the cancer law charges the Ministry and INEN with a national cancer registry built from population and hospital registries, with monthly mandatory notification.",
          links: [
            { label: "INEN: Registro de Cáncer de Lima Metropolitana 2013 to 2015, volume 6 (PDF)", url: RCLM_2013 },
            { label: "INEN: the registry's reports (gob.pe)", url: RCLM_PAGE },
            { label: "Piñeros et al., cancer patterns in Peru (Lancet Oncology 2017)", url: PINEROS_2017 },
            { label: "Decreto Supremo 004-2022-SA, articles 35 to 37 (gob.pe)", url: DS_004_2022 },
          ],
        },
      ],
      tables: [
        {
          id: "pe-registry",
          title: "What Peru's own registries report",
          caption: "Counts and age-standardised rates per 100,000 as each source states them. The Lima rows are three-year totals for 2013 to 2015.",
          columns: [
            { key: "source", label: "Source and measure" },
            { key: "period", label: "Years" },
            { key: "count", label: "Count", numeric: true },
            { key: "both", label: "Both sexes, per 100,000", numeric: true },
            { key: "men", label: "Men, per 100,000", numeric: true },
            { key: "women", label: "Women, per 100,000", numeric: true },
          ],
          rows: [
            { source: "Lima registry: new invasive cancers, all sites (includes non-melanoma skin)", period: "2013 to 2015", count: 70162, both: 225.76, men: 224.39, women: 230.75 },
            { source: "Lima registry: cancer deaths, all sites", period: "2013 to 2015", count: 32572, both: 101.72, men: 112.51, women: 94.63 },
            { source: "Lima registry: breast cancer, women", period: "2013 to 2015", count: 7037, both: null, men: null, women: 43.15 },
            { source: "Lima registry: prostate cancer", period: "2013 to 2015", count: 6194, both: null, men: 45.12, women: null },
            { source: "Lima registry: stomach cancer", period: "2013 to 2015", count: 5221, both: 16.57, men: 19.39, women: 14.37 },
            { source: "Lima registry: cervical cancer", period: "2013 to 2015", count: 3631, both: null, men: null, women: 21.99 },
            { source: "Lima registry: lung cancer", period: "2013 to 2015", count: 3522, both: 11.27, men: 13.14, women: 9.81 },
            { source: "Ministry of Health vital statistics: national age-adjusted cancer death rate", period: "2005", count: null, both: 135.2, men: null, women: null },
            { source: "Ministry of Health vital statistics: national age-adjusted cancer death rate", period: "2019", count: null, both: 124.2, men: null, women: null },
          ],
          note: "The Lima registry covers Lima and Callao only, about 9.75 million people, and its latest published report is for 2013 to 2015; no national incidence count exists, so national figures are IARC estimates. The national death rates are quoted in the Ministry's 2025 to 2030 plan from its vital statistics database, without the standard population, so they are not comparable with the registry's world-standard rates or with IARC's.",
          sources: [
            { label: "INEN: Registro de Cáncer de Lima Metropolitana 2013 to 2015, tables 5 to 8 (PDF)", url: RCLM_2013 },
            { label: "Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030, figure 2 (PDF)", url: PNM_2025_PDF },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a law of universal cancer cover, the SIS and FISSAL",
      aside: { label: "Ley 31336, Ley Nacional del Cáncer (El Peruano, 10 August 2021, PDF)", url: LEY_31336 },
      cards: [
        {
          id: "ley-31336",
          title: "The 2021 cancer law: universal, free and priority cover, and SIS enrolment for anyone without insurance",
          plain:
            "Peru's national cancer law of 2021 promises universal, free and priority health cover for every cancer patient, whatever the cancer. A person with cancer who has no insurance, or whose cover is not enough, is enrolled in the public insurer, the SIS, straight away; the regulation says this applies regardless of income.",
          detail:
            "Article 1 of Ley 31336, signed on 9 August 2021, sets the aim of guaranteeing universal, free and priority cover of health services for all cancer patients. Article 5 has insurers, public and private, pay for it, enrols people without EsSalud or private cover in the SIS immediately, protects the cancer budget programme 0024 and declares central purchasing of cancer medicines through CENARES of national interest. Decreto Supremo 004-2022-SA of 30 March 2022 makes the affiliation direct to the SIS subsidised scheme for any resident with a definitive cancer diagnosis and no cover of at least the essential plan, independent of socioeconomic status, keeps the SIS paying during another insurer's waiting period, and requires private insurers to cover treatments recognised in international guidelines. The law also creates a national oncology network under INEN and declares telemedicine for cancer and a national tumour bank network of national interest.",
          links: [
            { label: "Ley 31336, Ley Nacional del Cáncer (El Peruano, PDF)", url: LEY_31336 },
            { label: "Decreto Supremo 004-2022-SA, articles 7 to 9 (gob.pe)", url: DS_004_2022 },
          ],
        },
        {
          id: "fissal-seven",
          title: "FISSAL pays for seven cancers, automatically from diagnosis, and for travel when treatment is far away",
          plain:
            "For people in the SIS, a fund called FISSAL pays for diagnosis and treatment of the seven commonest cancers: cervix, breast, colon, stomach, prostate, leukaemias and lymphomas. Cover starts automatically at diagnosis. If treatment has to continue in another region and the patient cannot afford it, FISSAL can pay travel and lodging for the patient and a companion.",
          detail:
            "FISSAL, an executing unit of the SIS created by Ley 29761, describes itself as the only public fund paying for high-cost illness. Its cover includes medicines, laboratory tests and imaging, outpatient, inpatient and emergency care, medical and surgical treatment, and bone marrow transplant. It applies to members of SIS Gratuito, SIS Independiente and SIS Emprendedor. Travel and lodging are requested through the insurance office of the referring hospital, with a referral sheet, the appointment, a sworn statement, and for lodging a social work report. Cancers outside the seven, for SIS members, are covered through the essential plan and the complementary plan under the 2022 regulation. Plan Esperanza, approved by Decreto Supremo 009-2012-SA on 2 November 2012, set out to cover all types of cancer progressively for SIS members so that no one would go without care for lack of money.",
          links: [
            { label: "FISSAL: what it does and what it covers (gob.pe)", url: FISSAL_INST },
            { label: "FISSAL: travel and lodging for stable cancer patients (gob.pe)", url: FISSAL_TRASLADO },
            { label: "Decreto Supremo 009-2012-SA and Plan Esperanza (gob.pe)", url: DS_009_2012 },
          ],
        },
        {
          id: "insurance-and-oop",
          title: "Nine in ten people insured, but more than a quarter of health spending still out of pocket",
          plain:
            "Peru's statistics institute reported that 91.1% of people had some health insurance in early 2025, and that 63.1% of those insured were in the SIS. Even so, households paid about 27% of all health spending directly out of pocket in 2023, by World Health Organization figures.",
          detail:
            "INEI's household survey for January to March 2025 found 91.1% of the population with public or private health insurance, up from 88.9% a year earlier, 93.6% in rural areas and 90.5% in urban ones; 87.6% of rural residents were in the SIS. The World Bank's series from the WHO Global Health Expenditure Database gives out-of-pocket spending at 26.98% of current health expenditure in 2023 (27.04% in 2022), current health spending at 5.64% of GDP and US$445.53 a person, and government spending at 63.58% of current health expenditure. The Ministry's 2025 to 2030 cancer plan lists rising catastrophic out-of-pocket spending among the effects of cancer it aims to reduce, but no Peruvian figure for catastrophic spending on cancer was found in it.",
          links: [
            { label: "INEI: health insurance, first quarter 2025 (23 June 2025)", url: INEI_2025 },
            { label: "World Bank: out-of-pocket expenditure, Peru", url: WB_OOP },
            { label: "World Bank: current health expenditure, Peru", url: WB_CHE },
            { label: "SIS: mission (gob.pe)", url: SIS_INST },
          ],
        },
        {
          id: "medicines-list",
          title: "Cancer medicines: the essential list, a 2022 oncology supplement, and a route for anything outside it",
          plain:
            "Public hospitals buy from Peru's single national essential medicines list. A 2022 supplement added cancer medicines such as trastuzumab and abiraterone. A medicine outside the list goes to the hospital's committee, and if it costs more than a set threshold, to a national health technology assessment network with 45 working days to recommend.",
          detail:
            "Resolución Ministerial 945-2022-MINSA of 25 November 2022 approved a complementary list for neoplastic diseases to the Petitorio Nacional Único de Medicamentos Esenciales with nine entries: exemestane, pegylated liposomal doxorubicin, trastuzumab for neoadjuvant and metastatic HER2-positive breast cancer and metastatic HER2-positive gastric cancer, abiraterone for castration-resistant and hormone-sensitive metastatic prostate cancer, azacitidine for higher-risk myelodysplastic syndrome and aprepitant. Under Decreto Supremo 004-2022-SA a specialist's request for a cancer medicine outside the list reaches the hospital's pharmacotherapy committee within 7 calendar days, which decides within 7 more if the cost is below the high-cost threshold; above it, the Red Nacional de Evaluación de Tecnologías Sanitarias (RENETSA) assesses it and reports within 45 working days, and the public insurer reports on budget impact within 45 working days before CENARES buys. In an emergency the committee can authorise use within 48 hours while the assessment runs.",
          links: [
            { label: "Resolución Ministerial 945-2022-MINSA: oncology complementary list (gob.pe)", url: RM_945_2022 },
            { label: "Decreto Supremo 004-2022-SA, article 13 (gob.pe)", url: DS_004_2022 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: DIGEMID",
      aside: { label: "Ley 32319 (El Peruano)", url: LEY_32319 },
      cards: [
        {
          id: "digemid-45-days",
          title: "A 45-day decision for medicines already registered in a high-surveillance country, or approval by default",
          plain:
            "Since 2025, a cancer or rare-disease medicine that is registered and sold in a country Peru classes as high-surveillance must be decided by DIGEMID within 45 calendar days. If the regulator does not answer in time, the application is treated as approved. The company still has to file the full dossier.",
          detail:
            "Ley 32319, signed on 30 April 2025, exempts medicines and biological products for rare and orphan diseases, cancer and other diseases that are registered and marketed in a country of high health surveillance (país de alta vigilancia sanitaria) from articles 10 and 11 of Ley 29459, the pharmaceutical products law, and subjects them to an accelerated evaluation of no more than 45 calendar days with positive administrative silence. The applicant must file the complete quality, safety and efficacy information in common technical document format as authorised in the reference country, stability studies for climate zone IV-A or IV-B, a certificate of pharmaceutical product or free sale, a risk management plan, Spanish labelling and, for vaccines and plasma derivatives, a batch release certificate. The registration's validity follows the reference country's. The law applies immediately and repealed the 45-day article that Ley 31738 of 2023 had added to the rare diseases law.",
          links: [
            { label: "Ley 32319 (El Peruano)", url: LEY_32319 },
            { label: "DIGEMID: Comunicado 051-2024 (PDF, Internet Archive copy)", url: DIGEMID_COM_051 },
          ],
        },
        {
          id: "digemid-times",
          title: "DIGEMID's own figures: 4.9 months for a synthetic medicine and 2.8 months for a biological in 2024",
          plain:
            "In December 2024 the regulator said its average wait to register a medicine was 4.9 months for chemically made medicines and 2.8 months for biological ones, with 2,200 files in process. Under the 2023 fast route it had granted four registrations. It opposed a bill for automatic registration, arguing that no regulator in the world grants one.",
          detail:
            "DIGEMID's Comunicado 051-2024 of 5 December 2024 rejected press reports of 17,000 unattended files, stating that at 30 November 2024 there were 2,200 medicine registration files in process, 86% filed that year; that Ley 31738 of 11 May 2023 already provided a 45-calendar-day accelerated procedure for rare, orphan and oncology medicines from high-surveillance countries, under which it had granted four registrations with none pending; and that of 55 foreign laboratories inspected for good manufacturing practice that year, 14 (25%) failed and were barred from making medicines for Peru. It warned that removing the requirement for safety, efficacy and quality information would put cancer and rare-disease patients at risk. These are the regulator's own figures; OnCo found no independent measure of approval times for cancer medicines in Peru.",
          links: [
            { label: "DIGEMID: Comunicado 051-2024, 5 December 2024 (PDF, Internet Archive copy)", url: DIGEMID_COM_051 },
            { label: "Ley 31336, fifth final provision on DIGEMID and health technology assessment (PDF)", url: LEY_31336 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Resolución Ministerial 480-2025-MINSA: cervical cancer prevention directive (gob.pe)", url: RM_480_2025 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening from 25 to 64, with the HPV test first for women aged 30 to 49",
          plain:
            "Peru's 2025 rules offer cervical screening to women aged 25 to 64 at primary care centres. For women aged 30 to 49 the HPV test comes first, every five years; where it is not available, visual inspection with vinegar every three years, and otherwise a smear test. Women with HIV are screened more often.",
          detail:
            "Directiva Sanitaria 165-MINSA/DGIESP-2025, approved by Resolución Ministerial 480-2025-MINSA of 18 July 2025, sets the order of preference as molecular HPV detection, then visual inspection with acetic acid (VIA), then cytology, with only one method used per woman; cytology for women aged 25 to 29 and 50 to 64 and for pregnant women. HPV testing is repeated every five years in the general population and every three in women with HIV; VIA every three years, or yearly with HIV. A woman with a visible lesion must be referred within 3 days in urban areas, 10 in peri-urban areas and 15 in rural ones. The 2025 to 2030 plan targets 261,000 HPV tests by the Ministry in 2025, rising to 687,930 in 2030, plus 621,555 smear tests by EsSalud in 2025, and includes intercultural screening brigades on the Pastaza, Corrientes, Tigre, Marañón and Chambira rivers in Loreto. WHO recorded screening participation of 10% to 50% in 2019.",
          links: [
            { label: "Resolución Ministerial 480-2025-MINSA (gob.pe)", url: RM_480_2025 },
            { label: "Plan Nacional Multisectorial 2025 to 2030, activities 2.6 to 2.8 (PDF)", url: PNM_2025_PDF },
            { label: "WHO: cancer country profile, Peru 2020 (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "breast-prostate-screening",
          title: "Mammography from 40 to 69, and PSA testing for men from 50 to 75",
          plain:
            "The national cancer plan sets screening mammograms for women aged 40 to 69 with no symptoms, and a PSA blood test with a risk assessment for men aged 50 to 75. The Ministry aims to screen 315,000 women and 212,515 men in 2025, with EsSalud screening its own members.",
          detail:
            "Activity 2.9 of the Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030 describes bilateral mammography for apparently healthy women aged 40 to 69, with Ministry targets of 315,000 women in 2025 rising to 535,680 in 2030 and EsSalud targets of 203,876 rising to 225,093. Activity 2.10 offers men aged 50 to 75 an assessment of risk factors and a quantitative PSA test at primary and secondary care centres, with Ministry targets from 212,515 in 2025 to 427,441 in 2030 and EsSalud targets from 122,516 to 204,899. The plan does not state the mammography interval in these activities. PSA testing finds many slow-growing cancers that would never have caused harm as well as dangerous ones, so a man offered it should ask the doctor what the result would lead to before deciding.",
          links: [
            { label: "Plan Nacional Multisectorial 2025 to 2030, activities 2.9 and 2.10 (PDF)", url: PNM_2025_PDF },
            { label: "Decreto Supremo 016-2025-SA (gob.pe)", url: PNM_2025 },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccine for girls and, since 2023, boys, now a single dose from 9 to 18",
          plain:
            "Peru vaccinates against HPV, the virus behind most cervical cancers, free of charge. Boys were added in 2023, starting with the fifth year of primary school. Since 2025 one dose is given to everyone aged 9, with catch-up for anyone aged 10 to 18 not yet vaccinated, in schools, door to door and in public places.",
          detail:
            "Resolución Ministerial 099-2023/MINSA, reported by Agencia Andina on 31 January 2023, approved the Plan Nacional de Vacunación contra el Virus del Papiloma Humano 2023 and extended vaccination to boys in the fifth grade of primary school; until then only girls received the vaccine, then the quadrivalent vaccine in two doses six months apart. In February 2025 the Ministry's director of immunisations said one dose protects, that all children of 9 would be vaccinated and anyone of 10 to 18 not yet vaccinated would be offered it, citing Ley 31883; the 2024 target of 802,000 children aged 9 to 13 was exceeded with more than 1.2 million vaccinated once ages 14 to 18 were added. The 2025 cervical directive gives one dose to boys and girls aged 9 to 18. WHO recorded HPV vaccination programme coverage of 68.3% in 2018.",
          links: [
            { label: "Agencia Andina: Minsa will also vaccinate boys against HPV (31 January 2023)", url: ANDINA_HPV_2023 },
            { label: "Agencia Andina: HPV vaccine guaranteed for boys and girls aged 9 to 18 (5 February 2025)", url: ANDINA_HPV_2025 },
            { label: "Resolución Ministerial 480-2025-MINSA, section 6.1.1.1 (gob.pe)", url: RM_480_2025 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and the cancer workforce",
      aside: { label: "Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030 (PDF)", url: PNM_2025_PDF },
      cards: [
        {
          id: "radiotherapy",
          title: "Eight public hospitals with their own radiotherapy, and five that outsource it",
          plain:
            "The Ministry's 2025 cancer plan calls radiotherapy the country's main treatment need, since about half of cancer patients need it. It counts only eight public hospitals with their own radiotherapy service and five that buy it in. In 2012 the government's plan found radiotherapy in regional government hospitals in just three regions, and waiting lists at INEN.",
          detail:
            "The Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030 states that radiotherapy is the principal need among cancer services, that 50% of patients will need it, and that only eight hospitals have their own radiotherapy service while five outsource it; its activity 2.20 plans one new public radiotherapy service a year from 2027 to 2030, with regional governments and the nuclear energy institute IPEN, budgeted at 22 million soles a year, 88 million in all. Plan Esperanza in 2012 found that among regional governments only Arequipa, La Libertad and Lima had radiotherapy, listed public services in Lima, La Libertad, Arequipa, Lambayeque and Junín, and recorded waiting lists for radiotherapy at INEN. The WHO cancer country profile for 2020 gives 7.1 external beam radiotherapy units per 10,000 cancer patients in 2019. OnCo could not read the IAEA's DIRAC directory for a current machine count.",
          links: [
            { label: "Plan Nacional Multisectorial 2025 to 2030, causes of the problem and activity 2.20 (PDF)", url: PNM_2025_PDF },
            { label: "Decreto Supremo 009-2012-SA and Plan Esperanza, tables 10 and 15 (gob.pe)", url: DS_009_2012 },
            { label: "WHO: cancer country profile, Peru 2020 (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "workforce",
          title: "370 medical oncologists against an estimated need of 877",
          plain:
            "An International Atomic Energy Agency review in 2024 counted 370 qualified medical oncologists in Peru, including those treating children, and estimated that 877 are needed. It found 106 practising radiation oncologists, most of them in Lima, and 178 surgical oncologists, nearly four in five of them in Lima and Callao.",
          detail:
            "The Ministry's 2025 to 2030 plan reports the IAEA's imPACT review of 2024: 370 qualified medical oncologists including paediatric oncologists against an estimated need of 877; 142 qualified radiation oncologists, of whom 106 practise the specialty, most in Lima; 32 medical physicists in the public sector and 20 in the private sector, again mostly in Lima; and 178 surgical oncologists, 79.2% of them in Lima and Callao. It also cites the Centre for Disease Control's 2018 rates of 6.4 clinical oncologists, 5.6 surgical oncologists, 6.9 pathologists and 2.2 radiologists per million people. Peru's first imPACT review was in 2014, after which the Ministry created its cancer prevention and control directorate, DPCAN, in 2017.",
          links: [
            { label: "Plan Nacional Multisectorial 2025 to 2030, sections 6.2.1 and 6.2.3 (PDF)", url: PNM_2025_PDF },
            { label: "Decreto Supremo 016-2025-SA (gob.pe)", url: PNM_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Peru does",
      title: "What Peru does differently",
      cards: [
        {
          id: "enrol-on-diagnosis",
          title: "Insurance follows the diagnosis: an uninsured person with cancer is enrolled in the SIS whatever their income",
          plain:
            "Peru's public insurer, the SIS, is meant for people without other cover. For cancer, the 2021 law and its regulation enrol any resident with a confirmed cancer and no adequate cover directly in the SIS's subsidised scheme, independent of socioeconomic status, and the SIS keeps paying if the patient moves to another insurer and is waiting for cover.",
          detail:
            "Article 9 of Decreto Supremo 004-2022-SA, regulating Ley 31336, provides that every resident with a definitive cancer diagnosis who is not affiliated to EsSalud, the armed forces or police funds or a mixed or private insurer in the SUSALUD register, or whose cover is below the essential plan, is affiliated directly to the subsidised regime of the SIS independently of socioeconomic condition. The SIS keeps financing care for its cancer patients who move to another insurer during that insurer's waiting period, and a patient in a latency period without cover must be affiliated to the SIS with the essential plan, the complementary plan and FISSAL. Together with FISSAL's travel and lodging cover, this is Peru's answer to a cancer service concentrated in Lima: INEN said in February 2022 that 43% of its patients came from the provinces.",
          links: [
            { label: "Decreto Supremo 004-2022-SA, article 9 (gob.pe)", url: DS_004_2022 },
            { label: "Ley 31336, article 5.2 (El Peruano, PDF)", url: LEY_31336 },
            { label: "El Peruano: INEN's 2021 figures (5 February 2022)", url: ELPERUANO_INEN },
          ],
        },
        {
          id: "childhood-cancer",
          title: "Childhood cancer: an urgency law, and treatment abandonment cut from 18.6% to 8.5%",
          plain:
            "Peru began applying the World Health Organization's childhood cancer initiative in June 2019. A team from the Ministry and partners reported that the share of children abandoning cancer treatment fell from 18.6% to 8.5%, and Peru passed a law treating childhood cancer as a medical urgency, whose regulation the 2021 cancer law ordered within 30 days.",
          detail:
            "Maradiegue and colleagues, in the Revista Panamericana de Salud Pública in 2023, report Peru's progress since June 2019 under the WHO CureAll framework, with more than 150 participants in Ministry working committees: a fall in the national treatment abandonment rate from 18.6% to 8.5%, the approval of the childhood cancer law, better management of febrile neutropenia and fewer episodes of clinical deterioration and deaths among children in hospital. The sixth final provision of Ley 31336 ordered the Ministry to regulate Ley 31041, the medical urgency law for timely detection and comprehensive care of cancer in children and adolescents, within 30 calendar days. The WHO cancer country profile gives 1,097 cancers a year in children aged 0 to 14 in 2020. The paper's authors ran the programme they evaluate.",
          links: [
            { label: "Maradiegue et al., childhood cancer policy in Peru (Rev Panam Salud Publica 2023)", url: GICC_2023 },
            { label: "Ley 31336, sixth final provision (El Peruano, PDF)", url: LEY_31336 },
            { label: "WHO: cancer country profile, Peru 2020 (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "inen-network",
          title: "A national cancer institute that runs the registry and leads a national oncology network",
          plain:
            "INEN in Lima is Peru's national cancer institute and hospital. It runs the Lima cancer registry, shares responsibility for the national cancer plan with the Ministry, and under the 2021 law leads a national oncology network with the regional cancer institutes of the north, south and centre. It reported about 17,500 new cancer cases in 2021.",
          detail:
            "Article 11 of Ley 31336 creates the Red Oncológica Nacional, entrusted by the Ministry to INEN and made up of the regional cancer institutes of the north, south and centre and other cancer centres, to promote comprehensive cancer centres and timely diagnosis and follow-up nationally; article 10 authorises INEN to build the national register of cancer patients. In February 2022 INEN reported about 17,500 new cancer cases in 2021, 40% more than in 2020, with 362,000 outpatient consultations, 4,700 major operations, 46,600 chemotherapy sessions and 67,000 radiotherapy sessions that year. Its institutional head since 21 August 2026 is Wilder Genaro Calmet Berrocal. A 2018 study using the registry's 2004 to 2005 cases linked to the national identity register found five-year survival of 69.6% for breast, 64.3% for prostate and 50.1% for cervical cancer in Lima.",
          links: [
            { label: "Ley 31336, articles 10 and 11 (El Peruano, PDF)", url: LEY_31336 },
            { label: "El Peruano: INEN's 2021 figures (5 February 2022)", url: ELPERUANO_INEN },
            { label: "INEN: directory of officials (gob.pe)", url: INEN_DIRECTORY },
            { label: "Stenning-Persivale et al., survival in Metropolitan Lima (Ecancermedicalscience 2018)", url: MIR_2018 },
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
          title: "142 trials in OnCo's records list a site in Peru, nearly all phase 3 and industry-sponsored",
          plain:
            "Counted from ClinicalTrials.gov data in OnCo's graph on 11 November 2026, 142 cancer trials list Peru among their countries, 125 of them phase 3. Most are run by drug companies, led by MSD and AstraZeneca. They include cervical and stomach cancer trials, two cancers that weigh heavily in Peru.",
          detail:
            "Of the 142, ClinicalTrials.gov lists 36 as recruiting, 50 as active and not recruiting, 49 as completed and 7 as terminated; 125 are phase 3, 11 phase 2, 4 phase 2/3 and 2 phase 1/2. It names Merck Sharp & Dohme as lead sponsor of 36, AstraZeneca of 35, Hoffmann-La Roche of 18 and Bristol-Myers Squibb of 13; non-small cell lung cancer is the commonest first-listed cancer. Cervical cancer trials with Peruvian sites include KEYNOTE-826, KEYNOTE-A18, CALLA, innovaTV 301 and the LACC surgical trial; stomach cancer trials include ToGA, CheckMate 649, KEYNOTE-859 and MATTERHORN. None in OnCo's records has a Peruvian lead sponsor. The count covers trials in OnCo's records, not every registered study, so search ClinicalTrials.gov directly. The 2021 cancer law declares support for cancer research by the state, universities and patient organisations.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Peru", url: CTGOV_PE },
            { label: "Ley 31336, first final provision on research (PDF)", url: LEY_31336 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-gaps-pe",
      title: "No national cancer incidence, and the Lima registry's latest report is for 2013 to 2015",
      plain:
        "Peru has no national count of new cancers: the national registry the 2022 regulation calls for was not found published. The Lima registry's latest report covers 2013 to 2015. The Arequipa registry's own reports, and INEN's online hospital statistics for 2000 to 2019, were not read for this page.",
      detail:
        "The gob.pe page of the Registro de Cáncer de Lima Metropolitana, updated 25 June 2026, lists reports up to 2013 to 2015, and no later volume was found. Articles 35 to 37 of Decreto Supremo 004-2022-SA describe a Registro Nacional del Cáncer with monthly mandatory notification and quarterly publication, but no output from it was found. The Arequipa population-based registry, named by the 2017 Lancet Oncology review, was not reached in its own report, and INEN's hospital statistics system for 2000 to 2019 is an interactive platform that was not queried. National mortality rates are from the Ministry's vital statistics as quoted in its 2025 plan, and WHO rated mortality registration quality low.",
      links: [
        { label: "INEN: the registry's reports (gob.pe)", url: RCLM_PAGE },
        { label: "Decreto Supremo 004-2022-SA (gob.pe)", url: DS_004_2022 },
      ],
    },
    {
      id: "unread-pe",
      title: "Sources not reached, figures not verified",
      plain:
        "DIGEMID's website refused automated requests, so its statement was read from an archived copy. The IAEA's radiotherapy directory would not load without a browser. Whether a regulation for the 2025 medicines law was finally issued was not confirmed, and EsSalud's share of insured people was not found in INEI's 2025 release.",
      detail:
        "digemid.minsa.gob.pe returned 403 to every request; Comunicado 051-2024 was read from the Internet Archive. The IAEA DIRAC directory serves its data through scripts that a plain request does not run, so no machine count from it is given, and the radiotherapy figures are the Ministry's and WHO's. Ley 32319 was read in full, but whether its implementing supreme decree was approved after a draft in 2025 was not verified. Decreto Supremo 004-2022-SA, Plan Esperanza, the 2025 to 2030 plan, the 2025 cervical directive and the oncology medicines list are scanned documents read by OCR. No Peruvian figure for catastrophic spending on cancer, for actual approval times of cancer medicines, or for the mammography interval in the 2025 plan was found. The IREN Norte and IREN Sur pages were not found on gob.pe, so they have no records here.",
      links: [
        { label: "DIGEMID: Comunicado 051-2024 (PDF, Internet Archive copy)", url: DIGEMID_COM_051 },
        { label: "IAEA DIRAC directory of radiotherapy centres", url: "https://dirac.iaea.org" },
        { label: "Ley 32319 (El Peruano)", url: LEY_32319 },
      ],
    },
  ],
  institutions: ["inen-peru", "lima-metropolitan-cancer-registry", "ministry-of-health-peru", "sis-peru", "fissal-peru", "essalud-peru", "digemid-peru", "liga-peruana-contra-el-cancer", "oncosalud-auna", "iarc", "who", "iaea"],
  companies: ["merck", "astrazeneca", "roche-genentech", "bms", "bayer", "amgen", "pfizer"],
  drugs: ["trastuzumab", "abiraterone", "azacitidine", "exemestane", "aprepitant"],
  trials: [
    "keynote-826", "keynote-a18", "calla", "lacc", "innovatv-301", "nct06079671", "toga", "checkmate-649", "keynote-859", "matterhorn",
    "nct06532006", "tmist", "tailorx", "aranote", "talapro-2", "nct06952803", "sharp", "imbrave050", "pacific", "flaura2",
    "katherine", "aphinity", "prima-follicular", "dasision", "keynote-590",
  ],
  papers: ["paper-pineros-cancer-patterns-peru-lancet-oncol-2017", "paper-stenning-persivale-mir-survival-lima-ecancer-2018", "paper-maradiegue-childhood-cancer-peru-gicc-rpsp-2023"],
  people: ["wilder-calmet-berrocal", "francisco-berrospi-espinoza", "giuliana-cardenas-gamarra"],
  how:
    "Every card was written from Peruvian official sources read in Spanish from their raw text: INEN's Lima registry report for 2013 to 2015; Ley 31336 as printed in El Peruano, its regulation Decreto Supremo 004-2022-SA, Plan Esperanza (Decreto Supremo 009-2012-SA), the Plan Nacional Multisectorial para la lucha contra el cáncer 2025 to 2030, the 2025 cervical directive and the 2022 oncology medicines list, all scanned and read by OCR; Ley 32319; DIGEMID's December 2024 statement; the gob.pe pages of FISSAL, the SIS, EsSalud and INEN; INEI's 2025 insurance release; and Agencia Andina's reports of the Ministry's HPV vaccination statements. Spending figures are the World Bank's series from WHO, capacity figures the Ministry's and WHO's, and the three papers were resolved through Europe PMC and their abstracts read. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph.",
  verify:
    "National incidence and deaths are IARC estimates; the population registry figures on this page are Lima's, for 2013 to 2015. Which cancers FISSAL covers and how to claim travel and lodging can change, so check with the SIS or the insurance office of your hospital. Whether a medicine is on the essential list or needs a committee or RENETSA assessment depends on your hospital and insurer; ask your oncologist. Waits for radiotherapy vary by hospital; ask whether another centre in the oncology network can treat you sooner.",
  verifyLinks: [
    { label: "INEN", url: "https://www.gob.pe/inen" },
    { label: "Seguro Integral de Salud (SIS)", url: "https://www.gob.pe/sis" },
    { label: "FISSAL", url: "https://www.gob.pe/fissal" },
    { label: "EsSalud", url: "https://www.gob.pe/essalud" },
    { label: "DIGEMID", url: "https://www.digemid.minsa.gob.pe" },
  ],
};
