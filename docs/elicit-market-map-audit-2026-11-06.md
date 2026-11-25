# Elicit AI for Pharma map coverage audit

Checked 2026-11-06 against https://elicit.com/ai-for-pharma and the OnCo data worktree. Related issues: #362 and #460. Follow-up evidence checked November 25, 2026.

## Scope and limits

The retrieved HTML contains **151 distinct company table rows**. Its metadata description still says 138, so this inventory uses the actual rows, not the metadata. All 151 names were inventoried and checked for existing named records or known aliases. The November 25 follow-up assigned a disposition to all 103 previously unresolved rows after checking current OnCo names and aliases and reviewing available primary materials. A decision not to add an entry is limited to the sources reviewed, not a claim that the vendor has no oncology work.

The first eleven companies received official-source checks of oncology relevance and location and were added in `src/data/companies-elicit-map.ts`. Elicit itself was added elsewhere in the same task. Company addresses were checked against official contact, location, legal or partner-announcement pages. Where only an office or business address is supported, the record says so instead of asserting a headquarters. None uses a made-up country code.

Existing company matches count named entities, not arbitrary substring hits. BCG therapy, Tecan/-tecan drug names, H1 gene names and Bain Capital are specifically not treated as vendor matches. Parent-company, source-catalogue and model-only coverage are separated from standalone company coverage.

The retrieved page refers to a watchlist in news prose but does not expose a populated watchlist in its company table. No completeness claim is made for that separate watchlist. This inventory concerns the 151 mapped vendor rows.

## Raw-source access check

A direct public-HTTP pass retrieved full HTML for 18 of the 21 distinct evidence and location URLs used by the eleven additions. Both Certara URLs and the Syneos Health careers locations URL returned HTTP 403. Those three pages were successfully read through source-extracted web page text, including the oncology service description and Radnor/Morrisville addresses, but were not verified against literal HTML. That limitation applied to the original pass. On November 25, 2026 both Certara URLs returned HTTP 200 and the direct HTML confirmed the oncology biosimulation material and the Radnor corporate headquarters. The original Syneos careers URL still returned HTTP 403. The current [Syneos office directory](https://www.syneoshealth.com/office-locations) returned HTTP 200 and identifies Morrisville, NC as its corporate headquarters; the early-phase oncology service URL also returned HTTP 200. The company record uses the current office directory.

## Status counts

- Added in same task: 1
- Added verified company: 67
- Existing company: 28
- Existing model only: 1
- Existing parent only: 2
- Existing parent: service verified: 1
- Existing provider only: 1
- Existing related companies: 1
- Existing resource: 1
- Existing source: 1
- Existing source only: 1
- Not added: location not verified: 1
- Not added: oncology use not verified: 43
- Not added: product, not a company: 2

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
  - Location evidence: https://www.syneoshealth.com/office-locations
  - Qualification: Company location comes from the corporate-headquarters address in its current office directory.

## Follow-up screening

The follow-up kept a company when a primary source documented an oncology offering, programme or use case. It included some trial operations, commercial and laboratory suppliers, not just developers of cancer treatments. General capabilities, broad partnerships and executive biographies were not accepted as evidence of a cancer application. A documented lab demonstration is not clinical evidence.

New records cite primary oncology evidence and a published location. Where direct requests were blocked or timed out, primary text was read through extracted source views for Citeline, Hamilton's location, McKinsey, the OpenEvidence Florida filing and Wolters Kluwer. No map descriptions, financing, rankings or effect estimates were imported.

## All mapped vendors

| Map name | Status | Existing or new ID | Evidence / next step |
| --- | --- | --- | --- |
| 10x Genomics | Existing company | 10x-genomics | Matched a named company record; no duplicate added. |
| 4G Clinical | Added verified company | 4g-clinical | Oncology: https://www.4gclinical.com/technology; location: https://www.4gclinical.com/contact-us. |
| AI Proteins | Added verified company | ai-proteins | AI Proteins designs small proteins as possible medicines and lists cancer research programmes that would carry radiation to a target. Evidence: https://www.aiproteins.com/pipeline |
| AWS | Added verified company | amazon-web-services | Oncology: https://aws.amazon.com/solutions/case-studies/caris-life-sciences-case-study/; location: https://www.aboutamazon.com/workplace/corporate-offices. |
| Adaptyv Bio | Added verified company | adaptyv-bio | Oncology: https://adaptyvbio.substack.com/p/crowdsourcing-better-cancer-drugs; location: https://www.adaptyvbio.com/blog/series-a. |
| Adimab | Added verified company | adimab | Adimab discovers and engineers antibodies for drug developers, including partners developing cancer medicines. Evidence: https://www.ono-pharma.com/en/news/20230927.html |
| Aktana (PharmaForceIQ) | Added verified company | pharmaforceiq | Oncology: https://pharmaforceiq.com/accelerated-sales-growth-new-indication-launch/; location: https://pharmaforceiq.com/contact/. |
| Albert Invent | Not added: oncology use not verified |  | Laboratory and manufacturing data software; the company material reviewed did not identify a cancer-specific use or programme. Reviewed: https://www.albertinvent.com/learn |
| Alleviate Health | Not added: oncology use not verified |  | Trial recruitment automation is described in the company’s hiring materials; they do not identify a cancer study or oncology service. Reviewed: https://jobs.ashbyhq.com/alleviatehealth/05bc6239-838c-41f4-a8cd-509f96ee0bc1/ |
| AllianceBoard | Not added: oncology use not verified |  | The reviewed customer examples concern alliance management across pharmaceutical organisations, not a named oncology programme. Reviewed: https://www.allianceboard.com/resources |
| Almac | Added verified company | almac | Almac provides laboratory and drug-development services, including cancer biomarker assays and companion-diagnostic development. Evidence: https://www.almacgroup.com/diagnostics/global-laboratories/platforms-technologies/ |
| AlphaSense | Added verified company | alphasense | Oncology: https://www.alpha-sense.com/resources/case-studies/3t/; location: https://www.alpha-sense.com/contact/. |
| Anthropic Claude | Not added: product, not a company |  | The mapped entry is Anthropic’s Claude product, not a standalone vendor. Anthropic describes a tumour pathology collaboration; no separate company record was created under the product name. Reviewed: https://www.anthropic.com/news/healthcare-life-sciences |
| ArisGlobal | Added verified company | arisglobal | Oncology: https://www.arisglobal.com/media/press-release/medac-selects-lifesphere-safety/; location: https://www.arisglobal.com/contact-us/. |
| AssistRx | Not added: oncology use not verified |  | The vendor mentions that an anonymous patient support customer has an oncology portfolio, but the reviewed case does not identify the therapy or programme served. Reviewed: https://www.assistrx.com/specialty-pharmaceutical-solutions/assistrx-patient-solutions/ |
| Atlas Bio | Not added: oncology use not verified |  | The verified map entity is atlas.bio, not a similarly named company; its page lists oncology experience in a biography, not a cancer study or service. Reviewed: https://atlas.bio/ |
| Automata | Added verified company | automata | Oncology: https://www.automata.tech/company-news/uks-first-robotic-genomic-testing-facility-for-cancer-patients; location: https://www.automata.tech/about-us. |
| Axtria | Added verified company | axtria | Oncology: https://www.axtria.com/customer-success-stories/patient-flow-analysis-for-a-global-oncology-leader; location: https://www.axtria.com/contact-us/. |
| BCG | Added verified company | boston-consulting-group | Oncology: https://www.bcg.com/industries/health-care/oncology-solutions; location: https://www.bcg.com/offices/boston. |
| Bain | Not added: oncology use not verified |  | Bain & Company is distinct from existing investor Bain Capital Life Sciences. The reviewed Bain & Company oncology strategy brief contains market analysis but does not establish a specific offering or documented deployment. Reviewed: https://www.bain.com/contentassets/f9e2ffa38df54b308424980a1621c059/bain_brief_finding_the_path_to_category_leadership_in_oncology.pdf |
| BenchSci | Added verified company | benchsci | BenchSci develops research software that proposes drug targets and combinations, including early laboratory work in lung cancer. Evidence: https://www.benchsci.com/news/introducing-the-hypothesis-generation-agent |
| Benchling | Added verified company | benchling | Oncology: https://www.benchling.com/customer-stories/agenus-building-global-informatics-infrastructure; location: https://www.benchling.com/terms-of-service. |
| BioGeometry | Added verified company | biogeometry | Oncology: https://www.biogeom.com/pipeline/; location: https://www.biogeom.com/contact-us/. |
| Biorce | Not added: oncology use not verified |  | The product page links oncology conference commentary but does not document a cancer trial using the tool. Reviewed: https://www.biorce.com/product |
| Biossil | Added verified company | biossil | Oncology: https://alligatorbioscience.se/en/mfn_news/alligator-bioscience-signs-agreement-to-sell-mitazalimab-to-biossil/; location: https://www.biossil.co/. |
| Boltz | Existing model only | boltz | The open model family has a record. That is not verification of a separate vendor company. |
| BranchLab | Not added: oncology use not verified |  | The reviewed description identifies general commercial analytics; no cancer-specific client workflow was documented there. Reviewed: https://branchlab.com/about |
| Bruker | Existing company | bruker | Matched a named company record; no duplicate added. |
| Causaly | Added verified company | causaly | Causaly provides software for searching biomedical evidence and exploring potential drug targets, including in prostate cancer. Evidence: https://www.causaly.com/resources/downloads |
| Certara | Added verified company | certara | Certara supplies modelling software and advice used to plan cancer drug doses and clinical development. Evidence: https://www.certara.com/accelerating-oncology-drugdevelopment-with-biosimulation-andregulatory-strategy/ |
| Chai Discovery | Existing company | chai-discovery | Matched a named company record; no duplicate added. |
| Charles River | Existing company | charles-river | Matched a named company record; no duplicate added. |
| Citeline | Added verified company | citeline | Oncology: https://citeline.com/resources/biorasi-case-study/; location: https://citeline.com/media-resources/. |
| Clarivate | Existing source only | jcr-manual | Journal Citation Reports is in the source catalogue. No standalone company record verified. |
| Collate | Not added: oncology use not verified |  | A founder’s previous ovarian cancer diagnostic company is a different entity; Collate’s page does not establish its own cancer programme. Reviewed: https://collate.com/company/about |
| Converge Bio | Added verified company | converge-bio | Oncology: https://www.prnewswire.com/news-releases/converge-bio-uses-convergeab-to-improve-popular-cancer-treatment-with-a-single-prompt-302761387.html; location: https://www.prnewswire.com/news-releases/converge-bio-uses-convergeab-to-improve-popular-cancer-treatment-with-a-single-prompt-302761387.html. |
| Convoke | Not added: oncology use not verified |  | The first-party platform description is general biopharma operations; the results for similarly named Click Therapeutics do not identify Convoke work. Reviewed: https://www.convoke.bio/platform |
| Cori Clinical | Added verified company | cori-clinical | Oncology: https://www.cori-clinical.com/news/cori-clinical-raises-4m-seed-round; location: https://find-and-update.company-information.service.gov.uk/company/16115688. |
| Courier Health | Not added: oncology use not verified |  | The patient support material describes cross-indication software without identifying an oncology use. Reviewed: https://www.courierhealth.com/resources/patient-support-services-pharma |
| CoverMyMeds | Not added: oncology use not verified |  | The case-study library returned HTTP 429 on direct retrieval; accessible general material did not identify an oncology deployment that could be verified. Reviewed: https://www.covermymeds.health/resources/case-studies |
| Cradle | Existing company | cradle-bio | Matched a named company record; no duplicate added. |
| Cytel | Added verified company | cytel | Cytel provides statistical design and analysis services for cancer clinical trials. Evidence: https://cytel.com/solutions/specialty-areas/oncology/ |
| Dash Bio | Not added: oncology use not verified |  | The reviewed offering concerns general bioanalysis and assay services without a cancer-specific application documented on the company page. Reviewed: https://www.dash.bio/about |
| Dassault BIOVIA | Added verified company | dassault-systemes | Oncology: https://www.3ds.com/newsroom/press-releases/dassault-systemes-and-cdr-life-collaborate-accelerate-scientific-innovation-cancer-therapies; location: https://www.3ds.com/about/company. |
| Datavant (Aetion) | Existing parent only | datavant | Datavant has a company record. This does not independently verify the map's Aetion label or establish a separate Aetion record. |
| Dotmatics | Added verified company | dotmatics | Oncology: https://www.dotmatics.com/case-studies/modernizing-flow-cytometry-analysis-to-accelerate-oncology-r-and-d; location: https://www.dotmatics.com/contact-us. |
| Doximity | Added verified company | doximity | Oncology: https://marketingsolutions.doximity.info/doximity-case-study-oncology; location: https://www.doximity.com/about/company. |
| DrugBank | Existing resource | drugbank; drugbank-chembl | Source catalogue and collection coverage, not a standalone company record. |
| Edison Scientific | Not added: oncology use not verified |  | The Incyte partnership materials cover research and target assessment across the portfolio. The case names Incyte’s oncology focus but does not identify an oncology-specific project. Reviewed: https://edisonscientific.com/news/bringing-broader-evidence-and-expert-judgment-into-target-assessment-earlier |
| Elicit | Added in same task | elicit | Company and market-map resource handled in the main task. |
| Evaluate | Existing source | src-evaluate | Evaluate Vantage is represented as a source, not a standalone company record. |
| Flatiron Health | Existing company | flatiron-health | Matched a named company record; no duplicate added. |
| Florence Healthcare | Added verified company | florence-healthcare | Oncology: https://www.florencehc.com/case-study/city-of-hope-and-florence-healthcare/; location: https://www.florencehc.com/. |
| Fortrea | Existing company | fortrea | Matched a named company record; no duplicate added. |
| Forus | Not added: oncology use not verified |  | The mapped medication-access company is forus.com, not the separately operated FORUS Therapeutics; its launch announcement does not document an oncology deployment. Reviewed: https://forus.com/stories/forus-announcement |
| Foundation Medicine | Existing company | foundation-medicine | Matched a named company record; no duplicate added. |
| Gemini for Science | Existing provider only | google-deepmind; google-health | Google companies exist. The specific Gemini for Science offering was not independently verified. |
| GlobalData | Added verified company | globaldata | Oncology: https://www.globaldata.com/company-profile/surface-oncology-inc/; location: https://www.globaldata.com/contact-us/. |
| Gosset | Not added: location not verified |  | Gosset publishes a dedicated body of oncology intelligence. A company location for the required profile field was not established from first-party material. Reviewed: https://gosset.ai/reports/area/oncology |
| H1 | Added verified company | h1-health | Oncology: https://h1.com/resources/how-h1-partners-with-memorial-sloan-kettering-cancer-center/; location: https://h1.com/privacy-policy/. |
| Hamilton | Added verified company | hamilton-company | Oncology: https://download.hamiltoncompany.com/cegat; location: https://www.hamiltoncompany.com/reno-nevada. |
| ICON | Existing company | icon-plc | Matched a named company record; no duplicate added. |
| IDBS | Added verified company | idbs | Oncology: https://www.idbs.com/customers/customer-success-stories/; location: https://www.idbs.com/contact/. |
| IQVIA | Existing company | iqvia | Matched a named company record; no duplicate added. |
| Iambic Therapeutics | Existing company | iambic-therapeutics | Matched a named company record; no duplicate added. |
| Indegene (Trilogy Writing) | Added verified company | indegene | Oncology: https://www.indegene.com/insights/case-studies/indegene-unlocks-360-customer-insights-for-the-launch-of-an-oncology-brand; location: https://www.indegene.com/contact-us. |
| Inductive Bio | Not added: oncology use not verified |  | The product material describes medicinal chemistry and drug discovery tools without an identifiable oncology use case. Reviewed: https://www.inductive.bio/solutions |
| Inpart | Added verified company | inpart | Oncology: https://www.inpart.io/network/challenge-campaigns/cancer-immunotherapies-to-treat-solid-tumours; location: https://www.inpart.io/legal/terms. |
| Insilico Medicine | Existing company | insilico-medicine | Matched a named company record; no duplicate added. |
| K-Dense | Not added: oncology use not verified |  | Publisher-created example analyses are demonstrations of a general research tool, not evidence of a dedicated oncology service or a documented use by an oncology research group. Reviewed: https://www.k-dense.ai/use-cases |
| Katalyze | Not added: oncology use not verified |  | Customer material concerns cross-indication manufacturing and technical transfer; no oncology project was identified in the material reviewed. Reviewed: https://www.katalyzeai.com/case-studies |
| Kinaxis | Added verified company | kinaxis | Oncology: https://www.kinaxis.com/sites/default/files/resources/case-study-focused-on-the-cure-kinaxis.pdf; location: https://www.kinaxis.com/en/contact-us. |
| Komodo Health | Existing company | komodo-health | Matched a named company record; no duplicate added. |
| L.E.K. | Added verified company | lek-consulting | Oncology: https://www.lek.com/insights/life-sciences-pharma/value-story-and-cross-stakeholder-action-plan-oncology-reimbursement; location: https://www.lek.com/global-offices. |
| Latent Labs | Existing company | latent-labs | Matched a named company record; no duplicate added. |
| Lila Sciences | Existing company | lila-sciences | Matched a named company record; no duplicate added. |
| Lumanity | Added verified company | lumanity | Oncology: https://lumanity.com/oncology/; location: https://lumanity.com/contact/. |
| MadeAi | Added verified company | madeai | Oncology: https://madeai.com/resources/case-studies/developing-an-ai-classifier-to-support-oncology-decision-making/; location: https://capestart.com/company/about-us. |
| MasterControl | Added verified company | mastercontrol | Oncology: https://www.mastercontrol.com/uk/resource-center/case-studies/mastercontrol-case-study-dendreon/; location: https://www.mastercontrol.com/uk/contact/. |
| McKinsey | Added verified company | mckinsey | Oncology: https://www.mckinsey.com/industries/life-sciences/how-we-help-clients/mckinsey-cancer-center; location: https://www.mckinsey.com/us/new-york. |
| Medable | Existing company | medable | Matched a named company record; no duplicate added. |
| Medidata | Existing company | medidata | Matched a named company record; no duplicate added. |
| Medra | Not added: oncology use not verified |  | The company presents general laboratory automation without a documented cancer-specific workflow on the reviewed page. Reviewed: https://www.medra.ai/ |
| Metis TechBio | Added verified company | metis-techbio | Oncology: https://www.metistechbio.com/en/ywgx.html; location: https://www.metistechbio.com/en/contact.html. |
| MindWalk | Added verified company | mindwalk | Oncology: https://www.mindwalkai.com/research-publications; location: https://www.mindwalkai.com/company. |
| Mirendil | Not added: oncology use not verified |  | Its launch announcement describes general AI-assisted research, not an oncology product or programme. Reviewed: https://mirendil.com/news/announcing-mirendil/ |
| Model N | Not added: oncology use not verified |  | Revenue management products were documented; no indication-specific oncology use was substantiated in the reviewed material. Reviewed: https://www.modeln.com/ |
| N-SIDE | Added verified company | n-side | Oncology: https://www.n-side.com/en/insights/clinical-trial-optimization-at-protocol-design/; location: https://www.n-side.com/en/contact/. |
| NOETIK | Existing company | noetik | Matched a named company record; no duplicate added. |
| Nabla Bio | Not added: oncology use not verified |  | The mapped entity is the discovery platform nabla.bio, not the clinical documentation company; the reviewed partnership material does not identify an oncology programme. Reviewed: https://www.nabla.bio/partner |
| Neon Health | Not added: oncology use not verified |  | The medication access site did not substantiate an oncology-specific product or workflow; the similarly named health services company is separate. Reviewed: https://neonhealth.com/ |
| Nested Knowledge | Added verified company | nested-knowledge | Oncology: https://about.nested-knowledge.com/2025/11/28/13-rapid-reviews-in-record-time-inside-the-ai-powered-case-study/; location: https://about.nested-knowledge.com/terms-of-use/. |
| Oktopi | Not added: oncology use not verified |  | The official overview describes general drug development services; outside material for “Octopi” or “Octopi Network” was insufficient to join those identities to this row. Reviewed: https://www.oktopi.com/overview |
| OpenAI Rosalind | Not added: product, not a company |  | The mapped entry is GPT-Rosalind, an OpenAI research model. The company demonstrates a tumour biopsy workflow, but the model is not a standalone company. Reviewed: https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind/ |
| OpenEvidence | Added verified company | openevidence | Oncology: https://www.mskcc.org/news-releases/mskcc-msk-and-openevidence-partner-to-advance-precision-oncology-at-point-of-care; location: https://search.sunbiz.org/Inquiry/CorporationSearch/GetDocument?aggregateId=forp-f25000004100-8c5bf3d6-79b9-414a-97ad-68061667f36f&formatType=PDF&transactionId=f25000004100-9dfba78c-ac30-40ff-9ede-9772ef9ed30a. |
| Opentrons | Added verified company | opentrons | Oncology: https://insights.opentrons.com/hubfs/App%20Notes/Automated%20Technique%20to%20Examine%203D%20Cancer%20Spheroids_SLAS%202024_Poster.pdf; location: https://insights.opentrons.com/hubfs/App%20Notes/Automated%20Technique%20to%20Examine%203D%20Cancer%20Spheroids_SLAS%202024_Poster.pdf. |
| Oracle | Existing company | oracle-health-sciences | Matched a named company record; no duplicate added. |
| PPD (Thermo Fisher) | Existing parent only | thermo-fisher | The map explicitly labels PPD as Thermo Fisher. Parent record exists; no standalone PPD record added. |
| PPD Evidera | Existing parent: service verified | thermo-fisher | Evidera services are presented within PPD, the clinical research business of Thermo Fisher Scientific. EMA’s registry confirms the Evidera identity and lists a breast-cancer-related observational study. Linked the existing parent and did not create a duplicate brand record. Reviewed: https://www.ppd.com/our-solutions/clinical/real-world-evidence/ and https://catalogues.ema.europa.eu/institution/37928 |
| Parexel | Existing company | parexel | Matched a named company record; no duplicate added. |
| PatSnap | Added verified company | patsnap | Oncology: https://www.patsnap.com/customers/vyriad/; location: https://www.patsnap.com/contact-us/. |
| Peptone | Added verified company | peptone | Oncology: https://peptone.io/pipeline/; location: https://peptone.io/contact/. |
| Perceptic | Not added: oncology use not verified |  | The software page shows a demo question involving myeloid cancer risk, not a cancer-specific product or deployment. Reviewed: https://perceptic.com/os |
| PhaseV | Added verified company | phasev | PhaseV provides software for planning and analysing clinical trials, including cancer studies. Evidence: https://www.phasevtrials.com/resources/advancing-oncology-trials-with-covariate-adjustment |
| Phylo | Not added: oncology use not verified |  | The Ono collaboration covers general drug discovery; Ono’s oncology portfolio does not establish that the arrangement specifically covers a cancer programme. Reviewed: https://phylo.bio/blog/ono-partnership |
| Planisware | Not added: oncology use not verified |  | Its case study concerns general portfolio software for an unnamed biopharma company with a multitherapeutic pipeline. It does not identify an oncology project managed with the service. Reviewed: https://planisware.com/sites/default/files/2024-07/Global%20Pharma%20Case%20Study.pdf |
| Planview | Not added: oncology use not verified |  | The reviewed portfolio management case describes an unnamed biopharma customer but not a cancer programme. Reviewed: https://www.planview.com/resources/case-study/biopharma-company/ |
| Potato | Not added: oncology use not verified |  | The mapped firm is potato.ai, a general lab automation provider; search results about potatoes and cancer are not the same entity. Reviewed: https://potato.ai/pharma/ |
| Prima Mente | Not added: oncology use not verified |  | The research site focuses on general biological AI and neurobiology rather than a documented cancer-specific product. Reviewed: https://www.primamente.com/research/ |
| Profluent | Existing company | profluent-bio | Matched a named company record; no duplicate added. |
| Prudentia Sciences | Not added: oncology use not verified |  | The official description covers general life-sciences deal analysis; no specific oncology use case was substantiated. Reviewed: https://www.prudentiasciences.com/about |
| Pythia Labs | Not added: oncology use not verified |  | The reviewed technology page describes a general drug design method, not a named oncology programme. Reviewed: https://www.pythialabs.com/technology |
| QED Science | Not added: oncology use not verified |  | A cancer researcher’s involvement and an essay about reproducibility are not evidence that the company supplied a cancer-specific product or programme. Reviewed: https://www.qedscience.com/resources |
| QIAGEN | Existing company | qiagen | Matched a named company record; no duplicate added. |
| Radical Numerics | Added verified company | radical-numerics | Oncology: https://www.radicalnumerics.ai/radical-advances; location: https://www.radicalnumerics.ai/join-us. |
| Reflector Bio | Added verified company | reflector-bio | Oncology: https://reflector.bio/case-studies/; location: https://reflector.bio/contact/. |
| Rivercell | Not added: oncology use not verified |  | Its research statement discusses public data generated from cancer cell lines, but does not establish a cancer-specific deployment or programme of its own. Reviewed: https://www.rivercell.ai/manifesto |
| Rivia | Added verified company | rivia | Oncology: https://www.rivia.com/success-stories/driving-operational-excellence-in-immuno-oncology-how-scancell-uses-rivia-to-power-real-time-study-execution; location: https://www.rivia.com/about. |
| SAS | Added verified company | sas-institute | Oncology: https://www.sas.com/content/dam/SAS/en_gb/doc/CustomerStories/sms-oncology-case-study.pdf; location: https://www.sas.com/en_us/contact.html. |
| Schrödinger | Existing company | schrodinger | Matched a named company record; no duplicate added. |
| Signant Health | Added verified company | signant-health | Signant Health provides clinical-trial technology, including tools for collecting patient-experience data in cancer studies. Evidence: https://signanthealth.com/science/therapeutic-areas |
| Solstice Health | Added verified company | solstice-health | Oncology: https://www.solsticehealth.co/technology; location: https://www.solsticehealth.co/privacy. |
| Sorcero | Added verified company | sorcero | Oncology: https://www.sorcero.com/transforming-global-literature-monitoring-with-medically-tuned-ai; location: https://www.sorcero.com/contact-us. |
| Sparta TrackWise | Added verified company | sparta-systems | Oncology: https://hcenews.honeywell.com/rs/hce/images/ArborCaseStudy_0622.pdf; location: https://www.honeywell.com/us/en/process-automation-technology/solutions/trackwise/support/contact-us. |
| Squad Health | Not added: oncology use not verified |  | The specialty medication access page does not identify a cancer therapy or oncology customer workflow. Reviewed: https://www.squadhealth.ai/ |
| Structura (cryoSPARC) | Not added: oncology use not verified |  | cryoSPARC is a structural biology tool; the reviewed impact page did not verify a specific oncology collaboration or programme. Reviewed: https://structura.bio/impact |
| Suvoda | Added verified company | suvoda | Oncology: https://www.suvoda.com/insights/case-study/irt-ecoa-oncology-clinical-trials-whitepaper; location: https://www.suvoda.com/suvoda-product-privacy-policy-and-terms-of-use. |
| Syneos Health | Added verified company | syneos-health | Syneos Health runs clinical-development services for cancer drug studies, including early trials of antibody-drug conjugates and radiopharmaceuticals. Evidence: https://www.syneoshealth.com/therapeutic-depth/oncology-and-hematology/early-phase-oncology-cro |
| Tamarind Bio | Not added: oncology use not verified |  | The reviewed materials describe generic protein design infrastructure and educational examples without a documented oncology deployment. Reviewed: https://www.tamarind.bio/ |
| Tecan | Added verified company | tecan | Oncology: https://www.tecanannualreport.com/annual-report-2022/the-stories/drugs-discovery-and-development/; location: https://www.tecan.com/contact-us. |
| Tempus | Existing company | tempus | Matched a named company record; no duplicate added. |
| Thermo Fisher | Existing company | thermo-fisher | Matched a named company record; no duplicate added. |
| TikaMobile | Added verified company | tikamobile | Oncology: https://www.tikamobile.com/case-studies; location: https://www.tikamobile.com/contact. |
| Tremont AI | Not added: oncology use not verified |  | The reviewed product is for preclinical toxicologic pathology; unrelated histology and oncology papers found in search were not evidence about this vendor. Reviewed: https://tremont.ai/ai-for-toxicologic-pathology/ |
| TriNetX | Existing company | trinetx | Matched a named company record; no duplicate added. |
| Trinity Life Sciences | Added verified company | trinity-life-sciences | Oncology: https://trinitylifesciences.com/company/press-releases/expands-data-partnership-applications-oncology/; location: https://trinitylifesciences.com/contact/. |
| Triomics | Existing company | triomics | Matched a named company record; no duplicate added. |
| Twist Bioscience | Added verified company | twist-bioscience | Twist Bioscience supplies synthetic DNA and antibody-discovery tools for cancer research. Evidence: https://www.twistbioscience.com/applications/cancer-research/cancer-research-solutions |
| Valkai | Not added: oncology use not verified |  | AbbVie confirms a clinical development AI partnership, but the announcement does not identify an oncology programme within that work. Reviewed: https://news.abbvie.com/2026-09-29-AbbVie-Partners-with-Valkai-to-Apply-Advanced-AI-Across-Targeted-Areas-of-Clinical-Development |
| Veeva | Existing company | veeva-systems | Matched a named company record; no duplicate added. |
| Vibe Bio | Added verified company | vibe-bio | Oncology: https://vibebio.com/resources/incite-vibe-bio-partner-accelerate-sarcoma-drug-search-eval/; location: https://vibebio.com/privacy-policy/. |
| Vitroscope | Added verified company | vitroscope | Oncology: https://www.vitroscope.com/science; location: https://data.brreg.no/enhetsregisteret/api/enheter/922215529. |
| VivoSim Labs | Not added: oncology use not verified |  | The reviewed NAMkind announcement describes human disease model services but does not establish an oncology use. The oncology references seen in the annual filing describe other companies or executives. Reviewed: https://ir.vivosim.ai/news-releases/news-release-details/vivosim-labs-extends-namkind-platform-human-disease-models |
| Warp Sciences | Not added: oncology use not verified |  | The investor announcement describes a general drug discovery and lab automation company; it does not identify a concrete oncology programme. Reviewed: https://www.mayfield.com/warp-sciences-launches-with-215m-to-accelerate-drug-discovery/ |
| Weave Bio | Not added: oncology use not verified |  | The company lists the CEO Roundtable on Cancer but its reviewed product page does not specify a cancer project or regulatory submission using the platform. Reviewed: https://www.weave.bio/about/ |
| Wolters Kluwer | Added verified company | wolters-kluwer | Oncology: https://www.wolterskluwer.com/en/solutions/uptodate/about/specialties; location: https://www.wolterskluwer.com/en/contact-us. |
| WuXi | Existing related companies | wuxi-apptec; wuxi-biologics; wuxi-xdc | Map uses an umbrella name. These are distinct existing records; do not collapse them into one company. |
| Yseop | Not added: oncology use not verified |  | The Eli Lilly and Sanofi cases describe clinical document generation without substantiating a named oncology programme in the materials reviewed. Reviewed: https://yseop.com/case-study/eli-lilly-case-study-content-automation/ |
| ZS | Added verified company | zs | Oncology: https://www.zs.com/insights/intellgencia-ai-oncology-segmentation-biopharma-investment; location: https://www.zs.com/careers/where-we-work/north-america/united-states. |
| a-tune | Added verified company | a-tune | Oncology: https://www.a-tune.com/news/institut-gustave-roussy-leading-european-cancer-centre-and-biggest-player-of-the-paris-sud-network-chooses-ticklab-for-the-management-of-its-animal-facility/; location: https://www.a-tune.com/contact/. |
| nPhase | Added verified company | nphase | Oncology: https://www.redcapcloud.com/resources/innovative-treatments-for-pediatric-cancer/; location: https://www.redcapcloud.com/privacy-policy/. |
