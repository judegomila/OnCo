import Link from "next/link";
import type { ReactNode } from "react";
import type { Cancer, Entity, Roadmap } from "@/lib/schema";
import { KIND_META, routeFor } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { paragraphs, KIND_COLOR, statusClass } from "@/lib/text";
import { Bullets, ChipList, Container, KindChip, PageHeader, StatusChip } from "./ui";
import { Neighbours } from "./Neighbours";
import { PathwayDiagram } from "./PathwayDiagram";
import { rankInstitutions } from "@/lib/ranking";
import { MoleculeViewer, type StructureEntry } from "./MoleculeViewer";
import { Logo } from "./Logo";
import { JsonLd } from "./JsonLd";
import { PrintButton } from "./PrintButton";
import { EmbedSnippet } from "./EmbedSnippet";
import { TrialFinderGeo as TrialFinder } from "./TrialFinderGeo";
import { Questions } from "./Questions";
import { ExpertCentres } from "./ExpertCentres";
import { conditionQuery, interventionQuery } from "@/lib/ctgov";
import { TrialCounts } from "./TrialCounts";
import { ReviewBadge } from "./ReviewBadge";
import { TechSchematic } from "./TechSchematic";
import { Wireframe3D } from "./Wireframe3D";
import { schematicFor } from "@/data/schematics";
import { Tabs, type Tab } from "./Tabs";
import { RoadmapStory } from "./RoadmapStory";
import { TrialOutcomes } from "./Pictogram";
import { EvidenceBar } from "./EvidenceBar";
import { GuidelineChip } from "./GuidelineChip";
import { PrevalenceTable, CancerPrevalence } from "./PrevalenceTable";
import { SuggestEdit } from "./SuggestEdit";
import { sourceLocation } from "@/lib/source-location";
import { ProvenanceLine } from "./ProvenanceLine";
import { ConfidenceChip, ConfidenceLegend } from "./ConfidenceChip";
import { ProcessSchematic } from "./ProcessSchematic";
import { DosingCard } from "./DosingCard";
import { ToxicityTable } from "./ToxicityTable";
import { AccessTable } from "./AccessTable";
import { RegulatoryTimeline } from "./RegulatoryTimeline";
import { MechanismCard } from "./MechanismCard";
import { TldrText } from "./TldrText";
import { FrontSchematic } from "./FrontSchematic";
import { TermSchematic } from "./TermSchematic";
import { DrugGrid } from "./DrugCard";
import type { Drug } from "@/lib/schema";
import { LayerAware } from "./LayerAware";
import { withTermHovers } from "@/lib/term-hover";
import { roadmapStorySteps } from "@/lib/roadmap-story";
import structureIndex from "../../public/structures/index.json";

const STRUCTURES = structureIndex as Record<string, StructureEntry[]>;

function Refs({ ids }: { ids: string[] }) {
  const g = graph();
  const items = ids.map((id) => g.get(id)).filter((x): x is Entity => !!x);
  return <ChipList items={items} />;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  if (children === undefined || children === null || children === "" || (Array.isArray(children) && children.length === 0)) return null;
  return (
    <div>
      <div className="kicker mb-1">{label}</div>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

function Block({ title, children, aside }: { title?: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      {title && <div className="flex items-baseline justify-between gap-4 mb-3"><h2 className="text-lg font-semibold tracking-tight">{title}</h2>{aside}</div>}
      {children}
    </section>
  );
}

const Summary = ({ e }: { e: Entity }) => (
  <LayerAware>
    <div className="prose-onco text-[15px] leading-relaxed max-w-3xl">{paragraphs(e.summary).map((p, i) => <p key={i}>{withTermHovers(p, { skipId: e.id })}</p>)}</div>
  </LayerAware>
);

export function EntityDetail({ e }: { e: Entity }) {
  const g = graph();
  const neighbours = g.neighbours(e.id);
  const meta = KIND_META[e.kind];
  const nCon = [...neighbours.values()].reduce((a, l) => a + l.length, 0);

  const tabs: Tab[] = [
    ...kindTabs(e),
    ...(e.notes.length ? [{ id: "notes", label: "Notes", content: <Bullets items={e.notes} /> }] : []),
    { id: "connected", label: "Connected", count: nCon, content: <Neighbours groups={neighbours} /> },
  ];

  return (
    <>
      <JsonLd e={e} />
      <PageHeader
        kicker={<><Link href={`/${meta.route}/`} className="kicker hover:underline">{meta.plural}</Link><KindChip kind={e.kind} /><StatusChip status={e.status} /></>}
        title={e.name}
        ledeNode={<TldrText id={e.id} tldr={e.tldr} simple={e.simple} />}
        logo={"website" in e ? <Logo id={e.id} website={e.website} name={e.name} size={64} /> : "url" in e && e.kind === "collection" ? <Logo id={e.id} website={e.url} name={e.name} size={64} /> : undefined}
        right={e.aka.length > 0 ? <div className="text-xs text-muted text-right max-w-xs">aka {e.aka.join(", ")}</div> : undefined}
      />
      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {tabs.length > 2 ? <Tabs tabs={tabs} ariaLabel={`${e.name} sections`} /> : <div className="space-y-10">{tabs.map((t) => <Block key={t.id} title={t.id === "overview" ? undefined : t.label}>{t.content}</Block>)}</div>}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 self-start">
            {(e.kind === "drug" || e.kind === "technology" || e.kind === "target" || e.kind === "trial") && <EvidenceBar e={e} />}
            <ReviewBadge id={e.id} />
            <ProvenanceLine id={e.id} />
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
            <SuggestEdit id={e.id} kind={e.kind} name={e.name} fields={Object.keys(e)} source={sourceLocation(e.id, e.kind)} />
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

/** Per-kind tabs. The first tab is always "Overview" and contains the summary. */
function kindTabs(e: Entity): Tab[] {
  const g = graph();
  const overview = (extra?: ReactNode): Tab => ({ id: "overview", label: "Overview", content: <><Summary e={e} />{extra}</> });

  switch (e.kind) {
    case "cancer":
      return cancerTabs(e);
    case "technology":
      return [
        overview(<>
          <div className="mt-8"><TechSchematic tech={e} /></div>
          <Block title="How it works"><p className="text-[15px] leading-relaxed max-w-3xl">{e.principle}</p></Block>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Strengths"><Bullets items={e.strengths} /></Field>
            <Field label="Limitations"><Bullets items={e.limitations} /></Field>
            <Field label="Generation">{e.generation}</Field>
            <Field label="Since">{e.since}</Field>
          </div>
        </>),
        ...productsTab(g.incoming(e.id).get("drug") ?? []),
      ];
    case "target":
      return [
        overview(<>
          <Block title="Biology"><p className="text-[15px] leading-relaxed max-w-3xl">{e.biology}</p></Block>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Where it is found"><Bullets items={e.whereFound} /></Field>
            <Field label="Class"><span className="capitalize">{e.targetClass.replace("-", " ")}</span>{e.symbol && <span className="text-muted"> · {e.symbol}</span>}</Field>
          </div>
          {e.prevalence.length > 0 && <Block title="How common it is, by cancer"><PrevalenceTable target={e} /></Block>}
        </>),
        ...productsTab(g.incoming(e.id).get("drug") ?? []),
      ];
    case "drug":
      return [
        overview(<>
          {STRUCTURES[e.id] ? <div className="mt-8"><MoleculeViewer entries={STRUCTURES[e.id]} /></div> : <DrugSchematic technologies={e.technologies} modality={e.modality} />}
          <div className="mt-6"><ProcessSchematic entity={e} /></div>
          {e.mechanismSteps.length > 0 && <div className="mt-6"><MechanismCard steps={e.mechanismSteps} /></div>}
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Modality">{e.modality}</Field>
            <Field label="Mechanism">{e.mechanism}</Field>
            <Field label="Brand / code">{[e.brand, e.code].filter(Boolean).join(" · ")}</Field>
            <Field label="Payload">{e.payload}</Field>
            <Field label="Linker">{e.linker}</Field>
          </div>
          {e.dosing && <div className="mt-6"><DosingCard drug={e} /></div>}
        </>),
        ...(e.approvals.length || e.regulatoryEvents.length ? [{ id: "approvals", label: "Regulatory", count: e.regulatoryEvents.length || e.approvals.length, content: (<>
          {e.regulatoryEvents.length > 0 && <RegulatoryTimeline events={e.regulatoryEvents} />}
          {e.approvals.length > 0 && <Block title="Approvals"><table className="onco"><thead><tr><th>Region</th><th>Year</th><th>Indication</th></tr></thead>
            <tbody>{e.approvals.map((a, i) => <tr key={i}><td>{a.region}</td><td className="tabular-nums">{a.year}</td><td>{a.indication}{a.note && <span className="text-muted"> — {a.note}</span>}</td></tr>)}</tbody></table></Block>}
        </>) }] : []),
        ...(e.toxicity.length ? [{ id: "safety", label: "Safety", count: e.toxicity.length, content: <ToxicityTable toxicity={e.toxicity} /> }] : []),
        ...(e.access.length ? [{ id: "access", label: "Cost & access", count: e.access.length, content: <AccessTable access={e.access} /> }] : []),
        { id: "trials", label: "Trials", content: <><TrialCounts drugId={e.id} /><Block title="Recruiting now (live from ClinicalTrials.gov)"><TrialFinder intervention={interventionQuery(e.name)} title={e.name} /></Block>{e.trials.length > 0 && <Block title="Landmark trials in OnCo"><Refs ids={e.trials} /></Block>}</> },
      ];
    case "company":
      return [
        overview(<div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Field label="Headquarters">{e.hq}, {e.country}</Field>
          <Field label="Type"><span className="capitalize">{e.companyType.replace("-", " ")}</span>{e.ticker && <span className="text-muted"> · {e.ticker}</span>}</Field>
          <Field label="Website"><a className="underline break-all" href={e.website} rel="noopener">{e.website.replace(/^https?:\/\//, "")}</a></Field>
          <Field label="Founded">{e.founded}</Field>
        </div>),
        ...productsTab([...new Map([...e.drugs.map((id) => g.must(id)), ...(g.incoming(e.id).get("drug") ?? [])].map((d) => [d.id, d])).values()]),
      ];
    case "institution": {
      const row = rankInstitutions().find((r) => r.institution.id === e.id);
      return [
        overview(<>
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <Field label="Location">{e.city}, {e.country}</Field>
            <Field label="Type"><span className="capitalize">{e.institutionType.replace("-", " ")}</span>{e.university && <span className="text-muted"> · {e.university}</span>}</Field>
            <Field label="Website"><a className="underline break-all" href={e.website} rel="noopener">{e.website.replace(/^https?:\/\//, "")}</a></Field>
            <Field label="Newsweek 2026 oncology rank">{e.newsweekOncology2026 ? `#${e.newsweekOncology2026}` : "Not in top 300 listing used"}</Field>
            <Field label="NCI designation"><span className="capitalize">{e.nci ?? "—"}</span></Field>
            {row && <Field label="OnCo score">#{row.rank} · {row.score} points ({row.newsweekPoints} Newsweek + {row.nciPoints} NCI + {row.linkPoints} from {row.links} linked objects) · <Link className="underline" href="/institutions/">ranking</Link></Field>}
          </div>
        </>),
        ...(e.programs.length ? [{ id: "programmes", label: "Programmes", count: e.programs.length, content: <Bullets items={e.programs} /> }] : []),
      ];
    }
    case "pathway":
      return [
        overview(<Block title="In one picture"><p className="text-[15px] leading-relaxed max-w-3xl italic">{e.analogy}</p></Block>),
        { id: "diagram", label: "Diagram", content: <PathwayDiagram p={e} /> },
        { id: "interventions", label: "How drugs attack it", count: e.interventions.length, content: <Bullets items={e.interventions} /> },
      ];
    case "term":
      return [overview(<><div className="mt-8"><TermSchematic category={e.category} /></div><div className="mt-6"><Field label="Category">{e.category}</Field></div></>)];
    case "trial":
      return [
        overview(<div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Field label="Setting">{e.setting}</Field>
          <Field label="Phase">Phase {e.phase}</Field>
          <Field label="Sponsor">{e.sponsor}</Field>
          <Field label="Registry">{e.nct && <a className="underline" href={`https://clinicaltrials.gov/study/${e.nct}`} rel="noopener">{e.nct}</a>}</Field>
          <Field label="Headline result">{e.result}</Field>
          <Field label="Reported">{e.yearReported}</Field>
          <Field label="Enrolled">{e.enrolled}</Field>
          <Field label="Replication">{e.replication}</Field>
        </div>),
        ...(e.outcomes.length ? [{ id: "outcomes", label: "Outcomes", count: e.outcomes.length, content: <TrialOutcomes t={e} /> }] : []),
      ];
    case "pairing": {
      const a = g.get(e.a), b = g.get(e.b);
      return [
        overview(<>
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
        </>),
      ];
    }
    case "roadmap":
      return [overview(), { id: "steps", label: "Steps", count: e.steps.length, content: <RoadmapSteps r={e} /> }, { id: "story", label: "Story", content: <RoadmapStory title={e.name} steps={roadmapStorySteps(e)} /> }];
    case "idea":
      return [
        overview(<div className="grid gap-6 mt-8">
          <Field label="Confidence"><ConfidenceChip id={e.id} /></Field>
          <Field label="Hypothesis">{e.hypothesis}</Field>
          <Field label="Rationale">{e.rationale}</Field>
          <Field label="What would test it">{e.test}</Field>
          <Field label="Maturity"><span className={`chip ${statusClass(e.maturity === "being-tested-at-scale" ? "phase-3" : e.maturity === "early-clinical" ? "phase-2" : e.maturity === "preclinical-evidence" ? "phase-1" : "concept")}`}>{e.maturity.replace(/-/g, " ")}</span></Field>
        </div>),
      ];
    case "collection":
      return [
        overview(<div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Field label="URL"><a className="underline break-all" href={e.url} rel="noopener">{e.url.replace(/^https?:\/\//, "")}</a></Field>
          <Field label="Holds">{e.holds}</Field>
          <Field label="Licence">{e.license}</Field>
          <Field label="Maintainer">{e.maintainer}</Field>
        </div>),
      ];
    case "section": {
      const techs = g.incoming(e.id).get("technology") ?? [];
      return [
        overview(<div className="mt-8"><FrontSchematic sectionId={e.id} /></div>),
        { id: "technologies", label: "Technologies", count: techs.length, content: (
          <div className="grid gap-3 sm:grid-cols-2">{techs.map((t) => <Link key={t.id} href={routeFor(t)} className="card p-3 hover:shadow-md transition"><div className="flex items-center gap-2 mb-1"><StatusChip status={t.status} /></div><div className="font-medium">{t.name}</div><p className="text-sm text-muted mt-0.5 line-clamp-2">{t.tldr}</p></Link>)}</div>) },
      ];
    }
  }
}

function productsTab(drugs: Entity[]): Tab[] {
  if (!drugs.length) return [];
  return [{ id: "products", label: "Products", count: drugs.length, content: <DrugGrid drugs={drugs.filter((d): d is Drug => d.kind === "drug")} /> }];
}

/** Refs with product cards (molecule thumbnails) for drugs and chips for everything else. */
function RefsWithMolecules({ ids }: { ids: string[] }) {
  const g = graph();
  const items = ids.map((id) => g.get(id)).filter((x): x is Entity => !!x);
  const drugs = items.filter((x): x is Drug => x.kind === "drug");
  const rest = items.filter((x) => x.kind !== "drug");
  return (<>
    {drugs.length > 0 && <DrugGrid drugs={drugs} compact />}
    {rest.length > 0 && <div className={drugs.length ? "mt-4" : ""}><ChipList items={rest} /></div>}
  </>);
}

function RoadmapSteps({ r }: { r: Roadmap }) {
  const tone: Record<string, string> = { historic: "bg-zinc-400", current: "bg-emerald-500", emerging: "bg-amber-500", speculative: "bg-violet-500" };
  return (<>
    <ol className="relative border-l-2 border-border ml-3 space-y-8">
      {r.steps.map((s, i) => (
        <li key={i} className="ml-6">
          <span className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full ring-4 ring-background ${tone[s.status]}`} />
          <div className="flex flex-wrap items-center gap-2"><span className="kicker">{s.era}</span><span className={`chip ${statusClass(s.status === "current" ? "approved" : s.status === "emerging" ? "phase-2" : s.status === "speculative" ? "concept" : "historic")}`}>{s.status}</span>{s.status === "speculative" && <ConfidenceChip id={`${r.id}#${i}`} compact />}</div>
          <h3 className="font-semibold mt-1">{s.title}</h3>
          <p className="text-[15px] leading-relaxed mt-1 max-w-3xl">{s.description}</p>
          {s.refs.length > 0 && <div className="mt-2"><Refs ids={s.refs} /></div>}
        </li>
      ))}
    </ol>
    {r.steps.some((s) => s.status === "speculative") && <div className="mt-4"><ConfidenceLegend /></div>}
  </>);
}

function cancerTabs(c: Cancer): Tab[] {
  const g = graph();
  const forMe = g.forCancer(c.id);
  const nRel = [...forMe.values()].reduce((a, l) => a + l.length, 0);
  return [
    { id: "overview", label: "Overview", content: <>
      <Summary e={c} />
      <div className="grid gap-6 sm:grid-cols-2 mt-8">
        <Field label="Burden">{c.burden}</Field>
        <Field label="Group"><span className="capitalize">{c.group}</span></Field>
      </div>
      <Block title="State of the art today"><Bullets items={c.stateOfArt} /></Block>
    </> },
    { id: "care", label: "Standard of care", count: c.standardOfCare.length, content: (
      <div className="space-y-3">
        {c.standardOfCare.map((s, i) => (
          <div key={i} className="card p-4">
            <div className="font-medium">{s.setting}</div>
            <p className="text-[15px] text-foreground/85 mt-1">{s.approach}</p>
            {s.guideline && <div className="mt-2"><GuidelineChip g={s.guideline} /></div>}
            {s.refs.length > 0 && <div className="mt-2"><Refs ids={s.refs} /></div>}
          </div>
        ))}
      </div>) },
    { id: "biology", label: "Subtypes & biomarkers", content: (<>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Subtypes"><Bullets items={c.subtypes} /></Field>
        <Field label="Biomarkers clinicians test"><Bullets items={c.biomarkers} /></Field>
      </div>
      <Block title="Target prevalence in this cancer"><CancerPrevalence cancerId={c.id} /></Block>
    </>) },
    { id: "history", label: "History", count: c.history.length, content: (
      <ol className="relative border-l-2 border-border ml-3 space-y-5">
        {c.history.map((h, i) => (
          <li key={i} className="ml-6">
            <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
            <div className="flex flex-wrap items-baseline gap-2"><span className="font-mono text-sm text-muted">{h.year}</span><span className="font-medium">{h.title}</span></div>
            {h.note && <p className="text-sm text-muted mt-0.5">{h.note}</p>}
            {h.refs.length > 0 && <div className="mt-1.5"><Refs ids={h.refs} /></div>}
          </li>
        ))}
      </ol>) },
    { id: "pipeline", label: "Pipeline", count: c.pipeline.length, content: <><RefsWithMolecules ids={c.pipeline} /><Block title="Open problems"><Bullets items={c.openProblems} /></Block></> },
    { id: "trials", label: "Trials", content: <><Block title="Recruiting now (live from ClinicalTrials.gov)"><TrialFinder condition={conditionQuery(c.name)} title={c.name} /></Block>{(forMe.get("trial") ?? []).length > 0 && <Block title="Landmark trials in OnCo"><ChipList items={forMe.get("trial") ?? []} /></Block>}</> },
    { id: "centres", label: "Expert centres", content: <ExpertCentres cancerId={c.id} /> },
    { id: "questions", label: "Questions to ask", content: <Questions cancer={c} /> },
    { id: "relevant", label: "Everything relevant", count: nRel, content: <><p className="text-xs text-muted mb-3">Direct links plus the targets, companies, and technologies of this cancer&apos;s products.</p><Neighbours groups={forMe} exclude={["cancer"]} /></> },
  ];
}

/** Products with no molecule (cells, vaccines, devices, tests) get the schematic of their primary technology. */
function DrugSchematic({ technologies, modality }: { technologies: string[]; modality: string }) {
  const g = graph();
  const tech = technologies.map((id) => g.get(id)).find((t) => t && t.kind === "technology");
  if (!tech || tech.kind !== "technology") return null;
  const { mesh } = schematicFor(tech.id, tech.sections);
  return (
    <div className="mt-8 card overflow-hidden">
      <Wireframe3D mesh={mesh} />
      <div className="px-4 py-3 border-t border-border text-sm"><span className="font-medium">Schematic of the modality</span><span className="text-muted"> · {modality} · not a molecule; see the <Link className="underline" href={routeFor(tech)}>{tech.name}</Link> page</span></div>
    </div>
  );
}
