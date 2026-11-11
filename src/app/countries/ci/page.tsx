import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CI_DIVE } from "@/data/country-ci";

export const metadata: Metadata = pageMeta({ title: CI_DIVE.title, description: CI_DIVE.description, path: "/countries/ci/" });

export default function CoteDIvoirePage() {
  return <CountryDeepDive dive={CI_DIVE} />;
}
