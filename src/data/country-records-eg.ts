import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Egypt: the institutions and papers behind /countries/eg/ that the corpus did not hold. Sources were read raw on
 * 4 November 2026: the Egyptian Drug Authority's own copy of Law 151 of 2019 (an English translation by Cairo Legal
 * Translation, scanned, read by OCR) and its reliance and biological registration guidelines (PDF text); the Universal
 * Health Insurance Authority's own pages and posts (Arabic, through its WordPress API) and the Andersen Egypt
 * translation of Law 2 of 2018; and three papers resolved through Europe PMC and Crossref, whose full text or abstract
 * was read before any figure was used.
 *
 * Inbound links: the registry and its 2014 paper link each other; the registry also names the two programme papers it
 * gives the background to; the drug authority, the procurement authority and the insurance authority name each other.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const LAW_151 = { label: "Law 151 of 2019 establishing the procurement authority and the drug authority (EDA copy, English translation, PDF)", url: "https://edaegypt.gov.eg/media/mvfjomwa/law-151-of-2019.pdf" };
const LAW_2 = { label: "Law 2 of 2018 on the Universal Health Insurance System (Arabic text, UHIA, PDF)", url: "https://uhia.gov.eg/wp-content/uploads/2024/02/قانون2-لسنة-2018.pdf" };
const LAW_2_EN = { label: "Law 2 of 2018 and Decree 909 of 2018, English translation (Andersen Egypt, PDF)", url: "https://eg.andersen.com/wp-content/uploads/2026/07/Law-No.-2-of-2018.pdf" };

const institutions: InstitutionInput[] = [
  i({ id: "egypt-national-cancer-registry-program", name: "National Population-Based Cancer Registry Program of Egypt", aka: ["National Cancer Registry Program of Egypt", "NCRP Egypt", "البرنامج القومي لتسجيل الأورام"],
    city: "Egypt (three governorate registries)", country: "EG", lat: 26.8, lng: 30.8, institutionType: "government",
    tldr: "Egypt's national cancer registry programme, set up in 2008, whose national report, the only one OnCo found, used registries in three governorates chosen to stand for the north, middle and south of the country to estimate the national figures.",
    summary: "The National Cancer Registry Program of Egypt was established in 2008. Its published method stratified Egypt into Lower, Middle and Upper Egypt and set up a population-based registry in one governorate for each, Damietta in the Nile delta, Minya in Middle Egypt and Aswan in Upper Egypt, located in the Ministry of Health cancer centre of each governorate; the three covered 20.9% of the population of Egypt. Trained doctors abstracted records from the cancer centres, tertiary centres including the National Cancer Institute of Cairo University and the South Egypt Cancer Institute in Assiut, the Health Insurance Organization, the government-subsidised treatment programme and death records, with online data entry and the national identity number used to remove duplicates. Death-certificate-only cases were almost 8% of the total.\n\nThe programme's national report, published in 2014 for the registration years 2008 to 2011, gave an age-standardised incidence of 166.6 per 100,000 for both sexes, with liver (23.8% of cancers), breast (15.4%) and bladder (6.9%) the commonest sites, and projected 114,985 new cancers in 2013 rising to 331,169 in 2050 at the same age-specific rates. The authors write that the rates rest on a short initial phase of registration and a mathematical model that applies regional rates to the national population.\n\nOnCo found no later national incidence report from the programme. The 2014 report gives its website as cancerregistry.gov.eg, which did not answer on 17 November 2026; the coordinates on this record are a country centroid, not an address.",
    programs: ["Population-based registries in Damietta, Minya and Aswan", "National incidence estimates and projections to 2050"],
    cancers: ["hcc", "breast-cancer", "urothelial"], technologies: ["cancer-registries-surveillance"], institutions: ["nci-cairo"],
    keyPapers: ["paper-egypt-ncrp-incidence-2014"], related: ["paper-egypt-hcv-hcc-forecast-2018", "paper-egypt-womens-health-initiative-economics-2026"],
    links: [doi("10.1155/2014/437971", "Ibrahim et al., Cancer incidence in Egypt (J Cancer Epidemiol 2014)"), { label: "Full text, Europe PMC", url: "https://europepmc.org/article/PMC/PMC4189936" }] }),

  i({ id: "egyptian-drug-authority", name: "Egyptian Drug Authority (EDA)", aka: ["EDA", "Egyptian Drug Authority", "هيئة الدواء المصرية"],
    city: "Cairo", country: "EG", lat: 30.044, lng: 31.236, institutionType: "government", website: "https://edaegypt.gov.eg",
    tldr: "Egypt's medicines regulator, created by a 2019 law, which registers cancer medicines, authorises clinical trials with the national ethics council, and can register a medicine already approved in Europe or the United States through a shorter reliance route.",
    summary: "Law 151 of 2019, published in the Official Gazette on 25 August 2019, established the Egyptian Drug Authority and the Egyptian Authority for Unified Procurement together. Article 2 of the promulgating law states that the drug authority replaces the National Organization for Drug Control and Research, the National Organization for Research and Control of Biologicals and the other bodies that had supervisory jurisdiction over medical products.\n\nWHO announced on 20 December 2024 that the authority had reached maturity level 3 for medicines regulation, after a benchmarking finalised in November 2024, having reached the same level for vaccines in March 2022; WHO describes Egypt as the first country in Africa to reach maturity level 3 for both.\n\nIts guideline for biological products (code EDREX:GL.BioInn.001, version 5, effective 21 June 2026) sets a maximum of 120 working days for the normal registration track, 90 for the fast track, and 20 and 40 working days for the two reliance levels; its reliance guideline (EDREX.GL.Bioinn.002, version 2.0, effective 30 June 2026) requires the product to be approved by the European Medicines Agency and/or the US Food and Drug Administration and identical to the product approved there, and states that approval by a reference authority does not oblige the EDA to approve. Under Law 214 of 2020 on clinical medical research, its approval and that of the Supreme Council for Review of the Ethics of Clinical Medical Research are both needed for trials of new compounds.",
    programs: ["Registration of medicines and biological products", "Reliance registration (levels 1 and 2)", "Fast-track registration for orphan and shortage products", "Clinical trial approval under Law 214 of 2020"],
    institutions: ["egypt-unified-procurement-authority", "egypt-universal-health-insurance-authority"], technologies: ["global-oncology-access"],
    links: [
      LAW_151,
      { label: "WHO: Egypt's regulatory system reaches WHO maturity level 3 in medicines regulation (20 December 2024)", url: "https://www.who.int/news/item/20-12-2024-egypt-s-regulatory-system-reaches-who-maturity-level-3-in-medicines-regulation" },
      { label: "EDA: procedures for registration of biological products through reliance pathways, version 2.0 (2026, PDF)", url: "https://www.edaegypt.gov.eg/media/r4rpiosu/reliance-english-version-final-2-_2-2026.pdf" },
      { label: "EDA: guideline implementing decree 343 of 2021, version 5 (2026, PDF)", url: "https://edaegypt.gov.eg/media/lvkl4sds/343-guideline-english-version-2026.pdf" },
      { label: "Law 214 of 2020 regulating clinical medical research (EDA copy, English translation, PDF)", url: "https://edaegypt.gov.eg/media/zz0alwxy/law-214-of-2020_-to-cairo-legal_.pdf" },
    ] }),

  i({ id: "egypt-unified-procurement-authority", name: "Egyptian Authority for Unified Procurement, Medical Supply and Technology Management (UPA)", aka: ["Unified Procurement Authority", "UPA", "AUPP", "الهيئة المصرية للشراء الموحد والإمداد والتموين الطبي وإدارة التكنولوجيا الطبية"],
    city: "Cairo", country: "EG", lat: 30.044, lng: 31.236, institutionType: "government", website: "https://www.upa.gov.eg",
    tldr: "The state body that, by a 2019 law, buys medicines and medical devices for every government hospital and authority in Egypt, including the cancer medicines used in public hospitals.",
    summary: "Law 151 of 2019 created the authority as an economic public authority under the Prime Minister's office. Article 3 of the annexed law gives it, in the English translation the Egyptian Drug Authority publishes, the exclusive task of procurement of pharmaceuticals and human medical appliances for all government bodies and authorities, for a purchase fee of no more than 7% of the net value of what it buys for them. The law defines government bodies as the Ministry of Health and Population and its hospitals, the government universities and their hospitals, hospitals belonging to other ministries, and government educational and research institutions; private and other bodies may ask it to buy for them if its board agrees.\n\nThe Universal Health Insurance Authority's May 2025 statement on its contract with Gustave Roussy International Egypt records that the cancer centre had signed agreements with the procurement authority to supply all the medicines and consumables it needs. The procurement authority's own website refused our scripted reader (HTTP 403) on 4 November 2026, so this record does not give its tender volumes or its cancer medicine lists.",
    programs: ["Unified procurement of medicines and medical devices for government bodies"],
    institutions: ["egyptian-drug-authority", "egypt-universal-health-insurance-authority"], technologies: ["global-oncology-access"],
    links: [LAW_151, { label: "UHIA: contract with Gustave Roussy International Egypt (29 May 2025, Arabic)", url: "https://uhia.gov.eg/?p=11853" }] }),

  i({ id: "egypt-universal-health-insurance-authority", name: "Universal Health Insurance Authority (UHIA), Egypt", aka: ["General Authority for Comprehensive Health Insurance", "UHIA", "الهيئة العامة للتأمين الصحي الشامل"],
    city: "Cairo", country: "EG", lat: 30.044, lng: 31.236, institutionType: "government", website: "https://uhia.gov.eg",
    tldr: "The authority that pays for care under Egypt's universal health insurance law of 2018, which covers about five million people in six governorates and exempts people with cancer from the fees other patients pay.",
    summary: "Law 2 of 2018 creates a mandatory, solidarity-based insurance system for all citizens, with the family as the unit of cover, applied gradually by governorate in the six phases listed in its Table 5, and separates financing from provision: the authority pays and may not provide treatment itself, the General Authority for Healthcare runs the system's facilities, and the General Authority for Healthcare Accreditation and Supervision accredits providers. The State pays the contributions of people who cannot afford them. Patients pay a share at the point of service under Table 3 of the law (10% of the price of medicines up to a cap, for example), but article 40 exempts people with chronic diseases and tumours from those payments.\n\nIn its own statements the authority reported 5,231,341 registered beneficiaries, 81.71% of the population of the governorates where the system applies, in December 2025, and more than 5.2 million and over 580 contracted providers in June 2026, in Port Said, Luxor, Ismailia, South Sinai, Suez and Aswan, with the second phase to cover Minya, North Sinai, Matrouh, Damietta and Kafr El Sheikh. In November 2025 its executive director said the system covered 3,861 medicines and exempted cancer patients from any fees, and named access to cancer medicines at affordable prices as its biggest challenge. Its health economics unit studied six new medicines in 2025 and reported a drug list of 4,796 medicines in January 2026. In May 2025 it contracted Gustave Roussy International Egypt to treat its beneficiaries with cancer from June 2025.",
    programs: ["Universal health insurance in six governorates (phase one)", "Health economics unit and health technology assessment", "Drug list and service package"],
    cancers: ["breast-cancer"], institutions: ["egyptian-drug-authority", "egypt-unified-procurement-authority"], technologies: ["global-oncology-access"],
    links: [
      LAW_2, LAW_2_EN,
      { label: "UHIA: digital payments model and phase two governorates (16 June 2026, Arabic)", url: "https://uhia.gov.eg/?p=14154" },
      { label: "UHIA: registration rate 81.71% and 5,231,341 beneficiaries (29 December 2025, Arabic)", url: "https://uhia.gov.eg/?p=13216" },
      { label: "UHIA: 3,861 medicines and exemption of cancer patients from fees (13 November 2025, Arabic)", url: "https://uhia.gov.eg/?p=12892" },
      { label: "UHIA: health economics unit in 2025 (7 January 2026, Arabic)", url: "https://uhia.gov.eg/?p=13276" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-egypt-ncrp-incidence-2014", name: "Cancer Incidence in Egypt: Results of the National Population-Based Cancer Registry Program",
    journal: "Journal of Cancer Epidemiology", year: 2014, doi: "10.1155/2014/437971", pmid: "25328522", authors: "Ibrahim AS, Khaled HM, Mikhail NN, Baraka H, Kamel H", paperType: "observational",
    tldr: "The national cancer incidence figures from Egypt's registry programme, the only ones OnCo found: registries in three governorates from 2008 to 2011 put liver, breast and bladder cancer first and projected cancers to nearly treble by 2050.",
    summary: "The National Cancer Registry Program of Egypt stratified the country into Lower, Middle and Upper Egypt and ran a population-based registry in one governorate of each: Damietta (2009 to 2011), Minya (2009) and Aswan (2008), together covering 20.9% of Egypt's population. Abstractors collected data from cancer centres, national tertiary institutions, the Health Insurance Organization, the government-subsidised treatment programme and death records. Regional age-specific rates were applied to the national population to give national incidence, and to projected populations for estimates up to 2050. The authors are from the National Cancer Institute of Cairo University, the South Egypt Cancer Institute of Assiut University and Cairo University's Faculty of Engineering.",
    findings: [
      "Age-standardised incidence (world standard) was 166.6 per 100,000 for both sexes, 175.9 in men and 157.0 in women, excluding non-melanoma skin cancer.",
      "Liver was 23.8% of cancers (age-standardised rate 43.6), breast 15.4% (24.3) and bladder 6.9% (13.5); in men liver was 33.6% and bladder 10.7%, in women breast 32.0% and liver 13.5%.",
      "Liver cancer was highest in Lower Egypt (age-standardised rate 56.8 per 100,000) and lowest in Upper Egypt (13.1).",
      "Applying the same rates to projected populations gives 114,985 new cancers in 2013, 168,723 in 2025 and 331,169 in 2050.",
      "Death-certificate-only cases were almost 8% of registrations.",
    ],
    whatItMeans: "These are the national incidence figures Egypt's own registry has published, and IARC's estimates for Egypt are built on subnational rates of this kind. They describe 2008 to 2011, before the national hepatitis C treatment campaign, so the liver cancer share may not describe Egypt today.",
    caveats: ["The authors note that the rates rest on a short initial phase of registration and a mathematical model that applies regional rates to the whole country.", "Greater Cairo was not one of the three registry governorates.", "The projections assume rates stay as they were in 2008 to 2011."],
    cancers: ["hcc", "breast-cancer", "urothelial"], technologies: ["cancer-registries-surveillance"], institutions: ["egypt-national-cancer-registry-program", "nci-cairo"],
    links: [doi("10.1155/2014/437971", "J Cancer Epidemiol 2014"), pubmed("25328522"), { label: "Full text, Europe PMC", url: "https://europepmc.org/article/PMC/PMC4189936" }] }),

  p({ id: "paper-egypt-hcv-hcc-forecast-2018", name: "Forecasted impacts of a sofosbuvir-based national hepatitis C treatment programme on Egypt's hepatocellular cancer epidemic: simulation of alternatives",
    journal: "BMJ Global Health", year: 2018, doi: "10.1136/bmjgh-2017-000572", pmid: "29707244", authors: "Ma W, Soliman AS, Anwar WA, et al.", paperType: "methods",
    tldr: "A model of Egypt's hepatitis C treatment programme estimated that curing the infection with sofosbuvir-based tablets would prevent about 956,000 liver cancers between 2015 and 2050.",
    summary: "A Markov model of hepatitis C infection and treatment simulated the hepatitis C-related liver cancer epidemic in Egypt from 2009 to 2050, comparing the older treatment programme with the sofosbuvir-based programme introduced in 2015, using parameters from peer-reviewed studies and expert opinion. It modelled people with hepatitis C aged 15 to 59 in 2008, healthy people aged 5 to 59 in 2008, and cohorts of five-year-olds entering the population each year from 2009.",
    findings: [
      "Under the new programme, the number of liver cancer cases was projected to peak earlier and lower, at about 29,000 in 2025, with prevalence peaking at about 28 per 100,000 in 2023 and incidence at about 14 per 100,000 in 2022.",
      "The new programme was estimated to avert about 956,000 liver cancer cases between 2015 and 2050.",
    ],
    whatItMeans: "Curing hepatitis C at national scale is expected to reduce liver cancer in Egypt, but in this model the effect builds over decades, with the number of cases still near its peak in the mid-2020s.",
    caveats: ["A simulation, not an observed count; its inputs include expert opinion.", "Published in 2018, before WHO reported in 2023 how many people the national campaign had tested and treated."],
    cancers: ["hcc"], terms: ["hbv-hcv"],
    links: [doi("10.1136/bmjgh-2017-000572", "BMJ Glob Health 2018"), pubmed("29707244")] }),

  p({ id: "paper-egypt-womens-health-initiative-economics-2026", name: "Advancing women's health in Egypt: an economic evaluation of the presidential initiative for nationwide breast cancer early detection and treatment",
    journal: "Archives of Public Health", year: 2026, doi: "10.1186/s13690-026-02122-8", pmid: "42920161", authors: "Abdelghaffar K, Hassany M, Elghazaly H, et al.", paperType: "real-world", participants: 30225,
    tldr: "Egypt's presidential women's health initiative, which invites women from age 18 to a free breast risk assessment, found 30,225 breast cancers from 2019 to 2024, and more of them at an early stage than in Health Ministry records without the campaign.",
    summary: "The Presidential Initiative for Women's Health, launched in July 2019, invites women aged 18 and over in every governorate to a risk questionnaire and, if at risk, a clinical breast examination at a primary care unit, with mammography used only as a diagnostic test after an abnormal clinical assessment, then biopsy, and free treatment through the national health insurance system or state-funded programmes for confirmed cases. This model-based economic evaluation used national programme data from July 2019 to September 2024 and compared the initiative with opportunistic detection using a decision tree and Markov model over a lifetime horizon from a societal perspective. Medical writing and publication were funded by Roche Egypt, which the authors state had no role in the study. Most authors are from the Ministry of Health and Population, including its women's health initiative, and from Egyptian cancer centres.",
    findings: [
      "About 23.8 million unique women generated 53,453,745 recorded screening and service encounters from July 2019 to September 2024.",
      "Of 58,494 women referred to pathology, 44,149 were examined (24.5% did not attend), and 30,225 breast cancers were confirmed.",
      "Stage I or II made up 61.3% of cancers found by the initiative, against 41.6% in Ministry of Health records used as the comparator.",
      "The model estimated 32,576 extra quality-adjusted life years and total societal costs of 11.68 billion Egyptian pounds against 18.07 billion without the initiative, a net saving of 6.39 billion; the initiative was cost-effective at the Egyptian threshold of 164,588 pounds per quality-adjusted life year in all 5,000 simulations.",
    ],
    whatItMeans: "Egypt chose a risk questionnaire for all adult women, with clinical breast examination for those found at risk, rather than mammography for older women, because many Egyptian breast cancers occur in younger women; the programme data show a shift toward earlier stage, which is the measure such a programme is designed to move.",
    caveats: ["A model: survival and quality-of-life inputs were transferred from other settings, and Egyptian long-term outcome data are not yet available.", "The comparison is with Ministry records of cancers found without the campaign, not a randomised control group.", "Written largely by staff of the Health Ministry and of the initiative it evaluates, with publication funded by Roche Egypt."],
    cancers: ["breast-cancer"], technologies: ["mammography"],
    links: [doi("10.1186/s13690-026-02122-8", "Arch Public Health 2026"), pubmed("42920161"), { label: "Full text, Europe PMC", url: "https://europepmc.org/article/PMC/PMC13695269" }] }),
];

export const recordsEG: EntityInput[] = [...institutions, ...papers];
