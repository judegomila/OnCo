import type { CountryDive } from "@/data/country-dive";

/**
 * Colombia deep dive: the hand-written cards for /countries/co/ (wave 4). Spanish sources were read in Spanish, from
 * the raw text of each PDF or page (pdftotext or the HTML itself), not from a summary of it: the Instituto Nacional de
 * Cancerología's estimates for 2017 to 2021 (its paper in the Revista Colombiana de Cancerología), the Cuenta de Alto
 * Costo's 2025 adult report, 2024 paediatric report and 2014 to 2022 survival report, the Ministry of Health's
 * Resoluciones 2765 de 2025, 1816 de 2026, 1233 de 2026 and 2475 de 2016, Resolución 3280 de 2018 (a scanned PDF,
 * read by OCR and checked against the page image where a number mattered), the laws as published by the Secretaría
 * del Senado, INVIMA's legal compilation for Decretos 677 de 1995, 1782 de 2014 and 433 de 2018, the price
 * commission's Circulares 04 de 2016 and 22 de 2026, and the Defensoría del Pueblo's April 2026 summary of health
 * tutelas. cancer.gov.co answered 403 to every request; where a figure could not be read it is named under `gaps`.
 */
const PARDO_2024 = "https://www.revistacancercol.org/index.php/cancer/article/view/1061/1045";
const CAC_2025 = "https://cuentadealtocosto.org/situacion-del-cancer-en-la-poblacion-adulta-atendida-en-el-sgsss-de-colombia-2025/";
const CAC_SURV = "https://cuentadealtocosto.org/informe-especial-resultados-de-supervivencia-global-en-las-personas-atendidas-en-el-marco-del-sistema-de-salud-colombiano-y-notificadas-a-la-cuenta-de-alto-costo-2014-2022/";
const CAC_PED = "https://cuentadealtocosto.org/situacion-del-cancer-en-la-poblacion-pediatrica-atendida-en-el-sgsss-de-colombia-2024/";
const CAC_ABOUT = "https://cuentadealtocosto.org/quienes-somos/";
const RES_1233 = "https://normograma.com/keralty/compilacion/docs/resolucion_minsaludps_1233_2026.htm";
const RES_1233_PDF = "https://www.cerlatam.com/wp-content//uploads/2026/07/Resolucion-No-1233-de-2026.pdf";
const RES_2765 = "https://www.minsalud.gov.co/Normatividad_Nuevo/Resoluci%C3%B3n%20No%202765%20de%202025.pdf";
const RES_1816 = "https://consultorsalud.com/wp-content/uploads/2026/08/Resolucion-No-1816-de-2026.pdf";
const RES_3280 = "https://www.minsalud.gov.co/Normatividad_Nuevo/Resoluci%C3%B3n%20No.%203280%20de%2020183280.pdf";
const RES_2475 = "https://www.minsalud.gov.co/Normatividad_Nuevo/Resoluci%C3%B3n%202475%20de%202016.pdf";
const C04_2016 = "https://normograma.invima.gov.co/normograma/compilacion/docs/circular_cnpmd_0004_2016.htm";
const C22_2026 = "https://consultorsalud.com/wp-content/uploads/2026/06/022-DE-2026-Por-la-cual-se-incorpora-modifica-y-se-actualiza-el-precio-maximo-de-venta-de-los-medicamentos-sujetos-al-regimen-de-control-directo-de-precios-2.pdf";
const D677 = "https://normograma.invima.gov.co/normograma/compilacion/docs/decreto_0677_1995.htm";
const D1782 = "https://normograma.invima.gov.co/normograma/compilacion/docs/decreto_1782_2014.htm";
const D433 = "https://normograma.invima.gov.co/normograma/compilacion/docs/decreto_0433_2018.htm";
const INVIMA_2025 = "https://www.invima.gov.co/blog/sala-de-prensa-13/el-invima-activa-plan-de-contingencia-para-dar-celeridad-a-tramites-de-medicamentos-268";
const INDUSTRY_2026 = "https://consultorsalud.com/modernizacion-del-invima-afidro-amcham-fifarma/";
const L1384 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1384_2010.html";
const L1388 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1388_2010.html";
const L2026 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_2026_2020.html";
const L2360 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_2360_2024.html";
const L1751 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1751_2015.html";
const L1438_P2 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1438_2011_pr002.html";
const L1753_P1 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1753_2015_pr001.html";
const DEFENSORIA_2026 = "https://consultorsalud.com/wp-content/uploads/2026/04/Informe_De_Tutelas_En-Salud.pdf";
const CALI_METHODS = "https://doi.org/10.25100/cm.v49i1.3853";

export const CO_DIVE: CountryDive = {
  iso2: "CO",
  iso3: "COL",
  name: "Colombia",
  flag: "🇨🇴",
  asOf: "2026-11-04",
  title: "Cancer in Colombia",
  description:
    "Cancer in Colombia from Colombian sources: the national cancer institute's estimate of 101,483 new cancers a year in 2017 to 2021, the insurers' audited cancer cohort of 759,390 people in 2025, the contributory and subsidised regimes and the MIPRES route for medicines outside the benefit plan, the tutela that patients use to claim care, INVIMA's 180 and 30 working-day evaluation rules, value assessment and price ceilings for new medicines, screening rules, the imatinib public interest declaration and the childhood cancer laws.",
  lede:
    "Colombia counts cancer in two ways: its national cancer institute estimates about 101,500 new cancers a year from four city registries and death records, and every health insurer must report each patient it covers to an audited fund, the Cuenta de Alto Costo. Almost everyone is insured through the contributory or the subsidised regime; medicines outside the benefit plan are prescribed through a national system called MIPRES, and patients who are refused care can go to a judge through the tutela.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Colombia is 123,053 new cancers and 55,981 deaths in 2024, including 3,281 non-melanoma skin cancers (119,772 without them), with an age-standardised incidence of 180.75 per 100,000. GLOBOCAN builds Colombia's incidence from subnational registry rates applied to the 2024 population (method 2b) and its deaths from trends in national death rates projected to 2024 (method 1). The national cancer institute's own estimate is lower and older: a mean of 101,483 new cancers a year in 2017 to 2021 (47,393 in men and 54,090 in women), all cancers except skin, with age-standardised rates of 176.6 per 100,000 in men and 177.4 in women. The institute derives its figure from the incidence-to-mortality ratios of four registries (Cali, Bucaramanga, Manizales and Pasto, 2013 to 2017) applied to each department's recorded deaths, so the years, the population and the method all differ. Deaths differ too: the institute counted 44,355 recorded cancer deaths a year in 2017 to 2021, and the Ministry's cancer plan gives 49,795 for 2024 from DANE's vital statistics, against GLOBOCAN's projected 55,981; neither source explains that gap. Both put breast cancer first and prostate second; GLOBOCAN then has colorectum, stomach and thyroid, the same next three as the institute.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Colombia",
      aside: { label: "Pardo-Ramos and Cendales-Duarte, estimates for Colombia 2017-2021 (Rev Colomb Cancerol 2024, PDF, Spanish)", url: PARDO_2024 },
      cards: [
        {
          id: "shape",
          title: "About 101,500 new cancers a year, with prostate cancer first in men and breast cancer in women",
          plain:
            "Colombia's national cancer institute estimates 101,483 new cancers a year in 2017 to 2021. In men the commonest are prostate, stomach and bowel cancer; in women breast cancer, then thyroid, bowel, cervical and stomach cancer. Five cancers, breast, prostate, thyroid, bowel and stomach, make up 47.3% of all new cases.",
          detail:
            "The Instituto Nacional de Cancerología's estimates, published online on 27 December 2024 by Constanza Pardo-Ramos of its epidemiological surveillance group and Ricardo Cendales-Duarte, give mean annual figures for 2017 to 2021: 12,236 breast cancers in women (age-standardised rate 40.2 per 100,000), 12,090 prostate cancers (43.6), 4,694 stomach cancers in men (17.3) and 2,985 in women (9.4), 3,991 bowel cancers in men (14.7) and 4,688 in women (14.6; the text gives 4,668), 6,138 thyroid cancers in women (21.0) and 1,194 in men, and 4,331 cervical cancers (14.8). Recorded deaths averaged 44,355 a year, 21,683 in men and 22,672 in women, with the highest death rates for prostate cancer in men (11.8 per 100,000, the same as stomach cancer in the paper's table) and breast cancer in women (11.4). The highest all-cancer incidence rates were in La Guajira and Risaralda for both sexes, followed by Norte de Santander in men and Huila in women. The Ministry's 2026 cancer plan, quoting the institute's Infocáncer system and DANE's vital statistics, gives an age-standardised cancer death rate falling from 76.6 per 100,000 in 1997 (23,326 deaths) to 66.9 in 2024 (49,795 deaths), and, among the cancers the Ministry prioritises, a rising death rate from bowel cancer and falling ones for breast, prostate, stomach and cervical cancer.",
          links: [
            { label: "Pardo-Ramos and Cendales-Duarte, Rev Colomb Cancerol 2024, tables 2 and text (PDF, Spanish)", url: PARDO_2024 },
            { label: "Resolución 1233 de 2026, Plan Decenal para el Control del Cáncer 2026-2035, section 4.5 (PDF, Spanish)", url: RES_1233_PDF },
          ],
        },
        {
          id: "counting",
          title: "How Colombia counts: four city registries for the national estimate, and an audited insurer cohort",
          plain:
            "Colombia's population-based cancer registries cover cities, not the whole country. The national cancer institute scales up from city registries using death records, and the Cuenta de Alto Costo collects a yearly report from every insurer on every patient with cancer it covers, then audits it. The two give different numbers because they count different things.",
          detail:
            "The institute's paper states that Colombia has seven population-based registries, all covering cities, and that its estimates use the four whose data met the quality standard for Cancer Incidence in Five Continents Volume XII: Cali, Bucaramanga, Manizales and Pasto. A model fitted to their 2013 to 2017 incidence and deaths is applied to each department's recorded deaths for 2017 to 2021, and the national figure is the sum of the departments; the paper puts the quality of mortality data at 96%. The Cali registry has run since 1962. Separately, under Resolución 0247 de 2014 every insurer, special and exception regime and departmental health authority must report to the Cuenta de Alto Costo every person with cancer it attended. Its 2025 report, covering 2 January 2024 to 1 January 2025, audited 806,503 records against clinical notes and counted 69,571 newly reported cases and 759,390 prevalent cases of all ages; it also found 18,925 people reported for the first time who had been diagnosed earlier and had no care recorded in the period, down from 22,186 a year before. The Ministry's 2026 plan sets out to make the population registries the official standard for incidence and survival where they operate. The Cuenta de Alto Costo's report pages asked for a sign-in on 17 November 2026, so its figures here could not be re-read on that date.",
          links: [
            { label: "Pardo-Ramos and Cendales-Duarte, Rev Colomb Cancerol 2024 (PDF, Spanish)", url: PARDO_2024 },
            { label: "García et al., Cali cancer registry methods (Colomb Med 2018)", url: CALI_METHODS },
            { label: "Cuenta de Alto Costo: Situación del cáncer en la población adulta 2025 (Spanish)", url: CAC_2025 },
          ],
        },
        {
          id: "cac-picture",
          title: "What the insurers reported in 2025: about 69,600 new cases and a 51-day median wait from diagnosis to treatment",
          plain:
            "In the year to 1 January 2025 Colombia's insurers reported 69,571 new cancer cases. Breast, prostate and bowel cancer were the commonest. Half of new patients waited 35 days or more from clinical suspicion to a diagnosis, and 51 days or more from diagnosis to the start of treatment.",
          detail:
            "The Cuenta de Alto Costo's 2025 report gives the age-standardised rate of newly reported cases as 108.96 per 100,000, highest in Bogotá (167.37) and lowest in Amazonía-Orinoquía (55.82), and 119.49 in the contributory regime against 75.72 in the subsidised regime. Among newly reported cases, breast cancer was the commonest (9,772), then prostate (7,297) and colon and rectum (4,958); about half of new cases were cancers outside the eleven types prioritised by the Ministry. Of the newly reported cases, 56.38% were women and the median age was 65; 66.55% were in the contributory regime. The cohort recorded 38,262 deaths from any cause. The median time from clinical suspicion to a histology result was 35 days (interquartile range 17 to 69) and from diagnosis to first treatment 51 days (25 to 92); the report names the interval after diagnosis, access to treatment, as the main delay, and its median was 48 days or more in every year from 2020 to 2025. These are cases reported by insurers, not a count of every cancer in the country. The Cuenta de Alto Costo's report pages asked for a sign-in on 17 November 2026, so its figures here could not be re-read on that date.",
          links: [
            { label: "Cuenta de Alto Costo: Situación del cáncer en la población adulta 2025, sections 1.1 to 1.5 (Spanish)", url: CAC_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "inc-estimates-2017-2021",
          title: "Estimated new cancers and recorded deaths a year in Colombia, 2017 to 2021, five main cancers",
          caption: "Mean annual estimated new cases and recorded deaths for the whole country, with age-standardised rates per 100,000 (world standard), from the Instituto Nacional de Cancerología.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "men", label: "Men, new cases a year", numeric: true },
            { key: "women", label: "Women, new cases a year", numeric: true },
            { key: "asrM", label: "Incidence rate, men", numeric: true },
            { key: "asrF", label: "Incidence rate, women", numeric: true },
            { key: "deathsM", label: "Deaths, men", numeric: true },
            { key: "deathsF", label: "Deaths, women", numeric: true },
          ],
          rows: [
            { site: "All cancers except skin", men: 47393, women: 54090, asrM: 176.6, asrF: 177.4, deathsM: 21683, deathsF: 22672 },
            { site: "Breast", men: null, women: 12236, asrM: null, asrF: 40.2, deathsM: null, deathsF: 3557 },
            { site: "Prostate", men: 12090, women: null, asrM: 43.6, asrF: null, deathsM: 3329, deathsF: null },
            { site: "Thyroid", men: 1194, women: 6138, asrM: 4.6, asrF: 21.0, deathsM: 121, deathsF: 300 },
            { site: "Colon and rectum", men: 3991, women: 4688, asrM: 14.7, asrF: 14.6, deathsM: 1973, deathsF: 2202 },
            { site: "Stomach", men: 4694, women: 2985, asrM: 17.3, asrF: 9.4, deathsM: 3227, deathsF: 2079 },
          ],
          note: "Modelled estimates built from four city registries (Cali, Bucaramanga, Manizales and Pasto) and national death records, not a count of every case; deaths are recorded deaths from DANE. The paper's text gives 4,668 bowel cancers in women where its table gives 4,688. Gallbladder cancer and non-Hodgkin lymphoma were not estimated separately because the model did not converge for them.",
          sources: [{ label: "Pardo-Ramos and Cendales-Duarte, Rev Colomb Cancerol 2024, table 2 (PDF, Spanish)", url: PARDO_2024 }],
        },
        {
          id: "cac-survival-2014-2022",
          title: "Five-year overall survival of insured patients diagnosed in 2014 to 2022, by regime",
          caption: "Proportion alive five years after diagnosis (death from any cause, Kaplan-Meier), invasive cancers reported to the Cuenta de Alto Costo, per cent.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "all", label: "All insured", numeric: true },
            { key: "contrib", label: "Contributory regime", numeric: true },
            { key: "subsid", label: "Subsidised regime", numeric: true },
          ],
          rows: [
            { site: "Breast", all: 76.69, contrib: 80.69, subsid: 65.67 },
            { site: "Prostate", all: 75.31, contrib: 79.37, subsid: 60.2 },
            { site: "Cervix (including in situ)", all: 69.64, contrib: 76.88, subsid: 62.85 },
            { site: "Colon and rectum", all: 51.25, contrib: 54.46, subsid: 41.69 },
            { site: "Stomach", all: 25.15, contrib: 27.49, subsid: 20.63 },
            { site: "Lung", all: 15.85, contrib: 17.96, subsid: 10.07 },
          ],
          note: "Overall survival counts deaths from any cause and is not adjusted for age or stage, so it is not net survival and should not be compared directly with registry figures from other countries. The contributory regime covers people in formal employment and their families; the subsidised regime covers people without the means to pay. The report page asked for a sign-in on 17 November 2026, so these figures could not be re-read on that date.",
          sources: [{ label: "Cuenta de Alto Costo: survival report 2014 to 2022, tables 1.2 to 6.2 (Spanish)", url: CAC_SURV }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: two insurance regimes, a benefit plan, and MIPRES for the rest",
      aside: { label: "Resolución 2765 de 2025, benefits paid from the capitation for 2026 (PDF, Spanish)", url: RES_2765 },
      cards: [
        {
          id: "regimes",
          title: "Insurers paid a fixed amount per member, in a contributory and a subsidised regime",
          plain:
            "Almost every Colombian belongs to a health insurer (an EPS). People in formal work and their families are in the contributory regime; people without the means to pay are in the subsidised regime. The state fund ADRES pays each insurer a fixed amount per member, and the insurer must provide the services on the benefit plan through its network.",
          detail:
            "The Cuenta de Alto Costo's 2025 report uses the national affiliation database for June 2024: 51,206,742 affiliates, of whom 28,511,097 were in the contributory regime, 20,558,122 in the subsidised regime, 2,096,836 in exception regimes (such as the police, armed forces, teachers' fund and Ecopetrol) and 40,687 in special regimes, against a DANE population of 52,613,753. Of people newly reported with cancer, 66.55% were contributory and 28.05% subsidised; 25 were uninsured. The capitation payment (Unidad de Pago por Capitación, UPC) is paid in advance to insurers through ADRES, created by article 66 of Ley 1753 de 2015. The Ministry's Resolución 2765 de 2025, dated 30 December 2025, updated the services and technologies funded by the capitation for 2026, describes the capitation as reaching coverage levels above 96%, and requires insurers to guarantee children with cancer, or suspected cancer, effective and continuous access to those services under the childhood cancer laws. Ley Estatutaria 1751 de 2015 made health a fundamental right and bars public health money from paying only for services that meet listed criteria, such as a cosmetic purpose, no scientific evidence of safety or efficacy, no authorisation, experimental status or treatment abroad, and then only after an explicit, public exclusion procedure. The Cuenta de Alto Costo's report pages asked for a sign-in on 17 November 2026, so its figures here could not be re-read on that date.",
          links: [
            { label: "Cuenta de Alto Costo: 2025 report, methods and table 1.3 (Spanish)", url: CAC_2025 },
            { label: "Resolución 2765 de 2025 (PDF, Spanish)", url: RES_2765 },
            { label: "Ley Estatutaria 1751 de 2015, articles 2 and 15 (Spanish)", url: L1751 },
            { label: "Ley 1753 de 2015, article 66 (Spanish)", url: L1753_P1 },
          ],
        },
        {
          id: "mipres",
          title: "MIPRES: how a doctor prescribes a medicine outside the benefit plan",
          plain:
            "A medicine or service not funded by the per-member payment is prescribed online through a national tool called MIPRES. Some items need approval from a hospital panel of professionals within three to five days. The insurer must then tell the patient where to collect it within 24 hours or five days, depending on urgency, and claims the cost from ADRES.",
          detail:
            "Resolución 1816 de 2026, signed on 6 August 2026, governs access, prescription, supply and payment for technologies not funded by the capitation. The treating professional, who must belong to the insurer's network, prescribes through MIPRES on the SISPRO platform, and insurers may not choose which professionals prescribe or restrict their autonomy. Each hospital must have a Junta de Profesionales de la Salud to approve complementary services, nutritional products and explicitly excluded technologies that may exceptionally be prescribed; it must decide within 3 calendar days for prioritised outpatient, emergency or inpatient prescriptions and within 5 for others, and prescriptions for uses on the official list of unlicensed uses need no panel. The insurer must direct the patient to a supplier within 24 hours for prioritised outpatient, hospital, home or emergency care, or 5 calendar days for other outpatient care; for vital medicines not available in Colombia supply may not exceed 45 days after INVIMA's authorisation, and one prescription number covers repeat supplies for up to a year. Where a judge's tutela orders a technology, the insurer enters it in MIPRES and no panel is needed. ADRES verifies and pays insurers' claims for what is not covered by the capitation or the maximum budgets.",
          links: [
            { label: "Resolución 1816 de 2026, articles 5, 17, 25, 30, 34 and 46 (copy hosted by Consultorsalud, PDF, Spanish)", url: RES_1816 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Value and price",
      title: "How Colombia judges the value of a medicine and caps its price",
      aside: { label: "Decreto 433 de 2018, value assessment of new medicines (Spanish)", url: D433 },
      cards: [
        {
          id: "iets-value",
          title: "Every new medicine is graded for therapeutic value against the best treatment used in Colombia",
          plain:
            "Under a 2018 decree, a company asking INVIMA to register a new medicine must also send a comparison with the treatment Colombian doctors use now, and the price it intends to charge. The health technology assessment institute, IETS, grades the medicine into one of six categories of therapeutic value, and the national price commission uses that grade.",
          detail:
            "Ley 1438 de 2011 (article 92) authorised the creation of the Instituto de Evaluación Tecnológica en Salud, a mixed non-profit corporation whose assessments are a reference for defining benefit plans. Ley 1753 de 2015 (article 72) made its assessment, and the price set from it, a requirement for registering medicines the Ministry chooses, to run alongside the INVIMA process. Decreto 433 de 2018 applies this to new medicines: INVIMA sends the applicant's dossier to the IETS within five days, the IETS consults publicly on the question and on its result, and classifies the medicine as significantly more effective (category 1), more effective (2), favourable (3), similar (4) or unfavourable (5) against the comparator, or unclassifiable (6), with the level of uncertainty; it may add cost-effectiveness and budget impact analyses, and for orphan diseases does only the classification and budget impact. The result is published and passed to the price commission. The decree's own final article makes it applicable three months after the IETS manuals and the price commission's method are issued, and not before 5 December 2018. If 180 days pass without a final IETS opinion, the requirement is treated as met, so the assessment cannot hold up registration. OnCo did not find a published cost-effectiveness threshold for Colombia.",
          links: [
            { label: "Decreto 433 de 2018, articles 2.8.12.7 to 2.8.12.16 (Spanish)", url: D433 },
            { label: "Ley 1438 de 2011, article 92 (Spanish)", url: L1438_P2 },
            { label: "Ley 1753 de 2015, article 72 (Spanish)", url: L1753_P1 },
            { label: "IETS: about us (Spanish)", url: "https://iets.org.co/nosotros/sobre-nosotros/" },
          ],
        },
        {
          id: "price-ceilings",
          title: "Price ceilings set from international reference prices, now including several cancer medicines",
          plain:
            "A national commission sets maximum selling prices for medicines it puts under direct price control, using the lowest of an international and a national reference price. In June 2026 it added 33 medicine markets, among them several cancer medicines, and updated 528 already controlled.",
          detail:
            "The Comisión Nacional de Precios de Medicamentos y Dispositivos Médicos regulates medicine prices under article 245 of Ley 100 de 1993 as amended. Its method, in Circular 18 de 2024, groups medicines into markets by active ingredient and dosage form and sets the base price as the minimum of the international reference price and the national reference price. Circular 22 de 2026, dated 19 June 2026, prioritised medicines for orphan diseases, HIV, vital medicines not otherwise available and high-cost medicines; it brought 33 markets and 4 submarkets under direct control for the first time, among them abemaciclib, acalabrutinib, alectinib, atezolizumab, avelumab, cabozantinib, inotuzumab ozogamicin, lenvatinib and regorafenib, revised the ceilings of 22 markets and 10 submarkets including abiraterone, bevacizumab, enzalutamide, lenalidomide and pembrolizumab, and adjusted 528 markets by minus 7.43% for exchange-rate movements. A ceiling is the most that can be charged in the supply chain; it does not decide whether the medicine is funded.",
          links: [
            { label: "Comisión Nacional de Precios: Circular 22 de 2026 (copy hosted by Consultorsalud, PDF, Spanish)", url: C22_2026 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: INVIMA, its reference-country route and its backlog",
      aside: { label: "Decreto 677 de 1995, articles 27 and 28 (INVIMA legal compilation, Spanish)", url: D677 },
      cards: [
        {
          id: "invima-routes",
          title: "180 working days for the evaluation of a new medicine, or 30 if two reference countries have approved it",
          plain:
            "INVIMA registers medicines. A new one first needs a pharmacological evaluation by a specialist committee, which the rules give 180 working days, or 30 when the medicine is registered in at least two of eleven reference countries and rejected in none. Biological medicines, such as antibodies, have three routes of their own. These are legal time limits, not measured approval times.",
          detail:
            "Decreto 677 de 1995 reserves the pharmacological evaluation of a medicine, a judgement on its efficacy, safety, dosage, indications, benefit-risk balance, toxicity and pharmacokinetics, to INVIMA's specialist committee. Article 28 gives the committee 180 working days, with the clock stopped while the applicant answers questions, and its paragraph gives 30 working days, on a summary of the clinical information, when the medicine is registered in at least two reference countries and has not been rejected in any: the United States, Canada, Germany, Switzerland, France, England, Denmark, the Netherlands, Sweden, Japan and Norway. Decreto 1782 de 2014 sets three routes for biological medicines, the full dossier, comparability with a reference biologic, and an abbreviated comparability route for well-characterised ingredients with long clinical experience, all judged to the same standard; INVIMA then has three months after a favourable evaluation to decide on registration, which lasts five years. For a cancer medicine, registration is only the first step: funding depends on the benefit plan or on MIPRES.",
          links: [
            { label: "Decreto 677 de 1995, articles 27 and 28 (Spanish)", url: D677 },
            { label: "Decreto 1782 de 2014, articles 5 to 16 (Spanish)", url: D1782 },
          ],
        },
        {
          id: "invima-backlog",
          title: "A backlog of more than 14,000 procedures in 2025, and industry figures of 29 months for a new registration",
          plain:
            "In March 2025 INVIMA announced a six-month contingency plan to speed up more than 14,000 pending medicine registrations and related procedures. A year later the research-based industry's associations put the backlog at 12,470 and the time to approve a new registration at 29 months in 2025. INVIMA's own measured times were not found.",
          detail:
            "INVIMA announced on 20 March 2025 that Resolución 2025010547 adopted a contingency plan for six months to streamline the issue and modification of sanitary registrations handled by its directorate of medicines and biological products, with meetings with applicants to complete information within legal time limits, checking of foreign certificates such as good manufacturing practice on the issuing authorities' own websites, and a technical committee with the Ministry to monitor it. In March 2026 AFIDRO, FIFARMA and AmCham Colombia presented a roadmap stating that 12,470 procedures were pending, that the approval of new registrations had gone from 22 months in 2024 to 29 months in 2025, that 45% of applications for new cancer molecules were rejected in 2025, and that innovative products could take up to five years to reach Colombia after approval by reference agencies. Those are the associations' own figures, reported by Consultorsalud; OnCo found no INVIMA publication of measured approval times or rejection rates for cancer medicines with which to check them.",
          links: [
            { label: "INVIMA: contingency plan, 20 March 2025 (Spanish)", url: INVIMA_2025 },
            { label: "Consultorsalud: AFIDRO, AmCham and FIFARMA roadmap for INVIMA, 11 March 2026 (Spanish)", url: INDUSTRY_2026 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: HPV testing from 30, mammography from 50, and a stool test or colonoscopy from 50",
      aside: { label: "Resolución 3280 de 2018, health promotion pathway, chapters 9 to 12 (scanned PDF, Spanish)", url: RES_3280 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening by HPV test every five years from 30 to 65, and visual inspection where services are far away",
          plain:
            "Colombian women aged 25 to 29 are screened with a smear test every three years. From 30 to 65 the required test is an HPV test, repeated every five years after a negative result. Women aged 30 to 50 who live in scattered rural areas with poor access can instead have a visual inspection, with treatment by freezing at the same visit.",
          detail:
            "Resolución 3280 de 2018 sets the screening rules of the Ruta Integral de Atención para la Promoción y Mantenimiento de la Salud. For the cervix: cytology at 25 to 29 on a 1-3-3 schedule (every three years after negative results); tests for high-risk human papillomavirus DNA for all women aged 30 to 65 on a 1-5-5 schedule; and visual inspection with acetic acid and Lugol's iodine only for women aged 30 to 50 in dispersed areas with difficult access, on a 1-3-3 schedule, with immediate cryotherapy. Every woman having an HPV test gives a cytology sample at the same visit, read only if the HPV test is positive; after a positive HPV test the woman should be seen within two weeks, and if the triage cytology is also positive she should have colposcopy and biopsy within 30 days. Screening stops at 65 if recent HPV tests were negative. Under 25, screening is by clinical judgement of risk. The Cuenta de Alto Costo's 2025 report counted 4,040 newly reported cervical cancers, 10.30% of new cancers reported in women. The Cuenta de Alto Costo's report pages asked for a sign-in on 17 November 2026, so its figures here could not be re-read on that date.",
          links: [
            { label: "Resolución 3280 de 2018, chapter 9, pages 167 to 171 (scanned PDF, Spanish)", url: RES_3280 },
            { label: "Cuenta de Alto Costo: 2025 report, figure 1.1 (Spanish)", url: CAC_2025 },
          ],
        },
        {
          id: "other-screening",
          title: "Breast, bowel and prostate: mammography every two years from 50 to 69, a stool test every two years from 50 to 75",
          plain:
            "Women from 40 should have a yearly breast examination by a clinician and, from 50 to 69, a mammogram every two years. Men and women aged 50 to 75 are offered a faecal immunochemical stool test every two years, or a colonoscopy every ten years where available. Men aged 50 to 75 are offered a PSA blood test and rectal examination every five years after a discussion of risks and benefits.",
          detail:
            "Resolución 3280 de 2018 sets clinical breast examination every year from age 40 and two-view mammography every two years from 50 to 69, continuing every two years after normal results (BI-RADS 1 and 2) and with active follow-up for BI-RADS 4A to 5. For the colon and rectum, the target population is men and women aged 50 to 75, screened by faecal immunochemical test every two years (three samples on different days) or colonoscopy every ten years when available, with people at higher personal or family risk referred to a separate pathway. Prostate screening is described as opportunistic, for men aged 50 to 75: PSA with a rectal examination by a trained general practitioner every five years, after explaining potential risks and benefits and agreeing the decision; the rectal examination may start from 40 in men with a family history or of Black ethnicity. The PSA result should be available within 15 calendar days. The Cuenta de Alto Costo's 2025 report gives 56.17% of newly reported prostate cancers as diagnosed at a localised stage (0, I or II). OnCo found no national figure for the share of the eligible population screened. The Cuenta de Alto Costo's report pages asked for a sign-in on 17 November 2026, so its figures here could not be re-read on that date.",
          links: [
            { label: "Resolución 3280 de 2018, chapters 10 to 12, pages 172 to 179 (scanned PDF, Spanish)", url: RES_3280 },
            { label: "Cuenta de Alto Costo: 2025 report, discussion (Spanish)", url: CAC_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Colombia does",
      title: "What Colombia does that others do not",
      cards: [
        {
          id: "tutela",
          title: "The tutela: patients go to a judge to get care, and judges agree in three cases out of four",
          plain:
            "Under the 1991 Constitution anyone can file a tutela, a fast claim before a judge, when a fundamental right is violated or threatened, and since 2015 health has been a fundamental right in law. In 2024, 265,173 tutelas invoked the right to health, and judges granted 74.3% of those analysed. Medicines and specialist appointments were among the commonest claims.",
          detail:
            "The Defensoría del Pueblo's April 2026 summary of its report on health tutelas in 2024, built from the Constitutional Court's databases, counts 912,614 tutelas of all kinds filed in 2024, the highest since the action was created in 1991; 265,173 (29.06%) invoked the right to health, 34.08% more than in 2023, and 2,779,815 health tutelas had been filed from 1999 to 2024. The commonest facts invoked were appointments with specialists (71,455), medicines (63,943), transport and travel costs (57,718), hospital care (53,317), comprehensive treatment (47,313) and surgery (44,653). Judges granted 74.3% overall, 83.0% for transport and 82.1% for comprehensive treatment. The report finds neoplasms among the conditions most over-represented in tutelas relative to how often they are treated, and finds the lowest tutela rates in some of the poorest departments, which it reads as exclusion from both care and justice rather than better service. Ley 2360 de 2024 declared people with suspected or diagnosed cancer subjects of special constitutional protection, and Resolución 1816 de 2026 lets an insurer supply what a tutela orders without a hospital panel.",
          links: [
            { label: "Defensoría del Pueblo: executive summary, health tutelas 2024, April 2026 (copy hosted by Consultorsalud, PDF, Spanish)", url: DEFENSORIA_2026 },
            { label: "Constitución Política de 1991, article 86 (Spanish)", url: "http://www.secretariasenado.gov.co/senado/basedoc/constitucion_politica_1991_pr002.html" },
            { label: "Ley 2360 de 2024 (Spanish)", url: L2360 },
            { label: "Ley Estatutaria 1751 de 2015 (Spanish)", url: L1751 },
          ],
        },
        {
          id: "imatinib-public-interest",
          title: "In 2016 the health ministry declared imatinib a matter of public interest to cut its price",
          plain:
            "In June 2016, after patient and access groups asked for it and talks with the patent holder over a voluntary licence failed, Colombia's health minister declared the leukaemia medicine imatinib a matter of public interest. The price commission then set a new maximum price for the brand, Glivec, of 206.42 pesos per milligram in December 2016.",
          detail:
            "Resolución 2475 de 2016, dated 14 June 2016, declared the existence of reasons of public interest for imatinib under chapter 24 of Decreto 1074 de 2015, the procedure that can lead to a compulsory licence, and instead asked the Comisión Nacional de Precios de Medicamentos y Dispositivos Médicos to consider placing Glivec under direct price control using a general method for public interest situations. The request came from Fundación Ifarma, Acción Internacional por la Salud, Misión Salud and the Centro de Información de Medicamentos of the Universidad Nacional; the resolution records that a conciliation with Novartis, holder of patent 29270, over a voluntary licence failed in 2015. The commission adopted a method for medicines declared of public interest in Circular 03 de 2016 and, by Circular 04 de 2016 of 22 December 2016, removed Glivec from its earlier price control and set its maximum selling price at 206.42 pesos per milligram for all presentations. The resolution was confirmed by Resoluciones 4002 and 4148 de 2016.",
          links: [
            { label: "Resolución 2475 de 2016 (PDF, Spanish)", url: RES_2475 },
            { label: "Comisión Nacional de Precios: Circular 04 de 2016 (INVIMA legal compilation, Spanish)", url: C04_2016 },
          ],
        },
        {
          id: "cancer-laws",
          title: "Cancer laws that oblige insurers to authorise a child's care at once and that make cancer a national priority",
          plain:
            "Colombia has a law for children with cancer, from 2010 and strengthened in 2020, under which insurers must authorise every service a child with confirmed cancer needs at once, until treatment ends, with travel, lodging and school support. A 2010 law for adults declared cancer a national priority, and a 2024 amendment gives people with suspected cancer priority for diagnostic tests.",
          detail:
            "Ley 1388 de 2010, for the right to life of children with cancer, covers everyone under 18 with confirmed cancer, certain blood disorders, or a doctor's suspicion of cancer until it is ruled out; from confirmation until treatment ends, insurers must authorise immediately every service the child needs in a specialised childhood cancer unit, outside pathologists must process a biopsy within 7 days, and families are entitled to a hostel (hogar de paso), travel costs and psychosocial and school support. Ley 2026 de 2020, the Ley Jacobo, made this care prioritised and continuous and gave providers of children's cancer care priority in payment. Ley 1384 de 2010, the Ley Sandra Ceballos, covers adult cancer: contracts only with providers that have multidisciplinary functional units led by an oncology specialist, palliative care and rehabilitation, a national cancer network and adult registry coordinated by the Instituto Nacional de Cancerología, and a cancer observatory. Ley 1384 already declared cancer a national priority; Ley 2360 de 2024 amended it to recognise people with suspected or diagnosed cancer as subjects of special constitutional protection and to give people with suspected cancer priority for diagnostic tests. The Cuenta de Alto Costo's 2024 paediatric report counted 13,772 people under 18 with cancer attended and 1,406 newly reported cases; five-year overall survival for children with acute lymphoblastic leukaemia diagnosed in 2014 to 2022 was 70.08%. The Cuenta de Alto Costo's report pages asked for a sign-in on 17 November 2026, so its figures here could not be re-read on that date.",
          links: [
            { label: "Ley 1388 de 2010 (Spanish)", url: L1388 },
            { label: "Ley 2026 de 2020, Ley Jacobo (Spanish)", url: L2026 },
            { label: "Ley 1384 de 2010, Ley Sandra Ceballos (Spanish)", url: L1384 },
            { label: "Cuenta de Alto Costo: paediatric report 2024 (Spanish)", url: CAC_PED },
            { label: "Cuenta de Alto Costo: survival report 2014 to 2022, table 13.2 (Spanish)", url: CAC_SURV },
          ],
        },
        {
          id: "insurer-fund",
          title: "Insurers are required to pool their cancer data in an audited fund that ranks them",
          plain:
            "Colombia's insurers are required to belong to the Cuenta de Alto Costo, which offsets the cost of insurers that carry more high-cost patients and collects a yearly report on every patient with cancer. It checks those reports against medical records and publishes how each regime and insurer performs, which is how the survival gap between regimes is known.",
          detail:
            "The Cuenta de Alto Costo was created by Decreto 2699 de 2007, which obliges the insurers of both regimes to join together to deal with high-cost diseases; it runs as a self-managed fund that offsets uneven concentrations of these patients, and it evaluates and ranks insurers and providers each year on health results. For the 2025 report its audit reviewed 806,503 records, found 5.72% with no evidence supporting the diagnosis, and inactivated 16,815 records whose diagnosis had been ruled out; a committee of clinical experts named by the Asociación Colombiana de Hematología y Oncología reviewed relevant cases. Its survival report for 2014 to 2022 found five-year overall survival lower in the subsidised than in the contributory regime for every cancer it reports by regime, 65.67% against 80.69% for breast cancer and 60.20% against 79.37% for prostate cancer. The Ministry adopted a new ten-year cancer plan, the Plan Decenal para el Control del Cáncer 2026-2035, by Resolución 1233 de 2026, with evaluations in 2028, 2030 and 2035. The Cuenta de Alto Costo's report pages asked for a sign-in on 17 November 2026, so the audit and survival figures here could not be re-read on that date.",
          links: [
            { label: "Cuenta de Alto Costo: who we are (Spanish)", url: CAC_ABOUT },
            { label: "Cuenta de Alto Costo: 2025 report, methods (Spanish)", url: CAC_2025 },
            { label: "Cuenta de Alto Costo: survival report 2014 to 2022 (Spanish)", url: CAC_SURV },
            { label: "Resolución 1233 de 2026 (Spanish)", url: RES_1233 },
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
          id: "trials-in-colombia",
          title: "147 trials in OnCo's records have a site in Colombia, most of them industry phase 3 trials",
          plain:
            "Of the trials in OnCo's records, 147 list a site in Colombia. Most are phase 3 trials run by international companies, with Merck Sharp & Dohme the largest sponsor and lung cancer the commonest disease, then prostate, triple-negative breast and kidney cancer. Several are academic, three of them run by the US SWOG group.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026: 147 trials list Colombia among their countries, 122 of them phase 3, 10 phase 2/3, 9 phase 2 and 6 phase 1/2. ClinicalTrials.gov lists 47 as recruiting, 54 as active and not recruiting, 41 as completed and 5 as terminated. It names Merck Sharp & Dohme as lead sponsor of 64, Bristol-Myers Squibb of 20, Hoffmann-La Roche of 13 and AstraZeneca of 8; non-small cell lung cancer is the first-listed cancer for 21, prostate cancer for 13, and triple-negative breast cancer and kidney cancer for 8 each. Cervical cancer trials with Colombian sites include KEYNOTE-826, KEYNOTE-A18 and the LACC surgical trial. The trials listing the fewest countries include two run by the US SWOG group, a phase 3 trial of treating the primary tumour in metastatic prostate cancer (5 countries) and MAVERICK, on brain scans instead of preventive brain radiation in small cell lung cancer (7), and RxPONDER in breast cancer (10). OnCo's OpenAlex snapshot of 8 September 2026 also records 2,308 ClinicalTrials.gov studies of all conditions with a site in Colombia.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Colombia", url: "https://clinicaltrials.gov/search?locStr=Colombia&country=Colombia&cond=Cancer" },
            { label: "KEYNOTE-826 (NCT03635567)", url: "https://clinicaltrials.gov/study/NCT03635567" },
          ],
        },
        {
          id: "research-output",
          title: "Oncology research output: 283 papers in 2025 with authors based in Colombia",
          plain:
            "OpenAlex counts 283 oncology papers with at least one author based in Colombia in 2025, and 1,386 over the five years from 2021. The national cancer institute in Bogotá runs the country's cancer surveillance, and Cali's population registry has counted cancers in the city since 1962.",
          detail:
            "OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Colombia 304 works in 2021, 261 in 2022, 272 in 2023, 266 in 2024 and 283 in 2025, 1,386 in total, of which 1,087 are open access and 22 highly cited. The Instituto Nacional de Cancerología's epidemiological surveillance group produced the national estimates for 2017 to 2021, and Ley 2291 de 2023 made the institute the technical and scientific authority for cancer control and a reference centre for cancer care and research, according to the Ministry's 2026 cancer plan. The Cuenta de Alto Costo publishes yearly reports and survival analyses with clinical reviewers from the Asociación Colombiana de Hematología y Oncología. The Cali registry's 2018 methods paper reports 88.5% morphological verification and participation in the CONCORD and SURVCAN-3 survival studies.",
          links: [
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "García et al., Cali cancer registry methods (Colomb Med 2018)", url: CALI_METHODS },
            { label: "Resolución 1233 de 2026 (Spanish)", url: RES_1233 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "inc-unreachable",
      title: "The national cancer institute's own site could not be reached",
      plain:
        "cancer.gov.co, the site of the Instituto Nacional de Cancerología, refused every request from OnCo's network, and the Internet Archive's copy also failed. The institute's figures on this page are read from its own published paper and from the Ministry's cancer plan, which quotes its Infocáncer system.",
      detail:
        "Every request to www.cancer.gov.co on 4 November 2026 returned 403, and the Internet Archive answered with a 403 copy and then was temporarily offline. The institute's full tables by department and its Infocáncer mortality figures were therefore not read directly: the 2017 to 2021 estimates come from its epidemiological surveillance group's paper in the Revista Colombiana de Cancerología (December 2024), and the 1997 to 2024 mortality series and the 2024 count of 49,795 deaths from the Plan Decenal para el Control del Cáncer 2026-2035, which cites Infocáncer and DANE. The DOI printed on that paper, 10.35509/01239015.1061, did not resolve at doi.org or Crossref when checked, so the paper is linked through the journal's own site and is not recorded as a paper in OnCo. The Cali registry's own website did not answer either.",
      links: [
        { label: "Instituto Nacional de Cancerología", url: "https://www.cancer.gov.co" },
        { label: "Pardo-Ramos and Cendales-Duarte, Rev Colomb Cancerol 2024 (PDF, Spanish)", url: PARDO_2024 },
      ],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find, from a source it could read, the share of eligible Colombians screened for cervical, breast or bowel cancer, INVIMA's own measured approval times for cancer medicines, a published cost-effectiveness threshold, or how much is spent on cancer medicines through MIPRES.",
      detail:
        "Resolución 3280 de 2018 sets ages and intervals but no coverage figure was found in a national source read for this page; IARC's CanScreen5 fact sheets for Colombia load only through a script and were not read. The approval figure of 29 months and the 45% rejection rate for new cancer molecules are industry associations' figures, and no INVIMA publication of measured times was found to check them against. No cost-effectiveness threshold published by the IETS or the Ministry was found. ADRES's spending on technologies outside the capitation, and the share of it for cancer, were not read. Resolución 3280 de 2018 was read in its 2018 text; later amendments, such as Resolución 0276 de 2019, were not checked line by line for changes to the cancer screening chapters.",
      links: [
        { label: "Resolución 3280 de 2018 (scanned PDF, Spanish)", url: RES_3280 },
        { label: "IARC CanScreen5: Colombia, cervix", url: "https://canscreen5.iarc.fr/factsheets/COL/cervix" },
      ],
    },
    {
      id: "secondary-copies",
      title: "Three official documents were read from copies hosted by a trade publication",
      plain:
        "The MIPRES resolution of August 2026, the price commission's Circular 22 de 2026 and the Defensoría del Pueblo's summary of health tutelas were read from PDF copies hosted by Consultorsalud, a Colombian health-law publication, because no copy on the issuing body's own site was found. Each is a scan or file of the signed document.",
      detail:
        "Resolución 1816 de 2026 is a scan of the signed resolution bearing the Minister's name and date of 6 August 2026; Circular 22 de 2026 is a scan dated 19 June 2026; and the Defensoría del Pueblo's executive summary carries its own masthead and the date April 2026. The Ministry's resolution on the cancer plan was read in the Keralty legal compilation and in a PDF of the Diario Oficial annex hosted by Cerlatam. A reader relying on any of them should check the issuing body's own site, the Ministry of Health, the price commission's secretariat or the Defensoría, for later amendments.",
      links: [
        { label: "Ministry of Health: regulations", url: "https://www.minsalud.gov.co/Normativa/" },
        { label: "Defensoría del Pueblo", url: "https://www.defensoria.gov.co/" },
      ],
    },
  ],
  institutions: ["inc-colombia", "cuenta-de-alto-costo", "minsalud-colombia", "adres-colombia", "invima", "iets-colombia", "registro-poblacional-cancer-cali", "fundacion-valle-del-lili", "liga-colombiana-contra-el-cancer"],
  companies: ["swog", "merck", "bms", "roche-genentech", "novartis"],
  drugs: ["imatinib", "pembrolizumab", "abemaciclib", "alectinib", "atezolizumab", "lenvatinib", "abiraterone", "enzalutamide", "lenalidomide"],
  trials: [
    "keynote-826", "keynote-a18", "lacc", "rxponder", "nct03678025", "nct04155034", "nct06428396", "nct04884360", "prima-follicular", "elevate-tn",
    "keynote-522", "katherine", "aphinity", "impassion130", "checkmate-649", "checkmate-227", "empower-lung-1", "keynote-564", "checkmate-214", "latitude",
    "aramis", "keynote-859", "keynote-590", "cupisco", "nct03407144", "goya", "dasision",
  ],
  papers: ["paper-garcia-cali-cancer-registry-methods-2018"],
  people: ["nubia-munoz", "carolina-wiesner", "vicente-borrero"],
  how:
    "Every card was written from Colombian sources read in Spanish from their raw text: the Instituto Nacional de Cancerología's 2017 to 2021 estimates (its paper in the Revista Colombiana de Cancerología), the Cuenta de Alto Costo's 2025 adult report, 2024 paediatric report and 2014 to 2022 survival report, the laws as published by the Secretaría del Senado, the Ministry of Health's resolutions on the benefit plan, MIPRES, screening, the cancer plan and imatinib, INVIMA's legal compilation for the registration decrees, the price commission's circulars and the Defensoría del Pueblo's summary of health tutelas. Resolución 3280 de 2018 is a scanned document and was read by OCR, with the page image checked where an age mattered. The Cali registry paper was resolved through Europe PMC and its abstract read. The trial count comes from ClinicalTrials.gov participation data in OnCo's graph. The new records for this page are the Cuenta de Alto Costo, the Ministry, ADRES, INVIMA, the IETS, the Cali registry and one paper; the national cancer institute, the hospitals, the cancer league and the people were already in OnCo.",
  verify:
    "Incidence figures are modelled national estimates for 2017 to 2021, not counts, and the Cuenta de Alto Costo's figures are cases reported by insurers. Evaluation times are the limits set in the decrees, not measured times. The benefit plan and the MIPRES rules are set by Ministry resolutions that are replaced from time to time; the ones read here are for 2026. Before relying on whether a cancer medicine is covered, ask the insurer (EPS) whether it is funded by the capitation or must be prescribed through MIPRES, and keep a copy of any refusal in writing.",
  verifyLinks: [
    { label: "Ministry of Health: benefit plan and regulations", url: "https://www.minsalud.gov.co/Normativa/" },
    { label: "Cuenta de Alto Costo: cancer", url: "https://cuentadealtocosto.org/enfermedades-de-alto-costo/cancer/" },
    { label: "INVIMA", url: "https://www.invima.gov.co" },
    { label: "Instituto Nacional de Cancerología", url: "https://www.cancer.gov.co" },
  ],
};
