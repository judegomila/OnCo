// Public education synthesis; registered by the coordinator. Source reading limits remain explicit.
import type { TermInput } from "../lib/schema";

export const educationParallelDeathMetabolism: TermInput[] = [
  {
    "id": "er-stress-and-unfolded-protein-response",
    "kind": "term",
    "name": "Endoplasmic reticulum stress and the unfolded protein response",
    "category": "Cancer biology",
    "asOf": "2026-11-09",
    "tldr": "Cells respond to strain on protein folding through several signalling branches. A response does not by itself establish cell death.",
    "summary": "The unfolded protein response has distinct outputs. IRE1-dependent processing of XBP1 RNA produces a potent transcriptional regulator; total XBP1 message and its spliced fraction are different measurements. PERK phosphorylates eIF2alpha and can reduce translation initiation. ER stress also promotes ATF6 proteolysis, releasing a fragment that acts in the nucleus. These findings come from molecular and cell experiments. Branch activity, adaptation, survival dependence and treatment benefit require separate evidence. Specify branch, timing, total protein or RNA controls and direct growth and death measurements.",
    "links": [
      {
        "label": "Primary source, PMID 11779464",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11779464/"
      },
      {
        "label": "Primary source, PMID 9930704",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9930704/"
      },
      {
        "label": "Primary source, PMID 10564271",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10564271/"
      },
      {
        "label": "Source identity and scope, PMID 22116877",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22116877/"
      },
      {
        "label": "Source identity and scope, PMID 11821395",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11821395/"
      },
      {
        "label": "Source identity and scope, PMID 24670641",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24670641/"
      }
    ],
    "notes": [
      "ER stress is an imbalance between protein-folding demand and local capacity; the unfolded protein response is an adaptation programme, not the same thing as the stress. IRE1 processes XBP1 RNA, PERK phosphorylates eIF2alpha and ATF6 processing releases a nuclear regulator. Distinct branches can alter folding capacity, incoming translation and disposal.",
      "ATF6 travels from ER to Golgi for processing; the released fragment, rather than the intact membrane-bound precursor, acts in the nucleus. Total XBP1 RNA differs from its splice-form fraction. Other kinases can phosphorylate eIF2alpha, so one phosphosite cannot identify the whole response.",
      "Specify preserved material, RNA quality, isoform-specific methods, total-protein controls, timing and identified cell populations. Splice-form fractions, processed ATF6 and defined phosphoprotein signals are different outputs. Increased XBP1 splicing with stable viable-cell counts supports a branch response, not lethal stress; measure growth and death directly and test causality independently. RNA or protein preparations and compatible tissue stains use material; functional dependence tests require viable cells. Report splice-form fractions, defined phosphosite signals or processed fragments with assay-specific controls, rather than a universal UPR-positive treatment threshold.",
      "XBP1 depletion altered tumour growth and relapse in defined triple-negative breast cancer models, with an HIF1alpha transcriptional interaction. Model findings and patient expression-signature associations do not establish universal XBP1 dependence, an assay cutoff or a treatment benefit. Successful stress adaptation can support survival."
    ]
  },
  {
    "id": "nutrient-sensing-ampk",
    "kind": "term",
    "name": "AMPK energy sensing",
    "category": "Cancer biology",
    "asOf": "2026-11-09",
    "tldr": "AMPK helps cells adjust their work to their energy supply. Slower growth and better survival can occur together.",
    "summary": "AMP-activated protein kinase responds to cellular energy state. Structural and biochemical experiments showed that ADP binding protects activating phosphorylation without the direct allosteric activation supplied by AMP. In cancer-model experiments during energy stress, AMPK supported NADPH maintenance through changes in fatty-acid metabolism and prolonged survival. Thus activation cannot be read as a universal cancer-killing signal. Preserve the model, energy conditions, timing, perturbation controls and separate measurements of growth and death. A phosphorylation signal does not establish selective drug action or patient benefit.",
    "links": [
      {
        "label": "Primary source, PMID 21399626",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21399626/"
      },
      {
        "label": "Primary source, PMID 22660331",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22660331/"
      },
      {
        "label": "Source identity and scope, PMID 16054095",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16054095/"
      },
      {
        "label": "Source identity and scope, PMID 18439900",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18439900/"
      }
    ],
    "notes": [
      "AMP-activated protein kinase is a catalytic and regulatory complex responding to energy state. AMP and ADP can protect activating phosphorylation, but AMP also supplies direct allosteric activation that ADP does not. ATP, ADP and AMP quantities and ratios are different from a phosphoprotein readout.",
      "LKB1 and a calcium-sensitive CaMKK2 route can activate AMPK in suitable systems. AMPK can phosphorylate raptor and restrain mTORC1, connecting energy supply to costly growth-related work. An AMPK phosphosite does not uniquely identify glucose deprivation or every nutrient signal.",
      "During energy stress in model experiments, AMPK preserved reducing power through altered fatty-acid metabolism and supported survival. Increased AMPK and raptor phosphorylation, slower growth and greater survival than an AMPK-deficient comparison are compatible observations. This is not a universal benefit from activating or inhibiting AMPK.",
      "Keep collection timing, preservation, total protein, antibody specificity and matched perturbations with energy-state and phosphosite measurements. Mixed tissue can combine malignant and nonmalignant responses. Slower growth is not death, an altered gene needs direction-of-function evidence, and a marker change does not make a multitarget drug a selective AMPK intervention. Report concentrations or ratios of energy carriers, normalised activating phosphorylation and defined downstream sites. Preserved tissue can support staining, while viable-model perturbations use material. No universal AMPK-high cutoff establishes vulnerability."
    ]
  },
  {
    "id": "reactive-oxygen-species",
    "kind": "term",
    "name": "Reactive oxygen species",
    "category": "Cancer biology",
    "asOf": "2026-11-09",
    "tldr": "Reactive oxygen species are a group of chemicals with different effects. A fluorescent signal needs its chemistry, location and biological consequence explained.",
    "summary": "Hydrogen-peroxide reporters such as HyPer and HyPer7 measure specified oxidation responses in defined experimental settings. Reporter sensitivity, pH response, compartment and timing affect interpretation. A probe signal is not a universal concentration of all reactive oxygen species or proof of a death mechanism. In matrix-detached mammary epithelial models, antioxidant treatment restored energy production and supported survival. Oncogene-driven mouse experiments also linked NRF2 detoxification to tumour development. These model results do not justify a supplement recommendation. General oxidation, iron-dependent lipid damage, death and clinical benefit are separate claims.",
    "links": [
      {
        "label": "Primary source, PMID 16554833",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16554833/"
      },
      {
        "label": "Primary source, PMID 32130885",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32130885/"
      },
      {
        "label": "Primary source, PMID 19693011",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19693011/"
      },
      {
        "label": "Primary source, PMID 21734707",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21734707/"
      },
      {
        "label": "Source identity and scope, PMID 22632970",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22632970/"
      }
    ],
    "notes": [
      "Reactive oxygen species include chemically different molecules; superoxide is a radical and hydrogen peroxide is not. Location, amount and time affect signalling and damage. A measured level reflects both production and removal, while antioxidant transcripts are neither a production rate nor a species measurement.",
      "An oxidation-sensitive fluorescence signal needs a named probe, loading and cell-health controls, location, timing and appropriate calibration. HyPer and HyPer7 are peroxide reporters with distinct pH and sensitivity properties, rather than universal measurements of all reactive oxygen species. Fixed-tissue damage staining cannot reconstruct a live chemical rate. Live reporters require viable material or engineered models. Outputs can be relative fluorescence or calibrated ratios; unstimulated, positive, probe-only and cell-health controls address different failure modes. The result is not a universal concentration of all reactive oxygen species.",
      "A general fluorescent increase does not establish mitochondrial origin, lipid damage, ferroptosis or death. Validate chemistry and compartment first, then follow damage, viability and relevant independent perturbation or rescue over time. No general ROS-positive threshold selects a cancer treatment.",
      "Antioxidants supported energy recovery and survival in detached mammary epithelial models; oncogene-driven NRF2 detoxification also supported tumour development in experimental settings. Less oxidation cannot therefore be assumed to mean less cancer. These findings do not recommend adding or withholding antioxidant supplements."
    ]
  },
  {
    "id": "oxidative-phosphorylation",
    "kind": "term",
    "name": "Oxidative phosphorylation",
    "category": "Cancer biology",
    "asOf": "2026-11-11",
    "tldr": "Oxygen use and cellular energy production are related measurements. Researchers need controlled experiments to work out how much energy a cell produces through mitochondrial respiration.",
    "summary": "Extracellular flux methods estimate respiratory and glycolytic contributions to energy production under defined assumptions. A respiratory message, measured oxygen use, calculated energy output and dependence for survival are distinct claims. Normalisation, fuel, viable-cell input, collection time and the specified method version belong with a result. Electron transport, proton pumping, return through ATP synthase and uncoupling are distinct steps. The mitochondrial matrix and intermembrane space locate the two sides of the inner membrane; naming these compartments does not supply a universal conversion ratio.",
    "links": [
  {
    "label": "Source identity and scope, PMID 26709455",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26709455/"
  },
  {
    "label": "Source identity and scope, PMID 28270511",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28270511/"
  },
  {
    "label": "Racker and Stoeckenius 1974: proton-pumping vesicle reconstitution",
    "url": "https://pubmed.ncbi.nlm.nih.gov/4272126/"
  },
  {
    "label": "Mookerjee et al. 2018 correction to the ATP-rate method",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6093231/"
  },
  {
    "label": "OpenStax Biology 2e 7.4: mitochondrial oxidative phosphorylation (educational source)",
    "url": "https://openstax.org/books/biology-2e/pages/7-4-oxidative-phosphorylation"
  },
  {
    "label": "Assessing mitochondrial dysfunction in cells (2011 methods review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21726199/"
  },
  {
    "label": "Mitochondrial ATP synthase: architecture, function and pathology (2012 ATP-synthase review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21874297/"
  }
],
    "notes": [
  "Respiration and ATP generation are related but different measurements. Mitochondrial and nonmitochondrial oxygen consumption, proton leak and ATP-linked respiration require controlled separation. Respiratory transcripts, normalised oxygen-consumption rates and survival dependence cannot substitute for one another; bulk tissue composition and compensatory fuel use also matter. Oxygen-consumption assays require viable cells or functional preparations rather than routine fixed sections and use or perturb the tested material. Report oxygen per time with justified viable-cell or protein normalisation. Equal baseline respiration and different responses to ATP-synthase inhibition do not by themselves identify which culture will die.",
  "The fictional oxygen-rate example gives 60 minus 30 = 30 picomoles of oxygen per minute per 10,000 viable cells after ATP-synthase inhibition. This is an inhibitor-sensitive oxygen-rate difference, not picomoles of ATP, a death percentage or a corrected ATP-production calculation. Fuel, normalisation and assay controls remain attached.",
  "In mitochondria, respiratory electron transfer and proton movement are distinct processes. Some respiratory complexes move protons from the matrix into the intermembrane space; return through ATP synthase can support ATP formation, while other return pathways dissipate the gradient without that synthesis step. These directions do not specify a fixed proton-to-ATP ratio. Protons return from the intermembrane space to the matrix through the membrane-embedded Fo part of ATP synthase. The matrix-facing F1 part uses the transferred energy to make ATP from ADP and inorganic phosphate. Protons provide the driving force; they are not converted into ATP. A parallel proton leak bypasses ATP synthase and dissipates the gradient. In Racker and Stoeckenius' reconstituted vesicles, a light-driven membrane system from Halobacterium supported ATP formation when mitochondrial ATPase was included. Their artificial vesicles pumped in the opposite direction to the intact source cells, so the experiment supports coupling without specifying a universal cellular orientation or ratio.",
  "Extracellular acidification can include respiration-derived carbon dioxide as well as glycolytic acid production. Keep correction assumptions, normalisation and method version with any calculated ATP rate. The 2018 correction to Mookerjee and colleagues' 2017 method changes the ATP-linked oxygen-rate equation and reports use of a different hyperpolarization factor in some calculations; several numerical rates changed while the authors retained their qualitative conclusions. An inhibitor-sensitive oxygen-rate difference is therefore not itself an ATP rate, and an unversioned fixed conversion should not be inferred."
]
  }
];
