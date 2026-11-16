import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GT_DIVE } from "@/data/country-gt";

export const metadata: Metadata = pageMeta({ title: GT_DIVE.title, description: GT_DIVE.description, path: "/countries/gt/" });

export default function GuatemalaPage() {
  return <CountryDeepDive dive={GT_DIVE} />;
}
