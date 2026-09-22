import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { StaticTable } from "@/components/filters/StaticTable";
import { PathwaySections } from "@/components/PathwaySections";
import { pageRows, SECTION_PAGE } from "@/lib/static-tables";
import { PATHWAY_COLUMNS, PATHWAY_MATRIX_TABLE, PATHWAY_NODES_TABLE, pathwayDrugViews, pathwayMatrixRows, pathwaySections } from "@/lib/tables/pathway-drugs";

export const metadata: Metadata = pageMeta({ title: "Pathway-to-drug matrix", description: "For every signalling pathway, which nodes have a drug in the corpus, at what phase, and which druggable nodes have none: the inverse of the pathway diagrams.", path: "/pathway-drugs/" });

export default function PathwayDrugsPage() {
  const views = pathwayDrugViews();
  // The matrix and the node sections each carry a first page; the rest is one file each under /api/v1/tables/
  // (scripts/build-tables.ts), fetched when the reader scrolls, presses Show more, filters, or follows a #pathway link.
  const matrix = pageRows(PATHWAY_MATRIX_TABLE, pathwayMatrixRows(views));
  // Ten sections at first: each is a whole node table, and the most undrugged pathways (the largest tables) come first.
  const sections = pageRows(PATHWAY_NODES_TABLE, pathwaySections(views), SECTION_PAGE);
  const totals = views.reduce((s, x) => ({ nodes: s.nodes + x.v.nodes.length, druggable: s.druggable + x.druggable.length, drugged: s.drugged + x.drugged.length, undrugged: s.undrugged + x.undrugged.length }), { nodes: 0, druggable: 0, drugged: 0, undrugged: 0 });

  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Pathway-to-drug matrix"
        lede={`The pathway diagrams light up per product; this table asks the inverse question. Across ${views.length} pathways and ${totals.nodes} nodes, ${totals.druggable} nodes name a target in the corpus, ${totals.drugged} of those have at least one product and ${totals.undrugged} have none. Pathways are sorted by how many druggable nodes still have no drug, which is where the design opportunities are.`} />
      <Container className="pb-16">
        <div className="mb-8"><StaticTable rows={matrix.rows} more={matrix.more} columns={PATHWAY_COLUMNS} noun="pathways" url defaultSort={{ key: "undrugged", dir: -1 }} /></div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted mb-6">
          <span className="kicker">Legend</span>
          {["approved", "phase-3", "phase-2", "phase-1", "preclinical"].map((s) => <Link key={s} href={`/drugs/?status=${s}`} className={`chip ${statusClass(s)} hover:ring-2 hover:ring-accent/30`} title={`All treatments at ${STATUS_LABEL[s]}`}>{STATUS_LABEL[s]}</Link>)}
          <Link href="/gaps/" className="chip border border-dashed border-rose-400 text-rose-700 dark:text-rose-300 hover:ring-2 hover:ring-accent/30" title="Gaps page: what is missing across the corpus">Druggable node, no drug</Link>
          <Link href="/targets/" className="chip bg-foreground/5 hover:ring-2 hover:ring-accent/30" title="All targets in the corpus">No target in corpus</Link>
        </div>

        <PathwaySections sections={sections.rows} more={sections.more} />
        <p className="text-xs text-muted mt-10 max-w-3xl">A node counts as drugged when a product in the corpus lists its target; a druggable node with no drug means no product in OnCo names that target, not that none exists anywhere. Nodes without a target id are pathway components (ligands, complexes, processes) that have no target page yet.</p>
      </Container>
    </>
  );
}
