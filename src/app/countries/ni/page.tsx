import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NI_DIVE } from "@/data/country-ni";

export const metadata: Metadata = pageMeta({ title: NI_DIVE.title, description: NI_DIVE.description, path: "/countries/ni/" });

export default function NicaraguaPage() {
  return <CountryDeepDive dive={NI_DIVE} />;
}
