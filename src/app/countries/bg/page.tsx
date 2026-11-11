import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BG_DIVE } from "@/data/country-bg";

export const metadata: Metadata = pageMeta({ title: BG_DIVE.title, description: BG_DIVE.description, path: "/countries/bg/" });

export default function BulgariaPage() {
  return <CountryDeepDive dive={BG_DIVE} />;
}
