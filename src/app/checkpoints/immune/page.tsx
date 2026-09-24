import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { CHECKPOINT_HUB, hubSummary, hubView } from "@/lib/checkpoints";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckpointGlyph } from "@/components/CheckpointGlyph";
import { CheckpointTable } from "@/components/CheckpointTable";
import { ImmuneSynapse, type SynapseNode } from "@/components/ImmuneSynapse";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

const HUB = CHECKPOINT_HUB.immune;
export const metadata: Metadata = pageMeta({
  title: "Immune checkpoints",
  description: "Every immune checkpoint drawn on the synapse and tabled by class: inhibitory receptors, their ligands, don't eat me pairs, co-stimulatory agonist targets, metabolic and soluble brakes, with where each is expressed, its partner, the drugs against it and the approvals by cancer.",
  path: HUB.route,
});

const num = (n: number) => n.toLocaleString("en-GB");

export default function ImmuneCheckpointsPage() {
  const view = hubView("immune");
  const s = hubSummary("immune");
  const nodes: SynapseNode[] = view.rows.map((r) => ({
    id: r.member.id, label: r.member.label, side: r.member.side, tone: r.cls.tone, classId: r.cls.id, className: r.cls.name,
    approved: r.best?.status === "approved" || r.best?.status === "standard-of-care", bestStatus: r.best?.status, bestDrug: r.best?.drug.name,
    expressedOn: r.member.expressedOn.text, partners: r.partners.map((p) => p.id), targetRoute: `/targets/${r.target.id}/`, rowRoute: `#${r.member.id}`, drugCount: r.drugs.length,
  }));
  const classes = view.classes.map(({ cls }) => ({ id: cls.id, name: cls.name, tone: cls.tone, anchor: `#${cls.id}` }));
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Checkpoint families", href: "/checkpoints/" }, { label: HUB.title, href: HUB.route }]} />
      <PageHeader
        kicker={<GroupKicker id="map"><Link href="/checkpoints/" className="kicker hover:text-foreground">· Checkpoint families</Link></GroupKicker>}
        title={HUB.title}
        lede="The brakes and accelerators on immune cells, drawn where they sit: receptors on the T cell, NK cell and macrophage, their ligands on the tumour cell or antigen-presenting cell, and the enzymes and secreted signals in between. Pink means an approved drug exists against it."
        logo={<span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent"><CheckpointGlyph id="immune" className="h-8 w-8" /></span>}
      />
      <Container className="pb-20">
        <div className="flex flex-wrap gap-2 text-sm mb-6">
          <span className="chip border border-border bg-card">{num(s.members)} members</span>
          <span className="chip border border-border bg-card">{num(s.classes)} classes</span>
          <span className="chip border-accent/40 bg-accent-soft text-accent border">{num(s.approved)} with an approved drug</span>
          <span className="chip border border-border bg-card">{num(s.drugs)} products</span>
          <a href={`${HUB.route}data.json`} className="chip border border-border bg-card hover:bg-foreground/5" type="application/json">JSON</a>
          <Link href={CHECKPOINT_HUB["cell-cycle"].route} className="chip border border-border bg-card hover:bg-foreground/5 inline-flex items-center gap-1.5"><CheckpointGlyph id="cell-cycle" className="h-3.5 w-3.5 text-accent" />The other meaning: cell-cycle checkpoints</Link>
        </div>
        <section id="synapse" className="card p-4 sm:p-6 scroll-mt-28">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
            <h2 className="text-lg font-semibold tracking-tight">The synapse</h2>
            <p className="text-xs text-muted">Hover or focus a node for where it is expressed and its best drug; click for its row. Lines join partners.</p>
          </div>
          <ImmuneSynapse nodes={nodes} classes={classes} />
        </section>
        <nav aria-label="Classes" className="mt-8 mb-6 flex flex-wrap gap-1.5 text-sm">
          <span className="kicker mr-1">Classes</span>
          {view.classes.map(({ cls, rows }) => <a key={cls.id} href={`#${cls.id}`} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5"><CheckpointGlyph id={cls.tone} className="h-3.5 w-3.5 text-accent" /><span>{cls.name}</span><span className="text-muted tabular-nums">{rows.length}</span></a>)}
        </nav>
        <CheckpointTable view={view} />
        <p className="mt-10 text-xs text-muted max-w-3xl leading-relaxed">
          Sources. Identifiers from the HGNC REST API; expression from the UniProt tissue-specificity or function comment for the accession named on each row, or from the review cited; drug statuses from the drug records linked (each carries its own approvals and sources); phases for agents without a record here, and every stopped programme, from the ClinicalTrials.gov study cited, quoting the reason the registry gives. Where nothing was found the row says so. Taxonomy in <code>src/data/checkpoint-map.ts</code>.
        </p>
      </Container>
    </>
  );
}
