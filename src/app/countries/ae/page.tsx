import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AE_DIVE } from "@/data/country-ae";

export const metadata: Metadata = pageMeta({ title: AE_DIVE.title, description: AE_DIVE.description, path: "/countries/ae/" });

export default function UnitedArabEmiratesPage() {
  return <CountryDeepDive dive={AE_DIVE} />;
}
