import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { HN_DIVE } from "@/data/country-hn";

export const metadata: Metadata = pageMeta({ title: HN_DIVE.title, description: HN_DIVE.description, path: "/countries/hn/" });

export default function HondurasPage() {
  return <CountryDeepDive dive={HN_DIVE} />;
}
