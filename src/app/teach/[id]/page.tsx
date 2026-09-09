import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta, absoluteUrl } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { graph } from "@/lib/graph";
import { KIND_META, routeFor, type Cancer, type Drug, type Entity, type Section, type Technology, type Trial } from "@/lib/schema";
import { paragraphs } from "@/lib/text";
import { trialEvidence } from "@/lib/evidence";
import { primaryOutcomeSummary } from "@/components/Pictogram";
import { benchmark } from "@/data/benchmark";
import { CancerIcon } from "@/components/CancerIcon";
import { FrontSchematic } from "@/components/FrontSchematic";
import { SlideDeck, type Slide } from "@/components/SlideDeck";

export function generateStaticParams() {
  const g = graph();
  return [...g.kind("cancer"), ...g.kind("section")].map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const e = graph().get(id);
  if (!e || (e.kind !== "cancer" && e.kind !== "section")) return {};
  return pageMeta({ title: `Teaching pack: ${e.name}`, description: `Slides and a quiz on ${e.name}, generated from OnCo: ${e.tldr}`, path: `/teach/${e.id}/` });
}

const nameOf = (id: string) => graph().get(id)?.name ?? id;
const kindOf = (id: string) => { const e = graph().get(id); return e ? KIND_META[e.kind].label.toLowerCase() : ""; };
const cut = <T,>(xs: T[], n: number) => xs.slice(0, n);
const trialLine = (t: Trial) => `${t.name} (phase ${t.phase}${t.enrolled ? `, n=${t.enrolled.toLocaleString("en-GB")}` : ""}): ${primaryOutcomeSummary(t) ?? t.result ?? "result not yet recorded"}`;
const sourcesOf = (e: Entity) => [...e.links, ...(e.wikipedia ? [{ label: "Wikipedia", url: e.wikipedia }] : [])];

function quizFor(id: string, related: Set<string>): Slide["quiz"] {
  const direct = benchmark.filter((q) => q.entities.includes(id));
  const near = benchmark.filter((q) => !q.entities.includes(id) && q.entities.some((x) => related.has(x)));
  return cut([...direct, ...near], 6).map((q) => ({ q: q.question, a: q.expected }));
}

function topTrials(ids: Iterable<string>, n: number): Trial[] {
  const g = graph();
  const seen = new Set<string>();
  const ts: Trial[] = [];
  for (const id of ids) { const t = g.get(id); if (t && t.kind === "trial" && !seen.has(t.id)) { seen.add(t.id); ts.push(t); } }
  return ts.map((t) => ({ t, s: trialEvidence(t).score })).sort((a, b) => b.s - a.s).slice(0, n).map((x) => x.t);
}

function cancerSlides(c: Cancer): Slide[] {
  const g = graph();
  const page = absoluteUrl(routeFor(c));
  const rel = g.forCancer(c.id);
  const trials = topTrials([...(rel.get("trial") ?? []).map((t) => t.id), ...c.trials], 6);
  const related = new Set<string>([...c.pipeline, ...c.standardOfCare.flatMap((s) => s.refs), ...c.history.flatMap((h) => h.refs), ...trials.map((t) => t.id), ...(rel.get("drug") ?? []).map((d) => d.id)]);
  const sources = sourcesOf(c);
  const guidelineUrls = [...new Set(c.standardOfCare.map((s) => s.guideline?.url).filter((u): u is string => !!u))].map((u) => ({ label: "Guideline", url: u }));
  const summary = paragraphs(c.summary);
  const slides: Slide[] = [
    { id: "title", kicker: `Teaching pack · Cancer · ${c.group}`, title: c.name, paragraphs: [c.tldr], notes: ["Open with the TL;DR in plain words; ask who in the room has met this disease.", `Source page: ${page}. Every figure on the following slides traces to that page and its links.`, "This deck is orientation, not medical advice."], sources },
    { id: "what", kicker: "What it is", title: "In two paragraphs", paragraphs: cut(summary, 2), notes: cut(summary.slice(2), 2), sources },
    { id: "soc", kicker: "Standard of care", title: "What is given today, by setting", table: c.standardOfCare.length ? { head: ["Setting", "Approach", "Guideline"], rows: cut(c.standardOfCare, 8).map((s) => [s.setting, s.approach, [s.guideline?.nccn ? `NCCN ${s.guideline.nccn}` : "", s.guideline?.esmoMcbs ? `ESMO-MCBS ${s.guideline.esmoMcbs}` : ""].filter(Boolean).join(", ") || "not mapped"]) } : undefined, notes: cut(c.standardOfCare, 8).map((s) => `${s.setting}: evidence from ${s.refs.length ? s.refs.map(nameOf).join(", ") : "guideline consensus"}${s.guideline?.version ? ` (${s.guideline.version})` : ""}.`), sources: guidelineUrls },
    { id: "art", kicker: "State of the art", title: "Where the field stands", bullets: cut(c.stateOfArt, 6), notes: c.stateOfArt.slice(6, 9) },
    { id: "history", kicker: "History", title: "How we got here", timeline: cut([...c.history].sort((a, b) => String(a.year).localeCompare(String(b.year))), 10).map((h) => ({ year: String(h.year), title: h.title })), notes: cut(c.history.filter((h) => h.note), 6).map((h) => `${h.year}: ${h.note}`) },
    { id: "pipeline", kicker: "Pipeline", title: "What is coming", bullets: cut(c.pipeline, 12).map((id) => `${nameOf(id)} (${kindOf(id)})`), notes: cut(c.pipeline, 6).map((id) => `${nameOf(id)}: ${g.get(id)?.tldr ?? ""}`) },
    { id: "trials", kicker: "Evidence", title: "The trials that set the standard", bullets: trials.map(trialLine), notes: trials.map((t) => `${t.name}${t.nct ? ` (${t.nct})` : ""}: ${t.result ?? "no headline result recorded"}${t.replication ? ` Replication: ${t.replication}` : ""}`), sources: trials.flatMap((t) => t.links.slice(0, 1)) },
    { id: "problems", kicker: "Open problems", title: "What nobody has solved", bullets: cut(c.openProblems, 6), notes: c.openProblems.slice(6, 9) },
    { id: "quiz", kicker: "Quiz", title: "Check understanding", quiz: quizFor(c.id, related), notes: ["Questions come from OnCo's open benchmark (src/data/benchmark.ts); the model answers reflect the corpus as of its asOf date."] },
    { id: "sources", kicker: "Sources", title: "Read the primary sources", bullets: cut([...sources, ...guidelineUrls], 12).map((s) => `${s.label}: ${s.url}`), notes: [`Record last updated ${c.asOf}. Corrections: ${absoluteUrl("/suggest/")}.`] },
  ];
  return slides.filter((s) => s.paragraphs?.length || s.bullets?.length || s.table || s.timeline?.length || s.quiz?.length);
}

function frontSlides(s: Section): Slide[] {
  const g = graph();
  const page = absoluteUrl(routeFor(s));
  const inc = g.incoming(s.id);
  const techs = (inc.get("technology") ?? []).filter((t): t is Technology => t.kind === "technology");
  const drugs = (inc.get("drug") ?? []).filter((d): d is Drug => d.kind === "drug");
  const roadmaps = inc.get("roadmap") ?? [];
  const trialIds = new Set<string>([...(inc.get("trial") ?? []).map((t) => t.id)]);
  for (const t of techs) for (const tr of g.incoming(t.id).get("trial") ?? []) trialIds.add(tr.id);
  for (const d of drugs) for (const tr of g.incoming(d.id).get("trial") ?? []) trialIds.add(tr.id);
  const trials = topTrials(trialIds, 6);
  const related = new Set<string>([...techs.map((t) => t.id), ...drugs.map((d) => d.id), ...trials.map((t) => t.id)]);
  const sources = sourcesOf(s);
  const summary = paragraphs(s.summary);
  const slides: Slide[] = [
    { id: "title", kicker: "Teaching pack · Front", title: s.name, paragraphs: [s.tldr], notes: ["Frame the front: what problem it attacks and why it is a front rather than a single technology.", `Source page: ${page}.`, "This deck is orientation, not medical advice."], sources },
    { id: "what", kicker: "What it is", title: "In two paragraphs", paragraphs: cut(summary, 2), notes: cut(summary.slice(2), 2), sources },
    { id: "techs", kicker: "Technologies", title: "The ways in on this front", bullets: cut(techs, 10).map((t) => `${t.name}: ${t.tldr}`), notes: cut(techs, 6).map((t) => `${t.name}: ${t.principle}`) },
    { id: "products", kicker: "Products", title: "What has reached patients", bullets: cut([...drugs].sort((a, b) => (a.status === "approved" || a.status === "standard-of-care" ? -1 : 1) - (b.status === "approved" || b.status === "standard-of-care" ? -1 : 1)), 10).map((d) => `${d.name}${d.status ? ` (${d.status})` : ""}: ${d.tldr}`), notes: cut(drugs, 6).map((d) => `${d.name}: ${d.mechanism}`) },
    { id: "roadmap", kicker: "Roadmap", title: "History to horizon", bullets: roadmaps.flatMap((r) => r.kind === "roadmap" ? cut(r.steps, 6).map((st) => `${r.name} · ${st.title} (${st.status})`) : []), notes: roadmaps.map((r) => `${r.name}: ${r.tldr}`) },
    { id: "trials", kicker: "Evidence", title: "The trials that moved the front", bullets: trials.map(trialLine), notes: trials.map((t) => `${t.name}${t.nct ? ` (${t.nct})` : ""}: ${t.result ?? "no headline result recorded"}`), sources: trials.flatMap((t) => t.links.slice(0, 1)) },
    { id: "quiz", kicker: "Quiz", title: "Check understanding", quiz: quizFor(s.id, related), notes: ["Questions come from OnCo's open benchmark (src/data/benchmark.ts)."] },
    { id: "sources", kicker: "Sources", title: "Read the primary sources", bullets: cut(sources, 12).map((x) => `${x.label}: ${x.url}`), notes: [`Record last updated ${s.asOf}. Corrections: ${absoluteUrl("/suggest/")}.`] },
  ];
  return slides.filter((x) => x.paragraphs?.length || x.bullets?.length || x.table || x.timeline?.length || x.quiz?.length);
}

export default async function TeachPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = graph().get(id);
  if (!e || (e.kind !== "cancer" && e.kind !== "section")) notFound();
  const slides = e.kind === "cancer" ? cancerSlides(e) : frontSlides(e);
  const hero = e.kind === "cancer" ? <CancerIcon cancerId={e.id} className="h-20 w-20 sm:h-28 sm:w-28" /> : <FrontSchematic sectionId={e.id} compact height="9rem" />;
  return (
    <>
      <div className="print:hidden">
        <PageHeader kicker={<GroupKicker id="learn"><Link href="/teach/" className="kicker hover:text-foreground">Teaching packs</Link></GroupKicker>} title={`Teaching pack: ${e.name}`}
          lede={`${slides.length} slides generated from the ${KIND_META[e.kind].label.toLowerCase()} page, with a quiz from the open benchmark and speaker notes that cite the sources. Arrow keys move between slides; Print gives one slide per page.`}
          right={<Link href={routeFor(e)} className="btn text-sm">Read the page</Link>} />
      </div>
      <Container className="pb-16">
        <SlideDeck title={`Teaching pack: ${e.name}`} slides={slides} hero={hero} />
      </Container>
    </>
  );
}
