import type { CountryDive } from "@/data/country-dive";

/**
 * Spain deep dive: the hand-written cards for /countries/es/. Spanish sources were read in Spanish, from the raw
 * text of each PDF or page (pdftotext or the HTML itself), not from a summary of it: REDECAN's 2026 incidence and
 * 2003-2017 survival reports, INE deaths by cause through its Tempus API (table 7947), the BOE consolidated texts of
 * the Ley de garantías (articles 92, 94 and 102), Real Decreto 1015/2009 and Real Decreto 415/2026, the Ministerio de
 * Sanidad's cancer strategy, CIPM public reports and advanced therapies pages, and the AEMPS's own announcements.
 * Every figure below is quoted from one of those; where a figure could not be read it is named under `gaps`.
 */
const REDECAN_2026 = "https://redecan.org/storage/documents/dc9dc273-8b61-475f-ae4f-88d447dc81fc.pdf";
const REDECAN_SURV = "https://redecan.org/storage/documentation/5b3cde59-a541-45af-aab4-9c29152f1931.pdf";
const INE_7947 = "https://www.ine.es/jaxiT3/Tabla.htm?t=7947";
const LEY_GARANTIAS = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-8343";
const RD_415 = "https://www.boe.es/eli/es/rd/2026/05/27/415/con";
const RD_1015 = "https://www.boe.es/buscar/act.php?id=BOE-A-2009-12002";
const ESTRATEGIA = "https://www.sanidad.gob.es/areas/calidadAsistencial/estrategias/cancer/docs/2026/ESTRATEGIA_EN_CANCER_DEL_SNS.pdf";
const PERFIL_2025 = "https://www.sanidad.gob.es/areas/calidadAsistencial/estrategias/cancer/docs/2026/PERFILES_NACIONALES_DE_CANCER_2025_ESPANA.pdf";
const TERAPIAS = "https://www.sanidad.gob.es/areas/farmacia/infoMedicamentos/terapiasAvanzadas/home.htm";
const PLAN_TA_2025 = "https://www.sanidad.gob.es/areas/farmacia/infoMedicamentos/terapiasAvanzadas/docs/AFTerapiasAvan2025.pdf";
const AEMPS_EC_2025 = "https://www.aemps.gob.es/informa/espana-consolida-su-liderazgo-europeo-en-investigacion-clinica/";
const AEMPS_MEMORIA = "https://www.aemps.gob.es/informa/la-aemps-presenta-los-principales-hitos-de-2025-en-su-memoria-de-actividades/";
const AEMPS_ARI = "https://www.aemps.gob.es/informa/la-aemps-autoriza-el-car-t-ari-0001-del-hospital-clinic-para-pacientes-con-leucemia-linfoblastica-aguda/";
const CIPM = "https://www.sanidad.gob.es/areas/farmacia/precios/comisionInteministerial/home.htm";
const CIPM_INFORMES = "https://www.sanidad.gob.es/areas/farmacia/precios/comisionInteministerial/informesPublicos/home.htm";
const BIFIMED = "https://www.sanidad.gob.es/profesionales/medicamentos.do";

export const ES_DIVE: CountryDive = {
  iso2: "ES",
  iso3: "ESP",
  name: "Spain",
  flag: "🇪🇸",
  asOf: "2026-11-03",
  title: "Cancer in Spain",
  description:
    "Cancer in Spain from Spanish sources: REDECAN's projection of 301,884 new cancers in 2026 and INE's 115,578 deaths from tumours in 2024, five-year survival from the regional registries, a public health service run by the regions in which medicines given or dispensed in hospital carry no co-payment, how the CIPM and the new 2026 health technology assessment decree decide what the system pays for, the AEMPS and its special-situations routes, the hospital-made CAR-T cells the system funds, and the clinical trial count the regulator reports as the European Union's highest.",
  lede:
    "Spain's national cancer counts are projections from the regional registries that cover part of the country, not a count of every case, and they put 2026 at 301,884 new cancers. Its public health service, run by the regions, charges nothing for medicines given or dispensed in hospital, makes and funds two CAR-T cell therapies of its own, and authorised more clinical trials in 2025 than any other EU country by its regulator's count.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Spain is 271,898 new cancers and 115,696 deaths for 2024. IARC labels that all-cancers figure ICD-10 C00-97, and it includes the 9,904 non-melanoma skin cancers IARC estimates separately, which REDECAN leaves out (without them GLOBOCAN's figure is 261,994): REDECAN's 301,884 is a projection for 2026 that excludes non-melanoma skin cancer and, for the bladder only, also counts in situ and uncertain-behaviour tumours; that is one reason REDECAN's bladder figure (23,929) is above GLOBOCAN's (22,322). The two also differ in year, method (both are modelled estimates, from different projections) and standard population: REDECAN quotes world, 1976 European and 2013 European standardised rates, and its world-standard rate for 2026, 276.6 per 100,000, is above GLOBOCAN's 255.0, which itself includes 6.2 per 100,000 of non-melanoma skin cancer that REDECAN's leaves out. INE's count of deaths from all tumours in 2022 was 114,828.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Spain",
      aside: { label: "REDECAN: Estimaciones de la incidencia del cáncer en España, 2026 (PDF)", url: REDECAN_2026 },
      cards: [
        {
          id: "shape",
          title: "301,884 new cancers projected for 2026, with bowel cancer the commonest",
          plain:
            "Spain's cancer registries project 301,884 new cancers in 2026, not counting the common skin cancers: 168,764 in men and 133,120 in women. Bowel cancer is the commonest overall, then breast, lung and prostate. About two in five men and three in ten women will be diagnosed with a cancer by age 80. Tumours caused 115,578 deaths in 2024, about a quarter of all deaths.",
          detail:
            "REDECAN's report, published in January 2026, puts colon and rectum at 44,132 new cases (30,035 colon, 14,097 rectum), female breast at 38,318, lung at 34,908, prostate at 34,833 and urinary bladder at 23,929. In men the commonest are prostate (34,833), colorectal (26,477), lung (23,079) and bladder (19,496); in women breast (38,318), colorectal (17,655), lung (11,829) and uterine body (7,759). By age, 16,432 cases (5.44%) are in people aged 0 to 44, 102,154 (33.84%) at 45 to 64 and 183,298 (60.72%) at 65 and over. The risk of developing a cancer from birth to age 80 is 40.2% for men and 28.5% for women, and to 85 it is 47.9% and 33.3%. On deaths, the report states that in 2024 cancer caused 26.5% of all deaths in Spain, 30.8% in men and 22.1% in women. INE's deaths-by-cause table gives 115,578 deaths from tumours (chapter II, which also counts about 4,000 deaths from benign, in situ, myelodysplastic and uncertain-behaviour tumours) out of 436,118 deaths from all causes in 2024; lung cancer caused 23,297 of them, colon 10,451, rectum and anus 4,178, pancreas 8,392, breast 6,659 and prostate 5,967.",
          links: [
            { label: "REDECAN: Estimaciones de la incidencia del cáncer en España, 2026 (PDF)", url: REDECAN_2026 },
            { label: "INE: defunciones por causas (lista reducida), table 7947", url: INE_7947 },
          ],
        },
        {
          id: "no-national-registry",
          title: "Why Spain's numbers are projections: regional registries, not one national count",
          plain:
            "Spain's national cancer figures are estimates, not a count of every case. Population registries count every cancer in the provinces they cover, and the national figures are projected from them using death statistics from all provinces. The registries behind the survival figures cover about a quarter of the population, so national figures are estimates with stated uncertainty.",
          detail:
            "REDECAN, the Red Española de Registros de Cáncer, was created in November 2010 to bring together Spain's population-based cancer registries and the Spanish childhood tumour registry. Its 2026 incidence estimates use the twelve consolidated registries that cover all ages: Asturias, Gran Canaria and Tenerife, Castellón, the province of Salamanca, Euskadi, Girona, Granada, La Rioja, the island of Mallorca, Murcia, Navarra and Tarragona, combined with national INE mortality data up to 2023, and give a 95% interval for every figure: 293,067 to 311,416 for the 2026 total. The report includes all invasive cancers except non-melanoma skin cancer, and for bladder also in situ and uncertain-behaviour tumours. It warns that the 2020 estimates were very probably overestimates because the COVID-19 pandemic cut diagnoses, that how the pandemic affected 2021 to 2025 is still not clear, and that its 2026 figures should be read as the incidence there would be if nothing disturbed the health system's ability to diagnose. The survival report's twelve registries cover 25% of the Spanish population.",
          links: [
            { label: "REDECAN: antecedentes", url: "https://redecan.org/es/antecedentes" },
            { label: "REDECAN: Estimaciones de la incidencia del cáncer en España, 2026 (PDF)", url: REDECAN_2026 },
            { label: "REDECAN: Supervivencia de cáncer en población adulta en España, 2003-2017 (PDF)", url: REDECAN_SURV },
          ],
        },
        {
          id: "what-is-changing",
          title: "What is changing: lung cancer rising in women and falling in men",
          plain:
            "Over ten years the registries' estimated cancer rate fell in men and rose in women. The clearest single change is lung cancer: its rate in women has risen by half in a decade while in men it has fallen. Among adults under 50, smoking-related cancers have fallen while some cancers linked to obesity have risen in people under 40.",
          detail:
            "REDECAN's table of rates standardised to the 2013 European population puts all cancers except non-melanoma skin at 730.9 per 100,000 men in 2016 and 677.5 in 2026, and at 418.6 per 100,000 women in 2016 and 437.5 in 2026. Lung cancer in women goes from 26.4 to 40.0 and in men from 110.2 to 93.0; pancreas rises in both sexes (19.6 to 21.2 in men, 14.7 to 16.4 in women) and stomach falls in both (24.2 to 17.8 and 12.1 to 10.3). The report itself notes that oral cavity, pharynx and lung cancer incidence is rising in women and falling in men, and that female breast cancer incidence has risen while its mortality has fallen. A 2026 REDECAN study of 153,599 cancers in adults aged 20 to 49 from fifteen registries, 1993 to 2018, found falls in larynx, lung, bladder and liver cancer in both sexes (annual percent changes of -3.1% to -8.7%), rises in kidney, thyroid and Hodgkin lymphoma in men and pancreas and lymphomas in women, and significant rises in stomach, colon, rectum, breast and cervical cancers in adults under 40.",
          links: [
            { label: "REDECAN 2026, Tabla 7: rates 2016 and 2026 (PDF)", url: REDECAN_2026 },
            { label: "Redondo-Sánchez et al., cancer in young adults in Spain (Eur J Cancer 2026)", url: "https://doi.org/10.1016/j.ejca.2026.116883" },
          ],
        },
        {
          id: "survival",
          title: "Survival: about three in five adults alive five years after diagnosis, and rising",
          plain:
            "Of adults diagnosed with cancer in 2013 to 2017 in the registries' areas, about 57% of men and 65% of women were alive five years later, after allowing for deaths from other causes. Survival rose in fourteen cancer types against five years earlier and fell significantly in none, with the largest gains in acute myeloid leukaemia, myeloma and colon cancer.",
          detail:
            "REDECAN's third survival report, published on 3 December 2025, included 813,661 cancers in people aged over 14 diagnosed from 2003 to 2017, with follow-up to 31 December 2022 at the latest. Age-standardised five-year net survival for those diagnosed in 2013 to 2017 was 57.4% (95% CI 57.1 to 57.8) in men and 65.2% (64.9 to 65.6) in women, and 60.9% for both sexes. In men it ranged from 9.6% for mesothelioma to 94.4% for testicular cancer, and in women from 10.7% for mesothelioma to 93.9% for thyroid cancer. Against 2008 to 2012 it rose significantly in fourteen tumour types, by 1.9 percentage points overall: by more than 5 points for acute myeloid leukaemia (22.6% to 28.9%), multiple myeloma (49.6% to 55.5%) and colon cancer (63.4% to 68.5%), and by 3 to 5 points for oral cavity and pharynx, Hodgkin lymphoma, lung (13.7% to 18.1%), rectum and stomach. The authors attribute the gains to diagnostic and treatment advances, as in the haematological cancers, and to earlier diagnosis, as in colorectal cancer with the spread of screening. These are averages for people diagnosed up to 2017, before many current treatments.",
          links: [
            { label: "REDECAN: Supervivencia de cáncer en población adulta en España, 2003-2017 (PDF)", url: REDECAN_SURV },
            { label: "REDECAN: announcement of the survival report (3 December 2025)", url: "https://redecan.org/es/proyectos/26/redecan-publica-el-informe-supervivencia-de-cancer-en-poblacion-adulta-en-espana-2003-2017" },
          ],
        },
      ],
      tables: [
        {
          id: "redecan-2026",
          title: "New cancers projected for 2026 and deaths in 2024, by site",
          caption: "New cases: REDECAN projection for 2026, both sexes unless stated. Deaths: INE deaths by cause, 2024 (final data), both sexes.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases, 2026 (projected)", numeric: true },
            { key: "deaths", label: "Deaths, 2024", numeric: true },
          ],
          rows: [
            { site: "All cancers except non-melanoma skin (deaths: all tumours, INE chapter II)", cases: 301884, deaths: 115578 },
            { site: "Colon and rectum (deaths: colon plus rectum, rectosigmoid and anus)", cases: 44132, deaths: 14629 },
            { site: "Breast (cases: women only; deaths: both sexes)", cases: 38318, deaths: 6659 },
            { site: "Lung", cases: 34908, deaths: 23297 },
            { site: "Prostate", cases: 34833, deaths: 5967 },
            { site: "Urinary bladder (cases include in situ and uncertain behaviour)", cases: 23929, deaths: 4283 },
            { site: "Pancreas", cases: 10405, deaths: 8392 },
            { site: "Stomach", cases: 7595, deaths: 4747 },
            { site: "Liver (deaths: liver and intrahepatic bile ducts)", cases: 6852, deaths: 5267 },
          ],
          note: "The two columns come from different sources and years and are not a ratio: cases are a modelled projection for 2026 from twelve regional registries, deaths are INE's count of death certificates for 2024. INE's chapter II total includes about 4,000 deaths from benign, in situ, myelodysplastic and uncertain-behaviour tumours.",
          sources: [
            { label: "REDECAN: Estimaciones de la incidencia del cáncer en España, 2026, Tablas 1 to 3 (PDF)", url: REDECAN_2026 },
            { label: "INE: defunciones por causas (lista reducida), table 7947", url: INE_7947 },
          ],
        },
        {
          id: "redecan-survival",
          title: "Five-year net survival of adults, by site, 2008 to 2012 and 2013 to 2017",
          caption: "Age-standardised five-year net survival (%), adults diagnosed in REDECAN registry areas (25% of Spain's population). Both sexes unless stated.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "p1", label: "2008 to 2012 (%)", numeric: true },
            { key: "p2", label: "2013 to 2017 (%)", numeric: true },
          ],
          rows: [
            { site: "All cancers except non-melanoma skin", p1: 59.0, p2: 60.9 },
            { site: "Prostate (men)", p1: 90.9, p2: 90.2 },
            { site: "Breast (women)", p1: 86.5, p2: 87.8 },
            { site: "Melanoma of skin", p1: 86.2, p2: 89.1 },
            { site: "Bladder", p1: 74.3, p2: 75.6 },
            { site: "Colon", p1: 63.4, p2: 68.5 },
            { site: "Rectum", p1: 61.4, p2: 64.6 },
            { site: "Non-Hodgkin lymphoma", p1: 67.6, p2: 68.8 },
            { site: "Multiple myeloma", p1: 49.6, p2: 55.5 },
            { site: "Acute myeloid leukaemia", p1: 22.6, p2: 28.9 },
            { site: "Lung", p1: 13.7, p2: 18.1 },
            { site: "Pancreas", p1: 8.9, p2: 11.1 },
          ],
          note: "Net survival removes deaths from other causes, so it estimates survival from the cancer itself; it is an average across everyone diagnosed in those years, before many current treatments, and says nothing about any one person. Prostate and breast come from the sex-specific tables 5 and 6; the prostate change (-0.7 points) was not statistically significant.",
          sources: [{ label: "REDECAN: Supervivencia de cáncer en población adulta en España, 2003-2017, Tablas 4 to 9 (PDF)", url: REDECAN_SURV }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a tax-funded national health service run by the regions",
      aside: { label: "Ley de garantías, article 102: patient co-payment (BOE)", url: LEY_GARANTIAS },
      cards: [
        {
          id: "sns",
          title: "One national health service, run in practice by the regions",
          plain:
            "Spain's Sistema Nacional de Salud covers residents whatever their residence status, including cancer care. The Ministry of Health plans and regulates nationally, but the regional health services manage care in practice, and the official country profile reports that staff, equipment and cancer medicines differ between regions.",
          detail:
            "The 2025 country cancer profile, prepared by the OECD with the European Commission and published by the Ministerio de Sanidad, describes a system that guarantees all residents, regardless of residence status, access to a wide range of services including cancer care, decentralised so that the Ministry is responsible for national planning and regulation and the regional health authorities manage the practical side. It states that despite universal coverage there are notable disparities between autonomous communities in the resources available for cancer care, in particular staff, equipment and cancer medicines. The law sets the counterweight: article 91 of the Ley de garantías recognises every citizen's right to obtain medicines on equal terms throughout the national health service, and article 92 forbids a region from setting its own special prescribing, dispensing or financing restrictions on a medicine unilaterally; an exception for one or more regions can only be agreed in the Comisión Permanente de Farmacia of the Consejo Interterritorial. Financing and price decisions are national and take effect across Spain on the same date.",
          links: [
            { label: "Perfiles nacionales de cáncer 2025: España (OECD and European Commission, PDF)", url: PERFIL_2025 },
            { label: "Ley de garantías y uso racional de los medicamentos, articles 91 and 92 (BOE)", url: LEY_GARANTIAS },
          ],
        },
        {
          id: "copago",
          title: "What a patient pays: nothing for hospital medicines, a capped share at the pharmacy",
          plain:
            "Medicines given in hospital, or handed out by the hospital pharmacy to take home, carry no charge to the patient. Some cancer medicines taken at home are dispensed that way, fruquintinib for bowel cancer for example. Only medicines collected from a high-street pharmacy on prescription carry a co-payment, set by income, and for chronic treatments it is capped each month.",
          detail:
            "Article 102 of the Ley de garantías, in its text in force since 28 May 2026, says that only outpatient medicines dispensed through community pharmacies on an official prescription are subject to the user's contribution; medicines dispensed by hospital pharmacy services under a hospital dispensing order are not. For community-pharmacy medicines the share is 60% of the retail price for people with taxable income of 100,000 euros or more, 50% from 60,000 to under 100,000, 45% from 18,000 to under 60,000, 40% below that, and 10% for Social Security pensioners. Medicines in the reduced-contribution ATC groups pay 10% with a maximum of 4.98 euros per item. Monthly caps apply: 8.23 euros for working-age people with income under 9,000 euros, 18.52 euros from 9,000 to 18,000 and 61.75 euros from 18,000 to 35,000; for pensioners 8.23, 13.37, 18.52 or 61.75 euros by income band. Anything paid above a cap is refunded by the region at least every six months. People receiving the minimum income, non-contributory pensions or social integration income, among others, are exempt. The CIPM's public report on fruquintinib for colorectal cancer, for example, restricts its dispensing to hospital pharmacy services for outpatients, so a patient collects it from the hospital without a co-payment.",
          links: [
            { label: "Ley de garantías, article 102: aportación de los usuarios (BOE)", url: LEY_GARANTIAS },
            { label: "Informe público: fruquintinib (Fruzaqla), CIPM (PDF)", url: "https://www.sanidad.gob.es/areas/farmacia/precios/comisionInteministerial/informesPublicos/docs/InformePublicoFruzaqla.pdf" },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Spain decides what the health service pays for",
      aside: { label: "Real Decreto 415/2026: evaluación de tecnologías sanitarias (BOE)", url: RD_415 },
      cards: [
        {
          id: "cipm",
          title: "The interministerial pricing commission decides financing and price, on criteria set in law",
          plain:
            "A new medicine is paid for by the health service only after the Ministry of Health issues an explicit decision including it, with a price set by the Comisión Interministerial de Precios de los Medicamentos. The law lists what the commission weighs, including how serious the disease is, how much better the medicine is and its cost-effectiveness. The law names cost-effectiveness but sets no cost-per-year-of-life threshold.",
          detail:
            "Article 92 of the Ley de garantías makes public financing conditional on an express resolution of the Ministry's responsible unit setting the conditions of financing and price, and lists the criteria: severity, duration and sequelae of the disease; the needs of particular groups; the therapeutic and social value of the medicine and its incremental clinical benefit taking cost-effectiveness into account; rationalisation of public spending and budget impact; cheaper alternatives; and the degree of innovation. Article 94 gives the CIPM the power to set financing prices, to consider cost-effectiveness and budget-impact analyses, and to take into account the reports of the advisory committee on pharmaceutical financing. A medicine cannot be marketed in Spain without first being offered to the health service. The Ministry publishes plain-language public reports on financing decisions, listed by therapeutic group. The fruquintinib report shows the timing for one medicine: European authorisation on 20 June 2024, a CIPM decision to propose financing on 23 October 2024, publication on 28 April 2025. Financing status for any authorised medicine can be looked up in the Ministry's BIFIMED search tool.",
          links: [
            { label: "Ley de garantías, articles 92 and 94 (BOE)", url: LEY_GARANTIAS },
            { label: "Comisión Interministerial de Precios de los Medicamentos", url: CIPM },
            { label: "CIPM: informes públicos sobre la decisión de financiación", url: CIPM_INFORMES },
            { label: "BIFIMED: financing status of medicines", url: BIFIMED },
          ],
        },
        {
          id: "ipt-to-rd415",
          title: "From therapeutic positioning reports to a new assessment system in 2026",
          plain:
            "Since 2013 Spain has written one therapeutic positioning report per new medicine, shared by the national regulator, the Ministry and the regions. A decree in force since June 2026 is replacing that, in phases, with a formal assessment system with fixed deadlines, separating the scientific assessment from the decision to pay, which stays with the Ministry.",
          detail:
            "The AEMPS states that since 2013 the AEMPS and the Ministry's directorate for the common basic portfolio and pharmacy have produced a single informe de posicionamiento terapéutico, recognisable throughout the national health service, through a network evaluation system whose coordinating group is REvalMed SNS. Real Decreto 415/2026 of 27 May, published in the BOE on 29 May 2026 and in force from 18 June 2026, creates a Sistema para la evaluación de las tecnologías sanitarias with two offices: the AEMPS for medicines and the RedETS network of health technology agencies for everything else. It aligns Spain with the EU regulation on joint clinical assessment, and adds what that regulation leaves to member states: categorisation of the relative effect, economic evaluation and positioning. Article 14 sets 70 days from the start date for the clinical report on a new medicine, and in any case no more than 15 days after the European Commission publishes its joint report where one exists, then 70 days for the non-clinical report, the two allowed to overlap; reassessments get 50 days, and any of these deadlines is extended by 25 days if more evidence is requested. Article 15 states that the assessments are not binding. The decree applies in phases: the first instructions are due within a year, and the previous regime continues until each phase is brought in by resolution.",
          links: [
            { label: "AEMPS: informes de posicionamiento terapéutico", url: "https://www.aemps.gob.es/medicamentos-de-uso-humano/evaluacion-de-tecnologias-sanitarias/informes-de-posicionamiento-terapeutico/" },
            { label: "Real Decreto 415/2026, de 27 de mayo (BOE consolidated text)", url: RD_415 },
          ],
        },
        {
          id: "how-much-is-paid-for",
          title: "How much of what Europe approves Spain pays for",
          plain:
            "In a European comparison of thirteen new breast and lung cancer indications, Spain's public system reimbursed 62%, above the EU average of 59%, and it reimbursed 84% of cancer biosimilars against an EU average of 65%. The Ministry reports that nine in ten cancer medicines it assessed for pricing in 2021 were financed.",
          detail:
            "The 2025 country cancer profile, citing the OECD's 2024 study of access to oncology medicines, sampled thirteen indications of ten new high-benefit breast and lung cancer medicines and nineteen biosimilars of three cancer medicines (bevacizumab, rituximab, trastuzumab) with a valid European authorisation on 26 March 2023, and counted which were on Spain's public reimbursement list on 1 April 2023: 62% of the indications against an EU average of 59% and 47% for Spain's economic peers, and 84% of the biosimilars against 65% and 56%. The same profile reports, citing the Ministerio de Sanidad, that in 2021 nine in ten cancer medicines submitted to national price-setting were financed from public funds, 7.5% more than in 2019. It adds that greater public financing of cancer medicines requires robust health technology assessment, and names the time taken for economic evaluations as one of the challenges. Spain's own published average time from European authorisation to financing for cancer medicines could not be found; it is named under gaps.",
          links: [
            { label: "Perfiles nacionales de cáncer 2025: España, section 5.1 (PDF)", url: PERFIL_2025 },
            { label: "Hofmarcher, Berchet and Dedet, Access to oncology medicines in EU and OECD countries (OECD, 2024)", url: "https://doi.org/10.1787/c263c014-en" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the AEMPS, inside the European system",
      aside: { label: "AEMPS: Memoria de Actividades 2025", url: AEMPS_MEMORIA },
      cards: [
        {
          id: "aemps",
          title: "Most cancer medicines are approved in Brussels; the AEMPS authorises trials and fills the gaps",
          plain:
            "New cancer medicines are almost all approved once for the whole European Union, so the Spanish regulator's main work for patients is elsewhere: authorising clinical trials, keeping supply going, and getting medicines to individual patients when no authorised option exists. In 2025 it authorised 962 trials and handled over 100,000 requests for medicines from abroad.",
          detail:
            "Fruquintinib is a typical case: its public report records a centralised European authorisation of 20 June 2024 by the European Commission after a favourable opinion of the EMA's CHMP, valid in Spain without a separate national approval. The AEMPS's activity report for 2025, announced on 2 June 2026, records 962 clinical trials of human medicines authorised, which it describes as the highest number in the European Union for another year, 1,354 human medicines authorised (8% more than the previous year), 40,776 variations resolved, and 101,150 requests for foreign medicines received and assessed, 98% of them resolved, so that no patient's treatment would be interrupted by a supply problem. Under Real Decreto 415/2026 the AEMPS also becomes the office for the evaluation of medicines in the new national assessment system and represents Spain in the EU's health technology assessment coordination group.",
          links: [
            { label: "AEMPS: Memoria de Actividades 2025 announcement", url: AEMPS_MEMORIA },
            { label: "Informe público: fruquintinib (CIPM, PDF)", url: "https://www.sanidad.gob.es/areas/farmacia/precios/comisionInteministerial/informesPublicos/docs/InformePublicoFruzaqla.pdf" },
            { label: "Real Decreto 415/2026 (BOE)", url: RD_415 },
          ],
        },
        {
          id: "special-situations",
          title: "Three legal routes to a medicine before or outside its approval",
          plain:
            "Spanish law lets a hospital doctor obtain a medicine that is still in trials for a patient with no authorised alternative, use an approved medicine outside its licence with the patient's informed consent, or import a medicine approved in another country but not in Spain. The regulator authorises the first and third case by case.",
          detail:
            "Real Decreto 1015/2009 on medicines in special situations defines three routes. Compassionate use of investigational medicines is use before authorisation in Spain for patients with a chronic, seriously debilitating or life-threatening disease who cannot be treated satisfactorily with an authorised medicine; the medicine must be under a marketing application or in clinical trials, the sponsor must agree to supply it, and the decree confines it to hospitals. The AEMPS can authorise it for one patient or through a temporary authorisation of use for a group. Off-label use is exceptional, limited to situations with no authorised alternative for that patient, and requires the treating doctor to justify it in the clinical record and obtain the patient's informed consent; the AEMPS may issue recommendations. Access to medicines authorised abroad but not in Spain is allowed when no medicine of the same composition is authorised in Spain and no authorised alternative suits the patient, and also for medicines authorised but not marketed in Spain. This route for foreign medicines is behind the 101,150 foreign-medicine requests in 2025.",
          links: [
            { label: "Real Decreto 1015/2009, medicamentos en situaciones especiales (BOE)", url: RD_1015 },
            { label: "AEMPS: acceso a medicamentos en situaciones especiales", url: "https://www.aemps.gob.es/medicamentos-de-uso-humano/acceso-a-medicamentos-en-situaciones-especiales/" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Spain does",
      title: "What Spain does that others do not",
      cards: [
        {
          id: "academic-car-t",
          title: "The public health service makes and pays for its own CAR-T cells",
          plain:
            "In 2021 Spain's regulator authorised a CAR-T cell therapy designed and made by a public hospital, Hospital Clínic de Barcelona, for adults with leukaemia that had come back. The national health service now pays for two of the hospital's CAR-Ts, one for leukaemia and one for myeloma, beside the commercial products, and more than two thousand patients had received CAR-T in the public system by October 2024.",
          detail:
            "The AEMPS announced on 10 February 2021 that it had authorised ARI-0001 (international name varnimcabtagene autoleucel), a CD19 CAR-T developed at Hospital Clínic, as a non-industrially manufactured advanced therapy for patients over 25 with acute lymphoblastic leukaemia resistant to conventional treatment, describing it as the first CAR-T developed entirely in Europe to be approved by a regulator. The route is the hospital exemption in the EU advanced therapy regulation, which limits use to the member state where the product was developed and to a hospital under a doctor's responsibility. The evidence was the CART19-BE-01 trial at Hospital Clínic and Sant Joan de Déu, where 71.1% of patients with acute lymphoblastic leukaemia had a measurable residual disease-negative complete response at day 100. The Ministerio de Sanidad lists ARI-0001 and the BCMA CAR-T ARI0002h as academic CAR-Ts funded by the national health service, beside six industrial ones; its BIFIMED entries, read on 17 November 2026, give the funded use of ARI-0001 as relapsed or refractory B-cell acute lymphoblastic leukaemia in adults over 25 and that of ARI0002h as relapsed and refractory multiple myeloma after at least two earlier lines of treatment. Its 2018 plan for advanced therapies designated the hospitals that may give CAR-T; the 2025 to 2028 plan, approved by the Consejo Interterritorial on 4 July 2025, records that by October 2024 more than two thousand patients had received CAR-T treatments, distributed equitably across the regions, and extends the model to all advanced therapies, including those made under the hospital exemption.",
          links: [
            { label: "AEMPS: authorisation of ARI-0001 (10 February 2021)", url: AEMPS_ARI },
            { label: "Ministerio de Sanidad: terapias avanzadas en el SNS", url: TERAPIAS },
            { label: "BIFIMED: ARI-0001, funded indication", url: "https://www.sanidad.gob.es/profesionales/medicamentos.do?metodo=verDetalle&cn=730288" },
            { label: "BIFIMED: ARI0002h, funded indication", url: "https://www.sanidad.gob.es/profesionales/medicamentos.do?metodo=verDetalle&cn=607821" },
            { label: "Plan 2025-2028 de Terapias Avanzadas en el SNS (PDF)", url: PLAN_TA_2025 },
            { label: "Ortíz-Maldonado et al., CART19-BE-01 (Mol Ther 2021)", url: "https://doi.org/10.1016/j.ymthe.2020.09.027" },
          ],
        },
        {
          id: "trials-hub",
          title: "A clinical trial country: 378 cancer trials authorised in a year",
          plain:
            "Spain's regulator authorised 962 clinical trials of medicines in 2025, which it reports as the most in the EU, and 378 of them were in cancer, about two in five. A quarter were early phase I or I/II trials, the stage where new drugs are first given to patients. For a patient in Spain, asking about a trial is a realistic question.",
          detail:
            "The AEMPS reported on 12 January 2026, from the Spanish clinical studies registry (REec), that it had authorised 962 clinical trials in 2025, 758 of them multinational, and that oncology accounted for 378, close to 40% of those authorised nationally, followed at a distance by immune system conditions at 10.5%, nervous system at 6.9%, cardiovascular at 6.2% and respiratory at 4.4%; 22.5% concerned rare diseases and 40 were trials of advanced therapies. Early-phase trials, phase I and I/II, rose from 156 in 2015 (19% of those authorised) to 244 in 2025 (25%). The agency attributes the volume to a network of close to 1,000 hospital centres involved in clinical research over the last five years, patient recruitment rates among the best in Europe, public-private collaboration, monthly follow-up meetings with research ethics committees and flexible regulation. Among its measures for 2025 it lists widening its accelerated assessment procedure for national early-phase trials. The AEMPS draws these figures from the REec, its public registry of clinical studies.",
          links: [
            { label: "AEMPS: España consolida su liderazgo europeo en investigación clínica (12 January 2026)", url: AEMPS_EC_2025 },
            { label: "REec: Registro Español de estudios clínicos", url: "https://reec.aemps.es/reec/public/web.html" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and the national cancer strategy",
      aside: { label: "Estrategia en Cáncer del SNS, 2021 update (PDF)", url: ESTRATEGIA },
      cards: [
        {
          id: "programmes",
          title: "Three population screening programmes, with bowel screening widened to 74 and breast screening about to follow",
          plain:
            "Spain's health service invites women for breast screening by mammogram every two years and for cervical screening, and invites men and women for a bowel screening stool test every two years. In April 2026 the bowel screening age range was widened from 50 to 69 to 50 to 74, to be phased in by the regions. In October 2026 the health ministers approved a draft order widening breast screening from ages 50 to 69 to ages 45 to 74, to be phased in over six years.",
          detail:
            "The cancer strategy records that breast and cervical screening have been in the national common portfolio since its publication in 2006, and colorectal screening since Orden SSI/2065/2014, which gave the regions five years to start and ten to reach close to full coverage; when the strategy was updated in 2021 all regions ran a faecal occult blood test every two years for men and women aged 50 to 69. Orden SND/356/2026 of 13 April, published in the BOE on 20 April 2026, widened the target population to men and women aged 50 to 74, with the same test every two years; the regions have five years from its entry into force to start the change, and coverage of people aged 70 to 74 is to approach 100% within ten years. In 2017 average coverage was 44% of the eligible population, participation was below 40% in some programmes and above 70% in only two, and 71.1% of people aged 50 to 69 in the 2017 national health survey said they had never had the test. Orden SCB/480/2019 made cervical screening population-based: cytology every three years from 25 to 34, and high-risk HPV testing from 35 to 65. On 23 October 2026 the Consejo Interterritorial approved the draft order adding women aged 45 to 49 and 70 to 74 to breast screening, with mammography every two years; regions have three years from the order's entry into force to start and six for invitation coverage close to 100%, and may begin the new groups at three-year intervals. The 2021 strategy judged that prostate and lung screening did not yet have sufficient evidence to recommend.",
          links: [
            { label: "Estrategia en Cáncer del SNS, 2021 update (PDF)", url: ESTRATEGIA },
            { label: "Ministerio de Sanidad: el Consejo Interterritorial aprueba ampliar el cribado de cáncer de mama a las mujeres de 45 a 74 años (23 October 2026)", url: "https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6990" },
            { label: "La Moncloa: el Consejo Interterritorial aprueba ampliar el cribado de cáncer de mama (23 October 2026)", url: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/sanidad14/paginas/2026/231016-cribado-cancer-mama.aspx" },
            { label: "Orden SND/356/2026: cribado de cáncer colorrectal de 50 a 74 años (BOE)", url: "https://www.boe.es/eli/es/o/2026/04/13/snd356" },
            { label: "Ministerio de Sanidad: cribado de cáncer colorrectal, información general", url: "https://www.sanidad.gob.es/areas/promocionPrevencion/cribado/cribadoCancer/cancerColon/infoGeneral.htm" },
          ],
        },
        {
          id: "strategy",
          title: "The national cancer strategy: a plan approved by the Ministry and the regions together, not a law",
          plain:
            "Spain's cancer strategy is a plan agreed between the Ministry and all the regions in the Consejo Interterritorial, last updated in February 2021. It sets shared priorities for prevention, screening, care and survivorship, and the Ministry has added plans for long-term survivors, psychological care and childhood cancer since.",
          detail:
            "The Estrategia en Cáncer del Sistema Nacional de Salud was first approved in 2006, updated in 2009 and updated again by the Consejo Interterritorial on 24 February 2021. It is part of the national health service's quality plan and works through agreement rather than legislation: the regions, which run the services, commit to its objectives, and progress is monitored through shared indicators such as screening participation. The Ministry's strategy page also publishes related agreements and documents, including recommendations for the care of long-term cancer survivors (2025), an individual survivorship plan for breast cancer (2025), a long-term follow-up plan for survivors of childhood cancer (2026), recommendations to improve psychological care in cancer (2024), an earlier Consejo Interterritorial agreement of 2018 on the model of care for childhood cancer, the Spanish edition of the fifth European Code Against Cancer, and a study of the impact of COVID-19 on cancer prevention and control, which REDECAN cites for a fall of more than 13% in patients undergoing an oncology-related procedure in 2020.",
          links: [
            { label: "Ministerio de Sanidad: Estrategia en Cáncer", url: "https://www.sanidad.gob.es/areas/calidadAsistencial/estrategias/cancer/home.htm" },
            { label: "Estrategia en Cáncer del SNS, 2021 update (PDF)", url: ESTRATEGIA },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Who does the research",
      cards: [
        {
          id: "networks",
          title: "A national research network, cancer centres and independent trial groups",
          plain:
            "Public cancer research in Spain runs through the Instituto de Salud Carlos III, which created the CIBER research networks, including the cancer network CIBERONC in 2017, and through hospital research institutes such as VHIO in Barcelona and the national cancer centre CNIO in Madrid. Much of the country's academic trial work is done by independent groups organised by cancer type.",
          detail:
            "The CIBER consortium describes itself as a public research consortium created on the initiative of the Instituto de Salud Carlos III, dating from 2006, to which cancer was added as a thematic area on 1 January 2017 as CIBERONC; CIBERONC lists programmes in breast and gynaecological cancers and molecular mechanisms of cancer and working modules in liquid biopsy, experimental models, immuno-oncology and bioinformatics. The cooperative groups sponsor trials in their own names: GEICAM and SOLTI work in breast cancer; the Grupo Español de Cáncer de Pulmón, founded in 1991, counts more than 750 specialists across 193 hospitals and ran EURTAC, in which erlotinib gave a median progression-free survival of 9.7 months against 5.2 with chemotherapy in European patients with EGFR-mutated lung cancer; PETHEMA, part of the Spanish Society of Haematology, runs haematology trials including, through its GEM group, myeloma studies. Trials sponsored by the digestive tumours group TTD and the neuroendocrine group GETNE also appear among the trials on this page.",
          links: [
            { label: "CIBER: quiénes somos", url: "https://www.ciberisciii.es/quienes-somos" },
            { label: "CIBERONC", url: "https://www.ciberonc.es/" },
            { label: "GECP: quiénes somos", url: "https://www.gecp.org/quienes-somos/" },
            { label: "Fundación PETHEMA: sobre PETHEMA", url: "https://www.fundacionpethema.es/sobre-pethema" },
          ],
        },
        {
          id: "made-in-spain",
          title: "Cancer medicines developed in Spain",
          plain:
            "The Spanish company PharmaMar developed the cancer medicines trabectedin and lurbinectedin, Laminar Pharmaceuticals in Mallorca is testing LAM561 in brain tumours, and the Hospital Clínic CAR-T now carries an international name, varnimcabtagene autoleucel, and is also made in India by Immuneel Therapeutics as Qartemi.",
          detail:
            "The products listed on this page as discovered or developed in Spain are trabectedin (sarcoma and ovarian cancer) and lurbinectedin (small-cell lung cancer) from PharmaMar, plitidepsin from the same company (which OnCo's record gives as approved in Australia in 2018 for myeloma and refused in the European Union), LAM561 from Laminar Pharmaceuticals in Mallorca, and varnimcabtagene autoleucel, the international non-proprietary name of Hospital Clínic's ARI-0001, which Immuneel Therapeutics makes in Bengaluru as Qartemi. PharmaMar sponsors its own trials of lurbinectedin and of its next molecule PM54, and mAbxience runs comparative trials of proposed pembrolizumab and nivolumab biosimilars; these appear in the trials list. Each product's own page carries its approvals by region; OnCo records an AEMPS authorisation only where a sourced row exists.",
          links: [
            { label: "PharmaMar", url: "https://pharmamar.com" },
            { label: "AEMPS: authorisation of ARI-0001", url: AEMPS_ARI },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "seom",
      title: "SEOM's annual report repeats the REDECAN and INE figures used here",
      plain:
        "The Spanish Society of Medical Oncology's report Las cifras del cáncer en España 2026 is a widely quoted summary of Spain's cancer numbers. It could not be read when this page was written; read on 17 November 2026, it gives the same REDECAN and INE figures this page quotes from those two sources directly.",
      detail:
        "seom.org answered every request on 3 November 2026 with a browser challenge page and no content, and OnCo does not work around such checks. On 17 November 2026 the address www.seom.org answered a plain request and the report's PDF could be read. It gives REDECAN's 2026 estimates (301,884 new cancers; colon and rectum 44,132, breast 38,318, lung 34,908, prostate 34,833, urinary bladder 23,929), INE's final figures for 2024 (436,118 deaths, 115,578 of them from tumours, which it says put tumours ahead of diseases of the circulatory system as the leading cause of death for the first time), and REDECAN's five-year net survival for 2013 to 2017 (57.4% in men, 65.2% in women): the same figures this page takes from REDECAN's PDFs and INE's database. SEOM's press page for the report gives the 2026 total as 301,184; the report itself and REDECAN give 301,884. The report also has a chapter on prevalence, which is not on this page.",
      links: [{ label: "SEOM: Las cifras del cáncer en España 2026 (PDF)", url: "https://www.seom.org/images/Las_Cifras_del_Cancer_en_Espanya_2026.pdf" }, { label: "SEOM: Sociedad Española de Oncología Médica", url: "https://seom.org" }],
    },
    {
      id: "time-to-access",
      title: "No official average time from European approval to financing in Spain",
      plain:
        "How long Spanish patients wait between a cancer medicine's European approval and the health service paying for it is the question patients ask most, and OnCo could not find an official Spanish figure for it. The industry's W.A.I.T. survey publishes one, but the latest edition could not be read from the report itself.",
      detail:
        "The Ministerio de Sanidad publishes each financing decision and its date (the fruquintinib report shows about four months from European authorisation to the CIPM's decision), but OnCo did not find a published average across cancer medicines. The EFPIA Patients W.A.I.T. Indicator, an industry-funded survey run by IQVIA for the European pharmaceutical industry association, reports time to availability by country; the only edition OnCo could download on 3 November 2026 was the 2020 survey, and figures from the 2025 survey seen only in third-party summaries are not quoted here. Real Decreto 415/2026 sets deadlines for assessment, not for the financing decision, and article 15 says the decision is not bound to the assessment in timing or content.",
      links: [{ label: "CIPM: informes públicos sobre la decisión de financiación", url: CIPM_INFORMES }, { label: "Real Decreto 415/2026 (BOE)", url: RD_415 }],
    },
    {
      id: "regional-differences",
      title: "Regional differences in access are named, not measured, here",
      plain:
        "The official country profile says access to staff, equipment and cancer medicines differs between Spain's regions, but OnCo found no published measure of how many weeks or months a medicine takes to reach patients in each region after national financing.",
      detail:
        "Hospital medicines in Spain are bought and introduced by each regional health service and often by each hospital's pharmacy and therapeutics committee, after the national financing decision; the 2025 country cancer profile names notable disparities in resources between autonomous communities but gives no time figure. Regional formulary decisions and protocols are published separately by each region and were not surveyed for this page, so how far each region has got with the bowel screening extension to age 74 is not stated either.",
      links: [{ label: "Perfiles nacionales de cáncer 2025: España (PDF)", url: PERFIL_2025 }],
    },
    {
      id: "unreachable",
      title: "Sources that could not be reached on 3 November 2026",
      plain:
        "Some official sources did not answer when this page was written: the Instituto de Salud Carlos III's website showed a maintenance page (it answered again on 17 November 2026), INE's press release on deaths in 2024 returned a server error, and CIBERONC's directory of research groups loads only in a browser. The figures they hold are not on this page.",
      detail:
        "isciii.es returned a maintenance page on 3 November 2026, so the institute's budget, centres and funding calls are not described; its role is sourced from the CIBER consortium's page, a ClinicalTrials.gov collaborator listing and a paper's funding statement. The site answered a plain request on 17 November 2026: its centres page lists the institute's own centres, among them the Centro Nacional de Epidemiología and the Centro Nacional de Microbiología, but its budget and funding calls were not read for this page. INE's 2024 deaths press release returned HTTP 503, so the death figures were read from the same statistic through INE's public Tempus API (table 7947, final data for 2024). CIBERONC's group directory is filled by script and returned no groups to a plain request, on 3 November and again on 17 November 2026, so the number of CIBERONC groups is not stated. Europe PMC returned server errors and Crossref rate-limited requests, so DOIs for the new records were resolved through PubMed instead. REDECAN publishes no seat or address, so its record is placed at a country centroid. The role of the Organización Nacional de Trasplantes in cell therapy logistics was not researched for this page.",
      links: [{ label: "INE: defunciones por causas (lista reducida), table 7947", url: INE_7947 }, { label: "CIBER: quiénes somos", url: "https://www.ciberisciii.es/quienes-somos" }],
    },
  ],
  institutions: [
    "redecan", "aemps", "isciii", "ciberonc", "cnio", "vall-dhebron", "hospital-clinic-barcelona", "ico-catalonia", "12-de-octubre", "la-paz", "gregorio-maranon",
    "cun-navarra", "clara-campal-oncology-centre", "ivo-valencia", "la-fe-valencia", "incliva-valencia", "hospital-universitario-salamanca", "hospital-del-mar",
    "hospital-de-sant-pau", "clinico-san-carlos", "fundacion-jimenez-diaz", "puerta-de-hierro", "ramon-y-cajal", "la-princesa", "doctor-peset-valencia",
    "virgen-de-la-victoria-malaga", "hospital-sant-joan-de-reus", "aecc",
  ],
  companies: [
    "pharmamar", "geicam", "solti", "gecp", "pethema", "mabxience-research-s-l", "laminar-pharmaceuticals", "cebiotex", "gyala-therapeutics", "iteria-biopharma",
    "grifols", "almirall", "rovi", "batea-oncology", "universal-dx",
  ],
  drugs: ["lurbinectedin", "trabectedin", "plitidepsin", "varnimcabtagene-autoleucel", "lam561"],
  trials: [
    "cart19-be-01", "cartbcma-hcb-01", "geicam-ciboma", "phergain", "sharp", "nct04564157", "nct06431633", "nct04090736", "nct03635021", "nct06207656", "nct05918302",
    "lurbinectedin-basket-sclc", "nct06088290", "nct07644039", "nct00229203", "nct01102426", "nct04250922", "nct04299191", "nct06538857", "nct06986811",
    "nct06687369", "nct07221734",
  ],
  papers: [
    "paper-cart19-be-01-mol-ther-2021", "paper-cartbcma-hcb-01-lancet-oncol-2023", "paper-trias-hospital-exemption-ari-0001-bmt-2022", "paper-redecan-young-adults-ejc-2026",
    "paper-martinez-cibrian-br-j-haematol", "paper-egfr-nsclc-lancet-oncol-2012", "paper-storm-adjuvant-sorafenib-bruix-lancet-oncol-2015", "paper-eln-apl-sanz-blood-2019",
    "paper-paz-ares-caspian-durvalumab-es-sclc-lancet-2019", "paper-garnet-dostarlimab-oaknin-jama-oncol-2020", "paper-schettini-her2-low-features-npj-breast-cancer-2021",
  ],
  people: [
    "julio-delgado", "valentin-ortiz-maldonado", "manel-juan", "josep-tabernero", "luis-paz-ares", "maria-victoria-mateos", "jesus-san-miguel", "miguel-sanz", "jordi-bruix",
    "josep-llovet", "aleix-prat", "ana-oaknin", "cristina-saura", "elena-garralda", "elena-elez", "enriqueta-felip", "ignacio-melero", "bruno-sangro", "andres-cervantes",
    "antonio-gonzalez-martin", "miguel-martin", "javier-cortes", "joaquin-arribas", "pilar-garrido", "eva-ciruelos", "susana-puig", "ramon-salazar-soler",
  ],
  how:
    "Every card was written from Spanish official sources read in Spanish: REDECAN's 2026 incidence estimates and 2003-2017 survival report, INE's deaths by cause (table 7947, final 2024 data, read through INE's public API), the consolidated texts in the BOE of the Ley de garantías, Real Decreto 1015/2009 and Real Decreto 415/2026, the Ministerio de Sanidad's cancer strategy, advanced therapies pages and CIPM public reports, the 2025 country cancer profile it publishes, and the AEMPS's own announcements. Each figure was checked against the raw text of the PDF or page rather than a summary. The entity lists are drawn from OnCo records with Spanish institutions, companies or investigators; the new records added for this page (REDECAN, the AEMPS, the ISCIII, CIBERONC, GECP, PETHEMA, the two academic CAR-T trials, four papers and three people) carry their own sources.",
  verify:
    "Incidence figures are projections with confidence intervals, not counts; deaths are INE's final figures for 2024. Co-payment percentages and caps are those in force since 28 May 2026; the two latest changes were made by royal decree-law in May 2026, and the law lets the Government update the caps by royal decree. The assessment timelines in Real Decreto 415/2026 apply only as each phase is brought in. Before relying on whether a particular medicine is paid for, check BIFIMED and ask the hospital pharmacy, because regional and hospital introduction follows the national decision.",
  verifyLinks: [
    { label: "REDECAN: Estimaciones de la incidencia del cáncer en España, 2026 (PDF)", url: REDECAN_2026 },
    { label: "INE: defunciones por causas, table 7947", url: INE_7947 },
    { label: "BIFIMED: financing status of medicines (Ministerio de Sanidad)", url: BIFIMED },
    { label: "REec: Registro Español de estudios clínicos (AEMPS)", url: "https://reec.aemps.es/reec/public/web.html" },
  ],
};
