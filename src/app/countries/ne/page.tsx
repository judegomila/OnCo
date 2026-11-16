import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NE_DIVE } from "@/data/country-ne";

export const metadata: Metadata = pageMeta({ title: NE_DIVE.title, description: NE_DIVE.description, path: "/countries/ne/" });

export default function NigerPage() {
  return <CountryDeepDive dive={NE_DIVE} />;
}
