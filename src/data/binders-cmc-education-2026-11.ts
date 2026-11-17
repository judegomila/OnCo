import type { TermInput } from "@/lib/schema";

/** Binder discovery and manufacturing concepts with scoped evidence and interpretation limits. */
export const bindersCmcEducation2026: TermInput[] = [
  {
    "id": "binder-discovery",
    "kind": "term",
    "name": "Binder discovery",
    "aka": [
      "binder discovery",
      "hybridoma, phage display and yeast display",
      "AI binder design"
    ],
    "tldr": "Researchers find candidate recognition molecules by fusing antibody-making cells with long-lived cells, by displaying candidates on viruses or yeast and keeping those that stick, or by designing proteins on a computer. Each route gives candidates that still have to be made and tested.",
    "summary": "Four routes to candidate binders are described in primary experiments. In 1976 Köhler and Milstein fused spleen cells from immunised mice with myeloma cells; the hybrid lines grew in culture and about 10 per cent of them showed activity against the sheep red cells used to immunise, so each line had to be tested for what it made. In 1990 McCafferty and colleagues displayed complete antibody variable domains on filamentous phage, showed that the phage bound antigen specifically, and isolated rare phage (one in a million) by affinity chromatography. In 1997 Boder and Wittrup displayed single-chain antibody fragments on yeast and used flow cytometry to compare binding kinetics, selecting a variant with a threefold lower dissociation rate. In 2023 Watson and colleagues designed binders to five targets with the RFdiffusion network, took 95 designs per target, expressed and purified them from E. coli and screened them by single-point biolayer interferometry at 10 micromolar; binding at or above half the maximal response of a positive control counted as success, the overall rate was 19 per cent, and full titrations on a subset of designs showed nanomolar affinities. Each result is a measured interaction under stated laboratory conditions. A selected, enriched or designed sequence is a candidate; the studies do not test activity in cells in a patient, absence of binding to healthy tissue, or clinical benefit.",
    "asOf": "2026-11-14",
    "links": [
      {
        "label": "Köhler and Milstein, 1976: derivation of specific antibody-producing tissue culture and tumor lines by cell fusion",
        "url": "https://doi.org/10.1002/eji.1830060713"
      },
      {
        "label": "McCafferty et al., 1990: phage antibodies, filamentous phage displaying antibody variable domains",
        "url": "https://doi.org/10.1038/348552a0"
      },
      {
        "label": "Boder and Wittrup, 1997: yeast surface display for screening combinatorial polypeptide libraries",
        "url": "https://doi.org/10.1038/nbt0697-553"
      },
      {
        "label": "Watson et al., 2023: de novo design of protein structure and function with RFdiffusion",
        "url": "https://doi.org/10.1038/s41586-023-06415-8"
      }
    ],
    "related": [
      "epitope",
      "de-novo-protein-design",
      "ai-drug-design"
    ],
    "notes": [
      "Sources and depth. The three older papers were read at abstract level only; Watson et al. (2023) was read in open-access full text for the screening method, the 19 per cent success definition and the subset titrations. A computational design counts as a binder only after it is made and measured: in Watson et al. 95 designs per target were screened at 10 micromolar and only designs at or above half the control's maximal response counted, so most tested designs did not meet that criterion, and ranking scores are predictions.",
      "Enriched is not fully specific. Phage selection recovers rare phage (one in a million in McCafferty et al., 1990) under the conditions used, which favours binding under those conditions and not specificity across all targets. Boder and Wittrup (1997) used quantitative flow cytometry to compare kinetics on yeast; display level and binding strength are separate quantities, and a brighter cell is not automatically a better isolated binder. The display-level point is a general reading rule; the abstract does not describe a separate display measurement.",
      "Selection against a purified or tagged target can miss the native epitope on cells or select a binder to the tag or an altered preparation, so a hit is retested outside its selection system with target-negative, unrelated-protein and tag controls. This is general experimental practice stated in the source lesson; none of the four primary papers here tests it, and binding to a cancer-associated protein does not show absence of binding to healthy tissue.",
      "Assay card for a discovery hit. Input and consumption: clones or expressed proteins, defined target preparations and cell controls, with finite aliquots. Output and units: selected sequences, binding curves and assay-specific fluorescence, with a computational rank a different output. Threshold: define a hit relative to assay controls, with no universal therapeutic-binder threshold. Failure modes: display level, enrichment bias, tag binding, aggregation and target preparation. Validation tier: discovery and preclinical interaction evidence, not a clinical prediction.",
      "Phage display connects the displayed candidate to its coding gene in the same carrier (McCafferty et al., 1990). Recovery and sequencing identify the candidate to make and retest as a separate protein. Unretained means not recovered in that selection, not proven unable to bind. In a fictional example, 60 computer-ranked candidates yield eight purified proteins. Two bind a tagged target but also bind the tag alone. No intended-target binder has been established yet: the two results do not separate target recognition from tag recognition. A different target preparation and suitable controls are needed. This does not prove that none of the 60 could bind; the rankings themselves are predictions."
    ],
    "category": "Biology basics",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-14"
    }
  },
  {
    "id": "peptide-synthesis-spps",
    "kind": "term",
    "name": "Solid-phase peptide synthesis",
    "aka": [
      "SPPS",
      "peptide synthesis",
      "Fmoc solid-phase peptide synthesis"
    ],
    "tldr": "Peptides are built by holding the growing chain on a solid support and adding one amino acid at a time. Making the chain is a separate step from purifying it, confirming it is the right molecule and releasing it as a medicine.",
    "summary": "In solid-phase peptide synthesis the growing chain is held on a resin while protected amino acids are added one at a time and soluble reagents are washed away; the finished chain is then cleaved from the resin. Sequence changes how hard this is: peptides rich in aggregation-prone sequences are difficult, and a 2014 report described automated backbone protection that improved handling, quality and yield of several challenging sequences. For personalised cancer vaccines, an automated flow synthesiser made 30-mer peptides in under 35 minutes and 15 to 16-mers in under 20 minutes, with purity comparable to or higher than other methods (Truex et al., 2020). The same paper reports what the earlier route cost: of 598 immunising peptides designed and ordered in earlier studies, 400 (67 per cent) could be synthesised and purified to at least 95 per cent purity, with a median turnaround from design to synthesis of 18 to 20 weeks in those studies, and a commercial vendor returned 10 of 29 test peptides at more than 95 per cent HPLC purity; these 29 peptides had been deliberately selected because they were particularly difficult and time-consuming to make, rather than as a typical vendor workload. In that paper mass spectrometry of the unpurified peptides showed the desired mass as the main product for all 29, and purity was measured separately by analytical reverse-phase HPLC. Synthesis, purification, identity testing and lot release are separate steps, and a peptide that is made and pure has not been shown to prime T cells or to benefit a patient.",
    "asOf": "2026-11-14",
    "links": [
      {
        "label": "Truex et al., 2020: automated flow synthesis of tumor neoantigen peptides for personalized immunotherapy",
        "url": "https://doi.org/10.1038/s41598-019-56943-5"
      },
      {
        "label": "Abdel-Aal et al., 2014: automated synthesis of backbone protected peptides",
        "url": "https://doi.org/10.1039/c4cc03065f"
      }
    ],
    "related": [
      "neoantigen-mrna-vaccine",
      "cdmo",
      "peptide-drug-conjugate"
    ],
    "notes": [
      "The cycle, as run in the neoantigen paper. Truex et al. (2020) used Fmoc-based solid-phase synthesis: the C-terminal amino acid was loaded onto a resin, the terminal protecting group was removed (Fmoc removal was followed by UV detection), the next activated protected amino acid was coupled in excess and soluble reagents were washed away, and the cycle repeated. Flow conditions achieved amide-bond coupling in seconds where standard batch methods need minutes to hours. The finished chain was cleaved and lyophilised as a trifluoroacetic acid salt.",
      "Sequence difficulty. Chain association (aggregation) of growing peptides blocks coupling, and double coupling does not help because the cause is intermolecular association; introducing removable backbone protection improved handling, quality and yield of several challenging sequences (Abdel-Aal et al., 2014). Washing removes soluble material but does not repair a faulty chain. This study did not make every peptide equally easy.",
      "After cleavage the crude peptide is a mixture needing purification and characterisation, and the synthesiser's last step is not a release decision. In Truex et al. electrospray mass spectrometry of the unpurified products showed the desired mass as the main product for all 29 test peptides, while purity was measured separately by analytical reverse-phase HPLC at 214 nm, with greater than 95 per cent HPLC purity used as the purity criterion. In that deliberately difficult 29-peptide commercial-vendor comparison, 17 peptides were synthesised, 10 passed after purification, and 7 stayed at 89 to 94 per cent even after two or three rounds. The 95 per cent figure is that paper's criterion, not a clinical-release threshold.",
      "Assay peptides versus the clinical product. The same paper made 15 to 16-mer peptides for immune-assessment assays and longer immunising peptides of up to 30 residues for vaccination, and its authors describe clinical-grade manufacture as something they envision. Making an assay peptide does not show manufacture of a formulated, released vaccine product, and chemical assembly does not select a useful cancer antigen or show benefit. A shorter instrument run does not establish the turnaround of the whole program.",
      "The C-terminal, or carboxyl, end stays attached to the resin while additions extend the chain at its amino end. The tether stays in place through the repeated removal, coupling and washing cycle. Cleavage and removal of remaining protecting groups come before purification and final product release."
    ],
    "category": "Treatment jargon",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-14"
    }
  },
  {
    "id": "batch-release",
    "kind": "term",
    "name": "Batch release (lot disposition)",
    "aka": [
      "batch release",
      "lot release",
      "batch disposition"
    ],
    "tldr": "Batch release is the documented quality decision about one lot of a product. A set of passing test results supports that decision but is not the same thing, and a released lot has not been shown to help any patient.",
    "summary": "In the US, drug production and control records are reviewed and approved by the quality control unit before a batch is released or distributed, and any unexplained discrepancy or failure of a batch to meet a specification must be thoroughly investigated whether or not the batch has been distributed (21 CFR 211.192). The decision therefore draws on test results with their methods and acceptance criteria, manufacturing and deviation records, and the identity of the lot and product version; a certificate of analysis can summarise results but does not replace that review. FDA's 2022 guidance on out-of-specification results says the practice of repeating a test until a passing result is obtained and then disregarding the failing results without scientific justification is 'testing into compliance', which it calls unscientific and objectionable under CGMP. That guidance covers chemistry-based laboratory testing; it says it is not intended to address biological assays, so a copied retest procedure cannot be assumed to fit a cell or potency assay. A lot can be released, held pending review or rejected; a result that has not arrived is neither a pass nor a failure. Release of a lot is a quality decision, separate from regulatory authorisation of the product, from a patient's eligibility, and from evidence of clinical benefit.",
    "asOf": "2026-11-14",
    "links": [
      {
        "label": "21 CFR 211.192: production record review",
        "url": "https://www.ecfr.gov/current/title-21/section-211.192"
      },
      {
        "label": "FDA: investigating out-of-specification test results for pharmaceutical production (May 2022)",
        "url": "https://www.fda.gov/media/158416/download"
      },
      {
        "label": "FDA: quality systems approach to pharmaceutical CGMP regulations (September 2006)",
        "url": "https://www.fda.gov/media/71023/download"
      },
      {
        "label": "21 CFR 211.22",
        "url": "https://www.ecfr.gov/current/title-21/section-211.22"
      },
      {
        "label": "21 CFR 211.80",
        "url": "https://www.ecfr.gov/current/title-21/section-211.80"
      },
      {
        "label": "21 CFR 211.84",
        "url": "https://www.ecfr.gov/current/title-21/section-211.84"
      },
      {
        "label": "21 CFR 211.142",
        "url": "https://www.ecfr.gov/current/title-21/section-211.142"
      },
      {
        "label": "21 CFR 610.1",
        "url": "https://www.ecfr.gov/current/title-21/section-610.1"
      },
      {
        "label": "21 CFR 610.2",
        "url": "https://www.ecfr.gov/current/title-21/section-610.2"
      },
      {
        "label": "FDA: final Potency Assurance for Cellular and Gene Therapy Products (November 2026 PDF)",
        "url": "https://www.fda.gov/media/196183/download"
      },
      {
        "label": "FDA: final potency-assurance guidance (November 2026)",
        "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-potency-assurance-cellular-and-gene-therapy-products"
      },
      {
        "label": "Federal Register: final potency-assurance guidance, 3 November 2026",
        "url": "https://www.federalregister.gov/documents/2026/11/03/2026-22427/potency-assurance-for-cellular-and-gene-therapy-products-guidance-for-industry-availability"
      },
      {"label":"FDA: vaccine CMC for licence applications (January 1999)","url":"https://www.fda.gov/media/73614/download"}
    ],
    "related": [
      "good-manufacturing-practice",
      "cell-therapy-release-testing",
      "radiopharmaceutical-gmp-release",
      "car-t-manufacturing-process"
    ],
    "notes": [
      "A lot-release decision concerns one identified batch. Good manufacturing practice concerns the quality system; cell and gene products add product-specific biological, identity and handling questions, while radiopharmaceuticals add the constraints of radioactive decay.",
      "A lot is identified material made under a defined manufacturing record, and a specification connects named tests and methods to acceptance criteria; ICH Q6B defines a specification as a list of tests, references to analytical procedures and acceptance criteria. Release concerns that lot, not the general reputation of its manufacturer.",
      "What a release review brings together: test results with their methods and criteria, manufacturing and deviation records, lot and version identity, and stability and handling information. In US finished-drug rules the quality control unit reviews and approves production and control records before a batch is released or distributed (21 CFR 211.192). A certificate of analysis may summarise results but does not replace that review.",
      "Dispositions. FDA's quality-systems guidance describes the quality unit approving or rejecting materials and drug products; US regulations give the quality unit authority to approve or reject materials and drug products (21 CFR 211.22(a)); other provisions describe quarantine or withholding from use while materials or products await release (211.80(d), 211.84(a), 211.142(a)). Hold pending review is a plain-language description of that unresolved disposition. A result that has not arrived is neither a pass nor a failure. Inference lesson: a spreadsheet that reports all tests passed because it lists only completed tests has lost the missingness information; with a required activity result pending, completed release is not established.",
      "Out-of-specification handling. FDA's May 2022 guidance calls repeated testing until a pass followed by disregarding the failures without scientific justification testing into compliance, which it describes as unscientific and objectionable under CGMP. It asks that the number of retests be set in advance in a procedure and not adjusted according to results, and it contrasts averages: initial 89 then 90 and 91 per cent averages 90 and tends to confirm the failure, while 80 then 85 and 105 also averages 90 but presents a very different picture. Releasing despite an initial failure that has not been invalidated should follow a full investigation. The guidance applies to chemistry-based laboratory testing of drugs regulated by CDER and says it is not intended to address biological assays, so it cannot simply be copied for a cell or potency assay.",
      "Release is a quality decision. It is separate from regulatory authorisation of the product, a patient's eligibility and evidence of benefit, and a released stamp on a report does not answer those. For US licensed biological products, manufacturer release follows completion of applicable tests under 21 CFR 610.1. Separately, under 610.2 FDA may require samples and protocols and, on notification, bar distribution until the relevant CBER or CDER Director releases the lot. These are distinct manufacturer and official-release steps; this example does not establish other jurisdictions' rules.",
      "A test on bulk or intermediate material concerns the material sampled at that process stage. FDA's January 1999 vaccine CMC guidance for licence applications separates drug substance from formulated bulk and finished product, with manufacturing, filling and finished-product sampling information. A pre-fill quality-control box in a diagram therefore does not by itself establish the identity, purity, potency or sterility of filled vials or final release. Apply the product's specified tests and quality review; the drawing supplies neither a universal test order nor release criteria."
    ],
    "category": "Regulatory",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  },
  {
    "id": "platform-vs-personalized-components",
    "kind": "term",
    "name": "Platform and personalised components of a product",
    "aka": [
      "platform versus personalised components",
      "shared and individual product components"
    ],
    "tldr": "Some parts of a personalised treatment are reused for every recipient, such as the manufacturing process. Others are chosen for one person, such as the sequence of the vaccine or the person's own cells. Each actual batch still needs to be checked on its own.",
    "summary": "Individualised products reuse some components and personalise others, and the two need separate evidence. In the phase 1 study of autogene cevumeran in resected pancreatic cancer (Rojas et al., 2023), individual vaccines of up to 20 neoantigens per patient were made in real time as uridine mRNA-lipoplex nanoparticles; 16 patients received atezolizumab and the vaccine, 15 subsequently received mFOLFIRINOX chemotherapy, and new neoantigen-specific T cells were detected in 8 of the 16 patients, and it shows one defined design carrying individual messages, not that all RNA vaccines share a recipe or outcome. In mice, a peptide-TLR-7/8a conjugate platform was built to self-assemble into nanoparticles of uniform size (about 20 nm) whatever the peptide, to address the physicochemical variability of neoantigens (Lynn et al., 2020). For autologous CAR T cells, FDA's 2024 guidance notes variability in the starting cells and recommends maintaining chain of identity from collection to administration, with at least two unique identifiers on labels of autologous products. A shared process and specification can support consistent handling and repeatable testing, but they do not establish that a new sequence or a changed process is equivalent to an earlier one, that a lot made for one recipient can be accepted on another recipient's results, or that the encoded targets are presented and recognised in a patient. 'Platform' here is a descriptive term for reuse, not a regulatory designation.",
    "asOf": "2026-11-10",
    "links": [
      {
        "label": "Rojas et al., 2023: personalized RNA neoantigen vaccines stimulate T cells in pancreatic cancer",
        "url": "https://doi.org/10.1038/s41586-023-06063-y"
      },
      {
        "label": "Lynn et al., 2020: peptide-TLR-7/8a conjugate vaccines chemically programmed for nanoparticle self-assembly",
        "url": "https://doi.org/10.1038/s41587-019-0390-x"
      },
      {
        "label": "FDA: considerations for the development of CAR T cell products (January 2024)",
        "url": "https://www.fda.gov/media/156896/download"
      },
      {
        "label": "FDA: content and format of chemistry, manufacturing and controls information and establishment description information for a vaccine or related product (January 1999)",
        "url": "https://www.fda.gov/media/73614/download"
      },
      {
        "label": "FDA: Platform Technology Designation Program for Drug Development (May 2024 draft)",
        "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/platform-technology-designation-program-drug-development"
      }
    ],
    "related": [
      "neoantigen-mrna-vaccine",
      "car-t-manufacturing-process",
      "good-manufacturing-practice",
      "batch-release"
    ],
    "notes": [
      "The single question to ask: is this feature deliberately reused across recipients, or selected for this recipient? Personalisation may concern an antigen sequence, a receptor sequence, the person's own cells or a combination, and need not mean that every reagent or step is redesigned. The answer depends on the program.",
      "Platform is a teaching description of reuse and not a regulatory designation or authorisation. Reuse can support consistent handling, shared process learning and repeatable testing, and the two sides commonly work together; neither wins on efficacy by itself.",
      "Shared process evidence informs but does not replace lot-level evidence. Inference lesson: if recipients A and B share RNA features and formulation but carry different antigen messages, a lot made for A that passes identity and quality checks does not allow lot B to be accepted; B must match its own specification and meet its own applicable checks, with traceability.",
      "Different kinds of personalisation. Rojas et al. (2023) made individual mRNA-lipoplex vaccines of up to 20 neoantigens in real time (phase 1: 16 received atezolizumab and vaccine, followed by mFOLFIRINOX in 15). Lynn et al. (2020) built peptide conjugates to self-assemble into nanoparticles of about 20 nm whatever the peptide, to address neoantigen variability in mice. FDA's 2024 CAR T guidance notes variability in starting cells and recommends maintaining chain of identity from collection to administration, with at least two unique identifiers on autologous product labels. An individually selected receptor and an individual's own cells are different personalisation.",
      "Quality categories. FDA's 1999 vaccine CMC guidance asks for characterisation with respect to identity, purity, potency and stability; it is dated and scoped to vaccine applications, so it illustrates categories and is not a rulebook for every individualised modality. No universal personalised-product cutoff exists. Passing release criteria does not show that antigens were selected correctly, presented naturally or that treatment benefits people.",
      "The FDA also uses Platform Technology Designation for a separate formal programme under section 506K. Its May 2024 draft guidance describes designation requests and eligibility factors. Shared components or a manufacturing recipe do not by themselves establish that designation; platform in this entry means the described reuse of product components."
    ],
    "category": "Treatment jargon",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  },
  {
    "id": "good-manufacturing-practice",
    "kind": "term",
    "name": "Good manufacturing practice (GMP)",
    "aka": [
      "GMP",
      "current good manufacturing practice"
    ],
    "tldr": "Good manufacturing practice is the set of controls over people, materials, equipment, procedures and records that is meant to make each batch of a medicine consistently as it should be. It is a property of how a product is made, not a finding about whether the treatment works.",
    "summary": "The US Food and Drug Administration describes current good manufacturing practice (CGMP) as systems that assure proper design, monitoring and control of manufacturing processes and facilities, including quality management systems, suitable raw materials, written operating procedures, detection and investigation of deviations, and reliable testing laboratories; the 'C' stands for current, meaning technologies and systems must be up to date. FDA's quality-systems guidance gives a quality unit the job of reviewing procedures, evidence and departures from the intended process. Requirements depend on stage: most phase 1 investigational drugs are exempt from 21 CFR part 211 under 21 CFR 210.2(c), but FDA's 2008 phase 1 guidance applies CGMP under section 501(a)(2)(B) of the Food, Drug, and Cosmetic Act to them, so 'investigational' does not mean quality controls are optional. A passing final test does not close the process question: an unexplained substitution or missing record needs its own documented assessment. GMP concerns how a product is made; the product dossier (chemistry, manufacturing and controls), the decision on one lot (batch release) and clinical evidence answer different questions.",
    "asOf": "2026-11-10",
    "links": [
      {
        "label": "FDA: facts about the current good manufacturing practice (CGMP)",
        "url": "https://www.fda.gov/drugs/pharmaceutical-quality-resources/facts-about-current-good-manufacturing-practice-cgmp"
      },
      {
        "label": "FDA: quality systems approach to pharmaceutical CGMP regulations (September 2006)",
        "url": "https://www.fda.gov/media/71023/download"
      },
      {
        "label": "FDA: current good manufacturing practice for phase 1 investigational drugs (July 2008)",
        "url": "https://www.fda.gov/media/70975/download"
      }
    ],
    "related": [
      "pharmaceutical-gmp-inspections",
      "radiopharmaceutical-gmp-release",
      "cdmo",
      "batch-release"
    ],
    "notes": [
      "Good manufacturing practice concerns the quality system of people, procedures, materials, equipment and records. Batch release concerns the decision about one lot, while cell and gene products require product-specific release and potency evidence. These related questions are not interchangeable.",
      "GMP combines people, procedures, materials, equipment and records into a working quality system. FDA's CGMP page says it covers quality management systems, quality raw materials, written operating procedures, detection and investigation of deviations and reliable testing laboratories, and that the C stands for current, requiring technologies and systems that are up to date. A clean room is one part of the system and not proof of compliance by itself.",
      "In-process controls and the final sample. FDA's quality-systems guidance describes quality control as assessing incoming components, in-process materials and finished product and evaluating how the manufacturing process performs. A final sample answers a narrower question about tested material and cannot reconstruct an unrecorded process, so a passing final test does not close the question raised by, for example, an unexplained material substitution.",
      "The quality unit approves or rejects incoming materials, in-process materials and drug products, reviews production records and investigates unexplained discrepancies. Investigating a deviation asks what happened, which material may be affected and how to prevent recurrence; a missing record and a failed test are different findings that both need an explanation.",
      "Changes need control, because replacing a supplier or a processing step may alter the product. Q5E-style comparability asks whether relevant quality remains comparable; it does not assume that a familiar product name means unchanged biology.",
      "Stage. Most phase 1 investigational drugs are exempt from 21 CFR part 211 under 21 CFR 210.2(c), and FDA's 2008 guidance applies CGMP under section 501(a)(2)(B) of the Federal Food, Drug, and Cosmetic Act to them, so investigational does not mean quality controls are optional. GMP supports reliable clinical investigation; it does not show efficacy."
    ],
    "category": "Regulatory",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  }
];
