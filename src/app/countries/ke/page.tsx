import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { KE_DIVE } from "@/data/country-ke";

export const metadata: Metadata = pageMeta({ title: KE_DIVE.title, description: KE_DIVE.description, path: "/countries/ke/" });

export default function KenyaPage() {
  return <CountryDeepDive dive={KE_DIVE} />;
}
