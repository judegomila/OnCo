/** Site information architecture: five groups, each with a landing page and its pages. Used by the header, footer, landing pages, and home. */
export type NavItem = { href: string; label: string; blurb: string };
export type NavGroup = { id: string; label: string; href: string; blurb: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "find", label: "Find", href: "/find/", blurb: "Start from your question: a cancer, a biomarker, two products to compare, or the whole graph.",
    items: [
      { href: "/explore/", label: "Explore", blurb: "Pick a cancer, switch kind, get a ranked and sortable list." },
      { href: "/for-me/", label: "For me", blurb: "Choose your cancer type(s) and see what works and what could work." },
      { href: "/navigator/", label: "Navigator", blurb: "Standard of care for your stage, what you have tried, cautions, next options, trials near you." },
      { href: "/tumor-board/", label: "Tumour board", blurb: "Tick biomarkers and alterations, get matched options and cautions." },
      { href: "/compare/", label: "Compare", blurb: "Up to five products, technologies, targets, trials, or cancers side by side, differences highlighted." },
      { href: "/pivot/", label: "Pivot", blurb: "Cancers × targets × modalities × companies as a count matrix." },
      { href: "/timeline/", label: "Timeline", blurb: "Scrub through the years: approvals, trials, and standard of care as it stood." },
      { href: "/query/", label: "Query", blurb: "Build a graph query and get a table." },
      { href: "/graph/", label: "Graph explorer", blurb: "Navigate the knowledge graph visually." },
      { href: "/body/", label: "Body map", blurb: "Start from where the cancer is." },
    ],
  },
  {
    id: "map", label: "Map", href: "/map/", blurb: "The corpus by kind. Every page is one object with a plain-English TL;DR and everything connected to it.",
    items: [
      { href: "/cancers/", label: "Cancers", blurb: "State of the art, standard of care, history, pipeline." },
      { href: "/fronts/", label: "Fronts", blurb: "The fronts of the war: imaging to cell therapy." },
      { href: "/technologies/", label: "Technologies", blurb: "Every way we see, measure, or attack a tumour." },
      { href: "/targets/", label: "Targets", blurb: "The molecules drugs and tracers aim at." },
      { href: "/drugs/", label: "Products", blurb: "Approved and pipeline products, with rotating molecules." },
      { href: "/pathways/", label: "Pathways", blurb: "Signalling circuits, drawn and explained." },
      { href: "/prevalence/", label: "Prevalence", blurb: "How common each target is in each cancer." },
      { href: "/trials/", label: "Trials", blurb: "Landmark and current trials." },
      { href: "/pairings/", label: "Pairings", blurb: "What works together, and what does not." },
      { href: "/roadmaps/", label: "Roadmaps", blurb: "History to horizon for each technology family." },
      { href: "/ideas/", label: "Ideas", blurb: "Hypotheses with a proposed test." },
      { href: "/terms/", label: "Glossary", blurb: "Terms with TL;DRs and Wikipedia links." },
      { href: "/collections/", label: "Collections", blurb: "The open databases the field runs on." },
    ],
  },
  {
    id: "intel", label: "Intelligence", href: "/intel/", blurb: "What is happening and what is coming: dates, congress readouts, failures, resistance, and the supply chain behind the drugs.",
    items: [
      { href: "/evidence/", label: "Evidence", blurb: "Every trial ranked by evidence strength, endpoints as people out of 100." },
      { href: "/calendar/", label: "Readout calendar", blurb: "Decisions, readouts, advisory committees, congresses." },
      { href: "/digests/", label: "Congress digests", blurb: "ASCO, ESMO, AACR, ASCO GU, sourced item by item." },
      { href: "/failures/", label: "Failure museum", blurb: "What did not work, and the lesson." },
      { href: "/resistance/", label: "Resistance atlas", blurb: "Escape routes per drug class and the countermeasures." },
      { href: "/payloads/", label: "Payloads & linkers", blurb: "The chemistry inside ADCs." },
      { href: "/regulatory/", label: "Regulatory timeline", blurb: "Every dated filing, approval, CRL, and label change." },
      { href: "/toxicity/", label: "Toxicity compare", blurb: "Grade 3+ adverse events across products of the same class." },
      { href: "/isotopes/", label: "Isotope supply", blurb: "Lu-177, Ac-225, Pb-212 and who makes them." },
      { href: "/report/2026/", label: "State of the war, 2026", blurb: "The annual report generated from the corpus." },
      { href: "/changelog/", label: "Changelog", blurb: "What changed in OnCo, and when." },
      { href: "/audit/", label: "Audit", blurb: "Staleness, contradictions, and registry mismatches, recomputed each build." },
      { href: "/corrections/", label: "Corrections", blurb: "Every factual correction, what was wrong and how it was found." },
    ],
  },
  {
    id: "who", label: "Who", href: "/institutions/", blurb: "The institutions, universities, companies, and funders that matter, mapped and ranked with disclosed formulas.",
    items: [
      { href: "/institutions/", label: "Institutions", blurb: "Global map and ranking of cancer centres and institutes." },
      { href: "/universities/", label: "Universities", blurb: "Research output from OpenAlex, Nature Index, SCImago." },
      { href: "/leadership/", label: "Trial leadership", blurb: "Who led the pivotal trials." },
      { href: "/people/", label: "People", blurb: "The clinicians and scientists doing the work: specialisms, bios, papers." },
      { href: "/companies/", label: "Companies", blurb: "Pharma, biotech, diagnostics, devices, AI." },
      { href: "/funding/", label: "Funding flows", blurb: "Where the money comes from." },
    ],
  },
  {
    id: "learn", label: "Learn & contribute", href: "/learn/", blurb: "Curated paths through the material, how the site works, and how to make it better.",
    items: [
      { href: "/paths/", label: "Reading paths", blurb: "ADCs in 30 minutes, understanding a diagnosis, and more." },
      { href: "/about/", label: "About & methodology", blurb: "Rules for facts, ranking formulas, licence." },
      { href: "/hub/", label: "50 ideas", blurb: "The product roadmap and its status." },
      { href: "/gaps/", label: "Gaps to fill", blurb: "Objects and fields that need work." },
      { href: "/suggest/", label: "Suggest an edit", blurb: "Propose a correction; organisations can edit their own records." },
      { href: "/eval/", label: "Open evaluation", blurb: "100 questions, a rubric, and a public leaderboard." },
      { href: "/api/", label: "Open API", blurb: "The corpus as JSON." },
      { href: "https://github.com/judegomila/OnCo", label: "GitHub", blurb: "Edit any object with a pull request." },
    ],
  },
];
