import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BJ_DIVE } from "@/data/country-bj";

export const metadata: Metadata = pageMeta({ title: BJ_DIVE.title, description: BJ_DIVE.description, path: "/countries/bj/" });

export default function BeninPage() {
  return <CountryDeepDive dive={BJ_DIVE} />;
}
