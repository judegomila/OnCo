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
      "Company location comes from the corporate-headquarters address in its current office directory."
    ],
    "links": [
      {
        "label": "Early-phase oncology research services",
        "url": "https://www.syneoshealth.com/therapeutic-depth/oncology-and-hematology/early-phase-oncology-cro"
      },
      {
        "label": "Official location evidence",
        "url": "https://www.syneoshealth.com/office-locations"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "4g-clinical",
    "name": "4G Clinical",
    "hq": "Wellesley, MA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.4gclinical.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical-trial supply and randomisation software with an early-phase oncology use case.",
    "summary": "4G Clinical’s Prancer platform handles study randomisation and trial supplies. Its technology page describes support for dose escalation and expansion in early-phase oncology studies.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.4gclinical.com/technology"
      },
      {
        "label": "Published company location",
        "url": "https://www.4gclinical.com/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "alphasense",
    "name": "AlphaSense",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.alpha-sense.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research and market intelligence software used by an oncology drug developer.",
    "summary": "AlphaSense’s published customer story describes how 3T Biosciences, a cancer immunotherapy developer, uses the platform to find and organise competitive and scientific information. It is an example of research support, not treatment effectiveness.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.alpha-sense.com/resources/case-studies/3t/"
      },
      {
        "label": "Published company location",
        "url": "https://www.alpha-sense.com/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "automata",
    "name": "Automata",
    "hq": "London, United Kingdom",
    "country": "GB",
    "companyType": "devices",
    "website": "https://www.automata.tech/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Lab automation used in a hospital’s genomic testing workflow for cancer patients.",
    "summary": "Automata worked with the Royal Marsden on robotic automation for its genomic testing laboratory. The company describes an automated workflow for processing samples for genomic tests, not a new diagnostic test or a claim about test accuracy.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.automata.tech/company-news/uks-first-robotic-genomic-testing-facility-for-cancer-patients"
      },
      {
        "label": "Published company location",
        "url": "https://www.automata.tech/about-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "axtria",
    "name": "Axtria",
    "hq": "Berkeley Heights, NJ",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.axtria.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Life-sciences analytics that include analysis of oncology patient pathways.",
    "summary": "An Axtria case study describes analysing patient flows for an unnamed oncology drug company to inform its commercial planning. The case shows a disclosed use of the service, not evidence of improved patient outcomes.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.axtria.com/customer-success-stories/patient-flow-analysis-for-a-global-oncology-leader"
      },
      {
        "label": "Published company location",
        "url": "https://www.axtria.com/contact-us/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "boston-consulting-group",
    "name": "Boston Consulting Group",
    "hq": "Boston, MA",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://www.bcg.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Consulting firm with an oncology strategy practice.",
    "summary": "Boston Consulting Group offers oncology consulting on research portfolios, commercialisation and health-system delivery. This record is about the consultancy, not bacillus Calmette–Guérin, the therapy used in bladder cancer.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.bcg.com/industries/health-care/oncology-solutions"
      },
      {
        "label": "Published company location",
        "url": "https://www.bcg.com/offices/boston"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ],
    "aka": [
      "BCG (consultancy)"
    ]
  },
  {
    "kind": "company",
    "id": "benchling",
    "name": "Benchling",
    "hq": "San Francisco, CA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.benchling.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research informatics used by the cancer immunotherapy developer Agenus.",
    "summary": "Benchling’s Agenus case study describes how the developer uses Benchling to share and organise laboratory research across teams developing cancer immunotherapies. That use is not evidence of efficacy for a candidate.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.benchling.com/customer-stories/agenus-building-global-informatics-infrastructure"
      },
      {
        "label": "Published company location",
        "url": "https://www.benchling.com/terms-of-service"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "biogeometry",
    "name": "BioGeometry",
    "hq": "Beijing, China",
    "country": "CN",
    "companyType": "biotech",
    "website": "https://www.biogeom.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Drug discovery company with cancer programmes listed in its pipeline.",
    "summary": "BioGeometry’s published pipeline lists research programmes for prostate and gastrointestinal cancers. The listing establishes the company’s research focus; no treatment benefit or regulatory status is inferred.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.biogeom.com/pipeline/"
      },
      {
        "label": "Published company location",
        "url": "https://www.biogeom.com/contact-us/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "biossil",
    "name": "Biossil",
    "hq": "Toronto, Ontario",
    "country": "CA",
    "companyType": "biotech",
    "website": "https://www.biossil.co/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Drug developer named in an agreement to acquire the investigational cancer drug mitazalimab.",
    "summary": "Alligator Bioscience announced an agreement to sell mitazalimab to Biossil. Its announcement describes the investigational CD40-targeting antibody in the context of pancreatic cancer research. The transaction announcement does not establish approval or treatment efficacy.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://alligatorbioscience.se/en/mfn_news/alligator-bioscience-signs-agreement-to-sell-mitazalimab-to-biossil/"
      },
      {
        "label": "Published company location",
        "url": "https://www.biossil.co/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "cori-clinical",
    "name": "Cori Clinical",
    "hq": "London, United Kingdom",
    "country": "GB",
    "companyType": "ai-software",
    "website": "https://www.cori-clinical.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical-trial planning software used by an Erasmus MC neuro-oncology research team.",
    "summary": "Cori Clinical describes Erasmus MC using the platform to help draft a protocol and investigator brochure for a neuro-oncology study. This is a reported use in trial preparation, not an assessment of the resulting study or its findings.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.cori-clinical.com/news/cori-clinical-raises-4m-seed-round"
      },
      {
        "label": "Published company location",
        "url": "https://find-and-update.company-information.service.gov.uk/company/16115688"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "dotmatics",
    "name": "Dotmatics",
    "hq": "Boston, MA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.dotmatics.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research software with a flow cytometry analysis workflow for oncology.",
    "summary": "Dotmatics documents a cancer research use case for the flow cytometry workflow in its Luma software. The case concerns organising experiment data and analysis, not diagnosing cancer or establishing a treatment effect.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.dotmatics.com/case-studies/modernizing-flow-cytometry-analysis-to-accelerate-oncology-r-and-d"
      },
      {
        "label": "Published company location",
        "url": "https://www.dotmatics.com/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "florence-healthcare",
    "name": "Florence Healthcare",
    "hq": "Atlanta, GA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.florencehc.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Electronic consent and trial-document software used at City of Hope.",
    "summary": "Florence Healthcare describes City of Hope moving consent and supporting regulatory paperwork from physical binders to electronic workflows. The example concerns research operations at the cancer centre, not a change in care outcomes.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.florencehc.com/case-study/city-of-hope-and-florence-healthcare/"
      },
      {
        "label": "Published company location",
        "url": "https://www.florencehc.com/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "institutions": [
      "city-of-hope"
    ]
  },
  {
    "kind": "company",
    "id": "h1-health",
    "name": "H1",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://h1.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Health data company working with Memorial Sloan Kettering on specialist referrals.",
    "summary": "H1 and Memorial Sloan Kettering describe a partnership that uses clinician data to support referrals to specialised cancer care. The partnership is not evidence that the platform improves survival or other patient outcomes.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://h1.com/resources/how-h1-partners-with-memorial-sloan-kettering-cancer-center/"
      },
      {
        "label": "Published company location",
        "url": "https://h1.com/privacy-policy/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ],
    "aka": [
      "H1 Insights"
    ],
    "institutions": [
      "mskcc"
    ]
  },
  {
    "kind": "company",
    "id": "lek-consulting",
    "name": "L.E.K. Consulting",
    "hq": "Boston, MA",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://www.lek.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Consulting services that include evidence and reimbursement planning for oncology products.",
    "summary": "L.E.K. Consulting describes work to organise an oncology product’s evidence and plan engagement with reimbursement stakeholders. This is a market access service, not a coverage decision or assessment of the product’s clinical benefit.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.lek.com/insights/life-sciences-pharma/value-story-and-cross-stakeholder-action-plan-oncology-reimbursement"
      },
      {
        "label": "Published company location",
        "url": "https://www.lek.com/global-offices"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "lumanity",
    "name": "Lumanity",
    "hq": "Morristown, NJ",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://lumanity.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Evidence and commercial strategy services for oncology drug development.",
    "summary": "Lumanity offers oncology advisory services, including indication prioritisation and evidence planning. The company lists regional headquarters in the United States and the United Kingdom; the location shown here is its North American headquarters.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://lumanity.com/oncology/"
      },
      {
        "label": "Published company location",
        "url": "https://lumanity.com/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "metis-techbio",
    "name": "METiS TechBio",
    "hq": "Beijing, China",
    "country": "CN",
    "companyType": "biotech",
    "website": "https://www.metistechbio.com/en/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Drug developer whose published pipeline includes oncology.",
    "summary": "METiS TechBio develops drug delivery technology and lists oncology alongside other therapeutic areas in its published pipeline. A pipeline entry is not evidence of clinical effectiveness or regulatory approval.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.metistechbio.com/en/ywgx.html"
      },
      {
        "label": "Published company location",
        "url": "https://www.metistechbio.com/en/contact.html"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "nested-knowledge",
    "name": "Nested Knowledge",
    "hq": "Saint Paul, MN",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://nested-knowledge.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Evidence review software used in a set of rapid oncology reviews.",
    "summary": "Nested Knowledge describes an unnamed team using its platform to screen and extract research across four oncology areas. The report illustrates a research workflow, not an independent test of the accuracy or completeness of the reviews.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://about.nested-knowledge.com/2025/11/28/13-rapid-reviews-in-record-time-inside-the-ai-powered-case-study/"
      },
      {
        "label": "Published company location",
        "url": "https://about.nested-knowledge.com/terms-of-use/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "patsnap",
    "name": "Patsnap",
    "hq": "London, United Kingdom",
    "country": "GB",
    "companyType": "ai-software",
    "website": "https://www.patsnap.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Patent analysis software used by the oncology developer Vyriad.",
    "summary": "Patsnap’s customer story describes how Vyriad searches patents and tracks scientific and competitive developments for its cancer research programmes. This is an example of research support, not evidence about a treatment.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.patsnap.com/customers/vyriad/"
      },
      {
        "label": "Published company location",
        "url": "https://www.patsnap.com/contact-us/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ],
    "companies": [
      "vyriad"
    ]
  },
  {
    "kind": "company",
    "id": "rivia",
    "name": "Rivia",
    "hq": "Zurich, Switzerland",
    "country": "CH",
    "companyType": "ai-software",
    "website": "https://www.rivia.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical trial data software used by the cancer vaccine developer Scancell.",
    "summary": "Rivia describes how Scancell uses its platform to bring together clinical trial data and monitor investigational vaccine studies. The case concerns trial operations, not whether the vaccines work.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.rivia.com/success-stories/driving-operational-excellence-in-immuno-oncology-how-scancell-uses-rivia-to-power-real-time-study-execution"
      },
      {
        "label": "Published company location",
        "url": "https://www.rivia.com/about"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "companies": [
      "scancell"
    ]
  },
  {
    "kind": "company",
    "id": "trinity-life-sciences",
    "name": "Trinity Life Sciences",
    "hq": "Waltham, MA",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://trinitylifesciences.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Life-sciences consulting and analytics with a community oncology data collaboration.",
    "summary": "Trinity Life Sciences and Ontada announced a data collaboration to support analyses of care and treatment patterns in community oncology. The collaboration supports commercial and research questions; it does not establish any drug’s effectiveness.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://trinitylifesciences.com/company/press-releases/expands-data-partnership-applications-oncology/"
      },
      {
        "label": "Published company location",
        "url": "https://trinitylifesciences.com/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "vibe-bio",
    "name": "Vibe Bio",
    "hq": "Boston, MA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://vibebio.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Drug development research software used to search for potential sarcoma programmes.",
    "summary": "Vibe Bio describes using its research tools in a collaboration with Incite to assess existing programmes for possible relevance to sarcoma. A search or prioritisation result is not evidence of patient benefit.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://vibebio.com/resources/incite-vibe-bio-partner-accelerate-sarcoma-drug-search-eval/"
      },
      {
        "label": "Published company location",
        "url": "https://vibebio.com/privacy-policy/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "zs",
    "name": "ZS",
    "hq": "Evanston, IL",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://www.zs.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Consulting and analytics used to compare tumour types for an investigational oncology drug.",
    "summary": "ZS describes helping an unnamed company prioritise tumour types for an antibody-drug conjugate research programme. The case documents how the service was used for research planning, not efficacy of the proposed drug.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.zs.com/insights/intellgencia-ai-oncology-segmentation-biopharma-investment"
      },
      {
        "label": "Published company location",
        "url": "https://www.zs.com/careers/where-we-work/north-america/united-states"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "nphase",
    "name": "nPhase (REDCap Cloud)",
    "hq": "Atlantic Beach, FL",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.nphase.ai/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical research data software used by a paediatric oncology consortium.",
    "summary": "A REDCap Cloud case study describes its use for electronic data capture in cancer studies run by the Pediatric Oncology Experimental Therapeutics Investigators’ Consortium. REDCap Cloud is the company’s commercial platform, not the academic REDCap project.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.redcapcloud.com/resources/innovative-treatments-for-pediatric-cancer/"
      },
      {
        "label": "Published company location",
        "url": "https://www.redcapcloud.com/privacy-policy/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ],
    "aka": [
      "REDCap Cloud"
    ]
  },
  {
    "kind": "company",
    "id": "amazon-web-services",
    "name": "Amazon Web Services",
    "hq": "United States",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://aws.amazon.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Cloud computing services used by Caris Life Sciences for cancer research.",
    "summary": "Amazon Web Services describes Caris using AWS Batch to run an RNA sequencing analysis pipeline for cancer research. This is cloud infrastructure used in an oncology workflow, not a cancer test or treatment.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://aws.amazon.com/solutions/case-studies/caris-life-sciences-case-study/"
      },
      {
        "label": "Published company location",
        "url": "https://www.aboutamazon.com/workplace/corporate-offices"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "aka": [
      "AWS"
    ]
  },
  {
    "kind": "company",
    "id": "adaptyv-bio",
    "name": "Adaptyv Bio",
    "hq": "Lausanne, Switzerland",
    "country": "CH",
    "companyType": "cro-services",
    "website": "https://www.adaptyvbio.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Automated laboratory services used in a cancer drug research challenge.",
    "summary": "Adaptyv Bio described its cancer-focused research challenge and experimental assessment of submissions in its automated laboratory. This was a research programme, not a clinical evaluation of a cancer medicine.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://adaptyvbio.substack.com/p/crowdsourcing-better-cancer-drugs"
      },
      {
        "label": "Published company location",
        "url": "https://www.adaptyvbio.com/blog/series-a"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "pharmaforceiq",
    "name": "PharmaForceIQ (Aktana)",
    "hq": "Miami, FL",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://pharmaforceiq.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Commercial analytics provider whose acquired Aktana business supported an oncology drug launch.",
    "summary": "PharmaForceIQ acquired Aktana. A published case describes Aktana using its software to support outreach for a new indication of an unnamed oncology drug. This is a marketing workflow, not a clinical outcome.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://pharmaforceiq.com/accelerated-sales-growth-new-indication-launch/"
      },
      {
        "label": "Published company location",
        "url": "https://pharmaforceiq.com/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "aka": [
      "Aktana",
      "PharmaForceIQ"
    ]
  },
  {
    "kind": "company",
    "id": "arisglobal",
    "name": "ArisGlobal",
    "hq": "Waltham, MA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.arisglobal.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Drug safety monitoring software selected by a manufacturer of oncology medicines.",
    "summary": "ArisGlobal announced that medac selected its LifeSphere platform for pharmacovigilance. Medac's business includes oncology and other therapeutic areas. The announcement does not identify a monitored oncology product or establish clinical benefit.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.arisglobal.com/media/press-release/medac-selects-lifesphere-safety/"
      },
      {
        "label": "Published company location",
        "url": "https://www.arisglobal.com/contact-us/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "dassault-systemes",
    "name": "Dassault Systèmes (BIOVIA)",
    "hq": "Waltham, MA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.3ds.com/products/biovia",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research software division working with CDR-Life on cancer drug discovery.",
    "summary": "Dassault Systèmes announced a collaboration under which CDR-Life would use its platform, including BIOVIA software, for work on antibody-based cancer therapies. The listed location is the company’s Boston-area campus, not its global headquarters.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.3ds.com/newsroom/press-releases/dassault-systemes-and-cdr-life-collaborate-accelerate-scientific-innovation-cancer-therapies"
      },
      {
        "label": "Published company location",
        "url": "https://www.3ds.com/about/company"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ],
    "aka": [
      "BIOVIA"
    ]
  },
  {
    "kind": "company",
    "id": "doximity",
    "name": "Doximity",
    "hq": "San Francisco, CA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.doximity.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinician network with a published example of oncology communications.",
    "summary": "A Doximity case study describes distributing clinical-trial information to clinicians for an unnamed oncology brand. The example shows a communications service, not evidence of clinical effectiveness.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://marketingsolutions.doximity.info/doximity-case-study-oncology"
      },
      {
        "label": "Published company location",
        "url": "https://www.doximity.com/about/company"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "globaldata",
    "name": "GlobalData",
    "hq": "London, United Kingdom",
    "country": "GB",
    "companyType": "ai-software",
    "website": "https://www.globaldata.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Market intelligence business that publishes profiles and trial information for oncology developers.",
    "summary": "GlobalData indexes companies and development programmes, including cancer drug developers. Its Surface Oncology profile is an example of company intelligence, not an independent review of any therapy.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.globaldata.com/company-profile/surface-oncology-inc/"
      },
      {
        "label": "Published company location",
        "url": "https://www.globaldata.com/contact-us/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "indegene",
    "name": "Indegene",
    "hq": "Bengaluru, India",
    "country": "IN",
    "companyType": "cro-services",
    "website": "https://www.indegene.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Life-sciences services company with a published oncology commercial planning case.",
    "summary": "Indegene describes helping an unnamed company organise information on clinicians and patients to plan the launch of an oncology drug. This is a commercial analytics example, not evidence of health outcomes.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.indegene.com/insights/case-studies/indegene-unlocks-360-customer-insights-for-the-launch-of-an-oncology-brand"
      },
      {
        "label": "Published company location",
        "url": "https://www.indegene.com/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "inpart",
    "name": "Inpart",
    "hq": "New City, NY",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.inpart.io/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research partnering platform that has hosted a call for cancer immunotherapy research.",
    "summary": "Inpart published a partnering campaign seeking research on immunotherapies for solid tumours. The campaign is an example of research matchmaking, not a trial or a recommendation for treatment.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.inpart.io/network/challenge-campaigns/cancer-immunotherapies-to-treat-solid-tumours"
      },
      {
        "label": "Published company location",
        "url": "https://www.inpart.io/legal/terms"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "kinaxis",
    "name": "Kinaxis",
    "hq": "Ottawa, Ontario",
    "country": "CA",
    "companyType": "ai-software",
    "website": "https://www.kinaxis.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Supply-chain planning software used by a maker of an individualised cancer treatment.",
    "summary": "Kinaxis describes an unnamed customer using its software to plan an individualised cancer therapy supply chain. The example concerns operations, not evidence for the therapy itself.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.kinaxis.com/sites/default/files/resources/case-study-focused-on-the-cure-kinaxis.pdf"
      },
      {
        "label": "Published company location",
        "url": "https://www.kinaxis.com/en/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "mindwalk",
    "name": "MindWalk",
    "hq": "Austin, TX",
    "country": "US",
    "companyType": "biotech",
    "website": "https://www.mindwalkai.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Antibody research company, formerly ImmunoPrecise Antibodies, with published cancer research.",
    "summary": "MindWalk’s research page lists publications on antibody formats studied for anti-tumour effects. Its published research does not establish approval or effectiveness for a product.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.mindwalkai.com/research-publications"
      },
      {
        "label": "Published company location",
        "url": "https://www.mindwalkai.com/company"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "aka": [
      "ImmunoPrecise Antibodies"
    ]
  },
  {
    "kind": "company",
    "id": "peptone",
    "name": "Peptone",
    "hq": "London, United Kingdom",
    "country": "GB",
    "companyType": "biotech",
    "website": "https://peptone.io/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Drug discovery company with a prostate cancer research programme.",
    "summary": "Peptone’s pipeline lists PEP-5089 as an investigational androgen receptor N-terminal domain antagonist for metastatic castration-resistant prostate cancer. Its pipeline lists the programme as preclinical development, not an approved therapy.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://peptone.io/pipeline/"
      },
      {
        "label": "Published company location",
        "url": "https://peptone.io/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "sas-institute",
    "name": "SAS Institute",
    "hq": "Cary, NC",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.sas.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Analytics software used by a cancer-focused clinical research organisation.",
    "summary": "SAS describes SMS-oncology using its statistical software for oncology trial analysis and reporting. This is an example of software use by a clinical research organisation, not a claim about a treatment.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.sas.com/content/dam/SAS/en_gb/doc/CustomerStories/sms-oncology-case-study.pdf"
      },
      {
        "label": "Published company location",
        "url": "https://www.sas.com/en_us/contact.html"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "aka": [
      "SAS"
    ]
  },
  {
    "kind": "company",
    "id": "tecan",
    "name": "Tecan",
    "hq": "Männedorf, Switzerland",
    "country": "CH",
    "companyType": "devices",
    "website": "https://www.tecan.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Laboratory automation equipment used in cancer research.",
    "summary": "Tecan describes supplying laboratory automation and related tools for cancer drug discovery, including genomics, protein and sample studies. The company’s use examples do not establish diagnostic accuracy or benefit from a therapy.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.tecanannualreport.com/annual-report-2022/the-stories/drugs-discovery-and-development/"
      },
      {
        "label": "Published company location",
        "url": "https://www.tecan.com/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "a-tune",
    "name": "a-tune software",
    "hq": "Darmstadt, Germany",
    "country": "DE",
    "companyType": "ai-software",
    "website": "https://www.a-tune.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research facility software selected by the Gustave Roussy cancer centre.",
    "summary": "a-tune announced that Gustave Roussy selected its tick@lab software to manage a research animal facility. This example concerns research administration, not clinical use or treatment outcomes.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.a-tune.com/news/institut-gustave-roussy-leading-european-cancer-centre-and-biggest-player-of-the-paris-sud-network-chooses-ticklab-for-the-management-of-its-animal-facility/"
      },
      {
        "label": "Published company location",
        "url": "https://www.a-tune.com/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "converge-bio",
    "name": "Converge Bio",
    "hq": "Boston, MA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://converge-bio.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research software with a published preclinical case involving an oncology antibody.",
    "summary": "In its own press release, Converge Bio describes applying ConvergeAB to a marketed oncology antibody and testing modified candidates in the laboratory. The reported experiment does not establish a clinical improvement or a new approved medicine.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.prnewswire.com/news-releases/converge-bio-uses-convergeab-to-improve-popular-cancer-treatment-with-a-single-prompt-302761387.html"
      },
      {
        "label": "Published company location",
        "url": "https://www.prnewswire.com/news-releases/converge-bio-uses-convergeab-to-improve-popular-cancer-treatment-with-a-single-prompt-302761387.html"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "idbs",
    "name": "IDBS",
    "hq": "Woking, United Kingdom",
    "country": "GB",
    "companyType": "ai-software",
    "website": "https://www.idbs.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Laboratory data management software used by Celyad Oncology.",
    "summary": "IDBS reports that Celyad Oncology selected its E-WorkBook software to organise and search research data. This is a laboratory data management example, not evidence for any therapy.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.idbs.com/customers/customer-success-stories/"
      },
      {
        "label": "Published company location",
        "url": "https://www.idbs.com/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "madeai",
    "name": "MadeAi",
    "hq": "Cambridge, MA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://madeai.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research and analytics provider with a published oncology model development example.",
    "summary": "A MadeAi case study credits CapeStart with helping a digital health company develop a research classifier for responses to immune checkpoint inhibitors. It does not establish that the classifier has been validated for clinical decisions. The listed location is CapeStart’s published headquarters.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://madeai.com/resources/case-studies/developing-an-ai-classifier-to-support-oncology-decision-making/"
      },
      {
        "label": "Published company location",
        "url": "https://capestart.com/company/about-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "mastercontrol",
    "name": "MasterControl",
    "hq": "Salt Lake City, UT",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.mastercontrol.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Manufacturing and quality management software used by a cancer therapy manufacturer.",
    "summary": "MasterControl describes Dendreon using its software for manufacturing records and quality workflows. The case study concerns production operations, not the cancer treatment’s effectiveness.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.mastercontrol.com/uk/resource-center/case-studies/mastercontrol-case-study-dendreon/"
      },
      {
        "label": "Published company location",
        "url": "https://www.mastercontrol.com/uk/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "n-side",
    "name": "N-SIDE",
    "hq": "Louvain-la-Neuve, Belgium",
    "country": "BE",
    "companyType": "cro-services",
    "website": "https://www.n-side.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical supply services used to plan a cancer trial programme.",
    "summary": "N-SIDE describes helping Merck plan clinical supplies across three trials in an oncology programme. The case identifies trial operations support, not clinical outcomes.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.n-side.com/en/insights/clinical-trial-optimization-at-protocol-design/"
      },
      {
        "label": "Published company location",
        "url": "https://www.n-side.com/en/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "reflector-bio",
    "name": "Reflector Bio",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://reflector.bio/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Drug screening software with a published case involving a cancer medicine.",
    "summary": "Reflector Bio describes a computational case study on the activity of ibrutinib across cancer cell lines. The study illustrates a use of its screening software; the company’s predictions are not clinical evidence.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://reflector.bio/case-studies/"
      },
      {
        "label": "Published company location",
        "url": "https://reflector.bio/contact/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "sorcero",
    "name": "Sorcero",
    "hq": "Washington, DC",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.sorcero.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Medical information software with a published example of oncology literature monitoring.",
    "summary": "Sorcero describes an unnamed pharmaceutical company using its software to track research publications for its oncology medical affairs team. It is a literature workflow, not evidence that a drug works.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.sorcero.com/transforming-global-literature-monitoring-with-medically-tuned-ai"
      },
      {
        "label": "Published company location",
        "url": "https://www.sorcero.com/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "sparta-systems",
    "name": "Sparta Systems (TrackWise)",
    "hq": "Hamilton, NJ",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.spartasystems.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Quality management software used by a pharmaceutical company with an oncology portfolio.",
    "summary": "A Sparta Systems case study describes Arbor Pharmaceuticals using TrackWise to manage quality records across its business, which includes cancer medicines. The case is about quality operations, not clinical performance.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://hcenews.honeywell.com/rs/hce/images/ArborCaseStudy_0622.pdf"
      },
      {
        "label": "Published company location",
        "url": "https://www.honeywell.com/us/en/process-automation-technology/solutions/trackwise/support/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "aka": [
      "TrackWise"
    ]
  },
  {
    "kind": "company",
    "id": "suvoda",
    "name": "Suvoda",
    "hq": "Conshohocken, PA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.suvoda.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical trial software for randomisation, supply and outcome collection, including cancer studies.",
    "summary": "Suvoda’s oncology materials describe use of interactive response technology and electronic outcome assessment in cancer trials. These systems support trial operations and data collection; they are not treatment evidence.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.suvoda.com/insights/case-study/irt-ecoa-oncology-clinical-trials-whitepaper"
      },
      {
        "label": "Published company location",
        "url": "https://www.suvoda.com/suvoda-product-privacy-policy-and-terms-of-use"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "tikamobile",
    "name": "TikaMobile",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.tikamobile.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Commercial software with a published oncology analytics use case.",
    "summary": "TikaMobile describes use of TikaPharma to examine oncology patient journeys and biomarkers for commercial planning. That example does not validate a biomarker or establish patient benefit.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.tikamobile.com/case-studies"
      },
      {
        "label": "Published company location",
        "url": "https://www.tikamobile.com/contact"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "radical-numerics",
    "name": "Radical Numerics",
    "hq": "San Francisco, CA",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.radicalnumerics.ai/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Research software company that lists investigational cancer diagnostics and vaccine design applications.",
    "summary": "Radical Numerics describes oncology applications for its Omnii models, including blood-based signal analysis and personalised cancer vaccine research. These are company-described research applications, not established tests or therapies.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.radicalnumerics.ai/radical-advances"
      },
      {
        "label": "Published company location",
        "url": "https://www.radicalnumerics.ai/join-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "citeline",
    "name": "Citeline",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://citeline.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical trial intelligence used to assess recruitment problems in a cancer study.",
    "summary": "Citeline describes working with Biorasi to review site selection and protocol barriers in a Phase III oncology study. The case concerns trial feasibility and not study results. Citeline is a Norstella company.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://citeline.com/resources/biorasi-case-study/"
      },
      {
        "label": "Published company location",
        "url": "https://citeline.com/media-resources/"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ]
  },
  {
    "kind": "company",
    "id": "hamilton-company",
    "name": "Hamilton Company",
    "hq": "Reno, NV",
    "country": "US",
    "companyType": "devices",
    "website": "https://www.hamiltoncompany.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Laboratory automation used in sequencing workflows for precision oncology.",
    "summary": "Hamilton describes CeGaT using automated liquid handling to prepare sequencing libraries in its precision oncology work. The case documents a laboratory workflow and does not establish diagnostic benefits. Reno is one of the company’s published locations.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://download.hamiltoncompany.com/cegat"
      },
      {
        "label": "Published company location",
        "url": "https://www.hamiltoncompany.com/reno-nevada"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "mckinsey",
    "name": "McKinsey & Company",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "cro-services",
    "website": "https://www.mckinsey.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Consulting firm with a practice dedicated to oncology strategy and research.",
    "summary": "The McKinsey Cancer Center describes advisory work on oncology portfolios and research collaborations. The practice provides research and strategy services, not cancer care. The listed location is the firm’s New York office.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.mckinsey.com/industries/life-sciences/how-we-help-clients/mckinsey-cancer-center"
      },
      {
        "label": "Published company location",
        "url": "https://www.mckinsey.com/us/new-york"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "openevidence",
    "name": "OpenEvidence",
    "hq": "Miami, FL",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.openevidence.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Clinical information software partnering with Memorial Sloan Kettering on cancer genomics.",
    "summary": "Memorial Sloan Kettering announced a partnership to make its OncoKB cancer variant interpretations available through OpenEvidence and incorporate them into a clinical workflow. The announcement describes access to a knowledge resource, not independent validation of model answers or improved patient outcomes.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.mskcc.org/news-releases/mskcc-msk-and-openevidence-partner-to-advance-precision-oncology-at-point-of-care"
      },
      {
        "label": "Published company location",
        "url": "https://search.sunbiz.org/Inquiry/CorporationSearch/GetDocument?aggregateId=forp-f25000004100-8c5bf3d6-79b9-414a-97ad-68061667f36f&formatType=PDF&transactionId=f25000004100-9dfba78c-ac30-40ff-9ede-9772ef9ed30a"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "institutions": [
      "mskcc"
    ],
    "related": [
      "oncokb"
    ]
  },
  {
    "kind": "company",
    "id": "opentrons",
    "name": "Opentrons",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "devices",
    "website": "https://opentrons.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Lab automation equipment used in a published demonstration involving cancer cell models.",
    "summary": "An Opentrons application poster describes using its OT-2 liquid handling robot to help measure viability in three-dimensional cancer cell models. The work is a laboratory demonstration, not validation of a clinical test.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://insights.opentrons.com/hubfs/App%20Notes/Automated%20Technique%20to%20Examine%203D%20Cancer%20Spheroids_SLAS%202024_Poster.pdf"
      },
      {
        "label": "Published company location",
        "url": "https://insights.opentrons.com/hubfs/App%20Notes/Automated%20Technique%20to%20Examine%203D%20Cancer%20Spheroids_SLAS%202024_Poster.pdf"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ],
    "aka": [
      "Opentrons Labworks"
    ]
  },
  {
    "kind": "company",
    "id": "solstice-health",
    "name": "Solstice Health",
    "hq": "New York, NY",
    "country": "US",
    "companyType": "ai-software",
    "website": "https://www.solsticehealth.co/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Software for pharmaceutical communications that lists oncology among its areas.",
    "summary": "Solstice markets software that helps pharmaceutical teams prepare communications from approved materials, including for oncology. These are commercial workflows, not clinical decision support. No specific oncology customer deployment is inferred.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.solsticehealth.co/technology"
      },
      {
        "label": "Published company location",
        "url": "https://www.solsticehealth.co/privacy"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "vitroscope",
    "name": "Vitroscope",
    "hq": "Trondheim, Norway",
    "country": "NO",
    "companyType": "devices",
    "website": "https://www.vitroscope.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Living tissue research tools used in a lung cancer culture study.",
    "summary": "Vitroscope lists a collaboration examining lung cancer cells grown in laboratory cultures. The work concerns experimental models of non-small cell lung cancer, not a clinical test or treatment.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.vitroscope.com/science"
      },
      {
        "label": "Published company location",
        "url": "https://data.brreg.no/enhetsregisteret/api/enheter/922215529"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  },
  {
    "kind": "company",
    "id": "wolters-kluwer",
    "name": "Wolters Kluwer",
    "hq": "Alphen aan den Rijn, Netherlands",
    "country": "NL",
    "companyType": "media",
    "website": "https://www.wolterskluwer.com/",
    "asOf": "2026-11-25",
    "sections": [
      "drug-discovery"
    ],
    "tldr": "Publisher of UpToDate, a clinical reference that includes oncology content.",
    "summary": "Wolters Kluwer lists oncology among the specialties covered by UpToDate. The platform is a reference resource; a subscription or listing is not clinical evidence for an oncology product.",
    "links": [
      {
        "label": "Primary oncology source",
        "url": "https://www.wolterskluwer.com/en/solutions/uptodate/about/specialties"
      },
      {
        "label": "Published company location",
        "url": "https://www.wolterskluwer.com/en/contact-us"
      },
      {
        "label": "Elicit AI for Pharma market map",
        "url": "https://elicit.com/ai-for-pharma"
      }
    ],
    "notes": [
      "Location is a published office, business address or registered address, not a separately verified global headquarters."
    ]
  }
];
