import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { rankUniversities } from "@/lib/ranking";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { OPENALEX, OutputTable, UniversityOutputTable, outputRows, universityOutputRows } from "@/components/OutputTable";

export const metadata: Metadata = pageMeta({ title: "Research output ranking", description: "Universities and cancer centres ranked by oncology research output: OpenAlex counts, external bibliometric leaders, and the corpus-derived score.", path: "/universities/" });

export default function Universities() {
  const g = graph();
  const natureIndex = g.get("nature-index");
  const scimago = g.get("scimago-oncology");
  const output = outputRows();
  const byUniversity = universityOutputRows();
  const corpus = rankUniversities();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Research output: universities and cancer centres"
        lede="Three layers, each disclosed. First, the external bibliometric leaders. Second, oncology publication counts pulled from OpenAlex for every institution in OnCo, with the exact query. Third, the corpus-derived score, which measures presence in this evidence base rather than output."
        right={<div className="flex gap-2"><Link href="/institutions/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Map & ranking</Link><Link href="/leadership/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Trial leadership</Link></div>} />
      <Container className="pb-16">
        <h2 className="text-xl font-semibold mb-3">1. External leaders</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {natureIndex && <Link href={routeFor(natureIndex)} className="card p-4 hover:shadow-md transition"><div className="kicker mb-1">Nature Index · high-impact journals</div><div className="font-semibold">{natureIndex.name}</div><p className="text-sm text-muted mt-1">{natureIndex.tldr}</p><div className="text-xs text-muted mt-2">2025 healthcare-institution leaders include West China Hospital (Sichuan University, #4) and Memorial Sloan Kettering (#10). Open the collection page for the source tables.</div></Link>}
          {scimago && <Link href={routeFor(scimago)} className="card p-4 hover:shadow-md transition"><div className="kicker mb-1">SCImago · oncology subject area</div><div className="font-semibold">{scimago.name}</div><p className="text-sm text-muted mt-1">{scimago.tldr}</p></Link>}
        </div>

        <h2 className="text-xl font-semibold mt-12 mb-3">2. Oncology output from OpenAlex</h2>
        <div className="card p-4 text-sm text-muted mb-4 space-y-2">
          <p><strong className="text-foreground">Query.</strong> For each institution, works in OpenAlex where the primary topic&apos;s subfield is <em>{OPENALEX.subfieldName}</em> (subfield {OPENALEX.subfield}), publication year 2024 or 2025, counted with <code>authorships.institutions.lineage</code> so that a university&apos;s hospitals and institutes are included. Citations are OpenAlex&apos;s summed citation counts to those works as of {OPENALEX.fetched}.</p>
          <p><strong className="text-foreground">Caveats.</strong> Universities (Johns Hopkins, Stanford, UCSF, Penn, Michigan, WashU, UCLA, Heidelberg) are matched at the university level and therefore include all their hospitals; dedicated cancer centres (MSK, MD Anderson, Dana-Farber, Gustave Roussy) are matched to the centre itself. Topic assignment is OpenAlex&apos;s machine classification and undercounts oncology work filed under haematology, radiology, surgery, or genetics. Societies and funders (ASCO, ESMO, AACR, IARC, CRUK) are excluded. Where two OnCo records share one OpenAlex id, the university table counts it once. Data licence CC0; regenerate with <code>npm run fetch:openalex</code>.{OPENALEX.note && <> <em>{OPENALEX.note}</em></>}</p>
        </div>
        <h3 className="font-semibold mb-2">By institution ({output.length})</h3>
        <OutputTable rows={output} />
        <h3 className="font-semibold mt-8 mb-2">Grouped by university ({byUniversity.length})</h3>
        <UniversityOutputTable rows={byUniversity} />

        <h2 className="text-xl font-semibold mt-12 mb-3">3. Corpus-derived score</h2>
        <p className="text-sm text-muted mb-4 max-w-3xl">Sum of OnCo institution scores for the university&apos;s affiliated centres in this corpus (Newsweek points + NCI points + 2 × linked objects). Universities appear only if one of their institutions is documented here; this table measures how well OnCo covers an institution as much as the institution itself.</p>
        <div className="overflow-x-auto card">
          <table className="onco">
            <thead><tr><th>#</th><th>University</th><th>Institutions in OnCo</th><th>Linked objects</th><th>Score</th></tr></thead>
            <tbody>
              {corpus.map((r) => (
                <tr key={r.university}>
                  <td className="tabular-nums text-muted">{r.rank}</td>
                  <td className="font-medium min-w-[220px]"><div className="flex items-center gap-2"><Logo id={r.institutions[0]?.id} website={r.institutions[0]?.website ?? ""} name={r.university} size={28} className="shrink-0" /><span>{r.university}</span></div></td>
                  <td className="text-sm max-w-md"><span className="text-muted">{r.institutions.slice(0, 4).map((i, k) => <span key={i.id}>{k > 0 && ", "}<Link href={routeFor(i)} className="hover:underline hover:text-foreground">{i.name}</Link></span>)}{r.institutions.length > 4 && <span className="text-xs"> +{r.institutions.length - 4} more</span>}</span></td>
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
