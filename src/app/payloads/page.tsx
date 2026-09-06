import type { Metadata } from "next";
import { linkers, payloads } from "@/data/payloads";
import { Container, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";

export const metadata: Metadata = { title: "ADC payload & linker registry", description: "Every ADC payload and linker: mechanism, bystander capability, efflux susceptibility, typical DAR, toxicities, and the products that use them." };

export default function PayloadsPage() {
  return (
    <>
      <PageHeader kicker={<span className="kicker">Pipeline</span>} title="ADC payload & linker registry"
        lede="An ADC is three parts. The antibody gets most of the attention, but payload and linker decide bystander killing, cross-resistance, and the side-effect profile. This registry cross-references both to the products in the map." />
      <Container className="pb-16">
        <h2 className="text-xl font-semibold mb-3">Payloads</h2>
        <div className="overflow-x-auto card">
          <table className="onco">
            <thead><tr><th>Payload</th><th>Class</th><th>Mechanism</th><th>Bystander</th><th>Efflux substrate</th><th>Typical DAR</th><th>Characteristic toxicities</th><th>Products</th></tr></thead>
            <tbody>
              {payloads.map((p) => (
                <tr key={p.id} id={p.id}>
                  <td className="font-medium min-w-[140px]">{p.name}{p.aka && <div className="text-xs text-muted">{p.aka}</div>}</td>
                  <td className="text-muted">{p.class}</td>
                  <td className="text-muted max-w-xs">{p.mechanism}{p.note && <div className="text-xs mt-1">{p.note}</div>}</td>
                  <td>{p.permeable ? "Yes" : "No"}</td>
                  <td className="capitalize">{p.effluxSubstrate}</td>
                  <td className="tabular-nums">{p.typicalDar}</td>
                  <td className="text-muted max-w-xs">{p.toxicities}</td>
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
                  <td className="font-medium min-w-[160px]">{l.name}</td>
                  <td className="capitalize">{l.type}</td>
                  <td className="text-muted max-w-xs">{l.trigger}</td>
                  <td className="text-muted max-w-xs">{l.releases}{l.note && <div className="text-xs mt-1">{l.note}</div>}</td>
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
