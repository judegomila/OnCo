import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Calculators } from "./Calculators";

export const metadata: Metadata = pageMeta({ title: "Clinical calculators", description: "Body surface area (Mosteller, Du Bois), Calvert carboplatin dosing, Cockcroft-Gault creatinine clearance, absolute neutrophil count with CTCAE grade, corrected calcium, RECIST 1.1 response, cumulative anthracycline dose and dose banding. Formulas cited, nothing leaves your browser.", path: "/calculators/" });

const TOOLS = [["bsa", "BSA and BSA dose"], ["carboplatin", "Creatinine clearance and Calvert"], ["anc", "Absolute neutrophil count"], ["calcium", "Corrected calcium"], ["recist", "RECIST 1.1"], ["anthracycline", "Cumulative anthracycline"], ["banding", "Dose banding"]];

export default function CalculatorsPage() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Clinical calculators"
        lede="The arithmetic done on phones between patients, without the adverts: body surface area, carboplatin AUC dosing, creatinine clearance, neutrophil count and grade, albumin-corrected calcium, RECIST 1.1 percentage change and category, cumulative anthracycline exposure and dose banding. Every formula is cited; every result has a copy button; nothing you enter leaves the page." />
      <Container className="pb-16">
        <nav aria-label="Calculators" className="mb-5 flex flex-wrap gap-1.5 text-sm">{TOOLS.map(([id, label]) => <a key={id} href={`#${id}`} className="chip border bg-card border-border hover:bg-foreground/5">{label}</a>)}</nav>
        <Calculators />
        <div className="mt-8 card p-5 text-sm max-w-3xl space-y-2">
          <h2 className="font-semibold text-base">Check before you prescribe</h2>
          <p className="text-muted">These tools reproduce published formulas and are tested against worked examples in the repository (<code className="text-xs">src/lib/calculators.test.ts</code>). They do not know the patient: renal and hepatic function, prior toxicity, protocol caps and local dose-banding tables all modify the answer. Confirm doses against the <Link href="/regimens/" className="underline">regimen source</Link> and your institution&rsquo;s protocol. Not medical advice.</p>
        </div>
      </Container>
    </>
  );
}
