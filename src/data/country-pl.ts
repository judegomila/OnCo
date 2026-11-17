import type { CountryDive } from "@/data/country-dive";

/**
 * Poland deep dive: the hand-written cards for /countries/pl/. Polish sources were read in Polish, from the raw text
 * of each PDF, spreadsheet or page (pdftotext, the XLSX itself or the HTML), not from a summary of it: the Polish
 * National Cancer Registry's bulletin on 2023, the consolidated texts of the reimbursement act, the healthcare
 * benefits act, the National Oncology Network act and its July 2026 amendment, the Medical Fund act and the clinical
 * trials act (all through the Sejm's ELI API), the National Oncology Strategy as consolidated in Monitor Polski, the
 * Minister of Health's screening regulations, the NFZ's screening coverage spreadsheets of 1 November 2026, the
 * Ministry's summary of the 1 October 2026 reimbursement list, and the agencies' own pages. Every figure below is
 * quoted from one of those; where a figure could not be read it is named under `gaps`.
 */
const KRN_2023 = "https://onkologia.org.pl/pliki/pl/publikacje/296411/0.nowotwory-krn-2025-book-20260123.pdf";
const KRN_PUB = "https://onkologia.org.pl/pl/publikacje/1";
const REFUND_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2026/253/text.pdf";
const BENEFITS_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2025/1461/text.pdf";
const KSO_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2024/1208/text.pdf";
const KSO_2026 = "https://api.sejm.gov.pl/eli/acts/DU/2026/1007/text.pdf";
const FM_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2026/499/text.pdf";
const TRIALS_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2023/605/text.pdf";
const NSO_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2019/969/text.pdf";
const NSO_MP = "https://api.sejm.gov.pl/eli/acts/MP/2022/814/text.pdf";
const GDP_MP = "https://api.sejm.gov.pl/eli/acts/MP/2026/1061/text.pdf";
const SCREEN_2023 = "https://api.sejm.gov.pl/eli/acts/DU/2023/2167/text.pdf";
const SCREEN_2025 = "https://api.sejm.gov.pl/eli/acts/DU/2025/298/text.pdf";
const NFZ_SCREEN = "https://www.nfz.gov.pl/dla-pacjenta/programy-profilaktyczne/dane-o-realizacji-programow/";
const LIST_OCT = "https://www.gov.pl/web/zdrowie/obwieszczenie-ministra-zdrowia-z-dnia-16-wrzesnia-2026-r-w-sprawie-wykazu-refundowanych-lekow-srodkow-spozywczych-specjalnego-przeznaczenia-zywieniowego-oraz-wyrobow-medycznych-na-1-pazdziernika-2026-r";
const LISTS = "https://www.gov.pl/web/zdrowie/obwieszczenia-ministra-zdrowia-lista-lekow-refundowanych";
const AOTM_ABOUT = "https://www.aotm.gov.pl/o-nas/o-agencji/";
const AOTM_STATS = "https://www.aotm.gov.pl/o-nas/statystyki-aotmit/";
const ABM_ABOUT = "https://abm.gov.pl/pl/o-nas/o-agencji/34,O-Agencji.html";
const PAC_LUNG = "https://pacjent.gov.pl/program-profilaktyczny/program-profilaktyki-raka-pluca";
const PAC_BREAST = "https://pacjent.gov.pl/program-profilaktyczny/profilaktyka-raka-piersi";
const PAC_CERVIX = "https://pacjent.gov.pl/program-profilaktyczny/profilaktyka-raka-szyjki-macicy";
const PAC_BOWEL = "https://pacjent.gov.pl/program-profilaktyczny/kolonoskopia-badanie-ktore-ratuje-zycie";

export const PL_DIVE: CountryDive = {
  iso2: "PL",
  iso3: "POL",
  name: "Poland",
  flag: "🇵🇱",
  asOf: "2026-11-04",
  title: "Cancer in Poland",
  description:
    "Cancer in Poland from Polish sources: the national registry's 192,922 cancers registered in 2023 and 99,676 cancer deaths, a single public insurer that gives cancer medicines free of charge to the patient, the fast-track cancer card and the National Oncology Network, how the reimbursement act and the assessment agency decide what is paid for, emergency access to unreimbursed medicines, the screening programmes and their coverage, a new lung screening programme from October 2026, and a compensation fund for clinical trial participants.",
  lede:
    "Poland has one national cancer registry, which recorded 192,922 new cancers in 2023 and says its counts still miss some cases, and lung cancer kills more Polish women than breast cancer. Its single public insurer gives cancer medicines free of charge to the patient, a cancer card sends a patient with a suspected cancer past the ordinary referral queue, and since April 2025 only hospitals in the new National Oncology Network may treat cancer under a public contract.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Poland is 202,797 new cancers and 114,190 deaths for 2024, labelled ICD-10 C00-97 and including 6,621 non-melanoma skin cancers (196,176 without them). The Polish National Cancer Registry's own count for 2023 is 192,922 cases, but it covers C00 to D09, so it includes 18,838 other skin cancers (C44) and 7,593 in situ tumours; its invasive cancers other than skin come to 166,491 by the registry's own tables. GLOBOCAN's like-for-like figure is therefore about 18% higher, which is consistent with the registry's own statement that its counts are burdened with some under-registration. On deaths, the registry's 99,676 is the count of 2023 death certificates from Statistics Poland, against GLOBOCAN's modelled 114,190 for 2024; neither source explains the gap of about 14,500, so it is noted here rather than explained. The registry standardises its rates to the world (Segi) and 2013 European populations: its world-standard incidence for 2023, 253.30 per 100,000, is close to GLOBOCAN's 255.75.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Poland",
      aside: { label: "KRN: Nowotwory złośliwe w Polsce w 2023 roku (PDF)", url: KRN_2023 },
      cards: [
        {
          id: "shape",
          title: "192,922 cancers registered in 2023, and lung cancer the commonest cause of cancer death",
          plain:
            "Poland's national cancer registry recorded 192,922 new cancers in 2023, about half in men and half in women, and 99,676 people died of cancer that year. Cancer caused about a quarter of all deaths. Prostate cancer is the commonest cancer in men and breast cancer in women, but lung cancer causes the most cancer deaths in both sexes.",
          detail:
            "The registry's 2023 bulletin counts 96,925 first registrations of cancer in men and 95,997 in women, 511.75 per 100,000 people, and 99,676 cancer death certificates, 53,322 for men and 46,354 for women. Cancer was the second cause of death in Poland, causing 26% of deaths in men and 23% in women, and the bulletin estimates that 1.47 million people were living after a cancer diagnosis. In men the commonest registered cancers were prostate (24.5% of cases), lung (12.6%), large bowel (11.4%) and bladder (5.6%); in women breast (22.6%), lung (9.2%), large bowel (9.2%) and uterine body (6.8%). Lung cancer caused 25.4% of male cancer deaths and 18.6% of female ones: 8,602 women died of lung cancer against 6,757 of breast cancer, and the bulletin notes that more women have died of lung than of breast cancer for over a decade. It also records that cancer is especially important in women under 65, among whom it has been the most frequent cause of death for years, accounting for 45% of deaths of women aged 45 to 64.",
          links: [
            { label: "KRN: Nowotwory złośliwe w Polsce w 2023 roku, chapter 2 and tables 6.3, 6.4, 7.2, 7.3 (PDF)", url: KRN_2023 },
          ],
        },
        {
          id: "smoking-trend",
          title: "What is changing: smoking now equal in men and women",
          plain:
            "The registry links Poland's long-term cancer trends mainly to smoking and to an ageing population. Lung cancer in men has been falling for more than twenty years as fewer men smoke. By 2024 the share of men and women who smoke every day had become equal, at about one adult in five.",
          detail:
            "The bulletin's summary states that the long-term trends in cancer incidence and mortality in Poland are shaped both by the age structure of the population and by changes in exposure to carcinogens, mainly cigarette smoking, and that in 2024 the share of men and women smoking became equal, with 21% of adults smoking cigarettes daily. For over twenty years lung cancer incidence and mortality in men have fallen, which the registry attributes primarily to the fall in male smoking. Prostate cancer shows the fastest growth in registered incidence, while its mortality, flat around the turn of the century, has tended upwards since 2014. Colorectal cancer, the third commonest in men, has shown a favourable trend in incidence and mortality since 2015. The years 2020 to 2022 were distorted by COVID-19 deaths (18.4% of male and 17.1% of female deaths in 2021), and in 2023 the share of deaths from infectious diseases returned to its pre-pandemic level.",
          links: [{ label: "KRN: Nowotwory złośliwe w Polsce w 2023 roku, summary and chapter 2 (PDF)", url: KRN_2023 }],
        },
      ],
      tables: [
        {
          id: "krn-2023",
          title: "Cancers registered and cancer deaths in 2023, by site",
          caption: "Registered new cases and death certificates, Poland 2023, both sexes unless stated. Sums of the registry's male and female tables.",
          columns: [
            { key: "site", label: "Cancer (ICD-10)" },
            { key: "cases", label: "Registered cases, 2023", numeric: true },
            { key: "deaths", label: "Deaths, 2023", numeric: true },
          ],
          rows: [
            { site: "All registered cancers, C00 to D09 (includes other skin cancers and in situ tumours)", cases: 192922, deaths: 99676 },
            { site: "Prostate (C61)", cases: 23710, deaths: 5859 },
            { site: "Breast, women (C50)", cases: 21716, deaths: 6757 },
            { site: "Lung (C34)", cases: 21045, deaths: 22155 },
            { site: "Colon, rectum and anus (C18 to C21)", cases: 19889, deaths: 12187 },
            { site: "Other skin cancers, not melanoma (C44)", cases: 18838, deaths: 1249 },
            { site: "Urinary bladder (C67)", cases: 7239, deaths: 3989 },
            { site: "Uterine body (C54)", cases: 6519, deaths: 1803 },
            { site: "Kidney (C64)", cases: 5938, deaths: 2300 },
            { site: "Stomach (C16)", cases: 4896, deaths: 4591 },
            { site: "Pancreas (C25)", cases: 4280, deaths: 5086 },
            { site: "Ovary (C56)", cases: 3525, deaths: 2520 },
          ],
          note: "Cases are what the registry received by 10 October 2025, which it says still undercounts some cancers: for lung and pancreas, deaths exceed registered cases, and the registry uses the ratio of deaths to cases as its simplest measure of how complete registration is. Deaths are death certificates collected by Statistics Poland. Breast deaths are women only; the registry also counted 208 breast cancers in men.",
          sources: [{ label: "KRN: Nowotwory złośliwe w Polsce w 2023 roku, tables 2.1, 6.3 to 6.6 and 7.2 to 7.5 (PDF)", url: KRN_2023 }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: one national registry inside the cancer institute",
      aside: { label: "KRN: publikacje", url: KRN_PUB },
      cards: [
        {
          id: "krn",
          title: "A national registry with an office in every region",
          plain:
            "Poland has a single national cancer registry that aims to count every cancer diagnosed in the country, run by the National Institute of Oncology in Warsaw with a registration office in each of the sixteen regions. Hospitals report cases, increasingly straight from their own computer systems. The latest year published is 2023.",
          detail:
            "The 2023 bulletin sets out the legal basis: the 1995 public statistics act, the 2011 act on the health information system and the Minister of Health's regulation of 14 June 2018 on the National Cancer Registry, which defines its structure and fixes the seat of the voivodeship registration offices; the registry is a separate organisational unit of the Maria Skłodowska-Curie National Institute of Oncology, State Research Institute, in Warsaw, and the bulletin lists the sixteen regional offices, hosted mostly by regional cancer centres. Cases are held in a central database, and nearly 180 hospitals have integrated their systems with the e-KRN system, which the registry says further improved completeness in 2023. It nonetheless calls its figures registered incidence because of remaining under-registration, and uses the ratio of deaths to cases by region as its simplest measure of completeness. In 2023, 96.2% of cases in men and 96.4% in women were confirmed by histopathology, with regional values from 89.4% to 99.9%. The institute has published national bulletins since 1979, the data for 2000 to 2022 also appear in the European Cancer Information System, and the bulletin was produced with the Polish Onco-Haematology Registry.",
          links: [
            { label: "KRN: Nowotwory złośliwe w Polsce w 2023 roku, chapter 1 and table 6.22 (PDF)", url: KRN_2023 },
            { label: "KRN: publikacje", url: KRN_PUB },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one public insurer, and cancer medicines free to the patient",
      aside: { label: "Ustawa o refundacji leków, articles 6 and 14 (PDF)", url: REFUND_ACT },
      cards: [
        {
          id: "nfz-card",
          title: "A single national health fund, paid for by a 9% health contribution",
          plain:
            "Public health care in Poland is paid for by one insurer, the National Health Fund (NFZ), from a health contribution that for most people is 9% of the contribution base. It contracts the hospitals and clinics that diagnose and treat cancer and pays for the screening programmes.",
          detail:
            "Article 96 of the 2004 act on publicly funded health care benefits creates the Narodowy Fundusz Zdrowia as a state body with legal personality, and article 79 sets the health insurance contribution at 9% of the contribution base, with exceptions such as some self-employed people. For cancer, the act on the National Oncology Network makes the NFZ's President responsible for qualifying hospitals to the network's levels and for publishing the list, and since 1 April 2025 hospitals outside the network may not provide cancer care under an NFZ contract. Under the benefits act, the amount the NFZ pays a provider for diagnosis and treatment given on the cancer card is adjusted to health needs and to what was actually done, and providers keep separate waiting lists for cancer patients, ordered by medical criteria such as the patient's state and the expected course of the cancer.",
          links: [
            { label: "Ustawa o świadczeniach opieki zdrowotnej, articles 20, 79, 96 and 136 (PDF)", url: BENEFITS_ACT },
            { label: "Ustawa o Krajowej Sieci Onkologicznej, articles 5 and 9 (PDF)", url: KSO_ACT },
          ],
        },
        {
          id: "free-medicines",
          title: "What a patient pays: nothing for reimbursed cancer medicines",
          plain:
            "Cancer medicines that the state reimburses cost the patient nothing. That covers medicines given in hospital drug programmes and chemotherapy, and also reimbursed pharmacy medicines with proven effectiveness against a malignant cancer. Other pharmacy medicines carry a flat fee or a 30% or 50% share.",
          detail:
            "Article 6 of the reimbursement act sorts reimbursed medicines into pharmacy medicines, medicines used in a drug programme (program lekowy), medicines used in chemotherapy, and medicines used in other guaranteed services, and paragraph 8 says that medicines in drug programmes and chemotherapy are given to the patient free of charge. For pharmacy medicines, article 14 lets the minister set one of four payment levels when deciding on reimbursement, and the first, free of charge, is for a medicine with proven effectiveness in treating a malignant tumour, a psychotic disorder, intellectual disability or developmental disorder, or an infectious disease of particular epidemic risk, and for any medicine used in a drug programme. The other levels are a flat fee, which article 6 sets at 3.20 zł per pack, and 30% or 50% of the reimbursement limit; the patient also pays any difference between the pharmacy price and the limit. Article 6 also lowers the patient's payment by 10% for a medicine made in Poland or made from an active substance made in Poland, and by 15% for one made in Poland from an active substance also made in Poland.",
          links: [{ label: "Ustawa o refundacji leków, articles 6 and 14 (Dz.U. 2026 poz. 253, PDF)", url: REFUND_ACT }],
        },
        {
          id: "dilo",
          title: "The cancer card: a direct route past the ordinary referral queue",
          plain:
            "A family doctor or specialist who suspects cancer can issue a cancer diagnosis and treatment card, known as DiLO. With it the patient can go for cancer diagnosis without the usual referral, and, once cancer is confirmed, for treatment. The card is becoming electronic: paper cards can be issued only until the end of 2026.",
          detail:
            "Article 32a of the benefits act gives a patient in whom a primary care doctor or outpatient specialist suspects a malignant or locally malignant tumour the right to cancer diagnosis on the karta diagnostyki i leczenia onkologicznego without the referral normally required, and a patient in whom cancer is confirmed the right to cancer treatment on the card without a referral; it does not apply to skin cancers other than melanoma. Article 39 of the 2023 National Oncology Network act lets the card be issued by a primary care doctor, an outpatient specialist, a hospital doctor or a doctor in a health programme, and article 40 entitles the patient to free copies of the medical records, attached to the card. The amending act of 3 July 2026 (Dz.U. 2026 poz. 1007) makes the card electronic medical documentation issued in the national e-health system; until 31 December 2026 a paper card may still be issued under the old rules, and the NFZ is to transfer open paper cards into the electronic system by 1 January 2027. Article 32a as now written sets no maximum waiting time for card holders.",
          links: [
            { label: "Ustawa o świadczeniach opieki zdrowotnej, article 32a (PDF)", url: BENEFITS_ACT },
            { label: "Ustawa o Krajowej Sieci Onkologicznej, articles 39 and 40 (PDF)", url: KSO_ACT },
            { label: "Ustawa z 3 lipca 2026 r. o zmianie ustawy o Krajowej Sieci Onkologicznej, article 7 (PDF)", url: KSO_2026 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Poland decides which cancer medicines are reimbursed",
      aside: { label: "Ministry of Health: reimbursement lists", url: LISTS },
      cards: [
        {
          id: "refund-process",
          title: "A ministerial decision, an agency recommendation and a threshold written into law",
          plain:
            "A company applies to the Minister of Health to have a medicine reimbursed. The assessment agency AOTMiT checks the evidence and recommends for or against within 60 days, a pricing commission negotiates, and the minister decides. The law names a cost-effectiveness threshold: three times Poland's GDP per head for each extra year of life in good health.",
          detail:
            "Article 12 of the reimbursement act lists what the minister must weigh: the position of the Economic Commission, the recommendation of the President of the Agency for Health Technology Assessment and Tariff System, the severity of the condition, clinical effectiveness, safety, cost-effectiveness against what is already reimbursed, price competition, budget impact, alternatives, and the threshold cost of a quality-adjusted life year, set at three times GDP per head as announced by Statistics Poland. A Statistics Poland notice dated 29 October 2026 gives GDP per head for 2022 to 2024 at 90,208 zł, which by that formula gives 270,624 zł; the threshold the agency applies is announced by the agency itself and was not read for this page. Under article 35 the agency's President must send the recommendation within 60 days of receiving the file, after a verification analysis and the opinion of its Transparency Council, and the analyses are published. Article 31 gives the minister 180 days to decide a reimbursement application, with the clock stopped while missing data are supplied. Reimbursed medicines are published in lists by ministerial notice; the Ministry's page lists editions for 1 January, 1 April, 1 July and 1 October. That page did not answer on 17 November 2026; this was confirmed from the Internet Archive's copy of 24 September 2026.",
          links: [
            { label: "Ustawa o refundacji leków, articles 12, 31 and 35 (PDF)", url: REFUND_ACT },
            { label: "Statistics Poland: GDP per head 2022 to 2024 (Monitor Polski 2026 poz. 1061, PDF)", url: GDP_MP },
            { label: "Ministry of Health: obwieszczenia, lista leków refundowanych", url: LISTS },
          ],
        },
        {
          id: "drug-programmes",
          title: "Most new cancer medicines are paid for through hospital drug programmes",
          plain:
            "Expensive cancer medicines in Poland are usually reimbursed inside a drug programme: a written protocol, attached to the reimbursement list, that says which patients qualify and how they are treated and monitored in hospital. The Ministry's summary of the list in force from 1 October 2026 counted 13 new cancer indications; that summary could not be re-read on 17 November 2026.",
          detail:
            "Article 37 of the reimbursement act makes the description of each drug programme an annex to the ministerial notice listing reimbursed medicines. The rest of this paragraph comes from the Ministry's summary of the 1 October 2026 list, which could not be re-read on 17 November 2026 because the Ministry's site did not answer and the Internet Archive holds no copy, so it stands as first read. The summary of list number 84, in force from 1 October 2026 and described as the last list of 2026, records 24 new molecule-indications, 13 of them in oncology, and 174 products or indications added in total, with 76 leaving the list. The oncology additions include encorafenib with cetuximab for BRAF V600E colorectal cancer after first-line treatment (programme B.4), pembrolizumab with chemotherapy as first-line treatment of biliary tract cancer (B.5), daratumumab with bortezomib, lenalidomide and dexamethasone for newly diagnosed myeloma in patients not eligible for a stem cell transplant (B.54), and zolbetuximab with chemotherapy for claudin 18.2-positive gastric or gastro-oesophageal junction cancer (B.58). The same list extends adjuvant abemaciclib for early hormone-receptor-positive, HER2-negative breast cancer to patients without lymph node involvement, an indication the Ministry marks as off-label, in a programme numbered B.9.FM.",
          links: [
            { label: "Obwieszczenie refundacyjne nr 84 (1 October 2026), summary and annexes", url: LIST_OCT },
            { label: "Ustawa o refundacji leków, article 37 (PDF)", url: REFUND_ACT },
          ],
        },
        {
          id: "aotmit-card",
          title: "The assessment agency: AOTMiT",
          plain:
            "Poland's health technology assessment agency was founded in 2005. It advises the Minister of Health on what to fund, and since 2015 it also sets the tariffs hospitals are paid. By its own count it wrote 2,597 assessments of medicines from 2007 to 2025.",
          detail:
            "The Agencja Oceny Technologii Medycznych i Taryfikacji was created on 16 September 2005 by order of the Minister of Health, gained legal personality in 2009, took over the setting of tariffs for health services from 1 January 2015 under a 2014 amendment and was renamed accordingly. It describes itself as an advisory body supervised by the minister. Its statistics page records 3,991 analyses from 2007 to 2025, of which 2,597 were assessments of medicines and 540 analyses of health services, and lists the kinds of drug assessment it does: reimbursement applications, targeted import of unregistered medicines, reimbursement of off-label indications, limit groups, highly innovative medicines, opinions on drug programme texts, and, in the past, emergency access requests. Since 26 November 2020 it has compiled the lists of highly innovative medicines and medicines of high clinical value that the Medical Fund can pay for.",
          links: [
            { label: "AOTMiT: o Agencji", url: AOTM_ABOUT },
            { label: "AOTMiT: statystyki", url: AOTM_STATS },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: URPL, inside the European system",
      aside: { label: "URPL", url: "https://www.gov.pl/web/urpl" },
      cards: [
        {
          id: "urpl-card",
          title: "Most cancer medicines are approved in Brussels; the national office authorises trials",
          plain:
            "New cancer medicines are almost all authorised once for the whole European Union, so they are valid in Poland without a separate national approval. The Polish regulator, URPL, takes part in European coordination groups, authorises clinical trials in Poland and collects reports of side effects. No national approval times for cancer medicines were found on its pages when this was written; those pages could not be re-read on 17 November 2026.",
          detail:
            "New active substances for cancer must go through the EU centralised procedure, in which the European Commission grants a marketing authorisation valid in every member state on the opinion of the European Medicines Agency's committee for human medicines; the Polish office posts reports of the EU coordination group meetings it attends, a statement about its website that could not be re-read on 17 November 2026 because the site did not answer. For trials, the 2023 act on clinical trials of medicinal products, which applies the EU clinical trials regulation, says that granting or refusing a trial authorisation, approving substantial changes, suspending or revoking a trial are all decisions of the President of the office. The ethical assessment is done by the National Bioethics Committee, which operates at the Medical Research Agency, or by a local committee on the official list; for a trial run in Poland alone, the ethical assessment must reach the office within 35 days of the application being validated. In practice the gap between European approval and a Polish patient's access is set by reimbursement, not by the regulator, and no official average for that gap was found; it is named under gaps.",
          links: [
            { label: "Ustawa o badaniach klinicznych produktów leczniczych, articles 9, 15 and 24 (Dz.U. 2023 poz. 605, PDF)", url: TRIALS_ACT },
            { label: "EMA: authorisation of medicines, scope of the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
            { label: "URPL", url: "https://www.gov.pl/web/urpl" },
          ],
        },
        {
          id: "rdtl",
          title: "Emergency access: a route to an unreimbursed medicine for one patient",
          plain:
            "When every publicly funded treatment has been tried, a hospital can give a patient a medicine that is not reimbursed for that use, paid for by the state, if a national or regional medical consultant agrees it is justified. It is granted for three months or three treatment cycles at a time.",
          detail:
            "Article 47d of the benefits act creates ratunkowy dostęp do technologii lekowych, emergency access to medicine technologies: where current medical knowledge justifies a medicine not publicly funded in that indication, it is needed to save the patient's life or health in an indication occurring in individual patients, and all publicly funded options for that indication have been exhausted, the provider may give it after a positive opinion from the national consultant in the relevant field or the regional consultant, assessing whether it is justified for that patient. Treatment may last up to three months or three cycles, and may continue if a specialist confirms it is working. The medicine must be authorised for marketing and available on the market. The Medical Fund pays for it, and under article 47f, if one medicine in one indication takes more than 5% of the emergency access budget in a year, its maker must apply for ordinary reimbursement within 90 days or the medicine leaves the scheme. Targeted import of medicines not registered in Poland is a separate route, which the assessment agency lists among its assessments.",
          links: [
            { label: "Ustawa o świadczeniach opieki zdrowotnej, articles 47d and 47f (PDF)", url: BENEFITS_ACT },
            { label: "Ustawa o Funduszu Medycznym, articles 7 and 33 (Dz.U. 2026 poz. 499, PDF)", url: FM_ACT },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and the national cancer strategy",
      aside: { label: "NFZ: dane o realizacji programów profilaktycznych", url: NFZ_SCREEN },
      cards: [
        {
          id: "programmes",
          title: "Four free screening programmes, and lung screening new in October 2026",
          plain:
            "The NFZ invites women aged 45 to 74 for a mammogram every two years and women aged 25 to 64 for cervical screening, now an HPV test every five years. People aged 50 to 65 can have a screening colonoscopy, from 40 with a close relative who had bowel cancer. A national low-dose lung CT programme for people aged 50 to 74 with a long smoking history starts in October 2026, with first bookings due in the second half of the month. None needs a referral.",
          detail:
            "The Minister of Health's regulation of 5 October 2023 (Dz.U. 2023 poz. 2167) set breast screening at a mammogram every 24 months for women aged 45 to 74, yearly for some women after breast cancer treatment, and extended cervical screening from age 59 to 64. The regulation of 7 March 2025 (Dz.U. 2025 poz. 298) added a high-risk HPV test with genotyping for women aged 25 to 64, repeated after 5 years if negative and there are no risk factors, with liquid-based cytology done from the same sample only if the HPV test is positive; conventional cytology every 36 months remains in the regulation. The government patient portal describes the bowel programme as a colonoscopy for people aged 50 to 65 without symptoms who have not had a colonoscopy in the last 10 years, or 40 to 49 with a first-degree relative with bowel cancer. The lung programme, described on the government patient portal in a page published on 1 October 2026, offers yearly low-dose CT to people aged 55 to 74 with at least 20 pack-years who still smoke or stopped no more than 15 years ago, and to people aged 50 to 54 with the same history and one further risk factor such as at least two years of occupational exposure, an earlier lymphoma, head and neck or bladder cancer, a parent, sibling or child with lung cancer, or chronic obstructive pulmonary disease; booking was due to open in the second half of October 2026, once the NFZ had signed contracts with providers, with an estimated budget of about 16 million zł a year.",
          links: [
            { label: "Rozporządzenie Ministra Zdrowia z 5 października 2023 r. (Dz.U. 2023 poz. 2167, PDF)", url: SCREEN_2023 },
            { label: "Rozporządzenie Ministra Zdrowia z 7 marca 2025 r. (Dz.U. 2025 poz. 298, PDF)", url: SCREEN_2025 },
            { label: "pacjent.gov.pl: profilaktyka raka piersi", url: PAC_BREAST },
            { label: "pacjent.gov.pl: profilaktyka raka szyjki macicy", url: PAC_CERVIX },
            { label: "pacjent.gov.pl: kolonoskopia, badanie które ratuje życie", url: PAC_BOWEL },
            { label: "pacjent.gov.pl: program profilaktyki raka płuca", url: PAC_LUNG },
          ],
        },
        {
          id: "coverage",
          title: "Coverage: one in three eligible women for breast screening, one in six for cervical",
          plain:
            "The NFZ publishes, each month, how much of each eligible population is covered by screening. On 1 November 2026 it was 32.9% for breast screening, 16.7% for cervical screening and 17.6% for bowel screening, well below the targets the national cancer strategy set.",
          detail:
            "The NFZ's spreadsheets for 1 November 2026 count, for each municipality and nationally, the people eligible for each programme and the people excluded from invitation because they were tested in the programme within the interval or are being treated, and report the latter as a percentage of the former. The national totals are 2,867,204 of 8,706,121 eligible women for breast screening (32.93%), 1,995,083 of 11,973,896 for cervical screening (16.66%) and 1,515,890 of 8,603,948 for bowel screening (17.62%). The NFZ notes that from August 2026 the cervical figures are based on the HPV test with liquid-based cytology triage. Tests paid for privately are not counted, which the national strategy says leads to underestimating cervical coverage. The National Oncology Strategy, adopted by the Council of Ministers on 4 February 2020 and consolidated in 2022, set targets of 60% breast screening uptake by the end of 2024 and 75% by 2027, 30% and then 45% of the target population screened for bowel cancer, and 60% and then 80% for cervical screening.",
          links: [
            { label: "NFZ: dane o realizacji programów profilaktycznych (spreadsheets, 1 November 2026)", url: NFZ_SCREEN },
            { label: "Narodowa Strategia Onkologiczna, consolidated text (Monitor Polski 2022 poz. 814, PDF)", url: NSO_MP },
          ],
          },
        {
          id: "strategy",
          title: "A national cancer strategy required by its own act of parliament",
          plain:
            "Poland's cancer strategy for 2020 to 2030 exists because a 2019 act of parliament requires the government to adopt one, update it at least every five years and fund it through a yearly implementation schedule. It covers prevention, screening, treatment, quality of life, training and research.",
          detail:
            "The act of 26 April 2019 on the National Oncology Strategy obliges the Council of Ministers to adopt a strategy for 2020 to 2030 as a multi-year programme under the public finance act, sets seven aims, from reducing incidence through health education and prevention to developing research, requires a yearly implementation schedule with costs and funding sources to be put to the government by 30 September, and requires an update at least every five years. The strategy was adopted by Council of Ministers resolution no. 10 of 4 February 2020 and has been amended several times since, most recently by resolution no. 99 of 23 March 2026. Its diagnosis records breast screening coverage of 39.26% and cervical coverage of 17.11% in 2018, and 102,058 screening colonoscopies in 2018, and among its measures it planned the faecal immunochemical test as a second choice for people who decline colonoscopy.",
          links: [
            { label: "Ustawa o Narodowej Strategii Onkologicznej (Dz.U. 2019 poz. 969, PDF)", url: NSO_ACT },
            { label: "Narodowa Strategia Onkologiczna, consolidated text (Monitor Polski 2022 poz. 814, PDF)", url: NSO_MP },
            { label: "Uchwała nr 99 Rady Ministrów z 23 marca 2026 r. (Monitor Polski 2026 poz. 313, PDF)", url: "https://api.sejm.gov.pl/eli/acts/MP/2026/313/text.pdf" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Poland does",
      title: "What Poland does that others do not",
      cards: [
        {
          id: "oncology-network",
          title: "Only hospitals in a graded national network may treat cancer on public money",
          plain:
            "Since 1 April 2025 a hospital must belong to the National Oncology Network to treat cancer under a public contract. The network grades hospitals by whether they offer surgery, drug treatment and radiotherapy, gives the top level oversight of first-level hospitals' treatment plans, and judges every hospital against quality indicators every two years.",
          detail:
            "The act of 9 March 2023 on the Krajowa Sieć Onkologiczna defines three levels of Specialist Oncology Treatment Centre (SOLO): level I offers one of surgery, systemic treatment or radiotherapy and works with a level III centre, level II offers two, and level III offers all three, organises multidisciplinary teams, supervises level I centres' treatment plans and supports their care coordinators; cooperating centres (Ośrodki Kooperacyjne) are a separate category. The NFZ's President qualifies hospitals using data in the network's system and published criteria; the act first set the list's validity and the re-verification of each hospital at every two years, and the July 2026 amendment changed both to every four years, while hospitals' quality indicators are still checked every two years. The National Institute of Oncology in Warsaw is the national monitoring centre, responsible for having guidelines written and for analysing quality indicators nationally, and the level III centre that delivers the largest share of the region's level III treatment monitors that region. Article 5, which bars hospitals outside the network from cancer care under an NFZ contract, took effect on 1 April 2025. The amending act of July 2026 requires plans of treatment to be electronic records signed by the treating doctor, and lets hospitals listed on 26 July 2026 keep their level until 26 July 2028.",
          links: [
            { label: "Ustawa o Krajowej Sieci Onkologicznej, consolidated text (Dz.U. 2024 poz. 1208, PDF)", url: KSO_ACT },
            { label: "Ustawa z 3 lipca 2026 r. o zmianie ustawy o Krajowej Sieci Onkologicznej (Dz.U. 2026 poz. 1007, PDF)", url: KSO_2026 },
          ],
        },
        {
          id: "medical-fund",
          title: "A separate fund for innovative cancer medicines and emergency access",
          plain:
            "Alongside the NFZ, Poland has a Medical Fund set up in 2020. One of its sub-funds pays for highly innovative cancer and rare disease medicines put on a special list, and for the emergency access route, so these can be funded before or outside the ordinary reimbursement budget.",
          detail:
            "The act of 7 October 2020 on the Medical Fund (consolidated in Dz.U. 2026 poz. 499) creates a state earmarked fund with sub-funds for strategic infrastructure, modernising hospitals, prevention, a therapeutic and innovation sub-fund, defence infrastructure and rare diseases in children. Article 7 lists among its purposes paying for medicines under emergency access and for medicine technologies of high clinical value or of a high level of innovation, and article 33 pays for both from the therapeutic and innovation sub-fund. The reimbursement act defines a highly innovative medicine technology as one used in oncology or rare diseases, authorised by the European Union and placed on the list compiled with the assessment agency. The reimbursement list in force from 1 October 2026 was read as showing programmes carrying the suffix FM, such as B.9.FM for breast cancer; the Ministry's page could not be re-read on 17 November 2026. In 2026 the Council of Ministers also established a series of investment programmes for oncology infrastructure in individual regions.",
          links: [
            { label: "Ustawa o Funduszu Medycznym, articles 6, 7 and 33 (Dz.U. 2026 poz. 499, PDF)", url: FM_ACT },
            { label: "Ustawa o refundacji leków, article 2 points 24a and 24b (PDF)", url: REFUND_ACT },
            { label: "Obwieszczenie refundacyjne nr 84 (1 October 2026)", url: LIST_OCT },
            { label: "Uchwała nr 81 Rady Ministrów z 16 lutego 2026 r., one of the 2026 oncology investment programmes (Monitor Polski 2026 poz. 233, PDF)", url: "https://api.sejm.gov.pl/eli/acts/MP/2026/233/text.pdf" },
          ],
        },
        {
          id: "trial-compensation",
          title: "A state fund that compensates people harmed in clinical trials",
          plain:
            "Poland's 2023 clinical trials act set up a compensation fund, run by the Patient Ombudsman and paid into by trial sponsors. A participant injured by taking part can receive between 2,000 and 200,000 zł on a claim decided by the Patient Ombudsman, and family members can be paid if a participant dies as a result.",
          detail:
            "Articles 41 to 45 of the act of 9 March 2023 on clinical trials of medicinal products create the Fundusz Kompensacyjny Badań Klinicznych, a state earmarked fund whose manager is the Rzecznik Praw Pacjenta, the Patient Ombudsman, financed by payments from sponsors that depend on the planned number of participants. A participant whose body or health is harmed as a result of taking part in a trial is entitled to a compensation benefit of 2,000 to 200,000 zł; if a participant dies as a result, a spouse who is not separated, a first-degree relative, an adopted relation or a cohabiting partner can each receive 20,000 to 100,000 zł. No benefit is due where the harm results from the natural course of the disease, and the amounts are revalued every five years in line with consumer prices. The same act places the National Bioethics Committee at the Medical Research Agency.",
          links: [{ label: "Ustawa o badaniach klinicznych produktów leczniczych, articles 15 and 41 to 45 (PDF)", url: TRIALS_ACT }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-poland",
          title: "904 cancer trials in OnCo's records have a site in Poland",
          plain:
            "Of the cancer trials OnCo holds, 904 list a site in Poland on ClinicalTrials.gov, and 281 of them were recruiting when last read. The commonest lead sponsors are international companies, led by AstraZeneca, MSD and Roche. Trials led from Poland include two of Ryvu Therapeutics' medicines.",
          detail:
            "OnCo's trial records carry what ClinicalTrials.gov says about where each study runs. Counted on 17 November 2026, 904 of the 6,525 trial records list Poland among their countries: 281 recruiting, 392 active but not recruiting, 199 completed and 25 terminated. 661 are phase 3. The commonest lead sponsors are AstraZeneca (110), Merck Sharp & Dohme (91), Hoffmann-La Roche (65) and Bristol-Myers Squibb (48), and the commonest cancers are non-small-cell lung cancer (162) and prostate cancer (65), followed by multiple myeloma and hormone-receptor-positive breast cancer (48 each). Polish-led trials among them include Ryvu Therapeutics' studies of RVU120 with venetoclax in acute myeloid leukaemia and of MEN1703 in aggressive B-cell lymphoma, the Medical University of Gdańsk's CAREGIVER window-of-opportunity trial in triple-negative breast cancer and an academic phase 3 trial of risk-adapted treatment for adults with acute myeloid leukaemia. Across all conditions, ClinicalTrials.gov listed 11,608 studies with a site in Poland when OnCo counted in September 2026, and OpenAlex counts between 914 and 1,089 oncology papers with a Polish author each year from 2021 to 2025.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Poland", url: "https://clinicaltrials.gov/search?cond=Cancer&locStr=Poland&country=Poland" },
            { label: "OpenAlex: oncology works by country", url: "https://openalex.org/" },
          ],
        },
        {
          id: "abm-card",
          title: "A public agency that pays for academic trials",
          plain:
            "The Medical Research Agency (ABM), created by a 2019 act, funds clinical trials run by hospitals and universities rather than companies, with cancer named among its priorities. Its own page says such trials are about 2% of those registered in Poland, against about 40% in Western Europe, and aims for 20 to 30%.",
          detail:
            "The Agencja Badań Medycznych was established by the act of 21 February 2019 and describes itself as the state agency responsible for developing research in the medical and health sciences. It says it runs one of the first public grant programmes in Poland for non-commercial clinical trials, gives oncology, cardiology and rare diseases as the main areas because companies often leave them aside, and says non-commercial trials make up about 2% of all registered trials, against about 40% in Western Europe, giving its aim as raising that share to 20 to 30%. It also funds population and epidemiological studies. Under the 2023 clinical trials act the National Bioethics Committee, which can give the ethical opinion on a trial application, sits within the agency. The agency's grant totals and the number of cancer trials it funds were not read for this page.",
          links: [
            { label: "ABM: o Agencji", url: ABM_ABOUT },
            { label: "Ustawa o Agencji Badań Medycznych, consolidated text (Dz.U. 2025 poz. 259, PDF)", url: "https://api.sejm.gov.pl/eli/acts/DU/2025/259/text.pdf" },
            { label: "Ustawa o badaniach klinicznych produktów leczniczych, article 15 (PDF)", url: TRIALS_ACT },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "survival-and-gus",
      title: "Survival figures and the newest death statistics are not on this page",
      plain:
        "This page gives registered cases and deaths for 2023 from the national registry, but not five-year survival, and not Statistics Poland's own cause-of-death figures for 2024. Neither was read in raw form when the page was written, so no figure for them is quoted.",
      detail:
        "The Polish National Cancer Registry's 2023 bulletin covers incidence and mortality; survival estimates for Poland exist in European studies, but none was read for this page. The registry's death counts are Statistics Poland's death certificates for 2023; Statistics Poland's own publication of deaths by cause for 2024 was not located and read. The gap between the registry's 99,676 deaths in 2023 and GLOBOCAN's 114,190 for 2024 is therefore stated, not explained.",
      links: [{ label: "KRN: publikacje", url: KRN_PUB }],
    },
    {
      id: "time-to-access",
      title: "No official average time from European approval to reimbursement in Poland",
      plain:
        "How long a Polish patient waits between a cancer medicine's European approval and its reimbursement is the question patients ask most, and OnCo found no official Polish figure for it. The law sets deadlines for each step, but nobody official publishes the total.",
      detail:
        "The reimbursement act gives the assessment agency 60 days for its recommendation and the minister 180 days for a decision, both paused while the applicant supplies missing data, but a company decides when to apply, and the Ministry publishes decisions only as quarterly lists. The industry's W.A.I.T. survey publishes a time to availability by country, but it was not read from the report itself for this page. The cost-effectiveness threshold in zł that the agency currently applies was also not read; only the statutory formula and Statistics Poland's GDP figure are given.",
      links: [{ label: "Ustawa o refundacji leków, articles 31 and 35 (PDF)", url: REFUND_ACT }],
    },
    {
      id: "unreachable",
      title: "Sources and figures that could not be read on 4 November 2026",
      plain:
        "Some official figures were looked for and not found: how many cancer cards are issued and how long card holders wait, how many trials the regulator authorises each year, and the national lung screening programme's take-up, since the programme was only due to start in October 2026.",
      detail:
        "The NFZ's statistics on cancer cards and waiting times were not located in a form that could be read raw, and the benefits act as now written sets no maximum waiting time for card holders, so no waiting time is given. URPL's pages did not offer a recent annual report; the only counts of trial applications found were older figures in third-party documents, which are not used. The pacjent.gov.pl page for the bowel programme answered scripts only at its newer address, published in 2022 and last modified on 14 October 2025, and its age range was read there, not from the underlying regulation. ABM's grant totals were not read. The Polish National Cancer Registry's own website lists reports by script, so its PDFs were found through its publications list. On 17 November 2026 the Ministry of Health's and the regulator's pages on gov.pl did not answer, so what this page takes from them (the summary of the 1 October 2026 reimbursement list and the description of the regulator's website) was not re-read; the list of quarterly editions was confirmed from the Internet Archive's copy of 24 September 2026.",
      links: [
        { label: "NFZ: dane o realizacji programów profilaktycznych", url: NFZ_SCREEN },
        { label: "URPL", url: "https://www.gov.pl/web/urpl" },
      ],
    },
  ],
  institutions: [
    "nio-warsaw", "nio-gliwice", "greater-poland-cancer-centre", "uck-gdansk", "institute-of-mother-and-child", "polish-mothers-memorial-hospital", "aidport",
    "krn-poland", "nfz", "aotmit", "urpl", "abm-poland", "ema",
  ],
  companies: ["ryvu-therapeutics", "captor-therapeutics", "mabion", "famicordtx", "intodna"],
  drugs: ["rvu120", "men1703"],
  trials: [
    "nct06191263", "nct06534437", "nct06243458", "nct05067530", "nct02072811", "nct07787429", "nct06940947", "nct00718549",
    "adaura", "alina", "nct07513376", "nct06623422", "nct05254743", "nct06966700", "nct06750094", "nct06952803", "nct07391657", "nct06627647",
    "nct06435429", "nct06644781",
  ],
  papers: [],
  people: [
    "piotr-rutkowski", "beata-jagielska", "michal-mikula", "andrzej-kawecki", "julian-malicki", "jakub-kraszewski", "iwona-maroszynska", "tomasz-maciejewski",
    "joanna-lorenc",
  ],
  how:
    "Every card was written from Polish official sources read in Polish: the Polish National Cancer Registry's bulletin on 2023, the consolidated texts of the reimbursement act, the healthcare benefits act, the National Oncology Network act and its July 2026 amendment, the Medical Fund act, the clinical trials act and the National Oncology Strategy act and resolution, all through the Sejm's ELI service, the Minister of Health's screening regulations, the NFZ's screening coverage spreadsheets for 1 November 2026, the Ministry's summary of the 1 October 2026 reimbursement list, and the pages of the assessment agency, the Medical Research Agency and the government patient portal. Each figure was checked against the raw text of the PDF, spreadsheet or page rather than a summary. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are the registry, the NFZ, the assessment agency, the regulator and the Medical Research Agency.",
  verify:
    "Registered cases undercount some cancers, as the registry itself says. The reimbursement list changes every quarter and drug programme criteria are precise: before relying on whether a medicine is paid for, check the current list and its programme annex and ask the treating hospital. Paper cancer cards can be issued only until the end of 2026, and the lung screening programme was due to take its first bookings in the second half of October 2026.",
  verifyLinks: [
    { label: "KRN: Nowotwory złośliwe w Polsce w 2023 roku (PDF)", url: KRN_2023 },
    { label: "Ministry of Health: reimbursement lists", url: LISTS },
    { label: "NFZ: screening programme data", url: NFZ_SCREEN },
    { label: "pacjent.gov.pl: screening programmes", url: "https://pacjent.gov.pl/programy-profilaktyczne" },
  ],
};
