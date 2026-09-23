import { graph } from "@/lib/graph";
import type { Bottleneck, Cancer, Drug, Entity, Idea, Paper, Pathway, Target, Technology, Term } from "@/lib/schema";
import { MECHANICS, type MechanicsChapter, type MechanicsStage } from "@/data/mechanics-atlas";
import { assaysForTarget, type Assay } from "@/data/assays";

/**
 * Server-side helpers for the mechanics atlas: the ordered list of stages, the records each stage resolves to,
 * and the counts the hub shows as pills. Everything here is derived from the graph; nothing is written by hand
 * beyond the atlas itself (src/data/mechanics-atlas.ts).
 */

export type StageRef = {
  chapter: MechanicsChapter;
  chapterIndex: number;
  stage: MechanicsStage;
  stageIndex: number;
  /** "3.2": chapter three, second stage. */
  number: string;
  route: string;
};

/** Section ids on a stage page, in reading order. The hub's count pills deep-link into them. */
export const STAGE_SECTIONS = [
  { id: "diagram", label: "Diagram" },
  { id: "what-happens", label: "What happens" },
  { id: "players", label: "The molecular players" },
  { id: "medicines", label: "Where medicines act" },
  { id: "escape", label: "How tumours escape" },
  { id: "measured", label: "Measured by" },
  { id: "questions", label: "Open questions" },
  { id: "evidence", label: "Key evidence" },
] as const;
export type StageSectionId = (typeof STAGE_SECTIONS)[number]["id"];

let flat: StageRef[] | undefined;

/** Every stage in atlas order with its chapter and number. */
export function mechanicsStages(): StageRef[] {
  if (!flat) {
    flat = [];
    MECHANICS.forEach((chapter, chapterIndex) => {
      chapter.stages.forEach((stage, stageIndex) => {
        flat!.push({ chapter, chapterIndex, stage, stageIndex, number: `${chapterIndex + 1}.${stageIndex + 1}`, route: `/mechanics/${stage.id}/` });
      });
    });
  }
  return flat;
}

export function mechanicsStage(id: string): StageRef | undefined {
  return mechanicsStages().find((s) => s.stage.id === id);
}

/** The stage before and after, in atlas order (none at the ends). */
export function stageNeighbours(id: string): { prev?: StageRef; next?: StageRef } {
  const all = mechanicsStages();
  const i = all.findIndex((s) => s.stage.id === id);
  if (i < 0) return {};
  return { prev: all[i - 1], next: all[i + 1] };
}

/** The first sentence of a plain-English paragraph. */
export function firstSentence(text: string): string {
  const m = /^(.+?[.!?])(\s|$)/.exec(text.trim());
  return (m ? m[1] : text).trim();
}

function pick<K extends Entity["kind"]>(ids: readonly string[] | undefined, kind: K): Extract<Entity, { kind: K }>[] {
  const g = graph();
  const out: Extract<Entity, { kind: K }>[] = [];
  const seen = new Set<string>();
  for (const id of ids ?? []) {
    if (seen.has(id)) continue;
    seen.add(id);
    const e = g.get(id);
    if (e && e.kind === kind) out.push(e as Extract<Entity, { kind: K }>);
  }
  return out;
}

/** Ids a stage is "about": its pathways, targets, terms and bottlenecks. Ideas and papers linking to any of them belong to the stage. */
function stageAnchorIds(stage: MechanicsStage): string[] {
  return [...new Set([...stage.pathways, ...stage.targets, ...stage.terms, ...(stage.bottlenecks ?? [])])];
}

/** Targets drawn as nodes in the stage's diagrams (not necessarily listed on the stage). */
function nodeTargets(pathways: Pathway[]): Map<string, Array<{ pathway: Pathway; nodeId: string; label: string }>> {
  const out = new Map<string, Array<{ pathway: Pathway; nodeId: string; label: string }>>();
  for (const p of pathways) for (const n of p.nodes) if (n.targetId) out.set(n.targetId, [...(out.get(n.targetId) ?? []), { pathway: p, nodeId: n.id, label: n.label }]);
  return out;
}

const ESCAPE_RE = /\bresist|escape|evad|evasion|bypass|toleran|persist|relapse|refractory|reversion|lost antigen|antigen loss|immune exclusion|efflux|transformation|plasticity|adaptive|selection|clonal|dormanc|sanctuary/i;
const MEASURE_CATEGORIES = new Set(["Biomarkers", "Diagnostics & imaging", "Pathology", "Genomics & genetics"]);
const MEASURE_SECTIONS = new Set(["diagnostics", "imaging", "early-detection", "screening"]);
const MATURITY_ORDER = ["being-tested-at-scale", "early-clinical", "preclinical-evidence", "speculative"];

export type MedicineGroup = {
  /** The target the drugs hit, when it is drawn as a node in one of the stage's diagrams. */
  target?: Target;
  /** Node labels the group corresponds to, with the diagram they sit in. */
  nodes: Array<{ pathway: Pathway; nodeId: string; label: string }>;
  drugs: Array<{ drug: Drug; cancers: Cancer[] }>;
  total: number;
};

export type Player = { target: Target; role: Target["targetClass"]; drawn: boolean; listed: boolean; medicines: number };

export type StageContent = {
  ref: StageRef;
  pathways: Pathway[];
  terms: Term[];
  technologies: Technology[];
  bottlenecks: Bottleneck[];
  players: Player[];
  medicines: MedicineGroup[];
  medicineCount: number;
  escape: { terms: Term[]; ideas: Idea[]; papers: Paper[]; pathways: Pathway[] };
  measured: { terms: Term[]; assays: Assay[]; technologies: Technology[] };
  questions: { text: string[]; bottlenecks: Bottleneck[]; ideas: Idea[]; ideaTotal: number };
  evidence: { papers: Paper[]; total: number };
  /** Other stages that share a diagram or a target with this one, strongest first. */
  related: Array<{ ref: StageRef; shared: string[] }>;
};

const IDEAS_SHOWN = 10;
const PAPERS_SHOWN = 12;
const DRUGS_PER_GROUP = 8;
const CANCERS_PER_DRUG = 3;

/** Drugs that act at a target, most advanced first. */
function drugsAtTarget(targetId: string): Drug[] {
  const g = graph();
  const order = ["approved", "standard-of-care", "phase-3", "positive", "phase-2", "phase-1", "preclinical"];
  return ((g.incoming(targetId).get("drug") ?? []) as Drug[]).slice().sort((a, b) => (order.indexOf(a.status ?? "") + 1 || 99) - (order.indexOf(b.status ?? "") + 1 || 99) || a.name.localeCompare(b.name));
}

function approvedCancers(d: Drug): Cancer[] {
  if (d.status !== "approved" && d.status !== "standard-of-care") return [];
  return pick(d.cancers, "cancer").slice(0, CANCERS_PER_DRUG);
}

/** Every record a stage page shows, resolved from the graph. */
export function stageContent(ref: StageRef): StageContent {
  const g = graph();
  const { stage } = ref;
  const pathways = pick(stage.pathways, "pathway");
  const terms = pick(stage.terms, "term");
  const technologies = pick(stage.technologies, "technology");
  const bottlenecks = pick(stage.bottlenecks, "bottleneck");
  const listedTargets = pick(stage.targets, "target");
  const drawn = nodeTargets(pathways);

  // Players: listed targets plus every target drawn as a node, with its class as the role pill.
  const playerMap = new Map<string, Player>();
  for (const t of listedTargets) playerMap.set(t.id, { target: t, role: t.targetClass, drawn: drawn.has(t.id), listed: true, medicines: drugsAtTarget(t.id).length });
  for (const id of drawn.keys()) {
    if (playerMap.has(id)) continue;
    const t = g.get(id);
    if (t?.kind === "target") playerMap.set(id, { target: t, role: t.targetClass, drawn: true, listed: false, medicines: drugsAtTarget(id).length });
  }
  const players = [...playerMap.values()].sort((a, b) => Number(b.listed) - Number(a.listed) || b.medicines - a.medicines || a.target.name.localeCompare(b.target.name));

  // Medicines grouped by the node they hit. Listed drugs whose targets are not drawn form a final "listed here" group.
  const groups: MedicineGroup[] = [];
  const placed = new Set<string>();
  const targetOrder = [...players.map((p) => p.target.id)];
  for (const targetId of targetOrder) {
    const target = g.get(targetId);
    if (target?.kind !== "target") continue;
    const all = drugsAtTarget(targetId).filter((d) => !placed.has(d.id));
    if (!all.length) continue;
    // Listed drugs come first within the group.
    const listed = new Set(stage.drugs);
    all.sort((a, b) => Number(listed.has(b.id)) - Number(listed.has(a.id)));
    const shown = all.slice(0, DRUGS_PER_GROUP);
    // A drug that hits two of the stage's targets is counted and shown once, under the first.
    for (const d of all) placed.add(d.id);
    groups.push({ target, nodes: drawn.get(targetId) ?? [], drugs: shown.map((drug) => ({ drug, cancers: approvedCancers(drug) })), total: all.length });
  }
  const loose = pick(stage.drugs, "drug").filter((d) => !placed.has(d.id));
  if (loose.length) groups.push({ nodes: [], drugs: loose.map((drug) => ({ drug, cancers: approvedCancers(drug) })), total: loose.length });
  const medicineCount = groups.reduce((n, grp) => n + grp.total, 0);

  // Ideas and papers linked to what the stage is about.
  const anchors = stageAnchorIds(stage);
  const ideaMap = new Map<string, Idea>();
  const paperMap = new Map<string, Paper>();
  for (const id of anchors) {
    for (const e of g.incoming(id).get("idea") ?? []) if (e.kind === "idea") ideaMap.set(e.id, e);
    for (const e of g.incoming(id).get("paper") ?? []) if (e.kind === "paper") paperMap.set(e.id, e);
    const e = g.get(id);
    if (e) for (const p of pick(e.keyPapers, "paper")) paperMap.set(p.id, p);
  }
  const ideas = [...ideaMap.values()].sort((a, b) => MATURITY_ORDER.indexOf(a.maturity) - MATURITY_ORDER.indexOf(b.maturity) || a.name.localeCompare(b.name));
  const papers = [...paperMap.values()].sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));

  const isEscape = (e: Entity) => ESCAPE_RE.test(e.name) || ESCAPE_RE.test(e.tldr);
  const escapeTerms = terms.filter((t) => t.category === "Resistance" || isEscape(t));
  const escapeIdeas = ideas.filter(isEscape).slice(0, IDEAS_SHOWN);
  const escapePapers = papers.filter(isEscape).slice(0, 6);
  const escapePathways = pathways.filter((p) => /resist|escape|evasion|exclusion|persister|efflux|plasticity|tolerance/i.test(p.name) || /resist|escape|evasion/i.test(p.id));

  // Measured by: biomarker and diagnostic terms on the stage, assays for its targets, diagnostic technologies.
  const measuredTerms = terms.filter((t) => MEASURE_CATEGORIES.has(t.category));
  const assayMap = new Map<string, Assay>();
  for (const p of players) for (const a of assaysForTarget(p.target.id)) assayMap.set(a.id, a);
  const measuredTech = technologies.filter((t) => t.sections.some((s) => MEASURE_SECTIONS.has(s)) || /test|assay|profiling|biopsy|pet\b|imaging|screening|mammography|colposcopy|surveillance|monitoring/i.test(t.name));

  const escapeIdeaIds = new Set(escapeIdeas.map((i) => i.id));
  const questionIdeas = ideas.filter((i) => !escapeIdeaIds.has(i.id));

  // Related stages: share a diagram (counts double) or a target.
  const mine = new Set(stage.pathways), myTargets = new Set([...stage.targets, ...drawn.keys()]);
  const related = mechanicsStages()
    .filter((s) => s.stage.id !== stage.id)
    .map((s) => {
      const shared: string[] = [];
      for (const p of s.stage.pathways) if (mine.has(p)) shared.push(p);
      const theirs = new Set([...s.stage.targets, ...nodeTargets(pick(s.stage.pathways, "pathway")).keys()]);
      for (const t of theirs) if (myTargets.has(t)) shared.push(t);
      const score = s.stage.pathways.filter((p) => mine.has(p)).length * 2 + (shared.length - s.stage.pathways.filter((p) => mine.has(p)).length);
      return { ref: s, shared, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.ref.chapterIndex - b.ref.chapterIndex || a.ref.stageIndex - b.ref.stageIndex)
    .slice(0, 6)
    .map(({ ref, shared }) => ({ ref, shared }));

  return {
    ref, pathways, terms, technologies, bottlenecks, players,
    medicines: groups, medicineCount,
    escape: { terms: escapeTerms, ideas: escapeIdeas, papers: escapePapers, pathways: escapePathways },
    measured: { terms: measuredTerms, assays: [...assayMap.values()], technologies: measuredTech },
    questions: { text: stage.openQuestions, bottlenecks, ideas: questionIdeas.slice(0, IDEAS_SHOWN), ideaTotal: questionIdeas.length },
    evidence: { papers: papers.slice(0, PAPERS_SHOWN), total: papers.length },
    related,
  };
}

export type StageCounts = { players: number; medicines: number; questions: number };

/** The three numbers the hub shows per stage; cheap enough to compute for all stages on one page. */
export function stageCounts(stage: MechanicsStage): StageCounts {
  const g = graph();
  const pathways = pick(stage.pathways, "pathway");
  const targets = new Set(stage.targets.filter((id) => g.get(id)?.kind === "target"));
  for (const id of nodeTargets(pathways).keys()) targets.add(id);
  const drugs = new Set(stage.drugs.filter((id) => g.get(id)?.kind === "drug"));
  for (const t of targets) for (const d of g.incoming(t).get("drug") ?? []) drugs.add(d.id);
  const ideas = new Set<string>();
  for (const id of stageAnchorIds(stage)) for (const e of g.incoming(id).get("idea") ?? []) ideas.add(e.id);
  const bottlenecks = (stage.bottlenecks ?? []).filter((id) => g.get(id)?.kind === "bottleneck").length;
  return { players: targets.size, medicines: drugs.size, questions: stage.openQuestions.length + bottlenecks + ideas.size };
}

/** Stages a record appears in: listed on the stage, or drawn as a node in one of its diagrams. */
export function stagesFor(entityId: string): StageRef[] {
  const g = graph();
  return mechanicsStages().filter(({ stage }) => {
    if (stage.pathways.includes(entityId) || stage.targets.includes(entityId) || stage.terms.includes(entityId) || stage.technologies.includes(entityId) || stage.drugs.includes(entityId) || (stage.bottlenecks ?? []).includes(entityId)) return true;
    for (const pid of stage.pathways) {
      const p = g.get(pid);
      if (p?.kind === "pathway" && p.nodes.some((n) => n.targetId === entityId)) return true;
    }
    return false;
  });
}

/** The stage whose subject best matches a cancer page's "how it spreads" link: the chapter's first stage by default. */
export function chapterFirstStage(chapterId: string): StageRef | undefined {
  return mechanicsStages().find((s) => s.chapter.id === chapterId);
}
