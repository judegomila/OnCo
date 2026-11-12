/**
 * Pinned public-curriculum coverage audit. Candidate matches never count as coverage.
 * See research/education-coverage-2026-11-08/README.md for the review and closure rules.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { createRequire } from "node:module";
import { homedir } from "node:os";

export type Evidence = { recordId: string; version: string; field: string; fieldSha256: string; explanation: string };
export type LearningPoint = {
  id: string;
  requirement: string;
  status: "unreviewed" | "covered-main" | "covered-draft" | "gap" | "partial" | "source-blocked";
  evidence: Evidence[];
  remaining: string[];
};
export type Review = {
  status: "unreviewed" | "reviewed" | "navigation";
  auditor?: string;
  checkedAt?: string;
  rationale?: string;
  sectionHashes?: string[];
  points: LearningPoint[];
};
export type SourceSection = { ordinal: number; kind: string; sha256: string };
export type CurriculumItem = {
  path: string;
  title: string | null;
  aliases: string[];
  sourceType: string;
  domain: string;
  sourceSha256: string;
  gitBlob: string;
  sourceURL: string;
  priorOwnerIds: string[];
  sections?: SourceSection[];
  review: Review;
};
type RecordData = { id: string; kind: string; name: string; aka?: string[]; [key: string]: unknown };
type CatalogRow = { version: string; record: RecordData };
type SourcePhase = { id: string; guideRef: string; directory: string; sourceCount: number };
type PhaseLedger = { guideRef: string; items: CurriculumItem[] };
export type SourceAsset = {
  id: string; path: string; guideRef: string; gitBlob: string; bytes: number;
  scope: "unclassified" | "teaching" | "supporting";
  scopeReview?: { auditor: string; checkedAt: string; rationale: string; gitBlob: string };
  sections?: SourceSection[];
  review: Review;
};
export type Candidate = { id: string; version: string; name: string; score: number; exactName: boolean; matchedNameTerms: string[] };

export const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
export const fieldHash = (value: unknown) => sha256(JSON.stringify(value) ?? "undefined");
export function normalize(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/\btumour/g, "tumor").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
const STOP = new Set("a an the of and or to in for from with versus vs how what why is are it its this that as by on at into about use using reading basics understanding concept cancer oncology tumor".split(" "));
const tokens = (s: string) => [...new Set(normalize(s).split(" ").filter(t => t && !STOP.has(t)))];
const TEXT_FIELDS = ["tldr", "summary", "principle", "notes", "strengths", "limitations"];
const INDEX_KINDS = new Set(["term", "technology", "pathway", "biomarker", "target", "drug", "collection"]);

/** Name and text retrieval only. No score, including an exact name, changes review status. */
export function candidateFinder(catalog: CatalogRow[]) {
  const rows = catalog.filter(r => INDEX_KINDS.has(r.record.kind)).map(r => {
    const names = [r.record.name, ...(r.record.aka ?? []), r.record.id.replaceAll("-", " ")];
    return { ...r, names: names.map(normalize), nt: new Set(tokens(names.join(" "))), bt: new Set(tokens(TEXT_FIELDS.map(k => JSON.stringify(r.record[k] ?? "")).join(" "))) };
  });
  const df = new Map<string, number>();
  for (const r of rows) for (const t of r.nt) df.set(t, (df.get(t) ?? 0) + 1);
  return (item: Pick<CurriculumItem, "title" | "aliases" | "path" | "priorOwnerIds">): Candidate[] => {
    const queryNames = [item.title ?? "", ...item.aliases, item.path.split("/").at(-1)!.replace(/\.md$/, "").replaceAll("-", " ")].map(normalize).filter(Boolean);
    const qt = tokens(queryNames.join(" "));
    const out: Candidate[] = [];
    for (const r of rows) {
      const exactName = r.names.some(n => queryNames.includes(n));
      const matchedNameTerms = qt.filter(t => r.nt.has(t));
      const nameScore = matchedNameTerms.reduce((n, t) => n + 3 * Math.log(2 + rows.length / (1 + (df.get(t) ?? 0))), 0);
      const bodyScore = qt.filter(t => r.bt.has(t)).reduce((n, t) => n + Math.log(2 + rows.length / (1 + (df.get(t) ?? 0))), 0);
      const prior = item.priorOwnerIds.includes(r.record.id);
      const score = Math.round((nameScore + bodyScore + (exactName ? 150 : 0) + (prior ? 180 : 0)) * 100) / 100;
      if (score) out.push({ id: r.record.id, version: r.version, name: r.record.name, score, exactName, matchedNameTerms });
    }
    return out.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id) || a.version.localeCompare(b.version)).slice(0, 8);
  };
}

/** Closure requires a semantic review and unchanged field evidence, not a lexical match. */
export function reviewProblems(item: Pick<CurriculumItem, "sourceType" | "review" | "sections">, catalog: Map<string, RecordData>): string[] {
  const r = item.review, errors: string[] = [];
  const sectionProblems = () => {
    const checked = new Set(r.sectionHashes ?? []);
    for (const s of item.sections ?? []) if (!checked.has(s.sha256)) errors.push(`Source section remains unreviewed: ${s.ordinal} (${s.kind})`);
    for (const hash of checked) if (item.sections && !item.sections.some(s => s.sha256 === hash)) errors.push("Reviewed section does not belong to this source version");
  };
  if (item.sourceType === "navigation" && r.status !== "reviewed") {
    if (r.status !== "navigation") errors.push("Navigation item lacks a navigation disposition");
    if (!r.auditor || !r.checkedAt || !r.rationale) errors.push("Navigation disposition needs a dated review of whether it adds unique teaching content");
    if (r.points.length) errors.push("Navigation with unique teaching content must be assessed as content");
    if (r.status === "navigation") sectionProblems();
    return errors;
  }
  if (r.status !== "reviewed") return ["Content remains unreviewed"];
  sectionProblems();
  if (!r.auditor || !r.checkedAt || !r.rationale) errors.push("Semantic review lacks auditor, date or rationale");
  if (!r.points.length) errors.push("Semantic review has no learning points");
  for (const p of r.points) {
    if (!p.requirement.trim()) errors.push(p.id + ": missing learning requirement");
    if (!["covered-main", "covered-draft"].includes(p.status)) errors.push(p.id + ": " + p.status);
    if (p.remaining.length) errors.push(p.id + ": residual gaps remain");
    if (!p.evidence.length) errors.push(p.id + ": no field evidence");
    for (const e of p.evidence) {
      const record = catalog.get(e.version + ":" + e.recordId);
      if (!record) { errors.push(p.id + ": missing owner/version " + e.version + ":" + e.recordId); continue; }
      if (!(e.field in record)) errors.push(p.id + ": missing field " + e.field);
      else if (fieldHash(record[e.field]) !== e.fieldSha256) errors.push(p.id + ": evidence field changed");
      if (!e.explanation.trim()) errors.push(p.id + ": no explanation of what the field covers");
      if (p.status === "covered-main" && e.version !== "main") errors.push(p.id + ": draft evidence cannot establish main coverage");
    }
  }
  return errors;
}

/** A path-based asset role is never an exclusion or a completed semantic review. */
export function sourceAssetProblems(asset: SourceAsset, catalog: Map<string, RecordData>): string[] {
  if (asset.scope === "unclassified") return ["Source asset has no scope disposition"];
  if (!["teaching", "supporting"].includes(asset.scope)) return ["Unknown source-asset scope"];
  const r = asset.scopeReview;
  if (!r?.auditor || !r.checkedAt || !r.rationale || r.gitBlob !== asset.gitBlob) return ["Source-asset scope review is missing or belongs to a different blob"];
  if (asset.scope === "supporting") {
    if (asset.review.points.length) return ["Supporting asset has teaching requirements; assess it as teaching"];
    return [];
  }
  if (!asset.sections?.length) return ["Teaching asset needs explicit reading sections"];
  return reviewProblems({ sourceType: "supplemental-teaching", sections: asset.sections, review: asset.review }, catalog);
}

/** Content representation alone is insufficient to finish the full audit. */
export function dependencyProblems(schemas: { id: string; status: string }[], literature: { queryId: string; rank: number; reviewStatus: string }[]): string[] {
  return [
    ...schemas.filter(r => r.status !== "resolved").map(r => "Schema gap remains open: " + r.id),
    ...literature.filter(r => r.reviewStatus === "unreviewed").map(r => "Literature screening remains open: " + r.queryId + ":" + r.rank),
  ];
}

/** A later source version cannot disappear from closure behind the original pin. */
export function sourcePhaseProblems(phase: SourcePhase, ledger: PhaseLedger | undefined, catalog: Map<string, RecordData>): string[] {
  if (!ledger) return ["Source phase ledger is missing: " + phase.id];
  const problems: string[] = [];
  if (ledger.guideRef !== phase.guideRef) problems.push("Source phase ref differs: " + phase.id);
  if (ledger.items.length !== phase.sourceCount || new Set(ledger.items.map(r => r.path)).size !== phase.sourceCount) problems.push("Source phase census differs: " + phase.id);
  const open = ledger.items.filter(item => reviewProblems(item, catalog).length).length;
  if (open) problems.push(`Source phase remains open: ${phase.id} (${open} sources)`);
  return problems;
}

/** Include practice and side panels; publish hashes rather than source bodies or personal headings. */
export function sourceSections(path: string, body: string): SourceSection[] {
  const cleaned = body.replace(/<!-- BEGIN GENERATED USED IN -->[\s\S]*?<!-- END GENERATED USED IN -->/g, "");
  const chunks = cleaned.split(/^(## .+)$/m), parts: { heading: string; body: string }[] = [];
  if (chunks[0].trim()) parts.push({ heading: "preamble", body: chunks[0] });
  for (let i = 1; i + 1 < chunks.length; i += 2) parts.push({ heading: chunks[i].slice(3).trim(), body: chunks[i + 1] });
  return parts.filter(p => !/\bin .{1,60}['’]s case\b|personal case|patient-specific/i.test(p.heading)).filter(p => {
    if (!/^related concepts$/i.test(p.heading)) return true;
    const rest = p.body.replace(/\[\[[^\]]+\]\]/g, "").replace(/\[[^\]]*\]\([^)]*\)/g, "").replace(/<!--[\s\S]*?-->/g, "").replace(/[^a-z0-9]/gi, "");
    return !!rest;
  }).map((p, ordinal) => ({ ordinal, kind: /preamble/i.test(p.heading) ? "preamble" : /try it|worked example|explain it back/i.test(p.heading) ? "practice-or-worked-example" : /source/i.test(p.heading) ? "source-scope" : /how it (works|is measured)|confusion/i.test(p.heading) ? "mechanism-measurement-interpretation" : "additional-teaching", sha256: sha256(path + "\n" + p.heading + "\n" + p.body) }));
}

/** Compare teaching and interpretation-relevant metadata without publishing lesson bodies. */
export function sourceSignature(metadata: Record<string, unknown>, body: string): { teachingSha256: string; metadataSha256: string } {
  // Unknown metadata is conservatively significant. An allowlist could silently ignore a
  // new learning-goal, audience or population key when the source schema evolves.
  const operational = new Set(["used_by", "updated", "source_checked", "review_status", "reviewed", "reviewed_by", "expert_review", "learner_review", "minutes"]);
  const relevant = Object.fromEntries(Object.keys(metadata).filter(key => !operational.has(key)).sort().map(key => [key, metadata[key]]));
  return { teachingSha256: fieldHash(sourceSections("PATH_INDEPENDENT_CONTENT", body)), metadataSha256: fieldHash(relevant) };
}

function readJSON<T>(path: string): T { return JSON.parse(readFileSync(path, "utf8")) as T; }
function writeJSON(path: string, value: unknown) { writeFileSync(path, JSON.stringify(value, null, 2) + "\n"); }
function main() {
  const args = process.argv.slice(2);
  const arg = (name: string) => { const i = args.indexOf(name); if (i < 0 || !args[i + 1]) throw new Error("Missing " + name); return args[i + 1]; };
  const guide = resolve(arg("--guide")), ref = arg("--guide-ref"), baseline = resolve(arg("--baseline")), out = resolve(arg("--out"));
  // Source versions have independent reading ledgers and share one set of canonical proposals,
  // adjacent findings, schema dependencies and literature dispositions.
  const shared = args.includes("--shared-audit-root") ? resolve(arg("--shared-audit-root")) : out;
  const packDir = args.includes("--review-pack-out") ? resolve(arg("--review-pack-out")) : join(homedir(), ".cache", "onco-reference", "education-review-pack", ref.slice(0, 12));
  // Review bodies can include excluded case context. Keep them outside every Git checkout,
  // including when the requested directory has not been created yet.
  let ancestor = packDir;
  while (!existsSync(ancestor)) {
    const parent = resolve(ancestor, "..");
    if (parent === ancestor) break;
    ancestor = parent;
  }
  let insideGit = false;
  try {
    execFileSync("git", ["rev-parse", "--show-toplevel"], { cwd: ancestor, stdio: "ignore" });
    insideGit = true;
  } catch { /* No containing checkout. */ }
  if (insideGit) throw new Error("Review packs must be outside Git checkouts");
  const yaml = createRequire(join(process.cwd(), "package.json"))("js-yaml") as { load(s: string): Record<string, unknown> };
  mkdirSync(out, { recursive: true });
  const base = readJSON<RecordData[]>(baseline);
  const catalog: CatalogRow[] = base.map(record => ({ version: "main", record }));
  const pending = [369, 371, 373].map(pr => readJSON<{ pr: number; head: string; records: RecordData[] }>(join(shared, "pending", "pr-" + pr + ".json")));
  for (const p of pending) for (const record of p.records) catalog.push({ version: "draft-" + p.pr, record });
  const proposals = args.flatMap((value, index) => {
    if (value !== "--proposal") return [];
    if (!args[index + 1] || args[index + 1].startsWith("--")) throw new Error("Missing --proposal path");
    return [readJSON<{ version: string; state: string; records: RecordData[] }>(resolve(args[index + 1]))];
  });
  for (const proposal of proposals) {
    if (!proposal.version || !proposal.state || proposal.version === "main" || catalog.some(r => r.version === proposal.version)) throw new Error("Proposal needs a distinct version and an explicit contribution state");
    for (const record of proposal.records) catalog.push({ version: proposal.version, record });
  }
  const catalogMap = new Map(catalog.map(r => [r.version + ":" + r.record.id, r.record]));
  const prior: Record<string, string[]> = existsSync(join(out, "prior-crosswalk.json")) ? readJSON(join(out, "prior-crosswalk.json")) : {};
  const old = existsSync(join(out, "ledger.json")) ? readJSON<{ items: CurriculumItem[] }>(join(out, "ledger.json")) : { items: [] };
  const oldMap = new Map(old.items.map(r => [r.path, r]));
  const files = execFileSync("git", ["ls-tree", "-r", "-z", ref, "--", "wiki/education/"], { cwd: guide, maxBuffer: 10_000_000 }).toString().split("\0").filter(Boolean);
  const items: CurriculumItem[] = [];
  const reviewPack: Record<string, unknown[]> = {};
  for (const line of files) {
    const m = /^(\d+) blob ([0-9a-f]+)\t(.+\.md)$/.exec(line); if (!m) continue;
    const path = m[3], raw = readFileSync(join(guide, path));
    const blob = createHash("sha1").update("blob " + raw.length + "\0").update(raw).digest("hex");
    if (blob !== m[2]) throw new Error("Source differs from pinned public blob: " + path);
    const body = raw.toString("utf8"), fm = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(body);
    if (!fm) throw new Error("Missing frontmatter: " + path);
    const meta = yaml.load(fm[1]);
    const sourceType = String(meta.type ?? "unknown");
    if (!["concept", "comparison", "guide", "guide-lesson", "navigation"].includes(sourceType)) throw new Error("Unclassified source type: " + path);
    const title = String(meta.title ?? "");
    const aliases = Array.isArray(meta.aliases) ? meta.aliases.map(String) : [];
    if (/\bdiana\b/i.test(title + " " + aliases.join(" "))) throw new Error("Patient-context title requires metadata-only manual handling: " + path);
    const domain = path.startsWith("wiki/education/concepts/") ? String(meta.domain ?? path.split("/").slice(3, -1).join("/")) : path.split("/")[2];
    const previous = oldMap.get(path), sourceSha256 = sha256(raw);
    if (previous && previous.sourceSha256 !== sourceSha256) throw new Error("Source changed; re-review explicitly before replacing: " + path);
    const review: Review = previous?.review ?? { status: "unreviewed", points: [] };
    const item: CurriculumItem = { path, title, aliases, sourceType, domain, sourceSha256, gitBlob: blob, sourceURL: "https://github.com/jasonLaster/oncoguide/blob/" + ref + "/" + path, priorOwnerIds: prior[path] ?? [], sections: sourceSections(path, body.slice(fm[0].length)), review };
    items.push(item);
    (reviewPack[domain.split("/")[0]] ??= []).push({ path, title, meta, body: body.slice(fm[0].length) });
  }
  if (old.items.some(r => !items.some(n => n.path === r.path))) throw new Error("Previously inventoried source disappeared");
  const find = candidateFinder(catalog);
  const candidates = items.filter(r => r.sourceType !== "navigation" || r.review.status === "reviewed").map(r => ({ path: r.path, candidates: find(r) }));
  const failures = items.flatMap(item => reviewProblems(item, catalogMap).map(problem => ({ path: item.path, problem })));
  const adjacent = existsSync(join(shared, "adjacent-concepts.json")) ? readJSON<{ id: string; title: string; domain: string; sourceURLs: string[]; discoveryOccurrences: string[]; review: Review }[]>(join(shared, "adjacent-concepts.json")) : [];
  const adjacentFailures = adjacent.flatMap(item => reviewProblems({ sourceType: "adjacent-concept", review: item.review }, catalogMap).map(problem => ({ path: "adjacent/" + item.id, problem })));
  const schemas = readJSON<{ id: string; status: string }[]>(join(shared, "schema-gaps.json"));
  const literature = readJSON<{ queryId: string; rank: number; reviewStatus: string }[]>(join(shared, "literature-dispositions.json"));
  const sourcePhases = shared === out && existsSync(join(shared, "source-phases.json")) ? readJSON<{ phases: SourcePhase[] }>(join(shared, "source-phases.json")).phases.map(phase => {
    const directory = resolve(shared, phase.directory);
    if (!directory.startsWith(shared + "/")) throw new Error("Source phase must be inside the shared audit root: " + phase.id);
    const ledgerPath = join(directory, "ledger.json");
    const ledger = existsSync(ledgerPath) ? readJSON<PhaseLedger>(ledgerPath) : undefined;
    return { ...phase, problems: sourcePhaseProblems(phase, ledger, catalogMap) };
  }) : [];
  const registry = readJSON<{ primaryGuideRef: string; phases: SourcePhase[] }>(join(shared, "source-phases.json"));
  const assetPhases = readJSON<{ phases: { guideRef: string; assetCount: number; items: SourceAsset[] }[] }>(join(shared, "source-assets.json")).phases;
  const requiredRefs = [registry.primaryGuideRef, ...registry.phases.map(phase => phase.guideRef)];
  const assetCensusProblems: string[] = [];
  if (new Set(assetPhases.map(phase => phase.guideRef)).size !== assetPhases.length) assetCensusProblems.push("Duplicate source-asset phase");
  for (const required of requiredRefs) if (!assetPhases.some(phase => phase.guideRef === required)) assetCensusProblems.push("Source-asset phase is missing: " + required);
  const assetReports = assetPhases.map(phase => {
    if (!requiredRefs.includes(phase.guideRef)) assetCensusProblems.push("Unregistered source-asset ref: " + phase.guideRef);
    const tree = execFileSync("git", ["ls-tree", "-rlz", phase.guideRef, "--", "wiki/education/"], { cwd: guide, maxBuffer: 10_000_000 }).toString().split("\0").filter(Boolean);
    const facts = new Map(tree.flatMap(line => {
      const match = /^\d+ blob ([0-9a-f]+)\s+(\d+)\t(.+)$/.exec(line);
      return match && !match[3].endsWith(".md") ? [[match[3], { gitBlob: match[1], bytes: Number(match[2]) }] as const] : [];
    }));
    if (phase.assetCount !== facts.size || phase.items.length !== facts.size || new Set(phase.items.map(asset => asset.path)).size !== facts.size) assetCensusProblems.push("Source-asset census differs: " + phase.guideRef);
    const failures = phase.items.flatMap(asset => {
      const fact = facts.get(asset.path);
      const identity = asset.guideRef !== phase.guideRef || asset.id !== phase.guideRef + ":" + asset.path || !fact || fact.gitBlob !== asset.gitBlob || fact.bytes !== asset.bytes;
      return (identity ? ["Source-asset identity differs from pinned tree"] : sourceAssetProblems(asset, catalogMap)).map(problem => ({ path: asset.path, guideRef: phase.guideRef, problem }));
    });
    return { guideRef: phase.guideRef, totalAssets: phase.items.length, teachingAssets: phase.items.filter(asset => asset.scope === "teaching").length, supportingAssets: phase.items.filter(asset => asset.scope === "supporting").length, unclassifiedAssets: phase.items.filter(asset => asset.scope === "unclassified").length, unresolvedAssets: new Set(failures.map(failure => failure.path)).size, failures };
  });
  const assetSummaries = assetReports.map(({ guideRef, totalAssets, teachingAssets, supportingAssets, unclassifiedAssets, unresolvedAssets }) => ({ guideRef, totalAssets, teachingAssets, supportingAssets, unclassifiedAssets, unresolvedAssets }));
  const dependencies = [...dependencyProblems(schemas, literature), ...sourcePhases.flatMap(phase => phase.problems), ...assetCensusProblems, ...assetReports.filter(phase => phase.failures.length).map(phase => `Source-asset phase remains open: ${phase.guideRef} (${phase.unresolvedAssets} occurrences)` )];
  const count = (pred: (r: CurriculumItem) => boolean) => items.filter(pred).length;
  const content = items.filter(r => r.sourceType !== "navigation" || r.review.status === "reviewed");
  const closed = content.filter(r => !reviewProblems(r, catalogMap).length);
  const stats = { totalSources: items.length, conceptOrComparison: count(r => ["concept", "comparison"].includes(r.sourceType)), guideOrLesson: count(r => ["guide", "guide-lesson"].includes(r.sourceType)), navigation: count(r => r.sourceType === "navigation"), navigationReviewed: count(r => r.sourceType === "navigation" && r.review.status === "navigation" && !reviewProblems(r, catalogMap).length), navigationWithTeachingContent: count(r => r.sourceType === "navigation" && r.review.status === "reviewed"), semanticallyReviewed: count(r => r.review.status === "reviewed"), implementedCoverage: closed.length, mainCoverage: closed.filter(r => r.review.points.every(p => p.status === "covered-main")).length, unresolvedContentItems: content.length - closed.length, unresolvedSources: new Set(failures.map(f => f.path)).size, adjacentConcepts: adjacent.length, unresolvedAdjacentConcepts: new Set(adjacentFailures.map(f => f.path)).size, openSchemaGaps: schemas.filter(r => r.status !== "resolved").length, unreviewedLiteratureOccurrences: literature.filter(r => r.reviewStatus === "unreviewed").length, readyForFinalReaudit: !failures.length && !adjacentFailures.length && !dependencies.length };
  writeJSON(join(out, "ledger.json"), { schemaVersion: 4, attribution: "Data from OnCo (onco.cc), CC BY-NC 4.0. Public curriculum metadata only; no lesson bodies copied.", oncoBaseline: "0f8ebc2569e2dcb023364d8cb6971186f11f59ab", oncoSnapshotSha256: sha256(readFileSync(baseline)), guideRef: ref, pending: pending.map(p => ({ pr: p.pr, head: p.head, state: "open draft; not merged" })), proposals: proposals.map(p => ({ version: p.version, state: p.state, recordSnapshotSha256: sha256(JSON.stringify(p.records)) })), sourcePhases, sourceAssetPhases: assetSummaries, stats, items, adjacent });
  writeJSON(join(out, "candidates.json"), { warning: "Lexical retrieval for manual review only; no match score establishes coverage.", items: candidates });
  writeJSON(join(out, "open-items.json"), [...failures, ...adjacentFailures]);
  writeJSON(join(out, "open-dependencies.json"), dependencies);
  writeJSON(join(out, "open-source-assets.json"), assetReports.flatMap(phase => phase.failures));
  mkdirSync(packDir, { recursive: true });
  for (const [domain, rows] of Object.entries(reviewPack)) writeJSON(join(packDir, domain + ".json"), rows);
  console.log(JSON.stringify(stats));
  if (args.includes("--check-closed") && (failures.length || adjacentFailures.length || dependencies.length)) process.exitCode = 2;
}

if (process.argv[1]?.endsWith("education-coverage.ts")) main();
