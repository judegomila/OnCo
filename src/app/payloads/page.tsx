import type { Metadata } from "next";
import { linkers, payloads } from "@/data/payloads";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";
import Link from "next/link";
import { Tip } from "@/components/Tip";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { withTermHovers } from "@/lib/term-hover";

export const metadata: Metadata = { title: "ADC payload & linker registry", description: "Every ADC payload and linker: mechanism, bystander capability, efflux susceptibility, typical DAR, toxicities, and the products that use them." };

/** Link a registry row to its glossary page with a hover explanation. */
function Obj({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const g = graph();
  const e = g.get(id);
  if (!e) return <>{children}</>;
  return <Tip title={e.name} text={e.tldr} href={routeFor(e)}><Link href={routeFor(e)} className={`hover:underline ${className}`}>{children}</Link></Tip>;
}

export default function PayloadsPage() {
  const classId = (cls: string) => ({ "Topoisomerase-I inhibitor": "topoisomerase-i-payloads", "Tubulin inhibitor": "tubulin-inhibitor-payloads", "DNA crosslinker (PBD dimer)": "pbd-dimer-payloads", "DNA cleaver": "dna-cleaver-payloads", "DNA alkylator": "dna-alkylator-payloads" } as Record<string, string>)[cls] ?? "payload";
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="ADC payload & linker registry"
        lede="An ADC is three parts. The antibody gets most of the attention, but payload and linker decide bystander killing, cross-resistance, and the side-effect profile. This registry cross-references both to the products in the map." />
      <Container className="pb-16">
        <h2 className="text-xl font-semibold mb-3">Payloads</h2>
        <div className="overflow-x-auto card">
          <table className="onco">
            <thead><tr><th>Payload</th><th>Class</th><th>Mechanism</th><th>Bystander</th><th>Efflux substrate</th><th>Typical DAR</th><th>Characteristic toxicities</th><th>Products</th></tr></thead>
            <tbody>
              {payloads.map((p) => (
                <tr key={p.id} id={p.id}>
                  <td className="font-medium min-w-[140px]"><Obj id={p.id}>{p.name}</Obj>{p.aka && <div className="text-xs text-muted font-normal">{p.aka}</div>}</td>
                  <td className="text-muted"><Obj id={classId(p.class)}>{p.class}</Obj></td>
                  <td className="text-muted max-w-xs">{withTermHovers(p.mechanism, { skipId: p.id })}{p.note && <div className="text-xs mt-1">{withTermHovers(p.note, { skipId: p.id })}</div>}</td>
                  <td>{p.permeable ? "Yes" : "No"}</td>
                  <td className="capitalize">{p.effluxSubstrate}</td>
                  <td className="tabular-nums">{p.typicalDar}</td>
                  <td className="text-muted max-w-xs">{withTermHovers(p.toxicities, { skipId: p.id })}</td>
                  <td className="min-w-[180px]"><RefChips ids={p.adcs} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
