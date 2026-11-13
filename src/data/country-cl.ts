import type { CountryDive } from "@/data/country-dive";

/**
 * Chile deep dive: the hand-written cards for /countries/cl/ (wave 5). Spanish sources were read in Spanish, from the
 * raw text of each document, not from a summary of it: Leyes 19.966 (GES), 20.850 (Ricarte Soto), 21.258 (Ley
 * Nacional del Cáncer) and 21.656 (derecho al olvido oncológico), and Decretos 3 de 2010 and 54 de 2019 on medicine
 * registration, all in the XML that the Biblioteca del Congreso Nacional's LeyChile service publishes; the Ministry of
 * Health's Plan Nacional de Cáncer 2022-2027 and Segundo Informe RENCI 2012-2016 (pdftotext); the decree and Norma
 * Técnica N° 242 on population cancer registries (scanned, read by OCR); the Superintendencia de Salud's GES page and
 * its 2025 ISAPRE report; FONASA's Ricarte Soto page; FALP's and the ISP's own pages; IARC's GLOBOCAN 2024 fact sheet;
 * and the World Bank and WHO data APIs. The Ministry's epidemiology site (epi.minsal.cl), which hosts the population
 * registry reports, served a Cloudflare challenge to every request and was not read; see `gaps`.
 */
const GCO_FS = "https://gco.iarc.who.int/media/globocan/factsheets/populations/152-chile-fact-sheet.pdf";
const PLAN = "https://www.minsal.cl/wp-content/uploads/2024/03/Plan-Nacional-de-Cancer-2022-2027.pdf";
const MINSAL_CANCER = "https://www.minsal.cl/informacion-sobre-cancer-y-enfermedades-no-transmisibles/";
const RENCI2 = "https://www.minsal.cl/wp-content/uploads/2022/02/Segundo-Informe-RENCI-2012-2016.pdf";
const NT242 = "https://www.minsal.cl/wp-content/uploads/2024/03/NORMA-TECNICA-N%C2%B0-242-DECRETO-EXENTO-N%C2%B0-28-SSP-2025.pdf";
const EPI = "https://epi.minsal.cl/";
const L21258 = "https://www.bcn.cl/leychile/navegar?idNorma=1149004";
const L21656 = "https://www.bcn.cl/leychile/navegar?idLey=21656";
const L19966 = "https://www.bcn.cl/leychile/navegar?idNorma=229834";
const L20850 = "https://www.bcn.cl/leychile/navegar?idNorma=1078148";
const D3 = "https://www.bcn.cl/leychile/navegar?idNorma=1026879";
const D54 = "https://www.bcn.cl/leychile/navegar?idNorma=1148609";
const GES = "https://www.supersalud.gob.cl/difusion/665/w3-propertyvalue-1962.html";
const SIS_2025 = "https://www.superdesalud.gob.cl/app/uploads/2026/07/4-1-7_analisis-de-isapre-con-perspectiva-de-genero-2025_final-2.pdf";
const LRS = "https://www.fonasa.gob.cl/ley-ricarte-soto/";
const ISP_ABOUT = "https://www.ispch.gob.cl/quienes-somos/";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=CL";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=CL";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'CHL'";
const CANSCREEN = "https://canscreen5.iarc.fr/factsheets/CHL/cervix";
const VARGAS_2026 = "https://doi.org/10.1016/j.jcpo.2026.100799";
const SAMANIEGO_2024 = "https://doi.org/10.4067/s0034-98872024001001028";
const MARDONES_2019 = "https://doi.org/10.4067/s0034-98872019000700860";
const FALP_HIST = "https://www.falp.org/fundacion/historia-de-falp/";
const FALP_CONV = "https://www.falp.org/convenio-oncologico/beneficios-de-convenio-oncologico-falp/";
const CTGOV = "https://clinicaltrials.gov/search?locStr=Chile&country=Chile&cond=Cancer";

export const CL_DIVE: CountryDive = {
  iso2: "CL",
  iso3: "CHL",
  name: "Chile",
  flag: "🇨🇱",
  asOf: "2026-11-11",
  title: "Cancer in Chile",
  description:
    "Cancer in Chile from Chilean sources: GLOBOCAN's 59,887 new cancers and 31,498 deaths for 2024 against the regional registries' own rates, the GES guarantees that list 17 cancers with maximum waiting times and no copayment for FONASA members, the Ley Ricarte Soto for high-cost treatment, the 2020 Ley Nacional del Cáncer and its right to be forgotten, the ISP's three-month route for medicines approved by stringent regulators, screening coverage, the national childhood cancer registry and the preventive gallbladder surgery guarantee.",
  lede:
    "Chile writes its cancer care into law: a list of guaranteed health problems (GES) gives every insured person, public or private, a maximum waiting time and capped costs for 17 cancers, a separate law pays in full for certain high-cost treatments, and the 2020 Ley Nacional del Cáncer made cancer a notifiable disease and promised a national registry. Until that registry exists, adult cancer is counted by a handful of regional registries, and children's cancer by a national registry run since 2006.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Chile is 59,887 new cancers and 31,498 deaths in 2024, including 1,913 non-melanoma skin cancers (57,974 without them), with an age-standardised incidence of 161.9 per 100,000 and mortality of 83.3. IARC's fact sheet records no country-specific incidence data for Chile: its incidence is modelled from national mortality using mortality-to-incidence ratios from registry survival data (method 3c), and its deaths are national death-rate trends projected to 2024 (method 1). Chile's own figures are older and differently built. The Ministry's second national surveillance report, as quoted in its 2022 cancer plan, used the population registries of Antofagasta, Los Ríos and the provinces of Biobío and Concepción for 2003 to 2010 and gave age-standardised incidence, without non-melanoma skin cancer, of 292.2 per 100,000 in men and 232.8 in women, projecting 271.2 and 232.1 for 2018; GLOBOCAN's 2024 rates are 181.0 and 148.2, but GLOBOCAN standardises to the world population and the plan does not say which standard the national report used, so the two cannot be compared directly. Deaths are closer: the plan reports 28,492 deaths from tumours, malignant and benign, in 2019. GLOBOCAN puts prostate cancer first by cases, as the plan did quoting GLOBOCAN 2020; it then has colorectum (7,965), stomach (5,494) and breast (5,141), and puts gallbladder cancer at 2,068 cases and 1,156 deaths.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Chile",
      aside: { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 1.2.8 (PDF, Spanish)", url: PLAN },
      cards: [
        {
          id: "shape",
          title: "Cancer is the first cause of death in Chile, with stomach, lung and gallbladder cancer weighing heavily",
          plain:
            "The Ministry of Health's 2022 cancer plan states that tumours became the first cause of death in Chile, ahead of heart and circulatory disease. Stomach cancer kills the most men and breast cancer the most women; gallbladder cancer is the fourth cancer killer of women.",
          detail:
            "The plan, quoting the Ministry's epidemiology department and DEIS death statistics, counts 28,492 deaths from tumours (malignant and benign) in 2019, 25.98% of all deaths, against 28,079 from circulatory disease (25.6%). The age-standardised death rate from malignant tumours fell from 117.3 per 100,000 in 2009 to 100.1 in 2018. For 2009 to 2018 the highest cancer death rates in men were stomach (22.8 per 100,000), prostate (21.1), lung (18.6) and colon (8.0); in women breast (11.8), lung (9.1), stomach (8.2) and gallbladder (7.7). By region, Antofagasta, Aysén and Magallanes had the highest all-cancer death rates (138.0, 124.1 and 120.8 per 100,000); Antofagasta had the highest for lung cancer, Aysén for stomach and colon, and Los Ríos for gallbladder; elsewhere the plan notes that lung cancer incidence is highest in the north, probably linked to environmental factors such as arsenic exposure. Cancer caused 15.3% of disability-adjusted life years lost in 2019, the largest share of any cause in the plan's figures.",
          links: [
            { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, sections 1.2.3 and 1.2.8 (PDF, Spanish)", url: PLAN },
          ],
        },
        {
          id: "counting",
          title: "How Chile counts: regional population registries for adults, a national registry for children",
          plain:
            "Chile has no national registry for adult cancer yet. The 2020 cancer law made cancer notifiable and ordered one, but adult incidence still comes from regional population registries in a few regions and provinces. Cancer in children under 15 has been registered nationally since 2006.",
          detail:
            "Norma Técnica N° 242, the Ministry's 2025 rules for population cancer registries, states that the first registries were those of Los Ríos and Antofagasta in 1998, that the province of Biobío joined in 2003 and the province of Concepción in 2006, that Arica y Parinacota (2011) and Maule (2012) were admitted to the International Association of Cancer Registries in 2021, and that the province of Arauco was added more recently. The regional health authorities (SEREMI) run them. Hospital-based registries were started in 2011 in large public hospitals, beginning with the Metropolitan Region, which holds 41% of the population. Article 8 of Ley 21.258 makes cancer a notifiable disease under article 49 of the Código Sanitario and gives the Subsecretaría de Redes Asistenciales the task of developing a Registro Nacional de Cáncer under a regulation; the population cancer registries were created by Decreto Exento N° 05 of 23 January 2002, according to the norm. The Registro Nacional de Cáncer Infantil, run by the epidemiology department since 2006, describes itself in its 2021 report as the only cancer registry of national scope in the country.",
          links: [
            { label: "Ministry of Health: Norma Técnica N° 242 and approving decree (scanned PDF, read by OCR, Spanish)", url: NT242 },
            { label: "Ley 21.258, article 8 (LeyChile, Spanish)", url: L21258 },
            { label: "Ministry of Health: Segundo Informe RENCI 2012-2016 (PDF, Spanish)", url: RENCI2 },
          ],
        },
        {
          id: "children",
          title: "About 517 children a year diagnosed with cancer, and 73.5% alive five years later",
          plain:
            "Chile's national childhood cancer registry counted 2,584 new cancers in children under 15 in 2012 to 2016, about 517 a year. Leukaemia was the commonest, followed by brain and spinal tumours. Almost three in four children were alive five years after diagnosis.",
          detail:
            "The second RENCI report, dated November 2021, gives an incidence of 139.4 per million children under 15 in 2012 to 2016, up from 128.2 in 2007 to 2011 (a mean of 480.8 cases a year then). Leukaemias, myeloproliferative and myelodysplastic diseases were 1,090 cases (42.2%, 58.8 per million), central nervous system tumours 440 (17.0%), lymphomas 228 (8.8%), bone tumours 158 (6.1%) and soft tissue sarcomas 131 (5.1%). Of 2,578 children analysed, 73.5% survived five years (74.5% of boys, 72.3% of girls, a difference the report finds not significant), against 71.4% in the earlier period; survival was 85.8% for lymphomas, 74.4% for leukaemias, 59.7% for central nervous system tumours and 58.5% for liver tumours. The report states that about 80% of children with cancer in Chile receive free care in state-supported institutions. Cancer in children under 15 is a GES problem, number 14.",
          links: [
            { label: "Ministry of Health: Segundo Informe RENCI 2012-2016, tables 8 and 12 (PDF, Spanish)", url: RENCI2 },
            { label: "Superintendencia de Salud: GES list (Spanish)", url: GES },
          ],
        },
      ],
      tables: [
        {
          id: "rpc-incidence-2003-2010",
          title: "Cancer incidence from Chile's regional population registries, 2003 to 2010, and the projection for 2018",
          caption: "Rates per 100,000, excluding non-melanoma skin cancer, from the Ministry's second national cancer surveillance report as quoted in the Plan Nacional de Cáncer 2022-2027.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
          ],
          rows: [
            { measure: "Crude incidence, 2003 to 2010", men: 259.7, women: 250.9 },
            { measure: "Age-adjusted incidence, 2003 to 2010", men: 292.2, women: 232.8 },
            { measure: "Projected age-adjusted incidence, 2018", men: 271.2, women: 232.1 },
          ],
          note: "Built from the population registries of Antofagasta, Los Ríos and the provinces of Biobío and Concepción, not a national count. The plan also gives a crude rate of 216.9 per 100,000 for both sexes in 2003 to 2007 including non-melanoma skin cancer. The plan does not state the standard population used for the adjusted rates; the report itself, on epi.minsal.cl, could not be read.",
          sources: [{ label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 1.2.8.2 (PDF, Spanish)", url: PLAN }],
        },
        {
          id: "rpc-survival-1998-2012",
          title: "Five-year survival of adults with cancer in four regional registries, diagnosed 1998 to 2012",
          caption: "Observed and relative five-year survival, per cent, people over 15 registered in Antofagasta, Los Ríos, Concepción and Biobío, followed to 2016.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "observed", label: "Observed survival", numeric: true },
            { key: "relative", label: "Relative survival", numeric: true },
          ],
          rows: [
            { site: "All cancers except non-melanoma skin", observed: 38.5, relative: 44.0 },
            { site: "Thyroid", observed: 76.3, relative: 94.1 },
            { site: "Breast", observed: 70.8, relative: 80.8 },
            { site: "Prostate", observed: 63.9, relative: 75.8 },
            { site: "Cervix", observed: 57.7, relative: 62.1 },
            { site: "Ovary", observed: 40.1, relative: 43.6 },
            { site: "Colon", observed: 39.1, relative: 46.5 },
            { site: "Leukaemia", observed: 24.4, relative: 27.9 },
            { site: "Stomach", observed: 14.2, relative: 16.5 },
            { site: "Gallbladder", observed: 10.9, relative: 12.7 },
            { site: "Lung", observed: 5.5, relative: 6.3 },
          ],
          note: "Relative survival divides observed survival by the survival expected in the general population of the same age and sex. The plan's caption gives diagnoses from 1998 to 2012 while the figure's own heading says 2006 to 2012; OnCo could not read the underlying Ministry report to settle which. Four regions and provinces, not the whole country.",
          sources: [{ label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, table 8 and figure 134 (PDF, Spanish)", url: PLAN }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: FONASA and the ISAPREs, guaranteed cancers, and full cover for some high-cost treatments",
      aside: { label: "Superintendencia de Salud: Garantías Explícitas en Salud (Spanish)", url: GES },
      cards: [
        {
          id: "insurers",
          title: "Five in six people are in the public insurer, FONASA; one in eight in a private ISAPRE",
          plain:
            "Workers pay 7% of their taxable income for health insurance, either to the public fund, FONASA, or to a private insurer, an ISAPRE. In December 2025 FONASA covered 85.2% of residents and the ISAPREs 12.5%. Out-of-pocket payments are a large share of health spending.",
          detail:
            "The Superintendencia de Salud's 2025 report on the ISAPRE system counts 17,132,611 FONASA beneficiaries and 2,517,305 ISAPRE beneficiaries in December 2025, out of 20,097,562 residents in the national statistics institute's projection; the remaining 2.2% include the armed forces, which have their own systems. FONASA has one plan financed by the 7% contribution whatever the family size; ISAPRE plans are priced by the risk of each person covered and may require more than 7% (10.1% on average in December 2025), so, the report says, people with higher risk and lower income concentrate in FONASA. The World Bank's series from the WHO Global Health Expenditure Database puts current health spending at 10.2% of GDP in 2023 and 10.5% in 2024, and out-of-pocket payments at 34.6% of current health spending in 2023 and 39.1% in 2024, against 51.6% and 48.5% from government sources.",
          links: [
            { label: "Superintendencia de Salud: Análisis del Sistema Isapre con perspectiva de género 2025, section 1.1 (PDF, Spanish)", url: SIS_2025 },
            { label: "World Bank: out-of-pocket expenditure, Chile", url: WB_OOP },
            { label: "World Bank: current health expenditure, Chile", url: WB_CHE },
          ],
        },
        {
          id: "ges",
          title: "GES: 17 cancers with a guaranteed maximum wait and capped cost, for public and private patients alike",
          plain:
            "A 2004 law obliges both FONASA and the ISAPREs to guarantee care for a list of health problems, now 90, within set waiting times and from approved providers. Seventeen are cancers, with palliative care for advanced cancer as an eighteenth. FONASA members pay nothing for GES care in the public system; ISAPRE members pay up to 20%.",
          detail:
            "Ley 19.966 of 2004 created the Garantías Explícitas en Salud: guarantees of access, of quality (care by a registered or accredited provider), of timeliness (a maximum time, with a second provider named by the insurer and a third by the Superintendencia if the first fails) and of financial protection, a contribution the law set at 20% of a reference price. The Superintendencia de Salud's GES page lists the cancers: cervical (No. 3), breast (8), children under 15 (14), testicular (16), lymphomas (17), gastric (27), prostate (28), primary central nervous system tumours (43), leukaemia (45), colorectal (70), epithelial ovarian (71), bladder (72), osteosarcoma (73), lung (81), thyroid (82), kidney (83) and multiple myeloma (84), most for people aged 15 and over; also pain relief and palliative care for advanced cancer (4), preventive cholecystectomy for gallbladder cancer at ages 35 to 49 (26), Helicobacter pylori eradication (80) and stopping smoking from age 25 (90). It tells patients that FONASA members have zero copayment for GES care in the public system and that ISAPRE members pay 20% at the provider their ISAPRE assigns; outside that network the GES cover is lost. For cancers, the provider must notify the patient at each stage, from suspicion to treatment.",
          links: [
            { label: "Superintendencia de Salud: Garantías Explícitas en Salud, list of 90 problems (Spanish)", url: GES },
            { label: "Ley 19.966, articles 2 and 4 (LeyChile, original text, Spanish)", url: L19966 },
          ],
        },
        {
          id: "ricarte-soto",
          title: "Ley Ricarte Soto: full cover for named high-cost treatments, whoever the insurer",
          plain:
            "A 2015 law pays 100% of certain expensive medicines for everyone with health insurance in Chile, public or private. A treatment can only be added if it costs at least a threshold set every three years, passes an evidence review and is chosen by the health and finance ministries. Trastuzumab for HER2-positive breast cancer was in the first decree.",
          detail:
            "Ley 20.850 created a financial protection system for high-cost diagnoses and treatments, which FONASA must ensure for all beneficiaries of every health insurance system; ISAPRE members first use their contract's catastrophic illness cover (CAEC) where it applies. A treatment enters the decree only if its annual cost is at or above a threshold set every three years by the health and finance ministries, taking into account 40% of average annual family income after basic subsistence spending (article 6), and after an evidence review by the Subsecretaría de Salud Pública covering efficacy, safety, economic evaluation, budget impact, risk-sharing options and the maximum price (article 7). FONASA's page lists 27 health problems and states that the system covers 100% of the guaranteed medicines. The Ministry's 2022 cancer plan lists the cancer guarantees: trastuzumab for HER2-positive breast cancer (from December 2015, treatment within 20 days of approval by the expert committee), sunitinib or everolimus for progressive pancreatic neuroendocrine tumours (March 2018), imatinib or sunitinib for unresectable or metastatic GIST, and ruxolitinib for myelofibrosis.",
          links: [
            { label: "Ley 20.850, articles 1 and 5 to 7 (LeyChile, Spanish)", url: L20850 },
            { label: "FONASA: Ley Ricarte Soto (Spanish)", url: LRS },
            { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 2.2.3 (PDF, Spanish)", url: PLAN },
          ],
        },
        {
          id: "high-cost-drugs",
          title: "A ministry committee funds high-cost cancer drugs for public patients outside GES and Ricarte Soto",
          plain:
            "For public-system patients whose cancer drug is covered by neither GES nor the Ricarte Soto law, a Ministry committee set up in 2020 approves high-cost cancer drugs case by case from a list, within the year's budget. A 2026 study found Chile's lists include 60 of the 64 cancer medicines on WHO's essential list.",
          detail:
            "The Ministry's 2022 cancer plan describes the Comisión Técnica asesora de Drogas de Alto Costo, created by Decreto Exento N° 32 of 8 July 2020, to prioritise and secure funding of high-cost medicines for public-network cancer patients with no other cover. Each patient's treatment must be approved by the committee, which favours clinically relevant gains in survival or quality of life; the list depends on the year's budget law, FONASA pays, and purchase is meant to be centralised through CENABAST. The list updated in December 2021 (Resolución exenta N° 1269) includes, for solid tumours, anti-EGFR antibodies, fulvestrant, pertuzumab, bevacizumab, nivolumab, pembrolizumab, osimertinib, alectinib, trastuzumab emtansine, everolimus, anti-PD-L1 antibodies, second-generation antiandrogens and CDK4/6 inhibitors, and for blood cancers lenalidomide, azacitidine, bendamustine, dasatinib, rituximab, midostaurin and ponatinib. Vargas and colleagues (Journal of Cancer Policy, 2026) found Chile's lists align with 60 of the 64 medicines on the 2023 WHO essential cancer medicines list, 119 cancer medicines in all, and describe Chile's model as statutory guarantees co-decided by the health and finance ministries; they note that list alignment does not by itself guarantee access.",
          links: [
            { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 2.2.4 (PDF, Spanish)", url: PLAN },
            { label: "Vargas et al., WHO essential cancer medicines in Chile, Kenya and Thailand (J Cancer Policy 2026)", url: VARGAS_2026 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the ISP, six months by the ordinary route and three by reliance",
      aside: { label: "Decreto 54 de 2019, accelerated registration (LeyChile, Spanish)", url: D54 },
      cards: [
        {
          id: "isp-routes",
          title: "Three months for a medicine already registered by a stringent regulator, six by the ordinary route",
          plain:
            "The Instituto de Salud Pública registers medicines in Chile. The rules give it six months for an ordinary application. Since 2020 a medicine registered for the same use by a strict foreign regulator can use an accelerated route of three months, but biological medicines, such as most antibodies, are excluded unless the Minister allows them.",
          detail:
            "Decreto 3 de 2010, the regulation of the national system for controlling medicines, gives the ordinary registration route a total of six months from payment of the fee (article 47) and the simplified route five months (article 52). Decreto 54 de 2019, signed on 7 November 2019 and published on 21 August 2020, says the ordinary procedure could be excessively bureaucratic and added articles 54 A to 54 G: a medicine registered for the same indication by a high-surveillance agency, meaning a WHO-listed stringent regulatory authority, a PAHO level IV authority or a member of the Pharmaceutical Inspection Co-operation Scheme, can be registered on the dossier submitted to that agency, with the ISP taking its review into account, in no more than three months unless the file needs correcting. The route is closed if any such agency has refused the medicine, and to biological medicines unless the Minister of Health exempts a product or category by resolution. Articles 21 and 21 A of Decreto 3 let the ISP authorise an unregistered medicine for urgent use in shortage, for personal import (up to six months' treatment) or for a clinical trial with ethics approval. The ISP states that PAHO has certified it as a level 4 regional reference authority since 2016. These are legal time limits; OnCo found no published measured approval times for cancer medicines.",
          links: [
            { label: "Decreto 3 de 2010, articles 21, 47 and 52 (LeyChile, Spanish)", url: D3 },
            { label: "Decreto 54 de 2019 (LeyChile, Spanish)", url: D54 },
            { label: "ISP: who we are (Spanish)", url: ISP_ABOUT },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination: Pap tests from 25, mammography from 50, HPV vaccine at school",
      aside: { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 3.3.2 (PDF, Spanish)", url: PLAN },
      cards: [
        {
          id: "screening-coverage",
          title: "Organised screening for two cancers only, and coverage below target for both",
          plain:
            "Chile screens for cervical cancer with a Pap test every three years from 25 to 64, and for breast cancer with a mammogram every three years from 50 to 69, both in primary care. In 2020 only 48% and 35% of eligible women in the public system were up to date. HPV testing has been introduced step by step since 2019.",
          detail:
            "The Ministry's 2022 cancer plan states that Chile screens only for cervical and breast cancer, and that stomach, lung and prostate cancer, which cause high death rates, are not under epidemiological surveillance. Cervical screening coverage, the share of women aged 25 to 64 with a Pap test in the last three years, fell from 65% in 2015 to 53% in 2019 and 48% in 2020, against a goal of 80%; a pilot of molecular HPV testing began in 2019 in 13 health services, women positive for types 16 or 18 go straight to colposcopy, and 2,480 such results were recorded in 2020. Breast screening coverage, women aged 50 to 69 with a mammogram in the last three years, was 36.6% in 2017, 39.1% in 2019 and 34.6% in 2020, against a goal of 70%; 34 mammography units, 10 of them mobile, were installed in primary care under the 2018 to 2028 plan. IARC's CanScreen5 records a national cervical programme started in 1986 and documented in law. A suspicion of either cancer opens the GES guarantee for confirmation and treatment.",
          links: [
            { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, tables 12 and 13 (PDF, Spanish)", url: PLAN },
            { label: "IARC CanScreen5: Chile, cervix", url: CANSCREEN },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccine for girls at school since 2014 and for boys since 2019",
          plain:
            "Chile added the HPV vaccine to its school programme in 2014 for girls in the fourth and fifth years of primary school, and in 2019 for boys. WHO and UNICEF estimate that 92% of girls in the target group were vaccinated in 2025.",
          detail:
            "The Ministry's 2022 cancer plan states that the vaccine was added in 2014 for girls in 4th grade (first dose) and 5th grade (second dose), so that from 2016 a large share of girls leaving 8th grade were immunised, and that boys over 9 in 4th grade were added in 2019; it gives coverage of 74.7% in 4th grade and 68.7% in 5th grade at the time of writing, and notes that cervical cancer kills more than 500 women of reproductive age in Chile each year. WHO's Global Health Observatory, which publishes the WHO and UNICEF estimates of HPV coverage in the primary target cohort of girls, gives Chile 85% in 2014, 80% in 2020, 94% in 2022, 88% in 2023, 91% in 2024 and 92% in 2025; the plan's figures are for single school grades and an unstated year, so the two are not directly comparable. Hepatitis B vaccine, which protects against liver cancer, has been in the infant programme since 2005, with 97% coverage of three doses according to the plan.",
          links: [
            { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 3.3.2.1 (PDF, Spanish)", url: PLAN },
            { label: "WHO Global Health Observatory: HPV immunisation coverage in girls", url: WHO_HPV },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Capacity: seven public radiotherapy centres and a gap in chemotherapy chairs",
      aside: { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 3.3.4 (PDF, Spanish)", url: PLAN },
      cards: [
        {
          id: "radiotherapy",
          title: "Seven public hospitals give radiotherapy, four of them brachytherapy too",
          plain:
            "The Ministry's 2022 cancer plan lists seven public hospitals equipped for external radiotherapy, from Antofagasta in the north to Punta Arenas in the south; four also give brachytherapy. The public network gave about 7,000 courses of radiotherapy with a linear accelerator a year in 2017 to 2020.",
          detail:
            "The seven are the Centro Oncológico del Norte in Antofagasta, Hospital Carlos Van Buren in Valparaíso, the Instituto Nacional del Cáncer in Santiago (north and south sites), Hospital César Garavagno in Talca, Hospital Guillermo Grant Benavente in Concepción and Talcahuano, Hospital Base de Valdivia and Hospital Clínico de Magallanes in Punta Arenas. The public network recorded 6,714 accelerator treatments and 1,076 brachytherapy treatments in 2017, 7,366 and 1,865 in 2019, and 7,008 and 1,375 in 2020. In 2020 the Ministry bought four linear accelerators centrally, installed in Antofagasta, the Instituto Nacional del Cáncer, Valdivia and Concepción, which the plan says took the number of public centres able to give high-complexity radiotherapy from one to five, at a saving of 37% on the estimated budget. For systemic therapy, 26 public establishments had about 300 treatment chairs, which the plan counts as a gap of about 385 against a norm of 50 per million people. Private centres are not counted in these figures, and the IAEA's directory of radiotherapy centres could not be read.",
          links: [
            { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, table 18 and section 3.4 (PDF, Spanish)", url: PLAN },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Chile does",
      title: "What Chile does differently",
      aside: { label: "Ley 21.258, Ley Nacional del Cáncer (LeyChile, Spanish)", url: L21258 },
      cards: [
        {
          id: "cancer-law",
          title: "A national cancer law with a plan, a commission, a fund and protection at work",
          plain:
            "The 2020 Ley Nacional del Cáncer requires a five-year cancer plan reported to Congress, a national registry, a network of cancer centres in five zones, an advisory commission that includes patient groups, and a fund for prevention and research. It forbids employers from making a job or promotion depend on not having had cancer, or from requiring a certificate or test to show it.",
          detail:
            "Ley 21.258, promulgated on 26 August 2020 and published on 2 September 2020, is named in honour of Dr Claudio Mora. The plan must set goals and indicators from prevention to palliative care, last five years, be reviewed at mid-term and be reported to the health committees of both chambers every six months, with results by region once a year. The Red Oncológica Nacional groups centres of high, medium and low complexity covering at least the north, centre, Metropolitan Region, centre-south and south. The Comisión Nacional del Cáncer has five members from scientific societies, three from medical faculties and three from patient foundations or organisations, serves three years, meets at least every two months and must declare conflicts of interest. The Fondo Nacional del Cáncer is funded by the budget law, international cooperation, tax-deductible donations and regional funds, and awards projects by public competition. People with a well-founded suspicion of cancer have a right to diagnostic confirmation and treatment, and to genetic counselling where risk factors are found. The law amends the Labour Code so that no employer may make hiring, renewal or promotion depend on not having had cancer, and treats a dismissal found discriminatory on that ground as serious. A transitional article set aside 20,000 million pesos in the first year for equipment, three pre-investment studies and two new specialised centres.",
          links: [
            { label: "Ley 21.258 (LeyChile, Spanish)", url: L21258 },
            { label: "Ministry of Health: cancer plans (Spanish)", url: MINSAL_CANCER },
          ],
        },
        {
          id: "right-to-be-forgotten",
          title: "A right to be forgotten: no insurer or contract may ask about a cancer five years after treatment ended without relapse",
          plain:
            "Since February 2024, Chilean law has protected cancer survivors from paying more or being refused. Five years after the end of radical treatment with no relapse, nobody may ask a person whether they have had cancer when signing a contract, and an insurer may not take it into account.",
          detail:
            "Ley 21.656, promulgated on 1 February 2024 and published on 13 February 2024, added article 8 bis, Derecho al olvido oncológico, to the Ley Nacional del Cáncer. It makes void any clause, condition, higher price, exclusion or restriction aimed at a person who had a cancer before signing a contract when five years have passed since the end of radical treatment without later relapse; it bars asking for cancer information, or requiring a declaration of past cancer, in those circumstances; and from then on no insurer may consider a history of cancer when contracting insurance. Waivers of the right are void, and a breach can be pursued under the consumer protection law (Ley 19.496), including annulment of the clause and compensation. The bill came from a motion by five senators.",
          links: [
            { label: "Ley 21.656 (LeyChile, Spanish)", url: L21656 },
            { label: "Ley 21.258, article 8 bis as amended (LeyChile, Spanish)", url: L21258 },
          ],
        },
        {
          id: "gallbladder",
          title: "Preventive gallbladder removal for people aged 35 to 49 with gallstones, guaranteed since 2006",
          plain:
            "Gallbladder cancer is unusually common in Chile and is the fourth cancer killer of Chilean women. Since 2006, anyone aged 35 to 49 with gallstones has had a guaranteed operation to remove the gallbladder, to prevent the cancer. Studies disagree on how much it has helped.",
          detail:
            "Preventive cholecystectomy against gallbladder cancer for people aged 35 to 49 is GES problem 26. GLOBOCAN estimates 2,068 new gallbladder cancers and 1,156 deaths in Chile in 2024, and the registries' five-year relative survival for it was 12.7%; the plan names Los Ríos as the region with the highest gallbladder cancer death rate. Samaniego and colleagues (Revista Médica de Chile, 2024), using Ministry and statistics institute data, counted 284,139 notifications to people aged 35 to 49 with gallstones since 2006, found standardised gallbladder cancer mortality falling over two decades, including before the programme began, and found that the regions with the highest incidence were not always those with the most notifications; they argue for directing the programme to high-risk areas. Mardones and Frenz (2019), comparing 2002 to 2014 before and after the guarantee, report that mortality at ages 35 to 49 decreased by 4% before the guarantee and by 8% after it (the abstract does not state over what interval), and that the rise in hospital discharges after the guarantee did not yet show a break in the national fall in mortality, although it benefited the 35 to 49 age group. GES also guarantees Helicobacter pylori eradication (problem 80), relevant to stomach cancer, the first cancer killer of Chilean men.",
          links: [
            { label: "Samaniego et al., Rev Med Chile 2024", url: SAMANIEGO_2024 },
            { label: "Mardones and Frenz, Rev Med Chile 2019", url: MARDONES_2019 },
            { label: "Superintendencia de Salud: GES list (Spanish)", url: GES },
          ],
        },
        {
          id: "falp-plan",
          title: "A cancer charity that sells cancer cover",
          plain:
            "Fundación Arturo López Pérez, a non-profit cancer institute in Santiago founded in 1954, sells its own prepaid plan, the Convenio Oncológico. Members are treated there for any cancer, with no limit on the number of episodes, no age limit, and no caps or deductibles, according to the foundation.",
          detail:
            "FALP's history page states that it was founded in 1954 with a donation from Ana Ross, widow of the businessman Arturo López Pérez, who died of stomach cancer in 1949, that it opened on 2 August 1955 in two pavilions of the Hospital del Salvador, and that in 1960 it set up a tumour committee to take treatment decisions collegially. It reports 642,577 consultations for 86,364 new patients, 36,451 operations, 74,950 radiotherapy sessions and 55,312 episodes of care under the Convenio in 2011 to 2017, and 134,612 free mammograms in early detection campaigns. Its benefits page describes the Convenio Oncológico Fondo Solidario as covering any type of cancer, with no limit on events or on age at entry or for staying, and no caps or deductibles for cancer treatment. These are the foundation's own statements; OnCo has not seen the contract terms or prices.",
          links: [
            { label: "FALP: history (Spanish)", url: FALP_HIST },
            { label: "FALP: Convenio Oncológico benefits (Spanish)", url: FALP_CONV },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Chile", url: CTGOV },
      cards: [
        {
          id: "trials-in-chile",
          title: "314 trials in OnCo list a site in Chile, almost all run by companies",
          plain:
            "Of the trials OnCo holds, 314 list at least one site in Chile on ClinicalTrials.gov, 230 of them phase 3. Almost all are run by drug companies, led by MSD, Bristol Myers Squibb and AstraZeneca. None of those in OnCo is sponsored by a Chilean institution.",
          detail:
            "OnCo's ClinicalTrials.gov capture, retrieved in October 2026, lists Chile among the site countries of 314 trial records: 230 phase 3, 18 phase 2/3, 34 phase 2 and 32 phase 1/2. The lead sponsors are MSD (102), Bristol Myers Squibb (42), AstraZeneca (29) and Roche (16), with academic groups such as SWOG, EORTC, ECOG-ACRIN, the European Institute of Oncology and Queen Mary University of London sponsoring a handful. Several match cancers that weigh heavily in Chile: KEYNOTE-966, TOPAZ-1 and HERIZON-BTC-302 in biliary tract and gallbladder cancer; CheckMate 649, KEYNOTE-859, KEYNOTE-811, MATTERHORN, SPOTLIGHT and GLOW, and FORTITUDE-101 in stomach cancer; and KEYNOTE-826, KEYNOTE-A18 and CALLA in cervical cancer. This is OnCo's subset of the registry, not every trial run in Chile. The 2020 cancer law asks the Ministry to promote cancer research with the science ministry and funds projects through the Fondo Nacional del Cáncer; OnCo found no published total of what the fund has awarded.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Chile", url: CTGOV },
            { label: "Ley 21.258, articles 5 and 14 to 19 (LeyChile, Spanish)", url: L21258 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "epi-unreachable",
      title: "The Ministry's epidemiology site, which holds the registry reports, could not be read",
      plain:
        "epi.minsal.cl, where the Ministry of Health publishes its population cancer registry reports and cancer mortality reports, answered every request from OnCo's network with a Cloudflare challenge, and the Internet Archive was offline. The adult registry figures on this page are read from the Ministry's 2022 cancer plan, which quotes them.",
      detail:
        "On 11 November 2026 requests for the Segundo Informe de Registros Poblacionales de Cáncer (February 2023), the cancer mortality report for 2009 to 2020 and the mortality trend report for 2000 to 2019 returned a Cloudflare challenge page; OnCo does not try to pass such challenges. The Internet Archive held only a redirect for the registry report and was then temporarily offline. As a result, the regional registries' own incidence by site and region, the standard population used for their adjusted rates, and mortality after 2019 were not read directly, and the plan's quotation of them could not be checked against the report. The Instituto Nacional del Cáncer's site (incancer.cl) also did not answer.",
      links: [
        { label: "Ministry of Health: Departamento de Epidemiología", url: EPI },
        { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027 (PDF, Spanish)", url: PLAN },
      ],
    },
    {
      id: "not-found",
      title: "Figures looked for and not found",
      plain:
        "OnCo could not find, from a source it could read, the ISP's measured approval times for cancer medicines, screening coverage after 2020, the number of radiotherapy machines in the private sector, the current Ricarte Soto list of 27 problems in full, the GES waiting times for each cancer, or how much the Fondo Nacional del Cáncer has awarded.",
      detail:
        "Registration times on this page are the limits in Decretos 3 de 2010 and 54 de 2019, not measured times. Screening coverage is the plan's figure for the public network up to 2020. FONASA's Ricarte Soto page loads its list of 27 problems through a script that refused direct requests, so the cancer guarantees are those listed in the 2022 plan and may have grown since. The decree number of the GES list in force was not confirmed. The IAEA's directory of radiotherapy centres returned its page shell without data to a script. The approving decree of Norma Técnica N° 242 is a scan whose date was read by OCR as April 2025; the Ministry's page labels it Decreto Exento N° 72 while the file name says N° 28.",
      links: [
        { label: "FONASA: Ley Ricarte Soto (Spanish)", url: LRS },
        { label: "IAEA DIRAC", url: "https://dirac.iaea.org/" },
        { label: "Ministry of Health: Norma Técnica N° 242 (scanned PDF, Spanish)", url: NT242 },
      ],
    },
  ],
  institutions: ["minsal-chile", "fonasa-chile", "superintendencia-de-salud-chile", "isp-chile", "renci-chile", "inc-chile", "falp-chile", "iarc", "who"],
  companies: ["merck", "bms", "astrazeneca", "roche-genentech", "daiichi-sankyo"],
  drugs: ["trastuzumab", "sunitinib", "everolimus", "imatinib", "ruxolitinib", "pembrolizumab", "nivolumab", "osimertinib", "alectinib", "lenalidomide"],
  trials: [
    "keynote-966", "topaz-1", "herizon-btc-302", "herizon-btc-01", "checkmate-649", "keynote-859", "keynote-811", "matterhorn", "spotlight-glow",
    "fortitude-101", "destiny-gastric04", "herizon-gea-01", "keynote-826", "keynote-a18", "calla", "eortc-22922", "ibis-ii", "sound", "tmist",
    "nct04155034", "nct03678025", "aphinity", "hera-b31-n9831", "dasision", "latitude",
  ],
  papers: [
    "paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024", "paper-mardones-frenz-chile-ges-mortality-rev-med-chile-2019",
    "paper-cid-chile-programme-gallbladder-cancer-mortality-am-j-epidemiol-2024", "paper-vargas-who-eml-cancer-chile-kenya-thailand-2026",
  ],
  people: ["berta-cerda-alvarez", "cristian-ayala-munita", "rolando-medeiros"],
  how:
    "Every card was written from Chilean sources read in Spanish from their raw text: the laws in the XML of the Biblioteca del Congreso Nacional's LeyChile service (Leyes 19.966, 20.850, 21.258 and 21.656; Decretos 3 de 2010 and 54 de 2019), the Ministry of Health's Plan Nacional de Cáncer 2022-2027 and Segundo Informe RENCI 2012-2016, Norma Técnica N° 242 and its decree (scanned, read by OCR), the Superintendencia de Salud's GES page and 2025 ISAPRE report, FONASA's Ricarte Soto page, and the ISP's and FALP's own pages. GLOBOCAN figures are IARC's 2024 estimates and its Chile fact sheet; spending figures come from the World Bank's API and HPV coverage from WHO's Global Health Observatory API. Trial counts are from OnCo's own ClinicalTrials.gov capture.",
  verify:
    "The adult incidence figures are rates from a few regional registries for 2003 to 2010, quoted by the Ministry's plan, not a national count; GLOBOCAN's 2024 figures are modelled. The GES list and the Ricarte Soto list are set by decrees that are replaced every few years, so check the current decree before relying on whether a cancer or a medicine is covered. Registration times are legal limits. Ask FONASA, your ISAPRE or the Superintendencia de Salud for your own cover.",
  verifyLinks: [
    { label: "Superintendencia de Salud: Garantías Explícitas en Salud", url: GES },
    { label: "FONASA: Ley Ricarte Soto", url: LRS },
    { label: "Ministry of Health: cancer information and plans", url: MINSAL_CANCER },
    { label: "IARC GLOBOCAN 2024: Chile fact sheet (PDF)", url: GCO_FS },
  ],
};
