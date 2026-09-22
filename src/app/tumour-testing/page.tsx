import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { logoSrc } from "@/lib/logos";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { KindIcon } from "@/components/KindIcon";
import { Logo } from "@/components/Logo";
import { REG_LABEL, REG_ORDER, SCOPE_LABEL, SCOPE_PLAIN, TUMOUR_TESTS, regulatoryStatuses, type RegStatus, type SampleType, type TestScope, type TumourTest } from "@/data/tumour-tests";
import { REG_CLASS, SAMPLE_CLASS, SAMPLE_LABEL, SAMPLE_ORDER, SAMPLE_PLAIN, SCOPE_CLASS, SCOPE_ORDER, SampleIcon, ScopeIcon, StatusIcon } from "./glyphs";
import { filterHref, type TestRow } from "./filter";
import { TestsTable } from "./TestsTable";

export const metadata: Metadata = pageMeta({
  title: "Tumour sequencing tests",
  description: "BostonGene, Tempus, Foundation Medicine, Caris, Guardant, Strata, NeoGenomics, Personalis, Illumina, Myriad, Natera, Exact Sciences and Labcorp tests side by side: sample type, targeted panel versus exome, exome plus transcriptome or MRD, what the report returns, regulatory status where certain, and the test's own page. Filter by sample, scope, laboratory and status.",
  path: "/tumour-testing/",
});

type Company = { id: string; name: string; website?: string; route?: string };

/** Plain row for the client table: names, routes and logo URLs as strings. */
function toRow(t: TumourTest, company: Company | undefined): TestRow {
  const g = graph();
  const record = t.drugId ? g.get(t.drugId) : undefined;
  const technologies = t.technologies.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => Boolean(e)).map((e) => ({ id: e.id, name: e.name, route: routeFor(e), kind: e.kind }));
  return {
    id: t.id, name: t.name, url: t.url, companyId: t.companyId,
    companyName: company?.name ?? t.companyId, companyRoute: company?.route, companyLogo: company ? logoSrc(company.id, company.website) : undefined,
    recordRoute: record ? routeFor(record) : undefined, recordKind: record?.kind,
    sample: t.sample, scope: t.scope, returns: t.returns, us: t.regulatory.us ?? "", eu: t.regulatory.eu ?? "",
    statuses: regulatoryStatuses(t.regulatory), technologies, note: t.note,
  };
}

/** A test as a pill: the laboratory's logo, the test name, linking to its OnCo record or its own page. */
function TestPill({ t, company }: { t: TumourTest; company?: Company }) {
  const g = graph();
  const record = t.drugId ? g.get(t.drugId) : undefined;
  const inner = <><Logo id={company?.id} website={company?.website} name={company?.name ?? t.companyId} size={18} rounded="rounded-sm" /><span>{t.name}</span></>;
  const cls = "chip border border-border bg-card hover:bg-foreground/5 hover:border-border-strong text-xs";
  return record
    ? <Link href={routeFor(record)} className={cls} title={`${t.name} on OnCo`}>{inner}</Link>
    : <a href={t.url} target="_blank" rel="noopener noreferrer" className={cls} title={`${t.name}: the test's own page (${company?.name ?? t.companyId})`}>{inner}</a>;
}

/** One card per scope or sample: the glyph, the plain-English line, and the tests inside it. */
function GroupCard({ id, chip, chipClass, plain, tests, href, companies }: { id: string; chip: ReactNode; chipClass: string; plain: string; tests: TumourTest[]; href: string; companies: Map<string, Company> }) {
  return (
    <div id={id} className="card p-4 scroll-mt-20 flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <a href={href} className={`chip text-xs ${chipClass} hover:ring-2 hover:ring-accent/30`} title={`Filter the table to ${tests.length} ${tests.length === 1 ? "test" : "tests"}`}>{chip}</a>
        <a href={href} className="text-xs text-muted hover:text-accent hover:underline" title="Filter the table">{tests.length} {tests.length === 1 ? "test" : "tests"}</a>
      </div>
      <p className="text-sm text-muted">{plain}</p>
      <div className="flex flex-wrap gap-1 mt-auto">{tests.map((t) => <TestPill key={t.id} t={t} company={companies.get(t.companyId)} />)}</div>
    </div>
  );
}

export default function TumourTestingPage() {
  const g = graph();
  const sorted = [...TUMOUR_TESTS].sort((a, b) => SCOPE_ORDER.indexOf(a.scope) - SCOPE_ORDER.indexOf(b.scope) || a.companyId.localeCompare(b.companyId) || a.name.localeCompare(b.name));
  const companies = new Map<string, Company>();
  for (const id of new Set(TUMOUR_TESTS.map((t) => t.companyId))) {
    const c = g.get(id);
    companies.set(id, c ? { id: c.id, name: c.name, website: "website" in c ? c.website : undefined, route: routeFor(c) } : { id, name: id });
  }
  const labs = [...companies.values()].sort((a, b) => a.name.localeCompare(b.name));
  const rows = sorted.map((t) => toRow(t, companies.get(t.companyId)));
  const scopes = SCOPE_ORDER.filter((s) => TUMOUR_TESTS.some((t) => t.scope === s));
  const byScope = (s: TestScope) => sorted.filter((t) => t.scope === s);
  const bySample = (s: SampleType) => sorted.filter((t) => t.sample === s);
  const statuses = REG_ORDER.filter((s) => rows.some((r) => r.statuses.includes(s)));
  const countStatus = (s: RegStatus) => rows.filter((r) => r.statuses.includes(s)).length;
  const wes = g.get("wes-wgs");
  const cgp = g.get("cgp");
  const mrd = g.get("mrd-testing");
  const liquid = g.get("liquid-biopsy");
  const cdx = g.get("companion-diagnostic");

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="map"><span className="kicker">·</span>{cgp && <Link href={routeFor(cgp)} className="kicker hover:underline">{cgp.name}</Link>}<span className="kicker">·</span>{wes && <Link href={routeFor(wes)} className="kicker hover:underline">Exome and genome sequencing</Link>}</GroupKicker>}
        title="Tumour sequencing tests"
        lede={`${TUMOUR_TESTS.length} tests from ${labs.length} laboratories side by side: whether they need tissue or blood, whether they read a chosen panel of genes, the whole exome, the exome plus the RNA, or only trace tumour DNA after treatment, what the report contains, and the regulatory status where it is certain. A blank cell means OnCo does not state it.`}
      />
      <Container className="pb-16">
        <div className="flex flex-wrap gap-1.5 text-sm">
          {labs.map((c) => (
            <a key={c.id} href={filterHref({ company: c.id })} className="chip border border-border bg-card hover:bg-foreground/5 hover:border-border-strong" title={`Only ${c.name} tests in the table`}>
              <Logo id={c.id} website={c.website} name={c.name} size={18} rounded="rounded-sm" /><span>{c.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 card p-4 text-sm text-muted max-w-3xl border-amber-300/60 dark:border-amber-700/60">
          <div className="kicker mb-1">How to read this</div>
          <p>Most tests here are laboratory-developed tests: run in one accredited laboratory in the United States under CLIA rules rather than approved as a kit. FDA approval applies to a specific version with named companion diagnostic claims, and CE marking to sale in Europe. Which test you get depends on your hospital, your country and your insurer; in England the <Link href="/free/#testing" className="underline">NHS Genomic Medicine Service</Link> funds the tests in its directory. Ask the treating team which test was run and for the report itself; the <Link href="/report-reader/" className="underline">report reader</Link> explains the values.</p>
        </div>

        <section className="mt-10" aria-labelledby="by-scope">
          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <h2 id="by-scope" className="kicker">By scope</h2>
            <span className="text-xs text-muted">How much of the genome the test reads. Pick a scope to filter the table; pick a test for its page.</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {scopes.map((s) => (
              <GroupCard key={s} id={`scope-${s}`} chip={<><ScopeIcon scope={s} /><span>{SCOPE_LABEL[s]}</span></>} chipClass={SCOPE_CLASS[s]} plain={SCOPE_PLAIN[s]} tests={byScope(s)} href={filterHref({ scope: s })} companies={companies} />
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="by-sample">
          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <h2 id="by-sample" className="kicker">By sample</h2>
            <span className="text-xs text-muted">What the laboratory needs from you.</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_ORDER.filter((s) => bySample(s).length > 0).map((s) => (
              <GroupCard key={s} id={`sample-${s}`} chip={<><SampleIcon sample={s} /><span>{SAMPLE_LABEL[s]}</span></>} chipClass={SAMPLE_CLASS[s]} plain={SAMPLE_PLAIN[s]} tests={bySample(s)} href={filterHref({ sample: s })} companies={companies} />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-3 md:grid-cols-2">
          <div className="card p-4">
            <div className="kicker mb-2">By regulatory status</div>
            <div className="flex flex-wrap gap-1 text-xs">
              {statuses.map((s) => <a key={s} href={filterHref({ status: s })} className={`chip ${REG_CLASS[s]} hover:ring-2 hover:ring-accent/30`} title={`Only tests whose stated status includes ${REG_LABEL[s]}`}><StatusIcon status={s} /><span>{REG_LABEL[s]}</span><span className="opacity-70">{countStatus(s)}</span></a>)}
            </div>
            <p className="mt-2 text-xs text-muted">Read from each row&apos;s stated status; a test can carry more than one.</p>
          </div>
          <div className="card p-4">
            <div className="kicker mb-2">Technologies</div>
            <div className="flex flex-wrap gap-1 text-xs">
              {[cgp, wes, liquid, mrd, cdx].filter((e): e is NonNullable<typeof e> => Boolean(e)).map((e) => <Link key={e.id} href={routeFor(e)} className="chip border border-border bg-card hover:bg-foreground/5"><KindIcon kind={e.kind} className="h-3 w-3" /><span>{e.name}</span></Link>)}
            </div>
          </div>
        </section>

        <div className="mt-10">
          <TestsTable rows={rows} />
        </div>

        <section className="mt-12">
          <div className="kicker mb-2">Laboratories in this table</div>
          <div className="flex flex-wrap gap-1.5 text-sm">
            {labs.map((c) => c.route
              ? <Link key={c.id} href={c.route} className="chip border border-border bg-card hover:bg-foreground/5" title={`${c.name} on OnCo`}><Logo id={c.id} website={c.website} name={c.name} size={18} rounded="rounded-sm" /><span>{c.name}</span></Link>
              : <span key={c.id} className="chip border border-border bg-card"><Logo id={c.id} name={c.name} size={18} rounded="rounded-sm" /><span>{c.name}</span></span>)}
          </div>
          <p className="mt-4 text-sm text-muted max-w-3xl">Free routes to testing, including charity-funded sequencing programmes and the NHS directory, are on the <Link href="/free/#testing" className="underline">free in oncology</Link> page. Companion diagnostic assays with FDA claims, by drug, are on the <Link href="/assays/" className="underline">assays</Link> page.</p>
        </section>
      </Container>
    </>
  );
}
