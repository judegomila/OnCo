import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { DJ_DIVE } from "@/data/country-dj";

export const metadata: Metadata = pageMeta({ title: DJ_DIVE.title, description: DJ_DIVE.description, path: "/countries/dj/" });

export default function DjiboutiPage() {
  return <CountryDeepDive dive={DJ_DIVE} />;
}
