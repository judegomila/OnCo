import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { UZ_DIVE } from "@/data/country-uz";

export const metadata: Metadata = pageMeta({ title: UZ_DIVE.title, description: UZ_DIVE.description, path: "/countries/uz/" });

export default function UzbekistanPage() {
  return <CountryDeepDive dive={UZ_DIVE} />;
}
