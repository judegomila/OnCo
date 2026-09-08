import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, PageHeader } from "@/components/ui";
import { ToxicityBrowser, type ToxRow } from "@/components/ToxicityBrowser";

export const metadata: Metadata = { title: "Toxicity compare", description: "Compare adverse-event rates across products of the same modality, from the prescribing information." };

const modalityClass = (m: string) => /bispecific adc/i.test(m) ? "Bispecific ADC" : /^adc/i.test(m) ? "ADC" : /engager|immtac/i.test(m) ? "T-cell engager" : /bispecific/i.test(m) ? "Bispecific antibody" : /monoclonal/i.test(m) ? "Checkpoint / antibody" : /car-t|til|tcr-t/i.test(m) ? "Cell therapy" : /radioligand|alpha|theranostic/i.test(m) ? "Radiopharmaceutical" : /cdk4\/6/i.test(m) ? "CDK4/6 inhibitor" : /parp/i.test(m) ? "PARP inhibitor" : /kras|ras\(on\)/i.test(m) ? "RAS inhibitor" : /kinase/i.test(m) ? "Kinase inhibitor" : /cytotoxic/i.test(m) ? "Chemotherapy" : /oncolytic|vaccine/i.test(m) ? "Immunotherapy (other)" : m;

export default function ToxicityPage() {
  const g = graph();
  const rows: ToxRow[] = g.kind("drug").filter((d) => d.toxicity.length).flatMap((d) => d.toxicity.map((t, i) => ({ id: `${d.id}-${i}`, drugId: d.id, drug: d.name, route: routeFor(d), modality: modalityClass(d.modality), event: t.event, anyGradePct: t.anyGradePct, grade3PlusPct: t.grade3PlusPct, source: t.source, note: t.note })));
  return (
    <>
      <PageHeader kicker={<span className="kicker">Intelligence</span>} title="Toxicity compare" lede="Adverse-event rates side by side across products of the same class. Any-grade and grade 3 or higher, from the US prescribing information where read. Blank means not sourced, not zero. Trial populations differ, so compare with care." />
      <Container className="pb-16"><ToxicityBrowser rows={rows} /></Container>
    </>
  );
}
