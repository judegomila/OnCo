import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SK_DIVE } from "@/data/country-sk";

export const metadata: Metadata = pageMeta({ title: SK_DIVE.title, description: SK_DIVE.description, path: "/countries/sk/" });

export default function SlovakiaPage() {
  return <CountryDeepDive dive={SK_DIVE} />;
}
