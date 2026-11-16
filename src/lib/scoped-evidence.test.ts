import { describe, expect, it } from "vitest";
import { DrugSchema, PathwayEdgeSchema, TrialParticipationSchema } from "./schema";
import { ConjugateCompositionSchema, RegulatoryClaimSchema } from "./scoped-evidence";
import { graph, outgoing } from "./graph";
import { mechanismEvidenceLabel, supportsPathIllustration } from "./mechanism-evidence";
import { pathwayView } from "./pathway-products";

// Fictional method fixtures, never published clinical claims.
const observation = { sources: [{ label: "Example method", url: "https://example.org/method" }], checkedOn: "2026-11-08" };
const payload = { ...observation, id: "cargo-a", cargoKind: "small-molecule" as const, chemical: { name: "Example cargo" }, mechanism: "An experimental mechanism" };
const claim = { ...observation, subject: { type: "laboratory" as const, name: "Example laboratory" }, claimType: "laboratory-certification" as const, authority: "Example authority", jurisdiction: "Example jurisdiction", scope: "Specified laboratory operations", statement: "A scoped certification claim" };

describe("scoped evidence contracts", () => {
  it("keeps laboratory certification separate from product authorization without a usefulness grade", () => {
    expect(RegulatoryClaimSchema.safeParse(claim).success).toBe(true);
    expect(RegulatoryClaimSchema.safeParse({ ...claim, subject: { type: "product", name: "Example assay" } }).success).toBe(false);
    expect(RegulatoryClaimSchema.safeParse({ ...claim, claimType: "marketing-authorization" }).success).toBe(false);
    expect(RegulatoryClaimSchema.safeParse({ ...claim, sources: [] }).success).toBe(false);
    expect(RegulatoryClaimSchema.safeParse({ ...claim, effectiveOn: "2026-05-01", endedOn: "2026-04-01" }).success).toBe(false);
    expect(RegulatoryClaimSchema.parse(claim)).not.toHaveProperty("clinicalUtility");
  });

  it("retains two payload identities without inventing component loading or splitting total DAR", () => {
    const result = ConjugateCompositionSchema.parse({ ...observation, payloads: [payload, { ...payload, id: "cargo-b", chemical: { name: "Different cargo" } }] });
    expect(result.payloads.map(p => p.chemical.name)).toEqual(["Example cargo", "Different cargo"]);
    for (const component of result.payloads) expect(component).not.toHaveProperty("loadingObservations");
    expect(ConjugateCompositionSchema.safeParse({ ...observation, payloads: [payload, payload] }).success).toBe(false);
  });

  it("keeps measured zero distinct from missing loading and rejects activity/dose as loading", () => {
    const loading = { ...observation, quantity: "mean-count-per-antibody", value: 0, unit: "payload-molecules/antibody", scope: "Specified material" };
    const composition = { ...observation, payloads: [{ ...payload, loadingObservations: [loading] }] };
    expect(ConjugateCompositionSchema.parse(composition).payloads[0].loadingObservations?.[0].value).toBe(0);
    expect(ConjugateCompositionSchema.safeParse({ ...composition, payloads: [{ ...payload, loadingObservations: [{ ...loading, unit: "GBq" }] }] }).success).toBe(false);
    expect(ConjugateCompositionSchema.safeParse({ ...composition, payloads: [{ ...payload, cargoKind: "radionuclide", loadingObservations: [loading] }] }).success).toBe(false);
  });

  it("indexes composition references without confusing delivery and payload targets", () => {
    const drug = DrugSchema.parse({ ...graph().must("trastuzumab-emtansine"), conjugateComposition: {
      ...observation, deliveryTargetIds: ["her2"], payloads: [{ ...payload, chemical: { name: "DM1", entityId: "dm1" }, classIds: ["tubulin-inhibitor-payloads"], molecularTargets: [{ name: "Example target", entityId: "parp" }] }],
    } });
    expect(outgoing(drug)).toEqual(expect.arrayContaining([["her2", "composition-delivery"], ["dm1", "payload-component"], ["tubulin-inhibitor-payloads", "payload-class"], ["parp", "payload-target"]]));
    expect(drug.conjugateComposition?.deliveryTargetIds).toEqual(["her2"]);
  });

  it("preserves mechanism context through the view and keeps hypotheses out of automatic propagation", () => {
    const pathway = structuredClone(graph().kind("pathway")[0]);
    const edge = PathwayEdgeSchema.parse({ from: pathway.nodes[0].id, to: pathway.nodes[1].id, evidence: [{ ...observation, basis: "hypothesis", context: "A fictional cell model", statement: "A proposed relationship" }] });
    pathway.edges = [edge];
    const result = pathwayView(pathway).edges[0];
    expect(result.evidence).toEqual(edge.evidence);
    expect(mechanismEvidenceLabel(result)).toBe("Hypothesis");
    expect(supportsPathIllustration(result)).toBe(false);
    expect(supportsPathIllustration({})).toBe(true);
  });

  it("leaves older drug, edge and trial records valid without adding empty evidence defaults", () => {
    const oldDrug = { id: "example-old-drug", kind: "drug", name: "Legacy fixture", tldr: "A fictional older record.", summary: "A fictional older record.", asOf: "2026-11-08", modality: "ADC", mechanism: "A stated mechanism" };
    expect(DrugSchema.parse(oldDrug)).not.toHaveProperty("conjugateComposition");
    expect(PathwayEdgeSchema.parse({ from: "a", to: "b" })).toEqual({ from: "a", to: "b", type: "activates" });
    const old = { nct: "NCT01578239", source: "https://clinicaltrials.gov/study/NCT01578239", fetchedAt: "2026-11-08T12:00:00.000Z", studySha256: "0".repeat(64), collaboratorCount: 0, hasEligibility: false, siteCount: 0, recruitingSiteCount: 0 };
    expect(TrialParticipationSchema.parse(old)).toEqual(old);
  });
});
