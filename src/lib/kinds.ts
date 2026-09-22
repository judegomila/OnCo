/**
 * The zod-free half of the data model: the kind and status lists, the relationship field names, KIND_META and
 * routeFor. Client components import these from here so that the header, the palette and every chip do not pull
 * zod and the validation schemas (src/lib/schema.ts) into the browser bundle of every page; schema.ts re-exports
 * them, so server code can keep importing everything from one place.
 */
export const KINDS = [
  "cancer",
  "section",
  "technology",
  "target",
  "drug",
  "company",
  "institution",
  "pathway",
  "term",
  "trial",
  "pairing",
  "roadmap",
  "idea",
  "collection",
  "person",
  "bottleneck",
  "paper",
  "journal",
] as const;
export type Kind = (typeof KINDS)[number];

export const STATUSES = [
  "approved",
  "phase-3",
  "phase-2",
  "phase-1",
  "preclinical",
  "concept",
  "standard-of-care",
  "established",
  "emerging",
  "historic",
  "withdrawn",
  "active",
  "completed",
  "recruiting",
  "positive",
  "negative",
  "mixed",
  "planned",
] as const;
export type Status = (typeof STATUSES)[number];

/** The relationship array fields shared by every entity. */
export const REL_FIELDS = [
  "related",
  "cancers",
  "sections",
  "technologies",
  "targets",
  "drugs",
  "companies",
  "institutions",
  "pathways",
  "terms",
  "trials",
  "people",
  "bottlenecks",
  "keyPapers",
  "journals",
  "dependsOn",
] as const;
export type RelField = (typeof REL_FIELDS)[number];

export const KIND_META: Record<Kind, { plural: string; label: string; route: string; blurb: string; color: string; /** Display title where the plural is not the best public name (e.g. "Treatments & tests" for drugs, which also covers tests and devices). */ title?: string }> = {
  cancer: { plural: "cancers", label: "Cancer", route: "cancers", blurb: "One page per disease: state of the art, history, and what is coming.", color: "rose" },
  section: { plural: "fronts", label: "Front", route: "fronts", blurb: "The fronts of the war on cancer: from imaging and early detection to ADCs, radiopharma, and cell therapy.", color: "slate" },
  technology: { plural: "technologies", label: "Technology", route: "technologies", blurb: "Every way we see, measure, or attack a tumour, explained.", color: "sky" },
  target: { plural: "targets", label: "Target", route: "targets", blurb: "The molecules drugs and tracers aim at.", color: "violet" },
  drug: { plural: "drugs", label: "Treatment", route: "drugs", title: "Treatments & tests", blurb: "Approved and pipeline products, with what they hit and who makes them.", color: "emerald" },
  company: { plural: "companies", label: "Company", route: "companies", blurb: "Who is building what.", color: "amber" },
  institution: { plural: "institutions", label: "Institution", route: "institutions", blurb: "The centres and universities that matter, mapped and ranked.", color: "teal" },
  pathway: { plural: "pathways", label: "Pathway", route: "pathways", blurb: "The classic signalling circuits, drawn and explained.", color: "fuchsia" },
  term: { plural: "terms", label: "Term", route: "terms", title: "Glossary", blurb: "Glossary with plain-English TL;DRs and Wikipedia links.", color: "zinc" },
  trial: { plural: "trials", label: "Trial", route: "trials", blurb: "Landmark and current trials that define the standard of care.", color: "indigo" },
  pairing: { plural: "pairings", label: "Pairing", route: "pairings", blurb: "Things that work better together, and things that do not.", color: "orange" },
  roadmap: { plural: "roadmaps", label: "Roadmap", route: "roadmaps", blurb: "Where a technology has been and where it is heading.", color: "cyan" },
  idea: { plural: "ideas", label: "Idea", route: "ideas", blurb: "Hypotheses and new directions, linked to the evidence.", color: "lime" },
  collection: { plural: "collections", label: "Collection", route: "collections", blurb: "The open databases and registries the field runs on.", color: "stone" },
  person: { plural: "people", label: "Person", route: "people", blurb: "The clinicians and scientists doing the work: specialisms, bios, papers, and where to find them.", color: "pink" },
  journal: { plural: "journals", label: "Journal", route: "journals", blurb: "Where the evidence is published: the journals, their scope and access model, and the key papers each one carried.", color: "slate" },
  paper: { plural: "key papers", label: "Key paper", route: "key-papers", blurb: "The papers that changed practice or thinking, each explained: what it found, what it means, and what to be careful about.", color: "sky" },
  bottleneck: { plural: "bottlenecks", label: "Bottleneck", route: "bottlenecks", blurb: "The systemic constraints slowing the whole war on cancer, with the ideas that could break each one.", color: "red" },
};

export function routeFor(e: { kind: Kind; id: string }): string {
  return `/${KIND_META[e.kind].route}/${e.id}/`;
}
