import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { pathwayView, type PathwayProduct } from "@/lib/pathway-products";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Tip } from "@/components/Tip";

export const metadata: Metadata = pageMeta({ title: "Pathway-to-drug matrix", description: "For every signalling pathway, which nodes have a drug in the corpus, at what phase, and which druggable nodes have none: the inverse of the pathway diagrams.", path: "/pathway-drugs/" });

const ORDER = ["approved", "standard-of-care", "phase-3", "positive", "phase-2", "phase-1", "preclinical", "concept"];
const best = (ps: PathwayProduct[]) => ps.map((p) => ORDER.indexOf(p.status ?? "")).filter((i) => i >= 0).sort((a, b) => a - b)[0];

export default function PathwayDrugsPage() {
  const g = graph();
  const views = g.kind("pathway").map((p) => {
    const v = pathwayView(p);
    const byNode = new Map<string, PathwayProduct[]>();
    for (const pr of v.products) for (const n of pr.nodeIds) byNode.set(n, [...(byNode.get(n) ?? []), pr]);
    const druggable = v.nodes.filter((n) => n.targetId);
    const drugged = druggable.filter((n) => (byNode.get(n.id) ?? []).length > 0);
    const approvedNodes = druggable.filter((n) => (byNode.get(n.id) ?? []).some((x) => x.status === "approved" || x.status === "standard-of-care"));
    return { p, v, byNode, druggable, drugged, undrugged: druggable.filter((n) => !(byNode.get(n.id) ?? []).length), approvedNodes, untargeted: v.nodes.filter((n) => !n.targetId) };
  }).sort((a, b) => b.undrugged.length - a.undrugged.length || b.druggable.length - a.druggable.length || a.p.name.localeCompare(b.p.name));

  const totals = views.reduce((s, x) => ({ nodes: s.nodes + x.v.nodes.length, druggable: s.druggable + x.druggable.length, drugged: s.drugged + x.drugged.length, undrugged: s.undrugged + x.undrugged.length }), { nodes: 0, druggable: 0, drugged: 0, undrugged: 0 });

  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Pathway-to-drug matrix"
        lede={`The pathway diagrams light up per product; this table asks the inverse question. Across ${views.length} pathways and ${totals.nodes} nodes, ${totals.druggable} nodes name a target in the corpus, ${totals.drugged} of those have at least one product and ${totals.undrugged} have none. Pathways are sorted by how many druggable nodes still have no drug, which is where the design opportunities are.`} />
      <Container className="pb-16">
        <div className="card overflow-x-auto mb-8">
          <table className="onco">
            <thead><tr><th>Pathway</th><th className="text-right">Nodes</th><th className="text-right">With a target</th><th className="text-right">With a drug</th><th className="text-right">Approved drug</th><th className="text-right">Undrugged</th><th className="hidden md:table-cell">Undrugged nodes</th></tr></thead>
            <tbody>
              {views.map(({ p, v, druggable, drugged, undrugged, approvedNodes }) => (
                <tr key={p.id}>
                  <td><a href={`#${p.id}`} className="font-medium hover:underline">{p.name}</a></td>
                  <td className="text-right tabular-nums">{v.nodes.length}</td>
                  <td className="text-right tabular-nums">{druggable.length}</td>
                  <td className="text-right tabular-nums">{drugged.length}</td>
                  <td className="text-right tabular-nums">{approvedNodes.length}</td>
                  <td className={`text-right tabular-nums font-semibold ${undrugged.length ? "text-rose-700 dark:text-rose-300" : "text-muted"}`}>{undrugged.length}</td>
                  <td className="hidden md:table-cell text-xs text-muted">{undrugged.map((n) => n.label).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted mb-6">
          <span className="kicker">Legend</span>
          {["approved", "phase-3", "phase-2", "phase-1", "preclinical"].map((s) => <span key={s} className={`chip ${statusClass(s)}`}>{STATUS_LABEL[s]}</span>)}
          <span className="chip border border-dashed border-rose-400 text-rose-700 dark:text-rose-300">Druggable node, no drug</span>
          <span className="chip bg-foreground/5">No target in corpus</span>
        </div>

        <div className="space-y-10">
          {views.map(({ p, v, byNode }) => (
            <section key={p.id} id={p.id} className="scroll-mt-28">
              <header className="mb-3">
                <h2 className="text-xl font-semibold tracking-tight"><Link href={routeFor(p)} className="hover:underline">{p.name}</Link></h2>
                <p className="text-sm text-muted mt-1 max-w-3xl">{p.tldr}</p>
              </header>
              <div className="card overflow-x-auto">
                <table className="onco">
                  <thead><tr><th>Node</th><th>Target</th><th>Products hitting the node</th><th className="hidden lg:table-cell">Best phase</th></tr></thead>
                  <tbody>
                    {[...v.nodes].sort((a, b) => (a.targetId ? 0 : 1) - (b.targetId ? 0 : 1) || ((best(byNode.get(a.id) ?? []) ?? 99) - (best(byNode.get(b.id) ?? []) ?? 99)) || a.label.localeCompare(b.label)).map((n) => {
                      const ps = (byNode.get(n.id) ?? []).slice().sort((a, b) => (ORDER.indexOf(a.status ?? "") + 1 || 99) - (ORDER.indexOf(b.status ?? "") + 1 || 99) || a.name.localeCompare(b.name));
                      const gap = !!n.targetId && ps.length === 0;
                      const b = best(ps);
                      return (
                        <tr key={n.id} className={gap ? "bg-rose-500/[0.04]" : undefined}>
                          <td className="font-medium whitespace-nowrap">{n.label}</td>
                          <td className="whitespace-nowrap">{n.href ? <Link href={n.href} className="hover:underline">{n.targetName}</Link> : <span className="chip bg-foreground/5 text-xs">no target in corpus</span>}</td>
                          <td className="min-w-[260px]">
                            {gap ? <span className="chip border border-dashed border-rose-400 text-rose-700 dark:text-rose-300 text-xs">Druggable node, no drug in corpus</span>
                              : ps.length ? <div className="flex flex-wrap gap-1.5">{ps.map((x) => <Tip key={x.id} title={x.name} text={`${x.modality} · ${STATUS_LABEL[x.status ?? ""] ?? x.status ?? "status unknown"}`} href={x.route}><Link href={x.route} className={`chip ${statusClass(x.status)}`}>{x.name}</Link></Tip>)}</div>
                              : <span className="text-muted/50">—</span>}
                          </td>
                          <td className="hidden lg:table-cell text-muted text-xs">{b !== undefined ? STATUS_LABEL[ORDER[b]] : gap ? "none" : ""}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {p.interventions.length > 0 && <p className="text-xs text-muted mt-2">How drugs attack it, from the pathway page: {p.interventions.join("; ")}.</p>}
            </section>
          ))}
        </div>
        <p className="text-xs text-muted mt-10 max-w-3xl">A node counts as drugged when a product in the corpus lists its target; a druggable node with no drug means no product in OnCo names that target, not that none exists anywhere. Nodes without a target id are pathway components (ligands, complexes, processes) that have no target page yet.</p>
      </Container>
    </>
  );
}
