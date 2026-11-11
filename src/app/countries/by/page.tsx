import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BY_DIVE } from "@/data/country-by";

export const metadata: Metadata = pageMeta({ title: BY_DIVE.title, description: BY_DIVE.description, path: "/countries/by/" });

export default function BelarusPage() {
  return <CountryDeepDive dive={BY_DIVE} />;
}
