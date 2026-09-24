import { EVIDENCE_TIER_LABEL, EVIDENCE_TIERS, TARGET_ROLE_LABEL, TARGET_ROLES, TARGET_SPECIFICITY_LABEL, type EvidenceTier, type TargetRole, type TargetSpecificity } from "@/lib/kinds";

/**
 * The gene hub (/targets/genome/) as data. Pure module shared by the server page, the row builder
 * (src/lib/tables/genome.ts) and the client sections (src/components/GenomeRoles.tsx): the table id, the compact
 * row, the role and tier blurbs, and how a `?role=` or `?evidence=` deep link is read.
 */

/** The paged table holding every graded gene in the hub's order: /api/v1/tables/genome-genes.json. */
export const GENOME_TABLE = "genome-genes";

/** One gene as the hub renders it: a chip with the symbol, its page, the TL;DR tooltip, and the roles and tier the filters run on. */
export type GenomeGene = {
  id: string;
  /** HGNC symbol, or the record's name when it has none. */
  symbol: string;
  href: string;
  tldr: string;
  roles: TargetRole[];
  tier?: EvidenceTier;
  /** Specificity class (src/data/target-specificity.ts), for the hub's specificity pills; absent for unclassified genes. */
  specificity?: TargetSpecificity;
};

/** One role's section: its first TABLE_PAGE genes, the whole count, and how many of the role's genes sit in each evidence tier. */
export type GenomeRoleSection = {
  role: TargetRole;
  total: number;
  genes: GenomeGene[];
  tiers: Partial<Record<EvidenceTier, number>>;
};

export const ROLE_BLURB: Record<TargetRole, string> = {
  "drug-target": "A drug in trials or on the market acts on the protein (Open Targets known-drug evidence, CIViC therapies, or an OnCo product record that names it).",
  "oncogene-driver": "Mutation analysis of patient cohorts finds the gene activated more often than chance allows (IntOGen role Act).",
  "tumour-suppressor": "Mutation analysis of patient cohorts finds the gene knocked out more often than chance allows (IntOGen role LoF).",
  biomarker: "Curated clinical evidence ties its variants to diagnosis, prognosis or drug response (CIViC evidence items).",
  "fusion-partner": "UniProt records a chromosomal translocation or gene fusion involving the gene.",
  "dna-repair": "UniProt keyword DNA repair or DNA damage: the protein keeps the genome intact, which is why its loss sensitises tumours to some drugs.",
  "immune-checkpoint": "UniProt describes the protein as an immune checkpoint that restrains T cells.",
  antigen: "A membrane or secreted protein that antibody-based products (ADCs, bispecifics, CAR-T, radioligands) use as a docking site.",
};
export const TIER_BLURB: Record<EvidenceTier, string> = {
  "approved-drug": "A drug acting on the target has reached late-stage trials or approval for a cancer.",
  "clinical-evidence": "Clinical evidence items on its variants, or a drug in early trials, but nothing approved.",
  "cohort-driver": "Called a driver by cohort mutation analysis; no clinical evidence yet.",
  "association-only": "Association with cancer in the aggregated evidence, without a proven role.",
};

const fold = (s: string) => s.trim().toLowerCase();

/** A `?role=` value as the hub or the target browser writes it: the role id (`drug-target`) or its label (`Drug target`). Null when unknown. */
export function parseRole(v: string | null | undefined): TargetRole | null {
  if (!v) return null;
  const f = fold(v);
  return TARGET_ROLES.find((r) => r === f || fold(TARGET_ROLE_LABEL[r]) === f) ?? null;
}

/** A `?evidence=` value: the tier id (`approved-drug`) or its label (`Approved drug`). Null when unknown. */
export function parseTier(v: string | null | undefined): EvidenceTier | null {
  if (!v) return null;
  const f = fold(v);
  return EVIDENCE_TIERS.find((t) => t === f || fold(EVIDENCE_TIER_LABEL[t]) === f) ?? null;
}

/** The hub's own deep link for a role and tier choice (empty string for no filter). */
export function genomeHref(role: TargetRole | null, tier: EvidenceTier | null, spec: TargetSpecificity | null = null): string {
  const p = new URLSearchParams();
  if (role) p.set("role", role);
  if (tier) p.set("evidence", tier);
  if (spec) p.set("specificity", spec);
  const s = p.toString();
  return `/targets/genome/${s ? `?${s}` : ""}`;
}

/** The full target table filtered the same way (the browser's facets take labels). */
export function tableHref(role: TargetRole | null, tier: EvidenceTier | null, spec: TargetSpecificity | null = null): string {
  const p = new URLSearchParams();
  if (role) p.set("role", TARGET_ROLE_LABEL[role]);
  if (tier) p.set("evidence", EVIDENCE_TIER_LABEL[tier]);
  if (spec) p.set("specificity", TARGET_SPECIFICITY_LABEL[spec]);
  const s = p.toString();
  return `/targets/${s ? `?${s}` : ""}`;
}

/** The genes of one role, in the hub's order, narrowed to one tier and one specificity class when asked. */
export function genesFor(all: GenomeGene[], role: TargetRole, tier: EvidenceTier | null, spec: TargetSpecificity | null = null): GenomeGene[] {
  return all.filter((g) => g.roles.includes(role) && (!tier || g.tier === tier) && (!spec || g.specificity === spec));
}
