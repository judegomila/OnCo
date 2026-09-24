import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { routeFor } from "@/lib/kinds";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { CHECKPOINT_HUB, hubSummary, hubView } from "@/lib/checkpoints";
import type { Gate } from "@/data/checkpoint-map";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckpointGlyph } from "@/components/CheckpointGlyph";
import { CheckpointTable } from "@/components/CheckpointTable";
import { CellCycleRing, type RingNode } from "@/components/CellCycleRing";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

const HUB = CHECKPOINT_HUB["cell-cycle"];
export const metadata: Metadata = pageMeta({
  title: "Cell-cycle and DNA-damage checkpoints",
  description: "The gates inside every dividing cell drawn as a ring: G1/S (CDK4/6, cyclin D, RB, p16), G2/M (ATR, CHK1, WEE1, PLK1), the DNA-damage response (ATM, CHK2, p53, PARP) and the spindle assembly checkpoint (Aurora A and B, MPS1, BUB1), each with its drugs and their status.",
  path: HUB.route,
});

const num = (n: number) => n.toLocaleString("en-GB");
const GATES: Array<{ id: Gate; title: string }> = [{ id: "G1/S", title: "G1/S gate" }, { id: "G2/M", title: "G2/M gate" }, { id: "DDR", title: "DNA-damage response" }, { id: "SAC", title: "Spindle assembly checkpoint" }];

export default function CellCycleCheckpointsPage() {
  const view = hubView("cell-cycle");
  const s = hubSummary("cell-cycle");
  const nodes: RingNode[] = view.rows.map((r) => ({
    id: r.member.id, label: r.member.label, gates: r.member.gates ?? [], classId: r.cls.id, className: r.cls.name,
    approved: r.best?.status === "approved" || r.best?.status === "standard-of-care", bestStatus: r.best?.status, bestDrug: r.best?.drug.name,
    actsWhere: r.member.expressedOn.text, drugs: r.drugs.map((d) => d.drug.name), targetRoute: `/targets/${r.target.id}/`, rowRoute: `#${r.member.id}`,
  }));
  // Drugs at each gate: every product of the members guarding it, strongest status first, each once.
  const atGate = GATES.map((g) => {
    const seen = new Set<string>();
    // The map's own classified drugs; graph-derived extras only stand in for members the map left without one.
    const drugs = view.rows.filter((r) => r.member.gates?.includes(g.id)).flatMap((r) => r.drugs.filter((d) => !d.derived || r.member.drugs.length === 0).map((d) => ({ ...d, member: r.member.label }))).filter((d) => { if (seen.has(d.drug.id)) return false; seen.add(d.drug.id); return true; });
    const rank: Record<string, number> = { approved: 0, "phase-3": 1, "phase-2": 2, "phase-1": 3 };
    drugs.sort((a, b) => (rank[a.drug.status ?? ""] ?? 9) - (rank[b.drug.status ?? ""] ?? 9) || a.drug.name.localeCompare(b.drug.name));
    return { ...g, drugs, members: view.rows.filter((r) => r.member.gates?.includes(g.id)) };
  });
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Checkpoint families", href: "/checkpoints/" }, { label: HUB.title, href: HUB.route }]} />
      <PageHeader
        kicker={<GroupKicker id="map"><Link href="/checkpoints/" className="kicker hover:text-foreground">· Checkpoint families</Link></GroupKicker>}
        title={HUB.title}
        lede="Every dividing cell passes three gates and keeps a damage-response crew behind them. Tumours break the gates to grow and then depend on the ones they have left; the drugs here either hold a gate shut (CDK4/6 inhibitors) or force one open so the cell divides into death (WEE1, ATR, PARP, Aurora and MPS1 inhibitors). Pink means an approved drug exists."
        logo={<span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent"><CheckpointGlyph id="cell-cycle" className="h-8 w-8" /></span>}
      />
      <Container className="pb-20">
        <div className="flex flex-wrap gap-2 text-sm mb-6">
          <span className="chip border border-border bg-card">{num(s.members)} members</span>
          <span className="chip border border-border bg-card">{num(s.classes)} gates</span>
          <span className="chip border-accent/40 bg-accent-soft text-accent border">{num(s.approved)} with an approved drug</span>
          <span className="chip border border-border bg-card">{num(s.drugs)} products</span>
          <a href={`${HUB.route}data.json`} className="chip border border-border bg-card hover:bg-foreground/5" type="application/json">JSON</a>
          <Link href={CHECKPOINT_HUB.immune.route} className="chip border border-border bg-card hover:bg-foreground/5 inline-flex items-center gap-1.5"><CheckpointGlyph id="immune" className="h-3.5 w-3.5 text-accent" />The other meaning: immune checkpoints</Link>
        </div>
        <section id="ring" className="card p-4 sm:p-6 scroll-mt-28">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
            <h2 className="text-lg font-semibold tracking-tight">The cell-cycle ring</h2>
            <p className="text-xs text-muted">Hover or focus a node for where it acts and its drugs; click for its row.</p>
          </div>
          <CellCycleRing nodes={nodes} />
        </section>
        <section id="gates" className="mt-8 grid gap-4 md:grid-cols-2 scroll-mt-28">
          {atGate.map((g) => (
            <div key={g.id} className="card p-4">
              <div className="flex items-center gap-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent"><CheckpointGlyph id="gate" className="h-4 w-4" /></span><h3 className="font-semibold">{g.title}</h3><span className="text-xs text-muted">{g.members.map((m) => m.member.label).join(", ")}</span></div>
              {g.drugs.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.drugs.slice(0, 12).map((d) => (
                    <li key={d.drug.id}><Link href={routeFor(d.drug)} translate="no" className={`chip border notranslate inline-flex items-center gap-1.5 ${statusClass(d.drug.status)}`} title={`${d.member}: ${d.drug.status ? STATUS_LABEL[d.drug.status] ?? d.drug.status : "no status"}`}>{d.drug.name}<span className="text-[10px] opacity-70">{d.drug.status ? STATUS_LABEL[d.drug.status] ?? d.drug.status : ""}</span></Link></li>
                  ))}
                  {g.drugs.length > 12 && <li><a href={`#${g.members[0]?.member.id ?? ""}`} className="chip border border-border bg-card hover:bg-foreground/5" data-more>and {g.drugs.length - 12} more in the rows →</a></li>}
                </ul>
              ) : <p className="mt-3 text-sm text-muted">No product in the corpus acts at this gate; see the rows for agents in trials.</p>}
            </div>
          ))}
        </section>
        <nav aria-label="Classes" className="mt-8 mb-6 flex flex-wrap gap-1.5 text-sm">
          <span className="kicker mr-1">Gates</span>
          {view.classes.map(({ cls, rows }) => <a key={cls.id} href={`#${cls.id}`} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5"><CheckpointGlyph id={cls.tone} className="h-3.5 w-3.5 text-accent" /><span>{cls.name}</span><span className="text-muted tabular-nums">{rows.length}</span></a>)}
        </nav>
        <CheckpointTable view={view} />
        <p className="mt-10 text-xs text-muted max-w-3xl leading-relaxed">
          Sources. Identifiers from the HGNC REST API; where each protein acts from the UniProt function or tissue-specificity comment for the accession named; the p53-loss dependency and the taxane mechanism from the reviews quoted under their gates; drug statuses from the linked drug records; phases for agents without a record, and every stopped programme, from the ClinicalTrials.gov study cited. Taxonomy in <code>src/data/checkpoint-map.ts</code>.
        </p>
      </Container>
    </>
  );
}
