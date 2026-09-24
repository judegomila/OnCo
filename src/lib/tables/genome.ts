import { graph } from "@/lib/graph";
import { EVIDENCE_TIERS, routeFor, TARGET_ROLES, TARGET_SPECIFICITIES, type EvidenceTier, type Target, type TargetSpecificity } from "@/lib/schema";
import { pageRows, TABLE_PAGE, type MoreRows } from "@/lib/static-tables";
import { GENOME_TABLE, genesFor, type GenomeGene, type GenomeRoleSection } from "@/lib/genome-hub";

/**
 * The gene hub (/targets/genome/) as a paged table. The hub listed every graded gene under every role it holds:
 * 2,083 chips over 1,447 genes, 940 KB of markup and 2.1 MB of HTML once the hydration payload repeated them.
 * The page now carries the first TABLE_PAGE genes of each role, with the role's whole count and its split by
 * evidence tier, and one file (/api/v1/tables/genome-genes.json) holds every graded gene once, in the hub's
 * order, with its roles and tier; the client filters the file per role, so a section's next page and the
 * `?role=` and `?evidence=` deep links run over the full set once it is fetched.
 */

/** The graded targets (a role or an evidence tier) as compact rows, sorted by the symbol the chip shows. */
export function genomeGenes(g = graph()): GenomeGene[] {
  const targets = g.kind("target") as Target[];
  return targets
    .filter((t) => t.role.length || t.evidenceTier)
    .map((t): GenomeGene => ({ id: t.id, symbol: t.symbol ?? t.name, href: routeFor(t), tldr: t.tldr, roles: [...t.role], ...(t.evidenceTier ? { tier: t.evidenceTier } : {}), ...(t.specificity ? { specificity: t.specificity } : {}) }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol, "en", { sensitivity: "base" }) || a.id.localeCompare(b.id));
}

/** Count the genes in each evidence tier (tiers with none are absent). */
export function tierCounts(genes: GenomeGene[]): Partial<Record<EvidenceTier, number>> {
  const out: Partial<Record<EvidenceTier, number>> = {};
  for (const tier of EVIDENCE_TIERS) { const n = genes.filter((g) => g.tier === tier).length; if (n) out[tier] = n; }
  return out;
}

/** Count the graded genes in each specificity class (classes with none are absent). */
export function specificityCounts(genes: GenomeGene[]): Partial<Record<TargetSpecificity, number>> {
  const out: Partial<Record<TargetSpecificity, number>> = {};
  for (const s of TARGET_SPECIFICITIES) { const n = genes.filter((g) => g.specificity === s).length; if (n) out[s] = n; }
  return out;
}

/** What the page hands to the client: one section per role that has genes, each with its first TABLE_PAGE genes; the file for the rest. */
export function genomeHub(genes = genomeGenes()): { genes: GenomeGene[]; sections: GenomeRoleSection[]; tiers: Partial<Record<EvidenceTier, number>>; specificities: Partial<Record<TargetSpecificity, number>>; more?: MoreRows } {
  const sections = TARGET_ROLES.map((role): GenomeRoleSection => {
    const own = genesFor(genes, role, null);
    return { role, total: own.length, genes: own.slice(0, TABLE_PAGE), tiers: tierCounts(own) };
  }).filter((s) => s.total);
  const paged = pageRows(GENOME_TABLE, genes);
  return { genes, sections, tiers: tierCounts(genes), specificities: specificityCounts(genes), more: paged.more };
}
