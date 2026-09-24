import { graph } from "@/lib/graph";
import type { Cancer, Drug, Target } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import {
  CHECKPOINT_CLASSES, CHECKPOINT_MEMBERS, type CheckpointClass, type CheckpointClassId, type CheckpointMember, type CheckpointRoot, type DrugClass,
} from "@/data/checkpoint-map";

/**
 * Server-side view of the checkpoint map: each member resolved to its target record, the drugs against it (the
 * map's own list plus every drug record that names the target), the strongest status among them, the approvals
 * with their regions and indications, and the cancers those approvals cover. Everything is derived from the graph;
 * the hand-written taxonomy is src/data/checkpoint-map.ts.
 */

export const CHECKPOINT_HUB: Record<CheckpointRoot, { route: string; title: string; short: string }> = {
  immune: { route: "/checkpoints/immune/", title: "Immune checkpoints", short: "Immune" },
  "cell-cycle": { route: "/checkpoints/cell-cycle/", title: "Cell-cycle and DNA-damage checkpoints", short: "Cell cycle" },
};

/** Strongest first. Statuses not listed (negative, withdrawn, historic) rank below the pipeline so a failed drug never becomes a member's headline. */
const STATUS_RANK: Record<string, number> = { approved: 0, "standard-of-care": 0, "phase-3": 1, "phase-2": 2, "phase-1": 3, preclinical: 4, concept: 5 };
export const DRUG_CLASS_LABEL: Record<DrugClass, string> = {
  antibody: "Antibody", bispecific: "Bispecific", "small-molecule": "Small molecule", agonist: "Agonist", adc: "Antibody-drug conjugate",
  "fusion-protein": "Fusion protein", "cell-therapy": "Cell therapy", vaccine: "Vaccine", antisense: "Antisense", other: "Other",
};

/** `derived` marks a drug the graph added (it names the target) rather than one the map classified by hand. */
export type MemberDrugRow = { drug: Drug; drugClass: DrugClass; note?: string; derived?: boolean };
export type ApprovalRow = { drug: Drug; region: string; year: number; indication: string };
export type MemberRow = {
  member: CheckpointMember;
  cls: CheckpointClass;
  target: Target;
  /** Every drug against the member, the map's classified list first. */
  drugs: MemberDrugRow[];
  /** The strongest status among the drugs, with the drug that holds it; undefined when nothing has a pipeline status. */
  best?: { status: string; drug: Drug };
  approvals: ApprovalRow[];
  /** Cancers named by the approved drugs. */
  approvedCancers: Cancer[];
  trialCount: number;
  /** Partner rows by member id, as label and anchor. */
  partners: Array<{ id: string; label: string; route: string }>;
  route: string;
};

export type HubView = { root: CheckpointRoot; classes: Array<{ cls: CheckpointClass; rows: MemberRow[] }>; rows: MemberRow[] };

/** Class of a drug from its modality and mechanism text, for drugs the map did not classify by hand. */
export function classifyDrug(d: Drug): DrugClass {
  const m = `${d.modality} ${d.mechanism}`.toLowerCase();
  if (/bispecific|duobody|\bx\s*cd3|×|trispecific/.test(m)) return "bispecific";
  if (/\badc\b|antibody-drug|drug conjugate|deruxtecan|vedotin|samrotecan|duocarmazine/.test(m)) return "adc";
  if (/car-t|car t|cell therapy|autoleucel|tcr-t|nk cell/.test(m)) return "cell-therapy";
  if (/vaccine|peptide antigen/.test(m)) return "vaccine";
  if (/antisense|oligonucleotide/.test(m)) return "antisense";
  if (/fusion|\btrap\b|anticalin|fc fusion/.test(m)) return "fusion-protein";
  if (/agonist/.test(m)) return "agonist";
  if (/antibody|\bmab\b|monoclonal/.test(m)) return "antibody";
  if (/small.molecule|inhibitor|oral|kinase|degrader|antagonist/.test(m)) return "small-molecule";
  return "other";
}

/** Companion diagnostics and kits are drug-kind records in the corpus; they measure a checkpoint, they do not act on it. */
export function isDiagnostic(d: Drug): boolean {
  return /\b(test|kit|assay|diagnostic|pharmdx|cdx|panel)\b/i.test(`${d.modality} ${d.name}`);
}

const classById = new Map(CHECKPOINT_CLASSES.map((c) => [c.id, c]));
const memberById = new Map(CHECKPOINT_MEMBERS.map((m) => [m.id, m]));

export function checkpointClass(id: CheckpointClassId): CheckpointClass { return classById.get(id)!; }
export function checkpointMember(id: string): CheckpointMember | undefined { return memberById.get(id); }
export function memberRoute(m: CheckpointMember): string { return `${CHECKPOINT_HUB[classById.get(m.classId)!.root].route}#${m.id}`; }

let rowsCache: Map<string, MemberRow> | undefined;

function buildRows(): Map<string, MemberRow> {
  const g = graph();
  const out = new Map<string, MemberRow>();
  for (const member of CHECKPOINT_MEMBERS) {
    const cls = classById.get(member.classId)!;
    const target = g.get(member.id);
    if (!target || target.kind !== "target") throw new Error(`Checkpoint map: ${member.id} is not a target record`);
    const seen = new Set<string>();
    const drugs: MemberDrugRow[] = [];
    for (const d of member.drugs) {
      const drug = g.get(d.id);
      if (!drug || drug.kind !== "drug") throw new Error(`Checkpoint map: ${member.id} names unknown drug ${d.id}`);
      if (seen.has(drug.id)) continue;
      seen.add(drug.id);
      drugs.push({ drug, drugClass: d.drugClass, note: d.note });
    }
    // Other drug records that name the target in `targets` (not tests or kits, which are products of another kind
    // here: a PD-L1 assay is not a drug against PD-L1).
    for (const e of g.incoming(member.id).get("drug") ?? []) {
      if (e.kind !== "drug" || !e.targets.includes(member.id) || seen.has(e.id) || isDiagnostic(e)) continue;
      seen.add(e.id);
      drugs.push({ drug: e, drugClass: classifyDrug(e), derived: true });
    }
    // The headline status comes from the drugs the map classified by hand when it names any; the graph's extras
    // only decide it for members the map left without a drug (so selinexor, linked to TP53, never makes p53 "approved").
    const explicit = new Set(member.drugs.map((d) => d.id));
    const headline = explicit.size ? drugs.filter((d) => explicit.has(d.drug.id)) : drugs;
    let best: MemberRow["best"];
    for (const { drug } of headline) {
      const r = STATUS_RANK[drug.status ?? ""];
      if (r === undefined) continue;
      if (!best || r < STATUS_RANK[best.status]) best = { status: drug.status!, drug };
    }
    const approvals: ApprovalRow[] = [];
    const cancerIds = new Set<string>();
    for (const { drug } of headline) {
      if (drug.status !== "approved" && drug.status !== "standard-of-care") continue;
      for (const a of drug.approvals) approvals.push({ drug, region: a.region, year: a.year, indication: a.indication });
      for (const c of drug.cancers) cancerIds.add(c);
    }
    approvals.sort((a, b) => a.year - b.year || a.region.localeCompare(b.region));
    const approvedCancers = [...cancerIds].map((id) => g.get(id)).filter((c): c is Cancer => !!c && c.kind === "cancer").sort((a, b) => a.name.localeCompare(b.name));
    const trialIds = new Set<string>();
    for (const { drug } of drugs) for (const t of drug.trials) trialIds.add(t);
    for (const e of g.incoming(member.id).get("trial") ?? []) trialIds.add(e.id);
    for (const { drug } of drugs) for (const e of g.incoming(drug.id).get("trial") ?? []) trialIds.add(e.id);
    const partners = member.partners.map((id) => { const p = memberById.get(id); if (!p) throw new Error(`Checkpoint map: ${member.id} names unknown partner ${id}`); return { id, label: p.label, route: memberRoute(p) }; });
    out.set(member.id, { member, cls, target, drugs, best, approvals, approvedCancers, trialCount: trialIds.size, partners, route: memberRoute(member) });
  }
  return out;
}

export function checkpointRows(): Map<string, MemberRow> {
  if (!rowsCache) rowsCache = buildRows();
  return rowsCache;
}

export function checkpointRow(id: string): MemberRow | undefined { return checkpointRows().get(id); }

export function hubView(root: CheckpointRoot): HubView {
  const rows = [...checkpointRows().values()].filter((r) => r.cls.root === root);
  const classes = CHECKPOINT_CLASSES.filter((c) => c.root === root).map((cls) => ({ cls, rows: rows.filter((r) => r.cls.id === cls.id) }));
  return { root, classes, rows };
}

/** Trials the member's drugs run, for the row's trial link: a filtered trial table by the member's symbol. */
export function memberTrialsRoute(r: MemberRow): string { return `/trials/?q=${encodeURIComponent(r.member.label.replace(/\s*\(.*\)$/, ""))}`; }
export function memberDrugsRoute(r: MemberRow): string { return `/drugs/?q=${encodeURIComponent(r.member.label.replace(/\s*\(.*\)$/, ""))}`; }

/** Counts for the hub landing page. */
export function hubSummary(root: CheckpointRoot) {
  const v = hubView(root);
  const approved = v.rows.filter((r) => r.best?.status === "approved" || r.best?.status === "standard-of-care").length;
  const drugs = new Set(v.rows.flatMap((r) => r.drugs.map((d) => d.drug.id))).size;
  return { members: v.rows.length, classes: v.classes.length, approved, drugs };
}

// ------------------------------------------------------------------------------------------------ pills on record pages

export type CheckpointRef = { member: CheckpointMember; cls: CheckpointClass; root: CheckpointRoot; route: string; hub: string };

/** Records that are not members but belong to one of the hubs: glossary terms, pathways, technologies and mechanics stages. */
const EXTRA_REFS: Record<string, CheckpointRoot | "both"> = {
  "immune-checkpoint": "immune", "immuno-oncology": "immune", "checkpoint-inhibitor": "immune", "pd1-checkpoint": "immune", "t-cell-exhaustion": "immune", "cancer-immunity-cycle": "immune",
  "lag3-blockade": "immune", "tigit-blockade": "immune", "tim3-blockade": "immune", "cd47-blockade": "immune", "cd40-agonists": "immune", "avoiding-immune-destruction": "immune", "t-cell-exhaustion-term": "immune",
  "cell-cycle": "cell-cycle", "synthetic-lethality": "cell-cycle", "p53-cell-cycle": "cell-cycle", "replication-stress": "cell-cycle", "ddr": "cell-cycle", "mitotic-spindle-checkpoint": "cell-cycle",
  "cdk46-inhibitor": "cell-cycle", "parp-inhibitor": "cell-cycle", "atr-chk1-inhibitors": "cell-cycle", "hrd": "cell-cycle",
  checkpoint: "both", checkpoints: "immune", "dna-damage-checkpoints": "cell-cycle",
};

/** The checkpoint family a record belongs to: its own row when it is a member, otherwise the hub(s) it concerns. */
export function checkpointRefsFor(id: string): { member?: CheckpointRef; hubs: CheckpointRoot[] } {
  const m = memberById.get(id);
  if (m) {
    const cls = classById.get(m.classId)!;
    return { member: { member: m, cls, root: cls.root, route: memberRoute(m), hub: CHECKPOINT_HUB[cls.root].route }, hubs: [cls.root] };
  }
  const x = EXTRA_REFS[id];
  if (!x) return { hubs: [] };
  return { hubs: x === "both" ? ["immune", "cell-cycle"] : [x] };
}

// ------------------------------------------------------------------------------------------------ JSON companions

export function hubJson(root: CheckpointRoot) {
  const v = hubView(root);
  const hub = CHECKPOINT_HUB[root];
  return {
    title: `OnCo checkpoint families: ${hub.title}`,
    page: absoluteUrl(hub.route),
    licence: "https://creativecommons.org/licenses/by-nc/4.0/",
    root,
    classes: v.classes.map(({ cls, rows }) => ({
      id: cls.id, name: cls.name, tone: cls.tone, plain: cls.plain, evidence: cls.evidence,
      members: rows.map((r) => ({
        id: r.member.id, label: r.member.label, symbol: r.member.symbol, hgnc: r.member.hgnc, side: r.member.side, gates: r.member.gates,
        target: absoluteUrl(`/targets/${r.target.id}/`), page: absoluteUrl(r.route),
        expressedOn: r.member.expressedOn, partners: r.partners.map((p) => p.id), partnerNote: r.member.partnerNote,
        bestStatus: r.best ? { status: r.best.status, drug: r.best.drug.id } : null,
        drugs: r.drugs.map((d) => ({ id: d.drug.id, name: d.drug.name, drugClass: d.drugClass, status: d.drug.status ?? null, note: d.note, page: absoluteUrl(`/drugs/${d.drug.id}/`) })),
        approvals: r.approvals.map((a) => ({ drug: a.drug.id, region: a.region, year: a.year, indication: a.indication })),
        approvedCancers: r.approvedCancers.map((c) => ({ id: c.id, name: c.name, page: absoluteUrl(`/cancers/${c.id}/`) })),
        trials: r.trialCount,
        pipelineNotes: r.member.pipelineNotes ?? [], discontinued: r.member.discontinued ?? [],
      })),
    })),
  };
}

export function familiesJson() {
  return {
    title: "OnCo checkpoint families",
    description: "The two meanings of checkpoint in cancer, each with its hub, classes and members.",
    page: absoluteUrl("/checkpoints/"),
    licence: "https://creativecommons.org/licenses/by-nc/4.0/",
    families: (Object.keys(CHECKPOINT_HUB) as CheckpointRoot[]).map((root) => ({
      root, title: CHECKPOINT_HUB[root].title, page: absoluteUrl(CHECKPOINT_HUB[root].route), data: absoluteUrl(`${CHECKPOINT_HUB[root].route}data.json`), ...hubSummary(root),
      classes: CHECKPOINT_CLASSES.filter((c) => c.root === root).map((c) => ({ id: c.id, name: c.name, members: CHECKPOINT_MEMBERS.filter((m) => m.classId === c.id).map((m) => m.id) })),
    })),
  };
}
