import type { PersonInput } from "@/lib/schema";

/**
 * People: India. Clinicians, scientists and founders with public roles in Indian oncology, beyond the
 * Tata Memorial group already in asia-pacific.ts (Sudeep Gupta, Rajendra Badwe, Vijay Patil, Kumar Prabhash,
 * Vanita Noronha, Pankaj Chaturvedi, Surendra Shastri) and Partha Basu (IARC).
 *
 * Public professional information only. Roles are as stated in publications and institutional pages and
 * change over time; treat `role` as indicative. Each record carries at least one public source (an
 * institutional page or a paper DOI) and a PubMed author search.
 */
const asOf = "2026-09-10";
const pm = (q: string) => ({ label: "PubMed author search", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleIndia: PersonInput[] = [
  p({ id: "pramesh-c-s", name: "C. S. Pramesh", role: "Director, Tata Memorial Hospital; thoracic surgical oncologist; convener, National Cancer Grid", institutionId: "tata-memorial", institutions: ["tata-memorial", "national-cancer-grid"],
    specialisms: ["Thoracic surgical oncology", "Oesophageal and lung cancer surgery", "Health systems and cancer policy", "Pooled procurement", "Clinical research methods"],
    tldr: "The surgeon who built the National Cancer Grid into a network of hundreds of Indian cancer centres and used its buying power to cut cancer drug prices by a median of 82%.",
    summary: "C. S. Pramesh is a thoracic surgeon and Director of Tata Memorial Hospital in Mumbai. He has been the convener of the National Cancer Grid since its formation and is first author of the papers describing it, of India's Choosing Wisely list for cancer care, and of the Bulletin of the World Health Organization report on the Grid's pooled procurement pilot, which pooled demand for 40 anticancer drugs from 23 centres and cut costs by about 13.2 billion rupees. He co-founded the CReDO research methods workshops that have trained more than 250 oncologists, and writes on the ethics and pragmatism of trials in low- and middle-income countries.",
    profiles: [{ label: "Tata Memorial Centre", url: "https://tmc.gov.in" }, { label: "National Cancer Grid", url: "https://www.ncgindia.org" }, pm("Pramesh CS[Author] National Cancer Grid")],
    papers: [{ title: "A National Cancer Grid pooled procurement initiative, India", journal: "Bulletin of the World Health Organization", year: 2023, doi: "10.2471/BLT.23.289714" }, { title: "The National Cancer Grid of India", journal: "Indian Journal of Medical and Paediatric Oncology", year: 2014, doi: "10.4103/0971-5851.142040" }, { title: "Choosing Wisely for cancer care in India", journal: "Indian Journal of Surgical Oncology", year: 2020, doi: "10.1007/s13193-020-01051-4" }],
    keyPapers: ["paper-pramesh-ncg-pooled-procurement-2023"], cancers: ["esophageal", "nsclc"], technologies: ["global-oncology-access"], bottlenecks: ["b-drug-pricing", "b-global-access"] }),

  p({ id: "dcruz-anil", name: "Anil K. D'Cruz", role: "Head and neck surgical oncologist; former Director, Tata Memorial Hospital; Director of Oncology, Apollo Hospitals", institutionId: "apollo-hospitals", institutions: ["apollo-hospitals", "tata-memorial"],
    specialisms: ["Head and neck surgery", "Oral cancer", "Neck dissection", "Global cancer control"],
    tldr: "Led the Tata Memorial trial that settled a decades-old question, showing that removing neck lymph nodes at the first operation for early oral cancer saves lives.",
    summary: "Anil D'Cruz is a head and neck surgeon who directed Tata Memorial Hospital before moving to Apollo Hospitals, and has served as President of the Union for International Cancer Control. He was principal investigator of the randomised trial of elective versus therapeutic neck dissection in node-negative oral cancer (596 enrolled, 500 analysed), which found 3-year overall survival of 80.0% with elective dissection against 67.5% with watchful waiting (hazard ratio 0.64) and changed guidelines worldwide. His work spans oral cancer surgery, thyroid cancer and cancer control policy for low- and middle-income countries.",
    profiles: [{ label: "Apollo Hospitals", url: "https://www.apollohospitals.com" }, { label: "Union for International Cancer Control", url: "https://www.uicc.org" }, pm("D'Cruz AK[Author] Tata Memorial head and neck")],
    papers: [{ title: "Elective versus therapeutic neck dissection in node-negative oral cancer", journal: "New England Journal of Medicine", year: 2015, doi: "10.1056/NEJMoa1506007" }],
    keyPapers: ["paper-dcruz-elective-neck-dissection-nejm-2015"], trials: ["elective-neck-dissection-tmh"], cancers: ["head-and-neck"], technologies: ["sentinel-node"] }),

  p({ id: "raina-vinod", name: "Vinod Raina", role: "Executive Director, Medical Oncology and Haematology, Fortis Memorial Research Institute, Gurugram; former Head of Medical Oncology, AIIMS New Delhi", institutions: ["aiims-delhi"],
    specialisms: ["Medical oncology", "Breast cancer", "Lymphoma and haematological malignancies", "Oncology training"],
    tldr: "A medical oncologist who led the cancer hospital at AIIMS Delhi for many years, trained a large share of India's medical oncologists and helped write the country's early cancer treatment standards.",
    summary: "Vinod Raina headed the Department of Medical Oncology at the Dr B.R. Ambedkar Institute Rotary Cancer Hospital, AIIMS New Delhi, before joining Fortis Memorial Research Institute in Gurugram as head of medical oncology and haematology. His publications cover breast cancer, lymphoma, supportive care and the epidemiology and treatment patterns of cancer in north India, and he has been a leading voice in Indian oncology societies and guideline efforts.",
    profiles: [{ label: "Fortis Healthcare", url: "https://www.fortishealthcare.com" }, { label: "AIIMS New Delhi", url: "https://www.aiims.edu" }, pm("Raina V[Author] AIIMS medical oncology")],
    papers: [],
    cancers: ["breast-hr-positive", "dlbcl", "hodgkin-lymphoma"] }),

  p({ id: "shanta-v", name: "V. Shanta", role: "Chairman and former Director, Cancer Institute (WIA), Adyar (1927-2021)", institutionId: "cancer-institute-adyar", institutions: ["cancer-institute-adyar"], status: "historic",
    specialisms: ["Medical oncology", "Paediatric oncology", "Cancer registries", "Charitable cancer care"],
    tldr: "The doctor who spent 66 years building Chennai's Cancer Institute into a hospital where most patients are treated free, and who set up India's first population cancer registry and paediatric oncology unit.",
    summary: "Viswanathan Shanta (11 March 1927 to 19 January 2021) joined the Cancer Institute (WIA) in Adyar, Chennai, in 1955 and lived on its campus until her death, serving as Director from 1980 to 1997 and then Chairman. Under her leadership the Institute grew from a small charitable hospital into a comprehensive cancer centre offering free or subsidised care to about 60% of its roughly 100,000 annual patients, opened India's first paediatric oncology unit, established the Madras Metropolitan Tumour Registry, and led Indian trials in cervical and oral cancer screening. She received the Ramon Magsaysay Award (2005) and the Padma Shri (1986), Padma Bhushan (2006) and Padma Vibhushan (2016).",
    profiles: [{ label: "Cancer Institute (WIA)", url: "https://www.cancerinstitutewia.in" }, pm("Shanta V[Author] Cancer Institute Adyar")],
    papers: [],
    cancers: ["cervical", "all-leukemia", "head-and-neck"], technologies: ["cancer-registries-surveillance", "global-oncology-access"] }),

  p({ id: "sankaranarayanan-rengaswamy", name: "Rengaswamy Sankaranarayanan", role: "Former Head, Early Detection and Prevention Section and Screening Group, IARC; screening trialist", institutionId: "iarc", institutions: ["iarc", "cancer-institute-adyar"],
    specialisms: ["Cancer screening trials", "Cervical cancer prevention", "Oral cancer screening", "HPV vaccination", "Global oncology"],
    tldr: "Ran the large Indian trials that showed a single round of HPV testing halves cervical cancer deaths and that visual oral examination cuts deaths in tobacco users, and led the study behind single-dose HPV vaccination.",
    summary: "Rengaswamy Sankaranarayanan trained at the Cancer Institute (WIA) in Chennai and spent most of his career at the International Agency for Research on Cancer in Lyon, where he headed screening research. He led the Osmanabad cluster-randomised trial (131,746 women), in which one round of HPV testing cut cervical cancer deaths by about half (34 versus 64 deaths; hazard ratio 0.52), the Kerala oral cancer screening trial (191,873 people), which reduced oral cancer deaths by a third among tobacco or alcohol users, and the IARC India HPV vaccine study whose one-dose results underpin the WHO's single-dose recommendation.",
    profiles: [{ label: "IARC", url: "https://www.iarc.who.int" }, pm("Sankaranarayanan R[Author] screening India")],
    papers: [{ title: "HPV screening for cervical cancer in rural India", journal: "New England Journal of Medicine", year: 2009, doi: "10.1056/NEJMoa0808516" }, { title: "Effect of screening on oral cancer mortality in Kerala, India: a cluster-randomised controlled trial", journal: "The Lancet", year: 2005, doi: "10.1016/S0140-6736(05)66658-5" }, { title: "Immunogenicity and HPV infection after one, two, and three doses of quadrivalent HPV vaccine in girls in India", journal: "Lancet Oncology", year: 2016, doi: "10.1016/S1470-2045(15)00414-3" }],
    keyPapers: ["paper-sankaranarayanan-hpv-screening-nejm-2009", "paper-sankaranarayanan-oral-screening-lancet-2005", "paper-basu-single-dose-hpv-lancet-oncol-2021"], trials: ["osmanabad-hpv-screening", "kerala-oral-screening", "iarc-india-hpv-dose-study"], cancers: ["cervical", "head-and-neck"], technologies: ["hpv-testing", "hpv-vaccine"] }),

  p({ id: "mazumdar-shaw-kiran", name: "Kiran Mazumdar-Shaw", role: "Executive Chairperson and founder, Biocon and Biocon Biologics", institutions: ["narayana-health"],
    specialisms: ["Biosimilars", "Biotechnology entrepreneurship", "Affordable cancer care", "Philanthropy"],
    tldr: "Founded Biocon in a garage in 1978 and turned it into the company behind the world's first approved trastuzumab biosimilar, and co-founded a 1,400-bed cancer campus in Bengaluru.",
    summary: "Kiran Mazumdar-Shaw started Biocon in Bengaluru in 1978 with 10,000 rupees of seed capital and built it into India's largest biopharmaceutical company; she is executive chairperson of Biocon and Biocon Biologics, whose portfolio includes trastuzumab (CANMAb in India, 2014; Ogivri in the US, 2017) and bevacizumab biosimilars and which acquired Viatris's biosimilars business in 2022. In 2009 she established the Mazumdar-Shaw Medical Centre with Devi Shetty at Narayana Health City, a 1,400-bed cancer and multispecialty campus. She holds the Padma Shri (1989), Padma Bhushan (2005) and the Othmer Gold Medal (2014).",
    profiles: [{ label: "Biocon", url: "https://www.biocon.com" }, { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Kiran_Mazumdar-Shaw" }],
    papers: [],
    companies: ["biocon", "biocon-biologics"], drugs: ["trastuzumab-biosimilars"], technologies: ["monoclonal-antibody"], bottlenecks: ["b-drug-pricing", "b-global-access"] }),

  p({ id: "purwar-rahul", name: "Rahul Purwar", role: "Professor, Department of Biosciences and Bioengineering, IIT Bombay; founder, ImmunoACT", institutionId: "iit-bombay", institutions: ["iit-bombay"],
    specialisms: ["CAR-T cell engineering", "Immunology", "Cell therapy manufacturing", "Translational research"],
    tldr: "The IIT Bombay immunologist whose laboratory designed India's first approved CAR-T therapy and who founded the company that makes it for a fraction of Western prices.",
    summary: "Rahul Purwar leads an immunology and cell engineering laboratory at IIT Bombay, where work on a humanised CD19 CAR construct began in 2013. He founded ImmunoACT in 2018 as an IIT Bombay spin-off to take the therapy through trials with Tata Memorial Centre, first dosing patients in 2021 and securing DCGI approval for NexCAR19 (talicabtagene autoleucel) in 2023. ImmunoACT reports more than 600 patients treated at over 130 authorised centres, a manufacturing success rate of 98% and a facility capacity of 750 patients a year, expanding to 1,500.",
    profiles: [{ label: "ImmunoACT", url: "https://immunoact.com" }, { label: "IIT Bombay", url: "https://www.iitb.ac.in" }, pm("Purwar R[Author] CAR T India")],
    papers: [{ title: "Talicabtagene autoleucel for relapsed or refractory B-cell malignancies: results from an open-label, multicentre, phase 1/2 study", journal: "Lancet Haematology", year: 2025, doi: "10.1016/S2352-3026(24)00377-6" }],
    keyPapers: ["paper-jain-talicabtagene-lancet-haem-2025"], companies: ["immunoact"], drugs: ["talicabtagene-autoleucel"], targets: ["cd19"], technologies: ["car-t", "point-of-care-cell-manufacturing"], bottlenecks: ["b-manufacturing-cell-therapy", "b-global-access"] }),

  p({ id: "jain-hasmukh", name: "Hasmukh Jain", role: "Professor of Medical Oncology (adult haematolymphoid), Tata Memorial Hospital", institutionId: "tata-memorial", institutions: ["tata-memorial"],
    specialisms: ["Lymphoma", "Acute leukaemia", "CAR-T cell therapy", "Clinical trials"],
    tldr: "First author of the phase 1/2 trial of India's first CAR-T therapy, which treated adults with relapsed lymphoma and leukaemia at six Indian centres.",
    summary: "Hasmukh Jain is a haematolymphoid medical oncologist at Tata Memorial Hospital and first author of the Lancet Haematology report of talicabtagene autoleucel (NexCAR19) in relapsed or refractory B-cell malignancies: 64 patients were enrolled across phase 1 and 2 at six tertiary centres, with an overall response rate of 73% in 51 evaluable patients and two treatment-related deaths. He runs lymphoma and CAR-T programmes at Tata Memorial and is an investigator on Indian and international lymphoma trials.",
    profiles: [{ label: "Tata Memorial Centre", url: "https://tmc.gov.in" }, pm("Jain H[Author] Tata Memorial lymphoma CAR")],
    papers: [{ title: "Talicabtagene autoleucel for relapsed or refractory B-cell malignancies: results from an open-label, multicentre, phase 1/2 study", journal: "Lancet Haematology", year: 2025, doi: "10.1016/S2352-3026(24)00377-6" }],
    keyPapers: ["paper-jain-talicabtagene-lancet-haem-2025"], trials: ["talicel-phase-1-2"], drugs: ["talicabtagene-autoleucel"], cancers: ["dlbcl", "all-leukemia"], targets: ["cd19"], technologies: ["car-t"] }),

  p({ id: "narula-gaurav", name: "Gaurav Narula", role: "Professor of Paediatric Oncology, Tata Memorial Hospital", institutionId: "tata-memorial", institutions: ["tata-memorial"],
    specialisms: ["Paediatric oncology", "Childhood leukaemia", "CAR-T cell therapy", "Cooperative group trials"],
    tldr: "A paediatric oncologist at Tata Memorial who led the leukaemia arm of India's first CAR-T trials and runs national childhood leukaemia protocols.",
    summary: "Gaurav Narula is a paediatric oncologist at Tata Memorial Hospital whose work spans childhood acute lymphoblastic leukaemia protocols adapted to Indian conditions, the Indian Childhood Collaborative Leukaemia group trials and the clinical development of talicabtagene autoleucel (NexCAR19), for which he was an investigator and an author of the published real-world series. He also works on infection control and supportive care in low-resource paediatric oncology.",
    profiles: [{ label: "Tata Memorial Centre", url: "https://tmc.gov.in" }, pm("Narula G[Author] Tata Memorial paediatric leukaemia")],
    papers: [],
    trials: ["talicel-phase-1-2"], drugs: ["talicabtagene-autoleucel"], cancers: ["all-leukemia"], technologies: ["car-t"] }),

  p({ id: "kapoor-akhil", name: "Akhil Kapoor", role: "Medical oncologist, Homi Bhabha Cancer Hospital and MPMMCC, Varanasi (Tata Memorial Centre)", institutionId: "homi-bhabha-cancer-hospital-varanasi", institutions: ["homi-bhabha-cancer-hospital-varanasi", "tata-memorial"],
    specialisms: ["Head and neck cancer", "Metronomic chemotherapy", "Pragmatic trials", "Global oncology"],
    tldr: "First author of METRO PLUS, the Varanasi trial that doubled survival in advanced head and neck cancer by adding cheap oral metronomic drugs to standard chemotherapy.",
    summary: "Akhil Kapoor is a medical oncologist at Tata Memorial Centre's Varanasi hospitals and first author of METRO PLUS (JCO Global Oncology 2026), a randomised trial of 238 patients with advanced unresectable head and neck cancer in which paclitaxel-carboplatin plus oral metronomic chemotherapy gave a median overall survival of 10 months against 5 months with chemotherapy alone (hazard ratio 0.54). His work continues the Tata Memorial tradition of trials designed for the drugs and budgets available to most of the world's patients.",
    profiles: [{ label: "Tata Memorial Centre", url: "https://tmc.gov.in" }, pm("Kapoor A[Author] Varanasi head and neck metronomic")],
    papers: [{ title: "Integrating metronomic therapy with standard chemotherapy in advanced unresectable head and neck cancer: a randomized trial addressing global cancer care equity (METRO PLUS)", journal: "JCO Global Oncology", year: 2026, doi: "10.1200/GO-25-00721" }],
    trials: ["metro-plus-varanasi"], cancers: ["head-and-neck"], drugs: ["paclitaxel", "carboplatin", "methotrexate"], technologies: ["cytotoxic-chemotherapy"] }),

  p({ id: "mathur-prashant", name: "Prashant Mathur", role: "Director, ICMR-National Institute of Noncommunicable Disease Epidemiology (formerly NCDIR), Bengaluru", institutionId: "icmr-ncrp", institutions: ["icmr-ncrp", "icmr"],
    specialisms: ["Cancer registries", "Cancer epidemiology", "Noncommunicable disease surveillance", "Health informatics"],
    tldr: "Directs the institute that runs India's cancer registries and is first author of the national report estimating 1.39 million new cancers in 2020.",
    summary: "Prashant Mathur leads the ICMR institute in Bengaluru that coordinates the National Cancer Registry Programme and other noncommunicable disease registries. He is first author of Cancer Statistics, 2020: Report From National Cancer Registry Programme, India (JCO Global Oncology), which used 28 population-based and 58 hospital-based registries to project 1,392,179 cancers in 2020 and documented that most breast, cervical and head and neck cancers present at a locally advanced stage, and a senior author of the 2022 estimates and 2025 projections.",
    profiles: [{ label: "ICMR-NINE", url: "https://icmrnine.org" }, pm("Mathur P[Author] National Cancer Registry Programme India")],
    papers: [{ title: "Cancer Statistics, 2020: Report From National Cancer Registry Programme, India", journal: "JCO Global Oncology", year: 2020, doi: "10.1200/GO.20.00122" }, { title: "Cancer incidence estimates for 2022 and projection for 2025: result from National Cancer Registry Programme, India", journal: "Indian Journal of Medical Research", year: 2022, doi: "10.4103/ijmr.ijmr_1821_22" }],
    keyPapers: ["paper-mathur-ncrp-cancer-statistics-2020"], technologies: ["cancer-registries-surveillance"], bottlenecks: ["b-data-silos"] }),

  p({ id: "shetty-devi", name: "Devi Shetty", role: "Chairman and founder, Narayana Health; cardiac surgeon", institutionId: "narayana-health", institutions: ["narayana-health"],
    specialisms: ["Low-cost hospital models", "Cardiac surgery", "Health financing", "Hospital operations"],
    tldr: "The cardiac surgeon who showed that high-volume hospitals can cut the price of complex care by an order of magnitude, a model now applied to cancer at Narayana Health's Bengaluru campus.",
    summary: "Devi Shetty founded Narayana Hrudayalaya in 2001 at Bommasandra outside Bengaluru and built it into Narayana Health, a listed group of 24 hospitals whose economics of scale bring the price of a coronary bypass to a small fraction of US charges. With Kiran Mazumdar-Shaw he established the Mazumdar-Shaw Medical Centre (2009), the group's cancer and multispecialty campus. He has been an influential voice for universal health insurance in India, and holds the Padma Shri (2004) and Padma Bhushan (2012).",
    profiles: [{ label: "Narayana Health", url: "https://www.narayanahealth.org" }, { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Devi_Shetty" }],
    papers: [],
    technologies: ["global-oncology-access"], bottlenecks: ["b-global-access", "b-drug-pricing"] }),

  p({ id: "ajaikumar-b-s", name: "B. S. Ajaikumar", role: "Executive Chairman and founder, HealthCare Global Enterprises (HCG); radiation and medical oncologist", institutionId: "hcg", institutions: ["hcg"],
    specialisms: ["Radiation oncology", "Cancer hospital networks", "Precision oncology", "Private-sector cancer care"],
    tldr: "A US-trained oncologist who returned to Bengaluru and built HCG into India's largest specialist cancer hospital chain.",
    summary: "B. S. Ajaikumar founded HealthCare Global Enterprises in Bengaluru and grew it into a network of comprehensive cancer centres across India and Africa, bringing technologies such as robotic radiosurgery, hospital cyclotrons and molecular diagnostics into Indian private practice early. He remains executive chairman and a frequent commentator on the economics and organisation of cancer care in India.",
    profiles: [{ label: "HCG", url: "https://hcgoncology.com" }, pm("Ajaikumar BS[Author] HCG")],
    papers: [],
    technologies: ["sbrt", "cgp"] }),
];
