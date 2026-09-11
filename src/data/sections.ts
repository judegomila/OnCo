import type { SectionInput } from "@/lib/schema";

const asOf = "2026-09-04";

export const sections: SectionInput[] = [
  {
    id: "imaging", kind: "section", name: "Imaging", order: 1, asOf, icon: "scan",
    tldr: "Imaging covers the ways of seeing cancer inside the body without cutting, from X-rays to tracers that light up a single protein.",
    summary: "Anatomic imaging (CT, MRI, ultrasound) shows shape and size. Functional and molecular imaging (PET, SPECT) shows biology: glucose uptake, receptor expression, immune cell presence. The frontier is target-specific PET that predicts whether a targeted drug will work, and imaging that reads out treatment response within days rather than months.",
    tags: ["diagnosis", "staging", "response"], journals: ["cancer-imaging", "journal-of-breast-imaging", "journal-of-medical-imaging-and-radiation-oncology", "radiology-and-oncology", "radiology-imaging-cancer"],
  },
  {
    id: "diagnostics", kind: "section", name: "Diagnostics & Biomarkers", order: 2, asOf, icon: "dna",
    tldr: "Tests on tissue and blood that say what kind of cancer it is, what is driving it, and which drugs might work.",
    summary: "Pathology and immunohistochemistry remain the foundation. Layered on top: comprehensive genomic profiling (DNA and RNA), liquid biopsy for circulating tumour DNA, minimal residual disease monitoring, multi-cancer early detection, spatial and single-cell profiling, and AI read-outs of slides and scans.",
    tags: ["genomics", "liquid-biopsy", "pathology"], journals: ["cancer-biomarkers", "international-journal-of-biological-markers"],
  },
  {
    id: "early-detection", kind: "section", name: "Early Detection & Screening", order: 3, asOf, icon: "radar",
    tldr: "Early detection and screening means finding cancer before it causes symptoms, when it is most curable.",
    summary: "Population screening (mammography, colonoscopy, low-dose CT, HPV testing, PSA) has proven mortality benefit in several cancers. Blood-based multi-cancer early detection (MCED) and risk-adapted AI screening aim to extend this to cancers with no screening today.",
  },
  {
    id: "surgery", kind: "section", name: "Surgery & Interventional", order: 4, asOf, icon: "scalpel",
    tldr: "Removing or destroying tumours physically, increasingly with robots, image guidance, and heat or cold instead of a knife.",
    summary: "Surgery cures more cancers than any other modality. Advances are in precision (robotics, fluorescence guidance, intraoperative margin assessment), de-escalation (less surgery when systemic therapy has done the work), and minimally invasive ablation (radiofrequency, microwave, cryo, HIFU, irreversible electroporation).", journals: ["annals-of-surgical-oncology", "european-journal-of-surgical-oncology", "journal-of-surgical-oncology", "surgical-oncology", "surgical-oncology-clinics-of-north-america", "world-journal-of-surgical-oncology"],
  },
  {
    id: "radiation", kind: "section", name: "Radiation Therapy", order: 5, asOf, icon: "radiation",
    tldr: "Using focused beams or radioactive particles to kill tumour cells while sparing healthy tissue.",
    summary: "External beam radiation has moved from 2D fields to intensity-modulated, image-guided, stereotactic, and particle (proton, carbon) therapy. Adaptive and MR-guided delivery, ultra-high dose rate FLASH, and combination with immunotherapy are the frontier. Radiopharmaceuticals deliver radiation systemically to a molecular target.", journals: ["cancer-radiotherapie", "clinical-oncology-rcr", "journal-of-medical-imaging-and-radiation-oncology", "journal-of-radiation-research", "practical-radiation-oncology", "radiation-and-environmental-biophysics", "radiation-oncology", "radiology-and-oncology", "seminars-in-radiation-oncology", "strahlentherapie-und-onkologie"],
  },
  {
    id: "chemotherapy", kind: "section", name: "Chemotherapy", order: 6, asOf, icon: "flask",
    tldr: "Drugs that kill fast-dividing cells. Still the backbone of many cures, and now the warhead inside smarter drugs.",
    summary: "Cytotoxics (platinums, taxanes, anthracyclines, antimetabolites, topoisomerase inhibitors) remain curative in several cancers and are the payloads of antibody-drug conjugates. Progress is in dosing, sequencing, biomarker-guided de-escalation, and toxicity mitigation.", journals: ["cancer-chemotherapy-and-pharmacology", "gan-to-kagaku-ryoho", "journal-of-oncology-pharmacy-practice"],
  },
  {
    id: "targeted-therapy", kind: "section", name: "Targeted Therapy", order: 7, asOf, icon: "crosshair",
    tldr: "Targeted therapies are drugs designed to switch off a specific broken protein that a cancer depends on.",
    summary: "Small-molecule kinase inhibitors, monoclonal antibodies, hormone-pathway agents, PARP inhibitors, degraders (PROTACs, molecular glues), and synthetic-lethality approaches. Matched to a molecular alteration by a companion diagnostic. Resistance is the central problem; next-generation and combination strategies are the response.", journals: ["current-cancer-drug-targets", "targeted-oncology"],
  },
  {
    id: "adcs", kind: "section", name: "Antibody-Drug Conjugates", order: 8, asOf, icon: "link",
    tldr: "An antibody that finds the tumour, carrying a tiny dose of very strong chemotherapy that is released only inside it.",
    summary: "ADCs combine a targeting antibody, a linker, and a cytotoxic payload. Third-generation ADCs (T-DXd, sacituzumab govitecan, datopotamab deruxtecan) with topoisomerase-I payloads and bystander killing have reshaped breast, lung, and urothelial cancer. Next generation: bispecific ADCs, dual payloads, degrader and immune-stimulating payloads, masked ADCs, and radio-conjugates.",
  },
  {
    id: "immunotherapy", kind: "section", name: "Immunotherapy", order: 9, asOf, icon: "shield",
    tldr: "Immunotherapy helps the patient's own immune system recognise and destroy the cancer.",
    summary: "Checkpoint inhibitors (PD-1, PD-L1, CTLA-4, LAG-3), bispecific T-cell engagers, cancer vaccines (including personalised mRNA neoantigen vaccines), oncolytic viruses, cytokines, and innate-immune agonists. Determining who responds, and converting cold tumours to hot, are the central problems.", journals: ["cancer-immunology-immunotherapy", "journal-of-immunotherapy", "oncoimmunology"],
  },
  {
    id: "cell-therapy", kind: "section", name: "Cell Therapy", order: 10, asOf, icon: "cell",
    tldr: "Taking immune cells, engineering or expanding them, and giving them back as a living drug.",
    summary: "CAR-T has transformed B-cell malignancies and myeloma. Solid tumours are the frontier: TIL therapy (lifileucel), TCR-T (afamitresgene), CAR-T against CLDN18.2 and GPC3, armoured and logic-gated CARs, allogeneic and in vivo CAR-T (targeted LNPs delivering CAR mRNA), CAR-NK and CAR-macrophages.", technologies: ["cell-therapy-release-testing"], journals: ["cancer-gene-therapy"],
  },
  {
    id: "radiopharma", kind: "section", name: "Radiopharmaceuticals & Theranostics", order: 11, asOf, icon: "atom",
    tldr: "A molecule that homes to the tumour carries a radioactive atom. The same molecule with a different atom lets you see the tumour first.",
    summary: "Theranostic pairs (68Ga/18F for PET imaging; 177Lu for beta therapy; 225Ac/212Pb for alpha therapy) against PSMA, SSTR, FAP and more. Pluvicto and Lutathera are approved; alpha emitters and new targets are in late-stage trials. Isotope supply is the bottleneck.", journals: ["cancer-biotherapy-and-radiopharmaceuticals"],
  },
  {
    id: "hormonal", kind: "section", name: "Hormonal Therapy", order: 12, asOf, icon: "hormone",
    tldr: "Cutting off the hormones that some cancers, especially breast and prostate, need to grow.",
    summary: "Aromatase inhibitors, SERMs, SERDs (fulvestrant, oral SERDs, PROTAC degraders like vepdegestrant), ovarian suppression, androgen deprivation, and AR pathway inhibitors. Combined with CDK4/6, PI3K/AKT, or PARP inhibitors depending on the tumour.",
  },
  {
    id: "epigenetics", kind: "section", name: "Epigenetic & Transcriptional Therapy", order: 13, asOf, icon: "helix",
    tldr: "Epigenetic and transcriptional therapy changes how genes are read rather than the genes themselves.",
    summary: "DNMT and HDAC inhibitors (haematologic malignancies), EZH2 inhibitors, IDH inhibitors, menin inhibitors (revumenib), BET inhibitors, and emerging transcription-factor degraders. Mostly established in blood cancers; solid tumours are catching up.",
  },
  {
    id: "supportive-care", kind: "section", name: "Supportive Care & Survivorship", order: 14, asOf, icon: "heart",
    tldr: "Supportive care and survivorship covers everything that keeps a patient well enough to receive treatment, and well afterwards.",
    summary: "Anti-emetics, growth factors, scalp cooling, cardio-oncology, fertility preservation, geriatric assessment, palliative integration, exercise oncology, financial toxicity mitigation, and long-term survivorship monitoring. Under-studied relative to its impact.", technologies: ["acupuncture-nausea", "cbt-fatigue-distress", "tai-chi-qigong", "relaxation-guided-imagery", "music-therapy-cancer", "aromatherapy-cancer", "reiki-energy-therapies", "ginger-nausea", "curcumin-turmeric", "melatonin-cancer", "medicinal-mushrooms-reishi-turkey-tail", "ayurvedic-medicine-cancer", "homeopathy-cancer", "essiac-herbal-cancer-cures"], journals: ["supportive-care-in-cancer"], companies: ["belong-life"],
  },
  {
    id: "ai-computation", kind: "section", name: "AI & Computation", order: 15, asOf, icon: "chip",
    tldr: "Software that reads scans and slides, predicts outcomes, designs drugs, and matches patients to trials.",
    summary: "FDA-cleared digital pathology risk tools (ArteraAI), radiology triage and screening models, pathology and radiology foundation models, multimodal patient-level models, AI-driven target discovery and ADC design, and LLM-based trial matching and tumour-board support.", technologies: ["federated-learning-medical-ai", "chief", "phikon", "ct-fm", "medsam", "aidoc-care", "cellfm", "genept", "nucleotide-transformer", "enformer-borzoi", "bionemo"], journals: ["jco-clinical-cancer-informatics", "jmir-cancer"], companies: ["aluna", "mednet"],
  },
  {
    id: "drug-discovery", kind: "section", name: "Drug Discovery Platforms", order: 16, asOf, icon: "beaker",
    tldr: "Drug discovery platforms are the tools used to find the next drug: gene screens, organoids, models in mice, and AI.",
    summary: "CRISPR functional genomics (DepMap), patient-derived organoids and xenografts, ex vivo drug sensitivity testing, structure-based and AI-driven design, degrader platforms, and conjugation chemistry.", technologies: ["chai-1", "rfdiffusion", "bioemu", "phenom-2", "chemistry42"], journals: ["cancer-biology-and-therapy", "current-cancer-drug-targets", "oncology-research", "recent-patents-on-anti-cancer-drug-discovery", "technology-in-cancer-research-and-treatment"],
  },
  {
    id: "prevention", kind: "section", name: "Prevention & Risk", order: 17, asOf, icon: "umbrella",
    tldr: "Stopping cancer from starting: vaccines, germline testing, lifestyle, and preventive drugs or surgery.",
    summary: "HPV and HBV vaccination, hereditary cancer syndrome testing (BRCA, Lynch), chemoprevention (tamoxifen, aspirin in Lynch), risk-reducing surgery, and population-level tobacco and alcohol control. The most cost-effective section of oncology and the least glamorous.", journals: ["asian-pacific-journal-of-cancer-prevention", "cancer-causes-and-control", "cancer-epidemiology", "cancer-epidemiology-biomarkers-prevention", "cancer-prevention-research", "european-journal-of-cancer-prevention", "journal-of-environmental-pathology-toxicology-and-oncology"],
  },
  {
    id: "nutrition-lifestyle", kind: "section", name: "Diet, Exercise & Lifestyle", order: 19, asOf, icon: "leaf",
    tldr: "What people eat, drink, weigh and do affects who gets cancer, how treatment goes, and who relapses. This front studies that with the rigour of a drug trial.",
    summary: "Obesity, alcohol and inactivity are established causes; diet quality, fibre and the gut microbiome shape immunotherapy response; structured exercise improved survival in a randomised colon cancer trial (CHALLENGE, 2025); fasting-mimicking and ketogenic diets, GLP-1 agonists, vitamin D and aspirin are under test. Cachexia and malnutrition during treatment are treatable and under-treated. The evidence ranges from strong to hype, and this front keeps the two apart.",
    tags: ["nutrition", "exercise", "microbiome", "obesity", "cachexia", "prevention"],
    links: [{ label: "WCRF Continuous Update Project", url: "https://www.wcrf.org/research-policy/continuous-update-project/" }, { label: "CHALLENGE trial (NEJM 2025)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2502760" }], journals: ["nutrition-and-cancer"],
  },
  {
    id: "devices", kind: "section", name: "Devices & Physical Therapies", order: 18, asOf, icon: "device",
    tldr: "Devices and physical therapies treat cancer with electric fields, heat, or sound rather than chemicals.",
    summary: "Tumour treating fields (Optune, now approved in pancreatic cancer), hyperthermia, HIFU, histotripsy, photodynamic and photoimmunotherapy, electroporation, and intraoperative devices.", journals: ["technology-in-cancer-research-and-treatment"],
  },
];
