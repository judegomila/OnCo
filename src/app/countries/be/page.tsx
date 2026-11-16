import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BE_DIVE } from "@/data/country-be";

export const metadata: Metadata = pageMeta({ title: BE_DIVE.title, description: BE_DIVE.description, path: "/countries/be/" });

export default function BelgiumPage() {
  return <CountryDeepDive dive={BE_DIVE} />;
}
