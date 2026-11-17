import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { QA_DIVE } from "@/data/country-qa";

export const metadata: Metadata = pageMeta({ title: QA_DIVE.title, description: QA_DIVE.description, path: "/countries/qa/" });

export default function QatarPage() {
  return <CountryDeepDive dive={QA_DIVE} />;
}
