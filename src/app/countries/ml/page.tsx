import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ML_DIVE } from "@/data/country-ml";

export const metadata: Metadata = pageMeta({ title: ML_DIVE.title, description: ML_DIVE.description, path: "/countries/ml/" });

export default function MaliPage() {
  return <CountryDeepDive dive={ML_DIVE} />;
}
