import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PE_DIVE } from "@/data/country-pe";

export const metadata: Metadata = pageMeta({ title: PE_DIVE.title, description: PE_DIVE.description, path: "/countries/pe/" });

export default function PeruPage() {
  return <CountryDeepDive dive={PE_DIVE} />;
}
