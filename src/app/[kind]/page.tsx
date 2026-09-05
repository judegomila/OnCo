import { notFound } from "next/navigation";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { KIND_META, KINDS, routeFor, type Kind } from "@/lib/schema";
import { Container, EntityCard, PageHeader, StatusChip } from "@/components/ui";
import { rankInstitutions } from "@/lib/ranking";
import { WorldMap } from "@/components/WorldMap";
import type { Metadata } from "next";

const ROUTE_TO_KIND: Record<string, Kind> = Object.fromEntries(KINDS.map((k) => [KIND_META[k].route, k])) as Record<string, Kind>;

export function generateStaticParams() {
  return KINDS.map((k) => ({ kind: KIND_META[k].route }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const { kind } = await params;
  const k = ROUTE_TO_KIND[kind];
  if (!k) return {};
  return { title: KIND_META[k].plural[0].toUpperCase() + KIND_META[k].plural.slice(1), description: KIND_META[k].blurb };
}

export default async function KindIndex({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  const k = ROUTE_TO_KIND[kind];
  if (!k) notFound();
  const g = graph();
  const meta = KIND_META[k];
  const title = meta.plural[0].toUpperCase() + meta.plural.slice(1);

  if (k === "institution") return <InstitutionsIndex />;
  if (k === "section") {
    const items = g.kind("section").sort((a, b) => a.order - b.order);
    return (
      <>
        <PageHeader kicker={<span className="kicker">{title}</span>} title="Sections of oncology" lede={meta.blurb} />
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => {
              const techs = g.incoming(s.id).get("technology") ?? [];
              return (
                <Link key={s.id} href={routeFor(s)} className="card p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between"><div className="font-semibold">{s.name}</div><span className="text-xs text-muted">{techs.length} technologies</span></div>
                  <p className="text-sm text-muted mt-1">{s.tldr}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </>
    );
  }

  if (k === "technology") {
    const sections = g.kind("section").sort((a, b) => a.order - b.order);
    return (
      <>
        <PageHeader kicker={<span className="kicker">{title}</span>} title="Technologies" lede={meta.blurb} />
        <Container>
          {sections.map((s) => {
            const techs = (g.incoming(s.id).get("technology") ?? []);
            if (!techs.length) return null;
            return (
              <section key={s.id} className="mt-8">
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="text-lg font-semibold"><Link href={routeFor(s)} className="hover:underline">{s.name}</Link></h2>
                  <span className="text-xs text-muted">{techs.length}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{techs.map((t) => <EntityCard key={t.id} e={t} />)}</div>
              </section>
            );
          })}
        </Container>
      </>
    );
  }

  if (k === "cancer") {
    const items = g.kind("cancer");
    const groups = [...new Set(items.map((c) => c.group))];
    return (
      <>
        <PageHeader kicker={<span className="kicker">{title}</span>} title="Cancers" lede={meta.blurb} right={<Link href="/for-me/" className="rounded-lg bg-accent text-white px-4 py-2 text-sm font-medium">Pick mine →</Link>} />
        <Container>
          {groups.map((grp) => (
            <section key={grp} className="mt-8">
              <h2 className="text-lg font-semibold capitalize mb-3">{grp}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.filter((c) => c.group === grp).map((c) => <EntityCard key={c.id} e={c} />)}</div>
            </section>
          ))}
        </Container>
      </>
    );
  }

  if (k === "drug") {
    const items = g.kind("drug");
    const order = ["approved", "phase-3", "phase-2", "phase-1", "established", "preclinical"];
    const byStatus = order.map((s) => ({ s, items: items.filter((d) => (d.status ?? "") === s) })).filter((x) => x.items.length);
    const rest = items.filter((d) => !order.includes(d.status ?? ""));
    return (
      <>
        <PageHeader kicker={<span className="kicker">{title}</span>} title="Products" lede={meta.blurb} />
        <Container>
          {byStatus.map(({ s, items }) => (
            <section key={s} className="mt-8">
              <div className="flex items-center gap-2 mb-3"><StatusChip status={s} /><span className="text-xs text-muted">{items.length}</span></div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((d) => <EntityCard key={d.id} e={d} compact />)}</div>
            </section>
          ))}
          {rest.length > 0 && <section className="mt-8"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{rest.map((d) => <EntityCard key={d.id} e={d} compact />)}</div></section>}
        </Container>
      </>
    );
  }

  if (k === "term") {
    const items = g.kind("term");
    const cats = [...new Set(items.map((t) => t.category))].sort();
    return (
      <>
        <PageHeader kicker={<span className="kicker">{title}</span>} title="Glossary" lede={meta.blurb} />
        <Container>
          {cats.map((cat) => (
            <section key={cat} className="mt-8">
              <h2 className="text-lg font-semibold mb-3">{cat}</h2>
              <dl className="card divide-y divide-border">
                {items.filter((t) => t.category === cat).map((t) => (
                  <div key={t.id} className="p-3 grid sm:grid-cols-[220px_1fr] gap-2">
                    <dt className="font-medium"><Link href={routeFor(t)} className="hover:underline">{t.name}</Link></dt>
                    <dd className="text-sm text-muted">{t.tldr}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </Container>
      </>
    );
  }

  if (k === "company") {
    const items = g.kind("company");
    const types = [...new Set(items.map((c) => c.companyType))];
    const label: Record<string, string> = { pharma: "Large pharma", biotech: "Biotech", diagnostics: "Diagnostics", imaging: "Imaging equipment", devices: "Devices & radiotherapy hardware", "ai-software": "AI & software", radiopharma: "Radiopharmaceuticals", "cell-therapy": "Cell therapy", "cro-services": "Services", nonprofit: "Nonprofit" };
    return (
      <>
        <PageHeader kicker={<span className="kicker">{title}</span>} title="Companies" lede={meta.blurb} />
        <Container>
          {types.map((t) => (
            <section key={t} className="mt-8">
              <h2 className="text-lg font-semibold mb-3">{label[t] ?? t}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.filter((c) => c.companyType === t).map((c) => <EntityCard key={c.id} e={c} compact />)}</div>
            </section>
          ))}
        </Container>
      </>
    );
  }

  const items = g.kind(k);
  return (
    <>
      <PageHeader kicker={<span className="kicker">{title}</span>} title={title} lede={meta.blurb} />
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((e) => <EntityCard key={e.id} e={e} />)}</div>
      </Container>
    </>
  );
}

function InstitutionsIndex() {
  const ranked = rankInstitutions();
  const points = ranked.map((r) => ({ id: r.institution.id, name: r.institution.name, city: `${r.institution.city}, ${r.institution.country}`, lat: r.institution.lat, lng: r.institution.lng, score: r.score, rank: r.rank, route: routeFor(r.institution) }));
  return (
    <>
      <PageHeader kicker={<span className="kicker">Institutions</span>} title="The institutions that matter, mapped and ranked"
        lede="Cancer centres, universities, research institutes, and the societies and agencies that set the agenda. The ranking formula is disclosed below and on the about page; dispute it in the repo."
        right={<Link href="/universities/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">University output ranking →</Link>} />
      <Container>
        <WorldMap points={points} />
        <div className="card p-4 mt-6 text-sm">
          <div className="kicker mb-1">How the OnCo score works</div>
          <p className="text-muted">
            score = Newsweek points (60 − Newsweek/Statista 2026 Oncology rank, 0 if unranked) + NCI designation points (Comprehensive 15, Clinical or Basic 8) + 2 × the number of distinct OnCo objects (trials, drugs, technologies, targets) linked to the institution. The third term measures presence in this evidence base, so it grows as the corpus grows and is biased toward institutions we have documented. It is a starting point, not a verdict.
          </p>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="onco">
            <thead><tr><th>#</th><th>Institution</th><th>City</th><th>Type</th><th>Newsweek 2026</th><th>NCI</th><th>Linked objects</th><th>Score</th></tr></thead>
            <tbody>
              {ranked.map((r) => (
                <tr key={r.institution.id}>
                  <td className="tabular-nums">{r.rank}</td>
                  <td><Link href={routeFor(r.institution)} className="font-medium hover:underline">{r.institution.name}</Link>{r.institution.university && <div className="text-xs text-muted">{r.institution.university}</div>}</td>
                  <td className="text-muted">{r.institution.city}, {r.institution.country}</td>
                  <td className="text-muted capitalize">{r.institution.institutionType.replace("-", " ")}</td>
                  <td className="tabular-nums">{r.institution.newsweekOncology2026 ?? "—"}</td>
                  <td className="capitalize">{r.institution.nci ?? "—"}</td>
                  <td className="tabular-nums">{r.links}</td>
                  <td className="tabular-nums font-semibold">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
