import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import type { Entity } from "@/lib/schema";
import cacheJson from "./trial-paper-authors.json";
import generated from "./person-trial-links.generated.json";
import {
  affiliationNames, fold, givenCompatible, hasTokenRun, institutionKeys, nameMatches, orcidOf, personNameTokens, personOrcid, personTrialAuthorship, trialReports,
  type AuthorshipInput, type CachedAuthor, type PersonTrialAuthorship, type TrialPaperAuthorCache,
} from "./person-trial-authorship";

const SLOW = Number(process.env.SLOW_TEST_MS ?? 120_000);

// ---------------------------------------------------------------------------------------------------------------------
// A small invented world: every name, institution and ORCID below is made up for the test.
// ---------------------------------------------------------------------------------------------------------------------
const ORCID_A = "0000-0001-0000-0001";
const ORCID_B = "0000-0001-0000-0002";
const world = (authors: CachedAuthor[], over: Partial<AuthorshipInput> = {}): AuthorshipInput => ({
  people: [{ id: "ana-example", name: "Ana B. Example", orcid: ORCID_A, institutionId: "north-hospital", institutions: ["north-hospital"] }],
  trials: [{ id: "alpha-1", name: "ALPHA-1", aka: [], keyPapers: ["paper-alpha-1-primary"] }],
  papers: [{ id: "paper-alpha-1-primary", name: "ALPHA-1: a drug against a placebo", trials: ["alpha-1"] }],
  institutions: [{ id: "north-hospital", name: "North Example Hospital", aka: ["NEH"] }],
  cache: { "paper-alpha-1-primary": { doi: "10.0000/example", fetchedAt: "2026-11-16", source: "test", authors } },
  ...over,
});
const run = (authors: CachedAuthor[], over: Partial<AuthorshipInput> = {}) => personTrialAuthorship(world(authors, over));

describe("person to trial authorship: the rule", () => {
  it("does not link on a name alone", () => {
    const r = run([{ lastName: "Example", firstName: "Ana B", initials: "AB", affiliations: ["South Clinic, Elsewhere."] }]);
    expect(r.links).toEqual({});
    expect(r.ambiguousCount).toBe(1);
    expect(r.ambiguous).toEqual([{ personId: "ana-example", trialId: "alpha-1", paperId: "paper-alpha-1-primary", author: "Example, Ana B", reason: "name-only" }]);
  });

  it("does not link on a name with no affiliation and no ORCID at all", () => {
    const r = run([{ lastName: "Example", initials: "A", affiliations: [] }]);
    expect(r.links).toEqual({});
    expect(r.ambiguous[0].reason).toBe("name-only");
  });

  it("links on a name and an equal ORCID, whatever the affiliation says", () => {
    const r = run([{ lastName: "Example", firstName: "Ana", initials: "A", orcid: ORCID_A, affiliations: ["South Clinic, Elsewhere."] }]);
    expect(r.links).toEqual({ "ana-example": [{ trialId: "alpha-1", paperId: "paper-alpha-1-primary", evidence: "orcid", name: "full" }] });
    expect(r.ambiguousCount).toBe(0);
  });

  it("reads the person's ORCID from a link when the field is empty", () => {
    expect(personOrcid({ id: "x", name: "X Y", links: [{ url: `https://orcid.org/${ORCID_A}` }] })).toBe(ORCID_A);
    expect(personOrcid({ id: "x", name: "X Y", links: [{ url: "https://example.org/0000-0001-0000-0001" }] })).toBeUndefined();
    expect(orcidOf("https://orcid.org/0000-0002-1825-009x")).toBe("0000-0002-1825-009X");
  });

  it("links on a name and an affiliation that names the person's institution", () => {
    const r = run([{ lastName: "Example", firstName: "Ana", initials: "A", affiliations: ["Department of Oncology, North Example Hospital, Exampleton."] }]);
    expect(r.links["ana-example"]).toEqual([{ trialId: "alpha-1", paperId: "paper-alpha-1-primary", evidence: "affiliation", name: "full" }]);
  });

  it("does not link on initials and an affiliation: a colleague with the same initial would match too", () => {
    const r = run([{ lastName: "Example", initials: "AB", affiliations: ["North Example Hospital."] }]);
    expect(r.links).toEqual({});
    expect(r.ambiguous).toMatchObject([{ personId: "ana-example", trialId: "alpha-1", reason: "initials-only" }]);
  });

  it("links on initials when the ORCID is the person's, and marks the link as made on initials", () => {
    const r = run([{ lastName: "Example", initials: "AB", orcid: ORCID_A }]);
    expect(r.links["ana-example"][0]).toMatchObject({ evidence: "orcid", name: "initial" });
  });

  it("does not link when the affiliation is another author's", () => {
    const r = run([
      { lastName: "Example", firstName: "Ana", affiliations: ["South Clinic."] },
      { lastName: "Other", firstName: "Bo", affiliations: ["North Example Hospital."] },
    ]);
    expect(r.links).toEqual({});
    expect(r.ambiguousCount).toBe(1);
  });

  it("treats two different ORCIDs as a conflict and does not fall back on the affiliation", () => {
    const r = run([{ lastName: "Example", firstName: "Ana", orcid: ORCID_B, affiliations: ["North Example Hospital."] }]);
    expect(r.links).toEqual({});
    expect(r.ambiguous[0].reason).toBe("orcid-conflict");
  });

  it("keeps homonyms ambiguous: two person records matching one author are both left unlinked", () => {
    const r = run(
      [{ lastName: "Example", firstName: "A", initials: "A", orcid: ORCID_A, affiliations: ["North Example Hospital."] }],
      { people: [
        { id: "ana-example", name: "Ana B. Example", orcid: ORCID_A, institutions: ["north-hospital"] },
        { id: "aldo-example", name: "Aldo Example", institutions: ["north-hospital"] },
      ] },
    );
    expect(r.links).toEqual({});
    expect(r.ambiguous.map((a) => [a.personId, a.reason, a.others])).toEqual([["aldo-example", "homonym", ["ana-example"]], ["ana-example", "homonym", ["aldo-example"]]]);
  });

  it("does not list a pair as ambiguous when another report of the same trial links it", () => {
    const w = world([{ lastName: "Example", firstName: "Ana", affiliations: ["South Clinic."] }]);
    w.trials[0].keyPapers = ["paper-alpha-1-primary", "paper-alpha-1-update"];
    w.papers.push({ id: "paper-alpha-1-update", name: "ALPHA-1 overall survival", trials: ["alpha-1"] });
    w.cache["paper-alpha-1-update"] = { fetchedAt: "2026-11-16", source: "test", authors: [{ lastName: "Example", firstName: "Ana", orcid: ORCID_A, affiliations: [] }] };
    const r = personTrialAuthorship(w);
    expect(r.links["ana-example"]).toEqual([{ trialId: "alpha-1", paperId: "paper-alpha-1-update", evidence: "orcid", name: "full" }]);
    expect(r.ambiguousCount).toBe(0);
  });

  it("ignores group authors, missing papers and papers that do not report the trial", () => {
    expect(run([{ collectiveName: "Example Investigators" }]).links).toEqual({});
    const missing = world([]);
    missing.cache["paper-alpha-1-primary"] = { fetchedAt: "2026-11-16", source: "test", missing: true };
    expect(personTrialAuthorship(missing)).toEqual({ links: {}, ambiguousCount: 0, ambiguous: [] });
    // Linked, but the paper is named for another trial: FLAURA2's first key paper is FLAURA's.
    const other = world([{ lastName: "Example", firstName: "Ana", orcid: ORCID_A }], { papers: [{ id: "paper-beta-2-primary", name: "BETA-2: something else", trials: ["alpha-1"] }] });
    other.cache = { "paper-beta-2-primary": other.cache["paper-alpha-1-primary"] };
    expect(personTrialAuthorship(other)).toEqual({ links: {}, ambiguousCount: 0, ambiguous: [] });
  });
});

describe("person to trial authorship: names", () => {
  const m = (person: string, a: CachedAuthor) => nameMatches(personNameTokens(person), a);
  it("needs the whole surname, accents and case aside", () => {
    expect(m("Javier Cortes", { lastName: "Cortés", firstName: "Javier" })).toBe("full");
    expect(m("Shun Lu", { lastName: "Luo", firstName: "Shun" })).toBeNull();
    expect(m("Shun Lu", { lastName: "Lu", firstName: "Shun" })).toBe("full");
    expect(m("Pasi A. Jänne", { lastName: "Janne", firstName: "Pasi A" })).toBe("full");
    expect(m("Johann de Bono", { lastName: "de Bono", firstName: "Johann S" })).toBe("full");
    expect(m("Johann de Bono", { lastName: "Bono", firstName: "Johann" })).toBeNull(); // "de" is not a given name of his
    expect(m("Birgitte Klindt Poulsen", { lastName: "Klindt Poulsen", firstName: "Birgitte" })).toBe("full");
    expect(m("Birgitte Klindt Poulsen", { lastName: "Poulsen", firstName: "Birgitte Klindt" })).toBe("full");
  });
  it("compares given names token by token", () => {
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "Dong-Wan" })).toBe("full");
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "Dong Wan" })).toBe("full");
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "Dongwan" })).toBe("full");
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "Dong W" })).toBe("full");
    expect(m("Dong-Wan Kim", { lastName: "Kim", initials: "DW" })).toBe("initial");
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "DW", initials: "DW" })).toBe("initial");
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "Dong-Hyun" })).toBeNull();
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "Dong H" })).toBeNull();
    expect(m("Dong-Wan Kim", { lastName: "Kim", initials: "DH" })).toBeNull();
    expect(m("Dong-Wan Kim", { lastName: "Kim", firstName: "Daniel" })).toBeNull();
    expect(m("Howard I. Scher", { lastName: "Scher", firstName: "Howard I" })).toBe("full");
    expect(m("Howard I. Scher", { lastName: "Scher", firstName: "Howard" })).toBe("full");
    expect(m("Howard I. Scher", { lastName: "Scher", firstName: "Howard A" })).toBeNull();
    expect(m("Howard I. Scher", { lastName: "Scher", firstName: "Harold I" })).toBeNull();
    expect(m("F. Stephen Hodi", { lastName: "Hodi", firstName: "F Stephen" })).toBe("initial");
    expect(m("Luis A. Diaz Jr.", { lastName: "Diaz", firstName: "Luis A" })).toBe("full");
    expect(givenCompatible([], ["a"])).toBeNull();
  });
  it("accepts surname-first order only on a full, equal first name", () => {
    expect(m("Lu Shun", { lastName: "Lu", firstName: "Shun" })).toBe("full");
    expect(m("Lu Shun", { lastName: "Lu", initials: "S" })).toBeNull();
    expect(m("Lu Shun", { lastName: "Lu", firstName: "Shan" })).toBeNull();
  });
  it("never matches an author with no personal name", () => {
    expect(m("Ana Example", { collectiveName: "Example Group" })).toBeNull();
    expect(m("Ana Example", { lastName: "Example" })).toBeNull();
  });
});

describe("person to trial authorship: word boundaries", () => {
  it("matches tokens, never fragments", () => {
    expect(hasTokenRun(fold("fluoropyrimidine chemotherapy"), fold("imid"))).toBe(false);
    expect(hasTokenRun(fold("an IMiD, with dexamethasone"), fold("imid"))).toBe(true);
    expect(hasTokenRun(fold("FLAURA2: osimertinib with chemotherapy"), fold("FLAURA"))).toBe(false);
    expect(hasTokenRun(fold("paper-keynote-522-schmid-nejm-2020"), fold("KEYNOTE-522"))).toBe(true);
    expect(hasTokenRun(fold("paper-keynote-5220"), fold("KEYNOTE-522"))).toBe(false);
  });
  it("recognises an institution by whole words", () => {
    const ucl = institutionKeys({ id: "ucl", name: "University College London", aka: ["UCL"] });
    expect(affiliationNames("UCL Cancer Institute, London, UK.", ucl)).toBe(true);
    expect(affiliationNames("UCLA Jonsson Comprehensive Cancer Center, Los Angeles, CA.", ucl)).toBe(false);
    expect(affiliationNames("Université Catholique de Louvain (UCLouvain), Brussels.", ucl)).toBe(false);
    const curie = institutionKeys({ id: "curie", name: "Institut Curie", aka: [] });
    expect(affiliationNames("Department of Medical Oncology, Institut Curie, Paris, France.", curie)).toBe(true);
    expect(affiliationNames("Institut Curien, Lyon.", curie)).toBe(false);
  });
  it("keeps the capitals of an acronym, so INC is not Inc and WHO is not who", () => {
    const inc = institutionKeys({ id: "inc", name: "Institut National du Cancer", aka: ["INC"] });
    expect(affiliationNames("Genentech, Inc., South San Francisco, CA.", inc)).toBe(false);
    expect(affiliationNames("INC, Luxembourg.", inc)).toBe(true);
  });
  it("does not use a bracketed place, a generic name or a two-letter alias", () => {
    const keys = institutionKeys({ id: "x", name: "Example Cancer Center (Philadelphia)", aka: ["University Hospital", "EC", "ECC"] });
    expect(keys).toEqual([{ key: "example cancer center", exact: false }, { key: "ECC", exact: true }]);
    expect(affiliationNames("University of Pennsylvania, Philadelphia, PA.", keys)).toBe(false);
    expect(affiliationNames("University Hospital, Somewhere.", keys)).toBe(false);
  });
  it("needs a link AND the trial's name in the paper's id or name", () => {
    const trials = [{ id: "flaura", name: "FLAURA", aka: [], keyPapers: ["paper-flaura-2018"] }, { id: "flaura2", name: "FLAURA2", aka: [], keyPapers: ["paper-flaura-2018", "paper-flaura2-2023"] }];
    const papers = [{ id: "paper-flaura-2018", name: "FLAURA: osimertinib first line", trials: [] }, { id: "paper-flaura2-2023", name: "FLAURA2: osimertinib with chemotherapy", trials: [] }, { id: "paper-flaura-os", name: "FLAURA overall survival", trials: [] }];
    expect(trialReports(trials, papers)).toEqual([{ trialId: "flaura", paperId: "paper-flaura-2018" }, { trialId: "flaura2", paperId: "paper-flaura2-2023" }]);
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// The corpus
// ---------------------------------------------------------------------------------------------------------------------
describe("person to trial authorship: the generated file", () => {
  const all = graph().entities as Entity[];
  const of = <K extends Entity["kind"]>(k: K) => all.filter((e): e is Extract<Entity, { kind: K }> => e.kind === k);
  const people = of("person");
  const named = new Set(people.flatMap((p) => [p.institutionId, ...p.institutions].filter((x): x is string => !!x)));
  const cache = cacheJson as unknown as TrialPaperAuthorCache;
  const file = generated as unknown as PersonTrialAuthorship & { generatedAt: string };
  const compute = () => personTrialAuthorship({ people, trials: of("trial"), papers: of("paper"), institutions: all.filter((e) => named.has(e.id)), cache });

  it("is what the rule yields from the cache today (run scripts/fetch-trial-authors.ts --derive-only if not)", () => {
    const now = compute();
    expect(file.ambiguousCount).toBe(now.ambiguousCount);
    expect(file.links).toEqual(now.links);
    expect(file.ambiguous).toEqual(now.ambiguous);
    expect(file.ambiguousCount).toBe(file.ambiguous.length);
  }, SLOW);

  it("links only records that exist, of the right kind", () => {
    const g = graph();
    for (const [personId, links] of Object.entries(file.links)) {
      expect(g.get(personId)?.kind, personId).toBe("person");
      expect(links.length, personId).toBeGreaterThan(0);
      for (const l of links) {
        expect(g.get(l.trialId)?.kind, `${personId} -> ${l.trialId}`).toBe("trial");
        expect(g.get(l.paperId)?.kind, `${personId} -> ${l.paperId}`).toBe("paper");
        expect(["orcid", "affiliation"], `${personId} -> ${l.trialId}`).toContain(l.evidence);
      }
    }
    for (const a of file.ambiguous) {
      expect(g.get(a.personId)?.kind, a.personId).toBe("person");
      expect(g.get(a.trialId)?.kind, a.trialId).toBe("trial");
    }
  }, SLOW);

  it("holds evidence for every link in the cached author list, re-read without the matcher", () => {
    const personById = new Map(people.map((p) => [p.id, p]));
    for (const [personId, links] of Object.entries(file.links)) {
      const p = personById.get(personId)!;
      const tokens = new Set([p.name, ...p.aka].flatMap(personNameTokens));
      const orcid = personOrcid(p);
      for (const l of links) {
        const entry = cache[l.paperId];
        expect(entry?.missing, l.paperId).toBeUndefined();
        const sameSurname = (entry.authors ?? []).filter((a) => a.lastName && fold(a.lastName).split(" ").every((t) => tokens.has(t)));
        expect(sameSurname.length, `${personId} is not in the author list of ${l.paperId}`).toBeGreaterThan(0);
        if (l.evidence === "orcid") expect(sameSurname.some((a) => orcidOf(a.orcid) === orcid && !!orcid), `${personId} ${l.paperId}`).toBe(true);
        else expect(sameSurname.some((a) => (a.affiliations ?? []).length > 0), `${personId} ${l.paperId}`).toBe(true);
      }
    }
  }, SLOW);

  it("keeps every paper it asked for, found or not, with the day it was read", () => {
    // A paper record added since the last run of scripts/fetch-trial-authors.ts is simply not read yet: it links
    // nobody until the script runs, which is a gap and not an error, so a new paper does not fail this file.
    const wanted = new Set(trialReports(of("trial"), of("paper")).map((r) => r.paperId));
    expect([...wanted].filter((id) => cache[id]).length).toBeGreaterThan(800);
    for (const [id, e] of Object.entries(cache)) {
      expect(/^\d{4}-\d{2}-\d{2}$/.test(e.fetchedAt), id).toBe(true);
      expect(!!e.missing !== !!e.authors, `${id} must have authors or be marked missing, not both`).toBe(true);
    }
  }, SLOW);
});
