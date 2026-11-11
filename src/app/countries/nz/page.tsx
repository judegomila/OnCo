import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NZ_DIVE } from "@/data/country-nz";

export const metadata: Metadata = pageMeta({ title: NZ_DIVE.title, description: NZ_DIVE.description, path: "/countries/nz/" });

export default function NewZealandPage() {
  return <CountryDeepDive dive={NZ_DIVE} />;
}
