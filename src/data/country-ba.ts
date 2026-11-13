import type { CountryDive } from "@/data/country-dive";

/**
 * Bosnia and Herzegovina deep dive: the hand-written cards for /countries/ba/ (wave 11). Every figure was read from the
 * raw text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet (PDF text);
 * the Institute for Public Health of the Federation of BiH's report on the health of the population in 2021 (PDF
 * text, English edition) and its January 2025 HPV news page; the Public Health Institute of Republika Srpska's health
 * status reports for 2021 to 2024 and its March 2023 HPV vaccination guideline (PDF text, Cyrillic); the European
 * Network of Cancer Registries' member list; the Health Insurance and Reinsurance Institute of the Federation's pages
 * and its Solidarity Fund medicines list (PDF text); the Health Insurance Fund of Republika Srpska's guide for people
 * with cancer (PDF text); the medicines agency's English pages; WHO's list of regulators at maturity level 3 and 4
 * (PDF text); WHO's health expenditure rows and HPV coverage rows from its public data APIs; the IAEA DIRAC equipment
 * list by centre; the Clinical Centre University of Sarajevo's oncology clinic page and its weekly cytostatics notice;
 * a tender notice for a linear accelerator in Mostar; the European Observatory on Health Systems and Policies' country
 * page; and the papers' abstracts through Europe PMC.
 *
 * The country has two entities, the Federation of Bosnia and Herzegovina and Republika Srpska, and Brčko District.
 * Each has its own public health institute, cancer registry and health insurance fund, so every figure below names the
 * entity it covers. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/70-bosnia-herzegovina-fact-sheet.pdf";
const FBIH_2021 = "https://www.zzjzfbih.ba/wp-content/uploads/2023/04/Zdravstveno-stanje-stanovni%C5%A1tva-engleski.pdf";
const FBIH_REPORTS = "https://www.zzjzfbih.ba/knjiznica/biblioteka/publikacije/zdravstvena-stanja-stanovnistva/";
const FBIH_HPV = "https://www.zzjzfbih.ba/u-borbi-protiv-karcinioma-cerviksa-vrata-maternice-kljucna-je-imunizacija-protiv-hpv/";
const RS_2024 = "https://www.phi.rs.ba/pdf/publikacije/Zdravstveno%20stanje%20stanovni%C5%A1tva%20RS%20u%202024.%20godini.pdf";
const RS_PUBS = "https://www.phi.rs.ba/index.php?view=publikacije&id=publikacije";
const RS_HPV = "https://www.phi.rs.ba/pdf/publikacije/SMU%20HPV%20vakcinacij%D0%B0,%20Republika%20Srpska.pdf";
const ENCR = "https://www.encr.eu/encr-members-contact-list";
const ZZO_FS = "https://zzofbih.ba/fond-solidarnosti/";
const ZZO_LIST = "https://zzofbih.ba/wp-content/uploads/2022/06/Lista_lijekova_05_7_2019.pdf";
const ZZO_DRUGS = "https://zzofbih.ba/lijekovi-koji-se-financiraju-iz-sredstava-fonda-solidarnosti/";
const FZO_GUIDE = "https://zdravstvo-srpske.org/wp-content/uploads/2025/11/Vodic_za_maligne_final-3.pdf";
const ALM_ABOUT = "https://almbih.gov.ba/en/about-us/";
const ALM_COOP = "https://almbih.gov.ba/en/cooperation/";
const ALM_CT = "https://almbih.gov.ba/en/clinical-trials/";
const OBSERVATORY = "https://eurohealthobservatory.who.int/countries/bosnia-and-herzegovina";
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const WHO_GHED = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BIH'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BIH'%20and%20startswith(ANTIGEN,'PRHPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const MOSTAR_LINAC = "https://www.phi.rs.ba/pdf/javneNabavke/Procurement%20of%20sophisticated%20medical%20equipment%20-%20stereotactic%20linear%20accelerator%20%E2%80%93%20LINAC.pdf";
const KCUS_ONK = "https://kcus.ba/klinika-za-onkologiju-stari-dizajn/";
const KCUS_CIT = "https://kcus.ba/informacija-za-javnost-stanje-citostatika-09-11-2026-godine/";
const KCUS_CIT_ALL = "https://kcus.ba/informacije-o-citostaticima/";
const SCIREP_2026 = "https://doi.org/10.1038/s41598-026-54863-9";
const MEDICINA_2024 = "https://doi.org/10.3390/medicina60121987";
const CTGOV = "https://clinicaltrials.gov/search?country=Bosnia%20and%20Herzegovina&cond=cancer";

export const BA_DIVE: CountryDive = {
  iso2: "BA",
  iso3: "BIH",
  name: "Bosnia and Herzegovina",
  flag: "🇧🇦",
  asOf: "2026-11-11",
  title: "Cancer in Bosnia and Herzegovina",
  description:
    "Cancer in Bosnia and Herzegovina from its own sources: IARC's estimate of 15,108 new cancers and 8,932 deaths in 2024, two entity cancer registries with the Federation's latest published year 2020, separate insurers in the Federation and Republika Srpska, a Solidarity Fund that pays for cancer medicines in every canton, one medicines agency for the whole country, 20 radiotherapy machines in six centres, HPV vaccination since 2022 and 2023, and 12 trials in our records with a site in the country.",
  lede:
    "IARC estimates 15,108 new cancers and 8,932 cancer deaths in Bosnia and Herzegovina in 2024, with lung and colorectal cancer the commonest. The country's two entities, the Federation of Bosnia and Herzegovina and Republika Srpska, each count cancer, insure patients and pay for medicines through their own institutions, so what a patient is entitled to depends on where they are insured.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Bosnia and Herzegovina is 15,108 new cancers (8,281 in men, 6,827 in women) and 8,932 deaths, an age-standardised incidence of 214.9 per 100,000 (267.8 in men, 179.7 in women) and mortality of 111.8. It includes 591 non-melanoma skin cancers; without them the total is 14,517. The fact sheet names sub-national registries as the incidence source and gives the method as national mortality estimates applied to modelled mortality-to-incidence ratios from country registry data; mortality is from national data reported to WHO, projected to 2024. So the national figure is anchored on deaths, not on a national count of new cancers. The Federation's own Cancer Register counted 5,035 cancers excluding skin cancer in 2020, its latest published year, with rates the report gives per 100,000 without saying they are age-standardised, so they cannot be set directly beside IARC's. OnCo found no published count of new cancers for Republika Srpska.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Bosnia and Herzegovina",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Bosnia and Herzegovina (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 15,000 new cancers a year, led by lung and colorectal cancer",
          plain:
            "IARC estimates 15,108 new cancers in Bosnia and Herzegovina in 2024, more in men (8,281) than in women (6,827). Lung cancer is the commonest cancer and the leading cause of cancer death, followed by colorectal cancer. Breast cancer is the commonest cancer in women. For every ten new cancers IARC estimates about six cancer deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,493 lung cancers (2,119 deaths, 23.7% of cancer deaths), 2,318 colorectal cancers (1,123 deaths), 1,440 breast cancers (583 deaths), 996 prostate cancers and 730 bladder cancers; stomach (542 deaths) and pancreatic cancer (500) are the fourth and fifth causes of cancer death. In men lung cancer is 22.3% of cancers, then colorectum and prostate; in women breast cancer is 21.1%, then colorectum (982) and lung (650). Cervical cancer accounts for 284 cases and 152 deaths. The risk of developing a cancer before age 75 is 27.0% for men and 18.6% for women, and an estimated 35,957 people are living within five years of a diagnosis, in a population IARC puts at 3,164,258. Deaths divided by new cases give 0.59 for 2024.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bosnia and Herzegovina (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "entity-figures",
          title: "What each entity counts: the Federation's register for 2020, and deaths in both entities",
          plain:
            "The Federation's Cancer Register counted 5,035 new cancers in 2020, lung cancer leading in men and breast cancer in women. Republika Srpska publishes its cancer deaths but OnCo found no published count of its new cancers. Deaths from cancer were 4,577 in the Federation in 2021 and 2,807 from tumours in Republika Srpska in 2024.",
          detail:
            "The Institute for Public Health of the Federation's report for 2021 gives 2,686 cancers in men and 2,349 in women registered in 2020, excluding skin cancer, an average age at diagnosis of 63, and rates from 534.4 per 100,000 men in Herzegovina-Neretva Canton to 122.2 in West Herzegovina Canton. It counts 4,577 deaths from malignant neoplasms in the Federation in 2021 (211.1 per 100,000), the second cause of death by disease group; lung cancer caused 29.2% of cancer deaths in men and breast cancer 17.4% in women. Republika Srpska's 2024 report gives 14,136 deaths, 2,807 of them (19.9%) from neoplasms, ICD-10 chapter II, which includes benign tumours: 1,651 in men and 1,156 in women. The two entities' figures are for different years and are not added together here. A 2024 study put the age-standardised rate of new cervical cancers in 2016 to 2020 at 12.48 per 100,000 women in the Federation and 22.44 in Republika Srpska.",
          links: [
            { label: "Health status of the population in the Federation of BiH in 2021, sections 2.2.4 and 2.4.4 (PDF)", url: FBIH_2021 },
            { label: "PHI RS: health status of the population of Republika Srpska in 2024, table 1.2 (PDF, Cyrillic)", url: RS_2024 },
            { label: "Vuković et al., cervical cancer in Serbia and Bosnia and Herzegovina 2016 to 2020 (Medicina 2024)", url: MEDICINA_2024 },
          ],
        },
      ],
      tables: [
        {
          id: "ba-fbih-register-2020",
          title: "Commonest new cancers in the Federation of Bosnia and Herzegovina, 2020",
          caption: "Registered cases and rate per 100,000 from the Federation's Cancer Register, excluding skin cancer. Latest published year: 2020.",
          columns: [
            { key: "rank", label: "Rank", numeric: true },
            { key: "men", label: "Men: site" },
            { key: "mcases", label: "Cases", numeric: true },
            { key: "mrate", label: "Rate", numeric: true },
            { key: "women", label: "Women: site" },
            { key: "wcases", label: "Cases", numeric: true },
            { key: "wrate", label: "Rate", numeric: true },
          ],
          rows: [
            { rank: 1, men: "Lung, bronchus, trachea", mcases: 625, mrate: 58.3, women: "Breast", wcases: 540, wrate: 48.6 },
            { rank: 2, men: "Prostate", mcases: 372, mrate: 34.7, women: "Lung, bronchus, trachea", wcases: 212, wrate: 19.1 },
            { rank: 3, men: "Bladder", mcases: 247, mrate: 23.0, women: "Corpus uteri", wcases: 160, wrate: 14.4 },
            { rank: 4, men: "Colon", mcases: 162, mrate: 15.7, women: "Colon", wcases: 141, wrate: 12.7 },
            { rank: 5, men: "Rectum", mcases: 155, mrate: 14.5, women: "Cervix uteri", wcases: 111, wrate: 10.0 },
            { rank: null, men: "All cancers except skin", mcases: 2686, mrate: 250.4, women: "All cancers except skin", wcases: 2349, wrate: 211.2 },
          ],
          note: "Covers the Federation only, not Republika Srpska or Brčko District. The report does not say the rates are age-standardised, so they cannot be compared directly with IARC's age-standardised rates. 2020 was the first year of the COVID-19 pandemic. Colon and rectum are listed separately in the report.",
          sources: [
            { label: "Health status of the population and health care in the Federation of BiH in 2021, tables 14 and 15 (PDF)", url: FBIH_2021 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: two entity registries",
      aside: { label: "European Network of Cancer Registries: members", url: ENCR },
      cards: [
        {
          id: "two-registries",
          title: "A register in each entity, and a hospital registry in Sarajevo",
          plain:
            "There is no single national cancer registry. The Federation's Cancer Register was set up in 2004 at its public health institute; Republika Srpska's Registry of malignant neoplasms runs under a 2001 rulebook at its own institute and is a member of the European Network of Cancer Registries. Publication lags by two to three years.",
          detail:
            "The Institute for Public Health of the Federation says its Cancer Register was established in 2004 to collect data on every new cancer case, and that because the data come from many sources publication usually takes two to three years; its latest report on its publications page is for 2021, carrying registry data for 2020. Republika Srpska's yearly health reports say morbidity data come from the Registry of malignant neoplasms at the Public Health Institute, collected under a rulebook (Official Gazette of RS 28/01) from every institution that diagnoses or treats cancer. The European Network of Cancer Registries lists the Cancer Registry Republika Srpska as covering all ages and all sites for a population of 1,429,290 (2012), at the Institute and the University of Banja Luka's Faculty of Medicine. OnCo found no Bosnian registry in the network's list other than Republika Srpska's. The Clinic of Oncology at the Clinical Centre University of Sarajevo keeps its own hospital registry of malignant diseases.",
          links: [
            { label: "Health status of the population in the Federation of BiH in 2021, section 2.4.4 (PDF)", url: FBIH_2021 },
            { label: "PHI RS: health status of the population of Republika Srpska in 2024, methods (PDF, Cyrillic)", url: RS_2024 },
            { label: "European Network of Cancer Registries: members contact list", url: ENCR },
            { label: "KCUS: Clinic of Oncology", url: KCUS_ONK },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: an insurer for each entity",
      aside: { label: "ZZOR FBiH: Solidarity Fund", url: ZZO_FS },
      cards: [
        {
          id: "two-systems",
          title: "Compulsory insurance run separately in each entity, and about 31% of health spending paid out of pocket",
          plain:
            "Public money for health care in Bosnia and Herzegovina comes mainly from compulsory health insurance, but there is no national insurer. The Federation has ten cantonal funds and a federal institute, Republika Srpska has one fund, and Brčko District has its own. WHO's data show households paying about 31% of health spending directly in 2023.",
          detail:
            "The European Observatory on Health Systems and Policies describes 13 health insurance funds and 14 ministries responsible for health, with public funding coming mainly from compulsory insurance contributions pooled in each canton of the Federation, in Republika Srpska and in Brčko District. The Federation's public health institute states that health care there is mostly financed from compulsory health insurance. Insurance in the Federation is run by ten cantonal health insurance funds, with the Health Insurance and Reinsurance Institute of the Federation, working since 1998, holding a Solidarity Fund for the most complex care; its board has one member from each canton and one from the Federal Ministry of Health. Republika Srpska's Health Insurance Fund covers that entity on its own. Brčko District runs a separate fund whose pages OnCo could not reach. In WHO's Global Health Expenditure Database, out-of-pocket payments were 31.0% of current health expenditure in Bosnia and Herzegovina in 2023, up from 28.9% in 2020; general government spending was 67.3% of current health expenditure, and current health expenditure was 8.9% of GDP. These are national figures; WHO gives no split by entity.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share for Bosnia and Herzegovina (API)", url: WHO_GHED },
            { label: "European Observatory on Health Systems and Policies: Bosnia and Herzegovina", url: OBSERVATORY },
            { label: "ZZOR FBiH: about us", url: "https://zzofbih.ba/o-nama/" },
            { label: "Health status of the population in the Federation of BiH in 2021, chapter 5 (PDF)", url: FBIH_2021 },
          ],
        },
        {
          id: "fbih-solidarity",
          title: "In the Federation, a Solidarity Fund pays for cancer medicines on the same terms in every canton",
          plain:
            "Each canton insures its own residents, but cancer medicines on the Solidarity Fund's list are paid for centrally, so a patient's entitlement does not depend on how rich their canton's fund is. The list includes trastuzumab and pertuzumab for HER2-positive breast cancer, and nivolumab and pembrolizumab for some melanomas and lung cancers.",
          detail:
            "The Health Insurance and Reinsurance Institute says the Solidarity Fund, working since 1 July 2002 under article 13 of the Law on Health Insurance, exists so that the most serious illnesses are treated on the same terms for every insured person in the Federation, whatever their canton. It is financed from insurance contributions and partly from the Federation's budget. The Government's decision on the Fund's medicines list of 27 June 2019 (Official Gazette of the Federation 47/19, amended by 90/19, 58/23 and 23/24) has a section of cytostatics and one of cytostatics with a special prescribing regime, including trastuzumab, pertuzumab, nivolumab for advanced melanoma and pembrolizumab as first treatment for non-small cell lung cancer with PD-L1 of 50% or more. Expert committees approve the special-regime medicines: one for breast and lung cancer, one for other cancers, one for metastatic melanoma and one for haematology; another decides on children's cancers treated abroad. The Institute publishes running lists of medicines whose supply has been interrupted.",
          links: [
            { label: "ZZOR FBiH: Solidarity Fund", url: ZZO_FS },
            { label: "ZZOR FBiH: medicines financed by the Solidarity Fund", url: ZZO_DRUGS },
            { label: "Decision on the Solidarity Fund medicines list, Official Gazette of the Federation 47/19 (PDF)", url: ZZO_LIST },
          ],
        },
        {
          id: "rs-fund",
          title: "In Republika Srpska, no co-payment for cancer care, and full pay on sick leave",
          plain:
            "Republika Srpska's Health Insurance Fund says it pays for cancer treatment in full. People with cancer pay no co-payment for care related to their cancer, more than 80 cytostatics are given in hospitals, and newer medicines are available to a limited number of patients through a programme of more than 120 medicines.",
          detail:
            "The Fund's guide for people with malignant disease sets out the exemption from co-payment for ICD-10 codes C00 to C99, D00 to D09, Z51.0 and Z51.1, but not for care unrelated to the cancer. Cytostatics are given in hospital on the recommendation of an oncology board, and if a listed cytostatic is missing and the patient buys it, the Fund refunds the price paid. List A has five prescription medicines for breast and prostate cancer. In the medicines programme, innovative therapies are available on the proposal of the University Clinical Centre of Republika Srpska; the guide says these therapies are very expensive, with more than 250,000 KM a year spent on the treatment of one patient, not counting other costs. Treatment in Serbia, and abroad where needed, is funded on that centre's proposal. People with suspected cancer have priority for outpatient MRI and CT in 25 contracted institutions. Since 2020 people with cancer who are not employed can be insured on the basis of their illness.",
          links: [
            { label: "FZO RS: guide to the rights of people with malignant disease (PDF, Cyrillic)", url: FZO_GUIDE },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: one agency for the whole country",
      aside: { label: "ALMBIH: about us", url: ALM_ABOUT },
      cards: [
        {
          id: "almbih",
          title: "The Agency for Medicinal Products and Medical Devices, working since 2009",
          plain:
            "Health care is run by the entities, but medicines are registered once for the whole country by a state agency in Banja Luka, ALMBIH. Republika Srpska's public health institute gives the registration procedure as 210 days, or 150 days by a shortened procedure. Bosnia and Herzegovina was not on WHO's August 2026 list of regulators at maturity level 3 or 4.",
          detail:
            "The Agency was established by the Law on Medicinal Products and Medical Devices (Official Gazette of BiH 58/08) and started work on 1 May 2009, to create a single market for medicines and medical devices across the country. Its experts have taken part as observers in some European Medicines Agency boards and working groups since 2009 through the EU's pre-accession programme, and it has cooperation protocols with the agencies of Serbia, Montenegro and Croatia. The registration times come from the Public Health Institute of Republika Srpska's 2023 HPV guideline, which cites the rulebook on marketing authorisation (Official Gazette of BiH 75/11) and notes that an entity health ministry can permit the import of a medicine not yet registered, as Republika Srpska did for the nine-valent HPV vaccine. WHO's list of regulators operating at maturity level 3 and 4, dated August 2026, includes Serbia's agency but not Bosnia and Herzegovina's. OnCo did not find a national health technology assessment body in the sources read.",
          links: [
            { label: "ALMBIH: about us", url: ALM_ABOUT },
            { label: "ALMBIH: cooperation", url: ALM_COOP },
            { label: "PHI RS: guideline for HPV vaccination in Republika Srpska, section 3 (March 2023, PDF, Cyrillic)", url: RS_HPV },
            { label: "WHO: list of regulators operating at maturity level 3 and 4 (August 2026)", url: WHO_ML },
          ],
        },
        {
          id: "almbih-trials",
          title: "Clinical trials are authorised by the same agency, following EU directives",
          plain:
            "A cancer trial in Bosnia and Herzegovina needs the Agency's permission. Its Committee for clinical trials assesses each application, and the Agency says its decisions follow the EU's clinical trial directives. The Agency can inspect trial sites and stop or ban a trial.",
          detail:
            "The Agency's clinical trials page says applications are processed by experts from the Committee for clinical trials and the Agency, that decisions are issued in accordance with Directives 2001/20/EC and 2005/28/EC, and that it supervises trials under the Law on Medicinal Products and Medical Devices and the Regulation on clinical trials of medicinal products and medical devices (Official Gazette of BiH 4/10), along with Good Clinical Practice guidelines. It describes the Committee as an independent advisory body that assesses whether a trial is valid and complies with Good Clinical Practice, and protects the rights, safety and wellbeing of participants. The Agency may inspect sites where a trial is running and may stop or ban it. The page gives no target time for a decision, and OnCo found none elsewhere.",
          links: [
            { label: "ALMBIH: clinical trials", url: ALM_CT },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Radiotherapy",
      title: "Radiotherapy: six centres listed by the IAEA",
      aside: { label: "IAEA DIRAC: radiotherapy centres by country", url: DIRAC },
      cards: [
        {
          id: "dirac",
          title: "20 radiotherapy machines in six centres, in both entities",
          plain:
            "The IAEA's directory of radiotherapy centres lists six centres in Bosnia and Herzegovina, in Sarajevo, Tuzla, Živinice, Zenica, Mostar and Banja Luka, with 20 megavoltage machines between them, 19 of them linear accelerators. Republika Srpska's insurer says its patients have had radiotherapy in Banja Luka without waiting since 2010.",
          detail:
            "IAEA DIRAC, equipment by centre, read on 11 November 2026: Clinical Centre of Sarajevo University, 5 megavoltage units (4 linear accelerators and 1 cobalt-60) and 2 brachytherapy units, last updated 2024; University Clinical Center Tuzla, 3 linear accelerators, updated 2026; Medikol Salinea in Živinice, 5 linear accelerators, updated 2026; Cantonal Hospital Zenica, 1, updated 2024; University Clinical Hospital Mostar, 3 and 1 brachytherapy unit, updated 2020; International Medical Centers Banja Luka, 3 and 1 brachytherapy unit, updated 2025. That is 20 machines and 4 brachytherapy units for a population DIRAC gives as 3,140,095; entries not updated recently may be out of date. Republika Srpska's Health Insurance Fund says a Centre for radiotherapy in Banja Luka has given its patients radiotherapy without waiting since 2010, with accommodation and transport for those from distant areas; the guide does not say who runs the centre, and OnCo has not confirmed that it is the Banja Luka centre DIRAC lists. In November 2025 University Clinical Hospital Mostar opened an international tender for a stereotactic linear accelerator, co-funded by the EU's Interreg programme for Croatia, Bosnia and Herzegovina and Montenegro.",
          links: [
            { label: "IAEA DIRAC, equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "FZO RS: guide to the rights of people with malignant disease (PDF, Cyrillic)", url: FZO_GUIDE },
            { label: "LIFEGATE tender notice: stereotactic linear accelerator for University Clinical Hospital Mostar (PDF)", url: MOSTAR_LINAC },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO: HPV programme coverage rows for Bosnia and Herzegovina (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccine free in both entities since 2022 and 2023, but few children vaccinated so far",
          plain:
            "The Federation began offering the HPV vaccine at the end of 2022 and extended it to all cantons in 2023; Republika Srpska added it to its vaccination calendar in March 2023. Both use the nine-valent vaccine free of charge. In the coverage figures reported to WHO, fewer than one girl in ten had completed vaccination in 2024.",
          detail:
            "The Federation's public health institute recommends two doses for girls and boys aged 13 to 18, at least six months apart, and reported almost 5,500 doses given in the first two years, with the vaccine bought with support from the Government of the Federation. Republika Srpska's March 2023 guideline recommends it for girls and boys aged 11 or 12, in the sixth grade, with free vaccination also for ages 13 and 14, paid for by the entity government; people outside those ages pay. In the national rows reported to WHO, first-dose coverage of girls was 2% in 2022 (target 15,563), 6% in 2023, 3% in 2024 and 4% in 2025, and last-dose coverage 5% in 2023, 9% in 2024 and 4% in 2025; for boys, last-dose coverage was 3% in 2024 and 2% in 2025. The Federation's institute counts about 150 cervical cancers and 80 deaths a year in the Federation; Republika Srpska's about 200 cancers and 50 deaths in that entity.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Bosnia and Herzegovina (API)", url: WHO_HPV_API },
            { label: "ZZJZ FBiH: HPV immunisation is key against cervical cancer (15 January 2025)", url: FBIH_HPV },
            { label: "PHI RS: guideline for HPV vaccination in Republika Srpska (March 2023, PDF, Cyrillic)", url: RS_HPV },
          ],
        },
        {
          id: "screening-programmes",
          title: "Organised screening is still being built: bowel screening funded in Republika Srpska from 2025",
          plain:
            "OnCo found no organised national screening programme for breast, cervical or bowel cancer. Republika Srpska's insurer has paid for colorectal cancer screening in health centres since 2025, and the Federation mapped its cervical and breast cancer prevention services in 2023 and 2024 to prepare a programme.",
          detail:
            "The Health Insurance Fund of Republika Srpska's guide says that from 2025 it funds four new screening services in health centres, including early detection of colorectal cancer, alongside ultrasound, spirometry and dermoscopy introduced earlier; it gives no uptake figures. The Federation's public health institute, with the Federal Ministry of Health and UNFPA, carried out a mapping of health resources and services for cervical and breast cancer prevention in 2023 and 2024, which it describes as the basis for a comprehensive prevention programme for the two cancers in the Federation; OnCo did not find that programme published. A 2026 study of breast cancers at the Clinical Centre University of Sarajevo in 2019 to 2023 found 78.1% were diagnosed after women came with symptoms, and 62.4% at stage 1 or 2. A 2024 study found higher cervical cancer rates in areas where each gynaecologist covered a larger area.",
          links: [
            { label: "FZO RS: guide to the rights of people with malignant disease, screening (PDF, Cyrillic)", url: FZO_GUIDE },
            { label: "ZZJZ FBiH: HPV immunisation is key against cervical cancer (15 January 2025)", url: FBIH_HPV },
            { label: "Bešlija et al., breast cancer in Bosnia and Herzegovina (Sci Rep 2026)", url: SCIREP_2026 },
            { label: "Vuković et al., cervical cancer in Serbia and Bosnia and Herzegovina 2016 to 2020 (Medicina 2024)", url: MEDICINA_2024 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What it does",
      title: "What Bosnia and Herzegovina does differently",
      cards: [
        {
          id: "stock-in-public",
          title: "Medicine shortages published every week",
          plain:
            "The Clinic of Oncology in Sarajevo posts a notice each week saying which of the cytostatics on its list are out of stock, and the Federation's insurer keeps a running list of medicines whose supply has been interrupted. A patient can check before an appointment whether a medicine is missing.",
          detail:
            "The Clinical Centre University of Sarajevo publishes its notices under the heading 'state of cytostatics'. The notice of 9 November 2026 says the Clinic of Oncology has 89 cytostatics on its list, of which pemetrexed, lomustine, letrozole and ifosfamide were missing; earlier notices are dated 26 October and 2 November 2026. The Health Insurance and Reinsurance Institute of the Federation posts lists of medicines with a temporary or permanent interruption in supply, the latest covering 14 September to 6 November 2026. In Republika Srpska the Health Insurance Fund's guide gives patients a refund at the price paid if a listed cytostatic is not available in hospital and they buy it themselves. OnCo found no equivalent weekly notice for the other centres.",
          links: [
            { label: "KCUS: state of cytostatics, 9 November 2026", url: KCUS_CIT },
            { label: "KCUS: all notices on cytostatics", url: KCUS_CIT_ALL },
            { label: "ZZOR FBiH: medicines financed by the Solidarity Fund, with supply interruption notices", url: ZZO_DRUGS },
          ],
        },
        {
          id: "income-protection",
          title: "In Republika Srpska, full pay during sick leave for cancer",
          plain:
            "Since 2022 Republika Srpska's health insurance law pays people with cancer their full salary while on sick leave, and pays parents in full while caring for a child with cancer. Since 2020 someone with cancer who is not employed can be insured on the basis of the illness itself.",
          detail:
            "The Health Insurance Fund of Republika Srpska's guide says that under the Law on Compulsory Health Insurance, since 2022 salary during sick leave is paid at 100% for insured people with malignant disease, and in full to parents on leave to care for a child with cancer. Unemployed people with cancer have been able to register for health insurance on the basis of their illness since 2020, so that they are covered at every point of treatment; employed people are insured through their employer, and the guide warns that contributions must be paid for them to use their rights. The Fund also pays for medical aids including stoma sets, elastic sleeves, wigs, bras and breast prostheses. The Federation's arrangements for sick pay during cancer treatment were not read for this page.",
          links: [
            { label: "FZO RS: guide to the rights of people with malignant disease (PDF, Cyrillic)", url: FZO_GUIDE },
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
          id: "trials-in-ba",
          title: "12 trials in OnCo's records have a site in Bosnia and Herzegovina",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 12 trials in our records list a site in Bosnia and Herzegovina. They include trials in lung cancer (ALEX, ALINA), breast cancer (IMpassion130, lidERA, EORTC 22922), ovarian cancer (AURELIA) and three trials of proposed biosimilars.",
          detail:
            "The 12 trials are ALEX and ALINA of alectinib in ALK-positive lung cancer; IMpassion130 in triple-negative breast cancer; lidERA of giredestrant in early breast cancer; EORTC 22922/10925 of radiotherapy to the internal mammary and medial supraclavicular nodes; AURELIA in ovarian cancer; STEVIE of vismodegib in basal cell carcinoma; a trial of namodenoson in advanced liver cancer with Child-Pugh B7 cirrhosis; a trial of an immunoglobulin to prevent infections in people with chronic lymphocytic leukaemia, myeloma or lymphoma; and three comparing proposed biosimilars with pembrolizumab (MB12 and SB27, both in lung cancer) and nivolumab (ABP 206, in melanoma). This reflects the trials OnCo holds, not every study in the country; the ClinicalTrials.gov search linked below shows all cancer studies with a site there. Trials need the authorisation of the medicines agency's Committee for clinical trials.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Bosnia and Herzegovina (search)", url: CTGOV },
            { label: "ALMBIH: clinical trials", url: ALM_CT },
            { label: "Bešlija et al., breast cancer in Bosnia and Herzegovina (Sci Rep 2026)", url: SCIREP_2026 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "rs-incidence",
      title: "No published count of new cancers in Republika Srpska",
      plain:
        "Republika Srpska has a cancer registry, but OnCo found no published table of new cancer cases from it. The entity's yearly health reports for 2021 to 2024 give deaths from tumours and describe the registry, but no incidence figures.",
      detail:
        "The Public Health Institute of Republika Srpska's reports on the health of the population for 2021, 2022, 2023 and 2024 were read in full text. Each describes the Registry of malignant neoplasms and the rulebook under which cases are reported, and each gives deaths by cause, but none has a table of newly diagnosed cancers. The European Network of Cancer Registries lists the registry with a population year of 2012. The only Republika Srpska incidence figure on this page is the cervical cancer rate for 2016 to 2020 from a 2024 study's abstract. The Institute's publications page is linked so that a later report can be checked.",
      links: [
        { label: "PHI RS: publications", url: RS_PUBS },
        { label: "European Network of Cancer Registries: members contact list", url: ENCR },
      ],
    },
    {
      id: "fbih-recent",
      title: "The Federation's registry figures stop at 2020",
      plain:
        "The newest report from the Federation's public health institute that OnCo could find covers 2021 and carries cancer registry data for 2020, a pandemic year. Later registry figures for the Federation were not found on the Institute's site.",
      detail:
        "The Institute's page of reports on the health of the population lists editions up to the 2021 report, published in 2022 in four languages. The Institute says cancer data usually take two to three years to publish, so figures for 2021 or 2022 may exist in a report not yet posted. Rates in the 2021 report are given per 100,000 without saying whether they are age-standardised; the women's table also lists its tenth row with an ICD-10 code (C64, kidney) that does not match the site named (liver), so that row is left out here.",
      links: [
        { label: "ZZJZ FBiH: reports on the health of the population", url: FBIH_REPORTS },
        { label: "Health status of the population in the Federation of BiH in 2021 (PDF)", url: FBIH_2021 },
      ],
    },
    {
      id: "brcko",
      title: "Brčko District's insurer and health data were not reached",
      plain:
        "Brčko District runs its own health insurance fund and health services, but OnCo could not reach the fund's website and has not described what it pays for. Patients insured in Brčko should ask the fund directly.",
      detail:
        "The European Observatory on Health Systems and Policies says insurance contributions in Brčko District are pooled at district level. Several likely addresses for the District's health insurance fund did not answer from OnCo's network on 11 November 2026, and a web search could not be run to find the right one. The District's cancer figures are included in IARC's national estimate but in neither entity's reports read here. How patients insured in one entity or in Brčko are treated in another entity's hospitals was also not checked.",
      links: [
        { label: "European Observatory on Health Systems and Policies: Bosnia and Herzegovina", url: OBSERVATORY },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Bosnia and Herzegovina (PDF)", url: IARC_FACTSHEET },
        { label: "ZZOR FBiH: Solidarity Fund", url: ZZO_FS },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here: how long the medicines agency takes in practice, which new cancer medicines are registered, a national cancer control plan, the number of oncologists, and survival after diagnosis for the whole country.",
      detail:
        "The 210 and 150 day registration times are the procedure lengths as quoted in a 2023 Republika Srpska guideline, not taken from the Agency's own pages; OnCo found no published measured times. The Agency's medicines register was not searched medicine by medicine. OnCo found no national cancer control plan or entity cancer strategy in the sources read, and no IAEA imPACT review report for the country. The Federation's Solidarity Fund list read here is the 2019 decision with its amendments to 2024; Republika Srpska's cytostatics list and medicines programme were not read item by item. Survival figures are from one Sarajevo centre's breast cancer study. Radiotherapy figures are the IAEA's, and the entries for Mostar (2020), Sarajevo and Zenica (2024) may be out of date.",
      links: [
        { label: "ALMBIH: about us", url: ALM_ABOUT },
        { label: "IAEA DIRAC, equipment by centre (read 11 November 2026)", url: DIRAC },
      ],
    },
  ],
  institutions: [
    "almbih", "zzjz-fbih", "phi-republika-srpska", "zzo-fbih", "fzo-republika-srpska", "kcus-sarajevo",
    "who", "iarc", "iaea",
  ],
  companies: [],
  drugs: ["trastuzumab", "pertuzumab", "pembrolizumab", "nivolumab", "pemetrexed", "letrozole", "lomustine", "ifosfamide"],
  trials: ["alex", "alina", "aurelia", "eortc-22922", "impassion130", "lidera", "stevie", "nct05201404", "nct05645107", "nct06687369", "nct06348199", "nct06054555"],
  papers: ["paper-beslija-breast-cancer-bih-scirep-2026", "paper-vukovic-cervical-cancer-serbia-bih-medicina-2024"],
  people: [],
  how:
    "Every card was written from the sources of Bosnia and Herzegovina's two entities and international bodies, read in full rather than through a summary: the Federation's public health institute's 2021 report and its HPV news page; Republika Srpska's public health institute's reports for 2021 to 2024 and its 2023 HPV guideline, read in Cyrillic; the European Network of Cancer Registries' member list; the Federation insurer's Solidarity Fund pages and medicines list; Republika Srpska's insurer's guide for people with cancer; the medicines agency's pages; WHO's maturity level list, health expenditure rows and HPV coverage rows; the IAEA DIRAC equipment list; the Sarajevo clinical centre's oncology pages; IARC's GLOBOCAN 2024 fact sheet; and two papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page carry their own sources.",
  verify:
    "What a patient is entitled to depends on whether they are insured in the Federation (and in which canton), in Republika Srpska or in Brčko District, so ask your own insurance fund. Which cancer medicines are in stock changes week by week; the Sarajevo clinic's notice and the treating hospital's oncology department are the places to check. National figures are IARC estimates built from deaths, not a national count of new cancers.",
  verifyLinks: [
    { label: "Health Insurance and Reinsurance Institute of the Federation of BiH", url: "https://zzofbih.ba/" },
    { label: "Health Insurance Fund of Republika Srpska", url: "https://zdravstvo-srpske.org/" },
    { label: "Agency for Medicinal Products and Medical Devices of BiH", url: "https://almbih.gov.ba/" },
    { label: "KCUS: state of cytostatics", url: KCUS_CIT_ALL },
  ],
};
