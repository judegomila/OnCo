import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LT_DIVE } from "@/data/country-lt";

export const metadata: Metadata = pageMeta({ title: LT_DIVE.title, description: LT_DIVE.description, path: "/countries/lt/" });

export default function LithuaniaPage() {
  return <CountryDeepDive dive={LT_DIVE} />;
}
