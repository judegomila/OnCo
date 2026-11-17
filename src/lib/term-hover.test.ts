import { describe, expect, it } from "vitest";
import { buildMatcher, findMatches, scan } from "./entity-matcher";
import { entityPatterns, termMarks } from "./term-hover";

type Ref = { id: string };
const m = buildMatcher<Ref>([
  { pattern: "HER2", ref: { id: "her2" } },
  { pattern: "HER2-low", ref: { id: "her2-low" } },
  { pattern: "PD-1", ref: { id: "pd1" } },
  { pattern: "PD-L1", ref: { id: "pdl1" } },
  { pattern: "TROP2", ref: { id: "trop2" } },
  { pattern: "trastuzumab deruxtecan", ref: { id: "tdxd" } },
  { pattern: "trastuzumab", ref: { id: "trastuzumab" } },
]);
const ids = (text: string) => findMatches(m, text, { key: (r) => r.id }).map((h) => [h.ref.id, text.slice(h.start, h.end)]);

describe("entity matcher", () => {
  it("prefers the longest match at a position: HER2-low beats HER2", () => {
    expect(ids("Results in HER2-low disease were positive.")).toEqual([["her2-low", "HER2-low"]]);
  });

  it("respects word boundaries and hyphens", () => {
    expect(ids("PD-L1 expression")).toEqual([["pdl1", "PD-L1"]]);
    expect(ids("anti-PD-1 antibody")).toEqual([]); // PD-1 sits inside a hyphenated compound
    expect(ids("HER2+ tumours and her2 status")).toEqual([["her2", "HER2"]]);
  });

  it("is case-insensitive and links each record once, first occurrence", () => {
    expect(ids("Trastuzumab deruxtecan, then trastuzumab alone, then TROP2 and trop2.")).toEqual([["tdxd", "Trastuzumab deruxtecan"], ["trastuzumab", "trastuzumab"], ["trop2", "TROP2"]]);
  });

  it("skips and caps", () => {
    const hits = findMatches(m, "HER2 and TROP2 and PD-L1", { key: (r) => r.id, skip: (r) => r.id === "her2", max: 1 });
    expect(hits.map((h) => h.ref.id)).toEqual(["trop2"]);
  });

  it("matches an entry marked exact only in its own case: HAS, not has", () => {
    const m2 = buildMatcher<Ref>([{ pattern: "HAS", ref: { id: "has-france" }, exact: true }, { pattern: "trastuzumab", ref: { id: "trastuzumab" } }]);
    const found = (text: string) => findMatches(m2, text, { key: (r) => r.id }).map((h) => text.slice(h.start, h.end));
    expect(found("The trial has reported.")).toEqual([]);
    expect(found("Has it reported? It has.")).toEqual([]);
    expect(found("HAS appraised it in 2024.")).toEqual(["HAS"]);
    expect(found("Trastuzumab, then trastuzumab.")).toEqual(["Trastuzumab"]); // other entries stay case-insensitive
  });

  it("finds an exact entry written wholly in capitals, prefers the exact spelling, and gives the same words to one record", () => {
    const m3 = buildMatcher<Ref>([
      { pattern: "ReSPECT", ref: { id: "respect-process" }, exact: true },
      { pattern: "pRCC", ref: { id: "papillary-rcc" }, exact: true },
      { pattern: "PRCC", ref: { id: "prcc-gene" }, exact: true },
    ]);
    const found = (text: string) => findMatches(m3, text, { key: (r) => r.id }).map((h) => [h.ref.id, text.slice(h.start, h.end)]);
    expect(found("Respect and respect, then RESPECT.")).toEqual([["respect-process", "RESPECT"]]);
    expect(found("The PRCC gene, then pRCC.")).toEqual([["prcc-gene", "PRCC"], ["papillary-rcc", "pRCC"]]);
    // The second "PRCC" is the gene again, already linked; it does not become a link to papillary RCC.
    expect(found("PRCC and PRCC.")).toEqual([["prcc-gene", "PRCC"]]);
  });

  it("scan reports every boundary-valid occurrence including overlaps", () => {
    expect(scan(m, "HER2-low").map((h) => h.ref.id).sort()).toEqual(["her2-low"]);
    expect(scan(m, "HER2 low").map((h) => h.ref.id)).toEqual(["her2"]);
  });
});

describe("corpus auto-linking", () => {
  it("leaves ordinary same and reflect unlinked while retaining the specific supplement names", () => {
    const text = "The same result may reflect a different exposure. SAME and Reflect are ordinary words here.";
    const hrefs = termMarks(text, 20).map(mark => mark.href);
    expect(hrefs).not.toContain("/technologies/sam-e-supplements/");
    expect(hrefs).not.toContain("/trials/reflect/");
    for (const word of ["same", "reflect"]) {
      expect(termMarks(word)).toEqual([]);
    }
    expect(termMarks("SAM-e and S-adenosyl-L-methionine are names of the supplement.", 8).map(mark => mark.href)).toContain("/technologies/sam-e-supplements/");
  });

  it("builds patterns for thousands of names and links HER2-low as a term, not a target", () => {
    const patterns = entityPatterns();
    expect(patterns.length).toBeGreaterThan(3000);
    const text = "Trastuzumab deruxtecan is approved for HER2-low breast cancer after DESTINY-Breast04.";
    const marks = termMarks(text, 6);
    const hrefs = marks.map((mk) => mk.href);
    expect(hrefs).toContain("/drugs/trastuzumab-deruxtecan/");
    expect(hrefs).toContain("/trials/destiny-breast04/");
    // "HER2-low" is the glossary term (its entry is named "HER2-low and HER2-ultralow"; each half is a pattern) ...
    expect(hrefs).toContain("/terms/her2-low/");
    expect(marks.find((mk) => mk.href === "/terms/her2-low/") && text.slice(marks.find((mk) => mk.href === "/terms/her2-low/")!.s, marks.find((mk) => mk.href === "/terms/her2-low/")!.e)).toBe("HER2-low");
    // ... and the HER2 target is not linked from inside the hyphenated compound.
    expect(hrefs).not.toContain("/targets/her2/");
  });

  it("a glossary term's bracketed qualifier does not shadow the record that owns the name", () => {
    const byPattern = new Map(entityPatterns().map((p) => [p.pattern.toLowerCase(), p.ref]));
    expect(byPattern.get("melanoma")?.route).toBe("/cancers/melanoma/");
    expect(byPattern.get("myeloma")?.kind).not.toBe("term");
    expect(byPattern.has("minimal")).toBe(false);
  });

  it("links the two-letter aliases OS and 1L, and hyphenated variants such as first-line and ctDNA-positive", () => {
    const hrefs = termMarks("OS improved in 1L; first-line ctDNA-positive patients did worse.", 8).map((mk) => mk.href);
    expect(hrefs).toContain("/terms/os/");
    expect(hrefs).toContain("/terms/first-line/");
    expect(hrefs).toContain("/terms/ctdna/");
  });

  it("does not turn a fragment of a glossary title into a link for an ordinary word", () => {
    // "British and American lymphoma practice: where they differ, and why" once made every "Why" on the site a
    // link to it, and "Biliary stent problems: blockage and infection" did the same for "infection".
    const byPattern = new Map(entityPatterns().map((p) => [p.pattern.toLowerCase(), p.ref]));
    for (const word of ["why", "infection", "management", "observation", "equity", "british", "array"]) {
      expect(byPattern.get(word)?.kind === "term" ? byPattern.get(word)?.name : undefined, word).toBeUndefined();
    }
    expect(termMarks("Why stopped, in the sponsor's words: business reasons.", 6).map((mk) => mk.label)).not.toContain("British and American lymphoma practice: where they differ, and why");
    // A real pair still links from each half.
    expect(byPattern.get("her2-ultralow")?.route).toBe("/terms/her2-low/");
    expect(byPattern.get("eqd2")?.kind).toBe("term");
  });

  it("links an acronym of two to five capitals only where it is written in capitals", () => {
    // "HAS" linked every "has" on the site, and MUST, FIT and LET did the same for "must", "fit" and "let".
    const labels = (text: string) => termMarks(text, 12).map((mk) => text.slice(mk.s, mk.e));
    expect(labels("The test has a result you must act on if it is fit to let you go home.")).toEqual([]);
    expect(labels("Screening used the MUST tool, a FIT, and protons with a high LET.")).toEqual(expect.arrayContaining(["MUST", "FIT", "LET"]));
    const exact = entityPatterns().filter((p) => p.exact).map((p) => p.pattern);
    expect(exact).toContain("FIT");
    // Every exact pattern is a name in capitals, or a coined single word whose capitals are part of it.
    expect(exact.filter((s) => !/^(?=(?:[^A-Z]*[A-Z]){2})[A-Z-]+$/.test(s) && !/^[A-Za-z-]*[a-z][A-Za-z-]*[A-Z][A-Za-z-]*$/.test(s))).toEqual([]);
    // A name with lower case and no inner capital keeps matching in any case.
    expect(entityPatterns().find((p) => p.pattern === "HER2-low")?.exact).toBeUndefined();
  });

  it("links a name in capitals of any length only where it is written in capitals", () => {
    const named = (text: string) => termMarks(text, 12).map((mk) => [text.slice(mk.s, mk.e), mk.label]);
    const platinum = (l: string) => l.startsWith("The PLATINUM Trial");
    expect(named("Second-line platinum chemotherapy is standard.").some(([, l]) => platinum(l))).toBe(false);
    expect(named("Platinum chemotherapy is standard.").some(([, l]) => platinum(l))).toBe(false);
    expect(named("The PLATINUM trial randomised patients with BRCA-associated disease.").some(([w, l]) => w === "PLATINUM" && platinum(l))).toBe(true);
    expect(named("Doctors select patients for surgery.").some(([, l]) => l === "SELECT")).toBe(false);
    expect(named("SELECT tested lenvatinib.")).toContainEqual(["SELECT", "SELECT"]);
    const exact = new Set(entityPatterns().filter((p) => p.exact).map((p) => p.pattern));
    for (const name of ["PLATINUM", "SELECT"]) expect(exact, name).toContain(name);
    // A name with a digit is never an ordinary word, so it links in any case.
    for (const text of ["Trop2 is the target.", "trop2 is the target.", "TROP2 is the target."]) expect(named(text), text).toContainEqual([text.slice(0, 5), "TROP2"]);
    expect([...exact].filter((s) => /\d/.test(s))).toEqual([]);
    // A real acronym still links, and written wholly in capitals a coined name still links too.
    expect(named("PFS was longer on the new drug.").map(([w]) => w)).toContain("PFS");
    expect(named("CCRCC is the commonest kind.").map(([w]) => w)).toContain("CCRCC");
  });

  it("does not take an ordinary word from a bracket or a coined name", () => {
    const words = (text: string) => termMarks(text, 12).map((mk) => [text.slice(mk.s, mk.e), mk.label]);
    // "(England)", "(Scotland)", "(Australia)", "(Alcohol)" and "(Oral)" are qualifiers in record names, not abbreviations.
    const prose = "England, Scotland and Australia screen for it; alcohol and oral tobacco raise the risk. Oral therapy followed.";
    const hits = words(prose).map(([w]) => w.toLowerCase());
    for (const w of ["england", "scotland", "australia", "alcohol", "oral"]) expect(hits, w).not.toContain(w);
    // Lower-case qualifiers in brackets ("Neuroblastoma (paediatric)", "Balkan Regional Centre (oncology)") are not names.
    const plain = words("Paediatric oncology teams treat precursor and thymic lesions.").map(([w]) => w.toLowerCase());
    for (const w of ["paediatric", "oncology", "precursor", "thymic"]) expect(plain, w).not.toContain(w);
    // A bracketed abbreviation obeys the capitals rule.
    expect(entityPatterns().find((p) => p.pattern === "PFS")?.exact).toBe(true);
    // "DOI" in this corpus is a paper's identifier, so the one from "Depth of invasion (DOI)" links nothing, in any case;
    // the term still links by its name.
    for (const t of ["Matched by DOI alone.", "See doi:10.1000/182 for the paper."]) expect(words(t)).toEqual([]);
    expect(words("Depth of invasion predicts nodal spread.").map(([w]) => w)).toContain("Depth of invasion");
    // "del(5q)" keeps its bracket; "del" alone is the Spanish and Italian word.
    expect(words("Instituto Nacional del Cáncer").map(([w]) => w)).not.toContain("del");
    expect(words("Patients with del(5q) respond to lenalidomide.").map(([w]) => w)).toContain("del(5q)");
    // A coined name keeps its capitals: "ReSPECT" is the emergency care plan, "respect" is not.
    expect(words("Staff respect the patient's wishes.").map(([w]) => w.toLowerCase())).not.toContain("respect");
    expect(words("She agreed a ReSPECT plan with her doctor.").map(([w]) => w)).toContain("ReSPECT");
  });

  it("does not link an ordinary word through an alias that names something else", () => {
    // "HAS" on the HTA glossary entry linked the word "has" on about 5,000 pages to health technology assessment;
    // HAS is France's Haute Autorité de Santé, which has its own record. The rest are aliases that named a
    // different thing (a regimen, a tool, another meaning of the acronym) or an ordinary word no case rule protects.
    // Matching is case-insensitive for these, so each is checked lower-cased: the pattern must be gone, not only re-cased.
    const byPattern = new Map(entityPatterns().map((p) => [p.pattern.toLowerCase(), p.ref]));
    for (const word of ["has", "prior", "protocol", "approval", "compliance", "powered", "cure", "median", "bleeding", "toxic", "sensitivity", "responding", "philadelphia", "tax", "combat", "same", "access", "edge", "rice", "concept", "spring", "relief", "pulse", "killer"]) {
      expect(byPattern.get(word)?.name, word).toBeUndefined();
    }
    // PCI now links to prophylactic cranial irradiation, the sense the corpus uses, not the peritoneal cancer index.
    expect(byPattern.get("pci")?.route).toBe("/terms/pci-term/");
    expect(termMarks("The trial has reported.", 4)).toEqual([]);
  });
});
