import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GN_DIVE } from "@/data/country-gn";

export const metadata: Metadata = pageMeta({ title: GN_DIVE.title, description: GN_DIVE.description, path: "/countries/gn/" });

export default function GuineaPage() {
  return <CountryDeepDive dive={GN_DIVE} />;
}
