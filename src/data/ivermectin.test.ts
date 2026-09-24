import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { ivermectinDrug, ivermectinDrugs, ivermectinPapers, ivermectinTrials } from "./ivermectin";

/**
 * Every sentence on the ivermectin pages must carry its source: a claim about efficacy, safety or status cannot
 * arrive without a link. A sentence "cites a link" when it contains the label of one of the record's own links, so
 * "(ClinicalTrials.gov NCT05318469)" or "(Stromectol label on DailyMed)" at the end of the sentence is enough and
 * the label resolves to a URL on the page.
 */
const records = [...ivermectinDrugs, ...ivermectinTrials, ...ivermectinPapers];
const sentences = (text: string) => text.split(/(?<=[.!?])\s+(?=[A-Z0-9"'(])/).map((s) => s.trim()).filter(Boolean);
const cited = (sentence: string, labels: string[]) => labels.some((l) => sentence.includes(l));

describe("ivermectin evidence page", () => {
  it("every sentence of every summary, result and note cites one of the record's links by label", () => {
    const failures: string[] = [];
    for (const r of records) {
      const labels = (r.links ?? []).map((l) => l.label).filter((l) => !/^PubMed$/.test(l));
      expect(labels.length, `${r.id} has links`).toBeGreaterThan(0);
      const texts = [r.summary, ...("result" in r && r.result ? [r.result] : []), ...(r.notes ?? [])];
      for (const text of texts) for (const s of sentences(text)) if (!cited(s, labels)) failures.push(`${r.id}: "${s.slice(0, 90)}"`);
    }
    expect(failures).toEqual([]);
  });

  it("the drug record states the bottom line and keeps the parasitic approval out of the approval fields", () => {
    const d = ivermectinDrug;
    expect(d.status).toBe("phase-2");
    // for-me-related.ts reads any approval entry as "approved for the cancers named", so the Stromectol approval stays in prose.
    expect(d.approvals ?? []).toEqual([]);
    expect(d.regulatoryEvents ?? []).toEqual([]);
    expect(d.summary).toMatch(/no trial has shown that it treats any cancer/i);
    expect(d.summary).toMatch(/dosing outside a trial has caused documented harm \(Stromectol label on DailyMed\)/);
    const notes = (d.notes ?? []).join(" ");
    expect(notes).toMatch(/Saperstein case report 2026/);
    expect(notes).toMatch(/Powderly case report 2026/);
    expect(notes).toMatch(/Stromectol label on DailyMed/);
    expect(d.toxicity?.length ?? 0).toBeGreaterThan(10);
    for (const row of d.toxicity ?? []) expect(row.source, row.event).toMatch(/^https:\/\/dailymed\.nlm\.nih\.gov\//);
  });

  it("marks laboratory evidence as such and flags the expression of concern and the retraction on the records", () => {
    for (const step of ivermectinDrug.mechanismSteps ?? []) expect(step).toMatch(/^(Laboratory|Untested):/);
    const byId = new Map(ivermectinPapers.map((p) => [p.id, p]));
    for (const id of ["paper-draganov-ivermectin-cold-tumours-npj-breast-cancer-2021", "paper-hulscher-ivermectin-mebendazole-cohort-anticancer-res-2026"]) {
      const paper = byId.get(id)!;
      expect(paper.name, id).toMatch(/expression of concern/i);
      expect(paper.summary, id).toMatch(/expression of concern/i);
      expect(paper.caveats?.some((c) => /expression of concern/i.test(c)), id).toBe(true);
    }
    const retracted = byId.get("paper-makis-fenbendazole-case-series-retracted-2025")!;
    expect(retracted.name).toMatch(/^RETRACTED:/);
    expect((retracted.links ?? []).some((l) => /retraction/i.test(l.label))).toBe(true);
    const fenbendazole = ivermectinDrugs.find((d) => d.id === "fenbendazole")!;
    expect(fenbendazole.name).toMatch(/veterinary/i);
    expect(fenbendazole.modality).toMatch(/not approved for human use/i);
  });

  it("the four trials carry their registry ids, statuses the registry can honestly mean, and no phase 3", () => {
    const expected: Record<string, string> = { nct05318469: "recruiting", nct07487805: "planned", nct04447235: "negative", nct02366884: "historic" };
    expect(ivermectinTrials.map((t) => t.id).sort()).toEqual(Object.keys(expected).sort());
    for (const t of ivermectinTrials) {
      expect(t.nct, t.id).toBe(t.id.toUpperCase());
      expect(t.status, t.id).toBe(expected[t.id]);
      expect(t.phase, t.id).not.toBe("3");
      expect(t.outcomes ?? [], `${t.id} has no reported outcome to tabulate`).toEqual([]);
      expect((t.links ?? []).some((l) => l.url === `https://clinicaltrials.gov/study/${t.nct}`), t.id).toBe(true);
    }
  });

  it("is wired into the graph: every record resolves and every paper names ivermectin, fenbendazole or mebendazole", () => {
    const g = graph();
    for (const r of records) expect(g.get(r.id)?.kind, r.id).toBe(r.kind);
    const drugIds = new Set(ivermectinDrugs.map((d) => d.id));
    for (const p of ivermectinPapers) expect((p.drugs ?? []).some((d) => drugIds.has(d)), p.id).toBe(true);
    const drug = g.get("ivermectin");
    expect(drug?.kind).toBe("drug");
    if (drug?.kind !== "drug") return;
    expect(drug.trials).toEqual(expect.arrayContaining(ivermectinTrials.map((t) => t.id)));
    for (const id of drug.keyPapers) expect(g.get(id)?.kind, id).toBe("paper");
    expect([...g.incoming("ivermectin").values()].reduce((n, list) => n + list.length, 0)).toBeGreaterThan(20);
  });
});
