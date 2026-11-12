import type { EntityInput } from "@/lib/schema";

// Source-reviewed functional-model education additions.
export const functionalModelEducation: EntityInput[] = [
  {
    "id": "bioprinting",
    "kind": "technology",
    "name": "Bioprinting of experimental tissue models",
    "tldr": "Bioprinting places cells or materials in a planned arrangement; the constructed tissue still needs structural and functional checks.",
    "summary": "Bioprinting controls deposition of biological materials to build an experimental construct. The printing plan, measured final geometry, viable cells and biological function are distinct evidence. Kolesky and colleagues printed cell-containing and removable inks, removed the temporary channel material, added endothelial lining and perfused engineered tissues. This tissue-engineering experiment did not demonstrate a complete human organ or cancer-treatment utility. Yi and colleagues reported a particular glioblastoma chip combining patient-derived tumour cells, endothelial cells and brain-derived matrix; its abstract supports that bounded example.",
    "asOf": "2026-11-10",
    "notes": ["Model card. Input: defined cells and biomaterials, sometimes viable patient-derived material requiring expansion. Document the source of each component; patient-derived tumour cells do not make every material donor-matched. Fabrication and quality checks consume finite material. Output: measured geometry in micrometres or millimetres, viability or attributed counts, and the separately chosen functional endpoint. Retain actual layout, matrix, cell identities, time and controls; a digital plan is not the final measurement. A printing plan specifies positions, materials and fabrication steps. A bioink is a formulation used to build a biological construct, often containing cells in a supportive material. The extracellular matrix is the surrounding molecular scaffold of tissue; a printing material represents selected features rather than its whole composition. A sacrificial ink is temporary material removed to leave a channel. Some designs deposit cells with the material; another route builds a support that is seeded afterwards. Gelation, adding cell populations and making channels are distinct steps. Kolesky's cell-laden and fugitive-ink method is one documented implementation, rather than proof of every possible printing route. Source: https://doi.org/10.1073/pnas.1521342113","Channel checks. A temporary channel path becomes a hollow channel after removal; endothelial lining, fluid passage and barrier performance require separate tests. Kolesky's primary figures distinguish these steps and compare diffusional permeability of lined and bare channels. Printing describes fabrication; a chip describes an environment, while organoid self-organisation describes another design axis. More complex fabrication does not automatically validate prediction. Living cells can spread, contract and remodel the initial layout. The actual geometry and cell health therefore need observation after printing as well as a design file. In Kolesky's primary PDF, figures 1 and 2 separate fabrication, viability, endothelial lining and measured permeability of lined versus bare channels. Those checks support those engineered tissues, not a complete organ. Perfusion supplies fluid through the constructed system; it is not full human circulation or drug metabolism.","Fictional reading exercise. Growth changes when both gel composition and neighbour distance change. The comparison does not isolate proximity. Compare layouts with the same material, starting populations and exposure, and verify the final construct. Failure modes include incorrect placement, cell injury, incompatible material and inadequate transport. Acceptance criteria belong to the design; there is no universal clinical printing threshold. Unequal starting composition is another failure mode, alongside placement, compatibility, cell injury and transport. Printing alone does not establish complete tumour biology or immune recognition."],
    "links": [
      {
        "label": "Kolesky et al. 2016 primary fabrication and channel checks",
        "url": "https://doi.org/10.1073/pnas.1521342113"
      },
      {
        "label": "Yi et al. 2019 primary abstract",
        "url": "https://doi.org/10.1038/s41551-019-0363-x"
      }
    ],
    "status": "emerging",
    "sections": [
      "drug-discovery"
    ],
    "technologies": [
      "tumour-on-chip",
      "organoids"
    ],
    "principle": "Deposit defined cells and materials in a planned arrangement, then verify constructed geometry, cell health and the intended function."
  , limitations: ["The constructed geometry, cell health and intended function must be measured","Fabrication alone does not establish whole-tumour biology, immune recognition or patient benefit"], strengths: ["Controls a planned starting arrangement for a defined experimental question"]},
  {
    "id": "ex-vivo-tumour-fragments",
    "kind": "technology",
    "name": "Ex vivo tumour fragments and slices",
    "tldr": "Living tumour pieces can retain local cells and architecture for a defined experiment outside the body, while losing circulating supply and recruitment.",
    "summary": "Fragment and slice preparations retain selected native tissue relationships rather than expanding a selected culture. Composition and function change with sampling, cutting, diffusion, medium and time. A retained vessel does not demonstrate perfusion, and visible immune cells do not establish the required interaction. Ladan's breast-slice assay and Salmon's human lung-slice migration experiments support different questions; neither validates every fragment test or treatment decision.",
    "asOf": "2026-11-10",
    "notes": ["Preparation and assay card. Input: suitable viable tissue with donor/site/time, collection and transport conditions, dimensions and culture window. Cutting, quality checks and endpoints consume finite material and limit available conditions. Compare baseline quality and untreated or carrier controls with defined exposures. Attribute counts, stain fractions, movement or metabolic signal to the relevant cells, with units, time and denominator. Thresholds are method-specific rather than a universal fragment score. Fragment names the preparation; a drug screen names an experiment it may support. Different pieces from one tumour can contain different populations, so matched treatments still need composition checks.","Primary preparation example. Ladan used 300 micrometre slices and three-day exposure in a defined anthracycline-based assay, measuring morphology, proliferation and apoptosis. Diffusion into slices differs from vascular delivery; host metabolic activation, clearance, organ toxicity and new immune recruitment were not recreated. Preparation injury, poor viability, uneven diffusion, changing populations and non-tumour signal can invalidate interpretation. A failed culture is not evidence of clinical resistance. Contamination is another reason for assay failure; short-term response does not establish durable elimination, systemic safety or benefit.","Endpoint and validation example. Ladan reported 23 usable assays among 30 tumour-containing biopsies; three of the 23 did not proceed to the clinical treatment comparison, leaving 20 evaluable patients and 15 concordant MRI comparisons. The agreement compared sensitive, intermediate and resistant categories after four courses of anthracycline-containing chemotherapy; it is not a binary drug-killing rate. The study did not observe an ex vivo resistant group, limiting assessment of resistance detection. Those denominators, assay version and preoperative setting cannot validate another postoperative choice. Salmon measured matrix-associated T-cell location and movement in viable lung-tumour slices, not treatment-selection benefit.","Fictional reading exercise. Two fragments with different starting malignant-cell fractions both lose total metabolic signal. Equal tumour killing has not been shown. Verify composition and an attributed death endpoint against controls. Retained neighbours can be useful for an immune question only when their viability and relevant function are demonstrated."],
    "links": [{"label":"Ladan et al. 2023 primary slice assay","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC10542784/"},{"label":"Salmon et al. 2012 primary lung-tissue interaction","url":"https://doi.org/10.1172/jci45817"},{"label":"Hafner et al. 2016: readout interpretation, not fragment validation","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC4887336/"}],
    "status": "emerging",
    "sections": [
      "drug-discovery"
    ],
    "technologies": [
      "functional-drug-testing"
    ],
    "principle": "Maintain viable tissue pieces for a defined comparison while measuring retained populations, quality and an attributed response."
  },
  {
    "id": "single-cell-mass-assays",
    "kind": "technology",
    "name": "Single-cell mass and growth-rate assays",
    "tldr": "Repeated calibrated mass measurements can estimate a cell's growth rate; slower mass accumulation does not by itself show cell death.",
    "summary": "A suspended microchannel resonator weighs a cell relative to the fluid it displaces using the shift in a vibrating beam's frequency. Buoyant mass equals cell volume multiplied by the difference between cell and fluid density. It is not simply diameter or dry mass. Repeatedly measuring the same cell estimates mass accumulation rate; Godin reversed the flow to reintroduce the same cell to the sensor (a dynamic trap) and Cermak used serial sensors along one channel. Stevens investigated drug-response associations in specified cancer models and leukaemia samples, rather than universal clinical prediction.",
    "asOf": "2026-11-10",
    "notes": ["Assay card. Input: viable cells compatible with suspension and channel handling. Record source, identity, preparation losses, fluid and temperature conditions, exposure and observation interval. Calibration maps frequency shifts to mass, often picograms. Tracking repeated readings estimates a slope, often picograms per hour; mass-normalised rates have inverse-time units. Preparation and exposure consume finite material; the physical measurement can preserve cells, but recovery and downstream compatibility depend on the method.","Quality and inference. Check clumps, cell attribution, instrument drift, calibration, tracking ambiguity and sufficient linked readings. Serial-sensor analyses exclude uncertain matches rather than invent a trajectory. Fluid-density changes can change buoyant mass. A small positive slope still indicates accumulation in the observed interval; later recovery, death and resistance need additional endpoints and time. Many measured cells from one specimen are not many independent patients. No universal rate cutoff establishes clinical sensitivity or immune recognition. Buoyant mass is also not a count of cell divisions. Physical measurement performance, a reproducible drug-response association and validated use for a clinical decision are separate kinds of evidence. Without extra measurements or assumptions, this sensor does not establish dry mass, a death mechanism, immune specificity or patient benefit.","Fictional arithmetic. A tracked cell rising from 10 to 12 picograms over one hour has a slope of 2 picograms per hour. Comparable groups at 2 and 0.5 picograms per hour differ by (2 minus 0.5) divided by 2, or 75 percent. Both rates are positive. This is a rate reduction, not shrinkage, a killed-cell fraction or patient response. These values are invented.","The positive research use is a rapid physical response readout and a view of cell-to-cell variation that a population average can conceal. Stevens measured short-term mass accumulation in specified cancer models and leukaemia samples; this can precede a large endpoint-count change, while slower accumulation can occur in living cells. A mixed specimen still requires attribution to the relevant population, and a mass sensor does not supply immune cells or recognition. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC5142231/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5064867/"],
    "links": [
      {
        "label": "Godin et al. 2010 buoyant-mass measurement",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2862099/"
      },
      {
        "label": "Cermak et al. 2016 serial sensors and tracking",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5064867/"
      },
      {
        "label": "Stevens et al. 2016 defined drug-response experiments",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5142231/"
      }
    ],
    "status": "emerging",
    "sections": [
      "drug-discovery",
      "diagnostics"
    ],
    "technologies": [
      "functional-drug-testing"
    ],
    "principle": "Calibrate a frequency shift to buoyant mass and track repeated readings from the same cell to estimate mass accumulation rate."
  },
  {
    "id": "functional-model-selection",
    "kind": "term",
    "name": "Comparing tumour-model preparations",
    "tldr": "Choose a preparation by the biology and time the question requires, then verify its actual components and endpoint.",
    "summary": "Conventional xenografts, epithelial organoids and short-term fragments make different trade-offs. Xenografts add a living host with mouse support and exposure. Organoids expand selected populations in supplied culture conditions. Fragments can retain local neighbours briefly without perfused circulation. This comparison describes preparations and decision windows; the existing model-context framework owns the broader question of intended-use validation.",
    "asOf": "2026-11-10",
    "notes": [
  "A conventional xenograft implants viable tumour material into a host; an epithelial organoid grows selected cells in supplied matrix and medium; a fragment or slice retains a cut piece of local tissue. Ladan used 300 micrometre (0.3 millimetre) breast slices. None supplies complete human drug metabolism, healthy-organ toxicity or recruitment of new immune cells from human circulation, and every preparation can fail. Fixed archival tissue cannot supply the living input. Whether frozen material is usable must be shown for the particular protocol; Ladan's assay used fresh tissue.",
  "Throughput and repetition depend on how material can be expanded. A xenograft can be passaged into further mice, but each drug comparison needs suitable animals and controls. An established organoid line can be expanded and passaged to compare a drug panel; Sachs reported retention of many source features during extended passaging, not unlimited fidelity. A cut piece has a finite culture window and a limited number of matched conditions; it cannot simply be expanded while retaining the same original neighbourhood. Ladan's group described viability for up to a week. These are practical preparation contrasts, not a universal numerical throughput ranking or an assumption that every organoid survives freezing. Sources: https://doi.org/10.1016/j.cell.2017.11.010 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC10542784/",
  "The useful trade-off is preserved biology against time and repeatability. A characterised PDX supports growth under whole-animal dosing, usually on a months-long establishment clock. Expanded organoids support repeated direct tumour-cell experiments and panels, often over weeks; conventional epithelial cultures usually lack immune cells, while Neal's specialised method retained them. A short-term fragment may preserve resident neighbours for a local-interaction question over days, but their function must be demonstrated. No preparation is universally more predictive because it is more complex. Sources: https://doi.org/10.1016/j.cell.2018.11.021 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC4167608/",
  "The clocks and take rates below belong to different studies. Hidalgo's review described four to eight months to a study-ready PDX. Izumchenko reported 578/1,163 establishment and mean 16 weeks from engraftment to drug exposure, with tumour-type variation: 85 percent in colorectal specimens and 30 percent in breast specimens in that series. Cartry reported a 61.5 percent core-biopsy take rate and six-week median, range four to ten weeks, to a 25-drug colorectal organoid panel. Boileve reported 54/87 establishment (62 percent) and mean 6.8 weeks to a pancreatic chemogram. Ladan used three-day exposures and stated that results can be known in seven to fourteen days; this is a planned window, not an observed turnaround distribution. There were 23/30 usable tests from tumour-containing biopsies. The PDX paper reports 49 percent for 578/1,163; direct count arithmetic is approximately 49.7 percent.",
  "Ladan's breast-slice pilot found 15/20 category matches (75 percent; reported confidence interval 53 to 89 percent), against a pre-set target of at least 55 percent, between the ex vivo anthracycline assay and MRI response after four courses of anthracycline-containing treatment. Both systems used sensitive, intermediate and resistant categories, and neither observed a resistant tumour. Of five disagreements, three were ex vivo sensitive with intermediate MRI response and two the reverse. Among the 23 successful laboratory tests, six were sensitive and 17 intermediate; among the 20 MRI comparisons, four were sensitive and 16 intermediate. This leaves resistance detection untested rather than established. Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC10542784/",
  "Other agreement measures answer different questions. Vlachogiannis reported 88 percent positive and 100 percent negative predictive values in 21 drug-response comparisons in heavily pretreated gastrointestinal cancers. Boileve reported 83.3 percent sensitivity and 92.9 percent specificity in 34 evaluable pretreated pancreatic patients. Izumchenko compared 129 treatments across 92 patients: 112/129 agreement grouped stable disease with partial and complete responses, while exact-category agreement was 91/129. These endpoints and selected denominators cannot be ranked as head-to-head accuracy or taken as proof that model-guided care improves survival.",
  "Voabil's primary abstract reports that immune-cell reactivation after ex vivo PD-1 blockade in patient-derived tumour fragments predicted clinical response in that study, with perturbation analyses identifying tumour-resident T cells as a key component. This supports a scoped fragment/immune-interaction example, not evidence that choosing treatment from a fragment test improves outcomes. A near-term decision may rule out establishing a new conventional PDX, but does not guarantee a usable fragment; immune presence, movement, recognition and killing remain distinct measurements. Source: https://doi.org/10.1038/s41591-021-01398-3",
  "Dijkstra's colorectal and lung organoid study used master and working biobanks, cryopreserved cultures and experiments below passage 30. That demonstrates a specified bank-and-recovery workflow for those established organoid cultures. It does not show that every organoid line or fresh tumour fragment can be frozen, recovered and retested with unchanged properties. Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC6558289/"
],
    "links": [{"label":"PDX review","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC4167608/"},{"label":"PDX primary denominators and response definitions","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5834154/"},{"label":"Cartry colorectal organoids","url":"https://doi.org/10.1186/s13046-023-02853-4"},{"label":"Boileve pancreatic organoids","url":"https://doi.org/10.1053/j.gastro.2024.05.032"},{"label":"Ladan breast slices","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC10542784/"},{"label":"Vlachogiannis gastrointestinal organoids","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC6112415/"},{"label":"Voabil et al. 2021: tumour fragments and PD-1 blockade","url":"https://doi.org/10.1038/s41591-021-01398-3"},{"label":"Sachs et al. 2018: long-term breast organoid culture","url":"https://doi.org/10.1016/j.cell.2017.11.010"},{"label":"Neal et al. 2018: specialised immune-containing organoids","url":"https://doi.org/10.1016/j.cell.2018.11.021"},{"label":"DeRose et al. 2011: graft species compartments","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC3553601/"}],
    "category": "Methods and models",
    "technologies": [
      "pdx-models",
      "organoids",
      "functional-drug-testing"
    ]
  }
];
