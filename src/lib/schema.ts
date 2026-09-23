import { z } from "zod";
import { EVIDENCE_TIERS, KINDS, STATUSES, TARGET_ROLES } from "./kinds";

export { KINDS, STATUSES, REL_FIELDS, KIND_META, PHASE_ORDER, routeFor, phaseLabel, normalisePhaseLabel, TARGET_ROLES, TARGET_ROLE_LABEL, EVIDENCE_TIERS, EVIDENCE_TIER_LABEL } from "./kinds";
export type { Kind, Status, RelField, TargetRole, EvidenceTier } from "./kinds";

/**
 * OnCo data model.
 *
 * Every object in the hub is an Entity with a `kind`. All entities share the base
 * fields; each kind adds a few typed fields. Relationships are expressed as arrays
 * of entity ids. Backlinks are derived at build time (see graph.ts), so a link only
 * needs to be declared once, on whichever side is most natural.
 *
 * Content rules (mirrors the Open Medical Registry):
 *  - `tldr` is for a non-technical reader. One or two plain sentences, no jargon.
 *  - `summary` is for a clinician, scientist, or engineer.
 *  - `asOf` is the date the facts were last checked. Facts change; say when.
 *  - Do not invent numbers. Prefer a source link over a remembered figure.
 */

const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "ids are kebab-case");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD");
const url = z.string().url();

export const ExternalLinkSchema = z.object({
  label: z.string().min(1),
  url,
});
export type ExternalLink = z.infer<typeof ExternalLinkSchema>;

export const TimelineEventSchema = z.object({
  year: z.union([z.number().int(), z.string()]),
  title: z.string().min(1),
  note: z.string().optional(),
  /** Entity ids this event is about. */
  refs: z.array(id).default([]),
});
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;

const Base = z.object({
  id,
  kind: z.enum(KINDS),
  name: z.string().min(1),
  aka: z.array(z.string()).default([]),
  /** Plain-language explanation for someone with no background. */
  tldr: z.string().min(1),
  /** Technical summary. Markdown-light: paragraphs separated by blank lines. */
  summary: z.string().min(1),
  status: z.enum(STATUSES).optional(),
  asOf: isoDate,
  wikipedia: url.optional(),
  links: z.array(ExternalLinkSchema).default([]),
  tags: z.array(z.string()).default([]),
  /** Free-form related entity ids (any kind). */
  related: z.array(id).default([]),
  /** Typed relationship arrays. Each holds ids of the named kind. */
  cancers: z.array(id).default([]),
  sections: z.array(id).default([]),
  technologies: z.array(id).default([]),
  targets: z.array(id).default([]),
  drugs: z.array(id).default([]),
  companies: z.array(id).default([]),
  institutions: z.array(id).default([]),
  pathways: z.array(id).default([]),
  terms: z.array(id).default([]),
  trials: z.array(id).default([]),
  people: z.array(id).default([]),
  /** Bottlenecks of the war on cancer this object bears on (ideas attack them; technologies, trials, collections relieve them). */
  bottlenecks: z.array(id).default([]),
  /** Key papers (kind "paper") this object rests on or is discussed in. */
  keyPapers: z.array(id).default([]),
  /** Journals (kind "journal") this object was published in or is tied to. */
  journals: z.array(id).default([]),
  /**
   * Upstream technologies this one cannot be delivered without (CAR-T needs apheresis, vector manufacturing,
   * cryopreservation). Meaningful on `technology` records; the dependency DAG at /dependencies/ is built from it.
   * Declared on the base so the relation arrays stay uniform (REL_FIELDS), and validated like every other id list.
   */
  dependsOn: z.array(id).default([]),
  /** Why this matters / what is hard about it. Optional editorial notes. */
  notes: z.array(z.string()).default([]),
  /** Even simpler explanation (about a 12-year-old reading age). Optional. */
  simple: z.string().optional(),
  /** Who last substantively edited this record (name or handle) and when. */
  provenance: z.object({ editedBy: z.string(), editedOn: isoDate, note: z.string().optional() }).optional(),
  /** Named probability estimate for speculative content. */
  confidence: z.object({ probability: z.tuple([z.number().min(0).max(1), z.number().min(0).max(1)]), by: z.string(), on: isoDate, note: z.string().optional() }).optional(),
});

export const CancerSchema = Base.extend({
  kind: z.literal("cancer"),
  /** ICD-O / organ system grouping, e.g. "breast", "lung", "blood". */
  group: z.string(),
  /** Roughly how common, in words. */
  burden: z.string().optional(),
  subtypes: z.array(z.string()).default([]),
  /** Key biomarkers a clinician tests for. */
  biomarkers: z.array(z.string()).default([]),
  standardOfCare: z.array(z.object({
    setting: z.string(), approach: z.string(), refs: z.array(id).default([]),
    /** Guideline mapping: NCCN category (e.g. "1", "2A", "preferred"), ESMO-MCBS grade (e.g. "A", "4"), guideline version/URL. */
    guideline: z.object({ nccn: z.string().optional(), esmoMcbs: z.string().optional(), version: z.string().optional(), url: url.optional() }).optional(),
  })).default([]),
  /** What is state of the art today, in one paragraph per point. */
  stateOfArt: z.array(z.string()).default([]),
  history: z.array(TimelineEventSchema).default([]),
  /** What is coming: ids of drugs/technologies/trials/ideas. */
  pipeline: z.array(id).default([]),
  openProblems: z.array(z.string()).default([]),
  /**
   * The basics a newcomer needs before the treatment sections make sense: how the cancer shows itself, how it is
   * confirmed, and how it is staged. Short bulleted lines (glossary terms in them get hover explanations), with the
   * sources they were read from. Shown on the overview before the standard of care.
   */
  basics: z.object({
    symptoms: z.array(z.string()).default([]),
    diagnosis: z.array(z.string()).default([]),
    staging: z.array(z.string()).default([]),
    sources: z.array(ExternalLinkSchema).default([]),
  }).optional(),
  /**
   * Outlook in plain English: what moves survival for this cancer (stage at diagnosis, subtype, treatment) and the
   * headline population figures, with the statistics pages they were read from. Rendered behind the same survival
   * disclosure as the other averaged figures, so nobody meets a number before the context that qualifies it.
   */
  prognosis: z.object({ text: z.string().min(1), sources: z.array(ExternalLinkSchema).default([]) }).optional(),
  /** The broader cancer this record is a subtype of (pleural mesothelioma -> mesothelioma); the parent page lists its subtypes at the top. */
  parent: id.optional(),
});

export const SectionSchema = Base.extend({
  kind: z.literal("section"),
  order: z.number().int(),
  icon: z.string().optional(),
});

export const TechnologySchema = Base.extend({
  kind: z.literal("technology"),
  /** How it works, for a technical reader. */
  principle: z.string(),
  /** Which generation of the idea this is, if the field talks in generations. */
  generation: z.string().optional(),
  strengths: z.array(z.string()).default([]),
  limitations: z.array(z.string()).default([]),
  /** Year first used in humans or first approved, if meaningful. */
  since: z.union([z.number().int(), z.string()]).optional(),
});

export const TargetSchema = Base.extend({
  kind: z.literal("target"),
  /** Gene symbol / protein name. */
  symbol: z.string().optional(),
  /** Roles in cancer as the public catalogues state them (drug target, oncogene driver, tumour suppressor, biomarker or prognostic gene, fusion partner, DNA repair, immune checkpoint, antigen); several allowed. */
  role: z.array(z.enum(TARGET_ROLES)).default([]),
  /** Strongest public evidence tying the gene to cancer: approved drug, clinical evidence, driver by cohort analysis, or association only. */
  evidenceTier: z.enum(EVIDENCE_TIERS).optional(),
  /** The public sources each fact on the record was read from, with the page consulted and what it contributed. */
  sources: z.array(ExternalLinkSchema.extend({ note: z.string().optional() })).default([]),
  /**
   * External gene identifiers for single-gene targets, filled by scripts/enrich-target-ids.ts from the HGNC REST API
   * (UniProt REST as fallback). Composite targets (AKT1/2/3, BRCA1, BRCA2) carry none; their per-gene ids live in
   * src/data/target-xrefs.ts. Rendered by IdentifierRow and emitted as schema:sameAs.
   */
  hgnc: z.string().regex(/^HGNC:\d+$/).optional(),
  ensembl: z.string().regex(/^ENSG\d{11}$/).optional(),
  uniprot: z.string().regex(/^[OPQ][0-9][A-Z0-9]{3}[0-9]$|^[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$/).optional(),
  entrez: z.string().regex(/^\d+$/).optional(),
  biology: z.string(),
  /** Expression or alteration by cancer, free text. */
  whereFound: z.array(z.string()).default([]),
  targetClass: z.enum(["surface-antigen", "kinase", "checkpoint", "nuclear-receptor", "enzyme", "transcription", "oncogene", "tumor-suppressor", "stroma", "other"]).default("other"),
  /** Fraction of each cancer that expresses or carries the alteration, sourced. `pct` is 0-100 or a range string like "15-20". */
  prevalence: z.array(z.object({ cancerId: id, pct: z.union([z.number(), z.string()]), measure: z.string().optional(), source: url.optional(), note: z.string().optional() })).default([]),
});

export const ApprovalSchema = z.object({
  region: z.string(),
  year: z.number().int(),
  indication: z.string(),
  note: z.string().optional(),
});

export const DrugSchema = Base.extend({
  kind: z.literal("drug"),
  brand: z.string().optional(),
  code: z.string().optional(),
  /** Modality, e.g. "ADC", "small molecule", "mAb", "radioligand", "cell therapy", "vaccine", "device". */
  modality: z.string(),
  payload: z.string().optional(),
  linker: z.string().optional(),
  mechanism: z.string(),
  approvals: z.array(ApprovalSchema).default([]),
  /** Step-by-step mechanism for the animated mechanism card. */
  mechanismSteps: z.array(z.string()).default([]),
  dosing: z.object({ route: z.string(), schedule: z.string(), modifications: z.string().optional(), monitoring: z.string().optional(), source: url.optional() }).optional(),
  /** Adverse events with rates in percent, from the label or pivotal trial. */
  toxicity: z.array(z.object({ event: z.string(), anyGradePct: z.number().optional(), grade3PlusPct: z.number().optional(), source: url.optional(), note: z.string().optional() })).default([]),
  /** Cost and access by country. */
  access: z.array(z.object({ country: z.string(), listPrice: z.string().optional(), reimbursement: z.string().optional(), assistance: z.string().optional(), generic: z.boolean().optional(), source: url.optional(), asOf: isoDate.optional() })).default([]),
  regulatoryEvents: z.array(z.object({ date: z.string(), type: z.enum(["designation", "filing", "pdufa", "approval", "crl", "withdrawal", "label-change", "advisory-committee"]), region: z.string(), note: z.string(), source: url.optional() })).default([]),
});

/** Broad company type. `investor` is a venture fund, corporate venture arm or disease foundation that finances the others; its portfolio is derived from the `investors` field on the companies it backs. */
export const COMPANY_TYPES = ["pharma", "biotech", "diagnostics", "imaging", "devices", "ai-software", "radiopharma", "cell-therapy", "cro-services", "nonprofit", "investor"] as const;
export type CompanyType = (typeof COMPANY_TYPES)[number];

/** Where a company is in its life: a venture-backed startup, a later-stage private company, listed, a large private group, acquired, or wound down. */
export const STAGES = ["startup", "growth", "public", "private-large", "acquired", "defunct"] as const;
export type Stage = (typeof STAGES)[number];

/** One financing round. `amountUsd` only when the cited source states the figure; `source` is the press release, SEC filing or trade report. */
export const FundingRoundSchema = z.object({
  /** "Seed", "Series A", "Series B", "IPO", "Grant", "Crossover", ... */
  round: z.string().min(1),
  year: z.number().int().min(1990).max(2100),
  amountUsd: z.number().positive().optional(),
  source: url,
  note: z.string().optional(),
});
export type FundingRound = z.infer<typeof FundingRoundSchema>;

export const CompanySchema = Base.extend({
  kind: z.literal("company"),
  hq: z.string(),
  country: z.string().length(2),
  companyType: z.enum(COMPANY_TYPES),
  website: url.optional(),
  ticker: z.string().optional(),
  founded: z.number().int().optional(),
  stage: z.enum(STAGES).optional(),
  /** Y Combinator batch, e.g. "W21", "S24", "X26" (Spring), "F25" (Fall). */
  ycBatch: z.string().regex(/^[WSXF]\d{2}$/, "YC batch like W21, S24, X26 or F25").optional(),
  /** Ids of investor records (companies with `companyType: "investor"`) that have backed this company. Backlinks give each investor its portfolio. */
  investors: z.array(id).default([]),
  /** Sourced financing rounds; omit rather than guess. */
  funding: z.array(FundingRoundSchema).default([]),
  /** Company id of the acquirer, when `stage` is "acquired" and the acquirer is in OnCo. */
  acquiredBy: id.optional(),
});

export const InstitutionSchema = Base.extend({
  kind: z.literal("institution"),
  city: z.string(),
  country: z.string().length(2),
  lat: z.number(),
  lng: z.number(),
  institutionType: z.enum(["cancer-center", "university", "hospital", "research-institute", "government", "consortium"]),
  website: url.optional(),
  /** NCI designation, US only. */
  nci: z.enum(["comprehensive", "clinical", "basic"]).optional(),
  /** Newsweek / Statista World's Best Specialized Hospitals 2026, Oncology rank. */
  newsweekOncology2026: z.number().int().optional(),
  /** Parent university, when the institution is a cancer centre inside one. */
  university: z.string().optional(),
  programs: z.array(z.string()).default([]),
});

export const PathwayNodeSchema = z.object({ id: z.string(), label: z.string(), x: z.number(), y: z.number(), targetId: id.optional() });
export const PathwayEdgeSchema = z.object({ from: z.string(), to: z.string(), type: z.enum(["activates", "inhibits"]).default("activates") });

export const PathwaySchema = Base.extend({
  kind: z.literal("pathway"),
  /** Layman explanation using an analogy. */
  analogy: z.string(),
  nodes: z.array(PathwayNodeSchema),
  edges: z.array(PathwayEdgeSchema),
  /** How drugs attack it. */
  interventions: z.array(z.string()).default([]),
});

export const TermSchema = Base.extend({
  kind: z.literal("term"),
  category: z.string(),
  /**
   * Date English Wikipedia was last searched for this term and found to have no article about it (title or redirect
   * matching the name or an alias, medical sense). Set by scripts/fetch-term-wikipedia.ts for its SKIP list; the
   * term-wikipedia gauge counts a term with this date as explained, and the term page says "No Wikipedia article".
   * Meaningless alongside `wikipedia`.
   */
  wikipediaChecked: isoDate.optional(),
});

export const TrialSchema = Base.extend({
  kind: z.literal("trial"),
  nct: z.string().optional(),
  phase: z.enum(["1", "1/2", "2", "2/3", "3", "4", "observational", "platform"]),
  setting: z.string(),
  sponsor: z.string().optional(),
  /** Headline result in one or two sentences, with numbers only if sourced. */
  result: z.string().optional(),
  yearReported: z.number().int().optional(),
  enrolled: z.number().int().optional(),
  /**
   * What `enrolled` counts. "registry" (the default) means the ClinicalTrials.gov figure, so a gap against the
   * registry is a contradiction for scripts/roadmap-watch.ts to flag. The other values mean the figure is taken from
   * the primary paper and counts that population (patients randomised, analysed, treated, or registered on the
   * study), so a gap against the registry is expected and is reported as explained. Say why in `enrolledNote`.
   */
  enrolledBasis: z.enum(["registry", "randomised", "analysed", "treated", "registered"]).default("registry"),
  /** One sentence giving the registry figure and why it differs from `enrolled`; required when `enrolledBasis` is not "registry" (src/lib/corpus-rules.test.ts). */
  enrolledNote: z.string().optional(),
  /** Structured outcomes; values in the arm's unit (months, percent). Enables pictograms and comparisons. */
  outcomes: z.array(z.object({
    endpoint: z.string(),
    primary: z.boolean().optional(),
    unit: z.string().optional(),
    arms: z.array(z.object({ name: z.string(), n: z.number().int().optional(), value: z.number().optional(), note: z.string().optional() })).min(1),
    hr: z.number().optional(),
    ci: z.tuple([z.number(), z.number()]).optional(),
    p: z.string().optional(),
    source: url.optional(),
  })).default([]),
  /** Has an independent trial or real-world study confirmed the effect? */
  replication: z.string().optional(),
});

export const PairingSchema = Base.extend({
  kind: z.literal("pairing"),
  a: id,
  b: id,
  /** Why the pair works better than either alone. */
  rationale: z.string(),
  evidence: z.string(),
  pairingType: z.enum(["combination", "sequence", "diagnostic-therapeutic", "platform", "caution"]),
});

export const RoadmapStepSchema = z.object({
  era: z.string(),
  title: z.string(),
  description: z.string(),
  refs: z.array(id).default([]),
  status: z.enum(["historic", "current", "emerging", "speculative"]),
});

/** A dated thing to watch for on a roadmap: a readout, a decision, a completion date. `expected` is quoted from the source (a registry completion date, a meeting date), never inferred. */
export const RoadmapWatchSchema = z.object({
  item: z.string().min(1),
  expected: z.string().optional(),
  source: url.optional(),
  refs: z.array(id).default([]),
});
export type RoadmapWatch = z.infer<typeof RoadmapWatchSchema>;

export const RoadmapSchema = Base.extend({
  kind: z.literal("roadmap"),
  steps: z.array(RoadmapStepSchema).min(2),
  /** What to watch next, with expected dates where a source states them. Rendered under the steps and checked against the registries by scripts/roadmap-watch.ts. */
  watch: z.array(RoadmapWatchSchema).default([]),
});

export const IdeaSchema = Base.extend({
  kind: z.literal("idea"),
  hypothesis: z.string(),
  rationale: z.string(),
  /** What experiment or trial would confirm or kill it. */
  test: z.string(),
  maturity: z.enum(["speculative", "preclinical-evidence", "early-clinical", "being-tested-at-scale"]),
  /** Who would have to act: research, clinic, industry, regulator, payer, policy, patients, data, philanthropy. */
  actor: z.enum(["research", "clinic", "industry", "regulator", "payer", "policy", "patients", "data", "philanthropy", "engineering"]).optional(),
  /** Rough cost to try: small (<$1M), medium ($1-50M), large (>$50M). */
  cost: z.enum(["small", "medium", "large"]).optional(),
  /** Time to first evidence of impact in years. */
  horizonYears: z.number().int().min(0).max(30).optional(),
});

/** A key paper: a landmark publication explained. One page each: what it found, what it means, and what to be careful about. */
export const PaperSchema = Base.extend({
  kind: z.literal("paper"),
  journal: z.string(),
  year: z.number().int(),
  doi: z.string().optional(),
  pmid: z.string().optional(),
  /** "Surname A, Surname B, et al." */
  authors: z.string(),
  paperType: z.enum(["rct", "meta-analysis", "observational", "real-world", "basic", "translational", "review", "guideline", "methods"]),
  /** The key results, one per item, with the numbers. */
  findings: z.array(z.string()).default([]),
  /** Plain English: what this changes for patients, clinicians or the field. */
  whatItMeans: z.string(),
  /** Limitations, open questions, disputes. */
  caveats: z.array(z.string()).default([]),
  /** Did it change guidelines or approvals? */
  changedPractice: z.boolean().optional(),
  /** Roughly how many participants, for trials and cohorts. */
  participants: z.number().int().optional(),
});

/** A journal or publication venue: where the evidence is published, with its stance, access model and the key papers it carried. */
export const JournalSchema = Base.extend({
  kind: z.literal("journal"),
  publisher: z.string(),
  url,
  issn: z.string().optional(),
  /** Broad scope: general medicine, oncology, haematology, basic science, radiology, etc. */
  scope: z.string(),
  /** Open access model: subscription, hybrid, open access, diamond. */
  access: z.enum(["subscription", "hybrid", "open-access", "diamond"]).optional(),
  founded: z.number().int().optional(),
  /** Latest impact factor or citation metric, with the year it refers to. Optional and clearly labelled. */
  impactFactor: z.object({ value: z.number(), year: z.number().int(), source: z.string().optional() }).optional(),
  /** Names as they appear in paper records, so papers can be matched to this journal. */
  matchNames: z.array(z.string()).default([]),
  society: z.string().optional(),
});

/** A bottleneck: a systemic constraint that slows the whole war on cancer. Ideas link to bottlenecks; the fixes are derived by backlink. */
export const BottleneckSchema = Base.extend({
  kind: z.literal("bottleneck"),
  /** Where in the pipeline it bites. */
  stage: z.enum(["biology", "prevention-detection", "trials", "regulation-manufacturing", "access-delivery", "data-knowledge", "funding-incentives", "people-culture"]),
  severity: z.enum(["critical", "major", "moderate"]),
  /** Numbers that show the size of the problem, each with a source. */
  metrics: z.array(z.object({ label: z.string(), value: z.string(), source: z.string().optional(), url: url.optional() })).default([]),
  /** Root causes, plain English, one per item. */
  causes: z.array(z.string()).default([]),
  /** What is already being tried and by whom. */
  currentEfforts: z.array(z.string()).default([]),
  /** What would count as the bottleneck being broken. */
  successLooksLike: z.string().optional(),
});

export const CollectionSchema = Base.extend({
  kind: z.literal("collection"),
  url,
  holds: z.string(),
  license: z.string().optional(),
  maintainer: z.string().optional(),
});

export const PersonSchema = Base.extend({
  kind: z.literal("person"),
  /** Current role and affiliation in one line, e.g. "Chief, Breast Medicine Service". */
  role: z.string(),
  /** Primary institution id (also list in `institutions`). */
  institutionId: id.optional(),
  specialisms: z.array(z.string()).default([]),
  /** Professional links: profile, lab, Google Scholar, ORCID, PubMed, X/LinkedIn. */
  profiles: z.array(z.object({ label: z.string(), url })).default([]),
  /** Selected publications, most recent or most cited first. */
  papers: z.array(z.object({ title: z.string(), journal: z.string().optional(), year: z.number().int().optional(), url: url.optional(), doi: z.string().optional(), note: z.string().optional() })).default([]),
  orcid: z.string().optional(),
  hIndex: z.number().int().optional(),
  /**
   * Whether an empty `papers` list is a gap. Normally derived from `role` (src/lib/person-roles.ts): administrators,
   * donors, patients, advocates and public figures are not expected to have papers. Set only where the role line
   * misleads that rule, e.g. `true` for "Founder and Director of the Institute for Protein Design" (a scientist),
   * `false` for "Chair, Board of Directors" (an administrator the rule misses).
   */
  papersExpected: z.boolean().optional(),
});

export const EntitySchema = z.discriminatedUnion("kind", [
  CancerSchema,
  SectionSchema,
  TechnologySchema,
  TargetSchema,
  DrugSchema,
  CompanySchema,
  InstitutionSchema,
  PathwaySchema,
  TermSchema,
  TrialSchema,
  PairingSchema,
  RoadmapSchema,
  IdeaSchema,
  CollectionSchema,
  PersonSchema,
  BottleneckSchema,
  PaperSchema,
  JournalSchema,
]);

export type Entity = z.infer<typeof EntitySchema>;
export type Cancer = z.infer<typeof CancerSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Technology = z.infer<typeof TechnologySchema>;
export type Target = z.infer<typeof TargetSchema>;
export type Drug = z.infer<typeof DrugSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type Institution = z.infer<typeof InstitutionSchema>;
export type Pathway = z.infer<typeof PathwaySchema>;
export type Term = z.infer<typeof TermSchema>;
export type Trial = z.infer<typeof TrialSchema>;
export type Pairing = z.infer<typeof PairingSchema>;
export type Roadmap = z.infer<typeof RoadmapSchema>;
export type Idea = z.infer<typeof IdeaSchema>;
export type Collection = z.infer<typeof CollectionSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type Bottleneck = z.infer<typeof BottleneckSchema>;
export type Paper = z.infer<typeof PaperSchema>;
export type Journal = z.infer<typeof JournalSchema>;

/** Input types (before defaults are applied) — what authors write in data files. */
export type CancerInput = z.input<typeof CancerSchema>;
export type SectionInput = z.input<typeof SectionSchema>;
export type TechnologyInput = z.input<typeof TechnologySchema>;
export type TargetInput = z.input<typeof TargetSchema>;
export type DrugInput = z.input<typeof DrugSchema>;
export type CompanyInput = z.input<typeof CompanySchema>;
export type InstitutionInput = z.input<typeof InstitutionSchema>;
export type PathwayInput = z.input<typeof PathwaySchema>;
export type TermInput = z.input<typeof TermSchema>;
export type TrialInput = z.input<typeof TrialSchema>;
export type PairingInput = z.input<typeof PairingSchema>;
export type RoadmapInput = z.input<typeof RoadmapSchema>;
export type IdeaInput = z.input<typeof IdeaSchema>;
export type CollectionInput = z.input<typeof CollectionSchema>;
export type PersonInput = z.input<typeof PersonSchema>;
export type BottleneckInput = z.input<typeof BottleneckSchema>;
export type PaperInput = z.input<typeof PaperSchema>;
export type JournalInput = z.input<typeof JournalSchema>;
export type EntityInput = z.input<typeof EntitySchema>;

/**
 * Open-source projects in oncology (/open-source/). Not an entity kind: the records live in src/data/open-source.ts,
 * GENERATED by scripts/fetch-open-source.ts from the hand-curated list in scripts/open-source-curated.ts plus what
 * the GitHub API (or the project page, for projects not on GitHub) said on the day. Every record carries the URL
 * that was fetched with status 200 and the licence as the project states it.
 */
export const OPEN_SOURCE_CATEGORIES = [
  "analysis-pipeline",
  "variant-interpretation",
  "imaging-segmentation",
  "radiotherapy-planning",
  "pathology",
  "single-cell-spatial",
  "drug-discovery-chemistry",
  "trial-infrastructure",
  "data-commons",
  "clinical-decision-support",
  "patient-facing",
  "hardware",
  "standards-ontologies",
  "education",
] as const;
export type OpenSourceCategory = (typeof OPEN_SOURCE_CATEGORIES)[number];

/** How open the project is beyond the code licence: what a reader can actually take away and reuse. */
export const OPENNESS = [
  "open-code-open-data",
  "open-code-closed-data",
  "open-code",
  "open-weights",
  "gated-weights",
  "open-data",
  "access-controlled-data",
  "open-hardware",
  "open-content",
  "open-standard",
] as const;
export type Openness = (typeof OPENNESS)[number];

export const OpenSourceProjectSchema = z.object({
  id,
  name: z.string().min(1),
  /** Plain English, one or two sentences: what it does and who it is for. */
  summary: z.string().min(20),
  /** The project's own one-line description as the API or page gave it, verbatim. */
  description: z.string().optional(),
  category: z.enum(OPEN_SOURCE_CATEGORIES),
  /** SPDX id as the repository declares it, or "custom" (see licenceNote), "not stated" or "none stated". */
  licence: z.string().min(1),
  licenceNote: z.string().optional(),
  language: z.string().optional(),
  repo: url.optional(),
  homepage: url.optional(),
  /** Who maintains it, as free text; `maintainerId` when that maintainer is an institution or company in the corpus. */
  maintainer: z.string().optional(),
  maintainerId: id.optional(),
  /** Year the repository was created (the API's created_at): the closest thing to a first release the API gives. */
  since: z.number().int().min(1990).max(2100).optional(),
  /** Date of the last push (the API's pushed_at). */
  lastCommit: isoDate.optional(),
  stars: z.number().int().nonnegative().optional(),
  /** First non-Zenodo DOI named in the README or project page, when there is one. */
  doi: z.string().regex(/^10\.\d{4,9}\/\S+$/).optional(),
  cancers: z.array(id).default([]),
  targets: z.array(id).default([]),
  technologies: z.array(id).default([]),
  /** Ids from src/data/data-sources.ts this project reads, serves or is the code behind. */
  dataSources: z.array(id).default([]),
  /** Collection ids: the open database the project is the code behind, or the dataset it publishes. */
  collections: z.array(id).default([]),
  openness: z.enum(OPENNESS),
  opennessNote: z.string().optional(),
  /** False for a project listed as a model of open practice that is not about cancer (Open Source Malaria). */
  oncology: z.boolean().default(true),
  archived: z.boolean().optional(),
  source: z.object({ url, status: z.literal(200), fetched: isoDate }),
});
export type OpenSourceProject = z.infer<typeof OpenSourceProjectSchema>;
export type OpenSourceProjectInput = z.input<typeof OpenSourceProjectSchema>;

/* ------------------------------------------------------------------------------------------------
 * Combination proposals (the open pipeline, /pipeline/engine/).
 *
 * A CombinationIdea is a hypothesis, not a corpus entity: a cell of the modular-drug permutation
 * space (ADC target x payload class, radioligand target x isotope, CAR-T target x costimulatory
 * domain, bispecific target A x target B, degrader target x E3 ligase) where both components are
 * validated but no corpus drug combines them. Each row carries the score that ranked it, the
 * corpus records its rationale rests on, and every piece of public evidence found that a company
 * or group may already be testing it. Evidence rows quote a fetched source; a row with none says so.
 * See docs/OPEN-PIPELINE.md for the scoring formula and the search method.
 * ---------------------------------------------------------------------------------------------- */

export const COMBINATION_FORMATS = ["adc", "radioligand", "car-t", "bispecific", "degrader"] as const;
export type CombinationFormat = (typeof COMBINATION_FORMATS)[number];

export const COMBINATION_EVIDENCE_KINDS = ["trial", "paper", "patent", "company-page"] as const;
export type CombinationEvidenceKind = (typeof COMBINATION_EVIDENCE_KINDS)[number];

export const COMBINATION_STATUSES = ["no public evidence", "preclinical evidence", "clinical evidence", "already in development (missed by decomposer)"] as const;
export type CombinationStatus = (typeof COMBINATION_STATUSES)[number];

/** How strongly a component is validated: by an approved drug, by a phase-3, phase-2 or phase-1/2 programme, or not at all. */
export const COMPONENT_VALIDATION_LEVELS = ["approved", "phase-3", "phase-2", "phase-1-2", "none"] as const;
export type ComponentValidationLevel = (typeof COMPONENT_VALIDATION_LEVELS)[number];

/** One fetched source. `source` is the identifier (NCT number, PMID or DOI, patent publication number, page title); `quote` is a verbatim sentence from it. */
export const CombinationEvidenceSchema = z.object({
  kind: z.enum(COMBINATION_EVIDENCE_KINDS),
  source: z.string().min(1),
  url: z.string().url().regex(/^https:\/\//, "evidence urls must be https"),
  date: isoDate,
  quote: z.string().min(1),
  /** Sponsor, assignee or author group named in the source. */
  sponsor: z.string().min(1).optional(),
  /** Reviewer's note: what this source does and does not show (e.g. "programme discontinued 2019"). */
  note: z.string().optional(),
  /** True when the source tests a neighbouring cell (same target, different partner component): kept for context, it does not set `status`. */
  adjacent: z.boolean().optional(),
});
export type CombinationEvidence = z.infer<typeof CombinationEvidenceSchema>;

const ComponentValidationSchema = z.object({
  level: z.enum(COMPONENT_VALIDATION_LEVELS),
  /**
   * Corpus drug ids that establish the level. Empty when the level rests on a fetched source instead of a
   * corpus record (a component the corpus does not yet cover, such as the VHL E3 ligase); the `evidence`
   * array must then carry the row that establishes it, which a test enforces.
   */
  via: z.array(id).default([]),
});

export const CombinationIdeaSchema = z.object({
  id,
  format: z.enum(COMBINATION_FORMATS),
  /** Human name of the construct, e.g. "PSMA ADC with a topoisomerase-I payload". */
  name: z.string().min(1),
  /**
   * Components keyed by axis. Keys per format: adc -> target, payloadClass; radioligand -> target, isotope;
   * car-t -> target, costimulatoryDomain; bispecific -> targetA, targetB; degrader -> target, e3Ligase.
   * Values are corpus ids where one exists (targets, payload-class terms, cereblon, cd28) and stable kebab-case
   * keys otherwise (lutetium-177, actinium-225, yttrium-90, iodine-131, lead-212, 4-1bb, vhl).
   */
  components: z.record(z.string(), z.string().min(1)),
  targets: z.array(id).min(1),
  cancers: z.array(id).min(1),
  /** Two plain-English sentences; every claim names the corpus record it rests on in parentheses. */
  rationale: z.string().min(1),
  /** Why the pairing is or is not plausible on first principles (internalisation, tumour restriction, antigen homogeneity, ligase expression). */
  plausibilityNote: z.string().min(1),
  validation: z.object({ a: ComponentValidationSchema, b: ComponentValidationSchema }),
  /** Score out of 100 = burden (0-40) + validationA (0-15) + validationB (0-15) + plausibility (0-30). docs/OPEN-PIPELINE.md gives the formula. */
  score: z.object({
    total: z.number().int().min(0).max(100),
    burden: z.number().int().min(0).max(40),
    /** World deaths in 2022 (GLOBOCAN) summed over the distinct sites of `cancers`; the input to `burden`. */
    worldDeaths: z.number().int().min(0),
    validationA: z.number().int().min(0).max(15),
    validationB: z.number().int().min(0).max(15),
    plausibility: z.number().int().min(0).max(30),
  }),
  evidence: z.array(CombinationEvidenceSchema).default([]),
  status: z.enum(COMBINATION_STATUSES),
  /** What would need to be true for this to work: the caveat a reader should carry away. */
  caveat: z.string().min(1),
  /** Corpus drug ids that already occupy this cell but whose record lacks the field the decomposer needs (payload, ligase). */
  decomposerMissed: z.array(id).default([]),
  /** Every corpus id the rationale and plausibility note cite, so a test can check they resolve. */
  refs: z.array(id).default([]),
  /** The search that produced `evidence`: when it ran and the query strings, so anyone can repeat it. */
  searched: z.object({ on: isoDate, ctgov: z.array(z.string()), europepmc: z.array(z.string()), patents: z.array(z.string()) }),
  asOf: isoDate,
});
export type CombinationIdea = z.infer<typeof CombinationIdeaSchema>;
export type CombinationIdeaInput = z.input<typeof CombinationIdeaSchema>;
