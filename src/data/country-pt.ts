import type { CountryDive } from "@/data/country-dive";

/**
 * Portugal deep dive: the hand-written cards for /countries/pt/ (wave 5). Portuguese sources were read in Portuguese,
 * from the raw text of each PDF or page, not from a summary of it: Law 53/2017 creating the national cancer registry
 * and Decree-Law 97/2015 creating the health technology assessment system (Diário da República PDFs), the registry's
 * 2019 report (its PDF has no usable text layer, so its tables were read by OCR and checked against the page image),
 * Despacho 13227/2023 with the national cancer strategy to 2030 in its annex, and the Directorate-General of
 * Health's Norma 002/2026 on HPV vaccination. The registry's 2020 to 2022 figures were read in Lusa's reports of the
 * coordinator's statements, because the full reports were not found. The OECD and European Commission's Country
 * Cancer Profile Portugal 2025 (through the Internet Archive, because the registry's site rejected scripts), IARC's
 * GLOBOCAN 2024 fact sheet and the World Bank's out-of-pocket series were read raw in English. Where a figure could
 * not be read it is named under `gaps`.
 */
const LEI_53 = "https://data.dre.pt/eli/lei/53/2017/07/14/p/dre/pt/pdf";
const DL_97 = "https://data.dre.pt/eli/dec-lei/97/2015/06/01/p/dre/pt/pdf";
const RON_2019 = "https://ipoporto.pt/wpsite_2020/wp-content/uploads/2023/05/ron-2019_new_v8f.pdf";
const RORENO_PUBS = "https://ipoporto.pt/eu-cidadao/registo-oncologico-regional-do-norte/publicacoes/";
const RON_SITE = "https://web.archive.org/web/20240115114250/https://ron.min-saude.pt/pt";
const LUSA_2022 = "https://observador.pt/2025/12/29/portugal-registou-mais-de-60-mil-novos-casos-de-cancro-em-2022/";
const RTP_2022 = "https://www.rtp.pt/noticias/pais/registo-oncologico-mais-de-60-mil-novos-casos-de-cancro-em-2022-com-maior-incidencia-em-homens_n1706721";
const LUSA_2021 = "https://www.dnoticias.pt/2024/12/20/431687-novos-casos-de-cancro-aumentaram-5-em-2021-face-a-2019-em-portugal/";
const LUSA_2020 = "https://observador.pt/2024/01/15/cancros-da-mama-e-colorretal-entre-os-mais-frequentes-em-2020/";
const ENLCC = "https://www.iccp-portal.org/system/files/plans/Estrategia%20Nacional%20de%20Luta%20vs%20Cancro_2023.pdf";
const CCP_2025 = "https://web.archive.org/web/20261013171208/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-pt-2024-1681-en.pdf";
const IARC_FS = "https://gco.iarc.who.int/media/globocan/factsheets/populations/620-portugal-fact-sheet.pdf";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=PT";
const NORMA_HPV = "https://www.dgs.pt/normas-orientacoes-e-informacoes/normas-e-circulares-normativas/norma-n-0022026-de-08042026-atualizacao-da-estrategia-de-vacinacao-contra-o-virus-do-papiloma-humano-hpv-no-programa-nacional-de-vacinacao.aspx";
const LEI_75 = "https://data.dre.pt/eli/lei/75/2021/11/18/p/dre/pt/pdf";
const EMA_CP = "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines";

export const PT_DIVE: CountryDive = {
  iso2: "PT",
  iso3: "PRT",
  name: "Portugal",
  flag: "🇵🇹",
  asOf: "2026-11-11",
  title: "Cancer in Portugal",
  description:
    "Cancer in Portugal from Portuguese sources: a single national cancer registry since 2018 that counted 60,954 new cancers in 2022, cancer care and cancer medicines free in the national health service since user charges ended in 2022, a health technology assessment that took a mean 748 days from EU approval to a decision for a sample of new cancer medicines, three screening programmes with very different reach, high HPV vaccination, and a national cancer strategy to 2030.",
  lede:
    "Portugal has one national cancer registry, created by law in 2017, which counted 60,954 new cancers in 2022. Care is free in the national health service, mostly in local hospitals and three public oncology institutes in Lisbon, Porto and Coimbra. Stomach cancer is almost twice as common as the EU average, and new cancer medicines take longer than the EU average to be approved for public funding.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Portugal is 69,439 new cancers and 33,590 deaths in 2024, labelled ICD-10 C00-97 and including 2,734 non-melanoma skin cancers (66,705 without them), with an age-standardised (world) incidence of 293.2 per 100,000. Portugal's own registry, the Registo Oncológico Nacional, counted 57,878 new cancers diagnosed in 2019 (world-standardised 263.6 per 100,000, including 3,317 skin cancers other than melanoma; basal cell carcinomas are not registered), and its coordinator reported 60,954 for 2022. GLOBOCAN's 2024 estimate is therefore about 14% above the newest registry count, two years later. For deaths, the registry's 2019 report quotes 28,464 cancer deaths in 2019 from the National Statistics Institute (INE); GLOBOCAN's modelled 33,590 for 2024 is about 18% higher. Neither source explains the gap, so it is stated here rather than explained. Site by site the registry's 2019 world-standardised rates sit a little below GLOBOCAN's: breast in women 84.9 against 88.5, prostate 61.7 against 62.6, lung 22.6 against 24.4, stomach 12.3 against 14.6.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Portugal",
      aside: { label: "RON: Registo Oncológico Nacional 2019 (PDF, IPO Porto)", url: RON_2019 },
      cards: [
        {
          id: "shape",
          title: "About 61,000 new cancers a year, and breast, bowel, prostate and lung the commonest",
          plain:
            "Portugal's national cancer registry counted 60,954 new cancers in 2022, more in men than in women, and about three in four in people over 60. Breast, bowel, prostate and lung cancer were the commonest. Cancer is the second commonest cause of death, after diseases of the heart and circulation.",
          detail:
            "The registry's 2019 report counts 57,878 new cancers in Portuguese residents diagnosed in 2019, 31,507 in men and 26,371 in women, a crude rate of 562.1 per 100,000 (648.3 in men, 485.1 in women); 40.4% were diagnosed at ages 60 to 74 and 31.4% at 75 or over. Breast (8,567), prostate (6,912) and colon (5,483) were the commonest sites, followed by lung (5,208). The coordinator's note on 2022, reported by Lusa and RTP in December 2025, gives 60,954 new cancers, 579.6 per 100,000 (658.3 in men, 507.7 in women), with incidence close to its 2019 level after the pandemic years, and colon cancer and melanoma still rising in both sexes. The OECD and European Commission's 2025 profile puts cancer at 23% of deaths in 2021, second to circulatory diseases (25%), with an age-standardised death rate 4% below the EU average; men's rate (318 per 100,000) is almost double women's (161). Over 2011 to 2021 cancer mortality fell 8%, against 12% across the EU, and lung cancer mortality in women rose almost 23%.",
          links: [
            { label: "RON 2019, sections 3.1, 3.2 and table 4 (PDF, IPO Porto)", url: RON_2019 },
            { label: "Observador (Lusa): Portugal registou mais de 60 mil novos casos de cancro em 2022", url: LUSA_2022 },
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 2 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "stomach-children",
          title: "Stomach cancer and childhood cancer above the EU average",
          plain:
            "Two cancers stand out against the rest of Europe. Stomach cancer is almost twice as common in Portugal as the EU average, especially in the north. Childhood cancer is estimated to be more common in Portugal than in any other EU country, although few trials for children run there.",
          detail:
            "The OECD profile, using the European Cancer Information System's estimates for 2022, says stomach cancer is the fifth commonest cancer in both men and women in Portugal, with incidence almost double the EU average, and that Portuguese women have the second highest stomach cancer incidence among the 29 countries compared. The registry counted 3,061 stomach cancers in 2019; its coordinator told Lusa in December 2025 that stomach cancer remains more frequent in the north and that Portugal is a medium-risk population for it. For children aged 0 to 14 the profile gives an estimated 19 new cancers per 100,000 in 2022, the highest in the EU and Norway and Iceland, against an EU average of 14, about 245 children and adolescents up to 15; leukaemia is about 30% of them. Childhood cancer mortality averages 2.6 per 100,000 against 2.1 in the EU. Children's cancer care is organised around four centres, the oncology institutes in Lisbon and Porto and the university hospitals of Coimbra and São João; proton therapy is not yet available, and selected children are sent to Spain or Denmark for it.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, sections 2 and 6 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Observador (Lusa): Portugal registou mais de 60 mil novos casos de cancro em 2022", url: LUSA_2022 },
            { label: "RON 2019, table 4 (PDF, IPO Porto)", url: RON_2019 },
          ],
        },
      ],
      tables: [
        {
          id: "ron-2019-sites",
          title: "New cancers registered in Portugal in 2019, by site",
          caption: "Registo Oncológico Nacional, cases diagnosed in 2019 in people resident in Portugal and registered by 9 September 2022. Rates per 100,000 person-years; ASR is age-standardised to the world population.",
          columns: [
            { key: "site", label: "Site (ICD-10)" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "crude", label: "Crude rate", numeric: true },
            { key: "asr", label: "ASR (world)", numeric: true },
          ],
          rows: [
            { site: "All sites (as registered)", cases: 57878, crude: 562.1, asr: 263.6 },
            { site: "Breast, women (C50)", cases: 8482, crude: 156.0, asr: 84.9 },
            { site: "Prostate (C61)", cases: 6912, crude: 142.2, asr: 61.7 },
            { site: "Colon (C18)", cases: 5483, crude: 53.3, asr: 21.4 },
            { site: "Trachea, bronchus and lung (C33-34)", cases: 5208, crude: 50.6, asr: 22.6 },
            { site: "Skin, other than melanoma (C44)", cases: 3317, crude: 32.2, asr: 8.7 },
            { site: "Stomach (C16)", cases: 3061, crude: 29.7, asr: 12.3 },
            { site: "Bladder (C67)", cases: 2529, crude: 24.6, asr: 9.4 },
            { site: "Rectum (C19-20)", cases: 2375, crude: 23.1, asr: 10.1 },
            { site: "Non-Hodgkin lymphoma (C82-86, C96)", cases: 2058, crude: 20.0, asr: 9.7 },
            { site: "Thyroid (C73)", cases: 2039, crude: 19.8, asr: 13.9 },
            { site: "Pancreas (C25)", cases: 1275, crude: 12.4, asr: 5.2 },
            { site: "Kidney (C64)", cases: 1225, crude: 11.9, asr: 6.0 },
            { site: "Melanoma of skin (C43)", cases: 1193, crude: 11.6, asr: 5.8 },
            { site: "Corpus uteri (C54)", cases: 1087, crude: 20.0, asr: 8.2 },
            { site: "Cervix uteri (C53)", cases: 533, crude: 9.8, asr: 6.2 },
          ],
          note: "The registry counts all invasive cancers other than basal cell skin carcinoma, and also counts in situ and uncertain-behaviour bladder tumours and, in children under 15, benign and uncertain-behaviour tumours of the brain and central nervous system. Rates for breast, prostate, cervix and corpus uteri are per 100,000 women or men; the others are both sexes. 85 breast cancers in men are not in the breast row.",
          sources: [{ label: "RON: Registo Oncológico Nacional 2019, table 4 (PDF, IPO Porto)", url: RON_2019 }],
        },
        {
          id: "ron-years",
          title: "New cancers counted by the national registry, 2018 to 2022",
          caption: "All registered cancers in residents of Portugal, both sexes. 2018 is as quoted in the national cancer strategy, 2019 is from the full report, and 2020 to 2022 are as the registry and its coordinator were quoted by the Lusa news agency.",
          columns: [
            { key: "year", label: "Year of diagnosis" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "rate", label: "Crude rate per 100,000", numeric: true },
          ],
          rows: [
            { year: "2018", cases: 50151, rate: null },
            { year: "2019", cases: 57878, rate: 562.1 },
            { year: "2020", cases: null, rate: null },
            { year: "2021", cases: 60717, rate: null },
            { year: "2022", cases: 60954, rate: 579.6 },
          ],
          note: "2018 was the registry's first year and its figure is quoted in the national cancer strategy. For 2020 the report was quoted only as 'more than 52 thousand', 9% fewer than 2019, which the coordinator linked to the COVID-19 pandemic; 2021 was 5% above 2019. Rates not shown were not found in the sources read.",
          sources: [
            { label: "Despacho n.º 13227/2023, annex, section 1 (2018 and 2019 counts)", url: ENLCC },
            { label: "RON 2019, table 2 (PDF, IPO Porto)", url: RON_2019 },
            { label: "Observador (Lusa), 15 January 2024: RON 2020", url: LUSA_2020 },
            { label: "DNoticias (Lusa), 20 December 2024: RON 2021", url: LUSA_2021 },
            { label: "Observador (Lusa), 29 December 2025: RON 2022", url: LUSA_2022 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: one national registry since 2018",
      aside: { label: "Lei n.º 53/2017: cria e regula o Registo Oncológico Nacional (PDF)", url: LEI_53 },
      cards: [
        {
          id: "ron-law",
          title: "A registry written into law, with a nine-month reporting duty",
          plain:
            "Law 53/2017 made Portugal's regional cancer registries into one national registry from 1 January 2018. Every public, charitable and private hospital, clinic and laboratory must record each new cancer within nine months and update it every year. The three public oncology institutes run it in turn.",
          detail:
            "Article 2 of Law 53/2017 defines the Registo Oncológico Nacional as a centralised registry on a single electronic platform covering every cancer patient diagnosed or treated in mainland Portugal and the autonomous regions of the Azores and Madeira, for monitoring institutions, screening and treatment effectiveness, surveillance and research, and, with the medicines authority INFARMED, the effectiveness of medicines and devices. Article 3 obliges every health establishment of the public, social and private sectors to register each new diagnosis within nine months of learning of it, and to update the stage, treatments and vital status at least once a year; the data of the former regional registries, the Portuguese paediatric registry and the two autonomous regions' registries are integrated. Article 6 gives administration to the board of the Francisco Gentil oncology institutes' group, which names a coordinator from one of the three institutes for three years, rotating between them. Data are anonymised 15 years after a patient's death and kept for 100 years. The law came into force on 1 January 2018 and repealed two ordinances of 1988 and an Azores ordinance of 1993.",
          links: [
            { label: "Lei n.º 53/2017, de 14 de julho, articles 2, 3, 6, 11 and 24 (Diário da República PDF)", url: LEI_53 },
            { label: "RON website (Internet Archive copy, January 2024)", url: RON_SITE },
          ],
        },
        {
          id: "ron-output",
          title: "What it publishes, and what it does not yet",
          plain:
            "The registry publishes yearly counts of new cancers by site, age, sex and district, with deaths from the national statistics institute. Its newest full report found online covers 2019. It has not yet published survival or the stage at which cancers are found, which the OECD names as a gap.",
          detail:
            "The 2019 report, edited by IPO Porto and coordinated by Maria José Bento, describes cases registered up to 9 September 2022, mostly by integrating data from other databases of all public health institutions and private hospitals and laboratories in every district. Completeness is checked against hospital admissions (DRG), some hospital pharmacy, radiotherapy and pathology databases, and mortality-to-incidence ratios. Its highest age-standardised (European) rates were in the Porto district (411.5 per 100,000), Madeira (407.1), Lisbon (401.7) and Braga (393.6), with higher incidence on the coast than inland. Reports for 2020, 2021 and 2022 were announced through Lusa in January 2024, December 2024 and December 2025, but their full texts were not found for this page; IPO Porto's publications page lists the 2018 and 2019 national reports. The OECD and European Commission's 2025 profile says survival and stage at diagnosis remain unpublished, and that Portugal has no specific system for assessing the quality of cancer care.",
          links: [
            { label: "RON 2019, sections 1 to 3 (PDF, IPO Porto)", url: RON_2019 },
            { label: "IPO Porto: registry publications", url: RORENO_PUBS },
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 5.2 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a national health service with no user charges",
      aside: { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
      cards: [
        {
          id: "sns-free",
          title: "Free cancer care in the NHS, but more than a quarter of health spending paid out of pocket",
          plain:
            "Portugal's National Health Service, the SNS, is paid for from taxes. Since June 2022 it has charged no fees except for emergency visits without a referral, so cancer screening, tests, treatment and cancer medicines are free. Across all health care, though, households paid about 28% of spending themselves in 2024.",
          detail:
            "The OECD and European Commission's 2025 profile records that Portugal eliminated user charges across all NHS services in June 2022, except emergency department visits without a referral, so that vaccination, screening, consultations, diagnosis and treatment for cancer are free, including cancer medicines in hospital and outpatient care; other medicines fall under reimbursement schemes, for example 90% for opioids for pain. The NHS also subsidises non-urgent transport to treatment for patients facing health or economic difficulty. NHS hospitals spent just over EUR 625 million on oncology medicines in 2023, 32% of their pharmaceutical spending and 16% more than in 2022; in May 2024 the Court of Auditors voided two purchase contracts for cancer medicines at a cancer institute because of budget limits. Across the whole health system, the World Bank's series from WHO's Global Health Expenditure Database puts out-of-pocket spending at 28.2% of current health expenditure in 2024 and current health spending at 10.2% of GDP; the out-of-pocket share covers all care, not cancer care alone.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, sections 5.1 and 5.3 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Portugal", url: WB_OOP },
          ],
        },
        {
          id: "waiting-times",
          title: "Legal maximum waits, often exceeded for a first appointment",
          plain:
            "Since 2017 the law has set maximum waits for a first cancer appointment and for cancer surgery, depending on urgency. If a public hospital cannot meet them, the patient can be moved to another provider or given a voucher for private care. In 2023 most public hospitals exceeded the limit for a first appointment.",
          detail:
            "The OECD profile describes maximum guaranteed response times set in 2017: for a first appointment after a cancer referral, 30 days at the lowest priority level and immediately at the highest; for scheduled cancer surgery, 60 days down to 72 hours. Patients whose hospital cannot meet the limit can be transferred or receive a voucher for a provider of their choice. The Health Regulatory Authority monitors them. In 2023, 62% of public hospitals exceeded the limit for a first appointment after a suspected or confirmed cancer (46% in 2022), with a median wait of 25 days; 10,775 patients were waiting for a first appointment, 82% of them beyond the limit, and 7,282 were waiting for cancer surgery, 20% beyond it. The May 2024 Health Emergency Plan introduced the OncoStop2024 programme to clear surgical delays with more public capacity and contracts with private providers. Over 1.5 million people, 15% of the population, had no assigned family doctor in April 2024, which the profile links to delays in detection.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Entidade Reguladora da Saúde (Health Regulatory Authority)", url: "https://www.ers.pt/pt/" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: INFARMED, inside the European system",
      aside: { label: "INFARMED", url: "https://www.infarmed.pt" },
      cards: [
        {
          id: "infarmed-sinats",
          title: "Approval in Amsterdam, then a Portuguese assessment before the NHS pays",
          plain:
            "New cancer medicines are authorised once for the whole European Union, so they are legally available in Portugal when they are everywhere else. Before NHS hospitals may buy one, the medicines authority INFARMED must assess whether it is worth its price, under a system created in 2015, and usually agrees a contract with the maker.",
          detail:
            "New active substances for cancer go through the EU centralised procedure: the European Commission grants one marketing authorisation for every member state on the opinion of the European Medicines Agency in Amsterdam. Decree-Law 97/2015 created the Sistema Nacional de Avaliação de Tecnologias de Saúde (SiNATS), managed by INFARMED, which assesses medicines and devices technically, therapeutically and economically. Its preamble states that marketing authorisation is a necessary but not sufficient condition for NHS funding. Under article 25, prescription medicines that NHS bodies are to buy need a prior assessment (avaliação prévia), which weighs therapeutic innovation or equivalence against economic advantage and sets a maximum purchase price; medicines dispensed in pharmacies need a reimbursement decision (comparticipação). Both are preferably settled by contract with the marketing authorisation holder, who bears the risk if the targets in the contract are not met. Law 53/2017 also lets INFARMED use the national cancer registry to monitor how well medicines work in practice.",
          links: [
            { label: "Decreto-Lei n.º 97/2015, de 1 de junho, preamble and articles 1, 4, 6 and 25 (Diário da República PDF)", url: DL_97 },
            { label: "EMA: authorisation of medicines, scope of the centralised procedure", url: EMA_CP },
            { label: "Lei n.º 53/2017, articles 2 and 5 (Diário da República PDF)", url: LEI_53 },
          ],
        },
        {
          id: "decision-time",
          title: "748 days on average to a funding decision for a sample of new cancer medicines",
          plain:
            "An OECD study of new breast and lung cancer medicines found that Portugal funded 54% of their uses, close to similar countries but below the EU average, and took a mean 748 days from European approval to decide. The national cancer strategy set a goal to publish this decision time by 2025.",
          detail:
            "The OECD and European Commission's 2025 profile, drawing on Hofmarcher, Berchet and Dedet (2024), reports that 54% of 13 indications of 10 new breast and lung cancer medicines with high clinical benefit were publicly reimbursed in Portugal on 1 April 2023, equal to Portugal's economic peers and below the EU average of 59%, and that the mean time from EMA approval to the coverage decision was 748 days, 45% longer than the EU average. For 19 biosimilars of bevacizumab, rituximab and trastuzumab the share reimbursed was 74% (EU 65%) and the mean time 266 days (EU 505). The national cancer strategy approved by Despacho 13227/2023 includes the target to publish the time taken to decide reimbursement of innovative cancer medicines by 2025, and the May 2024 Health Emergency Plan announced a focus on fully implementing SiNATS. Whether that time has since been published was not established for this page.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 5.1 and figure 13 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Despacho n.º 13227/2023, annex, section 5.2 (PDF, ICCP portal copy)", url: ENLCC },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "DGS: Norma n.º 002/2026, HPV vaccination", url: NORMA_HPV },
      cards: [
        {
          id: "three-programmes",
          title: "Three screening programmes: cervical reaching most, bowel the fewest",
          plain:
            "The NHS invites people to screening for breast, cervical and bowel cancer, mostly through family doctors. In 2022 about half of eligible women had a recent mammogram through the programme and 60% a recent HPV test, but only 14% of eligible adults had a recent bowel screening test.",
          detail:
            "The OECD profile, using the national cancer programme's monitoring of 2022 screening (published in 2023), describes breast screening since 1990 for women aged 50 to 69 every two years, carried out on the mainland by contractors such as the Portuguese League Against Cancer with mobile and fixed units; invitation reached 98% of the target population in 2022 and the effective screening rate was 50%. In October 2024 it was announced that the age range would widen to 45 to 75. Cervical screening uses an HPV test every five years for women aged 25 to 60 (cytology as the first test ended in 2020) and reached a 60% effective rate in 2022; the Directorate-General of Health's October 2024 guidelines moved the ages to 30 to 69 and offered self-sampling. Colorectal screening with a faecal immunochemical test for ages 50 to 74 invited only 33% of eligible people in 2022, 41% of them took part, an effective rate of 14%, and only 35% of people with a positive test had a colonoscopy. The 2030 strategy aims for 100% territorial and 95% population coverage and 65% uptake in every programme. The Azores began a Helicobacter pylori screening pilot against stomach cancer in March 2024, and no lung cancer screening pilot was under way in September 2024.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 4 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Despacho n.º 13227/2023, annex (PDF, ICCP portal copy)", url: ENLCC },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination at age 10 for girls and boys",
          plain:
            "Portugal has vaccinated girls against HPV since 2008 and boys since 2021, free in primary care. Most girls are fully vaccinated by 15. A 2026 standard moved the vaccine to age 10 for both sexes, with catch-up doses for young adults.",
          detail:
            "The OECD profile records that the HPV programme began in 2008, switched to the nine-valent vaccine in 2017 and added boys in 2021; by 2023, 91% of 15-year-old girls had completed the course according to WHO and 95% by national estimate, and a 2024 report found 88% of boys aged 14 had two doses, above the national target of 85%. Hepatitis B vaccination of children reached 99% in 2023. The Directorate-General of Health's Norma 002/2026 of 8 April 2026 recommends two doses of the nine-valent vaccine (Gardasil 9) at 0 and 6 months at age 10 for both sexes; catch-up with two doses for anyone over 10 and under 18, for women from 18 to under 27, and for men born in 2000 to 2002, with men born in 2003 to 2008 to follow in phases. The latest age to start is 26 and to finish 27; people who are immunocompromised receive three doses.",
          links: [
            { label: "DGS: Norma n.º 002/2026, sections 1 to 3", url: NORMA_HPV },
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 3 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and the cancer workforce",
      aside: { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
      cards: [
        {
          id: "radiotherapy",
          title: "74 radiotherapy units, many past their working life, and a proton centre planned",
          plain:
            "Portugal had 74 radiotherapy machines in 2023, about 7 per million people, close to the EU average. Almost half were more than 15 years old. Only 11 NHS centres give radiotherapy, and a national proton therapy centre has been planned since 2018.",
          detail:
            "The OECD profile counts, from 2023 IAEA data, 74 radiation therapy units in Portugal, 7 per million people, just below the EU average: 57 megavoltage units, at least 33 of them in the NHS, and 17 brachytherapy units, 11 in the NHS. OECD hospital-only data give 5 per million in 2022. 46% of megavoltage and 47% of brachytherapy units were more than 15 years old, beyond the 12-year lifespan WHO considers optimal. In December 2023 the NHS announced 8 new surgical robots for 2024, mostly funded by the EU recovery programme, as part of a wider EUR 117 million programme that will also replace 25 CT scanners, 18 MRI machines and 11 linear accelerators. A 2018 government resolution set the goal of a proton therapy centre, with its main hub in Lisbon and an eye node in Coimbra. A 2021 Directorate-General of Health report counted 21 medical physicists and 255 radiation therapy technologists in the NHS, 4.6 physicists per million against a recommended 18. The 2030 strategy aims for every radiotherapy service treating NHS patients to hold IAEA quality certification by 2030.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 5.1 and figure 12 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Despacho n.º 13227/2023, annex, section 5.2 (PDF, ICCP portal copy)", url: ENLCC },
          ],
        },
        {
          id: "workforce",
          title: "More cancer specialists, fewer family doctors",
          plain:
            "The number of medical oncologists in the NHS rose from 164 to 285 full-time posts between 2017 and 2023, and radiation oncologists from 77 to 90. Family doctors are scarcer: 15% of people had none assigned in 2024, which slows referral and screening invitations.",
          detail:
            "The OECD profile, citing a 2024 study of NHS professionals, gives a 74% rise in full-time-equivalent medical oncologists (164 to 285) and a 17% rise in radiation oncologists (77 to 90) between 2017 and 2023; medical oncologists work in almost every public hospital, but radiotherapy is concentrated in 11 NHS centres. NHS nursing posts rose 18% to 50,970. Portugal has 1,169 professionally active nurses per 1,000 new cancer cases against 1,376 in the EU, and no master's programme or specialisation in cancer nursing. In the regions with the most people lacking a family doctor, 17% in the Algarve and 24% in Lisbon and the Tagus Valley, fewer eligible women were invited to cervical screening. A palliative care observatory estimated shortages of 39 physicians, 246 nurses, 19 psychologists and 18 social workers in 2022.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, sections 4, 5.1 and 5.4 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Different",
      title: "What Portugal does differently",
      cards: [
        {
          id: "three-institutes",
          title: "Three public cancer institutes that carry a large share of the work",
          plain:
            "Portugal has three public oncology institutes, in Lisbon, Porto and Coimbra, all named after Francisco Gentil. In 2021 they handled about a quarter of new cancer cases, 44% of cancer surgery and more than half of radiotherapy plans, and they run the national cancer registry between them.",
          detail:
            "The OECD profile records that care is delivered mainly in hospitals within 39 local health units and at the three national oncology institutes, which in 2021 managed 27% of all new cancer cases, performed 44% of oncology surgeries and handled 57% of radiotherapy treatment plans. Law 53/2017 gives the institutes' group the administration of the national registry and rotates its coordinator between them. From 2014 the Directorate-General of Health certified reference centres, 47 by 2018 for oesophageal, rectal, testicular, hepato-bilio-pancreatic, sarcoma and eye cancers, but none has been added since 2018. Seven breast cancer centres closed in April 2024 for low volume or lack of surgeons. The 2030 strategy aims to formalise an Oncology Referral Network by 2026, with over 90% of patients treated at certified centres; the strategy notes that such a network was first judged necessary in 1990.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, sections 5.1 and 5.2 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Despacho n.º 13227/2023, annex, section 5.2 (PDF, ICCP portal copy)", url: ENLCC },
            { label: "Lei n.º 53/2017, article 6 (Diário da República PDF)", url: LEI_53 },
          ],
        },
        {
          id: "survivor-rights",
          title: "Rights for people after cancer: insurance, disability certificates and fertility",
          plain:
            "Since 2022 Portuguese law stops banks and insurers from asking about a serious health risk a person has overcome, such as a cancer treated in the past, when they apply for a mortgage or consumer loan, once ten years have passed since treatment ended, or five if the illness began before 21. People with cancer receive a five-year disability certificate automatically, and fertility preservation has long been free in the NHS.",
          detail:
            "Law 75/2021 of 18 November 2021, in force from 1 January 2022, reinforces access to credit and insurance for people who have overcome or mitigated situations of aggravated health risk: for housing credit, consumer credit and the insurance tied to them, no health information about the aggravated health risk or disability may be collected once ten years have passed without interruption since the end of the treatment protocol, five years where the condition overcome occurred before age 21, or two years of continuous effective treatment where it is mitigated, and no higher premium or exclusion may follow from it. The law speaks of aggravated health risk and disability and does not name cancer. The OECD profile notes that a five-year multipurpose disability certificate is now issued automatically to cancer patients, where it previously could take months or years and sometimes cost fees; it brings income tax relief, lower vehicle taxes, better mortgage conditions and cash transfers for low-income households. Portugal has for many years provided free reproductive health services to cancer patients who want to preserve fertility, recognised informal carers in 2019, and the national cancer programme has published a guide to patients' rights.",
          links: [
            { label: "Lei n.º 75/2021, de 18 de novembro (Diário da República PDF)", url: LEI_75 },
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, section 5.4 (PDF, Internet Archive copy)", url: CCP_2025 },
          ],
        },
        {
          id: "strategy-2030",
          title: "A national cancer strategy with numbered targets for 2030",
          plain:
            "In December 2023 the government approved a national cancer strategy to 2030, written by the Directorate-General of Health's cancer programme. It sets dated targets for screening, waiting times, the time taken to fund new medicines and the number of clinical trials, and puts two patient representatives on the committee that steers it.",
          detail:
            "Despacho 13227/2023, published on 27 December 2023, approves the Estratégia Nacional de Luta contra o Cancro, horizonte 2030, prepared by the Programa Nacional para as Doenças Oncológicas after a public consultation in mid-2022, with four pillars: prevention, early detection, diagnosis and treatment, and survivors. Its targets include 90% of indications for radiotherapy treated within the guaranteed time in 2026, 90% of cancers with curative drug treatment started within a guaranteed time in 2026, publishing the reimbursement decision time for innovative cancer medicines by 2025, an online catalogue of cancer trials by 2025, doubling the number of cancer trials under way and, compared with 2020, the number of patients recruited, by 2027, and palliative care consultation within six months for half of adults diagnosed with a cancer whose two-year survival is below 50% by 2030. A seven-member executive committee led by the programme's director, with representatives of the central health administration, the NHS Executive Board, science, the clinical research agency AICIB and two patient associations, steers it and reports yearly with the national health institute.",
          links: [
            { label: "Despacho n.º 13227/2023 and annex, sections 2 and 5 (PDF, ICCP portal copy)", url: ENLCC },
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, box 1 (PDF, Internet Archive copy)", url: CCP_2025 },
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
          id: "trials-in-portugal",
          title: "316 trials in OnCo list a site in Portugal, almost all sponsored abroad",
          plain:
            "OnCo's ClinicalTrials.gov records list 316 cancer trials with at least one site in Portugal, most of them large phase 3 trials sponsored by international drug companies. Only one is sponsored by a Portuguese institution. The national strategy aims to double the number of cancer trials by 2027.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 316 trials list Portugal among their countries, 250 of them phase 3, 12 phase 2/3, 37 phase 2 and 17 phase 1/2; in the registry's own status, 96 are recruiting, 1 not yet recruiting, 134 active and not recruiting, 71 completed, 11 terminated and 3 of unknown status. Merck Sharp & Dohme and AstraZeneca lead 26 each, Hoffmann-La Roche 23 and Janssen 19. The one with a Portuguese lead sponsor is a phase 2 trial of two sequences of neoadjuvant chemotherapy for high-risk breast cancer run by the Champalimaud Foundation (NCT06371807), not yet recruiting and listing only Portugal. Academic trials with Portuguese sites include LYSARC's mosunetuzumab trial in marginal zone lymphoma, the RADAR Hodgkin lymphoma trial, IELSG37, IBIS-II, the SIOPEN HR-NBL1 neuroblastoma trial and the IntReALL relapsed childhood leukaemia trial. INFARMED approved 203 clinical trials of all kinds in 2023 against 99 in 2012, 58 of them for antineoplastic and immunomodulatory drugs. Only 22 of 436 European trials enrolling children with cancer in 2010 to 2022 ran in Portugal.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Portugal", url: "https://clinicaltrials.gov/search?cond=cancer&locStr=Portugal&country=Portugal" },
            { label: "OECD/EC: Country Cancer Profile Portugal 2025, sections 5.2 and 6 (PDF, Internet Archive copy)", url: CCP_2025 },
            { label: "Despacho n.º 13227/2023, annex, section 5.3 (PDF, ICCP portal copy)", url: ENLCC },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreached",
      title: "Sources that refused a script or could not be reached",
      plain:
        "Several Portuguese sites could not be read by a script on 11 November 2026: the cancer registry's own site, the Portuguese League Against Cancer, the Lisbon and Coimbra oncology institutes and the NHS portal. Where an archive copy or another official copy existed, it was used and the link says so.",
      detail:
        "ron.min-saude.pt did not answer, so the registry's site was read in an Internet Archive copy of January 2024. ligacontracancro.pt returned 403, and its Internet Archive copy held only the site's browser check, so the Portuguese League Against Cancer has no OnCo record yet and is described here only from the OECD profile; its UICC membership page also refused (406). ipolisboa.min-saude.pt did not answer and ipocoimbra.min-saude.pt returned 403, so the existing records for those institutes were not re-checked. sns.gov.pt returned 405. The European Cancer Inequalities Registry rejected the direct PDF request for the OECD profile, which was read in an Internet Archive copy of 13 October 2026. IAEA DIRAC's country pages load their data by script, so its radiotherapy figures are taken as quoted in the OECD profile.",
      links: [
        { label: "RON website (Internet Archive copy)", url: RON_SITE },
        { label: "OECD/EC: Country Cancer Profile Portugal 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
        { label: "IAEA DIRAC", url: "https://dirac.iaea.org/" },
      ],
    },
    {
      id: "figures-missing",
      title: "Figures looked for and not found",
      plain:
        "Some figures a patient would want were looked for and not found: the registry's full reports for 2020 to 2022, survival and stage at diagnosis, cancer deaths for years after 2019 from the statistics institute, screening coverage after 2022, and whether the time to fund new cancer medicines has been published.",
      detail:
        "The registry's 2020, 2021 and 2022 figures on this page come from Lusa's reports of the coordinator's statements; the full reports were not found on IPO Porto's publications page or the archived registry site, so their site tables, rates for 2021 and the exact 2020 total were not read. The registry has not published survival or stage at diagnosis, according to the OECD profile. INE's cancer deaths were read only for 2019 (28,464, as quoted in the registry's report); later INE counts were not read. Screening coverage is from the national programme's 2022 monitoring as quoted by the OECD; the monitoring report itself and later years were not read. INFARMED's own decision-time statistics and its HTA reports were not read, so the 748-day figure is the OECD's, from a sample of 13 indications. The Portuguese League Against Cancer's own services and figures could not be read.",
      links: [
        { label: "IPO Porto: registry publications", url: RORENO_PUBS },
        { label: "OECD/EC: Country Cancer Profile Portugal 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Portugal (PDF)", url: IARC_FS },
      ],
    },
  ],
  institutions: [
    "ipo-lisboa", "ipo-porto", "ipo-coimbra", "champalimaud", "ron-portugal", "sns-portugal", "infarmed", "dgs-portugal", "ema", "eu-echos",
  ],
  companies: ["mondego-bio"],
  drugs: [],
  trials: [
    "nct06371807", "mosun-len-mzl", "radar-hodgkin", "ielsg37", "remarc", "ibis-ii", "eortc-22922", "hr-nbl1", "intreall-sr-2010", "phergain",
    "patina", "netter-1", "nct04389086", "keynote-522", "monarche", "olympia", "destiny-breast04", "flaura", "mariposa", "codebreak-200",
    "checkmate-649", "spotlight-glow", "toga", "napoli-3", "talapro-2", "cartitude-5", "viale-a",
  ],
  papers: [],
  people: ["maria-jose-bento", "rita-sa-machado", "julio-oliveira", "carla-goncalo", "maria-margarida-torres-de-ornelas", "leonor-beleza"],
  how:
    "Every card was written from sources read raw: in Portuguese, Law 53/2017 on the national cancer registry, Decree-Law 97/2015 on health technology assessment and Law 75/2021 from the Diário da República, the registry's 2019 report (read by OCR because its PDF has no usable text, with the national table checked against the page image), Despacho 13227/2023 with the national cancer strategy to 2030, the Directorate-General of Health's Norma 002/2026 on HPV vaccination, and Lusa's reports of the registry's 2020 to 2022 figures; in English, the OECD and European Commission's Country Cancer Profile Portugal 2025, IARC's GLOBOCAN 2024 fact sheet and the World Bank's out-of-pocket series. The trial count comes from OnCo's own ClinicalTrials.gov records. The new records added for this page are the national cancer registry, INFARMED, the Directorate-General of Health, the national health service, and two people: the registry's coordinator and the Director-General of Health.",
  verify:
    "Waiting-time rules, screening ages and the HPV schedule changed in 2024 and 2026 and may change again: check with the family doctor or the treating hospital. Whether a new cancer medicine is available in NHS hospitals depends on INFARMED's assessment, which can take years after European approval; ask the oncologist, and look for the medicine's assessment on INFARMED's site. Registry figures after 2019 are from press reports of the coordinator's statements, not from the full reports.",
  verifyLinks: [
    { label: "RON: Registo Oncológico Nacional 2019 (PDF, IPO Porto)", url: RON_2019 },
    { label: "OECD/EC: Country Cancer Profile Portugal 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
    { label: "INFARMED", url: "https://www.infarmed.pt" },
    { label: "DGS: Norma n.º 002/2026, HPV vaccination", url: NORMA_HPV },
    { label: "RTP: Registo Oncológico, mais de 60 mil novos casos de cancro em 2022", url: RTP_2022 },
  ],
};
