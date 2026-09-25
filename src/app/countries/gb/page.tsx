import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { countryExtras } from "@/data/country-extras";
import { regionalApprovals, REGION_META } from "@/data/regional-approvals";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import { UK_PATHWAYS, ukPathwayRoute } from "@/lib/uk-pathway";
import {
  GB_ASOF, GB_COMPANIES, GB_DOING, GB_FAILING, GB_GAPS, GB_INSTITUTIONS, GB_MEDICINES, GB_NATIONS,
  GB_PAPERS, GB_PAYING, GB_PEOPLE, GB_PROFILE, GB_REFUSALS, GB_SURVMARK, GB_TRIALS, type CountryCard,
} from "@/data/country-gb";

export const metadata: Metadata = pageMeta({
  title: "Cancer in the United Kingdom",
  description: "United Kingdom deep dive: one label over four health services with four waiting-time standards and four registries, who pays and what is still charged for, NICE and the Scottish Medicines Consortium and the three different things a refusal can mean, the trials and the genomics and the audits the country does better than anyone, and the survival, waiting-time, workforce and capacity figures that say what it does worst.",
  path: "/countries/gb/",
});

const fmt = (n: number | null) => (n === null ? "n/a" : n.toLocaleString("en-GB"));
const fmt1 = (n: number | null) => (n === null ? "n/a" : n.toFixed(1));

const SITE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Deaths", sortable: true, numeric: true, className: "text-right" },
  { key: "incAsr", label: "Incidence ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "mortAsr", label: "Mortality ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page" },
];

/** Age-standardised mortality set beside age-standardised incidence, for the rich countries the UK is compared with. */
const RATIO_COLUMNS: StaticColumn[] = [
  { key: "country", label: "Country" },
  { key: "inc", label: "Incidence ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "mort", label: "Mortality ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "ratio", label: "Mortality ÷ incidence", sortable: true, numeric: true, className: "text-right" },
];
const RATIO_CODES = ["AU", "US", "CA", "KR", "SE", "JP", "CH", "IL", "DE", "ES", "IT", "NO", "FR", "BE", "AT", "NL", "GB", "IE", "DK", "PT", "PL", "GR"];

const PATHWAY_COLUMNS: StaticColumn[] = [
  { key: "cancer", label: "Cancer" },
  { key: "cases", label: "New cases a year (UK)", className: "text-right" },
  { key: "checked", label: "Facts checked" },
  { key: "sections", label: "What the page carries" },
];

const num = (n: number | null, d = 0) => (n === null ? { text: "n/a", v: -1, muted: true } : { text: d ? n.toFixed(d) : n.toLocaleString("en-GB"), v: n });

function Cards({ cards }: { cards: CountryCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((s) => (
        <article key={s.id} id={s.id} className="card p-5 flex flex-col">
          <h3 className="font-semibold leading-snug text-balance">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed">{s.plain}</p>
          <details className="mt-3 group">
            <summary className="cursor-pointer text-sm text-muted hover:text-foreground select-none">More detail</summary>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.detail}</p>
          </details>
          <ul className="mt-auto pt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {s.links.map((l) => (
              <li key={l.url}>
                {l.url.startsWith("/")
                  ? <Link href={l.url} className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</Link>
                  : <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</a>}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function Grid({ items, compact = true }: { items: Entity[]; compact?: boolean }) {
  if (!items.length) return <p className="text-sm text-muted">Nothing recorded yet.</p>;
  return <div className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>{items.map((e) => <EntityCard key={e.id} e={e} compact={compact} />)}</div>;
}

export default function UnitedKingdomPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(GB_INSTITUTIONS, "institution");
  const companies = pick(GB_COMPANIES, "company");
  const trials = pick(GB_TRIALS, "trial");
  const papers = pick(GB_PAPERS, "paper");
  const people = pick(GB_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "GB").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "GB").length;
  const ukApproved = g.kind("drug").filter((d) => { const r = regionalApprovals[d.id]?.UK; return r && (r.status === "approved" || r.status === "conditional"); }).length;
  const ukUnderReview = g.kind("drug").filter((d) => regionalApprovals[d.id]?.UK?.status === "under-review");

  const profile = sitesForCountry(GLOBOCAN, "GBR");
  const all = profile ? GLOBOCAN.countries.GBR?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null && s.label !== "Non-melanoma skin cancer").slice(0, 12) : [];
  const extra = countryExtras.GB;
  const meta = REGION_META.UK;

  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));

  // The comparison the profile card describes, computed here from one source so the arithmetic is visible.
  const ratioRows: StaticRow[] = RATIO_CODES
    .map((code) => ({ code, x: countryExtras[code] }))
    .filter((r): r is { code: string; x: NonNullable<(typeof countryExtras)[string]> } => !!r.x && typeof r.x.incidence === "number" && typeof r.x.mortality === "number")
    .map(({ code, x }) => {
      const ratio = (x.mortality as number) / (x.incidence as number);
      return {
        id: code,
        country: code === "GB" ? { text: x.name, className: "font-semibold" } : x.name,
        inc: num(x.incidence as number),
        mort: num(x.mortality as number),
        ratio: { text: ratio.toFixed(2), v: ratio },
      } as StaticRow;
    });

  // The eight cancers with a full NHS pathway page, which this page deliberately does not restate.
  const pathwayRows: StaticRow[] = UK_PATHWAYS.map((p) => {
    const cases = p.figures.find((f) => /^UK$/i.test(f.nation) && /new (breast )?cases a year|new cases a year|New melanoma cases/i.test(f.label));
    return {
      id: p.cancerId,
      cancer: [{ text: p.cancerName, href: ukPathwayRoute(p.cancerId), className: "underline font-medium" }],
      cases: cases ? `${cases.value} (${cases.period})` : "see page",
      checked: p.asOf,
      sections: [
        { text: "pathway", href: ukPathwayRoute(p.cancerId, "pathway"), className: "underline" },
        { text: "centres", href: ukPathwayRoute(p.cancerId, "centres"), className: "underline" },
        { text: "funding", href: ukPathwayRoute(p.cancerId, "funding"), className: "underline" },
        { text: "tests", href: ukPathwayRoute(p.cancerId, "tests"), className: "underline" },
        { text: "trials", href: ukPathwayRoute(p.cancerId, "trials"), className: "underline" },
        { text: "four nations", href: ukPathwayRoute(p.cancerId, "nations"), className: "underline" },
        { text: "gaps", href: ukPathwayRoute(p.cancerId, "gaps"), className: "underline" },
      ],
    } as StaticRow;
  });

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title={`${meta.flag} Cancer in the United Kingdom`}
        lede={`A country of about ${extra.population} million people whose health service is four health services with one name, whose cancer research is among the best funded and most quoted in the world, and whose cancer survival is behind that of the countries it compares itself with. This page is about the system: the four nations and the ways they are not comparable, who pays and what is still charged for, the bodies that decide which medicines are funded and the three different things their refusals mean, what the country does that others do not, and what the figures say it does badly. The care itself is on the ${UK_PATHWAYS.length} NHS pathway pages below, one per cancer. It gathers ${institutions.length} institutions, ${companies.length} companies, ${trials.length} trials, ${papers.length} key papers and ${people.length} people from the corpus. Facts checked ${GB_ASOF}; every card links its sources.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#nations", "Four nations"], ["#pathways", "The eight cancer pathways"], ["#paying", "Who pays"], ["#medicines", "Who decides what is funded"], ["#refusals", "The three kinds of no"], ["#doing", "What it does best"], ["#failing", "What it does badly"], ["#institutions", "Institutions"], ["#companies", "Companies"], ["#trials", "Trials and papers"], ["#people", "People"], ["#gaps", "What could not be sourced"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">GLOBOCAN {GLOBOCAN.year} estimates, rendered from the corpus data file</span>}>
          <Cards cards={GB_PROFILE} />
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in the United Kingdom, {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers excluding non-melanoma skin: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are modelled estimates, not registry counts; the registry counts are published separately by each of the four nations, as the card above explains. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
          {ratioRows.length > 0 && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Deaths against diagnoses, {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">Age-standardised mortality divided by age-standardised incidence, all cancers, both sexes</span>
              </div>
              <StaticTable rows={ratioRows} columns={RATIO_COLUMNS} noun="countries" defaultSort={{ key: "ratio", dir: 1 }} />
              <p className="mt-3 text-xs text-muted">Both rates are GLOBOCAN {GLOBOCAN.year} age-standardised rates per 100,000, all cancers excluding non-melanoma skin cancer, as recorded for each country in <code>src/data/country-extras.ts</code> with its IARC fact sheet. The ratio is computed here, not published by IARC. It is not a case-fatality rate: it compares two age-standardised rates in the same year, so it is affected by how much of a country&apos;s incidence is screen-detected and by what its registry counts, as well as by how many people survive. Read it as a pointer to the survival comparisons in <a href="#failing" className="underline">what it does badly</a>, not as a measure of them.</p>
            </div>
          )}
        </Section>

        <Section id="nations" title="Four nations, one label">
          <Cards cards={GB_NATIONS} />
        </Section>

        <Section id="pathways" title={`The ${UK_PATHWAYS.length} cancers with a full NHS pathway page`} aside={<span className="text-sm text-muted">Written from the guidance, the waiting-time statistics and the national audits</span>}>
          <p className="text-[15px] leading-relaxed max-w-4xl">This page is deliberately not a guide to being treated for cancer in the NHS. Each of the cancers below has one: the referral route and the standard that times it, the specialist centres, what the NHS funds line by line with the NICE and SMC references, the genomic tests and their directory codes, the trials open now, the UK figures with their sources, the support and the benefits, a four-nations table for that disease, and a named list of what could not be sourced. Everything the section above generalises is worked out in full on one of these.</p>
          <div className="mt-4 card p-5">
            <StaticTable rows={pathwayRows} columns={PATHWAY_COLUMNS} noun="cancers" />
            <p className="mt-3 text-xs text-muted">The case counts are Cancer Research UK figures quoted on each pathway page with their own cohort and source; they are not all on the same cohort and are not added together here. The general explainer of how NHS cancer care and drug funding work, product by product, is on <Link href="/coverage/uk/" className="underline">NHS coverage</Link>.</p>
          </div>
        </Section>

        <Section id="paying" title="Who pays, and what is still charged for">
          <Cards cards={GB_PAYING} />
          <p className="mt-3 text-sm text-muted">Practical help: <Link href="/assistance/" className="underline">Financial help</Link> lists the schemes and grants with the steps to use them; <Link href="/free/" className="underline">Free in oncology</Link> lists what costs nothing anywhere; <Link href="/coverage/uk/" className="underline">NHS coverage</Link> has the patient-facing explainer of prescriptions, benefits, palliative care and second opinions.</p>
        </Section>

        <Section id="medicines" title={`Who decides what the NHS funds: ${meta.regulator}`} aside={<a href={meta.url} className="text-sm underline" rel="noopener">MHRA products search</a>}>
          <Cards cards={GB_MEDICINES} />
          <div className="mt-4 card p-5 text-sm">
            <h3 className="font-semibold text-base">What this corpus holds on UK approvals and funding</h3>
            <p className="mt-2">{ukApproved} products carry a sourced United Kingdom approval row in the <Link href="/regulatory/regions/" className="underline">approvals by region</Link> matrix, and {ukUnderReview.length} are recorded as under review{ukUnderReview.length ? <> ({ukUnderReview.map((d) => d.name).join(", ")})</> : null}. The NICE, Cancer Drugs Fund and SMC position for each approved product is on <Link href="/coverage/uk/" className="underline">NHS coverage</Link>, where a status of &ldquo;not yet researched&rdquo; means exactly that and links to a NICE search. An absent row means not yet researched, never &ldquo;not approved&rdquo;.</p>
          </div>
        </Section>

        <Section id="refusals" title="The three kinds of no" aside={<span className="text-sm text-muted">One worked example of each, quoted from the body that issued it</span>}>
          <p className="text-[15px] leading-relaxed max-w-4xl">A cancer drug can be unavailable on the NHS for three different reasons, and they are routinely reported as one. This site itself has made the mistake three times, in three separate review passes, which is why the distinction gets a table rather than a sentence. Only the first of these is a judgement about the medicine. Read the second and third as an absence of a judgement, and the fourth as an absence of a question.</p>
          <div className="mt-4 grid gap-4">
            {GB_REFUSALS.map((r, i) => (
              <article key={r.id} id={r.id} className="card p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="chip tabular-nums">{i + 1}</span>
                  <h3 className="font-semibold leading-snug">{r.kind}</h3>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed">{r.meaning}</p>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-[10rem_1fr]">
                  <dt className="text-muted">Worked example</dt>
                  <dd>{r.example}</dd>
                  <dt className="text-muted">What the body prints</dt>
                  <dd className="text-foreground/85">{r.quote}</dd>
                  <dt className="text-muted">Can it change?</dt>
                  <dd className="text-foreground/85">{r.reversible}</dd>
                </dl>
                <p className="mt-3 text-xs"><a href={r.url} target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">Read it on the source</a></p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted max-w-4xl">NICE&apos;s own arithmetic makes the point: 596 cancer technology appraisals since 2000 have produced 666 recommendations, and a further 100 appraisals produced none at all, &ldquo;in the absence of a submission from the company&rdquo;. Those hundred are listed by NICE under the heading &ldquo;Not included in the data&rdquo;. Every funding row on the eight <a href="#pathways" className="underline">NHS pathway pages</a> states which of these four categories applies, with the reference and date.</p>
        </Section>

        <Section id="doing" title="What the United Kingdom does that others do not">
          <Cards cards={GB_DOING} />
        </Section>

        <Section id="failing" title="What it does badly, with the figures">
          <Cards cards={GB_FAILING} />
          <div className="mt-6 card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="font-semibold">Five-year net survival, 2010 to 2014, United Kingdom against six comparable countries</h3>
              <span className="text-xs text-muted">ICBP SURVMARK-2, seven countries, 3,764,543 cancers</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-muted border-b border-foreground/10">
                  <th className="py-2 pe-3 font-medium">Site</th>
                  <th className="py-2 pe-3 font-medium text-right">UK, 1995 to 1999</th>
                  <th className="py-2 pe-3 font-medium text-right">UK, 2010 to 2014</th>
                  <th className="py-2 pe-3 font-medium text-right">UK rank of 7</th>
                  <th className="py-2 font-medium">Highest</th>
                </tr></thead>
                <tbody>
                  {GB_SURVMARK.map((r) => (
                    <tr key={r.site} className="border-b border-foreground/5">
                      <td className="py-2 pe-3">{r.site}</td>
                      <td className="py-2 pe-3 text-right tabular-nums text-muted">{r.uk1995.toFixed(1)}%</td>
                      <td className="py-2 pe-3 text-right tabular-nums font-medium">{r.uk.toFixed(1)}%</td>
                      <td className="py-2 pe-3 text-right tabular-nums">{r.rank}</td>
                      <td className="py-2">{r.best} <span className="tabular-nums text-muted">{r.bestValue.toFixed(1)}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">Age-standardised net survival, both sexes except ovary, from the ICBP SURVMARK-2 data file published by IARC (<a href="https://gco.iarc.who.int/survival/survmark/" className="underline" rel="noopener">gco.iarc.who.int/survival/survmark</a>), read 25 September 2026. The seven countries are Australia, Canada, Denmark, Ireland, New Zealand, Norway and the United Kingdom. The cohort ends in 2014, so this describes the patients of a decade ago, and the 1995 to 1999 column is here because the trend and the gap say different things: British survival roughly doubled in lung, pancreatic and oesophageal cancer over the period and still finished last on five of the seven sites. Paper: <a href="https://doi.org/10.1016/S1470-2045(19)30456-5" className="underline" rel="noopener">Arnold et al, Lancet Oncology 2019</a>.</p>
          </div>
        </Section>

        <Section id="institutions" title="Research institutions, cancer centres and charities" aside={<span className="text-sm text-muted">{allInstitutions} UK institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></span>}>
          <Grid items={institutions} />
          <p className="mt-3 text-sm text-muted">Not carded here: the 21 cancer alliances in England, which plan and improve cancer services across groups of trusts and appear in the corpus with their own records. Browse them, and every UK institution, on the <Link href="/institutions/" className="underline">institutions page</Link>.</p>
        </Section>

        <Section id="companies" title="Companies" aside={<span className="text-sm text-muted">{allCompanies} UK companies in the corpus · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <Grid items={companies} />
        </Section>

        <Section id="trials" title="The trials and the papers">
          <h3 className="font-semibold mb-2">Trials ({trials.length})</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers ({papers.length})</h3>
          <Grid items={papers} />
        </Section>

        <Section id="people" title="People">
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="What could not be sourced">
          <p className="text-[15px] leading-relaxed max-w-4xl">A missing figure should never be read as a zero. These are the things that could not be established on the check date, and why. Several of them are the same problem: the organisations holding the best British cancer data block automated readers, so the figures here are quoted from the documents those pages link to, or from Cancer Research UK, which builds on the same registrations.</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {GB_GAPS.map((gap) => <li key={gap.slice(0, 40)} className="card p-4 text-sm leading-relaxed">{gap}</li>)}
          </ul>
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {GB_ASOF}. The entity lists are pulled live from the corpus by id, so a new UK trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-gb.ts</code>. Burden figures come from the GLOBOCAN {GLOBOCAN.year} data file used across the site; the four national registries publish their own counts and are quoted with their own sources. The pathway table above is generated from the eight <code>UkPathway</code> records, so it grows when a ninth cancer gets an NHS layer. Where a figure could not be verified against a primary page it is described in words, or named in the gaps section rather than estimated.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Waiting-time figures are published monthly or quarterly and change; appraisals, funding decisions and screening ages change with them. Check <a href="https://www.nice.org.uk" className="underline" rel="noopener">NICE</a>, the <a href="https://www.scottishmedicines.org.uk/medicines-advice/" className="underline" rel="noopener">Scottish Medicines Consortium</a>, <a href="https://awttc.nhs.wales/" className="underline" rel="noopener">AWTTC</a> and your own team before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
