import Link from "next/link";
import type { Cancer, Entity, Roadmap } from "@/lib/schema";
import { KIND_META, routeFor } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { paragraphs, KIND_COLOR, statusClass } from "@/lib/text";
import { Bullets, ChipList, Container, KindChip, PageHeader, Section, StatusChip } from "./ui";
import { Neighbours } from "./Neighbours";
import { PathwayDiagram } from "./PathwayDiagram";
import { rankInstitutions } from "@/lib/ranking";
import { MoleculeViewer, type StructureEntry } from "./MoleculeViewer";
import { Logo } from "./Logo";
import { JsonLd } from "./JsonLd";
import { PrintButton } from "./PrintButton";
import { EmbedSnippet } from "./EmbedSnippet";
import { TrialFinder } from "./TrialFinder";
import { Questions } from "./Questions";
import { ExpertCentres } from "./ExpertCentres";
import { conditionQuery, interventionQuery } from "@/lib/ctgov";
import { TrialCounts } from "./TrialCounts";
import { ReviewBadge } from "./ReviewBadge";
import structureIndex from "../../public/structures/index.json";

const STRUCTURES = structureIndex as Record<string, StructureEntry[]>;

function Refs({ ids }: { ids: string[] }) {
  const g = graph();
  const items = ids.map((id) => g.get(id)).filter((x): x is Entity => !!x);
  return <ChipList items={items} />;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === undefined || children === null || children === "" || (Array.isArray(children) && children.length === 0)) return null;
  return (
    <div>
      <div className="kicker mb-1">{label}</div>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

export function EntityDetail({ e }: { e: Entity }) {
  const g = graph();
  const neighbours = g.neighbours(e.id);
  const meta = KIND_META[e.kind];

  return (
    <>
      <JsonLd e={e} />
      <PageHeader
        kicker={<><Link href={`/${meta.route}/`} className="kicker hover:underline">{meta.plural}</Link><KindChip kind={e.kind} /><StatusChip status={e.status} /></>}
        title={e.name}
        lede={e.tldr}
        logo={"website" in e ? <Logo website={e.website} name={e.name} size={64} /> : "url" in e && e.kind === "collection" ? <Logo website={e.url} name={e.name} size={64} /> : undefined}
        right={
          e.aka.length > 0 ? <div className="text-xs text-muted text-right max-w-xs">aka {e.aka.join(", ")}</div> : undefined
        }
      />
      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <div className="prose-onco text-[15px] leading-relaxed max-w-3xl">
              {paragraphs(e.summary).map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <KindSpecific e={e} />

            {e.notes.length > 0 && <Section title="Notes"><Bullets items={e.notes} /></Section>}

            <Section title="Connected">
              <Neighbours groups={neighbours} />
            </Section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 self-start">
            <ReviewBadge id={e.id} />
            <div className="card p-4 text-sm space-y-3">
              {e.wikipedia && <div><div className="kicker mb-1">Wikipedia</div><a className="underline break-all" href={e.wikipedia} rel="noopener">{decodeURIComponent(e.wikipedia.replace("https://en.wikipedia.org/wiki/", "")).replace(/_/g, " ")}</a></div>}
              {e.links.length > 0 && (
                <div><div className="kicker mb-1">Sources & links</div>
                  <ul className="space-y-1">{e.links.map((l) => <li key={l.url}><a className="underline break-words" href={l.url} rel="noopener">{l.label}</a></li>)}</ul>
                </div>
              )}
              {e.tags.length > 0 && <div><div className="kicker mb-1">Tags</div><div className="flex flex-wrap gap-1">{e.tags.map((t) => <span key={t} className="chip bg-foreground/5">{t}</span>)}</div></div>}
              <div><div className="kicker mb-1">Data</div>
                <a className="underline" href={`/api/v1/entities/${e.id}.json`}>JSON</a>
                <span className="text-muted"> · </span>
                <a className="underline" href={`https://github.com/judegomila/OnCo/blob/main/src/data/${meta.plural === "products" ? "drugs" : meta.plural === "fronts" ? "sections" : meta.plural}.ts`} rel="noopener">Edit on GitHub</a>
                <span className="text-muted"> · </span>
                <PrintButton className="underline" />
              </div>
              <EmbedSnippet id={e.id} name={e.name} />
            </div>
            <QuickLinks e={e} />
          </aside>
        </div>
      </Container>
    </>
  );
}

function QuickLinks({ e }: { e: Entity }) {
  const g = graph();
  const rows: Array<[string, string[]]> = [
    ["Cancers", e.cancers], ["Fronts", e.sections], ["Technologies", e.technologies], ["Targets", e.targets], ["Products", e.drugs], ["Companies", e.companies], ["Institutions", e.institutions], ["Pathways", e.pathways], ["Terms", e.terms], ["Trials", e.trials], ["Related", e.related],
  ];
  const nonEmpty = rows.filter(([, ids]) => ids.length);
  if (!nonEmpty.length) return null;
  return (
    <div className="card p-4 text-sm space-y-3">
      {nonEmpty.map(([label, ids]) => (
        <div key={label}>
          <div className="kicker mb-1">{label}</div>
          <ul className="space-y-0.5">{ids.map((id) => { const x = g.get(id); return x ? <li key={id}><Link className="hover:underline" href={routeFor(x)}>{x.name}</Link></li> : null; })}</ul>
        </div>
      ))}
    </div>
  );
}

function KindSpecific({ e }: { e: Entity }) {
  const g = graph();
  switch (e.kind) {
    case "cancer":
      return <CancerDetail c={e} />;
    case "technology":
      return (
        <>
          <Section title="How it works"><p className="text-[15px] leading-relaxed max-w-3xl">{e.principle}</p></Section>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Strengths"><Bullets items={e.strengths} /></Field>
            <Field label="Limitations"><Bullets items={e.limitations} /></Field>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 mt-6">
            <Field label="Generation">{e.generation}</Field>
            <Field label="Since">{e.since}</Field>
          </div>
        </>
      );
    case "target":
      return (
        <>
          <Section title="Biology"><p className="text-[15px] leading-relaxed max-w-3xl">{e.biology}</p></Section>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Where it is found"><Bullets items={e.whereFound} /></Field>
            <Field label="Class"><span className="capitalize">{e.targetClass.replace("-", " ")}</span>{e.symbol && <span className="text-muted"> · {e.symbol}</span>}</Field>
          </div>
        </>
      );
    case "drug":
      return (
        <>
          {STRUCTURES[e.id] && <div className="mt-8"><MoleculeViewer entries={STRUCTURES[e.id]} /></div>}
          <div className="mt-6"><TrialCounts drugId={e.id} /></div>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Modality">{e.modality}</Field>
            <Field label="Mechanism">{e.mechanism}</Field>
            <Field label="Brand / code">{[e.brand, e.code].filter(Boolean).join(" · ")}</Field>
            <Field label="Payload">{e.payload}</Field>
            <Field label="Linker">{e.linker}</Field>
          </div>
          {e.approvals.length > 0 && (
            <Section title="Approvals">
              <table className="onco"><thead><tr><th>Region</th><th>Year</th><th>Indication</th></tr></thead>
                <tbody>{e.approvals.map((a, i) => <tr key={i}><td>{a.region}</td><td className="tabular-nums">{a.year}</td><td>{a.indication}{a.note && <span className="text-muted"> — {a.note}</span>}</td></tr>)}</tbody></table>
            </Section>
          )}
          <Section title="Recruiting trials (live from ClinicalTrials.gov)"><TrialFinder intervention={interventionQuery(e.name)} title={e.name} /></Section>
        </>
      );
    case "company":
      return (
        <div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Field label="Headquarters">{e.hq}, {e.country}</Field>
          <Field label="Type"><span className="capitalize">{e.companyType.replace("-", " ")}</span>{e.ticker && <span className="text-muted"> · {e.ticker}</span>}</Field>
          <Field label="Website"><a className="underline break-all" href={e.website} rel="noopener">{e.website.replace(/^https?:\/\//, "")}</a></Field>
          <Field label="Founded">{e.founded}</Field>
        </div>
      );
    case "institution": {
      const row = rankInstitutions().find((r) => r.institution.id === e.id);
      return (
        <>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Location">{e.city}, {e.country}</Field>
            <Field label="Type"><span className="capitalize">{e.institutionType.replace("-", " ")}</span>{e.university && <span className="text-muted"> · {e.university}</span>}</Field>
            <Field label="Website"><a className="underline break-all" href={e.website} rel="noopener">{e.website.replace(/^https?:\/\//, "")}</a></Field>
            <Field label="Newsweek 2026 oncology rank">{e.newsweekOncology2026 ? `#${e.newsweekOncology2026}` : "Not in top 300 listing used"}</Field>
            <Field label="NCI designation"><span className="capitalize">{e.nci ?? "—"}</span></Field>
            {row && <Field label="OnCo score">#{row.rank} · {row.score} points ({row.newsweekPoints} Newsweek + {row.nciPoints} NCI + {row.linkPoints} from {row.links} linked objects) · <Link className="underline" href="/institutions/">ranking</Link></Field>}
          </div>
          <Section title="Programmes"><Bullets items={e.programs} /></Section>
        </>
      );
    }
    case "pathway":
      return (
        <>
          <Section title="In one picture"><p className="text-[15px] leading-relaxed max-w-3xl italic">{e.analogy}</p></Section>
          <Section title="Diagram"><PathwayDiagram p={e} /></Section>
          <Section title="How drugs attack it"><Bullets items={e.interventions} /></Section>
        </>
      );
    case "term":
      return <div className="mt-6"><Field label="Category">{e.category}</Field></div>;
    case "trial":
      return (
        <div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Field label="Setting">{e.setting}</Field>
          <Field label="Phase">Phase {e.phase}</Field>
          <Field label="Sponsor">{e.sponsor}</Field>
          <Field label="Registry">{e.nct && <a className="underline" href={`https://clinicaltrials.gov/study/${e.nct}`} rel="noopener">{e.nct}</a>}</Field>
          <Field label="Headline result">{e.result}</Field>
          <Field label="Reported">{e.yearReported}</Field>
        </div>
      );
    case "pairing": {
      const a = g.get(e.a), b = g.get(e.b);
      return (
        <>
          <div className="card p-4 mt-6 flex flex-wrap items-center gap-3 text-sm">
            {a && <Link href={routeFor(a)} className={`chip border text-sm ${KIND_COLOR[a.kind]}`}>{a.name}</Link>}
            <span className="text-muted">{e.pairingType === "caution" ? "⚠ with" : e.pairingType === "sequence" ? "→ then" : e.pairingType === "diagnostic-therapeutic" ? "→ selects" : "+"}</span>
            {b && <Link href={routeFor(b)} className={`chip border text-sm ${KIND_COLOR[b.kind]}`}>{b.name}</Link>}
            <span className={`chip ml-auto ${statusClass(e.pairingType === "caution" ? "negative" : "established")}`}>{e.pairingType.replace("-", " → ")}</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Rationale">{e.rationale}</Field>
            <Field label="Evidence">{e.evidence}</Field>
          </div>
        </>
      );
    }
    case "roadmap":
      return <RoadmapSteps r={e} />;
    case "idea":
      return (
        <div className="grid gap-6 mt-8">
          <Field label="Hypothesis">{e.hypothesis}</Field>
          <Field label="Rationale">{e.rationale}</Field>
          <Field label="What would test it">{e.test}</Field>
          <Field label="Maturity"><span className={`chip ${statusClass(e.maturity === "being-tested-at-scale" ? "phase-3" : e.maturity === "early-clinical" ? "phase-2" : e.maturity === "preclinical-evidence" ? "phase-1" : "concept")}`}>{e.maturity.replace(/-/g, " ")}</span></Field>
        </div>
      );
    case "collection":
      return (
        <div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Field label="URL"><a className="underline break-all" href={e.url} rel="noopener">{e.url.replace(/^https?:\/\//, "")}</a></Field>
          <Field label="Holds">{e.holds}</Field>
          <Field label="Licence">{e.license}</Field>
          <Field label="Maintainer">{e.maintainer}</Field>
        </div>
      );
    case "section": {
      const techs = g.incoming(e.id).get("technology") ?? [];
      return (
        <Section title={`Technologies on this front (${techs.length})`}>
          <div className="grid gap-3 sm:grid-cols-2">{techs.map((t) => <Link key={t.id} href={routeFor(t)} className="card p-3 hover:shadow-md transition"><div className="flex items-center gap-2 mb-1"><StatusChip status={t.status} /></div><div className="font-medium">{t.name}</div><p className="text-sm text-muted mt-0.5 line-clamp-2">{t.tldr}</p></Link>)}</div>
        </Section>
      );
    }
    default:
      return null;
  }
}

function RoadmapSteps({ r }: { r: Roadmap }) {
  const tone: Record<string, string> = { historic: "bg-zinc-400", current: "bg-emerald-500", emerging: "bg-amber-500", speculative: "bg-violet-500" };
  return (
    <Section title="Steps">
      <ol className="relative border-l-2 border-border ml-3 space-y-8">
        {r.steps.map((s, i) => (
          <li key={i} className="ml-6">
            <span className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full ring-4 ring-background ${tone[s.status]}`} />
            <div className="flex flex-wrap items-center gap-2"><span className="kicker">{s.era}</span><span className={`chip ${statusClass(s.status === "current" ? "approved" : s.status === "emerging" ? "phase-2" : s.status === "speculative" ? "concept" : "historic")}`}>{s.status}</span></div>
            <h3 className="font-semibold mt-1">{s.title}</h3>
            <p className="text-[15px] leading-relaxed mt-1 max-w-3xl">{s.description}</p>
            {s.refs.length > 0 && <div className="mt-2"><Refs ids={s.refs} /></div>}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function CancerDetail({ c }: { c: Cancer }) {
  const g = graph();
  const forMe = g.forCancer(c.id);
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 mt-8">
        <Field label="Burden">{c.burden}</Field>
        <Field label="Group"><span className="capitalize">{c.group}</span></Field>
      </div>
      <Section title="State of the art today"><Bullets items={c.stateOfArt} /></Section>
      <Section title="Standard of care by setting">
        <div className="space-y-3">
          {c.standardOfCare.map((s, i) => (
            <div key={i} className="card p-4">
              <div className="font-medium">{s.setting}</div>
              <p className="text-[15px] text-foreground/85 mt-1">{s.approach}</p>
              {s.refs.length > 0 && <div className="mt-2"><Refs ids={s.refs} /></div>}
            </div>
          ))}
        </div>
      </Section>
      <div className="grid gap-6 sm:grid-cols-2 mt-10">
        <Field label="Subtypes"><Bullets items={c.subtypes} /></Field>
        <Field label="Biomarkers clinicians test"><Bullets items={c.biomarkers} /></Field>
      </div>
      <Section title="History">
        <ol className="relative border-l-2 border-border ml-3 space-y-5">
          {c.history.map((h, i) => (
            <li key={i} className="ml-6">
              <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
              <div className="flex flex-wrap items-baseline gap-2"><span className="font-mono text-sm text-muted">{h.year}</span><span className="font-medium">{h.title}</span></div>
              {h.note && <p className="text-sm text-muted mt-0.5">{h.note}</p>}
              {h.refs.length > 0 && <div className="mt-1.5"><Refs ids={h.refs} /></div>}
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Coming down the pipeline"><Refs ids={c.pipeline} /></Section>
      <Section title="Open problems"><Bullets items={c.openProblems} /></Section>
      <Section title="Recruiting trials (live from ClinicalTrials.gov)"><TrialFinder condition={conditionQuery(c.name)} title={c.name} /></Section>
      <Section title="Expert centres"><ExpertCentres cancerId={c.id} /></Section>
      <Section title="Questions for your oncologist"><Questions cancer={c} /></Section>
      <Section title="Everything relevant to this cancer" aside={<span className="text-xs text-muted">direct links plus targets, companies, and technologies of its drugs</span>}>
        <Neighbours groups={forMe} exclude={["cancer"]} />
      </Section>
    </>
  );
}
