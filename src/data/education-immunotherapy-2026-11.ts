import type { TermInput } from "@/lib/schema";

// Product, route, antigen and immune-response evidence remain separate.
export const educationImmunotherapy202611Terms: TermInput[] = [
  {
    "kind": "term",
    "id": "intratumoral-immunotherapy",
    "name": "Intratumoral immunotherapy",
    "aka": [
      "Intratumoural immunotherapy",
      "Intralesional immunotherapy"
    ],
    "category": "Immunology",
    "tldr": "Intratumoral immunotherapy delivers an immune-directed treatment within a tumour. Local effects, immune responses and control of other lesions need separate evidence.",
    "summary": "Intratumoral describes a route into a tumour, while immunotherapy describes the intended immune-directed action. Products, injection methods and accompanying treatments differ. A lesion-based method needs an identified safely accessible site; local delivery does not guarantee confined exposure or systemic safety.\n\nAn in-situ vaccination strategy is one possible use of local tumour material, rather than a synonym for every injection. Evidence must distinguish injected-lesion changes, controlled immune assays, uninjected-lesion outcomes and the whole regimen’s benefits and harms.",
    "asOf": "2026-11-12",
    "notes": [
      "Intratumoral means within a tumour; intralesional means within a lesion. Intratumoral immunotherapy combines a route with an immune-directed treatment purpose. The name does not identify the substance, and a locally injected cytotoxic drug need not be immunotherapy. An in-situ vaccination strategy seeks useful immune learning from material in the body; it is not a synonym for every injection. Local-material and learning analogies leave direct drug effects and procedure risks unresolved.",
      "A lesion-based injection needs an identified site that can be reached safely by the specified method. The accessible lesion may not represent every other tumour site. Entry of a needle does not establish uniform distribution, confined exposure or systemic safety. Recruitment or activation of presenting cells, antigen collection and priming can be investigated, while travel to another lesion, natural recognition and sustained function remain separate questions. Inflammation, local injury, infection and systemic effects depend on the product and procedure.",
      "Hammerich's 2019 report studied a particular strategy in indolent non-Hodgkin lymphoma: Flt3 ligand, low-dose radiation and the TLR3 agonist poly-ICLC. NCT01976585 specifies intratumoral Flt3 ligand and poly-ICLC with low-dose radiotherapy. It does not make every injected immune agent the same intervention. Marabelle's 2018 paper is an expert terminology and reporting recommendation, rather than a trial establishing efficacy of the class.",
      "Keep three measurements separate. Changes in size or tissue at the injected lesion show local observations. Controlled assays of antigen-reactive cells ask an immune-response question but leave natural recognition and function elsewhere unresolved. Changes at uninjected lesions ask another question, while the injection's added effect and longer-term patient benefit need a suitable comparison. Report each component's route and serial injected and uninjected lesion results. An uninjected lesion can still receive systemic co-treatment, so it need not be untreated.",
      "The U.S. Imlygic label specifies talimogene laherparepvec for local treatment of unresectable cutaneous, subcutaneous and nodal melanoma lesions recurrent after initial surgery. It states that improved overall survival and an effect on visceral metastases have not been shown. A local melanoma indication does not establish whole-body benefit or a breast-cancer indication. Intralesional administration also does not remove the label's infection, wound and other product-specific precautions.",
      "In a fictional study, the injected lesion shrinks, a controlled immune assay becomes positive and a separate lesion stays unchanged. The observations establish local and assay activity under their stated definitions, without demonstrating distant control. The result also does not establish that no immune-learning event occurred. Testing naturally presenting targets, relevant function, later outcomes and harms addresses additional questions.",
      "For radiation, an abscopal effect describes an observation outside the irradiated field. After an injection, describe an uninjected-lesion response and name concurrent treatments before attributing it to the injection or to immunity. Marabelle's expert panel specifically distinguished injected from noninjected lesions because systemic co-treatment can expose both. A combination's name alone does not reveal which component was injected.",

  "Read the component list before interpreting a combination. Intratumoral means inside a tumour and intravenous means into a vein; an accompanying checkpoint antibody may have either route according to the protocol. Record the injected material and lesion, every systemic drug and its route, and any radiation or ablation. Electroporation uses electrical pulses to support entry into cells; the injected gene payload and electrical delivery are separate intervention components. Track lesions whose injection status changes over time. Product manufacture, dosing procedures, monitoring and subsequent surgery or care belong in the study plan; a registry listing establishes neither benefit, local availability nor eligibility. DCIS, invasive breast cancer and melanoma are different populations, and a preoperative pathological response is not a survival endpoint.",
  "In an invented single-arm study, twelve people each have an injected and an uninjected lesion, and all receive a systemic drug. At the stated assessment, injected-lesion responses occur in eight, uninjected-lesion responses in two and a defined blood immune-assay response in five. Each denominator is twelve, but participants can overlap: adding the counts to claim fifteen responders is invalid. These lesion counts do not provide the target-lesion, non-target and new-lesion information needed for a formal patient response category. Even all three observations in one person would not isolate the injection's contribution. Compare the combination with the same systemic treatment without the injected intervention, retaining population, endpoints, assessment timing, harms and appropriate control or blinding procedures.",
],
    "related": [
      "in-situ-vaccination",
      "oncolytic-virus",
      "talimogene-laherparepvec",
      "itrecist",
      "abscopal-effect",
      "cytokine-therapy",
      "vaccine-adjuvants",
      "checkpoint-inhibitor"
    ],
    "links": [
      {
        "label": "Marabelle et al.: intratumoral terminology and reporting (2018)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30295695/"
      },
      {
        "label": "Hammerich et al.: defined lymphoma in-situ regimen and mouse combination evidence (2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30962585/"
      },
      {
        "label": "NCT01976585: Flt3 ligand, poly-ICLC and low-dose radiation",
        "url": "https://clinicaltrials.gov/study/NCT01976585"
      },
      {
        "label": "FDA Imlygic prescribing information: local indication and limitations",
        "url": "https://www.fda.gov/media/94129/download"
      },
      {
        "label": "Ott et al.: separate peptide, processing and tumour-recognition assays (2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
      }
    ,
{"label":"Daud et al.: defined human plasmid injection and electrical-pulse delivery study (2008)","url":"https://pubmed.ncbi.nlm.nih.gov/19029422/"},
]
  },
  {
    "kind": "term",
    "id": "vaccine-adjuvants",
    "name": "Vaccine adjuvants",
    "aka": [
      "Vaccine adjuvant",
      "Immune adjuvants"
    ],
    "category": "Immunology",
    "tldr": "A vaccine adjuvant is an ingredient intended to support an immune response. Its effects depend on the antigen, formulation and exposure; more inflammation does not establish cancer benefit.",
    "summary": "Vaccine adjuvants support the immune context in which antigen is encountered. Their actions can involve different sensing, recruitment, antigen-availability and activation pathways. Antigen specificity, delivery, useful priming and tumour control remain distinct questions.\n\nThe ingredient meaning differs from adjuvant cancer treatment after the main treatment. An adjuvant’s contribution needs a suitable comparison, and immune assay responses, clinical outcomes and harms need separate measurement.",
    "asOf": "2026-11-12",
    "notes": [
      "A vaccine adjuvant is an ingredient intended to support an immune response to vaccine antigen. In a topic-and-teaching-context analogy, antigen supplies a possible target while the adjuvant changes the context; it does not choose a mature T cell's receptor specificity. Ingredients can affect recruitment, antigen availability, activation and supporting signals through different pathways. An antigen-acquisition diagram with one example sensor and a later priming encounter is simplified: antigen and context have distinct jobs, adjuvants can act on other cells, and a useful response still needs testing.",
      "Mata-Haro's 2007 experiments studied monophosphoryl lipid A, an LPS-derived TLR4 agonist. In mice, its lower inflammatory toxicity relative to LPS was associated with biased TRIF signalling while retaining adjuvant activity. This is a defined molecule, comparison and model. It does not establish a universal safe amount, route-independent safety or a rule that more innate stimulation improves human cancer outcomes.",
      "Delivery and adjuvant activity can overlap but answer different questions. Material entering a cell does not establish useful priming, and a lipid carrier's immune effects depend on its composition, payload, route and exposure. Recognition of antigen, entry into tumour tissue, useful function and safety remain separate requirements. Experience with an ingredient in an infection-prevention vaccine does not by itself establish efficacy in cancer treatment.",
      "Ott's personal melanoma vaccine combined selected long peptides with poly-ICLC, a stabilised synthetic double-stranded RNA immune stimulus. The study's antigen-reactive responses concern that package. There was no randomised estimate of the adjuvant's independent contribution, so the result cannot determine what the same peptides would have done without it or rank every alternative adjuvant.",
      "Hailemichael's 2013 mouse melanoma experiments found that a persistent short-gp100-peptide depot in incomplete Freund's adjuvant could draw vaccine-reactive T cells to the vaccination site, with dysfunction and deletion. A nonpersisting formulation shifted localisation toward tumours under the tested conditions. The study also found less sequestration and different activity with a longer peptide in the depot formulation. Persistence is therefore not automatically better, but these experiments do not show that every depot adjuvant fails in humans.",
      "Assess presenting-cell activation, antigen-specific antibody or T-cell responses, persistence and harms with the cell population, units, background controls and sampling time stated. To isolate an adjuvant's contribution, use suitable comparisons with the same antigen and relevant conditions. Changing antigen, carrier and adjuvant together measures a package; it cannot assign the result to one ingredient. Clinical tumour outcomes require separate evidence from an immune assay.",
      "A vaccine adjuvant is an immune-supporting ingredient, while adjuvant cancer treatment is given after the main treatment. Redness, fever or a high cytokine signal is not proof of useful antigen-specific immunity. A larger measured response may involve different cells, durability and harms, so neither more inflammation nor more stimulation is an automatic success criterion.",
      "In a fictional comparison, formulations A and B contain the same antigen. A causes more redness; B gives a larger controlled antigen-specific assay response. A has a stronger observed local reaction and B a stronger response under the assay's definition, but neither result establishes cancer control. Check route, sampling, controls, persistence and harms, then the appropriate clinical outcomes, before assigning a benefit to an ingredient."
    ],
    "related": [
      "vaccines-and-oncolytic-viruses",
      "neoantigen-mrna-vaccine",
      "shared-antigen-vaccine",
      "in-situ-vaccination",
      "intratumoral-immunotherapy",
      "cytokine-therapy",
      "dendritic-cell-cross-presentation"
    ],
    "links": [
      {
        "label": "CDC: adjuvant ingredients and local/systemic reactions",
        "url": "https://www.cdc.gov/vaccine-safety/about/adjuvants.html"
      },
      {
        "label": "Mata-Haro et al.: MPLA, TLR4 and TRIF-biased signalling in mice (2007)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17569868/"
      },
      {
        "label": "Caskey et al.: stabilised synthetic double-stranded RNA in human volunteers (2011)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22065672/"
      },
      {
        "label": "Ott et al.: long peptides with poly-ICLC in melanoma (2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
      },
      {
        "label": "Hailemichael et al.: persistent short-peptide depots in mouse melanoma (2013)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23455713/"
      }
    ]
  }
];
