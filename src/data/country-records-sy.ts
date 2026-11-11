import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Syria: the public bodies, hospitals and papers behind /countries/sy/ (wave 7) that the corpus did not hold. Each was
 * written from its own primary source, read raw on 11 November 2026: WHO's Cancer Country Profile 2020 for the Syrian
 * Arab Republic (PDF text), WHO and the Ministry of Health's HeRAMS annual report on public hospitals for 2020 (PDF
 * text), the IAEA's news articles of 15 June 2023 and 5 June 2025 (read through the Internet Archive, as iaea.org
 * refused a plain request), the Ministry of Health's home page (read through the Internet Archive's copy of 17 October
 * 2026, as the live site timed out), and the papers through Europe PMC, with full text where the paper is open access
 * (Basha et al. 2024, Nahhat et al. 2023, Al-Abdulla et al. 2025). DOIs were resolved through Europe PMC and the
 * figures in `findings` are taken from the indexed abstracts.
 *
 * Statements about governance are dated, because the authorities changed in December 2024: WHO's appeal of
 * 24 December 2024 speaks of "the recent transfer of authority". Nothing here takes a side in the conflict; areas are
 * named as the sources name them.
 *
 * Inbound links: the Ministry links the three hospitals and its papers; each hospital links its papers through
 * keyPapers and the Ministry back. Coordinates are approximate city or district points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/syr-2020.pdf";
const HERAMS_2020 = "https://applications.emro.who.int/docs/SYR/EMRLIBSYR286E-eng.pdf";
const IAEA_2023_WB = "https://web.archive.org/web/20230923160600/https://www.iaea.org/newscenter/news/from-earthquake-response-to-cancer-care-in-syria-paving-a-way-forward-to-strengthen-national-capacities";
const IAEA_2025_WB = "https://web.archive.org/web/20250606055359/https://www.iaea.org/newscenter/news/director-general-in-syria-to-strengthen-cooperation-in-safeguards-cancer-care-and-food-security";
const MOH_WB = "https://web.archive.org/web/20261017103129/https://www.moh.gov.sy/";

const institutions: InstitutionInput[] = [
  i({ id: "syria-ministry-of-health", name: "Ministry of Health, Syrian Arab Republic", aka: ["Syrian Ministry of Health", "MoH Syria", "وزارة الصحة السورية"],
    city: "Damascus", country: "SY", lat: 33.51, lng: 36.29, institutionType: "government", website: "https://www.moh.gov.sy",
    tldr: "Syria's health ministry. It runs most public hospitals, registers and prices medicines, and asked the IAEA, WHO and IARC to review the country's cancer services in 2022.",
    summary: "The Ministry of Health runs most of Syria's public hospitals: of 113 public hospitals reporting to WHO's Health Resources and Services Availability Monitoring System (HeRAMS) in 2020, 100 belonged to the Ministry of Health and 13 to the Ministry of Higher Education, which runs the university hospitals. By the end of December 2020, 48% of the 113 were fully functioning, 28% partly and 24% not at all, and cancer treatment services were available in 29% of the functional public hospitals. A 2025 scoping review of the health system describes the Ministry as the body that approved new medicines, monitored their quality and set price controls, with weak enforcement outside the public sector. The coordinates are an approximate Damascus city point.\n\nWHO's Cancer Country Profile 2020 records a national cancer control plan as under development in 2019, cancer management guidelines, early detection guidelines for two cancers and staff in the Ministry dedicated to cancer. The Ministry requested an imPACT Review of national cancer control capacity, carried out in late 2022 by the IAEA, IARC and WHO; the IAEA wrote in June 2023 that the Syrian National Cancer Control Committee, headed by Arwa Azmeh, had agreed to finalise a National Strategy for Cancer Control and an action plan.\n\nWHO's appeal of 24 December 2024 refers to the recent transfer of authority. On 4 June 2025 the IAEA's Director General met President Ahmed Al-Sharaa in Damascus and signed a memorandum of understanding on cancer control and food security with the Foreign Minister. The Ministry's website, in its archived copy of October 2026, names Dr Musab Al-Ali as Minister of Health and links a form for reporting medicine side effects hosted on the WHO Uppsala Monitoring Centre's VigiFlow system.",
    programs: ["National Cancer Control Committee", "imPACT Review of cancer control capacity (2022, with IAEA, IARC and WHO)", "Breast and cervical cancer early detection programmes", "HeRAMS monitoring of public hospitals (with WHO, since 2014)", "Medicine side effect reporting (WHO VigiFlow form)"],
    institutions: ["al-bairouni-university-hospital", "tishreen-university-hospital", "idlib-oncology-centre-sams", "who", "iaea", "iarc"],
    cancers: ["breast-cancer", "cervical", "childhood-cancers"], related: ["global-oncology-access", "cancer-registries-surveillance"],
    keyPapers: ["paper-basha-cancer-syria-conflict-review-bmc-cancer-2024", "paper-al-abdulla-syria-health-system-scoping-review-hrps-2025", "paper-sahloul-cancer-care-crisis-war-syria-jgo-2017", "paper-hanafi-lung-cancer-syrian-war-jama-netw-open-2024", "paper-kutluk-syrian-refugees-cancer-turkey-jama-netw-open-2023", "paper-abdul-khalek-cancer-costs-syrian-refugees-lancet-oncol-2020", "paper-spiegel-cancer-syrian-refugees-jordan-lebanon-lancet-oncol-2020"],
    links: [
      { label: "WHO: Cancer Country Profile 2020, Syrian Arab Republic (PDF)", url: WHO_PROFILE },
      { label: "WHO and Ministry of Health: HeRAMS annual report 2020, public hospitals in the Syrian Arab Republic (PDF)", url: HERAMS_2020 },
      { label: "IAEA: From earthquake response to cancer care in Syria (15 June 2023; read through the Internet Archive)", url: IAEA_2023_WB },
      { label: "Ministry of Health home page (archived 17 October 2026)", url: MOH_WB },
    ] }),

  i({ id: "al-bairouni-university-hospital", name: "Al-Bairouni University Hospital", aka: ["Albairouni University Hospital", "Al Bairouni University Hospital", "Al-Biruni Hospital", "Al-Bayrouni Hospital", "ABUH"],
    city: "Harasta, Rural Damascus", country: "SY", lat: 33.56, lng: 36.37, institutionType: "cancer-center", university: "Damascus University",
    tldr: "Syria's principal public cancer hospital, a Damascus University hospital in Harasta on the edge of Damascus that takes patients from all over the country. In 2025 the IAEA announced a brachytherapy suite for women's cancers at a hospital it calls Al-Biruni Hospital in Damascus, which OnCo takes to be this one.",
    summary: "Al-Bairouni University Hospital, in Harasta in Rural Damascus, is described by researchers at Damascus University as the principal cancer centre in Syria, hosting patients from all over the country, most of them of low socioeconomic status; in their review of 2,367 breast cancer charts from January 2019 to May 2022, 58.3% of patients came from outside Damascus and its suburbs. A 2024 systematic review, citing a 2022 book chapter by Manachi and colleagues, reports that its registry recorded about 9,000 new cancers in 2020, that it sees over 60% of Syria's cancer patients and that it is the only treatment centre for thyroid cancer. WHO's 2020 HeRAMS report notes that Rural Damascus has one specialised cancer hospital and that cancer consultations were the highest of any non-communicable disease in public hospitals. The coordinates are an approximate Harasta point.\n\nIn June 2025 the IAEA wrote that, through its Rays of Hope initiative and with funding from the government of Italy, it was working with local teams to build Syria's first fully equipped brachytherapy suite at Al-Biruni Hospital in Damascus, which OnCo takes to be this hospital (the article does not give its full name or district), and training radiation oncologists, medical physicists and radiotherapy technologists while the machine was on its way. Studies from the hospital report late diagnosis: 19% of breast cancers were stage IV at diagnosis and fewer than 5% were found by screening mammography. A 2025 survey of 322 of its patients found that 98.8% had never heard of clinical trials.",
    programs: ["Medical oncology, radiotherapy and haematology", "Hospital-based cancer registry", "Brachytherapy suite under construction with the IAEA (2025)", "Breast cancer care"],
    institutions: ["syria-ministry-of-health", "iaea"], cancers: ["breast-cancer", "thyroid", "cervical"], related: ["brachytherapy"],
    keyPapers: ["paper-nahhat-breast-cancer-quality-syria-bmc-cancer-2023", "paper-kouli-clinical-trial-willingness-syria-jco-go-2026", "paper-apelian-ovarian-cancer-syria-bmc-cancer-2025"],
    links: [
      doi("10.1186/s12885-023-11740-2", "Nahhat et al., breast cancer quality of care in Syria (BMC Cancer 2023)"),
      { label: "IAEA: Director General in Syria to strengthen cooperation in safeguards, cancer care and food security (5 June 2025; read through the Internet Archive)", url: IAEA_2025_WB },
      doi("10.1186/s12885-024-13256-9", "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)"),
    ] }),

  i({ id: "tishreen-university-hospital", name: "Tishreen University Hospital", aka: ["Tishreen University Hospital Latakia", "Tishreen Hospital Lattakia"],
    city: "Latakia", country: "SY", lat: 35.52, lng: 35.79, institutionType: "hospital", university: "Tishreen University",
    tldr: "A university referral hospital in Latakia on the Syrian coast that gives radiotherapy. In 2019 and 2020 nearly a third of its radiotherapy patients travelled from Aleppo.",
    summary: "Tishreen University Hospital in Latakia is one of the three tertiary referral university hospitals, with Al-Bairouni and Ibn Rushd, whose records formed a national multicentre study of ovarian cancer covering 44,248 patients diagnosed with cancer between 2017 and 2021. A 2024 systematic review summarises a study of its radiotherapy patients in 2019 and 2020: 30% came from Aleppo, 24% from Latakia and 20% from Tartous, with breast cancer the commonest treated, and notes that the absence of radiotherapy in Aleppo governorate sent patients to Damascus and Latakia. The same review cites a study in which colorectal cancer made up 8.2% of tumours diagnosed at the hospital between 2014 and 2018. The IAEA's imPACT reviewers met stakeholders from 13 facilities in Damascus and Latakia in 2022. The coordinates are an approximate Latakia city point.",
    programs: ["Radiotherapy", "Oncology and pathology referral services"],
    institutions: ["syria-ministry-of-health"], cancers: ["breast-cancer", "ovarian", "colorectal"],
    keyPapers: ["paper-apelian-ovarian-cancer-syria-bmc-cancer-2025", "paper-basha-cancer-syria-conflict-review-bmc-cancer-2024"],
    links: [
      doi("10.1186/s12885-025-14784-8", "Apelian et al., ovarian cancer in Syria 2017 to 2021 (BMC Cancer 2025)"),
      doi("10.1186/s12885-024-13256-9", "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)"),
    ] }),

  i({ id: "idlib-oncology-centre-sams", name: "Idlib Oncology Centre (Syrian American Medical Society)", aka: ["SAMS oncology centre Idlib", "Idlib Oncology Center"],
    city: "Idlib", country: "SY", lat: 35.93, lng: 36.63, institutionType: "cancer-center",
    tldr: "A cancer centre in Idlib city run by the Syrian American Medical Society, a humanitarian organisation. During the conflict it was the only cancer centre in northwest Syria, which had no radiotherapy, so patients needing it were referred to Türkiye.",
    summary: "The Syrian American Medical Society (SAMS), a humanitarian medical organisation, runs an oncology centre in Idlib city that diagnosed and treated women with breast cancer in 2022, according to a qualitative study of 22 of its patients, who described financial strain and long journeys within northwest Syria or to Türkiye; the authors concluded that stock-outs and the lack of radiotherapy may still force women to travel to Türkiye. Atassi and colleagues, writing from the programme, record that SAMS established the Idlib centre in 2018 and further oncology centres in Al Bab and Jarablus in 2020. A 2024 systematic review, drawing on a SAMS and Relief International advocacy brief covering October 2021 to March 2023, and a 2022 book chapter it cites, reports that the Idlib Oncology Centre was the only cancer centre in northwest Syria, that chemotherapy and hormone therapy were given at three centres in the area, that radiotherapy was not available there, that referral to Türkiye took one to six months, and that referrals for radiotherapy in Türkiye stopped after the earthquake of February 2023. A pathology department serving the area reported 397 new cancers in 2020. The coordinates are an approximate Idlib city point.",
    programs: ["Oncology diagnosis and chemotherapy for northwest Syria", "Breast cancer care", "Pathology diagnosis"],
    institutions: ["syria-ministry-of-health"], cancers: ["breast-cancer", "urothelial"],
    keyPapers: ["paper-atassi-cancer-diagnoses-northwest-syria-ajm-2022", "paper-marzouk-breast-cancer-access-northwest-syria-ssm-2024", "paper-al-abdulla-financial-toxicity-northwest-syria-bmc-hsr-2024"],
    links: [
      doi("10.1016/j.socscimed.2024.117364", "Marzouk et al., accessing breast cancer care in northwest Syria (Soc Sci Med 2024)"),
      doi("10.1055/s-0042-1755331", "Atassi et al., cancer diagnoses in northwest Syria (Avicenna J Med 2022)"),
      doi("10.1186/s12885-024-13256-9", "Basha et al., cancer and Syria in conflict: a systematic review (BMC Cancer 2024)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-basha-cancer-syria-conflict-review-bmc-cancer-2024", name: "Cancer and cancer services in Syria during the conflict: a systematic review",
    journal: "BMC Cancer", year: 2024, doi: "10.1186/s12885-024-13256-9", pmid: "39695449", authors: "Basha L, Ahmed H, Hamze M, et al.", paperType: "review",
    tldr: "A review of 28 English and Arabic studies and reports from March 2011 to February 2024 found cancer services concentrated in Damascus, shortages of staff, chemotherapy and radiotherapy, little screening or palliative care, and no working national cancer registry since 2011.",
    summary: "Published as \"Cancer and Syria in conflict: a systematic review\". The authors searched eight academic and six grey literature databases for studies published from March 2011 to February 2024 and included 28 (23 academic, 5 grey literature). In the full text they record that the Syrian National Cancer Registry was set up in 2002 as a hospital-based registry drawing on hospital records and some pathology laboratories, that support from IARC became erratic from 2007, and that the conflict from 2011 halted it completely, so national estimates since then rest on extrapolation.",
    findings: [
      "28 of 5,801 records identified were eligible.",
      "Papers reporting on burden showed an overall rise in estimated cancer incidence and mortality between 2012 and 2022.",
      "Most services were concentrated in Damascus; staff shortages, chemotherapy shortages, insufficient radiotherapy and a lack of screening and palliative care were the main themes.",
    ],
    whatItMeans: "This is the most complete map of what is known about cancer care in Syria during the conflict, and it shows how little is measured: there has been no national registry since 2011.",
    caveats: ["Few high-quality studies; much of the evidence is grey literature or single-hospital series.", "Searches ended in February 2024, before the transfer of authority WHO referred to on 24 December 2024."],
    institutions: ["al-bairouni-university-hospital", "tishreen-university-hospital", "idlib-oncology-centre-sams", "syria-ministry-of-health"], cancers: ["breast-cancer", "lung-cancer"],
    links: [doi("10.1186/s12885-024-13256-9", "BMC Cancer 2024"), pubmed("39695449")] }),

  p({ id: "paper-sahloul-cancer-care-crisis-war-syria-jgo-2017", name: "Cancer care in Syria during the war: a survey of physicians inside the country",
    journal: "Journal of Global Oncology", year: 2017, doi: "10.1200/JGO.2016.006189", pmid: "28831442", authors: "Sahloul E, Salem R, Alrez W, et al.", paperType: "observational",
    tldr: "Oncologists and general physicians surveyed inside Syria in the fifth year of the conflict reported few specialists and limited or no targeted drugs, radiotherapy, clinical trials, bone marrow transplants, PET or MRI, in both government-held and besieged areas.",
    summary: "Published as \"Cancer Care at Times of Crisis and War: The Syrian Example\". Online surveys distributed through the Syrian American Medical Society to certified oncologists in cancer clinics and to general physicians in rural and mobile clinics asked about specialists, equipment, screening, cost and access, stratified by city and by whether the area was besieged or government controlled. A 2024 systematic review reports that the survey reached 35 oncologists in 2015 and found over 20 specialised oncologists in Damascus and 6 in Aleppo.",
    findings: [
      "Respondents reported a large shortage of specialised physicians and poorer access to screening and treatment in besieged areas than in government-controlled areas.",
      "Physicians in both kinds of area reported limited or no targeted agents, radiation therapy, clinical trials, bone marrow transplantation, PET, MRI and genetic testing.",
    ],
    whatItMeans: "An early first-hand account of how far cancer care fell during the conflict in every kind of area of Syria, not only besieged ones.",
    caveats: ["Online survey with a small, self-selected sample; figures are physicians' reports, not audited counts."],
    institutions: ["syria-ministry-of-health"], cancers: ["breast-cancer"],
    links: [doi("10.1200/JGO.2016.006189", "J Glob Oncol 2017"), pubmed("28831442")] }),

  p({ id: "paper-hanafi-lung-cancer-syrian-war-jama-netw-open-2024", name: "Lung cancer diagnoses and survival at a Syrian oncology centre during the war, 2011 to 2018",
    journal: "JAMA Network Open", year: 2024, doi: "10.1001/jamanetworkopen.2024.2091", pmid: "38477917", authors: "Hanafi I, Abo Samra D, Alsaqqa R, et al.", paperType: "observational", participants: 5160,
    tldr: "Of 5,160 people newly diagnosed with lung cancer at a large Syrian oncology centre in the first eight years of the war, 60 to 80% each year already had metastases, 13.1% of those followed were alive at one year and 0.1% at five years.",
    summary: "Published as \"Lung Cancer Diagnoses and Outcomes During the Syrian War, 2011-2018\". A cohort of all patients newly diagnosed with lung cancer at a large oncology centre in Syria, from every governorate, with histology, stage and yearly follow-up to five years, analysed by how involved each patient's region was in armed conflict.",
    findings: [
      "5,160 patients were included, mean age 59.6 years, 4,399 (85.3%) men.",
      "New diagnoses fell sharply in the first three years of the war and partly recovered afterwards; 60% to 80% of each year's diagnoses presented with metastases.",
      "One-year survival was 13.1% (423 of 3,238 with follow-up) and five-year survival 0.1% (2 of 1,853).",
      "Patients from regions more involved in armed conflict had lower odds of survival (0.51 to 0.61) than those from safer regions for up to two years.",
    ],
    whatItMeans: "Most Syrians with lung cancer were diagnosed too late for curative treatment, and access to care, not only the disease, shaped who survived.",
    caveats: ["One centre; patients who never reached it are not counted.", "Follow-up was incomplete for many patients."],
    institutions: ["syria-ministry-of-health"], cancers: ["lung-cancer"],
    links: [doi("10.1001/jamanetworkopen.2024.2091", "JAMA Netw Open 2024"), pubmed("38477917")] }),

  p({ id: "paper-nahhat-breast-cancer-quality-syria-bmc-cancer-2023", name: "Breast cancer screening, diagnosis and stage at Al-Bairouni University Hospital, 2019 to 2022",
    journal: "BMC Cancer", year: 2023, doi: "10.1186/s12885-023-11740-2", pmid: "38097985", authors: "Nahhat F, Doyya M, Zabad K, et al.", paperType: "observational", participants: 2367,
    tldr: "In 2,367 women treated for breast cancer at Syria's principal cancer hospital between 2019 and 2022, fewer than 5% were found by screening mammography, 8% were diagnosed at stage 0 or I and 19% had metastatic disease.",
    summary: "Published as \"Breast cancer quality of care in Syria: screening, diagnosis, and staging\". A retrospective review of 4,500 paper charts of breast cancer patients treated at Al-Bairouni University Hospital in Harasta from January 2019 to May 2022; 2,367 remained after excluding neoadjuvant treatment and incomplete charts. The authors describe the hospital as the principal cancer centre in Syria, hosting patients from all over the country.",
    findings: [
      "Mean age 51.8 years; 58.3% of patients came from outside Damascus and its suburbs.",
      "Fewer than 5% of cancers were detected by screening mammography.",
      "32.4% were diagnosed by biopsy and 64.8% by surgery (lumpectomy or mastectomy).",
      "8% presented at stage 0 or I, 73% at stage II or III and 19% at stage IV.",
    ],
    whatItMeans: "Breast cancer in Syria is mostly found late and often diagnosed by surgery rather than a needle biopsy, which points to screening and diagnostic services as the first gaps to close.",
    caveats: ["One hospital whose patients are mostly of low socioeconomic status.", "Some cases were diagnosed during the COVID-19 pandemic."],
    institutions: ["al-bairouni-university-hospital"], cancers: ["breast-cancer"],
    links: [doi("10.1186/s12885-023-11740-2", "BMC Cancer 2023"), pubmed("38097985")] }),

  p({ id: "paper-atassi-cancer-diagnoses-northwest-syria-ajm-2022", name: "Cancers diagnosed in 2020 by a pathology laboratory serving northwest Syria",
    journal: "Avicenna Journal of Medicine", year: 2022, doi: "10.1055/s-0042-1755331", pmid: "36570430", authors: "Atassi B, Tse G, Mkhallalati H, et al.", paperType: "observational", participants: 397,
    tldr: "A pathology department serving northwest Syria diagnosed 397 new cancers in 2020; breast cancer was the commonest overall and bladder cancer the commonest in men.",
    summary: "Published as \"Cancer Diagnoses during Active Conflict: Experience from a Cancer Program in Northwest Syria\". A retrospective review of all pathology reports with a cancer diagnosis from one pathology department serving northwest Syria, January to December 2020. The authors describe it as the first report of cancer types and demographics in areas outside government control since the conflict began.",
    findings: [
      "397 new cancers were diagnosed in 2020: 191 (48.1%) in men and 20 (5%) in children aged 17 or under.",
      "In men the commonest were bladder (15.7%) and skin cancers (14.7%); in women breast cancer (38.3%), skin (9.7%) and uterine cancer (8.7%).",
      "Overall: breast 20.2%, skin 12.1%, cancers in lymph nodes 8.8%, bladder 8.3% and colorectal 7.3%.",
    ],
    whatItMeans: "A first count of which cancers were being diagnosed in northwest Syria during the conflict, where no registry operated.",
    caveats: ["One laboratory; it counts specimens, not a defined population.", "The authors describe the hospital as under-resourced and understaffed."],
    institutions: ["idlib-oncology-centre-sams"], cancers: ["breast-cancer", "urothelial"],
    links: [doi("10.1055/s-0042-1755331", "Avicenna J Med 2022"), pubmed("36570430")] }),

  p({ id: "paper-apelian-ovarian-cancer-syria-bmc-cancer-2025", name: "Ovarian cancer at three Syrian university hospitals, 2017 to 2021",
    journal: "BMC Cancer", year: 2025, doi: "10.1186/s12885-025-14784-8", pmid: "40847388", authors: "Apelian S, Hamdan A, Mohammad R, et al.", paperType: "observational", participants: 531,
    tldr: "Three Syrian referral hospitals diagnosed 44,248 cancers between 2017 and 2021, of which 531 (1.2%) were ovarian cancers, a smaller share than global and regional data, which the authors read as possible under-reporting.",
    summary: "Published as \"Epidemiological and clinicopathological characteristics of ovarian cancer in Syria during the war years: a national multicenter retrospective study (2017-2021)\". Data came from Tishreen University Hospital, Al-Bairouni University Hospital and Ibn Rushd Hospital for adults newly diagnosed with primary ovarian cancer.",
    findings: [
      "531 ovarian cancers, mean age 53.1, were 1.2% (95% CI 1.1% to 1.3%) of 44,248 patients diagnosed with any cancer at the three hospitals.",
      "Serous carcinoma was the commonest subtype (55.4%), then mucinous (13.8%) and endometrioid (9.7%).",
      "Abdominal bloating was the commonest presenting symptom (194 patients, 36.5%).",
    ],
    whatItMeans: "Beyond ovarian cancer, the paper gives one of the few multi-hospital counts of all cancers diagnosed in Syria during the war years.",
    caveats: ["Three hospitals, not a population; the authors note barriers to women's access to care in a conflict setting."],
    institutions: ["tishreen-university-hospital", "al-bairouni-university-hospital"], cancers: ["ovarian"],
    links: [doi("10.1186/s12885-025-14784-8", "BMC Cancer 2025"), pubmed("40847388")] }),

  p({ id: "paper-al-abdulla-syria-health-system-scoping-review-hrps-2025", name: "Syria's health system from 2000 to 2024: a scoping review",
    journal: "Health Research Policy and Systems", year: 2025, doi: "10.1186/s12961-025-01352-6", pmid: "40598524", authors: "Al-Abdulla O, Alaref M, Kallström A, Kauhanen J.", paperType: "review",
    tldr: "A review written, in the authors' words, to inform the health sector recovery plan following recent political changes in Syria, that describes a centralised system with fragmented financing, heavy out-of-pocket payment, health insurance for under 5% of people and cancer medicines that patients largely paid for themselves.",
    summary: "Published as \"The health system in Syria (2000-2024): assembling the pieces of a fragmented system: A scoping review\". Following PRISMA-ScR guidelines and WHO's health system building blocks, the authors synthesised literature, grey literature and government reports. The full text states that before the conflict Syria's pharmaceutical industry covered 90% of domestic medicine needs from more than 70 factories, that the Ministry of Health approved new medicines, monitored quality and set price controls, that higher-cost treatments such as cancer drugs required direct payment, that out-of-pocket spending was about 61% of health spending by 2008, and that small fragmented insurance schemes covered less than 5% of the population by the end of 2020.",
    findings: [
      "Service delivery, financing and governance were the building blocks most discussed in the literature.",
      "The system retained elements of the Semashko model alongside liberalisation from the 2003 modernisation programme.",
      "Challenges included workforce shortages, fragmented financing and growing dependence on the private sector.",
    ],
    whatItMeans: "Explains why a Syrian with cancer has often paid for medicines out of pocket even where hospital care is free.",
    caveats: ["Draws on a thin and mostly pre-2024 literature."],
    institutions: ["syria-ministry-of-health"],
    links: [doi("10.1186/s12961-025-01352-6", "Health Res Policy Syst 2025"), pubmed("40598524")] }),

  p({ id: "paper-al-abdulla-financial-toxicity-northwest-syria-bmc-hsr-2024", name: "Humanitarian aid and the financial toll of cancer in northwest Syria",
    journal: "BMC Health Services Research", year: 2024, doi: "10.1186/s12913-024-11077-x", pmid: "38762456", authors: "Al-Abdulla O, Sonsuz AA, Alaref M, et al.", paperType: "observational", participants: 99,
    tldr: "Among 99 cancer patients in northwest Syria, humanitarian aid, consistently received by 28 of them, had no significant relationship with reduced financial distress.",
    summary: "Published as \"The impact of humanitarian aid on financial toxicity among cancer patients in Northwest Syria\". A quasi-experimental pre-test and post-test study measuring financial toxicity with the Arabic FACIT-COST tool before and after patients received humanitarian aid.",
    findings: [
      "99 cancer patients were recruited; 28 confirmed consistent receipt of humanitarian aid throughout follow-up.",
      "Humanitarian aid had no significant relationship with reduced financial toxicity.",
    ],
    whatItMeans: "Aid as delivered did not lift the cost burden of cancer for patients in northwest Syria; the authors call for models built for chronic disease.",
    caveats: ["Small, purposive sample.", "Only 28 patients received aid consistently."],
    institutions: ["idlib-oncology-centre-sams"],
    links: [doi("10.1186/s12913-024-11077-x", "BMC Health Serv Res 2024"), pubmed("38762456")] }),

  p({ id: "paper-marzouk-breast-cancer-access-northwest-syria-ssm-2024", name: "Women's experience of breast cancer care in northwest Syria",
    journal: "Social Science & Medicine", year: 2024, doi: "10.1016/j.socscimed.2024.117364", pmid: "39357306", authors: "Marzouk M, Hamze M, Debel J, et al.", paperType: "observational", participants: 22,
    tldr: "Interviews with 22 women treated at the Syrian American Medical Society's oncology centre in Idlib in 2022 found financial strain in every family and long journeys; the authors concluded that stock-outs and the lack of radiotherapy may still send women to Türkiye.",
    summary: "Published as \"Accessing breast cancer care in a protracted conflict: Qualitative exploration of the perspectives of women with breast cancer in northwest Syria\". Semi-structured interviews in Arabic, by trained local female researchers in August and September 2022, with women diagnosed or treated at the SAMS oncology centre in Idlib city during 2022.",
    findings: [
      "All 22 participants described financial strain from the diagnosis on themselves and their families.",
      "Most described long journeys in northwest Syria or to Türkiye, where referral brought cost, bureaucracy or isolation from family.",
      "Faith, children, compassionate staff and peer support helped women cope.",
    ],
    whatItMeans: "Shows what the numbers miss: the cost, travel and family burden of breast cancer treatment in an area without radiotherapy.",
    caveats: ["Qualitative, one centre, 22 women."],
    institutions: ["idlib-oncology-centre-sams"], cancers: ["breast-cancer"],
    links: [doi("10.1016/j.socscimed.2024.117364", "Soc Sci Med 2024"), pubmed("39357306")] }),

  p({ id: "paper-kouli-clinical-trial-willingness-syria-jco-go-2026", name: "Willingness to join clinical trials among cancer patients in Syria after the conflict",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/GO-26-00095", pmid: "42269136", authors: "Kouli A, Al-Bitar A, AlMardini L, et al.", paperType: "observational", participants: 322,
    tldr: "Of 322 cancer patients surveyed at Al-Bairouni University Hospital in 2025, 98.8% had never heard of clinical trials; 37% would take part, rising to 61.5% if transport and safety were guaranteed.",
    summary: "Published as \"Assessing Willingness and Barriers to Clinical Trial Participation Among Patients With Cancer in Post-Conflict Syria: A Mixed-Methods Study\". A mixed-methods cross-sectional study at Al-Bairouni University Hospital from March to August 2025: telephone interviews with 322 patients (78.3% response) and 40 in-depth interviews.",
    findings: [
      "98.8% had never heard of clinical trials.",
      "Willingness to participate was 37.0%, rising to 61.5% if transport and safety were guaranteed.",
      "Having an information source raised willingness (adjusted odds ratio 5.42); religious or social traditions guiding refusal (0.32) and receiving palliative care only (0.28) lowered it.",
    ],
    whatItMeans: "Rebuilding cancer research in Syria will need transport support, trusted physicians and plain information, as well as sponsors.",
    caveats: ["One hospital, surveyed by telephone."],
    institutions: ["al-bairouni-university-hospital"],
    links: [doi("10.1200/GO-26-00095", "JCO Glob Oncol 2026"), pubmed("42269136")] }),

  p({ id: "paper-kutluk-syrian-refugees-cancer-turkey-jama-netw-open-2023", name: "Cancer among Syrian refugees treated in southern Türkiye, 2011 to 2020",
    journal: "JAMA Network Open", year: 2023, doi: "10.1001/jamanetworkopen.2023.12903", pmid: "37219908", authors: "Kutluk T, Sahin B, Kirazli M, et al.", paperType: "observational", participants: 1535,
    tldr: "Among 1,114 adults and 421 children from Syria treated for cancer at eight university hospitals in southern Türkiye, five-year survival was 17.5% for adults and 29.7% for children, despite universal health coverage.",
    summary: "Published as \"Clinical Characteristics and Outcomes of Cancer Cases Among Syrian Refugees From Southern Turkey\". A retrospective hospital-based study of all Syrian refugees diagnosed or treated for cancer between 2011 and 2020 in the haematology and oncology departments of eight university hospitals in Türkiye's southern border provinces, which host more than half of the 3.6 million Syrian refugees in Türkiye. The first author is at Hacettepe University's cancer institute.",
    findings: [
      "1,114 adults (median age 48.2) and 421 children (median age 5.7) were included.",
      "Median time from first symptom to diagnosis was 66 days for adults and 28 days for children.",
      "Commonest in adults: breast cancer (13.8%), leukaemia and myeloma (13.2%), lymphoma (12.7%); in children leukaemias (42.8%), lymphomas (15.7%) and brain tumours (9.5%).",
      "Five-year survival was 17.5% in adults and 29.7% in children.",
    ],
    whatItMeans: "Access to a host country's health system was not enough to give Syrian refugees with cancer good outcomes; the authors call for refugee cancer care to be planned within national cancer programmes.",
    caveats: ["Hospital-based; refugees who were never treated are not counted.", "Follow-up was limited for children."],
    institutions: ["hacettepe-cancer-institute"], cancers: ["breast-cancer", "childhood-cancers"],
    links: [doi("10.1001/jamanetworkopen.2023.12903", "JAMA Netw Open 2023"), pubmed("37219908")] }),

  p({ id: "paper-abdul-khalek-cancer-costs-syrian-refugees-lancet-oncol-2020", name: "The cost of cancer care for Syrian refugees in Jordan, Lebanon and Türkiye",
    journal: "The Lancet Oncology", year: 2020, doi: "10.1016/S1470-2045(20)30067-X", pmid: "32359488", authors: "Abdul-Khalek RA, Guo P, Sharp F, et al.", paperType: "methods",
    tldr: "Cancer care for the 4.74 million Syrian refugees in Jordan, Lebanon and Türkiye was modelled to cost between about 34 and 140 million euros in 2017, depending on the method.",
    summary: "Published as \"The economic burden of cancer care for Syrian refugees: a population-based modelling study\". Direct costs per person and per incident case were estimated with generalised linear models built on cancer costs from 27 EU countries, and applied to the Syrian refugee populations of the three host countries. Costs are in 2017 euros.",
    findings: [
      "Total cancer care costs for 4.74 million Syrian refugees in 2017 were €140.23 million by the cost per capita approach, €79.02 million by age-standardised incidence and €33.68 million by crude incidence.",
      "Under the lowest estimate the burden was highest for Türkiye (€25.18 million), then Lebanon (€6.40 million) and Jordan (€2.09 million).",
    ],
    whatItMeans: "Puts a price on refugee cancer care for host countries and agencies such as UNHCR, and argues for new financing tied to clear care pathways.",
    caveats: ["A model built on European cost data, not measured spending."],
    cancers: [],
    links: [doi("10.1016/S1470-2045(20)30067-X", "Lancet Oncol 2020"), pubmed("32359488")] }),

  p({ id: "paper-spiegel-cancer-syrian-refugees-jordan-lebanon-lancet-oncol-2020", name: "Cancer in Syrian refugees referred to UNHCR in Jordan and Lebanon, 2015 to 2017",
    journal: "The Lancet Oncology", year: 2020, doi: "10.1016/S1470-2045(20)30160-1", pmid: "32359503", authors: "Spiegel PB, Cheaib JG, Aziz SA, et al.", paperType: "review", participants: 733,
    tldr: "A policy review of 733 refugees with cancer referred to the UN refugee agency in Lebanon and Jordan, which pays for expensive care case by case, calls for more funding and common rules so that patients have equitable access.",
    summary: "Published as \"Cancer in Syrian refugees in Jordan and Lebanon between 2015 and 2017\". The authors, who in 2014 reported cancer among Iraqi refugees in Jordan (2010 to 2012) and in Syria (2009 to 2011) from UNHCR's exceptional care committees, analysed 733 refugees referred to UNHCR in Lebanon (2015 to 2017) and Jordan (2016 to 2017) by cancer type, risk factors, coverage decision and cost.",
    findings: [
      "Data on 733 refugees referred to UNHCR with cancer were analysed.",
      "The authors recommend increased funding, evidence-based standard operating procedures across countries, and a response covering education, screening, treatment and palliative care that prioritises breast and childhood cancers.",
    ],
    whatItMeans: "Shows that for a refugee from Syria, whether cancer treatment is paid for can depend on a committee's case-by-case decision.",
    caveats: ["Covers only refugees referred to UNHCR for funding."],
    cancers: ["breast-cancer", "childhood-cancers"],
    links: [doi("10.1016/S1470-2045(20)30160-1", "Lancet Oncol 2020"), pubmed("32359503")] }),
];

/** Syria: the records behind /countries/sy/ (wave 7) that the corpus did not hold. */
export const recordsSY: EntityInput[] = [...institutions, ...papers];
