import type { InstitutionInput } from "@/lib/schema";

/**
 * Institution census, West and Central Africa: cancer centres, hospitals, registries, regulators, payers and ministries
 * for Côte d'Ivoire, Guinea, Benin, Togo, Sierra Leone, Liberia, Mauritania, the Republic of the Congo, the Central
 * African Republic, The Gambia, Guinea-Bissau, Gabon, Cabo Verde and São Tomé and Príncipe that the corpus did not hold.
 *
 * Read raw on 11 November 2026 (curl, then text extraction; PDFs through pdftotext):
 * - IAEA DIRAC public equipment data (the JSON behind dirac.iaea.org/Data/CountriesLight, all 8,625 rows): radiotherapy
 *   centres listed for Côte d'Ivoire, Togo, Mauritania and Gabon only, none for the other eleven countries.
 * - African Cancer Registry Network member pages: Cotonou, Parakou, Brazzaville and Cabo Verde.
 * - UICC member pages: CNRAO, PNLCa (Côte d'Ivoire), PNLCC (Guinea), Fondation Claudine Talon (Benin).
 * - National cancer plans as PDF text: Côte d'Ivoire 2022 to 2025 (March 2022) and Togo 2022 to 2025 (draft, October
 *   2021) and Benin 2024 to 2028 (January 2024), all from the ICCP portal; Mauritania 2018 to 2022 (ICCP portal); the
 *   Republic of the Congo 2022 to 2026 (March 2023, from the ministry's own site).
 * - IAEA imPACT review summary for the Central African Republic (mission September 2020 to March 2021, PDF).
 * - NIH ClinRegs profiles for Guinea, Liberia and Sierra Leone; the African Union's list of signatures and
 *   ratifications of the African Medicines Agency treaty (dated 19 September 2023); WHO's list of regulators at
 *   maturity level 3 and 4 (August 2026), which names none of these fifteen countries.
 * - Own sites: cnrao-ci.com, ipscnam.ci, abmed.bj, sante.gouv.bj, sante.gov.gn, moh.gov.lr, jfkmc.gov.lr, lmhra.gov.lr,
 *   pharmacyboard.gov.sl, mca.gm, efsth.gm, cnam.mr, cnamgs.ga, sante.gouv.cg, sante.gouv.cf, minsaude.gov.cv,
 *   republicoftogo.com (government portal), groupepisam.com (title and description only).
 * - Papers, each resolved through Europe PMC and read as abstract (and affiliations) before use: 10.1371/journal.pone.0075775,
 *   10.1002/hsr2.70084, 10.1186/s12885-025-13429-0, 10.1200/go.22.00317, 10.3332/ecancer.2026.2093.
 * - ClinicalTrials.gov API v2 for NCT05904886 (IMbrave152), whose site list names CNRAO and PISAM in Abidjan.
 *
 * Coordinates: building points from IAEA DIRAC for CNRAO, the Centre National d'Oncologie (Nouakchott) and the
 * Institut de Cancérologie d'Akanda; OpenStreetMap Nominatim for the named hospitals it found (CHU de Treichville, CHU de
 * Yopougon, Hôpital Mère-Enfant de Bingerville, PISAM, CNHU Cotonou, CHUD Borgou-Alibori, Connaught, JFK, EFSTH, Simão
 * Mendes, Agostinho Neto, Baptista de Sousa, the Complexe pédiatrique in Bangui); every other record carries a Nominatim
 * city or district point and says so in its summary. DIRAC's point for the Lomé centre (8.62, 0.82) lies in central Togo,
 * not Lomé, so a Lomé city point is used instead.
 *
 * Not read:
 * - Equatorial Guinea: no ministry site resolved (minsaludbs.gob.gq does not resolve) and the screening project's own pages
 *   (mcd.org) refused the connection; no record is written. DIRAC lists no radiotherapy centre there.
 * - sante.gouv.ci (Côte d'Ivoire ministry): an entry page only. airp.ci (regulator): content loaded by script, only the title
 *   reads, so no regulator record is written for Côte d'Ivoire. chu-treichville.ci, chu-yopougon.ci, cmu.gouv.ci, pnlca.ci,
 *   cnam.ci: do not resolve. pisam.ci: certificate does not match the host. ipscnam.ci/pathologies-couvertes: list loaded by script.
 * - dnpm-msgn.com (Guinea's regulator, the address ClinRegs gives): now serves unrelated community-site content; ClinRegs
 *   says it could not reach it either.
 * - sante.gov.mr (Mauritania ministry): connection reset. cno.mr: does not resolve.
 * - inam.tg (Togo health insurance): 403 behind a script challenge. cicl-togo.com, chu-so.tg: do not resolve.
 * - sante.gouv.ga (Gabon ministry): 503.
 * - chu-brazzaville.cg: expired certificate. cnhu-hkm.bj: does not resolve.
 * - minsap.gw (Guinea-Bissau ministry): content loaded by script. ms.gov.st (São Tomé ministry): does not resolve.
 * - moh.gov.gm/cancer-control-program/: the page has a title and no body.
 * - ecancer.org (São Tomé paper's journal page): timed out; read through Europe PMC instead.
 * - iaea.org list of imPACT reviews: 403 script challenge; only the Central African Republic summary PDF was read.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DIRAC = { label: "IAEA DIRAC: directory of radiotherapy centres", url: "https://dirac.iaea.org/Data/CountriesLight" };
const AMA = { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf" };

// Côte d'Ivoire
const CI_PLAN = { label: "Plan stratégique national de lutte contre le cancer 2022 to 2025, Côte d'Ivoire (March 2022, PDF via ICCP)", url: "https://www.iccp-portal.org/sites/default/files/plans/PSNCancer_2022_2025_vf%20PNLCa.pdf" };
const UICC_CNRAO = { label: "UICC member page: CNRAO", url: "https://www.uicc.org/membership/centre-national-doncologie-medicale-et-de-radiotherapie-alassane-ouattara-cnrao" };
const UICC_PNLCA = { label: "UICC member page: PNLCa", url: "https://www.uicc.org/membership/programme-national-de-lutte-contre-le-cancer-pnlca" };
const CT_IMBRAVE152 = { label: "ClinicalTrials.gov: NCT05904886 (IMbrave152) site list", url: "https://clinicaltrials.gov/study/NCT05904886" };
const CNAM_CI = { label: "IPS-CNAM: history and missions", url: "https://ipscnam.ci/la-cnam/" };
const CNAM_CI_SOINS = { label: "IPS-CNAM: care covered by the CMU", url: "https://ipscnam.ci/soins-couverts/" };

// Guinea
const CLINREGS_GN = { label: "NIH ClinRegs: Guinea", url: "https://clinregs.niaid.nih.gov/country/guinea" };
const GN_WCD = { label: "Ministry of Health, Guinea: World Cancer Day 2025", url: "https://sante.gov.gn/celebration-de-la-journee-mondiale-contre-le-cancer/" };
const UICC_PNLCC_GN = { label: "UICC member page: PNLCC Guinée", url: "https://www.uicc.org/membership/programme-national-de-lutte-contre-le-cancer-pnlcc-guinee" };

// Benin
const BJ_PLAN = { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (January 2024, PDF via ICCP)", url: "https://www.iccp-portal.org/sites/default/files/2025-11/B%C3%A9nin_PNLC_2024_2028.pdf" };
const AFCRN_COTONOU = "https://afcrn.org/index.php/membership/membership-list/134-cotonoucancerregistry";
const AFCRN_PARAKOU = "https://afcrn.org/index.php/membership/membership-list/176-benin-parakou";
const ABMED_PRES = { label: "ABMed: presentation", url: "https://abmed.bj/presentation" };

// Togo
const TG_PLAN = { label: "Plan cancer Togo 2022 to 2025 (draft, October 2021, PDF via ICCP)", url: "https://www.iccp-portal.org/sites/default/files/plans/Plan%20Cancer%20Togo%202022-2025_31_10-2.pdf" };

// Mauritania
const MR_PLAN = { label: "Plan national de lutte contre le cancer 2018 to 2022, Mauritania (PDF via ICCP)", url: "https://www.iccp-portal.org/sites/default/files/plans/MRT_B5_PLAN%20CANCER%20MAURITANIE%20VF%202018%20(1).pdf" };

// Republic of the Congo
const CG_PLAN = { label: "Plan stratégique national de lutte contre le cancer 2022 to 2026, Republic of the Congo (March 2023, PDF)", url: "https://sante.gouv.cg/wp-content/uploads/2023/04/PSNLC-DU-12-AVRIL-2023.pdf" };
const AFCRN_BRAZZA = "https://afcrn.org/index.php/membership/membership-list/90-brazzaville-rep-congo";

// Central African Republic
const CF_IMPACT = { label: "IAEA imPACT review summary, Central African Republic (2021, PDF)", url: "https://www.iaea.org/sites/default/files/documents/review-missions/impact-mission-to-central-african-rep-march-2021.pdf" };

// The Gambia
const GM_NCR_PAPER = { label: "Bah et al., 20 years of population-based cancer registration in The Gambia (PLoS One 2013)", url: "https://doi.org/10.1371/journal.pone.0075775" };
const GM_EFSTH_PAPER = { label: "Adegoke et al., childhood cancer in The Gambia, the first year (Health Science Reports 2024)", url: "https://doi.org/10.1002/hsr2.70084" };

// Cabo Verde
const CV_2023_FEB = { label: "Ministério da Saúde, Cabo Verde: government investment in cancer control (February 2023)", url: "https://minsaude.gov.cv/noticias/investimentos-do-governo-no-programa-de-luta-contra-o-cancro/" };
const CV_2023_OCT = { label: "Ministério da Saúde, Cabo Verde: breast cancer early diagnosis programme (October 2023)", url: "https://minsaude.gov.cv/noticias/cabo-verde-quer-reduzir-em-10-os-casos-de-cancro-de-mama-diagnosticados-em-estadio-avancando/" };

export const institutionsCountriesWestCentralAfrica: InstitutionInput[] = [
  // ───────────────────────── Côte d'Ivoire ─────────────────────────
  i({ id: "cnrao-abidjan", name: "Centre National d'Oncologie Médicale et de Radiothérapie Alassane Ouattara (CNRAO)", aka: ["CNRAO", "National Centre for Medical Oncology and Radiotherapy Alassane Ouattara"],
    city: "Abidjan", country: "CI", lat: 5.36, lng: -3.967, institutionType: "cancer-center", website: "https://cnrao-ci.com/",
    tldr: "Côte d'Ivoire's public cancer centre for radiotherapy and chemotherapy, in Cocody, Abidjan, open to patients since January 2018. It also offers consultations, teleconsultations, a laboratory, a pharmacy and support such as nutrition, psychology and social work.",
    summary: "CNRAO is a public establishment created by Decree 2018-460 of 9 May 2018, inaugurated on 18 December 2017 and open to patients from 25 January 2018, under the technical supervision of the health ministry. Its UICC member page describes an 11,000 square metre site with a radiotherapy unit (a CT simulator and two linear accelerators, one upgraded for RapidArc), a 10-bed medical oncology unit with centralised chemotherapy preparation, a laboratory and a pharmacy, plus supportive and palliative care. IAEA DIRAC lists two linear accelerators and no brachytherapy, updated in 2026. The national cancer plan of March 2022 calls it the country's first radiotherapy centre, notes a high-dose-rate brachytherapy unit not yet working, and reports more than 500 patients treated with radiotherapy.\n\nThe UICC page says no treatment is delayed for lack of money: from 25 January 2018 to 31 July 2022, 1,960 uninsured patients were allowed to pay in instalments, for 2,416,000,000 CFA francs, and an agreement between the State and Roche gives uninsured patients free medicines in the public sector. Of more than 7,000 patients seen from January 2018 to March 2022, 1,179 had breast cancer and 75% of those were at an advanced stage. The centre's own site lists teleconsultation, nutrition consultations since June 2022, and a colorectal cancer screening campaign launched in April 2026. It is a site of the IMbrave152 liver cancer trial (NCT05904886).",
    programs: ["External beam radiotherapy (two linear accelerators)", "Medical oncology day unit (10 beds)", "Teleconsultation", "Supportive care: nutrition, psychology, socio-aesthetics, sport, social work", "Colorectal cancer screening campaign (2026)"],
    // TODO: re-link abidjan-cancer-registry (defined in the country deep dive, PR #395) once it merges.
    institutions: ["cote-divoire-ministry-of-health", "pnlca-cote-divoire", "chu-treichville", "iaea"],
    cancers: ["breast-cancer", "colorectal", "hcc"],
    links: [{ label: "CNRAO", url: "https://cnrao-ci.com/" }, UICC_CNRAO, CI_PLAN, DIRAC, CT_IMBRAVE152] }),

  i({ id: "pnlca-cote-divoire", name: "Programme National de Lutte contre le Cancer, Côte d'Ivoire (PNLCa)", aka: ["PNLCa", "National Cancer Control Programme, Côte d'Ivoire"],
    city: "Abidjan", country: "CI", lat: 5.32, lng: -4.016, institutionType: "government",
    tldr: "The health ministry's national cancer programme in Côte d'Ivoire, based in Treichville, Abidjan. It coordinates prevention, screening, care and research, and the Abidjan cancer registry sits inside it.",
    summary: "The PNLCa is the Ministry of Health's national cancer control programme; its UICC member page gives its address as Km 4, Boulevard de Marseille, Treichville, and its mission as reducing the impact of cancer through promotion, prevention, care and research. The national cancer plan of March 2022, which it led, says the programme has 27 staff in seven services under an order of 4 December 2014, including a cancer registry service, and that the Abidjan cancer registry, running since 1 January 1994, is integrated into it. The plan records the programme's State budget falling from 108,692,633 CFA francs in 2015 to 85,262,895 in 2021, and that in 2021 the PNLCa joined the national medicines supply chain and led the quantification of anticancer medicines. The coordinates are an approximate Abidjan city point.",
    programs: ["Plan stratégique national de lutte contre le cancer 2022 to 2025", "Abidjan cancer registry (registry service)", "Quantification of anticancer medicines for the national supply chain"],
    // TODO: re-link abidjan-cancer-registry (defined in the country deep dive, PR #395) once it merges.
    institutions: ["cote-divoire-ministry-of-health", "cnrao-abidjan", "chu-treichville"],
    links: [UICC_PNLCA, CI_PLAN] }),

  i({ id: "cote-divoire-ministry-of-health", name: "Ministère de la Santé, de l'Hygiène Publique et de la Couverture Maladie Universelle, Côte d'Ivoire", aka: ["MSHPCMU", "Ministry of Health, Public Hygiene and Universal Health Coverage, Côte d'Ivoire"],
    city: "Abidjan", country: "CI", lat: 5.32, lng: -4.016, institutionType: "government", website: "https://www.sante.gouv.ci/",
    tldr: "Côte d'Ivoire's health ministry. Its national cancer plan for 2022 to 2025 found that the universal health insurance package did not yet cover cancer and that only about 6% of people with cancer had health insurance.",
    summary: "The ministry oversees CNRAO and the national cancer programme (PNLCa), which wrote the Plan stratégique national de lutte contre le cancer 2022 to 2025 (March 2022). The plan lists the public places that give anticancer treatment: the cancer service and paediatric oncology unit of CHU de Treichville, the onco-haematology unit of CHU de Yopougon, CNRAO and the Hôpital Mère-Enfant de Bingerville. It states that the care package set for universal health coverage (CMU) did not cover non-communicable diseases including cancer, that about 6% of people with cancer had health insurance, and that since 2014 an agreement between the State and Roche, worth 137,053,937 euros over five years with a State share of 29,964,035 euros, has made costly medicines available to people on low incomes without private insurance. It sets a target of bringing three cancers into CMU cover by 2025 and plans a second national radiotherapy centre at Grand-Bassam through a partnership with the Republic of Korea. The ministry's website showed only an entry page when read. The coordinates are an approximate Abidjan city point.",
    programs: ["Plan stratégique national de lutte contre le cancer 2022 to 2025", "Access Roche agreement (since 2014)", "Couverture Maladie Universelle (with IPS-CNAM)"],
    // TODO: re-link abidjan-cancer-registry (defined in the country deep dive, PR #395) once it merges.
    institutions: ["pnlca-cote-divoire", "cnrao-abidjan", "ips-cnam-cote-divoire", "chu-treichville", "chu-yopougon", "hopital-mere-enfant-bingerville"],
    links: [CI_PLAN, { label: "Ministère de la Santé, Côte d'Ivoire", url: "https://www.sante.gouv.ci/" }] }),

  i({ id: "ips-cnam-cote-divoire", name: "Caisse Nationale d'Assurance Maladie, Côte d'Ivoire (IPS-CNAM)", aka: ["IPS-CNAM", "CNAM Côte d'Ivoire", "National Health Insurance Fund, Côte d'Ivoire"],
    city: "Abidjan", country: "CI", lat: 5.32, lng: -4.016, institutionType: "government", website: "https://ipscnam.ci/",
    tldr: "The fund that runs Côte d'Ivoire's universal health insurance, created in 2014. Members pay 1,000 CFA francs a month and the fund pays 70% of covered care, while the State pays everything for people in its medical assistance scheme.",
    summary: "Law 2014-131 of 24 March 2014 instituted the Couverture Maladie Universelle (CMU), a compulsory national health insurance scheme, and Decree 2014-395 of 25 June 2014 created the Institution de Prévoyance Sociale, Caisse Nationale d'Assurance Maladie, to run it; it began enrolling on 30 December 2014. Its site says that before 2014 only 5% of the population had cover. The CMU has a contributory scheme (Régime Général de Base, 1,000 CFA francs per person per month) and a non-contributory one (Régime d'Assistance Médicale) for people without means, whose contributions and co-payments the State pays. Covered care carries a 30% co-payment, with the fund paying 70%, at approved public facilities and pharmacies. The national cancer plan of March 2022 says the CMU package did not then cover cancer and set a target of three cancers covered by 2025; OnCo could not read the fund's list of covered conditions, which loads by script. The coordinates are an approximate Abidjan city point; the fund's site gives its address as Avenue Lamblin, Plateau.",
    programs: ["Couverture Maladie Universelle: Régime Général de Base", "Couverture Maladie Universelle: Régime d'Assistance Médicale"],
    institutions: ["cote-divoire-ministry-of-health"],
    links: [CNAM_CI, CNAM_CI_SOINS, { label: "Law 2014-131 instituting the CMU (PDF)", url: "https://ipscnam.ci/wp-content/uploads/2023/09/Loi-N%C2%B02014-131-dinstituant-la-Couverture-Maladie-Universelle.pdf" }, CI_PLAN] }),

  i({ id: "chu-treichville", name: "Centre Hospitalier Universitaire de Treichville", aka: ["CHU de Treichville", "Treichville University Hospital"],
    city: "Abidjan", country: "CI", lat: 5.291, lng: -4.004, institutionType: "hospital",
    tldr: "A university hospital in Abidjan with a cancer service and a children's cancer unit. It is one of five public places in Côte d'Ivoire that give anticancer medicines.",
    summary: "The national cancer plan of March 2022 names CHU de Treichville's Service de Cancérologie and its paediatric oncology unit among the five public services able to give anticancer treatment, alongside CHU de Yopougon, CNRAO and the Hôpital Mère-Enfant de Bingerville. It also has one of three public pathology services (with Cocody and Bouaké; the plan gives about 4,000 to 6,000 specimens a year and says Cocody and Treichville were equipped for immunohistochemistry in 2020), a breast imaging unit, and treatment of precancerous cervical lesions. The plan records that the Franco-African paediatric oncology group (GFAOP) began sending childhood cancer medicines in 2004 and was reducing them from 2021, and that a pilot to digitise Abidjan registry data collection was running in the hospital's cancer unit and at CNRAO. CNRAO's UICC page lists the hospital among public sites where the State's agreement with Roche gives uninsured patients free medicines. The hospital's own website did not resolve.",
    programs: ["Service de Cancérologie (adult medical oncology)", "Paediatric oncology unit", "Pathology", "Breast imaging and cervical precancer treatment"],
    // TODO: re-link abidjan-cancer-registry (defined in the country deep dive, PR #395) once it merges.
    institutions: ["cote-divoire-ministry-of-health", "pnlca-cote-divoire", "cnrao-abidjan"],
    cancers: ["breast-cancer", "cervical"],
    links: [CI_PLAN, UICC_CNRAO] }),

  i({ id: "chu-yopougon", name: "Centre Hospitalier Universitaire de Yopougon", aka: ["CHU de Yopougon", "Yopougon University Hospital"],
    city: "Abidjan", country: "CI", lat: 5.358, lng: -4.09, institutionType: "hospital",
    tldr: "A university hospital in Abidjan whose onco-haematology unit treats blood cancers and gives chemotherapy. It is one of the public hospitals where uninsured patients can receive certain costly cancer medicines free.",
    summary: "The national cancer plan of March 2022 lists the Unité d'Oncologie-Hématologique of CHU de Yopougon among the five public services in Côte d'Ivoire able to give anticancer treatment, and among the four Abidjan university hospitals that measure tumour markers. CNRAO's UICC member page names CHU de Yopougon among the public hospitals where the agreement between the State and Roche gives uninsured patients free medicines. The hospital's own website did not resolve.",
    programs: ["Onco-haematology unit"],
    institutions: ["cote-divoire-ministry-of-health"],
    links: [CI_PLAN, UICC_CNRAO] }),

  i({ id: "hopital-mere-enfant-bingerville", name: "Hôpital Mère-Enfant de Bingerville", aka: ["HME Bingerville", "Mother and Child Hospital, Bingerville"],
    city: "Bingerville", country: "CI", lat: 5.362, lng: -3.884, institutionType: "hospital",
    tldr: "A mother and child hospital near Abidjan that treats children's cancers. Since 2018 a pharmacist has been responsible for preparing its anticancer medicines.",
    summary: "The national cancer plan of March 2022 lists the Hôpital Mère-Enfant de Bingerville among the places that care for children with cancer and among the five public services in Côte d'Ivoire able to give anticancer treatment. It records that from 2018 the preparation of anticancer medicines there, as at CNRAO, was placed under a pharmacist's responsibility. OnCo did not find the hospital's own website.",
    programs: ["Paediatric cancer care", "Pharmacist-led chemotherapy preparation (from 2018)"],
    institutions: ["cote-divoire-ministry-of-health"],
    links: [CI_PLAN] }),

  i({ id: "pisam-abidjan", name: "Polyclinique Internationale Sainte Anne-Marie (PISAM)", aka: ["PISAM", "Groupe PISAM"],
    city: "Abidjan", country: "CI", lat: 5.337, lng: -4.013, institutionType: "hospital", website: "https://www.groupepisam.com/",
    tldr: "A private hospital in Cocody, Abidjan, with emergency care around the clock. It is one of two sites in Côte d'Ivoire for an international liver cancer trial.",
    summary: "PISAM is a private polyclinic in Abidjan; its website describes more than 50 medical specialities and 24-hour emergencies, and loads the rest of its content by script. ClinicalTrials.gov lists it, with CNRAO, as a site of IMbrave152 (NCT05904886), a phase 3 trial of atezolizumab and bevacizumab with or without tiragolumab in untreated advanced hepatocellular carcinoma. OnCo has not read a description of its cancer services.",
    institutions: ["cnrao-abidjan"],
    cancers: ["hcc"],
    links: [{ label: "PISAM", url: "https://www.groupepisam.com/" }, CT_IMBRAVE152] }),

  // ───────────────────────── Guinea ─────────────────────────
  i({ id: "guinea-ministry-of-health", name: "Ministère de la Santé et de l'Hygiène Publique, Guinée (MSHP)", aka: ["MSHP", "Ministry of Health and Public Hygiene, Guinea"],
    city: "Conakry", country: "GN", lat: 9.515, lng: -13.708, institutionType: "government", website: "https://sante.gov.gn/",
    tldr: "Guinea's health ministry. It is the authority for medicines approval and clinical trials, through its ethics committee and its pharmacy directorate, and it runs the national cancer programme.",
    summary: "NIH ClinRegs (Guinea profile, reviewed January 2026) describes the Ministère de la Santé et de l'Hygiène Publique as the regulatory authority for national marketing authorisation and for clinical trials: the Comité National d'Ethique pour la Recherche en Santé (CNERS) reviews and approves protocols, and the Direction Nationale de la Pharmacie et du Médicament handles registration, authorisation and import of medicines. ClinRegs gives its address as Almamiya, Kaloum, Conakry. On World Cancer Day 2025 the ministry reported the national cancer programme's coordinator saying that registry data showed 840 new cases and 595 deaths, and stated that cervical cancer is the commonest cancer in Guinea, with more than 2,000 cases and nearly 1,500 deaths a year; it thanked the IAEA and the Association Guinéenne pour la Lutte contre le Cancer for support including vaccines against liver and cervical cancer. The coordinates are an approximate point for Kaloum, Conakry.",
    programs: ["National cancer control programme (PNLCC)", "Clinical trial authorisation (CNERS and DNPM)"],
    // TODO: re-link hopital-national-donka, registre-cancers-guinee (defined in the country deep dive, PR #395) once it merges.
    institutions: ["dnpm-guinea", "pnlcc-guinea", "iaea"],
    cancers: ["cervical", "hcc"],
    links: [CLINREGS_GN, GN_WCD] }),

  i({ id: "dnpm-guinea", name: "Direction Nationale de la Pharmacie et du Médicament, Guinée (DNPM)", aka: ["DNPM", "National Directorate of Pharmacy and Medicine, Guinea", "National Directorate of Medicines and Pharmacies, Guinea"],
    city: "Conakry", country: "GN", lat: 9.515, lng: -13.708, institutionType: "government",
    tldr: "Guinea's medicines regulator, a directorate of the health ministry. It registers and authorises medicines and their import, organises quality control and runs pharmacovigilance.",
    summary: "NIH ClinRegs (Guinea profile, reviewed January 2026) describes the DNPM as the branch of the Ministry of Health and Public Hygiene responsible for registering, authorising and importing medicines, with a Medicines Division (approval and import, supply, pharmacovigilance, narcotics) and a Division of Pharmaceutical Establishments and Laboratories (standards, quality assurance, falsified medicines); it must issue an import licence for trial products. ClinRegs notes a 2023 update recording a renaming to the National Directorate of Medicines and Pharmacies, and that the DNPM website has been inaccessible since April 2025; the address it gave now serves unrelated content. Guinea signed the African Medicines Agency treaty on 7 February 2020 and ratified it on 21 April 2021. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Guinea. The coordinates are an approximate point for Kaloum, Conakry.",
    programs: ["Medicines registration and import authorisation", "Pharmacovigilance", "Quality control of medicines"],
    institutions: ["guinea-ministry-of-health"],
    links: [CLINREGS_GN, AMA] }),

  i({ id: "pnlcc-guinea", name: "Programme National de Lutte contre le Cancer, Guinée (PNLCC)", aka: ["PNLCC Guinée", "National Cancer Control Programme, Guinea"],
    city: "Conakry", country: "GN", lat: 9.517, lng: -13.7, institutionType: "government",
    tldr: "Guinea's national cancer programme, part of the health ministry. Its work covers prevention, screening, care, palliative care, research and cancer registration.",
    summary: "The programme's UICC member page lists its scope as prevention, early detection, screening, care, palliation, research, cancer registration, monitoring and surveillance, organised on the six pillars of the Guinean health system, and gives its address as Corniche Nord, Centre de santé du Port, Conakry. At the ministry's World Cancer Day event in February 2025 its coordinator reported registry data of 840 new cases and 595 deaths. The coordinates are an approximate Conakry city point.",
    programs: ["Prevention, screening and early detection", "Cancer registration and surveillance", "Palliative care"],
    // TODO: re-link registre-cancers-guinee (defined in the country deep dive, PR #395) once it merges.
    institutions: ["guinea-ministry-of-health"],
    links: [UICC_PNLCC_GN, GN_WCD] }),

  // ───────────────────────── Benin ─────────────────────────
  i({ id: "benin-ministry-of-health", name: "Ministère de la Santé, Bénin", aka: ["Ministry of Health, Benin"],
    city: "Cotonou", country: "BJ", lat: 6.368, lng: 2.425, institutionType: "government", website: "https://sante.gouv.bj/",
    tldr: "Benin's health ministry. Its cancer plan for 2024 to 2028 notes that radiotherapy was not yet available in the country, and in December 2025 it added the vaccine against cervical cancer to routine vaccination for girls aged 9 to 14.",
    summary: "The ministry's Plan national de lutte contre les cancers au Bénin 2024 to 2028 (January 2024) says it set up a population-based cancer registry in Cotonou in 2014 under the national non-communicable disease programme, with a second in Parakou in 2017. It describes chemotherapy organised within each speciality in the absence of medical oncologists, blood cancers treated mainly at CNHU-HKM and CHUD Ouémé-Plateau, childhood cancers at those two hospitals, a gynaecological oncology unit at CHU-MEL, and no radiotherapy yet, with a cancer centre including radiotherapy and nuclear medicine under construction at Abomey-Calavi. On 2 December 2025 the minister launched a national HPV vaccination campaign for girls aged 9 to 14, integrating the vaccine into the expanded programme on immunisation. The coordinates are an approximate Cotonou city point.",
    programs: ["Plan national de lutte contre les cancers 2024 to 2028", "HPV vaccination for girls aged 9 to 14 (from December 2025)", "Population-based cancer registries in Cotonou and Parakou"],
    institutions: ["abmed-benin", "cotonou-cancer-registry", "parakou-cancer-registry", "cnhu-hkm-cotonou", "chud-oueme-plateau"],
    cancers: ["cervical", "breast-cancer", "prostate"],
    links: [BJ_PLAN, { label: "Ministère de la Santé, Bénin: national HPV vaccination campaign (December 2025)", url: "https://sante.gouv.bj/article/actualites/prevention-du-cancer-du-col-de-luterus-le-benin-lance-la-campagne-nationale-contre-le-hpv-827" }] }),

  i({ id: "abmed-benin", name: "Agence Béninoise du Médicament et des autres produits de Santé (ABMed)", aka: ["ABMed", "Benin Medicines Agency"],
    city: "Cotonou", country: "BJ", lat: 6.368, lng: 2.425, institutionType: "government", website: "https://abmed.bj/",
    tldr: "Benin's medicines regulator, a public agency under the health ministry. It approves medicines, authorises clinical trials, licenses pharmaceutical businesses and monitors the safety of medicines.",
    summary: "ABMed describes itself as a public establishment with legal personality and financial autonomy under the supervision of the Ministry of Health, charged by Decree 2023-422 of 26 July 2023 with coordinating national policy on medicines and other health products and controlling the pharmaceutical sector. Its directorates cover inspection and regulation, vigilance and market surveillance, registration and clinical trials, and quality. Its site offers applications for marketing authorisation and for clinical trial authorisation, adverse event reporting and a register of approved products. Benin signed the African Medicines Agency treaty on 3 December 2019 and ratified it on 28 July 2021. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Benin. The coordinates are an approximate Cotonou city point; the agency gives offices in Cotonou and Parakou.",
    programs: ["Marketing authorisation (homologation)", "Clinical trial authorisation", "Pharmacovigilance and market surveillance"],
    institutions: ["benin-ministry-of-health"],
    links: [ABMED_PRES, { label: "ABMed", url: "https://abmed.bj/" }, AMA] }),

  i({ id: "cotonou-cancer-registry", name: "Registre des Cancers de Cotonou", aka: ["Cotonou Cancer Registry", "RCC"],
    city: "Cotonou", country: "BJ", lat: 6.368, lng: 2.425, institutionType: "research-institute", website: AFCRN_COTONOU,
    tldr: "Benin's population-based cancer registry for the city of Cotonou, set up by the health ministry in 2014. It is a member of the African Cancer Registry Network.",
    summary: "The African Cancer Registry Network page says cancer registration in Benin began in 2013 with a pathology registry at the Cotonou medical school, and that in 2014 the Ministry of Health established a population-based registry under the national programme against non-communicable diseases, which finances it. It covers the city of Cotonou (678,874 people, 2013 estimate), collecting actively from 28 sources (9 hospitals, 14 private clinics and 5 private pathology laboratories), with the national teaching hospital (CNHU) the most important. The national cancer plan of January 2024 reports 1,086 cases registered in 2014 to 2016 (608 in women, 478 in men), age-standardised incidence of 78.4 per 100,000 in women and 91.8 in men, and prostate cancer as about a quarter of men's cancers, while noting the data are not exhaustive. The coordinates are an approximate Cotonou city point.",
    programs: ["Population-based cancer registration for Cotonou (from 2014)", "African Cancer Registry Network member registry"],
    institutions: ["benin-ministry-of-health", "cnhu-hkm-cotonou", "parakou-cancer-registry", "iarc"],
    cancers: ["prostate", "breast-cancer", "cervical"],
    links: [{ label: "African Cancer Registry Network: Cotonou Cancer Registry", url: AFCRN_COTONOU }, BJ_PLAN] }),

  i({ id: "parakou-cancer-registry", name: "Registre des Cancers de Parakou", aka: ["Parakou Cancer Registry", "RCP"],
    city: "Parakou", country: "BJ", lat: 9.336, lng: 2.636, institutionType: "research-institute", website: AFCRN_PARAKOU,
    tldr: "A population-based cancer registry for the city of Parakou in northern Benin, created in 2017. It works from the pathology laboratory of the city's university hospital.",
    summary: "The African Cancer Registry Network page says the Parakou registry was created in 2017 and is the second population registry in Benin after Cotonou. It sits in the pathology laboratory of the Centre Hospitalier Universitaire Départemental du Borgou-Alibori, covers the city of Parakou (about 255,000 people at the 2013 census), uses CanReg5 and the network's standard procedure manual, and has contributed data to the NORA, SurvCan and SurvCan+ studies. Its registrar was trained in cancer registration at the Institut de Cancérologie de Libreville in 2017. The coordinates are those of the Borgou-Alibori hospital.",
    programs: ["Population-based cancer registration for Parakou (from 2017)", "African Cancer Registry Network member registry"],
    institutions: ["benin-ministry-of-health", "cotonou-cancer-registry", "ica-akanda"],
    links: [{ label: "African Cancer Registry Network: Parakou Cancer Registry", url: AFCRN_PARAKOU }, BJ_PLAN] }),

  i({ id: "cnhu-hkm-cotonou", name: "Centre National Hospitalier Universitaire Hubert Koutoukou Maga (CNHU-HKM)", aka: ["CNHU-HKM", "CNHU Cotonou", "Hubert Koutoukou Maga National University Hospital"],
    city: "Cotonou", country: "BJ", lat: 6.354, lng: 2.41, institutionType: "hospital",
    tldr: "Benin's national teaching hospital in Cotonou. It treats blood cancers and childhood cancers and gives chemotherapy, and it is the main source of cases for the Cotonou cancer registry.",
    summary: "The national cancer plan of January 2024 says blood cancers in Benin are treated mainly at the university clinic for blood diseases of CNHU-HKM and at CHUD Ouémé-Plateau, that childhood cancers are managed at those same two hospitals, and that an onco-haematology unit and a chemotherapy unit were set up at the CNHU. The African Cancer Registry Network calls the national teaching hospital the most important source of information for the Cotonou cancer registry. The plan notes there was no radiotherapy in the country. OnCo could not reach the hospital's website.",
    programs: ["University clinic for blood diseases (onco-haematology)", "Chemotherapy unit", "Childhood cancer care"],
    institutions: ["benin-ministry-of-health", "cotonou-cancer-registry"],
    links: [BJ_PLAN, { label: "African Cancer Registry Network: Cotonou Cancer Registry", url: AFCRN_COTONOU }] }),

  i({ id: "chud-oueme-plateau", name: "Centre Hospitalier Universitaire Départemental de l'Ouémé-Plateau (CHUD-OP)", aka: ["CHUD-OP", "CHUD Ouémé-Plateau", "Porto-Novo university hospital"],
    city: "Porto-Novo", country: "BJ", lat: 6.499, lng: 2.625, institutionType: "hospital",
    tldr: "A university hospital in Porto-Novo, Benin's capital, with a children's cancer unit. It also treats blood cancers.",
    summary: "The national cancer plan of January 2024 says a paediatric oncology unit was set up at CHUD-OP in Porto-Novo, that childhood cancers are managed there and at CNHU-HKM, and that blood cancers are treated mainly at those two hospitals. The UICC page of the Fondation Claudine Talon says the foundation built and equipped, in May 2022 at the hospital in Porto-Novo, a public medical centre for treating children's cancers; OnCo has not confirmed from a second source that this is the same unit. The coordinates are an approximate Porto-Novo city point.",
    programs: ["Paediatric oncology unit", "Treatment of blood cancers"],
    institutions: ["benin-ministry-of-health", "cnhu-hkm-cotonou"],
    links: [BJ_PLAN, { label: "UICC member page: Fondation Claudine Talon", url: "https://www.uicc.org/membership/fondation-claudine-talon" }] }),

  // ───────────────────────── Togo ─────────────────────────
  i({ id: "togo-ministry-of-health", name: "Ministère de la Santé, de l'Hygiène Publique, de la Couverture Sanitaire Universelle et des Assurances, Togo", aka: ["Ministry of Health, Togo"],
    city: "Lomé", country: "TG", lat: 6.13, lng: 1.216, institutionType: "government", website: "https://sante-assurances.gouv.tg/",
    tldr: "Togo's health ministry, which runs the national cancer programme. Its draft cancer plan for 2022 to 2025 found no public radiotherapy in the country and a population cancer registry still being set up.",
    summary: "The draft Plan cancer Togo 2022 to 2025 (October 2021), issued by the ministry's national cancer programme, records that the programme was created by ministerial order in 2009, that a 2015 decree provided for a national cancer institute, that work to install a cancer registry began in August 2017, that an IAEA imPACT review in September 2017 made 53 recommendations, and that a five-year paediatric oncology plan was drawn up in 2019. It notes a universal health insurance law voted in October 2021, no radiotherapy in the public sector and a private radiotherapy centre, no nuclear medicine, and the pathology laboratory of CHU Sylvanus Olympio as the only public diagnostic laboratory, so that many cases escape its records. The coordinates are an approximate Lomé city point.",
    programs: ["Programme national de lutte contre le cancer (since 2009)", "Plan cancer Togo 2022 to 2025 (draft)", "Paediatric oncology development plan (2019)"],
    institutions: ["chu-sylvanus-olympio", "cicl-lome", "iaea"],
    links: [TG_PLAN, { label: "Ministère de la Santé, Togo", url: "https://sante-assurances.gouv.tg/" }] }),

  i({ id: "chu-sylvanus-olympio", name: "Centre Hospitalier Universitaire Sylvanus Olympio", aka: ["CHU Sylvanus Olympio", "CHU-SO", "Sylvanus Olympio University Hospital"],
    city: "Lomé", country: "TG", lat: 6.13, lng: 1.216, institutionType: "hospital",
    tldr: "A university hospital in Lomé whose pathology laboratory diagnoses most solid cancers in Togo's public sector. It also has the paediatric unit the national cancer plan builds children's cancer care around.",
    summary: "The draft national cancer plan for 2022 to 2025 describes the pathology laboratory of CHU Sylvanus Olympio as the only public diagnostic establishment for cancer, recording about 210 cases a year from 1984 to 2008 and 217 a year from 2009 to 2016 in its laboratory register; solid tumours are recorded there and blood cancers in haematology services. The plan proposes strengthening the hospital's paediatric unit for paediatric oncology. OnCo could not reach the hospital's website. The coordinates are an approximate Lomé city point.",
    programs: ["Pathology laboratory", "Paediatric oncology (paediatric unit)"],
    institutions: ["togo-ministry-of-health"],
    links: [TG_PLAN] }),

  i({ id: "cicl-lome", name: "Centre International de Cancérologie de Lomé (CICL)", aka: ["CICL", "International Cancer Centre of Lomé"],
    city: "Lomé", country: "TG", lat: 6.13, lng: 1.216, institutionType: "cancer-center",
    tldr: "A cancer centre in Lomé with a radiotherapy machine, inaugurated by the health minister in November 2022. The national cancer plan describes radiotherapy in Togo as private, not public.",
    summary: "The Togolese government portal reported on 3 November 2022 that the health minister inaugurated the Centre International de Cancérologie de Lomé, with screening equipment as well as treatment. IAEA DIRAC lists it in Lomé (Rue de l'Ecosse, Amadahome) with one linear accelerator and no brachytherapy, updated in 2025. The draft national cancer plan for 2022 to 2025 notes a private radiotherapy centre and no radiotherapy in the public sector. OnCo could not reach a website for the centre. The coordinates are an approximate Lomé city point, because DIRAC's point lies outside Lomé.",
    programs: ["External beam radiotherapy (one linear accelerator)", "Cancer screening"],
    institutions: ["togo-ministry-of-health", "iaea"],
    links: [{ label: "République Togolaise: Le Togo se dote d'un centre de cancérologie (3 November 2022)", url: "https://www.republicoftogo.com/toutes-les-rubriques/sante/le-togo-se-dote-d-un-centre-de-cancerologie" }, DIRAC, TG_PLAN] }),

  // ───────────────────────── Sierra Leone ─────────────────────────
  i({ id: "connaught-hospital-freetown", name: "Connaught Hospital, Freetown", aka: ["Connaught Teaching Hospital Complex", "Connaught Hospital"],
    city: "Freetown", country: "SL", lat: 8.489, lng: -13.238, institutionType: "hospital",
    tldr: "A teaching hospital in Freetown where people with breast cancer are seen in a specialist outpatient clinic and treated with surgery, chemotherapy and hormone therapy. Sierra Leone has no radiotherapy.",
    summary: "A retrospective study in BMC Cancer (2025) of 253 breast cancer patients seen at the specialist outpatient clinic of the Connaught Teaching Hospital Complex from 2018 to 2021 found a mean age of 47, about 47% presenting at stage IIIB and 13.8% with metastases; treatment included mastectomy (48%), neoadjuvant chemotherapy (29.2%), adjuvant chemotherapy (33.6%), hormone therapy (39.2%) and palliative care (14%), and about 15% refused or did not start treatment. The authors call for better pathology services and access to radiotherapy. IAEA DIRAC lists no radiotherapy centre in Sierra Leone. OnCo did not find the hospital's own website.",
    programs: ["Specialist outpatient breast cancer clinic", "Surgery, chemotherapy and hormone therapy"],
    institutions: ["sierra-leone-national-cancer-registry", "pharmacy-board-sierra-leone"],
    cancers: ["breast-cancer"],
    links: [{ label: "Cummings-John et al., breast cancer at Connaught Hospital, Sierra Leone (BMC Cancer 2025)", url: "https://doi.org/10.1186/s12885-025-13429-0" }, DIRAC] }),

  i({ id: "sierra-leone-national-cancer-registry", name: "Sierra Leone National Cancer Registry", aka: ["National Cancer Registry, Sierra Leone"],
    city: "Freetown", country: "SL", lat: 8.479, lng: -13.268, institutionType: "research-institute",
    tldr: "Sierra Leone's national cancer registry, launched in Freetown in June 2012 with support from the World Health Organization.",
    summary: "WHO's regional office reported that Sierra Leone launched a National Cancer Registry, together with the Sierra Leone Cancer Charity, on 12 June 2012 in Freetown; the deputy health minister launched it on behalf of the President, WHO supported its establishment technically and financially, and its head asked for more support for staff to manage cancer patients and for research and surveillance. OnCo has not found a later report from the registry or a member page on the African Cancer Registry Network. The coordinates are an approximate Freetown city point.",
    programs: ["National cancer registration (from 2012)"],
    institutions: ["connaught-hospital-freetown", "who"],
    links: [{ label: "WHO Africa: Sierra Leone launches National Cancer Registry (12 June 2012)", url: "https://www.afro.who.int/pt/node/2591" }] }),

  i({ id: "pharmacy-board-sierra-leone", name: "Pharmacy Board of Sierra Leone (PBSL)", aka: ["PBSL", "Pharmacy Board, Sierra Leone"],
    city: "Freetown", country: "SL", lat: 8.479, lng: -13.268, institutionType: "government", website: "https://pharmacyboard.gov.sl/",
    tldr: "Sierra Leone's medicines regulator, within the Ministry of Health. It registers medicines, licenses pharmacies and pharmacists, approves clinical trials and collects reports of side effects.",
    summary: "NIH ClinRegs (Sierra Leone profile) says the Pharmacy Board was established by Act of Parliament in 1988 and re-established by the Pharmacy and Drugs Act 2001 to regulate medicines, medical devices, cosmetics, food supplements and herbal products and the practice of pharmacy, operating within the Ministry of Health; it is the authority for clinical trial approval, oversight and inspection, with an Expert Committee on Pharmacovigilance and Clinical Trials and a Pharmacovigilance and Clinical Trials department. ClinRegs gives its address as the Central Medical Stores compound, New England Ville, Freetown. Sierra Leone signed the African Medicines Agency treaty on 10 February 2020 and ratified it on 28 May 2021; WHO's August 2026 list of regulators at maturity level 3 or 4 does not include it. The coordinates are an approximate Freetown city point.",
    programs: ["Medicines registration", "Clinical trial authorisation and inspection", "Pharmacovigilance"],
    institutions: ["connaught-hospital-freetown"],
    links: [{ label: "NIH ClinRegs: Sierra Leone", url: "https://clinregs.niaid.nih.gov/country/sierra-leone" }, { label: "Pharmacy Board of Sierra Leone", url: "https://pharmacyboard.gov.sl/" }, AMA] }),

  // ───────────────────────── Liberia ─────────────────────────
  i({ id: "liberia-ministry-of-health", name: "Ministry of Health, Liberia", aka: ["MOH Liberia"],
    city: "Monrovia", country: "LR", lat: 6.32, lng: -10.806, institutionType: "government", website: "https://moh.gov.lr/",
    tldr: "Liberia's health ministry. In October 2025 it launched a breast cancer awareness campaign and pledged to build the country's radiotherapy centre, with the World Health Organization planning to expand screening and restart the national cancer registry.",
    summary: "On 1 October 2025 the Ministry of Health launched an annual breast cancer awareness campaign and pledged to expand early detection and to construct a radiotherapy centre for Liberia, backed by the President and supported by WHO. WHO announced plans with the ministry to scale up breast cancer screening in 30 primary health care facilities within six months, train 120 health workers and reactivate the National Cancer Registry with updated software. The acting head of the oncology unit at JFK hospital spoke at the launch. IAEA DIRAC lists no radiotherapy centre in Liberia. The coordinates are an approximate Monrovia city point.",
    programs: ["Breast cancer awareness and early detection campaign (from 2025)", "Planned national radiotherapy centre"],
    institutions: ["jfk-medical-center-monrovia", "lmhra-liberia", "who"],
    cancers: ["breast-cancer", "cervical"],
    links: [{ label: "Ministry of Health, Liberia: breast cancer awareness launch (1 October 2025)", url: "https://moh.gov.lr/news/2025/moh-launches-breast-cancer-awarenesswith-new-focus-on-early-detection-and-treatment/" }, DIRAC] }),

  i({ id: "jfk-medical-center-monrovia", name: "John F. Kennedy Medical Center, Monrovia", aka: ["JFK Medical Center", "JFK Hospital", "JFKMC"],
    city: "Monrovia", country: "LR", lat: 6.287, lng: -10.774, institutionType: "hospital", website: "https://jfkmc.gov.lr/",
    tldr: "A government hospital in Monrovia with an oncology unit that diagnoses and treats cancer and gives chemotherapy and supportive care.",
    summary: "The hospital's oncology page describes a unit dedicated to diagnosing and treating cancer, administering chemotherapy and other treatments, with pain management, nutritional support, counselling and palliative care. The page also lists radiation therapy among the treatments; the Ministry of Health said in October 2025 that Liberia's radiotherapy centre was still to be built, and IAEA DIRAC lists no radiotherapy centre in the country. The acting head of the hospital's oncology unit spoke at the ministry's 2025 breast cancer campaign launch. The hospital also runs schools of nursing, physician assistants and laboratory technology.",
    programs: ["Oncology unit: chemotherapy, supportive and palliative care"],
    institutions: ["liberia-ministry-of-health"],
    links: [{ label: "JFK Medical Center: Oncology", url: "https://jfkmc.gov.lr/oncology/" }, { label: "Ministry of Health, Liberia: breast cancer awareness launch (1 October 2025)", url: "https://moh.gov.lr/news/2025/moh-launches-breast-cancer-awarenesswith-new-focus-on-early-detection-and-treatment/" }, DIRAC] }),

  i({ id: "lmhra-liberia", name: "Liberia Medicines and Health Products Regulatory Authority (LMHRA)", aka: ["LMHRA"],
    city: "Monrovia", country: "LR", lat: 6.32, lng: -10.806, institutionType: "government", website: "https://lmhra.gov.lr/",
    tldr: "Liberia's medicines regulator, an autonomous agency. It registers medicines, licenses and inspects, controls imports, tests quality and authorises clinical trials.",
    summary: "NIH ClinRegs (Liberia profile) says that under the LMHRA Act the authority is an autonomous government agency reporting to the President, responsible for clinical trial approval, oversight and inspection, and for medicine and health product registration, inspections, import and export control, licensing, quality control, advertising and pharmacovigilance. A Clinical Trials Unit in its Pharmacovigilance and Clinical Trials Department receives and assesses applications and runs good clinical practice inspections, supported by a Scientific Advisory Committee. Its website gives its office as the Clay Building, Sekou Toure Avenue, Mamba Point, Monrovia. The African Union's 2023 list shows Liberia had not signed the African Medicines Agency treaty. The coordinates are an approximate Monrovia city point.",
    programs: ["Medicines registration", "Clinical trial authorisation", "Pharmacovigilance and post-marketing surveillance", "Quality control laboratory"],
    institutions: ["liberia-ministry-of-health"],
    links: [{ label: "NIH ClinRegs: Liberia", url: "https://clinregs.niaid.nih.gov/country/liberia" }, { label: "LMHRA", url: "https://lmhra.gov.lr/" }, AMA] }),

  // ───────────────────────── Mauritania ─────────────────────────
  i({ id: "cno-nouakchott", name: "Centre National d'Oncologie, Nouakchott (CNO)", aka: ["CNO", "National Oncology Centre, Mauritania"],
    city: "Nouakchott", country: "MR", lat: 18.074, lng: -15.958, institutionType: "cancer-center",
    tldr: "Mauritania's national cancer centre in Nouakchott, created in 2009, with chemotherapy, radiotherapy and radioiodine treatment. The government's cancer plan says it treats cancer free of charge and greatly reduced the need to send patients abroad.",
    summary: "The Plan national de lutte contre le cancer 2018 to 2022 says the CNO was created in 2009 after cancer had become 42% of medical evacuations abroad (441 of 1,366 in 2008, according to the national health insurance fund), with aims including cutting evacuations by 80% and guaranteeing free medicines for people without means. It credits the centre with reducing evacuations by more than 98% for chemotherapy and 100% for radiotherapy, reports about 2,080 patients treated by 30 August 2012, more than 1,000 patients a year, and 94% of care paid as care for the indigent against 6% by the insurance fund. It has chemotherapy, radiotherapy and radioiodine units, a nuclear medicine unit was under way, and the plan found no organised palliative care outside it. IAEA DIRAC lists three linear accelerators, one cobalt unit and brachytherapy, last updated in 2019. The Ithar charity association has an office inside the centre serving more than 3,600 registered patients, according to its UICC page.",
    programs: ["Radiotherapy (three linear accelerators, cobalt, brachytherapy)", "Chemotherapy", "Radioiodine therapy", "Palliative care"],
    institutions: ["mauritania-ministry-of-health", "cnam-mauritania", "iaea"],
    links: [MR_PLAN, DIRAC, { label: "UICC member page: Ithar Charity Association for Cancer Patients Care", url: "https://www.uicc.org/membership/ithar-charity-association-cancer-patients-care" }] }),

  i({ id: "mauritania-ministry-of-health", name: "Ministère de la Santé, Mauritanie", aka: ["Ministry of Health, Mauritania"],
    city: "Nouakchott", country: "MR", lat: 18.079, lng: -15.978, institutionType: "government",
    tldr: "Mauritania's health ministry. Its national cancer plan for 2018 to 2022 recorded 1,115 new cancer cases in 2016 and found that the cancer registry was not yet formally established.",
    summary: "The ministry's Plan national de lutte contre le cancer 2018 to 2022, issued by its directorate for disease control, records 1,115 new cases registered in 2016 and describes the Centre National d'Oncologie, created in 2009, as the national reference centre. It says the ministry set up a registry management team trained with support from the African Cancer Registry Network, IARC, the IAEA and WHO, but that the registry was not institutionalised, had no dedicated staff, premises or budget, and worked as a coordination committee. Opioids were available only in Nouakchott. The ministry's website reset the connection when read. The coordinates are an approximate Nouakchott city point.",
    programs: ["Plan national de lutte contre le cancer 2018 to 2022", "Cancer registry team (coordination committee)"],
    institutions: ["cno-nouakchott", "cnam-mauritania"],
    links: [MR_PLAN] }),

  i({ id: "cnam-mauritania", name: "Caisse Nationale d'Assurance Maladie, Mauritanie (CNAM)", aka: ["CNAM Mauritanie", "National Health Insurance Fund, Mauritania"],
    city: "Nouakchott", country: "MR", lat: 18.079, lng: -15.978, institutionType: "government", website: "https://www.cnam.mr/fr/",
    tldr: "Mauritania's national health insurance fund. It reimburses care at contracted providers and approves treatment abroad through prior evacuation.",
    summary: "The fund's website tells insured people to check that a provider, in Mauritania or abroad, is contracted with it, or bills will not be reimbursed, and that care abroad without a prior evacuation is reimbursed only at the national rate. The national cancer plan of 2018 cites its figures: in 2008, 441 of 1,366 patients evacuated abroad (42%) had cancer, at an estimated 1.5 billion ouguiyas; the plan says that at the Centre National d'Oncologie the fund paid for 6% of patients, with 94% covered as indigent care. The coordinates are an approximate Nouakchott city point.",
    programs: ["Compulsory health insurance", "Medical evacuation abroad"],
    institutions: ["mauritania-ministry-of-health", "cno-nouakchott"],
    links: [{ label: "CNAM Mauritanie", url: "https://www.cnam.mr/fr/" }, MR_PLAN] }),

  // ───────────────────────── Republic of the Congo ─────────────────────────
  i({ id: "congo-ministry-of-health", name: "Ministère de la Santé et de la Population, République du Congo", aka: ["Ministry of Health and Population, Republic of the Congo"],
    city: "Brazzaville", country: "CG", lat: -4.269, lng: 15.271, institutionType: "government", website: "https://sante.gouv.cg/",
    tldr: "The health ministry of the Republic of the Congo, which runs the national cancer programme. Its plan for 2022 to 2026 found no working radiotherapy in the country and aims to provide it in two general hospitals.",
    summary: "The ministry's Plan stratégique national de lutte contre le cancer 2022 to 2026 (March 2023) says the national cancer programme (PNLC) was created by Decree 2019-228 of 15 August 2019. It counts four medical oncology services, one paediatric oncology service, one onco-haematology unit and one radiotherapy service that was not working, with 13 medical oncologists and one radiation oncologist in 2022, and sets a target of two general hospitals (one in Pointe-Noire, one in Brazzaville) offering radiotherapy and nuclear medicine. It records Law 37-2014 of 27 June 2014 instituting universal health insurance. On 1 October 2026 the ministry launched Octobre Rose and a national consultation on a \"90 days against cancer\" initiative, including an evaluation of the plan. IAEA DIRAC lists no radiotherapy centre in the country. The coordinates are an approximate Brazzaville city point.",
    programs: ["Programme National de Lutte contre le Cancer (Decree 2019-228)", "Plan stratégique national de lutte contre le cancer 2022 to 2026", "90 jours contre le cancer (2026)"],
    institutions: ["chu-brazzaville", "brazzaville-cancer-registry"],
    links: [CG_PLAN, { label: "Ministère de la Santé, Congo: Octobre Rose and 90 days against cancer (October 2026)", url: "https://sante.gouv.cg/cancer-le-ministere-de-la-sante-lance-les-activites-doctobre-rose-et-linitiative-nationale-90-jours-contre-le-cancer/" }, DIRAC] }),

  i({ id: "chu-brazzaville", name: "Centre Hospitalier Universitaire de Brazzaville", aka: ["CHU de Brazzaville", "Brazzaville University Hospital"],
    city: "Brazzaville", country: "CG", lat: -4.269, lng: 15.271, institutionType: "hospital",
    tldr: "The university hospital of Brazzaville, whose cancer and radiotherapy service dates from 1981. It houses the city's cancer registry and the country's histopathology laboratory.",
    summary: "The national cancer plan of March 2023 records that a Service de Carcinologie et Radiothérapie was created on 5 December 1981 within the Hôpital Général de Brazzaville, which became the CHU in 1988, to treat people with cancer, gather information for prevention and train oncologists. The African Cancer Registry Network page for the Brazzaville registry, written about 2012, says the registry sits in that service's records section, that the service was by far the largest source of registrations (43% in 2011), that the CHU had the only histopathology laboratory in Brazzaville, and that its cobalt unit was not working for lack of a radiotherapist and physicist. The 2023 plan still records no working radiotherapy in the country, and IAEA DIRAC lists none. The hospital's website had an expired certificate. The coordinates are an approximate Brazzaville city point.",
    programs: ["Service de Carcinologie et Radiothérapie (since 1981)", "Histopathology laboratory"],
    institutions: ["brazzaville-cancer-registry", "congo-ministry-of-health"],
    links: [CG_PLAN, { label: "African Cancer Registry Network: Registre des cancers de Brazzaville", url: AFCRN_BRAZZA }, DIRAC] }),

  i({ id: "brazzaville-cancer-registry", name: "Registre des cancers de Brazzaville", aka: ["Brazzaville Cancer Registry", "RCB"],
    city: "Brazzaville", country: "CG", lat: -4.269, lng: 15.271, institutionType: "research-institute", website: AFCRN_BRAZZA,
    tldr: "The population-based cancer registry for Brazzaville, founded in 1995 and based at the city's university hospital. It is a member of the African Cancer Registry Network.",
    summary: "The African Cancer Registry Network page says the registry was founded in 1995, sits in the records section of the Service de Carcinologie et Radiothérapie of CHU de Brazzaville, is financed by the Ministry of Health and Marien Ngouabi University, and registers cases from all of Brazzaville (1,376,382 people at the 2007 census) from four hospitals and four private clinics, using CanReg5 since 2012; its most recent report then was for 2011, with 495 cases. The national cancer plan of March 2023 cites it for 144 childhood cancers (9.5% of cases) in 2018 to 2019 and plans a national registry. The coordinates are an approximate Brazzaville city point.",
    programs: ["Population-based cancer registration for Brazzaville (from 1995)", "African Cancer Registry Network member registry"],
    institutions: ["chu-brazzaville", "congo-ministry-of-health", "iarc"],
    links: [{ label: "African Cancer Registry Network: Registre des cancers de Brazzaville", url: AFCRN_BRAZZA }, CG_PLAN] }),

  // ───────────────────────── Central African Republic ─────────────────────────
  i({ id: "car-ministry-of-health", name: "Ministère de la Santé et de la Population, République centrafricaine", aka: ["Ministry of Health and Population, Central African Republic", "Ministry of Public Health and Population, CAR"],
    city: "Bangui", country: "CF", lat: 4.364, lng: 18.584, institutionType: "government", website: "https://www.sante.gouv.cf/",
    tldr: "The Central African Republic's health ministry. A 2021 international review it requested found no national cancer programme, no population cancer registry and no radiotherapy in the country.",
    summary: "At the ministry's request, the IAEA, WHO's African regional office and IARC carried out an imPACT review from September 2020 to March 2021. Its summary found a plan for non-communicable diseases (2015 to 2021) but no national cancer control programme, no population-based cancer registry (data come from the country's pathology laboratory and the oncology departments of Bangui hospitals), no HPV vaccination, two medical and two paediatric oncologists, chemotherapy given in a paediatric department with families paying, no radiotherapy and no morphine. It recommended a cancer registry, a medical oncology department at the Hôpital Communautaire or the national teaching hospital, and an autonomous paediatric oncology service at the paediatric teaching hospital. The coordinates are an approximate Bangui city point.",
    programs: ["Non-communicable disease plan 2015 to 2021", "imPACT review (2020 to 2021)"],
    institutions: ["chu-pediatrique-bangui", "cnhu-bangui", "iaea", "iarc"],
    links: [CF_IMPACT, { label: "Ministère de la Santé et de la Population, République centrafricaine", url: "https://www.sante.gouv.cf/" }] }),

  i({ id: "chu-pediatrique-bangui", name: "Centre Hospitalier Universitaire Pédiatrique de Bangui (CHUPB)", aka: ["CHUPB", "CHUP Bangui", "Complexe pédiatrique de Bangui", "Paediatric Teaching Hospital, Bangui"],
    city: "Bangui", country: "CF", lat: 4.372, lng: 18.575, institutionType: "hospital",
    tldr: "The children's teaching hospital in Bangui. A 2021 review found chemotherapy in the Central African Republic was given in a paediatric department and recommended a children's cancer service here.",
    summary: "The IAEA imPACT review summary for the Central African Republic (2021) lists the Paediatric Teaching Hospital Centre (CHUP) among the five reference hospitals in Bangui, reports that chemotherapy in the country was carried out in the paediatric department with limited access to medicines and families paying, and recommends developing a paediatric oncology unit at CHUP and then an autonomous paediatric oncology service with pathology, flow cytometry and immunophenotyping. The coordinates are OpenStreetMap's point for the Complexe pédiatrique in Bangui.",
    programs: ["Paediatric chemotherapy"],
    institutions: ["car-ministry-of-health"],
    links: [CF_IMPACT] }),

  i({ id: "cnhu-bangui", name: "Centre National Hospitalier Universitaire de Bangui (CNHUB)", aka: ["CNHUB", "National Teaching Hospital Centre, University of Bangui"],
    city: "Bangui", country: "CF", lat: 4.364, lng: 18.584, institutionType: "hospital",
    tldr: "The national teaching hospital of the Central African Republic in Bangui. A new national imaging centre there was waiting for equipment, including a scanner and mammography, in 2021.",
    summary: "The IAEA imPACT review summary for the Central African Republic (2021) says the radiology departments of the five university hospitals had old, non-digital equipment, that CT and MRI were not available, and that CNHUB had a new national imaging centre, set up at the end of 2020, waiting for equipment including CT and mammography. It recommends breast examinations at CNHUB and the other teaching hospitals, strengthening its pathology department, and a medical oncology department at the Hôpital Communautaire or CNHUB. The coordinates are an approximate Bangui city point.",
    programs: ["National imaging centre (awaiting equipment in 2021)"],
    institutions: ["car-ministry-of-health"],
    links: [CF_IMPACT] }),

  // ───────────────────────── The Gambia ─────────────────────────
  i({ id: "efsth-banjul", name: "Edward Francis Small Teaching Hospital (EFSTH)", aka: ["EFSTH"],
    city: "Banjul", country: "GM", lat: 13.457, lng: -16.577, institutionType: "hospital", website: "https://efsth.gm/",
    tldr: "The Gambia's teaching hospital in Banjul, where children's cancer services were newly set up in 2022. A study of its first year found most families could not get chemotherapy medicines, and no child had radiotherapy.",
    summary: "A prospective study by the hospital's paediatric and surgical staff (Health Science Reports 2024) followed 44 children with cancer seen in its paediatric units from November 2022 to October 2023, describing newly established paediatric oncology services: Wilms tumour (27.3%) and leukaemia (25%) were commonest, median time from first symptom to diagnosis was 62.5 days, treatment refusal and abandonment were 20.5% and 13.6%, families of 93.8% could not obtain cytotoxic drugs because of unavailability or cost, and none had platelet transfusion or radiotherapy. The hospital's site lists emergency care, surgery, paediatrics, laboratory services and imaging including CT and MRI. IAEA DIRAC lists no radiotherapy centre in The Gambia.",
    programs: ["Paediatric oncology (from 2022)", "Surgery", "Imaging including CT and MRI"],
    institutions: ["gambia-national-cancer-registry", "mca-gambia"],
    links: [{ label: "Edward Francis Small Teaching Hospital", url: "https://efsth.gm/" }, GM_EFSTH_PAPER, DIRAC] }),

  i({ id: "gambia-national-cancer-registry", name: "National Cancer Registry of The Gambia", aka: ["Gambia National Cancer Registry", "NCR Gambia"],
    city: "Fajara", country: "GM", lat: 13.469, lng: -16.691, institutionType: "research-institute",
    tldr: "The Gambia's nationwide population-based cancer registry, set up in 1986 to measure whether infant hepatitis B vaccination would prevent liver cancer. Liver cancer was the commonest cancer in men and cervical cancer in women.",
    summary: "The registry was established in 1986 within the Gambia Hepatitis Intervention Study, a randomised trial of infant hepatitis B vaccination applied to public health policy, to collect data on every cancer diagnosed nationwide. A PLoS One paper by its staff (2013), with an author affiliation at the National Cancer Registry, Fajara, analysed 1990 to 2009: in men liver cancer made up 60% of cancers, then prostate, lung, non-Hodgkin lymphoma and stomach; in women cervical cancer 33%, liver 24% and breast 11%. Incidence was stable, and the data were not yet enough to detect an effect of vaccination on liver cancer. The coordinates are an approximate point for Fajara.",
    programs: ["Nationwide population-based cancer registration (from 1986)", "Gambia Hepatitis Intervention Study follow-up"],
    institutions: ["efsth-banjul", "iarc"],
    cancers: ["hcc", "cervical", "breast-cancer", "prostate"],
    links: [GM_NCR_PAPER] }),

  i({ id: "mca-gambia", name: "Medicines Control Agency, The Gambia (MCA)", aka: ["MCA Gambia"],
    city: "Banjul", country: "GM", lat: 13.455, lng: -16.576, institutionType: "government", website: "https://www.mca.gm/",
    tldr: "The Gambia's medicines regulator, set up by law in 2014. It registers medicines, inspects, licenses, tests quality, monitors side effects and oversees clinical trials.",
    summary: "The agency's site says the Medicines and Related Products Act 2014 established the Medicines Control Agency, with a mission of the highest standards of quality, safety and efficacy for medicines, and lists its services as product registration, post-market surveillance and inspection, licensing, quality control testing, pharmacovigilance and clinical trial oversight. The Ministry of Health lists it among its agencies. The African Union's 2023 list shows The Gambia had not signed the African Medicines Agency treaty. The coordinates are an approximate Banjul city point.",
    programs: ["Product registration", "Pharmacovigilance", "Clinical trial oversight", "Quality control testing"],
    institutions: ["efsth-banjul"],
    links: [{ label: "Medicines Control Agency, The Gambia", url: "https://www.mca.gm/" }, { label: "Ministry of Health, The Gambia (agencies listed in its navigation)", url: "https://moh.gov.gm/" }, AMA] }),

  // ───────────────────────── Guinea-Bissau ─────────────────────────
  i({ id: "guinea-bissau-ministry-of-health", name: "Ministério da Saúde Pública, Guiné-Bissau (MINSAP)", aka: ["MINSAP", "Ministry of Public Health, Guinea-Bissau"],
    city: "Bissau", country: "GW", lat: 11.861, lng: -15.583, institutionType: "government", website: "https://www.minsap.gw/",
    tldr: "Guinea-Bissau's health ministry. People with cancer are sent abroad for treatment through medical boards, and in 2025 the minister said an oncology institute was being discussed with Portugal.",
    summary: "Forbes África Lusófona reported on 13 March 2025 that the Minister of Public Health, Pedro Tipote, said the possibility of establishing an oncology institute in Guinea-Bissau was being discussed in cooperation with Portugal's health ministry. The report says the lack of cancer services forces medical evacuations, arranged through medical boards (juntas médicas), and that Portugal is the only country with which Guinea-Bissau has an agreement for them. The ministry's website loads its content by script. IAEA DIRAC lists no radiotherapy centre in the country. The coordinates are an approximate Bissau city point.",
    programs: ["Medical evacuation to Portugal (juntas médicas)"],
    institutions: ["hospital-simao-mendes"],
    links: [{ label: "Forbes África Lusófona: Portugal and Guinea-Bissau discuss an oncology institute (13 March 2025)", url: "https://forbesafricalusofona.com/portugal-e-guine-bissau-analisam-possivel-criacao-de-instituto-de-oncologia/" }, DIRAC] }),

  i({ id: "hospital-simao-mendes", name: "Hospital Nacional Simão Mendes", aka: ["Simão Mendes National Hospital", "HNSM"],
    city: "Bissau", country: "GW", lat: 11.863, lng: -15.581, institutionType: "hospital",
    tldr: "Guinea-Bissau's national referral hospital in Bissau. Visiting breast surgery teams have diagnosed and operated on women with breast cancer there, most of whom arrived with advanced disease.",
    summary: "A report in JCO Global Oncology (2023), with a first author from the hospital's surgery department, describes three short surgical missions by a breast cancer team in one year at the Hospital Nacional Simão Mendes, a level A referral structure: 97 women were seen, with 21 excisional biopsies, 28 needle biopsies and five radical operations; 19 had invasive breast cancer at stage IV, few returned for treatment, and poor sample handling for lack of trained pathology technicians made 18 samples unusable. The authors call for a national cancer strategy built on local team training.",
    programs: ["Breast surgery with visiting teams"],
    institutions: ["guinea-bissau-ministry-of-health"],
    cancers: ["breast-cancer"],
    links: [{ label: "Djedjo et al., short-term breast surgical missions in Guinea-Bissau (JCO Global Oncology 2023)", url: "https://doi.org/10.1200/go.22.00317" }] }),

  // ───────────────────────── Gabon ─────────────────────────
  i({ id: "ica-akanda", name: "Institut de Cancérologie d'Akanda (ICA)", aka: ["ICA", "Institut de Cancérologie de Libreville", "Akanda Cancer Institute"],
    city: "Akanda", country: "GA", lat: 0.503, lng: 9.385, institutionType: "cancer-center",
    tldr: "Gabon's cancer institute with radiotherapy, on the campus of the military teaching hospital at Akanda, near Libreville.",
    summary: "IAEA DIRAC lists the Institut de Cancérologie de Libreville, Institut de Cancérologie d'Akanda, at Angondjé on the campus of the Hôpital d'Instruction des Armées d'Akanda (formerly CHU d'Angondjé), with two linear accelerators, a CT scanner and no brachytherapy, updated in 2026. The African Cancer Registry Network page for the Parakou registry in Benin says its registrar was trained in cancer registration and CanReg5 at the Institut de Cancérologie de Libreville in 2017. OnCo did not find the institute's own website.",
    programs: ["External beam radiotherapy (two linear accelerators)", "Cancer registration training (2017)"],
    institutions: ["cnamgs-gabon", "iaea"],
    links: [DIRAC, { label: "African Cancer Registry Network: Parakou Cancer Registry", url: AFCRN_PARAKOU }] }),

  i({ id: "cnamgs-gabon", name: "Caisse Nationale d'Assurance Maladie et de Garantie Sociale (CNAMGS)", aka: ["CNAMGS", "National Health Insurance and Social Guarantee Fund, Gabon"],
    city: "Libreville", country: "GA", lat: 0.409, lng: 9.442, institutionType: "government", website: "https://cnamgs.ga/",
    tldr: "Gabon's national health insurance fund, created in 2007. It pays for care for insured people and runs family benefits for Gabonese people on low incomes.",
    summary: "The fund's history page says Ordinance 002/PR/2007 of 4 January 2007 instituted a compulsory health insurance and social guarantee scheme in Gabon and created the CNAMGS to run it, and Ordinance 001/PR/2007 of the same date gave it the family benefits of Gabonese people classed as economically weak (GEF). Its care package page offers a long-term condition (ALD) card and states that prevention, screening and social care stay with the health ministry rather than the fund. In October 2026 it joined the Octobre Rose campaign on breast and cervical cancer. OnCo did not find on its pages a list naming the cancer treatments it covers. The coordinates are an approximate Libreville city point.",
    programs: ["Compulsory health insurance", "Long-term condition (ALD) cover", "Family benefits for GEF households"],
    institutions: ["ica-akanda"],
    links: [{ label: "CNAMGS: history", url: "https://cnamgs.ga/apropos/" }, { label: "CNAMGS: care package", url: "https://cnamgs.ga/le-panier-de-soins-de-la-cnamgs/" }, { label: "CNAMGS: Octobre Rose (October 2026)", url: "https://cnamgs.ga/2026/10/07/celebration-octobre-rose/" }] }),

  // ───────────────────────── Cabo Verde ─────────────────────────
  i({ id: "cabo-verde-ministry-of-health", name: "Ministério da Saúde, Cabo Verde", aka: ["Ministry of Health, Cabo Verde", "Ministry of Health, Cape Verde"],
    city: "Praia", country: "CV", lat: 14.916, lng: -23.51, institutionType: "government", website: "https://minsaude.gov.cv/",
    tldr: "Cabo Verde's health ministry. It runs the national cancer prevention and control programme, opened an oncology service at the Praia hospital and in 2023 launched breast cancer early diagnosis in primary care.",
    summary: "In February 2023 the ministry said cancers were the third cause of death in Cabo Verde, and that through the National Health Directorate's cancer programme and its hospitals it had opened a 10-bed oncology service for chemotherapy at Hospital Dr. Agostinho Neto, a molecular biology laboratory there, a national strategic cancer plan for 2018 to 2022, a cancer registry, and work toward an oncology day hospital at Hospital Dr. Baptista de Sousa. It credited the Oncologia Cabo Verde project with an 80% rise in cancer operations, an 18% rise in chemotherapy sessions and 30% fewer evacuations to Portugal between 2017 and 2020. On 26 October 2023 it launched a breast cancer early diagnosis programme in primary care, aiming to reduce advanced-stage diagnoses by 10%; the national health director said provisional 2022 data counted almost 500 cancer cases. The coordinates are an approximate Praia city point.",
    programs: ["Programa Nacional de Prevenção e Controlo das Doenças Oncológicas", "Breast cancer early diagnosis in primary care (from 2023)", "Oncologia Cabo Verde project"],
    institutions: ["hospital-agostinho-neto", "hospital-baptista-de-sousa", "cabo-verde-cancer-registry"],
    cancers: ["breast-cancer", "prostate", "cervical"],
    links: [CV_2023_FEB, CV_2023_OCT] }),

  i({ id: "hospital-agostinho-neto", name: "Hospital Universitário Dr. Agostinho Neto", aka: ["Hospital Dr. Agostinho Neto", "HAN", "Agostinho Neto Hospital, Praia"],
    city: "Praia", country: "CV", lat: 14.92, lng: -23.506, institutionType: "hospital",
    tldr: "The central hospital in Praia, Cabo Verde, with a 10-bed oncology service for chemotherapy and a molecular biology laboratory for diagnosis.",
    summary: "The Ministry of Health reported in February 2023 the inauguration of the oncology service of Hospital Dr. Agostinho Neto, for patients having chemotherapy, with 10 beds of which 2 are adapted for patients with special needs, and the opening of the hospital's molecular biology laboratory to strengthen diagnosis. The ministry's site links to the hospital as one of the country's two central hospitals. IAEA DIRAC lists no radiotherapy centre in Cabo Verde.",
    programs: ["Oncology service for chemotherapy (10 beds)", "Molecular biology laboratory"],
    institutions: ["cabo-verde-ministry-of-health"],
    links: [CV_2023_FEB, DIRAC] }),

  i({ id: "hospital-baptista-de-sousa", name: "Hospital Dr. Baptista de Sousa", aka: ["Hospital Baptista de Sousa", "HBS", "Mindelo central hospital"],
    city: "Mindelo", country: "CV", lat: 16.885, lng: -24.985, institutionType: "hospital",
    tldr: "The central hospital in Mindelo, on São Vicente in Cabo Verde, where an oncology day hospital was being set up in 2023.",
    summary: "The Ministry of Health reported in February 2023 that it was implementing an oncology day hospital at Hospital Dr. Baptista de Sousa, as part of the national cancer programme alongside the oncology service at Hospital Dr. Agostinho Neto in Praia. OnCo has not read a description of its cancer services from the hospital itself.",
    programs: ["Oncology day hospital (in implementation, 2023)"],
    institutions: ["cabo-verde-ministry-of-health"],
    links: [CV_2023_FEB] }),

  i({ id: "cabo-verde-cancer-registry", name: "Registo Oncológico Nacional, Cabo Verde", aka: ["Cape Verde National Cancer Registry", "Cabo Verde National Cancer Registry"],
    city: "Praia", country: "CV", lat: 14.916, lng: -23.51, institutionType: "research-institute", website: "https://afcrn.org/index.php/membership/membership-list/177-cape-verde",
    tldr: "Cabo Verde's national cancer registry, a member of the African Cancer Registry Network. Its provisional data counted 69 breast cancer cases in 2022.",
    summary: "The African Cancer Registry Network lists the Cape Verde National Cancer Registry among its members, with its details not yet published. The Ministry of Health reported in February 2023 that it had implemented the cancer registry, and in October 2023 that provisional data from the Registo Oncológico counted 69 breast cancer cases in 2022. The coordinates are an approximate Praia city point.",
    programs: ["National cancer registration", "African Cancer Registry Network member registry"],
    institutions: ["cabo-verde-ministry-of-health", "iarc"],
    cancers: ["breast-cancer"],
    links: [{ label: "African Cancer Registry Network: Cape Verde National Cancer Registry", url: "https://afcrn.org/index.php/membership/membership-list/177-cape-verde" }, CV_2023_FEB, CV_2023_OCT] }),

  // ───────────────────────── São Tomé and Príncipe ─────────────────────────
  i({ id: "hospital-ayres-de-menezes", name: "Hospital Dr. Ayres de Menezes", aka: ["Hospital Ayres de Menezes", "HAM", "Ayres de Menezes Hospital"],
    city: "São Tomé", country: "ST", lat: 0.339, lng: 6.731, institutionType: "hospital",
    tldr: "The main hospital of São Tomé and Príncipe. Its doctors found that more than a third of the patients the country sent abroad for treatment from 2019 to 2025 had cancer.",
    summary: "A descriptive study by doctors of Hospital Ayres de Menezes with researchers from IPO Porto (ecancermedicalscience 2026) reviewed the records of the Ministry of Health's Patient Evacuation Board for 2019 to 2025: of 1,066 evacuations, 413 (38.7%) were for cancer, most often breast (24.7%), prostate (17.9%) and cervical (9.4%) cancer, with a mean age of 48. The authors note that the country has no population-based cancer registry and call for one. IAEA DIRAC lists no radiotherapy centre in São Tomé and Príncipe. The coordinates are an approximate São Tomé city point.",
    programs: ["Referral for medical evacuation abroad"],
    institutions: ["ipo-porto"],
    cancers: ["breast-cancer", "prostate", "cervical"],
    links: [{ label: "David et al., cancer among medical evacuees from São Tomé and Príncipe 2019 to 2025 (ecancermedicalscience 2026)", url: "https://doi.org/10.3332/ecancer.2026.2093" }, DIRAC] }),
];

/** Existing record id to the new institution ids it should list (applied in src/data/index.ts). */
export const countriesWestCentralAfricaBacklinks: Record<string, string[]> = {
  // The Abidjan registry is integrated into the PNLCa, and collects from CHU de Treichville and CNRAO (national cancer plan 2022).
  // TODO: abidjan-cancer-registry is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "abidjan-cancer-registry": ["pnlca-cote-divoire", "cote-divoire-ministry-of-health", "chu-treichville", "cnrao-abidjan"],
  // ClinicalTrials.gov lists both Abidjan facilities by name as sites of IMbrave152.
  nct05904886: ["cnrao-abidjan", "pisam-abidjan"],
  // TODO: registre-cancers-guinee is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "registre-cancers-guinee": ["pnlcc-guinea", "guinea-ministry-of-health"],
  // TODO: hopital-national-donka is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "hopital-national-donka": ["guinea-ministry-of-health"],
  // IPO Porto researchers co-wrote the São Tomé evacuation study with the hospital's doctors.
  "ipo-porto": ["hospital-ayres-de-menezes"],
};
