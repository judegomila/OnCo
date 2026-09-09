import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { KIND_META, routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, GroupKicker, KindChip, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMeta({ title: "Gaps & bounties", description: "Where OnCo is thin: unsourced objects, weakly linked objects, cancers without pipelines, targets without drugs. Claim one and fix it.", path: "/gaps/" });

const FILE_FOR: Partial<Record<Kind, string>> = { drug: "drugs", cancer: "cancers", technology: "technologies", target: "targets", company: "companies", institution: "institutions", pathway: "pathways", term: "terms", trial: "trials", pairing: "pairings", roadmap: "roadmaps", idea: "ideas", collection: "collections", section: "sections" };
const gh = (e: Entity) => `https://github.com/judegomila/OnCo/blob/main/src/data/${FILE_FOR[e.kind]}.ts`;

function Row({ e, why }: { e: Entity; why: string }) {
  return (
    <li className="p-3 flex flex-wrap items-center gap-3">
      <KindChip kind={e.kind} />
      <Link href={routeFor(e)} className="font-medium hover:underline">{e.name}</Link>
      <span className="text-xs text-muted">{why}</span>
      <a className="ml-auto text-xs underline text-muted" href={gh(e)} rel="noopener">edit file</a>
    </li>
  );
}

function Gap({ title, intro, items }: { title: string; intro: string; items: Array<{ e: Entity; why: string }> }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <div className="flex items-baseline justify-between mb-2"><h2 className="text-lg font-semibold">{title}</h2><span className="text-xs text-muted">{items.length}</span></div>
      <p className="text-sm text-muted mb-3 max-w-3xl">{intro}</p>
      <ul className="card divide-y divide-border">{items.map(({ e, why }) => <Row key={e.id} e={e} why={why} />)}</ul>
    </section>
  );
}

export default function Gaps() {
  const g = graph();
  const all = g.entities;
  const noSources = all.filter((e) => e.links.length === 0 && !e.wikipedia && !(e.kind === "trial" && e.nct) && !(e.kind === "collection") && !(e.kind === "company") && !(e.kind === "institution")).map((e) => ({ e, why: "no external link or Wikipedia entry" }));
  const weak = all.filter((e) => e.kind !== "section" && g.degree(e.id) <= 2).map((e) => ({ e, why: `${g.degree(e.id)} connection${g.degree(e.id) === 1 ? "" : "s"}` }));
  const thinCancers = g.kind("cancer").filter((c) => c.standardOfCare.length < 3 || c.pipeline.length === 0 || c.history.length < 3).map((e) => ({ e, why: [e.standardOfCare.length < 3 ? `${e.standardOfCare.length} standard-of-care rows` : null, e.pipeline.length === 0 ? "empty pipeline" : null, e.history.length < 3 ? `${e.history.length} history events` : null].filter(Boolean).join(" · ") }));
  const targetsNoDrugs = g.kind("target").filter((t) => (g.neighbours(t.id).get("drug") ?? []).length === 0).map((e) => ({ e, why: "no product links to this target" }));
  const drugsNoTrials = g.kind("drug").filter((d) => (g.neighbours(d.id).get("trial") ?? []).length === 0 && d.status !== "established").map((e) => ({ e, why: "no trial recorded" }));
  const companiesNoDrugs = g.kind("company").filter((c) => (g.neighbours(c.id).get("drug") ?? []).length === 0).map((e) => ({ e, why: "no product linked" }));
  const shortSummaries = all.filter((e) => e.summary.length < 160).map((e) => ({ e, why: `${e.summary.length}-character summary` }));
  const total = noSources.length + weak.length + thinCancers.length + targetsNoDrugs.length + drugsNoTrials.length + companiesNoDrugs.length + shortSummaries.length;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Gaps and bounties"
        lede={`Where the map is thin, computed from the corpus at build time. ${total} open items across seven checks. Claim one by opening a pull request; the check disappears when the fix lands.`} />
      <Container className="pb-16">
        <div className="card p-4 text-sm text-muted max-w-3xl">
          <div className="kicker mb-1">How to claim</div>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Pick a row. Click <em>edit file</em> to open the data file on GitHub, or fork and edit locally.</li>
            <li>Add the source URL, the missing links (ids of related objects), or the missing rows. Keep the TL;DR plain and the summary technical.</li>
            <li>Run <code>npm test</code> and open a PR. Mention the gap name in the title. Contributors are credited in the changelog.</li>
          </ol>
          <p className="mt-2">Counts by kind: {Object.entries(KIND_META).filter(([k]) => g.kind(k as Kind).length > 0).map(([k, m]) => `${g.kind(k as Kind).length.toLocaleString("en-GB")} ${m.plural}`).join(", ")}.</p>
        </div>
        <Gap title="Cancers with thin pages" intro="Every cancer should have at least three standard-of-care settings, a pipeline, and a history. TNBC is the model." items={thinCancers} />
        <Gap title="Targets with no product" intro="A target with no drug, tracer, or cell therapy linked to it is either a research target (say so in the summary) or a documentation gap." items={targetsNoDrugs} />
        <Gap title="Products with no trial" intro="Approved and late-stage products should link to at least one trial record. Add the trial or link an existing one." items={drugsNoTrials} />
        <Gap title="Companies with no product" intro="Link the company's products, or add them." items={companiesNoDrugs} />
        <Gap title="Objects with no external source" intro="Add a Wikipedia link, a registry record, or a primary source in `links`." items={noSources} />
        <Gap title="Weakly connected objects" intro="Two or fewer connections. Link to cancers, targets, products, trials, or terms so the object participates in the graph." items={weak} />
        <Gap title="Short summaries" intro="Under 160 characters. Expand with mechanism, evidence, and open questions." items={shortSummaries} />
      </Container>
    </>
  );
}
