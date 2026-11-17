import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ConjugateComposition, RegulatoryClaims } from "./ScopedEvidence";
import { TrialParticipation } from "./TrialParticipation";
import { graph } from "@/lib/graph";
import { TrialSchema } from "@/lib/schema";
import { fieldText } from "@/lib/semantic-docs";
import { recordFromEntity } from "@/lib/ask";
import { scopedEvidencePassages } from "@/lib/scoped-evidence-text";
import { composeTemplated, type AskEntityRecord, type ComposeInput } from "@/lib/ask-compose";

function templated(r: AskEntityRecord, intent: ComposeInput["intent"], question: string) {
  return composeTemplated({ question, intent, primary: r, secondary: [], related: [], retrieved: [r], lookup: () => undefined, alternates: [], primaryStrong: true, resolvedNotes: [] });
}

describe("scoped evidence consumers", () => {
  it("shows the two 22C3 rules with their separate therapy, use and source context", () => {
    const e = graph().must("dako-pd-l1-22c3-pharmdx");
    if (e.kind !== "drug") throw Error("Expected the existing test product");
    const html = renderToStaticMarkup(createElement(RegulatoryClaims, { claims: e.regulatoryClaims! }));
    expect(html).toContain("pembrolizumab");
    expect(html).toContain("cemiplimab");
    expect(html).toContain("at least 1%");
    expect(html).toContain("at least 50%");
    expect(html).toContain("P150013/S012");
    expect(html).toContain("P150013/S021");
    for (const c of e.regulatoryClaims!) expect(html).toContain(c.sources[0].url);
    const passage = recordFromEntity(e, "/tests/example/").passages.find(p => p.field === "regulatory claim" && p.text.includes("at least 50%"))!;
    expect(passage.text).toContain("cemiplimab");
    expect(passage.text).toContain("non-small-cell lung cancer");
    expect(passage.text).toContain("Checked 2026-11-08");
    expect(fieldText(e)).toContain("P150013/S021");
    const answer = templated({ entity: e, route: "/tests/example/", neighbours: {} }, "approval", "What are the 22C3 authorization scopes?");
    const text = answer.sentences.map(s => s.text).join(" ");
    expect(text).toContain("pembrolizumab");
    expect(text).toContain("cemiplimab");
    expect(text).not.toContain("not approved anywhere");
  });

  it("shows both cargos and leaves unreported loading distinct from the T-DM1 mean and plasma species", () => {
    const dual = graph().must("clio-8221"), dm1 = graph().must("trastuzumab-emtansine");
    if (dual.kind !== "drug" || dm1.kind !== "drug") throw Error("Expected existing conjugates");
    const html = renderToStaticMarkup(createElement(ConjugateComposition, { composition: dual.conjugateComposition! }));
    expect(html).toContain("Exatecan");
    expect(html).toContain("Berzosertib");
    expect(html).toContain("Not recorded here");
    expect(html).not.toMatch(/0 payload|ratio 1:1/);
    const mean = renderToStaticMarkup(createElement(ConjugateComposition, { composition: dm1.conjugateComposition! }));
    expect(mean).toContain("3.5 payload molecules per antibody");
    expect(mean).toContain("Lys-MCC-DM1");
    expect(mean).toContain("human plasma");
    expect(mean).toContain("does not specify the amount reaching a tumor cell");
    expect(fieldText(dual)).toContain("Berzosertib");
    const passage = recordFromEntity(dm1, "/drugs/trastuzumab-emtansine/").passages.find(p => p.field === "conjugate composition")!;
    expect(passage.text).toContain("3.5 payload-molecules/antibody");
    expect(passage.text).toContain("human plasma");
    const answer = templated({ entity: dual, route: "/drugs/clio-8221/", neighbours: {} }, "mechanism", "What are the CLIO-8221 cargos?");
    expect(answer.sentences.find(s => s.field === "conjugate composition")?.text).toContain("Berzosertib");
  });

  it("shares identical citations but keeps a component's distinct check date visible", () => {
    const e = graph().must("trastuzumab-emtansine");
    if (e.kind !== "drug") throw Error("Expected existing conjugate");
    const c = structuredClone(e.conjugateComposition!);
    const same = renderToStaticMarkup(createElement(ConjugateComposition, { composition: c }));
    expect(same.match(/Checked 2026-11-08/g)).toHaveLength(1);
    c.payloads[0].releasedSpecies![0].checkedOn = "2026-11-07";
    const distinct = renderToStaticMarkup(createElement(ConjugateComposition, { composition: c }));
    expect(distinct).toContain("Checked 2026-11-07");
    expect(distinct).toContain("Checked 2026-11-08");
  });

  it("never copies overall recruitment to a facility, and distinguishes zero slots from unstated slots", () => {
    const trial = structuredClone(graph().kind("trial").find(t => t.participation?.length)!);
    const observation = { checkedOn: "2026-11-08", sources: [{ label: "Fictional method fixture", url: "https://example.org/cohorts" }] };
    trial.participation = [{ ...trial.participation![0], overallStatus: "RECRUITING", facilities: [{ facility: "Example facility", country: "Example country" }], cohortObservations: [
      { ...observation, facility: "Example facility", cohort: "Cohort A", availability: "closed", availableSlots: 0 },
      { ...observation, facility: "Example facility", cohort: "Cohort B", availability: "not-stated" },
    ] }];
    const t = TrialSchema.parse(trial);
    const html = renderToStaticMarkup(createElement(TrialParticipation, { t }));
    expect(html).toContain("Facility status: not stated");
    expect(html).toContain("0 slots reported");
    expect(html).toContain("Slots not stated");
    expect(html).toContain("https://example.org/cohorts");
    const passages = scopedEvidencePassages(t);
    expect(passages.find(p => p.field === "registry facility")!.text).toContain("Facility status not stated");
    expect(passages.find(p => p.field === "cohort observation" && p.text.includes("Cohort A"))!.text).toContain("0 slots reported");
    const answer = templated({ entity: t, route: "/trials/example/", neighbours: {} }, "trials", "Which facilities and cohorts have slots?");
    const text = answer.sentences.map(s => s.text).join(" ");
    expect(text).toContain("Facility status not stated");
    expect(text).toContain("Cohort A");
    expect(text).toContain("Cohort B");
  });

  it("retains the model and hypothetical basis in a single extractive passage", () => {
    const pathway = structuredClone(graph().kind("pathway")[0]);
    pathway.edges[0].evidence = [{ basis: "hypothesis", context: "A fictional mouse model", statement: "A proposed receptor relationship", limitation: "No human result", checkedOn: "2026-11-08", sources: [{ label: "Example method", url: "https://example.org/model" }] }];
    const passage = recordFromEntity(pathway, "/pathways/example/").passages.find(p => p.field === "mechanism evidence")!;
    expect(passage.text).toContain("hypothesis");
    expect(passage.text).toContain("fictional mouse model");
    expect(passage.text).toContain("No human result");
    expect(fieldText(pathway)).toContain("A proposed receptor relationship");
  });
});
