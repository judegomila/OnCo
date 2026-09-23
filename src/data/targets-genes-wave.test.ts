import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { EVIDENCE_TIERS, TARGET_ROLES } from "@/lib/kinds";
import { cancerGeneIdsBySource, targetsGenesWave } from "./targets-genes-wave";

/**
 * The generated cancer gene layer (scripts/fetch-cancer-genes.ts): one target record per gene the open catalogues tie
 * to cancer, with identifiers, roles, an evidence tier and sources. These rules hold across every target file, not
 * only the generated one, so a hand-written record cannot quietly duplicate a gene.
 */
describe("cancer gene targets", () => {
  const g = graph();
  const targets = g.kind("target");
  const wave = new Set(targetsGenesWave.map((t) => t.id));

  it("no two target records share an HGNC id, and generated ids are kebab-case gene symbols", () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const t of targets) {
      if (!t.hgnc) continue;
      const prior = seen.get(t.hgnc);
      if (prior) dupes.push(`${t.hgnc}: ${prior} and ${t.id}`);
      seen.set(t.hgnc, t.id);
    }
    expect(dupes).toEqual([]);
    for (const t of targetsGenesWave) { expect(t.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/); expect(t.hgnc, t.id).toMatch(/^HGNC:\d+$/); expect(t.symbol, t.id).toBeTruthy(); }
  });

  it("every generated record carries roles from the enum, an evidence tier, and https sources naming HGNC", () => {
    expect(targetsGenesWave.length).toBeGreaterThan(300);
    for (const t of targetsGenesWave) {
      expect(t.evidenceTier && EVIDENCE_TIERS.includes(t.evidenceTier), `${t.id} evidence tier`).toBe(true);
      for (const r of t.role ?? []) expect(TARGET_ROLES.includes(r), `${t.id} role ${r}`).toBe(true);
      expect((t.sources ?? []).length, `${t.id} sources`).toBeGreaterThan(0);
      expect((t.sources ?? []).some((s) => s.label.startsWith("HGNC")), `${t.id} names HGNC`).toBe(true);
      for (const s of t.sources ?? []) expect(s.url, `${t.id} source ${s.label}`).toMatch(/^https:\/\//);
      for (const l of t.links ?? []) expect(l.url, `${t.id} link ${l.label}`).toMatch(/^https:\/\//);
      expect(t.tags, t.id).toContain("cancer-genes-wave");
    }
  });

  it("every cancer, drug, trial, pathway and collection a generated record links to exists", () => {
    for (const t of targetsGenesWave) {
      for (const id of [...(t.cancers ?? []), ...(t.drugs ?? []), ...(t.trials ?? []), ...(t.pathways ?? []), ...(t.related ?? [])]) expect(g.get(id), `${t.id} -> ${id}`).toBeTruthy();
      for (const id of t.cancers ?? []) expect(g.get(id)?.kind, `${t.id} -> ${id}`).toBe("cancer");
    }
  });

  it("records are ordered by evidence tier, strongest first, and every source collection lists them back", () => {
    const order = targetsGenesWave.map((t) => EVIDENCE_TIERS.indexOf(t.evidenceTier!));
    for (let i = 1; i < order.length; i++) expect(order[i], `${targetsGenesWave[i].id} out of tier order`).toBeGreaterThanOrEqual(order[i - 1]);
    for (const [collection, ids] of Object.entries(cancerGeneIdsBySource)) {
      const c = g.get(collection);
      expect(c?.kind, collection).toBe("collection");
      const listed = new Set(c!.targets);
      for (const id of ids) { expect(wave.has(id), `${collection} lists ${id}`).toBe(true); expect(listed.has(id), `${collection} record links ${id}`).toBe(true); }
    }
    // The catalogue link is what keeps a gene with no drug, trial or pathway yet out of the orphan count.
    for (const t of targetsGenesWave) expect(g.incoming(t.id).size, `${t.id} has an inbound link`).toBeGreaterThan(0);
  });

  it("copy stays plain: TL;DRs are full sentences under 400 characters in UK spelling, with no em-dashes", () => {
    for (const t of targetsGenesWave) {
      expect(t.tldr.length, t.id).toBeLessThanOrEqual(400);
      expect(t.tldr, t.id).toMatch(/[.!?)"]$/);
      for (const s of [t.tldr, t.summary, ...(t.notes ?? []), ...(t.whereFound ?? [])]) { expect(s, t.id).not.toMatch(/[—–]/); expect(s, t.id).not.toMatch(/\b[Tt]umors?\b|\b[Ll]eukemia\b|\b[Ss]ignaling\b/); }
    }
  });
});
