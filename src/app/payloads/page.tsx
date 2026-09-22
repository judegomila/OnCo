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

export const metadata: Metadata = pageMeta({ title: "Payloads and linkers", description: "Every ADC payload and linker: mechanism, bystander capability, efflux susceptibility, typical DAR, toxicities, and the products that use them.", path: "/payloads/" });

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
  { key: "bystander", label: "Bystander", filterable: true },
  { key: "efflux", label: "Efflux substrate", filterable: true, className: "capitalize" },
  { key: "dar", label: "Typical DAR", sortable: true, numeric: false, className: "tabular-nums" },
  { key: "toxicities", label: "Characteristic toxicities", className: "text-muted max-w-xs" },
  { key: "products", label: "Products", className: "min-w-[180px]" },
];

export default function PayloadsPage() {
  const g = graph();
  const classId = (cls: string) => ({ "Topoisomerase-I inhibitor": "topoisomerase-i-payloads", "Tubulin inhibitor": "tubulin-inhibitor-payloads", "DNA crosslinker (PBD dimer)": "pbd-dimer-payloads", "DNA cleaver": "dna-cleaver-payloads", "DNA alkylator": "dna-alkylator-payloads" } as Record<string, string>)[cls] ?? "payload";
  const route = (id: string) => { const e = g.get(id); return e ? routeFor(e) : undefined; };
  const payloadRows: StaticRow[] = payloads.map((p) => ({
    id: p.id,
    payload: { text: p.name, href: route(p.id), strong: true, sub: p.aka },
    class: { text: p.class, href: route(classId(p.class)), muted: true },
    mechanism: { text: p.mechanism, sub: p.note },
    bystander: p.permeable,
    efflux: p.effluxSubstrate,
    dar: p.typicalDar,
    toxicities: p.toxicities,
    products: p.adcs.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e).map((e) => ({ text: e.name, href: routeFor(e), chip: "border border-border bg-card text-xs" })),
  }));
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Payloads and linkers"
        lede="An ADC is three parts. The antibody gets most of the attention, but payload and linker decide bystander killing, cross-resistance, and the side-effect profile. This registry cross-references both to the products in the map." />
      <Container className="pb-16">
        <h2 className="text-xl font-semibold mb-3">Payloads</h2>
        <StaticTable rows={payloadRows} columns={PAYLOAD_COLUMNS} noun="payloads" url />
        <p className="text-xs text-muted mt-2">Mechanisms and toxicities in the table are plain text so the columns can be filtered; hover terms on each payload&apos;s own page.</p>

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
        <p className="text-xs text-muted mt-6 max-w-3xl">Bystander effect requires both a cleavable linker and a membrane-permeable payload. Efflux susceptibility is summarised from published transporter studies and sponsor claims; treat &ldquo;low&rdquo; as a claim until confirmed clinically.</p>
      </Container>
    </>
  );
}
