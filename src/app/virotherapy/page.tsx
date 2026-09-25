import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";
import { GentleSection } from "@/components/GentleSection";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import {
  caseEthics, caseFindings, caseLimits, caseProtocol, combination, failures, milestones, moves,
  openProblems, products, whySelective, type OvSource,
} from "@/data/virotherapy";

export const metadata: Metadata = pageMeta({
  title: "Oncolytic virotherapy",
  description: "Why a virus kills a cancer cell and not its neighbour, the hundred-year history, every approved virus product with what its evidence actually shows, the engineering, the randomised failures, the combination question, and the 2024 case of a virologist who treated her own breast cancer.",
  path: "/virotherapy/",
});

/** Source links under a block, separated by middots. */
function Sources({ items, className = "" }: { items: OvSource[]; className?: string }) {
  if (!items.length) return null;
  return (
    <div className={`text-xs text-muted ${className}`}>
      {items.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a className="underline" href={s.url} rel="noopener">{s.label}</a></span>)}
    </div>
  );
}

const REACH_LABEL: Record<string, string> = {
  local: "Local response only",
  "systemic signal": "Uninjected lesions responded",
  "survival benefit": "Randomised survival benefit",
  "not shown": "Single arm, no comparison",
};

const PRODUCT_COLUMNS: StaticColumn[] = [
  { key: "product", label: "Product", className: "min-w-[170px]" },
  { key: "virus", label: "Virus", filterable: true, className: "text-muted" },
  { key: "replicates", label: "Replicates in the tumour", filterable: true, order: ["Oncolytic, replicates", "Gene delivery, does not replicate"] },
  { key: "route", label: "How it is given", className: "text-muted max-w-xs" },
  { key: "approval", label: "Approval", className: "max-w-xs" },
  { key: "evidence", label: "Evidence", className: "text-muted max-w-sm" },
  { key: "achieves", label: "What it achieves", className: "max-w-sm" },
  { key: "reach", label: "Reach of the effect", filterable: true, order: ["Local response only", "Uninjected lesions responded", "Randomised survival benefit", "Single arm, no comparison"] },
];

const MOVE_COLUMNS: StaticColumn[] = [
  { key: "move", label: "The move", className: "min-w-[200px]" },
  { key: "kind", label: "Kind", filterable: true, order: ["deletion", "insertion", "targeting", "delivery"], className: "capitalize" },
  { key: "what", label: "What is changed", className: "text-muted max-w-sm" },
  { key: "why", label: "Why it works", className: "max-w-lg" },
  { key: "examples", label: "Where it is used", className: "text-muted max-w-xs" },
];

export default function VirotherapyPage() {
  const g = graph();
  const route = (id: string) => { const e = g.get(id); return e ? routeFor(e) : undefined; };
  const name = (id: string) => g.get(id)?.name ?? id;

  const productRows: StaticRow[] = products.map((p) => ({
    id: p.id,
    product: { text: p.name, href: route(p.id), strong: true, sub: [p.code, p.brand].filter(Boolean).join(", ") || undefined },
    virus: p.virus,
    replicates: p.replicates ? "Oncolytic, replicates" : "Gene delivery, does not replicate",
    route: p.route,
    approval: p.approval,
    evidence: p.evidence,
    achieves: p.achieves,
    reach: REACH_LABEL[p.reach],
  }));

  const moveRows: StaticRow[] = moves.map((m) => ({
    id: m.id,
    move: { text: m.move, strong: true },
    kind: m.kind,
    what: m.what,
    why: m.why,
    examples: m.examples,
  }));

  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Oncolytic virotherapy"
        lede="Some viruses kill cancer cells and leave their neighbours alone, because a cell that broke its own virus alarm on the way to becoming a cancer cannot switch it back on. Four such viruses have an approval somewhere in the world. Not one of them has shown a survival benefit in a randomised trial. This page is the biology, the hundred-year history, every approved product with what its evidence really shows, the engineering, the programmes that failed and why, and the 2024 case of a virologist who injected her own tumour." />
      <Container className="pb-16">

        {/* ---------------------------------------------------------------- Why */}
        <section id="why" className="scroll-mt-20">
          <h2 className="text-xl font-semibold mb-3">Why a virus kills a cancer cell and not its neighbour</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3 max-w-prose">
              {whySelective.plain.map((para, i) => <p key={i} className="text-[15px] leading-relaxed">{para}</p>)}
            </div>
            <div className="card p-5">
              <div className="kicker mb-2">The mechanism, properly</div>
              <ul className="space-y-3 text-sm text-muted">
                {whySelective.mechanism.map((para, i) => <li key={i}>{para}</li>)}
              </ul>
              <Sources items={whySelective.sources} className="mt-4" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- History */}
        <section id="history" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">The history is older than most readers think</h2>
          <p className="text-sm text-muted mb-5 max-w-3xl">Tumours were seen shrinking during ordinary virus infections before anyone could grow a virus. The field was tried, abandoned, and restarted twice. Nothing in it is new except the ability to design the virus rather than hunt for one.</p>
          <ol className="relative border-l border-border ml-3 space-y-6">
            {milestones.map((m) => (
              <li key={m.year + m.what} className="pl-5">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
                <div className="text-xs font-medium text-muted tabular-nums">{m.year}</div>
                <div className="font-medium mt-0.5">{m.what}</div>
                <p className="text-sm text-muted mt-1 max-w-3xl">{m.detail}</p>
                <RefChips ids={m.refs} className="mt-2" />
                <Sources items={m.sources} className="mt-1.5" />
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------------- Products */}
        <section id="products" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">The approved products, and what their evidence actually shows</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">
            Two distinctions decide how to read this table. The first is whether the virus replicates in the tumour at all: nadofaragene firadenovec and aglatimagene besadenovec are replication-defective vectors that deliver a gene, and are routinely counted as oncolytic virus successes. The second is whether the trial measured a response in the treated lesion or a survival benefit. Every replicating oncolytic virus in the table was approved on a response endpoint. The only randomised survival result belongs to a product that does not replicate.
          </p>
          <StaticTable rows={productRows} columns={PRODUCT_COLUMNS} noun="products" url  />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="card p-3" id={`src-${p.id}`}>
                <div className="text-sm font-medium">{p.name}</div>
                <p className="text-xs text-muted mt-1">{p.engineering}</p>
                <RefChips ids={p.refs} className="mt-2" />
                <Sources items={p.sources} className="mt-1.5" />
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- Engineering */}
        <section id="engineering" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">The engineering</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">This is the part that makes oncolytic virotherapy a technology rather than an anecdote. Selectivity is built by removing a viral gene whose job a tumour cell already does, or by putting replication behind a promoter only a tumour fires. Potency is built by inserting something that turns lysis into an immunisation. Then there is the part nobody has solved, which is getting the virus there and keeping antibody off it.</p>
          <StaticTable rows={moveRows} columns={MOVE_COLUMNS} noun="engineering moves" url />
        </section>

        {/* ---------------------------------------------------------------- Failures */}
        <section id="failures" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">Why it has not worked more widely</h2>
          <p className="text-sm text-muted mb-5 max-w-3xl">Five programmes, each tested at a scale that should have settled the question, and what each one taught. A field is best judged by what it did when it was given a fair test.</p>
          <div className="grid gap-4 lg:grid-cols-2">
            {failures.map((f) => (
              <div key={f.id} id={f.id} className="card p-5">
                <div className="font-medium">{f.programme}</div>
                <div className="text-xs text-muted mt-0.5">{f.virus}</div>
                <dl className="mt-3 text-sm space-y-2">
                  <div><dt className="kicker">Setting</dt><dd className="text-muted">{f.setting}</dd></div>
                  <div><dt className="kicker">Design</dt><dd className="text-muted">{f.design}</dd></div>
                  <div><dt className="kicker">Outcome</dt><dd>{f.outcome}</dd></div>
                  <div><dt className="kicker">Lesson</dt><dd className="text-muted">{f.lesson}</dd></div>
                </dl>
                <RefChips ids={f.refs} className="mt-3" />
                <Sources items={f.sources} className="mt-1.5" />
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- Combination */}
        <section id="combination" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">The combination question</h2>
          <p className="text-[15px] leading-relaxed max-w-3xl">{combination.rationale}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {combination.evidence.map((e) => (
              <div key={e.label} className="card p-4">
                <div className="text-sm font-medium">{e.label}</div>
                <p className="text-sm text-muted mt-1">{e.finding}</p>
                <Sources items={[e.source]} className="mt-2" />
              </div>
            ))}
          </div>
          <div className="card p-5 mt-4 max-w-3xl">
            <div className="kicker mb-1.5">What the randomised evidence shows</div>
            <p className="text-sm">{combination.verdict}</p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- The self-experiment */}
        <section id="self-experiment" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">The 2024 case: a virologist who treated her own breast cancer</h2>
          <div className="card p-5 mt-3 max-w-3xl border-l-4">
            <div className="kicker mb-1.5">Read this first</div>
            <p className="text-sm">
              This is one person, and it is a case report. It is not evidence that oncolytic virotherapy works, and it is not evidence that anyone should treat themselves. The authors say so in the paper: self-medicating with oncolytic viruses should not be the first approach to a diagnosed cancer. The patient was a professional virologist who grew and titred the viruses in her own laboratory and had oncologists monitoring her and ready to intervene. If you are facing a cancer diagnosis, the useful thing in this section is the argument for testing virotherapy before surgery in a trial, not the protocol.
            </p>
          </div>

          <p className="text-[15px] leading-relaxed mt-5 max-w-3xl">
            A 50-year-old virologist had been treated for multifocal invasive ductal triple-negative breast cancer in 2016 with mastectomy and adjuvant chemotherapy. A local recurrence was excised in 2018, leaving a small seroma that was monitored. By 2020 that had become a hard, inflamed 2 cm nodule invading the pectoral muscle and infiltrating the skin. Rather than a second round of chemotherapy she told her oncologists she would first inject the tumour with viruses of the kind then in clinical development, and they agreed to monitor her and to intervene with conventional treatment if she came to harm or the tumour grew.
          </p>

          <h3 className="text-base font-semibold mt-7 mb-3">The protocol</h3>
          <ol className="relative border-l border-border ml-3 space-y-5">
            {caseProtocol.map((s) => (
              <li key={s.when + s.what} className="pl-5">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
                <div className="text-xs font-medium text-muted">{s.when}</div>
                <div className="font-medium mt-0.5">{s.what}</div>
                <p className="text-sm text-muted mt-1 max-w-3xl">{s.detail}</p>
              </li>
            ))}
          </ol>

          <div className="grid gap-4 lg:grid-cols-2 mt-7">
            <div className="card p-5">
              <div className="kicker mb-2">What was found</div>
              <ul className="text-sm space-y-2 list-disc pl-4">{caseFindings.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </div>
            <div className="card p-5">
              <div className="kicker mb-2">What this case cannot tell you</div>
              <ul className="text-sm text-muted space-y-2 list-disc pl-4">{caseLimits.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </div>
          </div>

          <h3 className="text-base font-semibold mt-8 mb-3">The ethics, honestly</h3>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="card p-5">
              <div className="kicker mb-2">What the authors said</div>
              <ul className="text-sm space-y-2">{caseEthics.authors.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="card p-5">
              <div className="kicker mb-2">What the journal said</div>
              <ul className="text-sm space-y-2">{caseEthics.journal.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="card p-5">
              <div className="kicker mb-2">What the ethicists said</div>
              <ul className="text-sm space-y-2">{caseEthics.ethicists.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          </div>
          <Sources items={caseEthics.sources} className="mt-3" />
          <RefChips ids={["beata-halassy", "dubravko-forcic", "paper-halassy-self-experiment-ovt-vaccines-2024", "paper-pugh-self-experimentation-publication-jme-2026"]} className="mt-3" />

          <GentleSection className="mt-6" title="the design choices that make this case worth reading" why="Three things the protocol did deliberately, each of which is a live question in the field.">
            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div className="card p-4"><div className="font-medium mb-1">Two viruses in sequence</div><p className="text-muted">Antibody titres rose a hundredfold during the course. Switching from measles virus to vesicular stomatitis virus after three weeks put a virus in front of an immune system that had not yet learned it. Sequential virotherapy has been proposed and shown in preclinical models and is not part of any approved regimen.</p></div>
              <div className="card p-4"><div className="font-medium mb-1">Frequent dosing</div><p className="text-muted">Ten injections in under seven weeks, to hold the concentration of infectious virus in the tumour high rather than to give a dose and wait. Approved regimens dose every two or three weeks.</p></div>
              <div className="card p-4"><div className="font-medium mb-1">Before surgery, not after everything else</div><p className="text-muted">Oncolytic viruses are normally tested last, in people with widely metastatic disease and exhausted immune systems. The preclinical case for testing them first, in the window between diagnosis and surgery, was published in 2018 and this case is consistent with it. That is the hypothesis a trial should test.</p></div>
            </div>
          </GentleSection>
        </section>

        {/* ---------------------------------------------------------------- Open problems */}
        <section id="open-problems" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">What is actually in the way</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">Four of these six were named by the field itself in 2012 and none has been solved.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {openProblems.map((o) => (
              <div key={o.id} id={o.id} className="card p-5">
                <div className="font-medium">{o.title}</div>
                <p className="text-sm text-muted mt-1.5">{o.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- People and records */}
        <section id="people" className="mt-14 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-1">The people</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">Records for the scientists whose work this page rests on. Public professional information only.</p>
          <div className="flex flex-wrap gap-2">
            {["robert-martuza", "john-bell", "stephen-russell", "tomoki-todo", "beata-halassy", "dubravko-forcic", "howard-kaufman", "evanthia-galanis", "frank-mccormick", "timothy-cloughesy"].map((id) => {
              const href = route(id);
              return href ? <Link key={id} href={href} className="chip border border-border bg-card hover:shadow-sm">{name(id)}</Link> : null;
            })}
          </div>
          <p className="text-sm text-muted mt-6 max-w-3xl">
            Every claim on this page is sourced to the paper linked beside it. The full set of records, with the numbers, the caveats and what each paper does and does not show, sits on the{" "}
            <Link className="underline" href="/technologies/oncolytic-virus/">oncolytic viruses technology page</Link>{" "}and under{" "}
            <Link className="underline" href="/key-papers/">key papers</Link>.
          </p>
        </section>

      </Container>
    </>
  );
}
