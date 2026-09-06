import type { Metadata } from "next";
import { resistance } from "@/data/resistance";
import { Container, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";

export const metadata: Metadata = { title: "Resistance atlas", description: "For each drug class, how tumours escape and which drugs and strategies close the route." };

export default function ResistancePage() {
  return (
    <>
      <PageHeader kicker={<span className="kicker">Pipeline</span>} title="Resistance mechanism atlas"
        lede="Every cancer drug eventually meets resistance. For each major class, the known escape routes, how often they occur where that is known, and the countermeasures, linked to the products, targets, and ideas in the map." />
      <Container className="pb-16">
        <nav className="flex flex-wrap gap-1.5 mb-8 text-sm">
          {resistance.map((r) => <a key={r.id} href={`#${r.id}`} className="chip border bg-card border-border hover:bg-foreground/5">{r.drugClass.split(" (")[0]}</a>)}
        </nav>
        <div className="space-y-6">
          {resistance.map((r) => (
            <details key={r.id} id={r.id} className="card p-5 group" open>
              <summary className="cursor-pointer list-none">
                <h2 className="text-lg font-semibold inline">{r.drugClass}</h2>
                <p className="text-sm text-muted mt-1">{r.tldr}</p>
                <RefChips ids={r.exemplars} className="mt-2" />
              </summary>
              <div className="mt-5 space-y-4">
                {r.mechanisms.map((m, i) => (
                  <div key={i} className="grid gap-3 md:grid-cols-[1fr_1fr] border-t border-border pt-4">
                    <div>
                      <div className="font-medium">{m.name}{m.frequency && <span className="text-muted font-normal text-sm"> · {m.frequency}</span>}</div>
                      <p className="text-sm text-muted mt-1">{m.how}</p>
                      <RefChips ids={m.refs} className="mt-2" />
                    </div>
                    <div>
                      <div className="kicker mb-1">Countermeasures</div>
                      <ul className="space-y-2">
                        {m.countermeasures.map((c, k) => (
                          <li key={k} className="text-sm">
                            <div>{c.text}</div>
                            <RefChips ids={c.refs} className="mt-1" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-muted pt-2">Sources: {r.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a className="underline" href={s.url} rel="noopener">{s.label}</a></span>)}</div>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </>
  );
}
