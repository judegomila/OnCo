import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EntityBrowser } from "@/components/EntityBrowser";
import { pageRows } from "@/lib/static-tables";
import { facetCounts } from "@/lib/tables/kinds";
import { OPEN_SOURCE_SORT, OPEN_SOURCE_TABLE, openSourceBrowser } from "@/lib/tables/open-source";
import { OPEN_SOURCE_GENERATED, OPEN_SOURCE_SKIPPED, openSourceProjects } from "@/data/open-source";
import { CATEGORY_META, CATEGORY_ORDER, LICENCE_FAMILY_ORDER, LICENCE_FAMILY_TIP, licenceFamily, OPENNESS_META, OPENNESS_ORDER, openSourceLink } from "@/lib/open-source";

export const metadata: Metadata = pageMeta({
  title: "Open source in oncology",
  description: "Every open-source project the field runs on, from variant callers and knowledge bases to imaging, radiotherapy planning, pathology, single-cell, chemistry, trial infrastructure, data commons, standards and hardware, with licence, openness, maintainer, stars and last activity read from each repository.",
  path: "/open-source/",
});

function Glyph({ d, className = "h-3.5 w-3.5" }: { d: string; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
}

export default function OpenSourcePage() {
  const built = openSourceBrowser();
  const browser = pageRows(OPEN_SOURCE_TABLE, built.rows);
  const counts = facetCounts(built.rows, built.facets, true);
  const all = openSourceProjects;
  const byCategory = CATEGORY_ORDER.map((c) => ({ c, n: all.filter((p) => p.category === c).length })).filter((x) => x.n > 0);
  const byOpenness = OPENNESS_ORDER.map((o) => ({ o, n: all.filter((p) => p.openness === o).length })).filter((x) => x.n > 0);
  const byLicence = LICENCE_FAMILY_ORDER.map((f) => ({ f, n: all.filter((p) => licenceFamily(p.licence) === f).length })).filter((x) => x.n > 0);
  const repos = all.filter((p) => p.repo).length;
  const active = all.filter((p) => p.lastCommit && p.lastCommit >= `${Number(OPEN_SOURCE_GENERATED.slice(0, 4)) - 1}-01-01`).length;
  const permissive = byLicence.find((x) => x.f === "Permissive")?.n ?? 0;
  const noLicence = (byLicence.find((x) => x.f === "None stated")?.n ?? 0);
  const stars = all.reduce((n, p) => n + (p.stars ?? 0), 0);
  const linked = all.filter((p) => p.maintainerId).length;
  const withDoi = all.filter((p) => p.doi).length;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Open source in oncology"
        lede={`${all.length} open-source projects the war on cancer runs on, in fourteen categories: ${repos} repositories read from the GitHub API on ${OPEN_SOURCE_GENERATED} (licence as declared, stars, last push) and ${all.length - repos} project pages, package indexes and model cards fetched the same day. ${active} were pushed to in the last two years. Filter by category, licence family, language, openness, last activity, technology, data source, cancer or maintainer; every chip is a filter and every name opens the project.`}
        right={<div className="flex gap-2"><Link href="/open-tools/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Open tools by front</Link><Link href="/data-sources/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Open data</Link></div>}
      />
      <Container className="pb-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted mb-6">
          <span>{all.length} projects</span><span aria-hidden>·</span>
          <span title="Sum of GitHub stars on the day of the fetch">{stars.toLocaleString("en-GB")} stars between them</span><span aria-hidden>·</span>
          <span>{permissive} under permissive licences, {noLicence} with no licence file</span><span aria-hidden>·</span>
          <span>{linked} maintained by an institution or company in OnCo</span><span aria-hidden>·</span>
          <span>{withDoi} name a paper in their README</span><span aria-hidden>·</span>
          <span>{OPEN_SOURCE_SKIPPED.length} looked for and not recorded</span>
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr] mb-10 max-w-6xl">
          <div className="card p-5 text-sm space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">How oncology is done in the open</h2>
            <p className="text-muted">Most of what happens between a tumour sample and a treatment decision now runs on code anyone can read. Reads are trimmed with <a className="underline" href="https://github.com/OpenGene/fastp" rel="noopener">fastp</a>, aligned and called with <a className="underline" href="https://github.com/broadinstitute/gatk" rel="noopener">GATK</a>, <a className="underline" href="https://github.com/Illumina/strelka" rel="noopener">Strelka</a> or <a className="underline" href="https://github.com/hartwigmedical/hmftools" rel="noopener">hmftools</a> inside <a className="underline" href="https://github.com/nf-core/sarek" rel="noopener">nf-core/sarek</a>; variants are annotated by <a className="underline" href="https://github.com/Ensembl/ensembl-vep" rel="noopener">Ensembl VEP</a> and interpreted against <Link className="underline" href="/collections/civic/">CIViC</Link> and <Link className="underline" href="/collections/oncokb/">OncoKB</Link>; signatures come from <a className="underline" href="https://github.com/AlexandrovLab/SigProfilerExtractor" rel="noopener">SigProfiler</a>, clones from PyClone and PhyloWGS, and the whole cohort is explored in <Link className="underline" href="/collections/cbioportal/">cBioPortal</Link>. Imaging is read in OHIF and 3D Slicer and segmented by nnU-Net and TotalSegmentator; radiotherapy plans are researched in matRad and OpenTPS and checked against Monte Carlo from Geant4, TOPAS and GATE; slides are analysed in QuPath and increasingly by foundation models whose weights are, sometimes, released.</p>
            <p className="text-muted">The <Link className="underline" href="/pipeline/engine/">pipeline engine hub</Link> walks that path step by step and says which of these projects sits at each step. This page is the inventory: what exists, who maintains it, under which licence, and how open it really is. Read the licence column before reuse: a quarter of the repositories declare custom terms or none at all, and several of the best-known models release weights only for non-commercial use.</p>
            <p className="text-muted"><strong className="text-foreground">Contribute.</strong> Missing a project, or a fact is stale? The list is <a className="underline" href="https://github.com/judegomila/OnCo/blob/main/scripts/open-source-curated.ts" rel="noopener">one file in the repository</a>: add an entry with the repository and what it relates to, run <code className="text-xs">npx tsx scripts/fetch-open-source.ts</code>, and the licence, stars and dates are read from the source, never typed in. Or <Link className="underline" href="/suggest/">suggest it</Link> and a maintainer will. Add the project to the <a className="underline" href="https://openmedical.sh/contribute/" rel="noopener">Open Medical Registry</a> as well, so the wider catalogue of open medicine has it.</p>
          </div>
          <div className="space-y-4">
            <div className="card p-4 text-sm">
              <div className="kicker mb-2">By category</div>
              <ul className="flex flex-wrap gap-1.5">
                {byCategory.map(({ c, n }) => <li key={c}><Link href={openSourceLink("category", CATEGORY_META[c].label)} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5" title={CATEGORY_META[c].blurb}><Glyph d={CATEGORY_META[c].glyph} />{CATEGORY_META[c].label} <span className="text-muted tabular-nums">{n}</span></Link></li>)}
              </ul>
            </div>
            <div className="card p-4 text-sm">
              <div className="kicker mb-2">By openness</div>
              <ul className="flex flex-wrap gap-1.5">
                {byOpenness.map(({ o, n }) => <li key={o}><Link href={openSourceLink("openness", OPENNESS_META[o].label)} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5" title={OPENNESS_META[o].tip}>{OPENNESS_META[o].label} <span className="text-muted tabular-nums">{n}</span></Link></li>)}
              </ul>
            </div>
            <div className="card p-4 text-sm">
              <div className="kicker mb-2">By licence family</div>
              <ul className="flex flex-wrap gap-1.5">
                {byLicence.map(({ f, n }) => <li key={f}><Link href={openSourceLink("licence", f)} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5" title={LICENCE_FAMILY_TIP[f]}>{f} <span className="text-muted tabular-nums">{n}</span></Link></li>)}
              </ul>
            </div>
          </div>
        </section>

        <EntityBrowser rows={browser.rows} more={browser.more} counts={counts} facets={built.facets} columns={built.columns} noun="projects" hideStatus defaultSort={OPEN_SOURCE_SORT} />

        <section className="mt-12 max-w-4xl" aria-labelledby="skipped">
          <h2 id="skipped" className="text-lg font-semibold tracking-tight mb-1">Looked for and not recorded</h2>
          <p className="text-sm text-muted mb-3">Closed source, source available only under a restrictive licence, not about cancer, or a fetch that could not verify the licence. Each is on record so the gap is a decision, not an oversight.</p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {OPEN_SOURCE_SKIPPED.map((s) => <li key={s.name} className="card p-3"><span className="font-medium">{s.name}</span> <span className="text-muted">{s.reason}</span></li>)}
          </ul>
        </section>

        <div className="mt-10 max-w-3xl text-xs text-muted space-y-2">
          <p><strong className="text-foreground">Method.</strong> The list is hand-curated in <code>scripts/open-source-curated.ts</code> (one record per project, category, openness and what in OnCo it relates to). <code>scripts/fetch-open-source.ts</code> then reads each repository from the GitHub REST API and each non-repository project from its own page, and records the licence as declared (SPDX id, or &quot;custom&quot; where GitHub cannot map the terms, &quot;none stated&quot; where there is no licence file, &quot;not stated&quot; where a page named none), the primary language, stars, the year the repository was created, the date of the last push and the first non-Zenodo DOI the README names. Summaries are OnCo&apos;s plain-English glosses; the project&apos;s own description travels with the record in the <Link className="underline" href="/api/">API</Link> as <code>/api/v1/open-source.json</code>. Stars measure attention, not quality; a licence read by machine is a starting point, not legal advice.</p>
          <p>Missing a project or a link to a technology? <Link className="underline" href="/suggest/">Suggest an edit</Link>. Builders: the <Link className="underline" href="/build/">recipes</Link> show how to read this table from the API.</p>
        </div>
      </Container>
    </>
  );
}
