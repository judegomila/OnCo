import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { linkers, payloads } from "@/data/payloads";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";
import Link from "next/link";
import { Tip } from "@/components/Tip";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { withTermHovers } from "@/lib/term-hover";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import { ChemicalEvidence } from "@/components/ChemicalEvidence";
import { chemicalEvidenceSummary, readChemicalObservations } from "@/lib/chemical-observations";

export const metadata: Metadata = pageMeta({ title: "Payloads and linkers", description: "The cell-killing drugs carried by antibody-drug conjugates and the linkers that hold them: what each one does, what has been measured on the exact chemical, how many are attached in named products, and the sources.", path: "/payloads/" });

/** Link a registry row to its glossary page with a hover explanation. */
function Obj({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const g = graph();
  const e = g.get(id);
  if (!e) return <>{children}</>;
  return <Tip title={e.name} text={e.tldr} href={routeFor(e)}><Link href={routeFor(e)} className={`hover:underline ${className}`}>{children}</Link></Tip>;
}

const PAYLOAD_COLUMNS: StaticColumn[] = [
  { key: "payload", label: "Payload", className: "min-w-[140px]" },
  { key: "class", label: "Class", filterable: true, className: "text-muted" },
  { key: "mechanism", label: "Mechanism", className: "text-muted max-w-xs" },
  { key: "bystander", label: "Reaching neighbouring cells", className: "text-muted max-w-xs", tip: "Membrane access and bystander killing: whether the released chemical was shown to cross cell membranes, or to affect nearby cells that lack the target, in the experiment named." },
  { key: "efflux", label: "Pumped out by cells", className: "text-muted max-w-xs", tip: "Transporter (efflux) evidence: whether the named chemical was shown to be carried out of cells by a pump such as P-gp or BCRP, or to block one. Being pumped and blocking a pump are different findings." },
  { key: "dar", label: "Drug molecules per antibody", className: "text-muted max-w-xs", tip: "The drug-to-antibody ratio (DAR) reported for a named product or preparation. It describes that product, not the payload in general." },
  { key: "toxicities", label: "Side effects of the named products", className: "text-muted max-w-xs", tip: "Side effects reported for the whole named product. They are not a property of the payload alone: the antibody, the linker and the dose all contribute." },
  { key: "products", label: "Products", className: "min-w-[180px]" },
];

export default function PayloadsPage() {
  const g = graph();
  const classId = (cls: string) => ({ "Topoisomerase-I inhibitor": "topoisomerase-i-payloads", "Tubulin inhibitor": "tubulin-inhibitor-payloads", "DNA crosslinker (PBD dimer)": "pbd-dimer-payloads", "DNA cleaver": "dna-cleaver-payloads", "DNA alkylator": "dna-alkylator-payloads" } as Record<string, string>)[cls] ?? "payload";
  const route = (id: string) => { const e = g.get(id); return e ? routeFor(e) : undefined; };
  const observations = new Map(payloads.map(payload => [payload.id, readChemicalObservations(payload)]));
  const payloadRows: StaticRow[] = payloads.map((p) => ({
    id: p.id,
    payload: { text: p.name, href: route(p.id), strong: true, sub: p.aka },
    class: { text: p.class, href: route(classId(p.class)), muted: true },
    mechanism: { text: p.mechanism, sub: p.note },
    bystander: { text: chemicalEvidenceSummary(observations.get(p.id)!, ["membrane-access", "bystander-killing"]), href: `#chemical-evidence-${p.id}` },
    efflux: { text: chemicalEvidenceSummary(observations.get(p.id)!, ["transporter-substrate", "transporter-inhibition"]), href: `#chemical-evidence-${p.id}` },
    dar: { text: chemicalEvidenceSummary(observations.get(p.id)!, ["conjugate-loading"]), href: `#chemical-evidence-${p.id}` },
    toxicities: p.toxicities,
    products: p.adcs.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e).map((e) => ({ text: e.name, href: routeFor(e), chip: "border border-border bg-card text-xs" })),
  }));
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Payloads and linkers"
        lede="An antibody-drug conjugate is an antibody that carries a cell-killing drug, the payload, joined to it by a linker. This page compares the payloads and linkers in use. The free drug, the form attached to the antibody and the forms the body breaks it into can behave differently, so each measurement names the exact chemical it was made on and how it was tested." />
      <Container className="pb-16">
        <h2 className="text-xl font-semibold mb-3">Payloads</h2>
        <StaticTable rows={payloadRows} columns={PAYLOAD_COLUMNS} noun="payloads" url />
        <p className="text-xs text-muted mt-2 max-w-3xl">These are selected examples, not every payload. Each entry in the table links to the measurement behind it, with its method, its limits and its source. &ldquo;Not recorded here&rdquo; marks a gap in OnCo&apos;s records: no sourced measurement has been added yet. It does not mean the answer is no.</p>
        <h2 className="text-xl font-semibold mt-8 mb-3">The measurements behind the table</h2>
        {payloads.map(payload => <ChemicalEvidence key={payload.id} id={payload.id} name={payload.name} observations={observations.get(payload.id)!} />)}

        <h2 className="text-xl font-semibold mt-12 mb-3">Linkers</h2>
        <div className="overflow-x-auto card">
          <table className="onco">
            <thead><tr><th>Linker</th><th>Type</th><th>Trigger</th><th>Releases</th><th>Products</th></tr></thead>
            <tbody>
              {linkers.map((l) => (
                <tr key={l.id} id={l.id}>
                  <td className="font-medium min-w-[160px]"><Obj id={l.id}>{l.name}</Obj></td>
                  <td className="capitalize"><Obj id="linker">{l.type}</Obj></td>
                  <td className="text-muted max-w-xs">{withTermHovers(l.trigger, { skipId: l.id })}</td>
                  <td className="text-muted max-w-xs">{withTermHovers(l.releases, { skipId: l.id })}{l.note && <div className="text-xs mt-1">{withTermHovers(l.note, { skipId: l.id })}</div>}</td>
                  <td className="min-w-[180px]"><RefChips ids={l.adcs} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-6 max-w-3xl">Whether a conjugate affects neighbouring cells depends on more than the payload: how the drug is released, how much reaches the tissue and how sensitive the nearby cells are all matter. Being pumped out of a cell and blocking the pump are different findings. Where two studies disagree, both are kept with their methods. One laboratory result does not show how a whole family of payloads behaves, or who a treatment suits.</p>
      </Container>
    </>
  );
}
