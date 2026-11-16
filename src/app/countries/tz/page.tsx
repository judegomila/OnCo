import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TZ_DIVE } from "@/data/country-tz";

export const metadata: Metadata = pageMeta({ title: TZ_DIVE.title, description: TZ_DIVE.description, path: "/countries/tz/" });

export default function TanzaniaPage() {
  return <CountryDeepDive dive={TZ_DIVE} />;
}
