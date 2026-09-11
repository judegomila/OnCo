import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader, Section } from "@/components/ui";
import { COST_DRIVERS } from "@/data/cost-levers";
import { ideasCosts } from "@/data/ideas-waves/wave-costs";

export const metadata: Metadata = pageMeta({
  title: "Cutting cancer care costs",
  description: "Solution first: each cost driver (list prices, hospital markups and 340B, biosimilar uptake, oral parity gaps, prior authorisation, financial toxicity, travel, end-of-life intensity, trial access) paired with what is being done, with year and source, and the ideas that could do more, each with who acts, what it costs and how long to evidence.",
  path: "/costs/",
});

const ACTOR_LABEL: Record<string, string> = { research: "Research", clinic: "Clinics", industry: "Industry", regulator: "Regulators", payer: "Payers", policy: "Policy", patients: "Patients", data: "Data", philanthropy: "Philanthropy", engineering: "Engineering" };
const COST_LABEL: Record<string, string> = { small: "small (under $1M)", medium: "medium ($1M to $50M)", large: "large (over $50M)" };
const MATURITY_LABEL: Record<string, string> = { speculative: "Speculative", "preclinical-evidence": "Preclinical evidence", "early-clinical": "Early evidence", "being-tested-at-scale": "Being tested at scale" };
const MATURITY_CLASS: Record<string, string> = {
  speculative: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  "preclinical-evidence": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  "early-clinical": "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200",
  "being-tested-at-scale": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
};

export default function CostsPage() {
  const g = graph();
  const ideas = new Map(ideasCosts.map((x) => [x.id, x]));
  const ideaEntity = (id: string) => g.get(id);
  const bottleneck = (id: string) => g.get(id);
  const proven = ideasCosts.filter((x) => x.maturity === "being-tested-at-scale").length;
  const evidence = COST_DRIVERS.reduce((n, d) => n + d.beingDone.length, 0);

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="live"><span className="kicker">·</span><Link href="/coverage/rankings/" className="kicker hover:underline">Coverage rankings</Link><span className="kicker">·</span><Link href="/assistance/" className="kicker hover:underline">Financial help</Link></GroupKicker>}
        title="Cutting cancer care costs"
        lede={`Cancer care is expensive for reasons that can each be named, and most of them have a fix that is already working somewhere. This page pairs ${COST_DRIVERS.length} cost drivers with ${evidence} things already being done (each with its year and source) and ${ideasCosts.length} ideas that could do more, ${proven} of them already being tested at scale. Every idea says who would have to act, roughly what it costs to try and how long until the first evidence.`}
      />
      <Container className="pb-16">
        <div className="card p-4 text-sm text-muted max-w-3xl border-amber-300/60 dark:border-amber-700/60">
          <div className="kicker mb-1">Read this first</div>
          <p>Savings figures are quoted only as the cited report states them. Lower-dose and shorter-course regimens are listed where a randomised trial found them non-inferior; they are options to raise with the treating team, not instructions. For help with a bill today, start with the <Link className="underline" href="/assistance/">financial help browser</Link> (manufacturer, charity and public programmes by country and product) and the <Link className="underline" href="/coverage/rankings/">plan rankings</Link>.</p>
        </div>

        <nav aria-label="Cost drivers" className="mt-8 flex flex-wrap gap-2">
          {COST_DRIVERS.map((d) => <a key={d.id} href={`#${d.id}`} className="chip border border-border bg-card hover:bg-foreground/5">{d.name}</a>)}
        </nav>

        {COST_DRIVERS.map((d) => (
          <Section key={d.id} id={d.id} title={d.name} aside={<span className="text-sm text-muted">{d.beingDone.length} in progress · {d.ideas.length} ideas</span>}>
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-4">
                <div className="card p-4">
                  <div className="kicker mb-1">Why it costs</div>
                  <p className="text-sm">{d.mechanism}</p>
                  {d.bottlenecks.length > 0 && (
                    <p className="mt-3 text-xs text-muted">Bottleneck: {d.bottlenecks.map((b, i) => { const e = bottleneck(b); return <span key={b}>{i > 0 && ", "}{e ? <Link className="underline" href={routeFor(e)}>{e.name}</Link> : b}</span>; })}</p>
                  )}
                </div>
                <div className="card p-4">
                  <div className="kicker mb-2">What is being done</div>
                  <ul className="space-y-2 text-sm">
                    {d.beingDone.map((f) => (
                      <li key={f.text} className="flex gap-2">
                        <span className="chip bg-foreground/5 tabular-nums shrink-0 h-fit">{f.year}</span>
                        <span>{f.text} <a className="underline text-muted" href={f.source.url} rel="noopener">{f.source.label}</a></span>
                      </li>
                    ))}
                  </ul>
                  {d.links && d.links.length > 0 && <p className="mt-3 text-xs text-muted">Further reading: {d.links.map((l, i) => <span key={l.url}>{i > 0 && " · "}<a className="underline" href={l.url} rel="noopener">{l.label}</a></span>)}.</p>}
                </div>
              </div>
              <div className="space-y-3">
                <div className="kicker">What could be done</div>
                {d.ideas.map((id) => {
                  const x = ideas.get(id);
                  if (!x) return null;
                  const e = ideaEntity(id);
                  return (
                    <article key={id} className="card p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`chip ${MATURITY_CLASS[x.maturity]}`}>{MATURITY_LABEL[x.maturity]}</span>
                        {x.actor && <span className="chip bg-foreground/5">{ACTOR_LABEL[x.actor] ?? x.actor} act</span>}
                        {x.cost && <span className="chip bg-foreground/5">Cost to try: {COST_LABEL[x.cost]}</span>}
                        {x.horizonYears !== undefined && <span className="chip bg-foreground/5">{x.horizonYears} year{x.horizonYears === 1 ? "" : "s"} to evidence</span>}
                      </div>
                      <h3 className="font-semibold leading-snug">{e ? <Link href={routeFor(e)} className="hover:underline">{x.name}</Link> : x.name}</h3>
                      <p className="mt-1 text-sm">{x.tldr}</p>
                      {x.links && x.links.length > 0 && <p className="mt-2 text-xs text-muted">{x.links.map((l, i) => <span key={l.url}>{i > 0 && " · "}<a className="underline" href={l.url} rel="noopener">{l.label}</a></span>)}</p>}
                    </article>
                  );
                })}
              </div>
            </div>
          </Section>
        ))}

        <Section title="All ideas in this wave" aside={<span className="text-sm text-muted">{ideasCosts.length} ideas · sorted by years to evidence</span>}>
          <div className="card results-table overflow-x-auto">
            <table className="onco">
              <thead><tr><th scope="col">Idea</th><th scope="col">Who acts</th><th scope="col">Cost to try</th><th scope="col" className="text-right">Years</th><th scope="col" className="hidden md:table-cell">Evidence so far</th></tr></thead>
              <tbody>
                {[...ideasCosts].sort((a, b) => (a.horizonYears ?? 99) - (b.horizonYears ?? 99) || a.name.localeCompare(b.name)).map((x) => {
                  const e = ideaEntity(x.id);
                  return (
                    <tr key={x.id}>
                      <td>{e ? <Link href={routeFor(e)} className="font-medium hover:underline">{x.name}</Link> : x.name}</td>
                      <td className="text-sm">{x.actor ? ACTOR_LABEL[x.actor] ?? x.actor : ""}</td>
                      <td className="text-sm">{x.cost ? COST_LABEL[x.cost] : ""}</td>
                      <td className="text-right tabular-nums">{x.horizonYears ?? ""}</td>
                      <td className="hidden md:table-cell"><span className={`chip ${MATURITY_CLASS[x.maturity]}`}>{MATURITY_LABEL[x.maturity]}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">Every idea has its own page with hypothesis, rationale, the test that would confirm or kill it, and the bottlenecks it attacks. Vote or argue on the idea page; suggest a new one through the <a className="underline" href="https://github.com/judegomila/OnCo/issues/new?template=suggest-edit.yml&title=idea%3A%20cost%20of%20care" rel="noopener">issue form</a>.</p>
        </Section>
      </Container>
    </>
  );
}
