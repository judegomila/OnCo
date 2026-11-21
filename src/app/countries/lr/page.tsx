import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LR_DIVE } from "@/data/country-lr";

export const metadata: Metadata = pageMeta({ title: LR_DIVE.title, description: LR_DIVE.description, path: "/countries/lr/" });

export default function LiberiaPage() {
  return <CountryDeepDive dive={LR_DIVE} />;
}
