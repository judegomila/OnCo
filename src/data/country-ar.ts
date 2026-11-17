import type { CountryDive } from "@/data/country-dive";

/**
 * Argentina deep dive: the hand-written cards for /countries/ar/. Argentine sources were read in Spanish, from the raw
 * text of each page or PDF (pdftotext), not from a summary of it: the Ministry of Health's report Mortalidad por Cáncer
 * en Argentina 2024 (SIVER-Ca, February 2026) and its incidence and mortality pages, the childhood cancer registry's
 * 2025 book, Decree 459/2025 (Boletín Oficial, through the Internet Archive because the live site did not answer),
 * the 2022 census volume on health coverage, Ministry of Health Resolutions 201/2002 and 310/2004 on the Programa
 * Médico Obligatorio, Law 26.682 on prepaid medicine, the Superintendencia's Resolution 731/2023, PAMI's pages, the
 * Banco de Drogas page and its medicine list, Decree 344/2023 and CONETEC's pages, ANMAT's ordered text of Decree
 * 150/92 and its pages, an ANMAT staff analysis of trial authorisation times, the national screening programmes'
 * pages, the 4th National Risk Factor Survey (2018) and the Law 27.674 page. Every figure below is quoted from one of
 * those; where a figure could not be read it is named under `gaps`.
 */
const MORT_2024 = "https://www.argentina.gob.ar/sites/default/files/2026-3_mortalidad_por_cancer_04.05.pdf";
const INCIDENCIA = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/estadisticas/incidencia";
const MORTALIDAD = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/estadisticas/mortalidad";
const SIVER = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/siver-ca";
const ROHA = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/roha";
const ROHA_BOOK = "https://www.argentina.gob.ar/sites/default/files/2024/04/manual_registro_oncopediatrico_hospitalario_argentino_1642025.pdf";
const RCBP = "https://www.argentina.gob.ar/salud/dnc/lineas-programaticas/registros-de-cancer-de-base-poblacional-rcbp";
const DNC_ABOUT = "https://www.argentina.gob.ar/salud/inc/institucional";
const DEC459 = "https://web.archive.org/web/20260316093948/https://www.boletinoficial.gob.ar/detalleAviso/primera/328020/20250708";
const IARC_FS = "https://gco.iarc.who.int/media/globocan/factsheets/populations/32-argentina-fact-sheet.pdf";
const CENSO_SALUD = "https://censo.gob.ar/wp-content/uploads/2023/11/CNPHV2022_RD_Salud-y-prevision.pdf";
const RES_201 = "https://e-legis-ar.msal.gov.ar/legisalud/migration/pdf/msres201_2002.pdf";
const RES_310 = "https://www.argentina.gob.ar/sites/default/files/resolucion_310_2004.pdf";
const LEY_26682 = "https://servicios.infoleg.gob.ar/infolegInternet/anexos/180000-184999/182180/norma.htm";
const SSS_731 = "https://e-legis-ar.msal.gov.ar/legisalud/migration/pdf/sssalres731_2023.pdf";
const SSS_SUR = "https://www.argentina.gob.ar/sssalud/transparencia/subsidios/sur";
const PAMI_MEDS = "https://www.pami.org.ar/tramite/medicamentos-oncologicos";
const PAMI_PLAN = "https://www.pami.org.ar/plan-oncologico";
const BANCO = "https://www.argentina.gob.ar/servicio/banco-de-drogas";
const BANCO_LIST = "https://www.argentina.gob.ar/sites/default/files/2019/04/listado_complementario_de_medicamentos_oncologicos_bde.pdf";
const CONETEC = "https://www.argentina.gob.ar/salud/conetec";
const CONETEC_FUNC = "https://www.argentina.gob.ar/salud/conetec/funcionamiento";
const DEC344 = "https://web.archive.org/web/2024/https://www.boletinoficial.gob.ar/detalleAviso/primera/289801/20230707";
const DEC150 = "http://www.anmat.gob.ar/fna/150.asp";
const ANMAT_INTL = "https://www.argentina.gob.ar/anmat/relaciones-internacionales/escenarios-de-participacion";
const ANMAT_TRIALS = "https://argentina.gob.ar/sites/default/files/anmat_escenario_de_la_investigacion_clinica_-_cristina_papayannis.pdf";
const PNCM = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/pncm/objetivos-y-ejes";
const PNPCC = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/pnpcc";
const PNCCR = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/el-inc/pnccr";
const SITAM = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/sitam";
const ENFR_2018 = "https://www.indec.gob.ar/ftp/cuadros/publicaciones/enfr_2018_resultados_definitivos.pdf";
const LEY_27674 = "https://www.argentina.gob.ar/salud/dnc/derechos-ley-27674-regimen-de-proteccion-integral-del-nino-nina-y-adolescente-con-cancer";
const LEY_27674_TEXT = "https://www.argentina.gob.ar/normativa/nacional/ley-27674-368128/texto";
const PROCAFA = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/procafa";
const INVEST = "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/coordinacion-investigacion";

export const AR_DIVE: CountryDive = {
  iso2: "AR",
  iso3: "ARG",
  name: "Argentina",
  flag: "🇦🇷",
  asOf: "2026-11-04",
  title: "Cancer in Argentina",
  description:
    "Cancer in Argentina from Argentine sources: 59,537 cancer deaths counted in 2024 and IARC's estimate of 139,470 new cancers, the national childhood cancer registry, three health subsystems and the rule that insurers pay the full cost of cancer medicines under approved protocols, PAMI and the public drug bank for people with only public cover, the health technology commission CONETEC, how ANMAT registers medicines already approved abroad, the screening programmes and their uptake, the childhood cancer law, and 445 trials in OnCo with a site in Argentina.",
  lede:
    "Argentina counts every cancer death, 59,537 in 2024, but has no national count of new cancers: the Ministry of Health uses IARC's estimate of 139,470 for 2024, built from provincial registries. The national insurance package obliges social insurers and prepaid plans to pay the whole cost of cancer medicines given under approved protocols, and a public drug bank supplies them to people who rely on public hospitals alone.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Argentina is 139,470 new cancers (133,448 without non-melanoma skin cancer) and 71,570 deaths, an age-standardised incidence of 215.5 per 100,000 and mortality of 99.7. Argentina has no national count of new cancers to set against it: the Ministry of Health's own incidence page quotes the GLOBOCAN figure, and its 2024 mortality report notes that IARC's incidence depends on the population-based registries whose data meet the standard for Cancer Incidence in Five Continents, last published in 2024 with data for 2013 to 2017. IARC's fact sheet gives the incidence source as sub-national registries and the method as national mortality estimates applied to modelled mortality-to-incidence ratios. Deaths can be compared. The Ministry counted 59,537 deaths from malignant tumours (C00 to C97) among residents in 2024, from death certificates, against GLOBOCAN's 71,570, about 20% more. IARC's fact sheet describes its mortality for Argentina as national WHO data with trends projected to 2024, so it is a projection rather than a count; the sources read do not explain the size of the gap, so it is stated here, not explained. The gap is wide for lung cancer, 8,369 deaths counted against 10,892 estimated.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Argentina",
      aside: { label: "Mortalidad por Cáncer en Argentina 2024 (SIVER-Ca, PDF)", url: MORT_2024 },
      cards: [
        {
          id: "shape",
          title: "59,537 cancer deaths counted in 2024, and lung cancer the commonest cause",
          plain:
            "Argentina recorded 59,537 deaths from cancer in 2024, almost exactly half in men and half in women. Lung cancer caused the most, then bowel cancer, then breast cancer. Cancer was the third cause of death overall, but the first cause of death from illness between the ages of 5 and 59, and the death rate has fallen over the last ten years.",
          detail:
            "The Ministry of Health's surveillance system, SIVER-Ca, counted 59,537 deaths from malignant tumours (C00 to C97) in 2024 from the death certificates the provinces send to the national health statistics directorate, 29,607 in men and 29,930 in women; 76.2% were in people aged 60 and over. Counting all tumours (C00 to D48), the 62,427 deaths were 16.7% of the 374,636 deaths in the country, after cardiovascular (28.0%) and respiratory disease (20.6%). By site, lung cancer caused 8,369 deaths (14.1%), colorectal cancer 7,455 (12.5%), breast cancer 5,912 (5,817 of them women, 19.4% of cancer deaths in women), pancreas 4,365 and prostate 3,483. From 2014 to 2024 the age-standardised cancer death rate fell from 123.97 to 97.79 per 100,000 in men (an annual change of -2.3%) and from 88.93 to 78.25 in women (-1.3%), both statistically significant. Lung cancer mortality in men fell 36% over the same decade, breast cancer mortality 14% and prostate cancer mortality 26%. The report notes that less than 10% of deaths in Argentina are recorded with an ill-defined or unknown cause.",
          links: [
            { label: "Mortalidad por Cáncer en Argentina 2024, tables 4 to 7 and chapters 3 to 8 (PDF)", url: MORT_2024 },
            { label: "Dirección Nacional del Cáncer: mortalidad", url: MORTALIDAD },
          ],
        },
        {
          id: "provinces",
          title: "Death rates differ widely between provinces",
          plain:
            "Cancer death rates are not the same across Argentina. In 2024 men in Tierra del Fuego had a cancer death rate about 40% above the national figure, and women in Santa Cruz about 20% above it, while Santiago del Estero and Tucumán had some of the lowest rates. The Ministry reads such differences partly as unequal access to early diagnosis and treatment.",
          detail:
            "The 2024 mortality report gives age-standardised cancer death rates of 98.05 per 100,000 men and 80.62 per 100,000 women nationally. Tierra del Fuego, Santa Cruz and Neuquén had the highest rates in men, Tierra del Fuego about 40% above the national average at 148.9; Santiago del Estero had the lowest in men (66.1). In women, Santa Cruz was highest (105.5, about 20% above the national average) and Tucumán among the lowest (68.6). The report says that earlier SIVER-Ca reports showed falling cancer mortality with important differences by tumour and province, which suggests inequalities in access to early diagnosis and treatment. In the Sur region, which in the report groups the Patagonian provinces and La Pampa, tumours were 24.3% of all deaths in 2024, against 14.4% in the north-west. The Ministry's mortality page itself gives 8,378 and 8,371 for 2024 lung cancer deaths in different paragraphs; the report's table gives 8,369, used here.",
          links: [
            { label: "Mortalidad por Cáncer en Argentina 2024, chapter 3 and table 4 (PDF)", url: MORT_2024 },
            { label: "Dirección Nacional del Cáncer: mortalidad", url: MORTALIDAD },
          ],
        },
        {
          id: "children",
          title: "Childhood cancer: about 1,358 children a year, and 70% alive five years later",
          plain:
            "Argentina has a national registry of childhood cancer that counted 31,241 cancers in children under 15 from 2000 to 2022, about 1,358 a year. Seven in ten children diagnosed in 2010 to 2019 were alive five years later, up from six in ten in the early 2000s. Three quarters are treated in public hospitals, and about half travel to another province for part of their treatment.",
          detail:
            "The Registro Oncopediátrico Hospitalario Argentino, founded in 2000 by the Fundación Kaleidos and part of the national cancer body since 2010, gathers cases from 91 reporting sources. Its 2025 book gives an incidence of 131.0 cancers a year per million children under 15 for 2000 to 2022, stable over the period, and estimates that its average of 1,358 cases a year is about 92% of the 1,484 expected at the average rate of the International Incidence of Childhood Cancer series. Leukaemias are the commonest, then central nervous system tumours and lymphomas. Five-year survival for 2010 to 2019 was 70.3% (ten-year 67.7%): 70.7% for leukaemias, 60.9% for central nervous system tumours, 84.5% for lymphomas, 92.9% for retinoblastoma and 52.3% for bone tumours. Five-year survival rose from 59.7% for children diagnosed in 2000 to 2004 to 70.9% for 2015 to 2019. In 2013 to 2022, 76% were treated in public hospitals; the book adds, without restating the period, that 45% of all cases reported by public hospitals were treated in two reference centres; in 2018 to 2022, 48% moved to another province at some point. Childhood cancer mortality fell 20% between 1999 to 2000 and 2021 to 2022.",
          links: [
            { label: "ROHA: Tendencia de incidencia 2000-2022, supervivencia a 5 y 10 años 2010-2019 (2025, PDF)", url: ROHA_BOOK },
            { label: "Ministerio de Salud: Registro Oncopediátrico Hospitalario Argentino", url: ROHA },
          ],
        },
      ],
      tables: [
        {
          id: "deis-2024",
          title: "Cancer deaths counted in 2024, by site, beside IARC's estimate of new cases",
          caption: "Deaths of residents of Argentina in 2024 from death certificates, both sexes, from the Ministry's 2024 mortality report; new cases are GLOBOCAN 2024 estimates, not a count.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "deaths", label: "Deaths counted, 2024", numeric: true },
            { key: "cases", label: "New cases estimated by IARC, 2024", numeric: true },
          ],
          rows: [
            { site: "All malignant tumours (C00 to C97)", deaths: 59537, cases: 139470 },
            { site: "Lung, trachea and bronchus", deaths: 8369, cases: 12766 },
            { site: "Colon and rectum", deaths: 7455, cases: 16346 },
            { site: "Breast (both sexes; 5,817 deaths in women)", deaths: 5912, cases: 20750 },
            { site: "Pancreas", deaths: 4365, cases: 5432 },
            { site: "Prostate", deaths: 3483, cases: 13335 },
            { site: "Stomach", deaths: 2712, cases: 4117 },
            { site: "Cervix", deaths: 2463, cases: 4679 },
            { site: "Kidney and urinary tract (IARC: kidney only)", deaths: 2130, cases: 5572 },
            { site: "Liver", deaths: 1955, cases: 2529 },
            { site: "Oesophagus", deaths: 1458, cases: 2357 },
            { site: "Brain and central nervous system", deaths: 1376, cases: 2048 },
            { site: "Bladder", deaths: 1275, cases: 3805 },
          ],
          note: "Deaths are counted by the national health statistics directorate and processed by SIVER-Ca; cervical deaths include a share of deaths recorded as uterus unspecified, reallocated by IARC's method. 3,469 cancer deaths had an ill-defined site. IARC's case figures are modelled from provincial registries, and its all-cancer figure includes 6,022 non-melanoma skin cancers. The report's text gives slightly different counts for lung (8,378) and colorectal (7,462) deaths than its table; the table is used.",
          sources: [
            { label: "Mortalidad por Cáncer en Argentina 2024, tables 1 and 6 (PDF)", url: MORT_2024 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Argentina (PDF)", url: IARC_FS },
          ],
        },
      ],
    },
    {
      id: "counting",
      nav: "Registries",
      title: "Who counts cancer: a national surveillance system and provincial registries",
      aside: { label: "Ministerio de Salud: SIVER-Ca", url: SIVER },
      cards: [
        {
          id: "siver",
          title: "Deaths are counted nationally; new cancers only in some provinces",
          plain:
            "Argentina has a national system that gathers death records, a network of hospital tumour registries and a childhood cancer registry. New cancers in adults are counted only by registries run by some provinces, so there is no national count; the Ministry uses IARC's estimate. The Ministry lists ten population registries covering about a third of the population, and in 2026 made cancer a notifiable disease.",
          detail:
            "The Sistema de Vigilancia Epidemiológica y Reporte del Cáncer (SIVER-Ca) is the Ministry's area for collecting, analysing and publishing information on cancer. It draws on vital statistics (mortality data from the national health statistics directorate, the national statistics institute INDEC and the national population register), on the National Risk Factor Survey, on hospital-based registries grouped in the network of the Registro Institucional de Tumores de Argentina (RITA), and on population-based registries, which depend on the provinces and whose data IARC publishes. Its page states that more than 139,000 new cancers and more than 400,000 people living with cancer were estimated for 2024, and that recognising cancer as a notifiable event is expected to open access to sources and increase notification to RITA and the population-based registries. The Ministry's page on population-based registries says that recognition has come: cancer is a notifiable event, included in the manual of notifiable events by Ministry Disposition 1/2026. The same page lists ten population-based registries, nine provincial (Tucumán, Santa Fe, Chaco, Entre Ríos, San Luis, Tierra del Fuego, Mendoza, Neuquén and Córdoba) and one for the district of General Pueyrredón in Buenos Aires province, started between 2001 and 2022, with stated covered populations adding up to 15,738,789, about a third of the 45.6 million people in private dwellings whose health cover the 2022 census reports (the sum of its three cover groups; the census volume read does not give the total population). The 2024 mortality report calls the development of RITA and the consolidation of provincial population registries key actions towards wider and more timely coverage. RITA's case counts were not found in the pages read.",
          links: [
            { label: "Ministerio de Salud: SIVER-Ca", url: SIVER },
            { label: "Mortalidad por Cáncer en Argentina 2024, introduction (PDF)", url: MORT_2024 },
            { label: "Dirección Nacional del Cáncer: registros de cáncer de base poblacional", url: RCBP },
            { label: "Dirección Nacional del Cáncer: incidencia", url: INCIDENCIA },
          ],
        },
        {
          id: "inc-to-dnc",
          title: "The national cancer institute became a directorate of the Ministry in 2025",
          plain:
            "Argentina's Instituto Nacional del Cáncer, created in 2010, was turned by a decree of July 2025 from a separate public body into a unit of the Ministry of Health. It now appears as the Dirección Nacional del Cáncer. The decree says its registries continue to operate under the Ministry's health information system.",
          detail:
            "Decree 459/2025, dated 7 July 2025 and issued under the delegated powers of Law 27.742, ordered the transformation of the Instituto Nacional del Cáncer, a decentralised body under the Ministry's Secretariat of Health Management, into an organisational unit of the Ministry. Its recitals note that Law 27.285 had given the institute decentralised status and that it had developed SIVER-Ca, and state that its registries would remain fully operational under the Sistema Integrado de Información Sanitaria Argentino and that the Ministry would become the authority applying the childhood cancer law, Law 27.674. Article 23 repeals Law 27.285 and Decree 1286 of 9 September 2010 once the Ministry's new structure is in force. The Ministry's pages now describe the Dirección Nacional del Cáncer as the body that designs and implements cancer prevention and control policy, runs the national programmes for breast, cervical and colorectal cancer, childhood cancer, familial cancer and palliative care, and implements RITA, the childhood registry and the screening information system.",
          links: [
            { label: "Decreto 459/2025, Boletín Oficial (Internet Archive copy)", url: DEC459 },
            { label: "Dirección Nacional del Cáncer: misión y funciones", url: DNC_ABOUT },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: three subsystems, and cancer medicines without charge",
      aside: { label: "Resolución 310/2004, Programa Médico Obligatorio (PDF)", url: RES_310 },
      cards: [
        {
          id: "subsystems",
          title: "Six in ten people have social insurance or a prepaid plan; the rest rely on public hospitals",
          plain:
            "Argentina's health system has three parts that exist side by side: free public hospitals for everyone, social insurance funds (obras sociales) for people in registered work, and voluntary prepaid private plans. In the 2022 census, 60.9% of people said they had an obra social or prepaid plan, including PAMI, and 35.8% relied on the public system alone.",
          detail:
            "The census volume on health and social security describes the three coexisting subsystems: a universal public one that guarantees access to health care to everyone living in Argentina; social security, which covers people in registered employment or in the simplified tax regime for small contributors; and a private one offering voluntary cover to those who pay for it, directly or by redirecting their contributions. Of the population in private dwellings counted in 2022, 27,787,124 (60.9%) had an obra social or prepaid plan (including PAMI), 1,514,231 (3.3%) had state health programmes or plans, and 16,317,432 (35.8%) had the public system alone. The census notes that everyone living in or passing through Argentina is guaranteed free access to public health services and medicine provision programmes. The census does not separate obras sociales from prepaid plans. The national health insurance funds are regulated by the Superintendencia de Servicios de Salud, and PAMI, the insurer for retired people and pensioners, says it covers 5 million people.",
          links: [
            { label: "INDEC: Censo 2022, Salud y previsión social, resultados definitivos (PDF)", url: CENSO_SALUD },
            { label: "PAMI: historia", url: "https://www.pami.org.ar/historia" },
          ],
        },
        {
          id: "pmo",
          title: "The national package: cancer medicines paid in full by the insurer",
          plain:
            "Every obra social must provide a minimum package called the Programa Médico Obligatorio, and since 2011 prepaid plans must cover at least the same package. Within it, cancer medicines given under approved protocols are paid in full by the insurer, as are medicines against chemotherapy sickness and for cancer pain. Outpatient medicines on the national formulary are covered at 40%, or 70% for chronic conditions.",
          detail:
            "The emergency Programa Médico Obligatorio was approved by Ministry of Health Resolution 201 of 9 April 2002 as the basic set of services guaranteed by the insurers covered by Law 23.660. Resolution 310 of 7 April 2004 rewrote its medicines section: insurers cover outpatient medicines in its Annex III at 40% for usual medicines and 70% for chronic conditions, against a reference price, and at 100% they cover, among others, medicines for oncological use according to oncological protocols approved by the enforcement authority. Item 7.4 adds 100% coverage of supportive medication to prevent and treat vomiting caused by anticancer drugs and of pain medication for cancer patients, both according to approved protocols, and item 7.5 gives 100% coverage, financed by the solidarity redistribution fund, to medicines on specific lists of the then special programmes administration. Resolution 201 already set 100% coverage for medicines given to inpatients. Law 26.682 of 2011 on prepaid medicine requires prepaid companies to cover at least the Programa Médico Obligatorio in force and bars waiting periods for services included in it. This page read the law as enacted; later amendments were not read.",
          links: [
            { label: "Ministerio de Salud: Resolución 310/2004, items 7.1 to 7.5 (PDF)", url: RES_310 },
            { label: "Ministerio de Salud: Resolución 201/2002, Programa Médico Obligatorio de Emergencia (e-legis, PDF)", url: RES_201 },
            { label: "InfoLEG: Ley 26.682, articles 7 and 10", url: LEY_26682 },
          ],
        },
        {
          id: "surge",
          title: "A solidarity fund reimburses insurers for the most expensive treatments",
          plain:
            "Social insurance funds can recover part of the cost of rare, very expensive or very long treatments from a national solidarity fund run by the Superintendencia de Servicios de Salud. Since April 2023 this works through a scheme called SURGE, which sets which treatments and medicines qualify and the most it will repay.",
          detail:
            "The Superintendencia de Servicios de Salud administers the Fondo Solidario de Redistribución, whose resources are directed to reimbursements for services of high economic impact that need prolonged cover, so that members of the national health insurance system receive the same type and level of care. Resolution 1200 of 2012 created the Sistema Único de Reintegro (SUR) to support insurers financially for services of low incidence and high economic impact and for prolonged treatments. Resolution 731 of 28 March 2023 created the Sistema Único de Reintegro por Gestión de Enfermedades (SURGE) to replace it, with a disease-management approach, for services from 1 April 2023; its three annexes set the procedure, the requirements, coverage, devices, medicines and maximum amounts. The Superintendencia publishes quarterly reports of its reimbursement transfers to the obras sociales under SUR and SURGE, filed by year. Which cancer medicines are on the SURGE annexes, and the amounts, were not read for this page.",
          links: [
            { label: "SSSalud: Resolución 731/2023 (e-legis copy of the Boletín Oficial, PDF)", url: SSS_731 },
            { label: "SSSalud: Sistema Único de Reintegro (SUR + SURGE)", url: SSS_SUR },
          ],
        },
        {
          id: "pami-and-bank",
          title: "PAMI pays all of the cost of cancer medicines; a public drug bank supplies the uninsured",
          plain:
            "PAMI, the insurer for retired people, says it covers 100% of cancer medicines for its members. For people with only public cover, the Ministry of Health's Banco de Drogas Especiales supplies cancer medicines free to people treated in a public hospital, when the patient's province cannot, from a list of about a hundred medicines.",
          detail:
            "PAMI's procedure page states that it gives its members 100% coverage of cancer medicines, which must be prescribed on an electronic prescription with a form, a clinical summary and supporting documents. Its cancer care plan, PICTO, offers members on its list of cancer patients a choice of oncologist, faster appointments and psycho-oncology support. How many people PAMI treats for cancer was not found on the pages read. The Banco de Drogas Especiales complements the provinces in supplying medicines to patients with public cover only, mainly with cancer, for more than 100 cancer conditions. To use it, a patient must show through a negative certificate from the social security administration, renewed every three months, that they have no obra social or prepaid plan, be treated in a public hospital, and have an electronic prescription from a specialist, valid for 30 days, for a medicine on the bank's complementary list. A change of treatment needs the province's written statement of why it cannot supply the medicine. The list read for this page, a PDF created in March 2023, names about a hundred medicines; the immune checkpoint inhibitors on it are nivolumab and pembrolizumab.",
          links: [
            { label: "PAMI: medicamentos oncológicos", url: PAMI_MEDS },
            { label: "PAMI: Plan Oncológico (PICTO)", url: PAMI_PLAN },
            { label: "Ministerio de Salud: Banco de Drogas, requisitos", url: BANCO },
            { label: "Banco de Drogas Especiales: listado complementario de medicamentos oncológicos (PDF)", url: BANCO_LIST },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Argentina decides what to cover: a health technology commission",
      aside: { label: "CONETEC", url: CONETEC },
      cards: [
        {
          id: "conetec-card",
          title: "CONETEC: a health technology commission whose technical definitions bind the Ministry of Health",
          plain:
            "Argentina's national health technology commission, CONETEC, assesses medicines and other technologies and recommends whether they should be covered and how. Since a 2023 decree its recommendations are the national technical reference, and the technical definitions put to it bind the national Ministry of Health and its agencies. Patients have their own seat at its tables, with a vote on what is assessed.",
          detail:
            "The Comisión Nacional de Evaluación de Tecnologías de Salud was created by Ministry of Health Resolution 623 of 2018, inside the Ministry's general coordination unit, while a law for a national assessment agency was debated. Decree 344 of 6 July 2023 re-created it as the Comisión Nacional de Evaluación de Tecnologías Sanitarias y Excelencia Clínica, a deconcentrated body of the Secretariat of Access to Health, to assess technologies by the quality of evidence, clinical benefit, economic impact on equity and public health, and to formulate recommendations on incorporation, disinvestment, form of use, financing and coverage, which are a national technical reference; the technical definitions put to it are binding on the Ministry of Health and its decentralised and deconcentrated bodies. Its technologies are medicines, vaccines, medical devices and clinical and surgical procedures. It works through a patients' table, a prioritisation table, a technical table that votes on the domains of a value framework, a recommendations table, a transparency table and a researchers' table that carries out the assessments, and it publishes draft reports for public consultation. The pages read state no cost-effectiveness threshold.",
          links: [
            { label: "CONETEC (Ministerio de Salud)", url: CONETEC },
            { label: "CONETEC: funcionamiento y mesas de trabajo", url: CONETEC_FUNC },
            { label: "Decreto 344/2023, articles 1 and 2 (Boletín Oficial, Internet Archive copy)", url: DEC344 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: ANMAT, and a shortcut for medicines approved abroad",
      aside: { label: "ANMAT: Decreto 150/92, texto ordenado", url: DEC150 },
      cards: [
        {
          id: "anmat-card",
          title: "A medicine approved in one of fifteen countries can be registered automatically",
          plain:
            "Argentina's regulator, ANMAT, has 120 days to decide an ordinary application to register a medicine. But a medicine already authorised in at least one of fifteen named countries, the United States, Japan, Canada, Switzerland, Israel, the United Kingdom and nine European Union countries, can be registered for import automatically, on the strength of that approval. No measured average time for cancer medicines was found on the ANMAT pages read.",
          detail:
            "Decree 150 of 1992, in the text ordered by Decrees 1890/92 and 177/93 that ANMAT publishes, sets three routes. Under article 3 the authority has 120 calendar days to decide an application, counted for imports from the Annex II countries (among them Australia, Mexico, Brazil, Cuba, Chile and Finland) from the inspection of the factory, which is to be done within 60 days. Under article 4, a medicine authorised for public use in at least one Annex I country (the United States, Japan, Sweden, Switzerland, Israel, Canada, Austria, Germany, France, the United Kingdom, the Netherlands, Belgium, Denmark, Spain and Italy) can be registered for import, and that registration is automatic on presentation of the current official certificate of the authorisation, labels, leaflets and bioavailability data. Under article 5, a new medicine not authorised in an Annex I country needs evidence of its efficacy and safety. ANMAT states that the Pan American Health Organization re-qualified it in 2017 as a regional reference authority for medicines and vaccines, that its inspectorate has been a full member of the Pharmaceutical Inspection Co-operation Scheme since 2008, and that it became a regulatory member of the International Council for Harmonisation in 2024. Measured approval times for cancer medicines were not found; see the gaps.",
          links: [
            { label: "ANMAT: Decreto 150/92, texto ordenado, articles 3 to 5 and Annexes I and II", url: DEC150 },
            { label: "ANMAT: escenarios de participación internacional", url: ANMAT_INTL },
          ],
        },
        {
          id: "trial-approval",
          title: "Trial authorisation: a measured mean of 58 working days",
          plain:
            "ANMAT authorises clinical trials of medicines in Argentina. It changed its procedures from 2017 to shorten authorisation, and an analysis by ANMAT's own staff of trials submitted between June 2017 and June 2019 found that the trials it approved took 58 working days on average. Cancer was the commonest area, about a quarter of all trials.",
          detail:
            "Clinical pharmacology trials are evaluated by the clinical trials area of ANMAT's directorate for the evaluation and registration of medicines under Disposition 6677/10, the good clinical practice regime. A poster by ANMAT staff (Papayannis and colleagues) describes operational changes from 2017 based on Disposition 4008/17 and a new online platform, and analyses the 327 trials submitted from June 2017 to June 2019: neoplasms were the main therapeutic area with 79 trials (24.15%), followed by respiratory disease with 38; 82% included no vulnerable population and 45% of the products tested were biological. The mean evaluation time of the approved trials, up to the authorising disposition, was 58 working days (standard deviation 27, median 52), falling over the four half-years studied from a median of 69 to 44. The text of Disposition 4008/17 itself, and any deadline it sets, was not read for this page.",
          links: [
            { label: "Papayannis et al., ANMAT: escenario actual de la investigación clínica farmacológica (PDF)", url: ANMAT_TRIALS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: three national programmes and what people report",
      aside: { label: "4° Encuesta Nacional de Factores de Riesgo, 2018 (PDF)", url: ENFR_2018 },
      cards: [
        {
          id: "programmes",
          title: "Mammography every two years from 50, HPV testing from 30, a stool test every two years from 50",
          plain:
            "The national breast programme recommends a mammogram every two years for women aged 50 to 69. For cervical cancer, a smear test is advised from 25 and, where available, an HPV test from 30, repeated every five years if negative; children are vaccinated against HPV at 11. For bowel cancer, a stool test every two years from 50 to 75.",
          detail:
            "The Programa Nacional de Control de Cáncer de Mama recommends one mammogram every two years for asymptomatic women of average risk aged 50 to 69; women with symptoms or a relevant personal or family history need individual assessment at any age, and those under 50 or over 69 are outside the population screening target. Its goal is screening coverage above 70% of the target population. The cervical programme describes Argentina's comprehensive prevention strategy since 2011: HPV vaccination for people aged 11 on the national calendar, the Pap smear from 25 (two tests a year apart, then every three years if both are normal) and, from 30, where available, the HPV test, available in most provinces and repeated every five years when negative, with a Pap smear or colposcopy when positive. The colorectal programme, created by Ministerial Resolution 2173 of 2013, uses a biennial faecal immunochemical test for people aged 50 to 75 without symptoms or a relevant history, with colonoscopy after a positive result, and a risk-assessment clinic and colonoscopy for people at raised risk. The three programmes record their tests in an online screening information system, SITAM.",
          links: [
            { label: "Programa Nacional de Control de Cáncer de Mama: objetivos y ejes", url: PNCM },
            { label: "Programa Nacional de Prevención de Cáncer Cervicouterino", url: PNPCC },
            { label: "Programa Nacional de Prevención y Detección Temprana del Cáncer Colorrectal", url: PNCCR },
            { label: "Sistema de información de tamizaje (SITAM)", url: SITAM },
          ],
        },
        {
          id: "uptake",
          title: "Two in three women had a recent mammogram in 2018; one in three people aged 50 to 75 had ever had a bowel test",
          plain:
            "The latest national survey found, in 2018, that 66.0% of women aged 50 to 70 had had a mammogram in the previous two years and 70.3% of women aged 25 to 65 a smear test. Only 31.6% of people aged 50 to 75 had ever had a bowel screening test. Women with only public cover had mammograms much less often.",
          detail:
            "The 4th National Risk Factor Survey, carried out in 2018 and published by INDEC with the national health secretariat in October 2019, covers localities of 5,000 or more inhabitants. It reports that 66.0% of women aged 50 to 70 had had a mammogram in the last two years, with no significant change from 2013; the share ranged from 84.4% in the City of Buenos Aires, 83.1% in Tierra del Fuego and 80.9% in La Pampa to 46.1% in Formosa and 47.9% in Corrientes (34.3% in Santiago del Estero, an estimate the survey calls unreliable). It was 70.7% for women with an obra social or prepaid plan against 46.4% for those with public cover only, and rose with education from 43.8% to 75.3%. 70.3% of women aged 25 to 65 had had a Pap smear in the last two years (76.3% with an obra social or prepaid plan). 31.6% of people aged 50 to 75 had ever had a test for bowel cancer, faecal occult blood test, colonoscopy or barium enema, up significantly from 24.5% in 2013, with 51.3% in the City of Buenos Aires and 58.0% in Tierra del Fuego. A later national survey of screening uptake was not found.",
          links: [{ label: "INDEC and Ministerio de Salud: 4° Encuesta Nacional de Factores de Riesgo, resultados definitivos, chapter 11 (PDF)", url: ENFR_2018 }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Argentina does",
      title: "What Argentina does that others do not",
      cards: [
        {
          id: "oncopaediatric-law",
          title: "A law that gives every child with cancer full cover, a monthly allowance and leave for a parent",
          plain:
            "Under Law 27.674, every child or adolescent up to 18 with cancer who lives in Argentina is entitled, whatever their insurance, to full coverage of treatment and medicines, a monthly allowance during treatment, work leave for a parent, with the social security administration paying in place of the employer, free public transport and support with education and housing. A single certificate, issued once the child is in the national registry, opens all of it.",
          detail:
            "The Régimen de Protección Integral del Niño, Niña y Adolescente con Cáncer, Law 27.674, regulated by Decree 68/2023, applies to children and adolescents with cancer up to 18 inclusive, whatever their health cover. Its benefits, listed by the Ministry, are 100% coverage of services, cancer medicines and clinical support; a monthly financial allowance while active treatment lasts; work leave for one parent, legal representative or carer employed in the public or private sector during active treatment; free use of public transport and collective land transport; access to suitable housing or adaptation of the home for families in social vulnerability; and access to education. Access is through the Certificado Único Oncopediátrico (CUOP): the treating professional registers the child in the national childhood cancer registry, ROHA, with the required documents, and the Ministry's programme audits the record and emails the certificate. The Ministry's page does not say who pays during the leave; article 13 of the law makes it leave without pay from the employer, during which the social security administration (ANSES) pays the worker a sum equal to the salary, under the conditions and ceilings set by regulation. An orange certificate covers active treatment and all benefits; a blue control certificate, after treatment ends and until five years from diagnosis or age 18, keeps transport and education. A relapse recorded in ROHA reactivates the orange certificate. Since Decree 459/2025 the Ministry of Health is the law's enforcement authority.",
          links: [
            { label: "Dirección Nacional del Cáncer: Ley 27.674 and the Certificado Único Oncopediátrico", url: LEY_27674 },
            { label: "Ley 27.674, text, articles 9 and 13 (argentina.gob.ar/normativa)", url: LEY_27674_TEXT },
            { label: "Decreto 459/2025, article 18 (Internet Archive copy)", url: DEC459 },
          ],
        },
        {
          id: "drug-bank-equity",
          title: "A national bank of cancer medicines for people outside insurance",
          plain:
            "Argentina keeps a national bank of cancer medicines for people with public cover alone, 35.8% of the population in the 2022 census. Its stated purpose is to even out access between provinces: it supplies a cancer medicine when the patient's own province cannot, to people treated in a public hospital.",
          detail:
            "The Ministry describes the Banco de Drogas Especiales as complementary to provincial coverage, with the express aim of equalising standards of care and achieving greater equity in access to cancer medicines across the country, by supplying medicines when the patient's province of residence cannot provide them, for more than 100 cancer conditions. Patients whose national identity document is being processed can apply with proof of that; residents who have never had one can present a provisional residence certificate or, failing that, a note from their consulate. Treatment continues on a renewal form completed by the treating doctor every three treatment cycles, with the reports of the tests used to assess response for advanced disease, and a change because of side effects needs ANMAT's pharmacovigilance report form. Inside insurance, the same principle runs through the national package, which makes cancer medicines under approved protocols free to the patient. How many patients the bank supplies, what it spends and how long deliveries take were not found in a form that could be read; see the gaps.",
          links: [
            { label: "Ministerio de Salud: Banco de Drogas, requisitos", url: BANCO },
            { label: "INDEC: Censo 2022, Salud y previsión social (PDF)", url: CENSO_SALUD },
          ],
        },
        {
          id: "hereditary",
          title: "A national programme for familial cancer and an open database of hereditary variants",
          plain:
            "Since 2011 Argentina has had a national programme for people at high risk of cancer because of their family or their genes. The national cancer directorate also runs SITHER, a unified database of genetic variants in hereditary cancer that anyone can consult, and works to set up genetic counselling clinics in health centres.",
          detail:
            "The Programa Nacional de Cáncer Familiar (PROCAFA) was created in August 2011, the Ministry states, in response to the need for strategies of early detection and comprehensive management of people at high risk of cancer, which require molecular techniques and multidisciplinary prevention covering organic, emotional, social and cultural aspects. Among the directorate's listed functions are implementing the Sistema de Información de Tumores Hereditarios (SITHER), described as a unified, freely consulted database of genomic variants in hereditary cancer, and improving the quality of cancer centres through the creation of genetic counselling clinics, counselling spaces and palliative care teams. The colorectal programme sends people with a family history, polyposis, inflammatory bowel disease or criteria for Lynch syndrome to a risk-assessment clinic and colonoscopy rather than the stool test. How many variants SITHER holds and how many people PROCAFA has seen were not read for this page.",
          links: [
            { label: "Programa Nacional de Cáncer Familiar (PROCAFA)", url: PROCAFA },
            { label: "Dirección Nacional del Cáncer: misión y funciones", url: DNC_ABOUT },
            { label: "Programa Nacional de Prevención y Detección Temprana del Cáncer Colorrectal", url: PNCCR },
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
          id: "trials-in-argentina",
          title: "445 cancer trials in OnCo's records have a site in Argentina, almost all run by companies",
          plain:
            "Of the cancer trials OnCo holds, 445 list a site in Argentina on ClinicalTrials.gov, 362 of them phase 3. They are mostly large international company trials, led by MSD, Bristol-Myers Squibb, AstraZeneca and Roche, with lung cancer the commonest. OnCo found none led from Argentina among them.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph, retrieved from the registry on 7 October 2026 and recounted on 17 November 2026: 445 registered studies list Argentina among their countries, 362 phase 3, 41 phase 2, 23 phase 2/3, 18 phase 1/2 and 1 phase 1. An earlier count of 446 included one study twice, MOUNTAINEER-03 (NCT05253651), which OnCo's data also attaches to the record of the earlier MOUNTAINEER trial. By ClinicalTrials.gov status, 138 were recruiting, 201 active but not recruiting, 93 completed, 12 terminated and 1 not yet recruiting. The commonest lead sponsors are Merck Sharp & Dohme (63), Bristol-Myers Squibb (46), AstraZeneca (42), Hoffmann-La Roche (36) and Pfizer (26), and the commonest first-listed cancers non-small-cell lung cancer (94), prostate cancer (34) and hormone-receptor-positive breast cancer (30). The lead sponsors that are not companies are all academic groups abroad: ECOG-ACRIN (TMIST), the International Extranodal Lymphoma Study Group (IELSG37), the Histiocyte Society (LCH-III), the Queensland Centre for Gynaecological Cancer (LACC) and the Lymphoma Study Association; none of the 445 has an Argentine lead sponsor. Several company trials run in few countries with Argentina among them, such as Pfizer's study of PF-07104091 (NCT04553133, 4 countries) and Daiichi Sankyo's study of valemetostat with pembrolizumab (NCT06644768, 5 countries). Across all conditions, ClinicalTrials.gov listed 4,776 studies with a site in Argentina when OnCo counted in September 2026, and OpenAlex counts between 231 and 316 oncology papers a year with an author in Argentina from 2021 to 2025, 1,405 in all. The national cancer directorate also funds research grants and fellowships through its research promotion programme.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Argentina", url: "https://clinicaltrials.gov/search?cond=Cancer&locStr=Argentina&country=Argentina" },
            { label: "OpenAlex: oncology works by country", url: "https://openalex.org/" },
            { label: "Dirección Nacional del Cáncer: Programa de Promoción de la Investigación en Cáncer", url: INVEST },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-incidence-count",
      title: "No national count of new cancers, and no registry figures read",
      plain:
        "Argentina publishes a national count of cancer deaths but not of new cancers, so the number of people diagnosed each year on this page is IARC's estimate. The Ministry lists ten population registries, but their own latest figures were not read.",
      detail:
        "The Ministry's incidence page quotes GLOBOCAN 2024, and the 2024 mortality report says IARC's incidence depends on the population-based registries that meet the standard for Cancer Incidence in Five Continents, with data for 2013 to 2017 in its 2024 edition. The Ministry's page lists ten population-based registries and the populations they cover, but which of them meet that standard, and their own rates, were not read; Cancer Incidence in Five Continents itself was not opened. The hospital registry network RITA publishes no case counts that were found. Survival for adults in Argentina was not read either: only the childhood registry's survival figures are given. The gap between the 59,537 deaths counted and IARC's 71,570 is stated, not explained.",
      links: [
        { label: "Dirección Nacional del Cáncer: incidencia", url: INCIDENCIA },
        { label: "Dirección Nacional del Cáncer: registros de cáncer de base poblacional", url: RCBP },
        { label: "Ministerio de Salud: SIVER-Ca", url: SIVER },
      ],
    },
    {
      id: "access-times",
      title: "No measured time from approval abroad to registration or coverage in Argentina",
      plain:
        "How long an Argentine patient waits between a cancer medicine's approval in the United States or Europe and its registration, and then its coverage by an insurer, was not found in any official source. The law sets a deadline for registration, but no official source found for this page gives the total.",
      detail:
        "Decree 150/92 gives ANMAT 120 calendar days for an ordinary application and makes registration automatic for imports of medicines approved in an Annex I country, but ANMAT publishes no measured registration times for cancer medicines on the pages read. Amendments to Decree 150/92 after the ordered text ANMAT publishes, including any made since 2023, were not read. How a newly registered cancer medicine becomes part of an insurer's obligations, beyond the general rule of Resolution 310/2004, was not traced. Which cancer medicines are on the SURGE reimbursement annexes and the amounts were not read. CONETEC's list of published assessments is loaded by a script and was not read, so no cancer assessment is cited. The text of ANMAT Disposition 4008/17 was not read; the trial authorisation times come from the ANMAT staff poster.",
      links: [
        { label: "ANMAT: Decreto 150/92, texto ordenado", url: DEC150 },
        { label: "CONETEC (Ministerio de Salud)", url: CONETEC },
      ],
    },
    {
      id: "unreachable",
      title: "Sources and figures that could not be read on 4 November 2026",
      plain:
        "Some official sources did not answer or hid their content behind scripts: the national legislation pages, the live Boletín Oficial, the page of the Ministry's direct assistance office for medicines, and the IARC screening fact sheets. Copies or other official texts were used where they existed, and the gaps are listed here.",
      detail:
        "The Ministry's legislation pages (argentina.gob.ar/normativa) returned server errors, and the live Boletín Oficial timed out, so Decrees 459/2025 and 344/2023 were read from Internet Archive copies and Resolutions 731/2023, 201/2002 and 623/2018 from Ministry of Health copies. On 17 November 2026 both answered: the text of Law 27.674 was read on the legislation pages, and the live Boletín Oficial returned Decree 459/2025. The page of the Ministry's Dirección de Asistencia Directa por Situaciones Especiales returned not found, so what it offers is not described. IARC's CanScreen5 fact sheets for Argentina load by script. PAMI's plan page carries, in markup that is not displayed, figures on the share of people in cancer treatment who are its members; because the page does not show them, they are not used. No national survey of screening uptake later than 2018 was found, and SITAM's own figures were not published on the pages read. The Banco de Drogas list read is a file created in March 2023; whether a newer list exists was not established.",
      links: [
        { label: "Ministerio de Salud: Banco de Drogas", url: BANCO },
        { label: "INDEC: 4° Encuesta Nacional de Factores de Riesgo (PDF)", url: ENFR_2018 },
      ],
    },
  ],
  institutions: [
    "inc-argentina", "roha-argentina", "instituto-roffo", "instituto-alexander-fleming", "hospital-italiano-buenos-aires", "hospital-garrahan",
    "anmat", "superintendencia-servicios-salud-argentina", "pami-argentina", "conetec-argentina", "lalcec", "incucai-hsc-donor-registry", "iarc",
  ],
  companies: ["merck", "bms", "astrazeneca", "roche-genentech", "pfizer"],
  drugs: ["nivolumab", "pembrolizumab"],
  trials: [
    "mountaineer-03", "nct04553133", "nct06644768", "nct04606771", "nct07541170", "nct07054190", "nct04906395", "nct05951179", "lch-iii", "tmist",
    "ielsg37", "nct06428396", "nct07634471", "nct04940052", "keynote-671", "checkmate-649", "destiny-breast09", "flaura2", "mariposa", "monaleesa-2",
    "natalee", "cleopatra", "aphinity", "katherine", "impower150", "topaz-1", "keynote-966", "lacc",
  ],
  papers: [],
  people: ["susana-blanco", "florencia-moreno", "roxana-del-aguila", "esteban-langlois"],
  how:
    "Every card was written from Argentine official sources read in Spanish: the Ministry of Health's report on cancer mortality in 2024 and its incidence and mortality pages, the childhood cancer registry's 2025 book, Decree 459/2025, the 2022 census volume on health coverage, the resolutions that set the national package of care, the prepaid medicine law, the Superintendencia's resolution creating SURGE, PAMI's pages, the Banco de Drogas page and its medicine list, Decree 344/2023 and CONETEC's pages, ANMAT's ordered text of Decree 150/92 and its pages, an ANMAT staff analysis of trial authorisation times, the national screening programmes' pages, the 2018 National Risk Factor Survey, the page on Law 27.674 and the law's text. Each figure was checked against the raw text of the PDF or page rather than a summary. GLOBOCAN figures come from IARC's 2024 data and fact sheet. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are ANMAT, the Superintendencia, PAMI, CONETEC, the childhood cancer registry and the Hospital Garrahan.",
  verify:
    "Incidence on this page is IARC's estimate, not a count. Coverage of a cancer medicine depends on whether you have an obra social, a prepaid plan, PAMI or public cover alone, and on the protocol and list in force: before relying on it, ask the insurer or the treating hospital, and for the drug bank, check the current list. The national cancer institute became a directorate of the Ministry in 2025, so older documents use its former name.",
  verifyLinks: [
    { label: "Mortalidad por Cáncer en Argentina 2024 (PDF)", url: MORT_2024 },
    { label: "Ministerio de Salud: Banco de Drogas", url: BANCO },
    { label: "PAMI: medicamentos oncológicos", url: PAMI_MEDS },
    { label: "CONETEC", url: CONETEC },
  ],
};
