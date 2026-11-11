import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { YE_DIVE } from "@/data/country-ye";

export const metadata: Metadata = pageMeta({ title: YE_DIVE.title, description: YE_DIVE.description, path: "/countries/ye/" });

export default function YemenPage() {
  return <CountryDeepDive dive={YE_DIVE} />;
}
