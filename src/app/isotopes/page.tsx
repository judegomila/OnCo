import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { isotopes } from "@/data/isotopes";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";
import { statusClass } from "@/lib/text";

export const metadata: Metadata = pageMeta({ title: "Isotope supply tracker", description: "The radionuclides behind oncology imaging and radioligand therapy: half-lives, emissions, production routes, suppliers, and supply status.", path: "/isotopes/" });

const TONE: Record<string, string> = { adequate: "approved", tight: "phase-2", constrained: "negative", emerging: "phase-1" };

export default function IsotopesPage() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Isotope supply tracker"
        lede="Radiopharmaceuticals are only as available as their isotopes. Actinium-225 gates the entire alpha-therapy pipeline; lutetium-177 supply dictated Pluvicto's launch. This page tracks each medical radionuclide, how it is made, who makes it, and how tight supply is." />
      <Container className="pb-16">
        <div className="flex flex-wrap gap-2 text-xs mb-6">{Object.entries(TONE).map(([k, v]) => <span key={k} className={`chip ${statusClass(v)}`}>{k}</span>)}</div>
        <div className="grid gap-4 md:grid-cols-2">
          {isotopes.map((iso) => (
            <div key={iso.id} id={iso.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div><div className="text-2xl font-semibold">{iso.symbol} <span className="text-base font-normal text-muted">{iso.name}</span></div><div className="text-xs text-muted mt-0.5">t½ {iso.halfLife} · {iso.use}</div></div>
                <span className={`chip ${statusClass(TONE[iso.supply])}`}>{iso.supply}</span>
              </div>
              <dl className="mt-3 text-sm space-y-2">
                <div><dt className="kicker">Emission</dt><dd>{iso.emission}</dd></div>
                <div><dt className="kicker">Production</dt><dd className="text-muted">{iso.production}</dd></div>
                <div><dt className="kicker">Suppliers</dt><dd className="text-muted">{iso.supplierText}</dd><RefChips ids={iso.supplierIds} className="mt-1" /></div>
                <div><dt className="kicker">Supply</dt><dd className="text-muted">{iso.supplyNote}</dd></div>
              </dl>
              <RefChips ids={iso.refs} className="mt-3" />
              <div className="text-xs text-muted mt-3">{iso.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a className="underline" href={s.url} rel="noopener">{s.label}</a></span>)}</div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
