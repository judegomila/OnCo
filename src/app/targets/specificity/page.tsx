import type { Metadata } from "next";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor, TARGET_DISTRIBUTION_LABEL, TARGET_DISTRIBUTIONS, TARGET_SPECIFICITIES, TARGET_SPECIFICITY_LABEL, type Target, type TargetDistribution, type TargetSpecificity } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { DISTRIBUTION_BLURB, DISTRIBUTION_GLYPH, DISTRIBUTION_MEDICINE, distributionTableHref, SPECIFICITY_BLURB, SPECIFICITY_EXAMPLES, SPECIFICITY_GLYPH, SPECIFICITY_MEDICINE, specificityTableHref, tumourAgnosticTableHref } from "@/lib/target-specificity";
import { SpecificityGlyph } from "@/components/TargetSpecificityPills";
import { TARGET_SPECIFICITY_GENERATED } from "@/data/target-specificity";
import { TARGET_EXPRESSION_HPA_LICENCE, TARGET_EXPRESSION_HPA_LICENCE_URL, TARGET_EXPRESSION_HPA_VERSION } from "@/data/target-expression-hpa";

export const metadata: Metadata = pageMeta({
  title: "Target specificity: is a cancer target unique to the tumour?",
  description: "Six classes of cancer target, from alterations only tumour cells carry (BCR::ABL1, KRAS G12C) through antigens shared with normal tissue (HER2, TROP2) or one lineage (CD19) to proteins found everywhere (tubulin, PARP), inherited variants (BRCA1/2) and immune targets (PD-1); with what each means for a medicine and how many cancer types each target matters in.",
  path: "/targets/specificity/",
});

const n = (x: number) => x.toLocaleString("en-GB");

/**
 * The explainer behind the specificity and distribution pills on target pages: what the six classes are, with the
 * corpus targets that sit in each, what the class means for a medicine, and how many cancer types a target matters in.
 * Every count and example is read from the graph, so the page and the browser facets agree. Server component.
 */
export default function TargetSpecificity() {
  const g = graph();
  const targets = g.kind("target") as Target[];
  const classified = targets.filter((t) => t.specificity || t.distribution);
  const bySpec = (s: TargetSpecificity) => targets.filter((t) => t.specificity === s);
  const byDist = (d: TargetDistribution) => targets.filter((t) => t.distribution === d);
  const agnostic = targets.filter((t) => t.tumourAgnostic).sort((a, b) => a.name.localeCompare(b.name));
  const notEstablished = classified.filter((t) => !t.specificity);
  /** The named examples that exist and sit in the class, then the class's most-connected other members, six in all. */
  const examples = (s: TargetSpecificity): Target[] => {
    const named = SPECIFICITY_EXAMPLES[s].map((id) => g.get(id)).filter((t): t is Target => !!t && t.kind === "target" && t.specificity === s);
    const rest = bySpec(s).filter((t) => !named.includes(t)).sort((a, b) => (g.incoming(b.id).get("drug")?.length ?? 0) - (g.incoming(a.id).get("drug")?.length ?? 0));
    return [...named, ...rest].slice(0, 6);
  };
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Target specificity" seed="Target specificity"
        lede={`Do cancer targets differ in how specific they are to cancer? Yes: some are alterations only tumour cells carry, some are ordinary proteins the tumour has more of, some are shared with one normal cell lineage, some are everywhere, some are inherited, and some sit on immune cells rather than the tumour. ${n(classified.length)} targets with an approved or clinical-stage medicine carry a class, read from label readouts, drug mechanisms, the Human Protein Atlas and UniProt; each target page says which data decided it.`}
        right={<Link href="/targets/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Filter the full table →</Link>} />
      <Container className="pb-16">
        <section className="grid gap-4 md:grid-cols-2">
          {TARGET_SPECIFICITIES.map((s) => {
            const members = bySpec(s);
            return (
              <div key={s} id={s} className="card p-5 scroll-mt-28" data-specificity-class={s}>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold tracking-tight inline-flex items-center gap-2"><SpecificityGlyph d={SPECIFICITY_GLYPH[s]} className="h-5 w-5 text-accent" />{TARGET_SPECIFICITY_LABEL[s]}</h2>
                  <Link href={specificityTableHref(s)} className="chip border bg-card border-border hover:bg-foreground/5 text-xs whitespace-nowrap" title={`Every target in this class in the browser`}>{n(members.length)} targets →</Link>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed">{SPECIFICITY_BLURB[s]}</p>
                <p className="mt-2 text-sm text-muted"><span className="font-medium text-foreground">For a medicine:</span> {SPECIFICITY_MEDICINE[s]}</p>
                {examples(s).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 notranslate" translate="no">
                    {examples(s).map((t) => <Link key={t.id} href={routeFor(t)} title={t.tldr} className="chip border bg-card border-border hover:bg-foreground/5 text-xs font-mono">{t.symbol ?? t.name}</Link>)}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
            <h2 className="text-lg font-semibold tracking-tight">How many cancer types</h2>
            <p className="text-sm text-muted">Counted over cancer families with a prevalence row, a label threshold or a catalogue link; Open Targets associations are the fallback.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TARGET_DISTRIBUTIONS.map((d) => (
              <Link key={d} href={distributionTableHref(d)} className="card p-4 hover:border-border-strong hover:shadow-sm block" data-distribution-class={d}>
                <div className="flex items-center gap-2"><SpecificityGlyph d={DISTRIBUTION_GLYPH[d]} className="h-5 w-5 text-accent" /><span className="text-2xl font-semibold tabular-nums">{n(byDist(d).length)}</span></div>
                <div className="font-medium">{TARGET_DISTRIBUTION_LABEL[d]}</div>
                <p className="text-xs text-muted mt-1">{DISTRIBUTION_BLURB[d]} {DISTRIBUTION_MEDICINE[d]}</p>
              </Link>
            ))}
          </div>
          {agnostic.length > 0 && (
            <div className="card p-5 mt-4" data-tumour-agnostic-list>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">Tumour-agnostic approvals</h3>
                <Link href={tumourAgnosticTableHref()} className="chip border bg-card border-border hover:bg-foreground/5 text-xs whitespace-nowrap">{n(agnostic.length)} targets →</Link>
              </div>
              <p className="mt-1 text-sm text-muted">A label lets a medicine aimed at these targets treat any solid tumour that carries the alteration or expression level, whatever organ it started in (NTRK fusions, RET fusions, BRAF V600E, HER2 IHC 3+, MSI-H or dMMR with the PD-1 antibodies). Broad tumour profiling is how they are found.</p>
              <div className="mt-3 flex flex-wrap gap-1.5 notranslate" translate="no">
                {agnostic.map((t) => <Link key={t.id} href={routeFor(t)} title={t.tldr} className="chip border bg-card border-border hover:bg-foreground/5 text-xs font-mono">{t.symbol ?? t.name}</Link>)}
              </div>
            </div>
          )}
        </section>

        <section className="card p-5 mt-10 text-[15px] leading-relaxed max-w-4xl" id="method">
          <h2 className="text-lg font-semibold tracking-tight mb-2">How the classes were assigned</h2>
          <p>
            <code>scripts/fetch-target-specificity.ts</code> ran on {TARGET_SPECIFICITY_GENERATED} over every target with an approved or clinical-stage medicine, applying rules in a fixed order and writing which rule fired into each target&apos;s note.
            Immune checkpoints and stromal targets read <em>immune or microenvironment</em> from the record&apos;s class. A tumour suppressor or DNA repair gene whose UniProt disease text names a hereditary cancer syndrome reads <em>germline variant</em> (TP53 is excluded by name: its mutations are overwhelmingly somatic).
            The label readouts filed under a target decide next: a majority measuring a sequence variant reads <em>tumour-specific</em>; a majority scoring protein level or gene copies reads <em>lineage antigen</em> where the Human Protein Atlas finds the gene enriched in a blood lineage, else <em>tumour-associated overexpression</em>.
            Then the mechanisms of the medicines aimed at an oncogene driver, then the antigen-directed medicines (ADCs, CAR-T, engagers, radioligands, tracers) against a membrane antigen, then catalogue driver calls without a corpus medicine, and last the atlas&apos;s RNA tissue specificity: low specificity or an essential protein reads <em>broadly expressed</em>.
            Where none of that decides, the target reads &quot;not established&quot; and the note says what was seen; {n(notEstablished.length)} targets sit there, nearly all catalogue genes with no corpus medicine and a tissue-enhanced expression pattern that says where the protein lives but not whether the tumour differs from normal tissue.
          </p>
          <p className="mt-2">
            Distribution counts cancer families (the top of each cancer&apos;s parent chain, with blood cancers merged into leukaemia, lymphoma and myeloma) that carry a prevalence row, a current label threshold or a catalogue link for the target; one family reads one type, two to four a few, five or more many. A tissue-agnostic approval or threshold reads many types and sets the tumour-agnostic mark.
          </p>
          <p className="mt-2 text-sm text-muted">
            Sources: label readouts and thresholds on the <Link className="underline" href="/biomarkers/">biomarker pages</Link>; drug modalities and mechanisms on the product pages; the <a className="underline" href="https://www.proteinatlas.org/" rel="noopener">Human Protein Atlas</a> version {TARGET_EXPRESSION_HPA_VERSION} downloadable data (RNA tissue, cancer and blood lineage specificity, normal tissue and cancer antibody staining), used under <a className="underline" href={TARGET_EXPRESSION_HPA_LICENCE_URL} rel="noopener">{TARGET_EXPRESSION_HPA_LICENCE}</a>; <a className="underline" href="https://www.uniprot.org/" rel="noopener">UniProt</a> involvement-in-disease text (CC BY 4.0); <Link className="underline" href="/collections/open-targets/">Open Targets</Link> disease associations (CC0). No licensed list was used.
            Machine-readable: <a className="underline" href="/api/v1/targets.json">all targets as JSON</a> (fields <code>specificity</code>, <code>distribution</code>, <code>tumourAgnostic</code>, <code>specificityNote</code>, <code>specificitySources</code>).
          </p>
        </section>
      </Container>
    </>
  );
}
