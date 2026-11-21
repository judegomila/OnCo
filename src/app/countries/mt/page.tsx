import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MT_DIVE } from "@/data/country-mt";

export const metadata: Metadata = pageMeta({ title: MT_DIVE.title, description: MT_DIVE.description, path: "/countries/mt/" });

export default function MaltaPage() {
  return <CountryDeepDive dive={MT_DIVE} />;
}
