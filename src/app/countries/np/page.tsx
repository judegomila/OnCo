import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NP_DIVE } from "@/data/country-np";

export const metadata: Metadata = pageMeta({ title: NP_DIVE.title, description: NP_DIVE.description, path: "/countries/np/" });

export default function NepalPage() {
  return <CountryDeepDive dive={NP_DIVE} />;
}
