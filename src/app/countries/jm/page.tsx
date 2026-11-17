import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { JM_DIVE } from "@/data/country-jm";

export const metadata: Metadata = pageMeta({ title: JM_DIVE.title, description: JM_DIVE.description, path: "/countries/jm/" });

export default function JamaicaPage() {
  return <CountryDeepDive dive={JM_DIVE} />;
}
