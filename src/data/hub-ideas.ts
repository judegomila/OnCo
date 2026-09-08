/**
 * Fifty ideas for making OnCo the central hub for the war on cancer.
 * These are product and community ideas, distinct from the scientific ideas in ideas.ts.
 * Status is editorial: shipped | building | planned | proposed.
 */
export type HubIdea = { n: number; title: string; why: string; status: "shipped" | "building" | "planned" | "proposed"; theme: string };

export const hubIdeas: HubIdea[] = [
  // Knowledge graph
  { n: 1, title: "Page per object, backlinks everywhere", why: "Every technology, target, drug, company, trial, and term has a URL and shows what links to it. That is what makes a hub rather than a list.", status: "shipped", theme: "Knowledge graph" },
  { n: 2, title: "Non-technical TL;DR on every page", why: "Patients, families, journalists, and investors should get the point in one sentence before the jargon.", status: "shipped", theme: "Knowledge graph" },
  { n: 3, title: "Public JSON API of the whole corpus", why: "Let others build on the data: trial matchers, chatbots, dashboards. Published at /api/v1/.", status: "shipped", theme: "Knowledge graph" },
  { n: 4, title: "Graph explorer", why: "An interactive force graph to navigate from a cancer to its targets to the drugs and the companies, visually.", status: "shipped", theme: "Knowledge graph" },
  { n: 5, title: "Wikidata / Wikipedia cross-linking and edit-back", why: "Push structured facts to Wikidata and pull Wikipedia summaries, so the hub and the commons improve each other.", status: "proposed", theme: "Knowledge graph" },
  { n: 6, title: "'As of' dates and change log on every fact", why: "Oncology changes weekly. Show when each fact was checked and what changed, like a package changelog.", status: "shipped", theme: "Knowledge graph" },
  { n: 7, title: "Evidence tiers (approved / phase 3 / phase 2 / preclinical / concept) as a visual language", why: "Colour and badge every claim by evidence level so hype is visible at a glance.", status: "shipped", theme: "Knowledge graph" },

  // Patient-facing
  { n: 8, title: "'For me' cancer picker", why: "Select your cancer type(s) and see the technologies, drugs, trials, and ideas relevant to you.", status: "shipped", theme: "Patients" },
  { n: 9, title: "Biomarker-aware personalisation", why: "Add PD-L1, HER2-low, BRCA, TROP2 status and get a narrower, more useful view. No data leaves the browser.", status: "shipped", theme: "Patients" },
  { n: 10, title: "Questions to ask your oncologist", why: "Per cancer and per stage, a printable list drawn from the state-of-art and pipeline sections.", status: "shipped", theme: "Patients" },
  { n: 11, title: "Trial finder linked to ClinicalTrials.gov API", why: "From any drug or cancer page, live recruiting trials near a postcode.", status: "shipped", theme: "Patients" },
  { n: 12, title: "Plain-language trial result explainers", why: "Translate hazard ratios and pCR rates into 'out of 100 people' pictograms.", status: "planned", theme: "Patients" },
  { n: 13, title: "Second-opinion and expert-centre directory per cancer", why: "Which institutions run the key trials for this cancer; how to get referred.", status: "shipped", theme: "Patients" },
  { n: 14, title: "Multilingual TL;DRs", why: "Start with Spanish, Mandarin, Hindi, Portuguese, Arabic for the TL;DR layer only, where translation is cheap and value is high.", status: "proposed", theme: "Patients" },
  { n: 15, title: "Caregiver and survivorship section", why: "Supportive care, exercise oncology, financial toxicity, fertility, and late effects deserve first-class pages.", status: "shipped", theme: "Patients" },

  // Science and pipeline
  { n: 16, title: "Roadmaps per technology family", why: "History → current → emerging → speculative, with linked evidence. ADC, TROP2, radiopharma, cell therapy, imaging, early detection shipped.", status: "shipped", theme: "Pipeline" },
  { n: 17, title: "Pipeline tracker with automated ClinicalTrials.gov ingestion", why: "Nightly job pulls phase 2/3 trials for every drug and target in the corpus and flags new ones for review.", status: "shipped", theme: "Pipeline" },
  { n: 18, title: "Readout calendar", why: "Expected trial readouts, FDA PDUFA dates, and advisory committees (e.g., Galleri 23 Sep 2026) on one timeline.", status: "shipped", theme: "Pipeline" },
  { n: 19, title: "Conference digests (ASCO, ESMO, AACR, SABCS, ASH)", why: "Within a week of each congress, update the affected objects and publish a diff.", status: "shipped", theme: "Pipeline" },
  { n: 20, title: "Failure museum", why: "A section for drugs and ideas that failed (TIGIT, magrolimab, rovalpituzumab, iniparib) with what was learned. Failures are data.", status: "shipped", theme: "Pipeline" },
  { n: 21, title: "Pairings and anti-pairings", why: "Combinations that work, sequences that work, and cautions, each with rationale and evidence.", status: "shipped", theme: "Pipeline" },
  { n: 22, title: "Open ideas board with maturity grading", why: "Hypotheses with a proposed test, so the community can argue, refine, and eventually see them tested.", status: "shipped", theme: "Pipeline" },
  { n: 23, title: "Resistance mechanism atlas", why: "For each drug class, the known escape routes and the drugs designed to close them.", status: "shipped", theme: "Pipeline" },
  { n: 24, title: "Payload and linker registry", why: "Every ADC payload/linker with permeability, efflux susceptibility, and toxicity profile, cross-referenced to ADCs.", status: "shipped", theme: "Pipeline" },
  { n: 25, title: "Isotope supply tracker", why: "Ac-225, Lu-177, Pb-212 production capacity and suppliers, because supply gates the radiopharma roadmap.", status: "shipped", theme: "Pipeline" },

  // Institutions and people
  { n: 26, title: "Global institution map and transparent ranking", why: "Where the centres that matter are, ranked by a formula anyone can inspect and dispute.", status: "shipped", theme: "Institutions" },
  { n: 27, title: "University output ranking from open bibliometrics", why: "Pull Nature Index and OpenAlex counts per institution for oncology journals; publish the query.", status: "shipped", theme: "Institutions" },
  { n: 28, title: "Trial leadership index", why: "Which institutions led the pivotal trials in the corpus. A different signal from publication counts.", status: "shipped", theme: "Institutions" },
  { n: 29, title: "Open cooperative-group directory", why: "SWOG, NRG, Alliance, EORTC, BIG, GBG, JCOG: what they run and how to join.", status: "shipped", theme: "Institutions" },
  { n: 30, title: "Funding flows", why: "NCI, CRUK, ERC, philanthropy: where the money goes by cancer and modality.", status: "shipped", theme: "Institutions" },

  // Community and contribution
  { n: 31, title: "GitHub-native contribution", why: "Every object is a TypeScript record; PRs with sources are the edit mechanism. CI validates links and references.", status: "shipped", theme: "Community" },
  { n: 32, title: "Source-required rule", why: "Like the Open Medical Registry: no claim without a URL and a date. Unknown is better than guessed.", status: "shipped", theme: "Community" },
  { n: 33, title: "Expert review badges", why: "Clinicians and scientists sign off on pages in their area; badge shows reviewer and date.", status: "shipped", theme: "Community" },
  { n: 34, title: "Patient-advocate review track", why: "Advocacy groups (LBBC, BCRF, TNBC Foundation, PanCAN) review TL;DRs for clarity and tone.", status: "proposed", theme: "Community" },
  { n: 35, title: "Bounties for gaps", why: "List missing objects and stale facts; recognise contributors who fill them.", status: "shipped", theme: "Community" },
  { n: 36, title: "Weekly 'what changed in oncology' newsletter generated from the diff", why: "The changelog is the newsletter. Zero extra editorial cost.", status: "shipped", theme: "Community" },

  // Tools
  { n: 37, title: "Full-text search across all objects", why: "Client-side index; works offline; no server.", status: "shipped", theme: "Tools" },
  { n: 38, title: "Compare view", why: "Side-by-side of two drugs (e.g., sacituzumab vs Dato-DXd) or two technologies with the same fields.", status: "shipped", theme: "Tools" },
  { n: 39, title: "Embeddable cards", why: "One line of HTML to embed an OnCo object card in a blog, hospital site, or Wikipedia talk page.", status: "shipped", theme: "Tools" },
  { n: 40, title: "MCP server", why: "Expose the corpus to AI assistants via Model Context Protocol so any chatbot can cite OnCo.", status: "shipped", theme: "Tools" },
  { n: 41, title: "Pathway diagrams with clickable nodes", why: "Each node links to its target page and the drugs against it.", status: "shipped", theme: "Tools" },
  { n: 42, title: "Tumour board mode", why: "Enter a molecular profile (mutations, IHC) and get the relevant targets, drugs, trials, and cautions in one printable view.", status: "shipped", theme: "Tools" },
  { n: 43, title: "Reading paths", why: "Curated sequences of pages: 'ADCs in 30 minutes', 'Understand your TNBC diagnosis', 'Radiopharma for investors'.", status: "shipped", theme: "Tools" },
  { n: 44, title: "Print and PDF export of any page", why: "Patients bring printouts to appointments.", status: "shipped", theme: "Tools" },

  // Reach
  { n: 45, title: "Open licensing (MIT code, CC BY data)", why: "Maximise reuse; require attribution so improvements flow back.", status: "shipped", theme: "Reach" },
  { n: 46, title: "Static, fast, cheap hosting", why: "Static export on Vercel; loads anywhere including low-bandwidth settings.", status: "shipped", theme: "Reach" },
  { n: 47, title: "Schema.org structured data for search engines", why: "MedicalCondition, Drug, MedicalStudy markup so the hub is machine-readable to Google and AI crawlers.", status: "shipped", theme: "Reach" },
  { n: 48, title: "Partnerships with existing collections", why: "Link out to and ingest from OncoKB, CIViC, ClinicalTrials.gov, ADCdb, NCI PDQ rather than duplicating them.", status: "building", theme: "Reach" },
  { n: 49, title: "Cancer-by-cancer spikes with domain experts", why: "TNBC is first. Next: pancreatic, NSCLC, prostate, glioblastoma, each with a named expert reviewer.", status: "shipped", theme: "Reach" },
  { n: 50, title: "Annual 'State of the War on Cancer' report", why: "Generated from the corpus: approvals, failures, roadmap progress, open problems. A yearly reference point.", status: "shipped", theme: "Reach" },
];

/** Second roadmap (2026-09-07): 50 ideas to make OnCo better, deeper, more user-friendly, more powerful. */
export const hubIdeas2: HubIdea[] = [
  { n: 1, title: "Spike every cancer to TNBC depth", why: "All 31 cancers now carry standard of care by setting with guideline mapping, history, pipeline, open problems, and landmark trials with structured outcomes.", status: "shipped", theme: "Depth" },
  { n: 2, title: "Structured trial outcomes", why: "Arms, N, endpoints, hazard ratios and confidence intervals on every trial.", status: "shipped", theme: "Depth" },
  { n: 3, title: "Out-of-100 pictograms", why: "Percent endpoints drawn as people, time endpoints as median bars.", status: "shipped", theme: "Depth" },
  { n: 4, title: "Dosing and schedule on product pages", why: "Route, cycle, modifications, monitoring, with the label as source.", status: "shipped", theme: "Depth" },
  { n: 5, title: "Structured toxicity profiles", why: "Grade 3+ rates by event, comparable across a class at /toxicity/.", status: "shipped", theme: "Depth" },
  { n: 6, title: "Cost and access layer", why: "Price where disclosed, reimbursement, assistance programmes, generics.", status: "shipped", theme: "Depth" },
  { n: 7, title: "Guideline mapping", why: "NCCN category and ESMO-MCBS grade on standard-of-care rows where sourced.", status: "shipped", theme: "Depth" },
  { n: 8, title: "Regulatory timeline objects", why: "Filings, PDUFA dates, CRLs, label changes as dated events; browse at /regulatory/.", status: "shipped", theme: "Depth" },
  { n: 9, title: "Biomarker prevalence tables", why: "How common each target is in each cancer, sourced; matrix at /prevalence/.", status: "shipped", theme: "Depth" },
  { n: 10, title: "Mechanism cards", why: "Step-by-step animated mechanism on product pages next to the molecule.", status: "shipped", theme: "Depth" },
  { n: 11, title: "Saveable browser profile", why: "Cancer, stage, biomarkers, prior lines, country; nothing leaves the device.", status: "shipped", theme: "Users" },
  { n: 12, title: "Line-of-therapy navigator", why: "What has been tried, what is next, and the cautions, at /navigator/.", status: "shipped", theme: "Users" },
  { n: 13, title: "Appointment prep pack", why: "Choose questions, add your own, export one page.", status: "planned", theme: "Users" },
  { n: 14, title: "Plain-language toggle", why: "Switch any page between TL;DR only and the full technical layer.", status: "building", theme: "Users" },
  { n: 15, title: "Simplify further", why: "A reading level for a twelve-year-old, reviewed by advocates.", status: "building", theme: "Users" },
  { n: 16, title: "Caregiver mode", why: "Logistics first: side effects to watch, when to call, practical support.", status: "shipped", theme: "Users" },
  { n: 17, title: "Explain this term on hover", why: "Glossary TL;DRs wherever a term appears.", status: "building", theme: "Users" },
  { n: 18, title: "Localised trial finder", why: "Country and distance filters on live ClinicalTrials.gov results.", status: "shipped", theme: "Users" },
  { n: 19, title: "Notifications", why: "Subscribe to a cancer, product, or target.", status: "proposed", theme: "Users" },
  { n: 20, title: "Multilingual TL;DRs", why: "Spanish, Mandarin, Portuguese, Hindi, marked machine-assisted until reviewed.", status: "building", theme: "Users" },
  { n: 21, title: "Saved views", why: "Any table state as a short URL pinned to a dashboard.", status: "proposed", theme: "Power" },
  { n: 22, title: "Multi-select compare", why: "Up to five items with a difference highlighter.", status: "shipped", theme: "Power" },
  { n: 23, title: "Cross-kind pivot tables", why: "Cancers by targets by modalities at /pivot/.", status: "shipped", theme: "Power" },
  { n: 24, title: "Timeline scrubber", why: "The corpus as it stood in any year, at /timeline/.", status: "shipped", theme: "Power" },
  { n: 25, title: "Graph queries", why: "Form-based queries over the graph at /query/.", status: "shipped", theme: "Power" },
  { n: 26, title: "Evidence strength scoring", why: "Disclosed composite per trial and product; ranked at /evidence/.", status: "shipped", theme: "Power" },
  { n: 27, title: "Contradiction and staleness detector", why: "Recomputed each build at /audit/.", status: "shipped", theme: "Power" },
  { n: 28, title: "Bulk export and DOI release", why: "CSV, Parquet, Zenodo.", status: "proposed", theme: "Power" },
  { n: 29, title: "Live widgets", why: "State-of-the-art panels and trial finders for hospital sites.", status: "proposed", theme: "Power" },
  { n: 30, title: "Offline mode", why: "A PWA that caches the corpus.", status: "proposed", theme: "Power" },
  { n: 31, title: "Source-per-sentence citations", why: "Superscripts and validation on unsourced numbers.", status: "proposed", theme: "Trust" },
  { n: 32, title: "Provenance display", why: "Last edit, author, and diff from git on every page.", status: "shipped", theme: "Trust" },
  { n: 33, title: "Automated fact checks", why: "Weekly comparison against openFDA and ClinicalTrials.gov.", status: "shipped", theme: "Trust" },
  { n: 34, title: "Confidence labels", why: "Probability ranges on speculative roadmap steps and ideas.", status: "shipped", theme: "Trust" },
  { n: 35, title: "Corrections log", why: "Every factual correction at /corrections/.", status: "shipped", theme: "Trust" },
  { n: 36, title: "Conflict-of-interest field", why: "Shown next to every reviewer badge.", status: "shipped", theme: "Trust" },
  { n: 37, title: "Patient-advocate review track", why: "A badge for clarity and tone.", status: "shipped", theme: "Trust" },
  { n: 38, title: "Replication notes", why: "Whether a second trial confirmed the effect, on every trial.", status: "shipped", theme: "Trust" },
  { n: 39, title: "Pathway diagrams that light up", why: "Select a product and see the nodes it hits and the escape routes.", status: "shipped", theme: "Visual" },
  { n: 40, title: "Anatomical entry point", why: "A clickable body map at /body/.", status: "shipped", theme: "Visual" },
  { n: 41, title: "Molecule interaction", why: "Drag, zoom, hydrogens, pharmacophore colours, drug-target complexes with binding pockets.", status: "shipped", theme: "Visual" },
  { n: 42, title: "Animated process schematics", why: "ADC internalisation, CAR-T killing, radioligand decay, and more.", status: "shipped", theme: "Visual" },
  { n: 43, title: "Theme toggle and accessibility", why: "Light, dark, high contrast, skip link, focus rings.", status: "shipped", theme: "Visual" },
  { n: 44, title: "Story mode for roadmaps", why: "Scroll-driven narrative on every roadmap.", status: "shipped", theme: "Visual" },
  { n: 45, title: "Expert contributor programme", why: "One named reviewer per cancer and front.", status: "proposed", theme: "Community" },
  { n: 46, title: "Organisation self-service edits", why: "Verified organisations propose changes via /suggest/.", status: "shipped", theme: "Community" },
  { n: 47, title: "Trial sponsor feed", why: "Sponsors register readouts into the calendar.", status: "proposed", theme: "Community" },
  { n: 48, title: "Congress partnerships", why: "Structured summaries within a week of each meeting.", status: "proposed", theme: "Community" },
  { n: 49, title: "Teaching packs", why: "Slides and quizzes per cancer and front.", status: "proposed", theme: "Community" },
  { n: 50, title: "Open evaluation", why: "100 questions, a rubric, and a public leaderboard at /eval/.", status: "shipped", theme: "Community" },
];
