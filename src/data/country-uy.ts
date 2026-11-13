import type { CountryDive } from "@/data/country-dive";

/**
 * Uruguay deep dive: the hand-written cards for /countries/uy/ (wave 10). Every figure was read in Spanish from the raw
 * text of its source on 11 November 2026, not from a summary of it: the Registro Nacional de Cáncer's November 2025
 * report on the epidemiological situation (PDF text, incidence 2017 to 2021 and mortality to 2023), the Comisión
 * Honoraria de Lucha contra el Cáncer's pages on its registry, mammography, cervical screening and electronic oncology
 * record, the laws and decrees as published by IMPO (Leyes 16.097, 16.343, 17.242, 18.211, 18.256 and 19.723; Decretos
 * 18/020 and 158/019), the Fondo Nacional de Recursos' pages and its 2023 annual report (PDF text), the Ministry of
 * Public Health's medicines and formulary pages, the ICSID case page and award in Philip Morris v. Uruguay (PDF text),
 * WHO's Cancer Country Profile 2020 for Uruguay (PDF text), WHO's HPV coverage rows from its public data API, the World
 * Bank's health expenditure series from its API, ASSE's 2013 centenary page for the Instituto Nacional del Cáncer, IARC's
 * GLOBOCAN 2024 fact sheet for Uruguay, a ClinicalTrials.gov API count, and the papers' abstracts through Europe PMC.
 * Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/858-uruguay-fact-sheet.pdf";
const RNC = "https://www.comisioncancer.org.uy/Ocultas/Registro-Nacional-de-Cancer-uc11";
const RNC_ABOUT = "https://www.comisioncancer.org.uy/Institucional/Registro-Nacional-de-Cancer-uc201";
const RNC_2025 = "https://www.comisioncancer.org.uy/aucdocumento.aspx?108,2188";
const CHLCC_MAMA = "https://www.comisioncancer.org.uy/Institucional/Prevencion-y-diagnostico-oportuno-de-cancer-de-mama-uc204";
const CHLCC_CX = "https://www.comisioncancer.org.uy/Institucional/Prevencion-y-diagnostico-oportuno-del-cancer-de-cuello-uterino-uc205";
const CHLCC_HCEO = "https://www.comisioncancer.org.uy/Institucional/Historia-Clinica-Electronica-Oncologica-uc207";
const CHLCC_IMPACT = "https://www.comisioncancer.org.uy/Ocultas/Mision-ImPACT-uc296";
const LEY_16097 = "https://www.impo.com.uy/bases/leyes/16097-1989";
const LEY_17242 = "https://www.impo.com.uy/bases/leyes/17242-2000";
const LEY_18211 = "https://www.impo.com.uy/bases/leyes/18211-2007";
const LEY_18256 = "https://www.impo.com.uy/bases/leyes/18256-2008";
const LEY_19723 = "https://www.impo.com.uy/bases/leyes/19723-2018";
const DEC_18_020 = "https://www.impo.com.uy/bases/decretos/18-2020";
const DEC_158_019 = "https://www.impo.com.uy/bases/decretos/158-2019";
const MSP_MEDS = "https://www.gub.uy/ministerio-salud-publica/tematica/medicamentos";
const MSP_FTM = "https://www.gub.uy/ministerio-salud-publica/formulario-terapeutico-de-medicamentos-FTM";
const FNR_WHAT = "https://www.fnr.gub.uy/que-es-el-fondo-nacional-de-recursos/";
const FNR_HISTORY = "https://www.fnr.gub.uy/historia/";
const FNR_BREAST = "https://www.fnr.gub.uy/noticia_slide/octubre-rosa-2026/";
const FNR_LUNG = "https://www.fnr.gub.uy/pagina_de_presentaci/tratamiento-cancer-de-pulmon/";
const FNR_2023 = "https://www.fnr.gub.uy/wp-content/uploads/2024/11/memoria_2023.pdf";
const WB_OOP = "https://api.worldbank.org/v2/country/URY/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/URY/indicator/SH.XPD.CHEX.GD.ZS?format=json";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/ury-2020.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'URY'%20and%20startswith(ANTIGEN,'PRHPV')";
const ICSID_CASE = "https://icsid.worldbank.org/cases/case-database/case-detail?CaseNo=ARB/10/7";
const ICSID_AWARD = "https://icsidfiles.worldbank.org/icsid/ICSIDBLOBS/OnlineAwards/C1000/DC9012_En.pdf";
const SALUD_FARMACOS = "https://www.saludyfarmacos.org/boletin-farmacos/boletines/ago202503/20_ur/";
const ASSE_INCA = "https://www.asse.com.uy/contenido/ASSE-celebro-el-100-aniversario-del-Instituto-Nacional-del-Cancer-6879";
const CTGOV = "https://clinicaltrials.gov/search?country=Uruguay&cond=cancer";

export const UY_DIVE: CountryDive = {
  iso2: "UY",
  iso3: "URY",
  name: "Uruguay",
  flag: "🇺🇾",
  asOf: "2026-11-11",
  title: "Cancer in Uruguay",
  description:
    "Cancer in Uruguay from Uruguayan sources: IARC's estimate of 16,448 new cancers and 8,789 deaths in 2024, built on a national cancer registry IARC rates in its highest quality class, the integrated national health system of 2007 and the Fondo Nacional de Recursos that pays for high-cost cancer medicines for everyone in it, medicines regulated inside the Ministry of Public Health, a paid day off work for screening, the tobacco laws Uruguay defended against Philip Morris, childhood cancer care with five-year survival above 79%, and why no trial in our records has a site in Uruguay.",
  lede:
    "Uruguay counts every new cancer in the country through a national registry, and the counts are high: about 17,200 new cancers and 8,200 cancer deaths a year in 2017 to 2021, in a population of about 3.4 million. Breast, prostate, colorectal and lung cancer make up almost half. Cancer death rates have fallen since 1990, but lung cancer in women is rising, and the country's response has leaned heavily on tobacco control laws, which it defended in international arbitration.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Uruguay is 16,448 new cancers and 8,789 deaths, an age-standardised incidence of 272.8 per 100,000 (312.9 in men, 248.2 in women), including 714 non-melanoma skin cancers. IARC's fact sheet gives its incidence source as a national registry, with trends in national rates projected to 2024, and its mortality source as national WHO data, which for Uruguay, the registry's report says, are the deaths reported by the Ministry of Public Health. So the estimate rests on Uruguay's own counts rather than on borrowed rates: the Registro Nacional de Cáncer recorded an average of 17,178 new cancers a year in 2017 to 2021, or about 14,200 excluding non-melanoma skin cancer, and 8,211 cancer deaths a year. Excluding skin cancer, IARC's 2024 estimate (15,734) is higher than the registry's average for 2017 to 2021, which is consistent with IARC's stated method of projecting national rates forward to 2024. The registry counts far more non-melanoma skin cancers than IARC's figure (about 3,000 a year against 714); it records one basal cell carcinoma per person and up to two squamous cell carcinomas, and warns that these cancers are hard to count completely, so the two figures are not directly comparable. The registry's own rates for 2017 to 2021 are in the table below; for the main cancers they sit close to IARC's, for example breast 77.3 per 100,000 (IARC 76.3) and prostate 56.0 (IARC 57.5).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Uruguay",
      aside: { label: "Registro Nacional de Cáncer: situación epidemiológica, November 2025 (PDF)", url: RNC_2025 },
      cards: [
        {
          id: "shape",
          title: "About 17,000 new cancers a year in 3.4 million people, with high rates of breast, colorectal and lung cancer",
          plain:
            "Uruguay's national registry recorded about 17,200 new cancers and 8,200 cancer deaths a year in 2017 to 2021. Its incidence is close to that of countries with very high human development, and IARC puts the risk of cancer before age 75 at 27%. Death rates are higher relative to cases than in developed countries, and stomach, oesophageal and cervical cancer are still more common than there.",
          detail:
            "The registry's November 2025 report counts 85,891 new cancers in 2017 to 2021 and 41,055 cancer deaths. Breast, prostate, colorectal and lung cancer made up 48% of cancers other than non-melanoma skin cancer. In women, breast cancer averaged 2,067 new cases and 708 deaths a year, colorectal cancer 854 cases and lung cancer 477; in men, prostate cancer averaged 1,424 cases, lung cancer 1,084 and colorectal cancer 912, and lung cancer remained the commonest cause of cancer death in men, with 978 deaths a year against 402 in women. The report puts Uruguay's all-sites incidence at about 262 per 100,000 excluding skin cancer, close to the very high Human Development Index group, while its mortality is less favourable than in developed countries, and says that cancers linked to tobacco account for more than half of cancer deaths. IARC's GLOBOCAN 2024 fact sheet gives 16,448 new cancers (8,370 in men and 8,078 in women), 8,789 deaths and 45,581 people living within five years of a diagnosis; a cumulative risk before age 75 of 31.0% in men and 23.9% in women; and breast (2,212), colorectal (2,156), lung (1,723) and prostate cancer (1,608) as the commonest. WHO's 2020 cancer profile counts 96 cancers a year in children aged 0 to 14.",
          links: [
            { label: "Registro Nacional de Cáncer: situación epidemiológica del Uruguay en relación al cáncer, November 2025 (PDF)", url: RNC_2025 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Uruguay (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Uruguay (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "trends",
          title: "Death rates falling since 1990, but lung cancer in women rising by more than 3% a year",
          plain:
            "Age-standardised cancer death rates in Uruguay have fallen since 1990 in both sexes, in men mostly because fewer get lung cancer. In women the fall stopped in 2012: lung cancer in women is rising by about 3.5% a year, and it now kills almost three times as many women as cervical cancer. Colorectal and breast cancer are rising in younger adults.",
          detail:
            "The registry's joinpoint analysis finds all-sites incidence (excluding skin cancer) stable in men from 2002 to 2021 (annual change -0.05%, not significant) and rising slightly in women (0.38% a year). Lung cancer incidence rose by 3.65% a year in women and fell by 1.14% a year in men; lung cancer mortality in women is rising by 3.43% a year, and lung cancer is now the second cause of cancer death in women. All-sites mortality fell in women by 0.57% a year to 2012 and has been flat since (0.09%, not significant); in men it fell, with a steeper fall from 2019 (-2.5% a year). Prostate cancer mortality fell by 1.98% a year from 2004; cervical cancer incidence fell overall (-1.31% a year) but has been stable since 2013. Stomach cancer incidence fell, and death rates from stomach and oesophageal cancer fell in both sexes; the incidence of kidney, pancreatic and testicular cancer and melanoma rose. A registry analysis of 2002 to 2017 found colorectal cancer incidence rising by 3.1% a year in men and 2.1% in women aged 40 to 49, and the report cites a rise of 0.99% a year in breast cancer in women under 45. An age-period-cohort study projected a 69% rise in the yearly number of lung cancers in women by 2035.",
          links: [
            { label: "Registro Nacional de Cáncer: situación epidemiológica, November 2025, trends sections (PDF)", url: RNC_2025 },
            { label: "Musetti et al., colorectal cancer in young and older adults in Uruguay (Int J Environ Res Public Health 2021)", url: "https://doi.org/10.3390/ijerph18158232" },
            { label: "Alonso et al., lung cancer incidence trends in Uruguay 1990 to 2014 (Cancer Epidemiol 2018)", url: "https://doi.org/10.1016/j.canep.2018.04.012" },
          ],
        },
      ],
      tables: [
        {
          id: "uy-registry",
          title: "What the Registro Nacional de Cáncer counted, 2017 to 2021",
          caption: "Main cancers by sex: average new cases and deaths a year, and age-standardised (world) incidence and mortality per 100,000. Period 2017 to 2021.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "sex", label: "Sex" },
            { key: "cases", label: "New cases a year", numeric: true },
            { key: "inc", label: "Incidence per 100,000", numeric: true },
            { key: "deaths", label: "Deaths a year", numeric: true },
            { key: "mort", label: "Mortality per 100,000", numeric: true },
          ],
          rows: [
            { site: "Breast", sex: "Women", cases: 2067, inc: 77.28, deaths: 708, mort: 20.8 },
            { site: "Prostate", sex: "Men", cases: 1424, inc: 55.97, deaths: 563, mort: 16.94 },
            { site: "Lung", sex: "Men", cases: 1084, inc: 44.18, deaths: 978, mort: 39.16 },
            { site: "Colorectal", sex: "Men", cases: 912, inc: 35.9, deaths: 518, mort: 18.63 },
            { site: "Colorectal", sex: "Women", cases: 854, inc: 24.72, deaths: 479, mort: 11.37 },
            { site: "Lung", sex: "Women", cases: 477, inc: 15.84, deaths: 402, mort: 12.71 },
            { site: "Bladder", sex: "Men", cases: 459, inc: 17.17, deaths: 202, mort: 6.61 },
            { site: "Kidney", sex: "Men", cases: 426, inc: 18.5, deaths: 180, mort: 6.95 },
            { site: "Pancreas", sex: "Women", cases: 360, inc: 9.21, deaths: 334, mort: 8.16 },
            { site: "Cervix", sex: "Women", cases: 313, inc: 14.19, deaths: 143, mort: 5.66 },
            { site: "Pancreas", sex: "Men", cases: 306, inc: 11.86, deaths: 285, mort: 10.78 },
          ],
          note: "Invasive cancers only. The registry covers the whole country; all cancers together averaged 17,178 new cases a year including non-melanoma skin cancer (about 14,200 without it) and 8,211 deaths. Colorectal is ICD-O-3 C18 to C20 and excludes the anus. Rates use person-years interpolated from the 2004 and 2011 censuses.",
          sources: [
            { label: "Registro Nacional de Cáncer: situación epidemiológica, November 2025, figures 7 to 10 (PDF)", url: RNC_2025 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry run by the cancer commission",
      aside: { label: "Comisión Honoraria de Lucha contra el Cáncer: Registro Nacional de Cáncer", url: RNC },
      cards: [
        {
          id: "registry-rnc",
          title: "One registry for the whole country, rated in IARC's highest quality class",
          plain:
            "Uruguay's Registro Nacional de Cáncer counts new cancers across the whole country, not only in one city. It is run by the Comisión Honoraria de Lucha contra el Cáncer, a public body created by law in 1989. IARC rates its data class A, and they were the first national data from Uruguay published in IARC's Cancer Incidence in Five Continents.",
          detail:
            "Decreto 246/984 of 15 June 1984 requires every professional to report each cancer diagnosed in Uruguay, and Ley 16.097 of 1989 created the commission, with the registry's director on its board. The registry itself notes an ambiguity: cancer is not on the ministry's list of notifiable diseases (Decreto 64/004), and there is no sanction for not reporting. So it relies mainly on active case finding, by about 30 data finders who review pathology and clinical records in every department of the interior and in Montevideo's hospitals and laboratories, with each case captured from several sources and then de-duplicated, which is why its incidence is published years behind the calendar. Its data appeared in volume X of Cancer Incidence in Five Continents and were rated class A (high quality national data) by IARC; the November 2025 report cites volume XI as the source of IARC's estimates for Uruguay. The registry says it works with the ministry's national cancer control programme and is an IARC collaborating centre for advising other registries in the region. It publishes atlases of incidence (2017 to 2021) and mortality (2019 to 2023), figures by department, and summaries for each common cancer.",
          links: [
            { label: "CHLCC: what the national cancer registry does", url: RNC_ABOUT },
            { label: "CHLCC: Registro Nacional de Cáncer, publications", url: RNC },
            { label: "IMPO: Ley 16.097 (29 October 1989)", url: LEY_16097 },
            { label: "Garau et al., trends in cancer incidence in Uruguay 2002 to 2015 (Colomb Med 2019)", url: "https://doi.org/10.25100/cm.v50i4.4212" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: an integrated national system, and one national fund for high-cost care",
      aside: { label: "Fondo Nacional de Recursos: what the fund is", url: FNR_WHAT },
      cards: [
        {
          id: "snis",
          title: "The integrated national health system since 2007, and 17% of health spending paid out of pocket",
          plain:
            "Since a 2007 law every resident of Uruguay has a right to comprehensive health care through the Sistema Nacional Integrado de Salud, which joins the public provider ASSE and private providers. Every provider must offer the services in the ministry's care plan and the medicines on its national formulary. Households paid about 17% of health spending directly in 2023.",
          detail:
            "Ley 18.211 of 5 December 2007 regulates the right to health protection of all residents and charges the Ministerio de Salud Pública with implementing the integrated system, which joins public and private providers of comprehensive care; its principles include universal coverage, continuity and timeliness of care and the informed choice of provider. Two funds pay for the services in the Plan Integral de Atención a la Salud (PIAS): the Fondo Nacional de Salud (FONASA), built from contributions, and the Fondo Nacional de Recursos for high-cost care. The ministry's Formulario Terapéutico de Medicamentos is the compulsory positive list from which every provider builds its own formulary. In the World Bank's series from WHO's Global Health Expenditure Database, out-of-pocket payments were 17.1% of current health spending in 2023, down from 25.9% in 2005, current health spending was 9.0% of gross domestic product, and government spending was 72.4% of the total. Uruguay's health minister said in 2025, as reported by the Salud y Fármacos bulletin, that about 300 procedures and medicines are outside the PIAS; the same bulletin, citing a Spanish health news site, says treatments outside the PIAS leave some patients to pay large sums or go to court.",
          links: [
            { label: "IMPO: Ley 18.211, creation of the Sistema Nacional Integrado de Salud (5 December 2007)", url: LEY_18211 },
            { label: "MSP: Formulario Terapéutico de Medicamentos", url: MSP_FTM },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Uruguay (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure, % of GDP, Uruguay (API)", url: WB_CHE },
            { label: "Salud y Fármacos: Uruguay moves towards its first medicines regulatory agency (2025)", url: SALUD_FARMACOS },
          ],
        },
        {
          id: "fnr",
          title: "The Fondo Nacional de Recursos pays for high-cost cancer medicines for everyone in the system",
          plain:
            "Uruguay pools the cost of rare, expensive care in one national fund, the Fondo Nacional de Recursos, instead of leaving each provider to pay. Since 2005 it has bought high-cost medicines for the conditions the ministry lists, including breast cancer drugs such as trastuzumab and pembrolizumab and lung cancer drugs such as osimertinib, for patients of any provider.",
          detail:
            "The fund started on 1 December 1980 and is governed by Ley 16.343 of 1992; it acts as a reinsurer for every public and private provider, giving universal financial cover for high-complexity procedures, devices and high-cost medicines to everyone covered by the national system. Most of its money is a fixed monthly quota for each FONASA contributor; the economy ministry reimburses the cost for public-system patients who do not contribute. Article 313 of the 2005 budget law added high-cost medicines, beginning with tyrosine kinase inhibitors for leukaemia and GIST, rituximab for non-Hodgkin lymphoma, and trastuzumab and fulvestrant for breast cancer; cetuximab for colon cancer and daratumumab for myeloma were added in 2023, when it authorised 4,980 new medicine treatments for all conditions, 7.5% more than in 2022. Its pages list cover for breast cancer (fulvestrant, lapatinib, pertuzumab, trastuzumab emtansine, trastuzumab, ribociclib and pembrolizumab), with 714 treatment requests authorised in 2025, and for lung cancer (erlotinib, gefitinib, osimertinib, alectinib, atezolizumab, atezolizumab with bevacizumab and pembrolizumab), each under a written coverage rule. The treating doctor requests the medicine from the fund, which negotiates the price and buys it. Under article 462 of Ley 19.355 (2015), a medicine the fund will pay for can be added to the formulary only after a technical report from the Faculty of Medicine, the medical profession, the ministry and the fund.",
          links: [
            { label: "FNR: what the Fondo Nacional de Recursos is", url: FNR_WHAT },
            { label: "FNR: history", url: FNR_HISTORY },
            { label: "FNR: breast cancer treatment authorisations in 2025", url: FNR_BREAST },
            { label: "FNR: lung cancer treatment", url: FNR_LUNG },
            { label: "FNR: annual report 2023 (PDF)", url: FNR_2023 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: medicines are approved inside the Ministry of Public Health",
      aside: { label: "MSP: medicines", url: MSP_MEDS },
      cards: [
        {
          id: "msp-medicines",
          title: "A Medicines Department under 2020 rules, and a plan for a separate agency",
          plain:
            "Uruguay has no separate medicines agency: the Ministry of Public Health's Medicines Department registers medicines and watches their safety. Registration follows a 2020 decree that replaced rules from 1999, and since 2015 the law has required a favourable technical report on efficacy and safety before a medicine is registered. The government has proposed a separate agency.",
          detail:
            "Decreto 18/020 of 13 January 2020 approved the regulation for the registration, production, export, import and sale of medicines for human use, replacing Decreto 324/999 after twenty years so as to take account of regional and international regulatory advances; it cites as its basis Ley 9.202 of 1934 and Decreto-Ley 15.443 of 1983. The ministry's medicines pages are run by the Departamento de Medicamentos, whose pharmacovigilance unit issues safety communications, and Uruguay harmonises some rules within MERCOSUR. Article 462 of Ley 19.355 (2015), as quoted by the Fondo Nacional de Recursos, requires a favourable technical report on efficacy and safety before a medicine is registered. In 2025 the government proposed a Uruguayan health surveillance agency (AUVISA); according to the Salud y Fármacos bulletin, citing El País, two earlier attempts in 2008 and 2020 failed, the proposal foresaw about 246 staff, and a senator has proposed automatic recognition of medicines approved by reference agencies such as the US FDA and the EMA. OnCo did not find the law creating the agency or a WHO maturity level for Uruguay; see the gaps.",
          links: [
            { label: "IMPO: Decreto 18/020, regulation for the registration of medicines (13 January 2020)", url: DEC_18_020 },
            { label: "MSP: medicines, Departamento de Medicamentos", url: MSP_MEDS },
            { label: "FNR: history, quoting article 462 of Ley 19.355", url: FNR_HISTORY },
            { label: "Salud y Fármacos: Uruguay moves towards its first medicines regulatory agency (2025)", url: SALUD_FARMACOS },
          ],
        },
        {
          id: "research-ethics",
          title: "Clinical research: approval by an accredited ethics committee, and trials must meet national needs",
          plain:
            "Before any study in people can start in Uruguay, an institutional research ethics committee accredited by the Ministry of Public Health must approve it. A 2019 decree adds that international studies run in Uruguay must also answer the country's own health needs.",
          detail:
            "Decreto 158/019 of 3 June 2019 approved the text drawn up by the National Research Ethics Commission, attached to the ministry's Directorate General of Health, on research in human beings, replacing Decreto 379/008. It requires every public and private institution, sponsor and investigator to follow it; every study needs prior approval by an accredited institutional ethics committee, with its protocol; the ministry accredits those committees on criteria drawn up with the national commission, which oversees them. Transnational research with people in Uruguay must also respond to national health needs, and the decree set up a working group to design cover for treatment costs and compensation for harm to research participants. The ministry's evaluation area lists research projects in human beings among its procedures. OnCo did not find a published target time for authorising a cancer trial in Uruguay.",
          links: [
            { label: "IMPO: Decreto 158/019, research in human beings (3 June 2019)", url: DEC_158_019 },
            { label: "MSP: Área de Evaluación Sanitaria", url: "https://www.gub.uy/ministerio-salud-publica/evaluacion-sanitaria" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "CHLCC: breast cancer prevention and the mammography programme", url: CHLCC_MAMA },
      cards: [
        {
          id: "screening-law",
          title: "A paid day off work for a screening test, and mammography offered by every provider",
          plain:
            "Since 2000, Uruguayan law has given every working woman, public or private, one paid day off a year to have a Pap test or mammogram; a 2024 amendment added the HPV test. Since 2006 the ministry has required every provider to offer regular mammography; the cancer commission took mammograms round the country in mobile units from 1998 to 2017.",
          detail:
            "Ley 17.242 of 20 June 2000 declared the prevention of breast and genital cancers of public interest and gives women working in the private sector and public employees the right to one day a year of special paid leave to have the HPV test, a Pap test, a mammogram or other tests recommended by the ministry for breast and cervical cancer; the HPV test was written in by Ley 20.361 of 20 September 2024. Health centres that issue the health card (carné de salud) must make it possible to do these tests at the same time. The commission's mammography programme ran from 1998 with six mobile units, two trailers in Montevideo and four vans, cost about 14 million US dollars and ended in late 2017, after a 2006 ministry ordinance obliged all providers to offer periodic mammography; the commission reports 200 mammographs in the country and breast cancer mortality falling from 25.6 per 100,000 in 1998 to 21.7 in 2016. WHO's 2020 profile records an organised cervical screening programme by Pap smear with participation of 70% or more, a breast screening programme starting at age 50, and early detection guidelines for breast, cervical, colorectal and childhood cancers.",
          links: [
            { label: "IMPO: Ley 17.242, paid leave for Pap test and mammography (as amended by Ley 20.361)", url: LEY_17242 },
            { label: "CHLCC: breast cancer prevention and the mammography programme", url: CHLCC_MAMA },
            { label: "WHO: Cancer Country Profile 2020, Uruguay (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "cervix-hpv",
          title: "Cervical screening support passed to the ministry in 2012, HPV vaccine for girls and boys",
          plain:
            "The cancer commission's support for cervical screening passed to the Ministry of Public Health in 2012, and the commission now measures coverage and checks laboratory quality. The HPV vaccine is offered to girls and boys: in 2025, 78% of girls and 70% of boys in the target group had a first dose, and 57% of girls and 45% of boys completed the course.",
          detail:
            "The commission's cervical cancer prevention area, set up in 1994, bought reagents and equipment for 12 public cytology laboratories and paid 60 staff until 2012, when these functions passed to the ministry under its ordinance 466. It now records Pap test coverage for the public and private providers, records internal quality control in the public provider's cytology laboratories and offers external quality control (it is accredited for this under ISO/IEC 17043), and follows up individually women in the public system with results of ASC-H or worse. Since 2014 it has represented Uruguay in IARC's ESTAMPA study, which is laying the ground for HPV testing as the primary screening test in nine Latin American countries. In the HPV coverage rows Uruguay reported to WHO, first-dose coverage in girls was 77% in 2024 and 78% in 2025 and last-dose coverage 54% and 57%; boys appear from 2019, with first-dose coverage of 68% in 2024 and 70% in 2025 and last-dose coverage of 42% and 45%. Coverage was lower in 2020 to 2022, when last-dose coverage in girls was 37% to 44%.",
          links: [
            { label: "CHLCC: cervical cancer prevention", url: CHLCC_CX },
            { label: "WHO immunisation data: HPV programme coverage rows for Uruguay (API)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Uruguay does",
      title: "What Uruguay does differently",
      cards: [
        {
          id: "tobacco",
          title: "Tobacco laws that went further than most, defended against Philip Morris and upheld in 2016",
          plain:
            "Uruguay banned smoking in enclosed public places and all tobacco advertising in 2008, required warnings covering 80% of the front and back of cigarette packs in 2009, allowed only one variant per brand, and passed a plain packaging law in 2018 that took effect in December 2019. Philip Morris challenged the warnings and the single-variant rule in international arbitration; in 2016 the tribunal dismissed its claims.",
          detail:
            "Ley 18.256 of 6 March 2008 protects the right to an environment free of tobacco smoke, banning smoking in enclosed spaces used by the public or for work and prohibiting every form of tobacco advertising, promotion and sponsorship, with health warnings on at least 50% of the main surfaces of packs. Ministry Ordinance 514 of 18 August 2008 allowed each brand a single presentation, and Decree 287/009 of 15 June 2009 raised the warnings to 80% of the front and back. Ley 19.723 of 21 December 2018 rewrote article 8 to require plain, standardised packaging, in force twelve months later and regulated by Decreto 120/019. Philip Morris Brands, Philip Morris Products and its Uruguayan subsidiary Abal Hermanos brought ICSID case ARB/10/7, registered on 26 March 2010; WHO and the Framework Convention secretariat filed a submission, and on 8 July 2016 the tribunal dismissed the claims and ordered the claimants to pay Uruguay 7 million US dollars towards its costs, with one arbitrator dissenting. A study comparing Uruguay with Argentina found cigarette consumption per person fell by 4.3% a year from 2005 to 2011; registry data show lung cancer falling in men and still rising in women.",
          links: [
            { label: "IMPO: Ley 18.256, smoke-free environments and tobacco control (6 March 2008)", url: LEY_18256 },
            { label: "IMPO: Ley 19.723, plain packaging (21 December 2018)", url: LEY_19723 },
            { label: "ICSID: Philip Morris v. Uruguay, case ARB/10/7", url: ICSID_CASE },
            { label: "ICSID: award of 8 July 2016 (PDF)", url: ICSID_AWARD },
            { label: "Abascal et al., tobacco control campaign in Uruguay (Lancet 2012)", url: "https://doi.org/10.1016/s0140-6736(12)60826-5" },
          ],
        },
        {
          id: "childhood",
          title: "Children's cancer: one referral centre run by a foundation with the public service, five-year survival above 79%",
          plain:
            "Most children with cancer in Uruguay are treated at one national referral centre that the Fundación Pérez Scremini runs together with the public health service ASSE, free to families. A 2026 report by its clinicians gives five-year survival above 79.6%, above the 60% target of WHO's Global Initiative for Childhood Cancer.",
          detail:
            "The report in the Revista Panamericana de Salud Pública describes a partnership, set in specific legislation, between ASSE and the Fundación Pérez Scremini to manage the national referral centre with the public children's hospital. The foundation cares for about 70% of children with cancer in the country. ASSE pays about 35% of the budget, for general hospital supplies and services, and donations pay the remaining 65%, including home-based care and the administration of benefits, which the authors say gives operational independence and the ability to invest quickly while keeping the public system's national coverage. Care is universal and at no cost to the patient, with psychosocial support built in, in line with WHO's CureAll approach. WHO's 2020 profile counts about 96 new cancers a year in children aged 0 to 14 and records a defined referral system and early detection guidelines for childhood cancer. The foundation's website was being rebuilt when OnCo read it, so the survival figure here is the report's; its cohort years are not in the abstract.",
          links: [
            { label: "Nion et al., childhood cancer in Uruguay: a public-private partnership (Rev Panam Salud Publica 2026)", url: "https://doi.org/10.26633/rpsp.2026.61" },
            { label: "WHO: Cancer Country Profile 2020, Uruguay (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "national-systems",
          title: "National systems for a small country: one registry, one fund, one public cancer institute, one oncology record",
          plain:
            "Being small, Uruguay runs several cancer services once for the whole country: a single registry, a single fund for high-cost medicines, and a national public cancer institute for adults in the public system. A ministry ordinance made a single electronic oncology record compulsory for every cancer service, though the commission says it is still waiting for the money to build it.",
          detail:
            "The Instituto Nacional del Cáncer, run by the public provider ASSE, is the national referral centre for adults with cancer in the public system; it began as the Instituto de Radiología in 1913, and at its centenary in 2013 its director said it gave about 2,000 cancer treatments a month, treated about 300 radiotherapy patients a month and covered almost 40% of the oncology done in the country. Under ministry ordinance 641, issued under Decreto 242/017 (the commission's page writes it 641/218), the Historia Clínica Electrónica Oncológica is the compulsory clinical information system for the country's oncology services, managed by the cancer commission, which says it would standardise protocols and give national statistics; the commission states that it is waiting for funding from the executive. The Fondo Nacional de Recursos pays for medicines and specialised procedures, including PET scanning and bone marrow transplantation, wherever the patient is insured. WHO's 2020 profile records bone marrow transplantation and pathology services as generally available.",
          links: [
            { label: "ASSE: centenary of the Instituto Nacional del Cáncer (29 November 2013)", url: ASSE_INCA },
            { label: "CHLCC: electronic oncology record", url: CHLCC_HCEO },
            { label: "FNR: what the Fondo Nacional de Recursos is", url: FNR_WHAT },
            { label: "WHO: Cancer Country Profile 2020, Uruguay (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and capacity",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Uruguay",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Uruguay. ClinicalTrials.gov itself returns 33 cancer studies with a site in Uruguay, 7 of them recruiting, most of them international trials and registries.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Uruguay among their countries. That reflects the trials OnCo holds, mostly large recent industry and academic trials, not every study in Uruguay. A search of the ClinicalTrials.gov API on the same day for cancer studies located in Uruguay returned 33, of which 7 were recruiting, among them trials run by the Canadian Cancer Trials Group, NRG Oncology and SWOG, and 110 studies of any condition. OpenAlex, in OnCo's snapshot of 8 September 2026, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Uruguay 72 works in 2021, 74 in 2022, 66 in 2023, 53 in 2024 and 65 in 2025, 330 in total, of which 259 are open access and 6 highly cited. The registry's staff wrote the three trend papers cited on this page, two of them with IARC co-authors, and the cancer commission lists support for research and a tumour bank among its work. Studies need prior approval by an accredited ethics committee under Decreto 158/019.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Uruguay (search)", url: CTGOV },
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "Garau et al., trends in cancer incidence in Uruguay 2002 to 2015 (Colomb Med 2019)", url: "https://doi.org/10.25100/cm.v50i4.4212" },
          ],
        },
        {
          id: "capacity",
          title: "Radiotherapy and imaging: WHO's 2020 counts, relative to the number of cancer patients",
          plain:
            "WHO's 2020 cancer profile for Uruguay counts 8.6 external beam radiotherapy machines, 41.1 mammographs, 29.8 CT scanners, 6.6 MRI scanners and 2.0 PET scanners for every 10,000 cancer patients. It records cancer surgery, radiotherapy and chemotherapy as available, and opioids for pain at 465 daily doses per million people a day.",
          detail:
            "The figures come from WHO's Cancer Country Profile 2020, which expresses equipment and staff per 10,000 cancer patients: external beam radiotherapy (photon and electron) 8.6 in 2019; mammographs 41.1, CT scanners 29.8, MRI scanners 6.6 and PET or PET-CT scanners 2.0 in 2020; surgeons 264.9 (2014), radiologists 103.3 and nuclear medicine physicians 21.2 (2019). The numbers of radiation oncologists and medical physicists are given as not available. Read against the 15,101 cancers WHO's profile estimates for 2018, 8.6 per 10,000 is about 13 radiotherapy machines; that is OnCo's arithmetic, not a count. The profile records an operational national cancer control plan and integrated non-communicable disease plan, cancer management guidelines, palliative care in the plan and generally available community and home-based palliative care, and availability of opioids for pain of 465 defined daily doses per million inhabitants per day in 2015 to 2017. OnCo could not read a newer count of radiotherapy machines by centre; see the gaps.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Uruguay (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "radiotherapy-now",
      title: "No current count of radiotherapy machines or centres",
      plain:
        "OnCo could not read a current list of Uruguay's radiotherapy centres and machines. The IAEA's DIRAC database returned an error to a plain request, and the cancer commission's page on the IAEA imPACT mission to Uruguay has no content. The radiotherapy figure here is WHO's 2019 rate per 10,000 cancer patients.",
      detail:
        "The IAEA's Directory of Radiotherapy Centres (DIRAC) query for Uruguay returned HTTP 500 on 11 November 2026, and no Internet Archive copy of a Uruguay result was used. The commission's page titled Misión ImPACT exists but displayed no text or documents, so OnCo could not read when the review took place or what it found. The Instituto Nacional del Cáncer's own site has gone (the address inca.com.uy now belongs to a paint company, and the former inca.gub.uy was read through the Internet Archive), so the institute's radiotherapy figures are its director's statements at the 2013 centenary, not a current count. Ask the treating service where radiotherapy will be given and how long the wait is.",
      links: [
        { label: "CHLCC: Misión ImPACT (page without content when read)", url: CHLCC_IMPACT },
        { label: "IAEA: DIRAC, Directory of Radiotherapy Centres", url: "https://dirac.iaea.org/" },
      ],
    },
    {
      id: "regulator-gaps",
      title: "No WHO maturity level, registration times or agency law found",
      plain:
        "OnCo found no published WHO maturity level for Uruguay's medicines regulation, no target or measured time for registering a new cancer medicine, and no law creating the proposed separate medicines agency. What is said here about that agency comes from a bulletin quoting a newspaper, not from the government.",
      detail:
        "The annex to Decreto 18/020, which holds the registration requirements, is published separately from the decree text on IMPO and was not read. The Ministry of Public Health's pages read here name its Medicines Department but do not give approval times. The proposal for a Uruguayan health surveillance agency (AUVISA), its staffing and budget, and the minister's statement that about 300 procedures and medicines are outside the PIAS, are taken from the Salud y Fármacos bulletin, which cites El País and Salud35; whether the 2025 to 2029 budget law created the agency was not verified. The list of every cancer medicine on the national formulary and its prescribing rules was not read, only the fund's breast and lung cancer pages.",
      links: [
        { label: "IMPO: Decreto 18/020", url: DEC_18_020 },
        { label: "Salud y Fármacos: Uruguay moves towards its first medicines regulatory agency (2025)", url: SALUD_FARMACOS },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: population-based survival for adults with cancer in Uruguay, the year the HPV vaccine was introduced, details of colorectal screening, and the Fondo Nacional de Recursos' cancer tables, which are images in its annual report.",
      detail:
        "No national survival figures for adults were found in the registry's 2025 report or the papers read; the 79.6% childhood survival is from one report by clinicians of the centre. WHO's HPV coverage rows for Uruguay begin in 2015, and the ministry's page on the vaccine could not be found at the addresses tried, so the year of introduction is not given. WHO's 2020 profile records early detection guidelines for colorectal cancer, but OnCo did not read the programme's own description, test or ages. The fund's 2023 report gives its counts of cancer treatments started by disease as images, so only the percentage changes in its text are used. The Fundación Pérez Scremini's website was under renovation. The registry's 2025 report cites its 2019 incidence trends paper with a DOI (10.25100/cm.v50i4.4199) that Europe PMC resolves to a different paper; the correct DOI, 10.25100/cm.v50i4.4212, is used here.",
      links: [
        { label: "Registro Nacional de Cáncer: situación epidemiológica, November 2025 (PDF)", url: RNC_2025 },
        { label: "FNR: annual report 2023 (PDF)", url: FNR_2023 },
        { label: "WHO immunisation data: HPV programme coverage rows for Uruguay (API)", url: WHO_HPV_API },
      ],
    },
  ],
  institutions: [
    "msp-uruguay", "chlcc-uruguay", "registro-nacional-cancer-uruguay", "fnr-uruguay", "inca-uruguay", "fundacion-perez-scremini",
    "iarc", "who", "iaea",
  ],
  companies: [],
  drugs: ["trastuzumab", "pertuzumab", "ribociclib", "pembrolizumab", "osimertinib", "cetuximab"],
  trials: [],
  papers: [
    "paper-garau-uruguay-incidence-trends-colombmed-2019", "paper-alonso-uruguay-lung-cancer-apc-canep-2018", "paper-musetti-uruguay-colorectal-young-adults-ijerph-2021",
    "paper-nion-uruguay-childhood-cancer-rpsp-2026", "paper-abascal-uruguay-tobacco-control-lancet-2012",
  ],
  people: ["mauricio-cuello"],
  how:
    "Every card was written from Uruguayan official sources read in Spanish from their raw text, and from international sources: the Registro Nacional de Cáncer's November 2025 report and the Comisión Honoraria de Lucha contra el Cáncer's pages; the laws and decrees as published by IMPO; the Fondo Nacional de Recursos' pages and 2023 annual report; the Ministry of Public Health's medicines and formulary pages; ASSE's page on the Instituto Nacional del Cáncer's centenary; the ICSID case page and award; WHO's 2020 cancer country profile and its HPV coverage rows; the World Bank's health expenditure series; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and the ClinicalTrials.gov API, and research output from OpenAlex. The new records for this page (the Ministry, the commission, the registry, the fund, the children's cancer foundation and five papers) carry their own sources; the Instituto Nacional del Cáncer was already in OnCo and its record was corrected.",
  verify:
    "Incidence and death figures are the national registry's, published several years after diagnosis, and IARC's 2024 figures are projections from them. Which medicines the Fondo Nacional de Recursos pays for, and on what conditions, is set in its coverage rules and changes; ask the treating doctor whether a medicine is covered by the fund, by your provider, or neither. Screening ages and the move to HPV testing are set by the Ministry of Public Health and may have changed since the sources here.",
  verifyLinks: [
    { label: "Ministerio de Salud Pública", url: "https://www.gub.uy/ministerio-salud-publica" },
    { label: "Comisión Honoraria de Lucha contra el Cáncer", url: "https://www.comisioncancer.org.uy/" },
    { label: "Fondo Nacional de Recursos", url: "https://www.fnr.gub.uy/" },
    { label: "Registro Nacional de Cáncer: situación epidemiológica, November 2025 (PDF)", url: RNC_2025 },
  ],
};
