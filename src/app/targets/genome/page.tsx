import type { Metadata } from "next";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { EVIDENCE_TIER_LABEL, EVIDENCE_TIERS, type Target } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { TARGETS_GENES_WAVE_GENERATED } from "@/data/targets-genes-wave";
import { TIER_BLURB, tableHref } from "@/lib/genome-hub";
import { genomeHub } from "@/lib/tables/genome";
import { TABLE_PAGE } from "@/lib/static-tables";
import { GenomeRoles } from "@/components/GenomeRoles";

export const metadata: Metadata = pageMeta({ title: "Cancer genes and proteins by role", description: "Every gene and protein the open catalogues (CIViC, Open Targets, IntOGen) tie to cancer, grouped by role and by the strength of the evidence, each with its own page, identifiers and sources.", path: "/targets/genome/" });

/**
 * The gene hub. Every graded gene used to be listed under every role it holds, 2.1 MB of HTML; the page now carries
 * the first TABLE_PAGE genes of each role and the whole counts, and the client sections fetch the rest from
 * /api/v1/tables/genome-genes.json (src/lib/tables/genome.ts, src/components/GenomeRoles.tsx).
 */
export default function Genome() {
  const g = graph();
  const targets = g.kind("target") as Target[];
  const generated = targets.filter((t) => t.tags.includes("cancer-genes-wave"));
  const hub = genomeHub();
  const total = hub.genes.length;
  const unclassified = targets.length - total;
  const n = (x: number) => x.toLocaleString("en-GB");
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Cancer genes and proteins" seed="Cancer genes and proteins"
        lede={`${n(total)} genes and proteins the open catalogues tie to cancer, each with its own page, registry identifiers and the sources it was read from, grouped here by what they do and by how strong the evidence is. ${n(generated.length)} were written from the catalogues on ${TARGETS_GENES_WAVE_GENERATED}; ${n(unclassified)} older target pages carry no role yet.`}
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
            {EVIDENCE_TIERS.map((tier) => (
              <Link key={tier} href={tableHref(null, tier)} className="card p-4 hover:border-border-strong hover:shadow-sm block">
                <div className="text-2xl font-semibold tabular-nums">{n(hub.tiers[tier] ?? 0)}</div>
                <div className="font-medium">{EVIDENCE_TIER_LABEL[tier]}</div>
                <p className="text-xs text-muted mt-1">{TIER_BLURB[tier]}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight mb-3">By role</h2>
          <GenomeRoles sections={hub.sections} tiers={hub.tiers} total={total} more={hub.more} />
        </section>

        {hub.more && (
          // The whole set for crawlers and agents without the sections' fetch: every gene also has its own page, listed in the sitemap.
          <p className="text-xs text-muted mt-8" data-genome-export>
            Each role above lists its first {TABLE_PAGE} genes and fetches the rest as you scroll, press Show more or set a filter.{" "}
            <a href={hub.more.src} className="underline hover:text-foreground">All {n(total)} genes as JSON</a> (symbol, page, roles, evidence tier, in the order shown)
            {" · "}
            <a href="/api/v1/targets.json" className="underline hover:text-foreground">full target records</a>
            {" · "}
            <Link href="/api/" className="underline hover:text-foreground">API</Link>
          </p>
        )}
      </Container>
    </>
  );
}
