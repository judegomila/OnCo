import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ChemicalPropertyObservationSchema } from "./scoped-evidence";
import { TermSchema } from "./schema";
import { readChemicalObservations, queryChemicalObservations, chemicalEvidenceSummary } from "./chemical-observations";
import { isScopedEvidenceField, scopedEvidencePassages } from "./scoped-evidence-text";
import { ChemicalEvidence } from "../components/ChemicalEvidence";
import { outgoing } from "./graph";
import { composeTemplated } from "./ask-compose";

// Fictional experiments: these test evidence handling, not properties of a real drug.
const observation = {
  property: "transporter-substrate" as const,
  species: { name: "Free example cargo" },
  transporters: ["Example transporter"],
  context: "A fictional paired-cell experiment",
  method: "Fictional survival assay with a matched control",
  statement: "Resistance was observed in this experiment.",
  evidenceType: "experimental" as const,
  sources: [{ label: "Fictional experimental source", url: "https://example.org/experiment" }],
  checkedOn: "2026-11-09",
};

describe("chemical species and experimental observations", () => {
  it("requires source, chemical, method, context and the transporter for its endpoint", () => {
    expect(ChemicalPropertyObservationSchema.safeParse(observation).success).toBe(true);
    for (const key of ["species", "method", "context", "sources", "transporters", "checkedOn"] as const) {
      const missing = { ...observation, [key]: undefined };
      expect(ChemicalPropertyObservationSchema.safeParse(missing).success, key).toBe(false);
    }
    expect(ChemicalPropertyObservationSchema.safeParse({ ...observation, sources: [] }).success).toBe(false);
    expect(ChemicalPropertyObservationSchema.safeParse({ ...observation, property: "membrane-access" }).success).toBe(false);
    const loading = { ...observation, property: "conjugate-loading", transporters: undefined };
    expect(ChemicalPropertyObservationSchema.safeParse(loading).success).toBe(false);
    expect(ChemicalPropertyObservationSchema.safeParse({ ...loading, conjugate: { name: "Fictional preparation" } }).success).toBe(true);
  });

  it("does not substitute a free drug for a retained-linker species or a substrate for inhibition", () => {
    const observations = readChemicalObservations({ chemicalObservations: [observation] });
    expect(queryChemicalObservations(observations, { speciesName: observation.species.name, property: observation.property }).status).toBe("recorded");
    expect(queryChemicalObservations(observations, { speciesName: "Cysteine-linker-example-cargo", property: observation.property })).toEqual({ status: "not-recorded", observations: [] });
    expect(queryChemicalObservations(observations, { speciesName: observation.species.name, property: "transporter-inhibition" }).status).toBe("not-recorded");
    expect(queryChemicalObservations(observations, { speciesName: observation.species.name, property: observation.property, transporter: "Another transporter" }).status).toBe("not-recorded");
  });

  it("keeps differing experiments together in retrieval and the rendered evidence", () => {
    const different = { ...observation, statement: "Resistance was not observed in a different experiment.", context: "Another fictional model", sources: [{ label: "Other fictional source", url: "https://example.org/other" }] };
    const observations = readChemicalObservations({ chemicalObservations: [observation, different] });
    expect(queryChemicalObservations(observations, { speciesName: observation.species.name, property: observation.property }).observations).toHaveLength(2);
    const term = TermSchema.parse({ id: "example-chemical-term", kind: "term", name: "Example term", category: "Examples", asOf: "2026-11-09", tldr: "A fictional term.", summary: "A fictional term.", chemicalObservations: observations });
    expect(JSON.parse(JSON.stringify(term)).chemicalObservations).toEqual(observations);
    const passages = scopedEvidencePassages(term);
    expect(passages).toHaveLength(1);
    expect(isScopedEvidenceField(passages[0].field)).toBe(true);
    const html = renderToStaticMarkup(createElement(ChemicalEvidence, { id: term.id, name: term.name, observations }));
    const record = { entity: term, route: "/terms/example-chemical-term/", neighbours: {} };
    const answer = composeTemplated({ question: "How does Example term work?", intent: "mechanism", primary: record, secondary: [], related: [], retrieved: [record], lookup: () => undefined, alternates: [], primaryStrong: true, resolvedNotes: [] });
    const answerText = answer.sentences.map(sentence => sentence.text).join(" ");
    for (const value of [observation.statement, different.statement, observation.method, different.context, observation.sources[0].url, different.sources[0].url]) {
      expect(passages[0].text).toContain(value);
      expect(html).toContain(value);
      expect(answerText).toContain(value);
    }
  });

  it("keeps absent observations unknown and indexes an explicitly named canonical species", () => {
    expect(readChemicalObservations({})).toEqual([]);
    expect(chemicalEvidenceSummary([], ["membrane-access"])).toBe("Not recorded for a specified species and assay.");
    const html = renderToStaticMarkup(createElement(ChemicalEvidence, { id: "missing-example", name: "Example", observations: [] }));
    expect(html).toContain("This does not mean a negative result.");
    const term = TermSchema.parse({ id: "example-chemical-term", kind: "term", name: "Example term", category: "Examples", asOf: "2026-11-09", tldr: "A fictional term.", summary: "A fictional term.", chemicalObservations: [{ ...observation, species: { name: "Specified species", entityId: "dm1" }, conjugate: { name: "Specified conjugate", entityId: "trastuzumab-emtansine" } }] });
    expect(outgoing(term)).toContainEqual(["dm1", "chemical-species"]);
    expect(outgoing(term)).toContainEqual(["trastuzumab-emtansine", "chemical-conjugate"]);
    const old = TermSchema.parse({ id: "old-example", kind: "term", name: "Old example", category: "Examples", asOf: "2026-11-09", tldr: "A fictional term.", summary: "A fictional term." });
    expect(old).not.toHaveProperty("chemicalObservations");
  });

  it("does not turn a reported loading range into a mean or combine two preparations", () => {
    const first = { ...observation, property: "conjugate-loading", transporters: undefined, conjugate: { name: "Preparation A" }, statement: "The source reports a range without a fixed mean." };
    const second = { ...first, conjugate: { name: "Preparation B" }, statement: "A different source statement." };
    const observations = readChemicalObservations({ chemicalObservations: [first, second] });
    const result = queryChemicalObservations(observations, { speciesName: observation.species.name, property: "conjugate-loading", conjugateName: "Preparation A" });
    expect(result.observations).toHaveLength(1);
    expect(result.observations[0]).not.toHaveProperty("value");
    expect(result.observations[0].statement).toBe(first.statement);
    expect(chemicalEvidenceSummary(result.observations, ["conjugate-loading"])).toContain("Preparation A");
  });
});
