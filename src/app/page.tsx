import Link from "next/link";
import { graph } from "@/lib/graph";
import { KIND_META, KINDS, routeFor } from "@/lib/schema";
import { Container, EntityCard, KindChip, StatusChip } from "@/components/ui";
import { SearchBox } from "@/components/SearchBox";
import { KIND_COLOR } from "@/lib/text";

export default function Home() {
  const g = graph();
  const tnbc = g.kind("cancer").find((c) => c.id === "tnbc")!;
  const sections = g.kind("section").sort((a, b) => a.order - b.order);
  const approvals2026 = g.kind("drug").filter((d) => d.approvals.some((a) => a.year === 2026)).sort((a, b) => a.name.localeCompare(b.name));
  const frontier = g.kind("technology").filter((t) => t.tags.includes("frontier")).slice(0, 8);
  const roadmaps = g.kind("roadmap");
  const counts = KINDS.map((k) => ({ k, n: g.kind(k).length }));

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-rose-50/60 to-background dark:from-rose-950/20">
        <Container className="py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="kicker mb-3">Open · cited · one page per object</div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
              The open map of the war on cancer.
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-foreground/85 leading-relaxed">
              Every technology, target, product, company, institution, pathway, trial, pairing, roadmap, and idea in oncology, linked together. The state of the art, the history, and what is coming, for every cancer, with a plain-English TL;DR on every page.
            </p>
            <div className="mt-8 max-w-xl"><SearchBox large autoFocus={false} /></div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <Link href="/for-me/" className="rounded-lg bg-accent text-white px-4 py-2 font-medium hover:brightness-110">Pick my cancer type →</Link>
              <Link href={routeFor(tnbc)} className="rounded-lg border border-border bg-card px-4 py-2 font-medium hover:bg-foreground/5">Spike: triple-negative breast cancer</Link>
              <Link href="/roadmaps/trop2-adc-roadmap/" className="rounded-lg border border-border bg-card px-4 py-2 font-medium hover:bg-foreground/5">TROP2 ADC roadmap</Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          {counts.map(({ k, n }) => (
            <Link key={k} href={`/${KIND_META[k].route}/`} className={`card p-3 hover:shadow-md transition border ${KIND_COLOR[k]}`}>
              <div className="text-2xl font-semibold tabular-nums">{n}</div>
              <div className="text-sm capitalize">{KIND_META[k].plural}</div>
            </Link>
          ))}
        </div>
      </Container>

      <Container>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Sections of the field</h2>
          <Link href="/sections/" className="text-sm underline">All sections</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const techs = g.incoming(s.id).get("technology") ?? [];
            return (
              <Link key={s.id} href={routeFor(s)} className="card p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold">{s.name}</div>
                  <span className="text-xs text-muted">{techs.length} technologies</span>
                </div>
                <p className="text-sm text-muted line-clamp-2">{s.tldr}</p>
              </Link>
            );
          })}
        </div>
      </Container>

      <Container className="mt-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Spotlight: triple-negative breast cancer</h2>
              <Link href={routeFor(tnbc)} className="text-sm underline">Full page</Link>
            </div>
            <div className="card p-5">
              <p className="text-[15px] leading-relaxed">{tnbc.tldr}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
                <div><div className="kicker mb-1">State of the art</div><p className="text-muted">{tnbc.stateOfArt[0]}</p></div>
                <div><div className="kicker mb-1">Newest</div><p className="text-muted">{tnbc.history[tnbc.history.length - 1].title}: {tnbc.history[tnbc.history.length - 1].note}</p></div>
                <div><div className="kicker mb-1">Open problem</div><p className="text-muted">{tnbc.openProblems[1]}</p></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {tnbc.pipeline.slice(0, 8).map((id) => { const e = g.must(id); return <Link key={id} href={routeFor(e)} className={`chip border ${KIND_COLOR[e.kind]}`}>{e.name}</Link>; })}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">2026 approvals</h2>
              <Link href="/drugs/" className="text-sm underline">All products</Link>
            </div>
            <ul className="card divide-y divide-border">
              {approvals2026.map((d) => (
                <li key={d.id} className="p-3">
                  <Link href={routeFor(d)} className="font-medium hover:underline">{d.name}</Link>
                  <div className="text-xs text-muted mt-0.5">{d.approvals.filter((a) => a.year === 2026).map((a) => a.indication).join("; ")}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <Container className="mt-14">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Roadmaps</h2>
          <Link href="/roadmaps/" className="text-sm underline">All roadmaps</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((r) => (
            <Link key={r.id} href={routeFor(r)} className="card p-4 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-1"><KindChip kind="roadmap" /><span className="text-xs text-muted">{r.steps.length} steps</span></div>
              <div className="font-semibold leading-snug">{r.name}</div>
              <p className="text-sm text-muted mt-1 line-clamp-2">{r.tldr}</p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-14">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Frontier technologies</h2>
          <Link href="/technologies/" className="text-sm underline">All technologies</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {frontier.map((t) => <EntityCard key={t.id} e={t} />)}
        </div>
        <div className="mt-2 text-xs text-muted flex items-center gap-2">Evidence tiers: <StatusChip status="approved" /> <StatusChip status="phase-3" /> <StatusChip status="phase-2" /> <StatusChip status="phase-1" /> <StatusChip status="concept" /></div>
      </Container>

      <Container className="mt-14 mb-4">
        <div className="card p-6 grid gap-6 md:grid-cols-3">
          <div>
            <div className="kicker mb-1">Institutions</div>
            <p className="text-sm text-muted">Global map and a transparent ranking of the centres that matter.</p>
            <Link href="/institutions/" className="text-sm underline mt-2 inline-block">Map & ranking →</Link>
          </div>
          <div>
            <div className="kicker mb-1">Open data</div>
            <p className="text-sm text-muted">The whole corpus as JSON, and the open databases the field runs on.</p>
            <Link href="/api/" className="text-sm underline mt-2 inline-block mr-3">API →</Link>
            <Link href="/collections/" className="text-sm underline mt-2 inline-block">Collections →</Link>
          </div>
          <div>
            <div className="kicker mb-1">Contribute</div>
            <p className="text-sm text-muted">Every object is a record in a public repo. Fix a fact, add a source, propose an idea.</p>
            <Link href="/about/" className="text-sm underline mt-2 inline-block mr-3">How →</Link>
            <Link href="/hub/" className="text-sm underline mt-2 inline-block">50 ideas →</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
