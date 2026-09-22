import { describe, expect, it } from "vitest";
import {
  dedupePapers, enrolmentContradiction, entryFor, expectedDeadline, expectedPassed, isPooledName, phaseContradiction, statusContradiction,
  trialAcronyms, trialContradictions, trialFindings, watchDateContradiction, type RegistryRecord, type RoadmapWatchReport,
} from "./roadmap-watch";

const reg = (over: Partial<RegistryRecord>): RegistryRecord => ({ nct: "NCT00000000", status: "COMPLETED", phases: ["PHASE3"], studyType: "INTERVENTIONAL", enrolment: 1000, ...over });

describe("status mapping between the corpus vocabulary and ClinicalTrials.gov", () => {
  it("accepts the registry statuses each corpus status can honestly mean", () => {
    expect(statusContradiction("recruiting", "RECRUITING")).toBeNull();
    expect(statusContradiction("recruiting", "NOT_YET_RECRUITING")).toBeNull();
    expect(statusContradiction("recruiting", "ENROLLING_BY_INVITATION")).toBeNull();
    expect(statusContradiction("active", "ACTIVE_NOT_RECRUITING")).toBeNull();
    expect(statusContradiction("active", "RECRUITING")).toBeNull();
    expect(statusContradiction("completed", "COMPLETED")).toBeNull();
    expect(statusContradiction("completed", "TERMINATED")).toBeNull();
    expect(statusContradiction("planned", "NOT_YET_RECRUITING")).toBeNull();
    expect(statusContradiction("withdrawn", "WITHDRAWN")).toBeNull();
    expect(statusContradiction("positive", "COMPLETED")).toBeNull();
    expect(statusContradiction("positive", "ACTIVE_NOT_RECRUITING")).toBeNull();
    expect(statusContradiction("mixed", "RECRUITING")).toBeNull();
  });
  it("flags the clear contradictions in plain words", () => {
    expect(statusContradiction("recruiting", "COMPLETED")).toBe("corpus says recruiting, registry says completed");
    expect(statusContradiction("recruiting", "ACTIVE_NOT_RECRUITING")).toBe("corpus says recruiting, registry says active not recruiting");
    expect(statusContradiction("active", "TERMINATED")).toBe("corpus says active, registry says terminated");
    expect(statusContradiction("completed", "RECRUITING")).toBe("corpus says completed, registry says recruiting");
    expect(statusContradiction("planned", "RECRUITING")).toBe("corpus says planned, registry says recruiting");
    expect(statusContradiction("positive", "WITHDRAWN")).toBe("corpus records a positive result, registry says withdrawn");
  });
  it("never flags a missing or UNKNOWN registry status", () => {
    expect(statusContradiction("recruiting", "UNKNOWN")).toBeNull();
    expect(statusContradiction("recruiting", undefined)).toBeNull();
    expect(statusContradiction(undefined, "COMPLETED")).toBeNull();
  });
});

describe("enrolment tolerance", () => {
  it("lets 5 percent pass and flags anything beyond it", () => {
    expect(enrolmentContradiction(1000, 1000)).toBeNull();
    expect(enrolmentContradiction(1050, 1000)).toBeNull();
    expect(enrolmentContradiction(950, 1000)).toBeNull();
    expect(enrolmentContradiction(1051, 1000)).toBe("enrolment 1051 in the corpus, 1000 on the registry (5 percent apart)");
    expect(enrolmentContradiction(524, 557)).toMatch(/^enrolment 524 in the corpus, 557 on the registry \(6 percent apart\)$/);
    expect(enrolmentContradiction(44467, 22000)).toMatch(/102 percent apart/);
    expect(enrolmentContradiction(1581, 2031, 0.05, "ACTUAL")).toBe("enrolment 1581 in the corpus, 2031 on the registry (actual; 22 percent apart)");
    expect(enrolmentContradiction(94, 447, 0.05, "ESTIMATED")).toBe("enrolment 94 in the corpus, 447 on the registry (estimated; 79 percent apart)");
  });
  it("takes a custom tolerance and ignores missing figures", () => {
    expect(enrolmentContradiction(1100, 1000, 0.1)).toBeNull();
    expect(enrolmentContradiction(undefined, 1000)).toBeNull();
    expect(enrolmentContradiction(1000, undefined)).toBeNull();
  });
});

describe("phase comparison", () => {
  it("treats any overlap as agreement", () => {
    expect(phaseContradiction("3", reg({ phases: ["PHASE2", "PHASE3"] }))).toBeNull();
    expect(phaseContradiction("2/3", reg({ phases: ["PHASE3"] }))).toBeNull();
    expect(phaseContradiction("1/2", reg({ phases: ["PHASE1"] }))).toBeNull();
    expect(phaseContradiction("1", reg({ phases: ["EARLY_PHASE1"] }))).toBeNull();
  });
  it("flags disjoint phases and observational-versus-interventional mismatches", () => {
    expect(phaseContradiction("2", reg({ phases: ["PHASE3"] }))).toBe("corpus says phase 2, registry says phase3");
    expect(phaseContradiction("3", reg({ phases: ["PHASE1", "PHASE2"] }))).toBe("corpus says phase 3, registry says phase1 and phase2");
    expect(phaseContradiction("observational", reg({ phases: ["PHASE3"], studyType: "INTERVENTIONAL" }))).toBe("corpus says observational, registry lists an interventional study in phase3");
  });
  it("skips platform trials, observational registry records and NA phases", () => {
    expect(phaseContradiction("platform", reg({ phases: ["PHASE2"] }))).toBeNull();
    expect(phaseContradiction("observational", reg({ phases: ["NA"], studyType: "OBSERVATIONAL" }))).toBeNull();
    expect(phaseContradiction("3", reg({ phases: ["NA"] }))).toBeNull();
    expect(phaseContradiction("3", reg({ phases: undefined }))).toBeNull();
  });
});

describe("passed-expected detection", () => {
  it("widens partial dates to the end of their precision", () => {
    expect(expectedDeadline("2026-09-23")).toBe("2026-09-23");
    expect(expectedDeadline("2025-09")).toBe("2025-09-30");
    expect(expectedDeadline("2026-02")).toBe("2026-02-28");
    expect(expectedDeadline("2027")).toBe("2027-12-31");
    expect(expectedDeadline("Q4 2026")).toBe("2026-12-31");
    expect(expectedDeadline("2026-Q2")).toBe("2026-06-30");
    expect(expectedDeadline("ASCO 2027 (2027-06)")).toBe("2027-06-30");
    expect(expectedDeadline("no date stated")).toBeNull();
    expect(expectedDeadline(undefined)).toBeNull();
  });
  it("is strictly before today", () => {
    expect(expectedPassed("2025-09", "2026-09-21")).toBe(true);
    expect(expectedPassed("2026-09-20", "2026-09-21")).toBe(true);
    expect(expectedPassed("2026-09-21", "2026-09-21")).toBe(false);
    expect(expectedPassed("2026-09-23", "2026-09-21")).toBe(false);
    expect(expectedPassed("2026-09", "2026-09-21")).toBe(false);
    expect(expectedPassed(undefined, "2026-09-21")).toBe(false);
  });
});

describe("watch items quoting a registry completion date", () => {
  const w = { expected: "2026-10-01", source: "https://clinicaltrials.gov/study/NCT04660344" };
  it("agrees when either completion date is in the same month", () => {
    expect(watchDateContradiction(w, reg({ primaryCompletion: "2024-05-31", completion: "2026-10-01" }))).toBeNull();
    expect(watchDateContradiction(w, reg({ primaryCompletion: "2026-10-15" }))).toBeNull();
  });
  it("flags a moved date, and only for registry-sourced items", () => {
    expect(watchDateContradiction(w, reg({ primaryCompletion: "2024-05-31", completion: "2027-03-01" }))).toBe("watch item expects 2026-10-01; the registry now lists primary completion 2024-05-31 and completion 2027-03-01");
    expect(watchDateContradiction({ ...w, source: "https://grail.com/press" }, reg({ completion: "2027-03-01" }))).toBeNull();
    expect(watchDateContradiction(w, null)).toBeNull();
    expect(watchDateContradiction({ expected: "ASCO 2027", source: w.source }, reg({ completion: "2027-03-01" }))).toBeNull();
  });
});

describe("names and acronyms", () => {
  it("finds acronyms and splits pooled or aliased names", () => {
    expect(trialAcronyms({ name: "KEYNOTE-671", aka: [] })).toEqual(["KEYNOTE-671"]);
    expect(trialAcronyms({ name: "SOFT & TEXT", aka: [] })).toEqual(["SOFT", "TEXT"]);
    expect(trialAcronyms({ name: "EV-302 / KEYNOTE-A39", aka: ["EV-302", "KEYNOTE-A39"] })).toEqual(["EV-302", "KEYNOTE-A39"]);
    expect(trialAcronyms({ name: "CheckMate 9LA", aka: [] })).toEqual(["CheckMate 9LA"]);
    expect(trialAcronyms({ name: "MASAI (Mammography Screening with Artificial Intelligence)", aka: [] })).toEqual(["MASAI"]);
    expect(trialAcronyms({ name: "CIRCULATE-US", aka: ["NRG-GI008", "Colon Adjuvant Chemotherapy Based on Evaluation of Residual Disease"] })).toEqual(["CIRCULATE-US", "NRG-GI008"]);
  });
  it("keeps one-name trials whole and drops trailing trial, study or platform", () => {
    expect(trialAcronyms({ name: "JAVELIN Head and Neck 100", aka: [] })).toEqual(["JAVELIN Head and Neck 100"]);
    expect(trialAcronyms({ name: "ROMANA 1 and ROMANA 2", aka: [] })).toEqual(["ROMANA 1", "ROMANA 2"]);
    expect(trialAcronyms({ name: "STAMPEDE", aka: ["STAMPEDE trial", "MRC PR08", "STAMPEDE platform"] })).toEqual(["STAMPEDE", "MRC PR08"]);
    expect(trialAcronyms({ name: "Vanguard Study (NCI Cancer Screening Research Network)", aka: [] })).toEqual(["Vanguard"]);
    expect(trialAcronyms({ name: "HERA, NSABP B-31 & NCCTG N9831 (adjuvant trastuzumab)", aka: [] })).toEqual(["HERA", "NSABP B-31", "NCCTG N9831"]);
  });
  it("leaves out descriptive titles and registry ids", () => {
    expect(trialAcronyms({ name: "Low-dose olanzapine for cancer anorexia (Tata Memorial)", aka: [] })).toEqual([]);
    expect(trialAcronyms({ name: "MIMic-01: healthy-donor FMT plus anti-PD-1, first-line melanoma", aka: [] })).toEqual([]);
    expect(trialAcronyms({ name: "NCT04136002", aka: ["ISRCTN91431511"] })).toEqual([]);
  });
  it("recognises pooled names so their figures are not compared with one registry record", () => {
    expect(isPooledName("SOFT & TEXT")).toBe(true);
    expect(isPooledName("ROMANA 1 and ROMANA 2")).toBe(true);
    expect(isPooledName("HERA, NSABP B-31 & NCCTG N9831 (adjuvant trastuzumab)")).toBe(true);
    expect(isPooledName("EV-302 / KEYNOTE-A39")).toBe(false);
    expect(isPooledName("APT (adjuvant paclitaxel-trastuzumab)")).toBe(false);
  });
});

describe("trialContradictions puts it together", () => {
  it("collects status, phase and enrolment findings for a single trial", () => {
    const t = { name: "ECLIPSE (Shield blood test)", status: "recruiting" as const, phase: "3" as const, enrolled: 44467 };
    expect(trialContradictions(t, reg({ status: "ACTIVE_NOT_RECRUITING", phases: ["NA"], studyType: "OBSERVATIONAL", enrolment: 22000, enrolmentType: "ACTUAL" }))).toEqual([
      "corpus says recruiting, registry says active not recruiting",
      "enrolment 44467 in the corpus, 22000 on the registry (actual; 102 percent apart)",
    ]);
  });
  it("checks only status for pooled names, and nothing without a registry record", () => {
    const t = { name: "SOFT & TEXT", status: "positive" as const, phase: "3" as const, enrolled: 5738 };
    expect(trialContradictions(t, reg({ status: "WITHDRAWN", enrolment: 3066, phases: ["PHASE2"] }))).toEqual(["corpus records a positive result, registry says withdrawn"]);
    expect(trialContradictions(t, null)).toEqual([]);
  });
  it("moves an enrolment gap to explained when the record says what its figure counts", () => {
    const note = "ClinicalTrials.gov lists 2,031 participants (actual) across all three arms; the Lancet 2021 primary analysis concurrently randomised 1,581 patients.";
    const t = { name: "CheckMate 649", status: "positive" as const, phase: "3" as const, enrolled: 1581, enrolledBasis: "randomised" as const, enrolledNote: note };
    const r = reg({ status: "COMPLETED", enrolment: 2031, enrolmentType: "ACTUAL" });
    expect(trialFindings(t, r)).toEqual({
      contradictions: [],
      explained: [`enrolment 1581 in the corpus (randomised), 2031 on the registry (actual; 22 percent apart): ${note}`],
    });
    expect(trialContradictions(t, r)).toEqual([]);
    // The default basis is the registry, so the same gap on a plain record is still a contradiction.
    expect(trialFindings({ ...t, enrolledBasis: undefined, enrolledNote: undefined }, r)).toEqual({
      contradictions: ["enrolment 1581 in the corpus, 2031 on the registry (actual; 22 percent apart)"],
      explained: [],
    });
    // Status and phase findings stay contradictions whatever the basis; a figure within tolerance explains nothing.
    expect(trialFindings({ ...t, status: "recruiting" }, r).contradictions).toEqual(["corpus says recruiting, registry says completed"]);
    expect(trialFindings({ ...t, enrolled: 2000 }, r)).toEqual({ contradictions: [], explained: [] });
  });
});

describe("papers and report lookup", () => {
  it("deduplicates by DOI, then PMID, then title, newest first", () => {
    const out = dedupePapers([
      { title: "A", doi: "10.1/abc", date: "2026-09-10" },
      { title: "A again", doi: "10.1/ABC", date: "2026-09-11" },
      { title: "B", pmid: "1", date: "2026-09-12" },
      { title: "B", pmid: "1", date: "2026-09-12" },
      { title: "C", date: "2026-09-13" },
      { title: "c ", date: "2026-09-14" },
    ]);
    expect(out.map((p) => p.title)).toEqual(["C", "B", "A"]);
  });
  it("finds a roadmap's entry or nothing", () => {
    const report = { generatedAt: "2026-09-21", offline: false, requests: 3, roadmaps: [{ id: "ctdna-tests", name: "ctDNA", asOf: "2026-09-21", since: "2026-09-21", counts: { trials: 1, checked: 1, contradictions: 0, explained: 0, papers: 0, watch: 0, watchPassed: 0 }, trials: [], watch: [], contradictions: [], explained: [] }] } as RoadmapWatchReport;
    expect(entryFor(report, "ctdna-tests")?.name).toBe("ctDNA");
    expect(entryFor(report, "kras-roadmap")).toBeUndefined();
    expect(entryFor(undefined, "ctdna-tests")).toBeUndefined();
  });
});
