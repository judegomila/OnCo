import type { Metadata } from "next";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { EVIDENCE_TIER_LABEL, EVIDENCE_TIERS, TARGET_ROLE_LABEL, TARGET_ROLES, routeFor, type EvidenceTier, type Target, type TargetRole } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { TARGETS_GENES_WAVE_GENERATED } from "@/data/targets-genes-wave";

export const metadata: Metadata = pageMeta({ title: "Cancer genes and proteins by role", description: "Every gene and protein the open catalogues (CIViC, Open Targets, IntOGen) tie to cancer, grouped by role and by the strength of the evidence, each with its own page, identifiers and sources.", path: "/targets/genome/" });

const ROLE_BLURB: Record<TargetRole, string> = {
  "drug-target": "A drug in trials or on the market acts on the protein (Open Targets known-drug evidence, CIViC therapies, or an OnCo product record that names it).",
  "oncogene-driver": "Mutation analysis of patient cohorts finds the gene activated more often than chance allows (IntOGen role Act).",
  "tumour-suppressor": "Mutation analysis of patient cohorts finds the gene knocked out more often than chance allows (IntOGen role LoF).",
  biomarker: "Curated clinical evidence ties its variants to diagnosis, prognosis or drug response (CIViC evidence items).",
  "fusion-partner": "UniProt records a chromosomal translocation or gene fusion involving the gene.",
  "dna-repair": "UniProt keyword DNA repair or DNA damage: the protein keeps the genome intact, which is why its loss sensitises tumours to some drugs.",
  "immune-checkpoint": "UniProt describes the protein as an immune checkpoint that restrains T cells.",
  antigen: "A membrane or secreted protein that antibody-based products (ADCs, bispecifics, CAR-T, radioligands) use as a docking site.",
};
const TIER_BLURB: Record<EvidenceTier, string> = {
  "approved-drug": "A drug acting on the target has reached late-stage trials or approval for a cancer.",
  "clinical-evidence": "Clinical evidence items on its variants, or a drug in early trials, but nothing approved.",
  "cohort-driver": "Called a driver by cohort mutation analysis; no clinical evidence yet.",
  "association-only": "Association with cancer in the aggregated evidence, without a proven role.",
};

export default function Genome() {
  const g = graph();
  const targets = g.kind("target") as Target[];
  const graded = targets.filter((t) => t.role.length || t.evidenceTier);
  const generated = targets.filter((t) => t.tags.includes("cancer-genes-wave"));
  const byRole = TARGET_ROLES.map((r) => ({ role: r, genes: graded.filter((t) => t.role.includes(r)).sort((a, b) => a.name.localeCompare(b.name)) })).filter((x) => x.genes.length);
  const byTier = EVIDENCE_TIERS.map((tier) => ({ tier, n: graded.filter((t) => t.evidenceTier === tier).length }));
  const unclassified = targets.length - graded.length;
  const facet = (key: string, value: string) => `/targets/?${key}=${encodeURIComponent(value)}`;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Cancer genes and proteins" seed="Cancer genes and proteins"
        lede={`${graded.length.toLocaleString("en-GB")} genes and proteins the open catalogues tie to cancer, each with its own page, registry identifiers and the sources it was read from, grouped here by what they do and by how strong the evidence is. ${generated.length.toLocaleString("en-GB")} were written from the catalogues on ${TARGETS_GENES_WAVE_GENERATED}; ${unclassified.toLocaleString("en-GB")} older target pages carry no role yet.`}
        right={<Link href="/targets/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Filter the full table →</Link>} />
      <Container className="pb-16">
        <section className="card p-5 text-[15px] leading-relaxed max-w-4xl">
          <h2 className="text-lg font-semibold tracking-tight mb-2">Sources and licences</h2>
          <p>
            The gene list is the union of three open catalogues: <Link className="underline" href="/collections/civic/">CIViC</Link> (community-curated clinical interpretations of variants, CC0), <Link className="underline" href="/collections/open-targets/">Open Targets</Link> (targets associated with cancer, MONDO_0004992, by direct and indirect evidence at a stated score, CC0) and <Link className="underline" href="/collections/intogen/">IntOGen</Link> (drivers called by mutation analysis of patient cohorts, release 2024-09-20, CC0 1.0).
            Identifiers and aliases come from HGNC; the plain-English function text is UniProt&apos;s (CC BY 4.0), condensed and put into UK spelling, not rewritten. No licensed list (OncoKB, COSMIC) was used.
            Cancers are linked only where a catalogue ties the gene to a cancer that has an OnCo page; disease names that map to nothing are kept in each record&apos;s notes rather than guessed. Roles and evidence tiers are derived from the catalogue fields named on every page, and each page ends with a Sources line.
          </p>
          <p className="mt-2 text-sm text-muted">
            Machine-readable: <a className="underline" href="/api/v1/targets.json">all targets as JSON</a> (fields <code>role</code>, <code>evidenceTier</code>, <code>sources</code>, <code>hgnc</code>, <code>ensembl</code>, <code>uniprot</code>, <code>entrez</code>) · <a className="underline" href="/api/v1/targets.csv">CSV</a> · <Link className="underline" href="/schema/">field definitions</Link> · rebuilt by <code>scripts/fetch-cancer-genes.ts</code>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold tracking-tight mb-3">By evidence tier</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {byTier.map(({ tier, n }) => (
              <Link key={tier} href={facet("evidence", EVIDENCE_TIER_LABEL[tier])} className="card p-4 hover:border-border-strong hover:shadow-sm block">
                <div className="text-2xl font-semibold tabular-nums">{n.toLocaleString("en-GB")}</div>
                <div className="font-medium">{EVIDENCE_TIER_LABEL[tier]}</div>
                <p className="text-xs text-muted mt-1">{TIER_BLURB[tier]}</p>
              </Link>
            ))}
          </div>
        </section>

        {byRole.map(({ role, genes }) => (
          <section key={role} className="mt-10" id={role}>
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
              <h2 className="text-lg font-semibold tracking-tight">{TARGET_ROLE_LABEL[role]} <span className="text-muted font-normal tabular-nums">{genes.length.toLocaleString("en-GB")}</span></h2>
              <Link href={facet("role", TARGET_ROLE_LABEL[role])} className="text-sm underline text-muted hover:text-foreground">Open in the table →</Link>
            </div>
            <p className="text-sm text-muted mb-3 max-w-3xl">{ROLE_BLURB[role]}</p>
            <ul className="flex flex-wrap gap-1.5 notranslate" translate="no">
              {genes.map((t) => <li key={t.id}><Link href={routeFor(t)} title={t.tldr} className="chip border bg-card border-border hover:bg-foreground/5 text-xs font-mono">{t.symbol ?? t.name}</Link></li>)}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
