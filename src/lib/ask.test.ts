import { describe, expect, it } from "vitest";
import MiniSearch from "minisearch";
import { answerText, composeAnswer, recordFromEntity, retrieveIds, sentences, type AskRecord } from "./ask";
import { benchmark, scoreAnswer } from "@/data/benchmark";
import { askEval, scoreAskEval } from "@/data/ask-eval";
import { graph } from "./graph";
import { routeFor } from "./schema";
import { searchDocs, type SearchDoc } from "./search-index";
import { buildSemanticIndex, semanticSearch } from "./semantic";
import { semanticDocs } from "./semantic-docs";
import { askHarness } from "./ask-harness";
import { analyseQuestion, classifyIntent } from "./ask-intent";
import { unknownLexiconIds } from "./ask-index-build";
import { decodeAskIndex, deriveAliases, encodeAskIndex, shortName } from "./ask-index";
import { followUpsFor, regionFromQuestion } from "./ask-compose";

describe("sentences", () => {
  it("splits on sentence ends and drops fragments", () => {
    expect(sentences("Sacituzumab govitecan is a TROP2 ADC. It is approved in TNBC after two prior lines. Ok.")).toEqual([
      "Sacituzumab govitecan is a TROP2 ADC.", "It is approved in TNBC after two prior lines.",
    ]);
  });
});

describe("composeAnswer (extractive fallback)", () => {
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

describe("Ask index", () => {
  it("names only records that exist in the lexicon", () => {
    expect(unknownLexiconIds()).toEqual([]);
  });

  it("derives aliases from name, abbreviation, brand and code", () => {
    const a = deriveAliases({ id: "trastuzumab-deruxtecan", kind: "drug", name: "Trastuzumab deruxtecan", brand: "Enhertu", code: "DS-8201, T-DXd" });
    expect(a).toEqual(expect.arrayContaining(["Trastuzumab deruxtecan", "Enhertu", "DS-8201", "T-DXd"]));
    const c = deriveAliases({ id: "tnbc", kind: "cancer", name: "Triple-negative breast cancer (TNBC)" });
    expect(c).toEqual(expect.arrayContaining(["Triple-negative breast cancer", "TNBC", "triple-negative"]));
    expect(deriveAliases({ id: "x", kind: "term", name: "Cancer" })).toEqual([]);
  });

  it("round-trips through the compact wire format and derives routes", { timeout: 120_000 }, () => {
    const { index } = askHarness();
    const back = decodeAskIndex(JSON.parse(JSON.stringify(encodeAskIndex(index))));
    expect(back.entries.length).toBe(index.entries.length);
    const tnbc = back.entries.find((e) => e.id === "tnbc")!;
    expect(tnbc.kind).toBe("cancer");
    expect(tnbc.route).toBe("/cancers/tnbc/");
    expect(tnbc.aliases).toContain("triple-negative");
    expect(back.pairs.length).toBeGreaterThanOrEqual(benchmark.length);
  });

  it("uses the abbreviation as the short name for cancers", () => {
    expect(shortName({ kind: "cancer", name: "Triple-negative breast cancer (TNBC)" })).toBe("TNBC");
    expect(shortName({ kind: "drug", name: "Trastuzumab deruxtecan" })).toBe("Trastuzumab deruxtecan");
    expect(shortName({ kind: "technology", name: "CT (computed tomography)" })).toBe("CT");
  });
});

describe("intent and entity resolution", () => {
  it("classifies the common question shapes", () => {
    expect(classifyIntent("What does 'triple-negative' mean in breast cancer?")).toBe("define");
    expect(classifyIntent("How is TNBC treated?")).toBe("treatments");
    expect(classifyIntent("Is Enhertu approved in the UK?")).toBe("approval");
    expect(classifyIntent("How does trastuzumab deruxtecan work?")).toBe("mechanism");
    expect(classifyIntent("What are the side effects of Trodelvy?")).toBe("side-effects");
    expect(classifyIntent("What trials are open for pancreatic cancer?")).toBe("trials");
    expect(classifyIntent("Enhertu vs Trodelvy")).toBe("compare");
    expect(classifyIntent("Enhertu vs Trodelvy", 1)).not.toBe("compare");
    expect(classifyIntent("What is the survival rate for TNBC?")).toBe("prognosis");
    expect(classifyIntent("Who makes Keytruda?")).toBe("who");
    expect(classifyIntent("How much does Enhertu cost?")).toBe("cost");
    expect(classifyIntent("What did KEYNOTE-522 show?")).toBe("results");
    expect(classifyIntent("What is the standard treatment for stage II-III TNBC today?")).toBe("treatments");
  });

  it("resolves aliases, abbreviations, hyphen and quote variants", () => {
    const { index } = askHarness();
    const ids = (q: string) => analyseQuestion(q, index).entities.filter((e) => e.strong).map((e) => e.entry.id);
    expect(ids("What does 'triple-negative' mean in breast cancer?")[0]).toBe("tnbc");
    expect(ids("What does “triple negative” mean?")[0]).toBe("tnbc");
    expect(ids("Is Enhertu approved in the UK?")).toEqual(["trastuzumab-deruxtecan"]);
    expect(ids("What is HER2-low?")[0]).toBe("her2-low");
    expect(ids("What is HER2 low?")[0]).toBe("her2-low");
    expect(ids("Trodelvy side effects")).toContain("sacituzumab-govitecan");
    expect(ids("What did the VISION trial show?")).toContain("vision");
    expect(ids("What does pCR mean after chemotherapy?")[0]).toBe("pcr");
    expect(ids("Who makes Keytruda?")).toEqual(["pembrolizumab"]);
  });

  it("matches the owner's example to the curated benchmark pair", () => {
    const { index } = askHarness();
    const a = analyseQuestion("What does 'triple-negative' mean in breast cancer?", index);
    expect(a.pair?.pair.ids).toContain("tnbc");
    expect(a.pair?.similarity).toBe(1);
    // A paraphrase still matches.
    const b = analyseQuestion("What does triple-negative mean in breast cancer", index);
    expect(b.pair?.pair.ids).toContain("tnbc");
  });

  it("reads a region named in the question", () => {
    expect(regionFromQuestion("Is Enhertu approved in the UK?")).toBe("UK");
    expect(regionFromQuestion("Is Enhertu approved in Japan?")).toBe("JP");
    expect(regionFromQuestion("Is Enhertu approved?")).toBeUndefined();
  });

  it("suggests follow-ups that skip the current intent", () => {
    const f = followUpsFor({ kind: "cancer", name: "Triple-negative breast cancer (TNBC)" }, "define");
    expect(f).toContain("How is TNBC treated?");
    expect(f).toContain("What trials are open for TNBC?");
    expect(f.some((x) => x.startsWith("What is TNBC"))).toBe(false);
  });
});

describe("Ask OnCo end to end", () => {
  it("answers the owner's example with the TNBC TL;DR and the definition, cited", async () => {
    const a = await askHarness().ask("What does 'triple-negative' mean in breast cancer?", "UK");
    expect(a.intent).toBe("define");
    expect(a.template).toBe("define");
    expect(a.confidence).toBe("high");
    expect(a.entities[0].id).toBe("tnbc");
    expect(a.sources[0].id).toBe("tnbc");
    expect(a.sentences[0].cite).toBe(1);
    expect(a.sentences[0].text).toMatch(/lacks the three receptors \(oestrogen, progesterone, HER2\)/);
    const text = answerText(a).toLowerCase();
    for (const must of ["oestrogen", "progesterone", "her2", "er <1%", "pr <1%"]) expect(text).toContain(must);
    expect(a.followUps).toContain("How is TNBC treated?");
    expect(a.method).toMatch(/nothing is generated/);
    expect(a.readMore.some((r) => r.href === "/cancers/tnbc/")).toBe(true);
  });

  it("starts approval answers with the region the question names", async () => {
    const a = await askHarness().ask("Is Enhertu approved in the UK?", "US");
    expect(a.template).toBe("approval");
    expect(answerText(a)).toMatch(/In the United Kingdom, Trastuzumab deruxtecan is approved by the MHRA/);
  });

  it("answers prognosis questions with the state of the art first and no bare figure", async () => {
    const a = await askHarness().ask("What is the survival rate for triple negative breast cancer?");
    expect(a.template).toBe("prognosis");
    expect(a.sentences[0].field).toBe("TL;DR");
    expect(a.sentences.some((s) => s.field === "survival disclosure")).toBe(true);
    expect(a.readMore.some((r) => r.href === "/survival/")).toBe(true);
    expect(a.sentences[0].text).not.toMatch(/\d+%/);
  });

  it("compares two products side by side and links the compare page", async () => {
    const a = await askHarness().ask("Enhertu vs Trodelvy");
    expect(a.template).toBe("compare");
    expect(a.entities.map((e) => e.id).sort()).toEqual(["sacituzumab-govitecan", "trastuzumab-deruxtecan"]);
    expect(a.readMore.some((r) => r.href.startsWith("/compare/?ids="))).toBe(true);
  });

  it("falls back to sentence retrieval when nothing is named", async () => {
    const a = await askHarness().ask("Which oncology drugs were approved in the US in July 2026?");
    expect(a.sentences.length).toBeGreaterThan(0);
    for (const s of a.sentences) expect(a.sources[s.cite - 1]).toBeDefined();
  });

  it("clears the floors on the open benchmark and the natural set (before/after measured 2026-09-10)", { timeout: 120_000 }, async () => {
    const h = askHarness();
    // Before (extractive only): benchmark rubric 0.69, recall 0.41; natural rubric 0.59, recall 0.59.
    // After (this pipeline): benchmark rubric 0.83, recall 1.00 (the benchmark questions are curated pairs; with pairs
    // switched off 0.70 and 0.57); natural rubric 1.00, recall 0.93. Floors sit below so regressions fail loudly.
    let bScore = 0, bRecall = 0;
    for (const q of benchmark) {
      const a = await h.ask(q.question, "US");
      bScore += scoreAnswer(q, answerText(a)).score;
      const ids = a.consulted.map((s) => s.id);
      bRecall += q.entities.length ? q.entities.filter((id) => ids.includes(id)).length / q.entities.length : 1;
    }
    expect(bScore / benchmark.length).toBeGreaterThanOrEqual(0.76);
    expect(bRecall / benchmark.length).toBeGreaterThanOrEqual(0.9);
    let nScore = 0, nRecall = 0;
    for (const q of askEval) {
      const a = await h.ask(q.question, "US");
      const s = scoreAskEval(q, answerText(a), a.consulted.map((x) => x.id));
      nScore += s.score; nRecall += s.retrievalRecall;
    }
    expect(nScore / askEval.length).toBeGreaterThanOrEqual(0.88);
    expect(nRecall / askEval.length).toBeGreaterThanOrEqual(0.85);
  });

  it("keeps the extractive path at or above its previous floors", { timeout: 120_000 }, () => {
    const g = graph();
    const ms = new MiniSearch<SearchDoc>({ fields: ["name", "aka", "tldr", "tags", "id"], storeFields: ["id"], searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2 } });
    ms.addAll(searchDocs());
    const sem = buildSemanticIndex(semanticDocs());
    let score = 0, recall = 0;
    for (const q of benchmark) {
      const ids = retrieveIds(ms.search(q.question).slice(0, 12).map((h) => ({ id: String(h.id) })), semanticSearch(sem, q.question, 12), 6);
      const records = ids.map((id) => { const e = g.must(id); return recordFromEntity(e, routeFor(e)); });
      score += scoreAnswer(q, answerText(composeAnswer(q.question, records))).score;
      recall += q.entities.length ? q.entities.filter((id) => ids.includes(id)).length / q.entities.length : 1;
    }
    expect(recall / benchmark.length).toBeGreaterThanOrEqual(0.36);
    expect(score / benchmark.length).toBeGreaterThanOrEqual(0.62);
  });
});
