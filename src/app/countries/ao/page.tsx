import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AO_DIVE } from "@/data/country-ao";

export const metadata: Metadata = pageMeta({ title: AO_DIVE.title, description: AO_DIVE.description, path: "/countries/ao/" });

export default function AngolaPage() {
  return <CountryDeepDive dive={AO_DIVE} />;
}
