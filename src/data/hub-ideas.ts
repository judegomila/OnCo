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
  { n: 49, title: "Cancer-by-cancer spikes with domain experts", why: "TNBC is first. Next: pancreatic, NSCLC, prostate, glioblastoma, each with a named expert reviewer.", status: "building", theme: "Reach" },
  { n: 50, title: "Annual 'State of the War on Cancer' report", why: "Generated from the corpus: approvals, failures, roadmap progress, open problems. A yearly reference point.", status: "shipped", theme: "Reach" },
];
