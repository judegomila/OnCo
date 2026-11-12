import { describe, expect, it } from "vitest";
import { candidateFinder, dependencyProblems, fieldHash, reviewProblems, sourceAssetProblems, sourcePhaseProblems, sourceSections, sourceSignature, type CurriculumItem, type SourceAsset } from "./education-coverage";

const record = { id: "example", kind: "term", name: "Example assay", summary: "Measures one readout under specified conditions." };
const item = (): CurriculumItem => ({ path: "wiki/education/concepts/example.md", title: "Example assay", aliases: [], sourceType: "concept", domain: "measurement", sourceSha256: "source", gitBlob: "blob", sourceURL: "https://example.org/source", priorOwnerIds: [], review: { status: "unreviewed", points: [] } });

describe("supplemental education sources", () => {
  const asset = (): SourceAsset => ({ id: "ref:tool.html", path: "tool.html", guideRef: "ref", gitBlob: "blob", bytes: 100, scope: "unclassified", review: { status: "unreviewed", points: [] } });
  it("requires a dated scope decision bound to the actual source blob", () => {
    const row = asset();
    expect(sourceAssetProblems(row, new Map())).toEqual(["Source asset has no scope disposition"]);
    row.scope = "supporting";
    expect(sourceAssetProblems(row, new Map())).toEqual(["Source-asset scope review is missing or belongs to a different blob"]);
    row.scopeReview = { auditor: "agent", checkedAt: "2026-11-09", rationale: "Inspected authoring provenance, with no additional teaching.", gitBlob: row.gitBlob };
    expect(sourceAssetProblems(row, new Map())).toEqual([]);
    row.gitBlob = "changed";
    expect(sourceAssetProblems(row, new Map())).toEqual(["Source-asset scope review is missing or belongs to a different blob"]);
  });

  it("keeps script-generated teaching open until its sections and actual owner fields are reviewed", () => {
    const row = asset(); row.scope = "teaching";
    row.scopeReview = { auditor: "agent", checkedAt: "2026-11-09", rationale: "An interactive quiz adds teaching.", gitBlob: row.gitBlob };
    expect(sourceAssetProblems(row, new Map())).toEqual(["Teaching asset needs explicit reading sections"]);
    row.sections = [{ ordinal: 0, kind: "quiz", sha256: "quiz-hash" }];
    row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-09", rationale: "Read quiz choices and feedback.", sectionHashes: [], points: [{ id: "readout", requirement: "Retain measurement context.", status: "covered-draft", evidence: [{ recordId: record.id, version: "proposal-biology", field: "summary", fieldSha256: fieldHash(record.summary), explanation: "States the measurement conditions." }], remaining: [] }] };
    const catalog = new Map([["proposal-biology:example", record]]);
    expect(sourceAssetProblems(row, catalog)).toContain("Source section remains unreviewed: 0 (quiz)");
    row.review.sectionHashes = ["quiz-hash"];
    expect(sourceAssetProblems(row, catalog)).toEqual([]);
    catalog.set("proposal-biology:example", { ...record, summary: "Different field." });
    expect(sourceAssetProblems(row, catalog)).toContain("readout: evidence field changed");
    row.scope = "supporting";
    expect(sourceAssetProblems(row, catalog)).toEqual(["Supporting asset has teaching requirements; assess it as teaching"]);
  });
});

describe("curriculum coverage closure", () => {
  it("does not close an exact name match or a retrieved prior owner", () => {
    const row = item(); row.priorOwnerIds = [record.id];
    const hit = candidateFinder([{ version: "main", record }])(row)[0];
    expect(hit.exactName).toBe(true);
    expect(reviewProblems(row, new Map([["main:example", record]]))).toEqual(["Content remains unreviewed"]);
  });

  it("rejects an empty or unexplained semantic review", () => {
    const row = item(); row.review = { status: "reviewed", points: [] };
    expect(reviewProblems(row, new Map())).toContain("Semantic review has no learning points");
    expect(reviewProblems(row, new Map())).toContain("Semantic review lacks auditor, date or rationale");
  });

  it("does not discard unique teaching content just because a page is called navigation", () => {
    const row = item(); row.sourceType = "navigation";
    row.review = { status: "navigation", auditor: "agent", checkedAt: "2026-11-08", rationale: "An index that also has a unique example.", points: [{ id: "example", requirement: "Explain the additional example.", status: "gap", evidence: [], remaining: ["Not yet represented."] }] };
    expect(reviewProblems(row, new Map())).toContain("Navigation with unique teaching content must be assessed as content");
    row.review.status = "reviewed";
    expect(reviewProblems(row, new Map())).toContain("example: gap");
  });

  it("requires unchanged field evidence and keeps pending drafts distinct from main", () => {
    const row = item(); row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-08", rationale: "Read the source and the record field.", points: [{ id: "readout", requirement: "Explain the readout and its assay context.", status: "covered-main", remaining: [], evidence: [{ recordId: "example", version: "draft-373", field: "summary", fieldSha256: fieldHash(record.summary), explanation: "The field names both the measurement and its conditions." }] }] };
    const catalog = new Map([["draft-373:example", record]]);
    expect(reviewProblems(row, catalog)).toContain("readout: draft evidence cannot establish main coverage");
    row.review.points[0].status = "covered-draft";
    expect(reviewProblems(row, catalog)).toEqual([]);
    catalog.set("draft-373:example", { ...record, summary: "Changed after review." });
    expect(reviewProblems(row, catalog)).toContain("readout: evidence field changed");
  });

  it("keeps a named partial, source blocker or residual gap open", () => {
    const row = item(); row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-08", rationale: "Reviewed.", points: [{ id: "interpretation", requirement: "Interpretation boundary.", status: "source-blocked", remaining: ["Primary evidence not yet read."], evidence: [] }] };
    const problems = reviewProblems(row, new Map());
    expect(problems).toContain("interpretation: source-blocked");
    expect(problems).toContain("interpretation: residual gaps remain");
    expect(problems).toContain("interpretation: no field evidence");
  });

  it("keeps schema and literature work open even when a content subset is covered", () => {
    expect(dependencyProblems([{ id: "assay-status", status: "pending approval" }], [{ queryId: "immunology", rank: 1, reviewStatus: "unreviewed" }])).toEqual(["Schema gap remains open: assay-status", "Literature screening remains open: immunology:1"]);
    expect(dependencyProblems([{ id: "assay-status", status: "resolved" }], [{ queryId: "immunology", rank: 1, reviewStatus: "screened-unused" }])).toEqual([]);
  });

  it("applies semantic closure to discoveries outside the curriculum", () => {
    const discovered = { sourceType: "adjacent-concept", review: { status: "unreviewed" as const, points: [] } };
    expect(reviewProblems(discovered, new Map())).toEqual(["Content remains unreviewed"]);
    const row = item();
    row.sourceType = "adjacent-concept";
    row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-08", rationale: "Read the discovered concept and its proposed owner.", points: [{ id: "new-distinction", requirement: "Retain assay context.", status: "covered-draft", remaining: [], evidence: [{ recordId: "example", version: "proposal-biology", field: "summary", fieldSha256: fieldHash(record.summary), explanation: "States the readout and its conditions." }] }] };
    expect(reviewProblems(row, new Map([["proposal-biology:example", record]]))).toEqual([]);
  });

  it("cannot close a page while an additional worked example remains unread", () => {
    const row = item();
    row.sections = sourceSections(row.path, "# Example\n\n## How it works\nCore definition.\n\n## Worked example\nAn additional interpretation boundary.\n\n## In a participant's case\nExcluded personal context.\n\n## Related concepts\n- [Another concept](/another)\n");
    expect(row.sections.map(s => s.kind)).toEqual(["preamble", "mechanism-measurement-interpretation", "practice-or-worked-example"]);
    row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-08", rationale: "The record field covers the named requirement.", sectionHashes: row.sections.slice(0, 2).map(s => s.sha256), points: [{ id: "readout", requirement: "Assay context.", status: "covered-main", remaining: [], evidence: [{ recordId: "example", version: "main", field: "summary", fieldSha256: fieldHash(record.summary), explanation: "Names the measurement and context." }] }] };
    const catalog = new Map([["main:example", record]]);
    expect(reviewProblems(row, catalog)).toContain("Source section remains unreviewed: 2 (practice-or-worked-example)");
    row.review.sectionHashes = row.sections.map(s => s.sha256);
    expect(reviewProblems(row, catalog)).toEqual([]);
    row.sections = sourceSections(row.path, "# Example\n\n## How it works\nCore definition.\n\n## Worked example\nChanged interpretation boundary.\n");
    expect(reviewProblems(row, catalog)).toContain("Reviewed section does not belong to this source version");
  });

  it("compares teaching independently of generated routing without hiding added requirements or metadata", () => {
    const metadata = { title: "Response", type: "concept", summary: "A measured response.", prerequisites: ["baseline"], updated: "2026-11-08" };
    const body = "# Response\n\n## How it works\nMeasure under stated criteria.\n";
    const original = sourceSignature(metadata, body);
    expect(sourceSignature({ ...metadata, updated: "2026-11-09" }, body + "<!-- BEGIN GENERATED USED IN -->\nNew route\n<!-- END GENERATED USED IN -->")).toEqual(original);
    expect(sourceSignature(metadata, body + "\n## Worked example\nA new population condition.\n").teachingSha256).not.toEqual(original.teachingSha256);
    expect(sourceSignature({ ...metadata, prerequisites: ["baseline", "MRI"] }, body).metadataSha256).not.toEqual(original.metadataSha256);
    expect(sourceSignature({ ...metadata, newPopulationCondition: "Only this cohort" }, body).metadataSha256).not.toEqual(original.metadataSha256);
    expect(sourceSignature(metadata, body.replace("stated criteria", "[stated criteria](/new-route)")).teachingSha256).not.toEqual(original.teachingSha256);
  });

  it("keeps later source phases and changed field evidence in the final closure check", () => {
    const phase = { id: "newer-guide", guideRef: "new-ref", directory: "source-phases/new-ref", sourceCount: 1 };
    expect(sourcePhaseProblems(phase, undefined, new Map())).toEqual(["Source phase ledger is missing: newer-guide"]);
    expect(sourcePhaseProblems(phase, { guideRef: "old-ref", items: [] }, new Map())).toEqual(["Source phase ref differs: newer-guide", "Source phase census differs: newer-guide"]);
    const row = item();
    expect(sourcePhaseProblems(phase, { guideRef: "new-ref", items: [row] }, new Map())).toEqual(["Source phase remains open: newer-guide (1 sources)"]);
    row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-09", rationale: "Read this source version.", points: [{ id: "readout", requirement: "Retain assay context.", status: "covered-draft", evidence: [{ recordId: record.id, version: "proposal-biology", field: "summary", fieldSha256: fieldHash(record.summary), explanation: "States the measurement conditions." }], remaining: [] }] };
    const catalog = new Map([["proposal-biology:example", record]]);
    expect(sourcePhaseProblems(phase, { guideRef: "new-ref", items: [row] }, catalog)).toEqual([]);
    catalog.set("proposal-biology:example", { ...record, summary: "Changed field." });
    expect(sourcePhaseProblems(phase, { guideRef: "new-ref", items: [row] }, catalog)).toEqual(["Source phase remains open: newer-guide (1 sources)"]);
    expect(sourcePhaseProblems(phase, { guideRef: "new-ref", items: [row, row] }, catalog)).toContain("Source phase census differs: newer-guide");
  });
});
