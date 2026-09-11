import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { SponsorBoard } from "@/components/SponsorBoard";
import { sponsorLeaderboard } from "@/lib/sponsors";

export const metadata: Metadata = pageMeta({ title: "Trial sponsors", description: "Who runs the trials: companies, cooperative groups and institutions ranked by phase 2 and 3 studies on ClinicalTrials.gov and landmark trials in the corpus, by phase, status and cancer.", path: "/sponsors/" });

export default function SponsorsPage() {
  const g = graph();
  const { rows, registryStudies, registryFetched, unmatchedShare } = sponsorLeaderboard();
  const cancers = g.kind("cancer").map((c) => ({ id: c.id, name: c.name }));
  const companies = rows.filter((r) => r.kind === "company").length, groups = rows.filter((r) => r.kind === "cooperative-group").length, institutions = rows.filter((r) => r.kind === "institution").length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Trial sponsors"
        lede={`${rows.length} lead sponsors across ${registryStudies.toLocaleString("en-GB")} registered phase 2 and 3 studies and ${g.kind("trial").length} curated trials: ${companies} companies, ${groups} cooperative groups and ${institutions} institutions, plus names not yet mapped. Filter by cancer to see who runs the most trials in it.`} />
      <Container className="pb-16">
        <SponsorBoard rows={rows} cancers={cancers} />
        <section className="grid md:grid-cols-2 gap-6 text-sm mt-10">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Sources</h2>
            <p><strong>Registry studies</strong> are the phase 2 and 3 studies ClinicalTrials.gov returns for each product in the corpus (<code className="text-xs">public/trials/*.json</code>, fetched {registryFetched ?? "recently"}), de-duplicated by NCT id and credited to the lead sponsor. Because they are found through products, sponsors of trials that name no corpus product are under-counted, and academic sponsors of investigator-initiated studies appear alongside the companies whose drugs they test.</p>
            <p><strong>Landmark trials</strong> are the curated trials in the corpus, credited to each party in the sponsor field (&ldquo;AstraZeneca / Daiichi Sankyo&rdquo; counts for both).</p>
          </div>
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">Names and cancers</h2>
            <p>Sponsor strings are normalised to company, institution and cooperative-group ids in <code className="text-xs">src/data/sponsor-aliases.ts</code>; acquired companies roll up to the acquirer. About {Math.round(unmatchedShare * 100)}% of study credits belong to names with no mapping yet and appear under the name as written. Cancers are matched from the registered condition text to corpus cancers by name and alias; a study counts under a cancer only when the text names it.</p>
            <p>Compare with <Link href="/leadership/" className="underline">trial leadership</Link>, which ranks institutions by their presence in the landmark trials, and the <Link href="/scorecards/" className="underline">company scorecards</Link>.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
