import type { CompanyInput } from "@/lib/schema";

/** Oncology-relevant vendors from the Elicit market map, checked against official pages. */
export const companiesElicitMap: CompanyInput[] = [
  {
    "kind": "company",
    "id": "adimab",
    "name": "Adimab",
    "hq": "Lebanon, NH",
    "country": "US",
    "companyType": "biotech",
    "website": "https://adimab.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Adimab discovers and engineers antibodies for drug developers, including partners developing cancer medicines.",
    "summary": "Adimab is an antibody discovery and engineering company. Ono Pharmaceutical announced a collaboration with Adimab to discover and develop antibody drugs in oncology. The agreement covers discovery against targets selected by Ono; Ono will evaluate and develop candidates and has an option to obtain exclusive rights to develop, manufacture and commercialise them worldwide. This is a research partnership, not evidence that an antibody from it improves cancer outcomes.",
    "notes": [
      "Location is stated in Ono's announcement."
    ],
    "links": [
      {
        "label": "Ono oncology antibody collaboration",
        "url": "https://www.ono-pharma.com/en/news/20230927.html"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.ono-pharma.com/en/news/20230927.html"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "ai-proteins",
    "name": "AI Proteins",
    "hq": "Boston, MA",
    "country": "US",
    "companyType": "biotech",
    "website": "https://www.aiproteins.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "AI Proteins designs small proteins as possible medicines and lists cancer research programmes that would carry radiation to a target.",
    "summary": "AI Proteins develops de novo miniproteins, proteins designed from first principles. Its pipeline lists internal oncology programmes described as targeted radiotherapy, with undisclosed targets. The page also lists programmes outside oncology. The oncology entries do not establish clinical benefit, and no specific cancer indication or trial phase is inferred from the pipeline graphic.",
    "notes": [
      "Location is the company's business address in its privacy policy, not a separately verified headquarters designation."
    ],
    "links": [
      {
        "label": "Official pipeline",
        "url": "https://www.aiproteins.com/pipeline"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.aiproteins.com/legal/privacy-policy"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "twist-bioscience",
    "name": "Twist Bioscience",
    "hq": "South San Francisco, CA",
    "country": "US",
    "companyType": "biotech",
    "website": "https://www.twistbioscience.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Twist Bioscience supplies synthetic DNA and antibody-discovery tools for cancer research.",
    "summary": "Twist Bioscience offers cancer-research tools spanning sequencing, antibody discovery, protein production and antibody characterisation. Its cancer research page describes antibody discovery directed at cancer-related targets, including DKK1, and preclinical antibody testing. These are research tools and services. The page explicitly states that the products presented are for research use and are not intended for diagnosis, prevention or treatment.",
    "notes": [
      "Headquarters is stated in the official page footer."
    ],
    "links": [
      {
        "label": "Cancer research products and research-use limits",
        "url": "https://www.twistbioscience.com/applications/cancer-research/cancer-research-solutions"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.twistbioscience.com/applications/cancer-research/cancer-research-solutions"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "phasev",
    "name": "PhaseV",
    "hq": "Boston / Tel Aviv (offices)",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.phasevtrials.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery",
      "ai-computation"
    ],
    "tldr": "PhaseV provides software for planning and analysing clinical trials, including cancer studies.",
    "summary": "PhaseV describes clinical trial design and analysis software using statistical modelling and causal inference. Its oncology work with iOMEDICO uses cancer real-world data to select covariates, patient characteristics used to adjust comparisons between trial groups. The cited page discusses oncology trial methods rather than a treatment. Claims about faster recruitment or improved trial success are not treated here as independently established outcomes.",
    "notes": [
      "The contact page lists offices in Boston, USA, and Tel Aviv, Israel, without identifying a sole headquarters. US identifies the listed Boston office, not exclusive operations."
    ],
    "links": [
      {
        "label": "Oncology trial covariate adjustment",
        "url": "https://www.phasevtrials.com/resources/advancing-oncology-trials-with-covariate-adjustment"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.phasevtrials.com/contact"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "benchsci",
    "name": "BenchSci",
    "hq": "Toronto, ON",
    "country": "CA",
    "companyType": "ai-software",
    "website": "https://www.benchsci.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery",
      "ai-computation"
    ],
    "tldr": "BenchSci develops research software that proposes drug targets and combinations, including early laboratory work in lung cancer.",
    "summary": "BenchSci's Emet research software combines biomedical information to propose therapeutic hypotheses. A company report describes testing four proposals in human lung squamous cell carcinoma cells and reports that two combinations produced effects exceeding the individual agents. This is company-reported, early laboratory work. It does not demonstrate that the combinations are safe or effective treatments for people.",
    "notes": [
      "Location is the company's published contact address."
    ],
    "links": [
      {
        "label": "Lung cancer hypothesis-generation research",
        "url": "https://www.benchsci.com/news/introducing-the-hypothesis-generation-agent"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.benchsci.com/contact"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "causaly",
    "name": "Causaly",
    "hq": "London",
    "country": "GB",
    "companyType": "ai-software",
    "website": "https://www.causaly.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery",
      "ai-computation"
    ],
    "tldr": "Causaly provides software for searching biomedical evidence and exploring potential drug targets, including in prostate cancer.",
    "summary": "Causaly develops a biomedical evidence platform with a knowledge graph and scientific research tools. Its official resources include a prostate cancer target-discovery factsheet. This supports inclusion as a cancer research tool provider, not as a cancer diagnostic service or a developer of a proven treatment. The company identifies London as its headquarters.",
    "notes": [
      "No treatment effectiveness claim is inferred from a target-discovery resource."
    ],
    "links": [
      {
        "label": "Prostate cancer target-discovery resource",
        "url": "https://www.causaly.com/resources/downloads"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.causaly.com/about"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "cytel",
    "name": "Cytel",
    "hq": "Waltham, MA",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://cytel.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Cytel provides statistical design and analysis services for cancer clinical trials.",
    "summary": "Cytel's oncology services include statistical trial design, trial delivery, real-world evidence methods and regulatory strategy. Its East BAYES software supports clinical trial design and simulation. The company is included for these research services, not as a provider of cancer treatment. Its published software terms identify Waltham, Massachusetts, as its principal place of business.",
    "notes": [
      "Location is the principal place of business in the published East BAYES agreement. Reading that agreement does not imply acceptance."
    ],
    "links": [
      {
        "label": "Oncology clinical development services",
        "url": "https://cytel.com/solutions/specialty-areas/oncology/"
      },
      {
        "label": "Official location evidence",
        "url": "https://eastbayes.cytel.com/terms-of-use-agreement"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "certara",
    "name": "Certara",
    "hq": "Radnor, PA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.certara.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery",
      "ai-computation"
    ],
    "tldr": "Certara supplies modelling software and advice used to plan cancer drug doses and clinical development.",
    "summary": "Certara offers biosimulation and model-informed drug development services. Its oncology resources cover dose optimisation, regulatory strategy and models of cancer drug exposure and response. These tools inform research decisions; their presence does not establish that a proposed cancer treatment works. The company's locations page identifies its corporate headquarters in Radnor, Pennsylvania.",
    "notes": [
      "No funding, market value or performance estimate from the vendor map is adopted."
    ],
    "links": [
      {
        "label": "Oncology modelling and regulatory services",
        "url": "https://www.certara.com/accelerating-oncology-drugdevelopment-with-biosimulation-andregulatory-strategy/"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.certara.com/company/our-locations/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "almac",
    "name": "Almac",
    "hq": "Craigavon, Northern Ireland",
    "country": "GB",
    "companyType": "cro-services",
    "website": "https://www.almacgroup.com/",
    "asOf": "2026-11-06",
    "sections": [
      "diagnostics",
      "drug-discovery"
    ],
    "tldr": "Almac provides laboratory and drug-development services, including cancer biomarker assays and companion-diagnostic development.",
    "summary": "Almac Diagnostic Services offers genomic, protein and tissue-testing services for research and clinical development. Its official platform page lists sequencing and liquid-biopsy assays and describes tissue-staining services supporting precision oncology and companion-diagnostic development. Almac's global headquarters is in Craigavon, Northern Ireland. A platform's inclusion in the service catalogue does not mean every assay is approved for every clinical use.",
    "notes": [
      "The company record represents Almac Group; the oncology evidence describes its Diagnostic Services business."
    ],
    "links": [
      {
        "label": "Oncology assays and companion-diagnostic services",
        "url": "https://www.almacgroup.com/diagnostics/global-laboratories/platforms-technologies/"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.almacgroup.com/our-locations"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "signant-health",
    "name": "Signant Health",
    "hq": "Blue Bell, PA (office)",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://signanthealth.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery",
      "ai-computation"
    ],
    "tldr": "Signant Health provides clinical-trial technology, including tools for collecting patient-experience data in cancer studies.",
    "summary": "Signant Health supplies clinical data collection, trial supply management and patient-engagement technology. Its therapeutic-area page explicitly lists oncology and patient-experience data collection, with resources for several cancer types. These are tools supporting research, not cancer treatments. Its global locations page lists a Blue Bell, Pennsylvania, office in the United States.",
    "notes": [
      "The location field records a verified US office. The source does not identify a sole global headquarters."
    ],
    "links": [
      {
        "label": "Oncology trial technology",
        "url": "https://signanthealth.com/science/therapeutic-areas"
      },
      {
        "label": "Official location evidence",
        "url": "https://signanthealth.com/company/global-locations"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "syneos-health",
    "name": "Syneos Health",
    "hq": "Morrisville, NC",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://www.syneoshealth.com/",
    "asOf": "2026-11-06",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Syneos Health runs clinical-development services for cancer drug studies, including early trials of antibody-drug conjugates and radiopharmaceuticals.",
    "summary": "Syneos Health's early-phase oncology service covers trial design and execution, dose escalation and dose optimisation. Its official service page describes work involving antibody-drug conjugates and radiopharmaceuticals, including safety monitoring and specialised trial operations. This identifies the company as a cancer clinical-research service provider; no success rate or patient-benefit claim is inferred. Its corporate headquarters is in Morrisville, North Carolina.",
    "notes": [
      "Company location comes from the corporate-headquarters address on its careers locations page; stale stock-listing text there is not adopted."
    ],
    "links": [
      {
        "label": "Early-phase oncology research services",
        "url": "https://www.syneoshealth.com/therapeutic-depth/oncology-and-hematology/early-phase-oncology-cro"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.syneoshealth.com/clinical-corporate-careers/locations"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  }
];
