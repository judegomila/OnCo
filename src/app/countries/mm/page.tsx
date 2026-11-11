import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MM_DIVE } from "@/data/country-mm";

export const metadata: Metadata = pageMeta({ title: MM_DIVE.title, description: MM_DIVE.description, path: "/countries/mm/" });

export default function MyanmarPage() {
  return <CountryDeepDive dive={MM_DIVE} />;
}
