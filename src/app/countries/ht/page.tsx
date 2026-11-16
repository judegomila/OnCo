import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { HT_DIVE } from "@/data/country-ht";

export const metadata: Metadata = pageMeta({ title: HT_DIVE.title, description: HT_DIVE.description, path: "/countries/ht/" });

export default function HaitiPage() {
  return <CountryDeepDive dive={HT_DIVE} />;
}
