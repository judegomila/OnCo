import { describe, expect, it } from "vitest";
import MiniSearch from "minisearch";
import { answerText, composeAnswer, recordFromEntity, retrieveIds, sentences, type AskRecord } from "./ask";
import { benchmark, scoreAnswer } from "@/data/benchmark";
import { graph } from "./graph";
import { routeFor } from "./schema";
import { searchDocs, type SearchDoc } from "./search-index";
import { buildSemanticIndex, semanticSearch } from "./semantic";
import { semanticDocs } from "./semantic-docs";

describe("sentences", () => {
  it("splits on sentence ends and drops fragments", () => {
    expect(sentences("Sacituzumab govitecan is a TROP2 ADC. It is approved in TNBC after two prior lines. Ok.")).toEqual([
      "Sacituzumab govitecan is a TROP2 ADC.", "It is approved in TNBC after two prior lines.",
    ]);
  });
});

describe("composeAnswer", () => {
  const records: AskRecord[] = [
    { id: "sg", kind: "drug", name: "Sacituzumab govitecan", route: "/drugs/sg/", tldr: "An antibody that carries chemotherapy to TROP2 on tumour cells.", passages: [
      { text: "An antibody that carries chemotherapy to TROP2 on tumour cells.", field: "TL;DR" },
      { text: "Sacituzumab govitecan is approved for metastatic triple-negative breast cancer after two prior therapies.", field: "summary" },
      { text: "Neutropenia and diarrhoea are the main grade 3 toxicities.", field: "summary" },
    ] },
    { id: "ascent", kind: "trial", name: "ASCENT", route: "/trials/ascent/", tldr: "The trial that proved sacituzumab govitecan in TNBC.", passages: [
      { text: "The trial that proved sacituzumab govitecan in TNBC.", field: "TL;DR" },
      { text: "ASCENT, overall survival: sacituzumab govitecan 12.1 months versus chemotherapy 6.7 months, hazard ratio 0.48.", field: "outcome" },
    ] },
  ];

  it("copies sentences verbatim with one citation per sentence, ordered by record", () => {
    const a = composeAnswer("What is the survival benefit of sacituzumab govitecan in TNBC?", records);
    expect(a.sentences.length).toBeGreaterThan(1);
    for (const s of a.sentences) expect(records.flatMap((r) => r.passages.map((p) => p.text))).toContain(s.text);
    expect(a.sentences.some((s) => s.text.startsWith("ASCENT, overall survival"))).toBe(true);
    expect(a.sources.map((s) => s.id)).toEqual(["sg", "ascent"]);
    expect(a.sentences.map((s) => s.cite)).toEqual([...a.sentences.map((s) => s.cite)].sort());
    expect(answerText(a)).toContain("[1] Sacituzumab govitecan (https://onco.cc/drugs/sg/)");
  });

  it("falls back to the top TL;DR and says so when nothing matches", () => {
    const a = composeAnswer("quantum chromodynamics", records);
    expect(a.confidence).toBe("low");
    expect(a.note).toBeDefined();
    expect(a.sentences.length).toBe(1);
    expect(a.sentences[0].field).toBe("TL;DR");
  });

  it("returns no sentences for no records", () => {
    expect(composeAnswer("anything", []).sentences).toEqual([]);
  });
});

describe("Ask OnCo against the open benchmark", () => {
  it("retrieves the expected records and covers the rubric at least as well as plain search", () => {
    const g = graph();
    const docs = searchDocs();
    const ms = new MiniSearch<SearchDoc>({ fields: ["name", "aka", "tldr", "tags", "id"], storeFields: ["id"], searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2 } });
    ms.addAll(docs);
    const sem = buildSemanticIndex(semanticDocs());
    let score = 0, recall = 0;
    for (const q of benchmark) {
      const ids = retrieveIds(ms.search(q.question).slice(0, 12).map((h) => ({ id: String(h.id) })), semanticSearch(sem, q.question, 12), 6);
      const records = ids.map((id) => { const e = g.must(id); return recordFromEntity(e, routeFor(e)); });
      const a = composeAnswer(q.question, records);
      score += scoreAnswer(q, answerText(a)).score;
      const hit = q.entities.filter((id) => ids.includes(id)).length;
      recall += q.entities.length ? hit / q.entities.length : 1;
    }
    const n = benchmark.length;
    // Measured on 2026-09-09: recall 0.43 (plain lexical top 6: 0.24), rubric 0.71. Floors sit below so regressions fail loudly.
    expect(recall / n).toBeGreaterThanOrEqual(0.36);
    expect(score / n).toBeGreaterThanOrEqual(0.62);
  });
});
