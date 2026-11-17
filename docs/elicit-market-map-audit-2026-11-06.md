# Elicit AI for Pharma map coverage audit

Checked 2026-11-06 against https://elicit.com/ai-for-pharma and the OnCo data worktree. Related issue: #362.

## Scope and limits

The retrieved HTML contains **151 distinct company table rows**. Its metadata description still says 138, so this inventory uses the actual rows, not the metadata. All 151 names were inventoried and checked for existing named records or known aliases. **This is not a claim that every vendor's oncology relevance has been fully researched.** Candidates explicitly marked not fully verified remain open research work, not rejected entities. No funding, valuation, employee count, partnership total or efficacy estimate from the map was imported.

Eleven missing companies received official-source checks of oncology relevance and location and were added in `src/data/companies-elicit-map.ts`. Elicit itself was added elsewhere in the same task. Company addresses were checked against official contact, location, legal or partner-announcement pages. Where only an office or business address is supported, the record says so instead of asserting a headquarters. None uses a made-up country code.

Existing company matches count named entities, not arbitrary substring hits. BCG therapy, Tecan/-tecan drug names, H1 gene names and Bain Capital are specifically not treated as vendor matches. Parent-company, source-catalogue and model-only coverage are separated from standalone company coverage.

The retrieved page refers to a watchlist in news prose but does not expose a populated watchlist in its company table. No completeness claim is made for that separate watchlist. This inventory concerns the 151 mapped vendor rows.

## Raw-source access check

A direct public-HTTP pass retrieved full HTML for 18 of the 21 distinct evidence and location URLs used by the eleven additions. Both Certara URLs and the Syneos Health careers locations URL returned HTTP 403. Those three pages were successfully read through source-extracted web page text, including the oncology service description and Radnor/Morrisville addresses, but were not verified against literal HTML. No direct retry was made after those denials. This limitation does not apply to the remaining eighteen URLs.

## Status counts

- Existing company: 28
- Candidate not fully verified: 102
- Added verified company: 11
- Existing model only: 1
- Existing source only: 1
- Existing parent only: 2
- Existing resource: 1
- Added in same task: 1
- Existing source: 1
- Existing provider only: 1
- Candidate, parent-related: 1
- Existing related companies: 1

## Source-checked additions

- **Adimab** (`adimab`): Adimab discovers and engineers antibodies for drug developers, including partners developing cancer medicines.
  - Oncology evidence: https://www.ono-pharma.com/en/news/20230927.html
  - Location evidence: https://www.ono-pharma.com/en/news/20230927.html
  - Qualification: Location is stated in Ono's announcement.
- **AI Proteins** (`ai-proteins`): AI Proteins designs small proteins as possible medicines and lists cancer research programmes that would carry radiation to a target.
  - Oncology evidence: https://www.aiproteins.com/pipeline
  - Location evidence: https://www.aiproteins.com/legal/privacy-policy
  - Qualification: Location is the company's business address in its privacy policy, not a separately verified headquarters designation.
- **Twist Bioscience** (`twist-bioscience`): Twist Bioscience supplies synthetic DNA and antibody-discovery tools for cancer research.
  - Oncology evidence: https://www.twistbioscience.com/applications/cancer-research/cancer-research-solutions
  - Location evidence: https://www.twistbioscience.com/applications/cancer-research/cancer-research-solutions
  - Qualification: Headquarters is stated in the official page footer.
- **PhaseV** (`phasev`): PhaseV provides software for planning and analysing clinical trials, including cancer studies.
  - Oncology evidence: https://www.phasevtrials.com/resources/advancing-oncology-trials-with-covariate-adjustment
  - Location evidence: https://www.phasevtrials.com/contact
  - Qualification: The contact page lists offices in Boston, USA, and Tel Aviv, Israel, without identifying a sole headquarters. US identifies the listed Boston office, not exclusive operations.
- **BenchSci** (`benchsci`): BenchSci develops research software that proposes drug targets and combinations, including early laboratory work in lung cancer.
  - Oncology evidence: https://www.benchsci.com/news/introducing-the-hypothesis-generation-agent
  - Location evidence: https://www.benchsci.com/contact
  - Qualification: Location is the company's published contact address.
- **Causaly** (`causaly`): Causaly provides software for searching biomedical evidence and exploring potential drug targets, including in prostate cancer.
  - Oncology evidence: https://www.causaly.com/resources/downloads
  - Location evidence: https://www.causaly.com/about
  - Qualification: No treatment effectiveness claim is inferred from a target-discovery resource.
- **Cytel** (`cytel`): Cytel provides statistical design and analysis services for cancer clinical trials.
  - Oncology evidence: https://cytel.com/solutions/specialty-areas/oncology/
  - Location evidence: https://eastbayes.cytel.com/terms-of-use-agreement
  - Qualification: Location is the principal place of business in the published East BAYES agreement. Reading that agreement does not imply acceptance.
- **Certara** (`certara`): Certara supplies modelling software and advice used to plan cancer drug doses and clinical development.
  - Oncology evidence: https://www.certara.com/accelerating-oncology-drugdevelopment-with-biosimulation-andregulatory-strategy/
  - Location evidence: https://www.certara.com/company/our-locations/
  - Qualification: No funding, market value or performance estimate from the vendor map is adopted.
- **Almac** (`almac`): Almac provides laboratory and drug-development services, including cancer biomarker assays and companion-diagnostic development.
  - Oncology evidence: https://www.almacgroup.com/diagnostics/global-laboratories/platforms-technologies/
  - Location evidence: https://www.almacgroup.com/our-locations
  - Qualification: The company record represents Almac Group; the oncology evidence describes its Diagnostic Services business.
- **Signant Health** (`signant-health`): Signant Health provides clinical-trial technology, including tools for collecting patient-experience data in cancer studies.
  - Oncology evidence: https://signanthealth.com/science/therapeutic-areas
  - Location evidence: https://signanthealth.com/company/global-locations
  - Qualification: The location field records a verified US office. The source does not identify a sole global headquarters.
- **Syneos Health** (`syneos-health`): Syneos Health runs clinical-development services for cancer drug studies, including early trials of antibody-drug conjugates and radiopharmaceuticals.
  - Oncology evidence: https://www.syneoshealth.com/therapeutic-depth/oncology-and-hematology/early-phase-oncology-cro
  - Location evidence: https://www.syneoshealth.com/clinical-corporate-careers/locations
  - Qualification: Company location comes from the corporate-headquarters address on its careers locations page; stale stock-listing text there is not adopted.

## All mapped vendors

| Map name | Status | Existing or new ID | Evidence / next step |
| --- | --- | --- | --- |
| 10x Genomics | Existing company | 10x-genomics | Matched a named company record; no duplicate added. |
| 4G Clinical | Candidate not fully verified |  | Clinical-trial logistics candidate. An oncology event listing alone is not enough to substantiate an oncology offering. Map placement: Clinical Supply & IRT. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| AI Proteins | Added verified company | ai-proteins | AI Proteins designs small proteins as possible medicines and lists cancer research programmes that would carry radiation to a target. Evidence: https://www.aiproteins.com/pipeline |
| AWS | Candidate not fully verified |  | Do not count substring matches in words such as laws as Amazon Web Services coverage. Map placement: Target ID & Validation, Computational Biology / Bioinformatics, Antibody Design, Clinical Trial Design, Biometrics & Data Sciences, Submissions & Document Generation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Adaptyv Bio | Candidate not fully verified |  | Map placement: Protein Sciences / Production. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Adimab | Added verified company | adimab | Adimab discovers and engineers antibodies for drug developers, including partners developing cancer medicines. Evidence: https://www.ono-pharma.com/en/news/20230927.html |
| Aktana (PharmaForceIQ) | Candidate not fully verified |  | Map placement: Commercial Analytics, Insights & Forecasting. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Albert Invent | Candidate not fully verified |  | Map placement: CMC / Pharmaceutical Sciences. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Alleviate Health | Candidate not fully verified |  | Map placement: Clinical Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| AllianceBoard | Candidate not fully verified |  | Map placement: Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Almac | Added verified company | almac | Almac provides laboratory and drug-development services, including cancer biomarker assays and companion-diagnostic development. Evidence: https://www.almacgroup.com/diagnostics/global-laboratories/platforms-technologies/ |
| AlphaSense | Candidate not fully verified |  | Map placement: Competitive & Scientific Intelligence, Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Anthropic Claude | Candidate not fully verified |  | Map placement: Target ID & Validation, Computational Biology / Bioinformatics, Antibody Design, Protein & Enzyme Design, Cell & Gene Therapy Design, Antibody / Biologics Discovery, Clinical Trial Design, Medical Writing, Submissions & Document Generation, CMC / Pharmaceutical Sciences. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| ArisGlobal | Candidate not fully verified |  | Map placement: Pharmacovigilance & Drug Safety, Submissions & Document Generation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| AssistRx | Candidate not fully verified |  | Map placement: Patient Access & Support. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Atlas Bio | Candidate not fully verified |  | Map placement: Clinical Trial Design. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Automata | Candidate not fully verified |  | Map placement: Robotics & Orchestration. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Axtria | Candidate not fully verified |  | Map placement: Commercial Analytics, Insights & Forecasting. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| BCG | Candidate not fully verified |  | Do not match the Boston Consulting Group vendor to bacillus Calmette-Guerin cancer therapy records. Map placement: Portfolio Strategy & Prioritization, Competitive & Scientific Intelligence, Brand Strategy & Marketing Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Bain | Candidate not fully verified |  | Bain Capital Life Sciences is an investor record, not verification of Bain & Company. Map placement: Portfolio Strategy & Prioritization, Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| BenchSci | Added verified company | benchsci | BenchSci develops research software that proposes drug targets and combinations, including early laboratory work in lung cancer. Evidence: https://www.benchsci.com/news/introducing-the-hypothesis-generation-agent |
| Benchling | Candidate not fully verified |  | Map placement: Computational Biology / Bioinformatics, Biology, Pharmacology & Target Validation, Robotics & Orchestration. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| BioGeometry | Candidate not fully verified |  | Map placement: Structural Prediction & Modeling, Antibody Design. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Biorce | Candidate not fully verified |  | Map placement: Clinical Trial Design. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Biossil | Candidate not fully verified |  | A text mention in another record is not a standalone company record. Map placement: Biomarkers & Companion Diagnostics. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Boltz | Existing model only | boltz | The open model family has a record. That is not verification of a separate vendor company. |
| BranchLab | Candidate not fully verified |  | Map placement: Brand Strategy & Marketing Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Bruker | Existing company | bruker | Matched a named company record; no duplicate added. |
| Causaly | Added verified company | causaly | Causaly provides software for searching biomedical evidence and exploring potential drug targets, including in prostate cancer. Evidence: https://www.causaly.com/resources/downloads |
| Certara | Added verified company | certara | Certara supplies modelling software and advice used to plan cancer drug doses and clinical development. Evidence: https://www.certara.com/accelerating-oncology-drugdevelopment-with-biosimulation-andregulatory-strategy/ |
| Chai Discovery | Existing company | chai-discovery | Matched a named company record; no duplicate added. |
| Charles River | Existing company | charles-river | Matched a named company record; no duplicate added. |
| Citeline | Candidate not fully verified |  | Map placement: Competitive & Scientific Intelligence. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Clarivate | Existing source only | jcr-manual | Journal Citation Reports is in the source catalogue. No standalone company record verified. |
| Collate | Candidate not fully verified |  | Map placement: Submissions & Document Generation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Converge Bio | Candidate not fully verified |  | Map placement: Antibody Design, Antibody / Biologics Discovery. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Convoke | Candidate not fully verified |  | Map placement: Submissions & Document Generation, Competitive & Scientific Intelligence, Scientific Publications & Communications. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Cori Clinical | Candidate not fully verified |  | Map placement: Clinical Trial Design, Submissions & Document Generation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Courier Health | Candidate not fully verified |  | Map placement: Patient Access & Support. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| CoverMyMeds | Candidate not fully verified |  | Map placement: Patient Access & Support. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Cradle | Existing company | cradle-bio | Matched a named company record; no duplicate added. |
| Cytel | Added verified company | cytel | Cytel provides statistical design and analysis services for cancer clinical trials. Evidence: https://cytel.com/solutions/specialty-areas/oncology/ |
| Dash Bio | Candidate not fully verified |  | Map placement: Automated Bioanalysis, Clinical Bioanalysis. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Dassault BIOVIA | Candidate not fully verified |  | Map placement: Computational Chemistry / CADD, CMC / Pharmaceutical Sciences. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Datavant (Aetion) | Existing parent only | datavant | Datavant has a company record. This does not independently verify the map's Aetion label or establish a separate Aetion record. |
| Dotmatics | Candidate not fully verified |  | Map placement: Computational Biology / Bioinformatics. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Doximity | Candidate not fully verified |  | Map placement: HCP Engagement, Sales & Account Management. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| DrugBank | Existing resource | drugbank; drugbank-chembl | Source catalogue and collection coverage, not a standalone company record. |
| Edison Scientific | Candidate not fully verified |  | Map placement: Target ID & Validation, Computational Biology / Bioinformatics, Biomarkers & Companion Diagnostics, Clinical Trial Design. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Elicit | Added in same task | elicit | Company and market-map resource handled in the main task. |
| Evaluate | Existing source | src-evaluate | Evaluate Vantage is represented as a source, not a standalone company record. |
| Flatiron Health | Existing company | flatiron-health | Matched a named company record; no duplicate added. |
| Florence Healthcare | Candidate not fully verified |  | Map placement: Clinical Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Fortrea | Existing company | fortrea | Matched a named company record; no duplicate added. |
| Forus | Candidate not fully verified |  | Map placement: Patient Access & Support. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Foundation Medicine | Existing company | foundation-medicine | Matched a named company record; no duplicate added. |
| Gemini for Science | Existing provider only | google-deepmind; google-health | Google companies exist. The specific Gemini for Science offering was not independently verified. |
| GlobalData | Candidate not fully verified |  | Map placement: Competitive & Scientific Intelligence, Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Gosset | Candidate not fully verified |  | Map placement: Competitive & Scientific Intelligence, Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| H1 | Candidate not fully verified |  | Do not count gene names or alphanumeric substrings as this company. Map placement: Medical Science Liaisons (MSLs), HCP Engagement, Sales & Account Management. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Hamilton | Candidate not fully verified |  | Map placement: Robotics & Orchestration. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| ICON | Existing company | icon-plc | Matched a named company record; no duplicate added. |
| IDBS | Candidate not fully verified |  | Map placement: Nonclinical Safety & Toxicology, Manufacturing & Process. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| IQVIA | Existing company | iqvia | Matched a named company record; no duplicate added. |
| Iambic Therapeutics | Existing company | iambic-therapeutics | Matched a named company record; no duplicate added. |
| Indegene (Trilogy Writing) | Candidate not fully verified |  | Map placement: Medical Writing. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Inductive Bio | Candidate not fully verified |  | Map placement: In-vitro DMPK / ADME, PK/PD & Developability Data. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Inpart | Candidate not fully verified |  | Map placement: Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Insilico Medicine | Existing company | insilico-medicine | Matched a named company record; no duplicate added. |
| K-Dense | Candidate not fully verified |  | Map placement: Target ID & Validation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Katalyze | Candidate not fully verified |  | Map placement: Manufacturing & Process, Quality Assurance, Quality Control & Compliance. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Kinaxis | Candidate not fully verified |  | Map placement: Supply Chain, Planning & Logistics. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Komodo Health | Existing company | komodo-health | Matched a named company record; no duplicate added. |
| L.E.K. | Candidate not fully verified |  | Map placement: Portfolio Strategy & Prioritization, Competitive & Scientific Intelligence, Search & Evaluation, Payer Strategy, Pricing & Contracting. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Latent Labs | Existing company | latent-labs | Matched a named company record; no duplicate added. |
| Lila Sciences | Existing company | lila-sciences | Matched a named company record; no duplicate added. |
| Lumanity | Candidate not fully verified |  | Map placement: Scientific Publications & Communications, Value Dossiers / HTA Submissions, HEOR & Real-World Evidence. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| MadeAi | Candidate not fully verified |  | Map placement: Value Dossiers / HTA Submissions. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| MasterControl | Candidate not fully verified |  | Map placement: CMC / Pharmaceutical Sciences, Manufacturing & Process, Quality Assurance, Quality Control & Compliance. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| McKinsey | Candidate not fully verified |  | Map placement: Portfolio Strategy & Prioritization, Competitive & Scientific Intelligence. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Medable | Existing company | medable | Matched a named company record; no duplicate added. |
| Medidata | Existing company | medidata | Matched a named company record; no duplicate added. |
| Medra | Candidate not fully verified |  | Map placement: Biology, Pharmacology & Target Validation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Metis TechBio | Candidate not fully verified |  | Map placement: Nucleic Acid & Oligonucleotide Design, Device, Delivery & Combination Products. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| MindWalk | Candidate not fully verified |  | Map placement: Antibody Design, Antibody / Biologics Discovery. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Mirendil | Candidate not fully verified |  | Map placement: Computational Biology / Bioinformatics. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Model N | Candidate not fully verified |  | Map placement: Payer Strategy, Pricing & Contracting. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| N-SIDE | Candidate not fully verified |  | Map placement: Clinical Supply & IRT. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| NOETIK | Existing company | noetik | Matched a named company record; no duplicate added. |
| Nabla Bio | Candidate not fully verified |  | Map placement: Antibody Design, Antibody / Biologics Discovery. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Neon Health | Candidate not fully verified |  | Map placement: Patient Access & Support. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Nested Knowledge | Candidate not fully verified |  | Map placement: Scientific Publications & Communications, Value Dossiers / HTA Submissions, HEOR & Real-World Evidence. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Oktopi | Candidate not fully verified |  | Map placement: Program & Project Management. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| OpenAI Rosalind | Candidate not fully verified |  | Map placement: Target ID & Validation, Clinical Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| OpenEvidence | Candidate not fully verified |  | Map placement: HCP Engagement, Sales & Account Management. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Opentrons | Candidate not fully verified |  | Map placement: Robotics & Orchestration. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Oracle | Existing company | oracle-health-sciences | Matched a named company record; no duplicate added. |
| PPD (Thermo Fisher) | Existing parent only | thermo-fisher | The map explicitly labels PPD as Thermo Fisher. Parent record exists; no standalone PPD record added. |
| PPD Evidera | Candidate, parent-related | thermo-fisher | Parent company exists; Evidera offering and relationship not independently checked in this pass. |
| Parexel | Existing company | parexel | Matched a named company record; no duplicate added. |
| PatSnap | Candidate not fully verified |  | Map placement: Competitive & Scientific Intelligence. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Peptone | Candidate not fully verified |  | Map placement: Protein Sciences / Production. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Perceptic | Candidate not fully verified |  | Map placement: Competitive & Scientific Intelligence. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| PhaseV | Added verified company | phasev | PhaseV provides software for planning and analysing clinical trials, including cancer studies. Evidence: https://www.phasevtrials.com/resources/advancing-oncology-trials-with-covariate-adjustment |
| Phylo | Candidate not fully verified |  | Map placement: Target ID & Validation, Computational Biology / Bioinformatics. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Planisware | Candidate not fully verified |  | Map placement: Program & Project Management. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Planview | Candidate not fully verified |  | Map placement: Program & Project Management. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Potato | Candidate not fully verified |  | Map placement: Robotics & Orchestration. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Prima Mente | Candidate not fully verified |  | Map placement: Computational Biology / Bioinformatics, Biomarkers & Companion Diagnostics. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Profluent | Existing company | profluent-bio | Matched a named company record; no duplicate added. |
| Prudentia Sciences | Candidate not fully verified |  | Map placement: Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Pythia Labs | Candidate not fully verified |  | Map placement: Antibody Design. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| QED Science | Candidate not fully verified |  | Map placement: Competitive & Scientific Intelligence. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| QIAGEN | Existing company | qiagen | Matched a named company record; no duplicate added. |
| Radical Numerics | Candidate not fully verified |  | Map placement: Phage & Viral Design. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Reflector Bio | Candidate not fully verified |  | Map placement: Computational Biology / Bioinformatics, PK/PD & Developability Data. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Rivercell | Candidate not fully verified |  | Map placement: Computational Biology / Bioinformatics. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Rivia | Candidate not fully verified |  | Map placement: Clinical Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| SAS | Candidate not fully verified |  | Do not count word fragments or biological abbreviations as this software company. Map placement: Biometrics & Data Sciences. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Schrödinger | Existing company | schrodinger | Matched a named company record; no duplicate added. |
| Signant Health | Added verified company | signant-health | Signant Health provides clinical-trial technology, including tools for collecting patient-experience data in cancer studies. Evidence: https://signanthealth.com/science/therapeutic-areas |
| Solstice Health | Candidate not fully verified |  | Map placement: Brand Strategy & Marketing Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Sorcero | Candidate not fully verified |  | Map placement: Pharmacovigilance & Drug Safety, Medical Science Liaisons (MSLs), Medical Information, Scientific Publications & Communications. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Sparta TrackWise | Candidate not fully verified |  | Map placement: Manufacturing & Process, Quality Assurance, Quality Control & Compliance. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Squad Health | Candidate not fully verified |  | Map placement: Patient Access & Support. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Structura (cryoSPARC) | Candidate not fully verified |  | Map placement: Structural Biology. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Suvoda | Candidate not fully verified |  | Official search results describe oncology trial technology; company identity/location and source-page text need a full verification pass before adding. Map placement: Clinical Supply & IRT. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Syneos Health | Added verified company | syneos-health | Syneos Health runs clinical-development services for cancer drug studies, including early trials of antibody-drug conjugates and radiopharmaceuticals. Evidence: https://www.syneoshealth.com/therapeutic-depth/oncology-and-hematology/early-phase-oncology-cro |
| Tamarind Bio | Candidate not fully verified |  | Map placement: Structural Prediction & Modeling. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Tecan | Candidate not fully verified |  | Do not count names of drugs ending in -tecan as this company. Map placement: Robotics & Orchestration. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Tempus | Existing company | tempus | Matched a named company record; no duplicate added. |
| Thermo Fisher | Existing company | thermo-fisher | Matched a named company record; no duplicate added. |
| TikaMobile | Candidate not fully verified |  | Map placement: Medical Science Liaisons (MSLs). Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Tremont AI | Candidate not fully verified |  | Map placement: Nonclinical Safety & Toxicology. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| TriNetX | Existing company | trinetx | Matched a named company record; no duplicate added. |
| Trinity Life Sciences | Candidate not fully verified |  | Map placement: Payer Strategy, Pricing & Contracting, Value Dossiers / HTA Submissions, Brand Strategy & Marketing Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Triomics | Existing company | triomics | Matched a named company record; no duplicate added. |
| Twist Bioscience | Added verified company | twist-bioscience | Twist Bioscience supplies synthetic DNA and antibody-discovery tools for cancer research. Evidence: https://www.twistbioscience.com/applications/cancer-research/cancer-research-solutions |
| Valkai | Candidate not fully verified |  | Map placement: Clinical Operations. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Veeva | Existing company | veeva-systems | Matched a named company record; no duplicate added. |
| Vibe Bio | Candidate not fully verified |  | Map placement: Portfolio Strategy & Prioritization, Search & Evaluation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Vitroscope | Candidate not fully verified |  | Map placement: Biology, Pharmacology & Target Validation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| VivoSim Labs | Candidate not fully verified |  | Map placement: Nonclinical Safety & Toxicology. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Warp Sciences | Candidate not fully verified |  | Map placement: Medicinal Chemistry, Robotics & Orchestration. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Weave Bio | Candidate not fully verified |  | A text mention in another record is not a standalone company record. Map placement: Medical Writing, Submissions & Document Generation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| Wolters Kluwer | Candidate not fully verified |  | Map placement: HCP Engagement, Sales & Account Management. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| WuXi | Existing related companies | wuxi-apptec; wuxi-biologics; wuxi-xdc | Map uses an umbrella name. These are distinct existing records; do not collapse them into one company. |
| Yseop | Candidate not fully verified |  | Map placement: Medical Writing, Submissions & Document Generation. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| ZS | Candidate not fully verified |  | Map placement: Portfolio Strategy & Prioritization, Medical Science Liaisons (MSLs), HCP Engagement, Sales & Account Management, Brand Strategy & Marketing Operations, Commercial Analytics, Insights & Forecasting. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| a-tune | Candidate not fully verified |  | Map placement: Nonclinical Safety & Toxicology. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
| nPhase | Candidate not fully verified |  | Map placement: Clinical Operations, Biometrics & Data Sciences. Oncology-specific evidence and company identity were not fully checked; no inclusion or exclusion claim. |
