import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BT_DIVE } from "@/data/country-bt";

export const metadata: Metadata = pageMeta({ title: BT_DIVE.title, description: BT_DIVE.description, path: "/countries/bt/" });

export default function BhutanPage() {
  return <CountryDeepDive dive={BT_DIVE} />;
}
