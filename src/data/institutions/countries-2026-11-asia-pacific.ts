import type { InstitutionInput } from "@/lib/schema";

/**
 * Institution census, November 2026: Asia and the Pacific (North Korea, Afghanistan, Cambodia, Laos, Kyrgyzstan,
 * Tajikistan, Turkmenistan, Mongolia, Timor-Leste, Brunei, Bhutan, Maldives, Fiji, Solomon Islands, Samoa, Vanuatu,
 * Guam). Every record was written from sources read as raw text on 11 November 2026:
 * - IAEA DIRAC's public equipment report (the JSON behind https://dirac.iaea.org/Data/CountriesLight, 8,625 centres),
 *   which gives each radiotherapy centre's name, city, equipment counts and year of last update.
 * - UICC member pages (https://www.uicc.org/membership/...) for the societies, foundations and hospitals that are
 *   members, and the National Cancer Grid member list held in src/data/universe-lists/ncg-members.json.
 * - Institutions' own sites: Calmette Hospital, Orange Cancer Clinic, the National Cancer Center of Mongolia (English
 *   page), Jerudong Park Medical Centre, Jigme Dorji Wangchuck National Referral Hospital (pages read through its
 *   WordPress API), Bhutan Cancer Society, Indira Gandhi Memorial Hospital, Fiji's Ministry of Health and Medical
 *   Services (cancer page), Vanuatu's Ministry of Health, Kyrgyzstan's Mandatory Health Insurance Fund and Department
 *   of Medicines, Laos's Food and Drug Department, Guam Regional Medical City, Guam Memorial Hospital Authority, and
 *   the University of Guam (Guam Cancer Registry page and its January 2019 news release on FHP Health Center).
 * - Papers found and resolved through Europe PMC (DOI and PubMed id read together), with every figure taken from the
 *   indexed abstract or the affiliation lines Europe PMC returns.
 *
 * Coordinates: Wikidata P625 for Calmette Hospital; OpenStreetMap Nominatim for Jamhuriat Hospital, Hospital Nacional
 * Guido Valadares, Jigme Dorji Wangchuck National Referral Hospital, Indira Gandhi Memorial Hospital, the National
 * Referral Hospital in Honiara, Tupua Tamasese Meaole Hospital, Jerudong Park Medical Centre, Guam Regional Medical
 * City, Guam Memorial Hospital and the University of Guam; IAEA DIRAC's own coordinates for the radiotherapy centres in
 * Pyongyang, Phnom Penh (Orange Cancer Clinic), Bishkek, Khujand, Ulaanbaatar and Turkmenistan, where they fall in the
 * named city. DIRAC's points for the Dushanbe and Vientiane centres fall outside those cities, so those records, and
 * every record without its own point, use a Nominatim city point and say "approximate city point" in the summary.
 *
 * North Korea: only IAEA DIRAC (entries last updated in 2016) and paper affiliations were read. OnCo read no WHO, IAEA
 * or government description of the country's cancer services, registry, regulator or payer, and writes none.
 *
 * Not read:
 * - Ministries of health of Cambodia (moh.gov.kh), Laos (moh.gov.la), Afghanistan (moh.gov.af), Timor-Leste
 *   (moh.gov.tl) and Solomon Islands (mohms.gov.sb): no connection or timed out.
 * - Cambodia's Department of Drugs and Food (ddf.gov.kh): no connection. National Social Security Fund (nssf.gov.kh):
 *   a 1 kB page with no text.
 * - Laos's National Health Insurance Bureau (nhi.gov.la): no connection.
 * - Kyrgyzstan's National Center of Oncology and Hematology (oncology.kg) and med.kg: no connection.
 * - Mongolia's Health Insurance General Office (emd.gov.mn): no connection. Ministry of Health (moh.gov.mn): a 6 kB
 *   script-only page. www.cancer-center.gov.mn timed out; the host without www answered and was read.
 * - Maldives's Aasandha (aasandha.mv): HTTP 403.
 * - Samoa Cancer Society (samoacancer.com) and Tupua Tamasese Meaole Hospital (ttm.gov.ws): no connection. Samoa's
 *   Ministry of Health site answered but its search API returned HTTP 403.
 * - Brunei's Ministry of Health search API: HTTP 403. Its home page was read but names no cancer service.
 * - FHP Health Center (fhphealth.org): no connection. Guam's Department of Public Health and Social Services
 *   (dphss.guam.gov): HTTP 400.
 * - The IAEA's Laos page (iaea.org/node/111892): HTTP 403.
 * - Turkmenistan and Tajikistan: no government health site was attempted beyond DIRAC; no ministry record is written.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DIRAC = { label: "IAEA DIRAC: radiotherapy centres and equipment (read 11 November 2026)", url: "https://dirac.iaea.org/Data/CountriesLight" };
const uicc = (slug: string, name: string) => ({ label: `UICC member page: ${name}`, url: `https://www.uicc.org/membership/${slug}` });
const epmc = (doi: string, label: string) => ({ label, url: `https://doi.org/${doi}` });
const NCG = { label: "National Cancer Grid: member list", url: "https://www.ncgindia.org/hospitals-and-institutions/members" };

export const institutionsCountriesAsiaPacific: InstitutionInput[] = [
  // ── North Korea (KP) ─────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "kp-red-cross-general-hospital-pyongyang", name: "Red Cross General Hospital, Pyongyang", aka: ["Korean Red Cross General Hospital"],
    city: "Pyongyang", country: "KP", lat: 39.039, lng: 125.763, institutionType: "hospital",
    tldr: "A hospital in Pyongyang that the International Atomic Energy Agency lists as having a cobalt radiotherapy machine. The agency's entry was last updated in 2016.",
    summary: "IAEA DIRAC lists the Red Cross General Hospital in Pyongyang (Saesalim street) as a radiotherapy centre with one cobalt-60 teletherapy unit and no linear accelerator, brachytherapy unit or CT scanner; the entry was last updated in 2016. DIRAC lists two centres in North Korea, the other being the Institute of Radiation Medicine of the Korean Academy of Medical Science. OnCo read no other primary source describing this hospital's cancer services and has no figure for its current equipment. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one cobalt-60 unit in IAEA DIRAC, entry updated 2016)"],
    institutions: ["kp-institute-of-radiation-medicine", "iaea"],
    links: [DIRAC] }),

  i({ id: "kp-institute-of-radiation-medicine", name: "Institute of Radiation Medicine, Korean Academy of Medical Science", aka: ["Korean Academy of Medical Science Institute of Radiation Medicine"],
    city: "Pyongyang", country: "KP", lat: 39.002, lng: 125.724, institutionType: "research-institute",
    tldr: "A medical research institute in Pyongyang that the International Atomic Energy Agency lists as a radiotherapy centre with one cobalt machine. The entry was last updated in 2016.",
    summary: "IAEA DIRAC lists the Korean Academy of Medical Science (Institute of Radiation Medicine) in Pyongchon, Pyongyang, as a radiotherapy centre with one cobalt-60 teletherapy unit and no linear accelerator, brachytherapy unit or CT scanner; the entry was last updated in 2016. It is one of two centres DIRAC lists for North Korea. OnCo read no other primary source on the institute. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one cobalt-60 unit in IAEA DIRAC, entry updated 2016)"],
    institutions: ["kp-red-cross-general-hospital-pyongyang", "kp-pyongyang-medical-university-hospital", "iaea"],
    links: [DIRAC] }),

  i({ id: "kp-pyongyang-medical-university-hospital", name: "Hospital of Pyongyang Medical University", aka: ["Hospital of Pyongyang Medical College", "Pyongyang University of Medical Sciences"],
    city: "Pyongyang", country: "KP", lat: 39.03, lng: 125.75, institutionType: "hospital",
    tldr: "A university hospital in Pyongyang whose surgeons have published on colon and breast cancer. OnCo has no description of its cancer services beyond those papers.",
    summary: "Known to OnCo only from paper affiliations resolved through Europe PMC. A 2022 systematic review of surgery for locally advanced right colon cancer invading the pancreas or duodenum (Frontiers in Medicine) lists authors from the Department of Colorectal Surgery of the Hospital of Pyongyang Medical College, and a 2023 laboratory study of CES2 in breast cancer (International Journal of General Medicine) lists the Department of General Surgery of the Hospital of Pyongyang Medical University. Neither paper describes the hospital's equipment, caseload or role in the national system, and OnCo read no WHO or government source that does. The coordinates are an approximate Pyongyang city point.",
    programs: ["Colorectal surgery department", "General surgery department"],
    institutions: ["kp-institute-of-radiation-medicine"],
    cancers: ["colorectal", "breast-cancer"],
    links: [
      epmc("10.3389/fmed.2022.1044163", "Ri et al., surgical treatment of locally advanced right colon cancer invading neighbouring organs (Front Med 2022)"),
      epmc("10.2147/ijgm.s406835", "CES2 in breast cancer, Hospital of Pyongyang Medical University authors (Int J Gen Med 2023)"),
    ] }),

  // ── Afghanistan (AF) ─────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "jamhuriat-hospital-cancer-centre", name: "Cancer Centre, Jamhuriat Hospital, Kabul", aka: ["Jamhuriat Hospital Cancer Centre", "Jamhuriat Hospital"],
    city: "Kabul", country: "AF", lat: 34.526, lng: 69.169, institutionType: "cancer-center",
    tldr: "A cancer centre inside Jamhuriat Hospital in Kabul, where senior cancer nurses described in 2025 how hard it is for patients to reach and afford care.",
    summary: "Known to OnCo from two papers whose authors give their affiliation as the Cancer Centre, Jamhuriat Hospital, Kabul. A 2025 opinion paper in Seminars in Oncology Nursing, drawing on an environmental scan and the reflections of two senior nurses working in cancer services in Kabul, describes cancer nursing in a dire state: a collapsed economy, limited investment in health services, restrictions on women's education, and nurses wishing to migrate; it proposes actions to support cancer nursing. A 2024 paper on oncology nursing in the Eastern Mediterranean Region (Annals of Palliative Medicine) also lists the centre. OnCo read no website of the centre and no figure for its beds, staff or equipment; IAEA DIRAC lists no radiotherapy centre in Afghanistan. Coordinates are Nominatim's point for Jamhuriat Hospital.",
    programs: ["Cancer nursing", "Cancer treatment (services not itemised in the sources read)"],
    // TODO: re-link kabul-cancer-registry (defined in the country deep dive, PR #395) once it merges.
    institutions: ["afghanistan-cancer-foundation"],
    links: [
      epmc("10.1016/j.soncn.2025.151895", "Samadi et al., inequities affecting cancer nursing care in Afghanistan (Semin Oncol Nurs 2025)"),
      epmc("10.21037/apm-23-511", "Oncology nursing in the Eastern Mediterranean Region (Ann Palliat Med 2024)"),
    ] }),

  i({ id: "herat-regional-hospital", name: "Herat Regional Hospital", aka: ["Oncology Department, Herat Regional Hospital"],
    city: "Herat", country: "AF", lat: 34.349, lng: 62.216, institutionType: "hospital",
    tldr: "A hospital in Herat, western Afghanistan, with an oncology department. A 2024 survey of 230 of its cancer patients found money worries were the heaviest burden they reported.",
    summary: "Herat Regional Hospital has an oncology department, where a cross-sectional study surveyed 230 patients with cancer between February and May 2024 using the EORTC QLQ-C30 questionnaire (Cancer Reports, 2025). Oesophageal and gastric cancers were the commonest types and most patients were at stage two; financial difficulty was the most burdensome symptom, social functioning scored lowest, and men reported higher overall quality of life than women. The authors, from Jami University in Herat, call for early diagnosis and supportive care that addresses financial toxicity. OnCo read no website of the hospital. The coordinates are an approximate Herat city point.",
    programs: ["Oncology department"],
    institutions: ["afghanistan-cancer-foundation"],
    cancers: ["esophageal", "gastric"],
    links: [epmc("10.1002/cnr2.70404", "Rahimi et al., quality of life in cancer patients at Herat Regional Hospital (Cancer Rep 2025)")] }),

  i({ id: "afghanistan-cancer-foundation", name: "Afghanistan Cancer Foundation", aka: ["ACF"],
    city: "Kabul", country: "AF", lat: 34.527, lng: 69.185, institutionType: "consortium", website: "https://www.afghanistancancerfoundation.org",
    tldr: "A non-profit organisation in Kabul, set up in 2015, that works on cancer awareness, early detection, palliative care and research support in Afghanistan.",
    summary: "UICC's member page (an Associate Member, updated December 2025) describes the Afghanistan Cancer Foundation as a non-governmental, non-partisan, non-profit organisation established in 2015 to strengthen cancer control through awareness, advocacy, palliative care and research support, founded on the initiative of the Director General of the Afghanistan Medical Council, Dr Shafaq Shinwari, together with Afghan women affected by cancer. Its own site gives its address in District 19 of Kabul near the Pul-e-Charkhi Jalalabad bus station and describes conferences, public education and its own guidelines. The coordinates are an approximate Kabul city point.",
    programs: ["Cancer awareness and early detection", "Palliative care", "Advocacy", "Research support"],
    // TODO: re-link kabul-cancer-registry (defined in the country deep dive, PR #395) once it merges.
    institutions: ["jamhuriat-hospital-cancer-centre", "herat-regional-hospital", "afghanistan-ncd-alliance"],
    links: [{ label: "Afghanistan Cancer Foundation", url: "https://www.afghanistancancerfoundation.org" }, uicc("afghanistan-cancer-foundation", "Afghanistan Cancer Foundation")] }),

  i({ id: "afghanistan-ncd-alliance", name: "Afghanistan NCD Alliance", aka: ["Afghanistan Non-Communicable Disease Alliance"],
    city: "Kabul", country: "AF", lat: 34.527, lng: 69.185, institutionType: "consortium",
    tldr: "A Kabul organisation working on non-communicable diseases, including cancer control, and a member of the Union for International Cancer Control.",
    summary: "UICC lists the Afghanistan NCD Alliance as an Associate Member in Kabul's 11th district. Its member statement says it works against non-communicable diseases in Afghanistan and directly on cancer control to prevent avoidable deaths. OnCo found no website of its own and no further detail of its programmes. The coordinates are an approximate Kabul city point.",
    programs: ["Cancer control advocacy"],
    institutions: ["afghanistan-cancer-foundation"],
    links: [uicc("afghanistan-ncd-alliance", "Afghanistan NCD Alliance")] }),

  // ── Cambodia (KH) ────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "calmette-hospital", name: "Calmette Hospital, Phnom Penh", aka: ["Hôpital Calmette", "National Calmette Hospital", "National Cancer Center, Calmette Hospital", "មន្ទីរពេទ្យកាល់ម៉ែត"],
    city: "Phnom Penh", country: "KH", lat: 11.581, lng: 104.916, institutionType: "hospital", website: "https://www.calmette.gov.kh",
    tldr: "A national hospital in Phnom Penh with a national cancer centre and radiotherapy, including internal radiotherapy (brachytherapy). It also trains health workers and does research.",
    summary: "Calmette Hospital describes itself on its own site as a national hospital with three missions: quality of care, training of health professionals, and research. IAEA DIRAC lists it as a radiotherapy centre at 3 Preah Monivong Boulevard with one linear accelerator and one brachytherapy unit (entry updated 2020). Researchers at its National Cancer Center, Department of Pathology and Department of Gynaecology studied 50 cervical cancer biopsies from April 2019 to March 2020 and found HPV 16 or 18 in 83.3% (BMC Women's Health, 2025). UICC lists the hospital as an Associate Member working on awareness of cervical and breast cancer screening. A 2026 geospatial study found Cambodia's radiotherapy facilities concentrated in Phnom Penh, with 37% of the population within two hours' drive. Coordinates are from Wikidata.",
    programs: ["Radiotherapy (one linear accelerator and brachytherapy in IAEA DIRAC)", "National Cancer Center", "Cervical and breast cancer screening awareness", "Pathology"],
    // TODO: re-link khmer-soviet-friendship-hospital (defined in the country deep dive, PR #395) once it merges.
    institutions: ["orange-cancer-clinic-phnom-penh", "iaea"],
    cancers: ["cervical", "breast-cancer"],
    links: [
      { label: "Calmette Hospital: about", url: "https://www.calmette.gov.kh/about" },
      DIRAC,
      uicc("calmette-hospital", "Calmette Hospital"),
      epmc("10.1186/s12905-025-03954-2", "Gardner et al., HPV among patients with cervical cancer in Cambodia (BMC Womens Health 2025)"),
      epmc("10.1016/j.ijrobp.2026.03.013", "Leow et al., radiation therapy accessibility in Cambodia and Mongolia (Int J Radiat Oncol Biol Phys 2026)"),
    ] }),

  i({ id: "orange-cancer-clinic-phnom-penh", name: "Orange Cancer Clinic, Phnom Penh", aka: ["Orange Cancer Clinic"],
    city: "Phnom Penh", country: "KH", lat: 11.556, lng: 104.928, institutionType: "cancer-center", website: "https://www.orangecancerclinic.com",
    tldr: "A private cancer clinic in Phnom Penh offering screening, scans, chemotherapy and other drug treatment, radiotherapy, surgery and supportive care.",
    summary: "IAEA DIRAC lists Orange Cancer Clinic on National Road 6A in Khan Chroy Changva, Phnom Penh, as a radiotherapy centre with one linear accelerator (entry updated 2024). Its own site describes a private oncology and haematology clinic providing screening, imaging (CT, mammography, X-ray and ultrasound), chemotherapy, immunotherapy and targeted therapy, radiation treatment, cancer surgery, inpatient care and supportive care. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator in IAEA DIRAC)", "Chemotherapy, immunotherapy and targeted therapy", "Cancer surgery", "Screening and imaging"],
    // TODO: re-link khmer-soviet-friendship-hospital (defined in the country deep dive, PR #395) once it merges.
    institutions: ["calmette-hospital"],
    links: [{ label: "Orange Cancer Clinic", url: "https://www.orangecancerclinic.com" }, DIRAC] }),

  // ── Laos (LA) ────────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "national-cancer-center-laos", name: "National Cancer Center, Lao PDR (Mittaphab Hospital)", aka: ["Cancer Center, Mittaphab Hospital", "Mittaphab Central Cancer Hospital", "Laos Oncology Unit", "National Cancer Center Laos"],
    city: "Vientiane", country: "LA", lat: 17.964, lng: 102.613, institutionType: "cancer-center",
    tldr: "The cancer unit at Mittaphab Hospital in Vientiane, giving chemotherapy, palliative care and, since 2017, radiotherapy. It keeps a hospital cancer registry going back to 2010.",
    summary: "UICC's member page for the National Cancer Center Laos (an Associate Member) says the Laos Oncology Unit is part of Mittaphab Central Hospital in Vientiane Capital, with limited facilities and staff, providing chemotherapy and palliative care, with radiotherapy since 2017. IAEA DIRAC lists the Mittaphab Central Cancer Hospital on Phontong-Dongdok road with one linear accelerator and no brachytherapy unit (entry updated 2022). A 2026 analysis of its hospital-based registry (BMC Public Health) counted 1,738 cancers recorded from 2010 to 2024: liver and bile duct cancer was the commonest in men (15.1%) and cervical cancer in women (41.1%); cases were concentrated around Vientiane, and the authors note that Laos has no national population-based registry. The coordinates are an approximate Vientiane city point, as DIRAC's point falls outside the city.",
    programs: ["Chemotherapy", "Palliative care", "Radiotherapy since 2017 (one linear accelerator in IAEA DIRAC)", "Hospital-based cancer registry (2010 onwards)"],
    institutions: ["lao-food-and-drug-department", "iaea"],
    cancers: ["cervical", "hcc", "breast-cancer"],
    links: [
      uicc("national-cancer-center-laos", "National Cancer Center Laos"),
      DIRAC,
      epmc("10.1186/s12889-026-27554-3", "Vongdala et al., cancer cases in the national hospital-based registry of Lao PDR, 2010 to 2024 (BMC Public Health 2026)"),
    ] }),

  i({ id: "lao-food-and-drug-department", name: "ກົມອາຫານ ແລະ ຢາ (Food and Drug Department, Ministry of Health, Lao PDR)", aka: ["Food and Drug Department, Laos", "FDD Laos"],
    city: "Vientiane", country: "LA", lat: 17.964, lng: 102.613, institutionType: "government", website: "https://www.fdd.gov.la",
    tldr: "The department of Laos's Ministry of Health that registers medicines and food products and controls their import.",
    summary: "The Food and Drug Department is a department of the Lao Ministry of Health. Its site, in Lao, publishes the laws and regulations it applies, registration of products, guidance manuals, import procedures, product information and statistics. OnCo read no description of how it assesses cancer medicines and no WHO maturity rating for it. The coordinates are an approximate Vientiane city point.",
    programs: ["Product registration", "Import control"],
    institutions: ["national-cancer-center-laos"],
    links: [{ label: "Food and Drug Department, Lao PDR", url: "https://www.fdd.gov.la" }] }),

  // ── Kyrgyzstan (KG) ──────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "kg-national-center-of-oncology-and-hematology", name: "National Center of Oncology and Hematology of the Kyrgyz Republic", aka: ["Национальный центр онкологии и гематологии Кыргызской Республики", "NCOH Kyrgyzstan"],
    city: "Bishkek", country: "KG", lat: 42.875, lng: 74.57, institutionType: "cancer-center",
    tldr: "Kyrgyzstan's national centre for cancer and blood diseases in Bishkek, which gives radiotherapy, including internal radiotherapy (brachytherapy).",
    summary: "IAEA DIRAC lists the National Center of Oncology and Hematology of the Kyrgyz Republic at Akhunbaeva 92 in Bishkek as a radiotherapy centre with one cobalt-60 teletherapy unit, one cobalt-60 high-dose-rate brachytherapy unit, one CT scanner and no linear accelerator (entry updated 2025); it is the one centre DIRAC lists for the country. Its staff publish with the Kyrgyz State Medical Academy on cervical cancer, including a 2024 paper on years of life lost and a 2026 paper on morbidity and mortality in Osh oblast. The UICC member Ergene says it develops cancer control programmes with the national centre of oncology. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (cobalt-60 teletherapy and brachytherapy in IAEA DIRAC)", "Haematology"],
    institutions: ["kg-mandatory-health-insurance-fund", "kg-department-of-medicines", "ergene-kyrgyzstan", "vmeste-protiv-raka-kyrgyzstan", "iaea"],
    cancers: ["cervical"],
    links: [
      DIRAC,
      epmc("10.32687/0869-866x-2024-32-3-462-466", "Years of potential life lost to cervical cancer in the Kyrgyz Republic (2024)"),
      epmc("10.32687/0869-866x-2026-34-2-318-321", "Cervical cancer morbidity and mortality in Osh oblast (2026)"),
    ] }),

  i({ id: "kg-mandatory-health-insurance-fund", name: "Mandatory Health Insurance Fund, Kyrgyzstan", aka: ["Фонд обязательного медицинского страхования при Министерстве здравоохранения Кыргызской Республики", "FOMS Kyrgyzstan", "Фонд ОМС"],
    city: "Bishkek", country: "KG", lat: 42.876, lng: 74.604, institutionType: "government", website: "https://foms.kg",
    tldr: "Kyrgyzstan's public health insurer, which sits under the Ministry of Health, pays health facilities and runs the scheme for subsidised medicines.",
    summary: "The Mandatory Health Insurance Fund under the Ministry of Health of the Kyrgyz Republic finances health organisations working in the single-payer system, administers the State Guarantees Programme for medical care and the programme of subsidised (preferential) medicines, and runs a telephone hotline, 113, according to its own site. In 2026 its site reported a presidential decree for a pilot of a new model of the State Guarantees Programme. OnCo did not read which cancer medicines or treatments the programmes cover. The coordinates are an approximate Bishkek city point.",
    programs: ["State Guarantees Programme", "Subsidised medicines programme", "Single-payer financing of health facilities"],
    institutions: ["kg-national-center-of-oncology-and-hematology"],
    links: [{ label: "Mandatory Health Insurance Fund of the Kyrgyz Republic", url: "https://foms.kg" }] }),

  i({ id: "kg-department-of-medicines", name: "Department of Medicines and Medical Devices, Kyrgyzstan", aka: ["Департамент лекарственных средств и медицинских изделий при Министерстве здравоохранения Кыргызской Республики", "DLS Kyrgyzstan", "ДЛС и МИ"],
    city: "Bishkek", country: "KG", lat: 42.876, lng: 74.604, institutionType: "government", website: "https://www.dlsmi.kg",
    tldr: "Kyrgyzstan's medicines regulator, part of the Ministry of Health. It registers medicines and devices, keeps the national register and list of essential medicines, and monitors side effects.",
    summary: "The Department of Medicines and Medical Devices under the Ministry of Health implements state policy on supplying the population and health facilities with medicines and medical devices and runs the system for controlling their safety, efficacy and quality, according to its own site. The site publishes the State Register of medicines and medical devices, the list of vital and essential medicines, registration under the rules of the Eurasian Economic Union, pharmacovigilance reporting, pharmaceutical inspection, its quality-control laboratories, price regulation and traceability. The coordinates are an approximate Bishkek city point.",
    programs: ["Registration of medicines and devices (Eurasian Economic Union rules)", "State Register of medicines and medical devices", "List of vital and essential medicines", "Pharmacovigilance", "Price regulation"],
    institutions: ["kg-national-center-of-oncology-and-hematology"],
    links: [{ label: "Department of Medicines and Medical Devices, Kyrgyz Republic", url: "https://www.dlsmi.kg" }] }),

  i({ id: "ergene-kyrgyzstan", name: "Public Foundation Ergene", aka: ["Общественный фонд «Эргэнэ»", "Ergene"],
    city: "Bishkek", country: "KG", lat: 42.876, lng: 74.604, institutionType: "consortium", website: "https://ergene.org.kg",
    tldr: "A Bishkek non-profit founded in 2006 that runs breast cancer awareness and early detection work with Kyrgyzstan's Ministry of Health.",
    summary: "UICC's member page says Ergene is a non-profit founded in August 2006 that runs breast cancer control programmes with the Ministry of Health, the President's administration and the Ministry of Social Affairs, including the \"Necklace\" awareness project with educational cards, collaborates with the national centre of oncology on cancer control programmes, and joined UICC as an Associate Member in 2008. Its own site publishes guides for women on breast and cervical cancer and a patient guide for stage III breast cancer. The coordinates are an approximate Bishkek city point.",
    programs: ["Breast cancer early detection", "Patient guides on breast and cervical cancer"],
    institutions: ["kg-national-center-of-oncology-and-hematology"],
    cancers: ["breast-cancer", "cervical"],
    links: [{ label: "Public Foundation Ergene", url: "https://ergene.org.kg" }, uicc("public-foundation-ergene", "Public Foundation \"Ergene\"")] }),

  i({ id: "vmeste-protiv-raka-kyrgyzstan", name: "Public Fund Vmeste Protiv Raka", aka: ["Общественный фонд «Вместе против рака»", "Together against cancer, Kyrgyz Republic"],
    city: "Bishkek", country: "KG", lat: 42.875, lng: 74.57, institutionType: "consortium",
    tldr: "A Bishkek patient group for women with breast and cervical cancer. It lobbies for public money for cancer medicines and gives information and psychological support.",
    summary: "UICC's member page (an Associate Member, at 92 Akhunbaev street, the address IAEA DIRAC gives for the National Center of Oncology and Hematology) says the fund lobbies for state budget money for targeted chemotherapy medicines for women with breast and cervical cancer, runs a consultation room giving information and psychological help to newly diagnosed women, runs a sewing workshop where patients make handbags and post-mastectomy pillows to earn money for chemotherapy, and takes part in tenders for medicines. OnCo found no website of its own. Coordinates are DIRAC's point for the oncology centre at the same address.",
    programs: ["Patient information and psychological support", "Advocacy for funding of cancer medicines"],
    institutions: ["kg-national-center-of-oncology-and-hematology"],
    cancers: ["breast-cancer", "cervical"],
    links: [uicc("public-fund-vmeste-protiv-raka-together-against-cancer-kyrgyz-republic", "Public Fund Vmeste Protiv Raka")] }),

  // ── Tajikistan (TJ) ──────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "tj-oncological-scientific-centre", name: "State Institution \"Oncological Scientific Centre\", Dushanbe", aka: ["Republican Oncological Scientific Centre", "Oncology Scientific Centre of Tajikistan"],
    city: "Dushanbe", country: "TJ", lat: 38.586, lng: 68.76, institutionType: "cancer-center",
    tldr: "A state cancer centre in Dushanbe that gives radiotherapy, including internal radiotherapy.",
    summary: "IAEA DIRAC lists the State Institution \"Oncological Scientific Centre\" at Ismoili Somoni 59A in Dushanbe as a radiotherapy centre with one cobalt-60 teletherapy unit, one cobalt-60 brachytherapy unit, a simulator and no linear accelerator or CT scanner (entry updated 2026). DIRAC lists one other centre in Tajikistan, in Khujand. OnCo read no website of the centre. The coordinates are an approximate Dushanbe city point, as DIRAC's point falls outside the city.",
    programs: ["Radiotherapy (cobalt-60 teletherapy and brachytherapy in IAEA DIRAC)"],
    institutions: ["tj-sughd-regional-oncology-centre", "avesto-tajikistan", "iaea"],
    links: [DIRAC] }),

  i({ id: "tj-sughd-regional-oncology-centre", name: "Sughd Regional Oncology Centre", aka: ["Sughd Oblast Oncology Centre"],
    city: "Khujand", country: "TJ", lat: 40.268, lng: 69.645, institutionType: "cancer-center",
    tldr: "A regional cancer centre in Khujand, northern Tajikistan, with a cobalt radiotherapy machine.",
    summary: "IAEA DIRAC lists the Sughd Regional Oncology Centre at No. 4 S. Hakimboev street, Khujand, as a radiotherapy centre with one cobalt-60 teletherapy unit and no brachytherapy unit or CT scanner (entry updated 2021). OnCo read no other source on the centre. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one cobalt-60 unit in IAEA DIRAC)"],
    institutions: ["tj-oncological-scientific-centre"],
    links: [DIRAC] }),

  i({ id: "avesto-tajikistan", name: "NGO AVESTO Tajikistan", aka: ["AVESTO"],
    city: "Dushanbe", country: "TJ", lat: 38.586, lng: 68.76, institutionType: "consortium",
    tldr: "A Dushanbe organisation working on breast cancer prevention, patient support and advocacy, including for women with breast cancer that has spread.",
    summary: "UICC lists NGO AVESTO Tajikistan as a Full Member at Rachimi street 1, Dushanbe. Its member statement lists prevention of breast cancer, patient advocacy, support for patients with metastatic breast cancer, and lobbying government and parliament to change state health law. OnCo found no website of its own. The coordinates are an approximate Dushanbe city point.",
    programs: ["Breast cancer prevention", "Support for people with metastatic breast cancer", "Patient advocacy"],
    institutions: ["tj-oncological-scientific-centre"],
    cancers: ["breast-cancer"],
    links: [uicc("ngo-avesto-tajikistan", "NGO AVESTO Tajikistan")] }),

  // ── Turkmenistan (TM) ────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "tm-oncology-centre-ashgabat", name: "Oncology Centre, Ashgabat", aka: ["Ashgabat Oncology Centre"],
    city: "Ashgabat", country: "TM", lat: 37.96, lng: 58.326, institutionType: "cancer-center",
    tldr: "The cancer centre in Turkmenistan's capital, which the International Atomic Energy Agency lists with two linear accelerators for radiotherapy.",
    summary: "IAEA DIRAC lists the Oncology Centre Ashgabat with two linear accelerators and one brachytherapy unit (entry updated 2018). DIRAC lists four other radiotherapy centres in Turkmenistan, one in each of the Balkan, Dashoguz, Lebap and Mary regions, each with cobalt-60 units. OnCo read no website of the centre and no Turkmen government source, so has no detail of its services beyond DIRAC. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (two linear accelerators and brachytherapy in IAEA DIRAC, entry updated 2018)"],
    institutions: ["tm-balkan-regional-oncology-centre", "tm-dashoguz-regional-oncology-centre", "tm-lebap-regional-oncology-centre", "tm-mary-regional-oncology-centre", "iaea"],
    links: [DIRAC] }),

  i({ id: "tm-balkan-regional-oncology-centre", name: "Balkan Regional Centre (oncology), Balkanabat", aka: ["Balkan Regional Centre"],
    city: "Balkanabat", country: "TM", lat: 39.524, lng: 54.336, institutionType: "cancer-center",
    tldr: "A regional radiotherapy centre in Balkanabat, western Turkmenistan.",
    summary: "IAEA DIRAC lists the Balkan Regional Centre in Balkanabat with one cobalt-60 teletherapy unit and one brachytherapy unit (entry updated 2018). OnCo read no other source on it. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (cobalt-60 and brachytherapy in IAEA DIRAC, entry updated 2018)"],
    institutions: ["tm-oncology-centre-ashgabat"],
    links: [DIRAC] }),

  i({ id: "tm-dashoguz-regional-oncology-centre", name: "Dashoguz Regional Centre (oncology)", aka: ["Dashoguz Regional Centre"],
    city: "Dashoguz", country: "TM", lat: 41.837, lng: 59.965, institutionType: "cancer-center",
    tldr: "A regional radiotherapy centre in Dashoguz, northern Turkmenistan.",
    summary: "IAEA DIRAC lists the Dashoguz Regional Centre with one cobalt-60 teletherapy unit and one brachytherapy unit (entry updated 2018). OnCo read no other source on it. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (cobalt-60 and brachytherapy in IAEA DIRAC, entry updated 2018)"],
    institutions: ["tm-oncology-centre-ashgabat"],
    links: [DIRAC] }),

  i({ id: "tm-lebap-regional-oncology-centre", name: "Lebap Regional Centre (oncology), Türkmenabat", aka: ["Lebap Regional Centre"],
    city: "Türkmenabat", country: "TM", lat: 39.004, lng: 63.569, institutionType: "cancer-center",
    tldr: "A regional radiotherapy centre in Türkmenabat, eastern Turkmenistan.",
    summary: "IAEA DIRAC lists the Lebap Regional Centre in Türkmenabat with one cobalt-60 teletherapy unit and one brachytherapy unit (entry updated 2018). OnCo read no other source on it. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (cobalt-60 and brachytherapy in IAEA DIRAC, entry updated 2018)"],
    institutions: ["tm-oncology-centre-ashgabat"],
    links: [DIRAC] }),

  i({ id: "tm-mary-regional-oncology-centre", name: "Mary Regional Centre (oncology)", aka: ["Mary Regional Centre"],
    city: "Mary", country: "TM", lat: 37.609, lng: 61.864, institutionType: "cancer-center",
    tldr: "A regional radiotherapy centre in Mary, southern Turkmenistan.",
    summary: "IAEA DIRAC lists the Mary Regional Centre with two cobalt-60 teletherapy units and no brachytherapy unit (entry updated 2018). OnCo read no other source on it. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (two cobalt-60 units in IAEA DIRAC, entry updated 2018)"],
    institutions: ["tm-oncology-centre-ashgabat"],
    links: [DIRAC] }),

  // ── Mongolia (MN) ────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "national-cancer-center-mongolia", name: "Хавдар Судлалын Үндэсний Төв (National Cancer Center of Mongolia)", aka: ["National Cancer Center of Mongolia", "NCC Mongolia", "ХСҮТ"],
    city: "Ulaanbaatar", country: "MN", lat: 47.92, lng: 106.91, institutionType: "cancer-center", website: "https://cancer-center.gov.mn/about-us/english/",
    tldr: "Mongolia's state cancer hospital in Ulaanbaatar, founded in 1961, which diagnoses and treats cancer, runs screening and early detection, gives radiotherapy and does cancer research and training.",
    summary: "The centre's English page says it was established in 1961 by Ministry of Health order 24 as the \"Radiation therapy Hospital\" with 45 beds, moved into a new building in 1982, and grew to 206 beds and 489 employees; it now has 12 units and 18 clinical departments with about 116 oncology doctors and 242 nurses. It describes itself as the state institution responsible for cancer epidemiology surveys, and provides early detection, prevention, diagnosis, treatment, research and training; it lists a 2013 to 2016 subprogramme on screening and early detection of liver cancer. UICC lists it as a Full Member. IAEA DIRAC lists it on Nam Yan Ju street with three linear accelerators, three cobalt-60 units, cobalt-60 brachytherapy and three CT scanners (entry updated 2025), the one radiotherapy centre DIRAC lists for Mongolia; a 2026 geospatial study found 55% of Mongolians within two hours' drive of it, with a first regional facility planned in Khovd. Coordinates are DIRAC's approximate point.",
    programs: ["Radiotherapy (three linear accelerators, three cobalt-60 units and brachytherapy in IAEA DIRAC)", "Cancer epidemiology and registration", "Screening and early detection of liver cancer (2013 to 2016)", "Training of oncology specialists"],
    institutions: ["national-cancer-council-mongolia", "onom-foundation", "iaea"],
    cancers: ["hcc"],
    links: [
      { label: "National Cancer Center of Mongolia: English page", url: "https://cancer-center.gov.mn/about-us/english/" },
      uicc("national-cancer-center-mongolia", "National Cancer Center of Mongolia"),
      DIRAC,
      epmc("10.1016/j.ijrobp.2026.03.013", "Leow et al., radiation therapy accessibility in Cambodia and Mongolia (Int J Radiat Oncol Biol Phys 2026)"),
    ] }),

  i({ id: "national-cancer-council-mongolia", name: "National Cancer Council of Mongolia", aka: ["Үндэсний Хорт Хавдартай Тэмцэх Зөвлөл"],
    city: "Ulaanbaatar", country: "MN", lat: 47.918, lng: 106.918, institutionType: "consortium", website: "https://www.cancercouncilmongolia.mn",
    tldr: "A Mongolian non-governmental organisation, founded in 2014, that works on reducing cancer risk, supporting patients and public health research.",
    summary: "UICC lists the National Cancer Council of Mongolia as a Full Member in Bayanzurkh district, Ulaanbaatar. Its member statement says it is a non-governmental organisation founded in 2014 whose vision is to reduce cancer risk and ensure good cancer care for everyone in Mongolia, with core services in health promotion, support and public health research. The coordinates are an approximate Ulaanbaatar city point.",
    programs: ["Health promotion", "Patient support", "Public health research"],
    institutions: ["national-cancer-center-mongolia"],
    links: [uicc("national-cancer-council-mongolia", "National Cancer Council of Mongolia"), { label: "National Cancer Council of Mongolia", url: "https://www.cancercouncilmongolia.mn" }] }),

  i({ id: "onom-foundation", name: "Onom Foundation", aka: ["Ономын сан"],
    city: "Ulaanbaatar", country: "MN", lat: 47.918, lng: 106.918, institutionType: "consortium",
    tldr: "A Mongolian foundation that started a national programme to prevent, control and eliminate hepatitis, to tackle liver cancer, and runs tobacco and heart health programmes.",
    summary: "UICC lists the Onom Foundation as a Full Member in Ulaanbaatar. Its member statement says it initiated Mongolia's Hepatitis Prevention, Control and Elimination Program (Элэг Бүтэн Монгол Хөтөлбөр) to address liver cancer, and runs Smoke Free Mongolia and Better Hearts programmes, including Better Hearts Better Cities in Ulaanbaatar with the Novartis Foundation; each project has a research component. The coordinates are an approximate Ulaanbaatar city point.",
    programs: ["Hepatitis Prevention, Control and Elimination Program", "Smoke Free Mongolia"],
    institutions: ["national-cancer-center-mongolia"],
    cancers: ["hcc"],
    links: [uicc("onom-foundation", "Onom Foundation")] }),

  // ── Timor-Leste (TL) ─────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "hospital-nacional-guido-valadares", name: "Hospital Nacional Guido Valadares", aka: ["Guido Valadares National Hospital", "HNGV"],
    city: "Dili", country: "TL", lat: -8.555, lng: 125.593, institutionType: "hospital",
    tldr: "Timor-Leste's national hospital in Dili, where women with suspected breast cancer are referred for biopsy and surgery.",
    summary: "The Alola Foundation's UICC member statement says its HALIKU breast cancer programme refers women with advanced breast cancer to the national hospital for biopsy and supports them after surgery. Physicians from the hospital took part in 2026 surveys of palliative care for children with cancer across Asia Pacific (JCO Global Oncology) and in the International Society of Paediatric Oncology's mapping of childhood cancer services in Oceania (Pediatric Blood and Cancer, 2026). IAEA DIRAC lists no radiotherapy centre in Timor-Leste. OnCo read no website of the hospital and no Ministry of Health source. Coordinates are Nominatim's.",
    programs: ["Breast cancer biopsy and surgery"],
    institutions: ["alola-foundation"],
    cancers: ["breast-cancer"],
    links: [
      uicc("alola-foundation", "Alola Foundation"),
      epmc("10.1200/go-25-00512", "Barriers to palliative care integration for children with cancer across Asia Pacific (JCO Glob Oncol 2026)"),
      epmc("10.1002/1545-5017.70579", "Mapping childhood cancer care services in Oceania (Pediatr Blood Cancer 2026)"),
    ] }),

  i({ id: "alola-foundation", name: "Fundasaun Alola (Alola Foundation)", aka: ["Alola Foundation", "HALIKU"],
    city: "Dili", country: "TL", lat: -8.554, lng: 125.578, institutionType: "consortium", website: "https://www.alolafoundation.org",
    tldr: "A Timorese charity for women and children whose breast cancer programme teaches women the signs of breast cancer and helps them through diagnosis and surgery at the national hospital.",
    summary: "UICC lists the Alola Foundation as an Associate Member in Dili. Its member statement says HALIKU (\"I choose to be healed\") runs under its maternal and child health programme to increase women's understanding of prevention, early detection and treatment of breast cancer: it educates on symptoms and risk factors, promotes breast self-examination, uses community radio and newsletters, and refers women with advanced breast cancer to the national hospital for biopsy, then supports and counsels them after surgery. The coordinates are an approximate Dili city point.",
    programs: ["HALIKU breast cancer awareness and patient support"],
    institutions: ["hospital-nacional-guido-valadares"],
    cancers: ["breast-cancer"],
    links: [uicc("alola-foundation", "Alola Foundation"), { label: "Alola Foundation", url: "https://www.alolafoundation.org" }] }),

  // ── Brunei (BN) ──────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "brunei-cancer-centre-jpmc", name: "The Brunei Cancer Centre, Jerudong Park Medical Centre", aka: ["The Brunei Cancer Centre", "TBCC", "Jerudong Park Medical Centre", "JPMC", "Pantai Jerudong Specialist Centre"],
    city: "Jerudong", country: "BN", lat: 4.949, lng: 114.83, institutionType: "cancer-center", website: "https://jpmcbrunei.com",
    tldr: "A cancer centre in Brunei, part of the private Jerudong Park Medical Centre, which gives radiotherapy, including internal radiotherapy, and other cancer treatment.",
    summary: "Jerudong Park Medical Centre, a private specialist hospital founded in 1992, merged with the Pantai Jerudong Specialist Centre from 1 January 2025, forming three centres of excellence of which The Brunei Cancer Centre is one, according to its own site. IAEA DIRAC lists The Brunei Cancer Centre at Jerudong Park with two linear accelerators, iridium-192 brachytherapy and a CT scanner (entry updated 2025), the one centre DIRAC lists for Brunei. UICC lists JPMC as a Full Member. A 2025 study of 431 women treated for breast cancer from 2013 to 2022, using the Brunei Darussalam Cancer Registry and co-authored at the centre, found treatment delays over 60 days linked to a hazard ratio for death of 2.5. Coordinates are Nominatim's point for the medical centre.",
    programs: ["Radiotherapy (two linear accelerators and brachytherapy in IAEA DIRAC)", "Cancer treatment"],
    institutions: ["brunei-darussalam-cancer-registry", "iaea"],
    cancers: ["breast-cancer"],
    links: [
      { label: "Jerudong Park Medical Centre: about us", url: "https://jpmcbrunei.com/about-us/" },
      DIRAC,
      uicc("jerudong-park-medical-centre-jpmc", "Jerudong Park Medical Centre (JPMC)"),
      epmc("10.1186/s12885-025-13861-2", "Yean et al., breast cancer treatment, delays and survival in Brunei Darussalam (BMC Cancer 2025)"),
    ] }),

  i({ id: "brunei-darussalam-cancer-registry", name: "Brunei Darussalam Cancer Registry", aka: ["Brunei Cancer Registry"],
    city: "Bandar Seri Begawan", country: "BN", lat: 4.89, lng: 114.942, institutionType: "government",
    tldr: "Brunei's national cancer registry, whose records researchers use to study how cancer is treated and how long people live after diagnosis.",
    summary: "Known to OnCo from a 2025 study in BMC Cancer that analysed Brunei Darussalam Cancer Registry data on 431 women diagnosed and treated for breast cancer from 2013 to 2022: 45.7% were diagnosed at regional stage and 39.0% at localised stage, surgery was the commonest first treatment (55.9%, median 37 days from diagnosis), and 62.9% were treated within 60 days. OnCo read no page of the registry or the Ministry of Health describing who runs it or how it collects data. The coordinates are an approximate Bandar Seri Begawan city point.",
    programs: ["National cancer registration"],
    institutions: ["brunei-cancer-centre-jpmc"],
    related: ["cancer-registries-surveillance"],
    cancers: ["breast-cancer"],
    links: [epmc("10.1186/s12885-025-13861-2", "Yean et al., breast cancer treatment, delays and survival in Brunei Darussalam (BMC Cancer 2025)")] }),

  // ── Bhutan (BT) ──────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "jdwnrh-bhutan", name: "Jigme Dorji Wangchuck National Referral Hospital", aka: ["JDWNRH", "National Referral Hospital, Thimphu"],
    city: "Thimphu", country: "BT", lat: 27.463, lng: 89.638, institutionType: "hospital", website: "https://jdwnrh.gov.bt",
    tldr: "Bhutan's national referral and teaching hospital in Thimphu. It has gynaecological cancer care since 2008, cancer surgery, palliative chemotherapy, and houses the national cancer registry.",
    summary: "The hospital's mandate is to function as the National Referral Hospital, the regional referral hospital for the western region and the teaching hospital of Khesar Gyalpo University of Medical Sciences of Bhutan, and to manage referral of patients abroad, according to its own site. Its obstetrics and gynaecology department lists gynaecologic oncology since 2008, colposcopy since 2002, basic palliative care and basic palliative chemotherapy; its orthopaedics department lists a musculoskeletal tumour clinic and limb preservation surgery. Its authors publish from a Department of Oncosurgery. Bhutan's population-based cancer registry was established in the hospital in 2014. The National Cancer Grid lists it as a member cancer centre or unit. IAEA DIRAC lists no radiotherapy centre in Bhutan. Coordinates are Nominatim's.",
    programs: ["Gynaecologic oncology (since 2008)", "Colposcopy and treatment of cervical precancer", "Basic palliative chemotherapy", "Musculoskeletal tumour surgery", "Referral of patients abroad"],
    institutions: ["bhutan-population-based-cancer-registry", "bhutan-cancer-society"],
    cancers: ["cervical", "colorectal"],
    links: [
      { label: "JDWNRH: mandates", url: "https://jdwnrh.gov.bt/about-us/" },
      { label: "JDWNRH: obstetrics and gynaecology department", url: "https://jdwnrh.gov.bt/clinical-departments/gynecology/" },
      { label: "JDWNRH: orthopaedics department", url: "https://jdwnrh.gov.bt/clinical-departments/orthopedics/" },
      NCG,
      epmc("10.1186/s12885-025-15037-4", "Clinical and epidemiological profile of colorectal cancer in Bhutan, Department of Oncosurgery authors (BMC Cancer 2025)"),
    ] }),

  i({ id: "bhutan-population-based-cancer-registry", name: "Population-Based Cancer Registry of Bhutan", aka: ["Bhutan Cancer Registry", "National Cancer Registry, Bhutan"],
    city: "Thimphu", country: "BT", lat: 27.463, lng: 89.638, institutionType: "government",
    tldr: "Bhutan's national cancer registry, set up in 2014 at the national referral hospital. It recorded 5,906 new cancers from 2014 to 2022, with stomach cancer leading in men and cervical cancer in women.",
    summary: "The registry was established in Jigme Dorji Wangchuck National Referral Hospital in 2014 with the support of Bhutan's Ministry of Health and the IARC Regional Hub at Tata Memorial Centre, Mumbai, which checks its data quality, and covers the whole population of about 0.7 million (International Journal of Cancer, 2026). Trained staff collect cases from hospitals and diagnostic facilities into CanReg5. From 2014 to 2022 it registered 5,906 cancers; age-adjusted incidence was 88.3 per 100,000 in men and 113.2 in women. The leading sites were stomach, oesophagus, liver, lung and rectum in men, and cervix, stomach, breast, lung and thyroid in women. The Bhutan Cancer Society says it helped establish and assists the registry unit. Coordinates are Nominatim's point for the hospital.",
    programs: ["Nationwide population-based cancer registration (from 2014)"],
    institutions: ["jdwnrh-bhutan", "iarc"],
    related: ["cancer-registries-surveillance"],
    cancers: ["gastric", "cervical", "breast-cancer", "esophageal"],
    links: [
      epmc("10.1002/ijc.70308", "Tshering et al., cancer pattern in Bhutan 2014 to 2022 from the population-based cancer registry (Int J Cancer 2026)"),
      uicc("bhutan-cancer-society", "Bhutan Cancer Society"),
    ] }),

  i({ id: "bhutan-cancer-society", name: "Bhutan Cancer Society", aka: ["BCS"],
    city: "Thimphu", country: "BT", lat: 27.471, lng: 89.634, institutionType: "consortium", website: "https://www.bcs.org.bt",
    tldr: "A Bhutanese charity launched in 2015 that runs cancer awareness and early detection outreach, especially for monks, nuns and rural people, and supports patients and families.",
    summary: "The Bhutan Cancer Society is a public benefit organisation registered with the Civil Society Organizations Authority, founded by public health specialist Dechen Wangmo and gynae-oncologist Dr Ugyen Tshomo of the National Referral Hospital and launched on 4 February 2015, according to its own site. UICC's member page (an Associate Member) describes awareness campaigns, prevention and early detection services during advocacy programmes aimed mainly at nuns, monks and rural people, and says that with the Ministry of Health and the National Referral Hospital it established and assists the National Cancer Registry unit. The coordinates are an approximate Thimphu city point.",
    programs: ["Cancer awareness campaigns", "Early detection outreach", "Patient and family support"],
    institutions: ["jdwnrh-bhutan", "bhutan-population-based-cancer-registry"],
    links: [{ label: "Bhutan Cancer Society", url: "https://www.bcs.org.bt" }, uicc("bhutan-cancer-society", "Bhutan Cancer Society")] }),

  // ── Maldives (MV) ────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "igmh-maldives", name: "Indira Gandhi Memorial Hospital", aka: ["IGMH", "National Cancer Centre of Maldives", "National Cancer Centre, IGMH"],
    city: "Malé", country: "MV", lat: 4.173, lng: 73.501, institutionType: "hospital", website: "https://www.igmh.gov.mv/en",
    tldr: "The government's tertiary hospital in Malé, home since 2023 to the National Cancer Centre of Maldives, which offers cancer screening, chemotherapy, cancer surgery and palliative care.",
    summary: "Indira Gandhi Memorial Hospital is the government's tertiary hospital in Malé, with about 300 beds, opened under that name on 15 April 1995 with help from the Government of India, and its services are covered by the national social health insurance, Aasandha, according to its own site. Its National Cancer Centre began in January 2018 as a sub-unit of general surgery with one cancer surgeon, added chemotherapy, an oncology department and an in-house medical oncologist, and became the National Cancer Centre of Maldives with a dedicated oncology ward in 2023. It offers cancer screening, diagnostic evaluation, day-care chemotherapy, oncological surgery, management of oncological emergencies, palliative and end-of-life care, and weekly multidisciplinary team meetings. IAEA DIRAC lists no radiotherapy centre in the Maldives. Coordinates are Nominatim's.",
    programs: ["National Cancer Centre (since 2023)", "Day-care chemotherapy", "Oncological surgery", "Palliative and end-of-life care", "Weekly multidisciplinary team meeting"],
    institutions: ["cancer-society-of-maldives"],
    links: [
      { label: "IGMH: National Cancer Centre", url: "https://www.igmh.gov.mv/en/centres/national-cancer-centre" },
      { label: "IGMH: about us", url: "https://www.igmh.gov.mv/en/about-us" },
    ] }),

  // ── Fiji (FJ) ────────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "fiji-ministry-of-health", name: "Ministry of Health and Medical Services, Fiji", aka: ["MoHMS Fiji", "Fiji Ministry of Health"],
    city: "Suva", country: "FJ", lat: -18.142, lng: 178.442, institutionType: "government", website: "http://www.health.gov.fj",
    tldr: "Fiji's health ministry, which provides most of the country's cancer care through oncology units in its divisional hospitals and runs the national cancer registry and screening.",
    summary: "The Ministry's UICC member statement (an Associate Member) says it is the majority provider of oncology services to the whole population of Fiji, with limited private facilities, and coordinates the national cancer registry, screening and early detection, diagnosis and treatment and emerging palliative care; a national cancer control plan was being developed. Its cancer page says cancer cases are managed in the three divisional hospitals' oncology units, with local treatment in the form of surgery and limited chemotherapy, and that HPV immunisation is offered free to girls in class 8. IAEA DIRAC lists no radiotherapy centre in Fiji. The coordinates are an approximate Suva city point.",
    programs: ["Oncology units in three divisional hospitals", "National cancer registry", "Cervical cancer screening", "HPV immunisation for girls in class 8"],
    institutions: ["fiji-cancer-society"],
    cancers: ["cervical", "breast-cancer"],
    links: [
      { label: "Fiji Ministry of Health and Medical Services: cancer", url: "http://www.health.gov.fj/cancer/" },
      uicc("fiji-islands-ministry-health-and-medical-services", "Fiji Islands Ministry of Health and Medical Services"),
    ] }),

  i({ id: "fiji-cancer-society", name: "Fiji Cancer Society", aka: ["FCS"],
    city: "Suva", country: "FJ", lat: -18.142, lng: 178.442, institutionType: "consortium",
    tldr: "A Fijian charity founded in 1993 that works on cancer education, advocacy and support for patients, with a task force on cervical cancer.",
    summary: "UICC's member page (an Associate Member since 1993) says the Fiji Cancer Society was founded in 1993 and is based at Ward 4 of the Rehabilitation Hospital, Tamavua, Suva. It has committees for cancer education and health promotion, patient support services, and finance and development; its prime role is advocacy, awareness and patient support, and its education committee set up a Cervical Cancer Task Force. The coordinates are an approximate Suva city point.",
    programs: ["Cancer education and health promotion", "Patient support services", "Cervical Cancer Task Force"],
    institutions: ["fiji-ministry-of-health"],
    cancers: ["cervical"],
    links: [uicc("fiji-cancer-society", "Fiji Cancer Society"), { label: "Fiji Ministry of Health: address at the Fiji Cancer Society website launch (2014)", url: "http://www.health.gov.fj/address-at-the-fiji-cancer-society-website-rebranding-launch/" }] }),

  // ── Solomon Islands (SB) ─────────────────────────────────────────────────────────────────────────────────────
  i({ id: "national-referral-hospital-honiara", name: "National Referral Hospital, Honiara", aka: ["NRH Solomon Islands", "NRH Oncology Unit"],
    city: "Honiara", country: "SB", lat: -9.435, lng: 159.97, institutionType: "hospital",
    tldr: "Solomon Islands' national hospital in Honiara, whose medical oncology unit has given chemotherapy since 2018.",
    summary: "A 2023 paper in JCO Global Oncology describes the establishment of an oncology unit at the National Referral Hospital: a scoping visit in 2016 at the Medical Superintendent's request, then, at the request of the Ministry of Health, a multidisciplinary mission arranged by Australia's Department of Foreign Affairs and Trade under the Royal Australasian Colleges' Pacific Islands Program that helped commission the NRH Medical Oncology Unit in September 2018. Staff developed local Solomon Islands Oncology Guidelines, and the authors report a sustainable unit delivering chemotherapy and cancer management. A 2021 paper on oncology collaboration in Pacific island communities lists the NRH Oncology Unit among its authors. IAEA DIRAC lists no radiotherapy centre in Solomon Islands. Coordinates are Nominatim's.",
    programs: ["Medical oncology unit (since 2018)", "Solomon Islands Oncology Guidelines", "Chemotherapy"],
    institutions: ["solomon-islands-ministry-of-health"],
    links: [
      epmc("10.1200/go.22.00325", "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)"),
      epmc("10.1111/1754-9485.13160", "Ward et al., a collaborative approach to oncology in Asia-Pacific island communities (J Med Imaging Radiat Oncol 2021)"),
    ] }),

  i({ id: "solomon-islands-ministry-of-health", name: "Ministry of Health and Medical Services, Solomon Islands", aka: ["MHMS Solomon Islands"],
    city: "Honiara", country: "SB", lat: -9.431, lng: 159.955, institutionType: "government",
    tldr: "The health ministry of Solomon Islands, which runs the National Referral Hospital and requested the help that set up the country's cancer treatment unit.",
    summary: "Known to OnCo from papers: authors at the National Referral Hospital give their affiliation as the Ministry of Health and Medical Services, and a 2023 paper in JCO Global Oncology says the Ministry's request led Australia's Department of Foreign Affairs and Trade to arrange the 2018 mission that commissioned the hospital's medical oncology unit. The Ministry's site (mohms.gov.sb) did not answer, so OnCo has no description of its cancer programmes. The coordinates are an approximate Honiara city point.",
    programs: [],
    institutions: ["national-referral-hospital-honiara"],
    links: [
      epmc("10.1200/go.22.00325", "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)"),
      epmc("10.1177/00368504251355383", "Upper endoscopy in Solomon Islands: a four-year retrospective study (Sci Prog 2025)"),
    ] }),

  // ── Samoa (WS) ───────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "tupua-tamasese-meaole-hospital", name: "Tupua Tamasese Meaole Hospital", aka: ["TTM Hospital", "Moto'otua Hospital"],
    city: "Apia", country: "WS", lat: -13.846, lng: -171.765, institutionType: "hospital",
    tldr: "Samoa's main hospital in Apia, whose doctors led a survey of every confirmed cancer in Samoa from 2007 to 2016 as a first step towards a national cancer registry.",
    summary: "A 2021 paper in the Asia-Pacific Journal of Public Health, led from Tupua Tamasese Meaole Hospital, reviewed all laboratory and clinically confirmed cancers in Samoa from 2007 to 2016 in government and non-government facilities as a preliminary step to upscale population-based cancer registration. Incidence rose from 28.5 per 100,000 in 2007 to 67.1 in 2012, then varied between 50 and 65 per 100,000 to 2016; cancers of the female genital organs and breast were commonest in women and of the digestive system in men. IAEA DIRAC lists no radiotherapy centre in Samoa. OnCo could not reach the hospital's site. Coordinates are Nominatim's.",
    programs: ["Cancer incidence survey towards a population-based registry"],
    institutions: ["samoa-cancer-society"],
    cancers: ["breast-cancer", "cervical"],
    links: [epmc("10.1177/1010539520975261", "Amosa-Lei Sam et al., cancer incidence in Samoa 2007 to 2016 (Asia Pac J Public Health 2021)")] }),

  i({ id: "samoa-cancer-society", name: "Samoa Cancer Society", aka: ["Samoa Cancer Society Incorporated"],
    city: "Apia", country: "WS", lat: -13.835, lng: -171.763, institutionType: "consortium",
    tldr: "A Samoan charity that promotes early detection of cancer, gives counselling and information at its National Cancer Resource Centre, and helps people reach palliative care.",
    summary: "UICC's member page (an Associate Member) says the Samoa Cancer Society's mission is to promote early detection and treatment of cancer and to give people with long-term or terminal cancer access to palliative care. Its National Cancer Resource Centre on Moto'otua Street, Apia, offers counselling and rehabilitation activities, a library for health practitioners, village visits to raise awareness of symptoms, and promotion of screening. OnCo could not reach its site. The coordinates are an approximate Apia city point.",
    programs: ["National Cancer Resource Centre", "Village awareness visits", "Palliative care access"],
    institutions: ["tupua-tamasese-meaole-hospital"],
    links: [uicc("samoa-cancer-society-inc", "Samoa Cancer Society Inc.")] }),

  // ── Vanuatu (VU) ─────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "vanuatu-ministry-of-health", name: "Ministry of Health, Vanuatu", aka: ["MOH Vanuatu"],
    city: "Port Vila", country: "VU", lat: -17.741, lng: 168.315, institutionType: "government", website: "https://moh.gov.vu",
    tldr: "Vanuatu's health ministry, which runs Vila Central Hospital and is preparing a national strategy to eliminate cervical cancer with the Vanuatu Family Health Association.",
    summary: "The Ministry's site gives its mission as protecting and promoting the health of all people in Vanuatu and lists hospital services, including Vila Central Hospital, which marked 50 years in 2026. The Vanuatu Family Health Association's UICC member statement says it partners with the Ministry on the national cervical cancer elimination programme, following WHO's 90-70-90 strategy with HPV self-collection, and is helping the Ministry draft five-year elimination strategy guidelines. IAEA DIRAC lists no radiotherapy centre in Vanuatu. The coordinates are an approximate Port Vila city point.",
    programs: ["National cervical cancer elimination programme"],
    institutions: ["vanuatu-family-health-association", "ikkana-cancer-society"],
    cancers: ["cervical"],
    links: [{ label: "Ministry of Health, Vanuatu", url: "https://moh.gov.vu" }, uicc("vanuatu-family-health-association", "Vanuatu Family Health Association")] }),

  i({ id: "vanuatu-family-health-association", name: "Vanuatu Family Health Association", aka: ["VFHA"],
    city: "Port Vila", country: "VU", lat: -17.741, lng: 168.315, institutionType: "consortium", website: "https://eseaor.ippf.org/about-us/member-associations/vanuatu-family-health-association",
    tldr: "A Vanuatu family health organisation that coordinates the national cervical cancer elimination programme with the Ministry of Health, using self-collected tests for the virus that causes cervical cancer.",
    summary: "UICC lists the Vanuatu Family Health Association as a Full Member on Rue Mercet, Port Vila. Its member statement says it leads coordination of the National Cervical Cancer Elimination program with the Ministry of Health under WHO's 90-70-90 strategy, uses HPV self-collection screening and testing, leads community engagement, awareness, mobilisation, advocacy and outreach, and is helping the Ministry draft elimination strategy guidelines for the next five years. It is a member association of the International Planned Parenthood Federation. The coordinates are an approximate Port Vila city point.",
    programs: ["National Cervical Cancer Elimination program", "HPV self-collection screening", "Community outreach"],
    institutions: ["vanuatu-ministry-of-health"],
    cancers: ["cervical"],
    links: [uicc("vanuatu-family-health-association", "Vanuatu Family Health Association"), { label: "IPPF: Vanuatu Family Health Association", url: "https://eseaor.ippf.org/about-us/member-associations/vanuatu-family-health-association" }] }),

  i({ id: "ikkana-cancer-society", name: "Ikkana Cancer Society", aka: ["Ikkana"],
    city: "Port Vila", country: "VU", lat: -17.741, lng: 168.315, institutionType: "consortium",
    tldr: "A Port Vila charity that gives women across Vanuatu information about preventing cancer early and helps them find a path to early treatment.",
    summary: "UICC lists the Ikkana Cancer Society as a Full Member in the Nambatu area of Port Vila. Its member statement says its main aim is educational awareness for early prevention of cancer among women across Vanuatu and providing a pathway to early treatment. OnCo found no website of its own beyond a social media page. The coordinates are an approximate Port Vila city point.",
    programs: ["Cancer awareness for women"],
    institutions: ["vanuatu-ministry-of-health"],
    links: [uicc("ikkana-cancer-society", "Ikkana Cancer Society")] }),

  // ── Guam (GU) ────────────────────────────────────────────────────────────────────────────────────────────────
  i({ id: "guam-regional-medical-city", name: "Guam Regional Medical City", aka: ["GRMC"],
    city: "Dededo", country: "GU", lat: 13.526, lng: 144.823, institutionType: "hospital", website: "https://www.grmc.gu",
    tldr: "A hospital in Dededo, Guam, that treats cancer in children and adults with chemotherapy, other drug treatments and radiotherapy from a linear accelerator, and runs a lung cancer screening programme.",
    summary: "Guam Regional Medical City's site describes a medical oncology service offering chemotherapy, targeted therapy, immunotherapy and hormone therapy with survivorship care, and a radiation oncology department with a TrueBeam linear accelerator delivering treatments including intensity-modulated radiation therapy and stereotactic radiosurgery. It says it diagnoses and treats cancer in both children and adults, and runs a lung cancer screening programme. Its address is 133 Route 3, Dededo. Coordinates are Nominatim's.",
    programs: ["Medical oncology", "Radiation oncology (TrueBeam linear accelerator)", "Lung cancer screening programme"],
    institutions: ["guam-cancer-registry", "guam-memorial-hospital"],
    cancers: ["lung-cancer"],
    links: [
      { label: "GRMC: radiation oncology", url: "https://www.grmc.gu/radiationoncology/" },
      { label: "GRMC: medical oncology", url: "https://www.grmc.gu/medicaloncology/" },
      { label: "GRMC: lung cancer screening programme", url: "https://www.grmc.gu/lung-cancer-screening-program/" },
    ] }),

  i({ id: "guam-memorial-hospital", name: "Guam Memorial Hospital", aka: ["GMH", "Guam Memorial Hospital Authority", "GMHA"],
    city: "Tamuning", country: "GU", lat: 13.504, lng: 144.775, institutionType: "hospital", website: "https://www.gmha.org",
    tldr: "Guam's public hospital in Tamuning, run by a government non-profit corporation, with a haematology and oncology service.",
    summary: "The Guam Memorial Hospital Authority is the government non-profit corporation, governed by a Board of Trustees, that oversees the operation of Guam Memorial Hospital, according to its site, which lists haematology and oncology among the hospital's services. OnCo read no further description of its cancer services. Coordinates are Nominatim's.",
    programs: ["Haematology and oncology"],
    institutions: ["guam-cancer-registry", "guam-regional-medical-city"],
    links: [{ label: "GMHA: about", url: "https://www.gmha.org/about/" }, { label: "GMHA: services", url: "https://www.gmha.org/services/" }] }),

  i({ id: "fhp-health-center-guam", name: "FHP Health Center, Guam", aka: ["FHP Health Center-Guam", "TakeCare Asia FHP Health Center"],
    city: "Tamuning", country: "GU", lat: 13.497, lng: 144.777, institutionType: "hospital",
    tldr: "A health centre in Tamuning, Guam, that since 2019 has let patients on Guam join United States National Cancer Institute trials locally.",
    summary: "The University of Guam reported in 2019 that the National Cancer Institute had approved, in January, the addition of FHP Health Center, Guam, to its Community Oncology Research Program (NCORP) through the University of Hawai'i Cancer Center's Minority/Underserved NCORP, allowing patients in Guam to take part in NCI-sponsored cancer clinical trials, which the Cancer Research Center of Guam would facilitate. The site's principal investigator, Dr Samir Ambrale, said 95 per cent of cancer care is delivered locally in Guam. ClinicalTrials.gov lists \"FHP Health Center-Guam\" in Tamuning as a site for NCI-MATCH, ALCHEMIST, DART (S1609) and other cooperative group trials. OnCo could not reach FHP's own site. The coordinates are an approximate Tamuning city point.",
    programs: ["NCI Community Oncology Research Program site (since 2019)", "Cancer clinical trials"],
    institutions: ["guam-cancer-registry"],
    links: [{ label: "University of Guam: Cancer Research Center to facilitate clinical trials for Guam cancer patients (2019)", url: "https://uog.edu/news-announcements/2018-2019/2019-cancer-research-center-to-facilitate-clinical-trials-for-guam-cancer-patients.php" }] }),

  i({ id: "guam-cancer-registry", name: "Guam Cancer Registry", aka: ["GCR"],
    city: "Mangilao", country: "GU", lat: 13.432, lng: 144.803, institutionType: "research-institute", website: "https://uog.edu/research/guam-cancer-registry",
    tldr: "Guam's cancer registry, set up by law in 1998 and run from the University of Guam, which counts every cancer among Guam residents.",
    summary: "The Guam Cancer Registry was established in 1998 by Public Law 24-198 to collect cancer data from all health-care providers and non-medical sources in its jurisdiction, and in 2004 became a unit of the Cancer Research Center of Guam, a joint venture of the University of Guam, Guam's Department of Public Health and Social Services and the University of Hawai'i Cancer Center, according to the University of Guam's registry page. Its data are used for cancer control, clinical services, patient support, healthcare financing and research; its five-year update reported one person diagnosed with cancer every day and one resident dying of cancer every 2.3 days in Guam. Coordinates are Nominatim's point for the University of Guam.",
    programs: ["Population-based cancer registration (from 1998)", "Cancer Research Center of Guam"],
    institutions: ["fhp-health-center-guam", "guam-regional-medical-city", "guam-memorial-hospital"],
    related: ["cancer-registries-surveillance"],
    links: [{ label: "University of Guam: Guam Cancer Registry", url: "https://uog.edu/research/guam-cancer-registry" }] }),
];

/** Existing record id to the new institution ids it should list (applied in src/data/index.ts). */
export const countriesAsiaPacificBacklinks: Record<string, string[]> = {
  // TODO: kabul-cancer-registry is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "kabul-cancer-registry": ["jamhuriat-hospital-cancer-centre", "afghanistan-cancer-foundation"],
  // TODO: khmer-soviet-friendship-hospital is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "khmer-soviet-friendship-hospital": ["calmette-hospital", "orange-cancer-clinic-phnom-penh"],
  "cancer-society-of-maldives": ["igmh-maldives"],
  // ClinicalTrials.gov site lists in the context file name "FHP Health Center-Guam", Tamuning.
  alchemist: ["fhp-health-center-guam"],
  bwel: ["fhp-health-center-guam"],
  "dart-s1609": ["fhp-health-center-guam"],
  nct04137107: ["fhp-health-center-guam"],
  nct07018869: ["fhp-health-center-guam"],
  "nci-match": ["fhp-health-center-guam"],
  nct04267848: ["fhp-health-center-guam"],
  nct04092283: ["fhp-health-center-guam"],
  nct03793179: ["fhp-health-center-guam"],
};
