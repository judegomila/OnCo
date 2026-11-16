import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { IE_DIVE } from "@/data/country-ie";

export const metadata: Metadata = pageMeta({ title: IE_DIVE.title, description: IE_DIVE.description, path: "/countries/ie/" });

export default function IrelandPage() {
  return <CountryDeepDive dive={IE_DIVE} />;
}
