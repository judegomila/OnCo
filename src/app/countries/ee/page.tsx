import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { EE_DIVE } from "@/data/country-ee";

export const metadata: Metadata = pageMeta({ title: EE_DIVE.title, description: EE_DIVE.description, path: "/countries/ee/" });

export default function EstoniaPage() {
  return <CountryDeepDive dive={EE_DIVE} />;
}
