import type { CountryDive } from "@/data/country-dive";

/**
 * Costa Rica deep dive: the hand-written cards for /countries/cr/ (wave 11). Spanish sources were read in Spanish, and
 * every figure was read from the raw text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN
 * 2024 fact sheet for Costa Rica (PDF text), the Ministry of Health's Plan Nacional para el Control del Cáncer 2024-2030
 * (PDF text, ICCP portal copy), the Registro Nacional de Tumores incidence workbooks for 2017 to 2022 and the Ministry's
 * December 2023 release on them, Ministerial Resolution MS-5917-2024 (PDF text), WHO's list of WHO-listed authorities
 * (PDF text), the CCSS Lista Oficial de Medicamentos (Internet Archive copy of 18 September 2024, because www.ccss.sa.cr
 * did not answer), WHO's HPV coverage, health expenditure and UHC index rows from its public data APIs, IAEA DIRAC's
 * public equipment data, the ClinicalTrials.gov record of NCT03180034, and the papers' abstracts through Europe PMC.
 * Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/188-costa-rica-fact-sheet.pdf";
const PLAN = "https://www.iccp-portal.org/sites/default/files/plans/plan_nacional_control_cancer-compressed_1.pdf";
const PAHO_PLAN = "https://www.paho.org/es/noticias/1-11-2024-ministerio-salud-costa-rica-presento-plan-nacional-para-control-cancer";
const RNT_RELEASE = "https://www.ministeriodesalud.go.cr/index.php/prensa/60-noticias-2023/1739-salud-actualiza-datos-de-tumores-malignos-del-registro-nacional-de-tumores-en-pagina-web";
const RNT_INCIDENCE = "https://www.ministeriodesalud.go.cr/index.php/biblioteca-de-archivos-left/documentos-ministerio-de-salud/material-informativo/material-publicado/estadisticas-y-bases-de-datos/estadisticas-y-bases-de-datos-vigilancia-de-la-salud/estadistica-de-cancer-registro-nacional-tumores/incidencia/incidencia-2017-al-2022";
const MS_5917 = "https://www.ministeriodesalud.go.cr/index.php/biblioteca-de-archivos-left/documentos-ministerio-de-salud/ministerio-de-salud/legislacion-sanitaria/leyes-decretos-y-directrices/resoluciones-ministeriales/8483-ms-5917-2024-resolucion-ministerial-procedimiento-para-la-facilitacion-de-registros-sanitarios-de-medicamentos-que-cuentan-con-un-registro-sanitario-emitido-por-las-autoridades-reguladoras-que-son-parte-de-la-lista-de-autoridades-catalogadas-por-la-organi/file";
const WHO_WLA = "https://www.who.int/publications/m/item/list-of-who-listed-authorities-wlas";
const CCSS_LOM = "https://web.archive.org/web/20240918044342/https://www.ccss.sa.cr/lom";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'CRI'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'CRI'";
const WHO_GGHE_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'CRI'";
const WHO_UHC_API = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'CRI'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const ESCUDDO_CTGOV = "https://clinicaltrials.gov/study/NCT03180034";
const ESCUDDO_DOI = "https://doi.org/10.1056/NEJMoa2506765";
const CVT_DOI = "https://doi.org/10.1016/S1470-2045(20)30524-6";
const PRISMA_DOI = "https://doi.org/10.1016/j.vaccine.2026.129236";
const LOAIZA_PMC = "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6039739/";
const CTGOV = "https://clinicaltrials.gov/search?country=Costa%20Rica&cond=cancer";

export const CR_DIVE: CountryDive = {
  iso2: "CR",
  iso3: "CRI",
  name: "Costa Rica",
  flag: "🇨🇷",
  asOf: "2026-11-11",
  title: "Cancer in Costa Rica",
  description:
    "Cancer in Costa Rica from Costa Rican sources: IARC's estimate of 13,604 new cancers and 6,119 deaths in 2024, a national tumour registry kept since 1976, public care through the CCSS and its official medicines list, a faster registration route for medicines approved by WHO-listed regulators, 12 linear accelerators, and the Guanacaste trials that showed one HPV vaccine dose is enough.",
  lede:
    "Costa Rica has kept a national cancer registry since 1976, and IARC builds its estimate of 13,604 new cancers and 6,119 deaths in 2024 on it, with prostate, breast and colorectal cancer the commonest. Most care is given by the social security fund, the CCSS. In Guanacaste, Costa Rican and US researchers ran the trials that found one dose of HPV vaccine protects as well as two.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Costa Rica is 13,604 new cancers and 6,119 deaths, an age-standardised incidence of 177.6 per 100,000 (182.4 in men, 176.1 in women) and mortality of 72.6. The fact sheet gives a national registry as the incidence source, projected to 2024 from trends in national rates, and WHO's national mortality data for deaths. Of the 13,604, 1,621 are non-melanoma skin cancers (11,983 excluding them). The registry's own counts are lower: 9,415 new malignant tumours for 2022, a preliminary figure that includes skin cancers and is open to late notification. The national cancer plan notes that in Costa Rica only a doctor can certify the cause of death, and about 2% of causes are unidentifiable or badly classified, so death figures are considered reliable.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Costa Rica",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Costa Rica (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 13,600 new cancers a year, with prostate cancer the commonest and stomach cancer a leading cause of death",
          plain:
            "IARC estimates 13,604 new cancers in Costa Rica in 2024, 6,693 in men and 6,911 in women, and 6,119 cancer deaths. Prostate cancer is the commonest cancer, breast cancer the commonest in women, and colorectal and stomach cancer cause the most deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,717 prostate cancers (516 deaths), 1,452 breast cancers (458 deaths), 1,250 colorectal cancers (764 deaths), 1,091 stomach cancers (758 deaths) and 875 thyroid cancers (50 deaths). Thyroid cancer is the second commonest cancer in women, at 747 cases, and stomach cancer the second in men, at 700. Cervical cancer is eleventh, with 347 cases and 172 deaths. The risk of developing a cancer before age 75 is 19.0% for men and 17.3% for women, and an estimated 38,799 people are living within five years of a diagnosis.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Costa Rica (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "national-registry",
          title: "A national tumour registry since 1976, whose recent years are still marked preliminary",
          plain:
            "The Ministry of Health's Registro Nacional de Tumores has collected cancer diagnoses from public and private providers since 1977. In December 2023 it published counts for 2017 to 2022 after a long delay; the figures for 2020 to 2022 are marked preliminary.",
          detail:
            "Executive Decree 6584 of 6 December 1976 created the registry to supply cancer incidence by site, sex, age and area. Since 2013 it has run as a web notification system, SIRNAT, that holds the record from 1977 and codes cases with ICD-10 and ICD-O-3. The Ministry said in December 2023 that the data had fallen seriously behind, and that a tobacco-agreement fund with PAHO paid four medical records staff and a doctor, with two more lent by the research agency ACIB-FUNIN, to bring them up to date. The registry counted 11,545 malignant tumours in 2018 and 9,415 in 2022. The national plan notes that the registry does not record stage, so it cannot show how many cancers are found early.",
          links: [
            { label: "Ministerio de Salud: update of Registro Nacional de Tumores data (15 December 2023)", url: RNT_RELEASE },
            { label: "Registro Nacional de Tumores: incidence 2017 to 2022 (workbooks)", url: RNT_INCIDENCE },
            { label: "Plan Nacional para el Control del Cáncer 2024-2030, section 5.1 (PDF)", url: PLAN },
          ],
        },
        {
          id: "survival",
          title: "Five-year survival above 85% for prostate and breast cancer, below 50% for stomach and lung",
          plain:
            "From the CONCORD-3 study, which used the national registry, the national plan reports five-year survival of 93.2% for prostate cancer, 86.7% for breast cancer and 78% for cervical cancer for people diagnosed from 2010 to 2014. Survival for stomach, pancreas, liver, oesophagus and lung cancer was under 50%.",
          detail:
            "The plan cites Allemani and colleagues' CONCORD-3 analysis of 2018. For children it reports five-year survival of 69.8% for brain tumours, 80% for acute lymphoblastic leukaemia and 93.5% for lymphoma, and an INEC cancer death rate of 1.6 per 100,000 children aged 0 to 14 in 2022. Cervical cancer is the only one of the four cancers the plan tracks whose premature death rate shows a strong fall; it describes colorectal cancer's premature death rate as clearly rising, and breast cancer's averaged 18.55 per 100,000 women in 2018 to 2022 against 17.74 in 2008 to 2012.",
          links: [{ label: "Plan Nacional para el Control del Cáncer 2024-2030, sections 5.1.2 to 5.1.4 (PDF)", url: PLAN }],
        },
      ],
      tables: [
        {
          id: "cr-registry",
          title: "Malignant tumours counted by the Registro Nacional de Tumores, 2017 to 2022",
          caption: "New malignant tumours registered each year, by sex and for three sites. Counts, not estimates. 2020 to 2022 are preliminary.",
          columns: [
            { key: "year", label: "Year" },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "total", label: "Both sexes", numeric: true },
            { key: "breast", label: "Breast (women)", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
          ],
          rows: [
            { year: "2017", men: 5042, women: 5979, total: 11021, breast: 1405, prostate: 959, cervix: 486 },
            { year: "2018", men: 5173, women: 6372, total: 11545, breast: 1571, prostate: 963, cervix: 435 },
            { year: "2019", men: 5042, women: 6121, total: 11163, breast: 1502, prostate: 981, cervix: 441 },
            { year: "2020 (preliminary)", men: 4586, women: 5648, total: 10234, breast: 1429, prostate: 810, cervix: 416 },
            { year: "2021 (preliminary)", men: 4338, women: 5286, total: 9624, breast: 1332, prostate: 810, cervix: 413 },
            { year: "2022 (preliminary)", men: 4286, women: 5129, total: 9415, breast: 1226, prostate: 880, cervix: 370 },
          ],
          note: "Men and women are the registry's own totals; both sexes is their sum. The totals include skin cancers (ICD-O-3 C44), the commonest registered site in men, at 1,103 of 4,286 in 2022. The Ministry says the 2020 to 2022 figures may change with review or late notification, so the fall in recent years may partly be cases not yet registered.",
          sources: [
            { label: "Registro Nacional de Tumores: incidence 2017 to 2022 (workbooks)", url: RNT_INCIDENCE },
            { label: "Ministerio de Salud: update of Registro Nacional de Tumores data (15 December 2023)", url: RNT_RELEASE },
          ],
        },
        {
          id: "cr-top",
          title: "IARC's leading cancers for Costa Rica, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates projected from national registry and mortality trends.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 1717, deaths: 516 },
            { site: "Breast", cases: 1452, deaths: 458 },
            { site: "Colorectum", cases: 1250, deaths: 764 },
            { site: "Stomach", cases: 1091, deaths: 758 },
            { site: "Thyroid", cases: 875, deaths: 50 },
            { site: "Lung", cases: 525, deaths: 400 },
            { site: "Liver", cases: 440, deaths: 403 },
            { site: "All cancers", cases: 13604, deaths: 6119 },
          ],
          note: "All cancers includes 1,621 non-melanoma skin cancers. IARC projects the registry's national rates forward to 2024, which is why its figure is above the registry's latest counts.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Costa Rica (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Plan Nacional para el Control del Cáncer 2024-2030 (PDF)", url: PLAN },
      cards: [
        {
          id: "ccss",
          title: "Public care through the social security fund, with about a quarter of health spending out of pocket",
          plain:
            "The Caja Costarricense de Seguro Social (CCSS) is Costa Rica's public provider of health care. Its primary care teams screen and refer, and its national hospitals diagnose and treat most cancers. WHO puts out-of-pocket spending at 24.1% of what Costa Rica spent on health in 2023.",
          detail:
            "The national cancer plan describes the CCSS network: 1,019 basic primary care teams (EBAIS), 104 health areas with regional and peripheral hospitals, and national and specialised hospitals, each network with a national referral hospital. Haemato-oncology departments in the national hospitals and the Hospital Nacional de Niños work under one model set in 2009. In 2021 multidisciplinary teams saw 4,296 people with cancer, 20.23% of those treated in those departments. WHO's Global Health Expenditure Database gives out-of-pocket spending at 24.1% of current health expenditure in 2023 (22.4% in 2022) and domestic government spending at 67.2%, and WHO's universal health coverage service index for Costa Rica is 84 for 2023.",
          links: [
            { label: "Plan Nacional para el Control del Cáncer 2024-2030, section 5.2.2.2 (PDF)", url: PLAN },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Costa Rica (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share, Costa Rica (API)", url: WHO_GGHE_API },
            { label: "WHO: UHC service coverage index, Costa Rica (API)", url: WHO_UHC_API },
          ],
        },
        {
          id: "medicines-list",
          title: "Cancer medicines come from the CCSS official list",
          plain:
            "The CCSS supplies medicines from its own Lista Oficial de Medicamentos. In the copy archived in September 2024, the group for cancer medicines and immunomodulators had 102 entries, including trastuzumab, palbociclib and osimertinib, each limited to the levels of care allowed to prescribe it.",
          detail:
            "The Internet Archive copy of the CCSS list of 18 September 2024, read because the CCSS site did not answer on 11 November 2026, shows each medicine with its code, therapeutic group, the levels of care that may use it (such as 3A, national and specialised hospitals) and any restriction. Group 41, antineoplastics and immunomodulators, had 102 entries, counting each strength and form separately. They included trastuzumab, trastuzumab emtansine, bevacizumab, rituximab, imatinib, osimertinib, palbociclib and lenalidomide. The list may have changed since; ask the treating hospital's pharmacy what is currently supplied.",
          links: [{ label: "CCSS: Lista Oficial de Medicamentos (Internet Archive, 18 September 2024)", url: CCSS_LOM }],
        },
        {
          id: "courts",
          title: "Patients can take a refused medicine to the constitutional court",
          plain:
            "Costa Rica's constitutional court, the Sala IV, has heard many claims from patients asking for medicines the public system did not provide. In 2014 it began a partnership with the Cochrane Collaboration to bring medical expert evaluations into these decisions, and afterwards fewer rulings granted experimental medicines.",
          detail:
            "A 2018 study in Health and Human Rights describes how the constitutional chamber built a broad right to health that unleashed litigation for medicines, criticised by the health sector as a threat to the finances of the state health system, and how an earlier study found more than 70% of favourable rulings were for low-priority medicines. In 2014 the court began a partnership with the Cochrane Collaboration for medical expert evaluations. Comparing 2016 rulings with 2008, the authors found claimants won more often, while the share of rulings granting experimental medicines fell and the share granting high-priority medicines rose. They call the gain in fairness minor and their conclusion tentative. The study covers all medicines, not only cancer medicines.",
          links: [{ label: "Loaiza et al., health rights litigation in Costa Rica (Health Hum Rights 2018, full text)", url: LOAIZA_PMC }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Resolution MS-5917-2024 (PDF)", url: MS_5917 },
      cards: [
        {
          id: "registration",
          title: "The Ministry of Health registers medicines, with a faster route for those approved by WHO-listed regulators",
          plain:
            "Medicines in Costa Rica are registered by the Ministry of Health under a Central American technical regulation. Under a resolution signed in October 2024, a medicine already registered by a WHO-listed authority, such as the US FDA or the European network, can have its first Costa Rican registration assessed faster.",
          detail:
            "Resolution MS-5917-2024, signed by the minister on 24 October 2024, says the general rule for registering medicines is the Central American technical regulation RTCA 11.03.59:18, with national decrees for biological medicines and bioequivalence, and applications made through the Regístrelo portal. It records a backlog of 999 registration files in October 2024, about 25% of them for medicines registered by an authority on WHO's list. The facilitated route lets the Ministry's Dirección de Regulación de Productos de Interés Sanitario check that the product matches the one the listed authority approved and assess only the requirements that apply. It covers first registrations only, not renewals or later changes, and not homeopathic, radiopharmaceutical or natural products. WHO's list of listed authorities, read on 11 November 2026, does not include Costa Rica's own regulator.",
          links: [
            { label: "Resolution MS-5917-2024 on facilitated medicine registration (PDF)", url: MS_5917 },
            { label: "WHO: list of WHO-listed authorities", url: WHO_WLA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Costa Rica (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination for girls back near 90% after the pandemic, and for boys since 2024",
          plain:
            "WHO's figures for Costa Rica show 98% of girls getting a first HPV dose in 2019, a fall to 57% in 2021, and 92% in 2024 and 89% in 2025. Boys were added to the programme in 2024; WHO records 57% of boys vaccinated in 2025.",
          detail:
            "WHO's coverage rows give last-dose coverage for girls of 96% in 2019, 74% in 2020, 43% in 2021, 72% in 2022, 56% in 2023, 84% in 2024 and 83% in 2025. For boys, first-dose coverage was 23% in 2024 and 57% in 2025, with last-dose coverage of 57% in 2025. The national plan, which counts complete schedules from the Ministry's own data, gives 68.7% coverage of girls in 2022 and a target of 90% by 2030. It describes a two-dose schedule, at month 0 and month 6, for children aged 10, and says the national vaccination commission approved vaccinating boys in February 2024.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Costa Rica (public API)", url: WHO_HPV_API },
            { label: "Plan Nacional para el Control del Cáncer 2024-2030, section 5.2.1 and indicator annex (PDF)", url: PLAN },
            { label: "OnCo: HPV vaccination of boys as well as girls, by country", url: "/terms/hpv-gender-neutral-programmes/" },
          ],
        },
        {
          id: "screening-coverage",
          title: "About a third of women aged 35 to 64 up to date with cervical screening",
          plain:
            "Under the national standard a woman is up to date with cervical screening if she has had a Pap smear in the last 2 years or an HPV test in the last 5. The CCSS found 31% of women aged 35 to 64 up to date with a Pap smear in 2022, and the OECD put the share of women in the screening age group with a mammogram in the last two years at 36% in 2021.",
          detail:
            "The national plan's indicator annex sets the baseline for cervical screening at 31% for women aged 35 to 64 in 2022, counting only Pap smears in CCSS services, and 23% for women aged 20 to 34, from the CCSS evaluation of primary care. The standard is Decree 44261-S. The baseline for mammography is 36% in 2021, from the OECD's Health at a Glance 2023. The plan's targets for 2030 are 53% for cervical screening and 54% for mammography, set at the OECD average. It also plans a national screening register, because screening results are not yet collected in one system.",
          links: [{ label: "Plan Nacional para el Control del Cáncer 2024-2030, indicators IRE2.4.1 and IRE2.4.2 (PDF)", url: PLAN }],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Twelve linear accelerators in five centres, seven of them at Hospital México",
          plain:
            "IAEA's radiotherapy directory lists five centres in Costa Rica with 12 linear accelerators and no cobalt machines. Two public CCSS hospitals in San José hold nine of them: seven at Hospital México and two at Hospital San Juan de Dios. The other three are in private centres.",
          detail:
            "IAEA DIRAC's public equipment data, read on 11 November 2026, lists Hospital México's radiotherapy service in La Uruca (7 linear accelerators and brachytherapy, updated 2025), Hospital San Juan de Dios (2, updated 2024), Centro Médico de Radioterapia Siglo XXI (1, updated 2026), Tecnología Oncológica Costarricense in Santa Ana (1, updated 2025) and the Centro de Radiocirugía Robótica, Centro Internacional del Cáncer (1, last updated 2021). With DIRAC's population figure of about 5.15 million, that is roughly 2.3 machines per million people. The national plan notes that in 2021 the San Juan de Dios service was not operating while a joint radiotherapy centre was built, and that the CCSS has a plan for strengthening radiotherapy for 2020 to 2025.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "Plan Nacional para el Control del Cáncer 2024-2030, table 9 (PDF)", url: PLAN },
          ],
        },
        {
          id: "children",
          title: "Children with cancer are treated at the Hospital Nacional de Niños",
          plain:
            "Children up to age 13 with cancer are treated at the CCSS's national children's hospital. The registry counted 212 cancers in people under 18 in 2022. In 2024 the hospital's haemato-oncology department had 7 paediatric haematologists and 6 paediatric oncologists.",
          detail:
            "The national plan says children aged 0 to 13 with cancer are cared for at the Hospital Nacional de Niños, where the commonest cancers are acute lymphoblastic leukaemia, Hodgkin and other lymphomas and brain tumours, followed by retinoblastoma, Wilms tumour and neuroblastoma. It gives the department's 2024 staff as 7 paediatric haematologists, 6 paediatric oncologists, 2 radiotherapists, 2 general surgeons and 1 surgical oncologist. The plan grew out of a paediatric cancer planning team formed in 2019 with PAHO, and cites WHO's global initiative, which aims for at least 60% survival for children with cancer by 2030; CONCORD-3 put five-year survival from childhood acute lymphoblastic leukaemia in Costa Rica at 80%.",
          links: [{ label: "Plan Nacional para el Control del Cáncer 2024-2030, section 5.1.4 (PDF)", url: PLAN }],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Costa Rica does differently",
      cards: [
        {
          id: "guanacaste-trials",
          title: "The Guanacaste trials that showed one dose of HPV vaccine is enough",
          plain:
            "For two decades Costa Rican researchers at ACIB-FUNIN and the US National Cancer Institute have run HPV vaccine trials in Guanacaste. The ESCUDDO trial of 20,330 girls found one dose of HPV vaccine protected against the main cancer-causing types as well as two.",
          detail:
            "The Costa Rica Vaccine Trial enrolled 7,466 women aged 18 to 25 in 2004 and 2005; at the year 11 visit none of 1,913 vaccinated women had new HPV 16/18 precancer, against 34 of 2,233 unvaccinated women, and efficacy over the whole 11 years was 97.4%. ESCUDDO, sponsored by the NCI with the Gates Foundation and run from ACIB's site in Liberia, randomised girls aged 12 to 16 to one or two doses of the bivalent or nonavalent vaccine; one dose was noninferior to two, with effectiveness of at least 97% in every group (NEJM 2025). The PRISMA trial has enrolled 4,925 women aged 18 to 30 to test a single dose in adults; its authors write that evidence from the Costa Rica trial suggested a single dose may give lasting protection in young adult women. An earlier Guanacaste cohort of 9,406 women followed from 1993 to 2000 was used to train an automated reader of cervical images.",
          links: [
            { label: "Kreimer et al., ESCUDDO (NEJM 2025)", url: ESCUDDO_DOI },
            { label: "ClinicalTrials.gov: ESCUDDO, NCT03180034", url: ESCUDDO_CTGOV },
            { label: "Porras et al., Costa Rica Vaccine Trial at 11 years (Lancet Oncol 2020)", url: CVT_DOI },
            { label: "Romero et al., PRISMA trial design (Vaccine 2026)", url: PRISMA_DOI },
            { label: "OnCo: single-dose HPV vaccination schedules by country", url: "/terms/hpv-single-dose-adoption/" },
          ],
        },
        {
          id: "national-plan",
          title: "A national cancer plan to 2030 aimed at four cancers that kill people too young",
          plain:
            "The Ministry of Health presented its Plan Nacional para el Control del Cáncer 2024-2030 in late 2024. Its headline target is to cut premature deaths from cervical, breast, stomach and colorectal cancer, from 38.38 per 100,000 in 2018 to 2022 to 37.33 in 2025 to 2029.",
          detail:
            "The plan follows national cancer plans from 1998, 2007 to 2016 and 2011 to 2017, and sits under the national strategy for noncommunicable diseases and obesity 2022 to 2030. PAHO says it aims to prevent cancer, promote public health and give timely access to services, through early detection, healthy habits, better access to effective treatment, investment in technology and cooperation between institutions. The premature death target covers ages 30 to 69; the plan describes it as a fall of at least 1.34%, worked out from a straight-line projection of the 2018 to 2022 rate with no new action. Other targets include 90% complete HPV vaccination of girls and boys by 2030, and a modernised registry that records stage. The Consejo Nacional de Cáncer, attached to the minister's office by Executive Decree 33271, advises public and private institutions on cancer care.",
          links: [
            { label: "Plan Nacional para el Control del Cáncer 2024-2030 (PDF, ICCP portal copy)", url: PLAN },
            { label: "PAHO: Costa Rica presents its national cancer control plan (1 November 2024)", url: PAHO_PLAN },
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
          id: "company-trials",
          title: "Costa Rican sites in international cancer drug trials",
          plain:
            "OnCo's ClinicalTrials.gov data list Costa Rican sites in 23 cancer trials, almost all international company trials of medicines for breast, lung, stomach, oesophageal, liver and prostate cancer, such as CLEOPATRA, ToGA, KEYNOTE-859 and IMbrave050.",
          detail:
            "The trials with a Costa Rican site in OnCo's ClinicalTrials.gov participation data include CLEOPATRA (pertuzumab in HER2-positive breast cancer), ToGA (trastuzumab in HER2-positive stomach cancer), KEYNOTE-590 and KEYNOTE-859 (pembrolizumab in oesophageal and stomach cancer), IMbrave050 (adjuvant atezolizumab and bevacizumab in liver cancer), ALEX (alectinib in lung cancer), IMpassion130, IPATunity130, lidERA and KEYNOTE-756 in breast cancer, and newer trials of opevesostat in prostate cancer and V940 with pembrolizumab in lung cancer. The HPV vaccine trials in Guanacaste are prevention trials and are described above. A ClinicalTrials.gov search shows what is recruiting now.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Costa Rica", url: CTGOV },
            { label: "OnCo: CLEOPATRA", url: "/trials/cleopatra/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "coverage-share",
      title: "The share of people insured by the CCSS was not found in a primary source",
      plain:
        "OnCo could not read from an official source what share of Costa Ricans is insured by the CCSS, or how much people pay themselves for cancer care. The CCSS site did not answer on 11 November 2026, so its pages were read from the Internet Archive.",
      detail:
        "WHO's out-of-pocket share and coverage index are shown instead. The CCSS statistics pages and its current medicines list could only be read in archived copies from 2024 and 2025, so the list described here may be out of date. The national survey of households, which asks about insurance, was not read. How long patients wait for cancer surgery, chemotherapy or radiotherapy in CCSS hospitals was not found in a published official source.",
      links: [
        { label: "CCSS: Lista Oficial de Medicamentos (Internet Archive, 18 September 2024)", url: CCSS_LOM },
        { label: "WHO Global Health Expenditure Database: out-of-pocket share, Costa Rica (API)", url: WHO_OOP_API },
      ],
    },
    {
      id: "stage-and-workforce",
      title: "No stage at diagnosis and no full count of cancer specialists",
      plain:
        "Costa Rica's cancer registry does not record how far a cancer had spread when it was found, so the share caught early is unknown. The national plan's table of cancer specialists is an image covering only the CCSS and five private hospitals, and OnCo did not read figures from it.",
      detail:
        "The plan says outright that the country has no data on cancer stage and that this is a gap for surveillance; modernising the registry to record stage is one of its targets. Its workforce table, from a 2022 follow-up to the 2014 IAEA imPACT review, is printed as an image and is described as incomplete, with some specialists working in both sectors. The 2014 imPACT report itself was not found online. Registry incidence after 2022 and an official count of cancer deaths for 2023 or later were not found in a Ministry or INEC publication; press reports of a 2023 figure were not used.",
      links: [
        { label: "Plan Nacional para el Control del Cáncer 2024-2030, sections 5.1 and 5.2.2.2 (PDF)", url: PLAN },
        { label: "Registro Nacional de Tumores: incidence 2017 to 2022 (workbooks)", url: RNT_INCIDENCE },
      ],
    },
    {
      id: "homologation",
      title: "The earlier decree on recognising foreign registrations was not read",
      plain:
        "Before the 2024 resolution, Costa Rica tried a decree recognising medicine registrations from other regulators. OnCo found only press reports about it and its legal challenge, so it is not described here.",
      detail:
        "Press reports describe an executive decree of 2022 on recognising registrations granted by other regulators, and a later challenge before the constitutional court. OnCo did not reach the decree or the ruling in Costa Rica's official legal database, so neither its number, its terms nor the outcome is stated on this page. Whether Costa Rica's regulator has a WHO maturity level from WHO's global benchmarking was not confirmed; it is not on WHO's list of listed authorities.",
      links: [
        { label: "Resolution MS-5917-2024 on facilitated medicine registration (PDF)", url: MS_5917 },
        { label: "WHO: list of WHO-listed authorities", url: WHO_WLA },
      ],
    },
  ],
  institutions: ["costa-rica-ministry-of-health", "ccss-costa-rica", "acib-funin-costa-rica", "nci", "gates-foundation", "who", "iarc", "iaea"],
  companies: ["establishment-labs"],
  drugs: ["hpv-bivalent-vaccine", "gardasil-9"],
  trials: [
    "cleopatra", "toga", "alex", "keynote-590", "keynote-859", "imbrave050", "impassion130", "ipatunity130", "lidera",
    "waveline-003", "nct03725059", "nct03711032", "nct04895722", "nct03800134", "nct06868277", "nct06345729", "nct06077760",
    "nct06136650", "nct06312176", "nct06065748", "nct02320435", "nct05862285", "nct03486873",
  ],
  papers: [
    "paper-kreimer-escuddo-one-dose-hpv-nejm-2025", "paper-porras-costa-rica-vaccine-trial-11-years-lancet-oncol-2020",
    "paper-cortes-primavera-single-dose-hpv-lancet-infect-dis-2025", "paper-hu-j-natl-cancer-inst",
    "paper-loaiza-sala-iv-medicines-litigation-costa-rica-hhr-2018",
  ],
  people: [],
  how:
    "Every card was written from Costa Rican official sources and international agencies, read in full rather than through a summary: the Ministry of Health's national cancer control plan for 2024 to 2030, the Registro Nacional de Tumores incidence workbooks and the Ministry's release on them, Resolution MS-5917-2024, the CCSS official medicines list (an archived copy), WHO's HPV coverage, health expenditure and coverage index rows from its public data APIs, WHO's list of listed authorities, IAEA DIRAC's public equipment data, IARC's GLOBOCAN 2024 fact sheet, and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, the CCSS, ACIB-FUNIN and four papers) carry their own sources.",
  verify:
    "Which medicines the CCSS supplies, which hospital gives radiotherapy and how long the wait is change faster than plans and published reports. Ask the treating CCSS hospital's oncology service or pharmacy what applies to you, and the Ministry of Health about the registration of a medicine.",
  verifyLinks: [
    { label: "Ministerio de Salud", url: "https://www.ministeriodesalud.go.cr/" },
    { label: "Caja Costarricense de Seguro Social", url: "https://www.ccss.sa.cr/" },
    { label: "Registro Nacional de Tumores: incidence data", url: RNT_INCIDENCE },
  ],
};
