import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MV_DIVE } from "@/data/country-mv";

export const metadata: Metadata = pageMeta({ title: MV_DIVE.title, description: MV_DIVE.description, path: "/countries/mv/" });

export default function MaldivesPage() {
  return <CountryDeepDive dive={MV_DIVE} />;
}
