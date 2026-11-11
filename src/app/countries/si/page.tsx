import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SI_DIVE } from "@/data/country-si";

export const metadata: Metadata = pageMeta({ title: SI_DIVE.title, description: SI_DIVE.description, path: "/countries/si/" });

export default function SloveniaPage() {
  return <CountryDeepDive dive={SI_DIVE} />;
}
