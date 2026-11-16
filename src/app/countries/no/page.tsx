import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NO_DIVE } from "@/data/country-no";

export const metadata: Metadata = pageMeta({ title: NO_DIVE.title, description: NO_DIVE.description, path: "/countries/no/" });

export default function NorwayPage() {
  return <CountryDeepDive dive={NO_DIVE} />;
}
