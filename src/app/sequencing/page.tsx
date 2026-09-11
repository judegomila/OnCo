import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { sequencingIndex } from "@/lib/sequencing";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { CancerIcon } from "@/components/CancerIcon";

export const metadata: Metadata = pageMeta({ title: "Lines of therapy", description: "For every cancer, the standard of care laid out by treatment line and biomarker subgroup, with guideline categories, evidence scores and the sequence and caution pairings that apply.", path: "/sequencing/" });

export default function SequencingIndexPage() {
  const idx = sequencingIndex().sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
  const groups = [...new Set(idx.map((c) => c.group))];
  const rows = idx.reduce((n, c) => n + c.rows, 0);
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Lines of therapy"
        lede={`${idx.length} cancers, ${rows} standard-of-care settings, each placed on a grid of treatment line against biomarker subgroup. The Navigator personalises one path; these tables show the whole map for a disease, with the sequence and caution pairings that say what should come before what.`} />
      <Container className="pb-16 space-y-10">
        {groups.map((g) => (
          <section key={g}>
            <h2 className="kicker mb-3">{g[0].toUpperCase() + g.slice(1)}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {idx.filter((c) => c.group === g).map((c) => (
                <Link key={c.id} href={`/sequencing/${c.id}/`} className="card block p-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-6 w-6" /></span>
                    <div className="min-w-0">
                      <div className="font-semibold leading-snug text-balance">{c.name}</div>
                      <div className="text-xs text-muted mt-1 tabular-nums">{c.rows} settings · {c.lines} lines · {c.subgroups} subgroups{c.pairings ? ` · ${c.pairings} sequence/caution pairings` : ""}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <section className="card p-5 text-sm max-w-3xl space-y-2">
          <h2 className="font-semibold text-base">How the grid is built</h2>
          <p>Each cancer&rsquo;s standard-of-care rows are parsed: the setting text is classified into a line (screening, early, locally advanced, first line, maintenance, second line, third line and beyond, special situations) and a biomarker subgroup (HER2, EGFR, KRAS G12C, MSI-H, BRCA, PD-L1 and so on, or &ldquo;all comers&rdquo;). NCCN and ESMO-MCBS chips come from the row&rsquo;s guideline mapping; the evidence score is the best <Link href="/evidence/" className="underline">evidence strength</Link> among the linked products and trials. Pairings of type &ldquo;sequence&rdquo; and &ldquo;caution&rdquo; that touch the cancer or its products are listed beneath the table.</p>
        </section>
      </Container>
    </>
  );
}
