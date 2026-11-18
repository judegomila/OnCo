import type { CountryDive } from "@/data/country-dive";

/**
 * Romania deep dive: the hand-written cards for /countries/ro/. Romanian sources were read in Romanian, from the raw
 * text of each PDF or page (pdftotext or the HTML), not from a summary of it: Law 293/2022 on preventing and
 * combating cancer with the national cancer plan in its annex (the consolidated text published by the medicines
 * agency, including changes to September 2024), Government Decision 663/2023 founding the National Cancer Registry,
 * Ministry of Health order 861/2014 on health technology assessment, the National Health Insurance House's National
 * Oncology Programme and cost-volume page (through the Internet Archive, because cnas.ro refused scripts), a press
 * release of the National Institute of Public Health of November 2025, and the institutes' own pages. The OECD and
 * European Commission's Country Cancer Profile 2025 (through the Internet Archive, because the registry's site
 * rejected scripts), Eurostat's causes-of-death data and EFPIA's W.A.I.T. 2024 report were read raw in English.
 * Every figure below is quoted from one of those; where a figure could not be read it is named under `gaps`.
 */
const LAW_293 = "https://www.anm.ro/_/LEGI%20ORDONANTE/Lege%20293-2022.pdf";
const HG_663 = "https://iob.ro/wp-content/uploads/2023/09/hotararea-nr-663-2023-privind-infiintarea-registrului-national-de-cancer.pdf";
const OMS_861 = "https://www.anm.ro/_/EVALUARE%20TEHNOLOGII%20MEDICALE/ORDIN%20Nr.%20861%20din%2023%20iulie%202014.pdf";
const ANM_HTA = "https://www.anm.ro/medicamente-de-uz-uman/evaluare-tehnologii-medicale/";
const PNO = "https://web.archive.org/web/2026/https://cnas.ro/wp-content/uploads/2024/06/PROGRAMUL-NATIONAL-DE-ONCOLOGIE.pdf";
const CNAS_PNS = "https://web.archive.org/web/20261025070721/https://cnas.ro/programe-nationale-de-sanatate-curative/";
const CNAS_CV = "https://web.archive.org/web/20261011015554/https://cnas.ro/contracte-cost-volum-cost-volum-rezultat/";
const CCP_2025 = "https://web.archive.org/web/2026/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-ro-2024-1682-en.pdf";
const CCP_RO = "https://doi.org/10.1787/a90c2c0d-ro";
const INSP_2025 = "https://dsp-gorj.centruldecalcul.ro/wp-content/uploads/2025/11/Comunicat-de-presa-1.pdf";
const EUROSTAT_CD = "https://ec.europa.eu/eurostat/databrowser/view/hlth_cd_aro/default/table";
const WAIT_2024 = "https://www.iqvia.com/-/media/iqvia/pdfs/library/publications/efpia-patients-wait-indicator-2024.pdf";
const IOB = "https://iob.ro/istoric";
const IOCN = "https://iocn.ro/istoric/";

export const RO_DIVE: CountryDive = {
  iso2: "RO",
  iso3: "ROU",
  name: "Romania",
  flag: "🇷🇴",
  asOf: "2026-11-04",
  title: "Cancer in Romania",
  description:
    "Cancer in Romania from Romanian sources: 46,004 cancer deaths registered in 2023 but no national count of new cancers found, a national registry founded by government decision in 2023, a cancer plan written into Law 293/2022, cancer medicines free through the National Oncology Programme, a points scale that decides reimbursement, an average 762 days from EU authorisation to reimbursement for cancer medicines in the W.A.I.T. 2024 survey, and cervical cancer screening being rebuilt around the HPV test.",
  lede:
    "Romania counts its cancer deaths, 46,004 in 2023. No national count of new cancers was found: a national registry was founded by government decision in 2023, and the OECD's 2025 profile said Romania did not yet have one and expected it to be fully working by the end of 2025. Cancer care and cancer medicines are free once cancer is confirmed, whether or not the patient is insured, but new cancer medicines reach Romanian patients later than the EU average, and cervical cancer is almost three times as common as the EU average.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Romania is 98,829 new cancers and 53,326 deaths in 2024, labelled ICD-10 C00-97 and including 3,453 non-melanoma skin cancers (95,376 without them). The OECD and European Commission's 2025 profile says Romania does not have a national cancer registry, and no national count of new cancers was found to compare: the profile uses the European Cancer Information System's estimate of about 100,471 new cancers expected in 2022, excluding non-melanoma skin cancer, also a model built on earlier trends. Deaths are counted: the National Institute of Statistics' figures, as published by Eurostat, record 46,004 deaths from malignant cancers (C00-C97) registered in Romania in 2023. GLOBOCAN's modelled 53,326 for 2024 is about 16% higher, and the gap is largest for lung cancer (10,486 against 8,878). Neither source explains the difference, so it is stated here rather than explained. The OECD profile quotes 45,866 cancer deaths in 2022 from the same statistics institute, close to Eurostat's 45,853 for all neoplasms that year.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Romania",
      aside: { label: "OECD/EC: Country Cancer Profile Romania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
      cards: [
        {
          id: "shape",
          title: "About 46,000 cancer deaths a year, and lung cancer the commonest cause",
          plain:
            "Romania registered 46,004 deaths from cancer in 2023, about one death in five. Lung cancer caused the most, 8,878, followed by bowel cancer and breast cancer. Cancer deaths among Romanian men are above the EU average and have fallen more slowly over the past decade than in the rest of the EU.",
          detail:
            "Eurostat's causes-of-death table, built from the National Institute of Statistics' death registrations, records 46,004 deaths from malignant cancers (C00-C97) reported in Romania in 2023, out of 241,928 deaths from all causes, or 19.0%; the OECD profile also gives 19% for 2019, before COVID-19 deaths changed the proportions. Lung cancer caused 8,878 of the 2023 deaths, colon, rectum and anus 6,211, breast 3,285 and pancreas 2,706. The OECD and European Commission's 2025 profile puts Romania's age-standardised cancer mortality in 2021 at 243 per 100,000, 3% above the EU average, with men 10% above and women 4% below. Between 2011 and 2021 cancer mortality fell by 8% among Romanian men, against 16% across the EU, and by 7% among women, against 9%. The profile records that mortality from breast, colorectal, prostate, kidney and melanoma cancers rose in Romania over that decade while it fell across the EU, and it links the growing colorectal gap to the absence of screening outside pilot projects.",
          links: [
            { label: "Eurostat: causes of death by country of residence (hlth_cd_aro), Romania 2021 to 2023", url: EUROSTAT_CD },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 2 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "cervix-burden",
          title: "Cervical cancer: almost three times the EU rate",
          plain:
            "Cervical cancer is the third commonest cancer in Romanian women, after breast and bowel cancer, which is not the pattern elsewhere in the EU. Romania has the highest cervical cancer incidence and mortality in the EU, although deaths among younger women have been falling.",
          detail:
            "The OECD profile, using ECIS estimates for 2022, gives Romania 33 new cervical cancers per 100,000 women against 12 across the EU, and calls cervical cancer the third most common cancer in Romania after breast and colorectal. Cervical cancer mortality fell by 25% between 2011 and 2021 but was still about three times the EU average, 12 deaths per 100,000 against 4. Among women under 65 the death rate fell from 11.9 to 7.7 per 100,000 between 2011 and 2021, against 3.0 to 2.4 across the EU. The National Institute of Public Health's press release of November 2025 quotes ECIS rates of 32.6 new cases and 16.8 deaths per 100,000 women in 2022 and estimates 3,368 new cases and 1,793 deaths in 2023; Eurostat's death registrations record 1,179 cervical cancer deaths in 2023. The two sets of figures measure different things: the institute's are modelled estimates, Eurostat's are death certificates coded to the cervix.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 2 and table 1 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "INSP press release, 17 November 2025 (PDF, DSP Gorj copy)", url: INSP_2025 },
            { label: "Eurostat: causes of death (hlth_cd_aro)", url: EUROSTAT_CD },
          ],
        },
      ],
      tables: [
        {
          id: "eurostat-deaths",
          title: "Cancer deaths registered in Romania, 2021 to 2023, by site",
          caption: "All deaths reported in Romania, which in this Eurostat series includes deaths of non-residents, both sexes, all ages, by underlying cause (ICD-10). National Institute of Statistics data as published by Eurostat, table updated 27 October 2026.",
          columns: [
            { key: "site", label: "Cause of death (ICD-10)" },
            { key: "y2021", label: "2021", numeric: true },
            { key: "y2022", label: "2022", numeric: true },
            { key: "y2023", label: "2023", numeric: true },
          ],
          rows: [
            { site: "All malignant cancers (C00-C97)", y2021: 45925, y2022: 45444, y2023: 46004 },
            { site: "Trachea, bronchus and lung (C33-C34)", y2021: 8415, y2022: 8636, y2023: 8878 },
            { site: "Colon, rectum and anus (C18-C21)", y2021: 6226, y2022: 6252, y2023: 6211 },
            { site: "Breast (C50)", y2021: 3414, y2022: 3200, y2023: 3285 },
            { site: "Pancreas (C25)", y2021: 2672, y2022: 2641, y2023: 2706 },
            { site: "Stomach (C16)", y2021: 2636, y2022: 2499, y2023: 2580 },
            { site: "Liver and intrahepatic bile ducts (C22)", y2021: 2417, y2022: 2445, y2023: 2536 },
            { site: "Prostate (C61)", y2021: 2338, y2022: 2251, y2023: 2121 },
            { site: "Lip, oral cavity and pharynx (C00-C14)", y2021: 1912, y2022: 1788, y2023: 1748 },
            { site: "Bladder (C67)", y2021: 1522, y2022: 1588, y2023: 1612 },
            { site: "Brain and central nervous system (C70-C72)", y2021: 1493, y2022: 1469, y2023: 1413 },
            { site: "Cervix uteri (C53)", y2021: 1301, y2022: 1290, y2023: 1179 },
          ],
          note: "These are death registrations, not new cases: no national count of new cancers was found for Romania. Deaths from all causes were 331,755 in 2021, 269,559 in 2022 and 241,928 in 2023, so the share caused by cancer moved with COVID-19 deaths. Breast deaths are both sexes.",
          sources: [{ label: "Eurostat: causes of death, deaths by country of residence and occurrence (hlth_cd_aro), Romania", url: EUROSTAT_CD }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry founded in 2023",
      aside: { label: "HG nr. 663/2023 privind înființarea Registrului Național de Cancer (PDF)", url: HG_663 },
      cards: [
        {
          id: "rnc",
          title: "A registry decided by government in 2023, with a 30-day reporting duty",
          plain:
            "A government decision of August 2023 founded a national cancer registry, run by the National Institute of Public Health, and requires every public and private hospital or clinic to report each new cancer within 30 days. The OECD's 2025 profile said Romania did not yet have a national registry and expected this one to be fully working by the end of 2025; whether it now is was not established for this page.",
          detail:
            "Government Decision 663/2023, in force from 4 August 2023, founds the Registrul Național de Cancer as the information system for the named, population-based registration of new cancer cases, owned and run by the National Institute of Public Health. Providers that diagnose or treat cancer must report every reportable tumour, coded with ICD-O-3, within 30 days of diagnosis, of a revised diagnosis, of the end of initial treatment or of death; reportable tumours are all in situ and invasive cancers except basal cell skin carcinoma, all brain and spinal tumours, and borderline tumours. Fines of 500 to 5,000 lei for repeated failure to report, after a first warning, take effect only 30 days after the registry's software is running, and the software is paid for from Romania's recovery and resilience plan. The decision repealed the 2007 order that had set up regional registries. The government's explanatory note of July 2023 stated that Romania had no national register from which annual incidence could be calculated, so that health policy rested on fragmented data, mostly estimates. The OECD and European Commission's 2025 profile says the registry was expected to be fully working by the end of 2025 and linked to the screening registries and the childhood cancer registry; no published output from it was found for this page.",
          links: [
            { label: "Hotărârea Guvernului nr. 663/2023, articles 1 to 14 (PDF)", url: HG_663 },
            { label: "Ministry of Health: notă de fundamentare, Registrul Național de Cancer, 25 July 2023 (DOC)", url: "https://management-documente.ms.ro/media/documents/NOTA_DE_FUNDAMENTARE_-_REGISTRUL_DE_CANCER_-_25.07.2023_iYSOmkM.doc" },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, box 3 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "regional-registries",
          title: "Until then: two working regional registries and one national childhood registry",
          plain:
            "Regional cancer registries have been regulated since 2007, but only two of eight collect data routinely, in Cluj and Timiș. The only registry with national coverage is the childhood cancer registry kept by the paediatric onco-haematology society, which reports five-year survival in children rising from 69% to 74%.",
          detail:
            "The annex to Law 293/2022 records, as the starting point for its registry objective, that two regional registries were working, at Cluj and Timiș, and sets 2023 to 2024 for building a national one with compulsory core variables, a public website and penalties for hospitals that fail to report. The OECD profile says that, although regulated since 2007, only two of eight regional registries collect data routinely, so current survival data for Romanian cancer patients are not available, and that earlier studies showed lower five-year net survival than the EU averages for all cancers. It describes the Childhood Cancer Registry, maintained by the Romanian Society for Paediatric Onco-Haematology with support from a charity, as the only nationally functional registry, with national coverage and high-quality data; that registry reported five-year survival in children aged 0 to 14 of 69% for those diagnosed in 2010 to 2013 and 74% for 2014 to 2017. The profile also notes that, of 436 trials that enrolled children with cancer in Europe from 2010 to 2022, 16 ran in Romania.",
          links: [
            { label: "Legea nr. 293/2022, annex, objective B.4 (PDF)", url: LAW_293 },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, sections 5.2 and 6 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: social health insurance, and cancer care free once it is confirmed",
      aside: { label: "CNAS: Programul național de oncologie (PDF, Internet Archive copy)", url: PNO },
      cards: [
        {
          id: "cnas-card",
          title: "One national health insurer, and about one person in seven uninsured",
          plain:
            "Health care in Romania is paid for mainly by social health insurance managed by the National Health Insurance House (CNAS). About 14% of people are uninsured. Tests to find out whether someone has cancer are generally not covered for them, but once cancer is confirmed, treatment is free for every patient, insured or not.",
          detail:
            "The OECD and European Commission's 2025 profile describes a social health insurance system whose funds are managed by the National Health Insurance House, with around 14% of the population uninsured in 2023 according to the House. Diagnostic procedures beyond screening are generally not covered for uninsured people, and European Social Fund Plus money pays for diagnosis for uninsured people with a positive screening result; once cancer is confirmed, cancer care is guaranteed and free of charge for all patients regardless of insured status. Out-of-pocket payments rose from 19% of health spending in 2019 to 21% in 2022. Article 4 of Law 293/2022 gives everyone living in Romania, including EU, EEA and Swiss citizens and residents without citizenship, a state-guaranteed right to the medical, care, palliative, psycho-oncology, onconutrition, oncofertility and social services in the cancer plan, and article 2 makes the Health Insurance House and the Ministry of Finance responsible for carrying out its measures. The profile notes that in 2024 more than 100 packages of diagnostic services for most solid tumours were made available to all patients, insured or not.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Romania 2025, sections 4 and 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Legea nr. 293/2022, articles 2 and 4 (PDF)", url: LAW_293 },
          ],
        },
        {
          id: "oncology-programme",
          title: "The National Oncology Programme: medicines, radiotherapy and genetic tests",
          plain:
            "Cancer medicines, radiotherapy and tumour genetic tests are paid for through a national programme run by the Health Insurance House. Its own text plans for about 167,000 patients a year receiving cancer medicines and 10 receiving CAR-T cell therapy, which two centres give, in Bucharest and Iași.",
          detail:
            "The House's text of the Programul național de oncologie lists six subprogrammes: medicines for adults and children with cancer (cytotoxic drugs, immunomodulators, hormones, growth factors and bone-protecting drugs in hospital and outpatient care, plus CAR-T cell therapy in hospital), breast reconstruction with implants, diagnosis and monitoring of blood cancers by immunophenotyping, cytogenetics, FISH and molecular biology, radiotherapy, genetic diagnosis of solid tumours, and genetic testing. Its evaluation indicators are 167,243 patients a year treated with cancer medicines at an average 25,554 lei each, and 10 patients a year treated with CAR-T at an average 1,489,579.47 lei each; CAR-T is given to children and young adults up to 25 with relapsed or refractory B-cell acute lymphoblastic leukaemia and to adults with diffuse large B-cell lymphoma after two or more lines of treatment, at the Fundeni Clinical Institute in Bucharest and the Iași Regional Oncology Institute. The radiotherapy subprogramme pays a tariff per session, for example 29 lei for orthovoltage, 640 lei for IMRT in adults and 3,212 lei for stereotactic treatment in adults, with higher tariffs for children treated under anaesthesia, and its indicators include 26,394 patients a year treated with IMRT. The OECD profile adds that oncology medicines are provided free through the programme for all patients, and that tumour genetic testing for breast, ovarian, lung and colorectal cancer has been reimbursed through it since 2023.",
          links: [
            { label: "CNAS: Programul național de oncologie (PDF, Internet Archive copy)", url: PNO },
            { label: "CNAS: programe naționale de sănătate curative (Internet Archive copy, 25 October 2026)", url: CNAS_PNS },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "plan-funding",
          title: "A cancer plan with a funding floor written into the law",
          plain:
            "Law 293/2022, which adopts Romania's national cancer plan for 2023 to 2030, says the plan must receive at least a fifth of all the money approved each year for national health programmes. It also creates a Health Innovation Programme, meant to pay for innovative treatments from their European authorisation until they are reimbursed.",
          detail:
            "Article 5 of Law 293/2022, as consolidated by the medicines agency with changes up to an emergency ordinance of September 2024, finances the plan from the Ministry of Health's budget and the national health insurance fund, and sets the sum approved each year at no less than 20% of all funds approved for national health programmes run by the Ministry and the Health Insurance House. Paragraph 3 creates the Programul de inovație în sănătate as a mechanism for access to innovative treatments, funded from the state budget through the Ministry and transferred to the House, with criteria and payment rules to be set by a joint order of the minister and the House's president. The plan's own text sets out what it is for: a budget fixed for four years, rules to give access from the moment of EMA authorisation until reimbursement in Romania, and priority for cancer medicines with no therapeutic alternative. The OECD's 2025 profile describes the programme as still in preparation, with its criteria, pricing and financing in development; whether it has since paid for any medicine was not established for this page.",
          links: [
            { label: "Legea nr. 293/2022, article 5 and annex, objective on access to innovative treatment (PDF)", url: LAW_293 },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Romania decides which cancer medicines are reimbursed",
      aside: { label: "ANMDMR: evaluare tehnologii medicale", url: ANM_HTA },
      cards: [
        {
          id: "scorecard",
          title: "A points scale built on other countries' decisions",
          plain:
            "Romania's medicines agency decides whether a new medicine can be reimbursed by scoring it on a points scale. Most of the points come from what France, the United Kingdom and Germany decided, how many EU countries already pay for it, and whether it costs more than the treatment it would replace. A clinical trial of the medicine run in Romania can earn extra points.",
          detail:
            "Ministry of Health order 861/2014 makes the Agenția Națională a Medicamentului și a Dispozitivelor Medicale the national authority that carries out health technology assessment and proposes to the Ministry the list of reimbursed medicines, which the Government approves by decision (Government Decision 720/2008, updated at least once a year). In the text consolidated to July 2020 and published by the agency, a new medicine or new indication earns up to 15 points for France's HAS rating of its therapeutic benefit, up to 15 for a positive NICE or SMC opinion in the United Kingdom and up to 15 for added benefit found by Germany's IQWiG or G-BA; 25 points if it is reimbursed in at least 14 EU member states and the United Kingdom, 20 for 8 to 13 and 10 for 3 to 7; and up to 30 for cost against a comparator, with none if it costs more than 3% more per patient. A Romanian clinical trial of the medicine in that indication, an EUnetHTA assessment or a notified real-world data study earns 45 points instead of the three foreign assessments. The agency then decides unconditional inclusion, conditional inclusion on the basis of a cost-volume or cost-volume-result contract, or non-inclusion. The score thresholds between those outcomes were not found in the text read.",
          links: [
            { label: "Ordinul MS nr. 861/2014, articles 6 and 7, annex 1 table 4, annexes 3 and 5 (PDF)", url: OMS_861 },
            { label: "ANMDMR: evaluare tehnologii medicale", url: ANM_HTA },
          ],
        },
        {
          id: "cost-volume",
          title: "Cost-volume contracts, negotiated within a yearly sum",
          plain:
            "A new medicine can enter Romania's reimbursed list on condition, and cancer medicines are among those handled this way: the maker signs a contract with the Health Insurance House and the Ministry that limits what the state pays, by price, by number of patients or by results. The House negotiates these contracts during the year within a sum it announces as still available.",
          detail:
            "Annex 5 of order 861/2014 defines two kinds of contract. In a cost-volume contract the marketing authorisation holder supplies a set number of units free for a set number of patients over a set period, or supplies the medicine at a negotiated price for a defined group of patients; in a cost-volume-result contract the same terms apply on condition that a therapeutic target is reached. Each contract states the number and profile of patients, the free or discounted units, the negotiated price, the period and the sanctions, and is negotiated between the company and representatives of the Ministry of Health and the Health Insurance House. The House's cost-volume page, captured on 11 October 2026, shows negotiations under joint order 735/976/2018 continuing through 2026 by therapeutic area, including oncology, with notices of the sum remaining available at successive dates in 2026 within which negotiation may continue, and lists of the number of eligible patients set by the Ministry's specialist committees for each therapy given a conditional inclusion decision.",
          links: [
            { label: "Ordinul MS nr. 861/2014, annex 5 (PDF)", url: OMS_861 },
            { label: "CNAS: contracte cost-volum / cost-volum-rezultat (Internet Archive copy, 11 October 2026)", url: CNAS_CV },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: ANMDMR, inside the European system",
      aside: { label: "ANMDMR", url: "https://www.anm.ro/" },
      cards: [
        {
          id: "anmdmr-card",
          title: "Approval in Brussels, then a wait for reimbursement in Bucharest",
          plain:
            "New cancer medicines are authorised once for the whole European Union, so they are legally available in Romania at the same time as everywhere else in the EU. What a Romanian patient waits for is reimbursement. Romania's own cancer plan says that wait was about 29 months in 2020, the longest in the industry survey it cites.",
          detail:
            "New active substances for cancer go through the EU centralised procedure, in which the European Commission grants one marketing authorisation for every member state on the opinion of the European Medicines Agency. The Romanian agency authorises clinical trials, runs pharmacovigilance and, under order 861/2014, assesses medicines for reimbursement. The national cancer plan annexed to Law 293/2022 quotes the EFPIA Patients W.A.I.T. Indicator 2020 survey, carried out with IQVIA, as placing Romania last for the wait between EMA authorisation and access to a new medicine through reimbursement, about 29 months (883 days), against 120 days in Germany, 418 in Italy and 692 in Bulgaria, and says that of 152 innovative medicines authorised by the EMA from 2016 to 2019 only 39 had entered Romania's reimbursed list by 1 January 2021. Among the causes it names are companies waiting for other countries to decide before applying, bureaucracy, an assessment system it calls restrictive towards innovation, budget limits and an understaffed assessment team. The plan's measures include strengthening the agency's assessment department and making updates of the reimbursed list and treatment protocols predictable. The OECD's 2025 profile adds that national rules on the assessment process have been simplified in recent years to shorten the time between authorisation and availability.",
          links: [
            { label: "Legea nr. 293/2022, annex, objective on access to innovative treatment (PDF)", url: LAW_293 },
            { label: "EMA: authorisation of medicines, scope of the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
            { label: "ANMDMR", url: "https://www.anm.ro/" },
          ],
        },
        {
          id: "wait-2024",
          title: "762 days on average for cancer medicines, against 586 across the EU",
          plain:
            "The industry's 2024 W.A.I.T. survey counted 56 cancer medicines authorised for the EU from 2020 to 2023. By January 2025, 11 of them were available to Romanian patients through reimbursement, and those took an average of 762 days after EU authorisation. The EU average was 586 days, with half of the medicines available.",
          detail:
            "The EFPIA Patients W.A.I.T. Indicator 2024 survey, prepared by IQVIA for EFPIA and published in April 2025 with data correct to 5 January 2025, covers 173 innovative medicines centrally authorised from 2020 to 2023 in 36 countries. For Romania it defines the date of availability as the publication in the Official Journal of the government decision or, for most medicines, of the therapeutic protocol. Of the 56 oncology medicines, 11 were available in Romania (20%), against an EU average of 28 (50%), and the mean time from central authorisation to availability for those 11 was 762 days, against an EU average of 586. Across all 173 medicines, 33 were available in Romania (19%), against an EU average of 80 (46%), with a mean time of 828 days against 578. These are figures from the pharmaceutical industry's own survey; the Romanian authorities' own measure of the delay was not found. The Romanian figures are the value labels printed on the report's charts; each count agrees with the percentage printed beside it, and the order of the time labels matches the one value the report also states in text (776 days for France). The median times were not used because their labels could not be matched with confidence.",
          links: [{ label: "EFPIA Patients W.A.I.T. Indicator 2024 Survey, IQVIA, April 2025, pages 13, 18, 23 and 27 (PDF)", url: WAIT_2024 }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: pilots becoming programmes",
      aside: { label: "INSP press release, 17 November 2025 (PDF, DSP Gorj copy)", url: INSP_2025 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening since 2012, now moving to the HPV test",
          plain:
            "Romania's first national screening programme, started in 2012, offers women a free cervical test every five years. A 2024 Ministry of Health order sets new rules, and the health insurance package now includes an HPV test, with a smear test only if it is positive, for women aged 25 to 64 every five years. Few women have taken part so far.",
          detail:
            "The National Institute of Public Health's press release of November 2025 describes the national programme, set up in 2012, as offering a free Babeș-Papanicolaou test every five years; a regional pilot introduced HPV testing in the North-West, North-East, South-Muntenia and Centre regions, aimed at 680,000 women aged 25 to 64, half from vulnerable groups. Ministry of Health order 3735/2024 now sets the screening methodology, and the outpatient package in the Health Insurance House's framework contract includes HPV testing with cytology triage for women aged 25 to 64 once every five years; from 2026 European funds are to keep paying for screening of women in vulnerable groups. The national cancer plan in Law 293/2022 records that about 612,000 tests were done in the programme from 2012 to 2017, about 11% of the eligible population, and that attendance did not exceed 20% in the second round. The OECD's 2025 profile gives 39% of women aged 25 to 69 reporting a test in the past three years in 2019, through organised and opportunistic routes together. Its account of the HPV pilot gives both 200,000 and 120,000 women tested in different places, so neither figure is used here.",
          links: [
            { label: "INSP press release, cervical cancer elimination day, 17 November 2025 (PDF, DSP Gorj copy)", url: INSP_2025 },
            { label: "Legea nr. 293/2022, annex, cervical cancer chapter (PDF)", url: LAW_293 },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 4 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "breast-bowel-pilots",
          title: "Breast and bowel screening: EU-funded pilots, and 9% mammography coverage in 2019",
          plain:
            "Breast and bowel screening have so far been described only as pilots: EU-funded projects screened 60,000 women with mammograms and aimed a bowel test at 200,000 people. National methods for both were adopted in 2024, and the OECD's 2025 profile describes organised programmes as still in their first phases. In 2019, 9% of women aged 50 to 69 had had a mammogram in the past two years, the lowest share in the EU.",
          detail:
            "The OECD and European Commission's 2025 profile describes a breast screening pilot, funded by the European Social Fund from 2018, that tested 60,000 women with mammography in four regions, mostly rural, using two mobile units, for one round in 2022 to 2023, and a colorectal pilot that targeted 200,000 people aged 50 to 74 in four regions, with a faecal immunochemical test every two years for people at average risk and colonoscopy every five years for those at high risk; uptake in the pilot was 52%, and people with positive results were offered counselling and material support to reach colonoscopy. The national cancer plan names the colorectal pilots ROCCAS and ROCCAS II, begun in December 2018 and December 2019, and their centres: the Fundeni Clinical Institute, the Central Military Emergency Hospital, the county emergency hospital of Constanța, and the Craiova county emergency hospital with the Craiova medical university, each centre with a target of 50,000 people, 200,000 in all. In 2024 the Ministry of Health adopted national methodologies for cervical, colorectal and breast screening, moved their financing to the Health Insurance House, and adopted quality indicators for colorectal and cervical screening; planning for prostate and lung screening pilots had begun. Survey data for 2019 put mammography in the past two years at 9% of women aged 50 to 69 and bowel testing at 3% of people aged 50 to 74.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 4 and box 2 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Legea nr. 293/2022, annex, colorectal cancer chapter (PDF)", url: LAW_293 },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination: free for girls and boys, after a failed start in 2008",
          plain:
            "Romania's first HPV vaccination programme in 2008 did not win public acceptance, and the vaccine was offered again from 2019. Vaccination is now free for girls and boys aged 11 to 26, and half-price for women aged 27 to 45, on a family doctor's recommendation.",
          detail:
            "The OECD profile records that the 2008 programme failed to gain acceptance, that the programme resumed in 2019 for girls aged 11 to 14 and then 11 to 18, and that the national electronic vaccination registry showed 28,234 girls aged 11 to 14 (5% of the age group) and 22,446 aged 15 to 18 (6%) fully vaccinated in 2022, a count that leaves out vaccines bought privately. Preliminary registry data show about 100,000 girls aged 11 to 18 vaccinated in the first half of 2024, around 10% coverage. The National Institute of Public Health's press release of November 2025 describes the current offer as free vaccination for girls and boys aged 11 to 26 and 50% reimbursement for women aged 27 to 45, with a family doctor's recommendation. The profile cites a 2020 survey in which 75% of mothers asked were in favour of HPV vaccination for their daughters.",
          links: [
            { label: "INSP press release, 17 November 2025 (PDF, DSP Gorj copy)", url: INSP_2025 },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 3 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Romania does",
      title: "What Romania does that others do not",
      cards: [
        {
          id: "plan-in-law",
          title: "A cancer plan passed as a law, with rights and deadlines in it",
          plain:
            "Romania's cancer plan is not a government strategy but the annex to a law, Law 293/2022, which makes carrying it out an obligation for every public authority. It gives every resident a legal right to cancer care, palliative care, psycho-oncology, nutrition and fertility support, social services and a monthly food allowance, and sets targets of 30 days to diagnosis and 60 days from suspicion to treatment.",
          detail:
            "Law 293/2022 of 3 November 2022, in force from 1 January 2023, approves the Planul național de prevenire și combatere a cancerului în România for 2023 to 2030 as its annex and calls it the main public policy document on cancer; article 3 makes meeting its objectives an obligation of all central and local public authorities and of all natural and legal persons, and article 4 lists the guaranteed services, including social services and monthly food allowances. In its chapter on the patient's pathway, the plan records that Romania had no standard pathway and no fixed deadlines for diagnosis, and sets measures to establish the resources for a diagnosis within 30 days of the first suspicion, to let a family doctor order scans and endoscopies when cancer is suspected, to let one referral cover all the monitoring a protocol requires, and to introduce a 60-day limit from suspicion to the start of treatment, with separate waiting lists for cancer patients and patient navigators. The OECD's 2025 profile notes that the plan is carried out through secondary rules on registration, diagnostic criteria, screening guidelines and pathology reporting, and that it does not give priority to cancer inequalities or to children's cancer.",
          links: [
            { label: "Legea nr. 293/2022, articles 1 to 8 and annex, chapter B.1 (PDF)", url: LAW_293 },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 2 and box 1 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "survivor-rights",
          title: "Paid leave for carers, psychological support and a right to be forgotten",
          plain:
            "Romania now pays for psychological counselling for cancer patients and their families, for transport to treatment for patients who live far from it, and for up to 45 days a year of paid leave for a carer to go with a patient to treatment or surgery. A law on the right to be forgotten opens financial products to people five years after remission.",
          detail:
            "The OECD and European Commission's 2025 profile records that, as part of the cancer plan, psycho-oncology services were regulated and added to the basic package paid for by the Health Insurance House, that a regulation on psychology facilities for cancer patients was adopted in 2023, and that new support services were introduced for reimbursement: an annual psychological evaluation and at least five counselling sessions for patients and their families, extended home care including paid transport to and from treatment for patients with no service where they live, and paid leave for carers who accompany patients to treatment and surgery, capped at 45 days a year. It also records that Romania adopted a law on the right to be forgotten, giving access to financial products for cancer patients after five years of remission. On palliative care it cites a national evaluation of 2019 that found only 5% of palliative care needs met: of 33,000 patients needing palliative care, 29,650 had to be admitted to hospital because that was the only form available to them. The underlying Romanian acts on carer leave and the right to be forgotten were not read for this page.",
          links: [{ label: "OECD/EC: Country Cancer Profile Romania 2025, section 5.4 (PDF, Internet Archive copy)", url: CCP_2025 }],
        },
        {
          id: "distance",
          title: "Travelling for treatment: 24 of 42 counties without radiotherapy",
          plain:
            "Cancer specialists and machines are concentrated in a few cities. In 2022, 19 of Romania's 42 counties had fewer than 2 oncologists per 100,000 people. The OECD's 2025 profile says 24 counties had no radiotherapy equipment and that over half the patients of the three cancer institutes travel long distances. The institute in Iași runs a patients' hotel for people from outside the city.",
          detail:
            "The OECD and European Commission's 2025 profile, citing the Ministry of Health's oncology commission, gives 4.4 oncologists per 100,000 people in 2022, with fewer than 2 oncologists and oncology residents per 100,000 in 19 of 42 counties and 2 to 4 in 15. Radiotherapy equipment was 5 machines per million people in 2022, 38% below the EU average of 8.0, although it had grown by 27% since 2013; 24 of 42 counties still lacked it, so patients travel long distances and oncology centres sometimes give radiotherapy as inpatient care, although the Ministry says 87% of radiotherapy is outpatient. The profile gives no year for the 24 counties. The IAEA's directory of radiotherapy centres, read on 16 November 2026, lists 55 centres in Romania with 97 linear accelerators, no cobalt-60 units and 2 gamma knife units, 16 of the centres with brachytherapy; every entry was last updated in 2026, entries are reported by the centres themselves, and the directory does not say how many counties they cover. Over 50% of the patients of the three oncology institutes travel long distances from their home county, and the Iași Regional Oncology Institute has set up a patients' hotel where it treats people from outside the city. The profile records that construction of a new oncology institute in Timișoara has been started with recovery and resilience funds, that World Bank funding is mainly increasing access to radiotherapy, and that two of the three institutes take part in EU joint actions on comprehensive cancer centres and networks. In 2020, 328 communities had no family doctor.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Romania 2025, sections 2 and 5.1 to 5.3 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Profil de țară privind cancerul: România 2025 (OECD, Romanian edition)", url: CCP_RO },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: "https://dirac.iaea.org/Data/CountriesLight" },
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
          id: "trials-in-romania",
          title: "325 cancer trials in OnCo's records have a site in Romania, all led from abroad",
          plain:
            "Of the cancer trials OnCo holds, 325 list a site in Romania on ClinicalTrials.gov, and 106 were recruiting when last read. They are international trials, mostly phase 3 and led by companies such as Bristol-Myers Squibb, MSD and AstraZeneca. None in OnCo's records is led by a Romanian sponsor.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph, and counted again on 17 November 2026: 325 trials list Romania among their countries, 255 of them phase 3, 33 phase 2, 21 phase 2/3, 14 phase 1/2 and 2 phase 1. ClinicalTrials.gov gives 140 as active but not recruiting, 106 recruiting, 73 completed and 6 terminated. Bristol-Myers Squibb is lead sponsor of 49, Merck Sharp & Dohme of 32, AstraZeneca of 21, and Eli Lilly and Hoffmann-La Roche of 18 each; non-small cell lung cancer is the first-listed cancer for 82. A few are small: a drug interaction study of AstraZeneca's PARP1 inhibitor AZD5305 lists two countries, and a phase 3 trial of THIO with cemiplimab in third-line lung cancer and a trial of fosnetupitant and palonosetron for sickness in children on chemotherapy list four. OnCo's OpenAlex snapshot of 8 September 2026 counts 377 oncology papers with a Romanian author in 2021 and 475 in 2025, 2,073 over the five years, and 3,681 ClinicalTrials.gov studies of all conditions with a site in Romania. The OECD's 2025 profile says the medicines agency coordinated Romania's first Strategic Plan on Clinical Studies in 2024, with aims including a mechanism for recruiting patients and more staff for clinical studies.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Romania", url: "https://clinicaltrials.gov/search?cond=Cancer&country=Romania" },
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "OECD/EC: Country Cancer Profile Romania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "institutes",
          title: "The cancer institutes in Bucharest, Cluj-Napoca and Iași",
          plain:
            "Most Romanian cancer patients are treated at three cancer institutes. The Cluj institute dates from 1929 and the Bucharest institute from 1949; the regional institute in Iași is one of two centres that give CAR-T cell therapy under the national programme. Oncology wards in other major hospitals often refer patients on to them.",
          detail:
            "The Prof. Dr. Ion Chiricuță Oncology Institute in Cluj-Napoca was founded in 1929 by Prof. Iuliu Moldovan as the Institute for the Prophylaxis and Treatment of Cancer; its journal Cancerul, started in 1933, is described by the institute as the first oncology publication in Romania, and Prof. Ion Chiricuță, director from 1958, built its present building, finished in 1965, around cooperation between specialties, translational research and training. The Prof. Dr. Alexandru Trestioreanu Oncology Institute in Bucharest traces itself to an anticancer centre opened at Colțea Hospital in 1926, was founded by a Ministry of Health decision of 1949, began work on 21 December 1949 and moved to the Fundeni campus in 1989; it has surgical, medical and paediatric oncology, three radiotherapy wards, nuclear medicine and three research laboratories. The Health Insurance House's oncology programme names the Iași Regional Oncology Institute and the Fundeni Clinical Institute as the two units giving CAR-T. The OECD profile says that oncology wards in each major hospital provide diagnosis and treatment but often act as an intermediate stop before referral to the specialised institutes, and that specialised private centres are reimbursed through contracts with the House.",
          links: [
            { label: "IOCN: istoric", url: IOCN },
            { label: "IOB: istoric", url: IOB },
            { label: "CNAS: Programul național de oncologie (PDF, Internet Archive copy)", url: PNO },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-incidence",
      title: "No national count of new cancers, and no current survival figures",
      plain:
        "This page gives no registered number of new cancers in Romania, because none was found: the national registry founded in 2023 had published nothing that could be found. Survival figures for Romanian adults are also missing; the OECD's 2025 profile says current data are not available.",
      detail:
        "The incidence figures on this page are estimates, GLOBOCAN's for 2024 and ECIS's for 2022 as quoted by the OECD, not counts. The two working regional registries, at Cluj and Timiș according to the national cancer plan, were not found to publish figures that could be read raw. The OECD profile says earlier studies show lower five-year net survival in Romania than the EU averages, but gives no current figure, so none is quoted here. Childhood survival is the exception, from the national childhood cancer registry, quoted through the OECD profile rather than from the registry's own report, which was not read.",
      links: [
        { label: "Hotărârea Guvernului nr. 663/2023 (PDF)", url: HG_663 },
        { label: "OECD/EC: Country Cancer Profile Romania 2025, section 5.2 (PDF, Internet Archive copy)", url: CCP_2025 },
      ],
    },
    {
      id: "unreached",
      title: "Sources that could not be read directly on 4 November 2026",
      plain:
        "Several official Romanian websites refused automated reading, so their content was read through the Internet Archive or from copies on other official sites, or not at all. The official legislation portal did not answer, and the public health institute's site answered only with a browser check.",
      detail:
        "legislatie.just.ro, the Ministry of Justice's legislation portal, did not answer, so Law 293/2022 was read from the consolidated copy published by the medicines agency and Government Decision 663/2023 from the copy published by the Bucharest Oncology Institute, which carries the Lege5 database's print header. insp.gov.ro answered only with a script check, so the public health institute's November 2025 press release was read from the copy on the Gorj public health directorate's site, and its own 2023 cancer profile was not read. cnas.ro blocked scripts, so the oncology programme and the cost-volume page were read from Internet Archive captures of October 2026; the programme text there was uploaded in June 2024, and later changes to it were not checked. The European Cancer Inequalities Registry's site rejected scripts on 4 November 2026, so the OECD profile was read from an Internet Archive copy; on 17 November 2026 the registry's site served the same file directly, identical byte for byte to the archived copy. On that day insp.gov.ro and cnas.ro still answered only with an access check and legislatie.just.ro still did not answer. Ministry of Health order 3735/2024 on cervical screening and the 2024 breast and colorectal methodologies were known only through the sources that cite them.",
      links: [
        { label: "INSP press release, 17 November 2025 (PDF, DSP Gorj copy)", url: INSP_2025 },
        { label: "CNAS: programe naționale de sănătate curative (Internet Archive copy)", url: CNAS_PNS },
      ],
    },
    {
      id: "figures-missing",
      title: "Figures looked for and not found",
      plain:
        "Some figures a patient would want were looked for and not found: the score a medicine needs to be reimbursed, how long Romanian authorities themselves say reimbursement takes, current screening coverage, and whether the Health Innovation Programme in Law 293/2022 has paid for any medicine.",
      detail:
        "Order 861/2014, in the text consolidated to July 2020 that the medicines agency publishes, lists the points for each criterion but the thresholds between unconditional inclusion, conditional inclusion and non-inclusion were not in that text, and later amendments were not read. The only measured delays found are the industry's W.A.I.T. figures, 883 days in the 2020 survey as quoted by the national cancer plan and 762 days for cancer medicines in the 2024 survey; no official Romanian figure was found, and the 2025 W.A.I.T. survey was not read. No national coverage figure for the HPV-based cervical programme or the 2024 breast and colorectal programmes was found; the newest coverage figures are 2019 survey data. Whether the 20% funding floor in article 5 of Law 293/2022 has been met in any year was not established.",
      links: [
        { label: "Ordinul MS nr. 861/2014 (PDF)", url: OMS_861 },
        { label: "EFPIA Patients W.A.I.T. Indicator 2024 Survey (PDF)", url: WAIT_2024 },
        { label: "Legea nr. 293/2022 (PDF)", url: LAW_293 },
      ],
    },
  ],
  institutions: [
    "iob-bucharest", "iocn-cluj", "iasi-regional-oncology-institute", "rnc-romania", "insp-romania", "cnas-romania", "anmdmr", "ema",
    "apsco-romania", "youth-cancer-europe", "cancer-free-future-association",
  ],
  companies: [],
  drugs: [],
  trials: [
    "checkmate-227", "flaura", "adaura", "alina", "keynote-671", "natalee", "peace-1", "destiny-breast09", "tropion-lung01", "caspian",
    "impower110", "monarche", "aphinity", "krystal-12", "checkmate-649", "cll14", "nct05573724", "nct06908304", "nct06904235", "nct06657222",
    "nct04879043", "nct05596409", "pakt", "nct06331299", "nct06774131", "nct07325136",
  ],
  papers: [],
  people: ["mirela-grosu", "delia-nicoara"],
  how:
    "Every card was written from sources read raw: in Romanian, Law 293/2022 and the national cancer plan in its annex, Government Decision 663/2023 on the National Cancer Registry and the Ministry of Health's explanatory note for it, Ministry of Health order 861/2014 on health technology assessment, the National Health Insurance House's National Oncology Programme and cost-volume pages, a press release of the National Institute of Public Health, and the cancer institutes' history pages; in English, the OECD and European Commission's Country Cancer Profile Romania 2025, Eurostat's causes-of-death table for Romania, the EFPIA W.A.I.T. 2024 survey and the IAEA's directory of radiotherapy centres. Several Romanian official sites refused scripts, and those pages were read through the Internet Archive or from copies on other official sites, as each link says. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are the two cancer institutes in Bucharest and Cluj-Napoca, the National Cancer Registry, the National Institute of Public Health, the Health Insurance House and the medicines agency.",
  verify:
    "No national count of new cancers was found for Romania, so every incidence figure here is an estimate. The reimbursed list, treatment protocols and cost-volume contracts change during the year: before relying on whether a medicine is paid for, ask the treating oncologist and check the current Government decision and protocol. The screening programmes are moving from pilots to national programmes, so what is offered locally may differ from what is described here.",
  verifyLinks: [
    { label: "OECD/EC: Country Cancer Profile Romania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
    { label: "Legea nr. 293/2022 (PDF)", url: LAW_293 },
    { label: "CNAS: programe naționale de sănătate curative (Internet Archive copy)", url: CNAS_PNS },
    { label: "ANMDMR: evaluare tehnologii medicale", url: ANM_HTA },
  ],
};
