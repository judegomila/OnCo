import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { KH_DIVE } from "@/data/country-kh";

export const metadata: Metadata = pageMeta({ title: KH_DIVE.title, description: KH_DIVE.description, path: "/countries/kh/" });

export default function CambodiaPage() {
  return <CountryDeepDive dive={KH_DIVE} />;
}
