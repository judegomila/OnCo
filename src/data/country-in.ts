/**
 * India deep dive: the hand-written cards for /countries/in/. Plain English first, detail second, every card
 * with its sources. Entity lists (institutions, companies, trials, people) are pulled from the graph on the
 * page by id so they stay in sync with the corpus. Figures are quoted only where the linked source states them.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const IN_ASOF = "2026-09-10";

/** Cancer profile: what is different about cancer in India. GLOBOCAN 2022 figures are rendered live from public/globocan/countries.json. */
export const IN_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "A different shape of cancer: oral, cervical, breast, and gallbladder in the Gangetic belt",
    plain: "India has fewer cancers per person than rich countries but a very different mix. Cancers of the mouth and throat, driven by chewing tobacco and areca nut, and cervical cancer, caused by HPV, are far more common than in the West. Breast cancer is now the single most common cancer. Gallbladder cancer, rare almost everywhere else, is common along the Ganges.",
    detail: "GLOBOCAN 2022 estimates about 1.41 million new cancers and 917,000 deaths in India, an age-standardised incidence of 98.5 per 100,000 (roughly a third of the US rate) but with a high case-fatality because so many cancers are found late. Lip and oral cavity cancer alone accounts for about 144,000 cases, and the head and neck sites together exceed breast cancer. Cervical cancer (about 127,500 cases, 79,900 deaths) is the second cancer of women. India's registries record most breast (57%), cervical (60%) and head and neck (66.6%) cancers at a locally advanced stage. Gallbladder cancer is concentrated in the northern and north-eastern Gangetic states, where incidence in women is among the highest in the world.",
    links: [
      { label: "GLOBOCAN 2022: India fact sheet (IARC)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/356-india-fact-sheet.pdf" },
      { label: "Cancer Statistics, 2020: National Cancer Registry Programme (JCO Glob Oncol)", url: "https://doi.org/10.1200/GO.20.00122" },
      { label: "Cancer incidence estimates for 2022 and projection for 2025 (IJMR)", url: "https://doi.org/10.4103/ijmr.ijmr_1821_22" },
    ],
  },
  {
    id: "tobacco",
    title: "Tobacco, chewed as much as smoked",
    plain: "More than a quarter of Indian adults use tobacco, and most of them chew it rather than smoke it. That is why mouth cancer is so common, and why tobacco control is the single biggest lever on cancer in India.",
    detail: "The Global Adult Tobacco Survey (2016-17) found 28.6% of people aged 15 and over, about 267 million, using tobacco in some form, with smokeless products (khaini, gutka, betel quid with tobacco) more common than cigarettes or bidis. The National Tobacco Control Programme attributes about 3,500 deaths a day to tobacco and half of cancers in men and a fifth in women. The Cigarettes and Other Tobacco Products Act (COTPA, 2003) bans smoking in public places, sales to and by minors and sales within 100 yards of schools, and requires pictorial warnings; state gutka bans followed from 2012; a national quitline (1800 11 2356) and mCessation service operate.",
    links: [
      { label: "National Tobacco Control Programme, MoHFW", url: "https://ntcp.mohfw.gov.in/" },
      { label: "GATS-2 India prevalence (PLoS One 2026 analysis)", url: "https://doi.org/10.1371/journal.pone.0341459" },
    ],
  },
  {
    id: "registries",
    title: "How India counts cancer",
    plain: "India does not have a national cancer register covering everyone. Instead the ICMR runs dozens of local registries and projects national numbers from them, which is why estimates differ between sources.",
    detail: "The ICMR National Cancer Registry Programme (since 1982, coordinated from Bengaluru) drew on 28 population-based and 58 hospital-based registries for its 2020 report, projecting 1,392,179 cases for 2020 and, in a 2022 update, 1,461,427 cases with a 12.8% rise by 2025 and a lifetime risk of about one in nine. Registries cover roughly a tenth of the population and are urban-weighted; GLOBOCAN uses different methods and gives slightly different totals. The north-east (Aizawl, Papumpare) has the highest recorded rates.",
    links: [
      { label: "ICMR-NINE (formerly NCDIR), National Cancer Registry Programme", url: "https://icmrnine.org" },
      { label: "Cancer Statistics, 2020 (JCO Glob Oncol)", url: "https://doi.org/10.1200/GO.20.00122" },
    ],
  },
];

export const IN_PAYING: CountryCard[] = [
  {
    id: "pmjay",
    title: "Ayushman Bharat PM-JAY: public insurance for the poorest 40%",
    plain: "Since 2018 India has run the world's largest government-funded health insurance scheme. Eligible families get cashless hospital treatment, including cancer surgery, chemotherapy and radiotherapy, up to 5 lakh rupees a year. Since 2024 everyone over 70 is covered too.",
    detail: "PM-JAY was launched on 23 September 2018 and is run by the National Health Authority with state agencies. It covers about the poorest 40% of the population (the original target was 10 crore households, around 50 crore people) for secondary and tertiary hospital care at empanelled public and private hospitals, with oncology among the largest tertiary package groups. In September 2024 cover was extended to all people aged 70 and over. A 2025 study of 6,695 cancer patients at seven centres in six states found PM-JAY enrolment strongly associated with starting treatment within 30 days, and 36% higher odds of timely treatment for patients diagnosed after 2018. Outpatient visits, most oral cancer drugs and diagnostics remain outside the cover, and package rates for newer drugs are low.",
    links: [
      { label: "National Health Authority: PM-JAY", url: "https://nha.gov.in/PM-JAY" },
      { label: "Access to timely cancer treatment initiation in India (Lancet Reg Health SE Asia 2025)", url: "https://doi.org/10.1016/j.lansea.2024.100514" },
    ],
  },
  {
    id: "public-centres",
    title: "Public cancer centres: free or subsidised for most",
    plain: "Tata Memorial in Mumbai, the state cancer institutes and the AIIMS network treat most of their patients free or for very little. The price is waiting and travel: people cross the country to reach them.",
    detail: "Tata Memorial Centre, run by the Department of Atomic Energy, registers well over 100,000 new patients a year across its Mumbai hospitals and its units in Varanasi, Sangrur and Mullanpur, Visakhapatnam, Muzaffarpur and Guwahati, treating the majority in the general (subsidised) category. Regional Cancer Centres such as Kidwai (Bengaluru), the Cancer Institute (WIA) in Chennai (about 60% of its 100,000 annual patients treated free or subsidised) and the state cancer institutes funded under the national NCD programme do the same. Twenty AIIMS were operating by January 2023, each with oncology services. The gap is capacity: radiotherapy machines, specialists and beds are concentrated in a few cities.",
    links: [
      { label: "Tata Memorial Centre", url: "https://tmc.gov.in" },
      { label: "Cancer Institute (WIA), Adyar", url: "https://www.cancerinstitutewia.in" },
      { label: "PMSSY (new AIIMS)", url: "https://pmssy.mohfw.gov.in" },
    ],
  },
  {
    id: "prices",
    title: "Why cancer drugs cost less in India: generics, biosimilars and pooled buying",
    plain: "India's patent law, its generics industry and group purchasing by cancer hospitals mean that many cancer drugs cost a small fraction of Western prices. New patented drugs and cell therapies are the exception.",
    detail: "Section 3(d) of the Patents Act, upheld by the Supreme Court in Novartis v Union of India (1 April 2013), refuses patents on new forms of known drugs without improved efficacy, which kept generic imatinib on sale at a small fraction of the Glivec price. India's first compulsory licence (Natco, sorafenib, March 2012) cut that drug's price by about 97%. Indian biosimilars of rituximab (Dr Reddy's, 2007), trastuzumab (Biocon, 2014) and bevacizumab (Hetero, 2016) were among the first anywhere. The National Cancer Grid's pooled procurement of 40 drugs for 23 centres cut costs by a median of 82% against list price. Newer patented drugs (immunotherapies, ADCs) are still priced beyond most patients, which is why Tata Memorial's low-dose and metronomic trials matter.",
    links: [
      { label: "National Cancer Grid pooled procurement (Bull WHO 2023)", url: "https://doi.org/10.2471/BLT.23.289714" },
      { label: "Novartis v Union of India (2013)", url: "https://en.wikipedia.org/wiki/Novartis_v._Union_of_India_%26_Others" },
      { label: "Natco Pharma (compulsory licence, 2012)", url: "https://en.wikipedia.org/wiki/Natco_Pharma" },
    ],
  },
];

export const IN_REGULATOR: CountryCard[] = [
  {
    id: "cdsco",
    title: "CDSCO and the Drugs Controller General of India",
    plain: "India's medicines regulator is the Central Drugs Standard Control Organization, headed by the Drugs Controller General of India. It approves new cancer drugs, biosimilars and cell therapies, and since 2019 can waive local trials for drugs already approved by major regulators.",
    detail: "CDSCO sits under the Ministry of Health and Family Welfare and approves new drugs and clinical trials, licenses vaccine and biologic manufacturing and sets standards, while state authorities license most manufacturing and retail. The New Drugs and Clinical Trials Rules 2019 shortened approval timelines and allowed waivers of local trials for drugs approved by reference regulators. India's biosimilar guidelines date from 2012 (revised 2016). CDSCO approved the first Indian CAR-T (NexCAR19, talicabtagene autoleucel) in 2023 and the second (Qartemi, varnimcabtagene autoleucel) in 2024, and India's first domestic HPV vaccine (CERVAVAC) in 2022. Prices of essential medicines are controlled separately by the National Pharmaceutical Pricing Authority.",
    links: [
      { label: "CDSCO", url: "https://cdsco.gov.in" },
      { label: "CDSCO: approved new drugs", url: "https://cdsco.gov.in/opencms/opencms/en/Approval_new/Approved-New-Drugs/" },
      { label: "Clinical Trials Registry - India (CTRI)", url: "https://ctri.nic.in" },
    ],
  },
];

export const IN_DOING: CountryCard[] = [
  {
    id: "prevent",
    title: "Prevent what can be prevented: HPV vaccine, screening, tobacco",
    plain: "The two cancers India can most easily prevent are cervical cancer, with a vaccine and an HPV test, and mouth cancer, with tobacco control and a trained health worker looking in the mouth. India has produced the evidence for all of these and now has its own vaccine.",
    detail: "The IARC India study showed one dose of HPV vaccine protects as well as three at 10 years (efficacy 95.4% against persistent HPV 16/18), which halved the cost of vaccinating a girl worldwide; the Serum Institute's CERVAVAC, approved in 2022, gives India its own supply for a national programme. The Osmanabad trial showed one round of HPV testing halves cervical cancer deaths, the Mumbai trial that VIA by health workers cuts them by 31%, and the Kerala trial that oral visual screening cuts oral cancer deaths in tobacco users by a third. The national NCD programme now includes population screening for oral, breast and cervical cancer at Health and Wellness Centres.",
    links: [
      { label: "Single-dose HPV vaccine efficacy at 10 years (Lancet Oncol 2021)", url: "https://doi.org/10.1016/S1470-2045(21)00453-8" },
      { label: "HPV screening in rural India (NEJM 2009)", url: "https://doi.org/10.1056/NEJMoa0808516" },
      { label: "Oral cancer screening in Kerala (Lancet 2005)", url: "https://doi.org/10.1016/S0140-6736(05)66658-5" },
      { label: "CERVAVAC (Serum Institute)", url: "https://www.seruminstitute.com/product_ind_cervavac.php" },
    ],
  },
  {
    id: "affordable-trials",
    title: "Make treatment affordable: low-dose and metronomic trials",
    plain: "Tata Memorial has spent two decades asking a question rich countries rarely ask: what is the cheapest way to get the same benefit? Its randomised trials of very low-dose immunotherapy, oral metronomic tablets and a local anaesthetic injection at surgery have all shown survival gains.",
    detail: "Low-dose nivolumab (20 mg every 3 weeks, roughly 6% of the standard dose) added to oral metronomic chemotherapy raised one-year survival in advanced head and neck cancer from 16.3% to 43.4% (JCO 2023). Oral methotrexate plus celecoxib was non-inferior to, and beat, intravenous cisplatin (Lancet Global Health 2020). METRO PLUS in Varanasi doubled median survival by adding metronomic tablets to paclitaxel-carboplatin (2026). Peritumoral lidocaine before breast surgery improved 5-year survival from 86.4% to 90.1% (JCO 2023). Gefitinib plus chemotherapy doubled progression-free survival in EGFR-mutant lung cancer (JCO 2020). These results travel through the National Cancer Grid's guidelines to hundreds of centres.",
    links: [
      { label: "Low-dose nivolumab (JCO 2023)", url: "https://doi.org/10.1200/JCO.22.01015" },
      { label: "Oral metronomic vs cisplatin (Lancet Glob Health 2020)", url: "https://doi.org/10.1016/S2214-109X(20)30275-8" },
      { label: "Peritumoral lidocaine (JCO 2023)", url: "https://doi.org/10.1200/JCO.22.01966" },
    ],
  },
  {
    id: "make-it-here",
    title: "Make it here: CAR-T, biosimilars and discovery",
    plain: "India now makes its own CAR-T cell therapies at a fraction of Western prices, has FDA- and EMA-approved cancer antibody biosimilars, and in 2025 licensed an Indian-discovered myeloma antibody to AbbVie for 700 million dollars upfront.",
    detail: "NexCAR19 (ImmunoACT, from IIT Bombay and Tata Memorial) was approved in 2023 with a 73% response rate in its phase 1/2 trial and has treated more than 600 patients at over 130 centres; Qartemi (Immuneel, from Barcelona's ARI-0001) followed in 2024. Biocon Biologics' trastuzumab (Ogivri) and bevacizumab (Abevmy) biosimilars are approved in the US and EU; Dr Reddy's rituximab reached the EU in 2024. Glenmark's ISB 2001 trispecific antibody was licensed to AbbVie in July 2025. Indian CDMOs (Syngene, Aragen, Sai Life Sciences, Jubilant) do a large share of the world's early cancer drug chemistry and biology.",
    links: [
      { label: "Talicabtagene autoleucel phase 1/2 (Lancet Haematol 2025)", url: "https://doi.org/10.1016/S2352-3026(24)00377-6" },
      { label: "ImmunoACT", url: "https://immunoact.com" },
      { label: "Ogivri EPAR (EMA)", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/ogivri" },
    ],
  },
  {
    id: "network",
    title: "Join it up: the National Cancer Grid and the new hospitals",
    plain: "Rather than one national cancer institute, India built a grid: more than 360 centres agreeing what good care is, buying drugs together, sharing tumour boards and training. Tata Memorial has opened hospitals across the north and east, and AIIMS has multiplied from one to twenty.",
    detail: "The National Cancer Grid, run from Tata Memorial, publishes resource-stratified guidelines, runs virtual tumour boards and quality programmes, trains researchers (CReDO) and launched a cancer EMR initiative in 2025. Tata Memorial's units in Varanasi, Sangrur and Mullanpur, Visakhapatnam, Muzaffarpur and Guwahati bring comprehensive care to regions with the highest burden of oral, cervical and gallbladder cancer. Twenty AIIMS were operating by January 2023. The remaining constraints are workforce and radiotherapy capacity, outpatient and oral-drug costs outside PM-JAY, and the price of new patented drugs.",
    links: [
      { label: "National Cancer Grid", url: "https://www.ncgindia.org" },
      { label: "NCG EMR initiative (Bull WHO 2025)", url: "https://doi.org/10.2471/BLT.24.292230" },
      { label: "Tata Memorial Centre units", url: "https://tmc.gov.in" },
    ],
  },
];

/** Entity ids to render from the graph, in display order. Missing ids are skipped at render time. */
export const IN_INSTITUTIONS = ["tata-memorial", "actrec", "national-cancer-grid", "homi-bhabha-cancer-hospital-varanasi", "aiims-delhi", "aiims-network", "cancer-institute-adyar", "kidwai-memorial-institute-of-oncology", "rgci", "tata-medical-center-kolkata", "cmc-vellore", "pgimer-chandigarh", "apollo-hospitals", "hcg", "max-healthcare", "narayana-health", "iit-bombay", "iisc", "ncbs", "instem", "icmr", "icmr-ncrp", "icmr-nicpr", "dbt-india", "cdsco", "nha-pmjay"];
export const IN_COMPANIES = ["biocon", "biocon-biologics", "dr-reddys", "sun-pharma", "natco", "cipla", "zydus", "lupin", "intas", "glenmark", "hetero", "aurigene", "immunoact", "immuneel", "cellogen", "serum-institute-of-india", "syngene", "jubilant-radiopharma"];
export const IN_DRUGS = ["talicabtagene-autoleucel", "varnimcabtagene-autoleucel", "cervavac", "isb-2001", "trastuzumab-biosimilars"];
export const IN_TRIALS = ["low-dose-nivolumab-tmh", "metronomic-vs-cisplatin-tmh", "metro-plus-varanasi", "lidocaine-peritumoral-tmh", "progesterone-preop-tmh", "gefitinib-chemo-tmh", "elective-neck-dissection-tmh", "olanzapine-appetite-tmh", "osmanabad-hpv-screening", "mumbai-via-screening", "kerala-oral-screening", "iarc-india-hpv-dose-study", "talicel-phase-1-2", "imagine-varnimcabtagene"];
export const IN_PAPERS = ["paper-patil-low-dose-nivolumab-jco-2023", "paper-sankaranarayanan-hpv-screening-nejm-2009", "paper-basu-single-dose-hpv-lancet-oncol-2021", "paper-sankaranarayanan-oral-screening-lancet-2005", "paper-dcruz-elective-neck-dissection-nejm-2015", "paper-jain-talicabtagene-lancet-haem-2025", "paper-badwe-progesterone-jco-2011", "paper-mathur-ncrp-cancer-statistics-2020", "paper-pramesh-ncg-pooled-procurement-2023"];
export const IN_PEOPLE = ["gupta-sudeep", "pramesh-c-s", "badwe-rajendra", "prabhash-kumar", "patil-vijay", "noronha-vanita", "chaturvedi-pankaj", "shastri-surendra", "dcruz-anil", "raina-vinod", "shanta-v", "sankaranarayanan-rengaswamy", "basu-partha", "mazumdar-shaw-kiran", "purwar-rahul", "jain-hasmukh", "narula-gaurav", "kapoor-akhil", "mathur-prashant", "shetty-devi", "ajaikumar-b-s"];
