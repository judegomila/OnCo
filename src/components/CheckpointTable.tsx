import Link from "next/link";
import { routeFor } from "@/lib/kinds";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";
import { DRUG_CLASS_LABEL, memberDrugsRoute, memberTrialsRoute, type HubView, type MemberRow } from "@/lib/checkpoints";
import { CheckpointGlyph, TONE_COLOUR } from "./CheckpointGlyph";
import { DrugChip } from "./DrugChip";
import { Tip } from "./Tip";

const DRUG_CHIPS = 6;
const CANCER_CHIPS = 6;
const num = (n: number) => n.toLocaleString("en-GB");

/** A column heading with a plain-English explanation on hover. */
function Head({ label, tip, className = "" }: { label: string; tip: string; className?: string }) {
  return <Tip title={label} text={tip} inline={false}><span className={`kicker cursor-help underline decoration-dotted underline-offset-2 ${className}`}>{label}</span></Tip>;
}

/** Field label shown on small screens, where the row stacks. */
function Cell({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <div className={`min-w-0 ${className}`}><div className="kicker mb-0.5 lg:hidden">{label}</div>{children}</div>;
}

const GRID = "lg:grid-cols-[minmax(9rem,1.1fr)_minmax(7rem,0.9fr)_minmax(12rem,1.6fr)_minmax(8rem,1fr)_minmax(10rem,1.3fr)_minmax(12rem,1.5fr)]";

function Row({ r, immune }: { r: MemberRow; immune: boolean }) {
  const tone = TONE_COLOUR[r.cls.tone];
  const approvedIds = new Set(r.drugs.filter((d) => d.drug.status === "approved" || d.drug.status === "standard-of-care").map((d) => d.drug.id));
  const shown = r.drugs.slice(0, DRUG_CHIPS);
  const more = r.drugs.length - shown.length;
  const classes = [...new Set(r.drugs.map((d) => d.drugClass))];
  return (
    <li id={r.member.id} className={`grid gap-x-4 gap-y-3 py-4 border-b border-border/70 last:border-0 scroll-mt-32 grid-cols-1 sm:grid-cols-2 ${GRID} ${r.best?.status === "approved" ? "border-l-2 border-l-accent pl-3 -ml-3" : ""}`} data-checkpoint-row>
      <Cell label="Member">
        <div className="flex items-start gap-2">
          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ color: r.best?.status === "approved" ? "#d6336c" : tone.stroke, background: r.best?.status === "approved" ? "#fce7f0" : tone.fill }}><CheckpointGlyph id={r.cls.tone} className="h-3.5 w-3.5" /></span>
          <div className="min-w-0">
            <Link href={routeFor(r.target)} translate="no" className="font-semibold notranslate hover:text-accent">{r.member.label}</Link>
            <div className="text-xs text-muted notranslate" translate="no">{r.member.symbol} · <a className="underline decoration-dotted" href={`https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${r.member.hgnc.split(",")[0].trim()}`} rel="noopener">{r.member.hgnc}</a></div>
            {r.member.gates && <div className="mt-1 flex flex-wrap gap-1">{r.member.gates.map((g) => <span key={g} className="chip bg-foreground/5 text-[11px]">{g}</span>)}</div>}
            <div className="mt-1 flex flex-wrap gap-x-2 text-xs"><a href={`#${r.member.id}`} className="text-muted hover:text-foreground">#</a><Link href={memberDrugsRoute(r)} className="underline decoration-foreground/20 hover:decoration-foreground">products</Link><Link href={memberTrialsRoute(r)} className="underline decoration-foreground/20 hover:decoration-foreground">{num(r.trialCount)} trial{r.trialCount === 1 ? "" : "s"}</Link></div>
          </div>
        </div>
      </Cell>
      <Cell label={immune ? "Partner" : "Works with"}>
        {r.partners.length > 0 ? (
          <div className="flex flex-wrap gap-1">{r.partners.map((p) => <a key={p.id} href={p.route} className="chip border bg-card border-border hover:bg-foreground/5 notranslate" translate="no">{p.label}</a>)}</div>
        ) : r.member.partnerNote ? (
          <Tip title="Partner" text={r.member.partnerNote.text} href={r.member.partnerNote.source.url} linkLabel={`${r.member.partnerNote.source.label} →`} inline={false}><span className="text-sm text-muted cursor-help underline decoration-dotted underline-offset-2">{r.member.partnerNote.text.length > 60 ? `${r.member.partnerNote.text.slice(0, 57)}…` : r.member.partnerNote.text}</span></Tip>
        ) : <span className="text-sm text-muted">Not paired</span>}
      </Cell>
      <Cell label={immune ? "Expressed on" : "Where it acts"}>
        <p className="text-sm leading-snug">{r.member.expressedOn.text} <a className="text-xs text-muted underline decoration-dotted break-words" href={r.member.expressedOn.source.url} rel="noopener">{r.member.expressedOn.source.label}</a></p>
      </Cell>
      <Cell label="Best drug status">
        {r.best ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`chip ${statusClass(r.best.status)}`}>{STATUS_LABEL[r.best.status] ?? r.best.status}</span>
            <Link href={routeFor(r.best.drug)} translate="no" className="text-sm underline decoration-foreground/20 hover:decoration-foreground notranslate">{r.best.drug.name}</Link>
          </div>
        ) : <span className="text-sm text-muted">No product with a status</span>}
        {classes.length > 0 && <div className="mt-1 text-xs text-muted">{classes.map((c) => DRUG_CLASS_LABEL[c]).join(" · ")}</div>}
        {r.member.discontinued?.length ? <details className="mt-1 text-xs"><summary className="cursor-pointer text-muted hover:text-foreground">{r.member.discontinued.length} stopped</summary><ul className="mt-1 space-y-1">{r.member.discontinued.map((d) => <li key={d.source.url}><span className="font-medium">{d.name}:</span> {d.reason} <a className="underline" href={d.source.url} rel="noopener">{d.source.label}</a></li>)}</ul></details> : null}
      </Cell>
      <Cell label="Approvals by cancer">
        {r.approvedCancers.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {r.approvedCancers.slice(0, CANCER_CHIPS).map((c) => <Link key={c.id} href={routeFor(c)} className={`chip border ${KIND_COLOR.cancer}`}>{c.name}</Link>)}
            {r.approvedCancers.length > CANCER_CHIPS && <Link href={routeFor(r.target)} className="chip border border-border bg-card hover:bg-foreground/5" data-more>and {r.approvedCancers.length - CANCER_CHIPS} more →</Link>}
          </div>
        ) : <span className="text-sm text-muted">None</span>}
        {r.approvals.length > 0 && <details className="mt-1 text-xs"><summary className="cursor-pointer text-muted hover:text-foreground">{num(r.approvals.length)} approval{r.approvals.length === 1 ? "" : "s"} by region</summary><ul className="mt-1 space-y-1 max-h-48 overflow-y-auto pr-1">{r.approvals.map((a, i) => <li key={i}><span className="font-medium">{a.region} {a.year}</span>, <Link className="underline notranslate" translate="no" href={routeFor(a.drug)}>{a.drug.name}</Link>: {a.indication}</li>)}</ul></details>}
      </Cell>
      <Cell label="Drugs">
        {shown.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {shown.map((d) => <DrugChip key={d.drug.id} id={d.drug.id} name={d.drug.name} route={routeFor(d.drug)} tldr={`${DRUG_CLASS_LABEL[d.drugClass]}${d.note ? `, ${d.note}` : ""}. ${d.drug.tldr}`} className={approvedIds.has(d.drug.id) ? "border-accent/40 bg-accent-soft text-accent" : KIND_COLOR.drug} />)}
            {more > 0 && <Link href={memberDrugsRoute(r)} className="chip border border-border bg-card hover:bg-foreground/5" data-more>and {more} more →</Link>}
          </div>
        ) : <span className="text-sm text-muted">No product in the corpus</span>}
        {r.member.pipelineNotes?.length ? <ul className="mt-1.5 space-y-1 text-xs text-muted">{r.member.pipelineNotes.map((n) => <li key={n.source.url}>{n.text} <a className="underline" href={n.source.url} rel="noopener">{n.source.label}</a></li>)}</ul> : null}
      </Cell>
    </li>
  );
}

/**
 * The class table of a hub: one section per class with its plain text and cited evidence, then a row per member with
 * the target, its partner, where it is expressed, the best drug status, approvals by cancer and the drugs by class.
 * Rows stack on phones and line up as columns from the lg breakpoint; the same markup serves both.
 */
export function CheckpointTable({ view }: { view: HubView }) {
  const immune = view.root === "immune";
  return (
    <div className="space-y-12">
      {view.classes.map(({ cls, rows }) => (
        <section key={cls.id} id={cls.id} className="scroll-mt-28">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ color: TONE_COLOUR[cls.tone].stroke, background: TONE_COLOUR[cls.tone].fill }}><CheckpointGlyph id={cls.tone} className="h-5 w-5" /></span>
            <div className="min-w-0">
              <a href={`#${cls.id}`} className="kicker hover:text-foreground">{TONE_COLOUR[cls.tone].label} · {num(rows.length)} member{rows.length === 1 ? "" : "s"}</a>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug mt-0.5 text-balance">{cls.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed max-w-3xl">{cls.plain}</p>
              {cls.evidence && <p className="mt-1.5 text-sm text-muted max-w-3xl leading-snug">“{cls.evidence.text}” <a className="underline" href={cls.evidence.source.url} rel="noopener">{cls.evidence.source.label}</a></p>}
            </div>
          </div>
          <ul className="mt-4">
            <li className={`hidden lg:grid gap-x-4 pb-2 border-b border-border ${GRID}`} aria-hidden>
              <Head label="Member" tip="The gene or protein, with its HGNC id; opens the target page. Links below go to its products and trials." />
              <Head label={immune ? "Partner" : "Works with"} tip={immune ? "The molecule on the other cell this one binds; the pair is drawn in the synapse above." : "The checkpoint members it acts on or with at the same gate."} />
              <Head label={immune ? "Expressed on" : "Where it acts"} tip="Which cells carry the protein, from UniProt or the cited review." />
              <Head label="Best drug status" tip="The strongest status among the drugs against it: approved beats phase 3 beats phase 2. Stopped programmes are listed beneath with the registry's reason." />
              <Head label="Approvals by cancer" tip="The cancers named by the approved drugs, and every approval with its region, year and indication." />
              <Head label="Drugs" tip="Products in the corpus that act on the member, by class; pink chips are approved. Agents with no record here are noted with the trial that gives their phase." />
            </li>
            {rows.map((r) => <Row key={r.member.id} r={r} immune={immune} />)}
          </ul>
        </section>
      ))}
    </div>
  );
}
