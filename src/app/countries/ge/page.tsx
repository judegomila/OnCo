import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GE_DIVE } from "@/data/country-ge";

export const metadata: Metadata = pageMeta({ title: GE_DIVE.title, description: GE_DIVE.description, path: "/countries/ge/" });

export default function GeorgiaPage() {
  return <CountryDeepDive dive={GE_DIVE} />;
}
