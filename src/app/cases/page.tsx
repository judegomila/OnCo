import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { CasesByCountry } from "@/components/CasesByCountry";
import { TrendChart } from "@/components/TrendChart";
import { DATA_URL, GLOBOCAN, gaps, rowsForCancer } from "@/lib/globocan";

export const metadata: Metadata = pageMeta({ title: "Cases by country", description: "GLOBOCAN 2022 new cases and deaths by country and cancer type, with every data gap stated.", path: "/cases/" });

export default function CasesPage() {
  const g = graph();
  const cancers = g.kind("cancer").map((c) => ({ id: c.id, name: c.name, group: c.group, route: routeFor(c) }));
  const countries = Object.values(GLOBOCAN.countries).filter((c) => c.iso3 !== "WORLD" && c.isonum < 900).map((c) => ({ iso3: c.iso3, name: c.name }));
  const initial = rowsForCancer(null);

  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Cases by country"
        lede={`Where cancer is: new cases and deaths for ${countries.length} countries and ${cancers.length} OnCo cancers, from GLOBOCAN ${GLOBOCAN.year}. Choose a cancer to rank countries, or one country to rank its cancers. Where the source does not report a cancer the way OnCo defines it, the page says so instead of guessing.`} />
      <Container className="pb-16">
        <CasesByCountry cancers={cancers} initial={initial} countryList={countries} dataUrl={DATA_URL} gaps={gaps()} meta={{ year: GLOBOCAN.year, fetched: GLOBOCAN.fetched, sourceUrl: GLOBOCAN.sourceUrl }} />
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Across GLOBOCAN editions</h2>
          <p className="text-sm text-muted mt-1 mb-4 max-w-3xl">IARC publishes a new set of estimates every few years. The chart shows the world incidence and mortality rates for each edition this site has on file; the same sparkline sits in the country table. Only the {GLOBOCAN.year} edition is available today: IARC&apos;s API answers the older editions&apos; index but returns an error for their data (checked 2026-09-09), and the fetch script adds them the moment they are served again.</p>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card p-4"><div className="font-medium mb-2">World, all cancers</div><TrendChart cancerId={null} iso3="WORLD" title="World, all cancers" /></div>
            <div className="card p-4"><div className="font-medium mb-2">World, lung cancer</div><TrendChart cancerId="nsclc" iso3="WORLD" title="World, lung cancer" /></div>
          </div>
        </section>
        <section className="mt-10 max-w-3xl text-sm text-muted space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Methodology</h2>
          <p>Numbers are GLOBOCAN {GLOBOCAN.year} estimates produced by the International Agency for Research on Cancer (IARC). For countries with high-quality population-based cancer registries they are close to observed counts; for many others they are modelled from regional registries, mortality data, or neighbouring countries, and IARC grades the method used per country. They are the best comparable global figures available, not a census.</p>
          <p>Incidence and mortality age-standardised rates (ASR) use the World standard population and are expressed per 100,000 person-years, both sexes, all ages. The mortality-to-incidence ratio is deaths divided by new cases in the same year and is a rough proxy for lethality and access to care. Cumulative risk is the chance of being diagnosed before age 75 in the absence of competing causes.</p>
          <p>Mapping to OnCo cancers is by anatomical site (ICD-10). Subtypes that OnCo treats separately (triple-negative, HR+, and HER2+ breast cancer; non-small-cell and small-cell lung cancer; AML, ALL, CLL; DLBCL) share one site total, and four OnCo cancers (biliary tract, sarcoma, neuroendocrine, neuroblastoma) have no country-level estimate at all. These gaps are shown as “no data” rather than filled in.</p>
          <p>Source: <a className="underline" href={GLOBOCAN.sourceUrl} rel="noopener">Global Cancer Observatory: Cancer Today</a> (IARC, WHO), fetched {GLOBOCAN.fetched} via the observatory&apos;s public API. Citation: {GLOBOCAN.citation}</p>
        </section>
      </Container>
    </>
  );
}
