import type { CountryDive } from "@/data/country-dive";

/**
 * Egypt deep dive: the hand-written cards for /countries/eg/. Sources were read raw on 4 November 2026, in Arabic where
 * the data is in Arabic: the Universal Health Insurance Authority's own posts (through its WordPress API) and its
 * Andersen Egypt English translation of Law 2 of 2018 (the Arabic copy the insurer publishes is a scan); the
 * Egyptian Drug Authority's own copies of Law 151 of 2019 and Law 214 of 2020 (scanned English translations, read by
 * OCR) and its 2026 registration and reliance guidelines (PDF text); the National Cancer Institute's Arabic home page;
 * WHO's own announcements (the EMRO hepatitis C page through an Internet Archive copy of 20 October 2026); the 57357
 * hospital's pages through Internet Archive copies, because its site blocks scripts; and three papers resolved
 * through Europe PMC and Crossref, read in full text or abstract. Where a figure could not be read it is under `gaps`.
 */
const NCRP_2014 = "https://doi.org/10.1155/2014/437971";
const NCRP_FULL = "https://europepmc.org/article/PMC/PMC4189936";
const LAW_2_AR = "https://uhia.gov.eg/wp-content/uploads/2024/02/قانون2-لسنة-2018.pdf";
const LAW_2_EN = "https://eg.andersen.com/wp-content/uploads/2026/07/Law-No.-2-of-2018.pdf";
const UHIA_JUNE_2026 = "https://uhia.gov.eg/?p=14154";
const UHIA_DEC_2025 = "https://uhia.gov.eg/?p=13216";
const UHIA_NOV_2025 = "https://uhia.gov.eg/?p=12892";
const UHIA_HE_2025 = "https://uhia.gov.eg/?p=13276";
const UHIA_GR = "https://uhia.gov.eg/?p=11853";
const UHIA_MINYA = "https://uhia.gov.eg/?p=14076";
const LAW_151 = "https://edaegypt.gov.eg/media/mvfjomwa/law-151-of-2019.pdf";
const LAW_214 = "https://edaegypt.gov.eg/media/zz0alwxy/law-214-of-2020_-to-cairo-legal_.pdf";
const EDA_RELIANCE_2026 = "https://www.edaegypt.gov.eg/media/r4rpiosu/reliance-english-version-final-2-_2-2026.pdf";
const EDA_RELIANCE_2022 = "https://www.edaegypt.gov.eg/media/p0uj2utf/reliance-english-version_1.pdf";
const EDA_343_2026 = "https://edaegypt.gov.eg/media/lvkl4sds/343-guideline-english-version-2026.pdf";
const WHO_ML3 = "https://www.who.int/news/item/20-12-2024-egypt-s-regulatory-system-reaches-who-maturity-level-3-in-medicines-regulation";
const EMRO_HCV = "https://web.archive.org/web/20261020235727/https://www.emro.who.int/media/news/egypt-becomes-the-first-country-to-achieve-who-validation-on-the-path-to-elimination-of-hepatitis-c.html";
const WHI_2026 = "https://doi.org/10.1186/s13690-026-02122-8";
const HCV_HCC_2018 = "https://doi.org/10.1136/bmjgh-2017-000572";
const STATE_EXPENSE_2025 = "https://almalnews.com/2094549/";
const NCI_CAIRO = "https://nci.cu.edu.eg";
const CCHE_OVERVIEW = "https://web.archive.org/web/20261020194904/https://www.57357.org/en/overview";
const CCHE_HISTORY = "https://web.archive.org/web/20260313172132/https://www.57357.org/en/history";

export const EG_DIVE: CountryDive = {
  iso2: "EG",
  iso3: "EGY",
  name: "Egypt",
  flag: "🇪🇬",
  asOf: "2026-11-04",
  title: "Cancer in Egypt",
  description:
    "Cancer in Egypt from Egyptian sources: the national registry's figures from three governorates, which put liver, breast and bladder cancer first; a universal health insurance law that reaches six of 27 governorates and charges people with cancer nothing at the point of care; treatment at state expense, granted case by case by ministry decision; one authority that buys medicines for every public hospital; the Egyptian Drug Authority and its reliance route; a clinical research law that limits foreign drugs to late-phase trials; and national programmes that tested over 60 million people for hepatitis C and invite every adult woman to a free breast risk assessment.",
  lede:
    "Egypt's own national cancer figures come from registries in three governorates counted in 2008 to 2011, which put liver cancer first, then breast and bladder. Since then Egypt has tested more than 60 million people for hepatitis C, the main cause of its liver cancer, and treated more than 4.1 million, by WHO's count; a 2018 universal health insurance law that exempts people with cancer from fees has reached six of the 27 governorates; and a presidential programme invites every woman from 18 to a free breast risk assessment.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Egypt is 137,390 new cancers and 80,512 deaths in 2024, an age-standardised incidence of 137.6 per 100,000 (world standard) that includes 1,452 non-melanoma skin cancers. IARC codes the incidence as subnational rates applied to the 2024 population, and the deaths as derived from those incidence estimates through modelled mortality-to-incidence ratios, not from counted deaths. Egypt's national registry programme measured 166.6 per 100,000 for 2008 to 2011, excluding non-melanoma skin cancer, in three governorates covering 20.9% of the population, and its own projection at those rates was 168,723 new cancers in 2025, about 23% more than IARC's 2024 figure. The largest difference is liver cancer: the registry measured an age-standardised rate of 43.6 per 100,000 in 2008 to 2011, IARC estimates 24.0 for 2024 (23,287 cases). The registry's figures predate the national hepatitis C treatment campaign, hold 2008 to 2011 rates constant and leave out Greater Cairo; IARC's file does not say which registries it used. GLOBOCAN's breast cancer rate is computed for women only, so it cannot be compared directly with the registry's both-sexes rate below.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Egypt",
      aside: { label: "Ibrahim et al., Cancer incidence in Egypt: national registry programme (2014)", url: NCRP_2014 },
      cards: [
        {
          id: "shape",
          title: "Liver, breast and bladder: the three cancers that made up nearly half",
          plain:
            "In Egypt's national registry data, liver cancer was the commonest cancer, nearly one in four of all cancers, followed by breast cancer and bladder cancer; together they were about 46% of cancers. In men liver cancer was one in three cancers and bladder one in ten; in women breast cancer was one in three and liver cancer about one in seven.",
          detail:
            "The National Cancer Registry Program's report for 2008 to 2011 gives an age-standardised incidence (world standard) of 166.6 per 100,000 for both sexes, 175.9 in men and 157.0 in women, excluding non-melanoma skin cancer. Liver cancer was 23.81% of cancers with a rate of 43.6, breast 15.41% (24.3), bladder 6.94% (13.5), brain and nervous system 5.29% (8.5), non-Hodgkin lymphoma 4.64% (7.5) and lung 4.22% (7.5). In men, liver was 33.63% (61.8) and bladder 10.71% (21.1), then lung, non-Hodgkin lymphoma, brain and prostate (9.3); in women breast was 32.04% (48.8) and liver 13.54% (24.4), then brain, ovary, non-Hodgkin lymphoma and thyroid. Liver cancer was most common in Lower Egypt, where its rate was 56.8 per 100,000 and its share 29.6%, and least common in Upper Egypt (13.1 and 8.2%). Applying the same age-specific rates to Egypt's growing and ageing population gives 114,985 new cancers in 2013, 144,255 in 2020, 168,723 in 2025 and 331,169 in 2050, which the authors attribute increasingly to ageing.",
          links: [
            { label: "Ibrahim et al., J Cancer Epidemiol 2014 (DOI)", url: NCRP_2014 },
            { label: "Full text, tables 5, 6 and 10 (Europe PMC)", url: NCRP_FULL },
          ],
        },
        {
          id: "three-governorates",
          title: "One national programme, three governorate registries",
          plain:
            "Egypt does not count every cancer in the country. Its national registry programme, set up in 2008, built a network of population registries; its national report used three of them, in governorates chosen to represent the north, middle and south, and estimated the national figures from them. The only national report OnCo could find covers 2008 to 2011.",
          detail:
            "The National Cancer Registry Program of Egypt, established in 2008, stratified the country into Lower, Middle and Upper Egypt and set up a population-based registry in one governorate of each: Damietta in the Nile delta (registration years 2009 to 2011), Minya in Middle Egypt (2009) and Aswan in Upper Egypt (2008), each located in the Ministry of Health cancer centre of the governorate. Together they covered 20.9% of the population; Greater Cairo and Alexandria were not included, which the authors put down to the difficulty of collecting data on a population that moves in and out daily. The paper's map shows five peripheral registries in the national network; the report used these three. Doctors abstracted records from the cancer centres and from national tertiary centres such as the National Cancer Institute of Cairo University, the paediatric oncology hospital in Cairo and the South Egypt Cancer Institute in Assiut, and from the Health Insurance Organization, the government-subsidised treatment programme and death records; the national identity number was used to remove duplicates, and death-certificate-only cases were almost 8%. Before the programme, the authors write, the only published incidence rates came from a single delta governorate, Gharbiah, whose last internal report was for 2002. They caution that their rates rest on a short initial phase of registration and a model that applies regional rates to the whole country.",
          links: [
            { label: "Ibrahim et al., J Cancer Epidemiol 2014, methods (Europe PMC)", url: NCRP_FULL },
            { label: "Abdul-Sater et al., cancer registration in the Middle East, North Africa and Turkey (JCO Glob Oncol 2021)", url: "https://doi.org/10.1200/GO.21.00065" },
          ],
        },
        {
          id: "younger-breast",
          title: "Breast cancer in Egypt is diagnosed younger",
          plain:
            "Breast cancer in Egypt is found in younger women than in the United States: the national programme's evaluation cites an average age at diagnosis of about 50 and one patient in five under 40. That is why Egypt's breast programme starts at 18 with a questionnaire and a hand examination rather than with mammograms for older women.",
          detail:
            "The 2026 economic evaluation of the Presidential Initiative for Women's Health, written by Ministry of Health and Population staff with Egyptian oncologists, states in its background that Egyptian patients have a mean age at diagnosis of approximately 50.4 years against a median of 63 in the US SEER database, and that 20% of Egyptian patients were younger than 40 against 5% in SEER, citing earlier Egyptian studies. It notes that most Egyptian patients present with locally advanced or metastatic disease, with an average delay of about seven months between symptoms and treatment, 61% of it attributed to patient-related factors. The programme's own data, set out under screening below, show the stage at which cancers were found after five years of the initiative. These background figures are cited from other studies in the paper and were not re-derived by OnCo.",
          links: [
            { label: "Abdelghaffar et al., economic evaluation of the presidential initiative (Arch Public Health 2026)", url: WHI_2026 },
            { label: "Full text (Europe PMC)", url: "https://europepmc.org/article/PMC/PMC13695269" },
          ],
        },
      ],
      tables: [
        {
          id: "ncrp-2008-2011",
          title: "The commonest cancers in Egypt's national registry data, 2008 to 2011",
          caption: "Share of all cancers and age-standardised incidence per 100,000 (world standard), both sexes, calculated national rates from the three governorate registries.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "share", label: "Share of all cancers (%)", numeric: true },
            { key: "asr", label: "Age-standardised rate", numeric: true },
          ],
          rows: [
            { site: "All cancers except non-melanoma skin", share: 100, asr: 166.6 },
            { site: "Liver", share: 23.81, asr: 43.6 },
            { site: "Breast (both sexes)", share: 15.41, asr: 24.3 },
            { site: "Bladder", share: 6.94, asr: 13.5 },
            { site: "Brain and nervous system", share: 5.29, asr: 8.5 },
            { site: "Non-Hodgkin lymphoma", share: 4.64, asr: 7.5 },
            { site: "Trachea, bronchus and lung", share: 4.22, asr: 7.5 },
          ],
          note: "Rates from Damietta, Minya and Aswan, applied to Egypt's population by the authors' model; Greater Cairo is not among the registries. The figures describe 2008 to 2011, before the national hepatitis C campaign.",
          sources: [{ label: "Ibrahim et al., J Cancer Epidemiol 2014, tables 2 and 5", url: NCRP_FULL }],
        },
        {
          id: "ncrp-projection",
          title: "The registry programme's projection of new cancers, 2013 to 2050",
          caption: "Number of new cancers if 2008 to 2011 age-specific rates continued, applied to Egypt's projected population.",
          columns: [
            { key: "year", label: "Year" },
            { key: "pop", label: "Projected population", numeric: true },
            { key: "cases", label: "Projected new cancers", numeric: true },
          ],
          rows: [
            { year: "2013", pop: 85294388, cases: 114985 },
            { year: "2015", pop: 88487396, cases: 122783 },
            { year: "2020", pop: 96260017, cases: 144255 },
            { year: "2025", pop: 103742157, cases: 168723 },
            { year: "2050", pop: 137872522, cases: 331169 },
          ],
          note: "A projection, not a count: it holds rates constant and attributes the rise to population growth and ageing, with ageing's share reaching 67.2% by 2050. IARC's 2024 estimate of 137,390 is below the 2025 projection.",
          sources: [{ label: "Ibrahim et al., J Cancer Epidemiol 2014, table 10", url: NCRP_FULL }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: three systems side by side, and one buyer",
      aside: { label: "Law 2 of 2018, Universal Health Insurance (Arabic text, PDF)", url: LAW_2_AR },
      cards: [
        {
          id: "three-routes",
          title: "Old health insurance, treatment at state expense, and a new universal scheme",
          plain:
            "How an Egyptian with cancer is paid for depends on where they live and work. A 1964 decree set up the Health Insurance Organization for government and public-sector employees, and later laws set up health insurance for students, young children, female breadwinners and farmers. Treatment at the state's expense is granted by decision, through the Health Ministry's specialised medical councils; the sources read for this page do not set out who qualifies. In six governorates a new universal health insurance system now covers whole families.",
          detail:
            "The General Authority for Health Insurance, the Health Insurance Organization, dates from Presidential Decree 1209 of 1964; Law 2 of 2018 lists that decree, and the separate insurance laws for students, children below school age, female breadwinners and farmers, among those that cease to apply in each governorate as the new system arrives. The government-subsidised route, al-ilaj ala nafaqat al-dawla, is decided by the Ministry of Health and Population's specialised medical councils: the ministry's spokesman reported 4,022,923 treatment decisions in 2025, costing 30,837,413,000 Egyptian pounds, for 2,472,064 people, across specialties that include oncology, with 7,010 patients assessed by video link; OnCo read that statement as reported by Al Mal News, because the ministry's website did not answer. The national registry programme counted patients in both the insurance organisation's and the subsidised programme's records, and its authors write that with the rising cost of cancer treatment most patients would seek government financial support. The breakdown of state-expense decisions by cancer was not published in the statement.",
          links: [
            { label: "Law 2 of 2018, English translation, promulgation articles (Andersen Egypt, PDF)", url: LAW_2_EN },
            { label: "Al Mal News: Ministry of Health statement on treatment at state expense in 2025 (Arabic)", url: STATE_EXPENSE_2025 },
            { label: "Ibrahim et al., data sources of the registry (Europe PMC)", url: NCRP_FULL },
          ],
        },
        {
          id: "uhi-law",
          title: "Universal health insurance: no fees for people with cancer, rolled out governorate by governorate",
          plain:
            "Egypt's 2018 universal health insurance law will cover every citizen, with the family as the unit, and the state pays for those who cannot. Patients normally pay a share when they use services, but the law exempts people with chronic diseases and tumours from those charges, under rules it leaves to a Prime Minister's decision. It is being brought in one group of governorates at a time, and by mid-2026 covered about 5.2 million people in six.",
          detail:
            "Law 2 of 2018 makes the system mandatory and based on social solidarity, separates financing from provision (article 2: the Universal Health Insurance Authority may not provide treatment), and creates a separate healthcare authority to run facilities and an accreditation authority. Article 40 lists co-payments at the point of service, set in Table 3: 10% of the price of medicines up to 1,000 Egyptian pounds, rising to 15% in the tenth year, 10% of imaging and of laboratory tests up to 750 pounds a case, and 5% of an inpatient stay up to 300 pounds, each written as not applying to chronic diseases and tumours, and it states that persons with chronic diseases and tumours are exempted from paying them, in accordance with a decision of the Prime Minister regulating the exemption; in December 2025 the authority said such patients are exempted under Prime Minister's decree 2273 of 2021. A note to the law's tables says the fixed amounts are to be increased by 7% each year; the caps quoted here are the amounts as written in the law. The insured's benefits include treatment abroad when treatment is impossible in Egypt and available abroad, on a committee's report. In November 2025 the authority's executive director said the system covered 3,861 medicines, exempted cancer patients from any fees, and that its biggest challenge was making essential medicines, especially cancer medicines, available at affordable prices; she also said it had cut out-of-pocket spending on health from 62% in 2018 to 53.8% in 2022, a national figure the authority did not attribute to a source. In May 2025 the authority contracted Gustave Roussy International Egypt to treat its beneficiaries with cancer from June 2025.",
          links: [
            { label: "Law 2 of 2018, Arabic text (UHIA, PDF)", url: LAW_2_AR },
            { label: "Law 2 of 2018, English translation, article 40 and table 3 (Andersen Egypt, PDF)", url: LAW_2_EN },
            { label: "UHIA: 3,861 medicines and cancer patients exempt from fees (13 November 2025, Arabic)", url: UHIA_NOV_2025 },
            { label: "UHIA: exemption under Prime Minister's decree 2273 of 2021 (29 December 2025, Arabic)", url: UHIA_DEC_2025 },
            { label: "UHIA: contract with Gustave Roussy International Egypt (29 May 2025, Arabic)", url: UHIA_GR },
          ],
        },
        {
          id: "procurement-and-assessment",
          title: "One authority buys for every public hospital; the insurer assesses new medicines",
          plain:
            "Since a 2019 law, one state authority buys the medicines and medical devices for every government hospital, ministry and public university hospital in Egypt. The universal insurer has its own health economics unit, which assesses new medicines before they are added to its list; Egypt has no separate national health technology assessment agency that OnCo could find.",
          detail:
            "Article 3 of the law annexed to Law 151 of 2019 gives the Egyptian Authority for Unified Procurement, Medical Supply and Technology Management the exclusive task of procurement of pharmaceuticals and human medical appliances for all government bodies and authorities, for a fee of no more than 7% of the net value bought; the law defines those bodies as the Ministry of Health and Population and its hospitals, government universities and their hospitals, other ministries' hospitals, and government educational and research institutions. The Universal Health Insurance Authority's health economics unit reported that in 2025 it studied six new medicines for clinical and economic value, made three price comparisons of new medicines against listed equivalents, completed three rapid economic studies for its board, and reviewed its protocols for biological and cancer medicines; it added 59 medicines in 2025 for a list of 4,796. A 2026 evaluation of the breast programme used a cost-effectiveness threshold framework that its authors describe as developed for Egypt by national consensus, linking the threshold to gross domestic product per person: two times GDP per person, 164,588 pounds per quality-adjusted life year on 2022 figures, for the gain in that study.",
          links: [
            { label: "Law 151 of 2019, article 3 (EDA copy, English translation, PDF)", url: LAW_151 },
            { label: "UHIA: health economics unit in 2025 (7 January 2026, Arabic)", url: UHIA_HE_2025 },
            { label: "Abdelghaffar et al., threshold framework used (Arch Public Health 2026)", url: WHI_2026 },
          ],
        },
      ],
      tables: [
        {
          id: "uhi-phases",
          title: "Universal health insurance: the law's six phases and where the system is",
          caption: "Governorates in each phase as listed in Table 5 of Law 2 of 2018, and the authority's own statement of June 2026 on where the system applies.",
          columns: [
            { key: "phase", label: "Phase in the law" },
            { key: "law", label: "Governorates named in the law" },
            { key: "now", label: "Status, authority statement of 16 June 2026" },
          ],
          rows: [
            { phase: "First", law: "Port Said, Suez, Ismailia, South Sinai, North Sinai", now: "Applied in Port Said, Ismailia, South Sinai and Suez; North Sinai named for the second phase" },
            { phase: "Second", law: "Aswan, Luxor, Qena, Matrouh, Red Sea", now: "Applied in Aswan and Luxor; Matrouh named for the second phase" },
            { phase: "Third", law: "Alexandria, Beheira, Damietta, Sohag, Kafr El Sheikh", now: "Damietta and Kafr El Sheikh named for the second phase" },
            { phase: "Fourth", law: "Assiut, New Valley, Fayoum, Minya, Beni Suef", now: "Minya named first of the second phase; preparations visited in June 2026" },
            { phase: "Fifth", law: "Dakahlia, Sharqia, Gharbia, Menoufia", now: "Not yet named" },
            { phase: "Sixth", law: "Cairo, Giza, Qalyubia", now: "Not yet named" },
          ],
          note: "The rollout has not followed the law's order. The authority reported 5,231,341 registered beneficiaries in December 2025, 81.71% of the population of the six governorates, and more than 5.2 million with over 580 contracted providers in June 2026.",
          sources: [
            { label: "Law 2 of 2018, table 5 (Andersen Egypt translation, PDF)", url: LAW_2_EN },
            { label: "UHIA: phase two governorates (16 June 2026, Arabic)", url: UHIA_JUNE_2026 },
            { label: "UHIA: registration rate and beneficiaries (29 December 2025, Arabic)", url: UHIA_DEC_2025 },
            { label: "UHIA: Minya first governorate of phase two (7 June 2026, Arabic)", url: UHIA_MINYA },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Egyptian Drug Authority",
      aside: { label: "EDA: reliance registration guideline, version 2.0 (2026, PDF)", url: EDA_RELIANCE_2026 },
      cards: [
        {
          id: "eda",
          title: "A regulator created in 2019, rated maturity level 3 by WHO",
          plain:
            "The Egyptian Drug Authority was created by a 2019 law to replace the older drug control and biologicals bodies. It registers medicines, prices them with the registration file, and approves clinical trials. WHO rated it at maturity level 3, a stable and well-functioning system, for vaccines in 2022 and for medicines in 2024.",
          detail:
            "Law 151 of 2019, published in the Official Gazette on 25 August 2019, established the drug authority and the unified procurement authority together; article 2 of the promulgating law states that the drug authority replaces the National Organization for Drug Control and Research (created in 1976), the National Organization for Research and Control of Biologicals (1995) and other bodies with jurisdiction over medical products. WHO announced on 20 December 2024 that Egypt had reached maturity level 3 for medicines regulation after a benchmarking finalised in November 2024, building on maturity level 3 for vaccines in March 2022, and describes Egypt as the first country in Africa to reach that level for both. WHO's scale runs to level 4, and it notes that authorities at level 3 or 4 may qualify as WHO-listed authorities after further assessment. The authority's registration guideline sets pricing within the registration process: for biological products, pricing of fast-track and reliance products is to be determined within 30 working days of a complete pricing file, and 60 for normal-track products.",
          links: [
            { label: "Law 151 of 2019 (EDA copy, English translation, PDF)", url: LAW_151 },
            { label: "WHO: Egypt reaches maturity level 3 in medicines regulation (20 December 2024)", url: WHO_ML3 },
            { label: "EDA: guideline for biological products, version 5 (2026, PDF)", url: EDA_343_2026 },
          ],
        },
        {
          id: "reliance",
          title: "Reliance on European and US approval: 20 or 40 working days on paper",
          plain:
            "A biological medicine already approved by the European Medicines Agency or the US Food and Drug Administration can be registered in Egypt through a shorter reliance route, if it is identical to the product approved there. The authority's own guideline sets 20 working days when the company also hands over the reference regulator's full assessment report, and 40 when it does not, against 120 for the normal route.",
          detail:
            "The authority's guideline on registration of biological products through reliance pathways (EDREX.GL.Bioinn.002), version 2.0, issued 29 June 2026 and effective 30 June 2026, sets level 1 at 20 working days, for products approved by the EMA and/or FDA where the applicant submits the unredacted assessment report, post-approval documents and questions and answers with the reference authority, and level 2 at 40 working days with the complete common technical document only. The product must be identical in formulation, manufacturing sites and indications, must not have been rejected or withdrawn by any regulator for safety or efficacy, and must be registered and marketed in the reference country; the guideline states that reliance does not mean dependence and that approval by the reference authority does not oblige the EDA to approve. Version 1.0 of 2022 had set 30 and 60 days. The biological products guideline (version 5, effective 21 June 2026) sets totals of 120 working days for the normal track and 90 for the fast track, which covers orphan medicines, products in shortage and those for serious epidemic diseases without alternatives. These are targets; the authority's own figures for how long cancer medicines actually take were not found and are named under gaps. Small-molecule medicines follow a separate guideline OnCo did not read.",
          links: [
            { label: "EDA: reliance pathways for biological products, version 2.0 (2026, PDF)", url: EDA_RELIANCE_2026 },
            { label: "EDA: reliance pathways, version 1.0 (2022, PDF)", url: EDA_RELIANCE_2022 },
            { label: "EDA: guideline for biological products, version 5 (2026, PDF)", url: EDA_343_2026 },
          ],
        },
        {
          id: "research-law",
          title: "A 2020 law on clinical research: foreign medicines enter Egyptian trials at phase 3",
          plain:
            "Egypt's clinical research law of 2020 requires both the drug authority and a national ethics council to approve trials of new medicines. A medicine developed abroad may normally be tested in Egypt only in phase 3 and 4, after its earlier results have been reviewed, except for endemic diseases absent from its country of origin and rare diseases. International studies also need the opinion of the General Intelligence Agency.",
          detail:
            "Law 214 of 2020, published in the Official Gazette on 23 December 2020, regulates clinical medical research on humans in Egypt. It creates the Supreme Council for Review of the Ethics of Clinical Medical Research, on which the drug authority is represented, and requires institutional review boards to be registered with it. Approval of both the drug authority and the Supreme Council is required for research using new medicinal or biological compounds, new indications, or devices never used in humans and not approved by the international bodies named in the executive regulations. The law requires the opinion of the General Intelligence Agency where research is conducted with foreign entities and for jointly conducted international studies, and states that if no response is received within 60 days of the notice, the application is deemed accepted. For medical interventions originating outside Egypt, the third and fourth phases are allowed after the authority and the Supreme Council review the results of the first and second phases conducted in the country of origin; for endemic diseases that do not exist in the country of origin and for rare diseases, research may begin in Egypt from the second phase with the Supreme Council's approval. OnCo read the English translation the drug authority publishes, which is scanned.",
          links: [
            { label: "Law 214 of 2020 regulating clinical medical research (EDA copy, English translation, PDF)", url: LAW_214 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and early detection: the presidential health initiatives",
      aside: { label: "WHO EMRO: Egypt and the path to elimination of hepatitis C (archived copy)", url: EMRO_HCV },
      cards: [
        {
          id: "womens-health-initiative",
          title: "A free breast risk assessment for every woman from 18, with treatment paid for",
          plain:
            "Since July 2019 Egypt's Presidential Initiative for Women's Health has invited every woman aged 18 and over to a free risk questionnaire and, if at risk, a breast examination at a primary care unit; mammography is used to investigate a finding, not to screen. Women found to have breast cancer are treated free. In its first five years it reached about 23.8 million women and confirmed 30,225 breast cancers.",
          detail:
            "The programme's 2026 economic evaluation, using national programme data from July 2019 to September 2024, reports 53,453,745 recorded screening and service encounters among about 23.8 million unique women; services are delivered free through primary care units, referral hospitals and mobile units, and confirmed cases receive free treatment through the national health insurance system or state-funded programmes. Of 58,494 women referred to pathology, 44,149 were examined and 14,345 (24.5%) did not attend; 30,225 cancers were confirmed. Of those, 8.8% were stage I, 52.5% stage II, 26.4% stage III and 12.3% stage IV, so 61.3% were found at stage I or II, against 41.6% in Ministry of Health records of cancers found outside the campaign. The authors warn that the wider figure of about 70 million services reported by October 2025 should not be read as 70 million women screened. The evaluation estimated that the initiative gains quality-adjusted life years at lower societal cost than opportunistic detection; it is a model using survival inputs from other settings, its publication was funded by Roche Egypt, and Egyptian long-term outcome data are not yet available.",
          links: [
            { label: "Abdelghaffar et al., economic evaluation of the presidential initiative (Arch Public Health 2026)", url: WHI_2026 },
            { label: "Full text, table 1 (Europe PMC)", url: "https://europepmc.org/article/PMC/PMC13695269" },
          ],
        },
        {
          id: "hepatitis-c-screening",
          title: "Hepatitis C: more than 60 million people tested and over 4 million treated",
          plain:
            "The 100 Million Healthy Lives campaign offered free hepatitis C testing and treatment across Egypt. WHO reports that it tested more than 60 million people and treated more than 4.1 million, with tablets made in Egypt that cured 99% of those treated. Chronic hepatitis C is a cause of liver cancer, the commonest cancer in Egypt's registry data.",
          detail:
            "WHO's Eastern Mediterranean office announced on 9 October 2023 that Egypt had diagnosed 87% of people living with hepatitis C and treated 93% of those diagnosed, above WHO's gold tier targets of 80% and 70%, and that prevalence had fallen from 10% to 0.38% in just over a decade. It records that Egypt set up the National Committee for Control of Viral Hepatitis in 2006, that a countrywide campaign offering free testing and treatment began in 2014 and was reinforced in 2018 by the President, and that the 100 million seha campaign tested over 60 million people and treated more than 4.1 million, with locally manufactured direct-acting antivirals giving a 99% cure rate. OnCo first read WHO's page through an Internet Archive copy of 20 October 2026, because the EMRO site returned a server error; the live page answered on 17 November 2026 and gives the same figures.",
          links: [
            { label: "WHO EMRO: Egypt becomes the first country to achieve WHO validation on the path to elimination of hepatitis C (archived copy, 20 October 2026)", url: EMRO_HCV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Egypt does",
      title: "What Egypt does that others do not",
      cards: [
        {
          id: "hcv-as-cancer-prevention",
          title: "Preventing liver cancer by curing a virus at national scale",
          plain:
            "Egypt is the first country WHO validated as on the path to eliminating hepatitis C, and a model of its treatment programme estimated that curing the infection with modern tablets would prevent about 956,000 liver cancers between 2015 and 2050. Liver cancer was nearly a quarter of all cancers in the registry's 2008 to 2011 data.",
          detail:
            "A 2018 Markov model in BMJ Global Health simulated Egypt's hepatitis C-related liver cancer epidemic from 2009 to 2050 with and without the sofosbuvir-based national treatment programme introduced in 2015, using parameters from published studies and expert opinion. Under the new programme the number of hepatitis C-related liver cancer cases was projected to peak earlier and lower, at about 29,000 in 2025, with incidence peaking at about 14 per 100,000 in 2022, and about 956,000 cases were averted between 2015 and 2050. That is a forecast, not a count: OnCo found no national incidence from Egypt's registry for any year after 2011, so the fall could not be measured here against the registry's own baseline. IARC's 2024 estimate of 23,287 liver cancers, an age-standardised rate of 24.0 against the registry's 43.6 in 2008 to 2011, is a modelled figure and does not test the forecast either. WHO's validation in October 2023 rests on testing and treatment coverage, not on cancer outcomes.",
          links: [
            { label: "Ma et al., forecasted impacts of the sofosbuvir-based programme on liver cancer (BMJ Glob Health 2018)", url: HCV_HCC_2018 },
            { label: "WHO EMRO: Egypt and hepatitis C (archived copy)", url: EMRO_HCV },
          ],
        },
        {
          id: "free-cancer-hospitals",
          title: "Cancer hospitals that treat without charge: a university institute and a hospital built on donations",
          plain:
            "Two of Egypt's main cancer hospitals treat patients free. The National Cancer Institute of Cairo University treats people of all ages without charge and says it receives a quarter of Egypt's new cancer patients each year. Children's Cancer Hospital Egypt 57357, opened in 2007, says it was built entirely by donations, and it treats children free.",
          detail:
            "The National Cancer Institute's Arabic home page describes it as a non-profit teaching, training and research institution of Cairo University, offering free treatment to all groups and ages, receiving 25% of all new cases in Egypt each year, with about 40 specialist clinics, more than 1,000 patients a day, more than 4,000 major operations a year and more than 63,000 radiotherapy sessions a year; it is raising donations for a new hospital in Sheikh Zayed. Children's Cancer Hospital Egypt 57357 describes itself as established in 2007, inspired by St. Jude in Memphis, to give every child with cancer care free of charge and without discrimination, with 300 inpatient beds and 2,559 staff including 423 physicians; it states it is the largest paediatric oncology hospital in the world by capacity. Its history traces the idea to a 1995 Ramadan advertising campaign for donations to the National Cancer Institute, proposed by the head of the institute's children's department, which raised 28.5 million pounds in the month, against donations of no more than one million a year before. OnCo read 57357's pages through Internet Archive copies, because its site blocks scripts.",
          links: [
            { label: "National Cancer Institute, Cairo University (Arabic home page)", url: NCI_CAIRO },
            { label: "Children's Cancer Hospital Egypt 57357: overview (archived copy, 20 October 2026)", url: CCHE_OVERVIEW },
            { label: "Children's Cancer Hospital Egypt 57357: history (archived copy, 13 March 2026)", url: CCHE_HISTORY },
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
          id: "trials-in-graph",
          title: "Global phase 3 trials and a stream of small university trials",
          plain:
            "OnCo holds 24 cancer trials with a site in Egypt. Thirteen are international trials run by drug companies and cooperative groups, such as the ALEX and ALINA lung cancer trials. Eleven are single-country trials run by Egyptian universities, many testing cheap existing medicines against cancer or the side effects of chemotherapy.",
          detail:
            "Of the 24 trials in OnCo's ClinicalTrials.gov data that list Egypt, the industry and cooperative-group trials include Roche's ALEX, ALINA and lidERA and its giredestrant trial in HER2-positive breast cancer, AstraZeneca's EMERALD-3 and adjuvant durvalumab trial in liver cancer, Novartis's BOLERO-2, Day One's FIREFLY-2 in children's low-grade glioma, Boehringer Ingelheim's LUME-Meso, and the EORTC 22033, CLOCC, PETACC-3 and IBCSG triptorelin trials. The university trials are run in Egypt alone: Tanta University registered trials of sulfasalazine in metastatic colorectal cancer (whose status ClinicalTrials.gov listed as unknown in October 2026), ketotifen against oxaliplatin nerve damage and memantine with rosuvastatin for neuroprotection; Ain Shams University alpha-lipoic acid against mucositis and short-course radiotherapy in rectal cancer; Menoufia University FOLFIRINOX before chemoradiotherapy in rectal cancer; Minia University four pancreatic surgery trials; and an investigator-sponsored trial tests mebendazole after surgery for colon cancer. Most of the university trials are small and still recruiting, and none of them has reported results in OnCo's records.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies in Egypt", url: "https://clinicaltrials.gov/search?cond=cancer&locStr=Egypt&country=Egypt" },
            { label: "ClinicalTrials.gov NCT06134388: sulfasalazine in metastatic colorectal cancer", url: "https://clinicaltrials.gov/study/NCT06134388" },
          ],
        },
        {
          id: "output",
          title: "About 900 oncology papers a year and over 17,000 registered studies",
          plain:
            "Researchers in Egypt contributed to between 825 and 972 oncology papers a year from 2021 to 2025 in OpenAlex. In September 2026 ClinicalTrials.gov listed 17,478 studies of all conditions with a site in Egypt, a large number for the size of its research output; many of the Egyptian cancer trials OnCo holds are small single-university studies.",
          detail:
            "OnCo's OpenAlex extract, built on 8 September 2026, counts oncology works with at least one author in Egypt (whole counting) as 825 in 2021, 853 in 2022, 863 in 2023, 972 in 2024 and 893 in 2025, 4,406 in total, of which 2,958 are open access. The same file records 17,478 ClinicalTrials.gov studies of any condition with a site in Egypt, against 28,841 for the United Kingdom, whose oncology output in OpenAlex is about six times larger. The 11 single-country university trials in OnCo's cancer data show the kind of study involved, though OnCo has not measured what share of the 17,478 they represent. Academic cancer centres include the National Cancer Institute of Cairo University and the South Egypt Cancer Institute of Assiut University, whose staff wrote the national registry report, and the 57357 hospital. OnCo did not read Egyptian research funders' budgets for this page; they are named under gaps.",
          links: [
            { label: "OpenAlex: oncology works with an author in Egypt", url: "https://openalex.org/works?filter=primary_topic.subfield.id:2730,authorships.countries:EG" },
            { label: "ClinicalTrials.gov: all studies in Egypt", url: "https://clinicaltrials.gov/search?country=Egypt" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-recent-registry",
      title: "No national cancer incidence found for any year after 2011",
      plain:
        "OnCo could not find a national incidence report from Egypt's registry programme for any year after 2011. The 2014 report gives a registry website, cancerregistry.gov.eg, which did not answer on 17 November 2026. The figures on this page are from 2008 to 2011, before the hepatitis C campaign, so they may overstate liver cancer today.",
      detail:
        "Searches of Europe PMC for Egyptian registry and incidence papers from 2016 to 2026 returned regional and hospital series (Alexandria, the Nile delta, rural uterine cancer) but no new national report. The Ministry of Health and Population's website, mohp.gov.eg, did not answer on 4 November 2026, so any registry material it holds was not read. A 2021 survey of cancer registries in the region lists a respondent for the Egypt National Population-Based Cancer Registry and names Egypt among the 19 countries that sent data, but its text otherwise mentions Egypt's registry only to say it did not answer one question, and its data supplement, which holds the answers by registry, was not read. Egypt's own count of cancer deaths by site from death registration was not found either; IARC models Egypt's deaths from incidence.",
      links: [{ label: "Ibrahim et al., J Cancer Epidemiol 2014", url: NCRP_2014 }, { label: "Abdul-Sater et al., JCO Glob Oncol 2021", url: "https://doi.org/10.1200/GO.21.00065" }],
    },
    {
      id: "approval-times",
      title: "No published figure for how long cancer medicines actually take to approve or fund",
      plain:
        "The drug authority publishes target timelines for registration and reliance, but OnCo did not find its own figures for how long cancer medicines actually took, or how long after approval a medicine reaches the universal insurer's list or state-expense decisions.",
      detail:
        "The working-day targets on this page come from the authority's guidelines for biological products. Its site has a section of statistics and public assessment reports, which was not surveyed medicine by medicine for this page. The Universal Health Insurance Authority reports how many medicines it lists and studied, but not the time from registration to listing. The ministry's statement on treatment at state expense gives totals for 2025 without a breakdown for cancer.",
      links: [{ label: "EDA: reliance pathways for biological products (2026, PDF)", url: EDA_RELIANCE_2026 }, { label: "UHIA: health economics unit in 2025 (Arabic)", url: UHIA_HE_2025 }],
    },
    {
      id: "other-screening",
      title: "Cervical, bowel and other cancer screening: no national programme found",
      plain:
        "OnCo found published national programmes for breast cancer and hepatitis C in Egypt, but no published national programme for cervical or bowel cancer screening. That is a finding about what we could read, not proof that none exists.",
      detail:
        "The sources read for this page, the ministry's and the presidential initiatives' published evaluations and WHO's announcements, describe breast early detection and hepatitis C testing. The 100 Million Healthy Lives website and the Ministry of Health's site were not read (the ministry's did not answer), and the State Information Service page the breast evaluation cites for its October 2025 figure was not opened. Coverage of liver cancer surveillance among people cured of hepatitis C was also not found.",
      links: [{ label: "Abdelghaffar et al., Arch Public Health 2026", url: WHI_2026 }],
    },
    {
      id: "unreachable",
      title: "Sources that could not be reached on 4 November 2026",
      plain:
        "Several official sites did not answer or refused our scripted reader: the Ministry of Health and Population, the Unified Procurement Authority and the 57357 hospital. Their figures on this page come from laws, other official bodies or archived copies, and what they alone hold is not here.",
      detail:
        "mohp.gov.eg did not answer; upa.gov.eg returned HTTP 403, so the procurement authority's tenders and cancer medicine lists are not described; 57357.org returned a Cloudflare block, so its pages were read from Internet Archive copies dated 13 March and 20 October 2026. WHO EMRO's page returned a server error then and was read from the archive; it answered on 17 November 2026 with the same figures. The ministry's site still did not answer that day, and the procurement authority's and the 57357 hospital's sites still returned HTTP 403. The Law 2 figures and article numbers were read from the Andersen Egypt English translation, a law firm's translation, because the Arabic text the insurer publishes is a scanned file without a text layer that OnCo could not read by script; the Law 151 and Law 214 translations the drug authority publishes are scans read by OCR. The national budget of the Academy of Scientific Research and Technology and other research funders was not looked for. The Health Insurance Organization's current membership and its cancer spending were not found.",
      links: [{ label: "Children's Cancer Hospital Egypt 57357 (archived copy)", url: CCHE_OVERVIEW }, { label: "Law 151 of 2019 (EDA copy, PDF)", url: LAW_151 }],
    },
  ],
  institutions: [
    "egypt-national-cancer-registry-program", "egyptian-drug-authority", "egypt-unified-procurement-authority", "egypt-universal-health-insurance-authority", "nci-cairo", "cche-57357",
  ],
  companies: ["roche-genentech", "astrazeneca", "novartis", "boehringer-ingelheim", "day-one-biopharmaceuticals", "etop-ibcsg"],
  drugs: [],
  trials: [
    "alex", "alina", "lidera", "nct05296798", "emerald-3", "nct03847428", "bolero-2", "nct05566795", "lume-meso", "eortc-22033", "clocc", "petacc-3", "nct00066703",
    "nct06134388", "nct05624138", "nct07504198", "nct07736495", "nct07095439", "nct06812728", "nct07081360", "nct07230509", "nct06756074", "nct07155525", "nct03925662",
  ],
  papers: ["paper-egypt-ncrp-incidence-2014", "paper-egypt-hcv-hcc-forecast-2018", "paper-egypt-womens-health-initiative-economics-2026"],
  people: ["sherif-abouel-naga", "mohamed-abdel-moaty-samra"],
  how:
    "Every card was written from Egyptian official sources or peer-reviewed papers, read raw rather than through a summary: the Universal Health Insurance Authority's Arabic posts, with the Andersen Egypt translation of Law 2 of 2018 for its articles and tables; the Egyptian Drug Authority's copies of Law 151 of 2019 and Law 214 of 2020 and its 2026 guidelines; the National Cancer Institute's Arabic home page; WHO's announcements; the 57357 hospital's pages through the Internet Archive; and the national registry's 2014 report, the 2018 hepatitis C model and the 2026 breast programme evaluation, each resolved through Europe PMC and Crossref. The ministry's figures on treatment at state expense were read as reported by Al Mal News. The new records for this page are the registry programme, the drug authority, the procurement authority, the universal insurer and the three papers.",
  verify:
    "Registry figures are for 2008 to 2011 and the projections hold those rates fixed. Insurance coverage changes as each governorate joins the universal system, so check with the Universal Health Insurance Authority (its line is 15344) whether it applies where a patient lives. The drug authority's timelines are targets in its guidelines, not measured times. Before relying on whether a medicine is covered, ask the treating hospital which route, insurance or state expense, will pay for it.",
  verifyLinks: [
    { label: "Universal Health Insurance Authority (Arabic)", url: "https://uhia.gov.eg" },
    { label: "Egyptian Drug Authority", url: "https://edaegypt.gov.eg" },
    { label: "Ibrahim et al., Cancer incidence in Egypt (2014)", url: NCRP_2014 },
  ],
};
