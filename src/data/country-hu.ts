import type { CountryDive } from "@/data/country-dive";

/**
 * Hungary deep dive: the hand-written cards for /countries/hu/. Hungarian sources were read in Hungarian, from the raw
 * HTML of each page, not from a summary of it: the National Institute of Oncology's page for the National Cancer
 * Registry and the registry's own public query tool (stat.nrr.hu, the dataset closed on 20 October 2026, queried by
 * year with sexes in separate tables and summed here by ICD-10 code), the National Health Insurance Fund's pages on
 * individual equity support for medicines and its notice of 1 September 2026, the National Centre for Public Health
 * and Pharmacy's "about us" page, screening pages and notices of October and November 2026, and the Institute's
 * history page. In English: the OECD and European Commission's Country Cancer Profile Hungary 2025 (PDF text),
 * Eurostat's causes-of-death table for Hungary, IARC's GLOBOCAN 2024 fact sheet for Hungary, and six papers resolved
 * through Europe PMC. Every figure below is quoted from one of those; where a figure could not be read it is named
 * under `gaps`.
 */
const CCP = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-hu-2024-1670-en.pdf";
const NRR = "https://onkol.hu/nemzeti-rakregiszter-es-biostatisztikai-kozpont/";
const NRR_STAT = "https://stat.nrr.hu/";
const EUROSTAT_CD = "https://ec.europa.eu/eurostat/databrowser/view/hlth_cd_aro/default/table";
const IARC_FS = "https://gco.iarc.who.int/media/globocan/factsheets/populations/348-hungary-fact-sheet.pdf";
const NEAK_EGYEDI = "https://www.neak.gov.hu/felso_menu/lakossagnak/ellatas_magyarorszagon/gyogyszer_segedeszkoz_gyogyfuro_tamogatas/egyedi_tamogatas";
const NEAK_AFA = "https://www.neak.gov.hu/szakmai_kozlemenyek/tajekoztato-a-2026.-szeptember-1-tol-hatalyos-afa-csokkentes-alkalmazasarol-az-egyedi-meltanyossagi-engedely-alapjan-tamogatott-kizarolag--orvosi-rendelvenyhez-kotott-gyogyszerek-tb.-tamogatasanak-osszegerol-es-teritesi-dijarol";
const A444 = "https://444.hu/2026/04/23/valaszolt-az-eletmento-kezelesekrol-donto-alapitvany-felhalmozodtak-a-kerelmek-de-nincsenek-nagy-csuszasok";
const NNGYK_ROLUNK = "https://nngyk.gov.hu/hu/rolunk.html";
const ONI_NAME = "https://nngyk.gov.hu/hu/tovabbi-hirek/az-nngyk-uj-elnevezese-orszagos-nepegeszsegugyi-intezetre-oni.html";
const OGYEI_DOWN = "https://nngyk.gov.hu/hu/tovabbi-hirek/tajekoztatas-gyogyszereszeti-honlapjaink-atmeneti-elerhetetlensegerol.html";
const SZ_EMLO = "https://nngyk.gov.hu/hu/nepegeszsegugyi-celu-szuresi-koordinacios-osztaly/emloszures.html";
const SZ_MEHNYAK = "https://nngyk.gov.hu/hu/nepegeszsegugyi-celu-szuresi-koordinacios-osztaly/mehnyakszures.html";
const SZ_VASTAGBEL = "https://nngyk.gov.hu/hu/nepegeszsegugyi-celu-szuresi-koordinacios-osztaly/vastagbelszures.html";
const OOI_HIST = "https://onkol.hu/korhaztortenet/";
const EMA = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });

export const HU_DIVE: CountryDive = {
  iso2: "HU",
  iso3: "HUN",
  name: "Hungary",
  flag: "🇭🇺",
  asOf: "2026-11-11",
  title: "Cancer in Hungary",
  description:
    "Cancer in Hungary from Hungarian sources: 69,058 new cancers registered by the National Cancer Registry for 2023 and 30,998 cancer deaths, the highest cancer death rate in the EU in 2021, care paid for by one public insurer with a case-by-case route to medicines it does not reimburse, a medicines authority reorganised in 2023 and again in November 2026, three national screening programmes with falling participation, and a low-dose CT lung screening programme that found most cancers at stage I.",
  lede:
    "Hungary has counted its new cancers through a national registry since 2000, and anyone can query the counts online. It had the highest recorded cancer death rate in the EU in 2021, driven by lung and bowel cancer, although the rate has been falling. Care is paid for by one public insurer, and new cancer medicines have reached reimbursement slowly.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Hungary is 66,090 new cancers and 31,415 deaths in 2024, including 5,755 non-melanoma skin cancers (60,335 without them). IARC's fact sheet lists no country-specific incidence source for Hungary: it estimates new cases by applying modelled mortality-to-incidence ratios, built from neighbouring countries' registries, to national death figures, and projects deaths from WHO's national mortality data. The Hungarian National Cancer Registry's own count for 2023, read from its query tool, is 69,058 registered cancers excluding non-melanoma skin cancer, about 14% above GLOBOCAN's 60,335. The registry's own evaluation with IARC found its 2018 incidence 11.6% (men) and 14.6% (women) above IARC's estimates, mostly from cases coded to ill-defined or unspecified sites, and a 2024 check of its 2018 lung cancer cases cut them from 11,746 to 9,519, close to GLOBOCAN's 9,505 lung cancers for 2024. Deaths agree closely: Eurostat records 30,998 cancer deaths in Hungary in 2023, against GLOBOCAN's modelled 31,415 for 2024, and 8,050 lung cancer deaths against 8,066. Non-melanoma skin cancer is counted very differently: the registry registered 19,486 in 2023, GLOBOCAN estimates 5,755.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Hungary",
      aside: { label: "OECD/EC: Country Cancer Profile Hungary 2025 (PDF)", url: CCP },
      cards: [
        {
          id: "shape",
          title: "About 31,000 cancer deaths a year, and the EU's highest death rate",
          plain:
            "About 31,000 people die of cancer in Hungary each year, nearly one death in four in 2023. Lung cancer causes the most deaths, then bowel cancer and breast cancer. In 2021 Hungary had the highest cancer death rate in the EU, although it fell by 17% among men and 9% among women over the decade before.",
          detail:
            "Eurostat's causes-of-death table, built from the Hungarian Central Statistical Office's death registrations, records 30,998 deaths from malignant cancers (C00-C97) in Hungary in 2023, out of 128,176 deaths from all causes, or 24.2%. Lung cancer caused 8,050, colon, rectum and anus 4,771, breast 2,196 and pancreas 2,114. The OECD and European Commission's 2025 profile gives an age-standardised cancer mortality of 310 per 100,000 in 2021, the highest in the EU and 32% above the EU average, with lung (78 per 100,000), colorectal (50) and breast cancer (23) all the highest registered in the EU. Between 2011 and 2021 the rate fell by 17% among men and 9% among women, more than the average for Hungary's economic peers (12% and 7%). The profile says Hungary's high autopsy rate partly explains the recorded mortality, citing the HULC study, which found that 1,203 of 8,435 people who died of lung cancer in 2019 (14.24%) had no lung cancer recorded in insurance data while alive. In 2021, avoidable lung cancer mortality was 112% above the EU average for women and 88% above it for men.",
          links: [
            { label: "Eurostat: causes of death by country of residence and occurrence (hlth_cd_aro), Hungary 2021 to 2023", url: EUROSTAT_CD },
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 2 (PDF)", url: CCP },
            doi("10.3389/fonc.2022.1032366", "Kiss et al., post-mortem diagnosed lung cancer in Hungary, the HULC study (Front Oncol 2022)"),
          ],
        },
        {
          id: "registered-cases",
          title: "About 69,000 new cancers registered in 2023, led by bowel and lung cancer",
          plain:
            "Hungary's National Cancer Registry registered 69,058 new cancers in 2023, not counting the common, rarely dangerous skin cancers. Bowel cancer (10,278) and lung cancer (10,199) were the most frequent, then breast cancer (8,446) and prostate cancer (5,290). The registry's own staff say some of these counts are too high.",
          detail:
            "Summing the registry's query tool by ICD-10 code (dataset closed on 20 October 2026), registrations of malignant cancers excluding non-melanoma skin cancer (C00-C97 without C44) were 66,426 in 2021, 70,860 in 2022, 69,058 in 2023 and 64,933 in 2024; the registry warns that the latest year will change as hospitals send corrections, so the fall in 2024 may not be real. The OECD profile quotes preliminary registry data of 70,816 new cases for 2022, 74,249 for 2019 and about a 10% fall in incidence between 2018 to 2019 and 2020 to 2021, during the pandemic. The registry's 2023 evaluation with IARC found that it codes in ICD-10 rather than ICD-O, that only 57.8% of cases were confirmed by microscopy, and that its 2018 incidence ran 11.6% (men) and 14.6% (women) above IARC's estimates, mostly from cases coded to ill-defined sites. A 2024 study by the registry cut the 2018 lung cancer count from 11,746 reported to 9,519 after checking each case, and gave five-year overall survival of 14.8%.",
          links: [
            { label: "Nemzeti Rákregiszter: online query (stat.nrr.hu)", url: NRR_STAT },
            doi("10.1016/j.canep.2022.102306", "Wéber et al., data quality at the Hungarian National Cancer Registry, 2000 to 2019 (Cancer Epidemiol 2023)"),
            doi("10.1038/s41598-024-70143-w", "Kenessey et al., lung cancer in Hungary, patients diagnosed in 2018 (Sci Rep 2024)"),
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 2 and box 1 (PDF)", url: CCP },
          ],
        },
      ],
      tables: [
        {
          id: "nrr-registered",
          title: "New cancers registered by the Hungarian National Cancer Registry, 2021 to 2024, by site",
          caption: "Registered cases, both sexes, all ages, by ICD-10 code. Read from the registry's query tool (dataset closed 20 October 2026), men and women summed for this page.",
          columns: [
            { key: "site", label: "Site (ICD-10)" },
            { key: "y2021", label: "2021", numeric: true },
            { key: "y2022", label: "2022", numeric: true },
            { key: "y2023", label: "2023", numeric: true },
            { key: "y2024", label: "2024", numeric: true },
          ],
          rows: [
            { site: "All malignant cancers except C44 (C00-C97)", y2021: 66426, y2022: 70860, y2023: 69058, y2024: 64933 },
            { site: "Trachea, bronchus and lung (C33-C34)", y2021: 10018, y2022: 10352, y2023: 10199, y2024: 9535 },
            { site: "Colon, rectum and anus (C18-C21)", y2021: 9907, y2022: 10632, y2023: 10278, y2024: 9598 },
            { site: "Breast (C50)", y2021: 7765, y2022: 8505, y2023: 8446, y2024: 7956 },
            { site: "Prostate (C61)", y2021: 3895, y2022: 4733, y2023: 5290, y2024: 5549 },
            { site: "Bladder (C67)", y2021: 3025, y2022: 3226, y2023: 3322, y2024: 3093 },
            { site: "Melanoma of skin (C43)", y2021: 2465, y2022: 2821, y2023: 3014, y2024: 2984 },
            { site: "Pancreas (C25)", y2021: 2650, y2022: 2674, y2023: 2666, y2024: 2376 },
            { site: "Kidney (C64)", y2021: 1891, y2022: 2265, y2023: 2318, y2024: 2265 },
            { site: "Lip, oral cavity and pharynx (C00-C14)", y2021: 2520, y2022: 2620, y2023: 2241, y2024: 2136 },
            { site: "Corpus uteri (C54)", y2021: 1807, y2022: 1961, y2023: 1902, y2024: 1868 },
            { site: "Stomach (C16)", y2021: 1928, y2022: 1842, y2023: 1707, y2024: 1613 },
            { site: "Cervix uteri (C53)", y2021: 981, y2022: 1037, y2023: 999, y2024: 923 },
            { site: "Non-melanoma skin cancer (C44)", y2021: 14960, y2022: 18540, y2023: 19486, y2024: 20257 },
          ],
          note: "These are registrations, not checked incidence: the registry's own studies found its counts above IARC's estimates, and a case-by-case check cut 2018 lung cancers by about a fifth. The registry says the latest year will change and the three to five years before it probably will, so 2024 is incomplete. In situ tumours (D codes) are not included. Breast is both sexes.",
          sources: [
            { label: "Nemzeti Rákregiszter: online query (stat.nrr.hu)", url: NRR_STAT },
            { label: "Országos Onkológiai Intézet: Nemzeti Rákregiszter és Biostatisztikai Központ", url: NRR },
          ],
        },
        {
          id: "eurostat-deaths",
          title: "Cancer deaths registered in Hungary, 2021 to 2023, by site",
          caption: "All deaths reported in Hungary (residents and non-residents), both sexes, all ages, by underlying cause (ICD-10). Central Statistical Office data as published by Eurostat, table updated 27 October 2026.",
          columns: [
            { key: "site", label: "Cause of death (ICD-10)" },
            { key: "y2021", label: "2021", numeric: true },
            { key: "y2022", label: "2022", numeric: true },
            { key: "y2023", label: "2023", numeric: true },
          ],
          rows: [
            { site: "All malignant cancers (C00-C97)", y2021: 30593, y2022: 30456, y2023: 30998 },
            { site: "Trachea, bronchus and lung (C33-C34)", y2021: 7867, y2022: 7760, y2023: 8050 },
            { site: "Colon, rectum and anus (C18-C21)", y2021: 4886, y2022: 4866, y2023: 4771 },
            { site: "Breast (C50)", y2021: 2194, y2022: 2135, y2023: 2196 },
            { site: "Pancreas (C25)", y2021: 2008, y2022: 2117, y2023: 2114 },
            { site: "Prostate (C61)", y2021: 1320, y2022: 1379, y2023: 1465 },
            { site: "Stomach (C16)", y2021: 1262, y2022: 1241, y2023: 1199 },
            { site: "Bladder (C67)", y2021: 1068, y2022: 986, y2023: 1082 },
            { site: "Lip, oral cavity and pharynx (C00-C14)", y2021: 1148, y2022: 1043, y2023: 1062 },
            { site: "Liver and intrahepatic bile ducts (C22)", y2021: 784, y2022: 828, y2023: 789 },
            { site: "Kidney (C64)", y2021: 720, y2022: 732, y2023: 709 },
            { site: "Brain and central nervous system (C70-C72)", y2021: 634, y2022: 610, y2023: 694 },
            { site: "Ovary (C56)", y2021: 662, y2022: 692, y2023: 662 },
            { site: "Cervix uteri (C53)", y2021: 415, y2022: 398, y2023: 388 },
          ],
          note: "Deaths from all causes were 155,621 in 2021, 136,446 in 2022 and 128,176 in 2023, so cancer's share moved with COVID-19 deaths. The 2022 total matches the 30,456 cancer deaths the OECD profile quotes from the Central Statistical Office. Breast is both sexes.",
          sources: [{ label: "Eurostat: causes of death, deaths by country of residence and occurrence (hlth_cd_aro), Hungary", url: EUROSTAT_CD }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry since 2000, and a children's registry since 1971",
      aside: { label: "Országos Onkológiai Intézet: Nemzeti Rákregiszter", url: NRR },
      cards: [
        {
          id: "nrr",
          title: "A population-based registry required by law, with an open online query",
          plain:
            "Hungary's National Cancer Registry has been required by law since 1999 and run by the National Institute of Oncology since 2000. Hospitals report every cancer they treat. Anyone can look up the number of registered cancers by year, type, sex and county on the registry's website, which the registry says is corrected for several years after each year ends.",
          detail:
            "The registry's page at the National Institute of Oncology says its operation has been required by law since 1999 and is the Institute's task; it was set up with the help of a World Bank programme, moved to the Institute by ministerial decree, began work in 2000 to international guidelines, and turned hospital-based registration into population-based registration. Hospitals report the cases they treat, the registry checks quality and returns errors, and it has published an annual report since 2001; it works with IARC and contributes to the European Cancer Inequalities Registry. Its public tool at stat.nrr.hu gives registered cases by ICD-10 code from 2000, by sex and county, and warns that data for the past year will certainly change and for three to five years back very probably will. The OECD profile adds that hospitals report electronically every quarter, that the National Health Insurance Fund adds financing data linked by social security number, and that identifiable death records from the Central Statistical Office confirm cancer deaths; it notes that more staff and money would let the data be used more fully. The registry's own evaluation recommends moving to ICD-O coding and reviewing its staffing.",
          links: [
            { label: "Országos Onkológiai Intézet: Nemzeti Rákregiszter és Biostatisztikai Központ", url: NRR },
            { label: "Nemzeti Rákregiszter: online query (stat.nrr.hu)", url: NRR_STAT },
            doi("10.1016/j.canep.2022.102306", "Wéber et al., Cancer Epidemiol 2023"),
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 5.2 (PDF)", url: CCP },
          ],
        },
        {
          id: "survival",
          title: "Five-year survival from the registry: improving, but below the EU",
          plain:
            "Registry data supplied to the OECD show five-year survival improving for the commonest cancers. For people diagnosed in 2015 to 2017 it was 57% for bowel cancer and 25% for lung cancer, up from 52% and 23% a decade earlier. Breast cancer survival was 80% and prostate cancer 83%.",
          detail:
            "The OECD and European Commission's 2025 profile reports an analysis of population-based National Cancer Registry data for three periods, with figures supplied by national experts: age-standardised five-year net survival for prostate cancer was 81%, 81% and 83% for diagnoses in 2005 to 2009, 2010 to 2014 and 2015 to 2017; breast cancer 79%, 79% and 80%; cervical cancer 59%, 55% and 60%; colon cancer 52%, 55% and 57%; and lung cancer 23%, 20% and 25%. The registry's own 2024 study of lung cancers diagnosed in 2018 reports five-year overall survival of 14.8%, a different measure from net survival, and most cases diagnosed at an advanced stage. The profile also records that, by 2021, stage 3 cancers made up a larger share of diagnoses than before the pandemic, at the expense of stages 1 and 2, while survival for patients whose cancer was found did not worsen.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, table 2 and box 1 (PDF)", url: CCP },
            doi("10.1038/s41598-024-70143-w", "Kenessey et al., Sci Rep 2024"),
          ],
        },
        {
          id: "childhood-registry",
          title: "A separate registry for children with cancer, run since 1971",
          plain:
            "Children's cancers are recorded in their own registry, run by the Hungarian Paediatric Oncology Network since 1971 and based at Semmelweis University. It covers every insured child up to 18. About 200 children under 15 are diagnosed with cancer each year, and they are treated in eight centres.",
          detail:
            "Garami and Jakab describe the Childhood Cancer Registry, operated by the Hungarian Pediatric Oncology Network since 1971 and located at the Pediatric Center of Semmelweis University, which records epidemiology, treatment, outcomes and long-term follow-up for all Hungarian children aged 0 to 18 with a social security card; reporting moved online in April 2010, with data from the National Health Insurance Fund and the network's centres. The National Cancer Registry's page points readers to this separate registry. The OECD profile gives an ECIS estimate of 203 children under 15 diagnosed in 2022, an incidence of 14.3 per 100,000 against 13.7 in the EU, and a three-year average mortality of 2.7 per 100,000 children in 2021 against 2.1. It says children are treated in eight institutions, that 12 of 13 treatment modalities assessed by SIOPE are available (proton therapy is not), that 65% of 68 essential childhood cancer medicines were available in 2018 against 76% across the EU, and that 30 of 436 trials enrolling children in the EU from 2010 to 2022 ran in Hungary.",
          links: [
            doi("10.1556/650.2024.33061", "Garami and Jakab, Nemzeti Gyermekonkológiai Regiszter (Orv Hetil 2024)"),
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 6 (PDF)", url: CCP },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one public insurer, and a case-by-case route for unreimbursed medicines",
      aside: { label: "NEAK: egyedi támogatás (individual support for medicines)", url: NEAK_EGYEDI },
      cards: [
        {
          id: "neak-card",
          title: "Compulsory social insurance that covers cancer care from screening to palliation",
          plain:
            "Health care in Hungary is paid for by compulsory social health insurance, run by the National Health Insurance Fund (NEAK). It covers all of cancer care, from screening to palliative care. Private clinics play a bigger part in screening, but once cancer is diagnosed almost everyone is treated in the public system.",
          detail:
            "The OECD and European Commission's 2025 profile says entitlement is guaranteed by residence and a legal relationship such as employment, membership is compulsory, and it gives access to all elements of cancer care. Out-of-pocket payments were 25% of current health spending in 2021 against 15% across the EU, but oncology care is not among their main drivers, although patients may pay for medicines that relieve the side effects of treatment. Inpatient procedures, surgery, chemotherapy and radiotherapy are paid by diagnosis-related groups and outpatient imaging and laboratory tests by fee for service; certain high-value treatments are paid by itemised reimbursement from an earmarked budget, with procurement managed by the Fund. Statutory financing protocols set out the care for the costliest diseases, including cancer, and the Fund withdraws payment when care departs from them. From 1 January 2024 new medicines, including oncology and onco-haematology medicines, were taken into public financing, with new protocols for 40 diseases. In 2022 oncology care was made free for people under temporary protection after fleeing the war in Ukraine.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, sections 5.1 and 5.3 (PDF)", url: CCP },
            { label: "NEAK: finanszírozási protokollok (financing protocols)", url: "https://www.neak.gov.hu/felso_menu/szakmai_oldalak/finanszirozasi_protokollok" },
          ],
        },
        {
          id: "equity-route",
          title: "Individual equity support: how a patient can get a medicine the insurer does not normally pay for",
          plain:
            "When no reimbursed medicine would work for a patient, the specialist and the patient can ask for public support for one that is not reimbursed, or for use outside its licence. The rules say a decision comes within 60 days, sooner in life-threatening cases and for children, and support is given for up to a year at first. There is no appeal, but the decision can be taken to court.",
          detail:
            "The National Health Insurance Fund's page on individual support (egyedi támogatás) says equity support can be given when the patient cannot be treated, cured or meaningfully helped by any reimbursed medicine, for medicines authorised in Hungary but not reimbursed, for products without a Hungarian authorisation prescribed under the pharmacy authority's permit, and for off-label use. Both the patient and the treating specialist must apply, with the diagnosis, dose and duration. Assessment covers medical justification, reimbursed comparators, how common the disease is, expected cost, cost-effectiveness and expected health gain, within the limits of the Health Insurance Fund. Decisions are due within 60 days, out of turn for life-threatening cases and minors; the first grant is for at most one year; there is no appeal, but an administrative lawsuit can be filed within 30 days. The OECD profile says the procedure was tightened in 2023 to weigh quantified efficacy, price and cost-effectiveness. From February 2025 the Batthyány-Strattmann László Foundation decided these requests; its statement to 444.hu in April 2026 said it had received 4,093 requests in 2026, decided 1,824, and refused about 7.6%. Telex reported on 24 June 2026 that a government bill would hand the foundation's work back to the health insurer, with requests received after the law took effect decided by the insurer; whether and when the bill became law was not checked for this page. The Fund's notice of 1 September 2026 recalculated equity-supported medicines after VAT on prescription-only medicines fell to 0%.",
          links: [
            { label: "NEAK: egyedi támogatás (individual support for medicines)", url: NEAK_EGYEDI },
            { label: "NEAK: notice on VAT and equity-supported medicines, 1 September 2026", url: NEAK_AFA },
            { label: "444.hu: the foundation's answer on its backlog, 23 April 2026 (Hungarian)", url: A444 },
            { label: "Telex: the insurer to take over the foundation's tasks, 24 June 2026 (Internet Archive copy, Hungarian)", url: "https://web.archive.org/web/20260625025954/https://telex.hu/belfold/2026/06/24/batthyany-strattmann-alapitvany-gyogyszertamogatas-oep-hegedus-zsolt" },
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 5.3 (PDF)", url: CCP },
          ],
        },
        {
          id: "palliative",
          title: "Hospice and palliative care paid for, with a 50-day home care limit",
          plain:
            "Hospice and palliative care in hospital and at home are paid for by the public insurer. Home care is funded for 50 days, which can be extended to 150. In 2022, 95 services offered palliative and hospice care, and most of the people they cared for had cancer. Carers can take only unpaid leave.",
          detail:
            "The OECD profile, drawing on National Health Insurance Fund and Hungarian Hospice Palliative Association data, says inpatient and home-based hospice and palliative care are covered by compulsory insurance; inpatient stays are at the provider's discretion but generally do not exceed three months, and a government decree limits funded home care to 50 days, extendable to 150 in total under certain conditions. In 2022, 95 providers offered these services, 26 inpatient, 4 outpatient and 62 home-based, plus 3 mobile hospice teams, up from 78 in 2010; cancer patients were 82% of home hospice patients and 95% of inpatient hospice patients. It names insufficient funding, low bed numbers, an uneven spread of beds and a shortage of trained staff as bottlenecks, and late referral as a persistent problem. Palliative care is not a compulsory part of medical training. Hungary has no right-to-be-forgotten rules for cancer survivors and no paid carer's leave: carers can request unpaid leave for up to two years. A hospital in Miskolc began a prehabilitation programme, funded by the Fund, in 2022.",
          links: [{ label: "OECD/EC: Country Cancer Profile Hungary 2025, section 5.4 (PDF)", url: CCP }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: OGYÉI, its successors, and the European system",
      aside: { label: "NNGYK: new name and the new pharmacy institute, 3 November 2026", url: ONI_NAME },
      cards: [
        {
          id: "ogyei-to-ogyi",
          title: "One medicines authority under three names since 2023",
          plain:
            "New cancer medicines are authorised once for the whole EU, so they are legally available in Hungary at the same time as everywhere else in the EU. The Hungarian authority that supervises medicines, OGYÉI, merged into the national public health centre in 2023. On 1 November 2026 its work moved again, to a new National Institute of Pharmacy.",
          detail:
            "New active substances for cancer go through the EU centralised procedure, in which the European Commission grants one marketing authorisation valid in every member state on the opinion of the European Medicines Agency. The National Centre for Public Health and Pharmacy (NNGYK) says it was formed on 1 August 2023 by merging the National Institute of Pharmacy and Nutrition (OGYÉI) into the National Public Health Centre, and that as an authority it supervised medicines and the pharmaceutical market. Its notice of 3 November 2026 says that under Government Decree 324/2026 (X. 29.) the pharmaceutical tasks were split off on 1 November 2026 into the National Institute of Pharmacy (Országos Gyógyszerészeti Intézet, OGYI), a separate central office and legal successor for them, and that under Decree 323/2026 the rest of NNGYK was renamed the National Institute of Public Health. The OECD profile says medicines approved by EU regulators are authorised relatively quickly in Hungary, and that since August 2023 the authority has also carried out mandatory health technology assessments of new medicines. NNGYK suspended the ogyei.gov.hu medicines database and adverse reaction reporting site from 22 to 26 October 2026 after a national cyber security alert.",
          links: [
            { label: "NNGYK: rólunk, with the November 2026 notice", url: NNGYK_ROLUNK },
            { label: "NNGYK: new name and the new pharmacy institute, 3 November 2026", url: ONI_NAME },
            { label: "NNGYK: pharmacy websites temporarily unavailable, 22 October 2026", url: OGYEI_DOWN },
            { label: "EMA: authorisation of medicines, the centralised procedure", url: EMA },
          ],
        },
        {
          id: "reimbursement-lag",
          title: "A median of 37 months from EU approval to reimbursement",
          plain:
            "For cancer medicines approved in the EU from 2011 to 2020, Hungary reimbursed 40% of their uses, and the median wait from approval to reimbursement was 37 months, the longest of four central European countries studied. In 2023 Hungary reimbursed fewer of a set of high-benefit breast and lung cancer medicines than the EU average, but more cancer biosimilars.",
          detail:
            "Hofmarcher and colleagues followed 124 indications of 51 cancer medicines authorised by the European Medicines Agency in 2011 to 2020 until 2022: 64% were reimbursed in Czechia, 40% in Hungary, 51% in Poland and 19% in Slovakia, and the median waiting time to reimbursement ranged from 27 months in Poland to 37 months in Hungary. Medicines with substantial clinical benefit were more likely to be reimbursed, but did not reach reimbursement any faster. The OECD profile's own snapshot of 1 April 2023 found 38.5% of 13 indications of 10 high-benefit breast and lung cancer medicines on Hungary's public reimbursement list, against 54% among its economic peers and 59% across the EU, while 79% of 19 biosimilars of bevacizumab, rituximab and trastuzumab were reimbursed, against 65% across the EU. Both measures predate the inclusion of new oncology medicines in public financing from January 2024; a later measure of the delay was not found.",
          links: [
            doi("10.1016/j.esmoop.2023.101593", "Hofmarcher et al., access to novel cancer medicines in four CEE countries (ESMO Open 2023)"),
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 5.1 and figure 13 (PDF)", url: CCP },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: three national programmes, falling participation, and a lung pilot",
      aside: { label: "NNGYK: népegészségügyi szűrés (public health screening)", url: "https://nngyk.gov.hu/hu/szuresek.html" },
      cards: [
        {
          id: "three-programmes",
          title: "Breast, cervical and bowel screening, free and by invitation",
          plain:
            "Women aged 45 to 65 are invited for a mammogram every two years, and women aged 25 to 65 for a cervical test every three years. Women and men aged 50 to 70 are offered a home stool test for bowel cancer, followed by colonoscopy if it is not negative. Fewer people take part than in the past: in 2021, 30% of eligible women joined breast screening, and bowel screening reached only 8%.",
          detail:
            "The public health centre's pages describe mammography every two years for symptom-free women aged 45 to 65, invited by the mammography centre for their area unless they had a publicly funded breast examination in the past two years; cervical screening organised since 2003 every three years for women aged 25 to 65 under Ministry of Welfare decree 51/1997, done by a gynaecologist or, in some places, a trained health visitor (védőnő); and colorectal screening for women and men aged 50 to 70. The OECD profile says breast screening began in 2002 with 49 providers, and that the colorectal programme launched in 2018 as a two-step faecal immunochemical test and colonoscopy every two years, funded by the government and the European Social Fund until 2023; in 2024 it became a targeted public health programme funded from the national budget. IARC's CanScreen5 survey, recorded in OnCo, dates a national colorectal programme to 2007. Programme participation in 2021 was 30% for breast and 26% for cervical screening, down from 49% and 47% in 2006, although many women are screened privately; the profile gives colorectal screening coverage as 8%, without naming the year in its text. Since 2015 trained health visitors may take smears after a 40-hour course, and on average 308 of them took part in screening each year from 2016 to 2022. An expert panel has recommended mammography from 40 to 75 and a move to HPV-based cervical screening.",
          links: [
            { label: "NNGYK: emlőszűrés (breast screening)", url: SZ_EMLO },
            { label: "NNGYK: méhnyakszűrés (cervical screening)", url: SZ_MEHNYAK },
            { label: "NNGYK: vastagbélszűrés (colorectal screening)", url: SZ_VASTAGBEL },
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 4 (PDF)", url: CCP },
            { label: "OnCo: colorectal cancer screening programme in Hungary (IARC CanScreen5)", url: "/terms/screening-hun-colorectal/" },
          ],
        },
        {
          id: "lung-ldct",
          title: "Low-dose CT lung screening: 4,215 people screened, most cancers found at stage I",
          plain:
            "Hungary has piloted lung cancer screening with low-dose CT scans for heavy smokers aged 50 to 75. In the second programme, across 18 centres, 76 cancers were found among 4,215 people, and 61% were at the earliest stage. The National Institute of Oncology has recommended making it a national programme linked to help with stopping smoking.",
          detail:
            "HUNCHEST-II screened 4,215 people aged 50 to 75 with at least 25 pack-years of smoking in 18 facilities. At baseline 74.2% of scans were negative, 21.7% indeterminate and 4.1% positive; 76 lung cancers were diagnosed, 1.8% of participants, 62 of them in the first round, and the positive predictive value of a positive test was 58%. 60.7% of screen-detected cancers were stage I and 16.4% stage IV, significantly earlier than among unscreened patients in the Korányi Institute's archive or the Hungarian Cancer Registry. It measured stage at diagnosis, not deaths prevented. The OECD profile dates the first and second low-dose CT initiatives to 2014 and 2019, and says the National Institute of Oncology has recommended to the government low-dose CT screening for at-risk groups combined with smoking cessation. The profile also describes the mobile screening programme Helybe visszük a szűrővizsgálatokat, launched in 2018, whose 10 vehicles had visited 300 disadvantaged communities by November 2023, screening for melanoma and cervical and oral cancers; almost 7,000 oral cancer screenings were done from 2021 to 2023.",
          links: [
            doi("10.1007/s00330-023-10379-8", "Kerpel-Fronius et al., HUNCHEST-II final results (Eur Radiol 2024)"),
            { label: "NNGYK: Helybe visszük a szűrővizsgálatokat (mobile screening)", url: "https://nngyk.gov.hu/hu/szuroprogram-iranyitasi-es-modszertani-osztaly/helybe-visszuk-a-szurovizsgalatokat.html" },
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 4 (PDF)", url: CCP },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination at school for girls since 2014 and for boys since 2020",
          plain:
            "Hungary vaccinates against HPV, the virus behind most cervical cancers, at school: girls since 2014 and boys since the 2020 to 2021 school year. In 2023, 76% of girls had all their doses by age 15, above the EU average of 64%, and 64% of boys.",
          detail:
            "The OECD and European Commission's 2025 profile, using WHO data, gives the share of girls who had received all recommended HPV doses by age 15 in 2023 as 76% in Hungary against 64% on average in the EU, and 64% for boys. It describes school-based vaccination programmes for girls since 2014, extended to boys in 2020 to 2021, and says that, of the cancer risk factors it measures, HPV vaccination is one on which Hungary performs relatively well. The public health centre's screening directorate lists a cervical cancer elimination committee (Méhnyakrák Eliminációs Bizottság) among its pages; its targets were not read for this page. No national hepatitis B figure was read for this page.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, section 3 (PDF)", url: CCP },
            { label: "NNGYK: Szűrésirányítási Főosztály (screening directorate)", url: "https://nngyk.gov.hu/hu/szuresek.html" },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy, scanners and the cancer workforce",
      aside: { label: "OECD/EC: Country Cancer Profile Hungary 2025, sections 5.1 and 5.2 (PDF)", url: CCP },
      cards: [
        {
          id: "radiotherapy",
          title: "Fourteen radiotherapy centres, most machines renewed in the past decade",
          plain:
            "Radiotherapy is given at 14 centres around the country; the newest opened in Northern Hungary in April 2023. Most radiotherapy machines are less than ten years old. Hungary still has fewer CT, MRI and PET scanners per person than the EU average, and a 2015 rule says a patient with suspected cancer must get a CT or MRI scan within 14 days.",
          detail:
            "The OECD profile says external beam and brachytherapy are given at the 14 county centres that operate as radiotherapy centres, the fourteenth opened in Northern Hungary in April 2023, and registry data showed more patients treated there in 2023 with no staffing difficulties reported. Citing IAEA data, it says 39 of Hungary's 64 radiotherapy units (61%) are less than 10 years old, and citing the Hungarian Academy of Sciences, that 80% of radiotherapy, CT and MRI equipment was renewed over the preceding decade. From 2011 to 2022 CT scanners rose from 7 to 11 per million people, MRI units from 3 to 6 and PET scanners from 0.4 to 1, against EU averages of 26, 18 and 2. Since 2015, regulations require a CT or MRI scan within 14 days of referral for suspected cancer, but the report deadline is not regulated. Robot-assisted surgery was available at four institutions by 2024. A deal between Budapest and Semmelweis University paid for 2,093 CT scans from July 2023 to December 2024 for residents of some districts, with a scan within seven days and results within three.",
          links: [{ label: "OECD/EC: Country Cancer Profile Hungary 2025, sections 5.1 and 5.2 (PDF)", url: CCP }],
        },
        {
          id: "workforce",
          title: "629 clinical oncologists, 38% of them in Budapest",
          plain:
            "Hungary has fewer doctors and nurses for each new cancer than the EU average. In 2024, 629 doctors were authorised to practise clinical oncology, and 242 of them were registered in Budapest. A shortage of radiologists slows down the reading of scans.",
          detail:
            "The OECD profile, using OECD Health Statistics for 2022 or the nearest year, gives 538 physicians and 845 nurses per 1,000 new cancer cases in Hungary, against EU averages of 679 and 1,376. Citing the National Directorate General for Hospitals' registry, it says 629 doctors were authorised to practise clinical oncology in 2024, of whom 242, or 38%, were registered in the capital. It names an uneven geographical spread of oncologists and a shortage of radiologists as bottlenecks for timely imaging. A 2020 reform of doctors' employment status raised doctors' salaries by 120% and made informal payments a crime, and by 2024 nurses' and other health professionals' salaries had also been increased. Pilots of artificial intelligence in mammography (from 2021) and of a deep-learning pathology tool in eight pathology centres, to support colorectal screening, aim to ease the shortages.",
          links: [{ label: "OECD/EC: Country Cancer Profile Hungary 2025, sections 4 and 5.1 (PDF)", url: CCP }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Hungary does",
      title: "What Hungary does that others do not",
      cards: [
        {
          id: "tiered-network",
          title: "A tiered national network, with one national molecular tumour board",
          plain:
            "Cancer care is organised in three tiers: a centre in each of Hungary's 19 counties for common cancers, four regional centres for less common ones, and the National Institute of Oncology for rare cancers. A national molecular tumour board led by the Institute decides who should have multigene tests in the public system, and every cancer diagnosis must be signed by two pathologists.",
          detail:
            "The OECD profile describes county centres in each of the 19 counties responsible for high-incidence cancers, four regional centres for specialist care and medium-incidence cancers, and the National Institute of Oncology for rare cancers, professional guidelines, continuing education and the National Cancer Registry; molecular pathology is available at the Institute and the four regional centres. A national molecular oncoteam led by the Institute, including a molecular pathologist, a clinical oncologist, the treating doctor and a bioinformatician, decides whether multigene tests may be done at public providers; 544 cases had been assessed between January 2022 and May 2023. All malignancy diagnoses must be signed by two pathologists. The Institute is accredited as a comprehensive cancer centre, and plans include accrediting the whole network through the Organisation of European Cancer Institutes. The Institute's own history dates its founding to 1936 and its formal establishment in 1952 as successor to the Eötvös Loránd Radium and X-ray Institute. The National Cancer Plan for 2018 to 2030 aims to cut cancer mortality by 10% by 2030.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, sections 2 and 5.2 (PDF)", url: CCP },
            { label: "Országos Onkológiai Intézet: kórháztörténet (history)", url: OOI_HIST },
          ],
        },
        {
          id: "tobacco-retail",
          title: "State-licensed tobacco shops: 85% fewer retailers",
          plain:
            "Since 2013 tobacco in Hungary may be sold only in licensed shops, which cut the number of places selling it by 85%. Smoking among teenagers fell at first but the effect faded within a few years. A quarter of adults smoked daily in 2019, and 30% of 15-year-olds had smoked in the past month in 2022.",
          detail:
            "The OECD profile describes the 2013 reorganisation of tobacco retail as part of anti-tobacco laws in force since 2011 to 2013, alongside a ban on smoking in enclosed public places, tax rises and warning labels; licensed retailer density fell by 85% between 2010 and 2020, from 4 to 0.6 per 1,000 people. Citing a 2024 study in Tobacco Control, it says cigarette use among 13 to 16 year olds dropped in the short term but the effect on youth smoking was minimal two to three years later. Plain packaging and extended warnings for heated tobacco followed in 2022 to 2023. In 2019, 25% of Hungarians over 15 smoked daily, among the highest rates in the EU; in 2022, 30% of 15-year-olds had smoked in the past month against 17% across the EU, and 33% had used e-cigarettes in the past 30 days. OECD modelling estimates that meeting tobacco targets would prevent 56,466 cancers in Hungary from 2023 to 2050. A public health product tax on unhealthy foods and drinks has applied since 2011.",
          links: [{ label: "OECD/EC: Country Cancer Profile Hungary 2025, section 3 (PDF)", url: CCP }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-hungary",
          title: "477 cancer trials in OnCo's records have a site in Hungary",
          plain:
            "Of the cancer trials OnCo holds, 477 list a site in Hungary on ClinicalTrials.gov, and 120 were recruiting when last read. Most are international company trials, mostly phase 3, and lung cancer is the commonest subject. Judging by sponsor names, none is led by a Hungarian institution or company.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 477 trials list Hungary among their countries, 383 of them phase 3, 57 phase 2, 21 phase 1/2, 14 phase 2/3, 1 phase 1 and 1 observational. ClinicalTrials.gov gives 208 as active but not recruiting, 129 completed, 120 recruiting, 19 terminated and 1 unknown. AstraZeneca is lead sponsor of 60, Merck Sharp & Dohme of 55, Hoffmann-La Roche of 34, Pfizer of 23 and Novartis of 20, and non-small cell lung cancer is the first-listed cancer for 85. One of the smallest by geography is a comparison of Henlius's HLX11 with EU-Perjeta before surgery for HER2-positive breast cancer, run in China, Hungary, Poland and Spain. The OECD profile notes that 30 of 436 trials enrolling children in the EU from 2010 to 2022 ran in Hungary, and that a trial of an mRNA-based lung cancer vaccine launched in 2024 across seven countries includes Hungary. Hungarian research in OnCo also includes the HUNCHEST-II screening programme and the registry's lung cancer and data quality studies.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Hungary", url: "https://clinicaltrials.gov/search?cond=Cancer&country=Hungary" },
            { label: "OECD/EC: Country Cancer Profile Hungary 2025, sections 4 and 6 (PDF)", url: CCP },
          ],
        },
        {
          id: "institutes",
          title: "The National Institute of Oncology, the Korányi Institute and Budapest's cancer technology firms",
          plain:
            "The National Institute of Oncology in Budapest treats rare cancers, runs the cancer registry and coordinates cancer guidelines. Doctors at the National Korányi Institute of Pulmonology wrote up the results of the lung screening programme. OnCo also holds three Budapest companies: 3DHISTECH, which makes digital pathology scanners, Mediso, which makes nuclear medicine scanners, and Turbine, which builds computer simulations of cancer cells.",
          detail:
            "The National Institute of Oncology's history says it was founded in 1936, became the National Institute of Oncology in 1952 as legal successor to the Eötvös Loránd Radium and X-ray Institute, and stands on Ráth György utca in Budapest's twelfth district; its directors' page names Prof. Magdolna Dank as Director-General. Its departments include the National Tumour Biology Laboratory, an oncology biobank and a robotic surgery programme, and the OECD profile says it offers robotic surgery training. The National Korányi Institute of Pulmonology's archive was one of the comparison databases for HUNCHEST-II, whose first and last authors, Anna Kerpel-Fronius and Krisztina Bogos, give the Korányi Institute as their affiliation. 3DHISTECH, Mediso and Turbine are Budapest companies in OnCo's records, listed below with their own sources. The OECD profile describes a Hungarian pilot of a deep-learning pathology tool in eight pathology centres and an AI committee at the health ministry preparing a roadmap for AI in public health care.",
          links: [
            { label: "Országos Onkológiai Intézet: kórháztörténet (history)", url: OOI_HIST },
            { label: "Országos Onkológiai Intézet: igazgatók (directors)", url: "https://onkol.hu/igazgatok/" },
            doi("10.1007/s00330-023-10379-8", "Kerpel-Fronius et al., HUNCHEST-II (Eur Radiol 2024)"),
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreached",
      title: "Sources that could not be read directly on 11 November 2026",
      plain:
        "Several Hungarian websites refused automated reading or did not answer. The medicines authority's database at ogyei.gov.hu did not respond, and a news site and the cancer league's site showed a browser check, so both were read through Internet Archive copies. Some figures were read through the OECD's 2025 profile rather than from Hungarian originals.",
      detail:
        "ogyei.gov.hu, which holds the Hungarian medicines database, did not answer on 11 November 2026, after NNGYK said it had been suspended from 22 to 26 October for cyber security reasons; no separate website for the new National Institute of Pharmacy was found. telex.hu answered with a browser check, so its report of 24 June 2026 on a bill handing equity decisions back to the health insurer was read from an Internet Archive copy of 25 June 2026; rakliga.hu returned a browser check, so the League against Cancer was read from an Internet Archive copy of August 2025; the UICC member page refused the request. The Hungarian Central Statistical Office's own tables were not read; its deaths were read through Eurostat. The text of the National Cancer Plan 2018 to 2030, the 2015 regulation on 14-day imaging, the Government Decrees 323/2026 and 324/2026 themselves, IAEA DIRAC's radiotherapy listing and the EFPIA W.A.I.T. survey were not read; figures from them come through the OECD profile or the NNGYK notice.",
      links: [
        { label: "NNGYK: pharmacy websites temporarily unavailable, 22 October 2026", url: OGYEI_DOWN },
        { label: "OECD/EC: Country Cancer Profile Hungary 2025 (PDF)", url: CCP },
      ],
    },
    {
      id: "figures-missing",
      title: "Figures looked for and not found",
      plain:
        "Some figures a patient would want were looked for and not found: who decides equity requests for unreimbursed medicines now and how long they take, how much the insurer spends on cancer medicines, a measure of the reimbursement delay after the 2024 changes, and current coverage of hepatitis B vaccination.",
      detail:
        "The insurer's page on individual equity support was last updated in July 2024 and describes the insurer deciding requests; a newspaper report quotes a foundation that decided them from 2025, and a telex.hu report of 24 June 2026, read through the Internet Archive, says a government bill would hand the foundation's tasks back to the insurer; the legal texts for either change were not read, whether the bill passed was not checked, and the insurer's September 2026 notice does not say who decides. The foundation's own backlog figures come from its statement to a newspaper. No figure for the National Health Insurance Fund's spending on cancer medicines or on itemised reimbursement was found. The reimbursement figures on this page predate the January 2024 inclusion of new oncology medicines in public financing. The registry's 2024 counts are incomplete by the registry's own warning. Current survival figures beyond 2015 to 2017 and a national hepatitis B vaccination figure were not found.",
      links: [
        { label: "NEAK: egyedi támogatás (individual support for medicines)", url: NEAK_EGYEDI },
        { label: "Nemzeti Rákregiszter: online query (stat.nrr.hu)", url: NRR_STAT },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Hungary (PDF)", url: IARC_FS },
      ],
    },
  ],
  institutions: [
    "noi-budapest", "koranyi-institute-budapest", "hungarian-national-cancer-registry", "neak-hungary", "ogyi-hungary", "oni-hungary",
    "hungarian-league-against-cancer", "ema", "iarc",
  ],
  companies: ["3dhistech", "mediso", "turbine"],
  drugs: [],
  trials: [
    "caspian", "pacific", "flaura", "adaura", "alina", "laura", "mariposa", "checkmate-227", "impower110", "impower133", "tropion-lung01",
    "krystal-12", "codebreak-200", "lux-lung-3", "natalee", "monaleesa-2", "destiny-breast04", "olympia", "nct05346224", "beacon-crc",
    "fresco-2", "sunlight", "talapro-2", "aramis", "murano", "echelon-1", "hr-nbl1", "inter-b-nhl-ritux-2010", "eortc-22033", "espac-4",
  ],
  papers: [
    "paper-weber-hungarian-cancer-registry-data-quality-canep-2023", "paper-kenessey-lung-cancer-hungary-2018-sci-rep-2024",
    "paper-kerpel-fronius-hunchest-ii-eur-radiol-2024", "paper-kiss-hulc-postmortem-lung-cancer-hungary-front-oncol-2022",
    "paper-hofmarcher-cee-cancer-medicine-access-esmo-open-2023", "paper-garami-childhood-cancer-registry-hungary-orv-hetil-2024",
  ],
  people: ["magdolna-dank", "krisztina-bogos", "istvan-kenessey", "beatrix-oroszi"],
  how:
    "Every card was written from sources read raw: in Hungarian, the National Institute of Oncology's registry and history pages, the National Cancer Registry's own query tool, the National Health Insurance Fund's pages and notices on equity support for medicines, the National Centre for Public Health and Pharmacy's pages on its history, its new names and its screening programmes, and a newspaper's report of the equity foundation's own statement; in English, the OECD and European Commission's Country Cancer Profile Hungary 2025, Eurostat's causes-of-death table, IARC's GLOBOCAN 2024 fact sheet and six papers resolved through Europe PMC. Registry counts were summed by ICD-10 code from the tool's tables by sex. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are the National Cancer Registry, the National Health Insurance Fund, the pharmacy authority, the public health institute, the League against Cancer, six papers and two people.",
  verify:
    "Hungary's health institutions changed names and duties in November 2026, and the route for unreimbursed medicines changed twice in two years, so check the current body before applying. The registry's latest years are corrected for several years, so recent counts will change. Whether a medicine is reimbursed, itemised or available only through equity support changes during the year: ask the treating oncologist and the insurer.",
  verifyLinks: [
    { label: "NEAK: egyedi támogatás (individual support for medicines)", url: NEAK_EGYEDI },
    { label: "NNGYK: new names, 3 November 2026", url: ONI_NAME },
    { label: "Nemzeti Rákregiszter: online query (stat.nrr.hu)", url: NRR_STAT },
    { label: "OECD/EC: Country Cancer Profile Hungary 2025 (PDF)", url: CCP },
  ],
};
