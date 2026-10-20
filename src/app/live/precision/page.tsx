import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { GRADE_META } from "@/lib/complementary";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import {
  DOMAIN_BLURB, DOMAIN_LABEL, DOMAIN_ORDER, LIMIT_LABEL, OUTCOME_META, PRECISION_ROWS, STEP_STATUS_META, precisionFill,
  type PrecisionRow, type Source,
} from "@/data/precision-matrix";

export const metadata: Metadata = pageMeta({
  title: "How precise cancer care is",
  description: "Test by test, beam by beam, margin by margin and dose by dose: how precise each one is today, with the source's own words, what limits it, the next step and what that step would buy a patient.",
  path: "/live/precision/",
});

type Linked = { id: string; name: string; route: string };

/** A source as a small link, with its verbatim fragment in quotation marks when there is one. */
function Cite({ s }: { s: Source }) {
  return (
    <span className="block mt-1 text-xs text-muted leading-relaxed">
      {s.quote && <span className="italic">&ldquo;{s.quote}&rdquo; </span>}
      <a className="underline break-words" href={s.url} rel="noopener">{s.label}</a>
    </span>
  );
}

function Links({ items }: { items: Linked[] }) {
  if (items.length === 0) return null;
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-1">
      {items.map((l) => <Link key={l.id} href={l.route} className="underline text-sm">{l.name}</Link>)}
    </span>
  );
}

/** One row of the matrix as a card: it reads top to bottom on a phone and as a two-column list on a wide screen. */
function Row({ r, link }: { r: PrecisionRow; link: (id: string) => Linked }) {
  const tech = r.technologyIds.map(link);
  const related = (r.relatedIds ?? []).filter((id) => !r.technologyIds.includes(id)).map(link);
  const stepLinks = (r.nextStep?.relatedIds ?? []).map(link);
  const term = "text-xs font-semibold uppercase tracking-wide text-muted sm:pt-0.5";
  return (
    <article id={r.id} className="card p-4 scroll-mt-20">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug">{r.label}</h3>
        {r.grade && <span className={`chip text-xs ${GRADE_META[r.grade].tone}`} title={GRADE_META[r.grade].blurb}>{GRADE_META[r.grade].label}</span>}
      </header>
      <div className="mt-1"><Links items={tech} /></div>
      {r.oversold && (
        <p className="mt-3 text-sm leading-relaxed rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2"><span className="font-semibold">Sold as more precise than shown: </span>{r.oversold}</p>
      )}
      <dl className="mt-3 grid gap-x-4 gap-y-3 sm:grid-cols-[9rem_1fr] text-sm">
        <dt className={term}>Precision means</dt>
        <dd className="leading-relaxed">{r.metric}</dd>

        <dt className={term}>Today</dt>
        <dd className="leading-relaxed">
          {r.today ? (
            <>
              <span className="font-medium">{r.today.value}</span> <span className="text-muted">({r.today.context})</span>
              <Cite s={r.today.source} />
            </>
          ) : <span className="text-muted">No source found that states a figure. A gap, not a zero.</span>}
        </dd>

        <dt className={term}>What limits it</dt>
        <dd>
          {r.limits.length > 0 ? (
            <ul className="space-y-1.5">
              {r.limits.map((l, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="chip text-[11px] bg-foreground/10 text-muted border border-border mr-1.5">{LIMIT_LABEL[l.kind]}</span>{l.text}
                  {l.source && <Cite s={l.source} />}
                </li>
              ))}
            </ul>
          ) : <span className="text-muted">Not yet written.</span>}
        </dd>

        <dt className={term}>Next step</dt>
        <dd className="leading-relaxed">
          {r.nextStep ? (
            <>
              <span className={`chip text-[11px] mr-1.5 ${STEP_STATUS_META[r.nextStep.status].chip}`}>{STEP_STATUS_META[r.nextStep.status].label}</span>{r.nextStep.text}
              {r.nextStep.source && <Cite s={r.nextStep.source} />}
              {stepLinks.length > 0 && <div className="mt-1"><Links items={stepLinks} /></div>}
            </>
          ) : <span className="text-muted">Not yet written.</span>}
        </dd>

        <dt className={term}>What it would buy</dt>
        <dd className="leading-relaxed">
          {r.buys ? (
            <>
              <span className={`chip text-[11px] mr-1.5 ${OUTCOME_META[r.buys.outcome].chip}`}>{OUTCOME_META[r.buys.outcome].label}</span>{r.buys.text}
              {r.buys.source && <Cite s={r.buys.source} />}
            </>
          ) : <span className="text-muted">Not yet written.</span>}
        </dd>

        {related.length > 0 && (
          <>
            <dt className={term}>Related</dt>
            <dd><Links items={related} /></dd>
          </>
        )}
      </dl>
    </article>
  );
}

export default function PrecisionPage() {
  const g = graph();
  const fill = precisionFill();
  // Every referenced id is resolved at build, as the recovery page does: a row about a record that does not exist fails the build.
  const link = (id: string): Linked => { const e = g.must(id); return { id, name: e.name, route: routeFor(e) }; };
  const roadmap = link("precision-roadmap");
  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
  const empty = DOMAIN_ORDER.filter((d) => fill.byDomain[d] === 0).map((d) => DOMAIN_LABEL[d].toLowerCase());

  const lede = fill.rows === 0
    ? "Every part of cancer care is limited by how precise it is: how little tumour a test can find, how close to it a surgeon can cut, how tightly a beam is aimed, how well a dose fits the person. This page will set them side by side, one row per technology, each with what precision means there, how precise it is today in the source's own words, what limits it, the next step and what that step would buy a patient. No rows have been written yet, so the matrix below is empty rather than filled with guesses."
    : `Every part of cancer care is limited by how precise it is: how little tumour a test can find, how close to it a surgeon can cut, how tightly a beam is aimed, how well a dose fits the person. This page sets them side by side: ${plural(fill.rows, "technology", "technologies")} across ${fill.domainsWithRows} of ${fill.domains} areas of care. ${fill.withToday} of the ${fill.rows} carry a sourced figure for how precise they are today, quoted in the source's own words; the rest say no figure was found rather than guess one. ${fill.established} ${fill.established === 1 ? "next step has" : "next steps have"} been shown to help a patient, and ${fill.notEstablished} ${fill.notEstablished === 1 ? "is" : "are"} named as not established. ${fill.oversold > 0 ? `${plural(fill.oversold, "technology is", "technologies are")} graded as sold beyond the evidence. ` : ""}Use this to know what to ask, not to decide a case.`;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="live" />} title="How precise cancer care is" lede={lede} />
      <Container className="pb-16">
        <nav aria-label="Areas of care" className="mb-8 flex flex-wrap gap-2">
          {DOMAIN_ORDER.map((d) => (
            <a key={d} href={`#${d}`} className="chip text-sm border border-border hover:bg-foreground/5">
              {DOMAIN_LABEL[d]} <span className="text-muted tabular-nums ml-1">{fill.byDomain[d]}</span>
            </a>
          ))}
        </nav>

        <section aria-labelledby="legend" className="mb-10">
          <h2 id="legend" className="text-lg font-semibold tracking-tight mb-1">How to read a row</h2>
          <p className="text-sm text-muted max-w-3xl mb-4 leading-relaxed">Each row says what precision is measured in for that technology, and gives today&apos;s figure only where a source states one, with the setting it came from and a fragment of the source&apos;s own words. The last line says whether the next step has been shown to help a patient, which is a different question from whether it is more precise.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {(Object.keys(OUTCOME_META) as Array<keyof typeof OUTCOME_META>).map((o) => (
              <div key={o} className="card p-3">
                <span className={`chip text-xs ${OUTCOME_META[o].chip}`}>{OUTCOME_META[o].label}</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">{OUTCOME_META[o].blurb}</p>
              </div>
            ))}
          </div>
        </section>

        {DOMAIN_ORDER.map((d) => {
          const rows = PRECISION_ROWS.filter((r) => r.domain === d);
          return (
            <section key={d} id={d} aria-labelledby={`${d}-h`} className="mt-10 scroll-mt-20">
              <h2 id={`${d}-h`} className="text-lg font-semibold tracking-tight">{DOMAIN_LABEL[d]}</h2>
              <p className="text-sm text-muted max-w-3xl mt-1 mb-4 leading-relaxed">{DOMAIN_BLURB[d]}</p>
              {rows.length > 0 ? (
                <div className="grid gap-4">{rows.map((r) => <Row key={r.id} r={r} link={link} />)}</div>
              ) : (
                <p className="card p-4 text-sm text-muted">No rows written yet for this area. It is empty because nothing has been sourced, not because there is nothing to say.</p>
              )}
            </section>
          );
        })}

        <section className="mt-12" aria-labelledby="missing">
          <h2 id="missing" className="text-lg font-semibold tracking-tight mb-1">What is missing, named</h2>
          <ul className="text-sm text-muted max-w-3xl space-y-1.5 leading-relaxed list-disc pl-5">
            <li>{fill.rows === 0 ? "No row has a sourced figure for today yet." : `${fill.rows - fill.withToday} of ${fill.rows} rows have no sourced figure for how precise the technology is today.`}</li>
            {fill.rows > 0 && <li>{fill.rows - fill.withBuys} of {fill.rows} rows do not yet say what the next step would buy a patient, and {fill.rows - fill.withNextStep} have no next step written.</li>}
            {empty.length > 0 && <li>Areas with no rows yet: {empty.join(", ")}.</li>}
            <li>A figure here comes from the cohort or trial named beside it. Machines, laboratories and surgeons differ, so the precision available where you are treated may be better or worse.</li>
          </ul>
        </section>

        <p className="text-xs text-muted mt-10 max-w-3xl">
          Related: <Link className="underline" href={roadmap.route}>the precision roadmap</Link>, which follows each area from where it stands to the next step · <Link className="underline" href="/live/recovery/">what comes back after treatment</Link> · <Link className="underline" href="/live/complementary/">complementary approaches, graded</Link>, the model for the grades used here. OnCo is orientation, not medical advice.
        </p>
      </Container>
    </>
  );
}
