/**
 * Combination proposals: every row parses, every url is https, every evidence row has a date and a verbatim
 * quote, every corpus id it cites resolves, the score is the sum of its parts, and the status matches the
 * evidence it carries. The burden part is recomputed from GLOBOCAN so the ranking is auditable.
 */
import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { CombinationIdeaSchema } from "@/lib/schema";
import { GLOBOCAN_MAP, type GlobocanMapping } from "./globocan-map";
import globocan from "../../public/globocan/countries.json";
import { combinationIdeas } from "./combination-ideas";

const g = graph();
const parsed = combinationIdeas.map((c) => CombinationIdeaSchema.parse(c));

type Country = { name: string; data: Record<string, number[]> };
const countries = (globocan as unknown as { countries: Record<string, Country> }).countries;
const world = Object.values(countries).find((c) => c.name === "World");

/** World deaths (GLOBOCAN 2022) over the distinct sites of a cancer list; subtypes fall back to their parent's site. */
function worldDeaths(cancerIds: string[]): number {
  const codes = new Set<number>();
  for (const cid of cancerIds) {
    let id: string | undefined = cid;
    let m: GlobocanMapping | undefined = GLOBOCAN_MAP[id];
    while ((!m || m.codes.length === 0) && id) {
      const c = g.get(id);
      id = c && c.kind === "cancer" ? c.parent : undefined;
      m = id ? GLOBOCAN_MAP[id] : undefined;
    }
    for (const code of m?.codes ?? []) codes.add(code);
  }
  let d = 0;
  for (const code of codes) d += world?.data[String(code)]?.[2] ?? 0;
  return d;
}
const burdenOf = (deaths: number) => Math.min(40, Math.round(10 * Math.log10(1 + deaths / 1000)));
const VALIDATION_POINTS = { approved: 15, "phase-3": 10, "phase-2": 7, "phase-1-2": 5, none: 0 } as const;

describe("combination ideas", () => {
  it("has rows and unique ids", () => {
    expect(parsed.length).toBeGreaterThan(0);
    expect(new Set(parsed.map((c) => c.id)).size).toBe(parsed.length);
  });

  it("every url is https and every evidence row has a date, a quote and an identifier", () => {
    for (const c of parsed) for (const e of c.evidence) {
      expect(e.url, `${c.id}: ${e.url}`).toMatch(/^https:\/\//);
      expect(e.date, `${c.id}: ${e.source}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.quote.trim().length, `${c.id}: ${e.source} quote`).toBeGreaterThan(20);
      expect(e.source.trim().length, `${c.id}: source`).toBeGreaterThan(0);
    }
  });

  it("every referenced corpus id exists", () => {
    const missing: string[] = [];
    for (const c of parsed) {
      const ids = new Set<string>([...c.targets, ...c.cancers, ...c.refs, ...c.decomposerMissed, ...c.validation.a.via, ...c.validation.b.via]);
      for (const key of ["target", "targetA", "targetB"]) if (c.components[key]) ids.add(c.components[key]);
      for (const id of ids) if (!g.get(id)) missing.push(`${c.id} -> ${id}`);
      for (const [key, val] of Object.entries(c.components)) if (key === "payloadClass" || key === "e3Ligase") if (g.get(val) === undefined && val !== "vhl") missing.push(`${c.id} -> ${key}=${val}`);
    }
    expect(missing).toEqual([]);
  });

  it("every corpus id named in parentheses in the rationale is listed in refs", () => {
    const gaps: string[] = [];
    for (const c of parsed) {
      const refs = new Set([...c.refs, ...c.targets, ...c.cancers, ...c.validation.a.via, ...c.validation.b.via, ...c.decomposerMissed]);
      for (const m of `${c.rationale} ${c.plausibilityNote}`.matchAll(/\(([^()]+)\)/g)) {
        for (const tok of m[1].split(/,\s*/)) if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(tok) && g.get(tok) && !refs.has(tok)) gaps.push(`${c.id} -> ${tok}`);
      }
    }
    expect(gaps).toEqual([]);
  });

  it("targets and cancers are of the right kind and components match the format", () => {
    const AXES: Record<string, string[]> = { adc: ["target", "payloadClass"], radioligand: ["target", "isotope"], "car-t": ["target", "costimulatoryDomain"], bispecific: ["targetA", "targetB"], degrader: ["target", "e3Ligase"] };
    for (const c of parsed) {
      for (const t of c.targets) expect(g.get(t)?.kind, `${c.id}: ${t}`).toBe("target");
      for (const k of c.cancers) expect(g.get(k)?.kind, `${c.id}: ${k}`).toBe("cancer");
      expect(Object.keys(c.components).sort(), c.id).toEqual([...AXES[c.format]].sort());
    }
  });

  it("score parts add up and the burden part is what GLOBOCAN gives for the listed cancers", () => {
    for (const c of parsed) {
      const s = c.score;
      expect(s.total, c.id).toBe(s.burden + s.validationA + s.validationB + s.plausibility);
      expect(s.worldDeaths, `${c.id} worldDeaths`).toBe(worldDeaths(c.cancers));
      expect(s.burden, `${c.id} burden`).toBe(burdenOf(s.worldDeaths));
      expect(s.validationA, `${c.id} validationA`).toBe(VALIDATION_POINTS[c.validation.a.level]);
      expect(s.validationB, `${c.id} validationB`).toBe(VALIDATION_POINTS[c.validation.b.level]);
    }
  });

  it("status matches the evidence carried", () => {
    for (const c of parsed) {
      const exact = c.evidence.filter((e) => !e.adjacent);
      const kinds = new Set(exact.map((e) => e.kind));
      switch (c.status) {
        case "no public evidence": expect(exact, c.id).toEqual([]); break;
        case "clinical evidence": expect(kinds.has("trial") || exact.some((e) => e.kind === "paper" && /clinical|phase|patients|trial/i.test(e.note ?? "")), `${c.id} needs a trial row or a clinical paper`).toBe(true); break;
        case "preclinical evidence": expect(exact.length, c.id).toBeGreaterThan(0); expect(kinds.has("trial"), `${c.id} has a trial row, so it is clinical`).toBe(false); break;
        case "already in development (missed by decomposer)": expect(c.decomposerMissed.length, c.id).toBeGreaterThan(0); break;
      }
    }
  });

  it("a validation level with no corpus drug behind it is backed by an evidence row", () => {
    for (const c of parsed) for (const v of [c.validation.a, c.validation.b]) {
      if (v.level === "none" || v.via.length > 0) continue;
      expect(c.evidence.length, `${c.id}: validation level "${v.level}" cites no corpus drug, so it needs an evidence row`).toBeGreaterThan(0);
    }
  });

  it("copy follows house style: no em-dash or en-dash, UK spelling of the words we check", () => {
    for (const c of parsed) {
      const text = [c.name, c.rationale, c.plausibilityNote, c.caveat, ...c.evidence.map((e) => e.note ?? "")].join(" ");
      expect(text, c.id).not.toMatch(/[—–]/);
      expect(text, c.id).not.toMatch(/\b(tumor|tumors|center|centers|randomized|hematolog\w*)\b/);
    }
  });
});
