import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { GLOBOCAN } from "@/lib/globocan";
import { autoCountry, autoCountryCodes, autoCountryParams, countryRoute } from "@/lib/country-pages";
import { CountryAuto } from "@/components/CountryAuto";

/**
 * The automatic country pages: one for every country in GLOBOCAN that has no deep dive. A deep dive is a static
 * folder beside this segment (src/app/countries/ar/ and the rest), and a static segment wins over a dynamic one,
 * but the two are also kept apart here: `generateStaticParams` returns only the codes with no folder of their own,
 * and `dynamicParams = false` makes any other address a 404 in the static export. Adding a deep dive therefore
 * removes the automatic page in the same build, at the same URL.
 *
 * Since 16 November 2026 every GLOBOCAN country has a deep dive, so there is no automatic page to generate. A static
 * export needs at least one param from a dynamic route, so `autoCountryParams()` then returns a single placeholder
 * address that is not a country code, and this page answers it, like any other address it does not know, with
 * `notFound()`. The route is kept so that a territory IARC adds gets a page in the build that first sees it.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return autoCountryParams();
}

export async function generateMetadata({ params }: { params: Promise<{ iso: string }> }): Promise<Metadata> {
  const { iso } = await params;
  const c = autoCountry(iso);
  if (!c) return {};
  return pageMeta({
    title: `Cancer in ${c.name}`,
    description: `${c.name} in figures: GLOBOCAN ${GLOBOCAN.year} new cases, deaths, rates and the leading cancers, the trials in OnCo with a site there, the institutions, companies and people recorded, and what OnCo does not yet hold.`,
    path: countryRoute(c.iso2),
  });
}

export default async function AutoCountryPage({ params }: { params: Promise<{ iso: string }> }) {
  const { iso } = await params;
  if (iso !== iso.toLowerCase()) notFound();
  const c = autoCountry(iso);
  if (!c || !autoCountryCodes().includes(c.iso2)) notFound();
  return <CountryAuto c={c} />;
}
