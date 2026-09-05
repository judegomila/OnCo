import type { Metadata } from "next";
import Link from "next/link";
import { rankUniversities } from "@/lib/ranking";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "University output ranking", description: "Universities ranked by the oncology output recorded in OnCo and external bibliometric sources." };

export default function Universities() {
  const rows = rankUniversities();
  const g = graph();
  const natureIndex = g.get("nature-index");
  const scimago = g.get("scimago-oncology");
  return (
    <>
      <PageHeader kicker={<span className="kicker">Institutions</span>} title="Universities ranked by oncology output"
        lede="Two layers. First, the external bibliometric leaders (Nature Index and SCImago Oncology), linked so you can read the primary tables. Second, a corpus-derived table: universities grouped from the cancer centres in OnCo, scored by the same disclosed formula as the institution ranking. The second table measures presence in this evidence base and is only as complete as the corpus." />
      <Container className="pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {natureIndex && <Link href={routeFor(natureIndex)} className="card p-4 hover:shadow-md transition"><div className="kicker mb-1">External · research output</div><div className="font-semibold">{natureIndex.name}</div><p className="text-sm text-muted mt-1">{natureIndex.tldr}</p><div className="text-xs text-muted mt-2">2025 leaders in healthcare institutions include West China Hospital (Sichuan University, #4) and Memorial Sloan Kettering (#10); Harvard-affiliated hospitals dominate the top. Open the collection page for the source tables.</div></Link>}
          {scimago && <Link href={routeFor(scimago)} className="card p-4 hover:shadow-md transition"><div className="kicker mb-1">External · oncology subject area</div><div className="font-semibold">{scimago.name}</div><p className="text-sm text-muted mt-1">{scimago.tldr}</p></Link>}
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-3">Corpus-derived university table</h2>
        <p className="text-sm text-muted mb-4 max-w-3xl">Score = sum of OnCo institution scores for the university's affiliated cancer centres and hospitals in this corpus (Newsweek points + NCI points + 2 × linked objects). Universities appear only if one of their institutions is documented here; adding an institution record adds the university.</p>
        <div className="overflow-x-auto">
          <table className="onco">
            <thead><tr><th>#</th><th>University</th><th>Institutions in OnCo</th><th>Linked objects</th><th>Score</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.university}>
                  <td className="tabular-nums">{r.rank}</td>
                  <td className="font-medium">{r.university}</td>
                  <td className="text-sm">{r.institutions.map((i) => <Link key={i.id} href={routeFor(i)} className="underline mr-2">{i.name}</Link>)}</td>
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
