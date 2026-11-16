import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AT_DIVE } from "@/data/country-at";

export const metadata: Metadata = pageMeta({ title: AT_DIVE.title, description: AT_DIVE.description, path: "/countries/at/" });

export default function AustriaPage() {
  return <CountryDeepDive dive={AT_DIVE} />;
}
