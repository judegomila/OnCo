import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AZ_DIVE } from "@/data/country-az";

export const metadata: Metadata = pageMeta({ title: AZ_DIVE.title, description: AZ_DIVE.description, path: "/countries/az/" });

export default function AzerbaijanPage() {
  return <CountryDeepDive dive={AZ_DIVE} />;
}
