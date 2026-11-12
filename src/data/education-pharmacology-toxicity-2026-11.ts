import type { TermInput } from "@/lib/schema";

/** Sourced glossary additions from the pharmacology and toxicity curriculum audit. */
const asOf = "2026-11-11";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const PM = (n: number) => `https://pubmed.ncbi.nlm.nih.gov/${n}/`;

export const termsEducationPharmacologyToxicity2026: TermInput[] = [
  {
    id: "insertional-mutagenesis", kind: "term", name: "Insertional mutagenesis", category: "Side effects", asOf: "2026-11-12",
    aka: [
  "insertional oncogenesis",
  "vector insertional mutagenesis",
  "vector integration site analysis"
],
    tldr: "Insertional mutagenesis is a change in a cell's genes caused by added genetic material landing in its DNA and disrupting a gene or its control, and neither an insertion nor a growing cell clone shows by itself that a cancer has formed or what caused it.",
    summary: "Some gene delivery systems, including the viral vectors used to make engineered T cells and to correct inherited immune disorders in blood stem cells, insert a genetic cassette into the cell's genome. Integration is the event; insertional mutagenesis is a consequential change that the event causes, such as interrupting a gene or altering the activity of a nearby one. Integration alone does not establish a harmful biological consequence. A cell that gains a growth advantage passes the insertion to its descendants and a clone expands, but a growing clone is not a diagnosis of cancer, because a useful therapeutic response can also expand a clone. FDA's long-term follow-up guidance for gene therapy (January 2020) explains why the question is taken seriously: the biological activity of retroviral vectors and transposon elements is imparted by an integration event, such integration is in general not directed to specific sites, and that raises the potential for disruption of critical host genes or activation of proto-oncogenes near the site, and so the risk of malignancy. A nonviral transposon is therefore also an integrating system, and genome editing can produce its own undesirable changes with a risk of malignancy, which is a separate mechanism from vector insertion.\n\nThree primary reports show why the setting matters. After retrovirus-mediated gamma-c gene transfer into autologous CD34-positive bone marrow cells for X-linked severe combined immunodeficiency, 9 of 10 patients were corrected, but almost three years later the two youngest developed uncontrolled clonal proliferation of mature T cells; both clones carried vector integration near the LMO2 proto-oncogene promoter with abnormal LMO2 expression, which the authors attributed most likely to retrovirus enhancer activity (Hacein-Bey-Abina et al., 2003). In a patient with chronic lymphocytic leukaemia given CD19 CAR T cells, 94 per cent of CAR T cells at the peak of response came from one clone in which lentiviral insertion had disrupted TET2, the patient's second TET2 allele carried a hypomorphic mutation, and the clone showed a central memory phenotype alongside complete remission: an expanded clone linked to benefit, not a new cancer (Fraietta et al., 2018). In 724 patients treated with T-cell therapies at one centre, a lethal T-cell lymphoma followed axicabtagene ciloleucel for diffuse large B-cell lymphoma; the tumour, the CAR T cells and the patient's normal blood cells were profiled in depth, both lymphomas were Epstein-Barr virus positive and linked to DNMT3A and TET2 mutant clonal haematopoiesis, and no evidence of oncogenic retroviral integration was found with multiple techniques (Hamilton et al., 2024). The first is a specific stem-cell regimen and the others are single-centre or single-patient observations, so none is an incidence estimate for a vector or product.\n\nWhat regulators ask for follows from this. The August 2026 ABECMA prescribing information carries a boxed warning that T-cell malignancies, including CAR-positive tumours, have occurred after BCMA- and CD19-directed genetically modified autologous T-cell immunotherapies for blood cancers, may present within weeks of infusion and may be fatal, and says to monitor life-long for secondary malignancies. FDA's CAR T-cell development guidance recommends following people for 15 years after treatment with CAR T cells containing an integrated transgene, because integrating vectors may increase the risk of delayed adverse events and non-integrating vectors are thought to carry a low delayed risk. These are class-level product warnings and follow-up expectations; they do not assign one mechanism to every event or give an incidence for other products.\n\nTo attribute a malignancy after engineered-cell therapy, investigators ask whether the therapeutic sequence is present in the malignant cells, where the integrations are, whether they alter relevant genes, whether related clones were detectable earlier, and what prior therapy, underlying disease and pre-existing genetic changes contribute. Integration-site sequencing maps insertion locations, quantitative DNA assays estimate vector copies per cell, and flow cytometry, gene-expression measurement and pathology answer different questions about identity, function and malignancy; the sample is consumed by testing. Average vector copy number cannot show the position or effect of each insertion, a clone's frequency depends on the sampled cells, assay sensitivity and time, and blood may not represent every tissue. This record gives no copy-number or clone-frequency threshold because none of the sources read sets one. Messenger RNA delivery that does not integrate does not use genomic insertion as its route, which does not remove its other risks.",
    wikipedia: W("Insertional_mutagenesis"),
    links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Insertional_mutagenesis"
  },
  {
    "label": "Hacein-Bey-Abina et al., LMO2-associated clonal T cell proliferation after gene therapy for SCID-X1 (2003)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/14564000/"
  },
  {
    "label": "Fraietta et al., disruption of TET2 promotes the efficacy of CD19-targeted T cells (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29849141/"
  },
  {
    "label": "Hamilton et al., second tumors and T-cell lymphoma after CAR T-cell therapy (2024)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38865660/"
  },
  {
    "label": "ABECMA prescribing information (FDA)",
    "url": "https://www.fda.gov/media/147055/download"
  },
  {
    "label": "FDA: long term follow-up after administration of human gene therapy products (guidance, January 2020)",
    "url": "https://www.fda.gov/media/113768/download"
  },
  {
    "label": "ABECMA prescribing information, August 2026 version (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b90c1fe7-f5cc-464e-958a-af36e9c26d7c"
  },
  {
  "label": "NCI Drug Dictionary: axicabtagene ciloleucel",
  "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/768723"
}
],
    technologies: ["car-t"], terms: ["secondary-malignancy"], targets: ["tet2", "lmo2"],
    related: [
  "secondary-malignancy",
  "car-t"
],

"notes": [
  "In a fictional follow-up example, an engineered-cell clone becomes more common but no new malignancy has been established. The observation prompts examination of the clone, insertion sites, gene effects and clinical findings. A growth pattern, a malignant diagnosis and an insertion-driven mechanism are separate claims. An insertion that leaves no demonstrated gene effect, one that interrupts a gene and one that alters nearby regulation are different possibilities; none of those schematic locations assigns an incidence or time to cancer. A CAR-positive malignancy can establish product ancestry without identifying which change drove it.",
  "Hamilton’s secondary T-cell-lymphoma case followed axicabtagene ciloleucel. The NCI Drug Dictionary describes that product’s gammaretroviral vector; it should not be relabelled as a lentiviral product. The study found no evidence of oncogenic retroviral integration in the deeply profiled case. Product identity, the diagnosis and investigation of its cause remain separate; that finding does not negate the malignancy warning or estimate the risk of every other integrating system."
]
},
  {
    id: "on-target-off-tumour-toxicity", kind: "term", name: "On-target, off-tumour toxicity and off-target cross-reactivity", category: "Side effects", asOf: "2026-11-12",
    aka: [
  "on-target off-tumor toxicity",
  "on-target, off-tumor toxicity",
  "On-target off-tumour toxicity"
],
    wikipediaChecked: "2026-11-10",
    tldr: "On-target, off-tumour toxicity is harm to healthy tissue that carries the same target a treatment was built to recognise, so accurate recognition injures the tissue as well as the cancer.",
    summary: "On-target, off-tumour toxicity is injury from recognition of the intended target on healthy tissue. It differs from recognition of an unintended molecular target. The predictable, lymphoma-specific consequences of aiming at lineage antigens (B-cell aplasia, low immunoglobulin, and the effects of CD52, CCR4 and CD47 targeting) are described in the record on the cost of aiming at a lineage antigen, which this record does not repeat.\n\nMany candidate cancer targets are normal proteins found at different levels or places in the body, so tumour-associated does not mean tumour-exclusive. A treatment that recognises its intended target wherever it is accessible, such as a chimeric antigen receptor (CAR) T cell, can harm any healthy tissue that displays it, and tissue location, target density, receptor properties and exposure all shape the outcome. This differs from off-target cross-reactivity, in which the receptor recognises an unintended molecule, and from cytokine release syndrome, which is systemic inflammatory activation; the three can occur together. It also differs from payload toxicity in an antibody-drug conjugate: a pooled analysis of ADC trials found the key grade 3 to 4 toxicities grouped by payload and concluded they were likely off-target and related to the payload (Masters et al., 2018). Binding specificity is not tissue selectivity, and experience with an antibody against a target does not automatically carry over to a living cell with a different recognition and signalling system.\n\nTwo primary reports show the contrast. A patient with colon cancer metastatic to the lungs and liver received 10 billion autologous T cells expressing a trastuzumab-based CAR against ERBB2 (HER2), the largest number permitted in the first dose-escalation cohort, the day after a lymphodepleting regimen of cyclophosphamide (60 mg/kg daily for 2 days) and fludarabine (25 mg/m2 for 5 days). Within 15 minutes the patient had respiratory distress, chest imaging showed pulmonary oedema, and the patient died 5 days after treatment, with marked rises in interferon-gamma, GM-CSF, tumour necrosis factor-alpha, interleukin-6 and interleukin-10. At autopsy multiple organs showed systemic ischaemia and haemorrhagic microangiopathic injury and the lungs diffuse alveolar damage; histological examination of autopsy tissue found ERBB2 at 3+ in liver metastases and 2+ in lung metastases and much lower levels in normal lung parenchyma, normal liver and normal breast. The authors hypothesised that highly active ERBB2-directed T cells recognised ERBB2 on normal lung cells on first pass through the lung and released inflammatory cytokines that began a cascade ending in multiorgan failure; the autopsy findings were read as initial lung injury followed by days of hypotension and ischaemia, and the authors call the significance of the cells' reactivity against cultured primary cells unclear. This is a single case, with a stated dose and conditioning, whose mechanism is the authors' hypothesis and which gives no incidence for any CAR product (Morgan et al., 2010). In a trial of an affinity-enhanced T-cell receptor against HLA-A*01-restricted MAGE-A3 in myeloma and melanoma, the first two patients developed cardiogenic shock and died within days; no MAGE-A3 expression was detected in heart tissue at autopsy, and beating cardiomyocytes made from induced pluripotent stem cells triggered T-cell killing through recognition of an unrelated peptide from titin. That is off-target recognition of an unintended molecule, not the intended target in the wrong tissue (Linette et al., 2013).\n\nHow the question is asked before and during trials. FDA's CAR T-cell development guidance says to assess both undesired targeting of healthy tissue that expresses the intended antigen (on-target/off-tumour) and unintended targeting of other antigens, using examples such as tissue cross-reactivity studies with an antibody carrying the same recognition domain, protein arrays, cytotoxicity and cytokine-release testing on panels of primary cells, cell lines or stem-cell-derived organ systems, and relevant animal models, and encourages a combination of methods; antigen recognition domains can differ in affinity or avidity or recognise a different site, which should be evaluated, and CAR T cells can carry added components such as suicide genes. In practice a readout is a staining intensity or positive fraction, a binding profile, killing or cytokine release by healthy cells at a named time, and finally organ injury in the treated population; stained fixed tissue does not show a living organ's accessibility, an animal model may lack the human target, and a negative result in one panel is not a safety certificate. No universal expression cut-off is given here because no source read gives one. Whether affinity tuning, recognition logic or control switches improve safety for a particular design needs that design's own evidence. The 2026 ASTCT consensus abstract lists on-target, off-tumour toxicity among the toxicities for which it considered definitions and grading; its criteria were not readable.",
    links: [
  {
    "label": "Morgan et al., case report of a serious adverse event after ERBB2-directed CAR T cells (2010)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20179677/"
  },
  {
    "label": "Linette et al., cardiovascular toxicity and titin cross-reactivity of affinity-enhanced T cells (2013)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23770775/"
  },
  {
    "label": "FDA: considerations for the development of CAR T cell products (guidance)",
    "url": "https://www.fda.gov/media/156896/download"
  },
  {
    "label": "Perales et al., ASTCT consensus grading for toxicities after immune effector cell therapy (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/42711241/"
  },
  {
    "label": "Masters et al., clinical toxicity of antibody-drug conjugates: meta-analysis of payloads (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29027591/"
  }
],
    technologies: ["car-t", "tcr-t"], terms: ["crs", "therapeutic-index"],
    related: [
  "crs",
  "therapeutic-index",
  "her2",
  "lymphoma-bio-lineage-antigen-cost",
  "muc1"
],

"notes": [
  "A fictional receptor kills X-positive tumour cells and normal airway cells that also display X: that is the on-target, off-tumour problem. If it also recognises Y on an X-negative healthy cell, that is off-target cross-reactivity. Binding or surface contact does not itself measure injury. Record tissue, assay sensitivity, staining intensity, positive fraction or calibrated molecules per cell, binding specificity, and healthy-cell killing or cytokine release at a named time; viable-cell tests consume the sample. Clinical organ injury is a further outcome in the actual population and regimen. A staining ratio, one negative panel or a control switch does not establish safety everywhere or guarantee reversal of an injury already present.",
  "In a fictional tumour sample, 70 of 100 cells display an epitope accessible to the proposed receptor and 30 do not. A second target has only an RNA result, while healthy tissue was stained with a third antibody. Those measurements cannot rank safe receptor designs: ask for the actual binder’s recognition, the unrecognised tumour population and functional effects on relevant healthy cells. A more sensitive receptor might recognise additional tumour cells and additional healthy cells. Even a perfectly specific binder can harm healthy cells carrying its intended antigen; unintended binding to another molecule is a different failure. A sampled panel can miss antigen-negative cells, and an intracellular signal does not establish an accessible surface epitope. Repeat the relevant healthy-cell question under conditions, including inflammation, that could change recognition."
]
},
  {
    id: "pulmonary-function-testing", kind: "term", name: "Pulmonary function testing", category: "Diagnostics & imaging", asOf,
    aka: [
  "pulmonary function tests",
  "pulmonary function test",
  "PFTs",
  "lung function tests",
  "lung function test",
  "diffusing capacity for carbon monoxide",
  "DLCO",
  "spirometry"
],
    tldr: "Pulmonary function tests measure airflow, lung volume and gas transfer. They can describe a baseline or change in function, while clinical assessment identifies its cause.",
    summary: "A full set has three parts. Spirometry has the person breathe in fully and blow out as hard and as long as possible, measuring the forced vital capacity (FVC) and how fast air leaves; the forced expiratory volume in one second (FEV1) and its ratio to FVC are the usual numbers. The ATS/ERS 2019 spirometry standard describes the test as the maximal volume of air a person can inspire and expire with maximal effort, reports FEV1/FVC as a decimal fraction, and sets acceptability and repeatability criteria for each manoeuvre, so a poor-effort test is a quality problem before it is a finding. Spirometry is used to look for obstructive conditions, in which the airways narrow so air flows out with difficulty, as in asthma, bronchitis and emphysema (MedlinePlus). A lung volume test, often done by body plethysmography in a sealed booth, measures the total lung capacity (TLC), the amount of air the lungs can hold; restrictive conditions, in which the lungs cannot fill fully, such as pulmonary fibrosis and interstitial lung disease, lower it. The diffusing capacity for carbon monoxide (DLCO) has the person breathe in a gas mixture with a trace of carbon monoxide and a tracer gas, hold the breath for about 10 seconds and breathe out; it shows how well gas crosses into the blood. The ERS/ATS 2022 interpretation standard explains that a low DLCO with normal alveolar volume can be consistent with pulmonary vascular impairment, emphysema with preserved volume or anaemia. Low alveolar volume with low or normal transfer coefficient can accompany interstitial lung disease or emphysema with loss of lung volume. These are patterns to interpret, not diagnoses from one value. The 2017 ERS/ATS standard asks for no smoking or other carbon-monoxide exposure on the day of the test, recording the last cigarette and accounting for recent or heavy exposure. Its preparation instructions are technical test conditions, not an individual treatment plan.\n\nHow a result is judged. A value is compared with a healthy reference population for the person's age, sex and height. The ERS/ATS 2022 technical standard defines the lower limit of normal as the 5th percentile, a z-score of minus 1.645, so 5 per cent of a healthy reference population lie below that limit by definition. It strongly discourages the fixed cut-offs of 80 per cent of predicted for FEV1 and 0.70 for the FEV1/FVC ratio, because percent of predicted ignores how measurement variability changes with age, and it adds the qualifier that neither simple cut-offs nor the 5th percentile should be used as absolute diagnostic criteria, since healthy and diseased values overlap in a zone of uncertainty. Ideally the comparison is with the person's own earlier baseline. Serial results need their test quality, measurement variability and clinical context. A threshold developed for another test or population should not be turned into a universal DLCO monitoring rule. For DLCO the standard says the importance of haemoglobin cannot be overemphasised and all interpretations must have the reference values adjusted for haemoglobin, with particular care when people are monitored for drug toxicity and haemoglobin shifts, as in chemotherapy. A 2024 transplant cohort report likewise states that DLCO is affected by haemoglobin and that two adjustment equations (Cotes, recommended by ATS/ERS, and Dinakara) gave different results, so the method should be named.\n\nTheir place in drug-related lung injury. A baseline records a person's own starting point, which makes a later change easier to read than a comparison with a population average. In diagnosis the tests are one input: an Italian multidisciplinary expert-opinion panel on drug-induced interstitial lung disease lists spirometry and DLCO among the diagnostic components alongside history, vital signs including oxygen saturation, laboratory and microbial tests to exclude infection, and computed tomography, stratifies management by CTCAE grade, and notes that there were no specific guidelines at the time (Conte et al., 2022). In follow-up, repeat testing can show whether function is recovering or worsening. They do not replace imaging: the trastuzumab deruxtecan label asks for symptom monitoring and radiographic evaluation of suspected interstitial lung disease, and neither it nor the datopotamab deruxtecan label mentions scheduled breathing tests. For scale, adjudicated drug-related interstitial lung disease occurred in 12.1 per cent of patients given trastuzumab deruxtecan in DESTINY-Breast04, 0.8 per cent grade 5 (Modi et al., 2022), and a prior lung event can bear on eligibility for later treatment. A test pattern does not identify cause, since many conditions lower DLCO; that normal spirometry does not rule out interstitial disease is an evidence-reading distinction between airflow and gas transfer; the 2022 standard also states that a result within the reference range does not exclude disease.",
    wikipedia: W("Pulmonary_function_testing"),
    links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Pulmonary_function_testing"
  },
  {
    "label": "Neder, Berton and O'Donnell, calculating the statistical limits of normal and Z-scores for pulmonary function tests (2022)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35830056/"
  },
  {
    "label": "Yadav et al., adjusting diffusing capacity for anaemia in patients undergoing allogeneic HCT (2024)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38244276/"
  },
  {
    "label": "MedlinePlus: lung diffusion testing",
    "url": "https://medlineplus.gov/ency/article/003854.htm"
  },
  {
    "label": "MedlinePlus: lung function tests",
    "url": "https://medlineplus.gov/lab-tests/lung-function-tests/"
  },
  {
    "label": "Stanojevic et al., ERS/ATS technical standard on interpretive strategies for routine lung function tests (2022)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34949706/"
  },
  {
    "label": "Graham et al., standardization of spirometry 2019 update, an official ATS and ERS technical statement",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31613151/"
  },
  {
    "label": "Graham et al., 2017 ERS/ATS standards for single-breath carbon monoxide uptake in the lung",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28049168/"
  },
  {
    "label": "Conte et al., drug-induced interstitial lung disease during cancer therapies: expert opinion (2022)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35219244/"
  },
  {
    "label": "Modi et al., trastuzumab deruxtecan in HER2-low breast cancer, DESTINY-Breast04 (2022)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35665782/"
  },
  {
    "label": "ERS/ATS 2017 DLCO technical standard, typeset society-hosted copy",
    "url": "https://www.sogapar.info/wp-content/uploads/2016/12/5.-Normativa-difusi%C3%B3n-ATS-2017.pdf"
  }
],
    terms: ["pneumonitis", "ild", "radiation-pneumonitis"], related: [
  "pneumonitis",
  "ild",
  "radiation-pneumonitis"
],

"notes": [
  "Spirometry measures forced expiratory volume in one second (FEV1), forced vital capacity (FVC) and their ratio. A ratio below its appropriate lower limit supports an obstructive pattern. Restriction is defined by low total lung capacity (TLC); reduced FVC alone does not establish it. A single-breath DLCO test estimates carbon-monoxide uptake after inhaling test gas with a tracer, holding the breath for about ten seconds and exhaling. Conventional units include mL per minute per mmHg. Poor effort, technique and repeatability are quality issues to assess before interpreting an apparent impairment.",
  "In a fictional example, a person receiving an antibody-drug conjugate develops a dry cough, normal spirometry, a lower DLCO than baseline and a lower haemoglobin. The gas-transfer result needs haemoglobin-aware interpretation: it is not by itself a diagnosis of pneumonitis. Normal airflow measurements do not establish normal gas transfer. Clinical assessment combines history, symptoms, imaging and other appropriate tests; the trastuzumab deruxtecan label specifically calls for radiographic evaluation of suspected disease. Neither a low DLCO nor an arbitrary change threshold supplies a monitoring or treatment rule for every product. A reduced DLCO can accompany anaemia, emphysema, pulmonary vascular disease or interstitial injury; a test pattern alone does not select among causes."
]
},
  {
    id: "chemical-probe", kind: "term", name: "Chemical probe", category: "Methods and models", asOf,
    aka: [
  "chemical probes",
  "research probe compound",
  "probe compound",
  "chemical probe versus drug"
],
    tldr: "A chemical probe is a compound used in the laboratory to switch one biological process off or on and ask what it does, so it is judged by how well it is characterised for that question and not by whether it could be given to a person.",
    summary: "A chemical probe is a research compound used to perturb a defined biological process in cells or animals. It is useful only to the extent that it is potent enough, selective enough and characterised well enough for the question being asked. Arrowsmith and colleagues put the requirement as a probe that is potent, of known selectivity and with a proven mechanism of action, and describe how many probes in common use were first characterised inadequately and later proved to be nonselective. LY294002 was described in 1994 as a selective inhibitor of PI3 kinase and was still sold as one by nearly all vendors, although by 2005 it was clear that it inhibited many other proteins at the concentrations used to inhibit PI3 kinase. An effect seen in cells at a high concentration therefore identifies an effect at that concentration, not necessarily a target.\n\nThe numerical standards belong to the groups that set them. For probes of epigenetic targets, the Structural Genomics Consortium as described by Arrowsmith and colleagues asks minimally for in vitro potency at the target below 100 nM, more than 30-fold selectivity over related proteins of the same family, profiling against a standard panel of off-targets and effects on the target in cells below 1 uM, and now requires an inactive close analogue as a negative control. Workman and Collins advocate assessing fitness for the intended experiment rather than applying an overly restrictive universal rule. Those cut-offs were written for particular target classes and do not apply to every probe, and neither paper offers a number that makes a concentration universally clean.\n\nControls carry the causal argument. An inactive or weakly active analogue from the same chemical family asks whether the effect follows the target-binding feature rather than shared chemistry; an active probe of a different chemical structure asks whether an independent perturbation agrees, with the limit that two probes can still share an off-target; and a genetic change or engineered resistance asks whether altering the target alters the effect as predicted, with the limit that removing a whole protein is different from blocking one of its functions. Workman and Collins add that a chemical probe can inhibit a specific function rather than remove the protein, which RNA interference cannot, and that both approaches have off-target as well as on-target effects. Agreement among these tests strengthens an inference, and conflicts should be recorded rather than set aside.\n\nA probe is not a medicine. Arrowsmith and colleagues note that a probe does not need to meet the requirements of a successful medicine, such as good pharmacodynamics and oral bioavailability, and that high-quality probes have served as seeds for new medicines. A medicine also needs evidence in people about product quality, exposure, tolerability and benefit for its intended use, so a useful probe may lack adequate delivery, stability or safety, and an approved medicine can be a poor tool for isolating one target if several of its interactions contribute to its effects; this is an evidence-reading distinction rather than a claim that the same experiment establishes clinical suitability. A culture concentration is not a patient dose.\n\nTarget engagement is the separate question of whether a compound interacts with its target where the experiment needs it. The cellular thermal shift assay, introduced by Martinez Molina and colleagues, is built on ligand-induced thermal stabilisation of target proteins and was used to monitor drug binding in cells and tissue samples; a shift can support engagement under the assay conditions and is not by itself an inhibition or occupancy percentage. Engagement, a change in target function and cell survival are three measurements, and an effect on viability does not identify the responsible target.\n\nWorked example, fictional. A new compound lowers the viability of cultured cells at 10 micromoles per litre, and neither engagement nor selectivity has been measured. The supported statement is that the compound has an effect in this culture at this concentration. It does not show that a particular protein is essential, and it does not show that a safe human dose reaches that protein. To close those gaps one would measure engagement and relevant selectivity, test an inactive analogue and a chemically different probe, and perturb the target genetically or by engineered resistance. Those steps address causality; exposure, quality, safety and clinical evidence remain separate questions.",
    links: [
  {
    "label": "Arrowsmith et al., the promise and peril of chemical probes (2015)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26196764/"
  },
  {
    "label": "Workman and Collins, probing the probes: fitness factors for small molecule tools (2010)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20609406/"
  },
  {
    "label": "Martinez Molina et al., monitoring drug target engagement in cells and tissues using the cellular thermal shift assay (2013)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23828940/"
  }
],
    notes: [
  "Record the chemical identity, structure, source and purity, concentration-dependent activity, selectivity and effects in the relevant system. An inactive close analogue is useful, but its uptake or other properties may differ; an unrelated active probe can still share an off-target. Removing a whole protein can differ from inhibiting one function. Agreement among controls strengthens an inference in that system, and disagreement belongs in the evidence record rather than being discarded."
],
    related: [
  "small-molecule",
  "therapeutic-index"
],
  },
  {
    id: "drug-target-and-mechanism", kind: "term", name: "Drug target and mechanism of action", category: "Methods and models", "asOf": "2026-11-11",
    aka: [
  "drug target",
  "drug targets",
  "mechanism of action",
  "target versus mechanism",
  "what a drug acts on"
],
    tldr: "A drug target is the molecule or structure a treatment acts on and its mechanism of action is how that action produces an effect, and each step from target to patient benefit needs its own evidence.",
    summary: "A drug target is a biological molecule or structure that a treatment acts on, and the mechanism of action explains how that action produces an effect. The National Cancer Institute describes targeted therapy as treatment that targets proteins that control how cancer cells grow, divide and spread, and says most targeted therapies are small-molecule drugs, which are small enough to enter cells and so suit targets inside cells, or monoclonal antibodies, which are designed to attach to specific targets on cancer cells. It describes antibodies that mark cancer cells for the immune system, antibodies that stop growth or cause self-destruction directly, and antibodies that carry toxins to cancer cells. These are different jobs, so a shared label of targeted does not make the mechanisms interchangeable, and a target that is only an address for delivery need not drive the cancer's growth.\n\nAn altered gene or an elevated protein can suggest a target hypothesis; it does not show that inhibiting the target will harm cancer cells selectively, which controlled perturbations of the target test, and safe exposure and appropriate clinical studies answer later questions. Naming a target answers only the first of several questions. Binding is an interaction between molecules and can be shown with a purified protein, which does not show that the compound reaches the protein inside a cell. Target engagement asks whether the interaction occurs in the relevant cells or tissue, and exposure, target location and the cell membrane all bear on it; a blood concentration and a concentration at an intracellular target are different observations. The cellular thermal shift assay of Martinez Molina and colleagues was developed to evaluate drug binding to target proteins in cells and tissue samples, and its authors used it to monitor drug transport and activation, off-target effects and resistance in cancer cell lines. Binding is also different from changing function: a compound can inhibit an enzyme, activate a receptor or deliver a payload, and a binder can leave the target's activity unchanged. Binding assays test an interaction under specified conditions and engagement assays examine the relevant cells or tissue, while a downstream signal measures a biological consequence and is not automatically a direct measure of how much of the target is occupied; growth, death and regrowth assays add further layers. A measured change in signalling, division or survival needs controls that test the proposed explanation, and one positive experiment should not carry the whole claim.\n\nThe last step is clinical. Mechanistic plausibility does not show benefit, because the target may also be present in healthy tissue and the useful margin depends on achieved benefit and harm in a stated disease, treatment setting, product and outcome. The National Cancer Institute adds that cancer cells can become resistant to targeted therapy when the target itself changes so the drug can no longer interact with it, or when cells find new ways to grow that do not depend on the target.\n\nWorked example, fictional. An antibody binds protein A on cancer cells, and a growth assay shows no change. Binding is supported under the assay conditions. It has not been shown that protein A drives growth, that the antibody inhibits protein A's function, that a finished payload-bearing product delivers anything, or that the product is safe and beneficial; each of those needs its own evidence. Before saying a drug worked, name the layer that was measured.",
    links: [
  {
    "label": "NCI: targeted therapy to treat cancer",
    "url": "https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies"
  },
  {
    "label": "Martinez Molina et al., monitoring drug target engagement in cells and tissues using the cellular thermal shift assay (2013)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23828940/"
  }
,
{
  "label": "KIMMTRAK U.S. label: gp100 peptide-HLA-A*02:01/CD3 recognition and indication",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24a49f57-d2fc-4ffe-9eb1-fe0460c6b067"
}
],
    notes: [
"A fictional follow-up measures loss of a specified class-I peptide-HLA target after B2M loss, while a separate live-cell assay still finds accessible intact protein M. Those are two distinct observations: losing the measured peptide-HLA address does not remove the independently measured M address. Neither observation establishes delivery, immune-cell function, target-cell death or benefit. A surface-binding CAR or protein engager is not automatically immune-independent, and a peptide-HLA-targeting CAR, soluble TCR or antibody-derived mimic retains its specified recognition requirements."
],
    related: [
  "small-molecule",
  "therapeutic-index",
  "chemical-probe"
],
  },
];
