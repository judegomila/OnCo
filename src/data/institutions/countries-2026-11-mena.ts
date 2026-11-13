import type { InstitutionInput } from "@/lib/schema";

/**
 * Institution census, Middle East and North Africa: Tunisia, Jordan, the United Arab Emirates, Libya, Palestine,
 * Kuwait, Oman, Qatar and Bahrain. Every record was written from sources read as raw text on 11 November 2026:
 * IAEA DIRAC's public equipment report (the JSON behind https://dirac.iaea.org/Data/CountriesLight, one row per
 * radiotherapy centre with its machine counts and the year the entry was last updated); the UICC member directory
 * pages for each member named below; ClinicalTrials.gov's API for the facility lists of trials the corpus holds;
 * the institutions' own websites where they answered (Sheikh Shakhbout Medical City, An-Najah National University
 * Hospital, An-Najah National University, Augusta Victoria Hospital, Sidra Medicine, Al Khalidi Hospital, the National
 * Cancer Institute in Misurata, the Emirates Drug Establishment, Bahrain's National Health Regulatory Authority);
 * government statements as reported by Jordan News, the Kuwait Times (KUNA), the Arab Times, News of Bahrain and the
 * Abu Dhabi Media Office; Tunisian press reports in Business News, African Manager and Tunisie Numérique; Eni's
 * press release on the Sabratha institute; IAEA's technical cooperation sheet for Libya (PDF text); the Times of Oman;
 * and Al-Quds. WHO's list of regulators at maturity level 3 or 4 (August 2026, PDF text) names none of these nine
 * countries, and NIH ClinRegs has no profile for any of them (each country URL redirects to its home page).
 *
 * Coordinates: Wikidata P625 for Farhat Hached Hospital (Q30254114), Sheikh Shakhbout Medical City (Q81368032),
 * An-Najah National University Hospital (Q20423478), Istishari Arab Hospital (Q55965644), Augusta Victoria Hospital
 * (Q1475353), Kuwait Cancer Control Center (Q17067808), Salmaniya Medical Complex (Q7405447) and the National Health
 * Regulatory Authority (Q105063287); OpenStreetMap Nominatim for the hospital buildings of Habib Bourguiba Sfax,
 * Abderrahmen Mami, the bone marrow transplant centre in Tunis, Al-Bashir, Al Khalidi, Burjeel Medical City, the Royal
 * Hospital in Muscat and Sidra Medicine. Wikidata's coordinate for Sidra (Q12242241) points to Idaho and was not used.
 * Every other record uses a Nominatim city point, and its summary says so.
 *
 * Not read: Tunisia's Ministry of Health (santetunisie.rns.tn), CHU Farhat Hached (chu-hached.rns.tn), CNAM (cnam.nat.tn),
 * the pharmacy directorate (dpm.tn) and the medicines agency (anmps.tn) did not resolve, timed out or refused a TLS
 * connection. Jordan's Ministry of Health (moh.gov.jo), the Jordan Food and Drug Administration (jfda.jo) and King
 * Abdullah University Hospital (kauh.jo) timed out; Jordan University Hospital's site rejected the request (WAF page);
 * jcs.jo is an internet provider, not the Jordan Cancer Society; Jordan Times and IAEA project pages on Al-Bashir
 * returned 403. The UAE Ministry of Health and Prevention (mohap.gov.ae) reset the connection; Sheikh Shakhbout's
 * Cancer Institute page returned 403; ESMO's designated-centre pages render their content by script. Libya's National
 * Cancer Control Program site (nccp.gov.ly) has an expired certificate. Palestine's Ministry of Health (site.moh.ps) and
 * hospital.najah.edu timed out; istishari.com is a parked domain. Kuwait's Ministry of Health (moh.gov.kw) timed out
 * and kccc.gov.kw did not resolve. The London Breast Care Centre in Bahrain has an expired certificate.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DIRAC = { label: "IAEA DIRAC: radiotherapy centres and equipment (read 11 November 2026)", url: "https://dirac.iaea.org/Data/CountriesLight" };
const uicc = (slug: string, name: string) => ({ label: `UICC member directory: ${name}`, url: `https://www.uicc.org/membership/${slug}` });
const ct = (nct: string, what: string) => ({ label: `ClinicalTrials.gov ${nct}: ${what}`, url: `https://clinicaltrials.gov/study/${nct}` });

export const institutionsCountriesMena: InstitutionInput[] = [
  // Tunisia
  i({ id: "chu-farhat-hached-sousse", name: "Centre Hospitalier Universitaire Farhat Hached, Sousse", aka: ["CHU Farhat Hached", "Farhat Hached University Hospital", "Farhat Hached Hospital of Sousse"],
    city: "Sousse", country: "TN", lat: 35.83, lng: 10.628, institutionType: "hospital",
    tldr: "A university teaching hospital in Sousse with a radiotherapy service and a breast unit that treats about 350 new breast cancers a year. It is a site for international cancer and blood disorder trials.",
    summary: "IAEA DIRAC's equipment report, read on 11 November 2026 with the entry last updated in 2023, lists the radiotherapy service of Hôpital Farhat Hached in Sousse with one linear accelerator, one cobalt-60 unit and a CT scanner, and no brachytherapy unit. The Breast Centres Network directory (last modified March 2022) lists its breast unit with about 350 new breast cancer cases a year and a multidisciplinary team of radiologists, surgeons, pathologists, medical oncologists, radiotherapists and nurses, with a European certification in breast surgical oncology valid to 22 November 2026. ClinicalTrials.gov lists it as a site of the trial of inavolisib with pertuzumab and trastuzumab in PIK3CA-mutated HER2-positive breast cancer (NCT05894239) and of the long-term luspatercept safety study (NCT04064060). Its own website did not answer.",
    programs: ["Radiotherapy (one linear accelerator, one cobalt unit in IAEA DIRAC)", "Breast unit (about 350 new cases a year)"],
    institutions: ["institut-salah-azaiez", "chu-habib-bourguiba-sfax"], cancers: ["breast-cancer"],
    links: [DIRAC, { label: "Breast Centres Network: F. Hached University Teaching Hospital", url: "https://www.breastcentresnetwork.org/breast-units/directory/Tunisia/F.+Hached+University+Teaching+Hospital+/4,9,42," }, ct("NCT05894239", "site list"), ct("NCT04064060", "site list")] }),

  i({ id: "chu-habib-bourguiba-sfax", name: "Hôpital Habib Bourguiba, Sfax", aka: ["Habib Bourguiba Hospital, Sfax", "CHU Habib Bourguiba Sfax"],
    city: "Sfax", country: "TN", lat: 34.74, lng: 10.748, institutionType: "hospital",
    tldr: "A hospital in Sfax, in southern Tunisia, whose radiotherapy department has two linear accelerators, a cobalt unit and two brachytherapy units. It is a site for an international breast cancer trial.",
    summary: "IAEA DIRAC's equipment report, read on 11 November 2026 with the entry last updated in 2024, lists Habib Bourguiba Hospital in Sfax with two linear accelerators, one cobalt-60 unit, two brachytherapy units and a CT scanner. ClinicalTrials.gov lists Habib Bourguiba Hospital, Sfax, as a site of the trial of inavolisib with pertuzumab and trastuzumab in PIK3CA-mutated HER2-positive breast cancer (NCT05894239). OnCo could not read a site of the hospital's own.",
    programs: ["Radiotherapy and brachytherapy (IAEA DIRAC)"],
    institutions: ["institut-salah-azaiez", "chu-farhat-hached-sousse"], cancers: ["breast-cancer"],
    links: [DIRAC, ct("NCT05894239", "site list")] }),

  i({ id: "hopital-abderrahmen-mami-ariana", name: "Hôpital Abderrahmen Mami, Ariana", aka: ["Abderrahmen Mami Hospital", "Hôpital Abderrahmen Mami de l'Ariana"],
    city: "Ariana", country: "TN", lat: 36.869, lng: 10.178, institutionType: "hospital",
    tldr: "A hospital in Ariana, north of Tunis, with a radiotherapy unit of two linear accelerators. It is a site for an international breast cancer trial.",
    summary: "IAEA DIRAC's equipment report, read on 11 November 2026 with the entry updated in 2026, lists the hospital's radiotherapy unit in Ariana with two linear accelerators and a CT scanner, and no brachytherapy. ClinicalTrials.gov lists Abderrahmen Mami Hospital, Aryanah, as a site of the trial of inavolisib with pertuzumab and trastuzumab in PIK3CA-mutated HER2-positive breast cancer (NCT05894239). OnCo found no website for the hospital.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)"],
    institutions: ["institut-salah-azaiez"], cancers: ["breast-cancer"],
    links: [DIRAC, ct("NCT05894239", "site list")] }),

  i({ id: "cngmo-tunis", name: "Centre National de Greffe de Moelle Osseuse, Tunis", aka: ["CNGMO", "National Bone Marrow Transplant Centre, Tunisia", "Centre national de greffe de la moelle osseuse"],
    city: "Tunis", country: "TN", lat: 36.805, lng: 10.156, institutionType: "hospital",
    tldr: "Tunisia's national bone marrow transplant centre in Tunis, with services for adults and children. In 2023 transplants stopped for weeks because medicines ran out, and in 2026 the health minister set out a plan to do more transplants and cut waiting times.",
    summary: "In March 2018 the head of the centre's paediatric service of immuno-haematology and stem cell transplantation announced that a bone marrow transplant in a child would be carried out there in April, the first of its kind in Tunisia (African Manager). In September 2023 Business News reported that bone marrow transplants had been suspended for more than three weeks because the medicines needed were out of stock, and the president of the Tunisian association of bone marrow transplant recipients said the centre had suspended all procedures for lack of medicines and equipment. On 20 February 2026 the Minister of Health met the heads of its paediatric, adult, pharmacy and laboratory services; the ministry decided on a roadmap for allogeneic transplantation (more procedures, more eligible patients, shorter waits), new transplant rooms, a study of a change in the centre's legal status for more flexible management and purchasing, and a gradual extension of autologous transplantation to other capable services, with the aim of reducing treatment abroad (Tunisie Numérique). The website did not answer.",
    programs: ["Allogeneic and autologous stem cell transplantation", "Paediatric immuno-haematology and transplantation"],
    institutions: ["institut-salah-azaiez"], cancers: ["all-leukemia", "aml"],
    links: [
      { label: "Tunisie Numérique: plan to strengthen bone marrow transplantation (20 February 2026)", url: "https://www.tunisienumerique.com/sante-un-plan-pour-renforcer-la-greffe-de-moelle-osseuse-et-limiter-les-soins-a-letranger/" },
      { label: "Business News: transplants suspended for lack of medicines (13 September 2023)", url: "https://businessnews.com.tn/2023/09/13/article-1200446/1200446/" },
      { label: "African Manager: first bone marrow transplant in a child announced (15 March 2018)", url: "https://africanmanager.com/tunisie-une-greffe-de-la-moelle-osseuse-sur-un-enfant-une-1e-en-afrique/" },
    ] }),

  i({ id: "jendouba-oncology-centre", name: "Centre régional de traitement des maladies cancéreuses de Jendouba", aka: ["Centre d'oncologie de Jendouba", "Cancer Diseases Center in Jendouba", "Jendouba oncology centre"],
    city: "Jendouba", country: "TN", lat: 36.497, lng: 8.776, institutionType: "cancer-center",
    tldr: "A regional cancer treatment centre in Jendouba, in north-west Tunisia, opened in 2019 with radiotherapy, chemotherapy beds and imaging, so that patients in the region need not travel to Tunis.",
    summary: "On 30 March 2016 Tunisia's finance minister signed a loan agreement with an Austrian bank to finance a medical oncology and radiotherapy centre in Jendouba (Business News). The head of government inaugurated the regional centre for the treatment of cancer on 16 May 2019 (African Manager); Business News reported that day that it had two linear accelerators, a brachytherapy room, a dedicated simulation CT, an MRI scanner, a mammography unit, a pathology laboratory, a clean room for preparing cytotoxic drugs and 12 chemotherapy beds. IAEA DIRAC's equipment report, read on 11 November 2026 with the entry updated in 2024, lists the Cancer Diseases Center in Jendouba with one linear accelerator and no brachytherapy unit; OnCo has not found what explains the difference. The coordinates are an approximate point for the town of Jendouba.",
    programs: ["Radiotherapy", "Chemotherapy (12 beds at opening)"],
    institutions: ["institut-salah-azaiez"],
    links: [DIRAC,
      { label: "Business News: new equipment at the Jendouba oncology centre (16 May 2019)", url: "https://businessnews.com.tn/2019/05/16/article-1160597/1160597/" },
      { label: "African Manager: Jendouba cancer centre inaugurated (17 May 2019)", url: "https://africanmanager.com/jendouba-un-centre-pour-traiter-tout-type-de-cancer/" },
      { label: "Business News: loan signed for the Jendouba centre (30 March 2016)", url: "https://businessnews.com.tn/2016/03/30/article-1136582/1136582/" },
    ] }),

  // Jordan
  i({ id: "al-bashir-hospital", name: "Al-Bashir Hospital, Amman", aka: ["Al Bashir Hospital", "مستشفى البشير"],
    city: "Amman", country: "JO", lat: 31.939, lng: 35.941, institutionType: "hospital",
    tldr: "A public hospital of Jordan's Ministry of Health in Amman. Since 2021 the King Hussein Cancer Center runs its oncology and haematology department, so patients can be treated there instead of being transferred.",
    summary: "In August 2021 Jordan's Ministry of Health signed an agreement under which the King Hussein Cancer Center took on the supervision, administration and operation of the Department of Oncology and Haematology at Al-Bashir Hospital; the ministry said this would save the government 8 million Jordanian dinars a year because patients could be treated in the hospital rather than transferred to the cancer centre (Jordan News, 25 September 2021). IAEA DIRAC's equipment report, read on 11 November 2026 with the entry last updated in 2019, lists Al-Bashir Hospital with four linear accelerators and a CT scanner.",
    programs: ["Oncology and haematology department operated by the King Hussein Cancer Center (from 2021)", "Radiotherapy (four linear accelerators in IAEA DIRAC, 2019 entry)"],
    institutions: ["khcc", "jordan-cancer-registry"],
    links: [DIRAC, { label: "Jordan News: KHCC to take over operations of Al-Bashir oncology department (25 September 2021)", url: "https://www.jordannews.jo/Section-109/News/KHCC-to-take-over-operations-of-Al-Bashir-oncology-department-MoH-7609" }] }),

  i({ id: "al-khalidi-hospital-amman", name: "Al Khalidi Hospital and Medical Center, Amman", aka: ["Al Khalidi Hospital", "Al Khalidi Medical Center", "مستشفى الخالدي"],
    city: "Amman", country: "JO", lat: 31.952, lng: 35.903, institutionType: "hospital", website: "https://www.khmc.jo/en/",
    tldr: "A private hospital in Amman with a cancer centre, open since 2006, giving chemotherapy, immunotherapy and care for blood cancers. It is a site for an international melanoma trial.",
    summary: "The hospital's clinical haematology and medical oncology page says its oncology centre has operated since 2006, treating solid tumours and malignant and benign blood disorders (leukaemias, lymphomas and myelomas) with dedicated chemotherapy, immunotherapy and targeted therapy infusion suites, palliative care, weekly multidisciplinary tumour boards and paediatric haemato-oncology, and that it works with outside radiation oncology and nuclear medicine centres. ClinicalTrials.gov lists Al Khalidi Hospital and Medical Center as a site of the trial comparing ABP 206 with nivolumab in melanoma (NCT06054555).",
    programs: ["Medical oncology and clinical haematology", "Paediatric haemato-oncology", "Palliative care"],
    institutions: ["khcc"], cancers: ["melanoma"],
    links: [{ label: "Al Khalidi Hospital: clinical haematology and oncology", url: "https://www.khmc.jo/en/specialties/clinical-hematology-and-oncology/" }, ct("NCT06054555", "site list")] }),

  i({ id: "jordan-royal-medical-services", name: "Royal Medical Services, Jordan", aka: ["Royal Medical Services (RMC)", "RMS Jordan"],
    city: "Amman", country: "JO", lat: 31.952, lng: 35.924, institutionType: "government",
    tldr: "The radiotherapy centre of Jordan's Royal Medical Services in Amman, with two linear accelerators.",
    summary: "IAEA DIRAC's equipment report, read on 11 November 2026 with the entry last updated in 2023, lists the Royal Medical Services radiotherapy centre in Amman with two linear accelerators and a CT scanner. Its website (rms.mil.jo) did not resolve, so this record holds only what DIRAC states. The coordinates are an approximate Amman city point.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)"],
    institutions: ["khcc"],
    links: [DIRAC] }),

  i({ id: "jordan-cancer-registry", name: "Jordan Cancer Registry and Cancer Prevention Department, Ministry of Health", aka: ["Jordan Cancer Registry", "Ministry of Health Jordan, Cancer Prevention Department"],
    city: "Amman", country: "JO", lat: 31.952, lng: 35.924, institutionType: "government",
    tldr: "Jordan's national cancer registry and the Ministry of Health department for cancer prevention. They count cancer cases nationally and work on early detection, screening, tobacco control and palliative care.",
    summary: "In its UICC directory entry (updated February 2026) the Ministry of Health describes its Cancer Prevention Department and the national Jordan Cancer Registry as working under the ministry, with national cancer registration as the prime function, alongside prevention and control: early detection and screening, risk factors such as smoking and its cessation, education, training and palliative care. The entry says the department covers all aspects of a national cancer control programme but that no such programme has been endorsed by the ministry. The ministry's website did not answer. The coordinates are an approximate Amman city point.",
    programs: ["National cancer registration", "Cancer prevention, early detection and screening", "Tobacco control"],
    institutions: ["khcc", "al-bashir-hospital", "jordan-cancer-society", "jordan-royal-medical-services"], related: ["cancer-registries-surveillance"],
    links: [uicc("ministry-health-jordan-cancer-prevention-department-and-jordan-cancer-registry", "Ministry of Health Jordan, Cancer Prevention Department and Jordan Cancer Registry")] }),

  i({ id: "jordan-cancer-society", name: "Jordan Cancer Society",
    city: "Amman", country: "JO", lat: 31.952, lng: 35.924, institutionType: "consortium",
    tldr: "A Jordanian charity founded in 1964 that works on cancer prevention and awareness and supports people with cancer and their families.",
    summary: "The society's UICC directory entry (updated September 2026) says it was founded in 1964, was for many years headed by the late King Hussein as honorary president, and works on cancer prevention and awareness among the Jordanian population and on support for cancer patients and their families. It is a full member of UICC. The coordinates are an approximate Amman city point.",
    programs: ["Cancer prevention and awareness", "Support for patients and families"],
    institutions: ["jordan-cancer-registry", "uicc"],
    links: [uicc("jordan-cancer-society", "Jordan Cancer Society")] }),

  // United Arab Emirates
  i({ id: "sheikh-shakhbout-medical-city", name: "Sheikh Shakhbout Medical City, Abu Dhabi", aka: ["SSMC"],
    city: "Abu Dhabi", country: "AE", lat: 24.325, lng: 54.614, institutionType: "hospital", website: "https://ssmc.ae",
    tldr: "A public hospital in Abu Dhabi for serious and complex care, run with Mayo Clinic, whose cancer services include a radiation therapy department opened in 2023. It is a site for an international trial in cancers with RET changes.",
    summary: "Sheikh Shakhbout Medical City is a joint venture between the Abu Dhabi Health Services Company (SEHA) and Mayo Clinic, established in 2019, with 742 beds and care in 46 specialties (hospital release, October 2023). In October 2023 it opened a radiation therapy department, developed with Mayo Clinic, with Varian TrueBeam linear accelerators and capacity for 50 treatment sessions a day, offering IMRT, VMAT, conformal radiotherapy, stereotactic radiotherapy and radiosurgery, total body irradiation and respiratory-managed radiotherapy in curative and palliative settings. ClinicalTrials.gov lists it as a site of the trial of EP0031 (lunbotinib) in advanced RET-altered cancers (NCT05443126). IAEA DIRAC's equipment report, read on 11 November 2026, has no entry for it.",
    programs: ["Radiation therapy department (opened 2023, with Mayo Clinic)"],
    institutions: ["mayo-clinic", "tawam-hospital", "cleveland-clinic-abu-dhabi"],
    links: [{ label: "SSMC: radiation therapy department inaugurated (12 October 2023)", url: "https://ssmc.ae/news/sheikh-shakhbout-medical-city-inaugurates-cutting-edge-radiation-therapy-department-to-elevate-expert-cancer-care-in-the-uae/" }, ct("NCT05443126", "site list")] }),

  i({ id: "burjeel-medical-city", name: "Burjeel Medical City and Burjeel Cancer Institute, Abu Dhabi", aka: ["Burjeel Cancer Institute", "Burjeel Medical City", "VPS Healthcare"],
    city: "Abu Dhabi", country: "AE", lat: 24.354, lng: 54.539, institutionType: "hospital", website: "https://burjeel.com",
    tldr: "A private hospital in Abu Dhabi whose cancer institute gives chemotherapy, radiotherapy and, since 2026, radiopharmaceutical treatment for some cancers that have spread. It is a site for international breast and lung cancer trials.",
    summary: "In its UICC directory entry (updated May 2026) Burjeel Medical City describes diagnosis, staging and treatment of solid tumours and blood cancers, a weekly multidisciplinary meeting with radiology, pathology, radiation and PET services, neoadjuvant, adjuvant and palliative chemotherapy, a tumour registry that reports to the Department of Health, and free screening and awareness days. IAEA DIRAC, read on 11 November 2026 with the entry updated in 2025, lists the Burjeel Cancer Institute with two linear accelerators and a CT scanner. In October 2026 the Abu Dhabi Media Office reported that the institute had introduced therapeutic radiopharmaceuticals, delivered in Burjeel Medical City's nuclear medicine department, for patients with tumours that express the target receptors. ClinicalTrials.gov lists it as a site of the heredERA trial of giredestrant in HER2-positive breast cancer (NCT05296798) and of the trial of sacituzumab tirumotecan with pembrolizumab in squamous lung cancer (NCT06422143).",
    programs: ["Medical oncology and haematology", "Radiotherapy (two linear accelerators in IAEA DIRAC)", "Radiopharmaceutical therapy (from 2026)"],
    institutions: ["tawam-hospital"], cancers: ["breast-cancer", "nsclc"],
    links: [uicc("burjeel-medical-city-vps-healthcare-llc", "Burjeel Medical City, VPS Healthcare"), DIRAC,
      { label: "Abu Dhabi Media Office: Burjeel Cancer Institute introduces radiopharmaceutical therapy (16 October 2026)", url: "https://www.mediaoffice.abudhabi/en/health/burjeel-cancer-institute-in-abu-dhabi-introduces-targeted-radiopharmaceutical-therapy-for-certain-metastatic-tumours/" },
      ct("NCT05296798", "site list"), ct("NCT06422143", "site list")] }),

  i({ id: "friends-of-cancer-patients-uae", name: "Friends of Cancer Patients (FoCP)", aka: ["FoCP"],
    city: "Sharjah", country: "AE", lat: 25.346, lng: 55.421, institutionType: "consortium", website: "https://www.focp.ae",
    tldr: "A charity in Sharjah, founded in 1999, that pays for cancer treatment, transport and food for people who cannot afford them, anywhere in the Emirates, and runs early detection campaigns.",
    summary: "The society's UICC directory entry says Friends of Cancer Patients was established in late 1999 under the patronage of Sheikha Jawaher bint Mohammed Al Qasimi, serves all residents of the UAE, and has given support to over 990 patients and their families. It covers treatment costs for chemotherapy, radiotherapy and other medicines and for investigations and surgery, gives transport and food allowances to patients in need, helps send patients abroad for treatment, and provides prosthetic limbs, equipment and psychological support; its main focus is awareness of cancers that can be found early. Its website describes Kashf, its early detection initiative. It is a full member of UICC. The coordinates are an approximate point for the city of Sharjah.",
    programs: ["Financial support for treatment", "Kashf early detection initiative"],
    institutions: ["uicc", "tawam-hospital"],
    links: [uicc("friends-cancer-patients-focp", "Friends of Cancer Patients"), { label: "Friends of Cancer Patients", url: "https://www.focp.ae" }] }),

  i({ id: "emirates-drug-establishment", name: "Emirates Drug Establishment (EDE)", aka: ["EDE", "مؤسسة الإمارات للدواء"],
    city: "Abu Dhabi", country: "AE", lat: 24.454, lng: 54.377, institutionType: "government", website: "https://www.ede.gov.ae/en/home",
    tldr: "The United Arab Emirates' federal medicines regulator, set up in 2023. It approves and registers medicines and medical devices, oversees clinical trials and monitors drug safety.",
    summary: "The establishment's site says it was established on 29 September 2023 as the federal authority responsible for regulating medical and pharmaceutical products, including medical devices, blood derivative products and stem cells, and that its work covers research and development, clinical and non-clinical trials, pharmaceutical testing, drug approval and registration, manufacturing, market authorisation, pharmacovigilance, control and inspection. WHO's list of regulators operating at maturity level 3 or 4 (August 2026) does not include the UAE. The coordinates are an approximate Abu Dhabi city point.",
    programs: ["Medicine and device registration", "Clinical trial oversight", "Pharmacovigilance"],
    institutions: ["sheikh-shakhbout-medical-city", "burjeel-medical-city"],
    links: [{ label: "Emirates Drug Establishment", url: "https://www.ede.gov.ae/en/home" }, { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" }] }),

  // Libya
  i({ id: "nci-misurata", name: "National Cancer Institute, Misurata", aka: ["NCI Misurata", "المعهد القومي لعلاج الأورام مصراتة", "National Cancer Institute Misrata"],
    city: "Misurata", country: "LY", lat: 32.375, lng: 15.091, institutionType: "cancer-center", website: "https://nci.edu.ly",
    tldr: "A cancer institute in Misurata with surgery, chemotherapy, radiotherapy and children's cancer care. It started the regional cancer registry for central Libya in 2021 and runs a breast cancer early detection pilot.",
    summary: "The institute's site lists departments of surgical oncology and endoscopy, medical oncology (chemotherapy and immunotherapy), radiotherapy with linear accelerators, paediatric oncology and diagnostic imaging with PET-CT, MRI and digital mammography. In its UICC directory entry (updated June 2026) it says it contributed to Libya's first national cancer registry report in 2020, started the Midland Cancer Registry in 2021, trained 46 primary care providers in clinical breast examination with a UICC grant, and from September 2025 has run a pilot across five breast clinics that aims to reach 5,000 women. IAEA DIRAC, read on 11 November 2026 with the entry updated in 2023, lists two linear accelerators and a CT scanner. IAEA's technical cooperation sheet for Libya says that by the end of 2023 its support had strengthened 3D conformal radiotherapy at centres in Benghazi, Misrata, Sabratha and Tripoli. The coordinates are an approximate city point.",
    programs: ["Surgical, medical and radiation oncology", "Paediatric oncology", "Midland Cancer Registry (from 2021)", "Breast early detection pilot (five clinics, from 2025)"],
    institutions: ["nccp-libya", "nci-sabratha", "iaea"], cancers: ["breast-cancer", "childhood-cancers"],
    links: [{ label: "National Cancer Institute, Misurata", url: "https://nci.edu.ly" }, uicc("national-cancer-institute-misurata/libya", "National Cancer Institute Misurata"), DIRAC, { label: "IAEA: technical cooperation with Libya (PDF)", url: "https://www.iaea.org/sites/default/files/25/02/tc-libya.pdf" }] }),

  i({ id: "nci-sabratha", name: "National Cancer Institute, Sabratha", aka: ["NCI Sabratha", "National Cancer Institute of Sabratha"],
    city: "Sabratha", country: "LY", lat: 32.788, lng: 12.491, institutionType: "cancer-center",
    tldr: "A cancer institute in Sabratha, about 75 kilometres west of Tripoli, with a radiotherapy unit of two linear accelerators.",
    summary: "IAEA DIRAC, read on 11 November 2026 with the entry updated in 2023, lists the National Cancer Institute Sabratha with two linear accelerators and a CT scanner. Eni and Libya's National Oil Corporation said in February 2021 that they had given the institute laboratory equipment, consumables and staff training, after MRI equipment and training in 2015 and on-the-job training of three radiologists at the European Institute of Oncology in 2018. IAEA's technical cooperation sheet for Libya says that by the end of 2023 its support had strengthened 3D conformal radiotherapy at centres in Benghazi, Misrata, Sabratha and Tripoli. OnCo found no website for the institute. The coordinates are an approximate town point.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)"],
    institutions: ["nci-misurata", "nccp-libya", "iaea"],
    links: [DIRAC, { label: "Eni: support for the National Cancer Institute of Sabratha (February 2021)", url: "https://www.eni.com/en-IT/media/news/2021/02/news-eni-csr-sabrata-libia.html" }, { label: "IAEA: technical cooperation with Libya (PDF)", url: "https://www.iaea.org/sites/default/files/25/02/tc-libya.pdf" }] }),

  i({ id: "tripoli-university-hospital", name: "Tripoli University Hospital", aka: ["TUH Tripoli"],
    city: "Tripoli", country: "LY", lat: 32.897, lng: 13.178, institutionType: "hospital",
    tldr: "A university hospital in Tripoli where a new linear accelerator for radiotherapy was installed with help from the International Atomic Energy Agency in October 2023.",
    summary: "IAEA's technical cooperation sheet for Libya lists among its achievements a new linear accelerator installed at Tripoli University Hospital in October 2023, enabling patients with cancer to be treated. IAEA DIRAC, read on 11 November 2026 with the entry updated in 2023, lists Tripoli University Hospital with one linear accelerator; it lists Tripoli Central Hospital separately, with three linear accelerators and a cobalt unit (2022 entry). The coordinates are an approximate Tripoli city point.",
    programs: ["Radiotherapy (one linear accelerator, installed October 2023)"],
    institutions: ["nccp-libya", "iaea"],
    links: [{ label: "IAEA: technical cooperation with Libya (PDF)", url: "https://www.iaea.org/sites/default/files/25/02/tc-libya.pdf" }, DIRAC] }),

  i({ id: "benghazi-national-cancer-center", name: "National Cancer Center, Benghazi", aka: ["National Cancer Center - Benghazi", "Benghazi Cancer Centre"],
    city: "Benghazi", country: "LY", lat: 32.12, lng: 20.081, institutionType: "cancer-center",
    tldr: "A cancer centre in Benghazi, eastern Libya, with a radiotherapy unit of two linear accelerators.",
    summary: "IAEA DIRAC, read on 11 November 2026 with the entry updated in 2023, lists the National Cancer Center in Benghazi with two linear accelerators and a CT scanner, and no brachytherapy. IAEA's technical cooperation sheet for Libya says that by the end of 2023 its support had strengthened 3D conformal radiotherapy at centres in Benghazi, Misrata, Sabratha and Tripoli. OnCo found no website for the centre. The coordinates are an approximate Benghazi city point.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)"],
    institutions: ["nccp-libya", "iaea"],
    links: [DIRAC, { label: "IAEA: technical cooperation with Libya (PDF)", url: "https://www.iaea.org/sites/default/files/25/02/tc-libya.pdf" }] }),

  i({ id: "nccp-libya", name: "National Cancer Control Program, Libya", aka: ["NCCP Libya"],
    city: "Tripoli", country: "LY", lat: 32.897, lng: 13.178, institutionType: "government",
    tldr: "Libya's government cancer control programme, based in Tripoli, which aims to cut cancer cases and deaths through prevention, early detection, treatment and palliative care.",
    summary: "In its UICC directory entry (updated July 2026) the National Cancer Control Program describes itself as a governmental public health programme in Tripoli designed to reduce cancer incidence and mortality and improve patients' quality of life through evidence-based prevention, early detection, diagnosis, treatment and palliation. It is an associate member of UICC. Its website (nccp.gov.ly) has an expired security certificate and was not read. The coordinates are an approximate Tripoli city point.",
    programs: ["National cancer control"],
    institutions: ["nci-misurata", "nci-sabratha", "tripoli-university-hospital", "benghazi-national-cancer-center"],
    links: [uicc("national-cancer-control-program-nccp-libya", "National Cancer Control Program Libya")] }),

  // Palestine
  i({ id: "an-najah-national-university-hospital", name: "An-Najah National University Hospital, Nablus", aka: ["NNUH", "An-Najah Cancer Center"],
    city: "Nablus", country: "PS", lat: 32.239, lng: 35.248, institutionType: "hospital", website: "https://nnuh.org/en/", university: "An-Najah National University",
    tldr: "A university hospital in Nablus, in the northern West Bank, whose cancer centre opened a radiotherapy department in August 2026, so patients there need travel less far for treatment.",
    summary: "The hospital opened in 2014 and lists oncology among its services. In July 2023 a delegation from the King Hussein Cancer Center visited under a partnership to build the hospital's cancer treatment capacity and prepare an oncology centre. In March 2024 it opened a day treatment department and haematology and oncology clinics with 33 treatment chairs for adults and children and capacity for about 150 sessions a day (An-Najah National University). On 30 August 2026 it inaugurated the radiotherapy department of the An-Najah Cancer Center, which the Palestinian Minister of Health described as serving patients in the northern West Bank who otherwise travel to Jerusalem or abroad (Al-Quds). IAEA DIRAC, read on 11 November 2026 with the entry updated in 2026, lists the An-Najah Cancer Center with two linear accelerators and a brachytherapy unit.",
    programs: ["Radiotherapy (from August 2026)", "Day treatment and haematology and oncology clinics (33 chairs)", "Paediatric oncology"],
    institutions: ["khcc", "istishari-arab-hospital", "augusta-victoria-hospital", "aid-and-hope-gaza"],
    links: [{ label: "An-Najah National University Hospital", url: "https://nnuh.org/en/" },
      { label: "NNUH: King Hussein Cancer Center delegation visits (July 2023)", url: "https://nnuh.org/en/news/news-and-activites/a-delegation-from-hussein-cancer-centre-visits-nnuh-to-enhance-the-hospitals-capabilities-in-cancer-treatment/" },
      { label: "An-Najah National University: day treatment department and oncology clinics open (March 2024)", url: "https://www.najah.edu/en/community/community-news/2024/03/11/an-najah-national-university-hospital-advances-healthcare-landscape-with-inauguration-of-day-treatment-department-and-hematology-oncology-clinics-supported-by-mr-saleh-rifaat-yaish/" },
      { label: "Al-Quds: the radiotherapy department of An-Najah Cancer Center (September 2026)", url: "https://alquds.com/en/posts/256960-the-radiotherapy-department-of-al-najah-cancer-center-a-significant-strategic" }, DIRAC] }),

  i({ id: "istishari-arab-hospital", name: "Istishari Arab Hospital, Ramallah", aka: ["Istishari Cancer Center"],
    city: "Ramallah", country: "PS", lat: 31.934, lng: 35.163, institutionType: "hospital",
    tldr: "A hospital in Ramallah in the West Bank that offers cancer screening, diagnosis, chemotherapy, immunotherapy and surgery, and has a cancer centre with one linear accelerator for radiotherapy.",
    summary: "In its UICC directory entry (updated April 2026) Istishari Arab Hospital lists cancer screening and diagnostic tests (radiology, pathology, genetic testing, endoscopy and biopsies), chemotherapy, immunotherapy, biological therapy and surgery, a cancer registry, and radiotherapy in progress. IAEA DIRAC, read on 11 November 2026 with the entry updated in 2026, lists the Istishari Cancer Center in Ramallah with one linear accelerator. It is a full member of UICC. Its listed domain (istishari.com) is parked.",
    programs: ["Cancer screening and diagnosis", "Chemotherapy, immunotherapy and surgery", "Radiotherapy (one linear accelerator in IAEA DIRAC)"],
    institutions: ["an-najah-national-university-hospital", "augusta-victoria-hospital"],
    links: [uicc("istishari-arab-hospital", "Istishari Arab Hospital"), DIRAC] }),

  i({ id: "augusta-victoria-hospital", name: "Augusta Victoria Hospital, Jerusalem", aka: ["AVH"],
    city: "Jerusalem", country: "PS", lat: 31.787, lng: 35.249, institutionType: "hospital", website: "https://www.avh.org",
    tldr: "A hospital of the Lutheran World Federation on the Mount of Olives in East Jerusalem that gives radiotherapy and chemotherapy to patients from the West Bank and Gaza. Its radiotherapy department treats about 150 patients a day.",
    summary: "The hospital says it has provided care since 1950, was established in partnership with UNRWA to care for Palestinian refugees, and is run by the Lutheran World Federation. Its radiation therapy page says it set up a radiotherapy department in 2003, when the treatment was not available in any other local hospital, and that three radiation oncologists, four medical physicists and 17 radiation therapy technicians treat about 150 patients a day from the West Bank and Gaza. Its medical oncology department has seven medical oncologists treating solid tumours and sees 60 to 80 patients a day. Its site reports its fifth Joint Commission International accreditation. IAEA DIRAC, read on 11 November 2026, lists the hospital under Israel with three linear accelerators and a CT scanner (2026 entry); OnCo files it under Palestine, as UICC lists the Patient's Friends Society based in the hospital.",
    programs: ["Radiation therapy (from 2003)", "Medical oncology and chemotherapy day care"],
    institutions: ["an-najah-national-university-hospital", "istishari-arab-hospital", "aid-and-hope-gaza"],
    links: [{ label: "Augusta Victoria Hospital", url: "https://www.avh.org" }, { label: "AVH: radiation therapy department", url: "https://www.avh.org/content/radiation-therapy-department" }, { label: "AVH: medical oncology and chemotherapy day care", url: "https://avh.org/content/medical-oncology-chemotherapy-day-care" }, uicc("patients-friends-society-jerusalem", "Patient's Friends Society Jerusalem"), DIRAC] }),

  i({ id: "aid-and-hope-gaza", name: "Aid and Hope Program for Cancer Patient Care, Gaza", aka: ["AHP Gaza", "Aid and Hope Program"],
    city: "Gaza", country: "PS", lat: 31.513, lng: 34.458, institutionType: "consortium",
    tldr: "A charity in Gaza that supports people with cancer and their families with money for transport and treatment, counselling and support groups, and runs awareness and early detection work.",
    summary: "In its UICC directory entry the Aid and Hope Program, on Al-Rasheed Street in Gaza, lists public awareness of risk factors and early detection, screening, advocacy for prevention and access to care, support groups, financial assistance, transport to treatment, psychosocial support and fundraising. It is a full member of UICC. The coordinates are an approximate point for Gaza City.",
    programs: ["Financial and transport support for patients", "Psychosocial support", "Awareness and early detection"],
    institutions: ["augusta-victoria-hospital", "uicc"],
    links: [uicc("aid-and-hope-program-cancer-patient-care", "Aid and Hope Program for Cancer Patient Care")] }),

  // Kuwait
  i({ id: "kuwait-cancer-control-center", name: "Kuwait Cancer Control Center", aka: ["KCCC", "Kuwait Cancer Control Centre"],
    city: "Kuwait City", country: "KW", lat: 29.325, lng: 47.903, institutionType: "cancer-center",
    tldr: "Kuwait's public cancer centre, founded in 1968, with surgery, oncology and radiotherapy. In 2026 the Ministry of Health created a cancer registry department inside it to build a national cancer database.",
    summary: "The Arab Times reported in April 2024 that the centre was established in 1968, has specialised surgery, oncology and diagnostic radiology units and a staff of over 600, and that the Minister of Health had announced a new centre building in the Al-Sabah Health District. In October 2025 the ministry opened a gynaecological oncology unit at the centre, and in December 2025 the minister met its board on moving to the new building and on a memorandum of understanding with Gustave Roussy (Arab Times). On 31 August 2026 KUNA reported a ministerial decision establishing an Epidemiology and Cancer Registry Department at the centre to build a national database on cancer incidence, mortality and survival. IAEA DIRAC, read on 11 November 2026 with the entry last updated in 2021, lists the centre in Shuwaikh with four linear accelerators and a brachytherapy unit. Its website did not resolve.",
    programs: ["Medical, surgical and radiation oncology", "Haematology", "Gynaecological oncology unit (from 2025)", "Epidemiology and Cancer Registry Department (from 2026)"],
    institutions: ["kuwait-ministry-of-health", "gustave-roussy", "fadia-survive-and-thrive"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Kuwait Times (KUNA): cancer registry department established at KCCC (31 August 2026)", url: "https://kuwaittimes.com/article/48953/kuwait/kuwait-health-min-establishes-epidemiology-cancer-registry-department-at-kccc/" },
      { label: "Arab Times: plans for a new Kuwait Cancer Control Center (27 April 2024)", url: "https://www.arabtimesonline.com/news/kuwait-unveils-plans-for-state-of-the-art-new-cancer-control-center/" },
      { label: "Arab Times: relocation to the new building (30 December 2025)", url: "https://www.arabtimesonline.com/news/kuwait-eyes-smooth-relocation-of-cancer-center-to-new-facility/" },
      { label: "Arab Times: gynaecological oncology unit opens (1 October 2025)", url: "https://www.arabtimesonline.com/news/kuwait-launches-new-gynecological-oncology-unit-to-enhance-womens-health-services/" },
      DIRAC,
    ] }),

  i({ id: "kuwait-ministry-of-health", name: "Ministry of Health, Kuwait", aka: ["MoH Kuwait"],
    city: "Kuwait City", country: "KW", lat: 29.38, lng: 47.973, institutionType: "government",
    tldr: "Kuwait's health ministry, which runs the public Kuwait Cancer Control Center and in 2026 set up a national cancer registry department there.",
    summary: "The ministry runs the Kuwait Cancer Control Center. In August 2026 the Minister of Health issued a decision establishing an Epidemiology and Cancer Registry Department at the centre; the ministry said it would track cancer incidence, mortality and survival, take part in studies with WHO and international registry bodies, and keep research use of the data subject to ethical approval (KUNA). Earlier ministry statements reported by the Arab Times cover a new centre building in the Al-Sabah Health District, a memorandum of understanding with Gustave Roussy, and a gynaecological oncology unit opened in October 2025. Its website did not answer. The coordinates are an approximate Kuwait City point.",
    programs: ["National cancer registration (from 2026)"],
    institutions: ["kuwait-cancer-control-center"],
    links: [
      { label: "Kuwait Times (KUNA): cancer registry department established at KCCC (31 August 2026)", url: "https://kuwaittimes.com/article/48953/kuwait/kuwait-health-min-establishes-epidemiology-cancer-registry-department-at-kccc/" },
      { label: "Arab Times: relocation to the new building (30 December 2025)", url: "https://www.arabtimesonline.com/news/kuwait-eyes-smooth-relocation-of-cancer-center-to-new-facility/" },
    ] }),

  i({ id: "fadia-survive-and-thrive", name: "Fadia Survive & Thrive Association", aka: ["Fadia Survive and Thrive"],
    city: "Salmiya", country: "KW", lat: 29.333, lng: 48.068, institutionType: "consortium",
    tldr: "A cancer patient advocacy group with a postal address in Kuwait, founded in 2016, that speaks for patients with advanced and metastatic cancer, especially metastatic breast cancer.",
    summary: "In its UICC directory entry (updated September 2026) the association, founded in 2016, describes itself as an international cancer patient advocacy focused on patient empowerment, prevention and easing treatment side effects, with attention to advanced and metastatic cancer, especially metastatic breast cancer, critically ill and elderly patients, and public awareness campaigns. The entry gives a correspondence address in Geneva and a postal box in Salmiya, Kuwait, and lists it as a full member of UICC and the ABC Global Alliance. The coordinates are an approximate point for Salmiya.",
    programs: ["Patient advocacy for metastatic breast cancer", "Public awareness"],
    institutions: ["kuwait-cancer-control-center", "uicc"], cancers: ["breast-cancer"],
    links: [uicc("fadia-survive-thrive-association", "Fadia Survive & Thrive Association")] }),

  // Oman
  i({ id: "royal-hospital-national-oncology-centre-oman", name: "National Oncology Centre, The Royal Hospital, Muscat", aka: ["National Oncology Centre Oman", "National Center for Oncology, Royal Hospital", "NOC Royal Hospital"],
    city: "Muscat", country: "OM", lat: 23.576, lng: 58.388, institutionType: "cancer-center",
    tldr: "The Ministry of Health's cancer centre at the Royal Hospital in Muscat, open since 2004, treating adults and children with chemotherapy, radiotherapy and haematology care.",
    summary: "An undated Times of Oman report describes the National Center for Oncology at the Royal Hospital, opened in 2004, with departments of adult oncology (24 beds), adult clinical haematology (12 beds and 4 isolation beds), paediatric haematology and oncology (up to 24 beds, for children under 13, receiving 142 children with cancer in the previous year) and radiotherapy, with joint clinics for breast, colorectal, urological, head and neck, gynaecological and lung cancers. It reports 140,373 visits over the year to August, accreditation as an integrated centre of treatment and palliative care since 2013, and re-accreditation by the European Society for Medical Oncology for 2020 to 2025. IAEA DIRAC, read on 11 November 2026 with the entry updated in 2025, lists the centre with two linear accelerators, a brachytherapy unit and a CT scanner; DIRAC lists the Sultan Qaboos Comprehensive Cancer Center separately.",
    programs: ["Adult oncology and haematology", "Paediatric haematology and oncology", "Radiotherapy and brachytherapy"],
    institutions: ["sultan-qaboos-cccrc", "oman-cancer-association", "esmo"], cancers: ["childhood-cancers", "neuroblastoma", "breast-cancer"],
    links: [DIRAC, { label: "Times of Oman: National Center for Oncology at the Royal Hospital (undated)", url: "https://timesofoman.com/article/136400-national-center-for-oncology-provides-modern-treatments-at-royal-hospital" }] }),

  // Qatar
  i({ id: "sidra-medicine", name: "Sidra Medicine, Doha", aka: ["Sidra Medical and Research Center", "سدرة للطب"],
    city: "Doha", country: "QA", lat: 25.323, lng: 51.445, institutionType: "hospital", website: "https://www.sidra.org",
    tldr: "A hospital in Doha, part of Qatar Foundation, whose children's cancer and blood service treats leukaemia, lymphoma, brain tumours and other childhood cancers and runs a children's stem cell transplant unit.",
    summary: "Sidra Medicine, a member of Qatar Foundation, says its paediatric haematology and oncology division treats blood cancers such as leukaemia and lymphoma, solid tumours including brain tumours, neuroblastoma, germ cell tumours and sarcomas, and inherited blood disorders, and has a paediatric haematopoietic stem cell transplant programme in a 10-bed unit. ClinicalTrials.gov lists it as a site of the FIREFLY-2 trial of DAY101 against standard chemotherapy in children with low-grade glioma (NCT05566795).",
    programs: ["Paediatric haematology and oncology", "Paediatric stem cell transplant (10-bed unit)"],
    institutions: ["hamad-medical-corporation", "qatar-cancer-society"], cancers: ["childhood-cancers", "all-leukemia", "neuroblastoma"],
    links: [{ label: "Sidra Medicine: paediatric oncology and haematology", url: "https://www.sidra.org/clinic/children-young-peoples-services/pediatric-oncology-and-hematology/" }, ct("NCT05566795", "site list")] }),

  i({ id: "qatar-cancer-society", name: "Qatar Cancer Society", aka: ["QCS", "الجمعية القطرية للسرطان"],
    city: "Doha", country: "QA", lat: 25.286, lng: 51.526, institutionType: "consortium", website: "https://www.qcs.qa",
    tldr: "A Qatari charity founded in 1997 that works on cancer prevention and awareness and supports people living with cancer.",
    summary: "In its UICC directory entry the Qatar Cancer Society describes itself as a non-profit charity founded in 1997 that works with partners to educate the community, to support, empower and advocate for people living with cancer, and in professional development and research. It is a full member of UICC. The coordinates are an approximate Doha city point.",
    programs: ["Community education", "Patient support and advocacy"],
    institutions: ["hamad-medical-corporation", "sidra-medicine", "uicc"],
    links: [uicc("qatar-cancer-society", "Qatar Cancer Society"), { label: "Qatar Cancer Society", url: "https://www.qcs.qa" }] }),

  // Bahrain
  i({ id: "bahrain-ministry-of-health", name: "Ministry of Health, Bahrain", aka: ["MoH Bahrain", "وزارة الصحة"],
    city: "Manama", country: "BH", lat: 26.224, lng: 50.582, institutionType: "government", website: "https://www.moh.gov.bh",
    tldr: "Bahrain's health ministry, which reports the national cancer registry's figures. The registry counted just over 1,400 new cancers in 2024.",
    summary: "In a written reply to Parliament reported on 13 January 2026, the ministry said the National Cancer Registry counted 1,230 cases among Bahrainis in 2024 (535 men, 695 women) and 171 among non-Bahrainis, with 50.68% recorded as localised and 12.53% of unknown stage at diagnosis (News of Bahrain). In January 2026, answering a proposal for a new cancer site in East Riffa, the ministry described the King Hamad Cancer Centre at King Hamad University Hospital as a national specialist hub serving patients across the kingdom; the proposers cited pressure on oncology services at Salmaniya Medical Complex and King Hamad University Hospital. The coordinates are an approximate Manama city point.",
    programs: ["National Cancer Registry"],
    institutions: ["bahrain-oncology-centre", "salmaniya-medical-complex", "nhra-bahrain"], related: ["cancer-registries-surveillance"],
    links: [{ label: "News of Bahrain: over 1,400 cancer cases in 2024 (Ministry of Health reply)", url: "https://www.newsofbahrain.com/en/article/bahrain-records-over-1400-cancer-cases-and-4500-dialysis-patients-in-202-wk_post-125000" }, { label: "News of Bahrain: East Riffa cancer centre proposal", url: "https://www.newsofbahrain.com/en/article/mps-to-revisit-east-riffa-site-plan-for-cancer-centre-wk_post-124930" }, { label: "Ministry of Health, Bahrain", url: "https://www.moh.gov.bh" }] }),

  i({ id: "salmaniya-medical-complex", name: "Salmaniya Medical Complex, Manama", aka: ["SMC"],
    city: "Manama", country: "BH", lat: 26.217, lng: 50.572, institutionType: "hospital",
    tldr: "A hospital in Manama whose oncology services, with those of King Hamad University Hospital, members of Parliament described in 2026 as under pressure from rising cancer cases.",
    summary: "In a January 2026 parliamentary proposal for a cancer site in East Riffa, members of Parliament cited the need to reduce pressure on the existing oncology services at Salmaniya Medical Complex and King Hamad University Hospital (News of Bahrain). The Ministry of Health's reply on 2024 figures says the dialysis service is delivered at Salmaniya Medical Complex and the Abdulrahman Kanoo Dialysis Centre. OnCo did not find a page of the hospital's own describing its oncology service.",
    programs: ["Oncology services"],
    institutions: ["bahrain-ministry-of-health", "bahrain-oncology-centre"],
    links: [{ label: "News of Bahrain: East Riffa cancer centre proposal", url: "https://www.newsofbahrain.com/en/article/mps-to-revisit-east-riffa-site-plan-for-cancer-centre-wk_post-124930" }, { label: "News of Bahrain: Ministry of Health reply on 2024 cancer and dialysis figures", url: "https://www.newsofbahrain.com/en/article/bahrain-records-over-1400-cancer-cases-and-4500-dialysis-patients-in-202-wk_post-125000" }] }),

  i({ id: "nhra-bahrain", name: "National Health Regulatory Authority, Bahrain (NHRA)", aka: ["NHRA"],
    city: "Manama", country: "BH", lat: 26.23, lng: 50.546, institutionType: "government", website: "https://www.nhra.bh",
    tldr: "Bahrain's independent health regulator. It licenses hospitals and health professionals, registers and prices medicines, and approves clinical trials.",
    summary: "The authority's overview page says it is an independent regulatory body established in 2010 under Law No. 38 of 2009, chaired by the Supreme Council of Health, that regulates healthcare in the government and private sectors. Its duties include licensing healthcare facilities and professionals, registering and pricing medicines, licensing pharmaceutical factories, granting approvals for clinical trials, and investigating professional misconduct. WHO's list of regulators operating at maturity level 3 or 4 (August 2026) does not include Bahrain.",
    programs: ["Medicine registration and pricing", "Clinical trial approval", "Licensing of facilities and professionals"],
    institutions: ["bahrain-ministry-of-health"],
    links: [{ label: "NHRA: overview", url: "https://www.nhra.bh/About/Overview/" }, { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" }] }),
];

/** Existing record id to the new institution ids it should list (applied in src/data/index.ts). */
export const countriesMenaBacklinks: Record<string, string[]> = {
  "institut-salah-azaiez": ["chu-farhat-hached-sousse", "chu-habib-bourguiba-sfax", "hopital-abderrahmen-mami-ariana", "cngmo-tunis", "jendouba-oncology-centre"],
  nct05894239: ["chu-farhat-hached-sousse", "chu-habib-bourguiba-sfax", "hopital-abderrahmen-mami-ariana"],
  nct04064060: ["chu-farhat-hached-sousse"],
  khcc: ["al-bashir-hospital", "jordan-cancer-registry", "an-najah-national-university-hospital"],
  nct06054555: ["al-khalidi-hospital-amman"],
  "tawam-hospital": ["sheikh-shakhbout-medical-city", "burjeel-medical-city", "friends-of-cancer-patients-uae", "emirates-drug-establishment"],
  "cleveland-clinic-abu-dhabi": ["sheikh-shakhbout-medical-city"],
  nct05443126: ["sheikh-shakhbout-medical-city"],
  nct05296798: ["burjeel-medical-city"],
  nct06422143: ["burjeel-medical-city"],
  "sultan-qaboos-cccrc": ["royal-hospital-national-oncology-centre-oman"],
  "oman-cancer-association": ["royal-hospital-national-oncology-centre-oman"],
  "hamad-medical-corporation": ["sidra-medicine", "qatar-cancer-society"],
  nct05566795: ["sidra-medicine"],
  "bahrain-oncology-centre": ["bahrain-ministry-of-health", "salmaniya-medical-complex", "nhra-bahrain"],
  iaea: ["tripoli-university-hospital", "nci-misurata", "nci-sabratha", "benghazi-national-cancer-center"],
};
